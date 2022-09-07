//=========================================================
//*@FileName   : ACC_JOR_0032.jsp
//*@FileTitle  : Check Journal	MANAGE2
//*@Description: Check Journal	MANAGE2
//*@author     : Chungrue - Cyberlogitec
//*@version    : 1.0 - 2011/11/23
//*@since      : 2011/11/23
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/10
//*@since      : 2014/07/10
//=========================================================
var JNR_TYPE="P";
var JNR_LEVEL="3";
var RMK_LEVEL = "1";
var TODAY;
var SLIP_POST_DT;
var vInvModiTms=''; 
var vJnrModiTms=''; 
var isPrinted=false;
var ORG_BLOCK_DT=""; 		//MAX(BLOCK_DT)
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
var rtnary=new Array(1);
var callBackFunc = "";
var useClearVoid = "";
//print버튼 클릭 이벤트 플래그
var printOnclick = false;
//var SHOW_DESCRIPTION = "N";

//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
var GL_VIEW_FALG = "N";

function doWork(srcName, chekVal){
	
	// #1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
	setSaveConfirmMsg(srcName);
	
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
   	   case "COPY":
	        Copy();
	        setBankCurChkNo();
	   break;
   	   case "PRINT_CALLBACK":
  		   	isPrinted=true;
  		   	// LHK, 20140307, #26818 [BINEX]Check Print 이후 Payment 자료 수정이 되고 있음 
   	   		if (isPrinted) {
	   	   		formObj.f_cmd.value=SEARCHLIST;
	   	   		docObjects[0].DoSearch("./ACC_JOR_0032GS.clt", FormQueryString(formObj) );
			}
  	   break;
   	   case "CLEAR":
		   // #2084 - [PATENT] NEW 버튼 Confirm 메시지 추가
		   if(confirm(getLabel('FMS_COM_CFMNEW'))){
			   clearAll();
		   }
	   break;
       case "SEARCHLIST":
    	    // 화면일부 클리어
    	    clearInput();
    	    if(formObj.s_jnr_no.value == ""){
    	    	if(formObj.s_cust_cd.value == ""){
     			    alert(getLabel('FMS_COM_ALT014'));
        	    	formObj.s_cust_cd.focus();
        	    	return;
        	    }
    	    }else{
    	    	formObj.f_jnr_no.value=formObj.s_jnr_no.value;
    	    }
    	    if(formObj.dept_chk1.checked){
    	    	formObj.dept_chk1.value="Y";
    	    }
    	    if(formObj.dept_chk2.checked){
    	    	formObj.dept_chk2.value="Y";
    	    }
    	    if(formObj.dept_chk3.checked){
    	    	formObj.dept_chk3.value="Y";
    	    }
//    	    if(formObj.his_chk[0].checked){
//    	    	formObj.his_chk.value="O";	//OPEN
//    	    }else{
//    	    	formObj.his_chk.value="A";	//ALL
//    	    }
    	    formObj.f_cmd.value=SEARCHLIST;
            //검증로직
    	    docObjects[0].DoSearch("./ACC_JOR_0032GS.clt", FormQueryString(formObj) );
            if(formObj.f_jnr_no.value == ""){
            	setBankCurChkNo();
            }
       break;
       case "ROWADD":
    	    if(formObj.s_cust_cd.value == ""){
//	   	    	alert("Select the Vendor in advance! ");
	   	    	alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_VENDOR'));
	   	    	formObj.s_cust_cd.focus();
	   	    	return;
	   	    }
    	    if(sheetObj.GetCellText(1, "inv_post_dt") == ""){
	   	    	sheetObj.RemoveAll();
	   	    	var intRows=sheetObj.LastRow() + 1;
	            sheetObj.DataInsert(intRows);
	            sheetObj.SetRowBackColor(intRows,"#EFEBEF");
	            sheetObj.SetCellBackColor(intRows, "del_chk","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "ofc_cd","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "inv_aply_curr_cd","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "inv_aply_xcrt","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "buy_inv_no","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "pay_amt","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "chk_flag","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "gl_no","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "gl_rmk","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "ref_no","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "bl_no","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "jnr_desc","#FFFFFF");
	            sheetObj.SetCellEditable(intRows, "ofc_cd",1);
	            sheetObj.SetCellEditable(intRows, "buy_inv_no",1);
	            sheetObj.SetCellEditable(intRows, "gl_no",1);
	            sheetObj.SetCellEditable(intRows, "gl_rmk",1);
	            sheetObj.SetCellEditable(intRows, "ref_no",1);
	            sheetObj.SetCellEditable(intRows, "bl_no",1);
	            sheetObj.SetCellEditable(intRows, "jnr_desc",1);
	            sheetObj.SetCellEditable(intRows, "inv_aply_curr_cd",0);
	            sheetObj.SetCellEditable(intRows, "inv_aply_xcrt",1);
	            sheetObj.SetCellEditable(intRows, "pay_amt",1);
	            sheetObj.SetCellEditable(intRows, "clr_flag",0);
	            sheetObj.SetCellValue(intRows, "ofc_cd",UserOfcCd);
	            //#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	            sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",formObj.f_curr_cd.value);
	            sheetObj.SetCellValue(intRows, "chk_flag",1);
	   	        sheetObj.SetCellValue(intRows, "trdp_cd",formObj.s_cust_cd.value);
	   	        sheetObj.SetCellValue(intRows, "inv_aply_xcrt",1.0);
	   	        sheetObj.SetCellValue(intRows, "clr_flag",1);
	   	        sheetObj.SetCellValue(intRows, "gl_no","");
	   	        sheetObj.SetCellValue(intRows, "gl_rmk","");
	   	        sheetObj.SetCellText(intRows, "inv_post_dt",formObj.f_post_dt.value != '' ? formObj.f_post_dt.value : '');
	   	        sheetObj.SetCellValue(intRows, "inp_type","M");
	   	        sheetObj.SetCellValue(intRows, "inv_xcrt_dt", formObj.f_post_dt.value != '' ? formObj.f_post_dt.value : '');  //#1617 [CLT] Depsosit/Payment Entry - Ex.Rate Date 정의 기준변경
	   	    }else{
	   	    	var intRows=sheetObj.LastRow() + 1;
	            sheetObj.DataInsert(intRows);
	            sheetObj.SetRowBackColor(intRows,"#EFEBEF");
	            sheetObj.SetCellBackColor(intRows, "del_chk","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "ofc_cd","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "inv_aply_curr_cd","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "inv_aply_xcrt","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "buy_inv_no","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "pay_amt","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "chk_flag","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "gl_no","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "gl_rmk","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "ref_no","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "bl_no","#FFFFFF");
        		sheetObj.SetCellBackColor(intRows, "jnr_desc","#FFFFFF");
	            sheetObj.SetCellEditable(intRows, "ofc_cd",1);
	            //sheetObj.CellEditable(intRows, "inv_tp") 			= true;
	            sheetObj.SetCellEditable(intRows, "buy_inv_no",1);
	            sheetObj.SetCellEditable(intRows, "gl_no",1);
	            sheetObj.SetCellEditable(intRows, "gl_rmk",1);
	            sheetObj.SetCellEditable(intRows, "ref_no",1);
	            sheetObj.SetCellEditable(intRows, "bl_no",1);
	            sheetObj.SetCellEditable(intRows, "jnr_desc",1);
	            sheetObj.SetCellEditable(intRows, "inv_aply_curr_cd",0);
	            sheetObj.SetCellEditable(intRows, "inv_aply_xcrt",1);
	            sheetObj.SetCellEditable(intRows, "pay_amt",1);
	            sheetObj.SetCellEditable(intRows, "clr_flag",0);
	            sheetObj.SetCellValue(intRows, "ofc_cd",UserOfcCd);
	            //#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	            sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",formObj.f_curr_cd.value);
	            sheetObj.SetCellValue(intRows, "chk_flag",1);
	   	        sheetObj.SetCellValue(intRows, "trdp_cd",formObj.s_cust_cd.value);
	   	        sheetObj.SetCellValue(intRows, "inv_aply_xcrt",1.0);
	   	        sheetObj.SetCellValue(intRows, "clr_flag",1);
	   	        sheetObj.SetCellValue(intRows, "gl_no","");
	   	        sheetObj.SetCellValue(intRows, "gl_rmk","");
	   	        sheetObj.SetCellText(intRows, "inv_post_dt",formObj.f_post_dt.value != '' ? formObj.f_post_dt.value : "");
	   	        sheetObj.SetCellValue(intRows, "inp_type","M");
	   	        sheetObj.SetCellValue(intRows, "inv_xcrt_dt", formObj.f_post_dt.value != '' ? formObj.f_post_dt.value : '');  //#1617 [CLT] Depsosit/Payment Entry - Ex.Rate Date 정의 기준변경
	   	    }
       break;
       case "MODIFY":	//수정
       case "MODIFY_BLOCK":	//수정
    	   
    	   formObj.save_lock_yn.value = "N";
    	   
    	   if(srcName == "MODIFY_BLOCK"){
    		   
    		   if(formObj.f_jnr_no.value != ""){
    			   
    			   ajaxSendPost(getJnrBlockCheck, 'reqVal', '&goWhere=aj&bcKey=getJnrBlockCheck&jnr_no='+formObj.f_jnr_no.value, './GateServlet.gsl');
    		   
    			   if(blockYn == "Y"){
    				   alert(getLabel('ACC_MSG154'));
    				   return;
    			   }
    		   }
		   
    		   formObj.save_lock_yn.value = "Y";
    	   }
    	   
    	   if(formObj.f_lst_chk_no.value != "" && formObj.f_cur_chk_no.value == formObj.f_chk_no.value &&
    	  		eval(formObj.f_cur_chk_no.value) > eval(formObj.f_lst_chk_no.value) ){	//current check no 가 Last check no 보다 클 경우 경고
    	  		if(!confirm(getLabel('ACC_MSG115') ) ){
    	  			return;
    	  		}
    	  }
    	   //그리드 전체삭제시 invoice 를 삭제한다.
           //LHK, 20130227 PRINT 버튼 실행시 자동 save 시에는 delete 하지 않는다. 
   	       if(chekVal != 'PRNSAVE'  && !checkDelete()){
    		   doWork("DELETE");
    	   }else{
    		   if (sheetObj.RowCount()== 0){
    			   alert(getLabel('FMS_COM_ALT004'));
    			   return;
    		   }
    		   // USE_CLEAR_VOID 가 "N"일 경우 Check No. 여부 체크하지 않음.
    		   //#5030 [SENWA] DEPOSIT ENTRY 화면에서 Check No 메세지 수정 요청
    		   if(useClearVoid != "N" && chkBankCheckNoUseYn()){
				   if(formObj.deposit_chk.checked && formObj.f_chk_no.value == ''){
					   alert(getLabel('ACC_MSG133'));
					   formObj.f_chk_no.focus();
					   return;
				   }
    		   }
			   frm1.f_cmd.value=MODIFY;
			   if(formObj.s_cust_cd.value == ""){
				   //[Customer] is mandatory field.
				   alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CUST'));
				   formObj.s_cust_cd.focus();
				   return;
			   }
			   if(formObj.f_post_dt.value == ""){
				   //[Post Date] is mandatory field.
				   alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_POST'));
				   formObj.f_post_dt.focus();
				   return;
			   }
			   if(formObj.f_bank_cd.value == ""){
				   //[Bank] is mandatory field.
				   alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_DEBK'));
				   formObj.f_bank_cd.focus();
				   return;
			   }
			   // #48505 - [COMMON] DEPOSIT에서 RECEIVED FROM / PAYMENT에서 PAID TO 필수 항목으로 (YJW 2015.05.04)
			   if(formObj.s_paid_cd.value == ""){
				   //[Paid To] is mandatory field.
				   alert(getLabel('FMS_COM_ALT007') + " \n- " + getLabel('FMS_COD_PAYTO'));
				   formObj.s_paid_cd.focus();
				   return;
			   }
			   var chkCnt=0;
			   var apVndInvNoNullCnt = 0;
			   var multiCurrCnt = 0;
			   for(var i=1;i<=sheetObj.LastRow();i++){
				   if(sheetObj.GetCellValue(i, "chk_flag") == "1"){
					   if(sheetObj.GetCellText(i, "inv_post_dt") == ""){
						   //[Post Date] is mandatory field.
						   alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_POST'));
						   sheetObj.SelectCell(i, "inv_post_dt",false);
						   return;
					   }
					   if(sheetObj.GetCellValue(i, "inv_aply_xcrt") == ""){
						   //[Ex.Rate] is mandatory field.
						   alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_EXRT'));
						   sheetObj.SelectCell(i, "inv_aply_xcrt",false);
						   return;
					   }
					 //LHK, 20131224 #22627 [BINEX]Deposit/Payment 시 이종 Currency 처리 :  문제 무조건 gl_no check 하도록 로직 변경 
//					   if(sheetObj.CellValue(i, "ibflag") == "I"){
//						   if(sheetObj.CellValue(i, "gl_no") == "" && sheetObj.CellValue(i, "inv_tp") == ""){
					   if(sheetObj.GetCellValue(i, "gl_no") == ""){
							   //Add case, [G/L No.] is mandatory field.
							   alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_GLNO'));
							   sheetObj.SelectCell(i, "gl_no",false);
							   return;
						   }
//					   }
					   chkCnt += 1;
				   	   if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == 'B'  && sheetObj.GetCellValue(i, "buy_inv_no") == ""){
				   		   apVndInvNoNullCnt++;
					   }	
				   	   
				   	   if(sheetObj.GetCellValue(i, "inv_aply_curr_cd") != formObj.f_curr_cd.value){
						   multiCurrCnt++;
					   }
				   }
			   }
			   if(formObj.f_jnr_no.value == ""){
				   if(chkCnt == 0){
					   //No Save Row Data!
					   alert(getLabel('FMS_COM_ALT004'));
					   return;
				   }
			   }
			   /*
			   if(formObj.void_chk.checked){
				   //Void Checked!! //??
				   alert(getLabel('ACC_MSG24'));
			   }
			   */
			   //LHK, 20140429, 저장전 인보이스 변경여부 체크
			   if(!chkInvModiTms()){
				   return;
			   }
			   // 저장전 Check 변경여부 체크
			   if(!chkJnrModiTms()){
				   return;
			   }
			   //LHK, 20140428, Void 후 Save 시에 Void Amount Check
			   if(!chkVoidPayAmt()){
				   return;
			   }
			   //LHK, 20130403 Payment 화면의 Pay amount 가 음수인 경우 Warning Msg. 적용 
			   if(Number(removeComma(formObj.f_pay_amt.value)) < 0){
				   if(!confirm(getLabel('ACC_MSG85'))){
					   return;
				   }
			   }
			   /* LHK, 20131219 #24666 [BINEX]Payment/Deposi Entry - Warning Message 
			    * Warning Message 필요
			    */
			    var chkNoVal=formObj.f_chk_no.value;
				var jnrNoVal=formObj.f_jnr_no.value;
				var bnkCdVal=formObj.f_bank_cd.value;				
				
				// #46097 - Zimex | Duplicated Check Logic Inquiry
				var custCdVal = formObj.s_cust_cd.value;
				var jnrTpVal = "C";
				
				formObj.f_chk_no.value = formObj.f_chk_no.value.toUpperCase();
				ajaxSendPost(getDupCheckNo, 'reqVal', '&goWhere=aj&bcKey=getDupCheckNo&f_jnr_tp='+jnrTpVal+'&f_chk_no='+chkNoVal+'&f_jnr_no='+jnrNoVal+'&f_bank_cd='+bnkCdVal+'&f_cust_cd='+custCdVal, './GateServlet.gsl');
				
			   //LHK, 20130227, PRINT 버튼 실행시 자동 save 시에는 confirm check 하지 않는다. 
			   var saveCfmFlg=false;
			   if(chekVal == 'PRNSAVE'){
				   saveCfmFlg=true;
			   }else{
				    //2016.04.18 C.W.Park Modified
				    //#5030 [SENWA] DEPOSIT ENTRY 화면에서 Check No 메세지 수정 요청
			    	if(useClearVoid != "N" && chkBankCheckNoUseYn()){
					    //A. Check Pay 나 Deposit 시 A. Check No.가 없을 경우 : [Check No.] Missing. proceed anyway? 
					    if(formObj.f_chk_no.value == ""){
					    	saveCfmFlg=confirm(getLabel('ACC_COM_ALT012'));
					    //B. Duplicate Check No.가 존재할 경우 : [Check No.] Duplicated. proceed anyway?
						}else if(vDupCheckNo == formObj.f_chk_no.value){
							saveCfmFlg=confirm(getLabel('ACC_COM_ALT013'));
						}else{
							if(formObj.save_lock_yn.value == "Y"){
								saveCfmFlg=confirm(getLabel('FMS_COM_CFMSAVBLCK'));
							} else {
								saveCfmFlg=confirm(getLabel(saveMsg));
							}
						}
			    	}else{
			    		if(formObj.save_lock_yn.value == "Y"){
							saveCfmFlg=confirm(getLabel('FMS_COM_CFMSAVBLCK'));
						} else {
							saveCfmFlg=confirm(getLabel(saveMsg));
						}
			    	}

				   //LHK, 20140915, 요구사항 #42938 [Dynamic] 인보이스 번호가 입력되지않은 A/P 는 첵이슈가 되지 않게 개선
				   if(saveCfmFlg){
				   	   if(formObj.f_jnr_no.value == ""){
						   if(apVndInvNoNullCnt > 0){
							   saveCfmFlg = confirm(getLabel('ACC_COM_ALT014'));
						   }
					   }
				   }
			   }
	           if(saveCfmFlg){
	        	   if(formObj.deposit_chk.checked){
	        		   formObj.deposit_chk.value="Y";
	        	   }
	        	   else{
	        		   formObj.deposit_chk.value="N";
	        	   }
	        	   if(formObj.void_chk.checked){
	        		   formObj.void_chk.value="Y";
	        	   }
	        	   else{
	        		   formObj.void_chk.value="N";
	        	   }
	        	   if(formObj.block_chk.checked){
	        		   formObj.block_chk.value="Y";
		       	   }
	        	   if(formObj.office_block_chk.checked){
	        		   formObj.office_block_chk.value="Y";
		       	   }	     	        	   
	        	   var rcv_amt=0;
	    		   for(var i=1; i<=sheetObj.LastRow(); i++){
	    			  
	    			   if(sheetObj.GetCellValue(i, "ibflag") != "D"){
	    				   if(bank_multi_curr_flag == "Y"){
	    					   // Received Amount 그리드의 PAY_AMT의 합계
		    				   rcv_amt += Number(sheetObj.GetCellValue(i, "ttl_pay_amt"));
	    				   } else {
	    					   // Received Amount 그리드의 PAY_AMT의 합계
		    				   rcv_amt += Number(sheetObj.GetCellValue(i, "pay_amt"));
	    				   }
	    			   }
	    		   }
	    		    
	    		   var saveFlg = true;
	    		   
	    		 //#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	    		   if(GL_VIEW_FALG=="Y"){
	    			   var f_rcv_amt        = Number(removeComma(formObj.f_rcv_amt.value));
    				   
    				   if(formObj.f_jnr_no.value == "" && f_rcv_amt == 0){ // 신규이면서 Received Amount가 0일 경우 Event 적용시의 금액을 Setting
    					   formObj.f_rcv_amt.value=doMoneyFmt(parseFloat(roundXL(rcv_amt,2)).toFixed(2));
    					   formObj.f_rcv_amt.value=removeComma(formObj.f_rcv_amt.value);    
    					   fnsetLocalAmt();
    				   }
    				   
    				   var f_locl_rcv_amt   = Number(removeComma(formObj.f_locl_rcv_amt.value));
    				   var f_loc_pay_amt    = Number(removeComma(formObj.f_loc_pay_amt.value));	
    				   if(f_locl_rcv_amt != f_loc_pay_amt){ // Received Amount와 Pay Amount를 비교하여 차액 발생 (Popup)
    					   
    					   saveFlg = false;
    					   
    					   var gl_type = "";
    					   var gl_ex_cd = "";
    					   var gl_ex_nm = "";
    					   var gl_misc_cd = "";
    					   var gl_misc_nm = "";
    					   
    					   if(f_locl_rcv_amt > f_loc_pay_amt){
    						   gl_type = "L";
    						   gl_ex_cd = formObj.gl_ex_loss.value;
    						   gl_ex_nm = formObj.gl_ex_loss_nm.value;
    						   gl_misc_cd = formObj.gl_misc_loss.value;
    						   gl_misc_nm = formObj.gl_misc_loss_nm.value;
    					   } else {
    						   gl_type = "P";
    						   gl_ex_cd = formObj.gl_ex_profit.value;
    						   gl_ex_nm = formObj.gl_ex_profit_nm.value;
    						   gl_misc_cd = formObj.gl_misc_profit.value;
    						   gl_misc_nm = formObj.gl_misc_profit_nm.value;
    					   }
    					   
    					   rtnary=new Array(6);
    					   rtnary[0] = gl_type;
    					   rtnary[1] = gl_ex_cd;
    					   rtnary[2] = gl_ex_nm;
    					   rtnary[3] = gl_misc_cd;
    					   rtnary[4] = gl_misc_nm;
    					   rtnary[5] = "Y";
    					   callBackFunc = "popupAutomaticProcessGL";
    					   modal_center_open('./CMM_POP_0430.clt', rtnary, 400,220,"yes");
    				   } 
    				   
	    		   }else{
	    			   
	    			   if(bank_multi_curr_flag == "Y"){
	    				   var f_rcv_amt = Number(removeComma(formObj.f_rcv_amt.value));
	    				   var f_pay_amt = Number(removeComma(formObj.f_pay_amt.value));
	    				   
	    				   if(formObj.f_jnr_no.value == "" && f_rcv_amt == 0){ // 신규이면서 Received Amount가 0일 경우 Event 적용시의 금액을 Setting
	    					   
	    					   formObj.f_rcv_amt.value=doMoneyFmt(parseFloat(roundXL(rcv_amt,2)).toFixed(2));
	    					   formObj.f_rcv_amt.value=removeComma(formObj.f_rcv_amt.value);
	    					   
	    				   } else { // 신규가 아니면서 Received Amount가 0이 아닐 경우
	    					   if(f_rcv_amt != f_pay_amt){ // Received Amount와 Pay Amount를 비교하여 차액 발생 (Popup)
	    						   
	    						   saveFlg = false;
	    						   
	    						   var gl_type = "";
	    						   var gl_ex_cd = "";
	    						   var gl_ex_nm = "";
	    						   var gl_misc_cd = "";
	    						   var gl_misc_nm = "";
	    						   
	    						   if(f_rcv_amt > f_pay_amt){
	    							   gl_type = "L";
	    							   gl_ex_cd = formObj.gl_ex_loss.value;
	    							   gl_ex_nm = formObj.gl_ex_loss_nm.value;
	    							   gl_misc_cd = formObj.gl_misc_loss.value;
	    							   gl_misc_nm = formObj.gl_misc_loss_nm.value;
	    						   } else {
	    							   gl_type = "P";
	    							   gl_ex_cd = formObj.gl_ex_profit.value;
	    							   gl_ex_nm = formObj.gl_ex_profit_nm.value;
	    							   gl_misc_cd = formObj.gl_misc_profit.value;
	    							   gl_misc_nm = formObj.gl_misc_profit_nm.value;
	    						   }
	    						   
	    						   rtnary=new Array(6);
	    						   rtnary[0] = gl_type;
	    						   rtnary[1] = gl_ex_cd;
	    						   rtnary[2] = gl_ex_nm;
	    						   rtnary[3] = gl_misc_cd;
	    						   rtnary[4] = gl_misc_nm;
	    						   rtnary[5] = multiCurrCnt > 0 ? "Y":"N";
	    						   callBackFunc = "popupAutomaticProcess";
	    						   modal_center_open('./CMM_POP_0430.clt', rtnary, 400,220,"yes");
	    					   } else {
	    						   formObj.f_rcv_amt.value=removeComma(formObj.f_rcv_amt.value);
	    					   }
	    				   }
	    			   } else {
	    				   // pay_amt의 sum을 저장한다.
	    				   formObj.f_rcv_amt.value=doMoneyFmt(parseFloat(roundXL(rcv_amt,2)).toFixed(2));
	    				   formObj.f_rcv_amt.value=removeComma(formObj.f_rcv_amt.value);
	    			   }
	    		   }
	    		   
	    		   
	    		   if(saveFlg){
		    		   formObj.f_chk_no.value = formObj.f_chk_no.value.toUpperCase();
		    		   var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
		        	   var intRows2=sheetObj2.RowCount();
			           sheetObj2.DataInsert(intRows2);
			           
			           //Use_Clear_Void옵션이 N의 경우 save할 때  deposit_dt를 Today로 셋팅
			           if(useClearVoid == "N"){
			        	   var formObj=document.frm1;
			        	   
			        	   if (!formObj.deposit_chk.checked) {
			        		   formObj.deposit_chk.checked = true;
			        		   formObj.deposit_chk.value = "Y";
			        		   setDepositDate();
			        		   depositClick();
			        	   }
			           }
			           
			           sheetObj.DoAllSave("./ACC_JOR_0032GS.clt", FormQueryString(formObj)+'&'+sht2, true);
	    		   }
		           		           
	           }
    	   }
    	   break;
       case "DELETE":	//삭제
    	   frm1.f_cmd.value=REMOVE;
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   for(var i=1; i<=sheetObj.LastRow(); i++){
    			   sheetObj.SetCellValue(i, "ibflag","D");
    		   }
        	   var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
        	   var intRows2=sheetObj2.RowCount();
	           sheetObj2.DataInsert(intRows2);
	           sheetObj.DoAllSave("./ACC_JOR_0032GS.clt", FormQueryString(formObj)+'&'+sht2, true);
           }
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
//	   		rtnary[1]=formObj.s_cust_nm.value;
//	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	break;
       case "CUSTOMER_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_cust_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	break;
    	
      case "CUSTOMER_POPLIST2"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
