/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0040.js
*@FileTitle  : OEMBL Enry
*@author     : PhiTran
*@version    : 1.0
*@since      : 2014/06/23

*@Change history:
*@since      : 2017/07/04
*@comment    : FileName, FileTitle Modify
=========================================================*/
var loadDataProcess ="";//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
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
var cmdtListSheet=false;
var frtSdSheet=false;
var frtBcSheet=false;
var frtDcSheet=false;
var jobListSheet=false;
var isInvStsOk=false;
var blDupl=false;
var linerBkgNoDup = false;
var delete_show_complete = "N";
var linerBkgNoDupFlg = "N";
var isPdOrdStsOk = false;
var creditOver_flg = false;
/*
 * jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)
 * 자동연계요건 Start
 */        
var tab_pck_qty="";
var tab_meas="";
var tab_meas1="";
var tab_grs_wgt="";
var tab_grs_wgt1="";
/*
 * jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)
 * 자동연계요건 end
 */  

var vIntgBlModiTms;
//#6642 [JAPT] Ex. Rate Date Criteria Change request
var BL_EXPORT_EX_DT="OBD";
// 저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	fnSetIBsheetInit(1);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(3);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(11);   // grid가 생성되지않았으면 생성(속도개선)
	var hblListParam=docObjects[1].GetSaveString(false);
	var docListParam=docObjects[3].GetSaveString(false);
	var cntrListParam=docObjects[2].GetSaveString(false);
	var cmdtListParam=docObjects[11].GetSaveString(false);
	
	var sheetParam='';
	/* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
	isError=false;
	// alert(isError);
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
		isError=cntrListCheckInpuVals(docObjects[2]);
		if(!isError){
			sheetParam+= '&';
	    	sheetParam+= cntrListParam;
	    	cntrListSheet=true;
		}
	}
	if(cmdtListParam!=''){
		isError=itemCheckInpuVals(docObjects[11]);
		if(!isError){
	    	sheetParam+= '&';
	    	sheetParam+= cmdtListParam;
	    	cmdtListSheet=true;
		}
	}
	
	fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
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
	
	fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
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
    
    fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
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
	fnSetIBsheetInit(12);   //grid가 생성되지않았으면 생성(속도개선)
	var jobListParam=docObjects[12].GetSaveString(false);
    if(jobListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= jobListParam;
        jobListSheet=true;
    }
    /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
    if(isError == true)
    {
    	return true;
    }
    // sheetParam = isError
  return sheetParam;
}
var refCheck=true;
function doWork(srcName){
	
	// #1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
	setSaveConfirmMsg(srcName);
	
	if(!btnGetVisible(srcName)){	// 버튼의 단축키 사용가능여부 체크
		return;
	}
    try{
		var formObj=document.frm1;
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
            		// parent.mkNewFrame(document.getElementById("bigtitle").innerHTML,
					// currLocUrl);
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
    	     	
  	          	// #5010 [Great Luck] Agent EDI error
  	          	formObj.trnk_vsl_nm.value=trim(formObj.trnk_vsl_nm.value);
  	          	formObj.trnk_voy.value=trim(formObj.trnk_voy.value);
    	        
				formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
				// LHK 20130828 #20146 [C&LG] Booking Confirmation 을 위한
				// Container 자동 q'ty add 기능 추가 및 자동 Container Summary Setting 기능
				// 추가
				fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
				cntrInfoSet(docObjects[2]);
				//OFVFOUR-7707[Matrix] Restriction to block creating HBL in case the credit of customer exceeds credit limit
				var s_type = "trdpCode";
	    	    var s_code =frm1.act_shpr_trdp_cd.value;
	        	if (frm1.f_credit_flg.value == "Y") {
	        	    ajaxSendPost(chkCusCredit, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
	        	    if (creditOver_flg ) {
	        	        alert(getLabel('COM_FRT_CFM010'));
	        	        return;
	        	    }
	        	}
				//#3524 - 2
				//#4853 [Binex] filing no duplicated error : bkg_to_bl_flag가 Y일때 intg seq값이 있는지 같이 체크.
				if(formObj.intg_bl_seq.value=="" || formObj.intg_bl_seq.value=="1"||((formObj.ref_no.value=="AUTO" || formObj.intg_bl_seq.value=="1") && bkg_to_bl_flag=="Y")){
	        			doWork("SAVE_ADD");
        		}
        		else{
        			
        	     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록
					// 수정
        	     	if(!chkIntgBlModiTms(srcName)){
        	     	   return;
        	     	}		
        	     	
        	     	/*
					 * #428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE
					 * NOT UPDATED
					 */
        	     	/* O04 롤코드가 있으면 수정가능 or 롤코드가 없을땐 인보이스가 없을때 수정가능 (ref_no) */
        	     	if(!chkRoleInv(formObj.intg_bl_seq.value)){
        	     		return;
        	     	}
        	     	
        			doWork("SAVE_MODIFY");
        		}
        		break;
			case "SAVE_ADD":	// 등록, 2011.10.27 Kim,Jin-Hyuk
// if(blCheckInpuVals()){
// if(confirm(getLabel('FMS_COM_CFMSAV'))){
// formObj.f_cmd.value = ADD;
// gridAdd(0);
// docObjects[0].CellValue(1, 1) = 1;
//	        			
// //save post date, office info
// if(ofc_post_dt=="ETD"){
// formObj.post_dt.value = formObj.etd_dt_tm.value;
// }else if(ofc_post_dt=="ETA"){
// formObj.post_dt.value = formObj.eta_dt_tm.value;
// }
//	                	   
// //doShowProcess();
// //docObjects[0].ShowDebugMsg = true;
// docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt",
// FormQueryString(frm1)+getSndParam(), false);
// //docObjects[0].ShowDebugMsg = false;
// }
// }
				
				
				//#3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가				
/*				if (!checkMblBkgNo()) { // MBL 저장시 Booking No 유효성 체크
     			   	return;
     		    }*/
				
				// #48893 - [BINEX] OPEN Invoice 관련 - MB/L 공백제거
				formObj.ref_no.value=trim(formObj.ref_no.value); 
				formObj.bl_no.value=trim(formObj.bl_no.value);
					
	        	if(blCheckInpuVals()){
					formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
	        		
					//#3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가
					//#3524 - 2
					if(bkg_to_bl_flag=="Y"){
						if(formObj.ref_no.value=='AUTO'||formObj.ref_no.value==''){
	        				formObj.ref_no.value='';
	        				refCheck=true;			
						}
						else{
	        				// ref_no가 자동채번이 아닌경우 저장되어 있는지 체크해야 함.
	        				ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+formObj.ref_no.value, './GateServlet.gsl');
	        			}
					}else if(formObj.intg_bl_seq.value==''){
	        			if(formObj.ref_no.value=='' || formObj.ref_no.value=="AUTO"){
	        				formObj.ref_no.value='';
	        				refCheck=true;
	        			}
	        			else{
	        				// ref_no가 자동채번이 아닌경우 저장되어 있는지 체크해야 함.
	        				ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+formObj.ref_no.value, './GateServlet.gsl');
	        			}
	        		}
	        		// #52880 - [ZEN] DUPLICATE CARRIER BOOKING NO. AND NOT
					// SAVING
        	   		checkDuplicateLinerBkgNo();
        	   
        	   		if(linerBkgNoDup){
        		   		return;
        	   		}
	        		if(refCheck){
	        			ajaxSendPost(getMblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_bl_no='+formObj.bl_no.value, './GateServlet.gsl');        		   
	        		}
	        	}
		      	/*
				 * jsjang 2013.7.5 요구사항 #15963 (container
				 * infomation(pkg/whight/measurement) 자동연계요건 Start
				 */        
		      	cntr_ship_init();
		      	/*
				 * jsjang 2013.7.5 요구사항 #15963 (container
				 * infomation(pkg/whight/measurement) 자동연계요건 end
				 */   	
		      	bkg_to_bl_flag="N";
	        	break;
           case "SAVE_MODIFY":	// 등록
               formObj.f_cmd.value=MODIFY;
               // if(inpuValCheck(sheetObj, ADD)){
                   // 전체 CellRow의 갯수
               // 25559 MBL 중복 체크를 한다.
               blDupl=false;
               
               // #3724 [BINEX] [#3543] OEM Entry 시 Carrier 부킹과 연결 이후 문제
               //if (!checkMblBkgNo()) { // MBL 저장시 Booking No 유효성 체크
            	   	
          	   		//return;
               //}
               
               // #48893 - [BINEX] OPEN Invoice 관련 - MB/L 공백제거
               formObj.ref_no.value=trim(formObj.ref_no.value);
               formObj.bl_no.value=trim(formObj.bl_no.value);
				
               if(frm1.h_bl_no.value!=frm1.bl_no.value){
            	   ajaxSendPost(getMblCheckNoEmpBL, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');        		   
               } 
               if (blDupl){
            	   return;
               }
               // #52880 - [ZEN] DUPLICATE CARRIER BOOKING NO. AND NOT SAVING
         	   checkDuplicateLinerBkgNo();
         	  
               if(linerBkgNoDup){
                    return;
               }
               // 20121130 OJG
               if(blCheckInpuVals()){
            	   // /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 ,
					// 저장 전 post_dt 를 Set 한다.
       	   		  setPost_date("U");
       	   		  if(confirm(getLabel(saveMsg))){
                	   gridAdd(0);
                	   docObjects[0].SetCellValue(1, 1,1);
                	   formObj.f_bl_no.value=formObj.bl_no.value;
                	   // if(user_role_cd!="ADM"){
                		   // save post date, office info
                	   		// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK
							// 20131025 , 저장 전 post_dt 를 Set 한다.
                	   		// confirm 전에 check
                	   	   /***************************************************
							 * if(ofc_post_dt=="ETD"){
							 * formObj.post_dt.value=formObj.etd_dt_tm.value; }
							 * else if(ofc_post_dt=="ETA"){
							 * formObj.post_dt.value=formObj.eta_dt_tm.value; }
							 **************************************************/
                	   // }
                	   // LHK REF_NO MODIFY 시 중복 Check
                	   ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+formObj.ref_no.value+'&mbl_seq='+formObj.intg_bl_seq.value, './GateServlet.gsl');
                	   if(refCheck){
                		   /*
							 * jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이
							 * 저장 가능한 문제 처리
							 */
                		   var sndParam=getSndParam();
                		   if(sndParam == true)	{	return false;	}
                		   doShowProcess();
                    	   // docObjects[0].ShowDebugMsg = true;
                		   /*
							 * jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이
							 * 저장 가능한 문제 처리
							 */
                		   
                		   
                		 //#4084 (JAPT) same currency invoice - exchange rate validation
                		   exchangeRateVal();
                    	   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, false);
                    	   // docObjects[0].ShowDebugMsg = false;
                	   }
                   }
                }
               // }
               /*
				 * jsjang 2013.7.5 요구사항 #15963 (container
				 * infomation(pkg/whight/measurement) 자동연계요건 Start
				 */        
		      	cntr_ship_init();
		      	/*
				 * jsjang 2013.7.5 요구사항 #15963 (container
				 * infomation(pkg/whight/measurement) 자동연계요건 end
				 */           
               break;
           case "CLOSE_MODIFY":	// 등록
        	   
	   	     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
	   	     	if(!chkIntgBlModiTms(srcName)){
	   	     	   return;
	   	     	}		
	   	     	
        	   formObj.f_cmd.value=COMMAND10;
        	   if(confirm(getLabel(saveMsg))){
        		   gridAdd(0);
        		   docObjects[0].SetCellValue(1, 1,1);
        		   formObj.f_bl_no.value=formObj.bl_no.value;
        		   /*
					 * jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한
					 * 문제 처리
					 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}        		   
        		   doShowProcess();
        		   // docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt",
					// FormQueryString(frm1)+getSndParam(), false);
        		   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, false);
        	   }
        	   /*
				 * jsjang 2013.7.5 요구사항 #15963 (container
				 * infomation(pkg/whight/measurement) 자동연계요건 Start
				 */        
		      	cntr_ship_init();
		      	/*
				 * jsjang 2013.7.5 요구사항 #15963 (container
				 * infomation(pkg/whight/measurement) 자동연계요건 end
				 */           	   
        	   break;
           case "FINAL_MODIFY":	// 등록
        	   formObj.f_cmd.value=COMMAND11;
        	   if(confirm(getLabel('FMS_COM_CFMSAV'))){
        		   gridAdd(0);
        		   docObjects[0].SetCellValue(1, 1,1);
        		   formObj.f_bl_no.value=formObj.bl_no.value;
        		   /*
					 * jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한
					 * 문제 처리
					 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}        		   
        		   doShowProcess();
        		   // docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt",
					// FormQueryString(frm1)+getSndParam(), false);
        		   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, false);
        	   }
        	   /*
				 * jsjang 2013.7.5 요구사항 #15963 (container
				 * infomation(pkg/whight/measurement) 자동연계요건 Start
				 */        
		      	cntr_ship_init();
		      	/*
				 * jsjang 2013.7.5 요구사항 #15963 (container
				 * infomation(pkg/whight/measurement) 자동연계요건 end
				 */           	   
        	   break;
           case "REMOVE":	// 삭제
        	   
	   	     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
	   	     	if(!chkIntgBlModiTms(srcName)){
	   	     	   return;
	   	     	}		
	   	     	
        	   ajaxSendPost(doRmvSrInfo, 'reqVal', '&goWhere=aj&bcKey=getHblClsChk&biz_clss_cd=M&intg_bl_seq='+formObj.intg_bl_seq.value, './GateServlet.gsl');
        	   
        	   break;
        	   
           case "FILE_LABEL":
          		// alert("test");
           	 var param = "";
     			if(formObj.intg_bl_seq.value != ""){
    			
    			var formObj=document.frm1;
    			formObj.file_name.value = 'file_label_01_UFF.mrd';
    			formObj.title.value='File Label';
    			// Parameter Setting
    			param += '[' + formObj.intg_bl_seq.value + ']'; // $1
    			formObj.rd_param.value=param;
    			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);

     			}else {
     				// Please select the row to print.
     				alert(getLabel('FMS_COM_ALT004'));
     		
     				return;
     			}

          		
          	break;		 
        	   
           case "DOCFILE":	// 첨부파일
       			var reqParam='?intg_bl_seq='+formObj.intg_bl_seq.value;
       			/** Document List ==> Common Memo 연동 파라미터 (S) */
       			reqParam += '&palt_mnu_cd=OEM';
       			reqParam += '&opr_no='+formObj.f_ref_no.value;
       			/** Document List ==> Common Memo 연동 파라미터 (E) */
       			reqParam += '&openMean=SEARCH01';
      	   		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 450, "scroll:no;status:no;help:no;");
      	   		break;
      	   		// Email 전송로직 삭제 Bug 10366
// case "SNDEML": //Email전송
// var reqParam = '?intg_bl_seq='+formObj.intg_bl_seq.value;
//             	
// reqParam += '&openMean=SEARCH01';
// popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450,
// "scroll:no;status:no;help:no;");
//       	   
// break;
           case "SEARCHLIST":	// 조회
			   formObj.f_ref_no.value=trim(formObj.f_ref_no.value);
			   formObj.f_bl_no.value=trim(formObj.f_bl_no.value);
			   formObj.f_lnr_bkg_no.value=trim(formObj.f_lnr_bkg_no.value);
        	   if(formObj.f_ref_no.value==''&&formObj.f_bl_no.value==''&&formObj.f_lnr_bkg_no.value==''){
        		   // Please enter more than one Search Condition!
        		   alert(getLabel('FMS_COM_ALT014'));
        		   formObj.f_ref_no.focus();
        		   return;
        	   }
        	   else{
        		   
        		   //#5188 [BINEX] AFTER V470.06 RELEASE, FILING # RETRIEVE ON BL ENTRY
        		   frm1.f_intg_bl_seq.value='';
        		   
        		   // BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
                   formObj.f_cmd.value=SEARCHLIST;
                   submitForm(SEARCHLIST);
            	   
        	   }
        	   break;
           case "SEARCHLIST01":	// 조회
			   formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
			   formObj.f_bl_no.value=trim(formObj.f_bl_no.value);
			   formObj.f_ref_no.value=trim(formObj.f_ref_no.value);
			   formObj.f_lnr_bkg_no.value=trim(formObj.f_lnr_bkg_no.value);
        	   if(formObj.intg_bl_seq.value!=''){
	        	   if(formObj.f_bl_no.value==''&&formObj.f_ref_no.value==''&&formObj.f_lnr_bkg_no.value==''){
	        		   alert(getLabel('FMS_COM_ALT014'));
	        		   return;
	        	   }
	        	   else{
	                   formObj.f_cmd.value=SEARCHLIST01;
	            	   // doShowProcess();
	                   fnSetIBsheetInit(1);   // grid가 생성되지않았으면 생성(속도개선)
 	            	   docObjects[1].DoSearch("SEE_BMD_0040_1GS.clt", FormQueryString(frm1) );
	        	   }
        	   }
        	   break;
           case "SEARCH_DOC":	// 첨부문서 조회
			   formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
        	   if(formObj.intg_bl_seq.value!=''){
	        	   // Doccument File List 조회
		   	       formObj.f_cmd.value=SEARCHLIST02;
		   	       fnSetIBsheetInit(3);   // grid가 생성되지않았으면 생성(속도개선)
 		   	 	   docObjects[3].DoSearch("./SEE_BMD_0021_1GS.clt", FormQueryString(frm1) );
        	   }	   	 	   
        	   break;
           case "SEARCH_CNTR":	// Container 조회
			   formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
        	   if(formObj.intg_bl_seq.value!=''){
        		   searchGrid(6);
        		   
	   		      // Container List 조회
	   	          formObj.f_cmd.value=SEARCHLIST03;
	   	          fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
 	   	 	      docObjects[2].DoSearch("./SEE_BMD_0040_2GS.clt", FormQueryString(frm1) );
 	   	 	      
 	   	 	      formObj.f_cmd.value=SEARCHLIST04;
 	   	 	      fnSetIBsheetInit(10);   // grid가 생성되지않았으면 생성(속도개선)
 	   	 	      docObjects[10].DoSearch("./SEE_BMD_0040_4GS.clt", FormQueryString(frm1) );
 	   	 	      
 	   	 	      // Commodity List 조회
 	   	 	      //#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
 	   	 	      //searchGrid(13); // cntr list searchend에 포함 sheet4_OnSearchEnd
        	   }	   	 	   
        	   break;
           case "MFPRINT":
			   formObj.bl_no.value=trim(formObj.bl_no.value);
        	   if(formObj.bl_no.value==""){
        		   // Please retrieve data.
        		   alert(getLabel('FMS_COM_ALT029'));
        		   return;
        	   }
        	   var param='title=Sea Consolidated Cargo Manifest';
        	   param += '&cmd_type=46';
        	   param += '&bl_no=' + formObj.bl_no.value;
        	   popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
        	   break;
           case "PRINT":
        	   formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
        	   if(formObj.intg_bl_seq.value == ""){
	   	 			// Select Please.
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 	   }
	   	 	   else{
		   	 		/* blueprint #235 */					
					var reqParam='?intg_bl_seq='  + formObj.intg_bl_seq.value;
					reqParam += '&usrPhn=' + usrPhn;
					reqParam += '&usrFax=' + usrFax;
					reqParam += '&usrEml=' + usrEml;			
					reqParam += '&bl_no='  + formObj.bl_no.value;
	         		popGET('RPT_PRN_0250.clt'+reqParam, '', 500, 220, "scroll:yes;status:no;help:no;");
	   	 	   }
        	   /*
				 * formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
				 * if(formObj.intg_bl_seq.value == ""){ //Please retrieve data.
				 * alert(getLabel('FMS_COM_ALT029')); } else{
				 * formObj.file_name.value='SR_SEA.mrd';
				 * formObj.title.value='Ocean Export SR'; //Parameter Setting
				 * var param='[' + formObj.intg_bl_seq.value + ']'; // [1] param +=
				 * '[' + usrPhn + ']'; // [2] param += '[' + usrFax + ']'; //
				 * [3] param += '[' + usrEml + ']'; // [4]
				 * formObj.rd_param.value=param; formObj.mailTitle.value='Master
				 * Set / Shipping Request [MBL No : ' + formObj.bl_no.value +
				 * ']';; formObj.mailTo.value=mailTo;
				 * formObj.rpt_biz_tp.value="OEM";
				 * formObj.rpt_biz_sub_tp.value="BL";
				 * 
				 * //#52512 [CLT] RD File Name을 표준화| Standardization of File
				 * Name during downloading the report if (formObj.bl_no.value !=
				 * ""){ var v_bl_no = formObj.bl_no.value ; v_bl_no =
				 * v_bl_no.replace(/\./g, ""); v_bl_no =
				 * v_bl_no.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g,
				 * "_"); formObj.rpt_file_name_title.value = "SR-"+v_bl_no; }
				 * else { formObj.rpt_file_name_title.value = ""; }
				 * 
				 * popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740); }
				 */
        	   break;
           // #21635 oyh shipping document report 출력
           case "S_DOC":
        	    fnSetIBsheetInit(3);   // grid가 생성되지않았으면 생성(속도개선)
        		var sheetObj3=docObjects[3];	
	   	 		if(sheetObj3.SearchRows()> 0){
	   	 			var formObj=document.frm1;
	   	 			formObj.file_name.value='doc_list.mrd';
	   	 			formObj.title.value='Document List';
	   	 			// Parameter Setting
	   	 			var param='[' + formObj.intg_bl_seq.value + ']';			// [1]
	   	 			param += '[OEM]'; 											// [2]
																				// MASTER/HOUSE/OTH
																				// 여부
	   	 			param += '[' + formObj.bl_no.value + ']';					// [3]
																				// MBL_NO
	   	 			param += '[' + formObj.user_id.value + ']';					// [4]
	   	 			formObj.rd_param.value=param;
	   	 			formObj.mailTitle.value='Master Set / Shipping Request [MBL No : ' + formObj.bl_no.value + ']';;
	   	 			formObj.mailTo.value=mailTo;
	   	 			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   	 		}
        	   break;
        	   
           case "TELEXRELEASE":
		   		var formObj=document.frm1;
		   		
	   			if(formObj.intg_bl_seq.value == ""){
	   				alert(getLabel('FMS_COM_ALT004'));
	   				return;
	   			}
	   			
	   			formObj.title.value="Ocean Export Master B/L";
				formObj.file_name.value="telex_release_letter.mrd";
				
				var intgBlSeq=formObj.intg_bl_seq.value;
				var refOfcCd=formObj.ref_ofc_cd.value;
				
				// Parameter Setting
				var param = '[' + intgBlSeq + ']';
				param += '[]';
				param += '[]';
				param += '[' + refOfcCd + ']';
				param += '[]';
				param += '[]';
				param += '[S]'; // Air/Ocean
				formObj.rd_param.value = param;
				formObj.rpt_biz_tp.value = "OEM";
				formObj.rpt_biz_sub_tp.value = "BL";
				formObj.mailTitle.value = 'Master BL No : ' + formObj.bl_no.value;
				
				popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				break;
				
	   	 	case "SEND_VGM_EDI":	
	   	 		var intgBlSeq = trim(formObj.intg_bl_seq.value);
	   	 		if(formObj.intg_bl_seq.value == ""){
	   	 			// Please retrieve data.
	   	 			alert(getLabel('FMS_COM_ALT029'));
	   	 		}
	   	 		
	   	 		var reqParam = '?f_intg_bl_seq='+intgBlSeq;
	   	 		
	   	 		popGET('./EDI_VGM_0010.clt'+reqParam, 'VGM EDI', 1000, 575, "scroll:no;status:no;help:no;");
	   	 		break;	
        	   
        	   
      	   // 2010.12.22 김진혁 추가, MBL도 HBL과 같은 조건으로 Copy 버튼 추가
           case "COPY":	// 조회
        	   
        	   // BL_COPY COPY시 컨펌메시지 없이 바로 Submit후 frt Check화면을 보여준다
        	   frm1.f_cmd.value=COMMAND02;
        	   doShowProcess();
        	   frm1.submit();
        	   
// if(confirm(getLabel('FMS_COM_CFMCPY'))){
// formObj.f_cmd.value=COMMAND02;
// // doShowProcess();
// // formObj.submit();
// submitForm(COMMAND02);
// }
        	   break;
           case "HBLADD":	// 등록
        	   var keyYn='';
        	   if(formObj.bl_sts_cd.value!='NA'){
        		   keyYn='Y';
        	   }
               var paramArr=new Array(1);
			   var curHblStr='';
			   var divStr='^';
			   var clsStr=';;';
			   fnSetIBsheetInit(1);   // grid가 생성되지않았으면 생성(속도개선)
			   // 현재 BLSEQ가 등록되었는지를 확인함
			   for(var i=1; i< docObjects[1].LastRow() + 1; i++){
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_bkg_no');
				   curHblStr+= divStr; 
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_bl_no');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_act_shipper');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_obrd_dt_tm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_trnk_vsl');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_trnk_voy');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pol_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pol_nod_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pol_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pod_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pod_nod_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pod_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_del_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_del_nod_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_del_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_rep_cmdt_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_rep_cmdt_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_grs_wgt');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_grs_wgt_ut_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_act_wgt');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_act_wgt_ut_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_meas');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_meas_ut_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pck_qty');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pck_ut_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_pck_ut_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_intg_bl_seq');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_ibflag');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_lnr_trdp_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_lnr_trdp_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_shpr_trdp_nm');
				   curHblStr+= clsStr;
			   }
			   paramArr[0]=curHblStr;
        	   var rtnVal =  ComOpenWindow('./SEE_BMD_0031.clt',  paramArr,  "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:670px" , true);
        	   // HBL ADD이후
        	   if(rtnVal!=''&&typeof(rtnVal)!='undefined'){
	        	   var rtnArr=rtnVal.split(';;');
	        	   var isBegin=true;
	        	   var savedHbl='';
	        	   // 기존 HBL목록을 초기화
	             	if(docObjects[1].LastRow() + 1>1){
	            		var totRow=docObjects[1].LastRow();
	            		for(var i=totRow; 0 < i; i--){
if(docObjects[1].GetCellValue(i, 'hbl_ibflag')!='R'){
	            				docObjects[1].RowDelete(i, false);
	            			}
	            			else{
savedHbl+= docObjects[1].GetCellValue(i, 'hbl_bl_no');
	            				savedHbl+= ':';
	            			}
	            		}
	            	}
	               // 현재 선택된 HBL정보를 표시함
				   var intRows=docObjects[1].LastRow() + 1;
				   var newRow=intRows;
				   var dispArr;
				   var totPck=0;
				   var totMeas=0;
				   var totActWgt=0;
				   var totWgt=0;
				   var blSeq='';
				   var firstObrdDt=0;
	        	   for(var i=0; i < rtnArr.length; i++){
	        		   var hblArr=rtnArr[i].split('^');
	        		   if(rtnArr[i]!=''){
	        			   // BL번호가 저장되어있지 않음경우
	        			   if(savedHbl.indexOf(hblArr[1]+':')==-1){
	        				   // 화면표시
	        				   if(i==0){
	        					   dispArr=hblArr;
	        					   firstObrdDt=hblArr[3];
	        				   }
	        				   else{
	        					   if(firstObrdDt==0){
	        						   firstObrdDt=hblArr[3];   
	        					   // 가장빠른 Onboard 일자를 가지고 온다
	        					   }
	        					   else if(firstObrdDt>hblArr[3]){
	        						   firstObrdDt=hblArr[3];   
	        					   }
	        				   }
							    docObjects[1].DataInsert(newRow);
								docObjects[1].SetCellValue(intRows, 'hbl_bkg_no',hblArr[0]);
								docObjects[1].SetCellValue(intRows, 'hbl_bl_no',hblArr[1]);
								docObjects[1].SetCellValue(intRows, 'hbl_act_shipper',hblArr[2]);
								docObjects[1].SetCellValue(intRows, 'hbl_obrd_dt_tm',hblArr[3]);
								docObjects[1].SetCellValue(intRows, 'hbl_trnk_vsl',hblArr[4]);
								docObjects[1].SetCellValue(intRows, 'hbl_trnk_voy',hblArr[5]);
								docObjects[1].SetCellValue(intRows, 'hbl_pol_cd',hblArr[6]);
								docObjects[1].SetCellValue(intRows, 'hbl_pol_nod_cd',hblArr[7]);
								docObjects[1].SetCellValue(intRows, 'hbl_pol_nm',hblArr[8]);
								docObjects[1].SetCellValue(intRows, 'hbl_pod_cd',hblArr[9]);
								docObjects[1].SetCellValue(intRows, 'hbl_pod_nod_cd',hblArr[10]);
								docObjects[1].SetCellValue(intRows, 'hbl_pod_nm',hblArr[11]);
								docObjects[1].SetCellValue(intRows, 'hbl_del_cd',hblArr[12]);
								docObjects[1].SetCellValue(intRows, 'hbl_del_nod_cd',hblArr[13]);
								docObjects[1].SetCellValue(intRows, 'hbl_del_nm',hblArr[14]);
								docObjects[1].SetCellValue(intRows, 'hbl_rep_cmdt_cd',hblArr[15]);
								docObjects[1].SetCellValue(intRows, 'hbl_rep_cmdt_nm',hblArr[16]);
								docObjects[1].SetCellValue(intRows, 'hbl_grs_wgt',hblArr[17]);
								docObjects[1].SetCellValue(intRows, 'hbl_grs_wgt_ut_cd',hblArr[18]);
								docObjects[1].SetCellValue(intRows, 'hbl_act_wgt',hblArr[19]);
								docObjects[1].SetCellValue(intRows, 'hbl_act_wgt_ut_cd',hblArr[20]);
								docObjects[1].SetCellValue(intRows, 'hbl_meas',hblArr[21]);
								docObjects[1].SetCellValue(intRows, 'hbl_meas_ut_cd',hblArr[22]);
								docObjects[1].SetCellValue(intRows, 'hbl_pck_qty',hblArr[23]);
								docObjects[1].SetCellValue(intRows, 'hbl_pck_ut_cd',hblArr[24]);
								docObjects[1].SetCellValue(intRows, 'hbl_pck_ut_nm',hblArr[25]);
								docObjects[1].SetCellValue(intRows, 'hbl_intg_bl_seq',hblArr[26]);
								docObjects[1].SetCellValue(intRows, 'hbl_lnr_trdp_cd',hblArr[27]);
								docObjects[1].SetCellValue(intRows, 'hbl_lnr_trdp_nm',hblArr[28]);
								docObjects[1].SetCellValue(intRows, 'hbl_shpr_trdp_nm',hblArr[29]);
								blSeq+= hblArr[26];
								blSeq+= ',';
								totWgt=getSumFloat(totWgt, hblArr[17]);
								totActWgt=getSumFloat(totActWgt, hblArr[19]);
								totMeas=getSumFloat(totMeas,hblArr[21]);
								totPck=getSumFloat(totPck, hblArr[23]);
							   if(isBegin){
								   if(formObj.intg_bl_seq.value==''){
									   shpAddr+= '\n';
									   shpAddr+= hblArr[29];
									   formObj.shpr_trdp_addr.value=shpAddr;
								   }
								   isBegin=false;
							   }
							   newRow++;
							   intRows++;
	        			   }
	        		   }
	        	   }
	        	   if(typeof(dispArr)!='undefined'&&newRow>0){
	        		   dispArr[3]=mkStrToDate(firstObrdDt);
	        		   dispArr[23]=strToFloatByNDecimalTp(totPck, 100);
	        		   dispArr[17]=strToFloatByNDecimalTp(totWgt, 100);
	        		   dispArr[19]=strToFloatByNDecimalTp(totActWgt, 100);
	        		   dispArr[21]=strToFloatByNDecimalTp(totMeas,10000);
	        		   // 화면에 기본값 표시
	        		   setDfltVal(dispArr);
	        		   // Mark/Description 표시
// if(blSeq!=''){
// ajaxSendPost(autoMrkDesc, 'reqVal',
// '&goWhere=aj&bcKey=searchMrkDesc&intg_bl_seq='+blSeq, './GateServlet.gsl');
// }
	        	   }
				// formObj.act_wgt.value = hblArr[19];
				// formObj.meas.value = hblArr[21];
				// formObj.pck_qty.value = hblArr[23];
        	   }
        	   break;
           	case "SEARCH_FRT":	// Freight 조회
          		if(formObj.bl_sts_cd.value!='NA'){
          			searchGrid(6);
          			searchGrid(7);
          			searchGrid(8);
          			searchGrid(9);
          		}
          		break;
           	case "GOTOACCT":
				formObj.bl_no.value=trim(formObj.bl_no.value);
				formObj.ref_no.value=trim(formObj.ref_no.value);
           		if(formObj.bl_no.value!='' || formObj.ref_no.value!=''){
           			var paramStr="./ACC_INV_0040.clt?";
           			/* #23987, s_mbl_no 링크제거 jsjang 2013.11.25 */
           			// 24842 oyh Mbl에서 AP를 눌렀을 경우 Vendor inv no에 MBLno가 세팅안됨 으로
					// 기존 로직으로 재수정

           			//hsk           			
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
					paramStr+= "&f_air_sea_clss_cd=S&f_bnd_clss_cd=O";
					
           			parent.mkNewFrame('Invoice List', paramStr);
           		}
           		break;
           	case "HBL_ENTRY":
				formObj.ref_no.value=trim(formObj.ref_no.value);
           		if(formObj.ref_no.value!=''){
           			var paramStr="./SEE_BMD_0020.clt?";
           			paramStr+= "f_mbl_ref_no=" + formObj.ref_no.value;
           			parent.mkNewFrame('Booking & HBL', paramStr);
           		}
           		break;
           	case "PROFIT_REPORT":
				var reqParam='?intg_bl_seq=' + formObj.intg_bl_seq.value;
					reqParam += '&mbl_no=' + formObj.bl_no.value;
					reqParam += '&ref_no=' + formObj.ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "S";
					reqParam += '&bnd_clss_cd=' + "O";
					reqParam += '&biz_clss_cd=' + "M";
				popGET('RPT_PRN_0180.clt'+reqParam, '', 1270, 750, "scroll:yes;status:no;help:no;");
		   	 	break;	
		   	/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
            case "SEARCH_JB":	// Job template & History
	     	   if(frm1.bl_sts_cd.value!='NA'){
	     		// 처리내역( Job temlate에 따라서)
	     		 searchGrid(10);
	     		 
	     		 searchGrid(15);
	     	   }
     	   		break;	
            // #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
            case "SEARCH_WO":	// WORK ORDER 조회
         	   if(frm1.bl_sts_cd.value!='NA'){
 				   // Container List 조회
         		   searchGrid(11);
         	   }
         	   break;
            case "WORKORDER":	// Work Order 화면호출
            	/*
				 * var param='f_intg_bl_seq=' + frm1.intg_bl_seq.value; param +=
				 * '&air_sea_clss_cd=S'; param += '&bnd_clss_cd=O'; param +=
				 * '&biz_clss_cd=M'; var
				 * paramStr="./AIC_WOM_0010.clt?f_cmd="+SEARCH01+"&s_type=B&"+param;
				 * parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
				 */
            	var paramStr="./AIC_WOM_0010.clt?air_sea_clss_cd=S&bnd_clss_cd=O&biz_clss_cd=M";
	            var param = "&f_cmd=" + SEARCH01;
	            param += "&s_type=B";
	            param += "&f_intg_bl_seq=" + frm1.intg_bl_seq.value;
	            parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
                break;
                
			case "PACKAGE_LABEL":
				if (frm1.intg_bl_seq.value != "") {
					var reqParam = '';
					reqParam += '?s_intg_bl_seq='+ frm1.intg_bl_seq.value;
					reqParam += '&biz_clss_cd=' + "M";
					reqParam += '&label_type=' + "01";
					popGET('SEE_BMD_0061.clt' + reqParam, '', 600, 280,"scroll:yes;status:no;help:no;");
				}
				break;
				
			case "PACKAGE_LABEL2":
				if (frm1.intg_bl_seq.value != "") {
					var reqParam = '';
					reqParam += '?s_intg_bl_seq='+ frm1.intg_bl_seq.value;
					reqParam += '&biz_clss_cd=' + "M";
					reqParam += '&label_type=' + "02";
					popGET('SEE_BMD_0061.clt' + reqParam, '', 600, 280,"scroll:yes;status:no;help:no;");
				}
				break;
				
	   	    case "BOOKING_INFO":
	   	    	if (frm1.intg_bl_seq.value != "") { 
					/* blueprint #235 */
	    			var reqParam='?intg_bl_seq='  +frm1.intg_bl_seq.value;  
	         		popGET('RPT_PRN_0241.clt'+reqParam, '', 500, 540, "scroll:yes;status:no;help:no;");
				}
		   		break;	
		   	case "TRANSSHIPPED":
				rtnary=new Array(2);
		   		rtnary[0]=frm1.pre_vsl_cd.value;
		   		rtnary[1]=frm1.pre_vsl_nm.value;
		   		rtnary[2]=frm1.pre_voy.value;
		   		rtnary[3]=frm1.ts1_port_cd.value;
		   		rtnary[4]=frm1.ts1_port_nm.value;
		   		rtnary[5]=frm1.ts1_eta_dt_tm.value;
		   		rtnary[6]=frm1.ts1_etd_dt_tm.value;
		   		
		   		callBackFunc = "TRANSSHIPPED";
		   		modal_center_open('./SEE_BMD_0190.clt?f_cmd='+SEARCH + '&f_intg_bl_seq='+frm1.intg_bl_seq.value, rtnary, 380,215,"no");
		   		
		   		/*
				 * var
				 * paramStr="./SEE_BMD_0190.clt?f_cmd="+SEARCH+"&f_intg_bl_seq="+frm1.intg_bl_seq.value;
				 * //alert(paramStr); var rtnVal = ComOpenWindow(paramStr,
				 * rtnary,
				 * "scroll:yes;status:no;help:no;dialogWidth:380px;dialogHeight:200px" ,
				 * true);
				 */
	   	        
	   	        break;

			case "SHIPPING_INSTRUCTION" :
				var paramStr = "";
				paramStr += "./SEE_BMD_0170.clt";
				if(frm1.intg_bl_seq.value == '') {
					alert("Filing No. is empty! First please search Master B/L info.");
					return;
				}
				paramStr += "?intg_bl_seq=" + frm1.intg_bl_seq.value;
				//6301 [JAPT] Mail sending function related request
				paramStr += "&lnr_bkg_no=" + frm1.lnr_bkg_no.value;
				paramStr += "&trnk_vsl_nm=" + frm1.trnk_vsl_nm.value;
				paramStr += "&trnk_voy=" + frm1.trnk_voy.value;
				paramStr += "&etd_dt_tm=" + frm1.etd_dt_tm.value;
				paramStr += "&bl_no=" + frm1.bl_no.value;
				parent.mkNewFrame('Shipping Instruction (FOR D/R)', paramStr);

				break;

        }
        
		//Log Monitor Start:Btn
		if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
		//Log Monitor End:Btn
        
    }
    catch(e) {
        if(e == "[object Error]"){
        	// Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	// System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
    }
}
function entSearch(){
	if(event.keyCode == 13){
	//	document.frm1.f_CurPage.value = 1;
		doWork('SEARCHLIST');
	}
}
function TRANSSHIPPED(rtnVal)
{
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		frm1.pre_vsl_cd.value=rtnValAry[0];
		frm1.pre_vsl_nm.value=rtnValAry[1];
		frm1.pre_voy.value=rtnValAry[2];
		//#3873 [JAPT]  T/S popup , validation and sync.
		if(rtnValAry[3] == null || rtnValAry[3] == ""){
			frm1.ts1_port_cd.value="";
			frm1.ts1_port_nm.value="";
		}else{
			frm1.ts1_port_cd.value=rtnValAry[3];
			frm1.ts1_port_nm.value=rtnValAry[4];			
		}
		frm1.ts1_eta_dt_tm.value=rtnValAry[5];
		frm1.ts1_etd_dt_tm.value=rtnValAry[6];
	}
}
function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_ref_no.value = getParam(url,"f_ref_no");
	formObj.f_bl_no.value = getParam(url,"f_bl_no");
	formObj.f_lnr_bkg_no.value = getParam(url,"f_lnr_bkg_no");
	
	doWork('SEARCHLIST');
}

