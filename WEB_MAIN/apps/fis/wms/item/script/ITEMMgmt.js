/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ITEMMgmt.js
*@FileTitle  :  Item Management  
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/03/05
=========================================================*/
var SEARCHFLG="N";
var searchCnt=0;

var ItemAttrCngYn = "N";
//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var tabObjects=new Array();
var tabCnt=0 ;
var beforetab=1; 
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var uploadObjects=new Array();
var uploadCnt=0;
var loading_flag = "N";
var rtnary=new Array(2);
var callBackFunc = "";
var ut_std_chg =  1;
var wgt_std_chg =  1;

//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
var gJsWmsRuPoint = "N";
var vPointCount = 3;
var vEditLen = 14;

//Data가 있을시 Handing Unit, Package Utit, Palletization lock
var listCnt = 0;
/*
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여
 * cache옵션 false셋팅
 */
$(document).ready(function () {
	$.ajaxSetup({ cache: false });

	//#2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (S)
	if($('#chk_use_serial_flag').attr("checked") == false) {
		$('#chk_serial_req_flag').attr('disabled', true);
		$('#chk_serial_uniq_flag').attr('disabled', true);
		$('#chk_picking_serial_scan_req_flag').attr('disabled', true);  //#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
	}

	$('#chk_use_serial_flag').change(function() {
		if($(this).is(":checked") == false) {
			$('#chk_serial_req_flag').prop('checked', false);
			$('#chk_serial_uniq_flag').prop('checked', false);
			$('#chk_picking_serial_scan_req_flag').prop('checked', false);  //#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
			$('#chk_serial_req_flag').attr('disabled', true);
			$('#chk_serial_uniq_flag').attr('disabled', true);
			$('#chk_picking_serial_scan_req_flag').attr('disabled', true);  //#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
			$('[name=use_serial_flag]').val("N");
			$('[name=serial_req_flag]').val("N");
			$('[name=serial_uniq_flag]').val("N");
			$('[name=picking_serial_scan_req_flag]').val("N");  //#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
		} else {
			$('#chk_serial_req_flag').removeAttr('disabled');
			$('#chk_serial_uniq_flag').removeAttr('disabled');
			$('[name=use_serial_flag]').val("Y");
		}
	});

	$('#chk_serial_req_flag, #chk_serial_uniq_flag, #chk_picking_sku_req_flag, #chk_picking_loc_req_flag, #chk_picking_serial_scan_req_flag').change(function(){
		var flag = "";
		if(this.checked == false){
			flag = "N";
		} else {
			flag = "Y";
		}

		switch($(this).attr("id")) {
			case "chk_serial_req_flag":
				$('[name=serial_req_flag]').val(flag);
				if(flag == "Y") {
					$('#chk_picking_serial_scan_req_flag').removeAttr('disabled');  //#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
				} else {
					$('#chk_picking_serial_scan_req_flag').prop('disabled', true);  //#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
					$('#chk_picking_serial_scan_req_flag').prop('checked', false);  //#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
					$('[name=picking_serial_scan_req_flag]').val("N");              //#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
				}
				break;

			case "chk_serial_uniq_flag":
				$('[name=serial_uniq_flag]').val(flag);
				break;

			case "chk_picking_sku_req_flag":
				$('[name=picking_sku_req_flag]').val(flag);
				break;

			case "chk_picking_loc_req_flag":
				$('[name=picking_loc_req_flag]').val(flag);
				break;

			case "chk_picking_serial_scan_req_flag":
				$('[name=picking_serial_scan_req_flag]').val(flag);
				break;
		}
	});

	//#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가 (S)
	$('#lbl_use_serial_flag, #lbl_serial_req_flag, #lbl_serial_uniq_flag, #lbl_picking_sku_req_flag, #lbl_picking_loc_req_flag, #lbl_picking_serial_scan_req_flag').click(function(){
		var id = $(this).attr("id");
		id = id.substr(id.indexOf("_")+1);
		if($('#chk_'+id).is(":disabled") == false) {
			if($('#chk_'+id).is(":checked")) {
				$('#chk_'+id).prop("checked", false);
				$('[name='+id+']').val("N");
			} else {
				$('#chk_'+id).prop("checked", true);
				$('[name='+id+']').val("Y");
			}
			$('#chk_'+id).change();
		}
	});
	//#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가 (E)

	$('#chk_use_serial_flag').attr('checked', true);
	$('[name=use_serial_flag]').val("Y");
	//#2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (E)


	//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (S)
	var valFormat = "0.";
	var numFormat = "9999999999.";
	
	for(var i=0; i<WMS_CBM_POINT_COUNT; i++) {
		valFormat += "0";
		numFormat += "0";
	}

	$('[name=lv1_cbm], [name=lv1_cbf], [name=item_cbm], [name=item_cbf], [name=lv3_cbm], [name=lv3_cbf]').attr("value", valFormat);

	$('[name=lv1_cbm], [name=lv1_cbf], [name=item_cbm], [name=item_cbf], [name=lv3_cbm], [name=lv3_cbf], [name=hunit_for_uom]').change(function() {
		checkNumFormat($(this).get(0), numFormat);
		$(this).attr("value", valFormat);

		chkComma($(this).get(0), 10, WMS_CBM_POINT_COUNT);
		autoCalculator($(this).get(0));
	});

	$('[name*=length], [name*=height], [name*=width], [name*=cbm], [name*=cbf], [name*=kgs], [name*=lbs], [name*=wgt], [name=hunit_for_uom]').focus(function(){
		$(this).select();
	});

	//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (E)
});

/**
* Sheet  onLoad
*/
function loadPage() {
	//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
	if(gJsWmsRuPoint == 'Y'){
		vPointCount = 8;
		vEditLen = 19;
	}
	doShowProcess(true);
	for(var k=0;k<tabObjects.length;k++){
        initTab(tabObjects[k],k+1);
    }
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	loadDataCombo();
    doHideProcess(false);
    loading_flag = "Y";
	var formObject=document.form;
	if (formObject.in_item_cd.value != "" && formObject.in_ctrt_no.value != ""){
		imSearch();
	}else{
		//ComBtnDisable("btn_cancel");
	}	
	resizeSheet();
	if(formObject.uploadfile.value!="")
	{
		btn_Search();
	}
	if(h_ut_tp_cd =="CM"){
		// 센치
		ut_std_chg = 0.01;
		document.getElementById("s_sh_ut_tp_cd1").checked=true;
		h_ut_tp_cd = "CM";
	}else if(h_ut_tp_cd=="INCH"){
		//Inch
		ut_std_chg  = 0.0254;
		wgt_std_chg = 2.54;
		document.getElementById("s_sh_ut_tp_cd2").checked=true;
		h_ut_tp_cd = "INCH";
	}
	document.getElementById("sh_ut_tp_cd").innerHTML = h_ut_tp_cd;
		
	var opt_key = "USE_EA_INR_QTY";
	//ajaxSendPost(setUseEaInrQty, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	//#1724 [WMS4.0] Item Code and Name Update (History)
	var opt_key = "ITEM_ATTR_CNG_YN";
	ajaxSendPost(setItemAttrCngYn, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#3255 [BINEX] [WMS4.0] ITEM LIST TO ENTRY
    if (!ComIsNull(document.getElementById("sCtrt_no").value)){
    	formObject.ctrt_no.value = document.getElementById("sCtrt_no").value;
    	getCtrtInfo2(formObject.ctrt_no);
    }
    
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObject=document.form;
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    // OnChange 이벤트
    axon_event.addListenerForm("blur", "form_onChange", formObject);
    // OnKeyUp 이벤트
    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
    //- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	var parm="";
	switch (srcName) {
		case "item_pkgbaseqty":
			formObj.item_pkgbaseqty.value=ComAddComma(formObj.item_pkgbaseqty.value);
		case "item_kgs":
			formObj.item_kgs.value=ComAddComma(formObj.item_kgs.value);	
		case "item_cbm":
			formObj.item_cbm.value=ComAddComma(formObj.item_cbm.value);	
		case "item_net_wgt":
			formObj.item_net_wgt.value=ComAddComma(formObj.item_net_wgt.value);
		case "item_width":
			formObj.item_width.value=ComAddComma(formObj.item_width.value);
		case "item_length":
			formObj.item_length.value=ComAddComma(formObj.item_length.value);
		case "item_height":
			formObj.item_height.value=ComAddComma(formObj.item_height.value);
	}
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Tab 기본 설정
 * 탭의 항목을 설정한다.
 */
function initTab(tabObj , tabNo) {
     switch(tabNo) {
         case 1:
            with (tabObj) {
                var cnt=0 ;
                InsertItem( "Item" , "");
                InsertItem( "Optional Field" , "");
            }
       		break;
     }
}
/**
 * Upload Object
 */
function setUploadObject(uploadObj){
	uploadObjects[uploadCnt++]=uploadObj;
}
function doWork(srcName){
//	function doWork(srcName, valObj){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	var sheetObject1=docObjects[0];   //t1sheet1
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
			case "SEARCHLIST":
				sheet1.RemoveAll();
				sheet2.RemoveAll();
				sheet3.RemoveAll();
				sheet4.RemoveAll();
				sheet5.RemoveAll();
				sheet6.RemoveAll();
				sheet7.RemoveAll();
				sheet8.RemoveAll();
				sheet9.RemoveAll();
				sheet10.RemoveAll();
				btn_Search();
				break;
			case "SAVE":
				btn_Save();
				break;
			case "NEW":
				btn_New();
				break;
			case "INACTIVE":
				btn_Cancel();
				break;
			case "row_add":	
				row_add();
				break;
			case "row_del":	
				row_del();
				break;
			case "row_add2":	
				row_add2();
				break;
			case "row_del2":	
				row_del2();
				break;
			case "row_add3":	
				row_add3();
				break;
			case "row_del3":	
				row_del3();
				break;
			case "row_add4":	
				row_add4();
				break;
			case "row_del4":	
				row_del4();
				break;
			case "btn_file_upload":	
				btn_File_Upload();
				break;
			case "btn_file_delete":	
				btn_File_Delete();
				break;
			case "TEMPATE_DOWNLOAD":
				excel_Download();
				break;
			case "UPLOAD_EXEL":
				excel_Upload();
				break;
			// #1724 [WMS4.0] Item Code and Name Update (History)	
			case "ITEM_EDIT":
				var formObj=document.form;

				var params = "";
				params = params + "in_ctrt_no=" + formObj.ctrt_no.value ;
				params = params + "&in_ctrt_nm=" + formObj.ctrt_nm.value ;
				
				params = params + "&in_item_sys_no=" + formObj.item_sys_no.value ;
				params = params + "&in_item_cd=" + formObj.item_cd.value ;
				params = params + "&in_item_nm=" + formObj.item_nm.value ;
				
				if(formObj.ctrt_no.value=="" || formObj.ctrt_nm.value=="" ||
						formObj.item_sys_no.value=="" || formObj.item_cd.value=="" || formObj.item_nm.value=="" ){
					alert("Please retrieve data first.");
				}else{
					modal_center_open('./ITEMUpdatePOP.clt?' + params, rtnary, 800,450,"yes");	
				}
				
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
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
*/
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
			with(sheetObj){
				var prefix="Grd00";
	
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('ITMgmt_Sheet1_HDR1'), Align:"Center"} ];		   
				InitHeaders(headers, info);
	
				var cols = [
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",         KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",         KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",         KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"hts_no",          KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"hts_nm",          KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_pkgbaseqty", KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_pkgunit",    KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_pkgunit_nm", KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cbm",        KeyField:0,   CalcLogic:"",   Format:"",   PointCount:WMS_CBM_POINT_COUNT, UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_kgs",        KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_width",      KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_length",     KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_height",     KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_remark",     KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_use_flg",    KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_net_wgt",    KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_sys_no",     KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" }
				];
	
				InitColumns(cols);
				SetEditable(1);
				SetSheetHeight(250);
				resizeSheet();
			}
			break;

		case 2:      //Lot4
			with(sheetObj){
				var prefix="Grd05";
	
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('ITMgmt_Sheet5_HDR1'), Align:"Center"}];
				InitHeaders(headers, info);
	
				var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_desc", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_tp", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
		             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
		       
				InitColumns(cols);
				SetEditable(1);
	
				SetColProperty(0 ,prefix+"lot_cd" , {AcceptKeys:"E|[0123456789]" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
	
				SetSheetHeight(187);
				resizeSheet();
			}
			break;

		case 3:      //Lot5
			with(sheetObj){
				var prefix="Grd06";
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('ITMgmt_Sheet6_HDR1'), Align:"Center"} ];
				InitHeaders(headers, info);

				var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  	             {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
	  	             {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_desc", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	  	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_tp", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
	  	             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];

				InitColumns(cols);
				SetEditable(1);

				SetColProperty(0 ,prefix+"lot_cd" , {AcceptKeys:"E|[0123456789]" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});

				SetSheetHeight(187);
				resizeSheet();
			}
			break;

		case 4:      //IBSheet1 init
		    with(sheetObj){
	      var prefix="Grd01";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		  var headers = [ { Text:getLabel('ITMgmt_Sheet2_HDR1'), Align:"Center"},
	                      { Text:getLabel('ITMgmt_Sheet2_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Combo", Hidden:0, Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"wh_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Combo",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"wh_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:prefix+"fix_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"fix_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:prefix+"def_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"def_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_sys_no", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
	             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
	       
	      InitColumns(cols);
	      SetEditable(1);
	      SetSheetHeight(161);
	    //set warehouse
		  SetColProperty(prefix+"wh_cd", {ComboText:whCd_Nm, ComboCode:whCd} );
		  SetColProperty(prefix+"wh_nm", {ComboText:whNm, ComboCode:whCd} );
		  SetColProperty(0 , prefix + "fix_loc_cd" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
		  SetColProperty(0 , prefix + "def_loc_cd" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
	      resizeSheet();
	      }
	      break;


		case 5:      //IBSheet1 init
		    with(sheetObj){
	      var prefix="Grd02";
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		  var headers = [ { Text:getLabel('ITMgmt_Sheet3_HDR1'), Align:"Center"},
	                      { Text:getLabel('ITMgmt_Sheet3_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"supp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:prefix+"supp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0/*,   EditLen:20*/ },
	             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:prefix+"supp_item_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_sys_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
	             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
	       
	      InitColumns(cols);
	      SetEditable(1);
	      SetColProperty(0 ,prefix+"supp_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
//	      SetColProperty(0 ,prefix+"supp_item_cd" , {AcceptKeys:"E|[0123456789][()_-+.&/@#!%^*$~` ]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"supp_item_cd" , {AcceptKeys:"E|[0123456789]" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
	      SetSheetHeight(161);
	      resizeSheet();
	      }
	      break;

		case 6:      //IBSheet1 init
		    with(sheetObj){
	       
	      //var hdr1='|Seq|File Name|file_size|file_seq|file_path|file_sys_nm|ctrt_no|item_sys_no|ibflag';
	      //var headCount=ComCountHeadTitle(hdr1);
	      var prefix="Grd03";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		  var headers = [ { Text:getLabel('ITMgmt_Sheet4_HDR1'), Align:"Center"} ];		   
	      InitHeaders(headers, info);

	      var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_org_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"file_size",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_path",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_sys_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_sys_no", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
	       
	      InitColumns(cols);
	      SetEditable(1);
	      SetSheetHeight(140);
	      resizeSheet();
	      
	      }
	      break;


		case 7:      //IBSheet1 init
		    with(sheetObj){
	  
	      var hdr1='||||';
	      //var headCount=ComCountHeadTitle(hdr1);
	      var prefix="Grd04";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"opt_fld_clss_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"opt_fld_id",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:230,  Align:"Left",    ColMerge:1,   SaveName:prefix+"opt_fld_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"opt_fld_val",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(160);
	      SetEditable(1);
	      SetRowHidden(0, 1);
	      SetColProperty(0 ,prefix+"opt_fld_val" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
	      resizeSheet();
	      }
	      break;

		case 8:      //IBSheet1 init
		    with(sheetObj){
	  
			      var hdr1='|UOM|Curr|Rate';
			      //var headCount=ComCountHeadTitle(hdr1);
			      var prefix="Grd08";
		
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );
		
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:hdr1, Align:"Center"} ];
			      InitHeaders(headers, info);
		
			      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
			             {Type:"Combo",      Hidden:0, Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"sto_tp", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Combo",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Float",     Hidden:0,  Width:150,    Align:"Right",     ColMerge:1,   SaveName:prefix+"unit_price",  				KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:vPointCount, EditLen:12  },
				         {Type:"Float",     Hidden:1,  Width:150,    Align:"Right",     ColMerge:1,   SaveName:prefix+"hunit_for_uom",  				KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:vPointCount, EditLen:vEditLen  } ];
                  
			      InitColumns(cols);
			      SetSheetHeight(150);
			      SetEditable(1);
			      SetColProperty(prefix+"sto_tp", {ComboText:storage_uomhNm, ComboCode:storage_uomCd} );
			      SetColProperty(prefix+"curr_cd", {ComboText:currCdText, ComboCode:currCdCode} );
		      }
	      break;
	      
		case 9:      //IBSheet1 init
		    with(sheetObj){
	  
			      var hdr1='|LP Type|Curr|Rate';
			      //var headCount=ComCountHeadTitle(hdr1);
			      var prefix="Grd09";
			
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );
			
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:hdr1, Align:"Center"} ];
			      InitHeaders(headers, info);
			
			      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
			                   {Type:"Combo",      Hidden:0, Width:300,  Align:"Left",    ColMerge:1,   SaveName:prefix+"sto_tp", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Combo",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
					           {Type:"Float",     Hidden:0,  Width:150,    Align:"Right",     ColMerge:1,   SaveName:prefix+"unit_price",  				KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:vPointCount, EditLen:vEditLen  } ];
			      
			      InitColumns(cols);
			      SetSheetHeight(320);
			      SetEditable(1);
			      SetColProperty(prefix+"curr_cd", {ComboText:currCdText, ComboCode:currCdCode} );
			      SetColProperty(prefix+"sto_tp", {ComboText:lic_plat_ut_listNm, ComboCode:lic_plat_ut_listCd} );
		      }
	      break;
	      
		case 10:      //IBSheet1 init
		    with(sheetObj){
	  
			      var hdr1='||Location Property|Curr|Rate';
			      //var headCount=ComCountHeadTitle(hdr1);
			      var prefix="Grd10";
		
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );
		
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:hdr1, Align:"Center"} ];
			      InitHeaders(headers, info);
		
			      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
			                   {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"sto_tp", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                   {Type:"Text",      Hidden:0, Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"sto_tp_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Combo",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
					           {Type:"Float",     Hidden:0,  Width:150,    Align:"Right",     ColMerge:1,   SaveName:prefix+"unit_price",  				KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:vPointCount, EditLen:vEditLen  } ];
			      
			      InitColumns(cols);
			      SetSheetHeight(550);
			      SetEditable(1);
			      SetColProperty(prefix+"curr_cd", {ComboText:currCdText, ComboCode:currCdCode} );
		      }
	      break;
	}
}
function resizeSheet(){
	ComResizeSheet(sheet1);
	ComResizeSheet(sheet2);
	ComResizeSheet(sheet3);
	ComResizeSheet(sheet4);
	ComResizeSheet(sheet5);
	ComResizeSheet(sheet6);
	ComResizeSheet(sheet7);
}
//WAREHOUSE 팝업
function sheet2_OnPopupClick(sheetObj, row, col){
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "Grd01fix_loc_nm"){     
		if(sheetObj.GetCellValue(row, "Grd01wh_cd") == ""){
			ComShowCodeMessage("COM0082", "Warehouse Code");
			sheetObj.SelectCell(row, "Grd01wh_cd");
			return;
		}else{
			var params = "WarehouseLocPopup.clt?f_loc_cd="+sheetObj.GetCellValue(row, "Grd01wh_cd");
			callBackFunc = "setGrd01FixLoc";
		    modal_center_open(params, callBackFunc, 700, 500,"yes");
		}
	}else if(colStr == "Grd01def_loc_nm"){    
		if(sheetObj.GetCellValue(row, "Grd01wh_cd") == ""){
			ComShowCodeMessage("COM0082", "Warehouse Code");
			sheetObj.SelectCell(row, "Grd01wh_cd");
			return;
		}else{
			var params = "WarehouseLocPopup.clt?f_loc_cd="+sheetObj.GetCellValue(row, "Grd01wh_cd");
			callBackFunc = "setGrd01DefLoc";
		    modal_center_open(params, callBackFunc, 700, 500,"yes");
		}
	}
}

