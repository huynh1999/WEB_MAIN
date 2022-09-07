/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ClosingMgmt.js
*@FileTitle  : W/H Closing Management
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/04/13
=========================================================*/
//docObjects
var rtnary=new Array(2);
var callBackFunc = "";


var docObjects=new Array();
var sheetCnt=0;
//comboObjects
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var sts_cd_n = "N";
var loading_flag = "N";
var changSortBy_flg = false;
var loading_flag = "N";

//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
var gJsWmsRuPoint = "N";
var vPointCount = 3;
var vEditLen = 14;

//#3390-Check Authority WMS CODE
var isWmsAuthOk = false; 

/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

function loadPage() {
	//#1333 [Closing Other Entry] Cannot auto suggestion
	fnSetAutocompleteCallBack('f_cust_nm', 'clbck_CUST_POPLIST', 'LINER_POPLIST'); //Customer	
	var formObj = document.form;
	//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
	if(gJsWmsRuPoint == 'Y'){
		vPointCount = 8;
		vEditLen = 19;
	}
	for(var i=0;i<docObjects.length;i++){
		var sheetObject = docObjects[i];
	    comConfigSheet(sheetObject);
	    initSheet(sheetObject,i+1);
	    comEndConfigSheet(sheetObject);
	}
	if (!ComIsEmpty(formObj.req_cls_no.value) ) {
		commonModeChange("CLEAR_ALL");
		$("#s_cls_no").val(formObj.req_cls_no.value);
		btn_Search();
	} else {
		commonModeChange("INIT");
	}
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}



/*
 * init sheet
 */ 
