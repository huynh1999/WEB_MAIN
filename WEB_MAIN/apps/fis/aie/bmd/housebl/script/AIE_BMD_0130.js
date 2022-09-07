//=========================================================
//*@FileName   : AIE_BMD_0130.jsp
//*@FileTitle  : COMMERCIAL Invoice
//*@Description: COMMERCIAL Invoice
//*@author     : CLT
//*@version    : 1.0 - 2014/06/17
//*@since      : 2014/06/17
//
//*@Change history:
//=========================================================
var rtnary = new Array(1);
var callBackFunc = "";

/**
 * 화면로드 후 초기값 세팅
 */
function initFinish() {
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(document.frm1.obrd_strdt, document.frm1.obrd_enddt);
}
function doWork(srcName) {
	if (!btnGetVisible(srcName)) {
		return;
	}
	var formObj = document.frm1;
	try {
		switch (srcName) {
		case "SEARCHLIST":
			if (formObj.txt_hbl_no.value != formObj.hbl_no.value) {
				formObj.f_intg_bl_seq.value = "";
				formObj.intg_bl_seq.value = "";
			}
			if (formObj.txt_hbl_no.value != formObj.hbl_no.value) {
				formObj.f_intg_bl_seq.value = "";
				formObj.intg_bl_seq.value = "";
			}
			if (formObj.txt_hbl_no.value == "") {
				// alert("Please enter a Mandatory Value! (Red indicates
				// required field");
				alert(getLabel('FMS_COM_ALT014'));
				formObj.txt_hbl_no.focus();
				return;
			}
			formObj.f_cmd.value = SEARCHLIST;
			formObj.action = "./AIE_BMD_0130.clt";
			// formObj.submit();
			submitForm(SEARCHLIST);
			break;
		case "MODIFY":
			// Input value validation
			if (!chkInput()) {
				return;
			}
			if (formObj.txt_hbl_no.value == ""
					|| formObj.intg_bl_seq.value == "") {
				// Please Retrieve first!;
				alert(getLabel('FMS_COM_ALT029'));
				formObj.txt_hbl_no.focus();
				return;
			}
			if (formObj.txt_hbl_no.value != formObj.hbl_no.value) {
				alert(getLabel('FMS_COM_ALT029'));
				formObj.txt_hbl_no.focus();
				return;
			}
			if (confirm(getLabel('FMS_COM_CFMSAV'))) {
				formObj.f_cmd.value = MODIFY;
				formObj.print_yn.value = "N";
				formObj.save_yn.value = "Y";
				formObj.action = "./AIE_BMD_0130.clt";
				// formObj.submit();
				submitForm(MODIFY);
			}
			break;
		case "HBL_POPLIST":// openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "A";
			rtnary[1] = "O";
			callBackFunc = "HBL_POPLIST";
			modal_center_open('./CMM_POP_0170.clt', rtnary, 818, 468, "yes");
			/*
			 * if(formObj.txt_hbl_no.value !=""){ //ajax bl정보를 가져온다.
			 * ajaxSendPost(getBlInfo, 'reqVal',
			 * '&goWhere=aj&bcKey=getBlInfo&txt_hbl_no='+frm1.txt_hbl_no.value,
			 * './GateServlet.gsl'); }
			 */
			break;
		case "PRINT":
			if (formObj.txt_hbl_no.value == "") {
				// Please Retrieve first!;
				alert(getLabel('FMS_COM_ALT029'));
				formObj.txt_hbl_no.focus();
				return;
			}
			formObj.intg_bl_seq.value = trim(formObj.intg_bl_seq.value);
			if (formObj.intg_bl_seq.value == "") {
				// Please Retrieve first!;
				alert(getLabel('FMS_COM_ALT010'));
				formObj.txt_hbl_no.focus();
				return;
			}
			formObj.f_cmd.value = MODIFY;
			formObj.print_yn.value = "Y";
			formObj.save_yn.value = "N";
			formObj.action = "./AIE_BMD_0130.clt";
			// formObj.submit();
			submitForm(MODIFY);
			/*
			 * if(formObj.f_wrk_tp.value == ""){ if(formObj.txt_hbl_no.value ==
			 * ""){ alert("Select the HBL No. in advance! ");
			 * formObj.txt_hbl_no.focus(); return; } formObj.f_cmd.value=MODIFY;
			 * formObj.print_yn.value="Y"; formObj.action="./AIE_BMD_0130.clt";
			 * formObj.submit(); }else{
			 * formObj.file_name.value='commercial_invoice_01.mrd';
			 * formObj.title.value='COMMERCIAL INVOICE'; //Parameter Setting var
			 * param='[' + formObj.intg_bl_seq.value + ']'; // [1] param += '[' +
			 * formObj.f_wrk_tp.value +']'; // [2] formObj.rd_param.value=param;
			 * popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740); }
			 */
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

function submitForm(cmd) {
	var formObj = document.frm1;
	doShowProcess();

	$.ajax({
		type : "POST",
		url : "./AIE_BMD_0130AJ.clt",
		dataType : 'xml',
		data : $(formObj).serialize(),
		success : function(data) {
			setFieldValue(formObj.f_wrk_tp, $('wrk_tp', data).text());
			setFieldValue(formObj.print_yn, $('print_yn', data).text());
			setFieldValue(formObj.save_yn, $('save_yn', data).text());
			setFieldValue(formObj.txt_hbl_no, $('bl_no', data).text());
			setFieldValue(formObj.intg_bl_seq, $('intg_bl_seq', data).text());
			setFieldValue(formObj.hbl_no, $('bl_no', data).text());
			setFieldValue(formObj.f_seller, $('seller_addr', data).text());
			setFieldValue(formObj.f_consignee, $('cnee_addr', data).text());
			setFieldValue(formObj.f_notify, $('notify_addr', data).text());
			setFieldValue(formObj.f_inv_no, $('inv_no', data).text());
			setFieldValue(formObj.f_inv_dt, $('inv_dt', data).text());
			setFieldValue(formObj.f_lc_no, $('lc_no', data).text());
			setFieldValue(formObj.f_lc_dt, $('lc_dt', data).text());
			setFieldValue(formObj.f_lc_issue_bank, $('lc_issue_bank', data).text());
			setFieldValue(formObj.f_termpay, $('svc_term', data).text());
			setFieldValue(formObj.f_dept, $('pol_nm', data).text());
			setFieldValue(formObj.f_dept_dt, $('etd_dttm', data).text());
			setFieldValue(formObj.f_dest, $('pod_nm', data).text());
			setFieldValue(formObj.f_carr_trdp_cd, $('carr_trdp_cd', data).text());
			setFieldValue(formObj.f_carr_trdp_nm, $('carr_trdp_nm', data).text());
			setFieldValue(formObj.f_vslflt, $('vsl_flt', data).text());
			setFieldValue(formObj.f_mark_num, $('mk_txt', data).text());
			setFieldValue(formObj.f_qty, $('qty', data).text());
			setFieldValue(formObj.f_desc_good, $('desc_txt', data).text());
			setFieldValue(formObj.f_unit, $('price', data).text());
			setFieldValue(formObj.f_amt, $('amount', data).text());
			
			doBtnAuthority(attr_extension);
			loadPage();
			doHideProcess();
		},
		error : function() {
			doHideProcess();
			alert("System Error!");
		}
	});
}
function chkInput() {
	if (checkInputVal(frm1.f_seller.value, 0, 400, 'T', '') != 'O') {
		return false;
	} else if (checkInputVal(frm1.f_consignee.value, 0, 400, 'T', '') != 'O') {
		frm1.f_consignee.focus();
		return false;
	} else if (checkInputVal(frm1.f_notify.value, 0, 400, 'T', '') != 'O') {
		frm1.f_notify
		return false;
	} else if (checkInputVal(frm1.f_inv_no.value, 0, frm1.f_inv_no.maxLength,
			'T', '') != 'O') {
		frm1.f_inv_no
		return false;
	} else if (frm1.f_inv_dt.value != ''
			&& checkInputVal(frm1.f_inv_dt.value, 0, frm1.f_inv_dt.maxLength,
					'D', '') != 'O') {
		frm1.f_inv_dt.focus();
		return false;
	} else if (checkInputVal(frm1.f_lc_no.value, 0, frm1.f_lc_no.maxLength,
			'T', '') != 'O') {
		frm1.f_lc_no.focus();
		return false;
	} else if (frm1.f_lc_dt.value != ''
			&& checkInputVal(frm1.f_lc_dt.value, 0, frm1.f_lc_dt.maxLength,
					'T', '') != 'O') {
		frm1.f_lc_dt.focus();
		return false;
	} else if (checkInputVal(frm1.f_lc_issue_bank.value, 0,
			frm1.f_lc_issue_bank.maxLength, 'T', '') != 'O') {
		frm1.f_lc_issue_bank.focus();
		return false;
	} else if (checkInputVal(frm1.f_termpay.value, 0, frm1.f_termpay.maxLength,
			'T', '') != 'O') {
		frm1.f_termpay.focus();
		return false;
	} else if (checkInputVal(frm1.f_dept.value, 0, frm1.f_dept.maxLength, 'T',
			'') != 'O') {
		frm1.f_dept.focus();
		return false;
	} else if (frm1.f_dept_dt.value != ''
			&& checkInputVal(frm1.f_dept_dt.value, 0, frm1.f_dept_dt.maxLength,
					'T', '') != 'O') {
		frm1.f_dept_dt.focus();
		return false;
	} else if (checkInputVal(frm1.f_dest.value, 0, frm1.f_dest.maxLength, 'T',
			'') != 'O') {
		frm1.f_dest.focus();
		return false;
	} else if (checkInputVal(frm1.f_carr_trdp_cd.value, 0,
			frm1.f_carr_trdp_cd.maxLength, 'T', '') != 'O') {
		frm1.f_carr_trdp_cd.focus();
		return false;
	} else if (checkInputVal(frm1.f_carr_trdp_nm.value, 0,
			frm1.f_carr_trdp_nm.maxLength, 'T', '') != 'O') {
		frm1.f_carr_trdp_nm.focus();
		return false;
	} else if (checkInputVal(frm1.f_vslflt.value, 0, frm1.f_vslflt.maxLength,
			'T', '') != 'O') {
		frm1.f_vslflt.focus();
		return false;
	} else if (checkInputVal(frm1.f_mark_num.value, 0, 4000, 'T', '') != 'O') {
		frm1.f_mark_num.focus();
		return false;
	} else if (checkInputVal(frm1.f_qty.value, 0, 100, 'T', '') != 'O') {
		frm1.f_qty.focus();
		return false;
	} else if (checkInputVal(frm1.f_desc_good.value, 0, 4000, 'T', '') != 'O') {
		frm1.f_desc_good.focus();
		return false;
	} else if (checkInputVal(frm1.f_unit.value, 0, 1000, 'T', '') != 'O') {
		frm1.f_unit.focus();
		return false;
	} else if (checkInputVal(frm1.f_amt.value, 0, 1000, 'T', '') != 'O') {
		frm1.f_amt.focus();
		return false;
	}
	return true;
}
/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
function loadPage() {
	//#1171 [AEH Commercial Invoice] Don't auto suggest when enter Carrier name
	fnSetAutocompleteCallBack('f_carr_trdp_nm', 'LINER_POPLIST', 'LINER_POPLIST'); //Carrier	
	var formObj = document.frm1;
	var prnt_ofc_cd = formObj.prnt_ofc_cd.value;
	if (prnt_ofc_cd == "BNXC") {
		// document.getElementById("td_mark").style.width='1058';
		// document.getElementById("td_desc_good").style.width='500';
		document.getElementById("f_desc_good").style.width = '500';
		/*
		 * document.getElementById("f_desc_good").style.overflow='scroll';
		 * document.getElementById("f_unit").style.overflow='scroll';
		 * document.getElementById("f_amt").style.overflow='scroll';
		 */
		document.getElementById("f_desc_good").WRAP = 'hard';
		document.getElementById("f_unit").WRAP = 'hard';
		document.getElementById("f_amt").WRAP = 'hard';
	}
	if (prnt_ofc_cd != "") {
		prnt_ofc_cd = "_" + prnt_ofc_cd;
	}
	if (formObj.print_yn.value == "Y" && formObj.f_wrk_tp.value != "") {
		formObj.file_name.value = 'commercial_invoice_01.mrd';
		formObj.title.value = 'COMMERCIAL INVOICE';
		// Parameter Setting
		var param = '[' + "'" + formObj.intg_bl_seq.value + "'" + ']'; // [1]
		param += '[' + formObj.f_wrk_tp.value + ']'; // [2]
		formObj.rd_param.value = param;
		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	} else if (formObj.save_yn.value == "Y" && formObj.f_wrk_tp.value != "") {
		// Save success!
		// alert(getLabel('FMS_COM_NTYCOM'));
		/*
		 * Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save &
		 * Complete Alert message 변경
		 */
		showCompleteProcess();
	}
	if (formObj.intg_bl_seq.value == "" && formObj.txt_hbl_no.value != "") {
		alert(getLabel('FMS_COM_ALT010'));
	}
	if(frm1.txt_hbl_no.value!=''){
		curHblNo=frm1.txt_hbl_no.value;
	}
}
/**
 * 달력팝업을 호출한다.
 */
function doDisplay(doWhat, formObj) {
	switch (doWhat) {
	case 'DATE1': // 달력 조회 팝업 호출
		var cal = new ComCalendar();
		cal.select(formObj.f_inv_dt, 'MM-dd-yyyy');
		break;
	case 'DATE2': // 달력 조회 팝업 호출
		var cal = new ComCalendar();
		cal.select(formObj.f_lc_dt, 'MM-dd-yyyy');
		break;
	case 'DATE3': // 달력 조회 팝업 호출
		var cal = new ComCalendar();
		cal.select(formObj.f_dept_dt, 'MM-dd-yyyy');
		break;
	}
}
/**
 * AJAX RETURN BL_INFO를 가져온다.
 */
function getBlInfo(reqVal) {
	var formObj = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			// 조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');
			if (rtnArr[0] != "null") {
				frm1.txt_ship_nm.value = rtnArr[0];
				frm1.txt_input_03.value = rtnArr[0];
			}
			if (rtnArr[2] != "null") {
				frm1.txt_nty_nm.value = rtnArr[2];
			}
		}
	} else {
		// alert(getLabel('SEE_BMD_MSG43'));
	}
}
// 화면 클리어
function clearAll() {
	var formObj = document.frm1;
	var collTxt = document.getElementsByTagName("INPUT"); // document 상의 모든
															// INPUT 태그 요소들을
															// 컬렉션으로 구하고...
	var textarea = document.getElementsByTagName("TEXTAREA"); // document 상의
																// 모든 INPUT 태그
																// 요소들을 컬렉션으로
																// 구하고...
	for ( var i = 0; i < collTxt.length; i++) {
		if (collTxt[i].type == "text" || collTxt[i].type == "hidden"
				|| collTxt[i].type == "textarea") {
			collTxt[i].value = "";
		}
	}
	for ( var i = 0; i < textarea.length; i++) {
		textarea[i].value = "";
	}
}
function openPopUp(srcName, curObj, AirSea) {
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
	var formObj = document.frm1;
	try {
		switch (srcName) {
		case "LINER_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(2);
			rtnary[0] = "1";
			if(curObj.type == "button"){
	   			rtnary[1]= "";
	   		}else{
	   			rtnary[1]=formObj.f_carr_trdp_nm.value;		   			
	   		}			
			rtnary[2] = window;
			var airSeaTp = "";
			var curObjId = curObj.id;
			var cstmTpCd = '';
			// 선사
			if (curObjId == 'liner') {
				if (AirSea == 'A') {
					cstmTpCd = 'AC';
				} else {
					cstmTpCd = 'LN';
				}
			}
			callBackFunc = "LINER_POPLIST";
			modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary,
					1150, 650, "yes");

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
/**
 * code name select
 */
function codeNameAction(str, obj, tmp) {
	if (obj.value != "") {
		if (tmp == "onKeyDown") {
			if (event.keyCode == 13) {
				var s_code = obj.value;
				CODETYPE = str;
				var sub_str = str.substring(0, 8);
				if (sub_str == "location") {
					str = sub_str;
				} else if (sub_str == "Nodecode") {
					str = 'node';
				} else if (sub_str == "partner_") {
					str = 'trdpcode'
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal',
						'&goWhere=aj&bcKey=searchCodeName&codeType=' + str
								+ '&s_code=' + s_code, './GateServlet.gsl');
			}
		} else if (tmp == "onBlur") {
			var s_code = obj.value;
			CODETYPE = str;
			var sub_str = str.substring(0, 8);
			if (sub_str == "location") {
				str = sub_str;
			} else if (sub_str == "Nodecode") {
				str = 'node';
			} else if (sub_str == "partner_") {
				str = 'trdpcode'
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal',
					'&goWhere=aj&bcKey=searchCodeName&codeType=' + str
							+ '&s_code=' + s_code, './GateServlet.gsl');
		}
	}
	else if(obj.value == ""){
		var formObj=document.frm1;
		CODETYPE=str;		
		if(CODETYPE =="partner_liner"){
			formObj.f_carr_trdp_cd.value="";   
			formObj.f_carr_trdp_nm.value = "";
		}
	}
}
// 코드표시 Ajax
function dispCodeNameAjaxReq(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	var targetFr = 'mainFrame';
	var formObj = document.frm1;
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			// 조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');
			if (CODETYPE == "partner_liner") {
				formObj.f_carr_trdp_cd.value = masterVals[0];
				formObj.f_carr_trdp_nm.value = masterVals[3];
			}
		} else {
			if (CODETYPE == "partner_liner") {
				formObj.f_carr_trdp_cd.value = "";
				formObj.f_carr_trdp_nm.value = "";
			}
		}
	} else {
		// Error Errupt!
		alert(getLabel('FMS_COM_ERR001'));
	}
}

function HBL_POPLIST(rtnVal) {
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.intg_bl_seq.value = rtnValAry[3];// intg_bl_seq
		formObj.txt_hbl_no.value = rtnValAry[0];// house_bl_no
		doWork("SEARCHLIST");
	}
}

function LINER_POPLIST(rtnVal) {
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_carr_trdp_cd.value = rtnValAry[0];// trdp_cd
		formObj.f_carr_trdp_nm.value = rtnValAry[2];// full_nm
	}
}
