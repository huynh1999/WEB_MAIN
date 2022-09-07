/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0040.js
*@FileTitle  : MAWB등록
*@author     : CLT
*@version    : 1.0
*@since      : 2014/08/13
=========================================================*/
var loadDataProcess ="";//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
var tab1click="";
var tab2click="";
var tab3click="";
var tab4click="";
/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
var tab5click="";
/* #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가 */
var tab6click="";
var hblListSheet=false;
var docListSheet=false;
var frtSdSheet=false;
var frtBcSheet=false;
var frtDcSheet=false;
var isInvStsOk=false;
var blDupl=false;
var vIntgBlModiTms;
var delete_show_complete = "N";
var isPdOrdStsOk = false;


//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	var docListParam=docObjects[2].GetSaveString(false);
	var sheetParam='';
	/* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
	isError=false;	
	if(docListParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= docListParam;
	  	docListSheet=true;
	}
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	var frtSdListParam=docObjects[3].GetSaveString(false);
    if(frtSdListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[3], '');
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtSdListParam=docObjects[3].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtSdListParam;
    	frtSdSheet=true;
	}
    fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
    var frtBcListParam=docObjects[4].GetSaveString(false);
    if(frtBcListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[4], 'b_')
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtBcListParam=docObjects[4].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtBcListParam;
    	frtBcSheet=true;
	}
    fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
    var frtDcListParam=docObjects[5].GetSaveString(false);
	if(frtDcListParam!=''){
		var rtnFlg=frCheckInpuVals(docObjects[5], 'dc_')
		if(rtnFlg=='IV'){
    		isError=true;
    	}
		frtDcListParam=docObjects[5].GetSaveString(false);
		sheetParam+= '&';
		sheetParam+= frtDcListParam;
		frtDcSheet=true;
	}
    /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
    if(isError == true)
    {
    	return true;
    }		
	return sheetParam;
}
function doWork(srcName){
	
	// #1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
	setSaveConfirmMsg(srcName);
	
	if(!btnGetVisible(srcName)){
		return;
	}
    try {
        switch(srcName) {
        	case "NEW":
        		// clearScreen();
        		// break;
        		// #2084 - [PATENT] NEW 버튼 Confirm 메시지 추가
        		if(confirm(getLabel('FMS_COM_CFMNEW'))){
	        		doShowProcess();
					var currLocUrl=this.location.href;
					currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
					currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
					//parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
			        //#3779 [CLT] v4.7.0 entry화면 new 버튼 클릭 시 tab 제목
			        setTabTitle(pageName);					
					window.location.href = currLocUrl;
        		}
				break;
            case "SAVE":
		          //#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
	  	          if(edob_flg =='N'){
	  	        	  //BL 신규 생성이면 ref_ofc_cd 비교, BL 수정이면 h_ref_ofc_cd 비교
	  	        	  if(!frm1.intg_bl_seq.value){
	  		            if(ofc_cd != frm1.ref_ofc_cd.value){
	  		              alert(getLabel('AIR_MSG_119')+'\n\n' + 'B/L Office: ' + frm1.ref_ofc_cd.value + ', Your Office: ' + ofc_cd);
	  		              frm1.ref_ofc_cd.focus();
	  		              return;
	  		            }
	  	        	  } else {
	  		            if(ofc_cd != frm1.h_ref_ofc_cd.value){
	  		              alert(getLabel('AIR_MSG_119')+'\n\n' + 'B/L Office: ' + frm1.h_ref_ofc_cd.value + ', Your Office: ' + ofc_cd);
	  		              frm1.ref_ofc_cd.focus();
	  		              return;
	  		            } else if(ofc_cd != frm1.ref_ofc_cd.value){
		  		              alert(getLabel('AIR_MSG_119')+'\n\n' + 'B/L Office: ' + frm1.ref_ofc_cd.value + ', Your Office: ' + ofc_cd);
		  		              frm1.ref_ofc_cd.focus();
		  		              return;	  		            	
	  		            }	       		  
	  	        	  }
	  	          }            
        		if(frm1.intg_bl_seq.value==""){
        			doWork("SAVE_ADD");
        		}
        		else{
        			
        	     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정 
        	     	if(!chkIntgBlModiTms(srcName)){
        	     	   return;
        	     	}	
        	     	
        	     	/* #428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED */
        	     	/* O04 롤코드가 있으면 수정가능 or 롤코드가 없을땐 인보이스가 없을때 수정가능  (ref_no) */
        	     	if(!chkRoleInv(frm1.intg_bl_seq.value)){
        	     		return;
        	     	}        	     	
        	     	
        			doWork("SAVE_MODIFY");
        		}
        		break;					
           case "SAVE_ADD":	//등록
        	   
        	   // #48893 - [BINEX] OPEN Invoice 관련 - MB/L 공백제거 
	     	   frm1.ref_no.value=trim(frm1.ref_no.value);
	     	   frm1.bl_no.value=trim(frm1.bl_no.value);
        	   
        	   //25559 정합성 체크
        	   if(!checkMblValidate(frm1.bl_no.value)){
        		   goTabSelect('01');
        		   frm1.bl_no.focus();
        		   //#4940 ** [BEST OCEAN] WRONG MAWB VALIDATION & NO DUPLICATE ALLOWED : 2차 BLNO 없는 경우 저장 되도록
        		   //alert(getLabel('AIR_MSG_031'));
        		   //#4940 ** [BEST OCEAN] WRONG MAWB VALIDATION & NO DUPLICATE ALLOWED
	     	       //1.MAWB VALIDATION CHECK
        		   if(mawb_verify_yn =='Y'){//Cannot bypass
        			   if(frm1.bl_no.value!=''){
         				   alert(getLabel('AIR_MSG_031'));
         				   return;
         			   }
        		   }else{
           			   alert(getLabel('AIR_MSG_031'));
            	   }
        	   }
        	   if(blCheckInpuVals()){
	        		if(frm1.intg_bl_seq.value==''){
	        			if(frm1.ref_no.value=='' || frm1.ref_no.value=="AUTO"){
	        				frm1.ref_no.value='';
	        				refCheck=true;
	        			}else{
	        				//ref_no가 자동채번이 아닌경우 저장되어 있는지 체크해야 함.
	        				ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=A&f_bnd_clss_cd=I&f_biz_clss_cd=M&f_ref_no='+frm1.ref_no.value, './GateServlet.gsl');
	        			}
	        		}
	        		if(refCheck){
	        			ajaxSendPost(getMblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=A&f_bnd_clss_cd=I&f_biz_clss_cd=M&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');        		   
	        		}
	        	}
           break;
           
           case "FILE_LABEL":
         		 var param = "";
   			var formObj=document.frm1;
    			if(formObj.intg_bl_seq.value != ""){
   			
   			formObj.file_name.value = 'file_label_01_UFF.mrd';
   			formObj.title.value='File Label';
   			// Parameter Setting
   			param += '[' + formObj.intg_bl_seq.value + ']'; // $1
   			formObj.rd_param.value=param;
   			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);

    			}else {
    				//Please select the row to print.
    				alert(getLabel('FMS_COM_ALT004'));
    		
    				return;
    			}

         		
         	break; 
           
           
           case "MFPRINT":
        	   /*
        	   if(frm1.bl_no.value==""){
//        		   alert("Please retrieve data.");
        		   alert(getLabel('AIR_MSG_030'));
        		   return;
        	   }
        	   var param='title=Air Consolidated Cargo Manifest';
        	   param += '&cmd_type=49';
        	   param += '&bl_no=' + frm1.bl_no.value;
        	   popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
        	   */
        	   var formObj=document.frm1;
       	    	formObj.title.value='Cargo Manifest';
 	 			formObj.file_name.value="cargo_manifest_ai_mbl_01.mrd";
 	 			//Parameter Setting
 	 			var param='[' + frm1.intg_bl_seq.value + ']';
 	 			param += '[' + v_ofc_cd + ']';
 	 			formObj.rd_param.value=param;
