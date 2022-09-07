//=========================================================
//*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
//*@FileName   : ClosingSearch.js
//*@FileTitle  : Inventory Movement & Hold & Damage Search
//*@author     : Bao.Huynh - DOU Network
//*@version    : 1.0
//*@since      : 2015/04/14
//=========================================================

//docObjects
var firCalFlag=false;
var rtnary=new Array(1);
var callBackFunc = "";
var sheetCnt=0;
var docObjects=new Array();
var comboCnt=0; 
var fix_grid01="";
var loading_flag="N";
//2번이상 사용되는 하드코딩된값은 변수로 선언하여 사용.
var sub_sum_row_div="TOTAL";

//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
var gJsWmsRuPoint = "N";
var vPointCount = 3;
var vEditLen = 14;

/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	var formObj=document.form;
	//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
	if(gJsWmsRuPoint == 'Y'){
		vPointCount = 8;
		vEditLen = 19;
	}
	
	//sheet
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
	loadComboStatus();
	loadComboType();
	loadComboWarehouse();
    loading_flag="Y";
    //control
	initControl();
	resizeSheet();
	setFieldValue(formObj.wh_combo, ComGetObjValue(formObj.def_wh_cd));
	setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no)); 
	setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));
//	setFieldValue(formObj.ofc_cd, ComGetObjValue(formObj.org_cd));
//	setFieldValue(formObj.ofc_nm, ComGetObjValue(formObj.org_nm));
	 
	var monthStr=ComReplaceStr(ComGetDateAdd(null, "m", -1, "-"), "-","");
	var monthY=monthStr.substring(4, 8);
	var monthD=monthStr.substring(0, 2);
	$("#fm_cls_date").val(monthD + "-" + monthY);
	var date = ComGetNowInfo("ym");
	$("#to_cls_date").val(date.substring(5,7) + "-" + date.substring(0,4));
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");

	// #2512 [WMS4.0]Print Closing detail before creating invoices
	// Status 상관없이 출력 가능하도록
	//fn_ComBtnDisable("btnPrint");
	fn_ComBtnDisable("bt_ar_create");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/*
 * init sheet
 */ 
 function initSheet(sheetObj, sheetNo) {
		var cnt=0;
		switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
            with(sheetObj){
            
			  var prefix=fix_grid01;
			  SetConfig( { SearchMode:2, MergeSheet:9, Page:20, DataRowMerge:0} );
			
			  var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			  var headers = [ { Text:getLabel('ClosingSearch_HDR1'), Align:"Center"},
		                      { Text:getLabel('ClosingSearch_HDR2'), Align:"Center"} ];
			  InitHeaders(headers, info);

			  var cols = [ 	{Type:"Text",     	Hidden:1,   Width:30,		Align:"Center", 	ColMerge:0,		SaveName:prefix+"seq",    			KeyField:0,		Format:"",			PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
			               	{Type:"Radio", 		Hidden:0,   Width:50,		Align:"Left", 		ColMerge:0,		SaveName:prefix+"chk",    			KeyField:0,		Format:"",			PointCount:0,			  	UpdateEdit:1,   InsertEdit:1},
			               	{Type:"Text",     	Hidden:1,  Width:30,		Align:"Center", 	ColMerge:0,		SaveName:prefix+"sub_key",			KeyField:0,		Format:"",			PointCount:0,			  	UpdateEdit:0,   InsertEdit:0},
			               	{Type:"Text",      	Hidden:0,  	Width:120,    	Align:"Left",     	ColMerge:0,   	SaveName:prefix+"cls_no",		 	KeyField:0,   	UpdateEdit:0,   	InsertEdit:0,   Format:""},
			               	{Type:"Date",      	Hidden:0,  	Width:120, 		Align:"Center",		ColMerge:0,  	SaveName:prefix+"set_fr_dt",   		KeyField:0,   	UpdateEdit:0,    	InsertEdit:0, 	Format:"Ymd"		},
			               	{Type:"Date",      	Hidden:0,  	Width:120, 		Align:"Center",		ColMerge:0,  	SaveName:prefix+"set_to_dt",   		KeyField:0,   	UpdateEdit:0,    	InsertEdit:0, 	Format:"Ymd"		},
			               	{Type:"Text", 		Hidden:0, 	Width:80,    	Align:"Center",     ColMerge:0,     SaveName:prefix+"ctrt_no",         	KeyField:0,   	PointCount:0,   	UpdateEdit:0,   InsertEdit:0,           Format:""},
			               	{Type:"Text", 		Hidden:0, 	Width:120,    	Align:"Center",     ColMerge:0,     SaveName:prefix+"ctrt_nm",         	KeyField:0,   	PointCount:0,   	UpdateEdit:0,   InsertEdit:0,           Format:""},
			               	{Type:"Text",      	Hidden:0,  	Width:120,   	Align:"Center",     ColMerge:0,   	SaveName:prefix+"cust_cd",  		KeyField:0,   	UpdateEdit:0,   	Format:"" },
			               	{Type:"Text",      	Hidden:0,  	Width:250,    	Align:"Left",   	ColMerge:0,   	SaveName:prefix+"cust_nm",  		KeyField:0,   	UpdateEdit:0,   	Format:"" },
							{Type:"Combo",     	Hidden:0, 	Width:50,    	Align:"Center",    	ColMerge:0,   	SaveName:prefix+"sell_buy_tp_cd",	KeyField:0,   	UpdateEdit:0,   	InsertEdit:0,   Format:"" },  //<!-- #1069 Closing other entry  -->
			               	{Type:"Combo",      Hidden:0,  	Width:100,    	Align:"Center",   	ColMerge:0,   	SaveName:prefix+"rate_tp_cd",    	KeyField:0,   	UpdateEdit:0,   	Format:"" },
			               	{Type:"Combo", 		Hidden:0, 	Width:80,    	Align:"Center",     ColMerge:0,     SaveName:prefix+"sts_cd",       	KeyField:0,   	PointCount:0,   	UpdateEdit:0,   InsertEdit:0,           Format:""},
			               	{Type:"Text",      	Hidden:0, 	Width:120,    	Align:"Left",     	ColMerge:0,   	SaveName:prefix+"ref_no",			KeyField:0,   	UpdateEdit:0,   	InsertEdit:0,   Format:"" },
              				{Type:"Text",      	Hidden:0, 	Width:120,    	Align:"Left",     	ColMerge:0,   	SaveName:prefix+"inv_no",			KeyField:0,   	UpdateEdit:0,   	InsertEdit:0,   Format:"" },
              				{Type:"Text",      	Hidden:0,  	Width:80,    	Align:"Center",     ColMerge:0,   	SaveName:prefix+"curr_cd",   		KeyField:0,   	UpdateEdit:0,   	InsertEdit:0,   Format:"" },
              				{Type:"Float",    	Hidden:0,  	Width:150,    	Align:"Right",     	ColMerge:0,   	SaveName:prefix+"inv_ttl_amt",		KeyField:0,   	UpdateEdit:0,   	InsertEdit:0,   Format:"Float",			PointCount:2, EditLen:vEditLen },
              				{Type:"Text", 		Hidden:0, 	Width:120,   	Align:"Center",     ColMerge:0,     SaveName:prefix+"wh_cd",         	KeyField:0,   	PointCount:0,   	UpdateEdit:0,   InsertEdit:0,           Format:""},
              				{Type:"Text", 		Hidden:0, 	Width:120,   	Align:"Left",     	ColMerge:0,     SaveName:prefix+"f_remark",         KeyField:0,   	PointCount:0,   	UpdateEdit:0,   InsertEdit:0,           Format:""},
							{Type:"Text", 		Hidden:1, 	Width:120,   	Align:"Left",     	ColMerge:0,     SaveName:prefix+"wm_doc_seq",       KeyField:0,   	PointCount:0,   	UpdateEdit:0,   InsertEdit:0,       	Format:""},
							{Type:"Text",      	Hidden:1, 	Width:120,    	Align:"Left",     	ColMerge:0,   	SaveName:prefix+"inv_seq",			KeyField:0,   	UpdateEdit:0,   	InsertEdit:0,   Format:"" },
							{Type:"Text",      	Hidden:1, 	Width:120,    	Align:"Left",     	ColMerge:0,   	SaveName:prefix+"ofc_cd",			KeyField:0,   	UpdateEdit:0,   	InsertEdit:0,   Format:"" }];

				InitColumns(cols);
	            SetSheetHeight(440);
	            resizeSheet();
				SetEditable(1);
				SetImageList(0,"./web/img/main/icon_text_off.gif");
				SetImageList(1,"./web/img/main/icon_text_on.gif");
				SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
//				SetColProperty(prefix+"ord_tp_cd", {ComboText:load_tp_cdText, ComboCode:load_tp_cdCode} );
//				SetColProperty(prefix+"unit_cd",{ComboText:"|# of License Plate|Property of License Plate|Container|Truck|Handling Unit|Package Unit|Order|Hour", ComboCode:"|LPN|LPP|CNT|TRK|HUT|PUT|ODR|HOR"});
//	            SetColProperty(prefix+"frt_cd", {ComboCode:ARFRTCD1, ComboText:ARFRTCD2} );
//				SetColProperty(prefix+"curr_cd", {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
				SetColProperty(prefix+"rate_tp_cd",{ComboText:" |"+rate_tp_cdText, ComboCode:" |"+rate_tp_cdCode});
				SetColProperty(prefix+"sts_cd", {ComboText:'|Saved|Confirmed|Invoiced', ComboCode:'|SAV|CON|INV'} );
				SetColProperty(prefix+"sell_buy_tp_cd", {ComboText:'|A/R|A/P|', ComboCode:'|S|B|'} );              // wms #1069 Closing other entry
				sheetObj.SetDataRowMerge(0);
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
 function resizeSheet(){
		ComResizeSheet(docObjects[0]);
	}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=sheet1;//docObjects[0];
	//sheetObj.SubSumBackColor = "#FAF4C0";
	//displaySubSum();
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, fix_grid01 + "sub_sum_row_div") != sub_sum_row_div)
		{
			//link 폰트색상 변경
 			sheetObj.SetCellFontColor(i, fix_grid01 + "cls_no","#0100FF");
 			sheetObj.SetCellFontColor(i, fix_grid01 + "cust_cd","#0100FF");
 			sheetObj.SetCellFontColor(i, fix_grid01 + "cust_nm","#0100FF");
 			sheetObj.SetCellFontColor(i, fix_grid01 + "inv_seq","#0100FF");
 			sheetObj.SetCellFontColor(i, fix_grid01 + "inv_no","#0100FF");
 			
 			sheetObj.SetCellFontUnderline(i, fix_grid01 + "cls_no", 1);
 			sheetObj.SetCellFontUnderline(i, fix_grid01 + "cust_cd", 1);
 			sheetObj.SetCellFontUnderline(i, fix_grid01 + "cust_nm", 1);
 			sheetObj.SetCellFontUnderline(i, fix_grid01 + "inv_seq", 1);
 			sheetObj.SetCellFontUnderline(i, fix_grid01 + "inv_no", 1);
 			
// 			sheetObj.SetCellFontColor(i, fix_grid01 + "so_no","#0100FF");
// 			sheetObj.SetCellFontColor(i, fix_grid01 + "frt_view","#0100FF");
// 			sheetObj.SetCellFontColor(i, fix_grid01 + "sb_cls_nm","#0100FF");
// 			sheetObj.SetCellFontColor(i, fix_grid01 + "rate_tp_nm","#0100FF");
			//remark
// 				var value=sheetObj.GetCellValue(i, fix_grid01 + "rmk").trim();
//			if (value.length > 0) {
//			sheetObj.SetCellImage(i, fix_grid01 + "rmk_img",1);
//			} else {
// 				sheetObj.SetCellImage(i, fix_grid01 + "rmk_img",0);
//			}	
		}
		
		// Closing Status가 Confirmed Or Invoiced인 경우
		// #2512 [WMS4.0]Print Closing detail before creating invoices (S)
		// Status Confirmed / Invoiced 상태가 아닌경우에도 일부 Report 출력 가능하도록 주석처리
		/*
		if (sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "CON"  
			|| sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "INV"
				) {
			sheetObj.SetCellEditable(i, fix_grid01+"chk",1);
		} else {
			sheetObj.SetCellEditable(i, fix_grid01+"chk",0);
		}
		*/
		// #2512 [WMS4.0]Print Closing detail before creating invoices (E)
	}
}

	function sheet1_OnClick(sheetObj,Row,Col){
		var colName=sheetObj.ColSaveName(Col);
		switch(colName)
		{
			case fix_grid01 + "chk":
				if (sheetObj.GetCellValue(Row, fix_grid01 + "sts_cd") == "CON") {
					fn_ComBtnEnable("bt_ar_create");
				} else {
					// #2512 [WMS4.0]Print Closing detail before creating invoices
					fn_ComBtnDisable("bt_ar_create");
				}
				break;
		}
	}

	function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
		if(sheetObj.GetCellValue(Row, fix_grid01 + "sub_sum_row_div") == sub_sum_row_div)
		{
			return;
		}
		var colName=sheetObj.ColSaveName(Col);
		switch(colName)
		{
//				goClosingMgmt(sheetObj.GetCellValue(Row, fix_grid01 + "inv_seq"), "inv_seq");
			case fix_grid01 + "cls_no":
				goClosingClsNoInOutMgmt(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no"), "cls");
			break;
			case fix_grid01 + "inv_seq":
				if (sheetObj.GetCellValue(Row, fix_grid01 + "inv_seq") != "") {
					goARInvEntry(sheetObj.GetCellValue(Row, fix_grid01 + "inv_seq"), sheetObj.GetCellValue(Row, fix_grid01 + "inv_no"), sheetObj.GetCellValue(Row, fix_grid01 + "sell_buy_tp_cd")); // wms #1069 Closing other entry
				}
			break;
			case fix_grid01 + "inv_no":
				if (sheetObj.GetCellValue(Row, fix_grid01 + "inv_no") != "") {
					goARInvEntry(sheetObj.GetCellValue(Row, fix_grid01 + "inv_seq"), sheetObj.GetCellValue(Row, fix_grid01 + "inv_no"), sheetObj.GetCellValue(Row, fix_grid01 + "sell_buy_tp_cd")); // wms #1069 Closing other entry
				}
				break;
			case fix_grid01 + "cust_cd":
				goClosingInOutMgmt(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no"), "cls");
				break;
			case fix_grid01 + "cust_nm":
				goClosingInOutMgmt(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no"), "cls");
				break;
			case fix_grid01 + "chk":
				break;
			default:
				goClosingClsNoInOutMgmt(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no"), "cls");
			break;
		}
	}
	function goClosingInOutMgmt(val, type)
	{
		var formObj=document.form;
		var set_fr_dt = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "set_fr_dt");
		var set_to_dt = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "set_to_dt");
		var wh_cd = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "wh_cd");
		var ctrt_no = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "ctrt_no");
		var ctrt_nm = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "ctrt_nm");
		var rate_tp_cd = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "rate_tp_cd");
		var wm_doc_seq = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "wm_doc_seq");
		var cust_cd = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "cust_cd");
		var cust_nm = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "cust_nm");
		var cls_no = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "cls_no");
		var param="?cust_cd=" + cust_cd
					+ "&set_to_dt=" + set_to_dt
					+ "&wh_cd=" + wh_cd
					+ "&ctrt_no=" + ctrt_no
					+ "&ctrt_nm=" + ctrt_nm
					+ "&wm_doc_seq=" + wm_doc_seq
					+ "&set_fr_dt=" + set_fr_dt 
					+ "&cust_nm=" + cust_nm
					+ "&cls_no=" + cls_no
					+ "&rate_tp_cd=" + rate_tp_cd
					;
		if (rate_tp_cd == "STO") {
			var sUrl="./ClosingStoChgMgmt.clt" + param;
			parent.mkNewFrame('Closing Storage Entry', sUrl, "ClosingMgmt_" + param);
		}else if (rate_tp_cd == "OTH") { // #1069 Closing other entry
			var sUrl="./ClosingOtherMgmt.clt" + param;
			parent.mkNewFrame('Closing Other Entry', sUrl, "ClosingMgmt_" + param);
		} else {
			var sUrl="./ClosingInOutMgmt.clt" + param;
			parent.mkNewFrame('Closing In & Out Management', sUrl, "ClosingMgmt_" + param);
		}
		
	}
	
	function goClosingClsNoInOutMgmt(val, type)
	{
		var formObj=document.form;
		var cls_no = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "cls_no");
		var set_fr_dt = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "set_fr_dt");
		var set_to_dt = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "set_to_dt");
		var wh_cd = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "wh_cd");
		var ctrt_no = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "ctrt_no");
		var ctrt_nm = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "ctrt_nm");
		var rate_tp_cd = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "rate_tp_cd");
		var wm_doc_seq = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "wm_doc_seq");
		var cust_cd = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "cust_cd");
		var cust_nm = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "cust_nm");
		var param="?set_to_dt=" + set_to_dt
		+ "&wh_cd=" + wh_cd
		+ "&ctrt_no=" + ctrt_no
		+ "&ctrt_nm=" + ctrt_nm
		+ "&set_fr_dt=" + set_fr_dt 
		+ "&cls_no=" + cls_no 
		+ "&rate_tp_cd=" + rate_tp_cd 
		;
		if (rate_tp_cd == "STO") {
			var sUrl="./ClosingStoChgMgmt.clt" + param;
			parent.mkNewFrame('Closing Storage Entry', sUrl, "ClosingMgmt_" + param);
		}else if (rate_tp_cd == "OTH") { // #1069 Closing other entry
				var sUrl="./ClosingOtherMgmt.clt" + param;
				parent.mkNewFrame('Closing Other Entry', sUrl, "ClosingMgmt_" + param);
		} else {
			var sUrl="./ClosingInOutMgmt.clt" + param;
			parent.mkNewFrame('Closing In & Out Management', sUrl, "ClosingMgmt_" + param);
		}
		
	}
	function goARInvEntry(invSeq, invNo, sellBuyTpCd) {
		// wms #1069 Closing other entry
		if(sellBuyTpCd == "S"){  //AR
			var sUrl="./ACC_INV_0010.clt?sys_cd=WMS&f_inv_seq=" + invSeq + "&s_inv_no=" + invNo
			parent.mkNewFrame('A/R Entry', sUrl, "ACC_INV_0010_WMS_" + invSeq);
		}else if(sellBuyTpCd == "B"){  //AP
			var sUrl="./ACC_INV_0030.clt?sys_cd=WMS&f_inv_seq=" + invSeq + "&s_inv_no=" + invNo
			parent.mkNewFrame('A/R Entry', sUrl, "ACC_INV_0010_WMS_" + invSeq);
		}  		
	}
	
	function goClosingMgmt(val, type)
	{
		var param="";
		if(type == "cls"){
			param="?cls_no=" + val;
		}else if(type == "so"){
			param="?so_no=" + val;
		}
		var sUrl="./ClosingMgmt.clt" + param;
		parent.mkNewFrame('Closing Management', sUrl, "ClosingMgmt_" + val);
	}
	function goClosingDetail(cls_no, cust_cd, sb_cls_cd, rate_tp_cd)
	{
		var param="?cls_no=" + cls_no
		          + "&cust_cd=" + cust_cd
		          + "&sb_cls_cd=" + sb_cls_cd
		          + "&rate_tp_cd=" + rate_tp_cd;
		var sUrl="./ClosingDetail.clt" + param;
		parent.mkNewFrame('Closing Detail', sUrl, "ClosingDetail_" + cls_no + "_" + cust_cd + "_" + sb_cls_cd + "_" + rate_tp_cd);
	}

	function doWork(srcName){
		var formObj=document.form;
		try {
			switch(srcName) {	
				case "btn_fm_cls_date":	
					var cal=new ComCalendar();
					cal.setDisplayType('month');
					cal.select(formObj.fm_cls_date, 'MM-yyyy');
				break;
				case "btn_to_cls_date":	
					var cal=new ComCalendar();
					cal.setDisplayType('month');
		            cal.select(formObj.to_cls_date, 'MM-yyyy');
					break;
				
				case "btn_ctrt_no" :
					CtrtPopup();
				break;
				case "btn_cust_cd" :	
					CustomerPopup();
				break;
				case "btn_ofc_cd":
					OfficePopup();
					break;
				case "SEARCHLIST":
	 				btn_Search();
	 				break;
	 			case "EXCEL":
	 				btn_Excel_Dl();
	 				break;
	 			case "NEW":
	 				btn_New();
	 				break;
				case "AR_CREATE":
					btn_AR_Create();
					break;
		        case "PRINT":
		        	btn_print();
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

/**
 * 마우스 아웃일때 
 */
function form_deactivate() {
}
function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
    var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "cls_no":	
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


/**
 * 버튼 클릭 이벤트모음 시작
 */
function btn_Search() {	
	var formObj=document.form;
	//search
	if (validateForm(formObj,'search')) {
		doShowProcess();
		formObj.f_cmd.value = SEARCH;
 		sheet1.DoSearch("./searchClosingListGS.clt", FormQueryString(formObj));
	}
	
	doHideProcess();
}
function btn_Excel_Dl(){
	 	var prefix = fix_grid01;
		if(docObjects[0].RowCount() < 1){//no data
	     	ComShowCodeMessage("COM132501");
	    }else{
	    	docObjects[0].Down2Excel( {DownCols: makeSkipCol(docObjects[0],"27","26"), SheetDesign:1,Merge:1, HiddenColumn: 0, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
	    }
}
/**
 * 버튼 클릭 이벤트모음 끝
 */
/*
 * NAME 엔터시 팝업호출 - customer name 
 */
function CustomerPopup(){
	var formObj=document.form;
	rtnary=new Array(2);
	rtnary[0]="";
	rtnary[1]=formObj.cust_nm.value;
	rtnary[2]=window;
	callBackFunc = "setServiceProvider";
    modal_center_open('./CMM_POP_0010.clt',rtnary, 1150,650,"yes");
}

function CtrtPopup(){
	var formObj=document.form;
	callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt?ctrt_no=' + formObj.ctrt_no.value + "&ctrt_nm="+formObj.ctrt_nm.value, callBackFunc, 900, 580,"yes");
}

function OfficePopup(){
	var formObj=document.form;
	
	rtnary=new Array(2);
	rtnary[0]="1";
	sUrl="./CMM_POP_0150.clt?";
	
	callBackFunc = "setOffice";
	modal_center_open(sUrl, rtnary, 556,600,"yes");
	
//    modal_center_open('./CMM_POP_0050.clt', callBackFunc, 900,620,"yes");
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
		   formObj.ctrt_no.value=rtnValAry[0];//full_nm
		   formObj.ctrt_nm.value=rtnValAry[1];//full_nm
	   } 	
}

function setServiceProvider(rtnVal){
	 var formObj=document.form;
	  if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
	  }else{
		  var rtnValAry=rtnVal.split("||");
		   formObj.cust_cd.value=rtnValAry[0];//full_nm
		   formObj.cust_nm.value=rtnValAry[1];//full_nm
	  }
}
function setOffice(rtnVal){
	 var formObj=document.form;
	  if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
	  }else{
		  var rtnValAry=rtnVal.split("|");
		   formObj.ofc_cd.value=rtnValAry[0];
		   formObj.ofc_nm.value=rtnValAry[1];
	  }
}

/*
 * 팝업 관련 로직 끝
 */


/***
 * AJAX CODE SEARCH
 */

/*
 * Warehouse search
 * OnKeyDown 13 or onChange
 */
function searchLocInfo(obj){
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
}
function resultLocInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.wh_nm.value=rtnArr[0];
	   }
	   else{
	    formObj.wh_cd.value="";
	    formObj.wh_nm.value=""; 
	   }
	  }
	  else{
	   formObj.wh_cd.value="";
	   formObj.wh_nm.value=""; 
	  }
	 }
	 else{
	  //ComShowMessage(getLabel('SEE_BMD_MSG43'));
	 }
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function searchTlCtrtInfo(){
	var formObj=document.form;
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.ctrt_no.value, './GateServlet.gsl');
}
function resultCtrtInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				if(rtnArr[0] == "null"){
					formObj.ctrt_nm.value="";
				}else{ 
					formObj.ctrt_nm.value=rtnArr[0];
				}
			}
			else{
				formObj.ctrt_no.value="";
				formObj.ctrt_nm.value="";	
			}
		}
		else{
			formObj.ctrt_no.value="";
			formObj.ctrt_nm.value="";	
		}
	}
	else{
		//ComShowMessage(getLabel('SEE_BMD_MSG43'));
	}
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
			formObj.cust_cd.value="";//cust_cd  AS param1
			formObj.cust_nm.value="";//cust_nm   AS param2
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
				formObj.cust_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.cust_nm.value=masterVals[3];	//cust_nm   AS param2
