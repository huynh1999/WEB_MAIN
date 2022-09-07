var sheetCnt=0;
var order_dup_check = false;
var opener = window.dialogArguments;
if (!opener) opener = parent;
if (!opener) opener=window.opener;

//#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 2차
var gItemCdArray=new Array();
var gItemNmArray=new Array();

var gUomCdArray=new Array();
var gUomNmArray=new Array();
var gExcelUploadFlg = "N";

var docObjects=new Array();
function loadPage() {
	var i=0;
	for(i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//default value 셋팅
	$("#wh_cd").val($("#def_wh_cd").val());
	$("#wh_nm").val($("#def_wh_nm").val());
	$("#ctrt_no").val($("#def_wh_ctrt_no").val());
	$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
	//btn_Search();
}
/**
* IBSheet Object
*/
function doWork(srcName){
	var formObj = document.form;

	try {
		switch(srcName) {
			case "btn_upload_excel":
				// Header Info 필수 체크
				if(headerInfoValidation() == false)
				{
					return;
				}
				docObjects[0].LoadExcel({ Mode : "NoHeader ",    StartRow: "3"});
			break;
			case "SAVE":
				btn_Save();
				break;
			case "OK":
				btn_OK();
				break;
 			case "btn_ctrt_no" :
 				CtrtPopup();
				break;
 			case "btn_est_in_dt":
 				var cal=new ComCalendar();
	            cal.select(formObj.est_in_dt, 'MM-dd-yyyy');
 				break;
 			case "btn_inbound_dt":
 				var cal=new ComCalendar();
	            cal.select(formObj.inbound_dt, 'MM-dd-yyyy');
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
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:
		    with (sheetObj) {
			    var prefix="Grd01";
	
			    SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
			    var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1, Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			    var headers = [ { Text:getLabel('WHInBookingExcelUploadPopup_HDR1'), Align:"Center"},
					            { Text:getLabel('WHInBookingExcelUploadPopup_HDR2'), Align:"Center"} ];
			    InitHeaders(headers, info);
	
			    var cols = [ 
							{Type:"Combo",    Hidden:1,  Width:120,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"wh_cd",         		KeyField:1,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Combo",    Hidden:1,  Width:120,     Align:"Center",  	ColMerge:1,   SaveName:prefix+"ctrt_no",        	KeyField:1,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Text",     Hidden:1,  Width:120,     Align:"Center",  	ColMerge:1,   SaveName:prefix+"cust_ord_no",        KeyField:1,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Combo",    Hidden:1,  Width:120,     Align:"Center",  	ColMerge:1,   SaveName:prefix+"ord_tp_cd",        	KeyField:1,   UpdateEdit:1,   InsertEdit:1 ,	EditLen:2},
							{Type:"Combo",    Hidden:0,  Width:100,     Align:"Left",  		ColMerge:1,   SaveName:prefix+"item_cd",         	KeyField:1,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Combo",     Hidden:0,  Width:80,   	Align:"Left",  		ColMerge:1,   SaveName:prefix+"item_pkgunit",     	KeyField:1,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Float",     Hidden:0,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"item_pkgqty",     	KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT },
							{Type:"Float",     Hidden:0,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"item_rcv_pkgqty",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT },
							{Type:"Text", 		Hidden:1,  Width:110,    Align:"Left",  		ColMerge:1,   SaveName:prefix+"inbound_loc_cd",     KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"PopupEdit", Hidden:0,  Width:110,    Align:"Left",  		ColMerge:1,   SaveName:prefix+"inbound_loc_nm",     KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Text",     Hidden:0,  Width:100,     Align:"Center",  	ColMerge:1,   SaveName:prefix+"lot_no",         	KeyField:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
							{Type:"Text",     Hidden:0,  Width:130,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"exp_dt",         	KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"ComboEdit",     Hidden:0,  Width:80,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"lot_04",        		KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"ComboEdit",     Hidden:0,  Width:80,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"lot_05",        		KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"PopupEdit",Hidden:0,  Width:80,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"eq_tpsz_cd",         KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Text",     Hidden:0,  Width:100,     Align:"Left",  		ColMerge:1,   SaveName:prefix+"eq_no",         		KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Text",     Hidden:0,  Width:100,     Align:"Left",  		ColMerge:1,   SaveName:prefix+"seal_no",         	KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Text",     	Hidden:0, 		Width:70       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"item_ser_no",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"", EditLen:20},
							{Type:"Text",  Hidden:0, 		Width:70       ,Align:"Right",         	ColMerge:1,          SaveName:prefix+"lic_plat_no",        KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"", EditLen:20},
							{Type:"Text",     	Hidden:0, 		Width:120      ,Align:"Left",         	ColMerge:1,          SaveName:prefix+"po_no",           	KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:"" , EditLen:20},
							{Type:"Text",     Hidden:0,  Width:500,     Align:"Left",  		ColMerge:1,   SaveName:prefix+"if_rslt",         	KeyField:0,   UpdateEdit:0,   InsertEdit:1 },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"item_cbm",         	KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",        PointCount:WMS_CBM_POINT_COUNT },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"item_cbf",         	KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",        PointCount:WMS_CBM_POINT_COUNT },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"item_grs_kgs",       KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",        PointCount:WMS_WGT_POINT_COUNT },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"item_grs_lbs",       KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",        PointCount:WMS_WGT_POINT_COUNT },
							{Type:"Text",     Hidden:1,  Width:80,  	Align:"Right",  	ColMerge:1,   SaveName:prefix+"item_net_kgs",       KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",        PointCount:WMS_WGT_POINT_COUNT },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"item_net_lbs",       KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",        PointCount:WMS_WGT_POINT_COUNT },
							{Type:"Date",     Hidden:1,  Width:130,     Align:"Center",  	ColMerge:1,   SaveName:prefix+"est_in_dt",         	KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Ymd" },
							{Type:"Date",     Hidden:1,  Width:130,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"inbound_dt",         KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Ymd" },
							{Type:"Text",     Hidden:1,  Width:100,     Align:"Left",  		ColMerge:1,   SaveName:prefix+"dlv_ord_no",         KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Text",     Hidden:1,  Width:110,     Align:"Left",  		ColMerge:1,   SaveName:prefix+"mbl_no",         	KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Text",     Hidden:1,  Width:110,     Align:"Left",  		ColMerge:1,   SaveName:prefix+"hbl_no",         	KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Text",     Hidden:1,  Width:100,     Align:"Left",  		ColMerge:1,   SaveName:prefix+"ref_no",         	KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Text",     Hidden:1,  Width:100,     Align:"Left",  		ColMerge:1,   SaveName:prefix+"commc_inv_no",     	KeyField:0,   UpdateEdit:1,   InsertEdit:1 },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"inbound_pl_qty",     KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"inbound_bx_qty",     KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"inbound_ea_qty",     KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"inbound_sqft",       KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",        PointCount:WMS_CBM_POINT_COUNT },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"inbound_cbm",        KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",        PointCount:WMS_CBM_POINT_COUNT },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"trade_tp_cd",        KeyField:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"fwd_tp_cd",         	KeyField:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
							{Type:"Text",     Hidden:1,  Width:70,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"curr_cd",         	KeyField:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
							{Type:"Text",     Hidden:1,  Width:80,   	Align:"Right",  	ColMerge:1,   SaveName:prefix+"unit_price",         KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,        PointCount:WMS_QTY_POINT },
							{Type:"Status",   Hidden:1, 	Width:30,           Align:"Center",       	ColMerge:0,		  SaveName:prefix+"ibflag"}
							];

			    InitColumns(cols);
			    SetSheetHeight(350);
			    SetEditable(1);
			    SetColProperty(0,	prefix + "cust_ord_no",	{AcceptKeys:"E|[0123456789]" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
//			    SetColProperty(0,	prefix + "wh_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "ctrt_no",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "eq_tpsz_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "seal_no",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "eq_no",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "item_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "lot_no",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
//			    SetColProperty(0,	prefix + "item_pkgunit",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "fix_loc_nm",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "curr_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "trade_tp_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "fwd_tp_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "ord_tp_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "load_tp_cd",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    SetColProperty(0,	prefix + "sao_no",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			    
			    SetColProperty(prefix+"wh_cd", {ComboText:WH_TEXT, ComboCode:WH_CD} );
			    SetColProperty(prefix+"ctrt_no", {ComboText:CNTR_TEXT, ComboCode:CNTR_CD} );
			    SetColProperty(prefix+"ord_tp_cd", {ComboText:ord_tp_cdText, ComboCode:ord_tp_cdCode} );
			    SetColProperty(prefix+"item_cd", {ComboText:"|"+skuCdText, ComboCode:"|"+skuCdCode} );
			    InitComboNoMatchText(1, "",1);
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
function btn_Search()
{
	var sheetObj=sheetObjects[0];	
 	var strFilePath=sheetObjects[0].OpenFileDialog("Load Excel", "", "", "Excel Documents(*.xls; *.xlsx)|*.xls; *.xlsx");
	 if (strFilePath == "<USER_CANCEL>") {
          return;
    } 
	ComOpenWait(true);
	sheetObj.LoadExcel({ Mode:"NoHeader",WorkSheetNo:"1",StartRow:"3",EndRow:"-1",WorkSheetName:"",Append:true,ColumnMapping:""});
	ComOpenWait(false);
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg){
	
	var prefix="Grd01";
	sheetObj.InitComboNoMatchText(1, "",1);
	if(sheet1.RowCount() == 0)
	{
		opener.document.form.list_in_search_tp.value = "CUST_ORD_NO";
		opener.document.form.list_in_no.value = cust_ord_no;
		ComClosePopup(); 
	}
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, prefix+"if_rslt").trim() != "")
		{
			sheetObj.SetCellFont("FontColor", i, 0, i, sheetObj.SaveNameCol(prefix+"if_rslt"),"#FF0000");
		}
	}	
}

function btn_OK() {
	var formObj=document.form;
	var sheetObj=sheet1;
	var prefix="Grd01";
	
	sheetObj.SetColBackColor(prefix+"if_rslt", "#FFFFFF");

	if(validation() == false)
	{
		return;
	} else {
		
		if( confirm( (getLabel('FMS_COM_CFMPRO'))  ) ){
			//-------------------------------------------------------------------------------
			// Inbound Management Header 정보 설정
			//-------------------------------------------------------------------------------
			opener.document.form.wh_cd.value = $("#wh_cd").val();
			opener.document.form.cust_ord_no.value = $("#cust_ord_no").val();
			opener.document.form.ctrt_no.value = $("#ctrt_no").val();
//		opener.document.form.ctrt_nm.value = $("#ctrt_nm").val();
			opener.document.form.ord_tp_cd.value = $("#ord_tp_cd").val();
			opener.document.form.est_in_dt.value = $("#est_in_dt").val();
			opener.document.form.inbound_dt.value = $("#inbound_dt").val();
			
			doShowProcess();
			
			//-------------------------------------------------------------------------------
			// Inbound Management SKU SHEET 정보 설정
			//-------------------------------------------------------------------------------
			formObj.f_cmd.value = MODIFY;
			var sParam=FormQueryString(formObj);
			sParam += "&" + sheet1.GetSaveString(1);
			
			cust_ord_no =  sheet1.GetCellValue( sheet1.LastRow() , "Grd01cust_ord_no");
			
			var saveXml=sheet2.GetSaveData("./saveWHInBookingExcelUploadPopupGS.clt", sParam);
			sheet2.LoadSearchData(saveXml,{Sync:1} );
			//1. Save 후 조회
			if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
				var xmlDoc = $.parseXML(saveXml);
				var $xml = $(xmlDoc);
				var message = $xml.find("result").text();
				opener.document.form.xls_no.value  = $xml.find("xls_no").text();
				btn_Close();
			}
		} else {
			return;
		}
		
	}
}

var cust_ord_no ="";
var curRow;
function btn_Save() {
	order_dup_check = false;
	var formObj=document.form;
	
	var sheetObj=sheet1;
	var prefix="Grd01";
	
	sheetObj.SetColBackColor(prefix+"cust_ord_no", "#FFFFFF");
	sheetObj.SetColBackColor(prefix+"ord_tp_cd", "#FFFFFF");
	sheetObj.SetColBackColor(prefix+"if_rslt", "#FFFFFF");
	
	if(sheetObj.RowCount()<= 0)
	{
		ComShowCodeMessage("COM0323");
		return false;
	}
	// ORDER NO 중복 체크
	if( sheetObj.RowCount()> 0 ){
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
			// Result Message 초기화
			sheetObj.SetCellValue(i, prefix+"if_rslt","");
			curRow = i;
			ajaxSendPost(checkDuplicateOrderNo, 'reqVal', '&goWhere=aj&bcKey=checkDuplicateOrderNo&cust_ord_no='+sheetObj.GetCellValue(i, prefix+"cust_ord_no") + "&wh_cd=" + sheetObj.GetCellValue(i, prefix+"wh_cd") + "&ctrt_no=" + sheetObj.GetCellValue(i, prefix+"ctrt_no"), './GateServlet.gsl');
		}
	}
	if (order_dup_check) {
		return;
	} 
	
	if(validation() == false)
	{
		return;
	}
	if(ComShowCodeConfirm("COM0063")){
		formObj.f_cmd.value = MODIFY;
		var sParam=FormQueryString(formObj);
		sParam += "&" + sheet1.GetSaveString(1);
		
		cust_ord_no =  sheet1.GetCellValue( sheet1.LastRow() , "Grd01cust_ord_no");
		
		var saveXml=sheet2.GetSaveData("./saveWHInBookingExcelUploadPopupGS.clt", sParam);
		sheet2.LoadSearchData(saveXml,{Sync:1} );
		//1. Save 후 조회
		if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
			var xmlDoc = $.parseXML(saveXml);
			var $xml = $(xmlDoc);
			var message = $xml.find("result").text();
			formObj.xls_no.value  = $xml.find("xls_no").text();
			error_Search();
		}
	}
}
function error_Search(){
	var formObj=document.form;
	formObj.f_cmd.value = SEARCH;
	var sXml=sheet1.GetSearchData("./searchWHInBookingExcelUploadErrListGS.clt", FormQueryString(formObj) );
	sheet1.LoadSearchData(sXml,{Sync:1} );
	showCompleteProcess();
}

function headerInfoValidation() {
	var formObj=document.form;
	// 필수체크
	if(ComIsEmpty(formObj.cust_ord_no)){
		ComShowCodeMessage("COM0114","Order No");
		$("#cust_ord_no").focus();
		return false;
	}
	if(ComIsEmpty(formObj.ord_tp_cd)){
		ComShowCodeMessage("COM0114","Order Type");
		$("#ord_tp_cd").focus();
		return false;
	}
	if(ComIsEmpty(formObj.ctrt_no)){
		ComShowCodeMessage("COM0114","Contract No");
		$("#ctrt_no").focus();
		return false;
	}
	if(ComIsEmpty(formObj.wh_cd))
	{
		ComShowCodeMessage("COM0114","Warehouse");
		$("#wh_cd").focus();
		return false;
	}
	if(ComIsEmpty(formObj.est_in_dt))
	{
		ComShowCodeMessage("COM0114","Estimate Date");
		$("#est_in_dt").focus();
		return false;
	}
}

function validation(){
	var formObj=document.form;
	var sheetObj=sheet1;
	var prefix="Grd01";
	if(sheetObj.RowCount()<= 0)
	{
		ComShowCodeMessage("COM0185", "(Booking Excel Upload Data)");
		return false;
	}
	// 필수체크
	if(ComIsEmpty(formObj.cust_ord_no)){
		ComShowCodeMessage("COM0114","Order No");
		$("#cust_ord_no").focus();
		return false;
	}
	if(ComIsEmpty(formObj.ord_tp_cd)){
		ComShowCodeMessage("COM0114","Order Type");
		$("#ord_tp_cd").focus();
		return false;
	}
	if(ComIsEmpty(formObj.ctrt_no)){
		ComShowCodeMessage("COM0114","Contract No");
		$("#ctrt_no").focus();
		return false;
	}
	if(ComIsEmpty(formObj.wh_cd))
	{
		ComShowCodeMessage("COM0114","Warehouse");
		$("#wh_cd").focus();
		return false;
	}
	if(ComIsEmpty(formObj.est_in_dt))
	{
		ComShowCodeMessage("COM0114","Estimate Date");
		$("#est_in_dt").focus();
		return false;
	}
	
	if( sheetObj.RowCount()> 0 ){
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
			/*
			//Order No , Item 필수 입력 체크
			if( sheetObj.GetCellValue(i, prefix+"wh_cd") == "" ){
					//ComShowCodeMessage("COM0371", i-1, "W/H Code");
					ComShowCodeMessage("COM0569", i-1);
					sheetObj.SelectCell(i, prefix+"wh_cd");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"ctrt_no") == "" ){
					//ComShowCodeMessage("COM0371", i-1, "Contract Code");
					ComShowCodeMessage("COM0570", i-1);
					sheetObj.SelectCell(i, prefix+"ctrt_no");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"cust_ord_no") == "" ){
					//ComShowCodeMessage("COM0371", i-1, "Order No");
					ComShowCodeMessage("COM0571", i-1);
					sheetObj.SelectCell(i, prefix+"cust_ord_no");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"ord_tp_cd") == "" ){
//					//ComShowCodeMessage("COM0371", i-1, "Order Type");
					ComShowCodeMessage("COM0572", i-1);
					sheetObj.SelectCell(i, prefix+"ord_tp_cd");
					return false;	
					//sheetObj.SetCellValue(i, prefix+"ord_tp_cd",'G',0);
				}
			if( sheetObj.GetCellValue(i, prefix+"est_in_dt") == "" ){
					//ComShowCodeMessage("COM0371", i-1, "Estimated Date");
					ComShowCodeMessage("COM0573", i-1);
					return false;				
				}
			if(ComIsDate(sheetObj.GetCellValue(i, prefix+"est_in_dt")) == false){
 					alert(sheetObj.MessageText("UserMsg23"));
					sheetObj.SelectCell(i, prefix+"est_in_dt");
					return false;
				}
			*/
			
			if( sheetObj.GetCellValue(i, prefix+"trade_tp_cd") == "" ){
					//ComShowCodeMessage("COM0371", i-1, "EID Type");
//					ComShowCodeMessage("COM0574", i-1);
//					sheetObj.SelectCell(i, prefix+"trade_tp_cd");
//					return false;	
					sheetObj.SetCellValue(i, prefix+"trade_tp_cd",'DOM',0);
				}
			if( sheetObj.GetCellValue(i, prefix+"fwd_tp_cd") == "" ){
					//ComShowCodeMessage("COM0371", i-1, "FWD Type");
//					ComShowCodeMessage("COM0575", i-1);
//					sheetObj.SelectCell(i, prefix+"fwd_tp_cd");
//					return false;	
					sheetObj.SetCellValue(i, prefix+"fwd_tp_cd",'OTH',0);
				}
			if( sheetObj.GetCellValue(i, prefix+"item_cd") == "" ){
					//ComShowCodeMessage("COM0371", i-1, "SKU Code");
					ComShowCodeMessage("COM0549", i-1);
					sheetObj.SelectCell(i, prefix+"item_cd");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"item_pkgunit") == "" ){
					//ComShowCodeMessage("COM0371", i-1, "UOM");
					ComShowCodeMessage("COM0576", i-1);
					sheetObj.SelectCell(i, prefix+"item_pkgunit");
					return false;				
				}
			if(sheetObj.GetCellValue(i, prefix+"inbound_dt") != ""){
				if(ComIsDate(sheetObj.GetCellValue(i, prefix+"inbound_dt")) == false){
 						alert(sheetObj.MessageText("UserMsg23"));
						sheetObj.SelectCell(i, prefix+"inbound_dt");
						return false;
					}	
				}
//				var item_pkgqty = eval(sheetObj.CellValue(i, prefix + "item_pkgqty")); //est qty
//				if(item_pkgqty <= 0)
//				{
//					ComShowCodeMessage("COM0371", i-1, "Estimated Qty");
//					sheetObj.SelectCell(i, prefix+"item_pkgqty");
//					return false;
//				}
			if( sheetObj.GetCellValue(i, prefix+"wh_cd").length > 8 ){
					//ComShowCodeMessage("COM0423", i-1, "W/H Code");
					ComShowCodeMessage("COM0577", i-1);
					sheetObj.SelectCell(i, prefix+"wh_cd");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"ctrt_no").length > 10 ){
					//ComShowCodeMessage("COM0423", i-1, "Contract Code");
					ComShowCodeMessage("COM0578", i-1);
					sheetObj.SelectCell(i, prefix+"ctrt_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"cust_ord_no").length > 100 ){
					//ComShowCodeMessage("COM0423", i-1, "Order No");
					ComShowCodeMessage("COM0579", i-1);
					sheetObj.SelectCell(i, prefix+"cust_ord_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"ord_tp_cd").length > 2 ){
					//ComShowCodeMessage("COM0423", i-1, "Order Type");
					ComShowCodeMessage("COM0580", i-1);
					sheetObj.SelectCell(i, prefix+"ord_tp_cd");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"trade_tp_cd").length > 3 ){
					//ComShowCodeMessage("COM0423", i-1, "EID Type");
					ComShowCodeMessage("COM0581", i-1);
					sheetObj.SelectCell(i, prefix+"trade_tp_cd");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"fwd_tp_cd").length > 3 ){
					//ComShowCodeMessage("COM0423", i-1, "FWD Type");
					ComShowCodeMessage("COM0582", i-1);
					sheetObj.SelectCell(i, prefix+"fwd_tp_cd");
					return false;				
				}
			if( sheetObj.GetCellValue(i, prefix+"item_cd").length > 20 ){
					//ComShowCodeMessage("COM0423", i-1, "SKU Code");
					ComShowCodeMessage("COM0552", i-1);
					sheetObj.SelectCell(i, prefix+"item_cd");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"lot_no").length > 50 ){
					//ComShowCodeMessage("COM0423", i-1, "Lot No");
					ComShowCodeMessage("COM0583", i-1);
					sheetObj.SelectCell(i, prefix+"lot_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"item_pkgunit").length > 20 ){
					//ComShowCodeMessage("COM0423", i-1, "UOM");
					ComShowCodeMessage("COM0584", i-1);
					sheetObj.SelectCell(i, prefix+"item_pkgunit");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"inbound_loc_nm").length > 20 ){
					//ComShowCodeMessage("COM0423", i-1, "Location");
					ComShowCodeMessage("COM0585", i-1);
					sheetObj.SelectCell(i, prefix+"inbound_loc_nm");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"eq_tpsz_cd").length > 20 ){
					//ComShowCodeMessage("COM0423", i-1, "CNTR/TR Type");
					ComShowCodeMessage("COM0586", i-1);
					sheetObj.SelectCell(i, prefix+"eq_tpsz_cd");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"eq_no").length > 20 ){
					//ComShowCodeMessage("COM0423", i-1, "CNTR/TR No");
					ComShowCodeMessage("COM0587", i-1);
					sheetObj.SelectCell(i, prefix+"eq_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"seal_no").length > 100 ){
					//ComShowCodeMessage("COM0423", i-1, "Seal No");
					ComShowCodeMessage("COM0588", i-1);
					sheetObj.SelectCell(i, prefix+"seal_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"dlv_ord_no").length > 30 ){
					//ComShowCodeMessage("COM0423", i-1, "D/O No.");
					ComShowCodeMessage("COM0589", i-1);
					sheetObj.SelectCell(i, prefix+"dlv_ord_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"mbl_no").length > 20 ){
					//ComShowCodeMessage("COM0423", i-1, "M/BL No");
					ComShowCodeMessage("COM0590", i-1);
					sheetObj.SelectCell(i, prefix+"mbl_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"hbl_no").length > 100 ){
					//ComShowCodeMessage("COM0423", i-1, "H/BL No");
					ComShowCodeMessage("COM0591", i-1);
					sheetObj.SelectCell(i, prefix+"hbl_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"ref_no").length > 100 ){
					//ComShowCodeMessage("COM0423", i-1, "Reference No");
					ComShowCodeMessage("COM0592", i-1);
					sheetObj.SelectCell(i, prefix+"ref_no");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"commc_inv_no").length > 30 ){
					//ComShowCodeMessage("COM0423", i-1, "Invoice No");
					ComShowCodeMessage("COM0593", i-1);
					sheetObj.SelectCell(i, prefix+"commc_inv_no");
					return false;	
				}
			if(sheetObj.GetCellValue(i, prefix+"exp_dt") != ""){
				if(ComIsDate(sheetObj.GetCellValue(i, prefix+"exp_dt")) == false)
					{
 						alert(sheetObj.MessageText("UserMsg23"));
						sheetObj.SelectCell(i, prefix+"exp_dt");
						return false;
					}	
				}
			if( sheetObj.GetCellValue(i, prefix+"lot_04").length > 50 ){
					ComShowCodeMessage("COM0694", i-1);
					sheetObj.SelectCell(i, prefix+"lot_04");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"lot_05").length > 50 ){
					ComShowCodeMessage("COM0695", i-1);
					sheetObj.SelectCell(i, prefix+"lot_05");
					return false;	
				}
			if( sheetObj.GetCellValue(i, prefix+"curr_cd").length > 5 ){
					ComShowCodeMessage("COM0565", i-1);
					sheetObj.SelectCell(i, prefix+"curr_cd");
					return false;	
				}
			
			// 동일 Order No에는 동일 Order Type으로 등록되어야 한다.
			if (0 < i < sheetObj.LastRow()) {
				if (sheetObj.GetCellValue(i-1, prefix+"cust_ord_no") == sheetObj.GetCellValue(i, prefix+"cust_ord_no")) {
					if (sheetObj.GetCellValue(i-1, prefix+"ord_tp_cd") != sheetObj.GetCellValue(i, prefix+"ord_tp_cd")) {
						sheetObj.SetCellValue(i, prefix+"ord_tp_cd","",0);
						sheetObj.SetCellValue(i, prefix+"if_rslt","You should input same order type under the same order no.");
						sheetObj.SetColBackColor(prefix+"ord_tp_cd", "#FFCCFF");
						sheetObj.SetColBackColor(prefix+"if_rslt", "#FFCCFF");
						sheetObj.SelectCell(i, prefix+"if_rslt");
						return false;	
					}
				}
			}
		}		
	}
	return true;
}

/**
 * AJAX RETURN
 * Check Dup Order No
 */
function checkDuplicateOrderNo(reqVal){
	var formObj=document.form;
	var sheetObj = sheet1;
	var prefix = "Grd01";
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				if (!order_dup_check) {
					ComShowCodeMessage("COM131302", "Order No");
				}
				sheetObj.SetColBackColor(prefix+"cust_ord_no", "#FFCCFF");
				sheetObj.SelectCell(curRow, prefix+"cust_ord_no");
				order_dup_check = true;
				return false;
			}
		}
	}
}