// 	 			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
 	 			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);//Fax Test - PJK
           break;
           case "PRINT":
        	   if(frm1.intg_bl_seq.value == ""){
//         			alert("Please retrieve data.");
         			alert(getLabel('AIR_MSG_030'));
         	   }else{
         			var reqParam='?intg_bl_seq='  +frm1.intg_bl_seq.value;
	         		reqParam += '&master_bl_no=' +frm1.bl_no.value;
	         		popGET('RPT_PRN_0100.clt'+reqParam, '', 400, 400, "scroll:yes;status:no;help:no;");
         	   }
           break;
           case "S_DOC":
        	    fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	       		var sheetObj3=docObjects[2];	
	   	 		if(sheetObj3.GetTotalRows()> 0){
		   	 		var formObj=document.frm1;
		   	 		formObj.file_name.value='doc_list.mrd';
		   	 		formObj.title.value='Document List';
		   	 		//Parameter Setting
		   	 		var param='[' + formObj.intg_bl_seq.value + ']';			// [1]
		   	 		param += '[AIM]'; 											// [2] MASTER/HOUSE/OTH 여부
		   	 		param += '[' + formObj.bl_no.value + ']';				// [3] MBL_NO/HBL_NO
		   	 		param += '[' + formObj.user_id.value + ']';				// [4]
		   	 		formObj.rd_param.value=param;
		   	 		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
	   	 		break;   
           case "SAVE_MODIFY":	//등록
        	   // #48893 - [BINEX] OPEN Invoice 관련 - MB/L 공백제거 
	     	   frm1.ref_no.value=trim(frm1.ref_no.value);
	     	   frm1.bl_no.value=trim(frm1.bl_no.value);
	     	   
        	   if(blCheckInpuVals()){
        		   frm1.f_cmd.value=MODIFY;
                   //전체 CellRow의 갯수
//                   if(confirm(getLabel(saveMsg))){
                	   gridAdd(0);
                	   docObjects[0].SetCellValue(1, 1,1);
                	   frm1.f_bl_no.value=frm1.bl_no.value;
                	   // /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다.
           	   		   setPost_date("U");
                	   //if(user_role_cd!="ADM"){
                		   //save post date, office info
	           	   	   		// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다.
	           	   	   		//confirm 전에 check
	           	   	   		/***	
           	   		   	  if(ofc_post_dt=="ETD"){
                			   frm1.post_dt.value=frm1.etd_dt_tm.value;
                		   }else if(ofc_post_dt=="ETA"){
                			   if(frm1.f_eta_dt_tm.value!=''){
                				   frm1.post_dt.value=frm1.f_eta_dt_tm.value;
                			   }else{
                				   frm1.post_dt.value=frm1.eta_dt_tm.value;
                			   }
                		   }
                		   ***/
                	   //}
                	  //25559 정합성 체크
                 	  if(!checkMblValidate(frm1.bl_no.value)){
                 		  goTabSelect('01');
                 		  frm1.bl_no.focus();
                 		  //#4940 ** [BEST OCEAN] WRONG MAWB VALIDATION & NO DUPLICATE ALLOWED : 2차 BLNO 없는 경우 저장 되도록
                 		  //alert(getLabel('AIR_MSG_031'));
                 		  //#4940 ** [BEST OCEAN] WRONG MAWB VALIDATION & NO DUPLICATE ALLOWED
	     	       		  //1.MAWB VALIDATION CHECK
        		   		  if(mawb_verify_yn =='Y'){//Cannot bypass
        		   			  if(frm1.bl_no.value!=''){
	             				   alert(getLabel('AIR_MSG_031'));
	             				   return;
	             			  }
        		   		  }else{
	               			   alert(getLabel('AIR_MSG_031'));
	               		  }
                 	  }
                 	  //25559 MBL 중복 체크를 한다.
                 	  blDupl=false;
                 	  if(frm1.h_bl_no.value!=frm1.bl_no.value){
                 		  ajaxSendPost(getMblCheckNoEmpBL, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=A&f_bnd_clss_cd=I&f_biz_clss_cd=M&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');        		   
                 	  } 
                 	  if (blDupl) {
                 		  return;
                 	  }
                	 //LHK REF_NO MODIFY 시 중복 Check
                	   ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=A&f_bnd_clss_cd=I&f_biz_clss_cd=M&f_ref_no='+frm1.ref_no.value+'&mbl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
                	   if(refCheck){
//	                	   doShowProcess();
	                	   //docObjects[0].ShowDebugMsg = true;
	                	   //BL No. 가 없을 경우
             			   //The [HB/L No.] is Blank. Generate the Number? Yes/No. Yes 일 경우 Save 진행 
             			   var blNullChk=true;
                   		   if(frm1.ref_no.value == ""){
                   			   blNullChk=confirm(getLabel('AIE_BMD_MSG78'));
                   		   }
                   		   if(blNullChk){
                   			   if(confirm(getLabel(saveMsg))){
                        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
                        		   var sndParam=getSndParam();
                        		   if(sndParam == true)	{	return false;	}                     				   
			                	   //docObjects[0].DoAllSave("./AII_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
                          		 //#4084 (JAPT) same currency invoice - exchange rate validation
                        		   exchangeRateVal();                        		   
			                	   docObjects[0].DoAllSave("./AII_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
			                	   //docObjects[0].ShowDebugMsg = false;
                   			   }
                   		   }	   
                	   }	   
//                   }
        	   }
           break;
           case "FINAL_MODIFY":	//등록
	        	frm1.f_cmd.value=COMMAND11;
	        	if(confirm(getLabel('FMS_COM_CFMSAV'))){
		        	gridAdd(0);
		        	docObjects[0].SetCellValue(1, 1,1);
		        	frm1.f_bl_no.value=frm1.bl_no.value;
         		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
         		   var sndParam=getSndParam();
         		   if(sndParam == true)	{	return false;	} 		        	
					doShowProcess();
					//docObjects[0].DoAllSave("./AII_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
					docObjects[0].DoAllSave("./AII_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
	        	}
		   break;
           case "REMOVE":	//삭제
//        	   var hblCnt = 0
//        	   for(var i = 1; i < docObjects[1].rows; i++){
//        		   if(docObjects[1].CellValue(i, 'hbl_bl_no')!=''){
//        			   hblCnt++;   
//        		   }
//        	   }
//        	   if(hblCnt>0){
//        		   alert('Please delete HAWB first!');
//        		   
//        	   }else{
//	        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
//		               frm1.f_cmd.value = REMOVE;
//		        	   doShowProcess();
//		        	   frm1.submit();
//	        	   }
//        	   }
        	   
	   	     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정 
	   	     	if(!chkIntgBlModiTms(srcName)){
	   	     	   return;
	   	     	}	
	   	     	
        	   ajaxSendPost(doRmvSrInfo, 'reqVal', '&goWhere=aj&bcKey=getHblClsChk&biz_clss_cd=M&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
        	   
           break;
           case "GOTOHB":		//S/R 화면호출
               var paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST11+"&f_intg_bl_seq="+frm1.intg_bl_seq.value;
               parent.mkNewFrame('Booking & House AWB Entry', paramStr);
           break;
           case "DOCFILE":	//첨부파일
       		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
	       		/**  Document List ==> Common Memo 연동 파라미터 (S) */
	       		reqParam += '&palt_mnu_cd=AIM';
	       		reqParam += '&opr_no='+frm1.ref_no.value;
	       		/**  Document List ==> Common Memo 연동 파라미터 (E) */
          		reqParam += '&openMean=SEARCH01';
      	   		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 420, "scroll:no;status:no;help:no;");
     	   break;
           case "SNDEML":	//Email전송
          		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
             		reqParam += '&openMean=SEARCH01';
         	   		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
       	   break;
           case "SEARCHLIST":	//조회
			   frm1.f_ref_no.value=trim(frm1.f_ref_no.value);
			   frm1.f_bl_no.value=trim(frm1.f_bl_no.value);
        	   if(frm1.f_ref_no.value=='' && frm1.f_bl_no.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_ref_no.focus();
        		   return;
        	   }else{
        		   //#5188 [BINEX] AFTER V470.06 RELEASE, FILING # RETRIEVE ON BL ENTRY
        		   frm1.f_intg_bl_seq.value='';
        		   
        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
//                   frm1.f_cmd.value=SEARCHLIST;
//            	   doShowProcess();
//            	   frm1.submit();
        		   submitForm(SEARCHLIST);
        	   }
       	   break;
           case "SEARCHLIST01":	//조회
        	   if(frm1.intg_bl_seq.value!=''){
	        	   if(frm1.f_ref_no.value=='' && frm1.f_bl_no.value==''){
	        		   alert(CM_MSG5);
	        		   return;
	        	   }else{
	                   frm1.f_cmd.value=SEARCHLIST01;
	            	   //doShowProcess();
	                   fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	                   docObjects[1].DoSearch("./AII_BMD_0040_1GS.clt", FormQueryString(frm1) );
	        	   }
        	   }
           break;
           case "SEARCH_DOC":	//첨부문서 조회
        	   if(frm1.intg_bl_seq.value!=''){
	        	   //Doccument File List 조회
		   	       frm1.f_cmd.value=SEARCHLIST02;
		   	       fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
		   	       docObjects[2].DoSearch("./SEE_BMD_0021_1GS.clt", FormQueryString(frm1) );
        	   }	   	 	   
      	   break;
      	   //2010.12.22 김진혁 추가, MBL도 HBL과 같은 조건으로 Copy 버튼 추가
           case "COPY":	//조회
        	   //BL_COPY COPY시 컨펌메시지 없이 바로 Submit후 frt Check화면을 보여준다
        	   frm1.f_cmd.value=COMMAND02;
        	   doShowProcess();
        	   frm1.submit();
        	   /*if(confirm(getLabel('FMS_COM_CFMCPY'))){
//                   frm1.f_cmd.value=COMMAND02;
//            	   doShowProcess();
//            	   frm1.submit();
            	   submitForm(COMMAND02);
        	   }*/
       	   break;
           case "SEARCH_FRT":	//Freight 조회
        		if(frm1.bl_sts_cd.value!='NA'){
        			searchGrid(7);
        			searchGrid(8);
        			searchGrid(9);
        		}
        	break;
           case "GOTOACCT":
		   		var formObj=document.frm1;
	   	 		if(formObj.bl_no.value!=''){
		   		   	var paramStr="./ACC_INV_0040.clt?";
		   		   	/* #23987, s_mbl_no 링크제거 jsjang 2013.11.25 */
		   		   	//24842 oyh Mbl에서 AP를 눌렀을 경우 Vendor inv no에 MBLno가 세팅안됨 으로 기존 로직으로 재수정
						paramStr+= "f_mhbl_no=" + formObj.bl_no.value;
						paramStr+= "&s_intg_bl_seq=" + formObj.intg_bl_seq.value;
						paramStr+= "&f_ref_no=" + formObj.ref_no.value;
           			//#22112 Billing Carrier 추가 
						paramStr+= "&s_carr_trdp_cd=" + formObj.carr_trdp_cd.value;
						paramStr+= "&s_carr_trdp_nm=" + formObj.carr_trdp_nm.value;
						paramStr+= "&refType=fileNo";
						paramStr+= "&linkFlag=Y&blType=MBL";
						
						//#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : Link시 검색기간 제외 조회 옵션처리
						paramStr+= "&linkOpt=KEY";
						// OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
						paramStr+= "&f_air_sea_clss_cd=A&f_bnd_clss_cd=I";
		   		   		
						parent.mkNewFrame('Invoice List', paramStr);
	   	 		}
	   	 	break;
           case "HBL_ENTRY":
        		var formObj=document.frm1;
        		if(formObj.ref_no.value!=''){
        			var paramStr="./AII_BMD_0020.clt?";
        			paramStr+= "f_mbl_ref_no=" + formObj.ref_no.value;
        			parent.mkNewFrame('Booking & HBL', paramStr);
        		}
         break;
         case "PROFIT_REPORT":
	    	   var formObj=document.frm1;
	    	   var reqParam='?intg_bl_seq=' + formObj.intg_bl_seq.value;
					reqParam += '&mbl_no=' + formObj.bl_no.value;
					reqParam += '&ref_no=' + formObj.ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "A";
					reqParam += '&bnd_clss_cd=' + "I";
					reqParam += '&biz_clss_cd=' + "M";
				popGET('RPT_PRN_0180.clt'+reqParam, '', 1270, 750, "scroll:yes;status:no;help:no;");
	     break; 
		   	/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
         case "SEARCH_JB":	//Job template & History
	     	   if(frm1.bl_sts_cd.value!='NA'){
	     		//처리내역( Job temlate에 따라서)
	     		 searchGrid(10);
	     	   }
  	   		break;		     
     	 //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
         case "SEARCH_WO":	//WORK ORDER 조회
      	   if(frm1.bl_sts_cd.value!='NA'){
				   //Container List 조회
      		   searchGrid(11);
      	   }
      	   break;
         case "WORKORDER":	//Work Order 화면호출
        	 /*
	           var param='f_intg_bl_seq=' + frm1.intg_bl_seq.value;
		   		   param += '&air_sea_clss_cd=A'; 
		   		   param += '&bnd_clss_cd=I';
		   		   param += '&biz_clss_cd=M';
              var paramStr="./AIC_WOM_0016.clt?f_cmd="+SEARCH01+"&s_type=B&"+param;
              parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
              */
             var paramStr="./AIC_WOM_0016.clt?air_sea_clss_cd=A&bnd_clss_cd=I&biz_clss_cd=M";
             var param = "&f_cmd=" + SEARCH01;
             param += "&s_type=B";
             param += "&f_intg_bl_seq=" + frm1.intg_bl_seq.value;
             parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
             break;
              
		   	case "AUTHORITY":
		   		var formObj=document.frm1;
			   	if(formObj.intg_bl_seq.value != ""){
					var reqParam='?intg_bl_seq=' +formObj.intg_bl_seq.value;
					reqParam += '&ref_no=' + formObj.ref_no.value;
					reqParam += '&mbl_no=' + formObj.bl_no.value;
					reqParam += '&ref_ofc_cd=' + formObj.ref_ofc_cd.value;
					popGET('ARI_DOC_1010.clt'+reqParam, '', 700, 430, "scroll:yes;status:no;help:no;");
			   	}	
			break;
              
        }
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
    }
}
function entSearch(){
	if(event.keyCode == 13){
	//	document.frm1.f_CurPage.value = 1;
		doWork('SEARCHLIST');
	}
}
/**
 * HBL 중복 여부를 확인함
 */
function getMblCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=''){
				// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다. 
	            setPost_date("I");
	            
	            // #4794 [Binex Mex] AIM AWB Post date is missing
	            if (frm1.post_dt.value == '') { alert(getLabel('ACC_MSG125')); return false;}
	            
	            //#4940 ** [BEST OCEAN] WRONG MAWB VALIDATION & NO DUPLICATE ALLOWED
	            //2.MAWB DUPLICATE CHECK
	            if(mawb_verify_yn =='Y'){//Cannot bypass
					alert(getLabel('FMS_COM_ALT090'));//MAWB No. is duplicated! 
					return;					
				}
	            
	            //'B/L No. is duplicated. \nDo you want to create MBL?'
				if(confirm(getLabel('FMS_COM_ALT090') + "\n" + getLabel('FMS_COM_CFMCON'))){
	            	   gridAdd(0);
	            	   docObjects[0].SetCellValue(1, 1,1);
	         		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
	         		   var sndParam=getSndParam();
	         		   if(sndParam == true)	{	return false;	} 		            		   
	            	   doShowProcess();
	                   frm1.f_cmd.value=ADD;
	            	   //docObjects[0].DoAllSave("./AII_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
	            	   docObjects[0].DoAllSave("./AII_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
	        	   }
			}else if(doc[1]=='RV'){
				//'Please check B/L no.!!'
				alert(getLabel('AIR_MSG_031')+" [RV]");//확인 필요 RV 사용안함
			}else{
				// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다. 
	            setPost_date("I");
	            
	            // #4794 [Binex Mex] AIM AWB Post date is missing
	            if (frm1.post_dt.value == '') { alert(getLabel('ACC_MSG125')); return false;}
	            
				//'Do you want to create MBL?'
				if(confirm(getLabel(saveMsg))){
            	   gridAdd(0);
            	   docObjects[0].SetCellValue(1, 1,1);
            	   doShowProcess();
         		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
         		   var sndParam=getSndParam();
         		   if(sndParam == true)	{	return false;	} 	  
        		   
         		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
                   frm1.f_cmd.value=ADD;
            	   //docObjects[0].DoAllSave("./AII_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
            	   docObjects[0].DoAllSave("./AII_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
        	   }			
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//25559 NEW가 아닐시 BL중복을 체크한다.
function getMblCheckNoEmpBL(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=''){
				//중복일 경우 ERROR
				goTabSelect('01');
				frm1.bl_no.focus();
				
				//#4940 ** [BEST OCEAN] WRONG MAWB VALIDATION & NO DUPLICATE ALLOWED
	            //2.MAWB DUPLICATE CHECK
	            if(mawb_verify_yn =='Y'){//Cannot bypass 
					alert(getLabel('FMS_COM_ALT090'));//MAWB No. is duplicated!
					blDupl=true;
					return;					
				}
	            
				if(confirm(getLabel('FMS_COM_ALT090') + "\n" + getLabel('FMS_COM_CFMCON'))){
					blDupl=false;
				} else {
					blDupl=true;
				}
			}else if(doc[1]=='RV'){
				alert(getLabel('AIR_MSG_031')+" [RV]");//확인 필요 RV 사용안함
				blDupl=true;
			}else{
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function getRefNoCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				refCheck=false;
//				alert('Ref. No. is duplicate.');
				alert(getLabel('AIR_MSG_032'));
				frm1.ref_no.focus();
			}else{
				refCheck=true;
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));
		refCheck=false;
	}
}
//코드표시 Ajax
function autoMrkDesc(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj4=docObjects[4];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var rmkDescVal=rtnArr[0].split('@@^');
			frm1.mk_txt.value=rmkDescVal[0];	//Mark
			frm1.desc_txt.value=rmkDescVal[1];	//Descritpion
		}
	}
}
/**
 * BL번호 변경
 */
function chgBlNo(obj, callTp){
	if(obj.value!=''){
		var isOk=true;
		if(isOk){
			var sndParam='?f_intg_bl_seq='+frm1.intg_bl_seq.value;
			    sndParam+= '&f_bl_no='+obj.value;
			    sndParam+= '&f_biz_clss='+callTp;
			    sndParam+= '&f_air_sea_clss=A';
			var rtnary=new Array(1);
			var rtnVal=window.ComOpenWindow('./SEE_BMD_0050.clt'+sndParam, rtnary, "scroll:yes;status:no;help:no;dialogWidth:317px;dialogHeight:150px");
			if(rtnVal!=""&&typeof(rtnVal)!="undefined"){
				//frm1.f_bl_no.value = rtnVal;
				frm1.bl_no.value=rtnVal;
			}
		}
	}
}
/**
 * 화면초기화
 */
function clearScreen(){
	doShowProcess();
    frm1.f_cmd.value='';
    frm1.submit();
}
/**
 * MBL Input시
 */
