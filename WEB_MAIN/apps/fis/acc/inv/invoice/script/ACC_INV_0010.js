﻿var SELECTROW;
var SLIP_POST_DT="";
var ORG_BLOCK_POST_DT=""; //MAX(BLOCK_DT)
var BLOCK_POST_DT="";    // MAX(BLOCK_DT)+1
var bPaid=false;	//[20130401 OJG]
var isSheetValChanged=false;
var isInputFormValChanged=false;
var isInvModiTmsOk=false;
var isFrtModiTmsOk=false;
var rtnary=new Array(1);
var callBackFunc = "";
//LKH::2015-11-03 WMS4.O
var gJsWmsVer = "";
var onKeyDownFlg = true;
var blck_ar_inv_add;
var creditOver = false;
var tax_flg = false;
//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
var GL_VIEW_FALG = "N";
//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
var XCRT_APP_FLAG = "N";
//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
var gJsWmsRuPoint = "N";
var vnVatCalRound = "Y";
//#6376 [KING FREIGHT NY] Add a warning message (Zendesk #2334)
var custCd = "";
//#4193 [JAPT] Invoice print option on AR ENtry screen.
var AR_INVOICE_OPTION_USE = "N";
var org_bill_to_cd = "";
//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
var TP_OVER_AMT_FLG = "";
//OFVFOUR-8099 [BEST OCEAN] REMOVING PRINT BUTTON WHEN THERE IS PRINT/L IN THE SAME SCREEN
var visiblePrint = false;

