//=========================================================
//*@FileName   : ACC_INV_0020.jsp
//*@FileTitle  : DB/CR
//*@Description: DB/CR
//*@author     : Chungrue - Cyberlogitec
//*@version    : 1.0 - 2011/11/14
//*@since      : 2011/11/14
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/06/19
//*@since      : 2014/06/19
//=========================================================
var rtnary=new Array(1);
var callBackFunc = "";
var bPaid=false;	//[20130401 OJG]
var SLIP_POST_DT="";
var ORG_BLOCK_POST_DT=""; //MAX(BLOCK_DT)
var BLOCK_POST_DT="";    // MAX(BLOCK_DT)+1
var ps_round = "D"; // ##50486 - [BNX] 반올림 처리 Default : D(내림)
var isSheetValChanged=false;
var isInputFormValChanged=false;
var isInvModiTmsOk=false; 
var isFrtModiTmsOk=false;
var onKeyDownFlg = true;
var creditOver = false;
//#6282 [JAPT] Debit/Credit screen enhancement point
var USE_OFC_BL_CURR_FLG = false;

//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
var GL_VIEW_FALG = "N";
//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
var XCRT_APP_FLAG = "N";

var vnCalRound = "Y";
//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
var TP_OVER_AMT_FLG = "";
//OFVFOUR-8099 [BEST OCEAN] REMOVING PRINT BUTTON WHEN THERE IS PRINT/L IN THE SAME SCREEN
var visiblePrint = false;

function doWork(srcName){
	
	// #1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
	setSaveConfirmMsg(srcName);
	//OFVFOUR-8099 [BEST OCEAN] REMOVING PRINT BUTTON WHEN THERE IS PRINT/L IN THE SAME SCREEN
	var srcNameUpper = srcName.toUpperCase();
	var isByPass = false
	if (visiblePrint && srcNameUpper == "PRINT") {
		isByPass = true
	}
	if(!btnGetVisible(srcName) && !isByPass){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    var sheetObj4=docObjects[3];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		   formObj = document.frm1;
		    frm1.f_cmd.value=-1;
//	        formObj.submit();
		    submitForm();
		    
			//#3159 [CLT] AWB - A/R Invoice Entry Unit 항목 중복 표시
			getUnitCd();
	   break;
	   case "SEARCH":
			var frmObject=document.frm1;
			if (frmObject.s_bl_no.value  != '') {
				enterBlCmmInfo('Y');
			} else if (frmObject.s_ref_no.value != '') {
				enterRefInfo('Y');
			} else if (frmObject.s_oth_no.value != '') {
				enterOtherInfo('Y');
			} else if (frmObject.s_inv_no.value != '') {
				enterInvInfo('Y');
			} 
		   break;
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            
            //검증로직
            if (formObj.f_inv_seq.value == "") {
        		if (MULTI_CURR_FLAG != "Y") {
        			getChkMulCur();
    				if (keyChkMulCur == "Y") {
    					  docObjects[0].DoSearch("./ACC_INV_0020GS.clt", FormQueryString(formObj) );
    				}
    			}else{  docObjects[0].DoSearch("./ACC_INV_0020GS.clt", FormQueryString(formObj) );}
    		}else{
    			  docObjects[0].DoSearch("./ACC_INV_0020GS.clt", FormQueryString(formObj) );
    		}
       break;
       case "SEARCHLIST01":
           formObj.f_cmd.value=SEARCHLIST01;
           //검증로직
           docObjects[2].DoSearch("./ACC_INV_0022GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST02":
           formObj.f_cmd.value=SEARCHLIST02;
           //검증로직
           docObjects[3].DoSearch("./ACC_INV_0023GS.clt", FormQueryString(formObj) );
       break;
       case "ROWADD":
    	    if(!rowaddChkVal()){
				return;
			}
    	    if(sheetObj.GetCellValue(sheetObj.LastRow() + 1, "frt_term_cd") == ""){
    	    	sheetObj.RemoveAll();
    	    }
    	    var intRows=sheetObj.LastRow() + 1;
    	    tempRow = intRows;
            sheetObj.DataInsert(intRows);
            if(formObj.f_intg_bl_seq.value != ""){
            	sheetObj.SetCellValue(intRows, "intg_bl_seq",formObj.f_intg_bl_seq.value);
            }
            else if(formObj.f_oth_seq.value != ""){
            	sheetObj.SetCellValue(intRows, "oth_seq",formObj.f_oth_seq.value);
            }
            sheetObj.SetCellValue(intRows, "frt_term_cd","CC");
            sheetObj.SetCellEditable(intRows, "frt_check",1);
        	sheetObj.SetCellValue(intRows, "frt_check","1");
        	
        	//#2557 [LBS]AR Entry / A/P Entry / D/C Entry 의 환율 Validation 추가                                   
        	//invoice 생성시 Invoice Date && Currency 값 없을시 inv_xcrt 누락(0) 수정
        	//inv_xcrt 0 벨리데이션으로 처리
        	//sheetObj.SetCellValue(intRows, "inv_xcrt",1); 	
        	
        	//#6282 [JAPT] Debit/Credit screen enhancement point
        	if (intRows > 2) {
        		if(USE_OFC_BL_CURR_FLG){
        			sheetObj.SetCellValue(intRows, "rat_curr_cd",formObj.f_curr_cd.value);
            		sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",formObj.f_curr_cd.value);
        		} else {
        			// 기존에 등록된 데이터가 있는경우
            		sheetObj.SetCellValue(intRows, "rat_curr_cd",sheetObj.GetCellValue(intRows-1, "rat_curr_cd"));
            		sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",sheetObj.GetCellValue(intRows-1, "inv_aply_curr_cd"));
        		}
        		//sheetObj.SetCellValue(intRows, "inv_xcrt",sheetObj.GetCellValue(intRows-1, "inv_xcrt"));
        		//sheetObj.SetCellValue(intRows, "inv_xcrt_dt",sheetObj.GetCellValue(intRows-1, "inv_xcrt_dt"));
        	} else {
        		
        		// 신규로 등록하는 경우
            	sheetObj.SetCellValue(intRows, "rat_curr_cd",formObj.f_curr_cd.value);
            	sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",formObj.f_curr_cd.value);
//        		sheetObj.SetCellValue(intRows, "rat_curr_cd",ofc_locl_curr_cd);
//            	sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",ofc_locl_curr_cd);
        		
            	//sheetObj.SetCellValue(intRows, "inv_xcrt",1);
            	/*if(MULTI_CURR_FLAG == "Y" && document.frm1.f_hbl_no.value != ""){
            		ajaxSendPost(getDefaultDate, 'reqVal', '&goWhere=aj&bcKey=getDefaultDate&f_intg_bl_seq='+frm1.f_intg_bl_seq.value, './GateServlet.gsl');
            	}*/
        	}
        	
        	sheetObj.SetCellValue(intRows, "inv_xcrt_dt",formObj.f_inv_dt.value);
        	
        	sheetObj.SetCellValue(intRows, "qty",'1');
        	sheetObj.SetCellValue(intRows, "sell_buy_tp_cd","D");
        	sheetObj.SetCellEditable(intRows, "credit_amt",0);
        	sheetObj.SetCellValue(intRows, "trdp_cd",formObj.f_agent_cd.value);
        	sheetObj.SetCellValue(intRows, "aply_ut_cd","UNIT");
        	break;
       case "MODIFY":	//등록
    	 //OFVFOUR-7147 [ACL US] Other BL deleted after invoice created
   		if(formObj.f_oth_seq.value != "" ){
   			checkExistedBL();
   			if(blExisted == false){
   				alert(getLabel('ACC_MSG173'));
   				return;
   			}
   		}else if(formObj.f_intg_bl_seq.value != "" ){
   			checkExistedBL();
   			if(blExisted == false){
   				alert(getLabel('ACC_MSG174'));
   				return;
   			}
   		}
          //#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
          if(edoa_flg =='N'){
            if(ofc_cd != frm1.f_ref_ofc_cd.value){
              alert(getLabel('ACC_MSG170')+'\n\n' + 'B/L Office: ' + frm1.f_ref_ofc_cd.value + ', Your Office: ' + ofc_cd);
              return;
            }
          }   
       
           //데이터 조회 후 생성하지 않았을 경우 경고 메세지
       	   if(formObj.f_inv_seq.value != ""){
       		   ajaxSendPost(getInvModiTms, 'reqVal', '&goWhere=aj&bcKey=searchInvModiTms&inv_seq='+formObj.f_inv_seq.value, './GateServlet.gsl');
       		  if (isInvModiTmsOk) {
       			  // 인보이스가 변경된 경우
          		   alert(getLabel('ACC_MSG128')); 
          		   return;
       		  }
	       }

       	   // [OFVFOUR-6997] - [Binex-LA] Balance mismatch issue: check freight has invoice
       	   //OFVFOUR-7986: [AIF] OPUS Error question - Inv no :AWI9200
           if(formObj.f_intg_bl_seq.value != "" && formObj.f_inv_seq.value == ""){
               var chk_fr_frt_seq=formObj.chk_fr_frt_seq.value;
               ajaxSendPost(checkFrtModiTms, 'reqVal', '&goWhere=aj&bcKey=searchFrtModiTms&frt_seq='+chk_fr_frt_seq, './GateServlet.gsl');
               if(isFrtModiTmsOk) {
                   alert(getLabel('ACC_MSG128'));
                   return;
               }
           }

       	   //52036
       	   // #553 EDIT BL WITH OVERLIMITED TP 
       	   if (creditOver && frm1.credit_flg.value =="N") {
       		   //Selected trade partner has exceed its credit limit. 
       		   //You are not authorized issue any document(s) when credit limit is exceeded. 
       		   //Please update trade partner’s credit limit or have authorized user issue the document(s).
       		   alert(getLabel('COM_FRT_CFM009'));
       		   return;
       	   }
       	   
           //#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
           if(formObj.f_vchr_no.value == "" || formObj.f_vchr_no.value == "AUTO"){
    		   formObj.f_vchr_no.value = "";
    	   }	     	   
       	   
    	   //그리드 전체삭제시 invoice 를 삭제한다.
    	   if(!checkDelete()){
    		   doWork("DELETE");
    	   }
    	   else{ 
    		   frm1.f_cmd.value=MODIFY;
        	   // frt 에 저장되는 post_dt의 값을 분리해야한다(#20443)
        	   //formObj.f_edit_post_dt.value = formObj.f_post_dt.value;
    		   //TODO  아무 권한이 없을때 POST_DT를 넣어야 하는지 BLOCK_DT를 넣어야 하는지에 따라 이하의 값 설정 필요
       		   //formObj.f_edit_post_dt.value = formObj.f_post_dt.value;
       		   formObj.f_edit_post_dt.value=addDay(formObj.block_post.value, 1);
        	   // Deposit/Payment 이후 수정시 Amout금액 체크
        	   if (isSheetValChanged) {
        		   /**** 중요  LHK, 20140421  Credit, Debit 인 경우만 처리됨. ****************************************************************/
        		   // LHK, 20140421 amount 비교 Validation 은 삭제 하고, Debit -> Credit, Credit -> Debit 일 경우 Paid 된경우 Paid Amount 를 조정해 준다.
   				   var f_debit_tot=parseFloat(eval((formObj.f_debit_tot.value).replaceAll(",","")));
   				   var f_credit_tot=parseFloat(eval((formObj.f_credit_tot.value).replaceAll(",",""))); 
   				   var paidAmt=parseFloat(eval((formObj.f_paid_amt.value).replaceAll(",","")));
        		   var inv_tp="D";
        		   if(f_debit_tot - f_credit_tot < 0){	 
        			   inv_tp="C";
        		   }	
        		   if(paidAmt != 0 && inv_tp != formObj.f_old_inv_tp.value){ // 다른 경우 Paid Amount 조정 
        			   formObj.f_paid_amt.value=doMoneyFmt(paidAmt * -1);
        		       formObj.f_inv_chg_flg.value='Y';
        		   }else{
        			   formObj.f_inv_chg_flg.value='N';
        		   } 
        		   /************************************************************************************************************************/
        		   // LHK 20140327, amount due 가 - 인 경우 비교로직 추가
        		   /*** LHK, 20140421 amount 비교 Validation 은 삭제 
        		   var paidAmt=parseFloat(eval((formObj.f_paid_amt.value).replaceAll(",","")));
   				   var amtDue=parseFloat(eval((formObj.f_amt_due.value).replaceAll(",","")));
   				   var totAmt=parseFloat(eval((formObj.f_totamt_tot.value).replaceAll(",","")));
        		   var amtComFlg=false;
         		   if (paidAmt != 0){
    	    		   if(amtDue < 0){
    	    			   if(inv_tp == "D"){
	    	    			   if (Math.abs(totAmt) < Math.abs(paidAmt)) {
	    	    				   amtComFlg=true;
	    	    			   }	
    	    			   }else{
    	    				   if (Math.abs(totAmt) > Math.abs(paidAmt)) {
	    	    				   amtComFlg=true;
	    	    			   }
    	    			   }
    	  			   }else{
    	  				   if(inv_tp == "D"){
    	  					 	if (totAmt < paidAmt) {
    	  					 		amtComFlg=true;
      	  				   		}	
	  	    			   }else{
	  	    				    if (totAmt > paidAmt) {
	    	  					   amtComFlg=true;
	    	  				    }
	  	    			   }
    	  			   }
    			   }
        		   if (amtComFlg) {
        			   alert(getLabel('ACC_MSG118'));
        			   //return;
        		   }
        		   */
        		   // DC는 ROW ADD 하지 않기 때문에 POST_DT값으로 설정 
        		   // Edit_post_dt의 값은 Form의 Post Date과 MAX(Block_DT)+1중 큰값으로 세팅 
        		   //if (!checkPostDt()) {
        		   //	   formObj.f_edit_post_dt.value = formObj.f_post_dt.value;
        		   //}
        	   } 
        	   // File Block 이후 수정시 Post Date 체크 => post date를 변경시에 체크하도록 변경
        	   /*
        	   if (isInputFormValChanged) {
var blockDt=sheetObj.GetCellValue(2, "block_dt");
        		   var blockDtPrn=blockDt.substr(0,2)+"/" + blockDt.substr(2,2)+ "/" + blockDt.substr(4,4);
        		   var curPostDt=(formObj.f_post_dt.value).replaceAll("-","");
        		   if (!checkPostDt()) {
        			   alert(getLabel2('ACC_MSG119',new Array(blockDtPrn)));
        			   return;
        		   }
        	   }
        	   */
        	   // 권한에 의한 수정이 아니면 paid amt를 체크한다
    		   if (!isSheetValChanged && !isInputFormValChanged) {
	    		   //-----[20130401 OJG]-----
	               if(frm1.f_inv_seq.value != ''){
	               		bPaid=false;
	               		ajaxSendPost(getInvoicePayAmt, 'reqVal', '&goWhere=aj&bcKey=getInvoicePayAmt&inv_seq='+frm1.f_inv_seq.value, './GateServlet.gsl');
	               		if(bPaid){
	               			//execMagam();
	               			doWork("SEARCHLIST");
	               			return;
	               		}
	               }
	               //-----[20130401 OJG]-----
    		   }
               //필수항목체크
               if(checkVal()){
            	   if(confirm(getLabel(saveMsg))){
            		   // 다시한번 널 체크 한다.
	           			if(formObj.f_inv_dt.value == ""){
	           				//[Invoice Date] is mandatory field.
	           				alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('FMS_COD_INVOICEDT'));
	           				
	           				formObj.f_inv_dt.focus();
	           				return false;
	           			}
	           		   
	           		   if (formObj.f_due_dt.value =='') {
	           			   //[Due Date] is mandatory field.
	           			   alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('FMS_COD_DUEDT'));
	           			   
	           			   formObj.f_due_dt.focus();
	           			   return false;
	           		   }
            		   
            		   calcFrgnAmt();
            		   
     	           	   //#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영 
     	           	   if(GL_VIEW_FALG == "Y"){
     	           		   if(!setExRateLocl()){
     	           			   return;
     	           		   }
     	           	   }		
    	           	   
            		   //------------[20140112 OJG] 총 금액이 0일 경우에는 0 Check 타지 않음 -------------------
            		   if(eval(removeComma(formObj.f_totamt_tot.value)) != 0){
            			   isZeroAmt();
            		   }
            		   //------------[20140112 OJG]-------------------------------------------------
            		   /*
            		   var debit_amt=0;
            		   var credit_amt=0;
            		   for(var i=2; i<=sheetObj.LastRow(); i++){
debit_amt=Number(sheetObj.GetCellValue(i, "debit_amt"));
credit_amt=Number(sheetObj.GetCellValue(i, "credit_amt"));
            			   if(debit_amt >= credit_amt){
            				   sheetObj.SetCellValue(i, "sell_buy_tp_cd","D");
            			   }else{
            				   sheetObj.SetCellValue(i, "sell_buy_tp_cd","C");
            			   }
            		   }
            		   */
            		   if(formObj.f_tax_bill.checked){
    	           		   formObj.f_tax_bill.value="Y";
    	           	   }
                	   formObj.f_amt_tot.value=removeComma(formObj.f_amt_tot.value);
    	           	   formObj.f_vatamt_tot.value=removeComma(formObj.f_vatamt_tot.value);
    	           	   formObj.f_totamt_tot.value=removeComma(formObj.f_totamt_tot.value);
    	           	   formObj.f_paid_amt.value=removeComma(formObj.f_paid_amt.value);
    	           	   formObj.f_debit_tot.value=removeComma(formObj.f_debit_tot.value);
    	           	   formObj.f_credit_tot.value=removeComma(formObj.f_credit_tot.value);
    	           	   formObj.f_old_sum_amt.value=removeComma(formObj.f_old_sum_amt.value);
    	           	   var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
    	           	   var intRows2=sheetObj2.LastRow() + 1;
	    	           sheetObj2.DataInsert(intRows2);
	    	           sheetObj.DoAllSave("./ACC_INV_0020GS.clt", FormQueryString(formObj)+'&'+sht2, true);
                   }
               }
    	   }
    	   break;
       case "DELETE":	//삭제
           //데이터 조회 후 생성하지 않았을 경우 경고 메세지
       	   if(formObj.f_inv_seq.value != ""){
       		   ajaxSendPost(getInvModiTms, 'reqVal', '&goWhere=aj&bcKey=searchInvModiTms&inv_seq='+formObj.f_inv_seq.value, './GateServlet.gsl');
       		  if (isInvModiTmsOk) {
       			  // 인보이스가 변경된 경우
          		   alert(getLabel('ACC_MSG128')); 
          		   return;
       		  }
	       }
    	   if(frm1.f_inv_seq.value != ""){
    		   frm1.f_cmd.value=REMOVE;
               if(confirm(getLabel('FMS_COM_CFMDEL'))){
            	   for(var i=2; i<=sheetObj.LastRow(); i++){
            		   sheetObj.SetCellValue(i,"ibflag","D");
            	   }
            	   formObj.f_amt_tot.value=removeComma(formObj.f_amt_tot.value);
	           	   formObj.f_vatamt_tot.value=removeComma(formObj.f_vatamt_tot.value);
	           	   formObj.f_totamt_tot.value=removeComma(formObj.f_totamt_tot.value);
	           	   formObj.f_debit_tot.value=removeComma(formObj.f_debit_tot.value);
	           	   formObj.f_credit_tot.value=removeComma(formObj.f_credit_tot.value);
	           	   formObj.f_old_sum_amt.value=removeComma(formObj.f_old_sum_amt.value);
            	   sheetObj.DoSave("ACC_INV_0020GS.clt", FormQueryString(formObj),"ibflag",false);
            	   //화면초기화
            	   clearAll();
               }
    	   }
    	   break;
       case "PSCAL":
    	   var intRows=sheetObj.LastRow() + 1;
    	   var chkCnt=0;
    	   var frt_cd;
    	   var frt_term_cd;
    	   var aply_ut_cd;
    	   var cntr_tpsz_cd;
    	   var qty;
    	   var ru;
    	   var trf_cur_sum_amt //QTY
    	   var vat_rt;
    	   var vat_amt;
    	   var rat_curr_cd;
    	   var inv_xcrt;
    	   var inv_xcrt_dt;
    	   var sell_buy_tp_cd;
    	   var ps_share=Number(formObj.f_profit_share.value);
    	   var curr_cd=formObj.f_curr_cd.value;
    	   var debit_amt=0;
    	   var agent_amt=0;
    	   var cal_amt=0;
    	   var intg_bl_seq;
    	   if(formObj.f_agent_nm.value == "" || formObj.f_agent_cd.value == ""){
	       	   //[Agent] is mandatory field. 
    		   alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_AGENTNM'));
	       	   return;
    	   }
    	   if(ps_share == "" || ps_share == 0){
    		   //[Profit Share %] is mandatory field.
    		   alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_PSHARE'));
    		   formObj.f_profit_share.focus();
    		   return;
    	   }
    	   if(curr_cd == ""){
    		   //[Currency] is mandatory field.
    		   alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CURR'));
    		   formObj.f_curr_cd.focus();
    		   return;
    	   }
   	       for(var i=2;i<=sheetObj.LastRow(); i++){
   	    	   if(sheetObj.GetCellValue(i, "ps_check") == "1"){
    	   	       	//intRows  = i;
    	   		  	chkCnt  += 1;
    	   			frt_cd=formObj.agent_ps_code.value;
    	   			aply_ut_cd=sheetObj.GetCellValue(i, "aply_ut_cd");
    	   			cntr_tpsz_cd=sheetObj.GetCellValue(i, "cntr_tpsz_cd");
    	   			qty=1
    	   			ru=1
    	   			trf_cur_sum_amt=1
    	   			vat_rt=0
    	   			vat_amt=0
    	   			rat_curr_cd=curr_cd
    	   			inv_xcrt=1
    	   			inv_xcrt_dt=sheetObj.GetCellValue(i, "inv_xcrt_dt");
    	   			sell_buy_tp_cd=sheetObj.GetCellValue(i, "sell_buy_tp_cd");
    	   			//COST의 토탈
    	   			if(sell_buy_tp_cd == "C"){
    	   				agent_amt 		+= Number(sheetObj.GetCellValue(i, "agent_amt"));
    	   			}
    	   			//REVENUE의 토탈
    	   			if(sell_buy_tp_cd == "D"){
    	   				debit_amt 		+= Number(sheetObj.GetCellValue(i, "agent_amt"));
    	   			}
    	   			intg_bl_seq=sheetObj.GetCellValue(i, "intg_bl_seq");
    	   			oth_seq=sheetObj.GetCellValue(i, "oth_seq");
    	   	   }
   	       }
   	       if(chkCnt != 0){
	    	   
	 		   sheetObj.DataInsert(intRows);
	 		   if(MULTI_CURR_FLAG == "Y"){
	 			   
	 			   sheetObj.SetCellValue(intRows, "frt_check", "1");
	     		   sheetObj.SetCellValue(intRows, "sell_buy_tp_cd", "C");
	     		   sheetObj.SetCellValue(intRows, "frt_cd",frt_cd);
	     		   //#4023 [JAPT]  Deposit/ Payment 화면 반올림 로직 확인
	     		   //sheetObj.SetCellValue(intRows, "frt_cd_nm","(R: "+parseFloat(debit_amt).toFixed(2)+" - " + parseFloat(agent_amt).toFixed(2) + ") X PS:" + formObj.f_profit_share.value+"%");
	     		   sheetObj.SetCellValue(intRows, "frt_cd_nm","(R: "+roundXL(parseFloat(debit_amt),2)+" - " + roundXL(parseFloat(agent_amt),2) + ") X PS:" + formObj.f_profit_share.value+"%");
	     		   sheetObj.SetCellValue(intRows, "frt_term_cd", "CC");
	     		   sheetObj.SetCellValue(intRows, "aply_ut_cd", aply_ut_cd);
	     		   sheetObj.SetCellValue(intRows, "cntr_tpsz_cd", cntr_tpsz_cd);
	     		   sheetObj.SetCellValue(intRows, "qty", qty);
	     		   sheetObj.SetCellValue(intRows, "trf_cur_sum_amt", trf_cur_sum_amt);
	     		   sheetObj.SetCellValue(intRows, "vat_rt", vat_rt);
	     		   sheetObj.SetCellValue(intRows , "rat_curr_cd", sheetObj.GetCellValue(intRows-1 , "rat_curr_cd"));
	 			   sheetObj.SetCellValue(intRows , "inv_aply_curr_cd", sheetObj.GetCellValue(intRows-1 , "inv_aply_curr_cd"));
	     		   sheetObj.SetCellValue(intRows, "inv_xcrt", inv_xcrt);
	     		   sheetObj.SetCellValue(intRows, "inv_xcrt_dt", inv_xcrt_dt);
	     		   
	     		   cal_amt = (debit_amt - agent_amt) * ps_share / 100;
	     		  
	     		   if(rat_curr_cd == "KRW" || rat_curr_cd == "JPY" || (rat_curr_cd=="VND" && vnCalRound=="Y")){
	     			   sheetObj.SetCellValue(intRows, "ru", Math.round(cal_amt));
	         		   sheetObj.SetCellValue(intRows, "debit_amt", 0);
	         		   sheetObj.SetCellValue(intRows, "credit_amt", Math.round(cal_amt));
	     		   }else{
	     			   if(ps_round == "R"){ // 반올림
	     				   ////#4023 [JAPT]  Deposit/ Payment 화면 반올림 로직 확인
	     				  cal_amt = Math.round(roundXL(parseFloat(cal_amt * 100),2)) / 100;
	     			   }else if(ps_round == "D"){ // 내림
	     				  cal_amt = Math.floor(roundXL(parseFloat(cal_amt * 100),2)) / 100;
	     			   }else if(ps_round == "U"){ // 올림
	     				  cal_amt = Math.ceil(roundXL(parseFloat(cal_amt * 100),2)) / 100;
	     			   }
	     			   
	     			   sheetObj.SetCellValue(intRows, "ru", cal_amt);
	         		   sheetObj.SetCellValue(intRows, "debit_amt", 0);
	         		   sheetObj.SetCellValue(intRows, "credit_amt", cal_amt);
	     		   }
	     		  
	     		   sheetObj.SetCellValue(intRows, "intg_bl_seq", intg_bl_seq);
	     		   sheetObj.SetCellValue(intRows, "oth_seq", oth_seq);
	     		   sheetObj.SetCellValue(intRows, "ibflag", "I");
	     		   
	     		   if(formObj.f_agent_nm.value == "" || formObj.f_agent_cd.value == ""){
	 	               //[Agent] is mandatory field.
	     			   alert(getLabel('FMS_COM_ALT007')+ "\n - " + getLabel('FMS_COD_AGENTNM'));
	     			   
	 	               formObj.f_agent_cd.focus();
	 	           }
	     		   else{
	 	        	   sheetObj.SetCellValue(intRows, "trdp_cd", formObj.f_agent_cd.value);
	 	           }
	     		   
	     		   sheetObj.SetCellEditable(intRows, "ps_check", 0);
	     		   sheetObj.SetRowBackColor(intRows,"#DFFFFF");
	     		   
	 		   }else{
				   sheetObj.SetCellValue(intRows, "frt_check","1");
				   sheetObj.SetCellValue(intRows, "sell_buy_tp_cd", "C");
				   sheetObj.SetCellValue(intRows, "frt_cd", frt_cd);
				 //#4023 [JAPT]  Deposit/ Payment 화면 반올림 로직 확인
				   sheetObj.SetCellValue(intRows, "frt_cd_nm", "(R: "+roundXL(parseFloat(debit_amt),2)+" - " + roundXL(parseFloat(agent_amt),2) + ") X PS:" + formObj.f_profit_share.value+"%");
				   sheetObj.SetCellValue(intRows, "frt_term_cd","CC");
				   sheetObj.SetCellValue(intRows, "aply_ut_cd",aply_ut_cd);
				   sheetObj.SetCellValue(intRows, "cntr_tpsz_cd", cntr_tpsz_cd);
				   sheetObj.SetCellValue(intRows, "qty", qty);				   
				   sheetObj.SetCellValue(intRows, "trf_cur_sum_amt", trf_cur_sum_amt);
				   sheetObj.SetCellValue(intRows, "vat_rt", vat_rt);
				   sheetObj.SetCellValue(intRows, "rat_curr_cd", rat_curr_cd);
				   sheetObj.SetCellValue(intRows, "inv_xcrt", inv_xcrt);
				   sheetObj.SetCellValue(intRows, "inv_xcrt_dt", inv_xcrt_dt);
				   
				   cal_amt = (debit_amt - agent_amt) * ps_share / 100;
				   
				   if(rat_curr_cd == "KRW" || rat_curr_cd == "JPY" || (rat_curr_cd=="VND" && vnCalRound=="Y")){
					   sheetObj.SetCellValue(intRows, "ru", Math.round(cal_amt));
					   sheetObj.SetCellValue(intRows, "debit_amt", 0);
					   sheetObj.SetCellValue(intRows, "credit_amt", Math.round(cal_amt));
				   }else{
					   if(ps_round == "R"){ // 반올림
						 //#4023 [JAPT]  Deposit/ Payment 화면 반올림 로직 확인
	     				  cal_amt = Math.round(roundXL(parseFloat(cal_amt * 100),2)) / 100;
	     			   }else if(ps_round == "D"){ // 내림
	     				  cal_amt = Math.floor(roundXL(parseFloat(cal_amt * 100),2)) / 100;
	     			   }else if(ps_round == "U"){ // 올림
	     				  cal_amt = Math.ceil(roundXL(parseFloat(cal_amt * 100),2)) / 100;
	     			   }
					   
					   sheetObj.SetCellValue(intRows, "ru", cal_amt);
					   sheetObj.SetCellValue(intRows, "debit_amt", 0);
					   sheetObj.SetCellValue(intRows, "credit_amt", cal_amt);
				   }
				  
				   sheetObj.SetCellValue(intRows, "intg_bl_seq",intg_bl_seq);
				   sheetObj.SetCellValue(intRows, "oth_seq", oth_seq);
				   sheetObj.SetCellValue(intRows, "ibflag", "I");
				   
				   if(formObj.f_agent_nm.value == "" || formObj.f_agent_cd.value == ""){
					   //[Agent] is mandatory field.
					   alert(getLabel('FMS_COM_ALT007')+ "\n - " + getLabel('FMS_COD_AGENTNM'));
					   
				       formObj.f_agent_cd.focus();
				   }
				   else{
					   sheetObj.SetCellValue(intRows, "trdp_cd", formObj.f_agent_cd.value);
				   }
				   
				   sheetObj.SetCellEditable(intRows, "ps_check",0);
				   sheetObj.SetRowBackColor(intRows,"#DFFFFF");
	 		   }
   	       }
   	       break;
       case "AUTO":
    	 //FRT_LIST AUTO용 조회
    	   doWork("SEARCHLIST01");
    		
    	   /*for(var i = 1; i<= sheetObj3.LastRow; i++){
    		   
    		   if(sheetObj3.GetCellValue(i, "frt_seq") != "" && sheetObj3.GetCellValue(i, "frt_seq") != undefined){
    			   
    			   if(sheetObj.GetCellValue(sheetObj.LastRow, "frt_term_cd") == ""){
    	    	    	sheetObj.RemoveAll();
    	    	   }
    			   
    			   var intRows = sheetObj.Rows;
    	           sheetObj.DataInsert(intRows);
    			   
    	           sheetObj.SetCellValue(intRows, "frt_check", "1");
    			   sheetObj.SetCellValue(intRows, "frt_seq",		sheetObj3.GetCellValue(i, "frt_seq"));
    			   sheetObj.SetCellValue(intRows, "frt_cd",			sheetObj3.GetCellValue(i, "frt_cd"));
    			   sheetObj.SetCellValue(intRows, "frt_cd_nm",		sheetObj3.GetCellValue(i, "frt_cd_nm"));
    			   sheetObj.SetCellValue(intRows, "sell_buy_tp_cd",	sheetObj3.GetCellValue(i, "sell_buy_tp_cd"));
    			   sheetObj.SetCellValue(intRows, "frt_term_cd", 	sheetObj3.GetCellValue(i, "frt_term_cd"));
    			   sheetObj.SetCellValue(intRows, "aply_ut_cd",		sheetObj3.GetCellValue(i, "aply_ut_cd"));
    			   sheetObj.SetCellValue(intRows, "cntr_tpsz_cd",	sheetObj3.GetCellValue(i, "cntr_tpsz_cd"));
    			   sheetObj.SetCellValue(intRows, "qty", 			sheetObj3.GetCellValue(i, "qty"));
    			   sheetObj.SetCellValue(intRows, "ru",				sheetObj3.GetCellValue(i, "ru"));
    			   sheetObj.SetCellValue(intRows, "agent_ru",		sheetObj3.GetCellValue(i, "agent_ru"));
    			   sheetObj.SetCellValue(intRows, "trf_cur_sum_amt",sheetObj3.GetCellValue(i, "trf_cur_sum_amt"));
    			   sheetObj.SetCellValue(intRows, "rat_curr_cd",	sheetObj3.GetCellValue(i, "rat_curr_cd"));
    			   sheetObj.SetCellValue(intRows, "inv_xcrt", 		sheetObj3.GetCellValue(i, "inv_xcrt"));
    			   sheetObj.SetCellValue(intRows, "inv_xcrt_dt",	sheetObj3.GetCellValue(i, "inv_xcrt_dt"));
    			   sheetObj.SetCellValue(intRows, "inv_amt",		sheetObj3.GetCellValue(i, "inv_amt"));
    			   sheetObj.SetCellValue(intRows, "inv_vat_amt",	sheetObj3.GetCellValue(i, "inv_vat_amt"));
    			   sheetObj.SetCellValue(intRows, "inv_sum_amt",	sheetObj3.GetCellValue(i, "inv_sum_amt"));
    			   
    			   //LHK, 20140327, Credit 인 경우 ru 가 0 인경우 rate 끌고오기
    			   if(sheetObj.GetCellValue(intRows, "sell_buy_tp_cd") == "C" && (sheetObj.GetCellValue(intRows, "ru") == "" || Number(sheetObj.GetCellValue(intRows, "ru")) == 0)){
    				   sheetObj.SetCellValue(intRows, "ru",Number(sheetObj.GetCellValue(intRows, "agent_ru")));
    			   }

    			   if(sheetObj.GetCellValue(intRows, "sell_buy_tp_cd") == "D"){
    				   sheetObj.SetCellValue(intRows, "agent_amt",sheetObj3.GetCellValue(i, "debit_amt"));
    			   }else{
   					   sheetObj.SetCellValue(intRows, "agent_amt",sheetObj4.GetCellValue(i, "credit_amt"));
    			   }
    			   if(sheetObj.GetCellValue(intRows, "frt_term_cd") == "CC"){
    				   sheetObj.SetCellValue(intRows, "debit_amt", sheetObj3.GetCellValue(i, "debit_amt"));
        			   sheetObj.SetCellValue(intRows, "credit_amt",sheetObj3.GetCellValue(i, "credit_amt"));
    			   }else{
    				   sheetObj.SetCellValue(intRows, "debit_amt",0);
        			   sheetObj.SetCellValue(intRows, "credit_amt", 0);
    			   }
    			   
    			   
    			   if(formObj.f_intg_bl_seq.value != ""){
    				   sheetObj.SetCellValue(intRows, "intg_bl_seq",formObj.f_intg_bl_seq.value);
    	           }else if(formObj.f_oth_seq.value != ""){
    	        	   sheetObj.SetCellValue(intRows, "oth_seq",formObj.f_oth_seq.value);
    	           }
    			   sheetObj.SetCellValue(intRows, "intg_bl_seq_2",sheetObj3.GetCellValue(i, "intg_bl_seq"));
    			   sheetObj.SetCellValue(intRows, "agent_ps_code", sheetObj3.GetCellValue(i, "agent_ps_code"));
    			   
    			   sheetObj.SetCellValue(intRows, "trdp_cd", sheetObj3.GetCellValue(i, "trdp_cd"));
    		   }    		   
    	   }*/
    	   
    	   
       break;
       case "AUTOOF":
    	 //FRT_LIST AUTO O/F 조회
   		   doWork("SEARCHLIST02");
   			
    	   /*for(var i = 1; i<= sheetObj4.LastRow; i++){
    		   
    		   if(sheetObj4.GetCellValue(i, "frt_seq") != "" && sheetObj4.GetCellValue(i, "frt_seq") != undefined){
    			   
    			   if(sheetObj.GetCellValue(sheetObj.LastRow, "frt_term_cd") == ""){
    	    	    	sheetObj.RemoveAll();
    	    	   }
    			   
    			   var intRows = sheetObj.Rows;
    	           sheetObj.DataInsert(intRows);
    			   
    	           sheetObj.SetCellValue(intRows, "frt_check", "1");
    			   sheetObj.SetCellValue(intRows, "frt_seq",sheetObj4.GetCellValue(i, "frt_seq"));
    			   sheetObj.SetCellValue(intRows, "frt_cd", sheetObj4.GetCellValue(i, "frt_cd"));
    			   sheetObj.SetCellValue(intRows, "frt_cd_nm", sheetObj4.GetCellValue(i, "frt_cd_nm"));
    			   sheetObj.SetCellValue(intRows, "sell_buy_tp_cd", sheetObj3.GetCellValue(i, "sell_buy_tp_cd"));
    			   sheetObj.SetCellValue(intRows, "frt_term_cd", sheetObj3.GetCellValue(i, "frt_term_cd"));
    			   sheetObj.SetCellValue(intRows, "aply_ut_cd", sheetObj4.GetCellValue(i, "aply_ut_cd"));
    			   sheetObj.SetCellValue(intRows, "cntr_tpsz_cd", sheetObj4.GetCellValue(i, "cntr_tpsz_cd"));
    			   sheetObj.SetCellValue(intRows, "qty", sheetObj4.GetCellValue(i, "qty"));
    			   sheetObj.SetCellValue(intRows, "ru", sheetObj4.GetCellValue(i, "ru"));
    			   sheetObj.SetCellValue(intRows, "agent_ru",sheetObj4.GetCellValue(i, "agent_ru"));
    			   sheetObj.SetCellValue(intRows, "trf_cur_sum_amt", sheetObj4.GetCellValue(i, "trf_cur_sum_amt"));
    			   sheetObj.SetCellValue(intRows, "rat_curr_cd", sheetObj4.GetCellValue(i, "rat_curr_cd"));
    			   sheetObj.SetCellValue(intRows, "inv_xcrt",sheetObj4.GetCellValue(i, "inv_xcrt"));
    			   sheetObj.SetCellValue(intRows, "inv_xcrt_dt",sheetObj4.GetCellValue(i, "inv_xcrt_dt"));
    			   sheetObj.SetCellValue(intRows, "inv_amt", sheetObj4.GetCellValue(i, "inv_amt"));
    			   sheetObj.SetCellValue(intRows, "inv_vat_amt", sheetObj4.GetCellValue(i, "inv_vat_amt"));
    			   sheetObj.SetCellValue(intRows, "inv_sum_amt", sheetObj4.GetCellValue(i, "inv_sum_amt"));
    			   
    			   //LHK, 20140327, Credit 인 경우 ru 가 0 인경우 rate 끌고오기
    			   if(sheetObj.GetCellValue(intRows, "sell_buy_tp_cd") == "C" && (sheetObj.GetCellValue(intRows, "ru") == "" || Number(sheetObj.GetCellValue(intRows, "ru")) == 0)){
    				   sheetObj.SetCellValue(intRows, "ru",Number(sheetObj.GetCellValue(intRows, "agent_ru")));
    			   }

    			   if(sheetObj.GetCellValue(intRows, "sell_buy_tp_cd") == "D"){
    				   sheetObj.SetCellValue(intRows, "agent_amt", sheetObj4.GetCellValue(i, "debit_amt"));
    			   }else{
    				   sheetObj.SetCellValue(intRows, "agent_amt", sheetObj4.GetCellValue(i, "credit_amt"));
    			   }
    			   
    			   sheetObj.SetCellValue(intRows, "debit_amt", sheetObj4.GetCellValue(i, "debit_amt"));
    			   sheetObj.SetCellValue(intRows, "credit_amt", sheetObj4.GetCellValue(i, "credit_amt"));
    			   if(formObj.f_intg_bl_seq.value != ""){
    				   sheetObj.SetCellValue(intRows, "intg_bl_seq", formObj.f_intg_bl_seq.value);
    	           }else if(formObj.f_oth_seq.value != ""){
    	        	   sheetObj.SetCellValue(intRows, "oth_seq",formObj.f_oth_seq.value);
    	           }
    			   sheetObj.SetCellValue(intRows, "intg_bl_seq_2", sheetObj4.GetCellValue(i, "intg_bl_seq"));
    			   sheetObj.SetCellValue(intRows, "agent_ps_code", sheetObj4.GetCellValue(i, "agent_ps_code"));
    			   
    			   sheetObj.SetCellValue(intRows, "trdp_cd", sheetObj4.GetCellValue(i, "trdp_cd"));
    		   }
    	   }*/
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
//	   		rtnary[1]=formObj.f_agent_nm.value;
//	   		rtnary[2]=window;
	   		
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	        break;
       case "CUSTOMER_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.f_agent_nm.value;
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
 	        break;
        case "INV_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(1);
			rtnary[0]="S";
			var rtnVal =  ComOpenWindow('./CMM_POP_0240.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:480px" , true);
			if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
		 		return;
			}else{
				var rtnValAry=rtnVal.split("|");
				formObj.s_inv_no.value=rtnValAry[0];//inv_no
				formObj.f_inv_seq.value=rtnValAry[3];//inv_seq
				doWork("SEARCHLIST");
			}
			break;
        case 'PRINT':
			if(frm1.f_inv_seq.value==''){
				alert(getLabel('ACC_MSG25'));
				return;
			}
        	if(formObj.f_oth_seq.value != ""){
        		/*if(formObj.f_cnt_cd.value == "IT"){
            		formObj.file_name.value='invoice_10.mrd';
            	}
        		else if(formObj.f_cnt_cd.value == "US" || formObj.f_cnt_cd.value == "CA" || formObj.f_cnt_cd.value == "DE"){
            		formObj.file_name.value='invoice_07_us.mrd';	
            	}
        		else{
            		formObj.file_name.value='invoice_07.mrd';
            	}*/
        		formObj.file_name.value='invoice_07_us.mrd';
        	}
        	else{
        		/*if(formObj.f_cnt_cd.value == "IT"){
            		formObj.file_name.value='invoice_05.mrd';
            	}
        		else if(formObj.f_cnt_cd.value == "US" || formObj.f_cnt_cd.value == "CA" || formObj.f_cnt_cd.value == "DE"){
        			formObj.file_name.value='invoice_02_us.mrd';
            	}
        		else{
            		formObj.file_name.value='invoice_02.mrd';
            	}*/
        		formObj.file_name.value='invoice_02_us.mrd';
        	}
        	formObj.title.value='Debit/Credit Note';
			//Parameter Setting
        	var param='[' + formObj.f_email.value + ']';			// USER EMAIL';	[1]
        	param += '[' + "'" + formObj.f_inv_seq.value + "'" + ']';			// [2]
			param += '[]';											// [3]
			param += '[]';											// [4]
			param += '[]';											// [5]
			param += '[]';											// [6]	
			//param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';	// CURR BRANCH
			param += '[' + formObj.f_agent_cd.value + ']';			// Agent [7]
			param += '[' + formObj.f_ref_ofc_cd.value + ']';		// REF_OFC_CD  [8]
			param += '[' + formObj.f_usrPhn.value + ']';			// 9
			param += '[' + formObj.f_usrFax.value + ']';			// 10
			param += '[' + formObj.f_usrId.value + ']';				// 11
			param += '[' + formObj.main_trdp.value + ']';			// 12
			param += '[' + formObj.f_ofc_eng_nm.value + ']';		//13  user local office name
			param += '[]';											// 14
			param += '[' + formObj.f_hbl_no.value + ']';			// 15
			formObj.rd_param.value=param;
			// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
			if (formObj.chkMailDc.value === 'Y') {
				if (formObj.f_hbl_no.value == '') {
					formObj.mailTitle.value='Debit/Credit Note No : ' + formObj.f_inv_no.value;
				} else {
					formObj.mailTitle.value='Debit/Credit Note No : ' + formObj.f_inv_no.value + ' [HBL No: ' + formObj.f_hbl_no.value + ']';
				}
			} else {
				formObj.mailTitle.value='Debit/Credit Note No : ' + formObj.f_inv_no.value;
			}
			/*
     		var trdp_cd='';
     		trdp_cd += '(' + '\'' + formObj.f_agent_cd.value + '\'' + ')';
     		ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
     		formObj.mailTo.value=mailTo;
			*/
			formObj.rpt_biz_tp.value="ACCT";
			formObj.rpt_biz_sub_tp.value="DC";
			formObj.rpt_trdp_cd.value=formObj.f_agent_cd.value;
			formObj.rpt_pdf_file_nm.value=getPdfFileNm();
			//OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails
			if(rpt_file_name_flg){
				formObj.attachFileName.value = getPdfFileNm();
			}
			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			break;
		case "PROFIT_REPORT":
	   	 	if(formObj.f_intg_bl_seq.value != ""){			//BL Operation
	   	 		var reqParam='?intg_bl_seq=' + formObj.m_intg_bl_seq.value;
				reqParam += '&mbl_no=' + formObj.f_mbl_no.value;
				reqParam += '&ref_no=' + formObj.f_ref_no.value;
				reqParam += '&air_sea_clss_cd=' + formObj.f_air_sea_clss_cd.value;
				reqParam += '&bnd_clss_cd=' + formObj.f_bnd_clss_cd.value;
				reqParam += '&biz_clss_cd=' + "M";
//				popGET('RPT_PRN_0180.clt'+reqParam, '', 1100, 650, "scroll:yes;status:no;help:no;");
				
				callBackFunc = "PROFIT_REPORT";
		   		modal_center_open('./RPT_PRN_0180.clt' + reqParam, '', 1130,750,"yes");
	   	 	}else if(formObj.f_oth_seq.value != ""){		//Other Operation
	   	 		var reqParam='?oth_seq=' + formObj.f_oth_seq.value;
					reqParam += '&ref_no=' + formObj.f_ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "";
					reqParam += '&bnd_clss_cd=' + "N";
					reqParam += '&biz_clss_cd=' + "";
//				popGET('RPT_PRN_0210.clt'+reqParam, '', 600, 400, "scroll:yes;status:no;help:no;");
					callBackFunc = "PROFIT_REPORT";
			   		modal_center_open('./RPT_PRN_0210.clt' + reqParam, '', 630,400,"yes");
	   	 	}else{
	   	 		alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_REFN'));
	   	 		return;
	   	 	}
	   	break;		
	   	
		case "PRINT_BLOCK":
        	if(frm1.f_inv_seq.value == ''){
				alert(getLabel('FMS_COM_ALT029'));
				return;
			}
        	
        	ajaxSendPost(getInvBlockCheck, 'reqVal', '&goWhere=aj&bcKey=getInvBlockCheck&inv_seq='+frm1.f_inv_seq.value, './GateServlet.gsl');
   	 		
   	 	break;
   	 	//OFVFOUR-7098 [HOPEWAY] Print Credit Note in Payment Request format
		case 'PRINT_PAYMENT':
			if(frm1.f_inv_seq.value==''){
				alert(getLabel('ACC_MSG25'));
				return;
			}
        	if(formObj.f_oth_seq.value != ""){
        		formObj.file_name.value='invoice_07_us.mrd';
        	}
        	else{
        		formObj.file_name.value='invoice_15_us.mrd';
        	}
        	formObj.title.value='Debit/Credit Note';
			//Parameter Setting
        	var param='[' + formObj.f_email.value + ']';			// USER EMAIL';	[1]
        	param += '[' + "'" + formObj.f_inv_seq.value + "'" + ']';			// [2]
			param += '[]';											// [3]
			param += '[]';											// [4]
			param += '[]';											// [5]
			param += '[]';											// [6]	
			//param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';	// CURR BRANCH
			param += '[' + formObj.f_agent_cd.value + ']';			// Agent [7]
			param += '[' + formObj.f_ref_ofc_cd.value + ']';		// REF_OFC_CD  [8]
			param += '[' + formObj.f_usrPhn.value + ']';			// 9
			param += '[' + formObj.f_usrFax.value + ']';			// 10
			param += '[' + formObj.f_usrId.value + ']';				// 11
			param += '[' + formObj.main_trdp.value + ']';			// 12
			param += '[' + formObj.f_ofc_eng_nm.value + ']';		//13  user local office name
			param += '[]';											// 14
			param += '[' + formObj.f_hbl_no.value + ']';			// 15
			if(formObj.file_name.value=='invoice_15_us.mrd'){
				param += '[' + formObj.f_usr_nm.value + ']';		// USER_NM [16] avoid missing logo at invoice_07_us.mrd
			}
			formObj.rd_param.value=param;
			formObj.mailTitle.value='Debit/Credit Note No : ' + formObj.f_inv_no.value;
			formObj.rpt_biz_tp.value="ACCT";
			formObj.rpt_biz_sub_tp.value="DC";
			formObj.rpt_trdp_cd.value=formObj.f_agent_cd.value;
			formObj.rpt_pdf_file_nm.value=getPdfFileNm();
			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			break;
    }
}

