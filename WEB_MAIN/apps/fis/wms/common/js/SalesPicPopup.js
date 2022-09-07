/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SalesPicPopup.js
*@FileTitle  : SalesPicPopup
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================*/
//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
/**
* Sheet  onLoad
*/
document.keydown=obj_keydown;
function doWork(srcName, valObj){
	try {
		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "btn_search":
			sheet1.RemoveAll();
			btn_Search();
			break;	
		case "btn_ok":
			btn_Ok();
			break;
		case "btn_close":   
			btn_Close();
			break;
		} // end switch
	}catch(e) {
		if( e == "[object Error]") {
			ComShowMessage(OBJECT_ERROR);
		} else {
			alert(e);
		}
	}
}
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	initControl();
	loading_flag="Y";

	if(!ComIsEmpty(formObj.picCd)||!ComIsEmpty(formObj.picNm)){
		btn_Search();
	}
}
function obj_keydown(){
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=event.srcElement.getAttribute("value");
    if (vKeyCode == 13) {
		switch (srcName) {
			default:				
				btn_Search();
				break;
		}
	}
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == "readonly"){
        	return false;
        } 
    } 
    return true;
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
	}
/** 
 * initControl()
 */ 
function initControl() {
	var formObj=document.form;
	var arg = parent.rtnary;
	var formObj=document.form;
	
	//formObj.pic_cd.value = arg[0];

//	formObj.org_cd.value = arg[1];
	
//	formObj.pic_nm.value = arg[1];
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
//    // OnKeyUp 이벤트
//    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
//  //- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
            with(sheetObj){
			      var prefix="Grd01";
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3, DataRowMerge:1 } );
			
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				  var headers = [ { Text:getLabel('SalesPicPopup_HDR1'), Align:"Center"} ];		                      
			      InitHeaders(headers, info);
			
			      var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
							 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"picCd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
							 {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"picNm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
							 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"phone",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
							 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"fax",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
							 {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:prefix+"address",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
							 {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"email",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
							 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"orgCd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
							 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"orgNm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
							 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"sales_act_no", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
							 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"act_ver",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
							 {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
							       
			      InitColumns(cols);
			
			      SetEditable(0);
			      SetSheetHeight(400);

		   }                                                      
		break;
	}
}
function btn_Search() {
	var formObj=document.form;
	if(formObj.org_cd.value == "" && formObj.picCd.value == "" && formObj.picNm.value.trim().length < 3){
		ComShowMessage("(Minimum digits for search with [Sales PIC Name] are 3 or more) or ([Sales Branch], [Sales PIC ID]).");
		return;
	}
	//alert("call searchContainerTPSZList");
	formObj.f_cmd.value=SEARCH01;
	
 	docObjects[0].DoSearch("./searchSalesPICListGS.clt", FormQueryString(formObj,""));
}
function btn_Close() {
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	var formObj=document.form;
	if(formObj.chg_flg.value == "Y"){
		if(ComShowCodeConfirm("COM0248")){		
			var prefix="Grd01";
			sheetObj.SetCellValue(Row, prefix+"sales_act_no",formObj.sales_act_no.value);
			sheetObj.SetCellValue(Row, prefix+"act_ver",formObj.act_ver.value);
			sheetObj.SetCellValue(Row, prefix+"ibflag","U");
			formObj.f_cmd.value=ADD;
			var sParam=FormQueryString(formObj, "Grd00");	
			sParam += "&" + ComGetSaveString(docObjects[0], true, true);
 			var saveXml=docObjects[0].GetSaveData("./changeSalesActivity.clt", sParam);
			//1. Save 후 조회
			if( saveXml.indexOf('<ERROR>') == -1){
				ComShowCodeMessage("COM0093", "");
				comPopupOK();
			}
		}
	}else{
		if(sheetObj.GetCellValue(Row, "ibflag1") == "I"){
			return;
		}
		var formObj=document.form;
		var rtnVal="";	
		rtnVal += sheetObj.GetCellValue(Row, "Grd01picCd");
		rtnVal += "|";
		rtnVal += sheetObj.GetCellValue(Row, "Grd01picNm");
		ComClosePopup(rtnVal);
		
//		comPopupOK();
	}
}
function btn_Ok(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var selRow=sheetObj.GetSelectRow();
	if(ComShowCodeConfirm("COM0248")){		
		var prefix="Grd01";
		sheetObj.SetCellValue(selRow, prefix+"sales_act_no",formObj.sales_act_no.value);
		sheetObj.SetCellValue(selRow, prefix+"act_ver",formObj.act_ver.value);
		sheetObj.SetCellValue(selRow, prefix+"ibflag","U");
		var sParam=FormQueryString(formObj, "Grd00");	
		sParam += "&" + ComGetSaveString(docObjects[0], true, true);
		var saveXml=docObjects[0].GetSaveData("./changeSalesActivity.clt", sParam);
		//1. Save 후 조회
		if( saveXml.indexOf('<ERROR>') == -1){
			ComShowCodeMessage("COM0093", "");
			comPopupOK();
		}
	}
}
