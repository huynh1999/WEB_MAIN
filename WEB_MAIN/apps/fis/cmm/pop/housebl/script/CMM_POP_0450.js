var nowWorking = false;


function doWork(srcName) {
	var formObj = document.frm1;
	if(nowWorking){return;}
	try {
		switch (srcName) {
		case "SAVE":		
			nowWorking = true;
			
        	if(blCheckInpuVals()){
        		ajaxSendPost(getMblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_bl_no='+'', './GateServlet.gsl');
        	}
        	doHideProcess();
        	break;
		case "CLOSE":
			ComClosePopup();
			break;
		} // end switch
	} catch (e) {
		if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
	}
}
function getMblCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sXml = "";
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='RV'){
				//Please check B/L no.!!
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_BLNO'));
			}else{   
        	   doShowProcess();
               frm1.f_cmd.value=ADD;       
               var SaveStr = parent.docObjects[2].GetSaveString();
               sXml = parent.docObjects[2].GetSearchData("./CMM_POP_0450GS.clt", FormQueryString(frm1)+'&'+SaveStr+ '&bl_no=', false);
        	   var retArray="";
        	   if (sXml.replace(/^\s+|\s+$/gm,'') != ''){
        		   var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
        		   var endIndxField = sXml.indexOf("</FIELD>");
        		   var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
        		   var $xml = $(xmlDoc);            			
        		   retArray += $xml.find( "intg_bl_seq").text();
        		   retArray += "|";
        		   retArray += $xml.find( "sr_no").text();
        		   retArray += "|";
        		   retArray += $xml.find( "bl_no").text();
        		   retArray += "|";
        		   retArray += $xml.find( "bl_sts_cd").text();
        		   retArray += "|";
        		   retArray += $xml.find( "ref_no").text();
        		   retArray += "|";
        		   retArray += $xml.find( "etd_dt_tm").text();
        		   retArray += "|";
        		   retArray += $xml.find( "pol_cd").text();
        		   retArray += "|";
        		   retArray += $xml.find( "pod_cd").text();
        		   retArray += "|";
        		   retArray += $xml.find( "sc_no").text();
        		   retArray += "|";
        		   retArray += $xml.find( "rcv_wh_cd").text();
        		   retArray += "|";
        		   retArray += $xml.find( "prnr_trdp_cd").text();
        		   retArray += "|";
        		   retArray += $xml.find( "ref_ofc_cd").text();
        		   retArray += "|";
        		   retArray += $xml.find( "obl_tp_cd").text();
        		   retArray += "|";
        		   retArray += $xml.find( "curr_cd").text();
        		   retArray += "|";
        		   retArray += $xml.find( "cust_ref_no").text();
        		   retArray += "|";
        		   retArray += $xml.find( "broker_rt").text();    		   
        	   }
        	   ComClosePopup(retArray);
			}
		}
	}
	else{
		//SEE_BMD_MSG43		
	}
}

function doDisplay(doWhat, obj) {
	switch (doWhat) {
	case 'DATE1': // 달력 조회 팝업 호출
		var cal = new ComCalendar();
		cal.select(obj, 'MM-dd-yyyy');
		break;
	}
}

/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function blCheckInpuVals(){
	var isOk=true;
	if(!checkInType(frm1.etd_dt_tm.value, "DD")){	
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETD_'));
		isOk=false;
		frm1.etd_dt_tm.focus();
		nowWorking = false;
		return isOk; 
	}
 	//#25246, 25247 필수값 설정 추가
	if(frm1.pol_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		frm1.pol_cd.focus();
		isOk=false;
		nowWorking = false;
		return isOk; 
	}
	if(frm1.pod_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		frm1.pod_cd.focus();
		isOk=false;
		nowWorking = false;
		return isOk; 
	}
	//#29608 MBL Mandatory 항목 추가(Office Code)
	if(frm1.ref_ofc_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		frm1.ref_ofc_cd.focus();
		isOk = false;
		nowWorking = false;
		return isOk; 
	}
	
	return isOk;
}

