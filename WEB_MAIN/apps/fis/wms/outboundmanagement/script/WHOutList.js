var docObjects=new Array();
var sheetCnt=0;
var comboObjects = new Array();
var comboCnt = 0; 
var popupCtr = "";
var fix_grid01 = "Grd01";
var firCalFlag = false;
var loading_flag = "N";
var rtnary=new Array(1);

//#3390-Check Authority WMS CODE
var isWmsAuthOk = false; 

function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}


//<!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
document.onclick = processButtonClick;
function processButtonClick() {
	try {
		var srcName = ComGetEvent("id");
		//if(ComGetBtnDisable(srcName)) return false;
		switch (srcName) {
		case "stAll":
			$("#bk_sts_cd").val("ALL");
			doWork('SEARCHLIST');
			break;
		case "stBooked":
			$("#bk_sts_cd").val("I");
			doWork('SEARCHLIST');
			break;
		case "stAllocated":
			$("#bk_sts_cd").val("A");
			doWork('SEARCHLIST');
			break;
		case "stPicked":
			$("#bk_sts_cd").val("P");
			doWork('SEARCHLIST');
			break;
		case "stComplete":
			$("#bk_sts_cd").val("X");
			doWork('SEARCHLIST');
			break;
		case "stCancel":
			$("#bk_sts_cd").val("C");
			doWork('SEARCHLIST');
			break;
		} // end switch
	} catch (e) {
		if (e == "[object Error]") {
			ComShowCodeMessage("DOM00023");
		} else {
			alert(e);
		}
	}
}

/*
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여
 * cache옵션 false셋팅
 */
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});

