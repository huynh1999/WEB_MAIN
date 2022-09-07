/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHList.js
*@FileTitle  : 
*@author     : Khanh.Nguyen
*@version    : 1.0
*@since      : 2015/03/12
=========================================================*/

var sheetObjects = new Array();
var sheetCnt = 0;

function setDocumentObject(sheetObj) {
	sheetObjects[sheetCnt++] = sheetObj;
}

function loadPage() {

	for ( var i = 0; i < sheetObjects.length; i++) {
		comConfigSheet(sheetObjects[i]);
		initSheet(sheetObjects[i]);
		comEndConfigSheet(sheetObjects[i]);
	}
	
	initControl();
	EnableOrDisable("btn_ESop", false, 1);
	$("#wh_cd").val($("#def_wh_cd").val());
	$("#wh_nm").val($("#def_wh_nm").val());
}
/*
 * init control
 */
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//	//- 포커스 나갈때
//    axon_event.addListenerForm('blur', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
//    axon_event.addListenerForm("blur", "form_onChange", formObject);
}
/*
 * keydown event
 */
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=event.srcElement.getAttribute("value");
	if (vKeyCode == 13) {
		switch (srcName) {	
			case "sub_loc_cd":
				btn_Search();
			break;
		}
	}
	return true;
}
/*
 * init sheet
 */
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
			with (sheetObj) {
			
			var HeadTitle1 = "Code|Name|City|Office|Service Provider|Service Provider|LOC Name|Use|Customs EDI ID";

			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

		    var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		    var headers = [ { Text:HeadTitle1, Align:"Center"} ];
			
			var prefix="";
			
			var cols = [ {
	            Type:"Text",      Hidden:0,  Width:90,  Align:"Center",    ColMerge:0,   SaveName:prefix+ "loc_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:220,  Align:"Left",  ColMerge:0,   SaveName:prefix+ "loc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:80,  Align:"Center",    ColMerge:0,   SaveName:prefix+ "sub_loc_cd",KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:prefix+ "branch",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:prefix+ "prov_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:prefix+ "prov_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:prefix+ "sub_loc_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:50,  Align:"Center",    ColMerge:0,   SaveName:prefix+ "use_yn",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:80,  Align:"Left",    ColMerge:0,   SaveName:prefix+ "cust_edi_id", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 
			}];
			
			InitHeaders(headers, info);
			InitColumns(cols);
			SetEditable(1);
			SetSheetHeight(320);
			}
			break;

		case "sheet2":      //IBSheet2 init
			with(sheetObj){
	        
	      var HeadTitle1="Contract No|Contract Name|Sales Office|Sales PIC";
	      
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:HeadTitle1, Align:"Center"} ];
	      
	      var prefix="";
	      
	      var cols = [ {
	            Type:"Text",      Hidden:0,  Width:150,  Align:"Center", ColMerge:0,   SaveName:prefix+ "ctrt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:260,  Align:"Left",  ColMerge:0,   SaveName:prefix+ "ctrt_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:260,  Align:"Left",  ColMerge:0,   SaveName:prefix+ "sales_ofc_cd",KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:200,   Align:"Left", ColMerge:0,   SaveName:prefix+ "sales_pic_id",KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0
			}];
	      
	      InitHeaders(headers, info);
	      InitColumns(cols);
	      SetEditable(1);
	      //SetSheetHeight(200);
	      resizeSheet();
		}
		break;
	}
}
function resizeSheet(){
	ComResizeSheet(sheet2);
}
/*
 * Search button onclick
 */
function btn_Search() {
	var formObj=document.form;
	sheet1.DoSearch("searchWHList.do", FormQueryString(formObj, null, ""));
}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	sheet2.RemoveAll();
	sheet1.SetColFontColor("loc_cd","#0000FF");	
	EnableOrDisable("btn_ESop", false, 1);
}

function EnableOrDisable(btn,val,num){
	if(val){
		ComBtnEnable(btn);
	}else{
		ComBtnDisable(btn);
	}
}