//				docObjects[0].RemoveAll();
			}
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value="";				//cust_cd  AS param1
				formObj.cust_nm.value="";				//cust_nm   AS param2
			}
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

/*
 * Office search
 * OnKeyDown 13 or onChange
 */
function codeNameAction(str, tmp){
	var formObj=document.form;
	if( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+formObj.ofc_cd.value, './GateServlet.gsl');
		}
	}else if( tmp == "onBlur" ) {
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+formObj.ofc_cd.value, './GateServlet.gsl');
	}
}

function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@^@@^@@^');
			if(rtnArr[0] != ""){
				formObj.ofc_nm.value=rtnArr[1];
			}
			else{
				formObj.ofc_cd.value="";
				formObj.ofc_nm.value="";	
			}
		}
		else{
			formObj.ofc_cd.value="";
			formObj.ofc_nm.value="";	
		}
	}
	else{
		//ComShowMessage(getLabel('SEE_BMD_MSG43'));
	}
}

/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			//Contract No 체크
			/* #3115 [BINEX WMS4.0] CLOSING LIST, CONTRACT NOT TO BE REQUIRED FIELD FOR SEARCH
			 * 주석처리
			if(ComIsEmpty(formObj.ctrt_no))
			{
				ComShowCodeMessage("COM0114","Contract No");
				$("#ctrt_no").focus();
				return false;
			}
			*/
			//Warehouse 체크
			if(ComIsEmpty(formObj.wh_combo))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				$("#wh_combo").focus();
				return false;
			}
			//날짜 체크
			if(ComIsEmpty(formObj.fm_cls_date) && ComIsEmpty(formObj.to_cls_date))
			{
				ComShowCodeMessage("COM0114","Closing Month");
				$("#fm_cls_date").focus();
				return false;
			}
			if(!ComIsEmpty(formObj.fm_cls_date) && ComIsEmpty(formObj.to_cls_date)){
				var td = ComGetNowInfo("mdy");
				var today = td.substring(0,2) + "-" + td.substring(6,10);
				$("#to_cls_date").val(today);
				formObj.to_cls_date.value=today;
			}
			
			var frm = formObj.fm_cls_date.value;
			var frm_m = frm.substring(0,2);
			var frm_y = frm.substring(3,8);
			var to = formObj.to_cls_date.value;
			var to_m = to.substring(0,2);
			var to_y = to.substring(3,8);
			if (!ComIsEmpty(formObj.fm_cls_date) && !ComIsDate(frm_y + "-" + frm_m + "-01")) {
				ComShowCodeMessage("COM0114","Closing Month");
				formObj.fm_cls_date.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.to_cls_date) && !ComIsDate(to_y + "-" + to_m + "-01")) {
				ComShowCodeMessage("COM0114","Closing Month");
				formObj.to_cls_date.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.fm_cls_date)&&ComIsEmpty(formObj.to_cls_date))||(ComIsEmpty(formObj.fm_cls_date)&&!ComIsEmpty(formObj.to_cls_date))) {
				ComShowCodeMessage("COM0122","Closing Month");
				formObj.fm_cls_date.focus();
				return false;
			}
			if (check_getDaysBetween((frm_m + "-01-" +frm_y), (to_m + "-01-" + to_y), 'MM-dd-yyyy')<0) {
				ComShowCodeMessage("COM0122","Closing Month");
				formObj.fm_cls_date.focus();
				return false;
			}
		}
	}
	return true;
}

