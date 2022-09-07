/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ItemInOutSummaryList.js
*@FileTitle  : IN & OUT Summary
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/14
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var rtnary=new Array(1);
var callBackFunc = "";
var firCalFlag=false;
function loadPage() {
	var formObj=document.form;	
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
    	
	initControl();
	setFieldValue(formObj.wh_cd, ComGetObjValue(formObj.def_wh_cd));
	setFieldValue(formObj.wh_nm, ComGetObjValue(formObj.def_wh_nm));
	setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no)); 
	setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
	setFromToDtEndPlus(formObj.prop_date_fm, 15, formObj.prop_date_to, 0);
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
/**
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
 }

function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
//    axon_event.addListenerForm('beforedeactivate', 'form_deactivate', formObject);
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
		case "btn_prop_date_to":
			if (document.getElementById('btn_prop_date_to').disabled) {
				return;
			}
			var cal=new ComCalendarFromTo();
			cal.displayType="date";
            cal.select(formObj.prop_date_fm, formObj.prop_date_to, 'MM-dd-yyyy');
			break;
		case "btn_ctrt_no":	
			CtrtPopup();
			break;
		case "SEARCHLIST":
			btn_Search();
			break;
		case "EXCEL":
			btn_Excel();
			break;
		case "btn_change_date1":
				btn_Change_Date("week");
				break;
		case "btn_change_date2":
			btn_Change_Date("half_month");
				break;
		case "btn_change_date3":
			btn_Change_Date("month");
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
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
	        
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('ItemInOutSummaryList_HDR1'), Align:"Center"},
	                      { Text:getLabel('ItemInOutSummaryList_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ 
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:1,   SaveName:"item_cd",         KeyField:0,   CalcLogic:"",   Format:"",      PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",      ColMerge:1,   SaveName:"item_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:1,  Width:110,  Align:"Center",    ColMerge:1,   SaveName:"lot_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:1,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"lot_id",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Int",   	Hidden:0,  Width:70,   Align:"Right",     ColMerge:1,   SaveName:"stc_qty",         KeyField:0,   CalcLogic:"",   Format:"NullInteger",      	PointCount:0,	  UpdateEdit:1,   InsertEdit:1},
	             {Type:"Int",   	Hidden:0,  Width:70,   Align:"Right",     ColMerge:1,   SaveName:"balance_qty",     KeyField:0,   CalcLogic:"",   Format:"NullInteger",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",    ColMerge:1,   SaveName:"inbound_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",  		PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"cust_ord_no_ib",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Int",   	Hidden:0,  Width:70,   Align:"Right",     ColMerge:1,   SaveName:"in_qty",          KeyField:0,   CalcLogic:"",   Format:"NullInteger",     		  PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",    ColMerge:1,   SaveName:"outbound_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",  		PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"cust_ord_no_ob",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Float",   	Hidden:0,  Width:70,   Align:"Right",     ColMerge:1,   SaveName:"out_qty",         KeyField:0,   CalcLogic:"",   Format:"Float",     		  PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",    ColMerge:1,   SaveName:"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",      ColMerge:1,   SaveName:"ctrt_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"in_bk_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"out_bk_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Date",      Hidden:1,  Width:80,   Align:"Center",    ColMerge:1,   SaveName:"exp_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",  		PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:1,  Width:80,   Align:"Left",      ColMerge:1,   SaveName:"lot_04",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:1,  Width:80,   Align:"Left",      ColMerge:1,   SaveName:"lot_05",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Combo",     Hidden:0,  Width:160,  Align:"Left",      ColMerge:1,   SaveName:"wh_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
//	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",      ColMerge:0,   SaveName:"wh_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"ref_no_ib",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"ref_no_ob",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1} ];
	       
	      InitColumns(cols);
		  SetColProperty("wh_cd", {ComboText:"|"+WHNMLIST, ComboCode:"|"+WHCDLIST} );
	      SetSheetHeight(450);
	      SetEditable(0);
	      SetHeaderRowHeight(30);
	      SetAutoRowHeight(0);
	      resizeSheet();
	      SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	      //ShowSubSum([{StdCol:3, SumCols:"4|5|8|11", Sort:false, ShowCumulate:false, CaptionText:"Sub Total", CaptionCol: 1}]);
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
	ComResizeSheet(sheet1);
}

/*
 * NAME 엔터시 팝업호출 - warehouse name
 */

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
function setPutawayLocInfo(aryPopupData) {
	var formObj=document.form;
	ComSetObjValue(formObj.wh_loc_cd,     aryPopupData[0][0]);// wh_loc_cd
	ComSetObjValue(formObj.wh_loc_nm,     aryPopupData[0][1]);// wh_loc_nm
}
/**
 * 마우스 아웃일때 
 */
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=window.event.srcElement.getAttribute("value");
	if (srcName == "wh_loc_nm") {
		if (srcValue != "") {
			var sParam="f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_wh_loc_nm=" + srcValue;
			/*$.ajax({
				url : "searchWarehouseLocInfoForName.clt?"+sParam,
				success : function(result) {
					ComSetObjValue(formObj.wh_loc_cd,     getXmlDataNullToNullString(result.xml,'wh_loc_cd')); // wh_loc_cd
					ComSetObjValue(formObj.wh_loc_nm,     getXmlDataNullToNullString(result.xml,'wh_loc_nm')); // wh_loc_nm
					if (getXmlDataNullToNullString(result.xml,'exception_msg') != "") {
						alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
						ComSetFocus(formObj.wh_loc_nm);
					}
				}
			});*/
			var sXml=docObjects[0].GetSearchData("searchWarehouseLocInfoForName.clt?"+sParam);
			ComSetObjValue(formObj.wh_loc_cd,     getXmlDataNullToNullString(sXml,'wh_loc_cd')); // wh_loc_cd
			ComSetObjValue(formObj.wh_loc_nm,     getXmlDataNullToNullString(sXml,'wh_loc_nm')); // wh_loc_nm
			if (getXmlDataNullToNullString(sXml,'exception_msg') != "") {
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
				ComSetFocus(formObj.wh_loc_nm);
			}
		} else {
			ComSetObjValue(formObj.wh_loc_cd,     ""); // wh_loc_cd
			ComSetObjValue(formObj.wh_loc_nm,     ""); // wh_loc_nm
		}				
	}
}
/*
 * 팝업 관련 로직 끝
 */
