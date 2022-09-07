var FROMDATE;
var TODAY;
var ENDDATE;
var PREDATE;
var NXTDATE;
var SLIP_POST_DT="";
var ORG_BLOCK_POST_DT=""; //MAX(BLOCK_DT)
var BLOCK_POST_DT="";    // MAX(BLOCK_DT)+1
var G_GL_DATA_CREATE_STATUS = "END";

var ACC_VAT_VAL = "1";
var ACC_WHD_VAL = "1";

//#3375 [JTC]Invoice, Local Statement Form 개발
var AR_INVOICE_OPTION_USE = "N";

var FIRST_SEARCH_YN = "N";

var rtnary=new Array(1);
var callBackFunc = "";
var isInvModiTmsOk=false; 
var printBlockRow;
//OFVFOUR-8099 [BEST OCEAN] REMOVING PRINT BUTTON WHEN THERE IS PRINT/L IN THE SAME SCREEN
var visiblePrint = false;

function doWork(srcName){
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
    var searchConditions = document.getElementsByClassName('search_form');
    var allEmpty = true;
    for(var q=0; q<searchConditions.length; q++){
    	if("" != searchConditions[q].value)
    		allEmpty = false;
    }	   				
    switch(srcName) {
	   case "DEFAULT":
	   break;
	   case "SEARCHLIST01":
		   formObj.f_cmd.value=SEARCHLIST01;
           formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
           formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
           //클릭시 셋팅되는 키값들을 초기화한다.
           //formObj.s_oth_seq.value = "";
           formObj.f_inv_seq.value="";
           formObj.f_oth_seq.value="";
           formObj.f_trdp_cd.value="";
           
			var dateValidFlag = true;

			if("Y" == initDatLod){
				if(loadSearchFlag 
						&& "" == formObj.f_ref_no.value
						&& "" == formObj.f_mhbl_no.value
						&& "" == formObj.s_inv_no.value
						&& "" == formObj.s_v_inv_no.value
						){
					if("" == formObj.f_strdt.value && "" == formObj.f_enddt.value && allEmpty == false){
   						formObj.f_strdt.value = dtFm;
   						formObj.f_enddt.value = dtTo;
					}
				}else
				if("" != formObj.f_ref_no.value || "" != formObj.f_mhbl_no.value
					 || "" != formObj.s_inv_no.value || "" != formObj.s_v_inv_no.value){

					//formObj.f_strdt.value = "";
					//formObj.f_enddt.value = "";
					//dateValidFlag = false;
				}
				if(dateValidFlag){
   					if(chkCmprPrdSc(formObj.f_strdt, formObj.f_enddt)){
   						docObjects[0].DoSearch("./ACC_INV_0040GS.clt", FormQueryString(formObj) );
   					}
				}else{
					docObjects[0].DoSearch("./ACC_INV_0040GS.clt", FormQueryString(formObj) );
				}
			}
			loadSearchFlag = true;
			initDatLod = "Y";
      break;
	  case "NEW":
		  var inv_tp=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "inv_tp");
		    if(inv_tp == "A/R"){
		    	var paramStr="./ACC_INV_0010.clt?f_cmd=-1";
		        parent.mkNewFrame('A/R Entry', paramStr);
		    }else if(inv_tp == "DB/CR"){
		    	var paramStr="./ACC_INV_0020.clt?f_cmd=-1";
		        parent.mkNewFrame('DC Note Entry', paramStr);
		    }else if(inv_tp == "A/P"){
		    	var paramStr="./ACC_INV_0030.clt?f_cmd=-1";
		        parent.mkNewFrame('A/P Entry(Cost)', paramStr);
		    }
	  break;
	  case "SEARCHLIST0":
		    if(!chkSearchCmprPrd(false, frm1.f_strdt, frm1.f_enddt)){
				return;
			}
		    
	      formObj.f_cmd.value=SEARCHLIST;
          formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
          formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
          //클릭시 셋팅되는 키값들을 초기화한다.
          //formObj.s_oth_seq.value = "";
          formObj.f_inv_seq.value="";
          formObj.f_oth_seq.value="";
          formObj.f_trdp_cd.value="";
          
          if(!validationForm()){
       	   return;
          }  
          
			var dateValidFlag = true;
			if("Y" == initDatLod){
				if(loadSearchFlag 
						&& "" == formObj.f_ref_no.value
						&& "" == formObj.f_mhbl_no.value
						&& "" == formObj.s_inv_no.value
						&& "" == formObj.s_v_inv_no.value
						){
					if("" == formObj.f_strdt.value && "" == formObj.f_enddt.value && allEmpty == false){
   						formObj.f_strdt.value = dtFm;
   						formObj.f_enddt.value = dtTo;
					}
				}else 
				if("" != formObj.f_ref_no.value || "" != formObj.f_mhbl_no.value
					 || "" != formObj.s_inv_no.value || "" != formObj.s_v_inv_no.value){
					//formObj.f_strdt.value = "";
					//formObj.f_enddt.value = "";
					//dateValidFlag = false;
				}
				if(dateValidFlag){
   					if(chkCmprPrdSc(formObj.f_strdt, formObj.f_enddt)){
   						docObjects[0].DoSearch("./ACC_INV_0040GS.clt", FormQueryString(formObj) );
   					}
				}else{
					docObjects[0].DoSearch("./ACC_INV_0040GS.clt", FormQueryString(formObj) );
				}
			}
			loadSearchFlag = true;
			initDatLod = "Y";
     break;
       case "SEARCHLIST":
		    if(!chkSearchCmprPrd(false, frm1.f_strdt, frm1.f_enddt)){
				return;
			}
		    
	    //20170105 조회조건 체크 추가 시작
		    
		    var v_mhbl_no = document.forms[0].f_mhbl_no.value;
		    var v_inv_no = document.forms[0].s_inv_no.value;
		    var v_v_inv_no= document.forms[0].s_v_inv_no.value;
		    var v_ref_no = document.forms[0].f_ref_no.value;		    
		    
		    var v_post_strdt= document.forms[0].f_strdt.value;
		    var v_post_enddt= document.forms[0].f_enddt.value;
		    var v_amt_fr= document.forms[0].s_amt_fr.value;
		    var v_amt_to= document.forms[0].s_amt_to.value;
		    var v_inv_rmk= document.forms[0].s_inv_rmk.value;
		    var v_cust_ref_no= document.forms[0].f_cust_ref_no.value; //#874 [STARWAY] SHIP TO COLUMN ADD ON AR/AP LIST SCREEN
		    var v_type_cd= document.forms[0].s_type_cd.value;
		    var v_bill_to_cd= document.forms[0].s_bill_to_cd.value;
		    var v_bill_to_nm= document.forms[0].s_bill_to_nm.value;
		    var v_ofc_cd= document.forms[0].s_ofc_cd.value;
		    
//		    if (v_inv_no == ""  && v_mhbl_no == "" && v_v_inv_no == "" && v_ref_no == "" && v_ofc_cd == "" && v_post_strdt == "" && v_post_enddt == "" && v_inv_rmk == "" && v_cust_ref_no == "" && v_type_cd == "" && v_amt_fr == "" && v_amt_to == "" && v_bill_to_cd == ""  && v_bill_to_nm == "") {
//		    }else if( v_inv_no == "" && v_mhbl_no == "" &&  v_v_inv_no == "" && v_ref_no == "" && v_ofc_cd.length > 0 && v_post_strdt == "" && v_post_enddt == "" && v_inv_rmk == "" && v_cust_ref_no == ""  && v_type_cd == "" && v_amt_fr == "" && v_amt_to == "" && v_bill_to_cd == "" &&  v_bill_to_nm == "" && v_ship_to == "" ) {
//		    }else{
//		    	if ( v_inv_no == "" && v_mhbl_no == "" &&  v_v_inv_no == "" && v_ref_no == "")  {
//		    		if ( (v_post_strdt == "" && v_post_enddt == "") && (v_inv_rmk != "" || v_cust_ref_no != "" || v_type_cd != "" || v_amt_fr != "" || v_amt_to != "" || v_bill_to_cd != "" || v_bill_to_nm != "" || v_ship_to != "") ) {
//		    			alert(getLabel('FMS_COM_ALT097'));
//		    			//#1826 [BINEX V4421] CANNOT SEARCH INVOICE WITH 1) POST DATE 2) AMOUNT INPUTTED
//		    			setRangeDate();
//		    			return;
//				    }else{
//				    	
//			 	   					    	
//				    }
//			    }
//		    }
		    //20170105 조회조건 체크 추가 끝
	
            formObj.f_cmd.value=SEARCHLIST;
            formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
            formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
            //클릭시 셋팅되는 키값들을 초기화한다.
            //formObj.s_oth_seq.value = "";
            formObj.f_inv_seq.value="";
            formObj.f_oth_seq.value="";
            formObj.f_trdp_cd.value="";

            if(!validationForm()){
         	   return;
            }  
			var dateValidFlag = true;

			// #5183 [BINEX] AFTER V470.06 RELEASE, CANT SEARCH W FILING # & ETD TOGETHER
			var tmpStrDt = '';
			var tmpEndDt = '';

			if("Y" == initDatLod){
				if(loadSearchFlag 
						&& "" == formObj.f_ref_no.value
						&& "" == formObj.f_mhbl_no.value
						&& "" == formObj.s_inv_no.value
						&& "" == formObj.s_v_inv_no.value
						){
					if("" == formObj.f_strdt.value && "" == formObj.f_enddt.value && allEmpty == false){
   						formObj.f_strdt.value = dtFm;
   						formObj.f_enddt.value = dtTo;
					}
				}else
				if("" != formObj.f_ref_no.value || "" != formObj.f_mhbl_no.value
					 || "" != formObj.s_inv_no.value || "" != formObj.s_v_inv_no.value){

					// #5183 [BINEX] AFTER V470.06 RELEASE, CANT SEARCH W FILING # & ETD TOGETHER
					//tmpStrDt = formObj.f_strdt.value;
					//tmpEndDt = formObj.f_enddt.value;

					//formObj.f_strdt.value = "";
					//formObj.f_enddt.value = "";
					//dateValidFlag = false;
				}
				//Link시 검색기간 제외 조회 옵션처리
				if("KEY" == formObj.linkOpt.value){
					var tempStrdt =formObj.f_strdt.value;
					var tempEnddt =formObj.f_enddt.value;
					
					formObj.f_strdt.value = "";
					formObj.f_enddt.value = "";
					
					docObjects[0].DoSearch("./ACC_INV_0040GS.clt", FormQueryString(formObj) );
					
					formObj.f_strdt.value = tempStrdt;
					formObj.f_enddt.value = tempEnddt;
					
					formObj.linkOpt.value = "";
				}else{
					if(dateValidFlag){
	   					if(chkCmprPrdSc(formObj.f_strdt, formObj.f_enddt)){
	   						docObjects[0].DoSearch("./ACC_INV_0040GS.clt", FormQueryString(formObj) );
	   					}
					}else{
						docObjects[0].DoSearch("./ACC_INV_0040GS.clt", FormQueryString(formObj) );

						// #5183 [BINEX] AFTER V470.06 RELEASE, CANT SEARCH W FILING # & ETD TOGETHER
						//formObj.f_strdt.value = tmpStrDt;
						//formObj.f_enddt.value = tmpEndDt;
					}
				}
				
			}
			loadSearchFlag = true;
			initDatLod = "Y";
       break;
       case "ROWADD":
    	   var intRows=sheetObj.LastRow()+1;
            sheetObj.DataInsert(intRows);
       break;
       case "MODIFY":	//수정
    	    
     	   // 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
    	   var ref_ofc_cd = "";
    	   for(var i=2; i<=sheetObj.LastRow();i++){
			   if(sheetObj.GetCellValue(i ,"check_flag") == "1"){
				   ref_ofc_cd = sheetObj.GetCellValue(i, "ref_ofc_cd");
			   }
		   } 

			var btnflag = "Y"; 
			if (efc_flg == "N"){  
				btnflag = "N";
				alert(getLabel('FMS_COM_ALT083'));
				return;				
			} 
			
			if (btnflag == "Y"){ 
				if (edoa_flg == "N"){
					if (ofc_cd != ref_ofc_cd){  
						btnflag = "N";
					}
				}  
				if (btnflag == "Y"){ 
				}else{
					alert(getLabel('FMS_COM_ALT083'));
					return;
				}
			}

			//#26602 Delete Button Disappear
		    for(var i=2; i<=sheetObj.LastRow();i++){
		    	if(sheetObj.GetCellValue(i ,"check_flag") == "1"){
		     	   	if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(i, "pay_amt")) > 0 || sheetObj.GetCellValue(i, "cmb_inv_seq") == "Y"){
		     	   		alert(getLabel('ACC_MSG143'));
		     	   		return;
		     	   	}
		     	   	
		     	   	//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정		
	       		  ajaxSendPost(getInvModiTms, 'reqVal', '&goWhere=aj&bcKey=searchInvModiTms&inv_seq='+sheetObj.GetCellValue(i, "inv_seq"), './GateServlet.gsl'); 
        		  if (isInvModiTmsOk) {
        			  // 인보이스가 변경된 경우
           		   alert(getLabel('ACC_MSG128')); 
           		   return;
        		  }
        		  		
		    	}
		    }
		   frm1.f_cmd.value=MODIFY;
		   var chk_cnt=0;
		   for(var i=2; i<=sheetObj.LastRow();i++){
			   	if(sheetObj.GetCellValue(i ,"check_flag") == "1"){
				   chk_cnt += 1;
			   }
		   }
		   //#1820-[PATENT] Invoice List - Tax Invoice No. Tax Bill, Financial Office 항목 추가
		   /*
		   if(chk_cnt == 0){
			   //No Save Data!!
			   alert(getLabel('FMS_COM_ALT007'));
			   return;
		   }
		   */
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
        	   formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
               formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
        	   sheetObj.DoSave("./ACC_INV_0040GS.clt", FormQueryString(formObj),"ibflag",false);
           }
           break;
       case "DELETE":	//삭제
    	   
     	   // 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
    	   var ref_ofc_cd = "";
    	   for(var i=2; i<=sheetObj.LastRow();i++){
			   if(sheetObj.GetCellValue(i ,"check_flag") == "1"){
				   ref_ofc_cd = sheetObj.GetCellValue(i, "ref_ofc_cd");
			   }
		   } 
 	 		 
			var btnflag = "Y"; 
			if (efc_flg == "N"){  
				btnflag = "N";
				alert(getLabel('FMS_COM_ALT084'));
				return;				
			} 
			
			if (btnflag == "Y"){ 
				if (edoa_flg == "N"){
					if (ofc_cd != ref_ofc_cd){  
						btnflag = "N";
					}
				}  
				if (btnflag == "Y"){ 
				}else{
					alert(getLabel('FMS_COM_ALT084'));
					return;
				}
			}
			
    	   //#26602 Delete Button Disappear
    	   var sRow=sheetObj.GetSelectRow();
    	   //#4162 [BINEX] #4161 처리 전, PAID AMOUNT 없는데 삭제 권한 BLOCK
    	   if(Number(sheetObj.GetCellValue(sRow, "pay_amt")) > 0 || sheetObj.GetCellValue(sRow, "cmb_inv_seq") == "Y"){
    		   alert(getLabel('ACC_MSG142'));
    		   return;
    	   }
    	   // #4162 [BINEX] #4161 처리 전, PAID AMOUNT 없는데 삭제 권한 BLOCK
    	   if(sheetObj.GetCellValue(sRow, "clt_cmpl_flg") == "Y" ){
    		   alert(getLabel('ACC_MSG169'));
    		   return;
    	   }
    	   
    	   
     	 //52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정		
 		  ajaxSendPost(getInvModiTms, 'reqVal', '&goWhere=aj&bcKey=searchInvModiTms&inv_seq='+sheetObj.GetCellValue(sRow, "inv_seq"), './GateServlet.gsl'); 
   		  if (isInvModiTmsOk) {
   			  // 인보이스가 변경된 경우
      		   alert(getLabel('ACC_MSG128')); 
      		   return;
   		  }
   		  
    	   frm1.f_cmd.value=REMOVE;
    	   var chk_cnt=0;
		   for(var i=2; i<=sheetObj.LastRow();i++){
			   if(sheetObj.GetCellValue(i ,"check_flag") == "1"){
				   chk_cnt += 1;
			   }
		   }
		   if(chk_cnt == 0){
			   //No Delete Data!!
			   alert(getLabel('FMS_COM_ALT007'));
			   return;
		   }
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
               formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
        	   sheetObj.DoSave("./ACC_INV_0040GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
//	   		rtnary[1]=formObj.s_bill_to_nm.value;
//	   		rtnary[2]=window;
	   		
	   		callBackFunc = "CUSTOMER_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
     	break;
       case "CUSTOMER_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_bill_to_nm.value;
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "CUSTOMER_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	break;
        case "GOLOCAL":	//LOCAL INVOICE 화면호출        	
        	goInvoiceEntry("AR");        	
        break;
        case "GOCRDB":	//CR/DB Note 화면호출        	
        	goInvoiceEntry("DC");        	
        break;
        case "GOAP":	//Account Payable 화면호출        	
        	goInvoiceEntry("AP");        	
        break;
        case "DEPOSIT":	//DEPOSIT 대상 화면호출
        	var sRow=sheetObj.GetSelectRow();
        	//OFVFOUR-7712 [PQC] [Invoice List] - The value "-1" is shown at Invoice No. field when users clicking on Deposit / Payment button on Invoice List screen without searching data
        	var inv_no=(escape(sheetObj.GetCellValue(sRow, "inv_no"))!='-1') ? (escape(sheetObj.GetCellValue(sRow, "inv_no"))) : '';
        	var s_cust_cd=(escape(sheetObj.GetCellValue(sRow, "trdp_cd"))!='-1') ? (escape(sheetObj.GetCellValue(sRow, "trdp_cd"))) : '';
        	var s_inv_tp=(escape(sheetObj.GetCellValue(sRow, "inv_tp"))!='-1') ? (escape(sheetObj.GetCellValue(sRow, "inv_tp"))) : '';
        	var paramStr="./ACC_JOR_0010.clt?f_cmd=-1&s_inv_no="+inv_no+"&s_cust_cd="+s_cust_cd+"&s_inv_tp="+s_inv_tp;
            parent.mkNewFrame('Customer Payment', paramStr);
        break;
        case "CHECK":	//CHECK 대상 화면호출
        	var sRow=sheetObj.GetSelectRow();
        	//VENDER INVOICE에  "#" 이 들어갈 경우 값이 잘리기때문에 치환한다.
        	var inv_no = "";
        	//OFVFOUR-7712 [PQC] [Invoice List] - The value "-1" is shown at Invoice No. field when users clicking on Deposit / Payment button on Invoice List screen without searching data
        	if (sheetObj.GetCellValue(sRow, "inv_tp") == "A/P"){
        		inv_no = (escape(sheetObj.GetCellValue(sRow, "vnd_inv_no"))!='-1') ? (escape(sheetObj.GetCellValue(sRow, "vnd_inv_no"))) : '';
        	} else {
        		inv_no = (escape(sheetObj.GetCellValue(sRow, "inv_no"))!='-1') ? (escape(sheetObj.GetCellValue(sRow, "inv_no"))) : '';
        	}
        	var s_cust_cd=(escape(sheetObj.GetCellValue(sRow, "trdp_cd"))!='-1') ? (escape(sheetObj.GetCellValue(sRow, "trdp_cd"))) : '';
        	var s_inv_tp=(escape(sheetObj.GetCellValue(sRow, "inv_tp"))!='-1') ? (escape(sheetObj.GetCellValue(sRow, "inv_tp"))) : '';
        	var paramStr="./ACC_JOR_0030.clt?f_cmd=-1&s_inv_no="+inv_no+"&s_cust_cd="+s_cust_cd+"&s_inv_tp="+s_inv_tp;
        	parent.mkNewFrame('Payment', paramStr);
        break;
        case "DEPOSIT_RT":	//DEPOSIT 생성된 화면호출
        	var sRow=sheetObj.GetSelectRow();
//        	#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
        	var paramStr="./ACC_JOR_0010.clt?f_cmd=-1&s_jnr_no="+escape(sheetObj.GetCellValue(sRow, "jnr_no"));
            parent.mkNewFrame('Customer Payment', paramStr);
        break;
        case "CHECK_RT":	//DEPOSIT 생성된 화면호출
        	var sRow=sheetObj.GetSelectRow();
//        	#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
        	var paramStr="./ACC_JOR_0030.clt?f_cmd=-1&s_jnr_no="+escape(sheetObj.GetCellValue(sRow, "jnr_no"));
            parent.mkNewFrame('Payment', paramStr);
        break;
        case "PRINT":
            var param = "";
        	if(formObj.f_inv_seq.value != ""){
				if(formObj.f_print_type.value == "A/R"){
					//WMS ACCOUNT LKH 2015.01.20
					if(formObj.f_oth_seq.value != ""){
						/*if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA" || formObj.f_bl_cnt_cd.value == "DE"){
		        			formObj.file_name.value = 'invoice_06.mrd';	  
		            	}else if(formObj.f_bl_cnt_cd.value == "IT"){
		            		formObj.file_name.value = 'invoice_09.mrd';
		            	}else if(formObj.f_bl_cnt_cd.value == "JP"){
		            		formObj.file_name.value = 'invoice_08_jp.mrd';
		            	}else{
		            		if(formObj.f_ref_ofc_cd.value == "SEL"){
		            			formObj.file_name.value = 'invoice_08_kr.mrd';
		            		}else{
		            			formObj.file_name.value = 'invoice_08.mrd';
		            		}
		            		
		            	}*/
						formObj.file_name.value = 'invoice_06.mrd';	  
					}else if( formObj.f_wms_seq.value != ""){
						//[Great Luck] Other Filling AR Invoice - WMS와 Other MRD 분리 처리
		        		formObj.file_name.value='invoice_06_WMS.mrd';
		        	}else{
						/*if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA" || formObj.f_bl_cnt_cd.value == "DE"){
							
		        			formObj.file_name.value = 'invoice_01.mrd';
							formObj.title.value = 'Local Invoice';
			        	}else if(formObj.f_bl_cnt_cd.value == "IT"){
							formObj.file_name.value = 'invoice_04.mrd';
							formObj.title.value = 'Local Invoice';
			        	}else if(formObj.f_bl_cnt_cd.value == "JP"){
							formObj.file_name.value = 'invoice_03_jp.mrd';
							formObj.title.value = 'Local Invoice';
			        	}else{
			        		if(formObj.f_ref_ofc_cd.value == "SEL"){
		            			formObj.file_name.value = 'invoice_03_kr.mrd';
		            		}else{
		            			formObj.file_name.value = 'invoice_03.mrd';
		            		}
							formObj.title.value = 'Local Invoice';
			        	}*/
						formObj.file_name.value = 'invoice_01.mrd';
						formObj.title.value = 'Local Invoice';
					}
					// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N -2
					if (formObj.chkMailAr.value === 'Y') {
						if (docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no") == '') {
							formObj.mailTitle.value = "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]";
						} else {
							formObj.mailTitle.value= "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]" + ' [HBL No: ' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no") + ']';
						}
					} else {
						formObj.mailTitle.value = "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]";
					}
					formObj.rpt_biz_tp.value = "ACCT";
					formObj.rpt_biz_sub_tp.value = "AR";
					
				}else if(formObj.f_print_type.value == "DB/CR"){
					
					if(formObj.f_oth_seq.value != ""){
		        		/*if(formObj.f_cnt_cd.value == "IT"){
		            		formObj.file_name.value = 'invoice_10.mrd';
		            	}
		        		else if(formObj.f_cnt_cd.value == "US" || formObj.f_cnt_cd.value == "CA" || formObj.f_cnt_cd.value == "DE"){
		            		formObj.file_name.value = 'invoice_07_us.mrd';	
		            	}
		        		else{
		            		formObj.file_name.value = 'invoice_07.mrd';
		            	}*/
						formObj.file_name.value = 'invoice_07_us.mrd';	
		        	}else{
						/*if(formObj.f_bl_cnt_cd.value == "IT"){
							formObj.file_name.value = 'invoice_05.mrd';
						}else if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA" || formObj.f_bl_cnt_cd.value == "DE"){
		        			formObj.file_name.value = 'invoice_02_us.mrd';
						}else{
							formObj.file_name.value = 'invoice_02.mrd';
						}*/
		        		formObj.file_name.value = 'invoice_02_us.mrd';
		        	}
					
					formObj.title.value = 'Debit/Credit Note';
					// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
					if (formObj.chkMailDc.value === 'Y') {
						if (docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no") == '') {
							formObj.mailTitle.value='Debit/Credit Note No : ' + formObj.f_inv_no.value;
						} else {
							formObj.mailTitle.value='Debit/Credit Note No : ' + formObj.f_inv_no.value + ' [HBL No: ' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no") + ']';
						}
					} else {
						formObj.mailTitle.value='Debit/Credit Note No : ' + formObj.f_inv_no.value;
					}
					formObj.rpt_biz_tp.value = "ACCT";
					formObj.rpt_biz_sub_tp.value = "DC";
					
				}else if(formObj.f_print_type.value == "A/P"){
 					
					formObj.file_name.value = 'invoice_13.mrd';
					formObj.title.value = 'PAYMENT REQUEST';
					// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
					if (formObj.chkMailAp.value === 'Y') {
						if (docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no") == '') {
							formObj.mailTitle.value = "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]";
						} else {
							formObj.mailTitle.value = "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]" + ' [HBL No: ' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no") + ']';
						}
					}
					else {
						formObj.mailTitle.value = "INVOICE [INVOICE No. " + formObj.f_inv_no.value + "]";
					}
					formObj.rpt_biz_tp.value = "ACCT";
					formObj.rpt_biz_sub_tp.value = "AP";
				}
				
				formObj.rpt_trdp_cd.value = formObj.f_trdp_cd.value;
				
				if(formObj.f_print_type.value == "A/P"){
    				//Parameter Setting
    	      		param = "[" + "'" + formObj.f_inv_seq.value + "'" + ']';		// [1]
    				param += '[' + formObj.f_trdp_cd.value + ']';					// Vendor [2]
    				param += '[' + formObj.f_ref_ofc_cd.value + ']';				// REF_OFC_CD [3]
    				param += '[' + formObj.f_bl_cnt_cd.value + ']';					// CNT_CD  [4]
    				param += '[' + formObj.f_usr_nm.value + ']';					// USER_NM [5]
    				param += '[' + formObj.f_email.value + ']';						// USER EMAIL [6]
    				param += '[' + formObj.f_usrPhn.value + ']';					// 7
    				param += '[' + formObj.f_usrFax.value + ']';					// 8
    				param += '[' + formObj.f_usr_nm.value + ']';						// 9
    				var sRow=sheetObj.GetSelectRow();
    				if (sRow < 0){
    					break;
    				}
    				param += '[' + sheetObj.GetCellValue(sRow, "hbl_no") + ']';
    			}else{
    				param  = '[' + formObj.f_email.value + ']';				// USER EMAIL';	[1]
					param += "[" + "'" + formObj.f_inv_seq.value + "'" + ']';			// [2]
					param += '[]';											// [3]
					param += '[]';											// [4]
					param += '[]';											// [5]
					param += '[]';											// [6]	
    				if(formObj.f_print_type.value == "DB/CR"){
    					param += '[' + formObj.f_trdp_cd.value + ']';				// TRDP_CD [7]
    					param += '[' + formObj.f_ref_ofc_cd.value + ']';			// OFC_CD  [8]
    				}else if(formObj.f_print_type.value == "A/R"){
//    					#1729 [BNX] 베트남 Local Statement/ Agent Statement - Header 명칭 변경
    					param += '[' + formObj.f_trdp_cd.value + ']';				// TRDP_CD [7]
    					param += '[' + formObj.f_ref_ofc_cd.value + ']';			// OFC_CD  [8]
    					param += '[' + formObj.f_bl_cnt_cd.value + ']';				// CNT_CD  [9]
    					param += '[' + formObj.f_usr_nm.value + ']';				// USER_NM [10]
    				}
    				

    				param += '[' + formObj.f_usrPhn.value + ']';				// 9,  11
    				param += '[' + formObj.f_usrFax.value + ']';				// 10, 12
    				param += '[' + formObj.f_usrId.value + ']';					// 11, 13
    				param += '[]';// param += '[' + formObj.main_trdp.value + ']';				// 12, 14
    				if(formObj.f_print_type.value == "DB/CR"){
	    				param += '[' + formObj.f_ofc_eng_nm.value + ']';		//13  cr_db
    					param += '[]';
    					param += '[]';
    				}
    				//#3375 [JTC]Invoice, Local Statement Form 개발 (S)
    				else if(formObj.f_print_type.value == "A/R") {
						param += '[]';					//15   -> Local Statement Report 에서 연계되는 Report 의 parameter 개수가 15개이므로...
						//#4193 [JAPT] Invoice print option on AR ENtry screen. - #3375 참고 
    					param += '[]';					//16
    				}
    				
    				var locUrl = location.href;
    				var strArr = locUrl.split('/');
    				locUrl = 'http://'+strArr[2];
    				param += '[' + locUrl + ']';		//16  URL   => 17 번째는 팝업화면에서 선택..
    				//#3375 [JTC]Invoice, Local Statement Form 개발 (E)
    				
    			}
				
				formObj.rpt_pdf_file_nm.value=getPdfFileNm();
    			formObj.rd_param.value = param;
    			//OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails
    			if(rpt_file_name_flg){
    				formObj.attachFileName.value = getPdfFileNm();
    			}
    			
				//#3375 [JTC]Invoice, Local Statement Form 개발 (S)
    			// OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List
				if(formObj.f_print_type.value == "A/R" && AR_INVOICE_OPTION_USE[0] == "Y") {
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
					//#6301 [JAPT] Mail sending function related request
					sUrl += "&bkg_no=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lnr_bkg_no");
					sUrl += "&ves=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trnk_vsl_nm");
					sUrl += "&voy=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trnk_voy");
					var etd_dt_tm = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "etd_dt_tm");
					if(etd_dt_tm != ""){
						etd_dt_tm = etd_dt_tm.substring(0,4) + "." + etd_dt_tm.substring(4,6) + "." + etd_dt_tm.substring(6,8);
					}
					sUrl += "&etd=" + etd_dt_tm;
					sUrl += "&hbl_no=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no");
					// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
					sUrl += "&chkMailAr=" + formObj.chkMailAr.value;
					//OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails
					sUrl += "&attachFileName=" + formObj.attachFileName.value;
					sUrl += "&rpt_file_name_flg=" + (rpt_file_name_flg? "Y" : "N");
					// OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List
					if(AR_INVOICE_OPTION_USE[1] == "M"){
						sUrl += "&ar_invoice_option_use=M";
					}
					
					modal_center_open(sUrl, "callBackFunc", 380, 150, "yes");
				} else {
					popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
        	}else {
        		//Please select the row to print.
        		alert(getLabel('FMS_COM_ALT004'));
        		
        		return;
        	}
        break;
        case "BATCHPRINT":
    		var inv_seq=formObj.f_inv_seq.value;
