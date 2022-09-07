/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PN_0140.js
*@FileTitle  : Arrival Notice
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/29
=========================================================*/
var rtnary=new Array(2);

function doWork(srcName){
	var formObj=document.frm1;
    switch(srcName) {
		case 'Print':
		case 'PREVIEW':			
			formObj.title.value='Arrival Notice';
			if(airSeaTp == "A"){			
				formObj.file_name.value = "arrival_notice_ai_hawb_01.mrd";				
			}else{
				// #829 [SI] Report Mgmt
				formObj.file_name.value="arrival_notice_oi_hbl_us_01.mrd";
			}
			// #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴
			var mailTitle = "";
			
			if(formObj.f_sel_radio[0].checked){
				mailTitle = formObj.f_sel_title.value;	
			}else{
				mailTitle = formObj.f_txt_title.value;
			}
			
			formObj.mailTitle.value = formObj.mailTitleTmp.value;
			formObj.mailTitle.value = formObj.mailTitle.value.replace("ARRIVAL NOTICE / INVOICE",mailTitle);
			
			var	opt_key = "ADD_AN_EML_TITLE_INFO";
			ajaxSendPost(addAnEmlTitleInfo, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
			
			var attachFileName = mailTitle.toLowerCase();
			
			for(var i=0; i<attachFileName.length; i++){
				attachFileName = attachFileName.replace(/\./g, "");
				attachFileName = attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
		    }
			
			formObj.attachFileName.value = attachFileName + formObj.file_name.value.replace(".mrd","").replace("arrival_notice","");
			
			//Parameter Setting
			var param='[' + formObj.f_intg_bl_seq.value + ']';			// [1]
			if(formObj.f_sel_radio[0].checked){
				param += '[' + formObj.f_sel_title.value + ']';				// [2]
			}else{
				param += '[' + formObj.f_txt_title.value + ']';				// [2]
			}
			
			param += '[' + ofcCd + ']';										// [3]
			param += '[' + usrEml + ']';									// [4]
			param += '[' + usrPhn + ']';									// [5]
			param += '[' + usrFax + ']';									// [6]
			if(formObj.f_show_frt.checked){
				param += '[' + 'Y' + ']';									// [7]
			}else{
				param += '[]';												// [7]
			}			
			param += '[' + formObj.f_cust_ref_no.value.toUpperCase() + ']';	//[8] House 전용	 
			
			param += '[' + usrnm + ']';										//[9]	 
			param += '[]';													//[10] Master 전용
			param += '[http://' + location.host + ']';						// [11] TODO 삭제되어야 함 > /rv 로 대처
			
			// #47347 - [BINEX] Arrival Notice 프린트 시 아래 담당자 정보가 출력물에 추가되어야 함 (office별 관리)
			param += '[' + formObj.f_cgor_pic_info.value + ']';				// [12]
			
			// #50494 - [BNX] AIR IMPORT HAWB에 FREIGHT OPTION A/N에 표기 안되도록
			if(formObj.f_show_frt_term.checked){
				param += '[' + 'Y' + ']';									// [13]
			}else{
				param += '[]';												// [13]
			}	
			
			//#6632 [JAPT] Arrival Notice - Additional modification request [ DEPLOY TARGET : ]
			if(formObj.trdp_local_name.value != ""){
				param += '[' + formObj.trdp_local_name.value + ']'; //[14]
			} else {
				param += '[]'; //[14]
			}
			
			if(formObj.trdp_tel.value != ""){
				param += '[' + formObj.trdp_tel.value + ']'; //[15]
			} else {
				param += '[]'; //[15]
			}
			
			if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA"){
				if(RD_path.indexOf("/letter/") == -1) {  
					RD_path += "letter/";
				}
			}else{
				//US / CA 제외 경로셋팅 옵션 제공
				var opt_key = "MRD_A4_FOLDER";
			    ajaxSendPost(rdSetter, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
			}
			
			param += ' /rv invRptUrl[' +RD_path + 'invoice_01.mrd]';					//[20150330 OJG]  [invRptUrl] : Invoice Report URL 추가
			
			// TB_SYS_PROP에 'PRNT_LOGIN_USR', 'Y'이면
			// Login한 USERID를 파라미터로 넘긴다
			if (prn_login_usr == "Y"){
				param += ' loginUsrNm['+usrnm+']';					//[loginUsrNm]
				param += ' loginUsrTel['+usrPhn+']';					//[loginUsrTel] 
				param += ' loginUsrFax['+usrFax+']';					//[loginUsrFax]
				param += ' loginUsrEml['+usrEml+']';					//[loginUsrEml] 
			}
			
			formObj.rd_param.value=param;
			if (airSeaTp == "S") {
				formObj.rpt_biz_tp.value="OIH";
			} else if (airSeaTp == "A") {
				formObj.rpt_biz_tp.value="AIH";
			}
			formObj.rpt_biz_sub_tp.value="AN";
			formObj.rpt_pdf_file_nm.value=getPdfFileNm();
			
			
			//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청
			if(formObj.f_sel_radio[0].checked){
				formObj.rpt_file_name_title.value = formObj.f_sel_title.value + "_"+formObj.f_bl_no.value;
			}else{
				formObj.rpt_file_name_title.value = formObj.f_txt_title.value + "_"+formObj.f_bl_no.value;
			}  				
			var t_attachFileName = formObj.rpt_file_name_title.value;
			t_attachFileName = t_attachFileName.replace(/\./g, "");
			t_attachFileName = t_attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
			formObj.rpt_file_name_title.value = t_attachFileName;
			
			if(srcName == "PREVIEW") {
				$("#prt_option").val("opt_preview");
			} else if(srcName == "PRINT") {
				$("#prt_option").val("opt_print");
			}

			if($("#chk_auto_close").is(":checked")){
				doWork("CLOSE");
			}
			
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
		case "CLOSE":
	    	window.close();
    	break;
    	//#6632 [JAPT] Arrival Notice - Additional modification request [ DEPLOY TARGET : ]
		case "PARTNER_POPLIST":
			rtnary=new Array(1);
	   		var cstmTpCd='OT';
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
	   		callBackFunc = "PARTNER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
       break;
    }
}
function changeSel(){
	var formObj=document.frm1; 
	if(formObj.f_sel_radio[0].checked){
		if(formObj.f_sel_title.value.indexOf("FREIGHT INVOICE") != -1){
			formObj.f_show_frt.checked=true;
		}else{
			formObj.f_show_frt.checked=false;
		}
	}
}
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	var formObj=document.frm1; 
	var intgBlSeq=formObj.intg_bl_seq.value;
	ajaxSendPost(getIntgBlInfo, 'reqVal', '&goWhere=aj&bcKey=getIntgBlInfo&intg_bl_seq='+intgBlSeq, './GateServlet.gsl');
	
	// #50494 - [BNX] AIR IMPORT HAWB에 FREIGHT OPTION A/N에 표기 안되도록
	if (airSeaTp == "A") {
		var opt_key = "AI_AN_FRT_TERM_DFT";
		ajaxSendPost(setAiAnFrtTermDftReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	}
	//#6632 [JAPT] Arrival Notice - Additional modification request [ DEPLOY TARGET : ]
	var opt_key = "AN_SHW_DO_ISS_OPT";
	ajaxSendPost(getDoIssOpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
}
function getIntgBlInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var result=doc[1].split('^@');
		if(result[2]!=null && result[2]!='null')
			frm1.f_cust_ref_no.value=result[2];			
		else
			frm1.f_cust_ref_no.value='';		
	}else{
		frm1.f_cust_ref_no.value='';
	}
}

function setAiAnFrtTermDftReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == "N")
			formObj.f_show_frt_term.checked = false;
	}
}

//#6632 [JAPT] Arrival Notice - Additional modification request [ DEPLOY TARGET : ]
function getDoIssOpt(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == "Y")
			jQuery('#showDOIssOpt_tr').css('display','');
	}
}

function getPdfFileNm(){
	var formObj=document.frm1;
	var pdfFileNm = "";
	var bl_no = formObj.f_bl_no.value;
	
	if (bl_no == "" || bl_no == "undefined" || bl_no == undefined) {
		return "";
	}
	pdfFileNm = "AN_HBL_"+bl_no;	
	return pdfFileNm;
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

function addAnEmlTitleInfo(reqVal) {
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		if(doc[1] != "NNNN"){
			var title = formObj.mailTitle.value;
			
			// #4432 [Great Luck] A/N Email Title
			if (title.indexOf("[") > 0) title = title.substring(0,title.indexOf("["));
			
			title += ' ['
			if(doc[1].substr(0,1)=="Y")
				title += 'HBL No : ' + formObj.f_bl_no.value + ', ';
			if(doc[1].substr(1,1)=="Y")
				title += 'Filing No : ' + formObj.filing_no.value + ', ';
			if(doc[1].substr(2,1)=="Y")
				title += 'MBL No : ' + formObj.mbl_no.value + ', ';
			if(doc[1].substr(3,1)=="Y"){
				if(formObj.f_cust_ref_no.value != null && formObj.f_cust_ref_no.value != 'null' && formObj.f_cust_ref_no.value != '')
					title += 'Cust Ref No : ' + formObj.f_cust_ref_no.value + ', ';
			}
			var titleLen = title.length-2;
			title = title.substring(0, titleLen); 
			title += ']';
			formObj.mailTitle.value = title;
		}
	}
}

$(document).ready(function(){
	var cookie_key = "rpt_prn_0140_auto_close";
	if(getCookie(cookie_key) == "1") {
		$("#chk_auto_close").attr("checked", true);
	}
    $("#chk_auto_close").change(function(){
        if($("#chk_auto_close").is(":checked")){
			setCookie(cookie_key, "1", 365);
        }else{
            setCookie(cookie_key, "", -1);
        }
	});	
}); 

//#6632 [JAPT] Arrival Notice - Additional modification request [ DEPLOY TARGET : ]
function PARTNER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.trdp_local_name.value = rtnValAry[10];
		formObj.trdp_tel.value = rtnValAry[4];
	}
}