function loadPage() {
	var formObj = document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	
	//IBMultiCombo초기화
	initCombo("cond_tp_no");
	initCombo("cond_tp_date");
	initCombo("ship_to_tp");
	initCombo("ref_tp");
	initCombo("search_tp");
	initCombo("measure_tp");
	initCombo("ord_tp_cd");
	initCombo("bk_sts_cd");
	initCombo("vw_tp_cd");
	
    loading_flag = "Y";
	initControl();
	
	// #1535 [WMS4.0]4.4.2 Test 중 발견한 문제들(3/15 - 2차 테스트)
	formObj.link_Wave.style.display = "none";
	
	// Warehouse&Contract 세션 정보 Default 세팅
	$("#wh_cd").val($("#def_wh_cd").val());
//	$("#wh_nm").val($("#def_wh_nm").val());
	$("#ctrt_no").val($("#def_wh_ctrt_no").val());
	$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
	//#1699 [WMS4.0] OPUS and Mobile Inbound/Outbound Default 조회 기준일
	$("#cond_tp_date").val("EST_OUT_DT");
	$("#cond_fm_date").val(ComGetDateAdd(null, "M", -1, "-"));
	$("#cond_to_date").val(ComGetDateAdd(null, "M", +1, "-"));
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
	sheet1_btn_hide();
	
	// #4798 [Korex] WMS View Type Default Option    
	changeViewType()
	
    //<!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
	if($("#wh_cd").val() != null && $("#wh_cd").val() !=''){
		doWork('SEARCHLIST');	
	}
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/**
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++] = combo_obj;
 }
 
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
 function comboAddItem(sComboId, itemNm, itemCd){
		
		var comboObj = document.getElementById(sComboId);
		
		var option =  document.createElement("option");
		
		option.text = itemNm;
		option.value = itemCd;
		
		comboObj.add(option);
	}

	function comboRemoveAll(sComboId){
		
		var comboObj = document.getElementById(sComboId);
		
		var len = comboObj.length;
		
		for(var i = len -1 ; i >= 0 ; i--){
			comboObj.remove(i);
		}
	}
function initCombo(comboObj) {
	var formObj = document.form;
	var i=0;
	var vTextSplit=null;
	var vCodeSplit=null;
	switch(comboObj) { 	
		case "cond_tp_no":
			var txt = "Order No.|Booking No.|Wave No."; //|LP No";
			var val = "CUST_ORD_NO|WOB_BK_NO|WAVE_NO"; //|LP_NO";
			vTextSplit = txt.split("|");
			vCodeSplit = val.split("|");				
			with(comboObj) {
				for(var j=0;j<vCodeSplit.length; j++){
					comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index = 0;
        	} 			
			break;		
		
		case "cond_tp_date":
			var txt = "Booking Date|Estimated Date|Outbound Date";
			var val = "BK_DATE|EST_OUT_DT|OUTBOUND_DT";
			vTextSplit = txt.split("|");
			vCodeSplit = val.split("|");				
			with(comboObj) {
				for(var j=0;j<vCodeSplit.length; j++){
					comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
				}
        	} 			
			break;
		case "ship_to_tp":
			var txt = "Ship To(Code)|Ship To(Addr)";
			var val = "SHIP_TO_CODE|SHIP_TO_ADDR";
			vTextSplit = txt.split("|");
			vCodeSplit = val.split("|");				
			with(comboObj) {
				for(var j=0;j<vCodeSplit.length; j++){
					comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index = 0;
        	} 			
			break;	
		case "ref_tp":
			var txt = "Reference No.|M B/L No.|H B/L No.";
			var val = "REF_NO|MBL_NO|HBL_NO";
			vTextSplit = txt.split("|");
			vCodeSplit = val.split("|");				
			with(comboObj) {
				for(var j=0;j<vCodeSplit.length; j++){
					comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index = 0;
        	} 			
			break;
		case "search_tp":
			var txt = "SKU|LOT|LOC";
			var val = "SKU|LOT|LOC";
			vTextSplit = txt.split("|");
			vCodeSplit = val.split("|");				
			with(comboObj) {
				for(var j=0;j<vCodeSplit.length; j++){
					comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index = 0;
        	} 			
			break;
		case "measure_tp":
			var txt = "KGS|LBS|ALL";
			var val = "KGS|LBS|ALL";
			vTextSplit = txt.split("|");
			vCodeSplit = val.split("|");				
			with(comboObj) {
				for(var j=0;j<vCodeSplit.length; j++){
					comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
				}
				
				if($("#def_std_unit").val() == "")
				{
					formObj.measure_tp.value = "ALL";
				}
				else
				{
					formObj.measure_tp.value = $("#def_std_unit").val();
				}
				
        	} 			
			break;
		case "ord_tp_cd":
			vTextSplit = ord_tp_cdText.split("|");
			vCodeSplit = ord_tp_cdCode.split("|");				
			with(comboObj) {
				comboAddItem(comboObj,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index = 0;
        	}
			break;
			
		case "bk_sts_cd":
			vTextSplit = bk_sts_cdText.split("|");
			vCodeSplit = bk_sts_cdCode.split("|");				
			with(comboObj) {
				comboAddItem(comboObj,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index = 0;
        	}
			break;
			
		case "vw_tp_cd":
			//var txt = "By Item|By Order";
			//var val = "I|O";
			//vTextSplit = txt.split("|");
			//vCodeSplit = val.split("|");

			// #4798 [Korex] WMS View Type Default Option
			vTextSplit = vw_tp_cdText.split("|");
			vCodeSplit = vw_tp_cdCode.split("|");
			with(comboObj) {
				for(var j=0;j<vCodeSplit.length; j++){
					comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index = 0;
        	} 			
			break;
		}
	} 

function initControl() {
	var formObject = document.form;
    
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    // OnChange 이벤트
    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
    // OnKeyUp 이벤트
    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
    //- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}

function obj_keydown() {
	var vKeyCode = event.keyCode;
	var formObj = document.form;
	var srcName = event.srcElement.getAttribute("name");
	var srcValue = event.srcElement.getAttribute("value");

	if (vKeyCode == 13) {
		switch (srcName) {
			case "cond_no":	
				btn_Search();
			break;	
			case "item_cd":	
				btn_Search();
			break;
			case "lot_no":	
				btn_Search();
			break;
			case "ref_no":	
				btn_Search();
			break;
			case "buyer_addr":	
				btn_Search();
			break;
		}			
	}
	
	
	var backspace = 8; 
    var t = document.activeElement;  
 
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
    
    
	return true;
}


//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	var formObj = document.form;
	try {
		switch(srcName) {
			case "SEARCHLIST":	
				btn_Search();
				break;
			case "EXCEL":	
				btn_Excel();
				break;
			case "btn_cond_to_date":	
				var cal = new ComCalendarFromTo();
				cal.select(formObj.cond_fm_date,formObj.cond_to_date, 'MM-dd-yyyy');
				break;
			case "btn_wh_cd":
					locationPopup();	
				break;
			case "btn_ctrt_no" :
				get_ctrt_no(popupCtr);
				break;
			case "btn_buyer_cd":
				rtnary=new Array(2);
				rtnary[0]="1";
				rtnary[1]=formObj.buyer_nm.value
				rtnary[2]=window;
				callBackFunc = "setBuyerInfo";
				modal_center_open('./CMM_POP_0010.clt?callTp='+"", rtnary, 1150,650,"yes");
			break;
			case 'NEW':
	            var paramStr="./WHOutMgmt.clt";
	            parent.mkNewFrame('Outbound Management', paramStr);
	            break;
			case 'link_Wave':
				var sheetObj = sheet1;
				var isCheck = false;
				for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
					if(sheetObj.GetCellValue(i, fix_grid01+"chk").trim() == "1" && sheetObj.GetCellValue(i, fix_grid01+"bk_sts_nm").trim() != "Booked"){
						ComShowCodeMessage("COM0777");
					}
					if(sheetObj.GetCellValue(i, fix_grid01+"chk").trim() == "1"){
						isCheck = true;
					}
				}
//				if(sheetObj.GetCellValue(Row, fix_grid01 + "wave_no").trim() != "" && sheetObj.GetCellValue(Row, fix_grid01 + "smp_wave_flg").trim() == "Y")
//				{
//					var sUrl="./WaveSmpMgmt.clt?req_wave_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wave_no");
//					parent.mkNewFrame('Wave', sUrl);	
//				} 
				break;
			case "sheet1_btn_show":
				
				sheet1.SetColHidden(fix_grid01+"ord_tp_nm", 0);
				sheet1.SetColWidth(fix_grid01+"ord_tp_nm", 80);
				
				sheet1.SetColHidden(fix_grid01+"wob_bk_no", 0);
 				sheet1.SetColWidth(fix_grid01+"wob_bk_no", 120);
 				
 				sheet1.SetColHidden(fix_grid01+"lot_id", 0);
 				sheet1.SetColWidth(fix_grid01+"lot_id", 130);
 				
 				/*sheet1.SetColHidden(fix_grid01+"wave_no", 0);
 				sheet1.SetColWidth(fix_grid01+"wave_no", 120);*/
 				
 				sheet1.SetColHidden(fix_grid01+"item_cbm", 0);
 				sheet1.SetColWidth(fix_grid01+"item_cbm", 80);
 				
 				sheet1.SetColHidden(fix_grid01+"item_cbf", 0);
 				sheet1.SetColWidth(fix_grid01+"item_cbf", 80);
 				
 				sheet1.SetColHidden(fix_grid01+"item_grs_kgs", 0);
 				sheet1.SetColWidth(fix_grid01+"item_grs_kgs", 80);
 				
 				sheet1.SetColHidden(fix_grid01+"item_grs_lbs", 0);
 				sheet1.SetColWidth(fix_grid01+"item_grs_lbs", 80);
 				
 				sheet1.SetColHidden(fix_grid01+"item_net_kgs", 0);
 				sheet1.SetColWidth(fix_grid01+"item_net_kgs", 80);
 				
 				sheet1.SetColHidden(fix_grid01+"item_net_lbs", 0);
 				sheet1.SetColWidth(fix_grid01+"item_net_lbs", 80);
 				
 				if (formObj.vw_tp_cd.value == "O") {
					sheet1.SetColHidden(fix_grid01+"trucker_cd", 0);
					sheet1.SetColWidth(fix_grid01+"trucker_cd", 90);
					
					sheet1.SetColHidden(fix_grid01+"trucker_nm", 0);
					sheet1.SetColWidth(fix_grid01+"trucker_nm", 180);
					
					sheet1.SetColHidden(fix_grid01+"dlv_ord_no", 0);
					sheet1.SetColWidth(fix_grid01+"dlv_ord_no", 120);
					
					sheet1.SetColHidden(fix_grid01+"ref_no", 0);
					sheet1.SetColWidth(fix_grid01+"ref_no", 120);
					
					sheet1.SetColHidden(fix_grid01+"commc_inv_no", 0);
					sheet1.SetColWidth(fix_grid01+"commc_inv_no", 120);
					
					sheet1.SetColHidden(fix_grid01+"rmk", 0);
					sheet1.SetColWidth(fix_grid01+"rmk", 120);
					
					sheet1.SetColHidden(fix_grid01+"wh_cd", 0);
	 				sheet1.SetColWidth(fix_grid01+"wh_cd", 200);
	 				
	 				sheet1.SetColHidden(fix_grid01+"lot_id", 1);
	 				sheet1.SetColWidth(fix_grid01+"lot_id", 1);
				}
				
 				sheet1.SelectCell(2, fix_grid01+"item_net_lbs");
				sheet1.SelectCell(2, fix_grid01+"wob_bk_no");		
 				$("#sheet1_btn_show").hide();
 				$("#sheet1_btn_hide").show();
 				break;
 			case "sheet1_btn_hide":
 				sheet1_btn_hide();
 				$("#sheet1_btn_hide").hide();
 				$("#sheet1_btn_show").show();
 				break;
 				
			case "DO":
			if(sheet1.RowCount()==0){
				//There is no data
				alert(getLabel('FMS_COM_ALT004'));
			}else if (sheet1.GetCellValue(sheet1.GetSelectRow(),fix_grid01+"chk")==1){
				var order_no = sheet1.GetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_ord_no");
				var booking_no = sheet1.GetCellValue(sheet1.GetSelectRow(),fix_grid01+"wob_bk_no");
				
				var reqParam='?cust_ord_no=' + order_no;
				reqParam += '&wob_bk_no=' + booking_no;
				
				reqParam += '&mrd_file_nm=delivery_order_03.mrd';
				
				popGET('CMM_POP_1000.clt'+reqParam, '', 700, 750, "scroll:yes;status:no;help:no;");
			} else {
				alert(getLabel('FMS_COM_ALT004'));
			}
			break;
        } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}