function setGrd01FixLoc(rtnVal){
	var formObj=document.form;
	var sheetObj1=docObjects[3];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "Grd01fix_loc_cd",rtnValAry[0],0);
		sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "Grd01fix_loc_nm",rtnValAry[1],0);
	}
}
function setGrd01DefLoc(rtnVal){
	var formObj=document.form;
	var sheetObj1=docObjects[3];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "Grd01def_loc_cd",rtnValAry[0],0);
		sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "Grd01def_loc_nm",rtnValAry[1],0);
	}
}
function sheet2_OnChange(sheetObj, row, col) {
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "Grd01wh_cd"){
		var whCd_Change = sheetObj.GetCellText(row, "Grd01wh_cd",1);
		sheetObj.SetCellValue(row, "Grd01wh_nm",whCd_Change,0);
	}
	/*if(colStr == "Grd01wh_cd"){
		ajaxSendPost(resultGrd01WhLocInfo, sheetObj, '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+sheetObj.GetCellValue(row, "Grd01wh_cd"), './GateServlet.gsl');
		try{
			var dup_flg="Y";
			for(var i=2; i<=sheetObj.LastRow();i++){
				for(var j=2; j<=sheetObj.LastRow();j++){
					if(i != j){
						if(sheetObj.GetCellValue(i, "Grd01wh_cd") == sheetObj.GetCellValue(j, "Grd01wh_cd")){
							ComShowCodeMessage("COM0225", "Row No : "+(j-1)+" [Warehouse Info.]");
							sheetObj.SetCellValue(j, "Grd01wh_cd",sheetObj.CellSearchValue(j, "Grd01wh_cd"),0);
							sheetObj.SetCellValue(j, "Grd01wh_nm",sheetObj.CellSearchValue(j, "Grd01wh_nm"),0);
							sheetObj.SelectCell(j, "Grd01wh_cd");
							break;
						}
					}
				}
			}
		}catch (e) {
			sheetObj.SetCellValue(row, "Grd02supp_cd","");
			sheetObj.SetCellValue(row, "Grd02supp_nm","");
		}
	}else*/
	if(colStr == "Grd01fix_loc_nm"){
		if(sheetObj.GetCellValue(row, "Grd01wh_cd") == ""){
			ComShowCodeMessage("COM0082", "Warehouse Code");
			sheetObj.SelectCell(row, "Grd01wh_cd");
			sheetObj.SetCellValue2(row, "Grd01fix_loc_cd","");
			sheetObj.SetCellValue2(row, "Grd01fix_loc_nm","");
			return;
		}else{
			var sParam="f_loc_cd="+sheetObj.GetCellValue(row, "Grd01wh_cd")+"&f_wh_loc_nm="+sheetObj.GetCellValue(row, "Grd01fix_loc_nm");
			ajaxSendPost(checkDataLocSheet2OnChange, sheetObj, '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
		}
	} else if(colStr == "Grd01def_loc_nm"){
		if(sheetObj.GetCellValue(row, "Grd01wh_cd") == ""){
			ComShowCodeMessage("COM0082", "Warehouse Code");
			sheetObj.SelectCell(row, "Grd01wh_cd");
			sheetObj.SetCellValue(row, "Grd01def_loc_cd","");
			sheetObj.SetCellValue(row, "Grd01def_loc_nm","");
			return;
		}else{
			var sParam="f_loc_cd="+sheetObj.GetCellValue(row, "Grd01wh_cd")+"&f_wh_loc_nm="+sheetObj.GetCellValue(row, "Grd01def_loc_nm");
			ajaxSendPost(checkDataWarehouseLocSheet2OnChange, sheetObj, '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
		}
	}
	
}
function checkDataLocSheet2OnChange(reqVal, sheetObj){
	var formObj=document.form;
	var row = sheetObj.GetSelectRow();
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(row,  "Grd01fix_loc_cd", rtnArr[0],0);
				sheetObj.SetCellValue(row,  "Grd01fix_loc_nm", rtnArr[1],0);
			}
			else{
				sheetObj.SetCellValue(row,  "Grd01fix_loc_nm", "",0);
                sheetObj.SetCellValue(row,  "Grd01fix_loc_cd", "",0);
			}
		}
		else{
			sheetObj.SetCellValue(row,  "Grd01fix_loc_nm", "",0);
            sheetObj.SetCellValue(row,  "Grd01fix_loc_cd", "",0);
		}
	}
}
function checkDataWarehouseLocSheet2OnChange(reqVal, sheetObj){
	var formObj=document.form;
	var row = sheetObj.GetSelectRow();
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(row,  "Grd01def_loc_cd", rtnArr[0],0);
				sheetObj.SetCellValue(row,  "Grd01def_loc_nm", rtnArr[1],0);
			}
			else{
				sheetObj.SetCellValue(row,  "Grd01def_loc_nm", "",0);
                sheetObj.SetCellValue(row,  "Grd01def_loc_cd", "",0);
			}
		}
		else{
			sheetObj.SetCellValue(row,  "Grd01def_loc_nm", "",0);
            sheetObj.SetCellValue(row,  "Grd01def_loc_cd", "",0);
		}
	}
}
function resultGrd01WhLocInfo(reqVal, sheetObj){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01wh_nm", rtnArr[0]);
			}
			else{
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01wh_cd", "");
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01wh_nm", "");
			}
		}
		else{
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01wh_cd", "");
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01wh_nm", "");
		}
	}
	else{
	}
}
//SUPP_CD 조회
function sheet3_OnChange(sheetObj, row, col) {
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "Grd02supp_cd"){
		if(sheetObj.GetCellValue(row, "Grd02supp_cd") != ""){
			var s_type = 'trdpCode';
			var s_code = sheetObj.GetCellValue(row, "Grd02supp_cd");
			
			ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(row, "Grd02supp_cd","");
			sheetObj.SetCellValue(row, "Grd02supp_nm","");
		}
	}     
}

function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	var sheetObj = sheet3;
	var row = sheetObj.GetSelectRow();
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			sheetObj.SetCellValue(row, "Grd02supp_cd",masterVals[0]);
			sheetObj.SetCellValue(row, "Grd02supp_nm",masterVals[3]);
		}else{
			sheetObj.SetCellValue(row, "Grd02supp_cd","");
			sheetObj.SetCellValue(row, "Grd02supp_nm","");
		}
	} else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function checkDataCustSheet3OnChange(reqVal, sheetObj){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				try{
					if(rtnArr[0] != ""){
						sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_nm",rtnArr[0]);
						var dup_flg="Y";
						for(var i=2; i<=sheetObj.LastRow();i++){
							for(var j=2; j<=sheetObj.LastRow();j++){
								if(i != j){
									if(sheetObj.GetCellValue(i, "Grd02supp_cd") == sheetObj.GetCellValue(j, "Grd02supp_cd")){
										ComShowCodeMessage("COM131302", "Row No : "+(j-1)+" [Supplier Info.]");
										sheetObj.SetCellValue(j, "Grd02supp_cd",sheetObj.CellSearchValue(j, "Grd02supp_cd"));
										sheetObj.SetCellValue(j, "Grd02supp_nm",sheetObj.CellSearchValue(j, "Grd02supp_nm"));
										sheetObj.SelectCell(j, "Grd02supp_cd");
										break;
									}
								}
							}
						}
					}else{
						sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_cd","");
						sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_nm","");
					}
				}catch (e) {
					sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_cd","");
					sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_nm","");
				}
			}
			else{
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_cd","", 0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_nm", "", 0);
				sheetObj.SelectCell(sheetObj.GetSelectRow(), "Grd02supp_cd");
				return;
			}
		}
		else{
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_cd","", 0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd02supp_nm", "", 0);
			sheetObj.SelectCell(sheetObj.GetSelectRow(), "Grd02supp_cd");
			return;
		}
	}
}
//SUPP_CD 팝업
function sheet3_OnPopupClick(sheetObj, row, col){
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "Grd02supp_cd"){   
		btn_ctrt_cust_cd();
	}
}
function setGrdShipperInfo(rtnVal){
	var formObj=document.form;
	var sheetObj2=docObjects[4];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "Grd02supp_cd",rtnValAry[0]);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "Grd02supp_nm",rtnValAry[1]);
		if(sheetObj2.GetCellValue(sheetObj2.GetSelectRow(), "Grd02supp_cd") == ""){
			sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "Grd02supp_nm","")	;
		}
	}
}
function sheet4_OnDblClick(sheetObj, Row, Col){
	var formObj1=document.frm1;
	var sName=sheetObj.ColSaveName(Col);
	if (sName == "Grd03file_org_nm") {
		//LKH::2015-09-28-File Attachment
		//ComSetObjValue(formObj1.downloadLocation, sheetObj.GetCellValue(Row, "Grd03file_path")+sheetObj.GetCellValue(Row, "Grd03file_sys_nm"));
		//ComSetObjValue(formObj1.downloadFileName, sheetObj.GetCellValue(Row, "Grd03file_org_nm"));
		formObj1.file_path.value = sheetObj.GetCellValue(Row, "Grd03file_path")+sheetObj.GetCellValue(Row, "Grd03file_sys_nm");
		
		//#2399 [Binex Visibility] attached file cannot be download on inbound search on Chrome
		//formObj1.file_name.value = sheetObj.GetCellValue(Row, "Grd03file_org_nm");
		formObj1.file_name.value = "\"" + sheetObj.GetCellValue(Row, "Grd03file_org_nm")+ "\"" ;
		formObj1.submit();
	}
}
function sheet5_OnSearchEnd(sheetObj, ErrMsg) {
	var rowcnt=sheetObj.RowCount();
 	sheetObj.SetCellFont("FontBold", 0, 3, rowcnt, 3,1);
	for ( var i=0; i <= rowcnt ; i++){
		sheetObj.SetCellBackColor(i,"Grd04opt_fld_nm","#D9E5FF");
	}
	
	//2017.11.21 #3264 [BINEX] [WMS4.0] ITEM CHANGE VALIDATION 
	if( !searchItemIbUse() ){
		getObj('item_nm').disabled = true;
		getObj('item_nm').className="L_input_R";
		
		$("#pack_master").find("input").attr("readonly", true);
		$("#pack_master").find("select").attr("disabled", true);
		$("#s_sh_ut_tp_cd1").attr("disabled", true);
		$("#s_sh_ut_tp_cd2").attr("disabled", true);
	}else{
		getObj('item_nm').disabled = false;
		getObj('item_nm').className="L_input";
		
		$("#pack_master").find("input").attr("readonly", false);
		$("#pack_master").find("select").attr("disabled", false);
		$("#s_sh_ut_tp_cd1").attr("disabled", false);
		$("#s_sh_ut_tp_cd2").attr("disabled", false);		
	}
	
}
var InputName="ctrt_no|ctrt_nm|item_cd|item_use_flg|item_nm|hts_no|hts_nm";
    InputName += "|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|lv1_width|lv1_length|lv1_height";
    InputName += "|item_cbm|item_cbf|item_kgs|item_grs_lbs|item_net_wgt|item_net_lbs|item_width|item_length|item_height";
    InputName += "|item_remark|item_sys_no|item_grp_cd";
    InputName += "|pkg_lv1_unit_cd|pkg_lv1_unit_nm|pkg_lv1_qty|pkg_lv1_put_tp_cd|item_pkgunit|item_pkgunit_nm|item_pkgbaseqty|pkg_lv2_put_tp_cd";
    InputName += "|pkg_lv3_unit_cd|pkg_lv3_unit_nm|pkg_lv3_qty|pkg_lv3_put_tp_cd|pkg_lv4_unit_cd|pkg_lv4_unit_nm|pkg_lv4_qty|pkg_lv4_put_tp_cd";
    InputName += "|alter_item_cd|barcode_no|safe_stc_qty|adv_curr_cd|adv_price|nego_curr_cd|nego_price|unit_curr_cd|unit_price|abc_cd|ref_cd_01|ref_cd_02";
    InputName += "|lv3_cbm|lv3_cbf|lv3_grs_kgs|lv3_grs_lbs|lv3_net_kgs|lv3_net_lbs|lv3_width|lv3_length|lv3_height|pkg_pl_std_qty|pkg_pl_over_wgt";
