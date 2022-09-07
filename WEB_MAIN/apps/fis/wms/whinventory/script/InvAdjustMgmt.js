/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvAdjustMgmt.js
*@FileTitle  : Inventory Adjustment
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/14
=========================================================*/
var docObjects=new Array();
var firCalFlag=false;
var sheetCnt=0;
var fix_grid01="Grd01";

//#3390-Check Authority WMS CODE
var isWmsAuthOk = false; 

function loadPage() {
	var formObj=document.form;	
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}

	initControl();
	// Warehouse&Contract 세션 정보 Default 세팅
	setFieldValue(formObj.wh_cd, ComGetObjValue(formObj.def_wh_cd));
	setFieldValue(formObj.wh_nm, ComGetObjValue(formObj.def_wh_nm));
	setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no));	
	setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));	
	
	setFieldValue(formObj.prop_date_fm, ComGetDateAdd(null, "d", -31, "-"));	
	setFieldValue(formObj.prop_date_to, ComGetNowInfo());
//	check_authority_wh();
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate", document.form);
//    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
//	axon_event.addListenerForm("change", "form_onChange", formObject);    
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "wib_bk_no":	
				btn_Search();
			break;	
			case "item_cd":	
				btn_Search();
			break;
			case "lot_no":	
				btn_Search();
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
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "btn_ctrt_no":	
			var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value + "&ctrt_no=" +formObj.ctrt_no.value;
			   callBackFunc = "setCtrtNoInfo";
			   modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
			break;
		case "SEARCHLIST":
			btn_Search();
			break;
		case "EXCEL":
			btn_Excel();
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

function goToPage(callPage){
	document.forms[0].f_CurPage.value=callPage;
	btn_Search();
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	btn_Search();
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	btn_Search();
}

function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.prop_date_fm,  formObj.prop_date_to, 'MM-dd-yyyy');
        break;
    }
}