function sheet1_btn_hide(){
	sheet1.SetColHidden(fix_grid01+"wh_cd", 1);
	sheet1.SetColWidth(fix_grid01+"wh_cd", 1);
	
	sheet1.SetColHidden(fix_grid01+"trucker_cd", 1);
	sheet1.SetColWidth(fix_grid01+"trucker_cd", 1);
	
	sheet1.SetColHidden(fix_grid01+"trucker_nm", 1);
	sheet1.SetColWidth(fix_grid01+"trucker_nm", 1);
	
	sheet1.SetColHidden(fix_grid01+"dlv_ord_no", 1);
	sheet1.SetColWidth(fix_grid01+"dlv_ord_no", 1);
	
	sheet1.SetColHidden(fix_grid01+"ref_no", 1);
	sheet1.SetColWidth(fix_grid01+"ref_no", 1);
	
	sheet1.SetColHidden(fix_grid01+"commc_inv_no", 1);
	sheet1.SetColWidth(fix_grid01+"commc_inv_no", 1);
	
	sheet1.SetColHidden(fix_grid01+"rmk", 1);
	sheet1.SetColWidth(fix_grid01+"rmk", 1);
	
	sheet1.SetColHidden(fix_grid01+"ord_tp_nm", 1);
	sheet1.SetColWidth(fix_grid01+"ord_tp_nm", 1);
	
	sheet1.SetColHidden(fix_grid01+"wob_bk_no", 1);
	sheet1.SetColWidth(fix_grid01+"wob_bk_no", 1);
	
	sheet1.SetColHidden(fix_grid01+"lot_id", 1);
	sheet1.SetColWidth(fix_grid01+"lot_id", 1);
	
	/*sheet1.SetColHidden(fix_grid01+"wave_no", 1);
	sheet1.SetColWidth(fix_grid01+"wave_no", 1);*/
	
	sheet1.SetColHidden(fix_grid01+"item_cbm", 1);
	sheet1.SetColWidth(fix_grid01+"item_cbm", 1);
	
	sheet1.SetColHidden(fix_grid01+"item_cbf", 1);
	sheet1.SetColWidth(fix_grid01+"item_cbf", 1);
	
	sheet1.SetColHidden(fix_grid01+"item_grs_kgs", 1);
	sheet1.SetColWidth(fix_grid01+"item_grs_kgs", 1);
	
	sheet1.SetColHidden(fix_grid01+"item_grs_lbs", 1);
	sheet1.SetColWidth(fix_grid01+"item_grs_lbs", 1);
	
	sheet1.SetColHidden(fix_grid01+"item_net_kgs", 1);
	sheet1.SetColWidth(fix_grid01+"item_net_kgs", 1);
	
	sheet1.SetColHidden(fix_grid01+"item_net_lbs", 1);
	sheet1.SetColWidth(fix_grid01+"item_net_lbs", 1);
}
function get_ctrt_no(popupCtr){
	var formObj=document.form;
	var sUrl = "";
	if(popupCtr == "EnterK"){
		 sUrl = "ContractRoutePopup.clt?ctrt_no="+"&ctrt_nm="+formObj.ctrt_nm.value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd + "&pnl_svc_tp_cd=" + pnl_svc_tp_cd;
	}else{
		 sUrl = "ContractRoutePopup.clt?ctrt_no=" +"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd + "&pnl_svc_tp_cd=" + pnl_svc_tp_cd;
	}
	var ord_tp_lvl1_cd = "\'P\'";
	var pnl_svc_tp_cd= "44";
	
	callBackFunc = "setCtrtNoInfo";
	modal_center_open(sUrl,callBackFunc, 900, 580,"yes");
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet1":      //IBSheet1 init
		with (sheetObj) {
		        
//		        var hdr1="Wave No|Order No.|Order Type|Estimated\nDate|Status|Outbound\nDate|Contract|SKU|SKU|Inbound Date|Item Lot No|Order Qty|Order Qty|Order Qty|Order Qty|Order Qty|Allocated Qty (EA)|Allocated Qty (EA)|Allocated Qty (EA)|Location|Ship To|Volume|Volume|GWT|GWT|NWT|NWT|Type|CNTR/TR No|Seal No|Booking No|M B/L|H B/L|SO No|Reference No.|Lot ID|Additional Lot Property|Additional Lot Property|Additional Lot Property|Inbound Information|Inbound Information|Sum Price|Sum Price|Warehouse|smp_wave_flg|bk_sts_cd|wh_nm";
//		        var hdr2="Wave No|Order No.|Order Type|Estimated\nDate|Status|Outbound\nDate|Contract|Code|Description|Inbound Date|Item Lot No|UOM|UOM|UOM Qty|Pack Master Info.|EA Qty|Allocated|Picked|Shipped|Location|Ship To|CBM|CBF|KGS|LBS|KGS|LBS|Type|CNTR/TR No|Seal No|Booking No|M B/L|H B/L|SO No|Reference No.|Lot ID|Expiration Date|Lot 04|Lot 05|Booking No|PO No|Currency|Price|Warehouse|smp_wave_flg|bk_sts_cd|wh_nm";
		        var prefix=fix_grid01;
		        /*var hdr1= 'CHK|Work \nSheet|OrderNo.|System \nBKG. No.|Type|Estimated\nDate|Status|Outbound\nDate|Contract|ShipTo|SKU|SKU|OrderQty|OrderQty|OrderQty|AllocatedQty(EA)|AllocatedQty(EA)|AllocatedQty(EA)|Item Lot No.|Lot4|Lot5|LotID|Wave No.|Volume|Volume|G/WT|G/WT|N/WT|N/WT|Inbound Information|Inbound Information|Inbound Information|UOMPrice|UOMPrice|Location|Type|CNTR/TRNo|SealNo|MB/L|HB/L|SONo|ReferenceNo.|AdditionalLotProperty|AdditionalLotProperty|AdditionalLotProperty|Warehouse|smp_wave_flg|bk_sts_cd|wh_nm';
		        var hdr2 = 'CHK|Work \nSheet|OrderNo.|System \nBKG. No.|Type|Estimated\nDate|Status|Outbound\nDate|Contract|ShipTo|Code|Description|UOM|Qty|Total|Allocated|Picked|Shipped|Item Lot No.|Lot4|Lot5|LotID|Wave No.|CBM|CBF|KGS|LBS|KGS|LBS|BookingNo|PONo|Date|Currency|Price|Location|Type|CNTR/TRNo|SealNo|BookingNo|MB/L|HB/L|SONo|ReferenceNo.|ExpirationDate|Lot04|Lot05|Warehouse|smp_wave_flg|bk_sts_cd|wh_nm';*/
		        SetConfig( { SearchMode:2, MergeSheet:7, Page:10000, FrozenCol:0, DataRowMerge:0 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('WHOutList_Sheet1_HDR1'), Align:"Center"},
		                        { Text:getLabel('WHOutList_Sheet1_HDR2'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ 
		                       {Type:"Text",     Hidden:1,  Width:120,  Align:"Center", ColMerge:1,   Format:"",   			  SaveName:prefix+"wob_bk_no_org",    	KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Radio",    Hidden:0,  Width:50,  	Align:"Center", ColMerge:1,   Format:"",   			  SaveName:prefix+"chk",    			KeyField:0,    UpdateEdit:1,   InsertEdit:1},
							   {Type:"Image",    Hidden:1,  Width:50,  	Align:"Center", ColMerge:0,   Format:"",   			  SaveName:prefix+"work_sht",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:80,   Align:"Center", ColMerge:1,   Format:"",   			  SaveName:prefix+"bk_sts_nm",    	KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   // #4562 [Korex] WMS Outbound Delivery Status (v461.14)
							   {Type:"Text",     Hidden:0,  Width:80,   Align:"Center", ColMerge:1,   Format:"",   			  SaveName:prefix+"dlvr_flg",    	KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:120,  Align:"Center", ColMerge:1,   Format:"",   			  SaveName:prefix+"inv_sts_nm",    	KeyField:0,    UpdateEdit:0,   InsertEdit:0},       /*#2321 [WMS4.0] INVOICE PAID STATUS TO BE ADDED TO IN/OUTBOUND LIST*/
							   {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",  	ColMerge:1,   Format:"",   			  SaveName:prefix+"cust_ord_no",    	KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",  	ColMerge:1,   Format:"",   			  SaveName:prefix+"ctrt_nm",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:90,   Align:"Center", ColMerge:1,   Format:"",   			  SaveName:prefix+"item_cd",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:180,  Align:"Left",  	ColMerge:1,   Format:"",  			  SaveName:prefix+"item_nm",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:1,  Width:95,   Align:"Center", ColMerge:1,   Format:"",   			  SaveName:prefix+"item_seq",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Date",     Hidden:0,  Width:120,  Align:"Center", ColMerge:1,   Format:"Ymd",   		  SaveName:prefix+"est_out_dt",         KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Date",     Hidden:0,  Width:120,  Align:"Center", ColMerge:1,   Format:"Ymd",   		  SaveName:prefix+"outbound_dt",        KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:40,   Align:"Center", ColMerge:1,   Format:"",   			  SaveName:prefix+"item_pkgunit",       KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Float",    Hidden:0,  Width:60,   Align:"Right",  ColMerge:1,   Format:"Float",         SaveName:prefix+"item_pkgqty",	    KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:WMS_QTY_POINT},
							   {Type:"AutoSum",  Hidden:0,  Width:60,   Align:"Right",  ColMerge:1,   Format:WMS_QTY_FORMAT2, SaveName:prefix+"item_ea_qty",        KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:WMS_QTY_POINT},
							   {Type:"AutoSum",  Hidden:1,  Width:100,  Align:"Right",  ColMerge:0,   Format:WMS_QTY_FORMAT2, SaveName:prefix+"ord_qty",  		    KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:WMS_QTY_POINT},
							   {Type:"AutoSum",  Hidden:0,  Width:60,   Align:"Right",  ColMerge:0,   Format:WMS_QTY_FORMAT2, SaveName:prefix+"pick_item_ea_qty",   KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:WMS_QTY_POINT},
							   {Type:"AutoSum",  Hidden:0,  Width:60,   Align:"Right",  ColMerge:0,   Format:WMS_QTY_FORMAT2, SaveName:prefix+"pickd_item_ea_qty",  KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:WMS_QTY_POINT},
							   {Type:"AutoSum",  Hidden:0,  Width:60,   Align:"Right",  ColMerge:0,   Format:WMS_QTY_FORMAT2, SaveName:prefix+"ship_item_ea_qty",   KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:WMS_QTY_POINT},
							   {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",  	ColMerge:0,   Format:"",   			  SaveName:prefix+"lot_no",    		    KeyField:0,    UpdateEdit:0,   InsertEdit:0}, 
							   {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",  	ColMerge:0,   Format:"",   			  SaveName:prefix+"lot_04",    		    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",  	ColMerge:0,   Format:"",   			  SaveName:prefix+"lot_05",    		    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:1,  Width:80,   Align:"Right",  ColMerge:0,   Format:"",   			  SaveName:prefix+"item_ser_no",    	KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:1,  Width:80,   Align:"Center", ColMerge:0,   Format:"",   		  	  SaveName:prefix+"lic_plat_no",    	KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   //#4209 [BNX WMS4.0] Outbound Management Ship To BUYER_NM column add
							   {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",  	ColMerge:0,   Format:"",   			  SaveName:prefix+"ship_to_nm",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0,		ColMerge:0},
							   {Type:"Text",     Hidden:0,  Width:200,  Align:"Left",  	ColMerge:0,   Format:"",   			  SaveName:prefix+"ship_to_addr",  		KeyField:0,    UpdateEdit:0,   InsertEdit:0,		ColMerge:0},
							   {Type:"Text",     Hidden:0,  Width:90,  	Align:"Center", ColMerge:0,   Format:"",   			  SaveName:prefix+"trucker_cd",    	    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:180,  Align:"Left",   ColMerge:0,   Format:"",   			  SaveName:prefix+"trucker_nm",    	    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:80,  	Align:"Center", ColMerge:0,   Format:"",   			  SaveName:prefix+"dlv_ord_no",    	    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",  	ColMerge:0,   Format:"",   			  SaveName:prefix+"ref_no",    		    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:120,  Align:"Center", ColMerge:0,   Format:"",   			  SaveName:prefix+"commc_inv_no",    	KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:120,  Align:"Center", ColMerge:0,   Format:"",   			  SaveName:prefix+"rmk",    	        KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:80,  	Align:"Center", ColMerge:0,   Format:"",   			  SaveName:prefix+"ord_tp_nm",    	    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:120,  Align:"Center", ColMerge:0,   Format:"",   			  SaveName:prefix+"wob_bk_no",    	    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:0,  Width:120,  Align:"Center", ColMerge:0,   Format:"",   			  SaveName:prefix+"lot_id",    		    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:1,  Width:120,  Align:"Center", ColMerge:0,   Format:"",   			  SaveName:prefix+"wave_no",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"AutoSum",  Hidden:0,  Width:65,   Align:"Right",  ColMerge:0,   Format:"NullFloat",     SaveName:prefix+"item_cbm",           KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:WMS_CBM_POINT_COUNT },
				               {Type:"AutoSum",  Hidden:0,  Width:65,   Align:"Right",  ColMerge:0,   Format:"NullFloat",     SaveName:prefix+"item_cbf",           KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:WMS_CBM_POINT_COUNT },
				               {Type:"AutoSum",  Hidden:0,  Width:65,   Align:"Right",  ColMerge:0,   Format:"NullFloat",     SaveName:prefix+"item_grs_kgs",       KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:WMS_WGT_POINT_COUNT },
				               {Type:"AutoSum",  Hidden:0,  Width:65,   Align:"Right",  ColMerge:0,   Format:"NullFloat",     SaveName:prefix+"item_grs_lbs",       KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:WMS_WGT_POINT_COUNT },
				               {Type:"AutoSum",  Hidden:0,  Width:65,   Align:"Right",  ColMerge:0,   Format:"NullFloat",     SaveName:prefix+"item_net_kgs",       KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:WMS_WGT_POINT_COUNT },
				               {Type:"AutoSum",  Hidden:0,  Width:65,   Align:"Right",  ColMerge:0,   Format:"NullFloat",     SaveName:prefix+"item_net_lbs",       KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:WMS_WGT_POINT_COUNT },
				               {Type:"Text",     Hidden:0,  Width:200,  Align:"Center", ColMerge:0,   Format:"",   			  SaveName:prefix+"wh_cd",    		    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:1,  Width:95,   Align:"Center", ColMerge:0,   Format:"",   			  SaveName:prefix+"wib_bk_no",    	    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:1,  Width:120,  Align:"Left", 	ColMerge:0,   Format:"",   			  SaveName:prefix+"po_no",    		    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				           	   {Type:"Date",     Hidden:1,  Width:80,   Align:"Center", ColMerge:0,   Format:"Ymd",   		  SaveName:prefix+"inbound_dt",    	    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text",     Hidden:1,  Width:70,   Align:"Center", ColMerge:0,   Format:"",   			  SaveName:prefix+"curr_cd",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:1,  Width:90,   Align:"Right",  ColMerge:0,   Format:"NullFloat",     SaveName:prefix+"unit_price",         KeyField:0,    UpdateEdit:0,   InsertEdit:0, PointCount:2},

				               {Type:"Text",     Hidden:1,  Width:80,   Align:"Left",  	ColMerge:0,   Format:"",   			SaveName:prefix+"wh_loc_nm",    KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:1,  Width:40,   Align:"Center", ColMerge:0,   Format:"",   			SaveName:prefix+"eq_tpsz_cd",    	KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:1,  Width:80,   Align:"Center", ColMerge:0,   Format:"",   			SaveName:prefix+"eq_no",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:1,  Width:80,   Align:"Left",  	ColMerge:0,   Format:"",   			SaveName:prefix+"seal_no",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:1,  Width:95,   Align:"Left",  	ColMerge:0,   Format:"",   			SaveName:prefix+"mbl_no",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:1,  Width:95,   Align:"Left",  	ColMerge:0,   Format:"",   			SaveName:prefix+"hbl_no",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:1,  Width:110,  Align:"Center", ColMerge:0,   Format:"",   			SaveName:prefix+"sao_no",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Date",     Hidden:1,  Width:100,  Align:"Center", ColMerge:0,   Format:"Ymd",   		SaveName:prefix+"exp_dt",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},  
				               {Type:"Text",     Hidden:1,  Width:90,   Align:"Center", ColMerge:0,   Format:"",   			SaveName:prefix+"smp_wave_flg",   	KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:1,  Width:90,   Align:"Center", ColMerge:0,   Format:"",   			SaveName:prefix+"bk_sts_cd",    	KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:1,  Width:90,   Align:"Center", ColMerge:0,   Format:"",   			SaveName:prefix+"wh_nm",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
							   {Type:"Text", 	 Hidden:1,  Width:40,  	Align:"Right",  ColMerge:0,   	  					SaveName:prefix+"item_pkgunit_qty", KeyField:0,     UpdateEdit:0,   InsertEdit:0, 	CalcLogic:"",   Format:"Integer",            PointCount:0,   UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:1,  Width:200,  Align:"Left",  	ColMerge:0,   Format:"",   			SaveName:prefix+"pkg_info",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},						   
				               
				               //#3890 [BNX WMS] MOBILE REQUIREMENTS
				               {Type:"Text",     Hidden:0,  Width:120,  Align:"Center",  	ColMerge:0,   Format:"",   			SaveName:prefix+"rgst_id",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0},
				               {Type:"Text",     Hidden:0,  Width:150,  Align:"Center",  	ColMerge:0,   Format:"YmdHms",   	SaveName:prefix+"rgst_loc_dt",    		KeyField:0,    UpdateEdit:0,   InsertEdit:0}
				               ];
		        
		        // Set dynamic height.
		        var autoHeight = $(window).height() - 250;
		        SetSheetHeight(autoHeight > 450 ? autoHeight : 450);
		        InitColumns(cols);
		        SetImageList(0,"web/img/main/icon_doc.gif");
				SetImageList(1,"web/img/main/icon_doc_g.gif");
		        SetColProperty(prefix+"wh_cd", {ComboText:wh_cdText, ComboCode:wh_cdCode} );
//    			SetEditable(0);
    			SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		}
		break;
	}
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet1_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.form;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
} 
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	var sheetObj=sheet1;//sheetObjects[0];
	var seq=0;
	var seqBkNo="";
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		
//		 if (sheetObj.GetCellValue(i, fix_grid01 + "work_sht_yn") =="Y")
//	 		{
//				sheetObj.SetCellImage(i, fix_grid01 + "work_sht",0);
//	 		}
//	 		else
//			{
//	 			sheetObj.SetCellImage(i, fix_grid01 + "work_sht",1);
//			}
//		if(i == sheetObj.LastRow())
//		{
//			sheetObj.SetRowBackColor(i,sheetObj.GetSubSumBackColor());
//		}
//		else
//		{
			//BOOKING NO 폰트색상 변경
			sheetObj.SetCellFontColor(i, fix_grid01 + "wob_bk_no","#0100FF");
			sheetObj.SetCellFontColor(i, fix_grid01 + "cust_ord_no","#0100FF");
			sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
			sheetObj.SetCellFontColor(i, fix_grid01 + "wave_no","#0100FF");
			
 			sheetObj.SetCellFontUnderline(i, fix_grid01 + "wob_bk_no", 1);
 			sheetObj.SetCellFontUnderline(i, fix_grid01 + "cust_ord_no", 1);
 			sheetObj.SetCellFontUnderline(i, fix_grid01 + "wib_bk_no", 1);
 			sheetObj.SetCellFontUnderline(i, fix_grid01 + "wave_no", 1);
 			
//			var item_ea_qty = sheetObj.GetCellValue(i, fix_grid01 + "item_ea_qty");
//			var item_pkgqty = sheetObj.GetCellValue(i, fix_grid01 + "item_pkgqty");
//			var item_pkgunit_qty = item_ea_qty / item_pkgqty;
//			sheetObj.SetCellValue(i, fix_grid01 + "item_pkgunit_qty",item_pkgunit_qty,0);
//		}
 			
 			//#1700 [WMS4.0] Inbound / Outbound Status 색상 구분
 			if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "I"){ //Booked
 				sheetObj.SetCellBackColor(i, fix_grid01 + "bk_sts_nm",bgBooked);
 			}else if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "A"){ //Alllocate
 				sheetObj.SetCellBackColor(i, fix_grid01 + "bk_sts_nm",bgAllocated);
 			}else if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "P"){ //Picked
 				sheetObj.SetCellBackColor(i, fix_grid01 + "bk_sts_nm",bgPicked);
 			}else if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "X"
 				     || sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "BK"
 				    	 || sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "LP"
 				){ //Complete
 				sheetObj.SetCellBackColor(i, fix_grid01 + "bk_sts_nm",bgComplete);
 			}else if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "C"){ //Cancel
 				sheetObj.SetCellBackColor(i, fix_grid01 + "bk_sts_nm",bgCancel);
 			} 			
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	if(Row == sheetObj.LastRow())
	{
		return;
	}
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid01 + "wob_bk_no":
			var sUrl="./WHOutMgmt.clt?req_wob_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no")+ "&req_wh_cd="+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")+"&req_wh_nm="+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_nm") + "&cntr_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "eq_no");
			parent.mkNewFrame('Outbound Management', sUrl);
			break;
		case fix_grid01 + "cust_ord_no":
			var sUrl="./WHOutMgmt.clt?req_wob_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no")+ "&req_wh_cd="+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")+"&req_wh_nm="+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_nm") + "&cntr_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "eq_no");
			parent.mkNewFrame('Outbound Management', sUrl);
			break;
		case fix_grid01 + "wave_no":
			if(sheetObj.GetCellValue(Row, fix_grid01 + "wave_no").trim() != "" && sheetObj.GetCellValue(Row, fix_grid01 + "smp_wave_flg").trim() != "Y")
			{
				var sUrl="./WaveMgmt.clt?wave_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wave_no");
				parent.mkNewFrame('Wave', sUrl);	
			}
			else if(sheetObj.GetCellValue(Row, fix_grid01 + "wave_no").trim() != "" && sheetObj.GetCellValue(Row, fix_grid01 + "smp_wave_flg").trim() == "Y")
			{
				var sUrl="./WaveSmpMgmt.clt?req_wave_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wave_no");
				parent.mkNewFrame('Wave', sUrl);	
			} 
			break;	
//		case fix_grid01 + "bk_sts_nm":
//				moveMgmt(sheetObj, Row, Col);
//			break;	
		case fix_grid01 + "wib_bk_no":
			if(sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no") != "")
			{
				var sUrl="./WHInMgmt.clt?req_wob_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")+ "&req_wh_cd="+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")+"&req_wh_nm="+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_nm");
				parent.mkNewFrame('Inbound Management', sUrl);
			}
			break;
	}
}
function moveMgmt(sheetObj,Row,Col) {
	var wob_bk_no=sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no").trim();
	var ob_status=sheetObj.GetCellValue(Row, fix_grid01 + "bk_sts_cd").trim();
	var wave_no=sheetObj.GetCellValue(Row, fix_grid01 + "wave_no").trim();
    var sUrl="";
    if(wave_no != "" && sheetObj.GetCellValue(Row, fix_grid01 + "smp_wave_flg").trim() == "Y")
	{
    	sUrl = "./WaveSmpMgmt.clt?req_wave_no="+wave_no;
		parent.mkNewFrame('WaveSmpMgmt.clt', sUrl);
		return;
	}
	
    if ("I" == ob_status || "N" == ob_status || "C" == ob_status) { // Booked or Initial
    	var cancel_bk_param = "";
		if(sheetObj.GetCellValue(Row, fix_grid01 + "bk_sts_cd") == "C")
		{
			cancel_bk_param = "&bk_sts_cd=C";
		}
		
		sUrl = "./WHOutMgmt.clt?req_wob_bk_no=" + wob_bk_no 
		                         + "&req_wh_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd").trim() 
		                         + "&req_wh_nm=" + sheetObj.GetCellValue(Row, fix_grid01 + "wh_nm").trim() + cancel_bk_param;
		parent.mkNewFrame('WHOutMgmt.clt', sUrl);
		return;
    } 
    
    
    if ("A" == ob_status) { // Allocated
    	if(wave_no != "" && sheetObj.GetCellValue(Row, fix_grid01 + "smp_wave_flg").trim() != "Y")
		{
			sUrl = "./WaveMgmt.clt?wave_no="+wave_no;
			parent.mkNewFrame('WaveMgmt.clt', sUrl);
			return;
		}
		var sUrl = "./AllcMgmt.clt?wob_bk_no="+wob_bk_no;
		parent.mkNewFrame('AllcMgmt.clt', sUrl);
		
		return;
    }
    
    if ("LP" == ob_status || "BK" == ob_status) { // Completed
    	// 중복 체크
    	wob_out_no_dupCheck(wob_bk_no, ob_status);
    }		
}
function wob_out_no_dupCheck(wob_bk_no, whoc_flag) {
	var sXml=sheet1.GetSearchData("searchWHOCOutNoDupCheckGS.clt", "wob_bk_no="+wob_bk_no+"&whoc_flag="+whoc_flag+"&f_cmd=" +SEARCH02);
	var out_cnt=getXmlDataNullToNullString(sXml,'out_cnt');
	if (out_cnt == 1) {
		var sParam="wob_bk_no="+wob_bk_no;
		ajaxSendPost(setWHOCInfo, 'reqVal','&goWhere=aj&bcKey=searchWHOCOutNoInfo&'+sParam, './GateServlet.gsl');
	} else if (out_cnt > 1) { // 한 BKG에 여러 O/B Complete No가 있을 경우는 팝업 실행
		var sUrl = "WHOCPopup.clt?wob_bk_no="+wob_bk_no;
		callBackFunc = "setWHOCPopupInfo";
	    modal_center_open(sUrl, callBackFunc, 250, 350 ,"yes");
	}
}
function setWHOCInfo(reqVal)
{
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				var wob_out_no = rtnArr[0];
				var whoc_flag = rtnArr[1];
				var search_no = "";
				var search_tp = "";
				var search_div = "";	
				
				if (whoc_flag == "BK") {
					search_no = wob_out_no;		
					search_tp = "WOB_OUT_NO";
					search_div = "bk";			
				} else if (whoc_flag == "LP") {
					search_no = wob_out_no;		
					search_tp = "LP_NO";
					search_div = "lp";			
				}	
				
				var sUrl = APP_PATH+"/WHOCUpdate.clt?search_no="+search_no+"&search_tp="+search_tp+"&search_div="+search_div;
				parent.mkNewFrame('Outbound Complete Update', sUrl);
			}
		}
	}
}
function setWHOCPopupInfo(aryPopupData)
{
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		var wob_out_no=rtnValAry[1];
		var whoc_flag=rtnValAry[2];
		var search_no="";
		var search_tp="";
		var search_div="";	
		if (whoc_flag == "BK") {
			search_no=wob_out_no;		
			search_tp="WOB_OUT_NO";
			search_div="bk";			
		} else if (whoc_flag == "LP") {
			search_no=wob_out_no;		
			search_tp="LP_NO";
			search_div="lp";			
		}	
		var sUrl="./WHOCUpdate.clt?search_no="+search_no+"&search_tp="+search_tp+"&search_div="+search_div;
		parent.mkNewFrame('Outbound Complete Update', sUrl, "WHOCUpdate_" + search_no +"_"+ search_tp +"_"+ search_div);
	}
}
/*
 * NAME 엔터시 팝업호출 - warehouse name
 */