function setFieldValue(obj, value){
	if($(obj).is("select") || $(obj).is("input:radio") || $(obj).is("input:checkbox")){
		if(value != ""){
			$(obj).val(value);
		}
	}else {
		$(obj).val(value);
	}
}
function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	formObj.f_cmd.value=cmd;
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./SEE_BMD_0040AJ.clt",
		   dataType: 'xml',
		   data: $(formObj).serialize(),
		   success: function(data){
			   setFieldValue( formObj.bl_sts_cd, $('bl_sts_cd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.f_intg_bl_seq, $('f_intg_bl_seq',data).text());
			   setFieldValue( formObj.f_hbl_intg_bl_seq, $('f_hbl_intg_bl_seq',data).text());
			   setFieldValue( formObj.mk_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.h_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.sel_ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.org_lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.bkg_seq, $('bkg_seq',data).text());
			   setFieldValue( formObj.org_bkg_seq, $('bkg_seq',data).text());
			   setFieldValue( formObj.org_post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());
			   setFieldValue( formObj.f_ref_no, $('f_ref_no',data).text());
			   setFieldValue( formObj.f_bl_no, $('f_bl_no',data).text());
			   setFieldValue( formObj.f_lnr_bkg_no, $('f_lnr_bkg_no',data).text());
			   setFieldValue( formObj.ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.h_ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.hbl_tp_cd, $('hbl_tp_cd',data).text());
			   setFieldValue( formObj.mrn_no, $('mrn_no',data).text());
			   setFieldValue( formObj.prnr_ref_no, $('prnr_ref_no',data).text());
			   setFieldValue( formObj.exp_ref_no, $('exp_ref_no',data).text());
			   setFieldValue( formObj.post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.sub_bl_no, $('sub_bl_no',data).text());
			   setFieldValue( formObj.itn_no, $('itn_no',data).text());
			   setFieldValue( formObj.sc_no, $('sc_no',data).text());
			   setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
			   setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
			   setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
			   setFieldValue( formObj.ntfy_trdp_cd, $('ntfy_trdp_cd',data).text());
			   setFieldValue( formObj.ntfy_trdp_nm, $('ntfy_trdp_nm',data).text());
			   setFieldValue( formObj.ntfy_trdp_addr, $('ntfy_trdp_addr',data).text());
			   setFieldValue( formObj.agent_trdp_cd, $('agent_trdp_cd',data).text());
			   setFieldValue( formObj.agent_trdp_nm, $('agent_trdp_nm',data).text());
			   setFieldValue( formObj.agent_trdp_addr, $('agent_trdp_addr',data).text());
			   setFieldValue( formObj.prnr_trdp_cd2, $('prnr_trdp_cd2',data).text());
			   setFieldValue( formObj.prnr_trdp_nm2, $('prnr_trdp_nm2',data).text());
			   setFieldValue( formObj.prnr_trdp_addr2, $('prnr_trdp_addr2',data).text());
			   setFieldValue( formObj.prnr_trdp_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.prnr_trdp_nm, $('prnr_trdp_nm',data).text());
			   setFieldValue( formObj.prnr_trdp_addr, $('prnr_trdp_addr',data).text());
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.obrd_dt_tm, $('obrd_dt_tm',data).text());
			   setFieldValue( formObj.trnk_vsl_cd, $('trnk_vsl_cd',data).text());
			   setFieldValue( formObj.trnk_vsl_nm, $('trnk_vsl_nm',data).text());
			   setFieldValue( formObj.trnk_voy, $('trnk_voy',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.org_etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.org_eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.etd_por_tm, $('etd_por_tm',data).text());
			   setFieldValue( formObj.carr_trdp_cd, $('carr_trdp_cd',data).text());
			   setFieldValue( formObj.carr_trdp_addr, $('carr_trdp_addr',data).text());
			   setFieldValue( formObj.carr_trdp_nm, $('carr_trdp_nm',data).text());
			   setFieldValue( formObj.por_cd, $('por_cd',data).text());
			   setFieldValue( formObj.por_nod_cd, $('por_nod_cd',data).text());
			   setFieldValue( formObj.por_nm, $('por_nm',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nod_cd, $('pol_nod_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nod_cd, $('pod_nod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.del_cd, $('del_cd',data).text());
			   setFieldValue( formObj.del_nod_cd, $('del_nod_cd',data).text());
			   setFieldValue( formObj.del_nm, $('del_nm',data).text());
			   setFieldValue( formObj.fnl_dest_loc_cd, $('fnl_dest_loc_cd',data).text());
			   setFieldValue( formObj.fnl_dest_nod_cd, $('fnl_dest_nod_cd',data).text());
			   setFieldValue( formObj.fnl_dest_loc_nm, $('fnl_dest_loc_nm',data).text());
			   setFieldValue( formObj.rcv_wh_cd, $('rcv_wh_cd',data).text());
			   setFieldValue( formObj.fnl_dest_nod_cd, $('fnl_dest_nod_cd',data).text());
			   setFieldValue( formObj.rcv_wh_nm, $('rcv_wh_nm',data).text());
			   setFieldValue( formObj.cntr_info, $('cntr_info',data).text());
			   setFieldValue( formObj.pu_trdp_cd, $('pu_trdp_cd',data).text());
			   setFieldValue( formObj.pu_trdp_nm, $('pu_trdp_nm',data).text());
			   setFieldValue( formObj.frt_term_cd, $('frt_term_cd',data).text());
			   setFieldValue( formObj.h_frt_term_cd, $('frt_term_cd',data).text());
			   setFieldValue( formObj.shp_mod_cd, $('shp_mod_cd',data).text());
			   setFieldValue( formObj.fm_svc_term_cd, $('fm_svc_term_cd',data).text());
			   setFieldValue( formObj.to_svc_term_cd, $('to_svc_term_cd',data).text());
			   setFieldValue( formObj.curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.obl_tp_cd, $('obl_tp_cd',data).text());
			   setFieldValue( formObj.h_obl_tp_cd, $('obl_tp_cd',data).text());
			   setFieldValue( formObj.broker_rt, $('broker_rt',data).text());
			   setFieldValue( formObj.profit_share, $('profit_share',data).text());
			   setFieldValue( formObj.port_open_dt, $('port_open_dt',data).text());
			   setFieldValue( formObj.port_open_tm, $('port_open_tm',data).text());
			   setFieldValue( formObj.cut_off_dt, $('cut_off_dt',data).text());
			   setFieldValue( formObj.cut_off_tm, $('cut_off_tm',data).text());
			   setFieldValue( formObj.rail_cut_off_dt, $('rail_cut_off_dt',data).text());
			   setFieldValue( formObj.rail_cut_off_tm, $('rail_cut_off_tm',data).text());
			   setFieldValue( formObj.doc_cut_off_dt, $('doc_cut_off_dt',data).text());
			   setFieldValue( formObj.doc_cut_off_tm, $('doc_cut_off_tm',data).text());
			   setFieldValue( formObj.vgm_cut_off_dt, $('vgm_cut_off_dt',data).text());
			   setFieldValue( formObj.vgm_cut_off_tm, $('vgm_cut_off_tm',data).text());
			   
			   setFieldValue( formObj.rlsd_flg, $('rlsd_flg',data).text());
			   setFieldValue( formObj.rlsd_dt_tm, $('rlsd_dt_tm',data).text());
			   setFieldValue( formObj.rlsd_usrid, $('rlsd_usrid',data).text());
			   setFieldValue( formObj.rlsd_usr_nm, $('rlsd_usr_nm',data).text());
			   setFieldValue( formObj.rlsd_dept_cd, $('rlsd_dept_cd',data).text());
			   
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.meas, $('meas',data).text());
			   setFieldValue( formObj.meas1, $('meas1',data).text());
			   setFieldValue( formObj.bl_iss_dt, $('bl_iss_dt',data).text());
			   setFieldValue( formObj.opr_usrid, $('issued_by',data).text());
			   setFieldValue( formObj.proc_usrnm, $('proc_usrnm',data).text());
			   setFieldValue( formObj.opr_usrnm, $('proc_usrnm',data).text());
			   setFieldValue( formObj.opr_ofc_cd, $('proc_ofccd',data).text());
			   setFieldValue( formObj.opr_dept_cd, $('proc_dept_cd',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   setFieldValue( formObj.sls_usr_nm, $('sls_usr_nm',data).text());
			   setFieldValue( formObj.sls_dept_cd, $('sls_dept_cd',data).text());
			   setFieldValue( formObj.sad_txt, $('sad_txt',data).text());
			   setFieldValue( formObj.mk_grs_wgt, $('mk_grs_wgt',data).text());
			   setFieldValue( formObj.mk_grs_wgt1, $('mk_grs_wgt1',data).text());
			   setFieldValue( formObj.mk_meas, $('mk_meas',data).text());
			   setFieldValue( formObj.mk_meas1, $('mk_meas1',data).text());
			   setFieldValue( formObj.mk_txt, $('mk_txt',data).text());
			   setFieldValue( formObj.desc_txt, $('desc_txt',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   // #1056 [OEM Entry]PO# 항목 추가 및 연계
			   setFieldValue( formObj.po_no, $('po_no',data).text());
			   setFieldValue( formObj.h_po_no, $('po_no',data).text());
			   
			   setFieldValue( formObj.item_no, $('item_no',data).text());
			   
			   setFieldValue( formObj.ctrb_ofc_cd, $('ctrb_ofc_cd',data).text());
			   setFieldValue( formObj.ctrb_dept_cd, $('ctrb_dept_cd',data).text());
			   setFieldValue( formObj.ctrb_ratio_yn, $('ctrb_ratio_yn',data).text());
			   setFieldValue( formObj.ctrb_mgn, $('ctrb_mgn',data).text());
			   
			   // setFieldValue( formObj.xcrtDt, $('obrd_dt_tm',data).text());//#6642 [JAPT] Ex. Rate Date Criteria Change request
			   var obrddttm;
			   if(BL_EXPORT_EX_DT == 'ETD'){
				   obrddttm = $('etd_dt_tm',data).text().replaceAll('-','');
			   } else {
				   obrddttm = $('obrd_dt_tm',data).text().replaceAll('-','');
			   }
			   setFieldValue( formObj.xcrtDt, obrddttm);
			   setFieldValue( formObj.f_modify, $('f_modify',data).text()); // #428
																			// [ZEN]
																			// AFTER
																			// AR/AP/DC
																			// CREATION,
																			// FILING
																			// #
																			// SHOULD
																			// BE
																			// NOT
																			// UPDATED
			   setFieldValue( formObj.svc_lane_nm, $('svc_lane_nm',data).text()); // #943
																					// [PATENT]
																					// Lane
																					// 및
																					// Port
																					// Cut-off
																					// time
																					// 추가
			   // #1619 [CLT] Original B/L Type- 항목 정리 setFieldValue(
				// formObj.bl_rlse_tp_cd, $('bl_rlse_tp_cd',data).text());
				// //<!--#1430 [PATENT] 0215_15 B/L TYPE DIVERSELY-->
			   sheet14.SetColProperty('item_cntr_list_seq', {ComboText:$('CNTCD2',data).text(), ComboCode:$('CNTCD1',data).text()} );
			   
			   setFieldValue( formObj.act_shpr_trdp_cd, $('act_shpr_trdp_cd',data).text());
			   setFieldValue( formObj.act_shpr_trdp_nm, $('act_shpr_trdp_nm',data).text());
			   setFieldValue( formObj.act_shp_info, $('act_shp_info',data).text());
			   setFieldValue( formObj.nomi_flg, $('nomi_flg',data).text());
			   
			   /* #1804 [Split - 1] [PATENT] Payment Verification - 기능보완 */
			   setFieldValue( formObj.verify_flag, $('verify_flag',data).text());
			   
			   /* #1743 [PATENT]OEM B/L Pickup Date/Time 필요 */
			   setFieldValue( formObj.pu_trdp_dt, $('pu_trdp_dt',data).text());
			   setFieldValue( formObj.pu_trdp_tm, $('pu_trdp_tm',data).text());
			   
			   setFieldValue( formObj.pre_vsl_cd, $('pre_vsl_cd',data).text());
			   setFieldValue( formObj.pre_vsl_nm, $('pre_vsl_nm',data).text());
			   setFieldValue( formObj.pre_voy, $('pre_voy',data).text());
			   setFieldValue( formObj.ts1_port_cd, $('ts1_port_cd',data).text());
			   setFieldValue( formObj.ts1_port_nm, $('ts1_port_nm',data).text());
			   setFieldValue( formObj.ts1_etd_dt_tm, $('ts1_etd_dt_tm',data).text());
			   setFieldValue( formObj.ts1_eta_dt_tm, $('ts1_eta_dt_tm',data).text());

			   // #1821 [PATENT] B/L 옵션 항목 - 기능 확인
			   setFieldValue( formObj.wgt_disp_cd, $('wgt_disp_cd',data).text());
			   setFieldValue( formObj.h_wgt_disp_cd, $('wgt_disp_cd',data).text());
			   
			   // #1279 [UFF] Add Commodity field to OEM BL Entry
			   setFieldValue( formObj.rep_cmdt_cd, $('rep_cmdt_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_nm, $('rep_cmdt_nm',data).text());

			   // #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL
			   setFieldValue( formObj.inter_use_flag, $('inter_use_flag',data).text());
			   
			   setFieldValue( formObj.org_tp, $('org_tp',data).text());
			   setFieldValue( formObj.org_cd, $('org_cd',data).text());
			   //#3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가
			   bkg_to_bl_flag="N";
			   
			   //OFVFOUR-7725: [Gtrans] Incorrect vessel info displayed
			   setFieldValue( formObj.clean_on_board, '');
			   
			   tab3click="";
			   tab4click="";
			   tab5click="";
			   tab6click="";
			   tab7click="";
			   
			   doBtnAuthority(attr_extension);
			   setOfficeData();
			   loadPage();
			   btnLoad();
			   loadData();
			   doHideProcess();
			   if(delete_show_complete == "Y"){
			       showCompleteProcess();
			       delete_show_complete = "N";
			   }
		   },
		   error: function(){
			   doHideProcess();
			   alert("system error!");
		   }
		 });
}
function dispData(reqVal){
	alert(reqVal);
}
/*
 * jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)
 * 자동연계요건 Start
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
 * jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)
 * 자동연계요건 end
 */ 
/**
 * 화면에 기본값 Display
 */
function setDfltVal(hblArr){
	frm1.etd_dt_tm.value=hblArr[3];
	frm1.lnr_trdp_cd.value=hblArr[27];  
	frm1.lnr_trdp_nm.value=hblArr[28];  
	frm1.pol_cd.value=hblArr[6];       
	frm1.pol_nm.value=hblArr[8];       
	frm1.pod_cd.value=hblArr[9];       
	frm1.pod_nm.value=hblArr[11];       
	frm1.del_cd.value=hblArr[12];       
	frm1.del_nm.value=hblArr[14];       
	frm1.trnk_vsl_nm.value=hblArr[4];     
	frm1.trnk_voy.value=hblArr[5];     
	frm1.grs_wgt.value=hblArr[17];      
	frm1.grs_wgt_ut_cd.value=hblArr[18];
	weightChange(frm1.grs_wgt);
	frm1.meas.value=hblArr[21];         
	frm1.meas_ut_cd.value=hblArr[22];
	cbmChange(frm1.meas);
	frm1.pck_qty.value=hblArr[23];      
	frm1.pck_ut_cd.value=hblArr[24];    
}
/**
 * 화면초기화
 */
function clearScreen(){
	btnPrint.style.display='none';
	doShowProcess();
    frm1.f_cmd.value='';
    frm1.submit();
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	if(errMsg==''&&frm1.intg_bl_seq.value==''){
frm1.f_intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
frm1.intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
		// frm1.sr_no.value = docObjects[0].CellValue(1, "sv_sr_no");
		// frm1.f_sr_no.value = frm1.sr_no.value;
frm1.f_bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
frm1.ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
frm1.f_ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
// frm1.sel_ref_no.value = docObjects[0].CellValue(1, "sv_ref_no");
// frm1.ref_no.className = 'search_form-disable';
// frm1.ref_no.readOnly = true;
		// etd가 변경되었을 수 있으므로 etd 날짜를 post에 덮어쓴다.
		// LHK 20131028 왜 저장 후 etd date 를 update 하는지 알 수 없슴, post date 로직은 ETD 만
		// 적용되는 것이 아님, 저장된 post date 를 보여주도록 수정함.
		// frm1.post_dt.value = frm1.etd_dt_tm.value;
	}
	   
	// 처리후에 org_etd_dt_tm/org_eta_dt_tm 을 설정해준다.
	frm1.org_etd_dt_tm.value=frm1.etd_dt_tm.value;
	frm1.org_eta_dt_tm.value=frm1.eta_dt_tm.value;
	
	// 25559 중복 체크
	frm1.h_bl_no.value=frm1.bl_no.value;
frm1.ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
frm1.f_ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
	// LHK, 20131028 setPost_date(save_flag) 추가 비교 로직으로 인해 저장 후 org_post_dt
	// reset
	frm1.org_post_dt.value=frm1.post_dt.value;
	
	frm1.org_lnr_bkg_no.value = frm1.lnr_bkg_no.value;
	frm1.org_bkg_seq.value = frm1.bkg_seq.value;
	
	// #2068 - Document 번호 Title 에 반영
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
	if(cmdtListSheet){
		searchGrid(13);
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
	// #795 hsk work order List 조회
	
	searchGrid(11);
	
	if(jobListSheet){
		searchGrid(15);
	}
	
	//#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
	doWork('SEARCHLIST');
	
	
	// 버튼 초기화
	btnLoad();
	// "Save success! ");
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		// alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	
	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
	// 조회
	chkIntgBlModiTms("VIEW");	 
	
	sheetObj.SetBlur();	// IBSheet Focus out 처리
}
function gridAdd(objIdx){
	fnSetIBsheetInit(objIdx);   // grid가 생성되지않았으면 생성(속도개선)
 	// var intRows=docObjects[objIdx].LastRow() + 1;
	// intRows--;
	docObjects[objIdx].DataInsert(-1);
}
/**
 * 달력팝업을 호출한다.
 */
function doDisplay(doWhat, obj){
    switch(doWhat){
        case 'DATE1':    // 달력 조회 팝업 호출
        	var cal=new ComCalendar();
            cal.select(obj, 'MM-dd-yyyy');
        break;
    }
}
/**
 * 파일목록 조회시. 3번째 Sheet를 리턴함.
 */
function getSelectedFiles(){
	fnSetIBsheetInit(3);   // grid가 생성되지않았으면 생성(속도개선)
	return docObjects[3];
}
// --------------------------------------------------------------------------------------------------------------
// Tab 설정
// --------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 
	if(comIBSheetWaitChk()== false){ return;}
	
	/*
	 * jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서
	 * Refresh.
	 */
	frm1.f_isNumSep.value = isNumSep;	
	
	var tabObjs = document.getElementsByName('tabLayer');
    if( isNumSep == "01" ) {
    
    	currTab = isNumSep;	// 탭상태저장
    	
        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';

        // comSheetObject('sheet2');
        fnSetIBsheetInit(1);   // grid가 생성되지않았으면 생성(속도개선)
        
	    // 스크롤을 하단으로 이동한다.
		// document.body.scrollTop = document.body.scrollHeight;

    // Container List 목록
    }else if( isNumSep == "02" ) {
    	currTab = isNumSep;	// 탭상태저장
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "inline";
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
        
        // comSheetObject('sheet4');comSheetObject('sheet14');
        // comSheetObject('sheet13');
        fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(11);   // grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(10);   // grid가 생성되지않았으면 생성(속도개선)
        
        // 스크롤을 하단으로 이동한다.
		// document.body.scrollTop = document.body.scrollHeight;
        if(tab3click == ""){
        	tab3click = "Y";
    		doWork('SEARCH_CNTR');
        }

        goInnerTabSelect(01);


    // Mark Description 탭
    }else if( isNumSep == "03" ) {
    	currTab = isNumSep;	// 탭상태저장
    	
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = 'inline';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
      // #2081 [PATENT] OEM Container Information 버튼 옵션추가
        if(tab3click == ""){
        	tab3click = "Y";
    		doWork('SEARCH_CNTR');
        }
        
        // 스크롤을 하단으로 이동한다.
		// document.body.scrollTop = document.body.scrollHeight;
        
    }else if( isNumSep == "04" ) {
    	currTab = isNumSep;	// 탭상태저장
    	
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = "none";
        tabObjs[3].style.display = 'inline';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
        
        // comSheetObject('sheet7');comSheetObject('sheet9');comSheetObject('sheet8');
        fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
        
        // BL_COPY
        var copy_bl_seq = frm1.copy_bl_seq.value;
		if (copy_bl_seq == "") {
			
			if(frm1.intg_bl_seq.value != "" && frm1.org_bkg_seq.value == frm1.bkg_seq.value){
				// LHK 20130812 tab Click 이후 컨테이너 저장 후 다시 클릭 할 경우, 컨테이너를 재조회 한다.
				// Unit 에 해당하는 Cntr type Size 를 다시 가져옴.
				searchGrid(6);
			}

			if(tab4click== ""){
		        tab4click= "Y";
		        doWork('SEARCH_FRT');
	    	}
		}
        // #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
    	// Work Order
     }else if( isNumSep == "05" ) {
    	currTab = isNumSep;	// 탭상태저장

        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = "none";
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'inline';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
    	
        // comSheetObject('sheet12');
        fnSetIBsheetInit(9);   // grid가 생성되지않았으면 생성(속도개선)
        
    	if(tab7click== ""){
    		tab7click= "Y";
    		doWork('SEARCH_WO');
    	}
    // Shipping Document 탭
    }else if( isNumSep == "06" ) {
    	currTab = isNumSep;	// 탭상태저장
    	
    	tabObjs[0].style.display = 'none';
    	tabObjs[1].style.display = 'none';
    	tabObjs[2].style.display = 'none';
    	tabObjs[3].style.display = 'none';
    	tabObjs[4].style.display = 'none';
    	tabObjs[5].style.display = 'inline';
    	tabObjs[6].style.display = 'none';
    	
    	// comSheetObject('sheet3');comSheetObject('sheet10');
    	fnSetIBsheetInit(3);   // grid가 생성되지않았으면 생성(속도개선)
    	fnSetIBsheetInit(7);   // grid가 생성되지않았으면 생성(속도개선)
    	
        // 스크롤을 하단으로 이동한다.
		// document.body.scrollTop = document.body.scrollHeight;
        if(tab5click == ""){
        	tab5click = "Y";
        	doWork('SEARCH_DOC');
        }
    
    /* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 - add status tab */
    // }
    }else if( isNumSep == "07" ) {
		currTab = isNumSep;	// 탭상태저장
		
	    tabObjs[0].style.display = 'none';
	    tabObjs[1].style.display = 'none';
	    tabObjs[2].style.display = 'none';
	    tabObjs[3].style.display = 'none';
	    tabObjs[4].style.display = 'none';
	    tabObjs[5].style.display = 'none';
	    tabObjs[6].style.display = 'inline';
	    
	    // comSheetObject('sheet11');
	    fnSetIBsheetInit(8);   // grid가 생성되지않았으면 생성(속도개선)
	    fnSetIBsheetInit(12);
	    
	    if(tab6click== ""){
	        tab6click= "Y";
	        doWork('SEARCH_JB');
	
		}
	}  
    var index = parseInt(isNumSep);
	var count = 0;
	$('#ulTab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});
}

function goInnerTabSelect(tabNo) {
	
	var innerTabObjs = document.getElementsByName('innerTabLayer');
    if( tabNo == "01" ) {
    	innerTabObjs[0].style.display = 'inline';
    	innerTabObjs[1].style.display = 'none';
    }else if( tabNo == "02" ) {
    	innerTabObjs[0].style.display = 'none';
    	innerTabObjs[1].style.display = "inline";
    	syncCntrToVgm();
    }  
    var index = parseInt(tabNo);
    var count = 0;
	$('#ulInnerTab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});

}
// --------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;

/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
var isRun = false;
var obl_decimal_len = 0;
var bkg_new_hbl_no_flg = "";

//#2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가
var bl_inv_auto_creation ="";


function loadPage() {
	//OFVFOUR-7038 [Zimex] Decimal length for Weight & Measurement
	var opt_key = "OEM_OEH_REMOVE_FUNC_COMMA";
	ajaxSendPost(chkFuncComma, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//OFVFOUR-7707[Matrix] Restriction to block creating HBL in case the credit of customer exceeds credit limit
	var com_cd = "C330";
	var cd_val = "OEM";
	ajaxSendPost(chkCredit, "reqVal", "&goWhere=aj&bcKey=searchCmmDtlCd&com_cd="+com_cd+"&cd_val="+cd_val, "./GateServlet.gsl");
	var opt_key = "INST_PROFIT";
	ajaxSendPost(setExpressTpCdVal, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	var opt_key = "OBL_DECIMAL_LEN";
	ajaxSendPost(setDecimalLen, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	//#3572 Japan Trust OEM/OEH Entry Fright Default
	var opt_key = "OE_DFLT_FRT_CC";
	ajaxSendPost(setFreight, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");	
	/*
	 * #2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB
	 * No., HB/L No생성 로직
	 */
	/*var opt_key = "BKG_NEW_HBL_NO_FLG";
	ajaxSendPost(setBkgNoFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");*/
	
	
	/* #2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가 */
	var opt_key = "BL_INV_AUTO_CREATION";
	ajaxSendPost(setBlInvAutoCreation, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	//#6642 [JAPT] Ex. Rate Date Criteria Change request
    var opt_key = "BL_EXPORT_EX_DT";
    ajaxSendPost(setExDate, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	/*
	 * 속도개선 주석처리 for(var i=0;!isRun && i<docObjects.length;i++){
	 * //console.log(docObjects[i].id + ' / ' + i);
	 * comConfigSheet(docObjects[i], SYSTEM_FIS); initSheet(docObjects[i],i+1);
	 * comEndConfigSheet(docObjects[i]); if(i == docObjects.length - 1){ isRun =
	 * true; } }
	 */
    
    
    if(pps_use_flg != "Y"){
    	getObj("btnPierpass").style.display = "none";
    }
    
    
    //#2504 [PATENT]Debit Note & AP for billing code based invoices
    if(bl_inv_auto_creation == "Y"){
    	getObj("spanARprint").style.display = "inline";
    	getObj("spanAPprint").style.display = "inline";
    }
    
    checkBoxSetting();
    frm1.pck_qty.value=doMoneyFmt(Number(frm1.pck_qty.value).toFixed(0));
    frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value.replace(/,/gi, "")).toFixed(obl_decimal_len));
    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value.replace(/,/gi, "")).toFixed(obl_decimal_len));
    frm1.mk_grs_wgt.value=doMoneyFmt(Number(frm1.mk_grs_wgt.value.replace(/,/gi, "")).toFixed(obl_decimal_len));
    frm1.mk_grs_wgt1.value=doMoneyFmt(Number(frm1.mk_grs_wgt1.value.replace(/,/gi, "")).toFixed(obl_decimal_len));
    
    frm1.meas.value=doMoneyFmt(Number(frm1.meas.value).toFixed(obl_decimal_len));
    frm1.meas1.value=doMoneyFmt(Number(frm1.meas1.value).toFixed(obl_decimal_len));
    frm1.ctrb_mgn.value=doMoneyFmt(Number(frm1.ctrb_mgn.value).toFixed(2));
    // 2011.12.28 BL Type에서 Third Party 뺄 것
    for(var i=0 ; i<frm1.hbl_tp_cd.length ; i++){
    	if(frm1.hbl_tp_cd.options[i].value == 'TP'){
    		frm1.hbl_tp_cd.options[i]=null;
    	}
    }
    //#3524 - 2
    if(frm1.intg_bl_seq.value==''||bkg_to_bl_flag=="Y"){
    	// collect로 셋팅
    	// frm1.frt_term_cd.value = 'CC';
    	// AUTO 표시
    	
    	/*
    	 * #2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB
    	 * No., HB/L No생성 로직
    	 */
    	
    	//3524
    	/*if(bkg_to_bl_flag=="Y" && bkg_new_hbl_no_flg == "Y") {
    		if(frm1.intg_bl_seq.value !=""){
    			frm1.ref_no.value="AUTO";
    		} else{
    			//frm1.ref_no.value = frm1.bkg_no.value;// bkg_no	
    		}
    			
    	}else if( frm1.bkg_no.value != "" && bkg_new_hbl_no_flg == "Y" ){
    		//frm1.ref_no.value = frm1.bkg_no.value;// bkg_no
    	}else{
    		frm1.ref_no.value="AUTO";
    	}*/
    	/*[#4650] [JH]Booking No and MBL Filing No are same (by Duc.Nguyen)*/
    	frm1.ref_no.value="AUTO";
    	
    	/* oyh 2013.09.04 #20421 : [BINEX] B/L type의 default를 Express에 Y로 */
    	/* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting */
       	// frm1.obl_tp_cd.value = "E";
    	// frm1.pck_ut_cd.value = "CT";
    	//#6792 [AIR POWER] SETTNG UP PACKAGE DEFAULT FOR OCEAN ENTRY SCREEN
		if(frm1.copy_bl_seq.value == "" && frm1.bkg_seq.value == ''){
    		setPckUtCd();
    	}
    	
    	// #1821 [PATENT] B/L 옵션 항목 - 기능 확인
    	if(user_ofc_cnt_cd=="US"){
    		frm1.wgt_disp_cd.value='KL';
    	}else{
    		frm1.wgt_disp_cd.value='K';
    	}
    	
    	// #4853 [Binex] filing no duplicated error
    	frm1.intg_bl_seq.value="";
    	
    }
	/*
	 * jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서
	 * Refresh.
	 */
	goTabSelect(frm1.f_isNumSep.value);
    if(frm1.bl_sts_cd.value=='HO' || frm1.bl_sts_cd.value=='HF'){
    	// Accounting Closed. You can only edit following fields.\nContainer
		// Info. / B/L Body / Vessel name & voyage.
    	alert(getLabel('SEA_COM_ALT011'));
    }
    // blTpChange(frm1.hbl_tp_cd.value);
    // 단축키추가.
    setShortcut();
    
    /* 2016-12-12 자동완성 기능 추가 S */
    fnSetAutocomplete('shpr_trdp_nm_id'	, 'LINER_POPLIST', 'shipper', 'O'); 		// Shipper
    fnSetAutocomplete('cnee_trdp_nm'	, 'LINER_POPLIST', 'consignee', 'O'); 	// Consignee
    fnSetAutocomplete('ntfy_trdp_nm'	, 'LINER_POPLIST', 'notify', 'O'); 		// Notify
    fnSetAutocomplete('agent_trdp_nm'	, 'LINER_POPLIST', 'agent', 'O'); 		// Forwarding
																				// Agent
    fnSetAutocomplete('prnr_trdp_nm2'	, 'LINER_POPLIST', 'partner2', 'O'); 	// Triangle
																				// Agent
    fnSetAutocomplete('prnr_trdp_nm'	, 'LINER_POPLIST', 'partner', 'O'); 		// Destination
																					// Agent
    fnSetAutocomplete('carr_trdp_nm'	, 'LINER_POPLIST', 'carr', 'O'); 		// Billing
																				// Carrier
    fnSetAutocomplete('rcv_wh_nm'		, 'LINER_POPLIST', 'rcv', 'O'); 			// Delivery
																					// To/Pier
    fnSetAutocomplete('pu_trdp_nm'		, 'LINER_POPLIST', 'pu', 'O'); 			// Empty
																				// Pickup
    
    fnSetAutocomplete('act_shpr_trdp_nm', 'LINER_POPLIST', 'ashipper', 'O'); //Customer
    
    fnSetAutocomplete('lnr_trdp_nm'		, 'LINER_POPLIST_MS', 'liner', 'O'); 	// Carrier
																				// MS
    
    fnSetAutocomplete('por_nm'			, 'LOCATION_POPLIST', 'por', 'O');		// POR
    fnSetAutocomplete('pol_nm'			, 'LOCATION_POPLIST', 'pol', 'O');		// POL
    fnSetAutocomplete('pod_nm'			, 'LOCATION_POPLIST', 'pod', 'O');		// POD
    fnSetAutocomplete('del_nm'			, 'LOCATION_POPLIST', 'del', 'O');		// DEL
    fnSetAutocomplete('fnl_dest_loc_nm'	, 'LOCATION_POPLIST', 'dest', 'O');		// Final
																				// Destination
    //#3873 [JAPT]  T/S popup , validation and sync.
    fnSetAutocomplete('trnk_vsl_nm'			, 'VESSEL_POPLIST', 'trunkvessel');	//VSL
    
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
	
	//#5190 [BINEX] AFTER V470.06 RELEASE, M&D SHOWING WRONG INFO AFTER SAVE
	//cbmChange(formObj.meas);

	fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성
	// 사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[2], false,"fnRestoreGridSetEnd"); // Tab
																												// 2
    fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
    
    //#2586 [BNX US] COD, CREDIT HOLD ACCOUNTS NO WARNING
    if(frm1.intg_bl_seq.value != ''){
//    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, false) : "";
//    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, false) : "";
//    	(formObj.ntfy_trdp_cd.value != "") ? chkCodOnLoad("notify", formObj.ntfy_trdp_cd.value, false) : "";
//    	(formObj.agent_trdp_cd.value != "") ? chkCodOnLoad("agent", formObj.agent_trdp_cd.value, false) : "";
//    	(formObj.act_shpr_trdp_cd.value != "") ? chkCodOnLoad("ashipper", formObj.act_shpr_trdp_cd.value, false) : "";
//    	(formObj.prnr_trdp_cd2.value != "") ? chkCodOnLoad("partner2", formObj.prnr_trdp_cd2.value, false) : "";
//    	(formObj.prnr_trdp_cd.value != "") ? chkCodOnLoad("partner", formObj.prnr_trdp_cd.value, false) : "";
//    	(formObj.lnr_trdp_cd.value != "") ? chkCodOnLoad("liner", formObj.lnr_trdp_cd.value, false) : "";
//    	(formObj.carr_trdp_cd.value != "") ? chkCodOnLoad("carr", formObj.carr_trdp_cd.value, false) : "";
//    	(formObj.rcv_wh_cd.value != "") ? chkCodOnLoad("rcv", formObj.rcv_wh_cd.value, false) : "";
//    	(formObj.pu_trdp_cd.value != "") ? chkCodOnLoad("pu", formObj.pu_trdp_cd.value, false) : "";
    	
    	// 중복 조회 방지
        if(tab3click == ""){
        	tab3click = "Y";
    		doWork('SEARCH_CNTR');
        }
        
    }else{
    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, true) : "";
    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, true) : "";
    	(formObj.ntfy_trdp_cd.value != "") ? chkCodOnLoad("notify", formObj.ntfy_trdp_cd.value, true) : "";
    	(formObj.agent_trdp_cd.value != "") ? chkCodOnLoad("agent", formObj.agent_trdp_cd.value, true) : "";
    	(formObj.act_shpr_trdp_cd.value != "") ? chkCodOnLoad("ashipper", formObj.act_shpr_trdp_cd.value, true) : "";
    	(formObj.prnr_trdp_cd2.value != "") ? chkCodOnLoad("partner2", formObj.prnr_trdp_cd2.value, true) : "";
    	(formObj.prnr_trdp_cd.value != "") ? chkCodOnLoad("partner", formObj.prnr_trdp_cd.value, true) : "";
    	(formObj.lnr_trdp_cd.value != "") ? chkCodOnLoad("liner", formObj.lnr_trdp_cd.value, true) : "";
    	(formObj.carr_trdp_cd.value != "") ? chkCodOnLoad("carr", formObj.carr_trdp_cd.value, true) : "";
    	(formObj.rcv_wh_cd.value != "") ? chkCodOnLoad("rcv", formObj.rcv_wh_cd.value, true) : "";
    	(formObj.pu_trdp_cd.value != "") ? chkCodOnLoad("pu", formObj.pu_trdp_cd.value, true) : "";
    }
    
    formObj.ib_org_type.value = formObj.org_tp.value;
    if(formObj.org_tp.value == 'C'){
    	document.getElementById('ib_org_cnt').style.display='';
    	document.getElementById('ib_org_ste').style.display='none';
    	formObj.ib_org_ste_cd.value = '';
    	formObj.ib_org_ste_nm.value = '';
    	formObj.ib_org_cnt_cd.value = formObj.org_cd.value;
    	codeNameAction2('org_country',formObj.ib_org_cnt_cd, 'onBlur')
    }
    if(formObj.org_tp.value == 'S'){
    	document.getElementById('ib_org_cnt').style.display='none';
    	document.getElementById('ib_org_ste').style.display='';
    	formObj.ib_org_cnt_cd.value = '';
    	formObj.ib_org_cnt_nm.value = '';
    	formObj.ib_org_ste_cd.value = formObj.org_cd.value;
    	codeNameAction2('org_state',formObj.ib_org_ste_cd, 'onBlur')
    }
	//OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
	if (eblfn_flg != 'Y') {
		formObj.ref_no.disabled = true;
	}
	fnbtnCtl();
	//OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN
	ajaxSendPost(setUserTeamInfo, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=opr_team&issued_by="+formObj.opr_usrid.value, "./GateServlet.gsl");
	
	//OFVFOUR-7038 [Zimex] Decimal length for Weight & Measurement
	if(oemOehRemoveFuncComma == "Y"){		
		document.getElementsByName('mk_grs_wgt')[0].setAttribute('onchange','weightChange(this);');
		document.getElementsByName('mk_grs_wgt1')[0].setAttribute('onchange','weightChange(this);');
		document.getElementsByName('mk_meas')[0].setAttribute('onchange','cbmChange(this);');
		document.getElementsByName('mk_meas1')[0].setAttribute('onchange','cbmChange(this);');
	}
}
function setShortcut(){
	
}
function fnRestoreGridSetEnd(){
	
}
/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
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
		/* eVGM */
		case "sheet13":
			docObjects[10]=sheet_obj;
			break;	
		// Item
		case "sheet14":
			docObjects[11]=sheet_obj;
			break;
		case "sheet15":
			docObjects[12]=sheet_obj;
			break;
	}
}
/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */

function initSheet(sheetObj,sheetNo) {
// MULTI_CURR_FLAG = "Y";
	
	
    switch(sheetNo) {
		case 1:     
			
		    with(sheetObj){
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SEE_BMD_0040_HDR1'), Align:"Center"} ];
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
		case 2:     // HBL List
			// #4527 언제인지는 모르겠지만 속도개선한다고 loadpage전에 initsheet를 하기 때문에 여러가지 옵션 값들이 셋팅되지 않음.
			var opt_key = "OBL_DECIMAL_LEN";
			ajaxSendPost(setDecimalLen, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
			
		    with(sheetObj){
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('SEE_BMD_0040_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",     Hidden:0,  Width:35,   Align:"Center",  ColMerge:0,   SaveName:"seq" },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_bkg_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"hbl_bl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"hbl_act_shipper",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_shpr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_cnee_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_prnr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_lnr_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"hbl_ntfy_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_trnk_vsl",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"hbl_trnk_voy",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_por_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"hbl_obrd_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_del_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_del_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_del_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_rep_cmdt_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_rep_cmdt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pck_ut_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pck_ut_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             // #4527 [Great Luck] OEM weight discrepancy : obl_decimal_len 적용
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_meas",           KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_meas1",          KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_meas_ut_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             // #4527 [Great Luck] OEM weight discrepancy : obl_decimal_len 적용
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_grs_wgt",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_grs_wgt1",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:0 },
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
		      // InitViewFormat(0, "hbl_obrd_dt_tm", "MM\\-dd\\-yyyy");//날짜
				// 포맷을 월/일/년 으로 설정
		      SetSheetHeight(150);
		      // sheetObj.SetFocusAfterProcess(0);
           }                                                      
	    break;
		case 3:		// Container List 그리드
		    with(sheetObj){
			
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SEE_BMD_HDR4-3'), Align:"Center"} ];
		      InitHeaders(headers, info);

		      var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"Del" },
		             {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"conls_ibflag" },
		             {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"Seq",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"soc_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
		             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"cntr_tpsz_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"seal_no1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"seal_no2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"seal_no3",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:0, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"cntr_ref_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"cgo_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
		             {Type:"Combo",     Hidden:0, Width:90,   Align:"Left",    ColMerge:0,   SaveName:"cgo_pck_ut",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:16 },
		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt1",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:16 },
		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:17 },
		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:17 },
		             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"vol_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cntr_sprl_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_sprl_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },

		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",    ColMerge:0,   SaveName:"rc_flg",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             
		             {Type:"Float",     Hidden:0, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"temp_val",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"temp_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
//		             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"vent_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },

		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",    ColMerge:0,   SaveName:"mgset_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",    ColMerge:0,   SaveName:"ca_flg",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",    ColMerge:0,   SaveName:"vent_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },				             
		             {Type:"Float",     Hidden:0, Width:60,   Align:"Right",     ColMerge:0,   SaveName:"air_flow",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",    ColMerge:0,   SaveName:"air_flow_unit",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:2,   InsertEdit:1 },
		             {Type:"Float",     Hidden:0, Width:60,   Align:"Right",     ColMerge:0,   SaveName:"humid",      		  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5, AcceptKeys:"N" },
		             
		             
		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"dg_gds_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"cntr_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		             {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:0,   SaveName:"trkg_fee_txt",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
		             //#2107 [PATENT] HB/L의 FCL Shipmode 시 SAY 항목 표시 보완
		             {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"prt_cgo_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N"},
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_list_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vol_tot",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_cntr_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             // #1543 [LBS] Container Type/Size Reefer, Ventill 항목 관리
		             {Type:"Text",      Hidden:1,  Width:0,     Align:"Center",  ColMerge:0,   SaveName:"temp_flg",       			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:1,  Width:0,     Align:"Center",  ColMerge:0,   SaveName:"vent_flg",       			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             
		             // VGM 정보
		             {Type:"Text",     Hidden:1,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"seal_tp1",         	 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",     Hidden:1,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"seal_tp2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",     Hidden:1,  Width:90,    Align:"Right",   ColMerge:0,   SaveName:"vgm_cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		             {Type:"Text",     Hidden:1,  Width:70,    Align:"Left",    ColMerge:0,   SaveName:"vgm_cgo_wgt_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Date",      Hidden:1,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"vgm_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Date",      Hidden:1,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"vgm_tm",      KeyField:0,   CalcLogic:"",   Format:"Hm",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",     Hidden:1,  Width:80,    Align:"Left",    ColMerge:0,   SaveName:"vgm_method",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",     Hidden:1,  Width:80,    Align:"Left",    ColMerge:0,   SaveName:"vgm_cntr_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text", 		Hidden:1,  Width:60,    Align:"Left",    ColMerge:1,   SaveName:"vgm_spc_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:1,  Width:120,   Align:"Left",    ColMerge:1,   SaveName:"vgm_spc_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		             {Type:"Text",      Hidden:1,  Width:120,   Align:"Left",    ColMerge:1,   SaveName:"vgm_spc_trdp_pic",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		             {Type:"Text", 		Hidden:1,  Width:60,    Align:"Left",    ColMerge:1,   SaveName:"vgm_am_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	             {Type:"Text",      Hidden:1,  Width:120,   Align:"Left",    ColMerge:1,   SaveName:"vgm_am_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	             {Type:"Text",      Hidden:1,  Width:120,   Align:"Left",    ColMerge:1,   SaveName:"vgm_am_trdp_pic",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	             {Type:"Text",      Hidden:1,  Width:0,     Align:"Center",  ColMerge:0,   SaveName:"vgm_seq",       			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
		             
		             
		             ];
		       
		      InitColumns(cols);

		      SetCountPosition(0);
		      SetEditable(1);
              SetColProperty('cgo_pck_ut', {ComboText:PCKCD1, ComboCode:PCKCD2, DefaultValue:"CT"} );
              SetColProperty('soc_flg', {ComboText:LSTCD1, ComboCode:LSTCD2} );
  			  SetColProperty('temp_cd', {ComboText:'|'+TEMPCD1, ComboCode:'|'+TEMPCD2} );
  			  SetColProperty('vent_cd', {ComboText:'|'+VENTCD1, ComboCode:'|'+VENTCD2} );
  			  SetColProperty('cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
  			  SetColProperty('dg_gds_flg', {ComboText:'N|Y', ComboCode:'N|Y'} );
  			  
              SetColProperty('rc_flg', {ComboText:'|Y|N', ComboCode:'|Y|N'} );
              SetColProperty('mgset_flg', {ComboText:'|Y|N', ComboCode:'|Y|N'} );
              SetColProperty('ca_flg', {ComboText:'|Y|N', ComboCode:'|Y|N'} );
              SetColProperty('air_flow_unit', {ComboText:'|CBM|CFT', ComboCode:'|CBM|CFT'} );
  			  
  			  SetColProperty(0 ,"cntr_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
  			  SetColProperty(0 ,"seal_no1" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
  			  SetColProperty(0 ,"seal_no2" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
  			  SetColProperty(0 ,"seal_no3" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
  			  SetColProperty(0 ,"cntr_ref_no" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
  			  
  			  //#3076 [UCB] AFTER V450.04, CONTAINER TAB COPY & PASTE FUNCTION
  			  //SetActionMenu("Header Setting Save|Header Setting Reset");
  			  SetSheetHeight(250);
  			  
  			  // sheetObj.SetFocusAfterProcess(0);
		}                 
		break;
	
	    case 4:					// 첨부파일
	        with(sheetObj){
	    		SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0, TabStop:0 } );

	    		var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    		var headers = [ { Text:getLabel('SEE_BMD_0040_HDR4'), Align:"Center"} ];
	    		InitHeaders(headers, info);

	    		var cols = [ {Type:"Status",    Hidden:1, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
	             {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"Del",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
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
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq_d",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	       
	    		InitColumns(cols);

	    		SetCountPosition(0);
	    		SetEditable(1);
	    		SetImageList(0,APP_PATH+"/web/img/button/bt_img.gif");
	    		SetImageList(1,APP_PATH+"/web/img/button/bt_pdf.gif");
	    		sheetObj.SetDataLinkMouse("palt_doc_nm",1);
	    		sheetObj.SetDataLinkMouse("palt_doc_img_url",1);
	    		sheetObj.SetDataLinkMouse("palt_doc_pdf_url",1);
	    		// InitViewFormat(0, "rgst_tms", "MM\\-dd\\-yyyy");//날짜 포맷을
				// 월/일/년 으로 설정
	    		SetSheetHeight(400);
	      }


                        
	   break;
	    case 5:      // Selling/Debit 탭부분 init -- AR 부분
	    	if(MULTI_CURR_FLAG == "Y"){
	    		with(sheetObj){

	    		      var cnt=0;

	    		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

	    		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    		      var headers = [ { Text:getLabel('SEE_BMD_0040_HDR5_3'), Align:"Center"},
	    		                  { Text:getLabel('SEE_BMD_0040_HDR5_4'), Align:"Center"} ];
	    		      InitHeaders(headers, info);

	    		      var cols = [
	    		             {Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	    		             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	    		             //OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
	    		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	    		             
	    		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	    		             {Type:"Text",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	    		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    		             
	    		             // #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
// {Type:"Float", Hidden:1, Width:23, Align:"Right", ColMerge:1,
// SaveName:"fr_vat_rt", KeyField:0, CalcLogic:"", Format:"Float", PointCount:2,
// UpdateEdit:1, InsertEdit:1, EditLen:5 },
	    		             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    		             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    		             
	    		             // #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
// {Type:"PopupEdit", Hidden:0, Width:70, Align:"Right", ColMerge:1,
// SaveName:"fr_inv_xcrt", KeyField:0, CalcLogic:"", Format:"Float",
// PointCount:0, UpdateEdit:1, InsertEdit:1, EditLen:10 },
	    		             {Type:"Float",     Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    		             {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	    		             
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
	        with(sheetObj){
	    	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1, TabStop:0 } );

	    	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    	      var headers = [ { Text:getLabel('SEE_BMD_0040_HDR5_1'), Align:"Center"},
	    	                  { Text:getLabel('SEE_BMD_0040_HDR5_2'), Align:"Center"} ];
	    	      InitHeaders(headers, info);

	    	var cols = [ 
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		             {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	    	             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	    	             //OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
	    	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	    	             
	    	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    	             
	    	             // #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
// {Type:"Float", Hidden:1, Width:23, Align:"Right", ColMerge:1,
// SaveName:"fr_vat_rt", KeyField:0, CalcLogic:"", Format:"Float", PointCount:2,
// UpdateEdit:1, InsertEdit:1, EditLen:5 },
	    	             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    	             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    	             
	    	           // #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
// {Type:"Float", Hidden:1, Width:50, Align:"Right", ColMerge:1,
// SaveName:"fr_inv_xcrt", KeyField:0, CalcLogic:"", Format:"Float",
// PointCount:4, UpdateEdit:1, InsertEdit:1, EditLen:10 },
	    	             {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    	             {Type:"Image",     Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	    	             
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    	             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    	             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
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
	  	    	SetColProperty(0 ,"fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
	  	    	SetColProperty(0 ,"fr_inv_curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
	  	    	
	  	    	 SetSheetHeight(165);
	  	    	 
	  	    	InitComboNoMatchText(1,"",1); 
	  	    	SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
	  	    	
             	  //#2504 [PATENT]Debit Note & AP for billing code based invoices
             	  if(bl_inv_auto_creation == "Y"){
             		 SetColHidden("fr_cmb_inv_no", 0);
             	  }
             	  
	    	      }
	    	}
	    	break;
       // Freight
       case 6:      // Buying/Credit 탭부분 init -- AP 부분
    	   if(MULTI_CURR_FLAG == "Y"){
    		    with(sheetObj){
    		        var cnt=0;
    		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

    		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    		        var headers = [ { Text:getLabel('SEE_BMD_0040_HDR6_3'), Align:"Center"},
    		                    { Text:getLabel('SEE_BMD_0040_HDR6_4'), Align:"Center"} ];
    		        InitHeaders(headers, info);
    		        var cols = [
    		  					{Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		  					{Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    		  					{Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    		  					//OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
    		  					{Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    		  					
    		  					{Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  					{Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		  					{Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    		  					{Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    		  					{Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		  					{Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    		  					
    		  					// #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
// {Type:"Float", Hidden:1, Width:23, Align:"Right", ColMerge:1,
// SaveName:"b_fr_vat_rt", KeyField:0, CalcLogic:"", Format:"Float",
// PointCount:2, UpdateEdit:1, InsertEdit:1, EditLen:5 },
    		  					{Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    		  					
    		  					{Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    		  					{Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		  					
    		  					
    		  					// #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
// {Type:"PopupEdit", Hidden:0, Width:70, Align:"Right", ColMerge:1,
// SaveName:"b_fr_inv_xcrt", KeyField:0, CalcLogic:"", Format:"Float",
// PointCount:4, UpdateEdit:1, InsertEdit:1, EditLen:10 },
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
    		  					{Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
               	              //<!-- #2504 [PATENT]Debit Note & AP for billing code based invoices -->
               	                {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cmb_inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },    		  					
    		  					{Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field03",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
    		         
    		        InitColumns(cols);
    		        SetColProperty('b_fr_frt_cd', {ComboText:APFRTCD2, ComboCode:APFRTCD1} );
    		        SetColProperty('b_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    		        SetColProperty('b_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
    		        SetColProperty('b_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
    		        SetColProperty('b_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    		        SetColProperty('b_fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    		        SetColProperty(0 ,"b_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
		    		SetEditable(1);
    		        SetHeaderRowHeight(20 );
    		        SetHeaderRowHeight(21);
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
    	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1, TabStop:0 } );

    	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	            var headers = [ { Text:getLabel('SEE_BMD_0040_HDR6_1'), Align:"Center"},
    	                      { Text:getLabel('SEE_BMD_0040_HDR6_2'), Align:"Center"} ];
    	            InitHeaders(headers, info);

    	            var cols = [
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	                {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	                //OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
    	                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },    	                
    	                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",     Hidden:0,  Width:40,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	                
// #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
// {Type:"Float", Hidden:1, Width:23, Align:"Right", ColMerge:1,
// SaveName:"b_fr_vat_rt", KeyField:0, CalcLogic:"", Format:"Float",
// PointCount:2, UpdateEdit:1, InsertEdit:1, EditLen:5 },
    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	                
    	                
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                
// #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
// {Type:"Float", Hidden:1, Width:50, Align:"Right", ColMerge:1,
// SaveName:"b_fr_inv_xcrt", KeyField:0, CalcLogic:"", Format:"Float",
// PointCount:4, UpdateEdit:1, InsertEdit:1, EditLen:10 },
    	                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Image",     Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	                
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
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
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
    	     	   SetSheetHeight(165);
    	     	  InitComboNoMatchText(1,"",1); 
    	     	 SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
    	     	 
              	  //#2504 [PATENT]Debit Note & AP for billing code based invoices
              	  if(bl_inv_auto_creation == "Y"){
              		 SetColHidden("b_fr_cmb_inv_no", 0);
              	  }
              	  
    	            }
    	   }
        break;
       case 7:      // Buying/Credit 탭부분 init
    	   
    	   if(MULTI_CURR_FLAG == "Y"){
    		  with(sheetObj){
    	      var cnt=0;
    	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1 } );

    	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	      var headers = [ { Text:getLabel('SEE_BMD_0040_HDR7_3'), Align:"Center"},
    	                  { Text:getLabel('SEE_BMD_0040_HDR7_4'), Align:"Center"} ];
    	      InitHeaders(headers, info);
    	      var cols = [
    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	             {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	             //OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
    	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	             
    	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	             {Type:"Float",     Hidden:1,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    	             
// #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
// {Type:"Float", Hidden:1, Width:23, Align:"Right", ColMerge:1,
// SaveName:"dc_fr_vat_rt", KeyField:0, CalcLogic:"", Format:"Float",
// PointCount:2, UpdateEdit:1, InsertEdit:1 },
    	             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1 },
    	             
    	             
    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	             
// #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
// {Type:"PopupEdit", Hidden:0, Width:70, Align:"Right", ColMerge:1,
// SaveName:"dc_fr_inv_xcrt", KeyField:0, CalcLogic:"", Format:"Float",
// PointCount:4, UpdateEdit:1, InsertEdit:1, EditLen:10 },
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
    	      SetColProperty('dc_fr_frt_cd', {ComboText:DCFRTCD2, ComboCode:DCFRTCD1} );
    	      SetColProperty('dc_fr_sell_buy_tp_cd', {ComboText:"Debit|Credit", ComboCode:"D|C"} );
    	      SetColProperty('dc_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    	      SetColProperty('dc_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
    	      SetColProperty('dc_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
    	      SetColProperty('dc_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    	      SetColProperty('dc_fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
    	      SetColProperty(0 ,"dc_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
    	      SetEditable(1);
    	      SetHeaderRowHeight(20 );
    	      SetHeaderRowHeight(21);
    	      SetSheetHeight(150);
    	      InitComboNoMatchText(1,"",1); 
    	      SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
    		  }
    		  }else{
    			  with(sheetObj){
    	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1, TabStop:0 } );

    	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	         var headers = [ { Text:getLabel('SEE_BMD_0040_HDR7_1'), Align:"Center"},
    	                     { Text:getLabel('SEE_BMD_0040_HDR7_2'), Align:"Center"} ];
    	         InitHeaders(headers, info);

    	         var cols = [
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	                {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	                //OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
    	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	                
    	                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",     Hidden:1,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                {Type:"Image",     Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",   ColMerge:1,   SaveName:"dc_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
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
	     	   SetColProperty(0 ,"dc_fr_inv_curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
        	           SetSheetHeight(165);
        	           
        	           InitComboNoMatchText(1,"",1);
        	           SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
        	           
    	         }
    		  }
        break;
       case 8:      // TP/SZ init
    	      with(sheetObj){

        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

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
       case 9:      // HISTORY
    	    with(sheetObj){
          
         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel("SEE_BMD_HDR9"), Align:"Center"} ];
         InitHeaders(headers, info);

         var cols = [ {Type:"Float",     Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cng_seq" },
                {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"itm_lbl" },
                {Type:"Text",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"bfr_cng_txt" },
                {Type:"Text",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"bfr_cng_txt" },
                {Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"rgst_usrid" },
                {Type:"Date",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"rgst_tms", Format:"YmdHms" } ];
          
         InitColumns(cols);

         SetEditable(0);
         SetSheetHeight(400);
               }

                        
		  break;
		// #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
	   // Pickup/WorkOrder 그리드
        case 10:
            with(sheetObj){
        	
        	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

        	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	            var headers = [ { Text:getLabel('SEE_BMD_0020_HDR8_2'), Align:"Center"} ];
        	            InitHeaders(headers, info);

        	            var cols = [ {Type:"Text",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"wo_seq" },
        	             {Type:"Text",     Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"wo_no" },
        	             {Type:"Combo",     Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"wo_status" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"pickup_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"delivery_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"return_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"trucker_trdp_nm" },
        	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"wo_grs_wgt", Format:"Float",       PointCount:obl_decimal_len } ];
        	             
        	            InitColumns(cols);

        	            SetCountPosition(0);
        	            SetEditable(0);
        	            SetColProperty('wo_status', {ComboText:"SAVED|ISSUED", ComboCode:"A|B"} );
    	                SetSheetHeight(400);
        	                                    }

                                    
        break;
        
    	
		// eVGM - Container
		case 11:		// eVGM - Container List 그리드

			with(sheetObj){
			
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
			
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel("SEE_BMD_HDR21"), Align:"Center"} ];
			InitHeaders(headers, info);
			
			var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"vgmls_ibflag" },
			             {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"Seq",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:14 },
			             {Type:"Text",      Hidden:1,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"seal_no1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Combo",     Hidden:1,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"seal_tp1",         	 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"seal_no2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Combo",     Hidden:1,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"seal_tp2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Float",     Hidden:10,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"vgm_cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			             {Type:"Combo",     Hidden:0, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"vgm_cgo_wgt_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"vgm_dt",      			KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"vgm_tm",      			KeyField:0,   CalcLogic:"",   Format:"Hm",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"vgm_method",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:100,   Align:"Left",    ColMerge:0,   SaveName:"vgm_cntr_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"PopupEdit", Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"vgm_spc_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"vgm_spc_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"vgm_spc_trdp_pic",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
			             {Type:"PopupEdit", Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"vgm_am_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	    	             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"vgm_am_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	    	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"vgm_am_trdp_pic",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vgm_seq",       			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_list_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
			
			InitColumns(cols);
			
			SetCountPosition(0);
			SetEditable(1);
			SetUseDefaultTime(0);
            SetColProperty('seal_tp1', {ComboText:SEALPTYCD1, ComboCode:SEALPTYCD2} );
            SetColProperty('seal_tp2', {ComboText:SEALPTYCD1, ComboCode:SEALPTYCD2} );
			SetColProperty('vgm_cgo_wgt_tp',{ComboText:VGMWGTCD1, ComboCode:VGMWGTCD2} );
			SetColProperty('vgm_method', {ComboText:VGMMETHODCD1, ComboCode:VGMMETHODCD2} );
			SetColProperty('vgm_cntr_tp', {ComboText:VGMCNTRTPCD1, ComboCode:VGMCNTRTPCD2});
			SetColProperty(0 ,"vgm_am_trdp_pic" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
			SetColProperty(0 ,"vgm_spc_trdp_pic" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
			  
			SetSheetHeight(400);
			
			// sheetObj.SetFocusAfterProcess(0);
		}
		break;
		
		// Item 그리드
        case 12:      
            with(sheetObj){
        	
    	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

    	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	         var headers = [ { Text:getLabel('SEE_BMD_HDR6'), Align:"Center"},
    	                   { Text:getLabel('SEE_BMD_HDR7'), Align:"Center"} ];
    	         InitHeaders(headers, info);

    	         var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"Del" },
    	             {Type:"Status",    Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_ibflag" },
    	             {Type:"Seq",      Hidden:0,  	Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Combo",     Hidden:0, 	Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_cntr_list_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:0,  	Width:100,  Align:"Left",    ColMerge:0,   SaveName:"item_cust_po_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Popup", 	Hidden:0, 	Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_cmdt_cd",    	   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    ColMerge:0,   SaveName:"item_cmdt_nm",    	   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:300 },
    	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Left",    ColMerge:0,   SaveName:"item_hs_grp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"PopupEdit", Hidden:0, 	Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_shp_cmdt_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	             {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    ColMerge:0,   SaveName:"item_shp_cmdt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:300 },
    	             {Type:"Int",       Hidden:0,  	Width:90,   Align:"Right",   ColMerge:1,   SaveName:"item_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
    	             {Type:"Combo",     Hidden:0, 	Width:90,   Align:"Center",  ColMerge:1,   SaveName:"item_pck_ut_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Left",    ColMerge:0,   SaveName:"item_pck_ut_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	             {Type:"Float",     Hidden:0,   Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_pck_inr_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
    	             {Type:"Float",     Hidden:0,   Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_ea_cnt",    	   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
    	             {Type:"Float",     Hidden:0,   Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_ttl_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
    	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_lbs_wgt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_cft_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	             {Type:"Text",      Hidden:0,  	Width:200,  Align:"Left",    ColMerge:1,   SaveName:"item_rmk",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:500},
    	             {Type:"Combo",     Hidden:0, 	Width:70,   Align:"Left",    ColMerge:1,   SaveName:"item_dg_cd_tp",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:0,  	Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_dg_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_shp_cmdt_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_po_sys_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_po_cmdt_seq",    KeyField:0,   CalcLogic:"",   Format:"",       	   PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_sys_no",    KeyField:0,   CalcLogic:"",   Format:"",       	   PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
    	          
    	         InitColumns(cols);

    	      // SetGetCountPosition()(0);
    	         SetEditable(1);
    	         SetAutoRowHeight(1);
    	         SetDataRowHeight(20);
    	         SetEditEnterBehavior("newline");
    	         
    	         SetColProperty(0 ,"item_rmk" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
    	         SetColProperty(0 ,"item_cmdt_cd" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
    	         SetColProperty(0 ,"item_shp_cmdt_cd" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
    	         SetColProperty('item_pck_ut_cd', {ComboText:PCKCD1, ComboCode:PCKCD2} );
    	                                    /*
											 * oyh 2013.09.04 #20420 : [BINEX]
											 * BL ENTRY에 Package 정보 default
											 * setting
											 */
    	         SetColProperty('item_cntr_list_seq', {ComboText:CNTCD2, ComboCode:CNTCD1} );
    	         SetColProperty('item_dg_cd_tp', {ComboText:'|UN|IMDG', ComboCode:'|U|I'} );
    	         SetSheetHeight(300);
    		}
      	break;
        case 13:
        	with(sheetObj){
        	
  	      //   (12, 0, 0, true);

  	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

  	         var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
  	         var headers = [ { Text:getLabel('SEE_BMD_HDR8'), Align:"Center"} ];
  	         InitHeaders(headers, info);

  	         var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"jb_del_chk",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1,   EditLen:-1, HeaderCheck:0 },
  	             {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
  	             {Type:"Combo",     Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"jb_sts_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1 },
  	             {Type:"Image",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"jb_sts_img",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
  	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"jb_pln_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  	             {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"jb_pln_tm",     KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"jb_act_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  	             {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"jb_act_tm",     KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
  	             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dur_tm_qty",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1 },
  	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
  	             {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"jb_tmplt_Seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
  	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"jb_ibflag",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
  	          
  	         InitColumns(cols);

  	         SetEditable(1);
  	         SetImageList(0,APP_PATH+"/web/img/button/bt_green.gif");
  	         SetImageList(1,APP_PATH+"/web/img/button/bt_red.gif");
  
  	         SetColProperty('jb_sts_nm', {ComboText:"|"+JBCD2, ComboCode:"|"+JBCD1} );
	         SetSheetHeight(400);
  	         }        	
        break;
    }
}
/**
 * HBL표시
 */
function sheet2_OnDblClick(sheetObj,Row,Col){
// #549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
//OFVFOUR-7951: [JAPT] OPUS down 03/29/2022
var paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+encodeURIComponent(sheetObj.GetCellValue(Row, 'hbl_bl_no'))+"&f_intg_bl_seq="+encodeURIComponent(sheetObj.GetCellValue(Row, 'hbl_intg_bl_seq'));
   	parent.mkNewFrame('Booking & HBL', paramStr);
}
// ########################## 첨부문서 ##########################
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet3_OnDblClick(sheetObj,Row,Col){
	// Name선택 시에만 팝업 호출
	if(sheetObj.ColSaveName(Col)=='palt_doc_no' || sheetObj.ColSaveName(Col)=='palt_doc_msg'){
		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
reqParam += '&s_palt_doc_seq='+sheetObj.GetCellValue(Row,"palt_doc_seq");
		reqParam += '&openMean='+SEARCH02;
		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDocUp', 806, 450, "scroll:no;status:no;help:no;");
	}
}
function sheet3_OnMouseMove(sheetObj, row, col){
	if(sheetObj.MouseCol()==9){
		sheetObj.ToolTipOption="balloon:true;width:320;backcolor:#FFFFE0;forecolor:#000000;icon:0;title:Message";
		var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "palt_doc_msg");
		memo=memo.replaceAll("@^^@", "\n");
		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(),memo);
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet3_OnClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet
 * Oeject, Row, Column)
 */
function sheet3_OnClick(sheetObj, Row, Col){	
   	var downType;
   	var s_palt_doc_seq;
   	var s_intg_bl_seq;
	switch (sheetObj.ColSaveName(Col)) {
        case "palt_doc_img_url" :
         	if(sheetObj.GetCellImage(Row, "palt_doc_img_url")  != ""){
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
// 파일 다운로드
function downloadFile(downType, s_intg_bl_seq, s_palt_doc_seq){
	document.frm2.docType.value=downType;
	document.frm2.s_palt_doc_seq.value=s_palt_doc_seq;
	document.frm2.intg_bl_seq.value = s_intg_bl_seq;
	// document.frm2.target = '_self';
	document.frm2.submit();
}
/**
 * 파일 업로드 팝업에서 목록 Reload
 */
function reloadDocList(){
	doWork('SEARCH_DOC');
}
/**
 * Booking&B/L 메인 화면의 입력값 확인
 */
function blCheckInpuVals(){
	var isOk=true;
	// ---------------20121130 OJG---------------------------
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
	if(!chkCmpAddr(frm1.agent_trdp_addr, 'Agent Address')){
		isOk=false;
		moveTab('01');
		frm1.agent_trdp_addr.focus();
	}
	// ---------------20121130 OJG--------------------------
	/*
	 * 2012.02.23 필수값 설정 REF_NO, ETD
	 */
	/*
	 * if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){S.Y
	 * BAIK (2013.01.23)
	 */
	if(!checkInType(frm1.etd_dt_tm.value, "DD")){	
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETD_'));
		isOk=false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
		return isOk; 
	}
	if(trim(frm1.etd_dt_tm.value)!= "" && trim(frm1.eta_dt_tm.value) != ""){
		if(getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy") < 0){
			// 'ETD date must be greater than ETA date
			alert(getLabel("SEA_COM_ALT021"));
			moveTab('01');
			frm1.eta_dt_tm.focus();
			isOk=false;
			return isOk; 
		}
	}
 	// #25246, 25247 필수값 설정 추가
	if(frm1.pol_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.pol_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.pod_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.pod_cd.focus();
		isOk=false;
		return isOk; 
	}
	// #29608 MBL Mandatory 항목 추가(Office Code)
	if(frm1.ref_ofc_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.ref_ofc_cd.focus();
		isOk = false;
		return isOk; 
	}
	if(frm1.nomi_flg.value == "B"){
		alert(getLabel('FMS_COM_ALT001') + " - Sales Type");
		moveTab('01');
		frm1.nomi_flg.focus();
		isOk=false;
		return isOk;
	}
/*
 * if(checkInputVal(frm1.shpr_trdp_nm.value, 2, 50, "T", 'Shipper')!='O'){
 * isOk=false; moveTab('01'); frm1.shpr_trdp_nm.focus(); }else
 * if(checkInputVal(frm1.shpr_trdp_addr.value, 2, 400, "T", 'Shipper
 * Address')!='O'){ moveTab('01'); frm1.shpr_trdp_addr.focus(); isOk=false;
 * }else if(checkInputVal(frm1.cnee_trdp_nm.value, 2, 50, "T", 'Consignee
 * Name')!='O'){ isOk=false; moveTab('01'); frm1.cnee_trdp_nm.focus(); }else
 * if(checkInputVal(frm1.cnee_trdp_addr.value, 2, 400, "T", 'Consignee
 * Address')!='O'){ moveTab('01'); frm1.cnee_trdp_addr.focus(); isOk=false;
 * }else if(checkInputVal(frm1.lnr_trdp_cd.value, 6, 7, "T", 'Liner
 * Code')!='O'){ isOk=false; moveTab('01'); frm1.lnr_trdp_cd.focus(); }else
 * if(checkInputVal(frm1.lnr_trdp_nm.value, 2, 50, "T", 'Liner Name')!='O'){
 * isOk=false; moveTab('01'); frm1.lnr_trdp_nm.focus(); }else
 * if(checkInputVal(frm1.trnk_vsl_nm.value, 2, 100, "T", 'Vessel Name')!='O'){
 * isOk=false; moveTab('01'); frm1.trnk_vsl_nm.focus(); }else
 * if(checkInputVal(frm1.trnk_voy.value, 3, 8, "T", 'Voyage')!='O'){ isOk=false;
 * moveTab('01'); frm1.trnk_voy.focus(); }else
 * if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){
 * isOk=false; moveTab('01'); frm1.etd_dt_tm.focus(); }else
 * if(checkInputVal(frm1.pol_cd.value, 5, 6, "T", 'POL')!='O'){ isOk=false;
 * moveTab('01'); frm1.pol_cd.focus(); }else if(checkInputVal(frm1.pod_cd.value,
 * 5, 6, "T", 'POD')!='O'){ isOk=false; moveTab('01'); frm1.pod_cd.focus();
 * }else if(checkInputVal(frm1.del_cd.value, 5, 6, "T", 'DEL Code')!='O'){
 * isOk=false; moveTab('01'); frm1.del_cd.focus(); }else
 * if(checkInputVal(frm1.pck_qty.value, 0, 7, "N", 'Package Qty')!='O'){
 * isOk=false; moveTab('01'); frm1.pck_qty.focus(); }else
 * if(checkInputVal(frm1.grs_wgt.value, 0, 8, "N", 'G/Weight')!='O'){
 * isOk=false; moveTab('01'); frm1.grs_wgt.focus(); }else
 * if(checkInputVal(frm1.meas.value, 0, 8, "N", 'Measurement')!='O'){
 * isOk=false; moveTab('01'); frm1.meas.focus(); }else
 * if(checkInputVal(frm1.bl_iss_dt.value, 10, 10, "DD", 'Issued Date')!='O'){
 * isOk=false; moveTab('01'); frm1.bl_iss_dt.focus(); }else
 * if(checkInputVal(frm1.mk_txt.value, 0, 4000, "T", 'Mark')!='O'){ isOk=false;
 * moveTab('02'); frm1.mk_txt.focus(); }else
 * if(checkInputVal(frm1.desc_txt.value, 0, 4000, "T", 'Description')!='O'){
 * isOk=false; moveTab('02'); frm1.desc_txt.focus(); }else
 * if(checkInputVal(frm1.rmk.value, 0, 400, "T", 'Remark')!='O'){ isOk=false;
 * moveTab('02'); frm1.rmk.focus(); }
 */
	/* ================================================================================================== */
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용 */
	/*
	 * Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류
	 * 발생을 차단.
	 */
	fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
	var sheetObjArr=new Array(3);
		sheetObjArr[0]=docObjects[4];		// AR LOCAL 'fr_'
		sheetObjArr[1]=docObjects[6];		// DC 'dc_fr_'
		sheetObjArr[2]=docObjects[5];		// AP 'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){	// Validation 후 Do you want to save
											// 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/* ================================================================================================= */
	// Container List validation.
	//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
	if(comCntrDelCheckVals(docObjects[2], docObjects[11])){
		isOk=false;
	}
	
	fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(10);   // grid가 생성되지않았으면 생성(속도개선)
    var cntrListParam=docObjects[2].GetSaveString(false);
    if(docObjects[2].IsDataModified() && cntrListParam == "") { isOk=false; };
	if(cntrListParam!=''){
		if(cntrListCheckInpuVals(docObjects[2])){
			isOk=false;
			return isOk; 
		}
	}
	
	fnSetIBsheetInit(11);   // grid가 생성되지않았으면 생성(속도개선)
	var cmdtListParam=docObjects[11].GetSaveString(false);
	if(docObjects[11].IsDataModified() && cmdtListParam == "") { isOk=false; };
	if(cmdtListParam!=''){
		if(itemCheckInpuVals(docObjects[11])){
			isOk=false;
		}
	}
	
// #1351 [CLT] B/L, AWB 등 Freight 탭에 대한 Mandatory Validation 메시지 기능 보완
	var frtSdListParam=docObjects[4].GetSaveString(false);
    if(docObjects[4].IsDataModified() && frtSdListParam == "") { isOk=false; moveTab('04'); };

    var frtBcListParam=docObjects[5].GetSaveString(false);
    if(docObjects[5].IsDataModified() && frtBcListParam == "") { isOk=false; moveTab('04'); };

    var frtDcListParam=docObjects[6].GetSaveString(false);
    if(docObjects[6].IsDataModified() && frtDcListParam == "") { isOk=false; moveTab('04'); };
	
    
    // VGM Cntr정보를 동기화 한다.
    var vgmSheet  = docObjects[10];
    var cntrSheet = docObjects[2];

	for(var i=1; i<= vgmSheet.LastRow(); i++){
		var vgmSeq = vgmSheet.GetCellValue(i, 'Seq');	
		
		for (var j=1; j<= cntrSheet.LastRow(); j++){
			var cntrSeq = cntrSheet.GetCellValue(j, 'Seq');	
			
			if (vgmSeq == cntrSeq){
				cntrSheet.SetCellValue(j,"seal_tp1",vgmSheet.GetCellValue(i, 'seal_tp1'),0);
				cntrSheet.SetCellValue(j,"seal_tp2",vgmSheet.GetCellValue(i, 'seal_tp2'),0);
				cntrSheet.SetCellValue(j,"vgm_cgo_wgt",vgmSheet.GetCellValue(i, 'vgm_cgo_wgt'),0);
				cntrSheet.SetCellValue(j,"vgm_cgo_wgt_tp",vgmSheet.GetCellValue(i, 'vgm_cgo_wgt_tp'),0);
				cntrSheet.SetCellValue(j,"vgm_dt",vgmSheet.GetCellValue(i, 'vgm_dt'),0);
				cntrSheet.SetCellValue(j,"vgm_tm",vgmSheet.GetCellValue(i, 'vgm_tm'),0);
				cntrSheet.SetCellValue(j,"vgm_method",vgmSheet.GetCellValue(i, 'vgm_method'),0);
				cntrSheet.SetCellValue(j,"vgm_cntr_tp",vgmSheet.GetCellValue(i, 'vgm_cntr_tp'),0);
				cntrSheet.SetCellValue(j,"vgm_spc_trdp_cd",vgmSheet.GetCellValue(i, 'vgm_spc_trdp_cd'),0);
				cntrSheet.SetCellValue(j,"vgm_spc_trdp_nm",vgmSheet.GetCellValue(i, 'vgm_spc_trdp_nm'),0);
				cntrSheet.SetCellValue(j,"vgm_spc_trdp_pic",vgmSheet.GetCellValue(i, 'vgm_spc_trdp_pic'),0);
				cntrSheet.SetCellValue(j,"vgm_am_trdp_cd",vgmSheet.GetCellValue(i, 'vgm_am_trdp_cd'),0);
				cntrSheet.SetCellValue(j,"vgm_am_trdp_nm",vgmSheet.GetCellValue(i, 'vgm_am_trdp_nm'),0);
				cntrSheet.SetCellValue(j,"vgm_am_trdp_pic",vgmSheet.GetCellValue(i, 'vgm_am_trdp_pic'),0);
				cntrSheet.SetCellValue(j,"vgm_seq",vgmSheet.GetCellValue(i, 'vgm_seq'),0);			
			}
		}
	}
    
	return isOk;
}
 /**
	 * Container List의 입력값 확인
	 */
function cntrListCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
 	var isError=false; 
 	var workItems=0;
 	for(var i=1; i < totRow ; i++){
if(sheetObj.GetCellValue(i, 'conls_ibflag')=='U'||sheetObj.GetCellValue(i, 'conls_ibflag')=='I'){
if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_tpsz_cd'), 2, 6, "T", 'Container Type/Size')!='O'){
 				isError=true;
 				moveTab('02');
 				sheetObj.SelectCell(i, 'cntr_tpsz_cd', false);
 				break;
 			}
 		}
 	}
 	return isError;
} 

/**
 * Item Commodity입력값 확인
 */
function itemCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	var workItems=0;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'item_ibflag')=='U'||sheetObj.GetCellValue(i, 'item_ibflag')=='I'){
			// if(checkInputVal(sheetObj.GetCellValue(i, 'item_shp_cmdt_cd'), 4,
			// 12, "T", 'Item Code')!='O'){
			// isError=true;
			// }
				
			if(checkInputVal(sheetObj.GetCellText(i, 'item_cntr_list_seq'), 1, 14, "T", 'Container No.')!='O'){
				isError=true;				
			}
		}
	}
	return isError;
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
function setOfficeData(){
	fnSetIBsheetInit(1);   // grid가 생성되지않았으면 생성(속도개선)
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	// office post date setting, Ocean Export
	if(formObj.post_dt.value==""){
		if(ofc_post_dt=="TODAY"){
			formObj.post_dt.value=getTodayStr();
		}
	}
	// office currency
	if(ofc_curr_cd!=""){
		if(formObj.copy_bl_seq.value == ""){
			formObj.curr_cd.value=ofc_curr_cd;
		}
	}
	// office code
	formObj.ref_ofc_cd.value=v_ofc_cd;
}
/*
 * function weightChange(obj){ var formObj=document.frm1;
 * if(obj.name=="grs_wgt"){
 * formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") /
 / CNVT_CNST_KG_LB, 0); chkComma(formObj.grs_wgt1,8,2); } else
 * if(obj.name=="grs_wgt1"){
 * formObj.grs_wgt.value=roundXL(formObj.grs_wgt1.value.replaceAll(",","") *
 / CNVT_CNST_KG_LB, 3); chkComma(formObj.grs_wgt,8,3); } } function cbmChange(obj){
 * var formObj=document.frm1; if(obj.name=="meas"){
 * formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") * CNVT_CNST_CBM_CFT,
 * 3); chkComma(formObj.meas1,8,3); } else if(obj.name=="meas1"){
 * formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") / CNVT_CNST_CBM_CFT,
 * 3); chkComma(formObj.meas,8,3); } }
 */
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
		formObj.mk_grs_wgt.value = grsWgtMoney;
		formObj.mk_grs_wgt1.value = grsWgtMoney1;
	}else if(obj.name=="grs_wgt1"){
		
		var grsWgtValue1 = Number(formObj.grs_wgt1.value.replace(/,/gi, "")).toFixed(obl_decimal_len);
		var grsWgtMoney1 = doMoneyFmt(grsWgtValue1);

		var grsWgtValue = doMoneyFmt(Number(roundXL(grsWgtValue1 / CNVT_CNST_KG_LB, obl_decimal_len)));
		var grsWgtMoney = doMoneyFmt(grsWgtValue);
		
		formObj.grs_wgt.value = grsWgtMoney;
		formObj.grs_wgt1.value = grsWgtMoney1;
		formObj.mk_grs_wgt.value = grsWgtMoney;
		formObj.mk_grs_wgt1.value = grsWgtMoney1;
	//#2889 [Zimex, JC Freight] after v450, Decimal handling on weight
	}else if(obj.name=="mk_grs_wgt"){
//		var mkGrsWgtValue = Number(formObj.mk_grs_wgt.value.replace(/,/gi, "")).toFixed(obl_decimal_len);
		formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value.replace(/,/gi, ""));
	}else if(obj.name=="mk_grs_wgt1"){
//		var mkGrsWgtValue1 = Number(formObj.mk_grs_wgt1.value.replace(/,/gi, "")).toFixed(obl_decimal_len);
		formObj.mk_grs_wgt1.value = doMoneyFmt(formObj.mk_grs_wgt1.value.replace(/,/gi, ""));
	}
}
function cbmChange(obj){
	var formObj=document.frm1;
	// #27543, #27534 요건 :
	if(obj.name=="meas"){
		var rndXLValue=roundXL(formObj.meas.value.replaceAll(",", "") * CNVT_CNST_CBM_CFT, obl_decimal_len);
		formObj.meas1.value=doMoneyFmt(Number(rndXLValue).toFixed(obl_decimal_len));
		formObj.mk_meas1.value=doMoneyFmt(Number(rndXLValue).toFixed(obl_decimal_len));
		formObj.mk_meas.value=formObj.meas.value.replaceAll(",", "");
		// alert(formObj.meas1.value);
		// chkComma(formObj.meas1, 8, 0);
		// alert(formObj.meas1.value);
		formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value);
		formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value);
	}
	// CFT ==> CBM 기능
	else if(obj.name=="meas1"){
		var rndXLValue=roundXL(formObj.meas1.value.replaceAll(",", "") / CNVT_CNST_CBM_CFT, obl_decimal_len);
		formObj.meas.value=rndXLValue;
		formObj.mk_meas.value=rndXLValue;
		formObj.mk_meas1.value=formObj.meas1.value.replaceAll(",","");
		chkComma(formObj.meas, 8, obl_decimal_len);
		formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value);
		formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value);
	}
	// amountChange(frm1.agent_rt);
	// amountChange(frm1.cust_rt);
	
	//#2889 [Zimex, JC Freight] after v450, Decimal handling on weight
	else if(obj.name=="mk_meas"){
		formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value.replace(/,/gi, ""));
	}else if(obj.name=="mk_meas1"){
		formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value.replace(/,/gi, ""));
	}

}
function setToday(obj){
	var formObj=document.frm1;
	if(obj.name=="rlsd_flg"){
		if(obj.checked){
			formObj.rlsd_dt_tm.value=getTodayStr();
			formObj.rlsd_usrid.value=current_usrid;
		}else{
			formObj.rlsd_dt_tm.value='';
			formObj.rlsd_usrid.value='';
		}
	}
}
function loadData(){
	if(frm1.intg_bl_seq.value!=""&&bkg_to_bl_flag !='Y'){
		// ref_ofc_cd를 database에 있는 값으로 셋팅함
		frm1.ref_ofc_cd.value=frm1.h_ref_ofc_cd.value;
		frm1.frt_term_cd.value=frm1.h_frt_term_cd.value;
		// currency를 database에 있는 값으로 셋팅함
		frm1.curr_cd.value=frm1.h_curr_cd.value;
		
		/*
		 * #1804 [Split - 1] [PATENT] Payment Verification - 기능보완(verify_flag =
		 * "Y" readonly)
		 */		
		if( frm1.verify_flag.value == "Y" ){	
			$("select[name=obl_tp_cd]").attr("disabled",true);
		} else {
			$("select[name=obl_tp_cd]").attr("disabled",false);
		} 
		// #1821 [PATENT] B/L 옵션 항목 - 기능 확인
		if(frm1.h_wgt_disp_cd.value==""){
	    	if(user_ofc_cnt_cd=="US"){
	    		frm1.wgt_disp_cd.value='KL';
	    	}else{
	    		frm1.wgt_disp_cd.value='K';
	    	}
		}
		// attach rider 체크
		rowCount(frm1, 15, frm1.rider_lbl);
// frm1.ref_no.className = 'search_form-disable';
// frm1.ref_no.readOnly = true;
		
		//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
      	if(frm1.f_bl_no.value==''&&frm1.f_ref_no.value==''&&frm1.f_lnr_bkg_no.value==''){
      		 loadDataProcess =""; //반드시 마지막 호출 그리드 _OnSearchEnd 이벤트에서 초기화 한다 loadDataProcess = "";
      	}else{
      		 loadDataProcess ="loadDataWait"; //반드시 마지막 호출 그리드 _OnSearchEnd 이벤트에서 초기화 한다 loadDataProcess = "";
      	}
      	
		doWork('SEARCHLIST01');
		
		/*
		 * 속도개선 주석처리 doWork('SEARCH_CNTR');
		 */
		
		// #2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.ref_no.value);
		
	} else {
		// BL_COPY
		//goTabSelect(4);
		var orgBlSeq = frm1.copy_bl_seq.value;
		if (orgBlSeq != "") {
			selectCopyBLFrt();
		}
		
		
		// BKG_CREATE
		if (frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value !="") {
			bindBkgCntrData();
			// bindBkgFrtData();
			bindBkgFrtDataBkg();
			
			
			// item 항목은 부킹에서 M/L Create 시 cntr_no만 생성되고 cntr_list_seq 가 생성되지 않아서
			// 보류
			// #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발
			// docObjects[11] sheet14
	      	// frm1.c_create.value="Y";
			// searchGrid(14);
			
			
			// #1056 [OEM Entry]PO# 항목 추가 및 연계
			ajaxSendPost(setBkgPoInfo, 'reqVal', '&goWhere=aj&bcKey=getBkgPoInfo&bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');
		}
		
		//#5289 - [Binex] Errors when retrieving Customer Booking on OEH BL Entry (Duc Nguyen)
		if(frm1.f_cmd_chk.value==130 && frm1.lnr_bkg_no.value!=""){
			frm1.frt_term_cd.value=frm1.h_frt_term_cd.value;
		}
	}
	
	/*
	 * jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)
	 * 자동연계요건 Start
	 */        
	 cntr_ship_init();
	/*
	 * jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)
	 * 자동연계요건 End
	 */		
	 // OFC의 POST_DATE TYPE를 취득한다.
	 ofcChDEta();
	 

	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
	// 조회
	chkIntgBlModiTms("VIEW");	 
	 
	// #41634 - [DMS] Default Cursor Position Change
	frm1.ref_no.focus();
	
	// Remark value앞 공백문자 제거
	var rmk = frm1.rmk.value;
	var rmkBlank = rmk.replace(/^\s*/, "");
	
	frm1.rmk.value = rmkBlank;
	
}
// 2011.11.21 Kim,Jin-Hyuk House B/L Add
function sheet2_OnSearchEnd(sheetObj, row, col){
	loadDataProcess = "";//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
	
	var rows=sheetObj.SearchRows();
	if(rows==0){
		sheetObj.RemoveAll();
	}
	
	// if (sheetObj.GetFocusAfterProcess() == 0) {
	// sheetObj.SetFocusAfterProcess(1);
	// }
	sheetObj.SetBlur();	// IBSheet Focus out 처리
}
/**
 * Container번호 중복확인
 */
function checkCntrNo(inCntrNo){
	fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
 	var intRows=docObjects[2].LastRow() +1;
	var loopNum=0;
	for(var i=1; i < intRows; i++){
		if(inCntrNo==docObjects[2].GetCellValue(i, 'cntr_no')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}
function getCntrGrpCd (v_cntr_tpsz_cd) {
	var v_cntr_grp_cd='';
	var arrTpszCd=TPCD1.split('|');
	var arrGrpCd=TPCD3.split('|');
	for (var idx=0; idx < arrTpszCd.length ; idx++ ) {
		if (v_cntr_tpsz_cd == arrTpszCd[idx]) {
			v_cntr_grp_cd=arrGrpCd[idx];
			break;
		}
	}
	return v_cntr_grp_cd;
}
function sheet4_OnSearchEnd(sheetObj, row, col) 
{
 	for (var idx=1; idx < sheetObj.LastRow() + 1; idx++) 
 	{
 		// #1543 [LBS] Container Type/Size Reefer, Ventill 항목 관리
 		var tmpFlg = sheetObj.GetCellValue(idx,"temp_flg");
 		var ventFlg = sheetObj.GetCellValue(idx,"vent_flg");
 		var rcFlg = sheetObj.GetCellValue(idx,"rc_flg");
 		var ventCd = sheetObj.GetCellValue(idx,"vent_cd");
 		
 		if(rcFlg == "N"){
			sheetObj.SetCellEditable(idx,"temp_val",0);
			sheetObj.SetCellEditable(idx,"temp_cd",0);
			sheetObj.SetCellEditable(idx,"mgset_flg",0);
			sheetObj.SetCellEditable(idx,"ca_flg",0);
//			sheetObj.SetCellEditable(idx,"air_flow",0);
//			sheetObj.SetCellEditable(idx,"air_flow_unit",0);
			sheetObj.SetCellEditable(idx,"humid",0);
 		}else{
	 		if(tmpFlg == "Y"){
 				sheetObj.SetCellEditable(idx,"rc_flg",1);
 				sheetObj.SetCellEditable(idx,"temp_val",1);
 				sheetObj.SetCellEditable(idx,"temp_cd",1);
 				sheetObj.SetCellEditable(idx,"mgset_flg",1);
 				sheetObj.SetCellEditable(idx,"ca_flg",1);
// 				sheetObj.SetCellEditable(idx,"air_flow",1);
// 				sheetObj.SetCellEditable(idx,"air_flow_unit",1);
 				sheetObj.SetCellEditable(idx,"humid",1);
	 		}else{
 				sheetObj.SetCellEditable(idx,"rc_flg",0);
 				sheetObj.SetCellEditable(idx,"temp_val",0);
 				sheetObj.SetCellEditable(idx,"temp_cd",0);
 				sheetObj.SetCellEditable(idx,"mgset_flg",0);
 				sheetObj.SetCellEditable(idx,"ca_flg",0);
// 				sheetObj.SetCellEditable(idx,"air_flow",0);
// 				sheetObj.SetCellEditable(idx,"air_flow_unit",0);
 				sheetObj.SetCellEditable(idx,"humid",0);
	 		}
 		}
 		if(ventFlg == "Y"){
 			if(ventCd != "" && ventCd != "V000"){
 	 			sheetObj.SetCellEditable(idx,"vent_cd",1);
 				sheetObj.SetCellEditable(idx,"air_flow",1);
 				sheetObj.SetCellEditable(idx,"air_flow_unit",1);
 			}else{
 	 			sheetObj.SetCellEditable(idx,"vent_cd",1);
 				sheetObj.SetCellEditable(idx,"air_flow",0);
 				sheetObj.SetCellEditable(idx,"air_flow_unit",0);
 			}
 		}else{
 			sheetObj.SetCellEditable(idx,"vent_cd",0);
			sheetObj.SetCellEditable(idx,"air_flow",0);
			sheetObj.SetCellEditable(idx,"air_flow_unit",0);
 		}
 		/*if ( getCntrGrpCd(sheetObj.GetCellValue(idx,"cntr_tpsz_cd")) == "RF") 
 		{
			sheetObj.SetCellEditable(idx,"temp_val",1);
			sheetObj.SetCellEditable(idx,"temp_cd",1);
			sheetObj.SetCellEditable(idx,"vent_cd",1);
		} 
 		else 
		{
			sheetObj.SetCellValue(idx,"temp_val","",0);
			sheetObj.SetCellValue(idx,"temp_cd","",0);
			sheetObj.SetCellValue(idx,"vent_cd","",0);
			sheetObj.SetCellEditable(idx,"temp_val",0);
			sheetObj.SetCellEditable(idx,"temp_cd",0);
			sheetObj.SetCellEditable(idx,"vent_cd",0);
		}*/
	}
	/* #23809 oyh 컨테이너가 없을때 tab키를 누르면 Row생성되게 */
	if(sheetObj.RowCount()== 0) {
		sheetObj.SelectCell(0,"cntr_rmk");
	}
	
	// if (sheetObj.GetFocusAfterProcess() == 0) {
	// sheetObj.SetFocusAfterProcess(1);
	// }
	
	if(sumCntrFlag){
		ajaxSendPost(getSumHblCntr, 'reqVal', '&goWhere=aj&bcKey=sumHblCntr&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
		doWork('SEARCHLIST01');
	}
	sheetObj.SetBlur();	// IBSheet Focus out 처리
	
	
	searchGrid(13); //#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
}
function sheet4_onAddRow(){
	var sheetObj = docObjects[2];
	cntrGridAdd(sheetObj);
	
//	if ( getCntrGrpCd(sheetObj.GetCellValue(sheetObj.GetSelectRow(),"cntr_tpsz_cd")) == "RF") {
//		sheetObj.SetCellEditable(sheetObj.GetSelectRow(),"temp_val",1);
//		sheetObj.SetCellEditable(sheetObj.GetSelectRow(),"temp_cd",1);
//		sheetObj.SetCellEditable(sheetObj.GetSelectRow(),"vent_cd",1);
//	} else {
//		sheetObj.SetCellValue(sheetObj.GetSelectRow(),"temp_val","",0);
//		sheetObj.SetCellValue(sheetObj.GetSelectRow(),"temp_cd","",0);
//		sheetObj.SetCellValue(sheetObj.GetSelectRow(),"vent_cd","",0);
//		sheetObj.SetCellEditable(sheetObj.GetSelectRow(),"temp_val",0);
//		sheetObj.SetCellEditable(sheetObj.GetSelectRow(),"temp_cd",0);
//		sheetObj.SetCellEditable(sheetObj.GetSelectRow(),"vent_cd",0);
//	}
	
	// #1543 [LBS] Container Type/Size Reefer, Ventill 항목 관리
	var strCntrTpszCd = sheetObj.GetCellValue(sheetObj.GetSelectRow(),"cntr_tpsz_cd");
	if(strCntrTpszCd != ''){
		ajaxSendPost(returnGetContainerTPSZFlags, 'reqVal', '&goWhere=aj&bcKey=selectContainerTPSZFlags&cntr_tpsz_cd='+strCntrTpszCd, './GateServlet.gsl');
	}
	
}

/**
* Task No. : #1543
* Author : Huy.Mai
* Date : 2017/09/06
* Get Temp flag and Vent flag
* Param : cntr_tpsz_cd, rgst_ofc_cd
*/
function returnGetContainerTPSZFlags(reqVal){
	var sheetObj = docObjects[2];
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			var flgVal = doc[1].split("|");
			var rowIdx = sheetObj.GetSelectRow();
			var newCntrTpszCd = sheetObj.GetCellValue(rowIdx, 'cntr_tpsz_cd');
    		var oldCntrTpszCd = sheetObj.CellSearchValue(rowIdx, 'cntr_tpsz_cd');
			sheetObj.SetCellValue(rowIdx, 'temp_flg', flgVal[0]);
			sheetObj.SetCellValue(rowIdx, 'vent_flg', flgVal[1]);
			var tempFlg = flgVal[0];
			if(tempFlg == "Y"){
				sheetObj.SetCellEditable(rowIdx,"rc_flg",1);
				sheetObj.SetCellEditable(rowIdx,"temp_val",1);
				sheetObj.SetCellEditable(rowIdx,"temp_cd",1);
				sheetObj.SetCellEditable(rowIdx,"mgset_flg",1);
				sheetObj.SetCellEditable(rowIdx,"ca_flg",1);
				sheetObj.SetCellEditable(rowIdx,"air_flow",1);
				sheetObj.SetCellEditable(rowIdx,"air_flow_unit",1);
				sheetObj.SetCellEditable(rowIdx,"humid",1);
//				// Enable Temp, Unit
//				sheetObj.SetCellEditable(rowIdx, "temp_val", 1);
//        		sheetObj.SetCellEditable(rowIdx, "temp_cd", 1);
        		if(newCntrTpszCd == oldCntrTpszCd){
        			//Set search data for cells
            		var strTmpVal = sheetObj.CellSearchValue(rowIdx, 'temp_val');
            		var strTmpCd = sheetObj.CellSearchValue(rowIdx, 'temp_cd');
            		sheetObj.SetCellValue(rowIdx, 'temp_val', strTmpVal);
            		sheetObj.SetCellValue(rowIdx, 'temp_cd', strTmpCd);
        		}
			}else{
				
				sheetObj.SetCellEditable(rowIdx,"rc_flg",0);
				sheetObj.SetCellEditable(rowIdx,"temp_val",0);
				sheetObj.SetCellEditable(rowIdx,"temp_cd",0);
				sheetObj.SetCellEditable(rowIdx,"mgset_flg",0);
				sheetObj.SetCellEditable(rowIdx,"ca_flg",0);
//				sheetObj.SetCellEditable(rowIdx,"air_flow",0);
//				sheetObj.SetCellEditable(rowIdx,"air_flow_unit",0);
				sheetObj.SetCellEditable(rowIdx,"humid",0);
				
				sheetObj.SetCellValue(rowIdx,"rc_flg", "");
				sheetObj.SetCellValue(rowIdx,"temp_val", "");
				sheetObj.SetCellValue(rowIdx,"temp_cd", "");
				sheetObj.SetCellValue(rowIdx,"mgset_flg","");
				sheetObj.SetCellValue(rowIdx,"ca_flg","");
//				sheetObj.SetCellValue(rowIdx,"air_flow","");
//				sheetObj.SetCellValue(rowIdx,"air_flow_unit","");
				sheetObj.SetCellValue(rowIdx,"humid","");				
				
//				sheetObj.SetCellEditable(rowIdx, "temp_val", 0);
//        		sheetObj.SetCellEditable(rowIdx, "temp_cd", 0);       		
        		if(newCntrTpszCd == oldCntrTpszCd){
        			//Set search data for cells
            		var strTmpVal = sheetObj.CellSearchValue(rowIdx, 'temp_val');
            		var strTmpCd = sheetObj.CellSearchValue(rowIdx, 'temp_cd');
            		sheetObj.SetCellValue(rowIdx, 'temp_val', strTmpVal);
            		sheetObj.SetCellValue(rowIdx, 'temp_cd', strTmpCd);
        		}
        		else{
        			sheetObj.SetCellValue(rowIdx, 'temp_val', '');
            		sheetObj.SetCellValue(rowIdx, 'temp_cd', '');
        		}
			}
			var ventFlg = flgVal[1];			
			if(ventFlg == "Y"){ 
				// Enable Vent
				sheetObj.SetCellEditable(rowIdx, "vent_cd", 1);
			}else{
				sheetObj.SetCellEditable(rowIdx, "vent_cd", 0);
				if(newCntrTpszCd == oldCntrTpszCd){
					//Set search data for cells
	        		var strVentCd = sheetObj.CellSearchValue(rowIdx, 'vent_cd');
	        		sheetObj.SetCellValue(rowIdx, 'vent_cd', strVentCd);
				}
				else{
					sheetObj.SetCellValue(rowIdx, 'vent_cd', '');
				}
			}
		}
	}
}

function sheet4_OnChange(sheetObj, row, col, value){
	// alert(sheetObj.ColSaveName(col));
	switch (sheetObj.ColSaveName(col)) {
		case "cgo_pck_qty" :
		case "cgo_wgt" :
		case "cgo_wgt1" :
		case "cgo_meas" :
		case "cgo_meas1" :
			if (value < 0) 
			{
				// Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
		case "cntr_tpsz_cd" :
			fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
        	cntrInfoSet(docObjects[2]);
        	/*if ( getCntrGrpCd(sheetObj.GetCellValue(row,"cntr_tpsz_cd")) == "RF") {
        		sheetObj.SetCellEditable(row,"temp_val",1);
        		sheetObj.SetCellEditable(row,"temp_cd",1);
        		sheetObj.SetCellEditable(row,"vent_cd",1);
        	} else {
        		sheetObj.SetCellValue(row,"temp_val","",0);
        		sheetObj.SetCellValue(row,"temp_cd","",0);
        		sheetObj.SetCellValue(row,"vent_cd","",0);
        		sheetObj.SetCellEditable(row,"temp_val",0);
        		sheetObj.SetCellEditable(row,"temp_cd",0);
        		sheetObj.SetCellEditable(row,"vent_cd",0);
        	}*/
        	
        	// #1543 [LBS] Container Type/Size Reefer, Ventill 항목 관리
        	var strCntrTpszCd = sheetObj.GetCellValue(row, col);
    		if(strCntrTpszCd != ''){
    			ajaxSendPost(returnGetContainerTPSZFlags, 'reqVal', '&goWhere=aj&bcKey=selectContainerTPSZFlags&cntr_tpsz_cd='+strCntrTpszCd, './GateServlet.gsl');
    		}else{
    			sheetObj.SetCellEditable(row,"temp_val",0);
    			sheetObj.SetCellEditable(row,"temp_cd",0);
    			sheetObj.SetCellEditable(row,"vent_cd",0);
    			sheetObj.SetCellValue(row, 'temp_val', '');
        		sheetObj.SetCellValue(row, 'temp_cd', '');
        		sheetObj.SetCellValue(row, 'vent_cd', '');
    		}
    	break;
		case "rc_flg":
			if(sheetObj.GetCellValue(row, col) == "Y"){
				sheetObj.SetCellEditable(row,"temp_val",1);
				sheetObj.SetCellEditable(row,"temp_cd",1);
				sheetObj.SetCellEditable(row,"mgset_flg",1);
				sheetObj.SetCellEditable(row,"ca_flg",1);
//				sheetObj.SetCellEditable(row,"air_flow",1);
//				sheetObj.SetCellEditable(row,"air_flow_unit",1);
				sheetObj.SetCellEditable(row,"humid",1);
			}else{
				sheetObj.SetCellEditable(row,"temp_val",0);
				sheetObj.SetCellEditable(row,"temp_cd",0);
				sheetObj.SetCellEditable(row,"mgset_flg",0);
				sheetObj.SetCellEditable(row,"ca_flg",0);
//				sheetObj.SetCellEditable(row,"air_flow",0);
//				sheetObj.SetCellEditable(row,"air_flow_unit",0);
				sheetObj.SetCellEditable(row,"humid",0);
				
				sheetObj.SetCellValue(row,"temp_val", "");
				sheetObj.SetCellValue(row,"temp_cd", "");
				sheetObj.SetCellValue(row,"mgset_flg","");
				sheetObj.SetCellValue(row,"ca_flg","");
//				sheetObj.SetCellValue(row,"air_flow","");
//				sheetObj.SetCellValue(row,"air_flow_unit","");
				sheetObj.SetCellValue(row,"humid","");
				
			}
			break;    	
		case "temp_val" :
			if(sheetObj.GetCellValue(row,"temp_cd") != "" && sheetObj.GetCellValue(row,"vent_cd") !="") {
				var keyTxt=sheetObj.GetCellValue(row, "cntr_no") + " / " ;
				var sText=sheetObj.GetComboInfo(row,"vent_cd", "Text");
				var arrText=sText.split("|");
				var idx=sheetObj.GetComboInfo(row,"vent_cd", "SelectedIndex");
				var descTxt=
					sheetObj.GetCellValue(row, "temp_val") + " DEG." +
					sheetObj.GetCellValue(row, "temp_cd") + " / " +
					 arrText[idx] + " OPEN";
				 textdescAdd(frm1.desc_txt, keyTxt , descTxt, frm1.h_temp_val);
			}
			break;
		case "temp_cd" :
			if(sheetObj.GetCellValue(row,"temp_cd") != "" && sheetObj.GetCellValue(row,"vent_cd") !="") {
				var keyTxt=sheetObj.GetCellValue(row, "cntr_no") + " / " ;
				var sText=sheetObj.GetComboInfo(row,"vent_cd", "Text");
				var arrText=sText.split("|");
				var idx=sheetObj.GetComboInfo(row,"vent_cd", "SelectedIndex");
				var descTxt=
					sheetObj.GetCellValue(row, "temp_val") + " DEG." +
					sheetObj.GetCellValue(row, "temp_cd") + " / " +
					 arrText[idx] + " OPEN";
				 textdescAdd(frm1.desc_txt, keyTxt , descTxt, frm1.h_temp_val);
			}
			break;
		case "vent_cd" :
			if(sheetObj.GetCellValue(row,"temp_cd") != "" && sheetObj.GetCellValue(row,"vent_cd") !="") {
				var keyTxt=sheetObj.GetCellValue(row, "cntr_no") + " / " ;
				var sText=sheetObj.GetComboInfo(row,"vent_cd", "Text");
				var arrText=sText.split("|");
				var idx=sheetObj.GetComboInfo(row,"vent_cd", "SelectedIndex");
				var descTxt=
					sheetObj.GetCellValue(row, "temp_val") + " DEG." +
					sheetObj.GetCellValue(row, "temp_cd") + " / " +
					 arrText[idx] + " OPEN";
				 textdescAdd(frm1.desc_txt, keyTxt , descTxt, frm1.h_temp_val);
			}
			
			var ventCd = sheetObj.GetCellValue(row, "vent_cd");
			if(ventCd == "" || ventCd == "V000"){
				sheetObj.SetCellEditable(row,"air_flow",0);
				sheetObj.SetCellEditable(row,"air_flow_unit",0);
				sheetObj.SetCellValue(row,"air_flow","");
				sheetObj.SetCellValue(row,"air_flow_unit","");
			}else{
				sheetObj.SetCellEditable(row,"air_flow",1);
				sheetObj.SetCellEditable(row,"air_flow_unit",1);
			}
			
			break;
			
		//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
		case "Del" :
         	
			comCntrList_OnChange(sheetObj, row, col, value, docObjects[11]);		
			
        break;			
	}
	var cntrColStr="cntr_no";
	if(sheetObj.ColSaveName(col)==cntrColStr){
		// Contaienr Number 유효성 검증
		if(sheetObj.GetCellValue(row, cntrColStr)!==''){
			var rtnVal=cntrNumCheck(sheetObj.GetCellValue(row, cntrColStr));
			if(rtnVal){		// 정상인경우
				// 중복 확인
				if(!checkCntrNo(sheetObj.GetCellValue(row, cntrColStr))){
					// This Container Number is already used!\nPlease check the
					// Container Number!
					alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('FMS_COD_CNTR'));
					sheetObj.SetCellValue(row, cntrColStr,'',0);
					sheetObj.SelectCell(row, cntrColStr);
				}
			}
			else{
				// Proceed anyway? ...???
				if(confirm(getLabel('FMS_COM_CFMCON')) == false){
					sheetObj.SetCellValue(row, cntrColStr,'',0);
					sheetObj.SelectCell(row, cntrColStr);
				}else{
					// 중복 확인
					if(!checkCntrNo(sheetObj.GetCellValue(row, cntrColStr))){
						// This Container Number is already used!\nPlease check
						// the Container Number!
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
			//#2667 [PATENT] Bugs were reported when doing internal testing for Partial B/L (Synchronization)
			//#2877 [Zimex] after v450, Mismatch kg to lb conversion
			//sheetObj.SetCellValue(row, "cgo_wgt1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len),0);
			/*sheetObj.SetCellValue(row, "cgo_wgt1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len),0);
			if (sheetObj.GetCellValue(row, "cgo_wgt1") >99999999.99) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));				
				sheetObj.SetCellValue(row, "cgo_wgt","",0);
				sheetObj.SelectCell(row, "cgo_wgt");
			}
			break;*/
			
			//Check max length of Weight(KG) on grid
			var cgo_wgt1 = roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len);
			if (!ChkNumberCommaLen(value, 11, 3)) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_wgt',0);
				return;
			} else if (!ChkNumberCommaLen(cgo_wgt1, 11, obl_decimal_len)) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));		
				sheetObj.SetCellValue(row,'cgo_wgt',0);
				sheetObj.SelectCell(row, "cgo_wgt");
				return;
			} else {
				sheetObj.SetCellValue(row, "cgo_wgt1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len),0);
			}			
			break;
		case "cgo_wgt1":
			//#2667 [PATENT] Bugs were reported when doing internal testing for Partial B/L (Synchronization)
			//sheetObj.SetCellValue(row, "cgo_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len),0);
			
			//Check max length of Weight(KG) on grid
			var cgo_wgt = roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len);
			if (!ChkNumberCommaLen(value, 11, 3)) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_wgt1',0);
				return;
			} else if (!ChkNumberCommaLen(cgo_wgt, 11, obl_decimal_len)) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));		
				sheetObj.SetCellValue(row,'cgo_wgt1',0);
				sheetObj.SelectCell(row, "cgo_wgt1");
				return;
			} else {
				sheetObj.SetCellValue(row, "cgo_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len),0);
			}			
			break;
		case "cgo_meas":
			/*sheetObj.SetCellValue(row, "cgo_meas1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_CBM_CFT, 3),0);
			if (sheetObj.GetCellValue(row, "cgo_meas1") > 999999.999999) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGMEAS'));
				sheetObj.SetCellValue(row, "cgo_meas","",0);
				sheetObj.SelectCell(row, "cgo_meas");
			}
			break;*/
			
			//Check max length of Weight(KG) on grid
			var cgo_meas1 = roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_CBM_CFT, 3);
			if (!ChkNumberCommaLen(value, 10, 6)) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_meas',0);
				return;
			} else if (!ChkNumberCommaLen(cgo_meas1, 10, 3)) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));		
				sheetObj.SetCellValue(row,'cgo_meas',0);
				sheetObj.SelectCell(row, "cgo_meas");
				return;
			} else {
				sheetObj.SetCellValue(row, "cgo_meas1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_CBM_CFT, 3),0);
			}			
			break;
		case "cgo_meas1":
			/*sheetObj.SetCellValue(row, "cgo_meas",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_CBM_CFT, 3),0);
			break;*/
			
			//Check max length of Weight(KG) on grid
			var cgo_meas = roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_CBM_CFT, 3);
			if (!ChkNumberCommaLen(value, 10, 6)) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'cgo_meas1',0);
				return;
			} else if (!ChkNumberCommaLen(cgo_meas, 10, 3)) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));		
				sheetObj.SetCellValue(row,'cgo_meas1',0);
				sheetObj.SelectCell(row, "cgo_meas1");
				return;
			} else {
				sheetObj.SetCellValue(row, "cgo_meas",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_CBM_CFT, 3),0);
			}			
			break;
	}
	/*
	 * jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)
	 * 자동연계요건 Start
	 */
	var sumFlag='N';
	var colNm=sheetObj.ColSaveName(col);
	var pckUtCd = "";
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
				meas=roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas")), 6);
				meas1=roundXL(parseFloat(meas1), 6) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas1")), 6);
				grs_wgt=roundXL(parseFloat(grs_wgt), obl_decimal_len) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt")), obl_decimal_len);
				grs_wgt1=roundXL(parseFloat(grs_wgt1), obl_decimal_len) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt1")), obl_decimal_len);
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
		
		formObj.pck_ut_cd.value = pckUtCd;
		/*
		 * #27534 이렇게 바뀌어야 하지 않나?? 일단 보류 -타 업체 확인 필요 var cgo_pck_qty='0'; var
		 * meas='0.000000'; var meas1='0'; var grs_wgt='0.000'; var
		 * grs_wgt1='0.000'; for(var i=1; i<=sheetObj.LastRow(); i++){
		 * if(sheetObj.GetCellValue(i, "Del") == 0) {
		 * cgo_pck_qty=parseInt(cgo_pck_qty) +
		 * parseInt(sheetObj.GetCellValue(i,"cgo_pck_qty"));
		 * meas=roundXL(parseFloat(meas), 6) +
		 * roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas")), 6);
		 * meas1=roundXL(parseFloat(meas1), 0) +
		 * roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas1")), 0);
		 * grs_wgt=roundXL(parseFloat(grs_wgt), 3) +
		 * roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt")), 3);
		 * grs_wgt1=roundXL(parseFloat(grs_wgt1), 3) +
		 * roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt1")), 3); } }
		 */ 
		
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
			/*
			 * formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(3));
			 * formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") /
			 / CNVT_CNST_KG_LB, 0); chkComma(formObj.grs_wgt1,8,2);
			 * formObj.grs_wgt1.value=doMoneyFmt(Number(grs_wgt1).toFixed(2));
			 * formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(2));
			 * //roundXL(formObj.grs_wgt1.value.replaceAll(",","") *
			 / CNVT_CNST_KG_LB, 3); chkComma(formObj.grs_wgt,8,3);
			 */
			formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(obl_decimal_len));
			//#2877 [Zimex] after v450, Mismatch kg to lb conversion
			//formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, obl_decimal_len);
			formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, obl_decimal_len);
			/*
			 * #27534 이렇게 바뀌어야 하지 않나?? 일단 보류 -타 업체 확인 필요
			 * formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") /
			 / CNVT_CNST_KG_LB, 3);
			 */ 
			formObj.mk_grs_wgt1.value=formObj.grs_wgt1.value;
			formObj.mk_grs_wgt.value=formObj.grs_wgt.value;
			chkComma(formObj.grs_wgt1,8,obl_decimal_len);	
			formObj.mk_grs_wgt1.value =doMoneyFmt(formObj.mk_grs_wgt1.value);
			formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value);		
			formObj.grs_wgt1.value=doMoneyFmt(Number(grs_wgt1).toFixed(obl_decimal_len));
			formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(obl_decimal_len)); 
			formObj.mk_grs_wgt.value=formObj.grs_wgt.value;
			formObj.mk_grs_wgt1.value=formObj.grs_wgt1.value;
			chkComma(formObj.grs_wgt,8,obl_decimal_len);			
			formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value);
			formObj.mk_grs_wgt1.value = doMoneyFmt(formObj.mk_grs_wgt1.value);	
		}	
		if((colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del") && meas > 0){
			/*
			 * formObj.meas.value=doMoneyFmt(Number(meas).toFixed(3));
			 * formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") *
			 * CNVT_CNST_CBM_CFT, 3); chkComma(formObj.meas1,8,3);
			 * formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(3));
			 * formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") /
			 * CNVT_CNST_CBM_CFT, 3); chkComma(formObj.meas,8,3);
			 */
			formObj.meas.value=doMoneyFmt(Number(meas).toFixed(obl_decimal_len));
			formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, obl_decimal_len);
			formObj.mk_meas1.value=formObj.meas1.value;
			formObj.mk_meas.value=formObj.meas.value;		
			chkComma(formObj.meas1,8,obl_decimal_len);
			formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value);
			formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value);
			formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(obl_decimal_len));
			formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, obl_decimal_len);
			
			chkComma(formObj.meas,8,obl_decimal_len);
			
			formObj.mk_meas.value=formObj.meas.value;
			formObj.mk_meas1.value=formObj.meas1.value;	
			
			formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value);
			formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value);
		}	
		/* jsjang 2013.7.22 요구사항 #15952 Container Info 자동 필드값 반영요건 */
		if((colNm == "cgo_pck_qty" || colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del") && formObj.shp_mod_cd.value =="FCL"){
			fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
			mkSaidTxt(docObjects[2], formObj.sad_txt);
		}	
	}
	/*
	 * jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)
	 * 자동연계요건 End
	 */	
}

function sheet4_OnBeforeCheck(sheetObj, row, col, value){
	var idx = 1;
	if(sheetObj.GetCellValue(row, "conls_ibflag") !="I"){
		return;
	}
	switch (sheetObj.ColSaveName(col)) {
		case "Del" :
			for(var i=1; i<=sheetObj.LastRow() + 1; i++){
				if(i != row){
					sheetObj.SetCellValue(i, 'Seq',idx++);
				}
			}
        break;
	}
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet4_OnSelectMenu(sheetObj, MenuString){
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
		// case "Header Setting Delete":
		// IBS_DelGridSetting(document.fName.user_id.value, getPageURL(),
		// sheetObj);
		// break;
		// 선택된 Column Hidden
	 }
}

var sumCntrFlag = false;
function sumHblValue(){
	if(frm1.intg_bl_seq.value!=''){
		//#2354 [PATENT] House Bill Based - Processing Logic Enhancement
		
		//#3161 [CLT] OEM B/L Entry -Sum버튼 로직 오류 점검
//		sumCntrFlag = true;
//		fnSetIBsheetInit(2);
//		doWork('SEARCH_CNTR');
//		tab3click = "Y";
		
		//Sum of HBL's Container Shipment
		//tab3click = "Y"
		
		//goTabSelect('02');
		
		
		ajaxSendPost(getSumHblCntr, 'reqVal', '&goWhere=aj&bcKey=sumHblCntr&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
		//goTabSelect('01');
		
		//Sum of HBL's Shipment
		ajaxSendPost(getSumHblValue, 'reqVal', '&goWhere=aj&bcKey=sumHblValueSeaExp&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
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
			
			var mk_grs_wgt=roundXL(parseFloat(rtnArray[5]), obl_decimal_len);
			var mk_meas=roundXL(parseFloat(rtnArray[7]), obl_decimal_len);
			var mk_grs_wgt1=roundXL(parseFloat(rtnArray[6]), obl_decimal_len);
			var mk_meas1=roundXL(parseFloat(rtnArray[8]), obl_decimal_len);
			
			formObj.grs_wgt.value=grs_wgt;
			formObj.meas.value=meas;
			formObj.pck_qty.value=pck_qty;
			formObj.grs_wgt1.value=grs_wgt1;
			formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(obl_decimal_len));
			
			chkComma(formObj.grs_wgt,8,obl_decimal_len);
			chkComma(formObj.grs_wgt1,8,obl_decimal_len);
			chkComma(formObj.meas,8,obl_decimal_len);
			
			formObj.mk_grs_wgt.value=Number(mk_grs_wgt).toFixed(obl_decimal_len);
			formObj.mk_grs_wgt1.value=Number(mk_grs_wgt1).toFixed(obl_decimal_len);
			formObj.mk_meas.value=mk_meas;
			formObj.mk_meas1.value=doMoneyFmt(Number(mk_meas1).toFixed(obl_decimal_len));
			
			//#2354 [PATENT] House Bill Based - Processing Logic Enhancement
			formObj.pck_ut_cd.value=rtnArray[9];
		}else{
			// "There is no House B/L."
			alert(getLabel('SEA_COM_ALT024'));
		}
	}
}
//#2354 [PATENT] House Bill Based - Processing Logic Enhancement
function getSumHblCntr(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpList=doc[1].split("@;;@");
			
 			for(var i=1; i<=docObjects[2].LastRow(); i++){
				for(var j=0 ; j<tmpList.length-1 ; j++){
					var tmp=tmpList[j].split("@^^@");
					if(docObjects[2].GetCellValue(i, 'cntr_no') == tmp[0]){
						docObjects[2].SetCellValue(i, 'cgo_pck_qty',tmp[1], 0);
						docObjects[2].SetCellValue(i, 'cgo_pck_ut',tmp[2], 0);
						docObjects[2].SetCellValue(i, 'cgo_wgt',tmp[3], 0);
						docObjects[2].SetCellValue(i, 'cgo_wgt1',tmp[4], 0);
						docObjects[2].SetCellValue(i, 'cgo_meas',tmp[5], 0);
						docObjects[2].SetCellValue(i, 'cgo_meas1',tmp[6], 0);
						docObjects[2].SetCellValue(i, 'vol_meas',tmp[7], 0);
					}
				}
 			}
		}else{
			// "There is no House B/L."
			//alert(getLabel('SEA_COM_ALT024'));
		}
	}
	
	sumCntrFlag = false;
}


function test(){
	if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}
}
function checkTrdpCode(obj){
	/*
	 * if(obj.name=="prnr_trdp_nm"){ }else if(obj.name=="shpr_trdp_nm"){ } else
	 */ 
	if(obj.name=="cnee_trdp_nm"){
		if(frm1.cnee_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.cnee_trdp_addr.value == ""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.cnee_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);
			}
		}
	}
	else if(obj.name=="ntfy_trdp_nm"){
		if(frm1.ntfy_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.ntfy_trdp_addr.value == ""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.ntfy_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);				
			}
		}
	}
	else if(obj.name=="act_shpr_trdp_nm"){
		if(frm1.act_shpr_trdp_cd.value==""){
			//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
			frm1.act_shp_info.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);				
		}
	}
	/*
	 * else if(obj.name=="cust_trdp_nm"){ } else if(obj.name=="lnr_trdp_nm"){ }
	 * else if(obj.name=="carr_trdp_nm"){ } else if(obj.name=="prnr_trdp_nm2"){ }
	 * else if(obj.name=="iss_trdp_nm"){ }else if(obj.name=="third_trdp_nm"){ }
	 */
}
function getMblCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=''){
				// Please check B/L no.! alert
				// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전
				// post_dt 를 Set 한다.
	            setPost_date("I");
				// B/L No. is duplicated. \nDo you want to create MBL?
				if(confirm(getLabel('FMS_COM_ALT008') + getLabel('FMS_COM_CFMCON'))){
	            	   gridAdd(0);
	            	   docObjects[0].SetCellValue(1, 1,1);
	            	   // if(user_role_cd!="ADM"){
	            		   // save post date, office info
	            	   // /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025
						// , 저장 전 post_dt 를 Set 한다.
	            	   // confirm 전에 check;
	            	   /*******************************************************
						 * if(ofc_post_dt=="ETD"){
						 * frm1.post_dt.value=frm1.etd_dt_tm.value; } else
						 * if(ofc_post_dt=="ETA"){
						 * frm1.post_dt.value=frm1.eta_dt_tm.value; }
						 ******************************************************/	   
	            	   // }
	        		   /*
						 * jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장
						 * 가능한 문제 처리
						 */
	        		   var sndParam=getSndParam();
	        		   if(sndParam == true)	{	return false;	}	 
	        		   
	        		   // BL_COPY Form의 Copy_bl_seq를 초기화한다
	        		   if (frm1.copy_bl_seq.value != ""){
	        			   frm1.copy_bl_seq.value = "";
	        		   }
	        		   
	            	   doShowProcess();
	                   frm1.f_cmd.value=ADD;
	            	   // docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt",
						// FormQueryString(frm1)+getSndParam(), false);
	            	   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, false);
	        	   }
			}
			else if(doc[1]=='RV'){
				// Please check B/L no.!!
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_BLNO'));
			}else{
				// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전
				// post_dt 를 Set 한다.
	            setPost_date("I");
				// Do you want to create MBL?
				if(confirm(getLabel(saveMsg))){
            	   gridAdd(0);
            	   docObjects[0].SetCellValue(1, 1,1);
            	   // if(user_role_cd!="ADM"){
            		   // save post date, office info
            	   		// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025
						// , 저장 전 post_dt 를 Set 한다.
            	   		// confirm 전에 check;
            	       /*******************************************************
						 * if(ofc_post_dt=="ETD"){
						 * frm1.post_dt.value=frm1.etd_dt_tm.value; } else
						 * if(ofc_post_dt=="ETA"){
						 * frm1.post_dt.value=frm1.eta_dt_tm.value; }
						 ******************************************************/
            	   // }
        		   /*
					 * jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한
					 * 문제 처리
					 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}	 
        		   
        		   // BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
            	   doShowProcess();
                   frm1.f_cmd.value=ADD;
            	   // docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt",
					// FormQueryString(frm1)+getSndParam(), false);
            	   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, false);
        	   }			
			}
		}
	}
	else{
		// SEE_BMD_MSG43
	}
}
// 25559 NEW가 아닐시 BL중복을 체크한다.
function getMblCheckNoEmpBL(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=''){
				// 중복일 경우 ERROR
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
		// alert(getLabel('SEE_BMD_MSG43'));
	}
}
function getRefNoCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				refCheck=false;
				// Ref. No. is duplicate.
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_REFN'));
				frm1.ref_no.focus();
			}
			else{
				refCheck=true;
			}
		}
	}
	else{
		// SEE_BMD_MSG43
		refCheck=false;
	}
}
// Conatiner 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet4_OnKeyDown(sheetObj, row, col, keyCode){
	// 마지막 Cell에서 Tab했을 경우 Tab 이벤트 때문에 SelectCell에서 지정한 Cell의 다음 Index로 포커스 이동됨.
	// OnTab 이벤트로 변경처리함 (YJW 2017.02.15)
	/*
	 * if(sheetObj.LastRow()== row && "cntr_rmk" == sheetObj.ColSaveName(col)){
	 * if(keyCode==9){ //#42686 cntrGridAdd(sheetObj); //gridAdd(2);
	 * sheetObj.SelectCell(sheetObj.LastRow(), 0); } }
	 */
	switch (sheetObj.ColSaveName(col)) {
		case "cgo_pck_qty" :
		case "cgo_wgt" :
		case "cgo_wgt1" :
		case "cgo_meas" :
		case "cgo_meas1" :
			if (keyCode == 189 || keyCode == 109) {
				// Input data must be greater than 0.
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
		// #42686
		cntrGridAdd(sheetObj);
		// gridAdd(2);
		sheetObj.SelectCell(sheetObj.LastRow(), 0);
	}
}

function copyFromHBL(){
	if(frm1.intg_bl_seq.value!=''){
		ajaxSendPost(getHblDesc, 'reqVal', '&goWhere=aj&bcKey=getHblDescList&f_air_sea_clss_cd=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+frm1.ref_no.value+'&shp_mod_cd='+frm1.shp_mod_cd.value, './GateServlet.gsl');
	}
}
function getHblDesc(reqVal){
	
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	
	//#3231 [CLT] #2354 - 1 master - multi master FCL건 Mark 항목 병합 오류
	var orgMkTxt = formObj.mk_txt.value;
	formObj.mk_txt.value   = '';
	formObj.desc_txt.value = '';
	
	if(doc[0]=='OK'){
		
		if(typeof(doc[1])!='undefined'){
			
			var rtnArr = doc[1].split('@@;');			
			var dataArr = new Array();
			
			if(rtnArr.length == 1){
				dataArr = rtnArr[0].split('^@');
				formObj.desc_txt.value = dataArr[1];
				formObj.mk_txt.value   = dataArr[0];
			}else{
				//#2354 [PATENT] House Bill Based - Processing Logic Enhancement
				var newLine = String.fromCharCode(13);
				var space = String.fromCharCode(160);
				var strData = '';
				var mkData = '';
				
				dataArr = rtnArr[0].split('^@');
				// #1712 [CLT] OEM B/L - COPY FROM HBL 버튼 로직 보완
				// formObj.mk_txt.value = dataArr[0];
				
				for(var i=0; i<rtnArr.length; i++){
					dataArr = rtnArr[i].split('^@');
					
					if(fnIsNotNull(dataArr[2])){
						
						if(frm1.shp_mod_cd.value != 'FCL'){
							strData += '#' + (i+1) + '/' + rtnArr.length + space + dataArr[3];
							strData += newLine;
							strData += dataArr[1];
							strData += newLine;
							strData += newLine;
							
//							#3231 [CLT] #2354 - 1 master - multi master FCL건 Mark 항목 병합 오류
//							mkData += '#' + (i+1) + '/' + rtnArr.length + space + dataArr[3];
//							mkData += newLine;
//							mkData += dataArr[0];
//							mkData += newLine;
//							mkData += newLine;
							
						}else{
							strData += newLine;
							strData += dataArr[1];
							strData += newLine;
							
//							#3231 [CLT] #2354 - 1 master - multi master FCL건 Mark 항목 병합 오류
//							mkData += newLine;
//							mkData += dataArr[0];
//							mkData += newLine;
						}
					}
				}
//				#3231 [CLT] #2354 - 1 master - multi master FCL건 Mark 항목 병합 오류
				formObj.desc_txt.value = strData;
//				formObj.mk_txt.value = mkData;
				formObj.mk_txt.value = orgMkTxt;
			}
		}
	}
	else{
		// SEE_BMD_MSG43
		refCheck=false;
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
			   // invoice 생성 유무를 체크한다.
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
	            	   submitForm(REMOVE);
	        	   }
    		   }else{
    			   // You Cannot delete B/L. Because Invoice was already
					// Issued.
    			   alert(getLabel('FMS_COM_ALT022'));
    			   return;
    		   }
// if(confirm(getLabel('FMS_COM_CFMDEL'))){
// frm1.f_cmd.value = REMOVE;
// doShowProcess();
// frm1.submit();
// }
		   }
		   else{
			   // Please delete the HB/L in advance.
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
function cntrGridCopy(sheetObj){
	if(frm1.shp_mod_cd.value=="FCL"){
 		var orgCnt=sheetObj.LastRow() + 1;
		var intRows=orgCnt;
		
		var row = sheetObj.GetSelectRow();
		var copyCnt = parseInt(intRows,10)+ parseInt(frm1.copy_cnt.value,10);
		
		if(intRows==0){
			cntrGridAdd(sheetObj);
		}
		else if(intRows<3 && typeof(sheetObj.GetCellValue(intRows, 'cntr_no'))=="undefined"){
			cntrGridAdd(sheetObj);
		}
		else{
			
			for(var i=intRows; i< copyCnt ; i++){
				var curRow=sheetObj.DataInsert();			
			
			sheetObj.SetCellValue(curRow, 'cntr_tpsz_cd',sheetObj.GetCellValue(row, 'cntr_tpsz_cd'),0);
			
			sheetObj.SetCellValue(curRow, 'rc_flg' ,sheetObj.GetCellValue(row, 'rc_flg'),0);
			sheetObj.SetCellValue(curRow, 'temp_val' ,sheetObj.GetCellValue(row, 'temp_val'),0);
			sheetObj.SetCellValue(curRow, 'temp_cd' ,sheetObj.GetCellValue(row, 'temp_cd'),0);			
			sheetObj.SetCellValue(curRow, 'mgset_flg' ,sheetObj.GetCellValue(row, 'mgset_flg'),0);			
			sheetObj.SetCellValue(curRow, 'vent_cd' ,sheetObj.GetCellValue(row, 'vent_cd'),0);			
			sheetObj.SetCellValue(curRow, 'ca_flg' ,sheetObj.GetCellValue(row, 'ca_flg'),0);			
			sheetObj.SetCellValue(curRow, 'air_flow' ,sheetObj.GetCellValue(row, 'air_flow'),0);			
			sheetObj.SetCellValue(curRow, 'air_flow_unit' ,sheetObj.GetCellValue(row, 'air_flow_unit'),0);			
			sheetObj.SetCellValue(curRow, 'humid' ,sheetObj.GetCellValue(row, 'humid'),0);	
			
			sheetObj.SetCellValue(curRow, 'cgo_pck_qty',sheetObj.GetCellValue(row, 'cgo_pck_qty'),0);
			sheetObj.SetCellValue(curRow, 'cgo_pck_ut',sheetObj.GetCellValue(row, 'cgo_pck_ut'),0);
			sheetObj.SetCellValue(curRow, 'cgo_wgt',sheetObj.GetCellValue(row, 'cgo_wgt'),0);
			sheetObj.SetCellValue(curRow, 'cgo_wgt1',sheetObj.GetCellValue(row, 'cgo_wgt1'),0);
			sheetObj.SetCellValue(curRow, 'cgo_meas',sheetObj.GetCellValue(row, 'cgo_meas'),0);
			sheetObj.SetCellValue(curRow, 'cgo_meas1',sheetObj.GetCellValue(row, 'cgo_meas1'),0);
			sheetObj.SetCellValue(curRow, 'vol_meas',sheetObj.GetCellValue(row, 'vol_meas'),0);
			sheetObj.SetCellValue(curRow, 'intg_bl_seq',sheetObj.GetCellValue(row, 'intg_bl_seq'),0);
			
			//Editable setting
			sheetObj.SetCellEditable(curRow,"rc_flg",sheetObj.GetCellEditable(row, 'rc_flg'));
			sheetObj.SetCellEditable(curRow,"temp_val",sheetObj.GetCellEditable(row, 'temp_val'));
			sheetObj.SetCellEditable(curRow,"temp_cd",sheetObj.GetCellEditable(row, 'temp_cd'));
			sheetObj.SetCellEditable(curRow,"mgset_flg",sheetObj.GetCellEditable(row, 'mgset_flg'));
			sheetObj.SetCellEditable(curRow,"vent_cd",sheetObj.GetCellEditable(row, 'vent_cd'));
			sheetObj.SetCellEditable(curRow,"ca_flg",sheetObj.GetCellEditable(row, 'ca_flg'));
			sheetObj.SetCellEditable(curRow,"air_flow",sheetObj.GetCellEditable(row, 'air_flow'));
			sheetObj.SetCellEditable(curRow,"air_flow_unit",sheetObj.GetCellEditable(row, 'air_flow_unit'));
			sheetObj.SetCellEditable(curRow,"humid",sheetObj.GetCellEditable(row, 'humid'));
		}
	  }
		frm1.copy_cnt.value = 1;
	}
}
/*
 * 2012.03.21 Master Freight Tab 추가
 */
function getSdSheet(){
	fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
	return docObjects[4];
}
function getBcSheet(){
	fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
	return docObjects[5];
}
function getDcSheet(){
	fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
	return docObjects[6];
}
function sheet7_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, '', 'S', 'O', 'M');
	}else{
		mutiSheetOnClick(sheetObj, row, col, '');
	}
	
// mutiSheetOnClick(sheetObj, row, col, '');
}
function sheet7_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, '');
}
function sheet7_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'M');
	}
	
// mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'M');
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
				// Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
		case "fr_frt_term_cd" :
			//#3573 OE FRT AR Bill To 재정의
			if(sheetObj.GetCellValue(row,'fr_frt_term_cd')=='PP'){
				sheetObj.SetCellValue(row, 'fr_trdp_cd',frm1.act_shpr_trdp_cd.value);
				sheetObj.SetCellValue(row, 'fr_trdp_nm',frm1.act_shpr_trdp_nm.value);
				
				//#4958 [JTC] request for defalt setting auto to show A/R Curr.
				if(MULTI_CURR_FLAG == 'Y') {
					sheetObj.SetCellValue(row, 'fr_inv_curr_cd', ofc_locl_curr_cd, 0);
				}
			}
			//CC면 Destination Agent, Destination Agent 없으면 Consignee 로 세팅
			else if (sheetObj.GetCellValue(row,'fr_frt_term_cd')=='CC'){
				if(frm1.prnr_trdp_cd.value != ''){
					sheetObj.SetCellValue(row, 'fr_trdp_cd',frm1.prnr_trdp_cd.value);
					sheetObj.SetCellValue(row, 'fr_trdp_nm',frm1.prnr_trdp_nm.value);
				}else {
					sheetObj.SetCellValue(row, 'fr_trdp_cd',frm1.cnee_trdp_cd.value);
					sheetObj.SetCellValue(row, 'fr_trdp_nm',frm1.cnee_trdp_nm.value);
				}

				//#4958 [JTC] request for defalt setting auto to show A/R Curr.
				if(MULTI_CURR_FLAG == 'Y') {
					sheetObj.SetCellValue(row, 'fr_inv_curr_cd', 'USD', 0);
				}
			}
		break;
	}
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;

	//#3411 [JTC]Accounting & Performance 수정사항
	//Unit - CNTR 선택시 사용자가 더 큰 값입력 가능하도록 변경 및 취소시 변경전 값 설정
	mutiSheetOnChange(sheetObj, row, col, '', 'S', 'O', 'M', OldValue);
	if(sheetObj.ColSaveName(col) == "fr_inv_sum_amt"){
		isCalculateProfit = 2;
		calculateProfit();
	}
}
function sheet7_OnSearchEnd(sheetObj, row, col) {	
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
	
	console.log(sheetObj.GetCellValue(2,"fr_inv_xcrt_dt"));
	// BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, '', 'S', 'O', 'M');
	} 	

	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "fr_att_file_1", 0);
	}
	console.log(sheetObj.GetCellValue(2,"fr_inv_xcrt_dt"));
}
function sheet7_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}
function sheet7_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "fr_frt_check" == sheetObj.ColSaveName(col)){
			// gridAdd(4);
			// sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('ROWADD', docObjects[4], 'S', 'O', 'M');
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
				// Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
function sheet8_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "b_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col-1, 'b_', 'S', 'O', 'M');
	}else{
		mutiSheetOnClick(sheetObj, row, col, 'b_');
	}
	
// mutiSheetOnClick(sheetObj, row, col, 'b_');
}
function sheet8_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'b_');
}
function sheet8_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "b_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'O', 'M');
	}

// mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'O', 'M');
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
			/*
			 * if (value < 0) { //Input data must be greater than 0.
			 * alert(getLabel("FMS_COM_ALT042")); sheetObj.SetCellValue(row,
			 * col,"",0); return; }
			 */
			break;
		
		case "b_fr_frt_term_cd" :

			//#4958 [JTC] request for defalt setting auto to show A/R Curr.
			if(MULTI_CURR_FLAG == 'Y') {
				if(sheetObj.GetCellValue(row,'b_fr_frt_term_cd')=='PP'){
					sheetObj.SetCellValue(row, 'b_fr_inv_curr_cd', ofc_locl_curr_cd, 0);
				} else if (sheetObj.GetCellValue(row,'b_fr_frt_term_cd')=='CC') {
					sheetObj.SetCellValue(row, 'b_fr_inv_curr_cd', 'USD', 0);
				}
			}
			break;
	}
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;

	//#3411 [JTC]Accounting & Performance 수정사항
	//Unit - CNTR 선택시 사용자가 더 큰 값입력 가능하도록 변경 및 취소시 변경전 값 설정
	mutiSheetOnChange(sheetObj, row, col,  'b_', 'S', 'O', 'M', OldValue);
	if(sheetObj.ColSaveName(col) == "b_fr_inv_sum_amt"){
		isCalculateProfit = 2;
		calculateProfit();
	}
}
function sheet8_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
	
	// BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, 'b_', 'S', 'O', 'M');
	}	
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "b_fr_att_file_1", 0);
	}
	
	calculateProfit();
}
function sheet8_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
}
function sheet8_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="b_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "b_fr_frt_check" == sheetObj.ColSaveName(col)){
			// gridAdd(5);
			// sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('BCROWADD', docObjects[5], 'S', 'O', 'M');
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
			/*
			 * if (keyCode == 189 || keyCode == 109) { //Input data must be
			 * greater than 0. alert(getLabel("FMS_COM_ALT042"));
			 * sheetObj.SetCellValue(row, col,"",0); return; }
			 */
		break;
	}
}
function sheet9_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "dc_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, 'dc_', 'S', 'O', 'M');
	}else{
		mutiSheetOnClick(sheetObj, row, col, '');
	}
	
