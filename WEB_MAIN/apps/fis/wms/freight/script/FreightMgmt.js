/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : FreightMgmt.js
*@FileTitle  : FreightMgmt
*@author     : DOU Network
*@version    : 1.0
*@since      : 2015/03/17
=========================================================*/
var CHECKCHFLG="N";
//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;

var rtnary = new Array(1);
var callBackFunc = "";

var firCalFlag=false;

var uploadObjects=new Array();
var uploadCnt=0;
var grd04cnt=0;
var grd05cnt=0;
var loading_flag = "N";
/*
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여
 * cache옵션 false셋팅
 */
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});
/**
* Sheet  onLoad
*/
function loadPage() {
	doShowProcess();
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
	//IBMultiCombo초기화
    doHideProcess();
    loading_flag = "Y";
	initControl();
	searchIbTlOrgInfo();
	var formObj=document.form;
	if(form.doc_cls_cd.value == "W"){
		form.in_doc_cls_cd[0].checked=true;
	}else if(form.doc_cls_cd.value == "F"){
		form.in_doc_cls_cd[1].checked=true;
	}else if(form.doc_cls_cd.value == "S"){
		form.in_doc_cls_cd[2].checked=true;
	}
	if (formObj.in_frt_doc_no.value != ""){
		btn_Search();
	}
	//upload 초기화
	//ComConfigUpload(uploadObjects[0], "/HJLOMS/addFileESOP.do?FileUploadModule=SOP");
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObj=document.form;
    ComBtnDisable("btn_save");
    ComBtnDisable("btn_copyFrom");
    ComBtnDisable("btn_routeRate");
    ComBtnDisable("btn_routeRate_buy");
    ComBtnDisable("btn_ca_history");
	//ComBtnDisable("btn_delete");
    ComBtnDisable("link_invoice");
    ComBtnDisable("link_consultation");
    ComBtnDisable("link_history");
    
}
function searchIbTlOrgInfo(){
	var formObj=document.form;
	var value="office_cd="+formObj.org_cd.value;
	
	ajaxSendPost(resultIbTlOrgInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlOrgInfo&office_cd=' + formObj.org_cd.value, './GateServlet.gsl');
	
}

function resultIbTlOrgInfo(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != null){
			formObj.incls_vat_amt_flg.value = rtnArr[2];
			formObj.sell_vat_def_cd.value = rtnArr[3];
			formObj.buy_vat_def_cd.value = rtnArr[4];
			formObj.ctry_cd.value = rtnArr[5];
			formObj.auto_ca_use.value = rtnArr[7];
		}
	}
}

/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
	}

function sell_exrate_cls_cd_OnChange(comboObj, oldIndex, oldText, oldCode, newIndex, newText, newCode){
	searchDailyExRateInfo("S");
}
function buy_exrate_cls_cd_OnChange(comboObj, oldIndex, oldText, oldCode, newIndex, newText, newCode){
	searchDailyExRateInfo("B");
}


function doWork(srcName){
	switch(srcName) {
	case "btn_copyFrom":	
		btn_copyFrom();
		break;
	case "btn_retrieve":	
		btn_Search();
		break;
	case "btn_save":	
		btn_Save();
		break;
	case "btn_sell_curr_cd":	//Location 조회 팝업
		
		callBackFunc = "setSellCurrInfo";
	    modal_center_open('./CommonCodePopup.clt?grp_cd=A5', rtnary, 900,520,"yes");
	    
		break;
	case "btn_buy_curr_cd":	//Location 조회 팝업
		
		callBackFunc = "setBuyCurrInfo";
	    modal_center_open('./CommonCodePopup.clt?grp_cd=A5', rtnary, 900,520,"yes");
		
		break;
	case "btn_sell_exrate_dt":	
		var cal=new ComCalendar();
        cal.select(formObj.sell_exrate_dt, 'yyyy-MM-dd');
		break;
	case "btn_buy_exrate_dt":	
		var cal=new ComCalendar();
        cal.select(formObj.buy_exrate_dt, 'yyyy-MM-dd');
		break;	
	case "btn_indirectCost":	
		indirect_buying();
		break;
	}
}

function setSellCurrInfo(rtnVal){
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		formObj.sell_curr_cd.value = rtnValAry[1];
	}
}

function setBuyCurrInfo(rtnVal){
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		formObj.buy_curr_cd.value = rtnValAry[1];
	}
	
}

function openPopUp(){
	
	callBackFunc = "setCtrtCustInfo";
    modal_center_open('./CustomerPopup.clt?cust_cd='+formObj.ctrt_cust_cd.value+"&cust_nm="+formObj.ctrt_cust_nm.value+"&clear_flg=Y", rtnary, 900,650,"yes");
	
}

function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){

		      var prefix="Grd01";
	
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr11, Align:"Center"},
		                  { Text:hdr21, Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"doc_type", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:250 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"doc_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:30 },
		             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"freight",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:30 },
		             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"sprov_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:30 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"sprov_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
		             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
		       
		      InitColumns(cols);
		      SetSheetHeight(215);
	
		      SetEditable(1);
		      //SetHeaderGetRowHeight(8);
	      }
	      break;
		case 2:      //IBSheet1 init
		    with(sheetObj){

		      var prefix="Grd04";
	
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		      var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr12, Align:"Center"},
		                  { Text:hdr22, Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq" },
		             {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"chk",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_br_cd",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"PopupEdit", Hidden:0, Width:75,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cust_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"accrual_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"internal_sts_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"PopupEdit", Hidden:0, Width:55,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_cd",            KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"frt_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"PopupEdit", Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"exrate",            KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"PopupEdit", Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"unit_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_qty",          KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price",        KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"AutoSum",   Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:prefix+"amt",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"AutoSum",   Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:prefix+"loc_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"val_cls_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"vat_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"curr_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"AutoSum",   Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:prefix+"ttl_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pass_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inv_ymd",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"inv_acct_usd_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"create_user",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"update_user",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"usd_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_org_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"relay_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"relay_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"relay_inv_flag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"incls_vat_amt_flg", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"internal_exrate",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_curr_cls",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
		       
		      InitColumns(cols);
		      SetSheetHeight(250);
		      
		      SetEditable(1);
		      SetColProperty(0 ,prefix+"unit_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(prefix+"accrual_cd", {ComboText:accrual_cdText, ComboCode:accrual_cdCode} );
		      SetColProperty(prefix+"pass_cd", {ComboText:pass_cdText, ComboCode:pass_cdCode} );
		      SetColProperty(prefix+"internal_sts_cd", {ComboText:"Initial|Confirm|Hold", ComboCode:"I|C|H"} );
		      SetColProperty(prefix+"val_cls_cd", {ComboText:SELL_VAT_NM, ComboCode:SELL_VAT_CD} );
		      grd04cnt=cnt;
	      }
	      break;
		case 3:      //IBSheet1 init
		    with(sheetObj){

		      var prefix="Grd05";
	
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		      var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr13, Align:"Center"},
		                  { Text:hdr23, Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq" },
		             {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"chk",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
		             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_br_cd",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"PopupEdit", Hidden:0, Width:75,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cust_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"accrual_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"internal_sts_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"PopupEdit", Hidden:0, Width:55,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_cd",            KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"frt_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"PopupEdit", Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"exrate",            KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"PopupEdit", Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"unit_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_qty",          KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price",        KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"AutoSum",   Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:prefix+"amt",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"AutoSum",   Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:prefix+"loc_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"val_cls_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"vat_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"curr_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"AutoSum",   Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:prefix+"ttl_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pass_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inv_ymd",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"inv_acct_usd_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"create_user",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"update_user",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"usd_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_org_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"relay_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"relay_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"relay_inv_flag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"incls_vat_amt_flg", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"internal_exrate",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_curr_cls",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
		       
		      InitColumns(cols);
		      SetSheetHeight(250);
	
		      SetEditable(1);

		      SetColProperty(prefix+"accrual_cd", {ComboText:accrual_cdText, ComboCode:accrual_cdCode} );
		      SetColProperty(prefix+"pass_cd", {ComboText:pass_cdText, ComboCode:pass_cdCode} );
		      SetColProperty(prefix+"internal_sts_cd", {ComboText:"Initial|Confirm|Hold", ComboCode:"I|C|H"} );
		      SetColProperty(prefix+"val_cls_cd", {ComboText:BUY_VAT_NM, ComboCode:BUY_VAT_CD} );
		      grd05cnt=cnt;
	      }
	      break;
	}
}

var sb_cls_cdOnChange = "";

function sheet2_OnChange(sheetObj, Row, Col, Value){
	var formObj=document.form;
	var srcName=sheetObj.ColSaveName(Col);
	var prefix="Grd04";
	var sUrl="";
	var sb_cls_cd="S";
	sb_cls_cdOnChange = sb_cls_cd;
	
	if ( srcName == prefix+"curr_cd" ) {
		sUrl="grp_cd=A5&code_cd="+Value;
		searchIbCommonCodeInfo(formObj,sUrl,srcName,Row, sb_cls_cd);	
	} else if ( srcName == prefix+"unit_cd" ) {
		sUrl="grp_cd=Z3&code_cd="+Value;
		searchIbCommonCodeInfo(formObj,sUrl,srcName,Row, sb_cls_cd);	
	} else if ( srcName == prefix+"cust_cd" ) {
		sUrl="cust_cd="+Value+"&in_part_tp=S";
		searchIbTlCustInfo(formObj,sUrl,Row, sb_cls_cd);	
	} else if ( srcName == prefix+"frt_cd" ) {
		sUrl="code="+Value+"&org_cd="+formObj.org_cd.value;
		searchIbTlFreightInfo(formObj,sUrl,Row, sb_cls_cd);	
	} else if ( srcName == prefix+"exrate" || srcName == prefix+"unit_qty" || srcName == prefix+"unit_price" ) {
		setAutoCal(Row, sb_cls_cd);
	} else if ( srcName == prefix+"val_cls_cd" ) {
		setVatChang(Row, sb_cls_cd);
	} else if ( srcName == prefix+"loc_amt" ) {
		setLocAmtChangeCal(Row, sb_cls_cd);
	} else if ( srcName == prefix+"vat_amt" ) {
		setVatAmtChangeCal(Row, sb_cls_cd);
	} else if ( srcName == prefix+"internal_sts_cd" ) {
		setInternalChangeCal(Row, sb_cls_cd);
	}
}
function sheet3_OnChange(sheetObj, Row, Col, Value){
	var formObj=document.form;
	var srcName=sheetObj.ColSaveName(Col);
	var prefix="Grd05";
	var sUrl="";
	var sb_cls_cd="B";
	sb_cls_cdOnChange = sb_cls_cd;
	
	if ( srcName == prefix+"curr_cd" ) {
		sUrl="grp_cd=A5&code_cd="+Value;
		searchIbCommonCodeInfo(formObj,sUrl,srcName,Row, sb_cls_cd);	
	} else if ( srcName == prefix+"unit_cd" ) {
		sUrl="grp_cd=Z3&code_cd="+Value;
		searchIbCommonCodeInfo(formObj,sUrl,srcName,Row, sb_cls_cd);	
	} else if ( srcName == prefix+"cust_cd" ) {
		sUrl="cust_cd="+Value+"&in_part_tp=S";
		searchIbTlCustInfo(formObj,sUrl,Row, sb_cls_cd);	
	} else if ( srcName == prefix+"frt_cd" ) {
		sUrl="code="+Value+"&org_cd="+formObj.org_cd.value;
		searchIbTlFreightInfo(formObj,sUrl,Row, sb_cls_cd);	
	} else if ( srcName == prefix+"exrate" || srcName == prefix+"unit_qty" || srcName == prefix+"unit_price" ) {
		setAutoCal(Row, sb_cls_cd);
	} else if ( srcName == prefix+"val_cls_cd" ) {
		setVatChang(Row, sb_cls_cd);
	} else if ( srcName == prefix+"loc_amt" ) {
		setLocAmtChangeCal(Row, sb_cls_cd);
	} else if ( srcName == prefix+"vat_amt" ) {
		setVatAmtChangeCal(Row, sb_cls_cd);
	} else if ( srcName == prefix+"internal_sts_cd" ) {
		setInternalChangeCal(Row, sb_cls_cd);
	}
}
function searchIbTlCustInfo(formObj, value, row, sb_cls_cd){
	/*$.ajax({
		url : "searchTlCustInfo.do?"+value,
		success : function(result) {*/
			var sXml=docObjects[0].GetSearchData("searchTlCustInfo.do?"+value);
			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
			}
			resultIbTlCustInfo(sXml, row, sb_cls_cd);
		/*}
	});*/
}
function resultIbTlCustInfo(resultXml, row, sb_cls_cd) {
	var sheetObj="";
	var prefix="Grd04";
	if(sb_cls_cd == 'S'){
		sheetObj=docObjects[1];
		prefix="";
	}else{
	    sheetObj=docObjects[2];
		prefix="Grd05";
	}
	sheetObj.SetCellValue(row, prefix+"cust_cd",getXmlDataNullToNullString(resultXml,'cust_cd'),0);
	sheetObj.SetCellValue(row, prefix+"cust_nm",getXmlDataNullToNullString(resultXml,'cust_loc_nm'),0);
	sheetObj.SetCellValue(row, prefix+"cust_org_yn",getXmlDataNullToNullString(resultXml,'org_flg'),0);
}
function searchIbTlFreightInfo(formObj, value, row, sb_cls_cd){
	/*$.ajax({
		url : "searchFrtCd.do?"+value,
		success : function(result) {*/
			var sXml=docObjects[0].GetSearchData("searchFrtCd.do?"+value);
			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
			}
			resultIbTlFreightInfo(sXml, row, sb_cls_cd);
		/*}
	});*/
}
function resultIbTlFreightInfo(resultXml, row, sb_cls_cd) {
	var sheetObj="";
	var prefix="";
	if(sb_cls_cd == 'S'){
		sheetObj=docObjects[1];
		prefix="Grd04";
	}else{
	    sheetObj=docObjects[2];
		prefix="Grd05";
	}
	sheetObj.SetCellValue(row, prefix+"frt_cd",getXmlDataNullToNullString(resultXml,'code'),0);
	sheetObj.SetCellValue(row, prefix+"frt_nm",getXmlDataNullToNullString(resultXml,'name'),0);
	if(sb_cls_cd == 'S'){
		sheetObj.SetCellValue(row, prefix+"val_cls_cd",getXmlDataNullToNullString(resultXml,'sell_vat_cd'),0);
	}else{
		sheetObj.SetCellValue(row, prefix+"val_cls_cd",getXmlDataNullToNullString(resultXml,'buy_vat_cd'),0);
	}
	sheetObj.SetCellValue(row, prefix+"frt_curr_cls",getXmlDataNullToNullString(resultXml,'frt_curr_cls'),0);
	setCurr(row, sb_cls_cd);
}
function searchIbCommonCodeInfo(formObj, value, srcName, row, sb_cls_cd){
	
	ajaxSendPost(resultIbCommonCodeInfo, param , '&goWhere=aj&bcKey=searchCommonCodeInfo&'+value, './GateServlet.gsl');

}

function resultIbCommonCodeInfo(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != null){
			
			var sheetObj="";
			var prefix="";
			if(sb_cls_cdOnChange == 'S'){
				sheetObj=docObjects[1];
				prefix="Grd04";
			}else{
			    sheetObj=docObjects[2];
				prefix="Grd05";
			}
			if ( srcName == prefix+"curr_cd" ) {
				if(rtnArr[0] != ""){
					sheetObj.SetCellValue(row, prefix+"curr_cd",rtnArr[0],0);
				}else{
					sheetObj.SetCellValue(row, prefix+"curr_cd","",0);
				}
				setCurrCal(row, sb_cls_cd);
			} else if ( srcName == prefix+"unit_cd" ) {
				if(rtnArr[0] != ""){
					sheetObj.SetCellValue(row, prefix+"unit_cd",rtnArr[0],0);
				}else{
					sheetObj.SetCellValue(row, prefix+"unit_cd","",0);
				}
				setUnit(row, sb_cls_cdOnChange);
			}
		}
	}
}

var rowTest, colTest; 