//	   		rtnary[1]=formObj.s_paid_nm.value;
//	   		rtnary[2]=window;
	        
	        callBackFunc = "CUSTOMER_POPLIST2";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
   	   break;
      case "CUSTOMER2_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_paid_nm.value;
	   		rtnary[2]=window;
	        
	        callBackFunc = "CUSTOMER_POPLIST2";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
 	   break;
   	   
       case "PRINT":
          	if(formObj.f_lst_chk_no.value != "" && formObj.f_cur_chk_no.value == formObj.f_chk_no.value &&
    	  		eval(formObj.f_cur_chk_no.value) > eval(formObj.f_lst_chk_no.value) ){	//current check no 가 Last check no 보다 클 경우 경고
    	  		if(!confirm(getLabel('ACC_MSG115') ) ){
    	  			return;
    	  		}
    	  }
			formObj.print_auto_save.value='Y'; 
			// print버튼 클릭 이벤트 플래그
			printOnclick = true;
			doWork('MODIFY', 'PRNSAVE');
			ajaxSendPost(getBankChkForm, 'reqVal', '&goWhere=aj&bcKey=searchBankChkForm&bank_seq='+formObj.f_bank_cd.value, './GateServlet.gsl');
			/*
			if(formObj.print_auto_save.value == 'S'){
				if(formObj.f_chk_form.value !=  ""){
					formObj.file_name.value='check_journal_01_' + formObj.f_chk_form.value + '.mrd';
				}else{
					formObj.file_name.value='check_journal_01.mrd';
				}
				formObj.title.value='Check Print';
				var param='[' + formObj.f_jnr_no.value + ']';				// [1]
				param	  += '[' + formObj.rider_yn.value + ']';				// [2]
				param	  += '[]';												// [3]
				formObj.rd_param.value=param;
				popPOST(formObj, 'RPT_RD_0020.clt', 'popTest', 1025, 740);
			}
			//Print 완료 flag
			formObj.print_auto_save.value='N';
			*/
      break;
      case "RIDERPRINT":
	       	if(formObj.f_jnr_no.value == ""){
	       		alert(getLabel('FMS_COM_ALT004'));
	       		return;
	       	}
	       	formObj.file_name.value='check_journal_02.mrd';
			formObj.title.value='Check Print';
			var param='[' + formObj.f_jnr_no.value + ']';				// [1]
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0020.clt', 'popTest', 1025, 740);
      break;
      case "EXCEL":
    	  if(sheetObj.RowCount() < 1){//no data	
	  			ComShowCodeMessage("COM132501");
	  		}else{
	  			sheetObj.Down2Excel( {HiddenColumn:1, SheetDesign:1,Merge:1, CheckBoxOffValue:" ",CheckBoxOnValue:"Y" });
	  		}
      break;
    }
}

/**
 * #5030 [SENWA] DEPOSIT ENTRY 화면에서 Check No 메세지 수정 요청
 * Bank 의 check no 사용여부 확인.
 * @returns {Boolean}
 */
function chkBankCheckNoUseYn() {
	var formObj = document.frm1;
	var bank_seq = formObj.f_bank_cd.value;
	var result = false;

	if(ARR_BNK_INFO != undefined && ARR_BNK_INFO.length > 0) {
		for(var i=0; i<ARR_BNK_INFO.length; i++) {
			if(bank_seq == ARR_BNK_INFO[i].bank_seq && ARR_BNK_INFO[i].chk_no_use_flg == 'Y') {
				result = true;
			}
		}
	}
	return result;
}

/*
* 요구사항 #39862 [BINEX]Deposit/Payment - Invoice #로 Search 추가로 call_val 로 분기 처리
*/
function INVGET(rtnVal){
	
	var formObj = document.frm1;
    
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
     	return;
    }else{
    	
    	var tmpValAry = rtnVal.split("^@");
		var rtnValAry = tmpValAry[0].split("|");
		
		formObj.s_cust_cd.value		= rtnValAry[1];
		formObj.s_paid_cd.value  	= rtnValAry[1];
		//#1213 [Payment Lv3 Entry] Can't close message after click "OK" button with single click "OK" button
		formObj.s_cust_nm.value		= rtnValAry[2];
		formObj.s_paid_nm.value  	= rtnValAry[2];	
		
		//#3488 Accounting Multi Language 적용 
		/*if ( MULTI_LANGUAGE == "Y" ){
			formObj.s_cust_nm.value		= rtnValAry[10];
			formObj.s_paid_nm.value  	= rtnValAry[10];
		}else{
			formObj.s_cust_nm.value		= rtnValAry[2];
			formObj.s_paid_nm.value  	= rtnValAry[2];			
		}	*/	
		
		formObj.s_inv_no.value 		= rtnValAry[0];
		
		if(RMK_LEVEL == "2"){
			CODETYPE = "ACCT_PAY_ORD";	
			ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code='+formObj.s_cust_cd.value, './GateServlet.gsl');
		}
		
		doWork("SEARCHLIST");
    } 
}

function INVADD(rtnVal){
	 var sheetObj=docObjects[0];
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		if(sheetObj.LastRow()== 1 && sheetObj.GetCellText(sheetObj.LastRow(), "inv_post_dt") == ""){
			sheetObj.RemoveAll();
		}
		var tmpValAry=rtnVal.split("^@");
		for(var i=0; i<tmpValAry.length-1; i++){
			var rtnValAry=tmpValAry[i].split("|");
			for(var j=1; j<=sheetObj.LastRow();j++){
				if(sheetObj.GetCellValue(j, "inv_seq") == rtnValAry[14]){
					//Select Data is Aleady Exist!
					alert(getLabel('FMS_COM_ALT013'));
					return;
				}
			}
			var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
            sheetObj.SetRowBackColor(intRows,"#EFEBEF");
            sheetObj.SetCellBackColor(intRows, "del_chk","#FFFFFF");
    		sheetObj.SetCellBackColor(intRows, "inv_dt","#FFFFFF");
    		sheetObj.SetCellBackColor(intRows, "inv_due_dt","#FFFFFF");
    		sheetObj.SetCellBackColor(intRows, "inv_aply_xcrt","#FFFFFF");
    		sheetObj.SetCellBackColor(intRows, "pay_amt","#FFFFFF");
    		sheetObj.SetCellBackColor(intRows, "chk_flag","#FFFFFF");
    		sheetObj.SetCellBackColor(intRows, "jnr_desc","#FFFFFF");
    		sheetObj.SetCellBackColor(intRows, "clr_flag","#FFFFFF");
            sheetObj.SetCellEditable(intRows, "jnr_desc",1);
            sheetObj.SetCellEditable(intRows, "inv_aply_xcrt",1);
            sheetObj.SetCellEditable(intRows, "pay_amt",1);
            sheetObj.SetCellEditable(intRows, "clr_flag",1);
            
            sheetObj.SetCellEditable(intRows, "gl_no",0);
            sheetObj.SetCellEditable(intRows, "gl_rmk",0);
            sheetObj.SetCellEditable(intRows, "bl_no",0);
            sheetObj.SetCellEditable(intRows, "ref_no",0);
            
            //BUY_INV_NO 를 INV_NO로 덮어쓰기 때문에 INV_SEQ를 앞에 변경해 INV_SEQ가 존재하면 덮어쓰지 못하게 한다.
            sheetObj.SetCellValue(intRows, "inv_seq",rtnValAry[14]);
            sheetObj.SetCellValue(intRows, "inv_post_dt",rtnValAry[0]);
            sheetObj.SetCellValue(intRows, "inv_dt",rtnValAry[17]);
	        sheetObj.SetCellValue(intRows, "inv_due_dt",rtnValAry[18]);
            sheetObj.SetCellValue(intRows, "ofc_cd",rtnValAry[1]);
            sheetObj.SetCellValue(intRows, "inv_dept_cd",rtnValAry[2]);
            sheetObj.SetCellValue(intRows, "inv_tp",rtnValAry[3]);
            sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",rtnValAry[4]);
            sheetObj.SetCellValue(intRows, "inv_aply_xcrt",rtnValAry[5]);
            sheetObj.SetCellValue(intRows, "inv_no",rtnValAry[6]);
            sheetObj.SetCellValue(intRows, "buy_inv_no",rtnValAry[7]);
            sheetObj.SetCellValue(intRows, "inv_sum_amt",rtnValAry[8]);
            sheetObj.SetCellValue(intRows, "bal_sum_amt",rtnValAry[9]);
            sheetObj.SetCellValue(intRows, "bal_sum_amt_1",rtnValAry[9]);
            sheetObj.SetCellValue(intRows, "gl_no",rtnValAry[10], 0);
            sheetObj.SetCellValue(intRows, "gl_rmk",rtnValAry[11], 0);
            sheetObj.SetCellValue(intRows, "ref_no",rtnValAry[12]);
            sheetObj.SetCellValue(intRows, "bl_no",rtnValAry[13]);
	        sheetObj.SetCellValue(intRows, "trdp_cd",rtnValAry[15]);
	        sheetObj.SetCellValue(intRows, "sell_buy_tp_cd",rtnValAry[16]);
//	        if(SHOW_DESCRIPTION == 'Y'){
	        	sheetObj.SetCellValue(intRows, "jnr_desc",rtnValAry[19]);
//		    }
	        sheetObj.SetCellValue(intRows, "clr_flag","0");
	        sheetObj.SetCellValue(intRows, "inp_type","S");
	        
	        //sheetObj.SetCellValue(intRows, "inv_xcrt_dt",rtnValAry[17]);  //#1617
	        sheetObj.SetCellValue(intRows, "inv_xcrt_sum_amt",rtnValAry[20]);
	        sheetObj.SetCellValue(intRows, "inv_xcrt_dt",rtnValAry[21]);
	        //OFVFOUR-7996 [South East World Wide] Adding Agent Ref No. Column and Header Setting Save Function
	        sheetObj.SetCellValue(intRows, "imp_ref_no",rtnValAry[22]);
		}
	}             
}

