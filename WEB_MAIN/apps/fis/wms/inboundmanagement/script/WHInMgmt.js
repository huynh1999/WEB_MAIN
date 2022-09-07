/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInMgmt.js
*@FileTitle  : Inbound Booking Management
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2016.04.28
=========================================================--*/
var sheetCnt=0;
var saveFlg = "";
var comboObjects=new Array();
var comboCnt=0; 
var uploadObjects=new Array();
var uploadCnt=0;
var fix_grid00="Grd00"; //form tab의 form 객체
var fix_grid01="Grd01"; //list tab의 그리드
var fix_grid02="Grd02"; //공통 detail 그리드
var fix_grid03="Grd03"; //Doc Detail
var fix_grid04="Grd04"; //File Attachment
var fix_grid05="Grd05"; //Excel DownLoad
var fix_grid06="Grd06"; //Freight
var fix_grid07="Grd07"; //Excel Upload
var fix_by_list="list"; //list tab의 구분자
var fix_by_form="form"; //form tab의 구분자
var fix_by_list_P="list_P"; //list tab의 구분자
var fix_by_form_P="form_P"; //form tab의 구분자
var loading_flag="N";
var bk_sts_I="";//"Booked";
var bk_sts_N=""; //"Uncomplete";
var bk_sts_X="";//"Complete";
var docObjects=new Array();
var fastOnLoadFlg=true;
var fastOwnerFlg=true; 
var rtnary=new Array(3);
var firCalFlag = false;
var l_btn_rateFlg = false;
var sheet2Row = 0;
var sheet6Row = 0;

//#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 3차
var rtnItemCdArray=new Array();
var rtnItemNmArray=new Array();
var sheet2_excel_flag = "N";

// WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
var gJsWmsRuPoint = "N";
var vPointCount = 3;
var vEditLen = 14;

// #1392 [WMS4.0] Inbound/Outbound Management Freight Status 표기
var lv_StsNm;

//#3390-Check Authority WMS CODE
var isWmsAuthOk = false; 

//#5563 [Binex] WMS Contract Currency to overwrite Office Local Currency
var rate_curr_cd = "";

/*
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여
 * cache옵션 false셋팅
 */
$(document).ready(function() {
	$.ajaxSetup({ cache: false });

	//#3195 [BINEX WMS4.0] [#3100 개선] INBOUND LIST AND ENTRY SHOWING DIFF SKU
	$('#cust_ord_no, #ctrt_no, #wh_cd').change(function() {
		if($('#cust_ord_no').val() != '' && $('#ctrt_no').val() != '') {
			if($(this).attr('id') == 'cust_ord_no') {
				if($(this).attr('org_cust_ord_no') == $(this).val()) {
					return;
				}
			}
			checdup_OrderNo();
		}
		
		
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
		if(this.id == "wh_cd"){
			fn_getWh_CurrCd();

		}
	});

});

//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
function fn_getWh_CurrCd(){
	var formObj=document.form;
	ajaxSendPost(relsutWHCD, 'reqVal', '&goWhere=aj&bcKey=searchWhCurrcd&wh_cd='+formObj.wh_cd.value, './GateServlet.gsl');	
}
function relsutWHCD(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			//alert(rtnArr[0]);
			formObj.wh_curr_cd.value =rtnArr[0];
			formObj.wh_ofc_cd.value =rtnArr[1];
		}
	}
	
	changeFrtinfo();
}



/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
///*
// * Combo Object를 배열로 등록
// */    
// function setComboObject(combo_obj){
//	comboObjects[comboCnt++]=combo_obj;
// }
 /**
  * Upload Object
  */
 function setUploadObject(uploadObj){
 	uploadObjects[uploadCnt++]=uploadObj;
 }
/*
 * load page
 */
function loadPage() {
	var formObj=document.form;
	//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked" - Optionized needed
	var opt_key = "FRT_ADD_OPT";
	ajaxSendPost(checkFrtOpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	//[#1307][INBOUND MANAGEMENT] Cannot auto suggestion when input name
	fnSetAutocompleteCallBack('supp_nm', 'setShipperInfo', 'LINER_POPLIST');
	fnSetAutocompleteCallBack('trucker_nm', 'setTruckerInfo', 'LINER_POPLIST');
	fnSetAutocompleteCallBack('owner_nm', 'setOwnerInfo', 'LINER_POPLIST');
	fnSetAutocompleteCallBack('bill_to_nm', 'setBillToInfo', 'LINER_POPLIST');
	//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
	if(gJsWmsRuPoint == 'Y'){
		vPointCount = 8;
		vEditLen = 19;
	}
	document.form.btn_excel.style.display = 'none';
	//sheet
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//폰트색상 변경
 	sheet2.SetCellFontColor(1, fix_grid02 + "row_add","#0100FF");
 	sheet2.SetCellFontUnderline(i, fix_grid02 + "row_add", 1);
	//IBMultiCombo초기화
	initCombo("load_tp_cd");
	initCombo("fwd_tp_cd");
	initCombo("trade_tp_cd");
    loading_flag="Y";
    //upload 초기화
	//ComConfigUpload(uploadObjects[0], "/HJLOMS/addFileWHInbk.do?FileUploadModule=OMS");
	//control
//	initControl();

    //LKH:2017-07-19 - Inbound 입고 LIST 페이지에서 링크 타고 올 경우 2번 조회 되는 오류 수정
    var linkChek = false;

	if($("#req_wib_bk_no").val().trim() == "")
	{ 
		//form tab 초기셋팅
		form_tab_new_setting();
		$("#sel_tab").val("01");
		//goTabSelect('01');
		//SHEET ADD 기본셋팅
		//default1RowAdd();
	}
	else
	{
		//$("#list_wh_cd").val($("#req_wh_cd").val());
		formObj.list_in_search_tp.value = "WIB_BK_NO";
		$("#list_in_no").val($("#req_wib_bk_no").val());
		$("#ctrt_no").val($("#req_ctrt_no").val());
		$("#wh_cd").val($("#req_wh_cd").val());
		/*if($("#req_bk_sts_cd").val() != "ALL")
		{
			$("#list_bk_sts_cd")[0].Code = $("#req_bk_sts_cd").val();
		}*/
		btn_Search();
		//LKH:2017-07-19 - Inbound 입고 LIST 페이지에서 링크 타고 올 경우 2번 조회 되는 오류 수정
		linkChek = true;
	}
	if($("#uploadfile").val().trim() == "T" && $("#fwd_bk_no").val().trim() != ""){
		formObj.list_in_search_tp.value = "WIB_BK_NO";
		$("#list_in_no").val($("#fwd_bk_no").val().trim());
		btn_Search();
		goTabSelect("04");
	}
	//LKH:2017-07-19 - Inbound 입고 LIST 페이지에서 링크 타고 올 경우 2번 조회 되는 오류 수정
	//IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), sheet2, false, "RestoreGrid");
	if(linkChek){
		IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), sheet2, false, "BlankCallBack");
	}else{
		IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), sheet2, false, "RestoreGrid");
	}

	//2017.07.19 주석처리
	//Inbound List 화면에서 parameter 로 넘긴 경우에는 하단 그리드가 정상출력되지만
	//Search 버튼 클릭 시 데이터 일부가 출력되지 않는 오류 해결을 위해
	//sheet2_OnSearchEnd() function 에서 Delay 주도록 수정
	//setTimeout(function(){ sheet2_btn_hide(); }, 1000);
}
//LKH:2017-07-19 - Inbound 입고 LIST 페이지에서 링크 타고 올 경우 2번 조회 되는 오류 수정
function BlankCallBack() {
	var formObj=document.form;
	return;
}
function RestoreGrid() {
	var formObj=document.form;
	if(form.list_in_no.value == ""){
			return;
	}
	doWork("SEARCHLIST");
}
/**
 * Button Processing
 */
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    try{
		var formObj=document.form;
		//#3390-Check Authority WMS CODE
		if(srcName == "SAVE" || srcName == "DELETE" || srcName == "CANCEL" || srcName == "btn_Putaway"){
			ComChecWmsCd_Authority(formObj.wh_cd.value);
			if (isWmsAuthOk == false) { 
				//alert('Not authenticated.\r\nYou are not authorized to access Warehouse'); 
				ComShowCodeMessage("COM0785");
				return
			}  
		}
		
        switch(srcName) {
			case "SEARCHLIST":
				btn_Search();
				break;
			case "EXCEL":
				btn_Excel();
				break;
			case "PRINT":
				btn_Print();
				break;
			case "sheet1_btn_row_add":
				sheet1RowAdd(sheet1);
				break;
			case "sheet2_btn_row_add":
				var row2 = sheet2.GetSelectRow();
				sheet2RowAdd(sheet2, row2);
				break;
			//#4608 [WMS] In/Outbound Management to have [Multi Row Add] button
			case "sheet2_btn_multi_row_add":			
				sheet2MultiRowAdd(sheet2, formObj.copy_cnt.value);
				formObj.copy_cnt.value = 1;
				break;
			case "btn_row_del":
				row_Del();
				break;
			case "btn_row_copy":
				row_Copy();
				break;
			case "btn_upload":
				excel_Upload();
				break;
			case "btn_bl_load":
				BL_Load();
				break;
			case "btn_file_path":
				btn_File_Path();
				break;
			case "btn_file_upload":
				btn_File_Upload();
				break;
			case "btn_file_delete":
				btn_File_Delete();
				break;
			case "lnk_cargo":
				btn_Cargo_Receipt();
				break;
			case "SAVE":
				btn_Save();
				break;
			case "DELETE":
				btn_Delete();
				break;
			case "btn_reinstate":
				//alert("This button is developing !");
				btn_Reinstate();
				break;
			case "NEW":
				btn_New();
				break;
			case "CANCEL":
				btn_CCancel();
				break;
			case "btn_list_to_date": 	
				var cal=new ComCalendarFromTo();
	            cal.select(formObj.list_fm_date, formObj.list_to_date, 'MM-dd-yyyy');
				break;
 			case "btn_list_wh_cd": 
 				locationPopup(fix_by_list);
				break;
 			case "btn_list_ctrt_no" :	
 				CtrtPopup(fix_by_list_P);
				break;
 			case "btn_wh_cd": 
 				locationPopup(fix_by_form);
				break;
 			case "btn_ctrt_no" :
 				CtrtPopup(fix_by_form_P);
				break;
 			case "btn_owner_cd":
 				CustomerPopup('owner_cd','c');
 				break;
 			case "btn_owner_loc":
 				CustomerLocationPopup('owner_cd','c');
 				break;
 			case "btn_supp_cd":
 				CustomerPopup('supp_cd','c');
 				break;
 			case "btn_supp_loc":
 				CustomerLocationPopup('supp_cd');
 				break;
 			case "btn_bk_date":
 				var cal=new ComCalendar();
	            cal.select(formObj.bk_date, 'MM-dd-yyyy');
 				break;
 			case "btn_est_in_dt":
 				var cal=new ComCalendar();
	            cal.select(formObj.est_in_dt, 'MM-dd-yyyy');
 				break;
 			case "btn_inbound_dt":
 				var cal=new ComCalendar();
	            cal.select(formObj.inbound_dt, 'MM-dd-yyyy');
 				break;
 			case "btn_trucker_cd":
 				CustomerPopup('trucker_cd','c');
 				break;
 			case "btn_bill_to_cd":
 				CustomerPopup('bill_to_cd','c');
 				break;
 			case "btn_eq_tpsz_cd":
 				var tp="A";
 				if($("#eq_tp_cd").val().trim() != "")
				{
 					tp=$("#eq_tp_cd").val().trim();
				}
 				callBackFunc = "setTruckTypeInfo";
 			    modal_center_open('./ContainerTypePopup.clt?type=' + tp + '&eq_unit='+$("#eq_tpsz_cd").val(), rtnary, 400, 590,"yes");
 				break;
 			case "btn_vsl_cd":
 				rtnary=new Array(2);
 		   		rtnary[0]="1";
 		   		// 2011.12.27 value parameter
 		   		rtnary[1]="";
 		   		rtnary[2]="";
 		   		callBackFunc = "setVslInfo";
 				modal_center_open('./CMM_POP_0140.clt', rtnary, 656,450,"yes");
 				break;
 			case "btn_carrier_cd":
 				CustomerPopup('carrier_cd','c');
 				break;
 			case "btn_pol":
 				podPopup("pol",'c');
 				break;
 			case "btn_pod":
 				podPopup("pod",'c');
 				break;
 			case "btn_del":
 				podPopup("del",'c');
 				break;
 			case "btn_etd":
 				var cal=new ComCalendar();
	            cal.select(formObj.etd, 'MM-dd-yyyy');
 				break;
 			case "btn_eta":
 				var cal=new ComCalendar();
	            cal.select(formObj.eta, 'MM-dd-yyyy');
 				break;
 			case "btn_seal_no":
 				btn_seal();
 				break;
 			case "btn_supp_addr":
 				btn_addr_info("supp");
 				break;
 			case "btn_Putaway":
 				btn_Putaway();
 				break;
 			case "link_Excel_Download":
 				excel_Download();
 				break;
 			case "link_Excel_Upload":
 				excel_Upload();
 				break;
 			case "rating":
 				fn_auto_rating();
 				break;
 			case "frt_add":
 				fn_frt_add();
 				break;
 			case "sheet2_btn_show":
 				sheet2.SetColHidden(fix_grid02+"lot_id", 0);
 				sheet2.SetColWidth(fix_grid02+"lot_id", 80);
 				
 				sheet2.SetColHidden(fix_grid02+"item_cbm", 0);
 				sheet2.SetColWidth(fix_grid02+"item_cbm", 80);
 				
 				sheet2.SetColHidden(fix_grid02+"item_cbf", 0);
 				sheet2.SetColWidth(fix_grid02+"item_cbf", 80);
 				
 				sheet2.SetColHidden(fix_grid02+"item_grs_kgs", 0);
 				sheet2.SetColWidth(fix_grid02+"item_grs_kgs", 80);
 				
 				sheet2.SetColHidden(fix_grid02+"item_grs_lbs", 0);
 				sheet2.SetColWidth(fix_grid02+"item_grs_lbs", 80);
 				
 				sheet2.SetColHidden(fix_grid02+"item_net_kgs", 0);
 				sheet2.SetColWidth(fix_grid02+"item_net_kgs", 80);
 				
 				sheet2.SetColHidden(fix_grid02+"item_net_lbs", 0);
 				sheet2.SetColWidth(fix_grid02+"item_net_lbs", 80);
 				
 				sheet2.SelectCell(2, fix_grid02+"item_net_lbs");
 				sheet2.SelectCell(2, fix_grid02+"item_cbm");
 				$("#sheet2_btn_show").hide();
 				$("#sheet2_btn_hide").show();
 				break;
 			case "sheet2_btn_hide":
 				sheet2_btn_hide();
 				$("#sheet2_btn_hide").hide();
 				$("#sheet2_btn_show").show();
 				break;
 			// #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882)
 			case "sheet2_btn_restore":
 				sheet2_btn_restore();
 				break;
        } // end switch
    } catch(e) {
        if(e == "[object Error]"){
         //Unexpected Error occurred. Please contact Help Desk!
         alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
         //System Error! + MSG
         alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
 }
}
function sheet2_btn_hide(){
	sheet2.SetColHidden(fix_grid02+"lot_id", 1);
	sheet2.SetColWidth(fix_grid02+"lot_id", 1);
	
	sheet2.SetColHidden(fix_grid02+"item_cbm", 1);
	sheet2.SetColWidth(fix_grid02+"item_cbm", 1);
	
	sheet2.SetColHidden(fix_grid02+"item_cbf", 1);
	sheet2.SetColWidth(fix_grid02+"item_cbf", 1);
	
	sheet2.SetColHidden(fix_grid02+"item_grs_kgs", 1);
	sheet2.SetColWidth(fix_grid02+"item_grs_kgs", 1);
	
	sheet2.SetColHidden(fix_grid02+"item_grs_lbs", 1);
	sheet2.SetColWidth(fix_grid02+"item_grs_lbs", 1);
	
	sheet2.SetColHidden(fix_grid02+"item_net_kgs", 1);
	sheet2.SetColWidth(fix_grid02+"item_net_kgs", 1);
	
	sheet2.SetColHidden(fix_grid02+"item_net_lbs", 1);
	sheet2.SetColWidth(fix_grid02+"item_net_lbs", 1);
}
/*
 * tab
 */
function goTabSelect(isNumSep) {
	var formObj=document.form;	
	$("#sel_tab").val(isNumSep);
	var tabObjs = document.getElementsByName('tabLayer');
	if(isNumSep=='01') {//Form Tab
		tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        ComBtnEnable("btn_search");
        ComBtnEnable("btnSave");
        ComBtnEnable("btnSaveX");
        ComBtnEnable("btn_delete");
        ComBtnEnable("btn_cancel");        
        ComBtnEnable("btn_Putaway"); 
        if(isNumSep=='01')
    	{
        	//HeaderDataCopy(isNumSep);
    	}
    }else if(isNumSep=='02') {//Freight Tab
		tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'inline';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        ComBtnEnable("btn_search");
        ComBtnEnable("btnSave");
        ComBtnEnable("btnSaveX");
        ComBtnEnable("btn_delete");
        ComBtnEnable("btn_cancel"); 
        
        //WMS v6.0 이행 시 수정 함 : Bill To 없을 경우 무조건 Owner 세팅 해줌
        // Default셋업 Owner가 아닌경우, Bill To Name설정을 위해
    	//formObj.bill_to_cd.focus();
    	//formObj.btn_bill_to_cd.focus();        
        if(formObj.bill_to_cd.value.trim() ==''){
    		formObj.bill_to_cd.value = formObj.owner_cd.value;
         	formObj.bill_to_nm.value = formObj.owner_nm.value;   
    	}
        /*if(isNumSep=='02')
    	{
        	//HeaderDataCopy(isNumSep);
    	}*/
    }else if(isNumSep=='03') {//Doc Tab
		tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'inline';
        tabObjs[3].style.display = 'none';
        ComBtnDisable("btn_search");
        ComBtnDisable("btnSave");
        ComBtnDisable("btnSaveX");
        ComBtnDisable("btn_delete");
        ComBtnDisable("btn_cancel");        
        ComBtnDisable("btn_Putaway");         
    }else if(isNumSep=='04') {//Attach tab
		tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'inline';
        ComBtnDisable("btn_search");
        ComBtnDisable("btnSave");
        ComBtnDisable("btnSaveX");
        ComBtnDisable("btn_delete");
        ComBtnDisable("btn_cancel");        
        ComBtnDisable("btn_Putaway");         
    }
    
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
		//resizeSheet();
	});
}
function on_btn_dt(name){
	if (ComDisableTdButton("btn_est_in_dt", 2)) {
		return;
	}
	var formObj=document.form;
	var cal=new ComCalendar();
	cal.select(eval("formObj."+name), 'Ymd');
}

function HeaderDataCopy(isNumSep)
{
	//var sheetObj=sheet1;
	var row;
	if(isNumSep == "02") // list내용을 form으로
	{
		if($("#form_mode").val() == "NEW")
		{
			var new_row=sheetObj.FindStatusRow("I");
			if(new_row == "")
			{
				//신규추가
				row=sheet1RowAdd(sheetObj);	
			}
			else
			{
				var arrRow=new_row.split(";");
				row=arrRow[0];
			}
		}
		else
		{
			row=sheetObj.FindText(fix_grid01 + "wib_bk_no", $("#sel_wib_bk_no").val(), sheetObj.HeaderRows(), -1, true);
		}
		var InputName="wh_cd|wh_nm|ctrt_no|ctrt_nm|rtp_no|owner_cd|owner_addr1|owner_addr2|owner_addr3|owner_addr4|owner_addr5|cust_ord_no|wib_bk_no|bk_date|est_in_dt|est_in_hm|inbound_dt|inbound_hm|inbound_pl_qty|inbound_bx_qty|inbound_ea_qty|inbound_sqft|inbound_cbm|inbound_grs_kgs|inbound_net_kgs|eq_tpsz_cd|eq_no|eq_tp_cd|seal_no|dlv_ord_no|supp_cd|supp_addr1|supp_addr2|supp_addr3|supp_addr4|supp_addr5|ref_no|commc_inv_no|mbl_no|hbl_no|vsl_cd|vsl_nm|voy|carrier_cd|carrier_nm|pol|pol_nm|pod|pod_nm|del|del_nm|etd|eta|unload_sht_yn|bk_sts_cd|bk_sts_nm|rmk";
		var ComboName="ord_tp_cd|fwd_tp_cd|load_tp_cd|trade_tp_cd";
		var input_name_arr=InputName.split("|");
		var combo_name_arr=ComboName.split("|");
		for(var i=0; i<input_name_arr.length; i++)
		{
			if(input_name_arr[i] == "bk_sts_nm")
			{
				$("#" + input_name_arr[i]).val(sheetObj.GetCellText(row, fix_grid01 + "bk_sts_cd"));
			}
			else if(input_name_arr[i].indexOf("_dt") > 0 || input_name_arr[i].indexOf("_date") > 0 || input_name_arr[i] == "etd" || input_name_arr[i] == "eta")
			{
				$("#" + input_name_arr[i]).val(convDate(ComGetMaskedValue(sheetObj.GetCellValue(row, fix_grid01 + input_name_arr[i]), "ymd", "-")));
			}
			else if(input_name_arr[i].indexOf("_hm") > 0)
			{
				$("#" + input_name_arr[i]).val(ComGetMaskedValue(sheetObj.GetCellValue(row, fix_grid01 + input_name_arr[i]), "hm", ":"));
			}
			else if(input_name_arr[i].indexOf("_cbm") > 0 || input_name_arr[i].indexOf("_kgs") > 0 || input_name_arr[i].indexOf("_sqft") > 0)
			{
				//$("#" + input_name_arr[i]).val(ComGetMaskedValue(sheetObj.CellValue(row, fix_grid01 + input_name_arr[i]), "float", ","));
				$("#" + input_name_arr[i]).val(sheetObj.GetCellText(row, fix_grid01 + input_name_arr[i]));
			}
			else if(input_name_arr[i].indexOf("_qty") > 0)
			{
				$("#" + input_name_arr[i]).val(ComGetMaskedValue(sheetObj.GetCellValue(row, fix_grid01 + input_name_arr[i]), "int", ","));
			}
			else
			{
				$("#" + input_name_arr[i]).val(sheetObj.GetCellValue(row, fix_grid01 + input_name_arr[i]));
			}
		}
		for(var m=0; m<combo_name_arr.length; m++)
		{
			if(combo_name_arr[m] == "ord_tp_cd")
			{
				$("#" + combo_name_arr[m])[0].value = sheetObj.GetCellValue(row, fix_grid01 + combo_name_arr[m]);
			}
			else
			{
				$("#" + combo_name_arr[m])[0].value = sheetObj.GetCellValue(row, fix_grid01 + combo_name_arr[m]),false;
			}
		}
	}
	else //form내용을 list로 
	{
		if($("#form_mode").val() == "NEW")
		{
			var new_row=sheetObj.FindStatusRow("I");
			if(new_row == "")
			{
				//신규추가
				row=sheet1RowAdd2(sheetObj);	
				//선택된 행 색상 변경
				selectCellColorChange(sheetObj, row);
			}
			else
			{
				var arrRow=new_row.split(";");
				row=arrRow[0];
				//선택된 행 색상 변경
				selectCellColorChange(sheetObj, row);
			}
		}
		else
		{
			row=sheetObj.FindText(fix_grid01 + "wib_bk_no", $("#sel_wib_bk_no").val(), sheetObj.HeaderRows(), -1, true);
		}
		var InputName="wh_cd|wh_nm|ctrt_no|ctrt_nm|rtp_no|owner_cd|owner_addr1|owner_addr2|owner_addr3|owner_addr4|owner_addr5|cust_ord_no|wib_bk_no|bk_date|est_in_dt|est_in_hm|inbound_dt|inbound_hm|inbound_pl_qty|inbound_bx_qty|inbound_ea_qty|inbound_sqft|inbound_cbm|inbound_grs_kgs|inbound_net_kgs|eq_tpsz_cd|eq_no|eq_tp_cd|seal_no|dlv_ord_no|supp_cd|supp_addr1|supp_addr2|supp_addr3|supp_addr4|supp_addr5|ref_no|commc_inv_no|mbl_no|hbl_no|vsl_cd|vsl_nm|voy|carrier_cd|carrier_nm|pol|pol_nm|pod|pod_nm|del|del_nm|etd|eta|unload_sht_yn|bk_sts_cd|rmk";
		var ComboName="ord_tp_cd|fwd_tp_cd|load_tp_cd|trade_tp_cd";
		var input_name_arr=InputName.split("|");
		var combo_name_arr=ComboName.split("|");
		for(var i=0; i<input_name_arr.length; i++)
		{
			sheetObj.SetCellValue(row, fix_grid01 + input_name_arr[i],$("#" + input_name_arr[i]).val(),0);
		}
		for(var m=0; m<combo_name_arr.length; m++)
		{
			sheetObj.SetCellValue(row, fix_grid01 + combo_name_arr[m],$("#" + combo_name_arr[m])[0].value,0);
		}
	}
}
/*
 * init control
 */
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);    
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
    axon_event.addListenerForm("change", "form_onChange", formObject);
    axon_event.addListenerForm("blur", "form_onChange", formObject);
}
/*
 * init sheet
 */
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet2": //IBSheet2 init
	      with(sheetObj){
		     var prefix=fix_grid02;
		     SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, FrozenCol: 9, ComboMaxHeight :400} );
		     var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		     var headers = [ { Text:getLabel('WHInMgmt_Sheet2_HDR1'), Align:"Center"},
				             { Text:getLabel('WHInMgmt_Sheet2_HDR2'), Align:"Center"} ];
		     InitHeaders(headers, info);
		
		     var cols = [ 
					{Type:"Text",     	Hidden:1,		Width:28       ,Align:"Center",         ColMerge:1,          SaveName:prefix+"row_add",				KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:""},
					{Type:"Text",     	Hidden:1, 		Width:28       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"row_add_qty",  		KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT},
					{Type:"DelCheck",   Hidden:0, 		Width:50       ,Align:"Center",         ColMerge:1,          SaveName:prefix+"row_del",            	KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:""},
					
					// LSY PopupEdit => Combo
//					{Type:"PopupEdit",	Hidden:0, 		Width:100      ,Align:"Left",         	ColMerge:1,          SaveName:prefix+"item_cd",            	KeyField:1,        UpdateEdit:0,   InsertEdit:1,   Format:""},
					{Type:"Combo",  	Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"item_cd",            	KeyField:1,        UpdateEdit:0,   InsertEdit:1,   Format:""},
					// OFVFOUR-8145 [MTS] Quantity of Items show negative number on Closing Storage Entry
					{Type:"Text",     	Hidden:0, 		Width:150      	,Align:"Left",         	ColMerge:1,          SaveName:prefix+"item_nm",            	KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:""},
					{Type:"Text",     	Hidden:1, 		Width:180      	,Align:"Left",         	ColMerge:1,          SaveName:prefix+"pkg_info",            KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:""},
					{Type:"Combo",		Hidden:0, 		Width:100      	,Align:"Left",         	ColMerge:1,          SaveName:prefix+"item_pkgunit",     	KeyField:1,        UpdateEdit:1,   InsertEdit:1,   Format:""},
					{Type:"AutoSum",    Hidden:0, 		Width:65   		,Align:"Right",        	ColMerge:1,          SaveName:prefix+"item_pkgqty",         KeyField:1,        UpdateEdit:1,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT, EditLen:15},
					{Type:"AutoSum",    Hidden:0, 		Width:65   		,Align:"Right",      	ColMerge:1,          SaveName:prefix+"item_ea_qty",         KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT, EditLen:15},
					{Type:"Text",     	Hidden:0, 		Width:83   		,Align:"Center",        ColMerge:1,          SaveName:prefix+"lot_no",            	KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"",EditLen:20},
					{Type:"Date",     	Hidden:1, 		Width:100   	,Align:"Center",        ColMerge:1,          SaveName:prefix+"inbound_dt",          KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Ymd", EditLen:10},
					{Type:"AutoSum",    Hidden:1, 		Width:70   		,Align:"Right",         ColMerge:1,          SaveName:prefix+"in_item_ea_qty",      KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT, EditLen:15},
					{Type:"AutoSum",    Hidden:1, 		Width:55   		,Align:"Right",         ColMerge:1,          SaveName:prefix+"os_item_ea_qty",      KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT, EditLen:15},
					{Type:"AutoSum",    Hidden:1, 		Width:55   		,Align:"Right",         ColMerge:1,          SaveName:prefix+"in_item_pe_qty",      KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Integer", EditLen:15},
					{Type:"Date",     	Hidden:0, 		Width:100      	,Align:"Center",        ColMerge:1,          SaveName:prefix+"exp_dt",            	KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Ymd", EditLen:10},
					{Type:"ComboEdit",  Hidden:0, 		Width:80       	,Align:"Left",         	ColMerge:1,          SaveName:prefix+"lot_04",            	KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"",EditLen:20},
					{Type:"ComboEdit",  Hidden:0, 		Width:80       	,Align:"Left",         	ColMerge:1,          SaveName:prefix+"lot_05",            	KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"",EditLen:20},
					{Type:"Combo",     	Hidden:1, 		Width:80       	,Align:"Left",         	ColMerge:1,          SaveName:prefix+"rcv_sts_cd",         	KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""},
					{Type:"CheckBox",   Hidden:0, 		Width:30   		,Align:"Right",         ColMerge:1,          SaveName:prefix+"chk_rcv_qty_copy",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"",         PointCount:""},
					{Type:"Combo",		Hidden:0, 		Width:100      ,Align:"Left",         	ColMerge:1,          SaveName:prefix+"snd_pkgunit",         KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""},
					{Type:"AutoSum",    Hidden:0, 		Width:70       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"rcv_pkgqty",          KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT, EditLen:15},
					{Type:"AutoSum",    Hidden:0, 		Width:70       ,Align:"Right", 		    ColMerge:1,          SaveName:prefix+"snd_ea_qty",   		KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT},
					{Type:"PopupEdit",	Hidden:0, 		Width:70       ,Align:"Center",         ColMerge:1,          SaveName:prefix+"inbound_loc_nm",      KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""},
					/*Tin.Luong DOU modification: add planned transport column (S)*/
					{Type:"PopupEdit",  Hidden:0, 		Width:80,   	Align:"Center",  		ColMerge:1,   		 SaveName:prefix+"eq_tpsz_cd",      	KeyField:0,   		CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
		            {Type:"Text",       Hidden:0,  		Width:80,   	Align:"Center",  		ColMerge:1,   		 SaveName:prefix+"eq_no",           	KeyField:0,   		CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		            {Type:"Text",       Hidden:0,  		Width:100,  	Align:"Left",    		ColMerge:1,   		 SaveName:prefix+"seal_no",         	KeyField:0,   		CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		            {Type:"Image",      Hidden:0, 		Width:30,   	Align:"Center",  		ColMerge:1,   		 SaveName:prefix+"seal_img",        	KeyField:0,   		CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		            {Type:"Text",      	Hidden:1, 		Width:150,  	Align:"Center",  		ColMerge:0,   		 SaveName:prefix+"eq_tp_cd",        	KeyField:0,   		CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		            /*Tin.Luong DOU modification: add planned transport column (E)*/
		            {Type:"Combo",		Hidden:1, 		Width:100      ,Align:"Left",        	ColMerge:1,          SaveName:prefix+"dmg_pkgunit",         KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""},
					{Type:"AutoSum",    Hidden:1, 		Width:70       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"dmg_pkgqty",          KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT, EditLen:15},
					{Type:"AutoSum",    Hidden:1, 		Width:70       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"dmg_ea_qty",          KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT},
					{Type:"PopupEdit",	Hidden:1, 		Width:70       ,Align:"Center",         ColMerge:1,          SaveName:prefix+"dmg_loc_nm",          KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""},
					{Type:"Text",     	Hidden:0, 		Width:70       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"item_ser_no",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"", EditLen:20},
					{Type:"ComboEdit",  Hidden:0, 		Width:70       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"lic_plat_no",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"", EditLen:20},
					{Type:"Int",     	Hidden:1, 		Width:55       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"bx_label_qty",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Integer", EditLen:15},
					{Type:"Text",     	Hidden:1, 		Width:150      ,Align:"Left",         	ColMerge:1,          SaveName:prefix+"hbl_no",            	KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:""},
					{Type:"Text",     	Hidden:0, 		Width:120      ,Align:"Left",         	ColMerge:1,          SaveName:prefix+"po_no",            	KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"" , EditLen:20},
					{Type:"PopupEdit",  Hidden:0, 		Width:120      ,Align:"Center",         ColMerge:1,          SaveName:prefix+"lot_id",            	KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:""},
					{Type:"AutoSum",    Hidden:0, 		Width:80       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"item_cbm",            KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_CBM_POINT_COUNT, EditLen:15},
					{Type:"AutoSum",    Hidden:0, 		Width:80       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"item_cbf",            KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_CBM_POINT_COUNT, EditLen:15},
					{Type:"AutoSum",    Hidden:0, 		Width:80       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"item_grs_kgs",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_KGS_POINT, EditLen:15},
					{Type:"AutoSum",    Hidden:0, 		Width:80       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"item_grs_lbs",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_KGS_POINT, EditLen:15},
					{Type:"AutoSum",    Hidden:0, 		Width:80       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"item_net_kgs",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_KGS_POINT, EditLen:15},
					{Type:"AutoSum",    Hidden:0, 		Width:80       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"item_net_lbs",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_KGS_POINT, EditLen:15},
					{Type:"Combo",  	Hidden:1, 		Width:80       ,Align:"Center",         ColMerge:1,          SaveName:prefix+"curr_cd",            	KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"",EditLen:20},
					{Type:"AutoSum",    Hidden:1, 		Width:70       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"unit_price",          KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:2, EditLen:15},
					{Type:"Status",    	Hidden:1, 		Width:30       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"ibflag"},
					{Type:"Text",      	Hidden:1, 		Width:85       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"inbound_loc_cd",   	Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"dmg_loc_cd",   		Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"item_sys_no",   		Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"item_seq",   			Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"ctrt_no",   			Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"ctrt_nm",   			Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"wh_cd",   			Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"wh_nm",   			Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"invalid_yn",   		Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"su_valid_yn",   		Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"org_item_sys_no",   	Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"item_cd_dummy",   	Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"wib_bk_no",   		Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"po_sys_no",   		Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"wib_in_no",   		Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"fix_loc_cd",   		Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"fix_loc_cd_nm",   	Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"mbl_no",   			Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"cntr_ref_no",   		Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"custms_ref_no",   	Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"unload_gate_no",   	Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"bk_sts_cd",   		Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"pkg_lv1_qty",   		Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"pkg_lv1_unit_cd",   	Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"pkg_lv2_qty",   		Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"pkg_lv2_unit_cd",   	Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"pkg_lv3_qty",   		Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"pkg_lv3_unit_cd",   	Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"pkg_lv4_qty",   		Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"pkg_lv4_unit_cd",   	Format:""},
					{Type:"Text",      	Hidden:1, 		Width:0        ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"lv1_cbm",   			Format:"Float",         PointCount:WMS_CBM_POINT_COUNT},
					{Type:"Text",      	Hidden:1, 		Width:0        ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"lv1_cbf",   			Format:"Float",         PointCount:WMS_CBM_POINT_COUNT},
					{Type:"Text",      	Hidden:1, 		Width:0        ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"lv1_grs_kgs",   		Format:"Float",         PointCount:MST_KGS_POINT},
					{Type:"Text",      	Hidden:1, 		Width:0        ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"lv1_grs_lbs",   		Format:"Float",         PointCount:MST_KGS_POINT},
					{Type:"Text",      	Hidden:1, 		Width:70       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"lv1_net_kgs",   		Format:"Float",         PointCount:MST_KGS_POINT},
					{Type:"Text",      	Hidden:1, 		Width:50       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"lv1_net_lbs",   		Format:"Float",         PointCount:MST_KGS_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"label_unit",   		Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",			ColMerge:0,			 SaveName:prefix+"bx_label_qty_org",   	Format:"Integer"},
					{Type:"Text",      	Hidden:1, 		Width:70       ,Align:"Right",			ColMerge:0,			 SaveName:prefix+"item_unit_price",   	Format:"Float",         PointCount:2},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"snd_item_cbm",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_CBM_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"snd_item_cbf",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_CBM_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"snd_item_grs_kgs",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_KGS_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"snd_item_grs_lbs",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_KGS_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"snd_item_net_kgs",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_KGS_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"snd_item_net_lbs",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_KGS_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"dmg_item_cbm",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_CBM_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"dmg_item_cbf",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_CBM_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"dmg_item_grs_kgs",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_KGS_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"dmg_item_grs_lbs",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_KGS_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"dmg_item_net_kgs",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_KGS_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"dmg_item_net_lbs",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"Float",         PointCount:WMS_KGS_POINT},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"cbmUnitCd",           KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""},
					{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"cbmUnitNm",           KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""},
		     		{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"lot_04_cbm_cd",       KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""},
		     		{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Right",          ColMerge:1,          SaveName:prefix+"lot_05_cbm_cd",       KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""},
		     		{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",         ColMerge:1,          SaveName:prefix+"use_serial_flag",     KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:""},
		     		{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",         ColMerge:1,          SaveName:prefix+"serial_req_flag",     KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:""},
		     		{Type:"Text",      	Hidden:1, 		Width:80       ,Align:"Center",         ColMerge:1,          SaveName:prefix+"serial_uniq_flag",    KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:""}];

				     InitColumns(cols);
				     SetSheetHeight(360);
				     SetEditable(1);
				     SetWaitImageVisible(0);
				 	 SetImageList(0,"/web/images/common/icon_search_s.gif");//search
				 	 SetImageList(1,"/web/images/common/close_off.gif");//clear
				 	 SetImageList(2,"web/img/main/icon_m.gif");
				 	 SetColProperty(0, prefix+"eq_tpsz_cd",		{AcceptKeys:"E|N" , InputCaseSensitive:1});
				 	 SetColProperty(0, prefix+"eq_no",		{AcceptKeys:"E|N" , InputCaseSensitive:1});
				 	 SetColProperty(0, prefix+"item_cd", {ComboText:"|"+skuCdText, ComboCode:"|"+skuCdCode} );
				 	 SetColProperty(0, prefix+"lot_no",		{AcceptKeys:"E|N|" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
//				 	 SetColProperty(0, prefix+"lot_04",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
//				 	 SetColProperty(0, prefix+"lot_05",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
				 	 SetColProperty(0, prefix+"lot_04",		{AcceptKeys:"E|N|" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
				 	 SetColProperty(0, prefix+"lot_05",		{AcceptKeys:"E|N|" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
				 	 SetColProperty(0, prefix+"item_pkgunit",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
				 	 SetColProperty(0, prefix+"snd_pkgunit",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
				 	 SetColProperty(0, prefix+"dmg_pkgunit",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
				 	 SetColProperty(0, prefix+"inbound_loc_nm",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
				 	 SetColProperty(0, prefix+"dmg_loc_nm",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
				 	 SetColProperty(0, prefix+"po_no",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
				 	 SetColProperty(0, prefix+"item_nm",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
				 	 SetColProperty(0, prefix+"curr_cd", {ComboText:"|"+currCdText, ComboCode:"|"+currCdCode} );
				 	 SetColProperty(0, prefix+"rcv_sts_cd",  {ComboText:'Sound|Damage', ComboCode:'S|D'} );
				 	 SetColProperty(0, prefix+"lic_plat_no", {ComboText:"|AUTO"	      , ComboCode:"|AUTO"} );
				 	 SetColProperty(0, prefix+"lic_plat_no",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
				 	 InitComboNoMatchText(1, "",1);
				 	 SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
				 	 ShowSubSum([{StdCol:fix_grid02+"item_sys_no", SumCols:fix_grid02+"item_pkgqty|" + fix_grid02+"item_ea_qty|" + fix_grid02+"in_item_ea_qty|" + fix_grid02+"os_item_ea_qty|" + fix_grid02+"in_item_pe_qty|" + fix_grid02+"rcv_pkgqty|" + fix_grid02+"snd_ea_qty|" 
						+ fix_grid02+"dmg_pkgqty|" + fix_grid02+"dmg_ea_qty|" + fix_grid02+"item_cbm|" + fix_grid02+"item_cbf|" + fix_grid02+"item_grs_kgs|" + fix_grid02+"item_grs_lbs|" + fix_grid02+"item_net_kgs|" + fix_grid02+"item_net_lbs|" + fix_grid02+"unit_price"
						, ShowCumulate:0, CaptionCol:fix_grid02+"item_nm", CaptionText: "Sub Total"}]);

				     }
		break;		
	case "sheet3":
	    with(sheetObj){
        
			      var hdr1="|Status|Doc No|Doc Type|Register ID|Register Date|Register System Date";
			      var prefix=fix_grid03;
			
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0 } );
			
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:hdr1, Align:"Center"} ];
			      InitHeaders(headers, info);
			
			      var cols = [ 
			            {Type:"Status",    Hidden:1, 	Width:30,   Align:"Center",   	SaveName:prefix+"ibflag",    	ColMerge:0},
						{Type:"Text",      Hidden:0,  	Width:300,  Align:"Left",   	SaveName:prefix+"field_name",	ColMerge:1,			KeyField:0,		UpdateEdit:0,	Format:""},
						{Type:"Text",      Hidden:0,  	Width:300,  Align:"Center",   	SaveName:prefix+"field_val",	ColMerge:1,			KeyField:0,		UpdateEdit:0,	Format:""},
						{Type:"Text",      Hidden:1, 	Width:10,   Align:"Left",   	SaveName:prefix+"doc_type",		ColMerge:1,			KeyField:0, 	UpdateEdit:0,	Format:""}
						
						,{Type:"Text",      Hidden:0, 	Width:300,   Align:"Center",   	SaveName:prefix+"rgst_id",		ColMerge:1,			KeyField:0, 	UpdateEdit:0,	Format:""}
						,{Type:"Text",      Hidden:0, 	Width:300,   Align:"Center",   	SaveName:prefix+"rgst_loc_dt",	ColMerge:1,			KeyField:0, 	UpdateEdit:0,	Format:"YmdHms"}
						,{Type:"Text",      Hidden:1, 	Width:300,   Align:"Center",   	SaveName:prefix+"rgst_sys_dt",	ColMerge:1,			KeyField:0, 	UpdateEdit:0,	Format:"YmdHms"}
						];
			
			      InitColumns(cols);
			      SetSheetHeight(300);
			      SetEditable(0);
			      SetWaitImageVisible(0);
			      SetCountPosition(0);
			      //SetRowHidden(0, 1);
			      SetHeaderRowHeight(30);
			      SetDataRowHeight(20);
			
				}
		break;
	case "sheet4":      //IBSheet4 init
	    with(sheetObj){
      
	      var prefix=fix_grid04;
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, DataRowMerge:1 } );
	
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WHInMgmt_Sheet4_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ 
			{Type:"Status",    	Hidden:1, 	Width:30,   Align:"Center",		ColMerge:1,       SaveName:prefix+"ibflag"},
			{Type:"Seq",       	Hidden:0, 	Width:50,   Align:"Center", 	ColMerge:1,       SaveName:prefix+"seq",			KeyField:0,        UpdateEdit:0,                    Format:""},
			{Type:"Text",     	Hidden:0,  	Width:800,  Align:"Left",       ColMerge:1,       SaveName:prefix+"file_org_nm",	KeyField:0,        UpdateEdit:0,                    Format:""},
			{Type:"Date",     	Hidden:0,  	Width:80,   Align:"Center",   	ColMerge:1,       SaveName:prefix+"upload_date",	KeyField:0,        UpdateEdit:0,					Format:"Ymd", EditLen:8},
			{Type:"Int",     	Hidden:0,  	Width:80,   Align:"Right",  	ColMerge:1,       SaveName:prefix+"file_size",		KeyField:0,        UpdateEdit:0,					Format:"Integer"},
			
			{Type:"Text",      	Hidden:1, 	Width:10,   Align:"Left",       ColMerge:1,       SaveName:prefix+"doc_no",			KeyField:0,		   UpdateEdit:0,                    Format:""},
			{Type:"Text",       Hidden:1, 	Width:10,   Align:"Left",       ColMerge:1,       SaveName:prefix+"file_path",		KeyField:0,		   UpdateEdit:0,                    Format:""},
			{Type:"Text",       Hidden:1, 	Width:10,   Align:"Left",       ColMerge:1,       SaveName:prefix+"file_sys_nm",	KeyField:0,		   UpdateEdit:0,                    Format:""},
			{Type:"Text",       Hidden:1, 	Width:10,   Align:"Left",       ColMerge:1,       SaveName:prefix+"svc_tp_cd",		KeyField:0,		   UpdateEdit:0,                    Format:""},
			{Type:"Text",       Hidden:1, 	Width:10,   Align:"Left",       ColMerge:1,       SaveName:prefix+"doc_ref_tp_cd",	KeyField:0,		   UpdateEdit:0,                    Format:""},
			{Type:"Text",       Hidden:1, 	Width:10,   Align:"Left",       ColMerge:1,       SaveName:prefix+"doc_tp_cd",		KeyField:0,		   UpdateEdit:0,                    Format:""} ];

	      InitColumns(cols);
	      SetSheetHeight(450);
	      SetEditable(1);
	      SetWaitImageVisible(0);
		}
		break;
	case "sheet5":      //IBSheet5 init
	    with(sheetObj){
       
		      var hdr1="merge_key|W/H CD|Order\nNo|Order\nType|Estimate|Estimate|Status|Contract|Contract Name|Inbound|Inbound|Inbound Summary|Inbound Summary|Inbound Summary|Inbound Summary|Inbound Summary|Inbound Summary|Inbound Summary|CNTR/TR|CNTR/TR|CNTR/TR|CNTR/TR|CNTR/TR"
		      + "|EID\nType|FWD\nType|M B/L|H B/L|Booking\nNo|Booking\nDate|Reference\nNo|Invoice\nNo|Remark|Owner|Owner|Owner|Owner|Owner|Owner|Vendor|Vendor|Vendor|Vendor|Vendor|Vendor|Vessel|Vessel|Voyage|Carrier|Carrier|POL|POD|DEL|ETD|ETA"
		      + "|seq|SKU|Description|Item LOT|Pack Master|UOM|Estimated|Estimated|Sound|Sound|Sound|Damage|Damage|Damage|Label\nQty|Inbound Result|Inbound Result|Inbound Result|Inbound Result|Volume|Volume|GWT|GWT|NWT|NWT|LOT ID|Expiration Date|LOT 04|LOT 05|PO No|UOM Price|UOM Price";
		      var hdr2="merge_key|W/H CD|Order\nNo|Order\nType|Date|Time|Status|Contract|Contract Name|Date|Time|PL|BX|EA|SQ FT|CBM|GWT|NWT|Type|No|Seal|D/O No|Loading"
		      + "|EID\nType|FWD\nType|M B/L|H B/L|Booking\nNo|Booking\nDate|Reference\nNo|Invoice\nNo|Remark|Code|Addr1|Addr2|Addr3|Addr4|Addr5|Code|Addr1|Addr2|Addr3|Addr4|Addr5|Code|Name|Voyage|Code|Name|POL|POD|DEL|ETD|ETA"
		      + "|seq|SKU|Description|Item LOT|Pack Master|UOM|Qty|EA|UOM|Qty|Location|UOM|Qty|Location|Label\nQty|Inbound Date|TLT EA|OS|TLT PL|CBM|CFT|KGS|LBS|KGS|LBS|LOT ID|Expiration Date|LOT 04|LOT 05|PO No|Currency|Price";
		      var prefix=fix_grid05;
		
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"},
		                  { Text:hdr2, Align:"Center"} ];
		      InitHeaders(headers, info);
		
		      var cols = [ 
					{Type:"Text",     Hidden:1,  Width:70,        Align:"Center",			ColMerge:1,        SaveName:prefix+"merge_key",        	KeyField:1,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"wh_cd",        		KeyField:1,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"cust_ord_no",        KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:60,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"ord_tp_cd",        	KeyField:0,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"est_in_dt",        	KeyField:0,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:40,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"est_in_hm",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"bk_sts_cd",        	KeyField:0,            UpdateEdit:0,         InsertEdit:0,         Format:""},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"ctrt_no",        	KeyField:0,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:140,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"ctrt_nm",        	KeyField:0,            UpdateEdit:0,         InsertEdit:0,         Format:""},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"inbound_dt",     	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:40,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"inbound_hm",     	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:50,        Align:"Right",        	ColMerge:1,        SaveName:prefix+"inbound_pl_qty", 	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT},
					{Type:"Text",     Hidden:0,  Width:50,        Align:"Right",        	ColMerge:1,        SaveName:prefix+"inbound_bx_qty", 	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT},
					{Type:"Text",     Hidden:0,  Width:50,        Align:"Right",        	ColMerge:1,        SaveName:prefix+"inbound_ea_qty", 	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT},
					{Type:"Text",     Hidden:0,  Width:50,        Align:"Right",        	ColMerge:1,        SaveName:prefix+"inbound_sqft",   	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Float",        		  PointCount:WMS_CBM_POINT},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Right",        	ColMerge:1,        SaveName:prefix+"inbound_cbm",    	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Float",        		  PointCount:WMS_CBM_POINT_COUNT},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Right",        	ColMerge:1,        SaveName:prefix+"inbound_grs_kgs",	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Float",        		  PointCount:WMS_KGS_POINT},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Right",        	ColMerge:1,        SaveName:prefix+"inbound_net_kgs",	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Float",        		  PointCount:WMS_KGS_POINT},
					{Type:"Text",     Hidden:0,  Width:50,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"eq_tpsz_cd",     	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"eq_no",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"seal_no",      		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"dlv_ord_no",   		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:60,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"load_tp_cd",   		KeyField:0,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:60,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"trade_tp_cd",  		KeyField:0,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:60,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"fwd_tp_cd",    		KeyField:0,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:110,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"mbl_no",       		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:110,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"hbl_no",       		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Center",      		ColMerge:1,        SaveName:prefix+"wib_bk_no",    		KeyField:0,            UpdateEdit:0,         InsertEdit:0,         Format:""},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Center",      		ColMerge:1,        SaveName:prefix+"bk_date",      		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"ref_no",       		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"commc_inv_no", 		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"rmk",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:60,        Align:"Center",      		ColMerge:1,        SaveName:prefix+"owner_cd",        	KeyField:0,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"owner_addr1",        KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"owner_addr2",        KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"owner_addr3",        KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"owner_addr4",        KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"owner_addr5",        KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:60,        Align:"Center",      		ColMerge:1,        SaveName:prefix+"supp_cd",        	KeyField:0,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"supp_addr1",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"supp_addr2",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"supp_addr3",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"supp_addr4",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"supp_addr5",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:60,        Align:"Center",      		ColMerge:1,        SaveName:prefix+"vsl_cd",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"vsl_nm",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"voy",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:60,        Align:"Center",      		ColMerge:1,        SaveName:prefix+"carrier_cd",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",        		ColMerge:1,        SaveName:prefix+"carrier_nm",        	KeyField:0,            UpdateEdit:0,         InsertEdit:0,         Format:""},
					{Type:"Text",     Hidden:0,  Width:60,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"pol",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:60,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"pod",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:60,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"del",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"etd",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Center",        	ColMerge:1,        SaveName:prefix+"eta",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:1,  Width:100,       Align:"Left",       		ColMerge:1,        SaveName:prefix+"seq",        		KeyField:0,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",       		ColMerge:1,        SaveName:prefix+"item_cd",        	KeyField:0,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:150,       Align:"Left",       		ColMerge:1,        SaveName:prefix+"item_nm",        	KeyField:0,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Center",     		ColMerge:1,        SaveName:prefix+"lot_no",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"",       EditLen:20},
					{Type:"Text",     Hidden:0,  Width:140,       Align:"Left",       		ColMerge:1,        SaveName:prefix+"pkg_info",        	KeyField:0,            UpdateEdit:0,         InsertEdit:0,         Format:""},
					{Type:"Text",     Hidden:0,  Width:50,        Align:"Center",     		ColMerge:1,        SaveName:prefix+"item_pkgunit",       KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"item_pkgqty",        KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"item_ea_qty",        KeyField:0,            UpdateEdit:0,         InsertEdit:0,         Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT},
					{Type:"Text",     Hidden:0,  Width:50,        Align:"Center",     		ColMerge:1,        SaveName:prefix+"snd_pkgunit",        KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"rcv_pkgqty",         KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT},
					{Type:"Text",     Hidden:0,  Width:90,        Align:"Center",     		ColMerge:1,        SaveName:prefix+"inbound_loc_nm",     KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:50,        Align:"Center",     		ColMerge:1,        SaveName:prefix+"dmg_pkgunit",        KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"dmg_pkgqty",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT},
					{Type:"Text",     Hidden:0,  Width:90,        Align:"Center",     		ColMerge:1,        SaveName:prefix+"dmg_loc_nm",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"bx_label_qty",       KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Integer"},
					{Type:"Date",     Hidden:0,  Width:75,        Align:"Center",     		ColMerge:1,        SaveName:prefix+"item_inbound_dt",    KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Ymd", EditLen:8},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"in_item_ea_qty",     KeyField:0,            UpdateEdit:0,         InsertEdit:0,         Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"os_item_ea_qty",     KeyField:0,            UpdateEdit:0,         InsertEdit:0,         Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"in_item_pe_qty",     KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Integer"},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"item_cbm",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Float",        		  PointCount:WMS_CBM_POINT},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"item_cbf",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Float",        		  PointCount:WMS_CBM_POINT},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"item_grs_kgs",       KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Float",        		  PointCount:WMS_KGS_POINT},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"item_grs_lbs",       KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Float",        		  PointCount:WMS_KGS_POINT},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"item_net_kgs",       KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Float",        		  PointCount:WMS_KGS_POINT},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"item_net_lbs",       KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Float",        		  PointCount:WMS_KGS_POINT},
					{Type:"Popup",    Hidden:0,  Width:120,       Align:"Center",     		ColMerge:1,        SaveName:prefix+"lot_id",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:""},
					{Type:"Date",     Hidden:0,  Width:80,        Align:"Center",     		ColMerge:1,        SaveName:prefix+"exp_dt",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Ymd", EditLen:8},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Left",       		ColMerge:1,        SaveName:prefix+"lot_04",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"",       EditLen:20},
					{Type:"Text",     Hidden:0,  Width:80,        Align:"Left",       		ColMerge:1,        SaveName:prefix+"lot_05",        		KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"",       EditLen:20},
					{Type:"Text",     Hidden:0,  Width:100,       Align:"Left",       		ColMerge:1,        SaveName:prefix+"po_no",        		KeyField:0,            UpdateEdit:0,         InsertEdit:1,         Format:""},
					{Type:"Text",     Hidden:0,  Width:50,        Align:"Center",     		ColMerge:1,        SaveName:prefix+"curr_cd",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"",       EditLen:20},
					{Type:"Text",     Hidden:0,  Width:70,        Align:"Right",      		ColMerge:1,        SaveName:prefix+"unit_price",        	KeyField:0,            UpdateEdit:1,         InsertEdit:1,         Format:"Float",        	      PointCount:2} ];
		
		      InitColumns(cols);
		      SetSheetHeight(180);
		      SetEditable(1);
            }


		break;
	case "sheet6":      //Freight
		with (sheetObj) {
		
			var prefix=fix_grid06;
			
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('WHOutMgmt_Sheet6_HDR1'), Align:"Center"},
			                { Text:getLabel('WHOutMgmt_Sheet6_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);
	
			var cols = [ {Type:"Status",    Hidden:1,  Width:30,    Align:"Center",   				SaveName:prefix+"ibflag" },
			             {Type:"DelCheck",  Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del" },
//			             {Type:"DelCheck",   Hidden:0, 		Width:50       ,Align:"Center",         ColMerge:1,          SaveName:prefix+"row_del",            	KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:""},
			             {Type:"Combo",      Hidden:0,  Width:100,    Align:"Center",   ColMerge:1,   SaveName:prefix+"rate_tp_cd",    				KeyField:1,   UpdateEdit:0,   Format:"" },
			             {Type:"Combo",      Hidden:0,  Width:120,   Align:"Center",     ColMerge:1,   SaveName:prefix+"frt_cd",  	KeyField:1,   UpdateEdit:0,   Format:"" },
			             {Type:"Text",      Hidden:0,  Width:250,    Align:"Left",   ColMerge:1,   SaveName:prefix+"frt_nm",  	KeyField:0,   UpdateEdit:0,   Format:"" },
			             {Type:"Combo",      Hidden:0,  Width:150,    Align:"Left",    ColMerge:1,   SaveName:prefix+"unit_cd",    			KeyField:1,   UpdateEdit:0,   Format:"" },
			             {Type:"Combo",      Hidden:0,  Width:100,    Align:"Center",     ColMerge:1,   SaveName:prefix+"unit_cd2",   				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Combo",      Hidden:0,  Width:80,    Align:"Center",     ColMerge:1,   SaveName:prefix+"curr_cd",   				KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             {Type:"Float",     Hidden:0,  Width:150,    Align:"Right",     ColMerge:1,   SaveName:prefix+"unit_price",  				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Float",			PointCount:vPointCount, EditLen:12  },
			             {Type:"Float",       Hidden:0,  Width:150,    Align:"Right",     ColMerge:1,   SaveName:prefix+"qty",   				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Float",			PointCount:5, EditLen:vEditLen },
			             {Type:"AutoSum",      Hidden:0,  Width:150,    Align:"Right",     ColMerge:1,   SaveName:prefix+"inv_amt",				KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:2, EditLen:vEditLen },
			             {Type:"Combo",      Hidden:0,  Width:120,    Align:"Center",     ColMerge:1,   SaveName:prefix+"item_cd",  				KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             /* #3388-[BINEX WMS4.0] RATE IN & OUT MINIMUM CHARGE - Vien.Cao */ 
			             {Type:"Text",      Hidden:0,  Width:150,    Align:"Left",     ColMerge:1,   SaveName:prefix+"rmk",				KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"", EditLen:100 },
			             {Type:"Text",      Hidden:0,  Width:120,    Align:"Left",     ColMerge:1,   SaveName:prefix+"cls_no",		 	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:""},
			             {Type:"Date",      	Hidden:0,  	Width:120,    	Align:"Center",     	ColMerge:1,   	SaveName:prefix+"cls_dt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
			             {Type:"Text",      Hidden:0,  Width:120,    Align:"Left",     ColMerge:1,   SaveName:prefix+"inv_no",				KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
						 {Type:"Text", 		Hidden:1, 	Width:120,   Align:"Center",       	ColMerge:1,       SaveName:prefix+"wh_cd",         		KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						 {Type:"Text",     	Hidden:1,  	Width:100,   Align:"Left",         	ColMerge:1,       SaveName:prefix+"wib_bk_no",    	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:"",        EditLen:100},
						 {Type:"Text",     	Hidden:1,  	Width:100,   Align:"Left",         	ColMerge:1,       SaveName:prefix+"cust_ord_no",    	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:"",        EditLen:100},
						 {Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"ctrt_no",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"ofc_cd",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Float",      Hidden:1,  Width:150,    Align:"Right",     ColMerge:1,   SaveName:prefix+"inv_ttl_amt",				KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:5, EditLen:vEditLen },
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"sell_buy_tp_cd",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"frt_seq",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"cust_cd",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"wib_bk_frt_seq",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"rating_flg",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"sts_cd",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text",      Hidden:1,  Width:120,    Align:"Left",     ColMerge:1,   SaveName:prefix+"inv_seq",				KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" }];
			 
			InitColumns(cols);
            SetSheetHeight(450);
			SetEditable(1);
//			SetWaitImageVisible(0);
//			SetGetCountPosition()(0);
//			SetHeaderGetRowHeight(18);
			SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
			SetColProperty(prefix+"frt_cd", {ComboCode:FreightCode, ComboText:FreightText} );
			SetColProperty(prefix+"rate_tp_cd",{ComboText:" |"+rate_tp_cdText, ComboCode:" |"+rate_tp_cdCode});
			SetColProperty(prefix+"unit_cd",{ComboText:"|# of License Plate|Property of License Plate|Container|Truck|Handling Unit|Package Unit|Order|Hour", ComboCode:"|LPN|LPP|CNT|TRK|HUT|PUT|ODR|HOR"});
			SetColProperty(prefix+"curr_cd", {ComboText:'|'+currCdText, ComboCode:'|'+currCdCode} );
		}
		break;
		
		case "sheet7": //IBSheet7 init
	      with(sheetObj){
		     var prefix=fix_grid07;
		     SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, FrozenCol: 9, ComboMaxHeight :400} );
		     var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		     // Hidden 그리드
		     //#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 3차
		     //var headers = [ { Text:"xls_no|wh_cd|ctrt_no|cust_ord_no|ord_tp_cd|est_in_dt|inbound_pl_qty|inbound_bx_qty|inbound_ea_qty|inbound_sqft|inbound_cbm|trade_tp_cd|fwd_tp_cd|item_cd|lot_no|item_pkgunit|item_pkgqty|item_rcv_pkgqty|inbound_loc_cd|inbound_loc_nm|inbound_dt|eq_tpsz_cd|eq_no|seal_no|curr_cd|unit_price|lot_04|lot_05|exp_dt|if_rslt", Align:"Center"}];
		     var hdr1 = "xls_no|wh_cd|ctrt_no|cust_ord_no|ord_tp_cd|est_in_dt|inbound_pl_qty|inbound_bx_qty|inbound_ea_qty|inbound_sqft|inbound_cbm|trade_tp_cd|fwd_tp_cd|item_cd|lot_no|item_pkgunit|item_pkgqty|item_rcv_pkgqty|inbound_loc_cd|inbound_loc_nm|inbound_dt|eq_tpsz_cd|eq_no|seal_no|curr_cd|unit_price|lot_04|lot_05|exp_dt";
		     hdr1 = hdr1 + "|po_no|lic_plat_no|item_ser_no|if_rslt|pkg_lv1_unit_cd|pkg_lv1_qty|pkg_lv1_unit_nm|pkg_lv2_unit_cd|pkg_lv2_qty|pkg_lv2_unit_nm|pkg_lv3_unit_cd|pkg_lv3_qty|pkg_lv3_unit_nm|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";
		     hdr1 = hdr1 + "|sku_unit_cd|sku_unit_nm|item_sys_no|item_lot4|item_lot5|pkg_info|unit_curr_cd|fix_loc_cd|fix_loc_nm|def_loc_cd|def_loc_nm|item_nm";
				
		     var headers = [ { Text:hdr1, Align:"Center"}];
		     InitHeaders(headers, info);
		
		     var cols = [ 
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"xls_no"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"wh_cd"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"ctrt_no"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"cust_ord_no"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"ord_tp_cd"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"est_in_dt"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"inbound_pl_qty"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"inbound_bx_qty"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"inbound_ea_qty"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"inbound_sqft"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"inbound_cbm"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"trade_tp_cd"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"fwd_tp_cd"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"item_cd"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"lot_no"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"item_pkgunit"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"item_pkgqty"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"item_rcv_pkgqty"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"inbound_loc_cd"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"inbound_loc_nm"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"inbound_dt"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"eq_tpsz_cd"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"eq_no"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"seal_no"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"curr_cd"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"unit_price"},
					{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"lot_04"},
				    {Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"lot_05"},
				    {Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"exp_dt"},
				    {Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"po_no"},
				    {Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"lic_plat_no"},
				    {Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"item_ser_no"},
				    
				    //#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 3차
				    //{Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"if_rslt"}];
				    {Type:"Text",  		Hidden:0, 		Width:100       ,Align:"Center",        ColMerge:1,          SaveName:prefix+"if_rslt"},
				    {Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"pkg_lv1_unit_cd",   	Format:""},
				    {Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:0,			 SaveName:prefix+"pkg_lv1_qty",   		Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT},
				    {Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"pkg_lv1_unit_nm",   	Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"pkg_lv2_unit_cd",   	Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:0,			 SaveName:prefix+"pkg_lv2_qty",   		Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"pkg_lv2_unit_nm",   	Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"pkg_lv3_unit_cd",   	Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:0,			 SaveName:prefix+"pkg_lv3_qty",   		Format:WMS_QTY_FORMAT2,         PointCount:WMS_QTY_POINT},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"pkg_lv3_unit_nm",   	Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"lv1_cbm",   			Format:"Float",         PointCount:MST_CBM_POINT},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"lv1_cbf",   			Format:"Float",         PointCount:MST_CBM_POINT},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"lv1_grs_kgs",   		Format:"Float",         PointCount:MST_KGS_POINT},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"lv1_grs_lbs",   		Format:"Float",         PointCount:MST_KGS_POINT},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"lv1_net_kgs",   		Format:"Float",         PointCount:MST_KGS_POINT},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"lv1_net_lbs",   		Format:"Float",         PointCount:MST_KGS_POINT},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"sku_unit_cd",   	    Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"sku_unit_nm",   	    Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"item_sys_no",   	    Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"item_lot4",   	    Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"item_lot5",   	    Format:""},
					
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"pkg_info",   	        Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"unit_curr_cd",   	    Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"fix_loc_cd",   	    Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"fix_loc_nm",   	    Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"def_loc_cd",   	    Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"def_loc_nm",   	    Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"item_nm",      	    Format:""},
					//#2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE)
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"use_serial_flag",   	Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"serial_req_flag",   	Format:""},
					{Type:"Text",      	Hidden:0, 		Width:80        ,Align:"Center",		ColMerge:1,			 SaveName:prefix+"serial_uniq_flag",    Format:""}
	     
					]

				InitColumns(cols);
	            SetSheetHeight(450);
				SetEditable(1);
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
function sheet2_OnSelectMenu(sheetObj, MenuString){
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
/**
 * Sheet6의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet6_OnSelectMenu(sheetObj, MenuString){
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
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
 function initCombo(comboObj, comboNo) {
	var formObj = document.form;
	var i=0;
	var vTextSplit=null;
	var vCodeSplit=null;
	switch(comboObj.id) {
		case "list_bk_sts_cd":
			vTextSplit=bk_sts_cdText.split("|");
			vCodeSplit=bk_sts_cdCode.split("|");
			comboAddItem(comboObj,  "ALL", "ALL");	
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
				if(vCodeSplit[j] == "I")
				{
					bk_sts_I=vTextSplit[j];
				}
				else if(vCodeSplit[j] == "P")
				{
					bk_sts_P=vTextSplit[j];
				}
				else if(vCodeSplit[j] == "A")
				{
					bk_sts_A=vTextSplit[j];
				}
				else if(vCodeSplit[j] == "X")
				{
					bk_sts_X=vTextSplit[j];
				}
			}
			comboObj.index=0;
			break;
		case "list_in_search_tp":
			var txt="Order No|Booking No";
			var val="CUST_ORD_NO|WIB_BK_NO";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index=0;
        	} 			
			break;
		case "list_in_date_tp":
			var txt="Estimated In Date|Booking Date|Create Date";
			var val="EST_IN_DT|BK_DATE|RGST_LOC_DT";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index=0;
	    	} 		
			break;
		case "list_ord_tp_cd":
			vTextSplit=ord_tp_cdText.split("|");
			vCodeSplit=ord_tp_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index=0;
        	} 
			break;
		case "ord_tp_cd":
			vTextSplit=ord_tp_cdText.split("|");
			vCodeSplit=ord_tp_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index=0;
        	} 
			break;
		case "load_tp_cd":
			vTextSplit=load_tp_cdText.split("|");
			vCodeSplit=load_tp_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index=0;
        	} 
			break;
		case "fwd_tp_cd":
			vTextSplit=fwd_tp_cdText.split("|");
			vCodeSplit=fwd_tp_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index=0;
        	} 
			break;
		case "trade_tp_cd":
			vTextSplit=trade_tp_cdText.split("|");
			vCodeSplit=trade_tp_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.index=0;
        	} 
			break;
	}
} 
 /*
  * sheet1 searchend event
  */
 function sheet1_OnSearchEnd(sheetObj){
 	
 	//var sheetObj = sheet1;//sheetObjects[0];
	 for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
 		//UNLOADING SHEET ICON
		if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "N")
		{
 			sheetObj.SetCellImage(i, fix_grid01 + "unload_sht","");
		}
		else if (sheetObj.GetCellValue(i, fix_grid01 + "unload_sht_yn") =="Y")
 		{
  			sheetObj.SetCellImage(i, fix_grid01 + "unload_sht",0);
 		}
 		else
		{
  			sheetObj.SetCellImage(i, fix_grid01 + "unload_sht",1);
		}
 		//폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wib_bk_no", 1);
		//sheetObj.CellFontColor(i, fix_grid01 + "cust_ord_no")  = "#0100FF";	
 		if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd")  == "N")
		{
			sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",1);
			sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",1);
			sheetObj.SetCellEditable(i, fix_grid01 + "trade_tp_cd",1);
			sheetObj.SetCellEditable(i, fix_grid01 + "fwd_tp_cd",1);
			sheetObj.SetCellEditable(i, fix_grid01 + "est_in_dt",1);
			if(sheetObj.GetCellValue(i, fix_grid01 + "trade_tp_cd").trim() == "")
			{
				sheetObj.SetCellValue(i, fix_grid01 + "trade_tp_cd","DOM",0);
			}
			if(sheetObj.GetCellValue(i, fix_grid01 + "fwd_tp_cd").trim() == "")
			{
				sheetObj.SetCellValue(i, fix_grid01 + "fwd_tp_cd","OTH",0);
			}
		}
 		else if(sheetObj.GetCellValue(i, fix_grid01 + "rcv_cnt") == "0")
		{
			sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",1);
			sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",1);
			sheetObj.SetCellEditable(i, fix_grid01 + "est_in_dt",1);
		}
 	}
	sheetObj.SetColBackColor(fix_grid01 + "unload_sht",sheetObj.GetEditableColor());
	if($("#uploadfile").val().trim() == "T" && $("#fwd_bk_no").val().trim() != "")
	{
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(i, fix_grid01 + "wib_bk_no").trim() == $("#fwd_bk_no").val().trim()){
				sheet1_OnDblClick(sheetObj,i,sheetObj.SaveNameCol(fix_grid01 + "wib_bk_no"), sheetObj.GetCellValue(i, fix_grid01 + "wib_bk_no"));
				sheetObj.SelectCell(i, sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"));
				$("#uploadfile").val("");
				$("#fwd_bk_no").val("");
				goTabSelect("04");
				return;
			}
		}
	}
	 if(sheetObj.RowCount()> 0)
	 {
		 sheet1_OnDblClick(sheetObj,sheetObj.HeaderRows(), sheetObj.SaveNameCol(fix_grid01 + "wib_bk_no"), sheetObj.GetCellValue(sheetObj.HeaderRows(), fix_grid01 + "wib_bk_no"));
		 sheet2_OnSearchEnd(sheet2);
		 sheetObj.SelectCell(sheetObj.HeaderRows(), sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"));
	 }
	 else
	 {
		//SHEET ADD 기본셋팅
		//default1RowAdd();
		 $("#form_mode").val("NEW");
	 }
	 //goTabSelect('01');

 }
 
 var cur_row;
 var cur_col;
 var cur_sheetObj;
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	var sUrl="";
	cur_row = Row;
	cur_col = Col;
	cur_sheetObj = sheetObj;
	
	with(sheetObj)
	{
		if(colName == fix_grid01 + "ctrt_no")
		{
			var ord_tp_lvl1_cd="\'P\'";
			if(sheet2.RowCount()> 0)
			{
				//confirm
				if(ComShowCodeConfirm("COM0294") == false)
				{
					sheet1.SetCellValue(Row, Col,sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no_org"),0);
					return;
				}
				//SHEET 초기화
				sheet2.RemoveAll();
			}
			rtnary=new Array(3);
			rtnary[0]=sheet1.GetCellValue(Row, Col);
			rtnary[1]="";
			rtnary[2]=ord_tp_lvl1_cd;
			rtnary[3]=window;
			
			//var params = "?ctrt_no="+sheet1.GetCellValue(Row, Col)+"&ctrt_nm="+sheet1.GetCellValue(Row, Col+1); 
			var params = ""; 
		      
		    callBackFunc = "setContactInfoGrid";
		    modal_center_open('./ContractRoutePopup.clt' + params, rtnary, 900, 580,"yes");
		
			//sUrl="ContractRoutePopup.do?ctrt_no="+sheetObj.GetCellValue(Row, Col)+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd + "&pnl_svc_tp_cd=" + pnl_svc_tp_cd;
	    	//ComOpenPopup(sUrl, 800, 620, "setContactInfoGrid", "0,0", true, sheetObj, Row, Col);
		}				
		else if ( colName == fix_grid01 + "eq_tpsz_cd" ) 
		{
			var tp="A";
			if(sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd")) != "")
			{
				tp=sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd"));
			}
			callBackFunc = "setTruckTypeInfoGrid";
		    modal_center_open('./ContainerTypePopup.clt?type=' + tp + '&eq_unit=', rtnary, 400, 590,"yes");
		    //modal_center_open('./ContainerTypePopup.clt?type=' + tp + '&eq_unit='+sheetObj.GetCellValue(Row, Col), rtnary, 400, 590,"yes");
		}
		else if (colName == fix_grid01 + "seal_no")
		{
			ComShowMemoPad3(sheetObj, Row, Col, false, 300, 82,  Col, Col);      
		}
		else if (colName == fix_grid01 + "rmk")
		{
			ComShowMemoPad4(sheetObj, Row, Col, false, 200, 100,Col, Col);
		}
		else if(colName == fix_grid01 + "owner_cd")
		{
			//CustomerGridPopup("owner_cd", sheetObj, Row, Col, fix_grid01);
			rtnary=new Array(1);
			rtnary[0]="2";
			rtnary[1]="";
			rtnary[2]=window;
			callBackFunc = "setCustCdGrid";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		}
		else if(colName == fix_grid01 + "supp_cd")
		{
			rtnary=new Array(1);
			rtnary[0]="2";
			rtnary[1]="";
			rtnary[2]=window;
			callBackFunc = "setCustCdGrid";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		}
		else if(colName == fix_grid01 + "vsl_cd")
		{
			//sUrl="VesselPopup.do?vsl_cd="+sheetObj.GetCellValue(Row, Col);
			//ComOpenPopup(sUrl, 900, 550, "setVslInfoGrid", "0,0", true, sheetObj, Row, Col);
			rtnary=new Array(2);
			rtnary[0]="1";
			//rtnary[1]=sheetObj.GetCellValue(Row, Col+1);
			rtnary[1]="";
		   	var sUrl="./CMM_POP_0140.clt";
		   	callBackFunc = "setVslInfoGrid";
		   	modal_center_open(sUrl, rtnary, 900,500,"yes");
		}
		else if(colName == fix_grid01 + "carrier_cd")
		{
			rtnary=new Array(1);
			rtnary[0]="2";
			rtnary[1]="";
			rtnary[2]=window;
			callBackFunc = "setCustCdGrid";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		}
		else if (colName == fix_grid01 + "pod")
		{
			podGridPopup("pod", sheetObj, Row, Col, fix_grid01);
		}
		else if (colName == fix_grid01 + "pol")
		{
			podGridPopup("pol", sheetObj, Row, Col, fix_grid01);
		}
		else if (colName == fix_grid01 + "del")
		{
			podGridPopup("del", sheetObj, Row, Col, fix_grid01);
		}
		else if(colName == fix_grid01 + "owner_addr2")
		{
			ComShowMemoPad5(sheetObj, Row, Col, false, 300, 120,  Col, fix_grid01 + "owner_addr1", fix_grid01 + "owner_addr2", fix_grid01 + "owner_addr3"
					, fix_grid01 + "owner_addr4", fix_grid01 + "owner_addr5"		
			);      
		}
		else if(colName == fix_grid01 + "supp_addr1")
		{
			ComShowMemoPad4(sheetObj, Row, Col, false, 200, 100,Col, Col);     
		}
	}
}
function setVslInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var sheetObj= sheet1;
	var prefix= fix_grid01;
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"vsl_cd",rtnValArr[0],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"vsl_nm",rtnValArr[1],0);
		 }
}
function setCustCdGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		//Owner
		if(sheet1.ColSaveName(cur_col) == 'Grd01owner_cd'){
			var rtnValAry=rtnVal.split("|");
			var sheetObj=sheet1;
			sheetObj.SetCellValue(cur_row , fix_grid01 + "owner_cd",rtnValAry[0],0);
			sheetObj.SetCellValue(cur_row , fix_grid01 + "owner_addr1",rtnValAry[7],0);
		}
		//Vendor
		if(sheet1.ColSaveName(cur_col) == 'Grd01supp_cd'){
			var rtnValAry=rtnVal.split("|");
			var sheetObj=sheet1;
			sheetObj.SetCellValue(cur_row , fix_grid01 + "supp_cd",rtnValAry[0],0);
			sheetObj.SetCellValue(cur_row , fix_grid01 + "supp_addr1",rtnValAry[7],0);
		}
		//Vessel
		if(sheet1.ColSaveName(cur_col) == 'Grd01carrier_cd'){
			var rtnValAry=rtnVal.split("|");
			var sheetObj=sheet1;
			sheetObj.SetCellValue(cur_row , fix_grid01 + "carrier_cd",rtnValAry[0],0);
			sheetObj.SetCellValue(cur_row , fix_grid01 + "carrier_nm",rtnValAry[2],0);
		}
		if(sheet1.ColSaveName(cur_col) == 'Grd01carrier_nm'){
			var rtnValAry=rtnVal.split("|");
			var sheetObj=sheet1;
			sheetObj.SetCellValue(cur_row , fix_grid01 + "carrier_cd",rtnValAry[0],0);
			sheetObj.SetCellValue(cur_row , fix_grid01 + "carrier_nm",rtnValAry[2],0);
		}
		//POL
		if(sheet1.ColSaveName(cur_col) == 'Grd01pol'){
			var rtnValAry=rtnVal.split("|");
			var sheetObj=sheet1;
			sheetObj.SetCellValue(cur_row , fix_grid01 + "pol",rtnValAry[0],0);
			sheetObj.SetCellValue(cur_row , fix_grid01 + "pol_nm",rtnValAry[2],0);
		}
		//DEL
		if(sheet1.ColSaveName(cur_col) == 'Grd01del'){
			var rtnValAry=rtnVal.split("|");
			var sheetObj=sheet1;
			sheetObj.SetCellValue(cur_row , fix_grid01 + "del",rtnValAry[0],0);
			sheetObj.SetCellValue(cur_row , fix_grid01 + "del_nm",rtnValAry[2],0);
		}
		//DEL
		if(sheet1.ColSaveName(cur_col) == 'Grd01pod'){
			var rtnValAry=rtnVal.split("|");
			var sheetObj=sheet1;
			sheetObj.SetCellValue(cur_row , fix_grid01 + "pod",rtnValAry[0],0);
			sheetObj.SetCellValue(cur_row , fix_grid01 + "pod_nm",rtnValAry[2],0);
		}
	}
}

function setContactInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=sheet2;
		sheetObj.SetCellValue(cur_row, fix_grid01 + "ctrt_no",rtnValAry[0],0);
		sheetObj.SetCellValue(cur_row, fix_grid01 + "ctrt_nm",rtnValAry[1],0);
		sheetObj.SetCellValue(cur_row, fix_grid01 + "rtp_no",rtnValAry[9],0);
	}
}
var curRow;
var curCell;
var curSheet;
var col_nm = "";
function sheet1_OnChange(sheetObj, Row, Col, Value) {
	curRow=Row;
	curCell=Col;
	curSheet=sheetObj;
	var formObj = document.form;
	var colStr=sheetObj.ColSaveName(Col);
	col_nm = colStr;
	//receiving이 변경되었을경우 O/S 계산
    if(colStr == fix_grid01 + "ctrt_no")
	{
		if(sheet2.RowCount()> 0)
		{
//			if(sheet1.GetCellValue(3,"Grd01ibflag") =="I"){
//				if(Value != "")
//				{
//					var ord_tp_lvl1_cd="\'P\'";
//					var pnl_svc_tp_cd="44";
//					ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+ComGetObjValue(formObj.ctrt_no)
//																					+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd
//																					+"&mgmt_flg=Y&org_cd="+formObj.ofc_cd.value, './GateServlet.gsl');
//				}
//				else
//				{
//					sheetObj.SetCellValue(Row, fix_grid01 + "ctrt_nm","",0);
//					sheetObj.SetCellValue(Row, fix_grid01 + "rtp_no","",0);
//					sheetObj.SetCellValue(Row, fix_grid01 + "ctrt_no_org","",0);
//				}
//				return;
//			}
			//confirm
			if(ComShowCodeConfirm("COM0294") == false)
			{
				sheetObj.SetCellValue(Row, Col,sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no_org"),0);
				return;
			}
			//SHEET 초기화
			sheet2.RemoveAll();
		}
		if(Value != "")
		{
			var ord_tp_lvl1_cd="\'P\'";
			var pnl_svc_tp_cd="44";
			ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+Value/*ComGetObjValue(formObj.ctrt_no)*/
																			+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd
																			+"&mgmt_flg=Y&org_cd="+formObj.ofc_cd.value, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "ctrt_nm","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "rtp_no","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "ctrt_no_org","",0);
		}
	}
	else if(colStr == fix_grid01 + "eq_tpsz_cd") 
	{
		if(Value != "")
		{
			var sParam="cntr_tp="+Value;
			ajaxSendPost(result_eq_tpsz_cd, sheetObj, '&goWhere=aj&bcKey=searchCntrTrTp&'+sParam, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01+"eq_tp_cd","");
		}
	}
	else if(colStr == fix_grid01 + "owner_cd")
	{
		searchTlCustInfoGrid("owner", Value, sheetObj, Row, fix_grid01);
	}
	else if(colStr == fix_grid01 + "supp_cd")
	{
		searchTlCustInfoGrid("supp", Value, sheetObj, Row, fix_grid01);
	}
	else if(colStr == fix_grid01 + "carrier_cd")
	{
		searchTlCustInfoGrid("carrier", Value, sheetObj, Row, fix_grid01);
	}
	else if(colStr == fix_grid01 + "vsl_cd")
	{
		if(Value != "")
		{
			ajaxSendPost(resultvsl_cd, sheetObj, '&goWhere=aj&bcKey=searchTlVslInfo&'+"code="+Value, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "vsl_nm","",0);
		}
	}
	else if (colStr== fix_grid01 + "pod" || colStr== fix_grid01 + "pol" || colStr== fix_grid01 + "del")
	{
		if(Value != "")
		{
			ajaxSendPost(setGridTlLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=Location&s_code='+Value, './GateServlet.gsl');
		}
	}	
	else if(colStr ==fix_grid01 + "unload_sht_yn")
	{
		if (Value =="Y")
		{
 			sheetObj.SetCellImage(Row, fix_grid01 + "unload_sht",0);
		}
		else
		{
 			sheetObj.SetCellImage(Row, fix_grid01 + "unload_sht",1);
		}
	}
}
function setGridTlLocInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');	
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), col_nm, masterVals[0],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), col_nm + "_nm",masterVals[3],0);
		}else{
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), col_nm, "",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), col_nm + "_nm","",0);
			sheetObj.SelectCell(sheetObj.GetSelectRow(), col_nm);
		}
	}
}
function CB_ajaxTradePaner(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	var Row = sheet1.GetSelectRow();
	 var Col = sheet1.GetSelectCol();
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
			//sheet1.SetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_cd",masterVals[0],0);
			//sheet1.SetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_nm",masterVals[3],0);
			
			//POL
			if(sheet1.ColSaveName(Col) == 'Grd01pol'){
				var sheetObj=sheet1;
				sheetObj.SetCellValue(Row , fix_grid01 + "pol",masterVals[0],0);
				sheetObj.SetCellValue(Row , fix_grid01 + "pol_nm",masterVals[3],0);
			}
			//DEL
			if(sheet1.ColSaveName(Col) == 'Grd01del'){
				var sheetObj=sheet1;
				sheetObj.SetCellValue(Row , fix_grid01 + "del",masterVals[0],0);
				sheetObj.SetCellValue(Row , fix_grid01 + "del_nm",masterVals[3],0);
			}
			//DEL
			if(sheet1.ColSaveName(Col) == 'Grd01pod'){
				var sheetObj=sheet1;
				sheetObj.SetCellValue(Row , fix_grid01 + "pod",masterVals[0],0);
				sheetObj.SetCellValue(Row , fix_grid01 + "pod_nm",masterVals[3],0);
			}
			
		}else{
			//POL
			if(sheet1.ColSaveName(Col) == 'Grd01pol'){
				var sheetObj=sheet1;
				sheetObj.SetCellValue(Row , fix_grid01 + "pol",'',0);
				sheetObj.SetCellValue(Row , fix_grid01 + "pol_nm",'',0);
			}
			//DEL
			if(sheet1.ColSaveName(Col) == 'Grd01del'){
				var sheetObj=sheet1;
				sheetObj.SetCellValue(Row , fix_grid01 + "del",'',0);
				sheetObj.SetCellValue(Row , fix_grid01 + "del_nm",'',0);
			}
			//DEL
			if(sheet1.ColSaveName(Col) == 'Grd01pod'){
				var sheetObj=sheet1;
				sheetObj.SetCellValue(Row , fix_grid01 + "pod",'',0);
				sheetObj.SetCellValue(Row , fix_grid01 + "pod_nm",'',0);
			}
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));	
	}
}
function resultvsl_cd (reqVal, sheetObj) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 var Row = sheetObj.GetSelectRow();
	 var Col = sheetObj.GetSelectCol();
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   sheetObj.SetCellValue(Row,  Col,rtnArr[1],0);
			sheetObj.SetCellValue(Row,  Col+1,rtnArr[0],0);
	   }
	   else{
		   sheetObj.SetCellValue(Row,  Col,'',0);
			sheetObj.SetCellValue(Row,  Col+1,'',0);
	   }
	  }
	 }
}

function result_eq_tpsz_cd (reqVal, sheetObj) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
//	 var sheetObj = sheet3;
	 var Row = sheetObj.GetSelectRow();
	 var Col = sheetObj.GetSelectCol();
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   var prefix= fix_grid01;
		   sheetObj.SetCellValue(Row,  Col,rtnArr[0],0);
			sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",rtnArr[2]);
	   }
	   else{
		   sheetObj.SetCellValue(Row,  Col,'',0);
			sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",'');
	   }
	  }
	 }else {
		 sheetObj.SetCellValue(Row,  Col,'',0);
			sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",'');
	}
}
function setTlCtrtInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(curRow, curCell,rtnArr[1],0);
				sheetObj.SetCellValue(curRow, fix_grid01 + "ctrt_nm",rtnArr[0],0);
				sheetObj.SetCellValue(curRow, fix_grid01 + "ctrt_no_org",rtnArr[1],0);
				sheetObj.SetCellValue(curRow, fix_grid01 + "rtp_no",rtnArr[2],0);
				sheetObj.SetCellValue(curRow, fix_grid01 + "owner_cd",rtnArr[7],0);
				searchTlCustInfoGrid("owner", ComGetObjValue(formObj.owner_cd), sheetObj, curRow, fix_grid01);
			}else{
				sheetObj.SetCellValue(curRow, curCell,'',0);
				sheetObj.SetCellValue(curRow, fix_grid01 + "ctrt_nm",'',0);
			}
		}else{
			sheetObj.SetCellValue(curRow, curCell,'',0);
			sheetObj.SetCellValue(curRow, fix_grid01 + "ctrt_nm",'',0);
		}
	}
}
/*
 * sheet1의 MouseDown 이벤트
 */
function sheet1_OnMouseDown(sheetObj,Button, Shift, X, Y)
{
	if(sheetObj.MouseRow()<= 1 && sheetObj.MouseCol()== sheetObj.SaveNameCol(fix_grid01 + "row_add")) //header 선택시. header row -> 0,1
	{
		var row=sheet1RowAdd(sheetObj);
		if(row > 0)
		{
			setTimeout("setSheet1Focus('" + row + "')", 100); //1000(1초)  100(0.1초)
		}
	}
}
function setSheet1Focus(row)
{
	var sheetObj=sheet1;
	sheetObj.SelectCell(row, fix_grid01 + "cust_ord_no");
	resetAll(false,true);
	goTabSelect('01');
	//document.all.Tab01.className="On";
    //document.all.Tab02.className="Off";
    //document.all.Tab03.className="Off";   
    //document.all.Tab04.className="Off";
    //선택된 행 색상 변경
	selectCellColorChange(sheetObj, row);
}
/*
 * sheet1의 OnClick 이벤트
 */
function sheet1_OnClick(sheetObj,Row, Col, Value){
	if(Col == sheetObj.SaveNameCol(fix_grid01 + "row_add"))	{
		var row=sheet1RowAdd(sheetObj);
		if(row > 0)
		{
			sheetObj.SelectCell(row, fix_grid01 + "cust_ord_no");
			//resetAll(false,true);
			goTabSelect('01');
			//document.all.Tab01.className="On";
		    //document.all.Tab02.className="Off";
		    //document.all.Tab03.className="Off";   
		    //document.all.Tab04.className="Off";
		    //선택된 행 색상 변경
			selectCellColorChange(sheetObj, row);	    
		}
	}
	else if(Col == sheetObj.SaveNameCol(fix_grid01 + "row_del"))
	{
		sheet1RowDel(sheetObj, Row);
	}
	else if(Col == sheetObj.SaveNameCol(fix_grid01 + "unload_sht"))
	{
		if(sheetObj.GetRowStatus(Row) != "I" && sheetObj.GetCellValue(Row, fix_grid01 + "bk_sts_cd") != "N")
		{
			WorkShtPopup(sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
		}
	}
}
function sheet1RowAdd(sheetObj)
{	
	/*sheetObj = sheet1;
	if(sheetObj.RowCount("I") >= 1)
	{
		return -1;
	}*/
	//var row=sheetObj.DataInsert(-1);
	resetAll(false,true);
	//sheet1RowAddProcess(sheetObj, row);
	
	/*if(row > 0)
	{
		sheetObj.SelectCell(row, fix_grid01 + "cust_ord_no");
		resetAll(false,true);
	    //선택된 행 색상 변경
		selectCellColorChange(sheetObj, row);	    
	}
	return row;*/
}
function sheet1RowAdd2(sheetObj)
{
	if(sheetObj.RowCount("I") >= 1)
	{
		return -1;
	}
	var row=sheetObj.DataInsert(-1);
	sheet1RowAddProcess(sheetObj, row);
	return row;
}
function sheet1RowAddProcess(sheetObj, row)
{
	sheetObj.SetCellValue(row, fix_grid01 + "row_add","",0);
	sheetObj.SetCellValue(row, fix_grid01 + "row_del","-",0);
	sheetObj.SetCellValue(row, fix_grid01 + "bk_sts_cd","N",0);
	sheetObj.SetCellValue(row, fix_grid01 + "rcv_cnt","0",0);
	sheetObj.SetCellValue(row, fix_grid01 + "wh_cd",$("#list_wh_cd").val(),0);
	sheetObj.SetCellValue(row, fix_grid01 + "wh_nm",$("#list_wh_nm").val(),0);
	if($("#list_rtp_no").val() != "")
	{
		sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no",$("#list_ctrt_no").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "ctrt_nm",$("#list_ctrt_nm").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "rtp_no",$("#list_rtp_no").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "owner_cd",$("#list_owner_cd").val());
	}
	else
	{
		sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no",$("#list_ctrt_no").val());
	}
	sheetObj.SetCellValue(row, fix_grid01 + "bk_date",ComGetNowInfo(),0);
	sheetObj.SetCellValue(row, fix_grid01 + "wh_cd_org",$("#list_wh_cd").val(),0);
	sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no_org",$("#list_ctrt_no").val(),0);
	sheetObj.SetCellValue(row, fix_grid01 + "trade_tp_cd","DOM",0);
	sheetObj.SetCellValue(row, fix_grid01 + "fwd_tp_cd","OTH",0);
}
function sheet1RowDel(sheetObj, Row)
{
if(sheetObj.GetRowStatus(Row) == "I")
	{
		sheetObj.RowDelete(Row, false);
		sheet2.RemoveAll();
	}
}
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	var sRow=sheetObj.FindStatusRow("I");
	if(sRow != "" && Row!= sRow)
	{
		if(ComShowCodeConfirm("COM12152","Data") == true){
			saveFlg = "Grid";
			btn_Save();
			return;
		}else{
			sheetObj.RowDelete(sRow,false);
		}
	
	}
	if((colStr == fix_grid01 + "wib_bk_no" || colStr == fix_grid01 + "wh_cd" || colStr == fix_grid01 + "ord_tp_cd"
		 || colStr == fix_grid01 + "est_in_dt" || colStr == fix_grid01 + "bk_sts_cd"
		  || colStr == fix_grid01 + "ctrt_no" || colStr == fix_grid01 + "ctrt_nm"
		 ) && sheetObj.GetCellEditable(Row, Col) == false)
	{
		selectCellColorChange(sheetObj, Row);
		if(sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no").trim() != "")
		{
			searchBookingData(sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"), sheetObj.GetCellValue(Row, fix_grid01 + "cust_ord_no"));
			goTabSelect("01");
		}
		else
		{
			if($("#form_mode").val() == "NEW")
			{
				//skip
			}
			else
			{
				resetAll(false, true);
			}
		}
	}
}
function selectCellColorChange(sheetObj, Row)
{
 	var selected_color=sheetObj.SelectBackColor;
	//선택된 행 색상 변경
	var col_name1="chk|row_add|row_del|ctrt_nm";
	var col_name1_arr=col_name1.split("|");
	for(var i=0; i<col_name1_arr.length; i++)
	{
 		sheetObj.SetColBackColor(fix_grid01 + col_name1_arr[i],sheetObj.UnEditableColor);
		sheetObj.SetCellBackColor(Row, fix_grid01 + col_name1_arr[i],selected_color);
	}
	sheetObj.SetColBackColor(fix_grid01 + "unload_sht",sheetObj.GetEditableColor());
	sheetObj.SetCellBackColor(Row, fix_grid01 + "unload_sht",selected_color);
	var col_name2="wh_cd|ord_tp_cd|est_in_dt|ctrt_no";
	var col_name2_arr=col_name2.split("|");
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(Row != i && sheetObj.GetCellBackColor(i, fix_grid01 + "bk_sts_cd") == selected_color)//선택되지않은Row중 selected로 색상변해있는 row를 초기상태로 변경한다.
		{
			for(var m=0; m<col_name2_arr.length; m++)
			{
				var cell_editable=sheetObj.GetCellEditable(i, fix_grid01 + col_name2_arr[m]);
				if(cell_editable == true)
				{
					sheetObj.SetCellBackColor(i, fix_grid01 + col_name2_arr[m],sheetObj.GetEditableColor());
				}
				else
				{
 					sheetObj.CellBackColor(i, fix_grid01 + col_name2_arr[m])=sheetObj.UnEditableColor;
				}
			}
		}
		else if(Row == i)//선택된Row
		{
			for(var m=0; m<col_name2_arr.length; m++)
			{
				var cell_editable=sheetObj.GetCellEditable(i, fix_grid01 + col_name2_arr[m]);
				if(cell_editable == true)
				{
					sheetObj.SetCellBackColor(i, fix_grid01 + col_name2_arr[m],sheetObj.GetEditableColor());
				}
				else
				{
					sheetObj.SetCellBackColor(i, fix_grid01 + col_name2_arr[m],selected_color);
				}
			}
		}
	}
	sheetObj.SetColBackColor(fix_grid01 + "bk_sts_cd",sheetObj.UnEditableColor);
	sheetObj.SetCellBackColor(Row, fix_grid01 + "bk_sts_cd",selected_color);
}
function sheet2_OnSaveEnd(sheetObj){
	// Freight Tab SAVE관련 FLAG
	l_btn_rateFlg = false;
	sheetObj.InitComboNoMatchText(1, "",1);
	// Sub Total
	sheetObj.ShowSubSum([{StdCol:fix_grid02+"item_sys_no", SumCols:fix_grid02+"item_pkgqty|" + fix_grid02+"item_ea_qty|" + fix_grid02+"in_item_ea_qty|" + fix_grid02+"os_item_ea_qty|" + fix_grid02+"in_item_pe_qty|" + fix_grid02+"rcv_pkgqty|" + fix_grid02+"snd_ea_qty|" 
		+ fix_grid02+"dmg_pkgqty|" + fix_grid02+"dmg_ea_qty|" + fix_grid02+"item_cbm|" + fix_grid02+"item_cbf|" + fix_grid02+"item_grs_kgs|" + fix_grid02+"item_grs_lbs|" + fix_grid02+"item_net_kgs|" + fix_grid02+"item_net_lbs|" + fix_grid02+"unit_price"
		, ShowCumulate:0, CaptionCol:fix_grid02+"item_nm", CaptionText: "Sub Total"}]);
	
/*	Tu.Ngueyn close 20161111: no need this code because sheet2_onSearchEnd take care this job already
 // SKU ComboList조회
	//var selRow=sheet1.GetSelectRow();
	var p_ctrt_no = $("#ctrt_no").val();sheet1.GetCellValue(selRow, fix_grid01 + "ctrt_no")
	var p_wh_cd = $("#wh_cd").val();sheet1.GetCellValue(selRow, fix_grid01 + "wh_cd")
//	sheet2Row = row;
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');*/
	
	var formObj = document.form;
	
	if ( sheetObj.RowCount() > 0 ) {
		// Complete인 경우만 오픈
		if (formObj.bk_sts_cd.value == "X") {
			formObj.btn_rating.disabled = false;
			formObj.btn_frtAdd.disabled = false;
		} else {
			formObj.btn_rating.disabled = true;
			formObj.btn_frtAdd.disabled = true;
		}
		
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
		//항상 오픈
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked" - Optionized needed
		if (opt_chk == "Y"){
			formObj.btn_frtAdd.disabled = false;
			formObj.btn_rating.disabled = false;
		}	
	}
	
	
	
	var addCnt = 0;
	var mergeCellRow = sheetObj.HeaderRows();
	var fSubSumRow = "|" + sheetObj.FindSubSumRow() + "|";
	
	//#2717 EMAIL 
	var preItemUom = "start";
	
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		/* #3721 [J&A WMS] ITEM CODE 수정 못하도록- Booked 상태에서 item 변경 후 Received 동시 처리 시 재고 데이터 정합성 오류 발생 함
		if (formObj.inbound_dt.value == "") {
			sheetObj.SetCellEditable(i, fix_grid02 + "item_cd",1);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_nm",1);
		} else {
			sheetObj.SetCellEditable(i, fix_grid02 + "item_cd",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_nm",0);
		}
		*/
		sheetObj.SetCellEditable(i, fix_grid02 + "item_cd",0);
		sheetObj.SetCellEditable(i, fix_grid02 + "item_nm",0);
		
		// Order Qty가 0으로 입력되는 경우도 있기 때문에 Sub total이 0이 되는 경우 존재하므로, Sub total은 merge에서 제외 할것.
		if (i < sheetObj.LastRow()-2) {
			if (sheetObj.GetCellValue(i,fix_grid02+"item_ea_qty") == "0" && fSubSumRow.indexOf("|" + i + "|") == -1) {
				if ( sheetObj.GetCellValue(i,fix_grid02+"item_ea_qty") == "0" && (fSubSumRow.indexOf("|" + (i-1) + "|") > -1 || i==sheetObj.HeaderRows()) ) {
					mergeCellRow = i+1;
					addCnt = 0;
				} else {
					addCnt++;
				}
			} else if ( sheetObj.GetCellValue(i,fix_grid02+"item_ea_qty") != "0" || fSubSumRow.indexOf("|" + i + "|") > -1 ) {
				if (addCnt > 0) {
					sheet2.SetMergeCell(mergeCellRow-1, 7, addCnt+1, 1);
					sheet2.SetMergeCell(mergeCellRow-1, 8, addCnt+1, 1);
				}
				mergeCellRow = i+1;
				addCnt = 0;
			} else {
				addCnt = 0;
			}
			//#2717 EMAIL 
			var  currItemUom = sheetObj.GetCellValue(i,fix_grid02+"item_cd") + "^*^" + sheetObj.GetCellValue(i,fix_grid02+"item_pkgunit");
			if (preItemUom != currItemUom && sheetObj.GetCellValue(i,fix_grid02+"item_ea_qty") == "0" ){
				preItemUom = currItemUom;
				sheet2.SetMergeCell(mergeCellRow, 7, addCnt+1, 1);
				sheet2.SetMergeCell(mergeCellRow, 8, addCnt+1, 1);
				mergeCellRow = i+1;
				addCnt = 0;
			}
		} else if (i == sheetObj.LastRow()-2 && sheetObj.GetCellValue(i,fix_grid02+"item_ea_qty") == "0") {
			// Sub Total과 Total Row를 더해야 함
			if (addCnt > 0) {
				sheet2.SetMergeCell(mergeCellRow-1, 7, addCnt+2, 1);
				sheet2.SetMergeCell(mergeCellRow-1, 8, addCnt+2, 1);
			} else if (sheetObj.GetCellValue(i,fix_grid02+"item_ea_qty") == "0" && fSubSumRow.indexOf("|" + i + "|") == -1) {
				if(mergeCellRow != i) {
					sheet2.SetMergeCell(mergeCellRow-1, 7, addCnt+2, 1);
					sheet2.SetMergeCell(mergeCellRow-1, 8, addCnt+2, 1);
				}
			}
		}
	}
}

function sheet2_OnSearchEnd(sheetObj){
	//console.time("sheet2_OnSearchEnd")
	//console.log("sheet2_OnSearchEnd: ");
	//#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 3차
	if(sheet2_excel_flag == "Y"){
		try{
			
			//테스트 시간
			/*
			var stime = new Date();
			var tt = "start:"+ stime + "\n";
		    */
			
			sheet2.HideSubSum();
			sheet2_excel_flag = "N";
			
			var prefix02="Grd02";
			var prefix07="Grd07";
			    
			hdrR = sheet2.HeaderRows();
			rowCnt = sheet2.RowCount();
			 
			sheet2.AllowEvent4CheckAll(0);
			sheet2.RenderSheet(1);//속도 개선 처리
			    
			var formObj=document.form; 
			
			sheet2.SetColProperty(prefix02 + "item_cd", {ComboText:""+rtnItemCdArray, ComboCode:""+rtnItemNmArray} );
			
			var item_pkgunit_cd ="";
			var item_pkgunit_nm ="";
			var lot_04 ="";
			var lot_05 ="";
			for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
					
		    	var row = i;
		    	sheet2.SetCellValue(i, prefix02 + "ctrt_nm", formObj.ctrt_nm.value,0)
		    	
		    	
		    	item_pkgunit_cd = sheet2.GetCellValue(i, prefix02 + "cbmUnitCd");
		    	item_pkgunit_nm = sheet2.GetCellValue(i, prefix02 + "cbmUnitNm");
		    	
		    	lot_04 = sheet2.GetCellValue(i, prefix02 + "lot_04_cbm_cd");
		    	lot_05 = sheet2.GetCellValue(i, prefix02 + "lot_05_cbm_cd");
		    	
		    	sheet2.CellComboItem(i,prefix02 + "item_pkgunit",{ComboText:item_pkgunit_nm, ComboCode:item_pkgunit_cd} );
		    	sheet2.CellComboItem(i,prefix02 + "snd_pkgunit",{ComboText:item_pkgunit_nm, ComboCode:item_pkgunit_cd} );
		    	sheet2.CellComboItem(i,prefix02 + "lot_04",{ComboText:lot_04, ComboCode:lot_04} );	
		    	sheet2.CellComboItem(i,prefix02 + "lot_05",{ComboText:lot_05, ComboCode:lot_05} );	
		    	
		    	fix_loc_cd= sheet2.GetCellValue(i, prefix02 + "fix_loc_cd");
				if(fix_loc_cd != "" && fix_loc_cd != "null")
				{
					sheet2.SetCellValue(i, prefix02+"inbound_loc_cd",fix_loc_cd,0);
					sheet2.SetCellValue(i, prefix02+"inbound_loc_nm",sheet2.GetCellValue(i, prefix02 + "fix_loc_nm"),0);
					sheet2.SetCellValue(i, prefix02 + "dmg_pkgunit","",0);
					sheet2.SetCellValue(i, prefix02 + "dmg_pkgqty",0,0);
					sheet2.SetCellValue(i, prefix02 + "dmg_loc_nm","",0);
				}
				
		    	//재 계산 
		    	sheet2.SetCellValue(i, prefix02 + "snd_pkgunit", sheet2.GetCellValue(i, prefix02 + "item_pkgunit"),0);
		    	sheet2.SetCellValue(i, prefix02 + "rcv_pkgqty", sheet2.GetCellValue(i, prefix02 + "rcv_pkgqty"),0);
		    	
		    	//Estimated Total 
		    	item_pkgunit = sheet2.GetCellValue(i, prefix02 + "item_pkgunit");
		    	pkg_lv1_unit_cd = sheet2.GetCellValue(i, prefix02 + "pkg_lv1_unit_cd");
		    	pkg_lv2_unit_cd = sheet2.GetCellValue(i, prefix02 + "pkg_lv2_unit_cd");
		    	pkg_lv3_unit_cd = sheet2.GetCellValue(i, prefix02 + "pkg_lv3_unit_cd");
		    	
		    	
		    	if(item_pkgunit == pkg_lv1_unit_cd){
		    		item_pkgqty = sheet2.GetCellValue(i, prefix02 + "item_pkgqty");
		    		item_snd_pkgqty = sheet2.GetCellValue(i, prefix02 + "rcv_pkgqty");
		    		item_uom_pkgqty = sheet2.GetCellValue(i, prefix02 + "pkg_lv1_qty");
	
		    		sheet2.SetCellValue(i, prefix02 + "item_ea_qty", item_pkgqty * item_uom_pkgqty ,0);
		    		sheet2.SetCellValue(i, prefix02 + "snd_ea_qty", item_snd_pkgqty * item_uom_pkgqty ,0);
		    	}
		    	if(item_pkgunit == pkg_lv2_unit_cd){
		    		item_snd_pkgqty = sheet2.GetCellValue(i, prefix02 + "rcv_pkgqty");
		    		item_uom_pkgqty = sheet2.GetCellValue(i, prefix02 + "pkg_lv2_qty");
		    		
		    		sheet2.SetCellValue(i, prefix02 + "item_ea_qty", item_pkgqty * item_uom_pkgqty ,0);
		    		sheet2.SetCellValue(i, prefix02 + "snd_ea_qty", item_snd_pkgqty * item_uom_pkgqty ,0);
		    	}
		    	if(item_pkgunit == pkg_lv3_unit_cd){
		    		item_pkgqty = sheet2.GetCellValue(i, prefix02 + "item_pkgqty");
		    		item_snd_pkgqty = sheet2.GetCellValue(i, prefix02 + "rcv_pkgqty");
		    		item_uom_pkgqty = sheet2.GetCellValue(i, prefix02 + "pkg_lv3_qty");
		    		
		    		sheet2.SetCellValue(i, prefix02 + "item_ea_qty", item_pkgqty * item_uom_pkgqty ,0);
		    		sheet2.SetCellValue(i, prefix02 + "snd_ea_qty", item_snd_pkgqty * item_uom_pkgqty ,0);
		    	}
		    	
		    	qty=eval(sheet2.GetCellValue(i, prefix02 + "item_ea_qty"));
		    	snd_qty=eval(sheet2.GetCellValue(i, prefix02 + "snd_ea_qty"));
		    	dmg_qty=0;
		    	
		    	sheet2.SetCellValue(i, prefix02 + "in_item_ea_qty", snd_qty ,0);
		    	sheet2.SetCellValue(i, prefix02 + "os_item_ea_qty", snd_qty - qty  ,0);
		    	sheet2.SetCellValue(i, prefix02 + "in_item_pe_qty", 1 ,0);
		    	
		    	pkg_lv1_qty=eval(sheet2.GetCellValue(i, prefix02 + "pkg_lv1_qty"));
		    	lv1_cbm=eval(sheet2.GetCellValue(i, prefix02 + "lv1_cbm"));
		    	lv1_cbf=eval(sheet2.GetCellValue(i, prefix02 + "lv1_cbf"));
		    	lv1_grs_kgs=eval(sheet2.GetCellValue(i, prefix02 + "lv1_grs_kgs"));
		    	lv1_grs_lbs=eval(sheet2.GetCellValue(i, prefix02 + "lv1_grs_lbs"));
		    	lv1_net_kgs=eval(sheet2.GetCellValue(i, prefix02 + "lv1_net_kgs"));
		    	lv1_net_lbs=eval(sheet2.GetCellValue(i, prefix02 + "lv1_net_lbs"));
		    	//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (S)
		    	//sheet2.SetCellValue(i,  prefix02 + "item_cbm",Math.round((pkg_lv1_qty * qty) * lv1_cbm * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "item_cbf",Math.round((pkg_lv1_qty * qty) * lv1_cbf * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "item_grs_kgs",Math.round((pkg_lv1_qty * qty) * lv1_grs_kgs * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "item_grs_lbs",Math.round((pkg_lv1_qty * qty) * lv1_grs_lbs * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "item_net_kgs",Math.round((pkg_lv1_qty * qty) * lv1_net_kgs * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "item_net_lbs",Math.round((pkg_lv1_qty * qty) * lv1_net_lbs * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "snd_item_cbm",Math.round((pkg_lv1_qty * snd_qty) * lv1_cbm * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "snd_item_cbf",Math.round((pkg_lv1_qty * snd_qty) * lv1_cbf * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "snd_item_grs_kgs",Math.round((pkg_lv1_qty * snd_qty) * lv1_grs_kgs * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "snd_item_grs_lbs",Math.round((pkg_lv1_qty * snd_qty) * lv1_grs_lbs * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "snd_item_net_kgs",Math.round((pkg_lv1_qty * snd_qty) * lv1_net_kgs * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "snd_item_net_lbs",Math.round((pkg_lv1_qty * snd_qty) * lv1_net_lbs * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "dmg_item_cbm",Math.round((pkg_lv1_qty * dmg_qty) * lv1_cbm * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "dmg_item_cbf",Math.round((pkg_lv1_qty * dmg_qty) * lv1_cbf * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "dmg_item_grs_kgs",Math.round((pkg_lv1_qty * dmg_qty) * lv1_grs_kgs * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "dmg_item_grs_lbs",Math.round((pkg_lv1_qty * dmg_qty) * lv1_grs_lbs * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "dmg_item_net_kgs",Math.round((pkg_lv1_qty * dmg_qty) * lv1_net_kgs * 1000)/1000,0);
		    	//sheet2.SetCellValue(i,  prefix02 + "dmg_item_net_lbs",Math.round((pkg_lv1_qty * dmg_qty) * lv1_net_lbs * 1000)/1000,0);
		    	sheet2.SetCellValue(i, prefix02 + "item_cbm",         parseFloat(pkg_lv1_qty * qty     * lv1_cbm    ).toFixed(WMS_CBM_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "item_cbf",         parseFloat(pkg_lv1_qty * qty     * lv1_cbf    ).toFixed(WMS_CBM_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "item_grs_kgs",     parseFloat(pkg_lv1_qty * qty     * lv1_grs_kgs).toFixed(WMS_WGT_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "item_grs_lbs",     parseFloat(pkg_lv1_qty * qty     * lv1_grs_lbs).toFixed(WMS_WGT_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "item_net_kgs",     parseFloat(pkg_lv1_qty * qty     * lv1_net_kgs).toFixed(WMS_WGT_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "item_net_lbs",     parseFloat(pkg_lv1_qty * qty     * lv1_net_lbs).toFixed(WMS_WGT_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "snd_item_cbm",     parseFloat(pkg_lv1_qty * snd_qty * lv1_cbm    ).toFixed(WMS_CBM_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "snd_item_cbf",     parseFloat(pkg_lv1_qty * snd_qty * lv1_cbf    ).toFixed(WMS_CBM_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "snd_item_grs_kgs", parseFloat(pkg_lv1_qty * snd_qty * lv1_grs_kgs).toFixed(WMS_WGT_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "snd_item_grs_lbs", parseFloat(pkg_lv1_qty * snd_qty * lv1_grs_lbs).toFixed(WMS_WGT_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "snd_item_net_kgs", parseFloat(pkg_lv1_qty * snd_qty * lv1_net_kgs).toFixed(WMS_WGT_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "snd_item_net_lbs", parseFloat(pkg_lv1_qty * snd_qty * lv1_net_lbs).toFixed(WMS_WGT_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "dmg_item_cbm",     parseFloat(pkg_lv1_qty * dmg_qty * lv1_cbm    ).toFixed(WMS_CBM_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "dmg_item_cbf",     parseFloat(pkg_lv1_qty * dmg_qty * lv1_cbf    ).toFixed(WMS_CBM_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "dmg_item_grs_kgs", parseFloat(pkg_lv1_qty * dmg_qty * lv1_grs_kgs).toFixed(WMS_WGT_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "dmg_item_grs_lbs", parseFloat(pkg_lv1_qty * dmg_qty * lv1_grs_lbs).toFixed(WMS_WGT_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "dmg_item_net_kgs", parseFloat(pkg_lv1_qty * dmg_qty * lv1_net_kgs).toFixed(WMS_WGT_POINT_COUNT),0);
		    	sheet2.SetCellValue(i, prefix02 + "dmg_item_net_lbs", parseFloat(pkg_lv1_qty * dmg_qty * lv1_net_lbs).toFixed(WMS_WGT_POINT_COUNT),0);
		    	//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (E)

		    	//임시테스트 */
		    	//console.timeEnd("start for:"+i);
		    }
			
			//테스트 시간
			/*
			var etime = new Date();
			//document.form.rmk.value = document.form.rmk.value + etime + "\n";  
			tt = tt + "end:"+ etime + "\n";
			document.form.rmk.value = tt;
			*/
			sheet2.AllowEvent4CheckAll(1);
		    sheet2.RenderSheet(1);//속도 개선 처리
		
		}catch(e) {
	        if(e == "[object Error]"){
	        	//Unexpected Error occurred. Please contact Help Desk!
	        	alert(getLabel('FMS_COM_ERR002'));
	        	return;
	        } 
	        else{
	        	//System Error! + MSG
	        	alert(getLabel('FMS_COM_ERR001') + " - " + e);
	        	return;
	        }
	    }
		
		return;
	}

	var formObj = document.form;
	sheetObj.InitComboNoMatchText(1, "",1);

//	sheet2.HideSubSum();
	
	// SKU ComboList조회
	//var selRow=sheet1.GetSelectRow();
	var p_ctrt_no = $("#ctrt_no").val();/*sheet1.GetCellValue(selRow, fix_grid01 + "ctrt_no")*/
	var p_wh_cd = $("#wh_cd").val()/*sheet1.GetCellValue(selRow, fix_grid01 + "wh_cd")*/
//	sheet2Row = row;
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');

	if ( sheetObj.RowCount() > 0 ) {
		// Complete인 경우만 오픈
		if (formObj.bk_sts_cd.value == "X") {
			formObj.btn_rating.disabled = false;
			formObj.btn_frtAdd.disabled = false;
		} else {
			formObj.btn_rating.disabled = true;
			formObj.btn_frtAdd.disabled = true;
		}
		
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
		//항상 오픈
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked" - Optionized needed
		if (opt_chk == "Y"){
			formObj.btn_frtAdd.disabled = false;
			formObj.btn_rating.disabled = false;
		}	
	}
	
	sheet2.RenderSheet(0);//속도 개선 처리
	
	var fSubSumRow = "|" + sheetObj.FindSubSumRow() + "|";
	var addCnt = 0;
	var mergeCellRow = sheetObj.HeaderRows();
	var restore_btn_show = false;
	
	//#2717 EMAIL 
	var preItemUom = "start";
	
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(	i <	sheetObj.LastRow()){
	 		sheetObj.CellComboItem(i,fix_grid02+"item_pkgunit",	{ComboText:sheetObj.GetCellValue(i,fix_grid02+"cbmUnitNm"), ComboCode: sheetObj.GetCellValue(i,fix_grid02+"cbmUnitCd")} );
	 		sheetObj.CellComboItem(i,fix_grid02+"snd_pkgunit",	{ComboText:sheetObj.GetCellValue(i,fix_grid02+"cbmUnitNm"), ComboCode: sheetObj.GetCellValue(i,fix_grid02+"cbmUnitCd")} );
	 		sheetObj.CellComboItem(i,fix_grid02+"dmg_pkgunit",	{ComboText:sheetObj.GetCellValue(i,fix_grid02+"cbmUnitNm"), ComboCode: sheetObj.GetCellValue(i,fix_grid02+"cbmUnitCd")} );
	 		sheetObj.CellComboItem(i,fix_grid02+"lot_04",		{ComboText:sheetObj.GetCellValue(i,fix_grid02+"lot_04_cbm_cd"), ComboCode: sheetObj.GetCellValue(i,fix_grid02+"lot_04_cbm_cd")} );
	 		sheetObj.CellComboItem(i,fix_grid02+"lot_05",		{ComboText:sheetObj.GetCellValue(i,fix_grid02+"lot_05_cbm_cd"), ComboCode: sheetObj.GetCellValue(i,fix_grid02+"lot_05_cbm_cd")} );
 		}
		
		if (sheetObj.GetCellValue(i, fix_grid02 + "rcv_sts_cd") == "" && fSubSumRow.indexOf("|" + i + "|") == -1 && i<sheetObj.LastRow()) {
			sheetObj.SetCellValue(i, fix_grid02 + "rcv_sts_cd","S",0);
		}
		if (sheetObj.GetCellValue(i, fix_grid02 + "lic_plat_no") == "" && sheetObj.GetCellValue(i, fix_grid02 + "inbound_dt") == "" && fSubSumRow.indexOf("|" + i + "|") == -1 && i<sheetObj.LastRow() ) {
//			sheetObj.SetCellValue(i, fix_grid02 + "lic_plat_no","AUTO");
			sheetObj.SetCellValue(i, fix_grid02 + "lic_plat_no",""); //"AUTO"에서 Blank로
		}
		//lot_id
 		sheetObj.SetCellBackColor(i, fix_grid02 + "lot_id","#EFF0F3"); //UnEditableColor
 		if(sheetObj.GetCellValue(i, fix_grid02 + "lot_id") != "")
		{
			sheetObj.SetCellEditable(i, fix_grid02 + "lot_id",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "lot_no",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "inbound_dt",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "exp_dt",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "lot_04",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "lot_05",0);
		}
 		if(sheetObj.GetCellValue(i, fix_grid02 + "wib_in_no").trim() != "")
		{
			sheetObj.SetCellEditable(i, fix_grid02 + "inbound_loc_nm",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "dmg_loc_nm",0);
			//sheetObj.CellEditable(i, fix_grid02 + "item_pkgqty") = false;			
			
			sheetObj.SetCellEditable(i, fix_grid02 + "item_pkgqty",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_pkgunit",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "snd_pkgunit",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "dmg_pkgunit",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "rcv_pkgqty",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "dmg_pkgqty",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_cbm",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_cbf",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_grs_kgs",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_grs_lbs",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_net_kgs",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_net_lbs",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_ser_no",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "lic_plat_no",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "rcv_sts_cd",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "po_no",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "chk_rcv_qty_copy",0);
		}	
		else
		{
			if(sheetObj.GetCellValue(i, fix_grid02 + "fix_loc_cd").trim() != "")
			{
				sheetObj.SetCellEditable(i, fix_grid02 + "dmg_pkgunit",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "dmg_pkgqty",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "dmg_loc_nm",0);
			}
		}
 		
 		/* #3721 [J&A WMS] ITEM CODE 수정 못하도록- Booked 상태에서 item 변경 후 Received 동시 처리 시 재고 데이터 정합성 오류 발생 함
 		if (formObj.inbound_dt.value == "") {
 			sheetObj.SetCellEditable(i, fix_grid02 + "item_cd",1);
 			sheetObj.SetCellEditable(i, fix_grid02 + "item_nm",1);
 		} else {
 			sheetObj.SetCellEditable(i, fix_grid02 + "item_cd",0);
 			sheetObj.SetCellEditable(i, fix_grid02 + "item_nm",0);
 		}
 		*/
 		sheetObj.SetCellEditable(i, fix_grid02 + "item_cd",0);
		sheetObj.SetCellEditable(i, fix_grid02 + "item_nm",0);
			
 		/*if(	i <	sheetObj.LastRow()){
 			
 			if(sheetObj.GetCellValue(i, fix_grid02 + "item_cd")!=""){
	 			var sParam="ctrt_no=" + sheetObj.GetCellValue(i, fix_grid02 + "ctrt_no") + "&item_cd=" + sheetObj.GetCellValue(i, fix_grid02 + "item_cd") + "&wh_cd=" + sheetObj.GetCellValue(i, fix_grid02 + "wh_cd");
	 			ajaxSendPost(resultsearchWHItemCodeInfo1, i, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
 			}
 		}*/
 		
 		// Order Qty가 0으로 입력되는 경우도 있기 때문에 Sub total이 0이 되는 경우 존재하므로, Sub total은 merge에서 제외 할것.
		if (i < sheetObj.LastRow()-2) {
			if (sheetObj.GetCellValue(i,fix_grid02+"item_ea_qty") == "0" && fSubSumRow.indexOf("|" + i + "|") == -1) {
				if ( sheetObj.GetCellValue(i,fix_grid02+"item_ea_qty") == "0" && (fSubSumRow.indexOf("|" + (i-1) + "|") > -1 || i==sheetObj.HeaderRows()) ) {
					mergeCellRow = i+1;
					addCnt = 0;
				} else {
					addCnt++;
				}
			} else if ( sheetObj.GetCellValue(i,fix_grid02+"item_ea_qty") != "0" || fSubSumRow.indexOf("|" + i + "|") > -1 ) {
				if (addCnt > 0) {
					sheet2.SetMergeCell(mergeCellRow-1, 7, addCnt+1, 1);
					sheet2.SetMergeCell(mergeCellRow-1, 8, addCnt+1, 1);
				}
				mergeCellRow = i+1;
				addCnt = 0;
			} else {
				addCnt = 0;
			}
			//#2717 EMAIL 
			var  currItemUom = sheetObj.GetCellValue(i,fix_grid02+"item_cd") + "^*^" + sheetObj.GetCellValue(i,fix_grid02+"item_pkgunit");
			if (preItemUom != currItemUom && sheetObj.GetCellValue(i,fix_grid02+"item_ea_qty") == "0" ){
				preItemUom = currItemUom;
				sheet2.SetMergeCell(mergeCellRow, 7, addCnt+1, 1);
				sheet2.SetMergeCell(mergeCellRow, 8, addCnt+1, 1);
				mergeCellRow = i+1;
				addCnt = 0;
			}
		} else if (i == sheetObj.LastRow()-2 && sheetObj.GetCellValue(i,fix_grid02+"item_ea_qty") == "0") {
			// Sub Total과 Total Row를 더해야 함
			if (addCnt > 0) {
				sheet2.SetMergeCell(mergeCellRow-1, 7, addCnt+2, 1);
				sheet2.SetMergeCell(mergeCellRow-1, 8, addCnt+2, 1);
			} else if (sheetObj.GetCellValue(i,fix_grid02+"item_ea_qty") == "0" && fSubSumRow.indexOf("|" + i + "|") == -1) {
				if(mergeCellRow != i) {
					sheet2.SetMergeCell(mergeCellRow-1, 7, addCnt+2, 1);
					sheet2.SetMergeCell(mergeCellRow-1, 8, addCnt+2, 1);
				}
			}
		}

		if($("#bk_sts_cd").val() == "X"){
			sheetObj.SetCellEditable(i, fix_grid02 + "eq_tpsz_cd",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "eq_no",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "seal_no",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "seal_img",0);
		}else{
			sheetObj.SetCellEditable(i, fix_grid02 + "eq_tpsz_cd",1);
			sheetObj.SetCellEditable(i, fix_grid02 + "eq_no",1);
			sheetObj.SetCellEditable(i, fix_grid02 + "seal_no",1);
			sheetObj.SetCellEditable(i, fix_grid02 + "seal_img",1);
		}
		// #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882)
		// Status가 Booked이고, 한건이라도 Serial No. 가 존재하는 경우 Restore Button show
		if ( $("#bk_sts_cd").val() == "I" &&
				(!ComIsNull(sheetObj.GetCellValue(i, fix_grid02 + "item_ser_no")) || !ComIsNull(sheetObj.GetCellValue(i, fix_grid02 + "lic_plat_no")))) {
			restore_btn_show = true;
		}
	}
	// #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882)
	// Serial No. 가 존재하는 경우 Restore Button show
	if (restore_btn_show) {
		$("#btn_restore").show();
	} else {
		$("#btn_restore").hide();
	}
	
	//Total
	sheetObj.SetSumValue(fix_grid02 + "item_nm", "TOTAL");
	// Sub Total
//	sheetObj.ShowSubSum([{StdCol:fix_grid02+"item_sys_no", SumCols:fix_grid02+"item_pkgqty|" + fix_grid02+"item_ea_qty|" + fix_grid02+"in_item_ea_qty|" + fix_grid02+"os_item_ea_qty|" + fix_grid02+"in_item_pe_qty|" + fix_grid02+"rcv_pkgqty|" + fix_grid02+"snd_ea_qty|" 
//		+ fix_grid02+"dmg_pkgqty|" + fix_grid02+"dmg_ea_qty|" + fix_grid02+"item_cbm|" + fix_grid02+"item_cbf|" + fix_grid02+"item_grs_kgs|" + fix_grid02+"item_grs_lbs|" + fix_grid02+"item_net_kgs|" + fix_grid02+"item_net_lbs|" + fix_grid02+"unit_price"
//		, ShowCumulate:0, CaptionCol:fix_grid02+"item_nm", CaptionText: "Sub Total"}]);

	setTimeout(function(){ sheet2_btn_hide(); }, 500);
	doHideProcess(false);
	
	sheet2.RenderSheet(1);//속도 개선 처리
	//console.timeEnd("sheet2_OnSearchEnd")
}
function sheet2_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	var sUrl="";
	with(sheetObj)
	{
		if(colName == fix_grid02 + "item_cd")
		{
		   	var sUrl="./CtrtItemPopup.clt?ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02 + "ctrt_no")
												    +"&item_cd="/*+ sheetObj.GetCellValue(Row, Col)*/
													+"&wh_cd=" +  sheetObj.GetCellValue(Row, fix_grid02 + "wh_cd");
		   	callBackFunc = "setItemGrid";
			modal_center_open(sUrl, callBackFunc, 400, 520,"yes");
		}	
		else if(colName == fix_grid02 + "item_pkgunit")
		{
			if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
			{
				ComShowCodeMessage("COM0114","Item");
				sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
				return;
			}
			var sUrl="./CommonCodePopup.clt?grp_cd=A6&code="+sheetObj.GetCellValue(Row, Col)
			                            + "&wh_flag=Y" 
			                            + "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no")
			                            + "&item_sys_no=" + sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no");
			callBackFunc = "setPkgunitGrid";
			modal_center_open(sUrl, callBackFunc, 400, 520,"yes");
			
		}	
		else if(colName == fix_grid02 + "snd_pkgunit")
		{
			if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
			{
				ComShowCodeMessage("COM0114","Item");
				sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
				return;
			}
			var sUrl="./CommonCodePopup.clt?grp_cd=A6&code="+sheetObj.GetCellValue(Row, Col)
            + "&wh_flag=Y" 
            + "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no")
            + "&item_sys_no=" + sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no");
			callBackFunc = "setPkgunitGrid_snd_pkgunit";
			modal_center_open(sUrl, callBackFunc, 400, 520,"yes");	
		}
		else if(colName == fix_grid02 + "dmg_pkgunit")
		{
			if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
			{
				ComShowCodeMessage("COM0114","Item");
				sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
				return;
			}
			var sUrl="./CommonCodePopup.clt?grp_cd=A6&code="+sheetObj.GetCellValue(Row, Col)
            + "&wh_flag=Y" 
            + "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no")
            + "&item_sys_no=" + sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no");
			callBackFunc = "setPkgunitGrid_dmg_pkgunit";
			modal_center_open(sUrl, callBackFunc, 400, 520,"yes");		
		}
		else if(colName == fix_grid02 + "item_pkgunit")
		{
			if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
			{
				ComShowCodeMessage("COM0114","Item");
				sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
				return;
			}
			var sUrl="CommonCodePopup.do?grp_cd=A6&code="+sheetObj.GetCellValue(Row, Col)
			                            + "&wh_flag=Y" 
			                            + "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no")
			                            + "&item_sys_no=" + sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no");
			ComOpenPopup(sUrl, 400, 560, "setPkgunitGrid", "0,0", true, sheetObj, Row, Col);	
		}	
		else if ( colName == fix_grid02 + "inbound_loc_nm" ) 
		{
			var sUrl="./WarehouseLocPopup.clt?f_loc_cd="+ sheetObj.GetCellValue(Row, fix_grid02+"wh_cd")
			                             + "&f_putaway_flg=Y&f_move_flg=Y&f_not_loc_prop=DMG";			
			if(sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd").trim() != "")
			{
				sUrl=sUrl + "&f_fix_wh_loc_nm=" + sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd_nm");
			}
			callBackFunc = "setInboundLocInfoGrid";
			modal_center_open(sUrl, '', 700, 500,"yes");
		}
		else if ( colName == fix_grid02 + "dmg_loc_nm" ) 
		{
			var sUrl="./WarehouseLocPopup.clt?f_loc_cd="+ sheetObj.GetCellValue(Row, fix_grid02+"wh_cd")
			                             + "&f_putaway_flg=Y&f_move_flg=Y&f_loc_prop=DMG";			
			callBackFunc = "setDamageLocInfoGrid";
			modal_center_open(sUrl, '', 700, 500,"yes");
		}
		else if (colName == fix_grid02 + "lot_id")
		{
			if(sheetObj.GetCellValue(Row, fix_grid02 + "lot_id").trim() == "" )
			{
				if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
				{
					ComShowCodeMessage("COM0114","Item");
					sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
					return;
				}
				var sParam="wh_cd=" + sheetObj.GetCellValue(Row, fix_grid02+"wh_cd");
				sParam += "&wh_nm=" + sheetObj.GetCellValue(Row, fix_grid02+"wh_nm");
				sParam += "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no");
				sParam += "&ctrt_nm=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_nm");
				sParam += "&item_cd=" + encodeURIComponent(sheetObj.GetCellValue(Row, fix_grid02+"item_cd"));
				sParam += "&fix_lot_id=" + sheetObj.GetCellValue(Row, Col);
				sParam += "&inbound_dt=" + sheetObj.GetCellValue(Row, fix_grid02+"inbound_dt");
			   	
				callBackFunc = "setLotInfoGrid";
			   	var sUrl="./WHInLotSelectPopup.clt?" + sParam;
				modal_center_open(sUrl, callBackFunc, 1050, 500,"yes");
			}
			else
			{
				sheetObj.SetCellValue(Row, fix_grid02 + "lot_id","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "inbound_dt","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "lot_no","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "lot_id","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "exp_dt","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "lot_04","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "lot_05","",0);
				sheetObj.SetCellEditable(Row, fix_grid02 + "inbound_dt",1);
				sheetObj.SetCellEditable(Row, fix_grid02 + "lot_no",1);
				sheetObj.SetCellEditable(Row, fix_grid02 + "exp_dt",1);
				sheetObj.SetCellEditable(Row, fix_grid02 + "lot_04",1);
				sheetObj.SetCellEditable(Row, fix_grid02 + "lot_05",1)
 				sheetObj.PopupButtonImage(Row, fix_grid02 + "lot_id")=0;
			}
		}else if (colName == fix_grid02 + "curr_cd"){
			
			var sUrl="CommonCodePopup.do?grp_cd=A5&code="+sheetObj.GetCellValue(Row, Col);
			ComOpenPopup(sUrl, 400, 560, "setCurrCdGrid", "0,0", true, sheetObj, Row, Col);
		}else if ( colName == fix_grid02 + "eq_tpsz_cd" ) {
			
			var eq_tp_cd=sheetObj.GetCellValue(Row, (fix_grid02+"eq_tp_cd"));
			var code="A";
			if (!ComIsNull(eq_tp_cd)) {
				code=eq_tp_cd;
			}
			sUrl="./ContainerTypePopup.clt?type="+code+"&eq_unit="+"";
			callBackFunc = "setIbContainerTypeInfo";
			modal_center_open(sUrl, callBackFunc, 400, 590,"yes");
		}
	}
}
function setIbContainerTypeInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var sheetObj=sheet2;
	var prefix= fix_grid02;
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"eq_tpsz_cd",rtnValArr[0]);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"eq_tp_cd",rtnValArr[2]);
		 }
}
function sheet2_OnChange(sheetObj, Row, Col, Value) {
	var formObj=document.form; 
	var colStr=sheetObj.ColSaveName(Col);
	var sUrl="";
	
	var vItem_cd = sheetObj.GetCellValue(Row, fix_grid02+"item_cd");
	
	if(colStr == fix_grid02 + "item_cd" || colStr == fix_grid02 + "item_cd_dummy")
	{
		if(Value != "")
		{
			var sParam="ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02 + "ctrt_no") + "&item_cd=" + encodeURIComponent(Value) + "&wh_cd=" + sheetObj.GetCellValue(Row, fix_grid02 + "wh_cd");
			ajaxSendPost(resultsearchWHItemCodeInfo, Row, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
			resetLotInfo(sheetObj, Row);	
			settring_ea_qty(sheetObj, Row, sheet2.GetCellValue(Row, fix_grid02 + 'item_cd'), "", colStr);
//			fn_addRowFrLimitCnt(colStr, sheetObj.GetCellValue(Row, fix_grid02+"snd_ea_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv3_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "lic_plat_no"));
			
			if (sheetObj.GetCellValue(Row, fix_grid02 + 'item_sys_no') == "") {	
				if(sheetObj.GetCellValue(Row, fix_grid02+"invalid_yn") == "Y" && sheetObj.GetCellValue(Row, fix_grid02+"su_valid_yn") != "Y")
				{
					//valid 체크 성공 flag 변경(su_valid_yn = 'Y'로)
					sheetObj.SetCellValue(Row, fix_grid02+"su_valid_yn",'Y',0);
				}
			}

			/* #2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (S) */
			var arrItemInfo = [];
			for(var i=0; i<skuSerialChkInfo.length; i++) {
				arrItemInfo  = skuSerialChkInfo[i].split('|');
				if(arrItemInfo[0] == Value) {
					sheetObj.SetCellValue(Row, fix_grid02+"use_serial_flag", arrItemInfo[1]);
					sheetObj.SetCellValue(Row, fix_grid02+"serial_req_flag", arrItemInfo[2]);
					sheetObj.SetCellValue(Row, fix_grid02+"serial_uniq_flag", arrItemInfo[3]);
				}
			}
			/* #2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (E) */

			// License Plate No Combo List
			var sLicPlateNo = "|";
			if (sheetObj.GetCellValue(Row, fix_grid02 + "item_cd").trim() != "") {
				for(var i=0; i<=sheetObj.LastRow();i++){
			 		if(sheetObj.GetCellValue(Row, fix_grid02 + "item_cd") == sheetObj.GetCellValue(i, fix_grid02 + "item_cd"))
					{
			 			if (sheetObj.GetCellValue(i, fix_grid02 + "lic_plat_no") != "" && sheetObj.GetCellValue(i, fix_grid02 + "lic_plat_no") != "AUTO") {
			 				sLicPlateNo += sheetObj.GetCellValue(i, fix_grid02 + "lic_plat_no") + "|";
			 			}
					}
				}
			}
			sLicPlateNo = "|AUTO" + sLicPlateNo;
			for(var i=0; i<=sheetObj.LastRow();i++){
		 		if(sheetObj.GetCellValue(Row, fix_grid02 + "item_cd") == sheetObj.GetCellValue(i, fix_grid02 + "item_cd"))
				{
		 			sheet2.CellComboItem(i,fix_grid02+"lic_plat_no",{ComboText:sLicPlateNo.substr(0,sLicPlateNo.length-1), ComboCode:sLicPlateNo.substr(0,sLicPlateNo.length-1)} );
				}
			}
			sheetObj.SetCellValue(Row, fix_grid02 + "lic_plat_no",""); //"AUTO"에서 Blank로
		}
		else
		{
			resetLotInfo(sheetObj, Row);
			settring_ea_qty(sheetObj, Row, "", "", "");			
		}
	}
	else if(colStr == fix_grid02 + "item_pkgunit")
	{
		if(Value != "")
		{
			var sParam="ctrt_no="+sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no")
						+"&item_cd="+encodeURIComponent(sheetObj.GetCellValue(Row, fix_grid02 + "item_cd"));
			//ajaxSendPost(result_sheet3_OnChange1, Row, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
			settring_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02+"item_cd"), "item_pkgunit", "");
		}
		else
		{
			settring_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02+"item_cd"), "", "");
		}
	}
	// Status (Sound/Damage)
	else if(colStr == fix_grid02 + "rcv_sts_cd")
	{
		// Sound 선택
		if(Value == "S")
		{
			
			sheetObj.SetCellEditable(Row,fix_grid02+"dmg_pkgunit",0);
			sheetObj.SetCellEditable(Row,fix_grid02+"dmg_pkgqty",0);
//			sheetObj.SetCellEditable(Row,fix_grid02+"dmg_ea_qty",0);
			sheetObj.SetCellEditable(Row,fix_grid02+"dmg_loc_nm",0);
			sheetObj.SetCellEditable(Row,fix_grid02+"snd_pkgunit",1);
			sheetObj.SetCellEditable(Row,fix_grid02+"rcv_pkgqty",1);
//			sheetObj.SetCellEditable(Row,fix_grid02+"snd_ea_qty",1);
			sheetObj.SetCellEditable(Row,fix_grid02+"inbound_loc_nm",1);
			
			if (sheetObj.GetCellValue(Row, fix_grid02+"dmg_pkgunit") != "") {
				sheetObj.SetCellValue(Row, fix_grid02+"snd_pkgunit", sheetObj.GetCellValue(Row, fix_grid02+"dmg_pkgunit"));
				sheetObj.SetCellValue(Row, fix_grid02+"rcv_pkgqty", sheetObj.GetCellValue(Row, fix_grid02+"dmg_pkgqty"));
				sheetObj.SetCellValue(Row, fix_grid02+"snd_ea_qty", sheetObj.GetCellValue(Row, fix_grid02+"dmg_ea_qty"));
//				sheetObj.SetCellValue(Row, fix_grid02+"inbound_loc_nm", sheetObj.GetCellValue(Row, fix_grid02+"dmg_loc_nm"));
				
				sheetObj.SetCellValue(Row, fix_grid02+"dmg_pkgunit", "");
				sheetObj.SetCellValue(Row, fix_grid02+"dmg_pkgqty", "");
				sheetObj.SetCellValue(Row, fix_grid02+"dmg_ea_qty", "");
				sheetObj.SetCellValue(Row, fix_grid02+"dmg_loc_nm", "");
				
				settring_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02+"item_cd"), "snd_pkgunit", "");
			}
		}
		// Damage선택
		if(Value == "D")
		{
			sheetObj.SetCellEditable(Row,fix_grid02+"dmg_pkgunit",1);
			sheetObj.SetCellEditable(Row,fix_grid02+"dmg_pkgqty",1);
//			sheetObj.SetCellEditable(Row,fix_grid02+"dmg_ea_qty",1);
			sheetObj.SetCellEditable(Row,fix_grid02+"dmg_loc_nm",1);
			sheetObj.SetCellEditable(Row,fix_grid02+"snd_pkgunit",0);
			sheetObj.SetCellEditable(Row,fix_grid02+"rcv_pkgqty",0);
//			sheetObj.SetCellEditable(Row,fix_grid02+"snd_ea_qty",0);
			sheetObj.SetCellEditable(Row,fix_grid02+"inbound_loc_nm",0);
			
			if (sheetObj.GetCellValue(Row, fix_grid02+"snd_pkgunit") != "") {
				sheetObj.SetCellValue(Row, fix_grid02+"dmg_pkgunit", sheetObj.GetCellValue(Row, fix_grid02+"snd_pkgunit"));
				sheetObj.SetCellValue(Row, fix_grid02+"dmg_pkgqty", sheetObj.GetCellValue(Row, fix_grid02+"rcv_pkgqty"));
				sheetObj.SetCellValue(Row, fix_grid02+"dmg_ea_qty", sheetObj.GetCellValue(Row, fix_grid02+"snd_ea_qty"));
//				sheetObj.SetCellValue(Row, fix_grid02+"dmg_loc_nm", sheetObj.GetCellValue(Row, fix_grid02+"inbound_loc_nm"));
				
				sheetObj.SetCellValue(Row, fix_grid02+"snd_pkgunit", "");
				sheetObj.SetCellValue(Row, fix_grid02+"rcv_pkgqty", "");
				sheetObj.SetCellValue(Row, fix_grid02+"snd_ea_qty", "");
				sheetObj.SetCellValue(Row, fix_grid02+"inbound_loc_nm", "");
				
				settring_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02+"item_cd"), "dmg_pkgunit", "");
			}
		}
		else
		{
			settring_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02+"item_cd"), "", "");
		}
		//fn_addRowFrLimitCnt(colStr, sheetObj.GetCellValue(Row, fix_grid02+"snd_ea_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv3_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "lic_plat_no"));
	}
	// Sound Check box
	else if(colStr == fix_grid02 + "chk_rcv_qty_copy")
	{
		if(Value == "1")
		{
			// Status가 Sound인 경우
			if (sheetObj.GetCellValue(Row, fix_grid02 + "rcv_sts_cd") == "S") {
				sheetObj.SetCellValue(Row, fix_grid02+"snd_pkgunit", sheetObj.GetCellValue(Row, fix_grid02+"item_pkgunit"));
				sheetObj.SetCellValue(Row, fix_grid02+"rcv_pkgqty", sheetObj.GetCellValue(Row, fix_grid02+"item_pkgqty"));
				
			// Status가 Damage인 경우
			} else {
				sheetObj.SetCellValue(Row, fix_grid02+"dmg_pkgunit", sheetObj.GetCellValue(Row, fix_grid02+"item_pkgunit"));
				sheetObj.SetCellValue(Row, fix_grid02+"dmg_pkgqty", sheetObj.GetCellValue(Row, fix_grid02+"item_pkgqty"));
			}
//			fn_addRowFrLimitCnt(colStr, sheetObj.GetCellValue(Row, fix_grid02+"snd_ea_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv3_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "lic_plat_no"));
		}
		else
		{
			if(sheetObj.GetCellValue(Row, fix_grid02 + "item_cd") != ""){
				// Status가 Sound인 경우
				if (sheetObj.GetCellValue(Row, fix_grid02 + "rcv_sts_cd") == "S") {
					sheetObj.SetCellValue(Row, fix_grid02+"snd_pkgunit", "");
					sheetObj.SetCellValue(Row, fix_grid02+"rcv_pkgqty", "");
					if (sheetObj.GetCellValue(Row, fix_grid02 + "lic_plat_no") == "AUTO") {
						sheetObj.SetCellValue(Row, fix_grid02+"lic_plat_no", "");
					}
					// Statue가  Damage인 경우  
				} else {
					sheetObj.SetCellValue(Row, fix_grid02+"dmg_pkgunit", "");
					sheetObj.SetCellValue(Row, fix_grid02+"dmg_pkgqty", "");
				}
			}
		}
	}
	else if(colStr == fix_grid02 + "snd_pkgunit")
	{
		if(Value != "")
		{
			settring_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02+"item_cd"), "snd_pkgunit", "");
		}
		else
		{
			settring_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02+"item_cd"), "", "");
		}
		
		//fn_addRowFrLimitCnt(colStr, sheetObj.GetCellValue(Row, fix_grid02+"snd_ea_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv3_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "lic_plat_no"));
	}
	else if(colStr == fix_grid02 + "dmg_pkgunit")
	{
		if(Value != "")
		{
			settring_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02+"item_cd"), "dmg_pkgunit", "");
		}
		else
		{
			settring_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02+"item_cd"), "", "");
		}
	}
	else if(colStr == fix_grid02 + "inbound_loc_nm") 
	{
		if(Value != "")
		{
			var sParam="f_loc_cd=" + sheetObj.GetCellValue(Row, fix_grid02 + "wh_cd") + "&f_wh_loc_nm=" + Value + "&f_putaway_flg=Y&f_move_flg=Y&f_not_loc_prop=DMG&f_cmd="+COMMAND01;
			if(sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd").trim() != "")
			{
				sParam=sParam + "&f_fix_wh_loc_nm=" + sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd_nm");
			}
			
			//#2204 [WMS4.0] Inboud 입고시 Received  Location 지정 해서 Received 시 지정 Location 으로 입고 되지 않음
			var sXml=docObjects[0].GetSearchData("searchWarehouseLocInfoForName.clt?"+sParam);
			//#1675 Contract item entry fixed location 지정 관련 요청 
			var xmlObj = getXmlObject(sXml);
			if (xmlObj.innerHTML ==""){
				sheetObj.SetCellValue(Row, fix_grid02 + "inbound_loc_cd","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "inbound_loc_nm","",0);
				sheetObj.SelectCell(Row,  Col);
			}else{
				sheetObj.SetCellValue(Row,  Col,getXmlDataNullToNullStringNew(sXml,'wh_loc_nm'),0);
				sheetObj.SetCellValue(Row,  fix_grid02+"inbound_loc_cd",getXmlDataNullToNullStringNew(sXml,'wh_loc_cd'),0);
				if(getXmlDataNullToNullStringNew(sXml,'wh_loc_cd')==""){
					ComShowCodeMessage("COM0278","Sound Location");
					sheetObj.SelectCell(Row,  Col);
				}
			}
			
		}
		else
		{
			sheetObj.SetCellValue(Row,  fix_grid02+"inbound_loc_cd","",0);
		}
	}	
	else if(colStr == fix_grid02 + "dmg_loc_nm") 
	{
		if(Value != "")
		{
			var sParam="f_loc_cd=" + sheetObj.GetCellValue(Row, fix_grid02 + "wh_cd") + "&f_wh_loc_nm=" + Value + "&f_putaway_flg=Y&f_move_flg=Y&f_prop_cd=DMG&f_cmd="+COMMAND01;
			var sXml=docObjects[0].GetSearchData("searchWarehouseLocInfoForName.clt?"+sParam);
			sheetObj.SetCellValue(Row,  Col,getXmlDataNullToNullString(sXml,'wh_loc_nm'),0);
			sheetObj.SetCellValue(Row,  fix_grid02+"dmg_loc_cd",getXmlDataNullToNullString(sXml,'wh_loc_cd'),0);
			if(getXmlDataNullToNullString(sXml,'wh_loc_cd')==""){
				ComShowCodeMessage("COM0278","Damage Location");
				sheetObj.SelectCell(Row,  Col);
			}
		}
		else
		{
			sheetObj.SetCellValue(Row,  fix_grid02+"inbound_loc_cd","",0);
		}
	}
	else if(colStr == fix_grid02 + "curr_cd")
	{
		sUrl="grp_cd=A5&code_cd=" + Value;
		if(Value != "")
		{
			$.ajax({
					url : "searchCommonCodeInfo.do?grp_cd=A5&code_cd=" + Value,
					success : function(result) 
					{
						sheetObj.SetCellValue(Row, Col,getXmlDataNullToNullString(result.xml,'code_cd'),0);
						if(getXmlDataNullToNullString(result.xml,'exception_msg')!="")
						{
							alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
							sheetObj.SelectCell(Row, Col);
						}
					}
				});	
		}
	}
	else if (colStr == (fix_grid02+"item_cbf") && Value != "") 
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("CBF_CBM", (fix_grid02+"item_cbf"), (fix_grid02+"item_cbm"), sheetObj);
		unitConvertGrid("CBF_CBM", (fix_grid02+"item_cbf"), (fix_grid02+"item_cbm"), sheetObj);
		inboundSummary(sheetObj, sheetObj.SaveNameCol(fix_grid02+"item_cbm"), "inbound_cbm", "float");
	} 
	else if (colStr == (fix_grid02+"item_grs_lbs") && Value != "") 
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("LB_KG", (fix_grid02+"item_grs_lbs"), (fix_grid02+"item_grs_kgs"), sheetObj);
		unitConvertGrid("LB_KG", (fix_grid02+"item_grs_lbs"), (fix_grid02+"item_grs_kgs"), sheetObj);
		inboundSummary(sheetObj, sheetObj.SaveNameCol(fix_grid02+"item_grs_kgs") , "inbound_grs_kgs", "float");
	}
	else if (colStr == (fix_grid02+"item_net_lbs") && Value != "") 
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("LB_KG", (fix_grid02+"item_net_lbs"), (fix_grid02+"item_net_kgs"), sheetObj);
		unitConvertGrid("LB_KG", (fix_grid02+"item_net_lbs"), (fix_grid02+"item_net_kgs"), sheetObj);
		inboundSummary(sheetObj, sheetObj.SaveNameCol(fix_grid02+"item_net_kgs") , "inbound_net_kgs", "float");
	}
	else if(colStr == fix_grid02 + "item_pkgqty" || colStr == fix_grid02 + "rcv_pkgqty" || colStr == fix_grid02 + "dmg_pkgqty")
	{
		var qty=Value;
		//음수체크
		if(Value < 0)
		{
			qty=Math.abs(Value);
			sheetObj.SetCellValue(Row, Col,qty,0);
		}
		settring_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02+"item_cd"), "", "");
		
		if (colStr == fix_grid02 + "rcv_pkgqty") {
//			fn_addRowFrLimitCnt(colStr, sheetObj.GetCellValue(Row, fix_grid02+"snd_ea_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv3_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "lic_plat_no"));
		}
		
	}
	else if (colStr == fix_grid02+"item_cbm") 
	{
		inboundSummary(sheetObj, Col, "inbound_cbm", "float");
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("CBM_CBF", (fix_grid02+"item_cbm"), (fix_grid02+"item_cbf"), sheetObj);
		unitConvertGrid("CBM_CBF", (fix_grid02+"item_cbm"), (fix_grid02+"item_cbf"), sheetObj);
	} 
	else if (colStr == fix_grid02+"item_grs_kgs") 
	{
		inboundSummary(sheetObj, Col, "inbound_grs_kgs", "float");
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("KG_LB", (fix_grid02+"item_grs_kgs"), (fix_grid02+"item_grs_lbs"), sheetObj);
		unitConvertGrid("KG_LB", (fix_grid02+"item_grs_kgs"), (fix_grid02+"item_grs_lbs"), sheetObj);
	} 
	else if (colStr == fix_grid02+"item_net_kgs") 
	{
		inboundSummary(sheetObj, Col, "inbound_net_kgs", "float");
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("KG_LB", (fix_grid02+"item_net_kgs"), (fix_grid02+"item_net_lbs"), sheetObj);
		unitConvertGrid("KG_LB", (fix_grid02+"item_net_kgs"), (fix_grid02+"item_net_lbs"), sheetObj);
	} 
	else if(colStr == fix_grid02 + "in_item_ea_qty")
	{
		inboundSummary(sheetObj, Col, "inbound_ea_qty", "int");
	}
	else if(colStr == fix_grid02 + "in_item_pe_qty")
	{
		inboundSummary(sheetObj, Col, "inbound_pl_qty", "int");
	}
	else if(colStr == fix_grid02 + "inbound_dt")
	{
		//estimated ea 환산
		var est_qty=calc_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02 + "item_pkgunit"), sheetObj.GetCellValue(Row, fix_grid02 + "item_pkgqty"));
		//received ea 환산
		var rcv_qty=calc_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02 + "snd_pkgunit"), sheetObj.GetCellValue(Row, fix_grid02 + "rcv_pkgqty"))+
		calc_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02 + "dmg_pkgunit"), sheetObj.GetCellValue(Row, fix_grid02 + "dmg_pkgqty"));
		//OS
		if(rcv_qty > 0 || (sheetObj.GetCellValue(Row, fix_grid02 + "bk_sts_cd") == "X" && sheetObj.GetCellValue(Row, fix_grid02 + "inbound_dt").trim() != ""))
		{
			var os=rcv_qty - est_qty;
			sheetObj.SetCellValue(Row, fix_grid02 + "os_item_ea_qty",os,0);
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid02 + "os_item_ea_qty",0,0);
		}
	}
	else if(colStr == fix_grid02 + "lic_plat_no")
	{
		if (sheetObj.GetCellValue(Row, fix_grid02 + "lic_plat_no") == "AUTO") {
			// Status가 Sound인 경우
			if (sheetObj.GetCellValue(Row, fix_grid02 + "rcv_sts_cd") == "S" || sheetObj.GetCellValue(Row, fix_grid02 + "rcv_sts_cd") == "") {
				fn_addRowFrLimitCnt(colStr, sheetObj.GetCellValue(Row, fix_grid02+"snd_ea_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv3_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "lic_plat_no"));
			// Status가 Damage인 경우
			} else {
				fn_addRowDmgFrLimitCnt(colStr, sheetObj.GetCellValue(Row, fix_grid02+"dmg_ea_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv3_qty"), sheetObj.GetCellValue(Row, fix_grid02 + "lic_plat_no"));
			}
		} else {
			// License Plate No Combo List
			var sLicPlateNo = "|";
			if (sheetObj.GetCellValue(Row, fix_grid02 + "item_cd").trim() != "") {
				for(var i=0; i<=sheetObj.LastRow();i++){
			 		if(sheetObj.GetCellValue(Row, fix_grid02 + "item_cd") == sheetObj.GetCellValue(i, fix_grid02 + "item_cd"))
					{
			 			if (sheetObj.GetCellValue(i, fix_grid02 + "lic_plat_no") != "" && sheetObj.GetCellValue(i, fix_grid02 + "lic_plat_no") != "AUTO") {
			 				sLicPlateNo += sheetObj.GetCellValue(i, fix_grid02 + "lic_plat_no") + "|";
			 			}
					}	
				}
			}
			sLicPlateNo = "|AUTO" + sLicPlateNo;
			for(var i=0; i<=sheetObj.LastRow();i++){
		 		if(sheetObj.GetCellValue(Row, fix_grid02 + "item_cd") == sheetObj.GetCellValue(i, fix_grid02 + "item_cd"))
				{
		 			sheet2.CellComboItem(i,fix_grid02+"lic_plat_no",{ComboText:sLicPlateNo.substr(0,sLicPlateNo.length-1), ComboCode:sLicPlateNo.substr(0,sLicPlateNo.length-1)} );
				}
			}
//			sheetObj.SetCellValue(Row, fix_grid02 + "lic_plat_no","AUTO");
//			sheetObj.SetCellValue(Row, fix_grid02 + "lic_plat_no","");	//"AUTO"에서 Blank로
		}
	}else if (colStr == (fix_grid02 + "eq_tpsz_cd") && Value != "") {
		
		var sParam="cntr_tp="+Value;
		ajaxSendPost(result_eq_tpsz_cd_sheet2, sheetObj, '&goWhere=aj&bcKey=searchCntrTrTp&'+sParam, './GateServlet.gsl');
	// #1417 [WMS4.0] PROPERTY ADDDED DURING IN/OUTBOUND TO ITEM ENTRY
	//  manually추가를 한다면, Item Default에도 추가를 원하는지 system 에서 물어봐주고, yes하면 Item Default Lot4 또는 Lot5 Property 에 추가 저장
	// Lot 04
	}else if (colStr == (fix_grid02 + "lot_04") && Value != "") {

		var sLot04 = sheetObj.GetCellValue(Row,fix_grid02+"lot_04");
		// #2061 [WMS4.0]Inbound/Outbound LOT4,LOT5 직접 입력 시 Validation 확인
		var sLot04Text =  "|" + sheetObj.GetCellValue(Row,fix_grid02+"lot_04_cbm_cd") + "|";
		// COMBO LIST에 값이 없는 새로운 코드 값만 적용
		// SKU가 존재하는 경우 에만 적용
		var sItemCd = sheetObj.GetCellValue(Row, fix_grid02+"item_cd");
		if (!ComIsNull(sItemCd) && sLot04Text.indexOf("|" + sLot04 + "|") == -1) {
			if(ComShowCodeConfirm("COM0783", "LOT 04", "\"" + sLot04 + "\"") == false){
				return;
			} else {
				var user_id = formObj.user_id.value;
				var ctrt_no = sheetObj.GetCellValue(Row,fix_grid02+"ctrt_no");
				var item_sys_no = sheetObj.GetCellValue(Row,fix_grid02+"item_sys_no"); 
				var lot_tp = "Lot4";
				ajaxSendPost(saveItemLotPropertyAjaxReq, 'reqVal', '&goWhere=aj&bcKey=saveItemLotProperty&lot_cd='+sLot04+'&item_sys_no='+item_sys_no + '&ctrt_no='+ctrt_no + '&user_id=' + user_id + '&lot_tp=' + lot_tp, './GateServlet.gsl');
			}
		}
	// Lot 05
	}else if (colStr == (fix_grid02 + "lot_05") && Value != "") {
		
		var sLot05 = sheetObj.GetCellValue(Row,fix_grid02+"lot_05");
		// #2061 [WMS4.0]Inbound/Outbound LOT4,LOT5 직접 입력 시 Validation 확인
		var sLot05Text =  "|" + sheetObj.GetCellValue(Row,fix_grid02+"lot_05_cbm_cd") + "|";
		// COMBO LIST에 값이 없는 새로운 코드 값만 적용
		// SKU가 존재하는 경우에만 적용
		var sItemCd = sheetObj.GetCellValue(Row, fix_grid02+"item_cd");
		if (!ComIsNull(sItemCd) && sLot05Text.indexOf("|" + sLot05 + "|") == -1) {
			if(ComShowCodeConfirm("COM0783", "LOT 05", "\"" + sLot05 + "\"") == false){
				return;
			} else {
				var user_id = formObj.user_id.value;
				var ctrt_no = sheetObj.GetCellValue(Row,fix_grid02+"ctrt_no");
				var item_sys_no = sheetObj.GetCellValue(Row,fix_grid02+"item_sys_no"); 
				var lot_tp = "Lot5";
				ajaxSendPost(saveItemLotPropertyAjaxReq, 'reqVal', '&goWhere=aj&bcKey=saveItemLotProperty&lot_cd='+sLot05+'&item_sys_no='+item_sys_no + '&ctrt_no='+ctrt_no + '&user_id=' + user_id + '&lot_tp=' + lot_tp , './GateServlet.gsl');
			}
		}
	}
}

function saveItemLotPropertyAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form; 
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

function result_eq_tpsz_cd_sheet2(reqVal, sheetObj) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 var Row = sheetObj.GetSelectRow();
	 var Col = sheetObj.GetSelectCol();
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   var prefix= fix_grid02;
		   sheetObj.SetCellValue(Row,  prefix+"eq_tp_cd",rtnArr[0],0);
		   sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",rtnArr[2]);
	   }
	   else{
		   sheetObj.SetCellValue(Row,  prefix+"eq_tp_cd",'',0);
		   sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",'');
	   }
	  }
	 }else {
		 sheetObj.SetCellValue(Row,  prefix+"eq_tp_cd",'',0);
		 sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",'');
	}
}
function resultsearchWHItemCodeInfo1 (reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 var sheetObj = sheet2;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   var prefix= fix_grid02;
	   if(rtnArr[0] != ""){
		    
			// SKU의 Handling Unit을 Default로 설정
			sheet2.CellComboItem(Row,prefix+"item_pkgunit",	{ComboText:rtnArr[29], ComboCode: rtnArr[28]} );
			sheet2.CellComboItem(Row,prefix+"snd_pkgunit",	{ComboText:rtnArr[29], ComboCode: rtnArr[28]} );
			sheet2.CellComboItem(Row,prefix+"dmg_pkgunit",	{ComboText:rtnArr[29], ComboCode: rtnArr[28]} );
	   }
	   else{

	   }
	  }
	 }
}
function resultsearchWHItemCodeInfo (reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 var sheetObj = sheet2;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   var prefix= fix_grid02;
	   if(rtnArr[0] != ""){
		    sheetObj.SetCellValue(Row, prefix+"item_sys_no",rtnArr[0],0);
			sheetObj.SetCellValue(Row, prefix+"item_nm",rtnArr[3],0);
			sheetObj.SetCellValue(Row, prefix+"lot_no",rtnArr[19],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm",rtnArr[12],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf",rtnArr[13],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",rtnArr[14],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",rtnArr[15],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",rtnArr[16],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",rtnArr[17],0);
			//ITEM MASTER정보
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",rtnArr[5],0);
			// SKU의 Handling Unit을 Default로 설정
			sheet2.CellComboItem(Row,prefix+"item_pkgunit",	{ComboText:rtnArr[29], ComboCode: rtnArr[28]} );
			sheet2.CellComboItem(Row,prefix+"snd_pkgunit",	{ComboText:rtnArr[29], ComboCode: rtnArr[28]} );
			sheet2.CellComboItem(Row,prefix+"dmg_pkgunit",	{ComboText:rtnArr[29], ComboCode: rtnArr[28]} );
			
			// #2061 [WMS4.0]Inbound/Outbound LOT4,LOT5 직접 입력 시 Validation 확인
			sheet2.SetCellValue(Row,prefix+"lot_04_cbm_cd", rtnArr[30]);
			sheet2.SetCellValue(Row,prefix+"lot_05_cbm_cd", rtnArr[31]);
			
			sheet2.CellComboItem(Row,prefix+"lot_04",	{ComboText:rtnArr[30], ComboCode: rtnArr[30]} );
			sheet2.CellComboItem(Row,prefix+"lot_05",	{ComboText:rtnArr[31], ComboCode: rtnArr[31]} );
			
			sheetObj.SetCellValue(Row, prefix+"lot_05","",0);
			sheetObj.SetCellValue(Row, prefix+"lot_04","",0);
			
			sheetObj.SetCellValue(Row, prefix+"item_pkgunit",rtnArr[4],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",rtnArr[4],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",rtnArr[7],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",rtnArr[6],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",rtnArr[9],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",rtnArr[8],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",rtnArr[11],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",rtnArr[10],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_info",rtnArr[18],0);
			sheetObj.SetCellValue(Row, prefix+"curr_cd",rtnArr[20],0);
			//lkh - ibsheet 최신 버전 - bug 수정 Insert 시 오류 수정 다시 확인 필요 - 원복
			sheetObj.SetCellValue(Row, prefix+"unit_price",rtnArr[21],0);
			//sheetObj.SetCellValue(Row, prefix+"item_unit_price",rtnArr[21],0);
			
			var fix_loc_cd= rtnArr[22];
			if(fix_loc_cd != "" && fix_loc_cd != "null")
			{
				sheetObj.SetCellValue(Row, fix_grid02+"inbound_loc_cd",fix_loc_cd,0);
				sheetObj.SetCellValue(Row, fix_grid02+"inbound_loc_nm",rtnArr[23],0);
//				sheetObj.SetCellEditable(Row, fix_grid02 + "dmg_pkgunit",0);
//				sheetObj.SetCellEditable(Row, fix_grid02 + "dmg_pkgqty",0);
//				sheetObj.SetCellEditable(Row, fix_grid02 + "dmg_loc_nm",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "dmg_pkgunit","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "dmg_pkgqty",0,0);
				sheetObj.SetCellValue(Row, fix_grid02 + "dmg_loc_nm","",0);
				//#1675 Contract item entry fixed location 지정 관련 요청 
				sheetObj.SetCellValue(Row, fix_grid02 + "fix_loc_cd",fix_loc_cd,0);
				sheetObj.SetCellValue(Row, fix_grid02 + "fix_loc_cd_nm",rtnArr[23],0);
			}
			else
			{
				sheetObj.SetCellValue(Row, fix_grid02+"inbound_loc_cd",rtnArr[24],0);
				sheetObj.SetCellValue(Row, fix_grid02+"inbound_loc_nm",rtnArr[25],0);
//				sheetObj.SetCellEditable(Row, fix_grid02 + "dmg_pkgunit",1);
//				sheetObj.SetCellEditable(Row, fix_grid02 + "dmg_pkgqty",1);
//				sheetObj.SetCellEditable(Row, fix_grid02 + "dmg_loc_nm",1);
				//#1675 Contract item entry fixed location 지정 관련 요청 
				sheetObj.SetCellValue(Row, fix_grid02 + "fix_loc_cd","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "fix_loc_cd_nm","",0);
			}
			
			// License Plate Code combo List 조회
//			sheet2.CellComboItem(sheet2Row,fix_grid02+"lic_plat_no",{ComboText:rtnArr[26], ComboCode:rtnArr[26]} );

	   }
	   else{

	   }
	  }
	 }
}

function inboundSummary(sheetObj, Col, input_name, format)
{
	var sum=sheetObj.ComputeSum("|" + Col + "|");
	var sum_format=sum;
	if(format == "float")
	{
		sum_format=measureFormatValue(ComGetMaskedValue(sum, format, ","));
	}
	else
	{
		sum_format=ComGetMaskedValue(sum, format, ",");
	}
	$("#" + input_name).val(sum_format);
	/*if($("#form_mode").val() == "UPDATE" && $("#sel_tab").val()=="01")
	{
		var sheetObj1=sheet1;
		var Row1=sheetObj1.FindText(fix_grid01 + "wib_bk_no", $("#sel_wib_bk_no").val(), sheetObj1.HeaderRows(), -1, true);
		sheetObj1.SetCellValue(Row1, fix_grid01 + input_name,sum,0);
	}
	else if($("#form_mode").val() == "NEW" && $("#sel_tab").val()=="01")
	{
		var sheetObj1=sheet1;
		var sRow=sheetObj1.FindStatusRow("I");
		if(sRow != "")
		{
			var arrRow=sRow.split(";");
			sheetObj1.SetCellValue(arrRow[0], fix_grid01 + input_name,sum,0);
		}			
	}*/
}
function resetLotInfo(sheetObj, Row){
	
	// Item Code없는 경우, Lot정보는 초기화 되어야 함.
	// #2061 [WMS4.0]Inbound/Outbound LOT4,LOT5 직접 입력 시 Validation 확인
	if(!ComIsNull(sheetObj.GetCellValue(Row, fix_grid02 + "item_cd")) 
			&& sheetObj.GetCellValue(Row, fix_grid02 + "lot_id").trim() == "")
	{
		return;
	}
	//lot id
	sheetObj.SetCellValue(Row, fix_grid02 + "lot_id","",0);
	sheetObj.SetCellValue(Row, fix_grid02 + "inbound_dt","",0);
	sheetObj.SetCellValue(Row, fix_grid02 + "lot_no","",0);
	sheetObj.SetCellValue(Row, fix_grid02 + "exp_dt","",0);
	sheetObj.SetCellValue(Row, fix_grid02 + "lot_04","",0);
	sheetObj.SetCellValue(Row, fix_grid02 + "lot_05","",0);
	// #2061 [WMS4.0]Inbound/Outbound LOT4,LOT5 직접 입력 시 Validation 확인
	// Lot4, Lot5 Combo 초기화
	sheetObj.CellComboItem(Row,fix_grid02+"lot_04",	{ComboText:"", ComboCode: ""} );
	sheetObj.CellComboItem(Row,fix_grid02+"lot_05",	{ComboText:"", ComboCode: ""} );
	sheetObj.SetCellValue(Row,fix_grid02+"lot_04_cbm_cd", "",0);
	sheetObj.SetCellValue(Row,fix_grid02+"lot_05_cbm_cd", "",0);
	//sheetObj.CellEditable(Row, fix_grid02 + "lot_id") = true;	
	sheetObj.SetCellEditable(Row, fix_grid02 + "inbound_dt",1);
	sheetObj.SetCellEditable(Row, fix_grid02 + "lot_no",1);
	sheetObj.SetCellEditable(Row, fix_grid02 + "exp_dt",1);
	sheetObj.SetCellEditable(Row, fix_grid02 + "lot_04",1);
	sheetObj.SetCellEditable(Row, fix_grid02 + "lot_05",1);
	//sheetObj.CellBackColor(Row, fix_grid02 + "lot_id") = "#EFF0F3"; //UnEditableColor
 	sheetObj.PopupButtonImage(Row, fix_grid02 + "lot_id",0);
}
/*
 * sheet2의 MouseDown 이벤트
 */
function sheet2_OnMouseDown(sheetObj,Button, Shift, X, Y)
{
	if(sheetObj.MouseRow()== (sheetObj.HeaderRows()-1) && sheetObj.MouseCol()== sheetObj.SaveNameCol(fix_grid02 + "row_add")) //header 선택시. header row -> 0,1
	{
		sheet2RowAdd(sheetObj, sheetObj.MouseRow());
	}
}
/*
 * sheet1의 OnClick 이벤트
 */
function sheet2_OnClick(sheetObj,Row, Col, Value){
	if(Col == sheetObj.SaveNameCol(fix_grid02 + "row_add"))
	{
		sheet2RowAdd(sheetObj, Row);
	}
	else if(Col == sheetObj.SaveNameCol(fix_grid02 + "row_del"))
	{
		sheet2RowDel(sheetObj, Row);
	}
	else if (Col == sheetObj.SaveNameCol(fix_grid02+"seal_img")) {
		if(sheetObj.GetCellEditable(Row,fix_grid02+"seal_no") == 1){
			ComShowMemoPad3(sheetObj, Row, (fix_grid02+"seal_no"), false, 300, 82, 23, (fix_grid02+"seal_no"));         		
		}
	}
}
function sheet2RowAdd(sheetObj, Row)
{
	// Sub Total
	sheet2.HideSubSum();
	if($("#form_mode").val() == "UPDATE")
	{
			if($("#bk_sts_cd").val() == "X")
			{
				return;
			}
	}
	var ctrt_no="";
	var ctrt_nm="";
	var wh_cd="";
	var wh_nm="";
	//var sRow=sheet1.FindStatusRow("I");
	if($("#form_mode").val() == "NEW")
	{
		/*if($("#sel_tab").val() != "02")
		{*/
			//신규모드이고 현재탭이 02가 아닐때 sheet의 new row가 없을때
			/*goTabSelect("02");*/
			goTabSelect("01");
		/*}*/
		ctrt_no=$("#ctrt_no").val();
		ctrt_nm=$("#ctrt_nm").val();
		wh_cd=$("#wh_cd").val();
		wh_nm=$("#wh_nm").val();
		if(wh_cd == "")
		{
			ComShowCodeMessage("COM0114","Warehouse");
			$("#wh_cd").focus();
			return;
		}
		if(ctrt_no == "")
		{
			ComShowCodeMessage("COM0114","Contract");
			$("#ctrt_no").focus();
			return;
		}		
	}
	else
	{
		if($("#sel_wib_bk_no").val() == "") 
			$("#sel_wib_bk_no").val(formObj.wib_bk_no.value)
			
		if($("#sel_wib_bk_no").val() != "") //선택된 건이 있으면 (부킹존재)
		{
			ctrt_no=$("#sel_ctrt_no").val();
			ctrt_nm=$("#sel_ctrt_nm").val();
			wh_cd=$("#sel_wh_cd").val();
			wh_nm=$("#sel_wh_nm").val();
		}
		else//신규부킹건일경우
		{
			//var arrRow=sRow.split(";");
			//ctrt_no=sheet1.GetCellValue(arrRow[0], fix_grid01 + "ctrt_no") == "" ? $("#ctrt_no").val() : sheet1.GetCellValue(arrRow[0], fix_grid01 + "ctrt_no");
			//ctrt_nm=sheet1.GetCellValue(arrRow[0], fix_grid01 + "ctrt_nm") == "" ? $("#ctrt_nm").val() : sheet1.GetCellValue(arrRow[0], fix_grid01 + "ctrt_nm");
			//wh_cd=sheet1.GetCellValue(arrRow[0], fix_grid01 + "wh_cd");
			//wh_nm=sheet1.GetCellValue(arrRow[0], fix_grid01 + "wh_nm");
			//if(wh_cd == "")
			//{
			//	ComShowCodeMessage("COM0114","Warehouse");
			//	sheet1.SelectCell(arrRow[0], fix_grid01 + "wh_cd")
			//	return;
			//}
			//if(ctrt_no == "")
			//{
			//	ComShowCodeMessage("COM0114","Contract");
			//	sheet1.SelectCell(arrRow[0], fix_grid01 + "ctrt_no")
			//	return;
			//}		
		}
	}
	/*if($("#sel_tab").val() == "01")
	{
		var sel_row=sheet1.FindText(fix_grid01 + "wib_bk_no", $("#sel_wib_bk_no").val(), sheet1.HeaderRows(), -1, true);
		if(sheet1.GetCellValue(sel_row, fix_grid01 + "bk_sts_cd") == "X")
		{
			return;
		}
	}
	else
	{*/
		if($("#bk_sts_cd").val() == "X")
		{
			return;
		}
	/*}*/
	var label_unit="";
	if(sheetObj.RowCount()== 0)
	{
		if($("#form_mode").val() == "NEW")
		{
			label_unit="NEW";
		}		
	}
	else
	{
		label_unit=sheetObj.GetCellValue(sheetObj.HeaderRows(), fix_grid02 + "label_unit");
	}
	var new_row_arr=new Array();
	if(Row < sheetObj.HeaderRows())
	{
		var row=sheetObj.DataInsert(-1);
		sheetObj.SetCellImage(row, (fix_grid02+"seal_img"),2);
		sheet2RowAddValue(sheetObj, row, ctrt_no, ctrt_nm, wh_cd, wh_nm);
		new_row_arr.push(row);
		add_planned_transport(row);
	}
	else
	{
		sheetObj.SetCellValue(Row, fix_grid02 + "row_add_qty",'1',0);
		var row_add_qty=sheetObj.GetCellValue(Row, fix_grid02 + "row_add_qty");
		for(var i=0; i<row_add_qty; i++)
		{
			var row=sheetObj.DataInsert(-1);
			sheetObj.SetCellImage(row, (fix_grid02+"seal_img"),2);
			sheet2RowAddValue(sheetObj, row, ctrt_no, ctrt_nm, wh_cd, wh_nm);
			new_row_arr.push(row);
			add_planned_transport(row);
		}
	}	
	if(label_unit == "NEW")
	{
		/*$.ajax({
			url : "searchLabelUnit.do?ctrt_no=" + ctrt_no + "&loc_cd=" + wh_cd + "&ofc_cd=" + $("#ofc_cd").val(),
			success : function(result) 
			{
				for(var i=0; i<new_row_arr.length; i++)
				{
					sheetObj.SetCellValue(new_row_arr[i], fix_grid02 + "label_unit",getXmlDataNullToNullString(result.xml,'label_unit'),0);
				}
			}
		});	*/
		//getLabelUnit(new_row_arr, sheetObj);
	}
	else
	{
		for(var i=0; i<new_row_arr.length; i++)
		{
			sheetObj.SetCellValue(new_row_arr[i], fix_grid02 + "label_unit",label_unit,0);
		}
	}
	
//	sheetObj.InitComboNoMatchText(1, "",1);
	
	// Status의 Default값 Sound에 따른 항목 제어
	sheetObj.SetCellEditable(row,fix_grid02+"dmg_pkgunit",0);
	sheetObj.SetCellEditable(row,fix_grid02+"dmg_pkgqty",0);
//	sheetObj.SetCellEditable(row,fix_grid02+"dmg_ea_qty",0);
	sheetObj.SetCellEditable(row,fix_grid02+"dmg_loc_nm",0);
	sheetObj.SetCellEditable(row,fix_grid02+"snd_pkgunit",1);
	sheetObj.SetCellEditable(row,fix_grid02+"rcv_pkgqty",1);
//	sheetObj.SetCellEditable(row,fix_grid02+"snd_ea_qty",1);
	sheetObj.SetCellEditable(row,fix_grid02+"inbound_loc_nm",1);
	
//	if (sheetObj.GetCellValue(row, fix_grid02+"dmg_pkgunit") != "") {
//		sheetObj.SetCellValue(row, fix_grid02+"snd_pkgunit", sheetObj.GetCellValue(row, fix_grid02+"dmg_pkgunit"));
//		sheetObj.SetCellValue(row, fix_grid02+"rcv_pkgqty", sheetObj.GetCellValue(row, fix_grid02+"dmg_pkgqty"));
//		sheetObj.SetCellValue(row, fix_grid02+"snd_ea_qty", sheetObj.GetCellValue(row, fix_grid02+"dmg_ea_qty"));
//		
//		sheetObj.SetCellValue(row, fix_grid02+"dmg_pkgunit", "");
//		sheetObj.SetCellValue(row, fix_grid02+"dmg_pkgqty", "");
//		sheetObj.SetCellValue(row, fix_grid02+"dmg_ea_qty", "");
//		sheetObj.SetCellValue(row, fix_grid02+"dmg_loc_nm", "");
//		
//		settring_ea_qty(sheetObj, row, sheetObj.GetCellValue(row, fix_grid02+"item_cd"), "snd_pkgunit", "");
//	}

}
function add_planned_transport(row){
	var formObj = document.form;
	if($("#eq_tpsz_cd").val() != ""){
		sheet2.SetCellValue(row, fix_grid02 + "eq_tpsz_cd", $("#eq_tpsz_cd").val());
	}
	if($("#eq_no").val() != ""){
		sheet2.SetCellValue(row, fix_grid02 + "eq_no", $("#eq_no").val());
	}
	if($("#seal_no").val() != ""){
		sheet2.SetCellValue(row, fix_grid02 + "seal_no", $("#seal_no").val());
	}
	
}
function sheet2RowAddValue(sheetObj, row, ctrt_no, ctrt_nm, wh_cd, wh_nm)
{

	sheet2.SetSumValue(fix_grid02 + "item_nm", "TOTAL");
	
	sheetObj.SetCellValue(row, fix_grid02 + "wib_bk_no",$("#sel_wib_bk_no").val(),0);
	sheetObj.SetCellValue(row, fix_grid02 + "ctrt_no",ctrt_no,0);
	sheetObj.SetCellValue(row, fix_grid02 + "ctrt_nm",ctrt_nm,0);
	sheetObj.SetCellValue(row, fix_grid02 + "wh_cd",wh_cd,0);
	sheetObj.SetCellValue(row, fix_grid02 + "wh_nm",wh_nm,0);
	
 	sheetObj.SetCellBackColor(row, fix_grid02 + "lot_id","#EFF0F3"); //UnEditableColor
 	sheetObj.PopupButtonImage(row, fix_grid02 + "lot_id",0);
	sheetObj.SetCellValue(row, fix_grid02 + "row_add","+",0);
	sheetObj.SetCellValue(row, fix_grid02 + "row_del","-",0);
	sheetObj.SetCellValue(row, fix_grid02 + "row_add_qty",1,0);
	
	// License Plate No Combo List
	var sLicPlateNo = "|";
	if (sheetObj.GetCellValue(row, fix_grid02 + "item_cd").trim() != "") {
		for(var i=0; i<=sheetObj.LastRow();i++){
	 		if(sheetObj.GetCellValue(row, fix_grid02 + "item_cd") == sheetObj.GetCellValue(i, fix_grid02 + "item_cd"))
			{
	 			if (sheetObj.GetCellValue(i, fix_grid02 + "lic_plat_no") != "" && sheetObj.GetCellValue(i, fix_grid02 + "lic_plat_no") != "AUTO") {
	 				sLicPlateNo += sheetObj.GetCellValue(i, fix_grid02 + "lic_plat_no") + "|";
	 			}
			}	
		}
	} else {
		sheetObj.CellComboItem(row,fix_grid02+"item_pkgunit",	{ComboText:" ", ComboCode: ""} );
		sheetObj.CellComboItem(row,fix_grid02+"snd_pkgunit",	{ComboText:" ", ComboCode: ""} );
		sheetObj.CellComboItem(row,fix_grid02+"dmg_pkgunit",	{ComboText:" ", ComboCode: ""} );
		sheetObj.CellComboItem(row,fix_grid02+"lot_04",			{ComboText:" ", ComboCode: ""} );
		sheetObj.CellComboItem(row,fix_grid02+"lot_05",			{ComboText:" ", ComboCode: ""} );
//		sheetObj.CellComboItem(row,fix_grid02+"lic_plat_no",	{ComboText:"|AUTO", ComboCode: "|AUTO"} );
	}
	sLicPlateNo = "|AUTO" + sLicPlateNo;
	for(var i=0; i<=sheetObj.LastRow();i++){
 		if(sheetObj.GetCellValue(row, fix_grid02 + "item_cd") == sheetObj.GetCellValue(i, fix_grid02 + "item_cd"))
		{
 			sheet2.CellComboItem(i,fix_grid02+"lic_plat_no",{ComboText:sLicPlateNo.substr(0,sLicPlateNo.length-1), ComboCode:sLicPlateNo.substr(0,sLicPlateNo.length-1)} );
		}
	}
//	sheetObj.SetCellValue(row, fix_grid02 + "lic_plat_no","AUTO");
	sheetObj.SetCellValue(row, fix_grid02 + "lic_plat_no","");	// "AUTO"에서 Blank로 수정
	
	// SKU ComboList조회
	//var selRow=sheet1.GetSelectRow();
	var p_ctrt_no = $("#ctrt_no").val();/*sheet1.GetCellValue(selRow, fix_grid01 + "ctrt_no")*/
	var p_wh_cd = $("#wh_cd").val();/*sheet1.GetCellValue(selRow, fix_grid01 + "wh_cd")*/
//	sheet2Row = row;
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');

}
function dispAjaxReq(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				//특정 셀의 콤보 항목 바꾸기
				
				var subSum = "|" + sheet2.FindSubSumRow() + "|"; 
				var p_ctrt_no = $("#ctrt_no").val();
				var p_wh_cd = $("#wh_cd").val();
				for(var i=sheet2.HeaderRows(); i<sheet2.LastRow()  ; i++){
					if (subSum.indexOf("|" + i + "|") < 0 ) {
						sheet2.CellComboItem(i,fix_grid02+"item_cd",{ComboText:rtnArr[0], ComboCode:rtnArr[1]} );
//						if (sheet2.GetCellValue(i, fix_grid02 + "item_cd") != "") {
//							var sParam="ctrt_no=" + p_ctrt_no + "&item_cd=" + sheet2.GetCellValue(i, fix_grid02 + "item_cd") + "&wh_cd=" + p_wh_cd;
//							ajaxSendPost(resultsearchWHItemCodeInfo, i, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
//						}
					}
				}
			}
			else{
				ComShowCodeMessage("COM130401");
			}
		}
		else{
			ComShowCodeMessage("COM130401");
		}
	}
}

function sheet2RowDel(sheetObj, Row)
{
	if(sheetObj.GetRowStatus(Row) == "I")
	{
		sheetObj.RowDelete(Row, false);
		return;
	}
	if(sheetObj.GetCellValue(Row, fix_grid02 + "wib_in_no") != "")
	{
		return;
	}
	sheetObj.SetRowHidden(Row,1);//2.행 숨기기
	sheetObj.SetRowStatus(Row,"D");
	// Sub Total
	sheet2.HideSubSum();
}
function sheet3_OnSearchEnd(sheetObj){
	for(var i=sheetObj.HeaderRows(); i < (sheetObj.RowCount()+sheetObj.HeaderRows()) ; i++){
		sheetObj.SetCellBackColor(i, fix_grid03+"field_name","#D9E5FF");
//		sheetObj.CellFontColor(i, fix_grid03+"field_val") = "#0000FF";
 		sheetObj.SetCellFont("FontBold", i, fix_grid03+"field_name",1);
	}
}
//
//function sheet3_OnDblClick(sheetObj, Row, Col) {
//	var sName = sheetObj.ColSaveName(Col);
//	var sValue = sheetObj.CellValue(Row, Col);
//	
//	if (!isNull2(sValue) && sName == (fix_grid03+"field_val")) 
//	{
//		if ("IC" == sheetObj.CellValue(Row, fix_grid03+"doc_type")) 
//		{ // Inbound Complete
//			var sParam = "search_tp=WIB_IN_NO&search_no="+sValue;
//			var sUrl = "/HJLOMS/WHICUpdate.do?"+sParam;
//			parent.mkNewFrame("Inbound Complete Update", sUrl);
//		} 
//		else if ("WO" == sheetObj.CellValue(Row, fix_grid03+"doc_type")) 
//		{ // Work Order No
//			var sParam = "wo_no="+sValue;
//			var sUrl = "/HJLOMS/WOMgmt.do?"+sParam;
//			parent.mkNewFrame("Work Order Management", sUrl);
//		} 
//		else if ("PA" == sheetObj.CellValue(Row, fix_grid03+"doc_type")) 
//		{ // PUTAWAY
//			var sUrl = "/HJLOMS/WHPutawayMgmt.do?wib_in_no="+sValue;
//			parent.mkNewFrame('Putaway Management', sUrl);
//		}		
//	}
//}
function sheet4_OnSearchEnd(sheetObj){
	//sheetObj.SetColFontUnderline(fix_grid04 + "file_org_nm",1);
	
	var formObj=document.form;
	sheetObj.SetColFontUnderline(2,1);
	doHideProcess();
	
	setOldValueAllObj();
}

function setOldValueAllObj(){
	var arrInput = document.getElementsByTagName("input");
	
	for(var i = 0 ; i < arrInput.length; i++){
		if(arrInput[i].type != "hidden" && arrInput[i].disabled == false && arrInput[i].readOnly == false)
			if(arrInput[i].type == "checkbox"){
				arrInput[i].oldvalue = arrInput[i].checked;
			}else{
				arrInput[i].oldvalue = arrInput[i].value;
			}
	}
	
	var arrTextarea = document.getElementsByTagName("textarea");
	
	for(var i = 0 ; i < arrTextarea.length; i++){
		if(arrTextarea[i].type != "hidden" && arrTextarea[i].disabled == false && arrTextarea[i].readOnly == false)
			arrTextarea[i].oldvalue = arrTextarea[i].value;
	}
	
	var arrSelect = document.getElementsByTagName("select");
	
	for(var i = 0 ; i < arrSelect.length; i++){
		//if(arrSelect[i].type != "hidden" && arrSelect[i].disabled == false && arrSelect[i].readOnly == false)
		if(arrSelect[i].type != "hidden" && arrSelect[i].disabled == false)
			arrSelect[i].oldvalue = arrSelect[i].value;
	}
}
function sheet4_OnDblClick(sheetObj, Row, Col){
	var formObj1=document.frm1;
	var sName=sheetObj.ColSaveName(Col);
	if (sName == fix_grid04 + "file_org_nm") {
		formObj1.file_path.value = sheetObj.GetCellValue(Row, fix_grid04 + "file_path")+sheetObj.GetCellValue(Row, fix_grid04 + "file_sys_nm");
		//#2399 [Binex Visibility] attached file cannot be download on inbound search on Chrome
		//formObj1.file_name.value = sheetObj.GetCellValue(Row, fix_grid04 + "file_org_nm");
		formObj1.file_name.value = "\"" + sheetObj.GetCellValue(Row, fix_grid04 + "file_org_nm") + "\"" ;
		
		formObj1.submit();
		showCompleteProcess();
	}
}

/**
 * 마우스 아웃일때 
 */
function form_deactivate() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=window.event.srcElement.getAttribute("value");
}
function keydown(){
	var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=event.srcElement.getAttribute("value");
    if (vKeyCode == 120) {
    	btn_Save();
    }
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "list_in_no":
				btn_Search();
			break;	
			default:
				form_onChange();
			break;
		}
	}
	var backspace=8; 
    var t=document.activeElement;  
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
/**
 * 마우스 아웃일때 
 */
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	if(srcName == "owner_cd" && !(formObj.btn_owner_cd.disabled)){
		 if(isNull(formObj.owner_cd)){
				setTlCustInfoNull("owner");
		 } else{
			 searchTlCustInfo("owner", $("#owner_cd").val());			 
		 }
	}
	else if(srcName == "supp_cd" && !(formObj.btn_supp_cd.disabled)){
		 if(isNull(formObj.supp_cd)){
			 setTlCustInfoNull("supp");
		 }else{
			 searchTlCustInfo("supp", $("#supp_cd").val());
		 }
	}
	else if(srcName == "trucker_cd" && !(formObj.btn_trucker_cd.disabled)){
		if(isNull(formObj.trucker_cd)){
			 setTlCustInfoNull("trucker");
		 }else{
			 searchTlCustInfo("trucker", $("#trucker_cd").val());
		 }
	}else if(srcName == "bill_to_cd" && !(formObj.btn_bill_to_cd.disabled)){
		if(isNull(formObj.bill_to_cd)){
			 setTlCustInfoNull("bill_to");
		 }else{
			 searchTlCustInfo("bill_to", $("#bill_to_cd").val());
		 }
	}
	else if(srcName == "eq_tpsz_cd" && !(formObj.btn_eq_tpsz_cd.disabled)){
		var sParam="cntr_tp="+$("#eq_tpsz_cd").val();
		$.ajax({
			url : "searchCntrTrTp.do?"+sParam,
			success : function(result) {
				$("#eq_tpsz_cd").val(getXmlDataNullToNullString(result.xml,'eq_unit'));
				$("#eq_tp_cd").val(getXmlDataNullToNullString(result.xml,'type'));
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
					$("#eq_tpsz_cd").focus();
				}
			}
		});
	}
	else if(srcName == "vsl_cd" && !(formObj.btn_vsl_cd.disabled)){
		if(isNull(formObj.vsl_cd)){
			setTlVslInfoNull("vsl");
		}else{
			searchTlVslInfo("vsl", $("#vsl_cd").val());
		}
	}else if(srcName == "carrier_cd" && !(formObj.btn_carrier_cd.disabled)){
		if(isNull(formObj.carrier_cd)){
			setTlCustInfoNull("carrier");
		}else{
			searchTlCustInfo("carrier", $("#carrier_cd").val());			
		}
	}else if(srcName == "pol" && !(formObj.btn_pol.disabled)){
		 if(isNull(formObj.pol)){
			 setTlLocInfoNull("pol");
		 }else{
			 searchTlLocInfo("pol", ComGetObjValue(formObj.pol), "P");			 
		 }
	}else if(srcName == "pod" && !(formObj.btn_pod.disabled)){
		if(isNull(formObj.pod)){
			setTlLocInfoNull("pod");
		}else{
			searchTlLocInfo("pod", ComGetObjValue(formObj.pod), "P");			
		}
	}else if(srcName == "del" && !(formObj.btn_del.disabled)){
		if(isNull(formObj.del)){
			setTlLocInfoNull("del");
		}else{
			searchTlLocInfo("del", ComGetObjValue(formObj.del), "P");			
		}
	}
}

/*
 * Excel Upload후 조회
 */
function btn_excel_Search(isNoShowProcess){
	var formObj=document.form;
	var sheetObj=sheet2;
	
	formObj.f_cmd.value = SEARCH07;
 	var sXml=sheetObj.GetSearchData("./searchWHInMgmtListGS.clt", FormQueryString(formObj,""));
 	
	var strtIndxSheet = sXml.indexOf("<SHEET7>");
	var endIndxSheet = sXml.indexOf("</SHEET7>") + "</SHEET7>".length;
	var sheetData = sXml.substring(strtIndxSheet,endIndxSheet);
	//#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 3차
	//sheet7.LoadSearchData(sheetData.replaceAll('SHEET7', 'SHEET'));
	sheet2_excel_flag ="Y";
	sheet2.LoadSearchData(sheetData.replaceAll('SHEET7', 'SHEET'));
	//console.log("sheet2_excel_flag: "+ sheet2_excel_flag);
}

/*
 * 조회
 */
function btn_Search(isNoShowProcess){
	//sheet2.HideSubSum();
	var formObj=document.form;
	var sheetObj=sheet2;
	if(loading_flag != "Y"){
		return;
	}
	//validation check
	if (validateForm(formObj, 'search') == false) 
	{
		return;
	}

	//sheet초기화 및 form tab초기화	
	if(!isNoShowProcess){
		doShowProcess(true);
	}
	
	
	formObj.f_cmd.value = SEARCH;
 	var sXml=sheetObj.GetSearchData("./searchWHInMgmtListGS.clt", FormQueryString(formObj,""));

 	//Load Contract Info
// 	var strtIndxSheet = sXml.indexOf("<CTRT_CUST_CD>");
//	var endIndxSheet = sXml.indexOf("</CTRT_CUST_CD>") + "</CTRT_CUST_CD>".length;
//	var contactInfo = sXml.substring(strtIndxSheet + "<CTRT_CUST_CD>".length ,endIndxSheet - "</CTRT_CUST_CD>".length );
//	formObj.bill_to_cd.value = contactInfo;
	
 	formObj.bill_to_cd.value = formObj.owner_cd.value;
 	formObj.bill_to_nm.value = formObj.owner_nm.value;
	
	//Load WH Office Code Info
	var strtIndxSheet = sXml.indexOf("<WH_OFC_CD>");
	var endIndxSheet = sXml.indexOf("</WH_OFC_CD>") + "</WH_OFC_CD>".length;
	var whOfcCd = sXml.substring(strtIndxSheet + "<WH_OFC_CD>".length ,endIndxSheet - "</WH_OFC_CD>".length );
	
	//Load WH Office Code에 해당하는 Currency
	var strtIndxSheet2 = sXml.indexOf("<WH_CURR_CD>");
	var endIndxSheet2 = sXml.indexOf("</WH_CURR_CD>") + "</WH_CURR_CD>".length;
	var whCurrCd = sXml.substring(strtIndxSheet2 + "<WH_CURR_CD>".length ,endIndxSheet2 - "</WH_CURR_CD>".length );
	
	if (whOfcCd == null || whOfcCd == "" ) {
		formObj.wh_ofc_cd.value = formObj.ofc_cd.value;
	} else {
		formObj.wh_ofc_cd.value = whOfcCd;
	} 
	formObj.wh_curr_cd.value = whCurrCd;
	document.getElementById("sp_curr_cd").innerHTML = whCurrCd;
	
	formObj.wib_bk_no.value="";
	formObj.cust_ord_no.value = "";

	if(formObj.list_in_search_tp.value=="CUST_ORD_NO")
		searchBookingData(formObj.wib_bk_no.value,formObj.list_in_no.value);
	else
		searchBookingData(formObj.list_in_no.value,formObj.cust_ord_no.value);
	/*//sheet초기화 및 form tab초기화	
	formObj.f_cmd.value = SEARCH;
 	var sXml=sheetObj.GetSearchData("./searchWHInMgmtListGS.clt", FormQueryString(formObj,""));
 	
 	var strtIndxSheet1 = sXml.indexOf("<SHEET1>");
	var endIndxSheet1 = sXml.indexOf("</SHEET1>") + "</SHEET1>".length;
	
	var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
	sheet1.LoadSearchData(sheet1Data.replaceAll('SHEET1', 'SHEET'));*/

}
function resetAll(sheet1_clear_flg,oth_sheet_clear_flg)
{
	var formObj=document.form;
	/*if(sheet1_clear_flg == true)
	{
		sheet1.RemoveAll();
	}*/
	if(oth_sheet_clear_flg == true)
	{
		sheet2.RemoveAll();
		sheet3.RemoveAll();
		sheet4.RemoveAll();
		sheet6.RemoveAll();
	}
	$("#list_in_no").val("");
	$("#sel_wib_bk_no").val("");
	$("#sel_ctrt_no").val("");
	$("#sel_ctrt_nm").val("");
	$("#sel_wh_cd").val("");
	$("#sel_wh_nm").val("");
	$("#file_cust_ord_no").val("");
	$("#s_inv_ttl_amt").val("");
	$("#bk_sts_nm").val("Initial");
	//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
	document.form.bk_sts_nm.style.background = bgInit;
	
	$("#putawy_sts_nm").val(""); //#1881 [BINEX WMS4.0] PUTAWAY LOCATION COLUMN ADD TO INBOUND LIST
	
	$("#xls_no").val("");
	
	form_tab_new_setting();
	//form_tab_field_enable(true);
	ComBtnDisable("btn_file_delete");
	ComBtnDisable("btn_file_upload");

	
	$("#file_path").val("");
	
	$("#seal_no1").val("");
	$("#seal_no2").val("");
	$("#seal_no3").val("");
	$("#addr1").val("");
	formObj.inbound_dt.disabled = false;
	formObj.inbound_hm.disabled = false;
	formObj.btn_inbound_dt.disabled = false;
	
	formObj.eq_tpsz_cd.disabled = false;
	formObj.btn_eq_tpsz_cd.disabled = false;
	formObj.eq_no.disabled = false;
	formObj.seal_no.disabled = false;
	formObj.btn_seal_no.disabled = false;
	//uploadObjects[0].DeleteFile();
	
	// Bill To 정보 clear
	//$("#bill_to_cd").val("");
	//("#bill_to_nm").val("");
	//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked" - Optionized needed
	if (opt_chk == "Y"){
		ComBtnDisable("btn_rating");
		ComBtnEnable("btn_frtAdd");	
//	 	formObj.bill_to_cd.value = formObj.owner_cd.value;
//	 	formObj.bill_to_nm.value = formObj.owner_nm.value;
	}else{
		ComBtnDisable("btn_rating");
		ComBtnDisable("btn_frtAdd");	
	}
}
function searchBookingData(wib_bk_no, cust_ord_no)
{
	
	var formObj=document.form;
 	var sXml=sheet2.GetSearchData("./searchWHInMgmtInfoGS.clt", "wib_bk_no=" + wib_bk_no + "&f_cmd=" + SEARCH04 + "&cust_ord_no=" + cust_ord_no);
	//var arrXml=sXml.split("|$$|");
	//var InputName="wh_cd|wh_nm|ctrt_no|ctrt_nm|rtp_no|owner_cd|owner_addr1|owner_addr2|owner_addr3|owner_addr4|owner_addr5|cust_ord_no|wib_bk_no|bk_sts_cd|bk_sts_nm|ord_tp_cd|bk_date|load_tp_cd|est_in_dt|est_in_hm|trade_tp_cd|inbound_dt|inbound_hm|fwd_tp_cd|inbound_pl_qty|inbound_bx_qty|inbound_ea_qty|inbound_sqft|inbound_cbm|inbound_grs_kgs|inbound_net_kgs|trucker_cd|trucker_nm|eq_tpsz_cd|eq_no|eq_tp_cd|seal_no|dlv_ord_no|supp_cd|supp_addr1|supp_addr2|supp_addr3|supp_addr4|supp_addr5|ref_no|commc_inv_no|mbl_no|hbl_no|vsl_cd|vsl_nm|voy|carrier_cd|carrier_nm|pol|pol_nm|pod|pod_nm|del|del_nm|etd|eta|unload_sht_yn|rmk|label_unit|sum_bx_label_qty|rcv_cnt";
	//resetAll(false, true);
	
	//Get data for form
	var strtIndxCheck = sXml.indexOf("<CHECK>") + "<CHECK>".length;
	var endIndxCheck = sXml.indexOf("</CHECK>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxCheck,endIndxCheck));
	var $xml = $(xmlDoc);
	if ($xml.find( "listCnt").text() == '0'){
		//setDataControl(sXml);
		//ComShowCodeMessage("COM0192"); // W/H Booking No does not exist.
		ComShowCodeMessage("COM0266","Booking No Or Order No"); // W/H Booking No does not exist.
		formObj.list_in_no.value= "";
		doHideProcess(false);
	}else {
		setDataControl(sXml);
		if(wib_bk_no == ""){
			wib_bk_no = formObj.wib_bk_no.value;
		}
		if(cust_ord_no == ""){
			cust_ord_no = formObj.cust_ord_no.value;
		}
		//Load data for sheet1
		var strtIndxSheet2 = sXml.indexOf("<SHEET2>");
		var endIndxSheet2 = sXml.indexOf("</SHEET2>") + "</SHEET2>".length;
		var sheet2Data = sXml.substring(strtIndxSheet2,endIndxSheet2);
		if (sheet2Data.replace(/^\s+|\s+$/gm,'') != ""){
			sheet2.LoadSearchData(sheet2Data.replaceAll('SHEET2', 'SHEET'));
			sheet2.ShowSubSum([{StdCol:fix_grid02+"item_sys_no", SumCols:fix_grid02+"item_pkgqty|" + fix_grid02+"item_ea_qty|" + fix_grid02+"in_item_ea_qty|" + fix_grid02+"os_item_ea_qty|" + fix_grid02+"in_item_pe_qty|" + fix_grid02+"rcv_pkgqty|" + fix_grid02+"snd_ea_qty|" 
				+ fix_grid02+"dmg_pkgqty|" + fix_grid02+"dmg_ea_qty|" + fix_grid02+"item_cbm|" + fix_grid02+"item_cbf|" + fix_grid02+"item_grs_kgs|" + fix_grid02+"item_grs_lbs|" + fix_grid02+"item_net_kgs|" + fix_grid02+"item_net_lbs|" + fix_grid02+"unit_price"
				, ShowCumulate:0, CaptionCol:fix_grid02+"item_nm", CaptionText: "Sub Total"}]);
		}
		//sheet3
		var strtIndxSheet3 = sXml.indexOf("<SHEET3>");
		var endIndxSheet3 = sXml.indexOf("</SHEET3>") + "</SHEET3>".length;
		var sheet3Data = sXml.substring(strtIndxSheet3,endIndxSheet3);
		sheet3.LoadSearchData(sheet3Data.replaceAll('SHEET3', 'SHEET'));
		//sheet4
		var strtIndxSheet4 = sXml.indexOf("<SHEET4>");
		var endIndxSheet4 = sXml.indexOf("</SHEET4>") + "</SHEET4>".length;
		var sheet4Data = sXml.substring(strtIndxSheet4,endIndxSheet4);
		sheet4.LoadSearchData(sheet4Data.replaceAll('SHEET4', 'SHEET'));
		
		//sheet6
		var strtIndxSheet6 = sXml.indexOf("<SHEET6>");
		var endIndxSheet6 = sXml.indexOf("</SHEET6>") + "</SHEET6>".length;
		var sheet6Data = sXml.substring(strtIndxSheet6,endIndxSheet6);
		sheet6.LoadSearchData(sheet6Data.replaceAll('SHEET6', 'SHEET'));
		/*for (var i=0; i<arrXml.length; i++) {
			if(i == 0){//Form 정보 조회
				//ibSheetView Xml 을 HTML태그(Object) 오브젝트의 value 세팅
				ComsetXmlDataToForm3(arrXml[i], InputName);
				if($("#trade_tp_cd")[0].GetSelectCode()== "")
				{
					$("#trade_tp_cd")[0].SetSelectCode("DOM",false);
				}
				if($("#fwd_tp_cd")[0].GetSelectCode()== "")
				{
					$("#fwd_tp_cd")[0].SetSelectCode("OTH",false);
				}
				if($("#ord_tp_cd")[0].GetSelectCode()== "A")
				{
					ord_tp_cd_OnChange($("#ord_tp_cd")[0], "A", "");
				}
			}
			else if (i == 1) { // Item 정보 조회
				sheet2.LoadSearchData(arrXml[i],{Sync:1} );
			}
			else if (i == 2) { // Doc Detail 정보 조회
				sheet3.LoadSearchData(arrXml[i],{Sync:1} );
			}
			else if (i == 3) { // Attachment 정보 조회
				sheet4.LoadSearchData(arrXml[i],{Sync:1} );
			}		
		}*/	
		if($("#bk_sts_cd").val() == "N")
		{
			//unloading sheet button 셋팅
			ComBtnDisable("btn_create_uploading_sheet");
			setEnableUnloadSht("btn_document_uploading_sheet", false, 5);
		}
		else if($("#unload_sht_yn").val() == "Y")
		{
			btn_show_uploading_sheet(false);
		}
		else
		{
			btn_show_uploading_sheet(true);
		}
		$("#form_mode").val("UPDATE");
		form_tab_field_enable(false);
		ComBtnEnable("btn_file_delete");
		ComBtnEnable("btn_file_upload");
		$("#sel_wib_bk_no").val(wib_bk_no);
		$("#file_cust_ord_no").val(cust_ord_no);
		$("#c_wib_bk_no").val(wib_bk_no);
		$("#sel_ctrt_no").val($("#ctrt_no").val());
		$("#sel_ctrt_nm").val($("#ctrt_nm").val());
		$("#sel_wh_cd").val($("#wh_cd").val());
		$("#sel_wh_nm").val($("#wh_nm").val());
		$("#sel_label_unit").val($("#label_unit").val());
		if($("#rcv_cnt").val() == "0")
		{
			formObj.ord_tp_cd.disabled = true;
			formObj.load_tp_cd.disabled = true;
			ComBtnEnable("btn_est_in_dt");
			ComEnableObject(document.form.est_in_dt, true);
		}
		if($("#bk_sts_cd").val() == "X"){
			formObj.inbound_dt.disabled = true;
			formObj.inbound_hm.disabled = true;
			formObj.btn_inbound_dt.disabled = true;
			
			formObj.eq_tpsz_cd.disabled = true;
			formObj.btn_eq_tpsz_cd.disabled = true;
			formObj.eq_no.disabled = true;
			formObj.seal_no.disabled = true;
			formObj.btn_seal_no.disabled = true;
		}else{
			formObj.inbound_dt.disabled = false;
			formObj.inbound_hm.disabled = false;
			formObj.btn_inbound_dt.disabled = false;
			
			formObj.eq_tpsz_cd.disabled = false;
			formObj.btn_eq_tpsz_cd.disabled = false;
			formObj.eq_no.disabled = false;
			formObj.seal_no.disabled = false;
			formObj.btn_seal_no.disabled = false;
		}
		//showCompleteProcess();
		//sum_bx_label_qty를 sheet에 바인딩
		/*var row=sheet1.FindText(fix_grid01 + "wib_bk_no", wib_bk_no, sheet1.HeaderRows(), -1, true);
		if(row == -1)
		{
			return;
		}
		sheet1.SetCellValue(row, fix_grid01 + "sum_bx_label_qty",$("#sum_bx_label_qty").val());*/

		//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		ctrt_name = 'ctrt_no';
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.ctrt_no.value+"&ord_tp_lvl1_cd=\'P\'", './GateServlet.gsl');
	}
	////ComOpenWait(false);
}

function setDataControl(sXml) {
	var formObj=document.form;
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	
	formObj.wib_bk_no.value = $xml.find( "wib_bk_no").text();
	formObj.wh_cd.value	= $xml.find( "wh_cd").text();
	//formObj.wh_nm.value	= $xml.find( "wh_nm").text();
	formObj.ctrt_no.value	= $xml.find( "ctrt_no").text();
	formObj.ctrt_nm.value	= $xml.find( "ctrt_nm").text();
	formObj.rtp_no.value	= $xml.find( "rtp_no").text();
	formObj.owner_cd.value	= $xml.find( "owner_cd").text();
	formObj.owner_nm.value	= $xml.find( "owner_nm").text();
	formObj.owner_addr1.value	= $xml.find( "owner_addr1").text();
	/*formObj.owner_addr2.value	= $xml.find( "owner_addr2").text();
	formObj.owner_addr3.value	= $xml.find( "owner_addr3").text();
	formObj.owner_addr4.value	= $xml.find( "owner_addr4").text();
	formObj.owner_addr5.value	= $xml.find( "owner_addr5").text();*/
	formObj.cust_ord_no.value	= $xml.find("cust_ord_no").text();

	//#3195 [BINEX WMS4.0] [#3100 개선] INBOUND LIST AND ENTRY SHOWING DIFF SKU
	$('#cust_ord_no').attr('org_cust_ord_no', $('#cust_ord_no').val());

	formObj.file_cust_ord_no.value	= $xml.find("cust_ord_no").text();
	formObj.bk_date.value	= convDate($xml.find( "bk_date").text());
	formObj.est_in_dt.value	= convDate($xml.find( "est_in_dt").text());
	formObj.est_in_hm.value	= $xml.find( "est_in_hm").text();
	formObj.inbound_dt.value	= convDate($xml.find( "inbound_dt").text());
	formObj.inbound_hm.value	= $xml.find( "inbound_hm").text();
	formObj.inbound_pl_qty.value	= $xml.find( "inbound_pl_qty").text();
	formObj.inbound_bx_qty.value	= $xml.find( "inbound_bx_qty").text();
	formObj.inbound_ea_qty.value	= $xml.find( "inbound_ea_qty").text();
	formObj.inbound_sqft.value	= $xml.find( "inbound_sqft").text();
	formObj.inbound_cbm.value	= $xml.find( "inbound_cbm").text();
	formObj.inbound_grs_kgs.value	= $xml.find( "inbound_grs_kgs").text();
	formObj.inbound_net_kgs.value	= $xml.find( "inbound_net_kgs").text();
	
	formObj.trucker_cd.value	= $xml.find( "trucker_cd").text();
	formObj.trucker_nm.value	= $xml.find( "trucker_nm").text();
	formObj.eq_tpsz_cd.value	= $xml.find( "eq_tpsz_cd").text();
	formObj.eq_no.value	= $xml.find( "eq_no").text();
	formObj.eq_tp_cd.value	= $xml.find( "eq_tp_cd").text();
	formObj.seal_no.value	= $xml.find( "seal_no").text();
	formObj.dlv_ord_no.value	= $xml.find( "dlv_ord_no").text();
	formObj.supp_cd.value	= $xml.find( "supp_cd").text();
	formObj.supp_nm.value	= $xml.find( "supp_nm").text();
	formObj.supp_addr1.value	= $xml.find( "supp_addr1").text();
	/*formObj.supp_addr2.value	= $xml.find( "supp_addr2").text();
	formObj.supp_addr3.value	= $xml.find( "supp_addr3").text();
	formObj.supp_addr4.value	= $xml.find( "supp_addr4").text();
	formObj.supp_addr5.value	= $xml.find( "supp_addr5").text();*/
	formObj.ref_no.value	= $xml.find( "ref_no").text();
	formObj.commc_inv_no.value	= $xml.find( "commc_inv_no").text();
	formObj.mbl_no.value	= $xml.find( "mbl_no").text();
	formObj.hbl_no.value	= $xml.find( "hbl_no").text();
	formObj.vsl_cd.value	= $xml.find( "vsl_cd").text();
	formObj.vsl_nm.value	= $xml.find( "vsl_nm").text();
	formObj.voy.value	= $xml.find( "voy").text();
	formObj.carrier_cd.value	= $xml.find( "carrier_cd").text();
	formObj.carrier_nm.value	= $xml.find( "carrier_nm").text();
	formObj.pol.value	= $xml.find( "pol").text();
	formObj.pol_nm.value	= $xml.find( "pol_nm").text();
	formObj.pod.value	= $xml.find( "pod").text();
	formObj.pod_nm.value	= $xml.find( "pod_nm").text();
	formObj.del.value	= $xml.find( "del").text();
	formObj.del_nm.value	= $xml.find( "del_nm").text();
	formObj.etd.value	= convDate($xml.find( "etd").text());
	formObj.eta.value	= convDate($xml.find( "eta").text());
	formObj.unload_sht_yn.value	= $xml.find( "unload_sht_yn").text();
	formObj.bk_sts_cd.value	= $xml.find( "bk_sts_cd").text();
	formObj.bk_sts_nm.value	= $xml.find( "bk_sts_nm").text();
	formObj.rmk.value	= $xml.find( "rmk").text();
	formObj.ord_tp_cd.value	= $xml.find( "ord_tp_cd").text();

	//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
	if(formObj.bk_sts_cd.value == "I"){ //Booked
		formObj.bk_sts_nm.style.background = bgBooked;
	}else if(formObj.bk_sts_cd.value == "X"){ //Complete
		formObj.bk_sts_nm.style.background = bgComplete;
	}else if(formObj.bk_sts_cd.value == "C"){ //Cancel
		formObj.bk_sts_nm.style.background = bgCancel;
	}else{ //init
		formObj.bk_sts_nm.style.background = bgInit;
	}
	
	formObj.putawy_sts_nm.value	= $xml.find( "putawy_sts_nm").text();  //#1881 [BINEX WMS4.0] PUTAWAY LOCATION COLUMN ADD TO INBOUND LIST

//	if($("#trade_tp_cd")[0].value== "")
//	{
//		$("#trade_tp_cd")[0].SetSelectCode("DOM",false);
//	}
//	if($("#fwd_tp_cd")[0].value== "")
//	{
//		$("#fwd_tp_cd")[0].SetSelectCode("OTH",false);
//	}
//	if($("#ord_tp_cd")[0].value== "A")
//	{
//		ord_tp_cd_OnChange($("#ord_tp_cd")[0], "A", "");
//	}
}
//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked" - Optionized needed
var opt_chk = "N";
function checkFrtOpt(reqVal){
	var formObj=document.form;
	  var doc=getAjaxMsgXML(reqVal);

	  if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		  opt_chk=doc[1];
	  }
}
function default1RowAdd()
{
	//
	/*var row=sheet1RowAdd(sheet1);
	if(row > 0)
	{
		setTimeout("setSheet1Focus('" + row + "')", 100); //1000(1초)  100(0.1초)
	}*/
}
/*
 * Form New
 */
function btn_New()
{
	/*if($("#sel_tab").val() == "01")
	{
		//function sheet1RowAdd(sheetObj)
		if(sheet1.RowCount("I") >= 1)
		{
			//행삭제 후
			var new_row=sheet1.FindStatusRow("I");
			var arrRow=new_row.split(";");
			sheet1.RowDelete(arrRow[0], false);
		}
		var row=sheet1RowAdd(sheet1);
		setSheet1Focus(row);
	}
	else
	{*/
		//#3195 [BINEX WMS4.0] [#3100 개선] INBOUND LIST AND ENTRY SHOWING DIFF SKU
		$('#cust_ord_no').removeAttr('org_cust_ord_no');

		resetAll(true,true);
		goTabSelect("01");
	/*}*/
}
function btn_Save()
{
	//sheet2.HideSubSum();
	var formObj=document.form;
	formObj.f_cmd.value = MODIFY;
	// Freight탭인 경우
	
	//#390 [Closing In & Out Entry] Can't save data successfully
	//if ($("#sel_tab").val() == "02") {
		if(validateForm(formObj, "sheet6_save") == false)
		{
			return;
		}
	//} else {
		if(validateForm(formObj, "save") == false)
		{
			return;
		}
	//}
	
	if(saveFlg != "Grid"){
		if(ComShowCodeConfirm("COM0063") == false){
				return;
			}
	}else{
		saveFlg != "";
	}	
	var fix_Docin="";
	if(formObj.sel_wib_bk_no.value=="")
		$("#sel_wib_bk_no").val(formObj.wib_bk_no.value);
	
	var DocinDatas=fix_Docin + "sel_wib_bk_no=" + $("#sel_wib_bk_no").val();
	DocinDatas=DocinDatas + "&" + fix_Docin + "sel_tab=02" /*+ $("#sel_tab").val()*/;
	DocinDatas=DocinDatas + "&" + fix_Docin + "form_mode=" + $("#form_mode").val();
	var headerDatas="";
	/*if($("#sel_tab").val() == "01")
	{
		headerDatas= sheet1.GetSaveString(1);
	}
	else if($("#sel_tab").val() == "02")
	{*/
		headerDatas=FormQueryString(formObj);
	/*}*/
	var itemDatas= sheet2.GetSaveString(1); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
	
	//Freight Tab
	var frtDatas="";
	if (l_btn_rateFlg) {
		frtDatas= sheet6.GetSaveString(1); 
	} else {
		frtDatas= sheet6.GetSaveString(0);
	}
	
 	var saveXml=sheet2.GetSaveData("./saveWHInMgmtLongTransactionGS.clt", DocinDatas + "&" + headerDatas + "&" + itemDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
 	sheet2.LoadSaveData(saveXml);
 	
	if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
		var xmlDoc = $.parseXML(saveXml);
		var $xml = $(xmlDoc);
		var message = $xml.find("result").text();
		//ComShowMessage(message);
		//Change Save - Deleted -Confrimed - Cancel 'Successfully' to showCompleteProcess();
		var ret_wib_bk_no = $xml.find("ret_wib_bk_no").text();
		var ret_bk_sts_cd = $xml.find("ret_bk_sts_cd").text();
		var ret_rcv_cnt = $xml.find("ret_rcv_cnt").text();
		
		showCompleteProcess();
		SaveAfterProcess(ret_wib_bk_no, ret_bk_sts_cd, ret_rcv_cnt, $("#sel_tab").val(), true);
		//btn_Search();
	}
}

function SaveAfterProcess(ret_wib_bk_no, ret_bk_sts_cd, ret_rcv_cnt, sel_tab, isNotShowProcess )
{
	//var sheetObj=sheet1;
	var formObj=document.form;
	//var row=sheetObj.HeaderRows();
	/*if($("#sel_tab").val() == "01")
	{
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			if(sheetObj.GetRowStatus(i) == "I" && $("#form_mode").val() == "NEW")
			{
				sheetObj.SetRowStatus(i,"R");
				sheetObj.SetCellValue(i, fix_grid01 + "wib_bk_no",ret_wib_bk_no,0);
				sheetObj.SetCellValue(i, fix_grid01 + "bk_sts_cd",ret_bk_sts_cd,0);
				sheetObj.SetCellValue(i, fix_grid01 + "row_add","+",0);
				sheetObj.SetCellValue(i, fix_grid01 + "row_del","",0);
				sheetObj.SetCellValue(i, fix_grid01 + "unload_sht_yn","N");
				sheetObj.SetCellValue(i, fix_grid01 + "rcv_cnt",ret_rcv_cnt,0);
				//콤보박스 상태에 따라서 열기
				if(ret_rcv_cnt <= 0)
				{
					sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",1);
					sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",1);
					sheetObj.SetCellEditable(i, fix_grid01 + "est_in_dt",1);
				}
				//폰트색상 변경
 				sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
				//sheetObj.CellFontColor(i, fix_grid01 + "cust_ord_no")  = "#0100FF";
				row=i;
			}
			else
			{
				if(sheetObj.GetCellValue(i, fix_grid01 + "wib_bk_no") == ret_wib_bk_no)
				{
					sheetObj.SetCellValue(i, fix_grid01 + "bk_sts_cd",ret_bk_sts_cd,0);
					sheetObj.SetCellEditable(i, fix_grid01 + "trade_tp_cd",0);
					sheetObj.SetCellEditable(i, fix_grid01 + "fwd_tp_cd",0);
					sheetObj.SetCellEditable(i, fix_grid01 + "est_in_dt",0);
					if(sheetObj.GetCellValue(i, fix_grid01 + "rcv_cnt") == "0")
					{
						sheetObj.SetCellValue(i, fix_grid01 + "rcv_cnt",ret_rcv_cnt,0);
						if(ret_rcv_cnt <= 0)
						{
							sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",1);
							sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",1);
							sheetObj.SetCellEditable(i, fix_grid01 + "est_in_dt",1);
						}
						else
						{
							sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",0);
							sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",0);
							sheetObj.SetCellEditable(i, fix_grid01 + "est_in_dt",0);
						}
					}
					row=i;
				}
			}
		}
		sheet1_OnDblClick(sheetObj,row, sheetObj.SaveNameCol(fix_grid01 + "wib_bk_no"), sheetObj.GetCellValue(row, fix_grid01 + "wib_bk_no"));
		sheetObj.SelectCell(row, sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"))  ;
	}
	else
	{*/
		$("#bk_sts_cd").val(ret_bk_sts_cd);
		$("#wib_bk_no").val(ret_wib_bk_no);
		if(ret_bk_sts_cd == "I")
		{
			$("#bk_sts_nm").val(bk_sts_I);
			//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
			document.form.bk_sts_nm.style.background = bgBooked;
		}
		else if(ret_bk_sts_cd == "X")
		{
			$("#bk_sts_nm").val(bk_sts_X);
			//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
			document.form.bk_sts_nm.style.background = bgComplete;			
		}
		if($("#rcv_cnt").val() == "0")
		{
			$("#rcv_cnt").val(ret_rcv_cnt);
			if(ret_rcv_cnt <= 0)
			{
				formObj.ord_tp_cd.disabled =  false;
				formObj.load_tp_cd.disabled =  false;
				ComBtnEnable("btn_est_in_dt");
				ComEnableObject(document.form.est_in_dt, true);
			}
			else
			{
				formObj.ord_tp_cd.disabled =  true;
				formObj.load_tp_cd.disabled =  true;
				ComBtnEnable("btn_est_in_dt");
				ComEnableObject(document.form.est_in_dt, false);
			}
		}
		btn_show_uploading_sheet(true);
		//HeaderDataCopy("01");
		if($("#form_mode").val() == "NEW")
		{
			/*var new_row=sheetObj.FindStatusRow("I");
			var arrRow=new_row.split(";");
			sheetObj.SetRowStatus(arrRow[0],"R");
			sheetObj.SetCellValue(arrRow[0], fix_grid01 + "row_add","+",0);
			sheetObj.SetCellValue(arrRow[0], fix_grid01 + "row_del","",0);
			sheetObj.SetCellValue(arrRow[0], fix_grid01 + "unload_sht_yn","N");
			sheetObj.SetCellValue(arrRow[0], fix_grid01 + "rcv_cnt",ret_rcv_cnt,0);
			//콤보박스 상태에 따라서 열기
			if(ret_rcv_cnt <= 0)
			{
				sheetObj.SetCellEditable(arrRow[0], fix_grid01 + "ord_tp_cd",1);
				sheetObj.SetCellEditable(arrRow[0], fix_grid01 + "load_tp_cd",1);
				sheetObj.SetCellEditable(arrRow[0], fix_grid01 + "est_in_dt",1);
			}
			//폰트색상 변경
 			sheetObj.SetCellFontColor(arrRow[0], fix_grid01 + "wib_bk_no","#0100FF");
			//sheetObj.CellFontColor(arrRow[0], fix_grid01 + "cust_ord_no")  = "#0100FF";
			row=arrRow[0];*/
		}
		else
		{
			/*for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++)
			{
				if(sheetObj.GetCellValue(i, fix_grid01 + "wib_bk_no") == ret_wib_bk_no)
				{
					sheetObj.SetCellValue(i, fix_grid01 + "bk_sts_cd",ret_bk_sts_cd,0);
					sheetObj.SetCellEditable(i, fix_grid01 + "trade_tp_cd",0);
					sheetObj.SetCellEditable(i, fix_grid01 + "fwd_tp_cd",0);
					sheetObj.SetCellEditable(i, fix_grid01 + "est_in_dt",0);
					if(sheetObj.GetCellValue(i, fix_grid01 + "rcv_cnt") == "0")
					{
						sheetObj.SetCellValue(i, fix_grid01 + "rcv_cnt",ret_rcv_cnt,0);
						if(ret_rcv_cnt <= 0)
						{
							sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",1);
							sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",1);
							sheetObj.SetCellEditable(i, fix_grid01 + "est_in_dt",1);
						}
						else
						{
							sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",0);
							sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",0);
							sheetObj.SetCellEditable(i, fix_grid01 + "est_in_dt",0);
						}
					}
					row=i;
				}
			}*/
		}
		/*sheet1_OnDblClick(sheetObj,row, sheetObj.SaveNameCol(fix_grid01 + "wib_bk_no"), sheetObj.GetCellValue(row, fix_grid01 + "wib_bk_no"));
		sheetObj.SelectCell(row, sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"))  ;
		goTabSelect("02");*/
		
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
		//if(formObj.list_in_no.value==""){
			formObj.list_in_search_tp.value ="WIB_BK_NO";
			formObj.list_in_no.value = ret_wib_bk_no;
		//}
		
		
		btn_Search(isNotShowProcess);
		
		goTabSelect(sel_tab);
	/*}*/
}
function btn_Delete()
{
	var formObj=document.form;
	if($("#sel_wib_bk_no").val().trim() == ""){
		$("#sel_wib_bk_no").val($("#wib_bk_no").val())
	}
	if($("#sel_tab").val().trim() == ""){
		$("#sel_tab").val("01");
	}
	// Freight Tab인경우
	if($("#sel_tab").val() == "02")
	{
		// Form Tab이동
		goTabSelect("01");
	}
	if(validateForm(formObj, "cancel") == false)
	{
		return;
	}

	var DocinDatas="";
	var fix_Docin="Docin";
	var sheetObj=sheet2;
	/*if($("#sel_tab").val() == "01") //list tab에서 delete
	{
		var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
		var arrRow=sRow.split("|"); //결과 : "1|3|5|"
		for(var i=0; i<arrRow.length; i++)
		{
			if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "bk_sts_cd") == "C")
			{
				ComShowCodeMessage("COM0689");
				return;
			}
			
			if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "src_cd") == "E")
			{
				ComShowCodeMessage("COM0688");
				return;
			}
			
			if(i == 0)
			{
				DocinDatas=fix_Docin + "sel_wib_bk_no=" + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wib_bk_no") ;
			}
			else
			{
				DocinDatas=DocinDatas + "&" + fix_Docin + "sel_wib_bk_no=" + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wib_bk_no");
			}
		}
	}*/
	if($("#sel_tab").val() == "01")
	{
		if($("#src_cd").val() == "E")
		{
			ComShowCodeMessage("COM0688");
			return;
		}
		
		if(formObj.sel_wib_bk_no.value=="")
			formObj.sel_wib_bk_no.value = formObj.wib_bk_no.value;
		
		DocinDatas=fix_Docin + "sel_wib_bk_no=" + $("#sel_wib_bk_no").val();
	}
	else if($("#sel_tab").val() == "03")
	{
		return;
	}
	
	if(ComShowCodeConfirm("COM0424") == false){
		return;
	}
	
	formObj.f_cmd.value = REMOVE02;
 	var saveXml=sheetObj.GetSaveData("./cancelWHInMgmtBookingGS.clt", DocinDatas + "&f_cmd=" + REMOVE02);
 	sheet2.LoadSaveData(saveXml);
	if( saveXml.indexOf('<MESSAGE>') == -1){
		formObj.list_in_no.value= "";
		resetAll(true,true);
		showCompleteProcess();
	}
 	//btn_Search();
 	//resetAll(true,true);
	//1. Save 후 조회
	//SaveEnd
//	if( saveXml.indexOf('<MESSAGE>') == -1){
//		//ComShowCodeMessage("COM0079", "");		
//		DeleteAfterProcess(sheetObj, arrRow);
//	}
	////ComOpenWait(false);
}
function DeleteAfterProcess(sheetObj, arrRow)
{
	if($("#sel_tab").val() == "01") //list tab에서 delete
	{
		var cnt=0;
		var row;
		//체크된건 화면에서 row 삭제처리
		for (var i=arrRow.length-2; i>=0; i--){		
			if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wib_bk_no") == $("#sel_wib_bk_no").val())
			{
				cnt=cnt + 1;
				row=arrRow[i];
			}
			sheetObj.RowDelete(arrRow[i], false);
		}
		//체크된건 화면에서 삭제 후 row가 한건이상 존재할경우
		if(sheetObj.RowCount()> 0)
		 {
			//삭제 체크한 건중에 현재 선택된 부킹이 없다면 sheet1만 삭제하고 다음 스탭 없음.(기존 item, form, doc detail, attachment유지)
			if(cnt <= 0)
			{	
				return;
			}
			//삭제 체크한 건중에 현재 선택된 부킹이 존재한다면 첫번째 row로 재셋팅
			if(sheetObj.GetRowStatus(sheetObj.HeaderRows()) == "I")
			{	
				//선택된 행 색상 변경
				selectCellColorChange(sheetObj, sheetObj.HeaderRows());
				if($("#form_mode").val() == "NEW")
				{
					//skip
				}
				else
				{
					resetAll(false, true);
				}
			}
			else
			{
				sheet1_OnDblClick(sheetObj,sheetObj.HeaderRows(), sheetObj.SaveNameCol(fix_grid01 + "wib_bk_no"), sheetObj.GetCellValue(sheetObj.HeaderRows(), fix_grid01 + "wib_bk_no"));
				sheetObj.SelectCell(sheetObj.HeaderRows(), sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"))  ;
			}
		 }
		//체크된건 화면에서 삭제 후 row가 모두사라진경우
		 else
		 {
			 //헤더만 남겨놓고 모두 삭제 후
			 resetAll(false, true);
			 //new row기본 생성
			 //default1RowAdd();
		 }
	}
	else
	{
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++)
		{
			if(sheetObj.GetCellValue(i, fix_grid01 + "wib_bk_no") == $("#sel_wib_bk_no").val())
			{
				sheetObj.RowDelete(i, false);
			}
		}
		if(sheetObj.GetRowStatus(sheetObj.HeaderRows()) == "I")
		{
			resetAll(false, true);
		}
		else
		{
			sheet1_OnDblClick(sheetObj,sheetObj.HeaderRows(), sheetObj.SaveNameCol(fix_grid01 + "wib_bk_no"), sheetObj.GetCellValue(sheetObj.HeaderRows(), fix_grid01 + "wib_bk_no"));
			sheetObj.SelectCell(sheetObj.HeaderRows(), sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"))  ;
		}
	}
}
function btn_CCancel()
{
	var formObj=document.form;
	if($("#sel_wib_bk_no").val().trim() == "")
		{
			$("#sel_wib_bk_no").val($("#wib_bk_no").val());
		}
	
	// Freight Data Check
	//#5142 [Binex Tor] Inbound C.Cancel error
	ajaxSendPost(checkWMSFreightInfoResult, 'reqVal','&goWhere=aj&bcKey=checkWMSFreightInfo&cust_ord_no=' + formObj.cust_ord_no.value + '&wib_bk_no='+formObj.sel_wib_bk_no.value, './GateServlet.gsl');
	
}


function CCancelAfterProcess(sheetObj/*, arrRow*/, isNotShowProcess)
{
	var formObj = document.form;
	/*if($("#sel_tab").val() == "01") //list tab에서 delete
	{
		//CCancel된건은 상태값을 변경(Booked I상태로 변경)
		var cnt=0;
		var row;
		for(var i=0; i<arrRow.length; i++)
		{
			if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "bk_sts_cd") == "X")
			{
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "bk_sts_cd","I",0);
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "inbound_dt","",0);
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "inbound_hm","",0);
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "inbound_pl_qty",0,0);
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "inbound_bx_qty",0,0);
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "inbound_ea_qty",0,0);
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "inbound_sqft",0,0);
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "inbound_cbm",0,0);
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "inbound_grs_kgs",0,0);
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "inbound_net_kgs",0,0);
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "rcv_cnt","0",0);
				sheetObj.SetCellEditable(arrRow[i], fix_grid01 + "ord_tp_cd",1);
				sheetObj.SetCellEditable(arrRow[i], fix_grid01 + "load_tp_cd",1);
				if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wib_bk_no") == $("#sel_wib_bk_no").val())
				{
					cnt=cnt + 1;
					row=arrRow[i];
				}
			}
		}
		//현재 선택되어있는 부킹이 ccancl처리된경우는 하단 item과 form정보 doc detail, attachmenet정보를 새로가져온다.
		//현재 선택되어있는 부킹이 ccancel처리가 안된경우는 굳이 재조회 할필요없음.
		if(cnt > 0)
		{
			sheet1_OnDblClick(sheetObj,row, sheetObj.SaveNameCol(fix_grid01 + "wib_bk_no"), sheetObj.GetCellValue(row, fix_grid01 + "wib_bk_no"));
			sheetObj.SelectCell(row, sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"))  ;
		}
	}
	else
	{*/
		$("#bk_sts_cd").val("I");		
		$("#bk_sts_nm").val(bk_sts_I);
		//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
		document.form.bk_sts_nm.style.background = bgBooked;
		
		$("#inbound_dt").val("");
		$("#inbound_hm").val("");
		$("#rcv_cnt").val("0");
		$("#inbound_pl_qty").val("0");
		$("#inbound_bx_qty").val("0");
		$("#inbound_ea_qty").val("0");
		$("#inbound_sqft").val("0.000");
		$("#inbound_cbm").val("0.00000");
		$("#inbound_grs_kgs").val("0.000");
		$("#inbound_net_kgs").val("0.000");
		formObj.ord_tp_cd.disabled =  false;
		formObj.load_tp_cd.disabled =  false;
		/*var row;
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++)
		{
			if(sheetObj.GetCellValue(i, fix_grid01 + "wib_bk_no") == $("#sel_wib_bk_no").val())
			{
				sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",1);
				sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",1);
				row=i;
			}
		}*/
		btn_Search(isNotShowProcess);
		goTabSelect("01");
		/*sheet1_OnDblClick(sheetObj,row, sheetObj.SaveNameCol(fix_grid01 + "wib_bk_no"), sheetObj.GetCellValue(row, fix_grid01 + "wib_bk_no"));
		sheetObj.SelectCell(row, sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"))  ;
		goTabSelect("02");*/
	/*}*/
}
function btn_Putaway()
{
	var formObj=document.form;
	if($("#sel_wib_bk_no").val().trim() == "")
		$("#sel_wib_bk_no").val($("#wib_bk_no").val());
	
	if(validateForm(formObj, "putaway") == false)
	{
		return;
	}
	var sUrl="./WHPutawayPopup.clt";
	//ComOpenPopup(sUrl, 1140, 550, "setPutaway", "0,0", true);	
	//var sUrl="ContractRoutePopup.clt?ctrt_no=" + ctrt_no + "&ctrt_nm="+ctrt_nm+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd + "&pnl_svc_tp_cd=" + pnl_svc_tp_cd;
    callBackFunc ="setPutaway";    //#1881 [BINEX WMS4.0] PUTAWAY LOCATION COLUMN ADD TO INBOUND LIST
    modal_center_open(sUrl, callBackFunc, 1100, 580,"yes");
}

//#1881 [BINEX WMS4.0] PUTAWAY LOCATION COLUMN ADD TO INBOUND LIST
function setPutaway()
{
	btn_Search(); 
}
function btn_Print()
{
	var wib_bk_no="";
	var bk_sts_cd="";
	var sum_bx_label_qty=0;
	/*if($("#sel_tab").val() == "01") //list tab에서 delete
	{
		var sheetObj=sheet1;
		var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
		if (sRow == "") {
			ComShowCodeMessage("COM0253");
			return;
		}
		var arrRow=sRow.split("|"); //결과 : "1|3|5|"
		if(arrRow.length == 1)
		{
			bk_sts_cd=sheetObj.GetCellValue(arrRow[0], fix_grid01 + "bk_sts_cd"); //단일건일때는 bk_sts_cd를 가져가고, 다중건일때는 가져가지않는다.(프린트화면에서 default로 checkbox checkd처리를 위하여)
		}
		for(var i=0; i<arrRow.length; i++)
		{
			if(i == 0)
			{
				wib_bk_no="'" + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wib_bk_no") + "'";
			}
			else
			{
				wib_bk_no=wib_bk_no + ",'" + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wib_bk_no") + "'";
			}
			sum_bx_label_qty=sum_bx_label_qty + eval(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "sum_bx_label_qty"));
		}
	}
	else //if($("#sel_tab").val() == "02")
	{*/
		if($("#sel_wib_bk_no").val().trim() == "")
			$("#sel_wib_bk_no").val($("#wib_bk_no").val())
			
		if($("#sel_wib_bk_no").val().trim() == "")
		{
			ComShowCodeMessage("COM0289", "booking order");
			return;
		}
		wib_bk_no="'" + $("#sel_wib_bk_no").val() + "'";
		bk_sts_cd=$("#bk_sts_cd").val();
		sum_bx_label_qty=eval($("#sum_bx_label_qty").val());
	/*}*/
		
		//LKH::#1939 [BINEX WMS4.0] PDF EXPORTED FILE NAME
		//var sUrl="./WHInMgmtPrintOption.clt?wib_bk_no=" + wib_bk_no + "&bk_sts_cd=" + bk_sts_cd + "&sum_bx_label_qty=" + sum_bx_label_qty;
		var rpt_file_name_title = $("#cust_ord_no").val();
		var t_attachFileName = rpt_file_name_title;
		t_attachFileName = t_attachFileName.replace(/\./g, "");
		t_attachFileName = t_attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
		rpt_file_name_title = t_attachFileName;		
		var sUrl="./WHInMgmtPrintOption.clt?wib_bk_no=" + wib_bk_no + "&bk_sts_cd=" + bk_sts_cd + "&sum_bx_label_qty=" + sum_bx_label_qty + "&rpt_file_name_title=" + rpt_file_name_title
		
	
	//ComOpenPopup(sUrl, 250, 400, "setWHInMgmtPrintOption", "0,0", true);
	
	callBackFunc = "setWHInMgmtPrintOption";
	// #6421 : [Hanaro] WMS issue (Locatoin, Excel Upload, Inventory movement)
	modal_center_open(sUrl, callBackFunc, 400, 200,"yes");
}
function setWHInMgmtPrintOption(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		//
	}
}
function btn_Excel()
{
	var formObj=document.form;
	//var sheetObj=sheet1;
	
	//현재화면에 있는 부킹정보와 아이템정보를 재 조회 후 엑셀로 다운로드한다.
	var DocinDatas="";
	var fix_Docin="&Docin";
	var sheetObjExcel= sheet5;
	/*if($("#sel_tab").val() == "01") //list tab에서 delete
	{
		if(sheetObj.RowCount()<= 0)
		{
			ComShowCodeMessage("COM132501");
 			doHideProcess(false);
			return;
		}
		var fdata = sheetObj.GetCellValue(2, fix_grid01 + "wib_bk_no") ;
		if(fdata == "")
		{
			ComShowCodeMessage("COM132501");
	 			doHideProcess(false);
			return;
		}
		
		//checked 
		var sRow = sheetObj.FindCheckedRow(fix_grid01 + "chk");
		if (sRow == "") {
			DocinDatas = "";
		}else{
			var arrRow = sRow.split("|"); //결과 : "1|3|5|"
			
			
			for(var i=0; i<arrRow.length; i++)
			{
				if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wib_bk_no") != "")
				{
					if(DocinDatas == "")
					{
						DocinDatas=fix_Docin + "sel_wib_bk_no=" + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wib_bk_no") ;
					}
					else
					{
						DocinDatas=DocinDatas + ","  + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wib_bk_no");
					}
				}
			}
		}
		if(DocinDatas == "")
		{
			ComShowCodeMessage("COM132501");
	 			doHideProcess(false);
			return;
		}
	}
	else //if($("#sel_tab").val() == "02")
	{*/
		if($("#sel_wib_bk_no").val().trim() == "")
			$("#sel_wib_bk_no").val($("#wib_bk_no").val());
		
		if($("#sel_wib_bk_no").val().trim() == "")
		{
			ComShowCodeMessage("COM132501");
			//ComOpenWait(false);
			return;
		}
		DocinDatas=fix_Docin + "sel_wib_bk_no=" + $("#sel_wib_bk_no").val();
	/*}*/
	formObj.f_cmd.value = SEARCH05;
 	var sXml=sheetObjExcel.GetSearchData("./searchWHInMgmtExcelListGS.clt", FormQueryString(formObj,"") + DocinDatas);
	sheetObjExcel.LoadSearchData(sXml,{Sync:1} );
 	//sheetObjExcel.Down2Excel( {DownCols: makeHiddenSkipCol(	sheetObjExcel), SheetDesign:1,Merge:1 });
	//ComOpenWait(false);
}
function sheet5_OnSearchEnd(sheetObj){
	//mergeCell(2);
	sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(	sheetObj), SheetDesign:1,Merge:1 });
	showCompleteProcess();
}
function btn_File_Upload(){
	
	if (ComDisableTdButton("btn_file_upload", 1)) {
		return;
	}
	var formObj=document.form;
	if(formObj.wib_bk_no.value == ""){
		ComShowCodeMessage("COM132614");
		return;
	}
	if(formObj.logo_rectangle.value == "" || formObj.logo_rectangle.value == null){
		ComShowCodeMessage("COM0119");
		return;
	}
	
	formObj.f_cmd.value=ADD;
	getParam();
	submitForm();
}
/** 
 * File 선택
 */
function btn_File_Path(){
	var formObj=document.form;
	//ComSetObjValue(formObj.file_path, "");
	uploadObjects[0].AutoConfirm="DELETE_YES DOWN_OVERWRITE_YES UP_OVERWRITE_YES";
	var sParam="svc_tp_cd="+ComGetObjValue(formObj.svc_tp_cd);
	sParam += "&doc_ref_tp_cd="+ComGetObjValue(formObj.doc_ref_tp_cd);
	sParam += "&doc_tp_cd="+ComGetObjValue(formObj.doc_tp_cd);
	sParam += "&doc_ref_no="+ComGetObjValue(formObj.sel_wib_bk_no);
	sParam += "&doc_ref_no2="+ComGetObjValue(formObj.doc_ref_no2);
	uploadObjects[0].ExtendParam=sParam;
	//uploadObjects[0].AutoUpload = true;
	 	var fileLocation=sheet4.OpenFileDialog("Attachment");
	if(fileLocation == "<USER_CANCEL>"){
		//fileLocation = "";
		return ;
	}else{
		ComSetObjValue(formObj.file_path, "");
		uploadObjects[0].DeleteFile();		
	}
	ComSetObjValue(formObj.file_path, fileLocation);
	var ret=uploadObjects[0].AddFile(fileLocation);
}
/** 
 * File Delete
 */
function btn_File_Delete() {
	if (ComDisableTdButton("btn_file_delete", 1)) {
		return;
	}
	
	var formObj=document.form;
	var sheetObj=sheet4;
	var selRow=sheetObj.GetSelectRow();
	if (selRow < 1){
		ComShowCodeMessage("COM12189");
		return;
	}
	if (ComShowCodeConfirm("COM0053")) { // Do you want to delete?
		doShowProcess(true);
		setTimeout(function(){
			sheetObj.SetRowHidden(selRow,0);
			sheetObj.SetRowStatus(selRow,"D");
			var sParam=ComGetSaveString(sheetObj);
			if (sParam == "") { return; }
			var sXml=sheetObj.GetSaveData("./removeFileWHInMgmtGS.clt", sParam + "&doc_ref_no=" + ComGetObjValue(formObj.wib_bk_no) + "&f_cmd=" + REMOVE01);
	 		var strtIndxCheck = sXml.indexOf("<CHECK>") + "<CHECK>".length;
		 	var endIndxCheck = sXml.indexOf("</CHECK>");
		 	var xmlDoc = $.parseXML(sXml.substring(strtIndxCheck,endIndxCheck));
		 	var $xml = $(xmlDoc);
		    if ($xml.find( "res").text() != 'OK'){
		    	//ComShowCodeMessage("COM12201");
				var strtIndxSheet1 = sXml.indexOf("<SHEET>");
				var endIndxSheet1 = sXml.indexOf("</SHEET>") + "</SHEET>".length;
				var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
				sheetObj.LoadSearchData(sheet1Data);
		     }
		},100);
	}
	showCompleteProcess();
}
/*
 * 부킹 엑셀 업로드
 */
function excel_Upload()
{
	//var formObj = document.form;
	if (sheet2.RowCount()> 0) {
		if(ComShowCodeConfirm("COM131203")){ 
			btn_New();
		} else {
			return;
		}
	}
	var sUrl="";
	sUrl="./WHInBookingExcelUploadPopup.clt?display=none";
	callBackFunc = "calluploadexcel";
	modal_center_open(sUrl, callBackFunc, 910,490,"yes");
}
function calluploadexcel(){
	var formObj = document.form;
	getCtrtInfo(formObj.ctrt_no);
	if(!ComIsEmpty(formObj.xls_no)){
		btn_excel_Search();
		setTimeout(function(){
			showCompleteProcess();
		}, 1800);
	}
}
/*
 * 부킹 엑셀 업로드 템플릿 다운로드
 */
function excel_Download()
{
	var formObj1=document.frm1;
	var fileName="INBOUND_UPLOAD_TEMPLATE.xls";
	//formObj1.file_path.value = ;
	formObj1.file_name.value = fileName;
	document.frm1.submit();
}
/***
 * AJAX CODE SEARCH
 */
/*
 * Warehouse search
 * OnKeyDown 13 or onChange
 */
function getLocInfo(obj){
	var vClassName=document.getElementById(obj.name).className;
	if("L_input_R" == vClassName)
	{
		return;
	}
	if(sheet2.RowCount()> 0 && obj.name == "wh_cd")
	{
		//confirm
		if(ComShowCodeConfirm("COM0294") == false)
		{
			$("#wh_cd").val($("#wh_cd_org").val());
			return;
		}
		//SHEET 초기화
		sheet2.RemoveAll();
	}
	if(obj.value != ""){
		$.ajax({
			url : "searchTlLocInfo.do?loc_cd="+obj.value+"&type=WH&wh_auth=Y",
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
		if(obj.name == "list_wh_cd")
		{
			$("#list_wh_nm").val("");
		}
		else if(obj.name == "wh_cd")
		{
			$("#wh_nm").val("");
			$("#wh_cd_org").val("");
		}
	}
}
function resultLocInfo(resultXml, name){
	var formObj=document.form;
	if(name == "list_wh_cd"){
		if(getXmlDataNullToNullString(resultXml,'loc_nm') != ""){
			formObj.list_wh_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
			formObj.list_ctrt_no.value=getXmlDataNullToNullString(resultXml,'wh_ctrt_no');
			formObj.list_ctrt_nm.value=getXmlDataNullToNullString(resultXml,'wh_ctrt_nm');
			getCtrtInfo(formObj.list_ctrt_no);
		}else{
			formObj.list_wh_cd.value="";
			formObj.list_wh_nm.value="";
		}
	}
	else if(name == "wh_cd"){
		if(getXmlDataNullToNullString(resultXml,'loc_nm') != ""){
			formObj.wh_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
			formObj.wh_cd_org.value=getXmlDataNullToNullString(resultXml,'loc_cd');
			formObj.ctrt_no.value=getXmlDataNullToNullString(resultXml,'wh_ctrt_no');
			formObj.ctrt_no_org.value=getXmlDataNullToNullString(resultXml,'wh_ctrt_no');
			formObj.ctrt_nm.value=getXmlDataNullToNullString(resultXml,'wh_ctrt_nm');
			getCtrtInfo(formObj.ctrt_no);
		}else{
			formObj.wh_cd.value="";
			formObj.wh_nm.value="";
			formObj.wh_cd_org.value="";
		}
	}
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
var ctrt_name = "";
function getCtrtInfo(obj){
	ctrt_name = obj.name;
	var vClassName=document.getElementById(obj.name).className;
	if("L_input_R" == vClassName)
	{
		return;
	}
	if(sheet2.RowCount()> 0 && obj.name == "ctrt_no")
	{
		//formObj 가 선언되지 않아서 오류 발생.
		var formObj = document.form;
		if(formObj.ctrt_no.disabled == true || formObj.ctrt_no.readOnly == true) {
			return;
		}
		//confirm
		if(ComShowCodeConfirm("COM0294") == false)		//'PO/ITEM will be deleted. Are you sure you want to continue?'
		{
			$("#ctrt_no").val($("#ctrt_no_org").val());
			return;
		}
		//SHEET 초기화
		sheet2.RemoveAll();
	}
	if(obj.value != ""){
		var ord_tp_lvl1_cd="\'P\'";
		var pnl_svc_tp_cd="44";
		ajaxSendPost(resultCtrtInfo, 'reqVal', "&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no="+obj.value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd+"&pnl_svc_tp_cd=" + pnl_svc_tp_cd, './GateServlet.gsl');
	}
	else
	{
		if(obj.name == "list_ctrt_no")
		{
			$("#list_ctrt_nm").val("");
			$("#list_rtp_no").val("");
			$("#list_owner_cd").val("");
		}
		else if(obj.name == "ctrt_no")
		{
			$("#ctrt_nm").val("");
			$("#rtp_no").val("");			
			$("#ctrt_no_org").val("");
		}
	}
}
function resultCtrtInfo(reqVal) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	//var sheetObj = sheet1;
	if(doc[0]=='OK') {
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(ctrt_name == "list_ctrt_no"){
				if(rtnArr[0] != ""){
					$("#list_ctrt_nm").val(rtnArr[0]);
					$("#list_rtp_no").val(rtnArr[2]);
					$("#list_owner_cd").val(rtnArr[7]);
				}else{
					$("#list_ctrt_no").val("");
					$("#list_ctrt_nm").val("");
					$("#list_rtp_no").val("");
					$("#list_owner_cd").val("");
				}
			}
			else if(ctrt_name == "ctrt_no"){
				if(rtnArr[0] != ""){
					$("#ctrt_nm").val(rtnArr[0]);
					$("#rtp_no").val(rtnArr[2]);
					$("#owner_cd").val(rtnArr[7]);
					$("#ctrt_no_org").val(rtnArr[1]);
					/*#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION*/
					$("#lot4_alias").val(rtnArr[8]);
					$("#lot5_alias").val(rtnArr[9]);
					setGridHeaderTitleAlias(sheet2);
					searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));
				}else{		
					$("#ctrt_no").val("");
					$("#ctrt_nm").val("");
					$("#rtp_no").val("");
					$("#ctrt_no_org").val("");
				}
			}
			else if(ctrt_name =="def_wh_ctrt_no"){
				if(rtnArr[0] != ""){
					$("#def_wh_rtp_no").val(rtnArr[2]);
					$("#def_owner_cd").val(rtnArr[7]);
					searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));
				}
			}
		}
	}
}
var trdp_nm = "";
function searchTlCustInfo(name, value){
	if(value != "")
	{
		trdp_nm = name;
		ajaxSendPost(setTlCustInfo, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode"+"&s_code="+value, "./GateServlet.gsl");
	}
	else
	{
		if(name == "owner" || name == "supp" || name == "buyer"){
			$("#" + name + "_cd").val("");
			$("#" + name + "_nm").val("");
			$("#" + name + "_addr1").val("");
//			$("#" + name + "_addr2").val("");
//			$("#" + name + "_addr3").val("");
//			$("#" + name + "_addr4").val("");
//			$("#" + name + "_addr5").val("");
		}else if(name == "carrier" || name == "trucker" || nae=="bill_to"){
			$("#" + name + "_cd").val("");
			$("#" + name + "_nm").val("");
		}else if(name == "list_owner")
		{
			$("#" + name + "_cd").val("");
		}
	}
}
/*var trdp_nm = "";
function searchTlCustInfo(name, value){
	if(value != "")
	{
		trdp_nm = name;
		var s_type="";
		formObj=document.form;
		var s_code= eval("formObj."+name+"_cd").value;
		s_type="trdpCode";
		ajaxSendPost(setTlCustInfo, name, '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
	}
	else
	{
		if(name == "owner" || name == "supp" || name == "buyer"){
			$("#" + name + "_cd").val("");
			$("#" + name + "_addr1").val("");
			$("#" + name + "_addr2").val("");
			$("#" + name + "_addr3").val("");
			$("#" + name + "_addr4").val("");
			$("#" + name + "_addr5").val("");
		}else if(name == "carrier" || name == "trucker"){
			$("#" + name + "_cd").val("");
			$("#" + name + "_nm").val("");
		}else if(name == "list_owner")
		{
			$("#" + name + "_cd").val("");
		}
	}
}*/
/*function setTlCustInfo(name, sXml){
	if(name == "owner" || name == "supp" || name == "buyer"){
		$("#" + name + "_cd").val(getXmlDataNullToNullString(sXml,'cust_cd'));
		$("#" + name + "_addr1").val(getXmlDataNullToNullString(sXml,'addr1'));
		$("#" + name + "_addr2").val(getXmlDataNullToNullString(sXml,'addr2'));
		$("#" + name + "_addr3").val(getXmlDataNullToNullString(sXml,'addr3'));
		$("#" + name + "_addr4").val(getXmlDataNullToNullString(sXml,'addr4'));
		$("#" + name + "_addr5").val(getXmlDataNullToNullString(sXml,'addr5'));
	}else if(name == "carrier" || name == "trucker"){
		$("#" + name + "_cd").val(getXmlDataNullToNullString(sXml,'cust_cd'));
		$("#" + name + "_nm").val(getXmlDataNullToNullString(sXml,'cust_nm'));
	}else if(name =="list_owner")
	{
		$("#" + name + "_cd").val(getXmlDataNullToNullString(sXml,'cust_cd'));
	}
}*/
function setTlCustInfoNull(name){
	if(name == "carrier" || name == "trucker" ||name =="bill_to")
	{
		$("#" + name + "_cd").val("");
		$("#" + name + "_nm").val("");
	}
	else
	{
		$("#" + name + "_cd").val("");
		$("#" + name + "_addr1").val("");
		$("#" + name + "_addr2").val("");
		$("#" + name + "_addr3").val("");
		$("#" + name + "_addr4").val("");
		$("#" + name + "_addr5").val("");
	}
}
function searchTlCustInfoGrid(name, value, sheetObj, Row, fix_grid)
{
	if(value != "")
	{
		trdp_nm = name;
		var s_type="";
		formObj=document.form;
		var s_code= value;
		s_type="trdpCode";
		//ajaxSendPost(setTlCustInfo, name, '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		ajaxSendPost(setTlCustInfoGrid, "reqVal", '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
	}
	else
	{
		if(name == "owner" || name == "supp" || name == "buyer"){
			sheetObj.SetCellValue(Row, fix_grid + name + "_cd","",0);
			sheetObj.SetCellValue(Row, fix_grid + name + "_addr1","",0);
		}else if(name == "carrier" || name == "trucker" || name== "bill_to"){
			sheetObj.SetCellValue(Row, fix_grid + name + "_cd","",0);
			sheetObj.SetCellValue(Row, fix_grid + name + "_nm","",0);
		}
	}
}
function setTlCustInfo(reqVal, name){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var masterVals=doc[1].split('@@^');
		if(trdp_nm == "owner" || trdp_nm == "supp" || trdp_nm == "buyer"){
			$("#" + trdp_nm + "_cd").val(masterVals[0]);
			if(masterVals[1] == "")
			{
				$("#" + trdp_nm + "_addr1").val(" ");
				$("#" + trdp_nm + "_nm").val(" ");
			}
			else
			{
				$("#" + trdp_nm + "_addr1").val(masterVals[1]);
				$("#" + trdp_nm + "_nm").val(masterVals[3]);
			}
		}else if(trdp_nm == "carrier" || trdp_nm == "trucker" || trdp_nm =="bill_to"){
			$("#" + trdp_nm + "_cd").val(masterVals[0]);
			$("#" + trdp_nm + "_nm").val(masterVals[3]);
		}else if(trdp_nm =="list_owner")
		{
			$("#" + trdp_nm + "_cd").val(masterVals[0]);
		}
	}else{
		if(trdp_nm == "owner" || trdp_nm == "supp" || trdp_nm == "buyer"){
			$("#" + trdp_nm + "_cd").val("");
			$("#" + trdp_nm + "_nm").val("");
			$("#" + trdp_nm + "_addr1").val("");
		}else if(trdp_nm == "carrier" || trdp_nm == "trucker"||trdp_nm =="bill_to"){
			$("#" + trdp_nm + "_cd").val("");
			$("#" + trdp_nm + "_nm").val("");
		}else if(trdp_nm == "list_owner")
		{
			$("#" + trdp_nm + "_cd").val("");
		}
	}
	 }else{
	//REFINE THIS MESSAGE (2012.11.26)
	alert(getLabel('FMS_COM_ALT007'));	
	 }
}
function setTlCustInfoGrid(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	var sheetObj = sheet1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(trdp_nm == "owner" || trdp_nm == "supp" || trdp_nm == "buyer"){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_cd",masterVals[0],0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_nm",masterVals[3],0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr1",masterVals[1],0);
//				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr2",getXmlDataNullToNullString(sXml,'addr2'),0);
//				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr3",getXmlDataNullToNullString(sXml,'addr3'),0);
//				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr4",getXmlDataNullToNullString(sXml,'addr4'),0);
//				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr5",getXmlDataNullToNullString(sXml,'addr5'),0);
			}else if(trdp_nm == "carrier" || trdp_nm == "trucker"){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_cd",masterVals[0],0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_nm",masterVals[3],0);
			}
		}else{
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_cd","",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_nm","",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr1","",0);
			sheetObj.SelectCell(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_cd");
		}
	}else{
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_cd","",0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_nm","",0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr1","",0);
		sheetObj.SelectCell(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_cd");
	}
}
function searchTlVslInfo(name, value){
	$.ajax({
		url : "searchTlVslInfo.do?"+"code="+value,
		success : function(result) {
			if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
			}
			setTlVslInfo(name, result.xml);
		}
	});
}
function setTlVslInfo(name, sXml){
	$("#" + name + "_cd").val(getXmlDataNullToNullString(sXml,'code'));
	$("#" + name + "_nm").val(getXmlDataNullToNullString(sXml,'name'));
}
function setTlVslInfoNull(name){
	$("#" + name + "_cd").val("");
	$("#" + name + "_nm").val("");
}
function searchTlLocInfo(name, value, type){
	var formObj=document.form;
	var s_code= eval("formObj."+name).value;
	s_type="location";
	ajaxSendPost(setTlLocInfo, name, '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
}
function setTlLocInfo(name, sXml){
	$("#" + name).val(getXmlDataNullToNullString(sXml,'loc_cd'));
	$("#" + name+"_nm").val(getXmlDataNullToNullString(sXml,'loc_nm'));
}
function setTlLocInfoNull(name){
	$("#" + name).val("");
	$("#" + name+"_nm").val("");
}
/*
 * NAME 엔터시 팝업호출 - warehouse name
 * list
 * form
 */
function locationPopup(div){
	if(sheet2.RowCount()> 0 && div == fix_by_form)
	{
		//confirm
		if(ComShowCodeConfirm("COM0294") == false)
		{
			$("#wh_cd").val($("#wh_cd_org").val());
			return;
		}
		//SHEET 초기화
		sheet2.RemoveAll();
	}
	var loc_nm="";
	var loc_cd="";
	var ctrt_no="";
	var ctrt_nm="";
	if(div == fix_by_list)
	{
		loc_nm=$("#" + div + "_wh_nm").val();
		ctrt_no=$("#" + div + "_ctrt_no").val();
		ctrt_nm=$("#" + div + "_ctrt_nm").val();
	}
	else if(div == fix_by_form)
	{
		loc_cd=$("#wh_cd").val();
		ctrt_no=$("#ctrt_no").val();
		ctrt_nm=$("#ctrt_nm").val();
	}
	var sUrl="LocationPopup.do?loc_cd=" + loc_cd + "&loc_nm="+ encodeURIComponent(loc_nm) +"&type=WH_ONLY&wh_auth=Y&ctrt_no=" + ctrt_no + "&ctrt_nm=" + encodeURIComponent(ctrt_nm);
	var func="setWhInfo_" + div;
	ComOpenPopup(sUrl, 900, 650, func, "0,0", true);	
}
/*
 * NAME 엔터시 팝업호출 - contract name
 * list
 * form
 */
function CtrtPopup(div){
	var formObj = document.form;
	if(sheet2.RowCount()> 0 && div == fix_by_form)
	{
		if(formObj.ctrt_no.disabled == true || formObj.ctrt_no.readOnly == true){
			return;
		}
		//confirm
		if(ComShowCodeConfirm("COM0294") == false)
		{
			$("#ctrt_no").val($("#ctrt_no_org").val());
			return;
		}
		//SHEET 초기화
		sheet2.RemoveAll();
	}
	var ctrt_no="";
	var ctrt_nm="";
	if(div == fix_by_list)
	{
		ctrt_nm=$("#" + div + "_ctrt_nm").val();
	}
	else if(div == fix_by_form)
	{
		ctrt_no=$("#ctrt_no").val();
		ctrt_nm=$("#ctrt_nm").val();
	}
	var ord_tp_lvl1_cd="\'P\'";
	var pnl_svc_tp_cd="44";
	var sUrl="ContractRoutePopup.clt?ctrt_no=" + "&ctrt_nm="+ctrt_nm+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd + "&pnl_svc_tp_cd=" + pnl_svc_tp_cd;
    callBackFunc ="setCtrtNoInfo_" + div;
    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");

}
function setCtrtNoInfo_form_P(aryPopupData){
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	}
	
	if(sheet2.RowCount()> 0)
	{
		var formObj= document.form;
		var rtnValAry=aryPopupData.split("|");
		if(formObj.ctrt_no.disabled == true || formObj.ctrt_no.readOnly == true 
				|| rtnValAry[0] == $("#ctrt_no").val()){
			return;
		}
		//confirm
		if(!ComShowCodeConfirm("COM0294"))
		{
			return;
		}
	}
	sheet2.RemoveAll();
	setCtrtInfo(aryPopupData, fix_by_form);
}
/*
 * Customer Popup(Owner, Vendor)
 */
function CustomerPopup(name, key)
{
	if(undefined == key || 'undefined'==key|| null == key)
		key="c";
	
	var formObj=document.form;
	var sParam="cust_cd="+ComGetObjValue(eval("formObj."+name));
	sParam += "&ctrt_no="+ComGetObjValue(formObj.ctrt_no);
	sParam += "&ctrt_nm="+ComGetObjValue(formObj.ctrt_nm);
	var funName="";
	if(name == "owner_cd"){
		funName="setOwnerInfo";
	}
	else if(name == "supp_cd"){
		funName="setShipperInfo";
	}
	else if(name == "supp_addr1" || name == "supp_nm"){
		funName="setShipperInfo";
	}
	else if(name == "carrier_cd"){
		funName="setCarrierInfo";
		sParam += "&in_part_tp=P";
	}
	else if(name == "trucker_cd"){
		funName="setTruckerInfo";
		sParam += "&in_part_tp=P";
	}
	else if(name == "bill_to_cd"){
		funName="setBillToInfo";
		sParam += "&in_part_tp=P";
	}
	rtnary=new Array(2);
	rtnary[0]="1";
	
	// 2011.12.27 value parameter
	if(typeof(name)!='undefined'){
		if(key =='e')
			rtnary[1]=$("#" + name.replace("cd","nm")).val();
		else
			rtnary[1]="";	
	}else{
		rtnary[1]="";
	}
   	var sUrl="./CMM_POP_0010.clt?"+sParam;
	//ComOpenPopup(sUrl, 900, 700, funName, "0,0", true);
   	callBackFunc = funName;
    modal_center_open(sUrl, rtnary, 1150,650,"yes");
}
/*
 * Customer Popup(Owner, Vendor)
 */
/*function CustomerGridPopup(name, sheetObj, Row, Col, fix_grid)
{
var sParam="cust_cd="+ sheetObj.GetCellValue(Row, Col);
sParam += "&ctrt_no="+ sheetObj.GetCellValue(Row, fix_grid + "ctrt_no");
sParam += "&ctrt_nm="+ sheetObj.GetCellValue(Row, fix_grid + "ctrt_nm");
	var funName="";
	if(name == "owner_cd"){
		funName="setOwnerInfoGrid";
	}else if(name == "supp_cd"){
		funName="setShipperInfoGrid";
	}else if(name == "carrier_cd"){
		funName="setCarrierInfoGrid";
		sParam += "&in_part_tp=P";
	}
	else if(name == "trucker_cd"){
		funName="setTruckerInfoGrid";
		sParam += "&in_part_tp=P";
	}
   	var sUrl="CustomerPopup.do?"+sParam;
   	var sUrl="ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value + "&ctrt_no="+formObj.ctrt_no.value ;
	ComOpenPopup(sUrl, 900, 700, funName, "0,0", true, sheetObj, Row, Col);
}*/
function CustomerLocationPopup(name)
{
	var funName="";
	var nm="";
	if(name == "owner_cd"){
		funName="setOwnerLocInfo";
		nm="Owner";
	}else if(name == "supp_cd"){
		funName="setShipperLocInfo";
		nm="Vendor";
	}
	if($("#" + name).val().trim() == "")
	{
		ComShowCodeMessage("COM0125",nm);
		$("#" + name).focus();
		return;
	}
	var sUrl="LocationPopup.do?type=CL&loc_cd="+$("#" + name).val();
	ComOpenPopup(sUrl, 900, 700, funName, "0,0", true);
}
function vslPopup(){
		var formObj = document.form;
		rtnary=new Array(2);
		rtnary[0]="1";
		// 2011.12.27 value parameter
		if(typeof(formObj.vsl_cd)!='undefined'){
			rtnary[1]=formObj.vsl_nm.value;
			rtnary[2]=formObj.vsl_cd.value;
		}else{
			rtnary[1]="";
			rtnary[2]="";
		}
		callBackFunc = "setVslInfo";
		modal_center_open('./CMM_POP_0140.clt', rtnary, 656,450,"yes");
}
function podPopup(name, key)
{
	//pod
	//pol
	//del
	rtnary=new Array(3);
	rtnary[0]="";
	
	rtnary[1]="IT";
	if(typeof($("#" + name ).val())!='undefined'){
		if(key=='e')
		 rtnary[2]=$("#" + name+"_nm" ).val();
		else{
			rtnary[2]="";
		}
	}else{
		rtnary[2]="";
	}
	if(key=='e')
	rtnary[3]=$("#" + name ).val();
	else{
		rtnary[3]="";
	}
	
	callBackFunc = "setLocInfo_" + name;
	modal_center_open('./CMM_POP_0030.clt', rtnary, 810,440,"yes");

}
/*function podGridPopup(name, sheetObj, Row, Col, fix_grid)
{
	//pod
	//pol
	//del
var sUrl="LocationPopup.do?type=P&loc_cd="+sheetObj.GetCellValue(Row, Col);
	ComOpenPopup(sUrl, 900, 700, "setLocInfoGrid_" + name, "0,0", true, sheetObj, Row, Col);
}*/
/*
 * 팝업 관련 로직 시작
 */
function setWhInfo_list(aryPopupData){
	setWhInfo(aryPopupData, fix_by_list);
}
function setWhInfo_form(aryPopupData){
	setWhInfo(aryPopupData, fix_by_form);
}
function setWhInfo(aryPopupData, div)
{
	var formObj=document.form;
	if(div == fix_by_list)
	{
		$("#" + div + "_wh_cd").val(aryPopupData[0][1]);
		$("#" + div + "_wh_nm").val(aryPopupData[0][2]);
		$("#" + div + "_ctrt_no").val(aryPopupData[0][30]);
		$("#" + div + "_ctrt_nm").val(aryPopupData[0][31]);
		//if ($("#" + div + "_ctrt_no").val().trim() != "") {
			getCtrtInfo(formObj.list_ctrt_no);
		//}
	}
	else if(div == fix_by_form)
	{
		$("#wh_cd").val(aryPopupData[0][1]);
		$("#wh_cd_org").val(aryPopupData[0][1]);
		$("#wh_nm").val(aryPopupData[0][2]);
		$("#ctrt_no").val(aryPopupData[0][30]);
		$("#ctrt_no_org").val(aryPopupData[0][30]);
		$("#ctrt_nm").val(aryPopupData[0][31]);
		//if (!isNull(formObj.ctrt_no)) {
			getCtrtInfo(formObj.ctrt_no);
		//}
	}
}
function setWhInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	sheetObj.SetCellValue(row, fix_grid01 + "wh_cd",aryPopupData[0][1],0);
	sheetObj.SetCellValue(row, fix_grid01 + "wh_cd_org",aryPopupData[0][1],0);
	sheetObj.SetCellValue(row, fix_grid01 + "wh_nm",aryPopupData[0][2],0);
	sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no",aryPopupData[0][30]);
	//sheetObj.CellValue2(row, fix_grid01 + "ctrt_no_org") = aryPopupData[0][30];
	//sheetObj.CellValue2(row, fix_grid01 + "ctrt_nm") = aryPopupData[0][31];
}
function setCtrtNoInfo_list(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		setCtrtInfo(rtnVal, fix_by_list);
	}
}
function setCtrtNoInfo_form(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		setCtrtInfo(rtnVal, fix_by_form);
	}
}
function setCtrtInfo(rtnVal, div)
{
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var formObj=document.form;
		if(div == fix_by_list)
		{
			$("#" + div + "_ctrt_no").val(rtnValAry[13]);
			$("#" + div + "_ctrt_nm").val(rtnValAry[14]);
			$("#" + div + "_rtp_no").val(rtnValAry[15]);
			$("#" + div + "_owner_cd").val(rtnValAry[8]);
			var formObj=document.form;
			searchTlCustInfo("list_owner", ComGetObjValue(formObj.list_owner_cd));
			
			//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION 
			getCtrtInfo(formObj.list_ctrt_no);
		}
		else if(div == fix_by_form)
		{
			formObj.ctrt_no.value = rtnValAry[13];
			formObj.ctrt_no_org.value = rtnValAry[16];
			formObj.ctrt_nm.value = rtnValAry[14];
			formObj.rtp_no.value = rtnValAry[15];
			formObj.owner_cd.value = rtnValAry[8];
			var formObj=document.form;
			searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));

			//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION 
			getCtrtInfo(formObj.ctrt_no);
		}
	}

	
}
function setContactInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		return;
	}else{
		var rtnValAry=aryPopupData.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no",rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no_org",rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_nm",rtnValAry[1],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "rtp_no",rtnValAry[9],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "owner_cd",rtnValAry[8],0);
		searchTlCustInfoGrid("owner", rtnValAry[8], sheetObj, sheetObj.GetSelectRow(), fix_grid01);
	}
}
function setOwnerInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			var rtnValAry=rtnVal.split("|");
			setFieldValue(formObj.owner_cd,    rtnValAry[0]);
			setFieldValue(formObj.owner_nm,    rtnValAry[2]);
			setFieldValue(formObj.owner_addr1, rtnValAry[7]);
			/*$("#owner_addr2").val(rtnVal[0][10]);
			$("#owner_addr3").val(rtnVal[0][11]);
			$("#owner_addr4").val(rtnVal[0][12]);
			$("#owner_addr5").val(rtnVal[0][13]);*/
			
			
			//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
			if(formObj.bill_to_cd.value == ""){
			 	formObj.bill_to_cd.value = formObj.owner_cd.value;
			 	formObj.bill_to_nm.value = formObj.owner_nm.value;				
			}			
			
		 }
}
function setOwnerInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	sheetObj.SetCellValue(row, fix_grid01 + "owner_cd",aryPopupData[0][1],0);
	sheetObj.SetCellValue(row, fix_grid01 + "owner_addr1",aryPopupData[0][9],0);
	sheetObj.SetCellValue(row, fix_grid01 + "owner_addr2",aryPopupData[0][10],0);
	sheetObj.SetCellValue(row, fix_grid01 + "owner_addr3",aryPopupData[0][11],0);
	sheetObj.SetCellValue(row, fix_grid01 + "owner_addr4",aryPopupData[0][12],0);
	sheetObj.SetCellValue(row, fix_grid01 + "owner_addr5",aryPopupData[0][13],0);
}
function setOwnerLocInfo(aryPopupData){	
	$("#owner_addr1").val(aryPopupData[0][4]);
	$("#owner_addr2").val(aryPopupData[0][5]);
	$("#owner_addr3").val(aryPopupData[0][6]);
	$("#owner_addr4").val(aryPopupData[0][7]);
	$("#owner_addr5").val(aryPopupData[0][8]);
}
function setShipperInfo(rtnVal){
	/*$("#supp_cd").val(aryPopupData[0][1]);
	$("#supp_addr1").val(aryPopupData[0][9]);
	$("#supp_addr2").val(aryPopupData[0][10]);
	$("#supp_addr3").val(aryPopupData[0][11]);
	$("#supp_addr4").val(aryPopupData[0][12]);
	$("#supp_addr5").val(aryPopupData[0][13]);*/
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#supp_cd").val(rtnValAry[0]);
		$("#supp_nm").val(rtnValAry[2]);
		$("#supp_addr1").val(rtnValAry[7]);
	}
}
function setShipperInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	sheetObj.SetCellValue(row, fix_grid01 + "supp_cd",aryPopupData[0][1],0);
	sheetObj.SetCellValue(row, fix_grid01 + "supp_addr1",aryPopupData[0][9],0);
	sheetObj.SetCellValue(row, fix_grid01 + "supp_addr2",aryPopupData[0][10],0);
	sheetObj.SetCellValue(row, fix_grid01 + "supp_addr3",aryPopupData[0][11],0);
	sheetObj.SetCellValue(row, fix_grid01 + "supp_addr4",aryPopupData[0][12],0);
	sheetObj.SetCellValue(row, fix_grid01 + "supp_addr5",aryPopupData[0][13],0);
}
function setShipperLocInfo(aryPopupData){
	$("#supp_addr1").val(aryPopupData[0][4]);
	$("#supp_addr2").val(aryPopupData[0][5]);
	$("#supp_addr3").val(aryPopupData[0][6]);
	$("#supp_addr4").val(aryPopupData[0][7]);
	$("#supp_addr5").val(aryPopupData[0][8]);
}
function setTruckerInfo(rtnVal){
/*	$("#trucker_cd").val(aryPopupData[0][1]);
	$("#trucker_nm").val(aryPopupData[0][2]);*/
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		//var sheetObj=sheet1;
		var rtnValAry=rtnVal.split("|");
		$("#trucker_cd").val(rtnValAry[0]);
		$("#trucker_nm").val(rtnValAry[2]);
	}
}
function setBillToInfo(rtnVal){
	/*	$("#trucker_cd").val(aryPopupData[0][1]);
		$("#trucker_nm").val(aryPopupData[0][2]);*/
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
		}else{
			//var sheetObj=sheet1;
			var rtnValAry=rtnVal.split("|");
			$("#bill_to_cd").val(rtnValAry[0]);
			$("#bill_to_nm").val(rtnValAry[2]);
			
	
		}
	}
function setTruckerInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	sheetObj.SetCellValue(row, fix_grid01 + "trucker_cd",aryPopupData[0][1]);
	sheetObj.SetCellValue(row, fix_grid01 + "trucker_nm",aryPopupData[0][2]);
}
function setTruckTypeInfo(rtnVal){
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#eq_tpsz_cd").val(rtnValAry[0]);
		$("#eq_tp_cd").val(rtnValAry[2]);
		formObj.eq_no.focus();
	}
}
/*
 * type popupedit 완료후
 */
function setTruckTypeInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var sheetObj=sheet1;
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "eq_tpsz_cd",rtnValAry[0]);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "eq_tp_cd",rtnValAry[2]);
	}
}
function setVslInfo(rtnPopAry){
	var formObj = document.form;
	if(rtnPopAry == "" || rtnPopAry == undefined || rtnPopAry == "undefined"){
		return;
	}else{
		var rtnAry = rtnPopAry.split('|');
		formObj.vsl_cd.value = rtnAry[0];
		formObj.vsl_nm.value = rtnAry[1];
	}
	//$("#vsl_cd").val(aryPopupData[0][1]);
	//$("#vsl_nm").val(aryPopupData[0][2]);
}
/*function setVslInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	sheetObj.SetCellValue(row, fix_grid01 + "vsl_cd",aryPopupData[0][1]);
	sheetObj.SetCellValue(row, fix_grid01 + "vsl_nm",aryPopupData[0][2]);
}*/
function setCarrierInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		//var sheetObj=sheet1;
		var rtnValAry=rtnVal.split("|");
		$("#carrier_cd").val(rtnValAry[0]);
		$("#carrier_nm").val(rtnValAry[2]);
	}
}
function setCarrierInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	sheetObj.SetCellValue(row, fix_grid01 + "carrier_cd",aryPopupData[0][1]);
	sheetObj.SetCellValue(row, fix_grid01 + "carrier_nm",aryPopupData[0][2]);
}
function setLocInfo_pol(rtnVal){
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#pol").val(rtnValAry[0]);
		$("#pol_nm").val(rtnValAry[2]);
	}
}
function setLocInfo_pod(rtnVal){
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#pod").val(rtnValAry[0]);
		$("#pod_nm").val(rtnValAry[2]);
	}
}
function setLocInfo_del(rtnVal){
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#del").val(rtnValAry[0]);
		$("#del_nm").val(rtnValAry[2]);
	}
}
function setLocInfoGrid_pol(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	sheetObj.SetCellValue(row, fix_grid01 + "pol",aryPopupData[0][1]);
	sheetObj.SetCellValue(row, fix_grid01 + "pol_nm",aryPopupData[0][2]);
}
function setLocInfoGrid_pod(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	sheetObj.SetCellValue(row, fix_grid01 + "pod",aryPopupData[0][1]);
	sheetObj.SetCellValue(row, fix_grid01 + "pod_nm",aryPopupData[0][2]);
}
function setLocInfoGrid_del(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	sheetObj.SetCellValue(row, fix_grid01 + "del",aryPopupData[0][1]);
	sheetObj.SetCellValue(row, fix_grid01 + "del_nm",aryPopupData[0][2]);
}
function setItemGrid(rtnVal, row, col, sheetIdx){
	var sheetObj=sheet2;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			var aryPopupData = rtnVal.split("|");
			var prefix="Grd01";
			var row = sheetObj.GetSelectRow();
			sheetObj.SetCellValue(row, fix_grid02 + "item_cd",aryPopupData[0],0);
			sheetObj.SetCellValue(row, fix_grid02 + "item_nm",aryPopupData[1],0);
			sheetObj.SetCellValue(row, fix_grid02 + "ctrt_no",aryPopupData[2],0);
			sheetObj.SetCellValue(row, fix_grid02 + "item_sys_no",aryPopupData[3],0);
			sheetObj.SetCellValue(row, fix_grid02 + "lot_no",aryPopupData[4],0);
			sheetObj.SetCellValue(row, fix_grid02 + "lv1_cbm",aryPopupData[8],0);
			sheetObj.SetCellValue(row, fix_grid02 + "lv1_cbf",aryPopupData[9],0);
			sheetObj.SetCellValue(row, fix_grid02 + "lv1_grs_kgs",aryPopupData[10],0);
			sheetObj.SetCellValue(row, fix_grid02 + "lv1_grs_lbs",aryPopupData[11],0);
			sheetObj.SetCellValue(row, fix_grid02 + "lv1_net_kgs",aryPopupData[12],0);
			sheetObj.SetCellValue(row, fix_grid02 + "lv1_net_lbs",aryPopupData[13],0);
			sheetObj.SetCellValue(row, fix_grid02 + "pkg_lv1_qty",aryPopupData[7],0);
			sheetObj.SetCellValue(row, fix_grid02 + "pkg_lv1_unit_cd",aryPopupData[15],0);
			sheetObj.SetCellValue(row, fix_grid02 + "pkg_lv2_qty",aryPopupData[5],0);
			sheetObj.SetCellValue(row, fix_grid02 + "pkg_lv2_unit_cd",aryPopupData[6],0);
			sheetObj.SetCellValue(row, fix_grid02 + "pkg_lv3_qty",aryPopupData[16],0);
			sheetObj.SetCellValue(row, fix_grid02 + "pkg_lv3_unit_cd",aryPopupData[17],0);
			sheetObj.SetCellValue(row, fix_grid02 + "pkg_lv4_qty",aryPopupData[18],0);
			sheetObj.SetCellValue(row, fix_grid02 + "pkg_lv4_unit_cd",aryPopupData[19],0);
			sheetObj.SetCellValue(row, fix_grid02 + "pkg_info",aryPopupData[20],0);
			sheetObj.SetCellValue(row, fix_grid02 + "curr_cd",aryPopupData[21],0);
			sheetObj.SetCellValue(row, fix_grid02 + "item_unit_price",aryPopupData[22],0);
			sheetObj.SetCellValue(row, fix_grid02 + "fix_loc_cd",aryPopupData[26],0);
			sheetObj.SetCellValue(row, fix_grid02 + "fix_loc_nm",aryPopupData[27],0);
			if( aryPopupData[25] != "")
			{
				sheetObj.SetCellValue(row, fix_grid02+"inbound_loc_cd",aryPopupData[25],0);
				sheetObj.SetCellValue(row, fix_grid02+"inbound_loc_nm",aryPopupData[26],0);
				sheetObj.SetCellEditable(row, fix_grid02 + "dmg_pkgunit",0);
				sheetObj.SetCellEditable(row, fix_grid02 + "dmg_pkgqty",0);
				sheetObj.SetCellEditable(row, fix_grid02 + "dmg_loc_nm",0);
				sheetObj.SetCellValue(row, fix_grid02 + "dmg_pkgunit","",0);
				sheetObj.SetCellValue(row, fix_grid02 + "dmg_pkgqty",0,0);
				sheetObj.SetCellValue(row, fix_grid02 + "dmg_loc_nm","",0);
			}
			else
			{
				sheetObj.SetCellValue(row, fix_grid02+"inbound_loc_cd",aryPopupData[27],0);
				sheetObj.SetCellValue(row, fix_grid02+"inbound_loc_nm",aryPopupData[28],0);
				sheetObj.SetCellEditable(row, fix_grid02 + "dmg_pkgunit",1);
				sheetObj.SetCellEditable(row, fix_grid02 + "dmg_pkgqty",1);
				sheetObj.SetCellEditable(row, fix_grid02 + "dmg_loc_nm",1);
			}
			if (!ComIsNull(aryPopupData[0][2])) {	
//				sheetObj.SetCellEditable(row, fix_grid02 + "item_nm",0);
			}
			resetLotInfo(sheetObj, row);
			settring_ea_qty(sheetObj, row, aryPopupData[0], "", "");
		 }
}
function setPkgunitGrid(rtnVal){
	var sheetObj=sheet2;
	var prefix=fix_grid02;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
			 sheetObj.SetCellValue(sheetObj.GetSelectRow() , prefix+"item_pkgunit",rtnValArr[1],0);
			 settring_ea_qty(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_cd"), "", "");
		 }
}
function setPkgunitGrid_snd_pkgunit(rtnVal){
	var sheetObj=sheet2;
	var prefix=fix_grid02;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValArr = rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow() , prefix+"snd_pkgunit",rtnValArr[1],0);
		settring_ea_qty(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_cd"), "", "");
	}
}
function setPkgunitGrid_dmg_pkgunit(rtnVal){
	var sheetObj=sheet2;
	var prefix=fix_grid02;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValArr = rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow() , prefix+"dmg_pkgunit",rtnValArr[1],0);
		settring_ea_qty(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_cd"), "", "");
	}
}
function setSndPkgunitGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet2;
	sheetObj.SetCellValue(row , col,aryPopupData[0][2],0);
	settring_ea_qty(sheetObj, row, sheetObj.GetCellValue(row, fix_grid02 + "item_cd"), "", "");
}
function setDmgPkgunitGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet2;
	sheetObj.SetCellValue(row , col,aryPopupData[0][2],0);
	settring_ea_qty(sheetObj, row, sheetObj.GetCellValue(row, fix_grid02 + "item_cd"), "", "");
}
function setInboundLocInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet2;
	//sheetObj.SetCellValue(row , fix_grid02+"inbound_loc_cd",aryPopupData[0][1],0);// wh_loc_cd
	//sheetObj.SetCellValue(row , col,aryPopupData[0][2],0);// wh_loc_nm
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
	}else{
	aryPopupData = aryPopupData.split("|");
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"inbound_loc_cd",aryPopupData[0],0);// wh_loc_cd
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),aryPopupData[1],0);// wh_loc_nm
//	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"to_wh_loc_prop_cd",aryPopupData[3],0);//prop_cd
//	var prop_cd=aryPopupData[3];
//	var to_mv_tp_cd="MV";
//	var to_mv_tp_cd_nm="Normal";
//	if (prop_cd == "DMG" || prop_cd == "HLD") //Damage, Hold일경우는는 팝업에서 넣어주는 코드값과 코드명으로 사용
//	{
//		to_mv_tp_cd=prop_cd;
//		to_mv_tp_cd_nm=aryPopupData[4];
//	}
//	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"to_mv_tp_cd",to_mv_tp_cd,0);//to location status
//	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"to_mv_tp_cd_nm",to_mv_tp_cd_nm,0);//to location status name
	}
}
function setDamageLocInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet2;
	//sheetObj.SetCellValue(row , fix_grid02+"dmg_loc_cd",aryPopupData[0][1],0);// wh_loc_cd
	//sheetObj.SetCellValue(row , col,aryPopupData[0][2],0);// wh_loc_nm
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
	}else{
	aryPopupData = aryPopupData.split("|");
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"dmg_loc_cd",aryPopupData[0],0);// wh_loc_cd
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),aryPopupData[1],0);// wh_loc_nm
	}
}
function setLotInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
	}else{
		var rtnValArr = rtnVal.split("|");
		var sheetObj=sheet2;
		var row = sheet2.GetSelectRow();
	sheetObj.SetCellValue(row , fix_grid02+"inbound_dt",rtnValArr[2],0);
	sheetObj.SetCellValue(row , fix_grid02+"lot_no",rtnValArr[3],0);
	sheetObj.SetCellValue(row , fix_grid02+"exp_dt",rtnValArr[4],0);
	sheetObj.SetCellValue(row , fix_grid02+"lot_04",rtnValArr[5],0);
	sheetObj.SetCellValue(row , fix_grid02+"lot_05",rtnValArr[6],0);
	sheetObj.SetCellValue(row , fix_grid02+"lot_id",rtnValArr[7],0);
	//lot id
	//sheetObj.CellEditable(row, fix_grid02 + "lot_id") = false;
 	//sheetObj.PopupButtonImage(row, fix_grid02 + "lot_id")=1;
	sheetObj.SetCellEditable(row, fix_grid02 + "inbound_dt",0);
	sheetObj.SetCellEditable(row, fix_grid02 + "lot_no",0);
	sheetObj.SetCellEditable(row, fix_grid02 + "exp_dt",0);
	sheetObj.SetCellEditable(row, fix_grid02 + "lot_04",0);
	sheetObj.SetCellEditable(row, fix_grid02 + "lot_05",0);
	}
}
function setCurrCdGrid(aryPopupData, row, col, sheetIdx)
{
	var sheetObj=sheet2;
	sheetObj.SetCellValue(row , col,aryPopupData[0][2],0);
}
/*
 * 팝업 관련 로직 끝
 */
function btn_seal(){
	var formObj=document.form;
	if (document.all.showseal.style.display == "none") {
		document.all.showseal.style.display="block";
		document.all.showseal.style.visibility='visible';
		var seal_no=formObj.seal_no.value.split(",");
		if(seal_no[0] != undefined && seal_no[0] != ""){
			formObj.seal_no1.value=seal_no[0];
		}
		if(seal_no[1] != undefined && seal_no[1] != ""){
			formObj.seal_no2.value=seal_no[1];
		}
		if(seal_no[2] != undefined && seal_no[2] != ""){
			formObj.seal_no3.value=seal_no[2];
		}
		formObj.seal_no1.focus();
	}
}
function btn_seal_OK(){
	var formObj=document.form;
	var seal_no="";
	if(formObj.seal_no1.value != ""){
		seal_no += formObj.seal_no1.value;
	}
	if(formObj.seal_no2.value != ""){
		seal_no += ","+formObj.seal_no2.value;
	}
	if(formObj.seal_no3.value != ""){
		seal_no += ","+formObj.seal_no3.value;
	}
	formObj.seal_no.value=seal_no;
	document.all.showseal.style.display="none";
	document.all.showseal.style.visibility='hidden';
}
function btn_seal_Close(){
	document.all.showseal.style.display="none";
	document.all.showseal.style.visibility='hidden';
}
function btn_addr_info(name){
	if (document.all.showaddr.style.display == "none") {
		document.all.showaddr.style.display="block";
		document.all.showaddr.style.visibility='visible';
		$("#addr1").val($("#" + name + "_addr1").val());
		/*$("#addr2").val($("#" + name + "_addr2").val());
		$("#addr3").val($("#" + name + "_addr3").val());
		$("#addr4").val($("#" + name + "_addr4").val());
		$("#addr5").val($("#" + name + "_addr5").val());*/
		$("#addr_name").val(name);
		$("#addr1").focus();
	}
}
function btn_addr_OK(){
	var name=$("#addr_name").val();
	$("#" + name + "_addr1").val($("#addr1").val());
	/*$("#" + name + "_addr2").val($("#addr2").val());
	$("#" + name + "_addr3").val($("#addr3").val());
	$("#" + name + "_addr4").val($("#addr4").val());
	$("#" + name + "_addr5").val($("#addr5").val());*/
	document.all.showaddr.style.display="none";
	document.all.showaddr.style.visibility='hidden';
}
function btn_addr_Close(){
	document.all.showaddr.style.display="none";
	document.all.showaddr.style.visibility='hidden';
}
/**
 * 
 * @param showFlg
 */
function btn_show_uploading_sheet(showFlg) {
	if (showFlg) {
		ComBtnEnable("btn_create_uploading_sheet");
		setEnableUnloadSht("btn_document_uploading_sheet", false, 5);
	}else{
		ComBtnDisable("btn_create_uploading_sheet");
		setEnableUnloadSht("btn_document_uploading_sheet", true, 5);
	}
}
/**
 * Unloading Sheet Doc icon 활성화 여부
 */
function setEnableUnloadSht(btId, bEnable, flg)
{
	if (flg == 5) {
	    if (bEnable) {
	        document.getElementById(btId).src="web/img/main/icon_doc.gif";
	        document.getElementById(btId).disabled=false;
	    } else {
	        document.getElementById(btId).src="web/img/main/icon_doc_g.gif";
	    	document.getElementById(btId).disabled=true;
	    }
	}
}
function btn_uploading_sheet()
{
	var formObj=document.form;
	WorkShtPopup(ComGetObjValue(formObj.wib_bk_no));
}
function WorkShtPopup(wib_bk_no)
{
	var sUrl="./WHInWorkSht.clt?wib_bk_no=" + wib_bk_no;
	callBackFunc = "";
	modal_center_open(sUrl, callBackFunc, 910,400,"yes");
}
function setWorkShtInfo(unload_sht_yn, wib_bk_no)
{
	var formObj = document.form;
	if(formObj.sel_wib_bk_no.value=="")
		 $("#sel_wib_bk_no").val(formObj.wib_bk_no.value);
	
	if(wib_bk_no ==  $("#sel_wib_bk_no").val())
	{
		//flg값 변경
		$("#unload_sht_yn").val(unload_sht_yn);
		//form탭의 값 변경
		if(unload_sht_yn == "Y")
		{
			btn_show_uploading_sheet(false);
		}
		else
		{
			btn_show_uploading_sheet(true);
		}
	}
	/*//list탭의 값 변경
	var sheetObj=sheet1;
	var row=sheetObj.FindText(fix_grid01 + "wib_bk_no", wib_bk_no, sheetObj.HeaderRows(), -1, true);
	if(row == -1)
	{
		return;
	}
	sheetObj.SetCellValue(row, fix_grid01 + "unload_sht_yn",unload_sht_yn);*/
}
function form_tab_new_setting()
{
	//=====value 값 관련 셋팅 =============
	//form mode 변경
	$("#form_mode").val("NEW");
	//form tab의 input filed clear
	$('#divForm').children().find('input').each(function(){
		   $(this).val('');
		});
	$("#rmk").val("");
	$("#bk_sts_cd").val("N");
	$("#bk_sts_nm").val(bk_sts_N);
	//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
	document.form.bk_sts_nm.style.background = bgInit;
	
	$("#rcv_cnt").val("0");
	//default value 셋팅
	$("#wh_cd").val($("#def_wh_cd").val());
	$("#wh_nm").val($("#def_wh_nm").val());
	$("#ctrt_no").val($("#def_wh_ctrt_no").val());
	$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
	var formObj=document.form;	
	if($("#ctrt_no").val().trim() != "" && $("#rtp_no").val().trim() == "")
	{
		if (!isNull(formObj.ctrt_no)) {
			getCtrtInfo(formObj.ctrt_no);
		}
	}
	else
	{
		/*$("#rtp_no").val($("#list_rtp_no").val());
		$("#owner_cd").val($("#list_owner_cd").val());*/
		searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));
	}
	$("#wh_cd_org").val($("#wh_cd").val());
	$("#ctrt_no_org").val($("#ctrt_no").val());	
	//ibcombo index = 0 셋팅
	$("#ord_tp_cd").val("G");
	$("#load_tp_cd").val("F");
	$("#trade_tp_cd").val("DOM");
	$("#fwd_tp_cd").val("OTH");
	$("#bk_sts_nm").val("Initial");
	//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
	document.form.bk_sts_nm.style.background = bgInit;
	//inbound summary 숫자필드셋팅
	$("#inbound_pl_qty").val("0");
	$("#inbound_bx_qty").val("0");
	$("#inbound_ea_qty").val("0");
	$("#inbound_sqft").val("0.000");
	$("#inbound_cbm").val("0.00000");
	$("#inbound_grs_kgs").val("0.000");
	$("#inbound_net_kgs").val("0.000");
	//날짜 기본셋팅
	$("#bk_date").val(ComGetNowInfo());
	$("#est_in_dt").val(ComGetNowInfo());
	//unloading sheet button 셋팅
	ComBtnDisable("btn_create_uploading_sheet");
	setEnableUnloadSht("btn_document_uploading_sheet", false, 5);
	
	//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
	// Freight Tab Button
	if (opt_chk == "Y"){
		ComBtnDisable("btn_rating");
		ComBtnEnable("btn_frtAdd");	
	 	formObj.bill_to_cd.value = formObj.owner_cd.value;
	 	formObj.bill_to_nm.value = formObj.owner_nm.value;
	}
 	
 	//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
 	fn_getWh_CurrCd();
 	formObj.s_sts_nm.value = "New";
 	
	//=====field readonly 셋팅 =============
	form_tab_field_enable(true);
	$("#cust_ord_no").focus();
}
function form_tab_field_enable(flg)
{
	var formObj=document.form;
	var newflg;
	if(flg == true){
		newflg = false;
	}else{newflg = true;}
	
	ComEnableObject(formObj.wh_cd, flg);
	ComEnableObject(formObj.ctrt_no, flg);
	ComEnableObject(formObj.ctrt_nm, flg);
	ComEnableObject(formObj.owner_cd, flg);
	
	
	ComEnableButton("btn_wh_cd",	flg);
	ComEnableButton("btn_ctrt_no",	flg);
	ComEnableButton("btn_owner_cd",	flg);
	ComEnableButton("btn_owner_loc", flg);
	ComEnableButton("btn_supp_cd",	flg);
	debugger;
	if($("#bk_sts_cd").val() != "X"){
		ComEnableObject(formObj.supp_cd, true);
		ComBtnEnable('btn_supp_cd');
		ComEnableObject(formObj.supp_nm, true);
	}else{
		ComEnableObject(formObj.supp_cd, false);
		ComBtnDisable("btn_supp_cd");
		ComEnableObject(formObj.supp_nm, false);
	}
	//##########################################
	if(flg == false && $("#bk_sts_cd").val() == "N" && $("#src_cd").val() != "E")
	{
		//$("#ord_tp_cd")[0].Enable = true;
		//$("#load_tp_cd")[0].Enable = true;
		//$("#trade_tp_cd")[0].Enable = true;
		//$("#fwd_tp_cd")[0].Enable = true;
		formObj.ord_tp_cd.disabled =  false;
		formObj.load_tp_cd.disabled =  false;
		formObj.trade_tp_cd.disabled =  false;
		formObj.fwd_tp_cd.disabled =  false;
		ComBtnEnable("btn_est_in_dt");
		ComEnableObject(formObj.est_in_dt, true);
		ComEnableObject(formObj.supp_cd, true);
		
	}
	else if($("#src_cd").val() != "E")
	{
	
		/*$("#ord_tp_cd")[0].Enable = flg;
		$("#load_tp_cd")[0].Enable = flg;
		$("#trade_tp_cd")[0].Enable = flg;
		$("#fwd_tp_cd")[0].Enable = flg;*/
		formObj.ord_tp_cd.disabled =  newflg;
		formObj.load_tp_cd.disabled =  newflg;
		formObj.trade_tp_cd.disabled =  newflg;
		formObj.fwd_tp_cd.disabled =  newflg;
		
		ComEnableButton("btn_est_in_dt", flg);
		ComEnableObject(formObj.est_in_dt, flg);
		
	}
	
	if($("#src_cd").val() == "E")
	{
		ComEnableObject(formObj.cust_ord_no, false);
		ComEnableObject(formObj.est_in_dt, false);
		ComBtnDisable("btn_est_in_dt");
		ComEnableObject(formObj.est_in_hm, false);
		ComEnableObject(formObj.bk_date, false);
		ComBtnDisable("btn_bk_date");
		ComEnableObject(formObj.owner_addr1, false);
		ComEnableObject(formObj.owner_addr2, false);
		ComEnableObject(formObj.owner_addr3, false);
		ComEnableObject(formObj.owner_addr4, false);
		ComEnableObject(formObj.owner_addr5, false);
		ComEnableObject(formObj.supp_addr1, false);
		ComEnableObject(formObj.supp_addr2, false);
		ComEnableObject(formObj.supp_addr3, false);
		ComEnableObject(formObj.supp_addr4, false);
		ComEnableObject(formObj.supp_addr5, false);
		
		formObj.ord_tp_cd.disabled =  true;
		formObj.load_tp_cd.disabled =  true;
		formObj.trade_tp_cd.disabled =  true;
		formObj.fwd_tp_cd.disabled =  true;
	}
	else
	{
		ComEnableObject(formObj.cust_ord_no, true);
		ComEnableObject(formObj.est_in_hm, true);
		ComEnableObject(formObj.bk_date, true);
		ComBtnEnable("btn_bk_date");
		ComEnableObject(formObj.owner_addr1, true);
		ComEnableObject(formObj.supp_addr1, true);
	}
}
function ComEnableButton(btId, bEnable){
    if (bEnable) {
        ComBtnEnable(btId);
    } else {
    	ComBtnDisable(btId);
    }
}

function settring_ea_qty(sheetObj, Row, item_cd, div, item_col)
{
	if(item_cd == "")
	{
		sheetObj.SetCellValue(Row, fix_grid02 + "item_sys_no","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_nm","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "fix_loc_cd","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "fix_loc_cd_nm","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_ea_qty",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "in_item_ea_qty",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "in_item_pe_qty",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "bx_label_qty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "os_item_ea_qty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "snd_ea_qty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "dmg_ea_qty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_cbm",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_cbf",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_grs_kgs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_grs_lbs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_net_kgs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_net_lbs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "snd_item_cbm",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "snd_item_cbf",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "snd_item_grs_kgs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "snd_item_grs_lbs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "snd_item_net_kgs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "snd_item_net_lbs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "dmg_item_cbm",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "dmg_item_cbf",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "dmg_item_grs_kgs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "dmg_item_grs_lbs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "dmg_item_net_kgs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "dmg_item_net_lbs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_info","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv1_qty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv1_unit_cd","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv2_qty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv2_unit_cd","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv3_qty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv3_unit_cd","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv4_qty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv4_unit_cd","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "lv1_cbm","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "lv1_cbf","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "lv1_grs_kgs","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "lv1_grs_lbs","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "lv1_net_kgs","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "lv1_net_lbs","",0);
		// OFVFOUR-8145 [MTS] Quantity of Items show negative number on Closing Storage Entry
		sheetObj.SetCellEditable(Row, fix_grid02 + "item_nm",0);
		return;
	}
	if(sheetObj.GetCellValue(Row, fix_grid02 + "item_sys_no").trim() != "")
	{
		if( sheetObj.GetCellValue(Row, fix_grid02+"pkg_info").indexOf(sheetObj.GetCellValue(Row, fix_grid02+"item_pkgunit"))	== -1 ||
				sheetObj.GetCellValue(Row, fix_grid02+"pkg_info").indexOf(sheetObj.GetCellValue(Row, fix_grid02+"snd_pkgunit"))	== -1 ||
				sheetObj.GetCellValue(Row, fix_grid02+"pkg_info").indexOf(sheetObj.GetCellValue(Row, fix_grid02+"dmg_pkgunit"))	== -1
		   )
		{
			if(item_col != fix_grid02 + "item_cd_dummy")
			{
				ComShowCodeMessage("COM0344");
			}
			if(sheetObj.GetCellValue(Row, fix_grid02+"pkg_info").indexOf(sheetObj.GetCellValue(Row, fix_grid02+"item_pkgunit"))	== -1)
			{
				sheetObj.SetCellValue(Row, fix_grid02 + "item_pkgunit","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "item_ea_qty",0,0);
				sheetObj.SelectCell(Row, fix_grid02 + "item_pkgunit");
			}
			if(sheetObj.GetCellValue(Row, fix_grid02+"pkg_info").indexOf(sheetObj.GetCellValue(Row, fix_grid02+"snd_pkgunit"))	== -1)
			{
				sheetObj.SetCellValue(Row, fix_grid02 + "snd_pkgunit","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "snd_ea_qty",0,0);
				sheetObj.SelectCell(Row, fix_grid02 + "snd_pkgunit");
			}
			if(sheetObj.GetCellValue(Row, fix_grid02+"pkg_info").indexOf(sheetObj.GetCellValue(Row, fix_grid02+"dmg_pkgunit"))	== -1)
			{
				sheetObj.SetCellValue(Row, fix_grid02 + "dmg_pkgunit","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "dmg_ea_qty",0,0);
				sheetObj.SelectCell(Row, fix_grid02 + "dmg_pkgunit");
			}
		}
	}
//	if(sheetObj.CellValue(Row, fix_grid02+"pkg_info").indexOf(sheetObj.cellValue(Row, fix_grid02+"item_pkgunit"))	== -1)
//	{
//		sheetObj.CellValue2(Row, fix_grid02 + "item_ea_qty") = 0;
//		sheetObj.CellValue(Row, fix_grid02 + "in_item_ea_qty") = 0;
//		sheetObj.CellValue(Row, fix_grid02 + "in_item_pe_qty")  = 0;
//		sheetObj.CellValue2(Row, fix_grid02 + "bx_label_qty")  = 0;
//		sheetObj.CellValue2(Row, fix_grid02 + "os_item_ea_qty") = 0		
//		sheetObj.CellValue2(Row, fix_grid02 + "item_cbm") = 0;
//		sheetObj.CellValue2(Row, fix_grid02 + "item_cbf") = 0;
//		sheetObj.CellValue2(Row, fix_grid02 + "item_grs_kgs") = 0;
//		sheetObj.CellValue2(Row, fix_grid02 + "item_grs_lbs") = 0;
//		sheetObj.CellValue2(Row, fix_grid02 + "item_net_kgs") = 0;
//		sheetObj.CellValue2(Row, fix_grid02 + "item_net_lbs") = 0;
//
//		//if(div == "UNIT")
//		//{
//			
//			if(sheetObj.CellValue(Row, fix_grid02 + "item_sys_no").trim() != "")
//			{
//				if(item_col != fix_grid02 + "item_cd_dummy")
//				{
//					ComShowCodeMessage("COM0344");
//				}
//				sheetObj.CellValue2(Row, fix_grid02 + "item_pkgunit") = "";
//				sheetObj.SelectCell(Row, fix_grid02 + "item_pkgunit");
//			}
//			
//						
//			
//		//}
//		
//		
//		return;
//	}
	//estimated ea 환산
	var est_qty=calc_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02 + "item_pkgunit"), sheetObj.GetCellValue(Row, fix_grid02 + "item_pkgqty"));
	sheetObj.SetCellValue(Row, fix_grid02 + "item_ea_qty",est_qty,0);
	//received ea 환산
	var snd_qty=calc_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02 + "snd_pkgunit"), sheetObj.GetCellValue(Row, fix_grid02 + "rcv_pkgqty"));
	var dmg_qty=calc_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02 + "dmg_pkgunit"), sheetObj.GetCellValue(Row, fix_grid02 + "dmg_pkgqty"));
	var rcv_qty=snd_qty + dmg_qty;
	sheetObj.SetCellValue(Row, fix_grid02 + "in_item_ea_qty",rcv_qty);
	sheetObj.SetCellValue(Row, fix_grid02 + "snd_ea_qty",snd_qty);
	sheetObj.SetCellValue(Row, fix_grid02 + "dmg_ea_qty",dmg_qty);
	//OS
	if(rcv_qty > 0 || (sheetObj.GetCellValue(Row, fix_grid02 + "bk_sts_cd") == "X" && sheetObj.GetCellValue(Row, fix_grid02 + "inbound_dt").trim() != ""))
	{
		var os=rcv_qty - est_qty;
		sheetObj.SetCellValue(Row, fix_grid02 + "os_item_ea_qty",os,0);
	}
	else
	{
		sheetObj.SetCellValue(Row, fix_grid02 + "os_item_ea_qty",0,0);
	}
	//measure
	var qty=0;
	if(rcv_qty > 0)
	{
		qty=rcv_qty;
	}
	else
	{
		qty=est_qty;
	}
	var pkg_lv1_qty=eval(sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv1_qty"));
	var lv1_cbm=eval(sheetObj.GetCellValue(Row, fix_grid02 + "lv1_cbm"));
	var lv1_cbf=eval(sheetObj.GetCellValue(Row, fix_grid02 + "lv1_cbf"));
	var lv1_grs_kgs=eval(sheetObj.GetCellValue(Row, fix_grid02 + "lv1_grs_kgs"));
	var lv1_grs_lbs=eval(sheetObj.GetCellValue(Row, fix_grid02 + "lv1_grs_lbs"));
	var lv1_net_kgs=eval(sheetObj.GetCellValue(Row, fix_grid02 + "lv1_net_kgs"));
	var lv1_net_lbs=eval(sheetObj.GetCellValue(Row, fix_grid02 + "lv1_net_lbs"));
	
	//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (S)
	//sheetObj.SetCellValue(Row,  fix_grid02 + "item_cbm",Math.round((pkg_lv1_qty * qty) * lv1_cbm * 1000)/1000);
	//sheetObj.SetCellValue(Row,  fix_grid02 + "item_cbf",Math.round((pkg_lv1_qty * qty) * lv1_cbf * 1000)/1000,0);
	sheetObj.SetCellValue(Row,  fix_grid02 + "item_cbm", parseFloat(pkg_lv1_qty * qty * lv1_cbm).toFixed(WMS_CBM_POINT_COUNT));
	sheetObj.SetCellValue(Row,  fix_grid02 + "item_cbf", parseFloat(pkg_lv1_qty * qty * lv1_cbf).toFixed(WMS_CBM_POINT_COUNT));
	sheetObj.SetCellValue(Row,  fix_grid02 + "item_grs_kgs",Math.round((pkg_lv1_qty * qty) * lv1_grs_kgs * 1000)/1000);
	sheetObj.SetCellValue(Row,  fix_grid02 + "item_grs_lbs",Math.round((pkg_lv1_qty * qty) * lv1_grs_lbs * 1000)/1000,0);
	sheetObj.SetCellValue(Row,  fix_grid02 + "item_net_kgs",Math.round((pkg_lv1_qty * qty) * lv1_net_kgs * 1000)/1000);
	sheetObj.SetCellValue(Row,  fix_grid02 + "item_net_lbs",Math.round((pkg_lv1_qty * qty) * lv1_net_lbs * 1000)/1000,0);
	//sheetObj.SetCellValue(Row,  fix_grid02 + "snd_item_cbm",Math.round((pkg_lv1_qty * snd_qty) * lv1_cbm * 1000)/1000,0);
	//sheetObj.SetCellValue(Row,  fix_grid02 + "snd_item_cbf",Math.round((pkg_lv1_qty * snd_qty) * lv1_cbf * 1000)/1000,0);
	sheetObj.SetCellValue(Row,  fix_grid02 + "snd_item_cbm", parseFloat(pkg_lv1_qty * snd_qty * lv1_cbm).toFixed(WMS_CBM_POINT_COUNT));
	sheetObj.SetCellValue(Row,  fix_grid02 + "snd_item_cbf", parseFloat(pkg_lv1_qty * snd_qty * lv1_cbf).toFixed(WMS_CBM_POINT_COUNT));
	sheetObj.SetCellValue(Row,  fix_grid02 + "snd_item_grs_kgs",Math.round((pkg_lv1_qty * snd_qty) * lv1_grs_kgs * 1000)/1000,0);
	sheetObj.SetCellValue(Row,  fix_grid02 + "snd_item_grs_lbs",Math.round((pkg_lv1_qty * snd_qty) * lv1_grs_lbs * 1000)/1000,0);
	sheetObj.SetCellValue(Row,  fix_grid02 + "snd_item_net_kgs",Math.round((pkg_lv1_qty * snd_qty) * lv1_net_kgs * 1000)/1000,0);
	sheetObj.SetCellValue(Row,  fix_grid02 + "snd_item_net_lbs",Math.round((pkg_lv1_qty * snd_qty) * lv1_net_lbs * 1000)/1000,0);
	//sheetObj.SetCellValue(Row,  fix_grid02 + "dmg_item_cbm",Math.round((pkg_lv1_qty * dmg_qty) * lv1_cbm * 1000)/1000,0);
	//sheetObj.SetCellValue(Row,  fix_grid02 + "dmg_item_cbf",Math.round((pkg_lv1_qty * dmg_qty) * lv1_cbf * 1000)/1000,0);
	sheetObj.SetCellValue(Row,  fix_grid02 + "dmg_item_cbm",parseFloat(pkg_lv1_qty * dmg_qty * lv1_cbm).toFixed(WMS_CBM_POINT_COUNT));
	sheetObj.SetCellValue(Row,  fix_grid02 + "dmg_item_cbf",parseFloat(pkg_lv1_qty * dmg_qty * lv1_cbf).toFixed(WMS_CBM_POINT_COUNT));
	sheetObj.SetCellValue(Row,  fix_grid02 + "dmg_item_grs_kgs",Math.round((pkg_lv1_qty * dmg_qty) * lv1_grs_kgs * 1000)/1000,0);
	sheetObj.SetCellValue(Row,  fix_grid02 + "dmg_item_grs_lbs",Math.round((pkg_lv1_qty * dmg_qty) * lv1_grs_lbs * 1000)/1000,0);
	sheetObj.SetCellValue(Row,  fix_grid02 + "dmg_item_net_kgs",Math.round((pkg_lv1_qty * dmg_qty) * lv1_net_kgs * 1000)/1000,0);
	sheetObj.SetCellValue(Row,  fix_grid02 + "dmg_item_net_lbs",Math.round((pkg_lv1_qty * dmg_qty) * lv1_net_lbs * 1000)/1000,0);
	//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (E)

	//unit price계산
	//lkh - ibsheet 최신 버전 - bug 수정 Insert 시 오류 수정 다시 확인 필요 - 원복
	//sheetObj.SetCellValue(Row, fix_grid02 + "unit_price",qty * eval(sheetObj.GetCellValue(Row, fix_grid02 + "item_unit_price")),0);
	sheetObj.SetCellValue(Row, fix_grid02 + "unit_price",qty * Number(sheetObj.GetCellValue(Row, fix_grid02 + "item_unit_price")),0);
	
	//label qty계산
	if(sheetObj.GetCellValue(Row, fix_grid02 + "wib_in_no").trim() == "")
	{
		var label_unit=sheetObj.GetCellValue(Row, fix_grid02 + "label_unit").trim();
		if(label_unit == "")
		{
			sheetObj.SetCellValue(Row,  fix_grid02 + "bx_label_qty",0,0);
		}
		else
		{
			var unit_qty=0;
			if(label_unit == "EA")
			{
				unit_qty=eval(sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv1_qty"));
			}
			else if(label_unit == "IN")
			{
				unit_qty=eval(sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv2_qty"));
			}
			else if(label_unit == "BX")
			{
				unit_qty=eval(sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv3_qty"));
			}
			else if(label_unit == "PL")
			{
				unit_qty=eval(sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv4_qty"));
			}
			else
			{
				unit_qty=0;
			}
			if(unit_qty <= 0)
			{
				sheetObj.SetCellValue(Row,  fix_grid02 + "bx_label_qty",0,0);
			}
			else
			{
				if(unit_qty > qty)
				{
					sheetObj.SetCellValue(Row,  fix_grid02 + "bx_label_qty",1,0);
				}
				else
				{
					sheetObj.SetCellValue(Row,  fix_grid02 + "bx_label_qty",Math.ceil(qty/unit_qty),0);
				}
			}
		}
	}
	//pe qty 계산
	var pe_qty=get_unit_qty(sheetObj, Row, "PE");
	if(pe_qty == 0)
	{
		pe_qty=-1;
	}
	var in_item_pe_qty=0;
	if(rcv_qty == 0)
	{
		in_item_pe_qty=0;
	}
	else if(pe_qty < 0)
	{
		in_item_pe_qty=1;
	}
	else if (pe_qty > rcv_qty)
	{
		in_item_pe_qty=1;
	}
	else
	{
		in_item_pe_qty=Math.ceil(rcv_qty/pe_qty);
	}
	sheetObj.SetCellValue(Row,  fix_grid02 + "in_item_pe_qty",in_item_pe_qty);
}
function calc_ea_qty(sheetObj, Row, input_unit, input_qty)
{
	var pkg_qty=0;
	if(input_unit.trim() == "")
	{
		return 0;
	}
	//item의 pkg_unit별 qty를 검색한다.
	pkg_qty=get_unit_qty(sheetObj, Row, input_unit);
	return pkg_qty * ComParseInt(input_qty);
}
function get_unit_qty(sheetObj, Row, input_unit)
{
	var pkg_qty=0;
	//item의 pkg_unit별 qty를 검색한다.
	for(var i=1; i<=4; i++)
	{
		if(sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv" + (i)+ "_unit_cd") == input_unit)
		{
			pkg_qty=ComParseInt(sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv" + (i) + "_qty"));
			break;
		}
	}
	return pkg_qty;
}
function setPackDefItem(aryPopupData) {
	var formObj=document.form;
	var sheetObj=sheet2;
	//vis에서 들어온 건중 valid체크가 성공되지않은 건은 item_cd 재검색후 item_sys_no재셋팅
	// Booking Item 필수입력 CHECK	
	if (sheetObj.RowCount()> 0) {
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			if((sheetObj.GetCellValue(i, fix_grid02+"invalid_yn") == "Y" && sheetObj.GetCellValue(i, fix_grid02+"su_valid_yn") != "Y")
			  ||sheetObj.GetCellValue(i, fix_grid02+"item_sys_no").trim() == ""
			  ||sheetObj.GetCellValue(i, fix_grid02+"item_pkgunit").trim() == ""  
			)
			{
				//var Row = i;
				sheetObj.SetCellValue(i, fix_grid02+"item_cd_dummy",sheetObj.GetCellValue(i, fix_grid02+"item_cd"));
			}
		}
	}
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case "search":
//			if(ComIsEmpty(formObj.list_wh_cd)){
//				ComShowCodeMessage("COM0114","Warehouse");
//				$("#list_wh_cd").focus();
//				return false;
//			}
			if(ComIsEmpty(formObj.wh_cd))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				$("#wh_cd").focus();
				return false;
			}
			if(ComIsEmpty(formObj.list_in_no)){
				ComShowCodeMessage("COM0114","Order Or Booking No");
				return false;
			}
			//bk_no가 없는경우 booking Date는 필수
			/*if(ComIsEmpty(formObj.list_in_no) 
			&& ComIsEmpty(formObj.list_fm_date) && ComIsEmpty(formObj.list_to_date))
			{
				ComShowCodeMessage("COM0114",$("#list_in_date_tp")[0].value);
				$("#list_fm_date").focus();
				return false;
			}
			if(!ComIsEmpty(formObj.list_fm_date) && ComIsEmpty(formObj.list_to_date)){
				formObj.list_to_date.value=ComGetNowInfo();
			}*/
			/* 3개월 duration 주석
			if (!ComIsEmpty(formObj.list_fm_date) && getDaysBetween2(formObj.list_fm_date.value, formObj.list_to_date.value)> 92) {
				ComShowCodeMessage("COM0141","3","(" + $("#list_in_date_tp")[0].GetSelectText()+ ")");
				formObj.list_fm_date.focus();
				return false;
			}
			*/
			/*if (!ComIsEmpty(formObj.list_fm_date) && !isDate(formObj.list_fm_date)) {
				ComShowCodeMessage("COM0114", $("#list_in_date_tp")[0].value);
				formObj.list_fm_date.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.list_to_date) && !isDate(formObj.list_to_date)) {
				ComShowCodeMessage("COM0114", $("#list_in_date_tp")[0].value);
				formObj.list_to_date.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.list_fm_date)&&ComIsEmpty(formObj.list_to_date))||(ComIsEmpty(formObj.list_fm_date)&&!ComIsEmpty(formObj.list_to_date))) {
				ComShowCodeMessage("COM0122", $("#list_in_date_tp")[0].value);
				formObj.list_fm_date.focus();
				return false;
			}
			if (getDaysBetween2(formObj.list_fm_date.value, formObj.list_to_date.value)<0) {
				ComShowCodeMessage("COM0122", $("#list_in_date_tp")[0].value);
				formObj.list_fm_date.focus();
				return false;
			}*/
			break;
		case "save":
			var sheetObj2=sheet2;
			var inbound_date="";
			var tab_one_row;
			/*if($("#sel_tab").val() == "01") //list tab에서 save(입력 및 수정)
			{
				var sheetObj1=sheet1;
				if(sheetObj1.RowCount()<= 0)
				{
					ComShowCodeMessage("COM0185","(List Sheet)");
					return false;
				}		
				if (sheetObj1.IsDataModified()== false && sheetObj2.IsDataModified()== false)//수정된내역이 없을경우(트랜잭션이 일어나지 않은경우)
				{
					ComShowCodeMessage("COM0323");
					 return false;
				}
				//-----sheet1
				for(var i=sheetObj1.HeaderRows(); i<=sheetObj1.LastRow();i++){
					//--모드가 NEW이거나 SEL_WIB_BK_NO=WIB_BK_NO와 같을경우만 Validation 체크
					if( (sheetObj1.GetRowStatus(i) == "I" &&  sheetObj1.GetCellValue(i, fix_grid01 + "form_mode") == "NEW")
							|| ($("#sel_wib_bk_no").val().trim() == sheetObj1.GetCellValue(i, fix_grid01 + "wib_bk_no"))
					   )
					{
						tab_one_row=i;
						//--Warehouse
						if(sheetObj1.GetCellValue(i, fix_grid01 + "wh_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","Warehouse");
							sheetObj1.SelectCell(i, fix_grid01 +  "wh_cd");
							return false;
						}
						//--Order No
						if(sheetObj1.GetCellValue(i, fix_grid01 + "cust_ord_no").trim() == "")
						{
							ComShowCodeMessage("COM0278","Order No");
							sheetObj1.SelectCell(i, fix_grid01 +  "cust_ord_no");
							return false;
						}
						//-- Order Type
						if(sheetObj1.GetCellValue(i, fix_grid01 + "ord_tp_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","Order Type");
							sheetObj1.SelectCell(i, fix_grid01 +  "ord_tp_cd");
							return false;
						}
						if(sheetObj1.GetCellValue(i, fix_grid01 + "ord_tp_cd").trim() == "A" && sheetObj1.GetCellValue(i, fix_grid01 + "rmk").trim() == "")
						{
							ComShowCodeMessage("COM0278", "Reason for ADJ");
							sheetObj1.SelectCell(i, fix_grid01 +  "rmk");
							return false;
						}					
						//--Estimate Date
						if(sheetObj1.GetCellValue(i, fix_grid01 + "est_in_dt").trim() == "")
						{
							ComShowCodeMessage("COM0278","Estimate Date");
							sheetObj1.SelectCell(i, fix_grid01 +  "est_in_dt");
							return false;
						}
//						if(sheetObj1.CellValue(i, fix_grid01 + "est_in_hm").trim() == "")
//						{
//							ComShowCodeMessage("COM0278","Estimate Date");
//							sheetObj1.SelectCell(i, fix_grid01 +  "est_in_hm");
//							return false;
//						}
						//--Contract
						if(sheetObj1.GetCellValue(i, fix_grid01 + "ctrt_no").trim() == "")
						{
							ComShowCodeMessage("COM0278","Contract");
							sheetObj1.SelectCell(i, fix_grid01 +  "ctrt_no");
							return false;
						}
						//-- Loading Type
						if(sheetObj1.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "N" && sheetObj1.GetCellValue(i, fix_grid01 + "load_tp_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","Loading Type");
							sheetObj1.SelectCell(i, fix_grid01 +  "load_tp_cd");
							return false;
						}
						//-- EID Type
						if(sheetObj1.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "N" && sheetObj1.GetCellValue(i, fix_grid01 + "trade_tp_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","EID Type");
							sheetObj1.SelectCell(i, fix_grid01 +  "trade_tp_cd");
							return false;
						}
						//-- FWD Type
						if(sheetObj1.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "N" && sheetObj1.GetCellValue(i, fix_grid01 + "fwd_tp_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","FWD Type");
							sheetObj1.SelectCell(i, fix_grid01 +  "fwd_tp_cd");
							return false;
						}
						//--inbound date
						if(sheetObj1.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "X")
						{
							if(sheetObj1.GetCellValue(i, fix_grid01 + "inbound_dt").trim() == "")
							{
								ComShowCodeMessage("COM0278","Inbound Date");
								sheetObj1.SelectCell(i, fix_grid01 +  "inbound_dt");
								return false;
							}
						}
						inbound_date=sheetObj1.GetCellValue(i, fix_grid01 + "inbound_dt").trim();
						//--Booking Date
						if(sheetObj1.GetCellValue(i, fix_grid01 + "bk_date").trim() == "")
						{
							ComShowCodeMessage("COM0278","Booking Date");
							sheetObj1.SelectCell(i, fix_grid01 +  "bk_date");
							return false;
						}
						//--Booking Date
						if(sheetObj1.GetCellValue(i, fix_grid01 + "owner_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","Owner");
							sheetObj1.SelectCell(i, fix_grid01 +  "owner_cd");
							return false;
						}
					}
				}			
			}*/
			/*else if($("#sel_tab").val() == "02") //form tab에서 save(입력 및 수정)
			{*/
				//--Warehouse
				if (isNull(formObj.wh_cd)) {
					ComShowCodeMessage("COM0278", "Warehouse");
					formObj.wh_cd.focus();
					return false;
				}
				//--Order No
				//if (isNull(formObj.cust_ord_no)) {
				if($("#cust_ord_no").val().trim() == "") {
					ComShowCodeMessage("COM0278", "Order No");
					formObj.cust_ord_no.focus();
					return false;
				}
				//-- Contract No 체크
				if (isNull(formObj.ctrt_no)) {
					ComShowCodeMessage("COM0278", "Contract No");
					formObj.ctrt_no.focus();
					return false;
				}
				//#1420 [WMS4.0] REQUIRED FIELDS IN BLUE BOX
				//-- Contract Name 체크
				if (isNull(formObj.ctrt_nm)) {
					ComShowCodeMessage("COM0278", "Contract Name");
					formObj.ctrt_nm.focus();
					return false;
				}
				//-- Owner
				if (isNull(formObj.owner_cd)) {
					ComShowCodeMessage("COM0278", "Owner");
					formObj.owner_cd.focus();
					return false
				}
				//-- Order Type
				if ($("#ord_tp_cd")[0].value== "") {
					ComShowCodeMessage("COM0278", "Order Type");
					return false;
				}
				if($("#ord_tp_cd")[0].value== "A" && $("#rmk").val().trim() == "")
				{
					ComShowCodeMessage("COM0278", "Reason for ADJ");
					formObj.rmk.focus();
					return false;
				}	
				//-- Booking Date
				if (isNull(formObj.bk_date)) {
					ComShowCodeMessage("COM0278", "Booking Date");
					formObj.bk_date.focus();
					return false;
				}
				//-- Loading Type
				if ($("#load_tp_cd")[0].value== "") {
					ComShowCodeMessage("COM0278", "Loading Type");
					return false;
				}
				//-- Estimate In Date
				if (isNull(formObj.est_in_dt)) {
					ComShowCodeMessage("COM0278", "Estimate Date");
					formObj.est_in_dt.focus();
					return false;
				}
				//-- EID Type
				if ($("#bk_sts_cd").val() == "N" && $("#trade_tp_cd")[0].value== "") {
					ComShowCodeMessage("COM0278", "EID Type");
					return false;
				}
				//-- FWD Type
				if ($("#bk_sts_cd").val() == "N" && $("#fwd_tp_cd")[0].value== "") {
					ComShowCodeMessage("COM0278", "FWD Type");
					return false;
				}
//				if (isNull(formObj.est_in_hm)) {
//					ComShowCodeMessage("COM0278", "Estimate Date");
//					ComSetFocus(formObj.est_in_hm);
//					return false;
//				}
				if($("#bk_sts_cd").val() == "X")
				{
					//-- Estimate In Date
					if (isNull(formObj.inbound_dt)) {
						ComShowCodeMessage("COM0278", "Inbound Date");
						formObj.inbound_dt.focus();
						return false;
					}
				}
				inbound_date=$("#inbound_dt").val().trim();
			/*}*/
			//-----sheet2는 공통
			var rowCnt=sheetObj2.RowCount();
			var rowCntD = sheetObj2.RowCount("D");
			if(rowCnt - rowCntD <= 0)
			{
				ComShowCodeMessage("COM0185","(Item Sheet)");
				return false;
			}
			var rcv_qty_sum=0;
			
			// 합계는 Validation체크 제외 "i<=sheetObj2.LastRow()" -> "i<sheetObj2.LastRow()"
			var subSum = "|" + sheetObj2.FindSubSumRow(); 
			for(var i=sheetObj2.HeaderRows(); i<sheetObj2.LastRow();i++){
				if(sheetObj2.GetRowStatus(i) != "D" && subSum.indexOf("|" + i) < 0)
				{
					//-- Item Code
					if(sheetObj2.GetCellValue(i, fix_grid02 + "item_cd").trim() == "")
					{
						ComShowCodeMessage("COM0278","SKU");
						sheetObj2.SelectCell(i, fix_grid02 +  "item_cd");
						return false;
					}
					//-- 수량
					//var item_ea_qty = eval(sheetObj2.CellValue(i, fix_grid02 + "item_ea_qty")); //item ea qty
//					var item_pkgqty = eval(sheetObj2.CellValue(i, fix_grid02 + "item_pkgqty")); //item_pkgqty		
//					if(item_pkgqty <= 0 )
//					{
//						ComShowCodeMessage("COM0278","Estimated Qty");
//						sheetObj2.SelectCell(i, fix_grid02 +  "item_pkgqty");
//						return false;
//					}
					if(sheetObj2.GetCellValue(i,fix_grid02+"rcv_sts_cd") =="S" && formObj.inbound_dt.value!=""){
						
						if(sheetObj2.GetCellValue(i,fix_grid02+"snd_pkgunit") ==""){
							ComShowMessage("Please input Sound items");
							sheetObj2.SelectCell(i, sheetObj2.SaveNameCol(fix_grid02 + "snd_pkgunit"))  ;
							return false;
						}
						if(sheetObj2.GetCellValue(i,fix_grid02+"rcv_pkgqty") <= 0 ){
							ComShowMessage("Please input Sound items Qty > 0");
							sheetObj2.SelectCell(i, sheetObj2.SaveNameCol(fix_grid02 + "rcv_pkgqty"))  ;
							return false;
						}
						if(sheetObj2.GetCellValue(i,fix_grid02+"inbound_loc_nm") == "" ){
							ComShowMessage("Please input Sound items Location");
							sheetObj2.SelectCell(i, sheetObj2.SaveNameCol(fix_grid02 + "inbound_loc_nm"))  ;
							return false;
						}
					}
					if(sheetObj2.GetCellValue(i,fix_grid02+"rcv_sts_cd") =="D" && formObj.inbound_dt.value!=""){
						
						if(sheetObj2.GetCellValue(i,fix_grid02+"dmg_pkgunit") ==""){
							ComShowMessage("Please input Damaged items");
							sheetObj2.SelectCell(i, sheetObj2.SaveNameCol(fix_grid02 + "dmg_pkgunit"))  ;
							return false;
						}
						if(sheetObj2.GetCellValue(i,fix_grid02+"dmg_pkgqty") <= 0 ){
							ComShowMessage("Please input Damaged items Qty > 0");
							sheetObj2.SelectCell(i, sheetObj2.SaveNameCol(fix_grid02 + "dmg_pkgqty"))  ;
							return false;
						}
						if(sheetObj2.GetCellValue(i,fix_grid02+"dmg_loc_nm") == "" ){
							ComShowMessage("Please input Damaged items Location");
							sheetObj2.SelectCell(i, sheetObj2.SaveNameCol(fix_grid02 + "dmg_loc_nm"))  ;
							return false;
						}
					}
					//Seral, LP# No validattion
					//-- Item Code
					if(sheetObj2.GetCellValue(i, fix_grid02 + "lic_plat_no").trim() != "" ||sheetObj2.GetCellValue(i, fix_grid02 + "item_ser_no").trim() != "")
					{
						if(formObj.inbound_dt.value == ""){
							ComShowCodeMessage("COM0278","Inbound Date");
							formObj.inbound_dt.focus();
							return false;
						} 
						if(sheetObj2.GetCellValue(i, fix_grid02 + "snd_pkgunit").trim() == "" && sheetObj2.GetCellValue(i, fix_grid02 + "dmg_pkgunit").trim() == ""){
							ComShowCodeMessage("COM0278","UOM");
							return false;
						}
						
						//sheetObj2.SelectCell(i, fix_grid02 +  "item_cd");
						
					}
					var rcv_pkgqty=eval(sheetObj2.GetCellValue(i, fix_grid02 + "rcv_pkgqty"));
					var dmg_pkgqty=eval(sheetObj2.GetCellValue(i, fix_grid02 + "dmg_pkgqty"));
					if(rcv_pkgqty > 0 && sheetObj2.GetCellValue(i, fix_grid02 + "snd_pkgunit").trim() == "")
					{
						ComShowCodeMessage("COM0278","Sound UOM");
						sheetObj2.SelectCell(i, fix_grid02 +  "snd_pkgunit");
						return false;
					}
					if(dmg_pkgqty > 0 && sheetObj2.GetCellValue(i, fix_grid02 + "dmg_pkgunit").trim() == "")
					{
						ComShowCodeMessage("COM0278","Damage UOM");
						sheetObj2.SelectCell(i, fix_grid02 +  "dmg_pkgunit");
						return false;
					}
					var dmg_loc_nm = sheetObj2.GetCellValue(i, fix_grid02 + "dmg_loc_nm").trim();
					if(dmg_loc_nm.length > 0 && sheetObj2.GetCellValue(i, fix_grid02 + "dmg_pkgunit").trim() == "")
					{
						ComShowCodeMessage("COM0278","Damage UOM");
						sheetObj2.SelectCell(i, fix_grid02 +  "dmg_pkgunit");
						return false;
					}
					if(dmg_loc_nm.length > 0 && dmg_pkgqty == 0)
					{
						ComShowCodeMessage("COM0278","Damage Qty");
						sheetObj2.SelectCell(i, fix_grid02 +  "dmg_pkgqty");
						return false;
					}
					
					var in_item_ea_qty=eval(sheetObj2.GetCellValue(i, fix_grid02 + "in_item_ea_qty")); //item in ea qty
					//alert(rcv_qty_sum + in_item_ea_qty);
					rcv_qty_sum=rcv_qty_sum + in_item_ea_qty;
					//alert(rcv_qty_sum);
					if(in_item_ea_qty > 0)
					{
						//-- received수량을 넣으면 inbound date를 필수로 입력 (헤더에 inbound date가 있을경우 skip)					
						if(sheetObj2.GetCellValue(i, fix_grid02 + "inbound_dt").trim() == "" && inbound_date == "")
						{
							ComShowCodeMessage("COM0278","Inbound Date");
							/*if($("#sel_tab").val() == "01") //list tab에서 save(입력 및 수정)
							{
								sheetObj1.SelectCell(tab_one_row, fix_grid01 +  "inbound_dt");
							}
							else
							{*/
								formObj.inbound_dt.focus();
							/*}*/
							return false;
						}
						var snd_ea_qty=eval(sheetObj2.GetCellValue(i, fix_grid02 + "snd_ea_qty"));
						var dmg_ea_qty=eval(sheetObj2.GetCellValue(i, fix_grid02 + "dmg_ea_qty"));
						if(snd_ea_qty > 0 && sheetObj2.GetCellValue(i, fix_grid02 + "inbound_loc_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","Sound Location");
							sheetObj2.SelectCell(i, fix_grid02 +  "inbound_loc_nm");
							return false;
						}
						if(dmg_ea_qty > 0 && sheetObj2.GetCellValue(i, fix_grid02 + "dmg_loc_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","Damage Location");
							sheetObj2.SelectCell(i, fix_grid02 +  "dmg_loc_nm");
							return false;
						}
//						//sound, damage location 둘중하나는 필수값
//						if(sheetObj2.CellValue(i, fix_grid02 + "inbound_loc_cd").trim() == "" && sheetObj2.CellValue(i, fix_grid02 + "dmg_loc_cd").trim() == "")
//						{
//							ComShowCodeMessage("COM0278","Location");
//							sheetObj2.SelectCell(i, fix_grid02 +  "inbound_loc_nm");
//							return false;
//						}
					}	
					if(!ComIsNull(sheetObj2.GetCellValue(i, fix_grid02+"item_sys_no"))
					&& sheetObj2.GetCellValue(i, fix_grid02+"invalid_yn") == "Y" && sheetObj2.GetCellValue(i, fix_grid02+"su_valid_yn") == "Y"
						&& sheetObj2.GetCellValue(i, fix_grid02+"pkg_info").indexOf(sheetObj2.GetCellValue(i, fix_grid02+"item_pkgunit"))	== -1
					)
					{
						ComShowCodeMessage("COM0344");
						sheetObj2.SelectCell(i, fix_grid02 +  "item_pkgunit");
						return false;
					}
					//VIS에서 들어온건중 ITEM_CD가 TL_CTRT_CUST_ITEM에는 존재하고 UNIT정보도 올바르기때문에 따로 수정작업을 안거쳤을경우
					//강제로 UPDATE모드로 바꿔주어야 프로시저내에서 INVALID_YN여부를 NULL로 업데이트칠수있으므로 IBFLAG모드를 수정한다.
					if(sheetObj2.GetCellValue(i, fix_grid02+"invalid_yn") == "Y" && sheetObj2.GetCellValue(i, fix_grid02+"su_valid_yn") == "Y"
						  && sheetObj2.GetCellValue(i, fix_grid02+"ibflag") == "R"
						)
					{
						sheetObj2.GetCellValue(i, fix_grid02+"ibflag")="U";
					}
					// 마스터가 등록되지 않거나 Pack Unit이 미등록 된 Item을 대상
					var chkCnt=0;
					if ((ComIsNull(sheetObj2.GetCellValue(i, fix_grid02+"item_sys_no")) && !ComIsNull(sheetObj2.GetCellValue(i, fix_grid02+"item_cd"))) ||
							(!ComIsNull(sheetObj2.GetCellValue(i, fix_grid02+"item_sys_no")) && ComIsNull(sheetObj2.GetCellValue(i, fix_grid02+"item_pkgunit")))
					   ) 
					{
						chkCnt++;
					}
					if (chkCnt > 0) {
						// 저장될 때 해당 Item이 있으면 Alert 띄우고 저장 안 됨.
						//ComShowCodeMessage("COM0338"); // the Items unregistered in Item Master exists. Please define Pack Unit first.
						var sUrl="./WHInPackDefPopup.clt?pgm_id=WHINMGMT&ctrt_no="+sheetObj2.GetCellValue(sheetObj2.HeaderRows(), fix_grid02+"ctrt_no") +"&ctrt_nm="+sheetObj2.GetCellValue(sheetObj2.HeaderRows(), fix_grid02+"ctrt_nm");
						
						//OFVFOUR-7314 [HANARO AUSTIN] DB Lock Issue
						rtnary[0]="";
						rtnary[1]="hide_lv4";
						callBackFunc = "setPackDefItem";
						modal_center_open(sUrl, rtnary, 1000,530,"yes");
						
						//callBackFunc = "setPackDefItem";
					    //modal_center_open(sUrl, callBackFunc, 1000,530,"yes");
						return false;
					} 
				}
			}
			if(rcv_qty_sum > 0 && inbound_date == "")
			{
				ComShowCodeMessage("COM0278", "Inbound Date");
				/*if($("#sel_tab").val() == "01") //list tab에서 save(입력 및 수정)
				{
					sheetObj1.SelectCell(tab_one_row, fix_grid01 +  "inbound_dt");
				}
				else
				{*/
					formObj.inbound_dt.focus();
				/*}*/
				return false;
			}

			//#2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (S)
			//SERIAL_REQ_FLAG 'Y' 인 경우 해당 ITEM 의 SERIAL # 가 NULL 여부 체크
			for(var i=sheetObj2.HeaderRows(); i<sheetObj2.HeaderRows()+sheetObj2.RowCount(); i++) {
				if(sheetObj2.GetCellValue(i, fix_grid02+"ibflag") != "D" &&
					sheetObj2.GetCellValue(i, fix_grid02+"serial_req_flag") == "Y" &&
					sheetObj2.GetCellValue(i, fix_grid02+"item_ser_no").trim() == "" &&
					sheetObj2.GetCellValue(i, fix_grid02+"rcv_pkgqty").trim() != "0"
					)
				{
					ComShowCodeMessage("COM0278", "Serial No");
					return false;
				}
			}

			var cmpItemCd = "";
			var cmpItemSerNo = "";
			for(var i=sheetObj2.HeaderRows(); i<sheetObj2.HeaderRows()+sheetObj2.RowCount()-1; i++) {
				if(sheetObj2.GetCellValue(i, fix_grid02+"serial_uniq_flag") == "Y" && sheetObj2.GetCellValue(i, fix_grid02+"item_ser_no") != "") {
					cmpItemCd = sheetObj2.GetCellValue(i, fix_grid02+"item_cd");
					cmpItemSerNo = sheetObj2.GetCellValue(i, fix_grid02+"item_ser_no");

					for(var j=i+1; j<sheetObj2.HeaderRows()+sheetObj2.RowCount(); j++) {
						if(cmpItemCd == sheetObj2.GetCellValue(j, fix_grid02+"item_cd").trim()
						&& cmpItemSerNo == sheetObj2.GetCellValue(j, fix_grid02+"item_ser_no").trim()) {
							ComShowCodeMessage("COM0225", "Serial No");
							return false;
						}
					}
				}
			}
			//#2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (E)

			break;
		case "cancel":
			/*if($("#sel_tab").val() == "01") //list tab에서 delete
			{
				var sheetObj=sheet1;
				var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
				if (sRow == "") {
					ComShowCodeMessage("COM0253");
					return false;
				}
			}
			else if($("#sel_tab").val() == "02")
			{*/
			
				if($("#sel_wib_bk_no").val().trim() == "")
				{
					ComShowCodeMessage("COM0289", "booking order");
					return false;
				}
			/*}*/
			break;
		case "cancel":
			if($("#sel_tab").val() == "01") //list tab에서 delete
			{
				var sheetObj=sheet1;
				var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
				if (sRow == "") {
					ComShowCodeMessage("COM0253");
					return false;
				}
			}
			else if($("#sel_tab").val() == "02")
			{
				if($("#sel_wib_bk_no").val().trim() == "")
				{
					ComShowCodeMessage("COM0289", "booking order");
					return false;
				}
			}
			break;
		case "ccancel":
			/*if($("#sel_tab").val() == "01") //list tab에서 delete
			{
				var sheetObj=sheet1;
				var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
				if (sRow == "") {
					ComShowCodeMessage("COM0253");
					return false;
				}
			}
			else if($("#sel_tab").val() == "02")
			{*/
				if($("#sel_wib_bk_no").val().trim() == "")
				{
					ComShowCodeMessage("COM0289", "booking order");
					return false;
				}

			/*}*/
			break;
		case "putaway":
			/*if($("#sel_tab").val() == "01") //list tab에서 delete
			{
				var sheetObj=sheet1;
				var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
				if (sRow == "") {
					ComShowCodeMessage("COM0253");
					return false;
				}
			}
			else if($("#sel_tab").val() == "02")
			{*/
				if($("#sel_wib_bk_no").val().trim() == "")
				{
					ComShowCodeMessage("COM0289", "booking order");
					return false;
				}
			/*}*/
			break;
		case "sheet6_save":
			var sheetObj=sheet6;

			//#390 [Closing In & Out Entry] Can't save data successfully
			if(sheet6.RowCount() > 0){
				if (isNull(formObj.bill_to_cd)) {
					ComShowCodeMessage("COM0278", "Bill To");
					formObj.bill_to_cd.focus();
					return false;
				}				
			}
			
			//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
			if($("#cust_ord_no").val().trim() == "") {
				ComShowCodeMessage("COM0278", "Order No");
				formObj.cust_ord_no.focus();
				return false;
			}
			//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
			changeFrtinfo();
			
			//-----sheet6
//			var subSum = sheetObj2.FindSubSumRow(); 
//			for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow() && subSum.indexOf(i) < 0;i++){
			for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow();i++){
				if(sheetObj.GetCellValue(i, fix_grid06 + "rate_tp_cd").trim() == "")
				{
					ComShowCodeMessage("COM0278","Type");
					sheetObj.SelectCell(i, fix_grid06 +  "rate_tp_cd");
					return false;
				}
				if(sheetObj.GetCellValue(i, fix_grid06 + "frt_cd").trim() == "")
				{
					ComShowCodeMessage("COM0278","Billing Item");
					sheetObj.SelectCell(i, fix_grid06 +  "frt_cd");
					return false;
				}
				if(sheetObj.GetCellValue(i, fix_grid06 + "unit_cd").trim() == "")
				{
					ComShowCodeMessage("COM0278","Unit 1");
					sheetObj.SelectCell(i, fix_grid06 +  "unit_cd");
					return false;
				}
				if(sheetObj.GetCellValue(i, fix_grid06 + "unit_cd").trim() != "")
				{
					if (sheetObj.GetCellValue(i, fix_grid06 + "unit_cd")!="ODR" && sheetObj.GetCellValue(i, fix_grid06 + "unit_cd")!="HOR") {
						if(sheetObj.GetCellValue(i, fix_grid06 + "unit_cd2").trim() == ""){
							ComShowCodeMessage("COM0278","Unit2");
							sheetObj.SelectCell(i, fix_grid06 +  "unit_cd2");
							return false;
						}
					}
				}
				if(sheetObj.GetCellValue(i, fix_grid06 + "curr_cd").trim() == "")
				{
					ComShowCodeMessage("COM0278","Currency");
					sheetObj.SelectCell(i, fix_grid06 +  "curr_cd");
					return false;
				}
				
				if(sheetObj.GetRowStatus(i) != "D" && sheetObj.GetCellValue(i, fix_grid06 + "inv_amt").trim() == "0" )
				{
					ComShowCodeMessage("COM0278","the Q'tY(Hour)");
					sheetObj.SelectCell(i, fix_grid06 +  "qty");
					return false;
				}
			}
			break;
		}
	}
	return true;
}
function measureFormat(obj)
{
	obj.value=measureFormatValue(obj.value);
}
function measureFormatValue(val)
{
	var ret="";
	var val_dot_split=val.split(".");
	if(val_dot_split.length == 1)
	{
		ret=val + ".000";
	}
	else
	{
		var zero="";
		for(var i=0; i < 3 - val_dot_split[1].length; i++)
		{
			zero=zero + "0";
		}
		ret=val + zero;
	}
	return ret;
}
function ord_tp_cd_OnChange(sheetObj, Code, Text){
	if(Code == "A")
	{
		$("#rmk_title1").hide();
		$("#rmk_title2").show();
	}
	else
	{
		$("#rmk_title1").show();
		$("#rmk_title2").hide();
	}
}
function bl_load()
{
	//--wh_cd, ctrt_no 필수
	if($("#list_wh_cd").val().trim() == "")
	{
		ComShowCodeMessage("COM0114","Warehouse");
		$("#list_wh_cd").focus();
		return;
	}
	if($("#list_ctrt_no").val().trim() == "")
	{
		ComShowCodeMessage("COM0114","Contract");
		$("#list_ctrt_no").focus();
		return;
	}
	var sUrl="TransloadingBLLoadPopup.do?openScr=MGMT&call_pgm=IB&ctrt_no=" + $("#list_ctrt_no").val() + "&ctrt_nm=" + $("#list_ctrt_nm").val() + "&wh_cd=" + $("#list_wh_cd").val() ;
	ComOpenPopup(sUrl, 1100, 650, "setBL_load", "0,0", true);
}
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
function convDate(date) {
	if (date != 0){
		if (date.length == 8){
			var rtn = date.substring(4, 6) + "-" + date.substring(6, 8) + "-" + date.substring(0, 4);
			return rtn;
		}else if (date.length == 10){
			var rtn = date.substring(5,7) + "-" + date.substring(8, 10) + "-" + date.substring(0, 4);
			return rtn;
		}
	}else {
		return date;
	}
}
function checkNumFormat(obj, format) {

    var srcNumber = obj.value.replace(/\-/g,"");
    var srcNumber = obj.value.replace(/\,/g,"");

    if(srcNumber == '') return;

    if(isNaN(srcNumber)) {
        alert("Check invalid data! ");
        obj.value = "0";
        obj.focus();
        return;
    }
    dotInx     = format.indexOf('.');
    len        = format.length;

    if (dotInx > 0) decimalLen = len - (dotInx + 1);
    else decimalLen = -1;
    numLen     = len - (decimalLen + 1);
    temp        = srcNumber
    len1        = temp.length;
    dotInx1     = temp.indexOf('.');
    
    //소수점이 유무에 의한 길이 설정
    if(dotInx1 == -1) {
        decimalLen1 = -1;
        numLen1     = len1;
    } else {
        decimalLen1 = len1 - (dotInx1 + 1);
        numLen1     = len1 - (decimalLen1 + 1);
    }
    
    var floatMax = len - (dotInx + 1);
    var decimalMax = len - (floatMax + 1);
     
    if(numLen1 > numLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        obj.value = "0";
        obj.focus();
        return false;
    } else if (decimalLen1 > decimalLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        obj.value = "0";
        obj.focus();
        return false;
    }
    return true;
}

function checkNum(obj, format) {

    var srcNumber = obj.value.replace(/\-/g,"");
    var srcNumber = obj.value.replace(/\,/g,"");

    if(srcNumber == '') return;

    if(isNaN(srcNumber)) {
        alert("Check invalid data! ");
        obj.value = "";
        obj.focus();
        return;
    }
    var len = srcNumber.length;
    var floatMax = "0";
    var decimalMax = format.length;
     
    if(len > decimalMax)
    	{
    	 alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
         obj.value = "";
         obj.focus();
         return false;
    	}
       
    return true;
}

function getInfo_Carrier(obj) {
	formObj=document.form;
	var val = obj.value;
	if(val != ""){
		ajaxSendPost(dispCodeNameAjaxReq2_Cari, 'reqVal','&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + val, './GateServlet.gsl');
	}else {
		formObj.carrier_nm.value = '';
		formObj.carrier_cd.value = '';
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq2_Cari(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			formObj.carrier_nm.value=masterVals[2];	
		}else{
			formObj.carrier_cd.value="";//trdp_cd
			formObj.carrier_nm.value="";//trdp_nm
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEE_BMD_0061.152");		
	}
}
function getInfo_Ownercd(obj) {
	formObj=document.form;
	var val = obj.value;
	if(val != ""){
		ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal','&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + val, './GateServlet.gsl');
	}else {
		formObj.owner_cd.value = '';
		formObj.owner_nm.value = '';
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			formObj.owner_nm.value=masterVals[2];	
		}else{
			formObj.owner_cd.value="";//trdp_cd
			formObj.owner_nm.value="";//trdp_nm
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEE_BMD_0061.152");		
	}
}
function getInfo_SuppCd(obj) {
	formObj=document.form;
	var val = obj.value;
	if(val != ""){
		ajaxSendPost(dispCodeNameAjaxReq2_Sup, 'reqVal','&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + val, './GateServlet.gsl');
	}else {
		formObj.supp_cd.value = '';
		formObj.supp_nm.value = '';
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq2_Sup(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			formObj.supp_nm.value=masterVals[2];	
			formObj.supp_addr1.value = masterVals[4]
		}else{
			formObj.supp_cd.value="";//trdp_cd
			formObj.supp_nm.value="";//trdp_nm
			formObj.supp_addr1.value="";//trdp_nm
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEE_BMD_0061.152");		
	}
}
function onblur_Del(srcName) {
	var formObj=document.form;
	if(srcName == "del" && !(formObj.btn_del.disabled)){
		if(isNull(formObj.del)){
			setTlLocInfoNull("del");
		}else{
			searchTlLocInfo("del", ComGetObjValue(formObj.del), "P");			
		}
	}
}

function onblur_Pod(srcName) {
	var formObj=document.form;
	if(srcName == "pod" && !(formObj.btn_pod.disabled)){
		if(isNull(formObj.pod)){
			setTlLocInfoNull("pod");
		}else{
			searchTlLocInfo("pod", ComGetObjValue(formObj.pod), "P");			
		}
	}
}

function onblur_Pol(srcName) {
	var formObj=document.form;
	if(srcName == "pol" && !(formObj.btn_pol.disabled)){
		 if(isNull(formObj.pol)){
			 setTlLocInfoNull("pol");
		 }else{
			 searchTlLocInfo("pol", ComGetObjValue(formObj.pol), "P");			 
		 }
	}
}
function setTlLocInfo(reqVal ,name){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
		  if(typeof(doc[1])!='undefined'){
		   //조회해온 결과를 Parent에 표시함
			   var rtnArr=doc[1].split('@@^');
			   if(rtnArr[0] != ""){
					if(name == "pol" || name == "pod" || name == "del"){
						setFieldValue(eval("formObj."+name), rtnArr[0]);
					}else if(name == "rcv_loc"){
						setFieldValue(eval("formObj."+name+"_cd"), rtnArr[1]);
					}
					setFieldValue(eval("formObj."+name+"_nm"), rtnArr[3]);
			   }else{
				   if(name == "pol" || name == "pod" || name == "del"){
						setFieldValue(eval("formObj."+name), '');
					}else if(name == "rcv_loc"){
						setFieldValue(eval("formObj."+name+"_cd"),'');
					}
					setFieldValue(eval("formObj."+name+"_nm"),'');
			   } 
		  }else{
			  setFieldValue(eval("formObj."+name),'');
			  setFieldValue(eval("formObj."+name+"_nm"),'');
		  }
	 }
}
function podGridPopup(name, sheetObj, Row, Col, fix_grid)
{
	//pod
	//pol
	//del
	rtnary=new Array(3);
	rtnary[0]="";
	
	rtnary[1]="IT";
	rtnary[2]=sheetObj.GetCellValue(Row, Col+1);
	rtnary[3]=sheetObj.GetCellValue(Row, Col);
	
	callBackFunc = "setLocInfoGrid_" + name
	modal_center_open('./CMM_POP_0030.clt', rtnary, 810,440,"yes");
}
function setLocInfoGrid_pol(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "pol",rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "pol_nm",rtnValAry[2],0);
	}
}
function setLocInfoGrid_pod(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "pod",rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "pod_nm",rtnValAry[2],0);
	}
}
function setLocInfoGrid_del(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "del",rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "del_nm",rtnValAry[2],0);
	}
}
function getParam() {
    var formObj = document.form;

    var sParam="svc_tp_cd="+ComGetObjValue(formObj.svc_tp_cd);
	sParam += "&doc_ref_tp_cd="+ComGetObjValue(formObj.doc_ref_tp_cd);
	sParam += "&doc_tp_cd="+ComGetObjValue(formObj.doc_tp_cd);
	sParam += "&doc_ref_no="+ComGetObjValue(formObj.wib_bk_no);
	sParam += "&doc_ref_no2="+ComGetObjValue(formObj.doc_ref_no2);
	
    return sParam;
}
function submitForm(){
	
	
	var formObj=document.form;
	doShowProcess();
	var formData;
	
//  #1922 [Binex WMS vis] Outbound attached file is not opened
//  차후 IE에서 문제발생시 주석제거		
//	if(navigator.appName.indexOf("Microsoft") != -1) {
//		if(formObj.f_cmd.value==SEARCH){
//			formObj.action = "./WHInMgmt.clt?fwd_bk_no="+formObj.c_wib_bk_no.value+"&uploadfile=T";
//			formObj.submit();
//			return;
//		}else{
//			formObj.action = "./WHInMgmt.clt?fwd_bk_no="+formObj.c_wib_bk_no.value+"&uploadfile=T";
//			formObj.submit();
//			return;
//		}
//	} else {
		formData = new FormData();
		$.each($("form").find("input[type='file']"), function(i, tag) {
	        $.each($(tag)[0].files, function(i, file) {
	            formData.append(tag.name, file);
	        });
	    });
	    var params = $("form").serializeArray();
	    $.each(params, function (i, val) {
	        formData.append(val.name, val.value);
	    });
//	}
    
	$.ajax({
		   type: "POST",
		   url: "./WHInbkMgmtAJ.clt",
		   dataType: 'xml',
		   data: formData,
		   contentType: false,
	       processData: false,
		   success: function(data){
			   doHideProcess();
			   if($('res',data).text() == "OK"){
				   
				   formObj.logo_rec_flg.value = "N";
				   formObj.logo_rec_flg.checked = false;
				   
				   var xmlString = new XMLSerializer().serializeToString(data);

				   var sheet5XML = getSheetXmlStr(xmlString, "5");
				   sheet4.LoadSearchData(sheet5XML);
				   showCompleteProcess();
			   }else{
				   ComShowCodeMessage('COM131202');//Failed to upload
			   }
		   },
		   error: function(){
			   doHideProcess();
			   alert("UpLoad Fail! Please check format file upload.");
		   }
		 });
	document.form.logo_rectangle.value = "";
}
function getSheetXmlStr(xml, sSheetNo){
	
	var sBeginTag = '<SHEET' + sSheetNo + '>';
	
	var sCloseTag = '</SHEET' + sSheetNo + '>';
	
	var strtIndx = xml.indexOf(sBeginTag) + sBeginTag.length + 1;
	
	var endIndx = xml.indexOf(sCloseTag) - 1;
	
	return xml.substring(strtIndx, endIndx);
}
function funcKGS_CBM_CAC(command, obj, obj2) {
	var formObj=document.form;
	var sheetObj=sheet2;
	var currow=0;	
	currow=sheetObj.GetSelectRow();
	if (command == "LB_KG") { // GWT / NWT
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) / CNVT_CNST_KG_LB), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	} else if (command == "KG_LB") { // CBM
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) * CNVT_CNST_KG_LB), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	} else if (command == "CBF_CBM") { // CBM
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) * 0.028317), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	}	else if (command == "CBM_CBF") { // CBM
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) / 0.028317), 3);
		lb_amt=lb_amt * 100000;
		lb_amt=Math.round(lb_amt);
		lb_amt=lb_amt / 100000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	}
}
function timeCheck(obj){
	var size=obj.value.length;
	if(size==1){
		obj.value="0" + obj.value + ":00";
	}else if(size==2){
		if(hourCheck(obj.value)){
			obj.value=obj.value + ":00";
		}else{
			obj.value='';
		}
	}else if(size==3){
		if(hourCheck(obj.value.substring(0,2))){
			if(obj.value.substring(2,3)>5 || obj.value.substring(2,3)<0){
				obj.value='';
			}else if(obj.value.substring(2,3) == ":"){
				obj.value=obj.value.substring(0,2) + ":" + "00";
			}else{
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,3) + "0";
			}
		}else{
			obj.value='';
		}
	}else if(size==4){
		if(hourCheck(obj.value.substring(0,2))){
			if(minuteCheck(obj.value.substring(2,4))){
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,4);
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}
}
function hourCheck(obj){
	if(isNaN(obj)){
		alert(getLabel('COM_FRT_ALT002'));
		return false;
	}
	if(obj>23 || obj<0){
		//HOUR: 0-23
		alert(getLabel('COM_FRT_ALT002'));
		return false;
	}else{
		return true;
	}
}
function minuteCheck(obj){
	if(isNaN(obj)){
		alert(getLabel('COM_FRT_ALT003'));
		return false;
	}
	if(obj>59 || obj<0){
		//alert('0-59');
		alert(getLabel('COM_FRT_ALT003'));
		return false;
	}else{
		return true;
	}
}

//merge row
function mergeCell(Row){
	var prefix= fix_grid05;
	totalRowMerge = 0;
	startRow = 0;
	for(var i = Row ; i <= sheet1.RowCount() + 1 ; i++){
		if(i == Row){
			getDataOri(i);
			i++;
		}
		checkDataMerge(i);
	}
}
function checkDataMerge(i){
	getData(i);
	if(	wh_cd 				==	wh_cd_org 		&&	cust_ord_no 		==	cust_ord_no_org &&	ord_tp_cd			==	ord_tp_cd_org 
			&&	est_in_dt			==	est_in_dt_org	&&	est_in_hm			==	est_in_hm_org	&&	bk_sts_cd			==	bk_sts_cd_org&&	ctrt_no 			==	ctrt_no_org 
		 	&&	inbound_dt 			==	inbound_dt_org 	&&	inbound_hm 			==	inbound_hm_org &&	inbound_pl_qty 		==	inbound_pl_qty_org 
			&&	inbound_bx_qty 		==	inbound_bx_qty_org &&	inbound_ea_qty 		==	inbound_ea_qty_org &&	inbound_sqft 		==	inbound_sqft_org &&	inbound_cbm 		==	inbound_cbm_org 
			&&	inbound_grs_kgs 	==	inbound_grs_kgs_org &&	inbound_net_kgs 	==	inbound_net_kgs_org &&	eq_tpsz_cd 			==	eq_tpsz_cd_org &&	eq_no 				==	eq_no_org 
			&&	seal_no 			==	seal_no_org &&	dlv_ord_no 			==	dlv_ord_no_org &&	load_tp_cd 			==	load_tp_cd_org &&	trade_tp_cd			==	trade_tp_cd_org&&	fwd_tp_cd			==	fwd_tp_cd_org
			&&	mbl_no 				==	mbl_no_org &&	hbl_no 				==	hbl_no_org &&	wib_bk_no 			==	wib_bk_no_org &&	bk_date 			==	bk_date_org &&	ref_no 				==	ref_no_org 
			&&	commc_inv_no 		==	commc_inv_no_org &&	rmk 				==	rmk_org &&	owner_cd 			==	owner_cd_org &&	owner_addr1 		==	owner_addr1_org &&	owner_addr2 		==	owner_addr2_org 
			&&	owner_addr3 		==	owner_addr3_org &&	owner_addr4 		==	owner_addr4_org &&	owner_addr5 		==	owner_addr5_org &&	supp_cd 			==	supp_cd_org 
			&&	supp_addr1 			==	supp_addr1_org &&	supp_addr2 			==	supp_addr2_org &&	supp_addr3 			==	supp_addr3_org &&	supp_addr4 			==	supp_addr4_org &&	supp_addr5 			==	supp_addr5_org 
			&&	vsl_cd 				==	vsl_cd_org &&	vsl_nm 				==	vsl_nm_org &&	voy 				==	voy_org &&	carrier_cd 			==	carrier_cd_org &&	carrier_nm 			==	carrier_nm_org 
			&&	pol 				==	pol_org &&	pod 				==	pod_org &&	del					==	del_org&&	etd 				==	etd_org &&	eta					==	eta_org
		){
		if(startRow == 0){
			startRow = i;
			totalRowMerge = 1;
		}
		totalRowMerge++;
	}
	else{
		if(totalRowMerge == 1){
			totalRowMerge++;
		}
		startRow = startRow - 1;
		setMergeCell(startRow, totalRowMerge);
		
		getDataOri(i);
		
		startRow = 0;
		totalRowMerge = 0;
	}
	
	if(i == sheet5.RowCount() + 1){
		if(startRow != 0){
			if(totalRowMerge == 1){
				totalRowMerge++;
			}
			startRow = startRow - 1;
			setMergeCell(startRow, totalRowMerge);
			startRow = 0;
			totalRowMerge = 0;
		}
	}
}
function getDataOri(i){
	var sheetObj = sheet5;
	var prefix= fix_grid05;
	merge_key_org 		= sheetObj.GetCellValue(i, prefix+"merge_key");       
	wh_cd_org 			= sheetObj.GetCellValue(i, prefix+"wh_cd");        	
	cust_ord_no_org 	= sheetObj.GetCellValue(i, prefix+"cust_ord_no");     
	ord_tp_cd_org		= sheetObj.GetCellValue(i, prefix+"ord_tp_cd");       
	est_in_dt_org		= sheetObj.GetCellValue(i, prefix+"est_in_dt");       
	est_in_hm_org		= sheetObj.GetCellValue(i, prefix+"est_in_hm");       
	bk_sts_cd_org		= sheetObj.GetCellValue(i, prefix+"bk_sts_cd");       
	ctrt_no_org 		= sheetObj.GetCellValue(i, prefix+"ctrt_no");        
	ctrt_nm_org 		= sheetObj.GetCellValue(i, prefix+"ctrt_nm");        
	inbound_dt_org 		= sheetObj.GetCellValue(i, prefix+"inbound_dt");     
	inbound_hm_org 		= sheetObj.GetCellValue(i, prefix+"inbound_hm");     
	inbound_pl_qty_org 	= sheetObj.GetCellValue(i, prefix+"inbound_pl_qty"); 
	inbound_bx_qty_org 	= sheetObj.GetCellValue(i, prefix+"inbound_bx_qty"); 
	inbound_ea_qty_org 	= sheetObj.GetCellValue(i, prefix+"inbound_ea_qty"); 
	inbound_sqft_org 	= sheetObj.GetCellValue(i, prefix+"inbound_sqft");   
	inbound_cbm_org 	= sheetObj.GetCellValue(i, prefix+"inbound_cbm");    
	inbound_grs_kgs_org = sheetObj.GetCellValue(i, prefix+"inbound_grs_kgs");
	inbound_net_kgs_org = sheetObj.GetCellValue(i, prefix+"inbound_net_kgs");
	eq_tpsz_cd_org 		= sheetObj.GetCellValue(i, prefix+"eq_tpsz_cd");     
	eq_no_org 			= sheetObj.GetCellValue(i, prefix+"eq_no");        	
	seal_no_org 		= sheetObj.GetCellValue(i, prefix+"seal_no");      	
	dlv_ord_no_org 		= sheetObj.GetCellValue(i, prefix+"dlv_ord_no");   	
	load_tp_cd_org 		= sheetObj.GetCellValue(i, prefix+"load_tp_cd");   	
	trade_tp_cd_org		= sheetObj.GetCellValue(i, prefix+"trade_tp_cd");  	
	fwd_tp_cd_org		= sheetObj.GetCellValue(i, prefix+"fwd_tp_cd");    	
	mbl_no_org 			= sheetObj.GetCellValue(i, prefix+"mbl_no");       	
	hbl_no_org 			= sheetObj.GetCellValue(i, prefix+"hbl_no");       	
	wib_bk_no_org 		= sheetObj.GetCellValue(i, prefix+"wib_bk_no");    	
	bk_date_org 		= sheetObj.GetCellValue(i, prefix+"bk_date");      	
	ref_no_org 			= sheetObj.GetCellValue(i, prefix+"ref_no");       	
	commc_inv_no_org 	= sheetObj.GetCellValue(i, prefix+"commc_inv_no"); 	
	rmk_org 			= sheetObj.GetCellValue(i, prefix+"rmk");        	
	owner_cd_org 		= sheetObj.GetCellValue(i, prefix+"owner_cd");        
	owner_addr1_org 	= sheetObj.GetCellValue(i, prefix+"owner_addr1");     
	owner_addr2_org 	= sheetObj.GetCellValue(i, prefix+"owner_addr2");     
	owner_addr3_org 	= sheetObj.GetCellValue(i, prefix+"owner_addr3");     
	owner_addr4_org 	= sheetObj.GetCellValue(i, prefix+"owner_addr4");     
	owner_addr5_org 	= sheetObj.GetCellValue(i, prefix+"owner_addr5");     
	supp_cd_org 		= sheetObj.GetCellValue(i, prefix+"supp_cd");        
	supp_addr1_org 		= sheetObj.GetCellValue(i, prefix+"supp_addr1");      
	supp_addr2_org 		= sheetObj.GetCellValue(i, prefix+"supp_addr2");      
	supp_addr3_org 		= sheetObj.GetCellValue(i, prefix+"supp_addr3");      
	supp_addr4_org 		= sheetObj.GetCellValue(i, prefix+"supp_addr4");      
	supp_addr5_org 		= sheetObj.GetCellValue(i, prefix+"supp_addr5");      
	vsl_cd_org 			= sheetObj.GetCellValue(i, prefix+"vsl_cd");        
	vsl_nm_org 			= sheetObj.GetCellValue(i, prefix+"vsl_nm");        
	voy_org 			= sheetObj.GetCellValue(i, prefix+"voy");        	
	carrier_cd_org 		= sheetObj.GetCellValue(i, prefix+"carrier_cd");      
	carrier_nm_org 		= sheetObj.GetCellValue(i, prefix+"carrier_nm");      
	pol_org 			= sheetObj.GetCellValue(i, prefix+"pol");        	
	pod_org 			= sheetObj.GetCellValue(i, prefix+"pod");        	
	del_org				= sheetObj.GetCellValue(i, prefix+"del");        	
	etd_org 			= sheetObj.GetCellValue(i, prefix+"etd");        	
	eta_org				= sheetObj.GetCellValue(i, prefix+"eta");        	

}
function getData(i){
	var sheetObj = sheet5;
	var prefix= fix_grid05;	
	merge_key 		= sheetObj.GetCellValue(i, prefix+"merge_key");       
	wh_cd 			= sheetObj.GetCellValue(i, prefix+"wh_cd");        	
	cust_ord_no 	= sheetObj.GetCellValue(i, prefix+"cust_ord_no");     
	ord_tp_cd		= sheetObj.GetCellValue(i, prefix+"ord_tp_cd");       
	est_in_dt		= sheetObj.GetCellValue(i, prefix+"est_in_dt");       
	est_in_hm		= sheetObj.GetCellValue(i, prefix+"est_in_hm");       
	bk_sts_cd		= sheetObj.GetCellValue(i, prefix+"bk_sts_cd");       
	ctrt_no 		= sheetObj.GetCellValue(i, prefix+"ctrt_no");        
	ctrt_nm 		= sheetObj.GetCellValue(i, prefix+"ctrt_nm");        
	inbound_dt 		= sheetObj.GetCellValue(i, prefix+"inbound_dt");     
	inbound_hm 		= sheetObj.GetCellValue(i, prefix+"inbound_hm");     
	inbound_pl_qty 	= sheetObj.GetCellValue(i, prefix+"inbound_pl_qty"); 
	inbound_bx_qty 	= sheetObj.GetCellValue(i, prefix+"inbound_bx_qty"); 
	inbound_ea_qty 	= sheetObj.GetCellValue(i, prefix+"inbound_ea_qty"); 
	inbound_sqft 	= sheetObj.GetCellValue(i, prefix+"inbound_sqft");   
	inbound_cbm 	= sheetObj.GetCellValue(i, prefix+"inbound_cbm");    
	inbound_grs_kgs = sheetObj.GetCellValue(i, prefix+"inbound_grs_kgs");
	inbound_net_kgs = sheetObj.GetCellValue(i, prefix+"inbound_net_kgs");
	eq_tpsz_cd 		= sheetObj.GetCellValue(i, prefix+"eq_tpsz_cd");     
	eq_no 			= sheetObj.GetCellValue(i, prefix+"eq_no");        	
	seal_no 		= sheetObj.GetCellValue(i, prefix+"seal_no");      	
	dlv_ord_no 		= sheetObj.GetCellValue(i, prefix+"dlv_ord_no");   	
	load_tp_cd 		= sheetObj.GetCellValue(i, prefix+"load_tp_cd");   	
	trade_tp_cd		= sheetObj.GetCellValue(i, prefix+"trade_tp_cd");  	
	fwd_tp_cd		= sheetObj.GetCellValue(i, prefix+"fwd_tp_cd");    	
	mbl_no 			= sheetObj.GetCellValue(i, prefix+"mbl_no");       	
	hbl_no 			= sheetObj.GetCellValue(i, prefix+"hbl_no");       	
	wib_bk_no 		= sheetObj.GetCellValue(i, prefix+"wib_bk_no");    	
	bk_date 		= sheetObj.GetCellValue(i, prefix+"bk_date");      	
	ref_no 			= sheetObj.GetCellValue(i, prefix+"ref_no");       	
	commc_inv_no 	= sheetObj.GetCellValue(i, prefix+"commc_inv_no"); 	
	rmk 			= sheetObj.GetCellValue(i, prefix+"rmk");        	
	owner_cd 		= sheetObj.GetCellValue(i, prefix+"owner_cd");        
	owner_addr1 	= sheetObj.GetCellValue(i, prefix+"owner_addr1");     
	owner_addr2 	= sheetObj.GetCellValue(i, prefix+"owner_addr2");     
	owner_addr3 	= sheetObj.GetCellValue(i, prefix+"owner_addr3");     
	owner_addr4 	= sheetObj.GetCellValue(i, prefix+"owner_addr4");     
	owner_addr5 	= sheetObj.GetCellValue(i, prefix+"owner_addr5");     
	supp_cd 		= sheetObj.GetCellValue(i, prefix+"supp_cd");        
	supp_addr1 		= sheetObj.GetCellValue(i, prefix+"supp_addr1");      
	supp_addr2 		= sheetObj.GetCellValue(i, prefix+"supp_addr2");      
	supp_addr3 		= sheetObj.GetCellValue(i, prefix+"supp_addr3");      
	supp_addr4 		= sheetObj.GetCellValue(i, prefix+"supp_addr4");      
	supp_addr5 		= sheetObj.GetCellValue(i, prefix+"supp_addr5");      
	vsl_cd 			= sheetObj.GetCellValue(i, prefix+"vsl_cd");        
	vsl_nm 			= sheetObj.GetCellValue(i, prefix+"vsl_nm");        
	voy 			= sheetObj.GetCellValue(i, prefix+"voy");        	
	carrier_cd 		= sheetObj.GetCellValue(i, prefix+"carrier_cd");      
	carrier_nm 		= sheetObj.GetCellValue(i, prefix+"carrier_nm");      
	pol 			= sheetObj.GetCellValue(i, prefix+"pol");        	
	pod 			= sheetObj.GetCellValue(i, prefix+"pod");        	
	del				= sheetObj.GetCellValue(i, prefix+"del");        	
	etd 			= sheetObj.GetCellValue(i, prefix+"etd");        	
	eta				= sheetObj.GetCellValue(i, prefix+"eta");        	
}
function setMergeCell(startRow, totalRowMerge){
	var sheetObj = sheet5;
	var prefix= fix_grid05;
	sheetObj.SetMergeCell(startRow, 1  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 2  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 3  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 4  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 5  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 6  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 7  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 8  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 9  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 10  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 11  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 12  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 13  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 14  , totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 15	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 16	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 17	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 18	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 19	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 20	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 21	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 22	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 23	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 24	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 25	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 26	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 27	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 28	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 29	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 30	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 31	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 32	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 33	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 34	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 35	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 36	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 37	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 38	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 39	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 40	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 41	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 42	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 43	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 44	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 45	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 46	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 47	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 48	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 49	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 50	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 51	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 52	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 53	, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 54	, totalRowMerge, 1);
}
function sheet1_OnKeyDown(sheetObj, Row, Col, KeyCode) { 
    if(KeyCode == 13) {
    	var colName=sheetObj.ColSaveName(Col);
    	var sUrl="";
    	cur_row = Row;
    	cur_col = Col;
    	cur_sheetObj = sheetObj;
    	
    	with(sheetObj)
    	{
    		if(colName == fix_grid01 + "ctrt_nm")
    		{
    			sheetObj.SelectCell(Row, Col);
    			var ord_tp_lvl1_cd="\'P\'";
    			if(sheet2.RowCount()> 0)
    			{
    				//confirm
    				if(ComShowCodeConfirm("COM0294") == false)
    				{
    					sheet1.SetCellValue(Row, Col,sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no_org"),0);
    					return;
    				}
    				//SHEET 초기화
    				sheet2.RemoveAll();
    			}
    			rtnary=new Array(3);
    			rtnary[0]=sheet1.GetCellValue(Row, Col);
    			rtnary[1]="";
    			rtnary[2]=ord_tp_lvl1_cd;
    			rtnary[3]=window;
    			
    			var params = "?ctrt_nm="+sheet1.GetCellValue(Row, Col); 
    		      
    		    callBackFunc = "setContactInfoGrid";
    		    modal_center_open('./ContractRoutePopup.clt' + params, rtnary, 900, 580,"yes");
    		
    			//sUrl="ContractRoutePopup.do?ctrt_no="+sheetObj.GetCellValue(Row, Col)+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd + "&pnl_svc_tp_cd=" + pnl_svc_tp_cd;
    	    	//ComOpenPopup(sUrl, 800, 620, "setContactInfoGrid", "0,0", true, sheetObj, Row, Col);
    		}				
    		else if ( colName == fix_grid01 + "eq_tpsz_cd" ) 
    		{
    			sheetObj.SelectCell(Row, Col);
    			var tp="A";
    			if(sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd")) != "")
    			{
    				tp=sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd"));
    			}
    			callBackFunc = "setTruckTypeInfoGrid";
    		    modal_center_open('./ContainerTypePopup.clt?type=' + tp + '&eq_unit='+sheetObj.GetCellValue(Row, Col), rtnary, 400, 590,"yes");
    		}
    		else if (colName == fix_grid01 + "seal_no")
    		{
    			sheetObj.SelectCell(Row, Col);
    			ComShowMemoPad3(sheetObj, Row, Col, false, 300, 82,  Col, Col);      
    		}
    		else if (colName == fix_grid01 + "rmk")
    		{
    			sheetObj.SelectCell(Row, Col);
    			ComShowMemoPad4(sheetObj, Row, Col, false, 200, 100,Col, Col);
    		}
    		/*else if(colName == fix_grid01 + "owner_addr1")
    		{
    			sheetObj.SelectCell(Row, Col);
    			rtnary=new Array(1);
    			rtnary[0]="2";
    			rtnary[1]=sheet1.GetCellValue(Row, Col);
    			rtnary[2]=window;
    			callBackFunc = "setCustCdGrid";
    	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    		}*/
    		/*else if(colName == fix_grid01 + "supp_addr1")
    		{
    			sheetObj.SelectCell(Row, Col);
    			rtnary=new Array(1);
    			rtnary[0]="2";
    			rtnary[1]=sheet1.GetCellValue(Row, Col);
    			rtnary[2]=window;
    			callBackFunc = "setCustCdGrid";
    	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    		}*/
    		else if(colName == fix_grid01 + "vsl_nm")
    		{
    			sheetObj.SelectCell(Row, Col);
    			rtnary=new Array(2);
    			rtnary[0]="1";
    			rtnary[1]=sheet1.GetCellValue(Row, Col);
    		   	var sUrl="./CMM_POP_0140.clt";
    		   	callBackFunc = "setVslInfoGrid";
    		   	modal_center_open(sUrl, rtnary, 900,500,"yes");
    		}
    		else if(colName == fix_grid01 + "carrier_nm")
    		{
    			sheetObj.SelectCell(Row, Col);
    			rtnary=new Array(1);
    			rtnary[0]="2";
    			rtnary[1]=sheet1.GetCellValue(Row, Col);
    			rtnary[2]=window;
    			callBackFunc = "setCustCdGrid";
    	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    		}
    		else if (colName == fix_grid01 + "pod")
    		{
    			sheetObj.SelectCell(Row, Col);
    			podGridPopup("pod", sheetObj, Row, Col, fix_grid01);
    		}
    		else if (colName == fix_grid01 + "pol")
    		{
    			sheetObj.SelectCell(Row, Col);
    			podGridPopup("pol", sheetObj, Row, Col, fix_grid01);
    		}
    		else if (colName == fix_grid01 + "del")
    		{
    			sheetObj.SelectCell(Row, Col);
    			podGridPopup("del", sheetObj, Row, Col, fix_grid01);
    		}
    		else if(colName == fix_grid01 + "owner_addr2")
    		{
    			sheetObj.SelectCell(Row, Col);
    			ComShowMemoPad5(sheetObj, Row, Col, false, 300, 120,  Col, fix_grid01 + "owner_addr1", fix_grid01 + "owner_addr2", fix_grid01 + "owner_addr3"
    					, fix_grid01 + "owner_addr4", fix_grid01 + "owner_addr5"		
    			);      
    		}
    		else if(colName == fix_grid01 + "supp_addr1")
    		{
    			sheetObj.SelectCell(Row, Col);
    			ComShowMemoPad4(sheetObj, Row, Col, false, 200, 100,Col, Col);     
    		}
    	}
    }
}
function sheet2_OnKeyDown(sheetObj, Row, Col, KeyCode) { 
    if(KeyCode == 13) {
    	var colName=sheetObj.ColSaveName(Col);
    	var sUrl="";
    	with(sheetObj)
    	{
    		if(colName == fix_grid02 + "item_nm")
    		{
    			sheetObj.SelectCell(Row, Col);
    		   	var sUrl="./CtrtItemPopup.clt?ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02 + "ctrt_no")
    												    +"&item_nm="+ sheetObj.GetCellValue(Row, Col)
    													+"&wh_cd=" +  sheetObj.GetCellValue(Row, fix_grid02 + "wh_cd");
    		   	callBackFunc = "setItemGrid";
    			modal_center_open(sUrl, callBackFunc, 400, 520,"yes");
    		}	
    		else if(colName == fix_grid02 + "item_pkgunit")
    		{
    			sheetObj.SelectCell(Row, Col);
    			if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
    			{
    				ComShowCodeMessage("COM0114","Item");
    				sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
    				return;
    			}
    			var sUrl="./CommonCodePopup.clt?grp_cd=A6&code="+sheetObj.GetCellValue(Row, Col)
    			                            + "&wh_flag=Y" 
    			                            + "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no")
    			                            + "&item_sys_no=" + sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no");
    			callBackFunc = "setPkgunitGrid";
    			modal_center_open(sUrl, callBackFunc, 400, 520,"yes");
    			
    		}	
    		else if(colName == fix_grid02 + "snd_pkgunit")
    		{
    			sheetObj.SelectCell(Row, Col);
    			if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
    			{
    				ComShowCodeMessage("COM0114","Item");
    				sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
    				return;
    			}
    			var sUrl="./CommonCodePopup.clt?grp_cd=A6&code="+sheetObj.GetCellValue(Row, Col)
                + "&wh_flag=Y" 
                + "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no")
                + "&item_sys_no=" + sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no");
    			callBackFunc = "setPkgunitGrid_snd_pkgunit";
    			modal_center_open(sUrl, callBackFunc, 400, 520,"yes");	
    		}
    		else if(colName == fix_grid02 + "dmg_pkgunit")
    		{
    			sheetObj.SelectCell(Row, Col);
    			if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
    			{
    				ComShowCodeMessage("COM0114","Item");
    				sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
    				return;
    			}
    			var sUrl="./CommonCodePopup.clt?grp_cd=A6&code="+sheetObj.GetCellValue(Row, Col)
                + "&wh_flag=Y" 
                + "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no")
                + "&item_sys_no=" + sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no");
    			callBackFunc = "setPkgunitGrid_dmg_pkgunit";
    			modal_center_open(sUrl, callBackFunc, 400, 520,"yes");		
    		}
    		else if(colName == fix_grid02 + "item_pkgunit")
    		{
    			sheetObj.SelectCell(Row, Col);
    			if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
    			{
    				ComShowCodeMessage("COM0114","Item");
    				sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
    				return;
    			}
    			var sUrl="CommonCodePopup.do?grp_cd=A6&code="+sheetObj.GetCellValue(Row, Col)
    			                            + "&wh_flag=Y" 
    			                            + "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no")
    			                            + "&item_sys_no=" + sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no");
    			ComOpenPopup(sUrl, 400, 560, "setPkgunitGrid", "0,0", true, sheetObj, Row, Col);	
    		}	
    		else if ( colName == fix_grid02 + "inbound_loc_nm" ) 
    		{
    			sheetObj.SelectCell(Row, Col);
    			var sUrl="./WarehouseLocPopup.clt?f_loc_cd="+ sheetObj.GetCellValue(Row, fix_grid02+"wh_cd")
    			                             + "&f_putaway_flg=Y&f_move_flg=Y&f_not_loc_prop=DMG" + "&f_wh_loc_nm=" + sheetObj.GetCellValue(Row, Col);			
    			if(sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd").trim() != "")
    			{
    				sUrl=sUrl + "&f_fix_wh_loc_nm=" + sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd_nm");
    			}
    			callBackFunc = "setInboundLocInfoGrid";
    			modal_center_open(sUrl, '', 700, 500,"yes");
    		}
    		else if ( colName == fix_grid02 + "dmg_loc_nm" ) 
    		{
    			sheetObj.SelectCell(Row, Col);
    			var sUrl="./WarehouseLocPopup.clt?f_loc_cd="+ sheetObj.GetCellValue(Row, fix_grid02+"wh_cd")
    			                             + "&f_putaway_flg=Y&f_move_flg=Y&f_loc_prop=DMG" + "&f_wh_loc_nm=" + sheetObj.GetCellValue(Row, Col);			
    			callBackFunc = "setDamageLocInfoGrid";
    			modal_center_open(sUrl, '', 700, 500,"yes");
    		}
    		else if (colName == fix_grid02 + "lot_id")
    		{
    			sheetObj.SelectCell(Row, Col);
    			if(sheetObj.GetCellValue(Row, fix_grid02 + "lot_id").trim() == "" )
    			{
    				if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
    				{
    					ComShowCodeMessage("COM0114","Item");
    					sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
    					return;
    				}
    				var sParam="wh_cd=" + sheetObj.GetCellValue(Row, fix_grid02+"wh_cd");
    				sParam += "&wh_nm=" + sheetObj.GetCellValue(Row, fix_grid02+"wh_nm");
    				sParam += "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no");
    				sParam += "&ctrt_nm=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_nm");
    				sParam += "&item_cd=" + encodeURIComponent(sheetObj.GetCellValue(Row, fix_grid02+"item_cd"));
    				sParam += "&fix_lot_id=" + sheetObj.GetCellValue(Row, Col);
    				sParam += "&inbound_dt=" + sheetObj.GetCellValue(Row, fix_grid02+"inbound_dt");
    			   	
    				callBackFunc = "setLotInfoGrid";
    			   	var sUrl="./WHInLotSelectPopup.clt?" + sParam;
    				modal_center_open(sUrl, callBackFunc, 1050, 500,"yes");
    			}
    			else
    			{
    				sheetObj.SetCellValue(Row, fix_grid02 + "lot_id","",0);
    				sheetObj.SetCellValue(Row, fix_grid02 + "inbound_dt","",0);
    				sheetObj.SetCellValue(Row, fix_grid02 + "lot_no","",0);
    				sheetObj.SetCellValue(Row, fix_grid02 + "lot_id","",0);
    				sheetObj.SetCellValue(Row, fix_grid02 + "exp_dt","",0);
    				sheetObj.SetCellValue(Row, fix_grid02 + "lot_04","",0);
    				sheetObj.SetCellValue(Row, fix_grid02 + "lot_05","",0);
    				sheetObj.SetCellEditable(Row, fix_grid02 + "inbound_dt",1);
    				sheetObj.SetCellEditable(Row, fix_grid02 + "lot_no",1);
    				sheetObj.SetCellEditable(Row, fix_grid02 + "exp_dt",1);
    				sheetObj.SetCellEditable(Row, fix_grid02 + "lot_04",1);
    				sheetObj.SetCellEditable(Row, fix_grid02 + "lot_05",1)
     				sheetObj.PopupButtonImage(Row, fix_grid02 + "lot_id")=0;
    			}
    		}
    		else if (colName == fix_grid02 + "curr_cd")
    		{
    			sheetObj.SelectCell(Row, Col);
    			var sUrl="CommonCodePopup.do?grp_cd=A5&code="+sheetObj.GetCellValue(Row, Col);
    			ComOpenPopup(sUrl, 400, 560, "setCurrCdGrid", "0,0", true, sheetObj, Row, Col);
    		}
    	}
    }
}

// AUTO Process(Sound)
function fn_addRowFrLimitCnt(colStr, sSndEaQty, sPkgLvlQty, sLicplatNo) {
	// Item Entry에서 등록한 License Plate Unit Qty를 기준으로 Row 자동 추가
	if (sLicplatNo != "AUTO" || sSndEaQty == "0" || sPkgLvlQty == "0") {
		return false;
	} else {
		if (Number(sSndEaQty) > Number(sPkgLvlQty)) {
			var inputString = prompt('Please enter a LP No!', 'AUTO');
//			if (inputString == null) {
//				return false;
//			} else {
				if (inputString == "AUTO") {
					var addCnt = roundXL(sSndEaQty/sPkgLvlQty,2);
					if (String(addCnt).indexOf(".") == -1) {
						addCnt = parseInt(addCnt - 1);
					} else {
						addCnt = parseInt(addCnt);
					}
					var remainCnt = 0;
					// Row 추가 개수 제한
					if (addCnt > 100) {
						alert("Limit Row Count : 100");
					} else {
						if (addCnt > 0) {
							sheet2.HideSubSum();
						}
						var row2 = sheet2.GetSelectRow();
						var sRcvPkgqty = sheet2.GetCellValue(row2, fix_grid02 + "rcv_pkgqty");
						var ratio = parseInt(sSndEaQty/Number(sRcvPkgqty));
						for (var i = 0 ; i <= addCnt ; i++) {
							if (i > 0) {
								row2 = sheet2.DataCopy();
								sheet2.SetCellValue(row2, fix_grid02 + "item_pkgqty", "0"); 
							}
							
							if (i == addCnt) {
								remainCnt = sSndEaQty - (sPkgLvlQty * addCnt);
							} else {
								remainCnt = sPkgLvlQty;
							}
							remainCnt = parseInt(remainCnt/ratio);
							sheet2.SetCellValue(row2, fix_grid02 + "rcv_pkgqty", remainCnt); 
		
						}
						sheet2.SetMergeCell(row2-addCnt, 7, addCnt + 1, 1);
						sheet2.SetMergeCell(row2-addCnt, 8, addCnt + 1, 1);
					}
				} else {
					if (inputString == null) {
						inputString = "";
					}
					sheet2.SetCellValue(row2, fix_grid02 + "lic_plat_no", inputString);
				}
//			}
		}
	}
}

// AUTO Process(Damage)
function fn_addRowDmgFrLimitCnt(colStr, sDmgEaQty, sPkgLvlQty, sLicplatNo) {
	// Item Entry에서 등록한 License Plate Unit Qty를 기준으로 Row 자동 추가
	if (sLicplatNo != "AUTO" || sDmgEaQty == "0" || sPkgLvlQty == "0") {
		return false;
	} else {
		if (Number(sDmgEaQty) > Number(sPkgLvlQty)) {
			var row2 = sheet2.GetSelectRow();
			var inputString = prompt('Please enter a LP No!', 'AUTO');
//			if (inputString == null) {
//				return false;
//			} else {
			if (inputString == "AUTO") {
				var addCnt = roundXL(sDmgEaQty/sPkgLvlQty,2);
				if (String(addCnt).indexOf(".") == -1) {
					addCnt = parseInt(addCnt - 1);
				} else {
					addCnt = parseInt(addCnt);
				}
				var remainCnt = 0;
				// Row 추가 개수 제한
				if (addCnt > 10) {
					alert("Limit Row Count : 10");
				} else {
					var sRcvPkgqty = sheet2.GetCellValue(row2, fix_grid02 + "dmg_pkgqty");
					var ratio = parseInt(sDmgEaQty/Number(sRcvPkgqty));
					
					for (var i = 0 ; i <= addCnt ; i++) {
						if (i > 0) {
							row2 = sheet2.DataCopy();
							sheet2.SetCellValue(row2, fix_grid02 + "item_pkgqty", "0"); 
						}
						
						if (i == addCnt) {
							remainCnt = sDmgEaQty - (sPkgLvlQty * addCnt);
						} else {
							remainCnt = sPkgLvlQty;
						}
						remainCnt = parseInt(remainCnt/ratio);
						sheet2.SetCellValue(row2, fix_grid02 + "dmg_pkgqty", remainCnt); 
						
					}
				}
			} else {
				if (inputString == null) {
					inputString = "";
				}
				sheet2.SetCellValue(row2, fix_grid02 + "lic_plat_no", inputString);
			}
//			}
		}
	}
}
function vslCdSearch(obj){
	var formObj=document.form;
	formObj.vsl_nm.value='';
	if(obj.value==''){
		return;
	}
	ajaxSendPost(dispVslCdSearch, "reqVal", '&goWhere=aj&bcKey=searchTlVslInfo&'+"code="+obj.value, './GateServlet.gsl');
}
function dispVslCdSearch(reqVal){
	var frm1=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='ERR'){
				frm1.vsl_cd.value='';
			}else{
				var rtnValArr=doc[1].split('^@');
				frm1.vsl_nm.value=rtnValArr[0];
			}
		}else{
			frm1.vsl_cd.value='';	
		}
	}else{
		frm1.vsl_cd.value='';
	}
}
function list_in_search_tp_onchange(){
	var formObj = document.form;
		formObj.list_in_no.value = "";
}
function btn_show_shipping(showFlg){
	if(showFlg){
		document.all.btn_hide_nm.style.display="block";
		document.all.btn_show_nm.style.display="none";
		document.all.show_shipping.style.display="block";
	}else{
		document.all.btn_hide_nm.style.display="none";
		document.all.btn_show_nm.style.display="block";
		document.all.show_shipping.style.display="none";
	}
}

function fn_auto_rating() {

	l_btn_rateFlg = true
	
	var formObj=document.form;
	var sheetObj=sheet6;

	// Bill To Check
	if(ComIsEmpty(formObj.bill_to_cd))
	{
		ComShowCodeMessage("COM0114","Bill To");
		$("#bill_to_cd").focus();
		return false;
	}

	var sheetObj=sheet6;
    var prefix="Grd06";
    hdrR = sheetObj.HeaderRows();
    rowCnt = sheetObj.RowCount();
    
    // There are some changes (Rate Details) not saved. Are you sure to continue without saving the changes?
    for (var i = hdrR; i < rowCnt + hdrR; i++) {
    	if(sheetObj.IsDataModified()) {
    		if(ComShowCodeConfirm("COM0291") == false){
    			return;
    		} else {
    			break;
    		}
    	}
    }
	
    hdrR = sheetObj.HeaderRows();
    rowCnt = sheetObj.RowCount();
	
	//sheet초기화 및 form tab초기화	
	formObj.f_cmd.value = SEARCH06;
 	var sXml=sheetObj.GetSearchData("./searchWHInMgmtListGS.clt", FormQueryString(formObj,""));
 	
 	var strtIndxSheet1 = sXml.indexOf("<SHEET6>");
	var endIndxSheet1 = sXml.indexOf("</SHEET6>") + "</SHEET6>".length;
	
	var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
	sheet6.LoadSearchData(sheet1Data.replaceAll('SHEET6', 'SHEET'));
	//#5563 [Binex] WMS Contract Currency to overwrite Office Local Currency
	var param = '&wib_bk_no=' + formObj.wib_bk_no.value + '&cust_cd=' + formObj.bill_to_cd.value + '&wh_cd=' + formObj.wh_cd.value + '&inbound_dt=' + formObj.inbound_dt.value;
	param +=  '&cust_ord_no=' + formObj.cust_ord_no.value + '&ctrt_no=' + formObj.ctrt_no.value;
	ajaxSendPost(setDefaultCurrCd, 'reqVal', '&goWhere=aj&bcKey=searchWHInRateInOutCurrCd' + param , './GateServlet.gsl');
}

function fn_frt_add() {
	var formObj=document.form;
	
	//#390 [Closing In & Out Entry] Can't save data successfully
	if (isNull(formObj.bill_to_cd)) {
		ComShowCodeMessage("COM0278", "Bill To");
		formObj.bill_to_cd.focus();
		return;
	}
	
	//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
	if (isNull(formObj.wh_curr_cd)) {
		ComShowCodeMessage("COM0278", "Warehouse");
		goTabSelect('01');
		formObj.wh_cd.focus();
		return;
	}		
	
	
	var row=sheet6.DataInsert(sheet6.HeaderRows() + sheet6.RowCount());
	// Init Value Set
	if (sheet6.RowCount() > 1) {
		sheet6.SetCellValue(row, fix_grid06 + "rate_tp_cd", sheet6.GetCellValue(row-1, fix_grid06 + "rate_tp_cd"));
		sheet6.SetCellValue(row, fix_grid06 + "cust_cd", sheet6.GetCellValue(row-1, fix_grid06 + "cust_cd"));
		sheet6.SetCellValue(row, fix_grid06 + "curr_cd", sheet6.GetCellValue(row-1, fix_grid06 + "curr_cd"));
		sheet6.SetCellValue(row, fix_grid06 + "wh_cd", sheet6.GetCellValue(row-1, fix_grid06 + "wh_cd"));
		sheet6.SetCellValue(row, fix_grid06 + "wib_bk_no", sheet6.GetCellValue(row-1, fix_grid06 + "wib_bk_no"));
		sheet6.SetCellValue(row, fix_grid06 + "cust_ord_no", sheet6.GetCellValue(row-1, fix_grid06 + "cust_ord_no"));
		sheet6.SetCellValue(row, fix_grid06 + "ctrt_no", sheet6.GetCellValue(row-1, fix_grid06 + "ctrt_no"));
		sheet6.SetCellValue(row, fix_grid06 + "ofc_cd", sheet6.GetCellValue(row-1, fix_grid06 + "ofc_cd"));
	} else {		
		sheet6.SetCellValue(row, fix_grid06 + "rate_tp_cd", 'IN');
		sheet6.SetCellValue(row, fix_grid06 + "cust_cd", formObj.bill_to_cd.value);
		sheet6.SetCellValue(row, fix_grid06 + "wh_cd", formObj.wh_cd.value);
		sheet6.SetCellValue(row, fix_grid06 + "wib_bk_no", formObj.wib_bk_no.value);
		sheet6.SetCellValue(row, fix_grid06 + "cust_ord_no", formObj.cust_ord_no.value);
		sheet6.SetCellValue(row, fix_grid06 + "ctrt_no", formObj.ctrt_no.value);
		sheet6.SetCellValue(row, fix_grid06 + "ofc_cd", formObj.wh_ofc_cd.value);
		sheet6.SetCellValue(row, fix_grid06 + "curr_cd", formObj.wh_curr_cd.value);
	}
	
    // SKU ComboList조회
 	var p_ctrt_no = formObj.ctrt_no.value;
 	var p_wh_cd = formObj.wh_cd.value;
 	sheet6Row = row;
 	ajaxSendPost(dispAjaxReq_sheet6, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');
 	//#5563 [Binex] WMS Contract Currency to overwrite Office Local Currency
 	addFrt = true;
	var param = '&wib_bk_no=' + formObj.wib_bk_no.value + '&cust_cd=' + formObj.bill_to_cd.value + '&wh_cd=' + formObj.wh_cd.value + '&inbound_dt=' + formObj.inbound_dt.value;
	param +=  '&cust_ord_no=' + formObj.cust_ord_no.value + '&ctrt_no=' + formObj.ctrt_no.value;
	ajaxSendPost(setDefaultCurrCd, 'reqVal', '&goWhere=aj&bcKey=searchWHInRateInOutCurrCd' + param , './GateServlet.gsl');
}

//#5563 [Binex] WMS Contract Currency to overwrite Office Local Currency
var addFrt = false;
function setDefaultCurrCd(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		var currCdDft = '';
		if(typeof(doc[1])!='undefined'){
			currCdDft = doc[1];
			rate_curr_cd = doc[1];
		}
		else{
			currCdDft = formObj.wh_curr_cd.value;	
			rate_curr_cd = '';
		}
		if(addFrt){
			var row = sheet6.RowCount() + sheet6.HeaderRows() - 1;			
			sheet6.SetCellValue(row, fix_grid06 + "curr_cd", currCdDft);
		}
		document.getElementById("sp_curr_cd").innerHTML = currCdDft;
	}
	addFrt = false;
}

function dispAjaxReq_sheet6(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				//특정 셀의 콤보 항목 바꾸기
				sheet6.CellComboItem(sheet6Row,"Grd06item_cd",{ComboText:rtnArr[0], ComboCode:rtnArr[1]} );
			}
			else{
				ComShowCodeMessage("COM130401");
			}
		}
		else{
			ComShowCodeMessage("COM130401");
		}
	}
}

function sheet6_OnSaveEnd(sheetObj){
	l_btn_rateFlg = false;
}

function sheet6_OnSearchEnd(){
	var sheetObj=sheet6;
    var prefix="Grd06";
    hdrR = sheetObj.HeaderRows();
    rowCnt = sheetObj.RowCount();

    sheetObj.InitComboNoMatchText(1, "",1);
    
    var formObj=document.form; 
    var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
    var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
    formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
    
    // #1392 [WMS4.0] Inbound/Outbound Management Freight Status 표기
    formObj.s_sts_nm.value = "New";
    
    for (var i = hdrR; i < rowCnt + hdrR; i++) {
    	// SKU ComboList조회
    	var p_ctrt_no = formObj.ctrt_no.value;
    	var p_wh_cd = formObj.wh_cd.value;
    	sheet6Row = i;
    	ajaxSendPost(dispAjaxReq_sheet6, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');
    	
//    	sheetObj.SetCellValue(i, prefix + "rating_flg", "N", 0);
    	
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
		// #2096 [WMS4.0]Inbound / Outbound Freight Tab의 Item항목 비활성화
    	// Handling Unit 또는 Package Unit이 아닌경우, Item Code 비활성화
		// Item 코드는 항상 비활성화 이어야 함. Rate에서 셋팅된것만 가지고 와야 함
    	if (sheetObj.GetCellValue(i, prefix + "unit_cd") != "HUT" && sheetObj.GetCellValue(i, prefix + "unit_cd") != "PUT") {
    		sheetObj.SetCellEditable(i, prefix+"item_cd",0);
    		sheetObj.SetCellValue(i, prefix+"item_cd","");
    	} else {
    		sheetObj.SetCellEditable(i, prefix+"item_cd",0);
    	}
		
		// Closing Status가 Confirmed Or Invoiced인 경우
		if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "CON"
			|| sheetObj.GetCellValue(i, prefix + "sts_cd") == "INV") {
			sheetObj.SetRowEditable(i, 0);
			formObj.bill_to_cd.disabled = true;
			formObj.bill_to_nm.disabled = true;
			formObj.btn_bill_to_cd.disabled = true;
			formObj.btn_rating.disabled = true;
			formObj.btn_frtAdd.disabled = true;

		} else {
			formObj.bill_to_cd.disabled = false;
			formObj.bill_to_nm.disabled = false;
			formObj.btn_bill_to_cd.disabled = false;
			formObj.btn_rating.disabled = false;
			formObj.btn_frtAdd.disabled = false;
//			sheetObj.SetRowEditable(i, 1);
//			if (sheetObj.GetCellValue(i, prefix + "rating_flg") != "Y") {
//			sheetObj.SetCellEditable(i, prefix+"rate_tp_cd",1);
			sheetObj.SetCellEditable(i, prefix+"frt_cd",1);
			sheetObj.SetCellEditable(i, prefix+"unit_cd",1);
//				sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			sheetObj.SetCellEditable(i, prefix+"unit_price",1);
			sheetObj.SetCellEditable(i, prefix+"qty",1);
//			sheetObj.SetCellEditable(i, prefix+"item_cd",1);
//			} else {
//				sheetObj.SetCellEditable(i, prefix+"unit_price",1);
//				sheetObj.SetCellEditable(i, prefix+"qty",1);
//			}
		}
		
		//link 폰트색상 변경
		sheetObj.SetCellFontColor(i, prefix + "cls_no","#0100FF");
		sheetObj.SetCellFontColor(i, prefix + "cls_dt","#0100FF");
		sheetObj.SetCellFontColor(i, prefix + "cust_cd","#0100FF");
		sheetObj.SetCellFontColor(i, prefix + "cust_nm","#0100FF");
		sheetObj.SetCellFontColor(i, prefix + "inv_seq","#0100FF");
		sheetObj.SetCellFontColor(i, prefix + "inv_no","#0100FF");
		
		sheetObj.SetCellFontUnderline(i, prefix +  "cls_no", 1);
		sheetObj.SetCellFontUnderline(i, prefix +  "cls_dt", 1);
		sheetObj.SetCellFontUnderline(i, prefix +  "cust_cd", 1);
		sheetObj.SetCellFontUnderline(i, prefix +  "cust_nm", 1);
		sheetObj.SetCellFontUnderline(i, prefix +  "inv_seq", 1);
		sheetObj.SetCellFontUnderline(i, prefix +  "inv_no", 1);
		
		if (!ComIsEmpty(sheetObj.GetCellValue(i, prefix + "curr_cd"))) {
			document.getElementById("sp_curr_cd").innerHTML = sheetObj.GetCellValue(i, prefix + "curr_cd");
			//#5563 [Binex] WMS Contract Currency to overwrite Office Local Currency
			rate_curr_cd = sheetObj.GetCellValue(i, prefix + "curr_cd");
		}
		
		// Bill To 정보가 있는 경우 
		// Default셋업 Owner가 아닌경우, Bill To Name설정
		if (!ComIsEmpty(sheetObj.GetCellValue(i, prefix + "cust_cd"))) {
			formObj.bill_to_cd.value = sheetObj.GetCellValue(i, prefix + "cust_cd");
	    	formObj.bill_to_cd.focus();
	    	formObj.btn_bill_to_cd.focus();   
		}
		
		// #1392 [WMS4.0] Inbound/Outbound Management Freight Status 표기
		// Freight Data Check
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
		if($("#sel_wib_bk_no").val().trim() == "")
		{
			$("#sel_wib_bk_no").val($("#wib_bk_no").val());
		}		
		ajaxSendPost(checkWMSFreightInfoExist, 'reqVal','&goWhere=aj&bcKey=checkWMSFreightInfo&cust_ord_no=' + formObj.cust_ord_no.value + '&wib_bk_no='+$("#sel_wib_bk_no").val(), './GateServlet.gsl');

		if (ComIsNull(sheetObj.GetCellValue(i, prefix + "sts_cd"))) {
			formObj.s_sts_nm.value = lv_StsNm;
			$("#s_sts_nm").css("color","gray");
		} else if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "SAV") {
			formObj.s_sts_nm.value = "Closing Saved";
			$("#s_sts_nm").css("color","blue");
		} else if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "CON") {
			formObj.s_sts_nm.value = "Confirmed";
			$("#s_sts_nm").css("color","red");
		} else if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "INV") {
			formObj.s_sts_nm.value = "Invoiced";
			$("#s_sts_nm").css("color","red");
		}
    }
    
	//Total
    sheetObj.SetSumValue(prefix + "qty", document.getElementById("sp_curr_cd").innerHTML + " Total");
}

function sheet6_OnChange(sheetObj, Row, Col, Value){
    var formObj=document.form;
    var prefix="Grd06";
    var sXml="";
    var sParm="";
    var srcName=sheetObj.ColSaveName(Col);
    tempRow = Row;
    tempCol = Col;

    switch (srcName) {
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
            	var strUnit2Text = "|CBM|CFT|G.KS|G.LB|N.KG|N.LB";
            	
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
            	
            	// #2096 [WMS4.0]Inbound / Outbound Freight Tab의 Item항목 비활성화
            	// Handling Unit 또는 Package Unit이 아닌경우, Item Code 비활성화
            	if (Value != "HUT" && Value != "PUT") {
            		sheetObj.SetCellEditable(Row, prefix+"item_cd",0);
            		sheetObj.SetCellValue(Row, prefix+"item_cd","");
            	} else {
            		sheetObj.SetCellEditable(Row, prefix+"item_cd",0);
            	}
            }
            break;
        case prefix+"unit_cd2":
        	if(!ComIsNull(Value)){

        	}
        	break;
        case prefix+"unit_price":
        	var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
        	var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
        	var inv_amt=qty * unit_price;
        	inv_amt = roundXL(Number(inv_amt),2);
        	if((inv_amt || qty) > 999999999999.99999999) {//15 digit
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(Row,prefix+"unit_price",0);
				return;
			} else {
				sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
			}
        	
//        	sheetObj.SetCellValue(Row, prefix+"inv_ttl_amt", inv_amt);
            break;
        case prefix+"qty":
        	var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
        	var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
        	var inv_amt=qty * unit_price;
        	inv_amt = roundXL(Number(inv_amt),2);
        	if((inv_amt || qty) > 999999999999.99999999) {//15 digit
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(Row,prefix+"qty",0);
				return;
			} else {
				sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
			}
        	
//        	sheetObj.SetCellValue(Row, prefix+"inv_ttl_amt", inv_amt);
            break;
//		case prefix+"del":
//			if(sheetObj.GetRowStatus(Row) == "I")
//			{
//				sheetObj.RowDelete(Row, false);
//				return;
//			}
//			sheetObj.SetRowHidden(Row,1);//2.행 숨기기
//			sheetObj.SetRowStatus(Row,"D");
    }
}

function sheet6_OnClick(sheetObj,Row, Col, Value){
    var formObj=document.form;
    var prefix="Grd06";
    var srcName=sheetObj.ColSaveName(Col);
    
    switch (srcName) {
//		case prefix+"row_del":
//			if(sheetObj.GetRowStatus(Row) == "I")
//			{
//				sheetObj.RowDelete(Row, false);
//				return;
//			}
//			sheetObj.SetRowHidden(Row,1);//2.행 숨기기
//			sheetObj.SetRowStatus(Row,"D");
    }
}

function sheet6_OnChangeSum(sheetObj, Row, Col) {
    var formObj=document.form;
    var prefix="Grd06";
	//합계 행에 값이 바뀌었을 때, 계산 정보 표시
    var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
    var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
    formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
}

/*
 * Customer search
 * OnKeyDown 13 or onChange
 */
function codeName(str, obj, tmp){
	var formObj=document.form;
	var s_code=obj.value.toUpperCase();
	var s_type="";
	if(s_code != ""){
		CODETYPE=str;
		if(str == "commodity") {
			s_type="commodity";
		}else{
			s_type="trdpCode";
		}
		if(tmp == "onKeyDown"){
			
			if(event.keyCode == 13){
				ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
		else if(tmp == "onBlur"){
			if(s_code != ""){
				ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}else{
		if(str == "CUSTUMER"){
			formObj.bill_to_cd.value="";//cust_cd  AS param1
			formObj.bill_to_nm.value="";//cust_nm   AS param2
		}
	}
}

var CODETYPE='';
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="CUSTUMER"){
				formObj.bill_to_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.bill_to_nm.value=masterVals[3];	//cust_nm   AS param2
//				docObjects[0].RemoveAll();
			}
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.bill_to_cd.value="";				//cust_cd  AS param1
				formObj.bill_to_nm.value="";				//cust_nm   AS param2
			}
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
function changeFrtinfo() {
	var formObj=document.form;
	var sheetObj=sheet6;
	//#5563 [Binex] WMS Contract Currency to overwrite Office Local Currency
	var df_curr_cd = rate_curr_cd != '' ? rate_curr_cd : formObj.wh_curr_cd.value;
	for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow();i++){
		
		if(sheetObj.GetCellValue(i, fix_grid06 + "cust_cd") != formObj.bill_to_cd.value){
			sheetObj.SetCellValue(i, fix_grid06 + "cust_cd", formObj.bill_to_cd.value);
		}

		if(sheetObj.GetCellValue(i, fix_grid06 + "cust_ord_no") != formObj.cust_ord_no.value){
			sheetObj.SetCellValue(i, fix_grid06 + "cust_ord_no", formObj.cust_ord_no.value);
		}
		
		if(sheetObj.GetCellValue(i, fix_grid06 + "curr_cd") != df_curr_cd){
			sheetObj.SetCellValue(i, fix_grid06 + "curr_cd", df_curr_cd);
		}
		if(sheetObj.GetCellValue(i, fix_grid06 + "ofc_cd") != formObj.wh_ofc_cd.value){
			sheetObj.SetCellValue(i, fix_grid06 + "ofc_cd", formObj.wh_ofc_cd.value);
		}
	}
	
}
function checdup_OrderNo() {
	var formObj=document.form;

	if(formObj.ctrt_no.value == '' || formObj.wh_cd.value == '') {
		alert("Contract# and Warehouse is not empty. please check input data!");
		formObj.cust_ord_no.value = '';
		return;
	}
	ajaxSendPost(checkDuplicateOrderNo, 'reqVal', '&goWhere=aj&bcKey=checkDuplicateOrderNo&cust_ord_no='+formObj.cust_ord_no.value + "&wh_cd=" + formObj.wh_cd.value + "&ctrt_no=" + formObj.ctrt_no.value, './GateServlet.gsl');
}
/**
 * AJAX RETURN
 * Check Dup Order No
 */
function checkDuplicateOrderNo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				ComShowCodeMessage("COM131302", "Order No");
				//#3195 [BINEX WMS4.0] [#3100 개선] INBOUND LIST AND ENTRY SHOWING DIFF SKU
				if($('#cust_ord_no').attr('org_cust_ord_no') != '') {
					$('#cust_ord_no').val($('#cust_ord_no').attr('org_cust_ord_no'));
				} else {
					formObj.cust_ord_no.value = "";
				}
			}
		}
	}
}

/**
 * AJAX RETURN
 * Check Freight Info
 */
function checkWMSFreightInfoResult(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] == "0"){
				if(validateForm(formObj, "ccancel") == false)
				{
					return;
				}
				var DocinDatas="";
				var fix_Docin="Docin";
				var sheetObj=sheet2;
				/*if($("#sel_tab").val() == "01") //list tab에서 delete
				{
					var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
					var arrRow=sRow.split("|"); //결과 : "1|3|5|"
					for(var i=0; i<arrRow.length; i++)
					{
						if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "bk_sts_cd") == "X")
						{
							if(DocinDatas.length == 0)
							{
								DocinDatas=fix_Docin + "sel_wib_bk_no=" + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wib_bk_no") ;
							}
							else
							{
								DocinDatas=DocinDatas + "&" + fix_Docin + "sel_wib_bk_no=" + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wib_bk_no");
							}
						}
					}
				}*/
				/*else if($("#sel_tab").val() == "02")
				{*/
				// #1882 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #
				var itemDatas = "";
				if($("#bk_sts_cd").val() == "X")
				{
					DocinDatas=fix_Docin + "sel_wib_bk_no=" + $("#sel_wib_bk_no").val();
					itemDatas= sheet2.GetSaveString(1); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
				}
				/*}*/
				if(DocinDatas.length == 0)
				{
					ComShowCodeMessage("COM0391");
					return;
				}
				if(ComShowCodeConfirm("COM0040") == false){
					return;
				}
				
				// Sheet2의 정보 파라미터 추가 
			 	var saveXml=sheetObj.GetSaveData("./cancelWHInMgmtCompleteGS.clt", DocinDatas + "&" + itemDatas + "&f_cmd=" + REMOVE03);
			 	//sheetObj.LoadSaveData(saveXml);
			 	
			 	var xmlDoc = $.parseXML(saveXml);
				var $xml = $(xmlDoc);
				if($xml.find("rtncd").text() == "N"){
					ComShowMessage($xml.find("message").text())
				}else{
					showCompleteProcess();
					CCancelAfterProcess(sheetObj/*, arrRow*/, true);
				}
			} else {
		    	ComShowCodeMessage("COM0815", "Freight Info", "all the freight data");
		    	return false;
			}
		}
	}
}

// #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882)
function sheet2_btn_restore() {
	var DocinDatas="";
	var fix_Docin="Docin";
	var sheetObj=sheet2;
	
	if($("#bk_sts_cd").val() == "I") {
		DocinDatas=fix_Docin + "sel_wib_bk_no=" + $("#sel_wib_bk_no").val();
		var itemDatas= sheet2.GetSaveString(1); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
		
		if(DocinDatas.length == 0)
		{
			ComShowCodeMessage("COM0391");
			return;
		}
		if(ComShowCodeConfirm("COM0042") == false){
			return;
		}
		
		// Sheet2의 정보 파라미터 추가 
	 	var saveXml=sheetObj.GetSaveData("./cancelWHInMgmtCompleteGS.clt", DocinDatas + "&" + itemDatas + "&f_cmd=" + REMOVE04);
	 	
	 	var xmlDoc = $.parseXML(saveXml);
		var $xml = $(xmlDoc);
		if($xml.find("rtncd").text() == "N"){
			ComShowMessage($xml.find("message").text())
		}else{
			showCompleteProcess();
			CCancelAfterProcess(sheetObj/*, arrRow*/, true);
		}
	}
}

// Freight Sheet DblClick
function sheet6_OnDblClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	switch(colName)
	{
		case fix_grid06 + "cls_no":
			if (sheetObj.GetCellValue(Row, fix_grid06 + "cls_no") != "") {
				goClosingClsNoInOutMgmt(sheetObj.GetCellValue(Row, fix_grid06 + "cls_no"), "cls");
			}
		break;
		case fix_grid06 + "cls_dt":
			if (sheetObj.GetCellValue(Row, fix_grid06 + "cls_no") != "") {
				goClosingClsNoInOutMgmt(sheetObj.GetCellValue(Row, fix_grid06 + "cls_no"), "cls");
			}
			break;
		case fix_grid06 + "inv_seq":
			if (sheetObj.GetCellValue(Row, fix_grid06 + "inv_seq") != "") {
				goARInvEntry(sheetObj.GetCellValue(Row, fix_grid06 + "inv_seq"), sheetObj.GetCellValue(Row, fix_grid06 + "inv_no"));
			}
		break;
		case fix_grid06 + "inv_no":
			if (sheetObj.GetCellValue(Row, fix_grid06 + "inv_no") != "") {
				goARInvEntry(sheetObj.GetCellValue(Row, fix_grid06 + "inv_seq"), sheetObj.GetCellValue(Row, fix_grid06 + "inv_no"));
			}
			break;
	}
}
function goClosingClsNoInOutMgmt(val, type)
{
	var formObj=document.form;
	var cls_no = sheet6.GetCellValue(sheet6.GetSelectRow(), fix_grid06 + "cls_no");
	
	var param="?cls_no=" + cls_no
		+ "&wh_cd=" + formObj.wh_cd.value
		+ "&ctrt_no=" + formObj.bill_to_cd.value
		+ "&ctrt_nm=" + formObj.bill_to_nm.value;
	var sUrl="./ClosingInOutMgmt.clt" + param;
	parent.mkNewFrame('Closing In & Out Management', sUrl, "ClosingMgmt_" + param);
	
}
function goARInvEntry(invSeq, invNo) {
	var sUrl="./ACC_INV_0010.clt?sys_cd=WMS&f_inv_seq=" + invSeq + "&s_inv_no=" + invNo
	parent.mkNewFrame('A/R Entry', sUrl, "ACC_INV_0010_WMS_" + invSeq);
}

//#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 3차
function sheet7_OnSearchEnd(){
	return;//사용안함 //#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 3차
	
    var prefix02="Grd02";
    var prefix07="Grd07";
	
    hdrR = sheet7.HeaderRows();
    rowCnt = sheet7.RowCount();

//    sheet2.InitComboNoMatchText(1, "",1);
    var formObj=document.form; 
    
    for (var i = hdrR; i < rowCnt + hdrR; i++) {
    	var row = sheet2.DataInsert(-1);
    	sheet2.SetCellImage(row, (fix_grid02+"seal_img"),2);
		sheet2RowAddValue(sheet2, row, sheet7.GetCellValue(i, prefix07 + "ctrt_no"), "", sheet7.GetCellValue(i, prefix07 + "wh_cd"), "");
		
    	sheet2.SetCellValue(row, prefix02 + "wh_cd", sheet7.GetCellValue(i, prefix07 + "wh_cd"));
    	sheet2.SetCellValue(row, prefix02 + "ctrt_no", sheet7.GetCellValue(i, prefix07 + "ctrt_no"));
    	sheet2.SetCellValue(row, prefix02 + "item_cd", sheet7.GetCellValue(i, prefix07 + "item_cd"));
    	sheet2.SetCellValue(row, prefix02 + "lot_no", sheet7.GetCellValue(i, prefix07 + "lot_no"));
    	sheet2.SetCellValue(row, prefix02 + "item_pkgunit", sheet7.GetCellValue(i, prefix07 + "item_pkgunit"));
    	sheet2.SetCellValue(row, prefix02 + "item_pkgqty", sheet7.GetCellValue(i, prefix07 + "item_pkgqty"));
    	sheet2.SetCellValue(row, prefix02 + "snd_pkgunit", sheet7.GetCellValue(i, prefix07 + "item_pkgunit"));
    	sheet2.SetCellValue(row, prefix02 + "rcv_pkgqty", sheet7.GetCellValue(i, prefix07 + "item_rcv_pkgqty"));
    	sheet2.SetCellValue(row, prefix02 + "inbound_loc_nm", sheet7.GetCellValue(i, prefix07 + "inbound_loc_nm"));
    	sheet2.SetCellValue(row, prefix02 + "eq_tpsz_cd", sheet7.GetCellValue(i, prefix07 + "eq_tpsz_cd"));
    	sheet2.SetCellValue(row, prefix02 + "eq_no", sheet7.GetCellValue(i, prefix07 + "eq_no"));
    	sheet2.SetCellValue(row, prefix02 + "seal_no", sheet7.GetCellValue(i, prefix07 + "seal_no"));
    	sheet2.SetCellValue(row, prefix02 + "lot_04", sheet7.GetCellValue(i, prefix07 + "lot_04"));
    	sheet2.SetCellValue(row, prefix02 + "lot_05", sheet7.GetCellValue(i, prefix07 + "lot_05"));
    	sheet2.SetCellValue(row, prefix02 + "exp_dt", sheet7.GetCellValue(i, prefix07 + "exp_dt"));
    	sheet2.SetCellValue(row, prefix02 + "item_ser_no", sheet7.GetCellValue(i, prefix07 + "item_ser_no"));
    	sheet2.SetCellValue(row, prefix02 + "lic_plat_no", sheet7.GetCellValue(i, prefix07 + "lic_plat_no"));
    	sheet2.SetCellValue(row, prefix02 + "po_no", sheet7.GetCellValue(i, prefix07 + "po_no"));
    }

}

function getInfo_TruckerCode(obj) {
	formObj=document.form;
	var val = obj.value;
	if(val != ""){
		ajaxSendPost(dispCodeNameAjaxReq3_Sup, 'reqVal','&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + val, './GateServlet.gsl');
	}else {
		formObj.trucker_cd.value = '';
		formObj.trucker_nm.value = '';
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq3_Sup(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			formObj.trucker_nm.value=masterVals[2];	
		}else{
			formObj.trucker_cd.value="";//trucker_cd
			formObj.trucker_nm.value="";//trucker_nm
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEE_BMD_0061.152");		
	}
}

// #1392 [WMS4.0] Inbound/Outbound Management Freight Status 표기
function checkWMSFreightInfoExist(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] == "0"){
				lv_StsNm = "New";
			} else {
				lv_StsNm = "Freight Saved";
			}

		}
	}
}

//#2323 [WMS4.0] OUTBOUND DATE MOVE ON ALLOCATION POPUP
function setInboundDtToday() {
	var formObj = document.form;
	formObj.inbound_dt.value = getTodayStr();
}

//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
function setGridHeaderTitleAlias(sheetObj) {

	var ctrt_no = document.getElementById("ctrt_no").value;
	var lot4_alias = document.getElementById("lot4_alias").value;
	var lot5_alias = document.getElementById("lot5_alias").value;

	if(ctrt_no == '') return;

	var strHead = "";
	for(var i=0; i<sheetObj.HeaderRows(); i++) {
		for(var j=0; j<sheetObj.LastCol(); j++) {
			if(j == 15) {  //"LOT 04"
				sheetObj.SetCellText(i, j, lot4_alias);
			} else if(j == 16) {  //"LOT 05"
				sheetObj.SetCellText(i, j, lot5_alias);
			}
		}
	}
}

function validation2BytesChar(obj) {
	var formObj=document.frm1;
    var keyValue=obj.value;
    var specialChars = "~`!@#$^&%*[]\/{}:<>?;()'\"\\\”";
    for (var i=0; i < specialChars.length; i++) {
    	keyValue = keyValue .replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }
    obj.value = keyValue;
}

//#4608 [WMS] In/Outbound Management to have [Multi Row Add] button
function sheet2MultiRowAdd(sheetObj, rowCnt){
	var formObj=document.frm1;

	for(var i=0 ; i < rowCnt ; i++){
		var curRow = sheetObj.GetSelectRow();
		sheet2RowAdd(sheetObj, curRow);
	}
}