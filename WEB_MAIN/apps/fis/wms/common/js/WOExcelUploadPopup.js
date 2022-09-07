/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WOExcelUploadPopup.js
*@FileTitle  : WO Item ExcelUpload
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/03/17
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
function loadPage() {
	var i=0;
	for(i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//btn_Search();
    checkBrowser();
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
document.onclick=processButtonClick;
function processButtonClick(){
	try {
		var srcName=ComGetEvent("name");	
		if (srcName != "btn_cntr"){
			onChange="";
		}
		switch(srcName) {
			case "btn_OK":	
				btn_OK();
				break;
			case "btn_Close":	
				btn_Close();
				break;
            case "btn_loadExcel":
                btn_autoOpenDialog();
                break;
		} // end switch
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}
function btn_autoOpenDialog(){
    ComOpenWait(true);
    //docObjects[0].LoadExcel({ Mode:"NoHeader",WorkSheetNo:"1",StartRow:"2",EndRow:"-1",WorkSheetName:"",Append:true,ColumnMapping:""});
    docObjects[0].LoadExcel({ Mode:"HeaderSkip"});
    for(var i=docObjects[0].rowcount;i>0;i--){
        if(ComIsEmpty(docObjects[0].GetCellValue(i,'ref_hbl_no'))&&ComIsEmpty(docObjects[0].GetCellValue(i,'ref_mbl_no'))
            &&ComIsEmpty(docObjects[0].GetCellValue(i,'cntr_no'))&&ComIsEmpty(docObjects[0].GetCellValue(i,'cntr_tpsz_cd'))
            &&ComIsEmpty(docObjects[0].GetCellValue(i,'cntr_ref_no'))&&ComIsEmpty(docObjects[0].GetCellValue(i,'po_no'))
            &&ComIsEmpty(docObjects[0].GetCellValue(i,'item_cd'))&&ComIsEmpty(docObjects[0].GetCellValue(i,'item_nm'))){
            docObjects[0].RowDelete(i, false);
        }
    }
    ComOpenWait(false);
}
function btn_Close() {
	  ComClosePopup(); 
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:
		    with(sheetObj){
	        
		      var hdr1="Seq|HBL No|MBL No|Container No|Type|Container Ref|PO No|Item|Item Name|Lot No|Pallet No|Qty|PKG|CBM|G.WGT(KG)|N.WGT(KG)|Pkg Unit|Booking No|Liner BKG No|POR|POL|POD|DEL|ETD|ETA|Vessel Name|Voyage|Carrier Code|Truck No|Return CY|Return CY Ref|Customs Ref No";
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq" },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"ref_hbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"ref_mbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cntr_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cntr_ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"po_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"item_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"lot_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"pallet_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"item_qty",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"item_pkgqty",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"item_cbm",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"item_kgs",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"item_net_wgt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"item_pkgunit",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"bkg_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"ref_liner_bkg_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ref_por",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ref_pol",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ref_pod",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ref_del",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ref_pol_etd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ref_pod_eta",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"ref_vsl_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ref_voy",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ref_carrier_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"vehicle_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"rtn_cy",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"rtn_cy_ref",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"custms_ref_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		       
			      InitColumns(cols);
			      SetSheetHeight(320);
			      SetEditable(0);
		            }
		      break;


	}
}

function btn_Search()
{
	var strFilePath="";
 	strFilePath=docObjects[0].OpenFileDialog("Load Excel", "", "", "Excel Documents(*.xls; *.xlsx)|*.xls; *.xlsx");
	if (strFilePath == "<USER_CANCEL>") {
        return;
    }
	ComOpenWait(true);
 	docObjects[0].LoadExcel({ Mode:"NoHeader",WorkSheetNo:"1",StartRow:"2",EndRow:"-1",WorkSheetName:"",Append:true,ColumnMapping:""});
	for(var i=docObjects[0].rowcount;i>0;i--){
			if(ComIsEmpty(docObjects[0].GetCellValue(i,'ref_hbl_no'))&&ComIsEmpty(docObjects[0].GetCellValue(i,'ref_mbl_no'))
			&&ComIsEmpty(docObjects[0].GetCellValue(i,'cntr_no'))&&ComIsEmpty(docObjects[0].GetCellValue(i,'cntr_tpsz_cd'))
			&&ComIsEmpty(docObjects[0].GetCellValue(i,'cntr_ref_no'))&&ComIsEmpty(docObjects[0].GetCellValue(i,'po_no'))
			&&ComIsEmpty(docObjects[0].GetCellValue(i,'item_cd'))&&ComIsEmpty(docObjects[0].GetCellValue(i,'item_nm'))){
			docObjects[0].RowDelete(i, false);
		}
	}
	ComOpenWait(false);
}
function btn_OK() {
	if(sheet1.RowCount() < 1){
		ComShowMessage("No data to select!");
	}else{
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
