/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : PFM_ACC_0040.jsp
 *@FileTitle : Check Deposit Report
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
function doWork(srcName){
    var formObj  = document.frm1;

    switch(srcName) {
		case "PRINT":
			formObj.file_name.value = 'check_deposit_list_01.mrd';
			formObj.title.value = 'Check/Deposit List';
			
			//Parameter Setting
			var param = '';
			var cd_yn = "";
			var ck_yn = "";
			var db_yn = "";
			if(formObj.f_rpt_tp_1.checked == true && formObj.f_rpt_tp_2.checked == true){
				param += '[' + 'CD' + ']';							// [1]
				cd_yn = "Y";
			}else if(formObj.f_rpt_tp_1.checked == true){
				param += '[' + 'C' + ']';							// [1]
				ck_yn = "Y";
			}else if(formObj.f_rpt_tp_2.checked == true){			// [1]
				param += '[' + 'D' + ']';	
				db_yn = "Y";
			}else{
				alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_RPTT'));
				return;
			}
			
			if(formObj.f_per_radio[0].checked == true){
				param += '[' + 'Y' + ']';										// [2]
				param += '[]';													// [3]
			}else{
				param += '[]';													// [2]
				param += '[' + 'Y' + ']';										// [3]
			}
			
			if(!chkSearchCmprPrd(false, frm1.per_strdt, frm1.per_enddt)){
				return;
			}else{
				var sdt = formObj.per_strdt.value;
				sdt = sdt.substring(6,10) + sdt.substring(0,2) + sdt.substring(3,5);
				param += '[' + sdt + ']';										// [4]
				var edt = formObj.per_enddt.value;
				edt = edt.substring(6,10) + edt.substring(0,2) + edt.substring(3,5);
				param += '[' + edt + ']';										// [5]
			}
			
			if(formObj.f_sort_summ_radio[0].checked == true){
				param += '[' + 'vendor' + ']';									// [6]
			}else if(formObj.f_sort_summ_radio[1].checked == true){
				param += '[' + 'bank' + ']';									// [6]
			}else if(formObj.f_sort_summ_radio[2].checked == true){
				param += '[' + 'payto' + ']';									// [6]
			}else{
				param += '[' + 'date' + ']';									// [6]
			}
			
			//param += '[' + ofcCd + ']';											// [7]
			
			//#26340	[BINEX]Check/Deposit Report ???????????? ??????- 24120
			param += '[' + formObj.f_ofc_cd.value + ']';                        // [7]
			
			param += '[' + cd_yn + ']';											// [8]
			param += '[' + ck_yn + ']';											// [9]
			param += '[' + db_yn + ']';											// [10]
			
			//#27778	[BINEX]CHECK DEPOSIT REPORT ?????? - Sort By(Detail) ?????? ??????
			if(formObj.f_sort_dtl_radio[0].checked == true){
				param += '[' + 'date' + ']';									// [11]
			}else if(formObj.f_sort_dtl_radio[1].checked == true){
				param += '[' + 'chkno' + ']';									// [11]
			}
			
			if(formObj.f_show_dtl.checked == true){
				param += '[' + 'Y' + ']';										// [12]
			}else{
				param += '[' + 'N' + ']';										// [12]
			}
			
			if (cd_yn == "Y") {
				param += '[' + depositRoleLevel + ']';								// [13]
				param += '[' + checkRoleLevel + ']';								// [14]
			} else if (ck_yn == "Y") {
				param += '[]';														// [13]
				param += '[' + checkRoleLevel + ']';								// [14]
			} else if (db_yn == "Y") {
				param += '[' + depositRoleLevel + ']';								// [13]
				param += '[]';														// [14]
			}
			
			param += '['+formObj.deposit_level.value+']';// [15]
			param += '['+formObj.payment_level.value+']';// [16]
			param += '['+formObj.ofc_cd.value+']';// [17]
			param += '['+formObj.apo_flg.value+']'; // [18]
			//#1180 [ZEN CONTINENTAL] Add fillter TP type on Check Deposit Report screen by Duc.Nguyen 2017-09-05
			param += '['+formObj.f_trdp_tp_cd.value+']'; // [19]
			formObj.rd_param.value = param;
			//alert(formObj.rd_param.value);
	 
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
		
		case "ALL":
			formObj.f_rpt_tp_1.checked = true;
			formObj.f_rpt_tp_2.checked = true;
		break;
		
		case "CLEAR":
			formObj.f_rpt_tp_1.checked = false;
			formObj.f_rpt_tp_2.checked = false;
		break;
    }
}

/**
 * Sheet ?????? ?????? ??? ?????????
 * body ????????? onLoad ?????????????????? ??????
 * ????????? ?????????????????? ????????? ?????? ??????????????? ?????? ????????? ????????????
 */
function loadPage() {
	 
	var formObj  = document.frm1;
	
	//LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);
    
	document.frm1.per_strdt.value = getTodayStr();
	document.frm1.per_enddt.value = getTodayStr();
}

/**
 * ???????????? ???????????? ?????????
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //?????? ?????? From ~ To ?????? ?????? 
//            var cal = new calendarPopupFromTo();
//            cal.displayType = "date";
//            cal.select(formObj.per_strdt, 'per_strdt', formObj.per_enddt, 'per_enddt', 'MM-dd-yyyy');
            var cal=new ComCalendarFromTo();
            cal.select(formObj.per_strdt,formObj.per_enddt, 'MM-dd-yyyy');
        break;
    }
}
 
//Calendar flag value
 var firCalFlag = false;