function CUSTOMER_POPLIST(rtnVal){
	var formObj=document.frm1;
     if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_cust_cd.value=rtnValAry[0];
		formObj.s_paid_cd.value=rtnValAry[0];
		
		//#3488 Accounting Multi Language 적용 
		if ( MULTI_LANGUAGE == "Y" ){
			formObj.s_cust_nm.value=rtnValAry[10];
			formObj.s_paid_nm.value=rtnValAry[10];
		}else{
			formObj.s_cust_nm.value=rtnValAry[2];
			formObj.s_paid_nm.value=rtnValAry[2];
		}		
		
		setRmkAcctPayOrd(rtnValAry[32]);
	}       
}
function CUSTOMER_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_paid_cd.value=rtnValAry[0];
		
		//#3488 Accounting Multi Language 적용 
		if ( MULTI_LANGUAGE == "Y" ){
			formObj.s_paid_nm.value=rtnValAry[10];
		}else{
			formObj.s_paid_nm.value=rtnValAry[2];	
		}
	}              
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
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
    
	/* #2111 자동완성 기능 추가  */
	fnSetAutocompleteCallBack('s_cust_nm', 'CUSTOMER_POPLIST', 'LINER_POPLIST'); //Customer			
	/* #2111 자동완성 기능 추가  */
	fnSetAutocompleteCallBack('s_paid_nm', 'CUSTOMER_POPLIST2', 'LINER_POPLIST'); //Received From	    
    
    var opt_key = "ACCT_PAY_ODR";
	ajaxSendPost(setRemarkSetReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
	var opt_key = "USE_CLEAR_VOID";
	ajaxSendPost(setUseClearVoid, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key = "BANK_MULTI_CURR_FLAG";
	ajaxSendPost(setBankMultiCurrFlag, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
	//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	opt_key = "USE_LOCL_GL_VIEW_FALG";
	ajaxSendPost(setUseLoclGlViewFalg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	if(GL_VIEW_FALG == "Y"){
		document.getElementById("th_loc_pay_amt").style.visibility="visible";
		document.getElementById("td_loc_pay_amt").style.visibility="visible";
	}else{
		document.getElementById("th_loc_pay_amt").style.visibility="hidden";
		document.getElementById("td_loc_pay_amt").style.visibility="hidden";		
	}	
	
	getGlName();
	
//	var opt_key1 = "BANK_GNA_RMK";
//	ajaxSendPost(setDescriptionReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key1, "./GateServlet.gsl");
    
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	
	// BNX 의 경우만 OFC_BLCK_FLG 를 Default 로 check 해 주세요.
    var opt_key_sec = "BANK_OFC_BLCK_FLG";
    ajaxSendPost(setBankOffBlckFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
    
	//오늘일자구하기
	var now=new Date(); 				
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 			
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	TODAY=month + "-" + date + "-" + year;
	formObj.f_post_dt.value=TODAY;
	formObj.old_post_dt.value=TODAY;
	//#6734 [Zencon] POST DATE CHANGE BLOCK ROLE OPTION (Zen#3023)
	if(formObj.pst_dt_flg.value=="Y")
	{
	formObj.f_post_dt.disabled=true;
	formObj.f_post_dt.className="search_form-disable";
	formObj.f_post_dt_cal.style.display="none";
	}
	
	if(formObj.oa_flg.value != "Y"){
		formObj.s_ofc_cd.value = UserOfcCd;
	}
	
	if(bank_multi_curr_flag == "Y"){
		formObj.f_rcv_amt.readOnly = false;
		formObj.f_rcv_amt.className = "search_form zero_remove";
	}
	
	if(formObj.codp_flg.value == "Y"){
		formObj.f_ofc_cd.disabled = false;
	}
	
	// #52315 [UCB] Payment RiderPrint 버튼 로직 수정
	// Default Entry 화면을 Open 하는 경우 Print 만 보이도록 처리.
	getBtnObj('btnRiderPrint').style.display = "none";
	
	/*
	// POST DATE가 SLIP의 MAX(POST_DT) 보다 작으면.. MAX(POST_DT) + 1 로 셋팅한다.
	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	if(bl_post != "" && slip_post != ""){
		bl_post=bl_post.replaceAll("-","");
		bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
		slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
		if(slip_post >= bl_post){
			SLIP_POST_DT=addDay(formObj.slip_post.value, 1);
			formObj.f_post_dt.value=SLIP_POST_DT;
			formObj.old_post_dt.value=SLIP_POST_DT;
		}else{
			SLIP_POST_DT="";
		}
	}
	*/
	//위 로직 변경, LHK 20131112, #21734  [BINEX]Post Date Check 로직 적용
	setBlock_dt();
	formObj.s_jnr_no.value=formObj.t_jnr_no.value;
	
	//#483 [Binex LA] RiderPrint button on Payment Entry
	var opt_key = "PAYMENT_RIDER_BTN";
	ajaxSendPost(setRiderBtn, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	fn_setExRate();	
	
	// 사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false,"fnRestoreGridSetEnd");
}

function fnRestoreGridSetEnd(){
	var formObj=document.frm1;
	
	if(formObj.s_jnr_no.value != ""){
    	doWork("SEARCHLIST");
    }else{
    	//Bank Current Check No 세팅
    	setBankCurChkNo();
    }
}

/**
 * USE_CLEAR_VOID 관린 코드조회
 */

function setUseClearVoid(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == "N"){
			useClearVoid = doc[1];
		}
		setDepositVoid();
	}
}

function setDepositVoid(){
	if(useClearVoid == "N"){
		//2016.04.18 C.W.Park Modified
		//document.getElementById("deposit_void_table").style.visibility="hidden";
		document.getElementById("deposit_chk").disabled=true;
		document.getElementById("f_deposit_dt_cal").disabled=true;
		document.getElementById("f_deposit_dt").disabled=true;
		document.getElementById("void_chk").disabled=true;
		document.getElementById("f_void_dt").disabled=true;
		document.getElementById("f_void_dt_cal").disabled=true;
		document.getElementById("f_chk_no").disabled=true;
	}
}

//#51951 [BNX] Payment/Deposit 의 OFFICE 접근 권한 추가
function setBankOffBlckFlg(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		if(doc[1] == "N"){
			formObj.office_block_chk.checked = false;
		}else{
			formObj.office_block_chk.checked = true;
		} 
	}else{
		formObj.office_block_chk.checked = false;
	}
	
	fn_office_block_chk();
}


function setBankCurChkNo(){
	var formObj=document.frm1;
	formObj.f_cur_chk_no.value="";
	ajaxSendPost(getBankCurChkNo, 'reqVal', '&goWhere=aj&bcKey=searchBankCurChkNo&bank_seq='+formObj.f_bank_cd.value, './GateServlet.gsl');
    formObj.f_chk_no.value=formObj.f_cur_chk_no.value;
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
            with (sheetObj) {
        	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
        	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	       var headers = [ { Text:getLabel('ACC_JOR_0030_HDR'), Align:"Center"} ];
        	       InitHeaders(headers, info);

        	       var cols = [ {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, HeaderCheck:0},
        	              {Type:"Date",      Hidden:0,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Date",      Hidden:0,  Width:71,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",            KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Date",      Hidden:0,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"gl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 , EditLen:20},
        	              {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
        	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:90,  Align:"Center",  ColMerge:1,   SaveName:"buy_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0},
        	              {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"bal_sum_amt_1",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"bal_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"pay_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1, EditLen:14 },
        	              {Type:"CheckBox",  Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk_flag",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
        	              {Type:"Date",      Hidden:1,  Width:71,   Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },  //#1617
        	              {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_aply_xcrt",     KeyField:0,   CalcLogic:"",   Format:"Float",   	 PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	              {Type:"Float",     Hidden:1,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:1,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"ttl_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:1,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"old_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              //<!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영 -->
        	              {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"locl_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",   	 PointCount:xch_rt_dp_cnt,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
        	              {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"locl_ttl_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"locl_bal_amt_1",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"locl_bal_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"locl_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"locl_pay_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              
        	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"bl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"ref_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:0,  Width:200,  Align:"left",   ColMerge:1,   SaveName:"jnr_desc",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:100 },
        	              {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_dept_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"clr_flag",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"payto_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clr_gl",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              //OFVFOUR-7996 [South East World Wide] Adding Agent Ref No. Column and Header Setting Save Function
        	              {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"imp_ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_post_dt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_bank_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_clr_yn",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_clr_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_void_yn",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_void_dt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_chk_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_amt",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_rmk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"level",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inp_type",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"air_sea_clss_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cls_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cls_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clr_gl_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"bnd_clss_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"biz_clss_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"chk_pnt_yn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"payto_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_modi_tms",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ofc_blck_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              //#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영 
        	              {Type:"Float",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"tot_locl_amt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"tot_locl_xcrt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:8,   UpdateEdit:0,   InsertEdit:0 },
        	              
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"master_ofc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              //#6375 [Bug-Deposit/Payment Entry] Bank Field could be shown regardless of Use Flag
        	              {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_bank_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
        	              ];
        	     
        	        
        	       InitColumns(cols);

        	       //SetSheetHeight(390);
        	       //#6304 [GENESIS] TOTAL AMOUNT MISSING IN AP ENTRY SCREEN
        	       SetSheetHeight(window.innerHeight - 312 > 200 ? window.innerHeight - 312 : 200);
        	       SetEditable(1);
        	       SetColProperty("ofc_cd", {ComboText:OFCCD, ComboCode:OFCCD} );
              	   SetColProperty("inv_aply_curr_cd", {ComboText:CURRCD, ComboCode:CURRCD} );
        	       //InitViewFormat(0, "inv_post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
        	       //InitViewFormat(0, "inv_dt", 			"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
        	       //InitViewFormat(0, "inv_due_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
        	       SetColProperty(0 ,"gl_rmk" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
        	       SetColProperty(0 ,"buy_inv_no" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
        	       SetColProperty(0 ,"bl_no" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
        	       SetColProperty(0 ,"ref_no" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
        	       resizeSheet();
        	       
        	       SetActionMenu("Header Setting Save|Header Setting Reset");
        	       
        	       if (bank_multi_curr_flag == "Y"){
		        	   SetColHidden("inv_xcrt_dt", 0);
		        	   SetColHidden("inv_aply_xcrt", 0);
		        	   SetColHidden("inv_xcrt_sum_amt", 0);
		        	   SetColHidden("ttl_pay_amt", 0);
		           }
        	       
					//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
					if(GL_VIEW_FALG=="Y"){
						SetColHidden("locl_xcrt", 0);
						SetColHidden("locl_ttl_amt", 0);
						SetColHidden("locl_bal_amt_1", 0);
						SetColHidden("locl_amt", 0);
						
						SetColHidden("inv_xcrt_dt", 1);
						SetColHidden("inv_aply_xcrt", 1);
						SetColHidden("inv_xcrt_sum_amt", 1);
						SetColHidden("ttl_pay_amt", 1);
					}
           }
           break;
         case 2:      //IBSheet2 init
             with (sheetObj) {
	             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	             var headers = [ { Text:"inv_seq|ibflag2", Align:"Center"} ];
	             InitHeaders(headers, info);
	
	             var cols = [ {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                    {Type:"Status",    Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag2",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	              
	             InitColumns(cols);
	             SetEditable(1);
	             SetVisible(false);
            }                                                      
            break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0], 130);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	formObj.s_jnr_no.value="";
	
	if (sheetObj.LastRow() == 0) {
		formObj.f_rcv_amt.value=doMoneyFmt(parseFloat(roundXL(0,2)).toFixed(2));
		//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
		formObj.f_locl_rcv_amt.value ="";
		
		jnrStatusControl();
		setSearchCondition("");
		/*20151110 Customer 재조회시 하단 토탈 부분 갱신*/
		setTotalAmount();
		/**/
		return;
	}
	
	for(var i=1;i<=sheetObj.LastRow();i++){
		sheetObj.SetRowBackColor(i,"#EFEBEF");
		sheetObj.SetCellBackColor(i, "del_chk","#FFFFFF");
		sheetObj.SetCellBackColor(i, "chk_flag","#FFFFFF");
		sheetObj.SetCellBackColor(i, "inv_aply_xcrt","#FFFFFF");
		sheetObj.SetCellBackColor(i, "pay_amt","#FFFFFF");
		sheetObj.SetCellBackColor(i, "jnr_desc","#FFFFFF");
		sheetObj.SetCellBackColor(i, "clr_flag","#FFFFFF");
		if(sheetObj.GetCellValue(i, "clr_flag") == "1"){
			sheetObj.SetCellEditable(i, "clr_flag",0);
		}

/*		if(SHOW_DESCRIPTION == 'N'){
			sheetObj.SetCellValue(i, "jnr_desc",'');
		}else{
		}*/
	}
	if(sheetObj.GetCellValue(1,"jnr_no") != "" ){
		formObj.f_jnr_no.value=sheetObj.GetCellValue(1, "jnr_no");
		formObj.f_curr_cd.value=sheetObj.GetCellValue(1, "r_curr_cd");
		formObj.f_chk_no.value=sheetObj.GetCellValue(1, "r_chk_no");
		if(sheetObj.GetCellValue(1, "r_clr_yn") == "Y"){
			formObj.deposit_chk.checked=true;
		}else{
			formObj.deposit_chk.checked=false;
		}
		if(sheetObj.GetCellValue(1, "r_void_yn") == "Y"){
			formObj.void_chk.checked=true;
		}else{
			formObj.void_chk.checked=false;
		} 
		 
		if(sheetObj.GetCellValue(1, "ofc_blck_flg") == "3"){
			formObj.office_block_chk.checked=true; 
		}else{
			formObj.office_block_chk.checked=false; 
		}					 
		formObj.org_office_block_chk.value =sheetObj.GetCellValue(1, "ofc_blck_flg");
 
		
		formObj.f_deposit_dt.value=sheetObj.GetCellValue(1, "r_clr_dt");
		//VOID CHECK 수정유무 
		formObj.old_void_chk.value=sheetObj.GetCellValue(1, "r_void_yn");
		formObj.f_void_dt.value=sheetObj.GetCellValue(1, "r_void_dt");
		formObj.f_deposit_dt.value=sheetObj.GetCellValue(1, "r_clr_dt");
		formObj.f_post_dt.value=sheetObj.GetCellValue(1, "r_post_dt");
		formObj.f_bank_cd.value=sheetObj.GetCellValue(1, "r_bank_seq");
		//<!--  #6375 [Bug-Deposit/Payment Entry] Bank Field could be shown regardless of Use Flag   -->
		if(formObj.f_bank_cd.value == ""){
			$("#f_bank_cd").append(new Option(sheetObj.GetCellValue(1, "r_bank_nm"), sheetObj.GetCellValue(1, "r_bank_seq")));
			formObj.f_bank_cd.value=sheetObj.GetCellValue(1, "r_bank_seq");
		}
		formObj.f_remark.value=sheetObj.GetCellValue(1, "r_rmk");
		
		//51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		formObj.f_ofc_cd.value=sheetObj.GetCellValue(1, "master_ofc_cd"); 
		
		if(sheetObj.GetCellValue(1, "trdp_cd") != ""){
			formObj.s_cust_cd.value=sheetObj.GetCellValue(1, "trdp_cd");
			formObj.s_cust_nm.value=sheetObj.GetCellValue(1, "trdp_nm");
			//codeNameAction('SAVE_CUSTOMER',formObj.s_cust_cd, 'onBlur');
		}
		if(sheetObj.GetCellValue(1, "payto_cd") != ""){
			formObj.s_paid_cd.value=sheetObj.GetCellValue(1, "payto_cd");
			formObj.s_paid_nm.value=sheetObj.GetCellValue(1, "payto_nm");
			//codeNameAction('SAVE_CUSTOMER2',formObj.s_paid_cd, 'onBlur');
		}
		// BLOCK 값을 셋팅한다.
		if(sheetObj.GetCellValue(1, "level") == "3"){
			formObj.block_chk.checked=true;
		}else{
			formObj.block_chk.checked=false;
		}
		//RIDER PRINT 체크
		if(sheetObj.LastRow()> 12){
			formObj.rider_yn.value="Y";
			// #52315 [UCB] Payment RiderPrint 버튼 로직 수정
			getBtnObj('btnRiderPrint').style.display = "inline";
		} else {
			// #52315 [UCB] Payment RiderPrint 버튼 로직 수정
			//#483 [Binex LA] RiderPrint button on Payment Entry
			if(!setRiderBtnChk){
				getBtnObj('btnRiderPrint').style.display = "none";
			}
			
			//#2263 [LBS] Payment Rider 여부 확인 Query 수정
			formObj.rider_yn.value="N";
		}
		
		for(var i=1;i<=sheetObj.LastRow();i++){
			//2012/02/02 저장데이터 조회시 리스트를 체크한다.
			sheetObj.SetCellValue(i, "chk_flag","1",0);
			//LHK, 20140415, #28079 [BINEX] Deposit 상에 Balance Amout와 Received Amount 관련 에러
			sheetObj.SetCellEditable(i, "chk_flag",0);
			sheetObj.SetColBackColor("chk_flag","#EFEBEF");
			//2012/02/08 생성된 데이터의 글자색을 바꾼다.
			sheetObj.SetRowFontColor(i,"#FF0000");
			sheetObj.SetCellValue(i, "bal_sum_amt_1",Number(sheetObj.GetCellValue(i, "bal_sum_amt")) - Number(sheetObj.GetCellValue(i, "old_pay_amt")));
			
			//#5584 [JAPT]Deposit/Payment 환율 계산 에러
			if(GL_VIEW_FALG=="Y" && sheetObj.GetCellValue(i, "inp_type") == "M" && !isExMiscGL(sheetObj.GetCellValue(i, "gl_no"))) {
	   	    	 if(formObj.f_curr_cd.value != ofc_locl_curr_cd){
	   	    		 sheetObj.SetCellValue(i, "locl_xcrt",sheetObj.GetCellValue(i, "tot_locl_xcrt"), 0);
	   	    	 } else {
	   	    		 sheetObj.SetCellValue(i, "locl_xcrt","1", 0); 
	   	    	 }
	   	     }
		}
//		printBtn01.style.display = "inline";
//		getBtnObj('btnPrint').style.display = "inline";
//		getBtnObj('btnRiderPrint').style.display = "inline";
//		copyBtn01.style.display = "inline";
//		getBtnObj('btnCopy').style.display="inline";
		
		//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
		if(GL_VIEW_FALG=="Y"){
			if(ofc_locl_curr_cd == formObj.f_curr_cd.value){
				document.getElementById("th_ex_rate").style.visibility="hidden";
				document.getElementById("td_ex_rate").style.visibility="hidden";
				document.getElementById("th_loc_amt").style.visibility="hidden";
				document.getElementById("td_loc_amt").style.visibility="hidden";
			}else{
				document.getElementById("th_ex_rate").style.visibility="visible";
				document.getElementById("td_ex_rate").style.visibility="visible";
				document.getElementById("th_loc_amt").style.visibility="visible";
				document.getElementById("td_loc_amt").style.visibility="visible";	
			}
			formObj.f_ex_rate.value= sheetObj.GetCellValue(1, "tot_locl_xcrt");
			formObj.f_locl_rcv_amt.value = sheetObj.GetCellValue(1, "tot_locl_amt");
			numberCommaLen(formObj.f_ex_rate, 8, 5);
			numberCommaLen(formObj.f_locl_rcv_amt, 8, 2);	
		}
		
	}else{
		//formObj.f_post_dt.value=TODAY;
		formObj.f_inv_amt.value="";
		formObj.f_bal_amt.value="";
		formObj.f_pay_amt.value="";
		for(var i=1;i<=sheetObj.LastRow();i++){
			//2012/02/07 삭제플래그를 disable 시킨다.
			sheetObj.SetCellEditable(i, "del_chk",0);
			sheetObj.SetColBackColor("del_chk","#EFEBEF");
			//JOURNAL의 EX.RATE와 리스트의 EX.RATE가 같은 경우 1로 셋팅 틀릴경우 추후 EX.RATE 끌고와야함
			if(formObj.f_curr_cd.value == sheetObj.GetCellValue(i, "inv_aply_curr_cd")){
				sheetObj.SetCellValue(i, "inv_aply_xcrt",1);
			}
		}
		sheetObj.SetFocusAfterProcess(0);
		if(formObj.f_chk_no.disabled == false){
			formObj.f_chk_no.focus();
		}
	}
	//total Amount 처리
	setTotalAmount();
	/* #27585 [BINEX]Check/Deposit 수정 사항 : Journal 상태에 따른, form, sheet 제어  */
	jnrStatusControl();
	//LHK 20131112, post dt 변경 check 를 위해 Set
	formObj.old_post_dt.value=formObj.f_post_dt.value;
	formObj.old_void_dt.value=formObj.f_void_dt.value;
	/****************  Search Condition Control ************************/ 	
	setSearchCondition("");
	/*******************************************************************/
	
	fnbtnCtl();
	
	
	if(isPrinted){
		isPrinted=false;
	}
	
	//#1155 [CARGOZONE] Deposit and Payment Copy from List screens
	if(sheetObj.GetCellValue(1,"jnr_no") != ""){
    	if(formObj.list_copy_flag.value =="Y"){
    		formObj.list_copy_flag.value="N";
    		doWork("COPY");
    	}	
	}
	
	//#5544 [ZIMEX] Customer Payment & Payment Entry
	//setCheckTotalAmount();
	
	//#5584 [JAPT]Deposit/Payment 환율 계산 에러
	if(GL_VIEW_FALG=="Y" && sheetObj.GetCellValue(1,"jnr_no") != "" ) {
		setCheckTotalAmount();
	}
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	//Save success!
	//LHK, 20130227 Print Auto Save 시에는 Message 안띄움
	if((errMsg == undefined  || errMsg==null || errMsg =='') && formObj.print_auto_save.value != 'Y'){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	//LHK save success 인경우 print save flag 'S'로 변경, 성공인 경우만 Print 실행 하기 위해 추가.
	if(errMsg ==''){
		formObj.print_auto_save.value='S';
	}
	formObj.f_jnr_no.value=sheetObj.GetCellValue(1, "jnr_no");
	formObj.s_jnr_no.value="";
	formObj.s_inv_no.value 	= "";
	if(formObj.f_jnr_no.value != ""){
		formObj.f_curr_cd.value=sheetObj.GetCellValue(1, "r_curr_cd");
		formObj.f_chk_no.value=sheetObj.GetCellValue(1, "r_chk_no");
		if(sheetObj.GetCellValue(1, "r_clr_yn") == "Y"){
			formObj.deposit_chk.checked=true;
		}else{
			formObj.deposit_chk.checked=false;
		}
		if(sheetObj.GetCellValue(1, "r_void_yn") == "Y"){
			formObj.void_chk.checked=true;
		}else{
			formObj.void_chk.checked=false;
		}
		formObj.f_deposit_dt.value=sheetObj.GetCellValue(1, "r_clr_dt");
		//VOID CHECK 수정유무 
		formObj.old_void_chk.value=sheetObj.GetCellValue(1, "r_void_yn");
		formObj.f_void_dt.value=sheetObj.GetCellValue(1, "r_void_dt");
		formObj.f_post_dt.value=sheetObj.GetCellValue(1, "r_post_dt");
		formObj.f_bank_cd.value=sheetObj.GetCellValue(1, "r_bank_seq");
		formObj.f_remark.value=sheetObj.GetCellValue(1, "r_rmk");
		for(var i=1;i<=sheetObj.LastRow();i++){
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			sheetObj.SetCellBackColor(i,"del_chk","#FFFFFF");
			sheetObj.SetCellBackColor(i,"chk_flag","#FFFFFF");
			sheetObj.SetCellBackColor(i,"inv_aply_xcrt","#FFFFFF");
			sheetObj.SetCellBackColor(i,"pay_amt","#FFFFFF");
			sheetObj.SetCellBackColor(i,"jnr_desc","#FFFFFF");
			sheetObj.SetCellBackColor(i,"clr_flag","#FFFFFF");
			//2012/02/02 저장데이터 조회시 리스트를 체크한다.
			sheetObj.SetCellValue(i, "chk_flag","1",0);
			//LHK, 20140415, #28079 [BINEX] Deposit 상에 Balance Amout와 Received Amount 관련 에러
			sheetObj.SetCellEditable(i, "chk_flag",0);
			sheetObj.SetCellBackColor(i,"chk_flag","#EFEBEF");
			//2012/02/08 생성된 데이터의 글자색을 바꾼다.
			sheetObj.SetRowFontColor(i,"#FF0000");
			if(sheetObj.GetCellValue(i,"jnr_no") != "" ){
				sheetObj.SetCellValue(i, "bal_sum_amt_1",Number(sheetObj.GetCellValue(i, "bal_sum_amt")) - Number(sheetObj.GetCellValue(i, "old_pay_amt")));
			} else {
				sheetObj.SetCellValue(i, "bal_sum_amt_1",Number(sheetObj.GetCellValue(i, "bal_sum_amt")));
			}
			
			//#5584 [JAPT]Deposit/Payment 환율 계산 에러
			if(GL_VIEW_FALG=="Y" && sheetObj.GetCellValue(i, "inp_type") == "M"  && !isExMiscGL(sheetObj.GetCellValue(i, "gl_no"))) {
	   	    	 if(formObj.f_curr_cd.value != ofc_locl_curr_cd){
	   	    		 sheetObj.SetCellValue(i, "locl_xcrt",formObj.f_ex_rate.value, 0);
	   	    	 } else {
	   	    		 sheetObj.SetCellValue(i, "locl_xcrt","1", 0); 
	   	    	 }
	   	     }
		}
		if(sheetObj.GetCellValue(1, "trdp_cd") != ""){
			formObj.s_cust_cd.value=sheetObj.GetCellValue(1, "trdp_cd");
			formObj.s_cust_nm.value=sheetObj.GetCellValue(1, "trdp_nm");
			//codeNameAction('SAVE_CUSTOMER',formObj.s_cust_cd, 'onBlur');
		}
		if(sheetObj.GetCellValue(1, "payto_cd") != ""){
			formObj.s_paid_cd.value=sheetObj.GetCellValue(1, "payto_cd");
			formObj.s_paid_nm.value=sheetObj.GetCellValue(1, "payto_nm");
			//codeNameAction('SAVE_CUSTOMER2',formObj.s_paid_cd, 'onBlur');
		}
		// BLOCK 값을 셋팅한다.
		if(sheetObj.GetCellValue(1, "level") == "3"){
			formObj.block_chk.checked=true;
		}else{
			formObj.block_chk.checked=false;
		}
		//RIDER PRINT 체크
		if(sheetObj.LastRow()> 12){
			formObj.rider_yn.value="Y";
			// #52315 [UCB] Payment RiderPrint 버튼 로직 수정
			getBtnObj('btnRiderPrint').style.display = "inline";
		} else {
			// #52315 [UCB] Payment RiderPrint 버튼 로직 수정
			//#483 [Binex LA] RiderPrint button on Payment Entry
			if(!setRiderBtnChk){
				getBtnObj('btnRiderPrint').style.display = "none";
			}
			
			//#2263 [LBS] Payment Rider 여부 확인 Query 수정
			formObj.rider_yn.value="N";
		}
		
		if(sheetObj.GetCellValue(1, "ofc_blck_flg") == "3"){
			formObj.office_block_chk.checked=true; 
		}else{
			formObj.office_block_chk.checked=false; 
		}					 
		formObj.org_office_block_chk.value =sheetObj.GetCellValue(1, "ofc_blck_flg");
 
		
//		printBtn01.style.display = "inline";
//		getBtnObj('btnPrint').style.display = "inline";
//		getBtnObj('btnRiderPrint').style.display = "inline";
//		copyBtn01.style.display = "inline";
//		getBtnObj('btnCopy').style.display="inline";
		//total Amount 처리
		setTotalAmount();
	}else{
		clearAll();
	}
	/* #27585 [BINEX]Check/Deposit 수정 사항 : Journal 상태에 따른, form, sheet 제어  */
	jnrStatusControl();
	//LHK 20131112, post dt 변경 check 를 위해 Set
	formObj.old_post_dt.value=formObj.f_post_dt.value;
	formObj.old_void_dt.value=formObj.f_void_dt.value;
	/****************  Search Condition Control ************************/ 	
	setSearchCondition("");
	/*******************************************************************/
	// 동기화 때문에 위치변경
	if(printOnclick && formObj.print_auto_save.value == 'S'){
		if(formObj.f_chk_form.value !=  ""){
			formObj.file_name.value='check_journal_01_' + formObj.f_chk_form.value + '.mrd';
		}else{
			formObj.file_name.value='check_journal_01.mrd';
		}
		formObj.title.value='Check Print';
		var param='[' + formObj.f_jnr_no.value + ']';					// [1]
		param	  += '[' + formObj.rider_yn.value + ']';				// [2]
		param	  += '[]';												// [3], LHK 추가, GL REPORT 에서 호출될 경우 Copy 문구 출력을 위한 FLAG
		formObj.rd_param.value=param;
		popPOST(formObj, 'RPT_RD_0020.clt', 'popTest', 1025, 740);
		
		//Print 완료 flag
		formObj.print_auto_save.value='N';
		
		printOnclick = false;

	}
	
	setCheckTotalAmount();
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
var cur_row;
function sheet1_OnPopupClick(sheetObj, row, col){
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	 if(colStr == "gl_no"){
		//GLCODE POPUP을 호출한다.
		rtnary = new Array();
   		rtnary[0] = "1";
   		rtnary[1] = "";
   		rtnary[2] = JNR_TYPE;
   		cur_row = row;
        callBackFunc = "SHEET_POPUP";
        modal_center_open('./CMM_POP_0260.clt', rtnary, 658,450,"yes");
	}
}

function SHEET_POPUP(rtnVal){
	var sheetObj=docObjects[0];
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
    	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_row, "gl_no",rtnValAry[0], 0);
		sheetObj.SetCellValue(cur_row, "gl_rmk",rtnValAry[1], 0);
	}
    sheetObj.SelectCell(cur_row, "gl_rmk", 0);
}
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	cur_row = row;
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="gl_no" || sheetObj.ColSaveName(col)=="gl_rmk"){
			sheetObj.SelectCell(row, col);
			rtnary=new Array();
			rtnary[0]="GLRMK";
			rtnary[1]=sheetObj.GetCellValue(row, "gl_rmk");
			rtnary[2] = JNR_TYPE;
			callBackFunc = "sheet1_OnKeyDown_gl_rmk";
	   		modal_center_open('./CMM_POP_0260.clt', rtnary, 658,450,"yes");
		}
	}
	// 마지막 Cell에서 Tab했을 경우 Tab 이벤트 때문에 SelectCell에서 지정한 Cell의 다음 Index로 포커스 이동됨.
	// OnTab 이벤트로 변경처리함 (YJW 2017.02.15)
	/*else if(keyCode == 9 &&  sheetObj.ColSaveName(col) == "inv_dept_cd"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 2);
	}*/
}

function sheet1_OnTab(sheetObj, Row, Col, ORow, OCol, isShift, isLast) {
	// #334 - [ZEN] PAYMENT AND DEPOSIT COLUMN ORDER ADJUSTMENT
	var lastCol = 0;
	
	for(var i=0; i<=sheetObj.LastCol(); i++){
		if(sheetObj.GetColHidden(i) == 0) {
			lastCol = i;
		}
	}
	
	if(sheetObj.LastRow() == Row && OCol == lastCol){
		doWork('ROWADD');
		sheetObj.SelectCell(sheetObj.LastRow(), 0);
	}
}

function sheet1_OnKeyDown_gl_rmk(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "gl_no",rtnValAry[0], 0);
		docObjects[0].SetCellValue(cur_row, "gl_rmk",rtnValAry[1], 0);
	}
	docObjects[0].SelectCell(cur_row, "inv_aply_curr_cd", 0);
}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
	    case "clr_flag" :
	    	if(sheetObj.GetCellValue(Row, "clr_flag") == "0"){
	    		if(sheetObj.GetCellValue(Row, "ttl_pay_amt") == 0){
					//[Payment] is mandatory field.
					alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_PAYAMOUNT'));
					sheetObj.SelectCell(Row, "pay_amt");
					sheetObj.SetCellValue(Row, "clr_flag",1);
					return;
				}
	    		var inv_sum_amt=Number(sheetObj.GetCellValue(Row, "inv_sum_amt"));
	    		var bal_sum_amt=Number(sheetObj.GetCellValue(Row, "bal_sum_amt"));
	    		var pay_amt=Number(sheetObj.GetCellValue(Row, "pay_amt"));
	    		var ex_rate=Number(sheetObj.GetCellValue(Row, "inv_aply_xcrt"));
	    		var old_pay_amt=Number(sheetObj.GetCellValue(Row, "old_pay_amt"));
				if((bal_sum_amt - pay_amt) != 0 ){
					sheetObj.DataInsert(Row);
			        if(pay_amt < bal_sum_amt){
			        	pay_amt=bal_sum_amt - pay_amt;
			        	if(formObj.f_curr_cd.value != sheetObj.GetCellValue(Row, "inv_aply_curr_cd")){
			        		sheetObj.SetCellValue(Row+1, "clr_gl","EL");
			        	}
			        	else{
			        		sheetObj.SetCellValue(Row+1, "clr_gl","ML");
			        	}
			        }else if(pay_amt > bal_sum_amt){
			        	pay_amt=pay_amt - bal_sum_amt;
			        	if(formObj.f_curr_cd.value != sheetObj.GetCellValue(Row, "inv_aply_curr_cd")){
			        		sheetObj.SetCellValue(Row+1, "clr_gl","EP");
			        	}
			        	else{
			        		sheetObj.SetCellValue(Row+1, "clr_gl","MP");
			        	}
			        }
			        sheetObj.SetCellValue(Row+1, "chk_flag",1);
			        sheetObj.SetCellText(Row+1, "inv_post_dt",sheetObj.GetCellText(Row, "inv_post_dt"));
			        sheetObj.SetCellValue(Row+1, "ofc_cd",sheetObj.GetCellValue(Row, "ofc_cd"));
			        sheetObj.SetCellValue(Row+1, "inv_dept_cd",sheetObj.GetCellValue(Row, "inv_dept_cd"));
			        sheetObj.SetCellValue(Row+1, "inv_tp",sheetObj.GetCellValue(Row, "inv_tp"));
			        sheetObj.SetCellValue(Row+1, "inv_no",sheetObj.GetCellValue(Row, "inv_no"));
			        sheetObj.SetCellValue(Row+1, "gl_no",sheetObj.GetCellValue(Row, "gl_no"));
			        sheetObj.SetCellValue(Row+1, "ref_no",sheetObj.GetCellValue(Row, "ref_no"));
			        sheetObj.SetCellValue(Row+1, "bl_no",sheetObj.GetCellValue(Row, "clr_gl_cd"));
			        sheetObj.SetCellValue(Row+1, "jnr_desc",sheetObj.GetCellValue(Row, "jnr_desc"));
			        sheetObj.SetCellValue(Row+1, "inv_aply_curr_cd",sheetObj.GetCellValue(Row, "inv_aply_curr_cd"));
			        sheetObj.SetCellValue(Row+1, "inv_aply_xcrt",sheetObj.GetCellValue(Row, "inv_aply_xcrt"));
			        sheetObj.SetCellValue(Row+1, "inv_sum_amt",sheetObj.GetCellValue(Row, "inv_sum_amt"));
			        sheetObj.SetCellValue(Row+1, "bal_sum_amt_1",0);
			        sheetObj.SetCellValue(Row+1, "bal_sum_amt",sheetObj.GetCellValue(Row, "bal_sum_amt"));
			        sheetObj.SetCellValue(Row+1, "old_pay_amt",Number(sheetObj.GetCellValue(Row, "pay_amt")));
			        sheetObj.SetCellValue(Row+1, "pay_amt",pay_amt);
			        sheetObj.SetCellValue(Row+1, "ttl_pay_amt",ex_rate * pay_amt);
			        sheetObj.SetCellValue(Row+1, "inv_seq",sheetObj.GetCellValue(Row, "inv_seq"));
			        sheetObj.SetCellValue(Row+1, "trdp_cd",sheetObj.GetCellValue(Row, "trdp_cd"));
			        sheetObj.SetCellValue(Row+1, "clr_flag","1");
				}
			}
			break;
			/* #21662 : [BINEX]Deposit, Payment 화면에서 Invoice Link jsjang 2013.10.31 */
		case "buy_inv_no" :
			var paramUrl="";
			var paramFrm="";
			var paramStr="";
			if(sheetObj.GetCellValue(Row, "buy_inv_no") != "")
			{
				var inp_type=sheetObj.GetCellValue(Row, "inp_type");
				var air_sea_clss_cd=sheetObj.GetCellValue(Row, "air_sea_clss_cd");
				var inv_tp=sheetObj.GetCellValue(Row, "inv_tp");
				/* #34551 - [SFI]Deposit/Payment 에서 인보이스 이동 
				 * => Deposit/Payment 저장 이전이라도 조회 후 링크 되도록 수정 2014.06.23 */
				//if(inp_type == "S"){
					if(air_sea_clss_cd == "G")
					{
						//#6941 : [Impex-CHI] Blank Invoice screen from Deposit Entry
						if(inv_tp == 'A/R'){
							paramStr="./ACC_INV_0035.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, "inv_no"); // A/P(A&R)
							paramFrm="A/R Entry(G&A)";
						}else if(inv_tp == 'A/P'){
							paramStr="./ACC_INV_0031.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, "buy_inv_no"); // A/P(A&R)
							paramFrm="A/P Entry(G&A)";
						}
					}else{
						if(inv_tp == 'A/R')
						{
							paramStr="./ACC_INV_0010.clt?f_cmd=-1&f_intg_bl_seq=&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, "inv_no"); // A/R
							paramFrm="A/R Entry";
						}else if(inv_tp == 'A/P')
						{
							paramStr="./ACC_INV_0030.clt?f_cmd=-1&f_intg_bl_seq=&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, "buy_inv_no"); // A/P(COST)
							paramFrm="A/P Entry(Cost)";
						}else if(inv_tp == 'DEBIT')
						{
							paramStr="./ACC_INV_0020.clt?f_cmd=-1&f_intg_bl_seq=&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, "inv_no"); // D/C(D/C)
							paramFrm="D/C Note Entry";
						}
					}
					if(paramFrm != "")
					{
						parent.mkNewFrame(paramFrm, paramStr);
					}
				//}
			}
		 break;
		case "bl_no" :
		case "ref_no" :
			if(sheetObj.GetCellValue(Row, "intg_bl_seq") != "")
			{
				var air_sea_clss_cd=sheetObj.GetCellValue(Row, "air_sea_clss_cd");
				var bnd_clss_cd=sheetObj.GetCellValue(Row, "bnd_clss_cd");
				var biz_clss_cd=sheetObj.GetCellValue(Row, "biz_clss_cd");
				var bl_no=sheetObj.GetCellValue(Row, "bl_no");
				var intg_bl_seq=sheetObj.GetCellValue(Row, "intg_bl_seq");
				var ref_no=sheetObj.GetCellValue(Row, "ref_no");
				goBL(bnd_clss_cd, biz_clss_cd, intg_bl_seq,  air_sea_clss_cd, bl_no, ref_no);
			}else{
				//add warehouse info skwoo 20150203
				if(sheetObj.GetCellValue(Row, "inv_dept_cd")=="WMS"){
					var paramStr="./WHM_WHM_0010.clt?f_cmd=-1&doc_ref_no="+sheetObj.GetCellValue(Row, "ref_no");
				    parent.mkNewFrame('Warehouse Doc Entry', paramStr, "WHM_WHM_0010_SHEET1");
				
				}else if(sheetObj.GetCellValue(Row, "inv_dept_cd")=="OTH"){
					var paramStr="./OTH_OPR_0010.clt?f_cmd=-1&ref_no="+sheetObj.GetCellValue(Row, "ref_no");
				    parent.mkNewFrame('MISC. Operation Entry', paramStr, "OTH_OPR_0010_SHEET1");
				}
			}
		break;
		// LHK, 20140307, #26818 [BINEX]Check Print 이후 Payment 자료 수정이 되고 있음 - PRINT_CALLBACK 에서 처리하도록 수정함. 
		// 25704 Print 완료 flag 비교  print화면이 열려있고 print되어 있는 상태라면 Sheet를 최신값으로 가져온다
		/*
		case "pay_amt"  :
			if (formObj.print_auto_save.value='N' && isPrinted) {
				formObj.f_cmd.value=SEARCHLIST;
//method change[check again]CLT 				docObjects[0].DoSearch("./ACC_JOR_0032GS.clt", FormQueryString(formObj) );
				isPrinted=false;
			}
		case "inv_post_dt"  :
			if (formObj.print_auto_save.value='N' && isPrinted) {
				formObj.f_cmd.value=SEARCHLIST;
//method change[check again]CLT 				docObjects[0].DoSearch("./ACC_JOR_0032GS.clt", FormQueryString(formObj) );
				isPrinted=false;
			}
		case "chk_flag"  :
			if (formObj.print_auto_save.value='N' && isPrinted) {
			    formObj.f_cmd.value=SEARCHLIST;
//method change[check again]CLT 		        docObjects[0].DoSearch("./ACC_JOR_0032GS.clt", FormQueryString(formObj) );
		        isPrinted=false;
			}
		break;
		*/
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "pay_amt" :
			/*			
			LHK, 20131218 QnA #22627 [BINEX]Deposit/Payment 시 이종 Currency 처리 문제
			(Received, Payment 컬럼 disable, check box disable)
			*/
			if(bank_multi_curr_flag == "N" && formObj.f_curr_cd.value != sheetObj.GetCellValue(Row, "inv_aply_curr_cd")){
				return;
			}
			if(sheetObj.GetCellValue(Row,"jnr_no") == "" ) {
				sheetObj.SetCellValue(Row, "pay_amt", sheetObj.GetCellValue(Row, "bal_sum_amt"), 1);
			}
			break;
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	// TODO: 
	switch (sheetObj.ColSaveName(Col)) {
		/*
		case "gl_no" :
			// GL NO에 매핑되어있는 BANK 정보를 가져온다.
			if(sheetObj.GetCellValue(Row, "inp_type") == "M"){
				var gl_no=sheetObj.GetCellValue(Row, "gl_no");
				var gl_rmk=sheetObj.GetCellValue(Row, "gl_rmk");
				SELECTROW=Row;
				ajaxSendPost(searchGlBankInfo, 'reqVal', '&goWhere=aj&bcKey=searchGlBankInfo&gl_no='+gl_no+'&gl_rmk='+gl_rmk, './GateServlet.gsl');
			}	
		break;
		*/
		case "pay_amt" :
			var ex_rate=Number(sheetObj.GetCellValue(Row, "inv_aply_xcrt"));
			var pay_amt=Number(sheetObj.GetCellValue(Row, "pay_amt"));
			var old_pay_amt=Number(sheetObj.GetCellValue(Row, "old_pay_amt"));
			// 지급금액이 발런스 금액과 같으면 클리어 처리한다.
			var inv_sum_amt=Number(sheetObj.GetCellValue(Row, "inv_sum_amt"));
			var bal_sum_amt=Number(sheetObj.GetCellValue(Row, "bal_sum_amt"));
			var locl_xcrt = Number(sheetObj.GetCellValue(Row, "locl_xcrt"));
			//#1213 [Payment Lv3 Entry] Can't close message after click "OK" button with single click "OK" button
			if(pay_amt > 9999999999999999.9999 || (ex_rate * pay_amt) > 9999999999999999.9999 || (locl_xcrt * pay_amt) > 9999999999999999.9999){
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(Row, "pay_amt", 0);
				return;
			}
			if(sheetObj.GetCellValue(1, "r_void_yn") == "Y"){
		    	bal_sum_amt=bal_sum_amt - old_pay_amt;
		    }
			/* LHK, 20131223 #24674 [BINEX]Payment Entry - Over Payment 불가 */
		    /* LHK, 20140227 #26625 [SUNWAY]Payment 화면 금액 Validation check 오류 수정 */
			if (sheetObj.GetCellValue(Row, "inp_type") != "M" 		//Input type 이 M 이 아니고 Credit, A/P 인 경우
				&& (sheetObj.GetCellValue(Row, "sell_buy_tp_cd") == 'C' || sheetObj.GetCellValue(Row, "sell_buy_tp_cd") == 'B')) {
	     		   var amtComFlg=false;
	    		   if(inv_sum_amt < 0){
	    			   if (Math.abs(pay_amt) > Math.abs(bal_sum_amt)) {
	    				   amtComFlg=true;
	    			   }	   
	  			   }else{
	  				   if(pay_amt > bal_sum_amt){
	  					   amtComFlg=true;
	  				   }
	  			   }
			    	if(amtComFlg){
				    	alert(getLabel('ACC_MSG134'));
				    	sheetObj.SetCellValue(Row, "pay_amt",bal_sum_amt);
						return;
					}
		    }
			sheetObj.SetCellValue(Row, "ttl_pay_amt",ex_rate * pay_amt);
			// 지급금액이 발런스 금액과 같으면 클리어 처리한다.
			var ttl_pay_amt=Number(sheetObj.GetCellValue(Row, "ttl_pay_amt"));
			if(Number(sheetObj.GetCellValue(Row, "ttl_pay_amt")) != 0){
				sheetObj.SetCellValue(Row, "chk_flag",1);
			}
		    if(inv_sum_amt != 0 || bal_sum_amt != 0){ //if(inv_sum_amt == 0 && bal_sum_amt == 0){ } else{
 			    if(bal_sum_amt == pay_amt){
 			    	sheetObj.SetCellValue(Row,"clr_flag","1");
 			    }
 			    else{
 				    sheetObj.SetCellValue(Row,"clr_flag","0");
 			    }
		    }
		    // 정원영 수정 #25248
		    if (sheetObj.GetCellValue(Row, "inv_tp") != "") {
		    	if(sheetObj.GetCellValue(Row,"jnr_no") != "" ){
					sheetObj.SetCellValue(Row, "bal_sum_amt_1",(bal_sum_amt - pay_amt).toFixed(2));
				} else {
					sheetObj.SetCellValue(Row, "bal_sum_amt_1",(bal_sum_amt - pay_amt - old_pay_amt).toFixed(2));
				}
		    }

			//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
			if(GL_VIEW_FALG=="Y") {
				
				//#5584 [JAPT]Deposit/Payment 환율 계산 에러
				if(sheetObj.GetCellValue(Row, "inp_type") == "M" && !isExMiscGL(sheetObj.GetCellValue(Row, "gl_no"))) {
		   	    	 if(formObj.f_curr_cd.value != ofc_locl_curr_cd){
		   	    		 sheetObj.SetCellValue(Row, "locl_xcrt",formObj.f_ex_rate.value);
		   	    	 } else {
		   	    		 sheetObj.SetCellValue(Row, "locl_xcrt","1"); 
		   	    	 }
		   	     }
				
				var POINT_CNT = (ofc_locl_curr_cd=="KRW" ||  ofc_locl_curr_cd=="JPY") ? 0 : 2;
				var loclRecAmt = roundXL(Number(sheetObj.GetCellValue(Row, "pay_amt")) * Number(sheetObj.GetCellValue(Row, "locl_xcrt")), POINT_CNT);
				var loclPayAmt = Number(sheetObj.GetCellValue(Row, "locl_pay_amt"));
				var loclBalAmt = Number(sheetObj.GetCellValue(Row, "locl_bal_amt"));

				//#4998 [JTC]Deposit/Payment Local Amount vs. Invoice Local Amount difference adjustment
				if (sheetObj.GetCellValue(Row, "inp_type") != "M"){	//#5584 [JAPT]Deposit/Payment 환율 계산 에러
					if(sheetObj.GetCellValue(Row, "bal_sum_amt_1") == 0 && (loclBalAmt - loclRecAmt) != 0) {
						loclRecAmt = loclRecAmt + (loclBalAmt - loclRecAmt) + loclPayAmt;
						loclBalAmt = 0;
					} else {
						loclBalAmt = loclBalAmt - loclRecAmt + loclPayAmt;
					}
				}

				sheetObj.SetCellValue(Row, "locl_amt", loclRecAmt, 0);
				sheetObj.SetCellValue(Row, "locl_bal_amt_1", loclBalAmt, 0);
			}
			
		    break;
		case "inv_aply_xcrt" :
			setInvXcrtSumAmt(sheetObj, Row);
			
			// #791 - [Patent] #4 Payment / Deposit Exchange Rate 반영
		    for(var i=1; i<=sheetObj.LastRow(); i++){
		    	if(Row != i){
		    		if(sheetObj.GetCellValue(i,"inv_aply_curr_cd") == sheetObj.GetCellValue(Row,"inv_aply_curr_cd") && 
		    				sheetObj.GetCellValue(i,"inv_xcrt_dt") == sheetObj.GetCellValue(Row,"inv_xcrt_dt")){
		    			sheetObj.SetCellValue(i, "inv_aply_xcrt", sheetObj.GetCellValue(Row, "inv_aply_xcrt"), 0);
		    			setInvXcrtSumAmt(sheetObj, i);
		    		}
		    	}
		    }
		break;
		case "del_chk" :
			//LHK, 20140306 #26831 Payment 삭제 오류, 전체 삭제 제어(부분 삭제만 허용.)
			//alert(sheetObj.RowCount); alert(sheetObj.CheckedRows("del_chk"));
			if(sheetObj.RowCount()> 0 && sheetObj.RowCount()== sheetObj.CheckedRows("del_chk")){
				alert(getLabel('ACC_MSG135'));
				sheetObj.SetCellValue(Row, 'del_chk',0,0);
				return;
			}
			
			// 모든 데이터가 Delete 되는 Case에 대해 Validation 강화
			if(!fncDelChkCount(sheetObj.ColSaveName(Col),Row)) return;
			
			if(sheetObj.GetCellValue(1,"jnr_no") != "" ){
				if(sheetObj.GetCellValue(Row, "del_chk") == "1"){
					sheetObj.SetCellValue(Row, "chk_flag","0",0);
					if(sheetObj.GetCellValue(Row, "clr_row") != "Y"){
						sheetObj.SetCellValue(Row, "pay_amt","");
					}
				}else{
					sheetObj.SetCellValue(Row, "chk_flag","1",0);
					if(sheetObj.GetCellValue(Row, "clr_row") != "Y"){
	    				if(Number(sheetObj.GetCellValue(Row, "pay_amt")) == 0){
							//LHK, 20140124, 강성덕 수석님 확인, 저장 후에도 check 시에 pay amount 값 Set 해야 함.
							//if(sheetObj.CellValue(Row,"jnr_no") == "" ){
	    					sheetObj.SetCellValue(Row, "pay_amt",sheetObj.GetCellValue(Row, "bal_sum_amt"));
							//}
						}
					}
				}
			}
			if(sheetObj.GetCellValue(Row, "ibflag") == "I" && sheetObj.GetCellValue(Row, 'del_chk') == 1){
	    		//sheetObj.CellValue2(Row, "del_chk") = "0";
				sheetObj.RowDelete(Row,false);
			}
		break;
		case "chk_flag" :
			if(sheetObj.GetCellValue(Row, "chk_flag") == "1"){
				//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
				if(GL_VIEW_FALG=="Y"){
					if(formObj.f_curr_cd.value != sheetObj.GetCellValue(Row, "inv_aply_curr_cd")){
						if(formObj.f_rcv_amt.value =="" || formObj.f_rcv_amt.value == 0){
							sheetObj.SetCellValue(Row, "chk_flag", "0");
							alert(getLabel('ACC_MSG168')); 
							return;
						}
					}
				}	
				
				if(sheetObj.GetHeaderCheck(0, "chk_flag") != "1"){
					// 인보이스 변경여부 체크
					ajaxSendPost(getInvModiTms, 'reqVal', '&goWhere=aj&bcKey=searchInvModiTms&inv_seq='+sheetObj.GetCellValue(Row, "inv_seq"), './GateServlet.gsl');
					// alert(vInvModiTms + '/' + sheetObj.CellValue(Row, "modi_tms"));
					if (vInvModiTms != sheetObj.GetCellValue(Row, "modi_tms") && sheetObj.GetCellValue(Row, "modi_tms") != '') {
		    			  // 인보이스가 변경된 경우
		    			alert(getLabel('ACC_MSG128')); 
		    			sheetObj.SetCellValue(Row, "chk_flag","0");
		    			return;
		    		}
				}
    			if(sheetObj.GetCellValue(Row, "clr_row") != "Y"){
    				if(Number(sheetObj.GetCellValue(Row, "pay_amt")) == 0){
						//LHK, 20140124, 강성덕 수석님 확인, 저장 후에도 check 시에 pay amount 값 Set 해야 함.
						//if(sheetObj.CellValue(Row,"jnr_no") == "" ){
    					sheetObj.SetCellValue(Row, "pay_amt",sheetObj.GetCellValue(Row, "bal_sum_amt"));
						//}
					}
				}
				sheetObj.SetCellValue(Row, "del_chk","0");
			}else{
				
				// 모든 데이터가 Delete 되는 Case에 대해 Validation 강화
				var chkCount = 0;
				var jnrDataCnt = 0;
				
				for(var i=1; i<=sheetObj.LastRow(); i++){
					if(Row != i){
						if(sheetObj.GetCellValue(i, "chk_flag") == "1"){
							chkCount++;
						}
					}
					if(sheetObj.GetCellValue(i,"jnr_no") != ""){
						jnrDataCnt++;
					}
				}
				
				if(chkCount == 0 && jnrDataCnt > 0){
					alert(getLabel('ACC_MSG135'));
					sheetObj.SetCellValue(Row, 'chk_flag', 1, 0);
					return;
				}
				
				if(sheetObj.GetCellValue(Row, "clr_row") != "Y"){
					//#4998 [JTC]Deposit/Payment Local Amount vs. Invoice Local Amount difference adjustment
					sheetObj.SetCellValue(Row, "locl_bal_amt_1", sheetObj.GetCellValue(Row, "locl_bal_amt"), 0);
					sheetObj.SetCellValue(Row, "pay_amt","");
				}
				
				/*var delChkCnt = 0;
				
				for(var i=1; i<=sheetObj.LastRow(); i++){
					if(i != Row){
						if(sheetObj.GetCellValue(i, "del_chk") != "1"){
							delChkCnt++;
						}
					}
				}
					
				if (delChkCnt == 0){
					if(!fncDelChkCount(sheetObj.ColSaveName(Col),Row)) return;
				}
				
				if(sheetObj.GetCellValue(Row, "clr_row") != "Y"){
					sheetObj.SetCellValue(Row, "pay_amt","");
				}*/
			}
		break;
		case "gl_no" :
			if(sheetObj.GetCellValue(Row, "gl_no") != ""){
				var gl_no  = sheetObj.GetCellValue(Row, "gl_no");
				var jnr_tp = JNR_TYPE;

				SELECTROW = Row;
				ajaxSendPost(getGlRmk, 'reqVal', '&goWhere=aj&bcKey=getGlRmk&s_gl_no='+gl_no+'&jnr_tp='+jnr_tp, './GateServlet.gsl');
			}else{
				sheetObj.SetCellValue(Row, "gl_rmk","");
			}
		break;
		case "buy_inv_no" :
			if(sheetObj.GetCellValue(Row, "inv_seq") == ""){
				sheetObj.SetCellValue(Row, "inv_no",sheetObj.GetCellValue(Row, "buy_inv_no"));
			}
		break;
		
		case "inv_xcrt_dt" :
			// #791 - [Patent] #4 Payment / Deposit Exchange Rate 반영
			if(formObj.f_curr_cd.value != sheetObj.GetCellValue(Row, "inv_aply_curr_cd")){
				if(bank_multi_curr_flag == "Y"){
					var param = '';
					param += '&cur_dt=' + sheetObj.GetCellValue(Row, 'inv_xcrt_dt');
					param += '&trf_cur_cd=' + sheetObj.GetCellValue(Row, "inv_aply_curr_cd");
					param += '&ofccurr_cd=' + formObj.f_curr_cd.value;
					
					//#1617 [CLT] Depsosit/Payment Entry - Ex.Rate Date 정의 기준변경  getCurrency > getCurrencyFinc 변경  -->
					ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrencyFinc' + param, './GateServlet.gsl');
					
					if(getXcrtRate == 0){
						getXcrtRate = 1;
					}
					
					sheetObj.SetCellValue(Row, "inv_aply_xcrt", getXcrtRate);
				}
			}
		break;
	}
	/*
	//TOTAL 값을 계산한다.
	var inv_amt=0;
	var bal_amt=0;
	var pay_amt=0;
	for(var i=1;i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "chk_flag") == "1"){
			inv_amt += Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
			bal_amt += Number(sheetObj.GetCellValue(i, "bal_sum_amt_1"));
			pay_amt += Number(sheetObj.GetCellValue(i, "pay_amt"));
		}
	}
	//formObj.f_inv_amt.value = doMoneyFmt(parseFloat(roundXL(inv_amt,2)).toFixed(2));
	//
	formObj.f_pay_amt.value=doMoneyFmt(parseFloat(roundXL(pay_amt,2)).toFixed(2));
	formObj.f_bal_amt.value=doMoneyFmt(parseFloat(roundXL(bal_amt,2)).toFixed(2));
	formObj.f_rcv_amt.value=doMoneyFmt(parseFloat(roundXL(inv_amt,2)).toFixed(2));
	*/
	setCheckTotalAmount();	
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else if(CODETYPE=="CUSTOMER2"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else if(CODETYPE=="SAVE_CUSTOMER"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else if(CODETYPE=="SAVE_CUSTOMER2"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else if(CODETYPE=="CUSTOMER2"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else if(CODETYPE=="SAVE_CUSTOMER"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else if(CODETYPE=="SAVE_CUSTOMER2"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		if(str == "CUSTOMER"){
			formObj.s_cust_cd.value="";//trdp_cd  AS param1
			formObj.s_cust_nm.value="";//eng_nm   AS param2
			
			setRmkAcctPayOrd("");
			
		}else if(str == "CUSTOMER2"){
			formObj.s_paid_cd.value="";//trdp_cd  AS param1
			formObj.s_paid_nm.value="";//eng_nm   AS param2
		}
	}
}
/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value=masterVals[0];		//trdp_cd  AS param1
				
				//#3488 Accounting Multi Language 적용 
				if ( MULTI_LANGUAGE == "Y" ){
					formObj.s_cust_nm.value=masterVals[16];		//locl_nm   AS param2					
				}else{
					formObj.s_cust_nm.value=masterVals[3];		//eng_nm   AS param2					
				}
				//#4347 [IMPEX] DEPOSIT AND PAYMENT CUSTOMER/VENDOR UPDATE(if 주석처리)
				//if(formObj.s_paid_cd.value == ""){
					formObj.s_paid_cd.value=masterVals[0];
					
					//#3488 Accounting Multi Language 적용 
					if ( MULTI_LANGUAGE == "Y" ){
						formObj.s_paid_nm.value=masterVals[16];
					}else{
						formObj.s_paid_nm.value=masterVals[3];	
					}
				//}
				
				setRmkAcctPayOrd(masterVals[25]); //reserve_field09(Acct Name For Pay to the Order of) As param24 
				
			}else if(CODETYPE =="CUSTOMER2"){
				formObj.s_paid_cd.value=masterVals[0];
			
				//#3488 Accounting Multi Language 적용 
				if ( MULTI_LANGUAGE == "Y" ){
					formObj.s_paid_nm.value=masterVals[16];	//locl_nm				
				}else{
					formObj.s_paid_nm.value=masterVals[3];	//eng_nm				
				}
				
			}else if(CODETYPE =="SAVE_CUSTOMER"){
				formObj.s_cust_cd.value=masterVals[0];	
	
				//#3488 Accounting Multi Language 적용 
				if ( MULTI_LANGUAGE == "Y" ){
					formObj.s_cust_nm.value=masterVals[16]; //locl_nm
				}else{
					formObj.s_cust_nm.value=masterVals[3];	//eng_nm				
				}
				
			}else if(CODETYPE =="SAVE_CUSTOMER2"){
				formObj.s_paid_cd.value=masterVals[0];
				
				//#3488 Accounting Multi Language 적용 
				if ( MULTI_LANGUAGE == "Y" ){
					formObj.s_paid_nm.value=masterVals[16]; //locl_nm
				}else{
					formObj.s_paid_nm.value=masterVals[3];	//eng_nm				
				}
				
			}else if(CODETYPE =="ACCT_PAY_ORD"){
				setRmkAcctPayOrd(masterVals[25]);
			}
		}else{
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value="";//trdp_cd  AS param1
				formObj.s_cust_nm.value="";//eng_nm   AS param2
				formObj.s_paid_cd.value="";
				formObj.s_paid_nm.value="";
				
				setRmkAcctPayOrd("");
				
			}else if(CODETYPE =="CUSTOMER2"){
				formObj.s_paid_cd.value="";
				formObj.s_paid_nm.value="";
			}else if(CODETYPE =="SAVE_CUSTOMER"){
				formObj.s_cust_cd.value="";
				formObj.s_cust_nm.value="";		
			}else if(CODETYPE =="SAVE_CUSTOMER2"){
				formObj.s_paid_cd.value="";
				formObj.s_paid_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//화면 클리어
function clearAll(){
	
	//#1095 [8][Payment Entry] Not display calendar icon when click New button
	doShowProcess();
	var currLocUrl=this.location.href;
	currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
	currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
	window.location.href = currLocUrl;
	
//	var formObj=document.frm1;
//	var sheetObj=docObjects[0];
//	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
//	for(var i=0; i<collTxt.length; i++){
//	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
//		  if(collTxt[i].name != "f_cnt"){
//			  collTxt[i].value="";
//		  }
//	  }           
//	}
//	
//	formObj.f_remark.value = "";
//	
//	/****************  Search Condition Control ************************/ 	
//	setSearchCondition("CLEARALL");
//	/*******************************************************************/
//	/****************  Check Information  ************************/ 	
//	formObj.s_paid_cd.className="search_form";
//	formObj.s_paid_cd.readOnly=false;
//	formObj.s_paid_cd.disabled=false;
//	formObj.customer.onclick=function(){doWork("CUSTOMER_POPLIST2");};
//	formObj.customer.style.cursor="hand";
//	formObj.s_paid_nm.className="search_form";
//	formObj.s_paid_nm.readOnly=false;
//	formObj.s_paid_nm.disabled=false;
//	formObj.f_post_dt.disabled=false;
//	formObj.f_post_dt.className="search_form";
//	formObj.f_post_dt_cal.style.display="inline";
//	formObj.f_bank_cd.disabled=false;
//	formObj.f_chk_no.className="search_form";
//	formObj.f_chk_no.readOnly=false;
//	formObj.f_chk_no.disabled=false;
//	if(JNR_LEVEL != "1"){
//		formObj.block_chk.disabled=false;
//	}
//	formObj.f_remark.disabled=false;
//	formObj.f_remark.readOnly=false;
//	/*************************************************************/	
//	setSelection();
//	frm1.f_post_dt.value=TODAY;
//	formObj.deposit_chk.checked=false;
//	formObj.void_chk.checked=false;
//	formObj.s_jnr_no.value="";
////	saveBtn1.style.display   = "inline";
//	getBtnObj('btnModify').style.display="inline";
//	getBtnObj('btnSaveX').style.display="inline";
////	addBtn01.style.display   = "inline";
//	getObj('addBtn02').style.display   = "inline";
////	invBtn01.style.display   = "inline";
//	getObj('invBtn02').style.display   = "inline";
////	copyBtn01.style.display="none";
////	copyBtn02.style.display="none";
////	getBtnObj('btnPrint').style.display = "none";
////	getBtnObj('btnRiderPrint').style.display = "none";
////	getBtnObj('btnCopy').style.display="none";
//	//void를 비활성화 한다.
//	formObj.void_chk.disabled=true;
//	formObj.f_void_dt.disabled=true;
//	//#1095 [8][Payment Entry] Not display calendar icon when click New button
//	//formObj.f_void_dt_cal.style.display="none";
//	formObj.f_void_dt_cal.disabled = true;	
//	
//	if(bank_multi_curr_flag == "Y"){
//		formObj.f_rcv_amt.readOnly = false;
//		formObj.f_rcv_amt.className = "search_form zero_remove";
//	} else {
//		formObj.f_rcv_amt.readOnly = true;
//		formObj.f_rcv_amt.className = "search_form-disable";
//	}
//	
//	sheetObj.RemoveAll();
//	
//	//total Amount 처리
//	setTotalAmount();
//	
//	//LHK 20131112, #21734  [BINEX]Post Date Check 로직 적용
//	setBlock_dt();
//
//	//#1270 [BNX][JAPAN]ACCOUNT관련 수정 요청
//	formObj.block_chk.checked=true;
//	formObj.office_block_chk.checked=true;
//
//	//#1270 [BNX][JAPAN]ACCOUNT관련 수정 요청
//	setDepositVoid();
}
/* Search Condition Control */
function setSearchCondition(stsVal){
	var formObj=document.frm1;
	if(stsVal == "CLEARALL"){
		formObj.s_cust_cd.className="search_form";
		formObj.s_cust_cd.readOnly=false;
		formObj.s_cust_cd.disabled=false;
		formObj.customer1.onclick=function(){doWork("CUSTOMER_POPLIST");};
		formObj.customer1.style.cursor="hand";
		formObj.imgInvget.onclick	 = function(){searchInvList('INVGET');};
		formObj.imgInvget.style.cursor 	= "hand";
		formObj.s_cust_nm.className="search_form";
		formObj.s_cust_nm.readOnly=false;
		formObj.s_cust_nm.disabled=false;
		formObj.s_inv_no.className="search_form";
		formObj.s_inv_no.readOnly=false;
		formObj.s_inv_no.disabled=false;
		formObj.dept_chk1.disabled=false;
		formObj.dept_chk2.disabled=false;
		formObj.dept_chk3.disabled=false;
		formObj.his_chk[0].disabled=false;
		formObj.his_chk[1].disabled=false;
		formObj.dept_chk1.checked=true;
		formObj.dept_chk2.checked=true;
		formObj.dept_chk3.checked=true;
		formObj.his_chk[1].checked=true;
		getObj('rtrvBtn01').style.display="inline";
		if(JNR_TYPE == "D"){	
			getObj('searchInfo').style.width="320";
		}
		if(JNR_TYPE == "P"){	
			getObj('searchInfo').style.width="350";
		}
	}else{	//searchEnd, saveEnd 시
		if(formObj.f_jnr_no.value != ""){
			formObj.s_cust_cd.className="search_form-disable";
			formObj.s_cust_cd.readOnly=true;
			formObj.s_cust_cd.disabled=true;
			formObj.customer1.onclick="";
			formObj.customer1.style.cursor="";
			formObj.imgInvget.onclick	 = "";
			formObj.imgInvget.style.cursor 	= "";
			formObj.s_cust_nm.className="search_form-disable";
			formObj.s_cust_nm.readOnly=true;
			formObj.s_cust_nm.disabled=true;
			formObj.s_inv_no.className="search_form-disable";
			formObj.s_inv_no.readOnly=true;
			formObj.s_inv_no.disabled=true;
			formObj.dept_chk1.disabled=true;
			formObj.dept_chk2.disabled=true;
			formObj.dept_chk3.disabled=true;
			formObj.his_chk[0].disabled=true;
			formObj.his_chk[1].disabled=true;
			getObj('rtrvBtn01').style.display="none";
			getObj('searchInfo').style.width="100%";
	 	}
	}
}
function clearInput(){
	var formObj=document.frm1;
	//setSelection();
	//searchSelection();
	//formObj.f_post_dt.value=TODAY;
	
	//LHK 20131112, #21734  [BINEX]Post Date Check 로직 적용
	setBlock_dt();
	
	formObj.f_chk_no.value="";
	formObj.deposit_chk.checked=false;
	formObj.f_deposit_dt.value="";
	formObj.void_chk.checked=false;
	formObj.f_void_dt.value="";
	formObj.f_jnr_no.value="";
	
	//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	formObj.f_locl_rcv_amt.value ="";		
}
function Copy(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	formObj.f_inv_seq.value="";
	formObj.f_inv_no.value="";
	formObj.f_print_type.value="";
	formObj.f_jnr_no.value="";
	formObj.s_jnr_no.value="";
	formObj.t_jnr_no.value="";
	formObj.old_void_chk.value="";
	formObj.deposit_chk.checked=false;
	formObj.f_deposit_dt.value="";
	formObj.void_chk.checked=false;
	formObj.f_void_dt.value="";
	formObj.f_chk_no.value="";
	formObj.f_post_dt.value=TODAY;
//	saveBtn1.style.display   = "inline";
//	saveBtn2.style.display   = "inline";
	getBtnObj('btnModify').style.display="inline";
	getBtnObj('btnSaveX').style.display="inline";
//	addBtn01.style.display   = "inline";
	getObj('addBtn02').style.display   = "inline";
//	invBtn01.style.display   = "none";
	getObj('invBtn02').style.display   = "none";
	
	formObj.s_paid_cd.readOnly = false;
	formObj.s_paid_cd.disabled = false;
	formObj.s_paid_cd.className="search_form";
	
	formObj.s_paid_nm.readOnly = false;
	formObj.s_paid_nm.disabled = false;
	formObj.s_paid_nm.className="search_form";
	
	formObj.f_chk_no.readOnly = false;
	formObj.f_chk_no.disabled = false;
	formObj.f_chk_no.className="search_form";
	
	//#6734 [Zencon] POST DATE CHANGE BLOCK ROLE OPTION (Zen#3023)
	if(formObj.pst_dt_flg.value=="Y")
	{
	formObj.f_post_dt.disabled=true;
	formObj.f_post_dt.className="search_form-disable";
	formObj.f_post_dt_cal.style.display="none";
	}
	else 
	{
	formObj.f_post_dt.readOnly = false;
	formObj.f_post_dt.disabled = false;
	formObj.f_post_dt.className="search_form";
	}
	
	//#1155 [CARGOZONE] Deposit and Payment Copy from List screens
	formObj.s_cust_cd.className="search_form";
	formObj.s_cust_cd.readOnly=false;
	formObj.s_cust_cd.disabled=false;
	formObj.customer1.onclick=function(){doWork("CUSTOMER_POPLIST");};
	formObj.customer1.style.cursor="hand";
	formObj.imgInvget.onclick	 = function(){searchInvList('INVGET');};
	formObj.imgInvget.style.cursor 	= "hand";
	formObj.s_cust_nm.className="search_form";
	formObj.s_cust_nm.readOnly=false;
	formObj.s_cust_nm.disabled=false;
	formObj.s_inv_no.className="search_form";
	formObj.s_inv_no.readOnly=false;
	formObj.s_inv_no.disabled=false;	
	formObj.f_chk_no.value=""; 
	getObj('rtrvBtn01').style.display="block";	
	
	
	
	if(bank_multi_curr_flag == "Y"){
		formObj.f_rcv_amt.readOnly = false;
		formObj.f_rcv_amt.className = "search_form zero_remove";
	} else {
		formObj.f_rcv_amt.readOnly = true;
		formObj.f_rcv_amt.className = "search_form-disable";
	}
	
	if(formObj.codp_flg.value == "Y"){
		formObj.f_ofc_cd.disabled = false;
	} else {
		formObj.f_ofc_cd.disabled = true;
	}
	
	formObj.f_ofc_cd.value = UserOfcCd;
	
	for(var i=sheetObj.LastRow(); i>0; i--){
		if(sheetObj.GetCellValue(i, "inv_seq") != ""){
			sheetObj.RowDelete(i, false);
		}
		sheetObj.SetCellValue(i, "ibflag","I");
		// 데이터의 글자색을 바꾼다.
		sheetObj.SetRowFontColor(i,"#000000");
		/*
		sheetObj.SetColBackColor("del_chk","#FFFFFF");
		sheetObj.SetColBackColor("ofc_cd","#FFFFFF");
		sheetObj.SetColBackColor("inv_aply_curr_cd","#FFFFFF");
		sheetObj.SetColBackColor("inv_aply_xcrt","#FFFFFF");
		sheetObj.SetColBackColor("buy_inv_no","#FFFFFF");
		sheetObj.SetColBackColor("pay_amt","#FFFFFF");
		sheetObj.SetColBackColor("chk_flag","#FFFFFF");
		sheetObj.SetColBackColor("gl_no","#FFFFFF");
		sheetObj.SetColBackColor("gl_rmk","#FFFFFF");
		sheetObj.SetColBackColor("ref_no","#FFFFFF");
		sheetObj.SetColBackColor("bl_no","#FFFFFF");
		sheetObj.SetColBackColor("jnr_desc","#FFFFFF");
		*/
		sheetObj.SetCellBackColor(i,"del_chk","#FFFFFF");
		sheetObj.SetCellBackColor(i,"ofc_cd","#FFFFFF");
		sheetObj.SetCellBackColor(i,"inv_aply_curr_cd","#FFFFFF");
		sheetObj.SetCellBackColor(i,"inv_aply_xcrt","#FFFFFF");
		sheetObj.SetCellBackColor(i,"buy_inv_no","#FFFFFF");
		sheetObj.SetCellBackColor(i,"pay_amt","#FFFFFF");
		sheetObj.SetCellBackColor(i,"chk_flag","#FFFFFF");
		sheetObj.SetCellBackColor(i,"gl_no","#FFFFFF");
		sheetObj.SetCellBackColor(i,"gl_rmk","#FFFFFF");
		sheetObj.SetCellBackColor(i,"ref_no","#FFFFFF");
		sheetObj.SetCellBackColor(i,"bl_no","#FFFFFF");
		sheetObj.SetCellBackColor(i,"jnr_desc","#FFFFFF");
		
		sheetObj.SetRowEditable(i,1);
		sheetObj.SetCellEditable(i, "del_chk",1);
		sheetObj.SetCellEditable(i, "inv_post_dt",0);
        sheetObj.SetCellEditable(i, "ofc_cd",1);
        sheetObj.SetCellEditable(i, "inv_aply_curr_cd",0);
        sheetObj.SetCellEditable(i, "inv_aply_xcrt",1);
        sheetObj.SetCellEditable(i, "buy_inv_no",1);
        sheetObj.SetCellEditable(i, "pay_amt",1);
        sheetObj.SetCellEditable(i, "chk_flag",1);
        sheetObj.SetCellEditable(i, "gl_no",1);
        sheetObj.SetCellEditable(i, "gl_rmk",1);
        sheetObj.SetCellEditable(i, "ref_no",1);
        sheetObj.SetCellEditable(i, "bl_no",1);
        sheetObj.SetCellEditable(i, "jnr_desc",1);
        sheetObj.SetCellEditable(i, "clr_flag",0);
        // 그리드의 POST DATE를 JOURNAL의 POST DATE로 변경한다.
        sheetObj.SetCellValue(i, "inv_post_dt",formObj.f_post_dt.value);
        sheetObj.SetCellValue(i, "clt_cmpl_flg", "");
        sheetObj.SetCellValue(i, "jnr_yn", "");
        sheetObj.SetCellValue(i, "cls_yn", "");
	}
	//total Amount 처리
	setTotalAmount();
	/* #27585 [BINEX]Check/Deposit 수정 사항 : Journal 상태에 따른, form, sheet 제어  */
	jnrStatusControl();
	//LHK 20131112, #21734  [BINEX]Post Date Check 로직 적용
	setBlock_dt();
	
	//#1270 [BNX][JAPAN]ACCOUNT관련 수정 요청
	setDepositVoid();
	
	//#5544 [ZIMEX] Customer Payment & Payment Entry
	//setCheckTotalAmount();
}
/********************************************************************************************************************************/
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출  
	    	var cal=new ComCalendar();
	        cal.select(formObj.f_deposit_dt, 'MM-dd-yyyy');
	        break;
	    case 'DATE2':    //달력 조회 팝업 호출      
	    	var cal=new ComCalendar();
	        cal.select(formObj.f_void_dt, 'MM-dd-yyyy');
	        break;
	    case 'DATE3':    //달력 조회 팝업 호출      
	    	var cal=new ComCalendar();
	        cal.select(formObj.f_post_dt, 'MM-dd-yyyy');
	        break;
    }
}
function searchGlBankInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			sheetObj.SetCellValue(SELECTROW, "gl_no",rtnArr[2]);
			sheetObj.SetCellValue(SELECTROW, "gl_rmk",rtnArr[3]);
		}else{
			sheetObj.SetCellValue(SELECTROW, "gl_no","");
			sheetObj.SetCellValue(SELECTROW, "gl_rmk","");
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * GL_CD 관린 코드조회
 */
function getGlRmk(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');

			sheetObj.SetCellValue(SELECTROW, "gl_no",rtnArr[0]);
			sheetObj.SetCellValue(SELECTROW, "gl_rmk",rtnArr[1]);
		}else{
			sheetObj.SetCellValue(SELECTROW, "gl_no","");
			sheetObj.SetCellValue(SELECTROW, "gl_rmk","");
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function setBankCurChkNo(){
	var formObj=document.frm1;
	formObj.f_cur_chk_no.value="";
	ajaxSendPost(getBankCurChkNo, 'reqVal', '&goWhere=aj&bcKey=searchBankCurChkNo&bank_seq='+formObj.f_bank_cd.value, './GateServlet.gsl');
    formObj.f_chk_no.value=formObj.f_cur_chk_no.value;
}
function setVoidDate(){
	var formObj=document.frm1;
	if(formObj.void_chk.checked){
		if(formObj.f_void_dt.value == ""){
			//formObj.f_void_dt.value = TODAY;
			//LHK 20131112, File Block_dt 와 Post Date, Today 체크, MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT), Today 중 가장 최근 Date을 Set
			var post_dt=formObj.f_post_dt.value;
			var f_void_dt="";
			if(NEXT_BLOCK_DT != ""){
				if(compareTwoDate(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
					f_void_dt=NEXT_BLOCK_DT;
				}else{
					f_void_dt=post_dt;
				}
				if(compareTwoDate(TODAY, f_void_dt)){						//TODAY 비교, fromDate > toDate true
					f_void_dt=TODAY;
				}
			}else{
				if(compareTwoDate(TODAY, post_dt)){						//TODAY 비교, fromDate > toDate true
					f_void_dt=TODAY;
				}else{
					f_void_dt=post_dt;
				}
			}
			formObj.f_void_dt.value=f_void_dt;
		}	
	}else{
		formObj.f_void_dt.value="";
	}
}
function setDepositDate(){
	var formObj=document.frm1;
	if(formObj.deposit_chk.checked){
		if(formObj.f_deposit_dt.value == ""){
			
			if(useClearVoid == "N"){
				// #1115 - [BNX] Deposit/Payment 자동 Clear시 Clear Date를 Post Date로 지정
				formObj.f_deposit_dt.value = formObj.f_post_dt.value;
			} else {
				/*
				// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
				var today="";
				var slip_post=formObj.slip_post.value;
				if(slip_post != ""){
					today=TODAY.replaceAll("-","");
					today=today.substring(4,8)+today.substring(0,2)+today.substring(2,4);
					slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
					if(slip_post >= today){
						formObj.f_deposit_dt.value=SLIP_POST_DT;
					}else{
						formObj.f_deposit_dt.value=TODAY;
					}
				}else{
					formObj.f_deposit_dt.value=TODAY;
				}
				*/
				//LHK 20131112, File Block_dt 와 Post Date, Today 체크, MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT), Today 중 가장 최근 Date을 Set
				var post_dt=formObj.f_post_dt.value;
				var f_deposit_dt="";
				if(NEXT_BLOCK_DT != ""){
					if(compareTwoDate(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
						f_deposit_dt=NEXT_BLOCK_DT;
					}else{
						f_deposit_dt=post_dt;
					}
					/* 정원영 수정 #25248
					*/
					if(compareTwoDate(TODAY, f_deposit_dt)){						//TODAY 비교, fromDate > toDate true
						f_deposit_dt=TODAY;
					}
				}else{
					/* 정원영 수정 #25248
					*/
					if(compareTwoDate(TODAY, post_dt)){						//TODAY 비교, fromDate > toDate true
						f_deposit_dt=TODAY;
					}else{
						f_deposit_dt=post_dt;
					}
				}
				formObj.f_deposit_dt.value=f_deposit_dt;
			}
		}
	}else{
		formObj.f_deposit_dt.value="";
	}
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if(event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}else if(type == "CUSTOMER_NAME"){
			doWork("CUSTOMER_NAME");
		}else if(type == "CUSTOMER2_NAME"){
			doWork("CUSTOMER2_NAME");
		}
		
	}
}
//그리드 전체를 삭제하면 INVOICE 를 삭제한다.
function checkDelete(){
	var sheetObj=docObjects[0];
	var returnFlag=true;
	for(var i=1; i<=sheetObj.LastRow(); i++){
		if(sheetObj.GetCellValue(i,"del_chk") == "1" && sheetObj.GetCellValue(i,"jnr_no") != ""){
		    sheetObj.SetCellValue(i, "ibflag","D");
	    }
    }
	// 조회한 row가 0이 아니고 delCnt가 시트의 row 갯수와 같을때 
	if(sheetObj.RowCount()> 0 && sheetObj.CheckedRows("del_chk") == sheetObj.RowCount()){
		returnFlag=false;
	}
	return returnFlag;
}
//POST DATE 변경시 INV_SEQ 가 없는 ROW의 POST_DATE 를 변경한다.
function setPostDt(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "inv_seq") == ""){
			sheetObj.SetCellText(i, "inv_post_dt",formObj.f_post_dt.value);
		} else {
			sheetObj.SetCellValue(i, "inv_xcrt_dt",formObj.f_post_dt.value);
		}
	}
}
//Deposit Date를 입력하면 Deposit Check를 한다.
function checkDeposit(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(formObj.f_deposit_dt.value != ""){
		var temp_dt="";
		var temp_val="";
		var f_deposit_dt=formObj.f_deposit_dt.value;
		var post_dt=formObj.f_post_dt.value;
		//LHK 20131112, File Block_dt 와 Post Date, MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
		if(NEXT_BLOCK_DT != ""){
			if(compareTwoDate(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
				temp_dt=NEXT_BLOCK_DT;
			    temp_val='B';
			}else{
				temp_dt=post_dt;
				temp_val='P';
			}
		}else{
			temp_dt=post_dt;
			temp_val='P';
		}
		if(compareTwoDate(temp_dt, f_deposit_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			formObj.f_deposit_dt.value='';
			if(temp_val == 'B'){
				alert(getLabel2('ACC_MSG131',new Array(ORG_BLOCK_DT))); //The Void Date must be later than the block date (@)
			}else if(temp_val == 'P'){
				alert(getLabel2('ACC_MSG127',new Array(temp_dt))); //The Void Date must be later than or equal the Post date.
			}else if(temp_val == 'T'){
				alert(getLabel2('ACC_MSG132',new Array(temp_dt))); //The Void Date must be later than or equal the today
			}
		}
	}
	if(formObj.f_deposit_dt.value == ""){
		formObj.deposit_chk.checked=false;
	}else{
		formObj.deposit_chk.checked=true;
	}
	depositClick();
	return;
}
//Void Date를 입력하면 Void Check를 한다.
function checkVoid(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var temp_dt="";
	var temp_val="";
	var old_void_dt=formObj.old_void_dt.value;
	var f_void_dt=formObj.f_void_dt.value;
	var f_post_dt=formObj.f_post_dt.value;
	var f_deposit_dt=formObj.f_deposit_dt.value;
	if(old_void_dt != f_void_dt && f_void_dt != ""){
		temp_dt=f_post_dt;
		temp_val='P';
		//LHK 20131112, File Block_dt 와 Post Date, MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
		if(NEXT_BLOCK_DT != ""){
			if(compareTwoDate(NEXT_BLOCK_DT, f_post_dt)){						//f_post_dt 와 block_dt 비교, fromDate > toDate true
				temp_dt=NEXT_BLOCK_DT;
			    temp_val='B';
			}
			if(f_deposit_dt != ""){
				if(compareTwoDate(f_deposit_dt, temp_dt)){						//f_deposit_dt 비교, fromDate > toDate true
					temp_dt=f_deposit_dt;
				    temp_val='C';
				}
			}
		}else{
			if(f_deposit_dt != ""){
				if(compareTwoDate(f_deposit_dt, f_post_dt)){						//f_deposit_dt 비교, fromDate > toDate true
					temp_dt=f_deposit_dt;
				    temp_val='C';
				}
			}			
		}
		if(compareTwoDate(temp_dt, f_void_dt)){						//f_void_dt, post_dt, block, today 와 비교, fromDate > toDate true
		    formObj.f_void_dt.value=old_void_dt;
			if(temp_val == 'B'){
				alert(getLabel2('ACC_MSG129',new Array(ORG_BLOCK_DT))); //The Void Date must be later than the block date (@)
			}else if(temp_val == 'P'){
				alert(getLabel2('ACC_MSG126',new Array(temp_dt))); //The Void Date must be later than or equal the Post date.
			}else if(temp_val == 'C'){
				alert(getLabel2('ACC_MSG136',new Array("Deposit Date"))); //The Void Date must be later than or equal the @. [Deposit Date (01-01-2014)].
			}
		}
	}
	if(formObj.f_void_dt.value == ""){
		formObj.void_chk.checked=false;
    }else{
    	formObj.void_chk.checked=true;
    }
	voidClick();
	return;
}
//날짜더하기
function addDay(ymd, v_day){
	 ymd=ymd.replaceAll("-","");
	 var yyyy=ymd.substr(4,4);
	 var mm=eval(ymd.substr(0,2) + "- 1") ;
	 var dd=ymd.substr(2,2);
	 var dt3=new Date(yyyy, mm, eval(dd + '+' + v_day));
	 yyyy=dt3.getFullYear();
	 mm=(dt3.getMonth()+1)<10? "0" + (dt3.getMonth()+1) : (dt3.getMonth()+1) ;
	 dd=dt3.getDate()<10 ? "0" + dt3.getDate() : dt3.getDate();
	 return  mm + "-" + dd + "-" + yyyy ;
}
function checkPostDate(){
	var formObj=document.frm1;
	var post_dt=formObj.f_post_dt.value;
	if(post_dt == ""){
		alert(getLabel('ACC_MSG125'));
		formObj.f_post_dt.value=formObj.old_post_dt.value;
		formObj.f_post_dt.select();
		return;
	}
	//OnChange 시에 check 함
	if(post_dt == formObj.old_post_dt.value){
		return;
	}
	//Post Date 가 변경되는 경우에 NEXT_BLOCK_DT 보다 작으면 warnning massage 띄워줌
	if(NEXT_BLOCK_DT != "") {
		if(compareTwoDate(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			alert(getLabel2('ACC_MSG119',new Array(ORG_BLOCK_DT)));	//The Post Date must be later than the block date (@)";
			formObj.f_post_dt.value=formObj.old_post_dt.value;
			formObj.f_post_dt.select();
			return;
		}
	}
	if(formObj.f_deposit_dt.value != ""){
		if(compareTwoDate(formObj.f_post_dt.value, formObj.f_deposit_dt.value)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			alert(getLabel('ACC_MSG127'));	//The Deposit Date must be later than the block date (@)";
			formObj.f_post_dt.value=formObj.old_post_dt.value;
			formObj.f_deposit_dt.select();
			return;
		}
	}
	if(formObj.f_void_dt.value != ""){
		if(compareTwoDate(formObj.f_post_dt.value, formObj.f_void_dt.value)){						//f_void_dt, post_dt 와 비교, fromDate > toDate true
			alert(getLabel('ACC_MSG126'));	//The Void Date must be later than or equal the Post date";
			formObj.f_post_dt.value=formObj.old_post_dt.value;
			formObj.f_void_dt.select();
			return;
		}
	}
	
	//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	fn_setExRate();		
}
function getBankChkForm(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			formObj.f_chk_form.value=doc[1];
		}else{
			formObj.f_chk_form.value="";
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function getBankCurChkNo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var arrChkNo=doc[1].split("@");
			formObj.f_cur_chk_no.value=arrChkNo[0];
			formObj.f_lst_chk_no.value=arrChkNo[1];
		}else{
			formObj.f_cur_chk_no.value="";
			formObj.f_lst_chk_no.value="";
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function getInvModiTms(reqVal){
	vInvModiTms='';
	var doc=getAjaxMsgXML(reqVal);
	// alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			vInvModiTms=doc[1];
		}
	}
}

function getJnrModiTms(reqVal){
	vJnrModiTms='';
	var doc=getAjaxMsgXML(reqVal);
	// alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			vJnrModiTms=doc[1];
		}
	}
}

function getDupCheckNo(reqVal){
	vDupCheckNo='';
	var doc=getAjaxMsgXML(reqVal);
//	alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			vDupCheckNo=doc[1];
		}
	}
}
function chkNoChg() {
	depositProc();
}
/* #24673 LHK, 20131223, Deposit Check 시에 Void 할 수 없슴. */
function depositClick() {
	/** LHK, 20140116, #25248 Customer Payment/Payment Entry 화면 수정사항-1 4.Void 권한 제어 **/
	voidProc();
}
/* #24673 LHK, 20131223, Void Check 시에 Deposit 할 수 없슴. */
function voidClick() {
	depositProc();
}
function chageBankCurrCd(obj) {
	var formObj=document.frm1;	
	var sheetObj = docObjects[0];
	var tmpBankAry=BK_CURR_CD.split("|");
	var curr_cd="";
	if(obj.value == ""){
		return;
	}
	for(var i=0; i<tmpBankAry.length; i++){
		var tmpBank=tmpBankAry[i].split("-");
		if(tmpBank[0] == obj.value){
			curr_cd=tmpBank[1];
			break;
		}
	}
	//변경한 Bank Currency 가 기존 Currency 와 동일한 경우에만 변경가능 
	if(formObj.f_jnr_no.value != ""){
		if(formObj.f_curr_cd.value != curr_cd){
			formObj.f_bank_cd.value="";
			alert(getLabel('ACC_MSG139'));	//Please check the Bank Currency;";
			return;
		}
	}else{
		formObj.f_curr_cd.value=curr_cd;
		//#39209 LHK, 20140716 하단 그리드 중 변경된 bank 의 currency 와 인보이스의 currency 가 다른 경우
		for(var i=1;i<=sheetObj.LastRow();i++){

			if(formObj.f_curr_cd.value != sheetObj.GetCellValue(i, "inv_aply_curr_cd")){
				
				//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
				if(GL_VIEW_FALG=="Y"){
					sheetObj.SetCellValue(i, "chk_flag", "0");
				}	
				
				// inp_type 이 M인 경우 변경된 Currency 로, 아닌 경우 CHK 컬럼을 Uncheck 하고 Balance Amount, Payment 금액 초기화
				if (sheetObj.GetCellValue(i,"inp_type") == "M" ) {
					sheetObj.SetCellValue(i, "inv_aply_curr_cd", curr_cd) ;
				}else{
					if(bank_multi_curr_flag == "Y"){
						var param = '';
						param += '&cur_dt=' + sheetObj.GetCellValue(i, 'inv_xcrt_dt');
						param += '&trf_cur_cd=' + sheetObj.GetCellValue(i, "inv_aply_curr_cd");
						param += '&ofccurr_cd=' + formObj.f_curr_cd.value;
						
						//#1617 [CLT] Depsosit/Payment Entry - Ex.Rate Date 정의 기준변경  getCurrency > getCurrencyFinc 변경  -->
						ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrencyFinc' + param, './GateServlet.gsl');
						
						if(getXcrtRate == 0){
							getXcrtRate = 1;
						}
						
						sheetObj.SetCellValue(i, "inv_aply_xcrt", getXcrtRate);
						
					} else {
						sheetObj.SetCellEditable(i, "pay_amt",0);
						sheetObj.SetCellBackColor(i, "pay_amt","#EFEBEF");
						sheetObj.SetCellEditable(i, "chk_flag",0);
						sheetObj.SetCellBackColor(i, "chk_flag","#EFEBEF");
						sheetObj.SetCellValue(i, "chk_flag", "0");
					}
				}
			}else{
				// #6209 [Yicheng] Payment amount discrecpancy
				//if(bank_multi_curr_flag == "Y"){
					sheetObj.SetCellValue(i, "inv_aply_xcrt", 1);
				//}
					
				sheetObj.SetCellEditable(i, "pay_amt",1);
				sheetObj.SetCellBackColor(i, "pay_amt","#FFFFFF");
				sheetObj.SetCellEditable(i, "chk_flag",1);
				sheetObj.SetCellBackColor(i, "chk_flag","#FFFFFF");
			}
		}
	}
	
	//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	fn_setExRate();		
}
function goBL(bnd_clss_cd, biz_clss_cd, intg_bl_seq,  air_sea_clss_cd, bl_no, ref_no){
    if(air_sea_clss_cd=='S'){
        if(biz_clss_cd=='H'){
        	if(bnd_clss_cd=='O'){
				var paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
			    parent.mkNewFrame('Booking & HB/L Entry', paramStr);
            }else{
            	var paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
			    parent.mkNewFrame('HB/L Entry', paramStr);
            }
        }else{
        	if(bnd_clss_cd=='O'){
        		var paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+ref_no+"&f_intg_bl_seq="+intg_bl_seq;
			    parent.mkNewFrame('Master B/L Entry', paramStr);
            }else{
            	var paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+ref_no+"&f_intg_bl_seq="+intg_bl_seq;
			    parent.mkNewFrame('Master B/L Entry', paramStr);
            }
        }
    }else {
    	if(biz_clss_cd=='H'){
    		if(bnd_clss_cd=='O'){
				var paramStr="./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
				parent.mkNewFrame('Booking & HAWB Entry', paramStr);
            }else{
            	var paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
				parent.mkNewFrame('HAWB Entry', paramStr);
            }
        }else{
        	if(bnd_clss_cd=='O'){
        		var paramStr="./AIE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+ref_no+"&f_intg_bl_seq="+intg_bl_seq;
				parent.mkNewFrame('MAWB Entry', paramStr);
            }else{
            	var paramStr="./AII_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+ref_no+"&f_intg_bl_seq="+intg_bl_seq;
				parent.mkNewFrame('MAWB Entry', paramStr);
            }
        }
    }
}
/* #27436, LHK, 20140331 Code 정리 */
function depositProc(){
	var formObj=document.frm1;
	var depositFlag=false;	// false 비활성화, true 활성
	if (formObj.f_chk_no.value.length > 0) {
		// 정원영 수정 #25248
		if (formObj.deposit_chk.checked == false) {
			depositFlag=true;
		}else {
			depositFlag=false;
		}
	}
	if(formObj.void_chk.checked){
		formObj.deposit_chk.checked=false;
		formObj.f_deposit_dt_cal.value="";
		depositFlag=false;
	}
	if(depositFlag){
		formObj.deposit_chk.disabled=false;
		formObj.f_deposit_dt.disabled=false;
		formObj.f_deposit_dt.className="search_form";
		//#1095 [8][Payment Entry] Not display calendar icon when click New button
		//formObj.f_deposit_dt_cal.style.display="inline";
		formObj.f_deposit_dt_cal.disabled=false;
	}else{
		formObj.deposit_chk.checked=false;
		formObj.f_deposit_dt.value="";
		formObj.deposit_chk.disabled=true;
		formObj.f_deposit_dt.disabled=true;
		formObj.f_deposit_dt.className="search_form-disable";
		//#1095 [8][Payment Entry] Not display calendar icon when click New button
		//formObj.f_deposit_dt_cal.style.display="none";
		formObj.f_deposit_dt_cal.disabled=true;		
	}
}
/* #27436, LHK, 20140331,  Acct Operation Bug 사전 예방, Void Flow 추가 
* Payment/Deposit 처리 시 Void 된 자료는 다시 Void 를 풀지 못하고 Block 되도록 로직 수정
* Deposit/Payment 자료를 생성하시는 경우에는 Void 항목을 아예 check 할 수 없도록 수정
*/
function voidProc(){
	var formObj=document.frm1;
	var voidFlag=false;	// false 비활성화, true 활성
	/** LHK, 20140116, #25248 Customer Payment/Payment Entry 화면 수정사항-1 4.Void 권한 제어 **/
	if (formObj.vc_flg.value == "Y") {
		voidFlag=true;
		if(formObj.deposit_chk.checked){
			formObj.void_chk.checked=false;
			formObj.f_void_dt.value="";
			//void를 비활성화 한다.
			voidFlag=false;
		}
		if(formObj.f_jnr_no.value == ""){
			//void를 비활성화 한다.
			voidFlag=false;
		}
		if(voidFlag){
			formObj.void_chk.disabled=false;
			formObj.f_void_dt.disabled=false;
			formObj.f_void_dt.className="search_form";
			//#1095 [8][Payment Entry] Not display calendar icon when click New button
			//formObj.f_void_dt_cal.style.display="inline";
			formObj.f_void_dt_cal.disabled = false;			
		}else{
			formObj.void_chk.checked=false;
			formObj.f_void_dt.value="";
			formObj.void_chk.disabled=true;
			formObj.f_void_dt.disabled=true;
			formObj.f_void_dt.className="search_form-disable";
			//#1095 [8][Payment Entry] Not display calendar icon when click New button
			//formObj.f_void_dt_cal.style.display="none";
			formObj.f_void_dt_cal.disabled = true;			
		}
	}
}
/**
 * #27585 [BINEX]Check/Deposit 수정 사항
 * Journal 상태를 확인 한다. Journal 상태에 따른 form, sheet 제어를 한다. 
 * "" : N/A, S:Save, C:Clear, V:Void, 
 * B:Block(Block 인 경우, sheet 만 제어하며, 위 상태에 따라 처리된다.)
 * @return
 */
function jnrStatusControl(){
	var sts_cd=getJnrStsCd();
	changeEditable(sts_cd);	// #25248 : jnr_no 가 있는경우 non-editable
	authControl();		/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 */
}
function getJnrStsCd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sts_cd="";
	if(formObj.f_jnr_no.value != ""){
		sts_cd='S';
		if(JNR_TYPE == "P"){	// Payment 인 경우만 해당됨. 
			if(sheetObj.GetCellValue(1,"chk_pnt_yn") == "Y" || isPrinted){
				if(formObj.prn_flg.value == "Y"){
					sts_cd='S';
				}else{
					sts_cd='C';
				}
			}
		}
		if(sheetObj.GetCellValue(1, "r_clr_yn") == "Y"){
			sts_cd='C';
		}
		if(sheetObj.GetCellValue(1, "r_void_yn") == "Y"){
			sts_cd='V';
		}
	}
	return sts_cd;
}
function chkNoEditable(sts_cd){	
 	var formObj=document.frm1;
    //2016.04.18 C.W.Park Modified
	if(useClearVoid != "N"){
	 	if(sts_cd == "C" || sts_cd == "V"){
	 		formObj.f_chk_no.disabled=true;
	 		formObj.f_chk_no.className="search_form-disable";
	 	}else{
	 		formObj.f_chk_no.disabled=false;
	 		formObj.f_chk_no.className="search_form";
	 	}
	}
}
/*			
LHK, 20131218 QnA #22627 [BINEX]Deposit/Payment 시 이종 Currency 처리 문제
2) 인보이스 조회 시 인보이스의 Currency 가 Bank 의 Currency 와 다른 경우 Deposit/Payment 처리 안되도록 block 한다.
(Received, Payment 컬럼 disable, check box disable)
*/
function changeEditable(sts_cd){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	formObj.s_paid_cd.className="search_form";
	formObj.s_paid_cd.readOnly=false;
	formObj.s_paid_cd.disabled=false;
	formObj.customer.onclick=function(){doWork("CUSTOMER_POPLIST2");};
	formObj.customer.style.cursor="hand";
	formObj.s_paid_nm.className="search_form";
	formObj.s_paid_nm.readOnly=false;
	formObj.s_paid_nm.disabled=false;
	//#6734 [Zencon] POST DATE CHANGE BLOCK ROLE OPTION (Zen#3023)
	if(formObj.pst_dt_flg.value=="Y")
	{
	formObj.f_post_dt.disabled=true;
	formObj.f_post_dt.className="search_form-disable";
	formObj.f_post_dt_cal.style.display="none";
	}
	else 
	{
	formObj.f_post_dt.disabled=false;
	formObj.f_post_dt.className="search_form";
	formObj.f_post_dt_cal.style.display="inline";
	}
	formObj.f_bank_cd.disabled=false;
	//void를 비활성화 한다.
	formObj.void_chk.disabled=true;
	formObj.f_void_dt.disabled=true;
	formObj.f_void_dt.className="search_form-disable";
	//#1095 [8][Payment Entry] Not display calendar icon when click New button
	//formObj.f_void_dt_cal.style.display="none";
	formObj.f_void_dt_cal.disabled = true;	
//	addBtn01.style.display = "inline";
	getObj('addBtn02').style.display = "inline";
//	invBtn01.style.display = "inline";
	getObj('invBtn02').style.display = "inline";
	chkNoEditable(sts_cd);
	if (formObj.f_chk_no.value.length <= 0) {
		formObj.deposit_chk.disabled=true;
		formObj.f_deposit_dt.disabled=true;
		formObj.f_deposit_dt.className="search_form-disable";
		//#1095 [8][Payment Entry] Not display calendar icon when click New button
		//formObj.f_deposit_dt_cal.style.display="none";
		formObj.f_deposit_dt_cal.disabled=true;		
	} else {
		/*if(bank_multi_curr_flag == "Y"){
			formObj.f_rcv_amt.readOnly = true;
			formObj.f_rcv_amt.className = "search_form-disable";
		}*/
	}	
	if(formObj.f_jnr_no.value != ""){
		//#25620, LHK 20140123, 한번 저장 후에는 POST DATE 변경 불가
		formObj.f_post_dt.disabled=true;
		formObj.f_post_dt.className="search_form-disable";
		formObj.f_post_dt_cal.style.display="none";
		if(sts_cd == "S"){
		}
		/* Payment 에서 Void 권한 추가 : Print 는 권한이 없는 경우 Clear 권한으로 처리되지만, 실제 Clear 처리 되지 않은 경우는 Void 허용 */
		if(sts_cd == "C" && sheetObj.GetCellValue(1, "r_clr_yn") != "Y"){
			if (formObj.vc_flg.value == "Y") {					
				formObj.void_chk.disabled=false;
				formObj.f_void_dt.disabled=false;
				formObj.f_void_dt.className="search_form";
				//#1095 [8][Payment Entry] Not display calendar icon when click New button
				//formObj.f_void_dt_cal.style.display="inline";
				formObj.f_void_dt_cal.disabled = false;				
			}
		}	
		if(sts_cd == "S" || sts_cd == "V"){				
			if (formObj.vc_flg.value == "Y") {					
				formObj.void_chk.disabled=false;
				formObj.f_void_dt.disabled=false;
				formObj.f_void_dt.className="search_form";
				//#1095 [8][Payment Entry] Not display calendar icon when click New button
				//formObj.f_void_dt_cal.style.display="inline";
				formObj.f_void_dt_cal.disabled = false;				
			}
		}		
		if (sts_cd == "C" || sts_cd == "V") {
			formObj.f_bank_cd.disabled=true;
			if(!(sts_cd == "C" && sheetObj.GetCellValue(1, "r_clr_yn") != "Y")){	// Payment "S" Status 에서 Print 한 경우 제외.
				formObj.deposit_chk.disabled=true;
				formObj.f_deposit_dt.disabled=true;
				formObj.f_deposit_dt.className="search_form-disable";
				//#1095 [8][Payment Entry] Not display calendar icon when click New button
				//formObj.f_deposit_dt_cal.style.display="none";
				formObj.f_deposit_dt_cal.disabled=true;				
			}	
			formObj.s_paid_cd.className="search_form-disable";
			formObj.s_paid_cd.readOnly=true;
			formObj.s_paid_cd.disabled=true;
			formObj.customer.onclick="";
			formObj.customer.style.cursor="";
			formObj.s_paid_nm.className="search_form-disable";
			formObj.s_paid_nm.readOnly=true;
			formObj.s_paid_nm.disabled=true;
//			addBtn01.style.display = "none";
			getObj('addBtn02').style.display = "none";
//			invBtn01.style.display = "none";
			getObj('invBtn02').style.display = "none";
			
			if(bank_multi_curr_flag == "Y"){
				formObj.f_rcv_amt.readOnly = true;
				formObj.f_rcv_amt.className = "search_form-disable";
			}
		}
	}
	for(var i=1;i<=sheetObj.LastRow();i++){
		// #25248 : jnr_no 가 있는경우 non-editable
		// #25620 LHK 20140123
		// LHK, 20140307, #26818 [BINEX]Check Print 이후 Payment 자료 수정이 되고 있음 
		if(sheetObj.GetCellValue(i,"jnr_no") != ""){
			if(sts_cd == "S"){
			}
			if(sts_cd == "C"){		
				sheetObj.SetCellEditable(i, "pay_amt",0);
				sheetObj.SetCellBackColor(i, "pay_amt","#EFEBEF");
			}
			if(sts_cd == "C" || sts_cd == "V"){		
				sheetObj.SetCellEditable(i, "del_chk",0);
				sheetObj.SetCellBackColor(i, "del_chk","#EFEBEF");
				sheetObj.SetCellEditable(i, "inv_aply_xcrt",0);
				sheetObj.SetCellBackColor(i, "inv_aply_xcrt","#EFEBEF");
			}
			if (sheetObj.GetCellValue(i,"inp_type") == "M" && (sts_cd == "S" || sts_cd == "C")) {
				sheetObj.SetCellEditable(i, "gl_no",1);
				sheetObj.SetCellBackColor(i, "gl_no","#FFFFFF");
				sheetObj.SetCellEditable(i, "gl_rmk",1);
				sheetObj.SetCellBackColor(i, "gl_rmk","#FFFFFF");
				sheetObj.SetCellEditable(i, "ofc_cd",1);
				sheetObj.SetCellBackColor(i, "ofc_cd","#FFFFFF");
			}
		}
		// #25248 : inp_type 가 있는 M인 경우 만  editable
		if (sheetObj.GetCellValue(i,"inp_type") == "M" ) {
			sheetObj.SetCellEditable(i, "bl_no",1);
			sheetObj.SetCellBackColor(i, "bl_no","#FFFFFF");
			sheetObj.SetCellEditable(i, "ref_no",1);
			sheetObj.SetCellBackColor(i, "ref_no","#FFFFFF");
			sheetObj.SetCellEditable(i, "buy_inv_no",1);
			sheetObj.SetCellBackColor(i, "buy_inv_no","#FFFFFF");
		}
		if(bank_multi_curr_flag == "N" && formObj.f_curr_cd.value != sheetObj.GetCellValue(i, "inv_aply_curr_cd")){
			sheetObj.SetCellEditable(i, "pay_amt",0);
			sheetObj.SetCellEditable(i, "chk_flag",0);
			sheetObj.SetCellBackColor(i, "pay_amt","#EFEBEF");
			sheetObj.SetCellBackColor(i, "chk_flag","#EFEBEF");
			sheetObj.SetCellValue(i, "chk_flag","0");
		}
	}
}
/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 */
function authControl(){
 	var formObj=document.frm1;
 	var sheetObj=docObjects[0];
 	// 1.Paid Amount 값이 >0 인지 체크
 	var fileBolckYn=sheetObj.GetCellValue(1, "clt_cmpl_flg") == "Y"?true:false;
 	var jrnYn=sheetObj.GetCellValue(1, "jnr_yn");
 	var clsYn=sheetObj.GetCellValue(1, "cls_yn");
 	//false 이면 Block 된 경우
 	var blockYn=true;
 	if (fileBolckYn) {
 		blockYn=false;	
 	}
 	/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.13 */
 	if (jrnYn == "Y" || clsYn =="Y") {
 		blockYn=false;
 	} 
 	editInputForm(blockYn);
 	editSheet(blockYn);
} 
/**
* Input Form 의 수정을 가능/불가 하게 한다
*/
function editInputForm(flg){
	// form 의 read Only 값을 false로 변경
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
			// Search Condition 은 제외 collTxt[i].name == "s_cust_cd" || collTxt[i].name == "s_cust_nm" || collTxt[i].name == "s_inv_no" 
				if(collTxt[i].name == "s_paid_cd" 
					|| collTxt[i].name == "s_paid_nm" 
					|| collTxt[i].name == "f_chk_no" 
					|| collTxt[i].name == "f_post_dt"
					|| collTxt[i].name == "f_rcv_amt"){
				if(!flg){
					collTxt[i].className="search_form-disable";					
					collTxt[i].readOnly=!flg;
					collTxt[i].disabled=!flg;
				}
 			}	
		}	
 	}
// Search Condition 은 제외	
// 	frm1.dept_chk1.disabled    = !flg;
// 	frm1.dept_chk2.disabled  = !flg;
// 	frm1.dept_chk3.disabled   = !flg;
// 	frm1.his_chk[0].disabled  = !flg;
// 	frm1.his_chk[1].disabled  = !flg;
 	if (flg) {
// 		frm1.s_cust_cd.onclick 	   	= function(){doWork("CUSTOMER_POPLIST");};
// 		frm1.s_cust_cd.style.cursor 	= "hand";
 		frm1.f_post_dt_cal.onclick=function(){doDisplay('DATE3', frm1);};
 		frm1.f_deposit_dt_cal.onclick=function(){doDisplay('DATE1', frm1);};
 	} else {
// 		frm1.s_cust_cd.onclick 	   	= "";
// 		frm1.s_cust_cd.style.cursor 	= "";
 		frm1.f_post_dt_cal.onclick="";
 		frm1.f_deposit_dt_cal.onclick="";
 		frm1.f_bank_cd.disabled=true;
 		frm1.f_ofc_cd.disabled = true;
 	}
	//Level 1 이 아닌 경우 Block Check 도 제어
	if(JNR_LEVEL != "1"){
		frm1.block_chk.disabled=!flg;
	}
	frm1.f_remark.disabled=!flg;
	frm1.f_remark.readOnly=!flg;
}
/**
* Sheet 의 수정을 가능/불가 하게 한다
*/
function editSheet(flg){
	var sheetObj=docObjects[0];
	// Row Add 버튼 보이기/숨기기
	if (!flg) {	//Block 인 경우 invoice ADD, Add 버튼 없앰.
//		addBtn01.style.display = "none";
		getObj('addBtn02').style.display = "none";
//		invBtn01.style.display = "none";
		getObj('invBtn02').style.display = "none";	
	}
	
 	// sheet edit 가능/불가
 	sheetObj.SetEditable(flg);
 	sheetObj.RenderSheet(2);
} 
function setTotalAmount(){
 	var formObj=document.frm1;
 	var sheetObj=docObjects[0];
	//TOTAL 값을 계산한다.
	var inv_amt=0;
	var bal_amt=0;
	var pay_amt=0;
	for(var i=1;i<=sheetObj.LastRow();i++){
		if(bank_multi_curr_flag == "Y"){
			inv_amt += Number(sheetObj.GetCellValue(i, "inv_xcrt_sum_amt"));
			pay_amt += Number(sheetObj.GetCellValue(i, "ttl_pay_amt"));
			
			if(sheetObj.GetCellValue(i, "inp_type") == "S"){
				bal_amt += (Number(sheetObj.GetCellValue(i, "ttl_pay_amt")) - Number(sheetObj.GetCellValue(i, "inv_xcrt_sum_amt")));
			} 
		} else {
			inv_amt += Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
			bal_amt += Number(sheetObj.GetCellValue(i, "bal_sum_amt_1"));
			pay_amt += Number(sheetObj.GetCellValue(i, "pay_amt"));
		}
		
		/* #21662 : [BINEX]Deposit, Payment 화면에서 Invoice Link jsjang 2013.10.31 : invoice link 걸기 */
		if(sheetObj.GetCellValue(i,"inp_type") == "S"){
//parameter changed[check again]CLT 			
			sheetObj.SetCellFont("FontUnderline", i,"buy_inv_no",i,"buy_inv_no",1);
//parameter changed[check again]CLT 			
			sheetObj.SetCellFontColor(i, "buy_inv_no","#0000FF");
		}		
	}
	formObj.f_inv_amt.value=doMoneyFmt(parseFloat(roundXL(inv_amt,2)).toFixed(2));
	formObj.f_bal_amt.value=doMoneyFmt(parseFloat(roundXL(bal_amt,2)).toFixed(2));
	formObj.f_pay_amt.value=doMoneyFmt(parseFloat(roundXL(pay_amt,2)).toFixed(2));
	formObj.f_rcv_amt.value=doMoneyFmt(parseFloat(roundXL(pay_amt,2)).toFixed(2));
}
function setCheckTotalAmount(){
	
	var formObj = document.frm1;
 	var sheetObj  = docObjects[0];
 	
	//TOTAL 을 계산
	var inv_amt = 0;
	var bal_amt = 0;
	var pay_amt = 0;
	//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	var locl_amt=0; 
	var exRate = formObj.f_ex_rate.value;
	
	for(var i=1;i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "chk_flag") == "1"){
			if(bank_multi_curr_flag == "Y"){
				inv_amt += Number(sheetObj.GetCellValue(i, "inv_xcrt_sum_amt"));
				pay_amt += Number(sheetObj.GetCellValue(i, "ttl_pay_amt"));
				
				if(sheetObj.GetCellValue(i, "inp_type") == "S"){
					bal_amt += (Number(sheetObj.GetCellValue(i, "ttl_pay_amt")) - Number(sheetObj.GetCellValue(i, "inv_xcrt_sum_amt")));
				} 
			} else {
				inv_amt += Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
				bal_amt += Number(sheetObj.GetCellValue(i, "bal_sum_amt_1"));
				pay_amt += Number(sheetObj.GetCellValue(i, "pay_amt"));
			}
			
			//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
			locl_amt += Number(sheetObj.GetCellValue(i, "locl_amt"));
		}
		
	}
	
	formObj.f_inv_amt.value = doMoneyFmt(parseFloat(roundXL(inv_amt,2)).toFixed(2));
	formObj.f_bal_amt.value = doMoneyFmt(parseFloat(roundXL(bal_amt,2)).toFixed(2));
	formObj.f_pay_amt.value = doMoneyFmt(parseFloat(roundXL(pay_amt,2)).toFixed(2));
	//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	formObj.f_loc_pay_amt.value=doMoneyFmt(parseFloat(roundXL(locl_amt,2)).toFixed(2));	
	
	if(bank_multi_curr_flag == "N"){
		formObj.f_rcv_amt.value = doMoneyFmt(parseFloat(roundXL(pay_amt,2)).toFixed(2));
	}
}
/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
*  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
**/
function setBlock_dt(){
	var formObj=document.frm1;
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	//#52109 ofc별 max_date 확인
	//2016.04.19 C.W.Park Modified
	var param = formObj.f_ofc_cd.value;
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt&searchOfcCd=' + param, './GateServlet.gsl');
	if(NEXT_BLOCK_DT != "") {
		var nextBlockDtYMD=NEXT_BLOCK_DT.replaceAll("-", "");															//NEXT_BLOCK_DT  12-01-2013
			nextBlockDtYMD=nextBlockDtYMD.substring(4,8)+nextBlockDtYMD.substring(0,2)+nextBlockDtYMD.substring(2,4);	//nextBlockDtYMD 20131201
		var orgBlockDt=addDate('d', -1, nextBlockDtYMD, "");			
			ORG_BLOCK_DT=orgBlockDt.substring(4,6) + "-" + orgBlockDt.substring(6,8) + "-" + orgBlockDt.substring(0,4);
		//post_dt 와 block_dt 비교
		//fromDate > toDate true
		if(formObj.s_jnr_no.value == ""){
			if(compareTwoDate(NEXT_BLOCK_DT, formObj.f_post_dt.value)){
	 			formObj.f_post_dt.value=NEXT_BLOCK_DT;
	 		}
			formObj.old_post_dt.value=formObj.f_post_dt.value;
		}	
	}
}
function getMaxBlockOrJnrNextDt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			NEXT_BLOCK_DT=doc[1].substring(4,6) + "-" + doc[1].substring(6,8) + "-" + doc[1].substring(0,4);
		}else{
			NEXT_BLOCK_DT="";
		}
	}
}
/* LHK, 20140429
 * Void 이후 Save 할 경우, Void uncheck 시에 Pay amount 를 확인한다. 
 */