function wmsDocCheck(flag){
	var formObj = document.frm1;
	var wmsChk = "NotWMSDOC";
	if(formObj.f_wms_seq.value != ""){
		wmsChk = "WMSDOC";

		//#2135 [BINEX] BLOCKED INVOICE REVISED WITHOUT AUTHORITY
		wmsObjectControl(wmsChk,flag);
	}
}
function wmsObjectControl(docType, flag){
	var formObj = document.frm1;
	var sheetObj=docObjects[0];
	var objDisable = false;
	var objIsWrite = true;
	if (docType == 'WMSDOC'){
		var objDisable = true;
		var objIsWrite = false;
	}else{
		var objDisable = false;
		var objIsWrite = true;
	}

	if (flag == 'ALL' || flag == 'HEAD'){
		formObj.f_bill_to_cd.disabled = objDisable;
		formObj.f_bill_to_nm.disabled = objDisable;
		$("#billto").prop('disabled', objDisable);
		$("#rowAddBtn2").prop('disabled', objDisable);
		$("#rowAddBtn1").prop('disabled', objDisable);
		formObj.f_curr_cd.disabled = objDisable;

		$("#btn_etc").prop('disabled', objDisable); //Container Information id="btn_etc" 추가해줌
		$("#btn_mark").prop('disabled', objDisable); // Mark Info. id = "btn_mark" - Thoa Dien 20190920 #1489
	}
	if (flag == 'ALL' || flag == 'GRID'){
	    //GRID 전체 수정 불가 0
	    //sheetObj.SetEditable(0);
	    for(var j=2;j<=sheetObj.LastRow();j++){
	    	toCellEdit(sheetObj, objIsWrite, j, 0, sheetObj.LastCol());
	    }
	}
}
function toCellEdit(sheetObj, isWrite, curRow, stratCol, totCol){
	for(var i=stratCol; i < totCol; i++){
		//#4020 (JAPT) invoice Ex.date, rate validation, amount  추가
		if(sheetObj.ColSaveName(i) != 'trf_cur_sum_amt'){
			sheetObj.SetCellEditable(curRow, i,isWrite);
			
		}
	}
}
function doWork(srcName){

	// #1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
	setSaveConfirmMsg(srcName);
	// OFVFOUR-8099 [BEST OCEAN] REMOVING PRINT BUTTON WHEN THERE IS PRINT/L IN THE SAME SCREEN
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
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		    formObj.f_cmd.value=-1;
	        //formObj.submit();
		    submitForm(-1);
	   break;
	   case "SEARCH":
			var frmObject=document.frm1;
			//WMS ACCOUNT LKH 2015.01.20
			if (frmObject.s_bl_no.value  != '') {
				enterBlCmmInfo('Y');
			} else if (frmObject.s_ref_no.value != '') {
				enterRefInfo('Y');
			} else if (frmObject.s_oth_no.value != '') {
				enterOtherInfo('Y');
			} else if (frmObject.s_wms_no.value != '') {
				enterWarehouseInfo('Y');
			} else if (frmObject.s_inv_no.value != '') {
				enterInvInfo('Y');
			}

		   break;
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;

            //LKH::2015-11-03 WMS4.O
            /*
            var params = FormQueryString(formObj);

            if(isWMS()){
            	var pFrt_seq = "";

                var strFrt_seq = formObj.f_frt_seq.value;

                var arrFrt_seq = strFrt_seq.split('|');

                if(arrFrt_seq.length > 0){
                	for(var i = 0 ; i < arrFrt_seq.length; i++){
                		pFrt_seq += "&frt_seq=" + arrFrt_seq[i];
                	}
                }

                params += pFrt_seq;
            }
            */

			//#3159 [CLT] AWB - A/R Invoice Entry Unit 항목 중복 표시
			getUnitCd();

            //검증로직
            	if (formObj.f_inv_seq.value == "") {
            		if (MULTI_CURR_FLAG != "Y") {
            			getChkMulCur();
						if (keyChkMulCur == "Y") {
							docObjects[0].DoSearch("./ACC_INV_0010GS.clt", FormQueryString(formObj));
						}
					}else{docObjects[0].DoSearch("./ACC_INV_0010GS.clt", FormQueryString(formObj));}
				}else{
					docObjects[0].DoSearch("./ACC_INV_0010GS.clt", FormQueryString(formObj));
				}
					
            //docObjects[0].DoSearch("./ACC_INV_0010GS.clt",params);

       break;
       //#6707 [BNX] Adding Deposit button to A/R Entry Screen & Payment button to A/P Entry screen. Author: Thuong Huynh 2020/11/20
       case "DEPOSIT":	//DEPOSIT 대상 화면호출
    	   if(frm1.f_inv_seq.value==''){
				alert(getLabel('FMS_COM_ALT029'));
				return;
			}
       	var paramStr="./ACC_JOR_0010.clt?f_cmd=-1&s_inv_no="+formObj.f_inv_no.value+"&s_cust_cd="+org_bill_to_cd+"&s_inv_tp="+"A/R";
           parent.mkNewFrame('Deposit Entry', paramStr);
       break;
       case "ROWADD":
    	    if(!rowaddChkVal()){
				return;
			}
    	    if(sheetObj.GetCellValue(sheetObj.LastRow(), "frt_term_cd") == ""){
    	    	sheetObj.RemoveAll();
    	    }
			var intRows=sheetObj.LastRow()+1;
			tempRow = intRows;
            sheetObj.DataInsert(intRows);
            //WMS ACCOUNT LKH 2015.01.20
            if(formObj.f_intg_bl_seq.value != ""){
            	sheetObj.SetCellValue(intRows, "intg_bl_seq",formObj.f_intg_bl_seq.value);
            }else if(formObj.f_oth_seq.value != ""){
            	sheetObj.SetCellValue(intRows, "oth_seq",formObj.f_oth_seq.value);
            }else if(formObj.f_wms_seq.value != ""){
            	sheetObj.SetCellValue(intRows, "wms_seq",formObj.f_wms_seq.value);
            }
            // 서울 요청사항 수출 Prepaid 수입 Collect
            if(formObj.f_bnd_clss_cd.value == "O"){
            	sheetObj.SetCellValue(intRows, "frt_term_cd","PP");
            }else if(formObj.f_bnd_clss_cd.value == "I"){
            	sheetObj.SetCellValue(intRows, "frt_term_cd","CC");
            }
            sheetObj.SetCellEditable(intRows, "frt_check",1);
        	sheetObj.SetCellValue(intRows, "frt_check","1");

        	//#2557 [LBS]AR Entry / A/P Entry / D/C Entry 의 환율 Validation 추가
        	//invoice 생성시 Invoice Date && Currency 값 없을시 inv_xcrt 누락(0) 수정
        	//inv_xcrt 0 벨리데이션으로 처리
        	//sheetObj.SetCellValue(intRows, "inv_xcrt",1);

        	if (intRows > 2) {
        		// 기존에 등록된 데이터가 있는경우
				sheetObj.SetCellValue(intRows, "rat_curr_cd",sheetObj.GetCellValue(intRows-1, "rat_curr_cd"),0);
				sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",sheetObj.GetCellValue(intRows-1, "inv_aply_curr_cd"),0);
				//sheetObj.SetCellValue(intRows, "inv_xcrt",sheetObj.GetCellValue(intRows-1, "inv_xcrt"));
        	} else {

        		//#138 Office Local Currency 로 변경
        		// 신규로 등록하는 경우
            	sheetObj.SetCellValue(intRows, "rat_curr_cd",formObj.f_curr_cd.value,0);
            	sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",formObj.f_curr_cd.value,0);
            	//sheetObj.SetCellValue(intRows, "inv_xcrt",1);
        	}

        	sheetObj.SetCellValue(intRows, "inv_xcrt_dt",formObj.f_inv_dt.value);

        	/*if(MULTI_CURR_FLAG == "Y" &&  document.frm1.f_hbl_no.value != ""){
        		ajaxSendPost(getDefaultDate, 'reqVal', '&goWhere=aj&bcKey=getDefaultDate&f_intg_bl_seq='+frm1.f_intg_bl_seq.value, './GateServlet.gsl');
        	}*/

        	sheetObj.SetCellValue(intRows, "qty",'1');
        	sheetObj.SetCellValue(intRows, "trdp_cd",formObj.f_bill_to_cd.value);
    	    sheetObj.SetCellValue(intRows, "trdp_nm",formObj.f_bill_to_nm.value);
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

			//#2557 [LBS]AR Entry / A/P Entry / D/C Entry 의 환율 Validation 추가  
			//vat 계산전에  inv_xcrt 필수항목체크
//            if(!checkVal()){
//            	return;
//            }
            
			//#3411 [JTC]Accounting & Performance 수정사항
			//AUTO_VAT_CALCULATING_AR 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
			if(AUTO_VAT_CALCULATING_AR == "Y") {
				doWork("VAT_CAL");
			}

    	   //데이터 조회 후 생성하지 않았을 경우 경고 메세지
    	   //WMS ACCOUNT LKH 2015.01.20
    	   if(formObj.f_intg_bl_seq.value == "" && formObj.f_oth_seq.value == "" && formObj.f_wms_seq.value == ""){
       		   alert(getLabel('FMS_COM_ALT029'));
       		   return;
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
       	   //OFVFOUR-7986: [AIF] OPUS Error question - Inv no :AWI9200
		   	if(formObj.f_intg_bl_seq.value != "" && formObj.f_inv_seq.value == ""){
				var chk_fr_frt_seq=formObj.chk_fr_frt_seq.value;
				ajaxSendPost(checkFrtModiTms, 'reqVal', '&goWhere=aj&bcKey=searchFrtModiTms&frt_seq='+chk_fr_frt_seq, './GateServlet.gsl');
				if(isFrtModiTmsOk) {
					alert(getLabel('ACC_MSG128'));
					return;
				}
			}
       	   // bl_frt_yn=="Y"이면
       	   // bl_modi_tms를 조회한 값과 다시 비교
       	   // 바꼈으면 alert

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
    		   //OFVFOUR-7456: [LINKWIDE INT'L] SAVING MISC. OPERATION A/R INVOICE AND DELETING A/R INVOICE ISSUE
    		   if(!checkVal()){
               		return;
               }
    		   doWork("DELETE");
    	   }else{
    		   frm1.f_cmd.value=MODIFY;
        	  // frt 에 저장되는 post_dt의 값을 분리해야한다(#20443)
        	  // formObj.f_edit_post_dt.value = formObj.f_post_dt.value;
    		   //TODO  아무 권한이 없을때 POST_DT를 넣어야 하는지 BLOCK_DT를 넣어야 하는지에 따라 이하의 값 설정 필요
       		   //formObj.f_edit_post_dt.value = formObj.f_post_dt.value;
       		   formObj.f_edit_post_dt.value=addDay(formObj.block_post.value, 1);
        	   // Deposit/Payment 이후 수정시 Amout금액 체크
        	   if (isSheetValChanged) {
        		   //LHK 20140327, amount due 가 - 인 경우 비교로직 추가.
   				   var amtDue=parseFloat(eval((formObj.f_amt_due.value).replaceAll(",","")));
        		   var totAmt=parseFloat(eval((formObj.f_totamt_tot.value).replaceAll(",","")));
        		   var paidAmt=parseFloat(eval((formObj.f_paid_amt.value).replaceAll(",","")));
        		   var amtComFlg=false;
         		   if (paidAmt != 0){
    	    		   if(amtDue < 0){
    	    			   if (Math.abs(totAmt) < Math.abs(paidAmt)) {
    	    				   amtComFlg=true;
    	    			   }
    	  			   }else{
    	  				   if (totAmt < paidAmt) {
    	  					   amtComFlg=true;
    	  				   }
    	  			   }
    			   }
        		   if (amtComFlg) {
        			   alert(getLabel('ACC_MSG118'));
        			   return;
        		   }
        		   // AR은 Row Add 하지 않기때문에 POST_DATE로 설정
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
    		   //#6376 [KING FREIGHT NY] Add a warning message (Zendesk #2334)
    		   var intg_bl_seq = formObj.f_intg_bl_seq.value;
    		   if(formObj.f_air_sea_clss_cd.value == "S" && formObj.f_biz_clss_cd.value == "H" && formObj.f_bnd_clss_cd.value == "I" ){
    			   getChkBillTo(intg_bl_seq);
        		   if(custCd != formObj.f_bill_to_cd.value){
        			   alert(getLabel('COM_WHR_CFM006'));
        			   formObj.f_bill_to_cd.focus();
        		   }
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
                	   // TODO: 0인 금액 저장할지 여부 체크
            		   //------------[20140112 OJG] 총 금액이 0일 경우에는 0 Check 타지 않음 -------------------
            		   // #4884 [CLA Test] Can save 0 Amount Invoice - should not be able to : 다시 주석처리함.
            		   //if(eval(removeComma(formObj.f_totamt_tot.value)) != 0){
            			   isZeroAmt();
            		   //}
            		   //------------[20140112 OJG]-------------------------------------------------
                	   formObj.f_amt_tot.value=removeComma(formObj.f_amt_tot.value);
    	           	   formObj.f_vatamt_tot.value=removeComma(formObj.f_vatamt_tot.value);
    	           	   formObj.f_totamt_tot.value=removeComma(formObj.f_totamt_tot.value);
    	           	   formObj.f_paid_amt.value=removeComma(formObj.f_paid_amt.value);
    	           	   if(formObj.f_tax_bill.checked){
    	           		   formObj.f_tax_bill.value="Y";
    	           	   }
    	           	   
    	           	   //#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영 
    	           	   if(GL_VIEW_FALG == "Y"){
    	           		   if(!setExRateLocl()){
    	           			   return;
    	           		   }
    	           	   }
    	           	   
    	           	   
    	           	   //#1800 [PATENT] A/R Invoice Split Function
    	           	   if (formObj.chk_split.value=="Y"){
    	            	   for(var i=2; i<=sheetObj.LastRow(); i++){
    	            		   sheetObj.SetCellValue(i,"ibflag","I");
    	            	   }
    	           	   }
    	           	
    	           	   //#4022 [JAPT] Invoice Currency 가 JPY 인 경우 Local Ex.Rate 정보가 잘못 처리되어 저장된 BUG
    	           	   //Great Luck testing 0402 - #5 
    	           	   if(GL_VIEW_FALG=='Y'){
	    	           	   if(formObj.f_ofc_locl_curr_cd.value == formObj.f_curr_cd.value && formObj.f_loc_ex_rate.value != 1){
	    	           		   alert(getLabel('FMS_COM_ALT149'));
	    	           		   formObj.f_loc_ex_rate.value = 1;
	    	           		   
	    	           	   }
    	           	   }
    	           	   var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
    	           	   var intRows2 = sheetObj2.LastRow()+1;
	    	           sheetObj2.DataInsert(intRows2);
	    	           sheetObj.DoAllSave("./ACC_INV_0010GS.clt", FormQueryString(formObj)+'&'+sht2, true);
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
            	   sheetObj.DoSave("ACC_INV_0010GS.clt", FormQueryString(formObj), "ibflag", true);
            	   //화면초기화
            	   clearAll();
               }
    	   }
       break;

       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	    rtnary=new Array(1);
    	    rtnary[0]="";
//    	    rtnary[1]=formObj.f_bill_to_nm.value;
//    	    rtnary[2]=window;
    	    /*
    	     CallBack Function
    	     */
    	    callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");

     	break;

       case "CUSTOMER_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
   	    rtnary=new Array(1);
   	    rtnary[0]="";
   	    rtnary[1]=formObj.f_bill_to_nm.value;
   	    rtnary[2]=window;
   	    /*
   	     CallBack Function
   	     */
   	    callBackFunc = "CUSTOMER_POPLIST";
 	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");

    	break;
        case "CUSTOMER_POPLIST2"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.f_ship_to_nm.value;
	   		rtnary[2]=window;
    	    callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	break;
    	//이것도 어디 호출하는거 없는거 같음.
        case "INV_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
        	rtnary=new Array(1);
			rtnary[0]="S";
			var rtnVal=window.showModalDialog('./CMM_POP_0240.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
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
				alert(getLabel('FMS_COM_ALT029'));
				return;
			}
        	//WMS ACCOUNT LKH 2015.01.20
			if(formObj.f_oth_seq.value != "" ){
        		/*if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA" || formObj.f_bl_cnt_cd.value == "DE"){
        			formObj.file_name.value='invoice_06.mrd';
            	}else if(formObj.f_bl_cnt_cd.value == "IT"){
            		formObj.file_name.value='invoice_09.mrd';
            	}else if(formObj.f_bl_cnt_cd.value == "JP"){
            		formObj.file_name.value='invoice_08_jp.mrd';
            	}else{
            		if(formObj.f_ref_ofc_cd.value == "SEL"){
            			formObj.file_name.value='invoice_08_kr.mrd';
            		}else{
            			formObj.file_name.value='invoice_08.mrd';
            		}
            	}*/
				formObj.file_name.value='invoice_06.mrd';
        	}else if( formObj.f_wms_seq.value != ""){
				//[Great Luck] Other Filling AR Invoice - WMS와 Other MRD 분리 처리
        		formObj.file_name.value='invoice_06_WMS.mrd';
        	}else{
        		/*if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA" || formObj.f_bl_cnt_cd.value == "DE"){
        			// office logo
        			var logo1=formObj.logo1.value;
        			//alert("AAA-:"+logo1);
        			if(logo1.length > 0)
        			{
        				formObj.file_name.value='invoice_01.mrd';
        			}else{
        				formObj.file_name.value='invoice_01.mrd';
        			}
            	}else if(formObj.f_bl_cnt_cd.value == "IT"){
            		formObj.file_name.value='invoice_04.mrd';
            	}else if(formObj.f_bl_cnt_cd.value == "JP"){
            		formObj.file_name.value='invoice_03_jp.mrd';
            	}else{
            		if(formObj.f_ref_ofc_cd.value == "SEL"){
            			formObj.file_name.value='invoice_03_kr.mrd';
            		}else{
            			formObj.file_name.value='invoice_03.mrd';
            		}
            	}*/
        		formObj.file_name.value='invoice_01.mrd';
        	}
        	formObj.title.value='INVOICE';
			//Parameter Setting
        	var param='[' + formObj.f_email.value + ']';				// USER EMAIL';	[1]
        	param += "[" + "'" + formObj.f_inv_seq.value + "'" + ']';	// [2]
			param += '[]';												// [3]
			param += '[]';												// [4]
			param += '[]';												// [5]
			param += '[]';												// [6]
			//param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';		// CURR BRANCH
			param += '[' + formObj.f_bill_to_cd.value + ']';			// BILL_TO [7]
			param += '[' + formObj.f_ref_ofc_cd.value + ']';			// REF_OFC_CD  [8]
			param += '[' + formObj.f_bl_cnt_cd.value + ']';				// CNT_CD  [9]
			param += '[' + formObj.f_usr_nm.value + ']';				// USER_NM [10]
			param += '[' + formObj.f_usrPhn.value + ']';				// 11
			param += '[' + formObj.f_usrFax.value + ']';				// 12
			param += '[' + formObj.f_usrId.value + ']';					// 13
			param += '[' + formObj.main_trdp.value + ']';				// 14
			param += '[' + formObj.f_hbl_no.value + ']';				// 15
			
			//#4193 [JAPT] Invoice print option on AR ENtry screen. - #3375 참고 
			param += '[]'; //16
			var locUrl = location.href;
			var strArr = locUrl.split('/');
			locUrl = 'http://'+strArr[2];
			param += '[' + locUrl + ']';		//16  URL   => 17 번째는 팝업화면에서 선택..			
			//console.log(param);
			
			formObj.rd_param.value=param;
			// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
			if (formObj.chkMailAr.value === 'Y') {
				if (formObj.f_hbl_no.value == '') {
					formObj.mailTitle.value = "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]";
				} else {
					formObj.mailTitle.value= "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]" + ' [HBL No: ' + formObj.f_hbl_no.value + ']';
				}
			} else {
				formObj.mailTitle.value = "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]";
			}

     		var trdp_cd='';
     		trdp_cd += '(' + '\'' + formObj.f_bill_to_cd.value + '\'' + ')';
     		ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
     		formObj.mailTo.value=mailTo;
			formObj.rpt_biz_tp.value="ACCT";
			formObj.rpt_biz_sub_tp.value="AR";
			formObj.rpt_trdp_cd.value=formObj.f_bill_to_cd.value;
			formObj.rpt_pdf_file_nm.value=getPdfFileNm();
			//OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails
			if(rpt_file_name_flg){
				formObj.attachFileName.value = getPdfFileNm();
			}

			//#4193 [JAPT] Invoice print option on AR ENtry screen. - #3375 참고
			// OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List
			if(AR_INVOICE_OPTION_USE[0] == "Y") {
				var sUrl = 'ACC_INV_0041.clt?rpt_param=';
				param = param.replaceAll('[', '');
				param = param.replaceAll(']', '|');
				sUrl += param;
				sUrl += "&rpt_pdf_file_nm=" + formObj.rpt_pdf_file_nm.value;
				sUrl += "&inv_no=" + formObj.f_inv_no.value;
				sUrl += "&rpt_biz_tp=" + formObj.rpt_biz_tp.value;
				sUrl += "&rpt_biz_sub_tp=" + formObj.rpt_biz_sub_tp.value;
				sUrl += "&rpt_trdp_cd=" + formObj.rpt_trdp_cd.value;
				sUrl += "&file_name=" + formObj.file_name.value;
				sUrl += "&title=" + formObj.title.value;
				//6301 [JAPT] Mail sending function related request
				sUrl += "&bkg_no=" + formObj.f_lnr_bkg_no.value;
				sUrl += "&ves=" + formObj.f_vsl_flt.value;
				sUrl += "&voy=" + frm1.trnk_voy.value;
				var etdDtTm = '';
				if(formObj.f_etd_dt.value != ""){
					etdDtTm = formObj.f_etd_dt.value.substring(6,10) + "." + formObj.f_etd_dt.value.substring(0,2) + "." + formObj.f_etd_dt.value.substring(3,5);
				}
				sUrl += "&etd=" + etdDtTm;
				sUrl += "&hbl_no=" + formObj.f_hbl_no.value;
				// OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List
				if(AR_INVOICE_OPTION_USE[1] == "M"){
					sUrl += "&ar_invoice_option_use=M";
				}
				// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
				sUrl += "&chkMailAr=" + formObj.chkMailAr.value;
				//OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails
				sUrl += "&attachFileName=" + formObj.attachFileName.value;
				sUrl += "&rpt_file_name_flg=" + (rpt_file_name_flg? "Y" : "N");
				modal_center_open(sUrl, "callBackFunc", 380, 150, "yes");
			} else{
				popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}
			
		break;
		case "PROFIT_REPORT":
	   	 	if(formObj.f_intg_bl_seq.value != ""){			//BL Operation
	   	 		var reqParam='?intg_bl_seq=' + formObj.m_intg_bl_seq.value;
				reqParam += '&mbl_no=' + formObj.f_mbl_no.value;
				reqParam += '&ref_no=' + formObj.f_ref_no.value;
				reqParam += '&air_sea_clss_cd=' + formObj.f_air_sea_clss_cd.value;
				reqParam += '&bnd_clss_cd=' + formObj.f_bnd_clss_cd.value;
				reqParam += '&biz_clss_cd=' + "M";
				popGET('RPT_PRN_0180.clt'+reqParam, '', 1270, 750, "scroll:yes;status:no;help:no;");
			//WMS ACCOUNT LKH 2015.01.20
	   	 	}else if(formObj.f_wms_seq.value != ""){
			   	var reqParam='?oth_seq=' + formObj.f_wms_seq.value;
					reqParam += '&ref_no=' + formObj.f_ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "W";
					reqParam += '&bnd_clss_cd=' + "N";
					reqParam += '&biz_clss_cd=' + "";
				popGET('RPT_PRN_0210.clt'+reqParam, '', 630, 400, "scroll:yes;status:no;help:no;");
	   	 	}else if(formObj.f_oth_seq.value != ""){		//Other Operation
	   	 		var reqParam='?oth_seq=' + formObj.f_oth_seq.value;
					reqParam += '&ref_no=' + formObj.f_ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "O";
					reqParam += '&bnd_clss_cd=' + "N";
					reqParam += '&biz_clss_cd=' + "";
				popGET('RPT_PRN_0210.clt'+reqParam, '', 630, 400, "scroll:yes;status:no;help:no;");
	   	 	}else{
	   	 		alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_REFN'));
	   	 		return;
	   	 	}
	   	break;
	   	//#2016 [BNX] INDIA - TALLY REPORT (CUSTOMIZED REPORT)
		case "VAT_CAL":
		    var intRows = -1;
		    var frtVatRt = 0;
		    var frtVatRt1 = 0;
		    var frtVatRt2 = 0;
		    var frtWhldVatRt = 0;

		    //#1165 : [Sales Mexico/Germany] VAT Calculation is not working
		    if(ARR_VAT_FRT_CD == null || ARR_VAT_FRT_CD.length == 0) {
		    	alert(getLabel('ACC_MSG166'));
		    }
		    // VAT코드별로 계산 - #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
		    // tax_mgmt_use에 상관없이 기존 VAT코드는 모두 삭제 되어야 함
		    //if (tax_mgmt_use == "Y"){
		    	if (ARR_VAT_FRT_CD != null) {
			    	for (var ii = 0 ; ii < ARR_VAT_FRT_CD.length ; ii++ ) {
				    	for(var i=sheetObj.LastRow(); i>=2; i--){
				    		// VAT Clear
				    		if(ARR_VAT_FRT_CD[ii] != "" && ARR_VAT_FRT_CD[ii] == sheetObj.GetCellValue(i, "frt_cd")){
				    			sheetObj.SetRowHidden(i, 1);
				    			//OFVFOUR-7823: [AIF] AMOUNT MISMATCH BETWEEN AMOUNT DUE AND TOTAL AMOUNT IN A/R ENTRY
				    			sheetObj.SetCellValue(i, "frt_check", "0");
				    			sheetObj.SetCellValue(i, "del_chk", "1");
				    			//[JAPT] BL-FREIGHT 에서 VAT항목 유저가 입력 후 Invoice 생성할 경우, VAT 로직 버그
				    			
				    		}
				    	}
			    	}
		    	}

		    	for(var i=sheetObj.LastRow(); i>=2; i--){
		    		// WHLD VAT Clear
		    		if(WHLD_VAT_FRT_CD != "" && WHLD_VAT_FRT_CD == sheetObj.GetCellValue(i, "frt_cd")){
		    			//OFVFOUR-7823: [AIF] AMOUNT MISMATCH BETWEEN AMOUNT DUE AND TOTAL AMOUNT IN A/R ENTRY
		    			sheetObj.SetCellValue(i, "frt_check", "0");
		    			sheetObj.SetRowHidden(i, 1);
		    			sheetObj.SetCellValue(i, "del_chk", "1");
		    		}
		    	}
		    //}
		    /*else {
		    	for(var i=sheetObj.LastRow(); i>=2; i--){
		    		// VAT Clear
		    		if(VAT_FRT_CD != "" && VAT_FRT_CD == sheetObj.GetCellValue(i, "frt_cd")){
		    			sheetObj.SetRowHidden(i, 1);
		    			sheetObj.SetCellValue(i, "del_chk", "1");
		    		}
		    		// WHLD VAT Clear
		    		if(WHLD_VAT_FRT_CD != "" && WHLD_VAT_FRT_CD == sheetObj.GetCellValue(i, "frt_cd")){
		    			sheetObj.SetRowHidden(i, 1);
		    			sheetObj.SetCellValue(i, "del_chk", "1");
		    		}
		    	}
		    }*/


		    var vatCurCdArr = "";
		    var vatCurRowArr = "";
		    var whldVatCurCdArr = "";
		    var whldVatCurRowArr = "";

		    // VAT코드별로 계산 - #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
		    if (tax_mgmt_use == "Y"){
			    for(var i=2; i<=sheetObj.LastRow();i++){
			    	var currCurCd = sheetObj.GetCellValue(i, "rat_curr_cd");
			    	var vatRtCd = sheetObj.GetCellValue(i, "vat_rt_cd");
			    	var vatRtCd1 = sheetObj.GetCellValue(i, "vat_rt_cd1");
			    	var vatRtCd2 = sheetObj.GetCellValue(i, "vat_rt_cd2");

			    	var vatRtCdFlg = true;
			    	var vatRtCdFlg1 = true;
			    	var vatRtCdFlg2 = true;

			    	if(sheetObj.GetCellValue(i, "vat_rt_cd") == ""){
			    		vatRtCdFlg = false;
			    	}

			    	if(sheetObj.GetCellValue(i, "vat_rt_cd1") == ""){
			    		vatRtCdFlg1 = false;
			    	}

			    	if(sheetObj.GetCellValue(i, "vat_rt_cd2") == ""){
			    		vatRtCdFlg2 = false;
			    	}

			    	frtVatRt = sheetObj.GetCellValue(i, "vat_rt") ==null ? 0 : sheetObj.GetCellValue(i, "vat_rt");
//			    	if(frtVatRt > 0 && sheetObj.GetCellValue(i, "frt_check") ){
			    	if(vatRtCdFlg && sheetObj.GetCellValue(i, "frt_check") ){
			    		if(vatCurCdArr.indexOf(currCurCd + "&&" + vatRtCd + "," ) == -1){
			    			vatCurCdArr += sheetObj.GetCellValue(i, "rat_curr_cd") + "&&" + vatRtCd + ",";
				    		vatCurRowArr += i + ",";
			    		}
			    	}

			    	if(vatRtCdFlg1 && sheetObj.GetCellValue(i, "frt_check") ){
			    		if(vatCurCdArr.indexOf(currCurCd + "&&" + vatRtCd1 + "," ) == -1){
			    			vatCurCdArr += sheetObj.GetCellValue(i, "rat_curr_cd") + "&&" + vatRtCd1 + ",";
				    		vatCurRowArr += i + ",";
			    		}
			    	}

			    	if(vatRtCdFlg2 && sheetObj.GetCellValue(i, "frt_check") ){
			    		if(vatCurCdArr.indexOf(currCurCd + "&&" + vatRtCd2 + "," ) == -1){
			    			vatCurCdArr += sheetObj.GetCellValue(i, "rat_curr_cd") + "&&" + vatRtCd2 + ",";
				    		vatCurRowArr += i + ",";
			    		}
			    	}

			    	frtWhldVatRt = sheetObj.GetCellValue(i, "whld_vat_rt") ==null ? 0 : sheetObj.GetCellValue(i, "whld_vat_rt");
			    	if(frtWhldVatRt < 0 && sheetObj.GetCellValue(i, "frt_check") ){
			    		if(whldVatCurCdArr.indexOf(currCurCd) == -1){
			    			whldVatCurCdArr += sheetObj.GetCellValue(i, "rat_curr_cd") + ",";
				    		whldVatCurRowArr += i + ",";
			    		}
			    	}
			    }
		    } else {
		    	for(var i=2; i<=sheetObj.LastRow();i++){
			    	var currCurCd = sheetObj.GetCellValue(i, "rat_curr_cd");

			    	/*var vatRtCdFlg = true;

			    	if(sheetObj.GetCellValue(i, "vat_rt_cd") == ""){
			    		vatRtCdFlg = false;
			    	}*/

			    	frtVatRt = sheetObj.GetCellValue(i, "vat_rt") ==null ? 0 : sheetObj.GetCellValue(i, "vat_rt");
			    	if(frtVatRt > 0 && sheetObj.GetCellValue(i, "frt_check") ){
//			    	if( vatRtCdFlg && sheetObj.GetCellValue(i, "frt_check") ){
			    		if(vatCurCdArr.indexOf(currCurCd) == -1){
			    			vatCurCdArr += sheetObj.GetCellValue(i, "rat_curr_cd") + ",";
				    		vatCurRowArr += i + ",";
			    		}
			    	}

			    	frtVatRt1 = sheetObj.GetCellValue(i, "vat_rt1") ==null ? 0 : sheetObj.GetCellValue(i, "vat_rt1");
			    	if(frtVatRt1 > 0 && sheetObj.GetCellValue(i, "frt_check") ){
			    		if(vatCurCdArr.indexOf(currCurCd) == -1){
			    			vatCurCdArr += sheetObj.GetCellValue(i, "rat_curr_cd") + ",";
				    		vatCurRowArr += i + ",";
			    		}
			    	}

			    	frtVatRt2 = sheetObj.GetCellValue(i, "vat_rt2") ==null ? 0 : sheetObj.GetCellValue(i, "vat_rt2");
			    	if(frtVatRt2 > 0 && sheetObj.GetCellValue(i, "frt_check") ){
			    		if(vatCurCdArr.indexOf(currCurCd) == -1){
			    			vatCurCdArr += sheetObj.GetCellValue(i, "rat_curr_cd") + ",";
				    		vatCurRowArr += i + ",";
			    		}
			    	}

			    	frtWhldVatRt = sheetObj.GetCellValue(i, "whld_vat_rt") ==null ? 0 : sheetObj.GetCellValue(i, "whld_vat_rt");
			    	if(frtWhldVatRt < 0 && sheetObj.GetCellValue(i, "frt_check") ){
			    		if(whldVatCurCdArr.indexOf(currCurCd) == -1){
			    			whldVatCurCdArr += sheetObj.GetCellValue(i, "rat_curr_cd") + ",";
				    		whldVatCurRowArr += i + ",";
			    		}
			    	}
			    }
		    }

		    var vatCurCd = vatCurCdArr.split(',');
		    var vatCurRow = vatCurRowArr.split(',');
		    var whldVatCurCd = whldVatCurCdArr.split(',');
		    var whldVatCurRow = whldVatCurRowArr.split(',');

		    // UNIT Setting
    		var aplyUtCd = "UNT";
    		if(frm1.f_air_sea_clss_cd.value == "A"){
    			aplyUtCd = "AUN";
    		}

    		// VAT코드별로 계산 - #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
    		if (tax_mgmt_use == "Y"){
	    		for(var i=0; i<vatCurCd.length-1; i++){
	    			var vatCurCd2 = vatCurCd[i].split("&&");
	    			var aplyRow = vatCurRow[i];
	    			var aplySumAmt = 0;
	    			var sVatFrtCd = "";
	    			var sVatFrtCd1 = "";
	    			var sVatFrtCd2 = "";
	    			var roundDec = 2;
	    			if(vnVatCalRound=="N" && formObj.f_cnt_cd.value=="VN")
	    				roundDec = 4;
	    			
	    			//#2462 [BNX - HCM] Change logic in A/R Entry (invoice)
	    			var aplySumAmtByVn = 0;

	    			for(var j=2; j<=sheetObj.LastRow();j++){

				    	var vatRtCdFlg = true;
				    	var vatRtCdFlg1 = true;
				    	var vatRtCdFlg2 = true;

				    	if(sheetObj.GetCellValue(j, "vat_rt_cd") == ""){
				    		vatRtCdFlg = false;
				    	}

				    	if(sheetObj.GetCellValue(j, "vat_rt_cd1") == ""){
				    		vatRtCdFlg1 = false;
				    	}

				    	if(sheetObj.GetCellValue(j, "vat_rt_cd2") == ""){
				    		vatRtCdFlg2 = false;
				    	}

	    		    	frtVatRt = sheetObj.GetCellValue(j, "vat_rt") ==null ? 0 : sheetObj.GetCellValue(j, "vat_rt");
	    		    	frtVatRt1 = sheetObj.GetCellValue(j, "vat_rt1") ==null ? 0 : sheetObj.GetCellValue(j, "vat_rt1");
	    		    	frtVatRt2 = sheetObj.GetCellValue(j, "vat_rt2") ==null ? 0 : sheetObj.GetCellValue(j, "vat_rt2");

	    		    	if( vatRtCdFlg && sheetObj.GetCellValue(j, "frt_check")
	    		    			&& vatCurCd2[0] == sheetObj.GetCellValue(j, "rat_curr_cd")
	    		    			&& vatCurCd2[1] == sheetObj.GetCellValue(j, "vat_rt_cd")
	    		    			//#6779 [JAPT] Freight Copy function works abnormally for tax
	    		    			&& sheetObj.GetCellValue(j, "del_chk") != "1"
	    		    			){

	    		    		//#2462 [BNX - HCM] Change logic in A/R Entry (invoice)
	    		    		if(0 < frtVatRt){
	    		    			//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    			aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt / 100));
	    		    			aplySumAmtByVn += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt / 100));
	    		    		}else{
	    		    			//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    			aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * frtVatRt);
	    		    			aplySumAmtByVn += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * frtVatRt);
	    		    		}

	    	    			for (var ii = 0 ; ii < ARR_VAT_FRT_CD.length ; ii++ ) {
//	    	    				#934 [CLT] AR Invoice - VAT 선택 후 VAT Calc. 로직 오류
//    		    				if ( ARR_TAX_RATE[ii] == frtVatRt ) {
	    	    				if ( ARR_VAT_FRT_CD[ii] == sheetObj.GetCellValue(j, "vat_rt_cd") ) {
    		    					sVatFrtCd = ARR_VAT_FRT_CD[ii];
    		    					break;
    		    				}
	    	    			}
	    		    	}

	    		    	if( vatRtCdFlg1 && sheetObj.GetCellValue(j, "frt_check")
	    		    			&& vatCurCd2[0] == sheetObj.GetCellValue(j, "rat_curr_cd")
	    		    			&& vatCurCd2[1] == sheetObj.GetCellValue(j, "vat_rt_cd1")
	    		    			//#6779 [JAPT] Freight Copy function works abnormally for tax
	    		    			&& sheetObj.GetCellValue(j, "del_chk") != "1"
	    		    			){
	    		    		//#2462 [BNX - HCM] Change logic in A/R Entry (invoice)
	    		    		if(0 < frtVatRt1){
	    		    			//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    			aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt1 / 100));
	    		    			aplySumAmtByVn += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt1 / 100));
	    		    		}else{
	    		    			//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    			aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * frtVatRt1);
	    		    			aplySumAmtByVn += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * frtVatRt1);
	    		    		}

	    	    			for (var ii = 0 ; ii < ARR_VAT_FRT_CD.length ; ii++ ) {
	    	    				if ( ARR_VAT_FRT_CD[ii] == sheetObj.GetCellValue(j, "vat_rt_cd1") ) {
    		    					sVatFrtCd = ARR_VAT_FRT_CD[ii];
    		    					break;
    		    				}
	    	    			}
	    		    	}

	    		    	if( vatRtCdFlg2 && sheetObj.GetCellValue(j, "frt_check")
	    		    			&& vatCurCd2[0] == sheetObj.GetCellValue(j, "rat_curr_cd")
	    		    			&& vatCurCd2[1] == sheetObj.GetCellValue(j, "vat_rt_cd2")
	    		    			//#6779 [JAPT] Freight Copy function works abnormally for tax
	    		    			&& sheetObj.GetCellValue(j, "del_chk") != "1"
	    		    			){
	    		    		//#2462 [BNX - HCM] Change logic in A/R Entry (invoice)
	    		    		if(0 < frtVatRt2){
	    		    			//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    			aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt2 / 100));	    		    			
	    		    			aplySumAmtByVn += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt2 / 100));
	    		    		}else{
	    		    			//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    			aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * frtVatRt2);
	    		    			aplySumAmtByVn += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * frtVatRt2);
	    		    		}

	    	    			for (var ii = 0 ; ii < ARR_VAT_FRT_CD.length ; ii++ ) {
	    	    				if ( ARR_VAT_FRT_CD[ii] == sheetObj.GetCellValue(j, "vat_rt_cd2") ) {
    		    					sVatFrtCd = ARR_VAT_FRT_CD[ii];
    		    					break;
    		    				}
	    	    			}
	    		    	}
	    		    }

	    			intRows = sheetObj.LastRow() + 1;
			    	sheetObj.DataInsert(intRows);
			    	sheetObj.SetCellValue(intRows, "frt_check","1");
		    		sheetObj.SetCellValue(intRows, "sell_buy_tp_cd",sheetObj.GetCellValue(aplyRow, "sell_buy_tp_cd"));
		    		sheetObj.SetCellValue(intRows, "frt_cd", sVatFrtCd);
		    		sheetObj.SetCellValue(intRows, "frt_term_cd", sheetObj.GetCellValue(aplyRow, "frt_term_cd"));
		    		sheetObj.SetCellValue(intRows, "aply_ut_cd", aplyUtCd);	//Unit Setting
		    		sheetObj.SetCellValue(intRows, "cntr_tpsz_cd",sheetObj.GetCellValue(aplyRow, "cntr_tpsz_cd"));
	    			sheetObj.SetCellValue(intRows, "ru",roundXL(aplySumAmt,3) );
		    		sheetObj.SetCellValue(intRows, "qty",1);
		    		sheetObj.SetCellValue(intRows, "whld_vat_rt", 0);
		    		sheetObj.SetCellValue(intRows, "rat_curr_cd", vatCurCd2[0]);
		    		sheetObj.SetCellValue(intRows, "inv_aply_curr_cd", sheetObj.GetCellValue(aplyRow, "inv_aply_curr_cd"),0);
		    		sheetObj.SetCellValue(intRows, "inv_xcrt", sheetObj.GetCellValue(aplyRow, "inv_xcrt"));
		    		sheetObj.SetCellValue(intRows, "inv_xcrt_dt", sheetObj.GetCellValue(aplyRow, "inv_xcrt_dt"));
		    		sheetObj.SetCellValue(intRows, "intg_bl_seq",sheetObj.GetCellValue(aplyRow, "intg_bl_seq"));
		    		sheetObj.SetCellValue(intRows, "oth_seq",sheetObj.GetCellValue(aplyRow, "oth_seq"));
		    		//#2690 [ACL POLAND] VAT calculation is not counted correctly
		    		sheetObj.SetCellValue(intRows, "wms_seq",sheetObj.GetCellValue(aplyRow, "wms_seq"));
		    		sheetObj.SetCellValue(intRows, "ibflag","I");
		    		sheetObj.SetCellEditable(intRows, "ps_check",0);
		    		sheetObj.SetRowBackColor(intRows,"#DFFFFF");

		    		sheetObj.SetCellValue(intRows, "vat_rt_cd", sVatFrtCd);
		    		sheetObj.SetCellValue(intRows, "vat_rt_cd1", sVatFrtCd);
		    		sheetObj.SetCellValue(intRows, "vat_rt_cd2", sVatFrtCd);

	    			sheetObj.SetCellValue(intRows, "vat_rt", 0);
	    			sheetObj.SetCellValue(intRows, "vat_rt1", 0);
	    			sheetObj.SetCellValue(intRows, "vat_rt2", 0);

	    			////#2462 [BNX - HCM] Change logic in A/R Entry (invoice)
	    			if (formObj.f_cnt_cd.value=="VN") {
	    				if (vnVatCalRound=="Y")
	    					sheetObj.SetCellValue(intRows, "inv_sum_amt",roundXL(aplySumAmtByVn,0) );
	    				else
	    					sheetObj.SetCellValue(intRows, "inv_sum_amt",roundXL(aplySumAmtByVn,2) );

	    			//#2535 [LBS] VAT 환율 적용 로직 개선	 round(rount(qty*ru*VATRT, 2)*inv_xcrt, 2) -> ound((qty*ru*VATRT)*inv_xcrt, 2)
	    			}else{
	    				var curr=formObj.f_curr_cd.value;
	    				if(curr=="KRW" || curr=="JPY"  || (curr=="VND" && vnVatCalRound=="Y")) {
	    					sheetObj.SetCellValue(intRows, "inv_sum_amt",roundXL(aplySumAmtByVn,0) );
	    				}else{
	    					sheetObj.SetCellValue(intRows, "inv_sum_amt",roundXL(aplySumAmtByVn,2) );
	    				}
	    			}
	    		}
    		} else {
    			for(var i=0; i<vatCurCd.length-1; i++){
	    			var aplyRow = vatCurRow[i];
	    			var aplySumAmt = 0;
	    			var aplyTotalSumAmt = 0; //#2535 [LBS] VAT 환율 적용 로직 개선
	    			//#6733 [IMPEX GER, BNX GER, KPL GER] VAT 19% -> 16% change related problem
	    			var aplyFrtVatRt = 0;
	    			
	    			for(var j=2; j<=sheetObj.LastRow();j++){

				    	/*var vatRtCdFlg = true;

				    	if(sheetObj.GetCellValue(j, "vat_rt_cd") == ""){
				    		vatRtCdFlg = false;
				    	}*/

	    		    	frtVatRt = sheetObj.GetCellValue(j, "vat_rt") ==null ? 0 : sheetObj.GetCellValue(j, "vat_rt");
	    		    	frtVatRt1 = sheetObj.GetCellValue(j, "vat_rt1") ==null ? 0 : sheetObj.GetCellValue(j, "vat_rt1");
	    		    	frtVatRt2 = sheetObj.GetCellValue(j, "vat_rt2") ==null ? 0 : sheetObj.GetCellValue(j, "vat_rt2");

	    		    	if(frtVatRt > 0 && sheetObj.GetCellValue(j, "frt_check") && vatCurCd[i] == sheetObj.GetCellValue(j, "rat_curr_cd")
	    		    		//#6779 [JAPT] Freight Copy function works abnormally for tax
	    		    		&& sheetObj.GetCellValue(j, "del_chk") != "1"){
	    		    		//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    		aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt / 100));
	    		    		aplyTotalSumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt / 100)); //#2535 [LBS] VAT 환율 적용 로직 개선
	    		    		//#6733 [IMPEX GER, BNX GER, KPL GER] VAT 19% -> 16% change related problem
	    		    		aplyFrtVatRt = frtVatRt;
	    		    	}

	    		    	if(frtVatRt1 > 0 && sheetObj.GetCellValue(j, "frt_check") && vatCurCd[i] == sheetObj.GetCellValue(j, "rat_curr_cd")
	    		    		//#6779 [JAPT] Freight Copy function works abnormally for tax
	    		    		&& sheetObj.GetCellValue(j, "del_chk") != "1"){
	    		    		//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    		aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt1 / 100));
	    		    		aplyTotalSumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt1 / 100)); //#2535 [LBS] VAT 환율 적용 로직 개선
	    		    	}

	    		    	if(frtVatRt2 > 0 && sheetObj.GetCellValue(j, "frt_check") && vatCurCd[i] == sheetObj.GetCellValue(j, "rat_curr_cd")
	    		    		//#6779 [JAPT] Freight Copy function works abnormally for tax
	    		    		&& sheetObj.GetCellValue(j, "del_chk") != "1"){
	    		    		//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    		aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt2 / 100));
	    		    		aplyTotalSumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt2 / 100)); //#2535 [LBS] VAT 환율 적용 로직 개선
	    		    	}
	    		    }
	    			//#6733 [IMPEX GER, BNX GER, KPL GER] VAT 19% -> 16% change related problem
	    			if(ARR_TAX_RATE.length > 1 && aplyFrtVatRt > 0){
		    			for(var i = 0; i < ARR_TAX_RATE.length; i++){
		    				VAT_FRT_CD = ARR_VAT_FRT_CD[i];
		    				if(aplyFrtVatRt == ARR_TAX_RATE[i]){
		    					VAT_FRT_CD = ARR_VAT_FRT_CD[i];
		    					break;
		    				}
		    			}
	    			}

	    			intRows = sheetObj.LastRow() + 1;
			    	sheetObj.DataInsert(intRows);
			    	sheetObj.SetCellValue(intRows, "frt_check","1");
		    		sheetObj.SetCellValue(intRows, "sell_buy_tp_cd",sheetObj.GetCellValue(aplyRow, "sell_buy_tp_cd"));
		    		sheetObj.SetCellValue(intRows, "frt_cd", VAT_FRT_CD);
		    		sheetObj.SetCellValue(intRows, "frt_term_cd", sheetObj.GetCellValue(aplyRow, "frt_term_cd"));
		    		sheetObj.SetCellValue(intRows, "aply_ut_cd", aplyUtCd);	//Unit Setting
		    		sheetObj.SetCellValue(intRows, "cntr_tpsz_cd",sheetObj.GetCellValue(aplyRow, "cntr_tpsz_cd"));
		    		sheetObj.SetCellValue(intRows, "ru",roundXL(aplySumAmt,3) );
		    		sheetObj.SetCellValue(intRows, "qty",1);
		    		sheetObj.SetCellValue(intRows, "whld_vat_rt", 0);
		    		sheetObj.SetCellValue(intRows, "rat_curr_cd", vatCurCd[i]);
		    		sheetObj.SetCellValue(intRows, "inv_aply_curr_cd", sheetObj.GetCellValue(aplyRow, "inv_aply_curr_cd"));
		    		sheetObj.SetCellValue(intRows, "inv_xcrt", sheetObj.GetCellValue(aplyRow, "inv_xcrt"));
		    		sheetObj.SetCellValue(intRows, "inv_xcrt_dt", sheetObj.GetCellValue(aplyRow, "inv_xcrt_dt"));
		    		sheetObj.SetCellValue(intRows, "intg_bl_seq",sheetObj.GetCellValue(aplyRow, "intg_bl_seq"));
		    		sheetObj.SetCellValue(intRows, "oth_seq",sheetObj.GetCellValue(aplyRow, "oth_seq"));
		    		//#2690 [ACL POLAND] VAT calculation is not counted correctly
		    		sheetObj.SetCellValue(intRows, "wms_seq",sheetObj.GetCellValue(aplyRow, "wms_seq"));
		    		sheetObj.SetCellValue(intRows, "ibflag","I");
		    		sheetObj.SetCellEditable(intRows, "ps_check",0);
		    		sheetObj.SetRowBackColor(intRows,"#DFFFFF");

		    		sheetObj.SetCellValue(intRows, "vat_rt_cd", sVatFrtCd);
		    		sheetObj.SetCellValue(intRows, "vat_rt_cd1", sVatFrtCd);
		    		sheetObj.SetCellValue(intRows, "vat_rt_cd2", sVatFrtCd);

	    			sheetObj.SetCellValue(intRows, "vat_rt", 0);
	    			sheetObj.SetCellValue(intRows, "vat_rt1", 0);
	    			sheetObj.SetCellValue(intRows, "vat_rt2", 0);

	    			//#2535 [LBS] VAT 환율 적용 로직 개선	round(rount(qty*ru*VATRT, 2)*inv_xcrt, 2) -> ound((qty*ru*VATRT)*inv_xcrt, 2)
    				var curr=formObj.f_curr_cd.value;
    				if(curr=="KRW" || curr=="JPY"  || (curr=="VND" && vnVatCalRound=="Y")) {
    					sheetObj.SetCellValue(intRows, "inv_sum_amt",roundXL(aplyTotalSumAmt,0) );
    				}else{
    					sheetObj.SetCellValue(intRows, "inv_sum_amt",roundXL(aplyTotalSumAmt,2) );
    				}
	    		}
    		}

    		for(var i=0; i<whldVatCurCd.length-1; i++){
    			var aplyRow = whldVatCurRow[i];
    			var aplySumAmt = 0;
    			var aplyTotalSumAmt = 0; //#2535 [LBS] VAT 환율 적용 로직 개선

    			for(var j=2; j<=sheetObj.LastRow();j++){
    				frtWhldVatRt = sheetObj.GetCellValue(j, "whld_vat_rt") ==null ? 0 : sheetObj.GetCellValue(j, "whld_vat_rt");
    		    	if(frtWhldVatRt < 0 && sheetObj.GetCellValue(j, "frt_check") && whldVatCurCd[i] == sheetObj.GetCellValue(j, "rat_curr_cd")){
    		    		//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
    		    		aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtWhldVatRt / 100));
    		    		aplyTotalSumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtWhldVatRt / 100)); //#2535 [LBS] VAT 환율 적용 로직 개선
    		    	}
    		    }

    			intRows = sheetObj.LastRow() + 1;
		    	sheetObj.DataInsert(intRows);
		    	sheetObj.SetCellValue(intRows, "frt_check","1");
	    		sheetObj.SetCellValue(intRows, "sell_buy_tp_cd",sheetObj.GetCellValue(aplyRow, "sell_buy_tp_cd"));
	    		sheetObj.SetCellValue(intRows, "frt_cd", WHLD_VAT_FRT_CD);
	    		sheetObj.SetCellValue(intRows, "frt_term_cd", sheetObj.GetCellValue(aplyRow, "frt_term_cd"));
	    		sheetObj.SetCellValue(intRows, "aply_ut_cd", aplyUtCd);	//Unit Setting
	    		sheetObj.SetCellValue(intRows, "cntr_tpsz_cd",sheetObj.GetCellValue(aplyRow, "cntr_tpsz_cd"));
	    		sheetObj.SetCellValue(intRows, "ru",roundXL(aplySumAmt,3) );
	    		sheetObj.SetCellValue(intRows, "qty",1);
	    		sheetObj.SetCellValue(intRows, "vat_rt", 0);
	    		sheetObj.SetCellValue(intRows, "whld_vat_rt", 0);
	    		sheetObj.SetCellValue(intRows, "rat_curr_cd", whldVatCurCd[i]);
	    		sheetObj.SetCellValue(intRows, "inv_aply_curr_cd", sheetObj.GetCellValue(aplyRow, "inv_aply_curr_cd"));
	    		sheetObj.SetCellValue(intRows, "inv_xcrt", sheetObj.GetCellValue(aplyRow, "inv_xcrt"));
	    		sheetObj.SetCellValue(intRows, "inv_xcrt_dt", sheetObj.GetCellValue(aplyRow, "inv_xcrt_dt"));
	    		sheetObj.SetCellValue(intRows, "intg_bl_seq",sheetObj.GetCellValue(aplyRow, "intg_bl_seq"));
	    		sheetObj.SetCellValue(intRows, "oth_seq",sheetObj.GetCellValue(aplyRow, "oth_seq"));
	    		//#2690 [ACL POLAND] VAT calculation is not counted correctly
	    		sheetObj.SetCellValue(intRows, "wms_seq",sheetObj.GetCellValue(aplyRow, "wms_seq"));
	    		sheetObj.SetCellValue(intRows, "ibflag","I");
	    		sheetObj.SetCellEditable(intRows, "ps_check",0);
	    		sheetObj.SetRowBackColor(intRows,"#DFFFFF");

	    		//#2535 [LBS] VAT 환율 적용 로직 개선	 round(rount(qty*ru*VATRT, 2)*inv_xcrt, 2) -> ound((qty*ru*VATRT)*inv_xcrt, 2)
				var curr=formObj.f_curr_cd.value;
				if(curr=="KRW" || curr=="JPY"  || (curr=="VND" && vnVatCalRound=="Y")) {
					sheetObj.SetCellValue(intRows, "inv_sum_amt",roundXL(aplyTotalSumAmt,0) );
				}else{
					sheetObj.SetCellValue(intRows, "inv_sum_amt",roundXL(aplyTotalSumAmt,2) );
				}
    		}

		    /*
		    if(firstVatRowIdx > 0){	//VAT 항목이 존재
		    	intRows = sheetObj.LastRow() + 1;
		    	sheetObj.DataInsert(intRows);
		    	sheetObj.SetCellValue(intRows, "frt_check","1");
	    		sheetObj.SetCellValue(intRows, "sell_buy_tp_cd",sheetObj.GetCellValue(firstVatRowIdx, "sell_buy_tp_cd"));
	    		sheetObj.SetCellValue(intRows, "frt_cd", VAT_FRT_CD);
	    		sheetObj.SetCellValue(intRows, "frt_term_cd", sheetObj.GetCellValue(firstVatRowIdx, "frt_term_cd"));
	    		// UNIT Setting
	    		var aplyUtCd = "UNT";
	    		if(frm1.f_air_sea_clss_cd.value == "A"){
	    			aplyUtCd = "AUN";
	    		}
	    		sheetObj.SetCellValue(intRows, "aply_ut_cd", aplyUtCd);	//Unit Setting
	    		sheetObj.SetCellValue(intRows, "cntr_tpsz_cd",sheetObj.GetCellValue(firstVatRowIdx, "cntr_tpsz_cd"));
	    		sheetObj.SetCellValue(intRows, "ru",roundXL(invSumForVat * vatRt / 100,2) );
	    		sheetObj.SetCellValue(intRows, "qty",1);
	    		//sheetObj.SetCellValue(intRows, "trf_cur_sum_amt", roundXL(invSumForVat * vatRt / 100,2) );
	    		sheetObj.SetCellValue(intRows, "vat_rt", 0);
	    		sheetObj.SetCellValue(intRows, "rat_curr_cd", sheetObj.GetCellValue(firstVatRowIdx, "rat_curr_cd"));
	    		sheetObj.SetCellValue(intRows, "inv_xcrt", sheetObj.GetCellValue(firstVatRowIdx, "inv_xcrt"));
	    		sheetObj.SetCellValue(intRows, "inv_xcrt_dt", sheetObj.GetCellValue(firstVatRowIdx, "inv_xcrt_dt"));
	    		//sheetObj.SetCellValue(intRows, "ru",Math.round(cal_amt));
	    		sheetObj.SetCellValue(intRows, "intg_bl_seq",sheetObj.GetCellValue(firstVatRowIdx, "intg_bl_seq"));
	    		sheetObj.SetCellValue(intRows, "oth_seq",sheetObj.GetCellValue(firstVatRowIdx, "oth_seq"));
	    		sheetObj.SetCellValue(intRows, "ibflag","I");
	    		sheetObj.SetCellEditable(intRows, "ps_check",0);
	    		sheetObj.SetRowBackColor(intRows,"#DFFFFF");

		    }*/
	    break;

        case "EDI":
        	if (!ediValidation()){
        		return false;
        	}

        	if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){


        		doShowProcess();
        		//gridAdd(1);
        		formObj.f_cmd.value=COMMAND01;
        		var cntrSheetData=docObjects[0].GetSaveString(true);
        		docObjects[3].DataInsert(docObjects[3].LastRow() + 1);
        		docObjects[3].DoAllSave("./ACC_INV_0010GS.clt", FormQueryString(formObj)+'&'+cntrSheetData, true);
        	}
       break;

        case "PRINT_BLOCK":
        	if(frm1.f_inv_seq.value == ''){
				alert(getLabel('FMS_COM_ALT029'));
				return;
			}

        	ajaxSendPost(getInvBlockCheck, 'reqVal', '&goWhere=aj&bcKey=getInvBlockCheck&inv_seq='+frm1.f_inv_seq.value, './GateServlet.gsl');

   	 	break;

   	 	//#1800 [PATENT] A/R Invoice Split Function
		case "SPLIT":
			var formObj=document.frm1;
			var paidAmtYn = parseFloat(eval((formObj.f_paid_amt.value).replaceAll(",",""))) > 0?true:false;

			if(frm1.f_inv_seq.value==''){ //저장되지 않은 경우 split 불가
				alert(getLabel('FMS_COM_ALT015'));
				return;
			}
			if(sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y"){ //block된 경우 split 불가
				alert(getLabel('ACC_MSG161'));
				return false;
			}
			if (paidAmtYn){ //paid amount !=0 인 경우 split 불가
				alert(getLabel('ACC_MSG162'));
				//formObj.f_paid_amt.select();
				return false;
			}
			var chkCnt=0;
			var chk_fr_trdp_cd="";
			var chk_fr_trdp_nm="";
			var chk_fr_inv_curr_cd="";
			var chk_fr_frt_seq="";

 			for(var i=2; i < sheetObj.LastRow() + 1; i++){
 				if(sheetObj.GetCellValue(i, "frt_check") == 1){
				chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'trdp_cd');
				chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'trdp_nm');
				chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'inv_aply_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ", ";
					}
					if(sheetObj.GetCellValue(i, "ibflag") == "I"){
						alert("frt_seq"); //저장되지 않은 경우 split 불가
						sheetObj.RowDelete(i,false);//전체 삭제 할 수 있도록
						return false;
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'frt_seq');
					chkCnt++;
				}
			}

 			//frt_seq가 없는 row 삭제

 			if (chkCnt==0){ //chkCnt
				alert(getLabel('ACC_MSG159'));
				sheetObj.SelectCell(2, "frt_check", false);
				return false;
			}
 			//전체를 선택하여 Split 불가
 			if (chkCnt == sheetObj.LastRow()-1){
 				alert(getLabel('ACC_MSG135'));
 				sheetObj.SelectCell(2, "frt_check", false);
 				return false;
 			}

 			formObj.chk_fr_trdp_cd.value = chk_fr_trdp_cd;
 			formObj.chk_fr_trdp_nm.value = chk_fr_trdp_nm;
 			formObj.chk_fr_inv_curr_cd.value = chk_fr_inv_curr_cd;
 			formObj.chk_fr_frt_seq.value = chk_fr_frt_seq;

 			if(confirm(getLabel('ACC_MSG161'))){
 				//frt 삭제
 	 			formObj.f_cmd.value=COMMAND03;
 	 			//계산식
 	 			var amt_tot=0;
 	 			var vatamt_tot=0;
 	 			var totamt_tot=0;
 	 			for(var i=2; i<=sheetObj.LastRow(); i++){
 	 				if(sheetObj.GetCellValue(i,"frt_check") == "1"){

 	 				}else{
 	 					if (!(sheetObj.GetCellValue(i, "ibflag") == "I" && sheetObj.GetCellValue(i, "frt_check") == "0")) {
 	 						amt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_amt"));
 	 						vatamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
 	 						totamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
 	 					}
 	 				}
 	 			}
 	 			formObj.f_amt_tot.value=doMoneyFmt(roundXL(amt_tot,2));
 	 			formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(vatamt_tot,2));
 	 			formObj.f_totamt_tot.value=doMoneyFmt(roundXL(totamt_tot,2));

 		 		formObj.f_amt_tot.value=removeComma(formObj.f_amt_tot.value);
 		 		formObj.f_vatamt_tot.value=removeComma(formObj.f_vatamt_tot.value);
 		 		formObj.f_totamt_tot.value=removeComma(formObj.f_totamt_tot.value);
 		 		formObj.f_paid_amt.value=removeComma(formObj.f_paid_amt.value);
 		 		sheetObj.DoAllSave("./ACC_INV_0010GS.clt", FormQueryString(formObj), true);
 			}

		break;
		case "SPLIT_OPEN":

			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
 			param += "&s_bl_no=" + formObj.s_bl_no.value;
 			param += "&f_bl_no=" + formObj.f_bl_no.value;
 			param += "&f_air_sea_clss_cd=" + formObj.f_air_sea_clss_cd.value;
 			param += "&f_biz_clss_cd="+formObj.f_biz_clss_cd.value;
 			param += "&f_bnd_clss_cd="+formObj.f_bnd_clss_cd.value;
 			param += "&chk_fr_trdp_cd=" + formObj.chk_fr_trdp_cd.value;
 			param += "&chk_fr_trdp_nm=" + formObj.chk_fr_trdp_nm.value;
 			param += "&chk_fr_inv_curr_cd=" + formObj.chk_fr_inv_curr_cd.value;
 			param += "&chk_fr_frt_seq=" + formObj.chk_fr_frt_seq.value;

 			//#2943 [Patson] Customer Ref. No. got missing when user doing invoice split
 			param += "&split_org_cust_ref_no=" + formObj.f_cusref_no.value;

 			param += "&chk_split=Y";


 			var paramStr="./ACC_INV_0010.clt?f_cmd="+param;
 			parent.mkNewFrame('A/R Entry', paramStr);

		break;

		//<!-- #2335 [BNX][INDIA] AR Actual Shipper & CNEE 추가 // 1 Master 3 House -->
		case "ASHIP_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	 		rtnary=new Array(1);
	 		rtnary[0]="1";
			rtnary[1]="";
	   		rtnary[2]=window;
	   		callBackFunc = "ASHIP_TRDP_POPLIST";
		    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		 break;
		case "ASHIP_TRDP_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	 		rtnary=new Array(1);
	 		rtnary[0]="1";
			rtnary[1]=formObj.f_act_shpr_trdp_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "ASHIP_TRDP_POPLIST";
		    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		 break;

		case "ACON_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	 		rtnary=new Array(1);
	 		rtnary[0]="1";
			rtnary[1]="";
	   		rtnary[2]=window;
	   		callBackFunc = "ACON_TRDP_POPLIST";
		    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		 break;

		case "ACON_TRDP_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	 		rtnary=new Array(1);
	 		rtnary[0]="1";
			rtnary[1]=formObj.f_act_cnee_trdp_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "ACON_TRDP_POPLIST";
		    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		 break;

		//OFVFOUR-7601 [BNX] Adding new function onto A/R and DC Entry screen
		case "HBL_LIST":
			var air_sea_clss_cd = formObj.f_air_sea_clss_cd.value;
			var bnd_clss_cd = formObj.f_bnd_clss_cd.value;

			var paramStr = "?f_ref_no=" + formObj.f_ref_no.value;
			paramStr += "&f_mbl_no=" + formObj.f_mbl_no.value;

			//OEH B/L List
			if (air_sea_clss_cd == "S" && bnd_clss_cd == "O"){
				parent.mkNewFrame('OEH B/L List', "./SEE_BMD_0060.clt" + paramStr);
			}
			//OIH B/L List
			if (air_sea_clss_cd == "S" && bnd_clss_cd == "I"){
				parent.mkNewFrame('OIH B/L List', "./SEI_BMD_0060.clt" + paramStr);
			}
			//AEH AWB List
			if (air_sea_clss_cd == "A" && bnd_clss_cd == "O"){
				parent.mkNewFrame('AEH AWB List', "./AIE_BMD_0060.clt" + paramStr);
			}
			//AIH AWB List
			if (air_sea_clss_cd == "A" && bnd_clss_cd == "I"){
				parent.mkNewFrame('AIH AWB List', "./AII_BMD_0060.clt" + paramStr);
			}
			//Other Bill List
			if (air_sea_clss_cd == "" && bnd_clss_cd == "" && formObj.f_wms_seq.value == "" && formObj.f_ref_no.value != ""){
				parent.mkNewFrame('Other Bill List', "./OTH_OPR_0020.clt" + paramStr);
			}

		 break;

    }
}