//    		#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
    		var inv_no=escape(formObj.f_inv_no.value);
			var print_type=formObj.f_print_type.value;
			var bl_cnt_cd=formObj.f_bl_cnt_cd.value;
			var ref_ofc_cd=formObj.f_ref_ofc_cd.value;
			var oth_seq=formObj.f_oth_seq.value;
			var trdp_cd=formObj.f_trdp_cd.value;
			var reqParam='?f_inv_no='+ inv_no+'&f_print_type=' + print_type + '&f_inv_seq=' + inv_seq + '&f_bl_cnt_cd=' + bl_cnt_cd + '&f_ref_ofc_cd=' + ref_ofc_cd+ '&f_oth_seq=' + oth_seq + '&f_trdp_cd='+ trdp_cd;
			popGET('ACC_INV_0051.clt'+reqParam, '', 550, 260, "scroll:yes;status:no;help:no;");
			
        break;
        case "HISTORY":
        	var sRow=sheetObj.GetSelectRow();
			if (sRow < 0){
				break;
			}
	   		rtnary=new Array(1);
//	   		#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
	   		rtnary[0]=escape(sheetObj.GetCellValue(sRow, "inv_seq"));
	   		callBackFunc = "HISTORY";
	        modal_center_open('./ACC_INV_0100.clt', rtnary, 862,457,"yes");
     	break;
        case "EXCEL":
        	if(sheetObj.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
    		}
        break;
        case "EXCEL_ALL":
        	excelDown(sheetObj);
        break;
        case "INV_HIS":
			var sRow=sheetObj.GetSelectRow();
			if (sRow < 0){
				break;
			}
			var reqParam='?inv_seq=' + sheetObj.GetCellValue(sRow, "inv_seq");
			reqParam += '&inv_tp=' + sheetObj.GetCellValue(sRow, "inv_tp");
        	popGET('ACC_INV_0110.clt'+reqParam, '', 1110, 630, "scroll:yes;status:no;help:no;");
        break;
        case 'SLIP':
        	if(G_GL_DATA_CREATE_STATUS == "END"){
        		G_GL_DATA_CREATE_STATUS ="START";
        		setGlDataCreate('');
        	} 
        	return;
        break;
        case "GL_CREATE_END_ACTION":
        	var sRow=sheetObj.GetSelectRow();
        	formObj.title.value='Accounting Slip';
        	var inv_seq=sheetObj.GetCellValue(sRow, "inv_seq");
    		var source=sheetObj.GetCellValue(sRow, "inv_tp");
    		var srcNo=sheetObj.GetCellValue(sRow, "inv_no");
    		var refNo=sheetObj.GetCellValue(sRow, "ref_no");
    		var blNo=sheetObj.GetCellValue(sRow, "hbl_no");
    		
    		//#964 [SHINE] Account Slip 기능 보완 - 전체 Accounting 기능
    		var slip_no		= sheetObj.GetCellValue(sRow, "slip_no");
    		var bloked_by	= sheetObj.GetCellValue(sRow, "bloked_by");
    		var issued_by	= sheetObj.GetCellValue(sRow, "issued_by");
    		var block_dt	= sheetObj.GetCellValue(sRow, "block_dt");
    		
    		//#1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form]
    		var vchr_no = sheetObj.GetCellValue(sRow, "vchr_no");
    		var vchr_tp_nm = sheetObj.GetCellValue(sRow, "vchr_tp_nm");
    		
        	if(source == "A/R"){
        		source="Local Invoice";
        		//formObj.file_name.value = 'account_slip_01.mrd';
        	}else if(source == "DB/CR"){
        		source="D/C";
        		//formObj.file_name.value = 'account_slip_02.mrd';
        	}else if(source == "A/P"){
        		source="Account Payable";
        		//formObj.file_name.value = 'account_slip_03.mrd';
        	}
        	//LHK 20140219 01로 통합
    		formObj.file_name.value='account_slip_01.mrd';
			//Parameter Setting
        	var param="[" + "'" + inv_seq + "'" + ']';				// [1]
			param += '[' + source + ']';								// [2]
			param += '[' + srcNo + ']';									// [3]
			param += '[' + refNo + ']';									// [4]
			param += '[' + blNo + ']';									// [5]
			param += '[' + formObj.ofc_nm.value + ']';					// [6]
			param += '[' + formObj.user_id.value + ']';					// [7]
			param += '[' + formObj.ofc_cd.value + ']';					// [8]
			param += '[' + formatDate(new Date(), 'MM-dd-yyyy') + ']';	// [9]
			//#964 [SHINE] Account Slip 기능 보완 - 전체 Accounting 기능
			param += '[' + slip_no + ']';					// [10]
			param += '[' + bloked_by + ']';					// [11]
			param += '[' + issued_by + ']';					// [12]
			param += '[' + block_dt + ']';					// [13]
			//#1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form]
			param += '[' + vchr_no + ']';					// [14]
			param += '[' + vchr_tp_nm + ']';				// [15]
			
			formObj.rd_param.value=param;
			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
		/* #22118 : [BINEX]AR/AP List 에 Profit Report 버튼 추가 jsjang 2013.11.6 */
		case "PROFIT_REPORT":
	   	 	if(sheetObj.RowCount()== 0){
	   	 		//There is no data
				alert(getLabel('FMS_COM_ALT004'));	
			}else{ 
				var sRow=sheetObj.GetSelectRow();
				//WMS ACCOUNT LKH 2015.01.20
				if(sheetObj.GetCellValue(sRow, "oth_ref_no") != "" || sheetObj.GetCellValue(sRow, "wms_ref_no") != "")
				{
					var reqParam='';
					if(sheetObj.GetCellValue(sRow, "oth_ref_no") != "")
					{
						reqParam='?oth_seq=' + sheetObj.GetCellValue(sRow, "oth_seq");
						reqParam += '&ref_no=' + sheetObj.GetCellValue(sRow, "oth_ref_no");
						reqParam += '&air_sea_clss_cd=' + "O";
						reqParam += '&bnd_clss_cd=' + "N";
						reqParam += '&biz_clss_cd=' + "";
					}else{
						reqParam='?oth_seq=' + sheetObj.GetCellValue(sRow, "wms_seq");
						reqParam += '&ref_no=' + sheetObj.GetCellValue(sRow, "wms_ref_no");
						reqParam += '&air_sea_clss_cd=' + "W";
						reqParam += '&bnd_clss_cd=' + "N";
						reqParam += '&biz_clss_cd=' + "";
					}
					//alert(reqParam);
					popGET('RPT_PRN_0210.clt'+reqParam, '', 630, 400, "scroll:yes;status:no;help:no;");
				}else{
					var reqParam='?intg_bl_seq=' + sheetObj.GetCellValue(sRow, "m_intg_bl_seq");
					reqParam += '&mbl_no=' + sheetObj.GetCellValue(sRow, "mbl_no");
					reqParam += '&ref_no=' + sheetObj.GetCellValue(sRow, "ref_no");
					reqParam += '&air_sea_clss_cd=' + sheetObj.GetCellValue(sRow, "air_sea_clss_cd");
					reqParam += '&bnd_clss_cd=' + sheetObj.GetCellValue(sRow, "bnd_clss_cd");
					reqParam += '&biz_clss_cd=' + "M";
					//alert(reqParam);
					popGET('RPT_PRN_0180.clt'+reqParam, '', 1270, 760, "scroll:yes;status:no;help:no;");					
				}
			}
   	 	break;		
		case 'TOXML':
			xmlDown(sheetObj);
        break;
        //C.W Park
        //#52971 Log버튼 생성
   	 	case "LOG":
   	 		if(sheetObj.GetTotalRows()== 0){
	   	 		//There is no data
	   	 		alert(getLabel('FMS_COM_ALT004'));
			}else{
				   //#933
	//   	 		if(sheetObj.GetCellValue(sheetObj.GetSelectRow(), "mbl_no") == '' && sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ref_no") == '' && sheetObj.GetCellValue(sheetObj.GetSelectRow(), "oth_ref_no") == '')
	//   	 		{
	   	 			//alert(getLabel('FMS_COM_ALT004'));
	//   	 		}else{		   	 		
	   	 			var sRow=sheetObj.GetSelectRow();
	   	 			var p_mbl_no =sheetObj.GetCellValue(sheetObj.GetSelectRow(), "mbl_no"); 
	   	 		    var p_inv_no =sheetObj.GetCellValue(sheetObj.GetSelectRow(), "inv_no");
	   	 			//C.W Park.
	   	 			//Inv_seq param만 셋팅.
	   	 			var reqParam='?s_bl_inv=';// + sheetObj.GetCellValue(sRow, "mbl_no");
					reqParam += '&f_his_type=' + "";
					reqParam += '&f_cmd=' + "11";
					reqParam += '&p_gb=' + "POP";
					reqParam += '&inv_seq=' + sheetObj.GetCellValue(sRow, "inv_seq");
					reqParam += '&inv_no=' +  sheetObj.GetCellValue(sRow, "inv_no");					
					popGET('MGT_HIS_0041.clt'+reqParam, '', 1240, 670, "scroll:yes;status:no;help:no;");
	   	 		//}
			}
   	 	break;	
   	 	case "PRINT_BLOCK":
   	 		if(formObj.f_inv_seq.value != ""){
   	 			printBlockRow = sheetObj.GetSelectRow();
   	 			ajaxSendPost(getInvBlockCheck, 'reqVal', '&goWhere=aj&bcKey=getInvBlockCheck&inv_seq='+sheetObj.GetCellValue(printBlockRow, "inv_seq"), './GateServlet.gsl'); 
   	 		}
   	 	break;
    }
    
	//Log Monitor Start:Btn
	if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
	//Log Monitor End:Btn
	
}