function sheet1_OnPopupClick(sheetObj, Row, Col) {
	var formObj=document.form;
	var prefix="Grd01";
	var colName=sheetObj.ColSaveName(Col);
	var colValue=sheetObj.GetCellValue(Row, Col) ;
	var cal=new ComCalendarGrid();
	with(sheetObj)
	{
		if (colName == (prefix+"item_pkgunit") ) {
			callBackFunc = "setPkgunitGrid";
		    modal_center_open('./CommonCodePopup.clt?grp_cd=A6&code=' + colValue, callBackFunc, 400, 520,"yes");
		} 
		else if ( colName == prefix + "inbound_loc_nm" ) 
		{
			var sUrl="./WarehouseLocPopup.clt?f_loc_cd="+ sheetObj.GetCellValue(Row, prefix+"wh_cd")
			                             + "&f_putaway_flg=Y&f_move_flg=Y&f_not_loc_prop=DMG";			

			callBackFunc = "setInboundLocInfoGrid";
			modal_center_open(sUrl, '', 700, 500,"yes");
		}else if ( colName == prefix + "eq_tpsz_cd" ) {
			
			var eq_tp_cd=sheetObj.GetCellValue(Row, (prefix+"eq_tp_cd"));
			var code="A";
			if (!ComIsNull(eq_tp_cd)) {
				code=eq_tp_cd;
			}
			sUrl="./ContainerTypePopup.clt?type="+code+"&eq_unit="+"";
			callBackFunc = "setIbContainerTypeInfo";
			modal_center_open(sUrl, callBackFunc, 400, 590,"yes");
		}
	}
}

