/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutMgmt.js
*@FileTitle  : Outbound Management
*@author     : Khoa.Nguyen - DOU Network
*@version    : 1.0
*@since      : 2016/04/26
=========================================================*/
var tabObjects=new Array();
var saveFlg ="";
var tabCnt=0 ;
var beforetab=1;
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var uploadObjects=new Array();
var uploadCnt=0;
var fix_grid00="Grd00"; //form tab의 form 객체
var fix_grid01="Grd01"; //list tab의 그리드
var fix_grid02="Grd02"; //공통 detail 그리드
var fix_grid03="Grd03"; //Doc Detail
var fix_grid04="Grd04"; //File Attachment
var fix_grid05="Grd05"; //Excel DownLoad
var fix_grid06="Grd06"; //Excel DownLoad
var fix_by_list="list"; //list tab의 구분자
var fix_by_form="form"; //form tab의 구분자
var fix_by_list_P="list_P"; //list tab의 구분자
var fix_by_form_P="form_P"; //form tab의 구분자
var loading_flag="N";
var bk_sts_N="Initial";
var bk_sts_I;
var bk_sts_P;
var bk_sts_A
var bk_sts_X; 
var firCalFlag = false;
var sheet6Row = 0;
var l_btn_rateFlg = false;
var rtnary = new Array(1);

//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
var gJsWmsRuPoint = "N";
var vPointCount = 3;
var vEditLen = 14;

//#1392 [WMS4.0] Inbound/Outbound Management Freight Status 표기
var lv_StsNm;

//#3390-Check Authority WMS CODE
var isWmsAuthOk = false; 

//#5563 [Binex] WMS Contract Currency to overwrite Office Local Currency
var rate_curr_cd = "";

/*
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여
 * cache옵션 false셋팅
 */
$(document).ready(function () {
	$.ajaxSetup({ cache: false });

	//#3195 [BINEX WMS4.0] [#3100 개선] INBOUND LIST AND ENTRY SHOWING DIFF SKU
	$('#cust_ord_no, #ctrt_no, #wh_cd').change(function() {
		if($('#cust_ord_no').val() != '' && $('#ctrt_no').val() != '') {
			if($(this).attr('id') == 'cust_ord_no') {
				if($(this).attr('org_cust_ord_no') == $(this).val()) {
					return;
				}
			}
			checdup_OrderNo();
		}
		
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
		if(this.id == "wh_cd"){
			fn_getWh_CurrCd();

		}
		
	});
});

//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
function fn_getWh_CurrCd(){
	var formObj=document.form;
	ajaxSendPost(relsutWHCD, 'reqVal', '&goWhere=aj&bcKey=searchWhCurrcd&wh_cd='+formObj.wh_cd.value, './GateServlet.gsl');	
}
function relsutWHCD(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			//alert(rtnArr[0]);
			formObj.wh_curr_cd.value =rtnArr[0];
			formObj.wh_ofc_cd.value =rtnArr[1];
		}
	}
	
	changeFrtinfo();
}


/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Upload Object
 */
function setUploadObject(uploadObj){
	uploadObjects[uploadCnt++]=uploadObj;
}
/*
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
 }
/*
 * load page
 */
function loadPage() {
	var formObj=document.form;
	//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked" - Optionized needed
	var opt_key = "FRT_ADD_OPT";
	ajaxSendPost(checkFrtOpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	// [1325][OUTBOUND MANAGEMENT] Cannot auto suggestion when input name.
	fnSetAutocompleteCallBack('owner_nm', 'setOwnerInfo', 'LINER_POPLIST');
	fnSetAutocompleteCallBack('buyer_nm', 'setShipperInfo', 'LINER_POPLIST');
	fnSetAutocompleteCallBack('trucker_nm', 'setTruckerInfo', 'LINER_POPLIST');
	fnSetAutocompleteCallBack('bill_to_nm', 'setBillToInfo', 'LINER_POPLIST');
	
	//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
	if(gJsWmsRuPoint == 'Y'){
		vPointCount = 8;
		vEditLen = 19;
	}
	//sheet
	var formObj = document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	document.form.btn_excel.style.display = 'none';
	document.form.link_Wave.style.display = 'none';
	// #1524 [WMS4.0]4.4.2 Test 중 발견한 문제들(3/14 - 1차 테스트)
	// Template D/L, Excel U/L 버튼 Hide
	document.form.link_Excel_Download.style.display = 'none';
	document.form.link_Excel_Upload.style.display = 'none';
	//폰트색상 변경
//	sheet1.SetCellFontColor(0, fix_grid01 + "row_add","#0100FF");
//	sheet2.SetCellFontColor(1, fix_grid02 + "row_add","#0100FF");
	//IBMultiCombo초기화
	/*initCombo("list_bk_sts_cd");
	initCombo("list_in_search_tp");
	initCombo("list_in_date_tp");
	initCombo("list_ord_tp_cd");*/
	initCombo("ord_tp_cd");
	initCombo("load_tp_cd");
	initCombo("fwd_tp_cd");
	initCombo("trade_tp_cd");
    loading_flag="Y";
    //upload 초기화
//	ComConfigUpload(uploadObjects[0], "/HJLOMS/addFileWHOutbk.do?FileUploadModule=OMS");
	//control
//	initControl();
	if($("#req_wob_bk_no").val().trim() == "")
	{ 
		//list tab 초기셋팅
		/*$("#list_wh_cd").val($("#def_wh_cd").val());
		$("#list_wh_nm").val($("#def_wh_nm").val());
		$("#list_ctrt_no").val($("#def_wh_ctrt_no").val());
		$("#list_ctrt_nm").val($("#def_wh_ctrt_nm").val());
		$("#list_fm_date").val(ComGetDateAdd(null, "d", -31, "-"));
		$("#list_to_date").val(ComGetNowInfo());*/
		//form tab 초기셋팅
		form_tab_new_setting();
		$("#sel_tab").val("01");
		//SHEET ADD 기본셋팅
		default1RowAdd();
	}
	else
	{
		$("#wh_cd").val($("#req_wh_cd").val());
		$("#wh_nm").val($("#req_wh_nm").val());
		$("#list_in_search_tp").val('WOB_BK_NO');
		$("#list_in_no").val($("#req_wob_bk_no").val());
		btn_Search();
	}
	
	if($("#uploadfile").val().trim() == "T" && $("#fwd_bk_no").val().trim() != ""){
		formObj.list_in_search_tp.value = "WOB_BK_NO";
		$("#list_in_no").val($("#fwd_bk_no").val().trim());
		btn_Search();
		goTabSelect("04");
	}
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), sheet2, false, "");
	sheet2_btn_hide();
}
/*
 * tab
 */
function resizeSheet(){
	 //ComResizeSheet(sheet1);
	 ComResizeSheet(sheet2);
	 ComResizeSheet(sheet3);
	 ComResizeSheet(sheet4);
}
function goTabSelect(isNumSep) {
	var formObj=document.form;	
	$("#sel_tab").val(isNumSep);
	var tabObjs = document.getElementsByName('tabLayer');
	if(isNumSep=='01') {
		tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        ComBtnEnable("btn_search");     
        ComBtnEnable("btn_save");
        ComBtnEnable("btnSaveX");
        ComBtnEnable("btn_delete");
        ComBtnEnable("btn_cancel");  
        /*if(isNumSep=='01')
    	{
        	HeaderDataCopy(isNumSep);
    	}*/
    }else if(isNumSep=='02') {
		tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'inline';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        ComBtnEnable("btn_search");
        ComBtnEnable("btn_save");
        ComBtnEnable("btnSaveX");
        ComBtnEnable("btn_delete");
        ComBtnEnable("btn_cancel");      
        
        //WMS v6.0 이행 시 수정 함 : Bill To 없을 경우 무조건 Owner 세팅 해줌
        // Default셋업 Owner가 아닌경우, Bill To Name설정을 위해
    	//formObj.bill_to_cd.focus();
    	//formObj.btn_bill_to_cd.focus();
        if(formObj.bill_to_cd.value.trim() ==''){
    		formObj.bill_to_cd.value = formObj.owner_cd.value;
         	formObj.bill_to_nm.value = formObj.owner_nm.value;   
    	}
    	
        /*if(isNumSep=='02')
    	{
        	HeaderDataCopy(isNumSep);
    	}*/
    }else if(isNumSep=='03') {
		tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'inline';
        tabObjs[3].style.display = 'none';
        ComBtnDisable("btn_search");
        ComBtnDisable("btn_save");
        ComBtnDisable("btnSaveX");        
        ComBtnDisable("btn_delete");
        ComBtnDisable("btn_cancel");        
    }else if(isNumSep=='04') {
		tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'inline';
        ComBtnDisable("btn_search");
        ComBtnDisable("btn_save");
        ComBtnDisable("btnSaveX");
        ComBtnDisable("btn_delete");
        ComBtnDisable("btn_cancel");        
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
/**
 * IBTab Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setTabObject(tab_obj){
    tabObjects[tabCnt++]=tab_obj;
}
function HeaderDataCopy(isNumSep)
{
	var sheetObj=sheet1;
	var row;
	if(isNumSep == "02") // list내용을 form으로
	{
		if($("#form_mode").val() == "NEW")
		{
			var new_row=sheetObj.FindStatusRow("I");
			if(new_row == "")
			{
				//신규추가
				row=sheet1RowAdd(sheetObj);	
			}
			else
			{
				var arrRow=new_row.split(";");
				row=arrRow[0];
			}
		}
		else
		{
			row=sheetObj.FindText(fix_grid01 + "wob_bk_no", $("#sel_wob_bk_no").val(), sheetObj.HeaderRows(), -1, true);
		}
		var InputName="wh_cd|wh_nm|ctrt_no|ctrt_nm|rtp_no|owner_cd|owner_nm|owner_addr1|owner_addr2|owner_addr3|owner_addr4|owner_addr5|cust_ord_no|wob_bk_no|bk_date|est_out_dt|est_out_hm|eq_tpsz_cd|eq_no|eq_tp_cd|seal_no|dlv_ord_no|buyer_cd|buyer_addr1|buyer_addr2|buyer_addr3|buyer_addr4|buyer_addr5|ref_no|commc_inv_no|mbl_no|hbl_no|vsl_cd|vsl_nm|voy|carrier_cd|carrier_nm|pol|pol_nm|pod|pod_nm|del|del_nm|etd|eta|work_sht_yn|bk_sts_cd|bk_sts_nm|rmk|wave_no|smp_wave_flg";
		var ComboName="ord_tp_cd|fwd_tp_cd|load_tp_cd|trade_tp_cd";
		var input_name_arr=InputName.split("|");
		var combo_name_arr=ComboName.split("|");
		for(var i=0; i<input_name_arr.length; i++)
		{
			if(input_name_arr[i] == "bk_sts_nm")
			{
				$("#" + input_name_arr[i]).val(sheetObj.GetCellText(row, fix_grid01 + "bk_sts_cd"));
			}
			else if(input_name_arr[i].indexOf("_dt") > 0 || input_name_arr[i].indexOf("_date") > 0 || input_name_arr[i] == "etd" || input_name_arr[i] == "eta")
			{
				$("#" + input_name_arr[i]).val(convDate(ComGetMaskedValue(sheetObj.GetCellValue(row, fix_grid01 + input_name_arr[i]), "ymd", "-")));
			}
			else if(input_name_arr[i].indexOf("_hm") > 0)
			{
				$("#" + input_name_arr[i]).val(ComGetMaskedValue(sheetObj.GetCellValue(row, fix_grid01 + input_name_arr[i]), "hm", ":"));
			}
			else if(input_name_arr[i].indexOf("_qty") > 0)
			{
				$("#" + input_name_arr[i]).val(ComGetMaskedValue(sheetObj.GetCellValue(row, fix_grid01 + input_name_arr[i]), "int", ","));
			}
			else
			{
				$("#" + input_name_arr[i]).val(sheetObj.GetCellValue(row, fix_grid01 + input_name_arr[i]));
			}
		}
		for(var m=0; m<combo_name_arr.length; m++)
		{
			if(combo_name_arr[m] == "ord_tp_cd")
			{
				$("#" + combo_name_arr[m])[0].value=sheetObj.GetCellValue(row, fix_grid01 + combo_name_arr[m]);
			}
			else
			{
				$("#" + combo_name_arr[m])[0].value=sheetObj.GetCellValue(row, fix_grid01 + combo_name_arr[m]),false;
			}
		}
	}
	else //form내용을 list로 
	{
		if($("#form_mode").val() == "NEW")
		{
			var new_row=sheetObj.FindStatusRow("I");
			if(new_row == "")
			{
				//신규추가
				row=sheet1RowAdd2(sheetObj);	
				//선택된 행 색상 변경
				selectCellColorChange(sheetObj, row);
			}
			else
			{
				var arrRow=new_row.split(";");
				row=arrRow[0];
				//선택된 행 색상 변경
				selectCellColorChange(sheetObj, row);
			}
		}
		else
		{
			row=sheetObj.FindText(fix_grid01 + "wob_bk_no", $("#sel_wob_bk_no").val(), sheetObj.HeaderRows(), -1, true);
		}
		var InputName="wh_cd|wh_nm|ctrt_no|ctrt_nm|rtp_no|owner_cd|owner_nm|owner_addr1|owner_addr2|owner_addr3|owner_addr4|owner_addr5|cust_ord_no|wob_bk_no|bk_date|est_out_dt|est_out_hm|eq_tpsz_cd|eq_no|eq_tp_cd|seal_no|dlv_ord_no|buyer_cd|buyer_addr1|buyer_addr2|buyer_addr3|buyer_addr4|buyer_addr5|ref_no|commc_inv_no|mbl_no|hbl_no|vsl_cd|vsl_nm|voy|carrier_cd|carrier_nm|pol|pol_nm|pod|pod_nm|del|del_nm|etd|eta|work_sht_yn|bk_sts_cd|rmk|wave_no|smp_wave_flg";
		var ComboName="ord_tp_cd|fwd_tp_cd|load_tp_cd|trade_tp_cd";
		var input_name_arr=InputName.split("|");
		var combo_name_arr=ComboName.split("|");
		for(var i=0; i<input_name_arr.length; i++)
		{
			sheetObj.SetCellValue(row, fix_grid01 + input_name_arr[i],$("#" + input_name_arr[i]).val(),0);
		}
		for(var m=0; m<combo_name_arr.length; m++)
		{
			sheetObj.SetCellValue(row, fix_grid01 + combo_name_arr[m],$("#" + combo_name_arr[m])[0].value ,0);
		}
		
	}
}
/*
 * init control
 */
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);    
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
    axon_event.addListenerForm("change", "form_onChange", formObject);
    axon_event.addListenerForm("blur", "form_onChange", formObject);
}
function keydown(){
	var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=event.srcElement.getAttribute("value");
    if (vKeyCode == 120) {
    	btn_Save();
    }
}
/*
 * init sheet
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet2": //IBSheet2 init
	    with (sheetObj) {
	
			var prefix=fix_grid02;
	
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, ComboMaxHeight :400 } );
	
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('WHOutMgmt_Sheet2_HDR1'), Align:"Center"},
			                { Text:getLabel('WHOutMgmt_Sheet2_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);
	
			var cols = [ {Type:"Text",      Hidden:1,  Width:30,    Align:"Center",   	ColMerge:1,   SaveName:prefix+"row_add",    	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:30,    Align:"Right",   	ColMerge:1,   SaveName:prefix+"row_add_qty",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT },
			             {Type:"DelCheck",  Hidden:0,  Width:45,    Align:"Center",  	ColMerge:1,   SaveName:prefix+"row_del",    	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             // LSY PopupEdit => Combo
//			             {Type:"PopupEdit", Hidden:0,  Width:100,   Align:"Left",   	ColMerge:1,   SaveName:prefix+"item_cd",    	KeyField:1,   UpdateEdit:0,   InsertEdit:1,   Format:"", EditLen:20 },
			             {Type:"Combo",  	Hidden:0,  Width:100,	Align:"Center",    	ColMerge:1,   SaveName:prefix+"item_cd",        KeyField:1,   UpdateEdit:0,   InsertEdit:1,   Format:""},
						 // OFVFOUR-8145 [MTS] Quantity of Items show negative number on Closing Storage Entry
						 {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",   	ColMerge:1,   SaveName:prefix+"item_nm",    	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"", EditLen:100 },
			             {Type:"Combo", 	Hidden:0,  Width:100,   Align:"Center",   	ColMerge:1,   SaveName:prefix+"item_pkgunit",   KeyField:1,   UpdateEdit:0,   InsertEdit:1,   Format:"",   EditLen:2 },
			             {Type:"AutoSum",   Hidden:0,  Width:65,   	Align:"Right",   	ColMerge:1,   SaveName:prefix+"item_pkgqty",    KeyField:1,   UpdateEdit:0,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT, EditLen:16 },
			             {Type:"AutoSum",   Hidden:0,  Width:65,   	Align:"Right",   	ColMerge:1,   SaveName:prefix+"item_ea_qty",    KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT, EditLen:16 },
						 {Type:"AutoSum",   Hidden:0,  Width:65,   	Align:"Right",   	ColMerge:1,   SaveName:prefix+"stock_qty",    	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT },						 
						 {Type:"Text",      Hidden:0,  Width:83,    Align:"Center",   	ColMerge:1,   SaveName:prefix+"lot_no",    		KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"",   EditLen:20 },
						 {Type:"ComboEdit", Hidden:0,  Width:80,   	Align:"Left",   	ColMerge:1,   SaveName:prefix+"lot_04",    		KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"",   	EditLen:20 },
			             {Type:"ComboEdit", Hidden:0,  Width:80,   	Align:"Left",   	ColMerge:1,   SaveName:prefix+"lot_05",    		KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"",   	EditLen:20 },
						 {Type:"Text",     	Hidden:0,  Width:120,   Align:"Center",   	ColMerge:1,   SaveName:prefix+"fix_lot_id",    	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"", EditLen:20 },
			             {Type:"Image",     Hidden:0,  Width:20,    Align:"Center",   	ColMerge:1,   SaveName:prefix+"fix_lot_id_img", KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"", EditLen:20 },
						 {Type:"Date",      Hidden:0,  Width:90,   	Align:"Center",   	ColMerge:1,   SaveName:prefix+"inbound_dt",    	KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Ymd", EditLen:10 },
			             {Type:"Date",      Hidden:0,  Width:90,   	Align:"Center",   	ColMerge:1,   SaveName:prefix+"exp_dt",    		KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Ymd", EditLen:10 },
						 {Type:"Text", 		Hidden:0,  Width:100,   Align:"Center",   	ColMerge:1,   SaveName:prefix+"shp_pkgunit",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"",   EditLen:2 },
						 {Type:"Text",   	Hidden:0,  Width:65,   	Align:"Center",   	ColMerge:1,   SaveName:prefix+"shp_loc",     	KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"",   PointCount:2},
			             {Type:"AutoSum",   Hidden:0,  Width:65,   	Align:"Right",   	ColMerge:1,   SaveName:prefix+"shp_pkgqty",     KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT, EditLen:16 },
			             {Type:"AutoSum",   Hidden:0,  Width:65,   	Align:"Right",   	ColMerge:1,   SaveName:prefix+"shp_ea_qty",     KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT, EditLen:16 },
			             {Type:"PopupEdit", Hidden:0,  Width:80,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"eq_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",      PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
			             {Type:"Text",      Hidden:0,  Width:80,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"eq_no",          KeyField:0,   CalcLogic:"",   Format:"",      PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:100,  	Align:"Left",    	ColMerge:1,   SaveName:prefix+"seal_no",        KeyField:0,   CalcLogic:"",   Format:"",      PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
			             {Type:"Image",     Hidden:0, Width:30,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"seal_img",       KeyField:0,   CalcLogic:"",   Format:"",      PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
						 {Type:"Text",      Hidden:0,  Width:80,    Align:"Right",   	ColMerge:1,   SaveName:prefix+"item_ser_no",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" ,   EditLen:20},
						 {Type:"Text",      Hidden:0,  Width:80,    Align:"Center",   	ColMerge:1,   SaveName:prefix+"lic_plat_no",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" ,   EditLen:20},
						 {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",   	ColMerge:1,   SaveName:prefix+"po_no",    		KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"", EditLen:20 },		
						 {Type:"AutoSum",   Hidden:0,  Width:80,   	Align:"Right",   	ColMerge:1,   SaveName:prefix+"item_cbm",    	KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Float",     PointCount:WMS_CBM_POINT_COUNT, EditLen:18 },
			             {Type:"AutoSum",   Hidden:0,  Width:80,   	Align:"Right",   	ColMerge:1,   SaveName:prefix+"item_cbf",    	KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Float",     PointCount:WMS_CBM_POINT_COUNT, EditLen:18 },
			             {Type:"AutoSum",   Hidden:0,  Width:80,   	Align:"Right",   	ColMerge:1,   SaveName:prefix+"item_grs_kgs",   KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Float",     PointCount:WMS_KGS_POINT, EditLen:18 },
			             {Type:"AutoSum",   Hidden:0,  Width:80,   	Align:"Right",   	ColMerge:1,   SaveName:prefix+"item_grs_lbs",   KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Float",     PointCount:WMS_KGS_POINT, EditLen:18 },
			             {Type:"AutoSum",   Hidden:0,  Width:80,   	Align:"Right",   	ColMerge:1,   SaveName:prefix+"item_net_kgs",   KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Float",     PointCount:WMS_KGS_POINT, EditLen:18 },
			             {Type:"AutoSum",   Hidden:0,  Width:80,   	Align:"Right",   	ColMerge:1,   SaveName:prefix+"item_net_lbs",   KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Float",     PointCount:WMS_KGS_POINT, EditLen:18 },
						 {Type:"Combo", 	Hidden:1,  Width:70,   	Align:"Center",  	ColMerge:1,   SaveName:prefix+"curr_cd",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:5},
			             {Type:"AutoSum",   Hidden:1,  Width:70,   	Align:"Right",   	ColMerge:1,   SaveName:prefix+"unit_price",    	KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",     PointCount:2, EditLen:15 },		
						 
						 {Type:"Text",      Hidden:1,  Width:200,   Align:"Left",   	ColMerge:1,   SaveName:prefix+"pkg_info",    	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             {Type:"PopupEdit", Hidden:1,  Width:100,   Align:"Center",   	ColMerge:1,   SaveName:prefix+"fix_loc_nm",    	KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"", EditLen:20 },
			             {Type:"Text",      Hidden:1,  Width:125,   Align:"Center",   	ColMerge:1,   SaveName:prefix+"wave_no",    	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:120,   Align:"Center",   	ColMerge:1,   SaveName:prefix+"sao_no",    		KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"", 	EditLen:50 },
			             {Type:"Status",    Hidden:1,  Width:30,   	Align:"Center",   SaveName:prefix+"ibflag" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"fix_loc_cd",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"item_sys_no",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"item_seq",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"ctrt_no",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"ctrt_nm",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"wh_cd",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"wh_nm",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"invalid_yn",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"su_valid_yn",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"wob_bk_no",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"sao_sys_no",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"bk_sts_cd",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"fix_loc_cd_it",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"fix_loc_nm_it",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"pkg_lv1_qty",   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"pkg_lv1_unit_cd",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"pkg_lv2_qty",   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"pkg_lv2_unit_cd",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"pkg_lv3_qty",   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"pkg_lv3_unit_cd",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"pkg_lv4_qty",   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"pkg_lv4_unit_cd",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:0,   	Align:"Center",   SaveName:prefix+"lv1_cbm",   Format:"Float",     PointCount:WMS_CBM_POINT_COUNT },
			             {Type:"Text",      Hidden:1,  Width:0,   	Align:"Center",   SaveName:prefix+"lv1_cbf",   Format:"Float",     PointCount:WMS_CBM_POINT_COUNT },
			             {Type:"Text",      Hidden:1,  Width:0,   	Align:"Center",   SaveName:prefix+"lv1_grs_kgs",   Format:"Float",     PointCount:MST_KGS_POINT },
			             {Type:"Text",      Hidden:1,  Width:0,   	Align:"Center",   SaveName:prefix+"lv1_grs_lbs",   Format:"Float",     PointCount:MST_KGS_POINT },
			             {Type:"Text",      Hidden:1,  Width:70,   	Align:"Center",   SaveName:prefix+"lv1_net_kgs",   Format:"Float",     PointCount:MST_KGS_POINT },
			             {Type:"Text",      Hidden:1,  Width:50,   	Align:"Center",   SaveName:prefix+"lv1_net_lbs",   Format:"Float",     PointCount:MST_KGS_POINT },
			             {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center",   SaveName:prefix+"smp_wave_flg",   Format:"" },
			             {Type:"Text",      Hidden:1,  Width:70,   	Align:"Right",    SaveName:prefix+"item_unit_price",   Format:"Float",     PointCount:2 },
			             {Type:"Text",      Hidden:1,  Width:80,	Align:"Right",    ColMerge:1,          SaveName:prefix+"cbmUnitCd",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""},
						 {Type:"Text",      Hidden:1,  Width:80,	Align:"Right",    ColMerge:1,          SaveName:prefix+"cbmUnitNm",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""},
			     		 {Type:"Text",      Hidden:1,  Width:80,	Align:"Right",    ColMerge:1,          SaveName:prefix+"lot_04_cbm_cd",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""},
			     		 {Type:"Text",      Hidden:1,  Width:80,	Align:"Right",    ColMerge:1,          SaveName:prefix+"lot_05_cbm_cd",    KeyField:0,        UpdateEdit:1,   InsertEdit:1,   Format:""}];
			 
			InitColumns(cols);
			SetSheetHeight(360);
			SetEditable(1);
//			SetWaitImageVisible(0);
			SetImageList(0,"js/ibsheet/Main/popup.gif");//search
			SetImageList(1,"web/img/main/close_off.gif");//clear
			SetImageList(2,"web/img/main/icon_m.gif");
			//SetColProperty(0, prefix+"item_pkgunit", {ComboText:handlingUnitText, ComboCode:handlingUnitCode} );
			//SetColProperty(0, prefix+"shp_pkgunit", {ComboText:handlingUnitText, ComboCode:handlingUnitCode} );
			SetColProperty(0, 	prefix+"item_nm",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
//			SetColProperty(0,	prefix + "item_cd",			{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			SetColProperty(0, prefix+"item_cd", {ComboText:"", ComboCode:""} );
			SetColProperty(0,	prefix + "lot_no",	{AcceptKeys:"E|N|" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
		 	SetColProperty(0, prefix+"lot_04",		{AcceptKeys:"E|N|" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
		 	SetColProperty(0, prefix+"lot_05",		{AcceptKeys:"E|N|" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
			SetColProperty(0,	prefix + "item_pkgunit",	{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			SetColProperty(0,	prefix + "fix_loc_nm",		{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			SetColProperty(0,	prefix + "sao_no",			{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			SetColProperty(0,	prefix + "curr_cd",			{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			SetColProperty(0,	prefix + "lic_plat_no",		{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			SetColProperty(0,	prefix + "item_ser_no",		{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			SetColProperty(0,	prefix + "po_no",		{AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
			SetColProperty(0, 	prefix+"eq_tpsz_cd",		{AcceptKeys:"E|N" , InputCaseSensitive:1});
		 	SetColProperty(0, 	prefix+"eq_no",				{AcceptKeys:"E|N" , InputCaseSensitive:1});
		 	SetColProperty(0, 	prefix+"seal_no",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
			SetColProperty(prefix+"curr_cd", {ComboText:"|"+currCdListText, ComboCode:"|"+currCdListCode} );
//			SetGetUnicodeByte(3);
//			SetHeaderRowHeight(18);
			InitComboNoMatchText(1, "",1);
			SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
			
			ShowSubSum([{StdCol:prefix+"item_cd", SumCols:prefix+"item_pkgqty|" + prefix+"item_ea_qty|" +  prefix+ "stock_qty|" + prefix+"shp_pkgqty|" + prefix+"shp_ea_qty|" + prefix+"item_cbm|" + prefix+"item_cbf|" + prefix+"item_grs_kgs|" 
				+ prefix+"item_grs_lbs|" + prefix+"item_net_kgs|" + prefix+"item_net_lbs|" + prefix+"unit_price"
				, ShowCumulate:0, CaptionCol:prefix+"item_nm", CaptionText: "Sub Total"}]);
		}
		break;		
	case "sheet3":
		with (sheetObj) {
			
			var hdr1="|Status|Doc No|Doc Type|Register ID|Register Date|Register System Date";
			var prefix=fix_grid03;
	
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
	
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:hdr1, Align:"Center"} ];
			InitHeaders(headers, info);
	
			var cols = [ {Type:"Status",    Hidden:1, Width:30,   Align:"Center",   SaveName:prefix+"ibflag" },
			             {Type:"Text",     Hidden:0,  Width:300,   Align:"Left",   ColMerge:1,   SaveName:prefix+"field_name",    KeyField:0,   UpdateEdit:0,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:300,   Align:"Center",   ColMerge:1,   SaveName:prefix+"field_val",    KeyField:0,   UpdateEdit:0,   Format:"" },
			             {Type:"Text",      Hidden:1, Width:10,   Align:"Left",   ColMerge:1,   SaveName:prefix+"doc_type",   Format:"" } 
			             
						,{Type:"Text",      Hidden:0, 	Width:300,   Align:"Center",   	SaveName:prefix+"rgst_id",		ColMerge:1,			KeyField:0, 	UpdateEdit:0,	Format:""}
						,{Type:"Text",      Hidden:0, 	Width:300,   Align:"Center",   	SaveName:prefix+"rgst_loc_dt",	ColMerge:1,			KeyField:0, 	UpdateEdit:0,	Format:"YmdHms"}
						,{Type:"Text",      Hidden:1, 	Width:300,   Align:"Center",   	SaveName:prefix+"rgst_sys_dt",	ColMerge:1,			KeyField:0, 	UpdateEdit:0,	Format:"YmdHms"}
			             ];
			 
			InitColumns(cols);
			SetSheetHeight(300);
			SetEditable(0);
//			SetRowHidden(0, 1);
//			SetWaitImageVisible(0);
//			SetGetCountPosition(0);
			SetHeaderRowHeight(30);
			SetDataRowHeight(20);
		}
		break;
	case "sheet4":      //IBSheet4 init
		with (sheetObj) {
		
			var prefix=fix_grid04;
	
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('WHOutMgmt_Sheet4_HDR1'), Align:"Center"} ];
			InitHeaders(headers, info);
	
			var cols = [ {Type:"Status",    Hidden:1, Width:30,   Align:"Center",   SaveName:prefix+"ibflag" },
			             //{Type:"CheckBox",  Hidden:1, Width:50,   Align:"Center",   ColMerge:1,   SaveName:prefix+"chk",    KeyField:0,   UpdateEdit:1,   Format:"" },
			             {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",   ColMerge:1,   SaveName:prefix+"seq",    KeyField:0,   UpdateEdit:0,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:800,   Align:"Left",   ColMerge:1,   SaveName:prefix+"file_org_nm",    KeyField:0,   UpdateEdit:0,   Format:"" },
			             {Type:"Date",     Hidden:0,  Width:80,   Align:"Center",   ColMerge:1,   SaveName:prefix+"upload_date",    KeyField:0,   UpdateEdit:0,   Format:"Ymd" },
			             {Type:"Int",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"file_size",    KeyField:0,   UpdateEdit:0,   Format:"Integer" },
			             {Type:"Text",      Hidden:1, Width:10,   Align:"Left",   ColMerge:1,   SaveName:prefix+"doc_no",   Format:"" },
			             {Type:"Text",      Hidden:1, Width:10,   Align:"Left",   ColMerge:1,   SaveName:prefix+"file_path",   Format:"" },
			             {Type:"Text",      Hidden:1, Width:10,   Align:"Left",   ColMerge:1,   SaveName:prefix+"file_sys_nm",   Format:"" },
			             {Type:"Text",      Hidden:1, Width:10,   Align:"Left",   ColMerge:1,   SaveName:prefix+"svc_tp_cd",   Format:"" },
			             {Type:"Text",      Hidden:1, Width:10,   Align:"Left",   ColMerge:1,   SaveName:prefix+"doc_ref_tp_cd",   Format:"" },
			             {Type:"Text",      Hidden:1, Width:10,   Align:"Left",   ColMerge:1,   SaveName:prefix+"doc_tp_cd",   Format:"" } ];
			 
			InitColumns(cols);
            SetSheetHeight(221);
			SetEditable(1);
//			SetWaitImageVisible(0);
//			SetGetCountPosition()(0);
//			SetHeaderGetRowHeight(18);
		}
		break;
	case "sheet5":      //IBSheet5 init
		with (sheetObj) {
		
			var prefix=fix_grid05;
	
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('WHOutMgmt_Sheet5_HDR1'), Align:"Center"},
			                { Text:getLabel('WHOutMgmt_Sheet5_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);
	
			var cols = [ {Type:"Text",      Hidden:1, Width:70,   Align:"Center",   ColMerge:1,   SaveName:prefix+"merge_key",    KeyField:1,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:68,   Align:"Center",   ColMerge:1,   SaveName:prefix+"wh_cd",    KeyField:1,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"cust_ord_no",    KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"",   EditLen:100},
			             {Type:"Text",     Hidden:0,  Width:75,   Align:"Center",   ColMerge:1,   SaveName:prefix+"ord_tp_cd",    KeyField:1,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:66,   Align:"Center",   ColMerge:1,   SaveName:prefix+"est_out_dt",    KeyField:1,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:36,   Align:"Center",   ColMerge:1,   SaveName:prefix+"est_out_hm",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Combo",    Hidden:0,  Width:60,   Align:"Center",   ColMerge:1,   SaveName:prefix+"bk_sts_cd",    KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",   ColMerge:1,   SaveName:prefix+"ctrt_no",    KeyField:1,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:140,   Align:"Left",   ColMerge:1,   SaveName:prefix+"ctrt_nm",    KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"buyer_addr1",    KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"buyer_addr2",    KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"buyer_addr3",    KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"buyer_addr4",    KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"buyer_addr5",    KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:50,   Align:"Center",   ColMerge:1,   SaveName:prefix+"eq_tpsz_cd",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"eq_no",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"seal_no",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"dlv_ord_no",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",   ColMerge:1,   SaveName:prefix+"load_tp_cd",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",   ColMerge:1,   SaveName:prefix+"trade_tp_cd",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",   ColMerge:1,   SaveName:prefix+"fwd_tp_cd",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:110,   Align:"Left",   ColMerge:1,   SaveName:prefix+"mbl_no",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:110,   Align:"Left",   ColMerge:1,   SaveName:prefix+"hbl_no",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:95,   Align:"Center",   ColMerge:1,   SaveName:prefix+"wob_bk_no",    KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",   ColMerge:1,   SaveName:prefix+"bk_date",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"ref_no",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"commc_inv_no",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"rmk",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",   ColMerge:1,   SaveName:prefix+"owner_cd",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"owner_addr1",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"owner_addr2",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"owner_addr3",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"owner_addr4",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"owner_addr5",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",   ColMerge:1,   SaveName:prefix+"vsl_cd",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"vsl_nm",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"voy",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",   ColMerge:1,   SaveName:prefix+"carrier_cd",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"carrier_nm",    KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",   ColMerge:1,   SaveName:prefix+"pol",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",   ColMerge:1,   SaveName:prefix+"pod",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",   ColMerge:1,   SaveName:prefix+"del",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",   ColMerge:1,   SaveName:prefix+"etd",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",   ColMerge:1,   SaveName:prefix+"eta",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:1,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"seq",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"item_cd",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:150,   Align:"Left",   ColMerge:1,   SaveName:prefix+"item_nm",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Center",   ColMerge:1,   SaveName:prefix+"lot_no",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:140,   Align:"Left",   ColMerge:1,   SaveName:prefix+"pkg_info",    KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:50,   Align:"Center",   ColMerge:1,   SaveName:prefix+"item_pkgunit",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_pkgqty",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT },
			             {Type:"Text",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_ea_qty",    KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT },
			             {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",   ColMerge:1,   SaveName:prefix+"fix_loc_nm",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:prefix+"stock_qty",    KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:WMS_QTY_FORMAT2,     PointCount:WMS_QTY_POINT },
			             {Type:"Text",     Hidden:0,  Width:125,   Align:"Left",   ColMerge:1,   SaveName:prefix+"wave_no",    KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",     PointCount:WMS_CBM_POINT_COUNT },
			             {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbf",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",     PointCount:WMS_CBM_POINT_COUNT },
			             {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_kgs",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",     PointCount:WMS_KGS_POINT },
			             {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_lbs",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",     PointCount:WMS_KGS_POINT },
			             {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_kgs",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",     PointCount:WMS_KGS_POINT },
			             {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_lbs",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",     PointCount:WMS_KGS_POINT },
			             {Type:"Text",     Hidden:0,  Width:120,   Align:"Center",   ColMerge:1,   SaveName:prefix+"fix_lot_id",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Date",     Hidden:0,  Width:72,   Align:"Center",   ColMerge:1,   SaveName:prefix+"inbound_dt",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Ymd" },
			             {Type:"Date",     Hidden:0,  Width:80,   Align:"Center",   ColMerge:1,   SaveName:prefix+"exp_dt",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Ymd" },
			             {Type:"Text",     Hidden:0,  Width:80,   Align:"Left",   ColMerge:1,   SaveName:prefix+"lot_04",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"",   EditLen:20 },
			             {Type:"Text",     Hidden:0,  Width:80,   Align:"Left",   ColMerge:1,   SaveName:prefix+"lot_05",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"",   EditLen:20 },
			             {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",   ColMerge:1,   SaveName:prefix+"sao_no",    KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",     Hidden:0,  Width:50,   Align:"Center",   ColMerge:1,   SaveName:prefix+"curr_cd",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"",   EditLen:20 },
			             {Type:"Text",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price",    KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",     PointCount:2 } ];
			 
			InitColumns(cols);
			SetSheetHeight(180);
			SetEditable(1);
			SetColProperty(prefix+"ord_tp_cd", {ComboText:ord_tp_cdText, ComboCode:ord_tp_cdCode} );
			SetColProperty(prefix+"load_tp_cd", {ComboText:load_tp_cdText, ComboCode:load_tp_cdCode} );
			SetColProperty(prefix+"trade_tp_cd", {ComboText:trade_tp_cdText, ComboCode:trade_tp_cdCode} );
			SetColProperty(prefix+"fwd_tp_cd", {ComboText:fwd_tp_cdText, ComboCode:fwd_tp_cdCode} );
			SetColProperty(prefix+"bk_sts_cd", {ComboText:"Initial|"+bk_sts_cdText, ComboCode:"N|"+bk_sts_cdCode} );
		}
		break;
	case "sheet6":      //Freight
		with (sheetObj) {
		
			var prefix=fix_grid06;
	
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('WHOutMgmt_Sheet6_HDR1'), Align:"Center"},
			                { Text:getLabel('WHOutMgmt_Sheet6_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);
			/*
			var cols = [ {Type:"Status",    Hidden:1,  Width:30,    Align:"Center",   				SaveName:prefix+"ibflag" },
			             {Type:"DelCheck",  Hidden:0,  Width:50,    Align:"Center",   ColMerge:1,   SaveName:prefix+"del",    				KeyField:0,   UpdateEdit:1,   Format:"" },
			             {Type:"Text",      Hidden:0,  Width:60,    Align:"Center",   ColMerge:1,   SaveName:prefix+"type",    				KeyField:0,   UpdateEdit:0,   Format:"" },
			             {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",     ColMerge:1,   SaveName:prefix+"billing_item_cd",  	KeyField:0,   UpdateEdit:0,   Format:"" },
			             {Type:"Text",      Hidden:0,  Width:250,    Align:"Center",   ColMerge:1,   SaveName:prefix+"billing_item_nm",  	KeyField:0,   UpdateEdit:0,   Format:"" },
			             {Type:"Text",      Hidden:0,  Width:80,    Align:"Right",    ColMerge:1,   SaveName:prefix+"unit1",    			KeyField:0,   UpdateEdit:0,   Format:"" },
			             {Type:"Text",      Hidden:0,  Width:80,    Align:"Left",     ColMerge:1,   SaveName:prefix+"unit2",   				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",      Hidden:0,  Width:80,    Align:"Left",     ColMerge:1,   SaveName:prefix+"curr",   				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Float",     Hidden:0,  Width:80,    Align:"Left",     ColMerge:1,   SaveName:prefix+"rate",  				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Float" },
			             {Type:"Int",       Hidden:0,  Width:80,    Align:"Left",     ColMerge:1,   SaveName:prefix+"qty",   				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Integer" },
			             {Type:"Text",      Hidden:0,  Width:150,    Align:"Left",     ColMerge:1,   SaveName:prefix+"amount",				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Float" },
			             {Type:"Text",      Hidden:0,  Width:80,    Align:"Left",     ColMerge:1,   SaveName:prefix+"item",  				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             {Type:"Text",      Hidden:0,  Width:150,    Align:"Left",     ColMerge:1,   SaveName:prefix+"closing_no",		 	KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:""},
			             {Type:"Date",      Hidden:0,  Width:150,    Align:"Left",     ColMerge:1,   SaveName:prefix+"closing_dt",			KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"mdy" },
			             {Type:"Text",      Hidden:0,  Width:150,    Align:"Left",     ColMerge:1,   SaveName:prefix+"inv_no",				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" }];
			InitColumns(cols);
            SetSheetHeight(221);
			SetEditable(1);
*/
			
			
			var cols = [ {Type:"Status",    Hidden:1,  Width:30,    Align:"Center",   				SaveName:prefix+"ibflag" },
			             {Type:"DelCheck",  Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del" },
//			             {Type:"DelCheck",   Hidden:0, 		Width:50       ,Align:"Center",         ColMerge:1,          SaveName:prefix+"row_del",            	KeyField:0,        UpdateEdit:0,   InsertEdit:0,   Format:""},
			             {Type:"Combo",      Hidden:0,  Width:100,    Align:"Center",   ColMerge:1,   SaveName:prefix+"rate_tp_cd",    				KeyField:1,   UpdateEdit:0,   Format:"" },
			             {Type:"Combo",      Hidden:0,  Width:120,   Align:"Center",     ColMerge:1,   SaveName:prefix+"frt_cd",  	KeyField:1,   UpdateEdit:0,   Format:"" },
			             {Type:"Text",      Hidden:0,  Width:250,    Align:"Left",   ColMerge:1,   SaveName:prefix+"frt_nm",  	KeyField:0,   UpdateEdit:0,   Format:"" },
			             {Type:"Combo",      Hidden:0,  Width:150,    Align:"Left",    ColMerge:1,   SaveName:prefix+"unit_cd",    			KeyField:1,   UpdateEdit:0,   Format:"" },
			             {Type:"Combo",      Hidden:0,  Width:100,    Align:"Center",     ColMerge:1,   SaveName:prefix+"unit_cd2",   				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"" },
			             /* #3306-[BINEX] [WMS4.0] CLOSING ENTRY TO HAVE CURRENCY COLUMN - Currency code 수정 불가 처리 */                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
			             {Type:"Combo",      Hidden:0,  Width:80,    Align:"Center",     ColMerge:1,   SaveName:prefix+"curr_cd",   				KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			             {Type:"Float",     Hidden:0,  Width:150,    Align:"Right",     ColMerge:1,   SaveName:prefix+"unit_price",  				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Float",			PointCount:vPointCount, EditLen:vEditLen  },
			             {Type:"Float",       Hidden:0,  Width:150,    Align:"Right",     ColMerge:1,   SaveName:prefix+"qty",   				KeyField:0,   UpdateEdit:0,   InsertEdit:1,   Format:"Float",			PointCount:5, EditLen:vEditLen },
			             {Type:"AutoSum",      Hidden:0,  Width:150,    Align:"Right",     ColMerge:1,   SaveName:prefix+"inv_amt",				KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:2, EditLen:vEditLen },
			             {Type:"Combo",      Hidden:0,  Width:120,    Align:"Center",     ColMerge:1,   SaveName:prefix+"item_cd",  				KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },	
			             /* #3388-[BINEX WMS4.0] RATE IN & OUT MINIMUM CHARGE - Vien.Cao */ 
			             {Type:"Text",      Hidden:0,  Width:150,    Align:"Left",     ColMerge:1,   SaveName:prefix+"rmk",				KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" , EditLen:100},			             
			             {Type:"Text",      Hidden:0,  Width:120,    Align:"Left",     ColMerge:1,   SaveName:prefix+"cls_no",		 	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:""},
			             {Type:"Date",      	Hidden:0,  	Width:120,    	Align:"Center",     	ColMerge:1,   	SaveName:prefix+"cls_dt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
			             {Type:"Text",      Hidden:0,  Width:120,    Align:"Left",     ColMerge:1,   SaveName:prefix+"inv_no",				KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
						 {Type:"Text", 		Hidden:1, 	Width:120,   Align:"Center",       	ColMerge:1,       SaveName:prefix+"wh_cd",         		KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						 {Type:"Text",     	Hidden:1,  	Width:100,   Align:"Left",         	ColMerge:1,       SaveName:prefix+"wob_bk_no",    	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:"",        EditLen:100},
						 {Type:"Text",     	Hidden:1,  	Width:100,   Align:"Left",         	ColMerge:1,       SaveName:prefix+"cust_ord_no",    	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:"",        EditLen:100},
						 {Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"ctrt_no",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"ofc_cd",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Float",      Hidden:1,  Width:150,    Align:"Right",     ColMerge:1,   SaveName:prefix+"inv_ttl_amt",				KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:5, EditLen:vEditLen },
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"sell_buy_tp_cd",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"frt_seq",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"cust_cd",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"wib_bk_frt_seq",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"rating_flg",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text", 		Hidden:1, 	Width:80,    Align:"Center",       	ColMerge:1,       SaveName:prefix+"sts_cd",         	KeyField:0,      PointCount:0,     UpdateEdit:0,            InsertEdit:0,           Format:""},
						{Type:"Text",      Hidden:1,  Width:120,    Align:"Left",     ColMerge:1,   SaveName:prefix+"inv_seq",				KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" }];
			 
			InitColumns(cols);
            SetSheetHeight(450);
			SetEditable(1);
//			SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
			SetColProperty(prefix+"frt_cd", {ComboCode:FreightCode, ComboText:FreightText} );
			SetColProperty(prefix+"rate_tp_cd",{ComboText:" |"+rate_tp_cdText, ComboCode:" |"+rate_tp_cdCode});
			SetColProperty(prefix+"unit_cd",{ComboText:"|# of License Plate|Property of License Plate|Container|Truck|Handling Unit|Package Unit|Order|Hour", ComboCode:"|LPN|LPP|CNT|TRK|HUT|PUT|ODR|HOR"});
			SetColProperty(prefix+"curr_cd", {ComboText:'|'+currCdListText, ComboCode:'|'+currCdListCode} );
			SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		}
		break;
	}
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet2_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.form;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
} 

/**
 * Sheet6의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet6_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.form;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
} 
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
function comboAddItem(sComboId, itemNm, itemCd){
	
	var comboObj = document.getElementById(sComboId);
	
	var option =  document.createElement("option");
	
	option.text = itemNm;
	option.value = itemCd;
	
	comboObj.add(option);
}

function comboRemoveAll(sComboId){
	
	var comboObj = document.getElementById(sComboId);
	
	var len = comboObj.length;
	
	for(var i = len -1 ; i >= 0 ; i--){
		comboObj.remove(i);
	}
}

function comboFindItemByName(sComboId, sName){
	var comboObj = document.getElementById(sComboId);
	
	var len = comboObj.length;
	
	for(var i = len -1 ; i >= 0 ; i--){
		if(comboObj.options[i].text == sName){
			return i;
		}
	}
	
	return -1;
}
function initCombo(comboObj) {
	var formObj = document.form;
	var i=0;
	var vTextSplit=null;
	var vCodeSplit=null;
	switch(comboObj) { 	
		case "list_bk_sts_cd":
			vTextSplit=bk_sts_cdText.split("|");
			vCodeSplit=bk_sts_cdCode.split("|");
			comboAddItem(comboObj,  "ALL", "ALL");	
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
				if(vCodeSplit[j] == "I")
				{
					bk_sts_I=vTextSplit[j];
				}
				else if(vCodeSplit[j] == "P")
				{
					bk_sts_P=vTextSplit[j];
				}
				else if(vCodeSplit[j] == "A")
				{
					bk_sts_A=vTextSplit[j];
				}
				else if(vCodeSplit[j] == "X")
				{
					bk_sts_X=vTextSplit[j];
				}
			}
			comboObj.index=0;
			break;
		case "list_in_search_tp":
			var txt="Order No|Booking No";
			var val="CUST_ORD_NO|WOB_BK_NO";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.index=0;
			break;
		case "list_in_date_tp":
			var txt="Estimated Date|Booking Date|Create Date";
			var val="EST_OUT_DT|BK_DATE|RGST_LOC_DT";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.index=0;
			break;
		case "list_ord_tp_cd":
			vTextSplit=ord_tp_cdText.split("|");
			vCodeSplit=ord_tp_cdCode.split("|");				
			comboAddItem(comboObj,  "ALL", "ALL");
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.index=0;
			break;
		case "ord_tp_cd":
			vTextSplit=ord_tp_cdText.split("|");
			vCodeSplit=ord_tp_cdCode.split("|");				
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.index=0;
			break;
		case "load_tp_cd":
			vTextSplit=load_tp_cdText.split("|");
			vCodeSplit=load_tp_cdCode.split("|");				
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.index=0;
			break;
		case "fwd_tp_cd":
			vTextSplit=fwd_tp_cdText.split("|");
			vCodeSplit=fwd_tp_cdCode.split("|");				
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.index=0;
			break;
		case "trade_tp_cd":
			vTextSplit=trade_tp_cdText.split("|");
			vCodeSplit=trade_tp_cdCode.split("|");				
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(comboObj,  vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.index=0;
			break;
	}
} 
 /*
  * sheet1 searchend event
  */
 function sheet1_OnSearchEnd(sheetObj){
 	//var sheetObj = sheet1;//sheetObjects[0];
	 for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
 		//UNLOADING SHEET ICON
		//ISSU상태에서는 WORK SHT작성 못함. 할당이 된 후 가능. 할당되더라도 wave_no없으면 불가
		 if (sheetObj.GetCellValue(i, fix_grid01 + "work_sht_yn") =="Y")
 		{
			sheetObj.SetCellImage(i, fix_grid01 + "work_sht",0);
 		}
 		else
		{
 			sheetObj.SetCellImage(i, fix_grid01 + "work_sht",1);
		}
		 sheetObj.SetCellImage(i, fix_grid01 + "buyer_loc",2);
 		//폰트색상 변경
		sheetObj.SetCellFontColor(i, fix_grid01 + "wob_bk_no","#0100FF");
		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wob_bk_no", 1);
		if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd")  == "N") //Inital
		{
			sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",1);
			sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",1);
			sheetObj.SetCellEditable(i, fix_grid01 + "trade_tp_cd",1);
			sheetObj.SetCellEditable(i, fix_grid01 + "fwd_tp_cd",1);
			sheetObj.SetCellEditable(i, fix_grid01 + "est_out_dt",1);
			if(sheetObj.GetCellValue(i, fix_grid01 + "trade_tp_cd").trim() == "")
			{
				sheetObj.SetCellValue(i, fix_grid01 + "trade_tp_cd","DOM",0);
			}
			if(sheetObj.GetCellValue(i, fix_grid01 + "fwd_tp_cd").trim() == "")
			{
				sheetObj.SetCellValue(i, fix_grid01 + "fwd_tp_cd","OTH",0);
			}
		}
		else if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd")  == "I") //BOOKED상태
		{
			sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",1);
			sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",1);
			sheetObj.SetCellEditable(i, fix_grid01 + "est_out_dt",1);
		}
 	}
	sheetObj.SetColBackColor(fix_grid01 + "work_sht",sheetObj.GetEditableColor());
	if($("#uploadfile").val().trim() == "T" && $("#fwd_bk_no").val().trim() != "")
	{
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(i, fix_grid01 + "wob_bk_no").trim() == $("#fwd_bk_no").val().trim()){
				sheet1_OnDblClick(sheetObj,i,sheetObj.SaveNameCol(fix_grid01 + "wob_bk_no"), sheetObj.GetCellValue(i, fix_grid01 + "wob_bk_no"));
				sheetObj.SelectCell(i, sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"));
				$("#uploadfile").val("");
				$("#fwd_bk_no").val("");
				goTabSelect("04");
				return;
			}
		}
	}
	if(sheetObj.RowCount()> 0)
	{
		 sheet1_OnDblClick(sheetObj,sheetObj.HeaderRows(), sheetObj.SaveNameCol(fix_grid01 + "wob_bk_no"), sheetObj.GetCellValue(sheetObj.HeaderRows(), fix_grid01 + "wob_bk_no"));
		 sheet2_OnSearchEnd(sheet2);
		 sheetObj.SelectCell(sheetObj.HeaderRows(), sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"));
	}
	else{
		//SHEET ADD 기본셋팅
		//default1RowAdd();
		$("#form_mode").val("NEW");
	}
 }
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	var sUrl="";
	with(sheetObj)
	{
		if(colName == fix_grid01 + "ctrt_no")
		{
			if(sheet2.RowCount()> 0)
			{
				//confirm
				if(ComShowCodeConfirm("COM0294") == false)
				{
					sheetObj.SetCellValue(Row, Col,sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no_org"),0);
					return;
				}
				//SHEET 초기화
				sheet2.RemoveAll();
			}
			var ord_tp_lvl1_cd="\'P\'";
			var pnl_svc_tp_cd="44";
		   	var sUrl="./ContractRoutePopup.clt?ctrt_no=" + "&ord_tp_lvl1_cd="+ord_tp_lvl1_cd + "&pnl_svc_tp_cd=" + pnl_svc_tp_cd;
		   	callBackFunc = "setContactInfoGrid";
			modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
		}				
		else if ( colName == fix_grid01 + "eq_tpsz_cd" ) 
		{
			var tp="A";
			if(sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd")) != "")
			{
				tp=sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd"));
			}
			callBackFunc = "setTruckTypeInfoGrid";
		    modal_center_open('./ContainerTypePopup.clt?type=' + tp + '&eq_unit='+sheetObj.GetCellValue(Row, Col), rtnary, 400, 590,"yes");
		}
		else if (colName == fix_grid01 + "seal_no")
		{
			ComShowMemoPad3(sheetObj, Row, Col, false, 300, 82,  Col, Col);      
		}
		else if (colName == fix_grid01 + "rmk")
		{
			ComShowMemoPad4(sheetObj, Row, Col, false, 200, 100,Col, Col);
		}
		else if(colName == fix_grid01 + "owner_cd")
		{
			var funName="";
			funName="setOwnerInfoGrid";
			rtnary=new Array(2);
			rtnary[0]="1";
			// 2011.12.27 value parameter
			rtnary[0]="";
			// 2011.12.27 value parameter
			rtnary[1]="";
			rtnary[2]=window;
			callBackFunc = funName;
			modal_center_open('./CMM_POP_0010.clt?callTp='+"", rtnary, 1150,650,"yes");
			
			//CustomerGridPopup("owner_cd", sheetObj, Row, Col, fix_grid01);
		}
		else if(colName == fix_grid01 + "buyer_cd")
		{
			var funName="";
			funName = "setShipperInfoGrid";
			rtnary=new Array(2);
			rtnary[0]="1";
			// 2011.12.27 value parameter
			rtnary[0]="";
			// 2011.12.27 value parameter
			rtnary[1]="";
			rtnary[2]=window;
			callBackFunc = funName;
			modal_center_open('./CMM_POP_0010.clt?callTp='+"", rtnary, 1150,650,"yes");
			
			//CustomerGridPopup("buyer_cd", sheetObj, Row, Col, fix_grid01);
		}
		else if(colName == fix_grid01 + "vsl_cd")
		{
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		// 2011.12.27 value parameter
	   		if(sheetObj.GetCellValue(Row, Col)!= ""){
	   			rtnary[1]="";
	   			rtnary[2]="";
	   			
	   			//rtnary[1]=sheetObj.GetCellValue(Row, Col+1);
	   			//rtnary[2]=sheetObj.GetCellValue(Row, Col);
	   		}else{
	   			rtnary[1]="";
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "setVslInfoGrid";
			modal_center_open('./CMM_POP_0140.clt', rtnary, 656,450,"yes");
		}
		else if(colName == fix_grid01 + "carrier_cd")
		{
			var funName="";
			funName="setCarrierInfoGrid";
			rtnary=new Array(2);
			rtnary[0]="1";
			// 2011.12.27 value parameter
			rtnary[0]="";
			// 2011.12.27 value parameter
			rtnary[1]="";
			rtnary[2]=window;
			callBackFunc = funName;
			modal_center_open('./CMM_POP_0010.clt?callTp='+"", rtnary, 1150,650,"yes");
			//CustomerGridPopup("carrier_cd", sheetObj, Row, Col, fix_grid01);
		}
		else if (colName == fix_grid01 + "pod")
		{
			podGridPopup("pod", sheetObj, Row, Col, fix_grid01);
		}
		else if (colName == fix_grid01 + "pol")
		{
			podGridPopup("pol", sheetObj, Row, Col, fix_grid01);
		}
		else if (colName == fix_grid01 + "del")
		{
			podGridPopup("del", sheetObj, Row, Col, fix_grid01);
		}
		else if(colName == fix_grid01 + "owner_addr2")
		{
			ComShowMemoPad4(sheetObj, Row, fix_grid01 + "owner_addr2", false, 185, 90, Col,  Col, fix_grid01 + "owner_addr1");      
		}
		else if(colName == fix_grid01 + "buyer_addr1")
		{
			ComShowMemoPad4(sheetObj, Row, fix_grid01 + "buyer_addr1", false, 185, 90, Col,  Col, fix_grid01 + "buyer_addr1");      
		}
	}
}
var col_nm = "";
function sheet1_OnChange(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	col_nm = colStr;
	if(colStr == fix_grid01 + "wh_cd")
	{
		if(sheet2.RowCount()> 0)
		{
			//confirm
			if(ComShowCodeConfirm("COM0294") == false)
			{
				sheetObj.SetCellValue(Row, Col,sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd_org"),0);
				return;
			}
			//SHEET 초기화
			sheet2.RemoveAll();
		}
		if(Value != "")
		{
//			ajaxSendPost(resultLocNm, col, '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+Value, './GateServlet.gsl');
//			var sXml=sheet1.GetSearchData("searchTlLocInfo.clt?loc_cd=" + Value + "&type=WH&wh_auth=Y");
//			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
//				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
//				sheetObj.SelectCell(Row, Col);
//			}
//			sheetObj.SetCellValue(Row, Col,getXmlDataNullToNullString(sXml,'loc_cd'),0);
//			sheetObj.SetCellValue(Row, fix_grid01 + "wh_nm",getXmlDataNullToNullString(sXml,'loc_nm'),0);
//			sheetObj.SetCellValue(Row, fix_grid01 + "wh_cd_org",getXmlDataNullToNullString(sXml,'loc_cd'),0);
//			sheetObj.SetCellValue(Row, fix_grid01 + "ctrt_no",getXmlDataNullToNullString(sXml,'wh_ctrt_no'));
//			if(getXmlDataNullToNullString(sXml,'ob_ord_tp_cd') != "")
//			{
//				sheetObj.SetCellValue(Row, fix_grid01 + "ord_tp_cd",getXmlDataNullToNullString(sXml,'ob_ord_tp_cd'));
//			}
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "wh_nm","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "wh_cd_org","",0);
		}
	}
	else if(colStr == fix_grid01 + "ctrt_no")
	{
		if(sheet2.RowCount()> 0)
		{
			//confirm
			if(ComShowCodeConfirm("COM0294") == false)
			{
				sheetObj.SetCellValue(Row, Col,sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no_org"),0);
				return;
			}
			//SHEET 초기화
			sheet2.RemoveAll();
		}
		if(Value != "")
		{
			var ord_tp_lvl1_cd="\'P\'";
			var pnl_svc_tp_cd="44";
			var params = "ctrt_no=" + Value + "&ord_tp_lvl1_cd=" + ord_tp_lvl1_cd + "&pnl_svc_tp_cd=" + pnl_svc_tp_cd;
			ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo'+'&'+params, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "ctrt_nm","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "rtp_no","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "ctrt_no_org","",0);
		}
	}
	else if(colStr == fix_grid01 + "eq_tpsz_cd") 
	{
		if(Value != "")
		{
			var sParam="cntr_tp="+Value;
			ajaxSendPost(rtn_searchEqType, Row, '&goWhere=aj&bcKey=searchCntrTrTp&'+sParam, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01+"eq_tp_cd","");
		}
	}
	else if(colStr == fix_grid01 + "owner_cd")
	{
		searchTlCustInfoGrid("owner", Value, sheetObj, Row, fix_grid01);
	}
	else if(colStr == fix_grid01 + "buyer_cd")
	{
		searchTlCustInfoGrid("buyer", Value, sheetObj, Row, fix_grid01);
	}
	else if(colStr == fix_grid01 + "carrier_cd")
	{
		searchTlCustInfoGrid("carrier", Value, sheetObj, Row, fix_grid01);
	}
	else if(colStr == fix_grid01 + "vsl_cd")
	{
		if(Value != "")
		{
			ajaxSendPost(setVslInfoAjax, 'reqVal', '&goWhere=aj&bcKey=searchTlVslInfo&code='+Value, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "vsl_nm","",0);
		}
	}
	else if (colStr== fix_grid01 + "pod" || colStr== fix_grid01 + "pol" || colStr== fix_grid01 + "del")
	{
		if(Value != "")
		{
			ajaxSendPost(setGridTlLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=Location&s_code='+Value, './GateServlet.gsl');
		}
	}	
	else if(colStr ==fix_grid01 + "work_sht_yn")
	{
		if (Value =="Y")
		{
			sheetObj.SetCellImage(Row, fix_grid01 + "work_sht",0);
		}
		else
		{
			sheetObj.SetCellImage(Row, fix_grid01 + "work_sht",1);
		}
	}
}
function setVslInfoAjax(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "vsl_nm",rtnArr[0],0);
			}
			else{
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "vsl_cd","",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "vsl_nm","",0);
			}
		}
		else{
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "vsl_cd","",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "vsl_nm","",0);
		}
	}
}
function setGridTlLocInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');	
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), col_nm, masterVals[0],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), col_nm + "_nm",masterVals[3],0);
		}else{
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), col_nm, "",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), col_nm + "_nm","",0);
			sheetObj.SelectCell(sheetObj.GetSelectRow(), col_nm);
		}
	}
}
function rtn_searchEqType(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"eq_tpsz_cd",rtnArr[0],0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"eq_tp_cd",rtnArr[2],0);
			}else{
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"eq_tpsz_cd","",0);
				sheetObj.SelectCell(sheetObj.GetSelectRow(), fix_grid01+"eq_tpsz_cd");
			}
		}
	}
}
function setTlCtrtInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			var rtnArr=doc[1].split('^@');
			
			if(rtnArr[1]!=""){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no",rtnArr[1],0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no_org",rtnArr[1],0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_nm",rtnArr[0],0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "rtp_no",rtnArr[2],0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "owner_cd",rtnArr[7],0);
				searchTlCustInfoGrid("owner", rtnArr[7], sheetObj, sheetObj.GetSelectRow(), fix_grid01);
			}else{
				sheetObj.SelectCell(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no");
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no","",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_nm","",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no_org","",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "rtp_no","",0);
				return;
			}
		}
		else{
			sheetObj.SelectCell(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no");
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no","",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_nm","",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no_org","",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "rtp_no","",0);
			return;
		}
	}
	else{
		sheetObj.SelectCell(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no","",0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_nm","",0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no_org","",0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "rtp_no","",0);
		return;
	}
}
/*
 * sheet1의 MouseDown 이벤트
 */