function excelDown(mySheet){
	var formObj = document.frm1;
	formObj.f_cmd.value = COMMAND10;
	
	formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
    formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
    
    formObj.f_inv_seq.value="";
    formObj.f_oth_seq.value="";
    formObj.f_trdp_cd.value="";
	
	var formParam = FormQueryString(formObj);
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,Merge:1
					,URL:"./ACC_INV_0040.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};	
	mySheet.DirectDown2Excel(param);
}

function xmlDown(mySheet){
	var formObj=document.frm1;
	var chk_cnt=0;
	var ref_ofc_cd="";
	var intg_bl_seq="";
	var inv_seq="";
	var inv_no="";
	
   for(var i=2; i<=mySheet.LastRow();i++){
	   	if(mySheet.GetCellValue(i ,"check_flag") == "1"){
		   chk_cnt += 1;
		   ref_ofc_cd = mySheet.GetCellValue(i, "ref_ofc_cd");
		   intg_bl_seq = mySheet.GetCellValue(i, "intg_bl_seq");
		   inv_seq = mySheet.GetCellValue(i, "inv_seq");
		   inv_no = mySheet.GetCellValue(i, "inv_no");
	   }
   }
   
   
   if(chk_cnt == 0){
	   // No Save Data!!
	   alert(getLabel('FMS_COM_ALT007'));
	   return;
   }else{
//	   #549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
	   param = "f_cmd=-1&ref_ofc_cd="+ ref_ofc_cd+"&intg_bl_seq="+intg_bl_seq+"&inv_seq="+inv_seq+"&inv_no="+escape(inv_no);
	   $.ajax({
			   type: "POST",
			   url: "./ACC_INV_0120.clt",
			   dataType: 'xml',
			   data: param,
			   success: function(data){
				   setFieldValue( formObj.x_ref_ofc_cd, ref_ofc_cd);
				   setFieldValue( formObj.x_intg_bl_seq, intg_bl_seq);
				   setFieldValue( formObj.x_inv_seq, inv_seq);
				   setFieldValue( formObj.x_inv_no, inv_no);
			   },
			   error: function(){
				   alert('error');
			   }
	   });
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
    
    setCondition("R", formObj.f_date_type, formObj.f_strdt, formObj.f_enddt);
    //OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails
    var opt_key = "EXTENT_RPT_FILE_NAME_FLG";
	ajaxSendPost(setFileNameflag, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
    var opt_key = "TAX_COL";
	ajaxSendPost(setAccInvVATCdReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
	var opt_key = "WHLD_TAX_COL";
	ajaxSendPost(setAccInvWHDCdReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#3375 [JTC]Invoice, Local Statement Form 개발
	opt_key = "AR_INVOICE_OPTION_USE";
	ajaxSendPost(setArInvoiceOptionUseReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//	개인정보 관리화면 정렬순서 2016.03 
	ajaxSendPost(setOrderByInfo, 'reqVal','&goWhere=aj&bcKey=searchTbUserOrderbyInfoAttr&pgm_usr_id='+formObj.user_id.value+'&pgm_url=./ACC_INV_0040.clt',	'./GateServlet.gsl');	
    
	// OFVFOUR-8099 [BEST OCEAN] REMOVING PRINT BUTTON WHEN THERE IS PRINT/L IN THE SAME SCREEN
    var opt_key = "VISIBLE_PRINT_BUTTON";
	ajaxSendPost(setVisiblePrintButton, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.s_ofc_cd);
	
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//사용자가 저장한 Header 정보를 읽어온다.
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
	var formObj=document.frm1;
	//오늘일자구하기
	var now=new Date(); 	
	var nxtDt=new Date(Date.parse(now) + 30 * 1000 * 60 * 60 * 24);
	var preDt=new Date(Date.parse(now) - 30 * 1000 * 60 * 60 * 24);
	var nxtyear=nxtDt.getFullYear(); 			
	var nxtmonth=nxtDt.getMonth() + 1;
	var nxtdate=nxtDt.getDate(); 	
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	var predate=preDt.getDate();
	if(nxtmonth < 10){
		nxtmonth="0"+(nxtmonth);
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	if(nxtdate < 10){
		nxtdate="0"+nxtdate;
	}
	if(predate < 10){
		predate="0"+predate;
	}
	PREDATE=premonth + "-" + predate + "-" + preyear;
	NXTDATE=nxtmonth + "-" + nxtdate + "-" + nxtyear;
	//ENDDATE  = getEndDate(TODAY);
	//PREDATE = subDay(TODAY, 30);
	//NXTDATE = addDay(TODAY, 30);
	//formObj.f_strdt.value = PREDATE;
	//formObj.f_enddt.value = NXTDATE;
	
	//setFromToDtEndPlus(formObj.s_due_strdt, 90, formObj.s_due_enddt, 60);
	
	//2011.12.28
//	formObj.f_mhbl_no.value=p_hbl_no;
	// 24842 bl List에서 오는 mbl값을 form에 설정하지 않고 hidden으로 처리
	//formObj.s_mbl_no.value=p_mbl_no;
	formObj.s_intg_bl_seq.value=p_intg_bl_seq;
	if("" != p_ref_no){
		formObj.f_ref_no.value=p_ref_no;
	}else if("" != p_oth_ref_no){
		formObj.f_ref_no.value=p_oth_ref_no;
	}else if("" != p_wms_ref_no){
		formObj.f_ref_no.value=p_wms_ref_no;
	}
	
	formObj.s_oth_seq.value=p_oth_seq;
	
	//WMS ACCOUNT LKH 2015.01.20
	formObj.s_wms_seq.value=p_wms_seq;

	formObj.s_no_chk.value=p_no_chk;
	
	//#1826 [BINEX V4421] CANNOT SEARCH INVOICE WITH 1) POST DATE 2) AMOUNT INPUTTED
//	if( (formObj.s_intg_bl_seq.value == null || formObj.s_intg_bl_seq.value == "") && (formObj.s_wms_seq.value == null || formObj.s_wms_seq.value == "")){
//		setRangeDate();
//	}
	
	if (!((p_intg_bl_seq == null || p_intg_bl_seq == "") && (p_oth_seq == null || p_oth_seq == "") && (p_wms_seq == null || p_wms_seq == ""))) {
		FIRST_SEARCH_YN = "Y";
	}
	// 박철우 오류 수정
	if("" != formObj.linkFlag.value){
		initDatLod = formObj.linkFlag.value;
	}
	
	if("" != formObj.blType.value){
		formObj.f_bl_type.value = formObj.blType.value;
	}

	if("" != formObj.refType.value){
		formObj.f_ref_no_type.value = formObj.refType.value;
	}
}

function RestoreGrid(){
	var formObj=document.frm1;
	
    if(formObj.s_intg_bl_seq.value != "" || formObj.s_oth_seq.value != "" || formObj.s_wms_seq.value != ""){
    	//날짜를 없앤다.
    	//#25716 [SUNWAY]B/L List & Entry 에서 Accounting 버튼을 통해 AR/AP List 로 이동하는 경우 Period 문제
    	doWork("SEARCHLIST");
    }else{
    	//doWork("SEARCHLIST01");
    	doWork("SEARCHLIST0");
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
         case 1:      //IBSheet1 init
        	    with(sheetObj){
			           	var cnt=0;
			
			           	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0, FrozenCol:8 } );
			           	var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
			           	var headers = [ { Text:getLabel('ACC_INV_0040_HDR1'), Align:"Center"},
			  		                    { Text :getLabel('ACC_INV_0040_HDR2')} ];
			           	InitHeaders(headers, info);
			           	//WMS ACCOUNT LKH 2015.01.20
			           	var cols = [ {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"magam_flag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			           	             {Type:"Radio",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"check_flag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			           	             {Type:"Text",      Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			           	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 , EditLen:10 },
							         {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 , EditLen:10 },
			           	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			           	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			           	             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			           	          {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"biz_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			           	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
			            
			           	cols.push({Type:"Float",     Hidden:ACC_VAT_VAL,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"duty_tax_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			           	cols.push({Type:"Float",     Hidden:ACC_VAT_VAL,  Width:125,   Align:"Right",   ColMerge:1,   SaveName:"non_taxable_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			           	cols.push({Type:"Float",     Hidden:ACC_VAT_VAL,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"taxable_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			           	
			           	cols.push({Type:"Float",     Hidden:ACC_VAT_VAL,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"vat_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			           	cols.push({Type:"Float",     Hidden:ACC_WHD_VAL,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"whd_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });	
			           	
			          	cols.push({Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			            cols.push({Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"pay_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	                	cols.push({Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"last_pay_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 });

	                	// #1820 [PATENT] Invoice List - Tax Invoice No. Tax Bill, Financial Office 항목 추가 
	                	cols.push({Type:"Text",      Hidden:0, Width:80,    Align:"Center",  ColMerge:0,   SaveName:"last_chk_no",       KeyField:0,   CalcLogic:"",   Format:"",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	                	
	                	//#2951 [YMI, BNX, CLA] AFTER V450, TAX INVOICE # ON AR/AP LIST
	                	cols.push({Type:"Text",      Hidden:ACC_VAT_VAL, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"tax_no",    		 KeyField:0,   CalcLogic:"",   Format:"",       PointCount:2,   UpdateEdit:1,   InsertEdit:0, EditLen:10 });
	                	cols.push({Type:"CheckBox",  Hidden:1/*#3181*/, Width:50,    Align:"Center",  ColMerge:0,   SaveName:"tax_bill",       	 KeyField:0,   CalcLogic:"",   Format:"",       PointCount:2,   UpdateEdit:1,   InsertEdit:0 });
	                	cols.push({Type:"Text",      Hidden:ACC_VAT_VAL, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"org_tax_no",    	 KeyField:0,   CalcLogic:"",   Format:"",       PointCount:2,   UpdateEdit:1,   InsertEdit:0, EditLen:10 });
	                	cols.push({Type:"CheckBox",  Hidden:1/*#3181*/, Width:50,    Align:"Center",  ColMerge:0,   SaveName:"org_tax_bill",      KeyField:0,   CalcLogic:"",   Format:"",       PointCount:2,   UpdateEdit:1,   InsertEdit:0 });
	                	cols.push({Type:"Text",      Hidden:ACC_VAT_VAL, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"finc_ofc_cd",       KeyField:0,   CalcLogic:"",   Format:"",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	                	
	                	cols.push({Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"bal_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
               			cols.push({Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
               			//OFVFOUR-8038: [BNX-TOR] Adding Rlsd.Date column into AR/AP list
               			cols.push({Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"rlsd_dt_tm",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
               			cols.push({Type:"Int",       Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"over_due",          KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
               			cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
           				cols.push({Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"ref_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
           				cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"oth_ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 }); 
			           	  
			           	if(wmsUseFlag == 'Y'){
			           	  cols.push({Type:"Text",      Hidden:1,  Width:120,  Align:"Left",  ColMerge:1,   SaveName:"wms_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			              cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Left",  ColMerge:1,   SaveName:"wms_ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			            } else {
			              cols.push({Type:"Text",      Hidden:1,  Width:120,  Align:"Left",  ColMerge:1,   SaveName:"wms_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			              cols.push({Type:"Text",      Hidden:1,  Width:120,  Align:"Left",  ColMerge:1,   SaveName:"wms_ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
			            }
			              			                  
		                cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"imp_ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"cust_ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"vnd_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
          	            //<!-- #874 [STARWAY] SHIP TO COLUMN ADD ON AR/AP LIST SCREEN -->
		                cols.push({Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"ship_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });		                
		                cols.push({Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"inv_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"pol_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"etd_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"pod_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eta_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"rgst_usr_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Date",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"modi_usr_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Date",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"inv_modi_tms",      KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"shrt_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
		                
		                //<%-- #5408 [JTC] Invoice List 에 Local Amount 컬럼 추가 --%>
		                cols.push({Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"locl_ttl_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                //*#5395 [Star Cluster Mexico] Voucher Type & Voucher No. Column add to Invoice List*/
		                cols.push({Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"vchr_tp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"vchr_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
		                //OFVFOUR-8196: [BNX] Adding Bank Date Column in AR/AP list
		                cols.push({Type:"Text",      Hidden:0,  Width:80,  Align:"Center",    ColMerge:1,   SaveName:"clr_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
		                
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"bl_cnt_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ref_ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cmb_inv_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
						//OFVFOUR-6122 [Star-Mex] OPUS Invoice List - Invoice Amount Total by Currency
						cols.push({Type:"Text",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"duty_tax_tot_amt",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"non_taxable_tot_amt",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"taxable_tot_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"vat_tot_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"whd_tot_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"profit_gubun",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"pay_tot_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"bal_tot_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                //#5408 [JTC] Invoice List 에 Local Amount 컬럼 추가
		                cols.push({Type:"Text",   Hidden:1, Width:95,   Align:"Right",   ColMerge:1,   SaveName:"locl_ttl_tot_amt",  KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"m_intg_bl_seq" });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bnd_clss_cd" });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"air_sea_clss_cd" });   
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trx_modi_tms" });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"slip_no" });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bloked_by" });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"issued_by" });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"block_dt" });
		                //*#5395 [Star Cluster Mexico] Voucher Type & Voucher No. Column add to Invoice List*/
		                // #1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form]
		                //cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vchr_no" });
		                //cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vchr_tp_nm" });
		                // #2012 [BNX] INDIA AP INVOICE 채번 기능		                
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"o_inv_no" });
		               //#6301 [JAPT] Mail sending function related request
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_bkg_no" });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trnk_vsl_nm" });
		                cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trnk_voy" });
						
		                //OFVFOUR-6122 [Star-Mex] OPUS Invoice List - Invoice Amount Total by Currency (S)
		                cols.push({Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"tot_cnt" });
		                cols.push({Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"subsum_add_tot_cnt" });
		                cols.push({Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rownum" });
						//OFVFOUR-6122 [Star-Mex] OPUS Invoice List - Invoice Amount Total by Currency (E)
						
		                InitColumns(cols);
		                SetShowButtonImage(0);
		                SetEditable(1);
			            /* #27785 [AIF] Add "TP Code" and "Alias" Columns to the AR/AP List Screen */
		                /* #22118 */
		                /* account bl block_flag (#21736) */
		                //InitViewFormat(0, "post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		                //InitViewFormat(0, "inv_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		                //InitViewFormat(0, "last_pay_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		                //InitViewFormat(0, "etd_dt_tm", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		                //InitViewFormat(0, "eta_dt_tm", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		                SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
//			           	SetAutoRowHeight(0);
		                SetSheetHeight(450);
		                
		                SetHeaderRowHeight(20);
	    		        SetHeaderRowHeight(20);
	    		        
		                resizeSheet();
		                //	ShowSubSum([{StdCol:"profit_gubun", SumCols:"profit_amt|pay_tot_amt|bal_tot_amt", Sort:false, ShowCumulate:false, CaptionCol:6, CaptionText:"TOTAL"}]);

	           }

                                              
           break;
           
           <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
	       case 2:      //IBSheet1 init
	      	   initMemo(sheetObj);                                              
	       break;
	       <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
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
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
} 
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	//OFVFOUR-6122 [Star-Mex] OPUS Invoice List - Invoice Amount Total by Currency
	//sheet1.SetSumValue("inv_aply_curr_cd", "TOTAL");
	var formObj=document.frm1;
		
	//OFVFOUR-6122 [Star-Mex] OPUS Invoice List - Invoice Amount Total by Currency 
	sheetObj.RenderSheet(0);
	sheetObj.ShowFooterRow([]);

	var addShowFooterRow = "";
	var commma = ",";
	var lengthRow = Number(sheetObj.GetCellValue(sheetObj.HeaderRows(), "subsum_add_tot_cnt")) + sheetObj.HeaderRows();
	var arrDeleteRow = new Array;

	//sheetObj.HeadCheck(0, "check_flag") = false;
	doDispPaging(sheetObj.GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	//OFVFOUR-6122 [Star-Mex] OPUS Invoice List - Invoice Amount Total by Currency
	for(var i=sheetObj.HeaderRows(); i<=lengthRow;i++){
		// #23823 over_due가 )보다 작으면 0으로 변경 
		if (sheetObj.GetCellValue(i, "over_due") < 0) {
			sheetObj.SetCellValue(i, "over_due",0,0);
		}
		/*
		sheetObj.SetCellEditable(i, "inv_tp",0);
		sheetObj.SetCellEditable(i, "inv_no",0);
		sheetObj.SetCellEditable(i, "trdp_nm",0);
		sheetObj.SetCellEditable(i, "inv_sum_amt",0);
		sheetObj.SetCellEditable(i, "pay_amt",0);
		sheetObj.SetCellEditable(i, "last_pay_dt",0);
		sheetObj.SetCellEditable(i, "bal_amt",0);
		sheetObj.SetCellEditable(i, "over_due",0);
		sheetObj.SetCellEditable(i, "hbl_no",0);
		sheetObj.SetCellEditable(i, "mbl_no",0);
		sheetObj.SetCellEditable(i, "ref_no",0);
		sheetObj.SetCellEditable(i, "vnd_inv_no",0);
		sheetObj.SetCellEditable(i, "ofc_cd",0);
		sheetObj.SetCellEditable(i, "inv_aply_curr_cd",0);
		sheetObj.SetCellEditable(i, "rgst_usrid",0);
		sheetObj.SetCellEditable(i, "check_flag",1);
		sheetObj.SetCellEditable(i, "post_dt",1);
		*/
		//sheetObj.RowBackColor(i) = "#EFEBEF";
		//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
		if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(i, "pay_amt")) > 0 || sheetObj.GetCellValue(i, "cmb_inv_seq") == "Y"){
			sheetObj.SetCellEditable(i, "post_dt",0);
			sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
				sheetObj.SetCellValue(i, "magam_flag","Y");
				sheetObj.SetCellFontColor(i, "magam_flag","#FF0000");
			}
		}else{
			sheetObj.SetCellEditable(i, "post_dt",1);
			// TOTAL영역도 흰색으로 변함
//			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
		}
		/* 요구사항 #20626 : [BINEX]Accounting → B/L jsjang 2013.9.16 */
		//WMS ACCOUNT LKH 2015.01.20
		if(sheetObj.GetCellValue(i, "hbl_no") != "" || sheetObj.GetCellValue(i, "mbl_no") != "" || sheetObj.GetCellValue(i, "oth_ref_no") != "" || sheetObj.GetCellValue(i, "hbl_no") != "" || sheetObj.GetCellValue(i, "wms_ref_no") != ""){
			if(sheetObj.GetCellValue(i, "hbl_no") != ""){
				sheetObj.SetCellFontColor(i,'hbl_no',"#0000FF");
			}
			if(sheetObj.GetCellValue(i, "mbl_no") != ""){
				sheetObj.SetCellFontColor(i,'mbl_no',"#0000FF");
			}
			if(sheetObj.GetCellValue(i, "oth_ref_no") != ""){
				sheetObj.SetCellFontColor(i,'oth_ref_no',"#0000FF");
			}
			if(sheetObj.GetCellValue(i, "ref_no") != ""){
				sheetObj.SetCellFontColor(i,'ref_no',"#0000FF");
			}
			//WMS ACCOUNT LKH 2015.01.20
			if(sheetObj.GetCellValue(i, "wms_ref_no") != ""){
				// WMS 고도화
			 	if(formObj.wmsUseVer.value == "VER3.0") {
					sheetObj.SetCellFontColor(i,'wms_ref_no',"#0000FF");
				}
			}
		}
		
		/* #1820 [PATENT] Invoice List - Tax Invoice No. Tax Bill, Financial Office 항목 추가 */
		// A/R인 경우만 Tax No, Tax Bill 수정 가능
		/* #6307 Start */
//		if(sheetObj.GetCellValue(i, "inv_tp") == "A/P"){
//			sheetObj.SetCellEditable(i, "tax_no",0);
//			sheetObj.SetCellEditable(i, "tax_bill",0);
//			sheetObj.SetCellBackColor(i, "tax_no","#EFEBEF");
//			sheetObj.SetCellBackColor(i, "tax_bill","#EFEBEF");
//		}else{
//			sheetObj.SetCellEditable(i, "tax_no",1);
//			sheetObj.SetCellEditable(i, "tax_bill",1);
//		}
		/* #6307 End */
		// #4954 저장시 수정한 row가 아닌데 저장이 일어남:
		sheetObj.SetCellValue(i, "ibflag","R");
		//OFVFOUR-6122 [Star-Mex] OPUS Invoice List - Invoice Amount Total by Currency
		if (sheetObj.GetCellValue(i, 'rownum') == "") {
			if (i == lengthRow-1) {
				commma = "";
			}
			addShowFooterRow = addShowFooterRow 
				+ '{inv_aply_curr_cd:"' + sheetObj.GetCellValue(i, "inv_aply_curr_cd") 
				+ '", duty_tax_amt:"' + doMoneyFmt2(Number(sheetObj.GetCellValue(i, "duty_tax_tot_amt")), 2) 
				+ '", non_taxable_amt:"' + doMoneyFmt2(Number(sheetObj.GetCellValue(i, "non_taxable_tot_amt")), 2)  
				+ '", taxable_amt:"' + doMoneyFmt2(Number(sheetObj.GetCellValue(i, "taxable_tot_amt")), 2)  
				+ '", vat_amt:"' + doMoneyFmt2(Number(sheetObj.GetCellValue(i, "vat_tot_amt")), 2)  
				+ '", whd_amt:"' + doMoneyFmt2(Number(sheetObj.GetCellValue(i, "whd_tot_amt")), 2)  
				+ '", inv_sum_amt:"' + doMoneyFmt2(Number(sheetObj.GetCellValue(i, "profit_amt")), 2)  
				+ '", pay_amt:"' + doMoneyFmt2(Number(sheetObj.GetCellValue(i, "pay_tot_amt")), 2)  
				+ '", bal_amt:"' + doMoneyFmt2(Number(sheetObj.GetCellValue(i, "bal_tot_amt")), 2)
				+ '", locl_ttl_amt:"' + doMoneyFmt2(Number(sheetObj.GetCellValue(i, "locl_ttl_tot_amt")), 2)
				+ '"}' + commma; 
			arrDeleteRow.push(i);
			
			sheetObj.SetRangeFontBold(i, "inv_aply_curr_cd", i, "inv_aply_curr_cd",1);
		    sheetObj.SetRangeFontBold(i, "duty_tax_tot_amt",i, "duty_tax_tot_amt",1);
		    sheetObj.SetRangeFontBold(i, "non_taxable_tot_amt",i, "non_taxable_tot_amt",1);
		    sheetObj.SetRangeFontBold(i, "taxable_tot_amt",i, "taxable_tot_amt",1);
		    sheetObj.SetRangeFontBold(i, "vat_tot_amt",i, "vat_tot_amt",1);
		    sheetObj.SetRangeFontBold(i, "whd_tot_amt",i, "whd_tot_amt",1);
		    sheetObj.SetRangeFontBold(i, "inv_sum_amt",i, "inv_sum_amt",1);
		    sheetObj.SetRangeFontBold(i, "pay_amt",i, "pay_amt",1);
		    sheetObj.SetRangeFontBold(i, "bal_amt", i, "bal_amt",1);
		    sheetObj.SetRangeFontBold(i, "locl_ttl_amt", i, "locl_ttl_amt",1);
		}
		
	}

	
	
	for ( var j = arrDeleteRow.length - 1; j >= 0; j--) {
		sheetObj.RowDelete(arrDeleteRow[j], false);
	}
	
	var footerRows = eval(" [" + addShowFooterRow + "]" );
	if ( footerRows.length > 4 ){
		sheetObj.SetSheetHeight(450 + ( footerRows.length - 4 ) * 26 );
	}else{
		sheetObj.SetSheetHeight(450);
	}

	addShowFooterRow = "sheetObj.ShowFooterRow([" + addShowFooterRow + "])";
	eval(addShowFooterRow);

	formObj.s_amt_fr.value=doMoneyFmt(formObj.s_amt_fr.value);
	formObj.s_amt_to.value=doMoneyFmt(formObj.s_amt_to.value);
	//LHK 20130811 Profit Total 금액 표기
//no support[implemented common]CLT 	sheetObj.MessageText ("SubSum")="TOTAL"; 
	var sRow=sheetObj.FindSumRow();
	
    //가져온 행을 배열로 반든다.
    //var arrRow=sRow.split("|");
    if(sRow != -1){
//		sheetObj.SetCellValue(sRow, "inv_sum_amt",roundXL2(Number(sheetObj.GetCellValue(sRow, "profit_amt")), 2));
    	//GetCellValue를 GetCellText로 수정 pointCount를 그대로 가져오기 위해
    	sheetObj.SetCellValue(sRow, "duty_tax_amt",sheetObj.GetCellText(sRow, "duty_tax_tot_amt"));
    	sheetObj.SetCellValue(sRow, "non_taxable_amt",sheetObj.GetCellText(sRow, "non_taxable_tot_amt"));
    	sheetObj.SetCellValue(sRow, "taxable_amt",sheetObj.GetCellText(sRow, "taxable_tot_amt"));
    	
    	sheetObj.SetCellValue(sRow, "vat_amt",sheetObj.GetCellText(sRow, "vat_tot_amt"));
    	sheetObj.SetCellValue(sRow, "whd_amt",sheetObj.GetCellText(sRow, "whd_tot_amt"));
		sheetObj.SetCellValue(sRow, "inv_sum_amt",sheetObj.GetCellText(sRow, "profit_amt"));
		sheetObj.SetCellValue(sRow, "pay_amt",sheetObj.GetCellText(sRow, "pay_tot_amt"));
		sheetObj.SetCellValue(sRow, "bal_amt",sheetObj.GetCellText(sRow, "bal_tot_amt"));
		sheetObj.SetCellValue(sRow, "locl_ttl_amt",sheetObj.GetCellText(sRow, "locl_ttl_tot_amt")); //#5408 [JTC] Invoice List 에 Local Amount 컬럼 추가
	    sheetObj.SetCellEditable(sRow, 1,0);
	//    sheetObj.CellAlign(sRow, 5) = daCenter;
	    sheetObj.SetCellFont("FontBold", sRow, "inv_aply_curr_cd", sRow, "inv_aply_curr_cd",1);
	    sheetObj.SetCellFont("FontBold", sRow, "duty_tax_tot_amt",sRow, "duty_tax_tot_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "non_taxable_tot_amt",sRow, "non_taxable_tot_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "taxable_tot_amt",sRow, "taxable_tot_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "vat_tot_amt",sRow, "vat_tot_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "whd_tot_amt",sRow, "whd_tot_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "inv_sum_amt",sRow, "inv_sum_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "pay_amt",sRow, "pay_amt",1);
	    sheetObj.SetCellFont("FontBold", sRow, "bal_amt", sRow, "bal_amt",1);
    }
    
    <!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
	var intg_bl_seq = '';
	var palt_mnu_cd = '';
	var opr_no = '';
	
	if(sheetObj.GetTotalRows()>0){
		intg_bl_seq = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "inv_seq");
		palt_mnu_cd = 'INV';
		opr_no = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "inv_no");
	}
	
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
	if (sheetObj.RowCount() > 0) {
        docObjects[0].SetSelectRow(docObjects[0].HeaderRows());
    }
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	for(var i=2; i<=sheetObj.LastRow();i++){
		/*
		sheetObj.SetCellEditable(i, "inv_tp",0);
		sheetObj.SetCellEditable(i, "inv_no",0);
		sheetObj.SetCellEditable(i, "trdp_nm",0);
		sheetObj.SetCellEditable(i, "inv_sum_amt",0);
		sheetObj.SetCellEditable(i, "pay_amt",0);
		sheetObj.SetCellEditable(i, "last_pay_dt",0);
		sheetObj.SetCellEditable(i, "bal_amt",0);
		sheetObj.SetCellEditable(i, "over_due",0);
		sheetObj.SetCellEditable(i, "hbl_no",0);
		sheetObj.SetCellEditable(i, "mbl_no",0);
		sheetObj.SetCellEditable(i, "ref_no",0);
		sheetObj.SetCellEditable(i, "vnd_inv_no",0);
		sheetObj.SetCellEditable(i, "ofc_cd",0);
		sheetObj.SetCellEditable(i, "inv_aply_curr_cd",0);
		sheetObj.SetCellEditable(i, "rgst_usrid",0);
		sheetObj.SetCellEditable(i, "check_flag",1);
		sheetObj.SetCellEditable(i, "post_dt",1);
		*/
		//sheetObj.RowBackColor(i) = "#EFEBEF";
		//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
		if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(i, "pay_amt")) > 0){
			/*
			//role_cd 가 'ADM' 인경우에는 수정가능하게 한다.
			if(formObj.role_cd.value != "ADM"){
				sheetObj.SetCellEditable(i, "post_dt",0);
				sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			}else{
				sheetObj.SetCellEditable(i, "post_dt",1);
				sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
			}
			*/
			//LHK, 20140124, 
			sheetObj.SetCellEditable(i, "post_dt",0);
			sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
				sheetObj.SetCellValue(i, "magam_flag","Y");
				sheetObj.SetCellFontColor(i, "magam_flag","#FF0000");
			}
		}else{
			sheetObj.SetCellEditable(i, "post_dt",1);
//			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
		}
		//sheetObj.ColBackColor(0) = "#FFFFFF";
		// #23823 over_due가 )보다 작으면 0으로 변경 
		if (sheetObj.GetCellValue(i, "over_due") < 0) {
			sheetObj.SetCellValue(i, "over_due",0,0);
		}
	}
	formObj.s_amt_fr.value=doMoneyFmt(formObj.s_amt_fr.value);
	formObj.s_amt_to.value=doMoneyFmt(formObj.s_amt_to.value);
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
		
		if(formObj.f_cmd.value == COMMAND01){
			
			formObj.f_inv_seq.value=sheetObj.GetCellValue(printBlockRow, "inv_seq");
			formObj.f_inv_no.value=sheetObj.GetCellValue(printBlockRow, "inv_no");
			formObj.f_print_type.value=sheetObj.GetCellValue(printBlockRow, "inv_tp");
			formObj.f_bl_cnt_cd.value=sheetObj.GetCellValue(printBlockRow, "bl_cnt_cd");
			formObj.f_ref_ofc_cd.value=sheetObj.GetCellValue(printBlockRow, "ref_ofc_cd");
			formObj.f_oth_seq.value=sheetObj.GetCellValue(printBlockRow, "oth_seq");
			formObj.f_trdp_cd.value=sheetObj.GetCellValue(printBlockRow, "trdp_cd");
			formObj.f_wms_seq.value=sheetObj.GetCellValue(printBlockRow, "wms_seq");
			
			doWork("PRINT");
		}
	}
	//doWork("SEARCHLIST");
}
/**
 * Space 이벤트로 체크시 2번의 Row를 선택 못하게 설정
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnKeyUp(sheetObj, Row, Col, KeyCode, Shift){
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(Col);
	if (KeyCode == 32 && colStr == "check_flag"){
		for(var i=2; i <= sheetObj.LastRow();i++){
			if(i == Row){
				if(sheetObj.GetCellValue(i, "check_flag") == "0"){
					sheetObj.SetCellValue(i, "check_flag","0");
				}else{
					sheetObj.SetCellValue(i, "check_flag","1");
				}
			}else{
				sheetObj.SetCellValue(i, "check_flag","0");
			}
		}
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	formObj.f_inv_seq.value=sheetObj.GetCellValue(Row, "inv_seq");
	formObj.f_inv_no.value=sheetObj.GetCellValue(Row, "inv_no");
	formObj.f_print_type.value=sheetObj.GetCellValue(Row, "inv_tp");
	formObj.f_bl_cnt_cd.value=sheetObj.GetCellValue(Row, "bl_cnt_cd");
	formObj.f_ref_ofc_cd.value=sheetObj.GetCellValue(Row, "ref_ofc_cd");
	formObj.f_oth_seq.value=sheetObj.GetCellValue(Row, "oth_seq");
	formObj.f_trdp_cd.value=sheetObj.GetCellValue(Row, "trdp_cd");	
	//WMS ACCOUNT LKH 2015.01.20
	formObj.f_wms_seq.value=sheetObj.GetCellValue(Row, "wms_seq");
	/*
if(Number(sheetObj.GetCellValue(Row, "pay_amt")) != 0){
		deleteBtn1.style.display="none";
		deleteBtn2.style.display="none";
	}else{
		deleteBtn1.style.display="inline";
		deleteBtn2.style.display="inline";
	}
	*/
	/*
	if(sheetObj.ColSaveName(Col) != "check_flag"){
		sheetObj.SetCellValue(Row, "check_flag","1");
	}
	sheetObj.SetRowBackColor(Row,"#DFFFFF");
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(i == Row){
			sheetObj.SetRowBackColor(i,"#DFFFFF");
if(sheetObj.GetCellValue(i, "check_flag") == "0"){
				sheetObj.SetCellValue(i, "check_flag","0");
			}else{
				sheetObj.SetCellValue(i, "check_flag","1");
			}
		}else{
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(i, "pay_amt")) > 0){
				sheetObj.SetCellEditable(i, "post_dt",0);
			}else{
				sheetObj.SetCellEditable(i, "post_dt",1);
				sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
			}
			sheetObj.SetColBackColor(0,"#FFFFFF");
			sheetObj.SetCellValue(i, "check_flag","0");
		}
	}
	*/
	switch (sheetObj.ColSaveName(Col)) {
		case "check_flag" :
//			#1957 [ACROCARGO] INVOICE LIST 0 AFTER CHK / ROW SELECTION
//			for(var i=2; i<=sheetObj.LastRow();i++){
//				if(i == Row){
//					if(sheetObj.GetCellValue(i, "check_flag") == "0"){
//						sheetObj.SetCellValue(i, "check_flag","0");
//					}else{
//						sheetObj.SetCellValue(i, "check_flag","1");
//					}
//				}else{
//					sheetObj.SetCellValue(i, "check_flag","0");
//				}
//			}
		break;
		//------------[20130822 OJG]----------
		case "hbl_no" :
			if(docObjects[0].GetCellValue(Row, "hbl_no") == ''){
			 	return;
			}
			
			var formObj=document.frm1;
			var paramStr = "";
			var titleStr = "";
			
			if (docObjects[0].GetCellValue(Row, "oth_seq") != ""){
				titleStr="Other Sales Details";
//				#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
			    paramStr="./OTH_OPR_0010.clt?f_cmd=-1&ref_no="+escape(docObjects[0].GetCellValue(Row, "oth_ref_no"))+"&oth_seq="+docObjects[0].GetCellValue(Row, "oth_seq");
			    
			}else if (docObjects[0].GetCellValue(Row, "wms_seq") != ""){
				titleStr="WMS Doc Entry";
//				#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
			    paramStr="./WHM_WHM_0010.clt?f_cmd=-1&doc_ref_no="+escape(docObjects[0].GetCellValue(Row, "wms_ref_no"))+"&wm_doc_seq="+docObjects[0].GetCellValue(Row, "wms_seq");
			    
			}else{
				//searchBlCmmInfo(docObjects[0].GetCellValue(Row, "hbl_no"),"H",docObjects[0].GetCellValue(Row, "ref_no"));
				var v_intg_bl_seq = docObjects[0].GetCellValue(Row, "intg_bl_seq");
				var v_air_sea_clss_cd = docObjects[0].GetCellValue(Row, "air_sea_clss_cd");
				var v_bnd_clss_cd = docObjects[0].GetCellValue(Row, "bnd_clss_cd");
				
				if(v_intg_bl_seq == ""){
					alert(getLabel('FMS_COM_ALT010'));
					return;
				}
				
				titleStr="Booking & HB/L Entry";
				if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="O"){	//Ocean Export
//					#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
					paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+escape(docObjects[0].GetCellValue(Row, "hbl_no"))+"&f_intg_bl_seq="+v_intg_bl_seq;
				}else if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="I"){	//Ocean Import
//					#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
					paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+escape(docObjects[0].GetCellValue(Row, "hbl_no"))+"&f_intg_bl_seq="+v_intg_bl_seq;
				}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="O"){	//Air Export
					titleStr="Booking & House AWB Entry";
//					#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
					paramStr="./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_bl_no="+escape(docObjects[0].GetCellValue(Row, "hbl_no"));
				}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="I"){	//Air Import
					titleStr="Booking & House AWB Entry";
//					#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
					paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_bl_no="+escape(docObjects[0].GetCellValue(Row, "hbl_no"));
				}
			}
			parent.mkNewFrame(titleStr, paramStr);
		break;
		case "mbl_no" :
			if(docObjects[0].GetCellValue(Row, "mbl_no") == ''){
			 	return;
			}
			
			var formObj=document.frm1;
			var paramStr = "";
			var titleStr = "";
			
			if (docObjects[0].GetCellValue(Row, "oth_seq") != ""){
				titleStr="Other Sales Details";
//				#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
			    paramStr="./OTH_OPR_0010.clt?f_cmd=-1&ref_no="+escape(docObjects[0].GetCellValue(Row, "oth_ref_no"))+"&oth_seq="+docObjects[0].GetCellValue(Row, "oth_seq");
			    
			}else if (docObjects[0].GetCellValue(Row, "wms_seq") != ""){
				titleStr="WMS Doc Entry";
//				#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
			    paramStr="./WHM_WHM_0010.clt?f_cmd=-1&doc_ref_no="+escape(docObjects[0].GetCellValue(Row, "wms_ref_no"))+"&wm_doc_seq="+docObjects[0].GetCellValue(Row, "wms_seq");
			    
			}else{
				//searchBlCmmInfo(docObjects[0].GetCellValue(Row, "mbl_no"),"M",docObjects[0].GetCellValue(Row, "ref_no"));
				var v_intg_bl_seq = docObjects[0].GetCellValue(Row, "m_intg_bl_seq");
				var v_air_sea_clss_cd = docObjects[0].GetCellValue(Row, "air_sea_clss_cd");
				var v_bnd_clss_cd = docObjects[0].GetCellValue(Row, "bnd_clss_cd");
				
				if(v_intg_bl_seq == ""){
					alert(getLabel('FMS_COM_ALT010'));
					return;
				}
				
				titleStr="Master B/L Entry";			
				if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="O"){	//Ocean Export
//					#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
					paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+escape(docObjects[0].GetCellValue(Row, "ref_no"))+"&f_intg_bl_seq="+v_intg_bl_seq;				
				}else if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="I"){	//Ocean Import
//					#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
					paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+escape(docObjects[0].GetCellValue(Row, "ref_no"))+"&f_intg_bl_seq="+v_intg_bl_seq;
				}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="O"){	//Air Export
					titleStr="Master AWB Entry";
//					#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
					paramStr="./AIE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_ref_no="+escape(docObjects[0].GetCellValue(Row, "ref_no"));
				}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="I"){	//Air Import
					titleStr="Master AWB Entry";
//					#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
					paramStr="./AII_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_ref_no="+escape(docObjects[0].GetCellValue(Row, "ref_no"));
				}
			}
			parent.mkNewFrame(titleStr, paramStr);
		break;
		
		case "ref_no" :
			if(docObjects[0].GetCellValue(Row, "ref_no") == ''){
			 	return;
			}			
			//searchBlCmmInfo(docObjects[0].GetCellValue(Row, "mbl_no"),"M",docObjects[0].GetCellValue(Row, "ref_no"));
			var v_intg_bl_seq = docObjects[0].GetCellValue(Row, "m_intg_bl_seq");
			var v_air_sea_clss_cd = docObjects[0].GetCellValue(Row, "air_sea_clss_cd");
			var v_bnd_clss_cd = docObjects[0].GetCellValue(Row, "bnd_clss_cd");
			
			if(v_intg_bl_seq == ""){
				alert(getLabel('FMS_COM_ALT010'));
				return;
			}
			
			var formObj=document.frm1;
			var paramStr="";
			var titleStr="Master B/L Entry";			
			if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="O"){	//Ocean Export
//				#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
				paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+escape(docObjects[0].GetCellValue(Row, "ref_no"))+"&f_intg_bl_seq="+v_intg_bl_seq;				
			}else if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="I"){	//Ocean Import
//				#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
				paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+escape(docObjects[0].GetCellValue(Row, "ref_no"))+"&f_intg_bl_seq="+v_intg_bl_seq;
			}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="O"){	//Air Export
				titleStr="Master AWB Entry";
//				#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
				paramStr="./AIE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_ref_no="+escape(docObjects[0].GetCellValue(Row, "ref_no"));
			}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="I"){	//Air Import
				titleStr="Master AWB Entry";
//				#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
				paramStr="./AII_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_ref_no="+escape(docObjects[0].GetCellValue(Row, "ref_no"));
			}
			parent.mkNewFrame(titleStr, paramStr);
		break;
		/* 요구사항 #20626 : [BINEX]Accounting → B/L */
		case "oth_ref_no" :
			if(docObjects[0].GetCellValue(Row, "oth_ref_no") == ''){
				//alert(getLabel('FMS_COM_ALT053'));
			 	return;
			}
			var formObj=document.frm1;
//			#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
			var ref_no=escape(docObjects[0].GetCellValue(Row, "oth_ref_no"));
			var oth_seq=docObjects[0].GetCellValue(Row, "oth_seq");
			var titleStr="Other Sales Details";
		    var paramStr="./OTH_OPR_0010.clt?f_cmd=-1&ref_no="+ref_no+"&oth_seq="+oth_seq;
		    parent.mkNewFrame(titleStr, paramStr);	
		break;		
		//WMS ACCOUNT LKH 2015.01.20
		case "wms_ref_no" :
			if(docObjects[0].GetCellValue(Row, "wms_ref_no") == '' || formObj.wmsUseVer.value != "VER3.0"){
				//alert(getLabel('FMS_COM_ALT053'));
			 	return;
			}
			var formObj=document.frm1;
//			#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
			var ref_no=escape(docObjects[0].GetCellValue(Row, "wms_ref_no"));
			var wms_seq=docObjects[0].GetCellValue(Row, "wms_seq");
			var titleStr="WMS Doc Entry";
		    var paramStr="./WHM_WHM_0010.clt?f_cmd=-1&doc_ref_no="+ref_no+"&wm_doc_seq="+wms_seq;
		    parent.mkNewFrame(titleStr, paramStr);	
		break;		
		//--------------------------------------
		case "inv_no":
			// MEMO Function
			var intg_bl_seq =  sheetObj.GetCellValue(Row, "inv_seq");
			var palt_mnu_cd = 'INV';
			var opr_no = sheetObj.GetCellValue(Row, "inv_no");
			setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
			doWorkMemo("SEARCHMEMO");
		break;
	}
	if(Col==-2){
		var intg_bl_seq =  sheetObj.GetCellValue(Row, "inv_seq");
		var palt_mnu_cd = 'INV';
		var opr_no = sheetObj.GetCellValue(Row, "inv_no");
		setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
		doWorkMemo("SEARCHMEMO");
	}
	//마감처리를 한다.
	//마감이나 PAID됐을시 삭제버튼을 비활성화 한다.
	//LHK, 20140127, 아래 Case 가 오류가 있어보임. 
	/* 
if(sheetObj.GetCellValue(Row, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(Row, "pay_amt")) > 0 || sheetObj.GetCellValue(Row, "cmb_inv_seq") == "Y"){
		//role_cd 가 'ADM' 인경우에는 수정가능하게 한다.
		if(formObj.role_cd.value != "ADM"){
			saveBtn1.style.display="none";
			saveBtn2.style.display="none";
		}
		deleteBtn1.style.display="none";
		deleteBtn2.style.display="none";
	}else{
		// [20140121 OJG] 이미 ROLE BUTTON 권한으로 처리되어있슴.
		// saveBtn1.style.display   = "inline";
		// saveBtn2.style.display   = "inline";
		// deleteBtn1.style.display = "inline";
		// deleteBtn2.style.display = "inline";
	}
	*/
if(sheetObj.GetCellValue(Row, "clt_cmpl_flg") == "Y" || Number(sheetObj.GetCellValue(Row, "pay_amt")) > 0 || sheetObj.GetCellValue(Row, "cmb_inv_seq") == "Y"){
		//#26602 Delete Button Disappear
		/*
		getBtnObj('btnModify').style.display="none";
		getBtnObj('btnDelete').style.display="none";
		*/
	}else{
		
		// #4775 [JH] Delete button appears when you select the file
		// 이제 더이상 attr3, attr4는 사용하지 않으므로 모두 주석처리함.
		//if(formObj.f_attr3.value == "Y"){
		//	getBtnObj('btnModify').style.display="inline";
		//}
		//if(formObj.f_attr4.value == "Y"){
		//	getBtnObj('btnDelete').style.display="inline";
		//}
	}
	/* [20140121 OJG] 이미 ROLE BUTTON 권한으로 처리되어있슴.
	if(sheetObj.Cellvalue(Row, "jnr_no") != ""){
		getBtnObj('paidBtn1').style.display="inline";
		paidBtn2.style.display="inline";
	}else{
		getBtnObj('paidBtn1').style.display="none";
		paidBtn2.style.display="none";
	}
	*/
}
function searchBlCmmInfo(blNo, biz_cls_cd, ref_no){
	if(blNo != "" || ref_no != ""){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+blNo+'&s_biz_cls_cd='+biz_cls_cd+'&s_ref_no='+ref_no, './GateServlet.gsl');
		//ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+blNo, './GateServlet.gsl');
	}
}
/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
// 동일한 function 중복
/*function getBlCmmInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				frm1.f_intg_bl_seq.value=rtnArr[0];
				frm1.f_biz_clss_cd.value=rtnArr[2];
				frm1.f_air_sea_clss_cd.value=rtnArr[3];
				frm1.f_bnd_clss_cd.value=rtnArr[4];
				//doWork("DEFAULT");
			}else{
				//frm1.f_intg_bl_seq.value  		= "";
				//frm1.f_bl_no.value				= "";
				//frm1.f_biz_clss_cd.value  		= "";
				//frm1.f_air_sea_clss_cd.value  	= "";
				//frm1.f_bnd_clss_cd.value  		= "";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}*/
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){ 
	var formObj=document.frm1;

	
	if(sheetObj.ColSaveName(Col) != "post_dt" && sheetObj.ColSaveName(Col) != "check_flag"){
		var inv_tp=sheetObj.GetCellValue(Row, "inv_tp");
	    if(inv_tp == "A/R"){
	    	var paramStr="./ACC_INV_0010.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+escape(sheetObj.GetCellValue(Row, "inv_no"));
	        parent.mkNewFrame('A/R Entry', paramStr, "ACC_INV_0010_SHEET_" + sheetObj.GetCellValue(Row, "inv_seq")+"_"+sheetObj.GetCellValue(Row, "inv_no"));
	    }else if(inv_tp == "DB/CR"){
	    	var paramStr="./ACC_INV_0020.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+escape(sheetObj.GetCellValue(Row, "inv_no"));
	        parent.mkNewFrame('DC Note Entry', paramStr,"ACC_INV_0020_SHEET_" + sheetObj.GetCellValue(Row, "inv_seq")+"_"+sheetObj.GetCellValue(Row, "inv_no"));
	    }else if(inv_tp == "A/P"){
	    	var paramStr="./ACC_INV_0030.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+escape(sheetObj.GetCellValue(Row, "inv_no"))+"&o_inv_no="+escape(sheetObj.GetCellValue(Row, "o_inv_no"));
	        parent.mkNewFrame('A/P Entry(Cost)', paramStr,"ACC_INV_0030_SHEET_" + sheetObj.GetCellValue(Row, "inv_seq")+"_"+sheetObj.GetCellValue(Row, "inv_no"));
	    }
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	
	formObj.f_inv_seq.value=sheetObj.GetCellValue(Row, "inv_seq");
	formObj.f_inv_no.value=sheetObj.GetCellValue(Row, "inv_no");
	formObj.f_print_type.value=sheetObj.GetCellValue(Row, "inv_tp");
	formObj.f_bl_cnt_cd.value=sheetObj.GetCellValue(Row, "bl_cnt_cd");
	formObj.f_ref_ofc_cd.value=sheetObj.GetCellValue(Row, "ref_ofc_cd");
	formObj.f_oth_seq.value=sheetObj.GetCellValue(Row, "oth_seq");
	formObj.f_trdp_cd.value=sheetObj.GetCellValue(Row, "trdp_cd");
	formObj.f_wms_seq.value=sheetObj.GetCellValue(Row, "wms_seq");
	
	switch (sheetObj.ColSaveName(Col)) {
		/*
		case "post_dt" :
			sheetObj.SetCellValue(Row, "check_flag","1");
		break;
		*/
		case "check_flag" :
			var delFlag="N";
			for(var i=2; i<=sheetObj.LastRow();i++){
				if(sheetObj.GetCellValue(i, "check_flag") == "1"){
					if(Number(sheetObj.GetCellValue(i, "pay_amt")) != 0){
						delFlag="Y";
					}
				}
			}
		break;
		case "post_dt" :
			var v_post_dt=sheetObj.GetCellValue(Row, "post_dt");
			var v_org_post_dt=sheetObj.CellSearchValue(Row, "post_dt");

			//2016.04.18 C.W.Park Added
			//#52109 office별 block_date 확인
			v_org_post_dt=v_org_post_dt.substr(4, 2) + '-' + v_org_post_dt.substr(6, 2) + '-' + v_org_post_dt.substr(0, 4);
			
			if(!chkBranchBlockDate(sheetObj.GetCellValue(Row, "ofc_cd"), v_post_dt)){
				sheetObj.SetCellText(Row, "post_dt",v_org_post_dt);
				sheetObj.SetCellValue(Row, "check_flag","0");
				sheetObj.SelectCell(Row, "post_dt");
			   return;
			}else{
				sheetObj.SetCellValue(Row, "check_flag","1");
			}
		break;
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal = new ComCalendarFromTo();
	        cal.select(formObj.f_strdt, formObj.f_enddt, 'MM-dd-yyyy');
	    break;
    }
}
/*function enterBlCmmInfo(){
	var formObj=document.frm1;
	if(event.keyCode == 13){
		ajaxSendPost(getBlCmmInfo2, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
	}
}*/
function enterInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value != ""){
		if(event.keyCode == 13){
			ajaxSendPost(getInvInfo, 'reqVal', '&goWhere=aj&bcKey=getInvInfo&s_inv_no='+formObj.s_inv_no.value, './GateServlet.gsl');
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
				if(rtnArr[2] == "H"){
					//frm1.s_hbl_no.value  			= rtnArr[1];
				}else if(rtnArr[2] == "M"){
					//frm1.s_mbl_no.value  			= rtnArr[1];
				}
				frm1.f_intg_bl_seq.value=rtnArr[0];
				frm1.f_biz_clss_cd.value=rtnArr[2];
				frm1.f_air_sea_clss_cd.value=rtnArr[3];
				frm1.f_bnd_clss_cd.value=rtnArr[4];
				doWork("DEFAULT");
			}else{
				frm1.f_intg_bl_seq.value="";
				//frm1.s_hbl_no.value  			= "";
				//frm1.s_mbl_no.value				= "";
				frm1.f_biz_clss_cd.value="";
				frm1.f_air_sea_clss_cd.value="";
				frm1.f_bnd_clss_cd.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
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
				frm1.s_inv_seq.value=rtnArr[0];
				frm1.s_inv_no.value=rtnArr[1];
				doWork("DEFAULT");
			}else{
				frm1.s_inv_seq.value="";
				frm1.s_inv_no.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }           
	}
//	Tu.Nguyen Dou comment: no need this row.
//	selectSel(); 
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.s_ofc_cd);
	
	// Set default value for combobox.
	formObj.s_type_cd[0].selected=true;
	formObj.f_bl_type[0].selected=true;
	formObj.f_ref_no_type[0].selected=true;
	//OFVFOUR-7374[StarCluster-Mex] Invoice Exchange Rate and Currency Option
	formObj.f_curr_cd[0].selected=true
	//#4788 [JAPT] Invoice List - Office option defeault when clicking clear btn
	//formObj.s_ofc_cd[3].selected=true;
	// Set default value for From Date, End Date textbox and Post Date radio button.
	setCondition("R", formObj.f_date_type, formObj.f_strdt, formObj.f_enddt);
	
	/* No need these rows. 
	formObj.f_strdt.value="";
	formObj.f_enddt.value="";
	*/
	
	/* [20140121 OJG] 이미 ROLE BUTTON 권한으로 처리되어있슴.
	getBtnObj('paidBtn1').style.display="none";
	paidBtn2.style.display="none";
	*/
	//sheetObj.RemoveAll();
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
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		formObj.s_bill_to_cd.value="";//trdp_cd  AS param1
		formObj.s_bill_to_nm.value="";//eng_nm   AS param2
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
			if(CODETYPE =="BILLTO"){
				formObj.s_bill_to_cd.value=masterVals[0];	//trdp_cd  AS param1
				
				//Jeong-Il Park Order - Name Change
				if ( MULTI_LANGUAGE == "Y" ){
					formObj.s_bill_to_nm.value=masterVals[16];		//locl_nm   AS param2
				}else{
					formObj.s_bill_to_nm.value=masterVals[3];		//eng_nm   AS param2
				}
			}
		}else{
			if(CODETYPE =="BILLTO"){
				formObj.s_bill_to_cd.value="";//trdp_cd  AS param1
				formObj.s_bill_to_nm.value="";//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function addComma(obj){
	obj.value=doMoneyFmt(obj.value);
}
function setAmount(){
	var formObj=document.frm1;
	formObj.s_amt_to.value=formObj.s_amt_fr.value;
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
//날짜빼기
function subDay(ymd, v_day){
	 ymd=ymd.replaceAll("-","");
	 var yyyy=ymd.substr(4,4);
	 var mm=eval(ymd.substr(0,2) + "- 1") ;
	 var dd=ymd.substr(2,2);
	 var dt3=new Date(yyyy, mm, eval(dd + '-' + v_day));
	 yyyy=dt3.getFullYear();
	 mm=(dt3.getMonth()+1)<10? "0" + (dt3.getMonth()+1) : (dt3.getMonth()+1) ;
	 dd=dt3.getDate()<10 ? "0" + dt3.getDate() : dt3.getDate();
	 return  mm + "-" + dd + "-" + yyyy ;
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
function entSearch(){
	if(event.keyCode == 13){
		document.forms[0].f_CurPage.value='';
		doWork('SEARCHLIST')
	}
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
function validationForm(){
	if(!chkSearchCmprPrd(false, frm1.f_strdt, frm1.f_enddt)){
		return false;
	}
	return true;
}
/**
 * 입력값에서 구분자(-)를 없앤다.
 * @param str   문자열
 * @return 변경된 문자열
 */
function removeDash(str) {
    return str.replace(/-/gi,"");
}
//Calendar flag value
var firCalFlag=false;
var firAmtFlag=false;

/* #21736 jsjang 21013.11.18 */
function enterBlCmmInfo2(sel_hbl_no, f_biz_clss_cd, sel_air_sea_clss_cd, sel_bnd_clss_cd, sel_ref_no){ //OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
	var formObj=document.frm1;
	if(sel_hbl_no != ""){
		//formObj.s_ref_no.value  = "";
		//formObj.f_inv_seq.value = "";
		//formObj.s_inv_no.value  = "";
		//clearChkVal();
		ajaxSendPost(getBlCmmInfo2, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+sel_hbl_no+'&ofc_cd='+formObj.f_ref_ofc_cd.value+'&s_ref_no='+sel_ref_no+'&s_biz_cls_cd='+f_biz_clss_cd+'&air_sea_clss_cd='+sel_air_sea_clss_cd+'&bnd_clss_cd='+sel_bnd_clss_cd, './GateServlet.gsl');
	}
}
function enterRefInfo2(sel_ref_no, sel_air_sea_clss_cd, sel_bnd_clss_cd){
	var formObj=document.frm1;
	if(sel_ref_no != ""){
		//formObj.f_inv_seq.value = "";
		//formObj.s_inv_no.value  = "";
		//clearChkVal();
		ajaxSendPost(getRefInfo2, 'reqVal', '&goWhere=aj&bcKey=getRefInfo&s_ref_no='+sel_ref_no+'&ofc_cd='+formObj.f_ref_ofc_cd.value+'&air_sea_clss_cd='+sel_air_sea_clss_cd+'&bnd_clss_cd='+sel_bnd_clss_cd, './GateServlet.gsl');
	}
}
function enterOtherInfo2(sel_oth_ref_no){
	var formObj=document.frm1;
	if(sel_oth_ref_no != ""){
		//formObj.f_inv_seq.value = "";
		//formObj.s_inv_no.value  = "";
		//clearChkVal();
		ajaxSendPost(getOtherInfo2, 'reqVal', '&goWhere=aj&bcKey=getOtherInfo&s_oth_no='+sel_oth_ref_no+'&ofc_cd='+formObj.f_ref_ofc_cd.value, './GateServlet.gsl');
	}
}
//WMS ACCOUNT LKH 2015.01.20
function enterWmsInfo2(sel_wms_ref_no){
	var formObj=document.frm1;
	if(sel_wms_ref_no != ""){
		ajaxSendPost(getWmsInfo2, 'reqVal', '&goWhere=aj&bcKey=getWarehouseInfo&s_wms_no='+sel_wms_ref_no+'&ofc_cd='+formObj.f_ref_ofc_cd.value, './GateServlet.gsl');
	}
}

/**
* AJAX RETURN
* BL_INFO를 가져온다.
*/
function getBlCmmInfo2(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != "" && rtnArr[5] != "null" && rtnArr[5] != "" && rtnArr[5] == "HF" && formObj.jo_flg.value != "Y")
			{
				frm1.f_block_yn.value="Y";
			}else{
				frm1.f_block_yn.value="";
			}
			frm1.f_oth_sts_cd.value="";
			//WMS ACCOUNT LKH 2015.01.20
			frm1.f_wms_sts_cd.value="";
		}
	}else{
		//SEE_BMD_MSG43
	}
}
/**
* AJAX RETURN
* REF_INFO를 가져온다.
*/
function getRefInfo2(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != "" && rtnArr[5] != "null" && rtnArr[5] != "" && rtnArr[5] == "HF" && formObj.jo_flg.value != "Y")
			{
				frm1.f_block_yn.value="Y";
			}else{
				frm1.f_block_yn.value="";
			}
			frm1.f_oth_sts_cd.value="";
			//WMS ACCOUNT LKH 2015.01.20
			frm1.f_wms_sts_cd.value="";
		}
	}else{
		//SEE_BMD_MSG43
	}
}
/**
* AJAX RETURN
* OTHER_INFO를 가져온다.
*/
function getOtherInfo2(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			//alert(rtnArr[2]);
			//alert(formObj.jo_flg.value);
			if(rtnArr[0] != "null" && rtnArr[0] != "" && rtnArr[2] != "null" && rtnArr[2] != "" && rtnArr[2] == "B" && formObj.jo_flg.value != "Y"){
				frm1.f_oth_sts_cd.value="Y";
			}else{
				frm1.f_oth_sts_cd.value="";
			}
			frm1.f_block_yn.value="";
			//WMS ACCOUNT LKH 2015.01.20
			frm1.f_wms_sts_cd.value="";
		}
	}else{
		//SEE_BMD_MSG43
	}
}

function getWmsInfo2(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			//alert(rtnArr[2]);
			//alert(formObj.jo_flg.value);
			if(rtnArr[0] != "null" && rtnArr[0] != "" && rtnArr[2] != "null" && rtnArr[2] != "" && rtnArr[2] == "B" && formObj.jo_flg.value != "Y"){
				frm1.f_wms_sts_cd.value="Y";
			}else{
				frm1.f_wms_sts_cd.value="";
			}
			frm1.f_block_yn.value="";
			//WMS ACCOUNT LKH 2015.01.20
			frm1.f_oth_sts_cd.value="";
		}
	}else{
		//SEE_BMD_MSG43
	}
}

function CUSTOMER_POPLIST(rtnVal){
    var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_bill_to_cd.value=rtnValAry[0];//full_nm
		
		//Jeong-Il Park Order - Name Change 
		if ( MULTI_LANGUAGE == "Y" ){
			formObj.s_bill_to_nm.value=rtnValAry[10];//loc_nm	
		}else{
			formObj.s_bill_to_nm.value=rtnValAry[2];//eng_nm
		}	
		
	}             
}
function HISTORY(){
	
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

//#48895 [IMPEX] AR/AP List VAT Option 값 세팅
//#2951 [YMI, BNX, CLA] AFTER V450, TAX INVOICE # ON AR/AP LIST
function setAccInvVATCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]=="Y" && doc[1]!=undefined ) {
		ACC_VAT_VAL = "0";
	}
}

//#48895 [IMPEX] AR/AP List WHD Option 값 세팅
function setAccInvWHDCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]=="Y" && ACC_VAT_VAL=="0") {
		ACC_WHD_VAL = "0";
	}
}

