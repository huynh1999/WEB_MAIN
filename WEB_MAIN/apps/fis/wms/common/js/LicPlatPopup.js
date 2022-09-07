/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : LicPlatPopup.js
*@FileTitle  : LicPlatPopup 
*@author     : CLT
*@version    : 1.0
*@since      : 2016/11/17
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var rtnary=new Array(2);
var callBackFunc = "";
function doWork(srcName){
//	var sheetObject1 = sheetObjects[0];
	var formObj = document.form;
	try {
//		var srcName = ComGetEvent("name");
		switch (srcName) {
		case "SEARCHLIST":
			getData();
			break;
		case "CLOSE":
			ComClosePopup();
			break;
		case "btn_loc_cd":
			if(ComIsEmpty(formObj.c_wh_cd)){
 				ComShowCodeMessage("COM0493");
 				return;
 			}
			var sUrl="WarehouseLocPopup.clt?f_loc_cd="+ComGetObjValue(formObj.c_wh_cd);
			callBackFunc = "setLocInfo";
			modal_center_open(sUrl, callBackFunc, 650, 480,"yes");
			break;
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

function setLocInfo(rtnVal){
	var formObj = document.form;
	var sheetObj=docObjects[0];
     if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		setFieldValue(formObj.loc_cd, rtnValAry[0]);
		setFieldValue(formObj.loc_nm, rtnValAry[1]);
	}        
    
}

function locPopup(){
	if(ComIsEmpty(formObj.c_wh_cd)){
			ComShowCodeMessage("COM0493");
			return;
		}
	var sUrl="WarehouseLocPopup.clt?f_loc_cd="+ComGetObjValue(formObj.c_wh_cd)+"&f_wh_loc_nm="+ComGetObjValue(formObj.loc_nm);
	callBackFunc = "setPutawayLocInfo";
	modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
}

var temp = '';
function getInboundLocInfo(div){	
	var formObj=document.form;
	temp = div;
	if($("#loc_nm").val() == "")
	{
		$("#loc_cd").val("");
		return;
	}
	if(ComIsEmpty(formObj.c_wh_cd)){
		ComShowCodeMessage("COM0493");
		return;
	}
	var sParam="f_loc_cd=" + $("#c_wh_cd").val() + "&f_wh_loc_nm=" + $("#loc_nm").val() + "&f_putaway_flg=Y" + "&f_cmd=" + COMMAND01;
	ajaxSendPost(resultPutawayLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
}
function resultPutawayLocInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
	    	if(rtnArr[0] != ""){
	    		formObj.loc_nm.value=rtnArr[1];
	    		formObj.loc_cd.value=rtnArr[0];
	    	}
	    	else{
	    		formObj.loc_nm.value="";
	    		formObj.loc_cd.value=""; 
	    		formObj.loc_nm.focus();
	    	}
		}
		else{
			formObj.loc_nm.value="";
    		formObj.loc_cd.value=""; 
    		formObj.loc_nm.focus();
		}
	}
	else{
		formObj.loc_nm.value="";
	 	formObj.loc_cd.value=""; 
	 	formObj.loc_nm.focus();
	 }
}

function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
	}

function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
    initControl();
    getData();
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("change", "form_onChange", formObject);
    // OnKeyUp 이벤트
    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
  //- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		      with(sheetObj){
			 var H1 ="Seq.|Code|Description";
		         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		        
		
		         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		         var headers = [ { Text:H1, Align:"Center"} ];		
		         InitHeaders(headers, info);
		
		         var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq" },
		             {Type:"Text",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"lic_plat_ut_cd" },
		             {Type:"Text",     Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"lic_plat_desc" },
		             ];
		          
		         InitColumns(cols);
		         SetSheetHeight(320);
		         SetEditable(0);
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
	if ($('#c_ctrt_no').val() == "") {
		ComShowCodeMessage("COM0029");
		return;
	}		
	
	docObjects[0].RemoveAll();
	formObj.f_cmd.value = SEARCH;
	docObjects[0].DoSearch("./LicensePlatePopupGS.clt",FormQueryString(formObj, "") );
}
function btn_Close() {
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	var rtnVal = "";
	rtnVal += sheet1.GetCellValue(Row, "lic_plat_ut_cd");  //0                        
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "lic_plat_desc");       //1                                        
    ComClosePopup(rtnVal);
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