function chkVoidPayAmt(){
	var returnVal=true;
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sts_cd=getJnrStsCd();
	if(sts_cd == "V" && (!formObj.void_chk.checked || formObj.f_void_dt.value == "")){
		for(var i=1;i<=sheetObj.LastRow();i++){
			var inp_type=sheetObj.GetCellValue(i, "inp_type");
			var sell_buy_tp_cd=sheetObj.GetCellValue(i, "sell_buy_tp_cd");
			var amtComFlg=false;
			if(inp_type != "M" && (sell_buy_tp_cd == 'C' || sell_buy_tp_cd == 'B')){
				var pay_amt=Number(sheetObj.GetCellValue(i, "pay_amt"));
				var old_pay_amt=Number(sheetObj.GetCellValue(i, "old_pay_amt"));
				var bal_sum_amt=Number(sheetObj.GetCellValue(i, "bal_sum_amt"));
				var inv_sum_amt=Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
		    	bal_sum_amt=bal_sum_amt - old_pay_amt;
			    if(inv_sum_amt < 0){
				   if (Math.abs(pay_amt) > Math.abs(bal_sum_amt)) {
					   amtComFlg=true;
				   }	   
			    }else{
				   if(pay_amt > bal_sum_amt){
					   amtComFlg=true;
				   }
			    }
			}
	    	if(amtComFlg){
	    		alert("[Invoice No. : " + sheetObj.GetCellValue(i, "buy_inv_no") + "] \n" + getLabel('ACC_MSG134'));
		    	//sheetObj.CellValue(i, "pay_amt") = bal_sum_amt;
		    	formObj.void_chk.checked=true;
		    	formObj.f_void_dt.value=sheetObj.GetCellValue(1, "r_void_dt");
		    	returnVal=false;
		    	break;
			}
	 	}	
	}	
	return returnVal;
}
/* LHK, 201404229 추가
 * 저장전 인보이스 변경여부 체크 */