//check date
function check_getDaysBetween(fromObj, toObj, format) {
    
    var numstr1=fromObj.replace(/\/|\-|\./g,"");
	var numstr2=toObj.replace(/\/|\-|\./g,"");
	var user_day1="";
	var user_day2="";
	if(format == "MM-dd-yyyy"){
		user_day1=new Date(numstr1.substr(4), parseInt2(numstr1.substr(0,2))-1, parseInt2(numstr1.substr(2,2)));
        user_day2=new Date(numstr2.substr(4), parseInt2(numstr2.substr(0,2))-1, parseInt2(numstr2.substr(2,2)));
	}else{    	
		 user_day1=new Date(numstr1.substr(0,4), parseInt2(numstr1.substr(4,2))-1, parseInt2(numstr1.substr(6)));
         user_day2=new Date(numstr2.substr(0,4), parseInt2(numstr2.substr(4,2))-1, parseInt2(numstr2.substr(6)));
	}
    user_day1=user_day1.getTime();
    user_day2=user_day2.getTime();
    var day_gab=Math.floor( (user_day2 - user_day1) / (60*60*24*1000) );
    return day_gab;
}

function htmlDecode(value){
	return (typeof value === 'undefined') ? '' : $('<div/>').html(value).text();
}
function loadComboType(){
	var obj = document.getElementById("rate_tp_cd");
	obj.options.length = 0;
	var option =  document.createElement("option");
	
	option.text = "ALL";
	option.value = "ALL";
	
	obj.add(option);
	
	var rate_tp_cd_cd = rate_tp_cdCode.split('|');
	var rate_tp_cd_nm = rate_tp_cdText.split('|');
	
	for(var i = 0; i < rate_tp_cd_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(rate_tp_cd_nm[i]);
		option.value = htmlDecode(rate_tp_cd_cd[i]);
		
		obj.add(option);
	}
}
function loadComboStatus(){
	var obj = document.getElementById("sts_cd");
	obj.options.length = 0;
	var option =  document.createElement("option");
	
	option.text = "ALL";
	option.value = "ALL";
	
	obj.add(option);
	
	var sts_cd_cd = sts_cdCode.split('|');
	var sts_cd_nm = sts_cdText.split('|');
	
	for(var i = 0; i < sts_cd_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(sts_cd_nm[i]);
		option.value = htmlDecode(sts_cd_cd[i]);
		
		obj.add(option);
	}
}

