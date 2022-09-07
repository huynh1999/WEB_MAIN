// 공통전역변수
var docObjects=new Array();
var sheetCnt=0;
var rdObjects=new Array();
var rdCnt=0;
//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
//팝업창에서 리턴한 결과값과 outlook호출 메소드와의 동기화를 위해 필요
var lv_lpSubject="";
var lv_lpAttachFileName="";
var rtnary=new Array(1);
var callBackFunc = "";
var isChrome = false;
var RPT_ZOOM_RATIO = "1.5";
var PRN_USE_ACTIVEX = true;
var PRN_WAS_PORT = "8001";

//#1039 Outlook File Attach with Chrome
var applicationContext = getApplicationContext();
var RD_path_chrome_attach   = "http://"+location.host+"/"+applicationContext+"/apps/fis/rpt/mrd/"
var RDServer_chrome_attach = "/rfn [http://"+location.host+"/RDServer/rdagent.jsp]  /rsn [jdbc/"+applicationContext+"] /rfonttype50 /rlobopt [1] /rmmloverlapobj /rimgindexing /rmmlreportdone [2] ";  //RDServer RDAgnet url

function getApplicationContext(){
    var values = location.pathname.split("/");
    return values[1];
}

function loadPage() {
	
	var opt_key = "PRN_USE_ACTIVEX";
	ajaxSendPost(setUseActivexReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	if(PRN_USE_ACTIVEX){
		rdObjects[0].SetCacheOption(0);
		setRdInit(rdObjects[0]);
		document.getElementById("mainTable").height = screen.height - 150;
		$("#mainTable").css("padding-right",0);	
	} else {
		

		loadPageHtml5();
	}	
}

function loadPageHtml5() {
	
	isChrome = true;
	document.getElementById("mainTable").height = screen.height - 150;

	var opt_key = "RPT_ZOOM_RATIO";
	ajaxSendPost(setRptZoomRatioReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key2 = "PRN_WAS_PORT";
	ajaxSendPost(setWasPortReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key2, "./GateServlet.gsl");

	var hostUrl = window.location.protocol + "//" + window.location.hostname + ":" + PRN_WAS_PORT;

	var viewer = new m2soft.crownix.Viewer( hostUrl+'/ReportingServer/service', "mainTable");
	
	rdObjects[0] = viewer;
	setRdInit(rdObjects[0]);

}


/**
 *  Print Finished Event Catch for Chrome
 *  Don't use alert fucntion in this Fucntion 
 */
function PrintFinished(){
	registRptPrintHistory();
}
/**
 * Report Design 환경을 초기화한다.
 */
function setRdInit(objRd){
	var formObj=document.frm1;
	
	if (!isChrome) {
		objRd.height = (screen.height - 220) + "px";
		if(formObj.fileName.value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || formObj.fileName.value=="package_label.mrd" || formObj.fileName.value=="check_journal_01.mrd"){
			objRd.AutoAdjust=false;
			objRd.ZoomRatio=100;
		}else{
			objRd.AutoAdjust=2;
		// US, CA 이외(현재는 DE)에는 RD에 LETTER로 설정되어 있어도 기본값을 A4로 설정한다.
			if (user_ofc_cnt_cd=="DE") {
				objRd.SetPrint2(1,1,1,100); // A4
			}
		}
	}
	
	var rptFilePath = rpt_file_path;
	if(rptFilePath == "") {
		rptFilePath = "C:\\opus\\";
	} else if(rptFilePath.substring(rptFilePath.length,rptFilePath.length-1)!="\\") {
		rptFilePath = rptFilePath + "\\";
	}
	
	var pFileName = fnRegExp(formObj.rpt_pdf_file_nm.value);
	formObj.rpt_pdf_file_nm.value = pFileName;
	
	var tFileName = fnRegExp(formObj.rpt_file_name_title.value);
	formObj.rpt_file_name_title.value = tFileName;
	
	if (!isChrome) {

		// PDF 파일명 설정 - IE용 
		var pdfFileNm = formObj.rpt_pdf_file_nm.value;
		if (pdfFileNm == "" || pdfFileNm == "undefined" || pdfFileNm == undefined) {
			pdfFileNm = formObj.fileName.value.split(".")[0];
		} 
		
		//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청
		//#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report
		var rpt_file_name_title = formObj.rpt_file_name_title.value;
		if (rpt_file_name_title != ""){
			pdfFileNm = rpt_file_name_title;
		}		  
	    objRd.SetSaveDialogEx(rptFilePath, pdfFileNm, "xls@doc@pdf@tif@bmp", "pdf");
	    objRd.DisableToolbar(14);
		objRd.ViewShowMode(0);
		objRd.SetBackgroundColor(255,255,255); //Case Sensitive
		objRd.SetPageLineColor(255,255,255);	
		objRd.ApplyLicense("0.0.0.0");	//License Checking
	}
	
	rdOpen(objRd, document.frm1);
}

function fnRegExp(str){
	var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi
	var rtnStr = "";
	if(regExp.test(str)){
		rtnStr = str.replace(regExp, "");
	}else{
		rtnStr = str;
	}
//	return rtnStr.replace(/(\s*)/g, "");
	return rtnStr;
}
var fileNmArr;
function rdOpen(objRd, formObj) {
	if (!isChrome) {
		objRd.SetAppendReport(1);
	}

	var rdParamArr = formObj.rdParam.value.split("^@@^");
	
	ajaxSendPost(setFileName, "reqVal", "&goWhere=aj&bcKey=getReportFile&fileArr="+formObj.fileName.value.replaceAll("^@@^", ","), "./GateServlet.gsl");

	var v_rwait = '';
	
	if (fileNmArr.length > 1){
		v_rwait = '/rwait';
	}

	var rdParamVal = "";
	var appendReport = new Array();
	for(var i = 0 ; i < fileNmArr.length ; i ++){
		
		rdParamVal = "";

		if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA" || user_ofc_cnt_cd=="DE"){
			if(     fileNmArr[i] == "pfm_profit_month_multi.mrd" ){
				// 동기방식 적용
				//objRd.FileOpen(RD_path+fileNmArr[i], RDServer+'/ruseurlmoniker [0] /rwait /rp '+rdParamArr[i] + " /riprnmargin");
				//objRd.openFile(RD_path+fileNmArr[i], RDServer+'/ruseurlmoniker [0] ' + v_rwait + ' /rp '+rdParamArr[i] + " /riprnmargin");
				rdParamVal = RDServer+'/ruseurlmoniker [0] ' + v_rwait + ' /rp '+rdParamArr[i] + " /riprnmargin ";

			} else {
				// 기존방식 유지
				if(fileNmArr[i].value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || fileNmArr[i].value=="package_label.mrd /rpptexportapitype [1]"){
					//objRd.FileOpen(RD_path+fileNmArr[i], RDServer+'/rwait /rp '+rdParamArr[i]);
					//objRd.openFile(RD_path+fileNmArr[i], RDServer+ v_rwait + ' /rp '+rdParamArr[i]);
					rdParamVal = RDServer+ v_rwait + ' /rp '+rdParamArr[i];
					
				}else{
					//objRd.FileOpen(RD_path+fileNmArr[i], RDServer+'/rwait /rp '+rdParamArr[i] + " /riprnmargin");
					//objRd.openFile(RD_path+fileNmArr[i], RDServer+v_rwait + ' /rp '+rdParamArr[i] + " /riprnmargin");
					rdParamVal = RDServer+v_rwait + ' /rp '+rdParamArr[i] + " /riprnmargin ";
				}
			}
		}else{
			//objRd.FileOpen(RD_path+fileNmArr[i], RDServer+'/rwait /rp '+rdParamArr[i]);
			//objRd.openFile(RD_path+fileNmArr[i], RDServer+v_rwait + ' /rp '+rdParamArr[i]);
			rdParamVal = RDServer+v_rwait + ' /rp '+rdParamArr[i];
		}
		
		if (!isChrome) {
			objRd.FileOpen(RD_path+fileNmArr[i],rdParamVal);
		} else {
			appendReport.push({ mrdPath : RD_path+fileNmArr[i], mrdParam : rdParamVal});
		}
		console.log(RD_path+fileNmArr[i]);
		
		
	}
	
	var pFileName = fnRegExp(formObj.rpt_pdf_file_nm.value);
	formObj.rpt_pdf_file_nm.value = pFileName;
	
	var tFileName = fnRegExp(formObj.rpt_file_name_title.value);
	formObj.rpt_file_name_title.value = tFileName;
	
	if (isChrome) {
		
		// PDF 파일명 설정 - chrome용  -IE 설정은 70라인
		var pdfFileNm = formObj.rpt_pdf_file_nm.value;
		if (pdfFileNm == "" || pdfFileNm == "undefined" || pdfFileNm == undefined) {
			pdfFileNm = formObj.fileName.value.split(".")[0];
		} 
		 
		//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청
		//#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report
		var rpt_file_name_title = formObj.rpt_file_name_title.value;
		if (rpt_file_name_title != ""){
			pdfFileNm = rpt_file_name_title;
		}
		
		if (pdfFileNm.substring(pdfFileNm.length,pdfFileNm.length-1) == "."){
			pdfFileNm = pdfFileNm+" ";
		} 
		
		objRd.openFile(appendReport ,{timeout:1200, defaultZoom : Number(RPT_ZOOM_RATIO) ,defaultZoomCentre:'LEFTTOP' ,keepZoomRatio:'true' ,downloadFileName : pdfFileNm });
	}		
}

function setFileName(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		var res = JSON.parse(doc[1]);
		fileNmArr = res.mrdFile;
		RD_path += res.rdPath;
		
		// #1039 Outlook File Attach with Chrome
		RD_path_chrome_attach += res.rdPath;
	}
	
}