function initSheet(sheetObj,sheetNo) {
	var cnt = 0;
	switch(sheetNo) {
	case 1:      //IBSheet1 init
		with(sheetObj){
		      var prefix=fix_grid01;
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('ClosingOther_HDR1'), Align:"Center"},
		                      { Text:getLabel('ClosingOther_HDR2'), Align:"Center"} ];
		      InitHeaders(headers, info);
			  
		      var cols = [ {Type:"Status",    	Hidden:1,  	Width:30,    	Align:"Center",   					SaveName:prefix+"ibflag" },
		                   {Type:"DelCheck",  	Hidden:0, 	Width:50,   	Align:"Center",  	ColMerge:1,   	SaveName:prefix+"del" },
		                   {Type:"Date",      	Hidden:0,  	Width:120, 		Align:"Center",		ColMerge:1,  	SaveName:prefix+"tj_dt",   			KeyField:1,   UpdateEdit:1,    InsertEdit:1, 		 Format:"Ymd"		},
		                   {Type:"Combo",      	Hidden:0,  	Width:200,   	Align:"Center",     ColMerge:1,   	SaveName:prefix+"frt_cd",  			KeyField:1,   UpdateEdit:1,   Format:"" },
		                   {Type:"Text",      	Hidden:0,  	Width:200,    	Align:"Left",   	ColMerge:1,   	SaveName:prefix+"frt_nm",  			KeyField:0,   UpdateEdit:1,   Format:"" },
		                   {Type:"Text",      	Hidden:1,  	Width:300,    	Align:"Left",   	ColMerge:1,   	SaveName:prefix+"remark",  			KeyField:0,   UpdateEdit:1,   Format:"" },
		                   {Type:"Combo",      	Hidden:0,  	Width:150,    	Align:"Left",    	ColMerge:1,   	SaveName:prefix+"unit_cd",    		KeyField:0,   UpdateEdit:1,   Format:"" },
		                   {Type:"Combo",      	Hidden:0,  	Width:100,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"unit_cd2",   		KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
		                   {Type:"Float",     	Hidden:0,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"unit_price",  		KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:vPointCount, EditLen:12  },
		                   {Type:"Float",       Hidden:0,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"qty",   			KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:5, EditLen:12 },
		                   {Type:"AutoSum",     Hidden:0,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"inv_amt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:2},
		                   
		                   {Type:"Text",      	Hidden:1,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"cust_cd",  		KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
		                   {Type:"Text",      	Hidden:1,  	Width:120,    	Align:"Left",     	ColMerge:1,   	SaveName:prefix+"cls_no",		 	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:""},
		                   {Type:"Date",      	Hidden:1,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"cls_dt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
		                   {Type:"Text",      	Hidden:1, 	Width:120,    	Align:"Left",     	ColMerge:1,   	SaveName:prefix+"inv_seq",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
		                   {Type:"Text", 		Hidden:1, 	Width:120,   	Align:"Center",     ColMerge:1,     SaveName:prefix+"wh_cd",         	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
		                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"ctrt_no",         	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
		                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"ofc_cd",         	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
		                   {Type:"Float",      	Hidden:1,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"inv_ttl_amt",		KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:5, EditLen:vEditLen },
		                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"sell_buy_tp_cd",   KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
		                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"frt_seq",         	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
		                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"wib_bk_frt_seq",   KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
		                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"rating_flg",       KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
					       {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"sts_cd",       	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
					       {Type:"PopupEdit",   Hidden:1,  	Width:100,   	Align:"Center",     ColMerge:1,     SaveName:prefix+"wib_bk_no",    	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:1,           Format:"",        EditLen:100}];

				InitColumns(cols);
	            SetSheetHeight(400);
	            resizeSheet();
				SetEditable(1);
				SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
				SetColProperty(prefix+"ord_tp_cd", {ComboText:load_tp_cdText, ComboCode:load_tp_cdCode} );
	            SetColProperty(prefix+"frt_cd", {ComboCode:ARFRTCD1, ComboText:ARFRTCD2} );
				//SetColProperty(prefix+"rate_tp_cd",{ComboText:" |"+rate_tp_cdText, ComboCode:" |"+rate_tp_cdCode});
				SetColProperty(prefix+"unit_cd",{ComboText:"|# of License Plate|Property of License Plate|Container|Truck|Handling Unit|Package Unit|Order|Hour", ComboCode:"|LPN|LPP|CNT|TRK|HUT|PUT|ODR|HOR"});
				SetColProperty(prefix+"curr_cd", {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
			  
		      }
		      break;
}}
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
function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}



function sheet1_OnChange(sheetObj, Row, Col, Value, OldValue){//#1069 Transaction Date 수정
    var formObj=document.form;
    var prefix="Grd01";
    var srcName=sheetObj.ColSaveName(Col);
    cur_row = Row;
    cur_col = Col;
    switch (srcName) {
	    case prefix+"tj_dt":
	    	var bk_no = sheetObj.GetCellValue(Row,prefix+"cust_ord_no");
	    	if (bk_no == "") {
	    		sheetObj.SetCellEditable(Row, prefix+"tj_dt",1);
	    	} else {
	    		sheetObj.SetCellEditable(Row, prefix+"tj_dt",1); //#1069 Transaction Date 수정
	    	}
	    	
	    	//#1069 Transaction Date 수정
	    	if(!checkTjDt(sheetObj,Row)){
	    		sheetObj.SetCellValue(Row, prefix+"tj_dt",OldValue );
	    		ComShowCodeMessage("COM12133","Transaction date","or equal to the Closing Date","less");
	    	}
	    	
	    	break;
	    case prefix+"cust_ord_no":
	    	var bk_no = sheetObj.GetCellValue(Row,prefix+"cust_ord_no");
	    	if (bk_no == "") {
	    		sheetObj.SetCellEditable(Row, prefix+"tj_dt",1);
	    	} else {
	    		sheetObj.SetCellEditable(Row, prefix+"tj_dt",1); //#1069 Transaction Date 수정
	    	}
	    	break;
	    case prefix+"frt_cd":
	        var frt = sheetObj.GetCellText(Row,srcName).split(":");
	        if(frt!="")
	        	sheetObj.SetCellValue(Row,prefix + "frt_nm", frt[1]);
	        else sheetObj.SetCellValue(Row,prefix + "frt_nm", "");
	        break;
		case prefix+"unit_cd":
		    if(!ComIsNull(Value)){
		
		    	// Unit2 콤보 정보 선택
		    	var strUnit2Cd = "|CBM|CBF|GKG|GLB|NKG|NLB";
		    	var strUnit2Text = "|CBM|CFT|G.KG|G.LB|N.KG|N.LB";
		    	
		    	//# of License Plate
		    	if (Value == "LPN") {
		    		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|" + LIC_PLATE_TEXT, ComboCode:"|" + LIC_PLATE_CD} );
		    		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
		    		//Property of License Plate
		    	} else if (Value == "LPP") {
		    		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:strUnit2Text, ComboCode:strUnit2Cd} );
		    		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
		    		//Container
		    	} else if (Value == "CNT") {
		    		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|" + TPCD1, ComboCode:"|" + TPCD1} );
		    		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
		    		//Truck
		    	} else if (Value == "TRK") {
		    		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
		    		sheetObj.CellComboItem(Row, prefix+"unit_cd2",{ComboText:"|" + TRUCK_TEXT, ComboCode:"|" + TRUCK_CD} );
		    		//Handling Unit
		    	} else if (Value == "HUT") {
		    		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|Quantity" + strUnit2Text, ComboCode:"|QTY" + strUnit2Cd} );
		    		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
		    		//Package Unit
		    	} else if (Value == "PUT") {
		    		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|Quantity" + strUnit2Text, ComboCode:"|QTY" + strUnit2Cd} );
		    		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
		    		//Order
		    	} else if (Value == "ODR") {
		    		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",0);
		    		sheetObj.SetCellValue(Row, prefix+"unit_cd2","");
		    		//Hour
		    	} else if (Value == "HOR") {
		    		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",0);
		    		sheetObj.SetCellValue(Row, prefix+"unit_cd2","");
		    	}
		    	
            	// Handling Unit 또는 Package Unit이 아닌경우, Item Code 비활성화
            	if (Value != "HUT" && Value != "PUT") {
            		sheetObj.SetCellEditable(Row, prefix+"item_cd",0);
            		sheetObj.SetCellValue(Row, prefix+"item_cd","");
            	} else {
            		sheetObj.SetCellEditable(Row, prefix+"item_cd",1);
            	}
		    }
		    break;
		case prefix+"unit_price":
        	var qty=sheetObj.GetCellValue(Row, prefix+"qty");
        	var unit_price=sheetObj.GetCellValue(Row, prefix+"unit_price");
        	var inv_amt=qty * unit_price;
        	inv_amt = roundXL(Number(inv_amt),2);
        	if(inv_amt >= 1000000000000) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(Row, prefix+'unit_price',0);
				return;
			} else if (inv_amt <= -1000000000000) {
				ComShowCodeMessage('COM03233');
				sheetObj.SetCellValue(Row, prefix+'unit_price',0);
				return;
			} else {
				sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
			}
        	//sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
//        	sheetObj.SetCellValue(Row, prefix+"inv_ttl_amt", inv_amt);
            break;
        case prefix+"qty":
        	var qty=sheetObj.GetCellValue(Row, prefix+"qty");
        	var unit_price=sheetObj.GetCellValue(Row, prefix+"unit_price");
        	var inv_amt=qty * unit_price;
        	inv_amt = roundXL(Number(inv_amt),2);
        	if(inv_amt >= 1000000000000 ) {//12 digit
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(Row, prefix+'qty',0);
				return;
			} else if(inv_amt <= -1000000000000) {
				ComShowCodeMessage('COM03233');
				sheetObj.SetCellValue(Row, prefix+'qty',0);
				return;
			} else {
				sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
			}
//        	sheetObj.SetCellValue(Row, prefix+"inv_ttl_amt", inv_amt);
            break;
/*        case prefix+"tj_dt":
			//Settlement Period From To에 해당하는지 체크
			var trans_dt=changeDate(sheetObj.GetCellValue(Row, prefix + "tj_dt").trim());
			if(ComParseInt(ComReplaceStr($("#set_fr_dt").val(), '-', '')) > trans_dt)
			{
				ComShowCodeMessage("COM0385","Transation Date");
				sheetObj.SetCellValue(Row, prefix+"tj_dt", "");
				return false;
			}
			if(ComParseInt(ComReplaceStr($("#set_to_dt").val(), '-', '')) < trans_dt)
			{
				ComShowCodeMessage("COM0385","Transation Date");
				sheetObj.SetCellValue(Row, prefix+"tj_dt", "");
				return false;
			}
        	break;*/
    }
}


//#1069 Transaction Date 수정
function checkTjDt(sheetObj, nRow){
    var prefix="Grd01";
	var tJtd = sheetObj.GetCellValue(nRow, prefix+"tj_dt");
	var clsDt = $("#f_cls_dt").val().split("-")[2] + $('#f_cls_dt').val().split("-")[0] + $('#f_cls_dt').val().split("-")[1];
	var retVal =ComChkPeriod(tJtd, clsDt);
	if(retVal ==1 || retVal == 2){
		return true
	}
	return false;
}



function setOfficeInfoGrid(rtnVal) {
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=sheet1;
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),rtnValAry[0],0);
	}
}


