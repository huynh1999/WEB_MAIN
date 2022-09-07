var sheetCnt = 0;
var docObjects=new Array();
var opener=window.dialogArguments;
function loadPage() {
	var formObj=document.form;	
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function doWork(srcName){
	var formObj = document.form;

	try {
		switch(srcName) {
			case "btn_upload_excel":
				docObjects[0].LoadExcel({ Mode : "NoHeader ",    StartRow: "2"});
			break;
			case "SAVE":
				btn_OK();
				break;
			case "CLOSE":
				btn_Close();
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
/**
 * Close
 */
function btn_Close() {
	ComClosePopup(); 
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:
		    with (sheetObj) {
			    var HeadTitle1="W/H Code|Order No|Order Type|Estimated Date\n(YYYYMMDD)|Contract|Ship To|Ship To|Ship To|CNTR/TR|CNTR/TR|CNTR/TR|CNTR/TR|CNTR/TR|EID\nType|FWD\nType|M B/L|H B/L|Reference No|Invoice No|Remark|SKU|Item LOT|UOM|Estimated\nQty|Location|Volume|Volume|GWT|GWT|NWT|NWT|Inbound Date|Expiration Date|SO No|UOM Price|UOM Price|RESULT";
			    var HeadTitle2="W/H Code|Order No|Order Type|Estimated Date\n(YYYYMMDD)|Contract|Code|Facility Code|Addr1|Type|No|Seal|D/O No|Loading|EID\nType|FWD\nType|M B/L|H B/L|Reference No|Invoice No|Remark|SKU|Item LOT|UOM|Estimated\nQty|Location|CBM|CFT|KG|LB|KG|LB|Inbound Date|Expiration Date|SO No|Currency|Price|RESULT";
			    var prefix="Grd01";
	
			    SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
			    var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1, Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			    var headers = [ { Text:HeadTitle1, Align:"Center"},
			                  { Text:HeadTitle2, Align:"Center"} ];
			    InitHeaders(headers, info);
	
			    var cols = [ {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_cd",         KeyField:1,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_ord_no",         KeyField:1,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ord_tp_cd",         KeyField:1,   UpdateEdit:1,   InsertEdit:0,   EditLen:2},
			              {Type:"Text",     Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:prefix+"est_out_dt",         KeyField:1,   UpdateEdit:1,   InsertEdit:0,   Format:"Ymd" },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no",         KeyField:1,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"buyer_cd",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:10},
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"buyer_facil_cd",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:2},
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"buyer_addr1",         KeyField:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"eq_tpsz_cd",         KeyField:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",  ColMerge:1,   SaveName:prefix+"eq_no",         KeyField:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",  ColMerge:1,   SaveName:prefix+"seal_no",         KeyField:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",  ColMerge:1,   SaveName:prefix+"dlv_ord_no",         KeyField:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"load_tp_cd",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:2 },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"trade_tp_cd",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:3 },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"fwd_tp_cd",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:3 },
			              {Type:"Text",     Hidden:0,  Width:110,   Align:"Left",  ColMerge:1,   SaveName:prefix+"mbl_no",         KeyField:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:110,   Align:"Left",  ColMerge:1,   SaveName:prefix+"hbl_no",         KeyField:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",  ColMerge:1,   SaveName:prefix+"ref_no",         KeyField:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",  ColMerge:1,   SaveName:prefix+"commc_inv_no",         KeyField:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",  ColMerge:1,   SaveName:prefix+"rmk",         KeyField:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",  ColMerge:1,   SaveName:prefix+"item_cd",         KeyField:1,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_no",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:20 },
			              {Type:"Text",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"item_pkgunit",         KeyField:1,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",  ColMerge:1,   SaveName:prefix+"item_pkgqty",         KeyField:1,   UpdateEdit:1,   InsertEdit:0,   Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT },
			              {Type:"Text",     Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"fix_loc_nm",         KeyField:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",  ColMerge:1,   SaveName:prefix+"item_cbm",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   Format:"Float",        PointCount:WMS_CBM_POINT_COUNT },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",  ColMerge:1,   SaveName:prefix+"item_cbf",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   Format:"Float",        PointCount:WMS_CBM_POINT_COUNT },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",  ColMerge:1,   SaveName:prefix+"item_grs_kgs",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   Format:"Float",        PointCount:WMS_KGS_POINT },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",  ColMerge:1,   SaveName:prefix+"item_grs_lbs",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   Format:"Float",        PointCount:WMS_KGS_POINT },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",  ColMerge:1,   SaveName:prefix+"item_net_kgs",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   Format:"Float",        PointCount:WMS_KGS_POINT },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",  ColMerge:1,   SaveName:prefix+"item_net_lbs",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   Format:"Float",        PointCount:WMS_KGS_POINT },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inbound_dt",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   Format:"Ymd" },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"exp_dt",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   Format:"Ymd"},
			              {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",  ColMerge:1,   SaveName:prefix+"sao_no",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:50 },
			              {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:20 },
			              {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",  ColMerge:1,   SaveName:prefix+"unit_price",         KeyField:0,   UpdateEdit:1,   InsertEdit:0,   Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT },
			              {Type:"Text",     Hidden:0,  Width:500,   Align:"Left",  ColMerge:1,   SaveName:prefix+"if_rslt",         KeyField:0,   UpdateEdit:0,   InsertEdit:0 } ];
			     
			    InitColumns(cols);
			    SetSheetHeight(580);
			    SetEditable(1);
			    SetColProperty(0,	prefix + "cust_ord_no",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "wh_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "ctrt_no",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "eq_tpsz_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "seal_no",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "eq_no",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "item_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "lot_no",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "item_pkgunit",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "fix_loc_nm",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "curr_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "trade_tp_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "fwd_tp_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "ord_tp_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "load_tp_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "sao_no",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});

		   }                           
		break;
		case 2:      //IBSheet1 init
		    with (sheetObj) {
				var HeadTitle1="SEQ";
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:HeadTitle1, Align:"Center"} ];
				InitHeaders(headers, info);
	
				var cols = [ {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq" } ];
				 
				InitColumns(cols);
				SetSheetHeight(100);
				SetEditable(1);
			}                                                      
		break;
	}
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg){
	var prefix="Grd01";
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, prefix+"if_rslt").trim() != "")
		{
			sheetObj.SetCellFontColor(i, prefix+"if_rslt","#FF0000");
		}
	}	
}
function btn_OK() {
	var formObj=document.form;
	if(validation() == false)
	{
		return;
	}
	if(ComShowCodeConfirm("COM0063")){
		doShowProcess(true);
		var sParam=FormQueryString(formObj, "");
		sParam += "&" + ComGetSaveString(sheet1,  true, true);
		var saveXml=sheet2.GetSaveData("./saveWHOutBookingExcelUploadPopupGS.clt", sParam);
		doHideProcess(false);
		//1. Save 후 조회
		if( saveXml.indexOf('<ERROR>') == -1){
			//ComShowCodeMessage("COM0093", "");
			var xmlDoc = $.parseXML(saveXml);
			var $xml = $(xmlDoc);
			var xls_no = $xml.find("xls_no").text();
			formObj.xls_no.value = xls_no;
			error_Search();
		}
	}
}
function error_Search(){
	var formObj=document.form;
	var sXml=sheet1.DoSearch("./searchWHOutBookingExcelUploadErrListGS.clt", FormQueryString(formObj, ""));
	if(sheet1.RowCount()== 0)
	{
		ComClosePopup(); 
	}
}
function validation(){
	var sheetObj=sheet1;
	var prefix="Grd01";
	if(sheetObj.RowCount()<= 0)
	{
		ComShowCodeMessage("COM0323");
		return false;
	}
	if( sheetObj.RowCount()> 0 ){
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
				//Order No , Item 필수 입력 체크
			if( sheetObj.GetCellValue(i, prefix+"wh_cd") == "" ){
					ComShowCodeMessage("COM0371", i-1, "W/H Code");
					sheetObj.SelectCell(i, prefix+"wh_cd");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"cust_ord_no") == "" ){
					ComShowCodeMessage("COM0371", i-1, "Order No");
					sheetObj.SelectCell(i, prefix+"cust_ord_no");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"ord_tp_cd") == "" ){
					ComShowCodeMessage("COM0371", i-1, "Order Type");
					sheetObj.SelectCell(i, prefix+"ord_tp_cd");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"est_out_dt") == "" ){
					ComShowCodeMessage("COM0371", i-1, "Estimated Date");
					sheetObj.SelectCell(i, prefix+"est_out_dt");
					return false;				
				}
			if(ComIsDate(sheetObj.GetCellValue(i, prefix+"est_out_dt")) == false)
				{
					alert(sheetObj.MessageText("UserMsg23"));
					sheetObj.SelectCell(i, prefix+"est_out_dt");
					return false;
				}
			if( sheetObj.GetCellValue(i, prefix+"ctrt_no") == "" ){
					ComShowCodeMessage("COM0371", i-1, "Contract");
					sheetObj.SelectCell(i, prefix+"ctrt_no");
					return false;				
				}