// mutiSheetOnClick(sheetObj, row, col, 'dc_');
}
function sheet9_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'dc_');
}
function sheet9_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "dc_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'M');
	}

// mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'M');
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
				// Input data must be greater than 0.
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
	mutiSheetOnChange(sheetObj, row, col,  'dc_', 'S', 'O', 'M', OldValue);
	isCalculateProfit = 2;
	calculateProfit();
}
function sheet9_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
	
	// BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, 'dc_', 'S', 'O', 'M');
	}
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "dc_fr_att_file_1", 0);
	}
	
	calculateProfit();
}
function sheet9_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
}
function sheet9_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="dc_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "dc_fr_frt_check" == sheetObj.ColSaveName(col)){
			// gridAdd(6);
			// sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('DCROWADD', docObjects[6], 'S', 'O', 'M');
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
				// Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
function sheet10_OnSearchEnd(sheetObj, row, col) {
	// Container Type Size 설정
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
	
	fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
	docObjects[4].SetColProperty("fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[5].SetColProperty("b_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[6].SetColProperty("dc_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
}

/**
 * Container Sheet Object를 리턴함
 */
function getCrtrSheet(){
	// BL_COPY
	if (frm1.copy_bl_seq.value == ""){
		fnSetIBsheetInit(7);   // grid가 생성되지않았으면 생성(속도개선)
		return docObjects[7];
	} else {
		
		// CNTR의 Unit Combo정보를 담을 Sheet를 만든다.
		fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(7);   // grid가 생성되지않았으면 생성(속도개선)
		var curSheet = docObjects[2];
		var frtSheet = docObjects[7];
		
		// sheet를 초기화한다.
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
			param += "&f_bnd_clss_cd=O";
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
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
			param += "&bl_frt_yn=Y";  //#3973 [JAPT]Invoice Date & Ex.Rate
			/*
			 * #20961 Ocean Export Master and Ocean Import Master 에서 A/P Invoice
			 * 화면 이동 시, Vendor Inv No 가 null 이면(#22112에 의해 조건 수정) Vndr Invoice
			 * No 에 MBL# 세팅
			 */
// if(sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no') != '' ){ //Pierpass 인경우
// Container No 가 Vendor Invoice No 로 자동 셋업됨.
			if(sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no') != '' && sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no') != '-1'){		// Pierpass
																																			// 인경우
																																			// Container
																																			// No 가
																																			// Vendor
																																			// Invoice
																																			// No 로
																																			// 자동
																																			// 셋업됨.
				param += "&s_inv_no=" +  sheetObj.GetCellValue(firstIdx, 'b_fr_buy_inv_no');
// }else if (chk_fr_inv_no == undefined || chk_fr_inv_no == "undefined" ||
// chk_fr_inv_no == "") {
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
			param += "&f_bnd_clss_cd=O";
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
	fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
	var arObj=docObjects[4];
	var apObj=docObjects[5];
	var dcObj=docObjects[6];
	switch(obj){
		case "LOCAL":
			//[SENWA] Freight tab에서 invoice 버튼을 클릭햇을 경우.
			if(arObj.GetSelectRow() > 0 && arObj.GetCellValue(arObj.GetSelectRow(), "fr_inv_seq")!=""){
				var param="&f_inv_seq=" + arObj.GetCellValue(arObj.GetSelectRow(), "fr_inv_seq");
				var paramStr="./ACC_INV_0010.clt?f_cmd="+param;
				parent.mkNewFrame('A/R Entry', paramStr);
			}
			break;
		case "AP":
			if(apObj.GetSelectRow() > 0 && apObj.GetCellValue(apObj.GetSelectRow(), "b_fr_inv_seq")!=""){
				var param="&f_inv_seq=" + apObj.GetCellValue(apObj.GetSelectRow(), "b_fr_inv_seq");
				var paramStr="./ACC_INV_0030.clt?f_cmd="+param;
				parent.mkNewFrame('A/P Entry(Cost)', paramStr);
			}
			break;
		case "DC":
			if(dcObj.GetSelectRow() > 0 && dcObj.GetCellValue(dcObj.GetSelectRow(), "dc_fr_inv_seq")!=""){
				var param="&f_inv_seq=" + dcObj.GetCellValue(dcObj.GetSelectRow(), "dc_fr_inv_seq");
				var paramStr="./ACC_INV_0020.clt?f_cmd="+param;
				parent.mkNewFrame('D/C Note Entry', paramStr);
			}
			break;
	}
}
function searchGrid(gridIdx){
	switch(gridIdx){
		case 6:
			// Freight될 Container 조회
			frm1.f_cmd.value=SEARCHLIST01;
			fnSetIBsheetInit(7);   // grid가 생성되지않았으면 생성(속도개선)
 			docObjects[7].DoSearch("./SEE_FRT_0010GS.clt", FormQueryString(frm1) );
		break;
		case 7:
			// Selling/Debit Freight 조회
			frm1.f_cmd.value=SEARCHLIST07;
			fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)			
 			docObjects[4].DoSearch("./SEE_BMD_0040_7GS.clt", FormQueryString(frm1) );
			break;
		case 8:
			// Buying/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST08;
			fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
 			docObjects[5].DoSearch("./SEE_BMD_0040_8GS.clt", FormQueryString(frm1) );
			break;
		case 9:
			// Debit/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST09;
			fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
 			docObjects[6].DoSearch("./SEE_BMD_0040_9GS.clt", FormQueryString(frm1) );
			break;
		/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
		case 10:
			// Status List 조회
			frm1.f_cmd.value=SEARCHLIST10;
			fnSetIBsheetInit(8);   // grid가 생성되지않았으면 생성(속도개선)
 			docObjects[8].DoSearch("./SEE_BMD_0026_1GS.clt", FormQueryString(frm1) );
			break;	
		// #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
		case 11:
			// WorkOrder List 조회
			frm1.f_cmd.value=SEARCHLIST08;
			fnSetIBsheetInit(9);   // grid가 생성되지않았으면 생성(속도개선)
 			docObjects[9].DoSearch("./SEE_BMD_0025GS.clt", FormQueryString(frm1) );
 			break;	
		case 13:
			// Commodity List 조회
			fnSetIBsheetInit(11);   // grid가 생성되지않았으면 생성(속도개선)
			setItemCntrList();
			frm1.f_cmd.value=SEARCHLIST12;
 			docObjects[11].DoSearch("./SEE_BMD_0040_5GS.clt", FormQueryString(frm1) );
			break;
		case 14:
			// Commodity List 조회 #1024 [PATENT] Booking Entry 개선 및 Quotation
			// Audit 기능 개발
			fnSetIBsheetInit(11);   // grid가 생성되지않았으면 생성(속도개선)
			setItemCntrList();
			frm1.f_cmd.value=SEARCHLIST13;
			docObjects[11].DoSearch("./SEE_BMD_0040_5GS.clt", FormQueryString(frm1) );
			break;
		case 15:
			//처리내역( Job temlate에 따라서)
			frm1.f_cmd.value=SEARCHLIST14;
			fnSetIBsheetInit(12);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[12].DoSearch("./SEE_BMD_0040_10GS.clt", FormQueryString(frm1) );
		break;			
	}
}
var mailTo="";
function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}
		else{
			mailTo=doc[1];
		}
	}
}
function setBillingCarrier(){
	var formObj=document.frm1;
	// #23721 요건변경됨.
	// formObj.carr_trdp_cd.value = formObj.lnr_trdp_cd.value;
	// formObj.carr_trdp_nm.value = formObj.lnr_trdp_nm.value;
}
function blTpChange(blTp){
/*
 * var formObj=document.frm1; if(blTp == "DR"){ //Direct
 * formObj.agent_trdp_cd.className="search_form";
 * formObj.agent_trdp_nm.className="search_form";
 * formObj.prnr_trdp_cd.className="search_form";
 * formObj.prnr_trdp_nm.className="search_form";
 * formObj.agent_trdp_cd.readOnly=false; formObj.agent_trdp_nm.readOnly=false;
 * formObj.prnr_trdp_cd.readOnly=false; formObj.prnr_trdp_nm.readOnly=false;
 * }else{ formObj.agent_trdp_cd.className="search_form-disable";
 * formObj.agent_trdp_nm.className="search_form-disable";
 * formObj.prnr_trdp_cd.className="search_form-disable";
 * formObj.prnr_trdp_nm.className="search_form-disable";
 * formObj.agent_trdp_cd.readOnly=true; formObj.agent_trdp_nm.readOnly=true;
 * formObj.prnr_trdp_cd.readOnly=true; formObj.prnr_trdp_nm.readOnly=true;
 * formObj.agent_trdp_cd.value=""; formObj.agent_trdp_nm.value="";
 * formObj.prnr_trdp_cd.value=""; formObj.prnr_trdp_nm.value="";
 * formObj.agent_trdp_addr.value=""; }
 */
}
/* jsjang 2013.7.22 요구사항 #15952 Container Info 자동 필드값 반영요건 */
function setPacQty(){
	var formObj=document.frm1;
	if(formObj.shp_mod_cd.value !="FCL")
	{
		// formObj.sad_txt.value = formObj.pck_qty.value + " " +
		// formObj.pck_ut_cd.options[formObj.pck_ut_cd.selectedIndex].text;
		fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
		mkSaidTxt(docObjects[2], formObj.sad_txt);
	}
}
var NEXT_BLOCK_DT="";    	// MAX(BLOCK_DT)+1
/**
 * LHK, 20131025 #21734 [BINEX]Post Date Check 로직 적용 File Block_dt 와 Post Date
 * 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1,
 * MAX(POST_DT) 중 가장 최근 Date을 Set
 */