function ediValidation(){
	if(docObjects[0].RowCount() < 1){
		alert(getLabel('FMS_COM_ALT010'));
		return false;
	}


	var formObj=document.frm1;
	var v_cusref_no = formObj.f_cusref_no.value;
	var remarkArry;

	if(v_cusref_no == null || v_cusref_no.length <1 ){
		alert(getLabel('FMS_COM_ALT002') + " - Customer Ref. No." );
		return false;
	}else{

		//기아차(KMA)/현대차(HMA) 구분
		//기아 일경우는 GA001로 현대일때는 GA002로 생성 .
		if(v_cusref_no.lastIndexOf("KMA") < 0 && v_cusref_no.lastIndexOf("HMA") < 0){
			alert(getLabel('FMS_COM_ALT002') + " - Customer Ref. No." );
			return false;
		}

	}

	return true;
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

	//fnSetAutocomplete('f_bill_to_nm', 'ACC_POPLIST', 'billto'); //Customer
	/* #2111 자동완성 기능 추가  */
	fnSetAutocompleteCallBack('f_bill_to_nm', 'CUSTOMER_POPLIST', 'LINER_POPLIST'); //Customer
	//OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails
    var opt_key = "EXTENT_RPT_FILE_NAME_FLG";
	ajaxSendPost(setFileNameflag, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");


	var opt_key = "TAX_COL";
	ajaxSendPost(setTaxColReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	opt_key = "WHLD_TAX_COL";
	ajaxSendPost(setWhldTaxColReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	// #52183 [BNX] PAID A/R INVOICE도 수정 가능하도록 (EDITING EXISTING FREIGHT OR ADDING NEW FREIGHT)
	//var opt_key = "BLCK_AR_INV_ADD";
	//ajaxSendPost(setBlckArInvAddReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	// A/R, A/P Invoice에서 TAX코드 관리 여부(Y : TAX Code 관리, VAT%별로 VAT 관리 및 Report 출력물 MultiCurrency별 Total 계산로직 추가)
	opt_key = "TAX_MGMT_USE";
	ajaxSendPost(setTaxMgmtUse, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	// #1098 [BNX] INDIA 오피스 - 요구사항 항목
	ajaxSendPost(setTaxOpt, "reqVal", "&goWhere=aj&bcKey=getTaxOpt&s_ofc_cd="+frm1.f_ofc_cd.value, "./GateServlet.gsl");

	//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	opt_key = "USE_LOCL_GL_VIEW_FALG";
	ajaxSendPost(setUseLoclGlViewFalg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	opt_key = "INV_XCRT_APPL_TP";
	ajaxSendPost(setInvXcrtApplTp, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");	
	//#3988 [JAMES WORLDWIDE VN] Changing VAT Cal logic - without rounding decimal to 0
	opt_key = "VN_VAT_CAL_ROUND";
	ajaxSendPost(setVnVatCalRound, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#3375 [JTC]Invoice, Local Statement Form 개발
	opt_key = "AR_INVOICE_OPTION_USE";
	ajaxSendPost(setArInvoiceOptionUseReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");	
	
	// OFVFOUR-8099 [BEST OCEAN] REMOVING PRINT BUTTON WHEN THERE IS PRINT/L IN THE SAME SCREEN
    var opt_key = "VISIBLE_PRINT_BUTTON";
	ajaxSendPost(setVisiblePrintButton, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    var formObj=document.frm1;
	for(var i=0;isRun && i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        //comConfigSheet(docObjects[i], SYSTEM_FIS);
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
	formObj.old_post_dt.value=formObj.f_post_dt.value;
	// 체크로직의 변경 SLIP DATE => BLOCK DATE
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

//    	formObj.f_bill_to_cd.focus();
//    	formObj.f_bill_to_cd.blur();
//   	 #6918 [JAPAN TRUST] Missing Due Date when creating DC invoice - Author: Thuong Huynh - 2020/11/20
    	codeNameAction('BILLTO',document.frm1.f_bill_to_cd, 'onBlur');
    	// #50285 - [LOA] W/H DOC 에서 입력되는 MBL, HBL, CONTAINER 정보가 INVOICE에도 나오도록
    	if(formObj.f_wms_seq.value != ""){
			if(formObj.f_wms_cntr_info.value != ""){
				formObj.f_remark.value = formObj.f_wms_cntr_info.value;
			}
		}

    	//LHK, 인보이스 생성시 BLOCK_POST_DT 를 기본 date 를 설정
		//formObj.f_post_dt.value   = BLOCK_POST_DT;
		//formObj.f_inv_dt.value    = BLOCK_POST_DT;
		//formObj.old_post_dt.value = BLOCK_POST_DT;
    	// BL의 POST DATE가 SLIP의 MAX(POST_DT) 보다 작으면.. MAX(POST_DT) + 1 로 셋팅한다.
    /*	var bl_post=formObj.f_post_dt.value;
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

	//TAX_BILL 을 SEOUL만 활성화 한다.(2017.04.19-해제)
	/*
	if(formObj.f_ofc_cd.value == "SEL"){
		formObj.f_tax_bill.disabled=false;
	}
	*/
	//WMS ACCOUNT LKH 2015.01.20
	if(formObj.f_intg_bl_seq.value != "" || formObj.f_oth_seq.value != "" || formObj.f_wms_seq.value != ""){
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

	//독일IMPEX요청 - Terms 가 Days__ 일 경우 Remark 구문 설정 , 및 버튼 추가
	if (formObj.f_cnt_cd.value=="DE") {
		formObj.btnUstFrei.style.display="inline";
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

	//#1820 [PATENT] Invoice List - Tax Invoice No. Tax Bill, Financial Office 항목 추가
	setFieldValue( formObj.f_finc_ofc_cd , formObj.v_finc_ofc_cd.value);

	sheet1_OnLoadFinish(sheet1);

	//#3411 [JTC]Accounting & Performance 수정사항
	//AUTO_VAT_CALCULATING_AR 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
	if(AUTO_VAT_CALCULATING_AR == "Y") {
		document.getElementById("vatBtn").style.display="none";
	}
	
	
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
	
	// Freight Modi TMS 갖고오기
	if(formObj.f_intg_bl_seq.value != "" && formObj.chk_fr_frt_seq.value != ""){
		var chk_fr_frt_seq=formObj.chk_fr_frt_seq.value;
		ajaxSendPost(getFrtModiTms, 'reqVal', '&goWhere=aj&bcKey=searchFrtModiTms&frt_seq='+chk_fr_frt_seq, './GateServlet.gsl');
	}
}

function authControl(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	// 1.Paid Amount 값이 >0 인지 체크
	var paidAmtYn = parseFloat(eval((formObj.f_paid_amt.value).replaceAll(",",""))) > 0?true:false;
	var fileBolckYn=sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y"?true:false;
	var jrnYn=sheetObj.GetCellValue(2, "jnr_yn");
	var clsYn=sheetObj.GetCellValue(2, "cls_yn");



	//fnbtnCtl(3);

	//if (paidAmtYn) {
	if (!fileBolckYn && formObj.dp_flg.value == "Y") {
		editSheet(true);
	}
	//}
	//if (fileBolckYn) {
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
	//}
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
			//WMS ACCOUNT LKH 2015.01.20
			if(collTxt[i].name == "f_bill_to_cd" || collTxt[i].name == "f_ship_to_cd" ||
					collTxt[i].name == "f_bill_to_nm" || collTxt[i].name == "f_ship_to_nm" ||
					collTxt[i].name == "f_cusref_no" || //collTxt[i].name == "f_post_dt" ||
					collTxt[i].name == "f_inv_dt" || collTxt[i].name == "f_term_dt" ||
					collTxt[i].name == "f_due_dt" || collTxt[i].name == "f_last_paid_dt_cal" ||
					collTxt[i].name == "s_bl_no" || collTxt[i].name == "s_ref_no" ||
					collTxt[i].name == "s_oth_no" || collTxt[i].name == "s_inv_no" ||
					collTxt[i].name == "f_attn_to" || collTxt[i].name == "s_wms_no" || collTxt[i].name == "f_vchr_no"
			){
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
		getBtnObj("btnModify").style.display="inline";
		getBtnObj("btnSaveX").style.display="inline";
		frm1.billto.onclick=function(){doWork("CUSTOMER_POPLIST");};
		frm1.billto.style.cursor="hand";
		//frm1.shipto.onclick=function(){doWork("CUSTOMER_POPLIST2");};
		//frm1.shipto.style.cursor="hand";
		//frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDate();if(frm1.f_terms.value != ''){calcCreateTerms();}};
		frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDt();};
		frm1.f_term_dt.onblur=function(){calcCreateTerms();};
		// frm1.f_post_dt_cal.onclick	 = function(){doDisplay('DATE1', frm1);};
		frm1.f_inv_dt_cal.onclick=function(){doDisplay('DATE2', frm1);};
		frm1.f_due_dt_cal.onclick=function(){doDisplay('DATE3', frm1);};
		frm1.dateImg4.onclick=function(){doDisplay('DATE4', frm1);};
	} else {
		getBtnObj("btnModify").style.display="none";
		getBtnObj("btnSaveX").style.display="none";
		frm1.billto.onclick="";
		frm1.billto.style.cursor="";
		//frm1.shipto.onclick="";
		//frm1.shipto.style.cursor="";
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

	//LHK, 20140911, #43597 [BINEX]Close 후 A/P 수정 오류, BLOCK 된 인보이스(AR, AP, DC) 는 edit 권한 있어도 DEL 항목 check 안되도록 수정
	var fileBolckYn = sheetObj.GetCellValue(2, "clt_cmpl_flg");
	var jrnYn = sheetObj.GetCellValue(2, "jnr_yn");
	var clsYn = sheetObj.GetCellValue(2, "cls_yn");


	if (flg) {
		// AP/DC는 Row ADD 불가능
		//rowAddBtn1.style.display = "inline";
		//rowAddBtn2.style.display = "inline";
		//rowAddBtn3.style.display = "inline";
		//rowAddBtn4.style.display = "inline";
		// Save버튼 보이기/숨기기

		if(fileBolckYn != "Y" && formObj.dp_flg.value == "Y"){
			//#3411 [JTC]Accounting & Performance 수정사항
			//AUTO_VAT_CALCULATING_AR 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
			// 'Y' : VAT Cal. 버튼 비활성화
			if(AUTO_VAT_CALCULATING_AR != 'Y') {
				document.getElementById("vatBtn").style.display="inline";
			}
			document.getElementById("rowAddBtn1").style.display="inline";
			document.getElementById("rowAddBtn2").style.display="inline";
		}

		getBtnObj("btnModify").style.display="inline";
		getBtnObj("btnSaveX").style.display="inline";
	} else {
		//#3411 [JTC]Accounting & Performance 수정사항
		//AUTO_VAT_CALCULATING_AR 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
		// 'Y' : VAT Cal. 버튼 비활성화
		if(AUTO_VAT_CALCULATING_AR != 'Y') {
			document.getElementById("vatBtn").style.display="none";
		}

		document.getElementById("rowAddBtn1").style.display="none";
		document.getElementById("rowAddBtn2").style.display="none";
		// Save버튼 보이기/숨기기
		getBtnObj("btnModify").style.display="none";
		getBtnObj("btnSaveX").style.display="none";
	}
	// sheet edit 가능/불가
	sheetObj.SetEditable(flg);
	sheetObj.RenderSheet(1);



	for ( var i = 2; i <= sheetObj.LastRow(); i++) {
		if(fileBolckYn == "Y" || jrnYn == "Y" || clsYn == "Y") {
			sheetObj.SetCellEditable(i, "del_chk",0);
			sheetObj.SetColBackColor("del_chk","#EFEBEF");
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
        		 with(sheetObj){
        			 SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );

	  		           var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };


	  		           var headers = [ { Text:getLabel('ACC_INV_0010_HDR2_3'), Align:"Center"},
	  		                       { Text:getLabel('ACC_INV_0010_HDR2_4'), Align:"Center"} ];
	  		           InitHeaders(headers, info);

	  		           var cols = [ {Type:"CheckBox",  Hidden:0, TrueValue:"Y", FalseValue:"N"  , Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
	  				                  {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"frt_seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"CheckBox",  Hidden:0, TrueValue:"Y", FalseValue:"N"  , Width:30,   Align:"Center",  ColMerge:1,   SaveName:"frt_check",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
	  				                  {Type:"Combo",     Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	  				                  {Type:"Text",      Hidden:1,  Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	  				                  {Type:"Text",      Hidden:1,  Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	  				                  {Type:"Combo",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"frt_term_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Combo",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"aply_ut_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Combo",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Combo",     Hidden:0,  Width:55,  Align:"Center",  ColMerge:1,   	SaveName:"rat_curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },

//	  				                  #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//	  				                  {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	  					              {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	  					              {Type:"Combo",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt_cd",               KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },

	  					              // #1098 [BNX] INDIA 오피스 - 요구사항 항목
	  					              {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt1",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	  					              {Type:"Combo",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt_cd1",               KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  					              {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt2",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	  					              {Type:"Combo",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt_cd2",               KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },

	  				                  {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"whld_vat_rt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	  				                  {Type:"Float",      Hidden:1,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:"vat_amt",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },

	  				                  {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"ru",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	  				                  {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"qty",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	  				                  {Type:"Float",      Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"trf_cur_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
	  				                  {Type:"Combo",     Hidden:0,  Width:45,  Align:"Center",  ColMerge:1,   	SaveName:"inv_aply_curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Date",      Hidden:0,  Width:75,    Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },

//	  				                  #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//	  				                  {Type:"Float",      Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	  				                  {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },

	  				                  {Type:"Float",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_amt",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	  				                  {Type:"Float",      Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"inv_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	  				                  {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_rmk",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_pay_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_ship_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_ship_trdp_cd_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cust_ref_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_chk_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Float",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_bal_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Float",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_pay_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inco_cd",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_bil_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"attn_to",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cmb_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_yn",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_dt",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_yn",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_dt",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"block_dt",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"modi_tms",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"wms_seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tax_flg",          	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  //#1820 [PATENT] Invoice List - Tax Invoice No. Tax Bill, Financial Office 항목 추가
	  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"vchr_no",          	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"vchr_tp_cd",          	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"s_finc_ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"rcv_tp_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  //#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_xcrt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				              	  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_amt",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	  				                  {Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 }

	  				                  ];

	  		           InitColumns(cols);

	  		           SetEditable(1);
	  		           SetColProperty('frt_cd_nm', {InputCaseSensitive:1} );

    		           SetColProperty('frt_cd', {ComboText:FRTCD2, ComboCode:FRTCD1} );
    		           SetColProperty('cntr_tpsz_cd', {ComboText:TPSZ1, ComboCode:TPSZ1} );
    		           SetColProperty('aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    		           SetColProperty('frt_term_cd', {ComboText:"CC|PP", ComboCode:"CC|PP"} );
    		           SetColProperty('rat_curr_cd', {ComboText:' |'+CURRCD, ComboCode:' |'+CURRCD} );
    		           SetColProperty('inv_aply_curr_cd', {ComboText:' |'+CURRCD, ComboCode:' |'+CURRCD} );
    		           // #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
    		           SetColProperty('vat_rt_cd', {ComboText:VAT_VAL, ComboCode:VAT_CD} );
    		           SetColProperty('vat_rt_cd1', {ComboText:VAT_VAL, ComboCode:VAT_CD} );
    		           SetColProperty('vat_rt_cd2', {ComboText:VAT_VAL, ComboCode:VAT_CD} );

    		           SetHeaderRowHeight(20 );
    		           SetHeaderRowHeight(21);
    		           resizeSheet();

    		           if (tax_col == "Y"){
    		        	   SetColHidden("vat_rt", 0);

    		        	   // #1098 [BNX] INDIA 오피스 - 요구사항 항목
    		        	   if(tax_opt == 3){
    		        		   SetColHidden("vat_rt1",0);
    		        		   SetColHidden("vat_rt2",0);
    		        	   }else if(tax_opt == 2){
    		        		   SetColHidden("vat_rt1",0);
    		        		   SetColHidden("vat_rt2",1);
    		        	   }else{
    		        		   SetColHidden("vat_rt1",1);
    		        		   SetColHidden("vat_rt2",1);
    		        	   }

    		        	   // VAT Code ADD
    		        	   if (tax_mgmt_use == "Y"){
	    		        	   SetColHidden("vat_rt_cd", 0);

	    		        	   if(tax_opt == 3){
	    		        		   SetColHidden("vat_rt_cd1",0);
	    		        		   SetColHidden("vat_rt_cd2",0);
	    		        	   }else if(tax_opt == 2){
	    		        		   SetColHidden("vat_rt_cd1",0);
	    		        		   SetColHidden("vat_rt_cd2",1);
	    		        	   }else{
	    		        		   SetColHidden("vat_rt_cd1",1);
	    		        		   SetColHidden("vat_rt_cd2",1);
	    		        	   }

	    		        	   SetColEditable("vat_rt", 0);

	    		        	    if(tax_opt == 3){
		 	    		        	SetColEditable("vat_rt1", 0);
			    		        	SetColEditable("vat_rt2", 0);
		    		        	}else if(tax_opt == 2){
		 	    		        	SetColEditable("vat_rt1", 0);
			    		        	SetColEditable("vat_rt2", 1);
		    		        	}else{
		 	    		        	SetColEditable("vat_rt1", 1);
			    		        	SetColEditable("vat_rt2", 1);
		    		        	}

    		        	   }
    		           }

    			       if (whld_tax_col == "Y"){
    			    	   SetColHidden("whld_vat_rt", 0);
    			       }

    			       InitComboNoMatchText(1,"",1);

        		 }

        	 }else{
        		 with(sheetObj){
  		           var cnt=0;

  		           SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );

  		           var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };


  		           var headers = [ { Text:getLabel('ACC_INV_0010_HDR2_1'), Align:"Center"},
  		                       { Text:getLabel('ACC_INV_0010_HDR2_2'), Align:"Center"} ];
  		           InitHeaders(headers, info);

  		           //WMS ACCOUNT LKH 2015.01.20
  		           var cols = [ {Type:"CheckBox",  Hidden:0, TrueValue:"Y", FalseValue:"N"  , Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
  				                  {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"frt_seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"CheckBox",  Hidden:0, TrueValue:"Y", FalseValue:"N"  , Width:30,   Align:"Center",  ColMerge:1,   SaveName:"frt_check",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
  				                  {Type:"Combo",     Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
  				                  {Type:"Text",      Hidden:1,  Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
  				                  {Type:"Text",      Hidden:1,  Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
  				                  {Type:"Combo",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"frt_term_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Combo",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"aply_ut_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Combo",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },

//  				              #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//  				              {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
  				                  {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
  				                  {Type:"Combo",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt_cd",               KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },

  					              {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt1",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
  					              {Type:"Combo",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt_cd1",               KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  					              {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt2",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
  					              {Type:"Combo",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt_cd2",               KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },

				                  {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"whld_vat_rt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
				                  {Type:"Float",      Hidden:1,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:"vat_amt",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },

				                  {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"ru",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
  				                  {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"qty",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
  				                  {Type:"Float",      Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"trf_cur_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
  				                  {Type:"Text",      Hidden:1,  Width:55,   Align:"Center",   ColMerge:1,   SaveName:"rat_curr_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },

//  				              #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//  				              {Type:"Float",      Hidden:1,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
  				                  {Type:"Float",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },

  				                  {Type:"Date",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Float",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_amt",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
  				                  {Type:"Float",      Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"inv_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
  				                  {Type:"Float",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_rmk",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_pay_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_ship_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_ship_trdp_cd_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cust_ref_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_chk_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Float",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_bal_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Float",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_pay_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inco_cd",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_bil_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"attn_to",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cmb_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_yn",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_dt",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_yn",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_dt",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"block_dt",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"modi_tms",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"wms_seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tax_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				                  //#1820 [PATENT] Invoice List - Tax Invoice No. Tax Bill, Financial Office 항목 추가
  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"vchr_no",          	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"vchr_tp_cd",          	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"s_finc_ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				                  //#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				                  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_xcrt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  				              	  {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_amt",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },				                  
  				                  {Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 }

  				                  ];

  		           InitColumns(cols);

  		           //SetSheetWidth(mainTable.clientWidth);
  		           SetEditable(1);
  		           SetColProperty('frt_cd', {ComboText:FRTCD2, ComboCode:FRTCD1} );
  		           SetColProperty('frt_cd_nm', {InputCaseSensitive:1} );
  		           SetColProperty('cntr_tpsz_cd', {ComboText:TPSZ1, ComboCode:TPSZ1} );
  		           SetColProperty('aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
  		           SetColProperty('frt_term_cd', {ComboText:"CC|PP", ComboCode:"CC|PP"} );
    		       // #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
    		       SetColProperty('vat_rt_cd', {ComboText:VAT_VAL, ComboCode:VAT_CD} );
    		       SetColProperty('vat_rt_cd1', {ComboText:VAT_VAL, ComboCode:VAT_CD} );
    		       SetColProperty('vat_rt_cd2', {ComboText:VAT_VAL, ComboCode:VAT_CD} );

  		           SetHeaderRowHeight(20);
  		           SetHeaderRowHeight(21);
  		           resizeSheet();
  		           /* #20811 : [GPL] A/R Entry Screen - Make "Freight Name" Column Wider + Set "P/C" Column's Default Choice to "CC" jsjang 2013.9.24 */
  		           //지원안함[확인요망]HANJIN: 	             InitDataValid(0, "rat_curr_cd", vtEngUpOnly, "");

  	           	   // VAT CODE ADD
		           if (tax_col == "Y"){
		        	   SetColHidden("vat_rt", 0);

		        	    // #1098 [BNX] INDIA 오피스 - 요구사항 항목
		        	    if(tax_opt == 3){
		        	    	SetColHidden("vat_rt1",0);
		        	    	SetColHidden("vat_rt2",0);
		        	    }else if(tax_opt == 2){
		        	    	SetColHidden("vat_rt1",0);
		        	    	SetColHidden("vat_rt2",1);
		        	    }else{
		        	    	SetColHidden("vat_rt1",1);
		        	    	SetColHidden("vat_rt2",1);
		        	    }

		        	   // #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
		        	   if (tax_mgmt_use == "Y"){
    		        	   	SetColHidden("vat_rt_cd", 0);

			        	    if(tax_opt == 3){
			        	    	SetColHidden("vat_rt_cd1",0);
			        	    	SetColHidden("vat_rt_cd2",0);
			        	    }else if(tax_opt == 2){
			        	    	SetColHidden("vat_rt_cd1",0);
			        	    	SetColHidden("vat_rt_cd2",1);
			        	    }else{
			        	    	SetColHidden("vat_rt_cd1",1);
			        	    	SetColHidden("vat_rt_cd2",1);
			        	    }

    		        	   	SetColEditable("vat_rt", 0);

			        	    if(tax_opt == 3){
			        	    	SetColEditable("vat_rt1",0);
			        	    	SetColEditable("vat_rt2",0);
			        	    }else if(tax_opt == 2){
			        	    	SetColEditable("vat_rt1",0);
			        	    	SetColEditable("vat_rt2",1);
			        	    }else{
			        	    	SetColEditable("vat_rt1",1);
			        	    	SetColEditable("vat_rt2",1);
			        	    }
		        	   }
		           }

	  		       if (whld_tax_col == "Y"){
	  		    	   SetColHidden("whld_vat_rt", 0);
	  		       }

	  		       InitComboNoMatchText(1,"",1);

        		 }
        	 }

        	 break;




         case 2:      //IBSheet2 init

        	    with(sheetObj){
			           var cnt=0;

			           SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );

			           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			           var headers = [ { Text:"inv_seq|ibflag2", Align:"Center"} ];
			           InitHeaders(headers, info);

			           var cols = [ {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                  {Type:"Status",    Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag2",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 }  ];

			           InitColumns(cols);
			           SetEditable(1);
			           SetVisible(0);
			           //SetSheetWidth(mainTable.clientWidth);
                 }

        	    break;
         	case 3:      //TP/SZ init
                with(sheetObj){

	            SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );

	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:"|", Align:"Center"} ];
	            InitHeaders(headers, info);

	            var cols = [ {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"" },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"" }  ];

	            InitColumns(cols);

	            SetEditable(1);
		        SetVisible(0);
	            //SetSheetWidth(mainTable.clientWidth);
         	}

         	case 4:      //empty IBSheet init
         		with(sheetObj){

         		SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );

         		var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         		var headers = [ { Text:"|", Align:"Center"} ];
         		InitHeaders(headers, info);

         		var cols = [ {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"" },
         		             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"" },
         		             {Type:"Status",    Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag4" }
         		             ];

         		InitColumns(cols);

         		SetEditable(1);
         		SetVisible(0);
         		//SetSheetWidth(mainTable.clientWidth);
         	}

		  break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
var rowout = "";
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];

	//#2135 [BINEX] BLOCKED INVOICE REVISED WITHOUT AUTHORITY
	wmsObjectControl("", "ALL");

	// #4875 [JAPT] discrepancy between Invoice and balance amount.
	if(1 <= sheetObj.RowCount()){
		if(MULTI_CURR_FLAG == "Y"){
			if("" != sheetObj.GetCellValue(2, "inv_aply_curr_cd")){
				formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "inv_aply_curr_cd"); 
			}else{
				formObj.f_curr_cd.value=ofc_locl_curr_cd;
			}
		}else{
			if("" != sheetObj.GetCellValue(2, "rat_curr_cd")){
				formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "rat_curr_cd");
			}else{
				formObj.f_curr_cd.value=ofc_locl_curr_cd;
			}
		}		
	}
		
	//formObj.f_inv_seq.value = sheetObj.CellValue(2,"inv_seq");
	if(sheetObj.GetCellValue(2,"inv_seq") != "-1" && sheetObj.GetCellValue(2,"inv_seq") != ""){

		formObj.f_inv_no.value=sheetObj.GetCellValue(2,"inv_no");

		/* Bug Fix 단축키 사용시 Amt가 초기화 되지 않는 현상 수정 */
		formObj.f_amt_tot.value = 0;
		formObj.f_vatamt_tot.value = 0;
		formObj.f_totamt_tot.value = 0;

		for(var i=2; i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(2, "clt_cmpl_flg") != "Y" && document.getElementById("btnSplit") != null && document.getElementById("btnSplit").style.display != "none"  ){
				if(sheetObj.LastRow() > 2){
					sheetObj.SetCellEditable(i, "frt_check",1);
				}else{
					sheetObj.SetCellEditable(i, "frt_check",0);
				}
			}else{
				sheetObj.SetCellEditable(i, "frt_check",0);
			}
			sheetObj.SetColBackColor(2,"#EFEBEF");
			//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제
			if(formObj.f_curr_cd.value == "KRW" || formObj.f_curr_cd.value == "JPY" || (formObj.f_curr_cd.value=="VND" && vnVatCalRound=="Y")) {
				formObj.f_amt_tot.value=roundXL(Number(formObj.f_amt_tot.value) + Number(sheetObj.GetCellValue(i,"inv_amt")),0);
				formObj.f_vatamt_tot.value=roundXL(Number(formObj.f_vatamt_tot.value) + Number(sheetObj.GetCellValue(i,"inv_vat_amt")),0);
				formObj.f_totamt_tot.value=roundXL(Number(formObj.f_totamt_tot.value) + Number(sheetObj.GetCellValue(i,"inv_sum_amt")),0);
			} else {
				formObj.f_amt_tot.value=roundXL(Number(formObj.f_amt_tot.value) + Number(sheetObj.GetCellValue(i,"inv_amt")),2);
				formObj.f_vatamt_tot.value=roundXL(Number(formObj.f_vatamt_tot.value) + Number(sheetObj.GetCellValue(i,"inv_vat_amt")),2);
				formObj.f_totamt_tot.value=roundXL(Number(formObj.f_totamt_tot.value) + Number(sheetObj.GetCellValue(i,"inv_sum_amt")),2);
			}
			//TB_TRDP에 저장하기 위해 OLD_SUM값을 저장한다.
			formObj.f_old_sum_amt.value=formObj.f_totamt_tot.value;
			//[20130819	OJG]
			if(sheetObj.GetCellValue(i, "aply_ut_cd") != 'SCN'){	//Unit 이 Container
				sheetObj.SetCellEditable(i, "cntr_tpsz_cd",0);
			}

			//#3411 [JTC]Accounting & Performance 수정사항 (S)
			if(AUTO_VAT_CALCULATING_AR == 'Y') {
				if (ARR_VAT_FRT_CD != null) {
					for (var j = 0 ; j < ARR_VAT_FRT_CD.length ; j++ ) {
						if (ARR_VAT_FRT_CD[j] != "" && ARR_VAT_FRT_CD[j] == sheetObj.GetCellValue(i, "frt_cd")) {
							sheetObj.SetRowEditable(i, 0);
						}
					}
				}

				if(WHLD_VAT_FRT_CD != "" && WHLD_VAT_FRT_CD == sheetObj.GetCellValue(i, "frt_cd")){
					sheetObj.SetRowEditable(i, 0);
				}
			}
			//#3411 [JTC]Accounting & Performance 수정사항 (E)
		}


		formObj.f_modi_tms.value=sheetObj.GetCellValue(2, "modi_tms");
		formObj.s_inv_no.value=formObj.temp_inv_no.value;
		formObj.f_remark.value=sheetObj.GetCellValue(2, "inv_rmk");
		formObj.f_cusref_no.value=sheetObj.GetCellValue(2, "cust_ref_no");
		formObj.f_bill_to_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");
		
		formObj.rpt_trdp_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");	//Email 전송 Setup
		formObj.f_bill_to_nm.value=sheetObj.GetCellValue(2, "inv_trdp_cd_nm");
		formObj.f_ship_to_cd.value=sheetObj.GetCellValue(2, "inv_ship_trdp_cd");
		formObj.f_ship_to_nm.value=sheetObj.GetCellValue(2, "inv_ship_trdp_cd_nm");
		formObj.f_attn_to.value=sheetObj.GetCellValue(2, "attn_to");
		formObj.f_tax_no.value=sheetObj.GetCellValue(2, "tax_no");
		//#1820 [PATENT] Invoice List - Tax Invoice No. Tax Bill, Financial Office 항목 추가
		formObj.f_vchr_no.value=sheetObj.GetCellValue(2, "vchr_no");
		formObj.f_vchr_tp_cd.value=sheetObj.GetCellValue(2, "vchr_tp_cd");
		formObj.f_finc_ofc_cd.value=sheetObj.GetCellValue(2, "s_finc_ofc_cd");

		org_bill_to_cd = sheetObj.GetCellValue(2, "inv_trdp_cd");
		
		//#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
		if(formObj.f_vchr_no.value == ""){
	    	//AUTO 표시
			formObj.f_vchr_no.value = "AUTO";
	    }
		if(formObj.f_vchr_tp_cd.value == ""){
			formObj.f_vchr_tp_cd.value = "P"; //PAYMENT
		}

		//
		formObj.f_rcv_tp_cd.value=sheetObj.GetCellValue(2, "rcv_tp_cd");
		//2012/01/30추가
		formObj.old_trdp_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");
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
		formObj.f_amt_due.value=doMoneyFmt(sheetObj.GetCellValue(2, "inv_bal_amt"));
		formObj.f_paid_amt.value=doMoneyFmt(sheetObj.GetCellValue(2, "inv_pay_amt"));
		formObj.f_last_ck.value=sheetObj.GetCellValue(2, "last_chk_no");
		formObj.f_frgn_amt.value="";
		formObj.f_frgn_vat_amt.value="";
		formObj.f_frgn_sum_amt.value="";
		/*
		//BILLTO를 변경못하게 한다.
		formObj.f_bill_to_cd.readOnly=true;
		formObj.f_bill_to_cd.className="search_form-disable";
		formObj.f_bill_to_nm.readOnly=true;
		formObj.f_bill_to_nm.className="search_form-disable";
		formObj.billto.onclick="";
		formObj.billto.style.cursor="none";
		//SHIPTO를 변경못하게 한다.
		formObj.f_ship_to_cd.readOnly=true;
		formObj.f_ship_to_cd.className="search_form-disable";
		formObj.f_ship_to_nm.readOnly=true;
		formObj.f_ship_to_nm.className="search_form-disable";
		formObj.shipto.onclick="";
		formObj.shipto.style.cursor="none";
		*/
		formObj.f_inco_cd.value=sheetObj.GetCellValue(2, "inco_cd");
		//#3249 [FULLTRANS CN]  Default value of currency in the AR Inovice Entry
		if(1 <= sheetObj.RowCount()){
			//#3487 오류 수정 
			if(formObj.f_inv_seq.value == "")
			//#3370 [CNR GZ] User claimed that incorrect exchange rate applied when issuing AR or AP Invoice
				setCurrency();
			
		}
		
		//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제 (S)
		var cellInfo;
		if(formObj.f_curr_cd.value == 'KRW' || formObj.f_curr_cd.value == 'JPY' || (formObj.f_curr_cd.value=="VND" && vnVatCalRound=="Y")) {
			cellInfo = {Type:"Float", Hidden:0, Width:80, Align:"Right", ColMerge:1, SaveName:"inv_sum_amt", KeyField:0, CalcLogic:"", Format:"Float", PointCount:0, UpdateEdit:1, InsertEdit:1, EditLen:10};
		} else {
			cellInfo = {Type:"Float", Hidden:0, Width:80, Align:"Right", ColMerge:1, SaveName:"inv_sum_amt", KeyField:0, CalcLogic:"", Format:"Float", PointCount:2, UpdateEdit:1, InsertEdit:1, EditLen:10};
		}

		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
			sheetObj.InitCellProperty(i, "inv_sum_amt", cellInfo);
			sheetObj.SetCellValue(i, "inv_sum_amt", Number(sheetObj.GetCellValue(i,"inv_sum_amt")));
		}
		//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제 (E)		
		
		/*
		// DEPOSIT, CHECK 등록시 삭제를 불가능하게 한다.
		if(Number(removeComma(formObj.f_paid_amt.value)) != 0){
			deleteBtn1.style.display="none";
			deleteBtn2.style.display="none";
		}
		*/
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
			//BILLTO를 변경못하게 한다.
			formObj.f_bill_to_cd.readOnly=true;
			formObj.f_bill_to_cd.className="search_form-disable";
			formObj.f_bill_to_nm.readOnly=true;
			formObj.f_bill_to_nm.className="search_form-disable";
			formObj.billto.onclick="";
			formObj.billto.style.cursor="none";
			//SHIPTO를 변경못하게 한다.
			formObj.f_ship_to_cd.readOnly=true;
			formObj.f_ship_to_cd.className="search_form-disable";
			formObj.f_ship_to_nm.readOnly=true;
			formObj.f_ship_to_nm.className="search_form-disable";
			//formObj.shipto.onclick="";
			//formObj.shipto.style.cursor="none";
			//formObj.f_bill_to_cd.onblur		 = "";
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
		//#1489 - [BNX] AR INVOICE TO HAVE MARK & NO :  SECTION ADDED (F/S FUNCTION) - cleared when search with "Search" button - Thoa Dien 20170919
		if(sheetObj.RowCount() <= 0){
			formObj.f_remark.value     = "";         // Memo value default
			formObj.f_curr_cd.value    = currDflt;   // Currency - default value
			formObj.f_amt_due.value    = "";         // Amount Due
			formObj.f_paid_amt.value   = "";         // Paid Amount
			formObj.f_vchr_no.value    = "AUTO";     // AUTO 표시
			formObj.f_vchr_tp_cd.value = "P";        // PAYMENT
			formObj.f_last_ck.value    = "";         // Last check No.
			formObj.f_last_paid_dt_cal.value   = ""; // Last Paid Date
			formObj.f_tax_no.value     = "";         // Tax Invoice No.
			formObj.f_tax_bill.checked = false;      // Tax Bill
			if(formObj.f_terms[0].selected){
				formObj.f_term_dt.value="";
				formObj.f_due_dt.value="";
			}
			formObj.f_rcv_tp_cd.value = "";         // Receive Type
			
			//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
			formObj.f_loc_ex_rate.value = "";			
		}

		formObj.s_bl_no.value=formObj.temp_bl_no.value;
		formObj.s_oth_no.value=formObj.temp_oth_no.value;
		//WMS ACCOUNT LKH 2015.01.20
		formObj.s_wms_no.value=formObj.temp_wms_no.value;

		if(formObj.s_bl_no.value != "" && formObj.f_biz_clss_cd.value == "H"){
			formObj.s_ref_no.value="";
		}else {
			//WMS ACCOUNT LKH 2015.01.20
			if(formObj.s_oth_no.value == "" && formObj.s_wms_no.value == ""){
				formObj.s_ref_no.value=formObj.temp_ref_no.value;
			}
		}
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		//OFVFOUR-7986: [AIF] OPUS Error question - Inv no :AWI9200
		var chk_fr_frt_seq_tmp = '';
		for(var i=2; i<=sheetObj.LastRow();i++){
			if(formObj.f_bill_to_cd.value == sheetObj.GetCellValue(i, "trdp_cd")){
				sheetObj.SetCellValue(i, "frt_check","1");
				
				//#3973 [JAPT]Invoice Date & Ex.Rate
				//BL entry 에서 넘어오는경우 inv_xcrt_dt 유지한다 				
				if(BL_FRT_YN != 'Y'){
					sheetObj.SetCellValue(i, "inv_xcrt_dt",formObj.f_inv_dt.value);
				}
				amt_tot 	+= roundXL(Number(sheetObj.GetCellValue(i, "inv_amt")),2);
				vatamt_tot 	+= roundXL(Number(sheetObj.GetCellValue(i, "inv_vat_amt")),2);
				totamt_tot 	+= roundXL(Number(sheetObj.GetCellValue(i, "inv_sum_amt")),2);
			}
			sheetObj.SetCellEditable(i, "frt_check",1);

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
		
		formObj.f_amt_tot.value=roundXL(amt_tot,2);
		formObj.f_vatamt_tot.value=roundXL(vatamt_tot,2);
		formObj.f_totamt_tot.value=roundXL(totamt_tot,2);
		// 서울인경우 TAX BILL를 체크한다.(2017.04.19 - 해제)
		/*
		if(formObj.f_ofc_cd.value == "SEL"){
			formObj.f_tax_bill.checked=true;
		}
		*/
		
		//#3249 [FULLTRANS CN]  Default value of currency in the AR Inovice Entry
		if(1 <= sheetObj.RowCount()){
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
	//for(var i=2; i<=sheetObj.LastRow();i++){
	//	sheetObj.CellValue(i, "cntr_tpsz_cd") = sheetObj.CellSearchValue(i, "cntr_tpsz_cd");
	//}
	//천단위 콤마
	//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제
	if(formObj.f_curr_cd.value == 'KRW' || formObj.f_curr_cd.value == 'JPY' || (formObj.f_curr_cd.value=="VND" && vnVatCalRound=="Y")) {
		formObj.f_amt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_amt_tot.value)),0));
		formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_vatamt_tot.value)),0));
		formObj.f_totamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_totamt_tot.value)),0));
	} else {
		formObj.f_amt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_amt_tot.value)),2));
		formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_vatamt_tot.value)),2));
		formObj.f_totamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_totamt_tot.value)),2));
	}
	formObj.rpt_trdp_cd.value=formObj.f_bill_to_cd.value;
	// #20443 [BINEX] User Access control rule,
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

	//LKH::2015-11-03 WMS4.O
	if(gJsWmsVer == 'VER4.0'){
		wmsDocCheck('GRID');
		if(formObj.f_wms_seq.value != ""){
			for(var i=2; i<=sheetObj.LastRow();i++){
				if(sheetObj.GetCellValue(i,"aply_ut_cd") == ""){
					rowout = i;
					ajaxSendPost(getUnitCodeFromClosing, 'reqVal', '&goWhere=aj&bcKey=getUnitCodeFromClosing&f_wms_seq='+formObj.f_wms_seq.value + "&f_frt_seq=" + sheet1.GetCellValue(i,"frt_seq"), './GateServlet.gsl');
				}
			}
			frm1.f_curr_cd.disabled=true;
		}
	}
	//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
	var vPointCount = 3;
	var vEditLen = 12;
	if(gJsWmsVer == 'VER4.0'){
		if(gJsWmsRuPoint == 'Y'){
			if(formObj.f_wms_seq.value != ""){
				// WMS 고도화
				//sheetObj.SetColProperty("qty", {PointCount:5, EditLen:16} );
				vPointCount = 8;
				vEditLen = 19;
			}
		}
		wmsDocCheck('HEAD');
	}
	sheetObj.SetColProperty('ru', {PointCount:vPointCount, EditLen:vEditLen} );

	fnbtnCtl(2);


	
}
function getUnitCodeFromClosing(reqVal){
 	var formObj=document.frm1;
 	var sheetObj=docObjects[0];
 	var doc=getAjaxMsgXML(reqVal);
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			//조회해온 결과를 Parent에 표시함
 			var rtnArr=doc[1].split('@@^');
 			if(rtnArr[0] != "null" && rtnArr[0] != ""){

 				if(UNITCD2.split('|').contains(rtnArr[0]) == false){

 					//#3411 [JTC]Accounting & Performance 수정사항
 					//Unit Code Blank 제거
 					//UNITCD1 = UNITCD1 + "|"+rtnArr[1];
 	 				//UNITCD2 = UNITCD2 + "|"+rtnArr[0];
 					UNITCD1 = rtnArr[1];
 					UNITCD2 = rtnArr[0];

 	 				sheetObj.SetColProperty('aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );

 	 				sheetObj.SetCellValue(rowout,"aply_ut_cd",rtnArr[0],0);
 				}

 			}
 			else{
 				sheetObj.SetColProperty('aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
 			}
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

		formObj.f_inco_cd.value=sheetObj.GetCellValue(2, "inco_cd");
		formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "inv_aply_curr_cd");

		//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제 (S)
		var curr=formObj.f_curr_cd.value;
		var cellInfo;

		if(curr == 'KRW' || curr == 'JPY' || (curr=="VND" && vnVatCalRound=="Y")) {
			cellInfo = {Type:"Float", Hidden:0, Width:80, Align:"Right", ColMerge:1, SaveName:"inv_sum_amt", KeyField:0, CalcLogic:"", Format:"Float", PointCount:0, UpdateEdit:1, InsertEdit:1, EditLen:10};
		} else {
			cellInfo = {Type:"Float", Hidden:0, Width:80, Align:"Right", ColMerge:1, SaveName:"inv_sum_amt", KeyField:0, CalcLogic:"", Format:"Float", PointCount:2, UpdateEdit:1, InsertEdit:1, EditLen:10};
		}

		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			sheetObj.SetCellEditable(i, "frt_check",0);
			sheetObj.SetColBackColor(i, "#EFEBEF");

			if(formObj.f_curr_cd.value == 'KRW' || formObj.f_curr_cd.value == 'JPY' || (formObj.f_curr_cd.value=="VND" && vnVatCalRound=="Y")) {
				sheetObj.InitCellProperty(i, "inv_sum_amt", cellInfo);
				sheetObj.SetCellValue(i, "inv_sum_amt", Number(sheetObj.GetCellValue(i,"inv_sum_amt")));
			}
		}
		//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제 (E)

		formObj.s_bl_no.value="";
		formObj.s_ref_no.value="";
		formObj.s_oth_no.value="";

		//WMS ACCOUNT LKH 2015.01.20
		formObj.s_wms_no.value="";

		formObj.f_remark.value=sheetObj.GetCellValue(2,"inv_rmk");
		formObj.f_frgn_amt.value="";
		formObj.f_frgn_vat_amt.value="";
		formObj.f_frgn_sum_amt.value="";
		formObj.f_old_sum_amt.value=roundXL(Number(formObj.f_totamt_tot.value),2);

		//천단위 콤마
		//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제
		if(formObj.f_curr_cd.value == 'KRW' || formObj.f_curr_cd.value == 'JPY') {
			formObj.f_totamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_totamt_tot.value)),0));
			formObj.f_amt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_amt_tot.value)),0));
			formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_vatamt_tot.value)),0));
		} else {
			formObj.f_totamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_totamt_tot.value)),2));
			formObj.f_amt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_amt_tot.value)),2));
			formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_vatamt_tot.value)),2));
		}

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
		//BILLTO를 변경못하게 한다.
		formObj.f_bill_to_cd.readOnly=true;
		formObj.f_bill_to_cd.className="search_form-disable";
		formObj.f_bill_to_nm.readOnly=true;
		formObj.f_bill_to_nm.className="search_form-disable";
		formObj.billto.onclick="";
		formObj.billto.style.cursor="none";
		//SHIPTO를 변경못하게 한다.
		formObj.f_ship_to_cd.readOnly=true;
		formObj.f_ship_to_cd.className="search_form-disable";
		formObj.f_ship_to_nm.readOnly=true;
		formObj.f_ship_to_nm.className="search_form-disable";
		formObj.shipto.onclick="";
		formObj.shipto.style.cursor="none";
		*/

		/*
		// DEPOSIT, CHECK 등록시 삭제를 불가능하게 한다.
		if(Number(removeComma(formObj.f_paid_amt.value)) != 0){
			deleteBtn1.style.display="none";
			deleteBtn2.style.display="none";
		}
		*/
		//2012/01/30추가
		formObj.old_trdp_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");

		//마감처리를 한다.
		if(sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y"){
			execMagam();

			//CUSTOMER 변경불가
			//BILLTO를 변경못하게 한다.
			formObj.f_bill_to_cd.readOnly=true;
			formObj.f_bill_to_cd.className="search_form-disable";
			formObj.f_bill_to_nm.readOnly=true;
			formObj.f_bill_to_nm.className="search_form-disable";
			formObj.billto.onclick="";
			formObj.billto.style.cursor="none";
			//SHIPTO를 변경못하게 한다.
			formObj.f_ship_to_cd.readOnly=true;
			formObj.f_ship_to_cd.className="search_form-disable";
			formObj.f_ship_to_nm.readOnly=true;
			formObj.f_ship_to_nm.className="search_form-disable";
			//formObj.shipto.onclick="";
			//formObj.shipto.style.cursor="none";
			//formObj.f_bill_to_cd.onblur		 = "";
		}

		//#2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.f_inv_no.value);
	}
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){

		//alert('FMS_COM_NTYCOM');
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();

		if(formObj.f_cmd.value == COMMAND02){
			doWork("PRINT");
		}
		if(formObj.f_cmd.value == COMMAND03){
			doWork("SPLIT_OPEN");
		}
	}
	//doWork("SEARCHLIST");
	// #20443 [BINEX] User Access control rule,
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

	//LKH::2015-11-03 WMS4.O
	if(gJsWmsVer == 'VER4.0'){
		wmsDocCheck('GRID');
		if(formObj.f_wms_seq.value != ""){
			frm1.f_curr_cd.disabled=true;
		}
	}
}