function setIbContainerTypeInfo(rtnVal){
	var prefix="Grd01";
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValArr = rtnVal.split("|");
		var sheetObj=sheet1;
		var prefix="Grd01";
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"eq_tpsz_cd",rtnValArr[0]);
//		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"eq_tp_cd",rtnValArr[2]);
	}
}

function setPkgunitGrid(rtnVal) {

	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		var prefix="Grd01";
		sheet1.SetCellValue(sheet1.GetSelectRow(), prefix+"item_pkgunit",rtnValAry[1]);
	}
}

function sheet1_OnChange(sheetObj, Row, Col, Value) {
	var formObj=document.form;
	var prefix = "Grd01";
	curRow=Row;
	var colStr=sheetObj.ColSaveName(Col);
    if(colStr == "Grd01ctrt_no")
	{
		if(sheet1.RowCount()> 0)
		{
			// SKU ComboList조회
			var p_wh_cd = formObj.wh_cd.value;
			curRow = Row;

			//#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 2차
			//ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+Value, './GateServlet.gsl');
			return;
		}
	} else if (colStr == "Grd01item_cd") {
		// SKU에 해당하는 UOM Combo List조회
		curRow = Row;
		var p_ctrt_no = formObj.ctrt_no.value;
		var p_item_cd = sheet1.GetCellValue(Row, "Grd01item_cd");
		ajaxSendPost(dispAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchAjWHUomCodeForItem&item_cd='+p_item_cd+'&ctrt_no='+p_ctrt_no, './GateServlet.gsl');
		
		// LOT4, LOT5 조회
		var sParam="ctrt_no=" + formObj.ctrt_no.value + "&item_cd=" + encodeURIComponent(Value) + "&wh_cd=" + formObj.wh_cd.value;
		ajaxSendPost(resultsearchWHItemCodeInfo, Row, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
	} else if (colStr == "Grd01wh_cd") {
//		sheet1.SetCellValue(Row, prefix + "inbound_loc_nm", "" );
		if (ComIsNull(sheetObj.GetCellValue(Row, prefix+"wh_cd"))) {
			sheetObj.SetCellEditable(Row, prefix + "inbound_loc_nm",0);
		} else {
			sheetObj.SetCellEditable(Row, prefix + "inbound_loc_nm",1);
		}
	}
}

function resultsearchWHItemCodeInfo (reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	var sheetObj = sheet1;
	var prefix = "Grd01";
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			var prefix= "Grd01";
			if(rtnArr[0] != ""){
				if(ComIsNull(sheetObj.GetCellValue(Row, prefix+"inbound_loc_cd")))
				{
					sheetObj.SetCellValue(Row, prefix+"inbound_loc_cd",rtnArr[24],0);
					sheetObj.SetCellValue(Row, prefix+"inbound_loc_nm",rtnArr[25],0);
				}
				
				sheetObj.CellComboItem(Row,prefix+"lot_04",	{ComboText:rtnArr[30], ComboCode: rtnArr[30]} );
				sheetObj.CellComboItem(Row,prefix+"lot_05",	{ComboText:rtnArr[31], ComboCode: rtnArr[31]} );
			}
		}
	}
}

