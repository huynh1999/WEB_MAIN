﻿//=========================================================
//*@FileName   : ACC_INV_0030.jsp
//*@FileTitle  : AP Invoice
//*@Description: AP Invoice
//*@author     : Chungrue - Cyberlogitec
//*@version    : 1.0 - 2011/11/11
//*@since      : 2011/11/11
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/06/19
//*@since      : 2014/06/19
//=========================================================
var TODAY;
var org_trdp_cd = "";
var SLIP_POST_DT="";
var ORG_BLOCK_POST_DT=""; //MAX(BLOCK_DT)
var BLOCK_POST_DT="";    // MAX(BLOCK_DT)+1
var bPaid=false; // [20130401 OJG]
var isSheetValChanged=false;
var isInputFormValChanged=false;
var isBuyInvNoDupChk=false;
var isInvModiTmsOk=false;
var isFrtModiTmsOk=false;
var rtnary=new Array(1);
var callBackFunc = "";
//LKH::2015-11-03 WMS4.O
var gJsWmsVer = "";

var tax_flg = false;
//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
var gJsWmsRuPoint = "N";

//#2338 [BNX][INDIA] OVERPAID (BNX INDIA)
var ap_overpaid_permit;

//#2750 [BINEX, IMPEX] AP Invoice Update After Paid or File Block
var ap_after_block;

//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
var GL_VIEW_FALG = "N";
//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
var XCRT_APP_FLAG = "N";

var vnCalRound = "Y";

//#5894 [Zencon] Credit overlimited TP 에 대한 A/P 제한
var creditLimit_flg = "";
//OFVFOUR-8099 [BEST OCEAN] REMOVING PRINT BUTTON WHEN THERE IS PRINT/L IN THE SAME SCREEN
var visiblePrint = false;