function sheet4_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	doHideProcess();
	if(errMsg == undefined  || errMsg==null || errMsg == ""){
		if(formObj.f_cmd.value=="11" ){
			showCompleteProcess();
		}
	}
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
        case "frt_check" :
        	if(sheetObj.GetCellEditable(Row, "frt_check")){
        		if(sheetObj.GetCellValue(Row,"del_chk") == "1"){
            		sheetObj.SetCellValue(Row,"del_chk","0",0);
            	}
        	}
        	if(formObj.f_bill_to_cd.value == ""){
        		//[Bill To.] is mandatory field.
        		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BLTO'));
        		formObj.f_bill_to_cd.focus();
        		sheetObj.SetCellValue(Row,"frt_check","1");
        	}else{
        		/*var amt_sum=0;
	        	var vat_amt_sum=0;
	        	var tot_amt_sum=0;
	        	if(sheetObj.GetCellEditable(Row, "frt_check")){
	        		if(sheetObj.GetCellValue(Row,"del_chk") == "1"){
	            		sheetObj.SetCellValue(Row,"del_chk","0",0);
	            	}
					if(sheetObj.GetCellValue(Row,"frt_check") == "0"){
						formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_amt"));
						formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
						formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
	            	}else{
						formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_amt"));
						formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
						formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
	            	}
	            	formObj.f_amt_tot.value=doMoneyFmt(roundXL(Number(formObj.f_amt_tot.value),2).toFixed(2));
	            	formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(Number(formObj.f_vatamt_tot.value),2).toFixed(2));
	            	formObj.f_totamt_tot.value=doMoneyFmt(roundXL(Number(formObj.f_totamt_tot.value),2).toFixed(2));
	        	}*/
	        	/* 2012/02/09 주석처리함
	        	sheetObj.SetCellValue(Row, "rat_curr_cd",formObj.f_curr_cd.value);
				sheetObj.SetCellValue(Row, "inv_xcrt",1);
    			*/
        	}
        	/* 2012/01/30 주석처리함
        	if(formObj.f_bill_to_cd.value == ""){
				//[Bill To.] is mandatory field.
        		alert(getLabel('FMS_COM_ALT007'));
        		formObj.f_bill_to_cd.focus();
        		sheetObj.SetCellValue(Row,"frt_check","1");
        	}else{
if(formObj.f_bill_to_cd.value == sheetObj.GetCellValue(Row, "trdp_cd")){
    	        	var amt_sum=0;
    	        	var vat_amt_sum=0;
    	        	var tot_amt_sum=0;
    	        	if(sheetObj.GetCellEditable(Row, "frt_check")){
if(sheetObj.GetCellValue(Row,"del_chk") == "1"){
    	            		sheetObj.SetCellValue(Row,"del_chk","0",0);
    	            	}
if(sheetObj.GetCellValue(Row,"frt_check") == "0"){
formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_amt"));
formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
    	            	}else{
formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_amt"));
formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
    	            	}
    	            	formObj.f_amt_tot.value=doMoneyFmt(roundXL(Number(formObj.f_amt_tot.value),2).toFixed(2));
    	            	formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(Number(formObj.f_vatamt_tot.value),2).toFixed(2));
    	            	formObj.f_totamt_tot.value=doMoneyFmt(roundXL(Number(formObj.f_totamt_tot.value),2).toFixed(2));
    	        	}
    	        	sheetObj.SetCellValue(Row, "rat_curr_cd",formObj.f_curr_cd.value);
    				sheetObj.SetCellValue(Row, "inv_xcrt",1);
            	}else{
            		//alert Check the Customer Info of selected row.
            		sheetObj.SetCellValue(Row,"frt_check","1");
            	}
        	}
        	*/
        	break;
        case "del_chk" :
        	if(sheetObj.GetCellValue(Row,"frt_check") == "1"){
        		//LKH::2015-11-03 WMS4.O
        		//sheetObj.SetCellValue(Row,"frt_check","0",0);
        		if(gJsWmsVer == 'VER4.0'){
        			if(formObj.f_wms_seq.value == ""){
        				sheetObj.SetCellValue(Row,"frt_check","0");
        			}
        		}else{
        			sheetObj.SetCellValue(Row,"frt_check","0");
        		}
        	}
        	/*	[20140112 OJG]
			if(sheetObj.GetCellValue(Row, "ibflag") == "I"){
        		// sheetObj.SetCellValue(Row, "del_chk", "0", 0)	;
    			sheetObj.RowDelete(Row,false);
    		}
			*/
    		break;
		/*
        case "del_chk" :
        	//마감이나 PAID 처리 안되었을때만 실행한다.
if(sheetObj.GetCellValue(2, "clt_cmpl_flg") != "Y" && Number(removeComma(formObj.f_paid_amt.value)) == 0){
if(sheetObj.GetCellValue(Row,"inv_seq") != ""){
					var amt_sum=0;
			    	var vat_amt_sum=0;
			    	var tot_amt_sum=0;
if(sheetObj.GetCellValue(Row,"del_chk") == "0"){
formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_amt"));
formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
			    	}else{
formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_amt"));
formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
			    	}
				}else{
if(sheetObj.GetCellValue(Row,"del_chk") == "0"){
		        		if(Number(removeComma(formObj.f_amt_tot.value)) > 0 && formObj.f_amt_tot.value != ""){
formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_amt"));
		            	}
		            	if(Number(removeComma(formObj.f_vatamt_tot.value)) > 0 && formObj.f_vatamt_tot.value != ""){
formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
		            	}
		            	if(Number(removeComma(formObj.f_totamt_tot.value)) > 0 && formObj.f_totamt_tot.value != ""){
formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
		            	}
		        	}else{
if(sheetObj.GetCellValue(Row,"frt_check") == "1"){
formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_amt"));
formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
		        		}
		        	}
				}
	        	formObj.f_amt_tot.value=doMoneyFmt(formObj.f_amt_tot.value);
	        	formObj.f_vatamt_tot.value=doMoneyFmt(formObj.f_vatamt_tot.value);
	        	formObj.f_totamt_tot.value=doMoneyFmt(formObj.f_totamt_tot.value);
if(sheetObj.GetCellValue(Row,"frt_check") == "1"){
	        		sheetObj.SetCellValue(Row,"frt_check","0");
	        	}
if(sheetObj.GetCellValue(Row, "ibflag") == "I"){
	    			sheetObj.RowDelete(Row,false);
	    			return;
	    		}
	        	for(var i=2; i<=sheetObj.LastRow(); i++){
	    			//sheetObj.CellValue(i,"frt_check") = "0";
	    		}
    		}
		break;
		*/
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