function quickSearch(){
	var formObj=document.form;
	if(loading_flag != "Y"){
        return;
    }
	if(formObj.in_item_cd.value != "" && formObj.in_ctrt_no.value != ""){
		formObj.item_sys_no.value="";
		imSearch();
	}
}
function btn_Search() {
	var formObj=document.form;
	if(loading_flag != "Y"){
        return;
    }
	formObj.item_sys_no.value="";
	formObj.logo_rectangle.value = "";
//	goTabSelect("01");
	imSearch();
}
function imSearch(){
    listCnt = 0;//Data가 있을시 Handing Unit, Package Utit, Palletization lock
	var formObj=document.form;
	if(ComIsEmpty(formObj.in_item_cd.value)){
		ComShowCodeMessage("COM0221");
		formObj.in_item_cd.focus();
		return;
	}	
	if(ComIsEmpty(formObj.in_ctrt_no.value)){
		ComShowCodeMessage("COM0222");
		formObj.in_ctrt_no.focus();
		return;
	}
	doShowProcess(true);
	setTimeout(function(){
		formObj.f_cmd.value = SEARCH01;
		var sXml = sheet1.GetSearchData("./ITEMMgmt_1GS.clt",FormQueryString(formObj)+"&len_ut_cd="+ofc_size_ut_cd);
		if (sXml.replace(/^\s+|\s+$/gm,'') != ''){
			if(formObj.item_sys_no.value != ""){
				setDataControl(sXml);
				//조회시 Contract No 입력불가
				if(formObj.item_sys_no.value != ""){
					formObj.ctrt_no.readonly = true;
					formObj.ctrt_no.className="L_input_R";
					formObj.item_cd.disabled = true;
					formObj.item_cd.className="L_input_R";
				}
			}else{
				var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
				var endIndxField = sXml.indexOf("</FIELD>");
				
				var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
				var $xml = $(xmlDoc);
				if($xml.find( "listCnt").text() == 1){
					setDataControl(sXml);
					//조회시 Contract No 입력불가
					if(formObj.item_sys_no.value != ""){
						formObj.ctrt_no.disabled = true;
						formObj.ctrt_no.className="L_input_R";
						formObj.item_cd.disabled = true;
						formObj.item_cd.className="L_input_R";
					}
				}else{
					ComShowCodeMessage("COM131302", "Item No");
					
					formObj.in_item_cd.value = "";
					return;
					
					var paramStr="./ITList.clt?ctrt_no="+formObj.in_ctrt_no.value+"&item_cd="+formObj.in_item_cd.value;
				    parent.mkNewFrame('Item Search', paramStr,"ITList_" + formObj.in_ctrt_no.value + "_" + formObj.in_item_cd.value);

				}
				//중복체크를 위한 item_cd 셋팅
				formObj.old_item_cd.value=formObj.item_cd.value;
			}
			formObj.btn_file_upload.disabled = false;
			formObj.btn_file_delete.disabled = false;
		}else{
			ComShowCodeMessage("COM0185");
			form.in_item_cd.select();
			formObj.btn_file_upload.disabled = true;
			formObj.btn_file_delete.disabled = true;
			return;
		}
		var strtIndxSheet2 = sXml.indexOf("<SHEET2>");
		var endIndxSheet2 = sXml.indexOf("</SHEET2>") + "</SHEET2>".length;
		
		var sheet2Data = sXml.substring(strtIndxSheet2,endIndxSheet2);
		sheet2.LoadSearchData(sheet2Data.replaceAll('SHEET2', 'SHEET'));
		
		var strtIndxSheet3 = sXml.indexOf("<SHEET3>");
		var endIndxSheet3 = sXml.indexOf("</SHEET3>") + "</SHEET3>".length;
		
		var sheet3Data = sXml.substring(strtIndxSheet3,endIndxSheet3);
		sheet3.LoadSearchData(sheet3Data.replaceAll('SHEET3', 'SHEET'));
		
		var strtIndxSheet4 = sXml.indexOf("<SHEET4>");
		var endIndxSheet4 = sXml.indexOf("</SHEET4>") + "</SHEET4>".length;
		
		var sheet4Data = sXml.substring(strtIndxSheet4,endIndxSheet4);
		sheet4.LoadSearchData(sheet4Data.replaceAll('SHEET4', 'SHEET'));
		
		var strtIndxSheet5 = sXml.indexOf("<SHEET5>");
		var endIndxSheet5 = sXml.indexOf("</SHEET5>") + "</SHEET5>".length;
		
		var sheet5Data = sXml.substring(strtIndxSheet5,endIndxSheet5);
		sheet5.LoadSearchData(sheet5Data.replaceAll('SHEET5', 'SHEET'));
		
		var strtIndxSheet6 = sXml.indexOf("<SHEET6>");
		var endIndxSheet6 = sXml.indexOf("</SHEET6>") + "</SHEET6>".length;
		
		var sheet6Data = sXml.substring(strtIndxSheet6,endIndxSheet6);
		sheet6.LoadSearchData(sheet6Data.replaceAll('SHEET6', 'SHEET'));
		
		var strtIndxSheet7 = sXml.indexOf("<SHEET7>");
		var endIndxSheet7 = sXml.indexOf("</SHEET7>") + "</SHEET7>".length;
		
		var sheet7Data = sXml.substring(strtIndxSheet7,endIndxSheet7);
		sheet7.LoadSearchData(sheet7Data.replaceAll('SHEET7', 'SHEET'));
		
		var strtIndxSheet8 = sXml.indexOf("<SHEET8>");
		var endIndxSheet8 = sXml.indexOf("</SHEET8>") + "</SHEET8>".length;
		
		var sheet8Data = sXml.substring(strtIndxSheet8,endIndxSheet8);
		sheet8.LoadSearchData(sheet8Data.replaceAll('SHEET8', 'SHEET'));
		
		var strtIndxSheet9 = sXml.indexOf("<SHEET9>");
		var endIndxSheet9 = sXml.indexOf("</SHEET9>") + "</SHEET9>".length;
		
		var sheet9Data = sXml.substring(strtIndxSheet9,endIndxSheet9);
		sheet9.LoadSearchData(sheet9Data.replaceAll('SHEET9', 'SHEET'));
		
		var strtIndxSheet10 = sXml.indexOf("<SHEET10>");
		var endIndxSheet10 = sXml.indexOf("</SHEET10>") + "</SHEET10>".length;
		
		var sheet10Data = sXml.substring(strtIndxSheet10,endIndxSheet10);
		sheet10.LoadSearchData(sheet10Data.replaceAll('SHEET10', 'SHEET'));
		
		chkCommaObj();
		
	},100);	
	doHideProcess(false);
//	if(formObj.item_use_flg[0].selected){
//		ComBtnEnable("btn_cancel");
//	}else{
//		ComBtnDisable("btn_cancel");
//	}

	formObj.form_mode.value = "UPDATE";
	
}
function setDataControl(sXml){
	//console.log(sXml);
	var formObj=document.form;
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	
	formObj.item_sys_no.value = $xml.find( "item_sys_no").text();
	formObj.ctrt_no.value = $xml.find( "ctrt_no").text();
	formObj.h_ctrt_no.value = $xml.find( "ctrt_no").text();
	formObj.ctrt_nm.value = $xml.find( "ctrt_nm").text();
	formObj.item_cd.value = $xml.find( "item_cd").text();
	formObj.item_nm.value = $xml.find( "item_nm").text();
	formObj.hts_no.value = $xml.find( "hts_no").text();
	//#3216 [CLT] CONTRACT ITEM ENTRY - HTS 항목 저장 후 코드 표시
	formObj.hts_nm.value = $xml.find( "hts_nm").text().replace(/&amp;/g,"&").replace(/&#39;/g,"'").replace(/&#96;/g,"`");
	formObj.item_grp_cd.value = $xml.find( "item_grp_cd").text();
	formObj.item_use_flg.value = $xml.find( "item_use_flg").text();
	formObj.pkg_lv1_unit_cd.value = $xml.find( "pkg_lv1_unit_cd").text();
//	formObj.pkg_lv1_unit_nm.value = $xml.find( "pkg_lv1_unit_nm").text();
	formObj.pkg_lv1_qty.value = $xml.find( "pkg_lv1_qty").text();
	/*formObj.pkg_lv1_put_tp_cd.value = $xml.find( "pkg_lv1_put_tp_cd").text();*/
	formObj.lv1_cbm.value = $xml.find( "lv1_cbm").text();
	formObj.lv1_cbf.value = $xml.find( "lv1_cbf").text();
	formObj.lv1_grs_kgs.value = $xml.find( "lv1_grs_kgs").text();
	formObj.lv1_grs_lbs.value = $xml.find( "lv1_grs_lbs").text();
	formObj.lv1_net_kgs.value = $xml.find( "lv1_net_kgs").text();
	formObj.lv1_net_lbs.value = $xml.find( "lv1_net_lbs").text();
	formObj.lv1_width.value = $xml.find( "lv1_width").text();
	formObj.lv1_length.value = $xml.find( "lv1_length").text();
	formObj.lv1_height.value = $xml.find( "lv1_height").text();
	formObj.item_pkgunit.value = $xml.find( "item_pkgunit").text();
//	formObj.item_pkgunit_nm.value = $xml.find( "item_pkgunit_nm").text();
	formObj.item_pkgbaseqty.value = $xml.find( "item_pkgbaseqty").text() == 0 ? "" : $xml.find( "item_pkgbaseqty").text();
	/*formObj.pkg_lv2_put_tp_cd.value = $xml.find( "pkg_lv2_put_tp_cd").text();*/
	formObj.item_cbm.value = $xml.find( "item_cbm").text();
	formObj.item_cbf.value = $xml.find( "item_cbf").text();
	formObj.item_kgs.value = $xml.find( "item_kgs").text();
	formObj.item_grs_lbs.value = $xml.find( "item_grs_lbs").text();
	formObj.item_net_wgt.value = $xml.find( "item_net_wgt").text();
	formObj.item_net_lbs.value = $xml.find( "item_net_lbs").text();
	formObj.item_width.value = $xml.find( "item_width").text();
	formObj.item_height.value = $xml.find( "item_height").text();
	formObj.item_length.value = $xml.find( "item_length").text();
	formObj.pkg_lv3_unit_cd.value = $xml.find( "pkg_lv3_unit_cd").text();
//	formObj.pkg_lv3_unit_nm.value = $xml.find( "pkg_lv3_unit_nm").text();
	formObj.pkg_lv3_qty.value = $xml.find( "pkg_lv3_qty").text() == 0 ? "" : $xml.find( "pkg_lv3_qty").text();
	/*formObj.pkg_lv3_put_tp_cd.value = $xml.find( "pkg_lv3_put_tp_cd").text();*/
	formObj.lv3_cbm.value = $xml.find( "lv3_cbm").text();
	formObj.lv3_cbf.value = $xml.find( "lv3_cbf").text();
	formObj.lv3_grs_kgs.value = $xml.find( "lv3_grs_kgs").text();
	formObj.lv3_grs_lbs.value = $xml.find( "lv3_grs_lbs").text();
	formObj.lv3_net_kgs.value = $xml.find( "lv3_net_kgs").text();
	formObj.lv3_net_lbs.value = $xml.find( "lv3_net_lbs").text();
	formObj.lv3_width.value = $xml.find( "lv3_width").text();
	formObj.lv3_length.value = $xml.find( "lv3_length").text();
	formObj.lv3_height.value = $xml.find( "lv3_height").text();
	/*formObj.pkg_lv4_unit_cd.value = $xml.find( "pkg_lv4_unit_cd").text();
	formObj.pkg_lv4_unit_nm.value = $xml.find( "pkg_lv4_unit_nm").text();
	formObj.pkg_lv4_qty.value = $xml.find( "pkg_lv4_qty").text() == 0 ? "" : $xml.find( "pkg_lv4_qty").text();
	formObj.pkg_pl_std_qty.value = $xml.find( "pkg_pl_std_qty").text();
	formObj.pkg_pl_over_wgt.value = $xml.find( "pkg_pl_over_wgt").text();*/
	formObj.alter_item_cd.value = $xml.find( "alter_item_cd").text();
//	formObj.adv_curr_cd.value = $xml.find( "adv_curr_cd").text();
//	formObj.adv_price.value = $xml.find( "adv_price").text();
	formObj.abc_cd.value = $xml.find( "abc_cd").text();
	formObj.barcode_no.value = $xml.find( "barcode_no").text();
//	formObj.nego_curr_cd.value = $xml.find( "nego_curr_cd").text();
//	formObj.nego_price.value = $xml.find( "nego_price").text();
	formObj.ref_cd_01.value = $xml.find( "ref_cd_01").text();
	formObj.safe_stc_qty.value = $xml.find( "safe_stc_qty").text();
//	formObj.unit_curr_cd.value = $xml.find( "unit_curr_cd").text();
//	formObj.unit_price.value = $xml.find( "unit_price").text();
	formObj.ref_cd_02.value = $xml.find( "ref_cd_02").text();
	formObj.item_remark.value = $xml.find( "item_remark").text();
	formObj.pkg_lv1_inr_qty.value = $xml.find( "pkg_lv1_inr_qty").text();
	formObj.strg_sys_no.value = $xml.find( "strg_sys_no").text();
	
	formObj.comb_uom_type.value = $xml.find( "comb_uom_type").text();
	formObj.storage_uom.value = $xml.find( "storage_uom").text();
	
	//Data가 있을시 Handing Unit, Package Utit, Palletization lock
	listCnt = $xml.find( "listCnt").text();
	formObj.h_pkg_lv1_unit_cd.value = $xml.find( "pkg_lv1_unit_cd").text();
	formObj.h_item_pkgunit.value = $xml.find( "item_pkgunit").text();
	formObj.h_pkg_lv3_unit_cd.value = $xml.find( "pkg_lv3_unit_cd").text();
	
	if($xml.find( "len_ut_cd").text() != "" && $xml.find( "len_ut_cd").text() != null){
		h_ut_tp_cd = $xml.find( "len_ut_cd").text();
		document.getElementById("sh_ut_tp_cd").innerHTML = h_ut_tp_cd;
		if(h_ut_tp_cd =="CM"){
			// 센치
			ut_std_chg = 0.01;
			document.getElementById("s_sh_ut_tp_cd1").checked=true;
			h_ut_tp_cd = "CM";
		}else if(h_ut_tp_cd=="INCH"){
			//Inch
			ut_std_chg  = 0.0254;
			wgt_std_chg = 2.54;
			document.getElementById("s_sh_ut_tp_cd2").checked=true;
			h_ut_tp_cd = "INCH";
		}
	}
//	if($xml.find( "item_use_flg").text() == "Y"){
//		ComBtnEnable("btn_cancel");
//	}else{
//		ComBtnDisable("btn_cancel");
//	}
	
	var strtIndxField2 = sXml.indexOf("<FIELD2>") + "<FIELD2>".length;
	var endIndxField2 = sXml.indexOf("</FIELD2>");
	
	var xmlDoc2 = $.parseXML(sXml.substring(strtIndxField2,endIndxField2));
	var $xml2 = $(xmlDoc2);
	formObj.cal_method_cd.value = $xml2.find( "cal_method_cd").text();

	/* #2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (S) */
	formObj.use_serial_flag.value = $xml.find("use_serial_flag").text();
	formObj.serial_req_flag.value = $xml.find("serial_req_flag").text();
	formObj.serial_uniq_flag.value = $xml.find("serial_uniq_flag").text();
	formObj.picking_sku_req_flag.value = $xml.find("picking_sku_req_flag").text();
	formObj.picking_loc_req_flag.value = $xml.find("picking_loc_req_flag").text();
	formObj.picking_serial_scan_req_flag.value = $xml.find("picking_serial_scan_req_flag").text(); //#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가

	if(formObj.use_serial_flag.value == "Y") {
		formObj.chk_use_serial_flag.checked = true;
		ComEnableObject(formObj.chk_serial_req_flag, true);
		ComEnableObject(formObj.chk_serial_uniq_flag, true);
	} else {
		formObj.chk_use_serial_flag.checked = false;
		ComEnableObject(formObj.chk_serial_req_flag, false);
		ComEnableObject(formObj.chk_serial_uniq_flag, false);
	}
	if(formObj.serial_req_flag.value == "Y") {
		formObj.chk_serial_req_flag.checked = true;
		ComEnableObject(formObj.chk_picking_serial_scan_req_flag, true);
	} else {
		formObj.chk_serial_req_flag.checked = false;
		ComEnableObject(formObj.chk_picking_serial_scan_req_flag, false);
	}
	if(formObj.serial_uniq_flag.value == "Y") formObj.chk_serial_uniq_flag.checked = true;
	else formObj.chk_serial_uniq_flag.checked = false;
	if(formObj.picking_sku_req_flag.value == "Y") formObj.chk_picking_sku_req_flag.checked = true;
	else formObj.chk_picking_sku_req_flag.checked = false;
	if(formObj.picking_loc_req_flag.value == "Y") formObj.chk_picking_loc_req_flag.checked = true;
	else formObj.chk_picking_loc_req_flag.checked = false;

	//#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
	if(formObj.picking_serial_scan_req_flag.value == "Y") {
		formObj.chk_picking_serial_scan_req_flag.checked = true;
	} else {
		formObj.chk_picking_serial_scan_req_flag.checked = false;
	}

	/* #2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (E) */
}
//SUPPLIER LIST 조회후 수행
function sheet3_OnSearchEnd(){
	/*
if(docObjects[4].GetCellValue(1, "Grd01supp_cd") == ""){
		docObjects[4].RemoveAll();
	}
	*/
}
// Storage Type License Plate
function sheet8_OnSearchEnd(){
	var formObj=document.form;
	if (!ComIsNull(formObj.comb_uom_type.value)) {
		formObj.hunit_for_uom.value = sheet8.GetCellValue(1,"Grd08hunit_for_uom");
	}
}
function sheet10_OnSearchEnd(){
	// Storage Tab 초기 설정
	setStoragDefaultInfo("skip");
}
function btn_New(){
	imNew();
	goTabSelect("01");
}
function imNew() {
	var formObj=document.form;
	formObj.reset();
	formObj.form_mode.value = "NEW";
	formObj.item_sys_no.value = "";
	formObj.in_item_cd.value="";
	formObj.in_ctrt_no.value="";
	formObj.in_ctrt_nm.value="";
	formObj.ctrt_no.value="";
	formObj.ctrt_nm.value="";
	formObj.item_sys_no.value="";
	formObj.old_item_cd.value="";
/*	formObj.pkg_lv1_put_tp_cd.value = "N";
	formObj.pkg_lv2_put_tp_cd.value = "N";
	formObj.pkg_lv3_put_tp_cd.value = "N";
	formObj.pkg_lv4_put_tp_cd.value = "N";*/
	formObj.ctrt_no.disabled = false;
	formObj.ctrt_no.className="L_input";
	formObj.item_cd.disabled = false;
	formObj.item_cd.className="L_input";
	formObj.pkg_lv1_unit_cd.disabled = false;
	formObj.pkg_lv1_unit_cd.className="L_input";
	formObj.item_pkgunit.disabled = false;
	formObj.item_pkgunit.className="L_input";
	formObj.item_pkgbaseqty.disabled = false;
	formObj.item_pkgbaseqty.className="L_input";
	formObj.pkg_lv3_unit_cd.disabled = false;
	formObj.pkg_lv3_unit_cd.className="L_input";
	formObj.pkg_lv3_qty.disabled = false;
	formObj.pkg_lv3_qty.className="L_input";
/*	formObj.pkg_lv4_unit_cd.disabled = false;
	formObj.pkg_lv4_unit_cd.className="L_input";
	formObj.pkg_lv4_qty.disabled = false;
	formObj.pkg_lv4_qty.className="L_input";*/
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	docObjects[3].RemoveAll();
	docObjects[4].RemoveAll();
	docObjects[5].RemoveAll();
	docObjects[6].RemoveAll();
	docObjects[7].RemoveAll();
	docObjects[8].RemoveAll();
	docObjects[9].RemoveAll();
	//ComBtnDisable("btn_cancel");
	h_ut_tp_cd = ofc_size_ut_cd;
	document.getElementById("sh_ut_tp_cd").innerHTML = h_ut_tp_cd;
	
	if(h_ut_tp_cd =="CM"){
		// 센치
		ut_std_chg = 0.01;
		document.getElementById("s_sh_ut_tp_cd1").checked=true;
		h_ut_tp_cd = "CM";
	}else if(h_ut_tp_cd=="INCH"){
		//Inch
		ut_std_chg  = 0.0254;
		wgt_std_chg = 2.54;
		document.getElementById("s_sh_ut_tp_cd2").checked=true;
		h_ut_tp_cd = "INCH";
	}
	
	//Data가 있을시 Handing Unit, Package Utit, Palletization lock
	listCnt = 0;

	/* #2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (S) */
	formObj.chk_use_serial_flag.checked = true;
	formObj.use_serial_flag.value = "Y";
	formObj.chk_serial_req_flag.checked = false;
	formObj.serial_req_flag.value = "N";
	formObj.chk_serial_uniq_flag.checked = false;
	formObj.serial_uniq_flag.value = "N";
	formObj.chk_picking_sku_req_flag.checked = false;
	formObj.picking_sku_req_flag.value = "N";
	formObj.chk_picking_loc_req_flag.checked = false;
	formObj.picking_loc_req_flag.value = "N";
	formObj.chk_picking_serial_scan_req_flag.checked = false;  //#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
	formObj.chk_picking_serial_scan_req_flag.disabled = true;  //#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
	formObj.picking_serial_scan_req_flag.value = "N";  //#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
	ComEnableObject(formObj.chk_serial_req_flag, true);
	ComEnableObject(formObj.chk_serial_uniq_flag, true);
	/* #2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (E) */

	//2017.11.21 #3264 [BINEX] [WMS4.0] ITEM CHANGE VALIDATION 
	getObj('item_nm').disabled = false;
	getObj('item_nm').className="L_input";
	
	$("#pack_master").find("input").attr("readonly", false);
	$("#pack_master").find("select").attr("disabled", false);
	$("#s_sh_ut_tp_cd1").attr("disabled", false);
	$("#s_sh_ut_tp_cd2").attr("disabled", false);	
	
	//#3223 [CLA V460 TEST] WMS STORAGE CALCUATION METHOD
	document.getElementById("sWarn_text").innerHTML = "";
}
function btn_Save() {
	var saveXml = "";
	var formObj=document.form;
	// LOCATION은 사용하지 않으므로 무조건 RESET
	sheet10.RemoveAll();
	if(validation()){
		// UOM
		if (formObj.comb_uom_type.value == "UOM") {
			sheet9.RemoveAll();
			sheet10.RemoveAll();
			// License Plate#(LCP)
		} else if (formObj.comb_uom_type.value == "LCP") {
			sheet8.RemoveAll();
			sheet10.RemoveAll();
			// Location(LOC)
		} else {
			sheet8.RemoveAll();
			sheet9.RemoveAll();
		}
		if(formObj.form_mode.value == "UPDATE"){
			if(ComShowCodeConfirm("COM0226")){
				formObj.f_cmd.value = MODIFY01;
				var sParam=FormQueryString(formObj);
				var paramsSheet2 = '&' + sheet2.GetSaveString();
				var paramsSheet3 = '&' + sheet3.GetSaveString();
				var paramsSheet4 = '&' + sheet4.GetSaveString();
				var paramsSheet5 = '&' + sheet5.GetSaveString();
				var paramsSheet6 = '&' + sheet6.GetSaveString();
				var paramsSheet7 = '&' + sheet7.GetSaveString();
				var paramsSheet8 = '&' + sheet8.GetSaveString(1);
				var paramsSheet9 = '&' + sheet9.GetSaveString();
				var paramsSheet10 = '&' + sheet10.GetSaveString();
				sParam = sParam + paramsSheet2 + paramsSheet3 + paramsSheet4 + paramsSheet5 + paramsSheet6 + paramsSheet7 + paramsSheet8+ paramsSheet9+ paramsSheet10+"&len_ut_cd="+h_ut_tp_cd;
				doShowProcess(true);
 				saveXml=docObjects[0].GetSearchData("./ITEMMgmt_2GS.clt", sParam);
				docObjects[0].LoadSearchData(saveXml,{Sync:1} );
				doHideProcess(false);
			}else{
				return;
			}
		}else{
			if(formObj.form_mode.value == "NEW"){
				if(ComShowCodeConfirm("COM0036")){
					formObj.f_cmd.value = MODIFY01;
					var sParam=FormQueryString(formObj);
					var paramsSheet2 = '&' + sheet2.GetSaveString();
					var paramsSheet3 = '&' + sheet3.GetSaveString();
					var paramsSheet4 = '&' + sheet4.GetSaveString();
					var paramsSheet5 = '&' + sheet5.GetSaveString();
					var paramsSheet6 = '&' + sheet6.GetSaveString();
					var paramsSheet7 = '&' + sheet7.GetSaveString();
					var paramsSheet8 = '&' + sheet8.GetSaveString(1);
					var paramsSheet9 = '&' + sheet9.GetSaveString();
					var paramsSheet10 = '&' + sheet10.GetSaveString();
					sParam = sParam + paramsSheet2 + paramsSheet3 + paramsSheet4 + paramsSheet5 + paramsSheet6 + paramsSheet7 + paramsSheet8+ paramsSheet9+ paramsSheet10+"&len_ut_cd="+h_ut_tp_cd;
					doShowProcess(true);
	 				saveXml=docObjects[0].GetSearchData("./ITEMMgmt_2GS.clt", sParam);
					docObjects[0].LoadSearchData(saveXml,{Sync:1} );
					formObj.item_sys_no.value = docObjects[0].GetCellValue(1, "Grd00item_sys_no");
					doHideProcess(false);
				}else{
					return;
				}
			}
		}
		//1. Save 후 조회
		if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
//			ComShowCodeMessage("COM0093", "");
			//Change message 'Successfully' to showCompleteProcess();
			showCompleteProcess();
			
			
			//저장성공시 재조회를 위해 조회조건을 셋팅한다.
			formObj.in_item_cd.value=formObj.item_cd.value;
			formObj.in_ctrt_no.value=formObj.ctrt_no.value;
			formObj.in_ctrt_nm.value=formObj.ctrt_nm.value;
			//중복체크를 위한 item_cd 셋팅
			formObj.old_item_cd.value=formObj.item_cd.value;
			btn_Search();
		}else{
			ComShowCodeMessage("COM12227", "");
		}
	}	
}
function btn_Cancel(){
	var formObj=document.form;
	formObj.form_mode.value = "CANCEL";
	if(ComShowCodeConfirm("COM0041")){
		formObj.f_cmd.value = MODIFY;
		var sXml = docObjects[3].GetSearchData('./ITEMMgmt_2GS.clt', FormQueryString(formObj));
		if(sXml.replace(/^\s+|\s+$/gm,'') != ''){
			var xmlDoc = $.parseXML(sXml);
			var $xml1 = $(xmlDoc);
			var res = $xml1.find("result").text();
			if(res == 'OK'){
//				ComShowCodeMessage("COM0093", "");
				//Change message 'Successfully' to showCompleteProcess();
				showCompleteProcess();
				
				//저장성공시 재조회를 위해 조회조건을 셋팅한다.
				formObj.in_item_cd.value=formObj.item_cd.value;
				formObj.in_ctrt_no.value=formObj.ctrt_no.value;
				formObj.in_ctrt_nm.value=formObj.ctrt_nm.value;
				imSearch();
			}
		}
	}
}
function row_add() {
	var sheetObj1=docObjects[3];		
	if(sheetObj1.GetCellValue(sheetObj1.LastRow(), "Grd01ctrt_no") == ""){
		sheetObj1.RemoveAll();
    }
	//var intRows=sheetObj1.Rows;
	var row_new = sheetObj1.DataInsert(-1);
	//LKH::2015-09-27 WMS3.O 긴급수정4
	sheetObj1.SetCellValue(row_new, "Grd01ctrt_no",form.ctrt_no.value);
	sheetObj1.SetCellValue(row_new, "Grd01item_sys_no",form.item_sys_no.value);
	// the Default value for warehouse code for 'Warehouse - LOC' should be the 'default warehouse' 2017.01.24
	var formObj=document.form;
	if(formObj.dflt_wh_cd.value != ""){
		sheetObj1.SetCellValue(row_new, "Grd01wh_cd",form.dflt_wh_cd.value);
	}
}
function row_add2() {
	var sheetObj2=docObjects[4];		
	if(sheetObj2.GetCellValue(sheetObj2.LastRow(), "Grd02ctrt_no") == ""){
		sheetObj2.RemoveAll();
    }
	//var intRows=sheetObj2.Rows;
	var row_new1 =  sheetObj2.DataInsert(-1);
	//LKH::2015-09-27 WMS3.O 긴급수정4
	sheetObj2.SetCellValue(row_new1, "Grd02ctrt_no",form.ctrt_no.value);
	sheetObj2.SetCellValue(row_new1, "Grd02item_sys_no",form.item_sys_no.value);
}
function row_add3() {
	var sheetObj5=docObjects[1];		
	if(sheetObj5.GetCellValue(sheetObj5.LastRow(), "Grd05ctrt_no") == ""){
		sheetObj5.RemoveAll();
	}
	
	var row_new1 =  sheetObj5.DataInsert(-1);
	//LKH::2015-09-27 WMS3.O 긴급수정4
	sheetObj5.SetCellValue(row_new1, "Grd05ctrt_no",form.ctrt_no.value);
	sheetObj5.SetCellValue(row_new1, "Grd05item_sys_no",form.item_sys_no.value);
}
function row_add4() {
	var sheetObj6=docObjects[2];		
	if(sheetObj6.GetCellValue(sheetObj6.LastRow(), "Grd06ctrt_no") == ""){
		sheetObj6.RemoveAll();
	}
	var row_new1 =  sheetObj6.DataInsert(-1);
	//LKH::2015-09-27 WMS3.O 긴급수정4
	sheetObj6.SetCellValue(row_new1, "Grd06ctrt_no",form.ctrt_no.value);
	sheetObj6.SetCellValue(row_new1, "Grd06item_sys_no",form.item_sys_no.value);
}
function row_del(){
	var sheetObj=docObjects[3];
	if(sheetObj.RowCount()> 0){
		ComRowHideDelete(sheetObj, "Grd01del_chk");
	}
	sheetObj.CheckAll("Grd01del_chk",0);
}
function row_del2(){
	var sheetObj=docObjects[4];
	if(sheetObj.RowCount()> 0){
		ComRowHideDelete(sheetObj, "Grd02del_chk");
	}
	sheetObj.CheckAll("Grd02del_chk",0);
}
function row_del3(){
	var sheetObj=docObjects[1];
	if(sheetObj.RowCount()> 0){
		ComRowHideDelete(sheetObj, "Grd05del_chk");
	}
	sheetObj.CheckAll("Grd05del_chk",0);
}
function row_del4(){
	var sheetObj=docObjects[2];
	if(sheetObj.RowCount()> 0){
		ComRowHideDelete(sheetObj, "Grd06del_chk");
	}
	sheetObj.CheckAll("Grd06del_chk",0);
}
function btn_ctrt(){
	var formObj=document.form;
	var params = "ContractRoutePopup.clt"; 
	callBackFunc = "setCtrtNoInfo";
    modal_center_open(params, callBackFunc, 900, 580,"yes");
}
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.in_ctrt_no.value=rtnValAry[0];//full_nm
		formObj.in_ctrt_nm.value=rtnValAry[1];//full_nm
	}
}
function btn_ctrt2(key){
	var formObj=document.form;
	var ctrt_nm = "";
	if(key && key =='e'){
		ctrt_nm=$("#ctrt_nm").val();
	}
	var params = "ContractRoutePopup.clt"+ "?ctrt_nm="+ctrt_nm;
    callBackFunc = "setCtrtNoInfo2";
    modal_center_open(params, callBackFunc, 900, 580,"yes");
}
function setCtrtNoInfo2(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ctrt_no.value=rtnValAry[0];//full_nm
		formObj.ctrt_nm.value=rtnValAry[1];//full_nm
	}
	getOptField();
}
function btn_hts(){
	var formObj=document.form;
    
	rtnary=new Array(3);
	rtnary[0]="1";
//	rtnary[1]=formObj.hts_no.value;
//	rtnary[2]=formObj.hts_nm.value;
	rtnary[1]="";
	rtnary[2]="";

	callBackFunc = "setCommofityInfo";
	modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
}
function setCommofityInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.hts_no.value=rtnValAry[0];//full_nm
		formObj.hts_nm.value=rtnValAry[2];//full_nm
	}
}
function btn_adv_curr(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=C010";
	callBackFunc = "setAdvCurrInfo";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setAdvCurrInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.adv_curr_cd.value=rtnValAry[1];
	}
}
function btn_unit_curr(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=C010";
    callBackFunc = "setUnitCurrInfo";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setUnitCurrInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.unit_curr_cd.value=rtnValAry[1];
	}
}
function btn_nego_curr(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=C010";
    callBackFunc = "setNegoCurrInfo";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setNegoCurrInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.nego_curr_cd.value=rtnValAry[1];
	}
}
function btn_pkgunit1(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=A6";
    callBackFunc = "setPkgUnitInfo1";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setPkgUnitInfo1(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.pkg_lv1_unit_cd.value=rtnValAry[1];
//		formObj.pkg_lv1_unit_nm.value=rtnValAry[2];
	}
}
function btn_pkgunit(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=A6";
    callBackFunc = "setPkgUnitInfo";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setPkgUnitInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.item_pkgunit.value=rtnValAry[1];
//		formObj.item_pkgunit_nm.value=rtnValAry[2];
	}
}
function btn_pkgunit3(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=A6";
    callBackFunc = "setPkgUnitInfo3";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setPkgUnitInfo3(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.pkg_lv3_unit_cd.value=rtnValAry[1];
		formObj.pkg_lv3_unit_nm.value=rtnValAry[2];
	}
}
/*
function btn_pkgunit4(){
	var formObj=document.form;
	var params= "CommonCodePopup.clt?grp_cd=A6";
    callBackFunc = "setPkgUnitInfo4";
    modal_center_open(params, callBackFunc, 400, 520,"yes");
}
function setPkgUnitInfo4(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.pkg_lv4_unit_cd.value=rtnValAry[1];
		formObj.pkg_lv4_unit_nm.value=rtnValAry[2];
	}
}
*/
function btn_grp_cd(){
	var formObj=document.form;
	if(formObj.ctrt_no.value == ""){
		ComShowCodeMessage("COM0082", "Contract No");
		formObj.ctrt_no.focus();
		return;
	}
	var params = "ItemGroupPopup.clt?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;
    callBackFunc = "setItemGroupCode";
    modal_center_open(params, callBackFunc, 700, 470,"yes");
}
function setItemGroupCode(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.item_grp_cd.value=rtnValAry[0];//full_nm
	}
}
function getItemGroup(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.item_grp_cd.value="";
	}else{
		searchItemGroup(formObj, ComGetObjValue(formObj.item_grp_cd), "item_grp_cd");
	}
}
function searchItemGroup(form, item_grp_cd, col_nm){
	var formObj=document.form;
	if(formObj.ctrt_no.value == ""){
		ComShowCodeMessage("COM0082", "Contract No");
		formObj.item_grp_cd.value="";
		formObj.ctrt_no.focus();
		return;
	}
	ajaxSendPost(resultItemGroup, 'reqVal','&goWhere=aj&bcKey=searchItemGroup&in_ctrt_no='+formObj.ctrt_no.value+'&in_grp_cd='+item_grp_cd, './GateServlet.gsl');
}
function resultItemGroup(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.item_grp_cd.value=rtnArr[0];
			}
			else{
				formObj.item_grp_cd.value="";
			}
		}
		else{
			formObj.item_grp_cd.value="";
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function validation(){
	var formObj=document.form;
	var sheetObj5=docObjects[1];
	var sheetObj6=docObjects[2];
	var sheetObj1=docObjects[3];
	var sheetObj2=docObjects[4];
	if(isNull(formObj.ctrt_no)){
		//Contract No 체크
		ComShowCodeMessage("COM0082", "Contract No");
		formObj.ctrt_no.focus();
		return false;
	}
	if(ComTrim(formObj.item_cd, " ") == ""){
		//Customer Item ID 체크
		ComShowCodeMessage("COM0082", "Customer Item ID");
		formObj.item_cd.focus();
		return false;
	}
	if(ComTrim(formObj.item_nm, " ") == ""){
		//Customer Item ID 체크
		ComShowCodeMessage("COM0082", "Customer Item Name");
		formObj.item_nm.focus();
		return false;
	}
	if(ComTrim(formObj.pkg_lv1_unit_cd, " ") == ""){
		//LEVEL 1 체크
		ComShowCodeMessage("COM0082", "Handling Unit");
		formObj.pkg_lv1_unit_cd.focus();
		return false;
	}
	
	// Storage Tab Validation
	var rowCnt8 = sheet8.RowCount();
	var rowCnt9 = sheet9.RowCount();
	var rowCnt10 = sheet10.RowCount();

	if(!isNull(formObj.comb_uom_type) && (rowCnt8 > 0 || rowCnt9 > 0 || rowCnt10 > 0)){
		if (formObj.comb_uom_type.value == "UOM") {
			if (rowCnt8 > 0) {
				if (isNull(formObj.comb_uom_type)) {
					//Type 체크
					ComShowCodeMessage("COM0082", "Type");
					formObj.comb_uom_type.focus();
					return false;
				}
			}
			if (rowCnt8 > 0) {
				var hdrR = sheet8.HeaderRows();
				var rowCnt = sheet8.RowCount();
				for (var i = hdrR; i < rowCnt + hdrR; i++) {
					if (sheet8.GetCellValue(i, "Grd08unit_price") == "0.00000000"
						|| sheet8.GetCellValue(i, "Grd08unit_price") == "0") {
						ComShowCodeMessage("COM0114","Rate");
						sheet8.SelectCell(i, "Grd08unit_price");
						return false;
					}
					if (ComIsNull(sheet8.GetCellValue(i, "Grd08curr_cd"))) {
						ComShowCodeMessage("COM0114","Currency");
						sheet8.SelectCell(i, "Grd08curr_cd");
						return false;
					}
				}
			}
		}
		if (formObj.comb_uom_type.value == "LCP") {
			if (rowCnt9 > 0) {
				var hdrR = sheet9.HeaderRows();
				var rowCnt = sheet9.RowCount();
				for (var i = hdrR; i < rowCnt + hdrR; i++) {
					if (sheet9.GetCellValue(i, "Grd09unit_price") == "0.00000000"
						|| sheet9.GetCellValue(i, "Grd09unit_price") == "0") {
						ComShowCodeMessage("COM0114","Rate");
						sheet9.SelectCell(i, "Grd09unit_price");
						return false;
					}
					if (ComIsNull(sheet9.GetCellValue(i, "Grd09curr_cd"))) {
						ComShowCodeMessage("COM0114","Currency");
						sheet9.SelectCell(i, "Grd09curr_cd");
						return false;
					}
				}
			}
		}
		if (formObj.comb_uom_type.value == "LOC") {
			if (rowCnt10 > 0) {
				var hdrR = sheet10.HeaderRows();
				var rowCnt = sheet10.RowCount();
				for (var i = hdrR; i < rowCnt + hdrR; i++) {
					if (sheet10.GetCellValue(i, "Grd10unit_price") == "0.00000000"
						|| sheet10.GetCellValue(i, "Grd10unit_price") == "0" ) {
						ComShowCodeMessage("COM0114","Rate");
						sheet10.SelectCell(i, "Grd10unit_price");
						return false;
					}
					if (ComIsNull(sheet10.GetCellValue(i, "Grd10curr_cd"))) {
						ComShowCodeMessage("COM0114","Currency");
						sheet10.SelectCell(i, "Grd10curr_cd");
						return false;
					}
				}
			}
		}
	}
	//Type이 UOM인 경우, 필수항목
	if(formObj.comb_uom_type.value == "UOM"){
		if(isNull(formObj.storage_uom)){
			//Contract No 체크
			ComShowCodeMessage("COM0082", "UOM");
			formObj.storage_uom.focus();
			return false;
		}
		if(formObj.hunit_for_uom.value == "0.00000" || formObj.hunit_for_uom.value == "0.000" || formObj.hunit_for_uom.value == "0"){
			//Contract No 체크
			var pkg_lv1_unit_cd = document.getElementById("pkg_lv1_unit_cd");
			var t_pkg_lv1_unit_cd = pkg_lv1_unit_cd.options[pkg_lv1_unit_cd.selectedIndex].text
			var arr_pkg_lv1_unit_cd = t_pkg_lv1_unit_cd.split(":");
			var storage_uom = document.getElementById("storage_uom");
			ComShowCodeMessage("COM0082", "#of " + arr_pkg_lv1_unit_cd[1] + " per " + storage_uom.options[storage_uom.selectedIndex].text);
			formObj.hunit_for_uom.focus();
			return false;
		}
	}
	
	//Unit 이 존재할때 Qty는 필수항목이다.
	if(formObj.pkg_lv1_unit_cd.value != ""){
		if(formObj.pkg_lv1_qty.value == "" || formObj.pkg_lv1_qty.value == 0){
			ComShowCodeMessage("COM0082", "Handling Unit Qty");
			formObj.pkg_lv1_qty.focus();
			return false;
		}
		if(formObj.pkg_lv1_inr_qty.value == "" || formObj.pkg_lv1_inr_qty.value == 0){
			ComShowCodeMessage("COM0082", "Handling Unit Inner Qty");
			formObj.pkg_lv1_inr_qty.focus();
			return false;
		}
	}
	if(formObj.item_pkgunit.value != ""){
		if(formObj.item_pkgbaseqty.value == "" || formObj.item_pkgbaseqty.value == 0){
			ComShowCodeMessage("COM0082", "Package Unit Qty");
			formObj.item_pkgbaseqty.focus();
			return false;
		}
	}
	if(formObj.pkg_lv3_unit_cd.value != ""){
		if(formObj.pkg_lv3_qty.value == "" || formObj.pkg_lv3_qty.value == 0){
			ComShowCodeMessage("COM0082", "Palletization Qty");
			formObj.pkg_lv3_qty.focus();
			return false;
		}
	}
	/*if(formObj.pkg_lv4_unit_cd.value != ""){
		if(formObj.pkg_lv4_qty.value == "" || formObj.pkg_lv4_qty.value == 0){
			ComShowCodeMessage("COM0082", "Level 4 Package Qty");
			formObj.pkg_lv4_qty.focus();
			return false;
		}
	}*/
	//Qty 가 존재할때 Unit 는 필수 항목.
	if(formObj.item_pkgbaseqty.value != "" && formObj.item_pkgbaseqty.value != 0){
		if(formObj.item_pkgunit.value == ""){
			ComShowCodeMessage("COM0082", "Package Unit");
			formObj.item_pkgunit.focus();
			return false;
		}
	}
	if(formObj.pkg_lv3_qty.value != "" && formObj.pkg_lv3_qty.value != 0){
		if(formObj.pkg_lv3_unit_cd.value == ""){
			ComShowCodeMessage("COM0082", "Palletization Unit");
			formObj.pkg_lv3_unit_cd.focus();
			return false;
		}
	}
	/*if(formObj.pkg_lv4_qty.value != "" && formObj.pkg_lv4_qty.value != 0){
		if(formObj.pkg_lv4_unit_cd.value == ""){
			ComShowCodeMessage("COM0082", "Level 4 Package Unit");
			formObj.pkg_lv4_unit_cd.focus();
			return false;
		}
	}*/
	if(formObj.item_remark.value.length > 100){
		ComShowCodeMessage("COM0215", "Remark[100]");
		ComSetFocus(formObj.item_remark);
		return ;
	}
	for(var i=2; i<=sheetObj1.LastRow();i++){
		if(sheetObj1.GetCellValue(i, "Grd01ctrt_no") != "" && sheetObj1.GetCellValue(i, "Grd01ctrt_no") != undefined){		
			if(sheetObj1.GetCellValue(i, "Grd01ibflag") != "D"){
				if(sheetObj1.GetCellValue(i, "Grd01wh_cd") == "" ){
					ComShowCodeMessage("COM0081", "[ Warehouse Info ] Warehouse Code");
					sheetObj1.SelectCell(i, "Grd01wh_cd");
					return;
				}
			}
		}
		//Warehouse Dup 체크
		for(var j=2; j<=sheetObj1.LastRow();j++){
			if(i != j){
				if(sheetObj1.GetCellValue(i, "Grd01wh_cd") == sheetObj1.GetCellValue(j, "Grd01wh_cd")){
					ComShowCodeMessage("COM131302", "Row No : "+(j-1)+" [ Warehouse Info ]");
					sheetObj1.SelectCell(j, "Grd01wh_cd");
					return;
				}
			}
		}
	}
	for(var i=2; i<=sheetObj2.LastRow();i++){
		//Supplier Dup 체크
		for(var j=2; j<=sheetObj2.LastRow();j++){
			if(i != j){
				if(sheetObj2.GetCellValue(i, "Grd02supp_cd") == sheetObj2.GetCellValue(j, "Grd02supp_cd")){
					ComShowCodeMessage("COM131302", "Row No : "+(j-1)+" [ Supplier Info. ]");
					sheetObj2.SelectCell(j, "Grd02supp_cd");
					return;
				}
			}
		}
	}
	
	for(var i=1; i<=sheetObj5.LastRow();i++){
		//Lot4 Dup 체크
		for(var j=1; j<=sheetObj5.LastRow();j++){
			if(i != j){
				if(sheetObj5.GetCellValue(i, "Grd05lot_cd") == sheetObj5.GetCellValue(j, "Grd05lot_cd")){
					ComShowCodeMessage("COM131302", "Row No : "+(j-1)+" [ Lot 4 Property ]");
					sheetObj5.SelectCell(j, "Grd05lot_cd");
					return;
				}
			}
		}
	}
	
	for(var i=1; i<=sheetObj6.LastRow();i++){
		//Lot5 Dup 체크
		for(var j=1; j<=sheetObj6.LastRow();j++){
			if(i != j){
				if(sheetObj6.GetCellValue(i, "Grd06lot_cd") == sheetObj6.GetCellValue(j, "Grd06lot_cd")){
					ComShowCodeMessage("COM131302", "Row No : "+(j-1)+" [ Lot 5 Property ]");
					sheetObj6.SelectCell(j, "Grd06lot_cd");
					return;
				}
			}
		}
	}
	return true;
}
function rcv_len_chk(){
	var formObj=document.form;
	if(formObj.rcv_loc_addr1.value.length > 250){
		ComShowCodeMessage("COM0215", "250");
		formObj.rcv_loc_addr1.value=formObj.rcv_loc_addr1.value.substring(0,250);
	}
}
function rmk_len_chk(){
	var formObj=document.form;
	if(formObj.remark.value.length > 1000){
		ComShowCodeMessage("COM0215", "1000");
		formObj.remark.value=formObj.remark.value.substring(0,1000);
	}
}

//Contract No 입력시 걸려있는 optional Field를 가져온다.
function getOptField(){
	var formObj=document.form;
	formObj.f_cmd.value = SEARCH;
	docObjects[6].DoSearch('./ITEMMgmtGS.clt', FormQueryString(formObj));
}
function getCtrtInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.in_ctrt_no.value="";
		form.in_ctrt_nm.value="";
	}else{
		searchCtrtInfo(formObj, ComGetObjValue(formObj.in_ctrt_no), "in_ctrt_no");
	}
}
function searchCtrtInfo (form, in_ctrt_no, col_nm){
	var ord_tp_lvl1_cd="\'T\'";
	var ord_tp_lvl2_cd="\'S\',\'SA\'";
	
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+in_ctrt_no, './GateServlet.gsl');
}
function resultCtrtInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.in_ctrt_nm.value=rtnArr[0];
			}
			else{
				formObj.in_ctrt_no.value="";
				formObj.in_ctrt_nm.value="";	
			}
		}
		else{
			formObj.in_ctrt_no.value="";
			formObj.in_ctrt_nm.value="";	
		}
	}
}
function getCtrtInfo2(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.ctrt_no.value="";
		form.ctrt_nm.value="";
	}else{
		searchCtrtInfo2(formObj, ComGetObjValue(formObj.ctrt_no), "ctrt_no");
		
		//#3223 [CLA V460 TEST] WMS STORAGE CALCUATION METHOD
		calMethod_check();
	}
}
function searchCtrtInfo2 (form, ctrt_no, col_nm){
	var ord_tp_lvl1_cd="\'T\'";
	var ord_tp_lvl2_cd="\'S\',\'SA\'";
	
	ajaxSendPost(resultCtrtInfo2, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+ctrt_no, './GateServlet.gsl');
}
function resultCtrtInfo2(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.ctrt_nm.value=rtnArr[0];
				//#3223 [CLA V460 TEST] WMS STORAGE CALCUATION METHOD
				formObj.cal_method_cd.value=rtnArr[10];
			}
			else{
				formObj.ctrt_no.value="";
				formObj.ctrt_nm.value="";	
			}
		}
		else{
			formObj.ctrt_no.value="";
			formObj.ctrt_nm.value="";	
		}
	}
}
function getHtsInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.hts_no.value="";
		form.hts_nm.value="";
	}else{
		searchHtsInfo(formObj, ComGetObjValue(formObj.hts_no), "hts_no");
	}
}
function searchHtsInfo (form, hts_no, col_nm){
	ajaxSendPost(resultHTSInfo,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=commodity&s_code='+hts_no, './GateServlet.gsl');
}
function resultHTSInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(rtnArr[0] != ""){
				formObj.hts_no.value=masterVals[0];	
				formObj.hts_nm.value=masterVals[3];	
			}
			else{
				formObj.hts_no.value="";
				formObj.hts_nm.value="";
			}
		}
		else{
			formObj.hts_no.value="";
			formObj.hts_nm.value="";
		}
	}
}
function getPkgUnit(obj){
	var formObj=document.form;
	if(obj.value == ""){
		if(obj.name == "pkg_lv1_unit_cd"){
			form.pkg_lv1_unit_cd.value="";
//			form.pkg_lv1_unit_nm.value="";
		}else if(obj.name == "item_pkgunit"){
			form.item_pkgunit.value="";
//			form.item_pkgunit_nm.value="";
		}else if(obj.name == "pkg_lv3_unit_cd"){
			form.pkg_lv3_unit_cd.value="";
//			form.pkg_lv3_unit_nm.value="";
		}/*else if(obj.name == "pkg_lv4_unit_cd"){
			form.pkg_lv4_unit_cd.value="";
			form.pkg_lv4_unit_nm.value="";
		}*/
	}else{
		searchPkgUnit(formObj, obj.value, obj.name);
	}
}
function searchPkgUnit (form, item_pkgunit, col_nm){
	ajaxSendPost(resultPkgUnitInfo, col_nm,'&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+item_pkgunit, './GateServlet.gsl');
}
function resultPkgUnitInfo(reqVal, col_nm){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				if(col_nm == "pkg_lv1_unit_cd"){
//					formObj.pkg_lv1_unit_nm.value=rtnArr[1];
				}else if(col_nm == "item_pkgunit"){
//					formObj.item_pkgunit_nm.value=rtnArr[1];
				}else if(col_nm == "pkg_lv3_unit_cd"){
//					formObj.pkg_lv3_unit_nm.value=rtnArr[1];
				}/*else if(col_nm == "pkg_lv4_unit_cd"){
					formObj.pkg_lv4_unit_nm.value=rtnArr[1];
				}*/
			}
			else{
				if(col_nm == "pkg_lv1_unit_cd"){
					form.pkg_lv1_unit_cd.value="";
//					form.pkg_lv1_unit_nm.value="";
				}else if(col_nm == "item_pkgunit"){
					form.item_pkgunit.value="";
//					form.item_pkgunit_nm.value="";
				}else if(col_nm == "pkg_lv3_unit_cd"){
					form.pkg_lv3_unit_cd.value="";
//					form.pkg_lv3_unit_nm.value="";
				}/*else if(col_nm == "pkg_lv4_unit_cd"){
					form.pkg_lv4_unit_cd.value="";
					form.pkg_lv4_unit_nm.value="";
				}*/
			}
		}
		else{
			if(col_nm == "pkg_lv1_unit_cd"){
				form.pkg_lv1_unit_cd.value="";
//				form.pkg_lv1_unit_nm.value="";
			}else if(col_nm == "item_pkgunit"){
				form.item_pkgunit.value="";
//				form.item_pkgunit_nm.value="";
			}else if(col_nm == "pkg_lv3_unit_cd"){
				form.pkg_lv3_unit_cd.value="";
//				form.pkg_lv3_unit_nm.value="";
			}/*else if(col_nm == "pkg_lv4_unit_cd"){
				form.pkg_lv4_unit_cd.value="";
				form.pkg_lv4_unit_nm.value="";
			}*/
		}
	}
}
function getCurrInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		if(obj.name == "adv_curr_cd"){
			form.adv_curr_cd.value="";
		}else if(obj.name == "nego_curr_cd"){
			form.nego_curr_cd.value="";
		}else if(obj.name == "unit_curr_cd"){
			form.unit_curr_cd.value="";
		}
	}else{
		searchCurrInfo(formObj, obj.value, obj.name);
	}
}
function searchCurrInfo (form, curr, col_nm){
	ajaxSendPost(resultCurrInfo, col_nm,'&goWhere=aj&bcKey=searchCommonCodeInfo&grp_cd=C010&code_cd='+curr, './GateServlet.gsl');
}
function resultCurrInfo(reqVal, col_nm){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				if(col_nm == "adv_curr_cd"){
					formObj.adv_curr_cd.value=rtnArr[0];
				}else if(col_nm == "nego_curr_cd"){
					formObj.nego_curr_cd.value=rtnArr[0];
				}else if(col_nm == "unit_curr_cd"){
					formObj.unit_curr_cd.value=rtnArr[0];
				}
			}
			else{
				if(col_nm == "adv_curr_cd"){
					form.adv_curr_cd.value="";
				}else if(col_nm == "nego_curr_cd"){
					form.nego_curr_cd.value="";
				}else if(col_nm == "unit_curr_cd"){
					form.unit_curr_cd.value="";
				}
				return;
			}
		}
		else{
			if(col_nm == "adv_curr_cd"){
				form.adv_curr_cd.value="";
			}else if(col_nm == "nego_curr_cd"){
				form.nego_curr_cd.value="";
			}else if(col_nm == "unit_curr_cd"){
				form.unit_curr_cd.value="";
			}
			return;
		}
	}
}
//Customer Item ID 중복체크를 한다.
function checkCustItem(obj, searchCnt){
	var formObj=document.form;
	if(obj.value == ""){
	}else{
		//중복체크시 기존 item_cd 와 변경시에만 중복체크를 한다.
		if(formObj.old_item_cd.value != formObj.item_cd.value){
			if(formObj.ctrt_no.value == ""){
				alert("Please enter Contract No.");
				formObj.item_cd.value="";
				formObj.item_nm.value="";
				formObj.ctrt_no.focus();
			}else{
				if(searchCnt == 0){
					searchCustItemDup(formObj, ComGetObjValue(formObj.item_cd), "item_cd");
				}
			}
		}
	}
}
function searchCustItemDup (form, item_cd, col_nm){
	var formObj=document.form;
 	var sXml=docObjects[0].GetSearchData("./ITEMMgmt_2GS.clt", "f_cmd="+SEARCH02+"&ctrt_no="+formObj.ctrt_no.value+"&item_cd="+encodeURIComponent(item_cd));
	if( col_nm == "item_cd"){ 
		var xmlDoc = $.parseXML(sXml);
		var $xml = $(xmlDoc);
		if($xml.find( "result").text() == 'OK'){
		}else{
			ComShowMessage("[" + item_cd.toUpperCase() + "] is duplicated.");
			formObj.item_cd.value=formObj.old_item_cd.value;
			formObj.item_cd.focus();
			if(formObj.item_cd.value == ""){
				formObj.ctrt_no.focus();
				formObj.item_cd.focus();
			}else{
				formObj.item_cd.select();
			}
			searchCnt += 1;
			return false;
		}
	}
}
function searchCtrtPop(obj){
	var formObj=document.form;
	if(obj.value.length >= 3){
		var formObj=document.form;
		var params = "ContractRoutePopup.clt?ctrt_no="+formObj.in_ctrt_no.value+"&ctrt_nm="+formObj.in_ctrt_nm.value;
	    callBackFunc = "setCtrtNoInfo";
	    modal_center_open(params, callBackFunc, 900, 580,"yes");
	}
}
function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
}
function btn_link_ctrt(){
	var formObj=document.form;
	if(!ComIsEmpty(formObj.ctrt_no)){
		var sUrl="./CtrtMgmt.clt?ctrt_no="+formObj.ctrt_no.value;
		parent.mkNewFrame('Contract Management', sUrl, "CtrtMgmt_" + formObj.ctrt_no.value);
		
	}
}
function btn_File_Path(){
	var formObj=document.form;
	ComSetObjValue(formObj.file_path, "");
    var files = upload1.GetList();
    for( var i = 0; i < files.length; i++) {
        upload1.RemoveOneFile(files[i].GetSerialNo());
    }
    upload1.AddFile();
}
function btn_File_Upload(){
	var formObj=document.form;
	//File Path 체크
	if(formObj.logo_rectangle.value == ""){
		ComShowCodeMessage("COM0119");
		return ;
	}
	if(ComIsEmpty(formObj.in_item_cd.value)){
		ComShowCodeMessage("COM0221");
		formObj.in_item_cd.focus();
		return;
	}	
	if(ComIsEmpty(formObj.in_ctrt_no.value)){
		ComShowCodeMessage("COM0222");
		formObj.in_ctrt_no.focus();
		return;
	}
	formObj.f_cmd.value=ADD;
	getParam();
	submitForm();
}