function sheet1_OnMouseDown(sheetObj,Button, Shift, X, Y)
{
	if(sheetObj.MouseRow()<= 1 && sheetObj.MouseCol()== sheetObj.SaveNameCol(fix_grid01 + "row_add")) //header 선택시. header row -> 0,1
	{
		var row=sheet1RowAdd(sheetObj);
		if(row > 0)
		{
			setTimeout("setSheet1Focus('" + row + "')", 100); //1000(1초)  100(0.1초)
		}
	}
}
function setSheet1Focus(row)
{
	var sheetObj=sheet1;
	sheetObj.SelectCell(row, fix_grid01 + "cust_ord_no");
	resetAll(false,true);
    //선택된 행 색상 변경
	selectCellColorChange(sheetObj, row);
}
/*
 * sheet1의 OnClick 이벤트
 */
function sheet1_OnClick(sheetObj,Row, Col, Value){
	if(Col == sheetObj.SaveNameCol(fix_grid01 + "row_add"))	{
		var row=sheet1RowAdd(sheetObj);
		if(row > 0)
		{
			sheetObj.SelectCell(row, fix_grid01 + "cust_ord_no");
			//resetAll(false,true);
		    //선택된 행 색상 변경
			selectCellColorChange(sheetObj, row);
		}
	}
	else if(Col == sheetObj.SaveNameCol(fix_grid01 + "row_del"))
	{
		sheet1RowDel(sheetObj, Row);
	}
	else if(Col == sheetObj.SaveNameCol(fix_grid01 + "work_sht"))
	{
		if(sheetObj.GetRowStatus(Row) != "I")
		{
			WorkShtPopup(sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no"));
		}
	}
	else if(Col == sheetObj.SaveNameCol(fix_grid01 + "buyer_loc"))
	{
		CustomerLocationGridPopup("buyer_cd", sheetObj, Row, Col, fix_grid01);
	}
}
function sheet1RowAdd_OnClick(){
	var sheetObj = sheet1;
	var row=sheet1RowAdd(sheetObj);
	if(row > 0)
	{
		sheetObj.SelectCell(row, fix_grid01 + "cust_ord_no");
		//resetAll(false,true);
	    //선택된 행 색상 변경
		selectCellColorChange(sheetObj, row);
	}
}
function sheet1RowAdd(sheetObj)
{
	if(sheetObj.RowCount("I") >= 1)
	{
		return -1;
	}
	var row=sheetObj.DataInsert(sheetObj.RowCount()+ 2);
	resetAll(false,true);
	sheet1RowAddProcess(sheetObj, row);
	return row;
}
function sheet1RowAdd2(sheetObj)
{
	if(sheetObj.RowCount("I") >= 1)
	{
		return -1;
	}
	var row=sheetObj.DataInsert(sheetObj.RowCount()+ 1);
	sheet1RowAddProcess(sheetObj, row);
	return row;
}
function sheet1RowAddProcess(sheetObj, row)
{
	sheetObj.SetCellValue(row, fix_grid01 + "row_add","",0);
	sheetObj.SetCellValue(row, fix_grid01 + "row_del","-",0);
	sheetObj.SetCellValue(row, fix_grid01 + "bk_sts_cd","N",0);
	sheetObj.SetCellValue(row, fix_grid01 + "wh_cd",$("#list_wh_cd").val(),0);
	sheetObj.SetCellValue(row, fix_grid01 + "wh_nm",$("#list_wh_nm").val(),0);
	if($("#def_ord_tp_cd").val() != "")
	{
		sheetObj.SetCellValue(row, fix_grid01 + "ord_tp_cd",$("#def_ord_tp_cd").val());
	}
	if($("#list_rtp_no").val() != "")
	{
		sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no",$("#list_ctrt_no").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "ctrt_nm",$("#list_ctrt_nm").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "rtp_no",$("#list_rtp_no").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "owner_cd",$("#list_owner_cd").val());
	}
	else
	{
		sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no",$("#list_ctrt_no").val());
	}
	sheetObj.SetCellValue(row, fix_grid01 + "bk_date",ComGetNowInfo(),0);
	sheetObj.SetCellValue(row, fix_grid01 + "wh_cd_org",$("#list_wh_cd").val(),0);
	sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no_org",$("#list_ctrt_no").val(),0);
	sheetObj.SetCellValue(row, fix_grid01 + "trade_tp_cd","DOM",0);
	sheetObj.SetCellValue(row, fix_grid01 + "fwd_tp_cd","OTH",0);
	sheetObj.SetCellImage(row, fix_grid01 + "buyer_loc",2);
}
function sheet1RowDel(sheetObj, Row)
{
if(sheetObj.GetRowStatus(Row) == "I")
	{
		sheetObj.RowDelete(Row, false);
		sheet2.RemoveAll();
	}
}
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	var sRow=sheetObj.FindStatusRow("I");
	if(sRow != "" && Row!= sRow)
	{
		if(ComShowCodeConfirm("COM12152","Data") == true){
			saveFlg = "Grid";
			btn_Save();
			return;
		}else{
			sheetObj.RowDelete(sRow,false);
		}
	
	}
	if((colStr == fix_grid01 + "wob_bk_no" || colStr == fix_grid01 + "wh_cd" || colStr == fix_grid01 + "ord_tp_cd"
		 || colStr == fix_grid01 + "est_out_dt" || colStr == fix_grid01 + "bk_sts_cd"
		  || colStr == fix_grid01 + "ctrt_no" || colStr == fix_grid01 + "ctrt_nm"
		 ) && sheetObj.GetCellEditable(Row, Col) == false)
	{
		selectCellColorChange(sheetObj, Row);
		if(sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no").trim() != "")
		{
			searchBookingData(sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no"), sheetObj.GetCellValue(Row, fix_grid01 + "cust_ord_no"), sheetObj.GetCellValue(Row, fix_grid01 + "wave_no"));
			goTabSelect("01");
		}
		else
		{
			if($("#form_mode").val() == "NEW")
			{
				//skip
			}
			else
			{
				resetAll(false, true);
			}
		}
	}
}
function selectCellColorChange(sheetObj, Row)
{
	var selected_color="#dfdfff";
	//선택된 행 색상 변경
	var col_name1="chk|row_add|row_del|ctrt_nm";
	var col_name1_arr=col_name1.split("|");
	for(var i=0; i<col_name1_arr.length; i++)
	{
		sheetObj.SetCellBackColor(Row, fix_grid01 + col_name1_arr[i],selected_color);
	}
	sheetObj.SetCellBackColor(Row, fix_grid01 + "work_sht",selected_color);
	var col_name2="wh_cd|ord_tp_cd|est_out_dt|ctrt_no";
	var col_name2_arr=col_name2.split("|");
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.HeaderRows()+sheetObj.RowCount();i++){
		if(Row != i && sheetObj.GetCellBackColor(i, fix_grid01 + "bk_sts_cd") == selected_color)//선택되지않은Row중 selected로 색상변해있는 row를 초기상태로 변경한다.
		{
			if(sheetObj.GetCellBackColor(i, fix_grid01 + "bk_sts_cd") == selected_color){
				for(var m=0; m<col_name2_arr.length; m++)
				{
					var cell_editable=sheetObj.GetCellEditable(i, fix_grid01 + col_name2_arr[m]);
					if(cell_editable == true)
					{
						sheetObj.SetCellBackColor(i, fix_grid01 + col_name2_arr[m],sheetObj.GetEditableColor());
					}
					else
					{
						sheetObj.SetCellBackColor(i, fix_grid01 + col_name2_arr[m],sheetObj.GetUnEditableColor());
					}
				}
			}
			for(var j=0; j<col_name1_arr.length; j++)
			{
				sheetObj.SetCellBackColor(i, fix_grid01 + col_name1_arr[j],sheetObj.GetUnEditableColor());
			}
			sheetObj.SetCellBackColor(i, fix_grid01 + "work_sht",sheetObj.GetEditableColor());
			sheetObj.SetCellBackColor(i, fix_grid01 + "bk_sts_cd",sheetObj.GetUnEditableColor());
			
		}else if(Row == i){//선택된Row
			for(var m=0; m<col_name2_arr.length; m++)
			{
				var cell_editable=sheetObj.GetCellEditable(i, fix_grid01 + col_name2_arr[m]);
				if(cell_editable == true)
				{
					sheetObj.SetCellBackColor(i, fix_grid01 + col_name2_arr[m],sheetObj.GetEditableColor());
				}
				else
				{
					sheetObj.SetCellBackColor(i, fix_grid01 + col_name2_arr[m],selected_color);
				}
			}
		}
	}
	sheetObj.SetCellBackColor(Row, fix_grid01 + "bk_sts_cd",selected_color);
}

function sheet2_OnSaveEnd(sheetObj){
	// Freight Tab SAVE관련 FLAG
	l_btn_rateFlg = false;
	sheetObj.InitComboNoMatchText(1, "",1);
	// Sub Total
	sheet2.ShowSubSum([{StdCol:fix_grid02+"item_cd", SumCols:fix_grid02+"item_pkgqty|" + fix_grid02+"item_ea_qty|" + fix_grid02+"shp_pkgqty|" + fix_grid02+"shp_ea_qty|" + fix_grid02+"item_cbm|" + fix_grid02+"item_cbf|" + fix_grid02+"item_grs_kgs|" 
		+ fix_grid02+"item_grs_lbs|" + fix_grid02+"item_net_kgs|" + fix_grid02+"item_net_lbs|" + fix_grid02+"unit_price"
		, ShowCumulate:0, CaptionCol:fix_grid02+"item_nm", CaptionText: "Sub Total"}]);

	var formObj = document.form;
	
	if ( sheetObj.RowCount() > 0 ) {
		// Complete인 경우만 오픈
		if (formObj.bk_sts_cd.value == "X") {
			formObj.btn_rating.disabled = false;
			formObj.btn_frtAdd.disabled = false;
		} else {
			formObj.btn_rating.disabled = true;
			formObj.btn_frtAdd.disabled = true;
		}
		
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
		//항상 오픈
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked" - Optionized needed
		if (opt_chk == "Y"){
			formObj.btn_frtAdd.disabled = false;
			formObj.btn_rating.disabled = false;
		}	
	}
	
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if (formObj.bk_sts_cd.value == "X") {
			sheetObj.SetCellEditable(i, fix_grid02 + "item_cd",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_nm",0);
		} else {
			sheetObj.SetCellEditable(i, fix_grid02 + "item_cd",1);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_nm",1);
		}
		// OFVFOUR-8145 [MTS] Quantity of Items show negative number on Closing Storage Entry
		sheetObj.SetCellEditable(i, fix_grid02 + "item_nm",0);
	}
}

function sheet2_OnSearchEnd(sheetObj){
	var formObj = document.form;
	sheetObj.InitComboNoMatchText(1, "",1);
	
	// Status Code가 Booked 인경우
	if (formObj.bk_sts_cd.value == "I") {
		formObj.btn_cancel.style.display = "none";
		formObj.btn_delete.style.display = "";
	} else {
		formObj.btn_cancel.style.display = "";
		formObj.btn_delete.style.display = "none";
	}
	
	// SKU ComboList조회
	//var selRow=sheet1.GetSelectRow();
	var p_ctrt_no = $("#ctrt_no").val();/*sheet1.GetCellValue(selRow, fix_grid01 + "ctrt_no")*/
	var p_wh_cd = $("#wh_cd").val();/*sheet1.GetCellValue(selRow, fix_grid01 + "wh_cd")*/
//	sheet2Row = row;
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');
	
	if ( sheetObj.RowCount() > 0 ) {
		// Complete인 경우만 오픈
		if (formObj.bk_sts_cd.value == "X") {
			formObj.btn_rating.disabled = false;
			formObj.btn_frtAdd.disabled = false;
		} else {
			formObj.btn_rating.disabled = true;
			formObj.btn_frtAdd.disabled = true;
		}
		
		
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
		//항상 오픈
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked" - Optionized needed
		if (opt_chk == "Y"){
			formObj.btn_frtAdd.disabled = false;
			formObj.btn_rating.disabled = false;
		}		
	}
	
	
	sheetObj.RenderSheet(0);
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		
		if(	i <	sheetObj.LastRow()){
	 		sheetObj.CellComboItem(i,fix_grid02+"item_pkgunit",	{ComboText:sheetObj.GetCellValue(i,fix_grid02+"cbmUnitNm"), ComboCode: sheetObj.GetCellValue(i,fix_grid02+"cbmUnitCd")} );
	 		sheetObj.CellComboItem(i,fix_grid02+"shp_pkgunit",	{ComboText:sheetObj.GetCellValue(i,fix_grid02+"cbmUnitNm"), ComboCode: sheetObj.GetCellValue(i,fix_grid02+"cbmUnitCd")} );
	 		sheetObj.CellComboItem(i,fix_grid02+"lot_04",		{ComboText:sheetObj.GetCellValue(i,fix_grid02+"lot_04_cbm_cd"), ComboCode: sheetObj.GetCellValue(i,fix_grid02+"lot_04_cbm_cd")} );
	 		sheetObj.CellComboItem(i,fix_grid02+"lot_05",		{ComboText:sheetObj.GetCellValue(i,fix_grid02+"lot_05_cbm_cd"), ComboCode: sheetObj.GetCellValue(i,fix_grid02+"lot_05_cbm_cd")} );
 		}
		
		if(sheetObj.GetCellValue(i, fix_grid02 + "bk_sts_cd") == "I") //LOC, LOT정보 수정가능
		{
			sheetObj.SetCellEditable(i, fix_grid02 + "fix_loc_nm",1);
			if(sheetObj.GetCellValue(i, fix_grid02 + "fix_lot_id") != "")
			{
				sheetObj.SetCellEditable(i, fix_grid02 + "fix_lot_id",1);
				sheetObj.SetCellEditable(i, fix_grid02 + "lot_no",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "inbound_dt",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "exp_dt",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "lot_04",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "lot_05",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "lic_plat_no",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "item_ser_no",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "po_no",0);
				sheetObj.PopupButtonImage(i, fix_grid02 + "fix_lot_id", 0);
				sheetObj.SetCellImage(i, fix_grid02 + "fix_lot_id_img", 1);
			}
			else
			{
				sheetObj.SetCellEditable(i, fix_grid02 + "fix_lot_id",1);
				sheetObj.SetCellEditable(i, fix_grid02 + "lot_no",1);
				sheetObj.SetCellEditable(i, fix_grid02 + "inbound_dt",1);
				sheetObj.SetCellEditable(i, fix_grid02 + "exp_dt",1);
				sheetObj.SetCellEditable(i, fix_grid02 + "lot_04",1);
				sheetObj.SetCellEditable(i, fix_grid02 + "lot_05",1);
				sheetObj.SetCellEditable(i, fix_grid02 + "lic_plat_no",1);
				sheetObj.SetCellEditable(i, fix_grid02 + "item_ser_no",1);
				sheetObj.SetCellEditable(i, fix_grid02 + "po_no",1);
				sheetObj.SetCellImage(i, fix_grid02 + "fix_lot_id_img", 0);
			}
			sheetObj.SetCellImage(i, fix_grid02 + "seal_img", 2);
			sheetObj.SetCellBackColor(i, fix_grid02 + "fix_lot_id","#EFF0F3"); //UnEditableColor	
			sheetObj.SetCellEditable(i, fix_grid02 + "item_pkgunit", 1);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_pkgqty", 1);
		}
		else
		{
			//lot_id
			if(sheetObj.GetCellValue(i, fix_grid02 + "fix_lot_id") != "")
			{
				sheetObj.SetCellEditable(i, fix_grid02 + "fix_lot_id",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "lot_no",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "inbound_dt",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "exp_dt",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "lot_04",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "lot_05",0);
				sheetObj.SetCellEditable(i, fix_grid02 + "lic_plat_no",0);
				sheetObj.SetCellImage(i, fix_grid02 + "fix_lot_id_img", 1);
			}
			else {
				//LKH 2017-11-28 Ibsheet 최신 버전업 시 Sub Total 작업후 Lot ID 팝업 아이콘 보이는 오류 수정
				if(sheetObj.GetCellValue(i, fix_grid02 + "item_pkgunit") == ""){
					
				}else{
					sheetObj.SetCellImage(i, fix_grid02 + "fix_lot_id_img", 0);
				}
				//sheetObj.SetCellImage(i, fix_grid02 + "fix_lot_id_img", 0);
			}
			
			sheetObj.SetCellBackColor(i, fix_grid02 + "fix_lot_id","#EFF0F3"); //UnEditableColor	
		}
		sheetObj.SetCellFontColor(i, fix_grid02 + "wave_no","#0100FF");
		sheetObj.SetCellFontUnderline(i, fix_grid02 +  "wave_no", 1);
		sheetObj.SetCellValue(i,fix_grid02+"ibflag","R");
		
		if (formObj.bk_sts_cd.value == "X") {
			sheetObj.SetCellEditable(i, fix_grid02 + "item_cd",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_nm",0);
			
			sheetObj.SetCellEditable(i, fix_grid02 + "eq_tpsz_cd",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "eq_no",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "seal_no",0);
			sheetObj.SetCellEditable(i, fix_grid02 + "seal_img",0);
			
			formObj.eq_tpsz_cd.disabled = true;
			formObj.btn_eq_tpsz_cd.disabled = true;
			formObj.eq_no.disabled = true;
			formObj.seal_no.disabled = true;
			formObj.btn_seal_no.disabled = true;
		} else {
			sheetObj.SetCellEditable(i, fix_grid02 + "item_cd",1);
			sheetObj.SetCellEditable(i, fix_grid02 + "item_nm",1);
			
			sheetObj.SetCellEditable(i, fix_grid02 + "eq_tpsz_cd",1);
			sheetObj.SetCellEditable(i, fix_grid02 + "eq_no",1);
			sheetObj.SetCellEditable(i, fix_grid02 + "seal_no",1);
			sheetObj.SetCellEditable(i, fix_grid02 + "seal_img",1);

			formObj.eq_tpsz_cd.disabled = false;
			formObj.btn_eq_tpsz_cd.disabled = false;
			formObj.eq_no.disabled = false;
			formObj.seal_no.disabled = false;
			formObj.btn_seal_no.disabled = false;
		}
		// OFVFOUR-8145 [MTS] Quantity of Items show negative number on Closing Storage Entry
		sheetObj.SetCellEditable(i, fix_grid02 + "item_nm",0);
	}
	mergeCell(2);
	// Sub Total
	sheet2.ShowSubSum([{StdCol:fix_grid02+"item_cd", SumCols:fix_grid02+"item_pkgqty|" + fix_grid02+"item_ea_qty|" + fix_grid02+"shp_pkgqty|" + fix_grid02+"shp_ea_qty|" + fix_grid02+"item_cbm|" + fix_grid02+"item_cbf|" + fix_grid02+"item_grs_kgs|" 
		+ fix_grid02+"item_grs_lbs|" + fix_grid02+"item_net_kgs|" + fix_grid02+"item_net_lbs|" + fix_grid02+"unit_price"
		, ShowCumulate:0, CaptionCol:fix_grid02+"item_nm", CaptionText: "Sub Total"}]);
	//Total
	sheet2.SetSumValue(fix_grid02 + "item_nm", "TOTAL");
	
	//LKH 2017-11-28 Ibsheet 최신 버전업 시 Sub Total 작업후 Default 첫 번째 row Select 처리
	if(sheetObj.RowCount()>=1){
		sheet2.SetSelectRow(2);
	}
	sheetObj.RenderSheet(1);
}
function sheet2_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	var sUrl="";
	with(sheetObj)
	{
		if(colName == fix_grid02 + "item_cd")
		{
			var sUrl="./CtrtItemPopup.clt?ctrt_no="+ sheetObj.GetCellValue(Row, fix_grid02 + "ctrt_no")
				+"&item_cd="/*+ sheetObj.GetCellValue(Row, Col)*/
				+"&wh_cd=" +  sheetObj.GetCellValue(Row, fix_grid02 + "wh_cd");
		   	callBackFunc = "setItemGrid";
			modal_center_open(sUrl, callBackFunc, 400, 520,"yes");
		}	
		else if(colName == fix_grid02 + "item_pkgunit")
		{
			if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
			{
				ComShowCodeMessage("COM0114","Item");
				sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
				return;
			}
			var sUrl="./CommonCodePopup.clt?grp_cd=A6&code="+sheetObj.GetCellValue(Row, Col)
			                            + "&wh_flag=Y" 
			                            + "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no")
			                            + "&item_sys_no=" + sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no");
			callBackFunc = "setPkgunitGrid";
			modal_center_open(sUrl, callBackFunc, 400,520,"yes");
		}				
		else if ( colName == fix_grid02 + "fix_loc_nm" ) 
		{
			var sUrl="./WarehouseLocPopup.clt?f_loc_cd="+ sheetObj.GetCellValue(Row, fix_grid02+"wh_cd")
			                             + "&alloc_flg=Y";
			if(sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd_it").trim() != "")
			{
				sUrl=sUrl + "&f_fix_wh_loc_nm=" + sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_nm_it");
			}
			callBackFunc = "setOutboundLocInfoGrid";
		    modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
		}
		else if (colName == fix_grid02 + "fix_lot_id_img")
		{
			if(sheetObj.GetCellValue(Row, fix_grid02 + "fix_lot_id").trim() == "" )
			{
				if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
				{
					ComShowCodeMessage("COM0114","Item");
					sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
					return;
				}
				var sParam="wh_cd=" + sheetObj.GetCellValue(Row, fix_grid02+"wh_cd");
				sParam += "&wh_nm=" + encodeURIComponent(sheetObj.GetCellValue(Row, fix_grid02+"wh_nm"));
				sParam += "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no");
				sParam += "&ctrt_nm=" + encodeURIComponent(sheetObj.GetCellValue(Row, fix_grid02+"ctrt_nm"));
				sParam += "&item_cd=" + sheetObj.GetCellValue(Row, fix_grid02+"item_cd");
				sParam += "&call_tp=G&f_alloc_flg=Y";
			   	var sUrl="./WHOutStockSelectPopup.clt?" + sParam;
			   	callBackFunc = "setStockInfoGrid";
				modal_center_open(sUrl, callBackFunc, 1120, 630,"yes");
			}
			else
			{
				sheetObj.SetCellValue(Row, fix_grid02 + "fix_lot_id","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "inbound_dt","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "lot_no","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "exp_dt","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "lot_04","",0);
				sheetObj.SetCellValue(Row, fix_grid02 + "lot_05","",0);
				sheetObj.SetCellEditable(Row, fix_grid02 + "inbound_dt",1);
				sheetObj.SetCellEditable(Row, fix_grid02 + "lot_no",1);
				sheetObj.SetCellEditable(Row, fix_grid02 + "exp_dt",1);
				sheetObj.SetCellEditable(Row, fix_grid02 + "lot_04",1);
				sheetObj.SetCellEditable(Row, fix_grid02 + "lot_05",1)
				sheetObj.PopupButtonImage(Row, fix_grid02 + "fix_lot_id_img",0);
				sheetObj.SetCellImage(Row, fix_grid02 + "fix_lot_id_img",0);
			}
		}else if ( colName == fix_grid02 + "eq_tpsz_cd" ) {
			
			var eq_tp_cd=sheetObj.GetCellValue(Row, (fix_grid02+"eq_tp_cd"));
			var code="A";
			if (!ComIsNull(eq_tp_cd)) {
				code=eq_tp_cd;
			}
			sUrl="./ContainerTypePopup.clt?type="+code+"&eq_unit="+"";
			callBackFunc = "setIbContainerTypeInfo";
			modal_center_open(sUrl, callBackFunc, 400, 590,"yes");
		}
//		else if (colName == fix_grid02 + "curr_cd")
//		{
//			var sUrl="CommonCodePopup.do?grp_cd=A5&code="+sheetObj.GetCellValue(Row, Col);
//			ComOpenPopup(sUrl, 400, 560, "setCurrCdGrid", "0,0", true, sheetObj, Row, Col);
//		}
	}
}
function setIbContainerTypeInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValArr = rtnVal.split("|");
		var sheetObj=sheet2;
		var prefix= fix_grid02;
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"eq_tpsz_cd",rtnValArr[0]);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"eq_tp_cd",rtnValArr[2]);
	}
}