function doWork(srcName){
	var formObj=document.frm1;
	
    switch(srcName) { 
    	case "Fax":
			var lpSubject=(formObj.mailTitle.value != ""?  formObj.mailTitle.value: formObj.title.value);
			// #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴
			var lpAttachFileName = (formObj.attachFileName.value == "" ? formObj.fileName.value.replaceAll(".mrd",  ".tif") : formObj.attachFileName.value + ".tif");
			//var lpAttachFileName=formObj.fileName.value.replaceAll(".mrd",  ".tif");
			var rptBizTp=formObj.rpt_biz_tp.value;
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
			var rptTp=formObj.rpt_tp.value
			var rptTrdpCd=formObj.rpt_trdp_cd.value
			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
			var his_type="F"; // E : email, P : print, F : FAX
			var his_call_view=formObj.title.value;
			var his_call_file=formObj.fileName.value;
			var his_title=formObj.mailTitle.value;	
			var inv_seq=formObj.f_inv_seq.value;
			if (!(((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
				       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
				           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
				               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
				  (rptBizTp == "OIM" && rptBizSubTp == "DS"))
				) {    // Ocean Import > Master B/L >Devanning / Segregation 일 경우는 parameter로 받음
				// mailTo 조회 & setting
				ajaxSendPost(getRptFaxParameters, "reqVal", "&goWhere=aj&bcKey=getRptFaxParameters&intg_bl_seq=" + param_intg_bl_seq
																			+ "&rpt_biz_tp=" + rptBizTp
																			+ "&rpt_biz_sub_tp=" + rptBizSubTp
																			+ "&rpt_tp=" + formObj.rpt_tp.value
																			+ "&rpt_trdp_cd=" + formObj.rpt_trdp_cd.value
																			, "./GateServlet.gsl");
			}
    		
			rtnary=new Array(1);
	   		rtnary[0]=formObj.fax_param.value;
	   		callBackFunc = "FAX";
	   		//5257 [BINEX] OIH B/L - Arrival Notice - EMail
	   		modal_center_open('./RPT_FAX_0020.clt', rtnary, 1000,550,"yes");
	   		//modal_center_open('./RPT_FAX_0020.clt', rtnary, 1150,550,"yes");
			
			//var rtnVal =  ComOpenWindow('./RPT_FAX_0020.clt',  formObj.fax_param.value,  "scroll:yes;status:no;help:no;dialogWidth:685px;dialogHeight:480px" , true);
    		
    		
    		
			//alert(formObj.fax_no.value);
			//return;
    		
    	break;
    	case "Mail":
			var lpSubject=(formObj.mailTitle.value != ""?  formObj.mailTitle.value: formObj.title.value);
			// #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴
			var lpAttachFileName = (formObj.attachFileName.value == "" ? formObj.fileName.value.replaceAll(".mrd",  ".pdf") : formObj.attachFileName.value + ".pdf");
			//var lpAttachFileName=formObj.fileName.value.replaceAll(".mrd", ".pdf");
			var rptBizTp=formObj.rpt_biz_tp.value;
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
			var rptTp=formObj.rpt_tp.value
			var rptTrdpCd=formObj.rpt_trdp_cd.value
			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
			
			//#434
			//[Binex LA new] email/fax history status and worng info on history
			var his_type="O"; // E : email, P : print, O : outlook
			var his_call_view=formObj.title.value;
			var his_call_file=formObj.fileName.value;
			var his_title=formObj.mailTitle.value;
			var inv_seq=formObj.f_inv_seq.value;
			var his_1=formObj.shpr_trdp_cd.value;
			var his_2=formObj.shpr_trdp_addr.value;
			var his_3=formObj.i_ooh_bkg_rmk.value;
			lv_lpSubject=lpSubject;
			lv_lpAttachFileName=lpAttachFileName;
			//alert(rptBizTp);
			if (!(((rptBizTp == undefined || rptBizTp == "undefined" || rptBizTp == "") &&
				       (rptBizSubTp == undefined || rptBizSubTp == "undefined" || rptBizSubTp == "") &&
				           (rptTp == undefined || rptTp == "undefined" || rptTp == "" ) &&
				               (rptTrdpCd == undefined || rptTrdpCd == "undefined" || rptTrdpCd == "" )) ||
				  (rptBizTp == "OEH" && rptBizSubTp == "DR") ||
				  ((rptBizTp == "OIH" || rptBizTp == "AIH") && rptBizSubTp == "IT") ||
				  (rptBizTp == "ACCT" && rptBizSubTp == "AP") ||
				  (rptBizTp == "AEM" && (rptBizSubTp == "TS" || rptBizSubTp == "TU")))
				) {
				// mailTo 조회 & setting
				ajaxSendPost(getRptMailParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailParameters&intg_bl_seq=" + param_intg_bl_seq
																			+ "&rpt_biz_tp=" + rptBizTp
																			+ "&rpt_biz_sub_tp=" + rptBizSubTp
																			+ "&rpt_tp=" + rptTp
																			+ "&rpt_trdp_cd=" + rptTrdpCd
																			, "./GateServlet.gsl");
			}
			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
			ajaxSendPost(getRptMailHistory, "reqVal", "&goWhere=aj&bcKey=getRptMailHistory&intg_bl_seq=" + formObj.intg_bl_seq.value
					+ "&inv_seq=" + inv_seq
					+ "&his_type=" + his_type
					+ "&his_call_view=" + his_call_view
					+ "&his_call_file=" + his_call_file
					+ "&his_title=" + his_title
					+ "&his_1=" + his_1
					+ "&his_2=" + his_2
					+ "&his_3=" + his_3
					, "./GateServlet.gsl");		
			//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
			// Arrival Notice를 포함 전체 메일 버튼 팝업 호출되도록 수정
//			if (rptBizSubTp == "AN") {
				if (!(((rptBizTp == undefined || rptBizTp == "undefined" || rptBizTp == "" ) &&
					       (rptBizSubTp == undefined || rptBizSubTp == "undefined" || rptBizSubTp == "" ) &&
					           (rptTp == undefined || rptTp == "undefined" || rptTp == "" ) &&
					               (rptTrdpCd == undefined || rptTrdpCd == "undefined" || rptTrdpCd == "")) ||
					  (rptBizTp == "OIM" && rptBizSubTp == "DS"))
					) {    // Ocean Import > Master B/L >Devanning / Segregation 일 경우는 parameter로 받음
					// mailTo 조회 & setting
					ajaxSendPost(getRptMailANParameters2, "reqVal", "&goWhere=aj&bcKey=getRptMailPopParameters&intg_bl_seq=" + param_intg_bl_seq
																				+ "&rpt_biz_tp=" + rptBizTp
																				+ "&rpt_biz_sub_tp=" + rptBizSubTp
																				+ "&rpt_tp=" + formObj.rpt_tp.value
																				+ "&rpt_trdp_cd=" + formObj.rpt_trdp_cd.value
																				, "./GateServlet.gsl");
				//#35198[AR Aging Report] OUTLOOK 버튼이 기동하지않는 에러
				} else {	// Bug 42480 slide: 29
					// Accounting 화면에서 필요.
					rtnary=new Array(1);
					rtnary[0]="";	//formObj.mailAN_param.value = "";
					callBackFunc = "OUTLOOK2";
					// 5257 [BINEX] OIH B/L - Arrival Notice - EMail
					modal_center_open('./RPT_MAIL_0010.clt', rtnary, 1000,550,"yes");
					//modal_center_open('./RPT_MAIL_0010.clt', rtnary, 1150,550,"yes");
					
					//var rtnVal = window.showModalDialog('./RPT_MAIL_0010.clt', formObj.mailAN_param.value, "scroll:yes;status:no;help:no;dialogWidth:685px;dialogHeight:480px");
					
				}
//			} else {
//			
//				/*
//					정의)
//						short SendMailEx2(short nMode, BSTR lpFrom, BSTR lpSubject, BSTR lpBody, BSTR lpTo, BSTR lpToCc, BSTR lpToBcc, BSTR lpAttachFileName);
//					인수)
//						nMode: 0이면 설정값으로 기본값이 채워진 새 메시지 창이 뜸(SendMail()과 동일), 1이면 설정값대로 바로 메일을 보냄(SendMailEx()와 동일)
//						lFrom : 보내는 사람 주소(AAA<aaa@bbb.com> 과 같이 별칭입력도 가능합니다.)
//						lpSubject : 메일 제목
//						lpBody : 메일 내용
//						lpTo : 받는 사람 주소(AAA<aaa@bbb.com> 과 같이 별칭입력도 가능하며, ';'로 구분시 여러명 발송가능)
//						lpToCc : 참조로 받는 사람 주소(AAA<aaa@bbb.com> 과 같이 별칭입력도 가능하며, ';'로 구분시 여러명 발송가능)
//						lpToBcc : 숨은 참조로 받는 사람 주소(AAA<aaa@bbb.com> 과 같이 별칭입력도 가능하며, ';'로 구분시 여러명 발송가능)
//						lpAttachFileName : 첨부파일 경로(첨부할 파일이 여러개인 경우엔, '|'로 구분가능)
//				*/
//				rdObjects[0].SendMailEx2(0, user_eml+"", lpSubject+"", "", formObj.mailTo.value+"", "", "", lpAttachFileName+"");
//			}
		break;
    	case "Mail2":
			var lpSubject=(formObj.mailTitle.value != ""?  formObj.mailTitle.value: formObj.title.value);
			// #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴
			var lpAttachFileName = (formObj.attachFileName.value == "" ? formObj.fileName.value.replaceAll(".mrd",  ".pdf") : formObj.attachFileName.value + ".pdf");
			//var lpAttachFileName=formObj.fileName.value.replaceAll(".mrd", ".pdf");
			var rptBizTp=formObj.rpt_biz_tp.value;
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
			var rptTp=formObj.rpt_tp.value;
			var rptTrdpCd=formObj.rpt_trdp_cd.value;
			// jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History
			var his_type="E"; // E : email, P : print
			var his_call_view=formObj.title.value;
			var his_call_file=formObj.fileName.value;
			var his_title=formObj.mailTitle.value;
			var inv_seq=formObj.f_inv_seq.value;
			var his_1=formObj.shpr_trdp_cd.value;
			var his_2=formObj.shpr_trdp_addr.value;
			var his_3=formObj.i_ooh_bkg_rmk.value;
			//alert(rptBizTp);
			if (!(((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
				       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
				           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
				               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
				  (rptBizTp == "OEH" && rptBizSubTp == "DR") ||
				  ((rptBizTp == "OIH" || rptBizTp == "AIH") && rptBizSubTp == "IT") ||
				  (rptBizTp == "ACCT" && rptBizSubTp == "AP") ||
				  (rptBizTp == "AEM" && (rptBizSubTp == "TS" || rptBizSubTp == "TU")))
				) {
				// mailTo 조회 & setting
				ajaxSendPost(getRptSmtpMailParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailParameters&intg_bl_seq=" + param_intg_bl_seq
																			+ "&rpt_biz_tp=" + rptBizTp
																			+ "&rpt_biz_sub_tp=" + rptBizSubTp
																			+ "&rpt_tp=" + rptTp
																			+ "&rpt_trdp_cd=" + rptTrdpCd
																			, "./GateServlet.gsl");
			}
			var rptCcTrdpCd=formObj.rpt_cc_trdp_cd.value;
			if(rptCcTrdpCd != ""){
				if (!(((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
					       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
					           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
					               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
					  (rptBizTp == "OEH" && rptBizSubTp == "DR") ||
					  ((rptBizTp == "OIH" || rptBizTp == "AIH") && rptBizSubTp == "IT") ||
					  (rptBizTp == "ACCT" && rptBizSubTp == "AP") ||
					  (rptBizTp == "AEM" && (rptBizSubTp == "TS" || rptBizSubTp == "TU")))
					) {
					// mailTo 조회 & setting
					ajaxSendPost(getRptSmtpMailParametersCc, "reqVal", "&goWhere=aj&bcKey=getRptMailParameters&intg_bl_seq=" + param_intg_bl_seq
																				+ "&rpt_biz_tp=" + rptBizTp
																				+ "&rpt_biz_sub_tp=" + rptBizSubTp
																				+ "&rpt_tp=" + rptTp
																				+ "&rpt_trdp_cd=" + rptCcTrdpCd
																				, "./GateServlet.gsl");
				}
			}
//    		rdObjects[0].SaveAsPdfFile("C:\\a.pdf");
//    		
//    		frm1.f_cmd.value = COMMAND10;
//    		frm1.action = "./SAL_TPM_0010.clt";
//    		frm1.submit();
    		//init title, content
    		var formObj=document.frm1;
    		//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
			setMailToAndCC(true,rptBizSubTp);
			frm1.f_eml_content.value += "\r\n";
    		frm1.f_eml_content.value += "\r\n";
    		frm1.f_eml_content.value += user_nm;
    		frm1.f_eml_content.value += "\r\n";
    		frm1.f_eml_content.value += user_eml;
    		frm1.f_eml_content.value += "\r\n";
    		frm1.f_eml_content.value += user_phn;
    		frm1.f_eml_content.value += "\r\n";
    		frm1.f_eml_content.value += user_fax;
    		frm1.f_eml_content.value += "\r\n";
    		//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
    		// setMailToAndCC에서 설정하므로 주석처리
    		/*
    		frm1.f_eml_to.value=frm1.mailTo.value;
    		frm1.f_eml_cc.value=frm1.mailCc.value;
    		 */
    		//frm1.f_eml_title.value=frm1.mailTitle.value;
    		frm1.f_eml_title.value=lpSubject;
    		
    		//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청
    		//#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report
    		var rpt_file_name_title = formObj.rpt_file_name_title.value;
    		if (rpt_file_name_title != ""){
    			lpAttachFileName = rpt_file_name_title + ".pdf";
    			frm1.attachFileName.value=rpt_file_name_title; 
    		}
    		
    		frm1.f_eml_file.value=lpAttachFileName;
    		/*if(document.getElementById("mail_tab").style.display == "none"){
    			// window.resizeBy(500,0);
    			document.getElementById("mail_tab").style.display="inline";
    			$("#mainTable").css("padding-right",508);
        		
    			//----------------[20140112 OJG]-----------------
    			//frm1.filePath.value = "C:\\clt_email\\"+frm1.fileName.value.replace("mrd", "pdf");	
    			//rdObjects[0].SaveASPdfFile(frm1.filePath.value);
    			//----------------[20140112 OJG]-----------------
    		}*/
    	break;
    	case "Send":
    		var formObj=document.frm1;
    		// email Address를 체크한다.
    		if(formObj.f_eml_to.value == ""){
    			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_MAIL') + "\n\n: RPT_RD_0010.264");	
    			formObj.f_eml_to.focus();
    			return;
    		} 
    		formObj.f_eml_to.value=formObj.f_eml_to.value.replaceAll(";;",";");
    		formObj.f_eml_cc.value=formObj.f_eml_cc.value.replaceAll(";;",";");
    		formObj.f_eml_to.value=formObj.f_eml_to.value.replaceAll(" ","");
    		formObj.f_eml_cc.value=formObj.f_eml_cc.value.replaceAll(" ","");
    		if(checkAllEml(formObj.f_eml_to.value.replaceAll(";",","))==false){
    			formObj.f_eml_to.focus();
    			return;
    		}
    		if(checkAllEml(formObj.f_eml_cc.value.replaceAll(";",","))==false){
    			formObj.f_eml_cc.focus();
    			return;
    		}
    		//#4722 [Best Ocean] Email always bcc myself option add
    		formObj.f_eml_bcc.value=formObj.f_eml_bcc.value.replaceAll(";;",";");
    		formObj.f_eml_bcc.value=formObj.f_eml_bcc.value.replaceAll(" ","");   
    		if(checkAllEml(formObj.f_eml_bcc.value.replaceAll(";",","))==false){
    			formObj.f_eml_bcc.value = "";
    		}
    		
    		if(formObj.f_eml_title.value == ""){
    			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('TIT') + "\n\n: RPT_RD_0010.277");	
    			formObj.f_eml_title.focus();
    			return;
    		}
    		// 첨부된 File에서 File명을 분리한다.
    		if (setAttOnlyFileName()==false){
    			// 파일 확장자가 없을때
    			alert(getLabel('FMS_COM_ALT059')+ "\n\n: RPT_RD_0010.286");	
    			return;   			
    		}
    		formObj.f_cmd.value=MODIFY;
    		formObj.target="ifr_hidden";
			formObj.action="./RPT_RD_0011.clt";
			formObj.submit();
    	break;
    	case "Mail_Close":
			// window.resizeBy(-500,0);
			document.getElementById("mail_tab").style.display="none";
			
			if (isChrome) {
				$("#mainTable").css("padding-right",0);
			}else{
				$("#mainTable").css("padding-right",12);
			}
			
			$("#m2soft-crownix-container").css("width","100%");
			$("#m2soft-crownix-container").css("transform","translate(0px, 12px)");
			$("#m2soft-crownix-container").css("top","33px");
			$("#m2soft-crownix-page").css("width","825.243px");
					
			var v_ratio = ($("#crownix-toolbar #crownix-toolbar-ratio div").text().replace("%","")) / 100;
			var totalWidth = (((($("#m2soft-crownix-container").css("width")).replace("px","")) / 2) - (Math.round((849.234 * v_ratio) / 2))) + "px";
			
			$("#m2soft-crownix-page").css("transform","translate("+totalWidth+", 0px) scale("+v_ratio+")");
			
    	break;
    	case "EML_TO_POPLIST":
    		var formObj=document.frm1;
    		//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
//			if (rptBizSubTp == "AN") {
				setMailToAndCC(true,rptBizSubTp, false);
//			} else {
//    		
//	    		var rtnary = new Array(1);
//		   		rtnary[0] = "1";
//		   		
//	   	        var rtnVal = window.showModalDialog('./CMM_POP_0360.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
//	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
//				 	return;
//				}else{
//					var rtnValAry = rtnVal.split("|");
//					if(formObj.f_eml_to.value != "" ){
//						formObj.f_eml_to.value += ";" + rtnValAry[0];//eml
//						formObj.f_eml_to.value = formObj.f_eml_to.value.replaceAll(";;", ";");
//					}else{
//						formObj.f_eml_to.value += rtnValAry[0];//eml
//					}
//					
//				}
//			}
		break;
    	case "EML_CC_POPLIST":
    		var formObj=document.frm1;
    		//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
//			if (rptBizSubTp == "AN") {
				setMailToAndCC(false,rptBizSubTp, false);
//			} else {
//	    		var rtnary = new Array(1);
//	    		rtnary[0] = "1";
//	    		
//	    		var rtnVal = window.showModalDialog('./CMM_POP_0360.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
//	    		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
//	    			return;
//	    		}else{
//	    			var rtnValAry = rtnVal.split("|");
//	    			if(formObj.f_eml_cc.value != "" ){
//						formObj.f_eml_cc.value += ";" + rtnValAry[0];//eml
//						formObj.f_eml_cc.value = formObj.f_eml_cc.value.replaceAll(";;", ";");
//					}else{
//						formObj.f_eml_cc.value += rtnValAry[0];//eml
//					}
//	    		}
//			}
    	break;
		case "Print":			
			if (isChrome) {
				rdObjects[0].print({
					isServerSide: true,
					limitedPage: 10000
				});
			} else {
				rdObjects[0].PrintDialog();
			}
			//#3888 [BNX] PRINT LOG HISTORY			
			registRptPrintHistory();
		break;
		
		case "CLOSE":
			window.close();
    	break;
    }
}
//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
function setANMailTo (rtnVal) {
	var strRtnVal="";
	if (typeof(rtnVal) != 'undefined' && rtnVal != undefined && rtnVal != "") {
		var rtnListArr=rtnVal.split('^^');
		for(var i=0; i < rtnListArr.length ; i++) {
			var rtnArr=rtnListArr[i].split('@@');
			strRtnVal +=  rtnArr[0] + "<" + rtnArr[1] + ">;";
		}
		//formObj.mailAN_param.value = strRtn;
	}
	return strRtnVal;
}
//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
var gToFlg
function setMailToAndCC(toFlg,rptBizSubTp, isShowFull){
	var formObj=document.frm1;
	gToFlg = toFlg;
	//var rptBizSubTp = formObj.rpt_biz_sub_tp.value;
	var lpSubject=(formObj.mailTitle.value != ""?  formObj.mailTitle.value: formObj.title.value);
	// #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴
	var lpAttachFileName = (formObj.attachFileName.value == "" ? formObj.fileName.value.replaceAll(".mrd",  ".pdf") : formObj.attachFileName.value + ".pdf");
	//var lpAttachFileName=formObj.fileName.value.replaceAll(".mrd", ".pdf");
	var rptBizTp=formObj.rpt_biz_tp.value;
	var rptTp=formObj.rpt_tp.value;
	var rptTrdpCd=formObj.rpt_trdp_cd.value;
	// MAIL TO SET
	if (toFlg) {
		if (!(((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
			       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
			           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
			               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
			  (rptBizTp == "OEH" && rptBizSubTp == "DR") ||
			  ((rptBizTp == "OIH" || rptBizTp == "AIH") && rptBizSubTp == "IT") ||
			  (rptBizTp == "ACCT" && rptBizSubTp == "AP") ||
			  (rptBizTp == "AEM" && (rptBizSubTp == "TS" || rptBizSubTp == "TU")))
			) {
			// mailTo 조회 & setting
			ajaxSendPost(getRptMailANParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailPopParameters&intg_bl_seq=" + param_intg_bl_seq
																		+ "&rpt_biz_tp=" + rptBizTp
																		+ "&rpt_biz_sub_tp=" + rptBizSubTp
																		+ "&rpt_tp=" + formObj.rpt_tp.value
																		+ "&rpt_trdp_cd=" + formObj.rpt_trdp_cd.value
																		, "./GateServlet.gsl");
		}
	} else {
		// MAIL CC SET
		var rptCcTrdpCd=formObj.rpt_cc_trdp_cd.value;
		if(rptCcTrdpCd != ""){
			if (!(((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
				       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
				           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
				               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
				  (rptBizTp == "OEH" && rptBizSubTp == "DR") ||
				  ((rptBizTp == "OIH" || rptBizTp == "AIH") && rptBizSubTp == "IT") ||
				  (rptBizTp == "ACCT" && rptBizSubTp == "AP") ||
				  (rptBizTp == "AEM" && (rptBizSubTp == "TS" || rptBizSubTp == "TU")))
				) {
				// mailTo 조회 & setting
				ajaxSendPost(getRptMailANParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailPopParameters&intg_bl_seq=" + param_intg_bl_seq
																			+ "&rpt_biz_tp=" + rptBizTp
																			+ "&rpt_biz_sub_tp=" + rptBizSubTp
																			+ "&rpt_tp=" + rptTp
																			+ "&rpt_trdp_cd=" + rptCcTrdpCd
																			, "./GateServlet.gsl");
			}
		}
	}
	
	rtnary=new Array(1);
	rtnary[0]= formObj.mailAN_param.value;
	if(toFlg == "TO") {
		rtnary[1] = "TO";
	}else if(toFlg == "CC") {
		rtnary [1] = "CC";
	}else if(toFlg == "BCC") {
		rtnary [1] = "BCC";
	}
	rtnary[2] = isShowFull;
	callBackFunc = "EMAIL_ADDR_SETUP";
	// 5257 [BINEX] OIH B/L - Arrival Notice - EMail
	modal_center_open('./RPT_MAIL_0010.clt', rtnary, 1000,550,"yes");
	//modal_center_open('./RPT_MAIL_0010.clt', rtnary, 1150,550,"yes");
	
	//var rtnVal =  window.showModalDialog('./RPT_MAIL_0010.clt',  formObj.mailAN_param.value,  "scroll:yes;status:no;help:no;dialogWidth:685px;dialogHeight:480px" );

}
var flag2=false;
var flag3=false;
var flag4=false;
var flag5=false;
function set2file(){
	if(!flag2){
		document.getElementById("f_eml_content").SetSheetHeight("427");
		document.getElementById("file2").style.display="inline";
		document.getElementById("fileName2").style.display="inline";
		document.getElementById("img2").style.display="inline";
		flag2=true;
	}
}
function set3file(){
	if(!flag3){
		document.getElementById("f_eml_content").SetSheetHeight("404");
		document.getElementById("file3").style.display="inline";
		document.getElementById("fileName3").style.display="inline";
		document.getElementById("img3").style.display="inline";
		flag3=true;
	}
}
function set4file(){
	if(!flag4){
		document.getElementById("f_eml_content").SetSheetHeight("381");
		document.getElementById("file4").style.display="inline";
		document.getElementById("fileName4").style.display="inline";
		document.getElementById("img4").style.display="inline";
		flag4=true;
	}
}
function set5file(){
	if(!flag5){
		document.getElementById("f_eml_content").SetSheetHeight("358");
		document.getElementById("file5").style.display="inline";
		document.getElementById("fileName5").style.display="inline";
		flag5=true;
	}
}
function getRptMailParameters(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {
			var rtnArr=doc[1].split('@@');
			formObj.mailTo.value=rtnArr[0];
		}
	}
}
function getRptSmtpMailParameters(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {
			var rtnArr=doc[1].split('@@');
			formObj.mailTo.value=rtnArr[1];
		}
	}
}
function getRptSmtpMailParametersCc(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {
			var rtnArr=doc[1].split('@@');
			formObj.mailCc.value=rtnArr[1];
		}
	}
}
/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
function getRptMailHistory(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {
			formObj.mailTo.value=doc[1];
		}
	}
}
/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
function registRptPrintHistory(){
	var formObj=document.frm1;
	/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
	var his_type="P"; // E : email, P : print
	var his_call_view=formObj.title.value;
	var his_call_file=formObj.fileName.value;
	var his_title=formObj.mailTitle.value;
	var inv_seq=formObj.f_inv_seq.value;
	var his_1=formObj.shpr_trdp_cd.value;
	var his_2=formObj.shpr_trdp_addr.value;
	var his_3=formObj.i_ooh_bkg_rmk.value;
	// OEM List  에서 print 눌렀을때
	if(his_call_file == 'SR_SEA.mrd')
	{
		if(formObj.rpt_intg_bl_seq.value != null && formObj.rpt_intg_bl_seq.value != '')
		{
			formObj.intg_bl_seq.value=formObj.rpt_intg_bl_seq.value;
		}
	}
	/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
	ajaxSendPost(getRptMailHistory, "reqVal", "&goWhere=aj&bcKey=getRptMailHistory&intg_bl_seq=" + formObj.intg_bl_seq.value
			+ "&inv_seq=" + inv_seq
			+ "&his_type=" + his_type
			+ "&his_call_view=" + his_call_view
			+ "&his_call_file=" + his_call_file
			+ "&his_title=" + his_title
			+ "&his_1=" + his_1
			+ "&his_2=" + his_2
			+ "&his_3=" + his_3
			, "./GateServlet.gsl");		
}
function getRptFaxParameters(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		formObj.fax_param.value=doc;
		// 테스트용 formObj.fax_param.value = "OK,DOOSAN MOTTROL CO. LTD@@OJG DOOSAN@@Import@@00044445555^^aa MOTTROL CO. LTD@@aa DOOSAN@@aa@@123"
	}
}
//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
function getRptMailANParameters(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		formObj.mailAN_param.value=doc;
	}
}
//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정(OUTLOOK)
function getRptMailANParameters2(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		formObj.mailAN_param.value=doc;
		
		rtnary=new Array(1);
		rtnary[0]=formObj.mailAN_param.value;
		callBackFunc = "OUTLOOK";
		// 5257 [BINEX] OIH B/L - Arrival Notice - EMail
		modal_center_open('./RPT_MAIL_0010.clt', rtnary, 1000,550,"yes");
		//modal_center_open('./RPT_MAIL_0010.clt', rtnary, 1150,550,"yes");
		
	}
}
function sendMailAN(mailAN_return, user_eml, lpSubject,lpAttachFileName){

	var formObj=document.frm1;
	
	var content_val = "\r\n";
	content_val += "\r\n";
	content_val += user_ofc_cnt_nm;
	content_val += "\r\n";
	content_val += user_nm;
	content_val += "\r\n";
	content_val += user_eml;
	content_val += "\r\n";
	content_val += user_phn;
	content_val += "\r\n";
	content_val += user_fax;
	content_val += "\r\n";
	
	if (isChrome) {

		var link = "mailto:"+unescape(mailAN_return)
		  		   + "&subject=" + escape(lpSubject)
		  		   + "&body=" + escape(content_val)
		
		// #1039 Outlook File Attach with Chrome
		var rdParamArr = formObj.rdParam.value.split("^@@^");
		var rdParamVal = "";
    	var mrdList = new Array();		

        // Server URL        
		var requestUrl = "http://127.0.0.1:6580/CxClientAgent/service/";
						
		// rwait - FileOpen 메서드를 호출하면 보고서 생성이 완료된 후에 메서드를 종료
		var v_rwait = '';
		if (fileNmArr.length > 1){
			v_rwait = '/rwait';
		}
		
		// 1) MRD List 
		for(var i = 0 ; i < fileNmArr.length ; i ++){
			rdParamVal = "";
			
			// Variation with case
			if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA" || user_ofc_cnt_cd=="DE"){
				if(     fileNmArr[i] == "pfm_profit_month_multi.mrd" ){
					rdParamVal = RDServer_chrome_attach+'/ruseurlmoniker [0] ' + v_rwait + ' /riprnmargin /rp '+rdParamArr[i] + " ";   // riprnmargin  위치이동 Balloon 에서 Logo 출력오류 (#2433) 
				} else {
					if(fileNmArr[i].value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || fileNmArr[i].value=="package_label.mrd /rpptexportapitype [1]"){
						rdParamVal = RDServer_chrome_attach+ v_rwait + ' /rp '+rdParamArr[i];
					}else{
						rdParamVal = RDServer_chrome_attach+v_rwait + ' /riprnmargin /rp '+rdParamArr[i] + " "; // riprnmargin  위치이동 Balloon 에서 Logo 출력오류 (#2433) 
					}
				}
			}else{
				rdParamVal = RDServer_chrome_attach+v_rwait + ' /rp '+rdParamArr[i];
			}
			
	        // Append to mrd List  
	    	mrdList.push({ mrdPath : RD_path_chrome_attach+fileNmArr[i], mrdParam : rdParamVal});
	    	
			//console.log(RD_path_chrome_attach+fileNmArr[i]);
			//console.log(rdParamVal);
		}
                
        // 2) API List
        var apiList = [ {api:"SendmailEX2", argList:["0", user_eml, lpSubject , content_val , unescape(mailAN_return) , "" , "" , lpAttachFileName]} ];
        
        // Request Data Organize
        var requestData = {
           mrdList:mrdList,
           opcode:'api', 
           apiList:apiList
        };
        
        // Ajax Post Send
        $.ajax({
           type: "POST",                                       // http method
           url: requestUrl,                                    // http url
           data : JSON.stringify(requestData),
           dataType : 'text',
           contentType: "application/x-www-form-urlencoded; charset=UTF-8",
           error: function() {        	   
               //Crownix Client Agent가 없는 경우에는 첨부없이 Outlook 정상 동작하도록 처리 
        	   window.location.href = link;
           },
           success: function(response) {   
              var responseStr = jQuery.parseJSON(response.responseText);
              //alert( JSON.stringify(responseStr) );
           }
        });
		
	} else {
		rdObjects[0].SendMailEx2(0, user_eml+"", lpSubject +"", content_val, unescape(mailAN_return) +"", "", "", lpAttachFileName+"");
	}
}
/**
 * RD 파일명을 고유하기 주기 위함
 */
function getTimeStamp() {
	var d=new Date();
	var s=""+d.getHours()+""+d.getMinutes()+""+d.getSeconds();
	//var s = ""+d.getHours()+""+d.getMinutes()+""+d.getSeconds()+""+d.getMiliseconds();
	return s;
}
/**
 * 파일 패스+파일명 형태에서 파일명을 분리(1번은 PDF파일이므로 2번부터)
 */
function setAttOnlyFileName() {
	var formObj=document.frm1;
	// form값 초기화
	formObj.f_eml_file_nm2.value="";
	formObj.f_eml_file_nm3.value="";
	formObj.f_eml_file_nm4.value="";
	formObj.f_eml_file_nm5.value="";
	var f2=formObj.f_eml_file2.value;
	var f3=formObj.f_eml_file3.value;
	var f4=formObj.f_eml_file4.value;
	var f5=formObj.f_eml_file5.value;
	if (f2 != ""  && f2 != "undefined" && f2 != undefined ) {
		var splitFile=f2.split("\\");
		var splitFileName=splitFile[splitFile.length-1];
		if (splitFileName != ""  && splitFileName != "undefined" && splitFileName != undefined ) {
			formObj.f_eml_file_nm2.value=splitFileName;
		}
		if (splitFileName.indexOf(".") < 0) {
			formObj.f_eml_file2.focus();
			return false;
		}
	}
	if (f3 != ""  && f3 != "undefined" && f3 != undefined ) {
		var splitFile=f3.split("\\");
		var splitFileName=splitFile[splitFile.length-1];
		if (splitFileName != ""  && splitFileName != "undefined" && splitFileName != undefined ) {
			formObj.f_eml_file_nm3.value=splitFileName;
		}
		if (splitFileName.indexOf(".") < 0) {
			formObj.f_eml_file3.focus();
			return false;
		}
	}
	if (f4 != ""  && f4 != "undefined" && f4 != undefined ) {
		var splitFile=f4.split("\\");
		var splitFileName=splitFile[splitFile.length-1];
		if (splitFileName != ""  && splitFileName != "undefined" && splitFileName != undefined ) {
			formObj.f_eml_file_nm4.value=splitFileName;
		}
		if (splitFileName.indexOf(".") < 0) {
			formObj.f_eml_file4.focus();
			return false;
		}
	}
	if (f5 != ""  && f5 != "undefined" && f5 != undefined ) {
		var splitFile=f5.split("\\");
		var splitFileName=splitFile[splitFile.length-1];
		if (splitFileName != ""  && splitFileName != "undefined" && splitFileName != undefined ) {
			formObj.f_eml_file_nm5.value=splitFileName;
		}
		if (splitFileName.indexOf(".") < 0) {
			formObj.f_eml_file5.focus();
			return false;
		}
	}
	return true;
}

function FAX(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		formObj.fax_no.value=rtnVal; //fax
	}
	
	formObj.f_cmd.value=COMMAND01;
	formObj.target="ifr_hidden";
	formObj.action="./RPT_RD_0011.clt";
	formObj.submit();
}