function sheet2_OnPopupClick(sheetObj,Row,Col){
	var prefix="Grd04";
	var srcName=sheetObj.ColSaveName(Col);
	var sUrl="";
	
	var sb_cls_cd="S";
	
	rowTest = Row;
	colTest = Col;
	
	if ( srcName == prefix+"curr_cd" ) {
		
		callBackFunc = "setIbCurrInfoSell";
	    modal_center_open('./CommonCodePopup.clt?grp_cd=A5', rtnary, 600,600,"yes");
		
	} else if ( srcName == prefix+"unit_cd" ) {
		
		callBackFunc = "setIbPkgunitInfoSell";
	    modal_center_open('./CommonCodePopup.clt?grp_cd=Z3', rtnary, 600,600,"yes");
		
	} else if ( srcName == prefix+"cust_cd" ) {
		
		callBackFunc = "setIbCustInfoSell";
	    modal_center_open('./CustomerPopup.clt?cust_cd='+sheetObj.GetCellValue(Row, Col)+"&in_part_tp=P", rtnary, 900,700,"yes");
		
	} else if ( srcName == prefix+"frt_cd" ) {
		
		callBackFunc = "setIbFreightInfoSell";
	    modal_center_open('./FreightPopup.clt?cust_cd='+sheetObj.GetCellValue(Row, Col), rtnary, 600,600,"yes");
		
	}
}
function setIbCurrInfoSell(rtnVal) {
	
	var prefix="Grd04";
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		
		var sheetObj=docObjects[1];
		sheetObj.SetCellValue(rowTest, prefix + colTest,rtnValAry[1],0);
		setCurrCal(row, 'S');
	}
}
function setIbPkgunitInfoSell(rtnVal) {
	
	var prefix="Grd04";
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		
		var sheetObj=docObjects[1];
		sheetObj.SetCellValue(rowTest, prefix + colTest,rtnValAry[1],0);
		setUnit(row, 'S');
	}
}
function setIbCustInfoSell(rtnVal){
	
	var prefix="Grd04";
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		
		var sheetObj=docObjects[1];
		
		sheetObj.SetCellValue(rowTest, prefix+"cust_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(rowTest, prefix+"cust_nm",rtnValAry[1],0);
		sheetObj.SetCellValue(rowTest, prefix+"cust_org_yn",rtnValAry[15],0);
	}
}
function setIbFreightInfoSell(rtnVal){
	
	var prefix="Grd04";
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		
		var sheetObj=docObjects[1];
		
		sheetObj.SetCellValue(rowTest, prefix+"frt_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(rowTest, prefix+"frt_nm",rtnValAry[1],0);
		sheetObj.SetCellValue(rowTest, prefix+"val_cls_cd",rtnValAry[4],0);
		sheetObj.SetCellValue(rowTest, prefix+"frt_curr_cls",rtnValAry[5],0);
		
		setCurr(row, 'S');
	}
}
function sheet3_OnPopupClick(sheetObj,Row,Col){
	var prefix="Grd05";
	var srcName=sheetObj.ColSaveName(Col);
	var sUrl="";
	var sb_cls_cd="B";
	
	rowTest = Row;
	colTest = Col;
	
	if ( srcName == prefix+"curr_cd" ) {
		
		callBackFunc = "setIbCurrInfoBuy";
	    modal_center_open('./CommonCodePopup.clt?grp_cd=A5', rtnary, 600,600,"yes");
		
	} else if ( srcName == prefix+"unit_cd" ) {
		
		callBackFunc = "setIbPkgunitInfoBuy";
	    modal_center_open('./CommonCodePopup.clt?grp_cd=Z3', rtnary, 600,600,"yes");
	    
	} else if ( srcName == prefix+"cust_cd" ) {
		
		callBackFunc = "setIbCustInfoBuy";
	    modal_center_open('./CustomerPopup.clt?cust_cd='+sheetObj.GetCellValue(Row, Col)+"&in_part_tp=P", rtnary, 900,700,"yes");
		
	} else if ( srcName == prefix+"frt_cd" ) {
		
		callBackFunc = "setIbFreightInfoBuy";
	    modal_center_open('./FreightPopup.clt?cust_cd='+sheetObj.GetCellValue(Row, Col), rtnary, 600,600,"yes");
	    
	}
}
function setIbCurrInfoBuy(rtnVal) {
	
	var prefix="Grd05";
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		
		var sheetObj=docObjects[2];
		sheetObj.SetCellValue(rowTest, prefix + colTest,rtnValAry[1],0);
		setCurrCal(row, 'B');
	}
}
function setIbPkgunitInfoBuy(rtnVal) {
	
	var prefix="Grd05";
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		
		var sheetObj=docObjects[2];
		sheetObj.SetCellValue(rowTest, prefix + colTest,rtnValAry[1],0);
		setUnit(row, 'B');
	}
}
function setIbCustInfoBuy(rtnVal){
	
	var prefix="Grd05";
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		
		var sheetObj=docObjects[2];
		sheetObj.SetCellValue(rowTest, prefix + "cust_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(rowTest, prefix + "cust_nm",rtnValAry[1],0);
		sheetObj.SetCellValue(rowTest, prefix + "cust_org_yn",rtnValAry[15],0);
	}
}
function setIbFreightInfoBuy(rtnVal){
	
	var prefix="Grd05";
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		
		var sheetObj=docObjects[1];
		
		sheetObj.SetCellValue(rowTest, prefix+"frt_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(rowTest, prefix+"frt_nm",rtnValAry[1],0);
		sheetObj.SetCellValue(rowTest, prefix+"val_cls_cd",rtnValAry[4],0);
		sheetObj.SetCellValue(rowTest, prefix+"frt_curr_cls",rtnValAry[5],0);
		
		setCurr(row, 'B');
	}
}
function setCurr(row, sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="Grd04";
	if(sb_cls_cd == 'S'){
		sheetObj=docObjects[1];
		prefix="Grd05";
	}else{
	    sheetObj=docObjects[2];
		prefix="";
	}
	if(sb_cls_cd == 'S'){
		if ( sheetObj.GetCellValue(row, prefix+"frt_curr_cls") == "F" ) {
			sheetObj.SetCellValue(row, prefix+"curr_cd",formObj.sell_curr_cd.value,0);
		} else {
			sheetObj.SetCellValue(row, prefix+"curr_cd",formObj.sell_loc_curr_cd.value,0);
		}
	}else{
		if ( sheetObj.GetCellValue(row, prefix+"frt_curr_cls") == "F" ) {
			sheetObj.SetCellValue(row, prefix+"curr_cd",formObj.buy_curr_cd.value,0);
		} else {
			sheetObj.SetCellValue(row, prefix+"curr_cd",formObj.buy_loc_curr_cd.value,0);
		}
	}	
	setCurrCal(row, sb_cls_cd);
}
function setCurrCal(row, sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	if(sb_cls_cd == 'S'){
		sheetObj=docObjects[1];
		prefix="";
	}else{
	    sheetObj=docObjects[2];
		prefix="";
	}
	if(sb_cls_cd == 'S'){
		if ( sheetObj.GetCellValue(row, prefix+"curr_cd") == formObj.sell_loc_curr_cd.value ) {
			sheetObj.SetCellValue(row, prefix+"exrate",1,0);
		} else if ( sheetObj.GetCellValue(row, prefix+"curr_cd") == formObj.sell_curr_cd.value ) {
			sheetObj.SetCellValue(row, prefix+"exrate",formObj.sell_exrate.value,0);
		} else {
			sheetObj.SetCellValue(row, prefix+"exrate",0,0);
		}
		if ( sheetObj.GetCellValue(row, prefix+"incls_vat_amt_flg") == "Y" ) {
			sheetObj.SetCellValue(row, prefix+"val_cls_cd",formObj.sell_vat_def_cd.value,0);
		}
	}else{
		if ( sheetObj.GetCellValue(row, prefix+"curr_cd") == formObj.buy_loc_curr_cd.value ) {
			sheetObj.SetCellValue(row, prefix+"exrate",1,0);
		} else if ( sheetObj.GetCellValue(row, prefix+"curr_cd") == formObj.buy_curr_cd.value ) {
			sheetObj.SetCellValue(row, prefix+"exrate",formObj.buy_exrate.value,0);
		} else {
			sheetObj.SetCellValue(row, prefix+"exrate",0,0);
		}
		if ( sheetObj.GetCellValue(row, prefix+"incls_vat_amt_flg") == "Y" ) {
			sheetObj.SetCellValue(row, prefix+"val_cls_cd",formObj.buy_vat_def_cd.value,0);
		}
	}
	//setAutoCal(row, sb_cls_cd);
	setVatChang(row, sb_cls_cd);
}
function setVatChang(row, sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	if(sb_cls_cd == 'S'){
		sheetObj=docObjects[1];
		prefix="Grd04";
	}else{
	    sheetObj=docObjects[2];
		prefix="Grd05";
	}
	if( (sheetObj.GetCellValue(row, prefix+"frt_br_cd") == "VNSGNLB" || sheetObj.GetCellValue(row, prefix+"frt_br_cd") == "VNHANLB") &&
			sheetObj.GetCellValue(row, prefix+"relay_cd") != "" && sheetObj.GetCellText(row, prefix+"val_cls_cd")	== 5 ) {
		ComShowCodeMessage("COM0264");
		if(sb_cls_cd == 'S'){
			sheetObj.SetCellValue(row, prefix+"val_cls_cd",formObj.sell_vat_def_cd.value,0);
		}else{
			sheetObj.SetCellValue(row, prefix+"val_cls_cd",formObj.buy_vat_def_cd.value,0);
		}
	}else if( (sheetObj.GetCellValue(row, prefix+"frt_br_cd") == "VNSGNLB" || sheetObj.GetCellValue(row, prefix+"frt_br_cd") == "VNHANLB") &&
			sheetObj.GetCellValue(row, prefix+"relay_cd") == "" && sheetObj.GetCellText(row, prefix+"val_cls_cd")	== 5 && sheetObj.GetCellText(row, prefix+"cust_org_yn") == "Y" ) {
		ComShowCodeMessage("COM0264");
		if(sb_cls_cd == 'S'){
			sheetObj.SetCellValue(row, prefix+"val_cls_cd",formObj.sell_vat_def_cd.value,0);
		}else{
			sheetObj.SetCellValue(row, prefix+"val_cls_cd",formObj.buy_vat_def_cd.value,0);
		}
	}
	var vLOC_AMT_EDIT_BR=null;
	var vLOC_AMT_EDIT_SB_CLS_CD=null;
	var vVAT_LOC_EDIT_BR=null;
	var vVAT_LOC_EDIT_SB_CLS_CD=null;
	vLOC_AMT_EDIT_BR=LOC_AMT_EDIT_BR.split("|");
	vLOC_AMT_EDIT_SB_CLS_CD=LOC_AMT_EDIT_SB_CLS_CD.split("|");	
	for(var j=1;j<vLOC_AMT_EDIT_BR.length; j++){
		//alert(j+"      "+vVAT_LOC_EDIT_BR[j]+"            "+vVAT_LOC_EDIT_SB_CLS_CD[j]);
		if(sheetObj.GetCellValue(row, prefix+"frt_br_cd") == vLOC_AMT_EDIT_BR[j] && vLOC_AMT_EDIT_SB_CLS_CD[j] == sb_cls_cd){
			sheetObj.SetCellEditable(row, prefix+"loc_amt",1);
		}
	}
	vVAT_LOC_EDIT_BR=VAT_LOC_EDIT_BR.split("|");
	vVAT_LOC_EDIT_SB_CLS_CD=VAT_LOC_EDIT_SB_CLS_CD.split("|");		
	for(var j=1;j<vVAT_LOC_EDIT_BR.length; j++){
		//alert(j+"      "+vVAT_LOC_EDIT_BR[j]+"            "+vVAT_LOC_EDIT_SB_CLS_CD[j]);
		if(sheetObj.GetCellText(row, prefix+"val_cls_cd") == 0 || sheetObj.GetCellText(row, prefix+"val_cls_cd") == 'NIL' ){
			sheetObj.SetCellEditable(row, prefix+"vat_amt",0);
		}else if(sheetObj.GetCellValue(row, prefix+"frt_br_cd") == vVAT_LOC_EDIT_BR[j] && vVAT_LOC_EDIT_SB_CLS_CD[j] == sb_cls_cd){
			sheetObj.SetCellEditable(row, prefix+"vat_amt",1);
		}
	}
	setAutoCal(row, sb_cls_cd);
}
function setUnit(row, sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	if(sb_cls_cd == 'S'){
		sheetObj=docObjects[1];
		prefix="Grd04";
	}else{
	    sheetObj=docObjects[2];
		prefix="Grd05";
	}
	if ( sheetObj.GetCellValue(row, prefix+"unit_cd") == formObj.cntr_type1.value ) {
		sheetObj.SetCellValue(row, prefix+"unit_qty",formObj.cntr_cnt1.value,0);
	} else if ( sheetObj.GetCellValue(row, prefix+"unit_cd") == formObj.cntr_type2.value ) {
		sheetObj.SetCellValue(row, prefix+"unit_qty",formObj.cntr_cnt2.value,0);
	} else if ( sheetObj.GetCellValue(row, prefix+"unit_cd") == formObj.cntr_type3.value ) {
		sheetObj.SetCellValue(row, prefix+"unit_qty",formObj.cntr_cnt3.value,0);
	} else if ( sheetObj.GetCellValue(row, prefix+"unit_cd") == formObj.cntr_type4.value ) {
		sheetObj.SetCellValue(row, prefix+"unit_qty",formObj.cntr_cnt4.value,0);
	} else if ( sheetObj.GetCellValue(row, prefix+"unit_cd") == formObj.cntr_type5.value ) {
		sheetObj.SetCellValue(row, prefix+"unit_qty",formObj.cntr_cnt5.value,0);
	} else if ( sheetObj.GetCellValue(row, prefix+"unit_cd") == "BOX" || sheetObj.GetCellValue(row, prefix+"unit_cd") == "BX" ){
		sheetObj.SetCellValue(row, prefix+"unit_qty",ComParseInt(ComNullToZero(formObj.cntr_cnt1.value))+ComParseInt(ComNullToZero(formObj.cntr_cnt2.value))+ComParseInt(ComNullToZero(formObj.cntr_cnt3.value))+ComParseInt(ComNullToZero(formObj.cntr_cnt4.value))+ComParseInt(ComNullToZero(formObj.cntr_cnt5.value)),0);
	} else if ( sheetObj.GetCellValue(row, prefix+"unit_cd") == "KGS"){
		sheetObj.SetCellValue(row, prefix+"unit_qty",formObj.tot_kgs.value,0);
	} else if ( sheetObj.GetCellValue(row, prefix+"unit_cd") == "CBM"){
		sheetObj.SetCellValue(row, prefix+"unit_qty",formObj.tot_cbm.value,0);
	} else if ( sheetObj.GetCellValue(row, prefix+"unit_cd") == "BL"){
		sheetObj.SetCellValue(row, prefix+"unit_qty",1,0);
	} else {
		sheetObj.SetCellValue(row, prefix+"unit_qty",0,0);
	}
	setAutoCal(row, sb_cls_cd);
}
function setAutoCal(row, sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	var usd_conv_rate="";
	if(sb_cls_cd == 'S'){
		sheetObj=sheet2;
		prefix="Grd04";
		usd_conv_rate=parseFloat(ComTrimAll(formObj.sell_usd_conv_rate.value,','));
	}else{
	    sheetObj=sheet3;
		prefix="Grd05";
		usd_conv_rate=parseFloat(ComTrimAll(formObj.buy_usd_conv_rate.value,','));
	}
	if(formObj.ctry_cd.value == 'IN' && (sheetObj.GetCellValue(row, prefix+"frt_cd").substring(1) == 'OTH' || sheetObj.GetCellValue(row, prefix+"frt_cd") == 'PRMT')){
		sheetObj.SetCellEditable(row, prefix+"frt_nm",1);
	}else if(formObj.ctry_cd.value == 'IN'){
		sheetObj.SetCellEditable(row, prefix+"frt_nm",0);
	}
	var branch=formObj.org_cd.value;
	var incls_vat_amt_flg=formObj.incls_vat_amt_flg.value;
	var exrate=parseFloat(sheetObj.GetCellValue(row, prefix+"exrate"));
	var unit_qty=parseFloat(sheetObj.GetCellValue(row, prefix+"unit_qty"));
	var unit_price=parseFloat(sheetObj.GetCellValue(row, prefix+"unit_price"));
	var vat=sheetObj.GetCellText(row, prefix+"val_cls_cd");
	var vatSplit=vat.split("(");
	var inclusive_flag=!ComIsEmpty(vatSplit[1]);
	var relay_cd=sheetObj.GetCellValue(row, prefix+"relay_cd");
	var curr_cd=sheetObj.GetCellValue(row, prefix+"curr_cd");
	var ttl_amt=parseFloat(sheetObj.GetCellValue(row, prefix+"ttl_amt"));
	if(vat == "NIL"){
		vat=0;
	}else{
		vat=parseFloat(vatSplit[0]);
	}
	//alert("vat= "+vat+" exrate= "+exrate+" unit_qty= "+unit_qty+" unit_price= "+unit_price+" relay_cd= "+relay_cd);
	if( relay_cd != "" ){
		if(branch == "KRSELLB" || branch == "JPTYOLB" || branch == "VNHANLB" || branch == "VNSGNLB"){
			if((branch == "KRSELLB" && curr_cd == "KRW")||(branch == "JPTYOLB" && curr_cd == "JPY")||(branch == "VNHANLB" && curr_cd == "VND")||(branch == "VNSGNLB" && curr_cd == "VND")){
				sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(ttl_amt / (1 + vat * 0.01) * (vat * 0.01),0),0);
				if( exrate == 0 ){
					sheetObj.SetCellValue(row, prefix+"amt",0,0);
				}else{
					sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(ttl_amt - sheetObj.GetCellValue(row, prefix+"curr_vat_amt"),0),0);
				}
			}else{
				sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(ttl_amt / (1 + vat * 0.01) * (vat * 0.01),2),0);
				if( exrate == 0 ){
					sheetObj.SetCellValue(row, prefix+"amt",0,0);
				}else{
					sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(ttl_amt - sheetObj.GetCellValue(row, prefix+"curr_vat_amt"),2),0);
				}
			}
			sheetObj.SetCellValue(row, prefix+"loc_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * exrate,0),0);
			if(sheetObj.GetCellValue(row, prefix+"amt") == 0){
				sheetObj.SetCellValue(row, prefix+"vat_amt",0,0);
			}else{
				sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"curr_vat_amt") * (sheetObj.GetCellValue(row, prefix+"loc_amt")/sheetObj.GetCellValue(row, prefix+"amt")),0),0);
			}
		}else{
			sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(ttl_amt / (1 + vat * 0.01) * (vat * 0.01),2),0);
			if( exrate == 0 ){
				sheetObj.SetCellValue(row, prefix+"amt",0,0);
			}else{
				sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(ttl_amt - sheetObj.GetCellValue(row, prefix+"curr_vat_amt"),2),0);
			}
			sheetObj.SetCellValue(row, prefix+"loc_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * exrate,2),0);
			if(sheetObj.GetCellValue(row, prefix+"amt") == 0){
				sheetObj.SetCellValue(row, prefix+"vat_amt",0,0);
			}else{
				sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"curr_vat_amt") * (sheetObj.GetCellValue(row, prefix+"loc_amt")/sheetObj.GetCellValue(row, prefix+"amt")),2),0);
			}
		}
		if(incls_vat_amt_flg != "Y"){
			sheetObj.SetCellValue(row, prefix+"unit_price",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt")/unit_qty,3),0);
		}
	/*}else if(formObj.ctry_cd.value == 'IN'){
		sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(unit_qty * unit_price,2),0);
sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsCeil(sheetObj.GetCellValue(row, prefix+"amt") * (vat * 0.01),2),0);
sheetObj.SetCellValue(row, prefix+"loc_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * exrate,2),0);
sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsCeil(sheetObj.GetCellValue(row, prefix+"loc_amt") * (vat * 0.01),2),0);
sheetObj.SetCellValue(row, prefix+"ttl_amt",parseFloat(sheetObj.GetCellValue(row, prefix+"amt")) + parseFloat(sheetObj.GetCellValue(row, prefix+"curr_vat_amt")),0);
	*/
	}else if(incls_vat_amt_flg == "Y" && (inclusive_flag == true || vatSplit[0] == "NIL")){
		sheetObj.SetCellValue(row, prefix+"ttl_amt",ComAbsRound(unit_qty * unit_price,2),0);
		sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"ttl_amt") / (1 + vat * 0.01) * (vat * 0.01),2),0);
		if( exrate == 0 ){
			sheetObj.SetCellValue(row, prefix+"amt",0,0);
		}else{
			sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"ttl_amt") - sheetObj.GetCellValue(row, prefix+"curr_vat_amt"),2),0);
		}
		sheetObj.SetCellValue(row, prefix+"loc_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * exrate,2),0);
		if(sheetObj.GetCellValue(row, prefix+"amt") == 0){
			sheetObj.SetCellValue(row, prefix+"vat_amt",0,0);
		}else{
			sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"curr_vat_amt") * (sheetObj.GetCellValue(row, prefix+"loc_amt")/sheetObj.GetCellValue(row, prefix+"amt")),2),0);
		}
	}else if((branch == "VNHANLB" || branch == "VNSGNLB") && vat == 5 && sb_cls_cd == 'B' ){
		if((branch == "VNHANLB" && curr_cd == "VND")||(branch == "VNSGNLB" && curr_cd == "VND")){
			sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(unit_qty * unit_price,0),0);
			sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") / (1 - vat * 0.01) * (vat * 0.01),0),0);
		}else{
			sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(unit_qty * unit_price,2),0);
			sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") / (1 - vat * 0.01) * (vat * 0.01),2),0);
		}
		sheetObj.SetCellValue(row, prefix+"loc_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * exrate,0),0);
		if(sheetObj.GetCellValue(row, prefix+"amt") == 0){
			sheetObj.SetCellValue(row, prefix+"vat_amt",0,0);
		}else{
			sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"curr_vat_amt") * (sheetObj.GetCellValue(row, prefix+"loc_amt")/sheetObj.GetCellValue(row, prefix+"amt")),0),0);
		}
		sheetObj.SetCellValue(row, prefix+"ttl_amt",parseFloat(sheetObj.GetCellValue(row, prefix+"amt")) + parseFloat(sheetObj.GetCellValue(row, prefix+"curr_vat_amt")),0);
	}else if(branch == "KRSELLB" || branch == "JPTYOLB" || branch == "VNHANLB" || branch == "VNSGNLB"){
		if((branch == "KRSELLB" && curr_cd == "KRW")||(branch == "JPTYOLB" && curr_cd == "JPY")||(branch == "VNHANLB" && curr_cd == "VND")||(branch == "VNSGNLB" && curr_cd == "VND")){
			sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(unit_qty * unit_price,0),0);
			sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * (vat * 0.01),0),0);
		}else{
			sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(unit_qty * unit_price,2),0);
			sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * (vat * 0.01),2),0);
		}
		sheetObj.SetCellValue(row, prefix+"loc_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * exrate,0),0);
		if(sheetObj.GetCellValue(row, prefix+"amt") == 0){
			sheetObj.SetCellValue(row, prefix+"vat_amt",0,0);
		}else{
			sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"curr_vat_amt") * (sheetObj.GetCellValue(row, prefix+"loc_amt")/sheetObj.GetCellValue(row, prefix+"amt")),0),0);
		}
		sheetObj.SetCellValue(row, prefix+"ttl_amt",parseFloat(sheetObj.GetCellValue(row, prefix+"amt")) + parseFloat(sheetObj.GetCellValue(row, prefix+"curr_vat_amt")),0);
	}else{
		sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(unit_qty * unit_price,2),0);
		sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * (vat * 0.01),2),0);
		sheetObj.SetCellValue(row, prefix+"loc_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * exrate,2),0);
		if(sheetObj.GetCellValue(row, prefix+"amt") == 0){
			sheetObj.SetCellValue(row, prefix+"vat_amt",0,0);
		}else{
			sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"curr_vat_amt") * (sheetObj.GetCellValue(row, prefix+"loc_amt")/sheetObj.GetCellValue(row, prefix+"amt")),2),0);
		}
		sheetObj.SetCellValue(row, prefix+"ttl_amt",parseFloat(sheetObj.GetCellValue(row, prefix+"amt")) + parseFloat(sheetObj.GetCellValue(row, prefix+"curr_vat_amt")),0);
	}
	if(usd_conv_rate == 0){
		sheetObj.SetCellValue(row, prefix+"usd_amt",0,0);
	}else{
		if(incls_vat_amt_flg == "Y" && (inclusive_flag == true || vatSplit[0] == "NIL")){
			sheetObj.SetCellValue(row, prefix+"usd_amt",ComAbsRound(ComAbsRound(unit_qty * unit_price,2) * exrate/usd_conv_rate,2),0);
		}else{
			//alert(sheetObj.CellValue(row, prefix+"loc_amt")+"     "+sell_usd_conv_rate);
			//alert(ComAbsRound(sheetObj.CellValue(row, prefix+"loc_amt")/sell_usd_conv_rate)+"   "+ComAbsRound(sheetObj.CellValue(row, prefix+"loc_amt")/sell_usd_conv_rate,2))
			sheetObj.SetCellValue(row, prefix+"usd_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"loc_amt")/usd_conv_rate,2),0);
		}
	}
}
function re_apply(sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	var curr_cd="";
	var exrate="";
	if(sb_cls_cd == 'S'){
		sheetObj=docObjects[1];
		prefix="Grd04";
		curr_cd=formObj.sell_curr_cd.value;
		exrate=formObj.sell_exrate.value;
	}else{
	    sheetObj=docObjects[2];
		prefix="Grd05";
		curr_cd=formObj.buy_curr_cd.value;
		exrate=formObj.buy_exrate.value;
	}
	if( sheetObj.RowCount() - sheetObj.RowCount('D') > 0){ //Row > 0
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
			if( sheetObj.GetCellValue(i, prefix+"relay_inv_flag") != 'Y' && sheetObj.GetCellValue(i, prefix+"relay_cd") == '' && sheetObj.GetCellValue(i, prefix+"curr_cd") == curr_cd && sheetObj.GetCellValue(i, prefix+"frt_seq") < 1000 ){
				sheetObj.SetCellValue(i, prefix+"exrate",exrate,0);
				setAutoCal(i, sb_cls_cd);
			} 
		}
	}	
}
function setInternalAutoCal(row, sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	var usd_conv_rate="";
	var frt_curr_cd="";
	var frt_exrate="";
	var cal_yn="N";
	if(sb_cls_cd == 'S'){
		sheetObj=docObjects[1];
		prefix="";
		usd_conv_rate=parseFloat(ComTrimAll(formObj.sell_usd_conv_rate.value,','));
		frt_curr_cd=formObj.sell_curr_cd.value;
		frt_exrate=formObj.sell_exrate.value;
	}else{
	    sheetObj=docObjects[2];
		prefix="";
		usd_conv_rate=parseFloat(ComTrimAll(formObj.buy_usd_conv_rate.value,','));
		frt_curr_cd=formObj.buy_curr_cd.value;
		frt_exrate=formObj.buy_exrate.value;
	}
	var branch=formObj.org_cd.value;
	var incls_vat_amt_flg=formObj.incls_vat_amt_flg.value;
	var unit_qty=parseFloat(sheetObj.GetCellValue(row, prefix+"unit_qty"));
	var unit_price=parseFloat(sheetObj.GetCellValue(row, prefix+"unit_price"));
	var vat=sheetObj.GetCellText(row, prefix+"val_cls_cd");
	var vatSplit=vat.split("(");
	//var inclusive_flag = !ComIsEmpty(vatSplit[1]);
	var relay_cd=sheetObj.GetCellValue(row, prefix+"relay_cd");
	var curr_cd=sheetObj.GetCellValue(row, prefix+"curr_cd");
	var ttl_amt=parseFloat(sheetObj.GetCellValue(row, prefix+"ttl_amt"));
	var internal_exrate=parseFloat(sheetObj.GetCellValue(row, prefix+"internal_exrate"));
	if(vat == "NIL"){
		vat=0;
	}else{
		vat=parseFloat(vatSplit[0]);
	}
	if( sheetObj.GetCellValue(row, prefix+"curr_cd") == frt_curr_cd ){
		sheetObj.SetCellValue(row, prefix+"exrate",frt_exrate,0);
		cal_yn="Y";
	}
	if(sb_cls_cd == 'S'){
		if( internal_exrate != 0 && curr_cd != formObj.sell_curr_cd.value ){
			sheetObj.SetCellValue(row, prefix+"exrate",internal_exrate,0);
			cal_yn="Y";
		}
	}else{
		if( internal_exrate != 0 && curr_cd != formObj.buy_curr_cd.value ){
			sheetObj.SetCellValue(row, prefix+"exrate",internal_exrate,0);
			cal_yn="Y";
		}
	}	
	/*if(sb_cls_cd == 'S'){
		if( internal_exrate != 0 || curr_cd == formObj.sell_curr_cd.value ){
if(sheetObj.GetCellValue(row, prefix+"internal_sts_cd") != "H"){
				sheetObj.SetCellValue(row, prefix+"internal_sts_cd","C",0);
			}
		}
	}else{
		if( internal_exrate != 0 || curr_cd == formObj.buy_curr_cd.value ){
if(sheetObj.GetCellValue(row, prefix+"internal_sts_cd") != "H"){
				sheetObj.SetCellValue(row, prefix+"internal_sts_cd","C",0);
			}
		}
	}*/
	var exrate=parseFloat(sheetObj.GetCellValue(row, prefix+"exrate"));
	//alert("vat= "+vat+" exrate= "+exrate+" unit_qty= "+unit_qty+" unit_price= "+unit_price+" relay_cd= "+relay_cd);
	if(cal_yn == "Y"){
		if(incls_vat_amt_flg == "Y"){
			sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"ttl_amt") / (1 + vat * 0.01) * (vat * 0.01),2),0);
			if( exrate == 0 ){
				sheetObj.SetCellValue(row, prefix+"amt",0,0);
			}else{
				sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"ttl_amt") - sheetObj.GetCellValue(row, prefix+"curr_vat_amt"),2),0);
			}
			sheetObj.SetCellValue(row, prefix+"loc_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * exrate,2),0);
			if(sheetObj.GetCellValue(row, prefix+"amt") == 0){
				sheetObj.SetCellValue(row, prefix+"vat_amt",0,0);
			}else{
				sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"curr_vat_amt") * (sheetObj.GetCellValue(row, prefix+"loc_amt")/sheetObj.GetCellValue(row, prefix+"amt")),2),0);
			}
		}else if(branch == "KRSELLB" || branch == "JPTYOLB" || branch == "VNHANLB" || branch == "VNSGNLB"){
			if((branch == "KRSELLB" && curr_cd == "KRW")||(branch == "JPTYOLB" && curr_cd == "JPY")||(branch == "VNHANLB" && curr_cd == "VND")||(branch == "VNSGNLB" && curr_cd == "VND")){
				sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"ttl_amt") / (1 + vat * 0.01) * (vat * 0.01),0),0);
				sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"ttl_amt") - sheetObj.GetCellValue(row, prefix+"curr_vat_amt"),0),0);
			}else{
				sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"ttl_amt") / (1 + vat * 0.01) * (vat * 0.01),2),0);
				sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"ttl_amt") - sheetObj.GetCellValue(row, prefix+"curr_vat_amt"),2),0);
			}
			sheetObj.SetCellValue(row, prefix+"loc_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * exrate,0),0);
			if(sheetObj.GetCellValue(row, prefix+"amt") == 0){
				sheetObj.SetCellValue(row, prefix+"vat_amt",0,0);
			}else{
				sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"curr_vat_amt") * (sheetObj.GetCellValue(row, prefix+"loc_amt")/sheetObj.GetCellValue(row, prefix+"amt")),0),0);
			}
			sheetObj.SetCellValue(row, prefix+"unit_price",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt")/unit_qty,3),0);
		}else{
			sheetObj.SetCellValue(row, prefix+"curr_vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"ttl_amt") / (1 + vat * 0.01) * (vat * 0.01),2),0);
			sheetObj.SetCellValue(row, prefix+"amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"ttl_amt") - sheetObj.GetCellValue(row, prefix+"curr_vat_amt"),2),0);
			sheetObj.SetCellValue(row, prefix+"loc_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt") * exrate,2),0);
			if(sheetObj.GetCellValue(row, prefix+"amt") == 0){
				sheetObj.SetCellValue(row, prefix+"vat_amt",0,0);
			}else{
				sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"curr_vat_amt") * (sheetObj.GetCellValue(row, prefix+"loc_amt")/sheetObj.GetCellValue(row, prefix+"amt")),2),0);
			}
			sheetObj.SetCellValue(row, prefix+"unit_price",ComAbsRound(sheetObj.GetCellValue(row, prefix+"amt")/unit_qty,3),0);
		}
		if(usd_conv_rate == 0){
			sheetObj.SetCellValue(row, prefix+"usd_amt",0,0);
		}else{
			if(incls_vat_amt_flg == "Y"){
				sheetObj.SetCellValue(row, prefix+"usd_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"ttl_amt") * exrate/usd_conv_rate,2),0);
			}else{
				//alert(sheetObj.CellValue(row, prefix+"loc_amt")+"     "+sell_usd_conv_rate);
				//alert(ComAbsRound(sheetObj.CellValue(row, prefix+"loc_amt")/sell_usd_conv_rate)+"   "+ComAbsRound(sheetObj.CellValue(row, prefix+"loc_amt")/sell_usd_conv_rate,2))
				sheetObj.SetCellValue(row, prefix+"usd_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"loc_amt")/usd_conv_rate,2),0);
			}
		}
		if(sheetObj.GetCellValue(row, prefix+"internal_sts_cd") != "H"){
			sheetObj.SetCellValue(row, prefix+"internal_sts_cd","C",0);
		}
	}
}
function internal_apply(sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	var curr_cd="";
	var exrate="";
	var internal_curr_msg="";
	if(sb_cls_cd == 'S'){
		sheetObj=docObjects[1];
		prefix="Grd04";
		curr_cd=formObj.sell_curr_cd.value;
		exrate=formObj.sell_exrate.value;
	}else{
	    sheetObj=docObjects[2];
		prefix="Grd05";
		curr_cd=formObj.buy_curr_cd.value;
		exrate=formObj.buy_exrate.value;
	}
	if( sheetObj.RowCount() - sheetObj.RowCount('D') > 0){ //Row > 0
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
			//&& sheetObj.CellValue(i, prefix+"internal_sts_cd") != 'H' 
			if( sheetObj.GetCellValue(i, prefix+"cust_org_yn") == 'Y' && sheetObj.GetCellValue(i, prefix+"relay_inv_flag") != 'Y' && sheetObj.GetCellValue(i, prefix+"relay_cd") != '' && sheetObj.GetCellValue(i, prefix+"frt_seq") < 1000 ){
				//alert(sheetObj.CellValue(i, prefix+"curr_cd"));
/*if( sheetObj.GetCellValue(i, prefix+"curr_cd") == curr_cd ){
					//alert(exrate);
					sheetObj.SetCellValue(i, prefix+"exrate",exrate,0);
				}*/
				setInternalAutoCal(i, sb_cls_cd);
				if( sheetObj.GetCellValue(i, prefix+"internal_sts_cd") == "I" && parseFloat(sheetObj.GetCellValue(i, prefix+"internal_exrate")) == 0 && sheetObj.GetCellValue(i, prefix+"curr_cd") != curr_cd ){
					if(internal_curr_msg.indexOf(sheetObj.GetCellValue(i, prefix+"curr_cd")) == -1 ){
						if(internal_curr_msg == ""){
							internal_curr_msg=sheetObj.GetCellValue(i, prefix+"curr_cd");
						}else{
							internal_curr_msg=internal_curr_msg + "," + sheetObj.GetCellValue(i, prefix+"curr_cd");
						}
					}
				}
			} 
		}
	}	
	if(internal_curr_msg != ""){
		ComShowCodeMessage("COM0381", internal_curr_msg);
	}
}
function setLocAmtChangeCal(row, sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	if(sb_cls_cd == 'S'){
		sheetObj=docObjects[1];
		prefix="Grd04";
	}else{
	    sheetObj=docObjects[2];
		prefix="Grd05";
	}
	var branch=formObj.org_cd.value;
	if(branch == "KRSELLB" || branch == "JPTYOLB" || branch == "VNHANLB" || branch == "VNSGNLB"){
		sheetObj.SetCellValue(row, prefix+"loc_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"loc_amt"),0),0);
		if(sheetObj.GetCellValue(row, prefix+"amt") == 0){
			sheetObj.SetCellValue(row, prefix+"vat_amt",0,0);
		}else{
			sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"curr_vat_amt") * (sheetObj.GetCellValue(row, prefix+"loc_amt")/sheetObj.GetCellValue(row, prefix+"amt")),0),0);
		}
	}else{
		sheetObj.SetCellValue(row, prefix+"loc_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"loc_amt"),2),0);
		if(sheetObj.GetCellValue(row, prefix+"amt") == 0){
			sheetObj.SetCellValue(row, prefix+"vat_amt",0,0);
		}else{
			sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"curr_vat_amt") * (sheetObj.GetCellValue(row, prefix+"loc_amt")/sheetObj.GetCellValue(row, prefix+"amt")),2),0);
		}
	}		
}
function setVatAmtChangeCal(row, sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	var loc_curr_cd="";
	if(sb_cls_cd == 'S'){
		sheetObj=docObjects[1];
		prefix="Grd04";
		loc_curr_cd=formObj.sell_loc_curr_cd.value;
	}else{
	    sheetObj=docObjects[2];
		prefix="Grd05";
		loc_curr_cd=formObj.buy_loc_curr_cd.value;
	}
	var branch=formObj.org_cd.value;
	var curr_cd=sheetObj.GetCellValue(row, prefix+"curr_cd");
	if(branch == "KRSELLB" || branch == "JPTYOLB" || branch == "VNHANLB" || branch == "VNSGNLB"){
		sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"vat_amt"),0),0);
	}else{
		sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"vat_amt"),2),0);
	}		
	if(curr_cd == loc_curr_cd){
		sheetObj.SetCellValue(row, prefix+"curr_vat_amt",sheetObj.GetCellValue(row, prefix+"vat_amt"),0);
		sheetObj.SetCellValue(row, prefix+"ttl_amt",parseFloat(sheetObj.GetCellValue(row, prefix+"amt")) + parseFloat(sheetObj.GetCellValue(row, prefix+"curr_vat_amt")),0);
	}
}
var InputHeader="doc_no|ctrt_no|ctrt_nm|sales_ofc_cd|sales_pic_nm|pnl_svc_tp_nm|ctrt_ord_tp_nm|ship_cd|ship_nm|cne_cd|cne_nm|wo_cust_cd|wo_cust_nm|sprov_cd|sprov_nm";
InputHeader += "|tot_qty|tot_pkgqty|tot_pkgunit|tot_cbm|tot_kgs|cntr_type1|cntr_type2|cntr_type3|cntr_type4|cntr_type5|cntr_cnt1|cntr_cnt2|cntr_cnt3|cntr_cnt4|cntr_cnt5";
InputHeader += "|etd|eta|est_cmpl_dt|upd_dt|upd_user_nm|upd_org_nm|op_ofc_cd|wo_ord_tp_cd|ori_br_cd|dest_br_cd|tri_br_cd|ctrt_cust_cd|ctrt_cust_nm|loc_job_flg|loc_job_flg_nm|loc_job_close_dt|loc_job_close_dt_hm|frt_closing_dt|frt_closing_flg_nm|ord_tp_lvl2_cd|ex_in_cd";
var InputNameExRate="||sell_exrate_dt|sell_curr_cd|sell_exrate|sell_usd_conv_rate|buy_exrate_dt|buy_curr_cd|buy_exrate|buy_usd_conv_rate|sell_exrate_cls_cd|buy_exrate_cls_cd|sell_cust_cd|sell_cust_nm|buy_cust_cd|buy_cust_nm|ca_no|ca_status_nm";
var InputNameSumAmt="sum_tot_amt_sell|sum_vat_amt_sell|sum_loc_amt_sell|sum_inv_acct_sell|sum_tot_amt_buy|sum_vat_amt_buy|sum_loc_amt_buy|sum_inv_acct_buy";
//조회버튼