function doKeyInCheck(obj){
	if(obj.checked){
//		alert('[MBL Crate]시 저장됩니다!');
		alert(getLabel('AIR_MSG_036'));
//        frm1.bl_no.className = 'search_form';
//        frm1.bl_no.readOnly  = false;
        frm1.bl_no.focus();
	}else{
		frm1.bl_no.value='';
//        frm1.bl_no.className = 'search_form-disable';
//        frm1.bl_no.readOnly  = true;
        frm1.bl_no.focus();		
	}
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	if(errMsg==''&&frm1.intg_bl_seq.value==''){
		frm1.f_intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
		frm1.intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
		frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
		frm1.sr_no.value=docObjects[0].GetCellValue(1, "sv_sr_no");
		//frm1.f_bl_no.value     = docObjects[0].CellValue(1, "sv_bl_no");
		//frm1.mbl_chk.value     = docObjects[0].CellValue(1, "sv_bl_no");
		frm1.ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
		frm1.f_ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
//		frm1.sel_ref_no.value     = docObjects[0].CellValue(1, "sv_ref_no");
//		frm1.ref_no.className = 'search_form-disable';
//		frm1.ref_no.readOnly  = true;
	}else if(frm1.f_bl_no.value==''){
		frm1.f_bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
		//frm1.mbl_chk.value     = docObjects[0].CellValue(1, "sv_bl_no");
		frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
	}else{
		frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
	}
	
	// 처리후에 org_etd_dt_tm/org_eta_dt_tm 을  설정해준다. 
	frm1.org_etd_dt_tm.value=frm1.etd_dt_tm.value;
	frm1.org_eta_dt_tm.value=frm1.eta_dt_tm.value;
	
	//25559 중복 체크를 위해 h_bl_no에 현재 bl_no저장
	frm1.h_bl_no.value=frm1.bl_no.value;
	frm1.ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
	frm1.f_ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
	//LHK, 20131028 setPost_date(save_flag) 추가 비교 로직으로 인해 저장 후 org_post_dt reset
	frm1.org_post_dt.value=frm1.post_dt.value;
	
	//#2068 - Document 번호 Title 에 반영
	setTabTitle(frm1.ref_no.value);
	
	if(hblListSheet){
		doWork('SEARCHLIST01');		
	}
	if(docListSheet){
		doWork('SEARCH_DOC');
	}
	if(frtSdSheet){
		searchGrid(7);
	}
	if(frtBcSheet){
		searchGrid(8);
	}
	if(frtDcSheet){
		searchGrid(9);
	}
	//#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
	doWork('SEARCHLIST');	
	//버튼 초기화
	btnLoad();
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	
	//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
	//조회
	chkIntgBlModiTms("VIEW");
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
function gridAdd(objIdx){
	fnSetIBsheetInit(objIdx);   //grid가 생성되지않았으면 생성(속도개선)
	var intRows=docObjects[objIdx].LastRow() + 1;
//	intRows--;
	docObjects[objIdx].DataInsert(intRows);
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	        var cal=new ComCalendar();
	        cal.select(obj, 'MM-dd-yyyy');
	    break;
    }
}
/**
 * 파일목록 조회시. 3번째 Sheet를 리턴함.
 */
function getSelectedFiles(){
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[2];
}
//--------------------------------------------------------------------------------------------------------------
//                                             Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 
	if(comIBSheetWaitChk()== false){ return;}
	
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	frm1.f_isNumSep.value=isNumSep;		
	var tabObjs=document.getElementsByName('tabLayer');
    if( isNumSep == "01" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='inline';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
        
        //comSheetObject('sheet2');
        fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
        
	    //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
	//Mark Description 탭
    } else if( isNumSep == "02" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="inline";
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
	//Shipping Document 탭
    } else if( isNumSep == "03" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="none";
        tabObjs[2].style.display="inline";
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
        
        //comSheetObject('sheet7');comSheetObject('sheet9');comSheetObject('sheet8');
        fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        //BL_COPY
        var copy_bl_seq = frm1.copy_bl_seq.value;
		if (copy_bl_seq == "") {
	        if(tab3click== ""){
		        tab3click= "Y";
		        doWork('SEARCH_FRT');
	    	}
		}
    //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
    //Work Order
    }else if( isNumSep == "04" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="none";
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='inline';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
        
        //comSheetObject('sheet12');
        fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
        
        if(tab6click== ""){
	        tab6click="Y";
	        doWork('SEARCH_WO');
    	}
    //Shipping Document 탭
    }else if( isNumSep == "05" ) {
    	currTab=isNumSep;	//탭상태저장
	    tabObjs[0].style.display='none';
	    tabObjs[1].style.display='none';
	    tabObjs[2].style.display='none';
	    tabObjs[3].style.display='none';
	    tabObjs[4].style.display='inline';
	    tabObjs[5].style.display='none';
	    
	    //comSheetObject('sheet3');
	    fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	    
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        if(tab4click == ""){
        	tab4click="Y";
        	doWork('SEARCH_DOC');
        }
    /* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 - add status tab */
    //}
    }else if( isNumSep == "06" ) {
		currTab=isNumSep;	//탭상태저장
	    tabObjs[0].style.display='none';
	    tabObjs[1].style.display='none';
	    tabObjs[2].style.display='none';
	    tabObjs[3].style.display='none';
	    tabObjs[4].style.display='none';
	    tabObjs[5].style.display='inline';
	    
	    //comSheetObject('sheet11');
	    fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	    
	    if(tab5click== ""){
	    	tab5click="Y";
	        doWork('SEARCH_JB');
		}
	    //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
    }
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
var isRun = true;
//#2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가
var bl_inv_auto_creation ="";

//#4940 ** [BEST OCEAN] WRONG MAWB VALIDATION & NO DUPLICATE ALLOWED
var mawb_verify_yn = "";
function loadPage() {
	//OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN
	ajaxSendPost(setUserTeamInfo, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=opr_team&issued_by="+frm1.opr_usrid.value, "./GateServlet.gsl");
	// Flight Date wording setting (#48642)
	var opt_key = "FLIGHT_DT_TXT";
	ajaxSendPost(setFlightDtTxt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	/* #2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가 */
	var opt_key = "BL_INV_AUTO_CREATION";
	ajaxSendPost(setBlInvAutoCreation, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#4940 ** [BEST OCEAN] WRONG MAWB VALIDATION & NO DUPLICATE ALLOWED
	var opt_key = "MAWB_VERIFY_YN";
	ajaxSendPost(setMawbVerifyYn,"reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	/* 속도개선 주석처리 
    for(var i=0;isRun && i<docObjects.length;i++){
    	//console.log(docObjects[i].id +' / ' + i);
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
        if(i == docObjects.length - 1){
        	isRun = false;
        }
    }
    */
	
    //#2504 [PATENT]Debit Note & AP for billing code based invoices
    if(bl_inv_auto_creation == "Y"){
    	getObj("spanARprint").style.display = "inline";
    	getObj("spanAPprint").style.display = "inline";
    }
    
    frm1.pck_qty.value=doMoneyFmt(Number(frm1.pck_qty.value).toFixed(0));
    frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(1));
    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(1));
    frm1.chg_wgt.value=doMoneyFmt(Number(frm1.chg_wgt.value).toFixed(1));
    frm1.chg_wgt1.value=doMoneyFmt(Number(frm1.chg_wgt1.value).toFixed(1));
    frm1.vol_wgt.value=doMoneyFmt(Number(frm1.vol_wgt.value).toFixed(1));
    frm1.vol_meas.value=doMoneyFmt(Number(frm1.vol_meas.value).toFixed(6));
    frm1.ctrb_mgn.value=doMoneyFmt(Number(frm1.ctrb_mgn.value).toFixed(2));
    checkBoxSetting();
    
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	goTabSelect(frm1.f_isNumSep.value);       
    if(frm1.intg_bl_seq.value==''){
    	frm1.ref_no.value="AUTO";
    	//frm1.frt_term_cd.value = 'PP';
    	
    	//#48588 [Webtrans][게시판#9] AE PACKAGE TYPE INPUT
    	//#22
    	if(frm1.copy_bl_seq.value == ""){
    		setPckUtCd();
    	}
    	//frm1.pck_ut_cd.value="CT";
    }
	//st_hear.style.display 		= 'block';
//	if(frm1.h_post_dt_imp.value != null && frm1.h_post_dt_imp.value == 'D-ETA')
//	{
//		st_hear.style.display='none';
//		st_hear_r.style.display='inline';		
//	}else{
//		//alert("aaa");
//		st_hear_r.style.display='none';
//		st_hear.style.display='inline';
//	}   
	
	//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
	//조회
	chkIntgBlModiTms("VIEW");
	
	if(user_ofc_cnt_cd == "KR"){
    	$("[id=trKrOnlyWh]").show();
    }
	
	// #4680 [CLA] Blocked file doesn't give Accounting Closed validation
    if(frm1.bl_sts_cd.value=='HO' || frm1.bl_sts_cd.value=='HF'){
    	// "Accounting Closed! Data that affects accounting or profit cannot be changed."
    	alert(getLabel('AIR_MSG_120'));	
    }
	
	setTimeout("document.frm1.f_ref_no.focus();", 1000);
	
    /* 2016-12-21 자동완성 기능 추가 S */
    fnSetAutocomplete('shpr_trdp_nm'	, 'LINER_POPLIST', 'shipper', 'A'); //Shipper  
    fnSetAutocomplete('cnee_trdp_nm'	, 'LINER_POPLIST', 'consignee', 'A'); //Consignee
    fnSetAutocomplete('lnr_trdp_nm'		, 'LINER_POPLIST_M', 'liner', 'A'); //Carrier 
    fnSetAutocomplete('carr_trdp_nm'	, 'LINER_POPLIST', 'carr', 'A'); //Billing Carrier 
    fnSetAutocomplete('pol_nm'			, 'LOCATION_POPLIST', 'pol', 'A'); //Departure 
    fnSetAutocomplete('fst_to_nm'		, 'LOCATION_POPLIST', 'fst', 'A'); //First To	
    fnSetAutocomplete('first_port_nm'	, 'LOCATION_POPLIST', 'first'); //First Port of Entry	
    fnSetAutocomplete('pod_nm'			, 'LOCATION_POPLIST', 'air_des', 'A'); //Destination     
    fnSetAutocomplete('frt_loc_nm'	, 'LINER_POPLIST', 'frt_loc', 'A'); //Freight Location	   
    fnSetAutocomplete('agent_trdp_nm'	, 'LINER_POPLIST', 'agent', 'A'); //Forwarding Agent	
    /* 2016-12-21 자동완성 기능 추가 E */   
    
	/* operation 권한이 없는 경우 */   
    var formObj=document.frm1;
	var objDisable = false; 
	if (uod_flg == "N"){ 		
		objDisable = true;		
		if (formObj.opr_usrid.value ==""){
			formObj.opr_usrid.value=usrId;
			formObj.opr_usrnm.value=usrNm;
			formObj.opr_ofc_cd.value=ofc_cd;
			formObj.opr_dept_cd.value=usrDept;
		}
		if (formObj.sls_usrid.value ==""){
			formObj.sls_usrid.value=usrId;
			formObj.sls_usr_nm.value=usrNm;
			formObj.sls_dept_cd.value=usrDept;
		}
		formObj.opr_usrid.disabled = objDisable; 
		$("#oprBtn").prop('disabled', objDisable);    	
		
		formObj.sls_usrid.disabled = objDisable; 
		$("#salesperson").prop('disabled', objDisable);  
		
	}
	
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
    
    //#2586 [BNX US] COD, CREDIT HOLD ACCOUNTS NO WARNING
    if(frm1.intg_bl_seq.value != ''){
//    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, false) : "";
//    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, false) : "";
//    	(formObj.lnr_trdp_cd.value != "") ? chkCodOnLoad("liner", formObj.lnr_trdp_cd.value, false) : "";
//    	(formObj.carr_trdp_cd.value != "") ? chkCodOnLoad("carr", formObj.carr_trdp_cd.value, false) : "";
//    	(formObj.frt_loc_cd.value != "") ? chkCodOnLoad("frt_loc", formObj.frt_loc_cd.value, false) : "";
    }else{
    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, true) : "";
    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, true) : "";
    	(formObj.lnr_trdp_cd.value != "") ? chkCodOnLoad("liner", formObj.lnr_trdp_cd.value, true) : "";
    	(formObj.carr_trdp_cd.value != "") ? chkCodOnLoad("carr", formObj.carr_trdp_cd.value, true) : "";
    	(formObj.frt_loc_cd.value != "") ? chkCodOnLoad("frt_loc", formObj.frt_loc_cd.value, true) : "";
    }
	//OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
	if (eblfn_flg != 'Y') {
		formObj.ref_no.disabled = true;
	}
    
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
		break;
		case "sheet2":
			docObjects[1]=sheet_obj;
		break;
		case "sheet3":
			docObjects[2]=sheet_obj;
		break;
		case "sheet7":
			docObjects[3]=sheet_obj;
		break;
		case "sheet8":
			docObjects[4]=sheet_obj;
		break;
		case "sheet9":
			docObjects[5]=sheet_obj;
		break;
		/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
		case "sheet11":
			docObjects[6]=sheet_obj;
			break;	
		//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
		case "sheet12":
			docObjects[7]=sheet_obj;
			break;
	}
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */

function setFieldValue(obj, value){
	if($(obj).is("select") || $(obj).is("input:radio") || $(obj).is("input:checkbox")){
		if(value != ""){
			$(obj).val(value);
		}
	}else {
		$(obj).val(value);
	}
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_ref_no.value = getParam(url,"f_ref_no");
	
	doWork('SEARCHLIST');
}

