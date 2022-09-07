var rtnary=new Array(1);
var callBackFunc = "";
function loadPage() {
	document.frm1.to_date.value=getTodayStr(); 
}
function doWork(srcName, curObj) {
	var formObj=document.frm1;
	switch (srcName){
	case "SEARCH":
		formObj.f_bl_no.value=trim(formObj.f_bl_no.value);
		if (formObj.f_bl_no.value == ''){
			//[B/L No.]를 먼저 입력하십시오!
			alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEE_BMD_0062.12");
			formObj.f_bl_no.focus();
		} 
		else {
			formObj.f_cmd.value=SEARCH;
			formObj.action="./CMM_POP_0321.clt";
			formObj.submit();
		}
		break;
	case "PRINT":
		// 프린트
		formObj.file_name.value='proof_of_delivery_01.mrd';
		formObj.title.value='P.O.D.';
		// Parameter Setting
		var param='';
		param += '[' + formObj.intg_bl_seq.value + ']'; // $1
		param += '[' + formObj.ofc_eng_nm.value + ']';
		param += '[' + formObj.ofc_locl_nm.value + ']';
		param += '[' + formObj.ofc_phn.value + ']';  //$4
		param += '[' + formObj.ofc_fax.value + ']';  //$5
		param += '[' + formObj.eml.value + ']'; // $6
		param += '[' + formObj.select_title_cd.value + ']';
		param += '[' + formObj.trdp_nm.value + ']'; 	//$8
		param += '[' + formObj.trdp_addr.value + ']'; 
		param += '[' + formObj.trdp_phn.value + ']';
		param += '[' + formObj.trdp_fax.value + ']'; // $11
		
		var toDate = formObj.to_date.value.split("-");
		param += '[' + toDate[2] + toDate[0] + toDate[1] + ']'; 
		param += '[' + formObj.by_user.value + ']';
		param += '[' + formObj.delivery_trdp_nm.value + ']'; //$14
		param += '[' + formObj.delivery_trdp_addr.value + ']'; 
		param += '[' + formObj.delivery_trdp_phn.value + ']'; // $16
		param += '[' + formObj.delivery_trdp_fax.value + ']'; 
		param += '[' + formObj.delivery_on.value + ']'; 
		param += '[' + formObj.singed_by.value + ']'; 
		param += '[' + formObj.remark.value + ']'; 
		param += '[' + formObj.trdp_pic_nm.value + ']';//21
		param += '[' + formObj.delivery_trdp_pic_nm.value + ']';     //22
		formObj.rd_param.value=param;
		formObj.rpt_biz_tp.value="OIH";
		formObj.rpt_biz_sub_tp.value="POD";
		formObj.rpt_trdp_cd.value=formObj.trdp_cd.value;
		popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
	case "TO_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
		rtnary=new Array(1);
		rtnary[0]="1";
		rtnary[1]=formObj.trdp_nm.value;
		rtnary[2]=window;
		
		callBackFunc = "TO_POPLIST";
		modal_center_open('./CMM_POP_0010.clt?callTp=ALL', rtnary, 1150,650,"yes");
		break;
	case "DELIVERY_TO_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
		rtnary=new Array(1);
		rtnary[0]="1";
		rtnary[1]=formObj.delivery_trdp_nm.value;
		rtnary[2]=window;
		var rtnVal=window;
		callBackFunc = "DELIVERY_TO_POPLIST";
		modal_center_open('./CMM_POP_0010.clt?callTp=ALL', rtnary, 1150,650,"yes");
		break;
		/* jsjang 2013.7.17 short cut key */
		case "CLOSE":
			ComClosePopup(); 
		break;		
	}
}

function TO_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.trdp_cd.value=rtnValAry[0];// trdp_cd
		formObj.trdp_nm.value=rtnValAry[10];// locl_nm
		//formObj.trdp_addr.value=rtnValAry[7];// lgl_addr
		formObj.trdp_addr.value=rtnValAry[37];//dflt_addr
		formObj.trdp_pic_nm.value=rtnValAry[3];// pic_nm
		formObj.trdp_phn.value=rtnValAry[4];// pic_phn
		formObj.trdp_fax.value=rtnValAry[5];// pic_fax
	}
}

function DELIVERY_TO_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.delivery_trdp_cd.value=rtnValAry[0];// delivery_trdp_cd
		formObj.delivery_trdp_nm.value=rtnValAry[10];// locl_nm
		//formObj.delivery_trdp_addr.value=rtnValAry[7];// lgl_addr
		formObj.delivery_trdp_addr.value=rtnValAry[37];//dflt_addr
		formObj.delivery_trdp_pic_nm.value=rtnValAry[3];// pic_nm
		formObj.delivery_trdp_phn.value=rtnValAry[4];// pic_phn
		formObj.delivery_trdp_fax.value=rtnValAry[5];// pic_fax
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
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="trdpcode_dest"){
				formObj.trdp_cd.value=masterVals[0];//trdp_cd
				//formObj.trdp_addr.value=masterVals[1];//shrt_nm
				formObj.trdp_addr.value=masterVals[29];//dflt_addr
				formObj.trdp_nm.value=masterVals[3];//full_nm
				formObj.trdp_phn.value=masterVals[11];//full_nm
				formObj.trdp_fax.value=masterVals[12];//full_nm
			}
			if(CODETYPE =="trdpcode_delivery"){
				formObj.delivery_trdp_cd.value=masterVals[0];//delivery_trdp_cd
				//formObj.delivery_trdp_addr.value=masterVals[1];//shrt_nm
				formObj.delivery_trdp_addr.value=masterVals[29];//dflt_addr
				formObj.delivery_trdp_nm.value=masterVals[3];//full_nm
				formObj.delivery_trdp_phn.value=masterVals[11];;//full_nm
				formObj.delivery_trdp_fax.value=masterVals[12];;//full_nm
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
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEE_BMD_0062.218");		
	}
}