//이함수 의미 없는거 같은데
function sheet1_OnPopupClick(sheetObj, row, col){
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	//Freight Code조회
	if(colStr == "frt_cd"){
   		rtnary=new Array(6);
   		rtnary[0]="";
   		rtnary[1]="";
   		rtnary[2]="";
   		rtnary[3]="";
   		rtnary[4]="";
   		rtnary[5]="Y";
        var rtnVal=window.showModalDialog('./CMM_POP_0070.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, "frt_cd",rtnValAry[0]);
			sheetObj.SetCellValue(row, "frt_cd_nm",rtnValAry[1]);
			sheetObj.SetCellValue(row, "vat_rt",rtnValAry[2]);
			//기존 입력값 초기화
			//sheetObj.CellValue(row, "cntr_tpsz_cd") = '';
			//sheetObj.CellValue(row, "qty")     		= '';
			//sheetObj.CellValue(row, "vat_amt") 		= '';
			//sheetObj.CellValue(row, "inv_amt") 		= '';
			//sheetObj.CellValue(row, "inv_vat_amt") 	= '';
			frm1.f_curRow.value=row;
			/*
			var parmStr='&goWhere=aj&bcKey=searchMyTaxRate';
			parmStr += '&f_frt_cd='+rtnValAry[0];
			ajaxSendPost(setTaxRate,  'reqVal', parmStr, './GateServlet.gsl');
			*/
		}
    //Buying/Credit인 경우 Invoice 환률을 선택한다.
	}else if(colStr == "rat_curr_cd"){
    	rtnary=new Array(1);
   		rtnary[0]="1";
        var rtnVal=window.showModalDialog('./CMM_POP_0040.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px");
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
   			alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_CURR'));
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
		paramStr+= '&f_trdp_cd='+frm1.f_bill_to_cd.value;
		paramStr+= '&f_trdp_nm='+frm1.f_bill_to_nm.value;
   		var rtnVal=window.showModalDialog('./CMM_POP_0220.clt'+paramStr, rtnary, "scroll:yes;status:no;help:no;dialogWidth:750px;dialogHeight:600px");
   		if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
		 	return;
		}
   		else{
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
    		//sheetObj.SetCellValue(row, 'del_chk',0,0);
			sheetObj.RowDelete(row,false);
		}
	}
	//---------------------[20140112 GOJ]-----------------------------
	if(colStr == "frt_cd"){
		var frt_cd=sheetObj.GetCellValue(row, 'frt_cd');
		//doAutoSearch(sheetObj, row, 'frt_cd', 'freight', codeStr, 'frt_cd', 'frt_cd_nm');
		SELECTROW=row;
		if(frt_cd != ""){
			// #20942 frt_cd 의 특수문자 대응(& )
			//frt_cd=frt_cd.replace(/&/g,"%26");
			// #48954 - [BNX] BILLING CODE 불러오는데 NAME 자동으로 안 따라옴
			frt_cd=escape(frt_cd);
			/* #20645 : [BINEX]G/L Validation jsjang 2013.09.10 */
			//ajaxSendPost(getInvFrtcd, 'reqVal', '&goWhere=aj&bcKey=getInvFrtcd&frt_cd='+frt_cd, './GateServlet.gsl');

			//#1773 [PATENT] Freight Default Unit Option
		    var param='&air_sea_clss_cd=' + formObj.f_air_sea_clss_cd.value;
			param += '&frt_ofc_cd=' + formObj.f_ref_no_dtl.value;
			param += '&tabStr=';
			if(formObj.f_air_sea_clss_cd.value=="S"){
				param += '&frt_shp_mod=' + formObj.f_shp_mod_cd.value;
			}
			ajaxSendPost(getInvFrtBillingcd, 'reqVal', '&goWhere=aj&bcKey=getInvFrtBillingcd&frt_cd='+frt_cd+param, './GateServlet.gsl');
		}
		else{
			sheetObj.SetCellValue(row, "frt_cd","");
			sheetObj.SetCellValue(row, "frt_cd_nm","");
			sheetObj.SetCellValue(row, "vat_rt","");
			// #1098 [BNX] INDIA 오피스 - 요구사항 항목
			sheetObj.SetCellValue(row, "vat_rt1","");
			sheetObj.SetCellValue(row, "vat_rt2","");
			// VAT CODE 초기화
			sheetObj.SetCellValue(row, "vat_rt_cd","");
			// #1098 [BNX] INDIA 오피스 - 요구사항 항목
			sheetObj.SetCellValue(row, "vat_rt_cd1","");
			sheetObj.SetCellValue(row, "vat_rt_cd2","");
			sheetObj.SetCellValue(row, "whld_vat_rt","");
		}
	}

	// #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
	if(tax_mgmt_use == "Y"){
		if(colStr == "vat_rt_cd"){
			SELECTROW = row;
			var vat_rt_cd=sheetObj.GetCellValue(row, 'vat_rt_cd');
			//VAT CODE정보로 TAX RATE 정보 조회
			ajaxSendPost(getTaxRateFrVatcd, 'reqVal', '&goWhere=aj&bcKey=getTaxRateFrVatcd&vat_rt_cd='+vat_rt_cd, './GateServlet.gsl');
		}

		if(colStr == "vat_rt_cd1"){
			setVatCodeNo = "1";
			SELECTROW = row;
			var vat_rt_cd=sheetObj.GetCellValue(row, 'vat_rt_cd1');
			// VAT CODE정보로 TAX RATE 정보 조회
			ajaxSendPost(getTaxRateFrVatcd, 'reqVal', '&goWhere=aj&bcKey=getTaxRateFrVatcd&vat_rt_cd='+vat_rt_cd, './GateServlet.gsl');
		}

		if(colStr == "vat_rt_cd2"){
			setVatCodeNo = "2";
			SELECTROW = row;
			var vat_rt_cd=sheetObj.GetCellValue(row, 'vat_rt_cd2');
			// VAT CODE정보로 TAX RATE 정보 조회
			ajaxSendPost(getTaxRateFrVatcd, 'reqVal', '&goWhere=aj&bcKey=getTaxRateFrVatcd&vat_rt_cd='+vat_rt_cd, './GateServlet.gsl');
		}
	}

	/*
	 * Currency에 의해 금액 결과값의 포맷이 달라짐
	 * KRW, JPY은 소수점이 없는 금액임
	 * Math.round 처리함
	 */
	// 2012/03/07 FREIGHT의 CURR에서 INVOICE의 CURR로 변경
	//var curr = sheetObj.CellValue(row, "rat_curr_cd");
	//var curr=formObj.f_curr_cd.value;
	/*	[20131223 OJG] INVOICE 금액 계산 마지막으로 이동.
	if(colStr == "qty"){
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * Number(sheetObj.GetCellValue(row, "ru")));
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row, "ru")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100));
		if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "inv_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
		}else{
sheetObj.SetCellValue(row, "inv_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	if(colStr == "ru"){
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * Number(sheetObj.GetCellValue(row, "ru")));
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row, "ru")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100));
		if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "inv_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
		}else{
sheetObj.SetCellValue(row, "inv_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	if(colStr == "vat_rt"){
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * Number(sheetObj.GetCellValue(row, "ru")));
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row, "ru")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100));
		if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "inv_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
		}else{
sheetObj.SetCellValue(row, "inv_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	if(colStr == "inv_xcrt"){
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * Number(sheetObj.GetCellValue(row, "ru")));
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row, "ru")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100));
		if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "inv_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
		}else{
sheetObj.SetCellValue(row, "inv_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	*/
	/*
	if(colStr == "inv_vat_amt"){
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * Number(sheetObj.GetCellValue(row, "ru")));
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row, "ru")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100));
		if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "inv_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
		}else{
sheetObj.SetCellValue(row, "inv_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	*/
	if(colStr == "rat_curr_cd"){
		/*  [20131223 OJG] INVOICE 금액 계산 마지막으로 이동.
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty")) * Number(sheetObj.GetCellValue(row, "ru")));
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row, "ru")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100));
		if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "inv_amt",Math.round( Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
		}else{
sheetObj.SetCellValue(row, "inv_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt")));
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
		*/
		//var codeStr=sheetObj.GetCellValue(row, 'rat_curr_cd');
		//결과를 표시할 Col을 초기화함
		/*doAutoSearch(sheetObj, row, col, 'currency', codeStr, 'rat_curr_cd', '');	//[20140121 OJG] 환율정보 조회시 버그수정(코드만 있으면됨)
		// 변경환율을 끌고온다. INVVOICE의 CURR_CD와 다를시 POST_DATE 기준의 일환율을 가져오고
		// 일환율이 없을경우 월환율을 가지고 온다.
		// RAT_CURR_CD = FROM_CURR, INV_CURR_CD = TO_CURR로 계산한다.
		if(formObj.f_curr_cd.value != sheetObj.GetCellValue(row, "rat_curr_cd")){
			var postDt=formObj.f_post_dt.value.replaceAll("-","");
			//해당일자의 월 1일을 구한다.
			var frDt=postDt.substring(0,2) + "01" + postDt.substring(4,8);
			//해당일자의 월 말일을 구한다.
			var toDt=getEndDate(formObj.f_post_dt.value).replaceAll("-","");
			var frCurr=sheetObj.GetCellValue(row, "rat_curr_cd");
			var toCurr=formObj.f_curr_cd.value;
			SELECTROW=row;
			ajaxSendPost(getCurrExch, 'reqVal', '&goWhere=aj&bcKey=getCurrExch&postDt=' + postDt + '&frDt=' + frDt + '&toDt=' + toDt + '&frCurr='+frCurr+'&toCurr='+toCurr, './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(row, "inv_xcrt",1);
		}*/
		//#4020 (JAPT) invoice Ex.date, rate validation, amount  추가
		setExRate(row,"");
	}
	if(colStr == "inv_amt"){
		sheetObj.SetCellValue(row, "inv_sum_amt", Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	if(colStr == "inv_vat_amt"){
		sheetObj.SetCellValue(row, "inv_sum_amt", Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	var air_sea_clss_cd=formObj.f_air_sea_clss_cd.value;
	var bnd_clss_cd=formObj.f_bnd_clss_cd.value;
	var biz_clss_cd=formObj.f_biz_clss_cd.value;
	if(colStr == "aply_ut_cd"){
		if(air_sea_clss_cd=="S"){
			//Container인 경우 TP/SZ활성화
			if(sheetObj.GetCellValue(row, "aply_ut_cd")=='SCN'){
				if(docObjects[2].LastRow()+1==1){
				    alert(getLabel('ACC_MSG113'));
				    sheetObj.SetCellValue(row, "aply_ut_cd","HBL");
					return;
				}
				sheetObj.SetCellEditable(row, "cntr_tpsz_cd",1);
				var cntrTpsz="";
				var cntrCnt=0;
				for(var i=1 ; i<docObjects[2].LastRow()+1 ; i++){
				    var qtyCnt=0;
				    for(var j=2 ; j<sheetObj.LastRow()+1 ; j++){
					   if( j != row
							   && sheetObj.GetCellValue(j, "aply_ut_cd") == 'SCN'
								   && sheetObj.GetCellValue(j, "cntr_tpsz_cd") == docObjects[2].GetCellValue(i, 0)
								   		&& sheetObj.GetCellText(j, "frt_cd") == sheetObj.GetCellText(row, "frt_cd")){
						   qtyCnt += sheetObj.GetCellValue(j, "qty");
					   }
					}
				    if(docObjects[2].GetCellValue(i, 1) - qtyCnt > 0){
				    	cntrTpsz=docObjects[2].GetCellValue(i, 0);
				    	cntrCnt=docObjects[2].GetCellValue(i, 1)-qtyCnt;
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
			//var curCellbuyTpCd = sheetObj.CellValue(row, "sell_buy_tp_cd");//dc 조건
			if(curGetCellText==''){
				sheetObj.SetCellValue(row, "qty",'');
				sheetObj.SetCellValue(row, "trf_cur_sum_amt",'');
			}else{
				var minNum=0;
				if(curGetCellText.length>1){
					for(var i=2; i < sheetObj.LastRow()+1; i++){
						if(i!=row){
							//동일한 Freight Code에 동일한  Container Size가 사용되었는지 확인함
							if(sheetObj.GetCellValue(i, "aply_ut_cd") == 'SCN'
								 && curFrtCd==sheetObj.GetCellText(i, "frt_cd")
									&&curGetCellText==sheetObj.GetCellText(i, "cntr_tpsz_cd")){
								minNum=minNum+parseInt(sheetObj.GetCellValue(i, "qty"));	//qty
							}
						}
					}
				}
				//이미 선택되었는지 확인한다.
				var curNum=0;
				var cntrSheet=docObjects[2];
				for(var i=1; i < cntrSheet.LastRow()+1; i++){
					if(curGetCellText==cntrSheet.GetCellValue(i, 0)){
						curNum=cntrSheet.GetCellValue(i, 1);
						break;
					}
				}
				var cntrQty=parseInt(curNum)-minNum;
				if(cntrQty>0){
					sheetObj.SetCellValue(row, "qty",cntrQty);
				}else{
					sheetObj.SetCellValue(row,  "qty",'');
					sheetObj.SetCellValue(row,  "trf_cur_sum_amt",'');
				    sheetObj.SetCellValue(row, "cntr_tpsz_cd",'',0);
					//Selected \"Type/Size\" is already in use.\n\n\Please select other \"Type/Size\".
				    alert(getLabel('ACC_MSG111'));
				}
			}
		}
	}
	if(MULTI_CURR_FLAG == "N" || (MULTI_CURR_FLAG == "Y" && colStr != "inv_sum_amt") ){
		var curr=formObj.f_curr_cd.value;
		//[20131223 OJG] INVOICE 금액계산.
		// #1143 [WMS4.0]Closing 금액 vs Invoice 금액 difference
		var inv_amt = Number(sheetObj.GetCellValue(row, "qty")) * Number(sheetObj.GetCellValue(row, "ru"));
		var invSumAmt = Number(sheetObj.GetCellValue(row, "qty")) * Number(sheetObj.GetCellValue(row, "ru")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"));
		//Great Luck Test #21
		if(colStr == "qty" || colStr=="ru" || colStr == "inv_xcrt"||colStr=="aply_ut_cd"){
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
			
			if(formObj.f_wms_seq.value != ""){
				if(gJsWmsVer == 'VER4.0'){
					sheetObj.SetCellValue(row, "trf_cur_sum_amt", Number(sheetObj.GetCellValue(row, "inv_amt")),0);
				} else {
//						#1638 [ACL]POLAND - Discrepancy Amount Due between A/R Invoice Entry  and Print Invoice
					sheetObj.SetCellValue(row, "trf_cur_sum_amt", roundTo(inv_amt,2),0);
				}
			} else {
//					#1638 [ACL]POLAND - Discrepancy Amount Due between A/R Invoice Entry  and Print Invoice
				sheetObj.SetCellValue(row, "trf_cur_sum_amt", roundTo(inv_amt,2),0);
			}
			//vat_amt, inv_vat_amt 계산로직 삭제 YJW 2015-07-14
			//sheetObj.SetCellValue(row, "vat_amt", Number(sheetObj.GetCellValue(row, "ru")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100),0);
			if(curr=="KRW" || curr=="JPY" || (curr=="VND" && vnVatCalRound=="Y")){
				sheetObj.SetCellValue(row, "inv_amt", roundTo(invSumAmt,0),0);
				//sheetObj.SetCellValue(row, "inv_vat_amt", Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))),0);
			}else{
//					#1638 [ACL]POLAND - Discrepancy Amount Due between A/R Invoice Entry  and Print Invoice
				sheetObj.SetCellValue(row, "inv_amt", roundTo(invSumAmt,2),0);
				//sheetObj.SetCellValue(row, "inv_vat_amt", Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100) * Number(sheetObj.GetCellValue(row, "inv_xcrt")),0);
			}
			//sheetObj.SetCellValue(row, "inv_sum_amt", Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")),0);
			
			
			//LKH - 2017-10-19 :: WMS4.0 경우 Closing 운임이 Sum 으로 넘어 오면서 소수점 끝전 맞지 않는 오류 수정(WMS4.0경우 qty * Rate 재계산 하지 않도록 수정함)
			if(formObj.f_wms_seq.value != ""){
				if(gJsWmsVer == 'VER4.0'){
					invSumAmt = Number(sheetObj.GetCellValue(row, "inv_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"));
				}
			}
			if(curr=="KRW" || curr=="JPY" || (curr=="VND" && vnVatCalRound=="Y")){
				sheetObj.SetCellValue(row, "inv_sum_amt", roundTo(invSumAmt,0), 0);
			}else{
				sheetObj.SetCellValue(row, "inv_sum_amt", roundTo(invSumAmt,2), 0);
				if(vnVatCalRound!="Y")
					sheetObj.SetCellValue(row, "inv_amt", Number(invSumAmt).toFixed(2), 0);
			}
			//sheetObj.SetCellValue(row, "inv_sum_amt", Number(sheetObj.GetCellValue(row, "inv_amt")),0);
		}
		
	}else if(MULTI_CURR_FLAG == "Y" && colStr == "inv_sum_amt"){
		sheetObj.SetCellValue(row, "inv_amt",sheetObj.GetCellValue(row, "inv_sum_amt"),0);
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
//					sheetObj.SetCellValue(i, "inv_xcrt", sheetObj.GetCellValue(row, "inv_xcrt"));
//				}
//			}
		}
	//}

	if(formObj.f_inv_seq.value != ""){
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for(var i=2; i<=sheetObj.LastRow(); i++){
			if(sheetObj.GetCellValue(i,"del_chk") == "1"){
				//amt_tot 	= Number(sheetObj.CellValue(i, "inv_amt"));
				//vatamt_tot 	= Number(sheetObj.CellValue(i, "inv_vat_amt"));
				//totamt_tot 	= Number(sheetObj.CellValue(i, "inv_sum_amt"));
			}else{
				if (!(sheetObj.GetCellValue(i, "ibflag") == "I" && sheetObj.GetCellValue(i, "frt_check") == "0")) {
					amt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_amt"));
					vatamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
					totamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
				}
			}
		}
		if(formObj.f_curr_cd.value == 'KRW' || formObj.f_curr_cd.value == 'JPY' || (formObj.f_curr_cd.value=="VND" && vnVatCalRound=="Y")) {
			formObj.f_amt_tot.value=doMoneyFmt(roundXL(amt_tot,0));
			formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(vatamt_tot,0));
			formObj.f_totamt_tot.value=doMoneyFmt(roundXL(totamt_tot,0));
		} else {
			formObj.f_amt_tot.value=doMoneyFmt(roundXL(amt_tot,2));
			formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(vatamt_tot,2));
			formObj.f_totamt_tot.value=doMoneyFmt(roundXL(totamt_tot,2));
		}
	}else{
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for(var i=2; i<=sheetObj.LastRow(); i++){
			if(sheetObj.GetCellValue(i,"frt_check") == "1"){
				amt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_amt"));
				vatamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
				totamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
			}
		}

		if(formObj.f_curr_cd.value == 'KRW' || formObj.f_curr_cd.value == 'JPY' || (formObj.f_curr_cd.value=="VND" && vnVatCalRound=="Y")) {
			formObj.f_amt_tot.value=doMoneyFmt(roundXL(amt_tot,0));
			formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(vatamt_tot,0));
			formObj.f_totamt_tot.value=doMoneyFmt(roundXL(totamt_tot,0));
		} else {
			formObj.f_amt_tot.value=doMoneyFmt(roundXL(amt_tot,2));
			formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(vatamt_tot,2));
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
	/*
	for(var i=2;i<=sheetObj.LastRow();i++){
		//INVOICE생성후 데이터
		if(formObj.f_inv_seq.value != ""){
if(sheetObj.GetCellValue(i, "del_chk") != "1"){
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
		//INVOICE생성전 데이터
		}else{
		}
	}
	*/
	for(var i=2;i<=sheetObj.LastRow();i++){
		//INVOICE생성후 데이터
		if(formObj.f_inv_seq.value != ""){
if(sheetObj.GetCellValue(i, "del_chk") != "1"){
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
//=======참고====================
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
            cal.select(formObj.f_inv_dt, 'MM-dd-yyyy');
        break;
        case 'DATE3':    //달력 조회 팝업 호출
            var cal=new ComCalendar();
            cal.select(formObj.f_due_dt,  'MM-dd-yyyy');
        break;
        case 'DATE4':    //달력 조회 팝업 호출
            var cal=new ComCalendar();
            cal.select(formObj.f_last_paid_dt_cal,  'MM-dd-yyyy');
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
		if(ComGetEvent("keycode") == 13 || isBtn == 'Y'){
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
		if(ComGetEvent("keycode") == 13 || isBtn == 'Y'){
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
		if(ComGetEvent("keycode") == 13 || isBtn == 'Y'){
			formObj.f_inv_seq.value="";
			formObj.s_inv_no.value="";
			clearChkVal();
			ajaxSendPost(getOtherInfo, 'reqVal', '&goWhere=aj&bcKey=getOtherInfo&s_oth_no='+formObj.s_oth_no.value+'&ofc_cd='+formObj.f_ofc_cd.value, './GateServlet.gsl');
		}
	}
}
//WMS ACCOUNT LKH 2015.01.20
function enterWarehouseInfo(isBtn){
	var formObj=document.frm1;
	if(formObj.s_wms_no.value != ""){
		if(ComGetEvent("keycode") == 13 || isBtn == 'Y'){
			formObj.f_inv_seq.value="";
			formObj.s_inv_no.value="";
			clearChkVal();
			ajaxSendPost(getWarehouseInfo, 'reqVal', '&goWhere=aj&bcKey=getWarehouseInfo&s_wms_no='+formObj.s_wms_no.value+'&ofc_cd='+formObj.f_ofc_cd.value, './GateServlet.gsl');
		}
	}
}
function enterInvInfo(isBtn){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value != ""){
		if(ComGetEvent("keycode") == 13 || isBtn == 'Y'){
			formObj.s_bl_no.value="";
			clearChkVal();
			ajaxSendPost(getInvInfo, 'reqVal', '&goWhere=aj&bcKey=getInvInfo&s_inv_no='+formObj.s_inv_no.value+'&ofc_cd='+formObj.f_ofc_cd.value+'&type1=S&type2=S', './GateServlet.gsl');
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
				//alert(rtnArr[5]);
				//alert(formObj.jo_flg.value);
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

				//WMS ACCOUNT LKH 2015.01.20
				frm1.s_wms_no.value="";
				frm1.f_wms_seq.value="";

				doWork("DEFAULT");
			}else{
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
	}else{
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
				//alert(rtnArr[5]);
				//alert(formObj.jo_flg.value);
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

				//WMS ACCOUNT LKH 2015.01.20
				frm1.s_wms_no.value="";
				frm1.f_wms_seq.value="";

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
	}else{
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

				//WMS ACCOUNT LKH 2015.01.20
				frm1.s_wms_no.value="";
				frm1.f_wms_seq.value="";

				doWork("DEFAULT");
			}else{
				frm1.f_oth_seq.value="";
				frm1.s_oth_no.value="";
				clearAll();
				formObj.s_oth_no.focus();
			}
		}
	}else{
		//SEE_BMD_MSG43
	}
}

//WMS ACCOUNT LKH 2015.01.20
function getWarehouseInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				/* #21736 jsjang 21013.11.18 */
				if(rtnArr[2] != "null" && rtnArr[2] != "" && rtnArr[2] == "B" && formObj.jo_flg.value != "Y"){
					return;
				}
				frm1.f_wms_seq.value=rtnArr[0];
				frm1.s_wms_no.value=rtnArr[1];
				frm1.f_intg_bl_seq.value="";
				frm1.s_bl_no.value="";
				frm1.f_bl_no.value="";
				frm1.f_biz_clss_cd.value="";
				frm1.f_air_sea_clss_cd.value="";
				frm1.f_bnd_clss_cd.value="";

				frm1.f_oth_seq.value="";
				frm1.s_oth_no.value="";
				//LKH::2015-11-03 WMS4.O
				if(gJsWmsVer == 'VER4.0'){
					clearAll();
					frm1.s_wms_no.value=rtnArr[1];
					formObj.s_wms_no.focus();
				}else{
					doWork("DEFAULT");
				}

			}else{
				frm1.f_wms_seq.value="";
				frm1.s_wms_no.value="";
				clearAll();
				formObj.s_wms_no.focus();
			}
		}
	}else{
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

					//WMS ACCOUNT LKH 2015.01.20
					frm1.s_wms_no.value="";
					frm1.f_wms_seq.value="";

					doWork("DEFAULT");
				}
				else{
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
					var intRows=docObjects[2].LastRow()+1;
					docObjects[2].DataInsert(intRows);
					docObjects[2].SetCellValue(intRows, 0,tp_sz_arr[0]);
					docObjects[2].SetCellValue(intRows, 1,tp_sz_arr[1]);
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
				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm",rtnArr[3]);//local, ap는 frt_cd의 locl_nm를 가져온다.
				sheetObj.SetCellValue(SELECTROW, "vat_rt",rtnArr[2]);
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
 	 			//if(rtnArr[4] == "")
 	 			//{
 	 			var gl_cost=rtnArr[4];
 	 			if (gl_cost == "" || gl_cost == "undefined" || gl_cost == undefined) {
 	 				/*
 	 				sheetObj.SetCellValue(SELECTROW, "frt_cd","");
 	 				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm","");
 	 				sheetObj.SetCellValue(SELECTROW, "vat_rt","");
 	 				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_BILLREV'));
 	 				return;
 	 				*/
 					var parArr=new Array(2);
 					parArr[0]=getLabel('FMS_COD_BILLREV');
 					parArr[1]=rtnArr[0]+" - "+rtnArr[1];
 					alert(getLabel2('ACC_MSG110',parArr));
 					sheetObj.SetCellValue(SELECTROW, 'frt_cd',"");
 					sheetObj.SelectCell(SELECTROW, 'frt_cd');
 					return;
 	 			}else{
 	 				//#2131 [BINEX V442] NO G/L MAPPING, BUT CAN ISSUE INVOICE USING BILLING CODE
 	 				ajaxSendPost(checkUseGlCode, 'reqVal', '&goWhere=aj&bcKey=checkUseGlCode&s_gl_cd='+gl_cost+'&s_bill_cd='+escape(sheetObj.GetCellValue(SELECTROW, 'frt_cd'))+'&invType=AR', './GateServlet.gsl');
 	 				if(!useGlCode){sheetObj.SetCellValue(SELECTROW, "frt_cd", ""); return;}

	 				sheetObj.SetCellValue(SELECTROW, "frt_cd",rtnArr[0]);
	 				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm",rtnArr[3]);//local, ap는 frt_cd의 locl_nm를 가져온다.
	 				sheetObj.SetCellValue(SELECTROW, "vat_rt",rtnArr[2]);
	 				sheetObj.SetCellValue(SELECTROW, "whld_vat_rt",rtnArr[7]);
	 				// VAT CODE ADD
	 				sheetObj.SetCellValue(SELECTROW, "vat_rt_cd",rtnArr[8]);

	 				sheetObj.SetCellValue(SELECTROW, "vat_rt1",rtnArr[10]);
	 				sheetObj.SetCellValue(SELECTROW, "vat_rt2",rtnArr[11]);

	 				sheetObj.SetCellValue(SELECTROW, "vat_rt_cd1",rtnArr[12]);
	 				sheetObj.SetCellValue(SELECTROW, "vat_rt_cd2",rtnArr[13]);

	 				// VAT Code가 등록 되지 않았을 경우, Alert
	 				if (tax_mgmt_use == "Y" && rtnArr[2] > 0 && rtnArr[8] == "") {
						var objArr = new Array();
						objArr[0] = rtnArr[0];
						objArr[1] = rtnArr[3];
						objArr[2] = rtnArr[2];
	 					alert(getLabel2('FMS_COM_ALT086', objArr));
	 					sheetObj.SetCellValue(SELECTROW, "vat_rt",0);
	 				}

	 				// VAT Code1가 등록 되지 않았을 경우, Alert
	 				if (2 <= tax_opt && tax_mgmt_use == "Y" && rtnArr[10] > 0 && rtnArr[12] == "") {
						var objArr = new Array();
						objArr[0] = rtnArr[0];
						objArr[1] = rtnArr[3];
						objArr[2] = rtnArr[10];
	 					alert(getLabel2('FMS_COM_ALT086', objArr));
	 					sheetObj.SetCellValue(SELECTROW, "vat_rt1",0);
	 				}

	 				// VAT Code2가 등록 되지 않았을 경우, Alert
	 				if (3 == tax_opt && tax_mgmt_use == "Y" && rtnArr[11] > 0 && rtnArr[13] == "") {
						var objArr = new Array();
						objArr[0] = rtnArr[0];
						objArr[1] = rtnArr[3];
						objArr[2] = rtnArr[11];
	 					alert(getLabel2('FMS_COM_ALT086', objArr));
	 					sheetObj.SetCellValue(SELECTROW, "vat_rt2",0);
	 				}

 	 			}

 	 			if(rtnArr[9] == 'N'){
 	 				sheetObj.SetCellValue(SELECTROW, "vat_rt_cd","");

 	 				sheetObj.SetCellValue(SELECTROW, "vat_rt_cd1","");
 	 				sheetObj.SetCellValue(SELECTROW, "vat_rt_cd2","");

 	 				sheetObj.SetCellValue(SELECTROW, "vat_rt1",0);
 	 				sheetObj.SetCellValue(SELECTROW, "vat_rt2",0);
// 	 				sheetObj.SetCellValue(SELECTROW, "tax_flg","N");
 	 			}else{
// 	 				sheetObj.SetCellValue(SELECTROW, "tax_flg","Y");
 	 			}
 	 			//#1773 [PATENT] Freight Default Unit Option
 	 			if (rtnArr[14]!= "" && rtnArr[14]!= "null"){
	 	 			sheetObj.SetCellValue(SELECTROW, "aply_ut_cd",rtnArr[14]);
	 	 		}
 	 			//#1774 [Split - 1] [PATENT] Freight Default Unit Option
 	 			if (rtnArr[14]!= "" && rtnArr[14]!= "null"){
 	 				sheetObj.SetCellValue(SELECTROW, "ru",rtnArr[15]);	//sell_buy_rate
	 	 		}else{
	 	 			sheetObj.SetCellValue(SELECTROW, "ru",0);	//sell_buy_rate
	 	 		}
 			}else{
 				sheetObj.SetCellValue(SELECTROW, "frt_cd","");
 				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm","");
 				sheetObj.SetCellValue(SELECTROW, "vat_rt","");
 				// #1098 [BNX] INDIA 오피스 - 요구사항 항목
 				sheetObj.SetCellValue(SELECTROW, "vat_rt1","");
 				sheetObj.SetCellValue(SELECTROW, "vat_rt2","");
 				sheetObj.SetCellValue(SELECTROW, "whld_vat_rt","");
 				// VAT CODE 초기화
 				sheetObj.SetCellValue(SELECTROW, "vat_rt_cd","");
 				// #1098 [BNX] INDIA 오피스 - 요구사항 항목
 				sheetObj.SetCellValue(SELECTROW, "vat_rt_cd1","");
 				sheetObj.SetCellValue(SELECTROW, "vat_rt_cd2","");
 			}
 		}
 	}else{
 		//SEE_BMD_MSG43
 	}
 }
/**
 * AJAX RETURN
 * 환율을 가져온다.
 */
function getCurrExch(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != "0"){
					sheetObj.SetCellValue(SELECTROW, "inv_xcrt",rtnArr[0]);
			}else{
				sheetObj.SetCellValue(SELECTROW, "inv_xcrt", 0,0);
				sheetObj.SetCellValue(SELECTROW, "inv_xcrt_dt","",0);
			}
		}
	}else{
	}
}
/**
 * AJAX RETURN
 * VAT CODE를 가져온다.
 */