function setPost_date(save_flag){
	var formObj=document.frm1;
	
	if(save_flag == "I"){
		if(ofc_post_dt=="ETD"){
			formObj.post_dt.value=formObj.etd_dt_tm.value;
		} else if(ofc_post_dt=="ETA"){
			formObj.post_dt.value=formObj.eta_dt_tm.value;
		// 25273 OFC_CD변경시 TODAY에 대한 고려가 없어서 추가
		} else if(ofc_post_dt=="TODAY"){
			// LHK, 20140924 #43960 [DYNAMIC] Post Date 변경
			if(formObj.post_dt.value==""){
				formObj.post_dt.value=getTodayStr();
			}
		}
	}else if(save_flag == "U"){
		if(ofc_post_dt=="ETD"){
			if (frm1.etd_dt_tm.value != frm1.org_etd_dt_tm.value ){
				formObj.post_dt.value=formObj.etd_dt_tm.value;
			}			
		} else if(ofc_post_dt=="ETA"){
			if (frm1.eta_dt_tm.value != frm1.org_eta_dt_tm.value ){
				formObj.post_dt.value=formObj.eta_dt_tm.value;
			}
		}
	}
	

 	// Update 인 경우 post date 가 변경된 경우에만 post date 비교 처리로직 적용.
 	if(save_flag == "U"){
 		if(formObj.post_dt.value == formObj.org_post_dt.value){	
 			return;
 		}
 	}
	
	// 검증
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

// 2016.04.21 C.W.Park Added
// #52109 로직 수정
function setBlock_dt(chkValid){

	var formObj=document.frm1;
	
	if(chkValid){
		// formObj.org_post_dt.value != "" 의 경우 Update
		if(formObj.org_post_dt.value != ""){
			formObj.post_dt.value = formObj.org_post_dt.value	
		}
	}
	
	// MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	var param = formObj.ref_ofc_cd.value;
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt&searchOfcCd=' + param, './GateServlet.gsl');
	if(formObj.post_dt.value == ""){
		formObj.post_dt.value = NEXT_BLOCK_DT;
		formObj.org_post_dt.value = NEXT_BLOCK_DT;
	}
	if(NEXT_BLOCK_DT != "") { 
		// post_dt 와 block_dt 비교
// fromDate > toDate true
		if(compareTwoDate(NEXT_BLOCK_DT, formObj.post_dt.value)){
			formObj.post_dt.value=NEXT_BLOCK_DT;
		}
	}
	
}

function ofcChDEta() {
	var formObj=document.frm1;
	var ofc_cd=formObj.ref_ofc_cd.options[formObj.ref_ofc_cd.selectedIndex].text;
	ajaxSendPost(getExpPostRef, 'reqVal', '&goWhere=aj&bcKey=getExpPostRef&f_ofc_cd='+ofc_cd, './GateServlet.gsl');
}
function getExpPostRef(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]!=''){
				ofc_post_dt=doc[1];
			}
		}
	}
}
function checkDuplicateLinerBkgNo(){
	var formObj=document.frm1;
	linerBkgNoDup = false;
	linerBkgNoDupFlg = "N";
	frm1.linerBkgNoDupFlg.value=linerBkgNoDupFlg;
	if(formObj.lnr_bkg_no.value != ""){
		if(formObj.lnr_bkg_no.value != formObj.org_lnr_bkg_no.value){
			ajaxSendPost(checkDuplicateLinerBkgNoEnd, 'reqVal', '&goWhere=aj&bcKey=searchDuplicateLinerBkgNo&lnr_bkg_no='+formObj.lnr_bkg_no.value+'&air_sea_clss_cd='+'S' , './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN Carrier Bkg NO 중복체크
 */
function checkDuplicateLinerBkgNoEnd(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			// 조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				linerBkgNoDupFlg='Y'
				frm1.linerBkgNoDupFlg.value=linerBkgNoDupFlg;
				// DUP BKG No ==> proceed with Confirmation.
				if( !confirm( (getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CBKNO') + '\n'+ getLabel('FMS_COM_CFMPRO'))  ) ){
					formObj.lnr_bkg_no.value=formObj.org_lnr_bkg_no.value;
					formObj.lnr_bkg_no.select();
					linerBkgNoDup = true;
				}
			}
		}
	}
}
/**
 * MB/L No 기입하면, MB/L 넘버의 Prefix(첫 4 캐릭터)를 Carrier 항목(Code)에 자동 기입되도록. (Carrier
 * 가 비어 있는 경우에만)
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
// #27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
/**
 * Work Order 화면이동
 */
function sheet12_OnDblClick(sheetObj, row, col){
	/*
	 * var param='f_wo_no=' + sheetObj.GetCellValue(row, 'wo_no'); param +=
	 * '&air_sea_clss_cd=S'; param += '&bnd_clss_cd=O'; param +=
	 * '&biz_clss_cd=M'; var
	 * paramStr="./AIC_WOM_0010.clt?f_cmd="+SEARCH+"&"+param;
	 * parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
	 */
   	var paramStr="./AIC_WOM_0010.clt?air_sea_clss_cd=S&bnd_clss_cd=O&biz_clss_cd=M";
    var param = "&f_cmd=" + SEARCH;
    param += "&f_wo_no=" + sheetObj.GetCellValue(row, 'wo_no');
    parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
}

/*
 * on board date, vsl name clean on board 내용을 만들어 준다.
 */
function cobChange(){
	// #30284 [BINEX]OEH On-Board Date 동기화
	var formObj = document.frm1;
	formObj.clean_on_board.value = sea_cob;
	formObj.clean_on_board.value += "\r\n";
	formObj.clean_on_board.value += mkCharDateFormat(formObj.etd_dt_tm.value);
	formObj.clean_on_board.value += "\r\n";		
	formObj.clean_on_board.value += "-------------------";
	if(vsl_show_flg=="Y"){
		formObj.clean_on_board.value += "\r\n";
		formObj.clean_on_board.value += formObj.trnk_vsl_nm.value + " " + formObj.trnk_voy.value;
	}
	if(load_port_show_flg=="Y"){
		formObj.clean_on_board.value += "\r\n";
		formObj.clean_on_board.value += formObj.pol_nm.value;
	}
			
	// formObj.obrd_dt_tm1.value = formObj.obrd_dt_tm.value;

}
// #1542 [Split - 1] [PATENT] 0215_09 OEM B/L Entry - Additional Items
function chgOnboard(obj)
{
	var formObj=document.frm1;
	formObj.obrd_dt_tm.value=formObj.etd_dt_tm.value;
	cobChange();
}

// BL_COPY
function selectCopyBLFrt(){
	 openBlCopyPopUp("COPY_CONFIRM_POPUP_4",this,this);
}

// BL_COPY
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
			// #1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
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
					// Selling/Debit Freight 조회
					frm1.f_cmd.value=SEARCHLIST07;
					fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
		 			docObjects[4].DoSearch("./SEE_BMD_0040_7GS.clt", FormQueryString(frm1) );		 			
				}
				
				if (apFrt_copy_chk == "Y") {
					// Buying/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST08;
					fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
		 			docObjects[5].DoSearch("./SEE_BMD_0040_8GS.clt", FormQueryString(frm1) );
				}
				
				if (dcFrt_copy_chk == "Y") {
					// Debit/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST09;
					fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
		 			docObjects[6].DoSearch("./SEE_BMD_0040_9GS.clt", FormQueryString(frm1) );
				}
				// #1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				if (shpmt_itm_copy_chk == "Y" || mrk_des_copy_chk == "Y" || rmk_copy_chk == "Y") {

					//#2682 [CLA DEMO] BL COPY POP UP DOES NOT CLOSE
					ajaxSendPost(getMblCopyInfo, 'reqVal', '&goWhere=aj&bcKey=getMblCopyInfo&f_intg_bl_seq='+frm1.intg_bl_seq.value+'&bnd_clss_cd='+'O', './GateServlet.gsl');
//				    frm1.f_cmd.value=COMMAND12;					
//					var xml = sheet1.GetSearchData("./SEE_BMD_0040_6GS.clt",FormQueryString(frm1));		
//					var xmlDoc = $.parseXML(xml);					 
//					var $xml = $(xmlDoc);
					
					var mblValue = mblInfo.split("^@");
 
//					 if($xml.find("result").text() == "1" ){
						if(shpmt_itm_copy_chk == "Y"){
							
							isCopy = true;							
//							formObj.pck_ut_cd.value = $xml.find("pck_ut_cd").text();
//							formObj.pck_qty.value = ($xml.find("pck_qty").text() == "" ? "0": doMoneyFmt(Number($xml.find("pck_qty").text()).toFixed(0)));
//							formObj.grs_wgt.value = ($xml.find("grs_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt").text()).toFixed(3)));
//							formObj.grs_wgt1.value = ($xml.find("grs_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt1").text()).toFixed(3)));
//							formObj.meas.value = ($xml.find("meas").text() == "" ? "0": doMoneyFmt(Number($xml.find("meas").text()).toFixed(3)));
//							formObj.meas1.value = ($xml.find("meas1").text() == "" ? "0": doMoneyFmt(Number($xml.find("meas1").text()).toFixed(0)));
//							
//							formObj.mk_grs_wgt.value = ($xml.find("grs_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt").text()).toFixed(3)));
//							formObj.mk_grs_wgt1.value = ($xml.find("grs_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt1").text()).toFixed(3)));
//							formObj.mk_meas.value = ($xml.find("meas").text() == "" ? "0": doMoneyFmt(Number($xml.find("meas").text()).toFixed(3)));
//							formObj.mk_meas1.value = ($xml.find("meas1").text() == "" ? "0": doMoneyFmt(Number($xml.find("meas1").text()).toFixed(0)));
							
							formObj.pck_ut_cd.value = mblValue[6];
							formObj.pck_qty.value = (mblValue[7] == "" ? "0": doMoneyFmt(Number(mblValue[7]).toFixed(0)));
							formObj.grs_wgt.value = (mblValue[8] == "" ? "0": doMoneyFmt(Number(mblValue[8]).toFixed(obl_decimal_len)));
							formObj.grs_wgt1.value = (mblValue[9] == "" ? "0": doMoneyFmt(Number(mblValue[9]).toFixed(obl_decimal_len)));
							formObj.meas.value = (mblValue[10] == "" ? "0": doMoneyFmt(Number(mblValue[10]).toFixed(obl_decimal_len)));
							formObj.meas1.value = (mblValue[11] == "" ? "0": doMoneyFmt(Number(mblValue[11]).toFixed(obl_decimal_len)));
							
							formObj.mk_grs_wgt.value = (mblValue[8] == "" ? "0": doMoneyFmt(Number(mblValue[8]).toFixed(obl_decimal_len)));
							formObj.mk_grs_wgt1.value = (mblValue[9] == "" ? "0": doMoneyFmt(Number(mblValue[9]).toFixed(obl_decimal_len)));
							formObj.mk_meas.value = (mblValue[10] == "" ? "0": doMoneyFmt(Number(mblValue[10]).toFixed(obl_decimal_len)));
							formObj.mk_meas1.value = (mblValue[11] == "" ? "0": doMoneyFmt(Number(mblValue[11]).toFixed(obl_decimal_len)));
						}						
						if(mrk_des_copy_chk == "Y"){
//							formObj.sad_txt.value = $xml.find("sad_txt").text();
//							formObj.mk_grs_wgt.value = ($xml.find("mk_grs_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("mk_grs_wgt").text()).toFixed(obl_decimal_len)));
//							formObj.mk_grs_wgt1.value = ($xml.find("mk_grs_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("mk_grs_wgt1").text()).toFixed(obl_decimal_len)));
//							formObj.mk_meas.value = ($xml.find("mk_meas").text() == "" ? "0": doMoneyFmt(Number($xml.find("mk_meas").text()).toFixed(obl_decimal_len)));
//							formObj.mk_meas1.value = ($xml.find("mk_meas1").text() == "" ? "0": doMoneyFmt(Number($xml.find("mk_meas1").text()).toFixed(obl_decimal_len)));
//							formObj.mk_txt.value = $xml.find("mk_txt").text();
//							formObj.desc_txt.value = $xml.find("desc_txt").text();
//							formObj.wgt_disp_cd.value = $xml.find("wgt_disp_cd").text();
							
							formObj.sad_txt.value = mblValue[12];
							formObj.mk_grs_wgt.value = (mblValue[8] == "" ? "0": doMoneyFmt(Number(mblValue[8]).toFixed(obl_decimal_len)));
							formObj.mk_grs_wgt1.value = (mblValue[9] == "" ? "0": doMoneyFmt(Number(mblValue[9]).toFixed(obl_decimal_len)));
							formObj.mk_meas.value = (mblValue[10] == "" ? "0": doMoneyFmt(Number(mblValue[10]).toFixed(obl_decimal_len)));
							formObj.mk_meas1.value = (mblValue[11] == "" ? "0": doMoneyFmt(Number(mblValue[11]).toFixed(obl_decimal_len)));
							formObj.mk_txt.value = mblValue[17];
							formObj.desc_txt.value = mblValue[18];
							formObj.wgt_disp_cd.value = mblValue[19];
						}
						if(rmk_copy_chk == "Y"){
//							formObj.rmk.value = $xml.find("rmk").text();
							
							formObj.rmk.value = mblValue[21];
						}
//					 }
				}
				frm1.intg_bl_seq.value = tmpIntgBlSeq;	
				
				//#2348 [IMPEX] Pop up error message not closing after click OK
				cntrTpSzFlag = true;
			}
		}
	}
}


