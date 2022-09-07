var nowWorking = false;
var docObjects=new Array();
var sheetCnt=0;
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
	case 1:      //IBSheet1 init
	    with(sheetObj){
      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	  var headers = [ { Text:"", Align:"Center"} ];		   
      InitHeaders(headers, info);

      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" } ];
       InitColumns(cols);
       SetEnable(0)
	   SetSheetHeight(100);
            }
      break;
	}
}

function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

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
        	   docObjects[0].SetCellValue(1, 1,1);  		   
        	   doShowProcess();
               frm1.f_cmd.value=ADD;                          
               sXml = docObjects[0].GetSearchData("./CMM_POP_0452GS.clt", FormQueryString(frm1) + '&bl_no=', false);
        	   
               
               var retArray="";
        	   if (sXml.replace(/^\s+|\s+$/gm,'') != ''){
        		   var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
        		   var endIndxField = sXml.indexOf("</FIELD>");
        		   var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
        		   var $xml = $(xmlDoc);      
        		   retArray += $xml.find( "intg_bl_seq").text();
        		   retArray += "|";
        		   retArray += $xml.find( "ref_no").text();
        		   retArray += "|";
        		   retArray += $xml.find( "etd_dt_tm").text().substring(0,8);
        		   retArray += "|";
        		   retArray += $xml.find( "pol_cd").text();
        		   retArray += "|";
        		   retArray += $xml.find( "pod_cd").text();
        		   retArray += "|";
        		   retArray += $xml.find( "ref_ofc_cd").text();          		
        		   retArray += "|";
        		   retArray += $xml.find( "pod_nm").text(); 
        		   retArray += "|";
        		   retArray += $xml.find( "pol_nm").text(); 
        		   retArray += "|";
        		   retArray += $xml.find( "etd_tm").text();  
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

function blCheckInpuVals(){
	var isOk=true;
	if(!checkInType(frm1.etd_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_FLIT') + getLabel('FMS_COD_DATE'));
		isOk=false;
		frm1.etd_dt_tm.focus();
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

function ofcChDEta() {
	var formObj=document.frm1;
	var ofc_cd=formObj.ref_ofc_cd.options[formObj.ref_ofc_cd.selectedIndex].text;
	ajaxSendPost(getExpPostRef, 'reqVal', '&goWhere=aj&bcKey=getExpPostRef&f_ofc_cd='+ofc_cd, './GateServlet.gsl');
}

function checkDuplicateLinerBkgNo(){
	var formObj=document.frm1;
	if(formObj.lnr_bkg_no.value != ""){
		if(formObj.lnr_bkg_no.value != formObj.org_lnr_bkg_no.value){
			ajaxSendPost(checkDuplicateLinerBkgNoEnd, 'reqVal', '&goWhere=aj&bcKey=searchDuplicateLinerBkgNo&lnr_bkg_no='+formObj.lnr_bkg_no.value+'&air_sea_clss_cd='+'A' , './GateServlet.gsl');
		}
	}
}

/**
 * AJAX RETURN
 * Carrier Bkg NO 중복체크
 */
function checkDuplicateLinerBkgNoEnd(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				//alert("Ref. No Duplicate!! ");
				if( !confirm( (getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CBKNO') + '\n'+ getLabel('FMS_COM_CFMPRO'))  ) )	
				{
					formObj.lnr_bkg_no.value=formObj.org_lnr_bkg_no.value;
					formObj.lnr_bkg_no.select();
			}
			}
		}
	}
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
	if(typeof(parent.rtnary[0]) != 'undefined'){
		formObj.etd_dt_tm.value = parent.rtnary[0];
		formObj.pol_cd.value = parent.rtnary[1];
		formObj.pol_nm.value = parent.rtnary[2];
		formObj.pod_cd.value = parent.rtnary[3];
		formObj.pod_nm.value = parent.rtnary[4];
		formObj.etd_tm.value = parent.rtnary[5];
		formObj.hbl_tp_cd.value = parent.rtnary[6];
		if (formObj.shpr_trdp_nm.value == ""){formObj.shpr_trdp_nm.value = parent.rtnary[7]};
		if (formObj.shpr_trdp_addr.value == ""){formObj.shpr_trdp_addr.value = parent.rtnary[8]};
//		if (formObj.cnee_trdp_nm.value == ""){formObj.cnee_trdp_nm.value = parent.rtnary[9]};
//		if (formObj.cnee_trdp_addr.value == ""){formObj.cnee_trdp_addr.value = parent.rtnary[10]};
//		if (formObj.ntfy_trdp_nm.value == ""){formObj.ntfy_trdp_nm.value = parent.rtnary[11]};
//		if (formObj.ntfy_trdp_addr.value == ""){formObj.ntfy_trdp_addr.value = parent.rtnary[12]};
//		if (formObj.prnr_trdp_cd2.value == ""){formObj.prnr_trdp_cd2.value = parent.rtnary[13]};
//		if (formObj.prnr_trdp_nm2.value == ""){formObj.prnr_trdp_nm2.value = parent.rtnary[14]};
		
		formObj.cnee_trdp_nm.value = "";
		formObj.cnee_trdp_addr.value = "";
		formObj.ntfy_trdp_nm.value = "";
		formObj.ntfy_trdp_addr.value = "";
		formObj.prnr_trdp_cd2.value = "";
		formObj.prnr_trdp_nm2.value = "";
		
		
		
		if (formObj.ctrb_ofc_cd.value == ""){formObj.ctrb_ofc_cd.value = parent.rtnary[15]};
		if (formObj.ctrb_mgn.value == ""){formObj.ctrb_mgn.value = parent.rtnary[16]};
		if (formObj.ctrb_ratio_yn.value == ""){formObj.ctrb_ratio_yn.value = parent.rtnary[17]};
		if (formObj.ctrb_dept_cd.value == ""){formObj.ctrb_dept_cd.value = parent.rtnary[18]};
		if (formObj.lnr_trdp_cd.value == ""){formObj.lnr_trdp_cd.value = parent.rtnary[19]};
		if (formObj.lnr_trdp_nm.value == ""){formObj.lnr_trdp_nm.value = parent.rtnary[20]};
		formObj.flt_no.value = parent.rtnary[21];
		
//		formObj.eta_dt_tm.value = parent.rtnary[22];
		formObj.eta_dt_tm.value = "";
		
		formObj.eta_tm.value = parent.rtnary[23];
		if (formObj.iss_trdp_cd.value == ""){formObj.iss_trdp_cd.value = parent.rtnary[24]};
		if (formObj.iss_trdp_nm.value == ""){formObj.iss_trdp_nm.value = parent.rtnary[25]};
		formObj.fst_to_cd.value = parent.rtnary[26];
		formObj.fst_to_nm.value = parent.rtnary[27];
		formObj.ts1_port_cd.value = parent.rtnary[28];
		formObj.ts1_flt_no.value = parent.rtnary[29];
		formObj.ts2_port_cd.value = parent.rtnary[30];
		formObj.ts2_flt_no.value = parent.rtnary[31];
		formObj.ts3_port_cd.value = parent.rtnary[32];
		formObj.ts3_flt_no.value = parent.rtnary[33];
		if (formObj.cargo_tp_cd.value == ""){formObj.cargo_tp_cd.value = parent.rtnary[34]};
		formObj.rt_clss_cd.value = parent.rtnary[35];
		formObj.post_dt.value = parent.rtnary[36];		
		
		// Default 값 설정 (jsp에 직접 설정하기 힘든경우에)
		if(user_ofc_cnt_cd=="US"){
			formObj.wgt_disp_cd.value='KL';
    	}else{
    		formObj.wgt_disp_cd.value='K';
    	}
		formObj.desc_txt.value="\r\nCONSOLIDATED SHIPMENT AS PER ATTACHED CARGO MANIFEST";
		
		formObj.frt_term_cd.value = parent.rtnary[37];
		formObj.ctrb_mgn.value = parent.rtnary[38];
		formObj.otr_chg_term_cd.value = parent.rtnary[39];
		
	}
	if(typeof(parent.rtnary[5]) != 'undefined'){
		formObj.etd_tm.value = parent.rtnary[5];
	}
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
}

function formValidation() {
	if (!chkSearchCmprPrd(false, form.etd_strdt, form.etd_enddt)) {
		return false;
	}
	return true;
}