function displayData($xml){
	  
  $("#doc_no").val($xml.find( "doc_no").text());
  $("#ctrt_no").val($xml.find( "ctrt_no").text());
  $("#ctrt_nm").val($xml.find( "ctrt_nm").text());
  $("#sales_ofc_cd").val($xml.find( "sales_ofc_cd").text());
  //searchItem(); //load combobox Item depend on cust_cd
  $("#sales_pic_nm").val($xml.find( "sales_pic_nm").text());
  $("#pnl_svc_tp_nm").val($xml.find( "pnl_svc_tp_nm").text());
  $("#ctrt_ord_tp_nm").val($xml.find( "ctrt_ord_tp_nm").text());
  $("#ship_cd").val($xml.find( "ship_cd").text());
  
  $("#ship_nm").val($xml.find( "ship_nm").text());
  $("#cne_cd").val($xml.find( "cne_cd").text());
  $("#cne_nm").val($xml.find( "cne_nm").text());
  $("#wo_cust_cd").val($xml.find( "wo_cust_cd").text());
  
  $("#wo_cust_nm").val($xml.find( "wo_cust_nm").text());
  $("#sprov_cd").val($xml.find( "sprov_cd").text());
  $("#sprov_nm").val($xml.find( "sprov_nm").text());
  $("#tot_qty").val($xml.find( "tot_qty").text());

  $("#tot_pkgqty").val($xml.find( "tot_pkgqty").text());
  $("#tot_pkgunit").val($xml.find( "tot_pkgunit").text());
  $("#tot_cbm").val($xml.find( "tot_cbm").text());
  $("#tot_kgs").val($xml.find( "tot_kgs").text());

  $("#cntr_type1").val($xml.find( "cntr_type1").text());
  $("#cntr_type2").val($xml.find( "cntr_type2").text());
  $("#cntr_type3").val($xml.find( "cntr_type3").text());
  $("#cntr_type4").val($xml.find( "cntr_type4").text());
  
  $("#cntr_type5").val($xml.find( "cntr_type5").text());
  $("#cntr_cnt1").val($xml.find( "cntr_cnt1").text());
  $("#cntr_cnt2").val($xml.find( "cntr_cnt2").text());
  $("#cntr_cnt3").val($xml.find( "cntr_cnt3").text());

  $("#cntr_cnt4").val($xml.find( "cntr_cnt4").text());
  $("#cntr_cnt5").val($xml.find( "cntr_cnt5").text());
  $("#etd").val($xml.find( "etd").text());
  $("#eta").val($xml.find( "eta").text());
  
  var str = $xml.find( "est_cmpl_dt").text();
  var res = str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8) ;
  $("#est_cmpl_dt").val(res);
  
  $("#upd_dt").val($xml.find( "upd_dt").text());
  $("#upd_user_nm").val($xml.find( "upd_user_nm").text());
  $("#upd_org_nm").val($xml.find( "upd_org_nm").text());
  
  $("#op_ofc_cd").val($xml.find( "op_ofc_cd").text());
  $("#so_no").val($xml.find( "so_no").text());
  $("#wo_ord_tp_cd").val($xml.find( "wo_ord_tp_cd").text());
  $("#ori_br_cd").val($xml.find( "ori_br_cd").text());
  $("#dest_br_cd").val($xml.find( "dest_br_cd").text());
  
  $("#tri_br_cd").val($xml.find( "tri_br_cd").text());
  $("#ctrt_cust_cd").val($xml.find( "ctrt_cust_cd").text());
  $("#ctrt_cust_nm").val($xml.find( "ctrt_cust_nm").text());
  $("#loc_job_flg").val($xml.find( "loc_job_flg").text());
  
  $("#loc_job_flg_nm").val($xml.find( "loc_job_flg_nm").text());
  $("#loc_job_close_dt").val($xml.find( "loc_job_close_dt").text());
  $("#loc_job_close_dt_hm").val($xml.find( "loc_job_close_dt_hm").text());
  $("#frt_closing_dt").val($xml.find( "frt_closing_dt").text());
  
  $("#frt_closing_flg_nm").val($xml.find( "frt_closing_flg_nm").text());
  $("#ord_tp_lvl2_cd").val($xml.find( "ord_tp_lvl2_cd").text());
  $("#ex_in_cd").val($xml.find( "ex_in_cd").text());
  
}