function chkInvModiTms(){
	var returnVal=true;
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	//LKH 2015-05-04::Redmine 48503/48504
 	var rtnMsgInvNO = '';
	for(var i=1;i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "chk_flag") == "1"){
			ajaxSendPost(getInvModiTms, 'reqVal', '&goWhere=aj&bcKey=searchInvModiTms&inv_seq='+sheetObj.GetCellValue(i, "inv_seq"), './GateServlet.gsl');
			if (vInvModiTms != sheetObj.GetCellValue(i, "modi_tms") && sheetObj.GetCellValue(i, "modi_tms") != '') {
				if (rtnMsgInvNO == ""){
	 				rtnMsgInvNO = rtnMsgInvNO + sheetObj.GetCellValue(i, "buy_inv_no");
	 			}else{
	 				rtnMsgInvNO = rtnMsgInvNO + ", " + sheetObj.GetCellValue(i, "buy_inv_no");
	 			}
	 				
	 			// 인보이스가 변경된 경우
	 			//alert(getLabel('ACC_MSG128')); 
	 			returnVal=false;
	 			//break;
		    } 
		}
	}
	if(!returnVal){
 		// 인보이스가 변경된 경우
 		rtnMsgInvNO = "["+rtnMsgInvNO +"]"
		alert(getLabel('ACC_MSG144')+"\n\n"+rtnMsgInvNO); 
 	}
	return returnVal;
}

