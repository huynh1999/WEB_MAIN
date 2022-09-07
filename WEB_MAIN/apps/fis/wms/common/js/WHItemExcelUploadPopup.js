/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHItemExcelUploadPopup.js
*@FileTitle  : Excel Upload for Warehouse Supplier Booking
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/22
=========================================================--*/

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
			  SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
			  var hdr1 = "|Contract No|Item|Item Name(*)|HTS Code|Group Code|Level 1|Level 1|Level 2|Level 2|Level 3|Level 3|Level 4|Level 4|Length|Width|Height|CBM|CFT|G.KG|G.LB|N.KG|N.LB|Standard PL Qty|Over PL Weighting|Alternative Code|Barcode No.|Safety Stock Qty";
			  var hdr2 = "|Contract No|Item|Item Name(*)|HTS Code|Group Code|Unit(*)|Qty|Unit|Qty|Unit|Qty|Unit|Qty|Length|Width|Height|CBM|CFT|G.KG|G.LB|N.KG|N.LB|Standard PL Qty|Over PL Weighting|Alternative Code|Barcode No.|Safety Stock Qty";
			  var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"},
		                      { Text:hdr2, Align:"Center"} ];
		      InitHeaders(headers, info);

		      var cols = [ 
					 {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
					 {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"item_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hts_no",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_grp_cd",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_grp_cd",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		             {Type:"PopupEdit", Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"pkg_lv1_unit_cd", KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		             {Type:"Text",      Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:"pkg_lv1_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
		             {Type:"PopupEdit", Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"item_pkgunit",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		             {Type:"Text",      Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:"item_pkgbaseqty", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"PopupEdit", Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"pkg_lv3_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		             {Type:"Text",      Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:"pkg_lv3_qty",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"PopupEdit", Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"pkg_lv4_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		             {Type:"Text",      Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:"pkg_lv4_qty",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"lv1_length",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"lv1_width",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"lv1_height",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"lv1_cbm",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"lv1_cbf",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"lv1_grs_kgs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"lv1_grs_lbs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"lv1_net_kgs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"lv1_net_lbs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"pkg_pl_std_qty",  KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"pkg_pl_over_wgt", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             
		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"alter_item_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"barcode_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Int",       Hidden:1,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"safe_stc_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
		       
		      InitColumns(cols);
			  SetSheetHeight(380);
		      SetEditable(1);
		      SetColProperty(0 ,"item_cd" , {AcceptKeys:"E|[0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\]" , InputCaseSensitive:1});
		      SetColProperty(0 ,"item_nm" , {AcceptKeys:"E|[0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\]" , InputCaseSensitive:1});
		      SetColProperty(0 ,"pkg_lv1_unit_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,"item_pkgunit" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,"pkg_lv3_unit_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,"pkg_lv4_unit_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,"pkg_lv1_qty" , {AcceptKeys:"[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,"pkg_lv3_qty" , {AcceptKeys:"[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,"pkg_lv4_qty" , {AcceptKeys:"[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,"item_pkgbaseqty" , {AcceptKeys:"[0123456789]" , InputCaseSensitive:1});
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
function sheet1_OnLoadExcel(){
	docObjects[0].CheckAll("del_chk",1);
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
	if (sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "item_cd") == -1){
		ComShowCodeConfirm("COM12189");
	}else {
	sheetObj=docObjects[0];
	var retArray=new Array();
	//0-9
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "ibflag" 			 );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "ctrt_no"            );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "item_cd"            );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "item_nm"            );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "hts_no"             );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "item_grp_cd"        );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "item_grp_cd"        );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "pkg_lv1_unit_cd"    );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "pkg_lv1_qty"        );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "item_pkgunit"       );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "item_pkgbaseqty"    );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "pkg_lv3_unit_cd"    );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "pkg_lv3_qty"        );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "pkg_lv4_unit_cd"    );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "pkg_lv4_qty"        );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "lv1_length"         );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "lv1_width"          );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "lv1_height"         );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "lv1_cbm"            );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "lv1_cbf"            );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "lv1_grs_kgs"        );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "lv1_grs_lbs"        );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "lv1_net_kgs"        );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "lv1_net_lbs"        );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "pkg_pl_std_qty"     );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "pkg_pl_over_wgt"    );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "alter_item_cd"      );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "barcode_no"         );
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "safe_stc_qty"       );
	ComClosePopup(retArray); 
	}
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
			sheet1.LoadExcel({ Mode : "NoHeader ",    StartRow: "3"});
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