function btn_Search(){
	var formObj=document.form;
	if(formObj.wh_cd.value == ""){
		   ComShowCodeMessage("COM12233");
		   return;
	}
	sheet1.RemoveAll();
	if (validateForm(formObj, 'search')) {
		formObj.f_cmd.value = SEARCH;
		setSubSumRow(sheet1);
		sheet1.DoSearch("./searchItemInOutSummaryListGS.clt", FormQueryString(formObj));
	}
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	var sheetObj=docObjects[0];
	if( sheetObj.RowCount() >1){
		var arys=sheetObj.FindSubSumRow().split("|");
		sheetObj.SetMergeCell(parseInt(arys[0]),0, 1, 4);
		for(var i=1;i<arys.length;i++)
		{
			sheetObj.SetMergeCell(parseInt(arys[i]),0, 1, 4);
		}
		
		docObjects[0].SetSelectRow(-1);
	}
	for(var i=2; i<=sheetObj.LastRow();i++){
 		sheetObj.SetCellFontColor(i, "cust_ord_no_ib","#0100FF");
 		sheetObj.SetCellFontColor(i, "cust_ord_no_ob","#0100FF");
 		
 		sheetObj.SetCellFontUnderline(i, "cust_ord_no_ib", 1);
 		sheetObj.SetCellFontUnderline(i, "cust_ord_no_ob", 1);
	}
	mergeCell(2);
	// #1263 [WMS4.0]In/Out History 화면 수정
	// #3756 [J&A WMS #1] v461 이후 In&Out 조회시 속도 문제
	var lastrow = sheetObj.LastRow();
	sheetObj.Redraw = false;
	for(var i=2; i<=lastrow;i++){
 		if (ComIsNull(sheetObj.GetCellValue(i, "in_qty")) || sheetObj.GetCellValue(i, "in_qty") == "0") {
 			sheetObj.CellValue2(i , "item_cd") ="";
 			sheetObj.CellValue2(i , "item_nm") ="";
 			sheetObj.CellValue2(i , "stc_qty") ="";
 			sheetObj.CellValue2(i , "balance_qty") ="";
 			sheetObj.CellValue2(i , "inbound_dt") ="";
 			sheetObj.CellValue2(i , "cust_ord_no_ib") ="";
 			sheetObj.CellValue2(i , "in_qty") ="";
 			
 			sheetObj.CellValue2(i , "lot_no") ="";
 			sheetObj.CellValue2(i , "lot_id") ="";
 			 			
 		}
	}
	sheetObj.Redraw = true;
}
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	if (colName == "cust_ord_no_ib") {	
		var sUrl="./WHInMgmt.clt?req_wib_bk_no="+sheetObj.GetCellValue(Row, "in_bk_no")
				+ "&req_wh_cd=" + $("#wh_cd").val()
				+ "&req_ctrt_no=" + $("#ctrt_no").val();
		parent.mkNewFrame('Inbound Management', sUrl);
	}else if (colName == "cust_ord_no_ob") {
		/*var sUrl="./WHOutbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, "out_bk_no");
		parent.mkNewFrame('Outbound Booking Management', sUrl, "WHOutbkMgmt_" + sheetObj.GetCellValue(Row, "out_bk_no"));*/
		
		var sUrl="./WHOutMgmt.clt?req_wob_bk_no="+sheetObj.GetCellValue(Row, "out_bk_no")+ "&req_wh_cd="+  $("#wh_cd").val() +"&req_wh_nm="+ $("#wh_nm").val() + "&cntr_no=" + $("#ctrt_no").val();
		parent.mkNewFrame('Outbound Management', sUrl);
	}  
}
/*
 * 엑셀다운로드
 */
