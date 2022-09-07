//--------------------------------------------------------------------------------------------------------------
/*=========================================================
*Copyright(c) 2015 CyberLogitec. All Rights Reserved.
*@FileName   : TransloadingAddPopUp.js
*@FileTitle  : Transloading Order Creation
*@author     : TinLuong - DOU Network
*@version    : 1.0
*@since      : 2015/06/25
=========================================================*/
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
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
	var formObj=document.form;
	var openerSheetObj;
	if(formObj.mode.value == "CRT"){
		openerSheetObj=opener.docObjects[4];
	}else if(formObj.mode.value == "DSP"){
		openerSheetObj=opener.docObjects[2];
	}
	var openerformObj=opener.document.form;
	var sheetObj=docObjects[0];
	var openerprefix1="Grd05";
	var prefix="Grd01";
	if(openerSheetObj.RowCount()> 0){
		for(var i=openerSheetObj.HeaderRows(); i<=openerSheetObj.LastRow(); i++) {
			row=sheetObj.DataInsert(-1);
			sheetObj.SetCellValue(row,prefix+"frt_cd",openerSheetObj.GetCellValue(i,openerprefix1+"frt_cd"),0);
			sheetObj.SetCellValue(row,prefix+"frt_nm",openerSheetObj.GetCellValue(i,openerprefix1+"frt_nm"),0);
			sheetObj.SetCellValue(row,prefix+"unit_cd",openerSheetObj.GetCellValue(i,openerprefix1+"unit_cd"),0);
			sheetObj.SetCellValue(row,prefix+"unit_qty",openerSheetObj.GetCellValue(i,openerprefix1+"unit_qty"),0);
			sheetObj.SetCellValue(row,prefix+"unit_price",openerSheetObj.GetCellValue(i,openerprefix1+"unit_price"),0);
			sheetObj.SetCellValue(row,prefix+"amt",openerSheetObj.GetCellValue(i,openerprefix1+"amt"),0);
			sheetObj.SetCellValue(row,prefix+"tro_no",openerSheetObj.GetCellValue(i,openerprefix1+"tro_no"),0);
			sheetObj.SetCellValue(row,prefix+"tro_seq",openerSheetObj.GetCellValue(i,openerprefix1+"tro_seq"),0);
			sheetObj.SetCellValue(row,prefix+"sb_clss_cd",openerSheetObj.GetCellValue(i,openerprefix1+"sb_clss_cd"),0);
			sheetObj.SetCellValue(row,prefix+"tro_add_frt_seq",openerSheetObj.GetCellValue(i,openerprefix1+"tro_add_frt_seq"),0);
		}
	}
	//doSearch();
}
function doSearch(){
	var formObj=document.form;
 	docObjects[0].DoSearch("searchESOPHSTList.clt?ctrt_no="+formObj.ctrt_no.value, FormQueryString(formObj));
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
            
      var hdr1='|Freight|Description|Unit|Qty|Rate|Total|tro_no|tro_seq|sb_clss_cd|tro_add_frt_seq|ibflag';
      //var headCount=ComCountHeadTitle(hdr1);
      var prefix="Grd01";

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [ { Text:hdr1, Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"check",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
			 {Type:"PopupEdit", Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
			 {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:prefix+"frt_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			 {Type:"PopupEdit", Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"unit_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
			 {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_qty",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
			 {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
			 {Type:"AutoSum",   Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:prefix+"amt",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tro_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tro_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"sb_clss_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tro_add_frt_seq", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			 {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
       
      	InitColumns(cols);
      	SetSheetHeight(300);
      	SetEditable(1);
		}
		break;
	}
}
function sheet1_OnPopupClick(sheetObj,Row,Col){
	var prefix="Grd01";
	var srcName=sheetObj.ColSaveName(Col);
	var sUrl="";
	var sb_cls_cd="B";
	if ( srcName == prefix+"curr_cd" ) {
		sUrl="CommonCodePopup.clt?grp_cd=C010";
		ComOpenPopup(sUrl, 600, 600, "setIbCurrInfoSell", "0,0", true, sheetObj, Row, Col, 3);
	}else if ( srcName == prefix+"unit_cd" ) {
		sUrl="CommonCodePopup.clt?grp_cd=Z3";
		ComOpenPopup(sUrl, 600, 600, "setIbPkgunitInfoSell", "0,0", true, sheetObj, Row, Col, 3);
	}else if ( srcName == prefix+"cust_cd" ) {
		sUrl="CustomerPopup.clt?cust_cd="+sheetObj.GetCellValue(Row, Col)+"&in_part_tp=P";
		ComOpenPopup(sUrl, 900, 700, "setIbCustInfoSell", "0,0", true, sheetObj, Row, Col, 3);
	}else if ( srcName == prefix+"frt_cd" ) {
		sUrl="FreightPopup.clt?cust_cd="+sheetObj.GetCellValue(Row, Col);
		ComOpenPopup(sUrl, 600, 600, "setIbFreightInfoSell", "0,0", true, sheetObj, Row, Col, 3);
	}
}
function setIbCurrInfoSell(aryPopupData, row, col, sheetIdx) {
	var sheetObj=docObjects[0];
	sheetObj.SetCellValue(row, sheetObj.GetSelectCol(),aryPopupData[0][2],0);
}
function setIbPkgunitInfoSell(aryPopupData, row, col, sheetIdx) {
	var sheetObj=docObjects[0];
	sheetObj.SetCellValue(row, sheetObj.GetSelectCol(),aryPopupData[0][2],0);
}
function setIbCustInfoSell(aryPopupData, row, col, sheetIdx){
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	if(sheetObj.GetCellValue(row, prefix+"frt_br_cd") == aryPopupData[0][1]){
		sheetObj.SetCellValue(row, prefix+"cust_cd","",0);
		sheetObj.SetCellValue(row, prefix+"cust_nm","",0);
		sheetObj.SetCellValue(row, prefix+"cust_org_yn","",0);
	}else{
		sheetObj.SetCellValue(row, prefix+"cust_cd",aryPopupData[0][1],0);
		sheetObj.SetCellValue(row, prefix+"cust_nm",aryPopupData[0][3],0);
		sheetObj.SetCellValue(row, prefix+"cust_org_yn",aryPopupData[0][16],0);
	}
}
function setIbFreightInfoSell(aryPopupData, row, col, sheetIdx){
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	sheetObj.SetCellValue(row, prefix+"frt_cd",aryPopupData[0][1],0);
	sheetObj.SetCellValue(row, prefix+"frt_nm",aryPopupData[0][2],0);
}
function setIbCurrInfoSell(aryPopupData, row, col, sheetIdx) {
	var sheetObj=docObjects[1];
	sheetObj.SetCellValue(row, sheetObj.GetSelectCol(),aryPopupData[0][2],0);
}
function sheet1_OnChange(sheetObj, Row, Col, Value){
	var formObj=document.form;
	var srcName=sheetObj.ColSaveName(Col);
	var prefix="Grd01";
	var sUrl="";
	var sb_cls_cd="B";
	if ( srcName == prefix+"curr_cd" ) {
		sUrl="grp_cd=C010&code_cd="+Value;
		searchIbCommonCodeInfo(formObj,sUrl,srcName,Row, sb_cls_cd);	
	}else if ( srcName == prefix+"unit_cd" ) {
		sUrl="grp_cd=Z3&code_cd="+Value;
		searchIbCommonCodeInfo(formObj,sUrl,srcName,Row, sb_cls_cd);	
	}else if ( srcName == prefix+"frt_cd" ) {
		sUrl="code="+Value+"&org_cd="+formObj.org_cd.value;
		searchIbTlFreightInfo(formObj,sUrl,Row, sb_cls_cd);	
	}else if ( srcName == prefix+"unit_qty" || srcName == prefix+"unit_price" ) {
		var unit_qty=parseFloat(sheetObj.GetCellValue(Row, prefix+"unit_qty"));
		var unit_price=parseFloat(sheetObj.GetCellValue(Row, prefix+"unit_price"));
		sheetObj.SetCellValue(Row, prefix+"amt",ComAbsRound(unit_qty*unit_price, 2),0);
	} 
}
function searchIbCommonCodeInfo(formObj, value, srcName, row, sb_cls_cd){
	var sXml=docObjects[0].GetSaveData("searchCommonCodeInfo.clt?"+value);
			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
			}
			resultIbCommonCodeInfo(sXml, srcName, row, sb_cls_cd);
}
function resultIbCommonCodeInfo(resultXml, srcName, row, sb_cls_cd) {
	var sheetObj="";
	var prefix="";
	sheetObj=docObjects[0];
	prefix="Grd01";
	if ( srcName == prefix+"curr_cd" ) {
		if(getXmlDataNullToNullString(resultXml,'code_cd') != ""){
			sheetObj.SetCellValue(row, prefix+"curr_cd",getXmlDataNullToNullString(resultXml,'code_cd'),0);
		}else{
			sheetObj.SetCellValue(row, prefix+"curr_cd","",0);
		}
		setCurrCal(row, sb_cls_cd);
	} else if ( srcName == prefix+"unit_cd" ) {
		if(getXmlDataNullToNullString(resultXml,'code_cd') != ""){
			sheetObj.SetCellValue(row, prefix+"unit_cd",getXmlDataNullToNullString(resultXml,'code_cd'),0);
		}else{
			sheetObj.SetCellValue(row, prefix+"unit_cd","",0);
		}
	}
}
function searchIbTlFreightInfo(formObj, value, row, sb_cls_cd){
	var sXml=docObjects[0].GetSaveData("searchFrtCd.clt?"+value);
			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
			}
			resultIbTlFreightInfo(sXml, row, sb_cls_cd);
}
function resultIbTlFreightInfo(resultXml, row, sb_cls_cd) {
	var sheetObj=docObjects[0];	
	var prefix="Grd01";
	sheetObj.SetCellValue(row, prefix+"frt_cd",getXmlDataNullToNullString(resultXml,'code'),0);
	sheetObj.SetCellValue(row, prefix+"frt_nm",getXmlDataNullToNullString(resultXml,'name'),0);
}
function btn_Save() {
	if(ComShowCodeConfirm("COM0063") == false){
		return;
	}
	sParam=ComGetSaveString(docObjects[0], true, true);
 	var saveXml=docObjects[0].GetSaveData("saveTransloadingAddPopUp.clt", sParam);
	//1. Save 후 조회
	if( saveXml.indexOf('<ERROR>') == -1){
		ComShowCodeMessage("COM0093", "");
		btn_Search();
	}
}
function row_add(){
	var sheetObj=docObjects[0];		
	var formObj=document.form;
//no support[check again]CLT 	var intRows=sheetObj.Rows-1;
	if(intRows == 0){
		intRows=1;
	}
	sheetObj.DataInsert(intRows);
	sheetObj.SetCellValue(intRows, "Grd01tro_no",formObj.tro_no.value);
	sheetObj.SetCellValue(intRows, "Grd01tro_seq",formObj.tro_seq.value);
}
function row_del(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if(sheetObj.RowCount()> 0){
		ComRowHideDelete(sheetObj, "Grd01check");
	}
	sheetObj.CheckAll("Grd01check",0);
}
function btn_Close() {
	var opener=window.dialogArguments;
	ComClosePopup(); 
}
function btn_Apply(){
	var formObj=document.form;
	var openerformObj=opener.document.form;
	var openerSheetObj;
	if(formObj.mode.value == "CRT"){
		openerSheetObj=opener.docObjects[4];
	}else if(formObj.mode.value == "DSP"){
		openerSheetObj=opener.docObjects[2];
	}
	var sheetObj=docObjects[0];
	var openerprefix1="Grd05";
	var prefix="Grd01";
	openerSheetObj.RemoveAll();
	var add_amt=0;
	for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow(); i++) {
		row=openerSheetObj.DataInsert(-1);
		openerSheetObj.SetCellValue(row,openerprefix1+"frt_cd",sheetObj.GetCellValue(i,prefix+"frt_cd"),0);
		openerSheetObj.SetCellValue(row,openerprefix1+"frt_nm",sheetObj.GetCellValue(i,prefix+"frt_nm"),0);
		openerSheetObj.SetCellValue(row,openerprefix1+"unit_cd",sheetObj.GetCellValue(i,prefix+"unit_cd"),0);
		openerSheetObj.SetCellValue(row,openerprefix1+"unit_qty",sheetObj.GetCellValue(i,prefix+"unit_qty"),0);
		openerSheetObj.SetCellValue(row,openerprefix1+"unit_price",sheetObj.GetCellValue(i,prefix+"unit_price"),0);
		openerSheetObj.SetCellValue(row,openerprefix1+"amt",sheetObj.GetCellValue(i,prefix+"amt"),0);
		openerSheetObj.SetCellValue(row,openerprefix1+"tro_no",sheetObj.GetCellValue(i,prefix+"tro_no"),0);
		openerSheetObj.SetCellValue(row,openerprefix1+"tro_seq",sheetObj.GetCellValue(i,prefix+"tro_seq"),0);
		openerSheetObj.SetCellValue(row,openerprefix1+"sb_clss_cd",sheetObj.GetCellValue(i,prefix+"sb_clss_cd"),0);
		openerSheetObj.SetCellValue(row,openerprefix1+"tro_add_frt_seq",sheetObj.GetCellValue(i,prefix+"tro_add_frt_seq"),0);
		add_amt += Number(sheetObj.GetCellValue(i,prefix+"amt"));
	}
	openerformObj.add_amt.value=ComAddComma(add_amt);
	opener.setTotAmt();	
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	//comPopupOK();
}
function validation(){
	var sheetObj=docObjects[0];
    var iCheckRow=sheetObj.FindCheckedRow(0);
    if(ComIsEmpty(iCheckRow)){
    	ComShowCodeMessage("COM0170", "");
		return false;
    }
	return true;
}
