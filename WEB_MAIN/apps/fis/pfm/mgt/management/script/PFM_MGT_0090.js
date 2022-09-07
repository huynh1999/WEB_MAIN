/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0090.jsp
*@FileTitle  : G/L Report
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/17
=========================================================*/
var CAN_YN = '';
var G_GL_DATA_CREATE_STATUS = "END";
var caOfcList = '';
var pdf = false;
function pdfDown(prn){
	pdf = true;
	doWork(prn);
}


function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		    frm1.f_cmd.value=-1;
	        formObj.submit();
	   break;
	   case "ALLCLEAR":
		   doAllClear();
	   break;
       case "RPTCHECK":
    	   for(var i=0; i < 6; i++){
    		   if(!formObj.rpt_tp[i].disabled){
    			   formObj.rpt_tp[i].checked=true;
    		   }
    	   }
    	   if(!formObj.exp_ar_ck.disabled){
    		   if (GA_AR_YN == "Y"){
        		   formObj.exp_ar_ck.checked=true;
    		   }
		   } else {
			   formObj.exp_ar_ck.checked=false;
		   }
    	   
    	   if(!formObj.exp_ap_ck.disabled){
    		   if (GA_AP_YN == "Y"){
    			   formObj.exp_ap_ck.checked=true;
    		   }
		   } else {
			   formObj.exp_ap_ck.checked=false;
		   }
		   
       break;
       case "RPTCLEAR":
    	   formObj.rpt_tp[0].checked=false;
    	   formObj.rpt_tp[1].checked=false;
    	   formObj.rpt_tp[2].checked=false;
    	   formObj.rpt_tp[3].checked=false;
    	   formObj.rpt_tp[4].checked=false;
    	   formObj.rpt_tp[5].checked=false;
    	   formObj.exp_ar_ck.checked=false;
    	   formObj.exp_ap_ck.checked=false;
       break;
       case "CURR_SEARCH":
           formObj.f_cmd.value=SEARCHLIST01;
           var s_curr_opt=document.getElementsByName("s_curr_opt");	//Currency Option
           
 	       if(s_curr_opt[0].checked == true){
	 	   	   return;                    
		   }
 	       
		   if(formObj.s_curr_cd.value == ""){
		    	//Please, select the [To Currency]
		    	alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_TCUR'));
		    	formObj.s_curr_cd.focus();  
				return;
		   }
           var s_curr_opt = document.getElementsByName("s_curr_opt");	//Currency Option
           //<!-- #1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION -->
           var selectedValues = $("#s_ofc_cd").multipleSelect("getSelects");
       	   formObj.f_sel_ofc.value = selectedValues;    
       	   
		   sheetObj.DoSearch("./PFM_MGT_0090_1GS.clt", FormQueryString(formObj) );
       break;
       case 'PRINT':
    	   if(!chkSearchCmprPrd(true, frm1.f_fr_dt, frm1.f_to_dt)){
    			return;
    	   }
    	   
    	   // #52472 [CLT] 안정성
    	   // Period Search 조건의 두 날짜의 Limit범위를 지정(단위 : 일수) System > Admin > System Option Settings에서 관리
    	   var opt_key = "GL_RPT_TERM_PERIOD";
    	   ajaxSendPost(getGlSrhTrmPeriodReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    	   return;
    	   break; 	   
       case 'GL_CREATE_END_ACTION':
    	   if(!chkSearchCmprPrd(true, frm1.f_fr_dt, frm1.f_to_dt)){
    			return;
    	   }
    	   var fr_dt=formObj.f_fr_dt.value.replaceAll("-", "");
    	   var to_dt=formObj.f_to_dt.value.replaceAll("-", "");
    	   fr_dt=fr_dt.substring(4,8) + fr_dt.substring(0,2) + fr_dt.substring(2,4);
    	   to_dt=to_dt.substring(4,8) + to_dt.substring(0,2) + to_dt.substring(2,4);
    	   var rtp_type="";
    	   var chk_cnt=0;
    	   var beg_bal_chk='N';
    	   if(formObj.rpt_tp[4].checked){
  			   rtp_type += "Accounts Payable";
  			   chk_cnt += 1;
  		   }
    	   if(formObj.rpt_tp[1].checked){
    		   if(chk_cnt > 0){
    			   rtp_type += ", Check";
    		   }else{
    			   rtp_type += "Check";
    		   }
    		   chk_cnt += 1;
   		   }
    	   if(formObj.rpt_tp[2].checked){
    		   if(chk_cnt > 0){
    			   rtp_type += ", Credit/Debit Note";
    		   }else{
    			   rtp_type += "Credit/Debit Note";
    		   }
    		   chk_cnt += 1;
    	   }
   		   if(formObj.rpt_tp[0].checked){
	   	       if(chk_cnt > 0){
	   	           rtp_type += ", Local Invoice";	
	   		   }else{
	   			   rtp_type += "Local Invoice";
	   		   }
	   	       chk_cnt += 1;
   		   }
   		   if(formObj.rpt_tp[3].checked){
	   			if(chk_cnt > 0){
	   				rtp_type += ", Deposit";
	   			}else{
	   				rtp_type += "Deposit";
	   			}
	   			chk_cnt += 1;
		   }
   		   if(formObj.rpt_tp[5].checked){
	   			if(chk_cnt > 0){
	   				rtp_type += ", Journal";
	   			}else{
	   				rtp_type += "Journal";
	   			}
	   			chk_cnt += 1;
		   }
	   	   if(formObj.rpt_tp[6].checked){
	   		    if(chk_cnt > 0){
	   				rtp_type += ", O/B Expense";
	   			}else{
	   				rtp_type += "O/B Expense";
	   			}
	   			chk_cnt += 1;
		   }
		   if(formObj.exp_ar_ck.checked){
		   		if(chk_cnt > 0){
		   			rtp_type += ", A/R(G&A)";
	   			}else{
	   				rtp_type += "A/R(G&A)";
	   			}
		   		chk_cnt += 1;
		   }
	   	   if(formObj.exp_ap_ck.checked){
		   		if(chk_cnt > 0){
		   			rtp_type += ", A/P Expense";
	   			}else{
	   				rtp_type += "A/P Expense";
	   			}
		   }
		   if(formObj.beg_bal_chk.checked){
			   beg_bal_chk="Y";
	       }
		   //One Currency 일 경우, Param Flag 
		   var s_curr_opt=document.getElementsByName("s_curr_opt");	//Currency Option
		   var multi_curr_flg="T";
 	       if(s_curr_opt[1].checked == true){
 	    	  multi_curr_flg="";                    
		   }
 	       
 	       // #26335 [BINEX]Branch "전체"로 리포트를 뽑을 때 Branch 별로도 볼수 가 있어야함 - 24664
   		   // “TOTAL”, “SORT BY OFFICE”, “SORT BY G/L”  옵션
   		   var sortOpt = "";
   		   if (formObj.sort_by_rd[1].checked) {
   			   sortOpt = "O"; // SORT BY OFFICE
   		   } else if (formObj.sort_by_rd[2].checked) {
   			   sortOpt = "G"; // SORT BY G/L
   		   } else {
   			   sortOpt = "";	// TOTAL
   		   }
   		   //mrd파일에서 넘겨주는 파라
   		   var pOfcCd = "";
 	       
    	   if(formObj.gl_tp[0].checked){
    		   if(formObj.sum_dtl[0].checked){
    			   formObj.file_name.value='billing_code_summary.mrd';
        		   formObj.title.value='BILLING CODE SUMMARY';
    		   }else {
    			   formObj.file_name.value='billing_code_detail.mrd';
        		   formObj.title.value='BILLING CODE DETAIL';
    		   }
    		   var param='[' + formObj.f_ofc_nm.value + ']';				// OFC_NM [1]
	           param += '[' + fr_dt + ']';									// [2]
	   		   param += '[' + to_dt + ']';									// [3]
	   		   param += '[' + formObj.f_usr_nm.value + ']';					// [4]
	   		   param += '[' + TODAY + ']';									// [5]
	   		   param += '[' + rtp_type + ']';								// [6]
	   		   param += '[' + fr_dt + ']';									// [7]
	   		   param += '[' + to_dt + ']';									// [8]
	   		   var inv_type="";
	   		   if(formObj.rpt_tp[0].checked){
	   			   inv_type += "'S'";
	  		   }
	    	   if(formObj.rpt_tp[2].checked){
	    		   if(formObj.rpt_tp[0].checked){
	    			   inv_type += ",'C','D'";
	    		   }else{
	    			   inv_type += "'C','D'";
	    		   }
	    	   }
	   		   if(formObj.rpt_tp[4].checked){
	   			   if(formObj.rpt_tp[0].checked || formObj.rpt_tp[2].checked){
	   				   inv_type += ",'B'";
	   			   }else{
	   				   inv_type += "'B'";
	   			   }
	   		   }
	   		   if(formObj.exp_ar_ck.checked){
	   			if(formObj.rpt_tp[0].checked || formObj.rpt_tp[2].checked){
	   				   inv_type += ",'S'";
	   			   }else{
	   				   inv_type += "'S'";
	   			   }
	   		   }
	   		  if(formObj.exp_ap_ck.checked){
	   			if(inv_type != ""){
	   				   inv_type += ",'B'";
	   			   }else{
	   				   inv_type += "'B'";
	   			   }
	   		   }
	   		   param += '[' + inv_type + ']';								// [9]
	   		   var ap_yn="";
	   		   var exp_yn="";
	   		   if(formObj.rpt_tp[1].checked || formObj.rpt_tp[4].checked){
	    		   ap_yn="Y";
	    	   }
	   		   if(formObj.exp_ar_ck.checked || formObj.exp_ap_ck.checked){
	   			   exp_yn="Y";
	   		   }
	   		   param += '[' + ap_yn + ']';								// [10]	
	   		   param += '[' + exp_yn + ']';								// [11]	 
	   		   param += '[' + beg_bal_chk + ']';						// [12]
	   		   param += '[' + formObj.f_usr_id.value + ']';				// [13]
	   		   param += '[' + formObj.f_usrphn.value + ']';				// [14]
	   		   param += '[' + formObj.f_email.value + ']';				// [15]
	   		   param += '[]';											// [16]
	   		   //#1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION
	   		   if(CAN_YN!='Y'){
				   var selectedValues = $("#s_ofc_cd").multipleSelect("getSelects");
		   		   param += '[' + selectedValues + ']';						// [17]
			   }else{
				   param += '[' + caOfcList + ']';				// [17]
			   }
	   		  // param += '[' + formObj.s_ofc_cd.value + ']';				// [17]
	   		   param += '[' + multi_curr_flg + ']';						// [18]
	   		   param += '[' + formObj.s_curr_cd.value + ']';			// [19]
	   		   param += '[' + getRateQuery() + ']';						// [20]
	   		   param += '[]';											// [21]  사용안함. 
	   		   
	   		   // #26335 [BINEX]Branch "전체"로 리포트를 뽑을 때 Branch 별로도 볼수 가 있어야함 - 24664
	   		   if (formObj.sort_by_rd[1].checked) {
	   			   sortOpt = "O"; // SORT BY OFFICE
	   		   } else {
	   			   sortOpt = "";	// TOTAL
	   		   }
	   		   param += '[' + sortOpt + ']';							// [22]
	   		   var pOfcCd = "";
	   		   param += '[' + pOfcCd + ']';								// [23]
	   		   
	   		   param += '[]';											// [24] GL Summary, I/S, B/S 에서 GL Detail 연결시 하이퍼 링크 속성에 추가된 param, js 에서는 value 없슴. 
	   		   
	   		   //BINEX 요구사항, TOR 정산을 위한 Parma, TOR 조회시, "Y"
			   param += '[' + CAN_YN + ']';				                // [25]
			   
	   		   //#48071 [AGL] Accounting Report들을 Invoice Date으로 표시 하는 Option 요청 
	   		   var dtTp_check ="";
	   		   if(formObj.f_dt_tp_radio[0].checked == true){
	   			   dtTp_check = '';								
	   		   } else {
	   			   dtTp_check = 'I';								
	   		   } 
	   		   param += '[' + dtTp_check + ']';	                         // [26]
	   		   
	   		   
	   		   if( !formObj.rpt_tp[0].checked && !formObj.rpt_tp[1].checked && !formObj.rpt_tp[2].checked &&
	   			   !formObj.rpt_tp[3].checked && !formObj.rpt_tp[4].checked && !formObj.rpt_tp[5].checked && 
	   			   !formObj.rpt_tp[6].checked && !formObj.exp_ar_ck.checked && !formObj.exp_ap_ck.checked ){
	   			   //Select Report Type!!
	   			   alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_RPTT'));
	   			   return;
	   		   }
	   		   formObj.rd_param.value=param;
	   		   //popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   		if (pdf) {
		   			popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
		   			pdf = false;
		   		} else {
		   			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   		}
	   		
    	   }else if(formObj.gl_tp[1].checked){
    		   if(formObj.sum_dtl[0].checked){
    			   formObj.file_name.value='gl_code_summary_01.mrd';
        		   formObj.title.value='G/L CODE SUMMARY';
    		   }else if(formObj.sum_dtl[1].checked){
    			   formObj.file_name.value='gl_code_detail_01.mrd';
        		   formObj.title.value='G/L CODE DETAIL';
    		   }else {
    			   formObj.file_name.value='gl_code_detail_landscape_01.mrd';
        		   formObj.title.value='G/L CODE DETAIL(Landscape)';
    		   }
    		   var param='[' + formObj.f_ofc_nm.value + ']';				// OFC_NM [1]
	           param += '[' + fr_dt + ']';									// [2]
	   		   param += '[' + to_dt + ']';									// [3]
	   		   param += '[' + formObj.f_usr_nm.value + ']';					// [4]
	   		   param += '[' + TODAY + ']';									// [5]
	   		   param += '[' + rtp_type + ']';								// [6]
	   		   param += '[' + fr_dt + ']';									// [7]
	   		   param += '[' + to_dt + ']';									// [8]
	   		   var ap_yn="N";
	   		   var dp_yn="N";
	   		   var ck_yn="N";
	   		   var jr_yn="N";
	   		   var ob_yn="N";
	   		   var exp_ar_yn="N";
	   		   var exp_ap_yn="N";
	   		   var chk_cnt=0;
	   		   if(formObj.rpt_tp[1].checked){
	   			   ck_yn="Y";
	   			   chk_cnt += 1;
	  		   }
	    	   if(formObj.rpt_tp[3].checked){
	    		   dp_yn="Y";
	    		   chk_cnt += 1;
	    	   }
	    	   if(formObj.rpt_tp[4].checked){
	    		   ap_yn="Y";
	    		   chk_cnt += 1;
	    	   }
	   		   if(formObj.rpt_tp[5].checked){
	   			   jr_yn="Y";
	   			   chk_cnt += 1;
	   		   }
	   		   if(formObj.exp_ar_ck.checked){
	   			   exp_ar_yn="Y";
	   			   chk_cnt += 1;
	   		   }
	   		   if(formObj.exp_ap_ck.checked){
	   			   exp_ap_yn="Y";
	   			   chk_cnt += 1;
	   		   }
	   		   //LHK 20131205 Report Query 에서 확인시 아래 param Check시에 G&A AP 조회 조건을 봄, 따라서 수정함. 
//	   		   param += '[' + ap_yn + ']';								// [9]
	   		   param += '[' + exp_ar_yn + ']';							// [9]
	   		   param += '[' + dp_yn + ']';								// [10]
	   		   param += '[' + ck_yn + ']';								// [11]
	   		   param += '[' + jr_yn + ']';								// [12]
	   		   // LHK 20131205 , GL Report View 참조하도록 수정하면서 union 관련 param은 사용되지 않음
	   		   // GL Report Link 관련 param 추가시 많은 수정을 요함, 
	   		   // 사용되지 않는 아래 param 13 을 이용해서 추가된 AR(G&A) check 여부로 사용함. 
	   		   param += '[' + exp_ap_yn + ']';							// [13]
	   		   var ap_union="Y";
	   		   var dp_union="Y";
	   		   var ck_union="Y";
	   		   var jr_union="Y";
	   		   if(ap_yn == "N"){
	   			   ap_union="N";
	   		   }
	   		   if(dp_yn == "N"){
	   			   dp_union="N";
	   		   }
	   		   if(ck_yn == "N"){
	   			   ck_union="N";
	   		   }
	   		   if(jr_yn == "N"){
	   			   jr_union="N";
	   		   }
	   		   if(chk_cnt == 0){
	   		   }else if(chk_cnt == 1){
	   			   ap_union="N";
		   		   dp_union="N";
		   		   ck_union="N";
		   		   jr_union="N";
		   		   ob_union="N";
	   		   }else{
	   			   if(ap_yn == "N"){
	   				   ap_union="N";
	   				   ck_union="N";
	   			   }
	   			   if(ap_yn == "N" && ck_yn == "N"){
	   				   dp_union="N";
	   			   }
	   			   if(ap_yn == "N" && ck_yn == "N" && dp_yn == "N"){
	   				   jr_union="N";
	   			   }
	   		   }
	   		   //param += '[' + ap_union + ']';							// [13]
	   		   param += '[' + dp_union + ']';							// [14]
	   		   param += '[' + ck_union + ']';							// [15]
	   		   param += '[' + jr_union + ']';							// [16]
	   		   var range_yn="Y";
	   		   if(formObj.range_fr.value == "" && formObj.range_to.value == ""){
	   			   range_yn="N";
	   			   param += '[]';												// [17]
	   			   param += '[]';												// [18]
	   		   }else if(formObj.range_fr.value == "" && formObj.range_to.value != ""){
	   			   param += '[' + formObj.all_range_fr.value + ']';				// [17]
	   			   param += '[' + formObj.range_to.value + ']';					// [18]
	   		   }else if(formObj.range_fr.value != "" && formObj.range_to.value == ""){
	   			   param += '[' + formObj.range_fr.value + ']';					// [17]
	   			   param += '[' + formObj.all_range_to.value + ']';				// [18]
	   		   }else if(formObj.range_fr.value != "" && formObj.range_to.value != ""){
	   			   param += '[' + formObj.range_fr.value + ']';					// [17]
	   			   param += '[' + formObj.range_to.value + ']';					// [18]
	   		   }
	   		   param += '[' + range_yn + ']';							// [19]
	   		   if(formObj.sub_grp.value != ""){
	   			   param += '[Y]';				// [20]
	   		   }else{
	   			   param += '[N]';				// [20]
	   		   }
	   		   param += '[' + formObj.sub_grp.value + ']';				// [21]
	   		   //O/B EXPENSE 추가
	   		   if( (formObj.rpt_tp[0].checked || formObj.rpt_tp[1].checked || formObj.rpt_tp[2].checked || formObj.rpt_tp[3].checked ||
	   				formObj.rpt_tp[4].checked || formObj.rpt_tp[5].checked) && formObj.rpt_tp[6].checked){
	   			   ob_union="Y";
	   			   ob_yn="Y";
	   		   }else{
	   		       if(formObj.rpt_tp[6].checked){
	   		    	   ob_union="N";
	   		    	   ob_yn="Y";
	   		       }else{
	   		    	   ob_union="N";
	   		    	   ob_yn="N";
	   		       }
	   		   }
	   		   param += '[' + ob_yn + ']';								// [22]
	   		   param += '[' + ob_union + ']';							// [23]
	   		   param += '[' + beg_bal_chk + ']';						// [24]
	   		   param += '[' + formObj.f_usr_id.value + ']';				// [25]
	   		   param += '[' + formObj.f_usrphn.value + ']';				// [26]
	   		   param += '[' + formObj.f_email.value + ']';				// [27]
	   		//#1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION
	   		   if(CAN_YN!='Y'){
				   var selectedValues = $("#s_ofc_cd").multipleSelect("getSelects");
		   		   param += '[' + selectedValues + ']';						// [28]
			   }else{
				   param += '[' + caOfcList + ']';				// [28]
			   }
	   		   //param += '[' + formObj.s_ofc_cd.value + ']';				// [28]
	   		   param += '[' + multi_curr_flg + ']';						// [29]
	   		   param += '[' + formObj.s_curr_cd.value + ']';			// [30]
	   		   param += '[' + getRateQuery() + ']';						// [31]
	   		   param += '[]';											// [32] 사용안함
	   		   
	   		   // #26335 [BINEX]Branch "전체"로 리포트를 뽑을 때 Branch 별로도 볼수 가 있어야함 - 24664
	   		   param += '[' + sortOpt + ']';							// [33]
	   		   var pOfcCd = "";
	   		   param += '[' + pOfcCd + ']';								// [34]
	   		   
	   		   param += '[]';											// [35] GL Summary, I/S, B/S 에서 GL Detail 연결시 하이퍼 링크 속석에 추가된 param, js 에서는 value 없슴. 
	   		   
	   		   //BINEX 요구사항, TOR 정산을 위한 Parma, TOR 조회시, "Y"
			   param += '[' + CAN_YN + ']';				                // [36]
	   		   
	   		   //#48071 [AGL] Accounting Report들을 Invoice Date으로 표시 하는 Option 요청 
	   		   var dtTp_check ="";
	   		   if(formObj.f_dt_tp_radio[0].checked == true){
	   			   dtTp_check = '';								
	   		   } else {
	   			   dtTp_check = 'I';								
	   		   } 
	   		   param += '[' + dtTp_check + ']';	                         // [37]
	   		   
	   		   if( !formObj.rpt_tp[0].checked && !formObj.rpt_tp[1].checked && !formObj.rpt_tp[2].checked &&
	   			   !formObj.rpt_tp[3].checked && !formObj.rpt_tp[4].checked && !formObj.rpt_tp[5].checked && 
	   			   !formObj.rpt_tp[6].checked && !formObj.exp_ar_ck.checked && !formObj.exp_ap_ck.checked ){
	   			   //Select Report Type!!
	   			   alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_RPTT'));
	   			   return;
	   		   }

	   		   formObj.rd_param.value=param;
	   		   //popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   		if (pdf) {
		   			popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
		   			pdf = false;
		   		} else {
		   			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   		}
	   		   
    	   }else if(formObj.gl_tp[2].checked){
    		   if(formObj.sum_dtl[0].checked){
    			   formObj.file_name.value='gl_code_summary_02.mrd';
        		   formObj.title.value='G/L CODE SUMMARY';
    		   }else if(formObj.sum_dtl[1].checked){
    			   formObj.file_name.value='gl_code_detail_02.mrd';
        		   formObj.title.value='G/L CODE DETAIL';
    		   }else {
    			   formObj.file_name.value='gl_code_detail_landscape_02.mrd';
        		   formObj.title.value='G/L CODE DETAIL(Landscape)';
    		   }
    		   var param='[' + formObj.f_ofc_nm.value + ']';				// OFC_NM [1]
	           param += '[' + fr_dt + ']';									// [2]
	   		   param += '[' + to_dt + ']';									// [3]
	   		   param += '[' + formObj.f_usr_nm.value + ']';					// [4]
	   		   param += '[' + TODAY + ']';									// [5]
	   		   param += '[' + rtp_type + ']';								// [6]
	   		   param += '[' + fr_dt + ']';									// [7]
	   		   param += '[' + to_dt + ']';									// [8]
	   		   var lc_yn="N";
	   		   var cr_yn="N";
	   		   var ap_yn="N";
	   		   var dp_yn="N";
	   		   var ck_yn="N";
	   		   var jr_yn="N";
	   		   var chk_cnt=0;
	   		   if(formObj.rpt_tp[0].checked){
	   			   lc_yn="Y";
	   			   chk_cnt += 1;
	  		   }
	   		   if(formObj.rpt_tp[1].checked){
	   			   ck_yn="Y";
	   			   chk_cnt += 1;
	  		   }
	   		   if(formObj.rpt_tp[2].checked){
	   			   cr_yn="Y";
	   			   chk_cnt += 1;
	  		   }
	    	   if(formObj.rpt_tp[3].checked){
	    		   dp_yn="Y";
	    		   chk_cnt += 1;
	    	   }
	    	   if(formObj.rpt_tp[4].checked){
	    		   ap_yn="Y";
	    		   chk_cnt += 1;
	    	   }
	   		   if(formObj.rpt_tp[5].checked){
	   			   jr_yn="Y";
	   			   chk_cnt += 1;
	   		   }
	   		   param += '[' + lc_yn + ']';								// [9]
	   		   param += '[' + cr_yn + ']';								// [10]
	   		   param += '[' + ap_yn + ']';								// [11]
	   		   param += '[' + dp_yn + ']';								// [12]
	   		   param += '[' + ck_yn + ']';								// [13]
	   		   param += '[' + jr_yn + ']';								// [14]
	   		   var lc_union="Y";
	   		   var cr_union="Y";
	   		   var ap_union="Y";
	   		   var dp_union="Y";
	   		   var ck_union="Y";
	   		   var jr_union="Y";
	   		   if(lc_yn == "N"){
	   			   lc_union="N";
	   		   }
	   			if(cr_yn == "N"){
	   			   cr_union="N";
	   		   }
	   		   if(ap_yn == "N"){
	   			   ap_union="N";
	   		   }
	   		   if(dp_yn == "N"){
	   			   dp_union="N";
	   		   }
	   		   if(ck_yn == "N"){
	   			   ck_union="N";
	   		   }
	   		   if(jr_yn == "N"){
	   			   jr_union="N";
	   		   }
	   		   if(chk_cnt == 0){
	   		   }else if(chk_cnt == 1){
	   			   lc_union="N";
	   			   cr_union="N";
	   			   ap_union="N";
		   		   dp_union="N";
		   		   ck_union="N";
		   		   jr_union="N";
	   		   }else{
	   			   if(lc_yn == "N"){
	   				   cr_union="N";
	   			   }
	   			   if(lc_yn == "N" && cr_yn == "N"){
	   				   ap_union="N";
	   			   }
	   			   if(lc_yn == "N" && cr_yn == "N" && ap_yn == "N"){
	   				   ck_union="N";
	   			   }
	   			   if(lc_yn == "N" && cr_yn == "N" && ap_yn == "N" && ck_yn == "N"){
	   				   dp_union="N";
	   			   }
	   			   if(lc_yn == "N" && cr_yn == "N" && ap_yn == "N" && ck_yn == "N" && dp_yn == "N"){
	   				   jr_union="N";
	   			   }
	   		   }
	   		   param += '[' + lc_union + ']';							// [15]
	   		   param += '[' + cr_union + ']';							// [16]
	   		   param += '[' + ap_union + ']';							// [17]
	   		   param += '[' + dp_union + ']';							// [18]
	   		   param += '[' + ck_union + ']';							// [19]
	   		   param += '[' + jr_union + ']';							// [20]
	   		   var range_yn="Y";
	   		   if(formObj.range_fr.value == "" && formObj.range_to.value == ""){
	   			   range_yn="N";
	   			   param += '[]';												// [21]
	   			   param += '[]';												// [22]
	   		   }else if(formObj.range_fr.value == "" && formObj.range_to.value != ""){
	   			   param += '[' + formObj.all_range_fr.value + ']';				// [21]
	   			   param += '[' + formObj.range_to.value + ']';					// [22]
	   		   }else if(formObj.range_fr.value != "" && formObj.range_to.value == ""){
	   			   param += '[' + formObj.range_fr.value + ']';					// [21]
	   			   param += '[' + formObj.all_range_to.value + ']';				// [22]
	   		   }else if(formObj.range_fr.value != "" && formObj.range_to.value != ""){
	   			   param += '[' + formObj.range_fr.value + ']';					// [21]
	   			   param += '[' + formObj.range_to.value + ']';					// [22]
	   		   }
	   		   param += '[' + range_yn + ']';							// [23]
	   		   if(formObj.sub_grp.value != ""){
	   			   param += '[Y]';				// [24]
	   		   }else{
	   			   param += '[N]';				// [24]
	   		   }
	   		   param += '[' + formObj.sub_grp.value + ']';				// [25]
	   		   //O/B EXPENSE 추가
	   		   if( (formObj.rpt_tp[0].checked || formObj.rpt_tp[1].checked || formObj.rpt_tp[2].checked || formObj.rpt_tp[3].checked ||
	   				formObj.rpt_tp[4].checked || formObj.rpt_tp[5].checked) && formObj.rpt_tp[6].checked){
	   			   ob_union="Y";
	   			   ob_yn="Y";
	   		   }else{
	   		       if(formObj.rpt_tp[6].checked){
	   		    	   ob_union="N";
	   		    	   ob_yn="Y";
	   		       }else{
	   		    	   ob_union="N";
	   		    	   ob_yn="N";
	   		       }
	   		   }
	   		   param += '[' + ob_yn + ']';								// [26]
	   		   param += '[' + ob_union + ']';							// [27]
	   		   param += '[' + beg_bal_chk + ']';						// [28]
	   		   param += '[' + formObj.f_usr_id.value + ']';				// [29]
	   		   param += '[' + formObj.f_usrphn.value + ']';				// [30]
	   		   param += '[' + formObj.f_email.value + ']';				// [31]
	   		   //#1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION
	   		   if(CAN_YN!='Y'){
				   var selectedValues = $("#s_ofc_cd").multipleSelect("getSelects");
		   		   param += '[' + selectedValues + ']';						// [32]
			   }else{
				   param += '[' + caOfcList + ']';				// [32]
			   }
	   		  // param += '[' + formObj.s_ofc_cd.value + ']';				// [32]
	   		   param += '[' + multi_curr_flg + ']';						// [33]
	   		   param += '[' + formObj.s_curr_cd.value + ']';			// [34]
	   		   param += '[' + getRateQuery() + ']';						// [35]
	   		   param += '[]';											// [36] 사용안함
	   		   // #26335 [BINEX]Branch "전체"로 리포트를 뽑을 때 Branch 별로도 볼수 가 있어야함 - 24664
	   		   param += '[' + sortOpt + ']';							// [37]
	   		   var pOfcCd = "";
	   		   param += '[' + pOfcCd + ']';								// [38]
	   		   
	   		   param += '[]';											// [39] GL Summary, I/S, B/S 에서 GL Detail 연결시 하이퍼 링크 속석에 추가된 param, js 에서는 value 없슴. 
	   		   
	   		   //BINEX 요구사항, TOR 정산을 위한 Parma, TOR 조회시, "Y"
			   param += '[' + CAN_YN + ']';				                // [40]
	   		   
	   		   //#48071 [AGL] Accounting Report들을 Invoice Date으로 표시 하는 Option 요청 
	   		   var dtTp_check ="";
	   		   if(formObj.f_dt_tp_radio[0].checked == true){
	   			   dtTp_check = '';								
	   		   } else {
	   			   dtTp_check = 'I';								
	   		   } 
	   		   param += '[' + dtTp_check + ']';	                         // [41]
	   		   
	   		   if( !formObj.rpt_tp[0].checked && !formObj.rpt_tp[1].checked && !formObj.rpt_tp[2].checked &&
	   			   !formObj.rpt_tp[3].checked && !formObj.rpt_tp[4].checked && !formObj.rpt_tp[5].checked && 
	   			   !formObj.rpt_tp[6].checked ){
	   			   //Select Report Type!!
	   			   alert(getLabel('PFM_COM_ALT005')+ "\n\n: PFM_MGT_0090.493");
	   			   return;
	   		   }
	   		   
	   		   formObj.rd_param.value=param;
	   		   //popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   		if (pdf) {
		   			popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
		   			pdf = false;
		   		} else {
		   			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   		}
    	   } 
    	   else if(!formObj.gl_tp[0].checked && !formObj.gl_tp[1].checked && !formObj.gl_tp[2].checked){
    		   if(formObj.sum_dtl[0].checked){
    			   formObj.file_name.value='gl_code_summary_03.mrd';
        		   formObj.title.value='G/L CODE SUMMARY';
    		   }else if(formObj.sum_dtl[1].checked){
    			   formObj.file_name.value='gl_code_detail_03.mrd';
        		   formObj.title.value='G/L CODE DETAIL';
    		   }else {
    			   formObj.file_name.value='gl_code_detail_landscape_03.mrd';
        		   formObj.title.value='G/L CODE DETAIL(Landscape)';
    		   }
    		   var param='[' + formObj.f_ofc_nm.value + ']';				// OFC_NM [1]
	           param += '[' + fr_dt + ']';									// [2]
	   		   param += '[' + to_dt + ']';									// [3]
	   		   param += '[' + formObj.f_usr_nm.value + ']';					// [4]
	   		   param += '[' + TODAY + ']';									// [5]
	   		   param += '[' + rtp_type + ']';								// [6]
	   		   param += '[' + fr_dt + ']';									// [7]
	   		   param += '[' + to_dt + ']';									// [8]
	   		   var lc_yn="N";
	   		   var cr_yn="N";
	   		   var ap_yn="N";
	   		   var dp_yn="N";
	   		   var ck_yn="N";
	   		   var jr_yn="N";
	   		   var exp_ap_yn="N";
	   		   var chk_cnt=0;
	   		   if(formObj.rpt_tp[0].checked){
	   			   lc_yn="Y";
	   			   chk_cnt += 1;
	  		   }
	   		   if(formObj.rpt_tp[1].checked){
	   			   ck_yn="Y";
	   			   chk_cnt += 1;
	  		   }
	   		   if(formObj.rpt_tp[2].checked){
	   			   cr_yn="Y";
	   			   chk_cnt += 1;
	  		   }
	    	   if(formObj.rpt_tp[3].checked){
	    		   dp_yn="Y";
	    		   chk_cnt += 1;
	    	   }
	    	   if(formObj.rpt_tp[4].checked){
	    		   ap_yn="Y";
	    		   chk_cnt += 1;
	    	   }
	   		   if(formObj.rpt_tp[5].checked){
	   			   jr_yn="Y";
	   			   chk_cnt += 1;
	   		   }
	   		   if(formObj.exp_ap_ck.checked){
	   			   exp_ap_yn="Y";
	   		   }
	   		   param += '[' + lc_yn + ']';								// [9]
	   		   param += '[' + cr_yn + ']';								// [10]
	   		   param += '[' + ap_yn + ']';								// [11]
	   		   param += '[' + dp_yn + ']';								// [12]
	   		   param += '[' + ck_yn + ']';								// [13]
	   		   param += '[' + jr_yn + ']';								// [14]
	   		   var lc_union="Y";
	   		   var cr_union="Y";
	   		   var ap_union="Y";
	   		   var dp_union="Y";
	   		   var ck_union="Y";
	   		   var jr_union="Y";
	   		   /*
	   		   if(lc_yn == "N"){
	   			   lc_union="N";
	   		   }
	   			if(cr_yn == "N"){
	   			   cr_union="N";
	   		   }
	   		   if(ap_yn == "N" && exp_ap_yn == "N"){
	   			   ap_union="N";
	   		   }
	   		   if(dp_yn == "N"){
	   			   dp_union="N";
	   		   }
	   		   if(ck_yn == "N"){
	   			   ck_union="N";
	   		   }
	   		   if(jr_yn == "N"){
	   			   jr_union="N";
	   		   }
	   		   if(chk_cnt == 0){
	   		   }else if(chk_cnt == 1){
	   			   lc_union="N";
	   			   cr_union="N";
	   			   ap_union="N";
		   		   dp_union="N";
		   		   ck_union="N";
		   		   jr_union="N";
	   		   }else{
	   			   if(lc_yn == "N"){
	   				   cr_union="N";
	   			   }
	   			   if(lc_yn == "N" && cr_yn == "N"){
	   				   ap_union="N";
	   			   }
	   			   if(lc_yn == "N" && cr_yn == "N" && ap_yn == "N" && exp_ap_yn == "N"){
	   				   ck_union="N";
	   			   }
	   			   if(lc_yn == "N" && cr_yn == "N" && ap_yn == "N" && ck_yn == "N"){
	   				   dp_union="N";
	   			   }
	   			   if(lc_yn == "N" && cr_yn == "N" && ap_yn == "N" && ck_yn == "N" && dp_yn == "N"){
	   				   jr_union="N";
	   			   }
	   		   }
   			   */
	   		   // LHK, 20131202, AR(G&A) 추가로 인해 변경, 
	   		   // LHK 20131205 , GL Report View 참조하도록 수정하면서 union 관련 param은 사용되지 않음
	   		   // GL Report Link 관련 param 추가시 많은 수정을 요함, 
	   		   // 사용되지 않는 아래 param 15 을 이용해서 추가된 AR(G&A) check 여부로 사용함. 
	   		   lc_union="N";
	   		   if(formObj.exp_ar_ck.checked){
	   			   lc_union="Y";
	   		   }   
	   		   param += '[' + lc_union + ']';							// [15]
	   		   param += '[' + cr_union + ']';							// [16]
	   		   param += '[' + ap_union + ']';							// [17]
	   		   param += '[' + dp_union + ']';							// [18]
	   		   param += '[' + ck_union + ']';							// [19]
	   		   param += '[' + jr_union + ']';							// [20]
	   		   var range_yn="Y";
	   		   if(formObj.range_fr.value == "" && formObj.range_to.value == ""){
	   			   range_yn="N";
	   			   param += '[]';												// [21]
	   			   param += '[]';												// [22]
	   		   }else if(formObj.range_fr.value == "" && formObj.range_to.value != ""){
	   			   param += '[' + formObj.all_range_fr.value + ']';				// [21]
	   			   param += '[' + formObj.range_to.value + ']';					// [22]
	   		   }else if(formObj.range_fr.value != "" && formObj.range_to.value == ""){
	   			   param += '[' + formObj.range_fr.value + ']';					// [21]
	   			   param += '[' + formObj.all_range_to.value + ']';				// [22]
	   		   }else if(formObj.range_fr.value != "" && formObj.range_to.value != ""){
	   			   param += '[' + formObj.range_fr.value + ']';					// [21]
	   			   param += '[' + formObj.range_to.value + ']';					// [22]
	   		   }
	   		   param += '[' + range_yn + ']';							// [23]
	   		   if(formObj.sub_grp.value != ""){
	   			   param += '[Y]';				// [24]
	   		   }else{
	   			   param += '[N]';				// [24]
	   		   }
	   		   param += '[' + formObj.sub_grp.value + ']';				// [25]
	   		   //O/B EXPENSE 추가
	   		   if( (formObj.rpt_tp[0].checked || formObj.rpt_tp[1].checked || formObj.rpt_tp[2].checked || formObj.rpt_tp[3].checked ||
	   				formObj.rpt_tp[4].checked || formObj.rpt_tp[5].checked) && formObj.rpt_tp[6].checked){
	   			   ob_union="Y";
	   			   ob_yn="Y";
	   		   }else{
	   		       if(formObj.rpt_tp[6].checked){
	   		    	   ob_union="N";
	   		    	   ob_yn="Y";
	   		       }else{
	   		    	   ob_union="N";
	   		    	   ob_yn="N";
	   		       }
	   		   }
	   		   param += '[' + ob_yn + ']';								// [26]
	   		   param += '[' + ob_union + ']';							// [27]
	   		   param += '[' + exp_ap_yn + ']';							// [28]	 
	   		   param += '[' + beg_bal_chk + ']';						// [29]
	   		   param += '[' + formObj.f_usr_id.value + ']';				// [30]
	   		   param += '[' + formObj.f_usrphn.value + ']';				// [31]
	   		   param += '[' + formObj.f_email.value + ']';				// [32]
	   		   //#1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION
	   		   if(CAN_YN!='Y'){
				   var selectedValues = $("#s_ofc_cd").multipleSelect("getSelects");
		   		   param += '[' + selectedValues + ']';						// [33]
			   }else{
				   param += '[' + caOfcList + ']';				// [33]
			   }	   		   
	   		  // param += '[' + formObj.s_ofc_cd.value + ']';				// [33]
	   		   param += '[' + multi_curr_flg + ']';						// [34]
	   		   param += '[' + formObj.s_curr_cd.value + ']';			// [35]
	   		   param += '[' + getRateQuery() + ']';						// [36]
	   		   param += '[]';	    									// [37] 사용안함
	   		
	   		   // #26335 [BINEX]Branch "전체"로 리포트를 뽑을 때 Branch 별로도 볼수 가 있어야함 - 24664
	   		   param += '[' + sortOpt + ']';							// [38]
	   		   param += '[' + pOfcCd + ']';								// [39]
	   		   
	   		   param += '[]';											// [40] GL Summary, I/S, B/S 에서 GL Detail 연결시 하이퍼 링크 속석에 추가된 param, js 에서는 value 없슴. 
	   		   
	   		   //BINEX 요구사항, TOR 정산을 위한 Parma, TOR 조회시, "Y"
			   param += '[' + CAN_YN + ']';				                // [41]
			   	   		   
	   		   //#48071 [AGL] Accounting Report들을 Invoice Date으로 표시 하는 Option 요청 
	   		   var dtTp_check ="";
	   		   if(formObj.f_dt_tp_radio[0].checked == true){
	   			   dtTp_check = '';								
	   		   } else {
	   			   dtTp_check = 'I';								
	   		   } 
	   		   param += '[' + dtTp_check + ']';	                         // [42]
	   		   
	   		   var chk_cb ="";
	   		   if(formObj.chk_cb.checked){
	   			   chk_cb = 'Y';								
	   		   } else {
	   			   chk_cb = '';								
	   		   } 
	   		   
	   		   param += '[' + chk_cb + ']';	                         	 // [43] Cash Basis
	   		   // #52472 [CLT] 안정성
	   		   param += '[]';	                         	 			 // [44] Balance Sheet Report에서 GL Report 호출하는 경우에만 설정,  GL Report의 출력 Limit ROW를 설정하기 위함.
	   		   			   
	   		   if( !formObj.rpt_tp[0].checked && !formObj.rpt_tp[1].checked && !formObj.rpt_tp[2].checked &&
	   			   !formObj.rpt_tp[3].checked && !formObj.rpt_tp[4].checked && !formObj.rpt_tp[5].checked && 
	   			   !formObj.rpt_tp[6].checked && !formObj.exp_ar_ck.checked && !formObj.exp_ap_ck.checked){
	   			   //Select Report Type!!
	   			   alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_RPTT'));
	   			   return;
	   		   }

	   		   formObj.rd_param.value=param;
	   		   //popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   		if (pdf) {
		   			popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
		   			pdf = false;
		   		} else {
		   			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   		}
    	   }
    	   break;
    }
}
//GL View Table Data Create LKH 2015.02.25 Start
function setGlDataCreate(arg){
	//if(confirm(getLabel('FMS_COM_CFMCRE'))){
		var formObj=document.frm1;
		doShowProcess();		
		var type_clss_cd = 'GL_DATA_CREATE';
		ajaxSendPostAsync(rtnAjaxFunction, 'reqVal', '&goWhere=aj&bcKey=setGlDataCreate&f_usrId='+formObj.f_usrId.value+'&f_type_clss_cd='+type_clss_cd, './GateServlet.gsl');
	//}
} 		
function rtnAjaxFunction(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		//getGlDataCreateDate()
		doHideProcess();
		//alert(getLabel('FMS_COM_NTYCOM'));		
	}else{
		doHideProcess();
		alert(getLabel('FMS_COM_ALT019'));
	}
	G_GL_DATA_CREATE_STATUS ="END";
	doWork('GL_CREATE_END_ACTION');
}
function ajaxSendPostAsync(callback, param, data, url){
	sendRequest(callback, param, data, 'POST', url, true);
}
function getGlDataCreateDate(){
	return;
	var type_clss_cd = 'GL_DATA_CREATE';
	var parmStr='&goWhere=aj&bcKey=getGlDataCreateDate&f_type_clss_cd='+type_clss_cd;
	ajaxSendPost(rtnGetGlDataCreateDate,  'reqVal', parmStr, './GateServlet.gsl');
}
function rtnGetGlDataCreateDate(reqVal){
	var formObj=document.frm1;
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	if(doc[1]=='NotCreate'){
    		formObj.gl_data_create_date.value='';
    	}else{
    		formObj.gl_data_create_date.value=doc[1];
    	}
    }
}
//GL View Table Data Create LKH 2015.02.25 End
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	//doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	//doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	//doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
   
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
    
    //#1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION
    //#5070 [BINEX VISIBILITY] Container Status at Terminal (#3893 +)
    setTimeout(function(){
    	 if (ofcFlg == 'Y'){
    	   	 $('#s_ofc_cd').multipleSelect('uncheckAll');
    	    }
	 }, 100);
   
    
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//오늘일자구하기
	doSetDt();
	formObj.s_curr_cd.value=ofc_curr_cd;
	
	//[BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)
	setChkPeriod();
	setChkCurrency();
	
	//GL View Table Data Create LKH 2015.02.25
	//getGlDataCreateDate();
	
	if (GA_AR_YN != "Y" || GA_AP_YN != "Y"){
		formObj.gl_tp[1].disabled=true;
		formObj.gl_tp[1].checked=false;
		formObj.gl_tp[2].disabled=true;
		formObj.gl_tp[2].checked=true;
		
		swichChk2();
		begBalChk();
	}
}
function doAllClear(){
	 var formObj=document.frm1;
	 
	doSetDt();
	//OFVFOUR-7897 [AME LOGIS] TRIAL BALANCE MISMATCH
	for(var i=0; i < 6; i++){
		frm1.rpt_tp[i].disabled=false;
		frm1.rpt_tp[i].checked=true;
	}
	
	if (GA_AR_YN == "Y"){
		frm1.exp_ar_ck.checked=true;
		frm1.exp_ar_ck.disabled=false;
	}
	if (GA_AP_YN == "Y"){
		frm1.exp_ap_ck.checked=true;
		frm1.exp_ap_ck.disabled=false;
	}
	
	/*frm1.exp_ar_ck.disabled=false;
	frm1.exp_ar_ck.checked=true;
	frm1.exp_ap_ck.disabled=false;
	frm1.exp_ap_ck.checked=true;*/
	
	for(var i=0; i < 3; i++){
		frm1.gl_tp[i].disabled=false;
		frm1.gl_tp[i].checked=false;
	}
	
	if (GA_AR_YN != "Y" || GA_AP_YN != "Y"){
		formObj.gl_tp[1].disabled=true;
		formObj.gl_tp[1].checked=false;
		formObj.gl_tp[2].disabled=true;
		formObj.gl_tp[2].checked=true;
	}
	
	frm1.sum_dtl[0].checked=true;
	frm1.range_fr.value=frm1.tmp_range_fr.value;
	frm1.range_to.value=frm1.tmp_range_to.value;
	frm1.sub_grp.value='';
	
	formObj.chk_cb.checked=false;
	
	//LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
}
function doSetDt(){
    var formObj=document.frm1;
	//오늘일자구하기
	var now=new Date(); 				
	var preDt=new Date(Date.parse(now) - 30 * 1000 * 60 * 60 * 24);
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1;
	var date=now.getDate(); 	
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	if(month < 10){
		month="0"+(month);
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	if(date < 10){
		date="0"+date;
	}
	FROMDATE=premonth + "-" + "01" + "-" + preyear;
	TODATE=getEndDate(FROMDATE);
	TODAY=year+month+date;
	formObj.f_fr_dt.value=FROMDATE;
	formObj.f_to_dt.value=TODATE;
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
    	case 1:      //IBSheet2 init
		    with (sheetObj) {
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('PFM_MGT_0030_HDR1'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                   {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aply_fm_dt",  KeyField:0,   CalcLogic:"",   Format:"Ym" },
	                   {Type:"Float",     Hidden:0,  Width:110,  Align:"Right",   ColMerge:1,   SaveName:"rate",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1 } ];
	             
	            InitColumns(cols);
	
	            SetEditable(1);
                InitViewFormat(0, "aply_fm_dt", "MM\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
                SetSheetHeight(132);
                SetVisible(true);

    		} 
    	break;    	
    	case 2:      //IBSheet1 init
            with (sheetObj) {
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('PFM_MGT_0090_HDR1'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                   {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_option",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_sub_option",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	             
	            InitColumns(cols);
	
	            SetEditable(1);
	            SetVisible(false);
            
           }                                                      
         break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
} 
function sheet2_OnSearchEnd(){
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj.f_fr_dt, 'MM-dd-yyyy');
        break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj.f_to_dt, 'MM-dd-yyyy');
        break;
    }
}
//말일구하기
function getEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2));
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm;
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm;
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm;
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
function doRptTypeDisable(){
	formObj=document.frm1;
	if(formObj.gl_tp[0].checked){
		formObj.rpt_tp[1].checked=false;
		formObj.rpt_tp[3].checked=false;
		formObj.rpt_tp[5].checked=false;
		formObj.rpt_tp[1].disabled=true;
		formObj.rpt_tp[3].disabled=true;
		formObj.rpt_tp[5].disabled=true;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		//G/L Range Clear
		formObj.range_fr.value="";
		formObj.range_to.value="";
		formObj.gl_tp[1].checked=false;
		formObj.gl_tp[1].disabled=true;
		//AP EXPENSE CHECK BOX 활성화
		/*
		exp_view_layer.style.display="inline";
		exp_none_layer.style.display="none";
		formObj.exp_ck.checked=false;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.rpt_tp[0].checked=true;
		formObj.rpt_tp[2].checked=true;
		formObj.rpt_tp[4].checked=true;
		formObj.rpt_tp[6].checked=false;
		*/
	}else{
		formObj.rpt_tp[1].disabled=false;
		formObj.rpt_tp[3].disabled=false;
		formObj.rpt_tp[5].disabled=false;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.range_fr.value=formObj.tmp_range_fr.value;
		formObj.range_to.value=formObj.tmp_range_to.value;
		
		//formObj.gl_tp[1].disabled=false;
		
		if (GA_AR_YN != "Y" || GA_AP_YN != "Y"){
			formObj.gl_tp[1].disabled=true;
		} else {
			formObj.gl_tp[1].disabled=false;
		}
		
		//AP EXPENSE CHECK BOX 비활성화
		/*
		exp_view_layer.style.display="none";
		exp_none_layer.style.display="inline";
		formObj.exp_ck.checked=false;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.rpt_tp[0].checked=true;
		formObj.rpt_tp[2].checked=true;
		formObj.rpt_tp[4].checked=true;
		*/
		formObj.exp_ar_ck.disabled=false;
		formObj.exp_ap_ck.disabled=false;
	}
	if(formObj.gl_tp[2].checked){
		formObj.exp_ar_ck.checked=false;
		formObj.exp_ap_ck.checked=false;
		formObj.exp_ar_ck.disabled=true;
		formObj.exp_ap_ck.disabled=true;
	}else{
		if (GA_AR_YN != "Y"){
			formObj.exp_ar_ck.checked=false;
			formObj.exp_ar_ck.disabled=true;
		} else {
			formObj.exp_ar_ck.disabled=false;
		}
		
		if (GA_AP_YN != "Y"){
			formObj.exp_ap_ck.checked=false;
			formObj.exp_ap_ck.disabled=true;
		} else {
			formObj.exp_ap_ck.disabled=false;
		}
	}
}
function swichChk(){
	formObj=document.frm1;
	if(formObj.gl_tp[0].checked){
		doRptTypeDisable();
	}
	if(formObj.gl_tp[1].checked){
		formObj.gl_tp[2].checked=false;
		//LHK 20131205 Report 로직과 상이하여 수정함. 
		formObj.rpt_tp[0].checked=false;
		formObj.rpt_tp[2].checked=false;
		formObj.rpt_tp[4].checked=false;
		formObj.rpt_tp[0].disabled=true;
		formObj.rpt_tp[2].disabled=true;
		formObj.rpt_tp[4].disabled=true;
		/*formObj.exp_ar_ck.checked=true;
		formObj.exp_ap_ck.checked=true;
		formObj.exp_ar_ck.disabled=false;
		formObj.exp_ap_ck.disabled=false;*/
		
		if (GA_AR_YN != "Y"){
			formObj.exp_ar_ck.checked=false;
			formObj.exp_ar_ck.disabled=true;
		} else {
			formObj.exp_ar_ck.checked=true;
			formObj.exp_ar_ck.disabled=false;
		}
		
		if (GA_AP_YN != "Y"){
			formObj.exp_ap_ck.checked=false;
			formObj.exp_ap_ck.disabled=true;
		} else {
			formObj.exp_ap_ck.checked=true;
			formObj.exp_ap_ck.disabled=false;
		}
		
		/*
		formObj.exp_ar_ck.checked=false;
		formObj.exp_ar_ck.disabled=true;
		formObj.exp_ap_ck.checked=false;
		formObj.exp_ap_ck.disabled=true;
		*/
		return;
	}else{
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.exp_ar_ck.disabled=false;
		formObj.exp_ap_ck.disabled=false;
		/*
		formObj.exp_ar_ck.disabled=false;
		formObj.exp_ap_ck.disabled=false;
		*/
	}
}
function swichChk2(){
	formObj=document.frm1;
	if(formObj.gl_tp[0].checked){
		doRptTypeDisable();
	}
	if(formObj.gl_tp[2].checked){
		formObj.gl_tp[1].checked=false;
		formObj.exp_ar_ck.checked=false;
		formObj.exp_ar_ck.disabled=true;
		formObj.exp_ap_ck.checked=false;
		formObj.exp_ap_ck.disabled=true;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		return;
	}else{
		if (GA_AR_YN != "Y"){
			formObj.exp_ar_ck.checked=false;
			formObj.exp_ar_ck.disabled=true;
		} else {
			formObj.exp_ar_ck.disabled=false;
		}
		
		if (GA_AP_YN != "Y"){
			formObj.exp_ap_ck.checked=false;
			formObj.exp_ap_ck.disabled=true;
		} else {
			formObj.exp_ap_ck.disabled=false;
		}
	}
}
/*
function expenseChk(){
	formObj=document.frm1;
	if(formObj.exp_ck.checked){
		formObj.rpt_tp[0].disabled=true;
		formObj.rpt_tp[2].disabled=true;
		formObj.rpt_tp[4].disabled=true;
		formObj.rpt_tp[0].checked=false;
		formObj.rpt_tp[2].checked=false;
		formObj.rpt_tp[4].checked=false;
		formObj.rpt_tp[6].checked=false;
	}else{
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.rpt_tp[0].checked=true;
		formObj.rpt_tp[2].checked=true;
		formObj.rpt_tp[4].checked=true;
	}
}
*/
/*
function obexpenseChk(){
	formObj=document.frm1;
	if(formObj.gl_tp[0].checked){
		if(formObj.rpt_tp[6].checked){
			formObj.rpt_tp[0].disabled=true;
			formObj.rpt_tp[2].disabled=true;
			formObj.rpt_tp[4].disabled=true;
			formObj.rpt_tp[0].checked=false;
			formObj.rpt_tp[2].checked=false;
			formObj.rpt_tp[4].checked=false;
			formObj.exp_ck.checked=false;
		}else{
			formObj.rpt_tp[0].disabled=false;
			formObj.rpt_tp[2].disabled=false;
			formObj.rpt_tp[4].disabled=false;
			formObj.rpt_tp[0].checked=true;
			formObj.rpt_tp[2].checked=true;
			formObj.rpt_tp[4].checked=true;
			//formObj.exp_ck.checked = true;
		}
	}
}
*/
//Detail 옵션 선택하는 경우 OR By Billing Code 옵션 선택하는 경우 Uncheck 하고 disable
function begBalChk(){
	formObj=document.frm1;
	if(formObj.gl_tp[0].checked || formObj.sum_dtl[1].checked){
			formObj.beg_bal_chk.disabled=true;
			formObj.beg_bal_chk.checked=false;
	}else{
		formObj.beg_bal_chk.disabled=false;
	}
}
//#26335 [BINEX]Branch "전체"로 리포트를 뽑을 때 Branch 별로도 볼수 가 있어야함 - 24664
//선택한 office가 "ALL"인 경우에만 활성화
function selOficeDisplay(selOfc) {
	var strSelOfc = String(selOfc.value);
	//#1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION
	var selectedValues = $("#s_ofc_cd").multipleSelect("getSelects");
	var sortByTd11 = document.getElementById("sort_by_td11");
	var sortByTd12 = document.getElementById("sort_by_td12");
	var sortByTd21 = document.getElementById("sort_by_td21");
	var sortByTd22 = document.getElementById("sort_by_td22");
	var sortByTd31 = document.getElementById("sort_by_td31");
	var sortByTd32 = document.getElementById("sort_by_td32");
	if (strSelOfc == "") {
		sortByTd11.style.display = "inline";
		sortByTd12.style.display = "inline";
		sortByTd21.style.display = "inline";
		sortByTd22.style.display = "inline";
		sortByTd31.style.display = "inline";
		sortByTd32.style.display = "inline";
		// Total Default;
		document.frm1.sort_by_rd[0].checked = true;
	} else {
		//#1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION
		if(selectedValues.length>1){
			sortByTd11.style.display = "inline";
			sortByTd12.style.display = "inline";
			sortByTd21.style.display = "inline";
			sortByTd22.style.display = "inline";
			sortByTd31.style.display = "inline";
			sortByTd32.style.display = "inline";
			document.frm1.sort_by_rd[0].checked = true;
		}else{
			sortByTd11.style.display = "none";
			sortByTd12.style.display = "none";
			sortByTd21.style.display = "none";
			sortByTd22.style.display = "none";
			sortByTd31.style.display = "none";
			sortByTd32.style.display = "none";
		}
		
	}
}
//Calendar flag value
var firCalFlag=false;
function getRateQuery(){
	var sheetObj=docObjects[0];
	var rateSQL="select  rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut "
		+     "  from ( "
		;
	//ex)
	//select rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut
	//from (
	//		select 'USD' as curr_cd, '201308' AS aply_fm_dt, 2 AS xch_rt_ut
	//      UNION
	//		select 'JPY' as curr_cd, '201308' AS aply_fm_dt, 2 AS xch_rt_ut
	//      ) rate
	if(sheetObj.RowCount()== 0){
		rateSQL += "         SELECT '" + '' + "' AS curr_cd, " 
								 + "'" + '' + "'  AS aply_fm_dt, "
								 + 0 + " AS xch_rt_ut ) rate ";
	}else{
		for(var i=1; i<=sheetObj.LastRow();i++){
			rateSQL += "         SELECT '" + sheetObj.GetCellValue(i, "curr_cd") + "' AS curr_cd, "
					+ "'" + sheetObj.GetCellValue(i, "aply_fm_dt") + "' AS aply_fm_dt, "
					+ sheetObj.GetCellValue(i, "rate") + " AS xch_rt_ut ";
	    	if(i < sheetObj.LastRow()){
	    		rateSQL += " UNION ";
	    	}else{
	    		rateSQL += "      ) rate ";
	    	}
		}	
	}
	return rateSQL;
}