//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
document.keydown=obj_keydown;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
//function processButtonClick(){
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		//#3390-Check Authority WMS CODE
		if(srcName == "SAVE" || srcName == "DELETE" || srcName == "CONFIRM" || srcName == "CF_CANCEL" || srcName == "AR_CREATE" || srcName == "AP_CREATE"){
			var sheetObj;
			var prefix_grid="";

			sheetObj=sheet1;
			prefix_grid= fix_grid01;
			
			//sheet의 row가 0건일경우
			if(sheetObj.RowCount()>0)
			{
				var cRow = sheetObj.HeaderRows();
				var wh_cd = sheetObj.GetCellValue(cRow, prefix_grid + "wh_cd");
				if(wh_cd == null || wh_cd == ""){
					wh_cd = formObj.f_wh_cd.value;
				}
				
				ComChecWmsCd_Authority(wh_cd);
				if (isWmsAuthOk == false) { 
					//alert('Not authenticated.\r\nYou are not authorized to access Warehouse'); 
					ComShowCodeMessage("COM0785");
					return
				}  
			}
		}
		
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_cls_dt":	
				if (ComDisableTdButton("btn_cls_dt", 2)) {
					return;
				}
				var cal=new ComCalendar();
	            cal.select(formObj.f_cls_dt, 'MM-dd-yyyy');
				break;
			case "btn_ctrt_no" :
				if (ComDisableTdButton("btn_ctrt_no", 2)) {
					return;
				}
				
		    	rtnary=new Array(3);
			    callBackFunc = "setCtrtNoInfo";
			    modal_center_open('./ContractRoutePopup.clt', rtnary, 900, 580,"yes");
			break;
			case "btn_cust_cd":
				
				if (ComDisableTdButton("btn_cust_cd", 2)) {
					return;
				}				
				rtnary=new Array(3);
				
				callBackFunc = "clbck_CUST_POPLIST";
				modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650 ,"yes");
			break;		
			case "SEARCHLIST":
 				btn_Search();
 				break;			
			case "btn_add":
				btn_Add();
 				break;		
			case "SAVE":
 				btn_Save();
 				break; 		
			case "DELETE":
 				btn_Delete();
 				break; 		
			case "CONFIRM":
 				btn_Confirm();
 				break; 	
			case "NEW":
 				btn_New();
 				break;
			case "CF_CANCEL":
 				btn_CFCancel();
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

/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ctrt_no.value=rtnValAry[0];//full_nm
		formObj.f_ctrt_nm.value=rtnValAry[1];//full_nm
		formObj.rtp_no.value=rtnValAry[9];//full_nm
		
		//저장중이 아닐때 default 세팅 Customer  
		if(ComIsEmpty(formObj.f_status_cd)){
			formObj.f_cust_cd.value = rtnValAry[8];
			formObj.f_cust_nm.value = rtnValAry[29];
		}		
	}
}

/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
var cur_RTP_NO_ONLY;
function getCtrtInfo(obj, RTP_NO_ONLY){
	cur_RTP_NO_ONLY = RTP_NO_ONLY;
	if(obj.value != ""){
		var ord_tp_lvl1_cd="\'P\'";
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=searchCtrtInfo&s_code='+obj.value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd, './GateServlet.gsl');
	}
	else
	{
		if(RTP_NO_ONLY == "")
		{
			$("#f_ctrt_nm").val("");
		}
		$("#rtp_no").val("");
	}
}


function resultCtrtInfo(resultXml) {
	var RTP_NO_ONLY = cur_RTP_NO_ONLY;
	
	var doc = getAjaxMsgXML(resultXml);
	var formObj = document.form;
	var sheetObj = docObjects[0];
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('@@;');
		var masterVals = rtnArr[0].split('@@^');	
		formObj.f_ctrt_nm.value = masterVals[3];

		//저장중이 아닐때 default 세팅 Customer  
		if(ComIsEmpty(formObj.f_status_cd)){
			formObj.f_cust_cd.value = masterVals[31];
			formObj.f_cust_nm.value = masterVals[32];
		}
		
	}else{
		formObj.f_ctrt_no.value = "";
		formObj.f_ctrt_nm.value = "";
	}
	
}

/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	if (ComDisableTdButton("btn_ctrt_no", 2)) {
		return;
	}
	
	var ord_tp_lvl1_cd = "\'P\'";
	
	var formObj=document.form;
	rtnary=new Array(3);
	rtnary[0]="";
	rtnary[1]=formObj.f_ctrt_nm.value;
	rtnary[2]=ord_tp_lvl1_cd;
	rtnary[3]=window;
    var param = "ctrt_nm="+ formObj.f_ctrt_nm.value;
    callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt?'+param, rtnary, 900, 580,"yes");
}


function clbck_CUST_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		
		var frmObj=document.form;
		
		var rtnValAry=rtnVal.split("|");
		
		frmObj.f_cust_cd.value = rtnValAry[0];
		frmObj.f_cust_nm.value = rtnValAry[2];
	}
}

function searchTlCustInfo (objCd, objNm){
	
	codeField = objCd;
	nameField = objNm;
	
	if(objCd.value.trim() == ""){
		objCd.value = "";
		objNm.value = "";
		
		return;
	}
	ajaxSendPost(setTlCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlTradePartner&cust_cd='+objCd.value, './GateServlet.gsl');
}

function setTlCustInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				nameField.value=rtnArr[1];
			}
			else{
				codeField.value="";
				nameField.value="";	
			}
		}
		else{
			codeField.value="";
			nameField.value="";	
		}
	}
	else{
		alert(getLabel('SEE_BMD_MSG43'));
	}
}

function CustPopup(){
	   var formObj=document.form;
	   //var params = "?cust_cd="+frmObj.d_cus_cd.value;
	   var nameObj = formObj.f_cust_nm.value;
	    rtnary=new Array(2);
		rtnary[0]="1";
		if(typeof(nameObj)!='undefined'){
			rtnary[1]= nameObj;
		}else{
			rtnary[1]="";
		}
		rtnary[2]=window;
		
		callBackFunc = "clbck_CUST_POPLIST";
		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650 ,"yes");	
}
function clbck_CUST_POPLIST(rtnVal){
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		
		var frmObj=document.form;
		
		var rtnValAry=rtnVal.split("|");
		
		frmObj.f_cust_cd.value = rtnValAry[0];
		frmObj.f_cust_nm.value = rtnValAry[2];
	}
}

function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.set_fr_dt,  formObj.set_to_dt, 'MM-dd-yyyy');
        break;
    }
}

function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
    var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "s_cls_no":	
					btn_Search();
				break;				
			default:		
				if(!(t.readOnly)){
				}
				break;
		}
	}
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
}





/*
 * Save
 */
