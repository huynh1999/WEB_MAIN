//=========================================================
//*@FileName   : RPT_PRN_0020.jsp
//*@FileTitle  : RPT
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 10/06/2014
//*@since      : 10/06/2014
//=========================================================
function loadPage(){
	
	var opt_key = "OE_BKGCFM_FILINGNO";
	ajaxSendPost(setOeBkgcfmFilingReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	
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
function initSetting(obj){
	var formObj=document.frm1;
	if(obj=="1"){
		formObj.rcvd_by.className='search_form-disable';
		formObj.rcvd_by.disabled=true;
		formObj.rcvd_dt_tm.className='search_form-disable';
		formObj.rcvd_dt_tm.disabled=true;
		formObj.rcvd_pic.className='search_form-disable';
		formObj.rcvd_pic.disabled=true;
	}else{
		formObj.rcvd_by.className='search_form';
		formObj.rcvd_by.disabled=false;
		formObj.rcvd_dt_tm.className='search_form';
		formObj.rcvd_dt_tm.disabled=false;
		formObj.rcvd_pic.className='search_form';
		formObj.rcvd_pic.disabled=false;
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
function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	       /* var cal=new ComCalendar();
	        cal.select(obj.name, 'MM-dd-yyyy');*/
	        var cal=new ComCalendar();
	        cal.setSize(10,10);
	        cal.select(obj, 'MM-dd-yyyy');
	        

	    break;
    }
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

			if(formObj.org_rmk.value != formObj.rmk.value){
				ajaxSendPost(goPrint, "reqVal", "&goWhere=aj&bcKey=updateBookingRemark&intg_bl_seq="+formObj.intg_bl_seq.value+"&rmk="+formObj.rmk.value, "./GateServlet.gsl");
			}else{				
				printBookingConfirm();
			}
			
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
	//#52613 [BNX] TYO 오피스 B/L 양식, Booking Information 리포트
	//사용안함 blueprint #235
	//var opt_key = "TYO_YN";
	//ajaxSendPost(setTyoYn, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl"); 
	//var file_name = "booking_confirmation.mrd"; 
	//if (tyoYn == "Y"){
	//	file_name = "booking_confirmation_jp.mrd";
	//}else{
		file_name = "booking_confirmation.mrd";
	//} 
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
	//#24658 [GPL] Arrival Notice에다 "Place of Receipt" 추가
	if (prn_ofc_cd == "GPL" || OE_BKG_FILE =="Y") {
		param += '[]';								   //7
		param += '[Y]';								   //8
	} else {
		param += '[]';								   //7
		param += '[N]';								   //8
	}
	
	/*20151116 #50431 시작*/
	var port_dt = formObj.port_cut_off_dt.value.substring(6,10)+formObj.port_cut_off_dt.value.substring(0,2)+formObj.port_cut_off_dt.value.substring(3,5)+formObj.port_cut_off_tm.value.replaceAll(":","");
	var rail_dt = formObj.rail_cut_off_dt.value.substring(6,10)+formObj.rail_cut_off_dt.value.substring(0,2)+formObj.rail_cut_off_dt.value.substring(3,5)+formObj.rail_cut_off_tm.value.replaceAll(":","");
	var wh_dt   = formObj.wh_cut_off_dt.value.substring(6,10)+formObj.wh_cut_off_dt.value.substring(0,2)+formObj.wh_cut_off_dt.value.substring(3,5)+formObj.wh_cut_off_tm.value.replaceAll(":","");
	var doc_dt  = formObj.doc_cut_off_dt.value.substring(6,10)+formObj.doc_cut_off_dt.value.substring(0,2)+formObj.doc_cut_off_dt.value.substring(3,5)+formObj.doc_cut_off_tm.value.replaceAll(":","");
	
	var port_open_dt  = formObj.port_open_dt.value.substring(6,10)+formObj.port_open_dt.value.substring(0,2)+formObj.port_open_dt.value.substring(3,5)+formObj.port_open_tm.value.replaceAll(":","");
	var vgm_cut_off_dt  = formObj.vgm_cut_off_dt.value.substring(6,10)+formObj.vgm_cut_off_dt.value.substring(0,2)+formObj.vgm_cut_off_dt.value.substring(3,5)+formObj.vgm_cut_off_tm.value.replaceAll(":","");
	
	param += '[' + port_dt + ']';		               //9      port cut off dt
	param += '[' + rail_dt + ']';		               //10     rail cut off dt
	param += '[' + wh_dt + ']';		                   //11     wh cut off dt
	param += '[' + doc_dt + ']';		               //12     doc cut off dt
    param += '[' + formObj.trk_trdp_nm.value + ']';	   //13     trucker name
	param += '[' + formObj.rmk.value + ']';		       //14     remark
	param += '[' + formObj.trk_trdp_phn.value + ']';   //15     Trucker Phone
	param += '[' + formObj.trk_trdp_fax.value + ']';   //16     Trucker Fax
	param += '[' + port_open_dt + ']';   			   //17     port open dt
	param += '[' + vgm_cut_off_dt + ']';   			   //18     vgm cut off dt
	/*20151116 #50431 종료*/
	
	formObj.rd_param.value=param;
	formObj.intg_bl_seq.value=formObj.intg_bl_seq.value;
	formObj.rpt_biz_tp.value="OEH";
	formObj.rpt_biz_sub_tp.value="BC";
	popPOST(formObj, 'RPT_RD_0010.clt', 'popB_Confirm', 1025, 770);	
	
	formObj.org_rmk.value = formObj.rmk.value;
}

function setTyoYn(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		tyoYn=doc[1];
	} else {
		tyoYn="";
	}
}

var OE_BKG_FILE;

function setOeBkgcfmFilingReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		OE_BKG_FILE=doc[1];
	} else {
		OE_BKG_FILE="";
	}
}



//코드표시 Ajax
function goPrint(reqVal){
	var formObj=document.frm1;
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
			printBookingConfirm();
		}else{
			alert(getLabel('FMS_COM_ERR001') + "\n\n: PRT_PRN_0080.250");		
		}
}

$(document).ready(function(){
	var cookie_key = "rpt_prn_0240_auto_close";
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