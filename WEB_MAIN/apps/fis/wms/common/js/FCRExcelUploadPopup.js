/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : FCRExcelUploadPopup.jsp
*@FileTitle  : 
*@author     : Khanh.Nguyen
*@version    : 1.0
*@since      : 2015/03/18
=========================================================*/
var rtnary=new Array(2);
var sheetCnt=0;
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var docObjects=new Array();

function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
//	checkBrowser();
//	for(var i=0;i<docObjects.length;i++){
//	    ComConfigSheet(docObjects[i]);
//	    initSheet(docObjects[i],i+1);
//	    ComEndConfigSheet(docObjects[i]);
//	}
//	var strFilePath=docObjects[0].OpenFileDialog("Load Excel", "", "", "Excel Documents(*.xls; *.xlsx)|*.xls; *.xlsx");
//	if (strFilePath == "<USER_CANCEL>") {
//		return;
//	}
//	docObjects[0].LoadExcel({ Mode:"NoHeader",WorkSheetNo:"1",StartRow:"3",EndRow:"-1",WorkSheetName:"",Append:true,ColumnMapping:""});
}

document.onclick=processButtonClick;
function processButtonClick(){
	try {
		var srcName=ComGetEvent("name");
		switch(srcName) {
	
		case "btn_ok":
			btn_OK();
			break;
		case "btn_close":   
			ComClosePopup();
			break;
		case "btn_loadExcel":
            btn_autoOpenDialog();
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

function btn_autoOpenDialog(){
	doShowProcess(true);
    docObjects[0].LoadExcel({ Mode:"HeaderSkip"});
    doHideProcess(false);
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
	        
	      var hdr1='PO No|Item|Item Desc.|Qty|PKG|CBM|G.WGT(KG)|PKG Unit';
	      var hdr2='PO No|Item|Item Desc.|Qty|PKG|CBM|G.WGT(KG)|PKG Unit';
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"},
	                      { Text:hdr2, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"poNo",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"itemCd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:230,  Align:"Left",    ColMerge:1,   SaveName:"itemNm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"itemQty",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"itemPkgqty",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"itemCbm",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"itemKgs",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"itemPkgunit",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);

	      SetEditable(1);
	      SetSheetHeight(320);
	            }
	      break;
	}
}
function btn_OK() {
	if(sheet1.RowCount() < 1){
		ComShowMessage("No data to select!");
	}else{
		sheetObj=docObjects[0];
		comPopupOK();
	}
}

function checkBrowser() {
    try {
        var ua = window.navigator.userAgent;
        if(ua.indexOf("MSIE 7")!=-1 || ua.indexOf("MSIE 8")!=-1 || ua.indexOf("MSIE 9")!=-1){
            btn_autoOpenDialog();
        }
    }catch(err) {}
}