function btn_Save() {
	var formObj=document.form;
	formObj.f_cmd.value = MODIFY;
//	if(sheet1.IsDataModified()== false)
//	{
//		ComShowCodeMessage("COM0323","");
//		return false;
//	}
	if(validateForm(formObj, "save") == false)
	{
		return;
	}
	
	if(ComShowCodeConfirm("COM0063") == false){
		return;
	}
	
	var headerDatas=FormQueryString(formObj);
	var frtDatas = sheet1.GetSaveString(1);
 	var saveXml=sheet1.GetSaveData("./ClosingOtherMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
 	sheet1.LoadSaveData(saveXml);
}

/*
 * 트랜잭션 delete
 */
function btn_Delete() {
	var formObj=document.form;
	formObj.f_cmd.value = REMOVE;

	if(validateForm(formObj, "delete") == false)
	{
		return;
	}
	
	if(ComShowCodeConfirm("COM0053") == false){
		return;
	}
	
	var headerDatas=FormQueryString(formObj);
	var frtDatas = sheet1.GetSaveString(1);
 	var saveXml=sheet1.GetSaveData("./ClosingOtherMgmtGS.clt", headerDatas + "&" + frtDatas );
 	sheet1.LoadSaveData(saveXml);
}

function btn_Confirm() {
	var formObj=document.form;
	formObj.f_cmd.value = COMMAND01;
	
	if(validateForm(formObj, "confirm") == false)
	{
		return;
	}
	
	//confirm     
	if(!ComShowCodeConfirm("COM0247"))
	{ 
		return;
	}
	var headerDatas=FormQueryString(formObj);
	var frtDatas = sheet1.GetSaveString(1);
 	var saveXml=sheet1.GetSaveData("./ClosingOtherMgmtGS.clt", headerDatas + "&" + frtDatas );
 	sheet1.LoadSaveData(saveXml);

}

function btn_CFCancel() {
	var formObj=document.form;
	formObj.f_cmd.value = COMMAND02;
	
	if(validateForm(formObj, "cfcancel") == false)
	{
		return;
	}
	
	//confirm     
	if(!ComShowCodeConfirm("COM0386"))
	{ 
		return;
	}
	var headerDatas=FormQueryString(formObj);
	var frtDatas = sheet1.GetSaveString(1);
 	var saveXml=sheet1.GetSaveData("./ClosingOtherMgmtGS.clt", headerDatas + "&" + frtDatas );
 	sheet1.LoadSaveData(saveXml);
}

function btn_Excel() {
	if(sheet1.RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	sheet1.Down2Excel({DownCols: '1|2|3|4|5|6|7|9|10|11|12|13|14|15|17|18|20|21|22|23|24|25|26|27|30|31|32|34', SheetDesign:1,Merge:1, AutoAlign: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:'N', AutoSizeColumn: 1, ExtendParam: "ColumnColor: "+ fix_grid01 + "cls_no|" + fix_grid01 + "cust_cd|" + fix_grid01 + "sb_cls_cd|"+fix_grid01+"rate_tp_cd"});
    }
}

function btn_New()
{
	commonModeChange("CLEAR_ALL");
	commonModeChange("INIT");
}


/*
 * 신규 row add
 */
var rowbil = "";
function btn_Add() {
	var formObj=document.form;
	var sheetObj=sheet1;
	//validation check
	if (validateForm(formObj, 'add') == false) 
	{
		return;
	}
	var row=sheetObj.DataInsert(sheetObj.HeaderRows() + sheetObj.RowCount());
	if (sheetObj.RowCount() > 1) {
		//sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no", sheetObj.GetCellValue(row-1, fix_grid01 + "ctrt_no"));
		//sheetObj.SetCellValue(row, fix_grid01 + "rate_tp_cd", sheetObj.GetCellValue(row-1, fix_grid01 + "rate_tp_cd"));
		//sheetObj.SetCellValue(row, fix_grid01 + "curr_cd", sheetObj.GetCellValue(row-1, fix_grid01 + "curr_cd"));
		//sheetObj.SetCellValue(row, fix_grid01 + "ofc_cd", sheetObj.GetCellValue(row-1, fix_grid01 + "ofc_cd"));
		sheetObj.SetCellValue(row, fix_grid01 + "tj_dt", sheetObj.GetCellValue(row-1, fix_grid01 + "tj_dt")); //#1069 Transaction Date 수정
	} else {
		//sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no", formObj.ctrt_no.value);
		//sheetObj.SetCellValue(row, fix_grid01 + "rate_tp_cd", 'IAO');
		//sheetObj.SetCellValue(row, fix_grid01 + "curr_cd", formObj.wh_curr_cd.value);
		//sheetObj.SetCellValue(row, fix_grid01 + "ofc_cd", formObj.wh_ofc_cd.value);
		sheetObj.SetCellValue(row, fix_grid01 + "tj_dt", formObj.f_cls_dt.value); //#1069 Transaction Date 수정
	}
	
	//sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no", formObj.f_ctrt_no.value);
	//sheetObj.SetCellValue(row, fix_grid01 + "cust_cd", formObj.f_cust_cd.value);
	//sheetObj.SetCellValue(row, fix_grid01 + "cust_nm", formObj.f_cust_nm.value);
	//sheetObj.SetCellValue(row, fix_grid01 + "curr_cd", formObj.f_curr_cd.value);
	//sheetObj.SetCellValue(row, fix_grid01 + "ofc_cd", formObj.org_cd.value);
}


/*
 * 신규로 추가된 row만 삭제처리(화면상)
 */
function btn_Del() {
	var sheetObj=sheet1;
	if(sheet1.RowCount() == 0){
		ComShowCodeMessage("COM0046");
		return;
	}
	
	var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk2");
	if (sRow == "") {
		ComShowCodeMessage("COM12189");
		return;
	}
	var arrRow=sRow.split("|"); //결과 : "1|3|5|"
	//삭제처리
	for (var i=arrRow.length-1; i>=0; i--){		
		//if(sheetObj.RowStatus(arrRow[i]) == "I") //신규등록된건만 삭제
		if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "sts_cd") == sts_cd_n) //신규등록된건만 삭제
		{
			sheetObj.RowDelete(arrRow[i], false);
		}
	}
}