function rtn_searchWHItemCodeInfo (reqVal, Row){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	var sheetObj = sheet2;
	var colStr="Grd02item_cd";
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(Row, fix_grid02+"item_sys_no",rtnArr[0],0);
				sheetObj.SetCellValue(Row, fix_grid02+"item_nm",rtnArr[3],0);
				sheetObj.SetCellValue(Row, fix_grid02+"lv1_cbm",rtnArr[12],0);
				sheetObj.SetCellValue(Row, fix_grid02+"lv1_cbf",rtnArr[13],0);
				sheetObj.SetCellValue(Row, fix_grid02+"lv1_grs_kgs",rtnArr[14],0);
				sheetObj.SetCellValue(Row, fix_grid02+"lv1_grs_lbs",rtnArr[15],0);
				sheetObj.SetCellValue(Row, fix_grid02+"lv1_net_kgs",rtnArr[16],0);
				sheetObj.SetCellValue(Row, fix_grid02+"lv1_net_lbs",rtnArr[17],0);
				sheetObj.SetCellValue(Row, fix_grid02+"pkg_lv1_qty",rtnArr[5],0);
				// SKU의 Handling Unit을 Default로 설정
				sheet2.CellComboItem(Row,fix_grid02+"item_pkgunit",	{ComboText:rtnArr[29], ComboCode: rtnArr[28]} );
				sheet2.CellComboItem(Row,fix_grid02+"shp_pkgunit",	{ComboText:rtnArr[29], ComboCode: rtnArr[28]} );
				
				sheet2.CellComboItem(Row,fix_grid02+"lot_04",	{ComboText:rtnArr[30], ComboCode: rtnArr[30]} );
				sheet2.CellComboItem(Row,fix_grid02+"lot_05",	{ComboText:rtnArr[31], ComboCode: rtnArr[31]} );
				
				sheetObj.SetCellValue(Row, fix_grid02+"lot_05","",0);
				sheetObj.SetCellValue(Row, fix_grid02+"lot_04","",0);
				
				// #2061 [WMS4.0]Inbound/Outbound LOT4,LOT5 직접 입력 시 Validation 확인
				sheet2.SetCellValue(Row,fix_grid02+"lot_04_cbm_cd", rtnArr[30]);
				sheet2.SetCellValue(Row,fix_grid02+"lot_05_cbm_cd", rtnArr[31]);
				
				sheetObj.SetCellValue(Row, fix_grid02+"item_pkgunit",rtnArr[4],0);
				sheetObj.SetCellValue(Row, fix_grid02+"pkg_lv1_unit_cd",rtnArr[4],0);
				sheetObj.SetCellValue(Row, fix_grid02+"pkg_lv2_qty",rtnArr[7],0);
				// Stock Qty : Sku의 available Qty를 보여줌
//				sheetObj.SetCellValue(Row, fix_grid02+"stock_qty",rtnArr[7],0);
				sheetObj.SetCellValue(Row, fix_grid02+"pkg_lv2_unit_cd",rtnArr[6],0);
				sheetObj.SetCellValue(Row, fix_grid02+"pkg_lv3_qty",rtnArr[9],0);
				sheetObj.SetCellValue(Row, fix_grid02+"pkg_lv3_unit_cd",rtnArr[8],0);
				sheetObj.SetCellValue(Row, fix_grid02+"pkg_lv4_qty",rtnArr[11],0);
				sheetObj.SetCellValue(Row, fix_grid02+"pkg_lv4_unit_cd",rtnArr[10],0);
				sheetObj.SetCellValue(Row, fix_grid02+"pkg_info",rtnArr[18],0);
				sheetObj.SetCellValue(Row, fix_grid02+"curr_cd",rtnArr[19],0);
				
				//lkh - ibsheet 최신 버전 - bug 수정 Insert 시 오류 수정 다시 확인 필요 - 원복
				sheetObj.SetCellValue(Row, fix_grid02+"item_unit_price",rtnArr[20],0);
				//sheetObj.SetCellValue(Row, fix_grid02+"item_unit_price",rtnArr[21],0);
				
//				sheetObj.SetCellValue(Row, fix_grid02+"fix_loc_cd_it",getXmlDataNullToNullString(result.xml, 'fix_loc_cd'),0);
//				sheetObj.SetCellValue(Row, fix_grid02+"fix_loc_nm_it",getXmlDataNullToNullString(result.xml, 'fix_loc_nm'),0);
//				var fix_loc_cd=getXmlDataNullToNullString(result.xml, 'fix_loc_cd');
//				if(fix_loc_cd != "")
//				{
//					sheetObj.SetCellValue(Row, fix_grid02+"fix_loc_cd",getXmlDataNullToNullString(result.xml, 'fix_loc_cd'),0);
//					sheetObj.SetCellValue(Row, fix_grid02+"fix_loc_nm",getXmlDataNullToNullString(result.xml, 'fix_loc_nm'),0);
//				}
				
				// Stock Info
				sheetObj.SetCellValue(Row, fix_grid02+"stock_qty",rtnArr[27],0);
				
				resetLotInfo(sheetObj, Row);	
				settring_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02+"item_cd"), "", colStr);
		   }else sheetObj.SelectCell(Row,  fix_grid02+"item_cd");
		}else sheetObj.SelectCell(Row,  fix_grid02+"item_cd");
	}else sheetObj.SelectCell(Row,  fix_grid02+"item_cd");
}
function getDataAjaxCommonCodeInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var sheetObj = sheet2;
	if(doc[0] == 'OK'){
		if(typeof(doc[1]) != 'undefined'){
			var rtnArr = doc[1].split('^@');
			if(rtnArr[2] == "N"){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_pkgqty",0,0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_ea_qty",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_cbm",0,0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_cbf",0,0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_grs_kgs",0,0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_grs_lbs",0,0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_net_kgs",0,0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_net_lbs",0,0);
				ComShowCodeMessage("COM0344");
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_pkgunit", "",0);
				sheetObj.SelectCell(sheetObj.GetSelectRow(),  fix_grid02 + "item_pkgunit");
				return;
			}
		}
	}
	settring_ea_qty(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid02+"item_cd"), "UNIT", "");
}
function sheet2_OnChange(sheetObj, Row, Col, Value) {
	var formObj=document.form; 
	var colStr=sheetObj.ColSaveName(Col);
	var sUrl="";
	if(colStr == fix_grid02 + "item_cd")
	{
		if(Value != "")
		{
			var sParam="ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02 + "ctrt_no") + "&item_cd=" + encodeURIComponent(Value) + "&wh_cd=" + sheetObj.GetCellValue(Row, fix_grid02 + "wh_cd") + "&wob_bk_no=" /*+ sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "wob_bk_no")*/;
			ajaxSendPost(rtn_searchWHItemCodeInfo, Row, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
		}
		else
		{
			resetLotInfo(sheetObj, Row);
			settring_ea_qty(sheetObj, Row, "", "", "");			
		}
	}
	else if(colStr == fix_grid02 + "item_pkgunit")
	{
		if(Value != "")
		{
			ajaxSendPost(getDataAjaxCommonCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchPutawayEaQty&putaway_pkgunit='+Value 
					+ "&wh_flag=Y&ctrt_no="+ sheetObj.GetCellValue(Row, (fix_grid02+"ctrt_no")) + "&putaway_pkgqty=" + sheetObj.GetCellValue(Row, fix_grid02 + "item_pkgqty")
					+ "&item_sys_no=" + sheetObj.GetCellValue(Row, (fix_grid02+"item_sys_no")), './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid02 + "item_pkgqty",0,0);
			sheetObj.SetCellValue(Row, fix_grid02 + "item_ea_qty",0);
			sheetObj.SetCellValue(Row, fix_grid02 + "item_cbm",0,0);
			sheetObj.SetCellValue(Row, fix_grid02 + "item_cbf",0,0);
			sheetObj.SetCellValue(Row, fix_grid02 + "item_grs_kgs",0,0);
			sheetObj.SetCellValue(Row, fix_grid02 + "item_grs_lbs",0,0);
			sheetObj.SetCellValue(Row, fix_grid02 + "item_net_kgs",0,0);
			sheetObj.SetCellValue(Row, fix_grid02 + "item_net_lbs",0,0);
		}
	}
	else if(colStr == fix_grid02 + "fix_loc_nm") 
	{
		if(Value != "")
		{
			var sParam="f_loc_cd=" + sheetObj.GetCellValue(Row, fix_grid02 + "wh_cd") + "&f_wh_loc_nm=" + Value + "&alloc_flg=Y";
			if(sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd_it").trim() != "")
			{
				sParam=sParam + "&f_fix_wh_loc_nm=" + sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_nm_it");
			}
			ajaxSendPost(getDataAjaxWarehouseLocInfoForName, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row,  fix_grid02+"fix_loc_cd","",0);
		}
	}
	else if (colStr == (fix_grid02+"item_cbf") && Value != "") 
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("CBF_CBM", (fix_grid02+"item_cbf"), (fix_grid02+"item_cbm"), sheetObj);
		unitConvertGrid("CBF_CBM", (fix_grid02+"item_cbf"), (fix_grid02+"item_cbm"), sheetObj);
	}
	else if (colStr == (fix_grid02+"item_cbm") && Value != "") {
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("CBM_CBF", (fix_grid02+"item_cbm"), (fix_grid02+"item_cbf"), sheetObj);
		unitConvertGrid("CBM_CBF", (fix_grid02+"item_cbm"), (fix_grid02+"item_cbf"), sheetObj);
	}
	else if (colStr == (fix_grid02+"item_grs_lbs") && Value != "") 
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("LB_KG", (fix_grid02+"item_grs_lbs"), (fix_grid02+"item_grs_kgs"), sheetObj);
		unitConvertGrid("LB_KG", (fix_grid02+"item_grs_lbs"), (fix_grid02+"item_grs_kgs"), sheetObj);
	}
	else if (colStr == (fix_grid02+"item_grs_kgs") && Value != "") {
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("KG_LB", (fix_grid02+"item_grs_kgs"), (fix_grid02+"item_grs_lbs"), sheetObj);
		unitConvertGrid("KG_LB", (fix_grid02+"item_grs_kgs"), (fix_grid02+"item_grs_lbs"), sheetObj);
	}
	else if (colStr == (fix_grid02+"item_net_kgs") && Value != "") 
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("KG_LB", (fix_grid02+"item_net_kgs"), (fix_grid02+"item_net_lbs"), sheetObj);
		unitConvertGrid("KG_LB", (fix_grid02+"item_net_kgs"), (fix_grid02+"item_net_lbs"), sheetObj);
	}
	else if (colStr == (fix_grid02+"item_net_lbs") && Value != "") 
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("LB_KG", (fix_grid02+"item_net_lbs"), (fix_grid02+"item_net_kgs"), sheetObj);
		unitConvertGrid("LB_KG", (fix_grid02+"item_net_lbs"), (fix_grid02+"item_net_kgs"), sheetObj);
	}
	else if(colStr == fix_grid02 + "item_pkgqty")
	{
		var qty=Value;
		//음수체크
		if(Value < 0)
		{
			qty=Math.abs(Value);
			sheetObj.SetCellValue(Row, Col,qty,0);
		}
		settring_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02+"item_cd"), "", "");
	// #1417 [WMS4.0] PROPERTY ADDDED DURING IN/OUTBOUND TO ITEM ENTRY
	//  manually추가를 한다면, Item Default에도 추가를 원하는지 system 에서 물어봐주고, yes하면 Item Default Lot4 또는 Lot5 Property 에 추가 저장
	// Lot 04
	}else if (colStr == (fix_grid02 + "lot_04") && Value != "") {

		var sLot04 = sheetObj.GetCellValue(Row,fix_grid02+"lot_04");
		// #2061 [WMS4.0]Inbound/Outbound LOT4,LOT5 직접 입력 시 Validation 확인
		var sLot04Text =  "|" + sheetObj.GetCellValue(Row,fix_grid02+"lot_04_cbm_cd") + "|";
		// COMBO LIST에 값이 없는 새로운 코드 값만 적용
		// SKU가 존재하는 경우에만 적용
		var sItemCd = sheetObj.GetCellValue(Row, fix_grid02+"item_cd");
		if (!ComIsNull(sItemCd) && sLot04Text.indexOf("|" + sLot04 + "|") == -1) {
			if(ComShowCodeConfirm("COM0783", "LOT 04", "\"" + sLot04 + "\"") == false){
				return;
			} else {
				var user_id = formObj.user_id.value;
				var ctrt_no = sheetObj.GetCellValue(Row,fix_grid02+"ctrt_no");
				var item_sys_no = sheetObj.GetCellValue(Row,fix_grid02+"item_sys_no"); 
				var lot_tp = "Lot4";
				ajaxSendPost(saveItemLotPropertyAjaxReq, 'reqVal', '&goWhere=aj&bcKey=saveItemLotProperty&lot_cd='+sLot04+'&item_sys_no='+item_sys_no + '&ctrt_no='+ctrt_no + '&user_id=' + user_id + '&lot_tp=' + lot_tp, './GateServlet.gsl');
			}
		}
	// Lot 05
	}else if (colStr == (fix_grid02 + "lot_05") && Value != "") {
		
		var sLot05 = sheetObj.GetCellValue(Row,fix_grid02+"lot_05");
		// #2061 [WMS4.0]Inbound/Outbound LOT4,LOT5 직접 입력 시 Validation 확인
		var sLot05Text =  "|" + sheetObj.GetCellValue(Row,fix_grid02+"lot_05_cbm_cd") + "|";
		// COMBO LIST에 값이 없는 새로운 코드 값만 적용
		// SKU가 존재하는 경우에만 적용
		var sItemCd = sheetObj.GetCellValue(Row, fix_grid02+"item_cd");
		if (!ComIsNull(sItemCd) && sLot05Text.indexOf("|" + sLot05 + "|") == -1) {
			if(ComShowCodeConfirm("COM0783", "LOT 05", "\"" + sLot05 + "\"") == false){
				return;
			} else {
				var user_id = formObj.user_id.value;
				var ctrt_no = sheetObj.GetCellValue(Row,fix_grid02+"ctrt_no");
				var item_sys_no = sheetObj.GetCellValue(Row,fix_grid02+"item_sys_no"); 
				var lot_tp = "Lot5";
				ajaxSendPost(saveItemLotPropertyAjaxReq, 'reqVal', '&goWhere=aj&bcKey=saveItemLotProperty&lot_cd='+sLot05+'&item_sys_no='+item_sys_no + '&ctrt_no='+ctrt_no + '&user_id=' + user_id + '&lot_tp=' + lot_tp , './GateServlet.gsl');
			}
		}
	}
}

function saveItemLotPropertyAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form; 
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

function getDataAjaxWarehouseLocInfoForName(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var sheetObj = sheet2;
	if(doc[0] == 'OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),  fix_grid02+"fix_loc_cd", rtnArr[1],0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),  fix_grid02+"fix_loc_cd", rtnArr[0],0);
			}
			else{
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),  fix_grid02+"fix_loc_nm", "",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),  fix_grid02+"fix_loc_cd", "",0);
				sheetObj.SelectCell(sheetObj.GetSelectRow(),  fix_grid02+"fix_loc_nm");
			}
		}
		else{
			sheetObj.SetCellValue(sheetObj.GetSelectRow(),  fix_grid02+"fix_loc_nm", "",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(),  fix_grid02+"fix_loc_cd", "",0);
			sheetObj.SelectCell(sheetObj.GetSelectRow(),  fix_grid02+"fix_loc_nm");
		}
	}
	else{
		sheetObj.SetCellValue(sheetObj.GetSelectRow(),  fix_grid02+"fix_loc_nm", "",0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(),  fix_grid02+"fix_loc_cd", "",0);
		sheetObj.SelectCell(sheetObj.GetSelectRow(),  fix_grid02+"fix_loc_nm");
	}
}
function resetLotInfo(sheetObj, Row)
{
	// Item Code 없는 경우, Lot 정보는 초기화 되어야 함.
	// #2061 [WMS4.0]Inbound/Outbound LOT4,LOT5 직접 입력 시 Validation 확인
	if(!ComIsNull(sheetObj.GetCellValue(Row, fix_grid02 + "item_cd")) 
			&& sheetObj.GetCellValue(Row, fix_grid02 + "fix_lot_id").trim() == "")
	{
		return;
	}
	//lot id
	sheetObj.SetCellValue(Row, fix_grid02 + "fix_lot_id","",0);
	sheetObj.SetCellValue(Row, fix_grid02 + "inbound_dt","",0);
	sheetObj.SetCellValue(Row, fix_grid02 + "lot_no","",0);
	sheetObj.SetCellValue(Row, fix_grid02 + "exp_dt","",0);
	sheetObj.SetCellValue(Row, fix_grid02 + "lot_04","",0);
	sheetObj.SetCellValue(Row, fix_grid02 + "lot_05","",0);
	//Lot Cell속성 SET	
	sheetObj.SetCellEditable(Row, fix_grid02 + "inbound_dt",1);
	sheetObj.SetCellEditable(Row, fix_grid02 + "lot_no",1);
	sheetObj.SetCellEditable(Row, fix_grid02 + "exp_dt",1);
	sheetObj.SetCellEditable(Row, fix_grid02 + "lot_04",1);
	sheetObj.SetCellEditable(Row, fix_grid02 + "lot_05",1);
	sheetObj.PopupButtonImage(Row, fix_grid02 + "fix_lot_id",0);
}
/*
 * sheet2의 MouseDown 이벤트
 */
function sheet2_OnMouseDown(sheetObj,Button, Shift, X, Y)
{
	if(sheetObj.MouseRow()== (sheetObj.HeaderRows()-1) && sheetObj.MouseCol()== sheetObj.SaveNameCol(fix_grid02 + "row_add")) //header 선택시. header row -> 0,1
	{
		sheet2RowAdd(sheetObj, sheetObj.MouseRow());
	}
}
/*
 * sheet2 dbclick event
 */
function sheet2_OnDblClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	switch (colName)
	{
		case fix_grid02 + "wave_no": //wave_no
			if(Value != "")
			{
				var sUrl;
				if(sheetObj.GetCellValue(Row, fix_grid02 + "smp_wave_flg") == "Y")
				{
					sUrl="./WaveSmpMgmt.clt?req_wave_no="+sheetObj.GetCellValue(Row, Col);
				}
				else
				{
					sUrl="./WaveMgmt.clt?wave_no="+sheetObj.GetCellValue(Row, Col);
				}
				parent.mkNewFrame('Wave', sUrl);
			}
			break;
	}
}

function sheet2RowAdd_OnClick(){
	var sheetObj = sheet2;
	var Row = sheetObj.GetSelectRow();
	sheet2RowAdd(sheetObj, Row);
}
/*
 * sheet1의 OnClick 이벤트
 */
function sheet2_OnClick(sheetObj,Row, Col, Value){
	if(Col == sheetObj.SaveNameCol(fix_grid02 + "row_add"))
	{
		sheet2RowAdd(sheetObj, Row);
	}
	else if(Col == sheetObj.SaveNameCol(fix_grid02 + "row_del"))
	{
		sheet2RowDel(sheetObj, Row);
	}
	else if (Col == sheetObj.SaveNameCol(fix_grid02 + "fix_lot_id_img"))
	{
		if(sheetObj.GetCellValue(Row, fix_grid02 + "fix_lot_id").trim() == "" )
		{
			if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
			{
				ComShowCodeMessage("COM0114","Item");
				sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
				return;
			}
			var sParam="wh_cd=" + sheetObj.GetCellValue(Row, fix_grid02+"wh_cd");
			sParam += "&wh_nm=" + encodeURIComponent(sheetObj.GetCellValue(Row, fix_grid02+"wh_nm"));
			sParam += "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no");
			sParam += "&ctrt_nm=" + encodeURIComponent(sheetObj.GetCellValue(Row, fix_grid02+"ctrt_nm"));
			sParam += "&item_cd=" + sheetObj.GetCellValue(Row, fix_grid02+"item_cd");
			sParam += "&call_tp=G&f_alloc_flg=Y";
		   	var sUrl="./WHOutStockSelectPopup.clt?" + sParam;
		   	callBackFunc = "setStockInfoGrid";
			modal_center_open(sUrl, callBackFunc, 1120, 630,"yes");
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid02 + "fix_lot_id","",0);
			sheetObj.SetCellValue(Row, fix_grid02 + "inbound_dt","",0);
			sheetObj.SetCellValue(Row, fix_grid02 + "lot_no","",0);
			sheetObj.SetCellValue(Row, fix_grid02 + "exp_dt","",0);
			sheetObj.SetCellValue(Row, fix_grid02 + "lot_04","",0);
			sheetObj.SetCellValue(Row, fix_grid02 + "lot_05","",0);
			sheetObj.SetCellValue(Row, fix_grid02 + "item_ser_no","",0);
			sheetObj.SetCellValue(Row, fix_grid02 + "lic_plat_no","",0);
			sheetObj.SetCellEditable(Row, fix_grid02 + "inbound_dt",1);
			sheetObj.SetCellEditable(Row, fix_grid02 + "lot_no",1);
			sheetObj.SetCellEditable(Row, fix_grid02 + "exp_dt",1);
			sheetObj.SetCellEditable(Row, fix_grid02 + "lot_04",1);
			sheetObj.SetCellEditable(Row, fix_grid02 + "lot_05",1)
			sheetObj.SetCellEditable(Row, fix_grid02 + "item_ser_no",1)
			sheetObj.SetCellEditable(Row, fix_grid02 + "lic_plat_no",1)
			sheetObj.PopupButtonImage(Row, fix_grid02 + "fix_lot_id_img",0);
			sheetObj.SetCellImage(Row, fix_grid02 + "fix_lot_id_img",0);
		}
	}else if (Col == sheetObj.SaveNameCol(fix_grid02+"seal_img")) {
		if(sheetObj.GetCellEditable(Row,fix_grid02+"seal_no") == 1){
			ComShowMemoPad3(sheetObj, Row, (fix_grid02+"seal_no"), false, 300, 82, 23, (fix_grid02+"seal_no"));         		
		}
	}
}
function sheet2RowAdd(sheetObj, Row)
{
	// Sub Total
	sheetObj.HideSubSum();
	var formObj = document.form;
	if($("#form_mode").val() == "UPDATE")
	{/*
		if($("#sel_tab").val() == "01")
		{
			var sel_row=sheet1.FindText(fix_grid01 + "wob_bk_no", $("#sel_wob_bk_no").val(), sheet1.HeaderRows(), -1, true);
			if(sheet1.GetCellValue(sel_row, fix_grid01 + "bk_sts_cd") == "X" || sheet1.GetCellValue(sel_row, fix_grid01 + "bk_sts_cd") == "P") //Pickd, Complete시 row추가 불가
			{
				return;
			}
		}
		else
		{*/
			if($("#bk_sts_cd").val() == "X" || $("#bk_sts_cd").val() == "P")//Pickd, Complete시 row추가 불가
			{
				return;
			}
		/*}*/
	}
	var ctrt_no="";
	var ctrt_nm="";
	var wh_cd="";
	var wh_nm="";
	//var sRow=sheet1.FindStatusRow("I");
	if($("#form_mode").val() == "NEW" /*&& sRow == ""*/)
	{
		if($("#sel_tab").val() != "01")//if($("#sel_tab").val() != "02")
		{
			//신규모드이고 현재탭이 02가 아닐때 sheet의 new row가 없을때
			goTabSelect("01");//goTabSelect("02");
		}
		ctrt_no=$("#ctrt_no").val();
		ctrt_nm=$("#ctrt_nm").val();
		wh_cd=$("#wh_cd").val();
		wh_nm=$("#wh_nm").val();
		if(wh_cd == "")
		{
			ComShowCodeMessage("COM0114","Warehouse");
			formObj.wh_cd.focus();
			return;
		}
		if(ctrt_no == "")
		{
			ComShowCodeMessage("COM0114","Contract");
			formObj.ctrt_no.focus();
			return;
		}		
	}
	else
	{
		if($("#sel_wob_bk_no").val() != "")
			$("#sel_wob_bk_no").val($("#wob_bk_no").val());
		
		if($("#sel_wob_bk_no").val() != "") //선택된 건이 있으면 (부킹존재)
		{
			ctrt_no=$("#sel_ctrt_no").val();
			ctrt_nm=$("#sel_ctrt_nm").val();
			wh_cd=$("#sel_wh_cd").val();
			wh_nm=$("#sel_wh_nm").val();
		}
		else//신규부킹건일경우
		{
			/*var arrRow=sRow.split(";");
			ctrt_no=sheet1.GetCellValue(arrRow[0], fix_grid01 + "ctrt_no") == "" ? $("#ctrt_no").val() : sheet1.GetCellValue(arrRow[0], fix_grid01 + "ctrt_no");;
			ctrt_nm=sheet1.GetCellValue(arrRow[0], fix_grid01 + "ctrt_nm") == "" ? $("#ctrt_nm").val() : sheet1.GetCellValue(arrRow[0], fix_grid01 + "ctrt_nm");;
			wh_cd=sheet1.GetCellValue(arrRow[0], fix_grid01 + "wh_cd");
			wh_nm=sheet1.GetCellValue(arrRow[0], fix_grid01 + "wh_nm");
			if(wh_cd == "")
			{
				ComShowCodeMessage("COM0114","Warehouse");
				sheet1.SelectCell(arrRow[0], fix_grid01 + "wh_cd")
				return;
			}
			if(ctrt_no == "")
			{
				ComShowCodeMessage("COM0114","Contract");
				sheet1.SelectCell(arrRow[0], fix_grid01 + "ctrt_no")
				return;
			}	*/	
		}
	}
	if(Row < sheetObj.HeaderRows())
	{
		var row=sheetObj.DataInsert(sheetObj.RowCount()+ 1);
		sheet2RowAddValue(sheetObj, row, ctrt_no, ctrt_nm, wh_cd, wh_nm);
		add_planned_transport(row);
	}
	else
	{
		var row_add_qty=sheetObj.GetCellValue(Row, fix_grid02 + "row_add_qty");
		for(var i=0; i<row_add_qty; i++)
		{
			var row=sheetObj.DataInsert(sheetObj.LastRow()+ 1);
			sheet2RowAddValue(sheetObj, row, ctrt_no, ctrt_nm, wh_cd, wh_nm);
			add_planned_transport(row);
		}
		sheetObj.SetCellValue(Row, fix_grid02 + "row_add_qty",'1',0);
	}	
	sheetObj.SetCellImage(sheetObj.RowCount()+ 1, fix_grid02 + "fix_lot_id_img", 0);
	sheetObj.SetCellImage(sheetObj.RowCount()+ 1, fix_grid02 + "seal_img", 2);
}

function add_planned_transport(row){
	var formObj = document.form;
	if($("#eq_tpsz_cd").val() != ""){
		sheet2.SetCellValue(row, fix_grid02 + "eq_tpsz_cd", $("#eq_tpsz_cd").val());
	}
	if($("#eq_no").val() != ""){
		sheet2.SetCellValue(row, fix_grid02 + "eq_no", $("#eq_no").val());
	}
	if($("#seal_no").val() != ""){
		sheet2.SetCellValue(row, fix_grid02 + "seal_no", $("#seal_no").val());
	}
}

