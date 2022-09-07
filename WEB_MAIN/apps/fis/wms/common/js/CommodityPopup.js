/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CommodityPopup.js
*@FileTitle  : HTS Code(Item/Commodity) Info Popup
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/06/10
=========================================================*/
var docObjects=new Array();
var rtnary=new Array(2);
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var opener=window.dialogArguments;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "CLOSE":	
				btn_Close();
				break;
			case "SEARCHLIST":	
				btn_Search();
				break;
			case "btn_Excel":	
				btn_Excel();
				break;
			case "ADD":	
				btn_Add();
				break;
			case "btn_Replace":	
				btn_Apply();
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
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
	//Sheet초기화
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
    //콤보박스값 조회
//    getTdFdGrpCdInfo();
    //Init Control
	initControl();
	//자동검색
	if ( !ComIsEmpty(formObj.hts_cd) || !ComIsEmpty(formObj.hts_desc_eng) ){
		btn_Search();
	}
	//Multi체크가능 여부 셋팅
	if(formObj.multi_yn.value == ""){
		docObjects[0].SetColHidden("chk",1);
	}else{
		btnApplyShow.style.display="inline";
	}
}
/*
 * Two digit Group, Four digit Group, Two digit Group(Local), Four digit Group(Local) 콤보셋팅값을 조회후 
 * 각 콤보박스에 바인딩한다.
 */
function getTdFdGrpCdInfo()
{
	var formObj = document.form;
	var sXml=docObjects[0].GetSearchData("searchTdFdGrpCdInfo.clt?use_yn="+use_yn.GetSelectCode() + "&ofc_cd=" + formObj.ofc_cd.value);
	var code;
	var name;
	if(getXmlDataNullToNullString(sXml,'td_grp_cd') != ""){
		code=getXmlDataNullToNullString(sXml,'td_grp_cd');
		name=getXmlDataNullToNullString(sXml,'td_grp_nm');					
		addComboValue(td_grp_cd, code, name);
	}
	if(getXmlDataNullToNullString(sXml,'fd_grp_cd') != ""){
		code=getXmlDataNullToNullString(sXml,'fd_grp_cd');
		name=getXmlDataNullToNullString(sXml,'fd_grp_nm');					
		addComboValue(fd_grp_cd, code, name);
	}
	if(getXmlDataNullToNullString(sXml,'td_grp_cd_loc') != ""){
		code=getXmlDataNullToNullString(sXml,'td_grp_cd_loc');
		name=getXmlDataNullToNullString(sXml,'td_grp_nm_loc');					
		addComboValue(td_grp_cd_loc, code, name);
	}
	if(getXmlDataNullToNullString(sXml,'fd_grp_cd_loc') != ""){
		code=getXmlDataNullToNullString(sXml,'fd_grp_cd_loc');
		name=getXmlDataNullToNullString(sXml,'fd_grp_nm_loc');					
		addComboValue(fd_grp_cd_loc, code, name);
	}
}
function addComboValue(comboObj, code, name)
{
	var vTextSplit=name.split("|");
	var vCodeSplit=code.split("|");
	for(var j=0;j<vCodeSplit.length; j++){
		comboObj.InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
	}
	comboObj.SetSelectIndex(0);
}
/** 
 * initControl()
 */ 