/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) 
		{
			case "add":
				//Contract No 필수로 입력되어야함.
				if(ComIsEmpty(formObj.f_ctrt_no))
				{
					ComShowCodeMessage("COM0114","Contract No");
					$("#f_ctrt_no").focus();
					return false;
				}
				break;
				
			case 'save':
			case "confirm":
				if (sAction == "confirm") {
					if(ComIsEmpty(formObj.f_cls_no)){
						ComShowCodeMessage("COM0114","Closing No");
						$("#f_cls_no").focus();
						return false;
					}
				}
				
				if (ComIsEmpty(formObj.wh_ofc_cd )) {
					formObj.wh_ofc_cd.value = formObj.org_cd.value;
				} 			
				
				
				//contract 체크
				if(ComIsEmpty(formObj.f_ctrt_no))
				{
					ComShowCodeMessage("COM0114","Contract");
					$("#f_ctrt_no").focus();
					return false;
				}
				
				//Vendor / Customer 체크
				if(ComIsEmpty(formObj.f_cust_cd))
				{
					ComShowCodeMessage("COM0114","Vendor / Customer");
					$("#f_cust_cd").focus();
					return false;
				}				
				//type 체크
				if(ComIsEmpty(formObj.f_sell_buy_tp_cd))
				{
					ComShowCodeMessage("COM0114","type");
					$("#f_sell_buy_tp_cd").focus();
					return false;
				}			
				//--Currency
				if(ComIsEmpty(formObj.f_curr_cd))
				{
					ComShowCodeMessage("COM0114","Currency");
					$("#f_curr_cd").focus();
					return false;
				}					
				//--Closing Date	
				if(ComIsEmpty(formObj.f_cls_dt))
				{
					ComShowCodeMessage("COM0114","Closing Date");
					$("#f_cls_dt").focus();
					return false;
				}
				//--Warehouse 체크
				if(ComIsEmpty(formObj.f_wh_cd))
				{
					ComShowCodeMessage("COM0114","Warehouse");
					$("#f_wh_cd").focus();
					return false;
				}			
				
				
				var sheetObj=sheet1;
				//sheet의 row가 0건일경우
				if(sheetObj.RowCount()==0)
				{
					ComShowCodeMessage("COM0323");
					return false;
				}
				// Total 제외
				for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow();i++){
					if(sheetObj.GetRowStatus(i) == "D") {
						continue;
					}
					// Closing Status가 Confirmed Or Invoiced인 경우
					if (sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "CON" 
						|| sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "INV") {
						var stsNm = "confirmed";
						if (sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "INV") {
							stsNm = "invoiced";
						}
						ComShowCodeMessage("COM132620","Modify",stsNm);
						sheetObj.SelectCell(i, fix_grid01 +  "tj_dt");
						return false;
					}
					//--Transaction Date
					if(sheetObj.GetCellValue(i, fix_grid01 + "tj_dt").trim() == "")
					{
						ComShowCodeMessage("COM0114","Transaction Date");
						sheetObj.SelectCell(i, fix_grid01 +  "tj_dt");
						return false;
					}
					//#1069 Transaction Date 수정
					if(!checkTjDt(sheetObj,i)){
						sheetObj.SelectCell(i, fix_grid01 +  "tj_dt");
						ComShowCodeMessage("COM12133","Transaction date","or equal to the Closing Date","less");
						return false;						
					}
					
					//--Office
					/*if(sheetObj.GetCellValue(i, fix_grid01 + "ofc_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Office");
						sheetObj.SelectCell(i, fix_grid01 +  "ofc_cd");
						return false;
					}*/
					//--contract 체크
					/*if(sheetObj.GetCellValue(i, fix_grid01 + "ctrt_no").trim() == "")
					{
						ComShowCodeMessage("COM0114","Contract");
						sheetObj.SelectCell(i, fix_grid01 +  "ctrt_no");
						return false;
					}*/
					
					//--Type 체크
					/*if(sheetObj.GetCellValue(i, fix_grid01 + "rate_tp_cd").trim() == "OTH")
					{
						ComShowCodeMessage("COM0005","Type");
						sheetObj.SelectCell(i, fix_grid01 +  "rate_tp_cd");
						return false;
					}*/
					//--Freight
					if(sheetObj.GetCellValue(i, fix_grid01 + "frt_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Freight Code");
						sheetObj.SelectCell(i, fix_grid01 +  "frt_cd");
						return false;
					}
					if(sheetObj.GetCellValue(i, fix_grid01 + "frt_nm").trim() == "")
					{
						ComShowCodeMessage("COM0114","Freight Name");
						sheetObj.SelectCell(i, fix_grid01 +  "frt_nm");
						return false;
					}
					//--Currency
					/*if(sheetObj.GetCellValue(i, fix_grid01 + "curr_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Currency");
						sheetObj.SelectCell(i, fix_grid01 +  "curr_cd");
						return false;
					}*/
					//--UNIT_CD
					if(sheetObj.GetCellValue(i, fix_grid01 + "unit_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Unit 1");
						sheetObj.SelectCell(i, fix_grid01 +  "unit_cd");
						return false;
					}
					if(sheetObj.GetCellValue(i, fix_grid01 + "unit_cd").trim() != "")
					{
						if (sheetObj.GetCellValue(i, fix_grid01 + "unit_cd")!="ODR" && sheetObj.GetCellValue(i, fix_grid01 + "unit_cd")!="HOR") {
							if(sheetObj.GetCellValue(i, fix_grid01 + "unit_cd2").trim() == ""){
								ComShowCodeMessage("COM0114","Unit2");
								sheetObj.SelectCell(i, fix_grid01 +  "unit_cd2");
								return false;
							}
						}
					}
					//--qty
					var qty=eval(sheetObj.GetCellValue(i, fix_grid01 + "qty"));
					if(qty == 0)
					{
						ComShowCodeMessage("COM0114","PKGS");
						sheetObj.SelectCell(i, fix_grid01 +  "qty");
						return false;
					}
					//--unit price
					var unit_price=eval(sheetObj.GetCellValue(i, fix_grid01 + "unit_price"));
					if(unit_price == 0)
					{
						ComShowCodeMessage("COM0114","RATE");
						sheetObj.SelectCell(i, fix_grid01 +  "unit_price");
						return false;
					}
					//--WH_CD 체크
					/*if(sheetObj.GetCellValue(i, fix_grid01 + "wh_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Warehouse");
						sheetObj.SelectCell(i, fix_grid01 +  "wh_cd");
						return false;
					}*/

				}
				break;	
				
			case "search":
				if(ComIsEmpty(formObj.s_cls_no)){
					ComShowCodeMessage("COM0114","Closing No.");
					$("#s_cls_no").focus();
					return false;
				}
				break;
			case "delete":
			case "cfcancel":
				if(ComIsEmpty(formObj.f_cls_no)){
					ComShowCodeMessage("COM0114","Closing No");
					$("#f_cls_no").focus();
					return false;
				}
				break;				
		}
	}
	return true;
}







/*
 * 각모드별 화면을 셋팅
 */