function ClearHTML() {
    var ibupForm = document.getElementById('ibup_form');
    ibupForm.action = ibupForm.action.replace('&FileUploadModule=ITM', '');
}

function getParam() {
    var formObj = document.form;
    var sParam  = "ctrt_no="+formObj.ctrt_no.value;
     	 sParam += "&item_sys_no="+formObj.item_sys_no.value;
    return sParam;
}

function btn_File_Delete(){
	var formObj=document.form;
	var sheetObj=docObjects[5];
	var selRow=sheetObj.GetSelectRow();
	var chkCnt=0;
	if(sheetObj.RowCount() <= 0){
		ComShowCodeMessage("COM12113", "delete row");
		return;
	}else{
		var findcheck = sheetObj.FindCheckedRow("Grd03del_chk",1);
		if (findcheck == "" || findcheck == null || findcheck == -1){
			ComShowCodeMessage("COM12113", "delete row");
			return;
		}
	}
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "Grd03del_chk") == "1"){
			chkCnt += 1;
		}
	}
	if(chkCnt == 0){
		ComShowCodeMessage("COM0250");
		return;
	}
	if(ComShowCodeConfirm("COM0053")){
		var sParam=sheetObj.GetSaveString();
		if( sParam == ""){ return;}
 		var sXml = sheetObj.GetSearchData('./ITEMMgmt_1GS.clt', sParam+"&f_cmd=" + MODIFY02 + "&ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_sys_no="+ComGetObjValue(formObj.item_sys_no));
 		
 		var strtIndxSheet4 = sXml.indexOf("<SHEET4>");
		var endIndxSheet4 = sXml.indexOf("</SHEET4>") + "</SHEET4>".length;
		
		var sheet4Data = sXml.substring(strtIndxSheet4,endIndxSheet4);
		sheetObj.LoadSearchData(sheet4Data.replaceAll('SHEET4', 'SHEET'));
		
		ComShowCodeMessage("COM12201");
	}
}
function submitForm(){
	
	
	var formObj=document.form;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	var formData;
	if(navigator.appName.indexOf("Microsoft") != -1) {
		if(formObj.f_cmd.value==SEARCH){
			formObj.action = "./ITMgmt.clt?item_cd="+formObj.in_item_cd.value+"&uploadfile=T&ctrt_no="+formObj.in_ctrt_no.value+"&ctrt_nm="+formObj.in_ctrt_nm.value;
			formObj.submit();
			return;
		}else{
			formObj.action = "./ITMgmt.clt?item_cd="+formObj.in_item_cd.value+"&uploadfile=T&ctrt_no="+formObj.in_ctrt_no.value+"&ctrt_nm="+formObj.in_ctrt_nm.value;
			formObj.submit();
			return;
		}
	} else {
		formData = new FormData();
		$.each($("form").find("input[type='file']"), function(i, tag) {
	        $.each($(tag)[0].files, function(i, file) {
	            formData.append(tag.name, file);
	        });
	    });
	    var params = $("form").serializeArray();
	    $.each(params, function (i, val) {
	        formData.append(val.name, val.value);
	    });
	}
    
	$.ajax({
		   type: "POST",
		   url: "./ITEMMgmtAJ.clt",
		   dataType: 'xml',
		   data: formData,
		   contentType: false,
		   async: false,
	       processData: false,
		   success: function(data){
			   //MDM_MCM_0050 (S)
			   /*setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());

			   getParam();
			   setupPage();
			   
			   doHideProcess();
			   
			   formObj.logo_square_flg.value = "N";
			   formObj.logo_square_flg.checked = false;
			   
			   if (formObj.logo_square_yn.value != "") {
				   getObj('logo_square_id').style.display="inline";
				   formObj.logo_square_flg.style.display="inline";
				   formObj.logo_square_chk.style.display="inline";
				   
				   $("#logo_square_filenm").html($('logo_square_filenm',data).text());
				   formObj.logo_square.value = "";
			   } else {
				   getObj('logo_square_id').style.display="none";
				   formObj.logo_square_flg.style.display="none";
				   formObj.logo_square_chk.style.display="none";
			   }
			   
			   formObj.logo_rec_flg.value = "N";*/
			   formObj.logo_rectangle.value = "";
			   formObj.logo_rec_flg.checked = false;
			   imSearch();
		   },
		   error: function(){
			   doHideProcess();
		   }
		 });
}
/*function setStandardQty(){
    var formObj=document.form;
    if(ComIsEmpty(formObj.pkg_pl_std_qty) || Number(formObj.pkg_pl_std_qty.value) == 0){
        formObj.pkg_pl_std_qty.value=formObj.pkg_lv4_qty.value;
    }
}*/
function loadDataCombo(){
	var obj = "";
	var option =  "";
	
	var code = "";
	var name = "";
	
	//pkg_lv1_put_tp_cd
	
	/*obj = document.getElementById("pkg_lv1_put_tp_cd");
	option =  document.createElement("option");
	
	code = pkg_lv1_put_tp_cdCode.split('|');
	name = pkg_lv1_put_tp_cdText.split('|');
	
	for(var i = 0; i < code.length; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(name[i]);
		option.value = htmlDecode(code[i]);
		
		obj.add(option);
	}
	obj.value = "N";
	obj.disabled = false;
	//pkg_lv2_put_tp_cd
	
	obj = document.getElementById("pkg_lv2_put_tp_cd");
	option =  document.createElement("option");
	
	code = pkg_lv2_put_tp_cdCode.split('|');
	name = pkg_lv2_put_tp_cdText.split('|');
	
	for(var i = 0; i < code.length; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(name[i]);
		option.value = htmlDecode(code[i]);
		
		obj.add(option);
	}
	obj.value = "N";
	obj.disabled = false;
	//pkg_lv3_put_tp_cd
	
	obj = document.getElementById("pkg_lv3_put_tp_cd");
	option =  document.createElement("option");
	
	code = pkg_lv3_put_tp_cdCode.split('|');
	name = pkg_lv3_put_tp_cdText.split('|');
	
	for(var i = 0; i < code.length; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(name[i]);
		option.value = htmlDecode(code[i]);
		
		obj.add(option);
	}
	obj.value = "N";
	obj.disabled = false;
	//pkg_lv4_put_tp_cd
	
	obj = document.getElementById("pkg_lv4_put_tp_cd");
	option =  document.createElement("option");
	
	code = pkg_lv4_put_tp_cdCode.split('|');
	name = pkg_lv4_put_tp_cdText.split('|');
	
	for(var i = 0; i < code.length; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(name[i]);
		option.value = htmlDecode(code[i]);
		
		obj.add(option);
	}
	obj.value = "N";
	obj.disabled = false;*/
}
function ComRowHideDelete(sheetObj, col, isMsg) {
	if (isMsg == undefined || isMsg == null)
		isMsg = true;
	var org_col = col;
	// 컬럼Index가 아닌 경우 SaveName인 경우 -> 컬럼Index를 가져온다.
	col = ComIsNumber(col) ? ComParseInt(col) : sheetObj.SaveNameCol(col);

	// 컬럼 인자의 유효성 확인하기
	if (col < 0 || col > sheetObj.LastCol()) {
		ComShowMessage("[ComRowHideDelete] '" + sheetObj.id + "'의 '" + org_col
				+ "' 컬럼은 존재하지 않습니다.");
		return -1;
	}

	// 체크박스에 체크된 행 전체를 문자열로 가져온다. 결과 : "1|3|5"
	var sRow = sheetObj.FindCheckedRow(col);
	if (sRow == "") {
		if (isMsg)ComShowCodeMessage("COM12189");
		return 0;
	}

	// 가져온 행을 배열로 만들기
	var arrRow = sRow.split("|"); // 결과 : "1|3|5|"

	sheetObj.SetRedrawSum(0); // 합계 계산하지 않기, dtAutoSumEx가 있는 경우를 대비

	// 기준컬럼의 DataType이 dtDelCheck이면 그냥 숨기기만하고, dtDelCheck가 아닌 경우만 숨기고, 트랜잭션 바꾼다.
	if (sheetObj.GetCellProperty(0, col, "Type") == "DelCheck") {
		// 역순으로 삭제 처리하기(중간에 입력상태의 행이 있을수도 있으므로 반드시 역순으로 처리한다.)
		for ( var idx = arrRow.length-1; idx >= 0; idx--) {
			var row = arrRow[idx];
			sheetObj.SetRowHidden(row, 1); // 2.행 숨기기
		}
	} else {
		// 역순으로 삭제 처리하기(중간에 입력상태의 행이 있을수도 있으므로 반드시 역순으로 처리한다.)
		for ( var idx = arrRow.length - 1; idx >= 0; idx--) {
			var row = arrRow[idx];
			sheetObj.SetCellValue(row, col, 0, 0); // 1.체크박스 없애기 (체크된데이터만 다른 처리
													// 하는 경우도 있으므로)
			sheetObj.SetRowHidden(row, 1); // 2.행 숨기기
			if( sheetObj.GetRowStatus(row) == "I"){
				sheetObj.RowDelete(row , 0);
			} else {
				sheetObj.SetRowStatus(row, "D"); // 3.트랜잭션 상태 "삭제"로 만들기
			}
		}
	}

	sheetObj.SetRedrawSum(1); // 합계 계산하기

	return arrRow.length;
}

