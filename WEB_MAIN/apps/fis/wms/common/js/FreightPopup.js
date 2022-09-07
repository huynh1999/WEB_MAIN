/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : FreightPopup.js
*@FileTitle  : Freight
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;



document.onkeydown=obj_keydown;


function doWork(srcName){
	try {
//		var srcName = ComGetEvent("name");
		//if(ComGetBtnDisable(srcName)) return false;
		switch (srcName) {
		case "SEARCHLIST":
			//ComOpenWait(true);
			doShowProcess(true);
			getData();
			doHideProcess(false);
			//ComOpenWait(false);
			break;
		case "btn_Ok":
			btn_OK();
			break;
		case "CLOSE":
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
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//initControl();
	//setFocus(formObj.c_code);
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObj=document.form;
    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate",  document.form);
    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
    axon_event.addListenerForm  ('keypress', 'enter_Check',  document.form);
    //- 포커스 나갈때
	axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObj);
	axon_event.addListenerForm("keydown", 			"obj_keydown", formObj);
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
				getData();
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
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		      with(sheetObj){
         
         var HeadTitle1="Seq.|Freight Code|Description|||||";

         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel('FreightPopup_HDR1'), Align:"Center"}];
         InitHeaders(headers, info);

         var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq" },
             {Type:"Text",     Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"frt_cd" },
             {Type:"Text",     Hidden:0,  Width:40,   Align:"Left",    ColMerge:1,   SaveName:"frt_engnm" },
             {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"frt_locnm" },
             {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"frt_grp_cd" },
             {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"frt_curr_cls" },
             {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"sell_vat_cd" },
             {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"buy_vat_cd" } ];
          
         InitColumns(cols);
         SetSheetHeight(320);
         SetEditable(0);
                  }
		break;
	}
}
function getData() {
	var formObj=document.form;
	docObjects[0].RemoveAll();
	formObj.f_cmd.value=SEARCH;
	docObjects[0].DoSearch("FreightPopupGS.clt", FormQueryString(formObj,""));
}
function btn_OK() {
	if(sheet1.GetSelectRow() > 0){
		var retArray=new Array();
		//0-9
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "frt_cd");               
		retArray += "|";                                                                                   
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "frt_engnm");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "frt_locnm");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "frt_grp_cd");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "frt_curr_cls");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "sell_vat_cd");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "buy_vat_cd");               
		retArray += "|";
		ComClosePopup(retArray); 
	}
	else ComShowCodeMessage("COM0408");
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	//comPopupOK();
	okFlag="Y";
	var rtnVal = "";
	rtnVal += sheet1.GetCellValue(Row, "frt_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "frt_engnm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "frt_locnm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "frt_grp_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "frt_curr_cls");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "sell_vat_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "buy_vat_cd");
	
	ComClosePopup(rtnVal); 
}