function chkJnrModiTms(){
	var returnVal=true;
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
 	var f_jnr_no = sheetObj.GetCellValue(1, "jnr_no");
 	
 	if(f_jnr_no != ""){
 		ajaxSendPost(getJnrModiTms, 'reqVal', '&goWhere=aj&bcKey=searchJnrModiTms&jnr_no='+f_jnr_no, './GateServlet.gsl');
 		if (vJnrModiTms != sheetObj.GetCellValue(1, "jnr_modi_tms") && sheetObj.GetCellValue(1, "jnr_modi_tms") != '') {
 			returnVal=false;
 		}
 	}
 	if(!returnVal){
 		// Check 이 변경된 경우
		alert(getLabel('ACC_MSG147')); 
 	}
	return returnVal;
}

/* LHK, 20140430 */
function chkDate(dt_val, chk_val){
 	if(dt_val.value==''){
 		chk_val.checked=false;		// 날짜 format 이 잘못 들어간 경우, date Text '' 로 처리 후 관련 check box 처리.
 	}
}

/*
* LHK, 20141104 
* 요구사항 #39862 [BINEX]Deposit/Payment - Invoice #로 Search
*/ 
function searchInvList(call_val){
	
	var formObj = document.frm1;

	rtnary=new Array();
	rtnary[0]=formObj.s_cust_cd.value;
	rtnary[1]="";
	rtnary[2]=formObj.s_inv_no.value;
	if(formObj.dept_chk1.checked){
		rtnary[3]="Y";
	}else{
		rtnary[3]="N";
	}
	if(formObj.dept_chk2.checked){
		rtnary[4]="Y";
	}else{
		rtnary[4]="N";
	}
	if(formObj.dept_chk3.checked){
		rtnary[5]="Y";
	}else{
		rtnary[5]="N";
	}
	rtnary[6]="C";		//JOURNAL TYPE(DEPOSIT='D', CHECK='C')
	rtnary[7]=formObj.s_cust_nm.value;
	rtnary[8]=formObj.f_curr_cd.value;
	rtnary[9]=formObj.f_post_dt.value;
	rtnary[10]=call_val;
	callBackFunc = call_val;
	modal_center_open('./ACC_JOR_0500.clt', rtnary, 1150,500,"yes");
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.s_jnr_no.value = getParam(url,"s_jnr_no");
	
	doWork("SEARCHLIST");
}

