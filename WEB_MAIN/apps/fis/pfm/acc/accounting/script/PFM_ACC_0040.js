/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : PFM_ACC_0040.jsp
 *@FileTitle : Revenue/Cost Report
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

var pdf = false;
function pdfDown(prn){
	pdf = true;
	doWork(prn);
}

function TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cust_trdp_cd.value=rtnValAry[0];//full_nm
		formObj.f_cust_trdp_nm.value=rtnValAry[2];//full_nm
	}    
}
function USER_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_sls_usrid.value=rtnValAry[0];
		formObj.f_sls_usrnm.value=rtnValAry[1];
	}   
}
function doWork(srcName){
    var formObj=document.frm1;
    switch(srcName) {
	    case "PRINT":
	    	if(!(formObj.f_dpt_tp_1.checked || formObj.f_dpt_tp_2.checked  || formObj.f_dpt_tp_3.checked  || formObj.f_dpt_tp_4.checked  || formObj.f_dpt_tp_5.checked|| formObj.f_dpt_tp_6.checked)){
	    		formObj.f_dpt_tp_1.focus();
	    		alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_DETP'));
	    		return;
	    	}
	    	if(!chkSearchCmprPrd(true, frm1.per_strdt, frm1.per_enddt)){
	    		return;
	    	}
	    	// by paid date 기준일때 새로운 rd 파일 호출
	    	if(formObj.f_per_post_dt_chk.checked){
	    		formObj.file_name.value='revenue_cost_report_02.mrd';
	    	}else{
	    		formObj.file_name.value='revenue_cost_report_01.mrd';
	    	}
			formObj.title.value='Revenue/Cost Report';
			//Parameter Setting
			var param='';
			param += '[' + formObj.f_ofc_cd.value + ']';				// [1]
			param += '[' + formObj.f_sys_ofc_cd.value + ']';			// [2]
			var rptTp1="";
			var rptTp2="";
			var rptTp3="";
			var rptTp4="";
			var rptTp5="";
			var rptTp6="";
			var rptTp7="";
			var rptTp8="";
			var rptTpStr="";
			
			//#240 #52974 - [BNX, UNICO, STAR CLUSTER] AGENT AP FOR CREDIT NOTE Start
			/*
			var crdrVal=formObj.f_rpt_tp_sel.value;
			if(formObj.f_rpt_tp[0].checked){
				if(crdrVal == "CR"){
					rptTpStr="Credit";
					rptTp1="Y";
				}else if(crdrVal == "DR"){
					rptTpStr="Debit";
					rptTp2="Y";
				}else{
					rptTpStr="Credit/Debit";
					rptTp3="Y";
				}
			}
			if(formObj.f_per_post_dt_chk.checked){
				rptTpStr += "(By Paid Date)"
			}
			if(formObj.f_rpt_tp[1].checked){
				rptTpStr="Local Invoice";
				rptTp4="Y";
			}
			if(formObj.f_rpt_tp[2].checked){
				rptTpStr="Credit/Debit, Local Invoice";
				rptTp5="Y";
			}
			if(formObj.f_rpt_tp[3].checked){
				rptTpStr="Accounts Payable";
				rptTp6="Y";
			}
			if(formObj.f_rpt_tp[4].checked){
				rptTpStr="General Cost";
				rptTp7="Y";
			}
			if(formObj.f_rpt_tp[5].checked){
				rptTpStr="Accounts Payable, General Cost";
				rptTp8="Y";
			}
			
			
			*/
			
			//#240 #52974 - [BNX, UNICO, STAR CLUSTER] AGENT AP FOR CREDIT NOTE start
			if( formObj.f_rpt_tp_cbx_1.checked == false 
				&& formObj.f_rpt_tp_cbx_2.checked == false
				&& formObj.f_rpt_tp_cbx_3.checked == false
				&& formObj.f_rpt_tp_cbx_4.checked == false
				&& formObj.f_rpt_tp_cbx_5.checked == false
				&& formObj.f_rpt_tp_cbx_6.checked == false
				&& formObj.f_rpt_tp_cbx_7.checked == false //#240 opt 추가
			){
				alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_RPTT'));
				return;
			}
			
			if(formObj.f_rpt_tp_cbx_1.checked){  //#240 opt 추가
				rptTpStr += ", A/R";
				rptTp4="Y";
			}
			if(formObj.f_rpt_tp_cbx_2.checked){  //#240 opt 추가
				rptTpStr += ", A/P";
				rptTp6="Y";                      //#240 opt 추가
			}
			if(formObj.f_rpt_tp_cbx_3.checked){  //#240 opt 추가
				rptTpStr +=", A/P G&A";          //#240 opt 추가
				rptTp7="Y";
			}	
			
			
			if(formObj.f_rpt_tp_cbx_4.checked){   //#240 opt 추가
				rptTpStr += ", Debit";
				rptTp2="Y";
			}
			if(formObj.f_rpt_tp_cbx_5.checked){   //#240 opt 추가
				rptTpStr += ", Credit";
				rptTp1="Y";
			}
			if(formObj.f_rpt_tp_cbx_6.checked){   //#240 opt 추가
				rptTpStr += ", Credit/Debit";
				rptTp3="Y";
			}			
			if(formObj.f_rpt_tp_cbx_7.checked){     //#240 opt 추가
				rptTpStr +=", A/R G&A";
				rptTp8="Y";
			}			
			
			if(formObj.f_per_post_dt_chk.checked){
				rptTpStr += "(By Paid Date)"
			}
			
			rptTpStr=rptTpStr.substring(2);
			
			//#240 #52974 - [BNX, UNICO, STAR CLUSTER] AGENT AP FOR CREDIT NOTE end
			
			param += '[' + rptTp1 + ']';								// [3]
			param += '[' + rptTp2 + ']';								// [4]
			param += '[' + rptTp3 + ']';								// [5]
			param += '[' + rptTp4 + ']';								// [6]
			param += '[' + rptTp5 + ']';								// [7]
			param += '[' + rptTp6 + ']';								// [8]
			param += '[' + rptTp7 + ']';								// [9]
			param += '[' + rptTp8 + ']';								// [10]
			param += '[' + rptTpStr + ']';								// [11]
			var dptTpStr="";
			var dptTp1="";
			var dptTp2="";
			var dptTp3="";
			var dptTp4="";
			var dptTp5="";
			var dptTp6="";
			if(formObj.f_dpt_tp_1.checked){
				dptTpStr += ",AI";
				dptTp1="Y";
			}
			if(formObj.f_dpt_tp_2.checked){
				dptTpStr += ",AE";
				dptTp2="Y";
			}
			if(formObj.f_dpt_tp_3.checked){
				dptTpStr += ",OI";
				dptTp3="Y";
			}
			if(formObj.f_dpt_tp_4.checked){
				dptTpStr += ",OE";
				dptTp4="Y";
			}
			if(formObj.f_dpt_tp_5.checked){
				dptTpStr += ",OT";
				dptTp5="Y";
			}
			
			if(formObj.f_dpt_tp_6.checked){
				dptTpStr += ",WM";
				dptTp6="Y";
			}
			
			dptTpStr=dptTpStr.substring(1);
			if(dptTpStr == "" && !formObj.f_rpt_tp[4].checked){
				return;
			}
			param += '[' + dptTp1 + ']';								// [12]
			param += '[' + dptTp2 + ']';								// [13]
			param += '[' + dptTp3 + ']';								// [14]
			param += '[' + dptTp4 + ']';								// [15]
			param += '[' + dptTp5 + ']';								// [16]
			param += '[' + dptTpStr + ']';								// [17]
			var paySts1="";
			var paySts2="";
			var paySts3="";
			var payStsStr="";
			if(formObj.f_pay_sts[0].checked){
				payStsStr="PAID";
				paySts1="Y";
			}
			if(formObj.f_pay_sts[1].checked){
				payStsStr="NOT PAID";
				paySts2="Y";
			}
			if(formObj.f_pay_sts[2].checked){
				payStsStr="PARTIAL";
				paySts3="Y";
			}
			param += '[' + paySts1 + ']';								// [18]
			param += '[' + paySts2 + ']';								// [19]
			param += '[' + paySts3 + ']';								// [20]
			param += '[' + payStsStr + ']';								// [21]
			var strDt=formObj.per_strdt.value.replaceAll("-","");
			var endDt=formObj.per_enddt.value.replaceAll("-","");
			if(strDt != "" && endDt != ""){
				strDt=strDt.substring(4,8) + strDt.substring(0,4)
				endDt=endDt.substring(4,8) + endDt.substring(0,4)
			}else{
				return;
			}
			param += '[' + strDt + ']';									// [22]
			param += '[' + endDt + ']';									// [23]
			if(formObj.f_per_inv_dt_chk.checked){
				param += '[' + 'Y' + ']';								// [24]
			}else{
				param += '[]';											// [24]
			}
			var sortBy1="";
			var sortBy2="";
			var sortBy3="";
			var sortBy4="";
			var sortBy5="";			
			var sortByStr="";
			if(formObj.f_sort_by[0].checked){
				sortBy1="Y";
			}
			if(formObj.f_sort_by[1].checked){
				sortByStr="(Sort By Customer/Agent Name)";
				sortBy2="Y";
			}
			if(formObj.f_sort_by[2].checked){
				sortByStr="(Sort By Salse Man)";
				sortBy3="Y";
			}
			if(formObj.f_sort_by[3].checked){
				sortByStr="(Sort By Invoice No)";
				sortBy4="Y";
			}
			if(formObj.f_sort_by_chk.checked){
				sortByStr += "(Summary)";
				sortBy5="Y";
			}
			param += '[' + sortBy1 + ']';								// [25]
			param += '[' + sortBy2 + ']';								// [26]
			param += '[' + sortBy3 + ']';								// [27]
			param += '[' + sortBy4 + ']';								// [28]
			param += '[' + sortBy5 + ']';								// [29]
			param += '[' + sortByStr + ']';								// [30]
			if(formObj.f_cust_trdp_cd.value != ""){
				param += '[' + formObj.f_cust_trdp_cd.value + ']';		// [31]
			}else{
				param += '[]';											// [31]
			}
			if(formObj.f_sls_usrid.value != ""){
				param += '[' + formObj.f_sls_usrid.value + ']';			// [32]
			}else{
				param += '[]';											// [32]
			}
			param += '[' + usrNm + ']';									// [33]
			if(formObj.f_filter_by_chk_1.checked){
				param += '[' + 'Y' + ']';								// [34]
			}else{
				param += '[]';											// [34]
			}
			if(formObj.f_filter_by_chk_2.checked){
				param += '[' + 'Y' + ']';								// [35]
			}else{
				param += '[]';											// [35]
			}
			if(formObj.f_per_post_dt_chk.checked){
				param += '[' + 'Y' + ']';								// [36]
			}else{
				param += '[]';											// [36]
			}
			param += '[' + usrId + ']';									// [37]
			param += '[' + usrNm + ']';									// [38]
			param += '[' + usrPhn + ']';								// [39]
			param += '[' + usrFax + ']';								// [40]
			param += '[' + usrEml + ']';								// [41]
			param += '[' + dptTp6 + ']';								// [42]
			
			
			if(formObj.f_rpt_tp_rdo[0].checked){  //#240 opt 추가
				param += '[Y]';                                         // [43]  Revenue 
			}else{
				param += '[]';											// [43]  Cost
			}	
			
			formObj.rd_param.value=param;
			//console.log(param);
			if (pdf) {
				popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
				pdf = false;
			} else {
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}
			
		break;
		case "TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]=formObj.f_cust_trdp_nm.value;
			rtnary[2]=window;
//			var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px" , true);
//			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
//				return;
//			}else{
//				var rtnValAry=rtnVal.split("|");
//				formObj.f_cust_trdp_cd.value=rtnValAry[0];//full_nm
//				formObj.f_cust_trdp_nm.value=rtnValAry[2];//full_nm
//			}             
			 callBackFunc = "TRDP_POPLIST";
	         modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break;
		case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
	      	rtnary=new Array(1);
	   		rtnary[0]="1";
//	   		var rtnVal =  ComOpenWindow('./CMM_POP_0060.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px" , true);
//		        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
//			 	return;
//			}else{
//				var rtnValAry=rtnVal.split("|");
//				formObj.f_sls_usrid.value=rtnValAry[0];
//				formObj.f_sls_usrnm.value=rtnValAry[1];
//			}
	   		callBackFunc = "USER_POPLIST";
	        modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
		break;
		case "ALL_DPT":
			formObj.f_dpt_tp_1.checked=true;
			formObj.f_dpt_tp_2.checked=true;
			formObj.f_dpt_tp_3.checked=true;
			formObj.f_dpt_tp_4.checked=true;
			formObj.f_dpt_tp_5.checked=true;
			formObj.f_dpt_tp_6.checked=true;
		break;
		case "CLEAR_DPT":
			formObj.f_dpt_tp_1.checked=false;
			formObj.f_dpt_tp_2.checked=false;
			formObj.f_dpt_tp_3.checked=false;
			formObj.f_dpt_tp_4.checked=false;
			formObj.f_dpt_tp_5.checked=false;
			formObj.f_dpt_tp_6.checked=false;
		break;
    }
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	 formObj=document.frm1;
	 
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	 
	 formObj.per_strdt.value=getMonthFirstDate(-1);
	 formObj.per_enddt.value=getMonthLastDate(-1);
	 //formObj.f_rpt_tp[2].checked=true;
	 formObj.f_sort_by[1].checked=true;
	 
	 //#240 #52974 - [BNX, UNICO, STAR CLUSTER] AGENT AP FOR CREDIT NOTE
	 formObj.f_rpt_tp_rdo[0].checked=true;
	 changeRptType();	 
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
//		    var cal=new calendarPopup();
//	        cal.displayType="date";
//	        cal.select(formObj.per_dt, 'per_dt', 'MM-dd-yyyy');
	        var cal=new ComCalendar();
	        cal.select(formObj.per_dt, 'MM-dd-yyyy');
	    break;
        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
//            var cal=new calendarPopupFromTo();
//            cal.displayType="date";
//            cal.select(formObj.per_strdt, 'per_strdt', formObj.per_enddt, 'per_enddt', 'MM-dd-yyyy');
            var cal=new ComCalendarFromTo();
            cal.select(formObj.per_strdt,formObj.per_enddt, 'MM-dd-yyyy');
        break;
    }
}
function dateFieldChange(flg){
	var formObj=document.frm1;
	if(flg == "1"){
		document.getElementById("date_td1").style.display="inline";
		document.getElementById("date_td2").style.display="none";
		formObj.f_filter_by_chk_3.disabled=true;
		formObj.f_filter_by_chk_3.checked=false;
	}else{
		document.getElementById("date_td1").style.display="none";
		document.getElementById("date_td2").style.display="inline";
		formObj.f_filter_by_chk_3.disabled=false;
	}
}
/**
* code name select
*/
function codeNameAction(str, obj, tmp){
	CODETYPE=str;
 	var formObj=document.frm1;
 	var s_code=obj.value.toUpperCase();		
 	var s_type=str.substring(0,8);
 	if(str == "cust_trdpcode"){
 		s_type="trdpcode";
 	}else if(str == "user"){
 		s_type="user";
 	}
	if (s_code != "") {
 		if (tmp == "onKeyDown") {
 			if (event.keyCode == 13) {
 				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal',
 						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
 								+ '&s_code=' + s_code, './GateServlet.gsl');
 			}
 		} else if (tmp == "onBlur") {
 			if (s_code != "") {
 				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal',
 						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
 								+ '&s_code=' + s_code, './GateServlet.gsl');
 			}
 		}
 	} else {
 		if (CODETYPE == "cust_trdpcode") {
 			formObj.f_cust_trdp_cd.value="";// trdp_cd AS param1
 			formObj.f_cust_trdp_nm.value="";// eng_nm AS param2
 		}else if(CODETYPE == "user"){
 			formObj.f_sls_usrid.value="";
 			formObj.f_sls_usrnm.value="";
 		}
 	}
 }
 /**
 * Trade Partner 관련 코드조회
 */
 function dispCodeNameAjaxReq(reqVal){
 	var doc=getAjaxMsgXML(reqVal);
 	var formObj=document.frm1;
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			//조회해온 결과를 Parent에 표시함
 			var masterVals=doc[1].split('@@^');
 			if(CODETYPE =="cust_trdpcode"){
 				formObj.f_cust_trdp_cd.value=masterVals[0];		//trdp_cd  AS param1
 				formObj.f_cust_trdp_nm.value=masterVals[3];		//eng_nm   AS param2
 			}else if(CODETYPE =="user"){
 				formObj.f_sls_usrid.value=masterVals[0];
 	 			formObj.f_sls_usrnm.value=masterVals[3];
 			}
 		} else {
 			if(CODETYPE =="cust_trdpcode"){
 				formObj.f_cust_trdp_cd.value="";				//trdp_cd  AS param1
 				formObj.f_cust_trdp_nm.value="";				//eng_nm   AS param2
 			}else if(CODETYPE =="user"){
 				formObj.f_sls_usrid.value="";
 	 			formObj.f_sls_usrnm.value="";
 			}
 		}
 	}else{
 		//alert(getLabel('SEE_BMD_MSG43'));		
 	}
}
 function setDateCheck(obj){
	 var formObj=document.frm1;
	 if(obj.checked){
		 formObj.f_per_inv_dt_chk.checked=false;
		 formObj.f_per_post_dt_chk.checked=false;
		 obj.checked=true;
	 }else{
		 obj.checked=false;
	 }
 }
 function cntrPaidCheck(){
	 var formObj=document.frm1;
	 if(formObj.f_rpt_tp[0].checked){
		 formObj.f_per_post_dt_chk.disabled=false;
	 }else{
		 formObj.f_per_post_dt_chk.disabled=true;
	 }
 }