function loadComboWarehouse(){
	var obj = document.getElementById("wh_combo");
	obj.options.length = 0;
	var option =  document.createElement("option");
	
	option.text = "";
	option.value = "";
	obj.add(option);
	
	var wh_combo_cd = wh_comboCode.split('|');
	var wh_combo_nm = wh_comboText.split('|');
	
	for(var i = 0; i < wh_combo_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(wh_combo_nm[i]);
		option.value = htmlDecode(wh_combo_cd[i]);
		obj.add(option);
	}
}
/*
 * Show Sub Sum

function displaySubSum()
{
	$("#sheet1")[0].ShowSubSum(fix_grid01 + "sub_key"
	          , fix_grid01 + "basic_amt|" + fix_grid01 + "adjust_amt|" + fix_grid01 + "tot_amt"
	          , -1
	          , false
	          , false
	          , $("#sheet1")[0].SaveNameCol(fix_grid01 + "sub_sum_row")
	          ,fix_grid01 + "cls_no=%s" + ";" 
	          +fix_grid01 + "ctrt_no=%s" + ";"
	          +fix_grid01 + "ctrt_nm=%s" + ";" 
	          +fix_grid01 + "cust_cd=%s" + ";"
	          +fix_grid01 + "cust_nm=%s" + ";"
	          +fix_grid01 + "sb_cls_nm=%s TOTAL" + ";"
	          +fix_grid01 + "sub_sum_row_div=" + sub_sum_row_div + ";"
				);	
}
 */
