/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHLotList.js
*@FileTitle  : LOT Search
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/07/14
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var firCalFlag = false;
var comboObjects=new Array();
var comboCnt=0; 
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	loadComboWarehouse();
	initControl();
	var formObj=document.form;
	formObj.wh_combo.value = formObj.wh_cd_temp.value;
	$("#prop_date_fm").val(ComGetDateAdd(null, "d", -31, "-"));
	$("#prop_date_to").val(ComGetNowInfo());
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("blur", "frmObj_OnChange", formObject);
//    // OnKeyUp 이벤트
//    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
//    //- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function obj_keydown() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if(event.keyCode==13){
		//Name Enter 시 해당팝업호출
		switch (srcName) {
			case "ctrt_cust_nm":
				rtnary=new Array(4);
				rtnary[0]=formObj.ctrt_cust_cd.value;
				rtnary[1]=formObj.ctrt_cust_nm.value;
				rtnary[2]="Y";
				callBackFunc = "setCtrtCustInfo";
				modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
				break;	
		}
	}
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
document.keydown=obj_keydown;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "btn_prop_date_to":	
            var cal = new ComCalendarFromTo();
	    	cal.select(formObj.prop_date_fm,formObj.prop_date_to, 'MM-dd-yyyy');
			break;
		case "btn_ctrt_no":	
			CtrtPopup();
		break;
		case "SEARCHLIST":
			sheet1.RemoveAll();
			btn_Search();
			break;
		case "EXCEL":
			btn_Excel_Dl();
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
function setCtrtCustInfo(aryPopupData){
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		return;
	}else{
		var rtVal = aryPopupData.split("|");
		formObj.ctrt_cust_cd.value =    rtVal[0];
		formObj.ctrt_cust_nm.value =   rtVal[2];
	}
}
function getCtrtInfo(obj){
	if(obj.value != ""){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
	}
	else
	{
		$("#ctrt_nm").val("");
	}
}
function resultCtrtInfo(reqVal) {
	var formObj=document.form;
	
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
		 formObj.ctrt_no.value="";
		 formObj.ctrt_nm.value=""; 
	 }
}
function CtrtPopup(){
	var formObj=document.form;
	rtnary=new Array(1);
//	rtnary[0]=formObj.ctrt_no.value;
//	rtnary[1]=formObj.ctrt_nm.value;
	callBackFunc = "setCtrtNoInfo";
	modal_center_open('./ContractRoutePopup.clt?ctrt_no=' + formObj.ctrt_no.value + "&ctrt_nm=" + formObj.ctrt_nm.value, rtnary, 900, 580,"yes");
}
function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		return;
	}else{
		var rtVal = aryPopupData.split("|");
		formObj.ctrt_no.value =    rtVal[0];
		formObj.ctrt_nm.value =   rtVal[1];
	}
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		      with(sheetObj){

         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel('WHLotList_HDR1'), Align:"Center"},
                         { Text:getLabel('WHLotList_HDR2'), Align:"Center"} ];
         InitHeaders(headers, info);

         var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"ctrt_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Text",      Hidden:0, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"item_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Text",      Hidden:0,  Width:280,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Text",      Hidden:0,  Width:140,  Align:"Center",  ColMerge:1,   SaveName:"lot_id",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"lot_attrib_01",  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"lot_attrib_02",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"lot_attrib_03",  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"lot_attrib_04",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"lot_attrib_05",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"ctrt_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"item_sys_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1} ];
          
         InitColumns(cols);
         SetSheetHeight(450);
         SetEditable(0);
         SetHeaderRowHeight(30);
	     SetAutoRowHeight(0);
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
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	var rowcnt=sheetObj.RowCount();
	for (var i=1; i <= rowcnt + 1; i++) {		
		//sheetObj.CellFontColor(i, "loc_cd") = "#0000FF";
		//sheetObj.CellFont("FontBold", i, "so_no") = true;		
	}	
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var colName=sheetObj.ColSaveName(Col);
	if (colName == "loc_cd") {		
		//alert(sheetObj.cellValue(Row,"wh_loc_cd"));		
		//alert(sheetObj.cellValue(Row,"wh_loc_nm"));		
		var paramStr="./WHLocMgmt.clt?loc_cd="+sheetObj.cellValue(Row,"loc_cd")+"&loc_nm="+sheetObj.cellValue(Row,"loc_nm");
	    parent.mkNewFrame('Location Management', paramStr, "WHLocMgmt_" + sheetObj.cellValue(Row,"loc_cd") + "_" + sheetObj.cellValue(Row,"loc_nm"));
	}
}
function btn_Search(){
	var formObj=document.form;
	if (validateForm(docObjects[0],formObj,'Search')) {
		formObj.f_cmd.value=SEARCH;
		sheet1.DoSearch("./searchWHLotList.clt", FormQueryString(formObj, ""));
	}
}
function btn_Excel_Dl()
{
 	if(docObjects[0].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(	docObjects[0]), SheetDesign:1,Merge:1 });
    }
}
/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	with (formObj) {
		switch (sAction) {
			case 'Search':
				if(formObj.wh_combo.value == ""){
					if(formObj.wh_combo.value == ""){
						alert("Please Enter Warehouse.");
						formObj.wh_combo.focus();
						
						return false;
					}
				}
				if(formObj.ctrt_no.value == ""){
					alert("Please Enter Contract No.");
					formObj.ctrt_no.focus();
					return false;
				}
				//날짜
				if(!ComIsEmpty(formObj.prop_date_fm) && ComIsEmpty(formObj.prop_date_to)){
					formObj.prop_date_to.value=ComGetNowInfo();
				}
				/* 3개월 duration 주석
				if (!ComIsEmpty(formObj.prop_date_fm) && getDaysBetween2(formObj.prop_date_fm.value, formObj.prop_date_to.value)> 92) {
					ComShowCodeMessage("COM0141","3","(" + $("#prop_date_tp")[0].GetSelectText()+ ")");
					formObj.prop_date_fm.focus();
					return false;
				}
				*/
				if (!ComIsEmpty(formObj.prop_date_fm) && !isDate(formObj.prop_date_fm)) {
					ComShowCodeMessage("COM0114",$("#prop_date_tp")[0].GetSelectText());
					formObj.prop_date_fm.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.prop_date_to) && !isDate(formObj.prop_date_to)) {
					ComShowCodeMessage("COM0114",$("#prop_date_tp")[0].GetSelectText());
					formObj.prop_date_to.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.prop_date_fm)&&ComIsEmpty(formObj.prop_date_to))||(ComIsEmpty(formObj.prop_date_fm)&&!ComIsEmpty(formObj.prop_date_to))) {
					ComShowCodeMessage("COM0122",$("#prop_date_tp")[0].GetSelectText());
					formObj.prop_date_fm.focus();
					return false;
				}
				if (getDaysBetween(formObj.prop_date_fm, formObj.prop_date_to, 'MM-dd-yyyy')<0) {
					ComShowCodeMessage("COM0122",$("#prop_date_tp")[0].GetSelectText());
					formObj.prop_date_fm.focus();
					return false;
				}
				break;
		}
	}
	return true;
}
function getLocInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.loc_cd.value="";
		form.loc_nm.value="";
	}else{
		searchLocInfo(formObj, ComGetObjValue(formObj.loc_cd), "loc_cd");
	}
}
function searchLocInfo (form, value, col){
	var formObj=document.form;
	ajaxSendPost(resultLocNm, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+ComGetObjValue(formObj.loc_cd)+'"&type=WH"', './GateServlet.gsl');
}
function resultLocNm(reqVal) {
	var formObj=document.form;
	
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.loc_nm.value=rtnArr[0];
	   }
	   else{
	    formObj.loc_cd.value="";
	    formObj.loc_nm.value=""; 
	   }
	  }
	  else{
	   formObj.loc_cd.value="";
	   formObj.loc_nm.value=""; 
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
	
	if(formObj.loc_cd.value != ""){
		btn_Search();
	}
}

function loadComboWarehouse(){
	var obj = document.getElementById("wh_combo");
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