function enterInvoiceNo(){
	if(event.keyCode == 13){
		var formObj = document.frm1;

		if (formObj.s_inv_no.value == "") return;
		
		var dept_chk1;
		var dept_chk2;
		var dept_chk3;
		var jnr_tp;
		
		if(formObj.dept_chk1.checked){
			dept_chk1="Y";
		}else{
			dept_chk1="N";
		}
		if(formObj.dept_chk2.checked){
			dept_chk2="Y";
		}else{
			dept_chk2="N";
		}
		if(formObj.dept_chk3.checked){
			dept_chk3="Y";
		}else{
			dept_chk3="N";
		}
		
		ajaxSendPost(getInvoiceInfo, 'reqVal', '&goWhere=aj&bcKey=getInvoiceInfo'
				//+'&s_cust_cd='+formObj.s_cust_cd.value
				//+'&s_cust_nm='+formObj.s_cust_nm.value
				+'&s_inv_no='+formObj.s_inv_no.value
				+'&dept_chk1='+dept_chk1
				+'&dept_chk2='+dept_chk2
				+'&dept_chk3='+dept_chk3
				+'&f_curr_cd='+formObj.f_curr_cd.value
				+'&his_chk='+formObj.his_chk.value, './GateServlet.gsl');
	}
}

function getInvoiceInfo(reqVal){
	
	var formObj = document.frm1;
	var doc=getAjaxMsgXML(reqVal);
    
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('^@');

			if (rtnArr[0] == "0") {
				// [Warning] Invoice No. do not exist!
				alert(getLabel('ACC_COM_ALT015'));
				formObj.s_inv_no.value = "";
				formObj.s_inv_no.focus();
				return;
				
			} else if (rtnArr[0] == "1") {
				//if (formObj.s_cust_cd.value == "" || formObj.s_cust_nm.value){
					formObj.s_cust_cd.value = rtnArr[1];
					formObj.s_paid_cd.value = rtnArr[1];

					//#3488 Accounting Multi Language 적용 
					if ( MULTI_LANGUAGE == "Y" ){
						formObj.s_cust_nm.value = rtnArr[10];
						formObj.s_paid_nm.value = rtnArr[10];
					}else{
						formObj.s_cust_nm.value = rtnArr[2];
						formObj.s_paid_nm.value = rtnArr[2];	
					}
					
					setRmkAcctPayOrd(rtnArr[3]);
				//}
				
				doWork("SEARCHLIST");
			} else {
				searchInvList('INVGET');
			}
		} else {
			
		}
	}
}