function wmsDocCheck(flag){
	var formObj = document.frm1;
	var wmsChk = "NotWMSDOC";
	if(formObj.f_wms_seq.value != ""){
		wmsChk = "WMSDOC";

//		#2135 [BINEX] BLOCKED INVOICE REVISED WITHOUT AUTHORITY
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
		formObj.f_vendor_cd.disabled = objDisable;
		formObj.f_vendor_nm.disabled = objDisable;
		$("#billto").prop('disabled', objDisable);
		$("#rowAddBtn2").prop('disabled', objDisable);
		$("#rowAddBtn4").prop('disabled', objDisable);

		//#3411 [JTC]Accounting & Performance 수정사항
		//AUTO_VAT_CALCULATING_AP 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
		// 'Y' : VAT Cal. 버튼 비활성화
		if(AUTO_VAT_CALCULATING_AP != 'Y') {
			$("#vatBtn").prop('disabled', objDisable);
		}

		formObj.f_curr_cd.disabled = objDisable;

		//$("#btn_etc").prop('disabled', objDisable); //Container Information id="btn_etc" 추가해줌
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

function doWork(srcName) {

	// #1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
	setSaveConfirmMsg(srcName);
	//OFVFOUR-8099 [BEST OCEAN] REMOVING PRINT BUTTON WHEN THERE IS PRINT/L IN THE SAME SCREEN
	var srcNameUpper = srcName.toUpperCase();
	var isByPass = false
	if (visiblePrint && srcNameUpper == "PRINT") {
		isByPass = true
	}
	if (!btnGetVisible(srcName) && !isByPass) { //버튼의 단축키 사용가능여부 체크
		return;
	}
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var formObj=document.frm1;
	switch (srcName) {
	case "DEFAULT":
		frm1.f_cmd.value=-1;
		//formObj.submit();
		submitForm();
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
		}
		break;
	case "SEARCHLIST":
		//sheetObj.ShowDebugMsg = true;
		formObj.f_cmd.value=SEARCHLIST;
		/*
		// 검증로직
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
		
		if (formObj.f_inv_seq.value == "") {
    		if (MULTI_CURR_FLAG != "Y") {
    			getChkMulCur();
				if (keyChkMulCur == "Y") {
					docObjects[0].DoSearch("./ACC_INV_0030GS.clt",	FormQueryString(formObj) );
				}
			}else{docObjects[0].DoSearch("./ACC_INV_0030GS.clt",	FormQueryString(formObj) );}
		}else{
			docObjects[0].DoSearch("./ACC_INV_0030GS.clt",	FormQueryString(formObj) );
		}
			
        //docObjects[0].DoSearch("./ACC_INV_0030GS.clt",	params);
		break;
	//#6707 [BNX] Adding Deposit button to A/R Entry Screen & Payment button to A/P Entry screen. Author: Thuong Huynh 2020/11/20
	case "CHECK":	//CHECK 대상 화면호출
		if (frm1.f_inv_seq.value == '') {
			alert(getLabel('FMS_COM_ALT029'));
			return;
		}
       	//VENDER INVOICE에  "#" 이 들어갈 경우 값이 잘리기때문에 치환한다.
       	var paramStr="./ACC_JOR_0030.clt?f_cmd=-1&s_inv_no="+formObj.f_inv_no.value+"&s_cust_cd="+org_trdp_cd+"&s_inv_tp="+"A/P";
       	parent.mkNewFrame('Payment Entry', paramStr);
       break;
	case "ROWADD":
		if(!rowaddChkVal()){
			return;
		}
		if (sheetObj.GetCellValue(sheetObj.LastRow(), "frt_term_cd") == "") {
			sheetObj.RemoveAll();
		}
		var intRows=sheetObj.LastRow() + 1;
		tempRow = intRows;
		sheetObj.DataInsert(intRows);
		//WMS ACCOUNT LKH 2015.01.20
		if (formObj.f_intg_bl_seq.value != "") {
			sheetObj.SetCellValue(intRows, "intg_bl_seq",formObj.f_intg_bl_seq.value);
		} else if (formObj.f_oth_seq.value != "") {
			sheetObj.SetCellValue(intRows, "oth_seq",formObj.f_oth_seq.value);
		}else if(formObj.f_wms_seq.value != ""){
        	sheetObj.SetCellValue(intRows, "wms_seq",formObj.f_wms_seq.value);
        }
		/* #20811 : [GPL] A/R Entry Screen - Make "Freight Name" Column Wider + Set "P/C" Column's Default Choice to "CC" jsjang 2013.9.24 */
		//sheetObj.CellValue(intRows, "frt_term_cd") = "PP";
		// #48769 - [IMPEX] AEH AWB COPY후 AP FREIGHT INPUT하고 FREIGHT 잡기위해 P/C 기본 세팅 수정 필요
		//sheetObj.SetCellValue(intRows, "frt_term_cd","CC");
		if(formObj.f_bnd_clss_cd.value == "O"){
        	sheetObj.SetCellValue(intRows, "frt_term_cd","PP");
        }else if(formObj.f_bnd_clss_cd.value == "I"){
        	sheetObj.SetCellValue(intRows, "frt_term_cd","CC");
        }
		sheetObj.SetCellEditable(intRows, "frt_check",1);
		sheetObj.SetCellValue(intRows, "frt_check","1");
		sheetObj.SetCellValue(intRows, "qty",'1');

    	//#2557 [LBS]AR Entry / A/P Entry / D/C Entry 의 환율 Validation 추가
    	//invoice 생성시 Invoice Date && Currency 값 없을시 inv_xcrt 누락(0) 수정
		//inv_xcrt 0 벨리데이션으로 처리
    	//sheetObj.SetCellValue(intRows, "inv_xcrt",1);

    	if (intRows > 2) {
    		// 기존에 등록된 데이터가 있는경우
    		sheetObj.SetCellValue(intRows, "rat_curr_cd",sheetObj.GetCellValue(intRows-1, "rat_curr_cd"));
    		sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",sheetObj.GetCellValue(intRows-1, "inv_aply_curr_cd"));
    		//sheetObj.SetCellValue(intRows, "inv_xcrt",sheetObj.GetCellValue(intRows-1, "inv_xcrt"));
    	} else {
    		// 신규로 등록하는 경우
    		//#138 Office Local Currency 추가
    		sheetObj.SetCellValue(intRows, "rat_curr_cd",formObj.f_curr_cd.value);
        	sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",formObj.f_curr_cd.value);
    		//sheetObj.SetCellValue(intRows, "inv_xcrt",1);
    	}

    	sheetObj.SetCellValue(intRows, "inv_xcrt_dt",formObj.f_inv_dt.value);

    	/*if(MULTI_CURR_FLAG == "Y" &&  document.frm1.f_hbl_no.value != ""){
    		ajaxSendPost(getDefaultDate, 'reqVal', '&goWhere=aj&bcKey=getDefaultDate&f_intg_bl_seq='+frm1.f_intg_bl_seq.value, './GateServlet.gsl');
    	}*/ 

		sheetObj.SetCellValue(intRows, "aply_ut_cd","UNIT");
		break;
	case "MODIFY": //등록
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
//        if(!checkVal()){
//        	return;
//        }
        
		//#3411 [JTC]Accounting & Performance 수정사항
		//AUTO_VAT_CALCULATING_AP 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
		if(AUTO_VAT_CALCULATING_AP == "Y") {
			doWork("VAT_CAL");
		}

		// 데이터 조회 후 생성하지 않았을 경우 경고 메세지
		//WMS ACCOUNT LKH 2015.01.20
		if (formObj.f_intg_bl_seq.value == "" && formObj.f_oth_seq.value == "" && formObj.f_wms_seq.value == ""){
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

	   /* #855 [SUNWAY] PREVENT AP CREATION BEFORE AR CREATION  */
	   /* O06 롤코드가 'N' 일경우 bl- AP저장시 AR 인보이스 체크  AR인보인스가 없을경우 생성불가 */
	   if(formObj.f_intg_bl_seq.value != ""){
		   if(!chkRoleInv(formObj.f_intg_bl_seq.value)){
			   var objArr = new Array();
			   objArr[0] = formObj.temp_bl_no.value; //#855
			   alert(getLabel2('FMS_COM_ALT114', objArr));
			   return;
		   }
	   }

	   /* #5859 [StarCluster-Mex] Adding Paid Column & Other filing A/P prevent logic  */
	   /* O09 Default 'N'- CAN BYPASS TO CREATE AP WITH NO AR INVOICES' (OTHER) */
	   if(formObj.f_oth_seq.value != ""){
		   if(!chkRoleInvOth(formObj.f_oth_seq.value)){
			   var objArr = new Array();
			   objArr[0] = formObj.temp_bl_no.value;
			   alert(getLabel2('FMS_COM_ALT114', objArr));
			   return;
		   }
	   }

       //#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
       if(formObj.f_vchr_no.value == "" || formObj.f_vchr_no.value == "AUTO"){
		   formObj.f_vchr_no.value = "";
	   }
       //#5894 [Zencon] Credit overlimited TP 에 대한 A/P 제한
       if(credit_limit != 'Y' && creditLimit_flg == 'Y'){
    	   alert(getLabel('ACC_MSG172'));
			return false;
		}
		//그리드 전체삭제시 invoice 를 삭제한다.
		if (!checkDelete()) {
			//OFVFOUR-7456: [LINKWIDE INT'L] SAVING MISC. OPERATION A/R INVOICE AND DELETING A/R INVOICE ISSUE
			if(!checkVal()){
	        	return;
	        }
			doWork("DELETE");
		} else {
			frm1.f_cmd.value=MODIFY;
			// frt 에 저장되는 post_dt의 값을 분리해야한다(#20443)
			//TODO  아무 권한이 없을때 POST_DT를 넣어야 하는지 BLOCK_DT를 넣어야 하는지에 따라 이하의 값 설정 필요
			//formObj.f_edit_post_dt.value = formObj.f_post_dt.value;
			formObj.f_edit_post_dt.value=addDay(formObj.block_post.value, 1);
			// FRT에 저장되는 Today는 이제  MAX(Block_dt)+1
    		//formObj.f_today_dt.value =addDay(formObj.block_post.value, 1);
 		    //LHK, Row ADD 된 경우 block 인 경우만 적용될 Invoce Date 를 f_today_dt 에 Set 한다.
 		    //post date 도 변경가능하기 때문에 BLOCK_POST_DT 와 비교하여 큰 값을 f_today_dt set
    		if(compareTwoDate(BLOCK_POST_DT, formObj.f_post_dt.value)){
 			   formObj.f_today_dt.value=BLOCK_POST_DT;
 		   	}else{
 			   formObj.f_today_dt.value=formObj.f_post_dt.value;
 		   	}
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

     		   if(ap_overpaid_permit != "Y"){  //#2338 [BNX][INDIA] OVERPAID (BNX INDIA)
     			   if (amtComFlg) {
     				   alert(getLabel('ACC_MSG118'));
     				   return;
     			   }
     		   }
				// Edit_post_dt의 값은 MAX(Block_DT)+1
				formObj.f_edit_post_dt.value=addDay(formObj.block_post.value, 1);
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
				// -----[20130401 OJG]-----
				if (frm1.f_inv_seq.value != '') {
					bPaid=false;
					ajaxSendPost(getInvoicePayAmt, 'reqVal', '&goWhere=aj&bcKey=getInvoicePayAmt&inv_seq=' + frm1.f_inv_seq.value, './GateServlet.gsl');
					if (bPaid) {
						//execPaidMagam();
						// doWork("SEARCHLIST");
						// return;
						for ( var i=2; i <= sheetObj.LastRow(); i++) {
							if (sheetObj.GetCellValue(i, "ibflag") != 'I') {
								sheetObj.SetCellValue(i, "ibflag",'R');
								sheetObj.SetCellValue(i, "del_chk",0);
								sheetObj.SetRowEditable(i,0);
							}
						}
					}
				}
				//-----[20130401 OJG]-----
				// 마감일때 POST_DT 는 오늘일자로 셋팅한다. =>  MAX(BLOCK_DT)+1로 수정
				if (formObj.f_clt_cmpl_flg.value == "Y") {
					//formObj.f_today_dt.value = TODAY;
					//formObj.f_today_dt.value = addDay(formObj.block_post.value, 1);
				}
			}
			// 필수항목체크
			if (checkVal()) {
			 	// Duplication check을 Billing information에 있는 Invoice # 와 Vendor Name (CODE)가 있다면 warning message을 보여 줍니다.
			 	var chrMsgTxt='';
			 	if (frm1.f_inv_no.readOnly == false && frm1.f_inv_no.value != '') {
			 		ajaxSendPost(getBuyInvNoDupChk, '', '&goWhere=aj&bcKey=selectBuyInvNoDupChk&inv_seq=' + frm1.f_inv_seq.value + '&buy_inv_no=' + frm1.f_inv_no.value + '&trdp_cd=' + frm1.f_vendor_cd.value, './GateServlet.gsl');
		 		}
			 	if(isBuyInvNoDupChk){
			 		chrMsgTxt=getLabel('ACC_INV_0031_MSG01');
			 	} else {
			 		chrMsgTxt=getLabel(saveMsg);
			 	}
			 	// 사용후 초기화
			 	isBuyInvNoDupChk=false;
			 	if (confirm(chrMsgTxt)) {
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
					if (formObj.f_buy_inv_rcv.checked) {
						formObj.f_buy_inv_rcv.value == "Y";
					}
					if (formObj.f_tax_bill.checked) {
						formObj.f_tax_bill.value="Y";
					}
					formObj.f_amt_tot.value=removeComma(formObj.f_amt_tot.value);
					formObj.f_vatamt_tot.value=removeComma(formObj.f_vatamt_tot.value);
					formObj.f_totamt_tot.value=removeComma(formObj.f_totamt_tot.value);
					formObj.f_paid_amt.value=removeComma(formObj.f_paid_amt.value);
					var sht2=sheetObj2.GetSaveString(false); // Bill
																// Collecting
																// List
					
					
         		   
 	           	   //#4022 [JAPT] Invoice Currency 가 JPY 인 경우 Local Ex.Rate 정보가 잘못 처리되어 저장된 BUG
   	           	   //Great Luck testing 0402 - #5 
					if(GL_VIEW_FALG=='Y'){
						if(formObj.f_ofc_locl_curr_cd.value == formObj.f_curr_cd.value && formObj.f_loc_ex_rate.value != 1){
	 	           		   alert(getLabel('FMS_COM_ALT149'));
	 	           		   formObj.f_loc_ex_rate.value = 1;
	 	           	   }   
					}
					var intRows2=sheetObj2.LastRow() + 1;
					sheetObj2.DataInsert(intRows2);
					sheetObj.DoAllSave("./ACC_INV_0030GS.clt", FormQueryString(formObj) + '&' + sht2, true);
				}
			}
		}
		break;
	case "DELETE": //삭제
        //데이터 조회 후 생성하지 않았을 경우 경고 메세지
	   if(formObj.f_inv_seq.value != ""){
		   ajaxSendPost(getInvModiTms, 'reqVal', '&goWhere=aj&bcKey=searchInvModiTms&inv_seq='+formObj.f_inv_seq.value, './GateServlet.gsl');
		  if (isInvModiTmsOk) {
			  // 인보이스가 변경된 경우
   		   alert(getLabel('ACC_MSG128'));
   		   return;
		  }
       }
		if (frm1.f_inv_seq.value != "") {
			frm1.f_cmd.value=REMOVE;
			if (confirm(getLabel('FMS_COM_CFMDEL'))) {
				for ( var i=2; i <= sheetObj.LastRow(); i++) {
					sheetObj.SetCellValue(i, "ibflag","D");
				}
				formObj.f_amt_tot.value=removeComma(formObj.f_amt_tot.value);
				formObj.f_vatamt_tot.value=removeComma(formObj.f_vatamt_tot.value);
				formObj.f_totamt_tot.value=removeComma(formObj.f_totamt_tot.value);
				sheetObj.DoSave("ACC_INV_0030GS.clt", FormQueryString(formObj), "ibflag", false);
				// 화면초기화
				clearAll();
			}
		}
		break;
	case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		rtnary=new Array(1);
		rtnary[0]="";
//		rtnary[1]=formObj.f_vendor_nm.value;
//		rtnary[2]=window;

		callBackFunc = "CUSTOMER_POPLIST";
		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");

		break;
	case "CUSTOMER_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		rtnary=new Array(1);
		rtnary[0]="";
		rtnary[1]=formObj.f_vendor_nm.value;
		rtnary[2]=window;

		callBackFunc = "CUSTOMER_POPLIST";
		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");

		break;
	case 'PRINT':
		if (frm1.f_inv_seq.value == '') {
			alert(getLabel('FMS_COM_ALT029'));
			return;
		}
		/*
			if(formObj.f_oth_seq.value != ""){
				if(formObj.f_bl_cnt_cd.value == "US"){
					formObj.file_name.value='invoice_11_1.mrd';
				}else{
					formObj.file_name.value='invoice_12_1.mrd';
				}
			}else{
				if(formObj.f_bl_cnt_cd.value == "US"){
					formObj.file_name.value='invoice_11.mrd';
				}else{
					formObj.file_name.value='invoice_12.mrd';
				}
			}
		 */
		formObj.file_name.value='invoice_13.mrd';
		formObj.title.value='PAYMENT REQUEST';
		// Parameter Setting
		var param="[" + "'" + formObj.f_inv_seq.value + "'" + ']'; // [1]
		param += '[' + formObj.f_vendor_cd.value + ']'; // Vendor [2]
		param += '[' + formObj.f_ref_ofc_cd.value + ']'; // REF_OFC_CD [3]
		param += '[' + formObj.f_bl_cnt_cd.value + ']'; // CNT_CD [4]
		param += '[' + formObj.f_usr_nm.value + ']'; // USER_NM [5]
		param += '[' + formObj.f_email.value + ']'; // USER EMAIL [6]
		param += '[' + formObj.f_usrPhn.value + ']'; // 7
		param += '[' + formObj.f_usrFax.value + ']'; // 8
		// param += '[' + formObj.f_usrId.value + ']'; // 9
		/* LHK 20130822 User Name 으로 수정 */
		param += '[' + formObj.f_usr_nm.value + ']'; // 9
		param += '[' + formObj.f_hbl_no.value + ']'; // 10
		// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
		if (formObj.chkMailAp.value === 'Y') {
			if (formObj.f_hbl_no.value == '') {
				formObj.mailTitle.value = "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]";
			} else {
				formObj.mailTitle.value = "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]" + ' [HBL No: ' + formObj.f_hbl_no.value + ']';
			}
		}
		else {
			formObj.mailTitle.value = "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]";
		}
		formObj.rd_param.value=param;
		formObj.rpt_biz_tp.value="ACCT";
		formObj.rpt_biz_sub_tp.value="AP";
		formObj.rpt_trdp_cd.value=formObj.f_vendor_cd.value;
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
				popGET('RPT_PRN_0180.clt'+reqParam, '', 1270, 750, "scroll:yes;status:no;help:no;");
			//WMS ACCOUNT LKH 2015.01.20
	   	 	}else if(formObj.f_wms_seq.value != ""){
			   	var reqParam='?oth_seq=' + formObj.f_wms_seq.value;
					reqParam += '&ref_no=' + formObj.f_ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "W";
					reqParam += '&bnd_clss_cd=' + "N";
					reqParam += '&biz_clss_cd=' + "";
				popGET('RPT_PRN_0210.clt'+reqParam, '', 630, 400, "scroll:yes;status:no;help:no;");
	   	 	}else if(formObj.f_oth_seq.value != ""){ //Other Operation
	   	 		var reqParam='?oth_seq=' + formObj.f_oth_seq.value;
					reqParam += '&ref_no=' + formObj.f_ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "0";
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
		    /* tax_mgmt_use에 상관없이 기존 VAT코드는 모두 삭제 되어야 함(VAT CODE가 변경될 때를 고려)
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
		    */

		    // VAT코드별로 계산 - #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
		    // tax_mgmt_use에 상관없이 기존 VAT코드는 모두 삭제 되어야 함
	    	if (ARR_VAT_FRT_CD != null) {
		    	for (var ii = 0 ; ii < ARR_VAT_FRT_CD.length ; ii++ ) {
			    	for(var i=sheetObj.LastRow(); i>=2; i--){
			    		// VAT Clear
			    		if(ARR_VAT_FRT_CD[ii] != "" && ARR_VAT_FRT_CD[ii] == sheetObj.GetCellValue(i, "frt_cd")){
			    			sheetObj.SetRowHidden(i, 1);
			    			//OFVFOUR-7823: [AIF] AMOUNT MISMATCH BETWEEN AMOUNT DUE AND TOTAL AMOUNT IN A/R ENTRY
			    			sheetObj.SetCellValue(i, "frt_check", "0");
			    			sheetObj.SetCellValue(i, "del_chk", "1");
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

		    var vatCurCdArr = "";
		    var vatCurRowArr = "";
		    var whldVatCurCdArr = "";
		    var whldVatCurRowArr = "";

		    /* VAT코드별로 계산 - #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
		    for(var i=2; i<=sheetObj.LastRow();i++){
		    	var currCurCd = sheetObj.GetCellValue(i, "rat_curr_cd");
		    	frtVatRt = sheetObj.GetCellValue(i, "vat_rt") ==null ? 0 : sheetObj.GetCellValue(i, "vat_rt");
		    	if(frtVatRt > 0 && sheetObj.GetCellValue(i, "frt_check") ){
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
		    */

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

//			    	if(frtVatRt > 0 && sheetObj.GetCellValue(i, "frt_check") ){
			    	if( vatRtCdFlg && sheetObj.GetCellValue(i, "frt_check") ){
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
		    	// 기존 방식과 동일
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

    		/* VAT코드별로 계산 - #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
    		for(var i=0; i<vatCurCd.length-1; i++){
    			var aplyRow = vatCurRow[i];
    			var aplySumAmt = 0;

    			for(var j=2; j<=sheetObj.LastRow();j++){
    		    	frtVatRt = sheetObj.GetCellValue(j, "vat_rt") ==null ? 0 : sheetObj.GetCellValue(j, "vat_rt");
    		    	if(frtVatRt > 0 && sheetObj.GetCellValue(j, "frt_check") && vatCurCd[i] == sheetObj.GetCellValue(j, "rat_curr_cd")){
    		    		aplySumAmt += sheetObj.GetCellValue(j, "trf_cur_sum_amt") * frtVatRt / 100;
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
	    		sheetObj.SetCellValue(intRows, "vat_rt", 0);
	    		sheetObj.SetCellValue(intRows, "whld_vat_rt", 0);
	    		sheetObj.SetCellValue(intRows, "rat_curr_cd", vatCurCd[i]);
	    		sheetObj.SetCellValue(intRows, "inv_aply_curr_cd", sheetObj.GetCellValue(aplyRow, "inv_aply_curr_cd"));
	    		sheetObj.SetCellValue(intRows, "inv_xcrt", sheetObj.GetCellValue(aplyRow, "inv_xcrt"));
	    		sheetObj.SetCellValue(intRows, "inv_xcrt_dt", sheetObj.GetCellValue(aplyRow, "inv_xcrt_dt"));
	    		sheetObj.SetCellValue(intRows, "intg_bl_seq",sheetObj.GetCellValue(aplyRow, "intg_bl_seq"));
	    		sheetObj.SetCellValue(intRows, "oth_seq",sheetObj.GetCellValue(aplyRow, "oth_seq"));
	    		sheetObj.SetCellValue(intRows, "ibflag","I");
	    		sheetObj.SetCellEditable(intRows, "ps_check",0);
	    		sheetObj.SetRowBackColor(intRows,"#DFFFFF");
    		}
    		*/
    		// VAT코드별로 계산 - #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
    		if (tax_mgmt_use == "Y"){
	    		for(var i=0; i<vatCurCd.length-1; i++){
	    			var vatCurCd2 = vatCurCd[i].split("&&");
	    			var aplyRow = vatCurRow[i];
	    			var aplySumAmt = 0;
	    			var aplyTotalSumAmt = 0; //#2535 [LBS] VAT 환율 적용 로직 개선
	    			var sVatFrtCd = "";
	    			var sVatFrtCd1 = "";
	    			var sVatFrtCd2 = "";

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
	    		    		if(0 < frtVatRt){
	    		    			//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    			aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt / 100));
	    		    			aplyTotalSumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt / 100)); //#2535 [LBS] VAT 환율 적용 로직 개선
	    		    		}else{
	    		    			//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    			aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * frtVatRt);
	    		    			aplyTotalSumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * frtVatRt); //#2535 [LBS] VAT 환율 적용 로직 개선
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
	    		    		if(0 < frtVatRt1){
	    		    			//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    			aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt1 / 100));
	    		    			aplyTotalSumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt1 / 100)); //#2535 [LBS] VAT 환율 적용 로직 개선
	    		    		}else{
	    		    			//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    			aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * frtVatRt1);
	    		    			aplyTotalSumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * frtVatRt1); //#2535 [LBS] VAT 환율 적용 로직 개선
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
	    		    		if(0 < frtVatRt2){
	    		    			//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    			aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt2 / 100));
	    		    			aplyTotalSumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * (frtVatRt2 / 100)); //#2535 [LBS] VAT 환율 적용 로직 개선
	    		    		}else{
	    		    			//6879 [STAR MEX] AR INVOICE - TOTAL AMOUNT DIFFERENT [VAT]
	    		    			aplySumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * frtVatRt2);
	    		    			aplyTotalSumAmt += (((sheetObj.GetCellValue(j, "ru") * sheetObj.GetCellValue(j, "qty")) * sheetObj.GetCellValue(aplyRow, "inv_xcrt")) * frtVatRt2); //#2535 [LBS] VAT 환율 적용 로직 개선
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
	    			sheetObj.SetCellValue(intRows, "vat_rt", 0);
		    		sheetObj.SetCellValue(intRows, "whld_vat_rt", 0);
		    		sheetObj.SetCellValue(intRows, "rat_curr_cd", vatCurCd2[0]);
		    		sheetObj.SetCellValue(intRows, "inv_aply_curr_cd", sheetObj.GetCellValue(aplyRow, "inv_aply_curr_cd"), 0);
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
    				if(curr=="KRW" || curr=="JPY" || (curr=="VND" && vnCalRound=="Y")){
    					sheetObj.SetCellValue(intRows, "inv_sum_amt",roundXL(aplyTotalSumAmt,0) );
    				}else{
    					sheetObj.SetCellValue(intRows, "inv_sum_amt",roundXL(aplyTotalSumAmt,2) );
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
    				if(curr=="KRW" || curr=="JPY" || (curr=="VND" && vnCalRound=="Y")){
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

    			//#2535 [LBS] VAT 환율 적용 로직 개선	round(rount(qty*ru*VATRT, 2)*inv_xcrt, 2) -> ound((qty*ru*VATRT)*inv_xcrt, 2)
				var curr=formObj.f_curr_cd.value;
				if(curr=="KRW" || curr=="JPY" || (curr=="VND" && vnCalRound=="Y")){
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

		case "PRINT_BLOCK":
        	if(frm1.f_inv_seq.value == ''){
				alert(getLabel('FMS_COM_ALT029'));
				return;
			}

        	ajaxSendPost(getInvBlockCheck, 'reqVal', '&goWhere=aj&bcKey=getInvBlockCheck&inv_seq='+frm1.f_inv_seq.value, './GateServlet.gsl');

   	 	break;

   	 	//#2189 [BNX][INDIA] AP Actual Shipper & CNEE 추가 // 1 Master 3 House
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

function CUSTOMER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.f_vendor_cd.value=rtnValAry[0];// full_nm
		
		//Jeong-Il Park Order - Name Change 
		if ( MULTI_LANGUAGE == "Y" ){
			formObj.f_vendor_nm.value=rtnValAry[10];// locl_nm
		}else{
			formObj.f_vendor_nm.value=rtnValAry[2];// eng_nm
		}
		
		formObj.f_terms.value=rtnValAry[17]; // term_cd
		formObj.f_term_dt.value=rtnValAry[18]; // term_dt
		calcCreateTerms();
		chgTrdpInfo();
	}
}
//--------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage) {
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg() {
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList() {
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

	//fnSetAutocomplete('f_vendor_nm', 'ACC_POPLIST', 'billto'); //Customer
	/* #2111 자동완성 기능 추가  */
	fnSetAutocompleteCallBack('f_vendor_nm', 'CUSTOMER_POPLIST', 'LINER_POPLIST'); //Customer
	
	//OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails
    var opt_key = "EXTENT_RPT_FILE_NAME_FLG";
	ajaxSendPost(setFileNameflag, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	var opt_key = "TAX_COL";
	ajaxSendPost(setTaxColReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	opt_key = "WHLD_TAX_COL";
	ajaxSendPost(setWhldTaxColReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	var opt_key = "BLCK_AP_INV_ADD";
	ajaxSendPost(setBlckApInvAddReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	//#4239 [JAPT] AP INVOICE, PAID 후에 INVOICE 수정 가능한 문제
	var opt_key = "PAID_AP_INV_ADD";
	ajaxSendPost(setPaidApInvAddReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	// A/R, A/P Invoice에서 TAX코드 관리 여부(Y : TAX Code 관리, VAT%별로 VAT 관리 및 Report 출력물 MultiCurrency별 Total 계산로직 추가)
	opt_key = "TAX_MGMT_USE";
	ajaxSendPost(setTaxMgmtUse, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	// #1098 [BNX] INDIA 오피스 - 요구사항 항목
	ajaxSendPost(setTaxOpt, "reqVal", "&goWhere=aj&bcKey=getTaxOpt&s_ofc_cd="+frm1.f_ofc_cd.value, "./GateServlet.gsl");

	//#2338 [BNX][INDIA] OVERPAID (BNX INDIA)
	ajaxSendPost(setApOverpaidPermit, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key=AP_OVERPAID_PERMIT", "./GateServlet.gsl");

	
	//#2750 [BINEX, IMPEX] AP Invoice Update After Paid or File Block
	opt_key='AP_AFTER_BLOCK';
	ajaxSendPost(setApAfterBlock, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	opt_key = "USE_LOCL_GL_VIEW_FALG";
	ajaxSendPost(setUseLoclGlViewFalg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");	
	//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	opt_key = "INV_XCRT_APPL_TP";
	ajaxSendPost(setInvXcrtApplTp, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	opt_key = "VN_VAT_CAL_ROUND";
	ajaxSendPost(setVnCalRound, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	// OFVFOUR-8099 [BEST OCEAN] REMOVING PRINT BUTTON WHEN THERE IS PRINT/L IN THE SAME SCREEN
    var opt_key = "VISIBLE_PRINT_BUTTON";
	ajaxSendPost(setVisiblePrintButton, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for (i=0;isRun && i < docObjects.length; i++) {
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i], i + 1);
		// khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
		if(i == docObjects.length - 1){
			isRun = false;
		}
	}
	//오늘일자구하기
	var now=new Date();
	var year=now.getFullYear();
	var month=now.getMonth() + 1;
	var date=now.getDate();
	if (month < 10) {
		month="0" + (month);
	}
	if (date < 10) {
		date="0" + date;
	}
	TODAY=month + "-" + date + "-" + year;
	formObj.f_today_dt.value=TODAY;
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

	// 체크로직의 변경 SLIP DATE => BLOCK DATE
	//File Block_dt 와 Post Date 체크
	//LHK, 20131016 Post Date Set, Invoice 생성 전에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set 한다.
	//LHK, POST DATE 변경시 BLOCK_POST_DT 비교, BLOCK_POST_DT 보다 POST DATE가 커야함.
	setBLOCK_POST_DT();
	if (formObj.f_inv_seq.value == "") {

		var tempPostDt=formObj.f_post_dt.value;
    	var tempBlockDt=BLOCK_POST_DT;
    	if(BLOCK_POST_DT != ""){
    		if(compareTwoDate(tempBlockDt, tempPostDt)){
    			formObj.f_post_dt.value=tempBlockDt;
    			formObj.old_post_dt.value=tempBlockDt;
    			formObj.f_today_dt.value=tempBlockDt;
    			if(formObj.post_dt_inv.value == "POST"){
    				formObj.f_inv_dt.value=tempBlockDt;
    			}
    		}
    	}

    	formObj.f_vendor_cd.focus();
//		formObj.f_vendor_cd.blur();
//    	 #6918 [JAPAN TRUST] Missing Due Date when creating DC invoice - Author: Thuong Huynh - 2020/11/20
    	codeNameAction('VENDOR',document.frm1.f_vendor_cd, 'onBlur');
    	
//		formObj.f_post_dt.value   = BLOCK_POST_DT;
//		formObj.f_inv_dt.value    = BLOCK_POST_DT;
//		formObj.old_post_dt.value = BLOCK_POST_DT;
//		formObj.f_today_dt.value  = BLOCK_POST_DT;
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
			formObj.f_today_dt.value=BLOCK_POST_DT;
		}else{
			BLOCK_POST_DT="";
		}
	}
	*/
/*	// BL의 POST DATE가 SLIP의 MAX(POST_DT) 보다 작으면.. MAX(POST_DT) + 1 로 셋팅한다.
	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	// AP건은 새로작성시에만 VALIDATION을 건다.
	if (formObj.f_inv_seq.value == "") {
		if (bl_post != "" && slip_post != "") {
			bl_post=bl_post.replaceAll("-", "");
			bl_post=bl_post.substring(4, 8) + bl_post.substring(0, 2)
					+ bl_post.substring(2, 4);
			slip_post=slip_post.substring(4, 8) + slip_post.substring(0, 2)
					+ slip_post.substring(2, 4);
			if (slip_post >= bl_post) {
				SLIP_POST_DT=addDay(formObj.slip_post.value, 1);
				formObj.f_post_dt.value=SLIP_POST_DT;
				formObj.f_inv_dt.value=SLIP_POST_DT;
				formObj.old_post_dt.value=SLIP_POST_DT;
			} else {
				SLIP_POST_DT="";
			}
		}
	}*/
	//TAX_BILL 을 SEOUL만 활성화 한다.
	/*
	if (formObj.f_ofc_cd.value == "SEL") {
		formObj.f_tax_bill.disabled=false;
	}
	*/
	// #50285 - [LOA] W/H DOC 에서 입력되는 MBL, HBL, CONTAINER 정보가 INVOICE에도 나오도록
	// wmd #1069 Closing other entry
	if(formObj.f_wms_seq.value != ""){
		if(formObj.f_wms_cntr_info.value != ""){
			formObj.f_remark.value = formObj.f_wms_cntr_info.value;
		}
	}

	//WMS ACCOUNT LKH 2015.01.20
	if (formObj.f_intg_bl_seq.value != "" || formObj.f_oth_seq.value != "" || formObj.f_wms_seq.value != ""){ // wmd #1069 Closing other entry
		if (!(formObj.f_inv_seq.value == "" && formObj.chk_fr_trdp_cd.value == "")) {
			doWork("SEARCHLIST");
		}else{
			formObj.chk_fr_frt_seq.value = "";
		}
	}
	//BL에 매칭된 CNTR TP/SZ를 가져온다.
	if (formObj.f_intg_bl_seq.value != "") {
		var intg_bl_seq=formObj.f_intg_bl_seq.value;
		ajaxSendPost(getBlCntrInfo, 'reqVal', '&goWhere=aj&bcKey=searchBlCntrInfo&f_intg_bl_seq=' + intg_bl_seq, './GateServlet.gsl');
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

	sheet1_OnLoadFinish(sheet1);
	
	//#3411 [JTC]Accounting & Performance 수정사항
	//AUTO_VAT_CALCULATING_AP 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
	if(AUTO_VAT_CALCULATING_AP == "Y") {
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
	//#3974 [JAPT]A/P Entry- Invoice Received check 로직 적용
	chkInvRcv(formObj.f_inv_no);
	//#5894 [Zencon] Credit overlimited TP 에 대한 A/P 제한
	chkTypeBl();
	if (credit_limit != 'Y' && creditLimit_flg == 'Y') {
		document.getElementById('rowAddBtn2').style.display="none";		
	}
	
	// [OFVFOUR-6997] - [Binex-LA] Balance mismatch issue: check freight has invoice
	if(formObj.f_intg_bl_seq.value != "" && formObj.chk_fr_frt_seq.value != ""){
		var chk_fr_frt_seq=formObj.chk_fr_frt_seq.value;
		ajaxSendPost(getFrtModiTms, 'reqVal', '&goWhere=aj&bcKey=searchFrtModiTms&frt_seq='+chk_fr_frt_seq, './GateServlet.gsl');
	}
//	OFVFOUR-7582[OceanBlue] Remark on AP Entry
	if (!formObj.f_inv_seq.value) {
		formObj.f_remark.value = remark.substring(0, remark.lastIndexOf('\r\n') == -1? 0: remark.lastIndexOf('\r\n'));
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
		

	// #2750 [BINEX, IMPEX] AP Invoice Update After Paid or File Block
	apAfterBlock(paidAmtYn, fileBolckYn);
		
	/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.13 */
	//jnrYn은 Monthly Closing 에 사용되는 컬럼이었는데, 현재는 안쓴다고 함.
	if (jrnYn == "Y" || clsYn =="Y") {
		editInputForm(false);
		editSheet(false);
	}

	// #4239 [JAPT] AP INVOICE, PAID 후에 INVOICE 수정 가능한 문제
	if (paid_ap_inv_add == "N"){
		if ( paidAmtYn && !fileBolckYn){
			getObj('rowAddBtn2').style.display="none";
			getObj('rowAddBtn4').style.display="none";
			
			//#3411 [JTC]Accounting & Performance 수정사항
			//AUTO_VAT_CALCULATING_AP 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
			// 'Y' : VAT Cal. 버튼 비활성화
			if(AUTO_VAT_CALCULATING_AP != 'Y') {
				getObj('vatBtn').style.display="none";
			}
		}
	}
	
	
	// #48834 - [WEBTRANS] AP 경우 BLOCK 된 데이타 FREIGHT 추가 가능 로직 REMOVE 요청
	if (blck_ap_inv_add == "N"){
		if (fileBolckYn){
			getObj('rowAddBtn2').style.display="none";
			getObj('rowAddBtn4').style.display="none";

			//#3411 [JTC]Accounting & Performance 수정사항
			//AUTO_VAT_CALCULATING_AP 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
			// 'Y' : VAT Cal. 버튼 비활성화
			if(AUTO_VAT_CALCULATING_AP != 'Y') {
				getObj('vatBtn').style.display="none";
			}
		}
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
		if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){			//
			//WMS ACCOUNT LKH 2015.01.20
			if(collTxt[i].name == "f_agent_cd" || collTxt[i].name == "f_agent_nm" ||
					collTxt[i].name == "f_agent_ref_no" || collTxt[i].name == "f_profit_share" ||
					collTxt[i].name == "f_vendor_cd" || collTxt[i].name == "f_vendor_nm" ||
					collTxt[i].name == "f_inv_no" || //collTxt[i].name == "f_post_dt" ||
					collTxt[i].name == "f_inv_dt" || collTxt[i].name == "f_term_dt" ||
					collTxt[i].name == "f_due_dt" || collTxt[i].name == "f_last_paid_dt_cal" ||
					collTxt[i].name == "s_bl_no" || collTxt[i].name == "s_ref_no" ||
					collTxt[i].name == "s_oth_no" || collTxt[i].name == "s_inv_no" ||
					collTxt[i].name == "s_wms_no"
			) {
				collTxt[i].className="search_form";
				collTxt[i].readOnly=!flg;
			}
		}
	}
	frm1.f_terms.disabled=!flg;
	frm1.f_curr_cd.disabled=!flg;
	frm1.f_remark.disabled=!flg;
	frm1.f_inco_cd.disabled=!flg;
	frm1.f_buy_inv_rcv.disabled=!flg;

	//#2251 [BINEX] BLOCKED DATA AP INVOICE # 또 변경됨
	frm1.f_inv_dt.disabled=!flg;
	frm1.f_term_dt.disabled=!flg;
	frm1.f_inv_dt_cal.disabled=!flg;
	frm1.f_due_dt_cal.disabled=!flg;
	frm1.f_vchr_tp_cd.disabled=!flg;

	if (flg) {
		//saveBtn1.style.display="inline";
		//span id 처리 getObj('saveBtn2').style.display="inline";
		getBtnObj('btnModify').style.display="inline";
		getBtnObj('btnSaveX').style.display="inline";
		frm1.billto.onclick=function(){doWork("CUSTOMER_POPLIST");};
		frm1.billto.style.cursor="hand";
		//frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDate();if(frm1.f_terms.value != ''){calcCreateTerms();}};
		frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDt();};
		frm1.f_term_dt.onblur=function(){calcCreateTerms();};
		// frm1.f_post_dt_cal.onclick	 = function(){doDisplay('DATE1', frm1);};
		frm1.f_inv_dt_cal.onclick=function(){doDisplay('DATE2', frm1);};
		frm1.f_due_dt_cal.onclick=function(){doDisplay('DATE3', frm1);};
		frm1.dateImg4.onclick=function(){doDisplay('DATE4', frm1);};
	} else {
		//saveBtn1.style.display="none";
		//span id 처리 getObj('saveBtn2').style.display="none";
		getBtnObj('btnModify').style.display="none";
		getBtnObj('btnSaveX').style.display="none";
		frm1.billto.onclick="";
		frm1.billto.style.cursor="";
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
function editSheet(flg){	console.log('editSheet(flg):' + flg);
	var sheetObj=docObjects[0];

	// Row Add 버튼 보이기/숨기기
	if (flg) {
		//rowAddBtn1.style.display="inline";
		getObj('rowAddBtn2').style.display="inline";
		getObj('rowAddBtn4').style.display="inline";

		//#3411 [JTC]Accounting & Performance 수정사항
		//AUTO_VAT_CALCULATING_AP 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
		// 'Y' : VAT Cal. 버튼 비활성화
		if(AUTO_VAT_CALCULATING_AP != 'Y') {
			getObj('vatBtn').style.display="inline";
		}

		// Save버튼 보이기/숨기기
		//saveBtn1.style.display="inline";
		//span id 처리 getObj('saveBtn2').style.display="inline";
		getBtnObj('btnModify').style.display="inline";
		getBtnObj('btnSaveX').style.display="inline";
	} else {
		//rowAddBtn1.style.display="none";
		getObj('rowAddBtn2').style.display="none";
		getObj('rowAddBtn4').style.display="none";

		//#3411 [JTC]Accounting & Performance 수정사항
		//AUTO_VAT_CALCULATING_AP 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
		// 'Y' : VAT Cal. 버튼 비활성화
		if(AUTO_VAT_CALCULATING_AP != 'Y') {
			getObj('vatBtn').style.display="none";
		}
		// Save버튼 보이기/숨기기
		//saveBtn1.style.display="none";
		//span id 처리 getObj('saveBtn2').style.display="none";
		getBtnObj('btnModify').style.display="none";
		getBtnObj('btnSaveX').style.display="none";
	}
	// sheet edit 가능/불가
	sheetObj.SetEditable(flg);
	sheetObj.RenderSheet(1);

	//LHK, 20140911, #43597 [BINEX]Close 후 A/P 수정 오류, BLOCK 된 인보이스(AR, AP, DC) 는 edit 권한 있어도 DEL 항목 check 안되도록 수정
	var fileBolckYn = sheetObj.GetCellValue(2, "clt_cmpl_flg");
	var jrnYn = sheetObj.GetCellValue(2, "jnr_yn");
	var clsYn = sheetObj.GetCellValue(2, "cls_yn");

	for ( var i=2; i <= sheetObj.LastRow(); i++) {

		var frt_check_flg = sheetObj.GetCellEditable(i,"frt_check");
		var cntr_tpsz_cd_flg = sheetObj.GetCellEditable(i,"cntr_tpsz_cd");

		sheetObj.SetRowEditable(i,flg);

		if (flg) {
			sheetObj.SetCellEditable(i,"frt_check",frt_check_flg);
			sheetObj.SetCellEditable(i,"cntr_tpsz_cd",cntr_tpsz_cd_flg);
		}
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
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj, sheetNo) {
	switch (sheetNo) {
	case 1: //IBSheet1 init
		if(MULTI_CURR_FLAG == "Y"){
			with (sheetObj) {
		        if (location.hostname != "")
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

		        var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
		        var headers = [ { Text:getLabel('ACC_INV_0030_HDR_3'), Align:"Center"},
		                    { Text:getLabel('ACC_INV_0030_HDR_4'), Align:"Center"} ];
		        InitHeaders(headers, info);

		        //WMS ACCOUNT LKH 2015.01.20
		        var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"frt_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"frt_check",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
		               {Type:"Combo",     Hidden:0, Width:250,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		               {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, EditLen:100 },
		               {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"frt_term_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"aply_ut_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Combo",     Hidden:0, Width:70,  Align:"Center",  ColMerge:1,   	SaveName:"rat_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },

//		               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//		               {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		               {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		               {Type:"Combo",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt_cd",               KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },

		               // #1098 [BNX] INDIA 오피스 - 요구사항 항목
		               {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt1",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		               {Type:"Combo",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt_cd1",               KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt2",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		               {Type:"Combo",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt_cd2",               KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },

		               {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"whld_vat_rt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		               {Type:"Float",      Hidden:1,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:"vat_amt",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:21 },

		               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"ru",                KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:16 },
		               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"qty",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
		               {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"trf_cur_sum_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:21 },
		               {Type:"Combo",     Hidden:0, Width:60,  Align:"Center",  ColMerge:1,   	SaveName:"inv_aply_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Date",      Hidden:0, Width:75,    Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },

//		               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//		               {Type:"Float",      Hidden:0, Width:65,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		               {Type:"Float",      Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:21 },

		               {Type:"Float",      Hidden:1, Width:85,   Align:"Right",   ColMerge:1,   SaveName:"inv_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:21 },
		               {Type:"Float",      Hidden:1, Width:45,   Align:"Right",   ColMerge:1,   SaveName:"inv_vat_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:21 },
		               {Type:"Float",      Hidden:0, Width:85,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:21 },
		               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_pay_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"buy_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_chk_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Float",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_bal_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Float",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inco_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"buy_inv_rcv",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_bil_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cmb_inv_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"block_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"frt_inv_post_dt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"wms_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tax_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"vchr_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"vchr_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                   //#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	                   {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                   {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_xcrt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	              	   {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_amt",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	              	   // #6307 [Starcluster-MEX] Add tax Inv No in aging, local and agent statement (Zen#2159)
	              	   {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];

			        InitColumns(cols);

			        SetEditable(1);
			              /* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.13 */
			        SetHeaderRowHeight(20);
			        SetHeaderRowHeight(21);

			        SetColProperty('frt_cd_nm', {InputCaseSensitive:1} );

			        SetColProperty('frt_cd', {ComboText:FRTCD2, ComboCode:FRTCD1} );
			        SetColProperty('cntr_tpsz_cd', {ComboText:TPSZ1, ComboCode:TPSZ1} );
			        SetColProperty('aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );

			        /* #20811 : [GPL] A/R Entry Screen - Make "Freight Name" Column Wider + Set "P/C" Column's Default Choice to "CC" jsjang 2013.9.24 */
			        SetColProperty('frt_term_cd', {ComboText:"CC|PP", ComboCode:"CC|PP"} );

			        SetColProperty('rat_curr_cd', {ComboText:' |'+CURRCD, ComboCode:' |'+CURRCD} );
			        SetColProperty('inv_aply_curr_cd', {ComboText:' |'+CURRCD, ComboCode:' |'+CURRCD} );
 		           // #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
 		           SetColProperty('vat_rt_cd', {ComboText:VAT_VAL, ComboCode:VAT_CD} );
		           SetColProperty('vat_rt_cd1', {ComboText:VAT_VAL, ComboCode:VAT_CD} );
		           SetColProperty('vat_rt_cd2', {ComboText:VAT_VAL, ComboCode:VAT_CD} );

			        SetSheetHeight(240);
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
			with (sheetObj) {
		        if (location.hostname != "")
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

		        var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
		        var headers = [ { Text:getLabel('ACC_INV_0030_HDR_1'), Align:"Center"},
		                    { Text:getLabel('ACC_INV_0030_HDR_2'), Align:"Center"} ];
		        InitHeaders(headers, info);

		        //WMS ACCOUNT LKH 2015.01.20
		        var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"frt_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"frt_check",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
		               {Type:"Combo",     Hidden:0, Width:250,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		               {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, EditLen:100 },
		               {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"frt_term_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"aply_ut_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },

//		               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//		               {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		               {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		               {Type:"Combo",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt_cd",               KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },

		               // #1098 [BNX] INDIA 오피스 - 요구사항 항목
		               {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt1",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		               {Type:"Combo",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt_cd1",               KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt2",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		               {Type:"Combo",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt_cd2",               KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },

		               {Type:"Float",      Hidden:1,  Width:38,   Align:"Right",   ColMerge:1,   SaveName:"whld_vat_rt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		               {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"vat_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },

		               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"ru",                KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
		               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"qty",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		               {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"trf_cur_sum_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
		               {Type:"Text",      Hidden:1, Width:60,   Align:"Center",   ColMerge:1,   SaveName:"rat_curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },

//		               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//		               {Type:"Float",      Hidden:1, Width:65,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		               {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },

		               {Type:"Date",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Float",      Hidden:1, Width:85,   Align:"Right",   ColMerge:1,   SaveName:"inv_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		               {Type:"Float",      Hidden:1, Width:45,   Align:"Right",   ColMerge:1,   SaveName:"inv_vat_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		               {Type:"Float",      Hidden:1, Width:85,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
		               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_pay_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"buy_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_chk_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Float",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_bal_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Float",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inco_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"buy_inv_rcv",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_bil_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cmb_inv_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"jnr_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_yn",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"cls_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"block_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"frt_inv_post_dt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"wms_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tax_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"vchr_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"vchr_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                   //#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	                   {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                   {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_xcrt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	              	   {Type:"Text",      Hidden:1,  Width:30,   Align:"Left",    ColMerge:1,   SaveName:"locl_amt",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	              	   // #6307 [Starcluster-MEX] Add tax Inv No in aging, local and agent statement (Zen#2159)
	              	   {Type:"Text",      Hidden:1,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	              	   {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];

			        InitColumns(cols);

			        SetEditable(1);
			              /* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.13 */
			        SetHeaderRowHeight(20);
			        SetHeaderRowHeight(21);
			        SetColProperty('frt_cd', {ComboText:FRTCD2, ComboCode:FRTCD1} );
			        SetColProperty('frt_cd_nm', {InputCaseSensitive:1} );
			        SetColProperty('cntr_tpsz_cd', {ComboText:TPSZ1, ComboCode:TPSZ1} );
			        SetColProperty('aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
			        /* #20811 : [GPL] A/R Entry Screen - Make "Freight Name" Column Wider + Set "P/C" Column's Default Choice to "CC" jsjang 2013.9.24 */
			        SetColProperty('frt_term_cd', {ComboText:"CC|PP", ComboCode:"CC|PP"} );
			        // #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
	    		    SetColProperty('vat_rt_cd', {ComboText:VAT_VAL, ComboCode:VAT_CD} );
	    		    SetColProperty('vat_rt_cd1', {ComboText:VAT_VAL, ComboCode:VAT_CD} );
	    		    SetColProperty('vat_rt_cd2', {ComboText:VAT_VAL, ComboCode:VAT_CD} );

			        SetSheetHeight(240);
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
	case 2: //IBSheet2 init
		with (sheetObj) {

	        if (location.hostname != "")
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
	case 3: //TP/SZ init
		with (sheetObj) {
	        if (location.hostname != "")

	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

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

/* LHK 20130829 Tab Key 로 ADD 기능 추가 */
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	var lastCol = "trf_cur_sum_amt";
	if(MULTI_CURR_FLAG == "Y"){
		lastCol = "inv_sum_amt";
	}
	if(sheetObj.LastRow()== row && lastCol == sheetObj.ColSaveName(col)){
		if(keyCode==9 && getObj('rowAddBtn2').style.display != "none"){
			doWork('ROWADD');
			sheetObj.SelectCell(row+1, 2);
		}
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd() {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];

	//#2135 [BINEX] BLOCKED INVOICE REVISED WITHOUT AUTHORITY
	wmsObjectControl("", "ALL");
	//#6781 [JAPT] USD to USD invoice amount calculation bug ( PATCH WITH #4010 )
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
	// formObj.f_inv_seq.value = sheetObj.CellValue(2,"inv_seq");
	if (sheetObj.GetCellValue(2, "inv_seq") != "-1" && sheetObj.GetCellValue(2, "inv_seq") != "") {

		/* Bug Fix 단축키 사용시 Amt가 초기화 되지 않는 현상 수정 */
		formObj.f_amt_tot.value = 0;
		formObj.f_vatamt_tot.value = 0;
		formObj.f_totamt_tot.value = 0;

		for ( var i=2; i<=sheetObj.LastRow(); i++) {
			sheetObj.SetCellEditable(i, "frt_check",0);
			sheetObj.SetColBackColor(2,"#EFEBEF");
			formObj.f_amt_tot.value=Number(formObj.f_amt_tot.value) + Number(sheetObj.GetCellValue(i, "inv_amt"));
			formObj.f_vatamt_tot.value=Number(formObj.f_vatamt_tot.value)	+ Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
			formObj.f_totamt_tot.value=Number(formObj.f_totamt_tot.value) + Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
			// TB_TRDP에 저장하기 위해 OLD_SUM값을 저장한다.
			formObj.f_old_sum_amt.value=formObj.f_totamt_tot.value;
			// [20130819 OJG]
			if (sheetObj.GetCellValue(i, "aply_ut_cd") != 'SCN') { //Unit 이 Container
				sheetObj.SetCellEditable(i, "cntr_tpsz_cd",0);
			}
		}
		//formObj.s_inv_no.value 	  = formObj.temp_inv_no.value;
		if (sheetObj.LastRow() > 1) {
			formObj.f_modi_tms.value=sheetObj.GetCellValue(2, "modi_tms");
			formObj.f_vendor_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");
			formObj.f_vendor_nm.value=sheetObj.GetCellValue(2, "inv_trdp_cd_nm");
			formObj.f_remark.value=sheetObj.GetCellValue(2, "inv_rmk");
			formObj.f_inv_no.value=sheetObj.GetCellValue(2, "buy_inv_no");
			formObj.f_amt_due.value=doMoneyFmt(Number(sheetObj.GetCellValue(2,	"inv_bal_amt")));
			formObj.f_paid_amt.value=doMoneyFmt(Number(sheetObj.GetCellValue(2,	"inv_pay_amt")));
			formObj.f_last_ck.value=sheetObj.GetCellValue(2, "last_chk_no");
			
			org_trdp_cd=sheetObj.GetCellValue(2, "inv_trdp_cd");

			// #6307 [Starcluster-MEX] Add tax Inv No in aging, local and agent statement (Zen#2159)
			formObj.f_tax_no.value=sheetObj.GetCellValue(2, "tax_no");
			
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

			var post_dt=sheetObj.GetCellValue(2, "inv_post_dt");
			var inv_dt=sheetObj.GetCellValue(2, "inv_dt");
			var due_dt=sheetObj.GetCellValue(2, "inv_due_dt");
			var last_paid_dt=sheetObj.GetCellValue(2, "last_pay_dt");
			if (post_dt != "") {
				formObj.f_post_dt.value=post_dt.substring(0, 2) + "-"	+ post_dt.substring(2, 4) + "-" + post_dt.substring(4, 8);
				formObj.old_post_dt.value=post_dt.substring(0,2) 	  + "-" + post_dt.substring(2,4) 	  + "-" + post_dt.substring(4,8);
			}
			if (inv_dt != "") {
				formObj.f_inv_dt.value=inv_dt.substring(0, 2) + "-" + inv_dt.substring(2, 4) + "-" + inv_dt.substring(4, 8);
			}
			if (due_dt != "") {
				//term을 초기화한다.
				formObj.f_terms[0].selected=true;
				formObj.f_due_dt.value=due_dt.substring(0, 2) + "-" + due_dt.substring(2, 4) + "-" + due_dt.substring(4, 8);
			}
			if (last_paid_dt != "") {
				formObj.f_last_paid_dt_cal.value=last_paid_dt.substring(0, 2) + "-" + last_paid_dt.substring(2, 4) + "-" 	+ last_paid_dt.substring(4, 8);
			}
			//#6887 [Star-MEX] Uncollected Invoice appears to have been deposited (Zen#4191)
			else {
				formObj.f_last_paid_dt_cal.value= "";
			}
			/*
			 * //Vendor를 변경못하게 한다. formObj.f_vendor_cd.readOnly = true;
			 * formObj.f_vendor_cd.className = "search_form-disable";
			 * formObj.f_vendor_nm.readOnly = true; formObj.f_vendor_nm.className =
			 * "search_form-disable"; formObj.billto.onclick = "";
			 * formObj.billto.style.cursor = "none";
			 */
			formObj.f_inco_cd.value=sheetObj.GetCellValue(2, "inco_cd");
			//formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "inv_aply_curr_cd");
			formObj.f_clt_cmpl_flg.value=sheetObj.GetCellValue(2, "clt_cmpl_flg");
			
			
			//#3249 [FULLTRANS CN]  Default value of currency in the AR Inovice Entry
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
				//#3487 오류 수정
				if(formObj.f_inv_seq.value == "")
					//#3370 [CNR GZ] User claimed that incorrect exchange rate applied when issuing AR or AP Invoice
					setCurrency();
				
			}			
			
			/*
			 * // DEPOSIT, CHECK 등록시 삭제를 불가능하게 한다.
			 * if(Number(removeComma(formObj.f_paid_amt.value)) != 0){
			 * deleteBtn1.style.display = "none"; deleteBtn2.style.display = "none"; }
			 */
			if (sheetObj.GetCellValue(2, "tax_bil_flg") == "Y") {
				formObj.f_tax_bill.checked=true;
			}
			if (sheetObj.GetCellValue(2, "buy_inv_rcv") == "Y") {
				formObj.f_buy_inv_rcv.checked=true;
			}
			//마감처리를 한다.
			if (sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y") {
				execMagam();
			}
			//Combine 연결시 마감처리를 한다.
			if (sheetObj.GetCellValue(2, "cmb_inv_seq") != "") {
				execMagam();
			}
		}
		formObj.f_frgn_amt.value="";
		formObj.f_frgn_vat_amt.value="";
		formObj.f_frgn_sum_amt.value="";
		//입금 및 출금 처리후(DEPOSIT, CHECK 후) 마감처리
		if (Number(removeComma(formObj.f_paid_amt.value)) != 0
				|| sheetObj.GetCellValue(2, "cmb_inv_seq") == "Y") {
			execPaidMagam();
			// CUSTOMER 변경불가
			// Vendor를 변경못하게 한다.
			formObj.f_vendor_cd.readOnly=true;
			formObj.f_vendor_cd.className="search_form-disable";
			formObj.f_vendor_nm.readOnly=true;
			formObj.f_vendor_nm.className="search_form-disable";
			formObj.billto.onclick="";
			formObj.billto.style.cursor="none";
			// formObj.f_vendor_cd.onblur = "";
		}
		
		//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
		formObj.f_loc_ex_rate.value = sheetObj.GetCellValue(2, "locl_xcrt");
		
		//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
		if(formObj.f_loc_ex_rate.value == "" || formObj.f_loc_ex_rate.value == "0"){
			getLoclExRate();
		}		
		
	} else {
		formObj.s_bl_no.value=formObj.temp_bl_no.value;
		formObj.s_oth_no.value=formObj.temp_oth_no.value;
		//WMS ACCOUNT LKH 2015.01.20
		formObj.s_wms_no.value=formObj.temp_wms_no.value;

		if (formObj.s_bl_no.value != "" && formObj.f_biz_clss_cd.value == "H") {
			formObj.s_ref_no.value="";
		} else {
			//WMS ACCOUNT LKH 2015.01.20
			if (formObj.s_oth_no.value == "" && formObj.s_wms_no.value == ""){
				formObj.s_ref_no.value=formObj.temp_ref_no.value;
			}
		}
		//2012/02/27 FRT LIST의 SEQ가 가장작은 TRDP를 VENDOR로 셋팅한다.
		if (sheetObj.GetCellValue(2, "trdp_cd") != "-1" && sheetObj.GetCellValue(2, "inv_seq") != "") {
//		if (sheetObj.LastRow() > 0) {
			formObj.f_vendor_cd.value=sheetObj.GetCellValue(2, "trdp_cd");
			formObj.f_vendor_cd.focus();
			formObj.f_vendor_cd.blur();
		}
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		//OFVFOUR-7986: [AIF] OPUS Error question - Inv no :AWI9200
		var chk_fr_frt_seq_tmp = '';
		for ( var i=2; i <= sheetObj.LastRow(); i++) {
			sheetObj.SetCellEditable(i, "frt_check",1);
			// sheetObj.CellValue(i, "frt_check") = "1";
			// 2012/02/27 FRT LIST의 SEQ가 가장작은 TRDP를 VENDOR로 셋팅한다.
			// VENDOR와 같은 FRT만 SELECT 한다.
			// sheetObj.CellValue(i, "frt_check") = "1";
			if (formObj.f_vendor_cd.value == sheetObj.GetCellValue(i, "trdp_cd")) {
				sheetObj.SetCellValue(i, "frt_check","1");
				//#3973 [JAPT]Invoice Date & Ex.Rate
				//BL entry 에서 넘어오는경우 inv_xcrt_dt 유지한다 				
				if(BL_FRT_YN != 'Y'){
					sheetObj.SetCellValue(i, "inv_xcrt_dt",formObj.f_inv_dt.value);
				}
				amt_tot += roundXL(Number(sheetObj.GetCellValue(i, "inv_amt")), 2);
				vatamt_tot += roundXL(Number(sheetObj.GetCellValue(i, "inv_vat_amt")), 2);
				totamt_tot += roundXL(Number(sheetObj.GetCellValue(i, "inv_sum_amt")), 2);
			}
			/*
amt_tot 	+= roundXL(Number(sheetObj.GetCellValue(i, "inv_amt")),2);
vatamt_tot 	+= roundXL(Number(sheetObj.GetCellValue(i, "inv_vat_amt")),2);
totamt_tot 	+= roundXL(Number(sheetObj.GetCellValue(i, "inv_sum_amt")),2);
			 */

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
		
		formObj.f_amt_tot.value=roundXL(amt_tot, 2);
		formObj.f_vatamt_tot.value=roundXL(vatamt_tot, 2);
		formObj.f_totamt_tot.value=roundXL(totamt_tot, 2);
		// 서울인경우 TAX BILL를 체크한다.
		/*
		if (formObj.f_ofc_cd.value == "SEL") {
			formObj.f_tax_bill.checked=true;
		}
		*/
		
		//#3249 [FULLTRANS CN]  Default value of currency in the AR Inovice Entry
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
			
			//#3973 [JAPT]Invoice Date & Ex.Rate
			//BL entry 에서 넘어오는경우 inv_xcrt 재계산을 하지않는다			
			if(BL_FRT_YN != 'Y'){
				//#3487 오류 수정
				if(formObj.f_inv_seq.value == ""){
					//#3370 [CNR GZ] User claimed that incorrect exchange rate applied when issuing AR or AP Invoice
					setCurrency();
				}
				
			}
		}	
		
		//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
		getLoclExRate();		
	}

	// CNTR TP/SZ 값을 셋팅한다.
	for ( var i=2; i <= sheetObj.LastRow(); i++) {
		//sheetObj.CellValue(i, "cntr_tpsz_cd") = sheetObj.CellSearchValue(i, "cntr_tpsz_cd");
	}
	// 마감 된 이후에 add 한 값은 수정 가능, clt_cmpl_flg = 'N' 이면 수정 가능
	for ( var i=2; i <= sheetObj.LastRow(); i++) {
		if (sheetObj.GetCellValue(i, "clt_cmpl_flg") == 'N' && last_paid_dt == "") {
			var frt_check_flg = sheetObj.GetCellEditable(i,"frt_check");
			var cntr_tpsz_cd_flg = sheetObj.GetCellEditable(i,"cntr_tpsz_cd");

			sheetObj.SetRowEditable(i,1);

			sheetObj.SetCellEditable(i,"frt_check",frt_check_flg);
			sheetObj.SetCellEditable(i,"cntr_tpsz_cd",cntr_tpsz_cd_flg);

		} else {
			sheetObj.SetRowEditable(i,0);
		}
	}
	//천단위 콤마
	formObj.f_amt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_amt_tot.value)), 2));
	formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_vatamt_tot.value)), 2));
	formObj.f_totamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_totamt_tot.value)), 2));
	// LHK, 최종 Load 후에 권한 체크하여 화면 control 함
	authControl();

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
	var vEditLen = 14;
	if(gJsWmsVer == 'VER4.0'){
		if(gJsWmsRuPoint == 'Y'){
			if(formObj.f_wms_seq.value != ""){
				vPointCount = 8;
				vEditLen = 19;
			}
		}
		wmsDocCheck('HEAD');
	}
	sheetObj.SetColProperty('ru', {PointCount:vPointCount, EditLen:vEditLen} );

	fnbtnCtl(2);


	//#3411 [JTC]Accounting & Performance 수정사항 (S)
	//위 로직에서 SetRowEditable 로직을 모두 처리한 후 이곳에서 다시 확인..
	if(AUTO_VAT_CALCULATING_AP == 'Y') {
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
			if (ARR_VAT_FRT_CD != null) {
				for (var j=0; j<ARR_VAT_FRT_CD.length; j++) {
					// VAT Read Only
					if(ARR_VAT_FRT_CD[j] != "" && ARR_VAT_FRT_CD[j] == sheetObj.GetCellValue(i, "frt_cd")) {
						sheetObj.SetRowEditable(i, 0);
					}
				}
			}
	
			// WHLD VAT Read Only
			if(WHLD_VAT_FRT_CD != "" && WHLD_VAT_FRT_CD == sheetObj.GetCellValue(i, "frt_cd")){
				sheetObj.SetRowEditable(i, 0);
			}
		}
	}
	//#3411 [JTC]Accounting & Performance 수정사항 (E)
	if (credit_limit != 'Y' && creditLimit_flg == 'Y') {
		document.getElementById('rowAddBtn2').style.display="none";		
	}
	//OFVFOUR-7284 [ACL US] AP invoice doesn't show on Local statement
	var checkInvRcv= "";
	checkInvRcv = sheetObj.GetCellValue(2, "buy_inv_rcv");
	if((checkInvRcv =="Y" && formObj.f_inv_seq.value != "")||(formObj.f_inv_no.value != "" && formObj.f_inv_seq.value == "")){
		formObj.f_buy_inv_rcv.checked=true;
	}else{
		formObj.f_buy_inv_rcv.checked=false
	}
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
				}else{
					sheetObj.SetColProperty('aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
				}

			}
		}
	}
}
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg) {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if (sheetObj.LastRow() > 1) {
		formObj.f_inv_seq.value=sheetObj.GetCellValue(2, "inv_seq");
		// formObj.s_inv_no.value = sheetObj.CellValue(2,"inv_no");
		formObj.f_inv_no.value=sheetObj.GetCellValue(2, "inv_no");
		formObj.f_modi_tms.value=sheetObj.GetCellValue(2, "modi_tms");
	}
	if (formObj.f_inv_seq.value != "") {
		for ( var i=2; i <= sheetObj.LastRow(); i++) {
			sheetObj.SetCellEditable(i, "frt_check",0);
			sheetObj.SetColBackColor(2,"#EFEBEF");
		}
		formObj.s_bl_no.value="";
		formObj.s_ref_no.value="";
		formObj.s_oth_no.value="";

		//WMS ACCOUNT LKH 2015.01.20
		formObj.s_wms_no.value="";

		formObj.f_vendor_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");
		formObj.f_vendor_nm.value=sheetObj.GetCellValue(2, "inv_trdp_cd_nm");
		formObj.f_remark.value=sheetObj.GetCellValue(2, "inv_rmk");
		formObj.f_inv_no.value=sheetObj.GetCellValue(2, "buy_inv_no");
		formObj.f_frgn_amt.value="";
		formObj.f_frgn_vat_amt.value="";
		formObj.f_frgn_sum_amt.value="";
		
		org_trdp_cd=sheetObj.GetCellValue(2, "inv_trdp_cd");
		
		var last_paid_dt=sheetObj.GetCellValue(2, "last_pay_dt");
		if (last_paid_dt != "") {
			formObj.f_last_paid_dt_cal.value=last_paid_dt.substring(0, 2)
					+ "-" + last_paid_dt.substring(2, 4) + "-"
					+ last_paid_dt.substring(4, 8)
		}
		//#6887 [Star-MEX] Uncollected Invoice appears to have been deposited (Zen#4191)
		else {
			formObj.f_last_paid_dt_cal.value= "";
		}
		formObj.f_amt_due.value=doMoneyFmt(sheetObj.GetCellValue(2,"inv_bal_amt"));
		formObj.f_paid_amt.value=doMoneyFmt(sheetObj.GetCellValue(2,"inv_pay_amt"));
		formObj.f_last_ck.value=sheetObj.GetCellValue(2, "last_chk_no");
		/*
		 * //Vendor를 변경못하게 한다. formObj.f_vendor_cd.readOnly = true;
		 * formObj.f_vendor_cd.className = "search_form-disable";
		 * formObj.f_vendor_nm.readOnly = true; formObj.f_vendor_nm.className =
		 * "search_form-disable"; formObj.billto.onclick = "";
		 * formObj.billto.style.cursor = "none";
		 */
		formObj.f_inco_cd.value=sheetObj.GetCellValue(2, "inco_cd");
		formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "inv_aply_curr_cd");

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

		/*
		 * // DEPOSIT, CHECK 등록시 삭제를 불가능하게 한다.
		 * if(Number(removeComma(formObj.f_paid_amt.value)) != 0){
		 * deleteBtn1.style.display = "none"; deleteBtn2.style.display = "none"; }
		 */
		// 마감처리를 한다.
		if (sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y") {
			execMagam();
		}
		formObj.f_clt_cmpl_flg.value=sheetObj.GetCellValue(2, "clt_cmpl_flg");
		if (sheetObj.GetCellValue(2, "buy_inv_rcv") == "Y") {
			formObj.f_buy_inv_rcv.checked=true;
		}

		//#2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.f_inv_no.value);
	}
	//TB_TRDP에 저장하기 위해 OLD_SUM값을 저장한다.
	formObj.f_old_sum_amt.value=roundXL(Number(formObj.f_totamt_tot.value), 2);
	// 천단위 콤마
	formObj.f_amt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_amt_tot.value)), 2));
	formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_vatamt_tot.value)), 2));
	formObj.f_totamt_tot.value=doMoneyFmt(roundXL(Number(removeComma(formObj.f_totamt_tot.value)), 2));
	// Save success!
	if (errMsg == undefined  || errMsg==null || errMsg == '') {
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();

		if(formObj.f_cmd.value == COMMAND02){
			doWork("PRINT");
		}
	}
	// 마감 된 이후에 add 한 값은 수정 가능, clt_cmpl_flg = 'N' 이면 수정 가능
	for ( var i=2; i <= sheetObj.LastRow(); i++) {
		if (sheetObj.GetCellValue(i, "clt_cmpl_flg") == 'N' && last_paid_dt == "") {
			var frt_check_flg = sheetObj.GetCellEditable(i,"frt_check");
			var cntr_tpsz_cd_flg = sheetObj.GetCellEditable(i,"cntr_tpsz_cd");

			sheetObj.SetRowEditable(i,1);

			sheetObj.SetCellEditable(i,"frt_check",frt_check_flg);
			sheetObj.SetCellEditable(i,"cntr_tpsz_cd",cntr_tpsz_cd_flg);
		} else {
			sheetObj.SetRowEditable(i,0);
		}
	}
	//doWork("SEARCHLIST");
	// LHK, 최종 Load 후에 권한 체크하여 화면 control 함
	authControl();

	// #298 [Starcluster] Roll control option with worng logic
	fnbtnCtl(2);

	//LKH::2015-11-03 WMS4.O
	if(gJsWmsVer == 'VER4.0'){
		wmsDocCheck('GRID');
		if(formObj.f_wms_seq.value != ""){
			frm1.f_curr_cd.disabled=true;
		}
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj, Row, Col) {
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
	case "frt_check":
		var amt_sum=0;
		var vat_amt_sum=0;
		var tot_amt_sum=0;
		if(sheetObj.GetCellEditable(Row, "frt_check")){
			if (sheetObj.GetCellValue(Row, "del_chk") == "1") {
				sheetObj.SetCellValue(Row, "del_chk","0");
			}
		}

		if (formObj.f_vendor_cd.value == "") {
			//[Vendor] is mandatory field.
			alert(getLabel('FMS_COM_ALT007'));
			formObj.f_vendor_cd.focus();
			sheetObj.SetCellValue(Row, "frt_check","1");
		}
		/*
		else{
		//        		 2012/02/09 주석처리함
		// sheetObj.CellValue(Row, "rat_curr_cd") = formObj.f_curr_cd.value;
		// sheetObj.CellValue(Row, "inv_xcrt") = 1;
		// if(formObj.f_vendor_cd.value == sheetObj.CellValue(Row, "trdp_cd")){
		// if(sheetObj.CellEditable(Row, "frt_check")){
		// if(sheetObj.CellValue(Row,"del_chk") == "1"){
		// sheetObj.CellValue2(Row,"del_chk") = "0";
		// }
		//
		// if(sheetObj.CellValue(Row,"frt_check") == "0"){
		//
		// formObj.f_amt_tot.value =
		// Number(removeComma(formObj.f_amt_tot.value)) +
		// Number(sheetObj.CellValue(Row,"inv_amt"));
		// formObj.f_vatamt_tot.value =
		// Number(removeComma(formObj.f_vatamt_tot.value)) +
		// Number(sheetObj.CellValue(Row,"inv_vat_amt"));
		// formObj.f_totamt_tot.value =
		// Number(removeComma(formObj.f_totamt_tot.value)) +
		// Number(sheetObj.CellValue(Row,"inv_sum_amt"));
		// }else{
		//
		// formObj.f_amt_tot.value =
		// Number(removeComma(formObj.f_amt_tot.value)) -
		// Number(sheetObj.CellValue(Row,"inv_amt"));
		// formObj.f_vatamt_tot.value =
		// Number(removeComma(formObj.f_vatamt_tot.value)) -
		// Number(sheetObj.CellValue(Row,"inv_vat_amt"));
		// formObj.f_totamt_tot.value =
		// Number(removeComma(formObj.f_totamt_tot.value)) -
		// Number(sheetObj.CellValue(Row,"inv_sum_amt"));
		// }
		// }
		//
		// formObj.f_amt_tot.value = doMoneyFmt(formObj.f_amt_tot.value);
		// formObj.f_vatamt_tot.value = doMoneyFmt(formObj.f_vatamt_tot.value);
		// formObj.f_totamt_tot.value = doMoneyFmt(formObj.f_totamt_tot.value);
		// }else{
		// alert("Check the Customer Info of selected row.");
		// sheetObj.CellValue(Row,"frt_check") = "1";
		// }
		}
		 */
		break;
	case "del_chk":
		if (sheetObj.GetCellValue(Row, "frt_check") == "1") {
			//LKH::2015-11-03 WMS4.O
    		//sheetObj.SetCellValue(Row, "frt_check","0");
    		if(gJsWmsVer == 'VER4.0'){
    			if(formObj.f_wms_seq.value == ""){
    				sheetObj.SetCellValue(Row, "frt_check","0");
    			}
    		}else{
    			sheetObj.SetCellValue(Row, "frt_check","0");
    		}
		}
		/*	[20140112 OJG]
if (sheetObj.GetCellValue(Row, "ibflag") == "I") {
			sheetObj.RowDelete(Row, false);
		}
		*/
		break;
	/*
	 * case "del_chk" :
	 *
	 * //마감이나 PAID 처리 안되었을때만 실행한다. if(sheetObj.CellValue(2, "clt_cmpl_flg") !=
	 * "Y" && Number(removeComma(formObj.f_paid_amt.value)) == 0){
	 *
	 *
	 * if(sheetObj.CellValue(Row,"inv_seq") != ""){ var amt_sum = 0; var
	 * vat_amt_sum = 0; var tot_amt_sum = 0;
	 *
	 * if(sheetObj.CellValue(Row,"del_chk") == "0"){
	 *
	 * formObj.f_amt_tot.value = Number(removeComma(formObj.f_amt_tot.value)) -
	 * Number(sheetObj.CellValue(Row,"inv_amt")); formObj.f_vatamt_tot.value =
	 * Number(removeComma(formObj.f_vatamt_tot.value)) -
	 * Number(sheetObj.CellValue(Row,"inv_vat_amt")); formObj.f_totamt_tot.value =
	 * Number(removeComma(formObj.f_totamt_tot.value)) -
	 * Number(sheetObj.CellValue(Row,"inv_sum_amt")); }else{
	 *
	 * formObj.f_amt_tot.value = Number(removeComma(formObj.f_amt_tot.value)) +
	 * Number(sheetObj.CellValue(Row,"inv_amt")); formObj.f_vatamt_tot.value =
	 * Number(removeComma(formObj.f_vatamt_tot.value)) +
	 * Number(sheetObj.CellValue(Row,"inv_vat_amt")); formObj.f_totamt_tot.value =
	 * Number(removeComma(formObj.f_totamt_tot.value)) +
	 * Number(sheetObj.CellValue(Row,"inv_sum_amt"));
	 *  } }else{ if(sheetObj.CellValue(Row,"del_chk") == "0"){
	 * if(Number(removeComma(formObj.f_amt_tot.value)) > 0 &&
	 * formObj.f_amt_tot.value != ""){ formObj.f_amt_tot.value =
	 * Number(removeComma(formObj.f_amt_tot.value)) -
	 * Number(sheetObj.CellValue(Row,"inv_amt")); }
	 * if(Number(removeComma(formObj.f_vatamt_tot.value)) > 0 &&
	 * formObj.f_vatamt_tot.value != ""){ formObj.f_vatamt_tot.value =
	 * Number(removeComma(formObj.f_vatamt_tot.value)) -
	 * Number(sheetObj.CellValue(Row,"inv_vat_amt")); }
	 * if(Number(removeComma(formObj.f_totamt_tot.value)) > 0 &&
	 * formObj.f_totamt_tot.value != ""){ formObj.f_totamt_tot.value =
	 * Number(removeComma(formObj.f_totamt_tot.value)) -
	 * Number(sheetObj.CellValue(Row,"inv_sum_amt")); } }else{
	 * if(sheetObj.CellValue(Row,"frt_check") == "1"){ formObj.f_amt_tot.value =
	 * Number(removeComma(formObj.f_amt_tot.value)) +
	 * Number(sheetObj.CellValue(Row,"inv_amt")); formObj.f_vatamt_tot.value =
	 * Number(removeComma(formObj.f_vatamt_tot.value)) +
	 * Number(sheetObj.CellValue(Row,"inv_vat_amt")); formObj.f_totamt_tot.value =
	 * Number(removeComma(formObj.f_totamt_tot.value)) +
	 * Number(sheetObj.CellValue(Row,"inv_sum_amt")); } } }
	 *
	 *
	 * formObj.f_amt_tot.value = doMoneyFmt(formObj.f_amt_tot.value);
	 * formObj.f_vatamt_tot.value = doMoneyFmt(formObj.f_vatamt_tot.value);
	 * formObj.f_totamt_tot.value = doMoneyFmt(formObj.f_totamt_tot.value);
	 *
	 * if(sheetObj.CellValue(Row,"frt_check") == "1"){
	 * sheetObj.CellValue(Row,"frt_check") = "0"; }
	 *
	 * if(sheetObj.CellValue(Row, "ibflag") == "I"){
	 * sheetObj.RowDelete(Row,false); return; }
	 *
	 * for(var i=2; i<=sheetObj.LastRow; i++){
	 * //sheetObj.CellValue(i,"frt_check") = "0"; } }
	 *
	 * break;
	 */
	case "cntr_tpsz_cd":
		if (sheetObj.GetCellValue(Row, "aply_ut_cd") != 'SCN'
				&& sheetObj.GetCellEditable(Row, "cntr_tpsz_cd") == true) {
			//Please check Unit Type.
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_UNTP'));
			sheetObj.SelectCell(Row, "aply_ut_cd");
			return;
		}
		break;
	}
}
function sheet1_OnPopupClick(sheetObj, row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	// Freight Code조회
	if (colStr == "frt_cd") {
		rtnary=new Array(1);
		rtnary[0]="";
		rtnary[1]="";
		rtnary[2]="";
		rtnary[3]="";
		rtnary[4]="";
		rtnary[5]="Y";
		var rtnVal=ComOpenWindow('./CMM_POP_0070.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px", true);
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
		} else {
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, "frt_cd",rtnValAry[0]);
			sheetObj.SetCellValue(row, "frt_cd_nm",rtnValAry[1]);
			sheetObj.SetCellValue(row, "vat_rt",rtnValAry[2]);
			// 기존 입력값 초기화
			/*
			 * sheetObj.CellValue(row, "cntr_tpsz_cd") = '';
			 * sheetObj.CellValue(row, "qty") = ''; sheetObj.CellValue(row,
			 * "vat_amt") = ''; sheetObj.CellValue(row, "inv_amt") = '';
			 * sheetObj.CellValue(row, "inv_vat_amt") = '';
			 */
			frm1.f_curRow.value=row;
			var parmStr='&goWhere=aj&bcKey=searchMyTaxRate';
			parmStr += '&f_frt_cd=' + rtnValAry[0];
			ajaxSendPost(setTaxRate, 'reqVal', parmStr, './GateServlet.gsl');
		}
		//Buying/Credit인 경우 Invoice 환률을 선택한다.
	} else if (colStr == "rat_curr_cd") {
		rtnary=new Array(1);
		rtnary[0]="1";
		var rtnVal= ComOpenWindow('./CMM_POP_0040.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px", true);
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
		} else {
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, col,rtnValAry[0]);
			sheetObj.SetCellValue(row, 'inv_xcrt','');
			sheetObj.SetCellValue(row, 'inv_amt','');
			sheetObj.SetCellValue(row, 'inv_vat_amt','');
			if (sheetObj.GetCellValue(row, "rat_curr_cd") == sheetObj.GetCellValue(
					row, "rat_curr_cd")) {
				sheetObj.SetCellValue(row, "inv_xcrt",1);
			}
		}
		//Invoice Exchange rate
	} else if (colStr == "inv_xcrt") {
		//팝업 호출 조건을 확인한다.
		if (sheetObj.GetCellValue(row, 'ru') == '') {
			//Please enter \"Rate!\"!
			alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_RATE'));
			return;
			// Currency 선택여부 확인
		} else if (sheetObj.GetCellValue(row, 'rat_curr_cd') == '') {
			//Please select \"Currency!\"!
			alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_RATE'));
			return;
		}
		rtnary=new Array(1);
		rtnary[0]="2";
		// P/C 구분에 따라서 조회할 환률을 선택한다.
		var fndCurr='';
		var post_dt=formObj.f_post_dt.value.replaceAll("-", "");
		post_dt=post_dt.substring(4, 8) + post_dt.substring(0, 2)
				+ post_dt.substring(2, 4);
		fndCurr=sheetObj.GetCellValue(row, 'rat_curr_cd');
		var paramStr='?f_fm_curr_cd=' + sheetObj.GetCellValue(row, "rat_curr_cd");
		paramStr += '&f_inv_curr_cd=' + sheetObj.GetCellValue(row, 'rat_curr_cd');
		// paramStr+= '&f_dft_dt=' +sheetObj.CellValue(row, "inv_xcrt_dt");
		paramStr += '&f_dft_dt=' + post_dt;
		// paramStr+= '&f_trdp_cd='+sheetObj.CellValue(row, "trdp_cd");
		// paramStr+= '&f_trdp_nm='+sheetObj.CellValue(row, "trdp_nm");
		paramStr += '&f_trdp_cd=' + frm1.f_vendor_cd.value;
		paramStr += '&f_trdp_nm=' + frm1.f_vendor_nm.value;
		var rtnVal=ComOpenWindow('./CMM_POP_0220.clt' + paramStr,  rtnary, "scroll:yes;status:no;help:no;dialogWidth:750px;dialogHeight:600px", true);
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
		} else {
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, "inv_xcrt",rtnValAry[0]);// EX. Rate
																// inv_xcrt
			sheetObj.SetCellValue(row, "rat_curr_cd",rtnValAry[1]);// xch_curr_cd
			calcInvAmt(sheetObj, row, objPfx);
		}
	}
}
function sheet1_OnChange(sheetObj, row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	/*
	 * var qty = Number(sheetObj.CellValue(row, "qty")); var ru =
	 * Number(sheetObj.CellValue(row, "ru")); var vat_rt =
	 * Number(sheetObj.CellValue(row, "vat_rt")); var vat_amt =
	 * Number(sheetObj.CellValue(row, "vat_amt")); var inv_xcrt =
	 * Number(sheetObj.CellValue(row, "inv_xcrt")); var inv_amt =
	 * Number(sheetObj.CellValue(row, "inv_amt")); var inv_vat_amt =
	 * Number(sheetObj.CellValue(row, "inv_vat_amt"));
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
    		//sheetObj.CellValue2(Row, "del_chk") = "0";
			sheetObj.RowDelete(row,false);
		}
	}
	//---------------------[20140112 GOJ]-----------------------------
	if (colStr == "frt_cd") {
		var frt_cd=sheetObj.GetCellValue(row, 'frt_cd');
		// doAutoSearch(sheetObj, row, 'frt_cd', 'freight', codeStr, 'frt_cd',
		// 'frt_cd_nm');
		SELECTROW=row;
		if (frt_cd != "") {
			/* #20645 : [BINEX]G/L Validation jsjang 2013.09.10 */
			//ajaxSendPost(getInvFrtcd, 'reqVal',
			//		'&goWhere=aj&bcKey=getInvFrtcd&frt_cd=' + frt_cd,
			//		'./GateServlet.gsl');
			// #20942 frt_cd 의 특수문자 대응(& )
			//frt_cd=frt_cd.replace(/&/g,"%26");
			// #48954 - [BNX] BILLING CODE 불러오는데 NAME 자동으로 안 따라옴
			frt_cd=escape(frt_cd);

			//#1773 [PATENT] Freight Default Unit Option
		    var param='&air_sea_clss_cd=' + formObj.f_air_sea_clss_cd.value;
			param += '&frt_ofc_cd=' + formObj.f_ref_no_dtl.value;
			param += '&tabStr=b_';
			if(formObj.f_air_sea_clss_cd.value=="S"){
				param += '&frt_shp_mod=' + formObj.f_shp_mod_cd.value;
			}
			ajaxSendPost(getInvFrtBillingcd, 'reqVal', '&goWhere=aj&bcKey=getInvFrtBillingcd&frt_cd='+frt_cd+param, './GateServlet.gsl');
		} else {
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
	// var curr = sheetObj.CellValue(row, "rat_curr_cd");
	//var curr=formObj.f_curr_cd.value;
	/* [20131223 OJG] A/P 금액 계산 마지막으로 이동.
	if (colStr == "qty") {
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty"))	* Number(sheetObj.GetCellValue(row, "ru")));
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row,	"ru")) * (Number(sheetObj.GetCellValue(row, "vat_rt")) / 100));
		if (curr == "KRW" || curr == "JPY") {
sheetObj.SetCellValue(row, "inv_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"))));
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* (Number(sheetObj.CellValue(row, "vat_rt")) / 100)
					* Number(sheetObj.CellValue(row, "inv_xcrt")));
		} else {
sheetObj.SetCellValue(row, "inv_amt",Number(sheetObj.GetCellValue(row,	"trf_cur_sum_amt"))
					* Number(sheetObj.CellValue(row, "inv_xcrt"));
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* (Number(sheetObj.CellValue(row, "vat_rt")) / 100)
					* Number(sheetObj.CellValue(row, "inv_xcrt"));
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row,	"inv_amt"))
+ Number(sheetObj.GetCellValue(row, "inv_vat_amt"));
	}
	if (colStr == "ru") {
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty"))
				* Number(sheetObj.CellValue(row, "ru"));
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row,	"ru"))
				* (Number(sheetObj.CellValue(row, "vat_rt")) / 100);
		if (curr == "KRW" || curr == "JPY") {
sheetObj.SetCellValue(row, "inv_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* Number(sheetObj.CellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* (Number(sheetObj.CellValue(row, "vat_rt")) / 100)
					* Number(sheetObj.CellValue(row, "inv_xcrt")));
		} else {
sheetObj.SetCellValue(row, "inv_amt",Number(sheetObj.GetCellValue(row,	"trf_cur_sum_amt"))
					* Number(sheetObj.CellValue(row, "inv_xcrt"));
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* (Number(sheetObj.CellValue(row, "vat_rt")) / 100)
					* Number(sheetObj.CellValue(row, "inv_xcrt"));
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row,	"inv_amt"))
+ Number(sheetObj.GetCellValue(row, "inv_vat_amt"));
	}
	if (colStr == "vat_rt") {
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty"))
				* Number(sheetObj.CellValue(row, "ru"));
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row,	"ru"))
				* (Number(sheetObj.CellValue(row, "vat_rt")) / 100);
		if (curr == "KRW" || curr == "JPY") {
sheetObj.SetCellValue(row, "inv_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* Number(sheetObj.CellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* (Number(sheetObj.CellValue(row, "vat_rt")) / 100)
					* Number(sheetObj.CellValue(row, "inv_xcrt")));
		} else {
sheetObj.SetCellValue(row, "inv_amt",Number(sheetObj.GetCellValue(row,	"trf_cur_sum_amt"))
					* Number(sheetObj.CellValue(row, "inv_xcrt"));
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* (Number(sheetObj.CellValue(row, "vat_rt")) / 100)
					* Number(sheetObj.CellValue(row, "inv_xcrt"));
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row,	"inv_amt"))
+ Number(sheetObj.GetCellValue(row, "inv_vat_amt"));
	}
	if (colStr == "inv_xcrt") {
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty"))
				* Number(sheetObj.CellValue(row, "ru"));
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row,	"ru"))
				* (Number(sheetObj.CellValue(row, "vat_rt")) / 100);
		if (curr == "KRW" || curr == "JPY") {
sheetObj.SetCellValue(row, "inv_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* Number(sheetObj.CellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* (Number(sheetObj.CellValue(row, "vat_rt")) / 100)
					* Number(sheetObj.CellValue(row, "inv_xcrt")));
		} else {
sheetObj.SetCellValue(row, "inv_amt",Number(sheetObj.GetCellValue(row,	"trf_cur_sum_amt"))
					* Number(sheetObj.CellValue(row, "inv_xcrt"));
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* (Number(sheetObj.CellValue(row, "vat_rt")) / 100)
					* Number(sheetObj.CellValue(row, "inv_xcrt"));
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt"))
+ Number(sheetObj.GetCellValue(row, "inv_vat_amt"));
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
	if (colStr == "rat_curr_cd") {
		/*  [20131223 OJG] A/P 금액 계산 마지막으로 이동.
sheetObj.SetCellValue(row, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(row, "qty"))
				* Number(sheetObj.CellValue(row, "ru"));
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row,	"ru"))
				* (Number(sheetObj.CellValue(row, "vat_rt")) / 100);
		if (curr == "KRW" || curr == "JPY") {
sheetObj.SetCellValue(row, "inv_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* Number(sheetObj.CellValue(row, "inv_xcrt")));
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* (Number(sheetObj.CellValue(row, "vat_rt")) / 100)
					* Number(sheetObj.CellValue(row, "inv_xcrt")));
		} else {
sheetObj.SetCellValue(row, "inv_amt",Number(sheetObj.GetCellValue(row,	"trf_cur_sum_amt"))
					* Number(sheetObj.CellValue(row, "inv_xcrt"));
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
					* (Number(sheetObj.CellValue(row, "vat_rt")) / 100)
					* Number(sheetObj.CellValue(row, "inv_xcrt"));
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row,	"inv_amt"))
+ Number(sheetObj.GetCellValue(row, "inv_vat_amt"));
		*/
		/*var codeStr=sheetObj.GetCellValue(row, 'rat_curr_cd');
		// 결과를 표시할 Col을 초기화함
		doAutoSearch(sheetObj, row, col, 'currency', codeStr, 'rat_curr_cd', '');	//[20140121 OJG] 환율정보 조회시 버그수정(코드만 있으면됨)
		// 변경환율을 끌고온다. INVVOICE의 CURR_CD와 다를시 POST_DATE 기준의 일환율을 가져오고
		// 일환율이 없을경우 월환율을 가지고 온다.
		// RAT_CURR_CD = FROM_CURR, INV_CURR_CD = TO_CURR로 계산한다.
		if (formObj.f_curr_cd.value != sheetObj.GetCellValue(row, "rat_curr_cd")) {
			var postDt=formObj.f_post_dt.value.replaceAll("-", "");
			// 해당일자의 월 1일을 구한다.
			var frDt=postDt.substring(0, 2) + "01" + postDt.substring(4, 8);
			// 해당일자의 월 말일을 구한다.
			var toDt=getEndDate(formObj.f_post_dt.value).replaceAll("-", "");
			var frCurr=sheetObj.GetCellValue(row, "rat_curr_cd");
			var toCurr=formObj.f_curr_cd.value;
			SELECTROW=row;
			ajaxSendPost(getCurrExch, 'reqVal',
					'&goWhere=aj&bcKey=getCurrExch&postDt=' + postDt + '&frDt='
							+ frDt + '&toDt=' + toDt + '&frCurr=' + frCurr
							+ '&toCurr=' + toCurr, './GateServlet.gsl');
		} else {
			sheetObj.SetCellValue(row, "inv_xcrt",1);
		}*/
		//#4020 (JAPT) invoice Ex.date, rate validation, amount  추가
		setExRate(row,"");
	}
	if (colStr == "inv_amt") {
		sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row,	"inv_amt"))
				+ Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	if (colStr == "inv_vat_amt") {
		if (curr == "KRW" || curr == "JPY" || (curr=="VND" && vnCalRound=="Y")) {
			sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "inv_vat_amt"))));
		}
		sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt"))
				+ Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	var air_sea_clss_cd=formObj.f_air_sea_clss_cd.value;
	var bnd_clss_cd=formObj.f_bnd_clss_cd.value;
	var biz_clss_cd=formObj.f_biz_clss_cd.value;
	if (colStr == "aply_ut_cd") {
		if (air_sea_clss_cd == "S") {
			//Container인 경우 TP/SZ활성화
			if (sheetObj.GetCellValue(row, "aply_ut_cd") == 'SCN') {
				if (docObjects[2].LastRow()+1 == 1) {
					alert(getLabel('ACC_MSG113'));
					sheetObj.SetCellValue(row, "aply_ut_cd","HBL");
					return;
				}
				sheetObj.SetCellEditable(row, "cntr_tpsz_cd",1);
				var cntrTpsz="";
				var cntrCnt=0;
				for ( var i=1; i < docObjects[2].LastRow()+1; i++) {
					var qtyCnt=0;
					for ( var j=2; j < sheetObj.LastRow()+1; j++) {
						if (j != row
								&& sheetObj.GetCellValue(j, "aply_ut_cd") == 'SCN'
									&& sheetObj.GetCellValue(j, "cntr_tpsz_cd") == docObjects[2].GetCellValue(i, 0)
								&& sheetObj.GetCellText(j, "frt_cd") == sheetObj.GetCellText(row, "frt_cd")) {
							qtyCnt += sheetObj.GetCellValue(j, "qty");
						}
					}
					if (docObjects[2].GetCellValue(i, 1) - qtyCnt > 0) {
						cntrTpsz=docObjects[2].GetCellValue(i, 0);
						cntrCnt=docObjects[2].GetCellValue(i, 1) - qtyCnt;
						break;
					}
				}
				if (cntrTpsz != "") {
					sheetObj.SetCellValue(row, "cntr_tpsz_cd",cntrTpsz,0);
					sheetObj.SetCellValue(row, "qty",cntrCnt,0);
				} else {
					sheetObj.SetCellValue(row, "qty",'');
					sheetObj.SetCellValue(row, "trf_cur_sum_amt",'');
					sheetObj.SetCellValue(row, "cntr_tpsz_cd",'',0);
				}
			} else if (sheetObj.GetCellValue(row, "aply_ut_cd") == 'CBM') {
				sheetObj.SetCellEditable(row, "cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row, "cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row, "qty",formObj.f_meas.value,0);
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
				
			}else {
				sheetObj.SetCellEditable(row, "cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row, "cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row, "qty",'1',0);
				sheetObj.SetCellValue(row, "trf_cur_sum_amt",'',0);
			}
		} else {
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
	if (colStr == "cntr_tpsz_cd") {
		if (sheetObj.GetCellValue(row, "aply_ut_cd") == 'SCN') {
			var curFrtCd=sheetObj.GetCellText(row, "frt_cd"); // Freight Code
			var curGetCellText=trim(sheetObj.GetCellText(row, "cntr_tpsz_cd"));
			if (curGetCellText== '') {
				sheetObj.SetCellValue(row, "qty",'');
				sheetObj.SetCellValue(row, "trf_cur_sum_amt",'');
			} else {
				var minNum=0;
				if (curGetCellText.length > 1) {
					for ( var i=2; i < sheetObj.RowCount(); i++) {
						if (i != row) {
							//동일한 Freight Code에 동일한  Container Size가 사용되었는지 확인함
							if (sheetObj.GetCellValue(i, "aply_ut_cd") == 'SCN'
									&& curFrtCd == sheetObj.GetCellText(i,	"frt_cd")
									&& curGetCellText== sheetObj.GetCellText(i,	"cntr_tpsz_cd")) {
								minNum=minNum
										+ parseInt(sheetObj.GetCellText(i, "qty")); // qty
							}
						}
					}
				}
				//이미 선택되었는지 확인한다.
				var curNum=0;
				var cntrSheet=docObjects[2];
				for ( var i=1; i < cntrSheet.RowCount(); i++) {
					if (curGetCellText== cntrSheet.GetCellValue(i, 0)) {
						curNum=cntrSheet.GetCellValue(i, 1);
						break;
					}
				}
				var cntrQty=parseInt(curNum) - minNum;
				if (cntrQty > 0) {
					sheetObj.SetCellValue(row, "qty",cntrQty);
				} else {
					sheetObj.SetCellValue(row, "qty",'');
					sheetObj.SetCellValue(row, "trf_cur_sum_amt",'');
					sheetObj.SetCellValue(row, "cntr_tpsz_cd",'',0);
					// Selected \"Type/Size\" is already in use.\n\n\Please
					// select other \"Type/Size\".
					alert(getLabel('ACC_MSG111'));
				}
			}
		}
	}

	if(MULTI_CURR_FLAG == "N" || (MULTI_CURR_FLAG == "Y" && colStr != "inv_sum_amt") ){
		var curr=formObj.f_curr_cd.value;
		
		var inv_amt = Number(sheetObj.GetCellValue(row, "qty")) * Number(sheetObj.GetCellValue(row, "ru"));
		var invSumAmt = Number(sheetObj.GetCellValue(row, "qty")) * Number(sheetObj.GetCellValue(row, "ru")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"));
		
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
		 
		
	
		if(formObj.f_wms_seq.value != ""){
			if(gJsWmsVer == 'VER4.0'){
				sheetObj.SetCellValue(row, "trf_cur_sum_amt", Number(sheetObj.GetCellValue(row, "inv_amt")),0);
			} else {
				// #1638 [ACL]POLAND - Discrepancy Amount Due between A/R Invoice Entry  and Print Invoice
				sheetObj.SetCellValue(row, "trf_cur_sum_amt", roundTo(inv_amt,2),0);
			}
		} else {
			// #1638 [ACL]POLAND - Discrepancy Amount Due between A/R Invoice Entry  and Print Invoice
			sheetObj.SetCellValue(row, "trf_cur_sum_amt", roundTo(inv_amt,2),0);
		}
		// wms #1069 Closing other entry end
		
		//vat_amt, inv_vat_amt 계산로직 삭제 YJW 2015-07-14
		//sheetObj.SetCellValue(row, "vat_amt", Number(sheetObj.GetCellValue(row,	"ru"))	* (Number(sheetObj.GetCellValue(row, "vat_rt")) / 100),0);
		if (curr == "KRW" || curr == "JPY" || (curr=="VND" && vnCalRound=="Y")) {
			sheetObj.SetCellValue(row, "inv_amt",roundTo(invSumAmt,0),0);
			//sheetObj.SetCellValue(row, "inv_vat_amt", Math.round(Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
			//											* (Number(sheetObj.GetCellValue(row, "vat_rt")) / 100)
			//											* Number(sheetObj.GetCellValue(row, "inv_xcrt"))),0);
		} else {
			//#1638 [ACL]POLAND - Discrepancy Amount Due between A/R Invoice Entry  and Print Invoice
			sheetObj.SetCellValue(row, "inv_amt", roundTo(invSumAmt,2),0);
			//sheetObj.SetCellValue(row, "inv_vat_amt", Number(sheetObj.GetCellValue(row, "trf_cur_sum_amt"))
			//											* (Number(sheetObj.GetCellValue(row, "vat_rt")) / 100)
			//											* Number(sheetObj.GetCellValue(row, "inv_xcrt")),0);
		}
		//sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row,	"inv_amt"))
		//											+ Number(sheetObj.GetCellValue(row, "inv_vat_amt")),0);
		
		//#2535 [LBS] VAT 환율 적용 로직 개선  round(rount(qty*ru*VATRT, 2)*inv_xcrt, 2) -> ound((qty*ru*VATRT)*inv_xcrt, 2)
		// var invSumAmt = Number(sheetObj.GetCellValue(row, "qty")) * Number(sheetObj.GetCellValue(row, "ru")) * Number(sheetObj.GetCellValue(row, "inv_xcrt"));
		if(curr=="KRW" || curr=="JPY" || (curr=="VND" && vnCalRound=="Y")){
			sheetObj.SetCellValue(row, "inv_sum_amt", roundTo(invSumAmt,0), 0);
		}else{
			sheetObj.SetCellValue(row, "inv_sum_amt", roundTo(invSumAmt,2), 0);
		}
		
		//sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row,	"inv_amt")),0);
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

	if (formObj.f_inv_seq.value != "") {
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for ( var i=2; i <= sheetObj.LastRow(); i++) {
			if (sheetObj.GetCellValue(i, "del_chk") == "1") {
				//amt_tot 	= Number(sheetObj.CellValue(i, "inv_amt"));
				// vatamt_tot = Number(sheetObj.CellValue(i, "inv_vat_amt"));
				// totamt_tot = Number(sheetObj.CellValue(i, "inv_sum_amt"));
			} else {
				if (!(sheetObj.GetCellValue(i, "ibflag") == "I" && sheetObj.GetCellValue(i, "frt_check") == "0")) {
					amt_tot += roundXL(Number(sheetObj.GetCellValue(i, "inv_amt")), 2);
					vatamt_tot += roundXL(Number(sheetObj.GetCellValue(i, "inv_vat_amt")), 2);
					totamt_tot += roundXL(Number(sheetObj.GetCellValue(i,	"inv_sum_amt")), 2);
				}
			}
		}
		formObj.f_amt_tot.value=doMoneyFmt(roundXL(amt_tot, 2));
		formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(vatamt_tot, 2));
		formObj.f_totamt_tot.value=doMoneyFmt(roundXL(totamt_tot, 2));
	} else {
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for ( var i=2; i <= sheetObj.LastRow(); i++) {
			if (sheetObj.GetCellValue(i, "frt_check") == "1") {
				amt_tot += roundXL(Number(sheetObj.GetCellValue(i, "inv_amt")), 2);
				vatamt_tot += roundXL(Number(sheetObj.GetCellValue(i, "inv_vat_amt")), 2);
				totamt_tot += roundXL(Number(sheetObj.GetCellValue(i, "inv_sum_amt")), 2);
			}
		}
		formObj.f_amt_tot.value=doMoneyFmt(roundXL(amt_tot, 2));
		formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(vatamt_tot, 2));
		formObj.f_totamt_tot.value=doMoneyFmt(roundXL(totamt_tot, 2));
	}
}
/**
 * 기본 세률 조회
 */
function setTaxRate(reqVal) {
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		sheetObj.SetCellValue(frm1.f_curRow.value, "vat_rt",doc[1]);
	}
}
function calcFrgnAmt() {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for ( var i=2; i <= sheetObj.LastRow(); i++) {
		//INVOICE생성후 데이터
		if (formObj.f_inv_seq.value != "") {
			if (sheetObj.GetCellValue(i, "del_chk") != "1") {
				if (formObj.f_curr_cd.value != sheetObj.GetCellValue(i, "rat_curr_cd")) {
						formObj.f_frgn_curr_cd.value=sheetObj.GetCellValue(i, "rat_curr_cd");
					formObj.f_frgn_amt.value=Number(formObj.f_frgn_amt.value)
					+ Number(sheetObj.GetCellValue(i, "inv_amt"));
					formObj.f_frgn_vat_amt.value=Number(formObj.f_frgn_vat_amt.value)
					+ Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
					formObj.f_frgn_sum_amt.value=Number(formObj.f_frgn_sum_amt.value)
					+ Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
				} else {
					//formObj.f_frgn_curr_cd.value 	= "";
					// formObj.f_frgn_amt.value = 0;
					// formObj.f_frgn_vat_amt.value = 0;
					// formObj.f_frgn_sum_amt.value = 0;
				}
			}
			//INVOICE생성전 데이터
		} else {
			if (sheetObj.GetCellValue(i, "frt_check") == "1") {
				if (formObj.f_curr_cd.value != sheetObj.GetCellValue(i, "rat_curr_cd")) {
					formObj.f_frgn_curr_cd.value=sheetObj.GetCellValue(i, "rat_curr_cd");
					formObj.f_frgn_amt.value=Number(formObj.f_frgn_amt.value)
					+ Number(sheetObj.GetCellValue(i, "inv_amt"));
					formObj.f_frgn_vat_amt.value=Number(formObj.f_frgn_vat_amt.value)
					+ Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
					formObj.f_frgn_sum_amt.value=Number(formObj.f_frgn_sum_amt.value)
					+ Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
				} else {
					//formObj.f_frgn_curr_cd.value 	= "";
					// formObj.f_frgn_amt.value = 0;
					// formObj.f_frgn_vat_amt.value = 0;
					// formObj.f_frgn_sum_amt.value = 0;
				}
			}
		}
	}
}
/**
 * 콤보 조회
 */
function doAction(cmdt_cd) {
	ajaxSendPost(dispAjaxReq, 'reqVal',
			'&goWhere=aj&bcKey=searchCommodityKeyCode&s_cmdt_cd=' + cmdt_cd,
			'./GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			//[Commodity Code] is duplicated!
			alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CMDT')
					+ ": " + doc[1]);
			var sheetObj=docObjects[0];
			var intRow=sheetObj.LastRow();
			sheetObj.SetCellValue(intRow, "cmdt_cd","");
		}
	} else {
		//Error Errupt!
		alert(getLabel('FMS_COM_ERR001'));
	}
}
//참고
function rightDate() {
	var year=document.form1.JLYEAR.value;
	var month=document.form1.JLMONTH.value;
	var dd=new Date(year, month, 0);
	var selectedDay=document.form1.JLDAY.value;
	var lastDay=dd.getDate();
	if (selectedDay > lastDay) {
		alert("날짜를 정확히 선택해 주세요. 선택하신 년월의 날짜는 " + lastDay + " 일까지 있습니다.");
		return false;
	}
	return false;
}
/**
 달력팝업을 호출한다.
 **/
function doDisplay(doWhat, formObj) {
	switch (doWhat) {
	case 'DATE1': //달력 조회 팝업 호출
		var cal=new ComCalendar();
		cal.select(formObj.f_post_dt,  'MM-dd-yyyy');
		break;
	case 'DATE2': //달력 조회 팝업 호출
		var cal=new ComCalendar();
		cal.setEndFunction("changeInvDt");
		cal.select(formObj.f_inv_dt,  'MM-dd-yyyy');
		calcCreateTerms();
		break;
	case 'DATE3': //달력 조회 팝업 호출
		var cal=new ComCalendar();
		cal.select(formObj.f_due_dt,  'MM-dd-yyyy');
		break;
	case 'DATE4': //달력 조회 팝업 호출
		var cal=new ComCalendar();
		cal.select(formObj.f_last_paid_dt_cal,  'MM-dd-yyyy');
		break;
	}
}
function searchBlCmmInfo() {
	var formObj=document.frm1;
	if (formObj.s_bl_no.value != "") {
		ajaxSendPost(getBlCmmInfo, 'reqVal',
				'&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='
						+ formObj.s_bl_no.value + '&ofc_cd='
						+ formObj.f_ofc_cd.value, './GateServlet.gsl');
	}
}
function clearChkVal() {
	var formObj=document.frm1;
	formObj.chk_fr_trdp_cd.value="";
	formObj.chk_fr_inv_curr_cd.value="";
	formObj.chk_fr_frt_seq.value="";
}
function enterBlCmmInfo(isBtn) {
	var formObj=document.frm1;
	if (formObj.s_bl_no.value != "") {
		if (event.keyCode == 13 || isBtn == 'Y') {
			formObj.s_ref_no.value="";
			formObj.f_inv_seq.value="";
			// formObj.s_inv_no.value = "";
			clearChkVal();
			ajaxSendPost(getBlCmmInfo, 'reqVal',
					'&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='
							+ formObj.s_bl_no.value + '&ofc_cd='
							+ formObj.f_ofc_cd.value, './GateServlet.gsl');
		}
	}
}
function enterRefInfo(isBtn) {
	var formObj=document.frm1;
	if (formObj.s_ref_no.value != "") {
		if (event.keyCode == 13 || isBtn == 'Y') {
			formObj.f_inv_seq.value="";
			// formObj.s_inv_no.value = "";
			clearChkVal();
			ajaxSendPost(getRefInfo, 'reqVal',
					'&goWhere=aj&bcKey=getRefInfo&s_ref_no='
							+ formObj.s_ref_no.value + '&ofc_cd='
							+ formObj.f_ofc_cd.value, './GateServlet.gsl');
		}
	}
}
function enterOtherInfo(isBtn) {
	var formObj=document.frm1;
	if (formObj.s_oth_no.value != "") {
		if (event.keyCode == 13 || isBtn == 'Y') {
			formObj.f_inv_seq.value="";
			// formObj.s_inv_no.value = "";
			clearChkVal();
			ajaxSendPost(getOtherInfo, 'reqVal',
					'&goWhere=aj&bcKey=getOtherInfo&s_oth_no='
							+ formObj.s_oth_no.value + '&ofc_cd='
							+ formObj.f_ofc_cd.value, './GateServlet.gsl');
		}
	}
}
//WMS ACCOUNT LKH 2015.01.20
function enterWarehouseInfo(isBtn){
	var formObj=document.frm1;
	if(formObj.s_wms_no.value != ""){
		if(ComGetEvent("keycode") == 13 || isBtn == 'Y'){
			formObj.f_inv_seq.value="";
			formObj.s_inv_no.value="";   // wms #1069 Closing other entry
			clearChkVal();
			ajaxSendPost(getWarehouseInfo, 'reqVal', '&goWhere=aj&bcKey=getWarehouseInfo&s_wms_no='+formObj.s_wms_no.value+'&ofc_cd='+formObj.f_ofc_cd.value, './GateServlet.gsl');
		}
	}
}
function enterInvInfo(isBtn) {
	var formObj=document.frm1;
	if (formObj.s_inv_no.value != "") {
		if (event.keyCode == 13 || isBtn == 'Y') {
			formObj.s_bl_no.value="";
			clearChkVal();
			ajaxSendPost(getInvInfo, 'reqVal',
					'&goWhere=aj&bcKey=getInvInfo&s_inv_no='
							+ formObj.s_inv_no.value + '&ofc_cd='
							+ formObj.f_ofc_cd.value + '&type1=B&type2=B',
					'./GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
function getBlCmmInfo(reqVal) {
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if (rtnArr[0] != "null" && rtnArr[0] != "") {
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
			} else {
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
	} else {
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
/**
 * AJAX RETURN
 * REF_INFO를 가져온다.
 */
function getRefInfo(reqVal) {
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if (rtnArr[0] != "null" && rtnArr[0] != "") {
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
			} else {
				frm1.f_intg_bl_seq.value="";
				frm1.s_ref_no.value="";
				frm1.f_biz_clss_cd.value="";
				frm1.f_air_sea_clss_cd.value="";
				frm1.f_bnd_clss_cd.value="";
				clearAll();
				formObj.s_ref_no.focus();
			}
		}
	} else {
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
/**
 * AJAX RETURN
 * OTHER_INFO를 가져온다.
 */
function getOtherInfo(reqVal) {
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if (rtnArr[0] != "null" && rtnArr[0] != "") {
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
			} else {
				frm1.f_oth_seq.value="";
				frm1.s_oth_no.value="";
				clearAll();
				formObj.s_oth_no.focus();
			}
		}
	} else {
		//alert(getLabel('SEE_BMD_MSG43'));
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
				// wms #1069 Closing other entry
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
function getInvInfo(reqVal) {
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if (rtnArr[0] != "null" && rtnArr[0] != "") {
				if (rtnArr[2] == "1") {
					frm1.f_inv_seq.value=rtnArr[0];
					frm1.s_inv_no.value=rtnArr[1];

					//WMS ACCOUNT LKH 2015.01.20
					frm1.s_wms_no.value="";
					frm1.f_wms_seq.value="";

					doWork("DEFAULT");
				} else {
					//Duplicate Invoice NO.!!
					alert(getLabel('FMS_COM_ALT008') + " - "
							+ getLabel('FMS_COD_IVNO'));
				}
			} else {
				frm1.f_inv_seq.value="";
				frm1.s_inv_no.value="";
				clearAll();
				formObj.s_inv_no.focus();
			}
		}
	} else {
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
/**
 * AJAX RETURN
 * BL CONTAINER TP_SZ 가져온다.
 */
function getBlCntrInfo(reqVal) {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	var tp_sz=" ";
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			//조회해온 결과를 Parent에 표시함
			// var rtnArr = doc[1].split('^@');
			var rtnArr=doc[1].split(';');
			if (rtnArr[0] != "null" && rtnArr[0] != "") {
				for ( var i=0; i < rtnArr.length - 1; i++) {
					var tp_sz_arr=rtnArr[i].split('^@');
					tp_sz += "|" + tp_sz_arr[0];
					var intRows=docObjects[2].LastRow() + 1;
					docObjects[2].DataInsert(intRows);
					docObjects[2].SetCellValue(intRows, 0,tp_sz_arr[0]);
					docObjects[2].SetCellValue(intRows, 1,tp_sz_arr[1]);
				}
				sheetObj.SetColProperty('cntr_tpsz_cd', {ComboText:tp_sz, ComboCode:tp_sz} );
																			// Tp_sz
			} else {
				sheetObj.SetColProperty('cntr_tpsz_cd', {ComboText:tp_sz, ComboCode:tp_sz} );
																			// Tp_sz
			}
		}
	} else {
		sheetObj.SetColProperty('cntr_tpsz_cd', {ComboText:tp_sz, ComboCode:tp_sz} );
																	// Tp_sz
	}
}
/**
 * AJAX RETURN
 * INVOICE FRT CD 를 가져온다.
 */
function getInvFrtcd(reqVal) {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if (rtnArr[0] != "null" && rtnArr[0] != "") {
				sheetObj.SetCellValue(SELECTROW, "frt_cd",rtnArr[0]);
				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm",rtnArr[3]);// local,
																		// ap는
																		// frt_cd의
																		// locl_nm를
																		// 가져온다.
				sheetObj.SetCellValue(SELECTROW, "vat_rt",rtnArr[2]);
			} else {
				sheetObj.SetCellValue(SELECTROW, "frt_cd","");
				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm","");
				sheetObj.SetCellValue(SELECTROW, "vat_rt","");
			}
		}
	} else {
		//alert(getLabel('SEE_BMD_MSG43'));
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
 				var gl_cost=rtnArr[5];
 				if (gl_cost == "" || gl_cost == "undefined" || gl_cost == undefined) {
 					/*
 	 				sheetObj.SetCellValue(SELECTROW, "frt_cd","");
 	 				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm","");
 	 				sheetObj.SetCellValue(SELECTROW, "vat_rt","");
 	 				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_BILLCOST'));
 	 				return;
 	 				*/
 					var parArr=new Array(2);
 					parArr[0]=getLabel('FMS_COD_BILLCOST');
 					parArr[1]=rtnArr[0]+" - "+rtnArr[1];
 					//parArr[2]=rtnArr[1];
 					alert(getLabel2('ACC_MSG110',parArr));
 					sheetObj.SetCellValue(SELECTROW, 'frt_cd',"");
 					sheetObj.SelectCell(SELECTROW, 'frt_cd');
 					return;
 	 			}else{
 	 				//#2131 [BINEX V442] NO G/L MAPPING, BUT CAN ISSUE INVOICE USING BILLING CODE
 	 				ajaxSendPost(checkUseGlCode, 'reqVal', '&goWhere=aj&bcKey=checkUseGlCode&s_gl_cd='+gl_cost+'&s_bill_cd='+escape(sheetObj.GetCellValue(SELECTROW, 'frt_cd'))+'&invType=AP', './GateServlet.gsl');

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
function getCurrExch(reqVal) {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if (rtnArr[0] != "null" && rtnArr[0] != "0") {
				sheetObj.SetCellValue(SELECTROW, "inv_xcrt",rtnArr[0]);
			} else {
				sheetObj.SetCellValue(SELECTROW, "inv_xcrt",0);
				sheetObj.SetCellValue(SELECTROW, "inv_xcrt_dt", "");
			}
		}
	} else {
	}
}
//조회 INVOICE NO가 비었을경우 INV_SEQ 를 지워준다.
function setInvInfo() {
	var formObj=document.frm1;
	if (formObj.s_inv_no.value == "") {
		formObj.f_inv_seq.value="";
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
function enterCalcCreateTerms() {
	var formObj=document.frm1;
	if (event.keyCode == 13) {
		if (formObj.f_term_dt.value != "" && formObj.f_term_dt.value != "0") {
			calcCreateTerms();
		}
	}
}
//CREATE TERMS로 DUE DATE 를 계산한다.
function calcCreateTerms() {
	var formObj=document.frm1;
	// oyh-inv_dt가 입력되지 않으면 동작안되게 수정
	if (formObj.f_inv_dt.value == "") {
		return;
	}
	if (formObj.f_terms[0].selected) {
		formObj.f_term_dt.value="";
		formObj.f_due_dt.value="";
	} else if (formObj.f_terms[1].selected) {
		if(formObj.f_term_dt.value == "") formObj.f_term_dt.value = 0;
		if (formObj.f_term_dt.value != "") {
			if (isNaN(formObj.f_term_dt.value)) {
				formObj.f_term_dt.value="";
				return;
			}
			var dueDay=formObj.f_term_dt.value;
			var endDate=addDay(formObj.f_inv_dt.value, dueDay);
			formObj.f_due_dt.value=endDate;
		}
	} else if (formObj.f_terms[2].selected) {
		formObj.f_term_dt.value="";
		var endDate=getEndDate(formObj.f_inv_dt.value);
		formObj.f_due_dt.value=endDate;
	} else if (formObj.f_terms[3].selected) {
		formObj.f_term_dt.value="";
		var endDate=getNextEndDate(formObj.f_inv_dt.value);
		formObj.f_due_dt.value=endDate;
	} else if (formObj.f_terms[4].selected) {
		if (formObj.f_term_dt.value != "") {
			var dueDay=formObj.f_term_dt.value;
			if (Number(dueDay) < 1 || Number(dueDay) > 31) {
				//Invalid date.
				alert(getLabel('FMS_COM_ALT007') + " - "
						+ getLabel('FMS_COD_DATE'));
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
function getEndDate(datestr) {
	datestr=datestr.replaceAll("-", "");
	var yy=Number(datestr.substring(4, 8));
	var mm=Number(datestr.substring(0, 2));
	// 윤년 검증
	var boundDay="";
	if (mm != 2) {
		var mon=new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		if (mm < 10) {
			mm="0" + mm
		}
		boundDay=mm + "-" + mon[mm - 1] + "-" + yy;
	} else {
		if (yy % 4 == 0 && yy % 100 != 0 || yy % 400 == 0) {
			if (mm < 10) {
				mm="0" + mm
			}
			boundDay=mm + "-" + 29 + "-" + yy;
		} else {
			if (mm < 10) {
				mm="0" + mm
			}
			boundDay=mm + "-" + 28 + "-" + yy;
		}
	}
	return boundDay;
}
//다음달 말일구하기
function getNextEndDate(datestr) {
	datestr=datestr.replaceAll("-", "");
	var yy=Number(datestr.substring(4, 8));
	var mm=Number(datestr.substring(0, 2)) + 1;
	if (mm == 13) {
		yy=yy + 1;
		mm=1;
	}
	//윤년 검증
	var boundDay="";
	if (mm != 2) {
		var mon=new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		if (mm < 10) {
			mm="0" + mm
		}
		boundDay=mm + "-" + mon[mm - 1] + "-" + yy;
	} else {
		if (yy % 4 == 0 && yy % 100 != 0 || yy % 400 == 0) {
			if (mm < 10) {
				mm="0" + mm
			}
			boundDay=mm + "-" + 29 + "-" + yy;
		} else {
			if (mm < 10) {
				mm="0" + mm
			}
			boundDay=mm + "-" + 28 + "-" + yy;
		}
	}
	return boundDay;
}
//다음달 입력일 구하기
function getNextInputDate(datestr, v_day) {
	datestr=datestr.replaceAll("-", "");
	var yy=Number(datestr.substring(4, 8));
	var mm=Number(datestr.substring(0, 2)) + 1;
	if (mm == 13) {
		yy=yy + 1;
		mm=1;
	}
	//윤년 검증
	var boundDay="";
	if (mm != 2) {
		var mon=new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		if (mm < 10) {
			mm="0" + mm
		}
		if (mon[mm - 1] < v_day) {
			alert("Invalid date. ");
			return "";
		}
	} else {
		if (yy % 4 == 0 && yy % 100 != 0 || yy % 400 == 0) {
			if (mm < 10) {
				mm="0" + mm
			}
			if (v_day > 29) {
				//Invalid date.
				alert(getLabel('FMS_COM_ALT007') + " - "
						+ getLabel('FMS_COD_DATE'));
				return "";
			}
		} else {
			if (mm < 10) {
				mm="0" + mm
			}
			if (v_day > 28) {
				//Invalid date.
				alert(getLabel('FMS_COM_ALT007') + " - "
						+ getLabel('FMS_COD_DATE'));
				return "";
			}
		}
	}
	if (Number(v_day) < 10) {
		v_day="0" + v_day;
	}
	boundDay=mm + "-" + v_day + "-" + yy;
	return boundDay;
}
//날짜더하기
function addDay(ymd, v_day) {
	ymd=ymd.replaceAll("-", "");
	var yyyy=ymd.substr(4, 4);
	var mm=eval(ymd.substr(0, 2) + "- 1");
	var dd=ymd.substr(2, 2);
	var dt3=new Date(yyyy, mm, eval(dd + '+' + v_day));
	yyyy=dt3.getFullYear();
	mm=(dt3.getMonth() + 1) < 10 ? "0" + (dt3.getMonth() + 1) : (dt3
			.getMonth() + 1);
	dd=dt3.getDate() < 10 ? "0" + dt3.getDate() : dt3.getDate();
	return mm + "-" + dd + "-" + yyyy;
}
//그리드 전체를 삭제하면 INVOICE 를 삭제한다.
function checkDelete() {
	var sheetObj=docObjects[0];
	var returnFlag=true;
	var delCnt=0;
	for ( var i=2; i <= sheetObj.LastRow(); i++) {
		if (sheetObj.GetCellValue(i, "del_chk") == "1"
			&& sheetObj.GetCellValue(i, "inv_seq") != "") {
			delCnt += 1;
		}
	}
	if (delCnt == sheetObj.RowCount()&& sheetObj.LastRow()> 1) {
		returnFlag=false;
	}
	return returnFlag
}
//화면 클리어
function clearAll() {
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT"); // document 상의 모든
															// INPUT 태그 요소들을
															// 컬렉션으로 구하고...
	for ( var i=0; i < collTxt.length; i++) {
		if (collTxt[i].type == "text" || collTxt[i].type == "hidden") {
			if (collTxt[i].name != "f_usr_nm" && collTxt[i].name != "f_email"
					&& collTxt[i].name != "f_ofc_cd"
					&& collTxt[i].name != "f_cnt_cd"
					&& collTxt[i].name != "f_usrId") {
				collTxt[i].value="";
			}
			if (collTxt[i].name == "f_vendor_cd"
					|| collTxt[i].name == "f_vendor_nm"
					|| collTxt[i].name == "f_inv_no"
					|| collTxt[i].name == "f_post_dt"
					|| collTxt[i].name == "f_inv_dt"
					|| collTxt[i].name == "f_term_dt"
					|| collTxt[i].name == "f_due_dt") {
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
	frm1.f_buy_inv_rcv.disabled=false;
	frm1.f_terms.disabled=false;
	frm1.f_curr_cd.disabled=false;
	frm1.f_remark.disabled=false;
	frm1.f_inco_cd.disabled=false;
	/*
	 * deleteBtn1.style.display = "inline"; deleteBtn2.style.display = "inline";
	 */
	frm1.billto.onclick=function() {
		doWork("CUSTOMER_POPLIST");
	};
	frm1.billto.style.cursor="hand";
	//frm1.f_post_dt_cal.onclick = function() {
	//	doDisplay('DATE1', frm1);
	//};
	frm1.f_inv_dt_cal.onclick=function() {
		doDisplay('DATE2', frm1);
	};
	frm1.f_due_dt_cal.onclick=function() {
		doDisplay('DATE3', frm1);
	};
	frm1.dateImg4.onclick=function() {
		doDisplay('DATE4', frm1);
	};
	//frm1.f_inv_dt.onblur=function() {mkDateFormatType(this, event, true,1);changeInvDate();if(frm1.f_terms.value != ''){calcCreateTerms();}};
	frm1.f_inv_dt.onblur=function(){mkDateFormatType(this, event, true,1);changeInvDt();};
	frm1.f_term_dt.onblur=function() {
		calcCreateTerms();
	};
	sheetObj.SetEditable(1);
	sheetObj.RemoveAll();

	fnbtnCtl(2);
}
//필수항목체크
function checkVal() {
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if (formObj.f_vendor_nm.value == "" || formObj.f_vendor_cd.value == "") {
		//[Vendor] is mandatory field.
		alert(getLabel('FMS_COM_ALT007')  + "\n - " + getLabel('FMS_COD_VENDOR'));
		formObj.f_vendor_cd.focus();
		return false;
	}
	if (formObj.f_post_dt.value == "") {
		//[Posting Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_POSTING'));
		formObj.f_post_dt.focus();
		return false;
	}
	if (formObj.f_inv_dt.value == "") {
		//[Invoice Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_INVOICEDT'));
		formObj.f_inv_dt.focus();
		return false;
	}
	if (formObj.f_due_dt.value == "") {
		//[Due Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_DUEDT'));
		formObj.f_due_dt.focus();
		return false;
	}
	if (formObj.f_curr_cd.value == "") {
		//[Currency] is mandatory field.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BLCURRENCY'));
		formObj.f_curr_cd.focus();
		return false;
	}
	//B/L NO가 없을시 경고문구를 띄운다.
	if (formObj.f_mbl_no.value == "" && formObj.f_hbl_no.value == "") {
		//[B/L No.] Missing. proceed anyway?
		if (confirm(getLabel('ACC_COM_ALT010')) == false) {
			return false;
		}
		//[B/L No.] is Empty. Please Input B/L No.
		// alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') +
		// "\n\n: ACC_INV_0030.2023");
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
	// AP건은 새로작성시에만 VALIDATION을 건다.
	if (formObj.f_inv_seq.value == "") {
		if (bl_post != "" && slip_post != "") {
			bl_post=bl_post.replaceAll("-", "");
			bl_post=bl_post.substring(4, 8) + bl_post.substring(0, 2)
					+ bl_post.substring(2, 4);
			slip_post=slip_post.substring(4, 8) + slip_post.substring(0, 2)
					+ slip_post.substring(2, 4);
			if (slip_post >= bl_post) {
				//Invalid [Posting Date]
				alert(getLabel('FMS_COM_ALT007') + " - "
						+ getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0030.2040");
				formObj.f_post_dt.value=formObj.old_post_dt.value;
				formObj.f_post_dt.select();
				return false;
			}
		}
	}*/
	//VENDOR 에 DEFAULT 가 들어왔을경우 INVOICE 발생을 못함.
	if (formObj.f_vendor_cd.value.indexOf("DEFAULT") != -1) {
		//Invalid [Vendor]
		alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_TRPT')
				);
		formObj.f_vendor_cd.value="";
		formObj.f_vendor_nm.value="";
		formObj.f_vendor_cd.focus();
		return false;
	}
	for ( var i=2; i <= sheetObj.LastRow(); i++) {
		if (sheetObj.GetCellValue(i, "frt_cd") == "") {
			//[Freight Code] is mandatory field.
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_FRT_CD'));
			sheetObj.SelectCell(i, "frt_cd");
			return false;
		}
		if (sheetObj.GetCellValue(i, "qty") == "") {
			//[Vol] is mandatory field.
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_VOL'));
			sheetObj.SelectCell(i, "qty");
			return false;
		}
		if(sheetObj.GetCellValue(i, "rat_curr_cd") == ""){
			//[Currency] is mandatory field.
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CURR'));
			sheetObj.SelectCell(i,"rat_curr_cd");
			return false;
		}
		if(sheetObj.GetCellValue(i, "frt_term_cd") == ""){
			//[frt_term_cd] is mandatory field.
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FRT_TERM_CD'));
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
//#2189 [BNX][INDIA] AP Actual Shipper & CNEE 추가 // 1 Master 3 House
function codeNameAction(str, obj, tmp) {
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();
	var s_type="";
	if (s_code != "") {
		if (tmp == "onKeyDown") {
			if (event.keyCode == 13) {
				CODETYPE=str;
				s_type="trdpCode";
				if (CODETYPE == "VENDOR" || CODETYPE == "A_SHIPPER" || CODETYPE == "A_CONSIGNEE"|| CODETYPE == "CUSTOMER" || CODETYPE == "CONSIGNEE" || CODETYPE == "SHIPPER") {
					ajaxSendPost(trdpCdReq, 'reqVal',
							'&goWhere=aj&bcKey=searchCodeName&codeType='
									+ s_type + '&s_code=' + s_code,
							'./GateServlet.gsl');
				}
			}
		} else if (tmp == "onBlur") {
			if (s_code != "") {
				CODETYPE=str;
				s_type="trdpCode";
				if (CODETYPE == "VENDOR" || CODETYPE == "A_SHIPPER" || CODETYPE == "A_CONSIGNEE"|| CODETYPE == "CUSTOMER" || CODETYPE == "CONSIGNEE" || CODETYPE == "SHIPPER") {
					ajaxSendPost(trdpCdReq, 'reqVal',
							'&goWhere=aj&bcKey=searchCodeName&codeType='
									+ s_type + '&s_code=' + s_code,
							'./GateServlet.gsl');
				}
			}
		}
	} else {
		if (str == "VENDOR") {
			formObj.f_vendor_cd.value="";
			formObj.f_vendor_nm.value="";
		}else if(str == "A_SHIPPER") {
			formObj.f_act_shpr_trdp_nm.value="";
		}else if(str == "A_CONSIGNEE") {
			formObj.f_act_cnee_trdp_nm.value="";
		}
	}
}
/**
 * Trade Partner 관린 코드조회
 */

//#2189 [BNX][INDIA] AP Actual Shipper & CNEE 추가 // 1 Master 3 House
function trdpCdReq(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if (CODETYPE == "VENDOR") {
				formObj.f_vendor_cd.value=masterVals[0]; // trdp_cd AS param1
				
				//Jeong-Il Park Order - Name Change
				if ( MULTI_LANGUAGE == "Y" ){
					formObj.f_vendor_nm.value=masterVals[16]; // locl_nm AS param2
				}else{
					formObj.f_vendor_nm.value=masterVals[3]; // eng_nm AS param2
				}
					
				formObj.f_terms.value=masterVals[8]; // term_cd
				formObj.f_term_dt.value=masterVals[9]; // term_dt
				calcCreateTerms();
			}else if(CODETYPE == "A_SHIPPER") {
				formObj.f_act_shpr_trdp_nm.value=masterVals[3]; // eng_nm AS param2
			}else if(CODETYPE == "A_CONSIGNEE") {
				formObj.f_act_cnee_trdp_nm.value=masterVals[3]; // eng_nm AS param2
			}else if(CODETYPE == "CUSTOMER" || CODETYPE == "CONSIGNEE" || CODETYPE == "SHIPPER"){//	#5894 [Zencon] Credit overlimited TP 에 대한 A/P 제한
				formObj.f_shpr_nm.style.color= "#000000";
				formObj.f_cnee_nm.style.color= "#000000";
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					creditLimit_flg = 'Y';
					if(CODETYPE == "SHIPPER"){
						formObj.f_shpr_nm.style.color= "#000000";
					}else if(CODETYPE == "CONSIGNEE")				{
							formObj.f_cnee_nm.style.color= "#000000";
					}
					return;
				}
				if(masterVals[5]=='CR'){
					var crdLmtAmt = masterVals[6]==""?0:eval(masterVals[6]);
					var curLmtAmt = masterVals[7]==""?0:eval(masterVals[7]);
					var balLmtAmt = crdLmtAmt - curLmtAmt;
					var overDueAmt= masterVals[20]==""?0:eval(masterVals[20]);
					var grandTotal= masterVals[22]==""?0:eval(masterVals[22]);

					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0){
							var objArr = new Array();
							objArr[0] = doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2));
							creditLimit_flg = 'Y';
							alert(getLabel2('COM_FRT_CFM008', objArr));
								if(CODETYPE == "SHIPPER"){
									formObj.f_shpr_nm.style.color= "#ff0000";
								}else if(CODETYPE == "CONSIGNEE"){
									formObj.f_cnee_nm.style.color= "#ff0000";
								}
						} else if (balLmtAmt < 0){
							var objArr = new Array();
							objArr[0] = doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2));
							creditLimit_flg = 'Y';
							alert(getLabel2('COM_FRT_CFM006', objArr));
								if(CODETYPE == "SHIPPER"){
									formObj.f_shpr_nm.style.color= "#ff0000";
								}else if(CODETYPE == "CONSIGNEE"){
									formObj.f_cnee_nm.style.color= "#ff0000";
								}
						} else if (overDueAmt > 0) {
							try {creditOver=false;}catch(e){};
							var objArr = new Array();
							objArr[0] = doMoneyFmt(roundXL(Number(grandTotal),2));
							creditLimit_flg = 'Y';
							alert(getLabel2('COM_FRT_CFM007', objArr));
							if(CODETYPE == "SHIPPER"){
									formObj.f_shpr_nm.style.color= "#ff0000";
								}else if(CODETYPE == "CONSIGNEE"){
									formObj.f_cnee_nm.style.color= "#ff0000";
								}
						} else {
							try {creditOver=false;}catch(e){};
							if(CODETYPE == "SHIPPER"){
									formObj.f_shpr_nm.style.color= "#000000";
								}else if(CODETYPE == "CONSIGNEE"){
									formObj.f_cnee_nm.style.color= "#000000";
								}
						}
					} else {
						try {creditOver=false;}catch(e){};
						if(CODETYPE == "SHIPPER"){
									formObj.f_shpr_nm.style.color= "#000000";
								}else if(CODETYPE == "CONSIGNEE"){
									formObj.f_cnee_nm.style.color= "#000000";
								}
					}
				}else if(masterVals[5] == 'CH'){
					creditLimit_flg = 'Y';
					alert(getLabel('COM_FRT_CFM005'));
					if(CODETYPE == "SHIPPER"){
									formObj.f_shpr_nm.style.color= "#ff0000";
								}else if(CODETYPE == "CONSIGNEE"){
									formObj.f_cnee_nm.style.color= "#ff0000";
								}

				} else if(masterVals[5] == 'CO'){
					try {creditOver=false;}catch(e){};
					creditLimit_flg = 'Y';
					alert(getLabel('COM_FRT_ALT001'));
					if(CODETYPE == "SHIPPER"){
									formObj.f_shpr_nm.style.color= "#ff0000";
								}else if(CODETYPE == "CONSIGNEE"){
									formObj.f_cnee_nm.style.color= "#ff0000";
								}

				}
			}
		} else {
			if (CODETYPE == "VENDOR") {
				formObj.f_vendor_cd.value="";
				formObj.f_vendor_nm.value="";
			}else if(CODETYPE == "A_SHIPPER") {
				formObj.f_act_shpr_trdp_nm.value="";
			}else if(CODETYPE == "A_CONSIGNEE") {
				formObj.f_act_cnee_trdp_nm.value="";
			}
		}
		chgTrdpInfo();
	} else {
		//SEE_BMD_MSG43
	}
}
function custEnterAction(obj, type) {
	var formObj=document.frm1;
	if (event.keyCode == 13) {
		if (type == "CUSTOMER") {
			doWork("CUSTOMER_POPLIST");
		} else if (type == "CUSTOMER2") {
			doWork("CUSTOMER_POPLIST2");
		} else if (type == "CUSTOMER_NAME") {
			doWork("CUSTOMER_NAME");
		} else if (type == "A_SHIPPER_NAME") {
			doWork("ASHIP_TRDP_POPLIST_NAME");
		} else if (type == "A_CONSIGNEE_NAME") {
			doWork("ACON_TRDP_POPLIST_NAME");
		}
	}
}
function chgTrdpInfo() {
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	for ( var i=2; i <= sheetObj.LastRow(); i++) {
		sheetObj.SetCellValue(i, "trdp_cd",formObj.f_vendor_cd.value);
		sheetObj.SetCellValue(i, "trdp_nm",formObj.f_vendor_nm.value);
	}
}
//마감처리를 한다.
function execMagam() {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT"); // document 상의 모든
															// INPUT 태그 요소들을
															// 컬렉션으로 구하고...
	for ( var i=0; i < collTxt.length; i++) {
		if (collTxt[i].type == "text" || collTxt[i].type == "hidden") {
			//WMS ACCOUNT LKH 2015.01.20
			if (collTxt[i].name != "f_usr_nm" && collTxt[i].name != "f_email"
					&& collTxt[i].name != "f_ofc_cd"
					&& collTxt[i].name != "f_cnt_cd"
					&& collTxt[i].name != "s_bl_no"
					&& collTxt[i].name != "s_ref_no"
					&& collTxt[i].name != "s_oth_no"
					&& collTxt[i].name != "s_inv_no"
					&& collTxt[i].name != "f_inv_no"
					&& collTxt[i].name != "f_inv_dt"
					&& collTxt[i].name != "f_term_dt"
					&& collTxt[i].name != "s_wms_no"
					&& collTxt[i].name != "f_loc_ex_rate"
					//#5748 [StarCluster-MEX] Request for making Tax Invoice No column in A/R Entry screen
					&& collTxt[i].name != "f_vchr_no"
					// #6307 [Starcluster-MEX] Add tax Inv No in aging, local and agent statement (Zen#2159)
					&& collTxt[i].name != "f_tax_no"
			){
				collTxt[i].className="search_form-disable";
				collTxt[i].readOnly=true;
			}
		}
	}
	//frm1.f_buy_inv_rcv.disabled = true;
	// frm1.f_terms.disabled = true;
	frm1.f_curr_cd.disabled=true;
	// frm1.f_remark.disabled = true;
	// frm1.f_inco_cd.disabled = true;
	frm1.f_tax_bill.disabled=true;

//	frm1.f_vchr_tp_cd.disabled=true;
	// frm1.f_inv_dt.onblur = "";
	// frm1.f_term_dt.onblur = "";
	// frm1.f_post_dt_cal.onclick = "";
	frm1.f_inv_dt_cal.onclick="";
	frm1.f_due_dt_cal.onclick="";
	/*
	 * deleteBtn1.style.display = "none"; deleteBtn2.style.display = "none";
	 */
	for ( var i=2; i <= sheetObj.LastRow(); i++) {
		sheetObj.SetRowEditable(i,0);
	}
}
// PAID 처리됐을때 마감처리를 한다.
function execPaidMagam() {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT"); // document 상의 모든
															// INPUT 태그 요소들을
															// 컬렉션으로 구하고...
	for ( var i=0; i < collTxt.length; i++) {
		if (collTxt[i].type == "text" || collTxt[i].type == "hidden") {
			//WMS ACCOUNT LKH 2015.01.20
			if (collTxt[i].name != "f_usr_nm" && collTxt[i].name != "f_email"
					&& collTxt[i].name != "f_ofc_cd"
					&& collTxt[i].name != "f_cnt_cd"
					&& collTxt[i].name != "s_bl_no"
					&& collTxt[i].name != "s_ref_no"
					&& collTxt[i].name != "s_oth_no"
					&& collTxt[i].name != "s_inv_no"
					&& collTxt[i].name != "f_inv_no"
					&& collTxt[i].name != "f_inv_dt"
					&& collTxt[i].name != "f_term_dt"
					&& collTxt[i].name != "s_wms_no"
					&& collTxt[i].name != "f_loc_ex_rate"
					//#5748 [StarCluster-MEX] Request for making Tax Invoice No column in A/R Entry screen
					&& collTxt[i].name != "f_vchr_no"
					// #6307 [Starcluster-MEX] Add tax Inv No in aging, local and agent statement (Zen#2159)
					&& collTxt[i].name != "f_tax_no"
					) {
				collTxt[i].className="search_form-disable";
				collTxt[i].readOnly=true;
			}
		}
	}
	frm1.f_buy_inv_rcv.disabled=true;
	frm1.f_terms.disabled=true;
	frm1.f_curr_cd.disabled=true;
	frm1.f_remark.disabled=true;
	frm1.f_inco_cd.disabled=true;
	frm1.f_tax_bill.disabled=true;

	frm1.f_inv_dt.disabled=true;
	frm1.f_term_dt.disabled=true;
	//#5748 [StarCluster-MEX] Request for making Tax Invoice No column in A/R Entry screen
	//frm1.f_vchr_tp_cd.disabled=true;
	
	// saveBtn1.style.display = "none";
	// saveBtn2.style.display = "none";
	// rowAddBtn1.style.display = "none";
	// rowAddBtn2.style.display = "none";
	frm1.f_inv_dt.onblur="";
	frm1.f_term_dt.onblur="";
	// frm1.f_post_dt_cal.onclick = "";
	frm1.f_inv_dt_cal.onclick="";
	frm1.f_due_dt_cal.onclick="";
	// sheetObj.Editable = false;
}
//CURRENCY를 셋팅한다.
function setCurrency() {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for ( var i=2; i <= sheetObj.LastRow(); i++) {
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
			sheetObj.SetCellValue(i, "inv_xcrt", 1);
		}
		// }
		sheetObj.SetCellValue(i, "inv_aply_curr_cd", curr, 0);


		/*sheetObj.SetCellValue(i, "trf_cur_sum_amt",Number(sheetObj.GetCellValue(i,
				"qty"))
				* Number(sheetObj.GetCellValue(i, "ru")), 0);
			//vat_amt, inv_vat_amt 계산로직 삭제 YJW 2015-07-14
			//sheetObj.SetCellValue(i, "vat_amt",Number(sheetObj.GetCellValue(i, "ru"))
			//	* (Number(sheetObj.GetCellValue(i, "vat_rt")) / 100));
		if (curr == "KRW" || curr == "JPY") {
			sheetObj.SetCellValue(i, "inv_amt",Math.round(Number(sheetObj
					.GetCellValue(i, "trf_cur_sum_amt"))
					* Number(sheetObj.GetCellValue(i, "inv_xcrt"))));
			//sheetObj.SetCellValue(i, "inv_vat_amt",Math.round(Number(sheetObj
			//		.GetCellValue(i, "trf_cur_sum_amt"))
			//		* (Number(sheetObj.GetCellValue(i, "vat_rt")) / 100)
			//		* Number(sheetObj.GetCellValue(i, "inv_xcrt"))));
		} else {
			sheetObj.SetCellValue(i, "inv_amt",Number(sheetObj.GetCellValue(i,
					"trf_cur_sum_amt"))
					* Number(sheetObj.GetCellValue(i, "inv_xcrt")));
			//sheetObj.SetCellValue(i, "inv_vat_amt",Number(sheetObj.GetCellValue(i,
			//		"trf_cur_sum_amt"))
			//		* (Number(sheetObj.GetCellValue(i, "vat_rt")) / 100)
			//		* Number(sheetObj.GetCellValue(i, "inv_xcrt")));
		}
		//sheetObj.SetCellValue(i, "inv_sum_amt",Number(sheetObj.GetCellValue(i,
		//		"inv_amt"))
		//		+ Number(sheetObj.GetCellValue(i, "inv_vat_amt")));
		sheetObj.SetCellValue(i, "inv_sum_amt",Number(sheetObj.GetCellValue(i,"inv_amt")));*/
	}
}
/*
function setExRate(row){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];

	if(formObj.f_curr_cd.value != sheetObj.GetCellValue(row, "rat_curr_cd")){
		var param = '';
		param += '&cur_dt=' + sheetObj.GetCellValue(row, 'inv_xcrt_dt');
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
}*/

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
					var curr=formObj.f_curr_cd.value; // Fix bug
					if( ofc_locl_curr_cd =="JPY" || (curr=="VND" && vnCalRound=="Y")){
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
				var curr=formObj.f_curr_cd.value; // Fix bug
				if( ofc_locl_curr_cd =="JPY" || (curr=="VND" && vnCalRound=="Y")){
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
		//alert(formObj.old_post_dt.value);
		//alert(formObj.f_post_dt.value);
		formObj.f_post_dt.value=formObj.old_post_dt.value;
		formObj.f_post_dt.select();
		return false;
	}
	// 마감 POST DATE와 BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	// AP건은 새로작성시에만 VALIDATION을 건다.
	if (formObj.f_inv_seq.value == "") {
		if (bl_post != "" && slip_post != "") {
			if (chgDateYYYYMMDD(slip_post) >= chgDateYYYYMMDD(bl_post)) {
				//Invalid [Posting Date]
				alert(getLabel('FMS_COM_ALT007') + " - "
						+ getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0010.2302");
				formObj.f_post_dt.value=formObj.old_post_dt.value;
				formObj.f_post_dt.select();
				return false;
			}
		}
	}
}
function chkInvRcv(obj) {
	var formObj=document.frm1;
	if (obj.value == "") {
		formObj.f_buy_inv_rcv.checked=false;
	} else {
		formObj.f_buy_inv_rcv.checked=true;
	}
}
//-----[20130401 OJG]-----
function getInvoicePayAmt(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			if (doc[1] * 1 > 0) {
				//alert(getLabel('ACC_MSG114') + "\n\n: ACC_INV_0030.2582");
				bPaid=true;
			}
		}
	} else {
		//Error Errupt!
		alert(getLabel('FMS_COM_ERR001') + "\n\n: ACC_INV_0030.1316");
	}
}
//-----[20130401 OJG]-----
/**
 *  #20443 POST DATE와 BLOCK_DT 의 비교
 * 		POST_DATE가 클 경우 return true,
 * 		POST_DATE가 같거나 작을경우 false
 */
function checkPostDt() {
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    var blockDt=sheetObj.GetCellValue(2, "block_dt");
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
/**
 * AJAX RETURN
 */
function getBuyInvNoDupChk(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			if (doc[1] == '0') {
				isBuyInvNoDupChk=false;
			} else {
				isBuyInvNoDupChk=true;
			}
		}
	}
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
	if (formObj.f_intg_bl_seq.value == "" && formObj.f_oth_seq.value == "" && formObj.f_wms_seq.value == ""){
		alert(getLabel('ACC_MSG103'));
		return false;
	}
	return true;
}
/**
 * mmddYYYY -> yyyymmdd 로 변경 (날짜 비교를 위한 함수)
 * @param orgDate
 */
function chgDateYYYYMMDD (orgDate) {
	var strRtnValue='';
	var tmpOrgDate=orgDate.replace(/^\s+|\s+$/g,"");
	tmpOrgDate=tmpOrgDate.replaceAll('-','');
	if (tmpOrgDate.length == 8) {
		strRtnValue=tmpOrgDate.substring(4,8)+tmpOrgDate.substring(0,2)+tmpOrgDate.substring(2,4);
	} else if (tmpOrgDate.length == 6) {
		strRtnValue=tmpOrgDate.substring(4,6)+tmpOrgDate.substring(0,2)+tmpOrgDate.substring(2,4);
	}else {
		strRtnValue='';
	}
	return strRtnValue;
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.s_bl_no.value = "";
	formObj.s_ref_no.value = "";
	formObj.s_oth_no.value = "";
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_intg_bl_seq.value = getParam(url,"f_intg_bl_seq");
	formObj.f_inv_seq.value = getParam(url,"f_inv_seq");

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
		   url: "./ACC_INV_0030AJ.clt",
		   dataType: 'xml',
		   data: $("form" ).serialize(),
		   success: function(data){
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
			   setFieldValue( formObj.f_agent, $('agent_trdp_nm',data).text());
			   setFieldValue( formObj.f_shpr_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.f_cnee_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.f_vsl_flt, $('vsl_flt',data).text());
			   setFieldValue( formObj.f_por_nm, $('por_nm',data).text());
			   setFieldValue( formObj.f_pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.f_etd_dt, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.f_pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.f_eta_dt, $('eta_dt_tm',data).text());
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

			   //#1108   [BINEX] V440 OCEAN MEASUREMENT INFO NOT SHOWING WHEN SEARCHED ON AR ENTRY
			   if (formObj.f_air_sea_clss_cd.value != "A"){
				   setFieldValue( formObj.f_meas, $('meas',data).text());
				   setFieldValue( formObj.f_meas1, $('meas1',data).text());
			   }else{
				   setFieldValue( formObj.f_meas, $('vol_wgt',data).text());
				   setFieldValue( formObj.f_meas1, $('vol_meas',data).text());
			   }

			   if($('prnr_trdp_cd',data).text() != ""){
				   setFieldValue( formObj.f_vendor_cd, $('prnr_trdp_cd',data).text());
				   setFieldValue( formObj.f_vendor_nm, $('prnr_trdp_nm',data).text());
			   }else if(formObj.s_wms_no.value != "" && $('bill_to_cd',data).text() != ""){
				   setFieldValue( formObj.f_vendor_cd, $('bill_to_cd',data).text());
				   setFieldValue( formObj.f_vendor_nm, $('bill_to_nm',data).text());
			   }

			   setFieldValue( formObj.f_post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.f_inv_no, $('inv_no',data).text());
			   setFieldValue( formObj.f_inv_dt, $('inv_dt',data).text());
			   setFieldValue( formObj.pre_inv_dt, $('inv_dt',data).text());

			   //WMS ACCOUNT LKH 2015.01.20
			   setFieldValue( formObj.f_wms_seq, $('wms_seq',data).text());
			   setFieldValue( formObj.temp_wms_no , $('wms_no',data).text());
			   setFieldValue( formObj.m_intg_bl_seq , $('m_intg_bl_seq',data).text());
			   
			   // #6307 [Starcluster-MEX] Add tax Inv No in aging, local and agent statement (Zen#2159)
			   setFieldValue( formObj.tax_no , $('tax_no',data).text());
			   
			   //<!-- #2189 [BNX][INDIA] AP Actual Shipper & CNEE 추가 // 1 Master 3 House -->
			   setFieldValue( formObj.f_act_shpr_trdp_nm, $('act_shpr_trdp_nm',data).text());
			   setFieldValue( formObj.f_act_cnee_trdp_nm, $('act_cnee_trdp_nm',data).text());
			   
			 //#5994 [ACROCARGO] Request to show POR and Carrier Bkg No in both AR, D/C Entry and
			   setFieldValue( formObj.f_lnr_bkg_no , $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.f_ntfy_trdp_nm , $('ntfy_trdp_nm',data).text());
			   //#5894 [Zencon] Credit overlimited TP 에 대한 A/P 제한
			   setFieldValue( formObj.f_cust_cd, $('act_shpr_trdp_cd',data).text());
			   setFieldValue( formObj.f_shp_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.f_cnee_cd, $('cnee_trdp_cd',data).text());
			   
			   sheet1.SetColProperty('frt_cd', {ComboText:$('FRTCD2',data).text(), ComboCode:$('FRTCD1',data).text()} );
			   //[20150211 OJG]
			   VAT_FRT_CD =  $('VAT_FRT_CD',data).text();
			   WHLD_VAT_FRT_CD =  $('WHLD_VAT_FRT_CD',data).text();

			   var arrVatFrtCd =  $('ARR_VAT_FRT_CD',data).text();
			   var arrTaxRate =  $('ARR_TAX_RATE',data).text();

			   ARR_VAT_FRT_CD = arrVatFrtCd.split('|');
			   ARR_TAX_RATE = arrTaxRate.split('|');

			   doBtnAuthority(attr_extension);
			   //setupPage();
			   loadPage();
			   setSelect();
			   doWork('SEARCHLIST');
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
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

var blck_ap_inv_add;

function setBlckApInvAddReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		blck_ap_inv_add=doc[1];
	} else {
		blck_ap_inv_add="";
	}
}


//#4239 [JAPT] AP INVOICE, PAID 후에 INVOICE 수정 가능한 문제
var paid_ap_inv_add;

function setPaidApInvAddReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		paid_ap_inv_add=doc[1];
	} else {
		paid_ap_inv_add="";
	}
}

function onLoadWarehouse(){
	var formObj = document.frm1;
	formObj.f_vendor_cd.disabled = true;
	formObj.f_vendor_nm.disabled = true;
	$("#billto").prop('disabled', true);
	$("#rowAddBtn2").prop('disabled', true);
	$("#rowAddBtn4").prop('disabled', true);

	//#3411 [JTC]Accounting & Performance 수정사항
	//AUTO_VAT_CALCULATING_AP 옵션에 따라 VAT Cal. 버튼 안보이게 하고, 저장시 버튼 클릭 이벤트 자동 호출되도록
	// 'Y' : VAT Cal. 버튼 비활성화
	if(AUTO_VAT_CALCULATING_AP != 'Y') {
		$("#vatBtn").prop('disabled', true);
	}

	doWork("SEARCH");
	//doWork("SEARCHLIST");
}

function getTermDt(){
	var formObj = document.frm1;

	var s_type = "trdpCode";
	var s_code = formObj.f_vendor_cd.value;

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
	pdfFileNm = "AP_"+inv_no;
	if(rpt_file_name_flg && ref_no != ""){
		pdfFileNm += "_" + ref_no;
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
	//#4090 [Great Luck] AP Invoice Entry Cursor Placement
	//formObj.f_vendor_cd.focus();
	// OFVFOUR-7154 [BINEX-AWS] AP Entry - Auto re-calculate Due Date
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
					sheetObj.DoAllSave("./ACC_INV_0030GS.clt", FormQueryString(formObj), true);
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

function goSearchInv(){
	doWork("SEARCHLIST");
}

function ACC_POPLIST(rtnVal){
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
		}

	 //bill to
	 if(cur_curObj.id == "billto"){
		frm1.f_vendor_cd.value=rtnValAry[0];

		if ("Y".equals(MULTI_LANGUAGE)){
			frm1.f_vendor_nm.value=rtnValAry[10];//loc_nm
		}else{
			frm1.f_vendor_nm.value=rtnValAry[2];//eng_nm
		}
		// #3883 [ALL GREEN] Vendor Selection on Invoice Creation
		codeNameAction('VENDOR',document.frm1.f_vendor_cd, 'onBlur');		
	 }
}

//#2338 [BNX][INDIA] OVERPAID (BNX INDIA)
function setApOverpaidPermit(reqVal){
	ap_overpaid_permit="";
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		ap_overpaid_permit=doc[1];
	} else {
		ap_overpaid_permit="";
	}
}

//#855 [SUNWAY] PREVENT AP CREATION BEFORE AR CREATION
var chkRoleFlag = false;
function chkRoleInv(intgBlSeq){
	var formObj=document.frm1
	var usrId  = formObj.f_usrId.value;

	ajaxSendPost(getRoleInvt, 'reqVal', '&goWhere=aj&bcKey=checkRoleControl&user_id='+usrId+"&intg_bl_seq="+intgBlSeq, './GateServlet.gsl');

	return chkRoleFlag;
}

function getRoleInvt(reqVal){
	var formObj=document.frm1
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1] != 'OK'){
				chkRoleFlag=false;
			}
			else{
				chkRoleFlag=true;
			}
		}
	}
}