//#3375 [JTC]Invoice, Local Statement Form 개발
function setArInvoiceOptionUseReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
		AR_INVOICE_OPTION_USE = doc[1].split('|'); // OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List
	}
}

/* #21736, [COMMON]Accounting 관련 권한 jsjang 2013.11.18 */
function goInvoiceEntry(v_inv_tp){
	
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	/*if (sheetObj.RowCount() == 0 && ((p_intg_bl_seq == null || p_intg_bl_seq == "") && (p_oth_seq == null || p_oth_seq == "") && (p_wms_seq == null || p_wms_seq == ""))) {
		// There is no data
		alert(getLabel('FMS_COM_ALT004'));
		return;
	}*/
	
	var sel_hbl_no = "";
	var sel_mbl_no = "";
	var sel_ref_no = "";
	var sel_intg_bl_seq = "";
	var sel_mst_intg_bl_seq = "";
	var sel_oth_ref_no = "";
	var sel_oth_seq = "";
	var sel_wms_ref_no = "";
	var sel_wms_seq = "";
	var sel_carr_trdp_cd = "";
	var sel_carr_trdp_nm = "";
	//OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
	var sel_bnd_clss_cd = "";
	var sel_air_sea_clss_cd = "";
	
	if (FIRST_SEARCH_YN != "Y") {
		var vRow = sheetObj.GetSelectRow();
//		#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
		sel_hbl_no = escape(sheetObj.GetCellValue(vRow, "hbl_no"));
		sel_mbl_no = escape(sheetObj.GetCellValue(vRow, "mbl_no"));
		sel_ref_no = escape(sheetObj.GetCellValue(vRow, "ref_no"));
		sel_intg_bl_seq = sheetObj.GetCellValue(vRow, "intg_bl_seq");
		sel_mst_intg_bl_seq = sheetObj.GetCellValue(vRow, "m_intg_bl_seq");
		sel_oth_ref_no = escape(sheetObj.GetCellValue(vRow, "oth_ref_no"));
		sel_oth_seq = sheetObj.GetCellValue(vRow, "oth_seq");
		sel_wms_ref_no = escape(sheetObj.GetCellValue(vRow, "wms_ref_no"));
		sel_wms_seq = sheetObj.GetCellValue(vRow, "wms_seq");
		sel_carr_trdp_cd = sheetObj.GetCellValue(vRow, "trdp_cd");
		sel_carr_trdp_nm = sheetObj.GetCellValue(vRow, "trdp_nm");
		//OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
		sel_air_sea_clss_cd = sheetObj.GetCellValue(vRow, "air_sea_clss_cd");
		sel_bnd_clss_cd = sheetObj.GetCellValue(vRow, "bnd_clss_cd");
		
	}else{
		sel_hbl_no = p_hbl_no;
		sel_mbl_no = p_mbl_no;
		sel_ref_no = p_ref_no;
		sel_intg_bl_seq = p_intg_bl_seq;
		sel_mst_intg_bl_seq = p_intg_bl_seq
		sel_oth_ref_no = p_oth_ref_no;
		sel_oth_seq = p_oth_seq;
		sel_wms_ref_no = p_wms_ref_no;
		sel_wms_seq = p_wms_seq;
		sel_carr_trdp_cd = formObj.carr_trdp_cd.value;
		sel_carr_trdp_nm = formObj.carr_trdp_nm.value;
		//OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
		sel_bnd_clss_cd = frm1.f_bnd_clss_cd.value;
		sel_air_sea_clss_cd = frm1.f_air_sea_clss_cd.value;
	}
	
	formObj.f_block_yn.value="";
	formObj.f_oth_sts_cd.value="";
	formObj.f_wms_sts_cd.value="";
	
	var s_bl_no = "";
	var s_ref_no = "";
	var s_intg_bl_seq = "";
	var f_biz_clss_cd = "";
	
	if(sel_hbl_no != ""){
		s_bl_no = sel_hbl_no;
		s_intg_bl_seq = sel_intg_bl_seq;
		f_biz_clss_cd = "H";
	}else if(sel_hbl_no != "" && sel_mbl_no == ""){
		s_bl_no = sel_hbl_no;
		s_intg_bl_seq = sel_intg_bl_seq;
		f_biz_clss_cd = "H";
	}else if(sel_hbl_no == "" && sel_mbl_no != ""){
		s_bl_no = sel_mbl_no;
		s_intg_bl_seq = sel_mst_intg_bl_seq;
		f_biz_clss_cd = "M";
	}else if(sel_hbl_no == "" && sel_ref_no != ""){
		if(v_inv_tp == "AP"){
			s_bl_no = sel_mbl_no;
		}
		s_ref_no = sel_ref_no;
		s_intg_bl_seq = sel_mst_intg_bl_seq;
		f_biz_clss_cd = "M";
	}
	
	//[OCEAN BLUE] CANNOT CREATE DC ON INVOICE LIST
	if(sel_hbl_no != null && sel_hbl_no != "" && (sel_oth_ref_no == null || sel_oth_ref_no == "") && (sel_wms_ref_no == null || sel_wms_ref_no == "")){
    	enterBlCmmInfo2(sel_hbl_no, f_biz_clss_cd, sel_air_sea_clss_cd, sel_bnd_clss_cd, sel_ref_no); //OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
    }else{
    	if(sel_ref_no != null && sel_ref_no != ""){
    		enterRefInfo2(sel_ref_no, sel_air_sea_clss_cd, sel_bnd_clss_cd);//OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
    	}else{
    		if(sel_oth_ref_no != null && sel_oth_ref_no != ""){
    			enterOtherInfo2(sel_oth_ref_no);
    		}else{
        		if(sel_wms_ref_no != null && sel_wms_ref_no != ""){
        			enterWmsInfo2(sel_wms_ref_no);
        		}
    		}
    	}
    }
	
	if(formObj.f_block_yn.value == "Y" || formObj.f_oth_sts_cd.value == "Y" || formObj.f_wms_sts_cd.value == "Y"){
		alert(getLabel('FMS_COM_ALT060'));
		return;
	}
	
	
	if(v_inv_tp == "AR"){
		//WMS ACCOUNT LKH 2015.01.20
		var paramStr="./ACC_INV_0010.clt?f_cmd=-1&f_intg_bl_seq="+s_intg_bl_seq+
			"&s_bl_no="+s_bl_no+
			"&s_ref_no="+s_ref_no+
			"&f_biz_clss_cd="+f_biz_clss_cd+
			"&s_oth_ref_no="+sel_oth_ref_no+
			"&f_oth_seq="+sel_oth_seq+
			"&s_wms_ref_no="+sel_wms_ref_no+
			"&f_wms_seq="+sel_wms_seq;
		
		//alert(paramStr);
		parent.mkNewFrame('A/R Entry', paramStr);
		
	}else if(v_inv_tp == "AP"){
		var paramStr=
	    	"./ACC_INV_0030.clt?f_cmd=-1&f_intg_bl_seq="+s_intg_bl_seq+
	    	"&s_bl_no="+s_bl_no+
	    	"&s_ref_no="+s_ref_no+
	    	"&f_biz_clss_cd="+f_biz_clss_cd+
	    	"&s_oth_ref_no="+sel_oth_ref_no+
	    	"&f_oth_seq="+sel_oth_seq+
	    	"&s_wms_ref_no="+sel_wms_ref_no+
	    	"&f_wms_seq="+sel_wms_seq;
	    
	    	//#22112 Billing Carrier 추가 
	    	if (f_biz_clss_cd == "M") {
	    		paramStr += "&chk_fr_trdp_cd="+sel_carr_trdp_cd+
	    		"&chk_fr_trdp_nm="+sel_carr_trdp_nm+
	    		"&s_inv_no="+s_bl_no;
	    	} else {
	    		//24842 hbl에서 AP를 눌렀을 경우 vendor는 세팅되어지면 안됨
	    		paramStr += "&chk_house_ap=Y";
	    	}
	    	
	    parent.mkNewFrame('A/P Entry(Cost)', paramStr);
	    
	}else if(v_inv_tp == "DC"){
		var paramStr="./ACC_INV_0020.clt?f_cmd=-1&f_intg_bl_seq="+s_intg_bl_seq+
		    "&s_bl_no="+s_bl_no+
		    "&s_ref_no="+s_ref_no+
		    "&f_biz_clss_cd="+f_biz_clss_cd+
		    "&s_oth_ref_no="+sel_oth_ref_no+
		    "&f_oth_seq="+sel_oth_seq;
	    
	    parent.mkNewFrame('DC Note Entry', paramStr);
	}
}

