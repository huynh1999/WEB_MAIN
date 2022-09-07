//<%--=========================================================
//*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
//*@FileName   : BOMList.js
//*@FileTitle  : BOM Search
//*@author     : Bao.Huynh - DOU Network
//*@version    : 1.0
//*@since      : 2015/04/15
//=========================================================--%>
var sheetCnt = 0;
var comboObjects = new Array();
var docObjects = new Array();
var comboCnt = 0;
var fix_grid01 = "Grd01";
var selectCnt = 0;
var loading_flag = "N";
var firCalFlag = false;
/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++] = sheet_obj;
}
/*
 * Combo Object를 배열로 등록
 */
function setComboObject(combo_obj) {
	comboObjects[comboCnt++] = combo_obj;
}
/*
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여 cache옵션 false셋팅
 */
$(document).ready(function() {
	$.ajaxSetup({
		cache : false
	});
});
/*
 * load page
 */
function loadPage() {
	var formObj = document.form;
	// sheet
	for ( var i = 0; i < docObjects.length; i++) {
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i], i + 1);
		comEndConfigSheet(docObjects[i]);
	}
	// IBMultiCombo초기화
	for ( var c = 0; c < comboObjects.length; c++) {
		initCombo(comboObjects[c]);
	}
	loadComboWarehouse();
	// control
	initControl();
	$("#fm_kit_dt").val(ComGetDateAdd(null, "d", -31, "-"));
	$("#to_kit_dt").val(ComGetNowInfo());
	$("#wh_combo").val($("#def_wh_cd").val());
	$("#wh_nm").val($("#def_wh_nm").val());
	$("#ctrt_no").val($("#def_wh_ctrt_no").val());
	$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}
/*
 * init control
 */