function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":
		    with(sheetObj){
//	      var hdr1="Seq|Item|Item Name|Item Lot No|Lot ID|Location|Current Inventory|Current Inventory|Current Inventory|Current Inventory|Current Inventory|Current Inventory|Current Inventory|Additional Lot Information|Additional Lot Information|Additional Lot Information|Inbound Info|Inbound Info|Inbound Info|Contract|Contract|W/H Code|po_sys_no|item_sys_no|wh_loc_cd|wh_nm";
//	      var hdr2="Seq|Item|Item Name|Item Lot No|Lot ID|Location|EA Qty|CBM|CBF|G.KGS|G.LBS|N.KGS|N.LBS|Expiration Date|Lot 04|Lot 05|Inbound Date|Booking No|Cust Order No|No|Name|W/H Code|po_sys_no|item_sys_no|wh_loc_cd|wh_nm";
	      var prefix=fix_grid01;
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('InvAdjustMgmt_HDR1'), Align:"Center"},
	                      { Text:getLabel('InvAdjustMgmt_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);
	      var cols = [ {Type:"Seq",       Hidden:0, Width:30, 	Align:"Center", ColMerge:1, 	Format:"", 				PointCount:0, 				SaveName:prefix+"seq", 			KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  Width:90, 	Align:"Center", ColMerge:1, 	Format:"", 				PointCount:0, 				SaveName:prefix+"item_cd", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  Width:250, 	Align:"Left", 	ColMerge:1, 	Format:"", 				PointCount:0, 				SaveName:prefix+"item_nm", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  Width:110, 	Align:"Center", 	ColMerge:1, 	Format:"", 				PointCount:0, 				SaveName:prefix+"lot_no", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  Width:150, 	Align:"Center", 	ColMerge:1, 	Format:"", 				PointCount:0, 				SaveName:prefix+"lot_id", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
		  	         {Type:"Text",     Hidden:0,  Width:80, 	Align:"Right",  	ColMerge:0,		SaveName:prefix+"item_ser_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			         {Type:"Text",     Hidden:0,  Width:80, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"lic_plat_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			         {Type:"Text",     Hidden:0,  Width:80, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"po_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
	  	             {Type:"Text",     Hidden:0,  Width:80, 	Align:"Left", 	ColMerge:1, 	Format:"", 				PointCount:0, 				SaveName:prefix+"wh_loc_nm", 	KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Float",     Hidden:0,  Width:55, 	Align:"Right", 	ColMerge:1, 	Format:"Integer", 		PointCount:0, 				SaveName:prefix+"ea_qty", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Float",     Hidden:0,  Width:90, 	Align:"Right", 	ColMerge:1, 	Format:"Float", 		PointCount:WMS_CBM_POINT_COUNT, 				SaveName:prefix+"fr_cbm", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Float",     Hidden:0,  Width:90, 	Align:"Right", 	ColMerge:1, 	Format:"Float", 		PointCount:WMS_CBM_POINT_COUNT, 				SaveName:prefix+"fr_cbf", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Float",     Hidden:0,  Width:60, 	Align:"Right", 	ColMerge:1, 	Format:"Float", 		PointCount:3, 				SaveName:prefix+"fr_grs_kgs", 	KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Float",     Hidden:0,  Width:60, 	Align:"Right", 	ColMerge:1, 	Format:"Float", 		PointCount:3, 				SaveName:prefix+"fr_grs_lbs", 	KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Float",     Hidden:0,  Width:60, 	Align:"Right", 	ColMerge:1, 	Format:"Float", 		PointCount:3, 				SaveName:prefix+"fr_net_kgs", 	KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Float",     Hidden:0,  Width:60, 	Align:"Right", 	ColMerge:1, 	Format:"Float", 		PointCount:3, 				SaveName:prefix+"fr_net_lbs", 	KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Date",     Hidden:0,  Width:95, 	Align:"Center", ColMerge:1, 	Format:"Ymd", 	PointCount:0, 				SaveName:prefix+"exp_dt", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  Width:80, 	Align:"Left", 	ColMerge:1, 	Format:"", 				PointCount:0, 				SaveName:prefix+"lot_04", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  Width:80, 	Align:"Left", 	ColMerge:1, 	Format:"", 				PointCount:0, 				SaveName:prefix+"lot_05", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Date",     Hidden:0,  Width:100, 	Align:"Center", 	ColMerge:1, 	Format:"Ymd",PointCount:0, 				SaveName:prefix+"inbound_dt", 	KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  Width:110, 	Align:"Center", 	ColMerge:1, 	Format:"", 			PointCount:0, 				SaveName:prefix+"wib_bk_no", 	KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  Width:150, 	Align:"Center", 	ColMerge:1, 	Format:"", 			PointCount:0, 				SaveName:prefix+"cust_ord_no", 	KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  Width:100, 	Align:"Center", 	ColMerge:1, 	Format:"", 			PointCount:0, 				SaveName:prefix+"ctrt_no", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  Width:110, 	Align:"Left", 	ColMerge:1, 	Format:"", 				PointCount:0, 				SaveName:prefix+"ctrt_nm", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  Width:70, 	Align:"Center", 	ColMerge:1, 	Format:"", 			PointCount:0, 				SaveName:prefix+"wh_cd", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:1, Width:80, 		Align:"Left", 	ColMerge:1, 	Format:"", 				PointCount:0, 				SaveName:prefix+"po_sys_no", 	KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:1, Width:95, 		Align:"Center", 	ColMerge:1, 	Format:"", 			PointCount:0, 				SaveName:prefix+"item_sys_no", 	KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:1, Width:90, 		Align:"Center", 	ColMerge:1, 	Format:"", 			PointCount:0, 				SaveName:prefix+"wh_loc_cd", 	KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:1, Width:90, 		Align:"Center", 	ColMerge:1, 	Format:"", 			PointCount:0, 				SaveName:prefix+"wh_nm", 		KeyField:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0} ];
	      
	      cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" });
	      
	      InitColumns(cols);
	      SetSheetHeight(450);
	      SetEditable(0);
	      SetHeaderRowHeight(30);
	      resizeSheet();
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
function resizeSheet(){
	 ComResizeSheet(docObjects[0]);
	}

/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	var formObj=document.form;
	var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value;
	callBackFunc = "setCtrtNoInfo";
    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");

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
		   formObj.ctrt_no.value=rtnValAry[0];
		   formObj.ctrt_nm.value=rtnValAry[1];
	}
}

/*
 * 팝업 관련 로직 끝
 */
function btn_Search(){
	var formObj=document.form;
	if (validateForm(formObj, 'search')) {	
		docObjects[0].RemoveAll();
		formObj.f_cmd.value=SEARCH;
 		docObjects[0].DoSearch("./searchInvAdjustListGS.clt", FormQueryString(formObj, ""));
	}
}
/*
 * 엑셀다운로드
 */
function btn_Excel() {
	if(docObjects[0].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	var prefix="Grd01";	
     	docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(	docObjects[0]), SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1, ExtendParam: "ColumnColor: " + prefix + "lot_id|" + prefix + "wib_bk_no"});
    }
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			// Warehouse 체크			
			if(formObj.wh_cd.value == ""){
			    ComShowCodeMessage("COM12233");
			    return false;
		    }
			// Contract No 체크
			if (ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0114", "Contract No");
				formObj.ctrt_no.focus();

				return false;
			}	
			//In booking No(Cust Order No) 가 없는경우 Inbound(Expiration) Date는 필수 (MAX 93일까지)
			if (ComIsEmpty(formObj.cond_no)) {
				if (ComIsEmpty(formObj.prop_date_fm)) {
					ComShowCodeMessage("COM0114", "In booking No(Cust Order No) or Inbound(Expiration) Date");
					formObj.prop_date_fm.focus();
					return false;
				} 
			}
			if (!ComIsEmpty(formObj.prop_date_fm) && ComIsEmpty(formObj.prop_date_to)) {
				formObj.prop_date_to.value=ComGetNowInfo();
			}
			if (ComIsEmpty(formObj.prop_date_fm) && !isDate(formObj.prop_date_fm)) {
				ComShowCodeMessage("COM0114", "Inbound(Expiration) Date");
				formObj.prop_date_fm.focus();
				return false;
			}
			if (ComIsEmpty(formObj.prop_date_to) && !isDate(formObj.prop_date_to)) {
				ComShowCodeMessage("COM0114", "Inbound(Expiration) Date");
				formObj.prop_date_to.focus();
				return false;
			}
			if ((ComIsEmpty(formObj.prop_date_fm)&&ComIsEmpty(formObj.prop_date_to))||(ComIsEmpty(formObj.prop_date_fm)&&!ComIsEmpty(formObj.prop_date_to))) {
				ComShowCodeMessage("COM0122", "Inbound(Expiration) Date");
				formObj.prop_date_fm.focus();
				return false;
			}
			if (getDaysBetween(formObj.prop_date_fm, formObj.prop_date_to, 'MM-dd-yyyy')<0) {
				ComShowCodeMessage("COM0122", "Inbound(Expiration) Date!");
				formObj.prop_date_fm.focus();
				return false;
			}			
			break;
		}
	}
	return true;
}
/*
***
* AJAX CODE SEARCH
*/
/*
* Warehouse search
* OnKeyDown 13 or onChange
*/
function getLocInfo(obj){

	if(obj.value != ""){
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
	}
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
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
/*
* Contract search
* OnKeyDown 13 or onChange
*/
function getCtrtInfo(obj){
	var formObj=document.form;
	
	if(obj.value != "" || formObj.ctrt_nm.value != ""){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
	}
}
function resultCtrtInfo(reqVal) {

	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.ctrt_nm.value=rtnArr[0];
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
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {
	var formObj=document.form;	
	var sheetObj=docObjects[0];
	
	doDispPaging(sheetObj.GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	
//	sheet1.SetTotalRows(sheet1.RowCount());
	
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
		// Item Code 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "lot_id","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
 		
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "lot_id", 1);
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wib_bk_no", 1);
 		
		// 저장후 로우 선택
		if (ComGetObjValue(formObj.po_sys_no) == sheetObj.GetCellValue(i, fix_grid01 + "po_sys_no")
		&& ComGetObjValue(formObj.item_sys_no) == sheetObj.GetCellValue(i, fix_grid01 + "item_sys_no")
		&& ComGetObjValue(formObj.lot_id) == sheetObj.GetCellValue(i, fix_grid01 + "lot_id")
		&& ComGetObjValue(formObj.wh_loc_cd) == sheetObj.GetCellValue(i, fix_grid01 + "wh_loc_cd")) {
			if (ComGetObjValue(formObj.form_mode) == "SAVE") {		
				sheetObj.SelectCell(i, (fix_grid01+"item_cd"));
			}
		}		
	}
	setFieldValue(formObj.form_mode, "");
	setFieldValue(formObj.po_sys_no, "");
	setFieldValue(formObj.item_sys_no, "");
	setFieldValue(formObj.lot_id, "");
	setFieldValue(formObj.wh_loc_cd, "");	
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
	case fix_grid01 + "lot_id":
		var sParam="wh_cd=" + sheetObj.GetCellValue(Row, fix_grid01+"wh_cd")
		+ "&wh_nm=" + sheetObj.GetCellValue(Row, fix_grid01+"wh_nm")
		+ "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid01+"ctrt_no")
		+ "&ctrt_nm=" + sheetObj.GetCellValue(Row, fix_grid01+"ctrt_nm")
		+ "&lot_id=" + sheetObj.GetCellValue(Row, fix_grid01+"lot_id");
		
		var sUrlCall = "WHLotList_" + sheetObj.GetCellValue(Row, fix_grid01+"wh_cd") + "_" + sheetObj.GetCellValue(Row, fix_grid01+"wh_nm") + "_" + sheetObj.GetCellValue(Row, fix_grid01+"ctrt_no");
		sUrlCall += "_" + sheetObj.GetCellValue(Row, fix_grid01+"ctrt_nm") + "_" + sheetObj.GetCellValue(Row, fix_grid01+"lot_id");
		
			var sUrl="./WHLotList.clt?" + sParam;
				parent.mkNewFrame('Lot Search', sUrl, sUrlCall);
		break;	
	case fix_grid01 + "wib_bk_no":
//		var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
//		parent.mkNewFrame('Inbound Booking Management', sUrl, "WHInbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
		
		if(sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no") != "")
		{
			var sUrl="./WHInMgmt.clt?req_wib_bk_no="+ sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")+ "&req_wh_cd="+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")+"&req_wh_nm="+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_nm");
			parent.mkNewFrame('Inbound Management', sUrl, "WHInMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
		}
		break;				
	default:		
		//#3390-Check Authority WMS CODE
    	var wh_cd = sheetObj.GetCellValue(Row, fix_grid01+"wh_cd");
		ComChecWmsCd_Authority(wh_cd);
		if (isWmsAuthOk == false) { 
			//alert('Not authenticated.\r\nYou are not authorized to access Warehouse'); 
			ComShowCodeMessage("COM0785");
			return
		}  
		invAdjustPopup(sheetObj,Row);
		break;
	}
}
function invAdjustPopup(sheetObj,Row) {
	var formObj=document.form;
	var wib_bk_no="";
	var po_sys_no="";	
	var item_sys_no="";
	var lot_id="";	
	var po_no="";	
	var item_ser_no="";	
	var lic_plat_no="";	
	var wh_loc_cd="";	
	wib_bk_no=sheetObj.GetCellValue(Row, (fix_grid01+"wib_bk_no"));
	po_sys_no=sheetObj.GetCellValue(Row, (fix_grid01+"po_sys_no"));
	item_sys_no=sheetObj.GetCellValue(Row, (fix_grid01+"item_sys_no"));
	lot_id=sheetObj.GetCellValue(Row, (fix_grid01+"lot_id"));
	wh_loc_cd=sheetObj.GetCellValue(Row, (fix_grid01+"wh_loc_cd"));
	po_no=sheetObj.GetCellValue(Row, (fix_grid01+"po_no"));
	item_ser_no=sheetObj.GetCellValue(Row, (fix_grid01+"item_ser_no"));
	lic_plat_no=sheetObj.GetCellValue(Row, (fix_grid01+"lic_plat_no"));
	setFieldValue(formObj.wib_bk_no, wib_bk_no);
	setFieldValue(formObj.po_sys_no, po_sys_no);
	setFieldValue(formObj.item_sys_no, item_sys_no);
	setFieldValue(formObj.lot_id, lot_id);
	setFieldValue(formObj.wh_loc_cd, wh_loc_cd);
	var sUrl="./InvAdjustPopup.clt?page_tp=MGMT&wib_bk_no=" + wib_bk_no + "&po_sys_no=" + po_sys_no 
				+ "&item_sys_no=" + item_sys_no + "&lot_id=" + lot_id + "&wh_loc_cd=" + wh_loc_cd + "&wh_cd=" + formObj.wh_cd.value
				+ "&po_no=" + po_no + "&item_ser_no=" + item_ser_no + "&lic_plat_no=" + lic_plat_no;
	//ComOpenPopup(sUrl, 1000, 365, "setInvAdjustPopup", "0,0", true);
	callBackFunc = "setInvAdjustPopup";
	modal_center_open(sUrl, callBackFunc, 1000,365,"yes");
}
/**
 * 팝업 호출한 현재 ROW 로 포커스 이동
 */
function setInvAdjustPopup() {
}
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(){
	var formObj = document.form;
	var countwd = 0;
	//List Warehouse from TB_SEQ
	var wh_list_ath = formObj.wh_list_ath.value;
	var arrwhcd =  wh_list_ath.split(',');
	//List warehouse default in User Entry Screen.
	var wh_cfg = formObj.wh_cfg.value;
	var arrwhcd_df =  wh_cfg.split(',');
	
	//Warehosue selected.
	var warehouse = formObj.wh_cd.value;
	for(var i = 0; i < arrwhcd_df.length; i ++){
		for(var j = 0; j < arrwhcd.length; j ++){
			if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("btn_Search");
		ComBtnDisable("btn_Excel");
	}else{
		ComBtnEnable("btn_Search");
		ComBtnEnable("btn_Excel");
	}
}
