/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ItemGroupPopup.js
*@FileTitle  : Item Group Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var rtnary=new Array(1);
var callBackFunc = "";
/**
* Sheet  onLoad
*/

function doWork(srcName){
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "SEARCHLIST":
			btn_Search();
			break;	
		case "btn_ctrt_no":
			btn_ctrt();
			break;
		case "CLOSE":   
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
	if ( !ComIsEmpty(formObj.in_grp_cd) || !ComIsEmpty(formObj.in_grp_nm) ){
		btn_Search();
	}
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObj=document.form;
//    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
//    axon_event.addListenerForm("keydown", "obj_keydown", formObj);
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
			case "in_grp_cd":
				btn_Search();
				break;
			case "in_grp_nm":
				btn_Search();
				break;
			default:				
				if(!(t.readOnly)){
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
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
 }
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
function initCombo(comboObj, comboNo) {
	var i=0;
    switch(comboObj.options.id) {
		case "abc":
			with(comboObj) {
				comboObj.SetDropHeight(125);
				//comboObj.BackColor = "#CCFFFD";
				InsertItem(i++,  "All",  "ALL");
				InsertItem(i++,  "aaaaaaaaa1", "aaaaaaaaaaa2");
				//Service Provider
				comboObj.SetSelectText("All");
        	}
			break;
	}
} 
function btn_ctrt(){
	var formObj=document.form;
	var sUrl="ContractRoutePopup.clt?ctrt_no="+formObj.in_ctrt_no.value+"&ctrt_nm="+formObj.in_ctrt_nm.value;
//	comOpenPopup(sUrl, 900, 650, "setCtrtNoInfo", "0,0", false);
	
	/*rtnary=new Array(2);
	rtnary[0]="";
	rtnary[1]=formObj.in_ctrt_no.value;*/
    callBackFunc = "setCtrtNoInfo";
    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
	  
}

function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
	  if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	   return;
	  }else{
//		  ComSetObjValue(formObj.ctrt_no,    aryPopupData[0][0]);
//		  ComSetObjValue(formObj.ctrt_nm,    aryPopupData[0][1]);
		  var rtnValAry=aryPopupData.split("|");
		   formObj.in_ctrt_no.value=rtnValAry[0];
		   formObj.in_ctrt_nm.value=rtnValAry[1];
	  }
}	
function searchTlCtrtInfo(){
	var formObj=document.form;
	ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.in_ctrt_no.value, './GateServlet.gsl');
}
function setTlCtrtInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.in_ctrt_nm.value=rtnArr[0];
			}
			else{
				formObj.in_ctrt_no.value="";
				formObj.in_ctrt_nm.value="";	
			}
		}
		else{
			formObj.in_ctrt_no.value="";
			formObj.in_ctrt_nm.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
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
		      var headers = [ { Text:getLabel('ItemGroupPopup_HDR1'), Align:"Center"} ];
		      InitHeaders(headers, info);
		
		      var cols = [ {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
		                   {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"item_grp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"item_grp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:1,   SaveName:"ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 } ];
		       
		      InitColumns(cols);
		//      SetSheetHeight(360);
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
	/*
	if(formObj.htsCd.value == "" && formObj.descr.value.trim().length < 3){
		ComShowCodeMessage("COM0098", "Description" ,"3");
		return;
	}
	*/
	formObj.f_cmd.value=SEARCH;
	//var sXml=docObjects[0].GetSearchData("./ItemGroupPopupGS.clt", FormQueryString(formObj,''));
	//docObjects[0].LoadSearchData(sXml,{Sync:1} );
	docObjects[0].DoSearch("./ItemGroupPopupGS.clt", FormQueryString(formObj));
}
function btn_Close() {
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	//comPopupOK();
	ComClosePopup(getData());
}
function getData(){
	var retArray="";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"item_grp_cd");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"item_grp_nm");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"ctrt_no");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"ctrt_nm");
	return retArray;
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