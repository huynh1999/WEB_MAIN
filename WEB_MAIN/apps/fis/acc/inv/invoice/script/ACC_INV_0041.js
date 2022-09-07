var comboObjects = new Array();
var comboCnt = 0;

function loadPage() {
	var opt_key = "AR_GEN_EML_TITLE";
	ajaxSendPost(setEmlGenTitle, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key = "AR_ORG_EML_TITLE";
	ajaxSendPost(setEmlOrgTitle, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key = "AR_COPY_EML_TITLE";
	ajaxSendPost(setEmlCopyTitle, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key = "AR_FRT_EML_TITLE";
	ajaxSendPost(setEmlFrtTitle, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	// OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List
	var opt_key = "AR_ORG_COPY_EML_TITLE";
	ajaxSendPost(setEmlOrgCopyTitle, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
}

/**
 * Combo 기본 설정 param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */

function initControl() {
	
}

function doWork(srcName){
	switch (srcName) {
		case 'PRINT':
			btn_Print();
			break;
		case 'CLOSE':
			btn_Close();
			break;
	}
}

/*
 * Print
 */
function btn_Print() {

	var formObj = document.form;
	var rdParam = "";
	var arrParam = $('[name=rpt_param]').val().split('|');

	for(var i=0; i<arrParam.length -1; i++) {
		rdParam += '[' + arrParam[i] + ']';
	}
	//6301 [JAPT] Mail sending function related request
	if($('#rdoOption1').is(':checked')) {
		rdParam += '[Genernal]';					//17 Print Option A/R 인경우만...
		var emailGenTitle = createEmailTitle(optGenEmail, formObj.bkg_no.value
														, formObj.ves.value
														, formObj.voy.value
														, formObj.etd.value
														, formObj.hbl_no.value
														, formObj.inv_no.value);
		// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
		if (formObj.chkMailAr.value === 'Y') {
			if (formObj.hbl_no.value == '') {
				formObj.mailTitle.value = emailGenTitle;
			} else {
				formObj.mailTitle.value = emailGenTitle + ' [HBL No: ' + formObj.hbl_no.value + ']';
			}
		} else {
			formObj.mailTitle.value = emailGenTitle;
		}
	} else if($('#rdoOption2').is(':checked')) {
		rdParam += '[Original]';					//17 Print Option A/R 인경우만...
		var emailOrgTitle = createEmailTitle(optOrgEmail, formObj.bkg_no.value
														, formObj.ves.value
														, formObj.voy.value
														, formObj.etd.value
														, formObj.hbl_no.value
														, formObj.inv_no.value);
		// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
		if (formObj.chkMailAr.value === 'Y') {
			if (formObj.hbl_no.value == '') {
				formObj.mailTitle.value = emailOrgTitle;
			} else {
				formObj.mailTitle.value = emailOrgTitle + ' [HBL No: ' + formObj.hbl_no.value + ']';
			}
		} else {
			formObj.mailTitle.value = emailOrgTitle;
		}
	} else if($('#rdoOption3').is(':checked')) {
		rdParam += '[Copy]';						//17 Print Option A/R 인경우만...
		var emailCopyTitle = createEmailTitle(optCopyEmail, formObj.bkg_no.value
														  , formObj.ves.value
														  , formObj.voy.value
														  , formObj.etd.value
														  , formObj.hbl_no.value
														  , formObj.inv_no.value);
		// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
		if (formObj.chkMailAr.value === 'Y') {
			if (formObj.hbl_no.value == '') {
				formObj.mailTitle.value = emailCopyTitle;
			} else {
				formObj.mailTitle.value = emailCopyTitle + ' [HBL No: ' + formObj.hbl_no.value + ']';
			}
		} else {
			formObj.mailTitle.value = emailCopyTitle;
		}
	} else if($('#rdoOption4').is(':checked')) {
		rdParam += '[FreightMemo]';					//17 Print Option A/R 인경우만...
		var emailFrtTitle = createEmailTitle(optFrtEmail, formObj.bkg_no.value
														, formObj.ves.value
														, formObj.voy.value
														, formObj.etd.value
														, formObj.hbl_no.value
														, formObj.inv_no.value);
		// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
		if (formObj.chkMailAr.value === 'Y') {
			if (formObj.hbl_no.value == '') {
				formObj.mailTitle.value = emailFrtTitle;
			} else {
				formObj.mailTitle.value = emailFrtTitle + ' [HBL No: ' + formObj.hbl_no.value + ']';
			}
		} else {
			formObj.mailTitle.value = emailFrtTitle;
		}
	// OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List
	} else if($('#rdoOption5').is(':checked')) {
		rdParam += '[Original/Copy]';				//17 Print Option A/R 인경우만...
		var emailOrgAndCopyTitle = createEmailTitle(optOrgCopyEmail, formObj.bkg_no.value
														, formObj.ves.value
														, formObj.voy.value
														, formObj.etd.value
														, formObj.hbl_no.value
														, formObj.inv_no.value);
		// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
		if (formObj.chkMailAr.value === 'Y') {
			if (formObj.hbl_no.value == '') {
				formObj.mailTitle.value = emailOrgAndCopyTitle;
			} else {
				formObj.mailTitle.value = emailOrgAndCopyTitle + ' [HBL No: ' + formObj.hbl_no.value + ']';
			}
		} else {
			formObj.mailTitle.value = emailOrgAndCopyTitle;
		}
	}
	if(formObj.rpt_file_name_flg.value == "N"){
		formObj.attachFileName.value = ""; 
	}
	formObj.rd_param.value = rdParam;
	popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
}

/*
 * Close
 */
function btn_Close() {
	ComClosePopup(); 
}

//6301 [JAPT] Mail sending function related request
var optGenEmail;
function setEmlGenTitle(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != "undefined" && doc[1] != undefined && doc[1] != "") {
			optGenEmail=doc[1];
		}
	}
}

var optOrgEmail;
function setEmlOrgTitle(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != "undefined" && doc[1] != undefined && doc[1] != "") {
			optOrgEmail=doc[1];
		}
	}
}

var optCopyEmail;
function setEmlCopyTitle(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != "undefined" && doc[1] != undefined && doc[1] != "") {
			optCopyEmail=doc[1];
		}
	}
}

var optFrtEmail;
function setEmlFrtTitle(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != "undefined" && doc[1] != undefined && doc[1] != "") {
			optFrtEmail=doc[1];
		}
	}
}
//OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List
var optOrgCopyEmail;
function setEmlOrgCopyTitle(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != "undefined" && doc[1] != undefined && doc[1] != "") {
			optOrgCopyEmail=doc[1];
		}
	}
}