function commonModeChange(mode, rowCnt)
{
	$("#f_wh_cd").attr("disabled", false);
	$("#f_curr_cd").attr("disabled", false);
	$("#f_sell_buy_tp_cd").attr("disabled", false);
	var formObj=document.form;
	switch(mode) 
	{
		case "INIT":
			formObj.reset();
			$("#mode").val(mode);
			$("#s_cls_no").val("");
			$("#f_cls_no").val("");
			
			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE - Bug Fixing		
			formObj.f_ref_no.readOnly = false;
			formObj.f_remark.readOnly = false;
			
			sheet1.RemoveAll();
			commonButtonChange(mode);
			//날짜 셋팅
			$("#f_cls_dt").val(ComGetNowInfo());
			
			//DEF_VALUE 셋팅
			$("#f_ctrt_no").val($("#def_wh_ctrt_no").val());
			$("#f_ctrt_nm").val($("#def_wh_ctrt_nm").val());
			$("#f_cust_cd").val($("#def_cust_cd").val());
			$("#f_cust_nm").val($("#def_cust_nm").val());
			$("#f_sell_buy_tp_cd").attr("disabled", false);
			
			//$("#f_curr_cd").val($("#def_ofc_curr_cd").val());
			$("#f_wh_cd").val($("#def_wh_cd").val());
			fn_SetCurrencyOfc($("#def_wh_cd").val());
			
			loading_flag = "Y";
			
			break;
			
		case "CLEAR_ALL":
			$("#mode").val(mode);
			
			$("#f_cls_no").val("");
			$("#f_ctrt_no").val("");
			$("#f_ctrt_nm").val("");
			
			$("#f_sell_buy_tp_cd").val("");
			$("#f_curr_cd").val("");
			
			$("#f_inv_ttl_amt").val("");
			$("#f_cls_no").val("");
			$("#f_cls_dt").val("");
			
			$("#f_ref_no").val("");
			$("#f_wm_doc_seq").val("");
			
			$("#f_status_cd").val("");
			$("#f_status_nm").val("");
			
			$("#f_wh_cd").val("");
			$("#f_remark").val("");
			$("#wh_ofc_cd").val("");
			
			sheet1.RemoveAll();
			
			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE - Bug Fixing					
			formObj.f_ref_no.readOnly = false;
			formObj.f_remark.readOnly = false;
			commonButtonChange("INIT");
			break;			
			
		case "CREATE":		
			commonButtonChange("CREATE");
			break;
		case "CONFIRM":		
			$("#f_wh_cd").attr("disabled", true);
			$("#f_curr_cd").attr("disabled", true);
			$("#f_sell_buy_tp_cd").attr("disabled", true);
			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE - Bug Fixing
			$("#f_ref_no").attr("readOnly", true);
			$("#f_remark").attr("readOnly", true);
			commonButtonChange("CONFIRM");
			break;
		case "INVOICE":		
			$("#f_wh_cd").attr("disabled", true);
			$("#f_curr_cd").attr("disabled", true);
			$("#f_sell_buy_tp_cd").attr("disabled", true);
			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE - Bug Fixing
			$("#f_ref_no").attr("readOnly", true);
			$("#f_remark").attr("readOnly", true);
			commonButtonChange("INVOICE");
			break;

	}
}


/*
 * 버튼 change
 */
function commonButtonChange(mode, rowCnt)
{
	
	switch(mode)
	{
		case "INIT" :
			fn_ComBtnEnable("btn_save");  //fn_ComBtnEnable   , fn_ComBtnDisable
			fn_ComBtnDisable("btn_delete");
			fn_ComBtnDisable("btn_confirm");
			fn_ComBtnDisable("btn_cancel");			
			ComBtnEnable("btn_add");
			break;
		case "CREATE" : 
			fn_ComBtnEnable("btn_save");  //fn_ComBtnEnable   , fn_ComBtnDisable
			fn_ComBtnEnable("btn_delete");
			fn_ComBtnEnable("btn_confirm");
			fn_ComBtnDisable("btn_cancel");			
			ComBtnEnable("btn_add");		
			break;
		case "CONFIRM" : 
			fn_ComBtnDisable("btn_save");  //fn_ComBtnEnable   , fn_ComBtnDisable
			fn_ComBtnDisable("btn_delete");
			fn_ComBtnDisable("btn_confirm");
			fn_ComBtnEnable("btn_cancel");			
			ComBtnDisable("btn_add");		
			break;
		case "INVOICE" : 
			fn_ComBtnDisable("btn_save");  //fn_ComBtnEnable   , fn_ComBtnDisable
			fn_ComBtnDisable("btn_delete");
			fn_ComBtnDisable("btn_confirm");
			fn_ComBtnDisable("btn_cancel");			
			ComBtnDisable("btn_add");		
			break;
	}
}


/*
 * Show Sub Sum
 */
function displaySubSum()
{
	sheet1.ShowSubSum(fix_grid01 + "sb_cls_cd"
	          , fix_grid01 + "basic_amt|" + fix_grid01 + "adjust_amt|" + fix_grid01 + "tot_amt"
	          , -1
	          , false
	          , false
	          , sheet1.SaveNameCol(fix_grid01 + "sub_sum_row")
	          ,fix_grid01 + "cls_no=%s" + ";" 
	          +fix_grid01 + "ctrt_no=%s" + ";"
	          +fix_grid01 + "ctrt_nm=%s" + ";" 
	          +fix_grid01 + "cust_cd=%s" + ";"
	          +fix_grid01 + "cust_nm=%s" + ";"
	          +fix_grid01 + "sb_cls_cd=TOTAL" + ";"
	          +fix_grid01 + "sub_sum_row_div=TOTAL" + ";"
				);	
}