// BL_COPY frt에 설정할 콤보를 만든다.
function setFrtCntrUnitCombo(sheetObj){
	
	// Container Type Size 설정
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
	fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
	docObjects[4].SetColProperty("fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[5].SetColProperty("b_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[6].SetColProperty("dc_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
}

// 화면의 checkbox를 database 값으로 셋팅한다.
function checkBoxSetting(){
	var formObj=document.frm1;
	if(formObj.ctrb_ratio_yn.value=="Y"){
		formObj.ctrb_ratio_yn.checked=true;
	}else{
		formObj.ctrb_ratio_yn.checked=false;
	}
	if(formObj.rlsd_flg.value=="Y"){
		formObj.rlsd_flg.checked=true;
	}else{
		formObj.rlsd_flg.checked=false;
	}
	/*#657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL (S)*/
	if(formObj.inter_use_flag.value=="Y"){
		formObj.inter_use_flag.checked=true;
	}else{
		formObj.inter_use_flag.checked=false;
	}
	/*#657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL (E)*/
}


function setExpressTpCdVal(reqVal){
  var doc=getAjaxMsgXML(reqVal);

  if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
	  INST_PROFIT = doc[1];
  }else{
	  INST_PROFIT = "N";
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

/*
 * #2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB
 * No., HB/L No생성 로직
 */
function setBkgNoFlg(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		bkg_new_hbl_no_flg = doc[1];
	}else{
		bkg_new_hbl_no_flg = "N";
	}
}

function calculateProfit(){
	isCalculateProfit++;
	if(isCalculateProfit == 3){
		var Account_Receivable = 0;
		var Account_Payable = 0;
		var Debit_Amount = 0;
		var Credit_Amount = 0;
		for (var i=0;i < sheet7.RowCount();i++){
			Account_Receivable += parseFloat(sheet7.GetRowJson(i+2).fr_inv_sum_amt);
		}
		
		for (var i=0;i < sheet9.RowCount();i++){
			Debit_Amount += parseFloat(sheet9.GetRowJson(i+2).dc_fr_inv_sum_amt);
			Credit_Amount += parseFloat(sheet9.GetRowJson(i+2).dc_fr_agent_amt);
		}
		
		for (var i=0;i < sheet8.RowCount();i++){
			Account_Payable += parseFloat(sheet8.GetRowJson(i+2).b_fr_inv_sum_amt);
		}
		document.frm1.profit.value = Number(Account_Receivable - Account_Payable +  Debit_Amount - Credit_Amount).toFixed(2);
		chkComma(document.frm1.profit, 100, 2);
		isCalculateProfit=0;
	}
}

var isCalculateProfit = 0;



// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
function chkIntgBlModiTms(flag){
	var returnVal=true;
	var formObj=document.frm1; 
	var intg_bl_seq =  formObj.intg_bl_seq.value;
 	 
	if (flag == "VIEW"){ // 조회시
		ajaxSendPost(getIntgBlViewModiTms, 'reqVal', '&goWhere=aj&bcKey=searchIntgBlSeqModiTms&intg_bl_seq='+intg_bl_seq, './GateServlet.gsl');  
	}else{ // 수정 삭제시
		ajaxSendPost(getIntgBlModiTms, 'reqVal', '&goWhere=aj&bcKey=searchIntgBlSeqModiTms&intg_bl_seq='+intg_bl_seq, './GateServlet.gsl');
		// alert(vIntgBlModiTms + " "+frm1.trx_modi_tms.value);
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
	// alert(frm1.trx_modi_tms.value);
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
	
var cur_row = 0;
var cur_col = 0;
function sheet13_OnPopupClick(sheetObj,Row,Col){
	cur_row = Row;
    switch (sheetObj.ColSaveName(Col)) {
	    case "vgm_am_trdp_cd" :
	        rtnary=new Array();
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
	   		callBackFunc = "setVgmAmTrdpCd";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	    break;
	    case "vgm_spc_trdp_cd" :
	    	rtnary=new Array();
	    	rtnary[0]="1";
	    	rtnary[1]="";
	    	rtnary[2]=window;
	    	callBackFunc = "setVgmSpcTrdpCd";
	    	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	    	break;
    }
}


function sheet13_OnChange(sheetObj, Row, Col){
	switch (sheetObj.ColSaveName(Col)) {
		case "vgm_am_trdp_cd" :
			var codeStr =  sheetObj.GetCellValue(Row, Col);
			doAutoSearch(sheetObj, Row, Col, 'trdpcode', codeStr, 'vgm_am_trdp_cd', 'vgm_am_trdp_nm');	
		break;
    	case "vgm_spc_trdp_cd" :
    		var codeStr =  sheetObj.GetCellValue(Row, Col);
			doAutoSearch(sheetObj, Row, Col, 'trdpcode', codeStr, 'vgm_spc_trdp_cd', 'vgm_spc_trdp_nm');	
		break;
	}
}

//Job Visibility 
function sheet15_OnChange(sheetObj, row, col, value) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "jb_sts_nm"){
		for(var i=1; i<=sheetObj.LastRow(); i++){
			if(i != row){
if(sheetObj.GetCellValue(i,"jb_sts_nm") == sheetObj.GetCellValue(row,"jb_sts_nm")){
					//Duplication Task 
					alert(getLabel('FMS_COM_ALT008'));
					sheetObj.SetCellValue(row,"jb_sts_nm","");
				}
			}
		}
	}
}
function sheet15_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="modi_usrid"){
		gridAdd(12);
		sheetObj.SelectCell(row+1, 1);
	}
}
function setVgmAmTrdpCd(rtnVal){
	if (rtnVal == null) {
	 	return;
	}else{
		fnSetIBsheetInit(10);   // grid가 생성되지않았으면 생성(속도개선)
		var rtnValAry=rtnVal.split("|");
		docObjects[10].SetCellValue(cur_row, "vgm_am_trdp_cd",rtnValAry[0],0);
		docObjects[10].SetCellValue(cur_row, "vgm_am_trdp_nm",rtnValAry[2],0);
	}
}

