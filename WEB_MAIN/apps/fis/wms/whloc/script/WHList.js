/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHList.js
*@FileTitle  : 
*@author     : Khanh.Nguyen
*@version    : 1.0
*@since      : 2015/03/12
=========================================================*/

var sheetCnt = 0;
var docObjects=new Array();
var rtnary=new Array(2);
var firCalFlag=false;
var callBackFunc = "";

function setDocumentObject(sheetObj) {
	docObjects[sheetCnt++] = sheetObj;
}

function loadPage() {

	for ( var i = 0; i < docObjects.length; i++) {
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i]);
		comEndConfigSheet(docObjects[i]);
	}
	
	initControl();
	EnableOrDisable("btn_ESop", false, 1);
	
	doWork('SEARCHLIST');
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
document.onkeydown=obj_keydown;
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
			

			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

		    var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		    var headers = [ { Text:getLabel('WhList_HDR1'), Align:"Center"}];
			
			var prefix="";
			
			var cols = [ {
	             Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:prefix+ "loc_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:220,  Align:"Left",    ColMerge:0,   SaveName:prefix+ "loc_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:prefix+ "sub_loc_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, EditLen:21},
//	            {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:prefix+ "k",     		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//	            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:prefix+ "prov_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//	            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:prefix+ "prov_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//	            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:prefix+ "sub_loc_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:50,  Align:"Center",   ColMerge:0,   SaveName:prefix+ "use_yn",    	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 
//	            {Type:"Text",      Hidden:0,  Width:80,  Align:"Left",     ColMerge:0,   SaveName:prefix+ "cust_edi_id", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 
			}];
			
			InitHeaders(headers, info);
			InitColumns(cols);
			SetColProperty(0 ,prefix+"sub_loc_cd" , {AcceptKeys:"E|[0123456789]|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
			SetEditable(1);
			SetSheetHeight(500);
			}
			break;

		case "sheet2":      //IBSheet2 init
			with(sheetObj){
	        
	      
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WhList_2_HDR1'), Align:"Center"}];
	      
	      var prefix="";
	      
	      var cols = [ {
	            Type:"Text",      Hidden:0,  Width:150,  Align:"Center", ColMerge:0,   SaveName:prefix+ "ctrt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:260,  Align:"Left",  ColMerge:0,   SaveName:prefix+ "ctrt_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:260,  Align:"Center",  ColMerge:0,   SaveName:prefix+ "sales_ofc_cd",KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:200,   Align:"Left", ColMerge:0,   SaveName:prefix+ "sales_pic_id",KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0
			}];
	      
	      InitHeaders(headers, info);
	      InitColumns(cols);
	      SetEditable(1);
	      SetSheetHeight(250);
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
//	if (formObj.wh_cd.value == ""){
//		ComShowCodeMessage("COM12233","");
//		formObj.wh_cd.focus();
//		return false;
//	}
	formObj.f_cmd.value= SEARCH;
	sheet1.DoSearch("./searchWHListGS.clt", FormQueryString(formObj, null, ""));
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
	var paramStr="./WHM_WHM_NEW_0001.clt?wh_cd="+sheetObj.GetCellValue(Row,"loc_cd");
    parent.mkNewFrame('Warehouse Entry', paramStr, "WHM_WHM_NEW_0001_" + sheetObj.GetCellValue(Row,"loc_cd"));

}
function sheet1_OnClick(sheetObj,Row,Col){	
	var loc_cd=sheet1.GetCellValue(Row,"loc_cd"); //key
	var formObj=document.form;
	formObj.f_cmd.value= SEARCH01;
	sheet2.DoSearch("./searchWHContractListGS.clt?loc_cd=" + loc_cd,FormQueryString(formObj, null, ""));
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
		var sUrl="./ESOPMgmt.clt?ctrt_no=" + sheet2.GetCellValue(sheet2.GetSelectRow(), "ctrt_no");
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
function getLocInfo(obj) {
	var formObj=document.form;
	if (obj.value == "") {
		form.wh_cd.value="";
		form.wh_nm.value="";
	} else {
		searchLocInfo(formObj);
	}		
}
function searchLocInfo(obj){
	var formObj=document.form;
	ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+ComGetObjValue(formObj.wh_cd), './GateServlet.gsl');
}
function resultLocInfo(reqVal){
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
//Sales Office 정보를 가져온다.
function getSalesOffice(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.sales_ofc_cd.value="";
		form.sales_ofc_nm.value="";
	}else{
		searchSalesOffice(formObj);
	}
}

function searchSalesOffice(form){
	var formObj=document.form;
	ajaxSendPost(resultSalesOffice, 'reqVal', '&goWhere=aj&bcKey=searchTlOrgInfo&office_cd='+ComGetObjValue(formObj.sales_ofc_cd), './GateServlet.gsl');
//	var sXml=docObjects[0].GetSearchData("searchTlOrgInfo.clt", "office_cd="+sales_ofc_cd);
}
function resultSalesOffice(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.sales_ofc_nm.value=rtnArr[0];
	   }
	   else{
	    formObj.sales_ofc_cd.value="";
	    formObj.sales_ofc_nm.value=""; 
	   }
	  }
	  else{
	   formObj.sales_ofc_cd.value="";
	   formObj.sales_ofc_nm.value=""; 
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    try{
		var formObj=document.form;
        switch(srcName) {
 			case "btn_sales_ofc_cd" :	
 				
 				rtnary=new Array(2);
 				rtnary[0]="1";
 				sUrl="./CMM_POP_0150.clt?";
 				
 				callBackFunc = "setSalesOfcInfo";
 				modal_center_open(sUrl, rtnary, 556,600,"yes");
 				
//			    var sUrl="./CMM_POP_0050.clt?ofc_cd="+formObj.sales_ofc_cd.value;
//			    callBackFunc = "setSalesOfcInfo";
//				modal_center_open(sUrl, callBackFunc, 900,600,"yes");
			break;
 			case "SEARCHLIST" :	
 				btn_Search();
			break;
 			case "NEW" :	
 				var paramStr="./WHM_WHM_NEW_0001.clt?f_cmd=-1";
           		parent.mkNewFrame('Warehouse Entry',paramStr);
			break;
 			case "btn_ESop" :	
 				btn_ESOP();
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
function setOfficeInfoGrid(rtnVal) {
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=sheet1;
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),rtnValAry[0],0);
	}
}

function setSalesOfcInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
	var formObj=document.form;
	var rtnValAry=rtnVal.split("|");
	setFieldValue(formObj.sales_ofc_cd,    rtnValAry[0]);
	setFieldValue(formObj.sales_ofc_nm,    rtnValAry[1]);
}
}

/*
 * Office search
 * OnKeyDown 13 or onChange
 */
function codeNameAction(str, tmp){
	var formObj=document.form;
	if( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+formObj.sales_ofc_cd.value, './GateServlet.gsl');
		}
	}else if( tmp == "onBlur" ) {
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+formObj.sales_ofc_cd.value, './GateServlet.gsl');
	}
}

function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@^@@^@@^');
			if(rtnArr[0] != ""){
				formObj.sales_ofc_nm.value=rtnArr[1];
			}
			else{
				formObj.sales_ofc_cd.value="";
				formObj.sales_ofc_nm.value="";	
			}
		}
		else{
			formObj.sales_ofc_cd.value="";
			formObj.sales_ofc_nm.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}