function displayDataEx($xml){
	  
//	  $("#frt_doc_no").val($xml.find( "frt_doc_no").text());
//	  $("#ctrt_no").val($xml.find( "frt_br_cd").text());
	  $("#sell_exrate_dt").val($xml.find( "sell_exrate_dt").text());
	  $("#sell_curr_cd").val($xml.find( "sell_curr_cd").text());
	  //searchItem(); //load combobox Item depend on cust_cd
	  $("#sell_exrate").val($xml.find( "sell_exrate").text());
	  $("#sell_usd_conv_rate").val($xml.find( "sell_usd_conv_rate").text());
	  $("#buy_exrate_dt").val($xml.find( "buy_exrate_dt").text());
	  $("#buy_curr_cd").val($xml.find( "buy_curr_cd").text());
	  
	  $("#buy_exrate").val($xml.find( "buy_exrate").text());
	  $("#buy_usd_conv_rate").val($xml.find( "buy_usd_conv_rate").text());
	  
	  $('#sell_exrate_cls_cd option[value=' + $xml.find( "sell_exrate_cls_cd").text() + ']').attr('selected','selected');
	  $('#buy_exrate_cls_cd option[value=' + $xml.find( "buy_exrate_cls_cd").text() + ']').attr('selected','selected');
//	  $("#ctrt_ord_tp_nm").val($xml.find( "sell_exrate_cls_cd").text());
//	  $("#ship_cd").val($xml.find( "buy_exrate_cls_cd").text());
	  
	  $("#sell_cust_cd").val($xml.find( "sell_cust_cd").text());
	  $("#sell_cust_nm").val($xml.find( "sell_cust_nm").text());
	  $("#buy_cust_cd").val($xml.find( "buy_cust_cd").text());
	  $("#buy_cust_nm").val($xml.find( "buy_cust_nm").text());
	  
	  $("#ca_no").val($xml.find( "ca_no").text());
	  $("#ca_status_nm").val($xml.find( "ca_status_nm").text());
	  
	  var formObj=document.form;
		
		var selecthtml = '<option value="ALL">ALL</option>';
		
		var vTextSplit = formObj.sell_cust_nm.value.split("|");
		var vCodeSplit = formObj.sell_cust_cd.value.split("|");				

		for(var j=0;j<vCodeSplit.length; j++){
			if(vCodeSplit[j] != ""){
				selecthtml += '<option value="'+ vCodeSplit[j] +'">'+ vTextSplit[j] +'</option>';
			}
		}
		
		$('#sell_cust').html(selecthtml);
		
		vTextSplit = formObj.buy_cust_nm.value.split("|");
		vCodeSplit = formObj.buy_cust_cd.value.split("|");
		
		selecthtml = '<option value="ALL">ALL</option>';
		
		for(var j=0;j<vCodeSplit.length; j++){
			if(vCodeSplit[j] != ""){
				selecthtml += '<option value="'+ vCodeSplit[j] +'">'+ vTextSplit[j] +'</option>';
			}
		}
		
		$('#buy_cust').html(selecthtml);
	  
}

function displayDataSum($xml){
	  
	  $("#sum_tot_amt_sell").val($xml.find( "sum_tot_amt_sell").text());
	  $("#sum_vat_amt_sell").val($xml.find( "sum_vat_amt_sell").text());
	  $("#sum_loc_amt_sell").val($xml.find( "sum_loc_amt_sell").text());
	  $("#sum_inv_acct_sell").val($xml.find( "sum_inv_acct_sell").text());
	  //searchItem(); //load combobox Item depend on cust_cd
	  $("#sum_tot_amt_buy").val($xml.find( "sum_tot_amt_buy").text());
	  $("#sum_vat_amt_buy").val($xml.find( "sum_vat_amt_buy").text());
	  $("#sum_loc_amt_buy").val($xml.find( "sum_loc_amt_buy").text());
	  $("#sum_inv_acct_buy").val($xml.find( "sum_inv_acct_buy").text());
	  
}

function searchFreightMgmtJobNo(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			
			formObj.in_frt_doc_no.value = rtnArr[0];
			
			if(ComIsEmpty(formObj.in_frt_doc_no.value)){
				ComShowCodeMessage("COM0001","Job No");
				return;
			}else{
				var doc_type = rtnArr[1];
				
				if(doc_type == 'WO'){
					formObj.in_doc_cls_cd[0].checked = true;
				}else if(doc_type == 'FCR'){
					formObj.in_doc_cls_cd[1].checked = true;
				}else if(doc_type == 'SVO'){
					formObj.in_doc_cls_cd[2].checked = true;
				}
			}
		}
	}
}