function getPdfFileNm(){
	var formObj=document.frm1;
	var pdfFileNm = "";
	var inv_no = formObj.f_inv_no.value;
	//OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails
	var oth_ref_no = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "oth_ref_no");
	var wms_ref_no = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "wms_ref_no"); 
	var ref_no = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ref_no");
	var hbl_no = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no");
	
	ref_no = ref_no ? ref_no : "";
	hbl_no = hbl_no ? hbl_no : "";
	oth_ref_no = oth_ref_no ? oth_ref_no : "";
	wms_ref_no = wms_ref_no ? wms_ref_no : "";
	
	if (inv_no == "" || inv_no == "undefined" || inv_no == undefined) {
		return "";
	}
	if(formObj.f_print_type.value == "A/R"){
		pdfFileNm = "AR_"+inv_no;	
	} else if(formObj.f_print_type.value == "A/P"){
		pdfFileNm = "AP_"+inv_no;	
	} else if(formObj.f_print_type.value == "DB/CR"){
		pdfFileNm = "DC_"+inv_no;	
	}
	if(rpt_file_name_flg){
		if(formObj.f_print_type.value == "A/R" || formObj.f_print_type.value == "A/P"){
			if(wms_ref_no != ""){
				pdfFileNm += "_" + wms_ref_no;
			}else if(oth_ref_no != ""){
				pdfFileNm += "_" + oth_ref_no;
			}else if(ref_no != ""){
				pdfFileNm += "_" + ref_no;
			}
		}
		else if(formObj.f_print_type.value == "DB/CR" && hbl_no!= ""){
			pdfFileNm += "_" + hbl_no;
		}
	}
	return pdfFileNm;
}


