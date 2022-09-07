/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RateLocPopup.js
*@FileTitle  : Rate Location Search
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/03/05
=========================================================*/

var docObjects=new Array();
var sheetCnt=0;

function doWork(srcName){
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "SEARCHLIST":
			btn_Search();
			break;	
		case "CLOSE":   
			btn_Close();
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

function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
//	initControl();
	if (formObj.c_code_cd.value != "" || formObj.c_code_nm.value != "") {
		btn_Search();
	}
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObj=document.form;
	axon_event.addListenerFormat('keypress', 'obj_keypress', formObj);
	axon_event.addListenerForm("keydown", "obj_keydown", formObj);
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
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
	      SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0, DataRowMerge:0 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('RateLocPopup_HDR1'), Align:"Center"}];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",       Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"Seq" },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"code_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"code_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(300);
	      SetEditable(0);
	      resizeSheet();
	            }
	      break;


	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}
 
function btn_Search() {
	var formObj=document.form;
//	if (validateForm(sheetObjects[0],formObj,'Search')) {
	docObjects[0].RemoveAll();
	formObj.f_cmd.value = SEARCH;
	docObjects[0].DoSearch("./RateLocPopupGS.clt", FormQueryString(formObj, ""));
	//	sheetObjects[0].LoadSearchData(sXml,{Sync:1} );
//	}
}
function btn_Close() {
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	var rtnVal = "";
	rtnVal += sheet1.GetCellValue(Row, "code_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "code_nm");
	ComClosePopup(rtnVal);
	console.log(rtnVal);
	//comPopupOK();

}
/*function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
    if (vKeyCode == 13) {
		switch (srcName) {
			case "c_code_cd":	
				if (!ComIsNull(srcValue)){
					btn_Search();
				}
				break;	
			case "c_code_nm":	
				if (!ComIsNull(srcValue)){
					btn_Search();
				}
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
}*/
/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'Search':
			if(ComGetObjValue(formObj.c_code_tp) != "RGLOC"){
				if (ComIsEmpty(formObj.c_code_cd) && ComIsEmpty(formObj.c_code_nm)) {
					ComShowCodeMessage("COM0107","Code, Code Name");
					formObj.c_code_cd.focus();
					return false;
				}
				if (ComIsEmpty(formObj.c_code_cd) && formObj.c_code_nm.value.length < 3) {
					ComShowCodeMessage("COM0098","Code Name", "3");
					formObj.c_code_nm.focus();
					return false;
				}
			}			
		}
	}
	return true;
}