function ofcChDEta() {
	var formObj=document.frm1;
	var ofc_cd=formObj.ref_ofc_cd.options[formObj.ref_ofc_cd.selectedIndex].text;
	ajaxSendPost(getExpPostRef, 'reqVal', '&goWhere=aj&bcKey=getExpPostRef&f_ofc_cd='+ofc_cd, './GateServlet.gsl');
}

function getExpPostRef(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]!=''){
				ofc_post_dt=doc[1];
			}
		}
	}
}

function setOfficeData(){
	var formObj=document.frm1;
	formObj.ref_ofc_cd.value=v_ofc_cd;
}

function loadPage() {
	var formObj = document.frm1;
	formObj.lnr_trdp_cd.value = parent.rtnary[0];
	formObj.lnr_trdp_nm.value = parent.rtnary[1];
	formObj.eta_dt_tm.value = parent.rtnary[2];
	formObj.etd_dt_tm.value = parent.rtnary[3];
	formObj.shp_mod_cd.value = parent.rtnary[4];
	formObj.por_cd.value = parent.rtnary[5];				
	formObj.etd_por_tm.value = parent.rtnary[6];
	formObj.trnk_vsl_nm.value = parent.rtnary[7];
	formObj.trnk_voy.value = parent.rtnary[8];
	
//	if (formObj.shpr_trdp_nm.value == ""){formObj.shpr_trdp_nm.value = parent.rtnary[9]};	
	formObj.shpr_trdp_nm.value == "";
	formObj.shpr_trdp_cd.value == "";
//	if (formObj.cnee_trdp_nm.value == ""){formObj.cnee_trdp_nm.value = parent.rtnary[10]};
	formObj.cnee_trdp_nm.value == "";
//	if (formObj.ntfy_trdp_nm.value == ""){formObj.ntfy_trdp_nm.value = parent.rtnary[11]};
	formObj.ntfy_trdp_nm.value == "";
	formObj.del_cd.value = parent.rtnary[12];
	formObj.del_nm.value = parent.rtnary[13];
	formObj.ctrb_ofc_cd.value = parent.rtnary[15];
	formObj.ctrb_dept_cd.value = parent.rtnary[16];
	formObj.ctrb_mgn.value = parent.rtnary[17];
	formObj.ctrb_ratio_yn.value = parent.rtnary[18];
	if (formObj.hbl_tp_cd.value == ""){formObj.hbl_tp_cd.value = parent.rtnary[19]};
	formObj.lnr_bkg_no.value = parent.rtnary[20];
	/*formObj.mrn.value = parent.rtnary[21];*/
	formObj.cntr_info.value = parent.rtnary[22];
	formObj.trnk_vsl_cd.value = parent.rtnary[23];
	if (formObj.shp_mod_cd.value == ""){formObj.shp_mod_cd.value = parent.rtnary[24]};
	formObj.pol_cd.value = parent.rtnary[25];
	formObj.pol_nm.value = parent.rtnary[26];
	formObj.pod_cd.value = parent.rtnary[27];
	formObj.pod_nm.value = parent.rtnary[28];
//	if (formObj.shpr_trdp_addr.value == ""){formObj.shpr_trdp_addr.value = parent.rtnary[29]};
	formObj.shpr_trdp_addr.value == "";
//	if (formObj.cnee_trdp_addr.value == ""){formObj.cnee_trdp_addr.value = parent.rtnary[30]};
	formObj.cnee_trdp_addr.value == "";
//	if (formObj.ntfy_trdp_addr.value == ""){formObj.ntfy_trdp_addr.value = parent.rtnary[31]};
	formObj.ntfy_trdp_addr.value == "";
	formObj.por_nm.value = parent.rtnary[33];
	formObj.post_dt.value = parent.rtnary[34];
	
	formObj.mrn_no.value = parent.rtnary[35];
	
	if(formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "FW" || formObj.hbl_tp_cd.value == "DT"){
		formObj.fnl_dest_loc_cd.value = parent.rtnary[14];
		formObj.fnl_dest_loc_nm.value = parent.rtnary[32];	
		formObj.rep_cmdt_cd.value     = parent.rtnary[36];
		formObj.rep_cmdt_nm.value     = parent.rtnary[37];
		formObj.pck_qty.value         = parent.rtnary[38];
		formObj.pck_ut_cd.value       = parent.rtnary[39];
		formObj.grs_wgt.value         = parent.rtnary[40];
		formObj.grs_wgt1.value        = parent.rtnary[41];
		formObj.meas.value            = parent.rtnary[42];
		formObj.meas1.value           = parent.rtnary[43];
		formObj.desc_txt.value        = parent.rtnary[44];
		formObj.sad_txt.value         = parent.rtnary[45];
		formObj.mk_txt.value          = parent.rtnary[46];
		formObj.mk_grs_wgt.value      = parent.rtnary[47];
		formObj.mk_grs_wgt1.value     = parent.rtnary[48];
		formObj.mk_meas.value         = parent.rtnary[49];
		formObj.mk_meas1.value        = parent.rtnary[50];
	}else{
		formObj.fnl_dest_loc_cd.value = "";
		formObj.fnl_dest_loc_nm.value = "";
		formObj.rep_cmdt_cd.value     = "";
		formObj.rep_cmdt_nm.value     = "";
		setPckUtCd();
		formObj.desc_txt.value        = "";
		formObj.sad_txt.value         = "";
		formObj.mk_txt.value          = "";
		
		//#2050 [PATENT] OEH HBL 생성시 자동 MBL 프로그램 수정
		/*
		formObj.pck_qty.value         = "0";
		formObj.grs_wgt.value         = "0";
		formObj.grs_wgt1.value        = "0";
		formObj.meas.value            = "0";
		formObj.meas1.value           = "0";		
		formObj.mk_grs_wgt.value      = "0";
		formObj.mk_grs_wgt1.value     = "0";
		formObj.mk_meas.value         = "0";
		formObj.mk_meas1.value        = "0";
		*/
		
		formObj.pck_qty.value         = parent.rtnary[38];
		formObj.grs_wgt.value         = parent.rtnary[40];
		formObj.grs_wgt1.value        = parent.rtnary[41];
		formObj.meas.value            = parent.rtnary[42];
		formObj.meas1.value           = parent.rtnary[43];
		formObj.mk_grs_wgt.value      = parent.rtnary[47];
		formObj.mk_grs_wgt1.value     = parent.rtnary[48];
		formObj.mk_meas.value         = parent.rtnary[49];
		formObj.mk_meas1.value        = parent.rtnary[50];
	}
	cobChange();
}