function checkNumFormat(obj, format) {

    var srcNumber = obj.value.replace(/\-/g,"");
    srcNumber = srcNumber.replace(/\,/g,"");

    if(srcNumber == '') return;

    if(isNaN(srcNumber)) {
        alert("Check invalid data! ");
        obj.value = "0";
        obj.focus();
        return;
    }
    dotInx     = format.indexOf('.');
    len        = format.length;

    if (dotInx > 0) decimalLen = len - (dotInx + 1);
    else decimalLen = -1;
    numLen     = len - (decimalLen + 1);
    temp        = srcNumber
    len1        = temp.length;
    dotInx1     = temp.indexOf('.');
    
    //소수점이 유무에 의한 길이 설정
    if(dotInx1 == -1) {
        decimalLen1 = -1;
        numLen1     = len1;
    } else {
        decimalLen1 = len1 - (dotInx1 + 1);
        numLen1     = len1 - (decimalLen1 + 1);
    }
    
    var floatMax = len - (dotInx + 1);
    var decimalMax = len - (floatMax + 1);
     
    if(numLen1 > numLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        obj.value = "0";
        obj.focus();
        return false;
    } else if (decimalLen1 > decimalLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        obj.value = "0";
        obj.focus();
        return false;
    }
    return true;
}

function checkNum(obj, format) {

    var srcNumber = obj.value.replace(/\-/g,"");
    var srcNumber = obj.value.replace(/\,/g,"");

    if(srcNumber == '') return;

    if(isNaN(srcNumber)) {
        alert("Check invalid data! ");
        obj.value = "";
        obj.focus();
        return;
    }
    var len = srcNumber.length;
    var floatMax = "0";
    var decimalMax = format.length;
     
    if(len > decimalMax)
    	{
    	 alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
         obj.value = "";
         obj.focus();
         return false;
    	}
       
    return true;
}

