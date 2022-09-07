/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutExcelUploadPopup.js
*@FileTitle  : Outbound Booking ExcelUpload Popup
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/17
=========================================================*/
var docObjects=new Array();
var rtnary=new Array(2);
var callBackFunc = "";
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var itemChkMsg01 = "Error:Item Code Mismatch";
var itemChkMsg02 = "Error:Item Unit Mismatch";
 
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}	
}
function btn_Search() {
	var formObj=document.form;
	var sheetObj=docObjects[0];
	formObj.f_cmd.value=SEARCH;
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
    	custItemCd=sheetObj.GetCellValue(i, "cust_item_cd");
    	itemCdValue=sheetObj.GetCellValue(i, "item_cd");
    	var param="ctrt_no="+ctrt_no+"&cust_item_cd="+custItemCd+"&item_cd="+itemCdValue;
     	var sXml=sheetObj.GetSearchData("searchExcelItemSysNo.clt", param);
    	var itemSysNo=getXmlData(sXml, "item_sys_no");
    	if (!ComIsEmpty(itemSysNo)) {
    		sheetObj.SetCellValue(i,"chk",1,0);
	    	sheetObj.SetCellValue(i,"item_sys_no",itemSysNo,0);
			sheetObj.SetCellValue(i, "pkg_lv1_qty",getXmlDataNullToNullString(sXml, "pkg_lv1_qty"),0);
			sheetObj.SetCellValue(i, "lv1_cbm",getXmlDataNullToNullString(sXml, "lv1_cbm"),0);
			sheetObj.SetCellValue(i, "lv1_cbf",getXmlDataNullToNullString(sXml, "lv1_cbf"),0);
			sheetObj.SetCellValue(i, "lv1_grs_kgs",getXmlDataNullToNullString(sXml, "lv1_grs_kgs"),0);
			sheetObj.SetCellValue(i, "lv1_grs_lbs",getXmlDataNullToNullString(sXml, "lv1_grs_lbs"),0);
			sheetObj.SetCellValue(i, "lv1_net_kgs",getXmlDataNullToNullString(sXml, "lv1_net_kgs"),0);
			sheetObj.SetCellValue(i, "lv1_net_lbs",getXmlDataNullToNullString(sXml, "lv1_net_lbs"),0);
    	} else {
    		sheetObj.SetCellValue(i,"chk",0);
    	}
    }	
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1: 		
		    with(sheetObj){
		  SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, DataRowMerge:1 } );
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WHOutExcelUploadPopup_HDR1'), Align:"Center"},
	                      { Text:getLabel('WHOutExcelUploadPopup_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk" },
	             {Type:"Text",      Hidden:0,  Width:95,   Align:"Center",  ColMerge:1,   SaveName:"item_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"item_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"lot_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"item_pkgunit",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",   	Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"item_pkgqty",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"item_cbm",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"item_cbf",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"item_grs_kgs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"item_grs_lbs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"item_net_kgs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"item_net_lbs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"inbound_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"exp_dt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"lot_04",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"lot_05",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:95,   Align:"Center",  ColMerge:1,   SaveName:"cust_item_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:115,  Align:"Center",  ColMerge:1,   SaveName:"sao_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"unit_price",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	             //hidden
	             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"item_sys_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",      	Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"item_ea_qty",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",       Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"pkg_lv1_qty",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_cbm",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_cbf",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_grs_kgs",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_grs_lbs",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_net_kgs",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_net_lbs",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
	             {Type:"Text",      Hidden:1,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"pkg_info",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	             {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(320);//320/165
	      SetEditable(1);
	      SetColProperty("inbound_dt", {Format:"####-##-##"} );
	      SetColProperty("exp_dt", {Format:"####-##-##"} );
	      
//	      SetColProperty(0 ,"item_cd" , {AcceptKeys:"E|[0123456789][()_-+.&/@#!%^*$~` ]" , InputCaseSensitive:1});
	      SetColProperty(0 ,"item_cd" , {AcceptKeys:"E|[0123456789]" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
	      SetColProperty(0 ,"item_nm" , {AcceptKeys:"E|[0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\]" , InputCaseSensitive:1});
	      SetColProperty(0 ,"item_pkgunit" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      
	      resizeSheet();
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

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "btn_upload_excel":
			docObjects[0].LoadExcel({ Mode : "NoHeader ",    StartRow: "2"});
			break;
		case "btn_OK":
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
function base_process(){
	var sheetObj=docObjects[0];
    var rowcnt=sheetObj.RowCount()+2;
    for(var i=2;i<rowcnt; i++){
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
	var item_pkgqty=sheetObj.GetCellValue(Row, "item_pkgqty").trim();
	var ctrt_no=ComGetObjValue(formObj.ctrt_no) ;
	var item_sys_no=sheetObj.GetCellValue(Row, "item_sys_no").trim();
	if (item_pkgunit == "" && item_pkgqty > 0) {
	}
	/*$.ajax({
		url : "searchPutawayEaQty.clt?putaway_pkgunit=" + item_pkgunit 
			                      + "&putaway_pkgqty=" + item_pkgqty
			                      + "&ctrt_no="        + ctrt_no
			                      + "&item_sys_no="    + item_sys_no
		    ,
		success : function(result) {
			resultCalcItemEaQty(result.xml, sheetObj, Row, Col);
		}
	});*/
	var sXml=docObjects[0].GetSearchData("searchPutawayEaQty.clt?putaway_pkgunit=" + item_pkgunit 
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
	}
	if (suYn == "N") {
		sheetObj.SetCellValue(Row, "item_pkgunit","",0);
		sheetObj.SetCellValue(Row, "item_pkgqty",0,0);
	}
	var item_pkgqty=getXmlDataNullToNullString(resultXml, 'putaway_ea_qty');
	sheetObj.SetCellValue(Row, "item_ea_qty",item_pkgqty,0);
	// CBM, GWT, NWT 계산 (Excel Upload시는 계산하지 않는다)
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
function validation(){
	var sheetObj=docObjects[0];
    var rowcnt=sheetObj.RowCount()+2;
    for(var i=2;i<rowcnt; i++){
    	var chk=sheetObj.GetCellValue(i, 1);
    	if (chk == "1") {
    	}
    }
    var iCheckRow=sheetObj.FindCheckedRow("chk");
    if (ComIsEmpty(iCheckRow)) {
    	ComShowCodeMessage("COM12189", "");
		return false;
    }
	return true;
}
function btn_Close() {
  ComClosePopup(); 
}
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