//BINEX 요구사항, TOR 정산을 위한, Parameter Set.
function setTorVal(val){
	formObj = document.frm1;
	
	CAN_YN = val;
	
	if(CAN_YN == "Y"){
		ajaxSendPost(setCaOfc, "reqVal", "&goWhere=aj&bcKey=searchCaOfc", "./GateServlet.gsl");
	}
	
}

// S : [BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)
function setChkPeriod(){
	//Currency default 설정 (M : Multi currency, O : One Currency)
	var opt_key = "ACCT_FINC_DATE_DFLT";
	ajaxSendPost(setRdoChkPeriod, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setChkCurrency(){
	//Period default 설정 (P : Post Date, I : Invoice Date)
	var opt_key = "ACCT_FINC_CURR_DFLT";
	ajaxSendPost(setRdoChkCurrency, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
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

function setRdoChkCurrency(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == 'O'){
			formObj.s_curr_opt[1].checked = true;
		}
	} 
}
// E : [BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)

function cashBasisChk(){
	var formObj=document.frm1;
	if(formObj.chk_cb.checked){
		for(var i=0; i < 7; i++){
			formObj.rpt_tp[i].disabled=true;
			formObj.rpt_tp[i].checked=false;
		}
		formObj.exp_ar_ck.disabled=true;
		formObj.exp_ar_ck.checked=false;
		formObj.exp_ap_ck.disabled=true;
		formObj.exp_ap_ck.checked=false;
		
		formObj.rpt_tp[1].disabled=false;
		formObj.rpt_tp[1].checked=true;
		formObj.rpt_tp[3].disabled=false;
		formObj.rpt_tp[3].checked=true;
		formObj.rpt_tp[5].disabled=false;
		
		formObj.gl_tp[0].disabled=true;
		formObj.gl_tp[0].checked=false;
		formObj.gl_tp[1].disabled=true;
		formObj.gl_tp[1].checked=false;
		formObj.gl_tp[2].disabled=true;
		formObj.gl_tp[2].checked=false;
	}else{
		doAllClear();
	}
}

// #52472 [CLT] 안정성
// Period Search 조건의 두 날짜의 Limit범위를 지정(단위 : 일수) TB_SYS_OPT테입블에서 취득한 값
// opt_key = "GL_RPT_TERM_PERIOD"
function getGlSrhTrmPeriodReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var limitDay = 0;
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		limitDay=doc[1];
	}
	
	// Summury가 아닌경우, 날짜범위체크 LSY 2016.03.17
	if(!formObj.sum_dtl[0].checked){
		if ( getDaysBetweenFormat(formObj.f_fr_dt, formObj.f_to_dt, "MM-dd-yyyy") > limitDay) {
			alert(getLabel2('FMS_COM_ALT087', new Array(limitDay)));
			return;
		}
	}
   
	if(G_GL_DATA_CREATE_STATUS == "END"){
		G_GL_DATA_CREATE_STATUS ="START";
		setGlDataCreate('');
	} 
}

//#4206 Tor Print 버튼을 TOR가 아니라 CANADA의 Office대상으로 변경
function setCaOfc(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {		
		caOfcList = doc[1];		
	} 
}