function btn_ctrt_cust_cd(){
	 var formObj=document.form;
	rtnary=new Array(3);
	rtnary[0]=sheet3.GetCellValue(sheet3.GetSelectRow(),"Grd02supp_cd");
	rtnary[1]=sheet3.GetCellValue(sheet3.GetSelectRow(),"Grd02supp_nm");
	rtnary[2]=window;
	callBackFunc = "CT_POPLIST";
	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
}

function CT_POPLIST(rtnVal){
	var formObj=document.form;
	   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   sheet3.SetCellText(sheet3.GetSelectRow(), "Grd02supp_cd",rtnValAry[0]);
		   sheet3.SetCellValue(sheet3.GetSelectRow(), "Grd02supp_nm",rtnValAry[2]);
	   }             
	}

function chkCommaObj(){
	var formObj=document.form;
	chkComma(formObj.lv1_cbm,10,3);
	chkComma(formObj.lv1_cbf,10,3);
	chkComma(formObj.lv1_grs_kgs,10,3);
	chkComma(formObj.lv1_grs_lbs,10,3);
	chkComma(formObj.lv1_net_kgs,10,3);
	chkComma(formObj.lv1_net_lbs,10,3);
	chkComma(formObj.item_cbm,10,3);
	chkComma(formObj.item_cbf,10,3);
	chkComma(formObj.item_kgs,10,3);
	chkComma(formObj.item_grs_lbs,10,3);
	chkComma(formObj.item_net_wgt,10,3);
	chkComma(formObj.item_net_lbs,10,3);
	chkComma(formObj.lv3_cbm,10,3);
	chkComma(formObj.lv3_cbf,10,3);
	chkComma(formObj.lv3_grs_kgs,10,3);
	chkComma(formObj.lv3_grs_lbs,10,3);
	chkComma(formObj.lv3_net_kgs,10,3);
	chkComma(formObj.lv3_net_lbs,10,3);
//	chkComma(formObj.adv_price,10,2);
	chkComma(formObj.safe_stc_qty,15,0);
//	chkComma(formObj.unit_price,10,2);
//	chkComma(formObj.pkg_pl_over_wgt,2,1);
//	convertNumber(formObj.pkg_lv4_qty);
//	convertNumber(formObj.pkg_pl_std_qty);
	convertNumber(formObj.pkg_lv1_qty);
	convertNumber(formObj.item_pkgbaseqty);
	convertNumber(formObj.pkg_lv3_qty);
}

function convertNumber(obj){
	var intoVal=obj.value;
	intoVal = intoVal.replace(/,/g,'');
	var leng=intoVal.length;
	var result=new Array();
	var cut="";
	var i=0;
	if (leng > 3){
		while(leng>3){
			result[i] = intoVal.substring(leng-3,leng);
			leng = leng -3;
			i++;
		}
		result[i] = intoVal.substring(0,leng);
		for (var j=result.length - 1 ; j >= 0 ; j--){
			cut += result[j] + ",";
		}
		cut = cut.substring(0,cut.length-1);
		obj.value = cut;
	}else
		obj.value = intoVal;
}

function autoCalculator(Obj) {
	if(Obj.value==""){
		Obj.value = "0.00000";
		return;
	}

	var value = parseFloat(Obj.value);
	var form = document.form;
	switch(Obj.name){
		//level 1
		case 'lv1_grs_kgs':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.lv1_grs_lbs.value = roundXL(value * CNVT_CNST_KG_LB, 3);
			form.lv1_grs_lbs.value = unitConvertValue("KG_LB", value);
			chkComma(form.lv1_grs_lbs,10,WMS_WGT_POINT_COUNT);
			break;
		case 'lv1_grs_lbs':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.lv1_grs_kgs.value = roundXL(value / CNVT_CNST_KG_LB, 3);
			form.lv1_grs_kgs.value = unitConvertValue("LB_KG", value);
			chkComma(form.lv1_grs_kgs,10,WMS_WGT_POINT_COUNT);
			break;
		case 'lv1_cbm':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.lv1_cbf.value = roundXL(value * WMS_CNVT_CNST_CBM_CFT, WMS_CBM_POINT_COUNT);
			form.lv1_cbf.value = unitConvertValue("CBM_CBF", value);
			chkComma(form.lv1_cbf,10,WMS_CBM_POINT_COUNT);
			break;
		case 'lv1_cbf':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.lv1_cbm.value = roundXL(value / WMS_CNVT_CNST_CBM_CFT, WMS_CBM_POINT_COUNT);
			form.lv1_cbm.value = unitConvertValue("CBF_CBM", value);
			chkComma(form.lv1_cbm,10,WMS_CBM_POINT_COUNT);
			break;
		case 'lv1_net_kgs':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.lv1_net_lbs.value = roundXL(value * CNVT_CNST_KG_LB, 3);
			form.lv1_net_lbs.value = unitConvertValue("KG_LB", value);
			chkComma(form.lv1_net_lbs,10,WMS_WGT_POINT_COUNT);
			break;
		case 'lv1_net_lbs':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.lv1_net_kgs.value = roundXL(value / CNVT_CNST_KG_LB, 3);
			form.lv1_net_kgs.value = unitConvertValue("LB_KG", value);
			chkComma(form.lv1_net_kgs,10,WMS_WGT_POINT_COUNT);
			break;
		case 'lv1_width':
		case 'lv1_length':
		case 'lv1_height':
			var length=form.lv1_length.value ? form.lv1_length.value : 0;
			var width=form.lv1_width.value ? form.lv1_width.value : 0;
			var height=form.lv1_height.value ? form.lv1_height.value : 0;
			var pcs = 1;//form.pkg_lv1_qty.value ? form.pkg_lv1_qty.value : 0;
			var cbm=0;
			var kg=0;
			var sumCbm=0;
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//kg=roundXL(length * width * height * pcs * wgt_std_chg * wgt_std_chg * wgt_std_chg / 6000, 3);
			//cbm=roundXL(length * width * height * pcs * ut_std_chg * ut_std_chg * ut_std_chg, WMS_CBM_POINT_COUNT);
			if($('#s_sh_ut_tp_cd1').is(':checked')) {
				cbm = unitConvertValue("CBCM_CBM", length * width * height * pcs);
			} else if($('#s_sh_ut_tp_cd2').is(':checked')) {
				cbm = unitConvertValue("CBINCH_CBM", length * width * height * pcs);
			}
			kg = unitConvertValue("CBM_WGT", cbm);
			form.lv1_grs_kgs.value = kg;
			//form.lv1_grs_lbs.value = roundXL(kg * CNVT_CNST_KG_LB, 3);
			form.lv1_grs_lbs.value = unitConvertValue("KG_LB", kg);
			form.lv1_net_kgs.value = kg;
			//form.lv1_net_lbs.value = roundXL(kg * CNVT_CNST_KG_LB, 3);
			form.lv1_net_lbs.value = unitConvertValue("KG_LB", kg);
			form.lv1_cbm.value = cbm;
			//form.lv1_cbf.value = roundXL(cbm * CNVT_CNST_CBM_CFT, WMS_CBM_POINT_COUNT);
			form.lv1_cbf.value = unitConvertValue("CBM_CBF", cbm);
			chkComma(form.lv1_grs_kgs,10,WMS_WGT_POINT_COUNT);
			chkComma(form.lv1_grs_lbs,10,WMS_WGT_POINT_COUNT);
			chkComma(form.lv1_net_kgs,10,WMS_WGT_POINT_COUNT);
			chkComma(form.lv1_net_lbs,10,WMS_WGT_POINT_COUNT);
			chkComma(form.lv1_cbm,10,WMS_CBM_POINT_COUNT);
			chkComma(form.lv1_cbf,10,WMS_CBM_POINT_COUNT);
			break;
		//level 2
		case 'item_cbm':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.item_cbf.value = roundXL(value * WMS_CNVT_CNST_CBM_CFT, WMS_CBM_POINT_COUNT);
			form.item_cbf.value = unitConvertValue("CBM_CBF", value);
			chkComma(form.item_cbf,10,WMS_CBM_POINT_COUNT);
			break;
		case 'item_cbf':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.item_cbm.value = roundXL(value / WMS_CNVT_CNST_CBM_CFT, WMS_CBM_POINT_COUNT);
			form.item_cbm.value = unitConvertValue("CBF_CBM", value);
			chkComma(form.item_cbm,10,WMS_CBM_POINT_COUNT);
			break;
		case 'item_kgs':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.item_grs_lbs.value = roundXL(value * CNVT_CNST_KG_LB, 3);
			form.item_grs_lbs.value = unitConvertValue("KG_LB", value);
			chkComma(form.item_grs_lbs,10,WMS_WGT_POINT_COUNT);
			break;
		case 'item_grs_lbs':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.item_kgs.value = roundXL(value / CNVT_CNST_KG_LB, 3);
			form.item_kgs.value = unitConvertValue("LB_KG", value);
			chkComma(form.item_kgs,10,WMS_WGT_POINT_COUNT);
			break;
		case 'item_net_wgt':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.item_net_lbs.value = roundXL(value * CNVT_CNST_KG_LB, 3);
			form.item_net_lbs.value = unitConvertValue("KG_LB", value);
			chkComma(form.item_net_lbs,10,WMS_WGT_POINT_COUNT);
			break;
		case 'item_net_lbs':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.item_net_wgt.value = roundXL(value / CNVT_CNST_KG_LB, 3);
			form.item_net_wgt.value = unitConvertValue("LB_KG", value);
			chkComma(form.item_net_wgt,10,WMS_WGT_POINT_COUNT);
			break;
		case 'item_width':
		case 'item_height':
		case 'item_length':
			var length=form.item_length.value ? form.item_length.value : 0;
			var width=form.item_width.value ? form.item_width.value : 0;
			var height=form.item_height.value ? form.item_height.value : 0;
			var pcs= 1;//form.item_pkgbaseqty.value ? form.item_pkgbaseqty.value : 0;
			var cbm=0;
			var kg=0;
			var sumCbm=0;

			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//kg=roundXL(length * width * height * pcs * wgt_std_chg * wgt_std_chg * wgt_std_chg / 6000, 3);
			//cbm=roundXL(length * width * height * pcs * ut_std_chg * ut_std_chg * ut_std_chg, WMS_CBM_POINT_COUNT);
			if($('#s_sh_ut_tp_cd1').is(':checked')) {
				cbm = unitConvertValue("CBCM_CBM", length * width * height * pcs);
			} else if($('#s_sh_ut_tp_cd2').is(':checked')) {
				cbm = unitConvertValue("CBINCH_CBM", length * width * height * pcs);
			}
			kg = unitConvertValue("CBM_WGT", cbm);
			form.item_kgs.value = kg;
			//form.item_grs_lbs.value = roundXL(kg * CNVT_CNST_KG_LB, 3);
			form.item_grs_lbs.value = unitConvertValue("KG_LB", kg);
			form.item_net_wgt.value = kg;
			//form.item_net_lbs.value = roundXL(kg * CNVT_CNST_KG_LB, 3);
			form.item_net_lbs.value = unitConvertValue("KG_LB", kg);
			form.item_cbm.value = cbm;
			//form.item_cbf.value = roundXL(cbm * WMS_CNVT_CNST_CBM_CFT, WMS_CBM_POINT_COUNT);
			form.item_cbf.value = unitConvertValue("CBM_CBF", cbm);

			chkComma(form.item_kgs,10,WMS_WGT_POINT_COUNT);
			chkComma(form.item_grs_lbs,10,WMS_WGT_POINT_COUNT);
			chkComma(form.item_net_wgt,10,WMS_WGT_POINT_COUNT);
			chkComma(form.item_net_lbs,10,WMS_WGT_POINT_COUNT);
			chkComma(form.item_cbm,10,WMS_CBM_POINT_COUNT);
			chkComma(form.item_cbf,10,WMS_CBM_POINT_COUNT);
			break;

		//level 3
		case 'lv3_cbm':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.lv3_cbf.value = roundXL(value * WMS_CNVT_CNST_CBM_CFT, WMS_CBM_POINT_COUNT);
			form.lv3_cbf.value = unitConvertValue("CBM_CBF", value);
			chkComma(form.lv3_cbf,10,WMS_CBM_POINT_COUNT);
			break;
		case 'lv3_cbf':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.lv3_cbm.value = roundXL(value / WMS_CNVT_CNST_CBM_CFT, WMS_CBM_POINT_COUNT);
			form.lv3_cbm.value = unitConvertValue("CBF_CBM", value);
			chkComma(form.lv3_cbm,10,WMS_CBM_POINT_COUNT);
			break;
		case 'lv3_grs_kgs':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.lv3_grs_lbs.value = roundXL(value * CNVT_CNST_KG_LB, 3);
			form.lv3_grs_lbs.value = unitConvertValue("KG_LB", value);
			chkComma(form.lv3_grs_lbs,10,WMS_WGT_POINT_COUNT);
			break;
		case 'lv3_grs_lbs':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.lv3_grs_kgs.value = roundXL(value / CNVT_CNST_KG_LB, 3);
			form.lv3_grs_kgs.value = unitConvertValue("LB_KG", value);
			chkComma(form.lv3_grs_kgs,10,WMS_WGT_POINT_COUNT);
			break;
		case 'lv3_net_kgs':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.lv3_net_lbs.value = roundXL(value * CNVT_CNST_KG_LB, 3);
			form.lv3_net_lbs.value = unitConvertValue("KG_LB", value);
			chkComma(form.lv3_net_lbs,10,WMS_WGT_POINT_COUNT);
			break;
		case 'lv3_net_lbs':
			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//form.lv3_net_kgs.value = roundXL(value / CNVT_CNST_KG_LB, 3);
			form.lv3_net_kgs.value = unitConvertValue("LB_KG", value);
			chkComma(form.lv3_net_kgs,10,WMS_WGT_POINT_COUNT);
			break;
		case 'lv3_width':
		case 'lv3_length':
		case 'lv3_height':
			var length=form.lv3_length.value ? form.lv3_length.value : 0;
			var width=form.lv3_width.value ? form.lv3_width.value : 0;
			var height=form.lv3_height.value ? form.lv3_height.value : 0;
			var pcs= 1; //form.pkg_lv3_qty.value ? form.pkg_lv3_qty.value : 0;
			var cbm=0;
			var kg=0;
			var sumCbm=0;

			//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			//kg=roundXL(length * width * height * pcs * wgt_std_chg * wgt_std_chg * wgt_std_chg / 6000, 3);
			//cbm=roundXL(length * width * height * pcs * ut_std_chg * ut_std_chg * ut_std_chg, WMS_CBM_POINT_COUNT);
			if($('#s_sh_ut_tp_cd1').is(':checked')) {
				cbm = unitConvertValue("CBCM_CBM", length * width * height * pcs);
			} else if($('#s_sh_ut_tp_cd2').is(':checked')) {
				cbm = unitConvertValue("CBINCH_CBM", length * width * height * pcs);
			}
			kg = unitConvertValue("CBM_WGT", cbm);

			form.lv3_grs_kgs.value = kg;
			//form.lv3_grs_lbs.value = roundXL(kg * CNVT_CNST_KG_LB, 3);
			form.lv3_grs_lbs.value = unitConvertValue("KG_LB", kg);
			form.lv3_net_kgs.value = kg;
			//form.lv3_net_lbs.value = roundXL(kg * CNVT_CNST_KG_LB, 3);
			form.lv3_net_lbs.value = unitConvertValue("KG_LB", kg);
			form.lv3_cbm.value = cbm;
			//form.lv3_cbf.value = roundXL(cbm * WMS_CNVT_CNST_CBM_CFT, WMS_CBM_POINT_COUNT);
			form.lv3_cbf.value = unitConvertValue("CBM_CBF", cbm);
			chkComma(form.lv3_grs_kgs,10,WMS_WGT_POINT_COUNT);
			chkComma(form.lv3_grs_lbs,10,WMS_WGT_POINT_COUNT);
			chkComma(form.lv3_net_kgs,10,WMS_WGT_POINT_COUNT);
			chkComma(form.lv3_net_lbs,10,WMS_WGT_POINT_COUNT);
			chkComma(form.lv3_cbm,10,WMS_CBM_POINT_COUNT);
			chkComma(form.lv3_cbf,10,WMS_CBM_POINT_COUNT);
			break;
	}
}

