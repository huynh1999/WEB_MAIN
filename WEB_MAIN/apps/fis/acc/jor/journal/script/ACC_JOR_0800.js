//=========================================================
//*@FileName   : ACC_JOR_0800.jsp
//*@FileTitle  : Deposit/Payment for China (Entry)
//*@Description: Deposit/Payment for China (Entry)
//*@author     : Chungrue - Cyberlogitec
//*@version    : 1.0 - 2011/11/23
//*@since      : 2011/11/23
//
//*@Change history:
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/10
//*@since      : 2014/07/10
//=========================================================
var TODAY;
var vInvModiTms=''; 
var vJnrModiTms=''; 
var ORG_BLOCK_DT=""; 		//MAX(BLOCK_DT)
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
var rtnary=new Array(1);
var callBackFunc = "";
var useClearVoid = "";
var grpSlipNoCheck=true;

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj1=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    
    var formObj=document.frm1;
    
    switch(srcName) {
	   case "DEFAULT":
		   break;
   	   case "COPY":
	        //Copy();
   		   copy_condition();  //#2115 [PATENT] Deposit/Payment for CN (ENTRY) 기능 보완
	   break;
   	   case "CLEAR":
		   // #2084 - [PATENT] NEW 버튼 Confirm 메시지 추가
		   if(confirm(getLabel('FMS_COM_CFMNEW'))){
			   clearAll();
		   }
	   break;
	   case "SEARCH":
		   if(formObj.s_grp_slip_no.value != ""){
			   formObj.f_grp_slip_no.value = formObj.s_grp_slip_no.value;
		   }
		   formObj.f_cmd.value=SEARCHLIST;
		   docObjects[0].DoSearch("./ACC_JOR_0800_1GS.clt", FormQueryString(formObj) );
      break;
       case "SEARCHLIST":
    	    if(formObj.s_grp_slip_no.value == ""){
    	    	if(formObj.s_cust_cd.value == ""){
        	    	// Please enter a Search Condition!
        	    	alert(getLabel('FMS_COM_ALT014'));
        	    	formObj.s_cust_cd.focus();
        	    	return;
        	    }
    	    }else{
    	    	formObj.f_grp_slip_no.value = formObj.s_grp_slip_no.value;
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
    	    if(formObj.his_chk[0].checked){
    	    	formObj.his_chk.value="A";	//ALL
    	    }else{
    	    	formObj.his_chk.value="O";	//OPEN
    	    }
    	    formObj.f_cmd.value=SEARCHLIST01;
	   		docObjects[1].DoSearch("./ACC_JOR_0800_2GS.clt", FormQueryString(formObj) );
       break;
       case "ROWADD":
    	    if(formObj.s_cust_cd.value == ""){
    	    	// Please check the Data! - Customer
	   	    	alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CUST'));
	   	    	formObj.s_cust_cd.focus();
	   	    	return;
	   	    }
    	    
   	    	var intRows=sheetObj2.LastRow() + 1;
            sheetObj2.DataInsert(intRows);
            sheetObj2.SetRowBackColor(intRows,"#EFEBEF");
            sheetObj2.SetCellBackColor(intRows, "del_chk","#FFFFFF");
    		sheetObj2.SetCellBackColor(intRows, "ofc_cd","#FFFFFF");
    		sheetObj2.SetCellBackColor(intRows, "sls_usrid","#FFFFFF");
    		sheetObj2.SetCellBackColor(intRows, "gl_no","#FFFFFF");
    		sheetObj2.SetCellBackColor(intRows, "gl_rmk","#FFFFFF");
    		sheetObj2.SetCellBackColor(intRows, "buy_inv_no","#FFFFFF");
    		sheetObj2.SetCellBackColor(intRows, "pay_amt","#FFFFFF");
    		sheetObj2.SetCellBackColor(intRows, "curr_cd","#FFFFFF");
    		sheetObj2.SetCellBackColor(intRows, "chk_flag","#FFFFFF");
    		sheetObj2.SetCellBackColor(intRows, "bl_no","#FFFFFF");
    		sheetObj2.SetCellBackColor(intRows, "ref_no","#FFFFFF");
    		sheetObj2.SetCellBackColor(intRows, "jnr_desc","#FFFFFF");
    		
            sheetObj2.SetCellEditable(intRows, "ofc_cd",1);
            sheetObj2.SetCellEditable(intRows, "sls_usrid",1);
            sheetObj2.SetCellEditable(intRows, "gl_no",1);
            sheetObj2.SetCellEditable(intRows, "gl_rmk",1);
            sheetObj2.SetCellEditable(intRows, "buy_inv_no",1);
            sheetObj2.SetCellEditable(intRows, "pay_amt",1);
            sheetObj2.SetCellEditable(intRows, "curr_cd",1);
            sheetObj2.SetCellEditable(intRows, "bl_no",1);
            sheetObj2.SetCellEditable(intRows, "ref_no",1);
            sheetObj2.SetCellEditable(intRows, "jnr_desc",1);
            
            sheetObj2.SetCellValue(intRows, "ofc_cd",UserOfcCd);
            sheetObj2.SetCellValue(intRows, "chk_flag",1);
            //sheetObj2.SetCellValue(intRows, "inv_post_dt", 		sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "m_post_dt"));
            //sheetObj2.SetCellValue(intRows, "inv_xcrt_dt", 		sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "m_post_dt"));
            //sheetObj2.SetCellValue(intRows, "curr_cd", 			sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "m_curr_cd"));
			//sheetObj2.SetCellValue(intRows, "inv_aply_curr_cd", sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "m_curr_cd"));
   	        sheetObj2.SetCellValue(intRows, "trdp_cd",formObj.s_cust_cd.value);
   	        sheetObj2.SetCellValue(intRows, "inv_aply_xcrt",1);
   	        sheetObj2.SetCellValue(intRows, "clr_flag","1");
   	        sheetObj2.SetCellValue(intRows, "gl_no","");
   	        sheetObj2.SetCellValue(intRows, "gl_rmk","");
   	        sheetObj2.SetCellValue(intRows, "inp_type","M");
       break;
       case "MODIFY":	//수정
       case "MODIFY_BLOCK":	//수정
    	   
    	   formObj.save_lock_yn.value = "N";
    	   
    	   if(srcName == "MODIFY_BLOCK"){
    		   
    		   if(formObj.f_grp_slip_no.value != ""){
    			   
    			   ajaxSendPost(getJnrBlockCheck, 'reqVal', '&goWhere=aj&bcKey=getJnrGrpSlipBlockCheck&grp_slip_no='+formObj.f_grp_slip_no.value, './GateServlet.gsl');
    		   
    			   // 하나라도 Block 되어 있으면 Bloc 처리할 수 없음.
    			   if(grpSlipBlockYn == "Y"){
    				   alert(getLabel('ACC_MSG155'));
    				   return;
    			   }
    		   }
		   
    		   formObj.save_lock_yn.value = "Y";
    	   }
    	   
    	   // Group Slip No 중복 체크
    	   formObj.i_grp_slip_no.value = trim(formObj.i_grp_slip_no.value); 

    	   if(!(formObj.i_grp_slip_no.value == "" || formObj.i_grp_slip_no.value == "AUTO")){
    		   if(formObj.f_grp_slip_no.value != formObj.i_grp_slip_no.value){
        	   	   ajaxSendPost(getGrpSlipNoCheck, 'reqVal', '&goWhere=aj&bcKey=getGrpSlipNoCheck&f_grp_slip_no='+formObj.i_grp_slip_no.value, './GateServlet.gsl');
    		   }
    	   }     	
    	   
    	   if(!grpSlipNoCheck) return;
    	   
    	   if(sheetObj1.RowCount() < 1 || sheetObj2.RowCount() < 1){
			   alert(getLabel('FMS_COM_ALT004'));
			   return;      			  
    	   } 
		   	   
    	   // 그리드 전체삭제시 JOURNAL 를 삭제한다.
    	   if(!checkDelete()){
    		   doWork("DELETE");
     	   }else{
			   frm1.f_cmd.value=MODIFY;
			   
			   // 신규일 경우 Detail에 없는 Currency인 경우 Delete 처리함.
			   if(formObj.f_grp_slip_no.value == ""){
	    		   var v_curr_cd = "";
	        	   
	        	   for(var i=2; i<=sheetObj2.LastRow(); i++){
	        		   if(sheetObj2.GetCellValue(i, "chk_flag") == "1"){
	        			   if(v_curr_cd.indexOf(sheetObj2.GetCellValue(i, "curr_cd")) == -1){
	            			   v_curr_cd += sheetObj2.GetCellValue(i, "curr_cd") + "&";
	            			   
	            		   }
	        		   }
	        	   }
	        	   
	        	   for(var i=sheetObj1.LastRow(); i>0; i--){
	        		   if(v_curr_cd.indexOf(sheetObj1.GetCellValue(i, "m_curr_cd")) == -1){
	        			   sheetObj1.RowDelete(i, false);
	        		   }
	        	   }
	    	   }
			   
			   // Customer 필수 체크
			   if(formObj.s_cust_cd.value == ""){
				   alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CUST'));
				   formObj.s_cust_cd.focus();
				   return;
			   }
			   
			   // Master Grid Validation
			   for(var i=1; i<=sheetObj1.LastRow(); i++){
				   // Current Check No. Last Check No. 체크
				   if(sheetObj1.GetCellValue(i, "m_lst_chk_no") != "" && sheetObj1.GetCellValue(i, "m_cur_chk_no") == sheetObj1.GetCellValue(i, "m_chk_no") && 
	    				   eval(sheetObj1.GetCellValue(i, "m_cur_chk_no")) > eval(sheetObj1.GetCellValue(i, "m_lst_chk_no"))){
	    			   if(!confirm(getLabel('ACC_MSG115') ) ){
	       	  				return;
	    			   }
	    		   }
				   
				   // Deposit Flag 가 "Y" 인데 Check No.가 없으면 에러 (USE_CLEAR_VOID 가 "N"일 경우 Check No. 여부 체크하지 않음.)
				   // 2017.05.10 Clear 체크 시 – Check No. Validation 부분은 Warning 메시지로 변경.  Check No. 없이 저장될 수 있어야 함.
				   /*if(useClearVoid != "N"){
					   if(sheetObj1.GetCellValue(i, "m_clr_yn") == "1" && sheetObj1.GetCellValue(i, "m_chk_no") == ""){
						   alert(getLabel('ACC_MSG133'));
						   sheetObj1.SelectCell(i, "m_chk_no", false);
						   return;
					   }
				   }*/
	    		   
				   // 수정할 경우 Master Currency와 동일한 Detail Currency가 반드시 하나 이상 있어야 함.
	    		   if(formObj.f_grp_slip_no.value != ""){
		    		   var currCnt = 0;
		    		   
		    		   for(var j=2; j<=sheetObj2.LastRow(); j++){
		    			   if(sheetObj1.GetCellValue(i, "m_curr_cd") == sheetObj2.GetCellValue(j, "curr_cd")){
		    				   if(sheetObj2.GetCellValue(j, "del_chk") != "1" && sheetObj2.GetCellValue(j, "chk_flag") != "0"){
		    					   currCnt++;
		    				   }
		    				   
		    			   }
		    		   }
		    		   
		    		   if(currCnt == 0){
		    			   alert(getLabel('ACC_MSG135'));
		    			   return;
		    		   }
	    		   }
				   
	    		   // Post Date 필수 체크
				   if(sheetObj1.GetCellValue(i, "m_post_dt") == ""){
					   alert(getLabel('FMS_COM_ALT007') + " \n- " + getLabel('FMS_COD_POSTDT'));
					   sheetObj1.SelectCell(i, "m_post_dt", false);
					   return;
				   }
				   
				   // Payment의 경우 Received Amount가 양수인지 체크
				   if(sheetObj1.GetCellValue(i, "m_jnr_tp") == "P"){
					   if(Number(sheetObj1.GetCellValue(i, "m_rcv_amt")) < 0){
						   if(!confirm(getLabel('ACC_MSG85'))){
							   return;
						   }
					   }
				   }
				   
				   // Bank 필수 체크
				   if(sheetObj1.GetCellValue(i, "m_bank_seq") == ""){
					   alert(getLabel('FMS_COM_ALT007') + " \n- " + getLabel('FMS_COD_DEBK'));
					   sheetObj1.SelectCell(i, "m_bank_seq", false);
					   return;
				   }
				   
				   // Received Amount 필수 체크
				   if(Number(sheetObj1.GetCellValue(i, "m_coll_amt")) != 0 && Number(sheetObj1.GetCellValue(i, "m_rcv_amt")) == 0){
					   alert(getLabel('FMS_COM_ALT007') + " \n- " + getLabel('FMS_COD_REVAMT'));
					   sheetObj1.SelectCell(i, "m_rcv_amt", false);
					   return;
				   }
				   
				   // 환차손 처리할 경우 Office에 G/L Code 세팅 여부 체크
				   var ex_gl_amt = Number(sheetObj1.GetCellValue(i, "m_ex_gl_amt"));
				   var org_ex_gl_amt = Number(sheetObj1.GetCellValue(i, "m_org_ex_gl_amt"));
				   
				   if(ex_gl_amt != org_ex_gl_amt){
					   ex_gl_amt = ex_gl_amt - org_ex_gl_amt;
    				   
    				   if(ex_gl_amt > 0){
    					   if(formObj.gl_ex_profit.value == ""){
    						   alert(getLabel('ACC_MSG152') + " \n- " + getLabel('FMS_COD_EXPRGL'));
    						   return;
    					   }
    				   } else {
    					   if(formObj.gl_ex_loss.value == ""){
    						   alert(getLabel('ACC_MSG152') + " \n- " + getLabel('FMS_FMS_COD_EXLOGLCOD_EXPRGL'));
    						   return;
    					   }
    				   }
				   }
			   }
			   
			   // Detail Grid Validation
			   var chkCnt=0;
			   var apVndInvNoNullCnt = 0;
			   
			   for(var i=2;i<=sheetObj2.LastRow();i++){
				   if(sheetObj2.GetCellValue(i, "chk_flag") == "1"){
					   if(sheetObj2.GetCellValue(i, "inv_post_dt") == ""){
						   //[Post Date] is mandatory field.
						   alert(getLabel('FMS_COM_ALT007') + " \n- " + getLabel('FMS_COD_POSTDT'));
						   sheetObj2.SelectCell(i, "inv_post_dt",false);
						   return;
					   }
					   if(sheetObj2.GetCellValue(i, "inv_aply_xcrt") == ""){
						   //[Ex.Rate] is mandatory field.
						   alert(getLabel('FMS_COM_ALT007') + " \n- " + getLabel('FMS_COD_EXRT'));
						   sheetObj2.SelectCell(i, "inv_aply_xcrt",false);
						   return;
					   }
					   if(sheetObj2.GetCellValue(i, "gl_no") == ""){
						   //Add case, [G/L No.] is mandatory field.
						   alert(getLabel('FMS_COM_ALT007') + " \n- " + getLabel('FMS_COD_GLNO'));
						   sheetObj2.SelectCell(i, "gl_no",false);
						   return;
					   }
					   if(sheetObj2.GetCellValue(i, "curr_cd") == ""){
						   //Add case, [G/L No.] is mandatory field.
						   alert(getLabel('FMS_COM_ALT007') + " \n- " + getLabel('CURR'));
						   sheetObj2.SelectCell(i, "curr_cd",false);
						   return;
					   }
					   chkCnt += 1;
				   	   if(sheetObj2.GetCellValue(i, "sell_buy_tp_cd") == 'B'  && sheetObj2.GetCellValue(i, "buy_inv_no") == ""){
				   		   apVndInvNoNullCnt++;
				   	   }
				   }
				   
				   
			   }
			   if(formObj.f_grp_slip_no.value == ""){
				   if(chkCnt == 0){
					   //No Save Row Data!
					   alert(getLabel('FMS_COM_ALT007'));
					   return;
				   }
			   }
			   
			   //LHK, 20140429, 저장전 인보이스 변경여부 체크
			   if(!chkInvModiTms()){
				   return;
			   }
			   
			   // 저장전 Check 변경여부 체크
			   if(!chkJnrModiTms()){
				   return;
			   }
			   
			   //LHK, 20140428, Void 후 Save 시에 Void Amount Check
			   if(!chkVoidPayAmt(sheetObj1)){
				   return;
			   }
			   
			   var saveCfmFlg=false;
			   
		    	if(useClearVoid != "N"){
		    		
		    		for(var i=1; i<=sheetObj1.LastRow(); i++){
					   //Check No. 중복 여부 확인
						var chkNoVal=sheetObj1.GetCellValue(i, "m_chk_no");
						var jnrNoVal=sheetObj1.GetCellValue(i, "m_jnr_no");
						var bnkCdVal=sheetObj1.GetCellValue(i, "m_bank_seq");				
						
						// #46097 - Zimex | Duplicated Check Logic Inquiry
						var custCdVal = formObj.s_cust_cd.value;
						var jnrTpVal = sheetObj1.GetCellValue(i, "m_jnr_tp");
						
						//formObj.f_chk_no.value = formObj.f_chk_no.value.toUpperCase();
						ajaxSendPost(getDupCheckNo, 'reqVal', '&goWhere=aj&bcKey=getDupCheckNo&f_jnr_tp='+jnrTpVal+'&f_chk_no='+chkNoVal+'&f_jnr_no='+jnrNoVal+'&f_bank_cd='+bnkCdVal+'&f_cust_cd='+custCdVal, './GateServlet.gsl');
						
						//A. Check Pay 나 Deposit 시 A. Check No.가 없을 경우 : [Check No.] Missing. proceed anyway? 
					    if(chkNoVal == ""){
					    	saveCfmFlg=confirm(getLabel('ACC_COM_ALT012'));
					    	break;
					    //B. Duplicate Check No.가 존재할 경우 : [Check No.] Duplicated. proceed anyway?
						}else if(vDupCheckNo == chkNoVal){
							saveCfmFlg=confirm(getLabel('ACC_COM_ALT013'));
							break;
						}else{
							if(formObj.save_lock_yn.value == "Y"){
								saveCfmFlg=confirm(getLabel('FMS_COM_CFMSAVBLCK'));
								break;
							} else {
								saveCfmFlg=confirm(getLabel('FMS_COM_CFMSAV'));
								break;
							}
						}
				   }
				    
		    	}else{
		    		if(formObj.save_lock_yn.value == "Y"){
						saveCfmFlg=confirm(getLabel('FMS_COM_CFMSAVBLCK'));
					} else {
						saveCfmFlg=confirm(getLabel('FMS_COM_CFMSAV'));
					}
		    	}
				    
			   if(saveCfmFlg){
			   	   if(formObj.f_grp_slip_no.value == ""){
					   if(apVndInvNoNullCnt > 0){
						   saveCfmFlg = confirm(getLabel('ACC_COM_ALT014'));
					   }
				   }
			   }
			   
	           if(saveCfmFlg){
	        	   
	        	   // 수정할 경우 Currency 가 변경되었을 경우 JNR_NO를 변경해주기 위해 세팅
	        	   if(formObj.f_grp_slip_no.value != ""){
	    			   
	    			   for(var i=2; i<=sheetObj2.LastRow(); i++){
	    				   
	    				   if(sheetObj2.GetCellValue(i, "curr_cd") != sheetObj2.GetCellValue(i, "org_curr_cd")){
	    					   var jnr_no = "";
	        				   
	        				   for(var j=1; j<=sheetObj1.LastRow(); j++){
	        					   if(sheetObj1.GetCellValue(j, "m_curr_cd") == sheetObj2.GetCellValue(i, "curr_cd")){
	            					   jnr_no = sheetObj1.GetCellValue(j, "m_jnr_no");
	            					   break;
	            				   }
	        				   }
							   if(sheetObj2.GetCellValue(i, "ibflag") == "U"){
		        				   sheetObj2.SetCellValue(i, "jnr_no", jnr_no, 0);
		        			   }
	    				   }
	    				   
	            	   }
	   				}
	        	   
	    		   for(var i=1; i<=sheetObj1.LastRow(); i++){
	    			   var ex_gl_amt = Number(sheetObj1.GetCellValue(i, "m_ex_gl_amt"));
	    			   var org_ex_gl_amt = Number(sheetObj1.GetCellValue(i, "m_org_ex_gl_amt"));
	    			   
    				   if(ex_gl_amt != org_ex_gl_amt){
    					   
    					   ex_gl_amt = ex_gl_amt - org_ex_gl_amt;
	    				   
	    				   var gl_cd = "";
	    				   var gl_rmk = "";
	    				   
	    				   if(ex_gl_amt > 0){
	    					   gl_cd = formObj.gl_ex_profit.value;
	    					   gl_rmk = formObj.gl_ex_profit_nm.value;
	    				   } else {
	    					   gl_cd = formObj.gl_ex_loss.value;
	    					   gl_rmk = formObj.gl_ex_loss_nm.value;
	    				   }
	    				   
	    				   if(sheetObj1.GetCellValue(i, "m_jnr_tp") == "C"){
	    					   ex_gl_amt = ex_gl_amt * -1;
	    				   }
	    					
	    					var intRows=sheetObj2.LastRow() + 1;
	    					sheetObj2.DataInsert(intRows);
	    					
	    					sheetObj2.SetRowBackColor(intRows,"#EFEBEF");
	    		            
	    					sheetObj2.SetCellValue(intRows, "ex_gl_flag", 		"Y");
	    					sheetObj2.SetCellValue(intRows, "ofc_cd", 			UserOfcCd);
	    					sheetObj2.SetCellValue(intRows, "chk_flag", 		1);
	    					sheetObj2.SetCellValue(intRows, "curr_cd", 			sheetObj1.GetCellValue(i, "m_curr_cd"));
	    					sheetObj2.SetCellValue(intRows, "inv_aply_curr_cd", sheetObj1.GetCellValue(i, "m_curr_cd"));
	    					sheetObj2.SetCellValue(intRows, "trdp_cd", 			formObj.s_cust_cd.value);
	    					sheetObj2.SetCellValue(intRows, "inv_aply_xcrt", 	1);
	    					sheetObj2.SetCellValue(intRows, "clr_flag", 		"1");
	    					sheetObj2.SetCellValue(intRows, "gl_no", 			gl_cd);
	    					sheetObj2.SetCellValue(intRows, "gl_rmk", 			gl_rmk);
	    					sheetObj2.SetCellValue(intRows, "pay_amt", 			ex_gl_amt);
	    					sheetObj2.SetCellValue(intRows, "inv_post_dt", 		sheetObj1.GetCellValue(i, "m_post_dt"));
	    					sheetObj2.SetCellValue(intRows, "inv_xcrt_dt", 		sheetObj1.GetCellValue(i, "m_post_dt"));
	    					sheetObj2.SetCellValue(intRows, "inp_type",			"M");
	    				   
	    			   }
	    		   }
	    		   
    			   var sht2=sheetObj2.GetSaveString(false);	
	        	   var sht3=sheetObj3.GetSaveString(false);		//Bill Collecting List
	        	   var intRows3=sheetObj3.LastRow() + 1;
		           sheetObj3.DataInsert(intRows3);
		           
		           if(formObj.i_grp_slip_no.value == "" || formObj.i_grp_slip_no.value == "AUTO"){
		    		   formObj.i_grp_slip_no.value = "";
		    	   }
		           //#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
		           if(formObj.i_vchr_no.value == "" || formObj.i_vchr_no.value == "AUTO"){
		    		   formObj.i_vchr_no.value = "";
		    	   }		           
		           
		           // Use_Clear_Void옵션이 N의 경우 save할 때  deposit_dt를 Today로 셋팅
		           if(useClearVoid == "N"){
		        	   for(var i=1; i<=sheetObj1.LastRow(); i++){
		        		   if(sheetObj1.GetCellValue(i, "m_clr_yn") == "0"){
		        			   sheetObj1.SetCellValue(i, "m_clr_yn", "1");
		        		   }
		        	   }
		           }
		           sheetObj1.DoAllSave("./ACC_JOR_0800_1GS.clt", FormQueryString(formObj)+'&'+sht2+'&'+sht3, true);
	           }
    	   }
    	   break;
       case "DELETE":	//삭제
    	   frm1.f_cmd.value=REMOVE;
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   for(var i=1; i<=sheetObj1.LastRow(); i++){
        		   sheetObj1.SetCellValue(i, "m_ibflag","D");
    		   }
        	   for(var i=2; i<=sheetObj2.LastRow(); i++){
        		   sheetObj2.SetCellValue(i, "ibflag","D");
    		   }
        	   var sht3=sheetObj3.GetSaveString(false);		//Bill Collecting List
        	   var intRows3=sheetObj3.LastRow() + 1;
        	   sheetObj3.DataInsert(intRows3);
        	   sheetObj1.DoAllSave("./ACC_JOR_0800GS.clt", FormQueryString(formObj)+'&'+sht3, true);
           }
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		
  	        callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
     	break;
       	case "CUSTOMER_NAME":
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_cust_nm.value;
	   		rtnary[2]=window;
	   		
 	        callBackFunc = "CUSTOMER_POPLIST";
 	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	break;
       	case "PROFIT_REPORT":
	   	 	if(sheetObj2.GetTotalRows()== 0){
	   	 		//There is no data
  				alert(getLabel('FMS_COM_ALT004'));
			} else {
				var sRow=sheetObj2.GetSelectRow();
				
				if(sheetObj2.GetCellValue(sRow, "intg_bl_seq") == "") return;
				
				var reqParam='?intg_bl_seq=' + sheetObj2.GetCellValue(sRow, "intg_bl_seq");
				reqParam += '&ref_no=' + sheetObj2.GetCellValue(sRow, "ref_no");
				reqParam += '&air_sea_clss_cd=' + sheetObj2.GetCellValue(sRow, "air_sea_clss_cd");
				reqParam += '&bnd_clss_cd=' + sheetObj2.GetCellValue(sRow, "bnd_clss_cd");
				reqParam += '&biz_clss_cd=' + sheetObj2.GetCellValue(sRow, "biz_clss_cd");
				
				//#2353 [PATENT] PROFIT REPORT (SHIPMENT SUMMARY) - MULTIBANK DEPOSIT ERROR
				if(sheetObj2.GetCellValue(sRow, "biz_clss_cd") == "M"){
					reqParam += '&mbl_no=' + sheetObj2.GetCellValue(sRow, "bl_no");
					popGET('RPT_PRN_0180.clt'+reqParam, '', 1270, 750, "scroll:yes;status:no;help:no;");
				}else{
					reqParam += '&hbl_no=' + sheetObj2.GetCellValue(sRow, "bl_no");
					popGET('RPT_PRN_0200.clt' + reqParam, '', 1100, 750,"scroll:yes;status:no;help:no;");
				}
			}
   	 	break;	
        case "EXCEL":
        	if(sheetObj2.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			sheetObj2.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj2), SheetDesign:1,Merge:1,CheckBoxOnValue:"Y", CheckBoxOffValue:"N" });
    		}
        break;
    }
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
		formObj.s_cust_nm.value		= rtnValAry[2];
		formObj.s_inv_no.value 		= rtnValAry[0];
		
		doWork("SEARCHLIST");
    } 
}