function locationPopup(){
	var formObj=document.form;
	var sUrl="LocationPopup.clt?loc_nm="+formObj.wh_nm.value+"&type=WH_ONLY&wh_auth=Y&ctrt_no=" + $("#ctrt_no").val() + "&ctrt_nm=" + $("#ctrt_nm").val();
	ComOpenPopup(sUrl, 900, 650, "setRcvLocInfo", "0,0", true);	
}
/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	var formObj=document.form;
	var ord_tp_lvl1_cd="\'P\'";
	var pnl_svc_tp_cd="44";
	var sUrl="ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd + "&pnl_svc_tp_cd=" + pnl_svc_tp_cd;
	ComOpenPopup(sUrl, 900, 620, "setCtrtNoInfo", "0,0", true);
}
/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CustPopup(){
	var formObj=document.form;
	var sUrl="CustomerPopup.clt?cust_nm="+formObj.buyer_nm.value+"&clear_flg=Y";
	ComOpenPopup(sUrl, 900, 630, "setBuyerInfo", "0,0", true);
}
/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	}else{
		var rtnValAry=aryPopupData.split("|");
		formObj.ctrt_no.value = rtnValAry[0];
		formObj.ctrt_nm.value = rtnValAry[1];	
	}
}
function setRcvLocInfo(aryPopupData){
	var formObj=document.form;
	ComSetObjValue(formObj.wh_cd,    aryPopupData[0][1]);
	ComSetObjValue(formObj.wh_nm,    aryPopupData[0][2]);
	ComSetObjValue(formObj.ctrt_no,    aryPopupData[0][30]);
	ComSetObjValue(formObj.ctrt_nm,    aryPopupData[0][31]);
	var std_unit=aryPopupData[0][33];
	if(std_unit == "")
	{
		$("#measure_tp")[0].SetSelectCode("ALL");
	}
	else
	{
		$("#measure_tp")[0].SetSelectCode(std_unit);
	}
}
function setBuyerInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.buyer_cd.value = rtnValAry[0];
		formObj.buyer_nm.value = rtnValAry[2];
	}
}
/*
 * 팝업 관련 로직 끝
 */