//[OFVFOUR-6997] - [Binex-LA] Balance mismatch issue: check freight has invoice
function getFrtModiTms(reqVal){
    var formObj=document.frm1;
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
        if(typeof(doc[1])!= 'undefined'){
            formObj.f_frt_modi_tms.value = doc[1];
        }
    }
}

function checkFrtModiTms(reqVal){
    var formObj=document.frm1;
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
        if(typeof(doc[1])!= 'undefined'){
            if (doc[1] == formObj.f_frt_modi_tms.value) {
                isFrtModiTmsOk=false;
            } else {
                isFrtModiTmsOk=true;
            }
        }
    }
}

function PROFIT_REPORT() {
	
}

function CUSTOMER_POPLIST(rtnVal){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{

		//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
		var opt_key_sec = "TP_OVER_AMT_FLG";
		ajaxSendPost(setOverAmtCurrFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

		var rtnValAry=rtnVal.split("|");

		if(rtnValAry[13] == 'KO'){
			alert(getLabel('COM_FRT_ALT015'));
			formObj.f_agent_cd.value="";//full_nm
			formObj.f_agent_nm.value="";//full_nm
			formObj.f_terms.value="";	//term_cd
			formObj.f_term_dt.value="";	//term_dt
			formObj.f_agent_cd.style.color= "#000000";
			formObj.f_agent_nm.style.color= "#000000";
			calcCreateTerms();
			return;
		}
		if(rtnValAry[13]=='CR'){
			//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
			if (TP_OVER_AMT_FLG != ""){
				var objArr=new Array();
				var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
				if (overDueDateAmt != 0){
					objArr[0]=rtnValAry[2];
					objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
					if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
						formObj.f_agent_cd.value="";
						formObj.f_agent_nm.value="";
						formObj.f_agent_cd.style.color= "#000000";
						formObj.f_agent_nm.style.color= "#000000";
						return;
					} else {
						formObj.f_agent_cd.style.color= "#ff0000";
						formObj.f_agent_nm.style.color= "#ff0000";
					}
				}
			}

			//[20140317 OYH] #27474
			var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
			var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
			var balLmtAmt=crdLmtAmt - curLmtAmt;
			var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
			var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
			
			//[20141217 YJW] #46708
			if(crdLmtAmt > 0) {
				if(overDueAmt > 0 && balLmtAmt < 0  ){
					var objArr=new Array();
					//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
					//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
					objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2));
					if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
						formObj.f_agent_cd.value="";
						formObj.f_agent_nm.value="";
						try {creditOver=false;}catch(e){};
						formObj.f_agent_cd.style.color= "#000000";
						formObj.f_agent_nm.style.color= "#000000";
						return;
					} else {
						try {creditOver=true;}catch(e){};
						formObj.f_agent_cd.style.color= "#ff0000";
						formObj.f_agent_nm.style.color= "#ff0000";
					}
				} else if (balLmtAmt < 0  ){
					var objArr=new Array();
					//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
					//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
					objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2));
					if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
						formObj.f_agent_cd.value="";
						formObj.f_agent_nm.value="";
						try {creditOver=false;}catch(e){};
						formObj.f_agent_cd.style.color= "#000000";
						formObj.f_agent_nm.style.color= "#000000";
						return;
					} else {
						try {creditOver=true;}catch(e){};
						formObj.f_agent_cd.style.color= "#ff0000";
						formObj.f_agent_nm.style.color= "#ff0000";
					}
				} else if (overDueAmt > 0 ) {
					try {creditOver=false;}catch(e){};
					var objArr=new Array();
					objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2));     
					if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
						formObj.f_agent_cd.value="";
						formObj.f_agent_nm.value="";
						//try {creditOver=false;}catch(e){};
						formObj.f_agent_cd.style.color= "#000000";
						formObj.f_agent_nm.style.color= "#000000";
						return;
					} else {
						//try {creditOver=true;}catch(e){};
						formObj.f_agent_cd.style.color= "#ff0000";
						formObj.f_agent_nm.style.color= "#ff0000";
					}
				} else {
					try {creditOver=false;}catch(e){};
					formObj.f_agent_cd.style.color= "#000000";
					formObj.f_agent_nm.style.color= "#000000";
				}
			} else {
				try {creditOver=false;}catch(e){};
				formObj.f_agent_cd.style.color= "#000000";
				formObj.f_agent_nm.style.color= "#000000";
			}
			
		} else if(rtnValAry[13] == 'CH'){
			if(confirm(getLabel('COM_FRT_CFM005'))){
				try {creditOver=true;}catch(e){};
				formObj.f_agent_cd.style.color= "#ff0000";
				formObj.f_agent_nm.style.color= "#ff0000";
			}else{
				formObj.f_agent_cd.value = "";
				formObj.f_agent_nm.value = "";
				try {creditOver=false;}catch(e){};
				formObj.f_agent_cd.style.color= "#000000";
				formObj.f_agent_nm.style.color= "#000000";
				return;
			}
			
		} else if(rtnValAry[13] == 'CO'){
			try {creditOver=false;}catch(e){};
			if(confirm(getLabel('COM_FRT_ALT001'))){
				formObj.f_agent_cd.style.color= "#ff0000";
				formObj.f_agent_nm.style.color= "#ff0000";
			}else{
				formObj.f_agent_cd.value = "";
				formObj.f_agent_nm.value = "";
				formObj.f_agent_cd.style.color= "#000000";
				formObj.f_agent_nm.style.color= "#000000";
				return;
			}
			
		}/*else{
			try {creditOver=false;}catch(e){};
			formObj.f_agent_cd.style.color= "#ff0000";
			formObj.f_agent_nm.style.color= "#ff0000";
			alert(getLabel('COM_FRT_ALT001'));
		}*/
		formObj.f_agent_cd.value=rtnValAry[0];//full_nm
		formObj.f_agent_nm.value=rtnValAry[2];//full_nm
		formObj.f_terms.value=rtnValAry[17];	//term_cd
		formObj.f_term_dt.value=rtnValAry[18];	//term_dt
		
		// Agent와 TRDP_CD가 다를 경우 check를 푸는 로직 삭제. 
		// 저장할 때 Agent로 자동세팅되어 필요없는 로직이며 오류를 유발할 수 있음. (yjw 2015.08.21)
		/*if(formObj.f_inv_seq.value == ""){
			for(var i=2; i<=sheetObj.LastRow(); i++){
				if(sheetObj.GetCellValue(i, "trdp_cd") == formObj.f_agent_cd.value){
					sheetObj.SetCellValue(i, "frt_check","1");
				}else{
					sheetObj.SetCellValue(i, "frt_check","0");
				}
			}
		}*/
		calcCreateTerms();
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
var isRun = true;
function loadPage() {
	
	//fnSetAutocomplete('f_agent_nm', 'ACC_POPLIST', 'agent_btn'); //Customer
	/* #2111 자동완성 기능 추가  */
	fnSetAutocompleteCallBack('f_agent_nm', 'CUSTOMER_POPLIST', 'LINER_POPLIST'); //Customer	
	
	//OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails
    var opt_key = "EXTENT_RPT_FILE_NAME_FLG";
	ajaxSendPost(setFileNameflag, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	
	var opt_key = "DC_PROFIT_SHARE_ROUND";
	ajaxSendPost(setDCProfitShareRoundReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	opt_key = "USE_LOCL_GL_VIEW_FALG";
	ajaxSendPost(setUseLoclGlViewFalg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");	
	//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	opt_key = "INV_XCRT_APPL_TP";
	ajaxSendPost(setInvXcrtApplTp, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");	
	
	opt_key = "VN_VAT_CAL_ROUND";
	ajaxSendPost(setVnCalRound, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#6282 [JAPT] Debit/Credit screen enhancement point
	opt_key = "USE_OFC_BL_CURR_FLG";
	ajaxSendPost(setUseOfficeBLCurrency, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	// OFVFOUR-8099 [BEST OCEAN] REMOVING PRINT BUTTON WHEN THERE IS PRINT/L IN THE SAME SCREEN
    var opt_key = "VISIBLE_PRINT_BUTTON";
	ajaxSendPost(setVisiblePrintButton, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	if(GL_VIEW_FALG =="Y"){
		document.getElementById("th_ex_rate").style.display="";		
		document.getElementById("td_ex_rate").style.display="";		
		
		if(XCRT_APP_FLAG == "T"){
			document.getElementById("f_loc_ex_rate").readOnly=false;
		}else if(XCRT_APP_FLAG == "F"){
			document.getElementById("f_loc_ex_rate").readOnly=true;
		}
	}
	
	
    var formObj=document.frm1;
	for(var i=0;isRun && i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
        if(i == docObjects.length - 1){
        	isRun = false;
        }
    }
	formObj.f_pck_qty.value=doMoneyFmt(formObj.f_pck_qty.value);
	formObj.f_grs_wgt.value=doMoneyFmt(formObj.f_grs_wgt.value);
	formObj.f_grs_wgt1.value=doMoneyFmt(formObj.f_grs_wgt1.value);
	if (formObj.f_air_sea_clss_cd.value == "A"){
		formObj.f_chg_wgt.value=doMoneyFmt(formObj.f_chg_wgt.value);
		formObj.f_chg_wgt1.value=doMoneyFmt(formObj.f_chg_wgt1.value);
	}
	// 2017-04-17 기존 bug 수정 : CBM, CFT가 소수점 6자리로 표기되어서 10자리를 넘는 경우 Unit 변경 시 적용 안되므로 B/L Entry와 동일하게 수정
	//formObj.f_meas.value=doMoneyFmt(formObj.f_meas.value);
	//formObj.f_meas1.value=doMoneyFmt(formObj.f_meas1.value);
	
	//#4023 [JAPT]  Deposit/ Payment 화면 반올림 로직 확인
	if(formObj.f_air_sea_clss_cd.value =="S"){
		formObj.f_meas.value=doMoneyFmt(roundXL(Number(formObj.f_meas.value),3));
		formObj.f_meas1.value=doMoneyFmt(roundXL(Number(formObj.f_meas1.value),0));
	}else{
		formObj.f_meas.value=doMoneyFmt(roundXL(Number(formObj.f_meas.value),1));
		formObj.f_meas1.value=doMoneyFmt(roundXL(Number(formObj.f_meas1.value),6));
	}
	
	if (formObj.f_air_sea_clss_cd.value == "A"){
		formObj.chg_wgt.value = roundXL(Number(formObj.chg_wgt.value),1);
		formObj.chg_wgt1.value = roundXL(Number(formObj.chg_wgt1.value),1);
		formObj.grs_wgt.value = roundXL(Number(formObj.grs_wgt.value),1);
		formObj.grs_wgt1.value = roundXL(Number(formObj.grs_wgt1.value),1);
	}else{
		formObj.chg_wgt.value = roundXL(Number(formObj.chg_wgt.value),3);
		formObj.chg_wgt1.value = roundXL(Number(formObj.chg_wgt1.value),3);
		formObj.grs_wgt.value = roundXL(Number(formObj.grs_wgt.value),3);
		formObj.grs_wgt1.value = roundXL(Number(formObj.grs_wgt1.value),3);
	}
	//#4023 [JAPT]  Deposit/ Payment 화면 반올림 로직 확인
	formObj.meas.value = roundXL(Number(formObj.meas.value),3);
	
	//2012/01/26 해상수출일때 CURR를 USD로 셋팅한다.
	if(formObj.f_air_sea_clss_cd.value == "S" && formObj.f_bnd_clss_cd.value == "O"){
		// #47365 Curr이 EUR 이면 EUR을 설정하고 이외엔 USD를 설정한다.		
		var ofc_curr_cd = formObj.f_ofc_curr_cd.value;
		if (ofc_curr_cd == "EUR") {
			formObj.f_curr_cd.value = "EUR";
		} else {
			formObj.f_curr_cd.value = "USD";
		}
	}
	
	formObj.old_post_dt.value=formObj.f_post_dt.value;
	//File Block_dt 와 Post Date 체크
	//LHK, 20131016 Post Date Set, Invoice 생성 전에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set 한다. 
	//LHK, POST DATE 변경시 BLOCK_POST_DT 비교, BLOCK_POST_DT 보다 POST DATE가 커야함. 
	setBLOCK_POST_DT();
	if(formObj.f_inv_seq.value == ""){
		
    	var tempPostDt=formObj.f_post_dt.value;
    	var tempBlockDt=BLOCK_POST_DT;
    	if(BLOCK_POST_DT != ""){
    		if(compareTwoDate(tempBlockDt, tempPostDt)){
    			formObj.f_post_dt.value=tempBlockDt;
    			formObj.old_post_dt.value=tempBlockDt;
    			if(formObj.post_dt_inv.value == "POST"){
    				formObj.f_inv_dt.value=tempBlockDt;
    			}
    		}		
    	}
    	
//    	formObj.f_agent_cd.focus();
//		formObj.f_agent_cd.blur();
//   	 #6918 [JAPAN TRUST] Missing Due Date when creating DC invoice - Author: Thuong Huynh - 2020/11/20
		codeNameAction('AGENT',document.frm1.f_agent_cd, 'onBlur');
    	//LHK, 인보이스 생성시 BLOCK_POST_DT 를 기본 date 를 설정
//		formObj.f_post_dt.value   = BLOCK_POST_DT;
//		formObj.f_inv_dt.value    = BLOCK_POST_DT;
//		formObj.old_post_dt.value = BLOCK_POST_DT;
	} else {
		//#2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.f_inv_no.value);
	}
	
	//#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
	if(formObj.f_vchr_no.value == ""){
    	//AUTO 표시
		formObj.f_vchr_no.value = "AUTO";
    }
	if(formObj.f_vchr_tp_cd.value == ""){
		formObj.f_vchr_tp_cd.value = "P"; //PAYMENT
	}	
	
	//TAX_BILL 을 SEOUL만 활성화 한다.
	/*
	if(formObj.f_ofc_cd.value == "SEL"){
		formObj.f_tax_bill.disabled=false;
	}
	*/
	/*
	// 체크로직의 변경 SLIP DATE => BLOCK DATE
	//File Block_dt 와 Post Date 체크
	var bl_post=(formObj.f_post_dt.value).replaceAll("-","");
	var block_post=formObj.block_post.value;
	if(bl_post != "" && block_post != "") {
		bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
		block_post=block_post.substring(4,8)+block_post.substring(0,2)+block_post.substring(2,4);
		if(block_post >= bl_post){
			BLOCK_POST_DT=addDay(formObj.block_post.value, 1);
			formObj.f_post_dt.value=BLOCK_POST_DT;
			formObj.f_inv_dt.value=BLOCK_POST_DT;
			formObj.old_post_dt.value=BLOCK_POST_DT;
		}else{
			BLOCK_POST_DT="";
		}
	}
	*/
/*	// BL의 POST DATE가 SLIP의 MAX(POST_DT) 보다 작으면.. MAX(POST_DT) + 1 로 셋팅한다.
	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	if(bl_post != "" && slip_post != ""){
		bl_post=bl_post.replaceAll("-","");
		bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
		slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
		if(slip_post >= bl_post){
			SLIP_POST_DT=addDay(formObj.slip_post.value, 1);
			formObj.f_post_dt.value=SLIP_POST_DT;
			formObj.f_inv_dt.value=SLIP_POST_DT;
			formObj.old_post_dt.value=SLIP_POST_DT;
		}else{
			SLIP_POST_DT="";
		}
	}*/
	if(formObj.f_intg_bl_seq.value != "" || formObj.f_oth_seq.value != ""){
		if(!(formObj.f_inv_seq.value == "" && formObj.chk_fr_trdp_cd.value == "")){
			doWork("SEARCHLIST");
    	}else{
			formObj.chk_fr_frt_seq.value = "";
		}
    }
	chkTrdp();
	//BL에 매칭된 CNTR TP/SZ를 가져온다.
	if(formObj.f_intg_bl_seq.value != ""){
		var intg_bl_seq=formObj.f_intg_bl_seq.value;
		ajaxSendPost(getBlCntrInfo, 'reqVal', '&goWhere=aj&bcKey=searchBlCntrInfo&f_intg_bl_seq='+intg_bl_seq, './GateServlet.gsl');
	}
	// #20443 [BINEX] User Access control rule
	/* 1. Paid Amount > 0 일때
	 *  EDIT INVOICES AFTER DEPOSIT/PAYMENT 권한이 있을때  - sheet 값 변경 가능
	 *  EDIT INVOICES AFTER DEPOSIT/PAYMENT 권한이 없을때  - sheet 값 변경 불가
	 *  
	 * 2. File 이 Block 된 상태일때 (CLT_CFM_FLG = 'Y')
	 *  EDIT INVOICES AFTER FILE BLOCK 권한이 있을때 
	 *  	TB_INV_DTL. CLT_CMPL_FLG = ‘Y’ 
	 *  	and ISNULL(TB_INV_DTL.JNR_YN,’’) <> ‘Y’ 
	 *  	and ISNULL(TB_INV_DTL.CLS_YN,’’) <> ‘Y’ 
	 *   조건에 해당하면 입력 폼 값 수정가능     	  
	 *   
	 * EDIT INVOICES AFTER DEPOSIT/PAYMENT 권한 = dp_flg
	 * EDIT INVOICES AFTER FILE BLOCK 권한 = fb_flg
	*/
	// LHK, 최종 Load 후에 권한 체크하여 화면 control 함
	//authControl();
	
	if (frm1.f_biz_clss_cd.value == 'H') {
		//House이면 Auto, AutoOE 버튼을 안보이게한다.
//		autoBtn1.style.display = "none";
		getObj("autoBtn2").style.display = "none";	
//		autoBtn3.style.display = "none";
		getObj("autoBtn4").style.display = "none";
	}

	// [OFVFOUR-6997] - [Binex-LA] Balance mismatch issue: check freight has invoice
    if(formObj.f_intg_bl_seq.value != "" && formObj.chk_fr_frt_seq.value != ""){
        var chk_fr_frt_seq=formObj.chk_fr_frt_seq.value;
        ajaxSendPost(getFrtModiTms, 'reqVal', '&goWhere=aj&bcKey=searchFrtModiTms&frt_seq='+chk_fr_frt_seq, './GateServlet.gsl');
    }

	sheet1_OnLoadFinish(sheet1);
}
 function authControl(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	// 1.Paid Amount 값이 >0 인지 체크
	var paidAmtYn = parseFloat(eval((formObj.f_paid_amt.value).replaceAll(",",""))) > 0?true:false;
	var fileBolckYn=sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y"?true:false;
	var jrnYn=sheetObj.GetCellValue(2, "jnr_yn");
	var clsYn=sheetObj.GetCellValue(2, "cls_yn");
	
	//if (paidAmtYn) {
		if (!fileBolckYn && formObj.dp_flg.value == "Y") {
			editSheet(true);
		} 
	//}
//	if (fileBolckYn) {
		if (formObj.fb_flg.value == "Y" && jrnYn != "Y" && clsYn !="Y") {
			//editInputForm(true);
			//editSheet(true);
			
			if(!paidAmtYn){
				editInputForm(true);
				editSheet(true);
			}else{
				if(formObj.dp_flg.value == "Y"){
					editInputForm(true);
					editSheet(true);
				}
			}
		} 
//	}
	/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.13 */
	if (jrnYn == "Y" || clsYn =="Y") {
		editInputForm(false);
		editSheet(false);
	} 
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
			if(collTxt[i].name == "f_agent_cd" || collTxt[i].name == "f_agent_nm" ||
					collTxt[i].name == "f_agent_ref_no" || collTxt[i].name == "f_profit_share" ||
					collTxt[i].name == "f_inv_no" || // collTxt[i].name == "f_post_dt" ||
					collTxt[i].name == "f_inv_dt" || collTxt[i].name == "f_term_dt" ||
					collTxt[i].name == "f_due_dt" || collTxt[i].name == "f_last_paid_dt_cal" ||
					collTxt[i].name == "s_bl_no" || collTxt[i].name == "s_ref_no" ||
					collTxt[i].name == "s_oth_no" || collTxt[i].name == "s_inv_no" ) {
				collTxt[i].className="search_form";
				collTxt[i].readOnly=!flg;
			}  
		}     
	}
	frm1.f_terms.disabled=!flg;
	frm1.f_curr_cd.disabled=!flg;
	frm1.f_remark.disabled=!flg;
	frm1.f_inco_cd.disabled=!flg;
	if (flg) {
//		saveBtn1.style.display="inline";
		//span id 처리 getObj('saveBtn2').style.display="inline";
		getBtnObj('btnModify').style.display="inline";
		getBtnObj('btnSaveX').style.display="inline";
		frm1.agent_btn.onclick=function(){doWork("CUSTOMER_POPLIST");};
		frm1.agent_btn.style.cursor="hand";
		//frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDate();if(frm1.f_terms.value != ''){calcCreateTerms();}};
		frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDt();};
		frm1.f_term_dt.onblur=function(){calcCreateTerms();};
		// frm1.f_post_dt_cal.onclick	 = function(){doDisplay('DATE1', frm1);};
		frm1.f_inv_dt_cal.onclick=function(){doDisplay('DATE2', frm1);};
		frm1.f_due_dt_cal.onclick=function(){doDisplay('DATE3', frm1);};
		frm1.dateImg4.onclick=function(){doDisplay('DATE4', frm1);};
	} else {
//		saveBtn1.style.display="none";
		//span id 처리 getObj('saveBtn2').style.display="none";
		getBtnObj('btnModify').style.display="none";
		getBtnObj('btnSaveX').style.display="none";
		frm1.agent_btn.onclick="";
		frm1.agent_btn.style.cursor="";
		frm1.f_inv_dt.onblur="";
		frm1.f_term_dt.onblur="";
		// frm1.f_post_dt_cal.onclick	 = "";
		frm1.f_inv_dt_cal.onclick="";
		frm1.f_due_dt_cal.onclick="";
		frm1.dateImg4.onclick="";
	}
	// Post Date 체크를 위해
	isInputFormValChanged=flg;
}
/**
 * Sheet 의 수정을 가능/불가 하게 한다
 */
function editSheet(flg){
	var sheetObj=docObjects[0];
	// Row Add 버튼 보이기/숨기기
	if (flg) {
		// AP/DC는 Row ADD 불가능 
//		rowAddBtn1.style.display="inline";
		getObj('rowAddBtn2').style.display="inline";
//		rowAddBtn3.style.display="inline";
		getObj('rowAddBtn4').style.display="inline";
//		autoBtn1.style.display="inline";
		getObj('autoBtn2').style.display="inline";	
//		autoBtn3.style.display="inline";
		getObj('autoBtn4').style.display="inline";	
//		pscalBtn1.style.display="inline";
		getObj('pscalBtn2').style.display="inline";	
		// Save버튼 보이기/숨기기
//		saveBtn1.style.display="inline";
		//span id 처리 getObj('saveBtn2').style.display="inline";
		getBtnObj('btnModify').style.display="inline";
		getBtnObj('btnSaveX').style.display="inline";
	} else {
//		rowAddBtn1.style.display="none";
		getObj('rowAddBtn2').style.display="none";	
//		rowAddBtn3.style.display="none";	
		getObj('rowAddBtn4').style.display="none";	
//		autoBtn1.style.display="none";
		getObj('autoBtn2').style.display="none";	
//		autoBtn3.style.display="none";
		getObj('autoBtn4').style.display="none";	
//		pscalBtn1.style.display="none";
		getObj('pscalBtn2').style.display="none";	
		// Save버튼 보이기/숨기기
//		saveBtn1.style.display="none";
		//span id 처리 getObj('saveBtn2').style.display="none";
		getBtnObj('btnModify').style.display="none";
		getBtnObj('btnSaveX').style.display="none";
	}
	// 아래 case 가 아닌 경우 auto 버튼 안보이게 감춘다. 
	var chkAutoBtn=true;
	if (frm1.f_biz_clss_cd.value == 'M') {
		if ( frm1.f_air_sea_clss_cd.value == 'S' || 
			(frm1.f_air_sea_clss_cd.value == 'A' && frm1.f_bnd_clss_cd.value == 'I')
			) {
			chkAutoBtn=false;
		}
	}
	if (chkAutoBtn) {
//		autoBtn1.style.display="none";
		getObj('autoBtn2').style.display="none";	
//		autoBtn3.style.display="none";
		getObj('autoBtn4').style.display="none";
	}
	
	// sheet edit 가능/불가
	sheetObj.SetEditable(flg);
	sheetObj.RenderSheet(1);
	
	//LHK, 20140911, #43597 [BINEX]Close 후 A/P 수정 오류, BLOCK 된 인보이스(AR, AP, DC) 는 edit 권한 있어도 DEL 항목 check 안되도록 수정
	var fileBolckYn = sheetObj.GetCellValue(2, "clt_cmpl_flg");
	var jrnYn = sheetObj.GetCellValue(2, "jnr_yn");
	var clsYn = sheetObj.GetCellValue(2, "cls_yn");
	
	for ( var i = 2; i <= sheetObj.LastRow(); i++) {
		if(fileBolckYn == "Y" || jrnYn == "Y" || clsYn == "Y") {
			sheetObj.SetCellEditable(i, "del_chk", 0);
			sheetObj.SetColBackColor("del_chk","#EFEBEF")
		}
	}
	
	// Amout 체크를 위해
	isSheetValChanged=flg;
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
        	 if(MULTI_CURR_FLAG == "Y"){
        		 with (sheetObj) {
            	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
            	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            	       var headers = [ { Text:getLabel('ACC_INV_0020_HDR2_3'), Align:"Center"},
            	                   { Text:getLabel('ACC_INV_0020_HDR2_4'), Align:"Center"} ];
            	       InitHeaders(headers, info);

            	       var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck:0 },
            	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"frt_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"frt_check",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck:0 },
            	              {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq_2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
            	              {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, EditLen:100 },
            	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"frt_term_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"aply_ut_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Combo",     Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"rat_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"ru",                KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
            	              {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"qty",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
            	              {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"agent_ru",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"trf_cur_sum_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
            	              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Date",      Hidden:0, Width:75,    Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              
//            	              #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//            	              {Type:"Float",      Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
            	              {Type:"Float",      Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
            	              
            	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"inv_vat_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"agent_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
            	              {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"debit_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
            	              {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"credit_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
            	              {Type:"CheckBox",  Hidden:0, Width:120,   Align:"Center",  ColMerge:1,   SaveName:"ps_check",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck: 1 },
            	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_pay_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"agent_ps_code",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"profit_share",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cust_ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_chk_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Float",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_bal_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Float",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inco_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_bil_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cmb_inv_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"block_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"vchr_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"vchr_tp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
            	              //#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
       	                   	  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
       	                   	  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_xcrt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
       	                   	  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_amt",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },		               
       	                   	  //#5333 [STAR CLUSTER MEXICO] TAX INVOICE NO FIELD ADD TO D/C ENTRY
       	              	   	  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
       	              	   	  
            	              {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
          
            	     InitColumns(cols);
  				     SetEditable(1);
  				     SetColProperty('frt_cd_nm', {InputCaseSensitive:1} );
  				     SetColProperty('frt_cd', {ComboText:FRTCD2, ComboCode:FRTCD1} );
  				     SetColProperty('intg_bl_seq_2', {ComboText:BL_NO, ComboCode:INTG_BL_SEQ2} );
  					 SetColProperty('cntr_tpsz_cd', {ComboText:TPSZ1, ComboCode:TPSZ1} );
  					 SetColProperty('sell_buy_tp_cd', {ComboText:"DEBIT|CREDIT", ComboCode:"D|C"} );
  					 SetColProperty('aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
  					 SetColProperty('frt_term_cd', {ComboText:"PP|CC", ComboCode:"PP|CC"} );
  					 SetColProperty('inv_aply_curr_cd', {ComboText:' |'+CURRCD, ComboCode:' |'+CURRCD} );
  					 SetColProperty('rat_curr_cd', {ComboText:' |'+CURRCD, ComboCode:' |'+CURRCD} );
  					 
  					 SetHeaderRowHeight(20);
  					 SetHeaderRowHeight(21);
  	            	 InitComboNoMatchText(1,"",1); 
            	     SetSheetHeight(300);
                  	 resizeSheet();
        		 }
        		 
        	 }else{
        		 with (sheetObj) {
          	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
          	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
          	       var headers = [ { Text:getLabel('ACC_INV_0020_HDR2_1'), Align:"Center"},
          	                   { Text:getLabel('ACC_INV_0020_HDR2_2'), Align:"Center"} ];
          	       InitHeaders(headers, info);

          	       var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck:0 },
          	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"frt_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"frt_check",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck:0 },
          	              {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq_2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
          	              {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, EditLen:100 },
          	              {Type:"Combo",     Hidden:0, Width:55,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"frt_term_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"aply_ut_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"ru",                KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
          	              {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"qty",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
          	              {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"agent_ru",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"trf_cur_sum_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
          	              {Type:"Text",      Hidden:1, Width:70,   Align:"Center",   ColMerge:1,   SaveName:"rat_curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
          	              
//          	          #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//          	          {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
          	              {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
          	              
          	              {Type:"Date",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"inv_vat_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
          	              {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"agent_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
          	              {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"debit_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
          	              {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"credit_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
          	              {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ps_check",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck: 1 },
          	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_pay_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"agent_ps_code",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"profit_share",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cust_ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_chk_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Float",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_bal_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Float",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inco_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_bil_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cmb_inv_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"block_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"vchr_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"vchr_tp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
          	              //#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
          	              {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	              {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_xcrt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
   	              	   	  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_amt",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },		               
   	              	   	  //#5333 [STAR CLUSTER MEXICO] TAX INVOICE NO FIELD ADD TO D/C ENTRY
   	              	   	  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
   	              	   	  
          	              {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
        
          	         InitColumns(cols);
				     SetEditable(1);
				     SetColProperty('frt_cd', {ComboText:FRTCD2, ComboCode:FRTCD1} );
				     SetColProperty('frt_cd_nm', {InputCaseSensitive:1} );
   					 SetColProperty('intg_bl_seq_2', {ComboText:BL_NO, ComboCode:INTG_BL_SEQ2} );
					 SetColProperty('cntr_tpsz_cd', {ComboText:TPSZ1, ComboCode:TPSZ1} );
					 SetColProperty('sell_buy_tp_cd', {ComboText:"DEBIT|CREDIT", ComboCode:"D|C"} );
					 SetColProperty('aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
					 SetColProperty('frt_term_cd', {ComboText:"PP|CC", ComboCode:"PP|CC"} );
					 SetHeaderRowHeight(20);
					 SetHeaderRowHeight(21);
	            	 InitComboNoMatchText(1,"",1); 
          	       	 SetSheetHeight(300);
                	 resizeSheet();
             	}
        	 }
            break;
         case 2:      //IBSheet2 init
             with (sheetObj) {
//	             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
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
         case 3:      //IBSheet3 init
             with (sheetObj) {
//	             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	             var headers = [ { Text:"", Align:"Center"} ];
	             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:10,   Align:"Center",  ColMerge:1,   SaveName:"frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"frt_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, EditLen:100 },
                    {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:"qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:"rat_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:85,   Align:"Right",   ColMerge:1,   SaveName:"agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"debit_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"credit_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq_2",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"agent_ps_code",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag3",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
              
	             InitColumns(cols);
	             SetEditable(1);
	             SetVisible(false);
            }                                                      
             break;
         case 4:      //IBSheet4 init
             with (sheetObj) {
//	             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	             var headers = [ { Text:"", Align:"Center"} ];
	             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:10,   Align:"Center",  ColMerge:1,   SaveName:"frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"frt_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, EditLen:100 },
                    {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:"qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:"rat_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:85,   Align:"Right",   ColMerge:1,   SaveName:"agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"debit_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"credit_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq_2",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"agent_ps_code",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag4",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
              
	             InitColumns(cols);
	             SetEditable(1);
	             SetVisible(false);
            }                                                      
             break;
         case 5:      //TP/SZ init
		    with (sheetObj) {
//	             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	             var headers = [ { Text:"|", Align:"Center"} ];
	             InitHeaders(headers, info);
	
	             var cols = [ {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"" },
	                    {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"" } ];
	              
	             InitColumns(cols);
	             SetEditable(1);
	             SetVisible(false);
		      }                                                      
		  break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){	
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(sheetObj.GetCellValue(2,"inv_seq") != "-1" && sheetObj.GetCellValue(2,"inv_seq") != ""){
		var debit_tot=0;
		var credit_tot=0;
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		formObj.f_inv_no.value=sheetObj.GetCellValue(2,"inv_no");
		formObj.f_modi_tms.value=sheetObj.GetCellValue(2, "modi_tms");
		for(var i=2; i<=sheetObj.LastRow();i++){
			//LHK, 20140327, Credit 인 경우 ru 가 0 인경우 rate 끌고오기
			if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == "C" && (sheetObj.GetCellValue(i, "ru") == "" || Number(sheetObj.GetCellValue(i, "ru")) == 0)){
				sheetObj.SetCellValue(i, "ru",Number(sheetObj.GetCellValue(i, "agent_ru")));
			}
			sheetObj.SetCellEditable(i, "frt_check",0);
			sheetObj.SetColBackColor(2,"#EFEBEF");
			debit_tot   += roundXL(Number(sheetObj.GetCellValue(i, "debit_amt")),2);
			credit_tot  += roundXL(Number(sheetObj.GetCellValue(i, "credit_amt")),2);
			amt_tot 	+= ( roundXL(Number(sheetObj.GetCellValue(i, "debit_amt")),2) - roundXL(Number(sheetObj.GetCellValue(i, "credit_amt")),2) );
			totamt_tot 	+= ( roundXL(Number(sheetObj.GetCellValue(i, "debit_amt")),2) - roundXL(Number(sheetObj.GetCellValue(i, "credit_amt")),2) );
			//[20130819	OJG]
			if(sheetObj.GetCellValue(i, "aply_ut_cd") != 'SCN'){	//Unit 이 Container
				sheetObj.SetCellEditable(i, "cntr_tpsz_cd",0);
			}
		}
		formObj.f_debit_tot.value=doMoneyFmt(roundXL(debit_tot,2));
		formObj.f_credit_tot.value=doMoneyFmt(roundXL(credit_tot,2));
		if(amt_tot < 0){
			formObj.f_amt_tot.value=roundXL(amt_tot,2) * -1 ;
		}else{
			formObj.f_amt_tot.value=roundXL(amt_tot,2);
		}
		formObj.f_vatamt_tot.value=0;
		if(totamt_tot < 0){
			formObj.f_totamt_tot.value=roundXL(totamt_tot,2) * -1 ;
		}else{
			formObj.f_totamt_tot.value=roundXL(totamt_tot,2);
		}
		//TB_TRDP CUR_LMT_AMT 계산용
		formObj.f_old_sum_amt.value=formObj.f_totamt_tot.value;
		formObj.s_inv_no.value=formObj.temp_inv_no.value;
		formObj.f_agent_ref_no.value=sheetObj.GetCellValue(2, "cust_ref_no");
		formObj.f_remark.value=sheetObj.GetCellValue(2, "inv_rmk");
		formObj.f_agent_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");
		formObj.rpt_trdp_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");	//Email 전송 Setup
		formObj.f_agent_nm.value=sheetObj.GetCellValue(2, "inv_trdp_cd_nm");
		formObj.f_profit_share.value=sheetObj.GetCellValue(2, "profit_share");
		//2012/01/30추가
		formObj.old_trdp_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");
		formObj.f_amt_due.value=doMoneyFmt(sheetObj.GetCellValue(2, "inv_bal_amt"));
		formObj.f_paid_amt.value=doMoneyFmt(sheetObj.GetCellValue(2, "inv_pay_amt"));
		formObj.f_last_ck.value=sheetObj.GetCellValue(2, "last_chk_no");
		//#1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form]
		formObj.f_vchr_no.value=sheetObj.GetCellValue(2, "vchr_no");
		formObj.f_vchr_tp_cd.value=sheetObj.GetCellValue(2, "vchr_tp_cd");
		
		//#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
		if(formObj.f_vchr_no.value == ""){
	    	//AUTO 표시
			formObj.f_vchr_no.value = "AUTO";
	    }
		if(formObj.f_vchr_tp_cd.value == ""){
			formObj.f_vchr_tp_cd.value = "P"; //PAYMENT
		}	
		
		//#5333 [STAR CLUSTER MEXICO] TAX INVOICE NO FIELD ADD TO D/C ENTRY
		formObj.f_tax_no.value=sheetObj.GetCellValue(2, "tax_no");
		
		var post_dt=sheetObj.GetCellValue(2, "inv_post_dt");
		var inv_dt=sheetObj.GetCellValue(2, "inv_dt");
		var due_dt=sheetObj.GetCellValue(2, "inv_due_dt");
		var last_paid_dt=sheetObj.GetCellValue(2, "last_pay_dt");
		if(post_dt != ""){
			formObj.f_post_dt.value=post_dt.substring(0,2) 	  + "-" + post_dt.substring(2,4) 	  + "-" + post_dt.substring(4,8);
			formObj.old_post_dt.value=post_dt.substring(0,2) 	  + "-" + post_dt.substring(2,4) 	  + "-" + post_dt.substring(4,8);
		}
		if(inv_dt != ""){
			formObj.f_inv_dt.value=inv_dt.substring(0,2) 	  + "-" + inv_dt.substring(2,4) 	  + "-" + inv_dt.substring(4,8);
		}
		if(due_dt != ""){
			//term을 초기화한다.
			formObj.f_terms[0].selected=true;
			formObj.f_due_dt.value=due_dt.substring(0,2) 	  + "-" + due_dt.substring(2,4) 	  + "-" + due_dt.substring(4,8);
		}
		if(last_paid_dt != ""){
			formObj.f_last_paid_dt_cal.value=last_paid_dt.substring(0,2) + "-" + last_paid_dt.substring(2,4) + "-" + last_paid_dt.substring(4,8);
		}
		//#6887 [Star-MEX] Uncollected Invoice appears to have been deposited (Zen#4191)
		else {
			formObj.f_last_paid_dt_cal.value= "";
		}
		formObj.f_frgn_amt.value="";
		formObj.f_frgn_vat_amt.value="";
		formObj.f_frgn_sum_amt.value="";
		/*
		//Agent를 변경못하게 한다.
		formObj.f_agent_cd.readOnly=true;
		formObj.f_agent_cd.className="search_form-disable";
		formObj.f_agent_nm.readOnly=true;
		formObj.f_agent_nm.className="search_form-disable";
		formObj.agent_btn.onclick="";
		formObj.agent_btn.style.cursor="none";
		*/
		formObj.f_inco_cd.value=sheetObj.GetCellValue(2, "inco_cd");
		//formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "inv_aply_curr_cd");
		//#3249 [FULLTRANS CN]  Default value of currency in the AR Inovice Entry
		if(1 <= sheetObj.RowCount()){
			if(MULTI_CURR_FLAG == "Y"){
				if("" != sheetObj.GetCellValue(2, "inv_aply_curr_cd")){
					formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "inv_aply_curr_cd");
				}else{
					formObj.f_curr_cd.value=formObj.f_ofc_curr_cd.value;
				}
			}else{
				if("" != sheetObj.GetCellValue(2, "rat_curr_cd")){
					formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "rat_curr_cd");
				}else{
					formObj.f_curr_cd.value=formObj.f_ofc_curr_cd.value;
				}
			}
			//#3487 오류 수정
			if(formObj.f_inv_seq.value == "")
				//#3370 [CNR GZ] User claimed that incorrect exchange rate applied when issuing AR or AP Invoice
				setCurrency();
			
		}
		
		/*
		// DEPOSIT, CHECK 등록시 삭제를 불가능하게 한다.
		if(Number(removeComma(formObj.f_paid_amt.value)) != 0){
			deleteBtn1.style.display="none";
		}
		*/
		//getBtnObj('deleteBtn2').style.display="none";
		if(sheetObj.GetCellValue(2, "tax_bil_flg") == "Y"){
			formObj.f_tax_bill.checked=true;
		}
		//마감처리를 한다.
		if(sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y"){
			execMagam();
		}
		//입금 및 출금 처리후(DEPOSIT, CHECK 후) 마감처리
		if(Number(removeComma(formObj.f_paid_amt.value)) != 0 || sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y"){
			execMagam();
			//CUSTOMER 변경불가
			//Agent를 변경못하게 한다.
			formObj.f_agent_cd.readOnly=true;
			formObj.f_agent_cd.className="search_form-disable";
			formObj.f_agent_nm.readOnly=true;
			formObj.f_agent_nm.className="search_form-disable";
			formObj.agent_btn.onclick="";
			formObj.agent_btn.style.cursor="none";
			//formObj.f_agent_cd.onblur	   	= "";
		}
		//Combine 연결시 마감처리를 한다.
		if(sheetObj.GetCellValue(2, "cmb_inv_seq") != ""){
			execMagam();
		}
		
		//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
		formObj.f_loc_ex_rate.value = sheetObj.GetCellValue(2, "locl_xcrt");
		//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
		if(formObj.f_loc_ex_rate.value == "" || formObj.f_loc_ex_rate.value == "0"){
			getLoclExRate();
		}			
		
	}else{
		formObj.s_bl_no.value=formObj.temp_bl_no.value;
		formObj.s_oth_no.value=formObj.temp_oth_no.value;
		if(formObj.s_bl_no.value != "" && formObj.f_biz_clss_cd.value == "H"){
			formObj.s_ref_no.value="";
		}else {
			if(formObj.s_oth_no.value == ""){
				formObj.s_ref_no.value=formObj.temp_ref_no.value;
			}
		}
		var debit_tot=0;
		var credit_tot=0;
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		//OFVFOUR-7986: [AIF] OPUS Error question - Inv no :AWI9200
		var chk_fr_frt_seq_tmp = '';
		for(var i=2; i<=sheetObj.LastRow();i++){
			//[20150317 YJW] AEH B/L에서 Default New로 계산된 Amount가 재계산되지 않도록 하기 위해 로직 추가 => intg_bl_seq_2 컬럼이 변경되었을 때만 Onchange 이벤트 타도록 처리
			sheetObj.SetCellEditable(i, "frt_check",1);
			
			//#1289 [AIF] AGENT STATEMENT DEBIT - CREDIT -> WRONG BALANCE
			if(sheetObj.GetCellValue(i, "frt_term_cd") == "PP"){
				//sheetObj.SetCellValue(i, "debit_amt","0");
				//sheetObj.SetCellValue(i, "credit_amt","0");
				sheetObj.SetCellValue(i, "debit_amt","0",0);
				sheetObj.SetCellValue(i, "credit_amt","0",0);
				sheetObj.SetCellEditable(i, "credit_amt",0);
				sheetObj.SetCellEditable(i, "debit_amt",0);
			}	
			
			
			if(formObj.f_agent_cd.value == sheetObj.GetCellValue(i, "trdp_cd")){
				sheetObj.SetCellValue(i, "frt_check","1",0);
				//sheetObj.SetCellValue(i, "inv_xcrt_dt",formObj.f_inv_dt.value);
				//#3973 [JAPT]Invoice Date & Ex.Rate
				//BL entry 에서 넘어오는경우 inv_xcrt_dt 유지한다 				
				if(BL_FRT_YN != 'Y'){
					sheetObj.SetCellValue(i, "inv_xcrt_dt",formObj.f_inv_dt.value,0);
				}
				debit_tot   += Number(sheetObj.GetCellValue(i, "debit_amt"));
				credit_tot  += Number(sheetObj.GetCellValue(i, "credit_amt"));
				amt_tot 	+= ( Number(sheetObj.GetCellValue(i, "debit_amt")) - Number(sheetObj.GetCellValue(i, "credit_amt")) );
				totamt_tot 	+= ( Number(sheetObj.GetCellValue(i, "debit_amt")) - Number(sheetObj.GetCellValue(i, "credit_amt")) );
			}
			//BL_NO DEFAULT SET
			//sheetObj.SetCellValue(i, "intg_bl_seq_2",formObj.f_intg_bl_seq.value);
			sheetObj.SetCellValue(i, "intg_bl_seq_2",formObj.f_intg_bl_seq.value,0);
			
			if(sheetObj.GetCellValue(i, "aply_ut_cd") != 'SCN'){	//Unit 이 Container
				sheetObj.SetCellEditable(i, "cntr_tpsz_cd",0);
			}
			//OFVFOUR-7986: [AIF] OPUS Error question - Inv no :AWI9200
			if(sheetObj.GetCellValue(i, "frt_seq") != ''){
				if(chk_fr_frt_seq_tmp == ''){
					chk_fr_frt_seq_tmp = sheetObj.GetCellValue(i, "frt_seq");
				}else{
					chk_fr_frt_seq_tmp += ', ' + sheetObj.GetCellValue(i, "frt_seq");
				}
			}
		}
		//OFVFOUR-7986: [AIF] OPUS Error question - Inv no :AWI9200
		formObj.chk_fr_frt_seq.value = chk_fr_frt_seq_tmp;
		
		if(formObj.f_intg_bl_seq.value != "" && formObj.chk_fr_frt_seq.value != "" && formObj.f_inv_seq.value == ""){
			var chk_fr_frt_seq=formObj.chk_fr_frt_seq.value;
			ajaxSendPost(getFrtModiTms, 'reqVal', '&goWhere=aj&bcKey=searchFrtModiTms&frt_seq='+chk_fr_frt_seq, './GateServlet.gsl');
		}
		
		formObj.f_debit_tot.value=doMoneyFmt(roundXL(debit_tot,2));
		formObj.f_credit_tot.value=doMoneyFmt(roundXL(credit_tot,2));
		if(amt_tot < 0){
			formObj.f_amt_tot.value=roundXL(amt_tot,2) * -1 ;
		}else{
			formObj.f_amt_tot.value=roundXL(amt_tot,2);
		}
		formObj.f_vatamt_tot.value=0;
		if(totamt_tot < 0){
			formObj.f_totamt_tot.value=roundXL(totamt_tot,2) * -1 ;
		}else{
			formObj.f_totamt_tot.value=roundXL(totamt_tot,2);
		}
		formObj.f_frgn_amt.value="";
		formObj.f_frgn_vat_amt.value="";
		formObj.f_frgn_sum_amt.value="";
		//Agent를 변경못하게 한다.
		/*formObj.f_agent_cd.readOnly=false;
		formObj.f_agent_cd.className="search_form";
		formObj.f_agent_nm.readOnly=false;
		formObj.f_agent_nm.className="search_form";
		formObj.agent_btn.onclick=doWork('CUSTOMER_POPLIST');
		formObj.agent_btn.style.cursor="hand";
		*/
		
		//#3249 [FULLTRANS CN]  Default value of currency in the AR Inovice Entry
		if(1 <= sheetObj.RowCount()){
			if(MULTI_CURR_FLAG == "Y"){
				if("" != sheetObj.GetCellValue(2, "inv_aply_curr_cd")){
					formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "inv_aply_curr_cd");
				}else{
					formObj.f_curr_cd.value=formObj.f_ofc_curr_cd.value;
				}
			}else{
				if("" != sheetObj.GetCellValue(2, "rat_curr_cd")){
					formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "rat_curr_cd");
				}else{
					formObj.f_curr_cd.value=formObj.f_ofc_curr_cd.value;
				}
			}
			
			//#3973 [JAPT]Invoice Date & Ex.Rate
			//BL entry 에서 넘어오는경우 inv_xcrt 재계산을 하지않는다			
			if(BL_FRT_YN != 'Y'){
				//#3487 오류 수정
				if(formObj.f_inv_seq.value == "")
					//#3370 [CNR GZ] User claimed that incorrect exchange rate applied when issuing AR or AP Invoice
					setCurrency();
				
			}
			
		}
		
		//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
		getLoclExRate();
				
	}
	// CNTR TP/SZ 값을 셋팅한다.
	for(var i=2; i<=sheetObj.LastRow();i++){
	}
	//2011/12/09 Chungrue 추가
	//DEBIT 일때 DEBIT금액만 입력가능
	//CREDIT 일때 CREDIT금액만 입력가능
	for(var i=2; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == "D"){
			sheetObj.SetCellEditable(i, "credit_amt",0);
		}else if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == "C"){
			sheetObj.SetCellEditable(i, "debit_amt",0);
		}
	}
	//천단위 콤마
	formObj.f_amt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_amt_tot.value)),2));
	formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_vatamt_tot.value)),2));
	formObj.f_totamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_totamt_tot.value)),2));
	
	//#1289 [AIF] AGENT STATEMENT DEBIT - CREDIT -> WRONG BALANCE
//	for(var i=2; i<=sheetObj.LastRow();i++){
//		if(sheetObj.GetCellValue(i, "frt_term_cd") == "PP"){
//			//sheetObj.SetCellValue(i, "debit_amt","0");
//			//sheetObj.SetCellValue(i, "credit_amt","0");
//			sheetObj.SetCellValue(i, "debit_amt","0",0);
//			sheetObj.SetCellValue(i, "credit_amt","0",0);
//			sheetObj.SetCellEditable(i, "credit_amt",0);
//			sheetObj.SetCellEditable(i, "debit_amt",0);
//		}	
//	}
	// LHK, 최종 Load 후에 권한 체크하여 화면 control 함
	authControl();
	//Bug #25563 A/R Entry, D/C Note Entry Invoice No Validation
	if (formObj.f_inv_no.value != '') {
		formObj.f_inv_no.readOnly=true;
		formObj.f_inv_no.className="search_form-disable";
	} else {
		formObj.f_inv_no.readOnly=false;
		formObj.f_inv_no.className="search_form";
	}
	//LHK, 20140418, Credit/Debit 최종 금액에 따라 Crdit, Debit 여부
	 var v_debit_tot=parseFloat(eval((formObj.f_debit_tot.value).replaceAll(",","")));
	 var v_credit_tot=parseFloat(eval((formObj.f_credit_tot.value).replaceAll(",",""))); 
	 if(v_debit_tot - v_credit_tot < 0){
		 formObj.f_old_inv_tp.value="C";
	 }else{
		 formObj.f_old_inv_tp.value="D";
	 }
	 
	 fnbtnCtl(2);
	 
} 

//조회 후 페이지징 표시(Auto 버튼 클릭)
function sheet3_OnSearchEnd(){
    var sheetObj=docObjects[0];
    var sheetObj3=docObjects[2];
    var formObj=document.frm1;
    
    //Auto 버튼 클릭시
	for(var i=1; i<= sheetObj3.LastRow(); i++){
	   if(sheetObj3.GetCellValue(i, "frt_seq") != "" && sheetObj3.GetCellValue(i, "frt_seq") != undefined){
		   if(sheetObj.GetCellValue(sheetObj.LastRow(), "frt_term_cd") == ""){
    	    	sheetObj.RemoveAll();
    	   }
		   var intRows=sheetObj.LastRow() + 1;
           sheetObj.DataInsert(intRows);
           sheetObj.SetCellValue(intRows, "frt_check","1");
           sheetObj.SetCellValue(intRows, "frt_seq",sheetObj3.GetCellValue(i, "frt_seq"));
           sheetObj.SetCellValue(intRows, "frt_cd",sheetObj3.GetCellValue(i, "frt_cd"));
           sheetObj.SetCellValue(intRows, "frt_cd_nm",sheetObj3.GetCellValue(i, "frt_cd_nm"));
           sheetObj.SetCellValue(intRows, "sell_buy_tp_cd",sheetObj3.GetCellValue(i, "sell_buy_tp_cd"));
           sheetObj.SetCellValue(intRows, "frt_term_cd",sheetObj3.GetCellValue(i, "frt_term_cd"));
           sheetObj.SetCellValue(intRows, "aply_ut_cd",sheetObj3.GetCellValue(i, "aply_ut_cd"));
           sheetObj.SetCellValue(intRows, "cntr_tpsz_cd",sheetObj3.GetCellValue(i, "cntr_tpsz_cd"));
           sheetObj.SetCellValue(intRows, "qty",sheetObj3.GetCellValue(i, "qty"));
           sheetObj.SetCellValue(intRows, "ru",sheetObj3.GetCellValue(i, "ru"));
           sheetObj.SetCellValue(intRows, "agent_ru",sheetObj3.GetCellValue(i, "agent_ru"));
           sheetObj.SetCellValue(intRows, "trf_cur_sum_amt",sheetObj3.GetCellValue(i, "trf_cur_sum_amt"));
           sheetObj.SetCellValue(intRows, "rat_curr_cd",sheetObj3.GetCellValue(i, "rat_curr_cd"));
           sheetObj.SetCellValue(intRows, "inv_xcrt",sheetObj3.GetCellValue(i, "inv_xcrt"));
           sheetObj.SetCellValue(intRows, "inv_xcrt_dt",sheetObj3.GetCellValue(i, "inv_xcrt_dt"));
           sheetObj.SetCellValue(intRows, "inv_amt",sheetObj3.GetCellValue(i, "inv_amt"));
           sheetObj.SetCellValue(intRows, "inv_vat_amt",sheetObj3.GetCellValue(i, "inv_vat_amt"));
           sheetObj.SetCellValue(intRows, "inv_sum_amt",sheetObj3.GetCellValue(i, "inv_sum_amt"));
		   //LHK, 20140327, Credit 인 경우 ru 가 0 인경우 rate 끌고오기
           if(sheetObj.GetCellValue(intRows, "sell_buy_tp_cd") == "C" && (sheetObj.GetCellValue(intRows, "ru") == "" || Number(sheetObj.GetCellValue(intRows, "ru")) == 0)){
        	   sheetObj.SetCellValue(intRows, "ru",Number(sheetObj.GetCellValue(intRows, "agent_ru")));
		   }
           if(sheetObj.GetCellValue(intRows, "sell_buy_tp_cd") == "D"){
        	   sheetObj.SetCellValue(intRows, "agent_amt",sheetObj3.GetCellValue(i, "debit_amt"));
		   }else{
			   sheetObj.SetCellValue(intRows, "agent_amt",sheetObj3.GetCellValue(i, "credit_amt"));
		   }
           if(sheetObj.GetCellValue(intRows, "frt_term_cd") == "CC"){
        	   sheetObj.SetCellValue(intRows, "debit_amt",sheetObj3.GetCellValue(i, "debit_amt"));
        	   sheetObj.SetCellValue(intRows, "credit_amt",sheetObj3.GetCellValue(i, "credit_amt"));
		   }else{
			   sheetObj.SetCellValue(intRows, "debit_amt",0);
		   sheetObj.SetCellValue(intRows, "credit_amt",0);
		   }
		   if(formObj.f_intg_bl_seq.value != ""){
			   sheetObj.SetCellValue(intRows, "intg_bl_seq",formObj.f_intg_bl_seq.value);
           }else if(formObj.f_oth_seq.value != ""){
        	   sheetObj.SetCellValue(intRows, "oth_seq",formObj.f_oth_seq.value);
           }
		   sheetObj.SetCellValue(intRows, "intg_bl_seq_2",sheetObj3.GetCellValue(i, "intg_bl_seq"));
		   sheetObj.SetCellValue(intRows, "agent_ps_code",sheetObj3.GetCellValue(i, "agent_ps_code"));
		   sheetObj.SetCellValue(intRows, "trdp_cd",sheetObj3.GetCellValue(i, "trdp_cd"));
	   }
   }
}

//조회 후 페이지징 표시(Auto(O/F) 버튼 클릭)
function sheet4_OnSearchEnd(){
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    var sheetObj4=docObjects[3];
    var formObj=document.frm1;
	for(var i=1; i<= sheetObj4.LastRow(); i++){
	   if(sheetObj4.GetCellValue(i, "frt_seq") != "" && sheetObj4.GetCellValue(i, "frt_seq") != undefined){
		   if(sheetObj.GetCellValue(sheetObj.LastRow(), "frt_term_cd") == ""){
 	    	sheetObj.RemoveAll();
 	   }
//		   var intRows=sheetObj.Rows;
		var intRows=sheetObj.LastRow() + 1;
		   
        sheetObj.DataInsert(intRows);
        sheetObj.SetCellValue(intRows, "frt_check","1");
        sheetObj.SetCellValue(intRows, "frt_seq",sheetObj4.GetCellValue(i, "frt_seq"));
        sheetObj.SetCellValue(intRows, "frt_cd",sheetObj4.GetCellValue(i, "frt_cd"));
        sheetObj.SetCellValue(intRows, "frt_cd_nm",sheetObj4.GetCellValue(i, "frt_cd_nm"));
        sheetObj.SetCellValue(intRows, "sell_buy_tp_cd",sheetObj4.GetCellValue(i, "sell_buy_tp_cd"));
        sheetObj.SetCellValue(intRows, "frt_term_cd",sheetObj4.GetCellValue(i, "frt_term_cd"));
        sheetObj.SetCellValue(intRows, "aply_ut_cd",sheetObj4.GetCellValue(i, "aply_ut_cd"));
        sheetObj.SetCellValue(intRows, "cntr_tpsz_cd",sheetObj4.GetCellValue(i, "cntr_tpsz_cd"));
        sheetObj.SetCellValue(intRows, "qty",sheetObj4.GetCellValue(i, "qty"));
        sheetObj.SetCellValue(intRows, "ru",sheetObj4.GetCellValue(i, "ru"));
        sheetObj.SetCellValue(intRows, "agent_ru",sheetObj4.GetCellValue(i, "agent_ru"));
        sheetObj.SetCellValue(intRows, "trf_cur_sum_amt",sheetObj4.GetCellValue(i, "trf_cur_sum_amt"));
        sheetObj.SetCellValue(intRows, "rat_curr_cd",sheetObj4.GetCellValue(i, "rat_curr_cd"));
        sheetObj.SetCellValue(intRows, "inv_xcrt",sheetObj4.GetCellValue(i, "inv_xcrt"));
        sheetObj.SetCellValue(intRows, "inv_xcrt_dt",sheetObj4.GetCellValue(i, "inv_xcrt_dt"));
        sheetObj.SetCellValue(intRows, "inv_amt",sheetObj4.GetCellValue(i, "inv_amt"));
        sheetObj.SetCellValue(intRows, "inv_vat_amt",sheetObj4.GetCellValue(i, "inv_vat_amt"));
        sheetObj.SetCellValue(intRows, "inv_sum_amt",sheetObj4.GetCellValue(i, "inv_sum_amt"));
		   //LHK, 20140327, Credit 인 경우 ru 가 0 인경우 rate 끌고오기
        if(sheetObj.GetCellValue(intRows, "sell_buy_tp_cd") == "C" && (sheetObj.GetCellValue(intRows, "ru") == "" || Number(sheetObj.GetCellValue(intRows, "ru")) == 0)){
     	   sheetObj.SetCellValue(intRows, "ru",Number(sheetObj.GetCellValue(intRows, "agent_ru")));
		   }
        if(sheetObj.GetCellValue(intRows, "sell_buy_tp_cd") == "D"){
     	   sheetObj.SetCellValue(intRows, "agent_amt",sheetObj4.GetCellValue(i, "debit_amt"));
		   }else{
			   sheetObj.SetCellValue(intRows, "agent_amt",sheetObj4.GetCellValue(i, "credit_amt"));
		   }
        sheetObj.SetCellValue(intRows, "debit_amt",sheetObj4.GetCellValue(i, "debit_amt"));
        sheetObj.SetCellValue(intRows, "credit_amt",sheetObj4.GetCellValue(i, "credit_amt"));
		   if(formObj.f_intg_bl_seq.value != ""){
			   sheetObj.SetCellValue(intRows, "intg_bl_seq",formObj.f_intg_bl_seq.value);
        }else if(formObj.f_oth_seq.value != ""){
     	   sheetObj.SetCellValue(intRows, "oth_seq",formObj.f_oth_seq.value);
        }
		   sheetObj.SetCellValue(intRows, "intg_bl_seq_2",sheetObj4.GetCellValue(i, "intg_bl_seq"));
		   sheetObj.SetCellValue(intRows, "agent_ps_code",sheetObj4.GetCellValue(i, "agent_ps_code"));
		   sheetObj.SetCellValue(intRows, "trdp_cd",sheetObj4.GetCellValue(i, "trdp_cd"));
	   }
	}
}

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	formObj.f_inv_seq.value=sheetObj.GetCellValue(2,"inv_seq");
	formObj.s_inv_no.value=sheetObj.GetCellValue(2,"inv_no");
	formObj.f_inv_no.value=sheetObj.GetCellValue(2,"inv_no");
	formObj.temp_inv_no.value=sheetObj.GetCellValue(2,"inv_no");
	formObj.f_modi_tms.value=sheetObj.GetCellValue(2, "modi_tms");
	
	//#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
	formObj.f_vchr_no.value=sheetObj.GetCellValue(2, "vchr_no");
	formObj.f_vchr_tp_cd.value=sheetObj.GetCellValue(2, "vchr_tp_cd");
	if(formObj.f_vchr_no.value == ""){
    	//AUTO 표시
		formObj.f_vchr_no.value = "AUTO";
    }
	if(formObj.f_vchr_tp_cd.value == ""){
		formObj.f_vchr_tp_cd.value = "P"; //PAYMENT
	}		
	
	if(formObj.f_inv_seq.value != ""){
		for(var i=2; i<=sheetObj.LastRow();i++){
			sheetObj.SetCellEditable(i, "frt_check",0);
			sheetObj.SetColBackColor(2,"#EFEBEF");
		}
		formObj.s_bl_no.value="";
		formObj.s_ref_no.value="";
		formObj.s_oth_no.value="";
		formObj.f_remark.value=sheetObj.GetCellValue(2,"inv_rmk");
		formObj.f_frgn_amt.value="";
		formObj.f_frgn_vat_amt.value="";
		formObj.f_frgn_sum_amt.value="";
		formObj.f_old_sum_amt.value=formObj.f_totamt_tot.value;
		//천단위 콤마
		formObj.f_debit_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_debit_tot.value)),2));
		formObj.f_credit_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_credit_tot.value)),2));
		//천단위 콤마
		formObj.f_amt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_amt_tot.value)),2));
		formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_vatamt_tot.value)),2));
		formObj.f_totamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_totamt_tot.value)),2));
		var last_paid_dt=sheetObj.GetCellValue(2, "last_pay_dt");
		if(last_paid_dt != ""){
			formObj.f_last_paid_dt_cal.value=last_paid_dt.substring(0,2) + "-" + last_paid_dt.substring(2,4) + "-" + last_paid_dt.substring(4,8)
		}
		//#6887 [Star-MEX] Uncollected Invoice appears to have been deposited (Zen#4191)
		else {
			formObj.f_last_paid_dt_cal.value= "";
		}
		formObj.f_amt_due.value=doMoneyFmt(sheetObj.GetCellValue(2, "inv_bal_amt"));
		formObj.f_paid_amt.value=doMoneyFmt(sheetObj.GetCellValue(2, "inv_pay_amt"));
		formObj.f_last_ck.value=sheetObj.GetCellValue(2, "last_chk_no");
		/*
		//Agent를 변경못하게 한다.
		formObj.f_agent_cd.readOnly=true;
		formObj.f_agent_cd.className="search_form-disable";
		formObj.f_agent_nm.readOnly=true;
		formObj.f_agent_nm.className="search_form-disable";
		document.getElementById('agent_btn').disabled=true;
		formObj.agent_btn.src=APP_PATH+"/web/img/main/blank.gif";
		formObj.agent_btn.style.cursor="none";
		//Agent를 변경못하게 한다.
		formObj.f_agent_cd.readOnly=true;
		formObj.f_agent_cd.className="search_form-disable";
		formObj.f_agent_nm.readOnly=true;
		formObj.f_agent_nm.className="search_form-disable";
		formObj.agent_btn.onclick="";
		formObj.agent_btn.style.cursor="none";
		*/
		formObj.f_inco_cd.value=sheetObj.GetCellValue(2, "inco_cd");
		formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "inv_aply_curr_cd");
		//2012/01/30추가
		formObj.old_trdp_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");
		/*
		// DEPOSIT, CHECK 등록시 삭제를 불가능하게 한다.
		if(Number(removeComma(formObj.f_paid_amt.value)) != 0){
			deleteBtn1.style.display="none";
		}
		*/
		//getBtnObj('deleteBtn2').style.display="none";
		
		//마감처리를 한다.
		if(sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y"){
			execMagam();
			
			//CUSTOMER 변경불가
			//Agent를 변경못하게 한다.
			formObj.f_agent_cd.readOnly=true;
			formObj.f_agent_cd.className="search_form-disable";
			formObj.f_agent_nm.readOnly=true;
			formObj.f_agent_nm.className="search_form-disable";
			formObj.agent_btn.onclick="";
			formObj.agent_btn.style.cursor="none";
			//formObj.f_agent_cd.onblur	   	= "";
		}
		
		//#2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.f_inv_no.value);
	}
	//2011/12/09 Chungrue 추가
	//DEBIT 일때 DEBIT금액만 입력가능
	//CREDIT 일때 CREDIT금액만 입력가능
	for(var i=2; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == "D"){
			sheetObj.SetCellEditable(i, "credit_amt",0);
		}else if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == "C"){
			sheetObj.SetCellEditable(i, "debit_amt",0);
		}
	}
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
		
		if(formObj.f_cmd.value == COMMAND02){
			doWork("PRINT");
		}
	}
	//doWork("SEARCHLIST");
	for(var i=2; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "frt_term_cd") == "PP"){
			sheetObj.SetCellValue(i, "debit_amt","0");
			sheetObj.SetCellValue(i, "credit_amt","0");
			sheetObj.SetCellEditable(i, "credit_amt",0);
			sheetObj.SetCellEditable(i, "debit_amt",0);
		}	
	}
	// LHK, 최종 Load 후에 권한 체크하여 화면 control 함
	authControl();
	
	// #298 [Starcluster] Roll control option with worng logic
	fnbtnCtl(2);
	
	//Bug #25563 A/R Entry, D/C Note Entry Invoice No Validation
	if (formObj.f_inv_no.value != '') {
		formObj.f_inv_no.readOnly=true;
		formObj.f_inv_no.className="search_form-disable";
	} else {
		formObj.f_inv_no.readOnly=false;
		formObj.f_inv_no.className="search_form";
	}
	//LHK, 20140418, Credit/Debit 최종 금액에 따라 Crdit, Debit 여부
	 var v_debit_tot=parseFloat(eval((formObj.f_debit_tot.value).replaceAll(",","")));
	 var v_credit_tot=parseFloat(eval((formObj.f_credit_tot.value).replaceAll(",",""))); 
	 if(v_debit_tot - v_credit_tot < 0){
		 formObj.f_old_inv_tp.value="C";
	 }else{
		 formObj.f_old_inv_tp.value="D";
	 }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
        case "frt_check" :
        	var amt_sum=0;
        	var vat_amt_sum=0;
        	var tot_amt_sum=0;
        	if(sheetObj.GetCellEditable(Row, "frt_check")){
        		if(sheetObj.GetCellValue(Row,"del_chk") == "1"){
            		sheetObj.SetCellValue(Row,"del_chk","0",0);
            	}
        	}
        	if(formObj.f_agent_cd.value == ""){
        		//[Agent's Name] is mandatory field.
        		alert(getLabel('FMS_COM_ALT007'));
        		formObj.f_agent_cd.focus();
        		sheetObj.SetCellValue(Row,"frt_check","1");
        	}
        	else{
        		/* 2012/03/05 주석처리함
if(formObj.f_agent_cd.value == sheetObj.GetCellValue(Row, "trdp_cd")){
        			// 2012/02/09 주석처리함
        			//sheetObj.CellValue(Row, "rat_curr_cd") = formObj.f_curr_cd.value;
    				//sheetObj.CellValue(Row, "inv_xcrt") = 1;
            	}
            	else{
            		//Check the Customer Info of selected row
            		alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_CUST'));
            		sheetObj.SetCellValue(Row,"frt_check","1");
            	}
        		*/
        	}
        	break;
        case "del_chk" :
        	if(sheetObj.GetCellValue(Row,"frt_check") == "1"){
        		sheetObj.SetCellValue(Row,"frt_check","0");
        	}
        	/*	[20140112 OJG]
if(sheetObj.GetCellValue(Row, "ibflag") == "I"){
    			sheetObj.RowDelete(Row,false);
    		}
			*/
    		break;
        case "cntr_tpsz_cd" :
        	if(sheetObj.GetCellValue(Row, "aply_ut_cd")!='SCN' && sheetObj.GetCellEditable(Row, "cntr_tpsz_cd") == true){
				//Please check Unit Type.
				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_UNTP'));
				sheetObj.SelectCell(Row, "aply_ut_cd");
				return;
			}
        break; 	
	}
}
function sheet1_OnPopupClick(sheetObj, row, col){
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	//Freight Code조회
	if(colStr == "frt_cd"){
   		rtnary=new Array(1);
   		rtnary[0]="";
   		rtnary[1]="";
   		rtnary[2]="";
   		rtnary[3]="";
   		rtnary[4]="";
   		rtnary[5]="Y";
        var rtnVal =  ComOpenWindow('./CMM_POP_0070.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px" , true);
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, "frt_cd",rtnValAry[0]);
			sheetObj.SetCellValue(row, "frt_cd_nm",rtnValAry[1]);
			//기존 입력값 초기화
			sheetObj.SetCellValue(row, "cntr_tpsz_cd",'');
			sheetObj.SetCellValue(row, "qty",'');
			sheetObj.SetCellValue(row, "vat_amt",'');
			sheetObj.SetCellValue(row, "inv_amt",'');
			sheetObj.SetCellValue(row, "inv_vat_amt",'');
			frm1.f_curRow.value=row;
			var parmStr='&goWhere=aj&bcKey=searchMyTaxRate';
			parmStr += '&f_frt_cd='+rtnValAry[0]; 
			ajaxSendPost(setTaxRate,  'reqVal', parmStr, './GateServlet.gsl');
		}
    //Buying/Credit인 경우 Invoice 환률을 선택한다.
	}else if(colStr == "rat_curr_cd"){     
    	rtnary=new Array(1);
   		rtnary[0]="1";
        var rtnVal =  ComOpenWindow('./CMM_POP_0040.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px" , true);
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, col,rtnValAry[0]);
			sheetObj.SetCellValue(row, 'inv_xcrt','');
			sheetObj.SetCellValue(row, 'inv_amt','');
			sheetObj.SetCellValue(row, 'inv_vat_amt','');
			if(sheetObj.GetCellValue(row,  "rat_curr_cd") == sheetObj.GetCellValue(row, "rat_curr_cd")){
				sheetObj.SetCellValue(row, "inv_xcrt",1);
			}
		}
	//Invoice Exchange rate
	}else if(colStr=="inv_xcrt"){
		//팝업 호출 조건을 확인한다.
		if(sheetObj.GetCellValue(row, 'ru') == ''){
   			//Please enter \"Rate!\"!
   			alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_RATE'));
   			return;
   		//Currency 선택여부 확인
		}else if(sheetObj.GetCellValue(row, 'rat_curr_cd') == ''){
   			//Please select \"Currency!\"!
   			alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_RATE'));
   			return;
   		}
		rtnary=new Array(1);
   		rtnary[0]="2";
   		//P/C 구분에 따라서 조회할 환률을 선택한다. 
   		var fndCurr='';
   		var post_dt=formObj.f_post_dt.value.replaceAll("-","");
   		post_dt=post_dt.substring(4,8) + post_dt.substring(0,2) + post_dt.substring(2,4);
   		fndCurr=sheetObj.GetCellValue(row, 'rat_curr_cd');
   		var paramStr='?f_fm_curr_cd='+sheetObj.GetCellValue(row, "rat_curr_cd");
   		paramStr+= '&f_inv_curr_cd='+sheetObj.GetCellValue(row, 'rat_curr_cd');
		//paramStr+= '&f_dft_dt=' +sheetObj.CellValue(row, "inv_xcrt_dt");  
		paramStr+= '&f_dft_dt=' + post_dt;
		//paramStr+= '&f_trdp_cd='+sheetObj.CellValue(row, "trdp_cd");
		//paramStr+= '&f_trdp_nm='+sheetObj.CellValue(row, "trdp_nm");
		paramStr+= '&f_trdp_cd='+frm1.f_agent_cd.value;
		paramStr+= '&f_trdp_nm='+frm1.f_agent_nm.value;
   		var rtnVal =  ComOpenWindow('./CMM_POP_0220.clt'+paramStr,  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:750px;dialogHeight:600px" , true);
   		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, "inv_xcrt",rtnValAry[0]);//EX. Rate  inv_xcrt
			sheetObj.SetCellValue(row, "rat_curr_cd",rtnValAry[1]);//xch_curr_cd
			calcInvAmt(sheetObj, row, objPfx);
		}
	}
}
function sheet1_OnChange(sheetObj, row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	/*
var qty=Number(sheetObj.GetCellValue(row, "qty"));
var ru=Number(sheetObj.GetCellValue(row, "ru"));
var vat_rt=Number(sheetObj.GetCellValue(row, "vat_rt"));
var vat_amt=Number(sheetObj.GetCellValue(row, "vat_amt"));
var inv_xcrt=Number(sheetObj.GetCellValue(row, "inv_xcrt"));
var inv_amt=Number(sheetObj.GetCellValue(row, "inv_amt"));
var inv_vat_amt=Number(sheetObj.GetCellValue(row, "inv_vat_amt"));
	*/
	/*
	 * Currency에 의해 금액 결과값의 포맷이 달라짐
	 * KRW, JPY은 소수점이 없는 금액임
	 * Math.round 처리함
	 */
	// 2012/03/07 FREIGHT의 CURR에서 INVOICE의 CURR로 변경
	//var curr = sheetObj.CellValue(row, "rat_curr_cd");
	//var curr=formObj.f_curr_cd.value;
	//---------------------[20140112 GOJ]-----------------------------
	if(colStr == "del_chk"){
		var delChkCnt=0;
		//alert(sheetObj.RowCount); alert(sheetObj.CheckedRows("del_chk"));
		if(sheetObj.RowCount()> 0 && sheetObj.RowCount()== sheetObj.CheckedRows("del_chk")){
			alert(getLabel('ACC_MSG135'));
			sheetObj.SetCellValue(row, 'del_chk',0,0);
			return;
		}else{
//			#1582 [BINEX] DEBIT NOTE #BJFKCD102478 MISSING ON SYSTEM // D/N disapear from our system
			for(var i = sheetObj.HeaderRows(); i < sheetObj.LastRow() + 1; i++){
				if(sheetObj.GetCellValue(i, "ibflag") == "I"){
					delChkCnt++;
				}else{
					if(sheetObj.GetCellValue(i, "del_chk") == "1"){
						delChkCnt++;
					}
				}
			}
			
			if(sheetObj.RowCount() - delChkCnt < 1){
				if(sheetObj.GetCellValue(row, "ibflag") == "I"){
		    		//sheetObj.CellValue2(Row, "del_chk") = "0";
					sheetObj.RowDelete(row,false);
					return;
				}else{
					alert(getLabel('ACC_MSG135'));
					sheetObj.SetCellValue(row, 'del_chk',0,0);
					return;
				}
			}
		}
		if(sheetObj.GetCellValue(row, "ibflag") == "I"){
    		//sheetObj.SetCellValue(Row, "del_chk", 0, 0);
			sheetObj.RowDelete(row,false);
		}
	}
	//---------------------[20140112 GOJ]-----------------------------
	if(colStr == "frt_cd"){
		var frt_cd=sheetObj.GetCellValue(row, 'frt_cd');
		//doAutoSearch(sheetObj, row, 'frt_cd', 'freight', codeStr, 'frt_cd', 'frt_cd_nm');
		SELECTROW=row;
		if(frt_cd != ""){
			//ajaxSendPost(getInvFrtcd, 'reqVal', '&goWhere=aj&bcKey=getInvFrtcd&frt_cd='+frt_cd, './GateServlet.gsl');
			// #20942 frt_cd 의 특수문자 대응(& )
			//frt_cd=frt_cd.replace(/&/g,"%26");
			// #48954 - [BNX] BILLING CODE 불러오는데 NAME 자동으로 안 따라옴
			frt_cd=escape(frt_cd);
			/* #20645 : [BINEX]G/L Validation jsjang 2013.09.10 */
			//ajaxSendPost(getInvFrtcd, 'reqVal', '&goWhere=aj&bcKey=getInvFrtcd&frt_cd='+frt_cd, './GateServlet.gsl');
			
			//#1773 [PATENT] Freight Default Unit Option
		    var param='&air_sea_clss_cd=' + formObj.f_air_sea_clss_cd.value;
			param += '&frt_ofc_cd=' + formObj.f_ref_no_dtl.value;
			if(formObj.f_air_sea_clss_cd.value=="S"){
				param += '&frt_shp_mod=' + formObj.f_shp_mod_cd.value;
			}
			//#2751 [Fulltrans] V450 REOPEN!!! Frieght Name column not show infomation.
			param += '&tabStr=dc_';
			ajaxSendPost(getInvFrtBillingcd, 'reqVal', '&goWhere=aj&bcKey=getInvFrtBillingcd&frt_cd='+frt_cd+param, './GateServlet.gsl');			
		}else{
			sheetObj.SetCellValue(row, "frt_cd","");
			sheetObj.SetCellValue(row, "frt_cd_nm","");
		}
	}
	/* [20131223 OJG] D/C 금액 계산 마지막으로 이동.
	if(colStr == "qty"){
		var calRu=0;
if(sheetObj.GetCellValue(row, "ru") == "" || Number(sheetObj.GetCellValue(row, "ru")) == 0){
calRu=Number(sheetObj.GetCellValue(row, "agent_ru"));
		}else{
calRu=Number(sheetObj.GetCellValue(row, "ru"));
		}
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * calRu);
if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "C"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "credit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "credit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
			}
}else if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "debit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
sheetObj.SetCellValue(row, "debit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
			}
		}
	}
	if(colStr == "ru"){
		var calRu=0;
if(sheetObj.GetCellValue(row, "ru") == "" || Number(sheetObj.GetCellValue(row, "ru")) == 0){
calRu=Number(sheetObj.GetCellValue(row, "agent_ru"));
		}else{
calRu=Number(sheetObj.GetCellValue(row, "ru"));
		}
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * calRu);
if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "C"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "credit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "credit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
			}
}else if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "debit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
sheetObj.SetCellValue(row, "debit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
			}
		}
	}
	if(colStr == "vat_rt"){
		var calRu=0;
if(sheetObj.GetCellValue(row, "ru") == "" || Number(sheetObj.GetCellValue(row, "ru")) == 0){
calRu=Number(sheetObj.GetCellValue(row, "agent_ru"));
		}else{
calRu=Number(sheetObj.GetCellValue(row, "ru"));
		}
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * calRu);
if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "C"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "credit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "credit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
			}
}else if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "debit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
sheetObj.SetCellValue(row, "debit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
			}
		}
	}
	if(colStr == "inv_xcrt"){
		var calRu=0;
if(sheetObj.GetCellValue(row, "ru") == "" || Number(sheetObj.GetCellValue(row, "ru")) == 0){
calRu=Number(sheetObj.GetCellValue(row, "agent_ru"));
		}else{
calRu=Number(sheetObj.GetCellValue(row, "ru"));
		}
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * calRu);
if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "C"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "credit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "credit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
			}
}else if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "debit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
sheetObj.SetCellValue(row, "debit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
			}
		}
	}
	*/
	if(colStr == "frt_term_cd"){
		//2011/12/09 Chungrue 추가
		//DEBIT 일때 DEBIT금액만 입력가능
		//CREDIT 일때 CREDIT금액만 입력가능
		for(var i=2; i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == "D"){
				if(sheetObj.GetCellValue(i, "frt_term_cd") == "PP"){
					sheetObj.SetCellValue(i, "credit_amt",0);
					sheetObj.SetCellValue(i, "debit_amt",0);
					sheetObj.SetCellEditable(i, "credit_amt",0);
					sheetObj.SetCellEditable(i, "debit_amt",0);
				}else if(sheetObj.GetCellValue(i, "frt_term_cd") == "CC"){
					sheetObj.SetCellValue(i, "credit_amt",0);
					sheetObj.SetCellEditable(i, "credit_amt",0);
					sheetObj.SetCellEditable(i, "debit_amt",1);
				}
			}else if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == "C"){
				if(sheetObj.GetCellValue(i, "frt_term_cd") == "PP"){
					sheetObj.SetCellEditable(i, "credit_amt",0);
					sheetObj.SetCellEditable(i, "debit_amt",0);
					sheetObj.SetCellValue(i, "debit_amt",0);
				}else if(sheetObj.GetCellValue(i, "frt_term_cd") == "CC"){
					sheetObj.SetCellEditable(i, "credit_amt",1);
					sheetObj.SetCellEditable(i, "debit_amt",0);
					sheetObj.SetCellValue(i, "debit_amt",0);
				}
			}
		}
		/* [20131223 OJG] D/C 금액 계산 마지막으로 이동.
		var calRu=0;
if(sheetObj.GetCellValue(row, "ru") == "" || Number(sheetObj.GetCellValue(row, "ru")) == 0){
calRu=Number(sheetObj.GetCellValue(row, "agent_ru"));
		}else{
calRu=Number(sheetObj.GetCellValue(row, "ru"));
		}
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * calRu);
if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "C"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "credit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "credit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
			}
}else if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "debit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
sheetObj.SetCellValue(row, "debit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
			}
		}
		*/
	}
	if(colStr == "rat_curr_cd"){
		/* [20131223 OJG] D/C 금액 계산 마지막으로 이동.
		var calRu=0;
if(sheetObj.GetCellValue(row, "ru") == "" || Number(sheetObj.GetCellValue(row, "ru")) == 0){
calRu=Number(sheetObj.GetCellValue(row, "agent_ru"));
		}else{
calRu=Number(sheetObj.GetCellValue(row, "ru"));
		}
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * calRu);
if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "C"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "credit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "credit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
			}
}else if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "debit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
sheetObj.SetCellValue(row, "debit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
			}
		}
		*/
		/*var codeStr=sheetObj.GetCellValue(row, 'rat_curr_cd');
		//결과를 표시할 Col을 초기화함
		doAutoSearch(sheetObj, row, col, 'currency', codeStr, 'rat_curr_cd', '');	//[20140121 OJG] 환율정보 조회시 버그수정(코드만 있으면됨)
		
		if(MULTI_CURR_FLAG == "Y"){
			
			sheetObj.SetCellValue(row, "inv_xcrt",1);
		}*/
		//#4020 (JAPT) invoice Ex.date, rate validation, amount  추가
		setExRate(row,"");
	}
	
	//if(MULTI_CURR_FLAG == "Y"){
		if(colStr=="inv_aply_curr_cd"){
			formObj.f_curr_cd.value = sheetObj.GetCellValue(row, "inv_aply_curr_cd");
			setCurrency();
			getLoclExRate();
		}
		if(colStr=="inv_xcrt_dt"){
			//#4020 (JAPT) invoice Ex.date, rate validation, amount  추가
			setExRate(row,"");
			/*var curr=formObj.f_curr_cd.value;
			var param = '';
			param += '&cur_dt=' + sheetObj.GetCellValue(row, 'inv_xcrt_dt');
			param += '&trf_cur_cd=' + sheetObj.GetCellValue(row, 'rat_curr_cd');
			param += '&ofccurr_cd=' + curr;
			getXcrtRate = 1;
			ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');
			if(getXcrtRate ==0){
				getXcrtRate = 1;
			}
			sheetObj.SetCellValue(row, "inv_xcrt", getXcrtRate);*/
		}
		if(colStr=="inv_xcrt"){
			
			//#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			for(var i=2; i<=sheetObj.LastRow();i++){
//				if(sheetObj.GetCellValue(i, "rat_curr_cd") == sheetObj.GetCellValue(row, "rat_curr_cd") && sheetObj.GetCellValue(i, "inv_xcrt_dt") == sheetObj.GetCellValue(row, "inv_xcrt_dt")  ){
//					sheetObj.SetCellValue(i, "inv_xcrt",sheetObj.GetCellValue(row, "inv_xcrt"));
//				}
//			}
		}
	//}
	
	if(colStr == "credit_amt"){
		if(sheetObj.GetCellValue(row, "agent_amt") == 0){
			sheetObj.SetCellValue(row, "agent_amt",sheetObj.GetCellValue(row, "credit_amt"));
		}
	}
	if(colStr == "sell_buy_tp_cd"){
		//2011/12/09 Chungrue 추가
		//DEBIT 일때 DEBIT금액만 입력가능
		//CREDIT 일때 CREDIT금액만 입력가능
		for(var i=2; i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == "D"){
				if(sheetObj.GetCellValue(i, "frt_term_cd") == "PP"){
					sheetObj.SetCellValue(i, "credit_amt",0);
					sheetObj.SetCellValue(i, "debit_amt",0);
					sheetObj.SetCellEditable(i, "credit_amt",0);
					sheetObj.SetCellEditable(i, "debit_amt",0);
				}else if(sheetObj.GetCellValue(i, "frt_term_cd") == "CC"){
					sheetObj.SetCellValue(i, "credit_amt",0);
					sheetObj.SetCellEditable(i, "credit_amt",0);
					sheetObj.SetCellEditable(i, "debit_amt",1);
				}
			}else if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == "C"){
				if(sheetObj.GetCellValue(i, "frt_term_cd") == "PP"){
					sheetObj.SetCellEditable(i, "credit_amt",0);
					sheetObj.SetCellEditable(i, "debit_amt",0);
					sheetObj.SetCellValue(i, "debit_amt",0);
				}else if(sheetObj.GetCellValue(i, "frt_term_cd") == "CC"){
					sheetObj.SetCellEditable(i, "credit_amt",1);
					sheetObj.SetCellEditable(i, "debit_amt",0);
					sheetObj.SetCellValue(i, "debit_amt",0);
				}
			}
		}
		/* [20131223 OJG] D/C 금액 계산 마지막으로 이동.
		var calRu=0;
if(sheetObj.GetCellValue(row, "ru") == "" || Number(sheetObj.GetCellValue(row, "ru")) == 0){
calRu=Number(sheetObj.GetCellValue(row, "agent_ru"));
		}else{
calRu=Number(sheetObj.GetCellValue(row, "ru"));
		}
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * calRu);
if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "C"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "credit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}else{
sheetObj.SetCellValue(row, "credit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "debit_amt","0");
				}
			}
}else if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){
if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
					sheetObj.SetCellValue(row, "debit_amt","0");
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "debit_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
				}else{
sheetObj.SetCellValue(row, "debit_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
					sheetObj.SetCellValue(row, "credit_amt","0");
sheetObj.SetCellValue(row, "agent_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
				}
			}
		}
		*/
	}
	if(colStr == "inv_amt"){
		sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	if(colStr == "inv_vat_amt"){
		sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	var air_sea_clss_cd=formObj.f_air_sea_clss_cd.value;
	var bnd_clss_cd=formObj.f_bnd_clss_cd.value;
	var biz_clss_cd=formObj.f_biz_clss_cd.value;
	if(colStr == "aply_ut_cd"){
		if(air_sea_clss_cd=="S"){
			//Container인 경우 TP/SZ활성화
			if(sheetObj.GetCellValue(row, "aply_ut_cd")=='SCN'){
				if(docObjects[4].LastRow() + 1==1){
				    alert(getLabel('ACC_MSG113'));
				    sheetObj.SetCellValue(row, "aply_ut_cd","HBL");
					return;
				}
				sheetObj.SetCellEditable(row, "cntr_tpsz_cd",1);
				var cntrTpsz="";
				var cntrCnt=0;
				for(var i=1 ; i<docObjects[4].LastRow() + 1 ; i++){
				    var qtyCnt=0;
				    for(var j=2 ; j<sheetObj.LastRow() + 1 ; j++){
					   if( j != row 
							   && sheetObj.GetCellValue(j, "aply_ut_cd") == 'SCN'
								   && sheetObj.GetCellValue(j, "cntr_tpsz_cd") == docObjects[4].GetCellValue(i, 0)
							   && sheetObj.GetCellText(j, "frt_cd") == sheetObj.GetCellText(row, "frt_cd")){
						   qtyCnt += sheetObj.GetCellValue(j, "qty");
					   }
					}
				    if(docObjects[4].GetCellValue(i, 1) - qtyCnt > 0){
				    	cntrTpsz=docObjects[4].GetCellValue(i, 0);
				    	cntrCnt=docObjects[4].GetCellValue(i, 1)-qtyCnt;
						break;
					}
				}
				if(cntrTpsz != ""){
					sheetObj.SetCellValue(row, "cntr_tpsz_cd",cntrTpsz,0);
					sheetObj.SetCellValue(row, "qty",cntrCnt,0);
				}else{
					sheetObj.SetCellValue(row,  "qty",'');
					sheetObj.SetCellValue(row,  "trf_cur_sum_amt",'');
				    sheetObj.SetCellValue(row, "cntr_tpsz_cd",'',0);
				}
			}else if(sheetObj.GetCellValue(row,"aply_ut_cd")=='CBM'){
				sheetObj.SetCellEditable(row, 		"cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,		"cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		"qty",formObj.f_meas.value,0);
			}else if(sheetObj.GetCellValue(row,"aply_ut_cd")=='CFT'){
				sheetObj.SetCellEditable(row, 		"cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,		"cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		"qty",formObj.f_meas1.value,0);
			}else if(sheetObj.GetCellValue(row,"aply_ut_cd")=='KGS'){
				sheetObj.SetCellEditable(row, 		"cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,		"cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		"qty",formObj.f_grs_wgt.value,0);
				
			//#3706 [JAPT]VOLUME SETTING ON A/R ENTRY SCREEN	
			// #48771 - [IMPEX] UNIT M/T와 R/T 로직 추가
			}else if(sheetObj.GetCellValue(row, "aply_ut_cd")=='MET'){
				sheetObj.SetCellEditable(row,   "cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,	    "cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		"qty", roundXL(formObj.f_grs_wgt.value.replaceAll(",","") / 1000, 3));
				
			}else if(sheetObj.GetCellValue(row, "aply_ut_cd")=='RET'){
				sheetObj.SetCellEditable(row,  "cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,	   "cntr_tpsz_cd",' ',0);
				
				var grs_wgt = roundXL(formObj.f_grs_wgt.value.replaceAll(",","") / 1000, 3);
				var meas = Number(formObj.f_meas.value.replaceAll(",",""));
				
				if(grs_wgt > meas){
					sheetObj.SetCellValue(row,"qty",grs_wgt);
				} else {
					sheetObj.SetCellValue(row,"qty",meas);
				}				
				
			}else{
				sheetObj.SetCellEditable(row, "cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,		"cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		"qty",'1',0);
				sheetObj.SetCellValue(row,		"trf_cur_sum_amt",'',0);
			}
		}else{
			if (sheetObj.GetCellValue(row, "aply_ut_cd") == 'ACW') {
				if (air_sea_clss_cd == "A" && bnd_clss_cd == "O" && biz_clss_cd == "H") {
					sheetObj.SetCellValue(row, "qty",formObj.f_agent_chg_wgt.value,0);
				}else{
					sheetObj.SetCellValue(row, "qty",frm1.f_chg_wgt.value,0);
				}
			} else if (sheetObj.GetCellValue(row, "aply_ut_cd") == 'AGW') {
				if (air_sea_clss_cd == "A" && bnd_clss_cd == "O" && biz_clss_cd == "H") {
					sheetObj.SetCellValue(row, "qty",formObj.f_agent_grs_wgt.value,0);
				} else {
					sheetObj.SetCellValue(row, "qty",frm1.f_grs_wgt.value,0);
				}
			}else if(sheetObj.GetCellValue(row, "aply_ut_cd")=='ACL'){
				if(air_sea_clss_cd=="A" && bnd_clss_cd=="O" && biz_clss_cd=="H"){
					sheetObj.SetCellValue(row, "qty",frm1.agent_chg_wgt1.value,0);
				}else{
					sheetObj.SetCellValue(row, "qty",frm1.f_chg_wgt1.value,0);
				}
			}else if(sheetObj.GetCellValue(row, "aply_ut_cd")=='AGL'){
				if(air_sea_clss_cd=="A" && bnd_clss_cd=="O" && biz_clss_cd=="H" ){
					sheetObj.SetCellValue(row, "qty",frm1.agent_grs_wgt1.value,0);
				}else{
					sheetObj.SetCellValue(row, "qty",frm1.f_grs_wgt1.value,0);
				}
				//#1575[BNX] INDIA - AWB FREIGHT UNIT에 PKG QTY 항목 추가
			}else if(sheetObj.GetCellValue(row, "aply_ut_cd")=='PKG'){
				if(air_sea_clss_cd=="A"){
					sheetObj.SetCellValue(row, "qty",frm1.f_pck_qty.value,0);
				}		
			} else {
				sheetObj.SetCellValue(row, "qty",'1',0);
				// sheetObj.CellValue2(row, "trf_cur_sum_amt") = '';
			}
			sheetObj.SetCellEditable(row, "cntr_tpsz_cd",0);
		}
	}
	//Unit이 Container인 경우 TP/SZ선택시 해당 수량을 넣어줌
	if(colStr=="cntr_tpsz_cd"){
		if(sheetObj.GetCellValue(row, "aply_ut_cd")=='SCN'){
			var curFrtCd=sheetObj.GetCellText(row, "frt_cd");	//Freight Code
			var curGetCellText=trim(sheetObj.GetCellText(row, "cntr_tpsz_cd"));
			var curCellbuyTpCd=sheetObj.GetCellValue(row, "sell_buy_tp_cd");//dc 조건
			if(curGetCellText==''){
				sheetObj.SetCellValue(row, "qty",'');
				sheetObj.SetCellValue(row, "trf_cur_sum_amt",'');
			}else{
				var minNum = 0;
				if(curGetCellText.length>1){
					for(var i = 2; i < sheetObj.Rows; i++){
						if(i!=row){
							//동일한 Freight Code에 동일한  Container Size가 사용되었는지 확인함
							if(sheetObj.GetCellValue(i, "aply_ut_cd") == 'SCN'
								 && curFrtCd==sheetObj.GetCellText(i, "frt_cd")
									&&curGetCellText==sheetObj.GetCellText(i, "cntr_tpsz_cd")
									&&curCellbuyTpCd==sheetObj.GetCellValue(i, "sell_buy_tp_cd")){//dc_ 비교를 위해서 조건 추가, AR/AP 는 sell buy type 이 항상 같기때문에 상관없슴.
								minNum = minNum+parseInt(sheetObj.GetCellText(i, "qty"));	//qty
							}
						}
					}
				}
				
				//이미 선택되었는지 확인한다.
				var curNum = 0;
				var cntrSheet = docObjects[4];
				for(var i = 1; i < cntrSheet.Rows; i++){
					if(curGetCellText==cntrSheet.GetCellValue(i, 0)){
						curNum = cntrSheet.GetCellValue(i, 1);
						break;
					}
				}
				
				var cntrQty = parseInt(curNum)-minNum;
				
				if(cntrQty>0){
					sheetObj.SetCellValue(row, "qty",cntrQty);
				}
				else{
					sheetObj.SetCellValue(row,  "qty", '');
					sheetObj.SetCellValue(row,  "trf_cur_sum_amt", '');
				    sheetObj.SetCellValue(row, "cntr_tpsz_cd", '');
				    
					//Selected \"Type/Size\" is already in use.\n\n\Please select other \"Type/Size\".
				    alert(getLabel('ACC_MSG111'));
				}
			}
		}		
	}
	
	//---------------------[20141208 OJG]-----------------------------
//	if(colStr == "inv_aply_curr_cd"){	//
//		sheetObj.CellValue2(row,  "inv_xcrt_dt") = "";
//		sheetObj.CellValue2(row,  "inv_xcrt") = 1;
//	}
	//---------------------[20141208 OJG]-----------------------------
	
	if(MULTI_CURR_FLAG == "N" || (MULTI_CURR_FLAG == "Y" && colStr != "agent_amt") ){
		var curr=formObj.f_curr_cd.value;
		//[20131223 OJG] D/C 금액계산.
		var calRu = 0;
		var qty = Number(sheetObj.GetCellValue(row, "qty"));
		var inv_xcrt = Number(sheetObj.GetCellValue(row, "inv_xcrt"));
		if( sheetObj.GetCellValue(row, "ru") == "" || Number(sheetObj.GetCellValue(row, "ru")) == 0){
			calRu = Number(sheetObj.GetCellValue(row, "agent_ru"));
		}else{
			calRu = Number(sheetObj.GetCellValue(row, "ru"));
		}
		
		if(sheetObj.GetCellValue(row, "ibflag") == "U"){
			calRu = Number(sheetObj.GetCellValue(row, "ru"));
		}
		
		
		var inv_amt = Number(sheetObj.GetCellValue(row, "qty")) * calRu;
		var invSumAmt = Number(sheetObj.GetCellValue(row, "qty")) * calRu * Number(sheetObj.GetCellValue(row, "inv_xcrt"));
		
		// [#1358][A/P Invoice Entry] Can't save data when input MAX LEN at Rate column.
		if(colStr == "qty" || colStr=="ru" || colStr == "inv_xcrt"){
			// [#1358][A/P Invoice Entry] Can't save data when input MAX LEN at Rate column.
			if((inv_amt > 999999999999999.999) || (invSumAmt > 999999999999999.999)) {//15 digit
				ComShowCodeMessage('COM03230');
				if(colStr == "qty"){
					sheetObj.SetCellValue(row,'qty',0);
				} else if(colStr=="ru"){
					sheetObj.SetCellValue(row,'ru',0);
				} else if(colStr=="inv_xcrt"){
					sheetObj.SetCellValue(row,'inv_xcrt',0);
				}				
				return;
			} else if((inv_amt < -999999999999999.999) || (invSumAmt < -999999999999999.999)) { 
				ComShowCodeMessage('COM03233');
				if(colStr == "qty"){
					sheetObj.SetCellValue(row,'qty',0);
				} else if(colStr=="ru"){
					sheetObj.SetCellValue(row,'ru',0);
				} else if(colStr=="inv_xcrt"){
					sheetObj.SetCellValue(row,'inv_xcrt',0);
				}
				return;
			}
		}

		 
		
		sheetObj.SetCellValue(row, "trf_cur_sum_amt", roundTo(inv_amt, 2));
		
		if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "C"){
			if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY" || (curr=="VND" && vnCalRound=="Y")){
					sheetObj.SetCellValue(row, "agent_amt", roundTo(invSumAmt,0),0);
					sheetObj.SetCellValue(row, "credit_amt", "0");
					sheetObj.SetCellValue(row, "debit_amt", "0");
				}else{
					sheetObj.SetCellValue(row, "agent_amt", roundTo(invSumAmt,2),0);
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "debit_amt", "0");
				}
			}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY" || (curr=="VND" && vnCalRound=="Y")){
					sheetObj.SetCellValue(row, "credit_amt", roundTo(invSumAmt,0));
					sheetObj.SetCellValue(row, "agent_amt", roundTo(invSumAmt,0),0);
					sheetObj.SetCellValue(row, "debit_amt", "0");
				}else{
					sheetObj.SetCellValue(row, "credit_amt", roundTo(invSumAmt,2));
					sheetObj.SetCellValue(row, "agent_amt", roundTo(invSumAmt,2),0);
					sheetObj.SetCellValue(row, "debit_amt", "0");
				}
			}
			
		}else if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){
			if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY" || (curr=="VND" && vnCalRound=="Y")){
					sheetObj.SetCellValue(row, "debit_amt", "0");
					sheetObj.SetCellValue(row, "credit_amt", "0");
					sheetObj.SetCellValue(row, "agent_amt", roundTo(invSumAmt,0),0);
				}else{
					sheetObj.SetCellValue(row, "debit_amt", "0");
					sheetObj.SetCellValue(row, "credit_amt", "0");
					sheetObj.SetCellValue(row, "agent_amt", roundTo(invSumAmt,2),0);
				}
			}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY" || (curr=="VND" && vnCalRound=="Y")){
					sheetObj.SetCellValue(row, "debit_amt", roundTo(invSumAmt,0));
					sheetObj.SetCellValue(row, "credit_amt", "0");
					sheetObj.SetCellValue(row, "agent_amt", roundTo(invSumAmt,0),0);
				}else{
					sheetObj.SetCellValue(row, "debit_amt", roundTo(invSumAmt,2));
					sheetObj.SetCellValue(row, "credit_amt","0");
					sheetObj.SetCellValue(row, "agent_amt", roundTo(invSumAmt,2),0);
				}
			}
		}
	}else if(MULTI_CURR_FLAG == "Y" && colStr == "agent_amt"){ 
		
		//#52762 [BNX] Debit Note Multi Currency Exchange Rate 적용 로직 개선 start
		var t_agent_amt = sheetObj.GetCellValue(row, "agent_amt");
		var t_inv_xcrt= sheetObj.GetCellValue(row, "inv_xcrt");
		var t_qty= sheetObj.GetCellValue(row, "qty");
		var t_ru = sheetObj.GetCellValue(row, "ru");
		 
		var tmp0 = Number(t_agent_amt) / Number(t_inv_xcrt);
		tmp0 = roundXL(tmp0,2);
		sheetObj.SetCellValue(row, "trf_cur_sum_amt" , tmp0 ,0); 		
		
		var tmp = Number(t_agent_amt) / Number(t_inv_xcrt)  / Number(t_qty);
		tmp = roundXL(tmp,2);
		sheetObj.SetCellValue(row, "ru" , tmp ,0);
		//#52762 [BNX] Debit Note Multi Currency Exchange Rate 적용 로직 개선 end
		
		if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "C"){
			if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				sheetObj.SetCellValue(row, "credit_amt", "0",0);
				sheetObj.SetCellValue(row, "debit_amt","0",0);
			}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				sheetObj.SetCellValue(row, "credit_amt", sheetObj.GetCellValue(row, "agent_amt"),0);
				sheetObj.SetCellValue(row, "debit_amt","0",0);
			}
			
		}else if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){
			if(sheetObj.GetCellValue(row, "frt_term_cd") == "PP"){
				sheetObj.SetCellValue(row, "debit_amt", "0",0);
				sheetObj.SetCellValue(row, "credit_amt", "0",0);
			}else if(sheetObj.GetCellValue(row, "frt_term_cd") == "CC"){
				sheetObj.SetCellValue(row, "debit_amt", sheetObj.GetCellValue(row, "agent_amt"),0);
				sheetObj.SetCellValue(row, "credit_amt", "0",0);
			}
		}
	}
	if(formObj.f_inv_seq.value != ""){
		var debit_tot=0;
		var credit_tot=0;
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for(var i=2; i<=sheetObj.LastRow(); i++){
			if(sheetObj.GetCellValue(i,"del_chk") == "1"){
			}else{
				if (!(sheetObj.GetCellValue(i, "ibflag") == "I" && sheetObj.GetCellValue(i, "frt_check") == "0")) {
					debit_tot   += Number(sheetObj.GetCellValue(i, "debit_amt"));
					credit_tot  += Number(sheetObj.GetCellValue(i, "credit_amt"));
					amt_tot 	+= ( Number(sheetObj.GetCellValue(i, "debit_amt")) - Number(sheetObj.GetCellValue(i, "credit_amt")) );
					totamt_tot 	+= ( Number(sheetObj.GetCellValue(i, "debit_amt")) - Number(sheetObj.GetCellValue(i, "credit_amt")) );
				}	
			}
		}
		formObj.f_debit_tot.value=doMoneyFmt(roundXL(debit_tot,2));
		formObj.f_credit_tot.value=doMoneyFmt(roundXL(credit_tot,2));
		if(amt_tot < 0){
			formObj.f_amt_tot.value=doMoneyFmt(roundXL(amt_tot,2) * -1) ;
		}else{
			formObj.f_amt_tot.value=doMoneyFmt(roundXL(amt_tot,2));
		}
		formObj.f_vatamt_tot.value=0;
		if(totamt_tot < 0){
			formObj.f_totamt_tot.value=doMoneyFmt(roundXL(totamt_tot,2) * -1) ;
		}else{
			formObj.f_totamt_tot.value=doMoneyFmt(roundXL(totamt_tot,2));
		}
	}else{
		var debit_tot=0;
		var credit_tot=0;
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for(var i=2; i<=sheetObj.LastRow(); i++){
			if(sheetObj.GetCellValue(i,"frt_check") == "1"){
				debit_tot   += Number(sheetObj.GetCellValue(i, "debit_amt"));
				credit_tot  += Number(sheetObj.GetCellValue(i, "credit_amt"));
				amt_tot 	+= ( Number(sheetObj.GetCellValue(i, "debit_amt")) - Number(sheetObj.GetCellValue(i, "credit_amt")) );
				totamt_tot 	+= ( Number(sheetObj.GetCellValue(i, "debit_amt")) - Number(sheetObj.GetCellValue(i, "credit_amt")) );
			}
		}
		formObj.f_debit_tot.value=doMoneyFmt(roundXL(debit_tot,2));
		formObj.f_credit_tot.value=doMoneyFmt(roundXL(credit_tot,2));
		if(amt_tot < 0){
			formObj.f_amt_tot.value=doMoneyFmt(roundXL(amt_tot,2) * -1) ;
		}else{
			formObj.f_amt_tot.value=doMoneyFmt(roundXL(amt_tot,2));
		}
		formObj.f_vatamt_tot.value=0;
		if(totamt_tot < 0){
			formObj.f_totamt_tot.value=doMoneyFmt(roundXL(totamt_tot,2) * -1) ;
		}else{
			formObj.f_totamt_tot.value=doMoneyFmt(roundXL(totamt_tot,2));
		}
	}
}
/**
 * 기본 세률 조회
 */
