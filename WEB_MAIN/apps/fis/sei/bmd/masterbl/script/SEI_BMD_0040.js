var loadDataProcess ="";//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
var tab2click="";
var tab3click="";
var tab4click="";
var tab5click="";
/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
var tab6click=""; 
/* #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가 */
var tab7click="";
var hblListSheet=false;
var docListSheet=false;
var cntrListSheet=false;
var frtSdSheet=false;
var frtBcSheet=false;
var frtDcSheet=false;
var isInvStsOk=false;
var blDupl=false;
var isPdOrdStsOk = false;
var vIntgBlModiTms;
//#OFVFOUR-7000 [TOP URGENT][BNX-CFS] GO DATE issue - Author: Thuong Huynh 2021/02/08
var etaDtSyncFlg;

/* 
 * jsjang 2013.7.5 
 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건
 * Start 
 */        
var tab_pck_qty="";
var tab_meas="";
var tab_meas1="";
var tab_grs_wgt="";
var tab_grs_wgt1="";

var use_cfs_fields = "N";
var delete_show_complete = "N";
/* 
 * jsjang 2013.7.5 
 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건
 * end 
 */  
//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	var hblListParam=docObjects[1].GetSaveString(false);
	var docListParam=docObjects[3].GetSaveString(false);
	var cntrListParam=docObjects[2].GetSaveString(false);
	var sheetParam='';
	/* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
	isError=false;	
	if(hblListParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= hblListParam;
	  	hblListSheet=true;
	}
	if(docListParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= docListParam;
	  	docListSheet=true;
	}
	if(cntrListParam!=''){
		sheetParam+= '&';
    	sheetParam+= cntrListParam;
    	cntrListSheet=true;
    }
	
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	var frtSdListParam=docObjects[4].GetSaveString(false);
    if(frtSdListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[4], '');
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtSdListParam=docObjects[4].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtSdListParam;
    	frtSdSheet=true;
	}
    
    fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
    var frtBcListParam=docObjects[5].GetSaveString(false);
    if(frtBcListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[5], 'b_');
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtBcListParam=docObjects[5].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtBcListParam;
    	frtBcSheet=true;
	}
    
    fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
    var frtDcListParam=docObjects[6].GetSaveString(false);
	if(frtDcListParam!=''){
		var rtnFlg=frCheckInpuVals(docObjects[6], 'dc_');
		if(rtnFlg=='IV'){
    		isError=true;
    	}
		frtDcListParam=docObjects[6].GetSaveString(false);
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
var refCheck=true;
function doWork(srcName){
	
	// #1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
	setSaveConfirmMsg(srcName);
	
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
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
      	        			  alert(getLabel('SEA_COM_ALT042')+'\n\n' + 'B/L Office: ' + frm1.ref_ofc_cd.value + ', Your Office: ' + ofc_cd);
      	        			  frm1.ref_ofc_cd.focus();
      	        			  return;
      	        		  }
      	        	  } else {
      	        		  if(ofc_cd != frm1.h_ref_ofc_cd.value){
      	        			  alert(getLabel('SEA_COM_ALT042')+'\n\n' + 'B/L Office: ' + frm1.h_ref_ofc_cd.value + ', Your Office: ' + ofc_cd);
      	        			  frm1.ref_ofc_cd.focus();
      	        			  return;
      	        		  } else if(ofc_cd != frm1.ref_ofc_cd.value){
      	        			  alert(getLabel('SEA_COM_ALT042')+'\n\n' + 'B/L Office: ' + frm1.ref_ofc_cd.value + ', Your Office: ' + ofc_cd);
      	        			  frm1.ref_ofc_cd.focus();
      	        			  return;
      	        		  }	        		  
      	        	  }
      	          }   
    	        //#5413 [BINEX] IT NO. DUPLICATE VALIDATION (remove this logic)
//    	          if(frm1.it_no.value != ""){
//    	        	  ajaxSendPost(getItNoCheck, 'reqVal', '&goWhere=aj&bcKey=getItNoCheck&f_air_sea=S&f_bnd_clss_cd=I&f_biz_clss_cd=M&f_it_no='+frm1.it_no.value+'&f_intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
//    	      	     	if(!itCheck){
//    	      	     		return;
//    	      	     	}
//    	          }                

        		if(frm1.intg_bl_seq.value=="" || frm1.intg_bl_seq.value=="1"){
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
	     	   /*
	        	if(blCheckInpuVals()){
	     		  	//'Do you want to create MBL?')){
					if(confirm(getLabel('FMS_COM_CFMCRE'))){
	            	   gridAdd(0);
	            	   docObjects[0].SetCellValue(1, 1,1);
	            	   //save post date, office info
	            	   if(ofc_post_dt=="ETD"){
	           				frm1.post_dt.value=frm1.etd_dt_tm.value;
	           			}else if(ofc_post_dt=="ETA"){
	           				frm1.post_dt.value=frm1.eta_dt_tm.value;
	           			}
	            	   doShowProcess();
	                   frm1.f_cmd.value=ADD;
	            	   docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
	        	   }
	     	   }
	     	   */
	     	   
	     	  // #48893 - [BINEX] OPEN Invoice 관련 - MB/L 공백제거 
	     	  frm1.ref_no.value=trim(frm1.ref_no.value);
	     	  frm1.bl_no.value=trim(frm1.bl_no.value);
	     	  if(blCheckInpuVals()){
	     	      if(frm1.intg_bl_seq.value=='' || frm1.intg_bl_seq.value=='1'){
	     		      if(frm1.ref_no.value=='' || frm1.ref_no.value=="AUTO"){
        			      frm1.ref_no.value='';
        				  refCheck=true;
        			  }else{
        			      //ref_no가 자동채번이 아닌경우 저장되어 있는지 체크해야 함.
        				  ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=S&f_bnd_clss_cd=I&f_biz_clss_cd=M&f_ref_no='+frm1.ref_no.value, './GateServlet.gsl');
        			  }
        	      }
	     	      if(!cntrListValid(docObjects[2])){
        	          alert(getLabel('SEA_COM_ALT020'));
        	          return;
        	      }
        	      if(refCheck){
        	          ajaxSendPost(getMblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=I&f_biz_clss_cd=M&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');        		   
        	      }
	     	  }
	    	/* 
	    	 * jsjang 2013.7.5 
	    	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
	    	 */        
	    	 cntr_ship_init();
	    	/* 
	    	 * jsjang 2013.7.5 
	    	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 End 
	    	 */		        
	     	  break;
	        case "SAVE_MODIFY":	//등록
               frm1.f_cmd.value=MODIFY;
               //25559 MBL 중복 체크를 한다.
               blDupl=false;
               
               // #48893 - [BINEX] OPEN Invoice 관련 - MB/L 공백제거 
	     	   frm1.ref_no.value=trim(frm1.ref_no.value);
	     	   frm1.bl_no.value=trim(frm1.bl_no.value);
	     		 
               if(frm1.h_bl_no.value!=frm1.bl_no.value){
            	   ajaxSendPost(getMblCheckNoEmpBL, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=I&f_biz_clss_cd=M&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');        		   
               } 
               if (blDupl) {
            	   return;
               }
               if(blCheckInpuVals()){
              	   if(!cntrListValid(docObjects[2])){
            		   alert(getLabel('SEA_COM_ALT020'));
            		   return;
            	   }
                   //전체 CellRow의 갯수
//                   if(confirm(getLabel(saveMsg))){
					   //frm1.c_mrn_no.value      = frm1.mrn_no.value;
					   //frm1.c_bl_ser_no.value= frm1.bl_ser_no.value;
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
                	 	//LHK REF_NO MODIFY 시 중복 Check
                	   ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=S&f_bnd_clss_cd=I&f_biz_clss_cd=M&f_ref_no='+frm1.ref_no.value+'&mbl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
                	   if(refCheck){
//	                	   doShowProcess();
	                	   //BL No. 가 없을 경우
             			   //The [HB/L No.] is Blank. Generate the Number? Yes/No. Yes 일 경우 Save 진행 
             			   var blNullChk=true;
                   		   if(frm1.ref_no.value == ""){
                   			   blNullChk=confirm(getLabel('SEA_COM_ALT023'));
                   		   }
                   		   if(blNullChk){
                   			   if(confirm(getLabel(saveMsg))){
                        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
                        		   var sndParam=getSndParam();
                        		   if(sndParam == true)	{	return false;	}                   				   
                   				   //docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
                          		 //#4084 (JAPT) same currency invoice - exchange rate validation
                        		   exchangeRateVal();                        		   
                   				   docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
                   			   }			   
                   		   }
                	    }	   
//                   }
               }
				/* 
				 * jsjang 2013.7.5 
				 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
				 */        
				 cntr_ship_init();
				/* 
				 * jsjang 2013.7.5 
				 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 End 
				 */	    
               break;
	        case "CLOSE_MODIFY":	//등록
	        	
    	     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정 
    	     	if(!chkIntgBlModiTms(srcName)){
    	     	   return;
    	     	}			
    	     	
	        	frm1.f_cmd.value=COMMAND10;
	       	   if(!cntrListValid(docObjects[2])){
	    		   alert(getLabel('SEA_COM_ALT020'));
	    		   return;
	    	   }
	       	   
	       	//#5413 [BINEX] IT NO. DUPLICATE VALIDATION (remove this logic)
// 	          if(frm1.it_no.value != ""){
// 	        	  ajaxSendPost(getItNoCheck, 'reqVal', '&goWhere=aj&bcKey=getItNoCheck&f_air_sea=S&f_bnd_clss_cd=I&f_biz_clss_cd=M&f_it_no='+frm1.it_no.value+'&f_intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
// 	      	     	if(!itCheck){
// 	      	     		return;
// 	      	     	}
// 	          }
	        	if(confirm(getLabel(saveMsg))){
		        	gridAdd(0);
		        	docObjects[0].SetCellValue(1, 1,1);
		        	frm1.f_bl_no.value=frm1.bl_no.value;
         		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
         		   var sndParam=getSndParam();
         		   if(sndParam == true)	{	return false;	}  		        	
					doShowProcess();
					//docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
					docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
	        	}
	        	/* 
	        	 * jsjang 2013.7.5 
	        	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
	        	 */        
	        	 cntr_ship_init();
	        	/* 
	        	 * jsjang 2013.7.5 
	        	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 End 
	        	 */		        	
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
					//docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
					docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
	        	}
	        	/* 
	        	 * jsjang 2013.7.5 
	        	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
	        	 */        
	        	 cntr_ship_init();
	        	/* 
	        	 * jsjang 2013.7.5 
	        	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 End 
	        	 */		        	
	        	break;
	        case "MBLCNF":
	        	break;
	        case "MKTS":
        	   if(frm1.c_mrn_no.value==''){
        		   frm1.mrn_no.focus();
        		   //Please save MRN No!
        		   alert(getLabel('FMS_COM_ALT015') + " \n - " + getLabel('FMS_COD_MRNO'));
        	   }
        	   else if(frm1.c_bl_ser_no.value==''){
        		   frm1.bl_ser_no.focus();
        		   //Please save MSN No!
        		   alert(getLabel('FMS_COM_ALT015') + " \n - " + getLabel('FMS_COD_MSNO'));
        	   }
        	   else{
	        	   var isOk=false;
	        	   var hblNo='';
	        	   var hblCnt=0;
	        	   fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	        	   for(var i=1; i < docObjects[1].RowCount(); i++){
	        		   if(docObjects[1].GetCellValue(i, 'hbl_intg_bl_seq')!=''&&docObjects[1].GetCellValue(i, 'hbl_intg_bl_seq')!='undefined'){
	        			   isOk=true;
	        			   hblCnt++;
	        		   //HSN을 등록함
	        		   }else if(docObjects[1].GetCellValue(i, 'hbl_ser_no')==''){
	        			   hblNo=docObjects[1].GetCellValue(i, 'hbl_bl_no');
	        			   isOk=false;
	        			   break;
	        		   }
	        	   }
	        	   if(!isOk){
	        		   if(hblCnt==0){
	        			   //'Please input the HBL information first!');
	        			   alert(getLabel('FMS_COM_ALT006') + " \n - " + getLabel('FMS_COD_HBL_'));
	        		   }
	        		   else{
	        			   //'The B/L No.['+hblNo+'] is missed HSN No.!');
	        			   alert(getLabel('FMS_COM_ALT010') + " \n - " + getLabel('FMS_COD_HSN_'));
	        		   }
	        	   }
	        	   else 
	        		   //Do you want to create T/S Bill of Lading?
	        		   if(confirm(getLabel('FMS_COM_CFMCRE'))){
	                   frm1.f_cmd.value=COMMAND02;
	            	   gridAdd(0);
	            	   docObjects[0].SetCellValue(1, 1,1);
	         		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
	         		   var sndParam=getSndParam();
	         		   if(sndParam == true)	{	return false;	} 		            	   
	            	   doShowProcess();
	            	   //docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
	            	   docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
	               }
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
        	   
        	   
	        case "DOCFILE":	//첨부파일
	        	var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
	        		
		        	/**  Document List ==> Common Memo 연동 파라미터 (S) */
		        	reqParam += '&palt_mnu_cd=OIM';
		        	reqParam += '&opr_no='+frm1.f_ref_no.value;
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
        	   if(frm1.f_ref_no.value == "" && frm1.f_bl_no.value == ""){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_ref_no.focus();
        		   return;
        	   }
        	   else{
        		   //#5188 [BINEX] AFTER V470.06 RELEASE, FILING # RETRIEVE ON BL ENTRY
        		   frm1.f_intg_bl_seq.value='';
        		   
        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
                   frm1.f_cmd.value=SEARCHLIST;
//            	   doShowProcess();
            	   submitForm();
        	   }
        	   break;
	        case "SEARCHLIST01":	//조회
        	   if(frm1.intg_bl_seq.value!=''){
	        	   if(frm1.f_ref_no.value=='' && frm1.f_bl_no.value==''){
	        		   alert(getLabel('FMS_COM_ALT014'));
	        		   return;
	        	   }
	        	   else{
	                   frm1.f_cmd.value=SEARCHLIST01;
	            	   //doShowProcess();
	                   fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
 	            	   docObjects[1].DoSearch("SEI_BMD_0040_1GS.clt", FormQueryString(frm1) );
	        	   }
        	   }
        	   break;
	        case "SEARCH_DOC":	//첨부문서 조회
        	   if(frm1.intg_bl_seq.value!=''){
	        	   //Doccument File List 조회
		   	       frm1.f_cmd.value=SEARCHLIST02;
		   	       fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
 		   	 	   docObjects[3].DoSearch("./SEE_BMD_0021_1GS.clt", FormQueryString(frm1) );
        	   }	   	 	   
        	   break;
	        case "SEARCH_CNTR":	//첨부문서 조회
        	   if(frm1.intg_bl_seq.value!=''){
	   		      //Doccument File List 조회
	   	          frm1.f_cmd.value=SEARCHLIST03; 
	   	          fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
                   if(use_cfs_fields == 'Y') {
                       docObjects[2].DoSearch("./SEE_BMD_0040_3GS.clt", FormQueryString(frm1));
                   }else{
                       docObjects[2].DoSearch("./SEI_BMD_0040_2GS.clt", FormQueryString(frm1));
                   }
        	   }	   	 	   
        	   break; 	
	        case "GOTOHB":		//S/R 화면호출
               var paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST11+"&f_intg_bl_seq="+frm1.intg_bl_seq.value;
               parent.mkNewFrame('HB/L Entry', paramStr);
               break;
	        case "MFPRINT":
        	   if(frm1.bl_no.value==""){
        		   //Please retrieve data.
        		   alert(getLabel('FMS_COM_ALT029'));
        		   return;
        	   }
        	   var param='title=Sea Consolidated Cargo Manifest';
        	   param += '&cmd_type=21';
        	   param += '&bl_no=' + frm1.bl_no.value;
        	   popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
        	   break;
	        case "PRINT":
        	   if(frm1.intg_bl_seq.value == ""){
        		   //Please retrieve data.
        		   alert(getLabel('FMS_COM_ALT029'));
         	   }
        	   else{
         			var reqParam='?intg_bl_seq='  +frm1.intg_bl_seq.value;
	         		reqParam += '&master_bl_no=' +frm1.bl_no.value;
	         		popGET('RPT_PRN_0090.clt'+reqParam, '', 400, 400, "scroll:yes;status:no;help:no;");
         	   }
        	   break;
        	   //2010.12.22 MBL도 HBL과 같은 조건으로 Copy 버튼 추가
           case "COPY":	//조회
        	   
        	   //BL_COPY COPY시 컨펌메시지 없이 바로 Submit후 frt Check화면을 보여준다
        	   frm1.f_cmd.value=COMMAND03;
        	   doShowProcess();
        	   frm1.submit();
        	   
//        	   if(confirm(getLabel('FMS_COM_CFMCPY'))){
//                   frm1.f_cmd.value=COMMAND03;
////            	   doShowProcess();
//        		   submitForm();
//        	   }
        	   break;
           case "SEARCH_FRT":	//Freight 조회
         		if(frm1.bl_sts_cd.value!='NA'){
         			searchGrid(6);
         			searchGrid(7);
         			searchGrid(8);
         			searchGrid(9);
         		}
         		break;
           case "GOTOACCT":
        	   /*
if(sheetObj1.GetCellValue(sheetObj1.selectrow, 'bl_no')!='' || sheetObj1.GetCellValue(sheetObj1.selectrow, 'ref_no')!=''){
        		   var formObj=document.frm1;
        		   var paramStr="./ACC_INV_0040.clt?";
paramStr+= "s_mbl_no=" + sheetObj1.GetCellValue(sheetObj1.selectrow, 'bl_no');
paramStr+= "&s_intg_bl_seq=" + sheetObj1.GetCellValue(sheetObj1.selectrow, 'intg_bl_seq');
paramStr+= "&s_ref_no=" + sheetObj1.GetCellValue(sheetObj1.selectrow, 'ref_no');
        		   parent.mkNewFrame('Invoice List', paramStr);
        	   }
        	   */
        	   if(frm1.bl_no.value!='' || formObj.ref_no.value!=''){
        		   var formObj=document.frm1;
        		   var paramStr="./ACC_INV_0040.clt?";
        		   //hsk
					paramStr+= "f_mhbl_no=" + frm1.bl_no.value;
					paramStr+= "&s_intg_bl_seq=" + frm1.intg_bl_seq.value;
					paramStr+= "&f_ref_no=" + formObj.ref_no.value;
					           			// #22112 Billing Carrier 추가
					paramStr+= "&s_carr_trdp_cd=" + formObj.carr_trdp_cd.value;
					paramStr+= "&s_carr_trdp_nm=" + formObj.carr_trdp_nm.value;
					paramStr+= "&refType=fileNo";
					paramStr+= "&linkFlag=Y&blType=MBL";
					
					//#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : Link시 검색기간 제외 조회 옵션처리
					paramStr+= "&linkOpt=KEY";
					// OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
					paramStr+= "&f_air_sea_clss_cd=S&f_bnd_clss_cd=I";
					
        		   parent.mkNewFrame('Invoice List', paramStr);
        	   }
        	   break;
           case "HBL_ENTRY":
          		var formObj=document.frm1;
          		if(formObj.ref_no.value!=''){
          			var paramStr="./SEI_BMD_0020.clt?";
          			paramStr+= "f_mbl_ref_no=" + formObj.ref_no.value;
          			parent.mkNewFrame('Booking & HBL', paramStr);
          		}
           break;
           case "PROFIT_REPORT":
        	   var formObj=document.frm1;
        	   var reqParam='?intg_bl_seq=' + formObj.intg_bl_seq.value;
					reqParam += '&mbl_no=' + formObj.bl_no.value;
					reqParam += '&ref_no=' + formObj.ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "S";
					reqParam += '&bnd_clss_cd=' + "I";
					reqParam += '&biz_clss_cd=' + "M";
				popGET('RPT_PRN_0180.clt'+reqParam, '', 1270, 750, "scroll:yes;status:no;help:no;");
		   break;   
           case "S_DOC":
        	    fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	       		var sheetObj3=docObjects[3];	
	   	 		if(sheetObj3.GetTotalRows()> 0){
	  	 			var formObj=document.frm1;
	  	 			formObj.file_name.value='doc_list.mrd';
	  	 			formObj.title.value='Document List';
	  	 			//Parameter Setting
	  	 			var param='[' + formObj.intg_bl_seq.value + ']';			// [1]
	  	 			param += '[OIM]'; 											// [2] MASTER/HOUSE/OTH 여부
	  	 			param += '[' + formObj.bl_no.value + ']';				// [3] MBL_NO/HBL_NO
	  	 			param += '[' + formObj.user_id.value + ']';				// [4]
	  	 			formObj.rd_param.value=param;
	  	 			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   	 		}
       	   break;
		   	/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
           case "SEARCH_JB":	//Job template & History
	     	   if(frm1.bl_sts_cd.value!='NA'){
	     		//처리내역( Job temlate에 따라서)
	     		 searchGrid(10);
	     	   }
    	   		break;	
           // #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
           case "SEARCH_WO":	//WORK ORDER 조회
        	   if(frm1.bl_sts_cd.value!='NA'){
				   //Container List 조회
        		   searchGrid(11);
        	   }
        	   break;
           case "WORKORDER":	//Work Order 화면호출
        	   /*
 	           var param='f_intg_bl_seq=' + frm1.intg_bl_seq.value;
 		   		   param += '&air_sea_clss_cd=S'; 
 		   		   param += '&bnd_clss_cd=I';
 		   		   param += '&biz_clss_cd=M';
                var paramStr="./AIC_WOM_0012.clt?f_cmd="+SEARCH01+"&s_type=B&"+param;
                parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
                */
           		var paramStr="./AIC_WOM_0012.clt?air_sea_clss_cd=S&bnd_clss_cd=I&biz_clss_cd=M";
           		var param = "&f_cmd=" + SEARCH01;
           		param += "&s_type=B";
           		param += "&f_intg_bl_seq=" + frm1.intg_bl_seq.value;
           		parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
                break;
        }
    }
    catch(e) {
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
function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_bl_no.value = getParam(url,"f_bl_no");;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_ref_no.value = getParam(url,"f_ref_no");
	
	doWork('SEARCHLIST');
}

