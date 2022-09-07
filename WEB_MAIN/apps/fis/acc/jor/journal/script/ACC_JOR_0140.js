/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0140.js
*@FileTitle  : Aging Report
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/18
=========================================================*/
var agentNo_prt_flag = 'N';
var pdf = false;
function pdfDown(prn){
	pdf = true;
	doWork(prn);
}

function doWork(srcName){
    var formObj=document.frm1;
    switch(srcName) {
		case "Print":
			formObj.file_name.value='aging_report_01.mrd';
			formObj.title.value='Aging Report';
			//Parameter Setting
			var param='';
			param += '[' + formObj.f_sys_ofc_cd.value + ']';			// [1]
			param += '[' + usrNm + ']';									// [2]
			// 1,2(AR에 하나라도 체크가 되어있고) 3,4,5중에 하나라도 체크가 되어있으면  AR/AP모두 출력되므로 Param을 A로 세팅한다.#22626
			/*
			if((formObj.f_agn_rpt_tp_1.checked == true || formObj.f_agn_rpt_tp_2.checked == true || formObj.f_agn_rpt_tp_6.checked == true) && 
					(formObj.f_agn_rpt_tp_3.checked == true
							|| formObj.f_agn_rpt_tp_4.checked == true
								|| formObj.f_agn_rpt_tp_5.checked == true)) {
				param += '[' + 'A' + ']';									// [3]
			}else{
			}
			*/
			//LHK 20131224 요구사항 #22626 [BINEX]Aging Report 수정
			if(formObj.f_agn_rpt_tp_1.checked == false && formObj.f_agn_rpt_tp_2.checked == false && formObj.f_agn_rpt_tp_6.checked == false){
				param += '[' + 'Y' + ']';								// [3]
			}else{
				param += '[]';											// [3]
			}
			var rptTpStr="";
			var rptTp1="";
			var rptTp2="";
			var rptTp3="";
			var rptTp4="";
			var rptTp5="";
			var rptTp6="";
			var acctTp="";
			if(formObj.f_agn_rpt_tp_1.checked == true){
				rptTpStr += ",Debit Note";
				rptTp1="Y";
			}
			if(formObj.f_agn_rpt_tp_2.checked == true){
				rptTpStr += ",Local Invoice";
				rptTp2="Y";
			}
			if(formObj.f_agn_rpt_tp_3.checked == true){
				rptTpStr += ",Credit Note";
				rptTp3="Y";
			}
			if(formObj.f_agn_rpt_tp_4.checked == true){
				rptTpStr += ",Accounts Payable";
				rptTp4="Y";
			}
			if(formObj.f_agn_rpt_tp_5.checked == true){
				rptTpStr += ",GeneralAP";
				rptTp5="Y";
			}
			if(formObj.f_agn_rpt_tp_6.checked == true){
				rptTpStr += ",GeneralAR";
				rptTp6="Y";
			}
			if(rptTpStr == ""){
//				alert("Aging Report Type is mandatory field.");
				alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('ITM_AGING_TP'));
				return;
			}
			if(formObj.f_acct_tp_radio[0].checked == true){
				rptTpStr += ",Accrual Basis";
				acctTp="Y";
			}else{
				rptTpStr += ",Cash Basis";
			}
			param += '[' + rptTpStr.substring(1) + ']';					// [4]
			param += '[' + rptTp1 + ']';								// [5]
			param += '[' + rptTp2 + ']';								// [6]
			param += '[' + rptTp3 + ']';								// [7]
			param += '[' + rptTp4 + ']';								// [8]
			param += '[' + rptTp5 + ']';								// [9]
			var dptTpStr="";
			var dptTp1="";
			var dptTp2="";
			var dptTp3="";
			var dptTp4="";
			var dptTp5="";
			var dptTp6="";
			var dptTp7=""; //wms
			if(formObj.f_dpt_tp_1.checked == true){
				dptTpStr += ",OI";
				dptTp1="Y";
			}
			if(formObj.f_dpt_tp_2.checked == true){
				dptTpStr += ",OE";
				dptTp2="Y";
			}
			if(formObj.f_dpt_tp_3.checked == true){
				dptTpStr += ",OT";
				dptTp3="Y";
			}
			if(formObj.f_dpt_tp_4.checked == true){
				dptTpStr += ",AI";
				dptTp4="Y";
			}
			if(formObj.f_dpt_tp_5.checked == true){
				dptTpStr += ",AE";
				dptTp5="Y";
			}
			if(formObj.f_dpt_tp_6.checked == true){
				dptTpStr += ",AR/AP";
				dptTp6="Y";
			}
			if(formObj.f_dpt_tp_7.checked == true){
				dptTpStr += ",WM";
				dptTp7="Y";
			}
			if(dptTpStr == ""){
//				alert("Department Type is mandatory field.");
				alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_DETP'));
				return;
			}
			param += '[' + dptTpStr.substring(1) + ']';					// [10]
			param += '[' + dptTp1 + ']';								// [11]
			param += '[' + dptTp2 + ']';								// [12]
			param += '[' + dptTp3 + ']';								// [13]
			param += '[' + dptTp4 + ']';								// [14]
			param += '[' + dptTp5 + ']';								// [15]
			param += '[' + dptTp6 + ']';								// [16]
			if(formObj.f_view_tp_radio[0].checked == true){
				param += '[' + 'Y' + ']';								// [17]
			}else{
				param += '[]';											// [17]
			}
			var endDt=formObj.f_end_dt.value.replaceAll("-","");
			var endDtStr="";
			var year=endDt.substring(4,8);
			var month=endDt.substring(0,2);
			var day=endDt.substring(2,4);
			if(endDt != ""){
				endDtStr="As of " + mkCharMonthFormat(month) + " " + day + ", " +  year;
				endDt=year + month + day;
			}else{
//				alert("Ending Date is mandatory field.");
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_EDNDT'));
				formObj.f_end_dt.focus();
				return;
			}
			param += '[' + endDt + ']';									// [18]
			param += '[' + formObj.f_curr_cd.value + ']';				// [19]
			param += '[' + formObj.f_ofc_cd.value + ']';				// [20]
			param += '[' + acctTp + ']';								// [21]
			if(formObj.f_post_dt.checked == true){
				param += '[' + 'Y' + ']';								// [22]
			}else{
				param += '[]';											// [22]
			}
			param += '[' + endDtStr + ']';								// [23]
			var preDate="";
			var preMonth="";
			if(formObj.f_view_tp_chk.checked == true){
				param += '[' + 'Y' + ']';								// [24]
				param += '[' + year + month + "01" + ']';				// [25]
				param += '[' + year + month + "31" + ']';				// [26]
				preDate=new Date(year, (month)-1, 1);
				preMonth=(preDate.getMonth()+1).toString();
				preMonth=preMonth.length == 1 ? mkCharMonthFormat("0" + preMonth) : mkCharMonthFormat(preMonth);
				preMonth=preMonth.substring(0,3) + "-" + preDate.getFullYear();
				param += '[' + preMonth + ']';							// [27]
				preDate=new Date(year, (month)-2, 1);
				preMonth=(preDate.getMonth()+1).toString();
				preMonth=preMonth.length == 1 ? mkCharMonthFormat("0" + preMonth) : mkCharMonthFormat(preMonth);
				preMonth=preMonth.substring(0,3) + "-" + preDate.getFullYear();
				param += '[' + preMonth + ']';							// [28]
				preDate=new Date(year, (month)-3, 1);
				preMonth=(preDate.getMonth()+1).toString();
				preMonth=preMonth.length == 1 ? mkCharMonthFormat("0" + preMonth) : mkCharMonthFormat(preMonth);
				preMonth=preMonth.substring(0,3) + "-" + preDate.getFullYear();
				param += '[' + preMonth + ']';							// [29]
				preDate=new Date(year, (month)-4, 1);
				preMonth=(preDate.getMonth()+1).toString();
				preMonth=preMonth.length == 1 ? mkCharMonthFormat("0" + preMonth) : mkCharMonthFormat(preMonth);
				preMonth=preMonth.substring(0,3) + "-" + preDate.getFullYear();
				param += '[' + preMonth + ']';							// [30]
			}else{
				param += '[]';											// [24]
				param += '[]';											// [25]
				param += '[]';											// [26]
				param += '[]';											// [27]
				param += '[]';											// [28]
				param += '[]';											// [29]
				param += '[]';											// [30]
			}
			// ##22626 Invoice Link 용 Param
			param += '['+usrNm+']';											// [31]
			param += '['+user_id+']';											// [32]
			param += '['+user_phn+']';											// [33]
			param += '['+user_fax+']';											// [34]
			param += '['+user_eml+']';											// [35]
			var cr_check="";
			if(formObj.released_check.checked == true){
				cr_check="Y";
			}
			param += '['+cr_check+']';											// [36] Cargo_Released_Only Check OIH,AIH전용
			param += '[' + rptTp6 + ']';										// [37] 
			
			/* #26333 [BINEX]Aging Report - By ETD로 조회 가능 -24667 */
			var byEtd_check ="";
			//if(formObj.byEtd_check.checked == true){
			//	byEtd_check = "Y";
			//}
			param += '[' + formObj.f_by_cd.value + ']';										// [38]
			
			/* #47326 Balance Sheet 및 AR / AP Aging Report 금액 차이 - PostDate Option 추가 */
			var dtTp_check ="";
			if(formObj.f_dt_tp_radio[0].checked == true){
				dtTp_check = 'Y';								
			}
			param += '[' + dtTp_check + ']';										// [39]
			param += '[' + dptTp7 + ']';								// [40] --wms
			
			var opt_key = "AGING_PRT_AGNT";
			ajaxSendPost(getAgingPrint, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
			
			param += '[' + agentNo_prt_flag + ']';	// [41] 
			
			
			if(formObj.f_inv_dt.checked == true){ //Invoice Date sort
				param += '[' + 'Y' + ']';								// [42]
			}else{
				param += '[]';											// [42]
			}
			
			if(formObj.f_inv_no.checked == true){ //Invoicd No sort
				param += '[' + 'Y' + ']';								// [43]
			}else{
				param += '[]';											// [43]
			}
			//#6232 [Zencon] Aging Report - Due Date 관련 추가 요건
			if (formObj.f_overDue_dt.value != 0) {
				param += '['+formObj.f_overDue_dt.value+']';			//[44]
			}else{
				param += '[]';											//[44]
			}
			//OFVFOUR-8031 [Lever Logistics] Aging Report - Trade Partner Type
			param += '[' + formObj.f_tp_type_cd.value + ']';            //[45]
			//OFVFOUR-8122 [ALA WHITELINE] Add search option by 'Due Date' on Aging Report
			if(formObj.f_dt_tp_radio[2].checked == true){				//[46]
				param += '[Y]';
			} else{
				param += '[]';											//[46]
			}
			if(formObj.f_dt_tp_radio[3].checked == true){				//[47]
				param += '[Y]';
			} else {
				param += '[]';											//[47]
			}
			
			formObj.rd_param.value=param;
			
			if (pdf) {
				popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
				pdf =false;
			} else {
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}
			
			
		break;
		case "ALL_AGN":
			formObj.f_agn_rpt_tp_1.checked=true;
			formObj.f_agn_rpt_tp_2.checked=true;
			formObj.f_agn_rpt_tp_3.checked=true;
			formObj.f_agn_rpt_tp_4.checked=true;
			//OFVFOUR-8186  [JAPAN TRUST & GREAT LUCK] Add option ETD on Aging Report
			if (GA_AR_YN == "Y"){
				if(formObj.f_agn_rpt_tp_6.disabled==true){
					formObj.f_agn_rpt_tp_6.checked=false;
					
				} else{
					formObj.f_agn_rpt_tp_6.checked=true;
				}
			}
			if (GA_AP_YN == "Y"){
				if(formObj.f_agn_rpt_tp_5.disabled==true){
					formObj.f_agn_rpt_tp_5.checked=false;
				} else{
					formObj.f_agn_rpt_tp_5.checked=true;
				}
			}
		break;
		case "CLEAR_AGN":
			formObj.f_agn_rpt_tp_1.checked=false;
			formObj.f_agn_rpt_tp_2.checked=false;
			formObj.f_agn_rpt_tp_3.checked=false;
			formObj.f_agn_rpt_tp_4.checked=false;
			formObj.f_agn_rpt_tp_5.checked=false;
			formObj.f_agn_rpt_tp_6.checked=false;
		break;
		case "ALL_DPT":
			formObj.f_dpt_tp_1.checked=true;
			formObj.f_dpt_tp_2.checked=true;
			formObj.f_dpt_tp_3.checked=true;
			formObj.f_dpt_tp_4.checked=true;
			formObj.f_dpt_tp_5.checked=true;
			//OFVFOUR-8186  [JAPAN TRUST & GREAT LUCK] Add option ETD on Aging Report
			if(formObj.f_dpt_tp_6.disabled==true){
				formObj.f_dpt_tp_6.checked=false;
			} else {
				formObj.f_dpt_tp_6.checked=true;	
			}
			checkReleased();
		break;
		case "CLEAR_DPT":
			formObj.f_dpt_tp_1.checked=false;
			formObj.f_dpt_tp_2.checked=false;
			formObj.f_dpt_tp_3.checked=false;
			formObj.f_dpt_tp_4.checked=false;
			formObj.f_dpt_tp_5.checked=false;
			formObj.f_dpt_tp_6.checked=false;
			checkReleased();
		break;
    }
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);
    
	formObj.f_end_dt.value=getTodayStr();
	if(formObj.f_sys_ofc_trf_cur_cd.value != ""){
		//formObj.f_curr_cd.value=formObj.f_sys_ofc_trf_cur_cd.value;
	}
	// #2627 - Changes from Office System Currency to set the local currency based on user's office's local currency information - Thoa.Dien.170928
	 formObj.f_curr_cd.value=formObj.f_lcl_curr_cd.value;
	
	if (GA_AR_YN == "Y"){
		formObj.f_agn_rpt_tp_6.disabled=false;
		formObj.f_agn_rpt_tp_6.checked=true;
	}
	if (GA_AP_YN == "Y"){
		formObj.f_agn_rpt_tp_5.disabled=false;
		formObj.f_agn_rpt_tp_5.checked=true;
	}
	setChkPeriod();
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendar();
            cal.displayType="date";
            cal.select(formObj.f_end_dt, 'MM-dd-yyyy');
        break;
    }
}
function viewTypeChange(str){
	var formObj=document.frm1;
	if(str == "sum"){
		formObj.f_post_dt.checked=false;
		formObj.f_post_dt.disabled=true;
		formObj.f_inv_dt.checked=false;
		formObj.f_inv_dt.disabled=true;
		formObj.f_inv_no.checked=false;
		formObj.f_inv_no.disabled=true;
	}else{
		formObj.f_post_dt.disabled=false;
		formObj.f_inv_no.disabled=false;
		formObj.f_inv_dt.disabled=false;
	}
}
// #23985 Relesed On 체크 추가
function checkReleased(){
	var formObj=document.frm1;
	if(formObj.f_dpt_tp_1.checked || formObj.f_dpt_tp_4.checked){
		formObj.released_check.disabled=false;
	} else {
		formObj.released_check.checked=false;
		formObj.released_check.disabled=true;
	}
}