function searchFreightMgmtDocExistsInfo(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			
			var doc_cnt  = rtnArr[0];
			var doc_type = rtnArr[1];
			
			formObj.doc_type.value = doc_type;
			
			var in_doc_cls_cd = "";
			
			if(formObj.in_doc_cls_cd[0].checked == true){
				in_doc_cls_cd = 'W';
			}else if(formObj.in_doc_cls_cd[1].checked == true){
				in_doc_cls_cd = 'F';
			}else if(formObj.in_doc_cls_cd[2].checked == true){
				in_doc_cls_cd = 'S';
			}
			
			if( "0" == doc_cnt ){
				if(in_doc_cls_cd == 'W'){
					ComShowCodeMessage("COM0001","W/O No");
				}else if(in_doc_cls_cd == 'F'){
					ComShowCodeMessage("COM0001","FCR No");
				}else if(in_doc_cls_cd == 'S'){
					ComShowCodeMessage("COM0001","Service Order No");
				}
				formObj.in_frt_doc_no.value = "";
				formObj.in_frt_doc_no.focus();
				
				ComBtnDisable("btn_save");
				ComBtnDisable("btn_copyFrom");
				ComBtnDisable("btn_routeRate");
				ComBtnDisable("btn_routeRate_buy");
				ComBtnDisable("btn_ca_history");
				ComBtnDisable("btn_indirectCost");
				//ComEnableButton("btn_delete", false, 1);
				ComBtnDisable("link_invoice");
				ComBtnDisable("link_consultation");
				ComBtnDisable("link_history");
			}else if( in_doc_cls_cd == 'S' && doc_type != 'P' && doc_type != 'WB' && doc_type != 'FCR' && doc_type != 'Y' ){
				ComShowCodeMessage("COM0173");
				formObj.in_frt_doc_no.value = "";
				formObj.in_frt_doc_no.focus();
				
				ComBtnDisable("btn_save");
				ComBtnDisable("btn_copyFrom");
				ComBtnDisable("btn_routeRate");
				ComBtnDisable("btn_routeRate_buy");
				ComBtnDisable("btn_ca_history");
				ComBtnDisable("btn_indirectCost");
				//ComEnableButton("btn_delete", false, 1);
				ComBtnDisable("link_invoice");
				ComBtnDisable("link_consultation");
				ComBtnDisable("link_history");
			// 2015.04.08 under 건인경우 doc auth 에 없는 branch는 조회안되도록...	
			}else if( (in_doc_cls_cd == 'W' && doc_type == 'N') || (in_doc_cls_cd == 'F' && doc_type == 'N') ){
				ComShowCodeMessage("COM0405");
				formObj.in_frt_doc_no.value = "";
				formObj.in_frt_doc_no.focus();
				
				ComBtnDisable("btn_save");
				ComBtnDisable("btn_copyFrom");
				ComBtnDisable("btn_routeRate");
				ComBtnDisable("btn_routeRate_buy");
				ComBtnDisable("btn_ca_history");
				ComBtnDisable("btn_indirectCost");
				//ComEnableButton("btn_delete", false, 1);
				ComBtnDisable("link_invoice");
				ComBtnDisable("link_consultation");
				ComBtnDisable("link_history");
			}else{
				
				formObj.f_cmd.value = SEARCH;
				
				var sXml = docObjects[0].GetSearchData("./FreightInfo_001GS.clt", FormQueryString(formObj,""));
				
				if( sXml.indexOf('<ERROR>') != -1){
					docObjects[0].LoadSearchData(sXml);
				} else {
					
					var xmlDoc = $.parseXML(sXml);
					var $xml = $(xmlDoc);
					displayData($xml);
					
					formObj.f_cmd.value = SEARCH01;
					
					docObjects[0].DoSearch("./FreightMgmt_001GS.clt", FormQueryString(formObj,""));
					
					formObj.f_cmd.value = SEARCH02;
					
					sXml = docObjects[0].GetSearchData("./FreightInfo_002GS.clt", FormQueryString(formObj,""));
					xmlDoc = $.parseXML(sXml);
					$xml = $(xmlDoc);
					displayDataEx($xml);
					
					formObj.f_cmd.value = SEARCH03;
					
					sXml = docObjects[0].GetSearchData("./FreightInfo_003GS.clt", FormQueryString(formObj,""));
					xmlDoc = $.parseXML(sXml);
					$xml = $(xmlDoc);
					displayDataSum($xml);
					
					formObj.f_cmd.value = SEARCH04;
					
					docObjects[1].DoSearch("./FreightMgmt_002GS.clt?sellorbuy=Sell", FormQueryString(formObj,""));
					
					docObjects[2].DoSearch("./FreightMgmt_002GS.clt?sellorbuy=Buy", FormQueryString(formObj,""));
					
				}	
				formObj.form_mode.value = "UPDATE"; 
				if(formObj.in_doc_cls_cd[0].checked == true){
					formObj.doc_cls_cd.value = 'W';
				}else if(formObj.in_doc_cls_cd[1].checked == true){
					formObj.doc_cls_cd.value = 'F';
				}else if(formObj.in_doc_cls_cd[2].checked == true){
					formObj.doc_cls_cd.value = 'S';
				}
				
				formObj.bf_sell_exrate_dt.value = formObj.sell_exrate_dt.value;
				formObj.bf_buy_exrate_dt.value = formObj.buy_exrate_dt.value;
				
				ComBtnEnable("btn_save");
				if(doc_type == 'Y'){
					ComBtnDisable("btn_copyFrom");
					ComBtnDisable("btn_routeRate");
					ComBtnDisable("btn_routeRate_buy");
					ComBtnDisable("btn_sell_add");
					ComBtnDisable("btn_sell_del");
					ComBtnDisable("btn_buy_add");
					ComBtnDisable("btn_buy_del");
				}else{
					ComBtnEnable("btn_copyFrom");
					ComBtnEnable("btn_routeRate");
					ComBtnEnable("btn_routeRate_buy");
					ComBtnEnable("btn_sell_add");
					ComBtnEnable("btn_sell_del");
					ComBtnEnable("btn_buy_add");
					ComBtnEnable("btn_buy_del");
				}
				//ComEnableButton("btn_delete", true, 1);
				ComBtnEnable("link_invoice");
				ComBtnEnable("link_consultation");
				ComBtnEnable("link_history");
				ComBtnEnable("btn_indirectCost");
				
				if(formObj.ca_no.value == ""){
					ComBtnDisable("btn_ca_history");
				}else{
					ComBtnEnable("btn_ca_history");
				}
				
				if(formObj.doc_cls_cd.value == 'F'){
					if(formObj.sell_exrate_dt.value == ''){
						if(formObj.etd.value > formObj.curr_date.value){
							formObj.sell_exrate_dt.value = formObj.curr_date.value;
						}else{
							formObj.sell_exrate_dt.value = formObj.etd.value;
						}
					}
					if(formObj.buy_exrate_dt.value == ''){
						if(formObj.etd.value > formObj.curr_date.value){
							formObj.buy_exrate_dt.value = formObj.curr_date.value;
						}else{
							formObj.buy_exrate_dt.value = formObj.etd.value;
						}
					}
				}else{
					if(formObj.sell_exrate_dt.value == ''){
						formObj.sell_exrate_dt.value = formObj.curr_date.value;
					}
					if(formObj.buy_exrate_dt.value == ''){
						formObj.buy_exrate_dt.value = formObj.curr_date.value;
					}
				}
				
				if(formObj.sell_curr_cd.value == ''){
					if(formObj.org_cd.value == 'NLBUDLB' || formObj.org_cd.value == 'NLCASLA' || formObj.org_cd.value == 'NLFRALB' ||
				   	   formObj.org_cd.value == 'NLFXTLB' || formObj.org_cd.value == 'NLGHTLA' || formObj.org_cd.value == 'NLHAMLB' ||
				   	   formObj.org_cd.value == 'NLLEHLB' || formObj.org_cd.value == 'NLVLCLA' || formObj.org_cd.value == 'NLWRPLB'){
						formObj.sell_curr_cd.value = 'EUR';
					}else{
						formObj.sell_curr_cd.value = 'USD';
					}	
				}
				
				if(formObj.buy_curr_cd.value == ''){
					if(formObj.org_cd.value == 'NLBUDLB' || formObj.org_cd.value == 'NLCASLA' || formObj.org_cd.value == 'NLFRALB' ||
				   	   formObj.org_cd.value == 'NLFXTLB' || formObj.org_cd.value == 'NLGHTLA' || formObj.org_cd.value == 'NLHAMLB' ||
				   	   formObj.org_cd.value == 'NLLEHLB' || formObj.org_cd.value == 'NLVLCLA' || formObj.org_cd.value == 'NLWRPLB'){
						formObj.buy_curr_cd.value = 'EUR';
					}else{
						formObj.buy_curr_cd.value = 'USD';
					}	
				}
				
				if(formObj.sell_exrate.value == ''){
					searchDailyExRateInfo("S");
				}
				
				if(formObj.buy_exrate.value == ''){
					searchDailyExRateInfo("B");
				}
			}
		}
	}
}