var setVatCodeNo = "";
function getTaxRateFrVatcd(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			// 조회해온 결과를 Parent에 표시함
			var spValue = doc[1].split("^@@^");
			sheetObj.SetCellValue(SELECTROW, "vat_rt" + setVatCodeNo,spValue[0]);
			sheetObj.SetCellValue(SELECTROW, "tax_flg",spValue[1]);
		} else {
			sheetObj.SetCellValue(SELECTROW, "vat_rt" + setVatCodeNo,"");
			sheetObj.SetCellValue(SELECTROW, "tax_flg","N");
		}
	}else{
	}

	setVatCodeNo = "";
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
	if(ComGetEvent("keycode") == 13){
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
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          if(v_day > 29){
        	//Invalid date.
       	   	alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE'));
       	   	return false;
          }
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
    	  if(v_day > 28){
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
	 //yyyy=dt3.getYear();
	 yyyy=dt3.getFullYear();	// Cross Browser
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
if(sheetObj.GetCellValue(i,"del_chk") == "1" && sheetObj.GetCellValue(i,"inv_seq") != ""){
		    delCnt += 1;
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

	$("#billto").prop('disabled', false);
	$("#rowAddBtn2").prop('disabled', false);
	$("#rowAddBtn1").prop('disabled', false);

	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  if(collTxt[i].name != "f_usr_nm" && collTxt[i].name != "f_email" && collTxt[i].name != "f_ofc_cd" && collTxt[i].name != "f_cnt_cd"){
			  collTxt[i].value="";
		  }
		  //WMS ACCOUNT LKH 2015.01.20
		  if(collTxt[i].name == "f_bill_to_cd" || collTxt[i].name == "f_ship_to_cd" ||
		     collTxt[i].name == "f_bill_to_nm" || collTxt[i].name == "f_ship_to_nm" ||
		     collTxt[i].name == "f_cusref_no" || collTxt[i].name == "f_post_dt" ||
		     collTxt[i].name == "f_inv_dt" || collTxt[i].name == "f_term_dt" ||
		     collTxt[i].name == "f_due_dt" || collTxt[i].name == "f_last_paid_dt_cal" ||
		     collTxt[i].name == "s_bl_no" || collTxt[i].name == "s_ref_no" ||
		     collTxt[i].name == "s_oth_no" || collTxt[i].name == "s_inv_no" ||
		     collTxt[i].name == "s_wms_no"
		  ){
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
	frm1.f_inco_cd.value="";
	frm1.f_terms.disabled=false;
	frm1.f_curr_cd.disabled=false;
	frm1.f_remark.disabled=false;
	frm1.f_inco_cd.disabled=false;
	getBtnObj("btnModify").style.display="inline";
	getBtnObj("btnSaveX").style.display="inline";
	/*
	deleteBtn1.style.display="inline";
	deleteBtn2.style.display="inline";
	*/
	document.getElementById("rowAddBtn1").style.display="inline";
	document.getElementById("rowAddBtn2").style.display="inline";

	//#3411 [JTC]Accounting & Performance 수정사항
	//AUTO_VAT_CALCULATING_AR 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
	// 'Y' : VAT Cal. 버튼 비활성화
	if(AUTO_VAT_CALCULATING_AR != 'Y') {
		document.getElementById("vatBtn").style.display="inline";
	}

	frm1.billto.onclick=function(){doWork("CUSTOMER_POPLIST");};
	frm1.billto.style.cursor="hand";
	//frm1.shipto.onclick=function(){doWork("CUSTOMER_POPLIST2");};
	//frm1.shipto.style.cursor="hand";
	//frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDate();if(frm1.f_terms.value != ''){calcCreateTerms();}};
	frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDt();};
	frm1.f_term_dt.onblur=function(){calcCreateTerms();};
	// frm1.f_post_dt_cal.onclick	 = function(){doDisplay('DATE1', frm1);};
	frm1.f_inv_dt_cal.onclick=function(){doDisplay('DATE2', frm1);};
	frm1.f_due_dt_cal.onclick=function(){doDisplay('DATE3', frm1);};
	frm1.dateImg4.onclick=function(){doDisplay('DATE4', frm1);};
	sheetObj.SetEditable(1);
	sheetObj.RemoveAll();
	fnbtnCtl(2);
}
//필수항목체크
function checkVal(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(formObj.f_bill_to_nm.value == "" || formObj.f_bill_to_cd.value == ""){
		//[Bill To.] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('FMS_COD_BLTO'));
		formObj.f_bill_to_cd.focus();
		return false;
	}
	/*
	if(formObj.f_ship_to_nm.value == "" || formObj.f_ship_to_cd.value == ""){
		//[Ship To.] is mandatory field.
		alert(getLabel('FMS_COM_ALT007'));
		formObj.f_ship_to_nm.focus();
		return false;
	}
	*/
	if(formObj.f_post_dt.value == ""){
		//[Posting Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT007')+ "\n - "+ getLabel('FMS_COD_POSTING'));
		formObj.f_post_dt.focus();
		return false;
	}
	if(formObj.f_inv_dt.value == ""){
		//[Invoice Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('FMS_COD_INVOICEDT'));
		formObj.f_inv_dt.focus();
		return false;
	}
	if(formObj.f_due_dt.value == ""){
		//[Due Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('FMS_COD_DUEDT'));
		formObj.f_due_dt.focus();
		return false;
	}
	if(formObj.f_curr_cd.value == ""){
		//[Currency] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('FMS_COD_BLCURRENCY'));
		formObj.f_curr_cd.focus();
		return false;
	}
	//B/L NO가 없을시 경고문구를 띄운다. (MB/L & HB/L 둘 다 없는 경우)
	if(formObj.f_mbl_no.value == "" && formObj.f_hbl_no.value == ""){
		//[B/L No.] Missing. proceed anyway?
		if(confirm(getLabel('ACC_COM_ALT010')) == false){
			return false;
		}
		//[B/L No.] is Empty. Please Input B/L No.
		//alert(getLabel('ACC_COM_ALT008') + "\n\n: ACC_INV_0010.2211");
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
	//마감 POST DATE와  BL POST DATE 비교. B/L의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
/*	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	//2012/04/20 A/P 와 같이 새로 입력한 건만 VALIDATION 을 건다.
	if(formObj.f_inv_seq.value == ""){
		if(bl_post != "" && slip_post != ""){
			bl_post=bl_post.replaceAll("-","");
			bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
			slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
			if(slip_post >= bl_post){
				//Invalid [Posting Date]
				alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0010.2200");
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
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0010.2216");
			formObj.f_post_dt.value=formObj.old_post_dt.value;
			formObj.f_post_dt.select();
			return false;
		}
	}
	*/
	//BILL TO에 DEFAULT가 들어왔을경우 INVOICE 발생을 못함.
	if(formObj.f_bill_to_cd.value.indexOf("DEFAULT") != -1){
		//Invalid [Bill To.]
		alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_BLTO'));
		formObj.f_bill_to_cd.value="";
		formObj.f_bill_to_nm.value="";
		formObj.f_bill_to_cd.focus();
		return false;
	}

	/* [20140404 OJG] #26643 : Default 코드 값 Validation 제거
	//SHIP TO에 DEFAULT 가 들어왔을경우 INVOICE 발생을 못함.
	if(formObj.f_ship_to_cd.value.indexOf("DEFAULT") != -1){
		//Invalid [Ship To.]
		alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_SHTO'));
		formObj.f_ship_to_cd.value="";
		formObj.f_ship_to_nm.value="";
		formObj.f_ship_to_cd.focus();
		return false;
	}
	*/
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
	if( s_code != "" ) {
		if( tmp == "onKeyDown" ) {
			if(ComGetEvent("keycode") == 13){
				onKeyDownFlg = false;
				CODETYPE=str;
				s_type="trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
				else if(CODETYPE=="SHIPTO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
				onKeyDownFlg = true;
			}
		}
		else if( tmp == "onBlur" ) {
			if(!onKeyDownFlg) return;
			CODETYPE=str;
			s_type="trdpCode";
			if(CODETYPE=="BILLTO"){
				ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
			else if(CODETYPE=="SHIPTO"){
				ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
	else{
		if(str == "BILLTO"){
			formObj.f_bill_to_cd.value="";//trdp_cd  AS param1
			formObj.f_bill_to_nm.value="";//eng_nm   AS param2
		}
		else if(str == "SHIPTO"){
			formObj.f_ship_to_cd.value="";//trdp_cd  AS param1
			formObj.f_ship_to_nm.value="";//eng_nm   AS param2
		}
	}
}
/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];

	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');

			//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
			var opt_key_sec = "TP_OVER_AMT_FLG";
			ajaxSendPost(setOverAmtCurrFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

			if(CODETYPE =="BILLTO"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.f_bill_to_cd.value = "";		//trdp_cd  AS param1
					formObj.f_bill_to_nm.value = "";		//eng_nm   AS param2
					formObj.f_terms.value	  = "";	//term_cd
					formObj.f_term_dt.value	  = "";	//term_dt
					formObj.f_attn_to.value	  = "";	//담당자명 PIC_NM
					formObj.f_bill_to_cd.style.color= "#000000";
					formObj.f_bill_to_nm.style.color= "#000000";
					calcCreateTerms();
					return;
				}
				if(masterVals[5]=='CR'){

					//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
					if (TP_OVER_AMT_FLG != ""){
						var objArr=new Array();
						var overDueDateAmt = masterVals[38]==""?0:eval(masterVals[38]);
						if (overDueDateAmt != 0){
							objArr[0]=masterVals[3];
							objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
								formObj.f_bill_to_cd.value="";
								formObj.f_bill_to_nm.value="";
								formObj.f_bill_to_cd.style.color= "#000000";
								formObj.f_bill_to_nm.style.color= "#000000";
								return;
							} else {
								formObj.f_bill_to_cd.style.color= "#ff0000";
								formObj.f_bill_to_nm.style.color= "#ff0000";
							}
						}
					}

					/*
					if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
						//COD(Cash On Delivery) Case!
						alert(getLabel('FMS_COM_ALT020'));
					}*/

					//[20140317 OYH] #27474
					var crdLmtAmt = masterVals[6]==""?0:eval(masterVals[6]);
					var curLmtAmt = masterVals[7]==""?0:eval(masterVals[7]);
					var balLmtAmt = crdLmtAmt - curLmtAmt;
					var overDueAmt= masterVals[20]==""?0:eval(masterVals[20]);
					var grandTotal= masterVals[22]==""?0:eval(masterVals[22]);

					//[20141217 YJW] #46708
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0){
							var objArr = new Array();
							//objArr[0] = doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2));
							//objArr[1] = doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							objArr[0] = doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2));
							if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
								formObj.f_bill_to_cd.value = "";
								formObj.f_bill_to_nm.value = "";
								try {creditOver=false;}catch(e){};
								formObj.f_bill_to_cd.style.color= "#000000";
								formObj.f_bill_to_nm.style.color= "#000000";
								return;
							} else {
								try {creditOver=true;}catch(e){};
								formObj.f_bill_to_cd.style.color= "#ff0000";
								formObj.f_bill_to_nm.style.color= "#ff0000";
							}
						} else if (balLmtAmt < 0){
							var objArr = new Array();
							//objArr[0] = doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2));
							//objArr[1] = doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							objArr[0] = doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2));
							if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
								formObj.f_bill_to_cd.value = "";//trdp_cd  AS param1
								formObj.f_bill_to_nm.value = "";//eng_nm   AS param2
								try {creditOver=false;}catch(e){};
								formObj.f_bill_to_cd.style.color= "#000000";
								formObj.f_bill_to_nm.style.color= "#000000";
								return;
							} else {
								try {creditOver=true;}catch(e){};
								formObj.f_bill_to_cd.style.color= "#ff0000";
								formObj.f_bill_to_nm.style.color= "#ff0000";
							}
						} else if (overDueAmt > 0) {
							try {creditOver=false;}catch(e){};
							var objArr = new Array();
							objArr[0] = doMoneyFmt(roundXL(Number(grandTotal),2));
							if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
								formObj.f_bill_to_cd.value = "";//trdp_cd  AS param1
								formObj.f_bill_to_nm.value = "";//eng_nm   AS param2
								//try {creditOver=false;}catch(e){};
								formObj.f_bill_to_cd.style.color= "#000000";
								formObj.f_bill_to_nm.style.color= "#000000";
								return;
							} else {
								//try {creditOver=true;}catch(e){};
								formObj.f_bill_to_cd.style.color= "#ff0000";
								formObj.f_bill_to_nm.style.color= "#ff0000";
							}
						} else {
							try {creditOver=false;}catch(e){};
							formObj.f_bill_to_cd.style.color= "#000000";
							formObj.f_bill_to_nm.style.color= "#000000";
						}
					} else {
						try {creditOver=false;}catch(e){};
						formObj.f_bill_to_cd.style.color= "#000000";
						formObj.f_bill_to_nm.style.color= "#000000";
					}

				} else if(masterVals[5] == 'CH'){
					if(confirm(getLabel('COM_FRT_CFM005'))){
						try {creditOver=true;}catch(e){};
						formObj.f_bill_to_cd.style.color= "#ff0000";
						formObj.f_bill_to_nm.style.color= "#ff0000";
					}else{
						formObj.f_bill_to_cd.value = "";
						formObj.f_bill_to_nm.value = "";
						try {creditOver=false;}catch(e){};
						formObj.f_bill_to_cd.style.color= "#000000";
						formObj.f_bill_to_nm.style.color= "#000000";
						return;
					}

				} else if(masterVals[5] == 'CO'){
					try {creditOver=false;}catch(e){};
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.f_bill_to_cd.style.color= "#ff0000";
						formObj.f_bill_to_nm.style.color= "#ff0000";
					}else{
						formObj.f_bill_to_cd.value = "";
						formObj.f_bill_to_nm.value = "";
						formObj.f_bill_to_cd.style.color= "#000000";
						formObj.f_bill_to_nm.style.color= "#000000";
						return;
					}

				}/* else {
					try {creditOver=false;}catch(e){};
					formObj.f_bill_to_cd.style.color= "#ff0000";
					formObj.f_bill_to_nm.style.color= "#ff0000";
					alert(getLabel('COM_FRT_ALT001'));
				}*/

				formObj.f_bill_to_cd.value = masterVals[0];		//trdp_cd  AS param1
				
				//Jeong-Il Park Order - Name Change
				if ( MULTI_LANGUAGE == "Y" ){
					formObj.f_bill_to_nm.value = masterVals[16];		//locl_nm   AS param2
				}else{
					formObj.f_bill_to_nm.value = masterVals[3];		//eng_nm   AS param2
				}
				
				formObj.f_terms.value	  = masterVals[8];	//term_cd
				formObj.f_term_dt.value	  = masterVals[9];	//term_dt
				formObj.f_attn_to.value	  = masterVals[10];	//담당자명 PIC_NM

				// Bill To와 TRDP_CD가 다를 경우 check를 푸는 로직 삭제.
				// 저장할 때 Bill To로 자동세팅되어 필요없는 로직이며 오류를 유발할 수 있음. (yjw 2015.08.21)
				/*if(formObj.f_inv_seq.value == ""){
					for(var i=2; i<=sheetObj.LastRow(); i++){
						if(sheetObj.GetCellValue(i, "trdp_cd") == formObj.f_bill_to_cd.value){
							sheetObj.SetCellValue(i, "frt_check", "1");
						}else{
							sheetObj.SetCellValue(i, "frt_check", "0");
						}
					}
				}*/

				calcCreateTerms();
			}
			else if(CODETYPE=="SHIPTO"){
				formObj.f_ship_to_cd.value = masterVals[0];		//trdp_cd  AS param1
				formObj.f_ship_to_nm.value = masterVals[3];		//eng_nm   AS param2
			}
		}
		else{
			if(CODETYPE =="BILLTO"){
				formObj.f_bill_to_cd.value = "";				//trdp_cd  AS param1
				formObj.f_bill_to_nm.value = "";				//eng_nm   AS param2

				// Bill To와 TRDP_CD가 다를 경우 check를 푸는 로직 삭제.
				// 저장할 때 Bill To로 자동세팅되어 필요없는 로직이며 오류를 유발할 수 있음. (yjw 2015.08.21)
				/*if(formObj.f_inv_seq.value == ""){
					for(var i=2; i<=sheetObj.LastRow(); i++){
						if(sheetObj.GetCellValue(i, "trdp_cd") == formObj.f_bill_to_cd.value){
							sheetObj.SetCellValue(i, "frt_check","1");
						}
						else{
							sheetObj.SetCellValue(i, "frt_check", "0");
						}
					}
				}*/
			}
			else if(CODETYPE=="SHIPTO"){
				formObj.f_ship_to_cd.value = "";				//trdp_cd  AS param1
				formObj.f_ship_to_nm.value = "";				//eng_nm   AS param2
			}
		}
	}
	else{
		//SEE_BMD_MSG43
	}
}

