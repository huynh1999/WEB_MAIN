/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInExcelUploadPopup.js
*@FileTitle  : Excel Upload for Warehouse Supplier Booking
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/22
=========================================================--*/
var itemChkMsg01 = "Error:Item Code Mismatch";
var itemChkMsg02 = "Error:Item Unit Mismatch";
var docObjects=new Array(); 
var sheetCnt=0;
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//var sheetObj=docObjects[0];
 /*	var strFilePath=docObjects[0].OpenFileDialog("Load Excel", "", "", "Excel Documents(*.xls; *.xlsx)|*.xls; *.xlsx");
	if (strFilePath == "<USER_CANCEL>") {
		return;
	}	
 	sheetObj.LoadExcel({ Mode:"NoHeader",WorkSheetNo:"1",StartRow:"2",EndRow:"-1",WorkSheetName:"",Append:true,ColumnMapping:""});*/
	// 입고 아이템의 입고 아이템 정보 조회 => ib mgmt 화면에서 처리 (2014.02.14)
	//btn_Search();	
	// meature 정보 재계산 => ib mgmt 화면에서 처리 (2014.02.14)
	//base_process();	
}
function btn_Search() {
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var ctrt_no=formObj.ctrt_no.value;
    var rowcnt=sheetObj.RowCount()+2;
    var itemCdValue;
    var custItemCd;	
    var item_sys_no;
    var item_pkgbaseqty;
    var item_cbm;
    var item_kgs;
    var item_net_wgt;
    var item_pkgunit;
    var item_nm;
    for(var i=2;i<rowcnt; i++){
        //custItemCd =  sheetObj.CellValue(i, "cust_item_cd");
    	itemCdValue=sheetObj.GetCellValue(i, "item_cd");
    	var param="ctrt_no="+ctrt_no+"&item_cd="+itemCdValue;
     	var sXml=sheetObj.GetSearchData("searchExcelItemSysNo.clt", param);
    	var itemSysNo=getXmlData(sXml, "item_sys_no");
    	if (!ComIsEmpty(itemSysNo)) {
    		sheetObj.SetCellValue(i,"del_chk",1,0);
	    	sheetObj.SetCellValue(i,"item_sys_no",itemSysNo,0);
			sheetObj.SetCellValue(i, "pkg_lv1_qty",getXmlDataNullToNullString(sXml, "pkg_lv1_qty"),0);
			sheetObj.SetCellValue(i, "lv1_cbm",getXmlDataNullToNullString(sXml, "lv1_cbm"),0);
			sheetObj.SetCellValue(i, "lv1_cbf",getXmlDataNullToNullString(sXml, "lv1_cbf"),0);
			sheetObj.SetCellValue(i, "lv1_grs_kgs",getXmlDataNullToNullString(sXml, "lv1_grs_kgs"),0);
			sheetObj.SetCellValue(i, "lv1_grs_lbs",getXmlDataNullToNullString(sXml, "lv1_grs_lbs"),0);
			sheetObj.SetCellValue(i, "lv1_net_kgs",getXmlDataNullToNullString(sXml, "lv1_net_kgs"),0);
			sheetObj.SetCellValue(i, "lv1_net_lbs",getXmlDataNullToNullString(sXml, "lv1_net_lbs"),0);
    	} else {
    		sheetObj.SetCellValue(i,"del_chk",0);
    		//sheetObj.RowFontColor(i) = "#FF0000";
    	}
    }	
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:
		    with(sheetObj){
			      var hdr1="|Cust Order No|Item|Item Desc.|Lot No|Pallet No|Booking|Booking|Booking|Booking|Booking|Booking|Customs Ref\nNo";
			      hdr1 += "|Import Ship Information|Import Ship Information|Import Ship Information|Import Ship Information|Import Ship Information|Import Ship Information|Import Ship Information";
			      hdr1 += "|Import Ship Information|Import Ship Information|Import Ship Information|Import Ship Information|Import Ship Information|Import Ship Information|Import Ship Information|PKG Info|";
			      var hdr2="|Cust Order No|Item|Item Desc.|Lot No|Pallet No|QTY|PKG|CBM|GWT(KG)|NWT(KG)|PKG Unit|Customs Ref\nNo";
			      hdr2 += "|Container No|Type|Container Ref|HBL No|MBL No|POL|ETD|POD|ETA|DEL|Carrier Code|Vessel Code|Vessel Name|Voyage|";
			      var hdr1="|Item|Item Name|Item Lot No|Estimated|Estimated|CBM|CBM|GWT|GWT|NWT|NWT|PO No|Planned Transport|Planned Transport|Planned Transport|Additional Lot Property|Additional Lot Property|Additional Lot Property|Additional Lot Property";
			      hdr1 += "|Import Information|Import Information|Import Information|Import Information|Import Information|Import Information|Import Information|Import Information|Import Information|Import Information|Import Information|Import Information|Commercial Invoice|Commercial Invoice|eq_tp_cd|item_sys_no|item_ea_qty|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|ibflag";
			      var hdr2="|Item|Item Name|Item Lot No|Unit|QTY|CBM|CFT|KG|LB|KG|LB|PO No|Type|CNTR / TR No|Seal No|Inbound Date|Expiration Date|Lot 04|Lot 05";
			      hdr2 += "|CNTR Ref|HBL No|MBL No|POL|ETD|POD|ETA|DEL|Carrier Code|Vessel Code|Vessel Name|Voyage|Currency|Unit Price|eq_tp_cd|item_sys_no|item_ea_qty|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|PKG Info|ibflag";
			      //var headCount=ComCountHeadTitle(hdr1);
		
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, DataRowMerge:1 } );
		
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:hdr1, Align:"Center"},
			                  { Text:hdr2, Align:"Center"} ];
			      InitHeaders(headers, info);
		
			 var cols = [{Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk" },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
			             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"lot_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"item_pkgunit",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
			             {Type:"Int",     	Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"item_pkgqty",   KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"item_cbm",      KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"item_cbf",      KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"item_grs_kgs",  KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"item_grs_lbs",  KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"item_net_kgs",  KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"item_net_lbs",  KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"po_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"eq_tpsz_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:4 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"eq_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"seal_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"inbound_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:8 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"exp_dt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:8 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"lot_04",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"lot_05",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"cntr_ref_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:30 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"hbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"mbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"pol",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"etd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:8 },
			             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"pod",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eta",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:8 },
			             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"del",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"carrier_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"vsl_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:35 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"vsl_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"voy",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:11 },
			             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
			             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"unit_price",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             //hidden
			             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,    SaveName:"eq_tp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,    SaveName:"item_sys_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Int",      	Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"item_ea_qty",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Int",      	Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"pkg_lv1_qty",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_cbm",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:5,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_cbf",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:5,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_grs_kgs",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:5,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_grs_lbs",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:5,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_net_kgs",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:5,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_net_lbs",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:5,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"Text",      Hidden:1,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"pkg_info",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
			             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,    SaveName:"ibflag" } ];
			       
			      InitColumns(cols);
			      SetSheetHeight(320); //320/165
			      SetEditable(1);
			      SetColProperty("inbound_dt", {Format:"####-##-##"} );
			      SetColProperty("exp_dt", {Format:"####-##-##"} );
			      SetColProperty("etd", {Format:"####-##-##"} );
			      SetColProperty("eta", {Format:"####-##-##"} );
			      
			      SetColProperty(0 ,"item_cd" , {AcceptKeys:"E|N[-]" , InputCaseSensitive:1});
			      SetColProperty(0 ,"item_nm" , {AcceptKeys:"E|[0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\]" , InputCaseSensitive:1});
			      SetColProperty(0 ,"item_pkgunit" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			      
	      }
	      break;
		case 2:
		    with(sheetObj){
			     SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, DataRowMerge:1 } );
		
			     var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			     var headers = [ { Text:getLabel('WHInOutExcelUploadPopup_HDR1'), Align:"Center"},
			                      { Text:getLabel('WHInOutExcelUploadPopup_HDR2'), Align:"Center"} ];
			     InitHeaders(headers, info);
			      
			     var prefix="";
				 var cols = [ {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk" },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
				             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
				             {Type:"Text",      Hidden:0,  Width:120,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
				             {Type:"Text",      Hidden:0,  Width:160,   Align:"Left",  ColMerge:1,   SaveName:prefix+"item_sys_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
				             {Type:"Text",     	Hidden:0,  Width:70,   Align:"Left",   ColMerge:1,   SaveName:prefix+"pkg_lv1_unit_cd",   KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Int",     Hidden:0,  Width:70,   Align:"Left",   ColMerge:1,   SaveName:prefix+"pkg_lv1_qty",      KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",   ColMerge:1,   SaveName:prefix+"item_pkgunit",      KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Int",     Hidden:0,  Width:70,   Align:"Left",   ColMerge:1,   SaveName:prefix+"item_pkgbaseqty",  KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",   ColMerge:1,   SaveName:prefix+"pkg_lv3_unit_cd",  KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Int",     Hidden:0,  Width:70,   Align:"Left",   ColMerge:1,   SaveName:prefix+"pkg_lv3_qty",  KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",   ColMerge:1,   SaveName:prefix+"pkg_lv4_unit_cd",  KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Int",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pkg_lv4_qty",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
				             {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:prefix+"pkg_info",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
				             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lv1_cbm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
				             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lv1_cbf",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
				             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",  ColMerge:1,   SaveName:prefix+"lv1_grs_kgs",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
				             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",  ColMerge:1,   SaveName:prefix+"lv1_grs_lbs",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
				             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",  ColMerge:1,   SaveName:prefix+"lv1_net_kgs",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
				             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",  ColMerge:1,   SaveName:prefix+"lv1_net_lbs",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
				             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",  ColMerge:1,   SaveName:prefix+"curr_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
				             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",  ColMerge:1,   SaveName:prefix+"unit_price",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
				             
				             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,    SaveName:prefix+"ibflag" } ];
			       
			      InitColumns(cols);
			      SetSheetHeight(320); //320/165
			      SetEditable(1);
			    
	      }
	      break;

	}
}
function base_process(){
	var sheetObj=docObjects[0];
    var rowcnt=sheetObj.RowCount()+2;
    for(var i=2;i<rowcnt; i++){
//    	var chk = sheetObj.CellValue(i,1);
//    	//if (chk == "1"){
//    		if( sheetObj.CellValue(i,"item_cbm") == 0){
//    			if(sheetObj.CellValue(i,"item_qty") != 0 && sheetObj.CellValue(i,"bs_pack") != 0 ){
//    				sheetObj.CellValue2(i,"item_cbm") = sheetObj.CellValue(i,"item_qty")/sheetObj.CellValue(i,"bs_pack") * sheetObj.CellValue(i,"bs_cbm");
//    			}
//    		}
//    		if(sheetObj.CellValue(i,"item_kgs") == 0){
//    			if(sheetObj.CellValue(i,"item_qty") != 0 && sheetObj.CellValue(i,"bs_pack") != 0 ){
//    				sheetObj.CellValue2(i,"item_kgs") = sheetObj.CellValue(i,"item_qty")/sheetObj.CellValue(i,"bs_pack") * sheetObj.CellValue(i,"bs_kgs");
//    			}
//    		}
//    		if(sheetObj.CellValue(i,"item_net_wgt") == 0){
//    			if(sheetObj.CellValue(i,"item_qty") != 0 && sheetObj.CellValue(i,"bs_pack") != 0 ){
//    				sheetObj.CellValue2(i,"item_net_wgt") = sheetObj.CellValue(i,"item_qty")/sheetObj.CellValue(i,"bs_pack") * sheetObj.CellValue(i,"bs_net_wgt");
//    			}
//    		}
//    		if(sheetObj.CellValue(i,"item_pkgqty") == 0){
//    			if(sheetObj.CellValue(i,"item_qty") != 0 && sheetObj.CellValue(i,"bs_pack") != 0 ){
//    				calVal = sheetObj.CellValue(i,"item_qty") / sheetObj.CellValue(i,"bs_pack");
//    				sheetObj.CellValue2(i,"item_pkgqty") = Math.round(calVal*100)/100;
//    			}
//    		}
//    		if(sheetObj.CellValue(i,"item_pkgunit")==""){
//    			sheetObj.CellValue(i,"item_pkgunit") = sheetObj.CellValue(i,"bs_pkgunit");
//    		}
//    		if(sheetObj.CellValue(i,"item_nm")==""){
//    			sheetObj.CellValue2(i,"item_nm") = sheetObj.CellValue(i,"bs_item_nm");
//    		}
//    		
//    	//}
		// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
		fnCalcItemEaQty(sheetObj, i, "");
    }
}
/**
* Item EA_QTY 계산
* @param sheetObj
* @param row
* @param col
*/
function fnCalcItemEaQty(sheetObj, Row, Col) {
	var formObj=document.form;
	var item_pkgunit=sheetObj.GetCellValue(Row, "item_pkgunit").trim();
	var item_pkgqty=sheetObj.GetCellValue(Row, "item_pkgqty");//.trim();
	var ctrt_no=ComGetObjValue(formObj.ctrt_no) ;
	var item_sys_no=sheetObj.GetCellValue(Row, "item_sys_no").trim();
	if (item_pkgunit == "" && item_pkgqty > 0) {
		//ComShowCodeMessage("COM0311"); //sound unit는 없고 qty있는경우 메세지
		//sheetObj.SelectCell(Row, Col);
		//ComShowCodeMessage("COM0162", Row-1, "[Item] Unit");
		//sheetObj.SelectCell(Row, Col);
		//return;
	}
	
	var sXml=docObjects[0].GetSearchData("searchPutawayEaQty.do?putaway_pkgunit=" + item_pkgunit 
								            + "&putaway_pkgqty=" + item_pkgqty
								            + "&ctrt_no="        + ctrt_no
								            + "&item_sys_no="    + item_sys_no);
	resultCalcItemEaQty(sXml, sheetObj, Row, Col);
}
/*
* receving 정보바뀐경우 os계산 ajax return function
*/
function resultCalcItemEaQty(resultXml, sheetObj, Row, Col) {
	var suYn=getXmlDataNullToNullString(resultXml, 'suYn');
	var suValue=getXmlDataNullToNullString(resultXml, 'suValue');
	if (suYn == "" || suYn == null)	{
		//alert("error"); //TODO : MJY MESSAGE
		//return; 
	}
	if (suYn == "N") {
		//ComShowCodeMessage(suValue); //COM0313~COM0315
		sheetObj.SetCellValue(Row, "item_pkgunit","",0);
		sheetObj.SetCellValue(Row, "item_pkgqty",0,0);
		//sheetObj.CellValue2(Row, Col) = "";
		//sheetObj.SelectCell(Row, Col);
		//return;
	}
	var item_pkgqty=getXmlDataNullToNullString(resultXml, 'putaway_ea_qty');
	sheetObj.SetCellValue(Row, "item_ea_qty",item_pkgqty,0);
	//sheetObj.CellValue2(Row, "add_row") = item_pkgqty;
	// CBM, GWT, NWT 계산 (Excel Upload시는 계산하지 않는다) 
	//fnCalcItemCbmGwtNwt(sheetObj, Row, Col);
}
/**
 * CBM, GWT, NWT 계산
 */
function fnCalcItemCbmGwtNwt(sheetObj, Row, Col) {
	var formObj=document.form;
	// CBM, GWT, NWT 계산
	var item_ea_qty=eval(sheetObj.GetCellValue(Row, "item_ea_qty"));
	var pkg_lv1_qty=eval(sheetObj.GetCellValue(Row, "pkg_lv1_qty"));
	var lv1_cbm=eval(sheetObj.GetCellValue(Row, "lv1_cbm"));
	var lv1_cbf=eval(sheetObj.GetCellValue(Row, "lv1_cbf"));
	var lv1_grs_kgs=eval(sheetObj.GetCellValue(Row, "lv1_grs_kgs"));
	var lv1_grs_lbs=eval(sheetObj.GetCellValue(Row, "lv1_grs_lbs"));
	var lv1_net_kgs=eval(sheetObj.GetCellValue(Row, "lv1_net_kgs"));
	var lv1_net_lbs=eval(sheetObj.GetCellValue(Row, "lv1_net_lbs"));
	sheetObj.SetCellValue(Row,  "item_cbm",(pkg_lv1_qty * item_ea_qty) * lv1_cbm,0);
	sheetObj.SetCellValue(Row,  "item_cbf",(pkg_lv1_qty * item_ea_qty) * lv1_cbf,0);
	sheetObj.SetCellValue(Row,  "item_grs_kgs",(pkg_lv1_qty * item_ea_qty) * lv1_grs_kgs,0);
	sheetObj.SetCellValue(Row,  "item_grs_lbs",(pkg_lv1_qty * item_ea_qty) * lv1_grs_lbs,0);
	sheetObj.SetCellValue(Row,  "item_net_kgs",(pkg_lv1_qty * item_ea_qty) * lv1_net_kgs,0);
	sheetObj.SetCellValue(Row,  "item_net_lbs",(pkg_lv1_qty * item_ea_qty) * lv1_net_lbs,0);
}
/**
 * 엑셀에서 데이터 LOAD시
 */
function sheet1_OnLoadExcel(result){
	var formObj=document.form;
	var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    
    if(sheetObj.RowCount()<= 1){
    	return;
    }
    
    for(var i=2; i<=sheetObj.LastRow();i++){
    	sheetObj.SetCellValue(i , "item_cd"      , sheetObj.GetCellValue(i, "item_cd").toUpperCase() ,0);
    	sheetObj.SetCellValue(i , "item_nm"      , sheetObj.GetCellValue(i, "item_nm").toUpperCase() ,0);
    	sheetObj.SetCellValue(i , "item_pkgunit" , sheetObj.GetCellValue(i, "item_pkgunit").toUpperCase() ,0);
    }
    
	if(result) {
		docObjects[0].CheckAll("del_chk",1);
		
		formObj.f_cmd.value = SEARCHLIST01;
 	    var param="";
 	    var cnt=0;
 	    
 	    for(var i=2; i<=sheetObj.LastRow();i++){
 		   if(cnt != 0){
			   param += ",";
		   }
 		   param += "";
		   param += sheetObj.GetCellValue(i, "item_cd");
		   param += "";
		   cnt++;
 	    }
 	    	   
 	    if(cnt==0){
 		   alert(getLabel('FMS_COM_ALT004'));
 		   return;
 	    }   
 	    formObj.f_param_val.value=param;
 	    doShowProcess(true);
 	  
 	    sheetObj2.DoSearch("./WHInExcelUploadPopupGS.clt", FormQueryString(formObj) );
	} else {
		return;
	}
}
/**
 * EQ TYPE 데이터 설정
 * @param sheetObj
 * @param Row
 * @param Col
 * @param Value
 */
function sheet1_OnChange(sheetObj, Row, Col, Value) {
/*	
	var formObj=document.form;
	//var prefix="Grd01";
	//var colName = sheetObj.ColSaveName(Col);
var eq_tpsz_cd=sheetObj.GetCellValue(Row, "eq_tpsz_cd");
	//if (colName == ("eq_tpsz_cd") && Value != "") {
    if (eq_tpsz_cd != "") {
		var sParam="cntr_tp="+eq_tpsz_cd;
		$.ajax({
			url : "searchCntrTrTp.clt?"+sParam,
			success : function(result) {
				sheetObj.SetCellValue(Row, "eq_tpsz_cd",getXmlDataNullToNullString(result.xml,'eq_unit'),0);
				sheetObj.SetCellValue(Row, "eq_tp_cd",getXmlDataNullToNullString(result.xml,'type'),0);
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					//alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
					//sheetObj.SelectCell(Row, "eq_tpsz_cd");
				}
			}
		});
	}
*/	
}
/**
 * OK
 */
function btn_OK() {
	if(sheet1.GetSelectRow() > 0){
		//sheetObj.SetCellValue(sheet1.GetSelectRow(), "checkbox","1");
		returnDataExcel(sheet1, sheet1.FindCheckedRow("del_chk",1));
	}else ComShowCodeMessage("COM12189");
}

function returnDataExcel(sheetObj, selectedRows){
	
	var arrSelectedRows = selectedRows.split('|');
	var listObj = [];

	if(arrSelectedRows ==""){
		ComShowCodeMessage("COM12189");
		return;
	}
	
	for(var i = 0; i < arrSelectedRows.length; i++){
		
		var obj = {};
		
		var bgnIndx = sheet1.SaveNameCol('item_cd');
		var endIndx = sheet1.SaveNameCol('ibflag');
		
		var itemchkIndx = sheet1.SaveNameCol('item_nm');
		var itemName = sheet1.GetCellValue(arrSelectedRows[i],itemchkIndx);
		if(itemName != itemChkMsg01 && itemName != itemChkMsg02){
			for(var j = bgnIndx ; j <= endIndx; j++){
				obj[sheet1.ColSaveName(j)] = sheet1.GetCellValue(arrSelectedRows[i],j);
				//eval("obj." + sheet1.ColSaveName(j) + "=sheet1.GetCellValue("+i+","+"j)");
			}
			obj["load_flg"] = "N";
			obj["seal_img"] = "1";
			//obj["lot_id_img"] = "0";
			listObj.splice(listObj.length, 0, obj);
		}
		
	}
	
    ComClosePopup(listObj);
}

/**
 * return Data
 * @param sheetObj
 * @param selectedRows
 */
function returnData(sheetObj, selectedRows){
	
	var arrSelectedRows = selectedRows.split('|');
	var listObj = [];

	if(arrSelectedRows ==""){
		ComShowCodeMessage("COM12189");
		return;
	}
	
	
	for(var i = 0; i < arrSelectedRows.length; i++){
		
		var obj = {};
		
		var bgnIndx = sheet1.SaveNameCol('item_cd');
		var endIndx = sheet1.SaveNameCol('lv1_net_lbs');
		
		for(var j = bgnIndx ; j <= endIndx; j++){
			
			obj[sheet1.ColSaveName(j)] = sheet1.GetCellValue(arrSelectedRows[i],j);
			
			//eval("obj." + sheet1.ColSaveName(j) + "=sheet1.GetCellValue("+i+","+"j)");
		}
		
		listObj.splice(listObj.length, 0, obj);
	}
	
    ComClosePopup(listObj);
}
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "btn_upload_excel":
			//sheet1.LoadExcel({ Mode:"HeaderSkip"});
			sheet1.LoadExcel({ Mode : "NoHeader ",    StartRow: "2"});
			break;
		case "btn_OK":
			btn_OK();
			break;
		case "CLOSE":
			btn_Close();
			break;
      } // end switch
	}	catch(e) {
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
function btn_Close() {
  ComClosePopup(); 
}

function validation(){
	var sheetObj=docObjects[0];
/*    var rowcnt=sheetObj.RowCount()+2;
    for(var i=2;i<rowcnt; i++){
    	var chk=sheetObj.GetCellValue(i, 0);
    	if (chk == "1") {
//    		if (ComIsEmpty(sheetObj.CellValue(i, "item_sys_no"))) { // item_sys_no
//    			ComShowCodeMessage("COM0020", "");
//    			return false;
//    		}
    	}
    }*/
    var iCheckRow=sheetObj.FindCheckedRow("del_chk");
    if (ComIsEmpty(iCheckRow)) {
    	ComShowCodeMessage("COM0271", "");
		return false;
    }
	return true;
}
function sheet2_OnSearchEnd(sheetObj, ErrMsg){
	var selectedRows = sheet1.FindCheckedRow("del_chk",1)
	var arrSelectedRows = selectedRows.split('|');
	var formObj=document.form;
	
	if(arrSelectedRows ==""){		
		doHideProcess();
		return;
	}
	
	for(var i = 0; i < arrSelectedRows.length; i++){
		
		var idx = 0;
		var rowIdx = arrSelectedRows[i];
		var tagetItem_cd = sheet1.GetCellValue(rowIdx,"item_cd");
		var item_cd = sheet2.GetCellValue(rowIdx,"item_cd");
		var item_nm = sheet2.GetCellValue(rowIdx,"item_nm");
		if(tagetItem_cd == item_cd){
			if(item_nm !=null && item_nm != ''){
				var Unit = sheet1.GetCellValue(rowIdx,"item_pkgunit");
				var Qty = sheet1.GetCellValue(rowIdx,"item_pkgqty");
				
				var lvlUnit1 = sheet2.GetCellValue(rowIdx,"pkg_lv1_unit_cd");//lvl1
				var lvlQty1 = sheet2.GetCellValue(rowIdx,"pkg_lv1_qty");//lvl1
				var lvlUnit2 = sheet2.GetCellValue(rowIdx,"item_pkgunit");//lvl2
				var lvlQty2 = sheet2.GetCellValue(rowIdx,"item_pkgbaseqty");//lvl2
				var lvlUnit3 = sheet2.GetCellValue(rowIdx,"pkg_lv3_unit_cd");//lvl3
				var lvlQty3 = sheet2.GetCellValue(rowIdx,"pkg_lv3_qty");//lvl3
				var lvlUnit4 = sheet2.GetCellValue(rowIdx,"pkg_lv4_unit_cd");//lvl4
				var lvlQty4 = sheet2.GetCellValue(rowIdx,"pkg_lv4_qty");//lvl5
				
				var eaUnit ="";
				var eaQty ="0";
				var chkCls = "T";
				if(Unit == lvlUnit1){
					eaQty =  lvlQty1 * Qty;
				}else if(Unit == lvlUnit2){
					eaQty =  lvlQty2 * Qty;
				}else if(Unit == lvlUnit3){
					eaQty =  lvlQty3 * Qty;
				}else if(Unit == lvlUnit4){
					eaQty =  lvlQty4 * Qty;
				}else{
					chkCls = "F";
				}
				if(chkCls == "T"){
					sheet1.SetCellValue(rowIdx, "item_nm",sheet2.GetCellValue(rowIdx,"item_nm")); //item_nm
					//sheet1.SetCellValue(rowIdx, "lot_no",sheet2.GetCellValue(rowIdx,"lot_no")); //lot_no
					sheet1.SetCellValue(rowIdx, "item_sys_no",sheet2.GetCellValue(rowIdx,"item_sys_no"),0); //item_sys_no
					sheet1.SetCellValue(rowIdx, "item_ea_qty",eaQty,0);
					
					if (formObj.autoCalculation.checked){
						var temp = sheet2.GetCellValue(rowIdx,"lv1_cbm");
						temp = temp * eaQty;
						sheet1.SetCellValue(rowIdx, "item_cbm",roundXL(temp, 3),0); //lv1_cbm
						
						temp = sheet2.GetCellValue(rowIdx,"lv1_cbf");
						temp = temp * eaQty;
						sheet1.SetCellValue(rowIdx, "item_cbf",roundXL(temp, 3),0); //lv1_cbf
						
						temp = sheet2.GetCellValue(rowIdx,"lv1_grs_kgs");
						temp = temp * eaQty;
						sheet1.SetCellValue(rowIdx, "item_grs_kgs",roundXL(temp, 3),0); //lv1_grs_kgs
						
						temp = sheet2.GetCellValue(rowIdx,"lv1_grs_lbs");
						temp = temp * eaQty;
						sheet1.SetCellValue(rowIdx, "item_grs_lbs",roundXL(temp, 3),0); //lv1_grs_lbs
						
						temp = sheet2.GetCellValue(rowIdx,"lv1_net_kgs");
						temp = temp * eaQty;
						sheet1.SetCellValue(rowIdx, "item_net_kgs",roundXL(temp, 3),0); //lv1_net_kgs
						
						temp = sheet2.GetCellValue(rowIdx,"lv1_net_lbs");
						temp = temp * eaQty;
						sheet1.SetCellValue(rowIdx, "item_net_lbs",roundXL(temp, 3),0); //lv1_net_lbs
					}
					
					sheet1.SetCellValue(rowIdx, "pkg_info",sheet2.GetCellValue(rowIdx,"pkg_info",0))
				}else{
					sheet1.SetCellValue(rowIdx, "item_nm",itemChkMsg02); //item_nm
				}
			}else{
				sheet1.SetCellValue(rowIdx, "item_nm",itemChkMsg01); //item_nm
			}
		}else{
			sheet1.SetCellValue(rowIdx, "item_nm",itemChkMsg01); //item_nm
		}
	}
	doHideProcess();
	
}