function setTaxRate(reqVal){
	var sheetObj=docObjects[0];
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
		sheetObj.SetCellValue(frm1.f_curRow.value, "vat_rt",doc[1]);
    }
}
function calcFrgnAmt(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for(var i=2;i<=sheetObj.LastRow();i++){
		//INVOICE생성후 데이터
		if(formObj.f_inv_seq.value != ""){
			if(sheetObj.GetCellValue(i, "del_chk") != "1"){
				if(formObj.f_curr_cd.value != sheetObj.GetCellValue(i, "rat_curr_cd")){
					formObj.f_frgn_curr_cd.value=sheetObj.GetCellValue(i, "rat_curr_cd");
					formObj.f_frgn_amt.value=Number(formObj.f_frgn_amt.value) + ( Number(sheetObj.GetCellValue(i,"debit_amt")) - Number(sheetObj.GetCellValue(i,"credit_amt")) );
					formObj.f_frgn_vat_amt.value=0;
					formObj.f_frgn_sum_amt.value=Number(formObj.f_frgn_sum_amt.value) + ( Number(sheetObj.GetCellValue(i,"debit_amt")) - Number(sheetObj.GetCellValue(i,"credit_amt")) );
				}else{
					//formObj.f_frgn_curr_cd.value 	= "";
					//formObj.f_frgn_amt.value 		= 0;
					//formObj.f_frgn_vat_amt.value 	= 0;
					//formObj.f_frgn_sum_amt.value 	= 0;
				}
			}
		//INVOICE생성전 데이터
		}else{
			if(sheetObj.GetCellValue(i, "frt_check") == "1"){
				if(formObj.f_curr_cd.value != sheetObj.GetCellValue(i, "rat_curr_cd")){
					formObj.f_frgn_curr_cd.value=sheetObj.GetCellValue(i, "rat_curr_cd");
					formObj.f_frgn_amt.value=Number(formObj.f_frgn_amt.value) + Number(sheetObj.GetCellValue(i,"inv_amt"));
					formObj.f_frgn_vat_amt.value=Number(formObj.f_frgn_vat_amt.value) + Number(sheetObj.GetCellValue(i,"inv_vat_amt"));
					formObj.f_frgn_sum_amt.value=Number(formObj.f_frgn_sum_amt.value) + Number(sheetObj.GetCellValue(i,"inv_sum_amt"));
				}else{
					//formObj.f_frgn_curr_cd.value 	= "";
					//formObj.f_frgn_amt.value 		= 0;
					//formObj.f_frgn_vat_amt.value 	= 0;
					//formObj.f_frgn_sum_amt.value 	= 0;
				}
			}
		}
	}
}
/**
 * 콤보 조회
 */