function addSeperator(obj, event, dateCheck, type) {
	Date_Format(obj, obj.value, event, dateCheck, type);
}

function Date_Format(vDateName, vDateValue, e, dateCheck, dateType) {
	var form = document.form;
	var whichCode = (window.Event) ? e.which : e.keyCode;
	var strSeperator = "-";
	if (whichCode == 8){
		return false;
	}else {
		var strCheck = '47,48,49,50,51,52,53,54,55,56,57,58,59,95,96,97,98,99,100,101,102,103,104,105';

		if (strCheck.indexOf(whichCode) != -1) {
			if (vDateType == 3) {
				if (vDateValue.length == 2) {
					if(vDateName.id == "fm_cls_date")
						form.fm_cls_date.value = vDateValue + strSeperator;
					if(vDateName.id == "to_cls_date")
						form.to_cls_date.value = vDateValue + strSeperator;
				}
			}
		}
	}
}


function checkDateType(obj,dateCheck,dateType,to) {
	checkDate(obj, obj.value, dateCheck, vDateType, to.value);
}
function checkDateTypes(obj,dateCheck,dateType,from) {
	checkDates(obj, obj.value, dateCheck, vDateType,from.value);
}
function checkDate(vDateName,vDateValue,dateCheck,vDateType,to){
	var vYearType = 4; //Set to 2 or 4 for number of digits in the year for Netscape
	var vYearLength = 4; // Set to 4 if you want to force the user to enter 4 digits for the year before validating.
	var strSeperator = "-";
	formObj = document.form;
	if ((vDateValue.length < 6 && dateCheck)  && (vDateValue.length >=1)) {
		//Invalid Date\nPlease Re-Enter
		ComShowMessage(getLabel('FMS_COM_ALT002'));
		vDateName.value = "";
		vDateName.focus();
		return false;
	}
	if (vDateValue.length >= 6 && dateCheck) {

		var sepCnt = vDateValue.split(strSeperator).length - 1;
		if(sepCnt==0){
			if(vDateValue.length ==6){
				form.fm_cls_date.value = vDateName.value.substring(0,2) + strSeperator + vDateName.value.substring(2,6);
				checkDate(vDateName,formObj.fm_cls_date.value,dateCheck,vDateType,to);
				return false;
			}else{
				ComShowMessage(getLabel('FMS_COM_ALT002'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
		}else if(sepCnt == 1){
			var mMonth = vDateName.value.substring(0,2);
			var mYear = vDateName.value.substring(3,7);
			if((mMonth)>=13 || (mMonth) <=0){
				ComShowMessage(getLabel('FMS_COM_ALT002'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
			if(to != null && to != ""){
				var from = mYear + mMonth;
				var todate = to.substring(3,7) +   to.substring(0,2);;
				if(from > todate){
					ComShowMessage("End date must be greater than start date");
					vDateName.value = "";
					vDateName.focus();
					return false;
				}
			}
		}
		
		// Additional date formats can be entered here and parsed out to
		// a valid date format that the validation routine will recognize.
		if (vDateType == 3) // mm/yyyy
		{
			var mMonth = vDateName.value.substring(0,2);
			var mYear = vDateName.value.substring(3,7);
		}
		

		// Create temp. variable for storing the current vDateType
		var vDateTypeTemp = vDateType;

		// Change vDateType to a 1 for standard date format for validation
		// Type will be changed back when validation is completed.
		vDateType = 1;

		// Store reformatted date to new variable for validation.
		var vDateValueCheck = mMonth+strSeperator+mYear;
		
		if (vYearLength == 4) {
			if (mYear.length < 4) {
				//Invalid Date\nPlease Re-Enter
				ComShowMessage(getLabel('FMS_COM_ALT002'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			} else if(parseInt(mYear) < 1900) {
				//Year must be greater than 1900.
				ComShowMessage(getLabel('FMS_COM_ALT041'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
		}

		vDateType = vDateTypeTemp;
		return true;

	}else {
		if (vDateType == 3) {
				if (vDateValue.length == 2) {
					vDateName.value = vDateValue+strSeperator;
				}
				if (vDateValue.length == 5) {
					vDateName.value = vDateValue+strSeperator;
			   }
		}
		return true;
	}	
}

function checkDates(vDateName,vDateValue,dateCheck,vDateType,from){
	var vYearType = 4; //Set to 2 or 4 for number of digits in the year for Netscape
	var vYearLength = 4; // Set to 4 if you want to force the user to enter 4 digits for the year before validating.
	var strSeperator = "-";
	formObj = document.form;
	if ((vDateValue.length < 6 && dateCheck)  && (vDateValue.length >=1)) {
		//Invalid Date\nPlease Re-Enter
		ComShowMessage(getLabel('FMS_COM_ALT002'));
		
		vDateName.value = "";
		vDateName.focus();
		return false;
	}
	if (vDateValue.length >= 6 && dateCheck) {

		var sepCnt = vDateValue.split(strSeperator).length - 1;
		if(sepCnt==0){
			if(vDateValue.length ==6){
				form.to_cls_date.value = vDateName.value.substring(0,2) + strSeperator + vDateName.value.substring(2,6);
				checkDates(vDateName,formObj.to_cls_date.value,dateCheck,vDateType,from);
				return false;
			}else{
				ComShowMessage(getLabel('FMS_COM_ALT002'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
		}
		
		if(sepCnt==1){
			var mMonth = vDateName.value.substring(0,2);
			var mYear = vDateName.value.substring(3,7);
			if((mMonth)>=13 || (mMonth) <=0){
				ComShowMessage(getLabel('FMS_COM_ALT002'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
			var to = mYear + mMonth;
			var fromdate = from.substring(3,7) +   from.substring(0,2);
			if(fromdate > to){
				ComShowMessage("End date must be greater than start date");
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
		}
		
		// Additional date formats can be entered here and parsed out to
		// a valid date format that the validation routine will recognize.
		if (vDateType == 3) // mm/yyyy
		{
			var mMonth = vDateName.value.substring(0,2);
			var mYear = vDateName.value.substring(3,7);
		}
		

		// Create temp. variable for storing the current vDateType
		var vDateTypeTemp = vDateType;

		// Change vDateType to a 1 for standard date format for validation
		// Type will be changed back when validation is completed.
		vDateType = 1;

		// Store reformatted date to new variable for validation.
		var vDateValueCheck = mMonth+strSeperator+mYear;
		
		if (vYearLength == 4) {
			if (mYear.length < 4) {
				//Invalid Date\nPlease Re-Enter
				ComShowMessage(getLabel('FMS_COM_ALT002'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			} else if(parseInt(mYear) < 1900) {
				//Year must be greater than 1900.
				ComShowMessage(getLabel('FMS_COM_ALT041'));
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
		}

		vDateType = vDateTypeTemp;
		return true;

	}else {
		if (vDateType == 3) {
				if (vDateValue.length == 2) {
					vDateName.value = vDateValue+strSeperator;
				}
				if (vDateValue.length == 5) {
					vDateName.value = vDateValue+strSeperator;
			   }
		}
		return true;
	}	
}
function makeSkipCol(sobj,colsShow,colsHide){
    var lc = sobj.LastCol();
    var colsArr = new Array();
    var colsShowArr = new Array();
    var colsHideArr = new Array();
    colsShowArr = colsShow.split("|");
    colsHideArr = colsHide.split("|");
    for(var i=0;i<=lc;i++){
    	if(1==sobj.GetColHidden(i) || sobj.GetCellProperty(0,i,"Type") == "DummyCheck" || sobj.GetCellProperty(0,i,"Type") == "Status" 
    		||  sobj.GetCellProperty(0,i,"Type") =="DelCheck"){
    		var flg_show = false;
    		for(var j=0;j < colsShowArr.length;j++){
    			if(colsShowArr[j] == i )
    				flg_show = true;
    		}
    		if(!flg_show){
    			 colsArr.push(i);
    		}
    	}
    	if(0==sobj.GetColHidden(i)){
    		var flg_hide = false;
    		for(var k=0;k < colsHideArr.length;k++){
    			if(colsHideArr[k] == i )
    				flg_hide = true;
    		}
    		if(flg_hide){
    			colsArr.push(i);
    		}
    	}
    	
    }
    var rtnStr = "";
    for(var i=0;i<=lc;i++){
           if(!colsArr.contains(i)){
        	   rtnStr += "|"+ i;
           }
    }
    return rtnStr.substring(1);
}

function btn_New()
{
	
	var formObj=document.form;
	
	formObj.reset();
	sheet1.RemoveAll();
	
	//IBMultiCombo초기화
	loadComboStatus();
	loadComboType();
	loadComboWarehouse();
    loading_flag="Y";
    //control
	initControl();
	resizeSheet();
	setFieldValue(formObj.wh_combo, ComGetObjValue(formObj.def_wh_cd));
	setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no)); 
	setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));
	 
	var monthStr=ComReplaceStr(ComGetDateAdd(null, "m", -1, "-"), "-","");
	var monthY=monthStr.substring(4, 8);
	var monthD=monthStr.substring(0, 2);
	$("#fm_cls_date").val(monthD + "-" + monthY);
	var date = ComGetNowInfo("ym");
	$("#to_cls_date").val(date.substring(5,7) + "-" + date.substring(0,4));
}

function btn_AR_Create() {
	var sRow=sheet1.FindCheckedRow(fix_grid01 + "chk");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	
	var arrRow = sRow.split('|');
	
	for(var i = 0; i < arrRow.length; i++){
		if(sheet1.GetCellValue(arrRow[i],fix_grid01+"wm_doc_seq") == ""){
			ComShowCodeMessage('COM132615');
			return;
		}
	}
	
	var arrObj = [];
	
	// 현재는 AR만 .. 추후 AP추가 될수는 있음
	for (var i=1; i< sheet1.LastRow() + 1; i++){
		if(sheet1.GetCellValue(i, fix_grid01 + "chk") == "1" 
			&& sheet1.GetCellValue(i,fix_grid01 + "wm_doc_seq") != ""
//				&& sheet1.GetCellValue(i,fix_grid01 + "sb_cls_cd") == "S"
					&& sheet1.GetCellValue(i,fix_grid01 + "inv_seq") == ""
		)
		{
			var newObj = {};
			
			newObj.name = sheet1.GetCellValue(i,fix_grid01 + "wm_doc_seq");
			
			newObj.fr_trdp_cd = sheet1.GetCellValue(i,fix_grid01 + "cust_cd");
			newObj.fr_trdp_nm = sheet1.GetCellValue(i,fix_grid01 + "cust_nm");
			newObj.fr_inv_curr_cd = sheet1.GetCellValue(i,fix_grid01 + "curr_cd");

			arrObj.splice(arrObj.length, 0, newObj);
		}
	}
	
	//validation
	if (arrObj == ""){
//		alert("For SELL Only!!!");
		return;
	}
	for(var i = 0 ; i < arrObj.length; i++){

		
		var chkCnt=0;
		
		var chk_fr_trdp_cd="";
		var chk_fr_trdp_nm="";
		var chk_fr_inv_curr_cd="";
		var chk_fr_frt_seq="";
		
		var chk_fr_trdp_cd=arrObj[i].fr_trdp_cd;
		var chk_fr_trdp_nm=arrObj[i].fr_trdp_nm;
		var chk_fr_inv_curr_cd=arrObj[i].fr_inv_curr_cd;
		
		var sUrl="";
		// wms #1069 Closing other entry
		if(sheet1.GetCellValue(sRow, fix_grid01 + "sell_buy_tp_cd") == "S"){  //AR
			sUrl="./ACC_INV_0010.clt?sys_cd=WMS&f_wms_seq=" + arrObj[i].name;
			
		}else if(sheet1.GetCellValue(sRow, fix_grid01 + "sell_buy_tp_cd") == "B"){  //AP
			sUrl="./ACC_INV_0030.clt?sys_cd=WMS&f_wms_seq=" + arrObj[i].name;
		}   		
		
		
		sUrl=sUrl + "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
		sUrl=sUrl + "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
		sUrl=sUrl + "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;

		sUrl = sUrl + "&chk_fr_frt_seq=" + chk_fr_frt_seq + "&wh_cd_wms=" +  sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "wh_cd");
		
		parent.mkNewFrame('A/R Entry', sUrl, "ACC_INV_0010_WMS_" + arrObj[i].name);
	}
}

function isExistItemList(listObj, item){
	for(var i = 0 ; i < listObj.length; i++){
		if(listObj[i].name == item){
			return i;
		}
	}
	
	return -1;
}

var mailTo="";
function btn_print() {
	var formObj=document.form;
	var ttlFileName="";
	var ttlParam="";
	
	var sRow=sheet1.FindCheckedRow(fix_grid01 + "chk");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	
	var arrRow = sRow.split('|');
	
	// #2512 [WMS4.0]Print Closing detail before creating invoices (S)
	// Status Confirmed / Invoiced 상태가 아닌경우에도 일부 Report 출력 가능하도록 주석처리
	/*
	for(var i = 0; i < arrRow.length; i++){
		if(sheet1.GetCellValue(arrRow[i],fix_grid01+"inv_seq") == ""){
			ComShowCodeMessage('COM132615');
			return;
		}
	}
	*/
	var isInvoiced = true;
	for(var i = 0; i < arrRow.length; i++){
		if(sheet1.GetCellValue(arrRow[i],fix_grid01+"inv_seq") == ""){
			isInvoiced = false;
		}
	}
	// #2512 [WMS4.0]Print Closing detail before creating invoices (E)
	
	// #1069 Closing other entry
	if((sheet1.GetCellValue(sRow,fix_grid01+"sell_buy_tp_cd")) == "B"){  //AP출력일 경우 
		if(sheet1.GetCellValue(sRow,fix_grid01+"rate_tp_cd") == 'OTH'){
			print_ap(sRow, isInvoiced);
		}
		return;
	}

	var ttlFileName = "";

	if(isInvoiced) { // #2512 [WMS4.0]Print Closing detail before creating invoices
		//--------------------------------------------------------------------
		// Invoice
		//--------------------------------------------------------------------
		formObj.title.value='INVOICE';
		
		//[Great Luck] Other Filling AR Invoice - WMS 전용 MRD 사용하도록 변경
		ttlFileName += "^@@^" + "invoice_06_WMS.mrd";
		
		//Parameter Setting
		var param='[' + formObj.f_email.value + ']';				// USER EMAIL';	[1]
		param += "[" + "'" + sheet1.GetCellValue(sRow,fix_grid01+"inv_seq") + "'" + ']';	// [2]
		param += '[]';												// [3]
		param += '[]';												// [4]
		param += '[]';												// [5]
		param += '[]';												// [6]
		param += '[' + sheet1.GetCellValue(sRow,fix_grid01+"cust_cd") + ']';			// BILL_TO [7]
		param += '[' + sheet1.GetCellValue(sRow,fix_grid01+"ofc_cd") + ']';				// REF_OFC_CD  [8]
		param += '[]';				// CNT_CD  [9]
		param += '[' + formObj.f_usr_nm.value + ']';				// USER_NM [10]
		param += '[' + formObj.f_usrPhn.value + ']';				// 11
		param += '[' + formObj.f_usrFax.value + ']';				// 12
		param += '[' + formObj.f_usrId.value + ']';					// 13
		param += '[]';				// 14
		param += '[]';				// 15
		
		ttlParam += "^@@^" + param;
		
		formObj.mailTitle.value = "INVOICE [INVOICE No. " + sheet1.GetCellValue(sRow,fix_grid01+"inv_no") + "]";
		var trdp_cd='';
		trdp_cd += '(' + '\'' + sheet1.GetCellValue(sRow,fix_grid01+"cust_cd") + '\'' + ')';
		ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
		formObj.mailTo.value=mailTo;
		formObj.rpt_biz_tp.value="ACCT";
		formObj.rpt_biz_sub_tp.value="AR";
		formObj.rpt_trdp_cd.value=sheet1.GetCellValue(sRow,fix_grid01+"cust_cd");
		formObj.rpt_pdf_file_nm.value=getPdfFileNm(sRow);

	} else { // #2512 [WMS4.0]Print Closing detail before creating invoices

		formObj.title.value='Closing Detail';  // #2512 [WMS4.0]Print Closing detail before creating invoices

	}

	//--------------------------------------------------------------------
	// Closing Detail Report
	//--------------------------------------------------------------------
	//Parameter Setting
	// 1. Closing IN&OUT Entry
	if (sheet1.GetCellValue(sRow,fix_grid01+"rate_tp_cd") != "STO" &&  sheet1.GetCellValue(sRow,fix_grid01+"rate_tp_cd") != 'OTH') {             // wms #1069 Closing other entry
		ttlFileName+= "^@@^" + 'wms_close_in_out_report.mrd';

		var param = '';
		param += '[' + sheet1.GetCellValue(sRow,fix_grid01+"cls_no") + ']';		// [1]
		param += "[" + sheet1.GetCellValue(sRow,fix_grid01+"cust_cd") + ']';		// [2]
		param += "["  + "'" + sheet1.GetCellValue(sRow,fix_grid01+"rate_tp_cd") + "'" + ']';	// [3]
		ttlParam += "^@@^" + param;
	// 2. Storage - sheet1 : Ending Balance , sheet2 : Daily In & Out
	} else if (sheet1.GetCellValue(sRow,fix_grid01+"rate_tp_cd") == "STO"){                                                                       // wms #1069 Closing other entry
		ttlFileName+= "^@@^" + 'wms_close_storage_report.mrd';

		var param = '';
		param += '[' + sheet1.GetCellValue(sRow,fix_grid01+"cls_no") + ']';		// [1]
		param += "[" + sheet1.GetCellValue(sRow,fix_grid01+"cust_cd") + ']';		// [2]
		param += "[" + "'" + sheet1.GetCellValue(sRow,fix_grid01+"rate_tp_cd") + "'" + ']';	// [3]
		param += "[" + sheet1.GetCellValue(sRow,fix_grid01+"ctrt_no") + ']';		// [4]
		ttlParam += "^@@^" + param;
	// 3. #1069 Closing other entry
	} else if (sheet1.GetCellValue(sRow,fix_grid01+"rate_tp_cd") == "OTH"){                                                                       // wms #1069 Closing other entry
		ttlFileName+= "^@@^" + 'wms_close_other_report.mrd';

		var param = '';
		param += '[' + sheet1.GetCellValue(sRow,fix_grid01+"cls_no") + ']';		// [1]
		param += "[" + sheet1.GetCellValue(sRow,fix_grid01+"cust_cd") + ']';		// [2]
		param += "[" + "'" + sheet1.GetCellValue(sRow,fix_grid01+"rate_tp_cd") + "'" + ']';	// [3]
		param += "[" + sheet1.GetCellValue(sRow,fix_grid01+"ctrt_no") + ']';		// [4]
		ttlParam += "^@@^" + param;
	}
	if(ttlFileName.substring(4) != ""){
		formObj.file_name.value=ttlFileName.substring(4);
		formObj.rd_param.value=ttlParam.substring(4);
		//console.log(formObj.rd_param.value);
		popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
	}else{
		//There is no data
		alert(getLabel('FMS_COM_ALT010'));
		return;
	}

}

//#1069 Closing other entry
function print_ap(vRow, isInvoiced){ // #2512 [WMS4.0]Print Closing detail before creating invoices
	var formObj=document.form;
	var ttlFileName="";
	var ttlParam="";

	if(isInvoiced) { // #2512 [WMS4.0]Print Closing detail before creating invoices
		//--------------------------------------------------------------------
		// Invoice
		//--------------------------------------------------------------------
		formObj.title.value='PAYMENT REQUEST';
		
		ttlFileName += "^@@^" + "invoice_13.mrd";
		
		//Parameter Setting
		var param="[" + "'" + sheet1.GetCellValue(vRow,fix_grid01+"inv_seq") + "'" + ']';	// [1]
		param += '[' + sheet1.GetCellValue(vRow,fix_grid01+"cust_cd") + ']';			// BILL_TO   [2]
		param += '[' + sheet1.GetCellValue(vRow,fix_grid01+"ofc_cd") + ']';				// REF_OFC_CD[3]
		param += '[]';												// CNT_CD  [4]
		param += '[' + formObj.f_usr_nm.value + ']';				// USER_NM [5]
		param += '[' + formObj.f_email.value + ']';				    // USER EMAIL[6]
		param += '[' + formObj.f_usrPhn.value + ']';				// 7
		param += '[' + formObj.f_usrFax.value + ']';				// 8
		param += '[' + formObj.f_usr_nm.value + ']';				// 9
	
		ttlParam += "^@@^" + param;
	
		formObj.mailTitle.value = "INVOICE [INVOICE No. " + sheet1.GetCellValue(vRow,fix_grid01+"inv_no") + "]";
		var trdp_cd='';
		trdp_cd += '(' + '\'' + sheet1.GetCellValue(vRow,fix_grid01+"cust_cd") + '\'' + ')';
		ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
		formObj.mailTo.value=mailTo;
		formObj.rpt_biz_tp.value="ACCT";
		formObj.rpt_biz_sub_tp.value="AP";
		formObj.rpt_trdp_cd.value=sheet1.GetCellValue(vRow,fix_grid01+"cust_cd");
		formObj.rpt_pdf_file_nm.value=getPdfFileNm(vRow);

	} else { // #2512 [WMS4.0]Print Closing detail before creating invoices

		formObj.title.value='Closing Detail';  // #2512 [WMS4.0]Print Closing detail before creating invoices

	}

	//Closing other entry
	if (sheet1.GetCellValue(vRow,fix_grid01+"rate_tp_cd") == "OTH"){ // wms #1069 Closing other entry
		ttlFileName+= "^@@^" + 'wms_close_other_report.mrd';

		var param = '';
		param += '[' + sheet1.GetCellValue(vRow,fix_grid01+"cls_no") + ']';			// [1]
		param += "[" + sheet1.GetCellValue(vRow,fix_grid01+"cust_cd") + ']';		// [2]
		param += "["  + "'" + sheet1.GetCellValue(vRow,fix_grid01+"rate_tp_cd") + "'" + ']';	// [3]
		param += "["  + sheet1.GetCellValue(vRow,fix_grid01+"ctrt_no") + ']';		// [4]
		ttlParam += "^@@^" + param;
	}

	if(ttlFileName.substring(4) != ""){
		formObj.file_name.value=ttlFileName.substring(4);
		formObj.rd_param.value=ttlParam.substring(4);
		//console.log(formObj.rd_param.value);
		popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
	}else{
		//There is no data
		alert(getLabel('FMS_COM_ALT010'));
		return;
	}
}

function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}else{
			mailTo=doc[1];
		}
	}
}

function getPdfFileNm(sRow){
	var formObj=document.form;
	var pdfFileNm = "";
	var inv_no = sheet1.GetCellValue(sRow,fix_grid01+"inv_no");
	
	if (inv_no == "" || inv_no == "undefined" || inv_no == undefined) {
		return "";
	}
	if((sheet1.GetCellValue(sRow,fix_grid01+"sell_buy_tp_cd")) == "B"){  
		pdfFileNm = "AP_"+inv_no;
	}else{
		pdfFileNm = "AR_"+inv_no;	
	}
	return pdfFileNm;
}

//#1389 [WMS4.0] Closing In & Out Entry buttons add to extension
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