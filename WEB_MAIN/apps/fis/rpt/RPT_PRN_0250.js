//=========================================================
//*@FileName   : RPT_PRN_0250.js
//*@FileTitle  : RPT
//*@Change history:
//*@author     : cej
//*@version    : 2.0 - 06/2016
//*@since      : 06/2016
//=========================================================
function loadPage(){
	var formObj=document.frm1;
	var d=new Date();
	//formObj.rcvd_dt_tm.value=getTodayStr() + "  " + leadingZeros(d.getHours(),2) + ":" + leadingZeros(d.getMinutes(),2);
	/*if(ofc_cnt_cd1=="US"){
		document.all.rule1.style.display="block";
		frm1.clause_rule.checked=true;
	}else{
		document.all.rule1.style.display="none";
	}*/
	/*formObj.rcvd_pic.value=usrid;
	formObj.agent_text.value += formObj.h_agent_text.value;
	initSetting(1);*/

}
 
function doWork(srcName){
    switch(srcName) {
		case 'PRINT':			
		case 'PREVIEW':			
			var formObj=document.frm1;
			if(formObj.intg_bl_seq.value == ""){
				alert(getLabel('FMS_COM_ALT004'));
				return;
			} 
			
			if(srcName == "PREVIEW") {
				$("#prt_option").val("opt_preview");
			} else if(srcName == "PRINT") {
				$("#prt_option").val("opt_print");
			}

			if($("#chk_auto_close").is(":checked")){
				doWork("CLOSE");
			}
			printBookingConfirm();
		break;
		case "CLOSE":
			window.close(); 
    	break;
    }
}
var tyoYn = "";
// #52421 - [ZEN] OEH BOOKING CONFIRMATION REMARK TO SAVE HISTORY|To store remark information on Print option
function printBookingConfirm(){
	
	var formObj = document.frm1;
	
	formObj.file_name.value ='SR_SEA.mrd';
	formObj.title.value = 'Ocean Export SR';
	
	var hd_tit = $("#hd_tit option:selected").text();
	var seaway_bill_yn = $("#seaway_bill_yn").val();
	var ofc_cd = formObj.ofc_cd.value;
	
	
	//Parameter Setting	
	var param='[' + formObj.intg_bl_seq.value + ']';					// [1]
    	param += '[' + formObj.usrPhn.value + ']';						// [2]
		param += '[' + formObj.usrFax.value + ']';						// [3]
		param += '[' + formObj.usrEml.value + ']';						// [4]
		param += '[' + hd_tit + ']';								    // [5] Main Header Title
		param += '[' + seaway_bill_yn + ']';							// [6] Seaway Bill Watermark 
		param += '[' + ofc_cd + ']';									// [7] ofc_cd
		//#5471 [MB Logistics] master bill of lading - Duc Nguyen
		param += '[' + ']';												// [8] company name
	formObj.rd_param.value=param;
	formObj.mailTitle.value='Master Set / Shipping Request [MBL No : ' + formObj.bl_no.value + ']';;
	formObj.mailTo.value=mailTo;
	formObj.rpt_biz_tp.value="OEM";
	formObj.rpt_biz_sub_tp.value="BL";
	
	/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
	formObj.rpt_intg_bl_seq.value = formObj.intg_bl_seq.value;
	
	//#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report 
	
	if (formObj.bl_no.value != ""){
		var v_bl_no = formObj.bl_no.value; 
		v_bl_no = v_bl_no.replace(/\./g, "");
		v_bl_no = v_bl_no.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
		formObj.rpt_file_name_title.value = "SR-"+v_bl_no;
	} else {
		formObj.rpt_file_name_title.value = "";
	}
	
	popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
//	formObj.rpt_biz_tp.value="";
//	formObj.rpt_biz_sub_tp.value="";
		
//	var formObj=document.frm1;
//	
//	// blueprint #235 
//	file_name = "booking_confirmation_jp.mrd";
//	
//	formObj.file_name.value=file_name;
//	formObj.title.value='Booking Confirmation';
//	// Parameter Setting
//	var param='';
//	param += '[' + formObj.intg_bl_seq.value + ']';    // $1
//	param += '[' + v_ofc_eng_nm + ']';   //2 
//	param += '[' + v_eml + ']';		   //3
//	param += '[' + v_ofc_cd + ']';	   //4
//	param += '[' + v_phn + ']';		   //5
//	param += '[' + v_fax + ']';		   //6  
//    param += '[' + formObj.to.value + ']';	   //7
//	param += '[' + formObj.cc.value + ']';		       //8
//	param += '[' + formObj.warehouse.value + ']';   //9
//	param += '[' + formObj.dock_form.value + ']';   //10
//	param += '[' + formObj.freight_prepaid_at.value + ']';   //11
//	param += '[' + formObj.freight_payable_at.value + ']';   //12
//	param += '[' + formObj.place_of_bl_issue.value + ']';   //13
//  
//	formObj.rd_param.value=param;
//	formObj.intg_bl_seq.value=formObj.intg_bl_seq.value;
//	formObj.rpt_biz_tp.value="OEM";
//	formObj.rpt_biz_sub_tp.value="BC";
//	popPOST(formObj, 'RPT_RD_0010.clt', 'popB_Confirm', 1025, 740);	 
}

$(document).ready(function(){
	var cookie_key = "rpt_prn_0250_auto_close";
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