function submitForm(cmd){
	 var formObj=document.frm1;
	 formObj.f_cmd.value=cmd;
	 doShowProcess();
	 for(var i=0;i<docObjects.length;i++) {
	  docObjects[i].RemoveAll();
	 }
	 $.ajax({
	     type: "POST",
	     url: "./AII_BMD_0040AJ.clt",
	     dataType: 'xml',
	     data: $("form" ).serialize(),
	     success: function(data){
	    	 setFieldValue( formObj.bl_sts_cd, $('bl_sts_cd',data).text());
	    	 setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
	    	 setFieldValue( formObj.sr_no, $('sr_no',data).text());
	    	 setFieldValue( formObj.f_intg_bl_seq, $('f_intg_bl_seq',data).text());
	    	 setFieldValue( formObj.mk_bl_no, $('bl_no',data).text());
	    	 setFieldValue( formObj.h_bl_no, $('bl_no',data).text());
	    	 setFieldValue( formObj.sel_ref_no, $('ref_no',data).text());
	    	 setFieldValue( formObj.org_post_dt, $('post_dt',data).text());
	    	 setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());
	    	 setFieldValue( formObj.f_ref_no, $('f_ref_no',data).text());
	    	 setFieldValue( formObj.f_bl_no, $('f_bl_no',data).text());
	    	 setFieldValue( formObj.ref_no, $('ref_no',data).text());
	    	 setFieldValue( formObj.ref_ofc_cd, $('ref_ofc_cd',data).text());
	    	 setFieldValue( formObj.h_ref_ofc_cd, $('ref_ofc_cd',data).text());
	    	 setFieldValue( formObj.h_post_dt_imp, $('i_post_dt_imp',data).text());
	    	 setFieldValue( formObj.bl_no, $('bl_no',data).text());
	    	 setFieldValue( formObj.mrn_no, $('mrn_no',data).text());
	    	 setFieldValue( formObj.bl_ser_no, $('bl_ser_no',data).text());
	    	 setFieldValue( formObj.hbl_tp_cd, $('hbl_tp_cd',data).text());
	    	 setFieldValue( formObj.post_dt, $('post_dt',data).text());
	    	 setFieldValue( formObj.imp_ref_no, $('imp_ref_no',data).text());
	    	 setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
	    	 setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
	    	 setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
	    	 setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
	    	 setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
	    	 setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
	    	 setFieldValue( formObj.manifest_to, $('manifest_to',data).text());
	    	 setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
	    	 setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
	    	 setFieldValue( formObj.obrd_dt_tm, $('obrd_dt_tm',data).text());
	    	 setFieldValue( formObj.flt_no, $('flt_no',data).text());
	    	 setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
	    	 setFieldValue( formObj.org_etd_dt_tm, $('etd_dt_tm',data).text());
	    	 setFieldValue( formObj.etd_tm, $('etd_tm',data).text());
	    	 setFieldValue( formObj.eta_fpoe_tm, $('eta_fpoe_tm',data).text());
	    	 setFieldValue( formObj.fpoe_tm, $('fpoe_tm',data).text());
	    	 setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
	    	 setFieldValue( formObj.org_eta_dt_tm, $('eta_dt_tm',data).text());
	    	 setFieldValue( formObj.eta_tm, $('eta_tm',data).text());
	    	 setFieldValue( formObj.f_eta_dt_tm, $('f_eta_dt_tm',data).text());
	    	 setFieldValue( formObj.org_f_eta_dt_tm, $('f_eta_dt_tm',data).text());
	    	 setFieldValue( formObj.f_eta_tm, $('f_eta_tm',data).text());
	    	 setFieldValue( formObj.carr_trdp_cd, $('carr_trdp_cd',data).text());
	    	 setFieldValue( formObj.carr_trdp_nm, $('carr_trdp_nm',data).text());
	    	 setFieldValue( formObj.carr_trdp_addr, $('carr_trdp_addr',data).text());
	    	 setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
	    	 setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
	    	 setFieldValue( formObj.pol_nod_cd, $('pol_nod_cd',data).text());
	    	 setFieldValue( formObj.ts1_port_cd, $('ts1_port_cd',data).text());
	    	 setFieldValue( formObj.ts1_flt_no, $('ts1_flt_no',data).text());
	    	 setFieldValue( formObj.ts2_port_cd, $('ts2_port_cd',data).text());
	    	 setFieldValue( formObj.ts2_flt_no, $('ts2_flt_no',data).text());
	    	 setFieldValue( formObj.ts3_port_cd, $('ts3_port_cd',data).text());
	    	 setFieldValue( formObj.ts3_flt_no, $('ts3_flt_no',data).text());
	    	 setFieldValue( formObj.first_port_cd, $('first_port_cd',data).text());
	    	 setFieldValue( formObj.first_port_nm, $('first_port_nm',data).text());
	    	 setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
	    	 setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
	    	 setFieldValue( formObj.pod_nod_cd, $('pod_nod_cd',data).text());
	    	 setFieldValue( formObj.last_port_cd, $('last_port_cd',data).text());
	    	 setFieldValue( formObj.frt_loc_cd, $('frt_loc_cd',data).text());
	    	 setFieldValue( formObj.frt_loc_nm, $('frt_loc_nm',data).text());
	    	 setFieldValue( formObj.cfs_nod_cd, $('cfs_nod_cd',data).text());
	    	 setFieldValue( formObj.cfs_loc_nm, $('cfs_loc_nm',data).text());
			 setFieldValue( formObj.cfs_loc_cd, $('cfs_loc_cd',data).text());
	    	 setFieldValue( formObj.sto_start_dt, $('sto_start_dt',data).text());
	    	 setFieldValue( formObj.rep_cmdt_cd, $('rep_cmdt_cd',data).text());
	    	 setFieldValue( formObj.rep_cmdt_nm, $('rep_cmdt_nm',data).text());
	    	 setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
	    	 setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
	    	 setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
	    	 setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
	    	 setFieldValue( formObj.chg_wgt, $('chg_wgt',data).text());
	    	 setFieldValue( formObj.chg_wgt1, $('chg_wgt1',data).text());
	    	 setFieldValue( formObj.vol_wgt, $('vol_wgt',data).text());
	    	 setFieldValue( formObj.vol_meas, $('vol_meas',data).text());
	    	 setFieldValue( formObj.frt_term_cd, $('frt_term_cd',data).text());
	    	 setFieldValue( formObj.curr_cd, $('curr_cd',data).text());
	    	 setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
	    	 setFieldValue( formObj.bl_iss_dt, $('bl_iss_dt',data).text());
	    	 setFieldValue( formObj.opr_usrid, $('issued_by',data).text());
	    	 setFieldValue( formObj.opr_usrnm, $('proc_usrnm',data).text());
	    	 setFieldValue( formObj.opr_ofc_cd, $('proc_ofccd',data).text());
	    	 setFieldValue( formObj.opr_dept_cd, $('proc_dept_cd',data).text());
	    	 setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
	    	 setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
	    	 setFieldValue( formObj.sls_usr_nm, $('sls_usr_nm',data).text());
	    	 setFieldValue( formObj.sls_dept_cd, $('sls_dept_cd',data).text());
	    	 setFieldValue( formObj.ccn_no, $('ccn_no',data).text());
	    	 setFieldValue( formObj.mnf_fr_loc, $('mnf_fr_loc',data).text());
	    	 setFieldValue( formObj.mnf_to_loc, $('mnf_to_loc',data).text());
	    	 setFieldValue( formObj.hndl_info_txt, $('hndl_info_txt',data).text());
	    	 setFieldValue( formObj.mk_txt, $('mk_txt',data).text());
	    	 setFieldValue( formObj.desc_txt, $('desc_txt',data).text());
	    	 setFieldValue( formObj.ctrb_ofc_cd, $('ctrb_ofc_cd',data).text());
			 setFieldValue( formObj.ctrb_dept_cd, $('ctrb_dept_cd',data).text());
			 setFieldValue( formObj.ctrb_ratio_yn, $('ctrb_ratio_yn',data).text());
			 setFieldValue( formObj.ctrb_mgn, $('ctrb_mgn',data).text());
	    	 //setFieldValue( formObj.xcrtDt, $('obrd_dt_tm',data).text());
			 var obrddttm = $('obrd_dt_tm',data).text().replaceAll('-','');
			 setFieldValue( formObj.xcrtDt, obrddttm);
			   
	    	 if($('frt_term_cd',data).text()==""){
	    		 frm1.frt_term_cd.value = "CC";
	    	 }else{
	    		 setFieldValue( formObj.frt_term_cd, $('frt_term_cd',data).text());
	    	 }
	    	 
			 setFieldValue( formObj.f_modify, $('f_modify',data).text()); //#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED  
			 
			 //#1041 [BNX Vietnam] A/R Entry does not show any information from AIH
			 setFieldValue( formObj.agent_trdp_cd, $('agent_trdp_cd',data).text());
			 setFieldValue( formObj.agent_trdp_nm, $('agent_trdp_nm',data).text());
			 setFieldValue( formObj.agent_trdp_addr, $('agent_trdp_addr',data).text());

			 /*#657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL*/
			 $('#inter_use_flag').attr("value", "");
			 setFieldValue( formObj.inter_use_flag, $('inter_use_flag',data).text());
			 
	    	 doBtnAuthority(attr_extension);
	    	 tab1click="";
	    	 tab2click="";
	    	 tab3click="";
	    	 tab4click="";
	    	 tab5click="";
	    	 tab6click="";
	    	 setupPage();
		     doHideProcess();
		     if(delete_show_complete == "Y"){
		    	 showCompleteProcess();
		    	 delete_show_complete = "N";
		     }
	     },
	     error: function(){
	      doHideProcess();
	      alert("System Error!");
	     }
	   });
	}

