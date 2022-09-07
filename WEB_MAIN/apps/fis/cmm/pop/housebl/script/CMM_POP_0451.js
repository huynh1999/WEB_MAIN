var nowWorking = false;

function doWork(srcName) {
	var formObj = document.frm1;
	if(nowWorking){return;}
	try {
		switch (srcName) {
		case "SAVE":
			nowWorking = true;
			frm1.lnr_trdp_cd.value = parent.rtnary[0];
			frm1.lnr_trdp_nm.value = parent.rtnary[1];
            frm1.eta_dt_tm.value = parent.rtnary[2];
        	if(blCheckInpuVals()){
        		ajaxSendPost(getMblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_bl_no='+'', './GateServlet.gsl');
        	}
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
               frm1.bl_no.value= frm1.bl_no.value.toUpperCase();
               var SaveStr = parent.docObjects[1].GetSaveString();
               sXml = parent.docObjects[1].GetSearchData("./CMM_POP_0451GS.clt", FormQueryString(frm1)+'&'+SaveStr+ '&bl_no=', false);
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
        		   retArray += "|";
        		   retArray += $xml.find( "imp_ref_no").text();    
        		   retArray += "|";
        		   retArray += $xml.find( "mrn_no").text();    
        		   retArray += "|";
        		   retArray += $xml.find( "bl_ser_no").text();    
        		   retArray += "|";
        		   retArray += $xml.find( "fm_svc_term_cd").text();    
        		   retArray += "|";
        		   retArray += $xml.find( "carr_trdp_cd").text();    
        		   retArray += "|";
        		   retArray += $xml.find( "f_eta_dt_tm").text();    
        		   retArray += "|";
        		   retArray += $xml.find( "rt_trdp_cd").text();    
        		   retArray += "|";
        		   retArray += $xml.find( "it_no").text();    
        		   retArray += "|";
        		   retArray += $xml.find( "to_svc_term_cd").text(); 
        		   retArray += "|";
        		   retArray += $xml.find( "lnr_trdp_cd").text(); 
        		   retArray += "|";
        		   retArray += $xml.find( "lnr_trdp_nm").text(); 
        		   retArray += "|";
        		   retArray += $xml.find( "eta_dt_tm").text(); 
        		   retArray += "|";
        		   retArray += $xml.find( "pod_nm").text(); 
        		   retArray += "|";
        		   retArray += $xml.find( "pol_nm").text(); 
        		   retArray += "|";
        		   retArray += $xml.find( "shp_mod_cd").text();        
        	   }
        	   ComClosePopup(retArray);
			}
		}
	}
	else{
		//SEE_BMD_MSG43		
	}
}

function svcTermChange(){
	var formObj=document.frm1;
	formObj.to_svc_term_cd.value=formObj.fm_svc_term_cd.value;
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
	
	// MBL# 중복 체크 
    blDupl=false;
    
    // #48893 - [BINEX] OPEN Invoice 관련 - MB/L 공백제거 
	frm1.bl_no.value=trim(frm1.bl_no.value);
	ajaxSendPost(getMblCheckNoEmpBL, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=I&f_biz_clss_cd=M&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');        		   

    if (blDupl) {
    	nowWorking = false;
 	   	return false;
    }
	
	
	if(!checkInType(frm1.etd_dt_tm.value, "DD")){	
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETD_'));
		isOk=false;
		frm1.etd_dt_tm.focus();
		nowWorking = false;
		return isOk; 
	}
 	//#25246, 25247 필수값 설정 추가
	if(frm1.bl_no.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		frm1.bl_no.focus();
		isOk=false;
		nowWorking = false;
		return isOk; 
	}
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

function getMblCheckNoEmpBL(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=''){
				//중복일 경우 ERROR
				frm1.bl_no.focus();
				if(confirm(getLabel('FMS_COM_ALT008') + getLabel('FMS_COM_CFMCON'))){
					blDupl=false;
				} else {
					blDupl=true;
				}
			}else if(doc[1]=='RV'){
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_BLNO'));	
				blDupl=true;
			}else{
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
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
	formObj.shp_mod_cd.value = parent.rtnary[3];
	if (formObj.hbl_tp_cd.value == ""){formObj.hbl_tp_cd.value = parent.rtnary[4]};
	if (formObj.shpr_trdp_nm.value == ""){formObj.shpr_trdp_nm.value = parent.rtnary[5]};
	if (formObj.cnee_trdp_nm.value == ""){formObj.cnee_trdp_nm.value = parent.rtnary[6]};
	if (formObj.ntfy_trdp_nm.value == ""){formObj.ntfy_trdp_nm.value = parent.rtnary[7]};
	if (formObj.ctrb_ofc_cd.value == ""){formObj.ctrb_ofc_cd.value = parent.rtnary[8]};
	if (formObj.ctrb_ratio_yn.value == ""){formObj.ctrb_ratio_yn.value = parent.rtnary[9]};
	if (formObj.ctrb_mgn.value == ""){formObj.ctrb_mgn.value = parent.rtnary[10]};
	formObj.trnk_vsl_cd.value = parent.rtnary[11];
	formObj.trnk_vsl_nm.value = parent.rtnary[12];
	formObj.f_eta_dt_tm.value = parent.rtnary[13]==""?parent.rtnary[2]:parent.rtnary[13];
	formObj.por_cd.value = parent.rtnary[14];
	formObj.del_cd.value = parent.rtnary[15];
	formObj.cfs_trdp_cd.value = parent.rtnary[16];
	formObj.etd_dt_tm.value = parent.rtnary[17];
	if (formObj.shp_mod_cd.value == ""){formObj.shp_mod_cd.value = parent.rtnary[18]};
	formObj.pol_cd.value = parent.rtnary[19];
	formObj.pol_nm.value = parent.rtnary[20];
	formObj.pod_cd.value = parent.rtnary[21];
	formObj.pod_nm.value = parent.rtnary[22];
	formObj.por_nm.value = parent.rtnary[23];	
	formObj.del_nm.value = parent.rtnary[24]
	if (formObj.shpr_trdp_addr.value == ""){formObj.shpr_trdp_addr.value = parent.rtnary[25]};
	if (formObj.cnee_trdp_addr.value == ""){formObj.cnee_trdp_addr.value = parent.rtnary[26]};
	if (formObj.ntfy_trdp_addr.value == ""){formObj.ntfy_trdp_addr.value = parent.rtnary[27]};
	formObj.trnk_voy.value = parent.rtnary[28];	
	formObj.post_dt.value = parent.rtnary[29];
	
}

function formValidation() {
	if (!chkSearchCmprPrd(false, form.etd_strdt, form.etd_enddt)) {
		return false;
	}
	return true;
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