function btn_Search() {
	
	var formObj = document.form;
	doShowProcess();
	 setTimeout(function(){
	
	if(loading_flag != "Y"){
		return;
	}
	
	var in_frt_doc_no = formObj.in_frt_doc_no.value;
	var in_job_no = formObj.in_job_no.value;
	var in_doc_cls_cd = "";
	
	var incls_vat_amt_flg = formObj.incls_vat_amt_flg.value;
	var sell_vat_def_cd   = formObj.sell_vat_def_cd.value;
	var buy_vat_def_cd    = formObj.buy_vat_def_cd.value;
	var ctry_cd           = formObj.ctry_cd.value;
	var auto_ca_use       = formObj.auto_ca_use.value;
	
	if(formObj.in_doc_cls_cd[0].checked == true){
		in_doc_cls_cd = 'W';
	}else if(formObj.in_doc_cls_cd[1].checked == true){
		in_doc_cls_cd = 'F';
	}else if(formObj.in_doc_cls_cd[2].checked == true){
		in_doc_cls_cd = 'S';
	}
	
	if(formObj.in_frt_doc_no.value == ""  && ComIsEmpty(formObj.in_job_no.value)){
		ComShowCodeMessage("COM0133");
		formObj.in_frt_doc_no.focus();
		return;
	}
	
	formObj.reset();
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	
	formObj.incls_vat_amt_flg.value = incls_vat_amt_flg;
	formObj.sell_vat_def_cd.value   = sell_vat_def_cd;
	formObj.buy_vat_def_cd.value    = buy_vat_def_cd;
	formObj.ctry_cd.value           = ctry_cd;
	formObj.auto_ca_use.value       = auto_ca_use;
	
	formObj.in_frt_doc_no.value = in_frt_doc_no;
	formObj.in_job_no.value = in_job_no;
	if(in_doc_cls_cd == 'W'){
		formObj.in_doc_cls_cd[0].checked = true;
	}else if(in_doc_cls_cd == 'F'){
		formObj.in_doc_cls_cd[1].checked = true;
	}else if(in_doc_cls_cd == 'S'){
		formObj.in_doc_cls_cd[2].checked = true;
	}
	
	if(ComIsEmpty(in_frt_doc_no)){
		
		ajaxSendPost(searchFreightMgmtJobNo, 'reqVal', '&goWhere=aj&bcKey=searchFreightMgmtJobNo&in_job_no=' + in_job_no + "&org_cd=" + formObj.org_cd.value, './GateServlet.gsl');
		
	}
	
	var in_doc_cls_cd = "";
	if(formObj.in_doc_cls_cd[0].checked){
		in_doc_cls_cd = "W";
	}else if(formObj.in_doc_cls_cd[1].checked){
		in_doc_cls_cd = "F";
	}else if(formObj.in_doc_cls_cd[2].checked){
		in_doc_cls_cd = "S";
	}
	
	ajaxSendPost(searchFreightMgmtDocExistsInfo, 'reqVal', '&goWhere=aj&bcKey=searchFreightMgmtDocExistsInfo&in_doc_cls_cd=' + in_doc_cls_cd + "&in_frt_doc_no=" + formObj.in_frt_doc_no.value + "&org_cd=" + formObj.org_cd.value, './GateServlet.gsl');
	
	doHideProcess();
	 },100);
	 
}
function btn_Save() {
	var formObj=document.form;
	if(validation()){
		if(ComShowCodeConfirm("COM0063")){
			
			formObj.f_cmd.value = MULTI;
			
			var sParam=FormQueryString(formObj, null, "");
			sParam += "&" + ComGetSaveString(docObjects[1],  true, true);
			sParam += "&" + ComGetSaveString(docObjects[2],  true, true);
			
 			var saveXml=docObjects[0].GetSaveData("./saveFreightMgmtInfo.clt", sParam);
			docObjects[0].LoadSearchData(saveXml,{Sync:1} );
			//1. Save 후 조회
			if( saveXml.indexOf('<ERROR>') == -1){
				ComShowCodeMessage("COM0093", "");
				btn_Search();
			}
		}
	}	
}
function btn_Delete(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if(ComShowCodeConfirm("COM0053")){
		
		formObj.f_cmd.value = MULTI01;
		
		sParam=FormQueryString(formObj, "");
		
 		var saveXml=sheetObj.GetSaveData("./deleteFreightMgmt.clt",sParam);
 		
 		try {
 			var xmlDoc = $.parseXML(saveXml);
 			var $xml = $(xmlDoc);
 			var rtnVal = $xml.find("DATA")[0].attributes.getNamedItem("TOTAL").value;
 			if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
 				ComShowCodeMessage("COM0410");
 			}else{
 				ComShowCodeMessage("COM132601");
 				btn_Search(divSave);
 			}
 			
 		}catch(e) {
 			ComShowCodeMessage("COM0410");
 		}
 		
// 		sheetObj.LoadSaveData(saveXml);
//		//1. Reinstate 후 조회
//		if( saveXml.indexOf('<ERROR>') == -1){
//			ComShowCodeMessage("COM0080", "");
//			btn_Search();
//		}
	}
}
function validation(){
	var formObj=document.form;
	var vat="";
	var vatSplit="";
	var sheetObj1=docObjects[1];
	var sheetObj2=docObjects[2];
	var sheet1pefix="Grd04";
	var sheet2pefix="Grd05";
	/*if(formObj.auth_lvl.value == 'HQ' || formObj.auth_lvl.value == 'AQ'){
		ComShowCodeMessage("COM0261");
		return;
	}*/
	if (ComIsEmpty(formObj.sell_exrate_dt) || !isDate(formObj.sell_exrate_dt)) {
		ComShowCodeMessage("COM0082","Selling Ex.Rate Date");
		formObj.sell_exrate_dt.focus();
		return false;
	}
	if (ComIsEmpty(formObj.buy_exrate_dt) || !isDate(formObj.buy_exrate_dt)) {
		ComShowCodeMessage("COM0082","Buying Ex.Rate Date");
		formObj.buy_exrate_dt.focus();
		return false;
	}
	if(isNull(formObj.sell_curr_cd)){
		ComShowCodeMessage("COM0082","Selling Foreign Currency");
		formObj.sell_curr_cd.focus();
		return;
	}
	if(isNull(formObj.buy_curr_cd)){
		ComShowCodeMessage("COM0082","Buying Foreign Currency");
		formObj.buy_curr_cd.focus();
		return;
	}
	if(isNull(formObj.sell_exrate)){
		ComShowCodeMessage("COM0082","Selling Ex.Rate");
		formObj.sell_exrate.focus();
		return;
	}
	if(isNull(formObj.buy_exrate)){
		ComShowCodeMessage("COM0082","Buying Ex.Rate");
		formObj.buy_exrate.focus();
		return;
	}
	if(isNull(formObj.sell_usd_conv_rate)){
		ComShowCodeMessage("COM0082","Selling 1 USD Converted to");
		formObj.sell_usd_conv_rate.focus();
		return;
	}
	if(isNull(formObj.buy_usd_conv_rate)){
		ComShowCodeMessage("COM0082","Buying 1 USD Converted to");
		formObj.buy_usd_conv_rate.focus();
		return;
	}
	//if( sheetObj1.RowCount()-sheetObj1.RowCount('D') == 0 && sheetObj2.RowCount()-sheetObj2.RowCount('D') == 0 ){
	//	ComShowCodeMessage("COM0260");
	//	return;
	//}
	if( sheetObj1.RowCount()> 0 ){
		for(var i=sheetObj1.HeaderRows(); i<=sheetObj1.LastRow()-1; i++) {
			if(sheetObj1.GetCellValue(i, sheet1pefix+"ibflag") != 'D'){
				if(sheetObj1.GetCellValue(i, sheet1pefix+"ibflag") == 'I' || sheetObj1.GetCellValue(i, sheet1pefix+"ibflag") == 'U'){
					vat=sheetObj1.GetCellText(i, sheet1pefix+"val_cls_cd");
					vatSplit=vat.split("(");
					if(vat == "NIL"){
						vat=0;
					}else{
						vat=parseFloat(vatSplit[0]);
					}
					//Order No , Item 필수 입력 체크
					if( sheetObj1.GetCellValue(i, sheet1pefix+"cust_cd") == "" ){
						ComShowCodeMessage("COM0165", i-1, "Customer (Selling)");
						return ;				
					}else if( sheetObj1.GetCellValue(i, sheet1pefix+"frt_cd") == "" ){
						ComShowCodeMessage("COM0165", i-1, "Freight (Selling)");
						return ;				
					}else if( sheetObj1.GetCellValue(i, sheet1pefix+"curr_cd") == "" ){
						ComShowCodeMessage("COM0165", i-1, "Currency (Selling)");
						return ;				
					}else if( sheetObj1.GetCellValue(i, sheet1pefix+"exrate") == "" || sheetObj1.GetCellValue(i, sheet1pefix+"exrate") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "Ex.Rate (Selling)");
						return ;				
					}else if( sheetObj1.GetCellValue(i, sheet1pefix+"unit_cd") == "" || sheetObj1.GetCellValue(i, sheet1pefix+"unit_cd") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "Unit (Selling)");
						return ;				
					}else if( sheetObj1.GetCellValue(i, sheet1pefix+"unit_qty") == "" || sheetObj1.GetCellValue(i, sheet1pefix+"unit_qty") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "Pkgs (Selling)");
						return ;				
					}else if( sheetObj1.GetCellValue(i, sheet1pefix+"unit_price") == "" || sheetObj1.GetCellValue(i, sheet1pefix+"unit_price") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "Rate (Selling)");
						return ;				
					}else if( sheetObj1.GetCellValue(i, sheet1pefix+"amt") == "" || sheetObj1.GetCellValue(i, sheet1pefix+"amt") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "NET AMT(ENT) (Selling)");
						return ;				
					}else if( sheetObj1.GetCellValue(i, sheet1pefix+"loc_amt") == "" || sheetObj1.GetCellValue(i, sheet1pefix+"loc_amt") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "NET AMT(LOC) (Selling)");
						return ;				
					}else if( vat != 0 && vat != 'NIL' &&
							  (sheetObj1.GetCellText(i, sheet1pefix+"vat_amt") == "" || sheetObj1.GetCellText(i, sheet1pefix+"vat_amt") == 0) ){
						ComShowCodeMessage("COM0160", i-1, "Please enter VAT Amount greater than zero because VAT(%) type is not NIL or 0 (Selling)");
						return ;				
					}else if( (vat == 0 || vat == 'NIL') &&
							  sheetObj1.GetCellText(i, sheet1pefix+"vat_amt") != "" && sheetObj1.GetCellText(i, sheet1pefix+"vat_amt") != 0 ){
						ComShowCodeMessage("COM0160", i-1, "Please enter VAT Amount to zero because VAT(%) type is NIL or 0 (Selling)");
						return ;				
					}else if( sheetObj1.GetCellValue(i, sheet1pefix+"cust_org_yn") == "Y" && sheetObj1.GetCellValue(i, sheet1pefix+"relay_inv_flag") != "Y" &&
							sheetObj1.GetCellValue(i, sheet1pefix+"relay_cd") != "" && !(sheetObj1.GetCellValue(i, sheet1pefix+"internal_sts_cd") == "C" || sheetObj1.GetCellValue(i, sheet1pefix+"internal_sts_cd") == "H") ){
						ComShowCodeMessage("COM0160", i-1, "Please apply your actual Ex.Rate to the Internal Freight (Selling)");
						return ;				
					}else if( sheetObj1.GetCellValue(i, sheet1pefix+"curr_cd") == formObj.sell_loc_curr_cd.value && sheetObj1.GetCellValue(i, sheet1pefix+"exrate") != 1 ){
						ComShowCodeMessage("COM0160", i-1, "Selling Ex.Rate Information Check (Selling)");
						return ;				
					}else if( sheetObj1.GetCellValue(i, sheet1pefix+"curr_cd") == formObj.sell_loc_curr_cd.value && sheetObj1.GetCellValue(i, sheet1pefix+"amt") != sheetObj1.GetCellValue(i, sheet1pefix+"loc_amt") ){
						ComShowCodeMessage("COM0160", i-1, "Selling NET AMT(LOC) Info Check (Selling)");
						return ;				
					}
				}
			}
		}		
	}
	if( sheetObj2.RowCount()> 0 ){
		for(var i=sheetObj2.HeaderRows(); i<=sheetObj2.LastRow()-1; i++) {
			if(sheetObj2.GetCellValue(i, sheet2pefix+"ibflag") != 'D'){
				if(sheetObj2.GetCellValue(i, sheet2pefix+"ibflag") == 'I' || sheetObj2.GetCellValue(i, sheet2pefix+"ibflag") == 'U'){
					vat=sheetObj2.GetCellText(i, sheet2pefix+"val_cls_cd");
					vatSplit=vat.split("(");
					if(vat == "NIL"){
						vat=0;
					}else{
						vat=parseFloat(vatSplit[0]);
					}
					//Order No , Item 필수 입력 체크
					if( sheetObj2.GetCellValue(i, sheet2pefix+"cust_cd") == "" ){
						ComShowCodeMessage("COM0165", i-1, "Provider (Buying)");
						return ;				
					}else if( sheetObj2.GetCellValue(i, sheet2pefix+"frt_cd") == "" ){
						ComShowCodeMessage("COM0165", i-1, "Freight (Buying)");
						return ;				
					}else if( sheetObj2.GetCellValue(i, sheet2pefix+"curr_cd") == "" ){
						ComShowCodeMessage("COM0165", i-1, "Currency (Buying)");
						return ;				
					}else if( sheetObj2.GetCellValue(i, sheet2pefix+"exrate") == "" || sheetObj2.GetCellValue(i, sheet2pefix+"exrate") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "Ex.Rate (Buying)");
						return ;				
					}else if( sheetObj2.GetCellValue(i, sheet2pefix+"unit_cd") == "" || sheetObj2.GetCellValue(i, sheet2pefix+"unit_cd") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "Unit (Buying)");
						return ;				
					}else if( sheetObj2.GetCellValue(i, sheet2pefix+"unit_qty") == "" || sheetObj2.GetCellValue(i, sheet2pefix+"unit_qty") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "Pkgs (Buying)");
						return ;				
					}else if( sheetObj2.GetCellValue(i, sheet2pefix+"unit_price") == "" || sheetObj2.GetCellValue(i, sheet2pefix+"unit_price") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "Rate (Buying)");
						return ;				
					}else if( sheetObj2.GetCellValue(i, sheet2pefix+"amt") == "" || sheetObj2.GetCellValue(i, sheet2pefix+"amt") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "NET AMT(ENT) (Buying)");
						return ;				
					}else if( sheetObj2.GetCellValue(i, sheet2pefix+"loc_amt") == "" || sheetObj2.GetCellValue(i, sheet2pefix+"loc_amt") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "NET AMT(LOC) (Buying)");
						return ;				
					}else if( vat != 0 && vat != 'NIL' &&
							  (sheetObj2.GetCellText(i, sheet2pefix+"vat_amt") == "" || sheetObj2.GetCellText(i, sheet2pefix+"vat_amt") == 0) ){
						ComShowCodeMessage("COM0160", i-1, "Please enter VAT Amount greater than zero because VAT(%) type is not NIL or 0 (Buying)");
						return ;				
					}else if( (vat == 0 || vat == 'NIL') &&
							  sheetObj2.GetCellText(i, sheet2pefix+"vat_amt") != "" && sheetObj2.GetCellText(i, sheet2pefix+"vat_amt") != 0 ){
						ComShowCodeMessage("COM0160", i-1, "Please enter VAT Amount to zero because VAT(%) type is NIL or 0 (Buying)");
						return ;				
					}else if( sheetObj2.GetCellValue(i, sheet2pefix+"cust_org_yn") == "Y" && sheetObj2.GetCellValue(i, sheet2pefix+"relay_inv_flag") != "Y" &&
							sheetObj2.GetCellValue(i, sheet2pefix+"relay_cd") != "" && !(sheetObj2.GetCellValue(i, sheet2pefix+"internal_sts_cd") == "C" || sheetObj2.GetCellValue(i, sheet2pefix+"internal_sts_cd") == "H") ){
						ComShowCodeMessage("COM0160", i-1, "Please apply your actual Ex.Rate to the Internal Freight (Buying)");
						return ;				
					}else if( sheetObj2.GetCellValue(i, sheet2pefix+"curr_cd") == formObj.sell_loc_curr_cd.value && sheetObj2.GetCellValue(i, sheet2pefix+"exrate") != 1 ){
						ComShowCodeMessage("COM0160", i-1, "Selling Ex.Rate Information Check (Buying)");
						return ;				
					}else if( sheetObj2.GetCellValue(i, sheet2pefix+"curr_cd") == formObj.sell_loc_curr_cd.value && sheetObj2.GetCellValue(i, sheet2pefix+"amt") != sheetObj2.GetCellValue(i, sheet2pefix+"loc_amt") ){
						ComShowCodeMessage("COM0160", i-1, "Selling NET AMT(LOC) Info Check (Buying)");
						return ;				
					}else if( (formObj.org_cd.value == 'VNSGNLB' || formObj.org_cd.value == 'VNHANLB') &&
							  sheetObj2.GetCellText(i, sheet2pefix+"cust_org_yn") == "Y" && vat == 5 ){
						ComShowCodeMessage("COM0160", i-1, "VAT 5% can not be selected under internal transaction (Buying)");
						return ;				
					}
				}
			}
		}		
	}
	var ca_pop_flag=0;
	if( sheetObj1.RowCount()> 0 ){
		for(var i=sheetObj1.HeaderRows(); i<=sheetObj1.LastRow()-1; i++) {
			if(sheetObj1.GetCellValue(i, sheet1pefix+"ibflag") == "I" || sheetObj1.GetCellValue(i, sheet1pefix+"ibflag") == "D"){
				if( sheetObj1.GetCellValue(i, sheet1pefix+"cust_org_yn") == "Y" && sheetObj1.GetCellValue(i, sheet1pefix+"relay_cd") != "" ){
				}else{
					ca_pop_flag++;
				}
			}else if(sheetObj1.GetCellValue(i, sheet1pefix+"ibflag") == "U"){
				for(var j=0;j<sheetObj1.LastCol()+1;j++){
					//alert(sheetObj1.ColSaveName(j));  accrual_cd  chk
					if(sheetObj1.ColSaveName(j) != sheet1pefix+"accrual_cd" && sheetObj1.ColSaveName(j) != sheet1pefix+"pass_cd" && sheetObj1.ColSaveName(j) != sheet1pefix+"chk" && sheetObj1.ColSaveName(j) != sheet1pefix+"seq" && sheetObj1.ColSaveName(j) != sheet1pefix+"ibflag"){
						//alert(sheetObj1.ColSaveName(j));
						if(sheetObj1.GetCellValue(i, sheetObj1.ColSaveName(j)) != sheetObj1.CellSearchValue(i, sheetObj1.ColSaveName(j))){
							alert(sheetObj1.ColSaveName(j));
							ca_pop_flag++;
						}
					}
				}
			}
		}		
	}
	if( sheetObj2.RowCount()> 0 ){
		for(var i=sheetObj2.HeaderRows(); i<=sheetObj2.LastRow()-1; i++) {
			if(sheetObj2.GetCellValue(i, sheet2pefix+"ibflag") == "I" || sheetObj2.GetCellValue(i, sheet2pefix+"ibflag") == "D"){
				if( sheetObj2.GetCellValue(i, sheet2pefix+"cust_org_yn") == "Y" && sheetObj2.GetCellValue(i, sheet2pefix+"relay_cd") != "" ){
				}else{
					ca_pop_flag++;
				}
			}else if(sheetObj2.GetCellValue(i, sheet2pefix+"ibflag") == "U"){
				for(var j=0;j<sheetObj2.LastCol()+1;j++){
					//alert(sheetObj2.ColSaveName(j));  accrual_cd  chk
					if(sheetObj2.ColSaveName(j) != sheet2pefix+"accrual_cd" && sheetObj2.ColSaveName(j) != sheet2pefix+"pass_cd" && sheetObj2.ColSaveName(j) != sheet2pefix+"chk" && sheetObj2.ColSaveName(j) != sheet2pefix+"seq" && sheetObj2.ColSaveName(j) != sheet2pefix+"ibflag"){
						//alert(sheetObj2.ColSaveName(j));
						if(sheetObj2.GetCellValue(i, sheetObj2.ColSaveName(j)) != sheetObj2.CellSearchValue(i, sheetObj2.ColSaveName(j))){
							alert(sheetObj2.ColSaveName(j));
							ca_pop_flag++;
						}
					}
				}
			}
		}
	}
	if(ca_pop_flag > 0){
		if(formObj.frt_closing_flg_nm.value == "Close" || formObj.ca_status_nm == "Hold"){
			formObj.ca_popup_yn.value="";
			formObj.rmk.value="";
			btn_CAIssuePopup();
		}
		if(formObj.ca_popup_yn.value == "N"){
			return ;
		}
	}
	return true;
}
function btn_copyFrom(){
	var formObj=document.form;
	
	callBackFunc = "setHstInfo";
    modal_center_open('./FreightCopyFormPopup.clt?fcr_doc_no='+formObj.doc_no.value+"&doc_cls_cd="+formObj.doc_cls_cd.value, rtnary, 1100,750,"yes");
	
}
function btn_Hst(){
	if(ComDisableTdButton("link_history", 2))
		return ;
	var formObj=document.form;
	
	callBackFunc = "setHstInfo";
    modal_center_open('./FreightCopyFormPopup.clt?fcr_doc_no='+formObj.doc_no.value+"&doc_cls_cd="+formObj.doc_cls_cd.value, rtnary, 1100,750,"yes");
	
}
function routeRate(sb_cls_cd){
	var formObj=document.form;
	var ctrt_no=formObj.ctrt_no.value;
	var ctrt_nm=formObj.ctrt_nm.value;
	if(sb_cls_cd == 'S'){
		if(isNull(formObj.sell_exrate) || formObj.sell_exrate.value == 0){
			ComShowCodeMessage("COM0082","Selling Ex.Rate");
			formObj.sell_exrate.focus();
			return;
		}
		if(isNull(formObj.sell_usd_conv_rate) || formObj.sell_usd_conv_rate.value == 0){
			ComShowCodeMessage("COM0082","Selling 1 USD Converted to");
			formObj.sell_usd_conv_rate.focus();
			return;
		}
	}else{
	    if(isNull(formObj.buy_exrate) || formObj.buy_exrate.value == 0){
			ComShowCodeMessage("COM0082","Buying Ex.Rate");
			formObj.buy_exrate.focus();
			return;
		}
		if(isNull(formObj.buy_usd_conv_rate) || formObj.buy_usd_conv_rate.value == 0){
			ComShowCodeMessage("COM0082","Buying 1 USD Converted to");
			formObj.buy_usd_conv_rate.focus();
			return;
		}
	}
	
	callBackFunc = "setHstInfo";
    modal_center_open('./FreightRouteRatePopup.clt?display=none&ctrt_no='+ctrt_no+"&ctrt_nm="+ctrt_nm+"&sb_cls_cd="+sb_cls_cd, rtnary, 1100,750,"yes");
    
}
function btn_Invoice(){
	var formObj=document.form;
	if(ComDisableTdButton("link_invoice", 2))
		return ;
	var sParam="";
	var sUrl="";
	if(formObj.doc_cls_cd.value == "W"){
		sParam="link_nm=WO_INVOICE_CRT&link_doc_no="+formObj.doc_no.value;
	}else if(formObj.doc_cls_cd.value == "F"){
		sParam="link_nm=FCR_INVOICE_CRT&link_doc_no="+formObj.doc_no.value;
	}else if(formObj.doc_cls_cd.value == "S"){
		sParam="link_nm=SVO_INVOICE_CRT&link_doc_no="+formObj.doc_no.value;
	}
	sUrl="/opusfwd/ssootherlinkmain.clt?"+sParam;
	form.action=sUrl; 
    form.target="_blank";
    form.method="POST";
    form.submit();
}
function btn_Csr(){
	var formObj=document.form;
	if(ComDisableTdButton("link_consultation", 2))
		return ;
	var sParam="";
	var sUrl="";
	if(formObj.doc_cls_cd.value == "W"){
		sParam="link_nm=WO_CSR_CRT&link_doc_no="+formObj.doc_no.value;
	}else if(formObj.doc_cls_cd.value == "F"){
		sParam="link_nm=FCR_CSR_CRT&link_doc_no="+formObj.doc_no.value;
	}else if(formObj.doc_cls_cd.value == "S"){
		sParam="link_nm=SVO_CSR_CRT&link_doc_no="+formObj.doc_no.value;
	}
	sUrl="/opusfwd/ssootherlinkmain.clt?"+sParam;
	form.action=sUrl; 
    form.target="_blank";
    form.method="POST";
    form.submit();
}
function btn_link_ca(){
	var formObj=document.form;
	if(!ComIsEmpty(formObj.ca_no)){
		var sParam="";
		var sUrl="";
		sParam="link_nm=CA_MGMT&link_doc_no="+formObj.ca_no.value;
		sUrl="/opusfwd/ssootherlinkmain.clt?"+sParam;
		form.action=sUrl; 
	    form.target="_blank";
	    form.method="POST";
	    form.submit();
	}
}
function goTabSelect(isNumSep) {
	var tabObjs = document.getElementsByName('tabLayer');
    if( isNumSep == "01" ) {
        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';

    //Container List 목록
    }else if( isNumSep == "02" ) {
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "inline";
    }
    
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});
}
function row_sell_add() {
	var formObj=document.form;
	var sheetObj=docObjects[1];
	var prefix="Grd04";
	if (ComIsEmpty(formObj.sell_exrate_dt) || !isDate(formObj.sell_exrate_dt)) {
		ComShowCodeMessage("COM0082","Selling Ex.Rate Date");
		formObj.sell_exrate_dt.focus();
		return;
	}
	if(isNull(formObj.sell_curr_cd)){
		ComShowCodeMessage("COM0082","Selling Foreign Currency");
		formObj.sell_curr_cd.focus();
		return;
	}
	if(isNull(formObj.sell_exrate)){
		ComShowCodeMessage("COM0082","Selling Ex.Rate");
		formObj.sell_exrate.focus();
		return;
	}
	if(isNull(formObj.sell_usd_conv_rate)){
		ComShowCodeMessage("COM0082","Selling 1 USD Converted to");
		formObj.sell_usd_conv_rate.focus();
		return;
	}
	var row=sheetObj.DataInsert(-1);
	if( sheetObj.RowCount() - sheetObj.RowCount('D') > 1){
		sheetObj.SetCellValue(row,prefix+"cust_cd",sheetObj.GetCellValue(row-1,prefix+"cust_cd"));
		sheetObj.SetCellValue(row,prefix+"cust_nm",sheetObj.GetCellValue(row-1,prefix+"cust_nm"));
		sheetObj.SetCellValue(row,prefix+"cust_org_yn",sheetObj.GetCellValue(row-1,prefix+"cust_org_yn"));
	//}else if(formObj.in_doc_cls_cd[1].checked == true ){ //FCR
	}else if(formObj.doc_cls_cd.value == "F" ){ //FCR	
		sheetObj.SetCellValue(row,prefix+"cust_cd",formObj.ship_cd.value);
		sheetObj.SetCellValue(row,prefix+"cust_nm",formObj.ship_nm.value);
	}else if(formObj.doc_cls_cd.value == "W" && formObj.wo_ord_tp_cd.value != 'P' && formObj.op_ofc_cd.value == formObj.ori_br_cd.value ){
		sheetObj.SetCellValue(row,prefix+"cust_cd",formObj.ship_cd.value);
		sheetObj.SetCellValue(row,prefix+"cust_nm",formObj.ship_nm.value);
	}else if(formObj.doc_cls_cd.value == "W" && formObj.wo_ord_tp_cd.value != 'P' && formObj.op_ofc_cd.value == formObj.dest_br_cd.value ){
		sheetObj.SetCellValue(row,prefix+"cust_cd",formObj.cne_cd.value);
		sheetObj.SetCellValue(row,prefix+"cust_nm",formObj.cne_nm.value);
	}else if(formObj.doc_cls_cd.value == "S" ){ //FCR
		sheetObj.SetCellValue(row,prefix+"cust_cd",formObj.ctrt_cust_cd.value);
		//sheetObj.CellValue(row,prefix+"cust_nm") = formObj.ctrt_cust_nm.value;
	}else{
		sheetObj.SetCellValue(row,prefix+"cust_cd",formObj.wo_cust_cd.value);
		sheetObj.SetCellValue(row,prefix+"cust_nm",formObj.wo_cust_nm.value);
	}
	if( formObj.sell_vat_def_cd.value != '' ){
		sheetObj.SetCellValue(row,prefix+"val_cls_cd",formObj.sell_vat_def_cd.value);
	}else{
		sheetObj.SetCellValue(row,prefix+"val_cls_cd","NIL");
	}
	sheetObj.SetCellValue(row,prefix+"frt_br_cd",formObj.org_cd.value);
	sheetObj.SetCellValue(row,prefix+"internal_sts_cd","");
	sheetObj.SetCellValue(row,prefix+"curr_cd",formObj.sell_curr_cd.value);
	sheetObj.SetCellValue(row,prefix+"exrate",formObj.sell_exrate.value);
	if(formObj.ctry_cd.value == 'IN'){
		sheetObj.SetCellEditable(row, prefix+"val_cls_cd",0);
	}
}
function row_sell_del(){
	var sheetObj=docObjects[1];
	var prefix="Grd04";
	if (sheetObj.CheckedRows(prefix + "chk") != 0) {
		if(sheetObj.RowCount() > 0){
			ComRowHideDelete(sheetObj, prefix + "chk", true);
			//form_ctrt_copy();
			//Forwarding_Cbm_Kgs_Sum('A');
		}
    } else {
    	ComShowCodeMessage("COM0170");
    }
}
function row_buy_add() {
	var formObj=document.form;
	var sheetObj=docObjects[2];
	var prefix="Grd05";
	if (ComIsEmpty(formObj.buy_exrate_dt) || !isDate(formObj.buy_exrate_dt)) {
		ComShowCodeMessage("COM0082","Buying Ex.Rate Date");
		formObj.buy_exrate_dt.focus();
		return;
	}
	if(isNull(formObj.buy_curr_cd)){
		ComShowCodeMessage("COM0082","Buying Foreign Currency");
		formObj.buy_curr_cd.focus();
		return;
	}
	if(isNull(formObj.buy_exrate)){
		ComShowCodeMessage("COM0082","Buying Ex.Rate");
		formObj.buy_exrate.focus();
		return;
	}
	if(isNull(formObj.buy_usd_conv_rate)){
		ComShowCodeMessage("COM0082","Buying 1 USD Converted to");
		formObj.buy_usd_conv_rate.focus();
		return;
	}
	var row=sheetObj.DataInsert(-1);
	if( sheetObj.RowCount() - sheetObj.RowCount('D') > 1){
	sheetObj.SetCellValue(row,prefix+"cust_cd",sheetObj.GetCellValue(row-1,prefix+"cust_cd"));
	sheetObj.SetCellValue(row,prefix+"cust_nm",sheetObj.GetCellValue(row-1,prefix+"cust_nm"));
	sheetObj.SetCellValue(row,prefix+"cust_org_yn",sheetObj.GetCellValue(row-1,prefix+"cust_org_yn"));
	}else if(formObj.doc_cls_cd.value == "F" ){ //FCR
		sheetObj.SetCellValue(row,prefix+"cust_cd",formObj.ship_cd.value);
		sheetObj.SetCellValue(row,prefix+"cust_nm",formObj.ship_nm.value);
	}else{
		sheetObj.SetCellValue(row,prefix+"cust_cd",formObj.sprov_cd.value);
		sheetObj.SetCellValue(row,prefix+"cust_nm",formObj.sprov_nm.value);
	}
	if( formObj.buy_vat_def_cd.value != '' ){
		sheetObj.SetCellValue(row,prefix+"val_cls_cd",formObj.buy_vat_def_cd.value);
	}else{
		sheetObj.SetCellValue(row,prefix+"val_cls_cd","NIL");
	}
	sheetObj.SetCellValue(row,prefix+"frt_br_cd",formObj.org_cd.value);
	sheetObj.SetCellValue(row,prefix+"internal_sts_cd","");
	sheetObj.SetCellValue(row,prefix+"curr_cd",formObj.buy_curr_cd.value);
	sheetObj.SetCellValue(row,prefix+"exrate",formObj.buy_exrate.value);
}
function row_buy_del(){
	var sheetObj=docObjects[2];
	if (sheetObj.CheckedRows("Grd05chk") != 0) {
		if(sheetObj.RowCount()> 0){
			ComRowHideDelete(sheetObj,"Grd05chk");
			//form_ctrt_copy();
			//Forwarding_Cbm_Kgs_Sum('A');
		}
    } else {
    	ComShowCodeMessage("COM0170");
    }
}
function btn_show(val){
	var formObj=document.form;
	if(val == "O"){
		if(headLayer.style.display == "" || headLayer.style.display == "none"){
			headLayer.style.display="";
			formObj.show.style.display="none";
			formObj.hide.style.display="";
		}
	}else{
		if(headLayer.style.display == ""){
			headLayer.style.display="none";
			formObj.show.style.display="";
			formObj.hide.style.display="none";
		}
	}
	/*
	if(val == "O"){
		headLayer.style.display="inline";
	}else{
		headLayer.style.display="none";
	}
	*/
}