function doAction(cmdt_cd){
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCommodityKeyCode&s_cmdt_cd='+cmdt_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//[Commodity Code] is duplicated!
			alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CMDT') + ": " + doc[1]);
			var sheetObj=docObjects[0];
			var intRow=sheetObj.LastRow();
			sheetObj.SetCellValue(intRow, "cmdt_cd","");
		}	
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
//참고
function rightDate()
{
  var year=document.form1.JLYEAR.value;
  var month=document.form1.JLMONTH.value;
  var dd=new Date(year, month, 0);
  var selectedDay=document.form1.JLDAY.value;
  var lastDay=dd.getDate();
  if(selectedDay > lastDay){
	  //날짜를 정확히 선택해 주세요. 선택하신 년월의 날짜는 " + lastDay + " 일까지 있습니다.
	  alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_DATE'));
	  return false;    
  }
  return false;
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
            var cal=new ComCalendar(); 
        	cal.select(formObj.f_post_dt,  'MM-dd-yyyy');
            break;
        case 'DATE2':    //달력 조회 팝업 호출      
            var cal=new ComCalendar(); 
            cal.setEndFunction("changeInvDt");
        	cal.select(formObj.f_inv_dt,  'MM-dd-yyyy');
            calcCreateTerms();
            break;
        case 'DATE3':    //달력 조회 팝업 호출      
            var cal=new ComCalendar(); 
        	cal.select(formObj.f_due_dt,  'MM-dd-yyyy');
            break;
        case 'DATE4':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
        	cal.select(formObj.f_last_paid_dt_cal, 'MM-dd-yyyy');
        break;    
    }
}
function searchBlCmmInfo(){
	var formObj=document.frm1;
	if(formObj.s_bl_no.value != ""){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value+'&ofc_cd='+formObj.f_ofc_cd.value, './GateServlet.gsl');
	}
}
function clearChkVal(){
	var formObj=document.frm1;
	formObj.chk_fr_trdp_cd.value="";
    formObj.chk_fr_inv_curr_cd.value="";
    formObj.chk_fr_frt_seq.value="";
}
function enterBlCmmInfo(isBtn){
	var formObj=document.frm1;
	if(formObj.s_bl_no.value != ""){
		if(event.keyCode == 13 || isBtn == 'Y'){
			formObj.s_ref_no.value="";
			formObj.f_inv_seq.value="";
			formObj.s_inv_no.value="";
			clearChkVal();
			ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value+'&ofc_cd='+formObj.f_ofc_cd.value, './GateServlet.gsl');
		}
	}
}
function enterRefInfo(isBtn){
	var formObj=document.frm1;
	if(formObj.s_ref_no.value != ""){
		if(event.keyCode == 13 || isBtn == 'Y'){
			formObj.f_inv_seq.value="";
			formObj.s_inv_no.value="";
			clearChkVal();
			ajaxSendPost(getRefInfo, 'reqVal', '&goWhere=aj&bcKey=getRefInfo&s_ref_no='+formObj.s_ref_no.value+'&ofc_cd='+formObj.f_ofc_cd.value, './GateServlet.gsl');
		}
	}
}
function enterOtherInfo(isBtn){
	var formObj=document.frm1;
	if(formObj.s_oth_no.value != ""){
		if(event.keyCode == 13 || isBtn == 'Y'){
			formObj.f_inv_seq.value="";
			formObj.s_inv_no.value="";
			clearChkVal();
			ajaxSendPost(getOtherInfo, 'reqVal', '&goWhere=aj&bcKey=getOtherInfo&s_oth_no='+formObj.s_oth_no.value+'&ofc_cd='+formObj.f_ofc_cd.value, './GateServlet.gsl');
		}
	}
}
function enterInvInfo(isBtn){
	var formObj=document.frm1;
	clearChkVal();
	if(formObj.s_inv_no.value != ""){
		if(event.keyCode == 13 || isBtn == 'Y'){
			formObj.s_bl_no.value="";
			var sell_buy_tp_cd="'C','D'";
			ajaxSendPost(getInvInfo, 'reqVal', '&goWhere=aj&bcKey=getInvInfo&s_inv_no='+formObj.s_inv_no.value+'&ofc_cd='+formObj.f_ofc_cd.value+'&type1=C&type2=D', './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
function getBlCmmInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				/* #21736 jsjang 21013.11.18 */
				if(rtnArr[5] != "null" && rtnArr[5] != "" && rtnArr[5] == "HF" && formObj.jo_flg.value != "Y"){
					return;
				}	
				frm1.f_intg_bl_seq.value=rtnArr[0];
				frm1.s_bl_no.value=rtnArr[1];
				frm1.f_bl_no.value=rtnArr[1];
				frm1.f_biz_clss_cd.value=rtnArr[2];
				frm1.f_air_sea_clss_cd.value=rtnArr[3];
				frm1.f_bnd_clss_cd.value=rtnArr[4];
				frm1.f_oth_seq.value="";
				frm1.s_oth_no.value="";
				doWork("DEFAULT");
			}
			else{
				frm1.f_intg_bl_seq.value="";
				frm1.s_bl_no.value="";
				frm1.f_bl_no.value="";
				frm1.f_biz_clss_cd.value="";
				frm1.f_air_sea_clss_cd.value="";
				frm1.f_bnd_clss_cd.value="";
				clearAll();
				formObj.s_bl_no.focus();
			}
		}
	}
	else{
		//SEE_BMD_MSG43		
	}
}
/**
 * AJAX RETURN
 * REF_INFO를 가져온다.
 */
function getRefInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				/* #21736 jsjang 21013.11.18 */
				if(rtnArr[5] != "null" && rtnArr[5] != "" && rtnArr[5] == "HF" && formObj.jo_flg.value != "Y"){
					return;
				}
				frm1.f_intg_bl_seq.value=rtnArr[0];
				frm1.s_ref_no.value=rtnArr[1];
				frm1.f_biz_clss_cd.value=rtnArr[2];
				frm1.f_air_sea_clss_cd.value=rtnArr[3];
				frm1.f_bnd_clss_cd.value=rtnArr[4];
				frm1.s_bl_no.value="";
				frm1.f_oth_seq.value="";
				frm1.s_oth_no.value="";
				doWork("DEFAULT");
			}else{
				frm1.f_intg_bl_seq.value="";
				frm1.s_ref_no.value="";
				frm1.f_biz_clss_cd.value="";
				frm1.f_air_sea_clss_cd.value="";
				frm1.f_bnd_clss_cd.value="";
				clearAll();
				formObj.s_ref_no.focus();
			}
		}
	}
	else{
		//SEE_BMD_MSG43		
	}
}
/**
 * AJAX RETURN
 * OTHER_INFO를 가져온다.
 */
function getOtherInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				/* #21736 jsjang 21013.11.18 */
				if(rtnArr[2] != "null" && rtnArr[2] != "" && rtnArr[2] == "B" && formObj.jo_flg.value != "Y"){
					//OFVFOUR-7960 [PQC][A/R Invoice Entry] The system does not show warning with BL/Other BL block
					if( rtnArr[2] == "B"){
						alert(getLabel('FMS_COM_ALT060'));
						return;
					}
					else 
						return;
				}
				frm1.f_oth_seq.value=rtnArr[0];
				frm1.s_oth_no.value=rtnArr[1];
				frm1.f_intg_bl_seq.value="";
				frm1.s_bl_no.value="";
				frm1.f_bl_no.value="";
				frm1.f_biz_clss_cd.value="";
				frm1.f_air_sea_clss_cd.value="";
				frm1.f_bnd_clss_cd.value="";
				doWork("DEFAULT");
			}else{
				frm1.f_oth_seq.value="";
				frm1.s_oth_no.value="";
				clearAll();
				formObj.s_oth_no.focus();
			}
		}
	}
	else{
		//SEE_BMD_MSG43		
	}
}
/**
 * AJAX RETURN
 * INVOICE_INFO를 가져온다.
 */
function getInvInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				if(rtnArr[2] == "1"){
					frm1.f_inv_seq.value=rtnArr[0];
					frm1.s_inv_no.value=rtnArr[1];
					doWork("DEFAULT");
				}else{
					//Duplicate Invoice NO.!!
					alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_IVNO'));
				}
			}
			else{
				frm1.f_inv_seq.value="";
				frm1.s_inv_no.value="";
				clearAll();
				formObj.s_inv_no.focus();
			}
		}
	}
	else{
		//SEE_BMD_MSG43		
	}
}
/**
 * AJAX RETURN
 * BL CONTAINER TP_SZ 가져온다.
 */
function getBlCntrInfo(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	var tp_sz=" ";
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			//var rtnArr = doc[1].split('^@');
			var rtnArr=doc[1].split(';');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				for(var i=0;i<rtnArr.length-1; i++){
					var tp_sz_arr=rtnArr[i].split('^@');
					tp_sz += "|"+tp_sz_arr[0];
					var intRows=docObjects[4].LastRow() + 1;
					docObjects[4].DataInsert(intRows);
					docObjects[4].SetCellValue(intRows, 0,tp_sz_arr[0]);
					docObjects[4].SetCellValue(intRows, 1,tp_sz_arr[1]);
				}
				sheetObj.SetColProperty('cntr_tpsz_cd', {ComboText:tp_sz, ComboCode:tp_sz} );
			}else{
				sheetObj.SetColProperty('cntr_tpsz_cd', {ComboText:tp_sz, ComboCode:tp_sz} );
			}
		}
	}else{
		sheetObj.SetColProperty('cntr_tpsz_cd', {ComboText:tp_sz, ComboCode:tp_sz} );
	}
}
/**
 * AJAX RETURN
 * INVOICE FRT CD 를 가져온다.
 */
function getInvFrtcd(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				sheetObj.SetCellValue(SELECTROW, "frt_cd",rtnArr[0]);
				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm",rtnArr[1]);
			}
			else{
				sheetObj.SetCellValue(SELECTROW, "frt_cd","");
				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm","");
			}
		}
	}
	else{
		//SEE_BMD_MSG43		
	}
}
 /**
  * #20645 : [BINEX]G/L Validation jsjang 2013.09.10
  * AJAX RETURN
  * INVOICE FRT CD 를 가져온다.
  */
 function getInvFrtBillingcd(reqVal){
 	var formObj=document.frm1;
 	var sheetObj=docObjects[0];
 	var doc=getAjaxMsgXML(reqVal);
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			//조회해온 결과를 Parent에 표시함
 			var rtnArr=doc[1].split('^@');
 			if(rtnArr[0] != "null" && rtnArr[0] != ""){
 	 			//if(rtnArr[6] == "")
 	 			//{
 				var gl_cost=rtnArr[6];
 				var gl_cost2=rtnArr[16];
 				if (gl_cost == "" || gl_cost == "undefined" || gl_cost == undefined ||
 					gl_cost2 == "" || gl_cost2 == "undefined" || gl_cost2 == undefined) { 	 
 					/*
 	 				sheetObj.SetCellValue(SELECTROW, "frt_cd","");
 	 				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm","");
 	 				sheetObj.SetCellValue(SELECTROW, "vat_rt","");
 	 				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_BILLCRDB'));
 	 				return;
 	 				*/
 					var parArr=new Array(2);
 					parArr[0]=getLabel('FMS_COD_BILLCRDB');
 					parArr[1]=rtnArr[0]+" - "+rtnArr[1];
 					alert(getLabel2('ACC_MSG110',parArr));
 					sheetObj.SetCellValue(SELECTROW, 'frt_cd',"");
 					sheetObj.SelectCell(SELECTROW, 'frt_cd');
 					return;  					
 	 			}else{
 	 				//#2131 [BINEX V442] NO G/L MAPPING, BUT CAN ISSUE INVOICE USING BILLING CODE
 	 				ajaxSendPost(checkUseGlCode, 'reqVal', '&goWhere=aj&bcKey=checkUseGlCode&s_gl_cd='+gl_cost+'&s_bill_cd='+escape(sheetObj.GetCellValue(SELECTROW, 'frt_cd'))+'&s_gl_cd2='+gl_cost2+'&invType=DC', './GateServlet.gsl');
 	 				if(!useGlCode){sheetObj.SetCellValue(SELECTROW, "frt_cd", ""); return;}
 	 				
	 				sheetObj.SetCellValue(SELECTROW, "frt_cd",rtnArr[0]);
	 				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm",rtnArr[1]);//dc는 frt_cd의 eng_nm를 가져온다. #1824 [Split - 1] [PATENT]Freight Local Name 적용(AR, AP)
	 				
	 				//#5821 [IMPEX GER] Debit Credit Bug - Taxable/Non Taxable Billing Code Switch
	 				//sheetObj.SetCellValue(SELECTROW, "vat_rt",rtnArr[2]);
	 				sheetObj.SetCellValue(SELECTROW, "vat_rt", 0);
 	 			}
 	 			//#1773 [PATENT] Freight Default Unit Option
 				if (rtnArr[14]!= "" && rtnArr[14]!= "null"){
	 	 			sheetObj.SetCellValue(SELECTROW, "aply_ut_cd",rtnArr[14]);
				}
				//OFVFOUR-7601 [BNX] Adding new function onto A/R and DC Entry screen
				if (rtnArr[15]!= "" && rtnArr[15]!= "null"){
					sheetObj.SetCellValue(SELECTROW, "ru",rtnArr[15]);
				}
 			}else{
 				sheetObj.SetCellValue(SELECTROW, "frt_cd","");
 				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm","");
 				sheetObj.SetCellValue(SELECTROW, "vat_rt","");
 			}
 		}
 	}else{
 		//SEE_BMD_MSG43
 	}
 }
//조회 INVOICE NO가 비었을경우 INV_SEQ 를 지워준다.
function setInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value == ""){
		formObj.f_inv_seq.value="";
	}
}
function enterCalcCreateTerms(){
	var formObj=document.frm1;
	if(event.keyCode == 13){
		if(formObj.f_term_dt.value != "" && formObj.f_term_dt.value != "0"){
			calcCreateTerms();
		}
	}
}
//CREATE TERMS로 DUE DATE 를 계산한다.
function calcCreateTerms(){
	var formObj=document.frm1;
	// oyh-inv_dt가 입력되지 않으면 동작안되게 수정 
	if (formObj.f_inv_dt.value == "") {
		return;
	}
	if(formObj.f_terms[0].selected){
		formObj.f_term_dt.value="";
		formObj.f_due_dt.value="";
	}else if(formObj.f_terms[1].selected){
		if(formObj.f_term_dt.value == "") formObj.f_term_dt.value = 0;
		if(formObj.f_term_dt.value != ""){
			if(isNaN(formObj.f_term_dt.value)){
				formObj.f_term_dt.value="";
				return;
			}
			var dueDay=formObj.f_term_dt.value;
			var endDate=addDay(formObj.f_inv_dt.value, dueDay);
			formObj.f_due_dt.value=endDate;
		}
	}else if(formObj.f_terms[2].selected){
		formObj.f_term_dt.value="";
		var endDate=getEndDate(formObj.f_inv_dt.value);
		formObj.f_due_dt.value=endDate;
	}else if(formObj.f_terms[3].selected){
		formObj.f_term_dt.value="";
		var endDate=getNextEndDate(formObj.f_inv_dt.value);
		formObj.f_due_dt.value=endDate;
	}
	else if(formObj.f_terms[4].selected){
		if(formObj.f_term_dt.value != ""){
			var dueDay=formObj.f_term_dt.value;
			if(Number(dueDay) < 1 || Number(dueDay) > 31){
				//Invalid date.
	       	   	alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE'));
				formObj.f_term_dt.value="";
				formObj.f_term_dt.focus();
				return;
			}
			var endDate=getNextInputDate(formObj.f_inv_dt.value, dueDay);
			formObj.f_due_dt.value=endDate;
		}
	}
}

/*function enterChangeInvDate(){
	if(ComGetEvent("keycode") == 13){
		changeInvDate();
	}
}*/

function changeInvDate(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	if(formObj.f_inv_dt.value != ""){
		if(MULTI_CURR_FLAG == "Y"){
			if(confirm(getLabel('ACC_MSG146'))){
				for(var i=2; i<=sheetObj.LastRow(); i++){
					sheetObj.SetCellValue(i,"inv_xcrt_dt",formObj.f_inv_dt.value);
				}
			}
		}
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
    	   mm="0"+mm
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
//다음달 말일구하기
function getNextEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2))+1;
	if(mm == 13){
		yy=yy+1;
		mm=1;
	}
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
//다음달 입력일 구하기
function getNextInputDate(datestr, v_day){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2))+1;
	if(mm == 13){
		yy=yy+1;
		mm=1;
	}
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm
       }
       if(mon[mm-1] < v_day){
    	   //Invalid date.
      	   alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE'));
      	   return false;
       }
    } 
    else{
      if(yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
    		  mm="0"+mm
          }
          if(y_day > 29){
        	  //Invalid date.
        	  alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE'));
       	   	  return false;
          }
      }
      else{
    	  if(mm < 10){
       	   mm="0"+mm
          }
    	  if(y_day > 28){
    		  //Invalid date.
	       	  alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE'));
       	   	  return false;
          }
      }
    }
    if(Number(v_day) < 10){
    	v_day="0"+v_day;
    }
    boundDay=mm + "-" + v_day + "-" + yy;
    return boundDay;  
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
//그리드 전체를 삭제하면 INVOICE 를 삭제한다.
function checkDelete(){
	var sheetObj=docObjects[0];
	var returnFlag=true;
	var delCnt=0;
	for(var i=2; i<=sheetObj.LastRow(); i++){
		if(sheetObj.GetCellValue(i, "inv_seq") != ""){
			if(sheetObj.GetCellValue(i,"del_chk") == "1"){
				delCnt += 1;
			}
		}
   }
	if(delCnt == sheetObj.RowCount()&& sheetObj.LastRow()> 1){
		returnFlag=false;
	}
	return returnFlag
}
//화면 클리어
function clearAll(){
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  if(collTxt[i].name != "f_usr_nm" && collTxt[i].name != "f_email" && collTxt[i].name != "f_ofc_cd" && collTxt[i].name != "f_cnt_cd"){
			  collTxt[i].value="";
		  }
		  if(collTxt[i].name == "f_agent_cd" || collTxt[i].name == "f_agent_nm" ||
		     collTxt[i].name == "f_agent_ref_no" || collTxt[i].name == "f_profit_share" ||
		     collTxt[i].name == "f_post_dt" || collTxt[i].name == "f_inv_dt" || 
		     collTxt[i].name == "f_term_dt" || collTxt[i].name == "f_due_dt" || 
		     collTxt[i].name == "f_last_paid_dt_cal"){
			  collTxt[i].className="search_form";
			  collTxt[i].readOnly=false;
		  }
	  }           
	}
	
	//#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
   	//AUTO 표시
	frm1.f_vchr_no.value = "AUTO";
	frm1.f_vchr_tp_cd.value = "P"; //PAYMENT	
	
	frm1.f_terms.value="";
	frm1.f_curr_cd.value="";
	frm1.f_remark.value="";
	frm1.f_terms.disabled=false;
	frm1.f_curr_cd.disabled=false;
	frm1.f_remark.disabled=false;
	frm1.f_inco_cd.disabled=false;
