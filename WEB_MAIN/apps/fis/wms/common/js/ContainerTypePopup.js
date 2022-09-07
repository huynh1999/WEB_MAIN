/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ContainerTypePopup.js
*@FileTitle  : Program Management 
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/03/12
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	initControl();
//	if(formObj.type.value == ""){
//		formObj.f_type[1].disabled=true;
//	}else 
	if(formObj.type.value == "A"){
		formObj.f_type[0].checked=true;
	}else if(formObj.type.value == "C"){
		formObj.f_type[0].checked=true;
	}else if(formObj.type.value == "T"){
		formObj.f_type[1].checked=true;
	}
	formObj.eqUnit.focus();
	if(formObj.eqUnit.value != ""){
		btn_Search();
	}
}
/*document.keydown=obj_keydown;*/
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");	
		switch(srcName) {
			case "SEARCHLIST":
				sheet1.RemoveAll();
				btn_Search();
				break;
			case "btn_OK":	
				btn_OK();
				break;
			case "CLOSE":	
				btn_Close();
				break;
				
      } 
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}
/*document.onkeydown=obj_keydown;*/
function initControl() {
	var formObj=document.form;
//    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
//    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate",  document.form);
//    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
//    axon_event.addListenerForm  ('keypress', 'enter_Check',  document.form);
//    //- 포커스 나갈때
//	axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObj);
//	axon_event.addListenerForm("keydown", 			"obj_keydown", formObj);
}
function obj_keydown(){
    /*var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
    if (vKeyCode == 13) {
		switch (srcName) {
			default:				
				//btn_Search();
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
    return true;*/
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
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			    var headers = [ { Text:getLabel('ContainerTypePopup_HDR1'), Align:"Center"}];
		      InitHeaders(headers, info);
		
		      var cols = [ {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
				 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"eqUnit",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"descr",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"type",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"total",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 } ];
		       
		      InitColumns(cols);
		      SetSheetHeight(400);
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
	formObj.f_cmd.value = SEARCH01;
 	var params = "f_cmd="+ SEARCH01 + "&f_type=" + formObj.f_type.value + "&eqUnit=" + formObj.eqUnit.value.toUpperCase()+ "&descr=" + formObj.descr.value;
    sheet1.DoSearch("./searchContainerTPSZListGS.clt" , FormQueryString(formObj, ""), 0);
    sheet1.SetSelectRow(-1);
}
function btn_OK(){
	if(sheet1.RowCount() > 0){
		ComClosePopup(getData());
	}else{
		ComShowCodeMessage("COM12189");
	}
}
function btn_Close() {
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	ComClosePopup(getData());
}

function getData(){
	var retArray="";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"eqUnit");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"descr");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"type");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"total");
	return retArray;
}

function sheet1_OnSearchEnd(sheetObj, row, col){
	var formObj=document.form;
	sheetObj.SetSelectRow(-1);
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13 && sheetObj.GetSelectRow() != -1){
		sheet1_OnDblClick(sheetObj, row, col);
	}else{
		return;
	}
}