var sb_cls_cdTest = "";

function getExrateDtInfo(sb_cls_cd){
	var formObj=document.form;
	
	sb_cls_cdTest = sb_cls_cd;
	
	if (sb_cls_cd == "S"){
		if(removeDash(formObj.bf_sell_exrate_dt.value) != removeDash(formObj.sell_exrate_dt.value)){
			formObj.bf_sell_exrate_dt.value=formObj.sell_exrate_dt.value;
			searchDailyExRateInfo("S");
		}
		if(removeDash(formObj.buy_exrate_dt.value)==""){
			formObj.buy_exrate_dt.value=formObj.sell_exrate_dt.value;
			getExrateDtInfo('B');
		}
	}else{
		if(removeDash(formObj.bf_buy_exrate_dt.value) != removeDash(formObj.buy_exrate_dt.value)){
			formObj.bf_buy_exrate_dt.value=formObj.buy_exrate_dt.value;
			searchDailyExRateInfo("B");
		}
		if(removeDash(formObj.sell_exrate_dt.value)==""){
			formObj.sell_exrate_dt.value=formObj.buy_exrate_dt.value;
			getExrateDtInfo('S');
		}
	}
}
function searchDailyExRateInfo(sb_cls_cd){
	var formObj=document.form;
	var exrate_dt="";
	var exrate_cls_cd="";
	var curr_cd="";
	var loc_curr_cd="";
	
	var param = "";
	
	if(sb_cls_cd == "S"){
		exrate_dt=removeDash(formObj.sell_exrate_dt.value);
		exrate_cls_cd = formObj.sell_exrate_cls_cd.value;
		
		curr_cd=formObj.sell_curr_cd.value;
		loc_curr_cd=formObj.sell_loc_curr_cd.value;
	}else{
		exrate_dt=removeDash(formObj.buy_exrate_dt.value);
		exrate_cls_cd=formObj.buy_exrate_cls_cd.value;

		curr_cd=formObj.buy_curr_cd.value;
		loc_curr_cd=formObj.buy_loc_curr_cd.value;
	}
	
	param = '&exrate_dt=' + exrate_dt + "&exrate_cls_cd=" + exrate_cls_cd + "&curr_cd=" + curr_cd + "&loc_curr_cd=" + loc_curr_cd + "&sb_cls_cdTest=" + sb_cls_cdTest; 
	
	ajaxSendPost(searchFreightMgmtDailyExRateInfo, 'reqVal', '&goWhere=aj&bcKey=searchFreightMgmtDailyExRateInfo' + param, './GateServlet.gsl');

}

function searchFreightMgmtDailyExRateInfo(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			if(sb_cls_cdTest == "S"){
				formObj.sell_exrate.value = rtnArr[0];
				formObj.sell_usd_conv_rate.value = rtnArr[1];
			}else{
				formObj.buy_exrate.value = rtnArr[0];
				formObj.buy_usd_conv_rate.value = rtnArr[1];
			}
		}
	}
}

