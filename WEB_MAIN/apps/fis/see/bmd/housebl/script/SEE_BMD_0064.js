var rtnary=new Array(1);
function loadPage() {
	frm1.to_date.value=getTodayStr(); 
}
function doWork(srcName, curObj) {
	switch (srcName){
	case "SEARCH":
		frm1.f_bl_no.value=trim(frm1.f_bl_no.value);
		if (frm1.f_bl_no.value == '') {
			//[B/L No.]를 먼저 입력하십시오!
			alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEE_BMD_0064.12");
			frm1.f_bl_no.focus();
		} 
		else {
			frm1.f_cmd.value=SEARCH;
			frm1.action="./CMM_POP_0321.clt";
			frm1.submit();
		}
		break;
	case "PRINT":
		// /////////////////////////////////////////////////////////
		// 프린트
		var formObj=document.frm1;
		formObj.file_name.value='usda_hold_notice_01.mrd';
		formObj.title.value='USDA Hold Notice';
		// Parameter Setting
		var param='';
		param += '[' + formObj.intg_bl_seq.value + ']'; 	// $1
		param += '[' + formObj.ofc_eng_nm.value + ']'; 		// $2
		param += '[' + formObj.ofc_locl_nm.value + ']'; 	// $3
		param += '[' + formObj.ofc_phn.value + ']'; 		// $4
		param += '[' + formObj.ofc_fax.value + ']'; 		// $5
		param += '[' + formObj.eml.value + ']'; 			// $6
		param += '[' + formObj.f_title.value + ']';  		// $7
		param += '[' + formObj.to_date.value + ']';  		// $8
		param += '[' + formObj.by_user.value + ']'; 		// $9
		param += '[' + formObj.commercial.value + ']';  	// $10
		param += '[' + formObj.fumigation.value + ']';  	// $11
		param += '[' + formObj.guarantee.value + ']';  		// $12
		
		// #46822 - [IML] USDA HOLD NOTICE - Container Retrieve
		var cntr_info = formObj.cntr_info.value;
		
		param += '[' + cntr_info + ']';  					// $13
		param += '[' + formObj.remark.value + ']';  		// $14
		param += '[' + cntr_info.split("\n").length + ']';  // $15
		param += '[' + formObj.f_sub_title.value + ']';  	// $16
		
		formObj.rd_param.value=param;
		formObj.rpt_biz_tp.value="OIH";
		formObj.rpt_biz_sub_tp.value="UH";
		//formObj.rpt_trdp_cd.value=formObj.cne_trdp_cd.value + "', '" +  formObj.ntfy_trdp_cd.value;
		//formObj.rpt_cc_trdp_cd.value=formObj.cust_trdp_cd.value;
		formObj.rpt_pdf_file_nm.value=getPdfFileNm();
		
		// #48538 - [BINEX] OI USDA HOLD NOTICE Title Not Changing
		//formObj.mailTitle.value=formObj.f_title.value + ' [HBL No : ' + formObj.hbl_no.value + ']'; 
		//formObj.mailTitle.value='USDA Hold Notice [HBL No : ' + formObj.hbl_no.value + ']';
		// alert(param);
		
		//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청
		formObj.rpt_file_name_title.value = formObj.f_title.value+"_"+formObj.hbl_no.value;			
		var t_attachFileName = formObj.rpt_file_name_title.value;
		
		formObj.mailTitle.value = formObj.f_title.value + ' [HBL No : ' + formObj.hbl_no.value + ']'; 
		
		
		t_attachFileName = t_attachFileName.replace(/\./g, "");
		t_attachFileName = t_attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
		formObj.rpt_file_name_title.value = t_attachFileName;
		
		popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		// /////////////////////////////////////////////////////////
		break;
	case "TO_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
		rtnary=new Array(1);
		rtnary[0]="1";
		rtnary[1]="";
		rtnary[2]=window;
		var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt?callTp=PR',  rtnary,"scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px"  , true);
					
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
		} else {
			var rtnValAry=rtnVal.split("|");
			frm1.trdp_cd.value=rtnValAry[0];// trdp_cd
			frm1.trdp_nm.value=rtnValAry[2];// eng_nm
			frm1.trdp_addr.value=rtnValAry[7];// eng_addr
			//frm1.org_rout_pic.value = rtnValAry[3];// pic_nm
			frm1.trdp_phn.value=rtnValAry[4];// pic_phn
			frm1.trdp_fax.value=rtnValAry[5];// pic_fax
		}
		break;
	case "DELIVERY_TO_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
		rtnary=new Array(1);
		rtnary[0]="1";
		rtnary[1]="";
		rtnary[2]=window;
		var rtnVal=window;
 ComOpenWindow('./CMM_POP_0010.clt?callTp=PR',  rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
		
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
		} else {
			var rtnValAry=rtnVal.split("|");
			frm1.delivery_trdp_cd.value=rtnValAry[0];// delivery_trdp_cd
			frm1.delivery_trdp_nm.value=rtnValAry[2];// eng_nm
			frm1.delivery_trdp_addr.value=rtnValAry[7];// eng_addr
			//frm1.org_rout_pic.value = rtnValAry[3];// pic_nm
			frm1.delivery_trdp_phn.value=rtnValAry[4];// pic_phn
			frm1.delivery_trdp_fax.value=rtnValAry[5];// pic_fax
		}
		break;
		/* jsjang 2013.7.17 short cut key */
		case "CLOSE":
  ComClosePopup(); 
		break;			
	}
}
// --------------------------------------------------------------------------------------------------------------
// AJAX 설정
//--------------------------------------------------------------------------------------------------------------
/**
 * code name select
 */
