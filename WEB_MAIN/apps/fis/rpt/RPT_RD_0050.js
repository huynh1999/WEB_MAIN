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

function loadPage() {
	setRdInit(rdObjects[0]);
	document.getElementById("mainTable").height=screen.height - 150;
	$("#mainTable").css("padding-right",0);
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
	objRd.height = (screen.height - 220) + "px";
	if(formObj.fileName.value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || formObj.fileName.value=="package_label.mrd" || formObj.fileName.value=="check_journal_01.mrd"){
		objRd.AutoAdjust=false;
//		objRd.HideToolbar();
		objRd.ZoomRatio=100;
	}else{
		objRd.AutoAdjust=2;
//		objRd.HideToolbar();
//		objRd.ZoomRatio = 120;
	}
	objRd.SetSaveDialog("C:\\", "", "5");
//	objRd.SetSaveDialogEx("", "", "xls@doc@pdf@tif@bmp", "pdf");
	//objRd.DisableToolbar(13);
	//objRd.DisableToolbar(1);
	objRd.DisableToolbar(14);
	objRd.DisableToolbar(16);
	//objRd.DisableToolbar(17);
	//objRd.HideStatusbar();
	objRd.ViewShowMode(0);
	objRd.SetBackgroundColor(255,255,255); //Case Sensitive
	objRd.SetPageLineColor(255,255,255);	
	objRd.ApplyLicense("0.0.0.0");					//License Checking
	rdOpen(objRd, document.frm1);
}

//function rdOpen(objRd, formObj) {
//if (user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA") {
//	RD_path += "letter/";
//	if (formObj.fileName.value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || formObj.fileName.value=="package_label.mrd") {
//		objRd.FileOpen(RD_path+formObj.fileName.value, RDServer+'/rp '+formObj.rdParam.value);
//	} else {
//		objRd.FileOpen(RD_path+formObj.fileName.value, RDServer+'/rp '+formObj.rdParam.value + " /riprnmargin");
//	}
//} else {
//	objRd.FileOpen(RD_path+formObj.fileName.value, RDServer+'/rp '+formObj.rdParam.value);
//}
//}

function rdOpen(objRd, formObj) {
	objRd.SetAppendReport(1);


	var fileNmArr  = formObj.fileName.value.split("^@@^");
	var rdParamArr = formObj.rdParam.value.split("^@@^");

	if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA"){
		RD_path += "";
	}
	for(var i = 0 ; i < fileNmArr.length ; i ++){
		if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA" || user_ofc_cnt_cd=="DE"){
			if(fileNmArr[i] == "pfm_profit_month_multi.mrd" ){
				// 동기방식 적용
				objRd.FileOpen(RD_path+fileNmArr[i], RDServer+'/ruseurlmoniker [0] /rwait /rp '+rdParamArr[i] + " /riprnmargin");
			} else {
				// 기존방식 유지
				if(fileNmArr[i].value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || fileNmArr[i].value=="package_label.mrd"){
					objRd.FileOpen(RD_path+fileNmArr[i], RDServer+'/rwait /rp '+rdParamArr[i]);
				}else{
					objRd.FileOpen(RD_path+fileNmArr[i], RDServer+'/rwait /rp '+rdParamArr[i]);
				}
			}
		}else{
			objRd.FileOpen(RD_path+fileNmArr[i], RDServer+'/rwait /rp '+rdParamArr[i]);
		}
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
				ajaxSendPost(getRptFaxParameters, "reqVal", "&goWhere=aj&bcKey=getRptFaxParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
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
				ajaxSendPost(getRptMailParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
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
					ajaxSendPost(getRptMailANParameters2, "reqVal", "&goWhere=aj&bcKey=getRptMailPopParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
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
				ajaxSendPost(getRptSmtpMailParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
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
					ajaxSendPost(getRptSmtpMailParametersCc, "reqVal", "&goWhere=aj&bcKey=getRptMailParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
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
    		frm1.f_eml_title.value=frm1.mailTitle.value;
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
    		// #5026 [King Freight LA, NJ] Balloon error 지원요청
    		formObj.rdParam.value += " /rfn [http://localhost:"+portNo+"/RDServer/rdagent.jsp]";
    		
    		formObj.f_cmd.value=MODIFY;
    		formObj.target="ifr_hidden";
			formObj.action="./RPT_RD_0011.clt";
			formObj.submit();
    	break;
    	case "Mail_Close":
			// window.resizeBy(-500,0);
			document.getElementById("mail_tab").style.display="none";
			$("#mainTable").css("padding-right",0);
    	break;
    	case "EML_TO_POPLIST":
    		var formObj=document.frm1;
    		//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
			var rptBizSubTp=formObj.rpt_biz_sub_tp.value;
//			if (rptBizSubTp == "AN") {
				setMailToAndCC(true,rptBizSubTp);
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
				setMailToAndCC(false,rptBizSubTp);
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
			rdObjects[0].PrintDialog();
			//rdObjects[0].PRINTFINISH;
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
function setMailToAndCC(toFlg,rptBizSubTp){
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
			ajaxSendPost(getRptMailANParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailPopParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
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
				ajaxSendPost(getRptMailANParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailPopParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
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
	//if (mailAN_return != "") {
	rdObjects[0].SendMailEx2(0, user_eml+"", lpSubject +"", "", unescape(mailAN_return) +"", "", "", lpAttachFileName+"");
	//}
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
	
	// OutLook호출(ajax와의 동기화)
	setTimeout("sendMailAN(\'"+formObj.mailAN_return.value+"\'\,\'"+ user_eml +"\'\,\'"+ lv_lpSubject +"\'\,\'"+ lv_lpAttachFileName + "\' )", 1000);
	
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
	// OutLook호출(ajax와의 동기화)
	setTimeout("sendMailAN(\'"+formObj.mailAN_return.value+"\'\,\'"+ user_eml +"\'\,\'"+ lv_lpSubject +"\'\,\'"+ lv_lpAttachFileName + "\' )", 1000);
	
}

function EMAIL_ADDR_SETUP(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined"|| rtnVal == "none" || rtnVal == undefined) {
		rtnVal = "";
		if(document.getElementById("mail_tab").style.display == "none"){
			document.getElementById("mail_tab").style.display="inline";
			$("#mainTable").css("width","100%");
			$("#mainTable").css("padding-right",508);
		}
		return;
	}else{
		if (typeof(rtnVal) != 'undefined' && rtnVal != undefined && rtnVal != "") {
			var rtnListArr=rtnVal.split('^^');
			var strRtn="";
			for(var i=0; i < rtnListArr.length ; i++) {
				var rtnArr=rtnListArr[i].split('@@');
				strRtn +=  rtnArr[1] + ";";
			}
			if (gToFlg) {
				formObj.f_eml_to.value=strRtn;
			} else {
				formObj.f_eml_cc.value=strRtn;
			}
		}
		if(document.getElementById("mail_tab").style.display == "none"){
			document.getElementById("mail_tab").style.display="inline";
			$("#mainTable").css("width","100%");
			$("#mainTable").css("padding-right",508);
		}
	}
}