//CURRENCY를 셋팅한다.
function setCurrency(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];


	//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제 (S)
	var curr=formObj.f_curr_cd.value;
	var cellInfo;

	if(curr == 'KRW' || curr == 'JPY' || (curr=="VND" && vnVatCalRound=="Y")) {
		cellInfo = {Type:"Float", Hidden:0, Width:80, Align:"Right", ColMerge:1, SaveName:"inv_sum_amt", KeyField:0, CalcLogic:"", Format:"Float", PointCount:0, UpdateEdit:1, InsertEdit:1, EditLen:10};
	} else {
		cellInfo = {Type:"Float", Hidden:0, Width:80, Align:"Right", ColMerge:1, SaveName:"inv_sum_amt", KeyField:0, CalcLogic:"", Format:"Float", PointCount:2, UpdateEdit:1, InsertEdit:1, EditLen:10};
	}
	//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제 (E)

	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {

		//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제 (S)
		sheetObj.InitCellProperty(i, "inv_sum_amt", cellInfo);
		//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제 (E)
		
		// if(sheetObj.CellValue(i, "frt_check") == "1"){
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
			sheetObj.SetCellValue(i, "inv_xcrt", 1);
		}

		sheetObj.SetCellValue(i, "inv_aply_curr_cd", curr, 0);

		//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제 (S)
		//sheetObj.InitCellProperty(i, "inv_sum_amt", cellInfo);
		//sheetObj.SetCellValue(i, "inv_sum_amt", Number(sheetObj.GetCellValue(i,"inv_sum_amt")));
		//#3522 [JPT] A/R Invoice InvoiceTotal AMT 에서 JPY 인 경우 소수점 삭제 (E)
		
		// }
		/*sheetObj.SetCellValue(i, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(i, "qty")) * Number(sheetObj.GetCellValue(i, "ru")),0);
		//vat_amt, inv_vat_amt 계산로직 삭제 YJW 2015-07-14
		//sheetObj.SetCellValue(i, "vat_amt",Number(sheetObj.GetCellValue(i, "ru")) * (Number(sheetObj.GetCellValue(i, "vat_rt"))/100));
		if(curr=="KRW" || curr=="JPY"){
			sheetObj.SetCellValue(i, "inv_amt",Math.round( Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt"))));
			//sheetObj.SetCellValue(i, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(i, "vat_rt"))/100) * Number(sheetObj.GetCellValue(i, "inv_xcrt"))));
		}else{
			sheetObj.SetCellValue(i, "inv_amt",Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(i, "inv_xcrt")));
			//sheetObj.SetCellValue(i, "inv_vat_amt",Number(sheetObj.GetCellValue(i, "trf_cur_sum_amt")) * (Number(sheetObj.GetCellValue(i, "vat_rt"))/100) * Number(sheetObj.GetCellValue(i, "inv_xcrt")));
		}
		//sheetObj.SetCellValue(i, "inv_sum_amt",Number(sheetObj.GetCellValue(i, "inv_amt")) + Number(sheetObj.GetCellValue(i, "inv_vat_amt")));
		sheetObj.SetCellValue(i, "inv_sum_amt",Number(sheetObj.GetCellValue(i, "inv_amt")),0);*/
	}
	
	
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event != undefined && event != "undefined" && event.keyCode == 13){
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
		  //WMS ACCOUNT LKH 2015.01.20
		  if(collTxt[i].name != "f_usr_nm" && collTxt[i].name != "f_email"
			  && collTxt[i].name != "f_ofc_cd"
			  && collTxt[i].name != "f_cnt_cd"
			  && collTxt[i].name != "s_bl_no"
			  && collTxt[i].name != "s_ref_no"
			  && collTxt[i].name != "s_oth_no"
			  && collTxt[i].name != "s_inv_no"
			  && collTxt[i].name != "s_wms_no"
			  && collTxt[i].name != "f_loc_ex_rate"
		      //#5748 [StarCluster-MEX] Request for making Tax Invoice No column in A/R Entry screen
			  && collTxt[i].name != "f_tax_no"
			  && collTxt[i].name != "f_vchr_no"
		  ){
			  collTxt[i].className="search_form-disable";
			  collTxt[i].readOnly=true;
		  }
	  }
	}
	frm1.f_terms.disabled=true;
	frm1.f_curr_cd.disabled=true;
	frm1.f_remark.disabled=true;
	frm1.f_inco_cd.disabled=true;
	frm1.f_tax_bill.disabled=true;
	getBtnObj("btnModify").style.display="none";
	getBtnObj("btnSaveX").style.display="none";
	/*
	deleteBtn1.style.display="none";
	deleteBtn2.style.display="none";
	*/
	document.getElementById("rowAddBtn1").style.display="none";
	document.getElementById("rowAddBtn2").style.display="none";

	//#3411 [JTC]Accounting & Performance 수정사항
	//AUTO_VAT_CALCULATING_AR 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
	// 'Y' : VAT Cal. 버튼 비활성화
	if(AUTO_VAT_CALCULATING_AR != 'Y') {
		document.getElementById("vatBtn").style.display="none";
	}

	// frm1.f_post_dt_cal.onclick	 = "";
	frm1.f_inv_dt_cal.onclick="";
	frm1.f_due_dt_cal.onclick="";
	frm1.f_inv_dt.onblur="";
	frm1.f_term_dt.onblur="";
	sheetObj.SetEditable(0);
	sheetObj.RenderSheet(1);
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

var getXcrtRate = 0;