//Calendar flag value
var firCalFlag=false;

//#240 #52974 - [BNX, UNICO, STAR CLUSTER] AGENT AP FOR CREDIT NOTE
function changeRptType(){
	var formObj=document.frm1;

	formObj.f_rpt_tp_cbx_1.checked=false;
	formObj.f_rpt_tp_cbx_2.checked=false;
	formObj.f_rpt_tp_cbx_3.checked=false;
	formObj.f_rpt_tp_cbx_4.checked=false;
	formObj.f_rpt_tp_cbx_5.checked=false;
	formObj.f_rpt_tp_cbx_6.checked=false;	
	formObj.f_rpt_tp_cbx_7.checked=false;	//#240 opt 추가
	
	formObj.f_rpt_tp_cbx_1.disabled=true;
	formObj.f_rpt_tp_cbx_2.disabled=true;
	formObj.f_rpt_tp_cbx_3.disabled=true;
	formObj.f_rpt_tp_cbx_4.disabled=true;
	formObj.f_rpt_tp_cbx_5.disabled=true;
	formObj.f_rpt_tp_cbx_6.disabled=true;
	formObj.f_rpt_tp_cbx_7.disabled=true;    //#240 opt 추가
	
	
	formObj.f_per_inv_dt_chk.checked=false;
	formObj.f_per_post_dt_chk.checked=false;	
	
	if(formObj.f_rpt_tp_rdo[0].checked){
		formObj.f_rpt_tp_cbx_1.disabled=false;
		formObj.f_rpt_tp_cbx_4.disabled=false;
		formObj.f_rpt_tp_cbx_6.disabled=false;
		formObj.f_rpt_tp_cbx_7.disabled=false;    //#240 opt 추가
		
		formObj.f_per_post_dt_chk.disabled=false;
	}else{
		formObj.f_rpt_tp_cbx_2.disabled=false;
		formObj.f_rpt_tp_cbx_3.disabled=false;
		formObj.f_rpt_tp_cbx_5.disabled=false;
		formObj.f_rpt_tp_cbx_6.disabled=false;		
		
		formObj.f_per_post_dt_chk.disabled=true;
	}
	
	
	fn_RtpType('ALL');
}

function fn_RtpType(opt){
	var formObj=document.frm1;
	
	formObj.f_rpt_tp_cbx_1.checked=false;
	formObj.f_rpt_tp_cbx_2.checked=false;
	formObj.f_rpt_tp_cbx_3.checked=false;
	formObj.f_rpt_tp_cbx_4.checked=false;
	formObj.f_rpt_tp_cbx_5.checked=false;
	formObj.f_rpt_tp_cbx_6.checked=false;	
	formObj.f_rpt_tp_cbx_7.checked=false;	 //#240 opt 추가
	
	if(opt == 'ALL'){
		if(formObj.f_rpt_tp_rdo[0].checked){
			formObj.f_rpt_tp_cbx_1.checked=true;
			formObj.f_rpt_tp_cbx_4.checked=true;
			formObj.f_rpt_tp_cbx_6.checked=true;
			formObj.f_rpt_tp_cbx_7.checked=true;   //#240 opt 추가
		}else{
			formObj.f_rpt_tp_cbx_2.checked=true;
			formObj.f_rpt_tp_cbx_3.checked=true;
			formObj.f_rpt_tp_cbx_5.checked=true;
			formObj.f_rpt_tp_cbx_6.checked=true;		
		}		
	}
}