//개인정보 관리화면 정렬순서 2016.03 
function setOrderByInfo(reqVal) {
	
	var formObj = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	var orderByInfo = "";
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) == "undefined") {
			orderByInfo = "";
		} else {
			orderByInfo = doc[1];
		}
	}
	formObj.f_orderByInfo.value = orderByInfo; 
}

//2016.04.18 C.W.Park Added
//#52109 office별 block_date 확인
function chkBranchBlockDate(param, branchPostDt){
	
	var formObj=document.frm1;
	var chkBlckDate = true;
	//#52109 office별 block_date 확인
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt&searchOfcCd=' + param, './GateServlet.gsl');
	branchPostDt = branchPostDt.substring(4,6) + "-" + branchPostDt.substring(6,8) + "-" + branchPostDt.substring(0,4);
	
	//Post Date 가 변경되는 경우에 BLOCK_POST_DT 보다 작으면 warnning massage 띄워줌
	if(BLOCK_POST_DT != "") {
		var nextBlockDtYMD=BLOCK_POST_DT.replaceAll("-", "");															//BLOCK_POST_DT  12-01-2013
			nextBlockDtYMD=nextBlockDtYMD.substring(4,8)+nextBlockDtYMD.substring(0,2)+nextBlockDtYMD.substring(2,4);	//nextBlockDtYMD 20131201
		var orgBlockDt=addDate('d', -1, nextBlockDtYMD, "");			
			ORG_BLOCK_POST_DT=orgBlockDt.substring(4,6) + "-" + orgBlockDt.substring(6,8) + "-" + orgBlockDt.substring(0,4);
		if(compareTwoDate(BLOCK_POST_DT, branchPostDt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			alert(getLabel2('ACC_MSG119',new Array(ORG_BLOCK_POST_DT)));	//The Post Date must be later than the block date (@)";
			chkBlckDate = false;
		}
	}
	return chkBlckDate;
}

function getMaxBlockOrJnrNextDt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			BLOCK_POST_DT=doc[1].substring(4,6) + "-" + doc[1].substring(6,8) + "-" + doc[1].substring(0,4);
		}else{
			BLOCK_POST_DT="";
		}
	}
}