function initControl() {
	var formObject = document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
	// axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	// - 포커스 나갈때
	// axon_event.addListenerForm('beforedeactivate', 'form_deactivate',
	// formObject);
	// - key down
	// axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/*
 * init sheet
 */
function initSheet(sheetObj, sheetNo) {
	var cnt = 0;
	switch (sheetObj.id) {
	case "sheet1":
		with (sheetObj) {
			var prefix = fix_grid01;
			SetConfig({SearchMode : 2, MergeSheet : 5, Page : 10000, DataRowMerge : 1});
			var info = {Sort : 1, ColMove : 1, HeaderCheck : 1, ColResize : 1};
			var headers = [ { Text:getLabel('BOMList_HDR1'), Align:"Center"},
		                    { Text:getLabel('BOMList_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);
			var cols = [ {Type : "Text", 	Hidden : 0,     Width : 150,    Align : "Center",   ColMerge : 1, SaveName : prefix + "kit_no", 			KeyField : 0, Format : "", 				PointCount : 0, UpdateEdit : 0, InsertEdit : 0}, 
						 {Type : "Text", 	Hidden : 0, 	Width : 100,	Align : "Center",	ColMerge : 1,SaveName : prefix + "item_cd",				KeyField : 0,Format : "",				PointCount : 0,UpdateEdit : 0,InsertEdit : 0}, 
						 {Type : "Date",	Hidden : 0,		Width : 80,		Align : "Center",	ColMerge : 1,SaveName : prefix + "kit_dt",				KeyField : 0,Format : "Ymd",			PointCount : 0,UpdateEdit : 0,InsertEdit : 0}, 
						 {Type : "Text",	Hidden : 0,		Width : 130,	Align : "Center",	ColMerge : 1,SaveName : prefix + "lot_no",				KeyField : 0,Format : "",				PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Text",	Hidden : 0,		Width : 80,		Align : "Center",	ColMerge : 1,SaveName : prefix + "putaway_wh_loc_nm",	KeyField : 0,Format : "",				PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Float",	Hidden : 0,		Width : 70,		Align : "Right",	ColMerge : 1,SaveName : prefix + "stock_qty",			KeyField : 0,Format : "Integer",		PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Float",	Hidden : 0,		Width : 80,		Align : "Right",	ColMerge : 1,SaveName : prefix + "item_cbm",			KeyField : 0,Format : "Float",			PointCount : 3,UpdateEdit : 0,InsertEdit : 0}, 
						 {Type : "Float",	Hidden : 0,		Width : 80,		Align : "Right",	ColMerge : 1,SaveName : prefix + "item_cbf",			KeyField : 0,Format : "Float",			PointCount : 3,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Float",	Hidden : 0,		Width : 80,		Align : "Right",	ColMerge : 1,SaveName : prefix + "item_grs_kgs",		KeyField : 0,Format : "Float",			PointCount : 3,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Float",	Hidden : 0,		Width : 80,		Align : "Right",	ColMerge : 1,SaveName : prefix + "item_grs_lbs",		KeyField : 0,Format : "Float",			PointCount : 3,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Float",	Hidden : 0,		Width : 80,		Align : "Right",	ColMerge : 1,SaveName : prefix + "item_net_kgs",		KeyField : 0,Format : "Float",			PointCount : 3,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Float",	Hidden : 0,		Width : 80,		Align : "Right",	ColMerge : 1,SaveName : prefix + "item_net_lbs",		KeyField : 0,Format : "Float",			PointCount : 3,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Date",	Hidden : 0,		Width : 80,		Align : "Center",	ColMerge : 1,SaveName : prefix + "exp_dt",				KeyField : 0,Format : "Ymd",			PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Text",	Hidden : 0,		Width : 80,		Align : "Left",		ColMerge : 1,SaveName : prefix + "lot_04",				KeyField : 0,Format : "",				PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Text",	Hidden : 0,		Width : 80,		Align : "Left",		ColMerge : 1,SaveName : prefix + "lot_05",				KeyField : 0,Format : "",				PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Text",	Hidden : 0,		Width : 120,	Align : "Center",	ColMerge : 1,SaveName : prefix + "lot_id",				KeyField : 0,Format : "",				PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Text",	Hidden : 0,		Width : 80,		Align : "Center",	ColMerge : 1,SaveName : prefix + "sub_item_cd",			KeyField : 0,Format : "",				PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Float",	Hidden : 0,		Width : 65,		Align : "Right",	ColMerge : 1,SaveName : prefix + "sub_item_unit_ea_qty",KeyField : 0,Format : "Integer",		PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Float",	Hidden : 0,		Width : 50,		Align : "Right",	ColMerge : 1,SaveName : prefix + "sub_tot_qty",			KeyField : 0,							PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Date",	Hidden : 0,		Width : 80,		Align : "Center",	ColMerge : 1,SaveName : prefix + "sub_inbound_dt",		KeyField : 0,Format : "Ymd",			PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Text",	Hidden : 0,		Width : 100,	Align : "Center",	ColMerge : 1,SaveName : prefix + "sub_lot_no",			KeyField : 0,Format : "",				PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Text",	Hidden : 0,		Width : 100,	Align : "Center",	ColMerge : 1,SaveName : prefix + "sub_wh_loc_nm",		KeyField : 0,Format : "",				PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Float",	Hidden : 0,		Width : 50,		Align : "Right",	ColMerge : 1,SaveName : prefix + "sub_item_ea_qty",		KeyField : 0,Format : "Integer",		PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Text",	Hidden : 0,		Width : 80,		Align : "Center",	ColMerge : 1,SaveName : prefix + "ctrt_no",				KeyField : 0,Format : "",				PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Text",	Hidden : 0,		Width : 120,	Align : "Left",		ColMerge : 1,SaveName : prefix + "ctrt_nm",				KeyField : 0,Format : "",				PointCount : 0,UpdateEdit : 0,InsertEdit : 0},
						 {Type : "Text",	Hidden : 0,		Width : 70,		Align : "Center",	ColMerge : 1,SaveName : prefix + "wh_cd",				KeyField : 0,Format : "",				PointCount : 0,UpdateEdit : 0,InsertEdit : 0} ];

			InitColumns(cols);
			SetSheetHeight(450);
			SetHeaderRowHeight(30);
			SetAutoRowHeight(0);
			resizeSheet();
			SetEditable(0);
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
function sheet1_OnSelectMenu(sheetObj, MenuString){
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
function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}
/**
 * Combo 기본 설정 param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initCombo(comboObj) {
	var vTextSplit = null;
	var vCodeSplit = null;
	switch (comboObj.options.id) {
	case "inv_tp":
		var txt = "ALL|Y|N";
		var val = "ALL|Y|N";
		vTextSplit = txt.split("|");
		vCodeSplit = val.split("|");
		with (comboObj) {
			comboObj.SetDropHeight(125);
			for ( var j = 0; j < vCodeSplit.length; j++) {
				InsertItem(j, vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.SetSelectCode("ALL");
		}
		break;
	}
}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd() {
	var sheetObj = sheet1;
	// sheet row 설정
	for ( var i = sheetObj.HeaderRows(); i <= sheetObj.LastRow(); i++) {
		// Kitting No 폰트색상 변경
		sheetObj.SetCellFontColor(i, fix_grid01 + "kit_no", "#0100FF");
		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "kit_no", 1);
	}
	doHideProcess(false);
}
function sheet1_OnClick(sheetObj, Row, Col) {
}
/*
 * sheet1 dbclick event
 */
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colName = sheetObj.ColSaveName(Col);
	switch (colName) {
	case fix_grid01 + "kit_no":
		var sUrl = "./BOMMgmt.clt?kit_no="
				+ sheetObj.GetCellValue(Row, fix_grid01 + "kit_no")
				+ "&search_div=kit";
		parent.mkNewFrame('BOM (Bill of Material)', sUrl,"BOMMgmt_"+ sheetObj.GetCellValue(Row, fix_grid01 + "kit_no")+ "_search_div");
		
		break;
	case fix_grid01 + "ctrt_no":
		var sUrl = "./CtrtMgmt.clt?ctrt_no="
				+ sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no");
		parent.mkNewFrame('Contract Management', sUrl,"CtrtMgmt_"+ sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no"));
		break;
	}
}
/*
 * 파일다운로드
 */
function fileDownload(sheetObj, Row, Col) {
	var formObj1 = document.form1;
	ComSetObjValue(formObj1.downloadLocation, sheetObj.GetCellValue(Row,
			fix_grid01 + "file_path")
			+ sheetObj.GetCellValue(Row, fix_grid01 + "file_sys_nm"));
	ComSetObjValue(formObj1.downloadFileName, sheetObj.GetCellValue(Row,
			fix_grid01 + "file_org_nm"));
	formObj1.target = "downiframe";
	formObj1.submit();
}
// 버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick = processButtonClick;
// 버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName) {
	/** *** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 **** */
	/** **************************************************** */
	var formObj = document.form;
	try {
//		var srcName = ComGetEvent("name");
		switch (srcName) {
		case "btn_fm_kit_dt":
			var cal = new ComCalendarFromTo();
		    cal.displayType = "date";
		    cal.select(formObj.fm_kit_dt, formObj.to_kit_dt, 'MM-dd-yyyy');
			break;
		case "btn_to_kit_dt":
			var cal = new ComCalendarFromTo();
		    cal.displayType = "date";
		    cal.select(formObj.fm_kit_dt, formObj.to_kit_dt, 'MM-dd-yyyy');
			break;
		case "btn_ctrt_no":
			var sUrl = "./ContractRoutePopup.clt?ctrt_nm="
					+ $("#ctrt_nm").val() + "&ctrt_no=" + $("#ctrt_no").val();
			callBackFunc = "setCtrtNoInfo";
			modal_center_open(sUrl, callBackFunc, 900, 580, "yes");
			break;
		case "btn_wh_loc_cd":
			if (ComIsEmpty(formObj.wh_combo.value)) {
				ComShowCodeMessage("COM0114", "Warehouse");
				formObj.wh_combo.focus();
				return;
			}
			var sUrl = "./WarehouseLocPopup.clt?f_loc_cd=" + formObj.wh_combo.value + "&f_wh_loc_nm=" + formObj.wh_loc_nm.value
					+ "&f_move_flg=Y";
			callBackFunc = "setLocInfo";
			modal_center_open(sUrl, callBackFunc, 700, 500, "yes");
			break;
		case "SEARCHLIST":
			btn_Search();
			break;
		case "EXCEL":
			btn_Excel_Dl();
			break;
		} // end switch
	} catch (e) {
		if (e == "[object Error]") {
			// ComShowMessage(OBJECT_ERROR);
		} else {
			// ComShowMessage(e);
		}
	}
}

/*
 * NAME 엔터시 팝업호출 - contract name
 */
// Function not use
function CtrtPopup() {
	var formObj = document.form;
	var sUrl = "./ContractRoutePopup.clt?ctrt_nm=" + formObj.ctrt_nm.value;
	callBackFunc = "setCtrtNoInfo";
	modal_center_open(sUrl, callBackFunc, 900, 580, "yes");
}
/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(aryPopupData) {
	var formObj = document.form;
	if (aryPopupData == "" || aryPopupData == "undefined"
			|| aryPopupData == undefined) {
		return;
	} else {
		var rtnValAry = aryPopupData.split("|");
		formObj.ctrt_no.value = rtnValAry[0];
		formObj.ctrt_nm.value = rtnValAry[1];
	}
}

// Function not use
function setItem(aryPopupData) {
	var formObj = document.form;
	ComSetObjValue(formObj.item_cd, aryPopupData[0][1]);
	ComSetObjValue(formObj.item_nm, aryPopupData[0][2]);
}
/*
 * location(검색조건) 입력 후 조회(ajax) callback
 */
function setLocInfo(aryPopupData) {
	if (aryPopupData == "" || aryPopupData == "undefined"
			|| aryPopupData == undefined) {
		return;
	} else {
		var rtnValAry = aryPopupData.split("|");
		$("#wh_loc_cd").val(rtnValAry[0]);// wh_loc_cd
		$("#wh_loc_nm").val(rtnValAry[1]);// wh_loc_nm
		$("#wh_loc_nm_org").val(rtnValAry[1]);// wh_loc_nm
	}
}
/*
 * 팝업 관련 로직 끝
 */
/*
 * 조회
 */
function btn_Search() {
	var formObj = document.form;
	var sheetObj = docObjects[0];
	// validation check
	if (validateForm(formObj, 'search') == false) {
		return;
	}
	doShowProcess(true);
	setTimeout(function(){
		if (validateForm(docObjects[0], formObj, 'Search')) {
			formObj.f_cmd.value = SEARCH;
			sheetObj.RemoveAll();
			var sXml = sheetObj.GetSearchData("./searchBOMListGS.clt", FormQueryString(formObj,""));
			sheetObj.LoadSearchData(sXml, {Sync:1} );
		}
	},100);
}

/*
 * 엑셀다운로드
 */
function btn_Excel_Dl() {
	if (docObjects[0].RowCount() < 1) {// no data
		ComShowCodeMessage("COM132501");
	} else {
		//docObjects[0].Down2Excel();
		docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(	docObjects[0]), SheetDesign:1,Merge:1 });
	}
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			// warehouse 필수로 입력되어야함.
			if (ComIsEmpty(formObj.wh_combo)) {
				ComShowCodeMessage("COM0114", "Warehouse");
				$("#wh_combo").focus();
				return false;
			}
			// contract no 필수로 입력되어야함.
			if (ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0114", "Contract No");
				$("#ctrt_no").focus();
				return false;
			}
			// 날짜
			if (ComIsEmpty(formObj.kit_no) && ComIsEmpty(formObj.fm_kit_dt)
					&& ComIsEmpty(formObj.to_kit_dt)) {
				ComShowCodeMessage("COM0114", "Kitting Date");
				$("#fm_kit_dt").focus();
				return false;
			}
			if (!ComIsEmpty(formObj.fm_kit_dt) && ComIsEmpty(formObj.to_kit_dt)) {
				formObj.to_kit_dt.value = ComGetNowInfo();
			}
			/*
			 * 3개월 duration 주석 if (!ComIsEmpty(formObj.fm_kit_dt) &&
			 * getDaysBetween2(formObj.fm_kit_dt.value,
			 * formObj.to_kit_dt.value)> 92) {
			 * ComShowCodeMessage("COM0141","3","(Kitting Date)");
			 * formObj.fm_kit_dt.focus(); return false; }
			 */
			if (!ComIsEmpty(formObj.fm_kit_dt) && !isDate(formObj.fm_kit_dt)) {
				ComShowCodeMessage("COM0114", "Kitting Date");
				formObj.fm_kit_dt.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.to_kit_dt) && !isDate(formObj.to_kit_dt)) {
				ComShowCodeMessage("COM0114", "Kitting Date");
				formObj.to_kit_dt.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.fm_kit_dt) && ComIsEmpty(formObj.to_kit_dt))
					|| (ComIsEmpty(formObj.fm_kit_dt) && !ComIsEmpty(formObj.to_kit_dt))) {
				ComShowCodeMessage("COM0122", "Kitting Date");
				formObj.fm_kit_dt.focus();
				return false;
			}
			if (getDaysBetween(formObj.fm_kit_dt, formObj.to_kit_dt, 'MM-dd-yyyy') < 0) {
				ComShowCodeMessage("COM0122", "Kitting Date");
				formObj.fm_kit_dt.focus();
				return false;
			}
			break;
		}
	}
	return true;
}
/**
 * 마우스 아웃일때
 */
function form_deactivate() {
	var formObj = document.form;
	var srcName = ComGetEvent("name");
	var srcValue = window.event.srcElement.getAttribute("value");
}
function obj_keydown() {
	var vKeyCode = event.keyCode;
	var srcName = ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
		case "kit_no":
			btn_Search();
			break;
		case "kit_item_cd":
			btn_Search();
			break;
		case "kit_lot_no":
			btn_Search();
			break;
		}
	}
	var backspace = 8;
	var t = document.activeElement;
	if (event.keyCode == backspace) {
		if (t.tagName == "SELECT") {
			return false;
		}
		if (t.tagName == "INPUT" && t.getAttribute("readonly") == true) {
			return false;
		}
	}
	return true;
}
/*******************************************************************************
 * AJAX CODE SEARCH
 */