var sheet2Row = 0;
function sheet2RowAddValue(sheetObj, row, ctrt_no, ctrt_nm, wh_cd, wh_nm)
{

	sheetObj.SetSumValue(fix_grid02 + "item_nm", "TOTAL");
	
	sheetObj.SetCellValue(row, fix_grid02 + "wob_bk_no",$("#sel_wob_bk_no").val(),0);
	sheetObj.SetCellValue(row, fix_grid02 + "ctrt_no",ctrt_no,0);
	sheetObj.SetCellValue(row, fix_grid02 + "ctrt_nm",ctrt_nm,0);
	sheetObj.SetCellValue(row, fix_grid02 + "wh_cd",wh_cd,0);
	sheetObj.SetCellValue(row, fix_grid02 + "wh_nm",wh_nm,0);
	sheetObj.SetCellBackColor(row, fix_grid02 + "fix_lot_id","#EFF0F3"); //UnEditableColor
	sheetObj.PopupButtonImage(row, fix_grid02 + "fix_lot_id",0);
	sheetObj.SetCellValue(row, fix_grid02 + "row_add","+",0);
	sheetObj.SetCellValue(row, fix_grid02 + "row_del","-",0);
	sheetObj.SetCellValue(row, fix_grid02 + "row_add_qty",1,0);

	// SKU ComboList조회
	//var selRow=sheet1.GetSelectRow();
	var p_ctrt_no = $("#ctrt_no").val();;/*sheet1.GetCellValue(selRow, fix_grid01 + "ctrt_no")*/
	var p_wh_cd = $("#wh_cd").val();/*sheet1.GetCellValue(selRow, fix_grid01 + "wh_cd")*/
	sheet2Row = row;
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');
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
//				sheet2.CellComboItem(sheet2Row,fix_grid02+"item_cd",{ComboText:rtnArr[0], ComboCode:rtnArr[1]} );
				for(var i=0; i<=sheet2.LastRow();i++){
					sheet2.CellComboItem(i,fix_grid02+"item_cd",{ComboText:rtnArr[0], ComboCode:rtnArr[1]} );
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
function sheet2RowDel(sheetObj, Row)
{
	if(sheetObj.GetRowStatus(Row) == "I")
	{
		sheetObj.RowDelete(Row, false);
		return;
	}
	if(sheetObj.GetCellValue(Row, fix_grid02 + "bk_sts_cd") != "I")
	{
		return;
	}
	sheetObj.SetRowHidden(Row,1);//2.행 숨기기
	sheetObj.SetRowStatus(Row,"D");
	// #1396 [WMS4.0] Booked Outbound File doesn't show on List when Items are deleted
	// Sub Total
	sheet2.HideSubSum();
}
function sheet3_OnSearchEnd(sheetObj){
	for(var i=sheetObj.HeaderRows(); i < (sheetObj.RowCount()+sheetObj.HeaderRows()) ; i++){
		sheetObj.SetCellBackColor(i, fix_grid03+"field_name","#D9E5FF");
		sheetObj.SetCellFont("FontBold", i, fix_grid03+"field_name",1);
	}
}
function sheet4_OnSearchEnd(sheetObj){
	sheetObj.SetColFontUnderline(fix_grid04 + "file_org_nm",1);
	doHideProcess(false);
}
function sheet4_OnDblClick(sheetObj, Row, Col){
	var formObj1=document.frm1;
	var sName=sheetObj.ColSaveName(Col);
	if (sName == fix_grid04 + "file_org_nm") {
		formObj1.file_path.value = sheetObj.GetCellValue(Row, fix_grid04 + "file_path") + sheetObj.GetCellValue(Row, fix_grid04 + "file_sys_nm");
		
		//#2399 [Binex Visibility] attached file cannot be download on inbound search on Chrome
		//formObj1.file_name.value = sheetObj.GetCellValue(Row, fix_grid04 + "file_org_nm");
		formObj1.file_name.value = "\"" + sheetObj.GetCellValue(Row, fix_grid04 + "file_org_nm") + "\"" ;
		
		formObj1.submit();
		showCompleteProcess();
	}
}
function sheet5_OnSearchEnd(sheetObj){
	sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(	sheetObj), SheetDesign:1,Merge:1 });
	doHideProcess(false);
}
function ComDisableTdButton(btId, flg)
{
    if (flg==1) {
    	var vClassName = document.getElementById(btId).className;
		if("Btn_Disable" == vClassName)	return true;
		return false;
    }else if (flg==2) {
    	if(document.getElementById(btId).disabled)	return true;
		return false;
    }
}
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		//#3390-Check Authority WMS CODE
		if(srcName == "SAVE" || srcName == "DELETE" || srcName == "CANCEL" || srcName == "btn_Putaway"){
			ComChecWmsCd_Authority(formObj.wh_cd.value);
			if (isWmsAuthOk == false) { 
				//alert('Not authenticated.\r\nYou are not authorized to access Warehouse');
				ComShowCodeMessage("COM0785");
				return
			}  
		}
		switch(srcName) {
			case "SEARCHLIST" :	
				btn_Search();
				break;
			case "NEW" :	
				btn_New();
				break;
			case "SAVE" :	
				btn_Save();
				break;
			case "DELETE" :	
				btn_Delete();
				break;
			case "CANCEL" :	
				btn_CCancel();
				break;
			case "EXCEL" :	
				btn_Excel();
				break;
			case "PRINT" :	
				btn_Print();
				break;
			case "link_Wave" :	
				go_Wave();
				break;
			case "link_Excel_Download" :	
				excel_Download();
				break;
			case "link_Excel_Upload" :	
				excel_Upload();
				break;
			case "btn_list_to_date":	
				var cal=new ComCalendarFromTo();
	            cal.select(formObj.list_fm_date, formObj.list_to_date, 'MM-dd-yyyy');
				break;			
 			case "btn_list_ctrt_no" :	
 				CtrtPopup(fix_by_list_P);
				break;
 			case "btn_ctrt_no" :
 				CtrtPopup(fix_by_form_P);
				break;
 			case "btn_owner_cd":
 				CustomerPopup('owner_cd');
 				break;
// 			case "btn_owner_loc":
// 				CustomerLocationPopup('owner_cd');
// 				break;
 			case "btn_buyer_cd":
 				CustomerPopup('buyer_cd');
 				break;
// 			case "btn_buyer_loc":
// 				CustomerLocationPopup('buyer_cd');
// 				break;
 			case "btn_bk_date":
 				var cal=new ComCalendar();
	            cal.select(formObj.bk_date, 'MM-dd-yyyy');
 				break;
 			case "btn_est_out_dt":
 				var cal=new ComCalendar();
	            cal.select(formObj.est_out_dt, 'MM-dd-yyyy');
 				break;
 			case "btn_trucker_cd":
 				CustomerPopup('trucker_cd');
 				break;
 			case "btn_bill_to_cd":
 				CustomerPopup('bill_to_cd');
 				break;
 			case "btn_eq_tpsz_cd":
 				var tp="A";
 				if($("#eq_tp_cd").val().trim() != "")
				{
 					tp=$("#eq_tp_cd").val().trim();
				}
 				callBackFunc = "setTruckTypeInfo";
 			    modal_center_open('./ContainerTypePopup.clt?type=' + tp + '&eq_unit='+$("#eq_tpsz_cd").val(), rtnary, 400, 590,"yes");
 				break;
 			case "btn_vsl_cd":
 				rtnary=new Array(2);
 		   		rtnary[0]="1";
 		   		// 2011.12.27 value parameter
 		   		rtnary[1]="";
 		   		rtnary[2]="";
 		   		callBackFunc = "setVslInfo";
 				modal_center_open('./CMM_POP_0140.clt', rtnary, 656,450,"yes");
 				break;
 			case "btn_carrier_cd":
 				CustomerPopup('carrier_cd');
 				break;
 			case "btn_pol":
 				podPopup("pol",'c');
 				break;
 			case "btn_pod":
 				podPopup("pod",'c');
 				break;
 			case "btn_del":
 				podPopup("del",'c');
 				break;
 			case "btn_etd":
 				var cal=new ComCalendar();
	            cal.select(formObj.etd, 'MM-dd-yyyy');
 				break;
 			case "btn_eta":
 				var cal=new ComCalendar();
	            cal.select(formObj.eta, 'MM-dd-yyyy');
 				break;
 			case "btn_seal_no":
 				btn_seal();
 				break;
 			case "btn_buyer_addr":
 				btn_addr_info("buyer");
 				break;
 			case "rating":
 				fn_auto_rating();
 				break;
 			case "frt_add":
 				fn_frt_add();
 				break;
 			case "sheet2_btn_show":
 				sheet2.SetColHidden(fix_grid02+"item_cbm", 0);
 				sheet2.SetColWidth(fix_grid02+"item_cbm", 80);
 				
 				sheet2.SetColHidden(fix_grid02+"item_cbf", 0);
 				sheet2.SetColWidth(fix_grid02+"item_cbf", 80);
 				
 				sheet2.SetColHidden(fix_grid02+"item_grs_kgs", 0);
 				sheet2.SetColWidth(fix_grid02+"item_grs_kgs", 80);
 				
 				sheet2.SetColHidden(fix_grid02+"item_grs_lbs", 0);
 				sheet2.SetColWidth(fix_grid02+"item_grs_lbs", 80);
 				
 				sheet2.SetColHidden(fix_grid02+"item_net_kgs", 0);
 				sheet2.SetColWidth(fix_grid02+"item_net_kgs", 80);
 				
 				sheet2.SetColHidden(fix_grid02+"item_net_lbs", 0);
 				sheet2.SetColWidth(fix_grid02+"item_net_lbs", 80);
 				
// 				sheet2.SetColHidden(fix_grid02+"po_no", 0);
// 				sheet2.SetColWidth(fix_grid02+"po_no", 150);
 				
 				sheet2.SelectCell(2, fix_grid02+"po_no");
 				sheet2.SelectCell(2, fix_grid02+"item_cbm");
 				$("#sheet2_btn_show").hide();
 				$("#sheet2_btn_hide").show();
 				break;
 			case "sheet2_btn_hide":
 				sheet2_btn_hide();
 				$("#sheet2_btn_hide").hide();
 				$("#sheet2_btn_show").show();
 				break;
 			//#4608 [WMS] In/Outbound Management to have [Multi Row Add] button
			case "sheet2_btn_multi_row_add":			
				sheet2MultiRowAdd(sheet2, formObj.copy_cnt.value);
				formObj.copy_cnt.value = 1;
				break;
			//#4562 [Korex] WMS Outbound Delivery Status (v461.14) 
			case "btn_rcv_shp_dt":
	            var cal=new ComCalendar();
	            cal.select(formObj.rcv_shp_dt,  'MM-dd-yyyy');
 				break;
			case "DO":
				if(sheet2.RowCount()== 0){
					//There is no data
					console.log('No data');
					alert(getLabel('FMS_COM_ALT004'));
				}else{
					console.log("Popup");
					var order_no= document.getElementById('cust_ord_no').value;
					var booking_no = document.getElementById('wob_bk_no').value;
					
					var reqParam='?cust_ord_no=' + order_no;
					reqParam += '&wob_bk_no=' + booking_no;
					
					reqParam += '&mrd_file_nm=delivery_order_03.mrd';
					
					popGET('CMM_POP_1000.clt'+reqParam, '', 700, 750, "scroll:yes;status:no;help:no;");
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

function sheet2_btn_hide(){
	sheet2.SetColHidden(fix_grid02+"item_cbm", 1);
	sheet2.SetColWidth(fix_grid02+"item_cbm", 1);
	
	sheet2.SetColHidden(fix_grid02+"item_cbf", 1);
	sheet2.SetColWidth(fix_grid02+"item_cbf", 1);
	
	sheet2.SetColHidden(fix_grid02+"item_grs_kgs", 1);
	sheet2.SetColWidth(fix_grid02+"item_grs_kgs", 1);
	
	sheet2.SetColHidden(fix_grid02+"item_grs_lbs", 1);
	sheet2.SetColWidth(fix_grid02+"item_grs_lbs", 1);
	
	sheet2.SetColHidden(fix_grid02+"item_net_kgs", 1);
	sheet2.SetColWidth(fix_grid02+"item_net_kgs", 1);
	
	sheet2.SetColHidden(fix_grid02+"item_net_lbs", 1);
	sheet2.SetColWidth(fix_grid02+"item_net_lbs", 1);
	
//	sheet2.SetColHidden(fix_grid02+"po_no", 1);
//	sheet2.SetColWidth(fix_grid02+"po_no", 1);
	
}
/**
 * 마우스 아웃일때 
 */
function vslPopup(){
	var formObj =  document.form;
		rtnary=new Array(2);
		rtnary[0]="1";
		// 2011.12.27 value parameter
		if(typeof(formObj.vsl_cd)!='undefined'){
			rtnary[1]=formObj.vsl_nm.value;
			rtnary[2]=formObj.vsl_cd.value;
		}else{
			rtnary[1]="";
			rtnary[2]="";
		}
		callBackFunc = "setVslInfo";
		modal_center_open('./CMM_POP_0140.clt', rtnary, 656,450,"yes");
}
function form_deactivate() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=window.event.srcElement.getAttribute("value");
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "list_in_no":
				btn_Search();
			break;	
			default:
				form_onChange();
			break;
		}
	}
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
	return true;
}
/**
 * 마우스 아웃일때 
 */
function formSearchEqType(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				$("#eq_tpsz_cd").val(rtnArr[0]);
				$("#eq_tp_cd").val(rtnArr[2]);
			}else{
				$("#eq_tpsz_cd").val("");
				$("#eq_tp_cd").val("");
				formObj.eq_tpsz_cd.focus();
			}
		}
	}
}
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	if(srcName == "owner_cd" && !(formObj.btn_owner_cd.disabled)){
		 if(isNull(formObj.owner_cd)){
				setTlCustInfoNull("owner");
		 } else{
			 searchTlCustInfo("owner", $("#owner_cd").val());			 
		 }
	}
	else if(srcName == "buyer_cd" && !(formObj.buyer_cd.disabled)){
		 if(isNull(formObj.buyer_cd)){
				setTlCustInfoNull("buyer");
		 } else{
			 searchTlCustInfo("buyer", $("#buyer_cd").val());			 
		 }
	}
	else if(srcName == "trucker_cd" && !(formObj.btn_trucker_cd.disabled)){
		if(isNull(formObj.trucker_cd)){
			 setTlCustInfoNull("trucker");
		 }else{
			 searchTlCustInfo("trucker", $("#trucker_cd").val());
		 }
	}else if(srcName == "bill_to_cd" && !(formObj.btn_bill_to_cd.disabled)){
		if(isNull(formObj.bill_to_cd)){
			 setTlCustInfoNull("bill_to");
		 }else{
			 searchTlCustInfo("bill_to", $("#bill_to_cd").val());
		 }
	}
	else if(srcName == "eq_tpsz_cd" && !(formObj.btn_eq_tpsz_cd.disabled)){
		if(!isNull(formObj.eq_tpsz_cd)){
			var sParam="cntr_tp="+$("#eq_tpsz_cd").val();
			ajaxSendPost(formSearchEqType, 'reqVal', '&goWhere=aj&bcKey=searchCntrTrTp&'+sParam, './GateServlet.gsl');
		}
	}
	else if(srcName == "vsl_cd" && !(formObj.btn_vsl_cd.disabled)){
		if(isNull(formObj.vsl_cd)){
			setTlVslInfoNull("vsl");
		}else{
			searchTlVslInfo("vsl", $("#vsl_cd").val());
		}
	}else if(srcName == "carrier_cd" && !(formObj.btn_carrier_cd.disabled)){
		if(isNull(formObj.carrier_cd)){
			setTlCustInfoNull("carrier");
		}else{
			searchTlCustInfo("carrier", $("#carrier_cd").val());			
		}
	}else if(srcName == "pol" && !(formObj.btn_pol.disabled)){
		 if(isNull(formObj.pol)){
			 setTlLocInfoNull("pol");
		 }else{
			 searchTlLocInfo("pol", ComGetObjValue(formObj.pol), "P");			 
		 }
	}else if(srcName == "pod" && !(formObj.btn_pod.disabled)){
		if(isNull(formObj.pod)){
			setTlLocInfoNull("pod");
		}else{
			searchTlLocInfo("pod", ComGetObjValue(formObj.pod), "P");			
		}
	}else if(srcName == "del" && !(formObj.btn_del.disabled)){
		if(isNull(formObj.del)){
			setTlLocInfoNull("del");
		}else{
			searchTlLocInfo("del", ComGetObjValue(formObj.del), "P");			
		}
	}
}	
/*
 * 조회
 */
function btn_Search(isNotShowProcess){
	var formObj=document.form;
	//var sheetObj=sheet1;
	if(loading_flag != "Y"){
		return;
	}
	//validation check
	if (validateForm(formObj, 'search') == false) 
	{
		return;	
	}
	formObj.f_cmd.value = SEARCH;
	//sheet초기화 및 form tab초기화	
	//sheet1.RemoveAll();
	sheet2.RemoveAll();
	sheet3.RemoveAll();
	sheet4.RemoveAll();
	sheet5.RemoveAll();
	sheet6.RemoveAll();
	formObj.logo_rectangle.value ="";
	//Attachment 탭 초기화
	setFieldValue(formObj.file_path, "");
	/*var sXml = sheetObj.GetSearchData("./searchWHOutMgmtListGS.clt", FormQueryString(formObj,""));
	sheetObj.LoadSearchData(sXml);*/
	formObj.wob_bk_no.value="";
	formObj.cust_ord_no.value = "";
	
	if(formObj.list_in_search_tp.value=="CUST_ORD_NO"){
		searchBookingData(formObj.wob_bk_no.value,formObj.list_in_no.value,"", isNotShowProcess);
//		goTabSelect("01");
	}else{
		searchBookingData(formObj.list_in_no.value,formObj.cust_ord_no.value,"", isNotShowProcess);
//		goTabSelect("01");
	}	
	//searchBookingData(sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no"), sheetObj.GetCellValue(Row, fix_grid01 + "cust_ord_no"), sheetObj.GetCellValue(Row, fix_grid01 + "wave_no"));
}

function resetAll(sheet1_clear_flg,oth_sheet_clear_flg)
{
	if(sheet1_clear_flg == true)
	{
		//sheet1.RemoveAll();
	}
	if(oth_sheet_clear_flg == true)
	{
		sheet2.RemoveAll();
		sheet3.RemoveAll();
		sheet4.RemoveAll();
		sheet6.RemoveAll();
	}
	$("#sel_wob_bk_no").val("");
	$("#sel_wave_no").val("");
	$("#sel_ctrt_no").val("");
	$("#sel_ctrt_nm").val("");
	$("#sel_wh_cd").val("");
	$("#sel_wh_nm").val("");
	$("#file_cust_ord_no").val("");
	$("#c_wob_bk_no").val("");
	form_tab_new_setting();
	//form_tab_field_enable(true);
	ComBtnDisable("btn_file_delete");
	ComBtnDisable("btn_file_upload");
	$("#file_path").val("");
//	uploadObjects[0].DeleteFile();
	
	// Bill To 정보 clear
	//$("#bill_to_cd").val("");
	//$("#bill_to_nm").val("");
	//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked" - Optionized needed
	if (opt_chk == "Y"){
		ComBtnDisable("btn_rating");
		ComBtnEnable("btn_frtAdd");	
//	 	formObj.bill_to_cd.value = formObj.owner_cd.value;
//	 	formObj.bill_to_nm.value = formObj.owner_nm.value;
	}else{
		ComBtnDisable("btn_rating");
		ComBtnDisable("btn_frtAdd");	
	}
}
function searchBookingData(wob_bk_no, cust_ord_no, wave_no, isNotShowProcess)
{
	var formObj=document.form;
	//Attachment 탭 초기화
	//ComSetObjValue(formObj.file_path, "");
	//uploadObjects[0].DeleteFile();
	if(!isNotShowProcess){
		doShowProcess(true);
	}
	sheet2.RemoveAll();
	sheet3.RemoveAll();
	sheet4.RemoveAll();
	sheet5.RemoveAll();
	formObj.logo_rectangle.value ="";
	//Attachment 탭 초기화
	setFieldValue(formObj.file_path, "");
	var sXml=sheet2.GetSearchData("./searchWHOutMgmtInfoGS.clt", "wob_bk_no=" + wob_bk_no+"&f_cmd="+SEARCH01 + "&cust_ord_no=" + cust_ord_no + "&wh_cd=" + formObj.wh_cd.value);
	var strtIndxCheck = sXml.indexOf("<CHECK>") + "<CHECK>".length;
	var endIndxCheck = sXml.indexOf("</CHECK>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxCheck,endIndxCheck));
	var $xml = $(xmlDoc);
	if ($xml.find( "listCnt").text() != '0'){
		
		setDataControl(sXml);
		if(wob_bk_no == ""){
			wob_bk_no = formObj.wob_bk_no.value;
		}
		if(cust_ord_no == ""){
			cust_ord_no = formObj.cust_ord_no.value;
		}
		
		if($("#trade_tp_cd")[0].value == "")
		{
			$("#trade_tp_cd")[0].value="DOM";
		}
		if($("#fwd_tp_cd")[0].value == "")
		{
			$("#fwd_tp_cd")[0].value="OTH";
		}
		if($("#ord_tp_cd")[0].value == "A")
		{
			ord_tp_cd_OnChange($("#ord_tp_cd")[0], "A", "");
		}
		var strtIndxSheet2 = sXml.indexOf("<SHEET2>");
		var endIndxSheet2 = sXml.indexOf("</SHEET2>") + "</SHEET2>".length;
		var sheet2Data = sXml.substring(strtIndxSheet2,endIndxSheet2);
		if (sheet2Data.replace(/^\s+|\s+$/gm,'') != ""){
			sheet2.LoadSearchData(sheet2Data.replaceAll('SHEET2', 'SHEET'));
			sheet2.ShowSubSum([{StdCol:fix_grid02+"item_cd", SumCols:fix_grid02+"item_pkgqty|" + fix_grid02+"item_ea_qty|" + fix_grid02+"shp_pkgqty|" + fix_grid02+"shp_ea_qty|" + fix_grid02+"item_cbm|" + fix_grid02+"item_cbf|" + fix_grid02+"item_grs_kgs|" 
				+ fix_grid02+"item_grs_lbs|" + fix_grid02+"item_net_kgs|" + fix_grid02+"item_net_lbs|" + fix_grid02+"unit_price"
				, ShowCumulate:0, CaptionCol:fix_grid02+"item_nm", CaptionText: "Sub Total"}]);
		}
		
		var strtIndxSheet3 = sXml.indexOf("<SHEET3>");
		var endIndxSheet3 = sXml.indexOf("</SHEET3>") + "</SHEET3>".length;
		var sheet3Data = sXml.substring(strtIndxSheet3,endIndxSheet3);
		sheet3.LoadSearchData(sheet3Data.replaceAll('SHEET3', 'SHEET'));
		
		var strtIndxSheet4 = sXml.indexOf("<SHEET4>");
		var endIndxSheet4 = sXml.indexOf("</SHEET4>") + "</SHEET4>".length;
		var sheet4Data = sXml.substring(strtIndxSheet4,endIndxSheet4);
		sheet4.LoadSearchData(sheet4Data.replaceAll('SHEET4', 'SHEET'));
		
		//sheet6
		var strtIndxSheet6 = sXml.indexOf("<SHEET6>");
		var endIndxSheet6 = sXml.indexOf("</SHEET6>") + "</SHEET6>".length;
		var sheet6Data = sXml.substring(strtIndxSheet6,endIndxSheet6);

		sheet6.LoadSearchData(sheet6Data.replaceAll('SHEET6', 'SHEET'));
		
		if($("#work_sht_yn").val() == "Y")
		{
			btn_show_uploading_sheet(false);
		}
		else
		{
			btn_show_uploading_sheet(true);
		}
		$("#form_mode").val("UPDATE");
		form_tab_field_enable(false);
		ComBtnEnable("btn_file_delete");
		ComBtnEnable("btn_file_upload");
		$("#sel_wob_bk_no").val(wob_bk_no);
		$("#sel_wave_no").val(wave_no);
		$("#file_cust_ord_no").val(cust_ord_no);
		$("#c_wob_bk_no").val(wob_bk_no);
		$("#sel_ctrt_no").val($("#ctrt_no").val());
		$("#sel_ctrt_nm").val($("#ctrt_nm").val());
		$("#sel_wh_cd").val($("#wh_cd").val());
		$("#sel_wh_nm").val($("#wh_nm").val());
		if($("#bk_sts_cd").val().trim() == "N")
		{
			$("#trade_tp_cd")[0].disabled = true;
			$("#fwd_tp_cd")[0].disabled = true;
			$("#ord_tp_cd")[0].disabled = true;
			$("#load_tp_cd")[0].disabled = true;
		}
		else if($("#bk_sts_cd").val().trim() == "I")
		{
			$("#ord_tp_cd")[0].disabled = true;
			$("#load_tp_cd")[0].disabled = true;
			ComBtnEnable("btn_est_out_dt");
			ComEnableObject(document.form.est_out_dt, true);
		}
		else
		{
			$("#ord_tp_cd")[0].disabled = false;
			$("#load_tp_cd")[0].disabled = false;
		}
		//if the booking no is exist --> enable "Aloc & Complete" button
		if($("#wob_bk_no").val() != ""){
			$("#allocComplete").prop("disabled", false);
		}
		
		formObj.bill_to_cd.value = formObj.owner_cd.value;
	 	formObj.bill_to_nm.value = formObj.owner_nm.value;
	 	
	 	//Load WH Office Code Info
		var strtIndxSheet = sXml.indexOf("<WH_OFC_CD>");
		var endIndxSheet = sXml.indexOf("</WH_OFC_CD>") + "</WH_OFC_CD>".length;
		var whOfcCd = sXml.substring(strtIndxSheet + "<WH_OFC_CD>".length ,endIndxSheet - "</WH_OFC_CD>".length );
		
		//Load WH Office Code에 해당하는 Currency
		var strtIndxSheet2 = sXml.indexOf("<WH_CURR_CD>");
		var endIndxSheet2 = sXml.indexOf("</WH_CURR_CD>") + "</WH_CURR_CD>".length;
		var whCurrCd = sXml.substring(strtIndxSheet2 + "<WH_CURR_CD>".length ,endIndxSheet2 - "</WH_CURR_CD>".length );
		
		if (whOfcCd == null || whOfcCd == "" ) {
			formObj.wh_ofc_cd.value = formObj.ofc_cd.value;
		} else {
			formObj.wh_ofc_cd.value = whOfcCd;
		} 
		formObj.wh_curr_cd.value = whCurrCd;
		document.getElementById("sp_curr_cd").innerHTML = whCurrCd;
	}else {
   	 	//ComShowCodeMessage("COM0192"); // W/H Booking No does not exist.
		ComShowCodeMessage("COM0266","Booking No Or Order No"); // W/H Booking No does not exist.
		formObj.list_in_no.value= "";
   	 	doHideProcess(false);
	}
}
function setDataControl(sXml) {
	var formObj=document.form;
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	
	formObj.wh_cd.value = $xml.find( "wh_cd").text();
	formObj.ctrt_no.value = $xml.find( "ctrt_no").text();
	formObj.ctrt_nm.value = $xml.find( "ctrt_nm").text();
	formObj.rtp_no.value = $xml.find( "rtp_no").text();
	formObj.owner_cd.value = $xml.find( "owner_cd").text();
	formObj.owner_addr1.value = $xml.find( "owner_addr1").text();
	formObj.cust_ord_no.value = $xml.find( "cust_ord_no").text();

	//#3195 [BINEX WMS4.0] [#3100 개선] INBOUND LIST AND ENTRY SHOWING DIFF SKU
	$('#cust_ord_no').attr('org_cust_ord_no', $('#cust_ord_no').val());

	formObj.wob_bk_no.value = $xml.find( "wob_bk_no").text();
	formObj.bk_sts_cd.value = $xml.find( "bk_sts_cd").text();
	formObj.bk_sts_nm.value = $xml.find( "bk_sts_nm").text();
	formObj.ord_tp_cd.value = $xml.find( "ord_tp_cd").text();
	formObj.bk_date.value = convDate($xml.find( "bk_date").text());
	formObj.load_tp_cd.value = $xml.find( "load_tp_cd").text();
	formObj.est_out_dt.value = convDate($xml.find( "est_out_dt").text());
	formObj.est_out_hm.value = $xml.find( "est_out_hm").text();
	
	// #4562 [Korex] WMS Outbound Delivery Status (v461.14)
	if( $xml.find( "dlvr_flg").text() == "Y" ){
		formObj.dlvr_flg.value = 'Y';
    	formObj.dlvr_flg.checked = true;   // check 
	}else{
		formObj.dlvr_flg.value = 'N';
		formObj.dlvr_flg.checked = false;  //uncheck
	}
	    
	if($xml.find( "dlvr_dt").text() != ""){			//split data to date and time
		formObj.rcv_shp_dt.value = convertDate($xml.find("dlvr_dt").text());
		formObj.rcv_shp_tm.value = $xml.find("dlvr_dt").text().substring(8,10) +":"+$xml.find("dlvr_dt").text().substring(10,12);
	}	
	
	formObj.trade_tp_cd.value = $xml.find( "trade_tp_cd").text();
	formObj.fwd_tp_cd.value = $xml.find( "fwd_tp_cd").text();
	formObj.trucker_cd.value = $xml.find( "trucker_cd").text();
	formObj.trucker_nm.value = $xml.find( "trucker_nm").text();
	formObj.eq_tpsz_cd.value = $xml.find( "eq_tpsz_cd").text();
	formObj.eq_no.value = $xml.find( "eq_no").text();
	formObj.eq_tp_cd.value = $xml.find( "eq_tp_cd").text();
	formObj.seal_no.value = $xml.find( "seal_no").text();
	formObj.dlv_ord_no.value = $xml.find( "dlv_ord_no").text();
	formObj.buyer_addr1.value = $xml.find( "buyer_addr1").text();
	formObj.buyer_cd.value = $xml.find( "buyer_cd").text();
	formObj.ref_no.value = $xml.find( "ref_no").text();
	formObj.commc_inv_no.value = $xml.find( "commc_inv_no").text();
	formObj.mbl_no.value = $xml.find( "mbl_no").text();
	formObj.hbl_no.value = $xml.find( "hbl_no").text();
	formObj.vsl_cd.value = $xml.find( "vsl_cd").text();
	formObj.vsl_nm.value = $xml.find( "vsl_nm").text();
	formObj.voy.value = $xml.find( "voy").text();
	formObj.carrier_cd.value = $xml.find( "carrier_cd").text();
	formObj.carrier_nm.value = $xml.find( "carrier_nm").text();
	formObj.pol.value = $xml.find( "pol").text();
	formObj.pol_nm.value = $xml.find( "pol_nm").text();
	formObj.pod.value = $xml.find( "pod").text();
	formObj.pod_nm.value = $xml.find( "pod_nm").text();
	formObj.del.value = $xml.find( "del").text();
	formObj.del_nm.value = $xml.find( "del_nm").text();
	formObj.etd.value =convDate( $xml.find( "etd").text());
	formObj.eta.value =convDate( $xml.find( "eta").text());
	formObj.work_sht_yn.value = $xml.find( "work_sht_yn").text();
	formObj.rmk.value = $xml.find( "rmk").text();
	formObj.wave_no.value = $xml.find( "wave_no").text();
	formObj.smp_wave_flg.value = $xml.find( "smp_wave_flg").text();
	formObj.buyer_nm.value = $xml.find( "buyer_nm").text();
	formObj.owner_nm.value = $xml.find( "owner_nm").text();
	formObj.outbound_dt.value = $xml.find( "outbound_dt").text();
	
	//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
	if(formObj.bk_sts_cd.value == "I"){ //Booked
		formObj.bk_sts_nm.style.background = bgBooked;
	}else if(formObj.bk_sts_cd.value == "A"){ //Alllocate
		formObj.bk_sts_nm.style.background = bgAllocated;
	}else if(formObj.bk_sts_cd.value == "P"){ //Picked
		formObj.bk_sts_nm.style.background = bgPicked;
	}else if(formObj.bk_sts_cd.value == "X"
		     || formObj.bk_sts_cd.value == "BK"
		    	 || formObj.bk_sts_cd.value == "LP"
		){ //Complete
		formObj.bk_sts_nm.style.background = bgComplete;
	}else if(formObj.bk_sts_cd.value == "C"){ //Cancel
		formObj.bk_sts_nm.style.background = bgCancel;
	}else{  //init
		formObj.bk_sts_nm.style.background = bgInit;
	}

	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION 
	getCtrtInfo(formObj.ctrt_no);
}
//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked" - Optionized needed
var opt_chk = "Y";
function checkFrtOpt(reqVal){
	var formObj=document.form;
	  var doc=getAjaxMsgXML(reqVal);

	  if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		  opt_chk=doc[1];
	  }
}
function default1RowAdd()
{
	//
	/*var row=sheet1RowAdd(sheet1);
	if(row > 0)
	{
		setTimeout("setSheet1Focus('" + row + "')", 100); //1000(1초)  100(0.1초)
	}*/
}
/*
 * Form New
 */
