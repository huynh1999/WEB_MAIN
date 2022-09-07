var rtnary=new Array(1);
var callBackFunc = "";

function loadPage() {
	var d=new Date();
	document.frm1.f_to_date.value=getTodayStr() + "  " + leadingZeros(d.getHours(),2) + ":" + leadingZeros(d.getMinutes(),2);
	
	// #47366 [Impex]Deliver Order Title 선택기능 추가 OFC의 CNT_CD가 DE이면 제목을 변경한다. 
	var formObj=document.frm1;
	if (formObj.ofc_cnt_cd.value == 'DE') {
		formObj.select_title.selectedIndex = 2;
	} else {
		formObj.select_title.selectedIndex = 0;
	}
}
function leadingZeros(n, digits){
	var zero='';
	n=n.toString();
	if(n.length < digits){
		for(var i=0 ; i<digits - n.length ; i++){
			zero += '0';
		}
	}
	return zero + n;
}
function doWork(srcName, curObj) {
	var formObj=document.frm1;
	switch (srcName){
	case "SEARCH":
		if (formObj.f_bl_no.value == '') {
			//[B/L No.]를 먼저 입력하십시오!
			alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEI_DOC_1080.25");
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
		formObj.file_name.value='release_order.mrd';
		formObj.title.value='Release Order';
		// Parameter Setting
		var param='';
		param += '[' + formObj.intg_bl_seq.value + ']'; // $1
		param += '[' + formObj.ofc_eng_nm.value + ']';
		param += '[' + formObj.eml.value + ']';
		//param += '[' + formObj.select_title.value + ']';
		param += '[' + formObj.select_title.options[formObj.select_title.selectedIndex].text + ']';//$4
		param += '[' + formObj.user_name.value + ']';
		param += '[' + formObj.f_to_date.value + ']'; // $6
		param += '[' + formObj.cfs_trdp_cd.value + ']'; //$7
		param += '[' + formObj.trdp_nm.value + ']';  
		param += '[' + formObj.trdp_addr.value + ']'; 
		param += '[' + formObj.trdp_phn.value + ']';
		param += '[' + formObj.trdp_fax.value + ']'; // $11
		param += '[' + formObj.special_instructions.value + ']';
		param += '[' + formObj.trdp_eml.value + ']';//13
		param += '[' + formObj.trdp_pic_nm.value + ']';//14
		param += '[' + formObj.tel.value + ']';//15
		param += '[' + formObj.fax.value + ']';//16
		param += '[' + formObj.cfs_trdp_addr.value + ']';//17
		param += '[' + formObj.cfs_trdp_nm.value + ']';//18		
		param += '[' + formObj.cfs_trdp_phn.value + ']';//19
		param += '[' + formObj.cfs_trdp_fax.value + ']';//20
		param += '[' + formObj.cfs_trdp_pic_nm.value + ']';//21
		param += '[' + formObj.cfs_trdp_eml.value + ']';//22
		formObj.rd_param.value=param;
		formObj.rpt_biz_tp.value="OIH";
		formObj.rpt_biz_sub_tp.value="RO";
		// #51943 - [BNX] OCEAN IMPORT RELEASE ORDER
		
		//formObj.rpt_trdp_cd.value=formObj.trdp_cd.value;
		//#3103 [BINEX] AFTER V450, RELEASE ORDER EMAIL DOES NOT INCLUDE C/BROKER
		//formObj.rpt_trdp_cd.value = formObj.cfs_trdp_cd.value  + "', '" +  formObj.trdp_cd.value;
		formObj.rpt_trdp_cd.value = formObj.cfs_trdp_cd.value  + "', '" +  formObj.trdp_cd.value + "', '" +  formObj.brk_trdp_cd.value
									+ "', '" + formObj.ntfy_trdp_cd.value ; //#5621 [King Freight] Release Order to include Notify Party Email Contact
		
		formObj.rpt_cc_trdp_cd.value=formObj.trdp_cd.value + "', '" +  formObj.ntfy_trdp_cd.value;
		//formObj.rpt_cc_trdp_cd.value=formObj.trdp_cd.value + "', '" +  formObj.brk_trdp_cd.value + "', '" +  formObj.ntfy_trdp_cd.value;
		//formObj.mailTitle.value='Release Order [HBL No : ' + formObj.f_hbl_no.value + ']'; //[20140112 OJG] 이메일 제목추가
		
		//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청	
		// #5288 - [KING FREIGHT] OIH RELEASE ORDER TITLE ADD OPTIONS
		var t_attachFileName = formObj.select_title.options[formObj.select_title.selectedIndex].text + "_" + formObj.f_hbl_no.value;
		/*if (t_attachFileName == "RELEASE"){
			t_attachFileName = "RELEASE ORDER/TURNOVER_"+formObj.f_hbl_no.value;
		}else if (t_attachFileName == "BANK"){
			t_attachFileName = "BANK RELEASE REQUIRED_"+formObj.f_hbl_no.value;
		}else{ 
			t_attachFileName = "FAX LIEFERSCHEIN_"+formObj.f_hbl_no.value;
		}*/
		// 메일 타이틀 변경 
		formObj.mailTitle.value=t_attachFileName;
		t_attachFileName = t_attachFileName.replace(/\./g, "");
		t_attachFileName = t_attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
		formObj.rpt_file_name_title.value = t_attachFileName;
		
		formObj.send_type.value = "OIH_REL_ORDER";
		
		popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
	case "PARTNER_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
		rtnary=new Array(1);
		rtnary[0]="1";
		rtnary[1]=formObj.trdp_nm.value;
		rtnary[2]=window;
		
		callBackFunc = "PARTNER_POPLIST";
	    modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
		
	    
		break;
	case "SEND_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
		rtnary=new Array(1);
		rtnary[0]="1";
		rtnary[1]=formObj.cfs_trdp_nm.value;
		rtnary[2]=window;
		
		callBackFunc = "SEND_POPLIST";
	    modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
		
		break;
		/* jsjang 2013.7.17 short cut key */
		case "CLOSE":
			window.close(); 
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
	if(str == "trdpcode_send" || str == "trdpcode_dest") {
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
		if (CODETYPE == "trdpcode_send") {
			formObj.cfs_trdp_cd.value="";//trdp_cd
			formObj.cfs_trdp_nm.value="";//shrt_nm
			formObj.cfs_addr.value="";
			formObj.cfs_trdp_phn.value="";//full_nm
			formObj.cfs_trdp_fax.value="";//full_nm
			formObj.cfs_trdp_eml.value="";//13
			formObj.cfs_trdp_pic_nm.value="";//14
		}
		if (CODETYPE == "trdpcode_dest") {
			formObj.trdp_cd.value="";//trdp_cd
			formObj.trdp_addr.value="";//shrt_nm
			formObj.trdp_nm.value="";//full_nm
			formObj.trdp_phn.value="";//full_nm
			formObj.trdp_fax.value="";//full_nm
			formObj.trdp_eml.value="";//13
			formObj.trdp_pic_nm.value="";//14
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
			if(CODETYPE =="trdpcode_send"){
				formObj.cfs_trdp_cd.value=masterVals[0];//trdp_cd
				formObj.cfs_trdp_nm.value=masterVals[3];//shrt_nm
				formObj.cfs_trdp_addr.value=masterVals[29];//dflt_addr
				formObj.cfs_trdp_phn.value=masterVals[11];//full_nm
				formObj.cfs_trdp_fax.value=masterVals[12];//full_nm
				formObj.cfs_trdp_eml.value=masterVals[19];//13
				formObj.cfs_trdp_pic_nm.value=masterVals[10];//14
			}
			if(CODETYPE =="trdpcode_dest"){
				formObj.trdp_cd.value=masterVals[0];//trdp_cd
				//formObj.trdp_addr.value=masterVals[1];//shrt_nm
				formObj.trdp_addr.value=masterVals[29];//dflt_addr
				formObj.trdp_nm.value=masterVals[3];//full_nm
				formObj.trdp_phn.value=masterVals[11];//full_nm
				formObj.trdp_fax.value=masterVals[12];//full_nm
				formObj.trdp_eml.value=masterVals[19];//13
				formObj.trdp_pic_nm.value=masterVals[10];//14
			}
		}else{
			//alert();
			if(CODETYPE =="trdpcode_send"){
				formObj.cfs_trdp_cd.value="";//trdp_cd
				formObj.cfs_trdp_nm.value="";//shrt_nm
				formObj.cfs_trdp_addr.value="";//dflt_addr
				formObj.cfs_trdp_phn.value="";//full_nm
				formObj.cfs_trdp_fax.value="";//full_nm
				formObj.cfs_trdp_eml.value="";//13
				formObj.cfs_trdp_pic_nm.value="";//14
			}
			if(CODETYPE =="trdpcode_dest"){
				formObj.trdp_cd.value="";//trdp_cd
				formObj.trdp_addr.value="";//shrt_nm
				formObj.trdp_nm.value="";//full_nm
				formObj.trdp_phn.value="";//full_nm
				formObj.trdp_fax.value="";//full_nm
				formObj.trdp_eml.value="";//13
				formObj.trdp_pic_nm.value="";//14
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEI_DOC_1080.206");		
	}
}

function PARTNER_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.trdp_cd.value=rtnValAry[0];// trdp_cd
		formObj.trdp_nm.value=rtnValAry[2];// eng_nm
		//formObj.trdp_addr.value=rtnValAry[7];// eng_addr
		formObj.trdp_addr.value=rtnValAry[37];//dflt_addr
		//formObj.org_rout_pic.value = rtnValAry[3];// pic_nm
		formObj.trdp_pic_nm.value = rtnValAry[3];// pic_nm
		formObj.trdp_phn.value=rtnValAry[4];// pic_phn
		formObj.trdp_fax.value=rtnValAry[5];// pic_fax
		formObj.trdp_eml.value=rtnValAry[6];// pic_eml
	}
}
function SEND_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.cfs_trdp_cd.value=rtnValAry[0];// trdp_cd
		formObj.cfs_trdp_nm.value=rtnValAry[2];// eng_nm
		//formObj.cfs_trdp_addr.value=rtnValAry[7];// eng_addr
		formObj.cfs_trdp_addr.value=rtnValAry[37];//dflt_addr
		formObj.cfs_trdp_pic_nm.value = rtnValAry[3];// pic_nm
		formObj.cfs_trdp_phn.value=rtnValAry[4];// pic_phn
		formObj.cfs_trdp_fax.value=rtnValAry[5];// pic_fax
		formObj.cfs_trdp_eml.value=rtnValAry[6];// pic_eml
	}
}