function btn_Search(){
	var formObj=document.form;
	var sheetObj1=sheet1;
	if(loading_flag != "Y"){
		return;
	}
	if (validateForm(formObj, 'search')) {
		formObj.f_cmd.value = SEARCH;
		sheetObj1.DoSearch("searchWHOutListGS.clt", FormQueryString(formObj,"") );
	}
}
/*
 * 엑셀다운로드
 */
function btn_Excel() {
	if(docObjects[0].RowCount() < 1){//no data
		ComShowCodeMessage("COM132501");
    }else{
    	sheet1.Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
    }
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			//warehouse 필수로 입력되어야함.
			if (ComIsEmpty(formObj.wh_cd)) {
				ComShowCodeMessage("COM0114", "Warehouse");
				$("#wh_cd").focus();
				return false;
			}
			if(ComIsEmpty(formObj.cond_no) && ComIsEmpty(formObj.lot_no) && ComIsEmpty(formObj.ref_no) && ComIsEmpty(formObj.cond_fm_date) && ComIsEmpty(formObj.cond_to_date))
			{
				ComShowCodeMessage("COM0114","Booking Date or Complete Date");
				$("#cond_fm_date").focus();
				return false;
			}
			if (!ComIsEmpty(formObj.cond_fm_date) && ComIsEmpty(formObj.cond_to_date)) {
				formObj.cond_to_date.value=ComGetNowInfo();
			}
			if (!ComIsEmpty(formObj.cond_fm_date) && !isDate(formObj.cond_fm_date)) {
				ComShowCodeMessage("COM0114", $("#cond_tp_date")[0].GetSelectText());
				formObj.cond_fm_date.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.cond_to_date) && !isDate(formObj.cond_to_date)) {
				ComShowCodeMessage("COM0114", $("#cond_tp_date")[0].GetSelectText());
				formObj.cond_to_date.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.cond_fm_date)&&ComIsEmpty(formObj.cond_to_date))||(ComIsEmpty(formObj.cond_fm_date)&&!ComIsEmpty(formObj.cond_to_date))) {
				ComShowCodeMessage("COM0122", $("#cond_tp_date")[0].GetSelectText());
				formObj.cond_fm_date.focus();
				return false;
			}
			if (getDaysBetween2(formObj.cond_fm_date.value, formObj.cond_to_date.value)<0) {
				ComShowCodeMessage("COM0122", $("#cond_tp_date")[0].GetSelectText());
				formObj.cond_fm_date.focus();
				return false;
			}
			//item_cd가 입력된경우 
			if(!ComIsEmpty(formObj.item_cd) && ComIsEmpty(formObj.wh_cd) && ComIsEmpty(formObj.cond_no))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				$("#wh_cd").focus();
				return false;
			}
			break;
		}
	}
	return true;
}
/***
 * AJAX CODE SEARCH
 */