/**
 * Template Download
 */
function excel_Download() {	
	var fileName="WH_ITEM_ENTRY_TEMPLATE.xls";
	document.frm1.file_name.value= fileName;
	document.frm1.submit();
}

/*
 * Excel Upload
 */
function excel_Upload() {	
	var formObj=document.form;
	var ctrt_no=formObj.ctrt_no.value;	
   	var sUrl="./WHItemExcelUploadPopup.clt?display=none&ctrt_no="+ctrt_no;
   	callBackFunc = "setInfoBasicItem_Insert";
	modal_center_open(sUrl, callBackFunc, 900,460,"yes");
}

/**
 * Excel Upload 리턴 데이터
 * @param aryPopupData
 */
function setInfoBasicItem_Insert(rtnVal) {
	var sheetObj=docObjects[4];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if (rtnValAry[0] != -1){
			formObj.ibflag.value 			 = rtnValAry[0]
			formObj.ctrt_no.value            = rtnValAry[1]
			formObj.item_cd.value            = rtnValAry[2]
			formObj.item_nm.value            = rtnValAry[3]
			formObj.hts_no.value             = rtnValAry[4]
			formObj.item_grp_cd.value        = rtnValAry[5]
			formObj.item_grp_cd.value        = rtnValAry[6]
			formObj.pkg_lv1_unit_cd.value    = rtnValAry[7]
			formObj.pkg_lv1_qty.value        = rtnValAry[8]
			formObj.item_pkgunit.value       = rtnValAry[9]
			formObj.item_pkgbaseqty.value    = rtnValAry[10]
			formObj.pkg_lv3_unit_cd.value    = rtnValAry[11]
			formObj.pkg_lv3_qty.value        = rtnValAry[12]
//			formObj.pkg_lv4_unit_cd.value    = rtnValAry[13]
//			formObj.pkg_lv4_qty.value        = rtnValAry[14]
			formObj.lv1_length.value         = rtnValAry[15]
			formObj.lv1_width.value          = rtnValAry[16]
			formObj.lv1_height.value         = rtnValAry[17]
			formObj.lv1_cbm.value            = rtnValAry[18]
			formObj.lv1_cbf.value            = rtnValAry[19]
			formObj.lv1_grs_kgs.value        = rtnValAry[20]
			formObj.lv1_grs_lbs.value        = rtnValAry[21]
			formObj.lv1_net_kgs.value        = rtnValAry[22]
			formObj.lv1_net_lbs.value        = rtnValAry[23]
//			formObj.pkg_pl_std_qty.value     = rtnValAry[24]
//			formObj.pkg_pl_over_wgt.value    = rtnValAry[25]
			formObj.alter_item_cd.value      = rtnValAry[26]
			formObj.barcode_no.value         = rtnValAry[27]
			formObj.safe_stc_qty.value       = rtnValAry[28]
			// excel upload data 유효성 체크			
			// EQ TYPE 조회
		}
	}
}

function setUseEaInrQty(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] != "N"){
			var formObj=document.form;
			formObj.pkg_lv1_qty.style.width = "15px";
			formObj.pkg_lv1_inr_qty.style.display = 'inline';
			formObj.item_pkgbaseqty.style.width = "75px";
			formObj.pkg_lv3_qty.style.width = "75px";
//			formObj.pkg_lv4_qty.style.width = "75px";
		};
	}
}

// Pack Master Size 단위 라디오 버튼 변경시 발생
function changeShUtTpCd() {
	var formObj=document.form;
	
	//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
	var command = "";
	if(document.getElementById("s_sh_ut_tp_cd1").checked){
		//Cm
		//ut_std_chg = 0.01;
		//wgt_std_chg = 1;
		document.getElementById("sh_ut_tp_cd").innerHTML = "Cm";
		h_ut_tp_cd = "CM";

		command = "CBCM_CBM";
		
		//2017.11.23 수정
		//inch -> cm 인경우 2.54 를 곱해주어야함.
//		formObj.lv1_length.value = roundXL(formObj.lv1_length.value / 2.54, 3);
//		formObj.lv1_width.value = roundXL(formObj.lv1_width.value / 2.54, 3);
//		formObj.lv1_height.value = roundXL(formObj.lv1_height.value / 2.54, 3);

//		formObj.item_length.value = roundXL(formObj.item_length.value / 2.54, 3);
//		formObj.item_width.value = roundXL(formObj.item_width.value / 2.54, 3);
//		formObj.item_height.value = roundXL(formObj.item_height.value / 2.54, 3);

//		formObj.lv3_length.value = roundXL(formObj.lv1_length.value / 2.54, 3);
//		formObj.lv3_width.value = roundXL(formObj.lv3_width.value / 2.54, 3);
//		formObj.lv3_height.value = roundXL(formObj.lv3_height.value / 2.54, 3);

		formObj.lv1_length.value = unitConvertValue("INCH_CM", formObj.lv1_length.value);
		formObj.lv1_width.value = unitConvertValue("INCH_CM", formObj.lv1_width.value);
		formObj.lv1_height.value = unitConvertValue("INCH_CM", formObj.lv1_height.value);

		formObj.item_length.value = unitConvertValue("INCH_CM", formObj.item_length.value);
		formObj.item_width.value = unitConvertValue("INCH_CM", formObj.item_width.value);
		formObj.item_height.value = unitConvertValue("INCH_CM", formObj.item_height.value);

		formObj.lv3_length.value = unitConvertValue("INCH_CM", formObj.lv3_length.value);
		formObj.lv3_width.value = unitConvertValue("INCH_CM", formObj.lv3_width.value);
		formObj.lv3_height.value = unitConvertValue("INCH_CM", formObj.lv3_height.value);
	} else {
		//Inch
		//ut_std_chg  = 0.0254;
		//wgt_std_chg = 2.54;
		document.getElementById("sh_ut_tp_cd").innerHTML = "Inch";
		h_ut_tp_cd = "INCH";

		command = "CBINCH_CBM";

		//2017.11.23 수정
		//inch -> cm 인경우 2.54 를 나누어야함.
//		formObj.lv1_length.value = roundXL(formObj.lv1_length.value * 2.54, 3);
//		formObj.lv1_width.value = roundXL(formObj.lv1_width.value * 2.54, 3);
//		formObj.lv1_height.value = roundXL(formObj.lv1_height.value * 2.54, 3);
//		
//		formObj.item_length.value = roundXL(formObj.item_length.value * 2.54, 3);
//		formObj.item_width.value = roundXL(formObj.item_width.value * 2.54, 3);
//		formObj.item_height.value = roundXL(formObj.item_height.value * 2.54, 3);
//		
//		formObj.lv3_length.value = roundXL(formObj.lv3_length.value * 2.54, 3);
//		formObj.lv3_width.value = roundXL(formObj.lv3_width.value * 2.54, 3);
//		formObj.lv3_height.value = roundXL(formObj.lv3_height.value * 2.54, 3);

		formObj.lv1_length.value = unitConvertValue("CM_INCH", formObj.lv1_length.value);
		formObj.lv1_width.value = unitConvertValue("CM_INCH", formObj.lv1_width.value);
		formObj.lv1_height.value = unitConvertValue("CM_INCH", formObj.lv1_height.value);

		formObj.item_length.value = unitConvertValue("CM_INCH", formObj.item_length.value);
		formObj.item_width.value = unitConvertValue("CM_INCH", formObj.item_width.value);
		formObj.item_height.value = unitConvertValue("CM_INCH", formObj.item_height.value);

		formObj.lv3_length.value = unitConvertValue("CM_INCH", formObj.lv3_length.value);
		formObj.lv3_width.value = unitConvertValue("CM_INCH", formObj.lv3_width.value);
		formObj.lv3_height.value = unitConvertValue("CM_INCH", formObj.lv3_height.value);
	}

	// Handling Unit
	var length=formObj.lv1_length.value ? formObj.lv1_length.value : 0;
	var width=formObj.lv1_width.value ? formObj.lv1_width.value : 0;
	var height=formObj.lv1_height.value ? formObj.lv1_height.value : 0;
	var pcs = 1;//formObj.pkg_lv1_qty.value ? formObj.pkg_lv1_qty.value : 0;
	var cbm=0;
	var kg=0;
	var sumCbm=0;

	cbm = unitConvertValue(command, length * width * height * pcs);
	kg = unitConvertValue("CBM_WGT", cbm);

    formObj.lv1_grs_kgs.value = kg;
    formObj.lv1_grs_lbs.value = unitConvertValue("KG_LB", kg);
    formObj.lv1_net_kgs.value = kg;
    formObj.lv1_net_lbs.value = unitConvertValue("KG_LB", kg);
    formObj.lv1_cbm.value = cbm;
    formObj.lv1_cbf.value = unitConvertValue("CBM_CBF", cbm);
    chkComma(formObj.lv1_grs_kgs,10,WMS_WGT_POINT_COUNT);
    chkComma(formObj.lv1_grs_lbs,10,WMS_WGT_POINT_COUNT);
    chkComma(formObj.lv1_net_kgs,10,WMS_WGT_POINT_COUNT);
    chkComma(formObj.lv1_net_lbs,10,WMS_WGT_POINT_COUNT);
    chkComma(formObj.lv1_cbm,10,WMS_CBM_POINT_COUNT);
    chkComma(formObj.lv1_cbf,10,WMS_CBM_POINT_COUNT);
    
    // Package Unit
    var length=formObj.item_length.value ? formObj.item_length.value : 0;
    var width=formObj.item_width.value ? formObj.item_width.value : 0;
    var height=formObj.item_height.value ? formObj.item_height.value : 0;
    var pcs = 1;//formObj.pkg_item_qty.value ? formObj.pkg_item_qty.value : 0;
    var cbm=0;
    var kg=0;
    var sumCbm=0;

    cbm = unitConvertValue(command, length * width * height * pcs);
	kg = unitConvertValue("CBM_WGT", cbm);

    formObj.item_kgs.value = kg;
    formObj.item_grs_lbs.value = unitConvertValue("KG_LB", kg);
    formObj.item_net_wgt.value = kg;
    formObj.item_net_lbs.value = unitConvertValue("KG_LB", kg);
    formObj.item_cbm.value = cbm;
    formObj.item_cbf.value = unitConvertValue("CBM_CBF", cbm);
    chkComma(formObj.item_kgs,10,WMS_WGT_POINT_COUNT);
    chkComma(formObj.item_grs_lbs,10,WMS_WGT_POINT_COUNT);
    chkComma(formObj.item_net_wgt,10,WMS_WGT_POINT_COUNT);
    chkComma(formObj.item_net_lbs,10,WMS_WGT_POINT_COUNT);
    chkComma(formObj.item_cbm,10,WMS_CBM_POINT_COUNT);
    chkComma(formObj.item_cbf,10,WMS_CBM_POINT_COUNT);
    
    // Palletization
	var length=formObj.lv3_length.value ? formObj.lv3_length.value : 0;
    var width=formObj.lv3_width.value ? formObj.lv3_width.value : 0;
    var height=formObj.lv3_height.value ? formObj.lv3_height.value : 0;
    var pcs = 1;//formObj.pkg_lv3_qty.value ? formObj.pkg_lv3_qty.value : 0;
    var cbm=0;
    var kg=0;
    var sumCbm=0;

	cbm = unitConvertValue(command, length * width * height * pcs);
	kg = unitConvertValue("CBM_WGT", cbm);

	form.lv3_grs_kgs.value = kg;

    formObj.lv3_grs_kgs.value = kg;
    formObj.lv3_grs_lbs.value = unitConvertValue("KG_LB", kg);
    formObj.lv3_net_kgs.value = kg;
    formObj.lv3_net_lbs.value = unitConvertValue("KG_LB", kg);
    formObj.lv3_cbm.value = cbm;
    formObj.lv3_cbf.value = unitConvertValue("CBM_CBF", cbm);
    chkComma(formObj.lv3_grs_kgs,10,WMS_WGT_POINT_COUNT);
    chkComma(formObj.lv3_grs_lbs,10,WMS_WGT_POINT_COUNT);
    chkComma(formObj.lv3_net_kgs,10,WMS_WGT_POINT_COUNT);
    chkComma(formObj.lv3_net_lbs,10,WMS_WGT_POINT_COUNT);
    chkComma(formObj.lv3_cbm,10,WMS_CBM_POINT_COUNT);
    chkComma(formObj.lv3_cbf,10,WMS_CBM_POINT_COUNT);

	//ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjLicPlatUtCdList&s_lic_plat_ut_cd='+formObj.pkg_lv3_unit_cd.value, './GateServlet.gsl');
}

