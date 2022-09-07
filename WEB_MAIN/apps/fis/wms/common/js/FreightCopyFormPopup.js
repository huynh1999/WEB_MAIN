/*=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : FreightCopyFormPopup.js
 *@FileTitle  : 
 *@author     : Trieu.Nguyen
 *@version    : 1.0
 *@since      : 2015/3/19
=========================================================*/

//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
var comboObjects = new Array();
var comboCnt = 0;
var opener = window.dialogArguments;
var firCalFlag = false;

/**
 * Sheet onLoad
 */
function loadPage() {
	for ( var i = 0; i < docObjects.length; i++) {
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i], i + 1);
		comEndConfigSheet(docObjects[i]);
	}
	// IBMultiCombo초기화
	for ( var c = 0; c < comboObjects.length; c++) {
		initCombo(comboObjects[c], c + 1);
	}
	initControl();
	if (form.f_doc_cls_cd.value == "W") {
		form.doc_cls_cd[0].checked = true;
	} else if (form.f_doc_cls_cd.value == "F") {
		form.doc_cls_cd[1].checked = true;
	} else if (form.f_doc_cls_cd.value == "S") {
		form.doc_cls_cd[2].checked = true;
	}
	 btn_Search();
}
/**
 * IBSheet Object
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++] = sheet_obj;
}
/**
 * initControl()
 */
function initControl() {
	var formObject = document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//	// OnChange 이벤트
//	axon_event.addListenerForm("change", "form_onChange", formObject);
//	// OnKeyUp 이벤트
//	// axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
//	// - 포커스 나갈때
//	axon_event.addListenerForm('beforedeactivate', 'form_deactivate',
//			formObject);
//	axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function obj_keydown() {
	var vKeyCode = event.keyCode;
	var formObj = document.form;
	var srcName = ComGetEvent("name");
	var srcValue = ComGetEvent("value");
	var backspace = 8;
	var t = document.activeElement;
	if (vKeyCode == 13) {
		switch (srcName) {
		case "wo_no":
			if (!isNull(formObj.wo_no)) {
				sheet1.RemoveAll();
				btn_Search();
			}
		case "so_no":
			if (!isNull(formObj.so_no)) {
				sheet1.RemoveAll();
				btn_Search();
			}
		case "fcr_no":
			if (!isNull(formObj.fcr_no)) {
				sheet1.RemoveAll();
				btn_Search();
			}
		case "hbl_no":
			if (!isNull(formObj.hbl_no)) {
				sheet1.RemoveAll();
				btn_Search();
			}
		case "mbl_no":
			if (!isNull(formObj.mbl_no)) {
				sheet1.RemoveAll();
				btn_Search();
			}
		default:
			form_onChange();
			break;
		}
	}
	if (event.keyCode == backspace) {
		if (t.tagName == "SELECT") {
			return false;
		}
		if (t.tagName == "INPUT"
				&& (t.getAttribute("readonly") == "readonly" || t
						.getAttribute("readonly") == true)) {
			return false;
		}
	}
	return true;
}
function form_onChange() {
	var formObj = document.form;
	var srcName = ComGetEvent("name");
	var srcValue = ComGetEvent("value");
	var parm = "";
	switch (srcName) {
	case "sprov_cd":
//		var resultXml = docObjects[0]
//				.GetSearchData("./searchTlCustInfo.clt?cust_cd="
//						+ formObj.sprov_cd.value + "&in_part_tp=S");
//		if (getXmlDataNullToNullString(resultXml, 'exception_msg') != "") {
//			alert(getXmlDataNullToNullString(resultXml, 'exception_msg'));
//		}
//		form.sprov_cd.value = getXmlDataNullToNullString(resultXml, 'cust_cd');
//		form.sprov_nm.value = getXmlDataNullToNullString(resultXml,
//				'cust_loc_nm');
		
		ajaxSendPost(getCustomerInfoForSprov, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='
				+ formObj.sprov_cd.value + "&in_part_tp=S", './GateServlet.gsl');
		break;
	case "wo_cust_cd":
//		var resultXml = docObjects[0]
//				.GetSearchData("searchTlCustInfo.clt?cust_cd="
//						+ formObj.wo_cust_cd.value + "&in_part_tp=S");
//		if (getXmlDataNullToNullString(resultXml, 'exception_msg') != "") {
//			alert(getXmlDataNullToNullString(resultXml, 'exception_msg'));
//		}
//		form.wo_cust_cd.value = getXmlDataNullToNullString(resultXml, 'cust_cd');
//		form.wo_cust_nm.value = getXmlDataNullToNullString(resultXml,
//				'cust_loc_nm');
		
		ajaxSendPost(getCustomerInfoForWo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='
				+ formObj.wo_cust_cd.value + "&in_part_tp=S", './GateServlet.gsl');
		
		break;
	}
}