function submitForm(){
	var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./SEI_BMD_0040AJ.clt",
		   dataType: 'xml',
		   data: $(formObj).serialize(),
		   success: function(data){
			   
			   setFieldValue( formObj.bl_sts_cd, $('bl_sts_cd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.f_intg_bl_seq, $('f_intg_bl_seq',data).text());
			   setFieldValue( formObj.c_mrn_no, $('mrn_no',data).text());
			   setFieldValue( formObj.c_bl_ser_no, $('bl_ser_no',data).text());
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
			   setFieldValue( formObj.sub_bl_no, $('sub_bl_no',data).text());
			   setFieldValue( formObj.hbl_tp_cd, $('hbl_tp_cd',data).text());
			   setFieldValue( formObj.sc_no, $('sc_no',data).text());
			   setFieldValue( formObj.post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.mrn_no, $('mrn_no',data).text());
			   setFieldValue( formObj.bl_ser_no, $('bl_ser_no',data).text());
			   setFieldValue( formObj.imp_ref_no, $('imp_ref_no',data).text());
			   setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
			   setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
			   setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
			   setFieldValue( formObj.ntfy_trdp_cd, $('ntfy_trdp_cd',data).text());
			   setFieldValue( formObj.ntfy_trdp_nm, $('ntfy_trdp_nm',data).text());
			   setFieldValue( formObj.ntfy_trdp_addr, $('ntfy_trdp_addr',data).text());
			   setFieldValue( formObj.prnr_trdp_cd2, $('prnr_trdp_cd2',data).text());
			   setFieldValue( formObj.prnr_trdp_nm2, $('prnr_trdp_nm2',data).text());
			   setFieldValue( formObj.prnr_trdp_addr2, $('prnr_trdp_addr2',data).text());
			   setFieldValue( formObj.agent_trdp_cd, $('agent_trdp_cd',data).text());
			   setFieldValue( formObj.agent_trdp_nm, $('agent_trdp_nm',data).text());
			   setFieldValue( formObj.agent_trdp_addr, $('agent_trdp_addr',data).text());
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.trnk_vsl_cd, $('trnk_vsl_cd',data).text());
			   setFieldValue( formObj.trnk_vsl_nm, $('trnk_vsl_nm',data).text());
			   setFieldValue( formObj.trnk_voy, $('trnk_voy',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.org_etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.org_eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.f_eta_dt_tm, $('f_eta_dt_tm',data).text());
			   setFieldValue( formObj.org_f_eta_dt_tm, $('f_eta_dt_tm',data).text());
			   setFieldValue( formObj.carr_trdp_cd, $('carr_trdp_cd',data).text());
			   setFieldValue( formObj.carr_trdp_nm, $('carr_trdp_nm',data).text());
			   setFieldValue( formObj.carr_trdp_addr, $('carr_trdp_addr',data).text());
			   setFieldValue( formObj.por_cd, $('por_cd',data).text());
			   setFieldValue( formObj.por_nm, $('por_nm',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.del_cd, $('del_cd',data).text());
			   setFieldValue( formObj.del_nm, $('del_nm',data).text());
			   setFieldValue( formObj.fnl_dest_loc_cd, $('fnl_dest_loc_cd',data).text());
			   setFieldValue( formObj.fnl_dest_loc_nm, $('fnl_dest_loc_nm',data).text());
			   setFieldValue( formObj.cy_trdp_cd, $('cy_trdp_cd',data).text());
			   setFieldValue( formObj.cy_trdp_nm, $('cy_trdp_nm',data).text());
			   setFieldValue( formObj.cfs_trdp_cd, $('cfs_trdp_cd',data).text());
			   setFieldValue( formObj.cfs_trdp_nm, $('cfs_trdp_nm',data).text());
			   setFieldValue( formObj.rt_trdp_cd, $('rt_trdp_cd',data).text());
			   setFieldValue( formObj.rt_trdp_nm, $('rt_trdp_nm',data).text());
			   setFieldValue( formObj.it_no, $('it_no',data).text());
			   setFieldValue( formObj.te_dt_tm, $('te_dt_tm',data).text());
			   setFieldValue( formObj.it_loc, $('it_loc',data).text());
			   
			   //'<bean:write name="hblVO" property="frt_term_cd"/>'
			   if($('frt_term_cd',data).text()==""){
				   setFieldValue( formObj.frt_term_cd, "CC");
			   }else{
				   setFieldValue( formObj.frt_term_cd, $('frt_term_cd',data).text());
			   }
			   
			   
			   setFieldValue( formObj.shp_mod_cd, $('shp_mod_cd',data).text());
			   setFieldValue( formObj.fm_svc_term_cd, $('fm_svc_term_cd',data).text());
			   setFieldValue( formObj.to_svc_term_cd, $('to_svc_term_cd',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.meas, $('meas',data).text());
			   setFieldValue( formObj.meas1, $('meas1',data).text());
			   setFieldValue( formObj.curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.profit_share, $('profit_share',data).text());
			   setFieldValue( formObj.express_tp_cd, $('express_tp_cd',data).text());
			   setFieldValue( formObj.obl_tp_cd, $('obl_tp_cd',data).text());
			   $(formObj.rlsd_flg).val($('rlsd_flg',data).text());
			   setFieldValue( formObj.rlsd_dt_tm, $('rlsd_dt_tm',data).text());
			   setFieldValue( formObj.bl_iss_dt, $('bl_iss_dt',data).text());
			   setFieldValue( formObj.opr_usrid, $('issued_by',data).text());
			   setFieldValue( formObj.opr_usrnm, $('proc_usrnm',data).text());
			   setFieldValue( formObj.opr_ofc_cd, $('proc_ofccd',data).text());
			   setFieldValue( formObj.opr_dept_cd, $('proc_dept_cd',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   setFieldValue( formObj.sls_usr_nm, $('sls_usr_nm',data).text());
			   setFieldValue( formObj.sls_dept_cd, $('sls_dept_cd',data).text());
			   //OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
			   setFieldValue( formObj.cs_usrid, $('cs_usrid',data).text());
			   setFieldValue( formObj.cs_usr_nm, $('cs_usr_nm',data).text());
			   setFieldValue( formObj.ccn_no, $('ccn_no',data).text());
			   setFieldValue( formObj.mnf_fr_loc, $('mnf_fr_loc',data).text());
			   setFieldValue( formObj.mnf_to_loc, $('mnf_to_loc',data).text());
			   setFieldValue( formObj.mk_txt, $('mk_txt',data).text());
			   setFieldValue( formObj.desc_txt, $('desc_txt',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   setFieldValue( formObj.desc_txt1, $('desc_txt1',data).text());
			   
			   setFieldValue( formObj.ctrb_ofc_cd, $('ctrb_ofc_cd',data).text());
			   setFieldValue( formObj.ctrb_dept_cd, $('ctrb_dept_cd',data).text());
			   setFieldValue( formObj.ctrb_ratio_yn, $('ctrb_ratio_yn',data).text());
			   setFieldValue( formObj.ctrb_mgn, $('ctrb_mgn',data).text());
			   
			   //setFieldValue( formObj.xcrtDt, $('obrd_dt_tm',data).text());
			   var obrddttm = $('obrd_dt_tm',data).text().replaceAll('-','');
			   setFieldValue( formObj.xcrtDt, obrddttm);
			   
			   setFieldValue( formObj.f_modify, $('f_modify',data).text());	//#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED
			  //#1619 [CLT] Original B/L Type- 항목 정리 setFieldValue( formObj.bl_rlse_tp_cd, $('bl_rlse_tp_cd',data).text()); //<!--#1430 [PATENT] 0215_15 B/L TYPE DIVERSELY-->
			   
			   /* #1804 [Split - 1] [PATENT] Payment Verification - 기능보완 */
			   setFieldValue( formObj.verify_flag, $('verify_flag',data).text());

			   setFieldValue( formObj.rep_cmdt_cd, $('rep_cmdt_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_nm, $('rep_cmdt_nm',data).text());

			   /*#657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL*/
			   setFieldValue( formObj.inter_use_flag, $('inter_use_flag',data).text());
			   //#4724	[Best Ocean] Ocean Import OBL Received and Received Date column and entry add
			   setFieldValue( formObj.org_bl_rcvd_flg, $('org_bl_rcvd_flg',data).text());
			   setFieldValue( formObj.rcvd_dt_tm, $('rcvd_dt_tm',data).text());
			   
			   //OFVFOUR-8115 [BNX] Adding Berth Date Field in OIM and OIH Entry
			   setFieldValue( formObj.berth_dt, $('berth_dt',data).text());
			   
			   fnbtnCtl();
			   //doBtnAuthority(attr_extension);
			   
			   tab2click="";
			   tab3click="";
			   tab4click="";
			   tab5click="";
			   tab6click=""; 
			   tab7click="";
			   setupPage();
			   if(delete_show_complete == "Y"){
				   showCompleteProcess();
				   delete_show_complete = "N";
			   }
		   },
		   error: function(){
			   doHideProcess();
			   // #5006 [Great Luck] Save/X gives "System Error"
			   //alert("System Error!");
		   }		  
		 });
}

/* 
* jsjang 2013.7.5 
* 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
*/ 
function cntr_ship_init()
{
  	var formObj=document.frm1;
  	tab_pck_qty=formObj.pck_qty.value;
  	tab_meas=formObj.meas.value;
  	tab_meas1=formObj.meas1.value;
  	tab_grs_wgt=formObj.grs_wgt.value;
  	tab_grs_wgt1=formObj.grs_wgt1.value;
}
/* 
* jsjang 2013.7.5 
* 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end 
*/ 
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
			    sndParam+= '&f_air_sea_clss=S';
			var rtnary=new Array(1);
			var rtnVal =  ComOpenWindow('./SEE_BMD_0050.clt'+sndParam,  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:317px;dialogHeight:150px" , true);
			if(rtnVal!=""&&typeof(rtnVal)!="undefined"){
				frm1.f_bl_no.value=rtnVal;
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
    document.frm1.f_cmd.value='';
    document.frm1.submit();
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	if(errMsg==''&&frm1.intg_bl_seq.value==''){
frm1.f_intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
frm1.intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
frm1.bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
frm1.f_bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
frm1.ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
frm1.f_ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
//		frm1.sel_ref_no.value       = docObjects[0].CellValue(1, "sv_ref_no");
//		frm1.ref_no.className = 'search_form-disable';
//		frm1.ref_no.readOnly  = true;
	}

	// 처리후에 org_etd_dt_tm/org_eta_dt_tm 을  설정해준다. 
	frm1.org_etd_dt_tm.value=frm1.etd_dt_tm.value;
	frm1.org_eta_dt_tm.value=frm1.eta_dt_tm.value;
	
	//25595 중복 체크 
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
	if(cntrListSheet){
		doWork('SEARCH_CNTR');
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
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	
	//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
	//조회
	chkIntgBlModiTms("VIEW");	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
function getMblCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=''){
				//Please check B/L no.!
				// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다.
       	   		setPost_date("I");
				//'B/L No. is duplicated. \nDo you want to create MBL?'
				if(confirm(getLabel('FMS_COM_ALT008') + getLabel('FMS_COM_CFMCON'))){
	            	   gridAdd(0);
	            	   docObjects[0].SetCellValue(1, 1,1);
	            	   //if(user_role_cd!="ADM"){
	            		   //save post date, office info
	            	   		// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다. 
	            	   		//confirm 전에 check;
	            	   		/***	
	            		   if(ofc_post_dt=="ETD"){
	            			   frm1.post_dt.value=frm1.etd_dt_tm.value;
	            		   }
	            		   else if(ofc_post_dt=="ETA"){
	            			   if(frm1.f_eta_dt_tm.value!=''){
	            				   frm1.post_dt.value=frm1.f_eta_dt_tm.value;
	            			   }
	            			   else{
	            				   frm1.post_dt.value=frm1.eta_dt_tm.value;
	            			   }
	            		   }
	            		   ***/
	            	   //}
	         		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
	         		   var sndParam=getSndParam();
	         		   if(sndParam == true)	{	return false;	} 	     
	        		   
	         		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
	        		   if (frm1.copy_bl_seq.value != ""){
	        			   frm1.copy_bl_seq.value = "";
	        		   }
	        		   
	            	   doShowProcess();
	                   frm1.f_cmd.value=ADD;
	            	   //docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
	            	   docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
	        	   }
			}
			else if(doc[1]=='RV'){
				//Please check B/L no.!!
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_BLNO'));
			}
			else{
				// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다.
       	   		setPost_date("I");
				//'Do you want to create MBL?')){
				if(confirm(getLabel(saveMsg))){
            	   gridAdd(0);
            	   docObjects[0].SetCellValue(1, 1,1);
            	   //if(user_role_cd!="ADM"){
            		   //save post date, office info
		       	   		// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다. 
		       	   		//confirm 전에 check;
		       	       /***            	   
            		   if(ofc_post_dt=="ETD"){
            			   frm1.post_dt.value=frm1.etd_dt_tm.value;
            		   }
            		   else if(ofc_post_dt=="ETA"){
            			   if(frm1.f_eta_dt_tm.value!=''){
            				   frm1.post_dt.value=frm1.f_eta_dt_tm.value;
            			   }
            			   else{
            				   frm1.post_dt.value=frm1.eta_dt_tm.value;
            			   }
            		   }
            		   ***/
            	   //}
         		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
         		   var sndParam=getSndParam();
         		   if(sndParam == true)	{	return false;	} 
         		   
         		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
            	   
        		   doShowProcess();
                   frm1.f_cmd.value=ADD;
            	   //docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
            	   docObjects[0].DoAllSave("./SEI_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
        	   }			
			}
		}
	}
	else{
		//SEE_BMD_MSG43		
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
				if(confirm(getLabel('FMS_COM_ALT008') + getLabel('FMS_COM_CFMCON'))){
					blDupl=false;
				} else {
					blDupl=true;
				}
			}else if(doc[1]=='RV'){
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_BLNO'));	
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
				//Ref. No. is duplicate.
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_REFN'));
				frm1.ref_no.focus();
			}
			else{
				refCheck=true;
			}
		}
	}
	else{
		//SEE_BMD_MSG43
		refCheck=false;
	}
}
function gridAdd(objIdx){
	fnSetIBsheetInit(objIdx);   //grid가 생성되지않았으면 생성(속도개선)
 	var intRows=docObjects[objIdx].LastRow() + 1;
	docObjects[objIdx].DataInsert(intRows);
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,obj){
    switch(doWhat){
    case 'DATE1':    //달력 조회 팝업 호출      
    	 var cal=new ComCalendar();
         cal.setDisplayType('date');
         cal.select(obj, 'MM-dd-yyyy');
    break;
    }
}
/**
 * 파일목록 조회시. 3번째 Sheet를 리턴함.
 */
function getSelectedFiles(){
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[3];
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
        tabObjs[6].style.display='none';
        
        //comSheetObject('sheet2');
        fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
        
	    //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
    //Container List 목록      
    } else if( isNumSep == "02" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="inline";
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
        tabObjs[6].style.display='none';
        
        //comSheetObject('sheet4');
        fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
        
        if(tab2click == ""){
        	tab2click="Y";
        	doWork('SEARCH_CNTR');
        }
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
    //Mark Description 탭
    } else if( isNumSep == "03" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="none";
        tabObjs[2].style.display='inline';
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
        tabObjs[6].style.display='none';
      //#2081 [PATENT] OEM Container Information 버튼 옵션추가
        if(tab2click == ""){
        	tab2click="Y";
        	doWork('SEARCH_CNTR');
        }
        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
    }else if( isNumSep == "04" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="none";
        tabObjs[2].style.display="none";
        tabObjs[3].style.display='inline';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
        tabObjs[6].style.display='none';
        
        //comSheetObject('sheet7');comSheetObject('sheet9');comSheetObject('sheet8');
        fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        
        //BL_COPY
        var copy_bl_seq = frm1.copy_bl_seq.value;
		if (copy_bl_seq == "") {
			
			//LHK 20130812 tab Click 이후 컨테이너 저장 후 다시 클릭 할 경우, 컨테이너를 재조회 한다. Unit 에 해당하는 Cntr type Size 를 다시 가져옴.
			searchGrid(6);
			
			if(tab4click == ""){
				tab4click="Y";
				//doWork('SEARCH_CNTR');
				doWork('SEARCH_FRT');
			}
		}
		
    //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
	//Work Order
    }else if( isNumSep == "05" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="none";
        tabObjs[2].style.display="none";
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='inline';
        tabObjs[5].style.display='none';
        tabObjs[6].style.display='none';
        
        //comSheetObject('sheet12');
        fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
        
    	if(tab7click== ""){
    		tab7click="Y";
    		doWork('SEARCH_WO');
    	}
    //Shipping Document 탭
    }else if( isNumSep == "06" ) {
    	currTab=isNumSep;	//탭상태저장
	    tabObjs[0].style.display='none';
	    tabObjs[1].style.display='none';
	    tabObjs[2].style.display='none';
	    tabObjs[3].style.display='none';
	    tabObjs[4].style.display='none';
	    tabObjs[5].style.display='inline';
	    tabObjs[6].style.display='none';
	    
	    //comSheetObject('sheet3');comSheetObject('sheet10');
	    fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	    fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
	    
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        if(tab5click == ""){
        	tab5click="Y";
        	doWork('SEARCH_DOC');
        }
    /* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 - add status tab */
    //}
    }else if( isNumSep == "07" ) {
		currTab=isNumSep;	//탭상태저장
      	tabObjs[0].style.display='none';
      	tabObjs[1].style.display='none';
      	tabObjs[2].style.display='none';
      	tabObjs[3].style.display='none';
      	tabObjs[4].style.display='none';
      	tabObjs[5].style.display='none';
      	tabObjs[6].style.display='inline';
      	
      	//comSheetObject('sheet11');
      	fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
      	
	    if(tab6click== ""){
	        tab6click="Y";
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
var obl_decimal_len = 0;

//#2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가
var bl_inv_auto_creation ="";

function loadPage() {
    var opt_key="USE_CFS_FIELDS";
    ajaxSendPost(setUseCfsFieldsReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
	var opt_key = "OBL_DECIMAL_LEN";
	ajaxSendPost(setDecimalLen, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	/* #2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가 */
	var opt_key = "BL_INV_AUTO_CREATION";
	ajaxSendPost(setBlInvAutoCreation, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	//#OFVFOUR-7000 [TOP URGENT][BNX-CFS] GO DATE issue - Author: Thuong Huynh 2021/02/08
	var opt_key = "OIM_ETA_GO_DT_SYNC";
	ajaxSendPost(setEtaDtSync, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	/* 속도개선 주석처리 
    for(var i=0;isRun && i<docObjects.length;i++){
    	//console.log(docObjects[i].id + ' / ' + i);
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
    
    
    if(pps_use_flg != "Y"){
    	getObj("btnPierpass").style.display = "none";
    }
    
    checkBoxSetting();
    frm1.pck_qty.value=doMoneyFmt(Number(frm1.pck_qty.value).toFixed(0));
    //#2268 [UNICO, PREMIER] Decimal place of container weight to be 3 decimal digits
    frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(obl_decimal_len));
    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(obl_decimal_len));
    frm1.meas.value=doMoneyFmt(Number(frm1.meas.value).toFixed(obl_decimal_len));
    frm1.meas1.value=doMoneyFmt(Number(frm1.meas1.value).toFixed(obl_decimal_len));
    frm1.ctrb_mgn.value=doMoneyFmt(Number(frm1.ctrb_mgn.value).toFixed(2));
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	goTabSelect(frm1.f_isNumSep.value);   
    if(frm1.intg_bl_seq.value!=""){
    	doWork("SEARCHLIST01");
    	doWork('SEARCH_CNTR');
    	tab2click="Y";
    }
    if(frm1.intg_bl_seq.value==""){
    	//frm1.frt_term_cd.value = 'PP';
    	frm1.ref_no.value="AUTO";
    	//2014.1.21 #25557
    	/* oyh 2013.09.04 #20421 : [BINEX] B/L type의 default를 Express에 Y로 */
    	//frm1.express_tp_cd.value = "Y";
    	/* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting */
    	//frm1.pck_ut_cd.value = "CT"; 
    	//#6792 [AIR POWER] SETTNG UP PACKAGE DEFAULT FOR OCEAN ENTRY SCREEN
    	if(frm1.copy_bl_seq.value == ""){
    		setPckUtCd();
    	}
    }
    if(frm1.bl_sts_cd.value=='HO' || frm1.bl_sts_cd.value=='HF'){
    	//Accounting Closed. You can only edit following fields.\nPOD / ETA / CY Loc. / CFS Loc. / \n I.T No. / Date / I.T Place.');
    	alert(getLabel('SEA_COM_ALT014'));
    }
    /*S.Y BAIK (2012.12.13) 
    if(frm1.intg_bl_seq.value==""){
    	//2012/02/03 일본쪽 DESC1에 200자 이상의 데이터가 들어감 (OFC의 INV_RMK를 DEFAULT로 끌고오는걸 끊고 하드코딩함.
    	if(frm1.f_cnt_cd.value == "JP"){
    		frm1.desc_txt1.value="上記の金額を御請求申し上げますのでお支払いは下記銀行にお願い致します。\n振込手数料は誠に恐縮ですが貴社ご負担にてお願い致します。尚、小切手の宛先は　「株式会社　」　でお願い致します。\n取引銀行 : 三井住友銀行   東京中央支店   普通   8242259 / みずほ銀行   銀座支店   普通   2718998\n三菱東京UFJ銀行   新富町支店   普通   3619901   ｶ)ｴｲ.ｱｲ.ｴﾌ.";
    	}
    	//frm1.desc_txt1.value = frm1.h_inv_rmk.value;
	}*/
	//st_hear.style.display 		= 'block';
	if(frm1.h_post_dt_imp.value != null && frm1.h_post_dt_imp.value == 'D-ETA')
	{
		getObj('st_hear').style.display='none';
		getObj('st_hear_r').style.display='inline';		
	}else{
		//alert("aaa");
		getObj('st_hear_r').style.display='none';
		getObj('st_hear').style.display='inline';
	}
	
	//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
	//조회
	chkIntgBlModiTms("VIEW");
	
	setTimeout("document.frm1.f_ref_no.focus();", 1000);
	
	/* 2016-12-12 자동완성 기능 추가 S */
	/* Master B/L Entry Tab */
    fnSetAutocomplete('shpr_trdp_nm'	, 'LINER_POPLIST', 'shipper', 'O'); 	//Shipper
    fnSetAutocomplete('cnee_trdp_nm'	, 'LINER_POPLIST', 'consignee', 'O');//Consignee
    fnSetAutocomplete('ntfy_trdp_nm'	, 'LINER_POPLIST', 'notify', 'O'); 	//Consignee
    fnSetAutocomplete('prnr_trdp_nm2'	, 'LINER_POPLIST', 'partner2', 'O'); //Triangle Agent
    fnSetAutocomplete('agent_trdp_nm'	, 'LINER_POPLIST', 'agent', 'O'); 	//Forwarding Agent
    fnSetAutocomplete('carr_trdp_nm'	, 'LINER_POPLIST', 'carr', 'O'); 	//Billing Carrier   
    
    fnSetAutocomplete('cy_trdp_nm'		, 'LINER_POPLIST', 'cy', 'O'); 		//CY Location
    fnSetAutocomplete('cfs_trdp_nm'		, 'LINER_POPLIST', 'cfs', 'O'); 		//CFS Location
    fnSetAutocomplete('rt_trdp_nm'		, 'LINER_POPLIST', 'rt', 'O');		//Return Location
    
    fnSetAutocomplete('lnr_trdp_nm'		, 'LINER_POPLIST_MS', 'liner', 'O'); //Carrier
    
    fnSetAutocomplete('por_nm'			, 'LOCATION_POPLIST', 'por', 'O');	//POR
    fnSetAutocomplete('pol_nm'			, 'LOCATION_POPLIST', 'pol', 'O');	//POL
    fnSetAutocomplete('pod_nm'			, 'LOCATION_POPLIST', 'pod', 'O');	//POD
    fnSetAutocomplete('del_nm'			, 'LOCATION_POPLIST', 'del', 'O');	//DEL    
    /* 2016-12-12 자동완성 기능 추가 E */
    
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
	
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성
	// 사용자가 저장한 Header 정보를 읽어온다.
	var pageUrl = '';
	if(use_cfs_fields == 'Y') {
		pageUrl = getPageURL('pageurl_2');
    }else{
    	pageUrl = getPageURL('pageurl_1');
    }
	
    IBS_RestoreGridSetting(formObj.user_id.value, pageUrl, docObjects[2], false,"fnRestoreGridSetEnd"); //Tab 2 Container List
    
    fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
    
    //#2586 [BNX US] COD, CREDIT HOLD ACCOUNTS NO WARNING
    if(frm1.intg_bl_seq.value != ''){
//    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, false) : "";
//    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, false) : "";
//    	(formObj.ntfy_trdp_cd.value != "") ? chkCodOnLoad("notify", formObj.ntfy_trdp_cd.value, false) : "";
//    	(formObj.prnr_trdp_cd2.value != "") ? chkCodOnLoad("partner2", formObj.prnr_trdp_cd2.value, false) : "";
//    	(formObj.agent_trdp_cd.value != "") ? chkCodOnLoad("agent", formObj.agent_trdp_cd.value, false) : "";
//    	(formObj.lnr_trdp_cd.value != "") ? chkCodOnLoad("liner", formObj.lnr_trdp_cd.value, false) : "";
//    	(formObj.carr_trdp_cd.value != "") ? chkCodOnLoad("carr", formObj.carr_trdp_cd.value, false) : "";
//    	(formObj.cy_trdp_cd.value != "") ? chkCodOnLoad("cy", formObj.cy_trdp_cd.value, false) : "";
//    	(formObj.cfs_trdp_cd.value != "") ? chkCodOnLoad("cfs", formObj.cfs_trdp_cd.value, false) : "";
//    	(formObj.rt_trdp_cd.value != "") ? chkCodOnLoad("rt", formObj.rt_trdp_cd.value, false) : "";
    }else{
    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, true) : "";
    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, true) : "";
    	(formObj.ntfy_trdp_cd.value != "") ? chkCodOnLoad("notify", formObj.ntfy_trdp_cd.value, true) : "";
    	(formObj.prnr_trdp_cd2.value != "") ? chkCodOnLoad("partner2", formObj.prnr_trdp_cd2.value, true) : "";
    	(formObj.agent_trdp_cd.value != "") ? chkCodOnLoad("agent", formObj.agent_trdp_cd.value, true) : "";
    	(formObj.lnr_trdp_cd.value != "") ? chkCodOnLoad("liner", formObj.lnr_trdp_cd.value, true) : "";
    	(formObj.carr_trdp_cd.value != "") ? chkCodOnLoad("carr", formObj.carr_trdp_cd.value, true) : "";
    	(formObj.cy_trdp_cd.value != "") ? chkCodOnLoad("cy", formObj.cy_trdp_cd.value, true) : "";
    	(formObj.cfs_trdp_cd.value != "") ? chkCodOnLoad("cfs", formObj.cfs_trdp_cd.value, true) : "";
    	(formObj.rt_trdp_cd.value != "") ? chkCodOnLoad("rt", formObj.rt_trdp_cd.value, true) : "";
    }
	//OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
	if (eblfn_flg != 'Y') {
		formObj.ref_no.disabled = true;
	}
    
	//OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN
	ajaxSendPost(setUserTeamInfo, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=opr_team&issued_by="+formObj.opr_usrid.value, "./GateServlet.gsl");
}

function fnRestoreGridSetEnd(){
	
}

function setUseCfsFieldsReq(reqVal) {
    var doc = getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1] == "Y"){
				use_cfs_fields = "Y";
			}else{
				use_cfs_fields = "N";
			}
		}
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
		case "sheet4":
			docObjects[2]=sheet_obj;
		break;
		case "sheet3":
			docObjects[3]=sheet_obj;
		break;
		case "sheet7":
			docObjects[4]=sheet_obj;
		break;
		case "sheet8":
			docObjects[5]=sheet_obj;
		break;
		case "sheet9":
			docObjects[6]=sheet_obj;
		break;
		case "sheet10":
			docObjects[7]=sheet_obj;
		break;	
		/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
		case "sheet11":
			docObjects[8]=sheet_obj;
			break;			
		/* #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가 */
		case "sheet12":
			docObjects[9]=sheet_obj;
			break;	
	}
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
//	MULTI_CURR_FLAG = "Y";
    switch(sheetNo) {
		case 1:     
		    with(sheetObj){
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
		
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('SEI_BMD_0040_HDR1'), Align:"Center"} ];
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
		    with(sheetObj){
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('SEI_BMD_0040_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",     Hidden:0,  Width:35,   Align:"Center",  ColMerge:0,   SaveName:"seq" },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_bkg_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_bl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"hbl_act_shipper",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_shpr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_cnee_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_prnr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_lnr_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"hbl_trnk_vsl",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"hbl_trnk_voy",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:0,   SaveName:"hbl_por_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"hbl_obrd_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_del_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_del_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:0,   SaveName:"hbl_del_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
	        SetSheetHeight(150);
	        //sheetObj.SetFocusAfterProcess(0);
	      }

                                   
	    break;
		case 3:		//Container List 그리드
            with(sheetObj){
                SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

                var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 }; 
                
                if(use_cfs_fields == 'Y'){
                    var headers = [ { Text:getLabel('SEI_BMD_HDR4-2'), Align:"Center"} ];
                    InitHeaders(headers, info);
                    var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"Del" },
                        {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"conls_ibflag" },
                        {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"Seq",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"soc_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
                        {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"cntr_tpsz_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"seal_no1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                        {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"seal_no2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                        {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"seal_no3",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                        {Type:"Text",      Hidden:0, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"cntr_ref_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                        {Type:"Int",       Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"cgo_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
                        {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"cgo_pck_ut",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
                        {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt1",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
                        {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:17 },
                        {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:17 },
                        {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"vol_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cntr_sprl_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_sprl_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"temp_val",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"temp_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:10,   Align:"Left",    ColMerge:0,   SaveName:"vent_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"dg_gds_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"cfs_in_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"devan_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"lfd",                KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"cntr_go_date",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cntr_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                        {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:0,   SaveName:"trkg_fee_txt",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
                        {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"prt_cgo_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N"},
                        {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_list_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vol_tot",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_cntr_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"pickup_number",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                        {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"org_pkup_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"fnl_dest_eta_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"apnt_dt",            KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"de_dt",             KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"free_det_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                		{Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"emty_rt_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 }]
						//OFVFOUR-7949 [SENKO USA] Show CCN# for Multiple Containers on AN
						cols.push({Type:"Text",      Hidden:0, Width:100,    Align:"Center",  ColMerge:0,   SaveName:"cntr_ccn_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:30 });
                    InitColumns(cols);
                    SetCountPosition(0);
                    SetEditable(1);
                    SetColProperty('cgo_pck_ut', {ComboText:PCKCD1, ComboCode:PCKCD2, DefaultValue:"CT"} );
                    //InitViewFormat(0, "lfd", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
                    //InitViewFormat(0, "org_pkup_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
                    //InitViewFormat(0, "fnl_dest_eta_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
                    //InitViewFormat(0, "apnt_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
                    //InitViewFormat(0, "de_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
                    //InitViewFormat(0, "cntr_go_date", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
                    //InitViewFormat(0, "cfs_in_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
                    //InitViewFormat(0, "devan_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
                    //InitViewFormat(0, "emty_rt_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
                    SetColProperty('soc_flg', {ComboText:LSTCD1, ComboCode:LSTCD2} );
                    SetColProperty('cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
                    SetColProperty('dg_gds_flg', {ComboText:'N|Y', ComboCode:'N|Y'} );
                    SetColProperty(0 ,"cntr_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
                    SetColProperty(0 ,"seal_no1" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
                    SetColProperty(0 ,"seal_no2" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
                    SetColProperty(0 ,"seal_no3" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
                    SetColProperty(0 ,"cntr_ref_no" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
          			
                    //#3076 [UCB] AFTER V450.04, CONTAINER TAB COPY & PASTE FUNCTION
        			//SetActionMenu("Header Setting Save|Header Setting Reset");
                    SetSheetHeight(380);
                }
                else{
                	
                    var headers = [ { Text:getLabel('SEI_BMD_HDR4-1'), Align:"Center"} ];
                    InitHeaders(headers, info);
                    var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"Del" },
                        {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"conls_ibflag" },
                        {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"Seq",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"soc_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
                        {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"cntr_tpsz_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"seal_no1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                        {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"seal_no2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                        {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"seal_no3",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                        {Type:"Text",      Hidden:0, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"cntr_ref_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                        {Type:"Int",       Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"cgo_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
                        {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"cgo_pck_ut",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
                        {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt1",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
                        {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:17 },
                        {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:17 },
                        {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"vol_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cntr_sprl_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_sprl_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"temp_val",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"temp_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:10,   Align:"Left",    ColMerge:0,   SaveName:"vent_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"dg_gds_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cntr_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                        {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:0,   SaveName:"trkg_fee_txt",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
                        {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"prt_cgo_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N"},
                        {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_list_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vol_tot",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_cntr_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        
                        //#3493 [BINEX] V461 DATA IS NOT UPDATED AFTER SAVE
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"temp_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vent_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                
                        {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"pickup_number",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                        {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"lfd",                KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"org_pkup_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"fnl_dest_eta_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"apnt_dt",            KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"de_dt",             KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"free_det_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"cntr_go_date",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
						{Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"emty_rt_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 }]
						
						//OFVFOUR-7949 [SENKO USA] Show CCN# for Multiple Containers on AN
						cols.push({Type:"Text",      Hidden:0, Width:100,    Align:"Center",  ColMerge:0,   SaveName:"cntr_ccn_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:30 });
                    InitColumns(cols);

                    SetCountPosition(0);
                    SetEditable(1);
                    SetColProperty('cgo_pck_ut', {ComboText:PCKCD1, ComboCode:PCKCD2, DefaultValue:"CT"} );
                    //InitViewFormat(0, "lfd", "MM\\-dd\\-yyyy");//?? ??? ?/?/? ?? ??
                    //InitViewFormat(0, "org_pkup_dt", "MM\\-dd\\-yyyy");//?? ??? ?/?/? ?? ??
                    //InitViewFormat(0, "fnl_dest_eta_dt", "MM\\-dd\\-yyyy");//?? ??? ?/?/? ?? ??
                    //InitViewFormat(0, "apnt_dt", "MM\\-dd\\-yyyy");//?? ??? ?/?/? ?? ??
                    //InitViewFormat(0, "de_dt", "MM\\-dd\\-yyyy");//?? ??? ?/?/? ?? ??
                    //InitViewFormat(0, "cntr_go_date", "MM\\-dd\\-yyyy");//?? ??? ?/?/? ?? ??
                    //InitViewFormat(0, "cntr_go_date", "MM\\-dd\\-yyyy");//?? ??? ?/?/? ?? ??
                    //InitViewFormat(0, "emty_rt_dt", "MM\\-dd\\-yyyy");//?? ??? ?/?/? ?? ??
                    SetColProperty('soc_flg', {ComboText:LSTCD1, ComboCode:LSTCD2} );
                    SetColProperty('cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
                    SetColProperty('dg_gds_flg', {ComboText:'N|Y', ComboCode:'N|Y'} );

                    SetColProperty(0 ,"cntr_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
                    SetColProperty(0 ,"seal_no1" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
                    SetColProperty(0 ,"seal_no2" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
                    SetColProperty(0 ,"seal_no3" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
                    SetColProperty(0 ,"cntr_ref_no" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
          			
                    //#3076 [UCB] AFTER V450.04, CONTAINER TAB COPY & PASTE FUNCTION
        			//SetActionMenu("Header Setting Save|Header Setting Reset");
                    SetSheetHeight(380);
                }
            }
                                             
		break;
	    case 4:					//첨부파일
	        with(sheetObj){
            
        // (15, 0, 0, true);

         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel('SEI_BMD_0040_HDR4'), Align:"Center"} ];
         InitHeaders(headers, info);

         var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
             {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"Del",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"palt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:0,   SaveName:"palt_ext_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:480,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_img_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_pdf_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:320,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq_d",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
          
         InitColumns(cols);

        // SetGetCountPosition()(0);
         SetEditable(1);
         SetImageList(0,APP_PATH+"/web/img/button/bt_img.gif");
         SetImageList(1,APP_PATH+"/web/img/button/bt_pdf.gif");
         sheetObj.SetDataLinkMouse("palt_doc_nm",1);
         sheetObj.SetDataLinkMouse("palt_doc_img_url",1);
         sheetObj.SetDataLinkMouse("palt_doc_pdf_url",1);
         //SetAutoRowHeight(0);
         SetSheetHeight(400);
         }

                           
	   break;
	    case 5:      //Selling/Debit 탭부분 init
	    	if(MULTI_CURR_FLAG == "Y"){	//Muti Currency 
	    	    with(sheetObj){
	    	        var cnt=0;
	    	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );
	    	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    	        var headers = [ { Text:getLabel('SEI_BMD_0040_HDR5_3'), Align:"Center"},
	    	                    { Text:getLabel('SEI_BMD_0040_HDR5_4'), Align:"Center"} ];
	    	        InitHeaders(headers, info);

	    	        var cols = [ 
	    	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	               {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	    	               {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	    	               //OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
	    	               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	    	               
	    	               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	               {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
	    	               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
	    	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
	    	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:21 },
	    	               
//	    	               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//	    	               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    	               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    	               
	    	               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:21 },
	    	               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    	               
//	    	               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//	    	               {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    	               {Type:"Float", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:21 },
	    	               {Type:"Image", Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	    	               
	    	               {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	    	               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    	               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:21 },
	    	               {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:21 },
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
          	               {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_cmb_inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }	    	               ];
	    	         
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
	        with(sheetObj){
	    	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

	    	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    	         var headers = [ { Text:getLabel('SEI_BMD_0040_HDR5_1'), Align:"Center"},
	    	                   { Text:getLabel('SEI_BMD_0040_HDR5_2'), Align:"Center"} ];
	    	         InitHeaders(headers, info);

	    	         var cols = [ 
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	    	             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	    	             //OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
	    	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	    	             
	    	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
	    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
	    	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:21 },
	    	             
//	    	             #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//	    	             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    	             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    	             
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:21 },
	    	             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    	             
//	    	             #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//	    	             {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    	             {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:21 },
	    	             {Type:"Image",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	    	             
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:21 },
	    	             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:21 },
	    	             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
       	                 //#2504 [PATENT]Debit Note & AP for billing code based invoices	
        	             {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"fr_cmb_inv_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },	    	             
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    	             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
	    	         SetHeaderRowHeight(20);
	    	         SetHeaderRowHeight(21);
	    	         SetColProperty('fr_frt_cd', {ComboText:ARFRTCD2, ComboCode:ARFRTCD1} );
	    		    SetColProperty('fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
	    		    SetColProperty('fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
	    		    SetColProperty('fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
	    		    SetColProperty('fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
					SetColProperty(0 ,"fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
					SetColProperty(0 ,"fr_inv_curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
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
       case 6:      //Buying/Credit 탭부분 init
    	   if(MULTI_CURR_FLAG == "Y"){
    		    with(sheetObj){
    		        var cnt=0;
    		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );
    		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    		        var headers = [ { Text:getLabel('SEI_BMD_0040_HDR6_3'), Align:"Center"},
    		                    { Text:getLabel('SEI_BMD_0040_HDR6_4'), Align:"Center"} ];
    		        InitHeaders(headers, info);

    		        var cols = [ 
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    		               {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    		               //OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
    		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    		               
    		               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    		               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    		               
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
          	               {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cmb_inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },    		               
    		               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field03",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
    		         
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
    	      with(sheetObj){
		    	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );
		
		    	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		    	            var headers = [ { Text:getLabel('SEI_BMD_0040_HDR6_1'), Align:"Center"},
		    	                      { Text:getLabel('SEI_BMD_0040_HDR6_2'), Align:"Center"} ];
		    	            InitHeaders(headers, info);
		
		    	            var cols = [ 
		    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		    	                {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		    	                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		    	                {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		    	                //OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
		    	                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		    	                
		    	                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		    	                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		    	                {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		    	                {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		    	                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
		    	                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
		    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
		    	                {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
		    	                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		    	                
//		    	                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//		    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		    	                
		    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
		    	                
//		    	                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//		    	                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
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
		    	                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            	            //#2504 [PATENT]Debit Note & AP for billing code based invoices	
	            	            {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_cmb_inv_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },		    	                
		    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		    	                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
		    	                {Type:"CheckBox",   Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" },
	             	            //<!-- #2504 [PATENT]Debit Note & AP for billing code based invoices -->
	            	            {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cmb_inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },		    	                
		    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field03",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
		    	             
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
		    	     	    SetColProperty(0 ,"b_fr_inv_curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
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
       case 7:      //Buying/Credit 탭부분 init
    	   if(MULTI_CURR_FLAG == "Y"){
    		      with(sheetObj){
    		          var cnt=0;
    		          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1 } );
    		          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    		          var headers = [ { Text:getLabel('SEI_BMD_0040_HDR7_3'), Align:"Center"},
    		                    { Text:getLabel('SEI_BMD_0040_HDR7_4'), Align:"Center"} ];
    		          InitHeaders(headers, info);

    		          var cols = [ 
    		              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		              {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    		              {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    		              //OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
    		              {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    		              
    		              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		              {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    		              {Type:"Float",     Hidden:1,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    		              {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    		              {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    		              
//    		              #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    		              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1 },
    		              
    		              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    		              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		              
//    		              #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    		              {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		              {Type:"Float", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		              {Type:"Image", Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    		              
    		              {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		              {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
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
    	    with(sheetObj){
    	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1 } );

    	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	         var headers = [ { Text:getLabel('SEI_BMD_0040_HDR7_1'), Align:"Center"},
    	                     { Text:getLabel('SEI_BMD_0040_HDR7_2'), Align:"Center"} ];
    	         InitHeaders(headers, info);

    	         var cols = [ 
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	                {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	                //OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
    	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	                
    	                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	                {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	                {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	                {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    	                
//    	                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1 },
    	                
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                
//    	                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Image",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	                
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
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
    	         SetHeaderRowHeight(20);
    	         SetHeaderRowHeight(21);
    	         SetColProperty('dc_fr_frt_cd', {ComboText:DCFRTCD2, ComboCode:DCFRTCD1} );
    	    	 SetColProperty('dc_fr_sell_buy_tp_cd', {ComboText:"Debit|Credit", ComboCode:"D|C"} );
    	    	 SetColProperty('dc_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    	    	 SetColProperty('dc_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
    	    	 SetColProperty('dc_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
    	    	 SetColProperty('dc_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
				 SetColProperty(0 ,"dc_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
 	     	     SetColProperty(0 ,"dc_fr_inv_curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
    	    	 SetSheetHeight(150);
    	    	 InitComboNoMatchText(1,"",1);
    	    	 SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
    	         }
    	   }
        break;
       case 8:      //TP/SZ init
    	    with(sheetObj){
         //  SetSheetHeight(0);
        // (2, 0, 0, true);

         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel('SEE_FRT_0010_HDR1'), Align:"Center"} ];
         InitHeaders(headers, info);

         var cols = [ {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"" },
                {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"" } ];
          
         InitColumns(cols);

         SetEditable(0);
         SetVisible(false);

               }


	  break;
	  /* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
       case 9:      //HISTORY
    	      with(sheetObj){
           
       // (6, 0, 0, true);

		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
		
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel("SEE_BMD_HDR9"), Align:"Center"} ];
		        InitHeaders(headers, info);
		
		        var cols = [ {Type:"Float",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cng_seq" },
		            {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"itm_lbl" },
		            {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"bfr_cng_txt" },
		            {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"bfr_cng_txt" },
		            {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"rgst_usrid" },
		            {Type:"Date",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"rgst_tms", Format:"YmdHms" } ];
		         
		        InitColumns(cols);
		
		        SetEditable(0);
		        SetSheetHeight(200);
                 }

               
		  break;  
		//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
	   //Pickup/WorkOrder 그리드        
        case 10:
            with(sheetObj){
        	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

        	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	      var headers = [ { Text:getLabel('SEE_BMD_0020_HDR8_1'), Align:"Center"} ];
        	      InitHeaders(headers, info);

        	      var cols = [ {Type:"Text",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"wo_seq" },
        	             {Type:"Text",     Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"wo_no" },
        	             {Type:"Combo",     Hidden:0, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"wo_status" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"pickup_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"delivery_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"return_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"trucker_trdp_nm" },
        	             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"wo_grs_wgt", Format:"Float",       PointCount:obl_decimal_len } ];
        	       
        	      InitColumns(cols);

        	     // SetGetCountPosition()(0);
        	      SetEditable(0);
        	      SetColProperty('wo_status', {ComboText:"SAVED|ISSUED", ComboCode:"A|B"} );
        	      SetSheetHeight(400);
        	                  }

                     
        break;
    }
}
/**
 * HBL표시
 */
function sheet2_OnDblClick(sheetObj,Row,Col){
var hblNo=sheetObj.GetCellValue(Row, 'hbl_bl_no');
//OFVFOUR-7951: [JAPT] OPUS down 03/29/2022
var hblSeq=sheetObj.GetCellValue(Row, 'hbl_intg_bl_seq');
	if(hblNo!=''||hblSeq!=''){
//		#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
	   	var paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+encodeURIComponent(hblNo)+"&f_intg_bl_seq="+encodeURIComponent(hblSeq);
	   	parent.mkNewFrame('HB/L Entry', paramStr);
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
		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDocUp', 806, 450, "scroll:no;status:no;help:no;");
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
	document.frm2.intg_bl_seq.value = s_intg_bl_seq;
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
	// MBL NO 필수 추가
	if(frm1.bl_no.value == ""){
		//MB/L No.
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_MBLN'));
		isOk=false;
		moveTab('01');
		frm1.bl_no.focus();
		return isOk;
	}
	//---------------20121130 OJG---------------------------
	if(!chkCmpAddr(frm1.shpr_trdp_addr, 'Shipper Address')){
		isOk=false;
		moveTab('01');
		frm1.shpr_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.cnee_trdp_addr, 'Consignee Address')){
		isOk=false;
		moveTab('01');
		frm1.cnee_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
		moveTab('01');
		frm1.ntfy_trdp_addr.focus();
	}
	//LHK, 20140612 #33814 [BINEX]Import Mandatory 추가 - Carrier
	if(frm1.lnr_trdp_cd.value == "") { 	
		alert(getLabel('FMS_COM_ALT001') + " - Carrier");
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
		isOk = false;
		return isOk; 
	}
	//---------------20121130 OJG--------------------------
	/*
	 *  2012.02.23
	 * 필수값 설정
	 * ETA 
	 */  
	if(!checkInType(frm1.etd_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETD_'));
		isOk=false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
		return isOk; 
	}	
	/*if(checkInputVal(frm1.eta_dt_tm.value, 10, 10, "DD", 'ETA')!='O'){ S.Y BAIK (2013.01.23)*/
	if(!checkInType(frm1.eta_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETA_'));
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
	if(trim(frm1.etd_dt_tm.value)!= "" && trim(frm1.eta_dt_tm.value) != ""){
		if(getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy") < 0){
			// 'ETD date must be greater than ETA date
			alert(getLabel("SEA_COM_ALT021"));
			frm1.eta_dt_tm.focus();
			isOk=false;
			return isOk; 
		}
	}
	
	//#3889 [CLA TEST] REQUIRED FIELD SAVE VALIDATION NOT WORKING
	if(frm1.nomi_flg.value == "" || frm1.nomi_flg.value == "B") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.nomi_flg.focus();
		isOk=false;
		return isOk; 
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
		isOk = false;
		return isOk; 
	}
	/*
	if(checkInputVal(frm1.shpr_trdp_cd.value, 6, 7, "T", 'Shipper CODE')!='O'){
		isOk=false;
		moveTab('01');
		frm1.shpr_trdp_cd.focus();
	}else if(checkInputVal(frm1.shpr_trdp_nm.value, 2, 50, "T", 'Shipper')!='O'){
		isOk=false;
		moveTab('01');
		frm1.shpr_trdp_nm.focus();
	}else if(checkInputVal(frm1.shpr_trdp_addr.value, 2, 400, "T", 'Shipper Address')!='O'){
		moveTab('01');
		frm1.shpr_trdp_addr.focus();
		isOk=false;		
	}else if(checkInputVal(frm1.lnr_trdp_cd.value, 6, 7, "T", 'Liner Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
	}else if(checkInputVal(frm1.lnr_trdp_nm.value, 2, 50, "T", 'Liner Name')!='O'){
		isOk=false;
		moveTab('01');
		frm1.lnr_trdp_nm.focus();
	}else if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){
		isOk=false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
	}else if(checkInputVal(frm1.eta_dt_tm.value, 10, 10, "DD", 'ETA')!='O'){
		isOk=false;
		moveTab('01');
		frm1.eta_dt_tm.focus();
	}else if(checkInputVal(frm1.pol_cd.value, 5, 6, "T", 'POL')!='O'){
		isOk=false;
		moveTab('01');
		frm1.pol_cd.focus();
	}else if(checkInputVal(frm1.pod_cd.value, 5, 6, "T", 'POD')!='O'){
		isOk=false;
		moveTab('01');
		frm1.pod_cd.focus();
	}else if(checkInputVal(frm1.del_cd.value, 5, 6, "T", 'DEL Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.del_cd.focus();
	}else if(checkInputVal(frm1.pck_qty.value, 0, 7, "N", 'Package Qty')!='O'){
		isOk=false;
		moveTab('01');
		frm1.pck_qty.focus();		
	}else if(checkInputVal(frm1.grs_wgt.value, 0, 8, "N", 'G/Weight')!='O'){
		isOk=false;
		moveTab('01');
		frm1.grs_wgt.focus();	
	}else if(checkInputVal(frm1.meas.value, 0, 8, "N", 'Measurement')!='O'){
		isOk=false;
		moveTab('01');
		frm1.meas.focus();	
	}else if(checkInputVal(frm1.bl_iss_dt.value, 10, 10, "D", 'Issued Date')!='O'){
		isOk=false;
		moveTab('01');
		frm1.bl_iss_dt.focus();
	}else if(checkInputVal(frm1.mk_txt.value, 0, 4000, "T", 'Mark')!='O'){
		isOk=false;
		moveTab('02');
		frm1.mk_txt.focus();
	}else if(checkInputVal(frm1.desc_txt.value, 0, 4000, "T", 'Description')!='O'){
		isOk=false;
		moveTab('02');
		frm1.desc_txt.focus();
	}else if(checkInputVal(frm1.rmk.value, 0, 400, "T", 'Remark')!='O'){
		isOk=false;
		moveTab('02');
		frm1.rmk.focus();
	}
	*/
	/*==================================================================================================*/
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용						    */
	/* Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류 발생을 차단. */
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObjArr=new Array(3);
		sheetObjArr[0]=docObjects[4];		//AR LOCAL  'fr_'
		sheetObjArr[1]=docObjects[6];		//DC 		'dc_fr_'
		sheetObjArr[2]=docObjects[5];		//AP 		'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){	//Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/*=================================================================================================*/
	
//	#1351 [CLT] B/L, AWB 등 Freight 탭에 대한 Mandatory Validation 메시지 기능 보완
	var frtSdListParam=docObjects[4].GetSaveString(false);
    if(docObjects[4].IsDataModified() && frtSdListParam == "") { isOk=false; moveTab('04'); };
    
    var frtBcListParam=docObjects[5].GetSaveString(false);
    if(docObjects[5].IsDataModified() && frtBcListParam == "") { isOk=false; moveTab('04'); };
    
    var frtDcListParam=docObjects[6].GetSaveString(false);
    if(docObjects[6].IsDataModified() && frtDcListParam == "") { isOk=false; moveTab('04'); };
	
	return isOk;
}
//화면의 checkbox를 database 값으로 셋팅한다.
function checkBoxSetting(){
	var formObj=document.frm1;
	if(formObj.rlsd_flg.value=="Y"){
		formObj.rlsd_flg.checked=true;
	}
	else{
		formObj.rlsd_flg.checked=false;
	}
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
	//#4724	[Best Ocean] Ocean Import OBL Received and Received Date column and entry add
	if(formObj.org_bl_rcvd_flg.value=="Y"){
		formObj.org_bl_rcvd_flg.checked=true;
	}else{
		formObj.org_bl_rcvd_flg.checked=false;
	}	
}

//#2268 [UNICO, PREMIER] Decimal place of container weight to be 3 decimal digits
function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt"){
		
		var grsWgtValue = Number(formObj.grs_wgt.value.replace(/,/gi, "")).toFixed(obl_decimal_len);
		var grsWgtMoney = doMoneyFmt(grsWgtValue);
		
		//#2877 [Zimex] after v450, Mismatch kg to lb conversion
		//var grsWgtValue1 = doMoneyFmt(Number(roundXL(grsWgtValue * CNVT_CNST_KG_LB, obl_decimal_len)));
		var grsWgtValue1 = doMoneyFmt(Number(roundXL(grsWgtValue * CNVT_CNST_KG_LB, obl_decimal_len)));
		var grsWgtMoney1 = doMoneyFmt(grsWgtValue1);
		
		formObj.grs_wgt.value = grsWgtMoney;
		formObj.grs_wgt1.value = grsWgtMoney1;
	}else if(obj.name=="grs_wgt1"){
		
		var grsWgtValue1 = Number(formObj.grs_wgt1.value.replace(/,/gi, "")).toFixed(obl_decimal_len);
		var grsWgtMoney1 = doMoneyFmt(grsWgtValue1);

		var grsWgtValue = doMoneyFmt(Number(roundXL(grsWgtValue1 / CNVT_CNST_KG_LB, obl_decimal_len)));
		var grsWgtMoney = doMoneyFmt(grsWgtValue);
		
		formObj.grs_wgt.value = grsWgtMoney;
		formObj.grs_wgt1.value = grsWgtMoney1;
	}
}
function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="meas"){
		//#27534 
		//formObj.meas1.value = roundXL(formObj.meas.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, 0);
		//chkComma(formObj.meas1,8,3);
		var rndXLValue=roundXL(formObj.meas.value.replaceAll(",", "") * CNVT_CNST_CBM_CFT, obl_decimal_len);
		formObj.meas1.value=doMoneyFmt(Number(rndXLValue).toFixed(obl_decimal_len));
	}
	else if(obj.name=="meas1"){
		formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, obl_decimal_len);
		chkComma(formObj.meas,8,obl_decimal_len);
	}
}
function setOfficeData(){
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	//office post date setting, Ocean Export
	if(formObj.post_dt.value==""){
		if(ofc_post_dt=="TODAY"){
			formObj.post_dt.value=getTodayStr();
		}
	}
	//office currency
	if(ofc_curr_cd!=""){
		if(formObj.copy_bl_seq.value == ""){
			formObj.curr_cd.value=ofc_curr_cd;
		}
	}
	//office code
	formObj.ref_ofc_cd.value=v_ofc_cd;
}
function loadData(){
	if(frm1.intg_bl_seq.value!=""){
		//ref_ofc_cd를 database에 있는 값으로 셋팅함
		frm1.ref_ofc_cd.value=frm1.h_ref_ofc_cd.value;
		//currency를 database에 있는 값으로 셋팅함
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
	/* 
	 * jsjang 2013.7.5 
	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
	 */        
	 cntr_ship_init();
	/* 
	 * jsjang 2013.7.5 
	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 End 
	 */		
	 //OFC의 POST_DATE TYPE를 취득한다.
	 ofcChDEta();
	 
	 /* #1804 [Split - 1] [PATENT] Payment Verification - 기능보완(verify_flag = "Y" readonly) */		
	if( frm1.verify_flag.value == "Y" ){	
		$("select[name=obl_tp_cd]").attr("disabled",true);
	} else {
		$("select[name=obl_tp_cd]").attr("disabled",false);
	} 
		
	//#41634 - [DMS] Default Cursor Position Change
	frm1.ref_no.focus();
}
function svcTermChange(){
	var formObj=document.frm1;
	formObj.to_svc_term_cd.value=formObj.fm_svc_term_cd.value;
}
function shipModeChangeDef(obj){
	var formObj=document.frm1;
	if (obj.value == 'FCL' || obj.value == 'BLK') {
		formObj.to_svc_term_cd.value='CY';
		formObj.fm_svc_term_cd.value='CY';
	} else {
		formObj.to_svc_term_cd.value='CF';
		formObj.fm_svc_term_cd.value='CF';
	}
}
function setToday(obj){
	var formObj=document.frm1;
	if(obj.name=="rlsd_flg"){
		if(obj.checked){
			formObj.rlsd_dt_tm.value=getTodayStr();
		}
		else{
			formObj.rlsd_dt_tm.value='';
		}
	//#4724	[Best Ocean] Ocean Import OBL Received and Received Date column and entry add
	}else if(obj.name=="org_bl_rcvd_flg"){
		if(obj.checked){
			formObj.rcvd_dt_tm.value=getTodayStr();
		}else{
			formObj.rcvd_dt_tm.value='';
		}
	}
}
//2011.11.21 Kim,Jin-Hyuk House B/L Add
function sheet2_OnSearchEnd(sheetObj, row, col){
	var rows=sheetObj.SearchRows();
	if(rows==0){
		sheetObj.RemoveAll();
	}
	
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
function sheet4_OnSearchEnd(sheetObj, row, col){
	/*#23809 oyh 컨테이너가 없을때  tab키를 누르면 Row생성되게 포커스를 맨 마지막에 준다*/
	if(sheetObj.RowCount()== 0) {
		sheetObj.SelectCell(0,sheetObj.LastCol());
	}
}
/**
 * Container번호 중복확인
 */
function checkCntrNo(inCntrNo){
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	var intRows=docObjects[2].RowCount();
	var loopNum=0;
	for(var i=1; i < intRows; i++){
if(inCntrNo==docObjects[2].GetCellValue(i, 'cntr_no')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}
	else{
		return true;
	}
}
function sheet4_OnChange(sheetObj, row, col, value){
	switch (sheetObj.ColSaveName(col)) {
		case "cgo_pck_qty" :
		case "cgo_wgt" :
		case "cgo_wgt1" :
		case "cgo_meas" :
		case "cgo_meas1" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
		case "Del" :
        	for(var i=1; i<=sheetObj.RowCount(); i++){
				sheetObj.SetCellValue(i, 'Seq',i);
			}
        break;
	}
	var cntrColStr="cntr_no";
	if(sheetObj.ColSaveName(col)==cntrColStr){
		//Contaienr Number 유효성 검증
if(sheetObj.GetCellValue(row, cntrColStr)!==''){
var rtnVal=cntrNumCheck(sheetObj.GetCellValue(row, cntrColStr));
			if(rtnVal){		//정상인경우
				//중복 확인
if(!checkCntrNo(sheetObj.GetCellValue(row, cntrColStr))){
					//This Container Number is already used!\nPlease check the Container Number!
					alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('FMS_COD_CNTR'));
					sheetObj.SetCellValue(row, cntrColStr,'',0);
					sheetObj.SelectCell(row, cntrColStr);
				}
			}else{
				//'Proceed anyway?')){
				if(confirm(getLabel('FMS_COM_CFMCON')) == false){
					sheetObj.SetCellValue(row, cntrColStr,'',0);
					sheetObj.SelectCell(row, cntrColStr);
				}else{
					//중복 확인
if(!checkCntrNo(sheetObj.GetCellValue(row, cntrColStr))){
						//This Container Number is already used!\nPlease check the Container Number!
						alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('FMS_COD_CNTR'));
						sheetObj.SetCellValue(row, cntrColStr,'',0);
						sheetObj.SelectCell(row, cntrColStr);
					}
				}
			}
		}
	}
	switch(sheetObj.ColSaveName(col)){
		case "cgo_wgt":
			//#2877 [Zimex] after v450, Mismatch kg to lb conversion
			//sheetObj.SetCellValue(row, "cgo_wgt1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, 2),0);
			// [#1284][OIM B/L Entry] Show system error message when save data
			var wgt = roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len);
			if (value > 999999999999.999) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_wgt',0);
				return;
			} else if (wgt > 999999999999.999) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_wgt',0);
				return;
			} else {
				sheetObj.SetCellValue(row, "cgo_wgt1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len),0);
			}
			break;
		case "cgo_wgt1":
			var wgt1 = roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len);
			if (value > 999999999999.999) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_wgt1',0);
				return;
			} else if (wgt1 > 999999999999.999) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_wgt1',0);
				return;
			} else {
				sheetObj.SetCellValue(row, "cgo_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len),0);
			}
			break;
		case "cgo_meas":
			var meas = roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_CBM_CFT, 3);
			if (value > 9999999999.999999) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_meas',0);
				return;
			} else if (meas > 9999999999.999999) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_meas',0);
				return;
			} else {
				sheetObj.SetCellValue(row, "cgo_meas1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_CBM_CFT, 3),0);
			}
			break;
		case "cgo_meas1":
			var meas1 = roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_CBM_CFT, 3);
			if (value > 9999999999.999999) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_meas1',0);
				return;
			} else if (meas1 > 9999999999.999999) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_meas1',0);
				return;
			} else {
				sheetObj.SetCellValue(row, "cgo_meas",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_CBM_CFT, 3),0);
			}
			break;
	}
	
	/*else if (sheetObj.ColSaveName(col) == "cgo_wgt" || sheetObj.ColSaveName(col) == "cgo_wgt1") {
		if (value > 999999999999.999) {
			ComShowCodeMessage('COM03230');
			if (sheetObj.ColSaveName(col) == "cgo_wgt") {
				sheetObj.SetCellValue(row,'cgo_wgt',0);
			} else {
				sheetObj.SetCellValue(row,'cgo_wgt1',0);
			}
			return;
		}
	} else if (sheetObj.ColSaveName(col) == "cgo_meas" || sheetObj.ColSaveName(col) == "cgo_meas1") {
		if (value > 9999999999.999999) {
			ComShowCodeMessage('COM03230');
			if (sheetObj.ColSaveName(col) == "cgo_meas") {
				sheetObj.SetCellValue(row,'cgo_meas',0);
			} else {
				sheetObj.SetCellValue(row,'cgo_meas1',0);
			}
			return;
		}
	}*/
	
	/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start */
	var sumFlag='N';
	var colNm=sheetObj.ColSaveName(col);
	//#5199 [Acrocargo USA] MBL container tab package didnt update entry package info
	var pckUtCd = "";
	//if(colNm == "cgo_pck_qty" || colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del")
	if(colNm == "cgo_pck_qty" || colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del" || colNm == "cgo_pck_ut")
	{
		sumFlag='A';
	}	
	if(sumFlag == 'A' && sheetObj.ColSaveName(col) != 'Seq')
	{		 
		var cgo_pck_qty='0';
		var meas='0.000000';
		var meas1='0.000000';
		var grs_wgt='0.000';
		var grs_wgt1='0.00';
		for(var i=1; i<=sheetObj.LastRow(); i++){
			if(sheetObj.GetCellValue(i, "Del") == 0)
		   {
				cgo_pck_qty=parseInt(cgo_pck_qty) 			+ parseInt(sheetObj.GetCellValue(i,"cgo_pck_qty"));
			   //meas 	= roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.CellValue(i,"cgo_meas"), 6));
				meas=roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas")), 6);
				meas1=roundXL(parseFloat(meas1), 6) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas1")), 6);
				grs_wgt=roundXL(parseFloat(grs_wgt), 3) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt")), 3);
				grs_wgt1=roundXL(parseFloat(grs_wgt1), 2) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt1")), 2);
				//#5199 [Acrocargo USA] MBL container tab package didnt update entry package info
				//#2354 [PATENT] House Bill Based - Processing Logic Enhancement
				if(pckUtCd == ""){
					pckUtCd = sheetObj.GetCellValue(i,"cgo_pck_ut");
				}else{
					if(pckUtCd != sheetObj.GetCellValue(i,"cgo_pck_ut")){
						pckUtCd = "GT";
					}
				}
		   }
		}
		var formObj=document.frm1;
		//#5199 [Acrocargo USA] MBL container tab package didnt update entry package info
		formObj.pck_ut_cd.value = pckUtCd;
		
		if((colNm == "cgo_pck_qty" || colNm == "Del") && cgo_pck_qty > 0){
			if (cgo_pck_qty > 9999999) { // Check if the max length of cgo_pck_qty column is bigger than 9999999. Its size in DB is numeric(7,0).
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_pck_qty',0);
				return;
			} else {
				formObj.pck_qty.value=cgo_pck_qty;
			}	
		}
		if((colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "Del") && grs_wgt > 0){
			formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(obl_decimal_len));
			//#2877 [Zimex] after v450, Mismatch kg to lb conversion
			//formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, obl_decimal_len);
			formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, obl_decimal_len);
			chkComma(formObj.grs_wgt1,8,obl_decimal_len);		
			formObj.grs_wgt1.value=doMoneyFmt(Number(grs_wgt1).toFixed(obl_decimal_len));
			formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(obl_decimal_len)); //roundXL(formObj.grs_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 3);
			chkComma(formObj.grs_wgt,8,obl_decimal_len);			
		}	
		if((colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del") && meas > 0){
			formObj.meas.value=doMoneyFmt(Number(meas).toFixed(obl_decimal_len));
			formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, obl_decimal_len);
			chkComma(formObj.meas1,8,obl_decimal_len);				
			formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(obl_decimal_len));
			formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, obl_decimal_len);
			chkComma(formObj.meas,8,obl_decimal_len);								
		}	
	}
	/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 End */	
}
function sumHblValue(){
	if(frm1.intg_bl_seq.value!=''){
		ajaxSendPost(getSumHblValue, 'reqVal', '&goWhere=aj&bcKey=sumHblValueSeaImp&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
	}		
}
function getSumHblValue(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			rtnArray=doc[1].split("^^");
			var grs_wgt=roundXL(parseFloat(rtnArray[0]), obl_decimal_len);
			var meas=roundXL(parseFloat(rtnArray[1]), obl_decimal_len);
			var pck_qty=roundXL(parseFloat(rtnArray[2]), 0);
			var grs_wgt1=roundXL(parseFloat(rtnArray[3]), obl_decimal_len);
			var meas1=roundXL(parseFloat(rtnArray[4]), obl_decimal_len);
			
			formObj.grs_wgt.value=grs_wgt;
			formObj.meas.value=meas;
			formObj.pck_qty.value=pck_qty;
			formObj.grs_wgt1.value=grs_wgt1;
			formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(obl_decimal_len));
			
			chkComma(formObj.grs_wgt,8,obl_decimal_len);
			chkComma(formObj.meas,8,obl_decimal_len);
			chkComma(formObj.grs_wgt1,8,obl_decimal_len);
		}else{
			//"There is no House B/L." 
			alert(getLabel('SEA_COM_ALT024'));
		}
	}
}
function checkTrdpCode(obj){
	/*if(obj.name=="prnr_trdp_nm"){
	}
	else*/ 
	if(obj.name=="shpr_trdp_nm"){
		if(frm1.shpr_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.shpr_trdp_addr.value == ""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.shpr_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);
			}			
		}
	}
	/*else if(obj.name=="cnee_trdp_nm"){
	}*/
	else if(obj.name=="ntfy_trdp_nm"){
		if(frm1.ntfy_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.ntfy_trdp_addr.value == ""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.ntfy_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);
			}			
		}
	}
	/*else if(obj.name=="act_shpr_trdp_nm"){
	}
	else if(obj.name=="cust_trdp_nm"){
	}
	else if(obj.name=="lnr_trdp_nm"){
	}
	else if(obj.name=="carr_trdp_nm"){
	}
	else if(obj.name=="prnr_trdp_nm2"){
	}
	else if(obj.name=="iss_trdp_nm"){
	}
	else if(obj.name=="third_trdp_nm"){
	}*/
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
	                   frm1.f_cmd.value=REMOVE;
	                   delete_show_complete = "Y";
//	            	   doShowProcess();
	        		   submitForm();
	        	   }
    		   }
			   else{
    			   //You Cannot delete MAWB. Because Invoice was already Issued.
				   alert(getLabel('FMS_COM_ALT022'));
				   return;
    		   }
//	     	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
//	               frm1.f_cmd.value = REMOVE;
//	        	   doShowProcess();
//	        	   frm1.submit();
//	    	   }				
		   }
		   else{
			   //Please delete the HB/L in advance.
			   alert(getLabel('FMS_COM_ALT026'));
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
		}
		else{
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
// Conatiner 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet4_OnKeyDown(sheetObj, row, col, keyCode){
	// 마지막 Cell에서 Tab했을 경우 Tab 이벤트 때문에 SelectCell에서 지정한 Cell의 다음 Index로 포커스 이동됨.
	// OnTab 이벤트로 변경처리함 (YJW 2017.02.15)
	/*if(sheetObj.LastRow()== row && "cntr_go_date" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//#42686
			cntrGridAdd(sheetObj);
			//gridAdd(2);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}*/
	switch (sheetObj.ColSaveName(col)) {
		case "cgo_pck_qty" :
		case "cgo_wgt" :
		case "cgo_wgt1" :
		case "cgo_meas" :
		case "cgo_meas1" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}

function sheet4_OnTab(sheetObj, Row, Col, ORow, OCol, isShift, isLast) {
	// #334 - [ZEN] PAYMENT AND DEPOSIT COLUMN ORDER ADJUSTMENT
	var lastCol = 0;
	
	for(var i=0; i<=sheetObj.LastCol(); i++){
		if(sheetObj.GetColHidden(i) == 0) {
			lastCol = i;
		}
	}
	
	if(sheetObj.LastRow() == Row && OCol == lastCol){
		//#42686
		cntrGridAdd(sheetObj);
		//gridAdd(2);
		sheetObj.SelectCell(sheetObj.LastRow(), 0);
	}
}

function getPageURL() {
	var pageurlId = arguments[0];
	
	if(typeof(pageurlId) === 'undefined'|| pageurlId === '' || pageurlId === null){
		
		return document.getElementById("pageurl_1").value;
	}
	
	return document.getElementById(pageurlId).value;;
}
function sheet4_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.frm1;
	var pageUrl = '';
	
	if(use_cfs_fields == 'Y') {
		pageUrl = getPageURL('pageurl_2');
    }else{
    	pageUrl = getPageURL('pageurl_1');
    }
	
	switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, pageUrl, sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, pageUrl, sheetObj);
		break;
	}
}
/*
 *  2012.03.21 
 * Master Freight Tab 추가
 */
function getSdSheet(){
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[4];
}
function getBcSheet(){
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[5];
}
function getDcSheet(){
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[6];
}
function sheet7_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, '', 'S', 'I', 'M');
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
		mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'I', 'M');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'I', 'M');
}
function sheet7_OnChange(sheetObj, row, col, value, OldValue) {
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
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;

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
	
	//#3411 [JTC]Accounting & Performance 수정사항
	//Unit - CNTR 선택시 사용자가 더 큰 값입력 가능하도록 변경 및 취소시 변경전 값 설정
	mutiSheetOnChange(sheetObj, row, col, '', 'S', 'I', 'M', OldValue);
}
function sheet7_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, '', 'S', 'I', 'M');
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
			mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'I', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "fr_frt_check" == sheetObj.ColSaveName(col)){
			//gridAdd(4);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('ROWADD', docObjects[4], 'S', 'I', 'M');
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
		mutiSheetOnPopupClick(sheetObj, row, col - 1, 'b_', 'S', 'I', 'M');
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
		mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'I', 'M');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'I', 'M');
}
function sheet8_OnChange(sheetObj, row, col, value, OldValue) {
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
			/*if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}*/
			break;

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

	//#3411 [JTC]Accounting & Performance 수정사항
	//Unit - CNTR 선택시 사용자가 더 큰 값입력 가능하도록 변경 및 취소시 변경전 값 설정
	mutiSheetOnChange(sheetObj, row, col,  'b_', 'S', 'I', 'M', OldValue);
}
function sheet8_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, 'b_', 'S', 'I', 'M');
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
			mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'I', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "b_fr_reserve_field01" == sheetObj.ColSaveName(col)){
			//gridAdd(5);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('BCROWADD', docObjects[5], 'S', 'I', 'M');
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
		mutiSheetOnPopupClick(sheetObj, row, col - 1, 'dc_', 'S', 'I', 'M');
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
		mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'I', 'M');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'I', 'M');
}
function sheet9_OnChange(sheetObj, row, col, value, OldValue) {
	switch (sheetObj.ColSaveName(col)) {
		case "dc_fr_qty" :
		case "dc_fr_ru" :
		case "dc_fr_agent_ru" :
		case "dc_fr_inv_xcrt" :
		case "dc_fr_inv_sum_amt" :
		case "dc_fr_agent_amt" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;

	//#3411 [JTC]Accounting & Performance 수정사항
	//Unit - CNTR 선택시 사용자가 더 큰 값입력 가능하도록 변경 및 취소시 변경전 값 설정
	mutiSheetOnChange(sheetObj, row, col,  'dc_', 'S', 'I', 'M', OldValue);
}
function sheet9_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');

	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj,'dc_', 'S', 'I', 'M');
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
			mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'I', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "dc_fr_frt_check" == sheetObj.ColSaveName(col)){
			//gridAdd(6);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('DCROWADD', docObjects[6], 'S', 'I', 'M');
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
function sheet10_OnSearchEnd(sheetObj, row, col) {
	//Container Type Size 설정
	var TPSZCD1=' |';
	var TPSZCD2=' |';
 	var totCnt=sheetObj.LastRow() + 1;
 	
	for(var i=1; i < totCnt; i++){
		if(sheetObj.GetCellValue(i, 1)!=''){
			TPSZCD1+= sheetObj.GetCellValue(i, 0);
			TPSZCD2+= sheetObj.GetCellValue(i, 0);
			
			if (totCnt - 1 > i) {
				TPSZCD1+= '|';
				TPSZCD2+= '|';
			}
		}
	}
	
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	docObjects[4].SetColProperty("fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[5].SetColProperty("b_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[6].SetColProperty("dc_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
}
/**
* Container Sheet Object를 리턴함
*/
function getCrtrSheet(){
	//BL_COPY
	if (frm1.copy_bl_seq.value == ""){
		fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
		return docObjects[7];
	} else {
		
		
		//CNTR의 Unit Combo정보를 담을 Sheet를 만든다.
		fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
		var curSheet = docObjects[2];
		var frtSheet = docObjects[7];
		
		//sheet를 초기화한다.
		frtSheet.RemoveAll();
		
		for(var i=1 ; i<curSheet.LastRow()+1 ; i++){
			cntrGridAdd(frtSheet);
			frtSheet.SetCellValue(i, 0, curSheet.GetCellValue(i,"cntr_tpsz_cd"));
			frtSheet.SetCellValue(i, 1, curSheet.GetCellValue(i,"cgo_pck_qty"));
		}
		setFrtCntrUnitCombo(frtSheet);
		return frtSheet;
		
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
			param += "&f_air_sea_clss_cd=S";
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
			var firstIdx=-1;
 			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
			if(sheetObj.GetCellValue(i, "b_fr_frt_check") == 1){
				chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'b_fr_trdp_cd');
				chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'b_fr_trdp_nm');
				chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'b_fr_inv_curr_cd');
				chk_fr_inv_no=sheetObj.GetCellValue(i, 'b_fr_inv_no');
					if(chkCnt > 0){
						chk_fr_frt_seq += ',';
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'b_fr_frt_seq');
					firstIdx=i;
					chkCnt++;
				}
			}
			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=S";
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
/*			if(sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no') != ''){		//Pierpass 인경우 Container No 가 Vendor Invoice No 로 자동 셋업됨.
				param += "&s_inv_no=" +  sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no');
			}else if (chk_fr_inv_no == undefined  || chk_fr_inv_no == "undefined" || chk_fr_inv_no == "") {
				param += "&s_inv_no=" + formObj.bl_no.value;
			}*/
			//Pierpass 인경우 Container No 가 Vendor Invoice No 로 자동 셋업됨.
			if(sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no') != '' && sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no') != '-1'){		
				param += "&s_inv_no=" +  sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no');
			}else {
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
			param += "&f_air_sea_clss_cd=S";
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
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	var arObj=docObjects[4];
	var apObj=docObjects[5];
	var dcObj=docObjects[6];
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
		case 6:
			//Freight될 Container 조회
			frm1.f_cmd.value=SEARCHLIST01;
			fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[7].DoSearch("./SEE_FRT_0010GS.clt", FormQueryString(frm1) );
		break;
		case 7:
			//Selling/Debit Freight 조회
			frm1.f_cmd.value=SEARCHLIST07;
			fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[4].DoSearch("./SEI_BMD_0040_7GS.clt", FormQueryString(frm1) );
		break;
		case 8:
			//Buying/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST08;
			fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[5].DoSearch("./SEI_BMD_0040_8GS.clt", FormQueryString(frm1) );
		break;
		case 9:
			//Debit/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST09;
			fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[6].DoSearch("./SEI_BMD_0040_9GS.clt", FormQueryString(frm1) );
		break;
		/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
		case 10:
			//Status List 조회
			frm1.f_cmd.value=SEARCHLIST10;
			fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[8].DoSearch("./SEE_BMD_0026_1GS.clt", FormQueryString(frm1) );
			break;	
		//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
		case 11:
			//WorkOrder List 조회
			frm1.f_cmd.value=SEARCHLIST08;
			fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[9].DoSearch("./SEE_BMD_0025GS.clt", FormQueryString(frm1) );
			break;
	}
}
/**
 * Container List의 입력값 확인
 */
 function cntrListValid(sheetObj){
	    fnSetIBsheetInitId(sheetObj.id);   //grid가 생성되지않았으면 생성(속도개선)
	 	var totRow=sheetObj.RowCount();
	 	var isError=true;
	 	var workItems=0;
 	 	if(totRow > 0){
	 	 	for(var i=1; i <= totRow ; i++){
if(sheetObj.GetCellValue(i, 'cntr_no') != "" && sheetObj.GetCellValue(i,'cntr_tpsz_cd') !=""){
	 				isError=true;
	 			}else{
	 				isError=false;		
	 			}
	 	 	}
 	 	}
	 	return isError;
}
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
 *  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
 **/
function setPost_date(save_flag){
 	var formObj=document.frm1;
 	var ofc_post_tp=frm1.h_post_dt_imp.value;
 	
 	//block에서 바꾼 post_date를 etd ,eta에서 무조건 변경을 함 ==>i,u로 분기해서 실행 
 	//20150312 Skwoo redmine  #48186
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
 		}else if(ofc_post_tp=="TODAY"){
 		//LHK, 20140924 #43960 [DYNAMIC] Post Date 변경
 		if(formObj.post_dt.value==""){
 			frm1.post_dt.value=getTodayStr();
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
	}
}
function ofcChDEta()
{
	var formObj=document.frm1;
	var ofc_cd=formObj.ref_ofc_cd.options[formObj.ref_ofc_cd.selectedIndex].text;
	ajaxSendPost(getImpPostRef, 'reqVal', '&goWhere=aj&bcKey=getImpPostRef&f_ofc_cd='+ofc_cd, './GateServlet.gsl');
}
function getImpPostRef(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]!=''){
				frm1.h_post_dt_imp.value=doc[1];
				if(doc[1] == 'D-ETA')
				{
					getObj('st_hear').style.display='none';
					getObj('st_hear_r').style.display='inline';		
				}else{
					getObj('st_hear').style.display='inline';
					getObj('st_hear_r').style.display='none';						
				}
			}
		}
	}
	else{
	}
}
/**
 * MB/L No 기입하면, MB/L 넘버의 Prefix(첫 4 캐릭터)를 Carrier 항목(Code)에 자동 기입되도록. (Carrier 가 비어 있는 경우에만)
 */
function setCarrierCd(obj){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();
	if ((window.event.keyCode == 13 && s_code != "") || window.event.type == "blur") {
		if(formObj.lnr_trdp_cd.value == "" && s_code.length >= 4) {
			var bl_no=formObj.bl_no.value.toUpperCase();
			var s_code=bl_no.substring(0,4);
			formObj.lnr_trdp_cd.value=s_code;
			codeNameAction('trdpCode_sea_liner', formObj.lnr_trdp_cd, 'onBlur');
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
	   param += '&air_sea_clss_cd=S'; 
	   param += '&bnd_clss_cd=I';
	   param += '&biz_clss_cd=M';
   	var paramStr="./AIC_WOM_0012.clt?f_cmd="+SEARCH+"&"+param;
   	parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
   	*/
   	var paramStr="./AIC_WOM_0012.clt?air_sea_clss_cd=S&bnd_clss_cd=I&biz_clss_cd=M";
    var param = "&f_cmd=" + SEARCH;
    param += "&f_wo_no=" + sheetObj.GetCellValue(row, 'wo_no');
    parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
}


//BL_COPY
function selectCopyBLFrt(){
	 openBlCopyPopUp("COPY_CONFIRM_POPUP_4",this,this);
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
			var rmk_copy_chk=rtnValAry[7];
			
			if (orgBlSeq != "") {
				
				//#2348 [IMPEX] Pop up error message not closing after click OK
				cntrTpSzFlag = true;
			
				var orgBlSeq = frm1.copy_bl_seq.value;
				var tmpIntgBlSeq = frm1.intg_bl_seq.value;; 
				frm1.intg_bl_seq.value = frm1.copy_bl_seq.value;
							
				if (arFrt_copy_chk == "Y") {					
					//Selling/Debit Freight 조회
					frm1.f_cmd.value=SEARCHLIST07;
					fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
		 			docObjects[4].DoSearch("./SEI_BMD_0040_7GS.clt", FormQueryString(frm1) );		
				}
				if (apFrt_copy_chk == "Y") {
					//Buying/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST08;
					fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
		 			docObjects[5].DoSearch("./SEI_BMD_0040_8GS.clt", FormQueryString(frm1) );
				}
				if (dcFrt_copy_chk == "Y") {
					//Debit/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST09;
					fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
		 			docObjects[6].DoSearch("./SEI_BMD_0040_9GS.clt", FormQueryString(frm1) );
				}
				
				//#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				if (shpmt_itm_copy_chk == "Y" || mrk_des_copy_chk == "Y" || rmk_copy_chk == "Y") {

				    frm1.f_cmd.value=COMMAND12;					
					var xml = sheet1.GetSearchData("./SEI_BMD_0040_6GS.clt",FormQueryString(frm1));		
					var xmlDoc = $.parseXML(xml);					 
					var $xml = $(xmlDoc);
 
					 if($xml.find("result").text() == "1" ){
						if(shpmt_itm_copy_chk == "Y"){
							
							isCopy = true;							
							formObj.pck_ut_cd.value = $xml.find("pck_ut_cd").text();
							formObj.pck_qty.value = ($xml.find("pck_qty").text() == "" ? "0": doMoneyFmt(Number($xml.find("pck_qty").text()).toFixed(0)));
							formObj.grs_wgt.value = ($xml.find("grs_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt").text()).toFixed(obl_decimal_len)));
							formObj.grs_wgt1.value = ($xml.find("grs_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt1").text()).toFixed(obl_decimal_len)));
							formObj.meas.value = ($xml.find("meas").text() == "" ? "0": doMoneyFmt(Number($xml.find("meas").text()).toFixed(obl_decimal_len)));
							formObj.meas1.value = ($xml.find("meas1").text() == "" ? "0": doMoneyFmt(Number($xml.find("meas1").text()).toFixed(obl_decimal_len)));
					
						}						
						if(mrk_des_copy_chk == "Y"){
							formObj.mk_txt.value = $xml.find("mk_txt").text();
							formObj.desc_txt.value = $xml.find("desc_txt").text();
						}
						if(rmk_copy_chk == "Y"){
							formObj.desc_txt1.value = $xml.find("desc_txt1").text();
							formObj.cfs_rmk.value = $xml.find("cfs_rmk").text();
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

//BL_COPY frt에 설정할 콤보를 만든다.
function setFrtCntrUnitCombo(sheetObj){
	
	//Container Type Size 설정
	var TPSZCD1=' |';
	var TPSZCD2=' |';
 	var totCnt=sheetObj.LastRow() + 1;
 	
	for(var i=1; i < totCnt; i++){
		if(sheetObj.GetCellValue(i, 1)!=''){
			TPSZCD1+= sheetObj.GetCellValue(i, 0);
			TPSZCD2+= sheetObj.GetCellValue(i, 0);
			
			if (totCnt - 1 > i) {
				TPSZCD1+= '|';
				TPSZCD2+= '|';
			}
		}
	}
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	docObjects[4].SetColProperty("fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[5].SetColProperty("b_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[6].SetColProperty("dc_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
}

/* Vinh.Vo (S)*/
function autoFillITLoc(){
	/**
	 * 	Auto Get POD Name then fill in IT Issued Location after selecting date and focus out of Date
	*/
	
	var frm = document.frm1;
	
	if(frm.te_dt_tm.value == "") return ;
	
	frm.it_loc.value = frm.pod_nm.value;
}
/* Vinh.Vo (E)*/

function set_goDate(){
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	var curRow = docObjects[2].GetSelectRow();
	var v_eta_dt_tm = frm1.eta_dt_tm.value;
	var v_ref_no = frm1.ref_no.value;
	
	if(use_cfs_fields == "Y" && v_ref_no != "" && v_ref_no.substring(0,3) == "CFS"){ //옵션 값이 Y라면
		if(v_eta_dt_tm != ""){ //ETA값이 있다면
			v_eta_dt_tm = v_eta_dt_tm.replaceAll('-','');
			v_eta_dt_tm = v_eta_dt_tm.substring(4,8)+v_eta_dt_tm.substring(0,2)+v_eta_dt_tm.substring(2,4);
			v_eta_dt_tm = addDate("d", 14, v_eta_dt_tm, "-");
			v_eta_dt_tm = v_eta_dt_tm.substring(5,7)+"-"+v_eta_dt_tm.substring(8,10)+"-"+v_eta_dt_tm.substring(0,4);
			docObjects[2].SetCellValue(curRow, "cntr_go_date", v_eta_dt_tm);
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
		for(var i=2; i<=docObjects[4].LastRow(); i++){
			docObjects[4].SetCellImage(i, "fr_att_file_1", 0);
		}
	}else if(type == "DC"){
		for(var i=2; i<=docObjects[6].LastRow(); i++){
			docObjects[6].SetCellImage(i, "dc_fr_att_file_1", 0);
		}
	}else{
		for(var i=2; i<=docObjects[5].LastRow(); i++){
			docObjects[5].SetCellImage(i, "b_fr_att_file_1", 0);
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

function setDecimalLen(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		obl_decimal_len = Number(doc[1]);
	}else{
		obl_decimal_len = 3;
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

function fnSetIBsheetInitId(sheetId){
	for(var i=0;i<docObjects.length;i++){
		if(docObjects[i].id == sheetId){
			//console.log(i  +' / fnSetIBsheetInitId  = ' + docObjects[i].id + '  /  ' + docObjects[i].ColSaveName(1));
			if(docObjects[i].ColSaveName(1) == -1){
				comConfigSheet(docObjects[i], SYSTEM_FIS);
				initSheet(docObjects[i],i+1);
				comEndConfigSheet(docObjects[i]);
			}
		}
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

//#2586 [BNX US] COD, CREDIT HOLD ACCOUNTS NO WARNING
function checkCustomer(){
	loadFlg = true;
	if(frm1.copy_bl_seq.value != ""){
		copyFlg = true;
	}
	chkCustomerByOnLoad('trdpCode_shipper', frm1.shpr_trdp_cd.value);
	cur_bizTp = 'M';
	chkCustomerByOnLoad('trdpCode_partner2', frm1.prnr_trdp_cd2.value);
	cur_airSeaTp = 'S';
	chkCustomerByOnLoad('trdpCode_agent', frm1.agent_trdp_cd.value);
	loadFlg = false;
	copyFlg = false;
	
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
		p_code = formObj.agent_trdp_cd.value;
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
//#5413 [BINEX] IT NO. DUPLICATE VALIDATION
var itCheck = true;
function getItNoCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				itCheck=false;
				//Ref. No. is duplicate.
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('ITM_IT_NO'));
				frm1.it_no.focus();
			}
			else{
				itCheck=true;
			}
		}
	}
	else{
		//SEE_BMD_MSG43
		itCheck=false;
	}
}

//#6792 [AIR POWER] SETTNG UP PACKAGE DEFAULT FOR OCEAN ENTRY SCREEN
function setPckUtCd(){
	var opt_key = "PCK_VAL_OIM";
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


//#OFVFOUR-7000 [TOP URGENT][BNX-CFS] GO DATE issue - Author: Thuong Huynh 2021/02/08
function setEtaDtSync(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		etaDtSyncFlg = doc[1];
	} else
		{
		etaDtSyncFlg = "";
		}
}
//#OFVFOUR-7000 [TOP URGENT][BNX-CFS] GO DATE issue - Author: Thuong Huynh 2021/02/08
function etaDtSync(){
		if (etaDtSyncFlg=="Y")
		{
			var sheetObj2=docObjects[2];	
   	 		if(sheetObj2.GetTotalRows()> 0){
   	 		var v_eta_dt_tm = frm1.eta_dt_tm.value;
	   	 	var v_ref_no = frm1.ref_no.value;
   	 		if(use_cfs_fields == "Y" && v_ref_no != "" && v_ref_no.substring(0,3) == "CFS"){
   	 			if(v_eta_dt_tm != ""){ //ETA값이 있다면
   	 			v_eta_dt_tm = v_eta_dt_tm.replaceAll('-','');
   	 			v_eta_dt_tm = v_eta_dt_tm.substring(4,8)+v_eta_dt_tm.substring(0,2)+v_eta_dt_tm.substring(2,4);
   	 			v_eta_dt_tm = addDate("d", 14, v_eta_dt_tm, "-");
   	 			v_eta_dt_tm = v_eta_dt_tm.substring(5,7)+"-"+v_eta_dt_tm.substring(8,10)+"-"+v_eta_dt_tm.substring(0,4);
	   	 		for(var i=1; i<=sheetObj2.LastRow(); i++){
		   	 			docObjects[2].SetCellValue(i, "cntr_go_date", v_eta_dt_tm);
		   	 			}
		   	 		}
	   	 		}
   	 		}
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