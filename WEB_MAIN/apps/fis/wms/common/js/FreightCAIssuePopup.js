//--------------------------------------------------------------------------------------------------------------
//<%--=========================================================
//*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
//*@FileName   : FreightCAIssuePopup.jsp
//*@FileTitle  : C/A Issue
//*@author     : Phuoc.Le - DOU Network
//*@version    : 1.0
//*@since      : 2015/03/19
//=========================================================--%>
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var rtnary=new Array(2);
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var opener = window.dialogArguments;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
/**
* Sheet  onLoad
*/
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
//	for(var c=0; c<comboObjects.length; c++){
//		initCombo(comboObjects[c], c+1);
//    }
	initControl();
	var formObj=document.form;
	/*if(formObj.in_ca_status_nm.value == "Hold" && formObj.in_ca_no.value != ""){
		formObj.ca_no.value=formObj.in_ca_no.value;
	}else{
		formObj.ca_no.value="C/A New";
	}*/
	btn_Search();
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
//function setComboObject(combo_obj){
//	comboObjects[comboCnt++]=combo_obj;
//}
/** 
 * initControl()
 */ 
document.onkeydown=obj_keydown;
document.onchange=form_onChange;
function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("change", "form_onChange", formObject);
//    // OnKeyUp 이벤트
//    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
//  //- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	var backspace=8; 
    var t=document.activeElement;
	if (vKeyCode == 13) {
		switch (srcName) {
			case "wo_no":
				if (!isNull(formObj.wo_no)){
					btn_Search();
				}
			case "so_no":
				if (!isNull(formObj.so_no)){
					btn_Search();
				}
			case "fcr_no":
				if (!isNull(formObj.fcr_no)){
					btn_Search();
				}	
			case "hbl_no":
				if (!isNull(formObj.hbl_no)){
					btn_Search();
				}	
			case "mbl_no":
				if (!isNull(formObj.mbl_no)){
					btn_Search();
				}	
			default:				
				form_onChange();
				break;
		}
	}
	if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && (t.getAttribute("readonly") == "readonly" || t.getAttribute("readonly") == true)){
        	return false;
        } 
    } 
	return true;
}
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	var parm="";
	switch (srcName) {
		case "sprov_cd":	
					var sXml=docObjects[0].GetSearchData("searchTlCustInfo.clt?cust_cd="+formObj.sprov_cd.value+"&in_part_tp=S");
					if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
						alert(getXmlDataNullToNullString(sXml,'exception_msg'));
					}
					form.sprov_cd.value=getXmlDataNullToNullString(sXml,'cust_cd');
					form.sprov_nm.value=getXmlDataNullToNullString(sXml,'cust_loc_nm');
			break;	
		case "wo_cust_cd":	
					var sXml=docObjects[0].GetSearchData("searchTlCustInfo.clt?cust_cd="+formObj.wo_cust_cd.value+"&in_part_tp=S");
					if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
						alert(getXmlDataNullToNullString(sXml,'exception_msg'));
					}
					form.wo_cust_cd.value=getXmlDataNullToNullString(sXml,'cust_cd');
					form.wo_cust_nm.value=getXmlDataNullToNullString(sXml,'cust_loc_nm');
			break;				
	}
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */

function setSprovInfo(aryPopupData){
	var formObj=document.form;
	formObj.sprov_cd.value = aryPopupData[0][1];
	formObj.sprov_nm.value = aryPopupData[0][2];	
}
function setWoCustInfo(aryPopupData){
	var formObj=document.form;
	formObj.wo_cust_cd.value = aryPopupData[0][1];
	formObj.wo_cust_nm.value = aryPopupData[0][2];	
}
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
//function initCombo(comboObj, comboNo) {
//	var vTextSplit=null;
//	var vCodeSplit=null;
//	switch(comboObj.options.id) {	
//		case "ca_reason":
//			vTextSplit=CA_REASON_NM.split("|");
//			vCodeSplit=CA_REASON_CD.split("|");				
//			with(comboObj) {
//				comboObj.SetDropHeight(125);
//				InsertItem(0,  "", "");
//				for(var j=0;j<vCodeSplit.length; j++){
//					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
//				}
//				comboObj.index=0;
//	    	}
//			break;
//			/*comboObjects[0].RemoveAll();
//			comboObjects[0].InsertItem(0,  "ALL", "ALL");
//			if (formObj.ca_reason_cd.value != ""){
//				var vTextSplit=formObj.ca_reason_nm.value.split("|");
//				var vCodeSplit=formObj.ca_reason_cd.value.split("|");				
//			    comboObjects[0].SetDropHeight(200);
//				for(var j=0;j<vCodeSplit.length; j++){
//					comboObjects[0].InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
//				}
//			}
//			comboObjects[0].SetSelectCode("",false);*/
//	}
//} 
function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
	formObj.ctrt_no.value=aryPopupData[0][0];
	formObj.ctrt_nm.value = aryPopupData[0][1];	
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
				  var headers = [ { Text:getLabel('FreightCAIssuePopup_HDR1'), Align:"Center"} ];				      InitHeaders(headers, info);
			      var cols = [ {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"ca_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
					 {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ca_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
					 {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"ca_status_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
					 {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ca_reason_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
					 {Type:"Text",      Hidden:0,  Width:500,  Align:"Left",    ColMerge:1,   SaveName:"rmk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 } ];
			       
			      InitColumns(cols);
			      SetSheetHeight(400);
			
			      SetEditable(0);
            }
	      break;	
	}
}
function btn_Search() {
	var formObj=document.form;
	formObj.f_cmd.value=SEARCH;
	docObjects[0].DoSearch("./searchFreightCAIssuePopupListGS.clt", FormQueryString(formObj, null, ""));
}
function btn_Close() {
	var openerformObj=opener.document.form;
	openerformObj.ca_popup_yn.value="N";
	ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	rtnData();
}
function rtnData() {
	var rtnVal="";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "ca_no");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "ca_seq");	
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "ca_status_nm");	
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "ca_reason_nm");	
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "rmk");	
	return rtnVal;
}
function btn_Save(){
	var formObj=document.form;
	var openerformObj=opener.document.form;
	var row="";
	if(formObj.rtn_ca_reason_combo.value == ""){
		ComShowCodeMessage("COM0082", "C/A Reason code");
		return;
	}
	if(formObj.rtn_ca_reason_combo.value== "03" || formObj.rtn_ca_reason_combo.value== "04" || formObj.rtn_ca_reason_combo.value== "05"){
		if(formObj.rmk.value == ""){
			ComShowCodeMessage("COM0082", "C/A Remark");
			return;
		}
		if(formObj.rmk.value.length <10 ){
            alert("C/A Remark Info is Alphabet 10 letter more");
            return;    
		}
	}
	openerformObj.rmk.value=formObj.rmk.value;
	openerformObj.ca_reason_code.value=formObj.rtn_ca_reason_combo.value;
	openerformObj.ca_popup_yn.value="Y";
	formObj.ok_flag.value="Y";
	ComClosePopup(); 
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {
	var rowcnt=sheetObj.RowCount();
	/*for ( var i=1; i <= rowcnt + 1 ; i++){
//parameter changed[check again]CLT 		sheetObj.SetCellFontColor(i,0,"#0000FF");
		//sheetObj.CellFont("FontBold", i, 0) = true;
//parameter changed[check again]CLT 		sheetObj.SetCellFontColor(i,1,"#0000FF");
		//sheetObj.CellFont("FontBold", i, 1) = true;
//parameter changed[check again]CLT 		sheetObj.SetCellFontColor(i,2,"#0000FF");
		//sheetObj.CellFont("FontBold", i, 2) = true;
	}*/
}
function rmk_len_chk(){
	var formObj=document.form;
	if(formObj.rmk.value.length > 300){
		ComShowCodeMessage("COM0215", "300");
		formObj.rmk.value=formObj.rmk.value.substring(0,300);
	}
}
function exit() {
	var formObj=document.form;
	var openerformObj=opener.document.form;
    if(formObj.ok_flag.value != "Y"){
    	openerformObj.ca_popup_yn.value="N";
    	openerformObj.rmk.value="";
    }
}