function getCustomerInfoForWo(reqVal){
	 var doc = getAjaxMsgXML(reqVal);
	 var formObj = document.form;
	 if(doc[0]=='OK'){
		 if(typeof(doc[1])!='undefined'){
			 //조회해온 결과를 Parent에 표시함
			 var rtnArr = doc[1].split('^@');
			 if(rtnArr[0] != ""){
				 formObj.wo_cust_cd.value=rtnArr[0];
				 formObj.wo_cust_nm.value=rtnArr[10];
			 }
			 else{
				 formObj.wo_cust_cd.value="";
				 formObj.wo_cust_nm.value=""; 
			 }
		 }
		 else{
			 formObj.wo_cust_cd.value="";
			 formObj.wo_cust_nm.value=""; 
		 }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}

function getCustomerInfoForSprov(reqVal){
	 var doc = getAjaxMsgXML(reqVal);
	 var formObj = document.form;
	 if(doc[0]=='OK'){
		 if(typeof(doc[1])!='undefined'){
			 //조회해온 결과를 Parent에 표시함
			 var rtnArr = doc[1].split('^@');
			 if(rtnArr[0] != ""){
				 formObj.sprov_cd.value=rtnArr[0];
				 formObj.sprov_nm.value=rtnArr[10];
			 }
			 else{
				 formObj.sprov_cd.value="";
				 formObj.sprov_nm.value=""; 
			 }
		 }
		 else{
			 formObj.sprov_cd.value="";
			 formObj.sprov_nm.value=""; 
		 }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}

function getCustInfo(obj){
	 var formObj = document.form;
	 ajaxSendPost(resultCustomerInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+formObj.wo_cust_cd.value+ "&in_part_tp=S", './GateServlet.gsl');
}
function resultCustomerInfo(reqVal){
	 var doc = getAjaxMsgXML(reqVal);
	 var formObj = document.form;
	 if(doc[0]=='OK'){
		 if(typeof(doc[1])!='undefined'){
			 //조회해온 결과를 Parent에 표시함
			 var rtnArr = doc[1].split('^@');
			 if(rtnArr[0] != ""){
				 formObj.wo_cust_nm.value=rtnArr[0];
			 }
			 else{
				 formObj.wo_cust_cd.value="";
				 formObj.wo_cust_nm.value=""; 
			 }
		 }
		 else{
			 formObj.wo_cust_cd.value="";
			 formObj.wo_cust_nm.value=""; 
		 }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}

function getServiceInfo(obj){
	 var formObj = document.form;
	 ajaxSendPost(resultServiceInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+formObj.sprov_cd.value+ "&in_part_tp=S", './GateServlet.gsl');
}
function resultServiceInfo(reqVal){
	 var doc = getAjaxMsgXML(reqVal);
	 var formObj = document.form;
	 if(doc[0]=='OK'){
		 if(typeof(doc[1])!='undefined'){
			 //조회해온 결과를 Parent에 표시함
			 var rtnArr = doc[1].split('^@');
			 if(rtnArr[0] != ""){
				 formObj.sprov_nm.value = rtnArr[0];
			 }
			 else{
				 formObj.sprov_cd.value="";
				 formObj.sprov_nm.value=""; 
			 }
		 }
		 else{
			 formObj.sprov_nm.value="";
			 formObj.sprov_nm.value=""; 
		 }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}

function doWork(srcName, valObj){
	/** *** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 **** */
	var sheetObject1 = docObjects[0]; // t1sheet1
	/** **************************************************** */
	var formObj = document.form;
	try {
		var srcName = ComGetEvent("name");
		switch (srcName) {
		case "btn_wo_fr_dt":
			if (document.getElementById('btn_wo_fr_dt').disabled) {
				return;
			}
			var cal=new ComCalendarFromTo();
		    cal.displayType="date";
		    cal.select(formObj.wo_fr_dt, formObj.wo_to_dt, 'MM-dd-yyyy');
			break;
		case "btn_wo_to_dt":
			if (document.getElementById('btn_wo_to_dt').disabled) {
				return;
			}
			var cal=new ComCalendarFromTo();
		    cal.displayType="date";
		    cal.select(formObj.wo_fr_dt, formObj.wo_to_dt, 'MM-dd-yyyy');
			break;
		case "btn_pfm_fr_dt":
			if (document.getElementById('btn_pfm_fr_dt').disabled) {
				return;
			}
			var cal=new ComCalendarFromTo();
		    cal.displayType="date";
		    cal.select(formObj.pfm_fr_dt, formObj.pfm_to_dt, 'MM-dd-yyyy');
			break;
		case "btn_pfm_to_dt":
			if (document.getElementById('btn_pfm_to_dt').disabled) {
				return;
			}
			var cal=new ComCalendarFromTo();
		    cal.displayType="date";
		    cal.select(formObj.pfm_fr_dt, formObj.pfm_to_dt, 'MM-dd-yyyy');
			break;
		case "btn_etd_fr_dt":
			// var cal=new ComCalendar();
			// cal.select(formObj.etd_fr_dt, 'MM-dd-yyyy');
			// break;
			if (document.getElementById('btn_etd_fr_dt').disabled) {
				return;
			}
			var cal=new ComCalendarFromTo();
		    cal.displayType="date";
		    cal.select(formObj.etd_fr_dt, formObj.etd_to_dt, 'MM-dd-yyyy');
			break;
		case "btn_etd_to_dt":
			// var cal=new ComCalendar();
			// cal.select(formObj.etd_to_dt, 'MM-dd-yyyy');
			// break;
			if (document.getElementById('btn_etd_to_dt').disabled) {
				return;
			}
			var cal = new ComCalendarFromTo();
		    cal.displayType = "date";
		    cal.select(formObj.etd_fr_dt, formObj.etd_to_dt, 'MM-dd-yyyy');
			break;
		case "btn_eta_fr_dt":
			// var cal=new ComCalendar();
			// cal.select(formObj.eta_fr_dt, 'MM-dd-yyyy');
			// break;
			if (document.getElementById('btn_eta_fr_dt').disabled) {
				return;
			}
			var cal = new ComCalendarFromTo();
		    cal.displayType = "date";
		    cal.select(formObj.eta_fr_dt, formObj.eta_to_dt, 'MM-dd-yyyy');
			break;
		case "btn_eta_to_dt":
			// var cal=new ComCalendar();
			// cal.select(formObj.eta_to_dt, 'MM-dd-yyyy');
			// break;
			if (document.getElementById('btn_eta_to_dt').disabled) {
				return;
			}
			var cal = new ComCalendarFromTo();
		    cal.displayType = "date";
		    cal.select(formObj.eta_fr_dt, formObj.eta_to_dt, 'MM-dd-yyyy');
			break;
		case "btn_ctrt_no":
			var formObj = document.form;
			var sUrl="./ContractRoutePopup.clt?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;
			callBackFunc = "setCtrtNoInfo";
			modal_center_open(sUrl, callBackFunc, 900, 650,	"yes");
			break;
		case "btn_sprov_cd":
			var formObj = document.form;
			sUrl="./CMM_POP_0010.clt?cust_cd="+formObj.sprov_cd.value+"&cust_nm="+formObj.sprov_nm.value;
			callBackFunc = "setSprovInfo";
			modal_center_open(sUrl, callBackFunc, 1150, 650, "yes");
			break;
		case "btn_wo_cust_cd":
			var formObj = document.form;
			sUrl = "./CMM_POP_0010.clt?cust_cd="+formObj.wo_cust_cd.value+"&cust_nm="+formObj.wo_cust_nm.value;
			callBackFunc = "setWoCustInfo";
			modal_center_open(sUrl, callBackFunc, 1150, 650, "yes");
			break;
		} // end switch
	} catch (e) {
		if (e == "[object Error]") {
			// Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			// System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e);
		}
	}
}
function setSprovInfo(aryPopupData) {
	var formObj = document.form;
	if (aryPopupData == "" || aryPopupData == "undefined"
			|| aryPopupData == undefined) {
		return;
	} else {
		var rtnValAry = aryPopupData.split("|");
		formObj.sprov_cd.value = rtnValAry[0];
		formObj.sprov_nm.value = rtnValAry[2];
	}
}
function setWoCustInfo(aryPopupData) {
	var formObj = document.form;
	if (aryPopupData == "" || aryPopupData == "undefined"
			|| aryPopupData == undefined) {
		return;
	} else {
		var rtnValAry = aryPopupData.split("|");
		formObj.wo_cust_cd.value = rtnValAry[0];
		formObj.wo_cust_nm.value = rtnValAry[2];
	}
}
/**
 * Combo 기본 설정 param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */

function setCtrtNoInfo(aryPopupData){
		 var formObj=document.form;
		 if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
			 return;
		 }else{
			var rtnValAry=aryPopupData.split("|");
			formObj.ctrt_no.value=rtnValAry[0];
			formObj.ctrt_nm.value=rtnValAry[1];
	}
}
/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj, sheetNo) {
	var cnt = 0;
	switch (sheetNo) {
	case 1: // IBSheet1 init
		with (sheetObj) {

			var hdr1 = 'Work Order No|FCR No|Service Order No|Order Type|Contract No|Contract Name|Service Provider|Service Provider|Work Order Customer|Work Order Customer|Work Order Date|Performance Date|House BL No|Master BL No|ETD|ETA|';
			var hdr2 = 'Work Order No|FCR No|Service Order No|Order Type|Contract No|Contract Name|Code|Name|Code|Name|Work Order Date|Performance Date|House BL No|Master BL No|ETD|ETA|';
			// var headCount=ComCountHeadTitle(hdr1);
			// (headCount, 0, 0, true);
			var prefix = "Grd01";

			SetConfig({
				SearchMode : 2,
				MergeSheet : 5,
				Page : 20,
				DataRowMerge : 1
			});

			var info = {
				Sort : 1,
				ColMove : 1,
				HeaderCheck : 1,
				ColResize : 1
			};
		    var headers = [ { Text:getLabel('FreightCopyFormPopup_Sheet1_HDR1'), Align:"Center"},
		                      { Text:getLabel('FreightCopyFormPopup_Sheet1_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {
				Type : "Text",
				Hidden : 0,
				Width : 120,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "wo_no",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 0
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 120,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "fcr_no",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 120,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "so_no",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 120,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "wo_ord_tp_nm",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 80,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "ctrt_no",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 120,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "ctrt_nm",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 60,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "sprov_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 120,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "sprov_nm",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 60,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "wo_cust_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 120,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "wo_cust_nm",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Date",
				Hidden : 0,
				Width : 100,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "wo_dt",
				KeyField : 0,
				CalcLogic : "",
				Format : "mdY",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Date",
				Hidden : 0,
				Width : 100,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "est_cmpl_dt",
				KeyField : 0,
				CalcLogic : "",
				Format : "mdY",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 100,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "hbl_no",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 100,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "mbl_no",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 2,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Date",
				Hidden : 0,
				Width : 80,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "etd",
				KeyField : 0,
				CalcLogic : "",
				Format : "mdY",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Date",
				Hidden : 0,
				Width : 80,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "eta",
				KeyField : 0,
				CalcLogic : "",
				Format : "mdY",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 1,
				Width : 80,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "doc_cls_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1,
				EditLen : 12
			} ];

			InitColumns(cols);
			SetSheetHeight(170);
			SetEditable(0);

		}
		break;
	case 2: // IBSheet1 init
		with (sheetObj) {

			var hdr1 = '|Freight Office|Customer/Provider|Customer/Provider|Accrual|Freight|Freight|Currency|Unit|Rate|VAT(%)|Pass|frt_doc_no|sb_cls_cd|frt_seq|doc_cls_cd|org_yn';
			var hdr2 = '|Freight Office|Code|Name|Accrual|Code|Name|Currency|Unit|Rate|VAT(%)|Pass|frt_doc_no|sb_cls_cd|frt_seq|doc_cls_cd|org_yn';
			// var headCount=ComCountHeadTitle(hdr1);
			// (headCount, 0, 0, true);
			var prefix = "Grd02";

			SetConfig({
				SearchMode : 2,
				MergeSheet : 5,
				Page : 20,
				DataRowMerge : 1
			});

			var info = {
				Sort : 1,
				ColMove : 1,
				HeaderCheck : 1,
				ColResize : 1
			};
		    var headers = [ { Text:getLabel('FreightCopyFormPopup_Sheet2_HDR1'), Align:"Center"},
		                      { Text:getLabel('FreightCopyFormPopup_Sheet2_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {
				Type : "CheckBox",
				Hidden : 0,
				Width : 30,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "check",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 80,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "frt_br_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 0
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 70,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "cust_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 150,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "cust_nm",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Combo",
				Hidden : 0,
				Width : 60,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "accrual_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 55,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "frt_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 150,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "frt_nm",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 50,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "curr_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 50,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "unit_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Float",
				Hidden : 0,
				Width : 100,
				Align : "Right",
				ColMerge : 1,
				SaveName : prefix + "unit_price",
				KeyField : 0,
				CalcLogic : "",
				Format : "Float",
				PointCount : 3,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Combo",
				Hidden : 0,
				Width : 60,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "val_cls_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Combo",
				Hidden : 0,
				Width : 60,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "pass_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 1,
				Width : 100,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "frt_doc_no",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 1,
				Width : 100,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "sb_cls_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 1,
				Width : 100,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "frt_seq",
				KeyField : 0,
				CalcLogic : "",
				Format : "Float",
				PointCount : 3,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 1,
				Width : 100,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "doc_cls_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 1,
				Width : 100,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "org_yn",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			} ];

			InitColumns(cols);
			SetSheetHeight(200);
			SetEditable(1);
			SetColProperty(prefix + "accrual_cd", {
				ComboText : accrual_cdText,
				ComboCode : accrual_cdCode
			});
			SetColProperty(prefix + "pass_cd", {
				ComboText : pass_cdText,
				ComboCode : pass_cdCode
			});
			SetColProperty(prefix + "val_cls_cd", {
				ComboText : SELL_VAT_NM,
				ComboCode : SELL_VAT_CD
			});

		}
		break;
	case 3: // IBSheet1 init
		with (sheetObj) {

			var hdr1 = '|Freight Office|Customer/Provider|Customer/Provider|Accrual|Freight|Freight|Currency|Unit|Rate|VAT(%)|Pass|frt_doc_no|sb_cls_cd|frt_seq|doc_cls_cd|org_yn';
			var hdr2 = '|Freight Office|Code|Name|Accrual|Code|Name|Currency|Unit|Rate|VAT(%)|Pass|frt_doc_no|sb_cls_cd|frt_seq|doc_cls_cd|org_yn';
			// var headCount=ComCountHeadTitle(hdr1);
			// (headCount, 0, 0, true);
			var prefix = "Grd03";

			SetConfig({
				SearchMode : 2,
				MergeSheet : 5,
				Page : 20,
				DataRowMerge : 1
			});

			var info = {
				Sort : 1,
				ColMove : 1,
				HeaderCheck : 1,
				ColResize : 1
			};
		    var headers = [ { Text:getLabel('FreightCopyFormPopup_Sheet3_HDR1'), Align:"Center"},
		                      { Text:getLabel('FreightCopyFormPopup_Sheet3_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {
				Type : "CheckBox",
				Hidden : 0,
				Width : 30,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "check",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 1,
				InsertEdit : 1
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 80,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "frt_br_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 0
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 70,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "cust_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 150,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "cust_nm",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Combo",
				Hidden : 0,
				Width : 60,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "accrual_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 55,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "frt_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 150,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "frt_nm",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 50,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "curr_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 0,
				Width : 50,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "unit_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Float",
				Hidden : 0,
				Width : 100,
				Align : "Right",
				ColMerge : 1,
				SaveName : prefix + "unit_price",
				KeyField : 0,
				CalcLogic : "",
				Format : "Float",
				PointCount : 3,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Combo",
				Hidden : 0,
				Width : 60,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "val_cls_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Combo",
				Hidden : 0,
				Width : 60,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "pass_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 1,
				Width : 100,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "frt_doc_no",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 1,
				Width : 100,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "sb_cls_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 1,
				Width : 100,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "frt_seq",
				KeyField : 0,
				CalcLogic : "",
				Format : "Float",
				PointCount : 3,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 1,
				Width : 100,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "doc_cls_cd",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			}, {
				Type : "Text",
				Hidden : 1,
				Width : 100,
				Align : "Left",
				ColMerge : 1,
				SaveName : prefix + "org_yn",
				KeyField : 0,
				CalcLogic : "",
				Format : "",
				PointCount : 0,
				UpdateEdit : 0,
				InsertEdit : 0,
				EditLen : 12
			} ];

			InitColumns(cols);
			SetSheetHeight(200);
			SetEditable(1);
			SetColProperty(prefix + "accrual_cd", {
				ComboText : accrual_cdText,
				ComboCode : accrual_cdCode
			});
			SetColProperty(prefix + "pass_cd", {
				ComboText : pass_cdText,
				ComboCode : pass_cdCode
			});
			SetColProperty(prefix + "val_cls_cd", {
				ComboText : BUY_VAT_NM,
				ComboCode : BUY_VAT_CD
			});

		}
		break;
	}
}
function btn_Search() {
	var formObj = document.form;
	sheet1.RemoveAll();
	sheet2.RemoveAll();
	if (!ComIsEmpty(formObj.wo_fr_dt) && ComIsEmpty(formObj.wo_to_dt)) {
		formObj.wo_to_dt.value = ComGetNowInfo();
	}
	if (!ComIsEmpty(formObj.pfm_fr_dt) && ComIsEmpty(formObj.pfm_to_dt)) {
		formObj.pfm_to_dt.value = ComGetNowInfo();
	}
	if (!ComIsEmpty(formObj.etd_fr_dt) && ComIsEmpty(formObj.etd_to_dt)) {
		formObj.etd_to_dt.value = ComGetNowInfo();
	}
	if (!ComIsEmpty(formObj.eta_fr_dt) && ComIsEmpty(formObj.eta_to_dt)) {
		formObj.eta_to_dt.value = ComGetNowInfo();
	}
	if (ComIsEmpty(formObj.wo_fr_dt) && !ComIsEmpty(formObj.wo_to_dt)) {
		ComShowCodeMessage("COM0122", "Work Order Date!");
		formObj.wo_fr_dt.focus();
		return;
	}
	if (getDaysBetween(formObj.wo_fr_dt, formObj.wo_to_dt, 'MM-dd-yyyy') < 0) {
		ComShowCodeMessage("COM0122", "Work Order Date!");
		formObj.wo_fr_dt.focus();
		return;
	}
	if (ComIsEmpty(formObj.pfm_fr_dt) && !ComIsEmpty(formObj.pfm_to_dt)) {
		ComShowCodeMessage("COM0122", "Performance Date!");
		formObj.pfm_fr_dt.focus();
		return;
	}
	if (getDaysBetween(formObj.pfm_fr_dt, formObj.pfm_to_dt, 'MM-dd-yyyy') < 0) {
		ComShowCodeMessage("COM0122", "Performance Date!");
		formObj.pfm_fr_dt.focus();
		return;
	}
	if (ComIsEmpty(formObj.etd_fr_dt) && !ComIsEmpty(formObj.etd_to_dt)) {
		ComShowCodeMessage("COM0122", "ETD Date!");
		formObj.etd_fr_dt.focus();
		return;
	}
	if (getDaysBetween(formObj.etd_fr_dt, formObj.etd_to_dt, 'MM-dd-yyyy') < 0) {
		ComShowCodeMessage("COM0122", "ETD Date!");
		formObj.etd_fr_dt.focus();
		return;
	}
	if (ComIsEmpty(formObj.eta_fr_dt) && !ComIsEmpty(formObj.eta_to_dt)) {
		ComShowCodeMessage("COM0122", "ETA Date!");
		formObj.eta_fr_dt.focus();
		return;
	}
	if (getDaysBetween(formObj.eta_fr_dt, formObj.eta_to_dt, 'MM-dd-yyyy') < 0) {
		ComShowCodeMessage("COM0122", "ETA Date!");
		formObj.eta_fr_dt.focus();
		return;
	}
	doShowProcess(true);
	setTimeout(function(){
		if(formObj.doc_cls_cd.value == "W"){
			formObj.f_cmd.value = SEARCH;
			var sXml = docObjects[0].DoSearch("./searchFreightCopyFormWO.clt", FormQueryString(formObj,""));
			//docObjects[0].LoadSearchData(sXml,{Sync:1} );
		}
		else if(formObj.doc_cls_cd.value == "S"){
			formObj.f_cmd.value = SEARCH01;
			var sXml = docObjects[0].DoSearch("./searchFreightCopyFormSVO.clt", FormQueryString(formObj,""));
			//docObjects[1].LoadSearchData(sXml,{Sync:1} );
		}
		else if(formObj.doc_cls_cd.value == "F"){
			formObj.f_cmd.value = SEARCH02;
			var sXml = docObjects[0].DoSearch("./searchFreightCopyFormFCR.clt", FormQueryString(formObj,""));
			//docObjects[2].LoadSearchData(sXml,{Sync:1} );
		}
	},100);
	doHideProcess(false);
}
function btn_Close() {
	ComClosePopup();
}
function sheet1_OnDblClick(sheetObj, Row, Col) {
	var formObj = document.form;
	if (sheetObj.GetCellValue(Row, "Grd01doc_cls_cd") == "W") {
		formObj.f_doc_cls_cd.value = "W";
		formObj.f_fcr_doc_no.value = sheetObj.GetCellValue(Row, "Grd01wo_no");
	} else if (sheetObj.GetCellValue(Row, "Grd01doc_cls_cd") == "S") {
		formObj.f_doc_cls_cd.value = "S";
		formObj.f_fcr_doc_no.value = sheetObj.GetCellValue(Row, "Grd01so_no");
	} else if (sheetObj.GetCellValue(Row, "Grd01doc_cls_cd") == "F") {
		formObj.f_doc_cls_cd.value = "F";
		formObj.f_fcr_doc_no.value = sheetObj.GetCellValue(Row, "Grd01fcr_no");
	}
	for(var i=0; i<2; i++){
		if(i == 0){
			formObj.f_cmd.value = SEARCH03;
			var sXml=docObjects[1].GetSearchData("./searchFreightCopyFormDtlSellList.clt", FormQueryString(formObj, ""));
			docObjects[1].LoadSearchData(sXml, {Sync:1} );
			docObjects[1].CheckAll(0,1);
		}else if(i == 1){
			formObj.f_cmd.value = SEARCH04;
			var sXml=docObjects[1].GetSearchData("./searchFreightCopyFormDtlBuyList.clt", FormQueryString(formObj, ""));
			docObjects[2].LoadSearchData(sXml, {Sync:1} );
			docObjects[2].CheckAll(0,1);
		}
	}
}
function goTabSelect(isNumSep) {
	var tabObjs = document.getElementsByName('tabLayer');
	if (isNumSep == "01") {
		tabObjs[0].style.display = 'inline';
		tabObjs[1].style.display = 'none';

		// Container List 목록
	} else if (isNumSep == "02") {
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = "inline";
	}

	var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function() {
		if (count++ == index - 1) {
			$(this).addClass('nowTab');
		} else {
			$(this).removeClass('nowTab');
		}
	});
}
function getCtrtInfo(obj){
	var formObj=document.form;
	if(formObj.value != ""){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
	}
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
function btn_CopyForm() {
	var formObj = document.form;
	var opener = window.dialogArguments;
	if (!opener)
		opener = window.opener;
	if (!opener)
		opener = parent;
	var openerformObj = opener.document.form;
	var row = "";
	var openerprefix1 = "Grd04";
	var prefix1 = "Grd02";
	var openerprefix2 = "Grd05";
	var prefix2 = "Grd03";
	var sheetObj1 = docObjects[1];
	var sheetObj2 = docObjects[2];
	var openerSheetObj1 = opener.docObjects[1];
	var openerSheetObj2 = opener.docObjects[2];
	for ( var i = sheetObj1.HeaderRows(); i <= sheetObj1.LastRow(); i++) {
		if (sheetObj1.GetCellValue(i, prefix1 + "check") == '1') {
			row = openerSheetObj1.DataInsert(-1);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "frt_br_cd",
					sheetObj1.GetCellValue(i, prefix1 + "frt_br_cd"), 0);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "cust_cd",
					sheetObj1.GetCellValue(i, prefix1 + "cust_cd"), 0);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "cust_nm",
					sheetObj1.GetCellValue(i, prefix1 + "cust_nm"), 0);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "accrual_cd",
					sheetObj1.GetCellValue(i, prefix1 + "accrual_cd"), 0);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "frt_cd",
					sheetObj1.GetCellValue(i, prefix1 + "frt_cd"), 0);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "frt_nm",
					sheetObj1.GetCellValue(i, prefix1 + "frt_nm"), 0);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "curr_cd",
					sheetObj1.GetCellValue(i, prefix1 + "curr_cd"), 0);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "exrate",
					sheetObj1.GetCellValue(i, prefix1 + "exrate"), 0);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "unit_cd",
					sheetObj1.GetCellValue(i, prefix1 + "unit_cd"), 0);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "unit_price",
					sheetObj1.GetCellValue(i, prefix1 + "unit_price"), 0);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "val_cls_cd",
					sheetObj1.GetCellValue(i, prefix1 + "val_cls_cd"), 0);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "pass_cd",
					sheetObj1.GetCellValue(i, prefix1 + "pass_cd"), 0);
			openerSheetObj1.SetCellValue(row, openerprefix1 + "cust_org_yn",
					sheetObj1.GetCellValue(i, prefix1 + "org_yn"), 0);
			openerSheetObj1.SetCellValue(row,
					openerprefix1 + "internal_sts_cd", "", 0);
			if (openerSheetObj1.GetCellValue(row, openerprefix1 + "curr_cd") == openerformObj.sell_loc_curr_cd.value) {
				openerSheetObj1.SetCellValue(row, openerprefix1 + "exrate", 1,
						0);
			} else if (openerSheetObj1.GetCellValue(row, openerprefix1
					+ "curr_cd") == openerformObj.sell_curr_cd.value) {
				openerSheetObj1.SetCellValue(row, openerprefix1 + "exrate",
						openerformObj.sell_exrate.value, 0);
			}
			opener.setUnit(row, 'S');
			if (openerformObj.ctry_cd.value == 'IN') {
				openerSheetObj1.SetCellEditable(row, openerprefix1
						+ "val_cls_cd", 0);
			}
		}
	}
	for ( var i = sheetObj2.HeaderRows(); i <= sheetObj2.LastRow(); i++) {
		if (sheetObj2.GetCellValue(i, prefix2 + "check") == '1') {
			row = openerSheetObj2.DataInsert(-1);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "frt_br_cd",
					sheetObj2.GetCellValue(i, prefix2 + "frt_br_cd"), 0);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "cust_cd",
					sheetObj2.GetCellValue(i, prefix2 + "cust_cd"), 0);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "cust_nm",
					sheetObj2.GetCellValue(i, prefix2 + "cust_nm"), 0);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "accrual_cd",
					sheetObj2.GetCellValue(i, prefix2 + "accrual_cd"), 0);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "frt_cd",
					sheetObj2.GetCellValue(i, prefix2 + "frt_cd"), 0);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "frt_nm",
					sheetObj2.GetCellValue(i, prefix2 + "frt_nm"), 0);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "curr_cd",
					sheetObj2.GetCellValue(i, prefix2 + "curr_cd"), 0);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "exrate",
					sheetObj2.GetCellValue(i, prefix2 + "exrate"), 0);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "unit_cd",
					sheetObj2.GetCellValue(i, prefix2 + "unit_cd"), 0);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "unit_price",
					sheetObj2.GetCellValue(i, prefix2 + "unit_price"), 0);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "val_cls_cd",
					sheetObj2.GetCellValue(i, prefix2 + "val_cls_cd"), 0);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "pass_cd",
					sheetObj2.GetCellValue(i, prefix2 + "pass_cd"), 0);
			openerSheetObj2.SetCellValue(row, openerprefix2 + "cust_org_yn",
					sheetObj2.GetCellValue(i, prefix2 + "org_yn"), 0);
			openerSheetObj2.SetCellValue(row,
					openerprefix2 + "internal_sts_cd", "", 0);
			if (openerSheetObj2.GetCellValue(row, openerprefix2 + "curr_cd") == openerformObj.buy_loc_curr_cd.value) {
				openerSheetObj2.SetCellValue(row, openerprefix2 + "exrate", 1,
						0);
			} else if (openerSheetObj2.GetCellValue(row, openerprefix2
					+ "curr_cd") == openerformObj.buy_curr_cd.value) {
				openerSheetObj2.SetCellValue(row, openerprefix2 + "exrate",
						openerformObj.buy_exrate.value, 0);
			}
			opener.setUnit(row, 'B');
		}
	}
	// comPopupOK();
	ComClosePopup();
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {
	var rowcnt = sheetObj.RowCount();
	for ( var i = 1; i <= rowcnt + 1; i++) {
		sheetObj.SetCellFontColor(i, 0, "#0000FF");
		// sheetObj.CellFont("FontBold", i, 0) = true;
		sheetObj.SetCellFontColor(i, 1, "#0000FF");
		// sheetObj.CellFont("FontBold", i, 1) = true;
		sheetObj.SetCellFontColor(i, 2, "#0000FF");
		// sheetObj.CellFont("FontBold", i, 2) = true;
	}
	doHideProcess(false);
}