//	saveBtn1.style.display="inline";
//	saveBtn2.style.display="inline";
	getBtnObj('btnModify').style.display="inline";
	getBtnObj('btnSaveX').style.display="inline";
	/*
	deleteBtn1.style.display="inline";
	getBtnObj('deleteBtn2').style.display="inline";
	*/
//	rowAddBtn1.style.display="inline";
	getObj('rowAddBtn2').style.display="inline";
//	rowAddBtn3.style.display="inline";
	getObj('rowAddBtn4').style.display="inline";
//	autoBtn1.style.display="inline";
	getObj('autoBtn2').style.display="inline";
//	autoBtn3.style.display="inline";
	getObj('autoBtn4').style.display="inline";
//	pscalBtn1.style.display="inline";
	getObj('pscalBtn2').style.display="inline";
	frm1.agent_btn.onclick=function(){doWork("CUSTOMER_POPLIST");};
	frm1.agent_btn.style.cursor="hand";
	//frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDate();if(frm1.f_terms.value != ''){calcCreateTerms();}};
	frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDt();};
	frm1.f_term_dt.onblur=function(){calcCreateTerms();};
	frm1.f_inco_cd[0].selected=true;
	// frm1.f_post_dt_cal.onclick	 = function(){doDisplay('DATE1', frm1);};
	frm1.f_inv_dt_cal.onclick=function(){doDisplay('DATE2', frm1);};
	frm1.f_due_dt_cal.onclick=function(){doDisplay('DATE3', frm1);};
	sheetObj.SetEditable(1);
	sheetObj.RemoveAll();
	fnbtnCtl(2);
}
//필수항목체크
function checkVal(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(formObj.f_agent_nm.value == "" || formObj.f_agent_cd.value == ""){
		//[Agent] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_AGENTNM'));
		formObj.f_agent_cd.focus();
		return false;
	}
	if(formObj.f_post_dt.value == ""){
		//[Posting Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_POSTING'));
		formObj.f_post_dt.focus();
		return false;
	}
	if(formObj.f_inv_dt.value == ""){
		//[Invoice Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_INVOICEDT'));
		formObj.f_inv_dt.focus();
		return false;
	}
	if(formObj.f_due_dt.value == ""){
		//[Due Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_DUEDT')); 
		formObj.f_due_dt.focus();
		return false;
	}
	if(formObj.f_curr_cd.value == ""){
		//[Currency] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BLCURRENCY'));
		formObj.f_curr_cd.focus();
		return false;
	}
	//B/L NO가 없을시 경고문구를 띄운다. 
	if(formObj.f_mbl_no.value == "" && formObj.f_hbl_no.value == ""){
		//[B/L No.] Missing. proceed anyway? 
		if(confirm(getLabel('ACC_COM_ALT010')) == false){
			return false;
		}
		//[B/L No.] is Empty. Please Input B/L No. 
//		alert(getLabel('ACC_COM_ALT009') + "\n\n: ACC_INV_0020.3033");
		//return false;
	}
	/*
	// #20443 기존의 마감 POST_DT 체크에서 BLOCK_DT 체크로 변경
	if(formObj.f_inv_seq.value == "") {
		var bl_post=(formObj.f_post_dt.value).replaceAll("-","");
		var block_post=formObj.block_post.value;
		if(bl_post != "" && block_post != "") {
			bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
			block_post=block_post.substring(4,8)+block_post.substring(0,2)+block_post.substring(2,4);
			var blockDtPrn=block_post.substr(0,2)+"/" + block_post.substr(2,2)+ "/" + block_post.substr(4,4);
			if(block_post >= bl_post){
				alert(getLabel2('ACC_MSG119',new Array(blockDtPrn)));
				formObj.f_post_dt.value=formObj.old_post_dt.value;
				formObj.f_post_dt.select();
				return false;
			}
		}
	}
	*/	
/*	// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	//2012/04/20 A/P 와 같이 새로 입력한 건만 VALIDATION 을 건다.
	if(formObj.f_inv_seq.value == ""){
		if(bl_post != "" && slip_post != ""){
			bl_post=bl_post.replaceAll("-","");
			bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
			slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
			if(slip_post >= bl_post){
				//Invalid [Posting Date]
				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0020.2903");
				formObj.f_post_dt.value=formObj.old_post_dt.value;
				formObj.f_post_dt.select();
				return false;
			}
		}
	}*/
	/*
	if(bl_post != "" && slip_post != ""){
		bl_post=bl_post.replaceAll("-","");
		bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
		slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
		if(slip_post >= bl_post){
			//Invalid [Posting Date]
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0020.2918");
			formObj.f_post_dt.value=formObj.old_post_dt.value;
			formObj.f_post_dt.select();
			return false;
		}
	}
	*/
	//AGENT 에 DEFAULT 가 들어왔을경우 INVOICE 발생을 못함.
	if(formObj.f_agent_cd.value.indexOf("DEFAULT") != -1){
		//Invalid [Agent's Name]
		alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_AGNT'));
		formObj.f_agent_cd.value="";
		formObj.f_agent_nm.value="";
		formObj.f_agent_cd.focus();
		return false;
	}
	for(var i=2;i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "frt_cd") == ""){
			//[Freight Code] is mandatory field.
			alert(getLabel('FMS_COM_ALT007') +  "\n - " + getLabel('ITM_FRT_CD'));
			sheetObj.SelectCell(i,"frt_cd");
			return false;
		}
		if(sheetObj.GetCellValue(i, "qty") == ""){
			//[Vol] is mandatory field.
			alert(getLabel('FMS_COM_ALT007') +  "\n - " + getLabel('FMS_COD_QTY'));
			sheetObj.SelectCell(i,"qty");
			return false;
		}
		if(sheetObj.GetCellValue(i, "rat_curr_cd") == ""){
			//[Currency] is mandatory field.
			alert(getLabel('FMS_COM_ALT007') +  "\n - " + getLabel('ITM_TARIFF_CURR'));
			sheetObj.SelectCell(i,"rat_curr_cd");
			return false;
		}
		if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == ""){
			//[sell_buy_tp_cd] is mandatory field.
			alert(getLabel('FMS_COM_ALT007') +  "\n - " + getLabel('SELL_BUY_TP_CD'));
			sheetObj.SelectCell(i,"sell_buy_tp_cd");
			return false;
		}
		if(sheetObj.GetCellValue(i, "frt_term_cd") == ""){
			//[frt_term_cd] is mandatory field.
			alert(getLabel('FMS_COM_ALT007') +  "\n - " + getLabel('FRT_TERM_CD'));
			sheetObj.SelectCell(i,"frt_term_cd");
			return false;
		}
		
		//#2557 [LBS]AR Entry / A/P Entry / D/C Entry 의 환율 Validation 추가  
		if(sheetObj.GetCellValue(i, "inv_xcrt") == "0" || sheetObj.GetCellValue(i, "inv_xcrt") == "" 
			|| Number(sheetObj.GetCellValue(i, "inv_xcrt")) == 0 ){
			//[Ex_Rate] is mandatory field.
			alert(getLabel('FMS_COM_ALT007') +  "\n - " + getLabel('FMS_COD_EXRT'));
			sheetObj.SelectCell(i,"inv_xcrt");
			return false;
		}		
	}
	return true;
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if(s_code != ""){
		if(tmp == "onKeyDown"){
			if(event.keyCode == 13){
				onKeyDownFlg = false;
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="AGENT"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
				onKeyDownFlg = true;
			}
		} 
		else if(tmp == "onBlur"){
			if(!onKeyDownFlg) return;
			CODETYPE=str;		
			s_type="trdpCode";
			if(CODETYPE=="AGENT"){
				ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
	else{
		if(str == "AGENT"){
			formObj.f_agent_cd.value="";//trdp_cd  AS param1
			formObj.f_agent_nm.value="";//eng_nm   AS param2
		}
	}
}
/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	

			//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
			var opt_key_sec = "TP_OVER_AMT_FLG";
			ajaxSendPost(setOverAmtCurrFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

			if(CODETYPE =="AGENT"){


				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.f_agent_cd.value="";		//trdp_cd  AS param1
					formObj.f_agent_nm.value="";		//eng_nm   AS param2
					formObj.f_terms.value="";	//term_cd
					formObj.f_term_dt.value="";	//term_dt
					formObj.f_agent_cd.style.color= "#000000";
					formObj.f_agent_nm.style.color= "#000000";
					calcCreateTerms();
					return;
				}
				//[20140317 OYH] #27474
				if(masterVals[5]=='CR'){
					//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
					if (TP_OVER_AMT_FLG != ""){
						var objArr=new Array();
						var overDueDateAmt = masterVals[38]==""?0:eval(masterVals[38]);
						if ( overDueDateAmt != 0){
							objArr[0]=masterVals[3];
							objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
								formObj.f_agent_cd.value="";
								formObj.f_agent_nm.value="";
								formObj.f_agent_cd.style.color= "#000000";
								formObj.f_agent_nm.style.color= "#000000";
								return;
							} else {
								formObj.f_agent_cd.style.color= "#ff0000";
								formObj.f_agent_nm.style.color= "#ff0000";
							}
						}
					}

					var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
					var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
					var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
					
					//[20141217 YJW] #46708
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));  
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2)); 
							if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
								formObj.f_agent_cd.value="";
								formObj.f_agent_nm.value="";
								try {creditOver=false;}catch(e){};
								formObj.f_agent_cd.style.color= "#000000";
								formObj.f_agent_nm.style.color= "#000000";
								return;
							} else {
								try {creditOver=true;}catch(e){};
								formObj.f_agent_cd.style.color= "#ff0000";
								formObj.f_agent_nm.style.color= "#ff0000";
							}
						} else if (balLmtAmt < 0){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));    
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2)); 
							if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
								formObj.f_agent_cd.value="";//trdp_cd  AS param1
								formObj.f_agent_nm.value="";//eng_nm   AS param2
								try {creditOver=false;}catch(e){};
								formObj.f_agent_cd.style.color= "#000000";
								formObj.f_agent_nm.style.color= "#000000";
								return;
							} else {
								try {creditOver=true;}catch(e){};
								formObj.f_agent_cd.style.color= "#ff0000";
								formObj.f_agent_nm.style.color= "#ff0000";
							}
						} else if (overDueAmt > 0) {
							try {creditOver=false;}catch(e){};
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2));     
							if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
								formObj.f_agent_cd.value="";//trdp_cd  AS param1
								formObj.f_agent_nm.value="";//eng_nm   AS param2
								//try {creditOver=false;}catch(e){};
								formObj.f_agent_cd.style.color= "#000000";
								formObj.f_agent_nm.style.color= "#000000";
								return;
							} else {
								//try {creditOver=true;}catch(e){};
								formObj.f_agent_cd.style.color= "#ff0000";
								formObj.f_agent_nm.style.color= "#ff0000";
							}
						} else {
							try {creditOver=false;}catch(e){};
							formObj.f_agent_cd.style.color= "#000000";
							formObj.f_agent_nm.style.color= "#000000";
						}
					} else {
						try {creditOver=false;}catch(e){};
						formObj.f_agent_cd.style.color= "#000000";
						formObj.f_agent_nm.style.color= "#000000";
					}
					
				} else if(masterVals[5] == 'CH'){
					if(confirm(getLabel('COM_FRT_CFM005'))){
						try {creditOver=true;}catch(e){};
						formObj.f_agent_cd.style.color= "#ff0000";
						formObj.f_agent_nm.style.color= "#ff0000";
					}else{
						formObj.f_agent_cd.value = "";
						formObj.f_agent_nm.value = "";
						try {creditOver=false;}catch(e){};
						formObj.f_agent_cd.style.color= "#000000";
						formObj.f_agent_nm.style.color= "#000000";
						return;
					}
					
				} else if(masterVals[5] == 'CO'){
					try {creditOver=false;}catch(e){};
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.f_agent_cd.style.color= "#ff0000";
						formObj.f_agent_nm.style.color= "#ff0000";
					}else{
						formObj.f_agent_cd.value = "";
						formObj.f_agent_nm.value = "";
						formObj.f_agent_cd.style.color= "#000000";
						formObj.f_agent_nm.style.color= "#000000";
						return;
					}
					
				}/* else {
					try {creditOver=false;}catch(e){};
					formObj.f_agent_cd.style.color= "#ff0000";
					formObj.f_agent_nm.style.color= "#ff0000";
					alert(getLabel('COM_FRT_ALT001'));
				}*/
				
				formObj.f_agent_cd.value=masterVals[0];		//trdp_cd  AS param1
				formObj.f_agent_nm.value=masterVals[3];		//eng_nm   AS param2
				formObj.f_terms.value=masterVals[8];	//term_cd
				formObj.f_term_dt.value=masterVals[9];	//term_dt
				
				// Agent와 TRDP_CD가 다를 경우 check를 푸는 로직 삭제. 
				// 저장할 때 Agent로 자동세팅되어 필요없는 로직이며 오류를 유발할 수 있음. (yjw 2015.08.21)
				/*for(var i=2; i<=sheetObj.LastRow(); i++){
					if(sheetObj.GetCellValue(i, "trdp_cd") == formObj.f_agent_cd.value){
						sheetObj.SetCellValue(i, "frt_check","1");
					}
					else{
						sheetObj.SetCellValue(i, "frt_check","0");
					}
				}*/
				calcCreateTerms();
				/*
				if(masterVals[5]=='CR'){
					if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
						//COD(Cash On Delivery) Case!
						alert(getLabel('FMS_COM_ALT020'));
					}
				}else{
					//alert(masterVals[5]);
					alert(masterVals[5]);
				}*/
			}else if(CODETYPE == "trdpCode_partner"){
				formObj.f_agent_cd.value=masterVals[0];		//trdp_cd  AS param1
				formObj.f_agent_nm.value=masterVals[3];		//eng_nm   AS param2
				formObj.prnr_trdp_addr.value=masterVals[1];	//eng_addr
			}
		}else{
				if(CODETYPE =="AGENT"){
					formObj.f_agent_cd.value="";		//trdp_cd  AS param1
					formObj.f_agent_nm.value="";		//eng_nm   AS param2
					formObj.f_terms.value="";	//term_cd
					formObj.f_term_dt.value="";	//term_dt
				}else if(CODETYPE == "trdpCode_partner"){
					formObj.f_agent_cd.value="";		//trdp_cd  AS param1
					formObj.f_agent_nm.value="";		//eng_nm   AS param2
					formObj.prnr_trdp_addr.value="";	//eng_addr
				}
		}
	}
	else{
		//SEE_BMD_MSG43		
	}
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}else if(type == "CUSTOMER_NAME"){
			doWork("CUSTOMER_NAME");
		}
	}
}
//마감처리를 한다.
function execMagam(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  if(collTxt[i].name != "f_usr_nm" && collTxt[i].name != "f_email" && collTxt[i].name != "f_ofc_cd" && collTxt[i].name != "f_cnt_cd" &&
		     collTxt[i].name != "s_bl_no" && collTxt[i].name != "s_ref_no" && collTxt[i].name != "s_oth_no" && collTxt[i].name != "s_inv_no"
			 && collTxt[i].name != "f_loc_ex_rate" 
			 //#5748 [StarCluster-MEX] Request for making Tax Invoice No column in A/R Entry screen
			 && collTxt[i].name != "f_vchr_no"  
	 	     //#6870 [Star Mexico] Edit Invoice after File block / Deposit & Payment Role Management
			 && collTxt[i].name != "f_tax_no"				 
		  ){
			  collTxt[i].className="search_form-disable";
			  collTxt[i].readOnly=true;
		  }
	  }   
	  //LHK, 20130330 MBL 일 경우 HBL 은 print parma 으로 사용하기 위해서 enable 한다. 
	  if(formObj.f_biz_clss_cd.value="M"){
		  formObj.f_hbl_no.className="search_form";
		  formObj.f_hbl_no.readOnly=false;
	  }
	}
	//LHK, 20130330 MBL 일 경우 HBL 은 print parma 으로 사용하기 위해서 enable 한다. 
    if(formObj.f_biz_clss_cd.value="M"){
	    formObj.f_hbl_no.className="search_form";
	    formObj.f_hbl_no.readOnly=false;
    }
	frm1.f_terms.disabled=true;
	frm1.f_curr_cd.disabled=true;
	frm1.f_remark.disabled=true;
	frm1.f_inco_cd.disabled=true;
	frm1.f_tax_bill.disabled=true;
//	saveBtn1.style.display="none";
	//span id 처리 getObj('saveBtn2').style.display="none";
	getBtnObj('btnModify').style.display="none";
	getBtnObj('btnSaveX').style.display="none";
	/*
	deleteBtn1.style.display="none";
	*/
	//getBtnObj('deleteBtn2').style.display="none";
//	rowAddBtn1.style.display="none";
	getObj('rowAddBtn2').style.display="none";
//	rowAddBtn3.style.display="none";
	getObj('rowAddBtn4').style.display="none";
//	autoBtn1.style.display="none";
	getObj('autoBtn2').style.display="none";
//	autoBtn3.style.display="none";
	getObj('autoBtn4').style.display="none";
//	pscalBtn1.style.display="none";
	getObj('pscalBtn2').style.display="none";
	frm1.f_inv_dt.onblur="";
	frm1.f_term_dt.onblur="";
	// frm1.f_post_dt_cal.onclick	 = "";
	frm1.f_inv_dt_cal.onclick="";
	frm1.f_due_dt_cal.onclick="";
	sheetObj.SetEditable(0);
	sheetObj.RenderSheet(1);
}
//CURRENCY를 셋팅한다.
function setCurrency(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for(var i=2; i<=sheetObj.LastRow();i++){
		var curr=formObj.f_curr_cd.value;
		if(MULTI_CURR_FLAG == "Y"){		//Get System Inputted Exchange Rate  
			/*var param = '';
			var tmp_dt = '';
			var bnd_clss_cd =  formObj.f_bnd_clss_cd.value; 
			if(bnd_clss_cd=='O'){
				tmp_dt = frm1.f_etd_dt.value.replaceAll("-", "");
				tmp_dt = tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
			}else{
				tmp_dt = frm1.f_eta_dt.value.replaceAll("-", "");
				tmp_dt = tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
			}
			param += '&cur_dt=' + tmp_dt;
			param += '&trf_cur_cd=' + sheetObj.GetCellValue(i, 'rat_curr_cd');
			param += '&ofccurr_cd=' + curr;
			getXcrtRate = 1;
			ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');
			if(getXcrtRate ==0){
				getXcrtRate = 1;
			}
			sheetObj.SetCellValue(i, "inv_xcrt", getXcrtRate, 0);
			sheetObj.SetCellValue(i, 'inv_xcrt_dt', tmp_dt, 0);*/
			
			//#4020 (JAPT) invoice Ex.date, rate validation, amount  추가
			setExRate(i,"");
			
		}else{
			sheetObj.SetCellValue(i, "rat_curr_cd", curr, 0);
			sheetObj.SetCellValue(i, "inv_xcrt",1);
		}
		// }
		sheetObj.SetCellValue(i, "inv_aply_curr_cd", curr, 0);
		
		/*var calRu=0;
		if(sheetObj.GetCellValue(i, "ru") == "" || Number(sheetObj.GetCellValue(i, "ru")) == 0){
			calRu=Number(sheetObj.GetCellValue(i, "agent_ru"));
		}else{
			calRu=Number(sheetObj.GetCellValue(i, "ru"));
		}
		sheetObj.SetCellValue(i, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(i, "qty")) * calRu, 0);
		if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == "C"){
			if(sheetObj.GetCellValue(i, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
					sheetObj.SetCellValue(i, "agent_amt",Math.round( Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt"))));
					sheetObj.SetCellValue(i, "credit_amt","0");
					sheetObj.SetCellValue(i, "debit_amt","0");
				}else{
					sheetObj.SetCellValue(i, "agent_amt",Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt")));
					sheetObj.SetCellValue(i, "credit_amt","0");
					sheetObj.SetCellValue(i, "debit_amt","0");
				}
			}else if(sheetObj.GetCellValue(i, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
					sheetObj.SetCellValue(i, "credit_amt",Math.round( Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt"))));
					sheetObj.SetCellValue(i, "agent_amt",Math.round( Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt"))));
					sheetObj.SetCellValue(i, "debit_amt","0");
				}else{
					sheetObj.SetCellValue(i, "credit_amt",Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt")));
					sheetObj.SetCellValue(i, "agent_amt",Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt")));
					sheetObj.SetCellValue(i, "debit_amt","0");
				}
			}
		}else if(sheetObj.GetCellValue(i, "sell_buy_tp_cd") == "D"){
			if(sheetObj.GetCellValue(i, "frt_term_cd") == "PP"){
				if(curr=="KRW" || curr=="JPY"){
					sheetObj.SetCellValue(i, "debit_amt","0");
					sheetObj.SetCellValue(i, "credit_amt","0");
					sheetObj.SetCellValue(i, "agent_amt",Math.round( Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt"))));
				}else{
					sheetObj.SetCellValue(i, "debit_amt","0");
					sheetObj.SetCellValue(i, "credit_amt","0");
					sheetObj.SetCellValue(i, "agent_amt",Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt")));
				}
			}else if(sheetObj.GetCellValue(i, "frt_term_cd") == "CC"){
				if(curr=="KRW" || curr=="JPY"){
					sheetObj.SetCellValue(i, "debit_amt",Math.round( Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt"))));
					sheetObj.SetCellValue(i, "credit_amt","0");
					sheetObj.SetCellValue(i, "agent_amt",Math.round( Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt"))));
				}else{
					sheetObj.SetCellValue(i, "debit_amt",Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt")));
					sheetObj.SetCellValue(i, "credit_amt","0");
					sheetObj.SetCellValue(i, "agent_amt",Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt")));
				}
			}
		}*/
	}
}

//#4020 (JAPT) invoice Ex.date, rate validation, amount  추가
function setExRate(row, val){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];

	if(formObj.f_curr_cd.value != sheetObj.GetCellValue(row, "rat_curr_cd")){
		var param = '';
		var cur_dt_val= val==""?sheetObj.GetCellValue(row, 'inv_xcrt_dt'):val;
		param += '&cur_dt=' + cur_dt_val;
		param += '&trf_cur_cd=' + sheetObj.GetCellValue(row, 'rat_curr_cd');
		param += '&ofccurr_cd=' + formObj.f_curr_cd.value;

		getXcrtRate = 1;
		ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');
		//rate가없을경우 0으로 변경 20180308
		//if(getXcrtRate ==0){
		//	getXcrtRate = 1;
		//}
		sheetObj.SetCellValue(row, "inv_xcrt", getXcrtRate);
	} else {
		sheetObj.SetCellValue(row, "inv_xcrt", 1);
	}
	
	//#3885 [JAPT] Invoice amount  calculation bug.  local currency bug.
	//inv_xcrt 값이 변경되지 않더라도 이벤트 발생 (JPY 소수점문제로 재계산필요)
	sheet1_OnChange(sheetObj, row, sheetObj.SaveNameCol("inv_xcrt"));
}


//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
var getLoclXcrtRate = 0;
function setExRateLocl(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var loclTtlAmt = 0;
	var exRate = removeComma(formObj.f_loc_ex_rate.value);
	
	if(exRate ==  "" || exRate == "0"  || Number(exRate) == 0 ){
		alert(getLabel('ACC_MSG167'));
		return false;
	}	
	
	for(var row=2; row<=sheetObj.LastRow(); row++){
		
		//#3862 [JAPT] PAYMENT 금액 틀어지는 이슈  
		//숨겨진 row 제외
		if(sheetObj.GetRowHidden(row) == "1"){
			continue;
		}
		
		//#4010 [JAPT] INVOICE ENTRY - LOCL AMOUNT 계산 로직 버그
		if(sheetObj.GetCellValue(row,"del_chk") == "1"){
			continue;
		}		
		if(sheetObj.GetCellValue(row,"frt_check") == "0" && (sheetObj.GetCellValue(row,"inv_seq") == "" ||sheetObj.GetCellValue(row,"ibflag") == "I")){
			continue;
		}
		if(MULTI_CURR_FLAG == "Y"){
			
			if(ofc_locl_curr_cd == sheetObj.GetCellValue(row, 'inv_aply_curr_cd')){
				sheetObj.SetCellValue(row, "locl_curr_cd", ofc_locl_curr_cd,0);
				sheetObj.SetCellValue(row, "locl_xcrt", 1,0);
				
				if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){  //debit
					sheetObj.SetCellValue(row, "locl_amt", sheetObj.GetCellValue(row, "debit_amt"), 0);
					
					loclTtlAmt = Number(loclTtlAmt) + Number(sheetObj.GetCellValue(row, "locl_amt"));
				}else{ //credit
					sheetObj.SetCellValue(row, "locl_amt", sheetObj.GetCellValue(row, "credit_amt"), 0);
					loclTtlAmt = Number(loclTtlAmt) - Number(sheetObj.GetCellValue(row, "locl_amt"));
				}
				
			}else{
				/* 각 로우 마다 rate curr 서로다른경우   Local Ex.Rate 가 다르게 세팅될수있다 
				if(ofc_locl_curr_cd == sheetObj.GetCellValue(row, 'rat_curr_cd')){
					sheetObj.SetCellValue(row, "locl_curr_cd", ofc_locl_curr_cd,0);
					sheetObj.SetCellValue(row, "locl_xcrt", 1,0);
					sheetObj.SetCellValue(row, "locl_amt", sheetObj.GetCellValue(row, "trf_cur_sum_amt"), 0);	
					
					if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){  //debit
						loclTtlAmt = Number(loclTtlAmt) +  Number(sheetObj.GetCellValue(row, "locl_amt"));
					}else{ //credit
						loclTtlAmt = Number(loclTtlAmt) -  Number(sheetObj.GetCellValue(row, "locl_amt"));
					}							
				}else{
				*/
					
					var locl_amt = 0;
					
					if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){  //debit
						locl_amt = Number(sheetObj.GetCellValue(row, "debit_amt")) * exRate;
					}else{ //credit
						locl_amt = Number(sheetObj.GetCellValue(row, "credit_amt")) * exRate;
					}						
					
					
					if( ofc_locl_curr_cd =="JPY"){
						sheetObj.SetCellValue(row, "locl_amt", roundTo(Number(locl_amt),0), 0);
					}else{
						sheetObj.SetCellValue(row, "locl_amt", roundTo(Number(locl_amt),2), 0);
					}			
					sheetObj.SetCellValue(row, "locl_curr_cd", ofc_locl_curr_cd,0);
					sheetObj.SetCellValue(row, "locl_xcrt", exRate,0);		
					
					
					if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){  //debit
						loclTtlAmt = Number(loclTtlAmt) +  Number(sheetObj.GetCellValue(row, "locl_amt"));
					}else{ //credit
						loclTtlAmt = Number(loclTtlAmt) -  Number(sheetObj.GetCellValue(row, "locl_amt"));
					}		
					
				//}
			}
			
		}else{
			
			
			if(formObj.f_curr_cd.value == ofc_locl_curr_cd){
				sheetObj.SetCellValue(row, "locl_curr_cd", ofc_locl_curr_cd,0);
				sheetObj.SetCellValue(row, "locl_xcrt", 1,0);
				
				if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){  //debit
					sheetObj.SetCellValue(row, "locl_amt", sheetObj.GetCellValue(row, "debit_amt"), 0);
					loclTtlAmt = Number(loclTtlAmt) +  Number(sheetObj.GetCellValue(row, "locl_amt"));
				}else{ //credit
					sheetObj.SetCellValue(row, "locl_amt", sheetObj.GetCellValue(row, "credit_amt"), 0);
					loclTtlAmt = Number(loclTtlAmt) -  Number(sheetObj.GetCellValue(row, "locl_amt"));
				}					
			}else{
				var param = '';
				
				var locl_amt = 0;
				
				
				if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){  //debit
					locl_amt = Number(sheetObj.GetCellValue(row, "debit_amt")) * exRate;
				}else{ //credit
					locl_amt = Number(sheetObj.GetCellValue(row, "credit_amt")) * exRate;
				}						
				
				if( ofc_locl_curr_cd =="JPY"){
					sheetObj.SetCellValue(row, "locl_amt", roundTo(Number(locl_amt),0), 0);
				}else{
					sheetObj.SetCellValue(row, "locl_amt", roundTo(Number(locl_amt),3), 0);
				}			
				sheetObj.SetCellValue(row, "locl_curr_cd", ofc_locl_curr_cd,0);
				sheetObj.SetCellValue(row, "locl_xcrt", exRate,0);
				
				
				
				if(sheetObj.GetCellValue(row, "sell_buy_tp_cd") == "D"){  //debit
					loclTtlAmt = Number(loclTtlAmt) +  Number(sheetObj.GetCellValue(row, "locl_amt"));
				}else{ //credit
					loclTtlAmt = Number(loclTtlAmt) -  Number(sheetObj.GetCellValue(row, "locl_amt"));
				}	
				
			}
		}
		
		
		
	}
	
	if(loclTtlAmt < 0){
		loclTtlAmt = loclTtlAmt * -1
	}
	
	formObj.locl_ttl_amt.value = loclTtlAmt;
	
	return true;
}