function dispAjaxReq(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				//특정 셀의 콤보 항목 바꾸기
				sheet1.CellComboItem(curRow,"Grd01item_cd",{ComboText:rtnArr[0], ComboCode:rtnArr[1]} );
				
				// SKU에 해당하는 UOM Combo List조회
				var p_ctrt_no = formObj.ctrt_no.value;
				var p_item_cd = sheet1.GetCellValue(curRow, "Grd01item_cd");
				ajaxSendPost(dispAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchAjWHUomCodeForItem&item_cd='+p_item_cd+'&ctrt_no='+p_ctrt_no, './GateServlet.gsl');
				// LOT4, LOT5 조회
				var sParam="ctrt_no=" + p_ctrt_no + "&item_cd=" + encodeURIComponent(p_item_cd) + "&wh_cd=" + formObj.wh_cd.value;
				ajaxSendPost(resultsearchWHItemCodeInfo, curRow, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
			}
			else{
//				ComShowCodeMessage("COM130401");
			}
		}
		else{
//			ComShowCodeMessage("COM130401");
		}
	}
}

function dispAjaxReq2(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				//특정 셀의 콤보 항목 바꾸기
				sheet1.CellComboItem(curRow,"Grd01item_pkgunit",{ComboText:rtnArr[1], ComboCode:rtnArr[0]} );
			}
			else{
//				ComShowCodeMessage("COM130401");
			}
		}
		else{
//			ComShowCodeMessage("COM130401");
		}
	}
}