function INVADD(rtnVal){
	var sheetObj=docObjects[1];
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var tmpValAry=rtnVal.split("^@");
		for(var i=0; i<tmpValAry.length-1; i++){
			var rtnValAry=tmpValAry[i].split("|");
			for(var j=2; j<=sheetObj.LastRow();j++){
				if(sheetObj.GetCellValue(j, "inv_seq") == rtnValAry[14] && sheetObj.GetCellValue(j, "inv_aply_curr_cd") == rtnValAry[4]){
					// Already exist Data!
					alert(getLabel('FMS_COM_ALT013'));
					return;
				}
			}
			var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
            sheetObj.SetRowBackColor(intRows,"#EFEBEF");
            sheetObj.SetCellBackColor(intRows, "del_chk","#FFFFFF");
            sheetObj.SetCellBackColor(intRows, "pay_amt","#FFFFFF");
            sheetObj.SetCellBackColor(intRows, "curr_cd","#FFFFFF");
    		sheetObj.SetCellBackColor(intRows, "inv_aply_xcrt","#FFFFFF");
    		sheetObj.SetCellBackColor(intRows, "chk_flag","#FFFFFF");
    		sheetObj.SetCellBackColor(intRows, "jnr_desc","#FFFFFF");
    		
    		sheetObj.SetCellEditable(intRows, "curr_cd",1);
    		sheetObj.SetCellEditable(intRows, "pay_amt",1);
    		sheetObj.SetCellEditable(intRows, "inv_aply_xcrt",1);
            sheetObj.SetCellEditable(intRows, "jnr_desc",1);
            
            sheetObj.SetCellValue(intRows, "inv_seq",rtnValAry[14]);
            sheetObj.SetCellValue(intRows, "inv_post_dt",rtnValAry[0]);
            sheetObj.SetCellValue(intRows, "inv_dt",rtnValAry[17]);
	        sheetObj.SetCellValue(intRows, "inv_due_dt",rtnValAry[18]);
            sheetObj.SetCellValue(intRows, "ofc_cd",rtnValAry[1]);
            sheetObj.SetCellValue(intRows, "inv_dept_cd",rtnValAry[2]);
            sheetObj.SetCellValue(intRows, "inv_tp",rtnValAry[3]);
            sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",rtnValAry[4]);
            sheetObj.SetCellValue(intRows, "curr_cd",rtnValAry[4]);
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
	        sheetObj.SetCellValue(intRows, "jnr_desc",rtnValAry[19]);
	        sheetObj.SetCellValue(intRows, "clr_flag","0");
	        sheetObj.SetCellValue(intRows, "inp_type","S");
	        sheetObj.SetCellValue(intRows, "inv_xcrt_dt",rtnValAry[17]);
	        sheetObj.SetCellValue(intRows, "inv_xcrt_sum_amt",rtnValAry[20]);
	        
	        if(Number(sheetObj.GetCellValue(intRows, "inv_sum_amt")) < 0){
				sheetObj.SetCellFontColor(intRows, "inv_sum_amt","#FF0000");
			}
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
		formObj.s_cust_nm.value=rtnValAry[2];
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
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
    
	var opt_key = "USE_CLEAR_VOID";
	ajaxSendPost(setUseClearVoid, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var param = UserOfcCd;
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt&searchOfcCd=' + param, './GateServlet.gsl');
	
	if(NEXT_BLOCK_DT != "") {
		var orgBlockDt=addDate('d', -1, NEXT_BLOCK_DT, "");			
		ORG_BLOCK_DT=orgBlockDt.substring(4,6) + "-" + orgBlockDt.substring(6,8) + "-" + orgBlockDt.substring(0,4);
	}
	
	getGlName();
	
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	
	docObjects[0].SetExtendLastCol(0);
	
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
	TODAY=year + month + date; 
	
	formObj.s_grp_slip_no.value=formObj.t_grp_slip_no.value;
	formObj.s_cust_cd.value=formObj.t_cust_cd.value;
	formObj.s_inv_no.value=formObj.t_inv_no.value;
	
	if(formObj.oa_flg.value != "Y"){
		formObj.s_ofc_cd.value = UserOfcCd;
	}
	
	if(formObj.s_grp_slip_no.value == ""){
    	//AUTO 표시
		formObj.i_grp_slip_no.value = "AUTO";
    }
	
	//#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
	if(formObj.i_vchr_no.value == ""){
    	//AUTO 표시
		formObj.i_vchr_no.value = "AUTO";
    }
	if(formObj.i_vchr_tp_cd.value == ""){
		formObj.i_vchr_tp_cd.value = "P"; //PAYMENT
	}		
	
	if(formObj.s_grp_slip_no.value != ""){
		doWork("SEARCH");
	} else {
		if(formObj.s_cust_cd.value != ""){
			formObj.s_cust_cd.focus();
			formObj.s_cust_cd.blur();
			setJnrMstGrid();
			doWork("SEARCHLIST");
		} else {
			setJnrMstGrid();
		}
	}
	
	/* 2016-12-12 자동완성 기능 추가 S */
	fnSetAutocompleteCallBack('s_cust_nm', 'CUSTOMER_POPLIST', 'LINER_POPLIST'); //Customer
	
	//#2115 [PATENT] Deposit/Payment for CN (ENTRY) 기능 보완
	if(copyFlag =='copy'){
		formObj.s_cust_cd.value    = c_cust_cd; 
		formObj.s_cust_nm.value    = c_cust_nm;
		formObj.s_inv_no.value     = c_inv_no;
		formObj.dept_chk1.checked  = c_dept_chk1 == "true" ? true : false; 
		formObj.dept_chk2.checked  = c_dept_chk2 == "true" ? true : false;
		formObj.dept_chk3.checked  = c_dept_chk3 == "true" ? true : false;
		formObj.his_chk1.checked   = c_his_chk1 == "true" ? true : false;
		formObj.his_chk2.checked   = c_his_chk2 == "true" ? true : false;
		formObj.s_type.value       = c_type;
		formObj.s_type_no.value    = c_type_no;				
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
	}
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
		case 1: //IBSheet1 init
			with (sheetObj) {
	       		SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	       		var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
	       		var headers = [ { Text:getLabel('ACC_JOR_0800_HDR1'), Align:"Center"} ];
	       		InitHeaders(headers, info);

	       		var cols = [ {Type:"Combo",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"m_jnr_tp",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		        	 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_curr_cd",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"m_rcv_amt",     	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:0,   EditLen:13},
	       		             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"m_coll_amt",    	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"m_org_coll_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"m_ex_gl_amt",   	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Combo",     Hidden:0,  Width:190,  Align:"Left",    ColMerge:1,   SaveName:"m_bank_seq",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"m_chk_no",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:20},
	       		             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"m_post_dt",     	KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
	       		             {Type:"Date",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"m_old_post_dt", 	KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
	       		             {Type:"CheckBox",  Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"m_clr_yn",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N"},
	       		             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"m_clr_dt",      	KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:8},
	       		             {Type:"CheckBox",  Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"m_void_yn",     	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N"},
	       		             {Type:"Text",      Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"m_old_void_yn",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
	       		             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"m_void_dt",     	KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:8},
	       		             {Type:"Date",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"m_old_void_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:8},
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_jnr_no",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_grp_slip_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_ofc_cd",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_trdp_cd",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_trdp_nm",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_clt_cmpl_flg",	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_cur_chk_no",		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_lst_chk_no",		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_jnr_yn",			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_cls_yn",			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_vchr_tp_cd",		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_vchr_no",			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"m_org_ex_gl_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_rcv_tp_cd",		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_rmk",		    	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	       		             {Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"m_ibflag",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
	        
	       		InitColumns(cols);
	       
	       		SetEditable(1);
	       		SetColProperty('m_jnr_tp', {ComboText:"R|P", ComboCode:"D|C"} );
	       		SetColProperty(0 ,"m_chk_no" , {InputCaseSensitive:1});
	       		SetSheetHeight(195);
	       		resizeSheet();
			}                                           
       break;
       case 2: //IBSheet2 init
    	   with (sheetObj) {
        		SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

        	    var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	    var headers = [ { Text:getLabel('ACC_JOR_0800_HDR2_1'), Align:"Center"},
		  		                { Text:getLabel('ACC_JOR_0800_HDR2_2'), Align:"Center"} ];
        	    InitHeaders(headers, info);

        	    var cols = [ {Type:"CheckBox",  Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, 	EditLen:-1,HeaderCheck:0 },
        	                 {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",            KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"Combo",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"PopupEdit", Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sls_usrid",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 ,  EditLen:12 },
        	                 {Type:"Text",      Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"PopupEdit", Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"gl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 ,  EditLen:20 },
        	                 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
        	                 {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
        	                 {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"buy_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
        	                 {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"inv_rmk",        	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },  //#2115 [PATENT] Deposit/Payment for CN (ENTRY) 기능 보완 
        	                 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"bal_sum_amt_1",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"Float",     Hidden:1,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"bal_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"pay_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:17 },
        	                 {Type:"CheckBox",  Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk_flag",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
        	                 {Type:"Combo",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",  		   	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
        	                 {Type:"Date",      Hidden:0,  Width:71,   Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_aply_xcrt",     KeyField:0,   CalcLogic:"",   Format:"Float",   	PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	                 {Type:"Float",     Hidden:1,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"ttl_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"Float",     Hidden:1,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"old_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	                 //#2115 [PATENT] Deposit/Payment for CN (ENTRY) 기능 보완 
        	                 {Type:"CheckBox",  Hidden:0,  Width:55,   Align:"Center",  ColMerge:1,   SaveName:"verify_flag",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N",HeaderCheck:0 },
        	                 {Type:"CheckBox",  Hidden:0,  Width:55,   Align:"Center",  ColMerge:1,   SaveName:"pay_flag",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N",HeaderCheck:0 },
        	                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"bl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
        	                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"ref_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
        	                 {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                 {Type:"Text",      Hidden:0,  Width:200,  Align:"left",    ColMerge:1,   SaveName:"jnr_desc",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	                 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_dept_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                 
        	                 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clr_flag",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"payto_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clr_gl",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_post_dt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_bank_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_clr_yn",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_clr_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_void_yn",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_void_dt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_chk_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_amt",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_rmk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inp_type",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"air_sea_clss_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cls_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cls_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clr_gl_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"bnd_clss_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"biz_clss_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"chk_pnt_yn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"payto_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"master_ofc_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_modi_tms",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"org_curr_cd",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"org_jnr_no",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
           	              	 {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ex_gl_flag",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 }];
        	        
        	    InitColumns(cols);
        	       
        	    SetEditable(1);
        	    SetColProperty("ofc_cd", {ComboText:OFCCD, ComboCode:OFCCD} );
        	       
        	    SetColProperty(0 ,"gl_rmk" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
        	    SetColProperty(0 ,"buy_inv_no" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
        	    SetColProperty(0 ,"bl_no" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
        	    SetColProperty(0 ,"ref_no" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
        	    SetSheetHeight(390);
        	    SetHeaderRowHeight(20);
   		        SetHeaderRowHeight(20);
        	    resizeSheet();
           }                                                      
       break;
       case 3: //IBSheet3 init
    	   with (sheetObj) {
	       		SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	       		var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	       		var headers = [ { Text:"inv_seq|ibflag2", Align:"Center"} ];
	       		InitHeaders(headers, info);
	
	       		var cols = [ {Type:"Text",      Hidden:0,  	Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	       		             {Type:"Status",    Hidden:0, 	Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag2",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	              
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

function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	doWork('SEARCHLIST');
	
	formObj.s_grp_slip_no.value = "";
	
	for(var i=1; i<=sheetObj.LastRow(); i++){
		sheetObj.SetRowBackColor(i,"#EFEBEF");
		sheetObj.SetCellBackColor(i, "m_rcv_amt","#FFFFFF");
		sheetObj.SetCellBackColor(i, "m_bank_seq","#FFFFFF");
		sheetObj.SetCellBackColor(i, "m_chk_no","#FFFFFF");
		sheetObj.SetCellBackColor(i, "m_clr_yn","#FFFFFF");
		sheetObj.SetCellBackColor(i, "m_clr_dt","#FFFFFF");
		sheetObj.SetCellBackColor(i, "m_void_yn","#FFFFFF");
		sheetObj.SetCellBackColor(i, "m_void_dt","#FFFFFF");
		
		var tmpBankAry=BK_CURR_CD.split("|");
		var bank_seq = "";
		var bank_nm = "";
		var first_bank_seq = "";
		
		for(var j=0; j<tmpBankAry.length; j++){
			var tmpBank=tmpBankAry[j].split("-");
			if(tmpBank[0] == sheetObj.GetCellValue(i, "m_curr_cd")){
				if(first_bank_seq == ""){
					first_bank_seq = tmpBank[1];
				}
				bank_seq += "|" + tmpBank[1];
				bank_nm += "|" + tmpBank[2];
			}
		}
		sheetObj.CellComboItem(i, "m_bank_seq", {ComboText:bank_nm, ComboCode:bank_seq} );
	}
	
	formObj.f_grp_slip_no.value = sheetObj.GetCellValue(1, "m_grp_slip_no");
	formObj.i_grp_slip_no.value = sheetObj.GetCellValue(1, "m_grp_slip_no");
	
	// #2068 - Document 번호 Title 에 반영
	setTabTitle(formObj.i_grp_slip_no.value);
		
	//51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
	formObj.f_ofc_cd.value=sheetObj.GetCellValue(1, "m_ofc_cd");
	
	formObj.i_vchr_tp_cd.value=sheetObj.GetCellValue(1, "m_vchr_tp_cd");
	formObj.i_vchr_no.value=sheetObj.GetCellValue(1, "m_vchr_no");
	formObj.i_rcv_tp_cd.value=sheetObj.GetCellValue(1, "m_rcv_tp_cd");
	//#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
	if(formObj.i_vchr_no.value == ""){
    	//AUTO 표시
		formObj.i_vchr_no.value = "AUTO";
    }		
	if(formObj.i_vchr_tp_cd.value == ""){
		formObj.i_vchr_tp_cd.value = "P"; //PAYMENT
	}		
	
	if(sheetObj.GetCellValue(1, "m_trdp_cd") != ""){
		formObj.s_cust_cd.value=sheetObj.GetCellValue(1, "m_trdp_cd");
		formObj.s_cust_nm.value=sheetObj.GetCellValue(1, "m_trdp_nm");
	}
	
	//#2623 [CLC] Add remark in Multi Bank Deposit-Payment Entry
	formObj.f_remark.value = sheetObj.GetCellValue(1, "m_rmk");
} 

function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
    	case "m_bank_seq" :
    		var tmpBankAry=BK_CURR_CD.split("|");
    		var cur_chk_no = "";
    		var lst_chk_no = "";
    		
    		for(var j=0; j<tmpBankAry.length; j++){
    			var tmpBank=tmpBankAry[j].split("-");
    			if(tmpBank[0] == sheetObj.GetCellValue(Row, "m_curr_cd") && tmpBank[1] == sheetObj.GetCellValue(Row, "m_bank_seq")){
    				cur_chk_no = tmpBank[3];
    				lst_chk_no = tmpBank[4];
    			}
    		}
    		sheetObj.SetCellValue(Row, "m_cur_chk_no", cur_chk_no);
    		sheetObj.SetCellValue(Row, "m_lst_chk_no", lst_chk_no);
    	break;
    	
    	case "m_rcv_amt" :
    		// Exchange Gain/Loss 계산
    		setExGainLoss(sheetObj, Row);
		break;	
		
    	case "m_coll_amt" :
    		// Exchange Gain/Loss 계산
    		setExGainLoss(sheetObj, Row);
		break;
		
    	case "m_org_coll_amt" :
    		// Type 세팅 (R/P)
    		if(sheetObj.GetCellValue(Row, "m_org_coll_amt") >= 0){
    			sheetObj.SetCellValue(Row, "m_jnr_tp", "D");
    		} else {
    			sheetObj.SetCellValue(Row, "m_jnr_tp", "C");
    		}
    		sheetObj.SetCellValue(Row, "m_coll_amt", Math.abs(sheetObj.GetCellValue(Row, "m_org_coll_amt")));
		break;
		
    	case "m_ex_gl_amt" :
    		
    		/*var sheetObj2 = docObjects[1];
    		var ex_gl_amt = Number(sheetObj.GetCellValue(Row, "m_ex_gl_amt"));
    		var dupCnt = 0;
    		
    		for(var i=2;i<=sheetObj2.LastRow();i++){
    			if(sheetObj.GetCellValue(Row, "m_curr_cd") == sheetObj2.GetCellValue(i, "curr_cd") && sheetObj2.GetCellValue(i, "ex_gl_flag") == "Y"){
    				if(ex_gl_amt == 0){
    					sheetObj2.RowDelete(i,false);
    				} else {
    					
    					if(ex_gl_amt > 0){
	     				   	gl_cd = formObj.gl_ex_profit.value;
	     				   	gl_rmk = formObj.gl_ex_profit_nm.value;
	     			   	} else {
	     			   		gl_cd = formObj.gl_ex_loss.value;
	     			   		gl_rmk = formObj.gl_ex_loss_nm.value;
	     			   	}
					
    					sheetObj2.SetCellValue(i, "gl_no", gl_cd);
    					sheetObj2.SetCellValue(i, "gl_rmk", gl_rmk);
    					sheetObj2.SetCellValue(i, "pay_amt", ex_gl_amt);
    					
    					if(ex_gl_amt > 0){
            				if(gl_cd == ""){
            					alert(getLabel('ACC_MSG152') + " \n- " + getLabel('FMS_COD_EXPRGL'));
            				}
          			   	} else {
          			   		if(gl_cd == ""){
          			   			alert(getLabel('ACC_MSG152') + " \n- " + getLabel('FMS_FMS_COD_EXLOGLCOD_EXPRGL'));
          			   		}
          			   	}
    				}
    				dupCnt++;
    			}
    		}
    		
    		if(dupCnt == 0){
    			if(ex_gl_amt != 0){
        			var gl_cd = "";
     			   var gl_rmk = "";
     			   
     			   if(ex_gl_amt > 0){
     				   gl_cd = formObj.gl_ex_profit.value;
     				   gl_rmk = formObj.gl_ex_profit_nm.value;
     			   } else {
     				   gl_cd = formObj.gl_ex_loss.value;
     				   gl_rmk = formObj.gl_ex_loss_nm.value;
     			   }
     			   
     			   if(sheetObj.GetCellValue(Row, "m_jnr_tp") == "C"){
     				   ex_gl_amt = ex_gl_amt * -1;
     			   }
     				
     				var intRows=sheetObj2.LastRow() + 1;
     				sheetObj2.DataInsert(intRows);
     				
     				sheetObj2.SetRowBackColor(intRows,"#EFEBEF");
     	            //sheetObj2.SetCellBackColor(intRows, "del_chk","#FFFFFF");
     	    		sheetObj2.SetCellBackColor(intRows, "ofc_cd","#FFFFFF");
     	    		sheetObj2.SetCellBackColor(intRows, "sls_usrid","#FFFFFF");
     	    		sheetObj2.SetCellBackColor(intRows, "gl_no","#FFFFFF");
     	    		sheetObj2.SetCellBackColor(intRows, "gl_rmk","#FFFFFF");
     	    		sheetObj2.SetCellBackColor(intRows, "buy_inv_no","#FFFFFF");
     	    		//sheetObj2.SetCellBackColor(intRows, "pay_amt","#FFFFFF");
     	    		//sheetObj2.SetCellBackColor(intRows, "curr_cd","#FFFFFF");
     	    		//sheetObj2.SetCellBackColor(intRows, "chk_flag","#FFFFFF");
     	    		sheetObj2.SetCellBackColor(intRows, "bl_no","#FFFFFF");
     	    		sheetObj2.SetCellBackColor(intRows, "ref_no","#FFFFFF");
     	    		sheetObj2.SetCellBackColor(intRows, "jnr_desc","#FFFFFF");
     	    		
     	    		sheetObj2.SetCellEditable(intRows, "del_chk",0);
     	    		sheetObj2.SetCellEditable(intRows, "ofc_cd",1);
     	            sheetObj2.SetCellEditable(intRows, "sls_usrid",1);
     	            sheetObj2.SetCellEditable(intRows, "gl_no",1);
     	            sheetObj2.SetCellEditable(intRows, "gl_rmk",1);
     	            sheetObj2.SetCellEditable(intRows, "buy_inv_no",1);
     	            sheetObj2.SetCellEditable(intRows, "pay_amt",0);
     	            sheetObj2.SetCellEditable(intRows, "inv_aply_xcrt",0);
     	            //sheetObj2.SetCellEditable(intRows, "curr_cd",1);
     	            sheetObj2.SetCellEditable(intRows, "chk_flag",0);
     	            sheetObj2.SetCellEditable(intRows, "bl_no",1);
     	            sheetObj2.SetCellEditable(intRows, "ref_no",1);
     	            sheetObj2.SetCellEditable(intRows, "jnr_desc",1);
     	    		
     				sheetObj2.SetCellValue(intRows, "ex_gl_flag",		 "Y");
     				sheetObj2.SetCellValue(intRows, "ofc_cd", 			 UserOfcCd);
     				sheetObj2.SetCellValue(intRows, "chk_flag", 		 1);
     				sheetObj2.SetCellValue(intRows, "curr_cd", 			 sheetObj.GetCellValue(Row, "m_curr_cd"));
     				sheetObj2.SetCellValue(intRows, "inv_aply_curr_cd",  sheetObj.GetCellValue(Row, "m_curr_cd"));
     				sheetObj2.SetCellValue(intRows, "trdp_cd", 			 formObj.s_cust_cd.value);
     				sheetObj2.SetCellValue(intRows, "inv_aply_xcrt", 	 1);
     				sheetObj2.SetCellValue(intRows, "clr_flag", 		 "1");
     				sheetObj2.SetCellValue(intRows, "gl_no", 			 gl_cd);
     				sheetObj2.SetCellValue(intRows, "gl_rmk", 			 gl_rmk);
     				sheetObj2.SetCellValue(intRows, "pay_amt", 			 ex_gl_amt);
     				sheetObj2.SetCellValue(intRows, "inv_post_dt", 		 sheetObj.GetCellValue(Row, "m_post_dt"));
     				sheetObj2.SetCellValue(intRows, "inv_xcrt_dt", 		 sheetObj.GetCellValue(Row, "m_post_dt"));
     				sheetObj2.SetCellValue(intRows, "inp_type",			 "M");
     				
     				if(ex_gl_amt > 0){
        				if(gl_cd == ""){
        					alert(getLabel('ACC_MSG152') + " \n- " + getLabel('FMS_COD_EXPRGL'));
        				}
      			   	} else {
      			   		if(gl_cd == ""){
      			   			alert(getLabel('ACC_MSG152') + " \n- " + getLabel('FMS_FMS_COD_EXLOGLCOD_EXPRGL'));
      			   		}
      			   	}
        		}
    		}*/
		break;
		
    	case "m_chk_no" :
    		chkNoChg(sheetObj, Row);
    	break;
    	
    	case "m_post_dt" :
    		checkPostDate(sheetObj, Row);
    		setPostDt(sheetObj, Row);
		break;
    	
	    case "m_clr_yn" :
	    	setDepositDate(sheetObj, Row);
	    	depositClick(sheetObj, Row);
    	break;
    	
	    case "m_clr_dt" :
	    	dateRangeGridValid(sheetObj, Row, "m_clr_dt", "Clear Date");
	    	chkDate(sheetObj, Row, "m_clr_dt", "m_clr_yn");
	    	checkDeposit(sheetObj, Row);
		break;
	    	
	    case "m_void_yn" :
	    	setVoidDate(sheetObj, Row);
	    	voidClick(sheetObj, Row)
    	break;
    	
	    case "m_void_dt" :
	    	dateRangeGridValid(sheetObj, Row, "m_void_dt", "Void Date");
	    	chkDate(sheetObj, Row, "m_void_dt", "m_void_yn");
	    	checkVoid(sheetObj, Row);
		break;
    }
}

//조회 후 페이지징 표시
function sheet2_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	
	formObj.s_grp_slip_no.value="";
	
	if (sheetObj.LastRow() == 0) {
		jnrStatusControl(sheetObj);
		setSearchCondition();
		return;
	}
	
	CURRCD = "";
	
	for(var i=1; i<=docObjects[0].LastRow(); i++){
		if(CURRCD.indexOf(docObjects[0].GetCellValue(i, "m_curr_cd")) == -1){
			CURRCD += '|' + docObjects[0].GetCellValue(i, "m_curr_cd");
		}
		
		//#2457 [PATENT] Multi Bank Deposit/Payment Enty, Invoice 기준으로 변경
		setPostDt(docObjects[0], i);
	}
	
	sheetObj.SetColProperty("curr_cd", {ComboText:CURRCD, ComboCode:CURRCD} );
	
	for(var i=2;i<=sheetObj.LastRow();i++){
		sheetObj.SetRowBackColor(i,"#EFEBEF");
		sheetObj.SetCellBackColor(i, "del_chk","#FFFFFF");
		sheetObj.SetCellBackColor(i, "chk_flag","#FFFFFF");
		sheetObj.SetCellBackColor(i, "pay_amt","#FFFFFF");
		sheetObj.SetCellBackColor(i, "curr_cd","#FFFFFF");
		sheetObj.SetCellBackColor(i, "inv_aply_xcrt","#FFFFFF");
		sheetObj.SetCellBackColor(i, "jnr_desc","#FFFFFF");
		
		if(Number(sheetObj.GetCellValue(i, "inv_sum_amt")) < 0){
			sheetObj.SetCellFontColor(i, "inv_sum_amt","#FF0000");
		}
		
		if(sheetObj.GetCellValue(i,"inp_type") == "S"){
			sheetObj.SetCellFont("FontUnderline", i,"buy_inv_no",i,"buy_inv_no",1);
			sheetObj.SetCellFontColor(i, "buy_inv_no","#0000FF");
		}
	}
	
	if(sheetObj.GetCellValue(2,"jnr_no") != "" ){
		for(var i=2;i<=sheetObj.LastRow();i++){
			sheetObj.SetCellValue(i, "chk_flag","1",0);
			sheetObj.SetCellEditable(i, "chk_flag",0);
			sheetObj.SetCellBackColor(i,"chk_flag","#EFEBEF");
			
			if(sheetObj.GetCellValue(i,"inp_type") == "M"){
				sheetObj.SetCellEditable(i, "sls_usrid",1);
				sheetObj.SetCellBackColor(i, "sls_usrid","#FFFFFF");
			}
			 
			sheetObj.SetRowFontColor(i,"#0000FF");
			
			if(Number(sheetObj.GetCellValue(i, "inv_sum_amt")) < 0){
				sheetObj.SetCellFontColor(i, "inv_sum_amt","#FF0000");
			}
			
			sheetObj.SetCellValue(i, "bal_sum_amt_1",Number(sheetObj.GetCellValue(i, "bal_sum_amt")) - Number(sheetObj.GetCellValue(i, "old_pay_amt")));
		}
	}else{
		for(var i=2;i<=sheetObj.LastRow();i++){
			sheetObj.SetCellEditable(i, "del_chk",0);
			sheetObj.SetCellBackColor(i,"del_chk","#EFEBEF");
		}
		sheetObj.SetFocusAfterProcess(0);
	}		
	
	jnrStatusControl(docObjects[0]);
	
	/****************  Search Condition Control ************************/ 	
	setSearchCondition();
	/*******************************************************************/

	fnbtnCtl();
} 

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	
	if(errMsg == undefined  || errMsg==null || errMsg ==''){
		showCompleteProcess();

	}
	
	formObj.s_grp_slip_no.value = "";
	formObj.s_inv_no.value 	= "";
	
	if (sheetObj.LastRow() == 0) {
		jnrStatusControl(sheetObj);
		setSearchCondition();
		return;
	}
	
	formObj.f_grp_slip_no.value=sheetObj.GetCellValue(1, "m_grp_slip_no");
	formObj.i_grp_slip_no.value=sheetObj.GetCellValue(1, "m_grp_slip_no");
	
	// #2068 - Document 번호 Title 에 반영
	setTabTitle(formObj.i_grp_slip_no.value);
	
	formObj.i_vchr_tp_cd.value=sheetObj.GetCellValue(1, "m_vchr_tp_cd");
	formObj.i_vchr_no.value=sheetObj.GetCellValue(1, "m_vchr_no");
	formObj.i_rcv_tp_cd.value=sheetObj.GetCellValue(1, "m_rcv_tp_cd");
	//#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
	if(formObj.i_vchr_no.value == ""){
    	//AUTO 표시
		formObj.i_vchr_no.value = "AUTO";
    }		
	if(formObj.i_vchr_tp_cd.value == ""){
		formObj.i_vchr_tp_cd.value = "P"; //PAYMENT
	}		
	
	for(var i=1; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellBackColor(i, "m_jnr_tp","#EFEBEF");
		sheetObj.SetCellBackColor(i, "m_curr_cd","#EFEBEF");
		sheetObj.SetCellBackColor(i, "m_coll_amt","#EFEBEF");
		sheetObj.SetCellBackColor(i, "m_ex_gl_amt","#EFEBEF");
		sheetObj.SetCellBackColor(i, "m_post_dt","#EFEBEF");
		
		var tmpBankAry=BK_CURR_CD.split("|");
		var bank_seq = "";
		var bank_nm = "";
		
		for(var j=0; j<tmpBankAry.length; j++){
			var tmpBank=tmpBankAry[j].split("-");
			if(tmpBank[0] == sheetObj.GetCellValue(i, "m_curr_cd")){
				bank_seq += "|" + tmpBank[1];
				bank_nm += "|" + tmpBank[2];
			}
		}
		sheetObj.CellComboItem(i, "m_bank_seq", {ComboText:bank_nm, ComboCode:bank_seq} );
	}
	
	doWork('SEARCHLIST');
	
	if(formObj.f_grp_slip_no.value != ""){
		if(sheetObj.GetCellValue(1, "m_trdp_cd") != ""){
			formObj.s_cust_cd.value=sheetObj.GetCellValue(1, "m_trdp_cd");
			formObj.s_cust_nm.value=sheetObj.GetCellValue(1, "m_trdp_nm");
		}
	}else{
		clearAll();
	}
	
	jnrStatusControl(sheetObj);
	
	/****************  Search Condition Control ************************/ 	
	setSearchCondition();
	/*******************************************************************/
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
var cur_row;
function sheet2_OnPopupClick(sheetObj, row, col){
	cur_row = row;
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	 if(colStr == "gl_no"){
		//GLCODE POPUP을 호출한다.
		rtnary = new Array();
   		rtnary[0] = "1";
   		rtnary[1] = "";
   		rtnary[2] = "";
   		callBackFunc = "sheet2_OnPopupClick_gl_no";
   		modal_center_open('./CMM_POP_0260.clt', rtnary, 658,450,"yes");
   		
	} else if(colStr == "sls_usrid"){
		rtnary=new Array(1);
		rtnary[0]="1";
		rtnary[1]="";
   		rtnary[2]=window;
   		callBackFunc = "sheet2_OnPopupClick_user";
   	    modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");  
	}
}
function sheet2_OnKeyDown(sheetObj, row, col, keyCode){
	cur_row = row;
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="gl_no" || sheetObj.ColSaveName(col)=="gl_rmk"){
			sheetObj.SelectCell(row, col);
			rtnary=new Array();
			rtnary[0]="GLRMK";
			rtnary[1]=sheetObj.GetCellValue(row, "gl_rmk");
			rtnary[2] = "";
			callBackFunc = "sheet2_OnKeyDown_gl_rmk";
	   		modal_center_open('./CMM_POP_0260.clt', rtnary, 658,450,"yes");
	   		
		}else if(sheetObj.ColSaveName(col)=="sls_usrid"){
			sheetObj.SelectCell(row, col);
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";
	   		rtnary[2]=window;
  	   		callBackFunc = "sheet2_OnPopupClick_user";
  	   	    modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
		}
	}
}

function sheet2_OnTab(sheetObj, Row, Col, ORow, OCol, isShift, isLast) {
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

function sheet2_OnPopupClick_gl_no(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[1].SetCellValue(cur_row, "gl_no",rtnValAry[0], 0);
		docObjects[1].SetCellValue(cur_row, "gl_rmk",rtnValAry[1], 0);
	}
	docObjects[1].SelectCell(cur_row, "gl_rmk", 0);
}

function sheet2_OnKeyDown_gl_rmk(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[1].SetCellValue(cur_row, "gl_no",rtnValAry[0], 0);
		docObjects[1].SetCellValue(cur_row, "gl_rmk",rtnValAry[1], 0);
	}
	docObjects[1].SelectCell(cur_row, "buy_inv_no", 0);
}

function sheet2_OnPopupClick_user(rtnVal){
	var formObj=document.frm1;
   	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		docObjects[1].SetCellValue(cur_row, "sls_usrid",rtnValAry[0]);
	}
}

function sheet2_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
		case "buy_inv_no" :
			var paramUrl="";
			var paramFrm="";
			var paramStr="";
			if(sheetObj.GetCellValue(Row, "buy_inv_no") != "")
			{
				var inp_type=sheetObj.GetCellValue(Row, "inp_type");
				var air_sea_clss_cd=sheetObj.GetCellValue(Row, "air_sea_clss_cd");
				var inv_tp=sheetObj.GetCellValue(Row, "inv_tp");
				
				if(air_sea_clss_cd == "G")
				{
					paramStr="./ACC_INV_0031.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, "inv_no"); // A/P(A&R)
					paramFrm="A/P Entry(G&A)";
				}else{
					if(inv_tp == 'A/R')
					{
						paramStr="./ACC_INV_0010.clt?f_cmd=-1&f_intg_bl_seq=&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, "inv_no"); // A/R
						paramFrm="A/R Entry";
					}else if(inv_tp == 'A/P')
					{
						paramStr="./ACC_INV_0030.clt?f_cmd=-1&f_intg_bl_seq=&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, "inv_no"); // A/P(COST)
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
			}
		 break;
		case "bl_no" :
		case "ref_no" :
			if(sheetObj.GetCellValue(Row, "intg_bl_seq") != ""){
				var air_sea_clss_cd=sheetObj.GetCellValue(Row, "air_sea_clss_cd");
				var bnd_clss_cd=sheetObj.GetCellValue(Row, "bnd_clss_cd");
				var biz_clss_cd=sheetObj.GetCellValue(Row, "biz_clss_cd");
				var bl_no=sheetObj.GetCellValue(Row, "bl_no");
				var intg_bl_seq=sheetObj.GetCellValue(Row, "intg_bl_seq");
				var ref_no=sheetObj.GetCellValue(Row, "ref_no");
				goBL(bnd_clss_cd, biz_clss_cd, intg_bl_seq,  air_sea_clss_cd, bl_no, ref_no);
			}else{
				if(sheetObj.GetCellValue(Row, "inv_dept_cd")=="WMS"){
					var paramStr="./WHM_WHM_0010.clt?f_cmd=-1&doc_ref_no="+sheetObj.GetCellValue(Row, "ref_no");
				    parent.mkNewFrame('Warehouse Doc Entry', paramStr, "WHM_WHM_0010_SHEET1");
				
				}else if(sheetObj.GetCellValue(Row, "inv_dept_cd")=="OTH"){
					var paramStr="./OTH_OPR_0010.clt?f_cmd=-1&ref_no="+sheetObj.GetCellValue(Row, "ref_no");
				    parent.mkNewFrame('MISC. Operation Entry', paramStr, "OTH_OPR_0010_SHEET1");
				}
			}
		break;
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet2_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "pay_amt" :
			if(sheetObj.GetCellValue(Row,"jnr_no") == ""){
				sheetObj.SetCellValue(Row, "pay_amt",sheetObj.GetCellValue(Row, "bal_sum_amt"));
			}
		break;
	}
}
function sheet2_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	// TODO: 
	switch (sheetObj.ColSaveName(Col)) {
		case "pay_amt" :
			var ex_rate=Number(sheetObj.GetCellValue(Row, "inv_aply_xcrt"));
			var pay_amt=Number(sheetObj.GetCellValue(Row, "pay_amt"));
			var old_pay_amt=Number(sheetObj.GetCellValue(Row, "old_pay_amt"));
			var inv_sum_amt=Number(sheetObj.GetCellValue(Row, "inv_sum_amt"));
			var bal_sum_amt=Number(sheetObj.GetCellValue(Row, "bal_sum_amt"));
			if(sheetObj.GetCellValue(1, "r_void_yn") == "Y"){
		    	bal_sum_amt=bal_sum_amt - old_pay_amt;
		    }
			if (sheetObj.GetCellValue(Row, "inp_type") != "M" 		//Input type 이 M 이 아니고 Credit, A/P 인 경우
				&& (sheetObj.GetCellValue(Row, "sell_buy_tp_cd") == 'C' || sheetObj.GetCellValue(Row, "sell_buy_tp_cd") == 'B')) {
     		   var amtComFlg=false;
     		  if(pay_amt < 0){
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
			    	alert(getLabel('ACC_MSG134'));
			    	sheetObj.SetCellValue(Row, "pay_amt",bal_sum_amt);
			    	return;
				}
		    }
			sheetObj.SetCellValue(Row, "ttl_pay_amt",ex_rate * pay_amt);
			
			var ttl_pay_amt=Number(sheetObj.GetCellValue(Row, "ttl_pay_amt"));
			if(Number(sheetObj.GetCellValue(Row, "ttl_pay_amt")) != 0){
				sheetObj.SetCellValue(Row, "chk_flag",1);
			}
		    if(inv_sum_amt != 0 || bal_sum_amt != 0){
 			    if(bal_sum_amt == pay_amt){
 			    	sheetObj.SetCellValue(Row,"clr_flag","1");
 			    }
 			    else{
 				    sheetObj.SetCellValue(Row,"clr_flag","0");
 			    }
		    }
		    
		    if (sheetObj.GetCellValue(Row, "inv_tp") != "") {
		    	if(sheetObj.GetCellValue(Row,"jnr_no") != "" ){
					sheetObj.SetCellValue(Row, "bal_sum_amt_1",(bal_sum_amt - pay_amt).toFixed(2));
				} else {
					sheetObj.SetCellValue(Row, "bal_sum_amt_1",(bal_sum_amt - pay_amt - old_pay_amt).toFixed(2));
				}
		    }
		    
		    setMstCollAmmt();
		    
		    break;
		case "curr_cd" :
			var m_curr_cd = "";
			var m_void_yn = "";
			var m_clr_yn = "";
			var m_clt_cmpl_flg = "";
			var m_post_dt = "";
			
			for(var i=1; i<=docObjects[0].LastRow(); i++){
				if(docObjects[0].GetCellValue(i, "m_curr_cd") == sheetObj.GetCellValue(Row, "curr_cd")){
					m_curr_cd = docObjects[0].GetCellValue(i, "m_curr_cd");
					m_void_yn = docObjects[0].GetCellValue(i, "m_void_yn");
					m_clr_yn = docObjects[0].GetCellValue(i, "m_clr_yn");
					m_clt_cmpl_flg = docObjects[0].GetCellValue(i, "m_clt_cmpl_flg");
					m_post_dt = docObjects[0].GetCellValue(i, "m_post_dt");
					break;
				}
			}
			
			if(m_void_yn == "1"){
				alert(getLabel('ACC_MSG156'));
				sheetObj.SetCellValue(Row, "curr_cd", sheetObj.GetCellValue(Row, "org_curr_cd"), 0);
				return;
			}
			
			if(m_clr_yn == "1"){
				alert(getLabel('ACC_MSG157'));
				sheetObj.SetCellValue(Row, "curr_cd", sheetObj.GetCellValue(Row, "org_curr_cd"), 0);
				return;
			}
			
			if(m_clt_cmpl_flg == "Y"){
				alert(getLabel('ACC_MSG155'));
				sheetObj.SetCellValue(Row, "curr_cd", sheetObj.GetCellValue(Row, "org_curr_cd"), 0);
				return;
			}
			
			//if(sheetObj.GetCellValue(Row, "inp_type") == "M"){  //#2457 [PATENT] Multi Bank Deposit/Payment Enty, Invoice 기준으로 변경
				sheetObj.SetCellValue(Row, "inv_post_dt", m_post_dt);
				sheetObj.SetCellValue(Row, "inv_xcrt_dt", m_post_dt);
			//}
			
			if(sheetObj.GetCellValue(Row, "inv_aply_curr_cd") != sheetObj.GetCellValue(Row, "curr_cd")){
				if (sheetObj.GetCellValue(Row, "inp_type") == "M") {
					sheetObj.SetCellValue(Row, "inv_aply_curr_cd", sheetObj.GetCellValue(Row, "curr_cd"));
					
					for(var i=1; i<=docObjects[0].LastRow(); i++){
						if(sheetObj.GetCellValue(Row, "curr_cd") == docObjects[0].GetCellValue(i, "m_curr_cd")){
							sheetObj.SetCellValue(Row, "inv_post_dt", docObjects[0].GetCellValue(i, "m_post_dt"));
							break;
						}
					}
				}else{
					
					/*var param = '';
					param += '&cur_dt=' + sheetObj.GetCellValue(Row, 'inv_xcrt_dt');
					param += '&trf_cur_cd=' + sheetObj.GetCellValue(Row, "inv_aply_curr_cd");
					param += '&ofccurr_cd=' + sheetObj.GetCellValue(Row, "curr_cd");
					
					ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');*/
					
					//#2457 [PATENT] Multi Bank Deposit/Payment Enty, Invoice 기준으로 변경
					var param = '';
					param += '&fm_curr_cd=' + sheetObj.GetCellValue(Row, 'inv_aply_curr_cd');
					param += '&to_curr_cd=' + sheetObj.GetCellValue(Row, 'curr_cd');
					param += '&f_curr_date=' + sheetObj.GetCellValue(Row, 'inv_xcrt_dt');
					
					ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getFincXchRtUt' + param, './GateServlet.gsl');				
					
					if(getXcrtRate == 0){
						getXcrtRate = 1;
					}
					
					sheetObj.SetCellValue(Row, "inv_aply_xcrt", getXcrtRate);
				}
			}else{
				sheetObj.SetCellValue(Row, "inv_aply_xcrt", 1);
			}
			
			setMstCollAmmt();
			
			break;
		case "inv_aply_xcrt" :
			setInvXcrtSumAmt(sheetObj, Row);
			
		    for(var i=2; i<=sheetObj.LastRow(); i++){
		    	if(Row != i){
		    		if(sheetObj.GetCellValue(i,"inv_aply_curr_cd") == sheetObj.GetCellValue(Row,"inv_aply_curr_cd") && 
		    				sheetObj.GetCellValue(i,"curr_cd") == sheetObj.GetCellValue(Row,"curr_cd") && 
		    				sheetObj.GetCellValue(i,"inv_xcrt_dt") == sheetObj.GetCellValue(Row,"inv_xcrt_dt")){
		    			sheetObj.SetCellValue(i, "inv_aply_xcrt", sheetObj.GetCellValue(Row, "inv_aply_xcrt"), 0);
		    			setInvXcrtSumAmt(sheetObj, i);
		    		}
		    	}
		    }
		    break;
		case "del_chk" :
			if(sheetObj.RowCount()> 0 && sheetObj.RowCount() == sheetObj.CheckedRows("del_chk")){
				alert(getLabel('ACC_MSG135'));
				sheetObj.SetCellValue(Row, 'del_chk',0,0);
				return;
			}
			
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
	    					sheetObj.SetCellValue(Row, "pay_amt",sheetObj.GetCellValue(Row, "bal_sum_amt"));
						}
					}
				}
			}
			if(sheetObj.GetCellValue(Row, "ibflag") == "I" && sheetObj.GetCellValue(Row, 'del_chk') == 1){
				sheetObj.RowDelete(Row,false);
			}
			break;
		case "chk_flag" :
			if(sheetObj.GetCellValue(Row, "chk_flag") == "1"){
				if(sheetObj.GetHeaderCheck(0, "chk_flag") != "1"){
					ajaxSendPost(getInvModiTms, 'reqVal', '&goWhere=aj&bcKey=searchInvModiTms&inv_seq='+sheetObj.GetCellValue(Row, "inv_seq"), './GateServlet.gsl');
					if (vInvModiTms != sheetObj.GetCellValue(Row, "modi_tms") && sheetObj.GetCellValue(Row, "modi_tms") != '') {
		    			alert(getLabel('ACC_MSG128')); 
		    			sheetObj.SetCellValue(Row, "chk_flag","0");
		    			return;
		    		}
				}
    			if(sheetObj.GetCellValue(Row, "clr_row") != "Y"){
    				if(Number(sheetObj.GetCellValue(Row, "pay_amt")) == 0){
    					sheetObj.SetCellValue(Row, "pay_amt",sheetObj.GetCellValue(Row, "bal_sum_amt"));
					}
				}
				sheetObj.SetCellValue(Row, "del_chk","0");
			}
			else{
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
					sheetObj.SetCellValue(Row, "pay_amt","");
				}
			}
			break;
		case "gl_no" :
			if(sheetObj.GetCellValue(Row, "gl_no") != ""){
				var gl_no  = sheetObj.GetCellValue(Row, "gl_no");
				var jnr_tp = "";

				SELECTROW = Row;
				ajaxSendPost(getGlRmk, 'reqVal', '&goWhere=aj&bcKey=getGlRmk&s_gl_no='+gl_no+'&jnr_tp='+jnr_tp, './GateServlet.gsl');
			}
			else{
				sheetObj.SetCellValue(Row, "gl_rmk","");
			}
			break;
		case "sls_usrid" :
			if(sheetObj.GetCellValue(Row, "sls_usrid") != ""){
				var sls_usrid  = sheetObj.GetCellValue(Row, "sls_usrid");
				var s_type="user";
				
				SELECTROW = Row;
				ajaxSendPost(getSlsUsrid, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+sls_usrid, './GateServlet.gsl');
			}
			else{
				sheetObj.SetCellValue(Row, "sls_usrid","");
			}
			break;
		case "buy_inv_no" :
			if(sheetObj.GetCellValue(Row, "inv_seq") == ""){
				sheetObj.SetCellValue(Row, "inv_no",sheetObj.GetCellValue(Row, "buy_inv_no"));
			}
			break;
			
		case "inv_xcrt_dt" :
			/*var param = '';
			param += '&cur_dt=' + sheetObj.GetCellValue(Row, 'inv_xcrt_dt');
			param += '&trf_cur_cd=' + sheetObj.GetCellValue(Row, "inv_aply_curr_cd");
			param += '&ofccurr_cd=' + sheetObj.GetCellValue(Row, "curr_cd");
			
			ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');*/
			
			//#2457 [PATENT] Multi Bank Deposit/Payment Enty, Invoice 기준으로 변경
			var param = '';
			param += '&fm_curr_cd=' + sheetObj.GetCellValue(Row, 'inv_aply_curr_cd');
			param += '&to_curr_cd=' + sheetObj.GetCellValue(Row, 'curr_cd');
			param += '&f_curr_date=' + sheetObj.GetCellValue(Row, 'inv_xcrt_dt');
			
			ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getFincXchRtUt' + param, './GateServlet.gsl');					
			
			if(getXcrtRate == 0){
				getXcrtRate = 1;
			}
			
			sheetObj.SetCellValue(Row, "inv_aply_xcrt", getXcrtRate);
		break;
	}
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
				formObj.s_cust_nm.value=masterVals[3];		//eng_nm   AS param2
			}else if(CODETYPE =="CUSTOMER2"){
				formObj.s_paid_cd.value=masterVals[0];
				formObj.s_paid_nm.value=masterVals[3];
			}else if(CODETYPE =="SAVE_CUSTOMER"){
				formObj.s_cust_cd.value=masterVals[0];	
				formObj.s_cust_nm.value=masterVals[3];		
			}else if(CODETYPE =="SAVE_CUSTOMER2"){
				formObj.s_paid_cd.value=masterVals[0];
				formObj.s_paid_nm.value=masterVals[3];
			}else if(CODETYPE =="ACCT_PAY_ORD"){
			}
		}else{
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value="";//trdp_cd  AS param1
				formObj.s_cust_nm.value="";//eng_nm   AS param2
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
	
	doShowProcess();
	var currLocUrl=this.location.href;
	currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
	currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
	window.location.href = currLocUrl;
}

function copy_condition(){
	var formObj=document.frm1;
	
	var prarm ="copyFlag=copy";
		prarm +="&c_cust_cd="+formObj.s_cust_cd.value; 
		prarm +="&c_cust_nm="+formObj.s_cust_nm.value;
		prarm +="&c_inv_no="+formObj.s_inv_no.value;
		prarm +="&c_dept_chk1="+formObj.dept_chk1.checked;
		prarm +="&c_dept_chk2="+formObj.dept_chk2.checked;
		prarm +="&c_dept_chk3="+formObj.dept_chk3.checked;
		prarm +="&c_his_chk1="+formObj.his_chk1.checked;
		prarm +="&c_his_chk2="+formObj.his_chk2.checked;
		prarm +="&c_type="+formObj.s_type.value;
		prarm +="&c_type_no="+formObj.s_type_no.value;
		
	var currLocUrl=this.location.href;
	currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
	currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?'+prarm;
	window.location.href = currLocUrl;	
}

/* Search Condition Control */
function setSearchCondition(){
	var formObj=document.frm1;
	if(formObj.f_grp_slip_no.value != ""){
		formObj.s_cust_cd.className="search_form-disable";
		formObj.s_cust_cd.readOnly=true;
		formObj.s_cust_cd.disabled=true;
		formObj.customer1.onclick="";
		formObj.customer1.style.cursor="";
		formObj.customer1.disabled=true;
		formObj.imgInvget.onclick	 = "";
		formObj.imgInvget.style.cursor 	= "";
		formObj.imgInvget.disabled=true;
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
		formObj.i_grp_slip_no.className="search_form-disable";
		formObj.i_grp_slip_no.readOnly=true;
		formObj.i_grp_slip_no.disabled=true;
		formObj.s_type.className="search_form-disable";
		formObj.s_type.readOnly=true;
		formObj.s_type.disabled=true;
		formObj.s_type_no.className="search_form-disable";
		formObj.s_type_no.readOnly=true;
		formObj.s_type_no.disabled=true;
		getBtnObj('btnSearch').style.display="none";
		getObj('searchInfo').style.width="100%";
 	}
}

function Copy(){
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	formObj.f_grp_slip_no.value="";
	formObj.s_grp_slip_no.value="";
	formObj.i_grp_slip_no.value="AUTO";
	formObj.i_grp_slip_no.className="search_form";
	formObj.i_grp_slip_no.readOnly=false;
	formObj.i_grp_slip_no.disabled = false;
	
	formObj.i_vchr_tp_cd.value = "P";  //#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
	formObj.i_vchr_tp_cd.disabled = false;
	
	formObj.i_vchr_no.value = "AUTO";  //#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
	formObj.i_vchr_no.className="search_form";
	formObj.i_vchr_no.readOnly=false;
	formObj.i_vchr_no.disabled = false;
	
	formObj.i_rcv_tp_cd.value = "";
	formObj.i_rcv_tp_cd.disabled = false;
	
	formObj.t_cust_cd.value="";
	formObj.t_inv_no.value="";
	formObj.t_inv_tp.value="";
	getBtnObj('btnModify').style.display ="inline";
	getBtnObj('btnSaveX').style.display ="inline";
	getObj('addBtn02').style.display = "inline";
	getObj('invBtn02').style.display = "none";
	
	formObj.f_ofc_cd.value = UserOfcCd;
	
	setJnrMstGrid();
	
	for(var i=sheetObj.LastRow(); i>1; i--){
		if(sheetObj.GetCellValue(i, "inv_seq") != ""){
			sheetObj.RowDelete(i, false);
		}
		sheetObj.SetCellValue(i, "ibflag","I");
		
		sheetObj.SetRowFontColor(i,"#000000");
		sheetObj.SetCellBackColor(i,"del_chk","#FFFFFF");
		sheetObj.SetCellBackColor(i,"ofc_cd","#FFFFFF");
		sheetObj.SetCellBackColor(i,"curr_cd","#FFFFFF");
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
        sheetObj.SetCellEditable(i, "ofc_cd",1);
        sheetObj.SetCellEditable(i, "curr_cd",1);
        sheetObj.SetCellEditable(i, "inv_aply_xcrt",1);
        sheetObj.SetCellEditable(i, "buy_inv_no",1);
        sheetObj.SetCellEditable(i, "pay_amt",1);
        sheetObj.SetCellEditable(i, "chk_flag",1);
        sheetObj.SetCellEditable(i, "gl_no",1);
        sheetObj.SetCellEditable(i, "gl_rmk",1);
        sheetObj.SetCellEditable(i, "ref_no",1);
        sheetObj.SetCellEditable(i, "bl_no",1);
        sheetObj.SetCellEditable(i, "jnr_desc",1);
        
        sheetObj.SetCellValue(i, "clt_cmpl_flg", "");
        sheetObj.SetCellValue(i, "jnr_yn", "");
        sheetObj.SetCellValue(i, "cls_yn", "");
	}
	jnrStatusControl(sheetObj);
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
	var sheetObj=docObjects[1];
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

/**
 * SLS_USRID 관린 코드조회
 */
function getSlsUsrid(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			
			sheetObj.SetCellValue(SELECTROW, "sls_usrid",masterVals[0]);
		}else{
			sheetObj.SetCellValue(SELECTROW, "sls_usrid","");
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}


function custEnterAction(obj, type){
	var formObj=document.frm1;
	if(event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}
		else if(type == "CUSTOMER_NAME"){
			doWork("CUSTOMER_NAME");
		}
	}
}
// 그리드 전체를 삭제하면 JOURNAL 를 삭제한다.
function checkDelete(){
	var sheetObj=docObjects[1];
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
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			vDupCheckNo=doc[1];
		}
	}
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
/**
 * #27585 [BINEX]Check/Deposit 수정 사항
 * Journal 상태를 확인 한다. Journal 상태에 따른 form, sheet 제어를 한다. 
 * "" : N/A, S:Save, C:Clear, V:Void, 
 * B:Block(Block 인 경우, sheet 만 제어하며, 위 상태에 따라 처리된다.)
 * @return
 */
function jnrStatusControl(sheetObj){
	for(var i=1;i<=sheetObj.LastRow();i++){
		var sts_cd = getJnrStsCd(sheetObj, i);
		changeEditable(sheetObj, i, sts_cd);
		authControl(sheetObj, i);
	}
}
function getJnrStsCd(sheetObj, Row){
	var formObj=document.frm1;
	var sts_cd="";
	if(formObj.f_grp_slip_no.value != ""){
		sts_cd='S';
		
		if(sheetObj.GetCellValue(Row, "m_clr_yn") == "1"){
			sts_cd='C';
		}
		if(sheetObj.GetCellValue(Row, "m_void_yn") == "1"){
			sts_cd='V';
		}
	}
	return sts_cd;
}

/*			
LHK, 20131218 QnA #22627 [BINEX]Deposit/Payment 시 이종 Currency 처리 문제
2) 인보이스 조회 시 인보이스의 Currency 가 Bank 의 Currency 와 다른 경우 Deposit/Payment 처리 안되도록 block 한다.
(Received, Payment 컬럼 disable, check box disable)
*/
function changeEditable(sheetObj, Row, sts_cd){
	var formObj=document.frm1;
	sheetObj.SetCellEditable(Row, "m_post_dt", 1);
	sheetObj.SetCellEditable(Row, "m_bank_seq", 1);
	sheetObj.SetCellEditable(Row, "m_void_yn", 0);
	sheetObj.SetCellEditable(Row, "m_void_dt", 0);
	
	sheetObj.SetCellBackColor(Row, "m_post_dt","#FFFFFF");
	sheetObj.SetCellBackColor(Row, "m_bank_seq","#FFFFFF");
	sheetObj.SetCellBackColor(Row, "m_void_yn","#EFEBEF");
	sheetObj.SetCellBackColor(Row, "m_void_dt","#EFEBEF");
	
	chkNoEditable(sheetObj, Row, sts_cd);
	
	// 2017.05.10 Clear 체크 시 – Check No. Validation 부분은 Warning 메시지로 변경.  Check No. 없이 저장될 수 있어야 함.
	/*if(sheetObj.GetCellValue(Row, "m_chk_no").length <= 0){
		sheetObj.SetCellEditable(Row, "m_clr_yn", 0);
		sheetObj.SetCellEditable(Row, "m_clr_dt", 0);
		sheetObj.SetCellBackColor(Row, "m_clr_yn","#EFEBEF");
		sheetObj.SetCellBackColor(Row, "m_clr_dt","#EFEBEF");
	}*/
	
	if(formObj.f_grp_slip_no.value != ""){
		sheetObj.SetCellEditable(Row, "m_post_dt", 0);
		sheetObj.SetCellBackColor(Row, "m_post_dt","#EFEBEF");
		
		if(sts_cd == "S"){
		}
		/* Payment 에서 Void 권한 추가 : Print 는 권한이 없는 경우 Clear 권한으로 처리되지만, 실제 Clear 처리 되지 않은 경우는 Void 허용 */
		if(sts_cd == "C" && sheetObj.GetCellValue(Row, "m_clr_yn") != "1"){
			if (formObj.vc_flg.value == "Y") {				
				sheetObj.SetCellEditable(Row, "m_void_yn", 1);
				sheetObj.SetCellEditable(Row, "m_void_dt", 1);
				sheetObj.SetCellBackColor(Row, "m_void_yn","#FFFFFF");
				sheetObj.SetCellBackColor(Row, "m_void_dt","#FFFFFF");
			}
		}	
		if(sts_cd == "S" || sts_cd == "V"){				
			if (formObj.vc_flg.value == "Y") {	
				sheetObj.SetCellEditable(Row, "m_void_yn", 1);
				sheetObj.SetCellEditable(Row, "m_void_dt", 1);
				sheetObj.SetCellBackColor(Row, "m_void_yn","#FFFFFF");
				sheetObj.SetCellBackColor(Row, "m_void_dt","#FFFFFF");
			}
		}	
		if (sts_cd == "C" || sts_cd == "V") {
			sheetObj.SetCellEditable(Row, "m_bank_seq", 0);
			sheetObj.SetCellBackColor(Row, "m_bank_seq","#EFEBEF");
			
			if(!(sts_cd == "C" && sheetObj.GetCellValue(Row, "m_clr_yn") != "1")){	// Payment "S" Status 에서 Print 한 경우 제외.
				sheetObj.SetCellEditable(Row, "m_clr_yn", 0);
				sheetObj.SetCellBackColor(Row, "m_clr_yn","#EFEBEF");
				sheetObj.SetCellEditable(Row, "m_clr_dt", 0);
				sheetObj.SetCellBackColor(Row, "m_clr_dt","#EFEBEF");
			}	
			
			sheetObj.SetCellEditable(Row, "m_rcv_amt", 0);
			sheetObj.SetCellBackColor(Row, "m_rcv_amt","#EFEBEF");
		}
	}
	
	setDepositVoid(sheetObj);
	
	for(var i=2;i<=docObjects[1].LastRow();i++){
		if(docObjects[1].GetCellValue(i,"jnr_no") != ""){
			if(docObjects[1].GetCellValue(i,"jnr_no") == sheetObj.GetCellValue(Row, "m_jnr_no")){
				if(sts_cd == "S"){
				}
				if(sts_cd == "C"){		
					docObjects[1].SetCellEditable(i, "pay_amt",0);
					docObjects[1].SetCellBackColor(i, "pay_amt","#EFEBEF");
				}
				if(sts_cd == "C" || sts_cd == "V"){		
					docObjects[1].SetCellEditable(i, "del_chk",0);
					docObjects[1].SetCellBackColor(i, "del_chk","#EFEBEF");
					docObjects[1].SetCellEditable(i, "inv_aply_xcrt",0);
					docObjects[1].SetCellBackColor(i, "inv_aply_xcrt","#EFEBEF");
					docObjects[1].SetCellEditable(i, "curr_cd",0);
					docObjects[1].SetCellBackColor(i, "curr_cd","#EFEBEF");
				}
				if (docObjects[1].GetCellValue(i,"inp_type") == "M" && (sts_cd == "S" || sts_cd == "C")) {
					docObjects[1].SetCellEditable(i, "gl_no",1);
					docObjects[1].SetCellBackColor(i, "gl_no","#FFFFFF");
					docObjects[1].SetCellEditable(i, "gl_rmk",1);
					docObjects[1].SetCellBackColor(i, "gl_rmk","#FFFFFF");
					docObjects[1].SetCellEditable(i, "ofc_cd",1);
					docObjects[1].SetCellBackColor(i, "ofc_cd","#FFFFFF");
				}
			}
		}
		// #25248 : inp_type 가 있는 M인 경우 만  editable
		if (docObjects[1].GetCellValue(i,"inp_type") == "M" ) {
			docObjects[1].SetCellEditable(i, "bl_no",1);
			docObjects[1].SetCellBackColor(i, "bl_no","#FFFFFF");
			docObjects[1].SetCellEditable(i, "ref_no",1);
			docObjects[1].SetCellBackColor(i, "ref_no","#FFFFFF");
			docObjects[1].SetCellEditable(i, "buy_inv_no",1);
			docObjects[1].SetCellBackColor(i, "buy_inv_no","#FFFFFF");
		}
	}
}

function chkNoEditable(sheetObj, Row, sts_cd){	
 	var formObj=document.frm1;
    //2016.04.18 C.W.Park Modified
	if(useClearVoid != "N"){
	 	if(sts_cd == "C" || sts_cd == "V"){
	 		sheetObj.SetCellEditable(Row, "m_chk_no", 0);
			sheetObj.SetCellBackColor(Row, "m_chk_no","#EFEBEF");
	 	}else{
	 		sheetObj.SetCellEditable(Row, "m_chk_no", 1);
			sheetObj.SetCellBackColor(Row, "m_chk_no","#FFFFFF");
	 	}
	}
}

/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 */
function authControl(sheetObj, Row){
 	var formObj=document.frm1;
 	//var sheetObj=docObjects[0];
 	// 1.Paid Amount 값이 >0 인지 체크
	var fileBolckYn=sheetObj.GetCellValue(Row, "m_clt_cmpl_flg") == "Y"?true:false;
	var jrnYn=sheetObj.GetCellValue(Row, "m_jnr_yn");
	var clsYn=sheetObj.GetCellValue(Row, "m_cls_yn");
 	//false 이면 Block 된 경우
 	var blockYn=true;
 	if (fileBolckYn) {
 		blockYn=false;	
 	}
 	/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.13 */
 	if (jrnYn == "Y" || clsYn =="Y") {
 		blockYn=false;
 	} 
 	editInputForm(sheetObj, Row, blockYn);
 	editSheet(sheetObj, Row, blockYn);
} 
/**
* Input Form 의 수정을 가능/불가 하게 한다
*/
function editInputForm(sheetObj, Row, flg){
	var formObj=document.frm1;
 	if (!flg) {
 		formObj.i_vchr_tp_cd.disabled = true;
 		
 		formObj.i_vchr_no.className = "search_form-disable";
 		formObj.i_vchr_no.readOnly = true;
 		formObj.i_vchr_no.disabled = true;
 		
 		formObj.i_rcv_tp_cd.disabled = true;
 		
 		sheetObj.SetCellEditable(Row, "m_chk_no", 0);
		sheetObj.SetCellEditable(Row, "m_rcv_amt", 0);
		sheetObj.SetCellEditable(Row, "m_bank_seq", 0);
		
		sheetObj.SetCellBackColor(Row, "m_chk_no","#EFEBEF");
		sheetObj.SetCellBackColor(Row, "m_rcv_amt","#EFEBEF");
		sheetObj.SetCellBackColor(Row, "m_bank_seq","#EFEBEF");
 	}
 	
	frm1.f_remark.disabled=!flg;  //#2623 [CLC] Add remark in Multi Bank Deposit-Payment Entry
	frm1.f_remark.readOnly=!flg;  //#2623 [CLC] Add remark in Multi Bank Deposit-Payment Entry
}
/**
* Sheet 의 수정을 가능/불가 하게 한다
*/
function editSheet(sheetObj, Row, flg){
	var sheetObj2=docObjects[1];
	
	for(var i=2;i<=sheetObj2.LastRow();i++){
		if(sheetObj.GetCellValue(Row, "m_jnr_no") == sheetObj2.GetCellValue(i, "jnr_no")){
			if(!flg){
				for(var j=0; j<=sheetObj2.LastCol(); j++){
					sheetObj2.SetCellEditable(i, j, 0);
					sheetObj2.SetCellBackColor(i, j, "#EFEBEF");
				}
			}
		}
	}
 	
 	sheetObj2.RenderSheet(2);
}

function setBlock_dt(sheetObj, Row){
	var formObj=document.frm1;
	
	sheetObj.SetCellValue(Row, "m_post_dt", TODAY);
	
	if(NEXT_BLOCK_DT != "") {
		if(sheetObj.GetCellValue(Row, "m_jnr_no") == ""){
			if(compareTwoDateYmd(NEXT_BLOCK_DT, sheetObj.GetCellValue(Row, "m_post_dt"))){
				sheetObj.SetCellValue(Row, "m_post_dt", NEXT_BLOCK_DT);
	 		}
			sheetObj.SetCellValue(Row, "m_old_post_dt", sheetObj.GetCellValue(Row, "m_post_dt"));
		}
	}
}

function getMaxBlockOrJnrNextDt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			NEXT_BLOCK_DT=doc[1];
		}else{
			NEXT_BLOCK_DT="";
		}
	}
}

/* LHK, 201404229 추가
 * 저장전 인보이스 변경여부 체크 */
function chkInvModiTms(){
	var returnVal=true;
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
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
	 				
	 			returnVal=false;
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
	var sheetObj=docObjects[1];
	
	for(var i=2;i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "jnr_no") != ""){
			var f_jnr_no = sheetObj.GetCellValue(i, "jnr_no");
			if(f_jnr_no != ""){
		 		ajaxSendPost(getJnrModiTms, 'reqVal', '&goWhere=aj&bcKey=searchJnrModiTms&jnr_no='+f_jnr_no, './GateServlet.gsl');
		 		if (vJnrModiTms != sheetObj.GetCellValue(i, "jnr_modi_tms") && sheetObj.GetCellValue(i, "jnr_modi_tms") != '') {
		 			returnVal=false;
		 		}
		 	}
		}
	}
 	if(!returnVal){
 		// Check 이 변경된 경우
		alert(getLabel('ACC_MSG147')); 
 	}
	return returnVal;
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
	rtnary[6]="";		//JOURNAL TYPE(DEPOSIT='D', CHECK='C')
	rtnary[7]=formObj.s_cust_nm.value;
	rtnary[8]="";//formObj.f_curr_cd.value;
	rtnary[9]="";//formObj.f_post_dt.value;
	rtnary[10]=call_val;
	callBackFunc = call_val;
	modal_center_open('./ACC_JOR_0500.clt', rtnary, 1150,500,"yes");
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.s_grp_slip_no.value = getParam(url,"s_grp_slip_no");
	
	doWork("SEARCH");
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
				+'&s_inv_no='+formObj.s_inv_no.value
				+'&dept_chk1='+dept_chk1
				+'&dept_chk2='+dept_chk2
				+'&dept_chk3='+dept_chk3
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
				formObj.s_cust_cd.value = rtnArr[1];
				formObj.s_cust_nm.value = rtnArr[2];
					
				doWork("SEARCHLIST");
			} else {
				searchInvList('INVGET');
			}
		} else {
			
		}
	}
}

//모든 데이터가 Delete 되는 Case에 대해 Validation 강화
function fncDelChkCount(curCol, curRow){
	var sheetObj=docObjects[1];
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
	
	setMstCollAmmt();
	
	// 지급금액이 발런스 금액과 같으면 클리어 처리한다.
	var inv_sum_amt=Number(sheetObj.GetCellValue(curRow, "inv_sum_amt"));
	var bal_sum_amt=Number(sheetObj.GetCellValue(curRow, "bal_sum_amt"));
	var ttl_pay_amt=Number(sheetObj.GetCellValue(curRow, "ttl_pay_amt"));
	
	sheetObj.SetCellValue(curRow, "inv_xcrt_sum_amt",ex_rate * inv_sum_amt);
	
    if(formObj.f_grp_slip_no.value != ""){
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

function getGlName(){
	ajaxSendPost(getGlExProfitNm, 'reqVal', '&goWhere=aj&bcKey=getGlRmk&s_gl_no='+frm1.gl_ex_profit.value+'&jnr_tp='+"", './GateServlet.gsl');
	ajaxSendPost(getGlExLossNm, 'reqVal', '&goWhere=aj&bcKey=getGlRmk&s_gl_no='+frm1.gl_ex_loss.value+'&jnr_tp='+"", './GateServlet.gsl');
}

function setJnrMstGrid(){
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	
	sheetObj.RemoveAll();
	
	var CURRCDS = CURRCD.split("|");
	for(var i=0; i<CURRCDS.length; i++){
		if(CURRCDS[i] != ""){
			var intRows=sheetObj.LastRow() + 1;
	        sheetObj.DataInsert(intRows);
	        sheetObj.SetCellValue(intRows, "m_curr_cd", CURRCDS[i]);
		}
	}
	
	for(var i=1; i<=sheetObj.LastRow(); i++){
		sheetObj.SetRowBackColor(i,"#EFEBEF");
		sheetObj.SetCellBackColor(i, "m_clr_yn","#FFFFFF");
		sheetObj.SetCellBackColor(i, "m_clr_dt","#FFFFFF");
		sheetObj.SetCellBackColor(i, "m_rcv_amt","#FFFFFF");
		sheetObj.SetCellBackColor(i, "m_bank_seq","#FFFFFF");
		sheetObj.SetCellBackColor(i, "m_post_dt","#FFFFFF");
		
		sheetObj.SetCellEditable(i, "m_clr_yn", 1);
		sheetObj.SetCellEditable(i, "m_clr_dt", 1);
		sheetObj.SetCellEditable(i, "m_rcv_amt", 1);
        sheetObj.SetCellEditable(i, "m_bank_seq", 1);
        sheetObj.SetCellEditable(i, "m_post_dt", 1);
        
        if(sheetObj.GetCellValue(i, "m_org_coll_amt") >= 0){
			sheetObj.SetCellValue(i, "m_jnr_tp", "D");
		} else {
			sheetObj.SetCellValue(i, "m_jnr_tp", "C");
		}
		
		var tmpBankAry=BK_CURR_CD.split("|");
		var bank_seq = "";
		var bank_nm = "";
		var first_bank_seq = "";
		
		for(var j=0; j<tmpBankAry.length; j++){
			var tmpBank=tmpBankAry[j].split("-");
			if(tmpBank[0] == sheetObj.GetCellValue(i, "m_curr_cd")){
				if(first_bank_seq == ""){
					first_bank_seq = tmpBank[1];
				}
				bank_seq += "|" + tmpBank[1];
				bank_nm += "|" + tmpBank[2];
			}
		}
		sheetObj.CellComboItem(i, "m_bank_seq", {ComboText:bank_nm, ComboCode:bank_seq} );
		sheetObj.SetCellValue(i, "m_bank_seq", first_bank_seq);
		
		if(useClearVoid != "N"){
			sheetObj.SetCellEditable(i, "m_chk_no", 1);
			sheetObj.SetCellBackColor(i, "m_chk_no","#FFFFFF");
			sheetObj.SetCellValue(i, "m_chk_no", sheetObj.GetCellValue(i, "m_cur_chk_no"));
		} else {
			sheetObj.SetCellEditable(i, "m_chk_no", 0);
			sheetObj.SetCellBackColor(i, "m_chk_no","#EFEBEF");
		}
		
		setBlock_dt(sheetObj, i);
	}
	
	setDepositVoid(sheetObj);
	
	sheetObj.SetSelectRow(1);
	sheetObj.SetBlur();
	
	formObj.s_cust_cd.focus();
}

function setExGainLoss(sheetObj, Row){
	sheetObj.SetCellValue(Row, "m_ex_gl_amt", Number(sheetObj.GetCellValue(Row, "m_org_ex_gl_amt")) + Number(sheetObj.GetCellValue(Row, "m_rcv_amt")) - Number(sheetObj.GetCellValue(Row, "m_coll_amt")));
}

function chkDate(sheetObj, Row, ColId, chk_ColId){
 	if(sheetObj.GetCellValue(Row, ColId) == ""){
 		sheetObj.SetCellValue(Row, chk_ColId, "0", 0);
 	}
} 

//Deposit Date를 입력하면 Deposit Check를 한다.
function checkDeposit(sheetObj, Row){
	var f_deposit_dt = sheetObj.GetCellValue(Row, "m_clr_dt");
	var f_post_dt = sheetObj.GetCellValue(Row, "m_post_dt");
	
	if(f_deposit_dt != ""){
		var temp_dt="";
		var temp_val="";
		
		//LHK 20131112, File Block_dt 와 Post Date, MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
		if(NEXT_BLOCK_DT != ""){
			if(compareTwoDateYmd(NEXT_BLOCK_DT, f_post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
				temp_dt=NEXT_BLOCK_DT;
			    temp_val='B';
			}else{
				temp_dt=f_post_dt;
				temp_val='P';
			}
		}else{
			temp_dt=f_post_dt;
			temp_val='P';
		}
		if(compareTwoDateYmd(temp_dt, f_deposit_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			sheetObj.SetCellValue(Row, "m_clr_dt", "", 0);
			
			temp_dt = temp_dt.substring(4,6) + "-" + temp_dt.substring(6,8) + "-" + temp_dt.substring(0,4);
			
			if(temp_val == 'B'){
				alert(getLabel2('ACC_MSG131',new Array(ORG_BLOCK_DT))); //The Void Date must be later than the block date (@)
			}else if(temp_val == 'P'){
				alert(getLabel('ACC_MSG127')); // The Deposit Date must be later than or equal to the Post date.
			}else if(temp_val == 'T'){
				alert(getLabel('ACC_MSG132')); // The Deposit Date must be later than or equal to the Today's date.
			}
		}
	}
	if(sheetObj.GetCellValue(Row, "m_clr_dt") == ""){
		sheetObj.SetCellValue(Row, "m_clr_yn", "0", 0);
	}else{
		sheetObj.SetCellValue(Row, "m_clr_yn", "1", 0);
	}
	depositClick(sheetObj, Row);
	return;
}
//Void Date를 입력하면 Void Check를 한다.
function checkVoid(sheetObj, Row){
	var temp_dt="";
	var temp_val="";
	
	var old_void_dt = sheetObj.GetCellValue(Row, "m_old_void_dt");
	var f_void_dt = sheetObj.GetCellValue(Row, "m_void_dt");
	var f_post_dt = sheetObj.GetCellValue(Row, "m_post_dt");
	var f_deposit_dt = sheetObj.GetCellValue(Row, "m_clr_dt");
	
	if(old_void_dt != f_void_dt && f_void_dt != ""){
		temp_dt=f_post_dt;
		temp_val='P';
		
		//LHK 20131112, File Block_dt 와 Post Date, MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
		if(NEXT_BLOCK_DT != ""){
			if(compareTwoDateYmd(NEXT_BLOCK_DT, f_post_dt)){						//f_post_dt 와 block_dt 비교, fromDate > toDate true
				temp_dt=NEXT_BLOCK_DT;
			    temp_val='B';
			}
			if(f_deposit_dt != ""){
				if(compareTwoDateYmd(f_deposit_dt, temp_dt)){						//f_deposit_dt 비교, fromDate > toDate true
					temp_dt=f_deposit_dt;
				    temp_val='C';
				}
			}
		}else{
			if(f_deposit_dt != ""){
				if(compareTwoDateYmd(f_deposit_dt, f_post_dt)){						//f_deposit_dt 비교, fromDate > toDate true
					temp_dt=f_deposit_dt;
				    temp_val='C';
				}
			}			
		}
		if(compareTwoDateYmd(temp_dt, f_void_dt)){						//f_void_dt, post_dt, block, today 와 비교, fromDate > toDate true
		    sheetObj.SetCellValue(Row, "m_clr_dt", old_void_dt, 0);
		    
		    temp_dt = temp_dt.substring(4,6) + "-" + temp_dt.substring(6,8) + "-" + temp_dt.substring(0,4);
		    
			if(temp_val == 'B'){
				alert(getLabel2('ACC_MSG129',new Array(ORG_BLOCK_DT))); //The Void Date must be later than the block date (@)
			}else if(temp_val == 'P'){
				alert(getLabel('ACC_MSG126')); // The Void Date must be later than or equal to the Post date.
			}else if(temp_val == 'C'){
				alert(getLabel2('ACC_MSG136',new Array("Deposit Date"))); //The Void Date must be later than or equal the @. [Deposit Date (01-01-2014)].
			}
		}
	}
	if(sheetObj.GetCellValue(Row, "m_void_dt") == ""){
		sheetObj.SetCellValue(Row, "m_void_yn", "0", 0);
	}else{
		sheetObj.SetCellValue(Row, "m_void_yn", "1", 0);
	}
	voidClick(sheetObj, Row);
	return;
}

/* #24673 LHK, 20131223, Deposit Check 시에 Void 할 수 없슴. */
function depositClick(sheetObj, Row) {
	/** LHK, 20140116, #25248 Customer Payment/Payment Entry 화면 수정사항-1 4.Void 권한 제어 **/
	voidProc(sheetObj, Row);
}
/* #24673 LHK, 20131223, Void Check 시에 Deposit 할 수 없슴. */
function voidClick(sheetObj, Row) {
	depositProc(sheetObj, Row);
}

/* #27436, LHK, 20140331 Code 정리 */
function depositProc(sheetObj, Row){
	//var depositFlag=false;	// false 비활성화, true 활성
	var depositFlag=true;	// false 비활성화, true 활성
	
	// 2017.05.10 Clear 체크 시 – Check No. Validation 부분은 Warning 메시지로 변경.  Check No. 없이 저장될 수 있어야 함.
	/*if (sheetObj.GetCellValue(Row, "m_chk_no").length > 0) {
		// 정원영 수정 #25248
		if (sheetObj.GetCellValue(Row, "m_clr_yn") == "0") {
			depositFlag=true;
		}else {
			depositFlag=false;
		}
	}*/
	if(sheetObj.GetCellValue(Row, "m_void_yn") == "1"){
		sheetObj.SetCellValue(Row, "m_clr_yn", "0", 0);
		sheetObj.SetCellValue(Row, "m_clr_dt", "", 0);
		depositFlag=false;
	}
	if(depositFlag){
		sheetObj.SetCellEditable(Row, "m_clr_yn",1);
		sheetObj.SetCellEditable(Row, "m_clr_dt",1);
		sheetObj.SetCellBackColor(Row, "m_clr_yn","#FFFFFF");
		sheetObj.SetCellBackColor(Row, "m_clr_dt","#FFFFFF");
	}else{
		sheetObj.SetCellValue(Row, "m_clr_yn", "0", 0);
		sheetObj.SetCellValue(Row, "m_clr_dt", "", 0);
		sheetObj.SetCellEditable(Row, "m_clr_yn",0);
		sheetObj.SetCellEditable(Row, "m_clr_dt",0);
		sheetObj.SetCellBackColor(Row, "m_clr_yn","#EFEBEF");
		sheetObj.SetCellBackColor(Row, "m_clr_dt","#EFEBEF");
	}
}
/* #27436, LHK, 20140331,  Acct Operation Bug 사전 예방, Void Flow 추가 
* Payment/Deposit 처리 시 Void 된 자료는 다시 Void 를 풀지 못하고 Block 되도록 로직 수정
* Deposit/Payment 자료를 생성하시는 경우에는 Void 항목을 아예 check 할 수 없도록 수정
*/
function voidProc(sheetObj, Row){
	var formObj=document.frm1;
	var voidFlag=false;	// false 비활성화, true 활성
	/** LHK, 20140116, #25248 Customer Payment/Payment Entry 화면 수정사항-1 4.Void 권한 제어 **/
	if (formObj.vc_flg.value == "Y") {
		voidFlag=true;
		if(sheetObj.GetCellValue(Row, "m_clr_yn") == "1"){
			sheetObj.SetCellValue(Row, "m_voidr_yn", "0", 0);
			sheetObj.SetCellValue(Row, "m_voidr_dt", "", 0);
			//void를 비활성화 한다.
			voidFlag=false;
		}
		if(formObj.f_grp_slip_no.value == ""){
			//void를 비활성화 한다.
			voidFlag=false;
		}
		if(voidFlag){
			sheetObj.SetCellEditable(Row, "m_void_yn",1);
			sheetObj.SetCellEditable(Row, "m_void_dt",1);
			sheetObj.SetCellBackColor(Row, "m_void_yn","#FFFFFF");
			sheetObj.SetCellBackColor(Row, "m_void_dt","#FFFFFF");
		}else{
			sheetObj.SetCellValue(Row, "m_void_yn", "0", 0);
			sheetObj.SetCellValue(Row, "m_void_dt", "", 0);
			sheetObj.SetCellEditable(Row, "m_void_yn",0);
			sheetObj.SetCellEditable(Row, "m_void_dt",0);
			sheetObj.SetCellBackColor(Row, "m_void_yn","#EFEBEF");
			sheetObj.SetCellBackColor(Row, "m_void_dt","#EFEBEF");
		}
	}
}

function setDepositDate(sheetObj, Row){
	if(sheetObj.GetCellValue(Row, "m_clr_yn") == "1"){
		if(sheetObj.GetCellValue(Row, "m_clr_dt") == ""){
			if(useClearVoid == "N"){
				// #1115 - [BNX] Deposit/Payment 자동 Clear시 Clear Date를 Post Date로 지정
				sheetObj.SetCellValue(Row, "m_clr_dt", sheetObj.GetCellValue(Row, "m_post_dt"), 0);
			} else {
				var f_post_dt = sheetObj.GetCellValue(Row, "m_post_dt");
				var f_clr_dt = "";
				
				if(NEXT_BLOCK_DT != ""){
					if(compareTwoDateYmd(NEXT_BLOCK_DT, f_post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
						f_clr_dt=NEXT_BLOCK_DT;
					}else{
						f_clr_dt=f_post_dt;
					}
					if(compareTwoDateYmd(TODAY, f_clr_dt)){						//TODAY 비교, fromDate > toDate true
						f_clr_dt=TODAY;
					}
				}else{
					if(compareTwoDateYmd(TODAY, f_post_dt)){						//TODAY 비교, fromDate > toDate true
						f_clr_dt=TODAY;
					}else{
						f_clr_dt=f_post_dt;
					}
				}
				sheetObj.SetCellValue(Row, "m_clr_dt", f_clr_dt, 0);
			}
		}
	} else {
		sheetObj.SetCellValue(Row, "m_clr_dt", "", 0);
	}
}

function setVoidDate(sheetObj, Row){
	if(sheetObj.GetCellValue(Row, "m_void_yn") == "1"){
		if(sheetObj.GetCellValue(Row, "m_void_dt") == ""){
			var f_post_dt = sheetObj.GetCellValue(Row, "m_post_dt");
			var f_void_dt = "";
			
			if(NEXT_BLOCK_DT != ""){
				if(compareTwoDateYmd(NEXT_BLOCK_DT, f_post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
					f_void_dt=NEXT_BLOCK_DT;
				}else{
					f_void_dt=f_post_dt;
				}
				if(compareTwoDateYmd(TODAY, f_void_dt)){						//TODAY 비교, fromDate > toDate true
					f_void_dt=TODAY;
				}
			}else{
				if(compareTwoDateYmd(TODAY, f_post_dt)){						//TODAY 비교, fromDate > toDate true
					f_void_dt=TODAY;
				}else{
					f_void_dt=f_post_dt;
				}
			}
			sheetObj.SetCellValue(Row, "m_void_dt", f_void_dt, 0);
			
		}
	} else {
		sheetObj.SetCellValue(Row, "m_void_dt", "", 0);
	}
}

function chkNoChg(sheetObj, Row) {
	depositProc(sheetObj, Row);
}

function setDepositVoid(sheetObj){
	if(useClearVoid == "N"){
		for(var i=1; i<=sheetObj.LastRow(); i++){
			sheetObj.SetCellBackColor(i, "m_chk_no","#EFEBEF");
			sheetObj.SetCellBackColor(i, "m_clr_yn","#EFEBEF");
			sheetObj.SetCellBackColor(i, "m_clr_dt","#EFEBEF");
			sheetObj.SetCellBackColor(i, "m_void_yn","#EFEBEF");
			sheetObj.SetCellBackColor(i, "m_void_dt","#EFEBEF");
			
			sheetObj.SetCellEditable(i, "m_chk_no", 0);
	        sheetObj.SetCellEditable(i, "m_clr_yn", 0);
	        sheetObj.SetCellEditable(i, "m_clr_dt", 0);
	        sheetObj.SetCellEditable(i, "m_void_yn", 0);
	        sheetObj.SetCellEditable(i, "m_void_dt", 0);
		}
	}
}

function checkPostDate(sheetObj, Row){
	var formObj=document.frm1;
	var post_dt = sheetObj.GetCellValue(Row, "m_post_dt");
	if(post_dt == ""){
		alert(getLabel('ACC_MSG125'));
		sheetObj.SetCellValue(Row, "m_post_dt", sheetObj.GetCellValue(Row, "m_old_post_dt"));
		sheetObj.SelectCell(Row, "m_post_dt", false);
		return;
	}
	//OnChange 시에 check 함
	if(post_dt == sheetObj.GetCellValue(Row, "m_old_post_dt")){
		return;
	}
	//Post Date 가 변경되는 경우에 NEXT_BLOCK_DT 보다 작으면 warnning massage 띄워줌
	if(NEXT_BLOCK_DT != "") {
		if(compareTwoDateYmd(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			alert(getLabel2('ACC_MSG119',new Array(ORG_BLOCK_DT)));	//The Post Date must be later than the block date (@)";
			sheetObj.SetCellValue(Row, "m_post_dt", sheetObj.GetCellValue(Row, "m_old_post_dt"));
			sheetObj.SelectCell(Row, "m_post_dt", false);
			return;
		}
	}
	if(sheetObj.GetCellValue(Row, "m_clr_dt") != ""){
		if(compareTwoDateYmd(sheetObj.GetCellValue(Row, "m_post_dt"), sheetObj.GetCellValue(Row, "m_clr_dt"))){ //post_dt 와 block_dt 비교, fromDate > toDate true
			alert(getLabel('ACC_MSG127'));	//The Deposit Date must be later than the block date (@)";
			sheetObj.SetCellValue(Row, "m_post_dt", sheetObj.GetCellValue(Row, "m_old_post_dt"));
			sheetObj.SelectCell(Row, "m_clr_dt", false);
			return;
		}
	}
	if(sheetObj.GetCellValue(Row, "m_void_dt") != ""){
		if(compareTwoDateYmd(sheetObj.GetCellValue(Row, "m_post_dt"), sheetObj.GetCellValue(Row, "m_void_dt"))){ //f_void_dt, post_dt 와 비교, fromDate > toDate true
			alert(getLabel('ACC_MSG126'));	//The Void Date must be later than or equal the Post date";
			sheetObj.SetCellValue(Row, "m_post_dt", sheetObj.GetCellValue(Row, "m_old_post_dt"));
			sheetObj.SelectCell(Row, "m_void_dt", false);
			return;
		}
	}
}

//POST DATE 변경시 INV_SEQ 가 없는 ROW의 POST_DATE 를 변경한다.
function setPostDt(sheetObj, Row){
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];
	for(var i=1; i<=sheetObj2.LastRow();i++){
		//#2457 [PATENT] Multi Bank Deposit/Payment Enty, Invoice 기준으로 변경
		if(/* sheetObj2.GetCellValue(i, "inv_seq") == "" && */sheetObj.GetCellValue(Row, "m_curr_cd") == sheetObj2.GetCellValue(i, "curr_cd")){
			sheetObj2.SetCellValue(i, "inv_post_dt", sheetObj.GetCellValue(Row, "m_post_dt"));
			sheetObj2.SetCellValue(i, "inv_xcrt_dt", sheetObj.GetCellValue(Row, "m_post_dt"));
		}
	}
}

function getGrpSlipNoCheck(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				grpSlipNoCheck=false;
				// Duplicated Data! - Slip No.
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_SLNO'));
				formObj.i_grp_slip_no.focus();
			}
			else{
				grpSlipNoCheck=true;
			}
		}
	}
	else{
		grpSlipNoCheck=false;
	}
}

var grpSlipBlockYn = "N";

function getJnrGrpSlipBlockCheck(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			if(doc[1] == "Y"){ // Block 처리된 경우
				grpSlipBlockYn = "Y"
			} else {
				grpSlipBlockYn = "N";
			}
		}
	}
}

/* LHK, 20140429
 * Void 이후 Save 할 경우, Void uncheck 시에 Pay amount 를 확인한다. 
 */
function chkVoidPayAmt(sheetObj){
	var returnVal=true;
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];
	
	for(var i=1;i<=sheetObj.LastRow();i++){
		var sts_cd = getJnrStsCd(sheetObj, i);
		if(sts_cd == "V" && (sheetObj.GetCellValue(i, "m_void_yn") == "0" || sheetObj.GetCellValue(i, "m_void_dt") == "")){
			for(var j=2;j<=sheetObj2.LastRow();j++){
				var inp_type=sheetObj2.GetCellValue(j, "inp_type");
				var sell_buy_tp_cd=sheetObj2.GetCellValue(j, "sell_buy_tp_cd");
				var amtComFlg=false;
				if(inp_type != "M" && (sell_buy_tp_cd == 'C' || sell_buy_tp_cd == 'B')){
					var pay_amt=Number(sheetObj2.GetCellValue(j, "pay_amt"));
					var old_pay_amt=Number(sheetObj2.GetCellValue(j, "old_pay_amt"));
					var bal_sum_amt=Number(sheetObj2.GetCellValue(j, "bal_sum_amt"));
					var inv_sum_amt=Number(sheetObj2.GetCellValue(j, "inv_sum_amt"));
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
		    		alert("[Invoice No. : " + sheetObj2.GetCellValue(j, "buy_inv_no") + "] \n" + getLabel('ACC_MSG134'));
		    		sheetObj.SetCellValue(i, "m_void_yn", "1");
		    		sheetObj.SetCellValue(i, "m_void_dt", sheetObj2.GetCellValue(j, "r_void_dt")); 
			    	returnVal=false;
			    	break;
				}
		 	}	
		}	
	}
	
	return returnVal;
}

function setMstCollAmmt(){
	for(var i=1; i<=docObjects[0].LastRow(); i++){
		var m_curr_cd = docObjects[0].GetCellValue(i, "m_curr_cd");
		
		var sum_coll_amt = 0;
		
		for(var j=2; j<=docObjects[1].LastRow(); j++){
			if(docObjects[1].GetCellValue(j, "del_chk") != "1"){
				if(m_curr_cd == docObjects[1].GetCellValue(j, "curr_cd")){
					sum_coll_amt += Number(docObjects[1].GetCellValue(j, "ttl_pay_amt"));
				}
			}
		}
		
		docObjects[0].SetCellValue(i, "m_org_coll_amt", sum_coll_amt);
	}
}