function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:     
		with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AII_BMD_0040_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_intg_bl_seq" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_sr_no" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_no" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_cd" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_ref_no" } ];
	         
	        InitColumns(cols);
	        SetEditable(1);
	        SetVisible(false);
		}
        break;
		case 2:     //HBL List
			with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('AII_BMD_0040_HDR2'), Align:"Center"} ];
		        InitHeaders(headers, info);

	        var cols = [ {Type:"Seq",     Hidden:0,  Width:35,   Align:"Center",  ColMerge:0,   SaveName:"seq" },
	               {Type:"Text",      Hidden:1, Width:110,  Align:"Left",    ColMerge:0,   SaveName:"hbl_bkg_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,   Align:"Left",    ColMerge:0,   SaveName:"hbl_bl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"hbl_act_shipper",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"hbl_shpr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"hbl_cnee_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_prnr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"hbl_lnr_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_trnk_vsl",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"hbl_trnk_voy",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"hbl_obrd_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_del_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_del_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_del_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_rep_cmdt_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_rep_cmdt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"hbl_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pck_ut_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pck_ut_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"hbl_meas",           KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:4,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_meas_ut_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"hbl_grs_wgt",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_grs_wgt_ut_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_act_wgt",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_act_wgt_ut_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"cfm_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"clz_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"hbl_cntr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_intg_bl_seq" },
	               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_ibflag" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_lnr_trdp_cd" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_shpr_trdp_nm" },
	               {Type:"Text",      Hidden:1, Width:20,   Align:"Center",  ColMerge:0,   SaveName:"del_icon" } ];
	         
	        InitColumns(cols);

	        SetCountPosition(0);
	        SetEditable(0);
	        SetImageList(0,APP_PATH+"/web/img/main/trash.gif");
	        sheetObj.SetDataLinkMouse("del_icon",1);
	        InitViewFormat(0, "hbl_obrd_dt_tm", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        SetSheetHeight(200);
	        //sheetObj.SetFocusAfterProcess(0);
           }                                                      
	    break;
	    case 3:					//첨부파일
	        with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('AII_BMD_0040_HDR3'), Align:"Center"} ];
		        InitHeaders(headers, info);

	        var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
	               {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"Del",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"palt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:0,   SaveName:"palt_ext_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:140,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:480,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_img_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_pdf_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq_d",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	         
	        InitColumns(cols);

	        SetCountPosition(0);
	        SetEditable(1);
	        SetImageList(0,APP_PATH+"/web/img/button/bt_img.gif");
	        SetImageList(1,APP_PATH+"/web/img/button/bt_pdf.gif");
	        sheetObj.SetDataLinkMouse("palt_doc_nm",1);
	        sheetObj.SetDataLinkMouse("palt_doc_img_url",1);
	        sheetObj.SetDataLinkMouse("palt_doc_pdf_url",1);
	        SetSheetHeight(400);
	       }                                                      
	   break;
	   case 4:      //Selling/Debit 탭부분 init
		   if(MULTI_CURR_FLAG == "Y"){	//Muti Currency
			    with(sheetObj){
			        var cnt=0;

			        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

			        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			        var headers = [ { Text:getLabel('AII_BMD_0040_HDR4_3'), Align:"Center"},
			                    { Text:getLabel('AII_BMD_0040_HDR4_4'), Align:"Center"} ];
			        InitHeaders(headers, info);

			        var cols = [ 
			               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
			               {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
			               
			               {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
			               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			               {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			               
//			               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			               
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			               
//			               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			               {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
			               {Type:"Float", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			               {Type:"Image", Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			               
			               {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			               {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
         	               //#2504 [PATENT]Debit Note & AP for billing code based invoices	
          	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"fr_cmb_inv_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_auto_trf_flg" },
			               {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_frt_ask_clss_cd" },
			               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_due_dt" },
			               {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
          	                //<!-- #2504 [PATENT]Debit Note & AP for billing code based invoices -->
          	               {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_cmb_inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
			               
			               ];
			         
			        InitColumns(cols);
			        SetEditable(1);
			        SetHeaderRowHeight(20 );
			        SetHeaderRowHeight(21);
			  	  SetColProperty('fr_frt_cd', {ComboText:ARFRTCD2, ComboCode:ARFRTCD1} );
			  	  SetColProperty('fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
			  	  SetColProperty('fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
			  	  SetColProperty('fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
			  	  SetColProperty('fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
			  	  SetColProperty('fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
			  	SetColProperty(0 ,"fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
			          SetSheetHeight(150);
			          InitComboNoMatchText(1,"",1);
			          SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
			          
                   	  //#2504 [PATENT]Debit Note & AP for billing code based invoices
                   	  if(bl_inv_auto_creation == "Y"){
                   		 SetColHidden("fr_cmb_inv_no", 0);
                   	  }			          
			        }
		   }else{
           with (sheetObj) {
		         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1, TabStop:0 } );
		         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		         var headers = [ { Text:getLabel('AII_BMD_0040_HDR4_1'), Align:"Center"},
		                     { Text:getLabel('AII_BMD_0040_HDR4_2'), Align:"Center"} ];
		         InitHeaders(headers, info);

		         var cols = [ 
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		                {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		                
		                {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
		                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
		                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
		                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
		                {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		                
//		                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//		                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		                
		                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		                {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
		                
//		                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//		                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
		                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		                {Type:"Image",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
		                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
		                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
		                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:80,   Align:"Center",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
      	                //#2504 [PATENT]Debit Note & AP for billing code based invoices	
       	                {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"fr_cmb_inv_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_auto_trf_flg" },
		                {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_frt_ask_clss_cd" },
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_due_dt" },
		                {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
		                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
       	                //<!-- #2504 [PATENT]Debit Note & AP for billing code based invoices -->
       	                {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_cmb_inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
		                
		                ];
		          
		         InitColumns(cols);
		         SetEditable(1);
		         SetHeaderRowHeight(20 );
		         SetHeaderRowHeight(21);
		         SetColProperty('fr_frt_cd', {ComboText:ARFRTCD2, ComboCode:ARFRTCD1} );
		         SetColProperty('fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
		         SetColProperty('fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
		         SetColProperty('fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
		         SetColProperty('fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
		         SetColProperty(0 ,"fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
		         
				 SetSheetHeight(150);
				 InitComboNoMatchText(1,"",1);
				 SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
				 
              	  //#2504 [PATENT]Debit Note & AP for billing code based invoices
              	  if(bl_inv_auto_creation == "Y"){
              		 SetColHidden("fr_cmb_inv_no", 0);
              	  }
              	  
          }    
		   }
      break;
      //Freight
      case 5:      //Buying/Credit 탭부분 init
    	  if(MULTI_CURR_FLAG == "Y"){	//Muti Currency 
    		    with(sheetObj){
    		        var cnt=0;

    		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

    		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    		        var headers = [ { Text:getLabel('AII_BMD_0040_HDR5_3'), Align:"Center"},
    		                    { Text:getLabel('AII_BMD_0040_HDR5_4'), Align:"Center"} ];
    		        InitHeaders(headers, info);

    		        var cols = [ 
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    		               {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    		               
    		               {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    		               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    		               {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    		               
//    		               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    		               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    		               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    		               
    		               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    		               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		               
//    		               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    		               {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		               {Type:"Float", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		               {Type:"Image", Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    		               
    		               {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_xcrt_dt",      KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		               {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
         	               //#2504 [PATENT]Debit Note & AP for billing code based invoices	
         	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_cmb_inv_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_auto_trf_flg" },
    		               {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_frt_ask_clss_cd" },
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_due_dt" },
    		               {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" },
          	              //<!-- #2504 [PATENT]Debit Note & AP for billing code based invoices -->
          	               {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cmb_inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
    		               
    		               ];
    		         
    		        InitColumns(cols);
    		        SetEditable(1);
    		        SetHeaderRowHeight(20 );
    		        SetHeaderRowHeight(21);
    		  	  SetColProperty('b_fr_frt_cd', {ComboText:APFRTCD2, ComboCode:APFRTCD1} );
    		  	  SetColProperty('b_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    		  	  SetColProperty('b_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
    		  	  SetColProperty('b_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
    		  	  SetColProperty('b_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    		  	  SetColProperty('b_fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    		  	SetColProperty(0 ,"b_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
    		          SetSheetHeight(150);
    		          InitComboNoMatchText(1,"",1);
    		          SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
    		          
                   	  //#2504 [PATENT]Debit Note & AP for billing code based invoices
                   	  if(bl_inv_auto_creation == "Y"){
                   		 SetColHidden("b_fr_cmb_inv_no", 0);
                   	  }    		          
    		        }
    	  }else{
          with (sheetObj) {
    	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1, TabStop:0 } );
    	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	        var headers = [ { Text:getLabel('AII_BMD_0040_HDR5_1'), Align:"Center"},
    	                    { Text:getLabel('AII_BMD_0040_HDR5_2'), Align:"Center"} ];
    	        InitHeaders(headers, info);

    	        var cols = [ 
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	               {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	               
    	               {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	               {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	               
//    	               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	               
    	               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	               
//    	               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	               {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	               {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	               {Type:"Image",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	               
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
     	               //#2504 [PATENT]Debit Note & AP for billing code based invoices	
      	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_cmb_inv_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_auto_trf_flg" },
    	               {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_frt_ask_clss_cd" },
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_due_dt" },
    	               {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" } ,
      	               //<!-- #2504 [PATENT]Debit Note & AP for billing code based invoices -->
      	               {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cmb_inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
    	               
    	               ];
    	         
    	        InitColumns(cols);
    	        SetEditable(1);
    	        SetHeaderRowHeight(20 );
    	        SetHeaderRowHeight(21);
    	        SetColProperty('b_fr_frt_cd', {ComboText:APFRTCD2, ComboCode:APFRTCD1} );
    	    	SetColProperty('b_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    	    	SetColProperty('b_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
    	    	SetColProperty('b_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
    	    	SetColProperty('b_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    	    	SetColProperty(0 ,"b_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
    	    	SetSheetHeight(150);
    	    	InitComboNoMatchText(1,"",1);
    	    	SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
    	    	
             	  //#2504 [PATENT]Debit Note & AP for billing code based invoices
             	  if(bl_inv_auto_creation == "Y"){
             		 SetColHidden("b_fr_cmb_inv_no", 0);
             	  }    	    	
           }            
    	  }
       break;
      case 6:      //Buying/Credit 탭부분 init
    	  if(MULTI_CURR_FLAG == "Y"){	//Muti Currency 
    	      with(sheetObj){
    	          var cnt=0;

    	          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1 } );

    	          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	          var headers = [ { Text:getLabel('AII_BMD_0040_HDR6_3'), Align:"Center"},
    	                    { Text:getLabel('AII_BMD_0040_HDR6_4'), Align:"Center"} ];
    	          InitHeaders(headers, info);

    	          var cols = [ 
    	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	              {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	              {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	              
    	              {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	              {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	              {Type:"Float",     Hidden:1,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	              {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	              {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	              
//    	              #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	              
    	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	              
//    	              #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	              {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	              {Type:"Float", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	              {Type:"Image", Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	              
    	              {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	              {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_auto_trf_flg" },
    	              {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	              {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	              {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_frt_ask_clss_cd" },
    	              {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_due_dt" },
    	              {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 } ];
    	           
    	          InitColumns(cols);
    	          SetEditable(1);
    	          SetHeaderRowHeight(20 );
    	          SetHeaderRowHeight(21);
    	 		 SetColProperty('dc_fr_frt_cd', {ComboText:DCFRTCD2, ComboCode:DCFRTCD1} );
    	 	     SetColProperty('dc_fr_sell_buy_tp_cd', {ComboText:"Debit|Credit", ComboCode:"D|C"} );
    	 	     SetColProperty('dc_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    	 	     SetColProperty('dc_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
    	 	     SetColProperty('dc_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
    	 	     SetColProperty('dc_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    	 	     SetColProperty('dc_fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    	 	    SetColProperty(0 ,"dc_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
    	             SetSheetHeight(150);
    	             InitComboNoMatchText(1,"",1);
    	             SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
    	          }
    	  }else{
          with (sheetObj) {
    	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1, TabStop:0 } );
    	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	        var headers = [ { Text:getLabel('AII_BMD_0040_HDR6_1'), Align:"Center"},
    	                    { Text:getLabel('AII_BMD_0040_HDR6_2'), Align:"Center"} ];
    	        InitHeaders(headers, info);
    	        var cols = [ 
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	               {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	               
    	               {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	               {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	               {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	               
//    	               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	               
    	               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	               
//    	               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	               {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	               {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	               {Type:"Image",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	               
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_auto_trf_flg" },
    	               {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_frt_ask_clss_cd" },
    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_due_dt" },
    	               {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 } ];
    	         
    	        InitColumns(cols);
    	        SetEditable(1);
    	        SetHeaderRowHeight(20 );
    	        SetHeaderRowHeight(21);
    	        SetColProperty('dc_fr_frt_cd', {ComboText:DCFRTCD2, ComboCode:DCFRTCD1} );
		    	SetColProperty('dc_fr_sell_buy_tp_cd', {ComboText:"Debit|Credit", ComboCode:"D|C"} );
		    	SetColProperty('dc_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
		    	SetColProperty('dc_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
		    	SetColProperty('dc_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
		    	SetColProperty('dc_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
		    	SetColProperty(0 ,"dc_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
		    	SetSheetHeight(150);
		    	InitComboNoMatchText(1,"",1);
		    	SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
           }     
    	  }
       break;
  	  /* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
      case 7:      //HISTORY
      with (sheetObj) {
          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
          var headers = [ { Text:getLabel("AIE_BMD_0020_HDR11"), Align:"Center"} ];
          InitHeaders(headers, info);

          var cols = [ {Type:"Float",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cng_seq" },
                 {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"itm_lbl" },
                 {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"bfr_cng_txt" },
                 {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"bfr_cng_txt" },
                 {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"rgst_usrid" },
                 {Type:"Date",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0, Format:"YmdHm", SaveName:"rgst_tms" } ];
           
          InitColumns(cols);
          SetEditable(0);
          SetSheetHeight(200);
		  }                                                      
		  break;
		  //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
	      //Pickup/WorkOrder 그리드        
	      case 8:
            with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIE_BMD_0020_HDR5_1'), Align:"Center"}];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"wo_seq" },
	               {Type:"Text",     Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"wo_no" },
	               {Type:"Combo",     Hidden:0, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"wo_status" },
	               {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"pickup_trdp_nm" },
	               {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"delivery_trdp_nm" },
	               {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"return_trdp_nm" },
	               {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"trucker_trdp_nm" },
	               {Type:"Float",    Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"act_wgt_k" , Format:"Float",       PointCount:2} ];
	         
	        InitColumns(cols);

	        SetEditable(0);
	        SetColProperty('wo_status', {ComboText:"SAVED|ISSUED", ComboCode:"A|B"} );
	        SetSheetHeight(400);
           }                                                      
        break;
    }
}

function sheet2_OnSearchEnd(sheetObj, row, col) {
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

/**
 * HBL표시
 */
function sheet2_OnDblClick(sheetObj,Row,Col){
var hblNo=sheetObj.GetCellValue(Row, 'hbl_bl_no');
//OFVFOUR-7951: [JAPT] OPUS down 03/29/2022
var hblSeq=sheetObj.GetCellValue(Row, 'hbl_intg_bl_seq');
	if(hblNo!=''||hblSeq!=''){
	   	var paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+hblNo+"&f_intg_bl_seq="+encodeURIComponent(hblSeq);
	   	parent.mkNewFrame('Booking & House AWB Entry', paramStr);
	}
}
//########################## 첨부문서 ##########################
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet3_OnDblClick(sheetObj,Row,Col){
	//Name선택 시에만 팝업 호출
	if(sheetObj.ColSaveName(Col)=='palt_doc_no' || sheetObj.ColSaveName(Col)=='palt_doc_msg'){
		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
		reqParam += '&s_palt_doc_seq='+sheetObj.GetCellValue(Row,"palt_doc_seq");
		reqParam += '&openMean='+SEARCH02;
		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDocUp', 806, 550, "scroll:no;status:no;help:no;");
	}
}
function sheet3_OnMouseMove(sheetObj, row, col){
	if(sheetObj.MouseCol()==9){
//no support[check again]CLT 		sheetObj.ToolTipOption="balloon:true;width:320;backcolor:#FFFFE0;forecolor:#000000;icon:0;title:Message";
		var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "palt_doc_msg");
		memo=memo.replaceAll("@^^@", "\n");
		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(),memo);
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet3_OnClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet3_OnClick(sheetObj, Row, Col){	
   	var downType;
   	var s_palt_doc_seq;
   	var s_intg_bl_seq;
	switch (sheetObj.ColSaveName(Col)) {
        case "palt_doc_img_url" :
        	if(sheetObj.GetCellImage(Row, "palt_doc_img_url") != ""){
        		s_palt_doc_seq=sheetObj.GetCellValue(Row,"palt_doc_seq");
        		s_intg_bl_seq = sheetObj.GetCellValue(Row, "intg_bl_seq_d");
                downloadFile('org', s_intg_bl_seq, s_palt_doc_seq);
        	}
        break;
        case "palt_doc_pdf_url" :
        	if(sheetObj.GetCellImage(Row, "palt_doc_pdf_url") != ""){
        		s_palt_doc_seq=sheetObj.GetCellValue(Row,"palt_doc_seq");
        		s_intg_bl_seq = sheetObj.GetCellValue(Row, "intg_bl_seq_d");
	            downloadFile('pdf', s_intg_bl_seq, s_palt_doc_seq);
        	}
        break;
	} // end switch
}
//파일 다운로드
function downloadFile(downType, s_intg_bl_seq, s_palt_doc_seq){
	document.frm2.docType.value=downType;
	document.frm2.s_palt_doc_seq.value=s_palt_doc_seq;
	document.frm2.intg_bl_seq.value=s_intg_bl_seq;
	//document.frm2.target = '_self';
	document.frm2.submit();
}
/**
 * 파일 업로드 팝업에서 목록 Reload
 */
function reloadDocList(){
	doWork('SEARCH_DOC');
}
/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function blCheckInpuVals(){
	var isOk=true;
	//---------------20121130 OJG---------------------------
	if(!chkCmpAddr(frm1.shpr_trdp_addr, 'Shipper Address')){
		isOk=false;
		moveTab('01');
		//frm1.shpr_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.cnee_trdp_addr, 'Consignee Address')){
		isOk=false;
		moveTab('01');
		//frm1.cnee_trdp_addr.focus();
	}
	/*
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
		moveTab('01');
		//frm1.ntfy_trdp_addr.focus();
	}
	//---------------20121130 OJG--------------------------
	*/
	/*
	 *  2012.02.23
	 * 필수값 설정
	 * ETA
	 */
	//LHK, 20140612 #33814 [BINEX]Import Mandatory 추가 - Carrier
	if(frm1.lnr_trdp_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - Carrier");
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	/*if(checkInputVal(frm1.eta_dt_tm.value, 10, 10, "DD", 'Arrival Date')!='O'){ //S.Y BAIK(2013.01.23)*/
	if(!checkInType(frm1.eta_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ARRV') + getLabel('FMS_COD_DATE'));
		isOk=false;
		moveTab('01');
		frm1.eta_dt_tm.focus();
		return isOk;
	}
	if(frm1.h_post_dt_imp.value != null && frm1.h_post_dt_imp.value == 'D-ETA')
	{
		if(!checkInType(frm1.f_eta_dt_tm.value, "DD")){
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_DEL_ETA_'));
			isOk=false;
			moveTab('01');
			frm1.f_eta_dt_tm.focus();
			return isOk; 
		}
	}
	if (trim(frm1.etd_dt_tm.value) != "" && trim(frm1.eta_dt_tm.value) != "") {
		var daysTerms=getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy");
		if (daysTerms < -1) {
			// Arrival Date time must be greater than Flight Date time
			alert(getLabel("AIR_MSG_091"));
			frm1.eta_dt_tm.focus();
			isOk=false;
			return isOk; 
		} /*else if (daysTerms == 0) {
			if (getDaysBetweenFormat(frm1.etd_tm, frm1.eta_tm, "hh:mm") < 0) {
				// Arrival Date time must be greater than Flight Date time
				alert(getLabel("AIR_MSG_091"));
				frm1.eta_tm.focus();
				isOk=false;
				return isOk; 
			}
		}*/
	}
 	//#25246, 25247 필수값 설정 추가
	if(frm1.pol_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		frm1.pol_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.pod_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		frm1.pod_cd.focus();
		isOk=false;
		return isOk; 
	}
 	//#29608 MBL Mandatory 항목 추가(Office Code)
	if(frm1.ref_ofc_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.ref_ofc_cd.focus();
		isOk=false;
		return isOk; 
	}
	/*==================================================================================================*/
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용						    */
	/* Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류 발생을 차단. */
	var sheetObjArr=new Array(3);
		fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
		sheetObjArr[0]=docObjects[3];		//AR LOCAL  'fr_'
		sheetObjArr[1]=docObjects[5];		//DC 		'dc_fr_'
		sheetObjArr[2]=docObjects[4];		//AP 		'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){	//Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/*=================================================================================================*/
	
//	#1351 [CLT] B/L, AWB 등 Freight 탭에 대한 Mandatory Validation 메시지 기능 보완
	var frtSdListParam=docObjects[3].GetSaveString(false);
    if(docObjects[3].IsDataModified() && frtSdListParam == "") { isOk=false; moveTab('03'); };

    var frtBcListParam=docObjects[4].GetSaveString(false);
    if(docObjects[4].IsDataModified() && frtBcListParam == "") { isOk=false; moveTab('03'); };

    var frtDcListParam=docObjects[5].GetSaveString(false);
    if(docObjects[5].IsDataModified() && frtDcListParam == "") { isOk=false; moveTab('03'); };
	
	return isOk;
}
function setOfficeData(){
	var formObj=document.frm1;
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj=docObjects[1];
	//office post date setting, Ocean Export
	if(formObj.post_dt.value==""){
		if(ofc_post_dt=="TODAY"){
			formObj.post_dt.value=getTodayStr();
		}
	}
	formObj.ref_ofc_cd.value=v_ofc_cd;
	formObj.curr_cd.value=ofc_curr_cd;
}
//화면로드시 데이터 표시
function loadData(){
	if(frm1.intg_bl_seq.value!=""){
		//currency를 database에 있는 값으로 셋팅함
		frm1.ref_ofc_cd.value=frm1.h_ref_ofc_cd.value;
		frm1.curr_cd.value=frm1.h_curr_cd.value;
		//attach rider 체크
		rowCount(frm1, 15, frm1.rider_lbl);
//		frm1.ref_no.className = 'search_form-disable';
//		frm1.ref_no.readOnly  = true;
		
		//#2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.ref_no.value);
	} else {
		//BL_COPY
		var orgBlSeq = frm1.copy_bl_seq.value;
		if (orgBlSeq != "") {
			selectCopyBLFrt();
		}
	}
	//OFC의 POST_DATE TYPE를 취득한다.
	ofcChDEta();
	
	//#41634 - [DMS] Default Cursor Position Change
	frm1.ref_no.focus();
}

function checkBoxSetting(){
	var formObj=document.frm1;
	
	if(formObj.ctrb_ratio_yn.value=="Y"){
		formObj.ctrb_ratio_yn.checked=true;
	}else{
		formObj.ctrb_ratio_yn.checked=false;
	}
	/*#657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL*/
	if(formObj.inter_use_flag.value=="Y"){
		formObj.inter_use_flag.checked=true;
	}else{
		formObj.inter_use_flag.checked=false;
	}
}


function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt"){
		formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
		chkComma(formObj.grs_wgt1,8,1);
	}
	//else if(obj.name=="grs_wgt1"){
	if(obj.name=="grs_wgt1"){
		formObj.grs_wgt.value=roundXL(formObj.grs_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 1);
		chkComma(formObj.grs_wgt,8,1);
	}
	if(obj.name=="chg_wgt"){
		formObj.chg_wgt1.value=roundXL(formObj.chg_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
		chkComma(formObj.chg_wgt1,8,1);
	}
	//else if(obj.name=="grs_wgt1"){
	if(obj.name=="chg_wgt1"){
		formObj.chg_wgt.value=roundXL(formObj.chg_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 1);
		chkComma(formObj.chg_wgt,8,1);
	}
	
	//#3245 [CLT] AIM AWB Entry - CBM <-> Volume Weight 간 연동로직 누락
	if(obj.name=="vol_wgt"){
//		formObj.vol_meas.value=roundXL(formObj.vol_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 6);
//		chkComma(formObj.vol_meas,8,1);
	}
	if(obj.name=="vol_meas"){
		formObj.vol_wgt.value = calcWeight(parseInt((formObj.vol_meas.value.replaceAll(",","") * 1000 / 6) * 1000) / 1000, 0, "Y");
		chkComma(formObj.vol_wgt,8,1);
	}
	
}


function sumHblValue(){
	if(frm1.intg_bl_seq.value!=''){
		ajaxSendPost(getSumHblValue, 'reqVal', '&goWhere=aj&bcKey=sumHblValueAirImp&intg_bl_seq='+frm1.intg_bl_seq.value+'&usr_ofc_cd='+ofc_cd, './GateServlet.gsl'); //#2017 [CLA] AIR IMPORT [SUM] BUTTON LOGIC ADD
	}		
}
function getSumHblValue(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			rtnArray=doc[1].split("^^");
			var grs_wgt=roundXL(parseFloat(rtnArray[0]),1);
			var chg_wgt=roundXL(parseFloat(rtnArray[1]),1);
			var pck_qty=roundXL(parseFloat(rtnArray[4]),0);
			var grs_wgt1=roundXL(parseFloat(rtnArray[5]),0);
			var chg_wgt1=roundXL(parseFloat(rtnArray[6]),0);
			
			//#2017 [CLA] AIR IMPORT [SUM] BUTTON LOGIC ADD
			var vol_wgt=roundXL(parseFloat(rtnArray[2]),1);
			var vol_meas=roundXL(parseFloat(rtnArray[3]),6);
			formObj.vol_wgt.value=vol_wgt;
			formObj.vol_meas.value=vol_meas;
			chkComma(formObj.vol_wgt,8,1);
			chkComma(formObj.vol_meas,8,6);
			//#2017 [CLA] AIR IMPORT [SUM] BUTTON LOGIC ADD
			
			formObj.grs_wgt.value=grs_wgt;
			formObj.chg_wgt.value=chg_wgt;
			formObj.pck_qty.value=pck_qty;
			formObj.grs_wgt1.value=grs_wgt1;
			formObj.chg_wgt1.value=chg_wgt1;
			
			if(grs_wgt >= chg_wgt){
				formObj.chg_wgt.value=calcWeight(grs_wgt, 0);
				formObj.chg_wgt1.value=calcWeight(grs_wgt1, 0);
			}else{
				formObj.chg_wgt.value=calcWeight(chg_wgt, 0);
				formObj.chg_wgt1.value=calcWeight(chg_wgt1, 0);
			}
			
			numberCommaLen(formObj.grs_wgt,8,2);
			numberCommaLen(formObj.chg_wgt,8,2);
			
			chkComma(formObj.grs_wgt1,8,1);
			chkComma(formObj.chg_wgt1,8,1);
			
		}else{
			//"There is no HAWB B/L." 
			alert(getLabel('AIR_MSG_095'));
		}
	}
}
function calcWeight(wgt, type){
	var intWgt=parseInt(wgt);
	var tmpVal=wgt - intWgt;
	var result=0;
	/*
	 * type==0, kg
	 * type==1, lbs
	 */
	if(type==0){
		if(tmpVal == 0){
			result=wgt;
		}else if(tmpVal <= 0.5){
			result=intWgt + 0.5;
		}else if(tmpVal <= 1){
			result=intWgt + 1;
		}
	}else if(type==1){
		if(tmpVal == 0){
			result=wgt;
		}else if(tmpVal <= 1){
			result=intWgt + 1;
		}
	}
	return result;
}
function checkTrdpCode(obj){
	if(obj.name=="prnr_trdp_nm"){
	}else if(obj.name=="shpr_trdp_nm"){
		if(frm1.shpr_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.shpr_trdp_addr.value == ""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.shpr_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);
			}			
		}
	}else if(obj.name=="cnee_trdp_nm"){
		if(frm1.cnee_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.cnee_trdp_addr.value == ""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.cnee_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);
			}			
		}
	}else if(obj.name=="ntfy_trdp_nm"){
	}else if(obj.name=="act_shpr_trdp_nm"){
	}else if(obj.name=="cust_trdp_nm"){
	}else if(obj.name=="lnr_trdp_nm"){
	}else if(obj.name=="carr_trdp_nm"){
	}else if(obj.name=="prnr_trdp_nm2"){
	}else if(obj.name=="iss_trdp_nm"){
	}else if(obj.name=="third_trdp_nm"){
	}
}
/**
 * HBL이 Confirm 또는 Closing 된 것이 있는지 확인후 삭제
 */
function doRmvSrInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		   if(doc[1]==0){
			   //invoice 생성 유무를 체크한다.
			   ajaxSendPost(checkBlInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckInv&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
    		   if(isInvStsOk){
    			   // wo 생성 유무를 체크한다.
            	   ajaxSendPost(checkBlPdOrd, 'reqVal', '&goWhere=aj&bcKey=getCheckPdOrd&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
            	   if(isPdOrdStsOk){
            	      alert(getLabel('FMS_COM_ALT113'));
            	      return;
            	   }
    			   
    			   if(confirm(getLabel('FMS_COM_CFMDEL'))){
//	                   frm1.f_cmd.value=REMOVE;
//	            	   doShowProcess();
//	            	   frm1.submit();
	        		   delete_show_complete = "Y";
	            	   submitForm(REMOVE);
	        	   }
    		   }
    		   else{
    			   //You Cannot delete B/L. Because Invoice was already Issued.
    			   alert(getLabel('FMS_COM_ALT022'));
    			   return;
    		   }
    		   /*if(confirm(getLabel('FMS_COM_CFMDEL'))){
	               frm1.f_cmd.value=REMOVE;
	        	   doShowProcess();
	        	   frm1.submit();
	    	   }*/				
		   }
		   else{
//			   alert('Please delete the HAWB in advance.');
			   alert(getLabel('AIR_MSG_044'));
			   return;
		   }
		}
	}
}
function checkBlInvReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			isInvStsOk=false;
		}else{
			isInvStsOk=true;
		}
	}
}
function checkBlPdOrd(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			isPdOrdStsOk=true;
		}else{
			isPdOrdStsOk=false;
		}
	}
}
/*
 *  2012.02.15
 * JAPAN만 적용
 * BL DATE 변경하면, BKG DATE, ISSUE DATE 다 같은 날짜로 변경한다. 
 */
function changeBLDate(){
	if(user_ofc_cnt_cd=="JP"){
		frm1.bl_iss_dt.value=frm1.bl_dt_tm.value;
	}
}
function checkBlInvReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			isInvStsOk=false;
		}else{
			isInvStsOk=true;
		}
	}
}
// DIM 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet4_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "dim_meas1" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			gridAdd(5);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
}
// Air Freight 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet5_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "air_amt" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			gridAdd(2);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
}
// Other 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet6_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "oth_amt" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			gridAdd(3);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
}
/*
 *  2012.03.21 
 * Master Freight Tab 추가
 */
function getSdSheet(){
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[3];
}
function getBcSheet(){
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[4];
}
function getDcSheet(){
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[5];
}
function sheet7_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, '', 'A', 'I', 'M');
	}else{
		mutiSheetOnClick(sheetObj, row, col, '');
	}
//	mutiSheetOnClick(sheetObj, row, col, '');
}
function sheet7_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, '');
}
function sheet7_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, '', 'A', 'I', 'M');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, '', 'A', 'I', 'M');
}
function sheet7_OnChange(sheetObj, row, col) {

	switch (sheetObj.ColSaveName(col)) {
		case "fr_frt_term_cd" :

			//#4958 [JTC] request for defalt setting auto to show A/R Curr.
			if(MULTI_CURR_FLAG == 'Y') {
				if(sheetObj.GetCellValue(row,'fr_frt_term_cd')=='PP'){
					sheetObj.SetCellValue(row, 'fr_inv_curr_cd', 'USD', 0);
				} else if (sheetObj.GetCellValue(row,'fr_frt_term_cd')=='CC') {
					sheetObj.SetCellValue(row, 'fr_inv_curr_cd', ofc_locl_curr_cd, 0);
				}
			}
			break;
	}

	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col, '', 'A', 'I', 'M');
}
function sheet7_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, '', 'A', 'I', 'M');
	}
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "fr_att_file_1", 0);
	}
}
function sheet7_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}
function sheet7_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, '', 'A', 'I', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "fr_frt_check" == sheetObj.ColSaveName(col)){
			//gridAdd(3);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('ROWADD', docObjects[3], 'A', 'I', 'M');
			afterRowAdd("AR");
			sheetObj.SelectCell(row + 1, 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "fr_qty" :
		case "fr_ru" :
		case "fr_trf_cur_sum_amt" :
		case "fr_vat_rt" :
		case "fr_vat_amt" :
		case "fr_inv_xcrt" :
		case "fr_inv_amt" :
		case "fr_inv_vat_amt" :
		case "fr_inv_sum_amt" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
function sheet8_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "b_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, 'b_', 'A', 'I', 'M');
	}else{
		mutiSheetOnClick(sheetObj, row, col, 'b_');
	}
//	mutiSheetOnClick(sheetObj, row, col, 'b_');
}
function sheet8_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'b_');
}
function sheet8_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "b_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'A', 'I', 'M');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'A', 'I', 'M');
}
function sheet8_OnChange(sheetObj, row, col) {

	switch (sheetObj.ColSaveName(col)) {
		case "b_fr_frt_term_cd" :
	
			//#4958 [JTC] request for defalt setting auto to show A/R Curr.
			if(MULTI_CURR_FLAG == 'Y') {
				if(sheetObj.GetCellValue(row,'b_fr_frt_term_cd')=='PP'){
					sheetObj.SetCellValue(row, 'b_fr_inv_curr_cd', 'USD', 0);
				} else if (sheetObj.GetCellValue(row,'b_fr_frt_term_cd')=='CC') {
					sheetObj.SetCellValue(row, 'b_fr_inv_curr_cd', ofc_locl_curr_cd, 0);
				}
			}
			break;
	}

	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col,  'b_', 'A', 'I', 'M');
}
function sheet8_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, 'b_', 'A', 'I', 'M');
	}
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "b_fr_att_file_1", 0);
	}
}
function sheet8_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
}
function sheet8_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="b_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'A', 'I', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "b_fr_reserve_field01" == sheetObj.ColSaveName(col)){
			//gridAdd(4);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('BCROWADD', docObjects[4], 'A', 'I', 'M');
			afterRowAdd("AP");
			sheetObj.SelectCell(row + 1, 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "b_fr_qty" :
		case "b_fr_ru" :
		case "b_fr_trf_cur_sum_amt" :
		case "b_fr_vat_rt" :
		case "b_fr_vat_amt" :
		case "b_fr_inv_xcrt" :
		case "b_fr_inv_amt" :
		case "b_fr_inv_vat_amt" :
		case "b_fr_inv_sum_amt" :
			/*if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}*/
		break;
	}
}
function sheet9_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "dc_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, 'dc_', 'A', 'I', 'M');
	}else{
		mutiSheetOnClick(sheetObj, row, col, 'dc_');
	}
//	mutiSheetOnClick(sheetObj, row, col, 'dc_');
}
function sheet9_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'dc_');
}
function sheet9_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "dc_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'A', 'I', 'M');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'A', 'I', 'M');
}
function sheet9_OnChange(sheetObj, row, col) {
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col,  'dc_', 'A', 'I', 'M')
}
function sheet9_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj,'dc_', 'A', 'I', 'M');
	}
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "dc_fr_att_file_1", 0);
	}
}
function sheet9_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
}
function sheet9_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="dc_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'A', 'I', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "dc_fr_frt_check" == sheetObj.ColSaveName(col)){
			//gridAdd(5);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('DCROWADD', docObjects[5], 'A', 'I', 'M');
			afterRowAdd("DC");
			sheetObj.SelectCell(row + 1, 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "dc_fr_qty" :
		case "dc_fr_ru" :
		case "dc_fr_agent_ru" :
		case "dc_fr_inv_xcrt" :
		case "dc_fr_inv_sum_amt" :
		case "dc_fr_agent_amt" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
function goToInvoice(sheetObj, obj){
	switch(obj){
		case "LOCAL":
			var formObj=document.frm1;
			if( frFrtCheckRow(sheetObj, "")){
				return;
			}
			var chkCnt=0;
			var chk_fr_trdp_cd="";
			var chk_fr_trdp_nm="";
			var chk_fr_inv_curr_cd="";
			var chk_fr_frt_seq="";
			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
				if(sheetObj.GetCellValue(i, "fr_frt_check") == 1){
					chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'fr_trdp_cd');
					chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'fr_trdp_nm');
					chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ", ";
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'fr_frt_seq');
					chkCnt++;
				}
			}
			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=A";
			param += "&f_biz_clss_cd=M";
			param += "&f_bnd_clss_cd=I";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
			param += "&bl_frt_yn=Y";  //#3973 [JAPT]Invoice Date & Ex.Rate
		   	var paramStr="./ACC_INV_0010.clt?f_cmd="+param;
		   	parent.mkNewFrame('A/R Entry', paramStr);
		break;
		case "AP":
			var formObj=document.frm1;
			if( frFrtCheckRow(sheetObj, "b_")){
				return;
			}
			var chkCnt=0;
			var chk_fr_trdp_cd=formObj.carr_trdp_cd.value;
			var chk_fr_trdp_nm=formObj.carr_trdp_nm.value;
			var chk_fr_inv_curr_cd="";
			var chk_fr_frt_seq="";
			var chk_fr_inv_no="";
			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
				if(sheetObj.GetCellValue(i, "b_fr_frt_check") == 1){
					chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'b_fr_trdp_cd');
					chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'b_fr_trdp_nm');
					chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'b_fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ',';
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'b_fr_frt_seq');
					chk_fr_inv_no=sheetObj.GetCellValue(i, 'b_fr_inv_no');
					chkCnt++;
				}
			}
			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=A";
			param += "&f_biz_clss_cd=M";
			param += "&f_bnd_clss_cd=I";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
			param += "&bl_frt_yn=Y";  //#3973 [JAPT]Invoice Date & Ex.Rate
			/* #20961 Ocean Export Master and Ocean Import Master 에서
			A/P Invoice 화면 이동 시, Vendor Inv No 가 null 이면(#22112에 의해 조건 수정)
			Vndr Invoice No 에 MBL# 세팅 */
			if (chk_fr_inv_no == undefined  || chk_fr_inv_no == "undefined" || chk_fr_inv_no == "") {
				param += "&s_inv_no=" + formObj.bl_no.value;
			}
		   	var paramStr="./ACC_INV_0030.clt?f_cmd="+param;
		   	parent.mkNewFrame('A/P Entry(Cost)', paramStr);
		break;
		case "DC":
			var formObj=document.frm1;
			if( frFrtCheckRow(sheetObj, "dc_")){
				return;
			}
			var chkCnt=0;
			var chk_fr_trdp_cd="";
			var chk_fr_trdp_nm="";
			var chk_fr_inv_curr_cd="";
			var chk_fr_frt_seq="";
			/* #20963 Air Import Master D/C Note 화면 이동 시 Agent 가 해당 MBL 의 Shipper 여야 함 
			 * 현재 ENTRY Freight Tab에서 D/C add 시 Shipper 갔고 옴 */
			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
				if(sheetObj.GetCellValue(i, "dc_fr_frt_check") == 1){
					chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'dc_fr_trdp_cd');
					chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'dc_fr_trdp_nm');
					chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'dc_fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ',';
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'dc_fr_frt_seq');
					chkCnt++;
				}
			}
			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=A";
			param += "&f_biz_clss_cd=M";
			param += "&f_bnd_clss_cd=I";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
			param += "&bl_frt_yn=Y";  //#3973 [JAPT]Invoice Date & Ex.Rate
		   	var paramStr="./ACC_INV_0020.clt?f_cmd="+param;
		   	parent.mkNewFrame('D/C Note Entry', paramStr);
		break;
	}
}
function goToInvoiceModify(obj){
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	var arObj=docObjects[3];
	var apObj=docObjects[4];
	var dcObj=docObjects[5];
	switch(obj){
		case "LOCAL":
			if(arObj.GetSelectRow() > 0 && arObj.GetCellValue(arObj.GetSelectRow(), "fr_inv_seq")!=""){
				var param="&f_inv_seq=" + arObj.GetCellValue(arObj.GetSelectRow(), "fr_inv_seq");
				var paramStr="./ACC_INV_0010.clt?f_cmd="+param;
				parent.mkNewFrame('A/R Entry', paramStr);
			}else{
			}
		break;
		case "AP":
			if(apObj.GetSelectRow() > 0 && apObj.GetCellValue(apObj.GetSelectRow(), "b_fr_inv_seq")!=""){
				var param="&f_inv_seq=" + apObj.GetCellValue(apObj.GetSelectRow(), "b_fr_inv_seq");
				var paramStr="./ACC_INV_0030.clt?f_cmd="+param;
				parent.mkNewFrame('A/P Entry(Cost)', paramStr);
			}else{
			}
		break;
		case "DC":
			if(dcObj.GetSelectRow() > 0 && dcObj.GetCellValue(dcObj.GetSelectRow(), "dc_fr_inv_seq")!=""){
				var param="&f_inv_seq=" + dcObj.GetCellValue(dcObj.GetSelectRow(), "dc_fr_inv_seq");
				var paramStr="./ACC_INV_0020.clt?f_cmd="+param;
				parent.mkNewFrame('D/C Note Entry', paramStr);
			}else{
			}
		break;
	}
}
function searchGrid(gridIdx){
	switch(gridIdx){
		case 7:
			//Selling/Debit Freight 조회
			frm1.f_cmd.value=SEARCHLIST07;
			fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[3].DoSearch("./AII_BMD_0040_7GS.clt", FormQueryString(frm1) );
		break;
		case 8:
			//Buying/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST08;
			fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[4].DoSearch("./AII_BMD_0040_8GS.clt", FormQueryString(frm1) );
		break;
		case 9:
			//Debit/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST09;
			fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[5].DoSearch("./AII_BMD_0040_9GS.clt", FormQueryString(frm1) );
		break;
		/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
		case 10:
			//Status List 조회
			frm1.f_cmd.value=SEARCHLIST10;
			fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[6].DoSearch("./SEE_BMD_0026_1GS.clt", FormQueryString(frm1) );
			break;	
		//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
		case 11:
			//WorkOrder List 조회
			frm1.f_cmd.value=SEARCHLIST08;
			fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[7].DoSearch("./AIE_BMD_0025GS.clt", FormQueryString(frm1) );
		break;
	}
}
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
 *  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
 **/