function btn_New()
{
	/*if($("#sel_tab").val() == "01")
	{
		//function sheet1RowAdd(sheetObj)
		if(sheet1.RowCount("I") >= 1)
		{
			//행삭제 후
			var new_row=sheet1.FindStatusRow("I");
			var arrRow=new_row.split(";");
			sheet1.RowDelete(arrRow[0], false);
		}
		var row=sheet1RowAdd(sheet1);
		setSheet1Focus(row);
	}
	else
	{*/
		//var row=sheet1RowAdd(sheet1);
		//setSheet1Focus(row);
		
		//#3195 [BINEX WMS4.0] [#3100 개선] INBOUND LIST AND ENTRY SHOWING DIFF SKU
		$('#cust_ord_no').removeAttr('org_cust_ord_no');

		resetAll(false,true);
		// add more
		$("#cust_ord_no").val('');
		$("#wob_bk_no").val('');
		$("#buyer_nm").val('');
		$("#buyer_cd").val('');
		$("#buyer_addr1").val('');
		$("#eq_tpsz_cd").val('');
		$("#eq_no").val('');
		$("#eq_no").val('');
		$("#dlv_ord_no").val('');
		$("#mbl_no").val('');
		$("#hbl_no").val('');
		$("#vsl_cd").val('');
		$("#vsl_nm").val('');
		$("#carrier_cd").val('');
		$("#carrier_nm").val('');
		$("#ref_no").val('');
		$("#commc_inv_no").val('');
		$("#rmk").val('');
		$("#seal_no").val('');
		$("#est_out_dt").val('');
		$("#est_out_hm").val('');
		
		// #4562 [Korex] WMS Outbound Delivery Status (v461.14 or later)
		checkDelivered();
		
		$("#pol").val('');
		$("#pol_nm").val('');
		$("#etd").val('');
		$("#pod").val('');
		$("#pod_nm").val('');
		$("#eta").val('');
		$("#del").val('');
		$("#del_nm").val('');
		$("#trucker_nm").val('');
		$("#trucker_cd").val('');
		$("#voy").val('');
		$("#list_in_no").val('');
		$("#allocComplete").prop("disabled", true);
		
		formObj.eq_tpsz_cd.disabled = false;
		formObj.btn_eq_tpsz_cd.disabled = false;
		formObj.eq_no.disabled = false;
		formObj.seal_no.disabled = false;
		formObj.btn_seal_no.disabled = false;
		
		goTabSelect("01");
		
	/*}*/
}
function btn_Save()
{
//	sheet2.HideSubSum();
	var formObj=document.form;
	var sheetObj = sheet2;
	var prefix= fix_grid02;
	// Freight탭인 경우
	//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
	//if ($("#sel_tab").val() == "02") {
	
	// #6892 [Total Cargo]- WMS] System not allowing ship out Input - Author Thuong Huynh 2020-11-18
	if($("#eq_no").val().trim().length > 0 && $("#eq_tpsz_cd").val().trim().length <= 0){
		ComShowCodeMessage("COM0773");
//		sheetObj.SelectCell(i,"eq_tpsz_cd");
		return;
	}
	
	for(var i = 2 ; i <= sheet2.RowCount() + 1 ; i++){
		if(sheetObj.GetCellValue(i,prefix+"eq_no").trim().length > 0 && sheetObj.GetCellValue(i,prefix+"eq_tpsz_cd").trim().length <= 0){
			ComShowCodeMessage("COM0773");
//			sheetObj.SelectCell(i,"eq_tpsz_cd");
			return;
		}
	}
		if(validateForm(formObj, "sheet6_save")== false)
		{
			return;
		}
	//} else {
		if(validateForm(formObj, "save") == false)
		{
			return;
		}
	//}
	if(saveFlg != "Grid"){
		if(ComShowCodeConfirm("COM0063") == false){
				return;
			}
	}else{
		saveFlg = ""
	}	
	var fix_Docin="Docin";
	if(formObj.sel_wob_bk_no.value=="")
		$("#sel_wob_bk_no").val(formObj.wob_bk_no.value);
	
	var DocinDatas=fix_Docin + "sel_wob_bk_no=" + $("#sel_wob_bk_no").val();
	DocinDatas=DocinDatas + "&" + fix_Docin + "sel_tab=02"/* + $("#sel_tab").val()*/;
	DocinDatas=DocinDatas + "&" + fix_Docin + "form_mode=" + $("#form_mode").val();
	var headerDatas="";
	/*if($("#sel_tab").val() == "01")
	{
		headerDatas=ComGetSaveString(sheet1, true, true)+"&f_cmd=" + MODIFY;
	}
	else if($("#sel_tab").val() == "02")
	{*/
	formObj.f_cmd.value = MODIFY;
	headerDatas=FormQueryString(formObj);
	/*}*/
	for(var i = 2 ; i <= sheet2.RowCount() + 1 ; i++){
		if(i> 2 && sheet2.GetCellValue(i,fix_grid02+"item_seq") == sheet2.GetCellValue(i - 1,fix_grid02+"item_seq")){
			if(sheet2.GetCellValue(i,fix_grid02+"item_pkgqty") == 0){
				sheet2.SetCellValue(i,fix_grid02+"item_pkgqty",sheet2.GetCellValue(i - 1,fix_grid02+"item_pkgqty"),0)
			}
			if(sheet2.GetCellValue(i,fix_grid02+"item_ea_qty") == 0){
				sheet2.SetCellValue(i,fix_grid02+"item_ea_qty",sheet2.GetCellValue(i - 1,fix_grid02+"item_ea_qty"),0)
			}
		}
	}
	var itemDatas=ComGetSaveString(sheet2, true, true); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
	//Freight Tab
	var frtDatas="";
	if (l_btn_rateFlg) {
		frtDatas= sheet6.GetSaveString(1); 
	} else {
		frtDatas= sheet6.GetSaveString(0);
	}
	
	var saveXml=sheet2.GetSaveData("./saveWHOutMgmtLongTransactionGS.clt", DocinDatas + "&" + headerDatas + "&" + itemDatas + "&" + frtDatas);
//	sheet2.LoadSaveData(saveXml);
	//1. Save 후 조회
	//SaveEnd
	if(saveXml.indexOf("ERROR")>=0){
		if(saveXml.indexOf("Order No is duplicated.") > 0){
			ComShowCodeMessage("COM131302", "Order No");
			formObj.cust_ord_no.value = "";
		}else{
			sheet2.LoadSearchData(saveXml);
		}
	}else if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
		var xmlDoc = $.parseXML(saveXml);
		var $xml = $(xmlDoc);
		var ret_wob_bk_no = $xml.find("ret_wob_bk_no").text();
		var ret_bk_sts_cd = $xml.find("ret_bk_sts_cd").text();
		showCompleteProcess();
		SaveAfterProcess(ret_wob_bk_no, ret_bk_sts_cd, true);
	}
}
function SaveAfterProcess(ret_wob_bk_no, ret_bk_sts_cd, isNotShowProcess)
{
	var formObj=document.form;
	//var sheetObj=sheet1;
	//var row=sheetObj.HeaderRows();
	/*if($("#sel_tab").val() == "01")
	{
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			if(sheetObj.GetRowStatus(i) == "I" && $("#form_mode").val() == "NEW")
			{
				sheetObj.SetRowStatus(i,"R");
				sheetObj.SetCellValue(i, fix_grid01 + "wob_bk_no",ret_wob_bk_no,0);
				sheetObj.SetCellValue(i, fix_grid01 + "bk_sts_cd",ret_bk_sts_cd,0);
				sheetObj.SetCellValue(i, fix_grid01 + "row_add","+",0);
				sheetObj.SetCellValue(i, fix_grid01 + "row_del","",0);
				sheetObj.SetCellValue(i, fix_grid01 + "work_sht_yn","N");
				sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",1);
				sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",1);
				sheetObj.SetCellEditable(i, fix_grid01 + "est_out_dt",1);
				//폰트색상 변경
				sheetObj.SetCellFontColor(i, fix_grid01 + "wob_bk_no","#0100FF");
				//sheetObj.CellFontColor(i, fix_grid01 + "cust_ord_no")  = "#0100FF";
				row=i;
			}
			else
			{
				if(sheetObj.GetCellValue(i, fix_grid01 + "wob_bk_no") == ret_wob_bk_no)
				{
					sheetObj.SetCellValue(i, fix_grid01 + "bk_sts_cd",ret_bk_sts_cd,0);
					sheetObj.SetCellEditable(i, fix_grid01 + "trade_tp_cd",0);
					sheetObj.SetCellEditable(i, fix_grid01 + "fwd_tp_cd",0);
					if(ret_bk_sts_cd == "I")
					{
						sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",1);
						sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",1);
						sheetObj.SetCellEditable(i, fix_grid01 + "est_out_dt",1);
					}
					else
					{
						sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",0);
						sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",0);
						sheetObj.SetCellEditable(i, fix_grid01 + "est_out_dt",0);
					}
					row=i;
				}
			}
		}
		sheet1_OnDblClick(sheetObj,row, sheetObj.SaveNameCol(fix_grid01 + "wob_bk_no"), sheetObj.GetCellValue(row, fix_grid01 + "wob_bk_no"));
		sheetObj.SelectCell(row, sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"))  ;
	}
	else
	{*/
		$("#bk_sts_cd").val(ret_bk_sts_cd);
		$("#wob_bk_no").val(ret_wob_bk_no);
		if(ret_bk_sts_cd == "I")
		{
			//$("#bk_sts_nm").val(bk_sts_I);
			$("#ord_tp_cd")[0].disabled = true;
			$("#load_tp_cd")[0].disabled = true;
			ComBtnEnable("btn_est_out_dt");
			ComEnableObject(document.form.est_out_dt, true);
		}
		else
		{
			$("#ord_tp_cd")[0].disabled = false;
			$("#load_tp_cd")[0].disabled = false;
			ComBtnDisable("btn_est_out_dt");
			ComEnableObject(document.form.est_out_dt, false);
		}
		btn_show_uploading_sheet(true);
		//HeaderDataCopy("01");
		if($("#form_mode").val() == "NEW")
		{
			/*var new_row=sheetObj.FindStatusRow("I");
			var arrRow=new_row.split(";");
			sheetObj.SetRowStatus(arrRow[0],"R");
			sheetObj.SetCellValue(arrRow[0], fix_grid01 + "row_add","+",0);
			sheetObj.SetCellValue(arrRow[0], fix_grid01 + "row_del","",0);
			sheetObj.SetCellValue(arrRow[0], fix_grid01 + "work_sht_yn","N");
			sheetObj.SetCellEditable(arrRow[0], fix_grid01 + "ord_tp_cd",1);
			sheetObj.SetCellEditable(arrRow[0], fix_grid01 + "load_tp_cd",1);
			sheetObj.SetCellEditable(arrRow[0], fix_grid01 + "est_out_dt",1);
			//폰트색상 변경
			sheetObj.SetCellFontColor(arrRow[0], fix_grid01 + "wob_bk_no","#0100FF");
			//sheetObj.CellFontColor(arrRow[0], fix_grid01 + "cust_ord_no")  = "#0100FF";
			row=arrRow[0];*/
		}
		else
		{
			/*for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++)
			{
				if(sheetObj.GetCellValue(i, fix_grid01 + "wob_bk_no") == ret_wob_bk_no)
				{
					sheetObj.SetCellValue(i, fix_grid01 + "bk_sts_cd",ret_bk_sts_cd,0);
					sheetObj.SetCellEditable(i, fix_grid01 + "trade_tp_cd",0);
					sheetObj.SetCellEditable(i, fix_grid01 + "fwd_tp_cd",0);
					if(ret_bk_sts_cd == "I")
					{
						sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",1);
						sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",1);
						sheetObj.SetCellEditable(i, fix_grid01 + "est_out_dt",1);
					}
					else
					{
						sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",0);
						sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",0);
					}
					row=i;
				}
			}*/
		}
		
		/*sheet1_OnDblClick(sheetObj,row, sheetObj.SaveNameCol(fix_grid01 + "wob_bk_no"), sheetObj.GetCellValue(row, fix_grid01 + "wob_bk_no"));
		sheetObj.SelectCell(row, sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"))  ;
		goTabSelect("02");*/
		
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
		//if(formObj.list_in_no.value==""){
			formObj.list_in_search_tp.value ="WOB_BK_NO";
			formObj.list_in_no.value = ret_wob_bk_no;
		//}
			
		btn_Search(isNotShowProcess);
		goTabSelect($("#sel_tab").val());
	/*}*/
}
function btn_Delete()
{
	var formObj=document.form;
	if($("#sel_wob_bk_no").val().trim() == ""){
		$("#sel_wob_bk_no").val($("#wob_bk_no").val())
	}
	if($("#sel_tab").val().trim() == ""){
		$("#sel_tab").val("01");
	}
	// Freight Tab인경우
	if($("#sel_tab").val() == "02")
	{
		// Form Tab이동
		goTabSelect("01");
	}
	
	if(validateForm(formObj, "cancel") == false)
	{
		return;
	}
	var DocinDatas="";
	var fix_Docin="Docin";
	var sheetObj=sheet2;
	/*if($("#sel_tab").val() == "01") //list tab에서 delete
	{
		var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
		var arrRow=sRow.split("|"); //결과 : "1|3|5|"
		for(var i=0; i<arrRow.length; i++)
		{
			if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "bk_sts_cd") != "X")
			{
				if(DocinDatas.length == 0)
				{
					DocinDatas=fix_Docin + "sel_wob_bk_no=" + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wob_bk_no") ;
				}
				else
				{
					DocinDatas=DocinDatas + "&" + fix_Docin + "sel_wob_bk_no=" + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wob_bk_no");
				}
			}
		}
	}*/
	if($("#sel_tab").val() == "01")//else if($("#sel_tab").val() == "02")
	{
		if($("#bk_sts_cd").val() != "X")
		{
			if(formObj.sel_wob_bk_no.value=="")
				formObj.sel_wob_bk_no.value = formObj.wob_bk_no.value;
			DocinDatas=fix_Docin + "sel_wob_bk_no=" + $("#sel_wob_bk_no").val();
		}
	}
	if(DocinDatas.length == 0)
	{
		ComShowCodeMessage("COM0437");
		return;
	}
	if(ComShowCodeConfirm("COM0424") == false){
		return;
	}
	var saveXml=sheetObj.GetSaveData("./cancelWHOutMgmtBookingLongTransactionGS.clt", DocinDatas+"&f_cmd=" + REMOVE);
	//	sheet2.LoadSaveData(saveXml);
	//1. Save 후 조회
	//SaveEnd
	if( saveXml.indexOf('<MESSAGE>') == -1){
		formObj.list_in_no.value= "";
		resetAll(true,true);
		showCompleteProcess();
	}
	
	/*var xmlDoc = $.parseXML(saveXml);
	var $xml = $(xmlDoc);
	if ($xml.find("message").text() != ''){
		ComShowMessage($xml.find("message").text());
	}else {
		showCompleteProcess();	
		DeleteAfterProcess(sheetObj, arrRow);
	}*/
}
function DeleteAfterProcess(sheetObj, arrRow)
{
	/*if($("#sel_tab").val() == "01") //list tab에서 delete
	{
		var cnt=0;
		var row;
		//체크된건 화면에서 row 삭제처리
		for (var i=arrRow.length-1; i>=0; i--){
			if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "bk_sts_cd") != "X")
			{
				if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wob_bk_no") == $("#sel_wob_bk_no").val())
				{
					cnt=cnt + 1;
					row=arrRow[i];
				}
				sheetObj.RowDelete(arrRow[i], false);
			}
		}
		//체크된건 화면에서 삭제 후 row가 한건이상 존재할경우
		if(sheetObj.RowCount()> 0)
		 {
			//삭제 체크한 건중에 현재 선택된 부킹이 없다면 sheet1만 삭제하고 다음 스탭 없음.(기존 item, form, doc detail, attachment유지)
			if(cnt <= 0)
			{	
				return;
			}
			//삭제 체크한 건중에 현재 선택된 부킹이 존재한다면 첫번째 row로 재셋팅
			if(sheetObj.GetRowStatus(sheetObj.HeaderRows()) == "I")
			{	
				//선택된 행 색상 변경
				selectCellColorChange(sheetObj, sheetObj.HeaderRows());
				if($("#form_mode").val() == "NEW")
				{
					//skip
				}
				else
				{
					resetAll(false, true);
				}
			}
			else
			{
				sheet1_OnDblClick(sheetObj,sheetObj.HeaderRows(), sheetObj.SaveNameCol(fix_grid01 + "wob_bk_no"), sheetObj.GetCellValue(sheetObj.HeaderRows(), fix_grid01 + "wob_bk_no"));
				sheetObj.SelectCell(sheetObj.HeaderRows(), sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"))  ;
			}
		 }
		//체크된건 화면에서 삭제 후 row가 모두사라진경우
		 else
		 {
			 //헤더만 남겨놓고 모두 삭제 후
			 resetAll(false, true);
			 //new row기본 생성
			 default1RowAdd();
		 }
	}*/
	/*else
	{*/
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++)
		{
			if(sheetObj.GetCellValue(i, fix_grid01 + "wob_bk_no") == $("#sel_wob_bk_no").val())
			{
				sheetObj.RowDelete(i, false);
			}
		}
		if(sheetObj.GetRowStatus(sheetObj.HeaderRows()) == "I")
		{
			resetAll(false, true);
		}
		else
		{
			//sheet1_OnDblClick(sheetObj,sheetObj.HeaderRows(), sheetObj.SaveNameCol(fix_grid01 + "wob_bk_no"), sheetObj.GetCellValue(sheetObj.HeaderRows(), fix_grid01 + "wob_bk_no"));
			//sheetObj.SelectCell(sheetObj.HeaderRows(), sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"))  ;
			btn_Search()
			goTabSelect("01");
		}
	/*}*/
}
function btn_CCancel()
{
	var formObj=document.form;
	if($("#sel_wob_bk_no").val().trim() == "")
	{
		$("#sel_wob_bk_no").val($("#wob_bk_no").val());
	}
	if(validateForm(formObj, "ccancel") == false)
	{
		return;
	}
	var DocinDatas="";
	var fix_Docin="Docin";
	var sheetObj=sheet2;
	/*if($("#sel_tab").val() == "01") //list tab에서 delete
	{
		var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
		var arrRow=sRow.split("|"); //결과 : "1|3|5|"
		for(var i=0; i<arrRow.length; i++)
		{
			if((sheetObj.GetCellValue(arrRow[i], fix_grid01 + "bk_sts_cd") != "X" && sheetObj.GetCellValue(arrRow[i], fix_grid01 + "bk_sts_cd") != "I"))
			{
				if(DocinDatas.length == 0)
				{
					DocinDatas=fix_Docin + "sel_wob_bk_no=" + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wob_bk_no") ;
				}
				else
				{
					DocinDatas=DocinDatas + "&" + fix_Docin + "sel_wob_bk_no=" + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wob_bk_no");
				}
			}
		}
	}*/
	if($("#sel_tab").val() == "01")//else if($("#sel_tab").val() == "02")
	{
		if($("#bk_sts_cd").val() != "X" && $("#bk_sts_cd").val() != "I")
		{
			DocinDatas=fix_Docin + "sel_wob_bk_no=" + $("#sel_wob_bk_no").val();
		}
	}
	if(DocinDatas.length == 0)
	{
		ComShowCodeMessage("COM0392");
		return;
	}
	if(ComShowCodeConfirm("COM0040") == false){
		return;
	}
	var saveXml=sheetObj.GetSaveData("./cancelWHOutMgmtCompleteGS.clt", DocinDatas+"&f_cmd=" + MULTI);
//	sheetObj.LoadSaveData(saveXml);
	//1. Save 후 조회
	//SaveEnd
	var xmlDoc = $.parseXML(saveXml);
	var $xml = $(xmlDoc);
	if ($xml.find("message").text() != ''){
		ComShowMessage($xml.find("message").text());
	}else {
		showCompleteProcess();		
		CCancelAfterProcess(sheetObj/*, arrRow*/, false);
	}
}
function CCancelAfterProcess(sheetObj/*, arrRow*/, isNotShowProcess)
{
	/*if($("#sel_tab").val() == "01") //list tab에서 delete
	{
		//CCancel된건은 상태값을 변경(Booked I상태로 변경)
		var cnt=0;
		var row;
		for(var i=0; i<arrRow.length; i++)
		{
			if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "bk_sts_cd") != "X" && sheetObj.GetCellValue(arrRow[i], fix_grid01 + "bk_sts_cd") != "I")
			{
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "bk_sts_cd","I",0);
				//sheetObj.CellImage(arrRow[i], fix_grid01 + "work_sht") = "";
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "wave_no","",0);
				sheetObj.SetCellValue(arrRow[i], fix_grid01 + "smp_wave_flg","N",0);
				sheetObj.SetCellEditable(arrRow[i], fix_grid01 + "ord_tp_cd",1);
				sheetObj.SetCellEditable(arrRow[i], fix_grid01 + "load_tp_cd",1);
				if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wob_bk_no") == $("#sel_wob_bk_no").val())
				{
					cnt=cnt + 1;
					row=arrRow[i];
				}
			}
		}
		//현재 선택되어있는 부킹이 ccancl처리된경우는 하단 item과 form정보 doc detail, attachmenet정보를 새로가져온다.
		//현재 선택되어있는 부킹이 ccancel처리가 안된경우는 굳이 재조회 할필요없음.
		if(cnt > 0)
		{
			sheet1_OnDblClick(sheetObj,row, sheetObj.SaveNameCol(fix_grid01 + "wob_bk_no"), sheetObj.GetCellValue(row, fix_grid01 + "wob_bk_no"));
			sheetObj.SelectCell(row, sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"))  ;
		}
	}*/
	/*else
	{*/
		$("#bk_sts_cd").val("I");
		$("#wave_no").val("");
		$("#sel_wave_no").val("");
		$("#smp_wave_flg").val("N");
		$("#bk_sts_nm").val(bk_sts_I);
		//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
		document.form.bk_sts_nm.style.background = bgInit;
		
		$("#ord_tp_cd")[0].disabled = true;
		$("#load_tp_cd")[0].disabled = true;
		ComBtnDisable("btn_create_uploading_sheet");
		setEnableUnloadSht("btn_document_uploading_sheet", false, 5);
		/*var row;
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++)
		{
			if(sheetObj.GetCellValue(i, fix_grid01 + "wob_bk_no") == $("#sel_wob_bk_no").val())
			{
				row=i;
				sheetObj.SetCellValue(i, fix_grid01 + "wave_no","",0);
				sheetObj.SetCellValue(i, fix_grid01 + "smp_wave_flg","N",0);
				sheetObj.SetCellEditable(i, fix_grid01 + "ord_tp_cd",1);
				sheetObj.SetCellEditable(i, fix_grid01 + "load_tp_cd",1);
			}
		}*/
		/*sheet1_OnDblClick(sheetObj,row, sheetObj.SaveNameCol(fix_grid01 + "wob_bk_no"), sheetObj.GetCellValue(row, fix_grid01 + "wob_bk_no"));
		sheetObj.SelectCell(row, sheetObj.SaveNameCol(fix_grid01 + "cust_ord_no"))  ;
		goTabSelect("02");*/
		btn_Search(isNotShowProcess);
		goTabSelect("01");
	/*}*/
}
function btn_Print()
{
	var wob_bk_no="";
	/*if($("#sel_tab").val() == "01") //list tab에서 delete
	{
		var sheetObj=sheet1;
		var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
		if (sRow == "") {
			ComShowCodeMessage("COM0253");
			return;
		}
		var arrRow=sRow.split("|"); //결과 : "1|3|5|"
//		if(arrRow.length -1 > 1)
//		{
//			ComShowCodeMessage("COM0254");
//			return;
//		}
		for(var i=0; i<=arrRow.length-1; i++)
		{
			if(i == 0)
			{
				wob_bk_no="'" + sheetObj.GetCellValue(arrRow[i], fix_grid01+"wob_bk_no") + "'";
			}
			else
			{
				wob_bk_no=wob_bk_no + ",'" + sheetObj.GetCellValue(arrRow[i], fix_grid01+"wob_bk_no") + "'";
			}
		}
	}*/
	/*else //if($("#sel_tab").val() == "02")
	{*/
	if($("#sel_wob_bk_no").val().trim() == "")
		$("#sel_wob_bk_no").val($("#wob_bk_no").val())
		
		if($("#sel_wob_bk_no").val().trim() == "")
		{
			ComShowCodeMessage("COM0289", "booking order");
			return;
		}
		wob_bk_no="'" + $("#sel_wob_bk_no").val() + "'";
	/*}*/
	
	
	//LKH::#1939 [BINEX WMS4.0] PDF EXPORTED FILE NAME
	//var sUrl="WHOutMgmtPrintOption.clt?wob_bk_no=" + wob_bk_no + "&wave_no=" + $("#wave_no").val() + "&bk_sts_cd=" + $("#bk_sts_cd").val();
	var rpt_file_name_title = $("#cust_ord_no").val();
	var t_attachFileName = rpt_file_name_title;
	t_attachFileName = t_attachFileName.replace(/\./g, "");
	t_attachFileName = t_attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
	rpt_file_name_title = t_attachFileName;
	var sUrl="WHOutMgmtPrintOption.clt?wob_bk_no=" + wob_bk_no + "&wave_no=" + $("#wave_no").val() + "&bk_sts_cd=" + $("#bk_sts_cd").val() + "&rpt_file_name_title=" + rpt_file_name_title;
	
	callBackFunc = "WHOutMgmtPrintOption";
	
	modal_center_open(sUrl, callBackFunc, 380, 150,"yes");
	
}
function WHOutMgmtPrintOption(rtnArr){
	
}
function btn_Excel()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	doShowProcess(true);
	//현재화면에 있는 부킹정보와 아이템정보를 재 조회 후 엑셀로 다운로드한다.
	var DocinDatas="";
	var fix_Docin="&Docin";
	var sheetObjExcel=sheet5;
	if($("#sel_tab").val() == "01") //list tab에서 delete
	{
		if(sheetObj.RowCount()<= 0)
		{
			alert(sheetObj.MessageText("UserMsg11"));
			doHideProcess(false);
			return;
		}
		var fdata = sheetObj.GetCellValue(2, fix_grid01 + "wob_bk_no") ;
		if(fdata == "")
		{
			ComShowCodeMessage("COM132501");
	 			doHideProcess(false);
			return;
		}
		//checked 
		var sRow = sheetObj.FindCheckedRow(fix_grid01 + "chk");
		if (sRow == "") {
			DocinDatas = "";
		}else{
			var arrRow = sRow.split("|"); //결과 : "1|3|5|"
			
			
			for(var i=0; i<arrRow.length; i++)
			{
				if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wob_bk_no") != "")
				{
					if(DocinDatas == "")
					{
						DocinDatas=fix_Docin + "sel_wob_bk_no=" + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wob_bk_no") ;
					}
					else
					{
						DocinDatas=DocinDatas + ","  + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wob_bk_no");
					}
				}
			}
		}
		/*if(DocinDatas == "")
		{
			alert(sheetObj.GetMessageText("UserMsg11"));
			doHideProcess(false);
			return;
		}*/
	}
	else //if($("#sel_tab").val() == "02")
	{
		if($("#sel_wob_bk_no").val().trim() == "")
		{
			alert(sheetObj.GetMessageText("UserMsg11"));
			doHideProcess(false);
			return;
		}
		DocinDatas=fix_Docin + "sel_wob_bk_no=" + $("#sel_wob_bk_no").val();
	}
	formObj.f_cmd.value = COMMAND01;
	sheetObjExcel.DoSearch("searchWHOutMgmtExcelListGS.clt", FormQueryString(formObj,"") +DocinDatas);
}
function btn_File_Upload(){
	if (ComDisableTdButton("btn_file_upload", 1)) {
		return;
	}
	var formObj=document.form;
	if(formObj.sel_wob_bk_no.value == ""){
		ComShowCodeMessage("COM132614");
		return;
	}
	//File Path 체크
	if(formObj.logo_rectangle.value == "" || formObj.logo_rectangle.value == null){
		ComShowCodeMessage("COM0119");
		return ;
	}
	formObj.f_cmd.value=ADD;
	getParam();
	submitForm();
}

function submitForm(){
	
	
	var formObj=document.form;
	doShowProcess();
	
	var formData;

//  #1922 [Binex WMS vis] Outbound attached file is not opened
//  차후 IE에서 문제발생시 주석제거	
//	if(navigator.appName.indexOf("Microsoft") != -1) {
//		if(formObj.f_cmd.value==SEARCH){
//			formObj.action = "./WHOutMgmt.clt?fwd_bk_no="+formObj.wob_bk_no.value+"&uploadfile=T";
//			formObj.submit();
//			return;
//		}else{
//			formObj.action = "./WHOutMgmt.clt?fwd_bk_no="+formObj.wob_bk_no.value+"&uploadfile=T";
//			formObj.submit();
//			return;
//		}
//	} else {
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
//	}
    
	$.ajax({
		   type: "POST",
		   url: "./WHOutbkMgmtUploadGS.clt",
		   dataType: 'xml',
		   data: formData,
		   contentType: false,
	       processData: false,
		   success: function(data){
			   doHideProcess();
			   if($('res',data).text() == "OK"){
				   
				   formObj.logo_rec_flg.value = "N";
				   formObj.logo_rec_flg.checked = false;
				   
				   var xmlString = new XMLSerializer().serializeToString(data);

				   var sheet4XML = getSheetXmlStr(xmlString, "3");
				   sheet4.LoadSearchData(sheet4XML);
				   showCompleteProcess();
			   }else{
				   //show message
				   
				   ComShowCodeMessage('COM131202');//Failed to upload
			   }
		   },
		   error: function(){
			   doHideProcess();
			   alert("UpLoad Fail! Please check format file upload.");
		   }
		});
	document.form.logo_rectangle.value = "";
}
function getSheetXmlStr(xml, sSheetNo){
	
	var sBeginTag = '<SHEET' + sSheetNo + '>';
	
	var sCloseTag = '</SHEET' + sSheetNo + '>';
	
	var strtIndx = xml.indexOf(sBeginTag) + sBeginTag.length + 1;
	
	var endIndx = xml.indexOf(sCloseTag) - 1;
	
	return xml.substring(strtIndx, endIndx);
}
function getParam() {
    var formObj = document.form;
    var sParam="svc_tp_cd="+formObj.svc_tp_cd.value;
	sParam += "&doc_ref_tp_cd="+formObj.doc_ref_tp_cd.value;
	sParam += "&doc_tp_cd="+formObj.doc_tp_cd.value;
	sParam += "&doc_ref_no="+formObj.wob_bk_no.value;
	sParam += "&doc_ref_no2="+formObj.doc_ref_no2.value;
    return sParam;
}
/** 
 * File 선택
 */
function btn_File_Path(){
	var formObj=document.form;
    setFieldValue(formObj.file_path, "");
    var files = upload1.GetList();
    for( var i = 0; i < files.length; i++) {
        upload1.RemoveOneFile(files[i].GetSerialNo());
    }
    upload1.AddFile();
}
/** 
 * File Delete
 */
function btn_File_Delete() {
	var formObj = document.form;
	if (formObj.btn_file_delete.disabled == true) {
		return;
	}
	var sheetObj=sheet4;
	var selRow=sheetObj.GetSelectRow();
	if(sheetObj.RowCount() <= 0){
		ComShowCodeMessage("COM0046");
	}else{
		var formObj=document.form;
		if (selRow < 1){
			ComShowCodeMessage("COM12189");
			return;
		}
		if (ComShowCodeConfirm("COM0053")) { // Do you want to delete?
			setTimeout(function(){
				sheetObj.SetRowHidden(selRow,0);
				sheetObj.SetRowStatus(selRow,"D");
				var sParam='f_cmd='+MODIFY03+'&'+sheetObj.GetSaveString();
				if (sParam == "") { return; }
		 	    var sXml=sheetObj.GetSaveData("./removeFileWHOutMgmtGS.clt", sParam + "&Grd04doc_ref_no=" + formObj.wob_bk_no.value);
		 	    var strtIndxCheck = sXml.indexOf("<CHECK>") + "<CHECK>".length;
			 	var endIndxCheck = sXml.indexOf("</CHECK>");
			 	var xmlDoc = $.parseXML(sXml.substring(strtIndxCheck,endIndxCheck));
			 	var $xml = $(xmlDoc);
			    if ($xml.find( "res").text() != 'OK'){
			    	//ComShowCodeMessage("COM12201");
			    	showCompleteProcess();
					var strtIndxSheet1 = sXml.indexOf("<SHEET>");
					var endIndxSheet1 = sXml.indexOf("</SHEET>") + "</SHEET>".length;
					var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
					sheetObj.LoadSearchData(sheet1Data);
			    }
			},100);
			
		}
	}
	
}
/*
 * 부킹 엑셀 업로드
 */
function excel_Upload()
{
	var sUrl="";
	sUrl="./WHOutBookingExcelUploadPopup.clt?display=none";
	callBackFunc = "";
	modal_center_open(sUrl, callBackFunc, 1024,700,"yes");
}
/*
 * 부킹 엑셀 업로드 템플릿 다운로드
 */
function excel_Download()
{
	var formObj1=document.frm1;
	var fileName="OUTBOUND_UPLOAD_TEMPLATE.xls";
	document.frm1.file_name.value= fileName;
	formObj1.submit();
}
function onblur_Del(srcName) {
	var formObj=document.form;
	if(srcName == "del" && !(formObj.btn_del.disabled)){
		if(isNull(formObj.del)){
			setTlLocInfoNull("del");
		}else{
			searchTlLocInfo("del", ComGetObjValue(formObj.del), "P");			
		}
	}
}

function onblur_Pod(srcName) {
	var formObj=document.form;
	if(srcName == "pod" && !(formObj.btn_pod.disabled)){
		if(isNull(formObj.pod)){
			setTlLocInfoNull("pod");
		}else{
			searchTlLocInfo("pod", ComGetObjValue(formObj.pod), "P");			
		}
	}
}

function onblur_Pol(srcName) {
	var formObj=document.form;
	if(srcName == "pol" && !(formObj.btn_pol.disabled)){
		 if(isNull(formObj.pol)){
			 setTlLocInfoNull("pol");
		 }else{
			 searchTlLocInfo("pol", ComGetObjValue(formObj.pol), "P");			 
		 }
	}
}

/***
 * AJAX CODE SEARCH
 */
/*
 * Warehouse search
 * OnKeyDown 13 or onChange
 */
function getLocInfo(obj){
	var vClassName=document.getElementById(obj.name).className;
	if("L_input_R" == vClassName)
	{
		return;
	}
	if(sheet2.RowCount()> 0 && obj.name == "wh_cd")
	{
		//confirm
		if(ComShowCodeConfirm("COM0294") == false)
		{
			$("#wh_cd").val($("#wh_cd_org").val());
			return;
		}
		//SHEET 초기화
		sheet2.RemoveAll();
	}
	if(obj.value != ""){
//		$.ajax({
//			url : "searchTlLocInfo.do?loc_cd="+obj.value+"&type=WH&wh_auth=Y",
//			success : function(result) {
//				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
//					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
//				}
//				resultLocInfo(result.xml, obj.name);
//			}
//		});
	}
	else
	{
		if(obj.name == "list_wh_cd")
		{
			$("#list_wh_nm").val("");
			$("#def_ord_tp_cd").val("");
		}
		else if(obj.name == "wh_cd")
		{
			$("#wh_nm").val("");
			$("#wh_cd_org").val("");
		}
	}
}
function resultLocInfo(resultXml, name){
	var formObj=document.form;
	if(name == "list_wh_cd"){
		if(getXmlDataNullToNullString(resultXml,'loc_nm') != ""){
			formObj.list_wh_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
			formObj.list_ctrt_no.value=getXmlDataNullToNullString(resultXml,'wh_ctrt_no');
			formObj.list_ctrt_nm.value=getXmlDataNullToNullString(resultXml,'wh_ctrt_nm');
			$("#def_ord_tp_cd").val(getXmlDataNullToNullString(resultXml,'ob_ord_tp_cd'));
			getCtrtInfo(formObj.list_ctrt_no);
		}else{
			formObj.list_wh_cd.value="";
			formObj.list_wh_nm.value="";
			$("#def_ord_tp_cd").val("");
		}
	}
	else if(name == "wh_cd"){
		if(getXmlDataNullToNullString(resultXml,'loc_nm') != ""){
			formObj.wh_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
			formObj.wh_cd_org.value=getXmlDataNullToNullString(resultXml,'loc_cd');
			if(getXmlDataNullToNullString(resultXml,'ob_ord_tp_cd') != "")
			{
				$("#ord_tp_cd")[0].value=getXmlDataNullToNullString(resultXml,'ob_ord_tp_cd');
			}
			formObj.ctrt_no.value=getXmlDataNullToNullString(resultXml,'wh_ctrt_no');
			formObj.ctrt_no_org.value=getXmlDataNullToNullString(resultXml,'wh_ctrt_no');
			formObj.ctrt_nm.value=getXmlDataNullToNullString(resultXml,'wh_ctrt_nm');
			getCtrtInfo(formObj.ctrt_no);
		}else{
			formObj.wh_cd.value="";
			formObj.wh_nm.value="";
			formObj.wh_cd_org.value="";
		}
	}
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
var ctrt_name = "";
function getCtrtInfo(obj){
	ctrt_name = obj.name;
	var formObj =  document.form;
	var vClassName=document.getElementById(obj.name).className;
	if("L_input_R" == vClassName)
	{
		return;
	}
	if(sheet2.RowCount()> 0 && obj.name == "ctrt_no")
	{
		if(formObj.ctrt_no.disabled == true || formObj.ctrt_no.readOnly == true){
			return;
		}
		//confirm
		if(ComShowCodeConfirm("COM0294") == false)
		{
			$("#ctrt_no").val($("#ctrt_no_org").val());
			return;
		}
		//SHEET 초기화
		sheet2.RemoveAll();
	}
	if(obj.value != ""){
		var ord_tp_lvl1_cd="\'P\'";
		var pnl_svc_tp_cd="44";
		ajaxSendPost(resultCtrtInfo, 'reqVal', "&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no="+obj.value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd+"&pnl_svc_tp_cd=" + pnl_svc_tp_cd, './GateServlet.gsl');
	}
	else
	{
		if(obj.name == "list_ctrt_no")
		{
			$("#list_ctrt_nm").val("");
			$("#list_rtp_no").val("");
			$("#list_owner_cd").val("");
		}
		else if(obj.name == "ctrt_no")
		{
			$("#ctrt_nm").val("");
			$("#rtp_no").val("");
			$("#ctrt_no_org").val("");
		}
	}
}
function resultCtrtInfo(reqVal) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	//var sheetObj = sheet1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(ctrt_name == "list_ctrt_no"){
				if(rtnArr[0] != ""){
					$("#list_ctrt_nm").val(rtnArr[0]);
					$("#list_rtp_no").val(rtnArr[2]);
					$("#list_owner_cd").val(rtnArr[7]);
				}else{
					$("#list_ctrt_no").val("");
					$("#list_ctrt_nm").val("");
					$("#list_rtp_no").val("");
					$("#list_owner_cd").val("");
				}
			}
			else if(ctrt_name == "ctrt_no"){
				if(rtnArr[0] != ""){
					$("#ctrt_nm").val(rtnArr[0]);
					$("#rtp_no").val(rtnArr[2]);
					$("#owner_cd").val(rtnArr[7]);
					$("#ctrt_no_org").val(rtnArr[1]);

					/*#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION*/
					$("#lot4_alias").val(rtnArr[8]);
					$("#lot5_alias").val(rtnArr[9]);
					setGridHeaderTitleAlias(sheet2);

					searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));
				}else{		
					$("#ctrt_no").val("");
					$("#ctrt_nm").val("");
					$("#rtp_no").val("");
					$("#ctrt_no_org").val("");
				}
			}
			else if(ctrt_name =="def_wh_ctrt_no"){
				if(rtnArr[0] != ""){
					$("#def_wh_rtp_no").val(rtnArr[2]);
					$("#def_owner_cd").val(rtnArr[7]);
					searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));
				}
			}
		}
	}
}
var trdp_nm = "";
function searchTlCustInfo(name, value){
	if(value != "")
	{
		trdp_nm = name;
		ajaxSendPost(setTlCustInfo, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode"+"&s_code="+value, "./GateServlet.gsl");
	}
	else
	{
		if(name == "owner" || name == "supp" || name == "buyer"){
			$("#" + name + "_cd").val("");
			$("#" + name + "_nm").val("");
			$("#" + name + "_addr1").val("");
//			$("#" + name + "_addr2").val("");
//			$("#" + name + "_addr3").val("");
//			$("#" + name + "_addr4").val("");
//			$("#" + name + "_addr5").val("");
		}else if(name == "carrier" || name == "trucker"|| name == "bill_to"){
			$("#" + name + "_cd").val("");
			$("#" + name + "_nm").val("");
		}else if(name == "list_owner")
		{
			$("#" + name + "_cd").val("");
		}
	}
}
function setTlCustInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(trdp_nm == "owner" || trdp_nm == "supp" || trdp_nm == "buyer"){
				$("#" + trdp_nm + "_cd").val(masterVals[0]);
				if(masterVals[1] == "")
				{
					$("#" + trdp_nm + "_addr1").val(" ");
					$("#" + trdp_nm + "_nm").val(" ");
				}
				else
				{
					$("#" + trdp_nm + "_addr1").val(masterVals[1]);
					$("#" + trdp_nm + "_nm").val(masterVals[3]);
				}
	//			$("#" + trdp_nm + "_addr2").val(getXmlDataNullToNullString(sXml,'addr2'));
	//			$("#" + trdp_nm + "_addr3").val(getXmlDataNullToNullString(sXml,'addr3'));
	//			$("#" + trdp_nm + "_addr4").val(getXmlDataNullToNullString(sXml,'addr4'));
	//			$("#" + trdp_nm + "_addr5").val(getXmlDataNullToNullString(sXml,'addr5'));
			}else if(trdp_nm == "carrier" || trdp_nm == "trucker" || trdp_nm=="bill_to"){
				$("#" + trdp_nm + "_cd").val(masterVals[0]);
				$("#" + trdp_nm + "_nm").val(masterVals[3]);
			}else if(trdp_nm =="list_owner")
			{
				$("#" + trdp_nm + "_cd").val(masterVals[0]);
			}
		}else{
			if(trdp_nm == "owner" || trdp_nm == "supp" || trdp_nm == "buyer"){
				$("#" + trdp_nm + "_cd").val("");
				$("#" + trdp_nm + "_nm").val("");
				$("#" + trdp_nm + "_addr1").val("");
//				$("#" + trdp_nm + "_addr2").val("");
//				$("#" + trdp_nm + "_addr3").val("");
//				$("#" + trdp_nm + "_addr4").val("");
//				$("#" + trdp_nm + "_addr5").val("");
			}else if(trdp_nm == "carrier" || trdp_nm == "trucker" || trdp_nm== "bill_to"){
				$("#" + trdp_nm + "_cd").val("");
				$("#" + trdp_nm + "_nm").val("");
			}else if(trdp_nm == "list_owner")
			{
				$("#" + trdp_nm + "_cd").val("");
			}
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));	
	}
}
function setTlCustInfoNull(name){
	if(name == "carrier" || name == "trucker" || name== "bill_to")
	{
		$("#" + name + "_cd").val("");
		$("#" + name + "_nm").val("");
	}
	else
	{
		$("#" + name + "_cd").val("");
		$("#" + name + "_nm").val("");
		$("#" + name + "_addr1").val(" ");
		$("#" + name + "_addr2").val("");
		$("#" + name + "_addr3").val("");
		$("#" + name + "_addr4").val("");
		$("#" + name + "_addr5").val("");
	}
}
function searchTlCustInfoGrid(name, value, sheetObj, Row, fix_grid)
{
	if(value != "")
	{
		trdp_nm = name;
		ajaxSendPost(setTlCustInfoGrid, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode"+"&s_code="+value, "./GateServlet.gsl");
	}
	else
	{
		if(name == "owner" || name == "supp" || name == "buyer"){
			sheetObj.SetCellValue(Row, fix_grid + name + "_cd","",0);
			sheetObj.SetCellValue(Row, fix_grid + name + "_addr1","",0);
//			sheetObj.SetCellValue(Row, fix_grid + name + "_addr2","",0);
//			sheetObj.SetCellValue(Row, fix_grid + name + "_addr3","",0);
//			sheetObj.SetCellValue(Row, fix_grid + name + "_addr4","",0);
//			sheetObj.SetCellValue(Row, fix_grid + name + "_addr5","",0);
		}else if(name == "carrier" || name == "trucker"){
			sheetObj.SetCellValue(Row, fix_grid + name + "_cd","",0);
			sheetObj.SetCellValue(Row, fix_grid + name + "_nm","",0);
		}
	}
}
function setTlCustInfoGrid(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	var sheetObj = sheet1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(trdp_nm == "owner" || trdp_nm == "supp" || trdp_nm == "buyer"){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_cd",masterVals[0],0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_nm",masterVals[3],0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr1",masterVals[1],0);
//				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr2",getXmlDataNullToNullString(sXml,'addr2'),0);
//				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr3",getXmlDataNullToNullString(sXml,'addr3'),0);
//				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr4",getXmlDataNullToNullString(sXml,'addr4'),0);
//				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr5",getXmlDataNullToNullString(sXml,'addr5'),0);
			}else if(trdp_nm == "carrier" || trdp_nm == "trucker"){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_cd",masterVals[0],0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_nm",masterVals[3],0);
			}
		}else{
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_cd","",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_nm","",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr1","",0);
			sheetObj.SelectCell(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_cd");
		}
	}else{
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_cd","",0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_nm","",0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_addr1","",0);
		sheetObj.SelectCell(sheetObj.GetSelectRow(), fix_grid01 + trdp_nm + "_cd");
	}
}
function searchTlVslInfo(name, value){
	ajaxSendPost(setTlVslInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlVslInfo&code='+value, './GateServlet.gsl');
}
function setTlVslInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				$("#vsl_nm").val(rtnArr[0]);
			}else{
				$("#vsl_cd").val("");
				$("#vsl_nm").val("");
			}
		}else{
			$("#vsl_cd").val("");
			$("#vsl_nm").val("");
		}
	}else{
		$("#vsl_cd").val("");
		$("#vsl_nm").val("");
	}
}
function setTlVslInfoNull(name){
	$("#" + name + "_cd").val("");
	$("#" + name + "_nm").val("");
}
var loc_nm = "";
function searchTlLocInfo(name, value, type){
	loc_nm = name;
	ajaxSendPost(setTlLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=Location&s_code='+value, './GateServlet.gsl');
}
function setTlLocInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');	
			$("#" + loc_nm).val(masterVals[0]);
			$("#" + loc_nm+"_nm").val(masterVals[3]);
		}
		else{
			$("#" + loc_nm).val("");
			$("#" + loc_nm+"_nm").val("");
		  }
	}else{
		$("#" + loc_nm).val("");
		$("#" + loc_nm+"_nm").val("");
	  }
}
function setTlLocInfoNull(name){
	$("#" + name).val("");
	$("#" + name+"_nm").val("");
}
/*
 * NAME 엔터시 팝업호출 - warehouse name
 * list
 * form
 */