//contains 메소드 추가
Array.prototype.contains=function(element) {
	for (var i=0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
};

function ComDisableTdButton(btId, flg)
{
    if (flg==1) {
    	var vClassName = document.getElementById(btId).className;
		if("Btn_Disable" == vClassName)	return true;
		return false;
    }else if (flg==2) {
    	if(document.getElementById(btId).disabled)	return true;
		return false;
    }
}



function ComAbsRound(obj, pos) {
    try {
        //첫번째 인자가 문자열 또는 HTML태그(Object)인 경우 처리
        var num = getArgValue(obj);
        var minus = 1;

        if (pos==undefined || pos==null ) pos = 2;

        var posV = Math.pow(10, pos);
        
        if ( num < 0 ) minus = -1;
         
        return Math.round(Math.abs(num)*posV)/posV*minus;
    } catch(err) { ComFuncErrMsg(err.message); }
}



// 조회
function btn_Search(){
	var formObj = document.form;
	var sheetObj=sheet1;
	
	//validation check
	if (validateForm(formObj, 'search') == false) 
	{
		return;	
	}	
	commonModeChange("CLEAR_ALL");
	
	//sheet초기화 및 form tab초기화	
//	doShowProcess(true);
	
	formObj.f_cmd.value = SEARCH;
 	var sXml=sheetObj.GetSearchData("./ClosingOtherMgmtGS.clt", FormQueryString(formObj,""));
 	
 	
	var strtIndxCheck2 = sXml.indexOf("<CHECK2>") + "<CHECK2>".length;
	var endIndxCheck2 = sXml.indexOf("</CHECK2>");
	
	var xmlDoc2 = $.parseXML(sXml.substring(strtIndxCheck2,endIndxCheck2));
	var $xml2 = $(xmlDoc2);
	
 	
 	if ($xml2.find( "hdrCnt").text() != '0'){// Header Info
 		setDataControl(sXml);
 	}
	
//	if ($xml.find( "listCnt").text() != '0'){
	 	var strtIndxSheet1 = sXml.indexOf("<SHEET1>");
		var endIndxSheet1 = sXml.indexOf("</SHEET1>") + "</SHEET1>".length;
		
		var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
		sheet1.LoadSearchData(sheet1Data.replaceAll('SHEET1', 'SHEET'));
//	} 

}


//Header Info
function setDataControl(sXml) {
	var formObj=document.form;
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	formObj.s_cls_no.value = $xml.find( "cls_no").text();
	formObj.f_cls_no.value = $xml.find( "cls_no").text();
	formObj.f_ctrt_no.value = $xml.find( "ctrt_no").text();
	formObj.f_ctrt_nm.value = $xml.find( "ctrt_nm").text();
	formObj.f_cust_nm.value	= $xml.find( "cust_nm").text();
	formObj.f_cust_cd.value	= $xml.find( "cust_cd").text();
	formObj.f_sell_buy_tp_cd.value	= $xml.find( "sell_buy_tp_cd").text();
	fnSetComboType(formObj.f_sell_buy_tp_cd.value);
	formObj.f_curr_cd.value	= $xml.find( "curr_cd").text();
	formObj.f_inv_ttl_amt.value	= $xml.find( "inv_ttl_amt").text();
	formObj.f_cls_dt.value	= $xml.find( "cls_dt").text();
	formObj.f_status_cd.value	= $xml.find( "sts_cd").text();
	formObj.f_status_nm.value	= $xml.find( "sts_nm").text();
	formObj.f_ref_no.value	= $xml.find( "ref_no").text();
	formObj.f_wm_doc_seq.value	= $xml.find( "wm_doc_seq").text();
	formObj.f_wh_cd.value	= $xml.find( "wh_cd").text();
	
	formObj.f_remark.value	= $xml.find( "f_remark").text();
	formObj.wh_ofc_cd.value	= $xml.find( "ofc_cd").text();
	// Modify시 Closing Date 업데이트
}

function sheet1_OnSearchEnd(){

    var formObj=document.form; 
    // Status Saved
    if (formObj.f_status_cd.value == "SAV") {
    	commonModeChange("CREATE");
    // Status Confirmed
    } else if (formObj.f_status_cd.value == "CON") {
    	commonModeChange("CONFIRM");
    // Status Invoiced
    } else if (formObj.f_status_cd.value == "INV") {
    	commonModeChange("INVOICE");
    } else {
    	commonModeChange("SEARCH",sheet1.RowCount());
    }
    
	var sheetObj=sheet1;
    var prefix="Grd01";
    hdrR = sheetObj.HeaderRows();
    rowCnt = sheetObj.RowCount();

    sheetObj.InitComboNoMatchText(1, "",1);
    
    var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
    var amt_ttl_sum=roundXL(inv_amt_sum * 1,2);
    formObj.f_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
    
    for (var i = hdrR; i < rowCnt + hdrR; i++) {
    	
    	// Header Reset
    	if (i == hdrR) {}
    	
    	//Total
        sheetObj.SetSumValue(prefix + "qty", $("#f_curr_cd").val() + " Total");
    	
		// Unit2 콤보 정보 선택
		var strUnit2Cd = "|CBM|CBF|GKG|GLB|NKG|NLB";
		var strUnit2Text = "|CBM|CFT|G.KG|G.LB|N.KG|N.LB";
		
		//# of License Plate
		if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "LPN") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|" + LIC_PLATE_TEXT, ComboCode:"|" + LIC_PLATE_CD} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Property of License Plate
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "LPP") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:strUnit2Text, ComboCode:strUnit2Cd} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Container
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "CNT") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|" + TPCD1, ComboCode:"|" + TPCD1} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Truck
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "TRK") {
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|" + TRUCK_TEXT, ComboCode:"|" + TRUCK_CD} );
			//Handling Unit
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "HUT") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|Quantity" + strUnit2Text, ComboCode:"|QTY" + strUnit2Cd} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Package Unit
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "PUT") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|Quantity" + strUnit2Text, ComboCode:"|QTY" + strUnit2Cd} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Order
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "ODR") {
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",0);
			sheetObj.SetCellValue(i, prefix+"unit_cd2","");
			//Hour
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "HOR") {
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",0);
			sheetObj.SetCellValue(i, prefix+"unit_cd2","");
		}
    	// Handling Unit 또는 Package Unit이 아닌경우, Item Code 비활성화
    	if (sheetObj.GetCellValue(i, prefix + "unit_cd") != "HUT" && sheetObj.GetCellValue(i, prefix + "unit_cd") != "PUT") {
    		sheetObj.SetCellEditable(i, prefix+"item_cd",0);
    		sheetObj.SetCellValue(i, prefix+"item_cd","");
    	} else {
    		sheetObj.SetCellEditable(i, prefix+"item_cd",1);
    	}
		
		// Closing Status가 Confirmed Or Invoiced인 경우
		if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "CON" 
			|| sheetObj.GetCellValue(i, prefix + "sts_cd") == "INV") {
			sheetObj.SetRowEditable(i, 0);
			sheetObj.SetCellFontColor(i, fix_grid01 + "tj_dt","#FF0000");
			sheetObj.SetCellFontColor(i, fix_grid01 + "frt_cd","#FF0000");
			sheetObj.SetCellFontColor(i, fix_grid01 + "frt_nm","#FF0000");
		} 
    }
    
    //Column, Width 재조정하기
    sheetObj.FitSize(1, 0);
}

function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
}

var cur_row;
var cur_col;
var cur_sheetObj;


function sheet1_OnChangeSum(sheetObj, Row, Col) {
    var formObj=document.form;
    var prefix="Grd01";
	//합계 행에 값이 바뀌었을 때, 계산 정보 표시
    var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
    var amt_ttl_sum=roundXL(inv_amt_sum * 1,2);
    
    //Check sum total amount of all rows on grid.
    if (amt_ttl_sum >= 1000000000000) {
    	ComShowCodeMessage('COM03230');
    	sheetObj.SetCellValue(cur_row, cur_col,0,0);
    	sheetObj.SetCellValue(cur_row, prefix + "inv_amt",0,0);
		return;
    } else if (amt_ttl_sum <= -1000000000000) {
    	ComShowCodeMessage('COM03233');
    	sheetObj.SetCellValue(cur_row, cur_col,0,0);
    	sheetObj.SetCellValue(cur_row, prefix + "inv_amt",0,0);
		return;
    } else {
    	formObj.f_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
    }
}