function OUTLOOK(rtnVal){
	var formObj=document.frm1;
	// IE 의 X 아이콘으로 닫았을 경우가 아닌 대상자만 없는 경우
	if (rtnVal == "none") {
		rtnVal = "";
		formObj.mailAN_return.value = "";
		//select 버튼만 클릭해도 outlook과 연계
		//return;
	// IE 의 X 아이콘으로 닫았을 경우, OUTLOOK 실행 안되게 하기 위해
	}else if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var retMailTo=setANMailTo(rtnVal);
		if (retMailTo != "") {
			formObj.mailAN_return.value=retMailTo;
		}
	}
	
	// Mail Subject,Email Address Single Quotation 포함시 에러 발생하여 공백으로 Replace 처리
	
	// OutLook호출(ajax와의 동기화)
	setTimeout("sendMailAN(\'"+formObj.mailAN_return.value+"\'\,\'"+ user_eml.replaceAll("'", "") +"\'\,\'"+ lv_lpSubject.replaceAll("'", "") +"\'\,\'"+ lv_lpAttachFileName + "\' )", 1000);
	
}

function OUTLOOK2(rtnVal){
	var formObj=document.frm1;
	// 이메일 대상자가 없는경우
	if (rtnVal == "none") {
		rtnVal = "";
		formObj.mailAN_return.value = "";
		//select 버튼만 클릭해도 outlook과 연계
		//return;
	// IE 의 X 아이콘으로 닫았을 경우, OUTLOOK 실행 안되게 하기 위해
	}else if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		
		var retMailTo = setANMailTo(rtnVal);
		
		if (retMailTo != "") {
			formObj.mailAN_return.value = retMailTo;
		}
	}	