function formValidation() {
	if (!chkSearchCmprPrd(false, form.etd_strdt, form.etd_enddt)) {
		return false;
	}
	return true;
}



function cobChange(){
	//#30284 [BINEX]OEH On-Board Date 동기화
	var formObj = document.frm1;
	formObj.clean_on_board.value = sea_cob;
	formObj.clean_on_board.value += "\r\n";
	formObj.clean_on_board.value += mkCharDateFormat(formObj.etd_dt_tm.value);
	formObj.clean_on_board.value += "\r\n";		
	formObj.clean_on_board.value += "-------------------";
	if(vsl_show_flg=="Y"){
		formObj.clean_on_board.value += "\r\n";
		formObj.clean_on_board.value += formObj.trnk_vsl_nm.value + " " + formObj.trnk_voy.value;
	}
	if(load_port_show_flg=="Y"){
		formObj.clean_on_board.value += "\r\n";
		formObj.clean_on_board.value += formObj.pol_nm.value;
	}
			
	//formObj.obrd_dt_tm1.value = formObj.obrd_dt_tm.value; 
}
function shipModeChangeDef(obj){
	var formObj=document.frm1;
	if (obj.value == 'FCL' || obj.value == 'BLK') {
		formObj.to_svc_term_cd.value='CY';
		formObj.fm_svc_term_cd.value='CY';
	} else {
		formObj.to_svc_term_cd.value='CF';
		formObj.fm_svc_term_cd.value='CF';
	}
}

//#6792 [AIR POWER] SETTNG UP PACKAGE DEFAULT FOR OCEAN ENTRY SCREEN
function setPckUtCd(){
	var opt_key = "PCK_VAL_OEM";
	ajaxSendPost(setPckUtCdReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setPckUtCdReq(reqVal){
	var formObj = document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		formObj.pck_ut_cd.value=doc[1];
	} else {
		formObj.pck_ut_cd.value="";
	}
}