function locationPopup(div){
	if(sheet2.RowCount()> 0 && div == fix_by_form)
	{
		//confirm
		if(ComShowCodeConfirm("COM0294") == false)
		{
			$("#wh_cd").val($("#wh_cd_org").val());
			return;
		}
		//SHEET 초기화
		sheet2.RemoveAll();
	}
	var loc_nm="";
	var loc_cd="";
	var ctrt_no="";
	var ctrt_nm="";
	if(div == fix_by_list)
	{
		loc_nm=$("#" + div + "_wh_nm").val();
		ctrt_no=$("#" + div + "_ctrt_no").val();
		ctrt_nm=$("#" + div + "_ctrt_nm").val();
	}
	else if(div == fix_by_form)
	{
		loc_cd=$("#wh_cd").val();
		ctrt_no=$("#ctrt_no").val();
		ctrt_nm=$("#ctrt_nm").val();
	}
	rtnary=new Array(3);
	rtnary[0]="";
	
	rtnary[1]="IT";
	if(typeof(nameObj)!='undefined'){
		rtnary[2]=loc_nm;
	}else{
		rtnary[2]="";
	}
	rtnary[3]=loc_cd;
	callBackFunc = "setWhInfo_" + div;
	modal_center_open('./CMM_POP_0030.clt', rtnary, 806,420,"yes");
}
/*
 * NAME 엔터시 팝업호출 - contract name
 * list
 * form
 */
function CtrtPopup(div){
	var formObj= document.form;
	if(sheet2.RowCount()> 0 && div == fix_by_form)
	{
		if(formObj.ctrt_no.disabled == true || formObj.ctrt_no.readOnly == true){
			return;
		}
		//confirm
		if(ComShowCodeConfirm("COM0294") == false)
		{
			$("#ctrt_no").val($("#ctrt_no_org").val());
			return;
		}
		//SHEET 초기화
		sheet2.RemoveAll();
	}
	var ctrt_no="";
	var ctrt_nm="";
	if(div == fix_by_list)
	{
		ctrt_nm=$("#" + div + "_ctrt_nm").val();
	}
	else if(div == fix_by_form)
	{
		ctrt_no=$("#ctrt_no").val();
		ctrt_nm=$("#ctrt_nm").val();
	}
	var ord_tp_lvl1_cd="\'P\'";
	var pnl_svc_tp_cd="44";
	var sUrl="ContractRoutePopup.clt?ctrt_no=" + "&ctrt_nm="+ctrt_nm+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd + "&pnl_svc_tp_cd=" + pnl_svc_tp_cd;
	callBackFunc = "setCtrtNoInfo_" + div;
	modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
}
function setCtrtNoInfo_form_P(aryPopupData){
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	}
	
	if(sheet2.RowCount()> 0)
	{
		var formObj= document.form;
		var rtnValAry=aryPopupData.split("|");
		if(formObj.ctrt_no.disabled == true || formObj.ctrt_no.readOnly == true 
				|| rtnValAry[0] == $("#ctrt_no").val()){
			return;
		}
		//confirm
		if(!ComShowCodeConfirm("COM0294"))
		{
			return;
		}
	}
	sheet2.RemoveAll();
	setCtrtInfo(aryPopupData, fix_by_form);
}
/*
 * Customer Popup(Owner, Vendor)
 */
function CustomerPopup(name, key)
{
	if(undefined == key)
		key='c';
	var funName="";
	if(name == "owner_cd"){
		funName="setOwnerInfo";
	}else if(name == "buyer_cd"){
		funName="setShipperInfo";
	}
	else if(name == "carrier_cd"){
		funName="setCarrierInfo";
	}
	else if(name == "trucker_cd"){
		funName="setTruckerInfo";
	}
	else if(name == "bill_to_cd"){
		funName="setBillToInfo";
	}else if(name == "buyer_addr1" || name == "buyer_nm"){
		funName="setShipperInfo";
	}
	rtnary=new Array(2);
	rtnary[0]="1";
	
	// 2011.12.27 value parameter
	if(typeof(name)!='undefined'){
		if(key =='e')
		rtnary[1]=$("#" + name.replace("cd","nm")).val();
		else
			rtnary[1]="";
	}else{
		rtnary[1]="";
	}
	rtnary[2]=window;
	callBackFunc = funName;
	modal_center_open('./CMM_POP_0010.clt?callTp='+"", rtnary, 1150,650,"yes");
}
/*
 * Customer Popup(Owner, Vendor)
 */
function CustomerGridPopup(name, sheetObj, Row, Col, fix_grid)
{
	var funName="";
	if(name == "owner_cd"){
		funName="setOwnerInfoGrid";
	}else if(name == "buyer_cd"){
		funName = "setShipperInfoGrid";
	}else if(name == "carrier_cd"){
		funName="setCarrierInfoGrid";
	}
	else if(name == "trucker_cd"){
		funName="setTruckerInfoGrid";
	}
	rtnary=new Array(2);
	rtnary[0]="1";
	
	// 2011.12.27 value parameter
	rtnary[0]="";
	// 2011.12.27 value parameter
	if(typeof(name)!='undefined'){
		rtnary[1]=sheetObj.GetCellValue(Row,fix_grid01+name.replace("cd","nm"));
	}else{
		rtnary[1]="";
	}
	rtnary[2]=window;
	callBackFunc = funName;
	modal_center_open('./CMM_POP_0010.clt?callTp='+"", rtnary, 1150,650,"yes");
}
function CustomerLocationGridPopup(name, sheetObj, Row, Col, fix_grid)
{
	var funName="";
	var nm="";
	if(name == "buyer_cd"){
		funName="setShipperLocInfoGrid";
		nm="Ship To";
	}
	if(sheetObj.GetCellValue(Row, fix_grid + name).trim() == "")
	{
		ComShowCodeMessage("COM0125",nm);
		sheetObj.SelectCell(Row, fix_grid + name);
		return;
	}
	var sUrl="LocationPopup.do?type=CL&loc_cd="+sheetObj.GetCellValue(Row, fix_grid + name).trim();
	ComOpenPopup(sUrl, 900, 700, funName, "0,0", true, sheetObj, Row, Col);
}
function CustomerLocationPopup(name)
{
	var funName="";
	var nm="";
	if(name == "owner_cd"){
		funName="setOwnerLocInfo";
		nm="Owner";
	}else if(name == "buyer_cd"){
		funName="setShipperLocInfo";
		nm="Ship To";
	}
	if($("#" + name).val().trim() == "")
	{
		ComShowCodeMessage("COM0125",nm);
		eval("formObj."+name).focus();
		return;
	}
	var sUrl="LocationPopup.do?type=CL&loc_cd="+$("#" + name).val();
	ComOpenPopup(sUrl, 900, 700, funName, "0,0", true);
}
function podPopup(name, key)
{
	//pod
	//pol
	//del
	rtnary=new Array(3);
	rtnary[0]="";
	
	rtnary[1]="IT";
	if(typeof($("#" + name ).val())!='undefined'){
		if(key =='e')
			rtnary[2]=$("#" + name+"_nm" ).val();
		else
			rtnary[2]="";	
	}else{
		rtnary[2]="";
	}
	if(key =='e')
		rtnary[3]=$("#" + name ).val();
	else
		rtnary[3]="";
	
	callBackFunc = "setLocInfo_" + name;
	modal_center_open('./CMM_POP_0030.clt', rtnary, 810,440,"yes");
}
function podGridPopup(name, sheetObj, Row, Col, fix_grid)
{
	//pod
	//pol
	//del
	rtnary=new Array(3);
	rtnary[0]="";
	
	rtnary[1]="IT";
	rtnary[2]=sheetObj.GetCellValue(Row, Col+1);
	rtnary[3]=sheetObj.GetCellValue(Row, Col);
	
	callBackFunc = "setLocInfoGrid_" + name
	modal_center_open('./CMM_POP_0030.clt', rtnary, 810,440,"yes");
}
/*
 * 팝업 관련 로직 시작
 */
function setWhInfo_list(aryPopupData){
	setWhInfo(aryPopupData, fix_by_list);
}
function setWhInfo_form(aryPopupData){
	setWhInfo(aryPopupData, fix_by_form);
}
function setWhInfo(aryPopupData, div)
{
	var formObj=document.form;
	if(div == fix_by_list)
	{
		$("#" + div + "_wh_cd").val(aryPopupData[0][1]);
		$("#" + div + "_wh_nm").val(aryPopupData[0][2]);
		$("#" + div + "_ctrt_no").val(aryPopupData[0][30]);
		$("#" + div + "_ctrt_nm").val(aryPopupData[0][31]);
		$("#def_ord_tp_cd").val(aryPopupData[0][32]);
		//if ($("#" + div + "_ctrt_no").val().trim() != "") {
			getCtrtInfo(formObj.list_ctrt_no);
		//}
	}
	else if(div == fix_by_form)
	{
		$("#wh_cd").val(aryPopupData[0][1]);
		$("#wh_cd_org").val(aryPopupData[0][1]);
		$("#wh_nm").val(aryPopupData[0][2]);
		if(aryPopupData[0][32] != "")
		{
			$("#ord_tp_cd")[0].value = aryPopupData[0][32];
		}
		$("#ctrt_no").val(aryPopupData[0][30]);
		$("#ctrt_no_org").val(aryPopupData[0][30]);
		$("#ctrt_nm").val(aryPopupData[0][31]);
		//if (!isNull(formObj.ctrt_no)) {
			getCtrtInfo(formObj.ctrt_no);
		//}
	}
}
function setWhInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	sheetObj.SetCellValue(row, fix_grid01 + "wh_cd",aryPopupData[0][1],0);
	sheetObj.SetCellValue(row, fix_grid01 + "wh_cd_org",aryPopupData[0][1],0);
	sheetObj.SetCellValue(row, fix_grid01 + "wh_nm",aryPopupData[0][2],0);
	sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no",aryPopupData[0][30]);
	if(aryPopupData[0][32] != "")
	{
		sheetObj.SetCellValue(row, fix_grid01 + "ord_tp_cd",aryPopupData[0][32]);
	}
	//sheetObj.CellValue2(row, fix_grid01 + "ctrt_no_org") = aryPopupData[0][30];
	//sheetObj.CellValue2(row, fix_grid01 + "ctrt_nm") = aryPopupData[0][31];
}
function setCtrtNoInfo_list(aryPopupData){
	setCtrtInfo(aryPopupData, fix_by_list);
}
function setCtrtNoInfo_form(aryPopupData){
	setCtrtInfo(aryPopupData, fix_by_form);
}
function setCtrtInfo(aryPopupData, div)
{
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	}else{
		var rtnValAry=aryPopupData.split("|");
		if(div == fix_by_list)
		{
			$("#" + div + "_ctrt_no").val(rtnValAry[0]);
			$("#" + div + "_ctrt_nm").val(rtnValAry[1]);
			$("#" + div + "_rtp_no").val(rtnValAry[9]);
			$("#" + div + "_owner_cd").val(rtnValAry[8]);
			searchTlCustInfo("list_owner", ComGetObjValue(formObj.list_owner_cd));
		}
		else if(div == fix_by_form)
		{
			$("#ctrt_no").val(rtnValAry[0]);
			$("#ctrt_no_org").val(rtnValAry[0]);
			$("#ctrt_nm").val(rtnValAry[1]);
			$("#rtp_no").val(rtnValAry[9]);
			$("#owner_cd").val(rtnValAry[8]);
			searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));
		}
	}

	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION 
	getCtrtInfo(formObj.ctrt_no);
}
function setContactInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		return;
	}else{
		var rtnValAry=aryPopupData.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no",rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_no_org",rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "ctrt_nm",rtnValAry[1],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "rtp_no",rtnValAry[9],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "owner_cd",rtnValAry[8],0);
		searchTlCustInfoGrid("owner", rtnValAry[8], sheetObj, sheetObj.GetSelectRow(), fix_grid01);
	}
}
function setOwnerInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#owner_cd").val(rtnValAry[0]);
		$("#owner_nm").val(rtnValAry[2]);
		$("#owner_addr1").val(rtnValAry[7]);
		
		
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
		if($("#bill_to_cd").val() == ""){
			$("#bill_to_cd").val($("#owner_cd").val());
			$("#bill_to_nm").val($("#owner_nm").val());
		}			
		
	}
}
function setOwnerInfoGrid(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "owner_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "owner_addr1",rtnValAry[7],0);
	}
}
function setOwnerLocInfo(rtnVal){	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#owner_addr1").val(aryPopupData[0][4]);
//		$("#owner_addr2").val(aryPopupData[0][5]);
//		$("#owner_addr3").val(aryPopupData[0][6]);
//		$("#owner_addr4").val(aryPopupData[0][7]);
//		$("#owner_addr5").val(aryPopupData[0][8]);
	}
}
function setShipperInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#buyer_cd").val(rtnValAry[0]);
		$("#buyer_nm").val(rtnValAry[2]);
		//#4209 [BNX WMS4.0] Outbound Management Ship To BUYER_NM column add 
		$("#buyer_addr1").val(rtnValAry[37] + "\r\n" + rtnValAry[40]);
	}
}
function setShipperInfoGrid(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "buyer_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "buyer_addr1",rtnValAry[7],0);
//		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "buyer_addr2",aryPopupData[0][10],0);
//		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "buyer_addr3",aryPopupData[0][11],0);
//		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "buyer_addr4",aryPopupData[0][12],0);
//		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "buyer_addr5",aryPopupData[0][13],0);

	}
}
function setShipperLocInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "buyer_addr1",aryPopupData[0][4],0);
//	sheetObj.SetCellValue(row, fix_grid01 + "buyer_addr2",aryPopupData[0][5],0);
//	sheetObj.SetCellValue(row, fix_grid01 + "buyer_addr3",aryPopupData[0][6],0);
//	sheetObj.SetCellValue(row, fix_grid01 + "buyer_addr4",aryPopupData[0][7],0);
//	sheetObj.SetCellValue(row, fix_grid01 + "buyer_addr5",aryPopupData[0][8],0);
}
function setShipperLocInfo(aryPopupData){
	$("#buyer_addr1").val(aryPopupData[0][4]);
//	$("#buyer_addr2").val(aryPopupData[0][5]);
//	$("#buyer_addr3").val(aryPopupData[0][6]);
//	$("#buyer_addr4").val(aryPopupData[0][7]);
//	$("#buyer_addr5").val(aryPopupData[0][8]);
}
function setTruckerInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		//var sheetObj=sheet1;
		var rtnValAry=rtnVal.split("|");
		$("#trucker_cd").val(rtnValAry[0]);
		$("#trucker_nm").val(rtnValAry[2]);
	}
}
function setBillToInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		//var sheetObj=sheet1;
		var rtnValAry=rtnVal.split("|");
		$("#bill_to_cd").val(rtnValAry[0]);
		$("#bill_to_nm").val(rtnValAry[2]);
	}
}
function setTruckerInfoGrid(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "trucker_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "trucker_nm",rtnValAry[2],0);
	}
}
function setTruckTypeInfo(rtnVal){
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#eq_tpsz_cd").val(rtnValAry[0]);
		$("#eq_tp_cd").val(rtnValAry[2]);
		formObj.eq_no.focus();
	}
}
/*
 * type popupedit 완료후
 */