function btn_Excel() {
 	if(docObjects[0].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	sheet1.Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, AutoSizeColumn: 1, ExtendParam: "ColumnColor: in_bk_no|out_bk_no" });
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
			    return;
			}
			if(!ComIsEmpty(formObj.prop_date_fm) && ComIsEmpty(formObj.prop_date_to)){
				formObj.prop_date_to.value=ComGetNowInfo();
			}
			if (!ComIsEmpty(formObj.prop_date_fm) && !isDate(formObj.prop_date_fm)) {
				ComShowCodeMessage("COM0114",$("#prop_date_tp")[0].options[prop_date_tp.selectedIndex].text);
				formObj.prop_date_fm.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.prop_date_to) && !isDate(formObj.prop_date_to)) {
				ComShowCodeMessage("COM0114",$("#prop_date_tp")[0].options[prop_date_tp.selectedIndex].text);
				formObj.prop_date_to.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.prop_date_fm)&&ComIsEmpty(formObj.prop_date_to))||(ComIsEmpty(formObj.prop_date_fm)&&!ComIsEmpty(formObj.prop_date_to))) {
				ComShowCodeMessage("COM0122",$("#prop_date_tp")[0].options[prop_date_tp.selectedIndex].text);
				formObj.prop_date_fm.focus();
				return false;
			}
			if (getDaysBetween(formObj.prop_date_fm, formObj.prop_date_to,'MM-dd-yyyy')<0) {
				ComShowCodeMessage("COM0122",$("#prop_date_tp")[0].options[prop_date_tp.selectedIndex].text);
				formObj.prop_date_fm.focus();
				return false;
			}
			if(!chkSearchCmprPrd(true, formObj.prop_date_fm, formObj.prop_date_to)){
				return;
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
function searchLocInfo(obj){
	ajaxSendPost(setLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
}
function setLocInfo(reqVal){
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

function searchTlCtrtInfo(){
	var formObj=document.form;
	ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.ctrt_no.value, './GateServlet.gsl');
}
function setTlCtrtInfo(reqVal){
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

function CtrtPopup(){
	var formObj=document.form;
	callBackFunc = "setCtrtNoInfo";
    //modal_center_open('./ContractRoutePopup.clt?ctrt_nm='+formObj.ctrt_nm.value, callBackFunc, 900, 580,"yes");
    modal_center_open('./ContractRoutePopup.clt?ctrt_no=' + formObj.ctrt_no.value + '&ctrt_nm='+formObj.ctrt_nm.value, callBackFunc, 900, 580,"yes");
}

//############################################################################################################
function mergeCell(Row){
	var prefix="";
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
	if(		   item_cd == item_cd_ori 
			&& item_nm == item_nm_ori
			&& lot_no  == lot_no_ori 
			&& lot_id  == lot_id_ori
			&& stc_qty == stc_qty_ori ){
		if(startRow == 0){
			startRow = i;
			totalRowMerge = 1;
		}
		totalRowMerge++;
		if( item_cd == item_cd_ori
			&& item_nm == item_nm_ori
			&& lot_no  == lot_no_ori 
			&& lot_id  == lot_id_ori
			&& stc_qty == stc_qty_ori
			){ 
				if( 	stc_qty == stc_qty_ori
						&& inbound_dt == inbound_dt_ori
						&& in_bk_no   == in_bk_no_ori
						&& in_qty   == in_qty_ori
						&& balance_qty == balance_qty_ori
					){
					sheet1.SetCellValue(i, "in_bk_no", "");
					sheet1.SetCellValue(i, "in_qty", "");
					sheet1.SetCellValue(i, "balance_qty", "");
				}else{
					in_qty_ori = sheet1.GetCellValue(i, "in_qty");
					in_bk_no_ori = sheet1.GetCellValue(i, "in_bk_no");
					inbound_dt_ori = sheet1.GetCellValue(i, "inbound_dt");
					balance_qty_ori = sheet1.GetCellValue(i, "balance_qty");
				}
			
		}
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
	
	if(i == sheet1.RowCount() + 1){
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
	var prefix="";
	var sheetObj = sheet1;
	item_cd_ori = sheetObj.GetCellValue(i, prefix+"item_cd");
	item_nm_ori = sheetObj.GetCellValue(i, prefix+"item_nm");
	lot_no_ori = sheetObj.GetCellValue(i, prefix+"lot_no");
	lot_id_ori = sheetObj.GetCellValue(i, prefix+"lot_id");
	stc_qty_ori = sheetObj.GetCellValue(i, prefix+"stc_qty");
	balance_qty_ori = sheetObj.GetCellValue(i, prefix+"balance_qty");
	
	inbound_dt_ori = sheetObj.GetCellValue(i, prefix+"inbound_dt");
	in_bk_no_ori = sheetObj.GetCellValue(i, prefix+"in_bk_no");
	in_qty_ori = sheetObj.GetCellValue(i, prefix+"in_qty");
	
	outbound_dt_ori = sheetObj.GetCellValue(i, prefix+"outbound_dt");
	out_bk_no_ori = sheetObj.GetCellValue(i, prefix+"out_bk_no");
	out_qty_ori = sheetObj.GetCellValue(i, prefix+"out_qty");
}
function getData(i){
	var prefix="";	
	var sheetObj = sheet1;
	item_cd = sheetObj.GetCellValue(i, prefix+"item_cd");
	item_nm = sheetObj.GetCellValue(i, prefix+"item_nm");
	lot_no = sheetObj.GetCellValue(i, prefix+"lot_no");
	lot_id = sheetObj.GetCellValue(i, prefix+"lot_id");
	stc_qty = sheetObj.GetCellValue(i, prefix+"stc_qty");
	balance_qty = sheetObj.GetCellValue(i, prefix+"balance_qty");
	
	inbound_dt = sheetObj.GetCellValue(i, prefix+"inbound_dt");
	in_bk_no = sheetObj.GetCellValue(i, prefix+"in_bk_no");
	in_qty = sheetObj.GetCellValue(i, prefix+"in_qty");
	
	outbound_dt = sheetObj.GetCellValue(i, prefix+"outbound_dt");
	out_bk_no = sheetObj.GetCellValue(i, prefix+"out_bk_no");
	out_qty = sheetObj.GetCellValue(i, prefix+"out_qty");
}
function setMergeCell(startRow, totalRowMerge){
	
	for(var i = 1; i < totalRowMerge; i ++){
		sheet1.SetCellValue(startRow + i, "stc_qty", "");
	}
}

function inv_by_tp_OnChange(comboObj, newCode) {
	sheet1.RemoveAll();
	if(newCode == "ITEM"){
		sheet1.SetColHidden("lot_no", 1);
		sheet1.SetColWidth("lot_no", 1);
		
		sheet1.SetColHidden("lot_id", 1);
		sheet1.SetColWidth("lot_id", 1);
		
		sheet1.SetColHidden("exp_dt", 1);
		sheet1.SetColWidth("exp_dt", 1);
		
		sheet1.SetColHidden("lot_04", 1);
		sheet1.SetColWidth("lot_04", 1);
		
		sheet1.SetColHidden("lot_05", 1);
		sheet1.SetColWidth("lot_05", 1);
		
		$("#prop_no_tp").hide();
		$("#prop_no").hide();
	}else if(newCode == "LOT"){
		sheet1.SetColHidden("lot_no", 0);
		sheet1.SetColWidth("lot_no", 110);
		
		sheet1.SetColHidden("lot_id", 0);
		sheet1.SetColWidth("lot_id", 120);
		
		sheet1.SetColHidden("exp_dt", 0);
		sheet1.SetColWidth("exp_dt", 80);
		
		sheet1.SetColHidden("lot_04", 0);
		sheet1.SetColWidth("lot_04", 80);
		
		sheet1.SetColHidden("lot_05", 0);
		sheet1.SetColWidth("lot_05", 80);
		
		$("#prop_no_tp").show();
		$("#prop_no").show();
	}	
}
function setSubSumRow(sheetObj)
{
	var formObj = document.form;
	var totalStr="Total";
	var subSumStr="Sub Total";
	var colstr = "";
	with(sheetObj)
	{
		if(formObj.inv_by_tp.value == "ITEM"){
			colstr = 1;
		}else{
//			colstr = 3;
			colstr = 1;
		}
		//Sub Sum 을 구한다.
        //              stdCol                      , sumCols,            ,PosBottom,sort,ShowCum,CapttionCol,otherColText,                                                                                                                 avgCols,isSumEx      
		ShowSubSum([{StdCol:colstr, SumCols:"stc_qty|balance_qty|in_qty|out_qty", Sort:false, ShowCumulate:false, CaptionText:"Sub Total : %col", CaptionCol: "item_cd"}]);
	}
}

function btn_Change_Date(div)
{
	var flag="";
	var val=0;
	var toDay = ComGetNowInfo();
	if(div == "week")
	{
		flag="d";
		val=-7;
	}
	else if(div == "half_month")
	{
		flag="d";
		val=-15;
	}
	else if(div == "month")
	{
		flag="m";
		val=-1;
	}
	var dt=ComGetDateAdd(toDay, flag, val, "-");
	$("#prop_date_fm").val(ComGetDateAdd(dt, "d", 1, "-"));
	$("#prop_date_to").val(toDay);	
}