function setVgmSpcTrdpCd(rtnVal){
	if (rtnVal == null) {
	 	return;
	}else{   	
		fnSetIBsheetInit(10);   // grid가 생성되지않았으면 생성(속도개선)
		var rtnValAry=rtnVal.split("|");
		docObjects[10].SetCellValue(cur_row, "vgm_spc_trdp_cd",rtnValAry[0],0);
		docObjects[10].SetCellValue(cur_row, "vgm_spc_trdp_nm",rtnValAry[2],0);
	}
}

// VGM Cntr정보를 동기화 한다.
function syncCntrToVgm(){

	fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(10);   // grid가 생성되지않았으면 생성(속도개선)
	var cntrSheet = docObjects[2];
	var vgmSheet  = docObjects[10];
	
	
	var cntrSeqCnt = cntrSheet.LastRow();	
	var vgmSeqCnt = vgmSheet.LastRow();	
	
	
	if (cntrSeqCnt > vgmSeqCnt) {
		for (var i = vgmSeqCnt; i<cntrSeqCnt; i++){
			vgmSheet.DataInsert();
		}
	}
	
	
	for(var i=1; i<= cntrSheet.LastRow(); i++){
		
		var vgmDBSeq = cntrSheet.GetCellValue(i, 'cntr_list_seq');	
		var vgmListSeq = cntrSheet.GetCellValue(i, 'Seq');	
		for (var j=1; j<= vgmSheet.LastRow(); j++){
			var cntrDBSeq = vgmSheet.GetCellValue(j, 'cntr_list_seq');	
			var cntrListSeq = vgmSheet.GetCellValue(j, 'Seq');	

			if (vgmDBSeq == cntrDBSeq) {
				
				if (vgmDBSeq == ""){
					if (vgmListSeq == cntrListSeq){
						// CNTR_LIST_SEQ가 없다면 신규 Row이므로 기본값 설정
						vgmSheet.SetCellValue(j,"cntr_no",cntrSheet.GetCellValue(i, 'cntr_no'),0);
						// vgmSheet.SetCellValue(j,"seal_no1",cntrSheet.GetCellValue(i,
						// 'seal_no1'),0);
						// vgmSheet.SetCellValue(j,"seal_no2",cntrSheet.GetCellValue(i,
						// 'seal_no2'),0);
						vgmSheet.SetCellValue(j,"vgm_method","1",0);
						vgmSheet.SetCellValue(j,"vgm_cntr_tp","2",0);
						vgmSheet.SetCellValue(j,"vgm_cgo_wgt_tp","KGS",0);
						vgmSheet.SetCellValue(j,"vgm_seq",cntrSheet.GetCellValue(i, 'vgm_seq'),0);
						vgmSheet.SetCellValue(j,"vgm_spc_trdp_cd",frm1.shpr_trdp_cd.value,0);
						vgmSheet.SetCellValue(j,"vgm_spc_trdp_nm",frm1.shpr_trdp_nm.value,0);
					}
				} else {
					// CNTR_LIST_SEQ가 있다면 Cntr No, Seal No만 update
					vgmSheet.SetCellValue(j,"cntr_no",cntrSheet.GetCellValue(i, 'cntr_no'),0);
					// vgmSheet.SetCellValue(j,"seal_no1",cntrSheet.GetCellValue(i,
					// 'seal_no1'),0);
					// vgmSheet.SetCellValue(j,"seal_no2",cntrSheet.GetCellValue(i,
					// 'seal_no2'),0);
				}				
			}
		}
	}
}
/**
 * 열 추가시 Container 번호가 Container List에 있는지 확인함
 */