function setIbContainerTypeInfo_bk(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		sheet1.SetCellValue(sheet1.GetSelectRow(), fix_grid01 + "eq_tpsz_cd",rtnValAry[0]);
		sheet1.SetCellValue(sheet1.GetSelectRow(), fix_grid01 + "eq_tp_cd",rtnValAry[2]);
	}
}
function setTruckTypeInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var sheetObj=sheet1;
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),rtnValAry[0], 0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "eq_tp_cd",rtnValAry[2]);
	}
}
function setVslInfo(rtnPopAry){
	var formObj = document.form;
	if(rtnPopAry == "" || rtnPopAry == undefined || rtnPopAry == "undefined"){
		return;
	}else{
		var rtnAry = rtnPopAry.split('|');
		formObj.vsl_cd.value = rtnAry[0];
		formObj.vsl_nm.value = rtnAry[1];
	}
}
function setVslInfoGrid(rtnPopAry){
	var sheetObj=sheet1;
	if(rtnPopAry == "" || rtnPopAry == undefined || rtnPopAry == "undefined"){
		return;
	}else{
		var rtnAry = rtnPopAry.split('|');
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "vsl_cd",rtnAry[0]);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "vsl_nm",rtnAry[1]);
	}
}
function setCarrierInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		//var sheetObj=sheet1;
		var rtnValAry=rtnVal.split("|");
		$("#carrier_cd").val(rtnValAry[0]);
		$("#carrier_nm").val(rtnValAry[2]);
	}
}
function setCarrierInfoGrid(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "carrier_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "carrier_nm",rtnValAry[2],0);
	}
}
function setLocInfo_pol(rtnVal){
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#pol").val(rtnValAry[0]);
		$("#pol_nm").val(rtnValAry[2]);
	}
}
function setLocInfo_pod(rtnVal){
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#pod").val(rtnValAry[0]);
		$("#pod_nm").val(rtnValAry[2]);
	}
}
function setLocInfo_del(rtnVal){
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#del").val(rtnValAry[0]);
		$("#del_nm").val(rtnValAry[2]);
	}
}
function setLocInfoGrid_pol(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "pol",rtnValAry[0]);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "pol_nm",rtnValAry[2]);
	}
}
function setLocInfoGrid_pod(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "pod",rtnValAry[0]);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "pod_nm",rtnValAry[2]);
	}
}
function setLocInfoGrid_del(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "del",rtnValAry[0]);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "del_nm",rtnValAry[2]);
	}
}
function setItemGrid(aryPopupData){
	var sheetObj=sheet2;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		return;
	}else{
		var rtnValAry=aryPopupData.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_nm",rtnValAry[1],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_sys_no",rtnValAry[3],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "pkg_info",rtnValAry[20],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "curr_cd",rtnValAry[21],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_unit_price",rtnValAry[22],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "pkg_lv1_qty",rtnValAry[7],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "pkg_lv1_unit_cd",rtnValAry[15],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "pkg_lv2_qty",rtnValAry[5],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "pkg_lv2_unit_cd",rtnValAry[6],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "pkg_lv3_qty",rtnValAry[16],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "pkg_lv3_unit_cd",rtnValAry[17],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "pkg_lv4_qty",rtnValAry[18],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "pkg_lv4_unit_cd",rtnValAry[19],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "lv1_cbm",rtnValAry[8],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "lv1_cbf",rtnValAry[9],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "lv1_grs_kgs",rtnValAry[10],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "lv1_grs_lbs",rtnValAry[11],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "lv1_net_kgs",rtnValAry[12],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "lv1_net_lbs",rtnValAry[13],0);
//		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "fix_loc_cd_it",rtnValAry[0][26],0);
//		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "fix_loc_nm_it",rtnValAry[0][27],0);
//		if( rtnValAry[0][26] != "")
//		{
//			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"fix_loc_cd",rtnValAry[0][26],0);
//			sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"fix_loc_nm",rtnValAry[0][27],0);
//		}
	//	else
	//	{
	//		sheetObj.CellValue2(sheetObj.GetSelectRow(), fix_grid02+"fix_loc_cd")	 = rtnValAry[0][28];
	//		sheetObj.CellValue2(sheetObj.GetSelectRow(), fix_grid02+"fix_loc_nm")	 = rtnValAry[0][29];
	//	}
		resetLotInfo(sheetObj, sheetObj.GetSelectRow());
		settring_ea_qty(sheetObj, sheetObj.GetSelectRow(), rtnValAry[0], "", "");
	}
}
function setPkgunitGrid(aryPopupData){
	var sheetObj=sheet2;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 	var rtnValAry=aryPopupData.split("|");
		 	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"item_pkgunit",rtnValAry[1],0);
		 	settring_ea_qty(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "item_cd"), "", "");
	 }
}
function setOutboundLocInfoGrid(rtnVal){
	var sheetObj=sheet2;
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow() , fix_grid02+"fix_loc_cd",rtnValAry[0],0);// wh_loc_cd
		sheetObj.SetCellValue(sheetObj.GetSelectRow() , fix_grid02+"fix_loc_nm",rtnValAry[1],0);// wh_loc_nm
	}
}
function setStockInfoGrid(aryPopupData)
{
	var sheetObj=sheet2;
	if(aryPopupData != null && aryPopupData != "" && aryPopupData != undefined && aryPopupData != 'undefined'){	
		sheetObj.SetCellValue(sheetObj.GetSelectRow() , fix_grid02+"inbound_dt",aryPopupData[0]["inbound_dt"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow() , fix_grid02+"lot_no",aryPopupData[0]["lot_no"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow() , fix_grid02+"exp_dt",aryPopupData[0]["exp_dt"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow() , fix_grid02+"lot_04",aryPopupData[0]["lot_04"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow() , fix_grid02+"lot_05",aryPopupData[0]["lot_05"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow() , fix_grid02+"fix_lot_id",aryPopupData[0]["fix_lot_id"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow() , fix_grid02+"item_ser_no",aryPopupData[0]["item_ser_no"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow() , fix_grid02+"lic_plat_no",aryPopupData[0]["lic_plat_no"],0);
		//lot id
		//sheetObj.PopupButtonImage(sheetObj.GetSelectRow(), fix_grid02 + "fix_lot_id") = 1;
		sheetObj.SetCellImage(sheetObj.GetSelectRow(), fix_grid02 + "fix_lot_id_img", 1);
		sheetObj.SetCellEditable(sheetObj.GetSelectRow(), fix_grid02 + "inbound_dt",0);
		sheetObj.SetCellEditable(sheetObj.GetSelectRow(), fix_grid02 + "lot_no",0);
		sheetObj.SetCellEditable(sheetObj.GetSelectRow(), fix_grid02 + "exp_dt",0);
		sheetObj.SetCellEditable(sheetObj.GetSelectRow(), fix_grid02 + "lot_04",0);
		sheetObj.SetCellEditable(sheetObj.GetSelectRow(), fix_grid02 + "lot_05",0);
		sheetObj.SetCellEditable(sheetObj.GetSelectRow(), fix_grid02 + "item_ser_no",0);
		sheetObj.SetCellEditable(sheetObj.GetSelectRow(), fix_grid02 + "lic_plat_no",0);
	}
}
function setCurrCdGrid(aryPopupData, row, col, sheetIdx)
{
	var sheetObj=sheet2;
	sheetObj.SetCellValue(row , col,aryPopupData[0][2],0);
}
/*
 * 팝업 관련 로직 끝
 */
function btn_seal(){
	var formObj=document.form;
	if (document.all.showseal.style.display == "none") {
		document.all.showseal.style.display="block";
		document.all.showseal.style.visibility='visible';
		var seal_no=formObj.seal_no.value.split(",");
		if(seal_no[0] != undefined && seal_no[0] != ""){
			formObj.seal_no1.value=seal_no[0];
		}
		if(seal_no[1] != undefined && seal_no[1] != ""){
			formObj.seal_no2.value=seal_no[1];
		}
		if(seal_no[2] != undefined && seal_no[2] != ""){
			formObj.seal_no3.value=seal_no[2];
		}
		formObj.seal_no1.focus();
	}
}
function btn_seal_OK(){
	var formObj=document.form;
	var seal_no="";
	if(formObj.seal_no1.value != ""){
		seal_no += formObj.seal_no1.value;
	}
	if(formObj.seal_no2.value != ""){
		seal_no += ","+formObj.seal_no2.value;
	}
	if(formObj.seal_no3.value != ""){
		seal_no += ","+formObj.seal_no3.value;
	}
	formObj.seal_no.value=seal_no;
	document.all.showseal.style.display="none";
	document.all.showseal.style.visibility='hidden';
}
function btn_seal_Close(){
	document.all.showseal.style.display="none";
	document.all.showseal.style.visibility='hidden';
}
function btn_addr_info(name){
	var formObj = document.form;
	if (document.all.showaddr.style.display == "none") {
		document.all.showaddr.style.display="block";
		document.all.showaddr.style.visibility='visible';
		$("#addr1").val($("#" + name + "_addr1").val());
//		$("#addr2").val($("#" + name + "_addr2").val());
//		$("#addr3").val($("#" + name + "_addr3").val());
//		$("#addr4").val($("#" + name + "_addr4").val());
//		$("#addr5").val($("#" + name + "_addr5").val());
		$("#addr_name").val(name);
		formObj.addr1.focus();
	}
}
function btn_addr_OK(){
	$("#buyer_addr1").val($("#addr1").val());
	document.all.showaddr.style.display="none";
	document.all.showaddr.style.visibility='hidden';
}
function btn_addr_Close(){
	document.all.showaddr.style.display="none";
	document.all.showaddr.style.visibility='hidden';
}
/**
 * 
 * @param showFlg
 */
function btn_show_uploading_sheet(showFlg) {
	if (showFlg) {
		ComBtnEnable("btn_create_uploading_sheet");
		setEnableUnloadSht("btn_document_uploading_sheet", false, 5);
	}else{
		ComBtnDisable("btn_create_uploading_sheet");
		setEnableUnloadSht("btn_document_uploading_sheet", true, 5);
	}
}
/**
 * Unloading Sheet Doc icon 활성화 여부
 */
function setEnableUnloadSht(btId, bEnable, flg)
{
	if (flg == 5) {
	    if (bEnable) {
	        document.getElementById(btId).src="web/img/main/icon_doc.gif";
	        document.getElementById(btId).disabled=false;
	    } else {
	        document.getElementById(btId).src="web/img/main/icon_doc_g.gif";
	    	document.getElementById(btId).disabled=true;
	    }
	}
}
function btn_uploading_sheet()
{
	var formObj=document.form;
	WorkShtPopup(ComGetObjValue(formObj.wob_bk_no));
}
function WorkShtPopup(wob_bk_no)
{
	var sUrl="WHOutWorkSht.clt?wob_bk_no=" + wob_bk_no;
	callBackFunc = "";
	modal_center_open(sUrl, callBackFunc, 610,220,"yes");
}
function setWorkShtInfo(work_sht_yn, wob_bk_no)
{
	if(wob_bk_no ==  $("#sel_wob_bk_no").val())
	{
		//flg값 변경
		$("#work_sht_yn").val(work_sht_yn);
		//form탭의 값 변경
		if(work_sht_yn == "Y")
		{
			btn_show_uploading_sheet(false);
		}
		else
		{
			btn_show_uploading_sheet(true);
		}
	}
	//list탭의 값 변경
	var sheetObj=sheet1;
	var row=sheetObj.FindText(fix_grid01 + "wob_bk_no",wob_bk_no, sheetObj.HeaderRows(), -1, true);
	if(row == -1)
	{
		return;
	}
	sheetObj.SetCellValue(row, fix_grid01 + "work_sht_yn",work_sht_yn);
}
function form_tab_new_setting()
{
	var formObj = document.form;
	//=====value 값 관련 셋팅 =============
	//form mode 변경
	$("#form_mode").val("NEW");
	//form tab의 input filed clear
	$('#divForm').children().find('input').each(function(){
		   $(this).val('');
		});
	$("#rmk").val("");
	$("#bk_sts_cd").val("N");
	$("#bk_sts_nm").val(bk_sts_N);
	//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
	document.form.bk_sts_nm.style.background = bgInit;
	
	//default value 셋팅
	$("#voy").val("");
	$("#trucker_cd").val("");
	$("#trucker_nm").val("");
	$("#buyer_cd").val("");
	$("#buyer_nm").val("");
	$("#wh_cd").val($("#def_wh_cd").val());
	$("#wh_nm").val($("#def_wh_nm").val());
	$("#ctrt_no").val($("#def_wh_ctrt_no").val());
	$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
	var formObj=document.form;	
	if($("#ctrt_no").val().trim() != "" && $("#rtp_no").val().trim() == "")
	{
		if (!isNull(formObj.ctrt_no)) {
			getCtrtInfo(formObj.ctrt_no);
		}
	}
	else
	{
		//$("#rtp_no").val($("#rtp_no").val());
		//$("#owner_cd").val($("#owner_cd").val());
		searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));
	}
	$("#wh_cd_org").val($("#wh_cd").val());
	$("#ctrt_no_org").val($("#ctrt_no").val());	
	//ibcombo index = 0 셋팅
	if($("#def_ord_tp_cd").val() == "")
	{
		//$("#ord_tp_cd")[0].selectedIndex = 0;
	}
	else
	{
		$("#ord_tp_cd")[0].value=$("#def_ord_tp_cd").val();
	}
	$("#load_tp_cd")[0].selectedIndex = 0;
	$("#trade_tp_cd")[0].value = "DOM";
	$("#fwd_tp_cd")[0].value = "OTH";
	//날짜 기본셋팅
	$("#bk_date").val(ComGetNowInfo());
	//unloading sheet button 셋팅
	ComBtnDisable("btn_create_uploading_sheet");
	setEnableUnloadSht("btn_document_uploading_sheet", false, 5);
	
	//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
	// Freight Tab Button
	if (opt_chk == "Y"){
		ComBtnDisable("btn_rating");
		ComBtnEnable("btn_frtAdd");	
	 	formObj.bill_to_cd.value = formObj.owner_cd.value;
	 	formObj.bill_to_nm.value = formObj.owner_nm.value;
	}
 	
 	//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
 	fn_getWh_CurrCd(); 	
 	formObj.s_sts_nm.value = "New";
	//=====field readonly 셋팅 =============
	form_tab_field_enable(true);
	formObj.cust_ord_no.focus();
}
function form_tab_field_enable(flg)
{
	var formObj=document.form;
	ComEnableObject(formObj.wh_cd, flg);
	ComEnableObject(formObj.ctrt_no, flg);
	ComEnableObject(formObj.owner_cd, flg);
	if(flg==true){
		ComBtnEnable("btn_wh_cd");
		ComBtnEnable("btn_ctrt_no");
		ComBtnEnable("btn_owner_cd");
		ComBtnEnable("btn_owner_loc");
	}else{
		ComBtnDisable("btn_wh_cd");
		ComBtnDisable("btn_ctrt_no");
		ComBtnDisable("btn_owner_cd");
		ComBtnDisable("btn_owner_loc");
	}
	if(flg == false && $("#bk_sts_cd").val() == "N")
	{
		$("#ord_tp_cd")[0].disabled = true;
		$("#load_tp_cd")[0].disabled = true;
		$("#trade_tp_cd")[0].disabled = true;
		$("#fwd_tp_cd")[0].disabled = true;
		ComBtnEnable("btn_est_out_dt");
		ComEnableObject(formObj.est_out_dt, true);
	}
	else
	{
		$("#ord_tp_cd")[0].disabled = (!flg);
		$("#load_tp_cd")[0].disabled = (!flg);
		$("#trade_tp_cd")[0].disabled = (!flg);
		$("#fwd_tp_cd")[0].disabled = (!flg);
		if(flg==true){
			ComBtnEnable("btn_est_out_dt");
		}else{
			ComBtnDisable("btn_est_out_dt");
		}
		ComEnableObject(formObj.est_out_dt, flg);
	}
}
function settring_ea_qty(sheetObj, Row, item_cd, div, item_col)
{
	if(item_cd == "")
	{
		sheetObj.SetCellValue(Row, fix_grid02 + "item_sys_no","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_nm","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_pkgunit","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_pkgqty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_ea_qty",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_cbm",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_cbf",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_grs_kgs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_grs_lbs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_net_kgs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_net_lbs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_info","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv1_qty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv1_unit_cd","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv2_qty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv2_unit_cd","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv3_qty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv3_unit_cd","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv4_qty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "pkg_lv4_unit_cd","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "lv1_cbm","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "lv1_cbf","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "lv1_grs_kgs","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "lv1_grs_lbs","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "lv1_net_kgs","",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "lv1_net_lbs","",0);
		return;
	}
	if(sheetObj.GetCellValue(Row, fix_grid02+"pkg_info").indexOf(sheetObj.GetCellValue(Row, fix_grid02+"item_pkgunit"))	== -1)
	{
		sheetObj.SetCellValue(Row, fix_grid02 + "item_pkgqty",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_ea_qty",0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_cbm",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_cbf",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_grs_kgs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_grs_lbs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_net_kgs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_net_lbs",0,0);
		sheetObj.SetCellValue(Row, fix_grid02 + "item_pkgunit","",0);
		ComShowCodeMessage("COM0344");
		sheetObj.SelectCell(Row, fix_grid02 + "item_pkgunit");
		return;
	}
	//estimated ea 환산
	var est_qty=calc_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row, fix_grid02 + "item_pkgunit"), sheetObj.GetCellValue(Row, fix_grid02 + "item_pkgqty"));
	sheetObj.SetCellValue(Row, fix_grid02 + "item_ea_qty",est_qty);
	//measure
	var qty=est_qty;
	var pkg_lv1_qty=eval(sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv1_qty"));
	var lv1_cbm=eval(sheetObj.GetCellValue(Row, fix_grid02 + "lv1_cbm"));
	var lv1_cbf=eval(sheetObj.GetCellValue(Row, fix_grid02 + "lv1_cbf"));
	var lv1_grs_kgs=eval(sheetObj.GetCellValue(Row, fix_grid02 + "lv1_grs_kgs"));
	var lv1_grs_lbs=eval(sheetObj.GetCellValue(Row, fix_grid02 + "lv1_grs_lbs"));
	var lv1_net_kgs=eval(sheetObj.GetCellValue(Row, fix_grid02 + "lv1_net_kgs"));
	var lv1_net_lbs=eval(sheetObj.GetCellValue(Row, fix_grid02 + "lv1_net_lbs"));
	sheetObj.SetCellValue(Row,  fix_grid02 + "item_cbm",(pkg_lv1_qty * qty) * lv1_cbm);
	sheetObj.SetCellValue(Row,  fix_grid02 + "item_cbf",(pkg_lv1_qty * qty) * lv1_cbf,0);
	sheetObj.SetCellValue(Row,  fix_grid02 + "item_grs_kgs",(pkg_lv1_qty * qty) * lv1_grs_kgs);
	sheetObj.SetCellValue(Row,  fix_grid02 + "item_grs_lbs",(pkg_lv1_qty * qty) * lv1_grs_lbs,0);
	sheetObj.SetCellValue(Row,  fix_grid02 + "item_net_kgs",(pkg_lv1_qty * qty) * lv1_net_kgs);
	sheetObj.SetCellValue(Row,  fix_grid02 + "item_net_lbs",(pkg_lv1_qty * qty) * lv1_net_lbs,0);
	//unit price계산
	//lkh - ibsheet 최신 버전 - bug 수정 Insert 시 오류 수정 다시 확인 필요 - 원복
	//sheetObj.SetCellValue(Row, fix_grid02 + "unit_price",qty * eval(sheetObj.GetCellValue(Row, fix_grid02 + "item_unit_price")),0);
	sheetObj.SetCellValue(Row, fix_grid02 + "unit_price",qty * Number(sheetObj.GetCellValue(Row, fix_grid02 + "item_unit_price")),0);
	
}
function calc_ea_qty(sheetObj, Row, input_unit, input_qty)
{
	var pkg_qty=0;
	if(input_unit.trim() == "")
	{
		return 0;
	}
	//item의 pkg_unit별 qty를 검색한다.
	pkg_qty=get_unit_qty(sheetObj, Row, input_unit);
	return pkg_qty * ComParseInt(input_qty);
}
function get_unit_qty(sheetObj, Row, input_unit)
{
	var pkg_qty=0;
	//item의 pkg_unit별 qty를 검색한다.
	for(var i=1; i<=4; i++)
	{
		if(sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv" + (i)+ "_unit_cd") == input_unit)
		{
			pkg_qty=ComParseInt(sheetObj.GetCellValue(Row, fix_grid02 + "pkg_lv" + (i) + "_qty"));
			break;
		}
	}
	return pkg_qty;
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case "search":
//			if(ComIsEmpty(formObj.list_wh_cd)){
//				ComShowCodeMessage("COM0114","Warehouse");
//				$("#list_wh_cd").focus();
//				return false;
//			}
			/*if(ComIsEmpty(formObj.list_wh_cd))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				formObj.wh_cd.focus();
				return false;
			}*/
			if(ComIsEmpty(formObj.wh_cd))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				formObj.wh_cd.focus();
				return false;
			}
			if(ComIsEmpty(formObj.list_in_no)){
				ComShowCodeMessage("COM0114","Order Or Booking No");
				return false;
			}
			//bk_no가 없는경우 booking Date는 필수
			/*if(ComIsEmpty(formObj.list_in_no) 
			&& ComIsEmpty(formObj.list_fm_date) && ComIsEmpty(formObj.list_to_date))
			{
				ComShowCodeMessage("COM0114",$("#list_in_date_tp")[0].GetSelectText());
				formObj.list_fm_date.focus();
				return false;
			}
			if(!ComIsEmpty(formObj.list_fm_date) && ComIsEmpty(formObj.list_to_date)){
				formObj.list_to_date.value=ComGetNowInfo();
			}*/
			/* 3개월 duration 주석
			if (!ComIsEmpty(formObj.list_fm_date) && getDaysBetween2(formObj.list_fm_date.value, formObj.list_to_date.value)> 92) {
				ComShowCodeMessage("COM0141","3","(" + $("#list_in_date_tp")[0].GetSelectText()+ ")");
				formObj.list_fm_date.focus();
				return false;
			}
			*/
			/*if (!ComIsEmpty(formObj.list_fm_date) && !isDate(formObj.list_fm_date)) {
				ComShowCodeMessage("COM0114", $("#list_in_date_tp")[0].GetSelectText());
				formObj.list_fm_date.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.list_to_date) && !isDate(formObj.list_to_date)) {
				ComShowCodeMessage("COM0114", $("#list_in_date_tp")[0].GetSelectText());
				formObj.list_to_date.focus();
				return false;
			}*/
			/*if ((!ComIsEmpty(formObj.list_fm_date)&&ComIsEmpty(formObj.list_to_date))||(ComIsEmpty(formObj.list_fm_date)&&!ComIsEmpty(formObj.list_to_date))) {
				ComShowCodeMessage("COM0122", $("#list_in_date_tp")[0].GetSelectText());
				formObj.list_fm_date.focus();
				return false;
			}*/
			/*if (getDaysBetween2(formObj.list_fm_date.value, formObj.list_to_date.value)<0) {
				ComShowCodeMessage("COM0122", $("#list_in_date_tp")[0].GetSelectText());
				formObj.list_fm_date.focus();
				return false;
			}*/
			break;
		case "save":
			var sheetObj2=sheet2;
			var inbound_date="";
			var tab_one_row;
			/*if($("#sel_tab").val() == "01") //list tab에서 save(입력 및 수정)
			{
				var sheetObj1=sheet1;
				if(sheetObj1.RowCount()<= 0)
				{
					ComShowCodeMessage("COM0185","(List Sheet)");
					return false;
				}		
				if (sheetObj1.IsDataModified()== false && sheetObj2.IsDataModified()== false)//수정된내역이 없을경우(트랜잭션이 일어나지 않은경우)
				{
					ComShowCodeMessage("COM0323");
					 return false;
				}
				//-----sheet1
				for(var i=sheetObj1.HeaderRows(); i<=sheetObj1.LastRow();i++){
					if(sheetObj1.GetCellValue(i, fix_grid01 + "buyer_addr1") == "")
					{
						sheetObj1.SetCellValue(i, fix_grid01 + "buyer_addr1"," ");
					}
					//--모드가 NEW이거나 SEL_wob_bk_no=wob_bk_no와 같을경우만 Validation 체크
					if( (sheetObj1.GetRowStatus(i) == "I" &&  sheetObj1.GetCellValue(i, fix_grid01 + "form_mode") == "NEW")
							|| ($("#sel_wob_bk_no").val().trim() == sheetObj1.GetCellValue(i, fix_grid01 + "wob_bk_no"))
					   )
					{
						tab_one_row=i;
						//--Warehouse
						if(sheetObj1.GetCellValue(i, fix_grid01 + "wh_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","Warehouse");
							sheetObj1.SelectCell(i, fix_grid01 +  "wh_cd");
							return false;
						}
						//--Order No
						if(sheetObj1.GetCellValue(i, fix_grid01 + "cust_ord_no").trim() == "")
						{
							ComShowCodeMessage("COM0278","Order No");
							sheetObj1.SelectCell(i, fix_grid01 +  "cust_ord_no");
							return false;
						}
						//-- Order Type
						if(sheetObj1.GetCellValue(i, fix_grid01 + "ord_tp_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","Order Type");
							sheetObj1.SelectCell(i, fix_grid01 +  "ord_tp_cd");
							return false;
						}
						if(sheetObj1.GetCellValue(i, fix_grid01 + "ord_tp_cd").trim() == "A" && sheetObj1.GetCellValue(i, fix_grid01 + "rmk").trim() == "")
						{
							ComShowCodeMessage("COM0278", "Reason for ADJ");
							sheetObj1.SelectCell(i, fix_grid01 +  "rmk");
							return false;
						}					
						//--Estimate Date
						if(sheetObj1.GetCellValue(i, fix_grid01 + "est_out_dt").trim() == "")
						{
							ComShowCodeMessage("COM0278","Estimate Date");
							sheetObj1.SelectCell(i, fix_grid01 +  "est_out_dt");
							return false;
						}
//						if(sheetObj1.CellValue(i, fix_grid01 + "est_out_hm").trim() == "")
//						{
//							ComShowCodeMessage("COM0278","Estimate Date");
//							sheetObj1.SelectCell(i, fix_grid01 +  "est_out_hm");
//							return false;
//						}
						//--Contract
						if(sheetObj1.GetCellValue(i, fix_grid01 + "ctrt_no").trim() == "")
						{
							ComShowCodeMessage("COM0278","Contract");
							sheetObj1.SelectCell(i, fix_grid01 +  "ctrt_no");
							return false;
						}
						//--ship to
						if(sheetObj1.GetCellValue(i, fix_grid01 + "buyer_addr1").trim() == "")
						{
							ComShowCodeMessage("COM0278","Ship To");
							sheetObj1.SelectCell(i, fix_grid01 +  "buyer_addr1");
							return false;
						}
						//-- Loading Type
						if(sheetObj1.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "N" && sheetObj1.GetCellValue(i, fix_grid01 + "load_tp_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","Loading Type");
							sheetObj1.SelectCell(i, fix_grid01 +  "load_tp_cd");
							return false;
						}
						//-- EID Type
						if(sheetObj1.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "N" && sheetObj1.GetCellValue(i, fix_grid01 + "trade_tp_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","EID Type");
							sheetObj1.SelectCell(i, fix_grid01 +  "trade_tp_cd");
							return false;
						}
						//-- FWD Type
						if(sheetObj1.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "N" && sheetObj1.GetCellValue(i, fix_grid01 + "fwd_tp_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","FWD Type");
							sheetObj1.SelectCell(i, fix_grid01 +  "fwd_tp_cd");
							return false;
						}
						//--Booking Date
						if(sheetObj1.GetCellValue(i, fix_grid01 + "bk_date").trim() == "")
						{
							ComShowCodeMessage("COM0278","Booking Date");
							sheetObj1.SelectCell(i, fix_grid01 +  "bk_date");
							return false;
						}
						//--Owner
						if(sheetObj1.GetCellValue(i, fix_grid01 + "owner_cd").trim() == "")
						{
							ComShowCodeMessage("COM0278","Owner");
							sheetObj1.SelectCell(i, fix_grid01 +  "owner_cd");
							return false;
						}			
					}
				}			
			}*/
			
			//#4209 List -> Management 화면 이동시 sel_tab=''로 validation 적용되지 않아, Tab01로 지정하도록 처리
			if($("#sel_tab").val().trim() == ""){
				$("#sel_tab").val("01");
			}
			
			if($("#sel_tab").val() == "01")//if($("#sel_tab").val() == "02") //form tab에서 save(입력 및 수정)
			{
				//--Warehouse
				if (isNull(formObj.wh_cd)) {
					ComShowCodeMessage("COM0278", "Warehouse");
					formObj.wh_cd.focus();
					return false;
				}
				//--Order No
				//if (isNull(formObj.cust_ord_no)) {
				if($("#cust_ord_no").val().trim() == "") {
					ComShowCodeMessage("COM0278", "Order No");
					formObj.cust_ord_no.focus();
					return false;
				}
				//-- Contract No 체크
				if (isNull(formObj.ctrt_no)) {
					ComShowCodeMessage("COM0278", "Contract No");
					formObj.ctrt_no.focus();
					return false;
				}
				//Ship to
				if($("#buyer_cd").val().trim() == "") {  // bug #1347 CLT Blueprint system 17.02.21
					ComShowCodeMessage("COM0278", "Ship To Code");
					formObj.buyer_cd.focus();
					return false;
				}
				if($("#buyer_nm").val().trim() == "") {  // bug #1347 CLT Blueprint system 17.02.21
					ComShowCodeMessage("COM0278", "Ship To Name");
					formObj.buyer_nm.focus();
					return false;
				}
				//-- Order Type
				if ($("#ord_tp_cd")[0].value == "") {
					ComShowCodeMessage("COM0278", "Order Type");
					return false;
				}
				if($("#ord_tp_cd")[0].value == "A" && $("#rmk").val().trim() == "")
				{
					ComShowCodeMessage("COM0278", "Reason for ADJ");
					formObj.rmk.focus();
					return false;
				}	
				//-- Booking Date
				if (isNull(formObj.bk_date)) {
					ComShowCodeMessage("COM0278", "Booking Date");
					formObj.bk_date.focus();
					return false;
				}
				//-- Loading Type
				if ($("#load_tp_cd")[0].value == "") {
					ComShowCodeMessage("COM0278", "Loading Type");
					return false;
				}
				//-- Estimate In Date
				if (isNull(formObj.est_out_dt)) {
					ComShowCodeMessage("COM0278", "Estimate Date");
					formObj.est_out_dt.focus();
					return false;
				}
				//-- EID Type
				if ($("#bk_sts_cd").val() == "N" && $("#trade_tp_cd")[0].value == "") {
					ComShowCodeMessage("COM0278", "EID Type");
					return false;
				}
				//-- FWD Type
				if ($("#bk_sts_cd").val() == "N" && $("#fwd_tp_cd")[0].value == "") {
					ComShowCodeMessage("COM0278", "FWD Type");
					return false;
				}
				//-- Owner
				if (isNull(formObj.owner_cd)) {
					ComShowCodeMessage("COM0278", "Owner");
					formObj.owner_cd.focus();
					return false
				}
			}
			//-----sheet2는 공통
			var rowCnt=sheetObj2.RowCount();
			var rowCntD = sheetObj2.RowCount("D");
			if(rowCnt - rowCntD <= 0)
			{
				ComShowCodeMessage("COM0185","(Item Sheet)");
				return false;
			}
			// 합계는 Validation체크 제외 "i<=sheetObj2.LastRow()" -> "i<sheetObj2.LastRow()"
			var subSum = "|" + sheetObj2.FindSubSumRow();
			for(var i=sheetObj2.HeaderRows(); i<sheetObj2.LastRow();i++){
				if(sheetObj2.GetRowStatus(i) != "D" && subSum.indexOf("|" + i) < 0)
				{
					//-- Item Code
					if(sheetObj2.GetCellValue(i, fix_grid02 + "item_cd").trim() == "")
					{
						ComShowCodeMessage("COM0278","SKU");
						sheetObj2.SelectCell(i, fix_grid02 +  "item_cd");
						return false;
					}
					//-- Unit
					if(sheetObj2.GetCellValue(i, fix_grid02 + "item_pkgunit").trim() == "")
					{
						ComShowCodeMessage("COM0278","UOM");
						sheetObj2.SelectCell(i, fix_grid02 +  "item_pkgunit");
						return false;
					}
					//-- Qty
					if(sheetObj2.GetCellValue(i, fix_grid02 + "item_pkgqty").trim() == "")
					{
						ComShowCodeMessage("COM0278","Qty");
						sheetObj2.SelectCell(i, fix_grid02 +  "item_pkgqty");
						return false;
					}
					//VIS에서 들어온건중 ITEM_CD가 TL_CTRT_CUST_ITEM에는 존재하고 UNIT정보도 올바르기때문에 따로 수정작업을 안거쳤을경우
					//강제로 UPDATE모드로 바꿔주어야 프로시저내에서 INVALID_YN여부를 NULL로 업데이트칠수있으므로 IBFLAG모드를 수정한다.
					if(sheetObj2.GetCellValue(i, fix_grid02+"invalid_yn") == "Y" && sheetObj2.GetCellValue(i, fix_grid02+"su_valid_yn") == "Y"
						  && sheetObj2.GetCellValue(i, fix_grid02+"ibflag") == "R"
						)
					{
						sheetObj2.SetCellValue(i, fix_grid02+"ibflag","U");
					}
				}
			}			
			break;
		case "cancel":
			/*if($("#sel_tab").val() == "01") //list tab에서 delete
			{
				var sheetObj=sheet1;
				var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
				if (sRow == "") {
					ComShowCodeMessage("COM0253");
					return false;
				}
			}*/
			if($("#sel_tab").val() == "01")//else if($("#sel_tab").val() == "02")
			{
				if($("#sel_wob_bk_no").val().trim() == "")
				{
					ComShowCodeMessage("COM0289", "booking order");
					return false;
				}
			}
			break;
		case "ccancel":
			/*if($("#sel_tab").val() == "01") //list tab에서 delete
			{
				var sheetObj=sheet1;
				var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
				if (sRow == "") {
					ComShowCodeMessage("COM0253");
					return false;
				}
			}*/
			if($("#sel_tab").val() == "01")//else if($("#sel_tab").val() == "02")
			{
				if($("#sel_wob_bk_no").val().trim() == "")
				{
					ComShowCodeMessage("COM0289", "booking order");
					return false;
				}
			}
			break;
		case "sheet6_save":
			var sheetObj=sheet6;
	
			
			//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
			if(sheet6.RowCount() > 0){
				if (isNull(formObj.bill_to_cd)) {
					ComShowCodeMessage("COM0278", "Bill To");
					formObj.bill_to_cd.focus();
					return false;
				}				
			}
			//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
			if($("#cust_ord_no").val().trim() == "") {
				ComShowCodeMessage("COM0278", "Order No");
				formObj.cust_ord_no.focus();
				return false;
			}
			//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
			changeFrtinfo();			
			
			
			//-----sheet6
			for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow();i++){
				if(sheetObj.GetRowStatus(i) != "D") {
					if(sheetObj.GetCellValue(i, fix_grid06 + "rate_tp_cd").trim() == "")
					{
						ComShowCodeMessage("COM0278","Type");
						sheetObj.SelectCell(i, fix_grid06 +  "rate_tp_cd");
						return false;
					}
					if(sheetObj.GetCellValue(i, fix_grid06 + "frt_cd").trim() == "")
					{
						ComShowCodeMessage("COM0278","Billing Item");
						sheetObj.SelectCell(i, fix_grid06 +  "frt_cd");
						return false;
					}
					if(sheetObj.GetCellValue(i, fix_grid06 + "unit_cd").trim() == "")
					{
						ComShowCodeMessage("COM0278","Unit 1");
						sheetObj.SelectCell(i, fix_grid06 +  "unit_cd");
						return false;
					}
					if(sheetObj.GetCellValue(i, fix_grid06 + "unit_cd").trim() != "")
					{
						if (sheetObj.GetCellValue(i, fix_grid06 + "unit_cd")!="ODR" && sheetObj.GetCellValue(i, fix_grid06 + "unit_cd")!="HOR") {
							if(sheetObj.GetCellValue(i, fix_grid06 + "unit_cd2").trim() == ""){
								ComShowCodeMessage("COM0278","Unit2");
								sheetObj.SelectCell(i, fix_grid06 +  "unit_cd2");
								return false;
							}
						}
					}
					if(sheetObj.GetCellValue(i, fix_grid06 + "curr_cd").trim() == "")
					{
						ComShowCodeMessage("COM0278","Currency");
						sheetObj.SelectCell(i, fix_grid06 +  "curr_cd");
						return false;
					}
					
					if(sheetObj.GetCellValue(i, fix_grid06 + "inv_amt").trim() == "0")
					{
						ComShowCodeMessage("COM0278","the Q'tY(Hour)");
						sheetObj.SelectCell(i, fix_grid06 +  "qty");
						return false;
					}
				}
			}
			break;
		}
	}
	return true;
}

//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
function changeFrtinfo() {
	var formObj=document.form;
	var sheetObj=sheet6;
	//#5563 [Binex] WMS Contract Currency to overwrite Office Local Currency
	var df_curr_cd = rate_curr_cd != '' ? rate_curr_cd : formObj.wh_curr_cd.value;
	for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow();i++){
		
		if(sheetObj.GetCellValue(i, fix_grid06 + "cust_cd") != formObj.bill_to_cd.value){
			sheetObj.SetCellValue(i, fix_grid06 + "cust_cd", formObj.bill_to_cd.value);
		}

		if(sheetObj.GetCellValue(i, fix_grid06 + "cust_ord_no") != formObj.cust_ord_no.value){
			sheetObj.SetCellValue(i, fix_grid06 + "cust_ord_no", formObj.cust_ord_no.value);
		}
		
		if(sheetObj.GetCellValue(i, fix_grid06 + "curr_cd") != df_curr_cd){
			sheetObj.SetCellValue(i, fix_grid06 + "curr_cd", df_curr_cd);
		}
		if(sheetObj.GetCellValue(i, fix_grid06 + "ofc_cd") != formObj.wh_ofc_cd.value){
			sheetObj.SetCellValue(i, fix_grid06 + "ofc_cd", formObj.wh_ofc_cd.value);
		}		
	}
	
}


function ord_tp_cd_OnChange(sheetObj, Code, Text){
	if(Code == "A")
	{
		$("#rmk_title1").hide();
		$("#rmk_title2").show();
	}
	else
	{
		$("#rmk_title1").show();
		$("#rmk_title2").hide();
	}
}
function go_Wave()
{
	var sUrl;
	if($("#sel_tab").val() == "01") //list tab에서 delete
	{
		var sheetObj=sheet1;
		var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
		if (sRow == "") {
			if($("#sel_wave_no").val().trim() == "")
			{
				sUrl="./WaveSmpMgmt.clt?req_wob_bk_no="+$("#sel_wob_bk_no").val().trim() ;
			}
			else
			{
				if($("#smp_wave_flg").val() == "Y")
				{
					sUrl="./WaveSmpMgmt.clt?req_wave_no="+$("#sel_wave_no").val().trim();
				}
				else
				{
					sUrl="./WaveMgmt.clt?wave_no="+$("#sel_wave_no").val().trim();
				}
			}
			parent.mkNewFrame('Wave', sUrl);
		}
		else
		{
			var arrRow=sRow.split("|"); //결과 : "1|3|5|"
			var req_wob_bk_no="";
			if(arrRow.length == 1)
			{
				if(sheetObj.GetCellValue(arrRow[0], fix_grid01 + "wave_no") == "")
				{
					sUrl="./WaveSmpMgmt.clt?req_wob_bk_no="+sheetObj.GetCellValue(arrRow[0], fix_grid01 + "wob_bk_no");
				}
				else
				{
					if(sheetObj.GetCellValue(arrRow[0], fix_grid01 + "smp_wave_flg") == "Y")
					{
						sUrl="./WaveSmpMgmt.clt?req_wave_no="+sheetObj.GetCellValue(arrRow[0], fix_grid01 + "wave_no");
					}
					else
					{
						sUrl="./WaveMgmt.clt?wave_no="+sheetObj.GetCellValue(arrRow[0], fix_grid01 + "wave_no");
					}
				}
				parent.mkNewFrame('Wave', sUrl);
			}
			else
			{
				for(var i=0; i<arrRow.length; i++)
				{
					if(req_wob_bk_no.length == 0)
					{
						req_wob_bk_no=sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wob_bk_no") ;
					}
					else
					{
						req_wob_bk_no=req_wob_bk_no + "," + sheetObj.GetCellValue(arrRow[i], fix_grid01 + "wob_bk_no");
					}
				}
				sUrl="./WaveSmpMgmt.clt?req_wob_bk_no="+req_wob_bk_no;
				parent.mkNewFrame('Wave', sUrl);
			}
		}
	}
	else if($("#sel_tab").val() == "02")
	{
		if($("#sel_wob_bk_no").val().trim() == "")
		{
			ComShowCodeMessage("COM0289", "booking order");
			return;
		}
		if($("#wave_no").val().trim() == "")
		{
			sUrl="./WaveSmpMgmt.clt?req_wob_bk_no="+$("#sel_wob_bk_no").val().trim();
		}
		else
		{
			if($("#smp_wave_flg").val() == "Y")
			{
				sUrl="./WaveSmpMgmt.clt?req_wave_no="+$("#wave_no").val().trim();
			}
			else
			{
				sUrl="./WaveMgmt.clt?wave_no="+$("#wave_no").val().trim();
			}
		}
		parent.mkNewFrame('Wave', sUrl);
	}
}
function convDate(date) {
	if (date != 0){
		if (date.length == 8){
			var rtn = date.substring(4, 6) + "-" + date.substring(6, 8) + "-" + date.substring(0, 4);
			return rtn;
		}else if (date.length == 10){
			var rtn = date.substring(5,7) + "-" + date.substring(8, 10) + "-" + date.substring(0, 4);
			return rtn;
		}
	}else {
		return date;
	}
}

/* #2927 [LOA WMS4.0] ITEM CBM CALCULATION
   주석처리 - CoCommon.js 공통함수 사용
function funcKGS_CBM_CAC(command, obj, obj2) {
	var formObj=document.form;
	var sheetObj=sheet2;
	var currow=0;	
	currow=sheetObj.GetSelectRow();
	if (command == "LB_KG") { // GWT / NWT
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) / CNVT_CNST_KG_LB), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	} else if (command == "KG_LB") { // CBM
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) * CNVT_CNST_KG_LB), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	} else if (command == "CBF_CBM") { // CBM
//#2927 [LOA WMS4.0] ITEM CBM CALCULATION 
//var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) * 0.028317), 3);
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) / WMS_CNVT_CNST_CBM_CFT), WMS_CBM_POINT_COUNT);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	}	else if (command == "CBM_CBF") { // CBM
//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
//var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) / 0.028317), 3);
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) * WMS_CNVT_CNST_CBM_CFT), WMS_CBM_POINT_COUNT);
		lb_amt=lb_amt * 100000;
		lb_amt=Math.round(lb_amt);
		lb_amt=lb_amt / 100000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	}
}
*/

function timeCheck(obj){
	var formObj = document.form;
	var size=obj.value.length;
	if(size==1){
		obj.value="0" + obj.value + ":00";
	}else if(size==2){
		if(hourCheck(obj.value)){
			obj.value=obj.value + ":00";
		}else{
			obj.value='';
		}
	}else if(size==3){
		if(hourCheck(obj.value.substring(0,2))){
			if(obj.value.substring(2,3)>5 || obj.value.substring(2,3)<0){
				obj.value='';
			}else if(obj.value.substring(2,3) == ":"){
				obj.value=obj.value.substring(0,2) + ":" + "00";
			}else{
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,3) + "0";
			}
		}else{
			obj.value='';
		}
	}else if(size==4){
		if(hourCheck(obj.value.substring(0,2))){
			if(minuteCheck(obj.value.substring(2,4))){
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,4);
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}else if(size==5){
		var val = obj.value.split(':');
		if(hourCheck(val[0])){
			if(minuteCheck(val[1])){
				obj.value=val[0] + ":" + val[1];
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}
}
function hourCheck(obj){
	if(isNaN(obj)){
		ComShowCodeMessage("COM0047");
		return false;
	}
	if(obj>23 || obj<0){
		//HOUR: 0-23
		ComShowCodeMessage("COM0047");
		return false;
	}else{
		return true;
	}
}
function minuteCheck(obj){
	if(isNaN(obj)){
		ComShowCodeMessage("COM0048");
		return false;
	}
	if(obj>59 || obj<0){
		//alert('0-59');
		ComShowCodeMessage("COM0048");
		return false;
	}else{
		return true;
	}
}
function getInfo_BuyCd(obj) {
	formObj=document.form;
	var val = obj.value;
	if(val != ""){
		ajaxSendPost(dispCodeNameAjaxReq2_Sup, 'reqVal','&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + val, './GateServlet.gsl');
	}else {
//		formObj.buyer_cd.value = '';
//		formObj.buyer_nm.value = '';
//		//#4209 [BNX WMS4.0] Outbound Management Ship To BUYER_NM column add
//		formObj.buyer_addr1.value = '';
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq2_Sup(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			formObj.buyer_nm.value=masterVals[2];

			// AS-IS : Trade Partner Entry > B/L Name Address
			//formObj.buyer_addr1.value=masterVals[4];
			
			//#4209 [BNX WMS4.0] Outbound Management Ship To BUYER_NM column add
			// TO-BE : Buyer Address = Local Address + City Nm + State Nm + Zip Code + Eng Country Nm  
			var addr_summary = '';
			if( masterVals[9] != null && masterVals[9] != '' ){
				addr_summary = addr_summary + masterVals[9] +"\r\n";  // Address Summary
			}
			if( masterVals[10] != null && masterVals[10] != '' ){
				addr_summary = addr_summary + masterVals[10] ; 		  // Country Eng Nm 
			}
			
			formObj.buyer_addr1.value = addr_summary;
		}else{
			formObj.buyer_cd.value="";//trdp_cd
			formObj.buyer_nm.value="";//trdp_nm
			//#4209 [BNX WMS4.0] Outbound Management Ship To BUYER_NM column add
			formObj.buyer_addr1.value="";//trdp_addr
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEE_BMD_0061.152");		
	}
}
function getInfo_TruckerCode(obj) {
	formObj=document.form;
	var val = obj.value;
	if(val != ""){
		ajaxSendPost(dispCodeNameAjaxReq3_Sup, 'reqVal','&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + val, './GateServlet.gsl');
	}else {
		formObj.trucker_cd.value = '';
		formObj.trucker_nm.value = '';
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq3_Sup(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			formObj.trucker_nm.value=masterVals[2];	
		}else{
			formObj.trucker_cd.value="";//trucker_cd
			formObj.trucker_nm.value="";//trucker_nm
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEE_BMD_0061.152");		
	}
}



function sheet1_OnKeyDown(sheetObj, Row, Col, KeyCode) { 
    if(KeyCode == 13) { 
    	var colName=sheetObj.ColSaveName(Col);
    	var sUrl="";
    	with(sheetObj)
    	{
    		if(colName == fix_grid01 + "ctrt_nm")
    		{
    			sheetObj.SelectCell(Row, Col);
    			if(sheet2.RowCount()> 0)
    			{
    				//confirm
    				if(ComShowCodeConfirm("COM0294") == false)
    				{
    					sheetObj.SetCellValue(Row, Col,sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no_org"),0);
    					return;
    				}
    				//SHEET 초기화
    				sheet2.RemoveAll();
    			}
    			var ord_tp_lvl1_cd="\'P\'";
    			var pnl_svc_tp_cd="44";
    		   	var sUrl="./ContractRoutePopup.clt?ctrt_nm="+sheetObj.GetCellValue(Row, Col)+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd + "&pnl_svc_tp_cd=" + pnl_svc_tp_cd;
    		   	callBackFunc = "setContactInfoGrid";
    			modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
    		}				
    		else if ( colName == fix_grid01 + "eq_tpsz_nm" ) 
    		{
    			sheetObj.SelectCell(Row, Col);
    			var tp="A";
    			if(sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd")) != "")
    			{
    				tp="";
    			}
    			callBackFunc = "setTruckTypeInfoGrid";
    		    modal_center_open('./ContainerTypePopup.clt?type=' + tp + '&eq_unit='+sheetObj.GetCellValue(Row, Col), rtnary, 400, 590,"yes");
    		}
    		else if (colName == fix_grid01 + "seal_no")
    		{
    			sheetObj.SelectCell(Row, Col);
    			ComShowMemoPad3(sheetObj, Row, Col, false, 300, 82,  Col, Col);      
    		}
    		else if (colName == fix_grid01 + "rmk")
    		{
    			sheetObj.SelectCell(Row, Col);
    			ComShowMemoPad4(sheetObj, Row, Col, false, 200, 100,Col, Col);
    		}
    		/*else if(colName == fix_grid01 + "owner_addr1")
    		{
    			sheetObj.SelectCell(Row, Col);
    			CustomerGridPopup("owner_cd", sheetObj, Row, Col, fix_grid01);
    		}*/
    		/*else if(colName == fix_grid01 + "buyer_addr1")
    		{
    			sheetObj.SelectCell(Row, Col);
    			CustomerGridPopup("buyer_cd", sheetObj, Row, Col, fix_grid01);
    		}*/
    		else if(colName == fix_grid01 + "vsl_nm")
    		{
    			sheetObj.SelectCell(Row, Col);
    			rtnary=new Array(2);
    	   		rtnary[0]="1";
    	   		// 2011.12.27 value parameter
    	   		if(sheetObj.GetCellValue(Row, Col)!= ""){
    	   			rtnary[1]=sheetObj.GetCellValue(Row, Col);
    	   			rtnary[2]=sheetObj.GetCellValue(Row, Col-1);
    	   			//rtnary[1]=sheetObj.GetCellValue(Row, Col+1);
    	   			//rtnary[2]=sheetObj.GetCellValue(Row, Col);
    	   		}else{
    	   			rtnary[1]="";
    	   			rtnary[2]="";
    	   		}
    	   		callBackFunc = "setVslInfoGrid";
    			modal_center_open('./CMM_POP_0140.clt', rtnary, 656,450,"yes");
    		}
    		else if(colName == fix_grid01 + "carrier_nm")
    		{
    			sheetObj.SelectCell(Row, Col);
    			CustomerGridPopup("carrier_cd", sheetObj, Row, Col, fix_grid01);
    		}
    		else if (colName == fix_grid01 + "pod")
    		{
    			sheetObj.SelectCell(Row, Col);
    			podGridPopup("pod", sheetObj, Row, Col, fix_grid01);
    		}
    		else if (colName == fix_grid01 + "pol")
    		{
    			sheetObj.SelectCell(Row, Col);
    			podGridPopup("pol", sheetObj, Row, Col, fix_grid01);
    		}
    		else if (colName == fix_grid01 + "del")
    		{
    			sheetObj.SelectCell(Row, Col);
    			podGridPopup("del", sheetObj, Row, Col, fix_grid01);
    		}
    		else if(colName == fix_grid01 + "owner_addr2")
    		{
    			sheetObj.SelectCell(Row, Col);
    			ComShowMemoPad4(sheetObj, Row, fix_grid01 + "owner_addr2", false, 185, 90, Col,  Col, fix_grid01 + "owner_addr1");      
    		}
    		else if(colName == fix_grid01 + "buyer_addr1")
    		{
    			sheetObj.SelectCell(Row, Col);
    			ComShowMemoPad4(sheetObj, Row, fix_grid01 + "buyer_addr1", false, 185, 90, Col,  Col, fix_grid01 + "buyer_addr1");      
    		}
    	} 
    } 
} 
function sheet2_OnKeyDown(sheetObj, Row, Col, KeyCode) { 
    if(KeyCode == 13) {
    	var colName=sheetObj.ColSaveName(Col);
    	var sUrl="";
    	with(sheetObj)
    	{
    		if(colName == fix_grid02 + "item_nm")
    		{
    			sheetObj.SelectCell(Row, Col);
    			var sUrl="./CtrtItemPopup.clt?ctrt_no="+ sheetObj.GetCellValue(Row, fix_grid02 + "ctrt_no")
    				+"&item_nm="+ sheetObj.GetCellValue(Row, Col)
    				+"&wh_cd=" +  sheetObj.GetCellValue(Row, fix_grid02 + "wh_cd");
    		   	callBackFunc = "setItemGrid";
    			modal_center_open(sUrl, callBackFunc, 400, 520,"yes");
    		}	
    		else if(colName == fix_grid02 + "item_pkgunit")
    		{
    			sheetObj.SelectCell(Row, Col);
    			if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
    			{
    				ComShowCodeMessage("COM0114","Item");
    				sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
    				return;
    			}
    			var sUrl="./CommonCodePopup.clt?grp_cd=A6&code="+sheetObj.GetCellValue(Row, Col)
    			                            + "&wh_flag=Y" 
    			                            + "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no")
    			                            + "&item_sys_no=" + sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no");
    			callBackFunc = "setPkgunitGrid";
    			modal_center_open(sUrl, callBackFunc, 400,520,"yes");
    		}				
    		else if ( colName == fix_grid02 + "fix_loc_nm" ) 
    		{
    			sheetObj.SelectCell(Row, Col);
    			var sUrl="./WarehouseLocPopup.clt?f_loc_cd="+ sheetObj.GetCellValue(Row, fix_grid02+"wh_cd")
    			                             + "&alloc_flg=Y" + "&f_wh_loc_nm=" + sheetObj.GetCellValue(Row, Col);
    			if(sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd_it").trim() != "")
    			{
    				sUrl=sUrl + "&f_fix_wh_loc_nm=" + sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_nm_it");
    			}
    			callBackFunc = "setOutboundLocInfoGrid";
    		    modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
    		}
    		else if (colName == fix_grid02 + "fix_lot_id_img")
    		{
    			sheetObj.SelectCell(Row, Col);
    			if(sheetObj.GetCellValue(Row, fix_grid02 + "fix_lot_id").trim() == "" )
    			{
    				if(sheetObj.GetCellValue(Row, fix_grid02+"item_sys_no") == "")
    				{
    					ComShowCodeMessage("COM0114","Item");
    					sheetObj.SelectCell(Row, fix_grid02 + "item_cd");
    					return;
    				}
    				var sParam="wh_cd=" + sheetObj.GetCellValue(Row, fix_grid02+"wh_cd");
    				sParam += "&wh_nm=" + encodeURIComponent(sheetObj.GetCellValue(Row, fix_grid02+"wh_nm"));
    				sParam += "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid02+"ctrt_no");
    				sParam += "&ctrt_nm=" + encodeURIComponent(sheetObj.GetCellValue(Row, fix_grid02+"ctrt_nm"));
    				sParam += "&item_cd=" + sheetObj.GetCellValue(Row, fix_grid02+"item_cd");
    				sParam += "&call_tp=G&f_alloc_flg=Y";
    			   	var sUrl="./WHOutStockSelectPopup.clt?" + sParam;
    			   	callBackFunc = "setStockInfoGrid";
    				modal_center_open(sUrl, callBackFunc, 1120, 630,"yes");
    			}
    			else
    			{
    				sheetObj.SetCellValue(Row, fix_grid02 + "fix_lot_id","",0);
    				sheetObj.SetCellValue(Row, fix_grid02 + "inbound_dt","",0);
    				sheetObj.SetCellValue(Row, fix_grid02 + "lot_no","",0);
    				sheetObj.SetCellValue(Row, fix_grid02 + "exp_dt","",0);
    				sheetObj.SetCellValue(Row, fix_grid02 + "lot_04","",0);
    				sheetObj.SetCellValue(Row, fix_grid02 + "lot_05","",0);
    				sheetObj.SetCellEditable(Row, fix_grid02 + "inbound_dt",1);
    				sheetObj.SetCellEditable(Row, fix_grid02 + "lot_no",1);
    				sheetObj.SetCellEditable(Row, fix_grid02 + "exp_dt",1);
    				sheetObj.SetCellEditable(Row, fix_grid02 + "lot_04",1);
    				sheetObj.SetCellEditable(Row, fix_grid02 + "lot_05",1)
    				sheetObj.PopupButtonImage(Row, fix_grid02 + "fix_lot_id_img",0);
    				sheetObj.SetCellImage(Row, fix_grid02 + "fix_lot_id_img",0);
    			}
    		}
    	}
    }
}
function btn_show_shipping(showFlg){
	if(showFlg){
		document.all.btn_hide_nm.style.display="block";
		document.all.btn_show_nm.style.display="none";
		document.all.show_shipping.style.display="block";
	}else{
		document.all.btn_hide_nm.style.display="none";
		document.all.btn_show_nm.style.display="block";
		document.all.show_shipping.style.display="none";
	}
}
function allocCmplPopup(){
	var wave_no = $("#wave_no").val();
	var wh_cd = $("#wh_cd").val();
	var wob_bk_no = $("#wob_bk_no").val();
	if(wh_cd == ""){
		ComShowCodeMessage("COM0114","Warehouse");
		return;
	}else if(wob_bk_no == ""){
		ComShowCodeMessage("COM130104");
		return;
	}
	
	//#3390-Check Authority WMS CODE
	var formObj=document.form;
	
	ComChecWmsCd_Authority(formObj.wh_cd.value);
	if (isWmsAuthOk == false) { 
		//alert('Not authenticated.\r\nYou are not authorized to access Warehouse');
		ComShowCodeMessage("COM0785");
		return
	}  
	
	var hdrR = sheet2.HeaderRows();
    var rowCnt = sheet2.RowCount();
    
    // There are some changes (Rate Details) not saved. Are you sure to continue without saving the changes?
    var ischk = false;
    var selectRow = 0;
    for (var i = hdrR; i < rowCnt + hdrR; i++) {
    	if(parseInt(sheet2.GetCellValue(i,fix_grid02+"item_pkgqty")) > 0 && sheet2.GetCellValue(i,fix_grid02+"item_pkgunit") != "") {
    		ischk = true;
    		selectRow = i;    		
    		break;
    	}
    }
    if(!ischk){
    	ComShowCodeMessage("COM0779");
		sheet2.SelectCell(selectRow,fix_grid02+"item_pkgqty");
		return;
    }
	var param = "?wave_no=" + wave_no + "&wh_cd=" + wh_cd + "&wob_bk_no=" + wob_bk_no
	var sUrl="./ManualAllcCmplPopup.clt" + param;
   	callBackFunc = "setManualAllcCmplPopup";
	//[WMS 개선 문의사항]-2.	Allocation & Complete :2.1	Pop-up Window Size 조정
	//modal_center_open(sUrl, callBackFunc, 1120, 630,"yes");
    modal_center_open(sUrl, callBackFunc, 1280, 720,"yes");
   	//modal_center_open(sUrl, callBackFunc, screen.width - 200, 720,"yes");
}
function setManualAllcCmplPopup(){
	if(rtnary[0] == 'Y'){
		doWork("SEARCHLIST");
	}
}
function list_in_search_tp_onchange(){
	var formObj = document.form;
		formObj.list_in_no.value = "";
}

function fn_frt_add() {
	var formObj=document.form;
	
	//#4806 [Closing In & Out Entry] Can't save data successfully
	if (isNull(formObj.bill_to_cd)) {
		ComShowCodeMessage("COM0278", "Bill To");
		formObj.bill_to_cd.focus();
		return;
	}		
	
	//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
	if (isNull(formObj.wh_curr_cd)) {
		ComShowCodeMessage("COM0278", "Warehouse");
		goTabSelect('01');
		formObj.wh_cd.focus();
		return;
	}	
	
	
	var row=sheet6.DataInsert(sheet6.HeaderRows() + sheet6.RowCount());
	// Init Value Set
	if (sheet6.RowCount() > 1) {
		sheet6.SetCellValue(row, fix_grid06 + "rate_tp_cd", sheet6.GetCellValue(row-1, fix_grid06 + "rate_tp_cd"));
		sheet6.SetCellValue(row, fix_grid06 + "cust_cd", sheet6.GetCellValue(row-1, fix_grid06 + "cust_cd"));
		sheet6.SetCellValue(row, fix_grid06 + "curr_cd", sheet6.GetCellValue(row-1, fix_grid06 + "curr_cd"));
		sheet6.SetCellValue(row, fix_grid06 + "wh_cd", sheet6.GetCellValue(row-1, fix_grid06 + "wh_cd"));
		sheet6.SetCellValue(row, fix_grid06 + "wob_bk_no", sheet6.GetCellValue(row-1, fix_grid06 + "wob_bk_no"));
		sheet6.SetCellValue(row, fix_grid06 + "cust_ord_no", sheet6.GetCellValue(row-1, fix_grid06 + "cust_ord_no"));
		sheet6.SetCellValue(row, fix_grid06 + "ctrt_no", sheet6.GetCellValue(row-1, fix_grid06 + "ctrt_no"));
		sheet6.SetCellValue(row, fix_grid06 + "ofc_cd", sheet6.GetCellValue(row-1, fix_grid06 + "ofc_cd"));
	} else {		
		sheet6.SetCellValue(row, fix_grid06 + "rate_tp_cd", 'OUT');
		sheet6.SetCellValue(row, fix_grid06 + "cust_cd", formObj.bill_to_cd.value);
		sheet6.SetCellValue(row, fix_grid06 + "wh_cd", formObj.wh_cd.value);
		sheet6.SetCellValue(row, fix_grid06 + "wob_bk_no", formObj.wob_bk_no.value);
		sheet6.SetCellValue(row, fix_grid06 + "cust_ord_no", formObj.cust_ord_no.value);
		sheet6.SetCellValue(row, fix_grid06 + "ctrt_no", formObj.ctrt_no.value);
		sheet6.SetCellValue(row, fix_grid06 + "ofc_cd", formObj.wh_ofc_cd.value);
		sheet6.SetCellValue(row, fix_grid06 + "curr_cd", formObj.wh_curr_cd.value);
	}
	
    // SKU ComboList조회
 	var p_ctrt_no = formObj.ctrt_no.value;
 	var p_wh_cd = formObj.wh_cd.value;
 	sheet6Row = row;
 	
 	ajaxSendPost(dispAjaxReq_sheet6, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');
 	//#5563 [Binex] WMS Contract Currency to overwrite Office Local Currency
 	addFrt = true;
	var param = '&wob_bk_no=' + formObj.wob_bk_no.value + '&cust_cd=' + formObj.bill_to_cd.value + '&wh_cd=' + formObj.wh_cd.value + '&outbound_dt=' + formObj.outbound_dt.value;
	param +=  '&cust_ord_no=' + formObj.cust_ord_no.value + '&ctrt_no=' + formObj.ctrt_no.value;
	ajaxSendPost(setDefaultCurrCd, 'reqVal', '&goWhere=aj&bcKey=searchWHOutRateInOutCurrCd' + param , './GateServlet.gsl');
}

//#5563 [Binex] WMS Contract Currency to overwrite Office Local Currency
var addFrt = false;
function setDefaultCurrCd(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		var currCdDft = '';
		if(typeof(doc[1])!='undefined'){
			currCdDft = doc[1];			
			rate_curr_cd = doc[1];
		}
		else{
			currCdDft = formObj.wh_curr_cd.value;	
			rate_curr_cd = '';
		}
		if(addFrt){
			var row = sheet6.RowCount() + sheet6.HeaderRows() - 1;			
			sheet6.SetCellValue(row, fix_grid06 + "curr_cd", currCdDft);
		}
		document.getElementById("sp_curr_cd").innerHTML = currCdDft;
	}
	addFrt = false;
}

function dispAjaxReq_sheet6(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				//특정 셀의 콤보 항목 바꾸기
				sheet6.CellComboItem(sheet6Row,"Grd06item_cd",{ComboText:rtnArr[0], ComboCode:rtnArr[1]} );
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

function sheet6_OnChange(sheetObj, Row, Col, Value){
    var formObj=document.form;
    var prefix="Grd06";
    var sXml="";
    var sParm="";
    var srcName=sheetObj.ColSaveName(Col);
    tempRow = Row;
    tempCol = Col;

    switch (srcName) {
        case prefix+"frt_cd":
            var frt = sheetObj.GetCellText(Row,srcName).split(":");
            if(frt!="")
            	sheetObj.SetCellValue(Row,prefix + "frt_nm", frt[1]);
            else sheetObj.SetCellValue(Row,prefix + "frt_nm", "");
            break;
        case prefix+"unit_cd":
            if(!ComIsNull(Value)){

            	// Unit2 콤보 정보 선택
            	var strUnit2Cd = "|CBM|CBF|GKG|GLB|NKG|NLB";
            	var strUnit2Text = "|CBM|CFT|G.KG|G.LB|N.KG|N.LB";
            	
            	//# of License Plate
            	if (Value == "LPN") {
            		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|" + LIC_PLATE_TEXT, ComboCode:"|" + LIC_PLATE_CD} );
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
            		//Property of License Plate
            	} else if (Value == "LPP") {
            		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:strUnit2Text, ComboCode:strUnit2Cd} );
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
            		//Container
            	} else if (Value == "CNT") {
            		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|" + TPCD1, ComboCode:"|" + TPCD1} );
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
            		//Truck
            	} else if (Value == "TRK") {
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
            		sheetObj.CellComboItem(Row, prefix+"unit_cd2",{ComboText:"|" + TRUCK_TEXT, ComboCode:"|" + TRUCK_CD} );
            		//Handling Unit
            	} else if (Value == "HUT") {
            		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|Quantity" + strUnit2Text, ComboCode:"|QTY" + strUnit2Cd} );
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
            		//Package Unit
            	} else if (Value == "PUT") {
            		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|Quantity" + strUnit2Text, ComboCode:"|QTY" + strUnit2Cd} );
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
            		//Order
            	} else if (Value == "ODR") {
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",0);
            		sheetObj.SetCellValue(Row, prefix+"unit_cd2","");
            		//Hour
            	} else if (Value == "HOR") {
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",0);
            		sheetObj.SetCellValue(Row, prefix+"unit_cd2","");
            	}
            	
            	// #2096 [WMS4.0]Inbound / Outbound Freight Tab의 Item항목 비활성화
            	// Handling Unit 또는 Package Unit이 아닌경우, Item Code 비활성화
            	if (Value != "HUT" && Value != "PUT") {
            		sheetObj.SetCellEditable(Row, prefix+"item_cd",0);
            		sheetObj.SetCellValue(Row, prefix+"item_cd","");
            	} else {
            		sheetObj.SetCellEditable(Row, prefix+"item_cd",0);
            	}
            }
            break;
        case prefix+"unit_cd2":
        	if(!ComIsNull(Value)){

        	}
        	break;
        case prefix+"unit_price":
        	var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
        	var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
        	var inv_amt=qty * unit_price;
        	inv_amt = roundXL(Number(inv_amt),2);
        	sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
//        	sheetObj.SetCellValue(Row, prefix+"inv_ttl_amt", inv_amt);
            break;
        case prefix+"qty":
        	var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
        	var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
        	var inv_amt=qty * unit_price;
        	inv_amt = roundXL(Number(inv_amt),2);
        	sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
//        	sheetObj.SetCellValue(Row, prefix+"inv_ttl_amt", inv_amt);
            break;
//		case prefix+"del":
//			if(sheetObj.GetRowStatus(Row) == "I")
//			{
//				sheetObj.RowDelete(Row, false);
//				return;
//			}
//			sheetObj.SetRowHidden(Row,1);//2.행 숨기기
//			sheetObj.SetRowStatus(Row,"D");
    }
}

//Freight Sheet의 CUST CD정보 변경
function changeBillToCd(obj) {
	var objVal = obj.value;
	var sheetObj=sheet6;
	for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow();i++){
		sheetObj.SetCellValue(i, fix_grid06 + "cust_cd", objVal);
	}
}

/*
 * Customer search
 * OnKeyDown 13 or onChange
 */
function codeName(str, obj, tmp){
	var formObj=document.form;
	var s_code=obj.value.toUpperCase();
	var s_type="";
	if(s_code != ""){
		CODETYPE=str;
		if(str == "commodity") {
			s_type="commodity";
		}else{
			s_type="trdpCode";
		}
		if(tmp == "onKeyDown"){
			
			if(event.keyCode == 13){
				ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
		else if(tmp == "onBlur"){
			if(s_code != ""){
				ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}else{
		if(str == "CUSTUMER"){
			formObj.bill_to_cd.value="";//cust_cd  AS param1
			formObj.bill_to_nm.value="";//cust_nm   AS param2
		}
	}
}

var CODETYPE='';
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="CUSTUMER"){
				formObj.bill_to_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.bill_to_nm.value=masterVals[3];	//cust_nm   AS param2
//				docObjects[0].RemoveAll();
			}
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.bill_to_cd.value="";				//cust_cd  AS param1
				formObj.bill_to_nm.value="";				//cust_nm   AS param2
			}
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function sheet6_OnSaveEnd(sheetObj){
	l_btn_rateFlg = false;
}

function sheet6_OnSearchEnd(){
	var sheetObj=sheet6;
    var prefix="Grd06";
	
    hdrR = sheetObj.HeaderRows();
    rowCnt = sheetObj.RowCount();

    sheetObj.InitComboNoMatchText(1, "",1);
    
    var formObj=document.form; 
    var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
    var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
    formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
    
    // #1392 [WMS4.0] Inbound/Outbound Management Freight Status 표기
    formObj.s_sts_nm.value = "New";
    
    for (var i = hdrR; i < rowCnt + hdrR; i++) {
    	// SKU ComboList조회
    	var p_ctrt_no = formObj.ctrt_no.value;
    	var p_wh_cd = formObj.wh_cd.value;
    	sheet6Row = i;
    	ajaxSendPost(dispAjaxReq_sheet6, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');
    	
//    	sheetObj.SetCellValue(i, prefix + "rating_flg", "N", 0);
    	
		// Unit2 콤보 정보 선택
		var strUnit2Cd = "|CBM|CBF|GKG|GLB|NKG|NLB";
		var strUnit2Text = "|CBM|CFT|G.KG|G.LB|N.KG|N.LB";
		
		//# of License Plate
		if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "LPN") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|" + LIC_PLATE_TEXT, ComboCode:"|" + LIC_PLATE_CD} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Property of License Plate
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "LPP") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:strUnit2Text, ComboCode:strUnit2Cd} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Container
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "CNT") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|" + TPCD1, ComboCode:"|" + TPCD1} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Truck
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "TRK") {
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|" + TRUCK_TEXT, ComboCode:"|" + TRUCK_CD} );
			//Handling Unit
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "HUT") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|Quantity" + strUnit2Text, ComboCode:"|QTY" + strUnit2Cd} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Package Unit
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "PUT") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|Quantity" + strUnit2Text, ComboCode:"|QTY" + strUnit2Cd} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Order
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "ODR") {
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",0);
			sheetObj.SetCellValue(i, prefix+"unit_cd2","");
			//Hour
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "HOR") {
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",0);
			sheetObj.SetCellValue(i, prefix+"unit_cd2","");
		}
		
		// #2096 [WMS4.0]Inbound / Outbound Freight Tab의 Item항목 비활성화
    	// Handling Unit 또는 Package Unit이 아닌경우, Item Code 비활성화
		// Item code는 항상 비활성 이어야 함. Rate에 설정된 값으로만 셋팅.
    	if (sheetObj.GetCellValue(i, prefix + "unit_cd") != "HUT" && sheetObj.GetCellValue(i, prefix + "unit_cd") != "PUT") {
    		sheetObj.SetCellEditable(i, prefix+"item_cd",0);
    		sheetObj.SetCellValue(i, prefix+"item_cd","");
    	} else {
    		sheetObj.SetCellEditable(i, prefix+"item_cd",0);
    	}
		
		// Closing Status가 Confirmed Or Invoiced인 경우
		if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "CON"
			|| sheetObj.GetCellValue(i, prefix + "sts_cd") == "INV") {
			sheetObj.SetRowEditable(i, 0);
			formObj.bill_to_cd.disabled = true;
			formObj.bill_to_nm.disabled = true;
			formObj.btn_bill_to_cd.disabled = true;
			formObj.btn_rating.disabled = true;
			formObj.btn_frtAdd.disabled = true;

		} else {
			formObj.bill_to_cd.disabled = false;
			formObj.bill_to_nm.disabled = false;
			formObj.btn_bill_to_cd.disabled = false;
			formObj.btn_rating.disabled = false;
			formObj.btn_frtAdd.disabled = false;
//			sheetObj.SetRowEditable(i, 1);
//			if (sheetObj.GetCellValue(i, prefix + "rating_flg") != "Y") {
//			sheetObj.SetCellEditable(i, prefix+"rate_tp_cd",1);
			sheetObj.SetCellEditable(i, prefix+"frt_cd",1);
			sheetObj.SetCellEditable(i, prefix+"unit_cd",1);
//				sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			sheetObj.SetCellEditable(i, prefix+"unit_price",1);
			sheetObj.SetCellEditable(i, prefix+"qty",1);
//			sheetObj.SetCellEditable(i, prefix+"item_cd",1);
//			} else {
//				sheetObj.SetCellEditable(i, prefix+"unit_price",1);
//				sheetObj.SetCellEditable(i, prefix+"qty",1);
//			}
		}
		
		//link 폰트색상 변경
		sheetObj.SetCellFontColor(i, prefix + "cls_no","#0100FF");
		sheetObj.SetCellFontColor(i, prefix + "cls_dt","#0100FF");
		sheetObj.SetCellFontColor(i, prefix + "cust_cd","#0100FF");
		sheetObj.SetCellFontColor(i, prefix + "cust_nm","#0100FF");
		sheetObj.SetCellFontColor(i, prefix + "inv_seq","#0100FF");
		sheetObj.SetCellFontColor(i, prefix + "inv_no","#0100FF");
		
		sheetObj.SetCellFontUnderline(i, prefix +  "cls_no", 1);
		sheetObj.SetCellFontUnderline(i, prefix +  "cls_dt", 1);
		sheetObj.SetCellFontUnderline(i, prefix +  "cust_cd", 1);
		sheetObj.SetCellFontUnderline(i, prefix +  "cust_nm", 1);
		sheetObj.SetCellFontUnderline(i, prefix +  "inv_seq", 1);
		sheetObj.SetCellFontUnderline(i, prefix +  "inv_no", 1);
		
		if (!ComIsEmpty(sheetObj.GetCellValue(i, prefix + "curr_cd"))) {
			document.getElementById("sp_curr_cd").innerHTML = sheetObj.GetCellValue(i, prefix + "curr_cd");
			//#5563 [Binex] WMS Contract Currency to overwrite Office Local Currency
			rate_curr_cd = sheetObj.GetCellValue(i, prefix + "curr_cd");
		}
		
		// Bill To 정보가 있는 경우 
		// Default셋업 Owner가 아닌경우, Bill To Name설정
		if (!ComIsEmpty(sheetObj.GetCellValue(i, prefix + "cust_cd"))) {
			formObj.bill_to_cd.value = sheetObj.GetCellValue(i, prefix + "cust_cd");
	    	formObj.bill_to_cd.focus();
	    	formObj.btn_bill_to_cd.focus();   
		}
		
		// #1392 [WMS4.0] Inbound/Outbound Management Freight Status 표기
		// Freight Data Check
		//#4806 ** [Korex] WMS Be able to add Freight Items when In/Outbound file is "Booked"
		if($("#sel_wob_bk_no").val().trim() == "")
		{
			$("#sel_wob_bk_no").val($("#wob_bk_no").val());
		}			
		ajaxSendPost(checkWMSFreightInfoExist, 'reqVal','&goWhere=aj&bcKey=checkWMSFreightInfo&cust_ord_no=' + formObj.cust_ord_no.value + '&wob_bk_no='+$("#sel_wob_bk_no").val(), './GateServlet.gsl');

		if (ComIsNull(sheetObj.GetCellValue(i, prefix + "sts_cd"))) {
			formObj.s_sts_nm.value = lv_StsNm;
			$("#s_sts_nm").css("color","gray");
		} else if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "SAV") {
			formObj.s_sts_nm.value = "Closing Saved";
			$("#s_sts_nm").css("color","blue");
		} else if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "CON") {
			formObj.s_sts_nm.value = "Confirmed";
			$("#s_sts_nm").css("color","red");
		} else if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "INV") {
			formObj.s_sts_nm.value = "Invoiced";
			$("#s_sts_nm").css("color","red");
		}
    }
	//Total
    sheetObj.SetSumValue(prefix + "qty", document.getElementById("sp_curr_cd").innerHTML + " Total");
}