document.onkeydown=obj_keydown;
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
	      var headers = [ { Text:getLabel('CommodityPopup_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);
	
	      var cols = [ {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"chk",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
			 {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"td_grp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
			 {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:"td_grp_desc_eng",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
			 {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:"td_grp_desc_loc",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
			 {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"fd_grp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
			 {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:"fd_grp_desc_eng",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
			 {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:"fd_grp_desc_loc",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
			 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"hts_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
			 {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:"hts_desc_eng",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
			 {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"use_yn",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
			 {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"hts_desc_loc",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
			 {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"branch",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
			 {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"branch_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 } ];
       
	      InitColumns(cols);
	      SetSheetHeight(200);
	      SetEditable(1);
                        }
      break;


	}
}
function btn_Search() {
	var formObj=document.form;
	formObj.f_cmd.value=SEARCH;
 	docObjects[0].DoSearch("./searchHTSListGS.clt", FormQueryString(formObj,''));
	$("#dis_hts_cd").val("");
	$("#dis_td_grp_desc_eng").val("");
	$("#dis_hts_desc_eng").val("");
	$("#dis_fd_grp_desc_eng").val("");
	$("#dis_branch").val("");
	$("#dis_branch_nm").val("");
	$("#dis_td_grp_desc_loc").val("");
	$("#dis_hts_desc_loc").val("");
	$("#dis_fd_grp_desc_loc").val("");
	$("#dis_use_yn").val("");
}
function btn_Close() {
	ComClosePopup();
}
function btn_Apply() {
	var formObj=document.form;
	var openerformObj=opener.document.form;
	var sheetObj=docObjects[0];
	var rtn_descr="";
	var cnt=0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.cellValue(i, "chk") == "1"){
			if(cnt==0){
				rtn_descr=sheetObj.GetCellValue(i,"hts_desc_eng");
			}else{
				rtn_descr=rtn_descr + " | " + sheetObj.GetCellValue(i,"hts_desc_eng");
			}
			cnt++;
			if(cnt > 20){
				alert("You can select up to 20 row.");
				return;
			}
		}
	}
	openerformObj.rtn_commodity_desc.value=rtn_descr;
	openerformObj.rtn_type.value="R";
	//window.close();
	//alert(rtn_descr);
	comPopupOK();
}
function btn_Add() {
	var formObj=document.form;
	var openerformObj=opener.document.form;
	var sheetObj=docObjects[0];
	var rtn_descr="";
	var cnt=parseFloat(formObj.cnt.value);
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.cellValue(i, "chk") == "1"){
			if(cnt==0){
				rtn_descr=sheetObj.GetCellValue(i,"hts_desc_eng");
			}else{
				rtn_descr=rtn_descr + " | " + sheetObj.GetCellValue(i,"hts_desc_eng");
			}
			cnt++;
			if(cnt > 20){
				alert("You can select up to 20 row.");
				return;
			}
		}
	}
	openerformObj.rtn_commodity_desc.value=rtn_descr;
	openerformObj.rtn_type.value="A";
	//window.close();
	//alert(rtn_descr);
	comPopupOK();
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	var formObj=document.form;
	var openerformObj=opener.document.form;
	var sheetObj=docObjects[0];
	if(formObj.multi_yn.value == "Y"){
		openerformObj.rtn_commodity_desc.value=sheetObj.cellValue(Row, "hts_desc_eng");
	}
	rtnData();
	comPopupOK();
}
function btn_Excel() {
	var prefix = "";
	if(docObjects[0].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
     	return;
    }else{
    	docObjects[0].Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
    }
}
function sheet1_OnClick(sheetObj, Row, Col) {
	$("#dis_hts_cd").val(sheetObj.GetCellValue(Row, "hts_cd"));
	$("#dis_td_grp_desc_eng").val(sheetObj.GetCellValue(Row, "td_grp_desc_eng"));
	$("#dis_hts_desc_eng").val(sheetObj.GetCellValue(Row, "hts_desc_eng"));
	$("#dis_fd_grp_desc_eng").val(sheetObj.GetCellValue(Row, "fd_grp_desc_eng"));
	$("#dis_branch").val(sheetObj.GetCellValue(Row, "branch"));
	$("#dis_branch_nm").val(sheetObj.GetCellValue(Row, "branch_nm"));
	$("#dis_td_grp_desc_loc").val(sheetObj.GetCellValue(Row, "td_grp_desc_loc"));
	$("#dis_hts_desc_loc").val(sheetObj.GetCellValue(Row, "hts_desc_loc"));
	$("#dis_fd_grp_desc_loc").val(sheetObj.GetCellValue(Row, "fd_grp_desc_loc"));
	$("#dis_use_yn").val(sheetObj.GetCellValue(Row, "use_yn"));
}

function rtnData(){
	 var rtnVal="";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "td_grp_cd");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "td_grp_desc_eng");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "td_grp_desc_loc");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "fd_grp_cd");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "fd_grp_desc_eng");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "fd_grp_desc_loc");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "hts_cd");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "hts_desc_eng");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "use_yn");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "hts_desc_loc");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "branch");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "branch_nm");
	 ComClosePopup(rtnVal);
}