function getCurrency(reqVal){
	var doc = getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	getXcrtRate = doc[1];
    }
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
				sheetObj.SetCellValue(row, "locl_amt", sheetObj.GetCellValue(row, "inv_sum_amt"), 0);
				
				loclTtlAmt = Number(loclTtlAmt) + Number(sheetObj.GetCellValue(row, "locl_amt"));
			}else{
				/* 각 로우 마다 rate curr 서로다른경우   Local Ex.Rate 가 다르게 세팅될수있다 
				if(ofc_locl_curr_cd == sheetObj.GetCellValue(row, 'rat_curr_cd')){
					sheetObj.SetCellValue(row, "locl_curr_cd", ofc_locl_curr_cd,0);
					sheetObj.SetCellValue(row, "locl_xcrt", 1,0);
					sheetObj.SetCellValue(row, "locl_amt", sheetObj.GetCellValue(row, "trf_cur_sum_amt"), 0);	
					
					loclTtlAmt = Number(loclTtlAmt) +  Number(sheetObj.GetCellValue(row, "locl_amt"));
				}else{
				*/
					
					var locl_amt = Number(sheetObj.GetCellValue(row, "inv_sum_amt")) * exRate;
					if( ofc_locl_curr_cd =="JPY"){
						sheetObj.SetCellValue(row, "locl_amt", roundTo(Number(locl_amt),0), 0);
					}else{
						sheetObj.SetCellValue(row, "locl_amt", roundTo(Number(locl_amt),2), 0);
					}			
					sheetObj.SetCellValue(row, "locl_curr_cd", ofc_locl_curr_cd,0);
					sheetObj.SetCellValue(row, "locl_xcrt", exRate,0);		
					
					loclTtlAmt = Number(loclTtlAmt) +  Number(sheetObj.GetCellValue(row, "locl_amt"));
				//}
			}
			
		}else{
			
			
			if(formObj.f_curr_cd.value == ofc_locl_curr_cd){
				sheetObj.SetCellValue(row, "locl_curr_cd", ofc_locl_curr_cd,0);
				sheetObj.SetCellValue(row, "locl_xcrt", 1,0);
				sheetObj.SetCellValue(row, "locl_amt", sheetObj.GetCellValue(row, "inv_sum_amt"), 0);
				
				loclTtlAmt = Number(loclTtlAmt) +  Number(sheetObj.GetCellValue(row, "locl_amt"));
			}else{
				var param = '';
				
				var locl_amt = Number(sheetObj.GetCellValue(row, "inv_sum_amt")) * exRate;
				if( ofc_locl_curr_cd =="JPY"){
					sheetObj.SetCellValue(row, "locl_amt", roundTo(Number(locl_amt),0), 0);
				}else{
					sheetObj.SetCellValue(row, "locl_amt", roundTo(Number(locl_amt),2), 0);
				}			
				sheetObj.SetCellValue(row, "locl_curr_cd", ofc_locl_curr_cd,0);
				sheetObj.SetCellValue(row, "locl_xcrt", exRate,0);
				
				loclTtlAmt = Number(loclTtlAmt) +  Number(sheetObj.GetCellValue(row, "locl_amt"));
			}
		}
		
		
		
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
				//Invoice No Duplicate!!
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_IVNO'));
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
	/*var chkPostDt=BLOCK_POST_DT.replaceAll("-","");
		chkPostDt=chkPostDt.substring(4,8)+chkPostDt.substring(0,2)+chkPostDt.substring(2,4);
		chkPostDt=addDate('d', 0, chkPostDt, "");
		chkPostDt=chkPostDt.substring(4,6) + "-" + chkPostDt.substring(6,8) + "-" + chkPostDt.substring(0,4);
	*/
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
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0010.2532");
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
//	if(formObj.temp_radio[0].checked){
//
//		formObj.main_trdp.value = "";
//	}else{
//		if(formObj.f_cnt_cd.value=="US"){
//			formObj.main_trdp.value = "Allstate Int’l Freight Company";
//		}else if(formObj.f_cnt_cd.value=="DE"){
//			formObj.main_trdp.value = "Atlantic Integrated Freight GmbH";
//		}else if(formObj.f_cnt_cd.value=="IT"){
//			formObj.main_trdp.value = "Atlantic Integrated Freight S.R.L.";
//		}else if(formObj.f_cnt_cd.value=="FR"){
//			formObj.main_trdp.value = "Atlantic Integrated Freight SARL";
//		}else{
//			formObj.main_trdp.value = "";
//		}
//	}
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
	var lastCol = "trf_cur_sum_amt";
	if(MULTI_CURR_FLAG == "Y"){
		lastCol = "inv_sum_amt";
	}
	if(sheetObj.LastRow() == row && lastCol == sheetObj.ColSaveName(col)){
		if(keyCode==9 && getObj('rowAddBtn1').style.display != "none"){
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
function getInvSheet(){
	return docObjects[0];
}
/*
// call : isZeroAmt("trf_cur_sum_amt");
// Zero 이면 true
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
	var totRow=sheetObj.LastRow()+1;
	var isZeroFlg="";
	// amount가 0인 것들은 삭제 처리하고 진행한다.
	for(var k=totRow-1; k > 1 ; k--){
if(     sheetObj.GetCellValue(k, 'trf_cur_sum_amt') == 0
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
	//데이터 조회 후 생성하지 않았을 경우 경고 메세지
	//WMS ACCOUNT LKH 2015.01.20
	if(formObj.f_intg_bl_seq.value == "" && formObj.f_oth_seq.value == "" && formObj.f_wms_seq.value == ""){
		alert(getLabel('ACC_MSG103'));
		return false;
  	}
	return true;
}


function CUSTOMER_POPLIST(rtnVal){
	var sheetObj=docObjects[0];
     if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{

		//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
		var opt_key_sec = "TP_OVER_AMT_FLG";
		ajaxSendPost(setOverAmtCurrFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

		var rtnValAry=rtnVal.split("|");
		if(rtnValAry[13] == 'KO'){
			alert(getLabel('COM_FRT_ALT015'));
			formObj.f_bill_to_cd.value="";//full_nm
			formObj.f_bill_to_nm.value="";//full_nm
			formObj.f_terms.value="";	//term_cd
			formObj.f_term_dt.value="";	//term_dt
			formObj.f_attn_to.value="";	//담당자명 PIC_NM
			formObj.f_bill_to_cd.style.color= "#000000";
			formObj.f_bill_to_nm.style.color= "#000000";
			calcCreateTerms();
			return;
		}
		if(rtnValAry[13]=='CR'){

			//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
			if (TP_OVER_AMT_FLG != ""){
				var objArr=new Array();
				var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
				if ( overDueDateAmt != 0){
					objArr[0]=rtnValAry[2];
					objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
					if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
						formObj.f_bill_to_cd.value="";
						formObj.f_bill_to_nm.value="";
						formObj.f_bill_to_cd.style.color= "#000000";
						formObj.f_bill_to_nm.style.color= "#000000";
						return;
					} else {
						formObj.f_bill_to_cd.style.color= "#ff0000";
						formObj.f_bill_to_nm.style.color= "#ff0000";
					}
				}
			}

			/*
			if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
				//COD(Cash On Delivery) Case!
				alert(getLabel('FMS_COM_ALT020'));
			}*/
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
						formObj.f_bill_to_cd.value="";
						formObj.f_bill_to_nm.value="";
						try {creditOver=false;}catch(e){};
						formObj.f_bill_to_cd.style.color= "#000000";
						formObj.f_bill_to_nm.style.color= "#000000";
						return;
					} else {
						try {creditOver=true;}catch(e){};
						formObj.f_bill_to_cd.style.color= "#ff0000";
						formObj.f_bill_to_nm.style.color= "#ff0000";
					}
				} else if (balLmtAmt < 0  ){
					var objArr=new Array();
					//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2));
					//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
					objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2));
					if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
						formObj.f_bill_to_cd.value="";
						formObj.f_bill_to_nm.value="";
						try {creditOver=false;}catch(e){};
						formObj.f_bill_to_cd.style.color= "#000000";
						formObj.f_bill_to_nm.style.color= "#000000";
						return;
					} else {
						try {creditOver=true;}catch(e){};
						formObj.f_bill_to_cd.style.color= "#ff0000";
						formObj.f_bill_to_nm.style.color= "#ff0000";
					}
				} else if (overDueAmt > 0 ) {
					try {creditOver=false;}catch(e){};
					var objArr=new Array();
					objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2));
					if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
						formObj.f_bill_to_cd.value="";
						formObj.f_bill_to_nm.value="";
						//try {creditOver=false;}catch(e){};
						formObj.f_bill_to_cd.style.color= "#000000";
						formObj.f_bill_to_nm.style.color= "#000000";
						return;
					} else {
						//try {creditOver=true;}catch(e){};
						formObj.f_bill_to_cd.style.color= "#ff0000";
						formObj.f_bill_to_nm.style.color= "#ff0000";
					}
				} else {
					try {creditOver=false;}catch(e){};
					formObj.f_bill_to_cd.style.color= "#000000";
					formObj.f_bill_to_nm.style.color= "#000000";
				}
			} else {
				try {creditOver=false;}catch(e){};
				formObj.f_bill_to_cd.style.color= "#000000";
				formObj.f_bill_to_nm.style.color= "#000000";
			}

		} else if(rtnValAry[13] == 'CH'){
			if(confirm(getLabel('COM_FRT_CFM005'))){
				try {creditOver=true;}catch(e){};
				formObj.f_bill_to_cd.style.color= "#ff0000";
				formObj.f_bill_to_nm.style.color= "#ff0000";
			}else{
				formObj.f_bill_to_cd.value = "";
				formObj.f_bill_to_nm.value = "";
				try {creditOver=false;}catch(e){};
				formObj.f_bill_to_cd.style.color= "#000000";
				formObj.f_bill_to_nm.style.color= "#000000";
				return;
			}

		} else if(rtnValAry[13] == 'CO'){
			try {creditOver=false;}catch(e){};
			if(confirm(getLabel('COM_FRT_ALT001'))){
				formObj.f_bill_to_cd.style.color= "#ff0000";
				formObj.f_bill_to_nm.style.color= "#ff0000";
			}else{
				formObj.f_bill_to_cd.value = "";
				formObj.f_bill_to_nm.value = "";
				formObj.f_bill_to_cd.style.color= "#000000";
				formObj.f_bill_to_nm.style.color= "#000000";
				return;
			}

		}/*else{
			try {creditOver=false;}catch(e){};
			formObj.f_bill_to_cd.style.color= "#ff0000";
			formObj.f_bill_to_nm.style.color= "#ff0000";
			alert(getLabel('COM_FRT_ALT001'));
		}*/
		formObj.f_bill_to_cd.value=rtnValAry[0];//full_nm
			
		//Jeong-Il Park Order - Name Change 
		if ( MULTI_LANGUAGE == "Y" ){
			formObj.f_bill_to_nm.value=rtnValAry[10];//locl_nm
		}else{
			formObj.f_bill_to_nm.value=rtnValAry[2];//eng_nm
		}	
		
		formObj.f_terms.value=rtnValAry[17];	//term_cd
		formObj.f_term_dt.value=rtnValAry[18];	//term_dt
		formObj.f_attn_to.value=rtnValAry[3];	//담당자명 PIC_NM
		if(formObj.f_inv_seq.value != ""){
		}else{
			// Bill To와 TRDP_CD가 다를 경우 check를 푸는 로직 삭제.
			// 저장할 때 Bill To로 자동세팅되어 필요없는 로직이며 오류를 유발할 수 있음. (yjw 2015.08.21)
			/*for(var i=2; i<=sheetObj.LastRow(); i++){
				if(sheetObj.GetCellValue(i, "trdp_cd")!=''){
					if(sheetObj.GetCellValue(i, "trdp_cd") == formObj.f_bill_to_cd.value){
						sheetObj.SetCellValue(i, "frt_check","1");
					}else{
						sheetObj.SetCellValue(i, "frt_check","0");
					}
				}
			}*/
		}
		calcCreateTerms();
	}

}
function CUSTOMER_POPLIST2(rtnVal){
	var sheetObj=docObjects[0];
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ship_to_cd.value=rtnValAry[0];//full_nm
		formObj.f_ship_to_nm.value=rtnValAry[2];//full_nm
	}
	$(".layer_black_bg,.layer_popup").fadeOut(200);
}

function getCntrInfo(){

	var formObj   = document.frm1;

	var bl_seq_tp = "";
	var intg_bl_seq = formObj.f_intg_bl_seq.value;
	var oth_seq = formObj.f_oth_seq.value;

	if (intg_bl_seq != "") {
		bl_seq_tp = "B";
	}
	if (oth_seq != "") {
		bl_seq_tp = "O";
	}

	if(bl_seq_tp != "") {

		ajaxSendPost(retGetCntrInfo, 'reqVal', '&goWhere=aj&bcKey=searchCntrListByBlSeq&intg_bl_seq='+intg_bl_seq+'&oth_seq='+oth_seq+'&bl_seq_tp='+bl_seq_tp, './GateServlet.gsl');
    }
}



/**
 * AJAX RETURN
 * CNTR NO 취득
 */
function retGetCntrInfo(reqVal){
	var formObj   = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpList = doc[1].split("@;;@");
			var cntrStr = "";
			for(var i=0 ; i<tmpList.length-1 ; i++){
				var tmp = tmpList[i].split("@^^@");
				cntrStr += tmp[0];
				if (i != tmpList.length-2) {
					cntrStr += ", ";
				}
			}
			formObj.f_remark.value = cntrStr;
		}
	}else{

	}
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
		   url: "./ACC_INV_0010AJ.clt",
		   dataType: 'xml',
		   data: $("form" ).serialize(),
		   success: function(data){
			   setFieldValue( formObj.old_trdp_cd, $('ship_to_cd',data).text());
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
			   setFieldValue( formObj.f_ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.f_ref_no_dtl, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.f_mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.f_hbl_no, $('hbl_no',data).text());
			   setFieldValue( formObj.f_hbl_no, $('hbl_no',data).text());
			   setFieldValue( formObj.f_lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.f_agent, $('agent_trdp_nm',data).text());
			   setFieldValue( formObj.f_shpr_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.f_cnee_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.f_ntfy_nm, $('ntfy_trdp_nm',data).text());
			   //#1489 [BNX] AR INVOICE TO HAVE MARK & NO :  SECTION ADDED (F/S FUNCTION) - (II) ThoaDien.170925
			   setFieldValue( formObj.f_shpr_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.f_cnee_cd, $('cnee_trdp_cd',data).text());

			   setFieldValue( formObj.f_vsl_flt, $('vsl_flt',data).text());
			   setFieldValue( formObj.f_pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.f_etd_dt, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.f_pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.f_eta_dt, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.f_fnl_dest_loc_nm, $('fnl_dest_loc_nm',data).text());
			   setFieldValue( formObj.f_feta_dt, $('f_eta_dt_tm',data).text());
			   setFieldValue( formObj.f_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.f_pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.f_pck_nm, $('pck_ut_nm',data).text());
			   setFieldValue( formObj.f_pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.f_grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.f_grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.f_chg_wgt, $('chg_wgt',data).text());
			   setFieldValue( formObj.f_chg_wgt1, $('chg_wgt1',data).text());
			   //#1108   [BINEX] V440 OCEAN MEASUREMENT INFO NOT SHOWING WHEN SEARCHED ON AR ENTRY
			   if($('air_sea_clss_cd',data).text() == "A"){
				   setFieldValue( formObj.f_meas, $('vol_wgt',data).text());
				   setFieldValue( formObj.f_meas1, $('vol_meas',data).text());
			   }else{
				   setFieldValue( formObj.f_meas, $('meas',data).text());
				   setFieldValue( formObj.f_meas1, $('meas1',data).text());
			   }
			   setFieldValue( formObj.f_bill_to_cd, $('bill_to_cd',data).text());
			   setFieldValue( formObj.f_bill_to_nm, $('bill_to_nm',data).text());
			   setFieldValue( formObj.f_ship_to_cd, $('ship_to_cd',data).text());
			   setFieldValue( formObj.f_ship_to_nm, $('ship_to_nm',data).text());
			   setFieldValue( formObj.f_cusref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.f_inv_no, $('inv_no',data).text());
			   setFieldValue( formObj.f_post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.f_inv_dt, $('inv_dt',data).text());
			   setFieldValue( formObj.pre_inv_dt, $('inv_dt',data).text());

			   //WMS ACCOUNT LKH 2015.01.20
			   setFieldValue( formObj.f_wms_seq, $('wms_seq',data).text());
			   setFieldValue( formObj.temp_wms_no , $('wms_no',data).text());
			   /*
			   if(formObj.f_curr_cd.value == ""){
				   setFieldValue( formObj.f_curr_cd, $('curr_cd',data).text());
			   }
			   if(formObj.f_inv_seq.value == ""){
				   setFieldValue( formObj.f_inco_cd.value, $('inco_cd',data).text());
			   }*/

			   setFieldValue( formObj.tax_no , $('tax_no',data).text());
			   setFieldValue( formObj.m_intg_bl_seq , $('m_intg_bl_seq',data).text());


			   //<!-- #2335 [BNX][INDIA] AR Actual Shipper & CNEE 추가 // 1 Master 3 House -->
			   setFieldValue( formObj.f_act_shpr_trdp_nm, $('act_shpr_trdp_nm',data).text());
			   setFieldValue( formObj.f_act_cnee_trdp_nm, $('act_cnee_trdp_nm',data).text());
			   
			 //#5994 [ACROCARGO] Request to show POR and Carrier Bkg No in both AR, D/C Entry and Report
			   setFieldValue( formObj.f_por_nm, $('por_nm',data).text());
			   setFieldValue( formObj.f_del_nm, $('del_nm',data).text());

			   sheet1.SetColProperty('frt_cd', {ComboText:$('FRTCD2',data).text(), ComboCode:$('FRTCD1',data).text()} );
			   //[20150211 OJG]
			   VAT_FRT_CD =  $('VAT_FRT_CD',data).text();
			   WHLD_VAT_FRT_CD =  $('WHLD_VAT_FRT_CD',data).text();

			   var arrVatFrtCd =  $('ARR_VAT_FRT_CD',data).text();
			   var arrTaxRate =  $('ARR_TAX_RATE',data).text();

			   ARR_VAT_FRT_CD = arrVatFrtCd.split('|');
			   ARR_TAX_RATE = arrTaxRate.split('|');

			   doBtnAuthority(attr_extension);
			  // setupPage();
			    loadPage();
	        	setSelect();
	        	doWork("SEARCHLIST");
			    doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}


function setUstFreiInfo() {
	var formObj   = document.frm1;
	var ustFreiStr = "";

	if (formObj.f_remark.value != "") {
		ustFreiStr = "\r\n"+"UST-FREI GEMAESS PARAGRAPH 4/3 USTG";
	} else {
		ustFreiStr = "UST-FREI GEMAESS PARAGRAPH 4/3 USTG";
	}
	formObj.f_remark.value += ustFreiStr;
}

function setRemarkTerms() {
	var formObj   = document.frm1;
	if (formObj.f_cnt_cd.value=="DE" && formObj.f_terms.value == "A") {
		var termDayStr = formObj.f_term_dt.value;
		var termsStr = "";

		if (formObj.f_remark.value != "") {
			termsStr = "\r\n"+"RECHNUNG ZAHLBAR INNERHALB VON "+termDayStr+" TAGEN";
		} else {
			termsStr = "RECHNUNG ZAHLBAR INNERHALB VON "+termDayStr+" TAGEN";
		}
		formObj.f_remark.value += termsStr;
	}
}

function onLoadWarehouse(){
	var formObj = document.frm1;
	formObj.f_bill_to_cd.disabled = true;
	formObj.f_bill_to_nm.disabled = true;
	$("#billto").prop('disabled', true);
	$("#rowAddBtn2").prop('disabled', true);
	$("#rowAddBtn1").prop('disabled', true);
	doWork("SEARCH");
	//doWork("SEARCHLIST");
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

var tax_col;

function setTaxColReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		tax_col=doc[1];
	} else {
		tax_col="";
	}
}

var whld_tax_col;

function setWhldTaxColReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		whld_tax_col=doc[1];
	} else {
		whld_tax_col="";
	}
}

var tax_mgmt_use;
function setTaxMgmtUse(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		tax_mgmt_use=doc[1];
	} else {
		tax_mgmt_use="";
	}
}

function getTermDt(){
	var formObj = document.frm1;

	var s_type = "trdpCode";
	var s_code = formObj.f_bill_to_cd.value;

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
	var ref_no = formObj.f_ref_no.value;
	
	if (inv_no == "" || inv_no == "undefined" || inv_no == undefined) {
		return "";
	}
	pdfFileNm = "AR_"+inv_no;
	if(rpt_file_name_flg && ref_no != ""){
		pdfFileNm += "_" + ref_no;
	}
	return pdfFileNm;
}

function setBlckArInvAddReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		blck_ar_inv_add=doc[1];
	} else {
		blck_ar_inv_add="";
	}
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
					sheetObj.DoAllSave("./ACC_INV_0010GS.clt", FormQueryString(formObj), true);
				}
			}
		}
	}
}

var tax_opt = 0;
function setTaxOpt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		tax_opt = doc[1];
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
	 if(cur_curObj.id == "billto"){
		frm1.f_bill_to_cd.value=rtnValAry[0];

		//Jeong-Il Park Order - Name Change 
		if ( MULTI_LANGUAGE == "Y" ){
			frm1.f_bill_to_nm.value=rtnValAry[10];//loc_nm
		}else{
			frm1.f_bill_to_nm.value=rtnValAry[2];//eng_nm
		}
		// #3883 [ALL GREEN] Vendor Selection on Invoice Creation
		codeNameAction('BILLTO',document.frm1.f_bill_to_cd, 'onBlur');
	 }
}

function ASHIP_TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");

		//Jeong-Il Park Order - Name Change
		if ( MULTI_LANGUAGE == "Y" ){
			formObj.f_act_shpr_trdp_nm.value=rtnValAry[10];//locl_nm
		}else{
			formObj.f_act_shpr_trdp_nm.value=rtnValAry[2];//eng_nm
		}
	}
}

function ACON_TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");

		//Jeong-Il Park Order - Name Change
		if ( MULTI_LANGUAGE == "Y" ){
			formObj.f_act_cnee_trdp_nm.value=rtnValAry[10];//locl_nm
		}else{
			formObj.f_act_cnee_trdp_nm.value=rtnValAry[2];//eng_nm
		}
	}
}

/*
* Task No. : #
* Author : Huy.Mai
* Date : 2017/09/01
* Get Mark Text from BL by BL sequence
* Param : intg_bl_seq
*/
function getMarkInfo(){
	var formObj = document.frm1;
	if(formObj.f_intg_bl_seq.value != ""){
		ajaxSendPost(returnMarkInfo, 'reqVal', '&goWhere=aj&bcKey=selectMarkInfoByBL&intg_bl_seq='+formObj.f_intg_bl_seq.value, './GateServlet.gsl');
    }else if(formObj.f_oth_seq.value != ""){
    	ajaxSendPost(returnMarkInfo, 'reqVal', '&goWhere=aj&bcKey=selectMarkInfoByOther&oth_seq='+formObj.f_oth_seq.value, './GateServlet.gsl');
    }
}

function returnMarkInfo(reqVal){
	var formObj = document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			var strRmk = formObj.f_remark.value;
			if(strRmk.replace(/\s/g, '') != ''){
				strRmk += "\n";
			}
			strRmk += doc[1];
			formObj.f_remark.value = strRmk;
		}
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

 			for(var i=0; i < rtnArr.length; i++){
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

//#4020 (JAPT) invoice Ex.date, rate validation, amount  추가
var chngVal = 0;
function sheet1_OnEditValidation(sheetObj, row, col,val) {
	if(chngVal == 0) {
		if(sheetObj.GetCellValue(row,sheetObj.ColSaveName(col)) != val){
			
			//Total Amount 값을 매뉴얼로 변경했을 경우.
			if(sheetObj.ColSaveName(col)=="inv_sum_amt"){
	
				//INV_AMT <> INV_SUM_AMT가 다른경우 
				if( val != sheetObj.GetCellValue(row, "inv_amt")){
					//alert("inv_sum_amt: " + val);
					//alert("inv_amt: " + sheetObj.GetCellValue(row, "inv_amt"));
					if(confirm(getLabel('FMS_COM_ALT153'))){
						chngVal = 1;
						sheetObj.SetCellValue(row, "inv_amt",val,0);
						//return;
					} else {
						sheetObj.ValidateFail(1);
						//return;
					}
					
					//값을 이전 값으로 되돌림
					//mySheet.ValidateFail(1);
					
					return;
				}
			}
			
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


function setVnVatCalRound(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined )
		vnVatCalRound=doc[1];
}

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

//#4193 [JAPT] Invoice print option on AR ENtry screen.
function setArInvoiceOptionUseReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
		AR_INVOICE_OPTION_USE = doc[1].split('|'); // OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List
	}
}


//[#5954] [Binex-TOR] Mixed up Currency load on Invoice Entry by search problem
function getChkMulCur(){
    var formObj=document.frm1;
    var chk_split  = formObj.chk_split.value;
    var f_oth_seq     = formObj.f_oth_seq.value;
	var f_intg_bl_seq = formObj.f_intg_bl_seq.value;
	var f_wms_seq     = formObj.f_wms_seq.value;
	var chk_fr_trdp_cd     = formObj.chk_fr_trdp_cd.value || '';
	var chk_fr_inv_curr_cd   = formObj.chk_fr_inv_curr_cd.value || '';
	var chk_fr_frt_seq   = formObj.chk_fr_frt_seq.value || '';
	ajaxSendPost(chkMulCur, "reqVal", "&goWhere=aj&bcKey=checkMultilCurrAr&f_intg_bl_seq="+f_intg_bl_seq+"&f_oth_seq="+f_oth_seq+"&f_wms_seq="+ f_wms_seq +"&chk_split="+chk_split + "&chk_fr_trdp_cd=" + chk_fr_trdp_cd + "&chk_fr_inv_curr_cd=" +chk_fr_inv_curr_cd +"&chk_fr_frt_seq="+chk_fr_frt_seq ,"./GateServlet.gsl");
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
//#6376 [KING FREIGHT NY] Add a warning message (Zendesk #2334)
function getChkBillTo(intg_bl_seq){
	ajaxSendPost(searchHouseActualShipper, "reqVal", "&goWhere=aj&bcKey=searchHouseActualShipper&intg_bl_seq="+intg_bl_seq ,"./GateServlet.gsl");
}
function searchHouseActualShipper(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if (typeof(doc[1])!= 'undefined') {
		  custCd = doc[1];
		}
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