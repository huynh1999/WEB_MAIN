/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WhDefaultPopup.js
*@FileTitle  : Warehouse default popup
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2016.03.31
=========================================================--*/

var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0;
var opener = window.dialogArguments;
if (!opener) opener=window.opener;
if (!opener) opener = parent;

function doWork(srcName){
	var sheetObject1=docObjects[0];             
	var formObject=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
			case "SEARCHLIST":
				getData();
				break;
			case "BTN_OK":
				btn_ok();
				break;
			case "CLOSE":   
				ComClosePopup();
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
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Load Page
 */
function loadPage() {
	var formObj = document.form;
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
    getData();
}
/**
 * 
 * @param sheetObj
 * @param sheetNo
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with (sheetObj) {
			
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('WhDefaultPopup_HDR1'), Align:"Center"} ];
				InitHeaders(headers, info);
	
				var cols = [ {Type:"CheckBox",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk" },
				             {Type:"Text",      Hidden:0, Width:150,   Align:"Center",  ColMerge:1,   SaveName:"loc_cd", UpdateEdit:0,   InsertEdit:0},
				             {Type:"Text",     Hidden:0,  Width:150,   Align:"Left",  ColMerge:1,   SaveName:"loc_nm", UpdateEdit:0,   InsertEdit:0}
				           ];
				 
				InitColumns(cols);
				SetEditable(1);
				SetSheetHeight(320);
				resizeSheet();

		   }                                                      
		break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

function getData() {
	var formObj=document.form;
	docObjects[0].RemoveAll();
	
	formObj.f_cmd.value = SEARCH;
	
	var param = "?c_desc=" + encodeURIComponent(formObj.wh_nm.value.replace(/[%#]/g, "@good@"));
	
	sheet1.DoSearch("./WhDefaultPopupGS.clt" + param,FormQueryString(formObj));
}
function btn_Close() {
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){

}

function sheet1_OnSearchEnd(sheetObj, row, col){
	var formObj=document.form;
	sheetObj.SetSelectRow(-1);
	if(formObj.wh_cfg.value  != "" || formObj.wh_cfg.value != 'undefined' ){
    	check_data_wh_cfg();
    }
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13 && sheetObj.GetSelectRow() != -1){
		sheet1_OnDblClick(sheetObj, row, col);
	}else{
		return;
	}
}
/**
 * Get Data return main screen
 */
function btn_ok(){
	var sheetObj  =  sheet1;
	returnData(sheetObj, sheetObj.FindCheckedRow("chk",1));
	//}else ComShowCodeMessage("COM12189");
}

function returnData(sheetObj, selectedRows){
	var sheetObj  =  sheet1;
	var arrdt = "";
	var arrSelectedRows = selectedRows.split('|');
	if(arrSelectedRows[0] != ''){
		for(var i = 0; i < arrSelectedRows.length; i++){
			arrdt = arrdt + sheetObj.GetCellValue(arrSelectedRows[i], 'loc_cd') + ",";
		}    
		var strLen = arrdt.length;
		arrdt = arrdt.slice(0,strLen-1);
		opener.clbck_WhDefaultPopup(arrdt);
		ComClosePopup();
	}else{
		ComShowCodeMessage("COM12189");
	}
}
function check_data_wh_cfg(){
	var formObj=document.form;
	var sheetObj =  sheet1;
	var wh_cfg =  formObj.wh_cfg.value;
	var arrwh_cfg = wh_cfg.split(',');
	for(var i = 1; i < sheetObj.LastRow()+ 1; i++){
		for(var j = 0; j < arrwh_cfg.length; j ++){
			if(sheetObj.GetCellValue(i, 'loc_cd') == arrwh_cfg[j]){
				sheetObj.SetCellValue(i,"chk",1,0);
			}
		}
	}    
}