//	lv_lpSubject = lpSubject;
//	lv_lpAttachFileName = lpAttachFileName;
	
	// Mail Subject,Email Address Single Quotation 포함시 에러 발생하여 공백으로 Replace 처리
	
	// OutLook호출(ajax와의 동기화)
	setTimeout("sendMailAN(\'"+formObj.mailAN_return.value+"\'\,\'"+ user_eml.replaceAll("'", "") +"\'\,\'"+ lv_lpSubject.replaceAll("'", "") +"\'\,\'"+ lv_lpAttachFileName + "\' )", 1000);
	
}

function EMAIL_ADDR_SETUP(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined"|| rtnVal == "none" || rtnVal == undefined) {
		rtnVal = "";
		if(document.getElementById("mail_tab").style.display == "none"){
			document.getElementById("mail_tab").style.display="inline";

			if (isChrome) {
				var v_ratio = ($("#crownix-toolbar #crownix-toolbar-ratio div").text().replace("%","")) / 100;
				$("#m2soft-crownix-page").css("transform","scale("+v_ratio+")");
				$("#mail_tab").css("margin-top","100px");
				$("#m2soft-crownix-container").css("width","calc(100% - 508px)");
				$("#m2soft-crownix-page").css("width","calc(100% - 508px)");
			} else {
				$("#mail_tab").css("margin-top","50px");
				$("#mainTable").css("width","100%");
				$("#mainTable").css("padding-right",508);
			}
		}
		return;
	}else{
		if (typeof(rtnVal) != 'undefined' && rtnVal != undefined && rtnVal != "") {
			var rtnListArr=rtnVal.split('^^');
			//6301  [JAPT] Mail sending function related request - Requirement 5
			var strRtnTO="";
			var strRtnCC="";
			for(var i=0; i < rtnListArr.length ; i++) {
				var rtnArr=rtnListArr[i].split('@@');
					/*strRtn += rtnArr[1] + ";"; */
				if(rtnArr[2] == "1"){
					strRtnTO += rtnArr[1] + ";";  //TO
				}
				if(rtnArr[3] == "1"){
					strRtnCC += rtnArr[1] + ";"; //CC
				}
			}
			
			if (strRtnTO && strRtnTO.length > 0) {
				formObj.f_eml_to.value=strRtnTO;
			}
			
			if (strRtnCC && strRtnCC.length > 0) {
				formObj.f_eml_cc.value=strRtnCC;
			}
			
//			if (gToFlg =="TO" ) {
//				formObj.f_eml_to.value=strRtnTO;
//			} else if(gToFlg =="CC") {
//				formObj.f_eml_cc.value=strRtnCC;
//			} else {
//					formObj.f_eml_to.value=strRtnTO;
//					formObj.f_eml_cc.value=strRtnCC;
//			}
		}
		if(document.getElementById("mail_tab").style.display == "none"){
			document.getElementById("mail_tab").style.display="inline";
			
			if (isChrome) {
				var v_ratio = ($("#crownix-toolbar #crownix-toolbar-ratio div").text().replace("%","")) / 100;
				$("#m2soft-crownix-page").css("transform","scale("+v_ratio+")");
				$("#mail_tab").css("margin-top","100px");
				$("#m2soft-crownix-container").css("width","calc(100% - 508px)");
				$("#m2soft-crownix-page").css("width","calc(100% - 508px)");
			} else {
				$("#mail_tab").css("margin-top","50px");
				$("#mainTable").css("width","100%");
				$("#mainTable").css("padding-right",508);
			}
		}
	}
}

function setRptZoomRatioReq(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
    	RPT_ZOOM_RATIO = doc[1];
    }else{
    	//#5720 [IMPEX] PREVIEW SCREEN NOT CENTERED AND TOO ZOOMED IN
    	RPT_ZOOM_RATIO = "";
    }
}

function setUseActivexReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
		//N 으로 설정되어 있다면 Html5버젼으로, 아니면 ActiveX버젼으로 설정한다.
		PRN_USE_ACTIVEX = doc[1]=="N"?false:true;
	}
}

function setWasPortReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
		PRN_WAS_PORT = doc[1];
	}
}

//Jpn RD폴더 셋팅.
function rdSetter(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1] != "") {
			RD_path += doc[1];
		}
	}
}