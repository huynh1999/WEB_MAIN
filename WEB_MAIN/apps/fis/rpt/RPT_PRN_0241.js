//=========================================================
//*@FileName   : RPT_PRN_0241.js
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
		case 'Print':
		case 'PREVIEW':
			var formObj=document.frm1;
			if(formObj.intg_bl_seq.value == ""){
				alert(getLabel('FMS_COM_ALT004'));
				return;
			} 
			
			
			if(srcName == "PREVIEW") {
				$("#prt_option").val("opt_preview");
			} else if(srcName == "Print") {
				$("#prt_option").val("opt_print");
			}

			if($("#chk_auto_close").is(":checked")){
				doWork("CLOSE");
			}
			
			ajaxSendPost(goPrint, "reqVal", "&goWhere=aj&bcKey=updateBookingInfoRpt&intg_bl_seq="+formObj.intg_bl_seq.value+"&prn_type=BIF"
					+"&binfo_to="+formObj.to.value
					+"&binfo_cc="+formObj.cc.value
					+"&binfo_wh="+formObj.warehouse.value
					+"&binfo_df="+formObj.dock_form.value
					+"&binfo_frt_pp_at="+formObj.freight_prepaid_at.value
					+"&binfo_frt_pay_at="+formObj.freight_payable_at.value
					+"&binfo_plc_bl_issue="+formObj.place_of_bl_issue.value
					+"&usr_id="+usrid
					, "./GateServlet.gsl");
			
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
	var formObj=document.frm1;
	
	// blueprint #235 
	file_name = "booking_confirmation_jp.mrd";
	
	formObj.file_name.value=file_name;
	formObj.title.value='Booking Confirmation';
	// Parameter Setting
	var param='';
	param += '[' + formObj.intg_bl_seq.value + ']';    // $1
	param += '[' + v_ofc_eng_nm + ']';   //2 
	param += '[' + v_eml + ']';		   //3
	param += '[' + v_ofc_cd + ']';	   //4
	param += '[' + v_phn + ']';		   //5
	param += '[' + v_fax + ']';		   //6  
    param += '[' + formObj.to.value + ']';	   //7
	param += '[' + formObj.cc.value + ']';		       //8
	param += '[' + formObj.warehouse.value + ']';   //9
	param += '[' + formObj.dock_form.value + ']';   //10
	param += '[' + formObj.freight_prepaid_at.value + ']';   //11
	param += '[' + formObj.freight_payable_at.value + ']';   //12
	param += '[' + formObj.place_of_bl_issue.value + ']';   //13
  
	formObj.rd_param.value=param;
	formObj.intg_bl_seq.value=formObj.intg_bl_seq.value;
	formObj.rpt_biz_tp.value="OEM";
	formObj.rpt_biz_sub_tp.value="BC";
	popPOST(formObj, 'RPT_RD_0010.clt', 'popB_Confirm', 1025, 740);	 
}


function goPrint(reqVal){
	
}

$(document).ready(function(){
	var cookie_key = "rpt_prn_0241_auto_close";
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