function codeNameAction2(str, obj, tmp){
	CODETYPE=str;
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type=str.substring(0,8);
	if(str == "trdpcode_dest" || str == "trdpcode_delivery") {
		s_type="trdpcode";
	}
	if (s_code != "") {
		if (tmp == "onKeyDown") {
			if (event.keyCode == 13) {
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal',
						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
								+ '&s_code=' + s_code, './GateServlet.gsl');
			}
		} else if (tmp == "onBlur") {
			if (s_code != "") {
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal',
						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
								+ '&s_code=' + s_code, './GateServlet.gsl');
			}
		}
	} else {
		if (CODETYPE == "trdpcode_dest") {
			formObj.trdp_cd.value="";//trdp_cd
			formObj.trdp_addr.value="";//shrt_nm
			formObj.trdp_nm.value="";//full_nm
			formObj.trdp_phn.value="";//full_nm
			formObj.trdp_fax.value="";//full_nm
		}
		if (CODETYPE == "trdpcode_delivery") {
			formObj.delivery_trdp_cd.value="";//delivery_trdp_cd
			formObj.delivery_trdp_addr.value="";//shrt_nm
			formObj.delivery_trdp_nm.value="";//full_nm
			formObj.delivery_trdp_phn.value="";//full_nm
			formObj.delivery_trdp_fax.value="";//full_nm
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="trdpcode_dest"){
				formObj.trdp_cd.value=masterVals[0];//trdp_cd
				formObj.trdp_addr.value=masterVals[2];//shrt_nm
				formObj.trdp_nm.value=masterVals[3];//full_nm
				formObj.trdp_phn.value="";//full_nm
				formObj.trdp_fax.value="";//full_nm
			}
			if(CODETYPE =="trdpcode_delivery"){
				formObj.delivery_trdp_cd.value=masterVals[0];//delivery_trdp_cd
				formObj.delivery_trdp_addr.value=masterVals[2];//shrt_nm
				formObj.delivery_trdp_nm.value=masterVals[3];//full_nm
				formObj.delivery_trdp_phn.value="";//full_nm
				formObj.delivery_trdp_fax.value="";//full_nm
			}
		}else{
			if(CODETYPE =="trdpcode_dest"){
				formObj.trdp_cd.value="";//trdp_cd
				formObj.trdp_addr.value="";//shrt_nm
				formObj.trdp_nm.value="";//full_nm
				formObj.trdp_phn.value="";//full_nm
				formObj.trdp_fax.value="";//full_nm
			}
			if(CODETYPE =="trdpcode_delivery"){
				formObj.delivery_trdp_cd.value="";//delivery_trdp_cd
				formObj.delivery_trdp_addr.value="";//shrt_nm
				formObj.delivery_trdp_nm.value="";//full_nm
				formObj.delivery_trdp_phn.value="";//full_nm
				formObj.delivery_trdp_fax.value="";//full_nm
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEE_BMD_0064.203");		
	}
}

function getPdfFileNm(){
	var formObj=document.frm1;
	var pdfFileNm = "";
	var bl_no = formObj.hbl_no.value;
	
	if (bl_no == "" || bl_no == "undefined" || bl_no == undefined) {
		return "";
	}
	pdfFileNm = "USDA_HBL_"+bl_no;	
	return pdfFileNm;
}