//#5859 [StarCluster-Mex] Adding Paid Column & Other filing A/P prevent logic
var chkRoleFlag = false;
function chkRoleInvOth(othSeq){
	var formObj=document.frm1
	var usrId  = formObj.f_usrId.value;

	ajaxSendPost(getRoleInvtOth, 'reqVal', '&goWhere=aj&bcKey=checkRoleControlOth&user_id='+usrId+"&oth_seq="+othSeq, './GateServlet.gsl');

	return chkRoleFlag;
}

function getRoleInvtOth(reqVal){
	var formObj=document.frm1
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1] != 'OK'){
				chkRoleFlag=false;
			}
			else{
				chkRoleFlag=true;
			}
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



/**
 * @param reqVal
 * @returns
 * #2750 [BINEX, IMPEX] AP Invoice Update After Paid or File Block
 */
function setApAfterBlock(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		ap_after_block=doc[1];
	} else {
		ap_after_block="";
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


/**
 * @param paidAmtYn
 * @param fileBolckYn
 * #2750 [BINEX, IMPEX] AP Invoice Update After Paid or File Block
 * @returns
 */
function apAfterBlock(paidAmtYn, fileBolckYn){
	if(ap_after_block == 'N'){
		
		var apPaidBlockSts = 0;

		//1. paid && not blocked
		if(paidAmtYn && !fileBolckYn) {
			apPaidBlockSts = 1;
		} 
		//2. paid && blocked
		if(paidAmtYn && fileBolckYn) {
			apPaidBlockSts = 2;
		} 
		//3. not paid & blocked
		if(!paidAmtYn && fileBolckYn) {
			apPaidBlockSts = 3;
		}		
		//4. not paid & not blocked
		if(!paidAmtYn && !fileBolckYn) {
			apPaidBlockSts = 4;
		}		
		
		
		switch (apPaidBlockSts) {
		//1. paid && not block
		case 1:
			frm1.f_inv_no.readOnly = true;
			break;
			
		//2. paid && blocked
		case 2:
			frm1.f_inv_no.readOnly = true;
			break;
			
		//3. not paid & blocked		
		case 3:
			frm1.f_inv_dt.disabled = false;
			frm1.f_inv_dt.readOnly = true;
			frm1.f_inv_dt.onblur = '';
			frm1.f_inv_dt_cal.disabled = 'disabled';
			
			frm1.f_inv_no.disabled= false;
			frm1.f_inv_no.readOnly = false;
			
			frm1.f_remark.disabled = false;
			frm1.f_remark.readOnly = false;
			break;
			
		//4. not paid & not blocked
		case 4:
			break;
				
		}
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
	var f_wms_seq     = formObj.f_wms_seq.value;
	var f_bnd_clss_cd = formObj.f_bnd_clss_cd.value;
	var chk_fr_trdp_cd       = formObj.chk_fr_trdp_cd.value || '';
	var chk_fr_inv_curr_cd   = formObj.chk_fr_inv_curr_cd.value || '';
	var chk_fr_frt_seq   	 = formObj.chk_fr_frt_seq.value || '';
	ajaxSendPost(chkMulCur, "reqVal", "&goWhere=aj&bcKey=checkMultilCurrAp&f_intg_bl_seq="+f_intg_bl_seq+"&f_oth_seq="+f_oth_seq+"&f_wms_seq="+ f_wms_seq +"&f_bnd_clss_cd="+f_bnd_clss_cd + "&chk_fr_trdp_cd=" + chk_fr_trdp_cd + "&chk_fr_inv_curr_cd=" +chk_fr_inv_curr_cd +"&chk_fr_frt_seq="+chk_fr_frt_seq ,"./GateServlet.gsl");
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
//#5894 [Zencon] Credit overlimited TP 에 대한 A/P 제한
function chkTypeBl(){
	 creditLimit_flg = '';
	var formObj=document.frm1;
	var f_air_sea_clss_cd	= formObj.f_air_sea_clss_cd.value;
	var f_biz_clss_cd		= formObj.f_biz_clss_cd.value;
	var f_bnd_clss_cd		= formObj.f_bnd_clss_cd.value;
	//house export&import
	if(f_biz_clss_cd == 'H'){
		codeNameAction('CUSTOMER',document.frm1.f_cust_cd, 'onBlur');
	}
	//master export
	if (f_biz_clss_cd == 'M' && f_bnd_clss_cd == 'O') {
		codeNameAction('SHIPPER',document.frm1.f_shp_cd, 'onBlur');
	}
	//master import
	if (f_biz_clss_cd == 'M' && f_bnd_clss_cd == 'I') {
		codeNameAction('CONSIGNEE',document.frm1.f_cnee_cd, 'onBlur');
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