function setPost_date(save_flag){
 	var formObj=document.frm1;
 	var ofc_post_tp=frm1.h_post_dt_imp.value;
 	if(save_flag == "I"){
 		if(ofc_post_tp=="ETD"){
 	 		frm1.post_dt.value=frm1.etd_dt_tm.value;
 	    }else if(ofc_post_tp=="ETA"){
 	    	frm1.post_dt.value=frm1.eta_dt_tm.value;
 		   /*if(frm1.f_eta_dt_tm.value!=''){
 			   frm1.post_dt.value=frm1.f_eta_dt_tm.value;
 		   }else{
 			   frm1.post_dt.value=frm1.eta_dt_tm.value;
 		   }*/
 	    //25273 OFC_CD변경시 TODAY에 대한 고려가 없어서 추가
 		}else if(ofc_post_dt=="TODAY"){
 			//LHK, 20140924 #43960 [DYNAMIC] Post Date 변경
 			if(formObj.post_dt.value==""){
 				formObj.post_dt.value=getTodayStr();
 			}
 	    // 25273 D-ETA인 경우, D-ETA를 POST_DT로 설정한다.
 		}else if(ofc_post_tp=="D-ETA"){
 			frm1.post_dt.value=frm1.f_eta_dt_tm.value;
 	    }
 	}else if(save_flag == "U"){
 		if(ofc_post_tp=="ETD"){
 			if (frm1.etd_dt_tm.value != frm1.org_etd_dt_tm.value ){
 				frm1.post_dt.value=frm1.etd_dt_tm.value;
 			} 	 		
 	    }else if(ofc_post_tp=="ETA"){
 	    	if (frm1.eta_dt_tm.value != frm1.org_eta_dt_tm.value ){
 	    		frm1.post_dt.value=frm1.eta_dt_tm.value;
 			}
 	    	
 		}else if(ofc_post_tp=="D-ETA"){
 			if (frm1.f_eta_dt_tm.value != frm1.org_f_eta_dt_tm.value ){
 				frm1.post_dt.value=frm1.f_eta_dt_tm.value;
 			} 			
 	    }
 	}
 	
 	//Update 인 경우  post date 가 변경된 경우에만 post date 비교 처리로직 적용.
 	if(save_flag == "U"){
 		if(formObj.post_dt.value == formObj.org_post_dt.value){
 			return;
 		}
 	}
 	
	//검증
 	setBlock_dt(false);
}
function getMaxBlockOrJnrNextDt(reqVal){
 	var doc=getAjaxMsgXML(reqVal);
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			NEXT_BLOCK_DT=doc[1];
 			NEXT_BLOCK_DT=NEXT_BLOCK_DT.substring(4,6) + "-" + NEXT_BLOCK_DT.substring(6,8) + "-" + NEXT_BLOCK_DT.substring(0,4);
 		}else{
			NEXT_BLOCK_DT="";
		}
 	}
}