function sheet1_OnDblClick(sheetObj, Row, Col){
	var formObj=document.form;
	var prefix="Grd01";
	var sUrl="";
	var colName=sheetObj.ColSaveName(Col);
	if (colName == prefix+"doc_no") {
		if(sheetObj.GetCellValue(Row, prefix+"doc_type") == "WO"){
		sUrl="/opusfwd/WOMgmt.clt?wo_no="+ sheetObj.GetCellValue(Row, prefix+"doc_no");
			parent.mkNewFrame('Work Order Management', sUrl);
		}else if(sheetObj.GetCellValue(Row, prefix+"doc_type") == "FCR"){
		sUrl="/opusfwd/FCRMgmt.clt?fcr_no="+sheetObj.GetCellValue(Row, prefix+"doc_no");
			parent.mkNewFrame('FCR Management', sUrl);
		}else if(sheetObj.GetCellValue(Row, prefix+"doc_type") == "SVO"){
		sUrl="/opusfwd/ServiceOrderMgmt.clt?so_no="+ sheetObj.GetCellValue(Row, prefix+"doc_no");
			parent.mkNewFrame('Service Order Management', sUrl);
		}else if(sheetObj.GetCellValue(Row, prefix+"doc_type") == "HBL"){
		var sParam="link_nm=HBL_MGMT&link_doc_no="+sheetObj.GetCellValue(Row, prefix+"doc_no");
			sUrl="/opusfwd/ssootherlinkmain.clt?"+sParam;
		    form.action=sUrl; 
			form.target="_blank";
		    form.method="POST";
		    form.submit();
		}else if(sheetObj.GetCellValue(Row, prefix+"doc_type") == "MBL"){
		var sParam="link_nm=MBL_MGMT&link_doc_no="+sheetObj.GetCellValue(Row, prefix+"doc_no");
			sUrl="/opusfwd/ssootherlinkmain.clt?"+sParam;
		    form.action=sUrl; 
			form.target="_blank";
		    form.method="POST";
		    form.submit();
		}else if(sheetObj.GetCellValue(Row, prefix+"doc_type") == "HAWB"){
		var sParam="link_nm=HAWB_MGMT&link_doc_no="+sheetObj.GetCellValue(Row, prefix+"doc_no");
			sUrl="/opusfwd/ssootherlinkmain.clt?"+sParam;
		    form.action=sUrl; 
			form.target="_blank";
		    form.method="POST";
		    form.submit();
		}else if(sheetObj.GetCellValue(Row, prefix+"doc_type") == "MAWB"){
		var sParam="link_nm=MAWB_MGMT&link_doc_no="+sheetObj.GetCellValue(Row, prefix+"doc_no");
			sUrl="/opusfwd/ssootherlinkmain.clt?"+sParam;
		    form.action=sUrl; 
			form.target="_blank";
		    form.method="POST";
		    form.submit();
		}
	}else if(colName == prefix+"freight") { 
		if(sheetObj.GetCellValue(Row, prefix+"doc_type") == "WO"){
			formObj.in_doc_cls_cd[0].checked=true;
			formObj.in_frt_doc_no.value=sheetObj.GetCellValue(Row, prefix+"doc_no");
		}else if(sheetObj.GetCellValue(Row, prefix+"doc_type") == "FCR"){
			formObj.in_doc_cls_cd[1].checked=true;
			formObj.in_frt_doc_no.value=sheetObj.GetCellValue(Row, prefix+"doc_no");
		}else if(sheetObj.GetCellValue(Row, prefix+"doc_type") == "SVO"){
			formObj.in_doc_cls_cd[2].checked=true;
			formObj.in_frt_doc_no.value=sheetObj.GetCellValue(Row, prefix+"doc_no");
		}
		btn_Search();
	}
}
function sheet2_OnDblClick(sheetObj, Row, Col){
	var formObj=document.form;
	var prefix="Grd04";
	var sUrl="";
	var sParam="";
	var colName=sheetObj.ColSaveName(Col);
	if (colName == prefix+"inv_no") {
		if(formObj.doc_cls_cd.value == "W"){
			sParam="link_nm=WO_INVOICE&link_doc_no="+sheetObj.GetCellValue(Row, prefix+"inv_no");
		}else if(formObj.doc_cls_cd.value == "F"){
			sParam="link_nm=FCR_INVOICE&link_doc_no="+sheetObj.GetCellValue(Row, prefix+"inv_no");
		}else if(formObj.doc_cls_cd.value == "S"){
			sParam="link_nm=SVO_INVOICE&link_doc_no="+sheetObj.GetCellValue(Row, prefix+"inv_no");
		}
		sUrl="/opusfwd/ssootherlinkmain.clt?"+sParam;
		form.action=sUrl; 
	    form.target="_blank";
	    form.method="POST";
	    form.submit();
	}
}
function sheet3_OnDblClick(sheetObj, Row, Col){
	var formObj=document.form;
	var prefix="Grd05";
	var sUrl="";
	var sParam="";
	var colName=sheetObj.ColSaveName(Col);
	if (colName == prefix+"inv_no") {
		sParam="link_nm=CSR&link_doc_no="+sheetObj.GetCellValue(Row, prefix+"inv_no");
		sUrl="/opusfwd/ssootherlinkmain.clt?"+sParam;
		form.action=sUrl; 
	    form.target="_blank";
	    form.method="POST";
	    form.submit();
	}
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg){
	var rowcnt=sheetObj.RowCount();
	for ( var i=1; i <= rowcnt + 1 ; i++){
 		sheetObj.SetCellFontColor(i,1,"#0000FF");
 		sheetObj.SetCellFontColor(i,2,"#0000FF");
		//sheetObj.CellFont("FontBold", i, 2) = true;
	}
}
//Order Plan 조회후 Co-Sales 콤보셋팅을 한다.
function sheet2_OnSearchEnd(sheetObj, ErrMsg){
	var formObj=document.form;
	var rowcnt=sheetObj.RowCount();
    sheetObj.SetSumText(0, 0, "TOTAL");
	var prefix="Grd04";
	var vVAT_EDIT_BR=null;
	var vVAT_EDIT_SB_CLS_CD=null;
	var vLOC_AMT_EDIT_BR=null;
	var vLOC_AMT_EDIT_SB_CLS_CD=null;
	var vVAT_LOC_EDIT_BR=null;
	var vVAT_LOC_EDIT_SB_CLS_CD=null;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
		if(formObj.ctry_cd.value == 'IN'){
			sheetObj.SetCellEditable(i, prefix+"val_cls_cd",0);
		}
		if(formObj.ctry_cd.value == 'IN' && !(sheetObj.GetCellValue(i, prefix+"frt_cd").substring(1) == 'OTH' || sheetObj.GetCellValue(i, prefix+"frt_cd") == 'PRMT')){
			sheetObj.SetCellEditable(i, prefix+"frt_nm",0);
		}
		vLOC_AMT_EDIT_BR=LOC_AMT_EDIT_BR.split("|");
		vLOC_AMT_EDIT_SB_CLS_CD=LOC_AMT_EDIT_SB_CLS_CD.split("|");	
		for(var j=0;j<vLOC_AMT_EDIT_BR.length; j++){
			//alert(j+"      "+vVAT_LOC_EDIT_BR[j]+"            "+vVAT_LOC_EDIT_SB_CLS_CD[j]);
			if(sheetObj.GetCellValue(i, prefix+"frt_br_cd") == vLOC_AMT_EDIT_BR[j] && vLOC_AMT_EDIT_SB_CLS_CD[j] == 'S'){
				sheetObj.SetCellEditable(i, prefix+"loc_amt",1);
			}
		}
		vVAT_LOC_EDIT_BR=VAT_LOC_EDIT_BR.split("|");
		vVAT_LOC_EDIT_SB_CLS_CD=VAT_LOC_EDIT_SB_CLS_CD.split("|");		
		for(var j=0;j<vVAT_LOC_EDIT_BR.length; j++){
			//alert(j+"      "+vVAT_LOC_EDIT_BR[j]+"            "+vVAT_LOC_EDIT_SB_CLS_CD[j]);
			if(sheetObj.GetCellText(i, prefix+"val_cls_cd") != 0 && sheetObj.GetCellText(i, prefix+"val_cls_cd") != 'NIL' && sheetObj.GetCellValue(i, prefix+"frt_br_cd") == vVAT_LOC_EDIT_BR[j] && vVAT_LOC_EDIT_SB_CLS_CD[j] == 'S'){
				sheetObj.SetCellEditable(i, prefix+"vat_amt",1);
			}
		}
		if(sheetObj.GetCellValue(i, prefix+"relay_cd") != ""){
			sheetObj.SetRowBackColor(i,"#CFFBCF");
			for(var j=0; j<=grd04cnt; j++){
				sheetObj.SetCellEditable(i, j,0);
			}
			sheetObj.SetCellEditable(i, prefix+"pass_cd",1);
			sheetObj.SetCellEditable(i, prefix+"internal_sts_cd",1);
			vVAT_EDIT_BR=VAT_EDIT_BR.split("|");
			vVAT_EDIT_SB_CLS_CD=VAT_EDIT_SB_CLS_CD.split("|");			
			for(var j=0;j<vVAT_EDIT_BR.length; j++){
				//alert(j+"      "+vVAT_LOC_EDIT_BR[j]+"            "+vVAT_LOC_EDIT_SB_CLS_CD[j]);
				if(sheetObj.GetCellValue(i, prefix+"frt_br_cd") == vVAT_EDIT_BR[j] && vVAT_EDIT_SB_CLS_CD[j] == 'S'){
					sheetObj.SetCellEditable(i, prefix+"val_cls_cd",1);
				}
			}
		}
		if(sheetObj.GetCellValue(i, prefix+"inv_no") != "" || sheetObj.GetCellValue(i, prefix+"relay_inv_flag") == "Y"){
			//sheetObj.RowBackColor(i) = "#FFFFFF";
			for(var j=0; j<=grd05cnt; j++){
				sheetObj.SetCellEditable(i, j,0);
			}
		}
	}
	var rowcnt=sheetObj.RowCount();
	for ( var i=1; i <= rowcnt + 1 ; i++){
 		sheetObj.SetCellFontColor(i,21,"#0000FF");
		//sheetObj.CellFont("FontBold", i, 2) = true;
	}
}
function sheet3_OnSearchEnd(sheetObj, ErrMsg){
	var formObj=document.form;
	var rowcnt=sheetObj.RowCount();
    sheetObj.SetSumText(0, 0, "TOTAL");
	var prefix="Grd05";
	var vVAT_EDIT_BR=null;
	var vVAT_EDIT_SB_CLS_CD=null;
	var vLOC_AMT_EDIT_BR=null;
	var vLOC_AMT_EDIT_SB_CLS_CD=null;
	var vVAT_LOC_EDIT_BR=null;
	var vVAT_LOC_EDIT_SB_CLS_CD=null;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
		if(formObj.ctry_cd.value == 'IN' && !(sheetObj.GetCellValue(i, prefix+"frt_cd").substring(1) == 'OTH' || sheetObj.GetCellValue(i, prefix+"frt_cd") == 'PRMT')){
			sheetObj.SetCellEditable(i, prefix+"frt_nm",0);
		}
		vLOC_AMT_EDIT_BR=LOC_AMT_EDIT_BR.split("|");
		vLOC_AMT_EDIT_SB_CLS_CD=LOC_AMT_EDIT_SB_CLS_CD.split("|");	
		for(var j=0;j<vLOC_AMT_EDIT_BR.length; j++){
			//alert(j+"      "+vLOC_AMT_EDIT_BR[j]+"            "+vLOC_AMT_EDIT_SB_CLS_CD[j]);
			if(sheetObj.GetCellValue(i, prefix+"frt_br_cd") == vLOC_AMT_EDIT_BR[j] && vLOC_AMT_EDIT_SB_CLS_CD[j] == 'B'){
				sheetObj.SetCellEditable(i, prefix+"loc_amt",1);
			}
		}
		vVAT_LOC_EDIT_BR=VAT_LOC_EDIT_BR.split("|");
		vVAT_LOC_EDIT_SB_CLS_CD=VAT_LOC_EDIT_SB_CLS_CD.split("|");		
		for(var j=0;j<vVAT_LOC_EDIT_BR.length; j++){
			//alert(j+"      "+vVAT_LOC_EDIT_BR[j]+"            "+vVAT_LOC_EDIT_SB_CLS_CD[j]);
			if(sheetObj.GetCellText(i, prefix+"val_cls_cd") != 0 && sheetObj.GetCellText(i, prefix+"val_cls_cd") != 'NIL' && sheetObj.GetCellValue(i, prefix+"frt_br_cd") == vVAT_LOC_EDIT_BR[j] && vVAT_LOC_EDIT_SB_CLS_CD[j] == 'B'){
				sheetObj.SetCellEditable(i, prefix+"vat_amt",1);
			}
		}
		if(sheetObj.GetCellValue(i, prefix+"relay_cd") != ""){
			sheetObj.SetRowBackColor(i,"#FCD2C5");
			for(var j=0; j<=grd05cnt; j++){
				sheetObj.SetCellEditable(i, j,0);
			}
			sheetObj.SetCellEditable(i, prefix+"pass_cd",1);
			sheetObj.SetCellEditable(i, prefix+"internal_sts_cd",1);
			vVAT_EDIT_BR=VAT_EDIT_BR.split("|");
			vVAT_EDIT_SB_CLS_CD=VAT_EDIT_SB_CLS_CD.split("|");		
			for(var j=0;j<vVAT_EDIT_BR.length; j++){
				//alert(j+"      "+vVAT_EDIT_BR[j]+"            "+vVAT_EDIT_SB_CLS_CD[j]);
				if(sheetObj.GetCellValue(i, prefix+"frt_br_cd") == vVAT_EDIT_BR[j] && vVAT_EDIT_SB_CLS_CD[j] == 'B'){
					sheetObj.SetCellEditable(i, prefix+"val_cls_cd",1);
				}
			}
		}
		if(sheetObj.GetCellValue(i, prefix+"inv_no") != "" || sheetObj.GetCellValue(i, prefix+"relay_inv_flag") == "Y"){
			//sheetObj.RowBackColor(i) = "#FFFFFF";
			for(var j=0; j<=grd05cnt; j++){
				sheetObj.SetCellEditable(i, j,0);
			}
		}
	}
	var rowcnt=sheetObj.RowCount();
	for ( var i=1; i <= rowcnt + 1 ; i++){
 		sheetObj.SetCellFontColor(i,21,"#0000FF");
		//sheetObj.CellFont("FontBold", i, 2) = true;
	}
}
function btn_link_ctrt(){
	var formObj=document.form;
	if(!ComIsEmpty(formObj.ctrt_no)){
		var sUrl="/opusfwd/CtrtMgmt.clt?ctrt_no="+formObj.ctrt_no.value;
		parent.mkNewFrame('Contract Management', sUrl);
	}
}
function sell_cust_OnChange(){
	var formObj=document.form;
	
	formObj.f_cmd.value = SEARCH03;
	
	var Xml = docObjects[0].GetSearchData("./FreightInfo_003GS.clt", FormQueryString(formObj,""));
	var xmlDoc = $.parseXML(sXml);
	var $xml = $(xmlDoc);
	displayDataSum($xml);
	
	formObj.f_cmd.value = SEARCH04;
	
	docObjects[1].DoSearch("./FreightMgmt_002GS.clt?sellorbuy=Sell", FormQueryString(formObj,""));	
}
function buy_cust_OnChange(){
	var formObj=document.form;
	
	formObj.f_cmd.value = SEARCH03;
	
	var Xml = docObjects[0].GetSearchData("./FreightInfo_003GS.clt", FormQueryString(formObj,""));
	var xmlDoc = $.parseXML(sXml);
	var $xml = $(xmlDoc);
	displayDataSum($xml);
	
	formObj.f_cmd.value = SEARCH04;
	
	docObjects[2].DoSearch("./FreightMgmt_002GS.clt?sellorbuy=Buy", FormQueryString(formObj,""));
}
function btn_CAIssuePopup(){
	var formObj=document.form;
	
	callBackFunc = "setCAIssuePopup";
    modal_center_open('./FreightCAIssuePopup.clt?frt_doc_no='+formObj.doc_no.value+"&doc_cls_cd="+formObj.doc_cls_cd.value+"&ca_no="+formObj.ca_no.value+"&auto_ca_use="+formObj.auto_ca_use.value+"&ca_status_nm="+formObj.ca_status_nm.value, rtnary, 800,650,"yes");
	
}
function btn_ca_history(){
	var formObj=document.form;
	
	callBackFunc = "setCAIssuePopup";
    modal_center_open('./FreightCAIssuePopup.clt?frt_doc_no='+formObj.doc_no.value+"&doc_cls_cd="+formObj.doc_cls_cd.value+"&ca_no="+formObj.ca_no.value+"&auto_ca_use="+formObj.auto_ca_use.value+"&ca_status_nm="+formObj.ca_status_nm.value+"&readonly_flg=Y", rtnary, 800,650,"yes");
	
}
function setInternalChangeCal(row, sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	var frt_curr_cd="";
	if(sb_cls_cd == 'S'){
		sheetObj=docObjects[1];
		prefix="Grd04";
		frt_curr_cd=formObj.sell_loc_curr_cd.value;
	}else{
	    sheetObj=docObjects[2];
		prefix="Grd05";
		frt_curr_cd=formObj.buy_loc_curr_cd.value;
	}
	if(sheetObj.CellSearchValue(row, prefix+"internal_sts_cd") != "I"){
		if(sheetObj.GetCellValue(row, prefix+"internal_sts_cd") == "I"){
			sheetObj.SetCellValue(row, prefix+"internal_sts_cd",sheetObj.CellSearchValue(row, prefix+"internal_sts_cd"),0);
		}
	} 
	if(sheetObj.GetCellValue(row, prefix+"internal_sts_cd") == "C" || sheetObj.GetCellValue(row, prefix+"internal_sts_cd") == "H"){
		setInternalAutoCal(row, sb_cls_cd);
		if(sheetObj.CellSearchValue(row, prefix+"internal_sts_cd") == "I"){
			if(parseFloat(sheetObj.GetCellValue(row, prefix+"internal_exrate")) == 0 && sheetObj.GetCellValue(row, prefix+"curr_cd") != frt_curr_cd){
				ComShowCodeMessage("COM0381", sheetObj.GetCellValue(row, prefix+"curr_cd"));
				sheetObj.SetCellValue(row, prefix+"internal_sts_cd",sheetObj.CellSearchValue(row, prefix+"internal_sts_cd"),0);
			}
		}
	}
	/*var branch=formObj.org_cd.value;
var curr_cd=sheetObj.GetCellValue(row, prefix+"curr_cd");
	if(branch == "KRSELLB" || branch == "JPTYOLB" || branch == "VNHANLB" || branch == "VNSGNLB"){
sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"vat_amt"),0),0);
	}else{
sheetObj.SetCellValue(row, prefix+"vat_amt",ComAbsRound(sheetObj.GetCellValue(row, prefix+"vat_amt"),2),0);
	}		
	if(curr_cd == loc_curr_cd){
sheetObj.SetCellValue(row, prefix+"curr_vat_amt",sheetObj.GetCellValue(row, prefix+"vat_amt"),0);
sheetObj.SetCellValue(row, prefix+"ttl_amt",parseFloat(sheetObj.GetCellValue(row, prefix+"amt")) + parseFloat(sheetObj.GetCellValue(row, prefix+"curr_vat_amt")),0);
	}*/
}
function btn_Excel_sell() {
 	if(docObjects[1].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	docObjects[1].Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1, ExtendParam: "Total: 1"});
    }
	//두번째 그리드 두번째 Sheet에 담기 
	//docObjects[1].Down2Excel(1,true,true);
}
function btn_Excel_buy() {
 	if(docObjects[2].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	docObjects[2].Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1, ExtendParam: "Total: 1"});
    }
	//두번째 그리드 두번째 Sheet에 담기 
	//docObjects[1].Down2Excel(1,true,true);
}
function indirect_buying(){
	var formObj = document.form;
	var frt_doc_no = formObj.doc_no.value;
	var doc_cls_cd = formObj.doc_cls_cd.value;
	var ctry_cd = formObj.ctry_cd.value;
	var buy_exrate_dt = formObj.buy_exrate_dt.value;
	
	var buy_exrate_cls_cd = formObj.buy_exrate_cls_cd.value;
	
	var buy_curr_cd = formObj.buy_curr_cd.value;
	var buy_exrate = formObj.buy_exrate.value;
	var buy_usd_conv_rate = formObj.buy_usd_conv_rate.value;
	var ex_in_cd = formObj.ex_in_cd.value; 
	
    /*if(isNull(formObj.buy_exrate) || formObj.buy_exrate.value == 0){
		ComShowCodeMessage("COM0082","Buying Ex.Rate");
		formObj.buy_exrate.focus();
		return;
	}
	if(isNull(formObj.buy_usd_conv_rate) || formObj.buy_usd_conv_rate.value == 0){
		ComShowCodeMessage("COM0082","Buying 1 USD Converted to");
		formObj.buy_usd_conv_rate.focus();
		return;
	}*/
	
	callBackFunc = "setHstInfo";
    modal_center_open('./FreightIndirectCostPopup.clt?frt_doc_no='+frt_doc_no+"&doc_cls_cd="+doc_cls_cd+"&ctry_cd="+ctry_cd+"&buy_exrate_dt="+buy_exrate_dt+"&buy_exrate_cls_cd="+buy_exrate_cls_cd+"&buy_curr_cd="+buy_curr_cd+"&buy_exrate="+buy_exrate+"&buy_usd_conv_rate="+buy_usd_conv_rate+"&ex_in_cd="+ex_in_cd, rtnary, 1100,750,"yes");
	
}