function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	
	var loc_cd=sheet1.GetCellValue(Row,"loc_cd"); //key
	var formObj=document.form;
	formObj.f_cmd.value = SEARCH;
	sheet2.DoSearch("./searchWHContractList.clt?loc_cd=" + loc_cd,FormQueryString(formObj, null, ""));
}
/*
 * sheet2 searchend event
 */
function sheet2_OnSearchEnd(){
	if (sheet2.RowCount()== 0)
	{
		EnableOrDisable("btn_ESop", false, 1);
	}
	else
	{
		EnableOrDisable("btn_ESop", true, 1);
	}
}

function goPage(div)
{
	//alert(div);
}



function btn_ESOP(){
	if (sheet2.RowCount()== 0)
	{
		return;
	}else{
		var sUrl="./ESOPMgmt.do?ctrt_no=" + sheet2.GetCellValue(sheet2.GetSelectRow(), "ctrt_no");
		mkNewFrame("E-SOP Management", sUrl, "ESOPMgmt_" + sheet2.GetCellValue(sheet2.GetSelectRow(), "ctrt_no"));
	}
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
		var sXml=sheetObjects[0].GetSearchData("searchTlLocInfo.do", "loc_cd="+obj.value);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
			}
		resultLocInfo(sXml,obj.name);
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
		}else{
			formObj.wh_cd.value="";
			formObj.wh_nm.value="";
		}
	}
}
function searchSalesOffice(form, sales_ofc_cd, col_nm){
	var sXml=sheetObjects[0].GetSearchData("searchTlOrgInfo.do", "office_cd="+sales_ofc_cd);
	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
	resultSalesOfficeInfo(sXml);
}
function resultSalesOfficeInfo(resultXml){
	var formObj=document.form;
	if(getXmlDataNullToNullString(resultXml,'office_nm') != ""){
		formObj.sales_ofc_nm.value=getXmlDataNullToNullString(resultXml,'office_nm');
	}else{
		form.sales_ofc_cd.value="";
		form.sales_ofc_nm.value="";
	}
}
document.onclick=processButtonClick;
function processButtonClick(){
	var formObj=document.form;
	try {
		var srcName=ComGetEvent("name");		
		switch(srcName) {
 			case "btn_wh_cd":
					var sUrl="LocationPopup.do?loc_nm="+formObj.wh_nm.value+"&type=WH_ONLY";
					ComOpenPopup(sUrl, 900, 665, "setRcvLocInfo", "0,0", true);	
				break;
 			case "btn_sales_ofc_cd" :	
 				var sUrl="BranchPopup.do?ofc_cd="+formObj.sales_ofc_cd.value;
				ComOpenPopup(sUrl, 900, 435, "setSalesOfcInfo", "0,0", true);
			break;
			
 			case "btn_search" :	
 				btn_Search();
			break;
			
 			case "btn_ESop" :	
 				btn_ESOP();
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
 * NAME 엔터시 팝업호출 - warehouse name
 */
function locationPopup(){
	var formObj=document.form;
	var sUrl="LocationPopup.do?loc_nm="+formObj.wh_nm.value+"&type=WH_ONLY";
	ComOpenPopup(sUrl, 900, 650, "setRcvLocInfo", "0,0", true);	
}
//Sales Office 정보를 가져온다.
function getSalesOffice(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.sales_ofc_cd.value="";
		form.sales_ofc_nm.value="";
	}else{
		searchSalesOffice(formObj, ComGetObjValue(formObj.sales_ofc_cd), "sales_ofc_cd");
	}
}
//팝업리턴
function setRcvLocInfo(aryPopupData){
	var formObj=document.form;
	if(aryPopupData[0][1] == "-1"){
		aryPopupData[0][1] = "";
	}
	if(aryPopupData[0][2] == "-1"){
		aryPopupData[0][2] = "";
	}
	ComSetObjValue(formObj.wh_cd,    aryPopupData[0][1]);
	ComSetObjValue(formObj.wh_nm,    aryPopupData[0][2]);
}
function setSalesOfcInfo(aryPopupData){
	var formObj=document.form;
	ComSetObjValue(formObj.sales_ofc_cd,    aryPopupData[0][0]);
	ComSetObjValue(formObj.sales_ofc_nm,    aryPopupData[0][1]);
}
