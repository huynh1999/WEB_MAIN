function loadPage() {
	
	if (frm1.label_type.value == "01") {
		document.getElementById("span_title").innerText= package_label;
	} else {
		document.getElementById("span_title").innerText= package_label + " 2";
	}
	
	if (frm1.biz_clss_cd.value == "M") {
		document.getElementById("hbl_only").style.display = "none";
	} else {
		document.getElementById("hbl_only").style.display = "inline";
	}
	
	/*if (frm1.biz_clss_cd.value == "M" || frm1.label_type.value == "02") {
		document.getElementById("hbl_only").style.display = "none";
	} else {
		document.getElementById("hbl_only").style.display = "inline";
	}*/
}
function doWork(srcName, curObj, valObj) {
	switch (srcName){
	case "SEARCH":
		frm1.f_bl_no.value=trim(frm1.f_bl_no.value);
		if (frm1.f_bl_no.value == '') {
			//[B/L No.]를 먼저 입력하십시오!
			alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEE_BMD_0061.12");
			frm1.f_bl_no.focus();
		} 
		else {
			frm1.f_cmd.value=SEARCH;
			frm1.action="./CMM_POP_0321.clt";
			frm1.submit();
		}
		break;
	case "PRINT":
	case 'PREVIEW':					
		// /////////////////////////////////////////////////////////
		// 프린트
		
		var formObj=document.frm1;
		if (formObj.pck_qty.value == "0"){
			alert(getLabel('FMS_COM_ALT010'));	
			break;
		}
		
		formObj.file_name.value='package_label.mrd';
		
		if (frm1.label_type.value == "01") {
			formObj.title.value='Package Label';
		}else{
			formObj.title.value='Package Label 2';
		}
		
		// Parameter Setting
		var param='';
		param += '[' + formObj.intg_bl_seq.value + ']'; // $1
		param += '[' + formObj.pck_qty.value + ']';// $2
		param += '[' + formObj.ofc_eng_nm.value + ']';// $3
		param += '[' + formObj.trdp_nm.value + ']'; // $4
		param += '[' + formObj.trdp_addr.value + ']'; // $5
		param += '[' + formObj.trdp_phn.value + ']';// $6
		param += '[' + formObj.trdp_fax.value + ']';// $7
		param += '[' + formObj.trdp_cd.value + ']';// $8
		param += '[' + formObj.mbl_no.value + ']';// $9
		param += '[' + formObj.hbl_no.value + ']';// $10
		param += '[' + formObj.pod_nm.value + ']';// $11
		param += '[' + formObj.trdp_pic_nm.value + ']';// $12
		param += '[' + formObj.trdp_pic_eml.value + ']';// $13
		if (formObj.biz_clss_cd.value == "M") {
			param += '[Y]';// $14 MBL/HBL 구분
		} else {
			param += '[]';// $14 MBL/HBL 구분
		}
		param += '[' + formObj.label_type.value + ']';// $15 Label/Label2 구분
		formObj.rd_param.value=param;
	
		if(srcName == "PREVIEW") {
			$("#prt_option").val("opt_preview");
		} else if(srcName == "PRINT") {
			$("#prt_option").val("opt_print");
		}

		if($("#chk_auto_close").is(":checked")){
			doWork("CLOSE");
		}
		// alert(param);
		popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		// /////////////////////////////////////////////////////////
		break;
	case "PARTNER_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
   		rtnary=new Array(1);
   		rtnary[0]="1";
   		if(typeof(valObj)!='undefined'){
   			rtnary[1]=valObj;
   		}else{
   			rtnary[1]="";
   		}
   		rtnary[2]=window;
        callBackFunc = "PARTNER_POPLIST";
        modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
		break;
	/* jsjang 2013.7.17 short cut key */
	case "CLOSE":
		window.close(); 
	break;		
	}
}

function PARTNER_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		frm1.trdp_cd.value=rtnValAry[0];// trdp_cd
		frm1.trdp_nm.value=rtnValAry[2];// eng_nm
		frm1.trdp_addr.value=rtnValAry[16];// lgl_addr
		//frm1.org_rout_pic.value = rtnValAry[3];// pic_nm
		frm1.trdp_phn.value=rtnValAry[4];// pic_phn
		frm1.trdp_fax.value=rtnValAry[5];// pic_fax
		frm1.trdp_pic_nm.value=rtnValAry[3];//pic_nm
		frm1.trdp_pic_eml.value=rtnValAry[6];//pic_eml
	}
}

// --------------------------------------------------------------------------------------------------------------
// AJAX 설정
//--------------------------------------------------------------------------------------------------------------
/**
 * code name select
 */
function getTrdpInfo(obj, tmp, CurVal){
	var formObj=document.frm1;
	var trdp_cd=obj.value.toUpperCase();		
	if (trdp_cd != "") {
		if (tmp == "onKeyDown") {
			if (event.keyCode == 13) {
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal',
						'&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + trdp_cd, './GateServlet.gsl');
			}
		} else if (tmp == "onBlur") {
			if (trdp_cd != "") {
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal',
						'&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + trdp_cd, './GateServlet.gsl');
			}
		}
	} else {
		formObj.trdp_cd.value="";//trdp_cd
		formObj.trdp_addr.value="";//shrt_nm
		formObj.trdp_nm.value="";//full_nm
		formObj.trdp_phn.value="";//full_nm
		formObj.trdp_fax.value="";//full_nm
		formObj.trdp_pic_nm.value="";//pic_nm
		formObj.trdp_pic_eml.value="";//pic_eml
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
			var rtnArr=doc[1].split('^^;');
			var masterVals=rtnArr[0].split('@@^');
			
			var paramLen = masterVals.length;
			
			for(var i = 0; i < paramLen; i++){
				if(null == masterVals[i] || 'null' == masterVals[i] || 'undefined' == masterVals[i]){
					masterVals[i] = "";
				}
			}
			
			formObj.trdp_cd.value=masterVals[0];//trdp_cd
			formObj.trdp_nm.value=masterVals[2];	
			formObj.trdp_addr.value=masterVals[3];
			frm1.trdp_phn.value=masterVals[6];// pic_phn
			frm1.trdp_fax.value=masterVals[7];// pic_fax
			frm1.trdp_pic_nm.value=masterVals[5];//pic_nm
			frm1.trdp_pic_eml.value=masterVals[8];//pic_eml
		}else{
			formObj.trdp_cd.value="";//trdp_cd
			formObj.trdp_nm.value="";	
			formObj.trdp_addr.value="";
			frm1.trdp_phn.value="";// pic_phn
			frm1.trdp_fax.value="";// pic_fax
			frm1.trdp_pic_nm.value="";//pic_nm
			frm1.trdp_pic_eml.value="";//pic_eml
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEE_BMD_0061.152");		
	}
}

$(document).ready(function(){
	var cookie_key = "see_bmd_0061_auto_close";
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