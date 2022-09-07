/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0091.js
*@FileTitle  : G/L Report 2
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
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
       case "RPTCHECK":
    	   if(formObj.gl_tp[0].checked){
    		   formObj.rpt_tp[0].checked=true;
        	   formObj.rpt_tp[2].checked=true;
        	   formObj.rpt_tp[4].checked=true;
    	   }else{
    		   formObj.rpt_tp[0].checked=true;
        	   formObj.rpt_tp[1].checked=true;
        	   formObj.rpt_tp[2].checked=true;
        	   formObj.rpt_tp[3].checked=true;
        	   formObj.rpt_tp[4].checked=true;
        	   formObj.rpt_tp[5].checked=true;
        	   formObj.rpt_tp[6].checked=true;
    	   }
       break;
       case "RPTCLEAR":
    	   formObj.rpt_tp[0].checked=false;
    	   formObj.rpt_tp[1].checked=false;
    	   formObj.rpt_tp[2].checked=false;
    	   formObj.rpt_tp[3].checked=false;
    	   formObj.rpt_tp[4].checked=false;
    	   formObj.rpt_tp[5].checked=false;
    	   formObj.rpt_tp[6].checked=false;
       break;
       case 'PRINT':
    	   var fr_dt=formObj.f_fr_dt.value.replaceAll("-", "");
    	   var to_dt=formObj.f_to_dt.value.replaceAll("-", "");
    	   fr_dt=fr_dt.substring(4,8) + fr_dt.substring(0,2) + fr_dt.substring(2,4);
    	   to_dt=to_dt.substring(4,8) + to_dt.substring(0,2) + to_dt.substring(2,4);
    	   var rtp_type="";
    	   var chk_cnt=0;
    	   if(formObj.rpt_tp[4].checked){
  			   rtp_type += "Accounts Payable";
  			   chk_cnt += 1;
  		   }
    	   if(formObj.rpt_tp[1].checked){
    		   if(chk_cnt > 0){
    			   rtp_type += ",Check";
    		   }else{
    			   rtp_type += "Check";
    		   }
    		   chk_cnt += 1;
   		   }
    	   if(formObj.rpt_tp[2].checked){
    		   if(chk_cnt > 0){
    			   rtp_type += ",Credit/Debit Note";
    		   }else{
    			   rtp_type += "Credit/Debit Note";
    		   }
    		   chk_cnt += 1;
    	   }
   		   if(formObj.rpt_tp[0].checked){
	   	       if(chk_cnt > 0){
	   	           rtp_type += ",Local Invoice";	
	   		   }else{
	   			   rtp_type += "Local Invoice";
	   		   }
	   	       chk_cnt += 1;
   		   }
   		   if(formObj.rpt_tp[3].checked){
	   			if(chk_cnt > 0){
	   				rtp_type += ",Deposit";
	   			}else{
	   				rtp_type += "Deposit";
	   			}
	   			chk_cnt += 1;
		   }
   		   if(formObj.rpt_tp[5].checked){
	   			if(chk_cnt > 0){
	   				rtp_type += ",Journal";
	   			}else{
	   				rtp_type += "Journal";
	   			}
	   			chk_cnt += 1;
		   }
	   	   if(formObj.rpt_tp[6].checked){
	   		    if(chk_cnt > 0){
	   				rtp_type += ",O/B Expense";
	   			}else{
	   				rtp_type += "O/B Expense";
	   			}
	   			chk_cnt += 1;
		   }
	   	   if(formObj.exp_ck.checked){
	   			rtp_type += "A/P Expense";
		   }
    	   if(formObj.gl_tp[0].checked){
    		   if(formObj.sum_dtl[0].checked){
    			   if(formObj.exp_ck.checked){
    				   formObj.file_name.value='billing_code_summary_exp.mrd';
    			   }else if(formObj.rpt_tp[6].checked){
    				   formObj.file_name.value='billing_code_summary_obexp.mrd';
    			   }else{
    				   formObj.file_name.value='billing_code_summary.mrd';
    			   }
        		   formObj.title.value='BILLING CODE SUMMARY';
    		   }else {
    			   if(formObj.exp_ck.checked){
    				   formObj.file_name.value='billing_code_detail_exp.mrd';
    			   }else if(formObj.rpt_tp[6].checked){
    				   formObj.file_name.value='billing_code_detail_obexp.mrd';
    			   }else{
    				   formObj.file_name.value='billing_code_detail.mrd';
    			   }
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
	   		   param += '[' + inv_type + ']';								// [9]
	   		   formObj.rd_param.value=param;
	   		   popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
    	   }else if(formObj.gl_tp[1].checked){
    		   if(formObj.sum_dtl[0].checked){
    			   formObj.file_name.value='gl_code_summary_11.mrd';
        		   formObj.title.value='G/L CODE SUMMARY';
    		   }else {
    			   formObj.file_name.value='gl_code_detail_11.mrd';
        		   formObj.title.value='G/L CODE DETAIL';
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
	   		   param += '[' + ap_yn + ']';								// [9]
	   		   param += '[' + dp_yn + ']';								// [10]
	   		   param += '[' + ck_yn + ']';								// [11]
	   		   param += '[' + jr_yn + ']';								// [12]
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
	   		   param += '[' + ap_union + ']';							// [13]
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
	   		   if( !formObj.rpt_tp[0].checked && !formObj.rpt_tp[1].checked && !formObj.rpt_tp[2].checked &&
	   			   !formObj.rpt_tp[3].checked && !formObj.rpt_tp[4].checked && !formObj.rpt_tp[5].checked && 
	   			   !formObj.rpt_tp[6].checked ){
	   			   //Select Report Type!!
	   			   alert(getLabel('PFM_COM_ALT005')+ "\n\n: PFM_MGT_0091.318");
	   			   return;
	   		   }
	   		   formObj.rd_param.value=param;
	   		   popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
    	   }else if(formObj.gl_tp[2].checked){
    		   if(formObj.sum_dtl[0].checked){
    			   formObj.file_name.value='gl_code_summary_12.mrd';
        		   formObj.title.value='G/L CODE SUMMARY';
    		   }else {
    			   formObj.file_name.value='gl_code_detail_12.mrd';
        		   formObj.title.value='G/L CODE DETAIL';
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
	   		   if( !formObj.rpt_tp[0].checked && !formObj.rpt_tp[1].checked && !formObj.rpt_tp[2].checked &&
	   			   !formObj.rpt_tp[3].checked && !formObj.rpt_tp[4].checked && !formObj.rpt_tp[5].checked && 
	   			   !formObj.rpt_tp[6].checked ){
	   			   //Select Report Type!!
	   			   alert(getLabel('PFM_COM_ALT005')+ "\n\n: PFM_MGT_0091.500");
	   			   return;
	   		   }
	   		   formObj.rd_param.value=param;
	   		   popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
    	   } else if(!formObj.gl_tp[0].checked && !formObj.gl_tp[1].checked && !formObj.gl_tp[2].checked){
    		   if(formObj.sum_dtl[0].checked){
    			   formObj.file_name.value='gl_code_summary_13.mrd';
        		   formObj.title.value='G/L CODE SUMMARY';
    		   }else {
    			   formObj.file_name.value='gl_code_detail_13.mrd';
        		   formObj.title.value='G/L CODE DETAIL';
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
	   		   if( !formObj.rpt_tp[0].checked && !formObj.rpt_tp[1].checked && !formObj.rpt_tp[2].checked &&
	   			   !formObj.rpt_tp[3].checked && !formObj.rpt_tp[4].checked && !formObj.rpt_tp[5].checked && 
	   			   !formObj.rpt_tp[6].checked ){
	   			   //Select Report Type!!
	   			   alert(getLabel('PFM_COM_ALT005')+ "\n\n: PFM_MGT_0091.681");
	   			   return;
	   		   }
	   		   formObj.rd_param.value=param;
	   		   popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
    	   }   	
    	   break;
    }
}
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
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
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
         case 1:      //IBSheet1 init
        	    with(sheetObj){
//             SetSheetHeight(0);
//           (3, 0, 0, true);
           var cnt=0;

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
		//G/L Range Clear
		formObj.range_fr.value="";
		formObj.range_to.value="";
		formObj.gl_tp[1].checked=false;
		formObj.gl_tp[1].disabled=true;
		//AP EXPENSE CHECK BOX 활성화
		getObj('exp_view_layer').style.display="inline";
		getObj('exp_none_layer').style.display="none";
		formObj.exp_ck.checked=false;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.rpt_tp[0].checked=true;
		formObj.rpt_tp[2].checked=true;
		formObj.rpt_tp[4].checked=true;
		formObj.rpt_tp[6].checked=false;
	}else{
		formObj.rpt_tp[1].disabled=false;
		formObj.rpt_tp[3].disabled=false;
		formObj.rpt_tp[5].disabled=false;
		formObj.range_fr.value=formObj.tmp_range_fr.value;
		formObj.range_to.value=formObj.tmp_range_to.value;
		formObj.gl_tp[1].disabled=false;
		//AP EXPENSE CHECK BOX 비활성화
		getObj('exp_view_layer').style.display="none";
		getObj('exp_none_layer').style.display="inline";
		formObj.exp_ck.checked=false;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.rpt_tp[0].checked=true;
		formObj.rpt_tp[2].checked=true;
		formObj.rpt_tp[4].checked=true;
	}
}
function swichChk(){
	formObj=document.frm1;
	if(formObj.gl_tp[1].checked){
		formObj.gl_tp[2].checked=false;
		return;
	}
}
function swichChk2(){
	formObj=document.frm1;
	if(formObj.gl_tp[2].checked){
		formObj.gl_tp[1].checked=false;
		return;
	}
}
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