var cntrListed=false;
function setItemCntrList(){
	if(!cntrListed){
		fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
		var cntrListObj=docObjects[2];
 		var cntrSize=cntrListObj.LastRow() + 1;
		var cntrCd='';
		var cntrLabel='';
		if(cntrSize>1){
			var hasCntr=false;
			for(var i=1; i < cntrSize; i++){
				// 26239 HiddenRow면 무시
				if(!cntrListObj.GetRowHidden(i)) {
					if(cntrListObj.GetCellValue(i, 'cntr_list_seq')!=''){
						if(hasCntr){
							cntrCd    += '|';
							cntrLabel += '|';
						}else{
							hasCntr=true;
						}
						cntrLabel+= cntrListObj.GetCellValue(i, 'cntr_no');
						cntrCd   += cntrListObj.GetCellValue(i, 'cntr_list_seq');
					}				
				}
			}
			if(hasCntr){
				fnSetIBsheetInit(11);   // grid가 생성되지않았으면 생성(속도개선)
				docObjects[11].InitDataCombo (0, 'item_cntr_list_seq', cntrLabel, cntrCd);
				cntrListed=true;
			}
		}
	}
}
function cmdtRowAdd(){
	setItemCntrList();
	if(cntrListed){
		// #1901 [Seamark] Modify Item List in the container of OEH B/L Entry
		var sheetObj2 = docObjects[2];
		var sheetObj3 = docObjects[11];
		var intRows=sheetObj3.LastRow() + 1;
		sheetObj3.DataInsert(intRows);
		
		sheetObj3.SetCellValue(intRows, "item_pck_qty", 	sheetObj2.GetCellValue(1, "cgo_pck_qty"))
		sheetObj3.SetCellValue(intRows, "item_pck_ut_cd", 	sheetObj2.GetCellValue(1, "cgo_pck_ut"))
		sheetObj3.SetCellValue(intRows, "item_wgt", 		sheetObj2.GetCellValue(1, "cgo_wgt"))
		sheetObj3.SetCellValue(intRows, "item_lbs_wgt", 	sheetObj2.GetCellValue(1, "cgo_wgt1"))
		sheetObj3.SetCellValue(intRows, "item_meas", 		sheetObj2.GetCellValue(1, "cgo_meas"))
		sheetObj3.SetCellValue(intRows, "item_cft_meas", 	sheetObj2.GetCellValue(1, "cgo_meas1"))
	}
	else{
		// 먼저 Container List를 등록하여 주십시오!
		alert(getLabel('SEA_COM_ALT013'));
	}
}
function cmdtLoadPO(){
	setItemCntrList();
	
	if(cntrListed){
		rtnary=new Array(9);
		rtnary[0]=frm1.cnee_trdp_cd.value;
		rtnary[1]=frm1.cnee_trdp_nm.value;
		rtnary[2]=frm1.shpr_trdp_cd.value;
		rtnary[3]=frm1.shpr_trdp_nm.value;
		
		if (frm1.bkg_seq.value == ""){
			rtnary[4]="XX";
		} else{
			rtnary[4]=frm1.bkg_seq.value;
		}
		
		// rtnary[4]=frm1.por_cd.value;
		// rtnary[5]=frm1.por_nm.value;
		// rtnary[6]=frm1.del_cd.value;
		// rtnary[7]=frm1.del_nm.value;
		callBackFunc = "PO_POPLIST";
		modal_center_open('./CMM_POP_0400.clt', rtnary, 1300,500,"yes");
	}
	else{
		// 먼저 Container List를 등록하여 주십시오!
		alert(getLabel('SEA_COM_ALT013'));
	}
}

function PO_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		fnSetIBsheetInit(11);   // grid가 생성되지않았으면 생성(속도개선)
		var rtnValAry=rtnVal.split("^^");
		var idx=docObjects[11].LastRow() + 1;
		
		for (var i=0; i < rtnValAry.length; i++) {
			if(rtnValAry[i] == ""){
				break;
			}
			gridAdd(11);
			
			var Seq = docObjects[11].GetCellValue(idx-1, "Seq");
			
			var itemArr=rtnValAry[i].split("@@");
			docObjects[11].SetCellValue(idx, "Seq",Number(idx == 2 ? "0" : docObjects[11].GetCellValue(idx-1, "Seq")) + 1,0);
			docObjects[11].SetCellValue(idx, "item_cust_po_no",itemArr[0],0);
			docObjects[11].SetCellValue(idx, "item_cmdt_cd",itemArr[1],0);
			docObjects[11].SetCellValue(idx, "item_cmdt_nm",itemArr[2],0);
			docObjects[11].SetCellValue(idx, "item_pck_qty",itemArr[3],0);
			docObjects[11].SetCellValue(idx, "item_pck_ut_cd",itemArr[4],0);
			docObjects[11].SetCellValue(idx, "item_pck_inr_qty",itemArr[5],0);
			docObjects[11].SetCellValue(idx, "item_ea_cnt",itemArr[6],0);
			docObjects[11].SetCellValue(idx, "item_ttl_qty",itemArr[7],0);
			docObjects[11].SetCellValue(idx, "item_wgt",itemArr[8],0);
			docObjects[11].SetCellValue(idx, "item_lbs_wgt",itemArr[9],0);
			docObjects[11].SetCellValue(idx, "item_meas",itemArr[10],0);
			docObjects[11].SetCellValue(idx, "item_cft_meas",itemArr[11],0);
			docObjects[11].SetCellValue(idx, "item_hs_grp_cd",itemArr[12],0);
			docObjects[11].SetCellValue(idx, "item_shp_cmdt_cd",itemArr[13],0);
			docObjects[11].SetCellValue(idx, "item_shp_cmdt_nm",itemArr[14],0);
			docObjects[11].SetCellValue(idx, "item_po_cmdt_seq",itemArr[15],0);
			docObjects[11].SetCellValue(idx, "item_po_sys_no",itemArr[16],0);
			idx++;
		}
	}
}

function sheet14_OnSearchEnd(sheetObj) {
	// #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발
	if(frm1.c_create.value=="Y"){
		frm1.c_bkg_seq.value="";
		frm1.c_create.value="";
		// setItemCntrList();
	}

	// setItemCntrList();
}
function sheet14_OnPopupClick(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	// Item 코드
	if(colStr=="item_cmdt_cd"){
		gridPopCall(sheetObj, row, col, 'item_cmdt_cd');
	} 
	// HTS 코드(Commidity)
	else if(colStr=="item_shp_cmdt_cd"){
		gridPopCall(sheetObj, row, col, 'item_shp_cmdt_cd');
	}
}
function sheet14_OnKeyUp(sheetObj, row, col, keyCode) {
	// doAutoComplete(sheetObj, row, col, keyCode);
}
function sheet14_OnChange(sheetObj, row, col, value){
	switch (sheetObj.ColSaveName(col)) {
		case "item_shp_cmdt_cd" :
			doItemSearch(sheetObj, row, "commodity", value);
		break;
		
		case "item_cmdt_cd" :
			ajaxSendPost(searchCustItem, 'reqVal', '&goWhere=aj&bcKey=getWHItem&ctrt_no=&itm_cd='+sheetObj.GetCellValue(row, "item_cmdt_cd"), './GateServlet.gsl');
			// var row = sheetObj.GetSelectRow();
			// var xml = loadDftItmVal(sheetObj, value);
			// displayDftItmVal(xml,sheetObj,row);
		break;
		
		case "item_pck_qty" :
		case "item_pck_inr_qty" :
		case "item_ea_cnt" :
		case "item_wgt" :
		case "item_lbs_wgt" :
		case "item_meas" :
		case "item_cft_meas" :
			if (value < 0) {
				// Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
		case "item_cntr_list_seq" : 
			// #1901 [Seamark] Modify Item List in the container of OEH B/L
			// Entry
			var cntr_no = sheetObj.GetCellValue(row, "item_cntr_list_seq");
			var sheetObj2 = docObjects[2];
			var totRow = sheetObj2.LastRow() + 1;
			var toRow = 0;
			for(var i=1; i < totRow ; i++){
				if( cntr_no == sheetObj2.GetCellValue(i, "cntr_list_seq") ){
					toRow = i;
					break;
				}
			}
			
			sheetObj.SetCellValue(row, "item_pck_qty", 		sheetObj2.GetCellValue(toRow, "cgo_pck_qty"))
			sheetObj.SetCellValue(row, "item_pck_ut_cd", 	sheetObj2.GetCellValue(toRow, "cgo_pck_ut"))
			sheetObj.SetCellValue(row, "item_wgt", 			sheetObj2.GetCellValue(toRow, "cgo_wgt"))
			sheetObj.SetCellValue(row, "item_lbs_wgt", 		sheetObj2.GetCellValue(toRow, "cgo_wgt1"))
			sheetObj.SetCellValue(row, "item_meas", 		sheetObj2.GetCellValue(toRow, "cgo_meas"))
			sheetObj.SetCellValue(row, "item_cft_meas", 	sheetObj2.GetCellValue(toRow, "cgo_meas1"))
		break;
	}
	
	var colStr=sheetObj.ColSaveName(col);
	switch (sheetObj.ColSaveName(col)) {
		case "item_pck_qty" :
		case "item_pck_inr_qty" :
		case "item_ea_cnt" :
			var ttl_qty = (Number(sheetObj.GetCellValue(row, "item_pck_qty")) * Number(sheetObj.GetCellValue(row, "item_pck_inr_qty"))) + Number(sheetObj.GetCellValue(row, "item_ea_cnt"));
			if (ttl_qty >=  10000000) {
				ComShowCodeMessage('COM03230');
				if(colStr == 'item_pck_qty') {
					sheetObj.SetCellValue(row,"item_pck_qty",0);
				} else if(colStr == 'item_pck_inr_qty') {
					sheetObj.SetCellValue(row,"item_pck_inr_qty",0);
				} else if(colStr == 'item_ea_cnt') {
					sheetObj.SetCellValue(row,"item_ea_cnt",0);
				}
				return;
			} else {
				sheetObj.SetCellValue(row, "item_ttl_qty", ttl_qty, 0);
			}
		break;
	}
	
	
	// Item 코드(Commidity)
	if(colStr=="item_dg_cd_tp"){
		if(sheetObj.GetCellValue(row, "item_dg_cd_tp")=='U'||sheetObj.GetCellValue(row, "item_dg_cd_tp")=='I'){
			sheetObj.SetCellEditable(row, "item_dg_cd",1);
		}else{
			sheetObj.SetCellValue(row, "item_dg_cd",'');
		}
	}else if(colStr=="item_dg_cd"){
		if(sheetObj.GetCellValue(row, "item_dg_cd")!=''){
			if(sheetObj.GetCellValue(row, "item_dg_cd_tp")!='U'&&sheetObj.GetCellValue(row, "item_dg_cd_tp")!='I'){
				// Please select Type first!
				alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TYPE'));
				sheetObj.SetCellValue(row, "item_dg_cd",'',0);
			}
		}
	}else if(colStr=="item_wgt"){
		//#2877 [Zimex] after v450, Mismatch kg to lb conversion
		//sheetObj.SetCellValue(row, "item_lbs_wgt",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, 2),0);
		sheetObj.SetCellValue(row, "item_lbs_wgt",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len),0);
		if (sheetObj.GetCellValue(row, "item_lbs_wgt") >99999999.99) {
			alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));				
			sheetObj.SetCellValue(row, "item_wgt","",0);
			sheetObj.SelectCell(row, "item_wgt");
		}
	}else if(colStr=="item_lbs_wgt"){
		sheetObj.SetCellValue(row, "item_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len),0);
			
	}else if(colStr=="item_meas"){
		sheetObj.SetCellValue(row, "item_cft_meas",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_CBM_CFT, 3),0);
		if (sheetObj.GetCellValue(row, "item_cft_meas") > 999999.999999) {
			alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGMEAS'));
			sheetObj.SetCellValue(row, "item_meas","",0);
			sheetObj.SelectCell(row, "item_meas");
		}
	}else if(colStr=="item_cft_meas"){
		sheetObj.SetCellValue(row, "item_meas",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_CBM_CFT, 3),0);
	}
}

function sheet14_OnClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="item_dg_cd"){
		if(sheetObj.GetCellValue(row, "item_dg_cd_tp")!='U'&&sheetObj.GetCellValue(row, "item_dg_cd_tp")!='I'){
			// Please select Type first!
			alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_TYPE'));
		}
	} else if(colStr=="item_cmdt_cd" || colStr=="item_shp_cmdt_cd"){
		if (sheetObj.GetCellValue(row, "item_po_cmdt_seq") == "") {
			sheetObj.SetCellEditable(row, colStr, 1);
		} else {
			sheetObj.SetCellEditable(row, colStr, 0);
		}
	}
}