//2016.04.21 C.W.Park Added
//#52109 로직 수정
function setBlock_dt(chkValid){

	var formObj=document.frm1;
	
	if(chkValid){
		//formObj.org_post_dt.value != "" 의 경우 Update
		if(formObj.org_post_dt.value != ""){
			formObj.post_dt.value = formObj.org_post_dt.value	
		}
	}
	
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	var param = formObj.ref_ofc_cd.value;
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt&searchOfcCd=' + param, './GateServlet.gsl');
	if(formObj.post_dt.value == ""){
		formObj.post_dt.value = NEXT_BLOCK_DT;
		formObj.org_post_dt.value = NEXT_BLOCK_DT;
	}
	if(NEXT_BLOCK_DT != "") { 
		//post_dt 와 block_dt 비교
//		fromDate > toDate true
		if(compareTwoDate(NEXT_BLOCK_DT, formObj.post_dt.value)){
			formObj.post_dt.value=NEXT_BLOCK_DT;
		}
	}
	
}

function txtAtChange(obj, dTxt)
{
	if(dTxt.value == '' & obj.value != '')
	{
		dTxt.value=obj.value;
		frm1.f_eta_tm.value=frm1.eta_tm.value;
	}
}
function ofcChDEta()
{
	var formObj=document.frm1;
	var ofc_cd=formObj.ref_ofc_cd.options[formObj.ref_ofc_cd.selectedIndex].text;
	//alert(ofc_cd);
//	ajaxSendPost(getImpPostRef, 'reqVal', '&goWhere=aj&bcKey=getImpPostRef&f_ofc_cd='+ofc_cd, './GateServlet.gsl');
}
function getImpPostRef(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]!=''){
				frm1.h_post_dt_imp.value=doc[1];
				if(doc[1] == 'D-ETA')
				{
					st_hear.style.display='none';
					st_hear_r.style.display='inline';		
				}else{
					st_hear.style.display='inline';
					st_hear_r.style.display='none';						
				}
			}
		}
	}
	else{
	}
}
function checkMblValidate(mblNo){
	var ret=false;
	// 1. 11자리 체크
	var tmpMmblNo=mblNo.replaceAll("-","");
	if(tmpMmblNo.length!=11) {
		return ret;
	}
	// 2. 숫자 체크(7자리%7 == Check Digit)
	var sevenNum=tmpMmblNo.substring(3,10);
	try {
		var checkDigit=tmpMmblNo.substring(10,11);
		if (Number(sevenNum%7) == checkDigit) {
			return true;
		} else {
			return false;
		}
	} catch(e) {
		return ret;
	}
	return ret;
}
/**
 * MAWB 기입하면, MAWB 넘버의 Prefix(첫 3 캐릭터)를 Carrier 항목(Code)에 자동 기입되도록. (Carrier 가 비어 있는 경우에만)
 */
