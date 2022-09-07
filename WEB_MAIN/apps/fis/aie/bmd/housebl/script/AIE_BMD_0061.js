//=========================================================
//*@FileName   : MDM_MCM_0030.jsp
//*@FileTitle  : Sub Continent Code
//*@Description: Sub Continent Code
//*@author     : Choi,Gil-Ju - Cyberlogitec
//*@version    : 1.0 - 01/09/2009
//*@since      : 01/09/2009
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/25
//*@since      : 2014/07/25
//=========================================================
function loadPage() {
	var formObj=document.frm1;
	//MBL에서 호출한 팝업에서는 HBL의 수량을 수정할 수 없음
	if(formObj.biz_clss_cd.value == "M"){
		formObj.pck_qty.readOnly=true;
		formObj.pck_qty.className="search_form-disable";
		
		if (formObj.hbl_cnt.value == "0") {
			formObj.mbl_pck_qty.value=formObj.mbl_pck.value;
			
			formObj.display_option[0].checked = false;
			formObj.display_option[1].checked = false;
			document.getElementById("display_option").disabled="true";
			document.getElementById("display_option2").disabled="true";
		}
	}

	
}
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName, curObj) {
	switch (srcName) {
	case "SEARCH":
		if (frm1.f_bl_no.value == '') {
			//[B/L No.]를 먼저 입력하십시오!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: AIE_BMD_0061.18");
			frm1.f_bl_no.focus();
		} 
		else {
			frm1.f_cmd.value=SEARCH;
			frm1.action="./CMM_POP_0321.clt";
			frm1.submit();
		}
		break;
	case "PRINT":
	case "PREVIEW":
		// /////////////////////////////////////////////////////////
		// 프린트
		var formObj=document.frm1;
		formObj.file_name.value='air_label_01.mrd';
		
		if(formObj.biz_clss_cd.value == "M" && formObj.hbl_cnt.value == "0") {
			formObj.file_name.value='air_mbl_label_01.mrd';			
		}
		
		
		formObj.title.value='Air Label';
		var pckQty=formObj.pck_qty.value;
		if(pckQty == ''){
			pckQty=0;
		}
		// Parameter Setting
		var param='';
		param += '[' + formObj.intg_bl_seq.value + ']'; // $1
		param += '[' + formObj.mbl_pck_qty.value + ']';
		param += '[' + pckQty + ']';
		 for (var i=0; i<formObj.header_type.length; i++) {
		    if(formObj.header_type[i].checked) {
		    	param += '[' + formObj.header_type[i].value + ']'; // $4
		    }
		 }
		 if(formObj.display_option[0].checked == true) {
			 param += '[' + formObj.display_option[0].value + ']'; // $5
		 } else {
			 param += '[NONE]';
		 }
		 if(formObj.display_option[1].checked == true) {
			 param += '[' + formObj.display_option[1].value + ']'; // $6
		 } else {
			 param += '[NONE]';
		 }
		 param += '[' + formObj.forwarder_name.value + ']'; // $7
		 if(formObj.biz_clss_cd.value == "M"){
			 param += '[Y]'; // $8
		 }else{
			 param += '[]'; // $8
		 }
		formObj.rd_param.value=param;

		if(srcName == "PREVIEW") {
			$("#prt_option").val("opt_preview");
		} else if(srcName == "PRINT") {
			$("#prt_option").val("opt_print");
		}

		if($("#chk_auto_close").is(":checked")){
			doWork("CLOSE");
		}
		popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		// /////////////////////////////////////////////////////////
		break;
	case "PARTNER_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
		rtnary=new Array(1);
		rtnary[0]="1";
		rtnary[1]="";
		rtnary[2]=window;
		callBackFunc = "PARTNER_POPLIST";
		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break;
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
		frm1.trdp_addr.value=rtnValAry[7];// eng_addr
		//frm1.org_rout_pic.value = rtnValAry[3];// pic_nm
		frm1.trdp_phn.value=rtnValAry[4];// pic_phn
		frm1.trdp_fax.value=rtnValAry[5];// pic_fax
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
	if(str == "trdpcode_dest") {
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
		}else{
			//alert();
			if(CODETYPE =="trdpcode_dest"){
				formObj.trdp_cd.value="";//trdp_cd
				formObj.trdp_addr.value="";//shrt_nm
				formObj.trdp_nm.value="";//full_nm
				formObj.trdp_phn.value="";//full_nm
				formObj.trdp_fax.value="";//full_nm
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: AIE_BMD_0061.175");		
	}
}


$(document).ready(function(){
	var cookie_key = "aie_bmd_0061_auto_close";
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