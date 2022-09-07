/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHLocBlockPopup.js
*@FileTitle  : Location Zone Block
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
/**
* IBSheet Object
*/
function doWork(srcName){
	try {
//		var srcName = ComGetEvent("name");
		//if(ComGetBtnDisable(srcName)) return false;
		//if (document.getElementById(srcName).disabled)
		switch (srcName) {
		case "SEARCHLIST":
			if (document.getElementById('btn_retrieve').disabled)return false;
			btn_Search();
			break;
		case "CLOSE":
			if (document.getElementById('btn_Close').disabled)return false;
			ComClosePopup();
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
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
* Sheet  onLoad
*/
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//initControl();
	btn_Search();
}
/** 
 * initControl()
 */ 
document.onkeydown=obj_keydown;
function initControl() {
	var formObj=document.form;
    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
    axon_event.addListenerForm("keydown", "obj_keydown", formObj);
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
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
            with(sheetObj){
          
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('WHLocBlockPopup_HDR1'), Align:"Center"} ];
		      InitHeaders(headers, info);

		      var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
		                   {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"block_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:10 },
		                   {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:"block_desc",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 } ];
       
		      InitColumns(cols);
		      SetSheetHeight(350);
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
	formObj.f_cmd.value=SEARCH;
	docObjects[0].DoSearch("./WHLocBlockPopupGS.clt", FormQueryString(formObj,''));
}
function btn_Close() {
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	//comPopupOK();
	returnData(sheetObj, Row);
}
function returnData(sheetObj, Row){
	var retArray="";
	//var cnt=docObjects[4].DataInsert(-1);
	var formObj=document.form;
	retArray += sheetObj.GetCellValue(Row,"seq"); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row,"block_cd"); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row,"block_desc"); 
	retArray += "|";
	ComClosePopup(retArray);	
}
