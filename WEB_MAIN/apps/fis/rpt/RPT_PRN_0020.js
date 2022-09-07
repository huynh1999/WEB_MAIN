//=========================================================
//*@FileName   : RPT_PRN_0020.jsp
//*@FileTitle  : RPT
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 10/06/2014
//*@since      : 10/06/2014
//=========================================================
function loadPage(){
	var formObj=document.frm1;
	var d=new Date();
	//6911 [BNX] Cargo Receipt
	formObj.rcvd_dt_tm.value=getTodayStr();
	formObj.rcvd_tm.value = leadingZeros(d.getHours(),2) + ":" + leadingZeros(d.getMinutes(),2);
	
	//#6301 [JAPT] Mail sending function related request - requirement 1
	var opt_key = "OEH_ORG_EML_TITLE";
	ajaxSendPost(showEmlOrgTitle, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key = "OEH_COPY_EML_TITLE";
	ajaxSendPost(showEmlCopyTitle, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#4110 [JAPT] House B/L item add, 'Prepaid at' on HBL Print option.
	var opt_key = "OEH_PREPAID_AT_YN";
	ajaxSendPost(showPrepaidAtYN, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
		
	
	//#6612 [JAPT] e-Signature on HBL Requirements
	var opt_key = "OEH_SHW_SIG_OPT";
	ajaxSendPost(showESignatureYN, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#6714 [JAPT] REVENUE STAMP FUNCTION [ TARGET DEPLOY : July 1st ]
	var opt_key = "OEH_SHW_STAMP_OPT";
	ajaxSendPost(showRevenueStampYN, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#1534  [CLT] OEH B/L - Print 옵션 Remark 항목
	//US 일때만 clause_rule 항목을 표시했으나 기본으로 clause_rule 표시하도록 수정 및 US일때만 Default로 Check 함. 
	document.all.rule1.style.display="block";
	if(ofc_cnt_cd1=="US"){
		frm1.clause_rule.checked=true;
	}
//	else{
//		document.all.rule1.style.display="none";
//	}
	
	if(formObj.rmk_cd.length < 1){
		formObj.rmk_cd.disabled = true;
	}
	
	formObj.rcvd_pic.value=usrid;
	formObj.agent_text.value += formObj.h_agent_text.value;
	
	/* #999 [SHINE] B/L 회사명 변경 옵션  (기본 Form에만 적용하고, 고객 요구 시 변경 적용하기로 함 )*/
	var reserve_field06 = formObj.reserve_field06.value;
	var ofc_rep_nm      = formObj.ofc_rep_nm.value;
	var ofc_nm          = formObj.ofc_nm.value;
	//alert(reserve_field06 + ' / ' + ofc_rep_nm + ' / ' + ofc_nm);
	
	/*
	if(reserve_field06 == ""){
		if(ofc_rep_nm != ""){
			formObj.ofc_text.value = ofc_rep_nm;
		}else{
			formObj.ofc_text.value = ofc_nm;
		}
		
	}else{
		formObj.ofc_text.value = reserve_field06;
	}
	*/
	/* #999 [SHINE] B/L 회사명 변경 옵션  (기본 Form에만 적용하고, 고객 요구 시 변경 적용하기로 함 )*/
	
	//#1247 [CLT] HB/L Company Name - Print 시 저장 요청 및 Document Package 시 표시
	var sign_ship = formObj.sign_ship.value;
	if(sign_ship == "" || sign_ship == null){
		if(ofc_rep_nm != ""){
			formObj.ofc_text.value = ofc_rep_nm;
		}else{
			formObj.ofc_text.value = ofc_nm;
		}
		
	}else{
		formObj.ofc_text.value = sign_ship;
	}
	
	//#2933 [CARGOZONE] OE HBL PRINT FREIGHT ARRANGE DEFAULT FLAG
	var opt_key = "OEH_BL_PRT_FRT_ARR_FLG";
    ajaxSendPost(getSysOpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	/* #1739 [Patent] OEH B/L Print 의 Freight Arrange Default 설정 Option 처리 */
//	if( formObj.frtArrFlg.value == 'Y' ){
//		$("input:radio[name='frt_flg']:radio[value='Y']").attr("checked","checked");
//	}else{
//		$("input:radio[name='frt_flg']:radio[value='N']").attr("checked","checked");
//	}	
	
	initSetting(1);
	
	if(null == formObj.bl_usr_def_nm.value || "null" == formObj.bl_usr_def_nm.value){
		formObj.bl_usr_def_nm.value = "";
	}
	
	//#3356 [JTC]HB/L Form 개발
	formObj.showExRate.checked =true;
	
	//#4110 [JAPT] House B/L item add, 'Prepaid at' on HBL Print option.
	if(formObj.frt_term_c_cd.value !='PP'){
		formObj.prepaid_at.disabled=true;
		
		//#4192 [JAPT] B/L Print form, option popup modification. 4-4
		formObj.prepaid_at.value="";
	}
	
	if($("#cntr_info_flag").val() == "Y") {
		console.log("aa");
		$("#showCntrBlMark").show();
		$("#showCntrBlMark_lbl").show();
		if($("#shp_mod_cd").val() == "FCL") {
			$("#showCntrBlMark").prop("checked", true);
		} else {
			$("#showCntrBlMark").prop("checked", false);
		}
	} else {
		$("#showCntrBlMark").hide();
		$("#showCntrBlMark_lbl").hide();
	}
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
		formObj.bl_usr_def_nm.className='search_form-disable';
		formObj.bl_usr_def_nm.disabled=true;
		//6911 [BNX] Cargo Receipt
		formObj.rcvd_dt_tm_cal.disabled=true;
		formObj.rcvd_tm.className='search_form-disable';
		formObj.rcvd_tm.disabled=true;
	}else if(obj=="2"){
		formObj.rcvd_by.className='search_form';
		formObj.rcvd_by.disabled=false;
		formObj.rcvd_dt_tm.className='search_form';
		formObj.rcvd_dt_tm.disabled=false;
		formObj.rcvd_pic.className='search_form';
		formObj.rcvd_pic.disabled=false;
		formObj.bl_usr_def_nm.className='search_form-disable';
		formObj.bl_usr_def_nm.disabled=true;
		//6911 [BNX] Cargo Receipt
		formObj.rcvd_dt_tm_cal.disabled=false;
		formObj.rcvd_tm.disabled=false;
	//#354 [PRIMEX] OEH BL PRINT, USERS TO UPDATE THE TITLE
	}else{
		formObj.rcvd_by.className='search_form-disable';
		formObj.rcvd_by.disabled=true;
		formObj.rcvd_dt_tm.className='search_form-disable';
		formObj.rcvd_dt_tm.disabled=true;
		formObj.rcvd_pic.className='search_form-disable';
		formObj.rcvd_pic.disabled=true;
		formObj.bl_usr_def_nm.className='search_form';
		formObj.bl_usr_def_nm.disabled=false;
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
function doWork(srcName){
    switch(srcName) {
		case 'Print':
		case 'PREVIEW':
			var formObj=document.frm1;
			
			//#6301 [JAPT] Mail sending function related request - requirement 1
			if(formObj.bl_type[0].checked){
				var emailTitleOrg = createEmailTitle(optOrgEmail, formObj.lnr_bkg_no.value
																, formObj.trnk_vsl_nm.value
																, formObj.trnk_voy.value
																, formObj.etd_dt_tm.value
																, formObj.house_bl_no.value);
				formObj.mailTitle.value = emailTitleOrg;							
        		
        	}else if(formObj.bl_type[1].checked){
        		var emailTitleCopy = createEmailTitle(optCopyEmail, formObj.lnr_bkg_no.value
																  , formObj.trnk_vsl_nm.value
																  , formObj.trnk_voy.value
																  , formObj.etd_dt_tm.value
																  , formObj.house_bl_no.value);
        		formObj.mailTitle.value = emailTitleCopy;							
        	}
			
			//#2175 [PATSON] Telex Release Authority
    		if(formObj.show_bl_type.value == "TR"){
    			if(tbl_prt_flg == 'N'){
    				alert(getLabel('SEA_COM_ALT040'));
    				return;
    			}
    		}
			
			/*
			if(frm1.bl_type[0].checked){
				frm1.cmd_type.value='23';
				frm1.stamp.value=frm1.stamp_type.value;
			}else if(frm1.bl_type[1].checked){
				frm1.cmd_type.value='23';
				frm1.all.value='Y';
				frm1.stamp.value='';
				var val=window.opener.document.frm1.org_bl_qty.value;
				if(val==null || val==0){
					window.opener.document.frm1.org_bl_qty.value=1;
				}else if(val<3){
					window.opener.document.frm1.org_bl_qty.value=parseInt(val) + 1;
				}
			}else{
				frm1.cmd_type.value='22';
				frm1.stamp.value=frm1.stamp_type.value;
			}
			popPOST(frm1, 'RPT_PRN_0010.clt', 'popTest', 1025, 740);
			*/
			/*
			 * Sea Export House B/L
			 * 
			 */
			
			/*
			if(formObj.oe_hbl_form.value != ""){
				if(formObj.bl_type[0].checked){
					formObj.file_name.value='HBL_SEA_' + formObj.oe_hbl_form.value + '_ORG.mrd';
				}else{
					formObj.file_name.value='HBL_SEA_' + formObj.oe_hbl_form.value + '_COPY.mrd';
				}
			}else{
				formObj.file_name.value='HBL_SEA.mrd';
			}*/
			if(formObj.bl_type[0].checked){
				formObj.file_name.value='HBL_SEA_ORG.mrd';
			}else{
				formObj.file_name.value='HBL_SEA_COPY.mrd';
			}
			
			//OFVFOUR-7452 [SOUTH EAST WORLD WIDE] CREATING HB/L PRINT FUNCTION IN OIH B/L ENTRY
			if(formObj.airSeaTp.value == "S" && formObj.bndTp.value =="I" && formObj.bizTp.value =="H"){
				formObj.file_name.value='HBL_SEA_IMPORT.mrd';
			}
			
			//#3356 [JTC]HB/L Form 개발
			//if(ofc_cnt_cd1 == "JP"){
			//	formObj.file_name.value='HBL_SEA_EN_A4_JAPT.mrd';
			//}
			
			
			//alert(formObj.file_name.value);
        	formObj.title.value='Ocean Export House B/L';
			//Parameter Setting
        	var param="['" + formObj.intg_bl_seq.value + "']";	// [1]
        	if(formObj.clause_rule.checked){
        		param += '[Y]';										// [2]
        	}else{
        		param += '[N]';										// [2]
        	}
        	if(formObj.bl_type[0].checked){
        		param += '[org]';									// [3]
        		
        	}else if(formObj.bl_type[1].checked){
        		param += '[copy]';									// [3]
        	}
        	param += '[' + formObj.page_count.value + ']';			// [4]
        	if(formObj.frt_flg[0].checked){
        		param += '[Y]';										// [5]
        	}else if(formObj.frt_flg[1].checked){
        		param += '[N]';										// [5]
        	}
        	
        	/*
        	 * 
        	 
        	if(formObj.show_bl_type[0].checked){
        		param += '[org]';									// [6]
        	}else if(formObj.show_bl_type[1].checked){
        		param += '[nego]';									// [6]
        	}else if(formObj.show_bl_type[2].checked){
        		param += '[dra]';									// [6]
        	}else if(formObj.show_bl_type[3].checked){
        		param += '[copy]';									// [6]
        	}else if(formObj.show_bl_type[4].checked){
        		param += '[telex]';									// [6]
        	}else if(formObj.show_bl_type[5].checked){
        		param += '[seawayb]';								// [6]
        	}else if(formObj.show_bl_type[6].checked){
        		param += '[none]';									// [6]
        	}  
        	*/  
        	// #473 [IMPEX] AIR EXPORT HAWB DRAFT VERSION OPTION
        	if(formObj.show_bl_type.value == "OR"){
        		param += '[org]';									// [6]
        	}else if(formObj.show_bl_type.value == "NN"){
        		param += '[nego]';									// [6]
        	}else if(formObj.show_bl_type.value == "DR"){
        		param += '[dra]';									// [6]
        	}else if(formObj.show_bl_type.value == "CP"){
        		param += '[copy]';									// [6]
        	}else if(formObj.show_bl_type.value == "TR"){
        		param += '[telex]';									// [6]
        	}else if(formObj.show_bl_type.value == "SW"){
        		param += '[seawayb]';								// [6]
        	}else if(formObj.show_bl_type.value == "NO"){
        		param += '[none]';									// [6]
        	}else if(formObj.show_bl_type.value == "SR"){			// #6418 Urgent [JHLogisitics] B/L PRINT WITH RELEASE TYPE
        		param += '[surr]';									// [6]
        	}          	
        	if(formObj.title_name[0].checked){
        		param += '[Y]';										// [7]
        		param += '[]';										// [8]
            	param += '[]';										// [9]
            	param += '[]';										// [10]
        	}else if(formObj.title_name[1].checked){
        		param += '[N]';										// [7]
        		param += '[' + formObj.rcvd_by.value + ']';			// [8]
        		//6911 [BNX] Cargo Receipt
            	param += '[' + formObj.rcvd_dt_tm.value + " " + formObj.rcvd_tm.value + ']';		// [9]
            	param += '[' + formObj.rcvd_pic.value + ']';		// [10]
            //#354 [PRIMEX] OEH BL PRINT, USERS TO UPDATE THE TITLE
        	}else{
        		param += '[' + formObj.bl_usr_def_nm.value + ']';	// [7]
        		param += '[]';									// [8]
            	param += '[]';										// [9]
            	param += '[]';										// [10]
        	}
        	param += '[' + formObj.agent_text.value + ']';			// [11]
        	param += '[' + formObj.rider_flg.value + ']';			// [12]
        	/* OEH Print 팝업에서 bl Remark 정보를 조회.jsjang #16904 */
        	param += '[' + formObj.rmk_cd.value + ']';			// [13]
        	
        	/* #999 [SHINE] B/L 회사명 변경 옵션  (기본 Form에만 적용하고, 고객 요구 시 변경 적용하기로 함 )*/
//        	param += '[' + formObj.ofc_text.value + ']';			// [14]
        	param += '[]';											// [14]

        	//#3356 [JTC]HB/L Form 개발
        	if(formObj.bl_type[0].checked){
        		param += '[' + formObj.page_num.value + ']';			// [15]
        	}else{
        		param += '[1]';	                                  		// [15]
        	}
        	if(formObj.showTelex.checked){
        		param += '[Y]';										// [16]
        	}else{
        		param += '[N]';										// [16]
        	}
        	
        	if(formObj.showVeslPol.checked){
        		param += '[Y]';										// [17]
        	}else{
        		param += '[N]';										// [17]
        	}        	
        	if(formObj.showExRate.checked){
        		param += '[Y]';										// [18]
        	}else{
        		param += '[N]';										// [18]
        	}        	
        	if(formObj.showOnDt.checked){
        		param += '[Y]';										// [19]
        	}else{
        		param += '[N]';										// [19]
        	}        	
        	if(formObj.showCont.checked){
        		param += '[Y]';										// [20]
        	}else{
        		param += '[N]';										// [20]
        	}        
        	//#4110 [JAPT] House B/L item add, 'Prepaid at' on HBL Print option.
        	if(formObj.prepaid_at.value != ''){
        		param += '['+formObj.prepaid_at.value.toUpperCase()+']';				// [21]
        	}else{
        		param += '[N]';										// [21]
        	}        	
			
			var paramShowCntrBlMark = $("#showCntrBlMark").is(":checked")?"Y":"N";
        	param += '[' + paramShowCntrBlMark +']';										// [22]
        	
        	//#6612 [JAPT] e-Signature on HBL Requirements
        	var paramShowESignature = ($("#showESigature").is(":checked")&&showESigature!='N')?"Y":"N";
        	param += '[' + paramShowESignature +']';										// [23]
        	
        	var paramShowRevESigature = ($("#showRevESigature").is(":checked")&&showESigature!='N')?"Y":"N";
        	param += '[' + paramShowRevESigature +']';										// [24]
        	
        	//#6714 [JAPT] REVENUE STAMP FUNCTION [ TARGET DEPLOY : July 1st ]
        	var paramShowReStamp = $("#showReStamp").is(":checked")?"Y":"N";
        	param += '[' + paramShowReStamp +']';										// [25]
        	// !! [중요] BL OPTION 추가 시, DOCUMENTS PACAKAGE에도 옵션 추가확인해줘야함.!!
        	// SEE_BMD_0100.js
        	
        	
        	
        	//console.log(param);
        	//alert(formObj.rmk_cd.value);
			formObj.rd_param.value=param;
			formObj.rpt_biz_tp.value="OEH";
			formObj.rpt_biz_sub_tp.value="BL";
			
			//#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report 
			formObj.rpt_file_name_title.value = "";
			//if (formObj.oe_hbl_form.value == "IGIC"){
				if (formObj.house_bl_no.value != ""){
					
					var v_bl_no = formObj.house_bl_no.value ;
					v_bl_no = v_bl_no.replace(/\./g, "");
					v_bl_no = v_bl_no.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");					
					formObj.rpt_file_name_title.value = "HBL_SEA_"+v_bl_no;
					
				} else {
					formObj.rpt_file_name_title.value = "";
				}
			//}
			
			if(srcName == "PREVIEW") {
				$("#prt_option").val("opt_preview");
			} else if(srcName == "Print") {
				$("#prt_option").val("opt_print");
			}

			if($("#chk_auto_close").is(":checked")){
				doWork("CLOSE");
			}			
			//console.log(formObj.rpt_file_name_title.value);	
			//#1247 [CLT] HB/L Company Name - Print 시 저장 요청 및 Document Package 시 표시
			ajaxSendPost(goPrint, "reqVal", "&goWhere=aj&bcKey=mergeBLPrintOptInfo&intg_bl_seq="+formObj.intg_bl_seq.value+"&prn_type="+formObj.rpt_biz_tp.value
					+"&sign_ship="+formObj.ofc_text.value
					+"&usr_id="+usrid
					//#354 [PRIMEX] OEH BL PRINT, USERS TO UPDATE THE TITLE
					+"&bl_usr_def_nm="+formObj.bl_usr_def_nm.value
					, "./GateServlet.gsl");

			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			if(ofc_cnt_cd1=="JP"){
				ComClosePopup(); 
			}
		break;
		case "CLOSE":
			window.close(); 
    	break;
    }
}

function goPrint(reqVal){
}

//#2933 [CARGOZONE] OE HBL PRINT FREIGHT ARRANGE DEFAULT FLAG
function getSysOpt(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) == "undefined") {
			$("input:radio[name='frt_flg']:radio[value='N']").attr("checked","checked");
		} else {
			if(doc[1] == 'Y'){
				$("input:radio[name='frt_flg']:radio[value='Y']").attr("checked","checked");
			}else{
				$("input:radio[name='frt_flg']:radio[value='N']").attr("checked","checked");
			}	
		}
	}
}

//#4110 [JAPT] House B/L item add, 'Prepaid at' on HBL Print option.
function showPrepaidAtYN(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		if(doc[1] =='N') {
			jQuery('#prepaid_at_tr').css("display", "none"); 
		}
	}
}

//#6612 [JAPT] e-Signature on HBL Requirements
var showESigature = '';
function showESignatureYN(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		if(doc[1] !='Y') {
			jQuery('#showEsig_tr').css("display", "none"); 
		}
		showESigature = doc[1];
	}
}

//#6714 [JAPT] REVENUE STAMP FUNCTION [ TARGET DEPLOY : July 1st ]
var showReStamp = '';
function showRevenueStampYN(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		if(doc[1] !='Y') {
			jQuery('#showStamp_tr').css("display", "none"); 
		}
		showReStamp = doc[1];
	}
}

$(document).ready(function(){
	var cookie_key = "rpt_prn_0020_auto_close";
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

//#6301 [JAPT] Mail sending function related request - requirement 1
var optOrgEmail;
function showEmlOrgTitle(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != "undefined" && doc[1] != undefined && doc[1] != "") {
			optOrgEmail=doc[1];
		}
	}
}

var optCopyEmail;
function showEmlCopyTitle(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != "undefined" && doc[1] != undefined && doc[1] != "") {
			optCopyEmail=doc[1];
		}
	}
}

function doDisplay(doWhat, obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	        var cal =new ComCalendar(); 
	        cal.select(obj,  'MM-dd-yyyy');
	        break;
    }
}

