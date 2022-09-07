/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : BranchPopup.js
*@FileTitle  : Org Tree 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/20
=========================================================*/
var sheetObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var docObjects=new Array();
//document.onclick = processButtonClick;
function doWork(srcName, valObj) {
//	var sheetObject1 = sheetObjects[0];
//	var formObject = document.form;
	try {
		var srcName = ComGetEvent("name");
//		if(!btnGetVisible(srcName)) return false;
		switch (srcName) {
		case "btn_Close":
			btn_OK();
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
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	getData();
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		with(sheetObj){
//         var HeadTitle1="Seq.|Code|Discription|";
         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
         var info    = { Sort:0, ColMove:0, HeaderCheck:0, ColResize:1 };
         var headers = [ { Text:getLabel('BranchPopup_HDR1'), Align:"Center"}];
         InitHeaders(headers, info);

         var cols = [ {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"codeCd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"codeNm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   TreeCol:1 ,  LevelSaveName:"upperOrgId" },
             {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"grpCd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"office_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
          
         InitColumns(cols);
         SetSheetHeight(320);
         SetEditable(0);
         SetImageList(0, APP_PATH + "/web/img/main/icon_stitle.gif");
         SetVisible(1);
         SetRowHidden(0, 1);
         //InitDataImage(0, 1, daLeft);
         //InitTreeInfo(1, "upperOrgId", "#0000FFNAN");
         }

                                 
		break;
	}
}
function sheet1_OnSearchEnd(sheet1,ErrMsg){
	for(var j=1 ; j <= sheet1.RowCount(); j++){
		sheet1.SetCellImage(j,1,0);
	}	
}
function getData() {
	var formObj = document.form;
	formObj.f_cmd.value=SEARCH;
	docObjects[0].DoSearch("./BranchPopupGS.clt", FormQueryString(formObj) );
//	var formObj=document.form;
//	var sXml=docObjects[0].GetSearchData("searchORGList.do", FormQueryString(formObj,""));
//	docObjects[0].LoadSearchData(sXml,{Sync:1} );
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	btn_OK();
}
function btn_OK() {
	sheetObj=docObjects[0];
	ComClosePopup( rtnData());
}

function rtnData(){
	var rtnVal="";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "codeCd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "codeNm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "grpCd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "office_nm");
	return rtnVal;
}