function sheet1_OnSaveEnd(sheetObj){
	var formObj=document.form;
	// SAVE OK
	if (sheet1.GetEtcData("mess") == 'OK') {
		showCompleteProcess();
		if(sheet1.GetEtcData("retType") == 'DELETE'){
			commonModeChange("CLEAR_ALL");
			commonModeChange("INIT");
		}else{
			formObj.s_cls_no.value = sheet1.GetEtcData("cls_no");
			btn_Search();
		}
	}else{
		if (sheet1.GetEtcData("mess") == 'NG') {
			ComShowCodeMessage("COM0816");
		} else {
			ComShowCodeMessage("COM12227");
		}
	}
}



function mkFormat1(dtStr){
	 var rtnStr="";
	 var dtStr=dtStr.replace('-','').replace('-',''); 
	 rtnStr=dtStr.substring(4,8) + dtStr.substring(0,2) + dtStr.substring(2,4); 
	 return rtnStr;
}

function changeDate(sDate) {
	if (sDate == null || sDate == '') return"";
	var y  = sDate.substr(0,4);	//Month
	var m  = sDate.substr(4,2);		//day
	var d  = sDate.substr(6,2);
	return m+d+y;
}

function changeDate2(sDate) {
	if (sDate == null || sDate == '') return"";
	var y  = sDate.substr(0,4);	//Month
	var m  = sDate.substr(4,2);		//day
	var d  = sDate.substr(6,2);
	return m+ "-" + d + "-" + y;
}

function changeDate_yyyymmdd(sDate) {
	//mmddyyyy ---> yyyymmdd
	if (sDate == null || sDate == '') return"";
	var m  = sDate.substr(0,2);	
	var d  = sDate.substr(2,2);		
	var y  = sDate.substr(4,4);
	return y+m+d;
}


var rtnary = new Array(2);
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	ROW = Row
	if(colName == fix_grid01 + "cust_ord_no") {
		var sUrl="./WHBookingPopup.clt?cond_search_yn=N&ctrt_no="+ $("#ctrt_no").val()+ "&ctrt_nm="+$("#ctrt_nm").val() + "&wh_cd="+$("#wh_cd").val() ;
		callBackFunc = "setBookingGrid";
        modal_center_open(sUrl, callBackFunc, 800, 550,"yes");
	}
}
function setBookingGrid(aryPopupData, row, col, sheetIdx){
	var formObj=document.form;
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 var rtnValAry=aryPopupData.split("|");
		 var rate_tp_cd = "IN";
		 if (rtnValAry[0] == "Outbound") {
			rate_tp_cd = "OUT";
		 }
		 sheetObj.SetCellValue(ROW, fix_grid01 + "rate_tp_cd",rate_tp_cd,0);
		 sheetObj.SetCellValue(ROW, fix_grid01 + "cust_ord_no",rtnValAry[6],0);
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "ord_tp_cd",rtnValAry[8]);
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "wh_cd",rtnValAry[11]);
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "ctrt_no",rtnValAry[1]);
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "tj_dt",rtnValAry[4]);
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "wib_bk_no",rtnValAry[5],0);
		 
		 var sCustCd = "";
		 var sCustNm = "";
		if (ComIsNull(rtnValAry[13]) || rtnValAry[13] == "") {
			sCustCd = formObj.s_cust_cd.value;
		} else {
			sCustCd = rtnValAry[13]
		}
		if (ComIsNull(rtnValAry[14]) || rtnValAry[14] == "") {
			sCustNm = formObj.s_cust_nm.value;
		} else {
			sCustNm = rtnValAry[14]
		}
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "cust_cd",sCustCd);
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "cust_nm",sCustNm);
	 }
}

//Filing No.중복 체크
function checkDupFilingNo(obj){
	if (ComIsNull(obj.value)) {
		return;
	}
	var formObj=document.form;
	ajaxSendPost(resultDupFilingNo, 'reqVal', '&goWhere=aj&bcKey=checkDupFilingNo&f_ref_no='+obj.value +"&cls_no=" + formObj.f_cls_no.value, './GateServlet.gsl');
}

/**
 * AJAX RETURN
 * Check Dup Order No
 */
function resultDupFilingNo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				if(!ComShowCodeConfirm("COM131303", "Filling No")){ 
					formObj.f_ref_no.value = "";
				} 
				formObj.f_ref_no.focus();
			}
		}
	}
}



// #1389 [WMS4.0] Closing In & Out Entry buttons add to extension
function fn_ComBtnDisable(name) {
	var obj = ComGetObject(name);
	if (obj.type == "button") {
		obj.style.display = "none";
	}
}

//#1389 [WMS4.0] Closing In & Out Entry buttons add to extension
function fn_ComBtnEnable(name) {
	var obj = ComGetObject(name);
	if (obj.type == "button") {
		obj.style.display = "inline";
	}
}

function fnSetComboType(val){
	
	var sheetObj=sheet1;
	// Total 제외
	for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow();i++){
		sheetObj.SetCellValue(i,fix_grid01 + "frt_cd", "");
		sheetObj.SetCellValue(i,fix_grid01 + "frt_nm", "");
	}
	if(val == 'S'){ //AR
		sheetObj.SetColProperty(fix_grid01+"frt_cd", {ComboCode:ARFRTCD1, ComboText:ARFRTCD2} );
	}else if(val == 'B'){ //AP
		sheetObj.SetColProperty(fix_grid01+"frt_cd", {ComboCode:APFRTCD1, ComboText:APFRTCD2} );
	}
	
}

function fn_SetCurrencyOfc(val){
	if (ComIsNull(val)) {
		return;
	}
	ajaxSendPost(resultCurrencyOfc, 'reqVal', '&goWhere=aj&bcKey=getWmsCntrOfc&wh_cd='+val ,'./GateServlet.gsl');
	
}
function resultCurrencyOfc(resultXml) {
	var doc = getAjaxMsgXML(resultXml);
	var formObj = document.form;
	var sheetObj = docObjects[0];
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('@@;');
		var masterVals = rtnArr[0].split('@@^');	

		//저장중이 아닐때 default 세팅 curr  
		if(ComIsEmpty(formObj.f_status_cd)){
			formObj.f_curr_cd.value = masterVals[1];
		}
		formObj.wh_ofc_cd.value = masterVals[0];
	}
}