//#48307 [ZIMEX] Remark, Acct Name For Pay to the Order of 변경 설정
function setRemarkSetReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]=="Y" && doc[1]!=undefined) {
		RMK_LEVEL="2"
	}
}

function setRmkAcctPayOrd(val){
	var formObj = document.frm1;
	
	if(RMK_LEVEL == "2"){
		formObj.f_remark.value = val;
	}
}

//모든 데이터가 Delete 되는 Case에 대해 Validation 강화
function fncDelChkCount(curCol, curRow){
	var sheetObj=docObjects[0];
	var chkCnt = 0;
	
	for(var i=1; i<=sheetObj.LastRow(); i++){
		if(i != curRow){
			if(sheetObj.GetCellValue(i, "chk_flag") == "1"){
				chkCnt++;
			}
		}
	}
		
	if (chkCnt == 0){
		alert(getLabel('ACC_MSG135'));
		
		var chk_val = "0";
		
		if(curCol == "chk_flag"){
			chk_val = "1";
		}
		sheetObj.SetCellValue(curRow, curCol, chk_val, 0);
		return false;
	}
	return true;
}

/*function setDescriptionReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]=="Y" && doc[1]!=undefined) {
		SHOW_DESCRIPTION = 'Y'
	}else{
		SHOW_DESCRIPTION = 'N'
	}
}*/



//Office Block 체크하면 Block도 체크 
function fn_office_block_chk(){	
	
	var formObj = document.frm1; 
	 if(formObj.office_block_chk.checked){
		 formObj.block_chk.checked = true; 
	 }	        	   
}



//Block  언체크하면 Office Block도 언체크 
function fn_block_chk(){		
	
	var formObj = document.frm1;  	 
	 if(formObj.block_chk.checked == false){
		 formObj.office_block_chk.checked = false; 
	 }	        	   
}

//#483 [Binex LA] RiderPrint button on Payment Entry
var setRiderBtnChk = false;

function setRiderBtn(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == "Y"){
			setRiderBtnChk = true;
			getBtnObj('btnRiderPrint').style.display = "inline";
		}
	}
}

var bank_multi_curr_flag = "";

function setBankMultiCurrFlag(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		bank_multi_curr_flag = doc[1];
	} else {
		bank_multi_curr_flag = "";
	}
	
	if(bank_multi_curr_flag == "Y"){
		getObj('trRcvAmt').style.display = "";
		getObj('tdRcvAmt').style.display = "";
		getObj('trRcvAmt').style.width = "80px";
		getObj('tdRcvAmt').style.width = "100px";
	}
}

//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
function setUseLoclGlViewFalg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		GL_VIEW_FALG=doc[1];
	} else {
		GL_VIEW_FALG="N";
	}	
}

var getXcrtRate = 0;

function getCurrency(reqVal){
	var doc = getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	getXcrtRate = doc[1];
    }
}

/**
 * GL_CD 관린 코드조회
 */
function getGlExProfitNm(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('^@');
			frm1.gl_ex_profit_nm.value = rtnArr[1];
		}else{
			frm1.gl_ex_profit_nm.value = "";
		}
	}
}

function getGlExLossNm(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('^@');
			frm1.gl_ex_loss_nm.value = rtnArr[1];
		}else{
			frm1.gl_ex_loss_nm.value = "";
		}
	}
}

function getGlMiscProfitNm(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('^@');
			frm1.gl_misc_profit_nm.value = rtnArr[1];
		}else{
			frm1.gl_misc_profit_nm.value = "";
		}
	}
}

function getGlMiscLossNm(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('^@');
			frm1.gl_misc_loss_nm.value = rtnArr[1];
		}else{
			frm1.gl_misc_loss_nm.value = "";
		}
	}
}

function popupAutomaticProcess(rtnVal){
	var formObj = document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry = rtnVal.split("|");
		
		if(rtnValAry[0] == "O"){
			
			formObj.f_rcv_amt.value = formObj.f_pay_amt.value;
			
		} else if(rtnValAry[0] == "E" || rtnValAry[0] == "M") {
			
			var gl_cd = "";
			
			if(rtnValAry[0] == "E"){
				if(rtnValAry[1] == "P"){
					gl_cd = formObj.gl_ex_profit.value;
				} else {
					gl_cd = formObj.gl_ex_loss.value;
				}
			} else {
				if(rtnValAry[1] == "P"){
					gl_cd = formObj.gl_misc_profit.value;
				} else {
					gl_cd = formObj.gl_misc_loss.value;
				}
			}
			
			var postDt = formObj.f_post_dt.value.replaceAll('-','').substr(4, 4) + formObj.f_post_dt.value.replaceAll('-','').substr(0, 2) + formObj.f_post_dt.value.replaceAll('-','').substr(2, 2);
			
			var intRows=sheetObj.LastRow() + 1;
			sheetObj.DataInsert(intRows);
			sheetObj.SetCellValue(intRows, "ofc_cd",UserOfcCd);
			//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
			sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",formObj.f_curr_cd.value);
			sheetObj.SetCellValue(intRows, "chk_flag",1);
			sheetObj.SetCellValue(intRows, "trdp_cd",formObj.s_cust_cd.value);
			sheetObj.SetCellValue(intRows, "inv_aply_xcrt",1);
			sheetObj.SetCellValue(intRows, "clr_flag","1");
			sheetObj.SetCellValue(intRows, "gl_no", gl_cd);
			sheetObj.SetCellValue(intRows, "pay_amt", Number(removeComma(formObj.f_rcv_amt.value)) - Number(removeComma(formObj.f_pay_amt.value)));
			sheetObj.SetCellValue(intRows, "inv_post_dt", postDt);
			sheetObj.SetCellValue(intRows, "inp_type","M");
		}
		
		formObj.f_rcv_amt.value=removeComma(formObj.f_rcv_amt.value);
		formObj.f_chk_no.value = formObj.f_chk_no.value.toUpperCase();
		var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
 	   	var intRows2=sheetObj2.LastRow() + 1;
        sheetObj2.DataInsert(intRows2);
        
        //Use_Clear_Void옵션이 N의 경우 save할 때  deposit_dt를 Today로 셋팅
        if(useClearVoid == "N"){
     	   if (!formObj.deposit_chk.checked) {
     		   formObj.deposit_chk.checked = true;
     		   formObj.deposit_chk.value = "Y";
     		   setDepositDate();
     		   depositClick();
     	   }
        }
        sheetObj.DoAllSave("./ACC_JOR_0032GS.clt", FormQueryString(formObj)+'&'+sht2, true);
	}
}

//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
function popupAutomaticProcessGL(rtnVal){
	var formObj = document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry = rtnVal.split("|");
		
		if(rtnValAry[0] == "O"){
			
			formObj.f_rcv_amt.value      = formObj.f_pay_amt.value;
			formObj.f_locl_rcv_amt.value = formObj.f_loc_pay_amt.value;
			
			var rate =  Number(removeComma(formObj.f_locl_rcv_amt.value)) / Number(removeComma(formObj.f_rcv_amt.value));
			
//			if(ofc_locl_curr_cd=="KRW" ||  ofc_locl_curr_cd=="JPY"){
//				rate =  roundXL(rate,0);
//			}else{
//				rate =  roundXL(rate,2);
//			}	
			
			rate =  roundXL(rate,5);
			formObj.f_ex_rate.value      = rate;
			
		} else if(rtnValAry[0] == "E" || rtnValAry[0] == "M") {
			
			var gl_cd = "";
			
			if(rtnValAry[0] == "E"){
				if(rtnValAry[1] == "P"){
					gl_cd = formObj.gl_ex_profit.value;
				} else {
					gl_cd = formObj.gl_ex_loss.value;
				}
			} else {
				if(rtnValAry[1] == "P"){
					gl_cd = formObj.gl_misc_profit.value;
				} else {
					gl_cd = formObj.gl_misc_loss.value;
				}
			}
			
			var postDt = formObj.f_post_dt.value.replaceAll('-','').substr(4, 4) + formObj.f_post_dt.value.replaceAll('-','').substr(0, 2) + formObj.f_post_dt.value.replaceAll('-','').substr(2, 2);
			
			var intRows=sheetObj.LastRow() + 1;
			sheetObj.DataInsert(intRows);
			sheetObj.SetCellValue(intRows, "ofc_cd",UserOfcCd);
			sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",ofc_locl_curr_cd);
			sheetObj.SetCellValue(intRows, "chk_flag",1);
			sheetObj.SetCellValue(intRows, "trdp_cd",formObj.s_cust_cd.value);
			sheetObj.SetCellValue(intRows, "inv_aply_xcrt",1);
			sheetObj.SetCellValue(intRows, "clr_flag","1");
			sheetObj.SetCellValue(intRows, "gl_no", gl_cd);
			sheetObj.SetCellValue(intRows, "pay_amt", Number(removeComma(formObj.f_rcv_amt.value)) - Number(removeComma(formObj.f_pay_amt.value)));
			sheetObj.SetCellValue(intRows, "inv_post_dt", postDt);
			sheetObj.SetCellValue(intRows, "inp_type","M");
			
			sheetObj.SetCellValue(intRows, "locl_xcrt", 1);
			sheetObj.SetCellValue(intRows, "locl_amt", Number(removeComma(formObj.f_locl_rcv_amt.value)) - Number(removeComma(formObj.f_loc_pay_amt.value)));
		}
		
		formObj.f_rcv_amt.value=removeComma(formObj.f_rcv_amt.value);
		formObj.f_chk_no.value = formObj.f_chk_no.value.toUpperCase();
		var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
		var intRows2=sheetObj2.LastRow() + 1;
		sheetObj2.DataInsert(intRows2);
		
		//Use_Clear_Void옵션이 N의 경우 save할 때  deposit_dt를 Today로 셋팅
		if(useClearVoid == "N"){
			if (!formObj.deposit_chk.checked) {
				formObj.deposit_chk.checked = true;
				formObj.deposit_chk.value = "Y";
				setDepositDate();
				depositClick();
			}
		}
		sheetObj.DoAllSave("./ACC_JOR_0032GS.clt", FormQueryString(formObj)+'&'+sht2, true);
	}
}

var blockYn = "N";

function getJnrBlockCheck(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			if(doc[1] == "Y"){ // Block 처리된 경우
				blockYn = "Y"
			} else {
				blockYn = "N";
			}
		}
	}
}

function setInvXcrtSumAmt(sheetObj, curRow){
	var formObj=document.frm1;
	
	var ex_rate=Number(sheetObj.GetCellValue(curRow, "inv_aply_xcrt"));
	var pay_amt=Number(sheetObj.GetCellValue(curRow, "pay_amt"));
	
	sheetObj.SetCellValue(curRow, "ttl_pay_amt",ex_rate * pay_amt);
	
	// 지급금액이 발런스 금액과 같으면 클리어 처리한다.
	var inv_sum_amt=Number(sheetObj.GetCellValue(curRow, "inv_sum_amt"));
	var bal_sum_amt=Number(sheetObj.GetCellValue(curRow, "bal_sum_amt"));
	var ttl_pay_amt=Number(sheetObj.GetCellValue(curRow, "ttl_pay_amt"));
	
	sheetObj.SetCellValue(curRow, "inv_xcrt_sum_amt",ex_rate * inv_sum_amt);
	
    if(formObj.f_jnr_no.value != "" && formObj.f_jnr_no.value != undefined){
		    if(inv_sum_amt == pay_amt){
		    	sheetObj.SetCellValue(curRow,"clr_flag","1");
		    }else{
			    sheetObj.SetCellValue(curRow,"clr_flag","0");
		    }
    }else{
	    if(bal_sum_amt == pay_amt){
			    sheetObj.SetCellValue(curRow,"clr_flag","1");
		    }else{
			    sheetObj.SetCellValue(curRow,"clr_flag","0");
		    }
    }
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}

function sheet1_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 사용자가 저장한 Header Setting을 삭제한다.
		//		case "Header Setting Delete":
		//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
		//		break;
		// 선택된 Column Hidden
	 }
}

function changeIssuedOffice(obj) {
	ajaxSendPost(searchChangeIssuedOffice, 'reqVal', '&goWhere=aj&bcKey=searchChangeIssuedOffice&ofc_cd=' + obj.value + '&jnr_type=' + JNR_TYPE, './GateServlet.gsl');
}

function searchChangeIssuedOffice(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			var rtnArr = doc[1].split('^@');
			
			setBlock_dt();
			
			if(formObj.f_jnr_no.value != ""){
				var sts_cd = getJnrStsCd();
				
				if (!(sts_cd == "C" || sts_cd == "V")){
					formObj.f_bank_cd.value = rtnArr[0];
					chageBankCurrCd(formObj.f_bank_cd);
				}
			} else {
				formObj.f_bank_cd.value = rtnArr[0];
				chageBankCurrCd(formObj.f_bank_cd);
				
				frm1.gl_ex_profit.value = rtnArr[1];
				frm1.gl_ex_loss.value = rtnArr[2];
				frm1.gl_misc_profit.value = rtnArr[3];  
				frm1.gl_misc_loss.value = rtnArr[4]; 
				getGlName();
				
				setPostDt();
			}
			sheetObj.SetColProperty('inv_aply_xcrt', {PointCount:rtnArr[5]});
		}
	}
}

//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
function fn_setExRate(){
	var formObj=document.frm1;
	if(GL_VIEW_FALG=="Y"){
	
		if(ofc_locl_curr_cd == formObj.f_curr_cd.value){
			document.getElementById("th_ex_rate").style.visibility="hidden";
			document.getElementById("td_ex_rate").style.visibility="hidden";
			document.getElementById("th_loc_amt").style.visibility="hidden";
			document.getElementById("td_loc_amt").style.visibility="hidden";
			//document.getElementById("th_pay_amt").style.visibility="hidden";
			//document.getElementById("td_pay_amt").style.visibility="hidden";
			
			formObj.f_ex_rate.value="1";
			
		}else{
			
			
			document.getElementById("th_ex_rate").style.visibility="visible";
			document.getElementById("td_ex_rate").style.visibility="visible";
			document.getElementById("th_loc_amt").style.visibility="visible";
			document.getElementById("td_loc_amt").style.visibility="visible";		
			//document.getElementById("th_pay_amt").style.visibility="visible";	
			//document.getElementById("td_pay_amt").style.visibility="visible";		
			
			var param = '';
			var tmp_dt = formObj.f_post_dt.value.replaceAll("-", "");
			tmp_dt = tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);		
			
			param += '&cur_dt=' + tmp_dt;
			param += '&trf_cur_cd=' + formObj.f_curr_cd.value;
			param += '&ofccurr_cd=' + ofc_locl_curr_cd;
			
			//#1617 [CLT] Depsosit/Payment Entry - Ex.Rate Date 정의 기준변경  getCurrency > getCurrencyFinc 변경  -->
			ajaxSendPost(getCurrencyLocl, 'reqVal', '&goWhere=aj&bcKey=getCurrencyFinc' + param, './GateServlet.gsl');
			
			if(getXcrtRateLocl == 0){
				getXcrtRateLocl = 1;
			}
			
			formObj.f_ex_rate.value=getXcrtRateLocl;
			numberCommaLen(formObj.f_ex_rate, 8, 5);
			
		}
		
		fnsetLocalAmt();
	
	}
}

//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
var getXcrtRateLocl = 0;
function getCurrencyLocl(reqVal){
	var doc = getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	getXcrtRateLocl = doc[1];
    }
}

//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
function fnsetLocalAmt(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	var locAmt = Number(removeComma(formObj.f_rcv_amt.value)) * Number(removeComma(formObj.f_ex_rate.value));
	
	if(ofc_locl_curr_cd=="KRW" ||  ofc_locl_curr_cd=="JPY"){
		locAmt =  roundXL(locAmt,0);
	}else{
		locAmt =  roundXL(locAmt,2);
	}
	
	formObj.f_locl_rcv_amt.value =locAmt;
	//OFVFOUR-7861: [JAPT] Process Deposit and got pop-up "There was a difference between Receive Amount and Payment Amount. Select the following process"
	numberCommaLen(formObj.f_locl_rcv_amt, 10, 2);
	
	//#5584 [JAPT]Deposit/Payment 환율 계산 에러
	for(var i=1;i<=sheetObj.LastRow();i++){
		if(GL_VIEW_FALG=="Y" && sheetObj.GetCellValue(i, "inp_type") == "M"  && !isExMiscGL(sheetObj.GetCellValue(i, "gl_no"))) {
  	    	 if(formObj.f_curr_cd.value != ofc_locl_curr_cd){
  	    		 sheetObj.SetCellValue(i, "locl_xcrt",formObj.f_ex_rate.value);
  	    	 } else {
  	    		 sheetObj.SetCellValue(i, "locl_xcrt","1"); 
  	    	 }
  	    	 
  	    	var POINT_CNT = (ofc_locl_curr_cd=="KRW" || ofc_locl_curr_cd=="JPY") ? 0 : 2;				
			var loclRecAmt = roundXL(Number(sheetObj.GetCellValue(i, "pay_amt")) * Number(sheetObj.GetCellValue(i, "locl_xcrt")), POINT_CNT);
			sheetObj.SetCellValue(i, "locl_amt", loclRecAmt);
  	     }
	}
}


function getGlName(){
	ajaxSendPost(getGlExProfitNm, 'reqVal', '&goWhere=aj&bcKey=getGlRmk&s_gl_no='+frm1.gl_ex_profit.value+'&jnr_tp='+JNR_TYPE, './GateServlet.gsl');
	ajaxSendPost(getGlExLossNm, 'reqVal', '&goWhere=aj&bcKey=getGlRmk&s_gl_no='+frm1.gl_ex_loss.value+'&jnr_tp='+JNR_TYPE, './GateServlet.gsl');
	ajaxSendPost(getGlMiscProfitNm, 'reqVal', '&goWhere=aj&bcKey=getGlRmk&s_gl_no='+frm1.gl_misc_profit.value+'&jnr_tp='+JNR_TYPE, './GateServlet.gsl');
	ajaxSendPost(getGlMiscLossNm, 'reqVal', '&goWhere=aj&bcKey=getGlRmk&s_gl_no='+frm1.gl_misc_loss.value+'&jnr_tp='+JNR_TYPE, './GateServlet.gsl');
}

//#5584 [JAPT]Deposit/Payment 환율 계산 에러
//glcd 가 Exchange Profit, Exchange Loss, Miscellaneous Profit, Miscellaneous Loss 인지 확인 	
function isExMiscGL(glCd){

	if(frm1.gl_ex_profit.value == glCd ) {return true;}
	if(frm1.gl_ex_loss.value == glCd ) {return true;}
	if(frm1.gl_misc_profit.value == glCd ) {return true;}
	if(frm1.gl_misc_loss.value == glCd ) {return true;}
	
	return false;
}