function sheet6_OnClick(sheetObj,Row, Col, Value){
    var formObj=document.form;
    var prefix="Grd06";
    var srcName=sheetObj.ColSaveName(Col);
    
    switch (srcName) {
//		case prefix+"row_del":
//			if(sheetObj.GetRowStatus(Row) == "I")
//			{
//				sheetObj.RowDelete(Row, false);
//				return;
//			}
//			sheetObj.SetRowHidden(Row,1);//2.행 숨기기
//			sheetObj.SetRowStatus(Row,"D");
    }
}

function sheet6_OnChangeSum(sheetObj, Row, Col) {
    var formObj=document.form;
    var prefix="Grd06";
	//합계 행에 값이 바뀌었을 때, 계산 정보 표시
    var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
    var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
    formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
}

function fn_auto_rating() {

	l_btn_rateFlg = true;
	
	var formObj=document.form;
	var sheetObj=sheet6;

	// Bill To Check
	if(ComIsEmpty(formObj.bill_to_cd))
	{
		ComShowCodeMessage("COM0114","Bill To");
		$("#bill_to_cd").focus();
		return false;
	}

	var sheetObj=sheet6;
    var prefix="Grd06";
    hdrR = sheetObj.HeaderRows();
    rowCnt = sheetObj.RowCount();
    
    // There are some changes (Rate Details) not saved. Are you sure to continue without saving the changes?
    for (var i = hdrR; i < rowCnt + hdrR; i++) {
    	if(sheetObj.IsDataModified()) {
    		if(ComShowCodeConfirm("COM0291") == false){
    			return;
    		} else {
    			break;
    		}
    	}
    }
	
    hdrR = sheetObj.HeaderRows();
    rowCnt = sheetObj.RowCount();
	
	//sheet초기화 및 form tab초기화	
	formObj.f_cmd.value = SEARCH06;
 	var sXml=sheetObj.GetSearchData("./searchWHOutMgmtListGS.clt", FormQueryString(formObj,""));
 	
 	var strtIndxSheet1 = sXml.indexOf("<SHEET6>");
	var endIndxSheet1 = sXml.indexOf("</SHEET6>") + "</SHEET6>".length;
	
	var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
	sheet6.LoadSearchData(sheet1Data.replaceAll('SHEET6', 'SHEET'));
	//#5563 [Binex] WMS Contract Currency to overwrite Office Local Currency
	var param = '&wob_bk_no=' + formObj.wob_bk_no.value + '&cust_cd=' + formObj.bill_to_cd.value + '&wh_cd=' + formObj.wh_cd.value + '&outbound_dt=' + formObj.outbound_dt.value;
	param +=  '&cust_ord_no=' + formObj.cust_ord_no.value + '&ctrt_no=' + formObj.ctrt_no.value;
	ajaxSendPost(setDefaultCurrCd, 'reqVal', '&goWhere=aj&bcKey=searchWHOutRateInOutCurrCd' + param , './GateServlet.gsl');
}

var totalRowMerge = 0;
var startRow = 0;
var cellDateMerge = [];
function mergeCell(Row){
	totalRowMerge = 0;
	startRow = 0;
	cellDateMerge = [];
	for(var i = Row ; i <= sheet2.RowCount() + 1 ; i++){
		if(i == Row){
			getDataOri(i);
			i++;
		}
		checkDataMerge(i);
	}
}
function checkDataMerge(i){
	getData(i);
	var sheetObj = sheet2;
	if(row_del == row_del_ori && item_cd == item_cd_ori
			&& item_nm == item_nm_ori && item_pkgunit == item_pkgunit_ori
			&& item_pkgqty == item_pkgqty_ori && item_ea_qty == item_ea_qty_ori
			&& stock_qty == stock_qty_ori && lot_no == lot_no_ori
			&& lot_04 == lot_04_ori && lot_05 == lot_05_ori
			&& fix_lot_id == fix_lot_id_ori && fix_lot_id_img == fix_lot_id_img_ori
			//#5872 [TotalCarglExpress-WMS]duplicates SKU when shipped.
			//&& inbound_dt == inbound_dt_ori && exp_dt == exp_dt_ori && item_seq == item_seq_ori
			&& item_seq == item_seq_ori
			){
		if(startRow == 0){
			startRow = i;
			totalRowMerge = 1;
			//#5872 [TotalCarglExpress-WMS]duplicates SKU when shipped.
			cellDateMerge[cellDateMerge.length] = startRow - 1;
			cellDateMerge[cellDateMerge.length] = totalRowMerge;
		}		
		//#5872 [TotalCarglExpress-WMS]duplicates SKU when shipped.
		if(inbound_dt == inbound_dt_ori && exp_dt == exp_dt_ori){
			cellDateMerge[cellDateMerge.length - 1] = cellDateMerge[cellDateMerge.length - 1] + 1;
		}else{
			cellDateMerge[cellDateMerge.length] = i;
			cellDateMerge[cellDateMerge.length] = 1;
			inbound_dt_ori = inbound_dt;
			exp_dt_ori = exp_dt;
		}
		sheetObj.SetCellValue(i, fix_grid02+"item_pkgqty", 0,0);
		sheetObj.SetCellValue(i, fix_grid02+"item_ea_qty", 0,0);
		sheetObj.SetCellValue(i, fix_grid02+"ibflag","R");
		totalRowMerge++;
	}
	else{
		if(totalRowMerge == 1){
			totalRowMerge++;
		}
		startRow = startRow - 1;
		setMergeCell(startRow, totalRowMerge, cellDateMerge);
		
		getDataOri(i);
		
		startRow = 0;
		totalRowMerge = 0;
	}
	
	if(i == sheet2.RowCount() + 1){
		if(startRow != 0){
			if(totalRowMerge == 1){
				totalRowMerge++;
			}
			startRow = startRow - 1;
			setMergeCell(startRow, totalRowMerge, cellDateMerge);
			startRow = 0;
			totalRowMerge = 0;
		}
	}
}
var row_del_ori = '';
var item_cd_ori = '';
var item_nm_ori = '';
var item_pkgunit_ori = '';
var item_pkgqty_ori = '';
var item_ea_qty_ori = '';
var stock_qty_ori = '';
var lot_no_ori = '';
var lot_04_ori = '';
var lot_05_ori = '';
var fix_lot_id_ori = '';
var fix_lot_id_img_ori = '';
var inbound_dt_ori = '';
var exp_dt_ori = '';
var item_seq_ori = '';

function getDataOri(i){
	var sheetObj = sheet2;
	row_del_ori = sheetObj.GetCellValue(i, fix_grid02+"row_del");
	item_cd_ori = sheetObj.GetCellValue(i, fix_grid02+"item_cd");
	item_nm_ori = sheetObj.GetCellValue(i, fix_grid02+"item_nm");
	item_pkgunit_ori = sheetObj.GetCellValue(i, fix_grid02+"item_pkgunit");
	item_pkgqty_ori = sheetObj.GetCellValue(i, fix_grid02+"item_pkgqty");
	item_ea_qty_ori = sheetObj.GetCellValue(i, fix_grid02+"item_ea_qty");
	stock_qty_ori = sheetObj.GetCellValue(i, fix_grid02+"stock_qty");
	lot_no_ori = sheetObj.GetCellValue(i, fix_grid02+"lot_no_qty");
	lot_04_ori = sheetObj.GetCellValue(i, fix_grid02+"lot_04");
	lot_05_ori = sheetObj.GetCellValue(i, fix_grid02+"lot_05");
	fix_lot_id_ori = sheetObj.GetCellValue(i, fix_grid02+"fix_lot_id");
	fix_lot_id_img_ori = sheetObj.GetCellValue(i, fix_grid02+"fix_lot_id_img");
	inbound_dt_ori = sheetObj.GetCellValue(i, fix_grid02+"inbound_dt");
	exp_dt_ori = sheetObj.GetCellValue(i, fix_grid02+"exp_dt");
	item_seq_ori = sheetObj.GetCellValue(i, fix_grid02+"item_seq");
}

var row_del = '';
var item_cd = '';
var item_nm = '';
var item_pkgunit = '';
var item_pkgqty = '';
var item_ea_qty = '';
var stock_qty = '';
var lot_no = '';
var lot_04 = '';
var lot_05 = '';
var fix_lot_id = '';
var fix_lot_id_img = '';
var inbound_dt = '';
var exp_dt = '';
var item_seq = '';

function getData(i){
	var sheetObj = sheet2;
	row_del = sheetObj.GetCellValue(i, fix_grid02+"row_del");
	item_cd = sheetObj.GetCellValue(i, fix_grid02+"item_cd");
	item_nm = sheetObj.GetCellValue(i, fix_grid02+"item_nm");
	item_pkgunit = sheetObj.GetCellValue(i, fix_grid02+"item_pkgunit");
	item_pkgqty = sheetObj.GetCellValue(i, fix_grid02+"item_pkgqty");
	item_ea_qty = sheetObj.GetCellValue(i, fix_grid02+"item_ea_qty");
	stock_qty = sheetObj.GetCellValue(i, fix_grid02+"stock_qty");
	lot_no = sheetObj.GetCellValue(i, fix_grid02+"lot_no_qty");
	lot_04 = sheetObj.GetCellValue(i, fix_grid02+"lot_04");
	lot_05 = sheetObj.GetCellValue(i, fix_grid02+"lot_05");
	fix_lot_id = sheetObj.GetCellValue(i, fix_grid02+"fix_lot_id");
	fix_lot_id_img = sheetObj.GetCellValue(i, fix_grid02+"fix_lot_id_img");
	inbound_dt = sheetObj.GetCellValue(i, fix_grid02+"inbound_dt");
	exp_dt = sheetObj.GetCellValue(i, fix_grid02+"exp_dt");
	item_seq = sheetObj.GetCellValue(i, fix_grid02+"item_seq");
}
function setMergeCell(startRow, totalRowMerge, cellDateMerge){
	sheet2.SetMergeCell(startRow, 2, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 3, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 4, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 5, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 6, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 7, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 8, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 9, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 10, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 11, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 12, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 13, totalRowMerge, 1);
	//#5872 [TotalCarglExpress-WMS]duplicates SKU when shipped.
	/*sheet2.SetMergeCell(startRow, 14, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 15, totalRowMerge, 1);*/
	for(var i=1; i<cellDateMerge.length; i=i+2){
		sheet2.SetMergeCell(cellDateMerge[i-1], 14, cellDateMerge[i], 1);
		sheet2.SetMergeCell(cellDateMerge[i-1], 15, cellDateMerge[i], 1);
	}
	
}

function sheet2_OnSort(Col, SortArrow) {
	mergeCell(2);
}

function checdup_OrderNo() {
	var formObj=document.form;
	ajaxSendPost(checkDuplicateOrderNo, 'reqVal', '&goWhere=aj&bcKey=checkDuplicateOrderNoOB&cust_ord_no='+formObj.cust_ord_no.value + "&wh_cd=" + formObj.wh_cd.value + "&ctrt_no=" + formObj.ctrt_no.value, './GateServlet.gsl');
}
/**
 * AJAX RETURN
 * Check Dup Order No
 */
function checkDuplicateOrderNo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				ComShowCodeMessage("COM131302", "Order No");

				//#3195 [BINEX WMS4.0] [#3100 개선] INBOUND LIST AND ENTRY SHOWING DIFF SKU
				if($('#cust_ord_no').attr('org_cust_ord_no') != '') {
					$('#cust_ord_no').val($('#cust_ord_no').attr('org_cust_ord_no'));
				} else {
					formObj.cust_ord_no.value = "";
				}
			}
		}
	}
}

function btn_stockSelection(){
	if($("#form_mode").val() == "UPDATE")
	{
		if($("#bk_sts_cd").val() == "X" || $("#bk_sts_cd").val() == "P")//Pickd, Complete시 row추가 불가
		{
			return;
		}
	}
	var formObj=document.form;
	
	//warehouse 필수로 입력되어야함.
	if(isNull(formObj.wh_cd)){
		ComShowCodeMessage("COM12233");
		formObj.wh_cd.focus();
		return false;
	}	
	
	
	// Contract No 체크
	if (isNull(formObj.ctrt_no)) {
		ComShowCodeMessage("COM0278", "Contract No");
		formObj.ctrt_no.focus();
		return;
	}			

	var sParam="ctrt_no=" + formObj.ctrt_no.value;
		sParam += "&ctrt_nm=" + formObj.ctrt_nm.value;
		sParam += "&wh_cd=" + formObj.wh_cd.value;
		sParam += "&wh_nm=" + formObj.wh_cd.options[formObj.wh_cd.selectedIndex].text;
		sParam += "&owner_cd=" ;
		sParam += "&owner_nm=";
		sParam += "&call_tp=B"; // Stock Selection button에서 호출	
		sParam += "&f_alloc_flg=Y"; //가능재고 체크를 위하여
   	var sUrl="./WHOutStockSelectPopup.clt?" + sParam;
   	callBackFunc = "setStockInfoButton";
	modal_center_open(sUrl, callBackFunc, 1120, 630,"yes");
}

function setStockInfoButton(aryPopupData) {
	var sheetObj=sheet2;
	var prefix=fix_grid02;
	
	if(aryPopupData != null && aryPopupData != "" && aryPopupData != undefined && aryPopupData != 'undefined'){
		
		for(var k=0; k < aryPopupData.length; k++){
			sheet2RowAdd_OnClick();
			
			//var insertRow=sheetObj.LastRow() - 1;
			var insertRow=sheetObj.GetSelectRow();
			
			sheetObj.SetCellValue(insertRow, prefix+"item_cd",aryPopupData[k]["item_cd"]);
			sheetObj.SetCellValue(insertRow, prefix+"item_nm",aryPopupData[k]["item_nm"],0);
			sheetObj.SetCellValue(insertRow, prefix+"inbound_dt",aryPopupData[k]["inbound_dt"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lot_no",aryPopupData[k]["lot_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"exp_dt",aryPopupData[k]["exp_dt"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lot_04",aryPopupData[k]["lot_04"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lot_05",aryPopupData[k]["lot_05"],0);
			sheetObj.SetCellValue(insertRow, prefix+"fix_lot_id",aryPopupData[k]["fix_lot_id"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_sys_no",aryPopupData[k]["item_sys_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"pkg_lv1_qty",aryPopupData[k]["c"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_cbm",aryPopupData[k]["lv1_cbm"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_cbf",aryPopupData[k]["lv1_cbf"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_grs_kgs",aryPopupData[k]["lv1_grs_kgs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_grs_lbs",aryPopupData[k]["lv1_grs_lbs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_net_kgs",aryPopupData[k]["lv1_net_kgs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_net_lbs",aryPopupData[k]["lv1_net_lbs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"pkg_info",aryPopupData[k]["pkg_info"],0);
			sheetObj.SetCellValue(insertRow, prefix+"stock_qty",aryPopupData[k]["stock_qty"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lic_plat_no",aryPopupData[k]["lic_plat_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_ser_no",aryPopupData[k]["item_ser_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"po_no",aryPopupData[k]["po_no"],0);
		}
	}
}

//Freight Sheet DblClick
function sheet6_OnDblClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	switch(colName)
	{
		case fix_grid06 + "cls_no":
			if (sheetObj.GetCellValue(Row, fix_grid06 + "cls_no") != "") {
				goClosingClsNoInOutMgmt(sheetObj.GetCellValue(Row, fix_grid06 + "cls_no"), "cls");
			}
		break;
		case fix_grid06 + "cls_dt":
			if (sheetObj.GetCellValue(Row, fix_grid06 + "cls_no") != "") {
				goClosingClsNoInOutMgmt(sheetObj.GetCellValue(Row, fix_grid06 + "cls_no"), "cls");
			}
			break;
		case fix_grid06 + "inv_seq":
			if (sheetObj.GetCellValue(Row, fix_grid06 + "inv_seq") != "") {
				goARInvEntry(sheetObj.GetCellValue(Row, fix_grid06 + "inv_seq"), sheetObj.GetCellValue(Row, fix_grid06 + "inv_no"));
			}
		break;
		case fix_grid06 + "inv_no":
			if (sheetObj.GetCellValue(Row, fix_grid06 + "inv_no") != "") {
				goARInvEntry(sheetObj.GetCellValue(Row, fix_grid06 + "inv_seq"), sheetObj.GetCellValue(Row, fix_grid06 + "inv_no"));
			}
			break;
	}
}

function goClosingClsNoInOutMgmt(val, type)
{
	var formObj=document.form;
	var cls_no = sheet6.GetCellValue(sheet6.GetSelectRow(), fix_grid06 + "cls_no");
	
	var param="?cls_no=" + cls_no
		+ "&wh_cd=" + formObj.wh_cd.value
		+ "&ctrt_no=" + formObj.bill_to_cd.value
		+ "&ctrt_nm=" + formObj.bill_to_nm.value;
	var sUrl="./ClosingInOutMgmt.clt" + param;
	parent.mkNewFrame('Closing In & Out Management', sUrl, "ClosingMgmt_" + param);
	
}
function goARInvEntry(invSeq, invNo) {
	var sUrl="./ACC_INV_0010.clt?sys_cd=WMS&f_inv_seq=" + invSeq + "&s_inv_no=" + invNo
	parent.mkNewFrame('A/R Entry', sUrl, "ACC_INV_0010_WMS_" + invSeq);
}

//#1392 [WMS4.0] Inbound/Outbound Management Freight Status 표기
function checkWMSFreightInfoExist(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] == "0"){
				lv_StsNm = "New";
			} else {
				lv_StsNm = "Freight Saved";
			}

		}
	}
}

//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
function setGridHeaderTitleAlias(sheetObj) {

	var ctrt_no = document.getElementById("ctrt_no").value;
	var lot4_alias = document.getElementById("lot4_alias").value;
	var lot5_alias = document.getElementById("lot5_alias").value;

	if(ctrt_no == '') return;

	var strHead = "";
	for(var i=0; i<sheetObj.HeaderRows(); i++) {
		for(var j=0; j<sheetObj.LastCol(); j++) {
			strHead = sheetObj.GetCellText(i, j);
			strHead = strHead.toUpperCase();
			if(j == 10) {			//"LOT 04"
				sheetObj.SetCellText(i, j, lot4_alias);
			} else if(j == 11) {	//"LOT 05"
				sheetObj.SetCellText(i, j, lot5_alias);
			}
		}
	}
}

//#4608 [WMS] In/Outbound Management to have [Multi Row Add] button
function sheet2MultiRowAdd(sheetObj, rowCnt){
	var formObj=document.frm1;

	for(var i=0 ; i < rowCnt ; i++){
		var curRow = sheetObj.GetSelectRow();
		sheet2RowAdd(sheetObj, curRow);
	}
}

//#4562 [Korex] WMS Outbound Delivery Status (v461.14 or later)
function checkDelivered(){
	var formObj=document.form;

	// Delivered Unchecked
	if(!formObj.dlvr_flg.checked){
		var tmp = formObj.rcv_shp_dt.value;
		formObj.rcv_shp_dt.disabled = true;
		formObj.rcv_shp_tm.disabled = true;
		formObj.rcv_dt_cal.disabled = true;
		
		formObj.rcv_shp_dt.value = "";
		formObj.rcv_shp_tm.value = "";
		formObj.full_dlvr_dttm.value = "";
	// Delivered Checked
	} else {
		var objToday  = new Date() ;	
		var curHour   = objToday.getHours()   < 10 ? "0" + objToday.getHours() : objToday.getHours() ;
		var curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes() ;
		var curdate   = objToday.getDate()    < 10 ? "0" +objToday.getDate() : objToday.getDate();
		var month     = objToday.getMonth()   + 1; // getMonth() is zero-based
		var curMonth  = month < 10 ? "0" + month :  month ;
		var curYear   = objToday.getFullYear() ;
		
		formObj.rcv_shp_dt.disabled = false;
		formObj.rcv_shp_tm.disabled = false;
		formObj.rcv_dt_cal.disabled = false;
		
		formObj.rcv_shp_dt.value = curMonth+"-"+curdate+"-"+curYear;	
		formObj.rcv_shp_tm.value = curHour +":"+curMinute;
		
		if(formObj.rcv_shp_dt.value !="" && formObj.rcv_shp_tm.value !=""){
			var rcv_dt   = new Date(formObj.rcv_shp_dt.value);
			var rcv_tm   = formObj.rcv_shp_tm.value.replaceStr(":","");
			
			formObj.full_dlvr_dttm.value = rcv_dt.yyyymmdd() + rcv_tm;
		}else{
			formObj.full_dlvr_dttm.value = "";
		}
	}
}

// When Delivered Flag is changed, set the value
function flgChange(obj){
	if(obj.checked == true){
		obj.value="Y";
	}else{
		obj.value="N";
	}
}

// Date Convert Function
Date.prototype.yyyymmdd = function() {
    var yyyy =  this.getFullYear().toString();
    var mm   = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd   =  this.getDate().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
   };
   
function convertDate(inputFormat) {
	var year        = inputFormat.substring(0,4);
	var month       = inputFormat.substring(4,6);
	var day         = inputFormat.substring(6,8);		
	
	return [month, day, year].join('-');
}