function sheet1_OnLoadExcel(sheetObj) {
	var prefix="Grd01";
	//#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 2차
	if(sheetObj.RowCount() >500){
		sheetObj.RemoveAll();
		//doShowProcess();
		alert("Up to 500 lines can be uploaded to Excel.");
		return;
	}
	gExcelUploadFlg = "N";
	if( sheetObj.RowCount()> 0 ){
		var ctrt_no=$("#ctrt_no").val();
		var wh_cd=$("#wh_cd").val();
		var cust_ord_no=$("#cust_ord_no").val();
		var ord_tp_cd=$("#ord_tp_cd").val();
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
			if (!ComIsNull(ctrt_no)) {
				sheetObj.SetCellValue(i, prefix+"ctrt_no", ctrt_no);
			}
			if (!ComIsNull(wh_cd)) {
				sheetObj.SetCellValue(i, prefix+"wh_cd", wh_cd);
			}
			if (!ComIsNull(cust_ord_no)) {
				sheetObj.SetCellValue(i, prefix+"cust_ord_no", cust_ord_no);
			}
			if (!ComIsNull(ord_tp_cd)) {
				sheetObj.SetCellValue(i, prefix+"ord_tp_cd", ord_tp_cd);
			}
			if( !ComIsNull(sheetObj.GetCellValue(i, prefix+"ctrt_no"))){	
				// SKU ComboList조회
				var p_wh_cd = sheet1.GetCellValue(i, prefix + "wh_cd");
				var p_ctrt_no = sheet1.GetCellValue(i, prefix + "ctrt_no");
				curRow = i;
				
				//#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 2차
				//ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');
				//console.log("sheet1_OnLoadExcel: ", i);
				
				if(gExcelUploadFlg == "N"){
					ajaxSendPost(returnItemUomSet, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');
					gExcelUploadFlg = "Y";
				}
				//특정 셀의 콤보 항목 바꾸기
				var idx   = sheetObj.GetComboInfo(curRow,prefix+"item_cd", "SelectedIndex");
				sheet1.CellComboItem(curRow,"Grd01item_pkgunit",{ComboText:gUomCdArray[idx], ComboCode:gUomNmArray[idx]} );	
				
				sheetObj.SetCellValue(curRow, prefix+"inbound_loc_cd","QC010101",0);// wh_loc_cd
				sheetObj.SetCellValue(curRow, prefix+"inbound_loc_nm","QC",0);// wh_loc_nm

			}
			
			if (ComIsNull(sheetObj.GetCellValue(i, prefix+"wh_cd"))) {
				sheetObj.SetCellEditable(i, prefix + "inbound_loc_nm",0);
			} else {
				sheetObj.SetCellEditable(i, prefix + "inbound_loc_nm",1);
			}
		}
	}
}
//#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 2차
function returnItemUomSet(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);

	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				//특정 셀의 콤보 항목 바꾸기
				//sheet1.CellComboItem(curRow,"Grd01item_cd",{ComboText:rtnArr[0], ComboCode:rtnArr[1]} );
				
				sheet1.SetColProperty("Grd01item_cd", {ComboText:""+rtnArr[0], ComboCode:""+rtnArr[1]} );
				
				gItemCdArray = rtnArr[0];
				gItemNmArray = rtnArr[1];
				
				parent.rtnItemCdArray = rtnArr[0];
				parent.rtnItemNmArray = rtnArr[1];
				
				gUomCdArray = rtnArr[2].split('^*^');
				gUomNmArray = rtnArr[3].split('^*^');
				
			}
			else{
//				ComShowCodeMessage("COM130401");
			}
		}
		else{
//			ComShowCodeMessage("COM130401");
		}
	}
}

function setInboundLocInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	var prefix="Grd01";
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
	}else{
		aryPopupData = aryPopupData.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"inbound_loc_cd",aryPopupData[0],0);// wh_loc_cd
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),aryPopupData[1],0);// wh_loc_nm
	}
}

// Contract Info 팝업
function CtrtPopup(div){
	var formObj = document.form;

	var ctrt_no=$("#ctrt_no").val();
	var ctrt_nm=$("#ctrt_nm").val();

	var ord_tp_lvl1_cd="\'P\'";
	var pnl_svc_tp_cd="44";
	var sUrl="ContractRoutePopup.clt?ctrt_no=" + "&ctrt_nm="+ctrt_nm+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd + "&pnl_svc_tp_cd=" + pnl_svc_tp_cd;
    callBackFunc ="setCtrtNoInfo";
    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");

}

function setCtrtNoInfo(aryPopupData){
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	}

	setCtrtInfo(aryPopupData);
}

function setCtrtInfo(rtnVal)
{
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var formObj=document.form;
		
		//#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 2차
		var sheetObj=sheet1;
		var temp = formObj.ctrt_no.value;
		if(ctrt_no != rtnValAry[13]){
			sheetObj.RemoveAll();
		}
		
		formObj.ctrt_no.value = rtnValAry[13];
		formObj.ctrt_nm.value = rtnValAry[14];
	}
}