/*
* Warehouse search
* OnKeyDown 13 or onChange
*/
function getLocInfo(obj){
	if(obj.value != ""){
		$.ajax({
			url : "searchTlLocInfo.clt?loc_cd="+obj.value+"&type=WH&wh_auth=Y",
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				resultLocInfo(result.xml, obj.name);
			}
		});
	}
	else
	{
		$("#wh_nm").val("");
	}
}
function resultLocInfo(resultXml, name){
	var formObj=document.form;
	if(name == "wh_cd"){
		if(getXmlDataNullToNullString(resultXml,'loc_nm') != ""){
			formObj.wh_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
			formObj.ctrt_no.value=getXmlDataNullToNullString(resultXml,'wh_ctrt_no');
			formObj.ctrt_nm.value=getXmlDataNullToNullString(resultXml,'wh_ctrt_nm');
			var std_unit=getXmlDataNullToNullString(resultXml,'std_unit');
			if(std_unit == "")
			{
				$("#measure_tp")[0].SetSelectCode("ALL");
			}
			else
			{
				$("#measure_tp")[0].SetSelectCode(std_unit);
			}
		}else{
			formObj.wh_cd.value="";
			formObj.wh_nm.value="";
		}
	}
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj){
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=searchCtrtInfo&s_code='+obj.value, './GateServlet.gsl');
}

function resultCtrtInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.form;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('@@;');
		var masterVals = rtnArr[0].split('@@^');	
		formObj.ctrt_nm.value = masterVals[3];
	}else{
		formObj.ctrt_no.value = "";
		formObj.ctrt_nm.value = "";
	}
}
/*
 * Consignee search
 * OnKeyDown 13 or onChange
 */
function getCustInfo(obj){
	var formObj=document.form;
	if(obj.value != ""){
		ajaxSendPost(resultCustInfo, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code="+obj.value, "./GateServlet.gsl");
	}
	else
	{
		formObj.buyer_cd.value="";
		formObj.buyer_nm.value="";
	}
}
function resultCustInfo(reqVal) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			formObj.buyer_cd.value=masterVals[0];
			formObj.buyer_nm.value=masterVals[3];
		}
		else{
			formObj.buyer_cd.value="";
			formObj.buyer_nm.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function ship_to_tp_OnChange(Code){
	$("#buyer_addr").val("");
	$("#buyer_cd").val("");
	$("#buyer_nm").val("");
	if(Code =="SHIP_TO_ADDR")
	{
		$("#divBuyerAddr").show();
		$("#divBuyerCode").hide();
	}
	else if(Code =="SHIP_TO_CODE")
	{
		$("#divBuyerAddr").hide();
		$("#divBuyerCode").show();
	}
}
function search_tp_OnChange(Code){
	sheet1.RemoveAll();
	if(Code == "LOT" || Code == "SKU")
	{
		sheet1.SetColHidden(fix_grid01 + "wh_loc_nm",1);
	}
	else
	{
		sheet1.SetColHidden(fix_grid01 + "wh_loc_nm",0);
	}
}
function measure_tp_OnChange(Code){
	if(Code == "ALL")
	{
		sheet1.SetColHidden(fix_grid01 + "item_cbm",0);
		sheet1.SetColHidden(fix_grid01 + "item_cbf",0);
		sheet1.SetColHidden(fix_grid01 + "item_grs_kgs",0);
		sheet1.SetColHidden(fix_grid01 + "item_grs_lbs",0);
		sheet1.SetColHidden(fix_grid01 + "item_net_kgs",0);
		sheet1.SetColHidden(fix_grid01 + "item_net_lbs",0);
	}
	else if(Code == "KGS")
	{
		sheet1.SetColHidden(fix_grid01 + "item_cbm",0);
		sheet1.SetColHidden(fix_grid01 + "item_cbf",1);
		sheet1.SetColHidden(fix_grid01 + "item_grs_kgs",0);
		sheet1.SetColHidden(fix_grid01 + "item_grs_lbs",1);
		sheet1.SetColHidden(fix_grid01 + "item_net_kgs",0);
		sheet1.SetColHidden(fix_grid01 + "item_net_lbs",1);
	}
	else
	{
		sheet1.SetColHidden(fix_grid01 + "item_cbm",1);
		sheet1.SetColHidden(fix_grid01 + "item_cbf",0);
		sheet1.SetColHidden(fix_grid01 + "item_grs_kgs",1);
		sheet1.SetColHidden(fix_grid01 + "item_grs_lbs",0);
		sheet1.SetColHidden(fix_grid01 + "item_net_kgs",1);
		sheet1.SetColHidden(fix_grid01 + "item_net_lbs",0);
	}
}

function sheet1_OnClick(sheetObj,Row,Col){
	var colStr = sheetObj.ColSaveName(Col);
	if(colStr=='Grd01chk'){
		if(sheetObj.GetCellValue(Row,fix_grid01 + 'bk_sts_cd')=='C'){
			ComBtnDisable("allocComplete");
		}else{
			ComBtnEnable("allocComplete");
		}
	}
}

/**
 * allocCmplPopup
 */
function allocCmplPopup(){
	rtnary[0] = 'N';
	var sheetObj = sheet1;
	var wh_cd = $("#wh_cd").val();
	var wave_no = sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "wave_no");
	var wob_bk_no = sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "wob_bk_no");
	
	if(sheetObj.RowCount()< 1){
		ComShowCodeMessage("COM0185","");
		return false;
	}
	
	//#3390-Check Authority WMS CODE
	var formObj=document.form;
	
	ComChecWmsCd_Authority(sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "wh_cd"));
	if (isWmsAuthOk == false) { 
		//alert('Not authenticated.\r\nYou are not authorized to access Warehouse');
		ComShowCodeMessage("COM0785");
		return
	}  
	
	var checkList = sheetObj.FindCheckedRow(fix_grid01 + 'chk');
	var arrRow = checkList.split("|");
	if(arrRow[0] == ""){
		alert(getLabel("WMS_MSG003"));
		return false;
	}
	if(arrRow.length > 1){
		alert(getLabel("WMS_MSG001"));
		return false;
	}else{
		/*if(wave_no != ""){
			alert(getLabel("WMS_MSG002"));
			return false;
		}*/
		var param = "?wave_no=" + wave_no + "&wh_cd=" + wh_cd + "&wob_bk_no=" + wob_bk_no
		var sUrl="./ManualAllcCmplPopup.clt" + param;
	   	callBackFunc = "setManualAllcCmplPopup";
	    //[WMS 개선 문의사항]-2.	Allocation & Complete :2.1	Pop-up Window Size 조정
	   	modal_center_open(sUrl, callBackFunc, 1280, 720,"yes");
	   	//modal_center_open(sUrl, callBackFunc, screen.width - 200, 720,"yes");
	}
}
function setManualAllcCmplPopup(){
	if(rtnary[0] == 'Y'){
		doWork("SEARCHLIST");
	}
}
//Enable/Disable columns on grid when View Type Combobox is changed.
function changeViewType() {
	var formObj = document.form;
	var vw_tp_cd_val = formObj.vw_tp_cd.value;
	sheet1.RemoveAll();
	if (vw_tp_cd_val == "O") {
		sheet1.SetColHidden(fix_grid01+"item_cd", 1);
		sheet1.SetColWidth(fix_grid01+"item_cd", 1);
		
		sheet1.SetColHidden(fix_grid01+"item_nm", 1);
		sheet1.SetColWidth(fix_grid01+"item_nm", 1);
		
		sheet1.SetColHidden(fix_grid01+"item_pkgunit", 1);
		sheet1.SetColWidth(fix_grid01+"item_pkgunit", 1);
		
		sheet1.SetColHidden(fix_grid01+"item_pkgqty", 1);
		sheet1.SetColWidth(fix_grid01+"item_pkgqty", 1);
		
		sheet1.SetColHidden(fix_grid01+"item_ea_qty", 1);
		sheet1.SetColWidth(fix_grid01+"item_ea_qty", 1);
		
		sheet1.SetColHidden(fix_grid01+"lot_no", 1);
		sheet1.SetColWidth(fix_grid01+"lot_no", 1);
		
		sheet1.SetColHidden(fix_grid01+"lot_04", 1);
		sheet1.SetColWidth(fix_grid01+"lot_04", 1);
		
		sheet1.SetColHidden(fix_grid01+"lot_05", 1);
		sheet1.SetColWidth(fix_grid01+"lot_05", 1);
		
		sheet1.SetColHidden(fix_grid01+"ord_qty", 0);
		sheet1.SetColWidth(fix_grid01+"ord_qty", 100);
		
		if ($('#sheet1_btn_show').css('display') == "none") {
			sheet1.SetColHidden(fix_grid01+"trucker_cd", 0);
			sheet1.SetColWidth(fix_grid01+"trucker_cd", 90);
			
			sheet1.SetColHidden(fix_grid01+"trucker_nm", 0);
			sheet1.SetColWidth(fix_grid01+"trucker_nm", 180);
			
			sheet1.SetColHidden(fix_grid01+"dlv_ord_no", 0);
			sheet1.SetColWidth(fix_grid01+"dlv_ord_no", 120);
			
			sheet1.SetColHidden(fix_grid01+"ref_no", 0);
			sheet1.SetColWidth(fix_grid01+"ref_no", 120);
			
			sheet1.SetColHidden(fix_grid01+"commc_inv_no", 0);
			sheet1.SetColWidth(fix_grid01+"commc_inv_no", 120);
			
			sheet1.SetColHidden(fix_grid01+"rmk", 0);
			sheet1.SetColWidth(fix_grid01+"rmk", 120);
			
			sheet1.SetColHidden(fix_grid01+"wh_cd", 0);
			sheet1.SetColWidth(fix_grid01+"wh_cd", 200);
			
			sheet1.SetColHidden(fix_grid01+"lot_id", 1);
			sheet1.SetColWidth(fix_grid01+"lot_id", 1);
		}
	} else {
		sheet1.SetColHidden(fix_grid01+"item_cd", 0);
		sheet1.SetColWidth(fix_grid01+"item_cd", 90);
		
		sheet1.SetColHidden(fix_grid01+"item_nm", 0);
		sheet1.SetColWidth(fix_grid01+"item_nm", 180);
		
		sheet1.SetColHidden(fix_grid01+"item_pkgunit", 0);
		sheet1.SetColWidth(fix_grid01+"item_pkgunit", 40);
		
		sheet1.SetColHidden(fix_grid01+"item_pkgqty", 0);
		sheet1.SetColWidth(fix_grid01+"item_pkgqty",60);
		
		sheet1.SetColHidden(fix_grid01+"item_ea_qty", 0);
		sheet1.SetColWidth(fix_grid01+"item_ea_qty", 60);
		
		sheet1.SetColHidden(fix_grid01+"lot_no", 0);
		sheet1.SetColWidth(fix_grid01+"lot_no", 110);
		
		sheet1.SetColHidden(fix_grid01+"lot_04", 0);
		sheet1.SetColWidth(fix_grid01+"lot_04", 80);
		
		sheet1.SetColHidden(fix_grid01+"lot_05", 0);
		sheet1.SetColWidth(fix_grid01+"lot_05", 80);
		
		sheet1.SetColHidden(fix_grid01+"ord_qty", 1);
		sheet1.SetColWidth(fix_grid01+"ord_qty", 1);
		
		sheet1.SetColHidden(fix_grid01+"trucker_cd", 1);
		sheet1.SetColWidth(fix_grid01+"trucker_cd", 1);
		
		sheet1.SetColHidden(fix_grid01+"trucker_nm", 1);
		sheet1.SetColWidth(fix_grid01+"trucker_nm", 1);
		
		sheet1.SetColHidden(fix_grid01+"dlv_ord_no", 1);
		sheet1.SetColWidth(fix_grid01+"dlv_ord_no", 1);
		
		sheet1.SetColHidden(fix_grid01+"ref_no", 1);
		sheet1.SetColWidth(fix_grid01+"ref_no", 1);
		
		sheet1.SetColHidden(fix_grid01+"commc_inv_no", 1);
		sheet1.SetColWidth(fix_grid01+"commc_inv_no", 1);
		
		sheet1.SetColHidden(fix_grid01+"rmk", 1);
		sheet1.SetColWidth(fix_grid01+"rmk", 1);
		
		sheet1.SetColHidden(fix_grid01+"wh_cd", 1);
		sheet1.SetColWidth(fix_grid01+"wh_cd", 1);
		
		
		if ($('#sheet1_btn_show').css('display') == "none") { 
			sheet1.SetColHidden(fix_grid01+"lot_id", 0);
			sheet1.SetColWidth(fix_grid01+"lot_id", 130);
		}
	}
	
	btn_Search();
}