/*
 * Warehouse search OnKeyDown 13 or onChange
 */
function getLocInfo(obj){
	if(obj.value != ""){
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
	}
}
function resultLocInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.wh_nm.value=rtnArr[0];
			}
			else{
				formObj.wh_combo.value="";
				formObj.wh_nm.value=""; 
			}
		}
		else{
			formObj.wh_combo.value="";
			formObj.wh_nm.value=""; 
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
/*
 * Contract search OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj){
	var formObj = document.form;
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
}
function resultCtrtInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
	    	if(rtnArr[0] != ""){
	    		formObj.ctrt_nm.value=rtnArr[0];
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
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
/*
 * Location search onChange
 */
function getLocationInfo(div) {
	if ($("#wh_loc_nm").val() == "") {
		$("#wh_loc_cd").val("");
		$("#wh_loc_nm_org").val("");
		if (div == "e") {
			btn_Search();
		}
		return;
	}
	var formObj = document.form;
	if (ComIsEmpty(formObj.wh_combo.value)) {
		ComShowCodeMessage("COM0114", "Warehouse");
		$("#wh_loc_nm").val("");
		formObj.wh_combo.focus();
		return;
	}
	var sParam = "f_loc_cd=" + formObj.wh_combo.value + "&f_wh_loc_nm="
			+ $("#wh_loc_nm").val() + "&f_move_flg=Y";
	
	//ajaxSendPost(resultLocationInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName?'+sParam, './GateServlet.gsl');
	  ajaxSendPost(resultLocationInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
}

function resultLocationInfo(reqVal, div) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
	    var rtnArr=doc[1].split('^@');
	    	if(rtnArr[0] != ""){
	    		$("#wh_loc_nm").val(rtnArr[1]);
	    		$("#wh_loc_nm_org").val(rtnArr[1]);
	    		$("#wh_loc_cd").val(rtnArr[0]);
	    		if(div == "e")
	    		{
	    			btn_Search();
	    		}
	    	}
	    	else{
	    		$("#wh_loc_nm").val("");
	    		$("#wh_loc_nm_org").val("");
	    		$("#wh_loc_cd").val("");
	    		$("#wh_loc_nm").focus();
	    	}
		}
		else{
		}
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}

function loadComboWarehouse(){
	var obj = document.getElementById("wh_combo");
	var option =  document.createElement("option");
	
	option.text = "";
	option.value = "";
	obj.add(option);
	
	var wh_combo_cd = wh_comboCode.split('|');
	var wh_combo_nm = wh_comboText.split('|');
	
	for(var i = 0; i < wh_combo_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(wh_combo_nm[i]);
		option.value = htmlDecode(wh_combo_cd[i]);
		obj.add(option);
	}
}