//				if( sheetObj.CellValue(i, prefix+"buyer_addr1") == "" ){
//					ComShowCodeMessage("COM0371", i-1, "Ship To(Addr1)");
//					sheetObj.SelectCell(i, prefix+"buyer_addr1");
//					return false;				
//				}
			if( sheetObj.GetCellValue(i, prefix+"buyer_cd").trim() == ""  && sheetObj.GetCellValue(i, prefix+"buyer_facil_cd").trim() != "")
				{
					ComShowCodeMessage("COM0371", i-1, "Ship To Code");
					sheetObj.SelectCell(i, prefix+"buyer_cd");
					return false;
				}
//				if( sheetObj.CellValue(i, prefix+"load_tp_cd") == "" ){
//					ComShowCodeMessage("COM0371", i-1, "Loading");
//					sheetObj.SelectCell(i, prefix+"load_tp_cd");
//					return false;				
//				}
//				
//				if( sheetObj.CellValue(i, prefix+"trade_tp_cd") == "" ){
//					ComShowCodeMessage("COM0371", i-1, "EID Type");
//					sheetObj.SelectCell(i, prefix+"trade_tp_cd");
//					return false;				
//				}
//				if( sheetObj.CellValue(i, prefix+"fwd_tp_cd") == "" ){
//					ComShowCodeMessage("COM0371", i-1, "FWD Type");
//					sheetObj.SelectCell(i, prefix+"fwd_tp_cd");
//					return false;				
//				}
			if( sheetObj.GetCellValue(i, prefix+"item_cd") == "" ){
					ComShowCodeMessage("COM0371", i-1, "SKU");
					sheetObj.SelectCell(i, prefix+"item_cd");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"item_pkgunit") == "" ){
					ComShowCodeMessage("COM0371", i-1, "UOM");
					sheetObj.SelectCell(i, prefix+"item_pkgunit");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"item_pkgqty") == "" ){
					ComShowCodeMessage("COM0371", i-1, "Estimated Qty");
					sheetObj.SelectCell(i, prefix+"item_pkgqty");
					return false;				
				}
			if(eval(sheetObj.GetCellValue(i, prefix+"item_pkgqty")) <= 0 ){
					ComShowCodeMessage("COM0371", i-1, "Estimated Qty");
					sheetObj.SelectCell(i, prefix+"item_pkgqty");
					return false;				
				}
			if(sheetObj.GetCellValue(i, prefix+"inbound_dt") != ""){
				if(ComIsDate(sheetObj.GetCellValue(i, prefix+"inbound_dt")) == false)
					{
					alert(sheetObj.MessageText("UserMsg23"));
						sheetObj.SelectCell(i, prefix+"inbound_dt");
						return false;
					}	
				}
			if(sheetObj.GetCellValue(i, prefix+"exp_dt") != ""){
				if(ComIsDate(sheetObj.GetCellValue(i, prefix+"exp_dt")) == false)
					{
					alert(sheetObj.MessageText("UserMsg23"));
						sheetObj.SelectCell(i, prefix+"exp_dt");
						return false;
					}	
				}
			if( sheetObj.GetCellValue(i, prefix+"wh_cd").length > 8 ){
					ComShowCodeMessage("COM0423", i-1, "W/H Code");
					sheetObj.SelectCell(i, prefix+"wh_cd");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"cust_ord_no").length > 100 ){
					ComShowCodeMessage("COM0423", i-1, "Order No");
					sheetObj.SelectCell(i, prefix+"cust_ord_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"ord_tp_cd").length > 2 ){
					ComShowCodeMessage("COM0423", i-1, "Order Type");
					sheetObj.SelectCell(i, prefix+"ord_tp_cd");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"ctrt_no").length > 10 ){
					ComShowCodeMessage("COM0423", i-1, "Contract Code");
					sheetObj.SelectCell(i, prefix+"ctrt_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"buyer_cd").length > 10 ){
					ComShowCodeMessage("COM0423", i-1, "Ship To(Code)");
					sheetObj.SelectCell(i, prefix+"buyer_cd");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"buyer_facil_cd").length > 2 ){
					ComShowCodeMessage("COM0423", i-1, "Ship To(Facility Code)");
					sheetObj.SelectCell(i, prefix+"buyer_facil_cd");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"buyer_addr1").length > 200 ){
					ComShowCodeMessage("COM0423", i-1, "Ship To(Addr1)");
					sheetObj.SelectCell(i, prefix+"buyer_addr1");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"eq_tpsz_cd").length > 4 ){
					ComShowCodeMessage("COM0423", i-1, "CNTR/TR Type");
					sheetObj.SelectCell(i, prefix+"eq_tpsz_cd");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"eq_no").length > 20 ){
					ComShowCodeMessage("COM0423", i-1, "CNTR/TR No");
					sheetObj.SelectCell(i, prefix+"eq_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"seal_no").length > 100 ){
					ComShowCodeMessage("COM0423", i-1, "Seal No");
					sheetObj.SelectCell(i, prefix+"seal_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"dlv_ord_no").length > 30 ){
					ComShowCodeMessage("COM0423", i-1, "D/O No.");
					sheetObj.SelectCell(i, prefix+"dlv_ord_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"load_tp_cd").length > 2 ){
					ComShowCodeMessage("COM0423", i-1, "Loading Type");
					sheetObj.SelectCell(i, prefix+"load_tp_cd");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"trade_tp_cd").length > 3 ){
					ComShowCodeMessage("COM0423", i-1, "EID Type");
					sheetObj.SelectCell(i, prefix+"trade_tp_cd");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"fwd_tp_cd").length > 3 ){
					ComShowCodeMessage("COM0423", i-1, "FWD Type");
					sheetObj.SelectCell(i, prefix+"fwd_tp_cd");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"mbl_no").length > 20 ){
					ComShowCodeMessage("COM0423", i-1, "M/BL No");
					sheetObj.SelectCell(i, prefix+"mbl_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"hbl_no").length > 100 ){
					ComShowCodeMessage("COM0423", i-1, "H/BL No");
					sheetObj.SelectCell(i, prefix+"hbl_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"ref_no").length > 100 ){
					ComShowCodeMessage("COM0423", i-1, "Reference No");
					sheetObj.SelectCell(i, prefix+"ref_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"commc_inv_no").length > 30 ){
					ComShowCodeMessage("COM0423", i-1, "Invoice No");
					sheetObj.SelectCell(i, prefix+"commc_inv_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"rmk").length > 100 ){
					ComShowCodeMessage("COM0423", i-1, "Remark");
					sheetObj.SelectCell(i, prefix+"rmk");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"item_cd").length > 20 ){
					ComShowCodeMessage("COM0423", i-1, "SKU Code");
					sheetObj.SelectCell(i, prefix+"item_cd");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"lot_no").length > 20 ){
					ComShowCodeMessage("COM0423", i-1, "Lot No");
					sheetObj.SelectCell(i, prefix+"lot_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"item_pkgunit").length > 5 ){
					ComShowCodeMessage("COM0423", i-1, "UOM");
					sheetObj.SelectCell(i, prefix+"item_pkgunit");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"fix_loc_nm").length > 20 ){
					ComShowCodeMessage("COM0423", i-1, "Location");
					sheetObj.SelectCell(i, prefix+"fix_loc_nm");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"sao_no").length > 50 ){
					ComShowCodeMessage("COM0423", i-1, "SO No");
					sheetObj.SelectCell(i, prefix+"sao_no");
					return false;
				}
			if( sheetObj.GetCellValue(i, prefix+"curr_cd").length > 5 ){
					ComShowCodeMessage("COM0423", i-1, "Currency");
					sheetObj.SelectCell(i, prefix+"curr_cd");
					return false;	
				}
		}
	}
	return true;
}