var ctrt_name = "";
function getCtrtInfo(obj){
	ctrt_name = obj.name;
	
	//#2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 2차
	var sheetObj=sheet1;
	sheetObj.RemoveAll();		
		
	if(obj.value != ""){
		var ord_tp_lvl1_cd="\'P\'";
		var pnl_svc_tp_cd="44";
		ajaxSendPost(resultCtrtInfo, 'reqVal', "&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no="+obj.value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd+"&pnl_svc_tp_cd=" + pnl_svc_tp_cd, './GateServlet.gsl');
	}
	else
	{
		$("#ctrt_nm").val("");
	}
}

function resultCtrtInfo(reqVal) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	//var sheetObj = sheet1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');

			if(rtnArr[0] != ""){
				$("#ctrt_nm").val(rtnArr[0]);
			}else{		
				$("#ctrt_no").val("");
				$("#ctrt_nm").val("");
			}
		}
	}
}

function custOrdNoDupCheck(obj) {
	ajaxSendPost(checkDuplicateOrderNoForm, 'reqVal', '&goWhere=aj&bcKey=checkDuplicateOrderNo&cust_ord_no='+obj.value + "&wh_cd=" + $("#wh_cd").val() + "&ctrt_no=" + $("#ctrt_no").val(), './GateServlet.gsl');
}

/**
 * AJAX RETURN
 * Check Dup Order No
 */
function checkDuplicateOrderNoForm(reqVal){
	var formObj=document.form;

	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				ComShowCodeMessage("COM131302", "Order No");
				formObj.cust_ord_no.value = "";
				formObj.cust_ord_no.focus();
				return false;
			}
		}
	}
}