function getInvModiTms(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	// alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			
			//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정		
			for(var i=2; i<=sheetObj.LastRow();i++){
		    	if(sheetObj.GetCellValue(i ,"check_flag") == "1"){ 		    		
					if (doc[1] == sheetObj.GetCellValue(i ,"trx_modi_tms")) {
						isInvModiTmsOk=false;
					} else {
						isInvModiTmsOk=true;
					}  
		    	}
			}
		}
	}
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
					frm1.f_cmd.value=COMMAND01;
					sheetObj.DoAllSave("./ACC_INV_0040GS.clt", FormQueryString(formObj), true);
				}
			}
		}
	}
}

//#1826 [BINEX V4421] CANNOT SEARCH INVOICE WITH 1) POST DATE 2) AMOUNT INPUTTED
function setRangeDate(){
	var now=new Date();
	var year=now.getFullYear();
	var enddtMonth=now.getMonth() + 1;
	// #3626 [WEBTRANS] POST DATE DEFAULT RANGE ISSUE
	//var strdtMonth = (now.getMonth() + 1) - 3;
		
	var date=now.getDate();
	if (enddtMonth < 10) {
		enddtMonth="0" + (enddtMonth);
	}
	
	if (date < 10) {
		date="0" + date;
	}
	var enddtDate = "";
	enddtDate = enddtMonth + "-" + date + "-" + year;
	
	/////////////////////////////////////////// 2 달 빼기
	// #3626 [WEBTRANS] POST DATE DEFAULT RANGE ISSUE
	now.setMonth(now.getMonth() - 2);
	var strdtYear=now.getFullYear();
	
	var strdtMonth = now.getMonth() + 1;
	if (strdtMonth < 10) {
		strdtMonth="0" + (strdtMonth);
	}
	
	var strDate=now.getDate();
	if (strDate < 10) {
		strDate="0" + strDate;
	}
	
	var strdtDate = "";
	strdtDate = strdtMonth + "-" + strDate + "-" + strdtYear;
	
	document.forms[0].f_strdt.value = strdtDate;
	document.forms[0].f_enddt.value = enddtDate;
	document.forms[0].f_strdt.focus();
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