//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
function getLoclCurrency(reqVal){
	var doc = getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	getLoclXcrtRate = doc[1];
    }
}

//Invoice NO 중복체크를 한다.
function checkInvNoDup(){
	var formObj=document.frm1;
	// Bug #25598 : A/R, A/P, D/C Entry 화면에서 Invoice NO 중복체크 오류
	if (formObj.f_inv_no.readOnly == false) {
		if(formObj.f_inv_no.value != ""){
			if(formObj.temp_inv_no.value != formObj.f_inv_no.value){
				ajaxSendPost(checkDupInvNo, 'reqVal', '&goWhere=aj&bcKey=checkDupInvNo&inv_no='+formObj.f_inv_no.value, './GateServlet.gsl');
			}
		}
	}
}
/**
 * AJAX RETURN
 * INVOICE NO 중복체크
 */
function checkDupInvNo(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				formObj.f_inv_no.select();
				//CR/DB No Duplicate!!
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CRDB'));
				formObj.f_inv_no.value=formObj.temp_inv_no.value;
			}
		}
	}
}
function setBLOCK_POST_DT(){
	//LHK, 20130122, today, post date 비교하지 않는다, post_date 변경시 block date, jnr_dt 와만 비교함.
	var formObj=document.frm1;
	var block_post=formObj.block_post.value;
	var max_jnr_dt=formObj.max_jnr_dt.value;
	var tempBlkDt="";
	//큰 것과 jnr_dt 비교, 크면 jnr_dt 아니면 위 로직의 큰 date 이 Set 된다. 
	if(block_post != "" && max_jnr_dt != ""){
		if(!compareTwoDate(block_post, max_jnr_dt)){
			tempBlkDt=max_jnr_dt;
		}else{
			tempBlkDt=block_post;
		}
	}else{
		if(block_post != ""){
			tempBlkDt=block_post;
		}
		if(max_jnr_dt != ""){
			tempBlkDt=max_jnr_dt;
		}
	}
	if(tempBlkDt != ""){
		ORG_BLOCK_POST_DT=tempBlkDt.substring(0,2) + "-" + tempBlkDt.substring(2,4) + "-" + tempBlkDt.substring(4,8);	// mmddyyyy ;
		tempBlkDt=tempBlkDt.substring(4,8)+tempBlkDt.substring(0,2)+tempBlkDt.substring(2,4);
		tempBlkDt=addDate('d', 1, tempBlkDt, "");
		BLOCK_POST_DT=tempBlkDt.substring(4,6) + "-" + tempBlkDt.substring(6,8) + "-" + tempBlkDt.substring(0,4);
	}
}
function checkPostDate(obj){
	var formObj=document.frm1;
	var changed_post_dt=obj.value;
	if(changed_post_dt == formObj.old_post_dt.value){
		return;
	}
	if(BLOCK_POST_DT == ""){
		return;
	}
	if(compareTwoDate(BLOCK_POST_DT, changed_post_dt)){
		alert(getLabel2('ACC_MSG119',new Array(ORG_BLOCK_POST_DT)));
		formObj.f_post_dt.value=formObj.old_post_dt.value;
		formObj.f_post_dt.select();
		return false;
	}
	// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
/*	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	if(bl_post != "" && slip_post != ""){
		bl_post=bl_post.replaceAll("-","");
		bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
		slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
		if(slip_post >= bl_post){
			//Invalid [Posting Date]
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0020.3236");
			formObj.f_post_dt.value=formObj.old_post_dt.value;
			formObj.f_post_dt.select();
			return false;
		}
	}*/
}
var mailTo="";
function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}else{
			mailTo=doc[1];
		}
	}
}
function chkTrdp(){
	formObj=document.frm1;
	var temp_addr="";
	formObj.main_trdp.value="";
}
//-----[20130401 OJG]-----
function getInvoicePayAmt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]*1 > 0){
				alert(getLabel('ACC_MSG114'));	
				bPaid=true;
			}
		}	
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));	
	}
}
//-----[20130401 OJG]-----
/* LHK 20130829 Tab Key 로 ADD 기능 추가 */
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "ps_check" == sheetObj.ColSaveName(col)){
		if(keyCode==9 && getObj('rowAddBtn2').style.display != "none"){
			doWork('ROWADD');
			sheetObj.SelectCell(row+1, 2);
		}
	}
}
/** 
 *  #20443 POST DATE와 BLOCK_DT 의 비교 
 * 		POST_DATE가 클 경우 return true,
 * 		POST_DATE가 같거나 작을경우 False
 */
function checkPostDt() {
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
	var blockDt=formObj.block_post.value;
	var curPostDt=(formObj.f_post_dt.value).replaceAll("-","");
	// 년도 비교 MMDDYYYY형식 주의
	if (blockDt.substr(4,4) > curPostDt.substr(4,4)) {
		return false;
	} else if (blockDt.substr(4,4) == curPostDt.substr(4,4)) {
		if (blockDt.substr(0,2) > curPostDt.substr(0,2)) {
			return false;
		} else if (blockDt.substr(0,2) == curPostDt.substr(0,2)) {
			if (blockDt.substr(2,2) > curPostDt.substr(2,2)) {
				return false;
			}
		}
	}
	return true;
}
/*
//call : isZeroAmt("trf_cur_sum_amt");
//Zero 이면 true
function isZeroAmt(colname){
	var sheetObj=docObjects[0];
	var isRtn=false;
	for(var i=2;i<=sheetObj.LastRow();i++){
		// alert(sheetObj.CellValue(i,"ibflag"));
if(    sheetObj.GetCellValue(i, "del_chk") != "1"
&& sheetObj.GetCellValue(i, colname) == 0
&& (sheetObj.GetCellValue(i,"ibflag") == 'U' || sheetObj.GetCellValue(i,"ibflag") == 'I')
		){
				isRtn=true;
				break;
		}
	}
	return isRtn;
}
*/
function isZeroAmt(){
	var sheetObj=docObjects[0];
	var totRow=sheetObj.LastRow() + 1;
	var isZeroFlg="";
	// amount가 0인 것들은 삭제 처리하고 진행한다.
	for(var k=totRow-1; k > 1 ; k--){
		if(     sheetObj.GetCellValue(k, 'agent_amt') == 0
				&&  sheetObj.GetCellValue(k, 'del_chk') != '1'
			)
		  {
			if (isZeroFlg == "") {
				if (confirm(getLabel('ACC_MSG124'))) {
					// Confirm 인 경우 0 포함 저장
					isZeroFlg="N";
				} else {
					// Cancel 인 경우 0 저장 안함
					isZeroFlg="Y";
				}
			}
			if (isZeroFlg == "N" && sheetObj.GetCellValue(k, 'ibflag') == 'I') {
				/* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
				sheetObj.RowDelete(k, false);
			}
			if(isZeroFlg == "N" && (sheetObj.GetCellValue(k, 'ibflag') == 'U' || sheetObj.GetCellValue(k, 'ibflag') == 'R')){ //이미 저장된 데이터에 대해서 0인 데이터 삭제처리.
				sheetObj.SetCellValue(k, 'del_chk',1);
			}
		}
	}
}
function getInvModiTms(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	// alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			//alert(doc[1]  + " " +formObj.f_modi_tms.value );
			//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정					
			if (doc[1] == formObj.f_modi_tms.value) {
				isInvModiTmsOk=false;
			} else {
				isInvModiTmsOk=true;
			}
		}
	}
}
function rowaddChkVal(){
	var formObj=document.frm1;
	if(formObj.f_agent_nm.value == "" || formObj.f_agent_cd.value == ""){
   		//[Agent] is mandatory field.
    	alert(getLabel('FMS_COM_ALT007'));
   		formObj.f_agent_cd.focus();
   		return false;
   	}
	return true;
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.s_bl_no.value = "";
	formObj.s_ref_no.value = "";
	formObj.s_oth_no.value = "";
	formObj.s_inv_no.value = "";
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_intg_bl_seq.value = getParam(url,"f_intg_bl_seq");
	formObj.f_inv_seq.value = getParam(url,"f_inv_seq");
	formObj.s_inv_no.value = getParam(url,"s_inv_no");
	
	submitForm();
}

function submitForm(){
	var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./ACC_INV_0020AJ.clt",
		   dataType: 'xml',
		   data: $("form" ).serialize(),
		   success: function(data){
			   setFieldValue( formObj.old_trdp_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.f_intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.f_oth_seq, $('oth_seq',data).text());
			   setFieldValue( formObj.f_air_sea_clss_cd, $('air_sea_clss_cd',data).text());
			   setFieldValue( formObj.f_biz_clss_cd, $('biz_clss_cd',data).text());
			   setFieldValue( formObj.f_bnd_clss_cd, $('bnd_clss_cd',data).text());
			   setFieldValue( formObj.f_inv_seq, $('inv_seq',data).text());
			   setFieldValue( formObj.f_bl_cnt_cd, $('bl_cnt_cd',data).text());
			   setFieldValue( formObj.f_ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.temp_bl_no , $('bl_no',data).text());
			   setFieldValue( formObj.temp_ref_no , $('ref_no',data).text());
			   setFieldValue( formObj.temp_oth_no , $('oth_no',data).text());
			   setFieldValue( formObj.temp_inv_no , $('inv_no',data).text());
			   setFieldValue( formObj.rpt_trdp_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.agent_ps_code , $('agent_ps_code',data).text());
			   setFieldValue( formObj.old_post_dt , $('post_dt',data).text());
			   setFieldValue( formObj.slip_post , $('slip_post',data).text());
			   setFieldValue( formObj.block_post , $('block_post',data).text());
			   setFieldValue( formObj.max_jnr_dt , $('max_jnr_dt',data).text());
			   setFieldValue( formObj.post_dt_inv , $('post_dt_inv',data).text());
			   setFieldValue( formObj.chk_fr_trdp_cd, $('chk_fr_trdp_cd',data).text());
			   setFieldValue( formObj.chk_fr_inv_curr_cd, $('chk_fr_inv_curr_cd',data).text());
			   setFieldValue( formObj.chk_fr_frt_seq, $('chk_fr_frt_seq',data).text());
			   setFieldValue( formObj.f_agent_chg_wgt, $('agent_chg_wgt',data).text());
			   setFieldValue( formObj.f_agent_grs_wgt, $('agent_grs_wgt',data).text());
			   setFieldValue( formObj.logo1, $('logo1',data).text());
			   setFieldValue( formObj.xcrtDt, $('inv_dt',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.chg_wgt, $('chg_wgt',data).text());
			   setFieldValue( formObj.chg_wgt1, $('chg_wgt1',data).text());
			   setFieldValue( formObj.agent_chg_wgt, $('agent_chg_wgt',data).text());
			   setFieldValue( formObj.agent_chg_wgt1, $('agent_chg_wgt1',data).text());
			   setFieldValue( formObj.agent_grs_wgt, $('agent_grs_wgt',data).text());
			   setFieldValue( formObj.agent_grs_wgt1, $('agent_grs_wgt1',data).text());
			   setFieldValue( formObj.customer_unit_chk, $('customer_unit_chk',data).text());
			   setFieldValue( formObj.agent_unit_chk, $('agent_unit_chk',data).text());
			   setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.meas, $('meas',data).text());
			   setFieldValue( formObj.prnr_trdp_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.prnr_trdp_nm, $('prnr_trdp_nm',data).text());
			   setFieldValue( formObj.cust_rt, $('cust_rt',data).text());
			   setFieldValue( formObj.prnr_trdp_cd2, $('prnr_trdp_cd2',data).text());
			   setFieldValue( formObj.agent_rt, $('agent_rt',data).text());
			   setFieldValue( formObj.agent_amt, $('agent_amt',data).text());
			   setFieldValue( formObj.shp_mod_cd, $('shp_mod_cd',data).text());
			   setFieldValue( formObj.cust_amt, $('cust_amt',data).text());
			   setFieldValue( formObj.f_ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.f_ref_no_dtl, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.f_mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.f_hbl_no, $('hbl_no',data).text());
			   setFieldValue( formObj.f_hbl_no, $('hbl_no',data).text());
			   setFieldValue( formObj.f_vsl_flt, $('vsl_flt',data).text());
			   setFieldValue( formObj.f_shpr_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.f_cnee_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.f_pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.f_etd_dt, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.f_pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.f_eta_dt, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.f_por_nm, $('por_nm',data).text());
			   setFieldValue( formObj.f_del_nm, $('del_nm',data).text());
			   setFieldValue( formObj.f_fnl_dest_loc_nm, $('fnl_dest_loc_nm',data).text());
			   setFieldValue( formObj.f_feta_dt, $('f_eta_dt_tm',data).text());
			   setFieldValue( formObj.f_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.f_pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.f_pck_nm, $('pck_ut_nm',data).text());
			   setFieldValue( formObj.f_grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.f_grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.f_chg_wgt, $('chg_wgt',data).text());
			   setFieldValue( formObj.f_chg_wgt1, $('chg_wgt1',data).text());
				  if (formObj.f_air_sea_clss_cd.value != "A"){
					   setFieldValue( formObj.f_meas, $('meas',data).text());
					   setFieldValue( formObj.f_meas1, $('meas1',data).text());
				   }else{
					   setFieldValue( formObj.f_meas, $('vol_wgt',data).text());
					   setFieldValue( formObj.f_meas1, $('vol_meas',data).text());  
				   }
			   setFieldValue( formObj.f_agent_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.f_agent_nm, $('prnr_trdp_nm',data).text());
			   setFieldValue( formObj.f_inv_no, $('inv_no',data).text());
			   setFieldValue( formObj.f_agent_ref_no, $('imp_ref_no',data).text());
			   setFieldValue( formObj.f_post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.f_profit_share, $('profit_share',data).text());
			   setFieldValue( formObj.f_inv_dt, $('inv_dt',data).text());
			   setFieldValue( formObj.pre_inv_dt, $('inv_dt',data).text());
			   setFieldValue( formObj.m_intg_bl_seq , $('m_intg_bl_seq',data).text());
			   setFieldValue( formObj.f_inco_cd , $('inco_cd',data).text());
			   //#5994 [ACROCARGO] Request to show POR and Carrier Bkg No in both AR, D/C Entry and
			   setFieldValue( formObj.f_lnr_bkg_no , $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.f_ntfy_trdp_nm , $('ntfy_trdp_nm',data).text());
			   sheet1.SetColProperty('frt_cd', {ComboText:$('FRTCD2',data).text(), ComboCode:$('FRTCD1',data).text()} );
			   sheet1.SetColProperty('intg_bl_seq_2', {ComboText:$('BL_NO',data).text(), ComboCode:$('INTG_BL_SEQ2',data).text()} );
			   setFieldValue( formObj.m_intg_bl_seq , $('m_intg_bl_seq',data).text());
			   doBtnAuthority(attr_extension); 
			   setupPage();
			   loadPage();
			   doWork('SEARCHLIST');
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
		   }
		 });
}

var getXcrtRate = 0;

function getCurrency(reqVal){
	var doc = getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	getXcrtRate = doc[1];
    }
}

function getDefaultDate(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1] != ""){
				sheet1.SetCellValue(tempRow,"inv_xcrt_dt",doc[1],0);
			}
		}
	}else{
		
	}
}

function setDCProfitShareRoundReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		ps_round=doc[1];
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
//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
function setInvXcrtApplTp(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		XCRT_APP_FLAG=doc[1];
	} else {
		XCRT_APP_FLAG="N";
	}	
}


function getTermDt(){
	var formObj = document.frm1;
	
	var s_type = "trdpCode";
	var s_code = formObj.f_agent_cd.value;
	
	ajaxSendPost(getTermDtReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
}
	
/**
 * Terms 관린 코드조회
 */
function getTermDtReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');
				
			formObj.f_terms.value	  = masterVals[8];	//term_cd
			formObj.f_term_dt.value	  = masterVals[9];	//term_dt
		}
		else{
			formObj.f_terms.value = "";				
			formObj.f_term_dt.value = "";			
		}
	}
	else{
		//SEE_BMD_MSG43
	}
}

function enterInvDt(){
	var formObj=document.frm1;
	if(ComGetEvent("keycode") == 13){
		formObj.f_inv_dt.focus();
		formObj.f_inv_dt.blur();
	}
}

function changeInvDt(){
	var formObj=document.frm1;
	if(formObj.pre_inv_dt.value != formObj.f_inv_dt.value){
		dateRangeValid(formObj.f_inv_dt, 'Invoice Date');
		changeInvDate();
		getTermDt();
		calcCreateTerms();
		formObj.pre_inv_dt.value = formObj.f_inv_dt.value;
	}
	
	//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	getLoclExRate();		
}

//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
function getLoclExRate(){
	var formObj=document.frm1;
	
	if(GL_VIEW_FALG =="Y"){
		var param = '';
		var tmp_dt = formObj.f_inv_dt.value.replaceAll("-", "");
		tmp_dt = tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
		
		param += '&cur_dt=' + tmp_dt;
		param += '&trf_cur_cd=' + formObj.f_curr_cd.value;
		param += '&ofccurr_cd=' + ofc_locl_curr_cd;
		
		getLoclXcrtRate = 0;
		if(XCRT_APP_FLAG == "T"){
			ajaxSendPost(getLoclCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');
		}else if(XCRT_APP_FLAG == "F"){
			ajaxSendPost(getLoclCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrencyFinc' + param, './GateServlet.gsl');
		}
		
		if(formObj.f_curr_cd.value == ofc_locl_curr_cd){
			getLoclXcrtRate =1;
		}
		
		formObj.f_loc_ex_rate.value = getLoclXcrtRate;
		
	}	
	
}



function getPdfFileNm(){
	var formObj=document.frm1;
	var pdfFileNm = "";
	var inv_no = formObj.f_inv_no.value;
	//OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails
	var hbl_no = formObj.f_hbl_no.value;
	
	if (inv_no == "" || inv_no == "undefined" || inv_no == undefined) {
		return "";
	}
	pdfFileNm = "DC_"+inv_no;	
	if(rpt_file_name_flg && hbl_no != ""){
		pdfFileNm += "_" + hbl_no;
	}
	return pdfFileNm;
}
/**
 * IBSeet Object 인스턴스가 생성 완료될때 발생하는 Event
 * (페이지 로딩시 자동 호출)
 */
function sheet1_OnLoadFinish(sheetObj) {
	setTimeout("fn_setFocus()",1000);
}

function fn_setFocus() {
	var formObj=document.frm1;
	formObj.s_bl_no.focus();
}

function getInvBlockCheck(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			if(doc[1] == "Y"){ // Block 처리된 경우
				doWork('PRINT');
			} else {
				if(confirm(getLabel('FMS_COM_CFMPRNBLCK'))){
					frm1.f_cmd.value=COMMAND02;
					sheetObj.DoAllSave("./ACC_INV_0020GS.clt", FormQueryString(formObj), true);
				}
			}
		}
	}
}

//#2131 [BINEX V442] NO G/L MAPPING, BUT CAN ISSUE INVOICE USING BILLING CODE
var useGlCode = false;
function checkUseGlCode(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK") {
		if(doc[1] == "N"){
			alert(getLabel('FMS_COM_ALT103'));
		}else{
			useGlCode = true;
		}
	}
}

function ACC_POPLIST(rtnVal){
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
		}
	 
	 //bill to
	 if(cur_curObj.id == "agent_btn"){
		frm1.f_agent_cd.value=rtnValAry[0];
		
/*		if(frm1.f_agent_nm.getAttribute("dataformat") == "multiLanguage"){
			frm1.f_agent_nm.value=rtnValAry[10];//loc_nm	
		}else{
			frm1.f_agent_nm.value=rtnValAry[2];//eng_nm
		}*/	
		frm1.f_agent_nm.value=rtnValAry[2];//eng_nm
		
		// #3883 [ALL GREEN] Vendor Selection on Invoice Creation
		codeNameAction('AGENT',document.frm1.f_agent_cd, 'onBlur');
	 }
}

//#3159 [CLT] AWB - A/R Invoice Entry Unit 항목 중복 표시
function getUnitCd(){
	
	var formObj = document.frm1;
	var param = "";
	
	if("S" == formObj.f_air_sea_clss_cd.value){
		param = "S004";
	}else if("A" == formObj.f_air_sea_clss_cd.value){
		param = "A006";
	}else{
		param = "O001";
	}
	
	ajaxSendPost(setUnitCd, 'reqVal', '&goWhere=aj&bcKey=getUnitCd&param=' + param, './GateServlet.gsl');
}

function setUnitCd(reqVal){
	var formObj = document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	
	//#3411 [JTC]Accounting & Performance 수정사항
	//Unit Code Blank 제거
	var tmpVal = "";
	var tmpNm  = "";

	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
 			var rtnArr = doc[1].split('$#');
 			
 			for(var i=0; i <= rtnArr.length; i++){
 				if(rtnArr[i] != "null" && rtnArr[i] != "" && rtnArr[i] != 'undefined' && rtnArr[i] != undefined){
 					var tmpArr = rtnArr[i].split('^@');
 					
 					if(tmpArr[0] != "null" && tmpArr[0] != ""){
 						tmpVal += tmpArr[0];
 						tmpNm += tmpArr[1];
 						
 						if(i != rtnArr.length - 2){
 							tmpVal += "|";
 							tmpNm += "|";
 						}
 					}
 				}
 			}
 			sheetObj.SetColProperty('aply_ut_cd', {ComboText:tmpNm, ComboCode:tmpVal} );
		}
	}
}

function onlyNumberCheckModified(obj) {
    var keyValue=obj.value;
    obj.value = obj.value.replace(/\D/g, '');
    numberCommaLen(obj,5,0);
}



//#4020 (JAPT) invoice Ex.date, rate validation, amount  추가
var chngVal = 0;
function sheet1_OnEditValidation(sheetObj, row, col,val) {
	if(chngVal == 0) {
		if(sheetObj.GetCellValue(row,sheetObj.ColSaveName(col)) != val){
			
			
			//Exchange rate 변경 시			
			if(sheetObj.ColSaveName(col)=="inv_xcrt"){
				chngVal = 1;
				var inv_ecrt_val = val;
				var rat_curr_cd_val = sheetObj.GetCellValue(row, "rat_curr_cd");
				var inv_aply_curr_cd_val = sheetObj.GetCellValue(row, "inv_aply_curr_cd");
				var inv_xcrt_dt_val = sheetObj.GetCellValue(row, "inv_xcrt_dt");
				var cnt = 0;
				
				sheetObj.SetCellValue(row, "inv_xcrt", inv_ecrt_val);
				
				for(var i=2; i<=sheetObj.LastRow();i++){
					//3개 조건 만족하는 row의 Exchange Rate 정보 같이 변경
					//1. rate Currency(from currency)
					//2. Curr (To Currency)
					//3. Exchange Date
					if(rat_curr_cd_val == sheetObj.GetCellValue(i, "rat_curr_cd") 
							&& inv_aply_curr_cd_val==sheetObj.GetCellValue(i, "inv_aply_curr_cd")
							&& inv_xcrt_dt_val == sheetObj.GetCellValue(i, "inv_xcrt_dt")) {
						cnt ++;
						//변경된 row는 counting 되므로 기본이 1로 세팅이기 때문에 cnt>1조건이다.
						if(cnt>1){
							break;
						}
					}
				}
				
				//변경된 row는 counting 되므로 기본이 1로 세팅이기 때문에 cnt>1조건이다.
				if(cnt>1){
					if(confirm(getLabel('FMS_COM_ALT156'))){
						for(var i=2; i<=sheetObj.LastRow();i++){
							//3개 조건 만족하는 row의 Exchange Rate 정보 같이 변경
							//1. rate Currency(from currency)
							//2. Curr (To Currency)
							//3. Exchange Date
							if(rat_curr_cd_val == sheetObj.GetCellValue(i, "rat_curr_cd") 
									&& inv_aply_curr_cd_val==sheetObj.GetCellValue(i, "inv_aply_curr_cd")
									&& inv_xcrt_dt_val == sheetObj.GetCellValue(i, "inv_xcrt_dt")) {
								sheetObj.SetCellValue(i, "inv_xcrt", inv_ecrt_val);
							}
						}			
					}
				}
			}
			
			//Exchange Date가 변경되었을 경우,				
			if(sheetObj.ColSaveName(col)=="inv_xcrt_dt"){
				
				//Date항목 클릭한 하고 focus out할 경우 validation 제외 처리
				if(val.search("-") != -1) {
					var chngDate = val.replace(/-/g,"");
					var mYear = chngDate.substr(4,4);
					var mMonth = chngDate.substr(0,2);
					var mDay = chngDate.substr(2,2);
					chngDate = mYear+mMonth+mDay;
				} else{
					chngDate = val;
				}
				
				
			
				if(sheetObj.GetCellValue(row,"inv_xcrt_dt") !=chngDate){
					chngVal = 1;
					setExRate(row, val);
					
					var inv_xcrt_dt_val = val;
					var inv_ecrt_val = sheetObj.GetCellValue(row, "inv_xcrt");
					var rat_curr_cd_val = sheetObj.GetCellValue(row, "rat_curr_cd");
					var inv_aply_curr_cd_val = sheetObj.GetCellValue(row, "inv_aply_curr_cd");
					var cnt = 0;
					
					
					sheetObj.SetCellValue(row, "inv_xcrt_dt", val);
					//sheetObj.SetCellValue(row, "inv_xcrt", inv_ecrt_val);
					
					
					for(var i=2; i<=sheetObj.LastRow();i++){
						//2개 조건 만족하는 row의 Exchange Rate 정보 같이 변경
						//1. rate Currency(from currency)
						//2. Curr (To Currency)							
						if(rat_curr_cd_val == sheetObj.GetCellValue(i, "rat_curr_cd") 
								&& inv_aply_curr_cd_val==sheetObj.GetCellValue(i, "inv_aply_curr_cd")) {
							cnt++;
							//변경된 row는 counting 되므로 기본이 1로 세팅이기 때문에 cnt>1조건이다.
							if(cnt>1){
								break;
							}
						}
					}			
					
					//변경된 row는 counting 되므로 기본이 1로 세팅이기 때문에 cnt>1조건이다.
					if(cnt>1){
						if(confirm(getLabel('FMS_COM_ALT154'))){
							for(var i=2; i<=sheetObj.LastRow();i++){
								//2개 조건 만족하는 row의 Exchange Rate 정보 같이 변경
								//1. rate Currency(from currency)
								//2. Curr (To Currency)							
								if(rat_curr_cd_val == sheetObj.GetCellValue(i, "rat_curr_cd") 
										&& inv_aply_curr_cd_val==sheetObj.GetCellValue(i, "inv_aply_curr_cd")) {
									sheetObj.SetCellValue(i, "inv_xcrt_dt", val);
									//sheetObj.SetCellValue(i, "inv_xcrt", inv_ecrt_val);
								}
							}			
						}	
					}
				}
			}
			
		}
	}
	chngVal = 0;
	return;
}

function setVnCalRound(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined )
		vnCalRound=doc[1];
}



//[#5954] [Binex-TOR] Mixed up Currency load on Invoice Entry by search problem
function getChkMulCur(){
	var formObj=document.frm1;
	var f_oth_seq     = formObj.f_oth_seq.value;
	var f_intg_bl_seq = formObj.f_intg_bl_seq.value;
	var chk_fr_trdp_cd       = formObj.chk_fr_trdp_cd.value || '';
	var chk_fr_inv_curr_cd   = formObj.chk_fr_inv_curr_cd.value || '';
	var chk_fr_frt_seq   	 = formObj.chk_fr_frt_seq.value || '';
	ajaxSendPost(chkMulCur, "reqVal", "&goWhere=aj&bcKey=checkMultilCurrCrDb&f_intg_bl_seq="+f_intg_bl_seq+"&f_oth_seq="+f_oth_seq+ "&chk_fr_trdp_cd=" + chk_fr_trdp_cd + "&chk_fr_inv_curr_cd=" +chk_fr_inv_curr_cd +"&chk_fr_frt_seq="+chk_fr_frt_seq ,"./GateServlet.gsl");
}
//[#5954] [Binex-TOR] Mixed up Currency load on Invoice Entry by search problem
var keyChkMulCur ='';
function chkMulCur(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if (doc[1] == "N") {
		 alert(getLabel('ACC_MSG171'));
		 keyChkMulCur ="N";
		}else{
			 keyChkMulCur ="Y";
		}
	}	
}

function goSearchInv() {
	doWork("SEARCHLIST");
}

//#6282 [JAPT] Debit/Credit screen enhancement point
function setUseOfficeBLCurrency(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK' && doc[1]!='undefined' && doc[1]!=undefined){
		USE_OFC_BL_CURR_FLG = doc[1] =='Y' ? true : false;
	}
}
//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
function setOverAmtCurrFlg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		TP_OVER_AMT_FLG = doc[1];
	}else{
		TP_OVER_AMT_FLG = "";
	}
}
//OFVFOUR-8099 [BEST OCEAN] REMOVING PRINT BUTTON WHEN THERE IS PRINT/L IN THE SAME SCREEN
function setVisiblePrintButton(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined && doc[1]=="Y") {
		visiblePrint = true;
	}
}
//OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails
var rpt_file_name_flg = false;
function setFileNameflag(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]=="Y" && doc[1]!=undefined ) {
		rpt_file_name_flg = true;
	}
}