function setCarrierCd(obj){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();
	if ((window.event.keyCode == 13 && s_code != "") || window.event.type == "blur") {
		if(formObj.lnr_trdp_cd.value == "" && s_code.length >= 3) {
			var bl_no=formObj.bl_no.value.toUpperCase();
			var s_code=bl_no.substring(0,3);
			formObj.lnr_trdp_cd.value=s_code;
			codeNameAction('trdpCode_imp_air_carr', formObj.lnr_trdp_cd, 'onBlur');
		}
	}
}
//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
/**
* Work Order 화면이동
*/
function sheet12_OnDblClick(sheetObj, row, col){
	/*
var param='f_wo_no=' + sheetObj.GetCellValue(row, 'wo_no');
	   param += '&air_sea_clss_cd=A'; 
	   param += '&bnd_clss_cd=I';
	   param += '&biz_clss_cd=M';
	var paramStr="./AIC_WOM_0016.clt?f_cmd="+SEARCH+"&"+param;
	parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
	*/
   	var paramStr="./AIC_WOM_0016.clt?air_sea_clss_cd=A&bnd_clss_cd=I&biz_clss_cd=M";
    var param = "&f_cmd=" + SEARCH;
    param += "&f_wo_no=" + sheetObj.GetCellValue(row, 'wo_no');
    parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
}


//BL_COPY
function selectCopyBLFrt(){
	 openBlCopyPopUp("COPY_CONFIRM_POPUP_2",this,this);
}

//BL_COPY
function COPY_CONFIRM_POPUP(rtnVal){
	
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var copyYn = value=rtnValAry[0];
		if (copyYn) {
			
			var arFrt_copy_chk=rtnValAry[1];
			var apFrt_copy_chk=rtnValAry[2];
			var dcFrt_copy_chk=rtnValAry[3];
			//#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
			var shpmt_itm_copy_chk=rtnValAry[5];
			var mrk_des_copy_chk=rtnValAry[6];
						
			if (orgBlSeq != "") {
				
				//#2348 [IMPEX] Pop up error message not closing after click OK
				cntrTpSzFlag = true;
			
				var orgBlSeq = frm1.copy_bl_seq.value;
				var tmpIntgBlSeq = frm1.intg_bl_seq.value;; 
				frm1.intg_bl_seq.value = frm1.copy_bl_seq.value;
							
				if (arFrt_copy_chk == "Y") {
					//Selling/Debit Freight 조회
					frm1.f_cmd.value=SEARCHLIST07;
					fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
					docObjects[3].DoSearch("./AII_BMD_0040_7GS.clt", FormQueryString(frm1) );
				}				
				if (apFrt_copy_chk == "Y") {					
					//Buying/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST08;
					fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
					docObjects[4].DoSearch("./AII_BMD_0040_8GS.clt", FormQueryString(frm1) );		
				}
				if (dcFrt_copy_chk == "Y") {
					//Debit/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST09;
					fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
					docObjects[5].DoSearch("./AII_BMD_0040_9GS.clt", FormQueryString(frm1) );
				}
				//#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				if (shpmt_itm_copy_chk == "Y" || mrk_des_copy_chk == "Y") {
				    frm1.f_cmd.value=COMMAND12;	
					var xml = sheet1.GetSearchData("./AII_BMD_0040_6GS.clt",FormQueryString(frm1));		
					var xmlDoc = $.parseXML(xml);					 
					var $xml = $(xmlDoc);
 
					 if($xml.find("result").text() == "1" ){
						if(shpmt_itm_copy_chk == "Y"){
							
							isCopy = true;					
							
							formObj.pck_ut_cd.value = $xml.find("pck_ut_cd").text();
							formObj.pck_qty.value = ($xml.find("pck_qty").text() == "" ? "0": doMoneyFmt(Number($xml.find("pck_qty").text()).toFixed(0)));
							formObj.grs_wgt.value = ($xml.find("grs_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt").text()).toFixed(1)));
							formObj.grs_wgt1.value = ($xml.find("grs_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt1").text()).toFixed(1)));
							
							formObj.chg_wgt.value = ($xml.find("chg_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("chg_wgt").text()).toFixed(1)));
							formObj.chg_wgt1.value = ($xml.find("chg_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("chg_wgt1").text()).toFixed(1)));
							formObj.vol_wgt.value = ($xml.find("vol_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("vol_wgt").text()).toFixed(1)));
							formObj.vol_meas.value = ($xml.find("vol_meas").text() == "" ? "0": doMoneyFmt(Number($xml.find("vol_meas").text()).toFixed(6)));
							
							formObj.rep_cmdt_cd.value = $xml.find("rep_cmdt_cd").text();
							formObj.rep_cmdt_nm.value = $xml.find("rep_cmdt_nm").text();
																								
						}						
						if(mrk_des_copy_chk == "Y"){
							formObj.mk_txt.value = $xml.find("mk_txt").text();
							formObj.desc_txt.value = $xml.find("desc_txt").text();
							formObj.hndl_info_txt.value = $xml.find("hndl_info_txt").text();
							
						}
					 }
				}
				frm1.intg_bl_seq.value = tmpIntgBlSeq;	
				
				//#2348 [IMPEX] Pop up error message not closing after click OK
				cntrTpSzFlag = true;
			}
		}
	}
}

//#48588 [Webtrans][게시판#9] AE PACKAGE TYPE INPUT
function setPckUtCd(){
	// Notice를 Email보낼 그룹메일정보를 취득한다. 
	var opt_key = "PCK_VAL_AIM";
	ajaxSendPost(setPckUtCdReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setPckUtCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		frm1.pck_ut_cd.value=doc[1];
	} else {
		frm1.pck_ut_cd.value="";
	}
}

//#48643 [IMPEX] AIM AWB ENTRY 에 FREIGHT 기본값  "PREPAID" 세팅 
function setFlightDtTxt(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if (doc[0] == "OK" && doc[1]!= "undefined" && doc[1]!= undefined ) {
		if(doc[1] == "DE"){
			getObj("flight_dt_word").innerHTML = departure_dt;
		}
	}
}



//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
function chkIntgBlModiTms(flag){
	var returnVal=true;
	var formObj=document.frm1; 
	var intg_bl_seq =  formObj.intg_bl_seq.value;
	 
	if (flag == "VIEW"){ // 조회시 
		ajaxSendPost(getIntgBlViewModiTms, 'reqVal', '&goWhere=aj&bcKey=searchIntgBlSeqModiTms&intg_bl_seq='+intg_bl_seq, './GateServlet.gsl');  
	}else{ // 수정 삭제시 
		ajaxSendPost(getIntgBlModiTms, 'reqVal', '&goWhere=aj&bcKey=searchIntgBlSeqModiTms&intg_bl_seq='+intg_bl_seq, './GateServlet.gsl');
		//alert(vIntgBlModiTms + " "+frm1.trx_modi_tms.value);
		if (vIntgBlModiTms != frm1.trx_modi_tms.value) {
			returnVal=false;
		}
	 	 
	 	if(!returnVal){
	 		// Check 이 변경된 경우
			alert(getLabel('ACC_MSG147')); 
	 	}
		return returnVal;
	}
}
function getIntgBlViewModiTms(reqVal){
	vIntgBlModiTms='';
	var doc=getAjaxMsgXML(reqVal);
	// alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			frm1.trx_modi_tms.value=doc[1];
		}
	}
	//alert(frm1.trx_modi_tms.value);
}
function getIntgBlModiTms(reqVal){
	vIntgBlModiTms='';
	var doc=getAjaxMsgXML(reqVal);
	// alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			vIntgBlModiTms=doc[1];
		}
	}
}
	
function afterRowAdd(type){
	if(type == "AR"){
		for(var i=2; i<=docObjects[3].LastRow(); i++){
			docObjects[3].SetCellImage(i, "fr_att_file_1", 0);
		}
	}else if(type == "DC"){
		for(var i=2; i<=docObjects[5].LastRow(); i++){
			docObjects[5].SetCellImage(i, "dc_fr_att_file_1", 0);
		}
	}else{
		for(var i=2; i<=docObjects[4].LastRow(); i++){
			docObjects[4].SetCellImage(i, "b_fr_att_file_1", 0);
		}
	}
}


var chkRoleFlag = false;
function chkRoleInv(intgBlSeq){
	var formObj=document.frm1
	var selfNo = formObj.sel_ref_no.value;
	var refNo  = formObj.ref_no.value;
	var usrId  = formObj.user_id.value;
	
	if(selfNo !=  refNo){
		ajaxSendPost(getRoleInvt, 'reqVal', '&goWhere=aj&bcKey=checkRoleInvAj&user_id='+usrId+"&intg_bl_seq="+intgBlSeq, './GateServlet.gsl');
	}else{
		return true;
	}

	return chkRoleFlag;
}

function getRoleInvt(reqVal){
	var formObj=document.frm1
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='NOT'){
				chkRoleFlag=false;
				//Ref. No. is duplicate.
				alert(getLabel('FMS_COM_ALT094'));
				formObj.ref_no.value = formObj.sel_ref_no.value;
				formObj.ref_no.focus();
			}
			else{
				chkRoleFlag=true;
			}
		}
	}	
	
}

function fnSetIBsheetInit(sheetNo){
	//if(docObjects[sheetNo].HeaderRows() < 1){
	//console.log(sheetNo  +' / fnSetIBsheetInit  = ' + docObjects[sheetNo].id + '  /  ' + docObjects[sheetNo].ColSaveName(1));
	if(docObjects[sheetNo].ColSaveName(1) == -1){
		comConfigSheet(docObjects[sheetNo], SYSTEM_FIS);
		initSheet(docObjects[sheetNo], (sheetNo+1) );
		comEndConfigSheet(docObjects[sheetNo]);
	}
}

/* #2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가 */
function setBlInvAutoCreation(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" && doc[1] == "Y"){
		bl_inv_auto_creation = "Y";
	}else{
		bl_inv_auto_creation = "N";
	}
}

//#2504 [PATENT]Debit Note & AP for billing code based invoices 
function goToCmbPrint(sheetObj, type){
	var objPfx='';
	var formObj=document.frm1;
	
	
	if(type =="AR"){
		objPfx ='';
	}else if(type =="AP"){
		objPfx = "b_";
	}
	
	var currRow = sheetObj.GetSelectRow();
	var currTrdpCd = sheetObj.GetCellValue(currRow,objPfx+'fr_trdp_cd');			
	var groupNoArr = new Array();
	var arrCnt = 0;

	
	if(formObj.intg_bl_seq.value =='' || formObj.intg_bl_seq.value == null){
		alert(getLabel('FMS_COM_ALT036'));
		return;
	}	
	
	for(var i=sheetObj.HeaderRows(); i <= sheetObj.LastRow(); i++) {
		
		var trdpCd = sheetObj.GetCellValue(i,objPfx+'fr_trdp_cd');
		//선택된 row 의 Bill to 가 같은 대상
		if(currTrdpCd == trdpCd){
			if(sheetObj.GetCellValue(i,objPfx+'fr_inv_sts_cd')  != 'FC' ){  //FC (INVOICE CREATE)
				alert(getLabel('FMS_COM_ALT101')) ;
				return;
			}
			
			groupNoArr[arrCnt] = sheetObj.GetCellValue(i,objPfx+'fr_cmb_inv_no');
			arrCnt++;
		}
	}
	
	var frItem = [];
	frItem.push({
		fr_frt_seq    : sheetObj.GetCellValue(currRow,objPfx+'fr_frt_seq'),     
		fr_cmb_inv_seq: sheetObj.GetCellValue(currRow,objPfx+'fr_cmb_inv_seq'),
		fr_trdp_cd    : sheetObj.GetCellValue(currRow,objPfx+'fr_trdp_cd'),
		intg_bl_seq   : frm1.intg_bl_seq.value,
		cmb_inv_no    : frm1.sel_ref_no.value 
	});	
	
	cmbOpenPop(type,  frItem, groupNoArr);
	

}


function cmbOpenPop(type, frItem, groupNoArr){
	rtnary=new Array();
	rtnary[0]= type;
	rtnary[1]= frItem;
	rtnary[2]= groupNoArr;
	callBackFunc = "debit_Note_AP_POPUP";
	modal_center_open('./CMM_POP_0900.clt', rtnary, 480,300,"no");		
	
}

function debit_Note_AP_POPUP(rtnVal){
	
}


//#1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L
function fnSalesChange(){
	var formObj=document.frm1;
	var p_code ="";
	if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
		&& formObj.nomi_flg.value !='Y') //	Nomi
	{
		p_code = formObj.cnee_trdp_cd.value;
	}	
	if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
		&& formObj.nomi_flg.value =='Y') //Nomi
	{	
		//정의 필요
	}
	
	if(p_code != "" ){
		ajaxSendPost(fnSalesChangeReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+p_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
	}
}

function fnSalesChangeReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var salesPs=doc[1].split('@@^');
			formObj.sls_usrid.value=salesPs[0];//sls_usrid
			formObj.sls_usr_nm.value=salesPs[1];//sls_usr_nm
			formObj.sls_ofc_cd.value=salesPs[2];//sls_ofc_cd
			formObj.sls_dept_cd.value=salesPs[3];//dept_cd
		}
	}
}
//#4940 ** [BEST OCEAN] WRONG MAWB VALIDATION & NO DUPLICATE ALLOWED
function setMawbVerifyYn(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && typeof doc[1] != "undefined" && doc[1] == "Y"){
		mawb_verify_yn = "Y";//Y:Cannot bypass if MAWB is duplicated or BL # is wrong
	}else{
		mawb_verify_yn = "N";//N:Can bypass if MAWB is duplicated or BL # is wrong
	}
}
//OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN
function setUserTeamInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		var rtnArr = doc[1].split('@@;');
		var teamInfo = rtnArr[0].split('@@^');
		frm1.team_cd.value=teamInfo[0];
	}else{
		frm1.team_cd.value="";
	}
}