function sheet14_OnKeyDown(sheetObj, row, col, keyCode) {
	switch (sheetObj.ColSaveName(col)) {
		case "item_pck_qty" :
		case "item_pck_inr_qty" :
		case "item_ea_cnt" :
		case "item_wgt" :
		case "item_lbs_wgt" :
		case "item_meas" :
		case "item_cft_meas" :
			if (keyCode == 189 || keyCode == 109) {
				// Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="item_dg_cd"){
		cmdtRowAdd();
		sheetObj.SelectCell(row+1, 1);
	}
}

function sheet14_OnBeforeEdit(sheetObj,Row, Col){
	if(sheetObj.ColSaveName(Col) == 'item_rmk'){
		sheetObj.SetRowHeight(Row, 75);
	} else {
		sheetObj.SetRowHeight(Row, 26);
	}
}

function sheet14_OnAfterEdit(sheetObj,Row, Col){
	if(sheetObj.ColSaveName(Col) == 'item_rmk'){
		var cellStr = sheetObj.GetCellValue(Row,Col);		
		var rowVal = (cellStr.match(/\n/g) == null ? 1 : cellStr.match(/\n/g).length +1) * 20;
		sheetObj.SetRowHeight(Row, rowVal);
	}
}

function checkLnrBkgNo(obj){
	if(frm1.lnr_bkg_no.value!=""){
		ajaxSendPost(getLnrBkgNoInfo, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgNoInfo&f_lnr_bkg_no='+frm1.lnr_bkg_no.value, './GateServlet.gsl');
	}else{
		frm1.lnr_bkg_no.value = "";
		frm1.bkg_seq.value = "";
	}
}

// #2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB
// No., HB/L No생성 로직
function bindBkgNewHblNoFlg(p_ref_no){
	
}

function getLnrBkgNoInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var result = doc[1].split('^^');

			//#3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가
			//Booking Status 가 BL Created 인 경우, Carrier Bkg No를 할당하지 않는다.
			if(result =="DPBKG"){
				alert("There are more than 1 carrier bookings with " + frm1.lnr_bkg_no.value + "\nSelect the Booking by using Pop-up Search.");
				return;
			}
			if ('BL' == result[66]){
				if(!confirm(getLabel('FMS_COM_ALT142'))){
					frm1.lnr_bkg_no.value = '';
					return;
				}
			/*
			 
			 	frm1.lnr_bkg_no.value = '';
				frm1.bkg_seq.value = '';
			//#3524 - 2
				frm1.org_bkg_seq.value = '';
			*/
			} 
			//Booking Status 가 Confirmed인 경우, Carrier Bkg No를 할당한다. -- 기존 로직
			frm1.lnr_bkg_no.value = result[0];// lnr_bkg_no
			frm1.bkg_seq.value = result[2];// bkg_seq
			// frm1.org_lnr_bkg_no.value = result[0];//lnr_bkg_no
			// frm1.bkg_dt_tm.value = modiStrDateType(result[3], 1);//bkg_dt_tm
			frm1.lnr_trdp_cd.value = result[4];// lnr_trdp_cd
			frm1.lnr_trdp_nm.value = result[5];// lnr_trdp_nm
			frm1.cust_ref_no.value = result[9]; // cust_ref_no
			frm1.sc_no.value = result[16]; // lnr_ctrt_no
			frm1.agent_trdp_cd.value = result[17]; // fwrd_agn_trdp_cd
			frm1.agent_trdp_nm.value = result[18]; // fwrd_agn_trdp_nm
			frm1.agent_trdp_addr.value = result[19]; // fwrd_agn_trdp_addr
			frm1.prnr_trdp_cd.value = result[20]; // prnr_trdp_cd
			frm1.prnr_trdp_nm.value = result[21]; // prnr_trdp_nm
			frm1.trnk_vsl_cd.value = result[22]; // trnk_vsl_cd
			frm1.trnk_vsl_nm.value = result[23]; // trnk_vsl_nm
			frm1.trnk_voy.value = result[24]; // trnk_voy
			frm1.por_cd.value = result[25]; // por_cd
			frm1.por_nm.value = result[26]; // por_nm
			frm1.pol_cd.value = result[27]; // pol_cd
			frm1.pol_nm.value = result[28]; // pol_nm
			frm1.pod_cd.value = result[29]; // pod_cd
			frm1.pod_nm.value = result[30]; // pod_nm
			frm1.del_cd.value = result[31]; // del_cd
			frm1.del_nm.value = result[32]; // del_nm
			frm1.etd_por_tm.value = modiStrDateType(result[35], 1);// etd_por_tm
			frm1.etd_dt_tm.value = modiStrDateType(result[36], 1);// etd_dt_tm
			frm1.eta_dt_tm.value = modiStrDateType(result[37], 1);// eta_dt_tm
			frm1.rep_cmdt_cd.value = result[40]; //rep_cmdt_cd
			frm1.rep_cmdt_nm.value = result[41]; //rep_cmdt_nm
			frm1.frt_term_cd.value = result[42]; // frt_term_cd
			frm1.fm_svc_term_cd.value = result[51]; // fm_svc_term_cd
			frm1.to_svc_term_cd.value = result[52]; // to_svc_term_cd
			// frm1.cargo_tp_cd.value = result[53]; //cargo_tp_cd
			// frm1.cntr_info.value = result[54]; //cntr_info
			
			frm1.carr_trdp_cd.value = result[56];
			frm1.carr_trdp_nm.value = result[57];
			frm1.carr_trdp_addr.value = result[58];
			frm1.act_shpr_trdp_cd.value = result[59];
			frm1.act_shpr_trdp_nm.value = result[60];
			frm1.hbl_tp_cd.value = result[61];
			frm1.nomi_flg.value = result[62];
			frm1.shp_mod_cd.value = result[63];
			// #1423 hsk
			frm1.opr_usrid.value = result[64]; // Issued by를 bkg의 assignee로 세팅
			
			// #1424 - OEM Entry 에 Booked by 항목 추가 (Carrier Booking 의 Issued by
			// 정보)
			frm1.bk_usrid.value = result[65];
						
			//#3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가
			frm1.obrd_dt_tm.value = modiStrDateType(result[35], 1);//etd_por_tm
			frm1.rcv_wh_cd.value = result[75];
			frm1.rcv_wh_nm.value = result[76];
			frm1.cntr_info.value = result[54];
			frm1.pu_trdp_cd.value = result[77];
			frm1.pu_trdp_nm.value = result[78];
			frm1.vgm_cut_off_dt.value = modiStrDateType(result[67], 1);
			frm1.vgm_cut_off_tm.value = result[68];
			frm1.doc_cut_off_dt.value = modiStrDateType(result[69], 1);
			frm1.doc_cut_off_tm.value = result[70];
			frm1.rail_cut_off_dt.value = modiStrDateType(result[71], 1);
			frm1.rail_cut_off_tm.value = result[72];
			frm1.port_open_dt.value = modiStrDateType(result[73], 1);
			frm1.port_open_tm.value = result[74];
			frm1.cut_off_dt.value = modiStrDateType(result[79], 1);
			frm1.cut_off_tm.value = result[80];
			frm1.obrd_dt_tm.value = modiStrDateType(result[81], 1);
			
			timeCheck(frm1.cut_off_tm);
			timeCheck(frm1.vgm_cut_off_tm);
			timeCheck(frm1.doc_cut_off_tm);
			timeCheck(frm1.rail_cut_off_tm);
			timeCheck(frm1.port_open_tm);
			
			//if (frm1.hbl_tp_cd.value != "DR") {
			//#3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가
			//if (!(frm1.hbl_tp_cd.value == "DR" || frm1.hbl_tp_cd.value == "FW" || frm1.hbl_tp_cd.value == "DT")) {	
				frm1.shpr_trdp_cd.value = result[6]; // shpr_trdp_cd
				frm1.shpr_trdp_nm.value = result[7]; // shpr_trdp_nm
				frm1.shpr_trdp_addr.value = result[8]; // shpr_trdp_addr
				frm1.cnee_trdp_cd.value = result[10]; // cnee_trdp_cd
				frm1.cnee_trdp_nm.value = result[11]; // cnee_trdp_nm
				frm1.cnee_trdp_addr.value = result[12]; // cnee_trdp_addr
				frm1.ntfy_trdp_cd.value = result[13]; // ntfy_trdp_cd
				frm1.ntfy_trdp_nm.value = result[14]; // ntfy_trdp_nm
				frm1.ntfy_trdp_addr.value = result[15]; // ntfy_trdp_addr
				frm1.fnl_dest_loc_cd.value = result[33]; // fnl_dest_loc_cd
				frm1.fnl_dest_loc_nm.value = result[34]; // fnl_dest_loc_nm
				frm1.pck_qty.value = result[43]; // pck_qty
				frm1.pck_ut_cd.value = result[44]; // pck_ut_cd
				frm1.grs_wgt_ut_cd.value = result[45]; // grs_wgt_ut_cd
				frm1.grs_wgt.value = result[46]; // grs_wgt
				frm1.grs_wgt1.value = result[47]; // grs_wgt1
				frm1.meas_ut_cd.value = result[48]; // meas_ut_cd
				frm1.meas.value = result[49]; // meas
				frm1.meas1.value = result[50]; // meas1
				frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(2));
			    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(2));
			    frm1.meas.value=doMoneyFmt(Number(frm1.meas.value).toFixed(3));
			    frm1.meas1.value=doMoneyFmt(Number(frm1.meas1.value).toFixed(0));
			    
			    frm1.mk_grs_wgt.value = frm1.grs_wgt.value;
			    frm1.mk_grs_wgt1.value = frm1.grs_wgt1.value;
			    frm1.mk_meas.value = frm1.meas.value;
			    frm1.mk_meas1.value = frm1.meas1.value;
			//}
			
			//#4899 ** [Binex] Carrier Booking Entry to have Customer Ref. No., Export References No., Agent Ref. No. 
			frm1.exp_ref_no.value = result[82]; // exp_ref_no
			frm1.prnr_ref_no.value = result[83]; // prnr_ref_no
			//#5289 - [Binex] Errors when retrieving Customer Booking on OEH BL Entry (Duc Nguyen)
			frm1.obl_tp_cd.value = result[84]; // obl_tp_cd
			    
			bindBkgCntrData();
			bindBkgFrtData();
			

			// #2895 
		    ajaxSendPost(setBkgPoInfo, 'reqVal', '&goWhere=aj&bcKey=getBkgPoInfo&bkg_seq='+result[2], './GateServlet.gsl');
		    ajaxSendPost(setBkgItemInfo, 'reqVal', '&goWhere=aj&bcKey=getBkgItemInfo&bkg_seq='+result[2], './GateServlet.gsl');
			
		}else{
			// frm1.lnr_bkg_no.value = "";//lnr_bkg_no
			// frm1.org_lnr_bkg_no.value = "";//lnr_bkg_no
			frm1.bkg_seq.value = "";// bkg_seq
			// frm1.bkg_dt_tm.value = "";//bkg_dt_tm
			/*
			 * frm1.lnr_trdp_cd.value = "";//lnr_trdp_cd frm1.lnr_trdp_nm.value =
			 * "";//lnr_trdp_nm frm1.cust_ref_no.value = ""; //cust_ref_no
			 * frm1.sc_no.value = ""; //lnr_ctrt_no frm1.agent_trdp_cd.value =
			 * ""; //fwrd_agn_trdp_cd frm1.agent_trdp_nm.value = "";
			 * //fwrd_agn_trdp_nm frm1.agent_trdp_addr.value = "";
			 * //fwrd_agn_trdp_addr frm1.prnr_trdp_cd.value = ""; //prnr_trdp_cd
			 * frm1.prnr_trdp_nm.value = ""; //prnr_trdp_nm
			 * frm1.trnk_vsl_cd.value = ""; //trnk_vsl_cd frm1.trnk_vsl_nm.value =
			 * ""; //trnk_vsl_nm frm1.trnk_voy.value = ""; //trnk_voy
			 * frm1.por_cd.value = ""; //por_cd frm1.por_nm.value = ""; //por_nm
			 * frm1.pol_cd.value = ""; //pol_cd frm1.pol_nm.value = ""; //pol_nm
			 * frm1.pod_cd.value = ""; //pod_cd frm1.pod_nm.value = ""; //pod_nm
			 * frm1.del_cd.value = ""; //del_cd frm1.del_nm.value = ""; //del_nm
			 * frm1.etd_por_tm.value = "";//etd_por_tm frm1.etd_dt_tm.value =
			 * "";//etd_dt_tm frm1.eta_dt_tm.value = "";//eta_dt_tm
			 * //frm1.rep_cmdt_cd.value = ""; //rep_cmdt_cd
			 * //frm1.rep_cmdt_nm.value = ""; //rep_cmdt_nm
			 * frm1.frt_term_cd.value = ""; //frt_term_cd
			 * frm1.fm_svc_term_cd.value = ""; //fm_svc_term_cd
			 * frm1.to_svc_term_cd.value = ""; //to_svc_term_cd
			 * //frm1.cargo_tp_cd.value = ""; //cargo_tp_cd
			 * //frm1.cntr_info.value = ""; //cntr_info
			 * 
			 * if (frm1.hbl_tp_cd.value != "DR") { frm1.shpr_trdp_cd.value = "";
			 * //shpr_trdp_cd frm1.shpr_trdp_nm.value = ""; //shpr_trdp_nm
			 * frm1.shpr_trdp_addr.value = ""; //shpr_trdp_addr
			 * frm1.cnee_trdp_cd.value = ""; //cnee_trdp_cd
			 * frm1.cnee_trdp_nm.value = ""; //cnee_trdp_nm
			 * frm1.cnee_trdp_addr.value = ""; //cnee_trdp_addr
			 * frm1.ntfy_trdp_cd.value = ""; //ntfy_trdp_cd
			 * frm1.ntfy_trdp_nm.value = ""; //ntfy_trdp_nm
			 * frm1.ntfy_trdp_addr.value = ""; //ntfy_trdp_addr
			 * frm1.fnl_dest_loc_cd.value = ""; //fnl_dest_loc_cd
			 * frm1.fnl_dest_loc_nm.value = ""; //fnl_dest_loc_nm
			 * frm1.pck_qty.value = ""; //pck_qty frm1.pck_ut_cd.value = "";
			 * //pck_ut_cd frm1.grs_wgt_ut_cd.value = ""; //grs_wgt_ut_cd
			 * frm1.grs_wgt.value = ""; //grs_wgt frm1.grs_wgt1.value = "";
			 * //grs_wgt1 frm1.meas_ut_cd.value = ""; //meas_ut_cd
			 * frm1.meas.value = ""; //meas frm1.meas1.value = ""; //meas1 }
			 */
		}  
			
	}else{
	}

}

function fncLnrBkgSearch() {
	var formObj  = document.frm1;
	
	if ( event.keyCode == 13 && formObj.lnr_bkg_no.value != null ) {
		srOpenPopUp('LNRBKNO_POPLIST',this);
	}
}

function bindBkgCntrData(){
	if (frm1.bkg_seq.value != ""){
		ajaxSendPost(getLnrBkgCntrList, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgCntrList&bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');
	}
	
	tab3click = "Y";
}

function getLnrBkgCntrList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpList=doc[1].split("@;;@");
			
			fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
			
			// #4810 [Binex LA] OEM BL entry carrier bkg no serach condition error
			for (var i=1; i<docObjects[2].LastRow() + 1 ; i++) {		
				if (docObjects[2].GetCellValue(i, 'conls_ibflag') != 'I') {
					docObjects[2].SetCellValue(i, 'conls_ibflag','D');
					docObjects[2].SetRowHidden(i,1);
				} else {
					docObjects[2].RowDelete(i, false);
					i--;
				}
			}
			
			for(var i=0 ; i<tmpList.length-1 ; i++){
				var tmp=tmpList[i].split("@^^@");
				var intRows = docObjects[2].DataInsert();
				docObjects[2].SetCellValue(intRows, 'cntr_no',(tmp[0]== "null"?"":tmp[0]),0);
				docObjects[2].SetCellValue(intRows, 'cntr_tpsz_cd',(tmp[1]== "null"?"":tmp[1]),0);
				docObjects[2].SetCellValue(intRows, 'seal_no1',(tmp[2]== "null"?"":tmp[2]),0);
				docObjects[2].SetCellValue(intRows, 'cntr_ref_no',(tmp[3]== "null"?"":tmp[3]),0);
				docObjects[2].SetCellValue(intRows, 'cgo_pck_qty',(tmp[4]== "null"?"":tmp[4]),0);
				docObjects[2].SetCellValue(intRows, 'cgo_pck_ut',(tmp[5]== "null"?"":tmp[5]),0);
				docObjects[2].SetCellValue(intRows, 'cgo_wgt',(tmp[6]== "null"?"":tmp[6]),0);
				docObjects[2].SetCellValue(intRows, 'cgo_wgt1',(tmp[7]== "null"?"":tmp[7]),0);
				docObjects[2].SetCellValue(intRows, 'cgo_meas',(tmp[8]== "null"?"":tmp[8]),0);
				docObjects[2].SetCellValue(intRows, 'cgo_meas1',(tmp[9]== "null"?"":tmp[9]),0);
				
				docObjects[2].SetCellValue(intRows, 'rc_flg',(tmp[11]== "null"?"":tmp[11]),0);
				docObjects[2].SetCellValue(intRows, 'mgset_flg',(tmp[12]== "null"?"":tmp[12]),0);
				docObjects[2].SetCellValue(intRows, 'ca_flg',(tmp[13]== "null"?"":tmp[13]),0);
				docObjects[2].SetCellValue(intRows, 'air_flow',(tmp[14]== "null"?"":tmp[14]),0);
				docObjects[2].SetCellValue(intRows, 'air_flow_unit',(tmp[15]== "null"?"":tmp[15]),0);
				docObjects[2].SetCellValue(intRows, 'humid',(tmp[16]== "null"?"":tmp[16]),0);
				docObjects[2].SetCellValue(intRows, 'temp_val',(tmp[17]== "null"?"":tmp[17]),0);
				docObjects[2].SetCellValue(intRows, 'temp_cd',(tmp[18]== "null"?"":tmp[18]),0);
				docObjects[2].SetCellValue(intRows, 'vent_cd',(tmp[19]== "null"?"":tmp[19]),0);
			}
			for(var i=1; i<=docObjects[2].LastRow(); i++){
				docObjects[2].SetCellValue(i, 'Seq', i);
			}
		}
	}
	
	docObjects[2].SetBlur();
}

function bindBkgFrtData(){
	if (frm1.bkg_seq.value != ""){
		
		fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(7);   // grid가 생성되지않았으면 생성(속도개선)
		// CNTR의 Unit Combo정보를 담을 Sheet를 만든다.
		var curSheet = docObjects[2];
		var frtSheet = docObjects[7];
		
		// sheet를 초기화한다.
		// frtSheet.RemoveAll();
		
		for(var i=1 ; i<curSheet.LastRow()+1 ; i++){
			
			var cnt = 0;
			
			for(var j=1 ; j<frtSheet.LastRow()+1 ; j++){
				if(curSheet.GetCellValue(i,"cntr_tpsz_cd") == frtSheet.GetCellValue(j, 0)){
					cnt++;
				}
			}
			
			if(cnt == 0){
				var intRows = frtSheet.DataInsert();
				frtSheet.SetCellValue(intRows, 0, curSheet.GetCellValue(i,"cntr_tpsz_cd"));
			}
		}
		
		var cntr_tpsz_cnt = 0;
		
		for(var i=1 ; i<frtSheet.LastRow()+1 ; i++){
			for(var j=1 ; j<curSheet.LastRow()+1 ; j++){
				if(frtSheet.GetCellValue(i, 0) == curSheet.GetCellValue(j,"cntr_tpsz_cd")){
					cntr_tpsz_cnt++;
				}
			}
			
			frtSheet.SetCellValue(intRows, 1, cntr_tpsz_cnt);
		}
		
		setFrtCntrUnitCombo(frtSheet);
		
		fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
		docObjects[4].RemoveAll();
		docObjects[5].RemoveAll();
		docObjects[6].RemoveAll();
		
		ajaxSendPost(getLnrBkgFrtArList, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgFrtList&f_frt_tp=AR&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');		
		ajaxSendPost(getLnrBkgFrtApList, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgFrtList&f_frt_tp=AP&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');		
		ajaxSendPost(getLnrBkgFrtDcList, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgFrtList&f_frt_tp=DC&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');
	}
	
	tab4click = "Y";
}

// #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발
function bindBkgFrtDataBkg(){
	if (frm1.bkg_seq.value != ""){
		fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(7);   // grid가 생성되지않았으면 생성(속도개선)
		// CNTR의 Unit Combo정보를 담을 Sheet를 만든다.
		var curSheet = docObjects[2];
		var frtSheet = docObjects[7];
		
		// sheet를 초기화한다.
		// frtSheet.RemoveAll();
		
		for(var i=1 ; i<curSheet.LastRow()+1 ; i++){
			
			var cnt = 0;
			
			for(var j=1 ; j<frtSheet.LastRow()+1 ; j++){
				if(curSheet.GetCellValue(i,"cntr_tpsz_cd") == frtSheet.GetCellValue(j, 0)){
					cnt++;
				}
			}
			
			if(cnt == 0){
				var intRows = frtSheet.DataInsert();
				frtSheet.SetCellValue(intRows, 0, curSheet.GetCellValue(i,"cntr_tpsz_cd"));
			}
		}
		
		var cntr_tpsz_cnt;
		for(var i=1 ; i<frtSheet.LastRow()+1 ; i++){
			cntr_tpsz_cnt = 0;
			for(var j=1 ; j<curSheet.LastRow()+1 ; j++){
				if(frtSheet.GetCellValue(i, 0) == curSheet.GetCellValue(j,"cntr_tpsz_cd")){
					cntr_tpsz_cnt++;
				}
			}
			
			frtSheet.SetCellValue(i, 1, cntr_tpsz_cnt);
		}
		
		setFrtCntrUnitCombo(frtSheet);
		
		fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
		docObjects[4].RemoveAll();
		docObjects[5].RemoveAll();
		docObjects[6].RemoveAll();
		// ojg request 20170213
		ajaxSendPost(getLnrBkgFrtArListBkg, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgFrtList&f_frt_tp=AR&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');		
		ajaxSendPost(getLnrBkgFrtApListBkg, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgFrtList&f_frt_tp=AP&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');		
		ajaxSendPost(getLnrBkgFrtDcListBkg, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgFrtList&f_frt_tp=DC&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');
	}
	
	tab4click = "Y";
}

function getLnrBkgFrtArList(reqVal){
	fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			setLnrBkgFrt(docObjects[4], "", doc[1]);
		}
	}
	
	setBlFrtCopy(docObjects[4], '', 'S', 'O', 'M');
	
	for(var i=2; i<=docObjects[4].LastRow(); i++){
		docObjects[4].SetCellImage(i, "fr_att_file_1", 0);
	}
	
	docObjects[4].SetBlur();
}

function getLnrBkgFrtApList(reqVal){
	fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			setLnrBkgFrt(docObjects[5], "b_", doc[1]);
		}
	}
	
	setBlFrtCopy(docObjects[5], 'b_', 'S', 'O', 'M');
	
	for(var i=2; i<=docObjects[5].LastRow(); i++){
		docObjects[5].SetCellImage(i, "b_fr_att_file_1", 0);
	}
	
	docObjects[5].SetBlur();
}

function getLnrBkgFrtDcList(reqVal){
	fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			setLnrBkgFrt(docObjects[6], "dc_", doc[1]);
		}
	}
	
	setBlFrtCopy(docObjects[6], 'dc_', 'S', 'O', 'M');
	
	for(var i=2; i<=docObjects[6].LastRow(); i++){
		docObjects[6].SetCellImage(i, "dc_fr_att_file_1", 0);
	}
	
	docObjects[6].SetBlur();
}

function setLnrBkgFrt(sheetObj, objPfx, rtnValue){
	var rtnArrList=rtnValue.split("@;;@");
	
	for(var i=0 ; i<rtnArrList.length-1 ; i++){
		var rtnArr=rtnArrList[i].split("@^^@");
		var intRows = sheetObj.DataInsert();
		
		sheetObj.SetCellValue(intRows, objPfx+'fr_frt_cd', 			rtnArr[0], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_frt_cd_nm', 		rtnArr[1], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_trdp_cd', 		rtnArr[2], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_trdp_nm', 		rtnArr[3], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_rat_curr_cd', 	rtnArr[4], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_aply_ut_cd', 		rtnArr[5], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_cntr_tpsz_cd', 	rtnArr[6], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_scg_incl_flg', 	rtnArr[7], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_frt_term_cd', 	rtnArr[8], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_ru', 				rtnArr[9], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_agent_ru', 		rtnArr[10], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_qty', 			rtnArr[11], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_trf_cur_sum_amt', rtnArr[12], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_vat_rt', 			rtnArr[13], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_vat_amt', 		rtnArr[14], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_curr_cd', 	rtnArr[15], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_xcrt', 		rtnArr[16], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_xcrt_dt', 	rtnArr[17], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_amt', 		rtnArr[18], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_vat_amt', 	rtnArr[19], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_sum_amt', 	rtnArr[20], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_cr_amt', 			rtnArr[21], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_perf_curr_cd', 	rtnArr[22], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_perf_xcrt', 		rtnArr[23], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_perf_amt', 		rtnArr[24], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_perf_vat_amt', 	rtnArr[25], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_no', 			rtnArr[26], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_buy_inv_no', 		rtnArr[27], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_seq', 		rtnArr[28], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_sts_cd', 		rtnArr[29], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_sts_nm', 		rtnArr[30], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_sell_buy_tp_cd', 	rtnArr[31], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_auto_trf_flg', 	rtnArr[32], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_trf_ctrt_no', 	rtnArr[33], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_trf_dtl_seq', 	rtnArr[34], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_frt_ask_clss_cd', rtnArr[35], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_due_dt', 		rtnArr[36], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_agent_amt', 		rtnArr[37], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_reserve_field01', rtnArr[38], 0);
	}
}

function getLnrBkgFrtArListBkg(reqVal){
	fnSetIBsheetInit(4);   // grid가 생성되지않았으면 생성(속도개선)
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			setLnrBkgFrtBkg(docObjects[4], "", doc[1]);
		}
	}
	
	// setBlFrtCopy(docObjects[4], '', 'S', 'O', 'M');
	cnfCntr('SD');
	mutiSheetOnSearchEnd(docObjects[4], 0, '', '1', '');
	
	for(var i=2; i<=docObjects[4].LastRow(); i++){
		docObjects[4].SetCellImage(i, "fr_att_file_1", 0);
	}
	
	// docObjects[4].SetBlur();
}

function getLnrBkgFrtApListBkg(reqVal){
	fnSetIBsheetInit(5);   // grid가 생성되지않았으면 생성(속도개선)
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			setLnrBkgFrtBkg(docObjects[5], "b_", doc[1]);
		}
	}
	
	// setBlFrtCopy(docObjects[5], 'b_', 'S', 'O', 'M');
	cnfCntr('BC');
	mutiSheetOnSearchEnd(docObjects[5], 0, '', 2, 'b_');	
	
	for(var i=2; i<=docObjects[5].LastRow(); i++){
		docObjects[5].SetCellImage(i, "b_fr_att_file_1", 0);
	}
	
	// docObjects[5].SetBlur();
}

function getLnrBkgFrtDcListBkg(reqVal){
	fnSetIBsheetInit(6);   // grid가 생성되지않았으면 생성(속도개선)
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			setLnrBkgFrtBkg(docObjects[6], "dc_", doc[1]);
		}
	}
	
	// setBlFrtCopy(docObjects[6], 'dc_', 'S', 'O', 'M');
	cnfCntr('DC');
	mutiSheetOnSearchEnd(docObjects[6], 0, '', 2, 'dc_');
	
	
	for(var i=2; i<=docObjects[6].LastRow(); i++){
		docObjects[6].SetCellImage(i, "dc_fr_att_file_1", 0);
	}
	
	docObjects[6].SetBlur();
}

function setLnrBkgFrtBkg(sheetObj, objPfx, rtnValue){
	var rtnArrList=rtnValue.split("@;;@");
	
	for(var i=0 ; i<rtnArrList.length-1 ; i++){
		var rtnArr=rtnArrList[i].split("@^^@");
		var intRows = sheetObj.DataInsert();
		
		sheetObj.SetCellValue(intRows, objPfx+'fr_frt_cd', 			rtnArr[0], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_frt_cd_nm', 		rtnArr[1], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_trdp_cd', 		rtnArr[2], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_trdp_nm', 		(rtnArr[3]== "null"?"":rtnArr[3]), 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_rat_curr_cd', 	rtnArr[4], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_aply_ut_cd', 		rtnArr[5], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_cntr_tpsz_cd', 	rtnArr[6], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_scg_incl_flg', 	rtnArr[7], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_frt_term_cd', 	rtnArr[8], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_ru', 				rtnArr[9], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_agent_ru', 		rtnArr[10], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_qty', 			rtnArr[11], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_trf_cur_sum_amt', rtnArr[12], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_vat_rt', 			rtnArr[13], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_vat_amt', 		rtnArr[14], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_curr_cd', 	rtnArr[15], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_xcrt', 		rtnArr[16], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_xcrt_dt', 	rtnArr[17], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_amt', 		rtnArr[18], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_vat_amt', 	rtnArr[19], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_sum_amt', 	rtnArr[20], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_cr_amt', 			rtnArr[21], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_perf_curr_cd', 	rtnArr[22], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_perf_xcrt', 		rtnArr[23], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_perf_amt', 		rtnArr[24], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_perf_vat_amt', 	rtnArr[25], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_no', 			rtnArr[26], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_buy_inv_no', 		rtnArr[27], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_seq', 		rtnArr[28], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_sts_cd', 		rtnArr[29], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_sts_nm', 		rtnArr[30], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_sell_buy_tp_cd', 	rtnArr[31], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_auto_trf_flg', 	rtnArr[32], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_trf_ctrt_no', 	rtnArr[33], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_trf_dtl_seq', 	rtnArr[34], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_frt_ask_clss_cd', rtnArr[35], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_inv_due_dt', 		rtnArr[36], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_agent_amt', 		rtnArr[37], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_reserve_field01', rtnArr[38], 0);
		
		//(2017/06/08 1차)  릴리스 테스트 내역 - 미진 사항 
		sheetObj.SetCellValue(intRows, objPfx+'fr_org_agent_amt'  , rtnArr[37], 0);	
		
		sheetObj.SetCellValue(intRows, objPfx+"fr_inv_no","",0);		
		sheetObj.SetCellValue(intRows, objPfx+"fr_buy_inv_no","",0);		
		sheetObj.SetCellValue(intRows, objPfx+"fr_inv_sts_cd","",0);		
		sheetObj.SetCellValue(intRows, objPfx+"fr_inv_sts_nm","",0);		
		sheetObj.SetCellValue(intRows, objPfx+"fr_inv_seq","",0);		
		sheetObj.SetCellValue(intRows, objPfx+"fr_trf_dtl_seq",0,0);	
		sheetObj.SetCellValue(intRows, objPfx+"fr_ibflag","I",0);	
		sheetObj.SetCellValue(intRows, objPfx+"fr_auto_trf_flg","N",0);	
		// sheetObj.SetCellValue(intRows, objPfx+"fr_inv_xcrt_dt","",0);	
		// sheetObj.SetCellValue(intRows, objPfx+"fr_trdp_cd","",0);
		// sheetObj.SetCellValue(intRows, objPfx+"fr_trdp_nm","",0);
		
	}
}

function searchCustItem(reqVal){
	fnSetIBsheetInit(11);   // grid가 생성되지않았으면 생성(속도개선)
	var formObj = document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			// 조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				var row = docObjects[11].GetSelectRow();
				var arrVal = rtnArr[0].split("|");
				docObjects[11].SetCellValue(row,"item_cmdt_cd",arrVal[0],0);
				docObjects[11].SetCellValue(row,"item_cmdt_nm",arrVal[1],0);
			}
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

// [20161130 YJW] MBL 저장시 Booking No 유효성 체크
function checkMblBkgNo() {
	var formObj  = document.frm1;
	
	if (formObj.bkg_seq.value != "") {
		ajaxSendPost(checkMblReq, 'reqVal', '&goWhere=aj&bcKey=getCheckBlCreate&bkg_seq='+formObj.bkg_seq.value+'&biz_clss_cd=M&intg_bl_seq='+formObj.intg_bl_seq.value, './GateServlet.gsl');
		
		if (!isMblCrtOk) {
			alert(getLabel('FMS_COM_ALT096')); // Invalid Carrier Booking No.
												// MB/L already created!
		}
		
		return isMblCrtOk;
	} else {
		return true;
	}
}

var isMblCrtOk = false;

function checkMblReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			isMblCrtOk = false;
		}
		else{
			isMblCrtOk = true;
		}
	}
}

var chkRoleFlag = false;
function chkRoleInv(intgBlSeq){
	var formObj=document.frm1
	var selfNo = formObj.sel_ref_no.value;
	var refNo  = formObj.ref_no.value;

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
				// Ref. No. is duplicate.
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
	// if(docObjects[sheetNo].HeaderRows() < 1){
	// console.log(sheetNo +' / fnSetIBsheetInit = ' + docObjects[sheetNo].id +
	// ' / ' + docObjects[sheetNo].ColSaveName(1));
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

var mblInfo = "";

function getMblCopyInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			mblInfo=doc[1];
		}else{
			//alert(getLabel('SEA_COM_ALT024'));
		}
	}
}

//#1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L
function fnSalesChange(){
	var formObj=document.frm1;
	var p_code ="";
	if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
		&& formObj.nomi_flg.value !='Y') //	Nomi
	{
		p_code = formObj.shpr_trdp_cd.value;
	}	
	if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
		&& formObj.nomi_flg.value =='Y') //Nomi
	{	
		p_code = formObj.prnr_trdp_cd.value;
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

//#3572 Japan Trust OEM/OEH Entry Fright Default
function setFreight(reqVal){
	//#4037 [JAPT] keeping Sales PIC , Freight code.
	if(frm1.bl_copy_sts.value!="copy"){
		var doc=getAjaxMsgXML(reqVal);
		var formObj=document.frm1;
		if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
			if(doc[1] =='Y') {
				formObj.frt_term_cd.value='CC';
			}else if(doc[1] =='N'){
				formObj.frt_term_cd.value='PP';
			}
		}
	}
}

function COUNTRY_POPLIST(rtnVal){
	var formObj=document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	    else{
		var rtnValAry=rtnVal.split("|");
		formObj.ib_org_cnt_cd.value=rtnValAry[0];//cnt_cd
		formObj.ib_org_cnt_nm.value=rtnValAry[1];//cnt_eng_nm
	}
}

function statePopupCallback(rtnVal){
	var formObj=document.frm1;
	formObj.ib_org_ste_cd.value=formObj.state_cd.value;
	formObj.ib_org_ste_nm.value=formObj.state_nm.value + ' ('+ formObj.state_cnt_cd.value+')';  
}

var CODETYPE = '';

function codeNameAction2(str, obj, tmp) {
	var formObj = document.frm1;
	var s_code = obj.value.toUpperCase();
	var s_type = "";	
	CODETYPE = str;
	if ((tmp == "onKeyDown" && event.keyCode == 13) || tmp=="onBlur") {		
		if (str == "org_country")
			s_type = "country";
		else if (str == "org_state")
			s_type = "state";
		ajaxSendPost(codeNameActionCallBack, 'reqVal',
				'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
						+ '&s_code=' + s_code, './GateServlet.gsl');
	}
}
	
function codeNameActionCallBack(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var targetFr = 'mainFrame';
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');
			if(CODETYPE =="org_state"){
				formObj.ib_org_ste_cd.value=masterVals[0];
				formObj.ib_org_ste_nm.value=masterVals[3] + ' (' + masterVals[2] + ')';
			}else if(CODETYPE =="org_country"){
				formObj.ib_org_cnt_cd.value=masterVals[0];
				formObj.ib_org_cnt_nm.value=masterVals[3];
			}
		} else {
			if(CODETYPE =="org_state"){
				formObj.ib_org_ste_cd.value='';
				formObj.ib_org_ste_nm.value='';
			}else if(CODETYPE =="org_country"){
				formObj.ib_org_cnt_cd.value='';
				formObj.ib_org_cnt_nm.value='';
			}
		}
	}
}


//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
function sheet4_OnCheckAllEnd(sheetObj, col, val) {
	
	if(sheetObj.ColSaveName(col) == "Del"){
		var itemObj = docObjects[11];
		comCntrList_OnCheckAllEnd(sheetObj, col, val , itemObj);
	}
	
}


//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
function sheet4_OnBeforeCheckAll(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) == "Del"){
		//DEL check all시 onchange event를 막기위해 삽입 
		//전체선택시 Onchange 이벤트 발생안함 OnCheckAllEnd는 발생함
		sheetObj.AllowEvent4CheckAll(0);	
	}else{
		sheetObj.AllowEvent4CheckAll(1);
	}
}

function setExDate(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
			BL_EXPORT_EX_DT = doc[1];
	}
	if(BL_EXPORT_EX_DT == 'ETD'){
		formObj.xcrtDt.value = formObj.etd_dt_tm.value;
	}
}

//#6792 [AIR POWER] SETTNG UP PACKAGE DEFAULT FOR OCEAN ENTRY SCREEN
function setPckUtCd(){
	var opt_key = "PCK_VAL_OEM";
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

//OFVFOUR-7038 [Zimex] Decimal length for Weight & Measurement
function chkFuncComma(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined && doc[1] == "Y"){
	    	oemOehRemoveFuncComma = "Y";
		}else{
			oemOehRemoveFuncComma = "N";
		}
}