function checkPkgLv1UnitCd(){
	//2017.11.21 #3264 [BINEX] [WMS4.0] ITEM CHANGE VALIDATION
	//체크 로직 변경으로 Func 사용 X 처리
	return;
	
	//Data가 있을시 Handing Unit, Package Utit, Palletization lock
	if(listCnt > 0){
		if(document.form.h_pkg_lv1_unit_cd.value != ""){
			document.form.pkg_lv1_unit_cd.value = document.form.h_pkg_lv1_unit_cd.value;
			//alert(getLabel('WMS_MSG006'));
			alert(getLabel2('WMS_MSG006',new Array('Data'))); //Can not change (@).
		}
	}	
}

function checkItemPkgunit(){
	//2017.11.21 #3264 [BINEX] [WMS4.0] ITEM CHANGE VALIDATION
	//체크 로직 변경으로 Func 사용 X 처리
	return;
	
	//Data가 있을시 Handing Unit, Package Utit, Palletization lock
	if(listCnt > 0){
		if(document.form.h_item_pkgunit.value != ""){
			document.form.item_pkgunit.value = document.form.h_item_pkgunit.value;
			//alert(getLabel('WMS_MSG006'));
			alert(getLabel2('WMS_MSG006',new Array('Data'))); //Can not change (@).			
		}
	}		
}
function changeLicPlatUtCdComb(obj) {
	//2017.11.21 #3264 [BINEX] [WMS4.0] ITEM CHANGE VALIDATION
	//체크 로직 변경으로 Func 사용 X 처리
	return;
	
	//ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjLicPlatUtCdList&s_lic_plat_ut_cd='+obj.value, './GateServlet.gsl');
	
	//Data가 있을시 Handing Unit, Package Utit, Palletization lock
	if(listCnt > 0){
		if(document.form.h_pkg_lv3_unit_cd.value != ""){
			document.form.pkg_lv3_unit_cd.value = document.form.h_pkg_lv3_unit_cd.value;
			//alert(getLabel('WMS_MSG006'));
			alert(getLabel2('WMS_MSG006',new Array('Data'))); //Can not change (@).			
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
				
				// Size가 인치단위 인경우
				if (document.getElementById("s_sh_ut_tp_cd2").checked) {
					if (rtnArr[1] == "INCH") {
						formObj.lv3_length.value = rtnArr[2];
						formObj.lv3_width.value = rtnArr[3];
						formObj.lv3_height.value = rtnArr[4];
					} else {
						formObj.lv3_length.value = rtnArr[6];
						formObj.lv3_width.value = rtnArr[7];
						formObj.lv3_height.value = rtnArr[8];
					}
				} else {
					if (rtnArr[1] == "CM") {
						formObj.lv3_length.value = rtnArr[2];
						formObj.lv3_width.value = rtnArr[3];
						formObj.lv3_height.value = rtnArr[4];
					} else {
						formObj.lv3_length.value = rtnArr[6];
						formObj.lv3_width.value = rtnArr[7];
						formObj.lv3_height.value = rtnArr[8];
					}
				}
				
				// Measure (Bss_meas_ut_cd)
				if (rtnArr[9] == "CBM") {
					formObj.lv3_cbm.value = rtnArr[10];
					formObj.lv3_cbf.value = rtnArr[12];
				} else {
					formObj.lv3_cbm.value = rtnArr[12];
					formObj.lv3_cbf.value = rtnArr[10];
				}
				
				// Weight (Bss_wgt_ut_cd)
				if (rtnArr[13] == "KG") {
					formObj.lv3_grs_kgs.value = rtnArr[14];
					formObj.lv3_grs_lbs.value = rtnArr[16];
					formObj.lv3_net_kgs.value = rtnArr[14];
					formObj.lv3_net_lbs.value = rtnArr[16];
				} else {
					formObj.lv3_grs_kgs.value = rtnArr[16];
					formObj.lv3_grs_lbs.value = rtnArr[14];
					formObj.lv3_net_kgs.value = rtnArr[16];
					formObj.lv3_net_lbs.value = rtnArr[14];
				}
				
			}
			else{
				ComShowCodeMessage("COM130401");
			}
		}
		else{
			ComShowCodeMessage("COM130401");
		}
	}
}

function onFocusCombo(obj) {
//	var key=window.event.keyCode;
	
//	alert(key);
//	event.keyCode = 32;
//	alert(key);
//	obj.size = 200;
//	obj.style.height = "100px";
//	$('#pkg_lv3_unit_cd').show();

}

function onFocusComboClose(obj) {
//	obj.style.height = "25px";
//	$('#pkg_lv3_unit_cd').show();
}
function goTabSelect(isNumSep) {
	$("#sel_tab").val(isNumSep);
	var tabObjs = document.getElementsByName('tabLayer');
	if(isNumSep=='01') {
		tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
    }else if(isNumSep=='02') {
		tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'inline';
    }
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
		resizeSheet();
	});
}

// Storage Tab 초기 설정
function setStoragDefaultInfo(skip) {
	var formObject=document.form;
	
	if (ComIsNull(formObject.comb_uom_type.value)){
		//calculation method of contract가 'Daily In & Out'일 경우
//		if (formObject.cal_method_cd.value == "DAY") {
//			// Handling per UOM값 셋팅
//			setHandlingPerUOM(formObject.storage_uom.value);
//			
//			sheet8.RemoveAll();
//		} else {
//			// License Plate#(LCP)
//			formObject.comb_uom_type.value = "LCP";
//			changeUomTypeComb(formObject.comb_uom_type);
//		}
		
		sheet8.RemoveAll();
		if (formObject.cal_method_cd.value == "DAY") {
//			sheet9.RemoveAll();
//			sheet10.RemoveAll();
		}
		formObject.storage_uom.value = "";
		changeStorageUOM(formObject.storage_uom);
	} else {

//		if (formObject.cal_method_cd.value == "DAY" && formObject.comb_uom_type.value != "UOM" ) {
//			formObject.comb_uom_type.value = "";
//			changeUomTypeComb(formObject.comb_uom_type, "skip");
//		} else {
//			changeUomTypeComb(formObject.comb_uom_type, "skip");
//		}
		changeUomTypeComb(formObject.comb_uom_type);
	}
	if (!ComIsNull(formObject.storage_uom.value)){
//		formObject.storage_uom.value = "CBF";
	}
	var pkg_lv1_unit_cd = document.getElementById("pkg_lv1_unit_cd");
	var t_pkg_lv1_unit_cd = pkg_lv1_unit_cd.options[pkg_lv1_unit_cd.selectedIndex].text
	var arr_pkg_lv1_unit_cd = t_pkg_lv1_unit_cd.split(":");
	var storage_uom = document.getElementById("storage_uom");
	document.getElementById("sHandling_unit").innerHTML = arr_pkg_lv1_unit_cd[1];
	document.getElementById("sUom").innerHTML = storage_uom.options[storage_uom.selectedIndex].text;

	//#3223 [CLA V460 TEST] WMS STORAGE CALCUATION METHOD
	calMethod_check();
	
}

//Handling per UOM값 셋팅
function setHandlingPerUOM(storageUom) {
	var formObject=document.form;
	switch (storageUom) {
	case "CBF":
		var lv1_cbf = eval(removeComma(formObject.lv1_cbf.value));
		if (lv1_cbf == 0) {
			formObject.hunit_for_uom.value = 0;
		} else {
			formObject.hunit_for_uom.value = roundXL(1 / lv1_cbf, WMS_CBM_POINT_COUNT);
	        chkComma(formObject.hunit_for_uom,10,3);
		}
		break;
	case "CBM":
		var lv1_cbm = eval(removeComma(formObject.lv1_cbm.value));
		if (lv1_cbm == 0) {
			formObject.hunit_for_uom.value = 0;
		} else {
			formObject.hunit_for_uom.value = roundXL(1 / lv1_cbm, WMS_CBM_POINT_COUNT);
			chkComma(formObject.hunit_for_uom,10,3);
		}
		break;
	case "GKG":
		var lv1_grs_kgs = eval(removeComma(formObject.lv1_grs_kgs.value));
		if (lv1_grs_kgs == 0) {
			formObject.hunit_for_uom.value = 0;
		} else {
			formObject.hunit_for_uom.value = roundXL(1 / lv1_grs_kgs, WMS_WGT_POINT_COUNT);
			chkComma(formObject.hunit_for_uom,10,3);
		}
		break;
	case "GLB":
		var lv1_grs_lbs = eval(removeComma(formObject.lv1_grs_lbs.value));
		if (lv1_grs_lbs == 0) {
			formObject.hunit_for_uom.value = 0;
		} else {
			formObject.hunit_for_uom.value = roundXL(1 / lv1_grs_lbs, WMS_WGT_POINT_COUNT);
			chkComma(formObject.hunit_for_uom,10,3);
		}
		break;
	case "NKG":
		var lv1_net_kgs = eval(removeComma(formObject.lv1_net_kgs.value));
		if (lv1_net_kgs == 0) {
			formObject.hunit_for_uom.value = 0;
		} else {
			formObject.hunit_for_uom.value = roundXL(1 / lv1_net_kgs, WMS_WGT_POINT_COUNT);
			chkComma(formObject.hunit_for_uom,10,3);
		}
		break;
	case "NLB":
		var lv1_net_lbs = eval(removeComma(formObject.lv1_net_lbs.value));
		if (lv1_net_lbs == 0) {
			formObject.hunit_for_uom.value = 0;
		} else {
			formObject.hunit_for_uom.value = roundXL(1 / lv1_net_lbs, WMS_WGT_POINT_COUNT);
			chkComma(formObject.hunit_for_uom,10,3);
		}
		break;
	case "EA":
		var val = 1;
		formObject.hunit_for_uom.value = roundXL(1 / val, 3);
		chkComma(formObject.hunit_for_uom,10,3);
		break;
	default:
		formObject.hunit_for_uom.value = "0.00000";
		break;
	}
}

//UOM Combo 변경
function changeStorageUOM(obj) {
	var formObject=document.form;
	// Handling per UOM값 셋팅
	setHandlingPerUOM(obj.value);
	
	var storage_uom = document.getElementById("storage_uom");
	document.getElementById("sUom").innerHTML = storage_uom.options[storage_uom.selectedIndex].text;
	// UOM
	if (formObject.comb_uom_type.value == "UOM") {
		var rowCnt = sheet8.RowCount();
		if (rowCnt == 0) {
			sheet8.RemoveAll();
			var row_new = sheet8.DataInsert(-1);
			// UOM
			sheet8.SetCellValue(row_new, "Grd08sto_tp",obj.value);
			if (ComIsNull(sheet8.GetCellValue(row_new, "Grd08curr_cd"))) {
				sheet8.SetCellValue(row_new, "Grd08curr_cd",trf_cur_cd);
			}
		} else {
			// UOM
			sheet8.SetCellValue(1, "Grd08sto_tp",obj.value);
			if (ComIsNull(sheet8.GetCellValue(1, "Grd08curr_cd"))) {
				sheet8.SetCellValue(1, "Grd08curr_cd",trf_cur_cd);
			}
		}
	} 
}
//Type Combo 변경
function changeUomTypeComb(obj, skip) {
	var formObject=document.form;
	
	if (obj.value == "") {
		sheet8.RemoveAll();
		document.getElementById("i_sheet8").style.display="block";
		document.getElementById("i_sheet9").style.display="none";
		document.getElementById("i_sheet10").style.display="none";
		if (formObject.cal_method_cd.value == "DAY") {
//			sheet9.RemoveAll();
//			sheet10.RemoveAll();
		}
		formObject.storage_uom.value = "";
		changeStorageUOM(formObject.storage_uom);
	}
	// UOM
	else if (obj.value == "UOM") {
		document.getElementById("uom_text").style.display="inline";
		document.getElementById("storage_uom").style.display="inline";
		document.getElementById("sHandling_unit").style.display="inline";
		document.getElementById("sUom").style.display="inline";
		document.getElementById("of_text").style.display="inline";
		document.getElementById("per_text").style.display="inline";
		document.getElementById("hunit_for_uom").style.display="inline";
		
		document.getElementById("i_sheet8").style.display="block";
		document.getElementById("i_sheet9").style.display="none";
		document.getElementById("i_sheet10").style.display="none";
		var rowCnt = sheet8.RowCount();
		if (rowCnt == 0) {
			sheet8.RemoveAll();
			var row_new = sheet8.DataInsert(-1);
			// UOM
			sheet8.SetCellValue(row_new, "Grd08sto_tp",formObject.storage_uom.value);
			if (ComIsNull(sheet8.GetCellValue(row_new, "Grd08curr_cd"))) {
				sheet8.SetCellValue(row_new, "Grd08curr_cd",trf_cur_cd);
			}
		} else {
			// UOM
			sheet8.SetCellValue(1, "Grd08sto_tp",formObject.storage_uom.value);
			if (ComIsNull(sheet8.GetCellValue(1, "Grd08curr_cd"))) {
				sheet8.SetCellValue(1, "Grd08curr_cd",trf_cur_cd);
			}
		}
		
		if (ComIsNull(formObject.storage_uom.value)) {
			formObject.hunit_for_uom.value = 0;
		}
	} else {
		// 조회 후에는 체크 안함 	=>  Daily In & Out인 경우에도 허용
//		if (skip != "skip" && formObject.cal_method_cd.value == "DAY") {
//			ComShowCodeMessage("COM0812", "");
//			obj.value = "UOM";
//			obj.focus();
//			return;
//		} 
		document.getElementById("uom_text").style.display="none";
		document.getElementById("storage_uom").style.display="none";
		document.getElementById("sHandling_unit").style.display="none";
		document.getElementById("sUom").style.display="none";
		document.getElementById("of_text").style.display="none";
		document.getElementById("per_text").style.display="none";
		document.getElementById("hunit_for_uom").style.display="none";
		
		// License Plate#(LCP)
		if (obj.value == "LCP") {
			document.getElementById("i_sheet8").style.display="none";
			document.getElementById("i_sheet9").style.display="block";
			document.getElementById("i_sheet10").style.display="none";	
			
		    var hdrR = sheet9.HeaderRows();
		    var rowCnt = sheet9.RowCount();
		    for (var i = hdrR; i < rowCnt + hdrR; i++) {
		    	if (ComIsNull(sheet9.GetCellValue(i, "Grd09curr_cd"))) {
		    		sheet9.SetCellValue(i, "Grd09curr_cd",trf_cur_cd);
		    	}
		    }
		// Location(LOC)
		} else {
			document.getElementById("i_sheet8").style.display="none";
			document.getElementById("i_sheet9").style.display="none";
			document.getElementById("i_sheet10").style.display="block";
			
			var hdrR = sheet10.HeaderRows();
			var rowCnt = sheet10.RowCount();
			for (var i = hdrR; i < rowCnt + hdrR; i++) {
				if (ComIsNull(sheet10.GetCellValue(i, "Grd10curr_cd"))) {
					sheet10.SetCellValue(i, "Grd10curr_cd",trf_cur_cd);
				}
			}
		}
	}
}

function sheet9_OnChange(sheetObj, row, col) {
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "Grd09curr_cd"){
	    var hdrR = sheetObj.HeaderRows();
	    var rowCnt = sheetObj.RowCount();
	    for (var i = hdrR; i < rowCnt + hdrR; i++) {
	    	sheetObj.SetCellValue(i, "Grd09curr_cd",sheetObj.GetCellValue(row, "Grd09curr_cd"));
	    }
	}
}

function sheet10_OnChange(sheetObj, row, col) {
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "Grd10curr_cd"){
	    var hdrR = sheetObj.HeaderRows();
	    var rowCnt = sheetObj.RowCount();
	    for (var i = hdrR; i < rowCnt + hdrR; i++) {
	    	sheetObj.SetCellValue(i, "Grd10curr_cd",sheetObj.GetCellValue(row, "Grd10curr_cd"));
	    }
	}
}
function onlyNumberCheckItem(sSubChar) {
    var keyValue=ComGetEvent("keycode") ? ComGetEvent("keycode") : event.which ? event.which : event.charCode;
    if((keyValue >= 48 && keyValue <= 57) || keyValue == 8 || keyValue == 9) {//숫자
        event.returnValue=true;
    } else if(sSubChar != undefined && sSubChar != null && sSubChar.constructor==String && sSubChar.length > 0) {
    	//SubChar가 여러개 설정된 경우 여러개 글자 모두 처리한다.
    	for(var i=0; i<sSubChar.length; i++) {
     		if (keyValue == sSubChar.charCodeAt(i)) {
                event.returnValue=true;
                return;
    		}
    	}
        event.returnValue=false;
    } else {
        event.returnValue=false;
    }
}

//2017.11.21 #3264 [BINEX] [WMS4.0] ITEM CHANGE VALIDATION
function searchItemIbUse (){
	var formObj=document.form;
 	var sXml=docObjects[0].GetSearchData("./ITEMMgmt_2GS.clt", "f_cmd="+SEARCH03+"&item_cd=" + formObj.item_cd.value + "&ctrt_no=" + formObj.ctrt_no.value );
		var xmlDoc = $.parseXML(sXml);
		var $xml = $(xmlDoc);
				
		if($xml.find("result").text() == 'OK'){
			return true;
		}else{
//			ComShowMessage("[" + formObj.item_cd.value + "] related information cannot be modified.");
			return false;
		}
}

//#3223 [CLA V460 TEST] WMS STORAGE CALCUATION METHOD
function calMethod_check(){					
			if ( document.form.cal_method_cd.value == "DTV"){
				document.getElementById("sWarn_text").innerHTML = 
				"Selected contract is set to calculate storage based on 'Daily Total Volume Unit' as default.<br>Information saved on Storage tab would not reflect. Please see Contract for more detail.";
			}else {
				document.getElementById("sWarn_text").innerHTML = "";
			}
}

function reloadModiItem(newItemCd){
	var formObj=document.form;
	formObj.in_item_cd.value = newItemCd;
	
	btn_Search();
}

//#1724 [WMS4.0] Item Code and Name Update (History)
//Only can see when ITEM_ATTR_CNG_YN Option is 'Y'
function setItemAttrCngYn(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
	    if(doc[1] == "Y"){
	    	ItemAttrCngYn = "Y";
		}else{
			ItemAttrCngYn = "N";
		}
	}else{
		ItemAttrCngYn = "N";

	}

	if(ItemAttrCngYn=="Y"){
		formObj.btn_item_edit.style.display="inline";
	}else{
		formObj.btn_item_edit.style.display="none";
	}
}