//#49018 [IMPEX] AGING REPORT 의 AGENT CODE 추가
function getAgingPrint(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		if(doc[1] == "Y"){
			agentNo_prt_flag = 'Y';
		} else {
			agentNo_prt_flag = 'N';
		}
	}
}

function setChkPeriod(){
	var opt_key = "ACCT_FINC_DATE_DFLT";
	ajaxSendPost(setRdoChkPeriod, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setRdoChkPeriod(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == 'I'){
			formObj.f_dt_tp_radio[1].checked = true;
		}
	}
}
//OFVFOUR-8186
function disableDept(reqVal){
	var formObj=document.frm1;
	if(reqVal == 'ETD'){
		formObj.f_agn_rpt_tp_6.checked=false;
		formObj.f_agn_rpt_tp_6.disabled=true;
		formObj.f_agn_rpt_tp_5.checked=false;
		formObj.f_agn_rpt_tp_5.disabled=true;
		formObj.f_dpt_tp_6.checked=false;
		formObj.f_dpt_tp_6.disabled=true;
		formObj.f_dpt_tp_7.checked=false;
		formObj.f_dpt_tp_7.disabled=true;
	} else{
		if(formObj.f_agn_rpt_tp_6.disabled==true){
			formObj.f_agn_rpt_tp_6.checked=true;
			formObj.f_agn_rpt_tp_6.disabled=false;
		}
		if(formObj.f_agn_rpt_tp_5.disabled==true){
			formObj.f_agn_rpt_tp_5.checked=true;
			formObj.f_agn_rpt_tp_5.disabled=false;
		}
		if(formObj.f_dpt_tp_6.disabled==true){
			formObj.f_dpt_tp_6.checked=true;
			formObj.f_dpt_tp_6.disabled=false;
		}
		if(formObj.f_dpt_tp_7.disabled==true){
			formObj.f_dpt_tp_7.checked=true;
			formObj.f_dpt_tp_7.disabled=false;
		}
	}
}