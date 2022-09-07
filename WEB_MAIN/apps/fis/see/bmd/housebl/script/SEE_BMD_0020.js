/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0020.js
*@FileTitle  :  HGBL등록
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/24
=========================================================*/
var loadDataProcess ="";//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
var bkgCntrSheet=false;
var docListSheet=false;
var xptListSheet=false;
var cntrListSheet=false;
var cmdtListSheet=false;
var frtSdSheet=false;
var frtBcSheet=false;
var frtDcSheet=false;
var dimListSheet=false;
var jobListSheet=false;
var udfListSheet=false;
var hwiFrtListSheet=false;
var isError=false;
var isInvStsOk=false;
var rtnary=new Array(1);
var callBackFunc = "";
var isMBLCreated = false;
var creditOver = false;
var bkgCreat = false;
var hblToMbl = false;
var isPdOrdStsOk = false;
/*Vinh.Vo - 04/17/2015 (S)*/

var isCopy = false;// flag to know sheet13 is loading data in Copy function
var vIntgBlModiTms;
/*Vinh.Vo (E)*/
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
var show_delete_complete = "N";
var creditOver_flg = false;
/* 
 * jsjang 2013.7.5 
 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건
 * end 
 */  
var BL_EXPORT_EX_DT="OBD";
//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	isError=false;
    var sheetParam='';
//    if(blCheckInpuVals()){
//		isError = true;
//    }
    /*
    if(!isError){    
	    var bkgCntrParam=docObjects[11].GetSaveString(false);
	    if(bkgCntrParam!=''){
	    	sheetParam+= '&';
	    	sheetParam+= bkgCntrParam;
	    	bkgCntrSheet=true;
		}
    }
    */
    fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
    var docListParam=docObjects[9].GetSaveString(false);
    if(docListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= docListParam;
    	docListSheet=true;
	}       
    if(!isError){
    	fnSetIBsheetInit(12);   //grid가 생성되지않았으면 생성(속도개선)
	    var xptListParam=docObjects[12].GetSaveString(false);
	    
	    if(xptListParam!=''){
	    	isError=ediCheckInpuVals(docObjects[12]);
	    	if(!isError){
		    	sheetParam+= '&';
		    	sheetParam+= xptListParam;
		    	xptListSheet=true;
	    	}
	    }
    }
    fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
    var cntrListParam=docObjects[2].GetSaveString(false);
	if(cntrListParam!=''){
		isError=cntrListCheckInpuVals(docObjects[2]);
		if(!isError){
			sheetParam+= '&';
	    	sheetParam+= cntrListParam;
	    	cntrListSheet=true;
		}
	}
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	var cmdtListParam=docObjects[3].GetSaveString(false);
	if(cmdtListParam!=''){
		isError=itemCheckInpuVals(docObjects[3]);
		if(!isError){
	    	sheetParam+= '&';
	    	sheetParam+= cmdtListParam;
	    	cmdtListSheet=true;
		}
	}
	/* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
	isError=false;
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
    var frtSdListParam=docObjects[5].GetSaveString(false);
    if(frtSdListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[5], '');
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtSdListParam=docObjects[5].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtSdListParam;
    	frtSdSheet=true;
	}
    fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
    var frtBcListParam=docObjects[6].GetSaveString(false);
    if(frtBcListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[6], 'b_');
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtBcListParam=docObjects[6].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtBcListParam;
    	frtBcSheet=true;
	}
    fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
    var frtDcListParam=docObjects[13].GetSaveString(false);
	if(frtDcListParam!=''){
		var rtnFlg=frCheckInpuVals(docObjects[13], 'dc_');
		if(rtnFlg=='IV'){
    		isError=true;
    	}
		frtDcListParam=docObjects[13].GetSaveString(false);
		sheetParam+= '&';
		sheetParam+= frtDcListParam;
		frtDcSheet=true;
	}
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
    var dimListParam=docObjects[1].GetSaveString(false);
    if(dimListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= dimListParam;
        dimListSheet=true;
    }
    fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
    var jobListParam=docObjects[8].GetSaveString(false);
    if(jobListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= jobListParam;
        jobListSheet=true;
    }
    fnSetIBsheetInit(14);   //grid가 생성되지않았으면 생성(속도개선)
    var udfListParam=docObjects[14].GetSaveString(false);
    if(udfListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= udfListParam;
        udfListSheet=true;
    }
    fnSetIBsheetInit(15);   //grid가 생성되지않았으면 생성(속도개선)
    var hwiFrtListParam=docObjects[15].GetSaveString(false);
	if(hwiFrtListParam!=''){
		isError=hwiFrtCheckInpuVals(docObjects[15]);
		if(!isError){
	    	sheetParam+= '&';
	    	sheetParam+= hwiFrtListParam;
	    	hwiFrtListSheet=true;
		}
	}
    /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
    if(isError == true)
    {
    	return true;
    }    
	return sheetParam;
}
var bkCheck=0;
function doWork(srcName){
	
	// #1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
	setSaveConfirmMsg(srcName);
	
	if(!btnGetVisible(srcName)){
		return;
	}
    try {
    	
        switch(srcName) {
           case "NEW":	//NEW
           		//clearScreen();
           		//break;
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
            case "ADD":	//등록
	        case "SAVE":	//등록
	        	
	        	//#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
	        	if(edob_flg =='N' && (getStringLength(frm1.ref_no.value) != 0)){
	        		if(ofc_cd != $("input[name=ref_ofc_cd]").val()){
	        			alert(getLabel('SEA_COM_ALT042')+'\n\n' + 'B/L Office: ' + frm1.ref_ofc_cd.value + ', Your Office: ' + ofc_cd);
	        			return;
	        		}
	        	}
	        	//#2737 [BNX] C/BROKER TO CHECK PAYMENT STATUS
	        	creditRoleCheck();
	        	
	        	//52036
	        	// #553 EDIT BL WITH OVERLIMITED TP 
	        	if (creditOver && frm1.credit_flg.value =="N") {
	        		//Selected trade partner has exceed its credit limit. 
	        		//You are not authorized issue any document(s) when credit limit is exceeded. 
	        		//Please update trade partner’s credit limit or have authorized user issue the document(s).
	        		alert(getLabel('COM_FRT_CFM009'));
	        		return;
	        	}
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
	        	//#3356 [JTC]HB/L Form 개발
	        	if(hbl_check_pod_us_tri_flg == "Y"){
	        		ajaxSendPost(getPodCntCd, 'reqVal', '&goWhere=aj&bcKey=getPodCntCd&loc_cd='+frm1.pod_cd.value+"&intg_bl_seq="+frm1.intg_bl_seq.value, './GateServlet.gsl');
	        	}
				if(!chkTri){
					if(!confirm(getLabel('FMS_COM_ALT137'))){
						frm1.tli_no.focus();
						return;
					}
				}
				//OFVFOUR-6866 - [BNX-LA] Selecting multi-Warehouse Receipt from B/L Entry screen (Zen#3533)
				if(multiWhFlg=="Y"){
			    	updateMultiWh_recp_no('S');
			    }
	            if(frm1.intg_bl_seq.value==""){
	            	doWork("SAVE_ADD");
	            }else{
	            	
	    	     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정 
	    	     	if(!chkIntgBlModiTms(srcName)){
	    	     	   return;
	    	     	}			
	    	     	
        	     	/* #428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED */
	    	     	/* O04 롤코드가 있으면 수정가능 or 롤코드가 없을땐 인보이스가 없을때 수정가능  (ref_no) */
        	     	if(!chkRoleInv(frm1.intg_bl_seq.value)){
        	     		return;
        	     	}	    	     	
        	     	
        	     	//#2354 [PATENT] House Bill Based - Processing Logic Enhancement
        	     	var param =  '&intg_bl_seq=' + frm1.intg_bl_seq.value;
        	     		param += '&por_cd=' + frm1.por_cd.value;
        	     		param += '&pol_cd=' + frm1.pol_cd.value;
        	     		param += '&pod_cd=' + frm1.pod_cd.value;
        	     		param += '&del_cd=' + frm1.del_cd.value;
        	     	
        	     	ajaxSendPost(checkRouteChange, 'reqVal', '&goWhere=aj&bcKey=checkRouteChange' + param, './GateServlet.gsl');
	            	doWork("SAVE_MODIFY");
	            }
	            break;
	        case "HBL_ADD":	//HBL 재등록
	        	var asRef_no = frm1.ref_no.value;
	        	var paramStr="./SEE_BMD_0020.clt?";
	   			paramStr+= "f_mbl_ref_no=" + asRef_no;
	   			parent.mkNewFrame('Booking & HBL', paramStr);
	            break; 
	            
			case "SAVE_ADD":	//등록
               frm1.f_cmd.value=ADD;
               //if(inpuValCheck(sheetObj, ADD)){
               	   //복사된 Freight를 등록상태로 변경함
               	   //resetCopyFrt(getSdSheet(), getBcSheet());
               	   //var sndParam = getSndParam();
				//LHK 20130828 #20146 [C&LG] Booking Confirmation 을 위한 Container 자동 q'ty add 기능 추가 및 자동 Container Summary Setting 기능 추가
				cntrInfoSet(docObjects[2]);

    		   
               if(blCheckInpuValsForAdding() && validateAccountPayable()){
            	   // HBL > MBL Create 로직 주석처리하기로 함 2016.11.29
            	   /* #1440 [PATENT] 0215_27 OEH B/L - MASTER B/L CREATION RECOVER 주석처리 원복. 2017.03.03 */
            	   if(getStringLength(frm1.ref_no.value) == 0){

            		   // #52165 [Globe Runner] HBL > MBL Create
            		   if (confirm(getLabel('FMS_COM_CFMMBLCRE'))){
            			   setPost_date("I");
            			   hblToMbl = true;
            			   srOpenPopUp('CREATE_MBL_POPLIST_OEH',this)
            		   } else {
            			   moveTab('01');
            			   frm1.ref_no.focus();
            			   return;
            		   }
            		   
            	   }else{
            		   if (!checkHblRefNo('S','O')) { // #43380 HBL 저장시 Filing No 유효성 체크
            			   return;
            		   }

            		   if (!checkHblBkgNo()) { // HBL 저장시 Booking No 유효성 체크
            			   return;
            		   }

    	    		   //#3145 [BINEX VISIBILITY] LOADING FOREVER ON OE (COSTCOTW)
    	    		   for(var j=1; j<=docObjects[14].LastRow(); j++){
    	    			   if(docObjects[14].GetCellValue(j, 'udf_cd') == "RE" && docObjects[14].GetCellValue(j, 'udf_del_chk') == "0"){
    	    				    if(!chkRetaDate(docObjects[14].GetCellValue(j, 'udf_val'), j)){
    	    						alert(getLabel('FMS_COM_ALT040'));
    	    						docObjects[14].SetCellValue(j, 'udf_val', '');
    	    						goTabSelect("06");
    	    						return;
    	    					}
    	    			   }
    	    		   }
            		   
            		   if(!etdRangeOk){
            			   //[Warning] ETD is outside range of 6 months from today. \nPlease kindly check ETD  again.
            			   alert(getLabel('FMS_COM_ALT021'));		
            		   }
            		   
            		   //#48103 remove space
            		   frm1.bl_no.value=trim(frm1.bl_no.value);
            		   frm1.ref_no.value=trim(frm1.ref_no.value);

            		   /* #47308 스페이스 입력시 null이 입력되는 현상  수정 */
            		   if(trim(frm1.bl_no.value)==""){
            			   frm1.bl_no.value = "";
            		   }

            		   // #47308 User가 일부러 스페이스 또는 ""을 BL_NO에 입력했을때 Alert
            		   if(frm1.bl_no.value == ""){
            			   if(!confirm(getLabel('SEA_COM_ALT022'))){
            				   return;
            			   }
            		   }

            		   if(frm1.bl_no.value=="AUTO"){
            			   frm1.bl_no.value="";
            		   }
            		   if (frm1.itn_no.value.length == 0 && prn_ofc_cd == "BNXC") {
            			   if(confirm(getLabel('SEA_COM_ALT029')) == false){
            				   return;
            			   }
            		   } 	    		    
            		   ajaxSendPost(getHblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=H&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');
            		   /* 
            		    * jsjang 2013.7.5 
            		    * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
            		    */        
            		   cntr_ship_init();
            	   }
               }
               /* 
                * jsjang 2013.7.5 
                * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end 
                */  
               break;
           case "SAVE_MODIFY":	//등록
               frm1.f_cmd.value=MODIFY;
	    	   if(blCheckInpuVals() && validateAccountPayable()){
	    		   //#48103 remove space
             	   frm1.bl_no.value=trim(frm1.bl_no.value);
             	   frm1.ref_no.value=trim(frm1.ref_no.value);
             		
	    		   if (!checkHblRefNo('S','O')) { // #43380 HBL ��옣��Filing No �좏슚��泥댄겕
            		   return;
            	   }
	    		   
	    		   if (!checkHblBkgNo()) { // HBL 저장시 Booking No 유효성 체크
            		    return;
            	    }
	    		   
	    		   if(!etdRangeOk){
	         			//[Warning] ETD is outside range of 6 months from today. \nPlease kindly check ETD  again.
	    			   alert(getLabel('FMS_COM_ALT021'));		
	    		   }
	    		   //#2354 [PATENT] House Bill Based - Processing Logic Enhancement
	    		   if(frm1.shp_mod_cd.value=="FCL" && frm1.hbl_cnt.value=="1"){
		    		   for(var i=1; i<=docObjects[2].LastRow(); i++){
		    			   if(docObjects[2].GetCellValue(i, 'cntr_no')==''){
		    				   //#2572 [Patent] Bugs were reported During Internal Testing (From Booking to B/L)
		    				  if(docObjects[2].GetCellValue(i, 'Del') != 1){
			    				   alert(getLabel('SEA_COM_ALT039'));
			    				   return;
		    				  }
		    			   }
		    		   }
	    		   }
	    		   
	    		   //#3145 [BINEX VISIBILITY] LOADING FOREVER ON OE (COSTCOTW)
	    		   for(var j=1; j<=docObjects[14].LastRow(); j++){
	    			   if(docObjects[14].GetCellValue(j, 'udf_cd') == "RE" && docObjects[14].GetCellValue(j, 'udf_del_chk') == "0"){
	    				    if(!chkRetaDate(docObjects[14].GetCellValue(j, 'udf_val'), j)){
	    						alert(getLabel('FMS_COM_ALT040'));
	    						docObjects[14].SetCellValue(j, 'udf_val', '');
	    						goTabSelect("06");
	    						return;
	    					}
	    			   }
	    		   }

	    		   /* #47308 스페이스 입력시 null이 입력되는 현상  수정 */
	    		   if(trim(frm1.bl_no.value)==""){
	    			   frm1.bl_no.value = "";
	    		   }
             		
	    		   if(frm1.bl_no.value=="AUTO"){
	          			frm1.bl_no.value="";
	    		   }
	    		   if (frm1.itn_no.value.length == 0 && prn_ofc_cd == "BNXC") {
	          			if(confirm(getLabel('SEA_COM_ALT029')) == false){
	          				return;
	          			}
	          		}
	    		   if(frm1.h_bl_no.value!=frm1.bl_no.value){
	          			ajaxSendPost(getHblCheckModify, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=H&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');
	    		   }
	    		   else{
	    			   //BL No. 가 없을 경우
	    			   //The [HB/L No.] is Blank. Generate the Number? Yes/No. Yes 일 경우 Save 진행 
	    			   var blNullChk=true;
	          		   if(frm1.bl_no.value == ""){
	          			   blNullChk=confirm(getLabel('SEA_COM_ALT022'));
	          		   }
	          		   if(blNullChk){
	        			   if(confirm(getLabel(saveMsg))){
	                		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
	                		   var sndParam=getSndParam();
	                		   if(sndParam == true)	{	return false;	}
	              				//var sndParam = getSndParam();
	                     	    gridAdd(0);
	                    	    docObjects[0].SetCellValue(1, 1,1);
	                    	    frm1.f_bl_no.value=frm1.bl_no.value;
	                    	    doShowProcess();
	                   		 //#4084 (JAPT) same currency invoice - exchange rate validation
	                 		    exchangeRateVal();	                    	    
	              				docObjects[0].DoAllSave("./SEE_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
	              			}
	          		    }   
	          		}
	            }
	          	/* 
	          	 * jsjang 2013.7.5 
	          	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
	          	 */        
                cntr_ship_init();
	          	/* 
	          	 * jsjang 2013.7.5 
	          	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end 
	          	 */                  	   
               break;
           case "CLOSE_MODIFY":	//등록
        	   
	   	     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정 
	   	     	if(!chkIntgBlModiTms(srcName)){
	   	     	   return;
	   	     	}		
	   	     	
        	   frm1.f_cmd.value=COMMAND10;
           		//LHK 20130828 #20146 [C&LG] Booking Confirmation 을 위한 Container 자동 q'ty add 기능 추가 및 자동 Container Summary Setting 기능 추가
				cntrInfoSet(docObjects[2]);
        	   if(confirm(getLabel(saveMsg))){
	        	   gridAdd(0);
				   docObjects[0].SetCellValue(1, 1,1);
				   frm1.f_bl_no.value=frm1.bl_no.value;
        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}				   
				   doShowProcess();
				   //docObjects[0].DoAllSave("./SEE_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
				   docObjects[0].DoAllSave("./SEE_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
        	   }
	   	      	/* 
	   	      	 * jsjang 2013.7.5 
	   	      	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start 
	   	      	 */        
	   	      cntr_ship_init();
	   	      	/* 
	   	      	 * jsjang 2013.7.5 
	   	      	 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end 
	   	      	 */           	   
        	   break;
           case "SEARCHLIST":	//조회
			   frm1.f_bl_no.value=trim(frm1.f_bl_no.value);
        	   //if(frm1.f_bkg_no.value==''&&frm1.f_bl_no.value==''){
        	   if(frm1.f_bl_no.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_bl_no.focus();
        		   return;
        	   }
        	   else{
        		   //if(frm1.f_bkg_no.value==''&&frm1.f_bl_no.value!=''){
        		   if(frm1.f_bl_no.value!=''){
        			   frm1.f_intg_bl_seq.value='';
        		   }
                   frm1.f_cmd.value=SEARCHLIST;
                   
        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
                   
//            	   doShowProcess();
        		   
                   submitForm(SEARCHLIST);
                   
                   //#1929 보완사항. Search 후 바로 Container Information 클릭 시 , container 정보 표시되도록 수정
                   // Cntr Sheet를 조회했으므로 Ctnr탭의 재조회를 방지하기 위해 TabClick를 Y로 업데이트 한다.
                   // 중복 조회 방지
                   if(tab2click == ""){
                   	tab2click = "Y";
                   	doWork('SEARCHCNTR');
                   } 
        	   }
        	   
        	   //20170118 hjw 제거
        	   //ajaxSendPost(getMasterCntr, 'reqVal', '&goWhere=aj&bcKey=getMasterCntr&f_ref_no='+frm1.ref_no.value+'&f_intg_bl_seq='+frm1.intg_bl_seq.value+'&f_rlt_intg_bl_seq='+frm1.rlt_intg_bl_seq.value, './GateServlet.gsl');	//[20130822  ojg] rlt_intg_bl_seq파라미터추가
        	   
        	   break;
           case "DOCFILE":	//첨부파일
        		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
        		/**  Document List ==> Common Memo 연동 파라미터 (S) */
        		reqParam += '&palt_mnu_cd=OEH';
        		reqParam += '&opr_no='+frm1.f_bl_no.value;
        		/**  Document List ==> Common Memo 연동 파라미터 (E) */
        		reqParam += '&openMean=SEARCH01';
       	   		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 450, "scroll:no;status:no;help:no;");
       	   		break;
           case "SNDEML":	//Email전송
       			var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
       			reqParam += '&openMean=SEARCH01';
      	   		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
      	   		break;
           case "BKGCNF":	//Booking Confirm
        	   if(confirm(getLabel('FMS_COM_CFMCFM'))){
                   frm1.f_cmd.value=COMMAND01;
                   doShowProcess();
                   fnSetIBsheetInit(0);   //grid가 생성되지않았으면 생성(속도개선)
             	   docObjects[0].DoSearch("./SEE_BMD_0020GS.clt", FormQueryString(frm1) );
        	   }
        	   break;
           case "HBLCRE":	//HBL Creation
        	   var sndParam=getSndParam();
        	   if(!isError){
        		   if(bkCheck==0){
        			   /*
		        	   if(frm1.doBlKeyIn.checked){
		        		   if(frm1.bl_no.value==''){
								//HB/L 번호를 입력하여 주십시오!
		        			   	alert(getLabel('FMS_COM_ALT006'));
		        			   	frm1.bl_no.focus();
		        		   }else{
		        			   ajaxSendPost(getHblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_biz_clss_cd=H&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');   
		        		   }
		        	   }else{
		        	   */
		            	   if(confirm(getLabel('FMS_COM_CFMSAV'))){
		                       frm1.f_cmd.value=COMMAND02;
		                       doShowProcess();
		                       fnSetIBsheetInit(0);   //grid가 생성되지않았으면 생성(속도개선)
 		                	   docObjects[0].DoSearch("./SEE_BMD_0020GS.clt", FormQueryString(frm1)+sndParam );
		            	   }
		               /*
		        	   }
		        	   */
        		   }
        		   else{
        			   //'Please "Save" information before HBL Creation!');
        			   alert(getLabel('SEA_COM_ALT007'));
        		   }
        	   }
        	   else{
        		   bkCheck=99;
        	   }
        	   break;
           case "HBLCNF":	//Booking Confirm
        	   if(isStsOk){
	        	   if(blCheckInpuVals()&&confirm(getLabel('FMS_COM_CFMCFM'))){
	                   frm1.f_cmd.value=COMMAND03;
	                   doShowProcess();
	                   fnSetIBsheetInit(0);   //grid가 생성되지않았으면 생성(속도개선)
 	            	   docObjects[0].DoSearch("./SEE_BMD_0020GS.clt", FormQueryString(frm1) );
	        	   }
        	   }
        	   break;
           case "HBLCLS":	//Booking Closing
        	   if(confirm(getLabel('FMS_COM_CFMCLS'))){
                   frm1.f_cmd.value=COMMAND04;
                   doShowProcess();
                   fnSetIBsheetInit(0);   //grid가 생성되지않았으면 생성(속도개선)
             	   docObjects[0].DoSearch("./SEE_BMD_0020GS.clt", FormQueryString(frm1) );
        	   }
        	   break;
           case "COPY":	//조회
        	   
        	   //BL_COPY COPY시 컨펌메시지 없이 바로 Submit후 frt Check화면을 보여준다
        	   frm1.f_cmd.value=COMMAND05;
        	   doShowProcess();
        	   frm1.submit();

        	  
        	   /* 
			   if(confirm(getLabel('FMS_COM_CFMCPY'))){
                   frm1.f_cmd.value=COMMAND05;
                   //doShowProcess();
            	   //frm1.submit();
                   submitForm(COMMAND05);
        	   }*/
        	   break;
           case "REMOVE"://삭제
        	   
	   	     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정 
	   	     	if(!chkIntgBlModiTms(srcName)){
	   	     	   return;
	   	     	}		
	   	       
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
	                   show_delete_complete = "Y";
	            	  // doShowProcess();
	            	   //frm1.submit();
	                   submitForm(REMOVE);
	        	   }
    		   }
    		   else{
    			   //You Cannot delete HB/L. Because Invoice was already Issued.
    			   alert(getLabel('FMS_COM_ALT022'));
    			   return;
    		   }
    		   
    		   
    		   
    		   break;
           case "WORKORDER":	//Work Order 화면호출
	           /*var param='f_intg_bl_seq=' + frm1.intg_bl_seq.value;
		   		   param += '&air_sea_clss_cd=S'; 
		   		   param += '&bnd_clss_cd=O';
		   		   param += '&biz_clss_cd=H';
		   		 //#34862 - [BINEX]Work Order - Trucker 정보 Link
		   		   param += '&pickup_ref_no=' + document.frm1.cust_ref_no.value;
	               var paramStr="./AIC_WOM_0011.clt?f_cmd="+SEARCH01+"&s_type=B&"+param;
	               parent.mkNewFrame('Pick/Delivery Instruction', paramStr);*/
	               
	               var paramStr="./AIC_WOM_0011.clt?air_sea_clss_cd=S&bnd_clss_cd=O&biz_clss_cd=H";
	               var param = "&f_cmd=" + SEARCH01;
	               param += "&s_type=B";
	               param += "&f_intg_bl_seq=" + frm1.intg_bl_seq.value;
	               param += '&pickup_ref_no=' + frm1.cust_ref_no.value;
	               parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
               break;
           case "GOTOSR":		//S/R 화면호출
               var paramStr="./SEE_BMD_0030.clt?f_cmd="+SEARCHLIST02+"&f_hbl_bl_seq="+frm1.intg_bl_seq.value;
               parent.mkNewFrame('S/R Entry', paramStr);
               break;
           case "SEARCH_XPT":	//수출신고 번호 조회
          		if(frm1.bl_sts_cd.value!='NA'){
	   				searchGrid(3);
          		}
          		break;
           case "SEARCHCNTR":	//Container탭의 목록조회
        		if(frm1.bl_sts_cd.value!='NA'){
        			searchGrid(6);
					//Container List 조회
        			searchGrid(4);
        			//Commodity List 조회
        			//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
        			//searchGrid(5); // cntr list searchend에 포함  sheet5_OnSearchEnd
        		}
        		break;
           case "SEARCH_FRT":	//Freight 조회
       			if(frm1.bl_sts_cd.value!='NA'){
       				searchGrid(6);
       				//Selling/Debit Freight 조회
       				searchGrid(7);
       				//Buying/Crebit List 조회
       				searchGrid(8);
       				searchGrid(13);
       			}
       			break;   
           case "SEARCH_WO":	//WORK ORDER 조회
        	   if(frm1.bl_sts_cd.value!='NA'){
				   //Container List 조회
        		   searchGrid(9);
        	   }
        	   break;
           case "SEARCH_JB":	//Job template & History
        	   if(frm1.bl_sts_cd.value!='NA'){
        		 //처리내역( Job temlate에 따라서)   
        		 searchGrid(10);
        		//처리내역( Job temlate에 따라서)
        		 searchGrid(11);
        		 searchGrid(14);
        		 
        		 /* 속도개선 이동  from loadData() */
        		 searchGrid(2);  //Doccument File List 조회 
        	   }
        	   break;
           case "SEARCH_HWIFRT":	// Hawaii Freight 탭의 목록조회
       		if(frm1.bl_sts_cd.value!='NA'){
				// Hawaii Freight List 조회
       			searchGrid(15);
       		}
       		break;
	   	   case "CALLCT":
	   		   ajaxSendPost(getCtradeAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCtradeKey', './GateServlet.gsl');
	   		   break;
		   //2010.12.20 김진혁 추가, 항공은 set 버튼을 통해 BL의 CBM, C.weight, G.weight 값을 Freight에 반영함.
	   	   case "SET":
	   		   //해상은 LCL 건만 세팅을 사용할 수 있음.
	   		   if(frm1.shp_mod_cd.value=="LCL"){
		   		   //Freight에 Row가 없으면 set 할 수 없음. 
	   			   fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
 		   		   if(docObjects[5].RowCount()-2==0 && docObjects[6].RowCount()-2==0){
		   			   //세팅할 Freight정보가 없습니다.
		   			   alert(getLabel('FMS_COM_ALT010'));
		   		   }
		   		   else{
		   			   //해상은 LCL 건만 적용함.
	   				   setFrtAuto(docObjects[5], "");
		   			   setFrtAuto(docObjects[6], "b_");
		   		   }
	   		   }
	   		   else{
	   			   //해상은 LCL 건만 세팅할 수 있습니다.
	   			   alert(getLabel('SEA_COM_ALT009'));
	   		   }
	   		   break;
	   	   case "CAL_CBM_NEW":
	   		   fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	   		   var rowCnt=docObjects[1].LastRow() + 1;
	   		   docObjects[1].DataInsert(rowCnt);
	   		   docObjects[1].SetCellValue(rowCnt, "cbm",0);
	   		   break;
	   	   /*
	   	   case "CAL_CBM_DEL":
	   		   var row=docObjects[1].GetSelectRow();
if(docObjects[1].GetCellValue(row, "cal_ibflag")=="I"){
	   			   docObjects[1].RowDelete(row, false);
	   		   }else{
	   			   //실제 database에서 삭제 로직
	   			   docObjects[1].RowDelete(row, true);
	   			   frm1.f_cmd.value=COMMAND11; //Dim Delete Logic
	   			   docObjects[1].DoSave("./SEE_BMD_0021_2GS.clt", FormQueryString(frm1), "dim_ibflag", false);
	   		   }
	   	   break;
	   	   */
		   	case "COUNTRY_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
		   		rtnary[0]="1";
		   		rtnary[1]="";
		   		callBackFunc = "COUNTRY_POPLIST";
		   		modal_center_open('./CMM_POP_0020.clt', rtnary, 1150,480,"yes");
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
		   		
		   		//#3873 [JAPT]  T/S popup , validation and sync.
		   		var intgBlSeqTs = "";
		   		if(frm1.intg_bl_seq.value != ""){
		   			intgBlSeqTs = frm1.intg_bl_seq.value;
		   		}else{
		   			intgBlSeqTs = frm1.rlt_intg_bl_seq.value;
		   		}
		   		modal_center_open('./SEE_BMD_0190.clt?f_cmd='+SEARCH + '&f_intg_bl_seq='+intgBlSeqTs, rtnary, 380,215,"no");
		   		
		   		/*var paramStr="./SEE_BMD_0190.clt?f_cmd="+SEARCH+"&f_intg_bl_seq="+frm1.intg_bl_seq.value;
		   		//alert(paramStr);
	   	        var rtnVal =  ComOpenWindow(paramStr,  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:380px;dialogHeight:200px" , true);*/
	   	        
	   	        break;
		   	case "GOTOACCT":
		   		var formObj=document.frm1;
		   		if(formObj.bl_no.value!=''){
		   		   	var paramStr="./ACC_INV_0040.clt?";
		   		   	//hsk
		   		   	paramStr+= 'f_mhbl_no=' + formObj.bl_no.value
  		   			 +"&s_intg_bl_seq="+formObj.intg_bl_seq.value
  		   			 +"&f_ref_no="+formObj.ref_no.value;
		   		   	paramStr+= "&refType=fileNo";
		   		   	paramStr+= "&linkFlag=Y&blType=HBL";
		   		    
		   		   	//#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : Link시 검색기간 제외 조회 옵션처리
					paramStr+= "&linkOpt=KEY";
					// OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
					paramStr+= "&f_air_sea_clss_cd=S&f_bnd_clss_cd=O";
					
		   		   	parent.mkNewFrame('Invoice List', paramStr);
	   	 		}
	   	 		break;
		   	case "AES":
		   		var formObj=document.frm1;
		   		if(formObj.bl_no.value!=""){
	   				var paramStr="./SEE_BMD_0120.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+formObj.bl_no.value;
	   				parent.mkNewFrame('A.E.S', paramStr);
	   			}
	   			break;
		   	case "PRINT":
           		openPopUp('PRINT');
           		break;	
           		
		   	case "HI_PRINT":
		   		var formObj=document.frm1;
		   		
	   			if(formObj.intg_bl_seq.value == ""){
	   				alert(getLabel('FMS_COM_ALT004'));
	   				return;
	   			}
	   			
	   			formObj.title.value="Ocean Export House B/L";
				formObj.file_name.value="bnxd_hawaii_hbl.mrd";
				
				var intgBlSeq=formObj.intg_bl_seq.value;
				var refOfcCd=formObj.ref_ofc_cd.value;
				
				// Parameter Setting
				var param = '[' + intgBlSeq + ']';
				param += '[' + refOfcCd + ']';
	   			param += '[' + v_phn + ']';
	   			param += '[' + v_fax + ']';
	   			param += '[S]'; // Air/Ocean
				formObj.rd_param.value = param;
				formObj.rpt_biz_tp.value = "OEH";
				formObj.rpt_biz_sub_tp.value = "BL";
				formObj.mailTitle.value = 'House BL No : ' + formObj.bl_no.value;
				
				popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				break;
			
		   	case "TELEXRELEASE":
		   		var formObj=document.frm1;
		   		
	   			if(formObj.intg_bl_seq.value == ""){
	   				alert(getLabel('FMS_COM_ALT004'));
	   				return;
	   			}
	   			
	   			formObj.title.value="Ocean Export House B/L";
				formObj.file_name.value="telex_release_letter.mrd";
				
				var intgBlSeq=formObj.intg_bl_seq.value;
				var refOfcCd=formObj.ref_ofc_cd.value;
				
				// Parameter Setting
				var param = '[' + intgBlSeq + ']';
				param += '[]';
				param += '[]';
				param += '[' + refOfcCd + ']';
				param += '[' + v_phn + ']';
	   			param += '[' + v_fax + ']';
				param += '[S]'; // Air/Ocean
				formObj.rd_param.value = param;
				formObj.rpt_biz_tp.value = "OEH";
				formObj.rpt_biz_sub_tp.value = "BL";
				formObj.mailTitle.value = 'House BL No : ' + formObj.bl_no.value;
				
				popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				break;	
                // 2013.8.3 jsjang
	   		case 'BOOKING_CONFIRMATION':
	   			/*20151117 적용 #50431 */
	   			/**/
	   			openPopUp('B_CONFIRM');
           		break;
	   			
		   		/*var formObj=document.frm1;
	   			if(formObj.intg_bl_seq.value == ""){
	   				alert(getLabel('FMS_COM_ALT004'));
	   				return;
	   			}
				formObj.file_name.value='booking_confirmation.mrd';
	   			formObj.title.value='Booking Confirmation';
	   			// Parameter Setting
	   			var param='';
	   			param += '[' + formObj.intg_bl_seq.value + ']'; // $1
	   			param += '[' + v_ofc_eng_nm + ']';		//2
	   			param += '[' + v_eml + ']';		//3
	   			param += '[' + v_ofc_cd + ']';	//4
	   			param += '[' + v_phn + ']';		//5
	   			param += '[' + v_fax + ']';		//6
				//#24658 [GPL] Arrival Notice에다 "Place of Receipt" 추가
				if (prn_ofc_cd == "GPL") {
					param += '[]';								//7
					param += '[Y]';								//8
				} else {
					param += '[]';								//7
					param += '[N]';								//8
				}
				//console.log(param);
	   			formObj.rd_param.value=param;
				formObj.intg_bl_seq.value=formObj.intg_bl_seq.value;
				formObj.rpt_biz_tp.value="OEH";
				formObj.rpt_biz_sub_tp.value="BC";
				popPOST(formObj, 'RPT_RD_0010.clt', 'popB_Confirm', 1025, 740);	 		
				break; */
	   		case "ShippingAdvice":
	   			var formObj=document.frm1;
	   			var blNo=formObj.bl_no.value;
				var intgBlSeq=formObj.intg_bl_seq.value;
				var refOfcCd=frm1.ref_ofc_cd.value;
				var refOfcCnt=user_ofc_cnt_cd;
				var custTrdpCd   = formObj.cust_trdp_cd.value;
				var custTrdpNm   = formObj.cust_trdp_nm.value;
				var custTrdpAddr = formObj.cust_trdp_addr.value;
				//HBL의 ref_ofc의 국가코드가 독일일 경우 바로 프린트 창을 띄움
				//if(refOfcCnt != "DE"){
					var reqParam='?air_sea_tp=' + 'S';
					reqParam += '&bl_no=' + blNo;
					reqParam += '&intg_bl_seq=' + intgBlSeq;
					reqParam += '&ref_ofc_cd=' + refOfcCd;
					reqParam += '&cust_trdp_cd=' + custTrdpCd;
					reqParam += '&cust_trdp_nm=' + custTrdpNm;
					reqParam += '&cust_trdp_addr=' + custTrdpAddr;
					reqParam += '&mailTitle=' + 'Shipping Advice [Ocean Export House BL No : ' + formObj.bl_no.value + ']';
	         		var trdp_cd='';
	         		trdp_cd += '(' + '\'' + frm1.shpr_trdp_cd.value + '\'';
	         		trdp_cd += ',' + '\'' + frm1.prnr_trdp_cd.value  + '\'' + ')';
	         		ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
	         		reqParam += '&mailTo=' + mailTo;
					popGET('RPT_PRN_0120.clt'+reqParam, '', 470, 470, "scroll:yes;status:no;help:no;");
				/*
        		}else{
					formObj.title.value='Shipping Advice';
					formObj.file_name.value='shipping_advice_oe_hbl_de_01.mrd';
					//Parameter Setting
					var param='[' + intgBlSeq + ']';
					formObj.rd_param.value=param;
					formObj.mailTitle.value='Shipping Advice [Ocean Export House BL No : ' + formObj.bl_no.value + ']';;
					var trdp_cd='';
	         		trdp_cd += '(' + '\'' + frm1.shpr_trdp_cd.value + '\'';
	         		trdp_cd += ',' + '\'' + frm1.prnr_trdp_cd.value + '\'' + ')';
					ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
					formObj.mailTo.value=mailTo;
					formObj.rpt_biz_tp.value="OEH";
					formObj.rpt_biz_sub_tp.value="SA";
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
				*/
	   	 		break;  
	   	 	/* #20428 : [BINEX] A/R, A/P, D/C등이 보이는 화면에서 Profit Report 버튼 추가 (Entry 화면에서) jsjang 2013.9.10 */	
	   	 	case "PROFIT_REPORT":
				var reqParam='?intg_bl_seq=' + frm1.intg_bl_seq.value;
					reqParam += '&hbl_no=' + frm1.bl_no.value;
					reqParam += '&ref_no=' + frm1.ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "S";
					reqParam += '&bnd_clss_cd=' + "O";
					reqParam += '&biz_clss_cd=' + "H";
					reqParam += '&mbl_no=' + frm1.mbl_no.value;
					popGET('RPT_PRN_0200.clt'+reqParam, '', 1100, 750, "scroll:yes;status:no;help:no;");
		   	 	break;				   	 	
	   	 	case "S_DOC":
	   	 	    fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
        		var sheetObj3=docObjects[9];	
	   	 		if(sheetObj3.GetTotalRows()> 0){
	   	 			var formObj=document.frm1;
	   	 			formObj.file_name.value='doc_list.mrd';
	   	 			formObj.title.value='Document List';
	   	 			//Parameter Setting
	   	 			var param='[' + formObj.intg_bl_seq.value + ']';											// [1]
	   	 			param += '[OEH]'; 																			// [2] MASTER/HOUSE/OTH 여부
	   	 			param += '[' + formObj.bl_no.value + ']';													// [3] MBL_NO
	   	 			param += '[' + formObj.user_id.value + ']';													// [4]
	   	 			formObj.rd_param.value=param;
	   	 			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   	 		}
	   	 		break; 
	   	 		
			case "PACKAGE_LABEL":
				if (frm1.intg_bl_seq.value != "") {
					var reqParam = '';
					reqParam += '?s_intg_bl_seq='+ frm1.intg_bl_seq.value;
					reqParam += '&biz_clss_cd=' + "H";
					reqParam += '&label_type=' + "01";
					popGET('SEE_BMD_0061.clt' + reqParam, '', 600, 440,"scroll:yes;status:no;help:no;");
				}
				break;
				
			case "PACKAGE_LABEL2":
				if (frm1.intg_bl_seq.value != "") {
					var reqParam = '';
					reqParam += '?s_intg_bl_seq='+ frm1.intg_bl_seq.value;
					reqParam += '&biz_clss_cd=' + "H";
					reqParam += '&label_type=' + "02";
					popGET('SEE_BMD_0061.clt' + reqParam, '', 600, 440,"scroll:yes;status:no;help:no;");
				}
				break;

			// #3942 [Impex] Preliminary Claim add to Export
	   	 	case "PreliminaryClaim":
				var reqParam='?air_sea_tp=' + 'S';
				reqParam += '&intg_bl_seq=' + frm1.intg_bl_seq.value;
				reqParam += '&hbl_no=' + frm1.f_bl_no.value;
				reqParam += '&ref_no=' + frm1.ref_no.value;
				reqParam += '&cgor_pic_info=' + oi_cgor_pic_info;
				popGET('RPT_PRN_0230.clt'+reqParam, '', 620, 565, "scroll:yes;status:no;help:no;");
				break;				
				
			case "SEARCHLIST_BY_BOOKING_NO":	//조회
                frm1.bkg_no.value = trim(frm1.f_bkg_no.value);
                if (frm1.f_bkg_no.value == '') {
                    alert(getLabel('FMS_COM_ALT014'));
                    frm1.f_bkg_no.focus();
                    return;
                }
                else {
                    if (frm1.f_bkg_no.value != '') {
                        frm1.bkg_seq.value = '';
                    }
                    frm1.f_cmd.value = SEARCHLIST15;
                    submitForm(SEARCHLIST15);
                }
                break;	
                
            //#1266 [CLT] OEH B/L Entry 에서 Booking 번호지정 시 Booking Data Copy 로직
			case "BKNO_POPLIST_OEH":
				rtnary=new Array(1);
				rtnary[0]="";
	   			rtnary[1]='Y';
	   			callBackFunc = "BKNO_POPLIST_OEH";
	   			modal_center_open('./CMM_POP_0210.clt', rtnary, 818,500,"yes");
	   			
			break;
		
			case "COMMERCIAL_INVOICE":
				var formObj=document.frm1;
				if(formObj.bl_no.value!=''){
		   			 var paramStr="./SEE_BMD_0130.clt?f_cmd="+SEARCHLIST;
					 paramStr+= "&txt_hbl_no=" + formObj.bl_no.value;
					 paramStr+= "&intg_bl_seq=" + formObj.intg_bl_seq.value;
		   		   	 parent.mkNewFrame('Commercial Invoice', paramStr);
		   		 }
		 	break;
   	 		case "PACKING_LIST":
   	 			var formObj=document.frm1;
	   	 		if(formObj.bl_no.value!=''){
		   			 var paramStr="./SEE_BMD_0140.clt?f_cmd="+SEARCHLIST;
		   			 paramStr+= "&txt_hbl_no=" + formObj.bl_no.value;
					 paramStr+= "&intg_bl_seq=" + formObj.intg_bl_seq.value;
		   		   	 parent.mkNewFrame('Packing List', paramStr);
		   		 }
	 		break;
   	 		case "CERT_ORIGIN":
	   	 		var formObj=document.frm1;
	   	 		if(formObj.bl_no.value!=''){
		   			 
		   			 var paramStr="./SEE_BMD_0150.clt?f_cmd="+SEARCHLIST;
		   			 paramStr+= "&txt_hbl_no=" + formObj.bl_no.value;
					 paramStr+= "&intg_bl_seq=" + formObj.intg_bl_seq.value;
		   		   	 parent.mkNewFrame('Certificate Origin', paramStr);
		   		 }
	 		break;
   	 		case "BANK_DRAFT":
	   	 		var formObj=document.frm1;
	   	 		if(formObj.bl_no.value!=''){
		   			
		   			var paramStr="./SEE_BMD_0110.clt?f_cmd="+SEARCHLIST;
			   		 paramStr+= "&txt_hbl_no=" + formObj.bl_no.value;
					 paramStr+= "&intg_bl_seq=" + formObj.intg_bl_seq.value;
		   		   	 parent.mkNewFrame('Bank Draft', paramStr);
		   		 }
	 		break;
				
        }
        
		//Log Monitor Start:Btn
		if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
		//Log Monitor End:Btn
		
    }
    catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
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

function COUNTRY_POPLIST(rtnVal){
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
        else{
		var rtnValAry=rtnVal.split("|");
		frm1.cnt_cd.value=rtnValAry[0];//cd_val
		frm1.cnt_nm.value=rtnValAry[1];//cd_nm
		//frm1.cnt_nm.onchange();
	}
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
function validateAccountPayable(){
	/*
	for(var i=2; i<=docObjects[6].RowCount()+2; i++){
if(docObjects[6].GetCellValue(i, docObjects[6].SaveNameCol("b_fr_inv_sum_amt"))*1 == 0){
			alert(getLabel('FMS_COM_000000') + " - " + getLabel('FMS_COD_AMT') + "/" + getLabel('FMS_COD_RATE'));
			docObjects[6].SelectCell(i, docObjects[6].SaveNameCol("b_fr_qty"));
			return false;
		}
	}
	*/
	return true;
}
//2010.12.20 김진혁 추가, 앞의 정보 중 CBM 값을 Freight에 끌어오는 로직
function setFrtAuto(sheetObj, prepix) {
	fnSetIBsheetInitId(sheetObj.id);   //grid가 생성되지않았으면 생성(속도개선)
	
 	for(var i=2;i<sheetObj.LastRow() + 1;i++){
 		if(sheetObj.GetCellValue(i, prepix+"fr_inv_sts_cd")=="FI" || sheetObj.GetCellValue(i, prepix+"fr_inv_sts_cd")==""){
 			if(sheetObj.GetCellValue(i, prepix+"fr_aply_ut_cd") == "CBM"){
				//해상의 경우 CBM이 1보다 작으면 MIN 1로 표기함.
				if(frm1.meas.value<1){
					sheetObj.SetCellValue(i, prepix+"fr_qty",1);
				}
				else{
					//WHF의 경우 무조건 올림한 정수로 표기함.
					if(sheetObj.GetCellValue(i, prepix+"fr_frt_cd")=="WHF"){
						sheetObj.SetCellValue(i, prepix+"fr_qty",Math.ceil(frm1.meas.value));
					}
					else{
						sheetObj.SetCellValue(i, prepix+"fr_qty",frm1.meas.value);
					}
				}
			}
		}
	}
}
/**
 * Ctrade 화면
 **/
function getCtradeAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	fnSetIBsheetInit(0);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split(',');
			var myform=document.forms[1];
			myform.insertBefore(createHidden("ctwId",masterVals[0]));
			myform.insertBefore(createHidden("ctwPass",masterVals[1]));
			myform.insertBefore(createHidden("returnUrl","http://www.ctradeworld.com/logis/mf/mf3510q0.jsp"));
			myform.action="http://www.ctradeworld.com/ctwpass/autoLoginChk.jsp";
			myform.method="post";
			myform.target="winName";
			window.open("about:blank","winName",'left=100, width=680, height=600');
			myform.submit();
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
function goToBlPage(toPage, toNo){
	if(toNo!==''){
		if(toPage=='view_hbl'){
		   	var paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+toNo;
		   	parent.mkNewFrame('Booking & HBL', paramStr);
		}
		else if(toPage=='view_mbl'||toPage=='view_sr'){
			var formObj=document.frm1;
		   	var paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST;
		   	paramStr+= '&f_bl_no='+toNo+'&f_hbl_intg_bl_seq='+frm1.intg_bl_seq.value;
		   	parent.mkNewFrame('Master B/L Entry', paramStr);
		}
	}
}
function searchGrid(gridIdx){
	switch(gridIdx){
		case 1:
			//Booking Container 조회
	        frm1.f_cmd.value=SEARCHLIST01;
	 	   	//docObjects[11].DoSearch4Post("./SEE_BMD_0021GS.clt", FormQueryString(frm1));
	        break;
		case 2:
			//Doccument File List 조회
	        frm1.f_cmd.value=SEARCHLIST02;
	        fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
 	 	   	docObjects[9].DoSearch("./SEE_BMD_0021_1GS.clt", FormQueryString(frm1) );
	 	   	break;
		case 3:
			//수출신고 번호 조회
			frm1.f_cmd.value=SEARCHLIST03;
			fnSetIBsheetInit(12);   //grid가 생성되지않았으면 생성(속도개선)
//			docObjects[12].DoSearch4Post("./SEE_BMD_0022GS.clt", FormQueryString(frm1));
			docObjects[12].DoSearch("./SEE_BMD_0022GS.clt", FormQueryString(frm1));
			break;
		case 4:
			//Container List 조회
			frm1.f_cmd.value=SEARCHLIST04;
			fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[2].DoSearch("./SEE_BMD_0023GS.clt", FormQueryString(frm1) );
			break;
		case 5:
			//Commodity List 조회
			setItemCntrList();
			frm1.f_cmd.value=SEARCHLIST05;
			fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[3].DoSearch("./SEE_BMD_0023_1GS.clt", FormQueryString(frm1) );
			break;
		case 6:
			//Freight될 Container 조회
			frm1.f_cmd.value=SEARCHLIST01;
			fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[4].DoSearch("SEE_FRT_0010GS.clt", FormQueryString(frm1) );
			break;
		case 7:
			//Selling/Debit Freight 조회
			frm1.f_cmd.value=SEARCHLIST06;
			fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[5].DoSearch("./SEE_BMD_0024GS.clt", FormQueryString(frm1) );
			break;
		case 8:
			//Buying/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST07;
			fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[6].DoSearch("./SEE_BMD_0024_1GS.clt", FormQueryString(frm1) );
			break;
		case 9:
			//WorkOrder List 조회
			frm1.f_cmd.value=SEARCHLIST08;
			fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[7].DoSearch("./SEE_BMD_0025GS.clt", FormQueryString(frm1) );
			break;
		case 10: 
			//처리내역( Job temlate에 따라서)
			frm1.f_cmd.value=SEARCHLIST09;
			fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[8].DoSearch("./SEE_BMD_0026GS.clt", FormQueryString(frm1) );
			break;
		case 11:
			//Change Log
			frm1.f_cmd.value=SEARCHLIST10;
			fnSetIBsheetInit(10);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[10].DoSearch("./SEE_BMD_0026_1GS.clt", FormQueryString(frm1) );
			break;
		case 12:
			//Dim
			frm1.f_cmd.value=SEARCHLIST11;
			fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[1].DoSearch("./SEE_BMD_0021_2GS.clt", FormQueryString(frm1) );
			break;
		case 13:
			//Debit/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST12;
			fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[13].DoSearch("./SEE_BMD_0024_2GS.clt", FormQueryString(frm1) );
			break;
		case 14:
			//User Defined Field 조회
			frm1.f_cmd.value=SEARCHLIST13;
			fnSetIBsheetInit(14);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[14].DoSearch("./SEE_BMD_0026_2GS.clt", FormQueryString(frm1) );
			break;
		case 15:
			// Hawaii Freight List 조회
			frm1.f_cmd.value=SEARCHLIST14;
			fnSetIBsheetInit(15);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[15].DoSearch("./SEE_BMD_0032GS.clt", FormQueryString(frm1) );
			break;
		case 16:
			//Bkg 에서 HBL Create를 하였을 경우 Container List 조회
			frm1.f_cmd.value=SEARCHLIST16;
			fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[2].DoSearch("./SEE_BMD_0023GS.clt", FormQueryString(frm1) );
			break;
		case 17:
			//Bkg 에서 HBL Create를 하였을 경우 Selling/Debit Frt List 조회
			frm1.f_cmd.value=SEARCHLIST17;
			fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[5].DoSearch("./SEE_BMD_0024GS.clt", FormQueryString(frm1) );
			break;
	}
}
/**
 * 파일 업로드 팝업에서 목록 Reload
 */
function reloadDocList(){
	searchGrid(2);
}
function getHblCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=''){
				/*
				 *  2012.02.24
				 * 중복되면 저장 수행 안함
				 */
				//'HB/L No. is duplicate.');
				alert(getLabel('FMS_COM_ALT008'));
				frm1.bl_no.focus();
//				//'B/L No. is duplicated. \nDo you want to create MBL?'
//				if(confirm(getLabel('FMS_COM_ALT008') + getLabel('FMS_COM_CFMCON'))){
//	            	   gridAdd(0);
//	            	   docObjects[0].CellValue(1, 1) = 1;
//	            	   
//	            	   //save post date, office info
//	            	   if(ofc_post_dt=="ETD"){
//	            		   frm1.post_dt.value = frm1.etd_dt_tm.value;
//	            	   }else if(ofc_post_dt=="ETA"){
//	            		   frm1.post_dt.value = frm1.eta_dt_tm.value;
//	            	   }
//	            	   
//	            	   doShowProcess();
//	                   frm1.f_cmd.value = ADD;
//	            	   docObjects[0].DoAllSave("./SEE_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
//	        	   }
			}else{
	    	    //'Do you want to save HB/L?')){
				if(isMBLCreated || confirm(getLabel(saveMsg))){
	    		   resetCopyFrt(getSdSheet(), getBcSheet());
	    		   gridAdd(0);
            	   docObjects[0].SetCellValue(1, 1,1);
//            	   //save post date, office info
//            	   if(ofc_post_dt=="ETD"){
//            		   frm1.post_dt.value = frm1.etd_dt_tm.value;
//            	   }else if(ofc_post_dt=="ETA"){
//            		   frm1.post_dt.value = frm1.eta_dt_tm.value;
//            	   }
        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}
        		   
        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
            	   doShowProcess();
            	   //docObjects[0].DoAllSave("./SEE_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
            	   docObjects[0].DoAllSave("./SEE_BMD_0020GS.clt", FormQueryString(frm1)+sndParam+'&isMBLCreated=' + isMBLCreated, true);
            	   isMBLCreated =false;
        	    }
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function getHblCheckModify(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=''){
				/*
				 *  2012.02.24
				 * 중복되면 저장 수행 안함
				 */
				//'HB/L No. is duplicate.');
				alert(getLabel('FMS_COM_ALT008'));
				frm1.bl_no.focus();
//					//'B/L No. is duplicated. \nDo you want to create MBL?'
//					if(confirm(getLabel('FMS_COM_ALT008') + getLabel('FMS_COM_CFMCON'))){
//		            	   gridAdd(0);
//		            	   docObjects[0].CellValue(1, 1) = 1;
//		            	   
//		            	   //save post date, office info
//		            	   if(ofc_post_dt=="ETD"){
//		            		   frm1.post_dt.value = frm1.etd_dt_tm.value;
//		            	   }else if(ofc_post_dt=="ETA"){
//		            		   frm1.post_dt.value = frm1.eta_dt_tm.value;
//		            	   }
//		            	   
//		            	   doShowProcess();
//		                   frm1.f_cmd.value = ADD;
//		            	   docObjects[0].DoAllSave("./SEE_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
//		        	   }
			}else{
			    //BL No. 가 없을 경우
 			    //The [HB/L No.] is Blank. Generate the Number? Yes/No. Yes 일 경우 Save 진행 
 			    var blNullChk=true;
       		    if(frm1.bl_no.value == ""){
       			    blNullChk=confirm(getLabel('SEA_COM_ALT022'));
       		    }
       		    if(blNullChk){
		    	    //'Do you want to save HB/L?')){
					if(confirm(getLabel(saveMsg))){
		    		   resetCopyFrt(getSdSheet(), getBcSheet());
		    		   gridAdd(0);
	            	   docObjects[0].SetCellValue(1, 1,1);
	//            	   //save post date, office info
	//            	   if(ofc_post_dt=="ETD"){
	//            		   frm1.post_dt.value = frm1.etd_dt_tm.value;
	//            	   }else if(ofc_post_dt=="ETA"){
	//            		   frm1.post_dt.value = frm1.eta_dt_tm.value;
	//            	   }
	        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
	        		   var sndParam=getSndParam();
	        		   if(sndParam == true)	{	return false;	}	            	   
	            	   doShowProcess();
	            	   //docObjects[0].DoAllSave("./SEE_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
	            	   docObjects[0].DoAllSave("./SEE_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
	        	    }
		    	}	
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}	
/**
 * Inventory 조회팝업
 * 사용되지 않는 팝업??
 */
function getCntrList(){
	rtnary=new Array(1);
		rtnary[0]="1";
	var rtnVal =  ComOpenWindow('./SEE_BMD_0027.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:650px;dialogHeight:480px" , true);
	if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
	 	return;
	}
	else{
		var rtnRows=rtnVal.split("|");
		var rtnLen=rtnRows.length;
		rtnLen--;
		fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
 		var intRows=docObjects[2].LastRow() + 1;
 		if(docObjects[2].GetCellValue(1, 'cntr_no')==''){
			intRows--;
		}
		for(var i=0; i < rtnLen; i++){
			var cntrInfo=rtnRows[i].split(",");
			if(checkCntrNo(cntrInfo[0])){
				docObjects[2].DataInsert(intRows);
				docObjects[2].SetCellValue(intRows, 'cntr_no',cntrInfo[0]);
				docObjects[2].SetCellValue(intRows, 'soc_flg',cntrInfo[1]);
				docObjects[2].SetCellValue(intRows, 'cntr_tpsz_cd',cntrInfo[2]);
				docObjects[2].SetCellValue(intRows, 'cntr_sprl_trdp_cd',cntrInfo[3]);
				docObjects[2].SetCellValue(intRows, 'cntr_sprl_trdp_nm',cntrInfo[4]);
				docObjects[2].SetCellValue(intRows, 'rgst_cntr_yn','Y');
				intRows++;
			}
			else{
				//Container No.['+cntrInfo[0]+'] is already used
				alert(getLabel('FMS_COM_ALT025') + "\n - " + cntrInfo[0]);
			}
		}
	}
}
/**
 * 26239
 * Filing No(Ref_NO)로 Container 조회
 */
function getRefCntrList(){
	/*
	 * AJAX로 변경 Filing(Ref_NO)의 컨테이너를 전부 가져와서 ADD 하도록 변경
	 */
	
	if(frm1.ref_no.value==''){
		// There is no Ref No.
		alert(getLabel('FMS_COM_ALT010') + " - " + getLabel('FMS_COD_REFN'));
		return;
	}else{
		sheetObj=docObjects[2];
		
		//BKG_CREATE  #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발
		
		//#2460 [PATENT] HB/L Entry에서 Booking No 지정 시 Container List에 잘못된 Container 정보 표시
//		if (bkgCreat) {
//			ajaxSendPost(getRefCntr, 'reqVal', '&goWhere=aj&bcKey=getRefCntr&f_ref_no='+frm1.ref_no.value, './GateServlet.gsl');
//			bkgCreat = false; //#1266 [CLT] OEH B/L Entry 에서 Booking 번호지정 시 Booking Data Copy 로직    
//			
//		}else{
			
			for (var i=1; i<sheetObj.LastRow() + 1 ; i++) {		
				if (sheetObj.GetCellValue(i, 'conls_ibflag') != 'I') {
					sheetObj.SetCellValue(i, 'conls_ibflag','D');
					sheetObj.SetRowHidden(i,1);
				} else {
					sheetObj.RowDelete(i, false);
					i--;
				}
			}
			//#3338 [C&L] House container value is not equal with Master container
			ajaxSendPost(getRefCntr, 'reqVal', '&goWhere=aj&bcKey=getRefCntr&bnd_clss_cd=O&f_ref_no='+frm1.ref_no.value, './GateServlet.gsl');
//		}
	}
	// Cntr Sheet를 조회했으므로 Ctnr탭의 재조회를 방지하기 위해 TabClick를 Y로 업데이트 한다.
	tab2click="Y";
}
/**
 * 26239
 * Filing No(Ref_NO)로 Item 조회
 */
function getRefItemList(){
	/*
	 * AJAX로 변경 Filing(Ref_NO)의 Item을 전부 가져와서 ADD 하도록 변경
	 */
	if(frm1.ref_no.value==''){
		// There is no Ref No.
		alert(getLabel('FMS_COM_ALT010') + " - " + getLabel('FMS_COD_REFN'));
		return;
	}else{
		fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
		sheetObj=docObjects[3];
		for (var i=1; i<sheetObj.LastRow() + 1 ; i++) {		
			if (sheetObj.GetCellValue(i, 'item_ibflag') != 'I') {
				sheetObj.SetCellValue(i, 'item_ibflag','D');
				sheetObj.SetRowHidden(i,1);
			} else {
				sheetObj.RowDelete(i, false);
				i--;
			}
		}
		ajaxSendPost(getRefItem, 'reqVal', '&goWhere=aj&bcKey=getRefItem&f_ref_no='+frm1.ref_no.value, './GateServlet.gsl');
	}
	// Cntr Sheet를 조회했으므로 Ctnr탭의 재조회를 방지하기 위해 TabClick를 Y로 업데이트 한다.
	tab2click="Y";
}

/**
 * Master Container 조회팝업
 */
function getMasterCntrList(){
	/*
	 * AJAX로 Master의 컨테이너를 전부 가져와서 ADD 하도록 변경
	 */
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	if(frm1.ref_no.value==''){
		//There is no Ref No.
		//alert(getLabel('FMS_COM_ALT010') + " - " + getLabel('FMS_COD_REFN'));
		//return;
		cntrGridAdd(docObjects[2]);
		var lastRow = docObjects[2].LastRow();
		docObjects[2].SetCellEditable(lastRow, "cntr_no", 1);
		docObjects[2].SetCellEditable(lastRow, "cntr_tpsz_cd", 1);
		docObjects[2].SetCellEditable(lastRow, "seal_no1", 1);
		docObjects[2].SetCellEditable(lastRow, "seal_no2", 1);
		docObjects[2].SetCellEditable(lastRow, "cntr_ref_no", 1);
		setBizContainerTPSZInfo();
	}else{
		if(docObjects[2].GetCellValue(1, "cntr_no")==''){
			//docObjects[2].RemoveAll();
		}
		
		 /* jsjang 2013.7.5  요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 start */ 		
		//ajaxSendPost(getMasterCntr, 'reqVal', '&goWhere=aj&bcKey=getMasterCntr&f_ref_no='+frm1.ref_no.value, './GateServlet.gsl');
		//#3338 [C&L] House container value is not equal with Master container
		ajaxSendPost(getMasterCntr, 'reqVal', '&goWhere=aj&bcKey=getMasterCntr&f_ref_no='+frm1.ref_no.value+'&f_intg_bl_seq='+frm1.intg_bl_seq.value+'&bnd_clss_cd=O&f_rlt_intg_bl_seq='+frm1.rlt_intg_bl_seq.value, './GateServlet.gsl');	//[20130822  ojg] rlt_intg_bl_seq파라미터추가
		 /* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end */ 			  
	}
//	rtnary = new Array(1);
//	if(frm1.ref_no.value!=""){
//		rtnary[0] = frm1.ref_no.value;
//	}else{
//		return;
//	}
//	
//	var rtnVal = window.showModalDialog('./SEE_BMD_0029.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:650px;dialogHeight:480px");
//	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
//		return;
//		
//	}else{
//		var rtnRows = rtnVal.split("|");
//		var rtnLen = rtnRows.length;
//		rtnLen--;
//		var intRows = docObjects[2].LastRow() + 1;
//		if(docObjects[2].CellValue(1, 'cntr_no')==''){
//			intRows--;
//		}
//		for(var i = 0; i < rtnLen; i++){
//			var cntrInfo = rtnRows[i].split(",");
//			//if(checkCntrNo(cntrInfo[0])){
//				docObjects[2].DataInsert(intRows);
//				docObjects[2].CellValue(intRows, 'cntr_no')           = cntrInfo[0];
//				docObjects[2].CellValue(intRows, 'soc_flg')           = cntrInfo[1];
//				docObjects[2].CellValue(intRows, 'cntr_tpsz_cd')      = cntrInfo[2];
//				docObjects[2].CellValue(intRows, 'cntr_sprl_trdp_cd') = cntrInfo[3];
//				docObjects[2].CellValue(intRows, 'cntr_sprl_trdp_nm') = cntrInfo[4];
//				docObjects[2].CellValue(intRows, 'seal_no1') 		  = cntrInfo[5];
//				docObjects[2].CellValue(intRows, 'rgst_cntr_yn')      = 'Y';
//
//				docObjects[2].CellValue(intRows, 'cgo_pck_qty') 	  = cntrInfo[6];
//				docObjects[2].CellValue(intRows, 'cgo_pck_ut') 		  = cntrInfo[7];
//
//				docObjects[2].CellValue2(intRows, 'cgo_wgt') 		  = cntrInfo[8];
//				docObjects[2].CellValue2(intRows, 'cgo_wgt1') 		  = cntrInfo[9];
//				docObjects[2].CellValue2(intRows, 'cgo_meas') 		  = cntrInfo[10];
//				docObjects[2].CellValue2(intRows, 'cgo_meas1') 		  = cntrInfo[11];
//				docObjects[2].CellValue2(intRows, 'vol_meas') 		  = cntrInfo[12];
//				intRows++;
////			}else{
////				alert('Container No.['+cntrInfo[0]+'] is already register.');
////			}
//		}
//	}
}
function getMasterCntr(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpList=doc[1].split("@;;@");
			var intRows=docObjects[2].LastRow() + 1;

			if(docObjects[2].GetCellValue(1, 'cntr_no')==''){
				intRows--;
			}

			var addCnt=0;
			for(var i=0 ; i<tmpList.length-1 ; i++){
				var tmp=tmpList[i].split("@^^@");
				if(checkAddCntrNo(tmp[0])){
					docObjects[2].DataInsert(intRows);
					docObjects[2].SetCellValue(intRows, 'cntr_no',tmp[0]);
					docObjects[2].SetCellValue(intRows, 'cntr_tpsz_cd',tmp[1]);
					docObjects[2].SetCellValue(intRows, 'seal_no1',(tmp[2]== "null"?"":tmp[2]));
					 /* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 start */ 
					//if((tmp[10] != null && tmp[10] != '' && tmp[10] == 'FCL') || frm1.hbl_tp_cd.value == "DR")
					//#5109 [JAPT]OEH & OIH - Container Sync Logic 수정  Duc.Nguyen
					if((tmp[10] != null && tmp[10] != '' && tmp[10] != 'FAK') || frm1.hbl_tp_cd.value == "DR" || frm1.hbl_tp_cd.value == "FW" || frm1.hbl_tp_cd.value == "DT")	
					{
						docObjects[2].SetCellValue(intRows, 'cgo_pck_qty',tmp[3]);
						docObjects[2].SetCellValue(intRows, 'cgo_pck_ut',tmp[4]);
						//#3338 [C&L] House container value is not equal with Master container
						docObjects[2].SetCellValue(intRows, 'cgo_wgt',tmp[5], 0);
						docObjects[2].SetCellValue(intRows, 'cgo_wgt1',tmp[6], 0);
						docObjects[2].SetCellValue(intRows, 'cgo_meas',tmp[7], 0);
						docObjects[2].SetCellValue(intRows, 'cgo_meas1',tmp[8], 0);
						docObjects[2].SetCellValue(intRows, 'dg_gds_flg',tmp[11]);
						docObjects[2].SetCellValue(intRows, 'cntr_rmk',tmp[12]);
						docObjects[2].SetCellValue(intRows, 'temp_val',tmp[16]);
						docObjects[2].SetCellValue(intRows, 'temp_cd',tmp[17]);
						docObjects[2].SetCellValue(intRows, 'vent_cd',tmp[18]);
						
						docObjects[2].SetCellValue(intRows, 'rc_flg',tmp[22]);
						docObjects[2].SetCellValue(intRows, 'mgset_flg',tmp[23]);
						docObjects[2].SetCellValue(intRows, 'ca_flg',tmp[24]);
						docObjects[2].SetCellValue(intRows, 'air_flow',tmp[25]);
						docObjects[2].SetCellValue(intRows, 'air_flow_unit',tmp[26]);
						docObjects[2].SetCellValue(intRows, 'humid',tmp[27]);
						
					}
					 /* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end */ 
					docObjects[2].SetCellValue(intRows, 'seal_no2',(tmp[9]== "null"?"":tmp[9]));
					docObjects[2].SetCellEditable(intRows, 'cntr_no', 0);
					docObjects[2].SetCellEditable(intRows, 'cntr_tpsz_cd', 0);
					docObjects[2].SetCellEditable(intRows, 'seal_no1', 0);
					docObjects[2].SetCellEditable(intRows, 'seal_no2', 0);
					
					//#304
					//[Starcluster] CARGO MANIFEST에서의 House Weight, CBM 자동 계산 로직
					docObjects[2].SetCellValue(intRows, 'm_cgo_pck_qty',tmp[3]);
					docObjects[2].SetCellValue(intRows, 'm_cgo_pck_ut',tmp[4]);
					docObjects[2].SetCellValue(intRows, 'm_cgo_wgt',tmp[5]);
					docObjects[2].SetCellValue(intRows, 'm_cgo_wgt1',tmp[6]);
					docObjects[2].SetCellValue(intRows, 'm_cgo_meas',tmp[7]);
					docObjects[2].SetCellValue(intRows, 'm_cgo_meas1',tmp[8]);
					
					//#996 [SHINE] CONTAINER LIST - REF NO. 항목 추가
					docObjects[2].SetCellValue(intRows, 'cntr_ref_no',(tmp[20]== "null"?"":tmp[20]));
					
					if(tmp[21] == "Y"){
						docObjects[2].SetCellValue(intRows, 'prt_cgo_flg',1);
					}else{
						docObjects[2].SetCellValue(intRows, 'prt_cgo_flg',0);
					}
					
					intRows++;
					addCnt++;
				}
			}
 			for(var i=1; i<=docObjects[2].LastRow(); i++){
				docObjects[2].SetCellValue(i, 'Seq',i);
			}

			if(addCnt == 0){
				//팀장님 지시 -> HBL에서는 Container 정보 추가되지 않도록 수정 (2018.01.17)
				/*
				//#2354 [PATENT] House Bill Based - Processing Logic Enhancement
				if(frm1.shp_mod_cd.value=="FCL" && frm1.hbl_cnt.value=="1"){
					docObjects[2].DataInsert(intRows);
					var lastRow = docObjects[2].LastRow();
					docObjects[2].SetCellEditable(lastRow, "cntr_no", 1);
					docObjects[2].SetCellEditable(lastRow, "cntr_tpsz_cd", 1);
					docObjects[2].SetCellEditable(lastRow, "seal_no1", 1);
					docObjects[2].SetCellEditable(lastRow, "seal_no2", 1);
					docObjects[2].SetCellEditable(lastRow, "cntr_ref_no", 1);
				}
				*/
			}
		}else{
			//팀장님 지시 -> HBL에서는 Container 정보 추가되지 않도록 수정 (2018.02.06)
			/*
			//#2354 [PATENT] House Bill Based - Processing Logic Enhancement
			if(frm1.shp_mod_cd.value=="FCL" && frm1.hbl_cnt.value=="1"){
				docObjects[2].DataInsert(docObjects[2].LastRow() + 1);
				var lastRow = docObjects[2].LastRow();
				docObjects[2].SetCellEditable(lastRow, "cntr_no", 1);
				docObjects[2].SetCellEditable(lastRow, "cntr_tpsz_cd", 1);
				docObjects[2].SetCellEditable(lastRow, "seal_no1", 1);
				docObjects[2].SetCellEditable(lastRow, "seal_no2", 1);
				docObjects[2].SetCellEditable(lastRow, "cntr_ref_no", 1);
			}
			*/
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
	// #3940 [BINEX, IMPEX] EXPORT 입력 에러 이슈.
	if(!(frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value != "") && frm1.shp_mod_cd.value =="FCL"){
		var cgo_pck_qty='0';
		var meas='0.000000';
		var meas1='0.000000';
		var grs_wgt = 0.000;
		var grs_wgt1=0.00;
		for(var j=1; j<=docObjects[2].LastRow(); j++){			
			cgo_pck_qty=parseInt(cgo_pck_qty) 			+ parseInt(docObjects[2].GetCellValue(j,"cgo_pck_qty"));
			meas=roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(docObjects[2].GetCellValue(j,"cgo_meas")), 6);
			meas1=roundXL(parseFloat(meas1), 6) 	+ roundXL(parseFloat(docObjects[2].GetCellValue(j,"cgo_meas1")), 6);
			grs_wgt=roundXL(parseFloat(grs_wgt), obl_decimal_len)*1.0 	+ roundXL(parseFloat(docObjects[2].GetCellValue(j,"cgo_wgt")), obl_decimal_len)*1.0;
			grs_wgt1=roundXL(parseFloat(grs_wgt1), obl_decimal_len) 	+ roundXL(parseFloat(docObjects[2].GetCellValue(j,"cgo_wgt1")), obl_decimal_len);
		}
		frm1.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(obl_decimal_len));		
		frm1.grs_wgt1.value=roundXL(frm1.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, obl_decimal_len);		 
		frm1.mk_grs_wgt1.value=frm1.grs_wgt1.value;
		frm1.mk_grs_wgt.value=frm1.grs_wgt.value;
		chkComma(frm1.grs_wgt1,8,obl_decimal_len);	
		frm1.mk_grs_wgt1.value =doMoneyFmt(frm1.mk_grs_wgt1.value);
		frm1.mk_grs_wgt.value = doMoneyFmt(frm1.mk_grs_wgt.value);		
		frm1.grs_wgt1.value=doMoneyFmt(Number(grs_wgt1).toFixed(obl_decimal_len));
		frm1.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(obl_decimal_len)); 
		frm1.mk_grs_wgt.value=frm1.grs_wgt.value;
		frm1.mk_grs_wgt1.value=frm1.grs_wgt1.value;
		chkComma(frm1.grs_wgt,8,obl_decimal_len);			
		frm1.mk_grs_wgt.value = doMoneyFmt(frm1.mk_grs_wgt.value);
		frm1.mk_grs_wgt1.value = doMoneyFmt(frm1.mk_grs_wgt1.value);	
		frm1.meas.value=doMoneyFmt(Number(meas).toFixed(obl_decimal_len));
		frm1.meas1.value=roundXL(frm1.meas.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, obl_decimal_len);
		frm1.mk_meas1.value=frm1.meas1.value;
		frm1.mk_meas.value=frm1.meas.value;		
		chkComma(frm1.meas1,8,obl_decimal_len);
		frm1.mk_meas.value = doMoneyFmt(frm1.mk_meas.value);
		frm1.mk_meas1.value = doMoneyFmt(frm1.mk_meas1.value);
		frm1.meas1.value=doMoneyFmt(Number(meas1).toFixed(obl_decimal_len));
		frm1.meas.value=roundXL(frm1.meas1.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, obl_decimal_len);
		
		chkComma(frm1.meas,8,obl_decimal_len);
		
		frm1.mk_meas.value=frm1.meas.value;
		frm1.mk_meas1.value=frm1.meas1.value;	
		frm1.mk_meas.value = doMoneyFmt(frm1.mk_meas.value);
		frm1.mk_meas1.value = doMoneyFmt(frm1.mk_meas1.value);
	}
	// #1543 [LBS] Container Type/Size Reefer, Ventill 항목 관리
	setBizContainerTPSZInfo();
}

/**
* Task No. : #1543
* Author : Huy.Mai
* Date : 2017/09/07
* Re- set enable or disable Temp, Unit, Vent
* Param : 
*/
function setBizContainerTPSZInfo(){
	var sheetObj = docObjects[2];
	for(var i=0;i<sheetObj.RowCount()+sheetObj.HeaderRows();i++){
		if(sheetObj.GetCellValue(i, "conls_ibflag") == "I"){
			var strCntrTpszCd = sheetObj.GetCellValue(i, "cntr_tpsz_cd");
			if(strCntrTpszCd != ''){
				ajaxSendPost(returnGetContainerTPSZFlags, 'reqVal', '&goWhere=aj&bcKey=selectContainerTPSZFlags&cntr_tpsz_cd='+strCntrTpszCd, './GateServlet.gsl');
			}
		}
	}
}

//#2667 [PATENT] Bugs were reported when doing internal testing for Partial B/L (Synchronization)
//var cntrFlg = false;
function getRefCntr(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	
	//( MBL에서 생성된 HBL(CustBooking 에서 넘어온 HBL이 아니고) && BOOKING NO 지정 안함(BKG_NO 값이 없으면)) || Cust Booking 에서 생성된 HBL일 경우
	// HBL에 MBL(Carrier BKG)의 CNTR 추가
	if((frm1.f_cmd_chk.value != 135 && !frm1.bkg_no.value)||frm1.f_cmd_chk.value == 135 ){
		if(doc[0]=='OK'){
			//frm1.bkg_no.value이 없을 경우 cntr 추가
			if(typeof(doc[1])!='undefined'){
				var tmpList=doc[1].split("@;;@");
	 			var intRows=docObjects[2].LastRow() + 1;

				//주석 해제 - Container No. 없는 경우 조회되면 안됨. (2018.02.02)
	 			if(docObjects[2].GetCellValue(1, 'cntr_no')==''){
					intRows--;
				}

	 			var addCnt=0;
				for(var i=0 ; i<tmpList.length-1 ; i++){
					var tmp=tmpList[i].split("@^^@");
					//주석 해제 - Container No. 없는 경우 조회되면 안됨. (2018.02.02)
					//삭제후 추가 이므로 checkAddCntrNo 함수 호출을 하지 않는다.
					//#3135 [UCB] AFTER V450, DUPLICATE CONTAINER LIST AFTER RELOAD MASTER
					if(checkAddCntrNo(tmp[0])){
						//alert("Insert Row :"+intRows);
						docObjects[2].DataInsert(intRows);
						docObjects[2].SetCellValue(intRows, 'cntr_no',tmp[0]);
						docObjects[2].SetCellValue(intRows, 'cntr_tpsz_cd',tmp[1]);
						docObjects[2].SetCellValue(intRows, 'seal_no1',(tmp[2]== "null"?"":tmp[2]));
						
						//if((tmp[10] != null && tmp[10] != '' && tmp[10] == 'FCL') || frm1.hbl_tp_cd.value == "DR")
						//#5109 [JAPT]OEH & OIH - Container Sync Logic 수정  Duc.Nguyen
						if((tmp[10] != null && tmp[10] != '' && tmp[10] != 'FAK') || frm1.hbl_tp_cd.value == "DR" || frm1.hbl_tp_cd.value == "FW" || frm1.hbl_tp_cd.value == "DT")
						{
							//#2667 [PATENT] Bugs were reported when doing internal testing for Partial B/L (Synchronization)
//							cntrFlg = true;
							docObjects[2].SetCellValue(intRows, 'cgo_pck_qty',tmp[3], 0);
							docObjects[2].SetCellValue(intRows, 'cgo_pck_ut',tmp[4]);
//							if(user_ofc_cnt_cd=="US"){
								docObjects[2].SetCellValue(intRows, 'cgo_wgt',tmp[5], 0);
								docObjects[2].SetCellValue(intRows, 'cgo_wgt1',tmp[6], 0);
//							}else{
//								docObjects[2].SetCellValue(intRows, 'cgo_wgt',tmp[5], 1);
//								docObjects[2].SetCellValue(intRows, 'cgo_wgt1',tmp[6], 0);
//							}
							docObjects[2].SetCellValue(intRows, 'cgo_meas',tmp[7], 0);
							docObjects[2].SetCellValue(intRows, 'cgo_meas1',tmp[8], 0);
							docObjects[2].SetCellValue(intRows, 'dg_gds_flg',tmp[11]);
							docObjects[2].SetCellValue(intRows, 'cntr_rmk',tmp[12]);
							docObjects[2].SetCellValue(intRows, 'temp_val',tmp[16]);
							docObjects[2].SetCellValue(intRows, 'temp_cd',tmp[17]);
							docObjects[2].SetCellValue(intRows, 'vent_cd',tmp[18]);
							
							docObjects[2].SetCellValue(intRows, 'rc_flg',tmp[22]);
							docObjects[2].SetCellValue(intRows, 'mgset_flg',tmp[23]);
							docObjects[2].SetCellValue(intRows, 'ca_flg',tmp[24]);
							docObjects[2].SetCellValue(intRows, 'air_flow',tmp[25]);
							docObjects[2].SetCellValue(intRows, 'air_flow_unit',tmp[26]);
							docObjects[2].SetCellValue(intRows, 'humid',tmp[27]);
							
						}						
						docObjects[2].SetCellValue(intRows, 'seal_no2',(tmp[9]== "null"?"":tmp[9]));
						docObjects[2].SetCellEditable(intRows, 'cntr_no',0);
						docObjects[2].SetCellEditable(intRows, 'cntr_tpsz_cd',0);
						docObjects[2].SetCellEditable(intRows, 'seal_no1',0);
						docObjects[2].SetCellEditable(intRows, 'seal_no2',0);
						
						//#304
						//[Starcluster] CARGO MANIFEST에서의 House Weight, CBM 자동 계산 로직
						docObjects[2].SetCellValue(intRows, 'm_cgo_pck_qty',tmp[3]);
						docObjects[2].SetCellValue(intRows, 'm_cgo_pck_ut',tmp[4]);
						docObjects[2].SetCellValue(intRows, 'm_cgo_wgt',tmp[5]);
						docObjects[2].SetCellValue(intRows, 'm_cgo_wgt1',tmp[6]);
						docObjects[2].SetCellValue(intRows, 'm_cgo_meas',tmp[7]);
						docObjects[2].SetCellValue(intRows, 'm_cgo_meas1',tmp[8]);

						//#304 [Starcluster] CARGO MANIFEST에서의 House Weight, CBM 자동 계산 로직
						if(tmp[10] == 'LCL' || tmp[10] == 'FAK')
						{
							for (var idx=1; idx < docObjects[2].LastRow() + 1; idx++) {
								if(docObjects[2].GetCellValue(idx,"cgo_pck_ut") != docObjects[2].GetCellValue(idx,"m_cgo_pck_ut")){
									docObjects[2].SetCellValue(idx,"cgo_pck_ut",docObjects[2].GetCellValue(idx,"m_cgo_pck_ut"));
								}
							}
						}
						
						//#996 [SHINE] CONTAINER LIST - REF NO. 항목 추가
						docObjects[2].SetCellValue(intRows, 'cntr_ref_no',(tmp[20]== "null"?"":tmp[20]));
						
						if(tmp[21] == "Y"){
							docObjects[2].SetCellValue(intRows, 'prt_cgo_flg',1);
						}else{
							docObjects[2].SetCellValue(intRows, 'prt_cgo_flg',0);
						}
						
						intRows++;
						addCnt++;
					}
				}
				var hiddenCntrRow=0;
	 			for(var i=1; i<=docObjects[2].LastRow(); i++){
					if (docObjects[2].GetRowHidden(i)) {
						docObjects[2].SetCellValue(i, 'conls_ibflag','D');
						hiddenCntrRow++;
					}
				}
	 			
	 			var cntrCd = '';
	 	        var cntrLabel = '';
	 	        var isFirst = true;
	 	        
	 			for(var i=1; i<=docObjects[2].LastRow(); i++){
					docObjects[2].SetCellValue(i, 'Seq',i-hiddenCntrRow);
					
					if(!isFirst){
						cntrCd += "|";
						cntrLabel += "|";
					}else{
						isFirst = false;
					}
					cntrCd 	  += docObjects[2].GetCellValue(i, 'cntr_no');
					cntrLabel += docObjects[2].GetCellValue(i, 'cntr_no');
				}
	 			
	 			fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	 			docObjects[3].InitDataCombo (0, 'item_cntr_list_seq', cntrLabel, cntrCd);
	 			
				if(addCnt == 0){
					//alert(getLabel('msg.....')
				}
			}
		}else{
			//alert(getLabel('SEE_BMD_MSG43'));		
		}
		
		//if(docObjects[2].GetFocusAfterRowTransaction() == 0) {
		//	docObjects[2].SetFocusAfterRowTransaction(1);
		//}
		
		docObjects[2].SetBlur();	//IBSheet Focus out 처리
	}

	// (( MBL에서 생성된 HBL이고(CustBooking 에서 넘어온 HBL이 아니고) && BKG_NO 지정(bkg_no값 있음) ) || CustBooking 에서 생성된  HBL임)  
	// ===> CUST BKG의 CNTR와 HBL의 CNTR 비교해 같은 CNTR있으면 CUST_BKG의 CNTR로 업데이트
	if((frm1.f_cmd_chk.value != 135 && frm1.bkg_no.value != "") || frm1.f_cmd_chk.value == 135){
		ajaxSendPost(updateRefCntr, 'reqVal', '&goWhere=aj&bcKey=getSeeHouseBkgCntrList&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');
	}
	
	
}

// #571 - [BINEX Visibility Task]PO, BKG, MBL 입력 간소화
function getRefItem(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpList=doc[1].split("@;;@");
 			
			for(var i=0 ; i<tmpList.length-1 ; i++){
				var itemArr=tmpList[i].split("@^^@");
				var intRows=docObjects[3].LastRow() + 1;
				gridAdd(3);
				
				docObjects[3].SetCellValue(intRows, "item_cntr_list_seq",itemArr[21],0);
				docObjects[3].SetCellValue(intRows, "item_cust_po_no",(itemArr[1]== "null"?"":itemArr[1]),0);
				docObjects[3].SetCellValue(intRows, "item_cmdt_cd",itemArr[2],0);
				docObjects[3].SetCellValue(intRows, "item_cmdt_nm",itemArr[3],0);
				docObjects[3].SetCellValue(intRows, "item_hs_grp_cd",itemArr[4],0);
				docObjects[3].SetCellValue(intRows, "item_shp_cmdt_cd",itemArr[5],0);
				docObjects[3].SetCellValue(intRows, "item_shp_cmdt_nm",itemArr[6],0);
				docObjects[3].SetCellValue(intRows, "item_pck_qty",itemArr[7],0);
				docObjects[3].SetCellValue(intRows, "item_pck_ut_cd",itemArr[8],0);
				docObjects[3].SetCellValue(intRows, "item_pck_inr_qty",itemArr[9],0);
				docObjects[3].SetCellValue(intRows, "item_ea_cnt",itemArr[10],0);
				docObjects[3].SetCellValue(intRows, "item_ttl_qty",itemArr[11],0);
				docObjects[3].SetCellValue(intRows, "item_wgt",itemArr[12],0);
				docObjects[3].SetCellValue(intRows, "item_lbs_wgt",itemArr[13],0);
				docObjects[3].SetCellValue(intRows, "item_meas",itemArr[14],0);
				docObjects[3].SetCellValue(intRows, "item_cft_meas",itemArr[15],0);
				docObjects[3].SetCellValue(intRows, "item_rmk",itemArr[16],0);
				docObjects[3].SetCellValue(intRows, "item_dg_cd_tp",itemArr[17],0);
				docObjects[3].SetCellValue(intRows, "item_dg_cd",itemArr[18],0);
				docObjects[3].SetCellValue(intRows, "item_po_sys_no",(itemArr[19]== "null"?"":itemArr[19]),0);
				docObjects[3].SetCellValue(intRows, "item_po_cmdt_seq",(itemArr[20]== "null"?"":itemArr[20]),0);
				docObjects[3].SetCellValue(intRows, "item_cntr_no",itemArr[21],0);
			}
			var hiddenCntrRow=0;
 			for(var i=1; i<=docObjects[3].LastRow(); i++){
				if (docObjects[3].GetRowHidden(i)) {
					docObjects[3].SetCellValue(i, 'item_ibflag','D');
					hiddenCntrRow++;
				}
			}
 			for(var i=1; i<=docObjects[3].LastRow(); i++){
				docObjects[3].SetCellValue(i, 'Seq',i-hiddenCntrRow);
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
	
	docObjects[3].SetBlur();	//IBSheet Focus out 처리
}
//파일 다운로드
function downloadFile(downType, s_intg_bl_seq, s_palt_doc_seq){
	document.frm2.docType.value=downType;
	document.frm2.s_palt_doc_seq.value=s_palt_doc_seq;
	document.frm2.intg_bl_seq.value = s_intg_bl_seq;
	//document.frm2.target = '_self';
	document.frm2.submit();
}
//직접입력 여부
function doKeyInCheck(obj, numTp){
	if(numTp=='bk'){
		if(obj.checked){
//			frm1.bkg_no.className= 'search_form';
//			frm1.bkg_no.readOnly = false;
//			frm1.bkg_no.focus();
		}else{
//			frm1.bkg_no.className= 'search_form-disable';
//			frm1.bkg_no.readOnly = true;
//			frm1.bkg_no.value = '';
		}
	}else{
		if(obj.checked){
			alert(getLabel('SEA_COM_ALT005'));
//			frm1.bl_no.className= 'search_form';
//			frm1.bl_no.readOnly = false;
//			frm1.bl_no.focus();
		}else{
//			frm1.bl_no.className= 'search_form-disable';
//			frm1.bl_no.readOnly = true;
//			frm1.bl_no.value = '';
		}
	}
}

/**
* ADD 시에 Container번호 중복확인
*/
function checkAddCntrNo(inCntrNo){
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
 	var intRows=docObjects[2].LastRow() + 1;
	var loopNum=0;
	for(var i=1; i < intRows; i++){
		if(inCntrNo==docObjects[2].GetCellValue(i, 'cntr_no')){
			loopNum++;
		}
	}
	if(inCntrNo == ""){
		loopNum++;
	}
	if(loopNum>0){
		return false;
	}else{
		return true;
	}
}

/**
 * Container번호 중복확인
 */
function checkCntrNo(inCntrNo){
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
 	var intRows=docObjects[2].LastRow() + 1;
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

/**
 * 화면초기화
 */
function clearScreen(){
	//if(confirm("Do you want to New?")){
		doShowProcess();
		frm1.f_cmf_cmd_chkue='';
		frm1.submit();
//		submitForm('');
	//}
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	var isModi=true;
	if(errMsg==''&&frm1.intg_bl_seq.value==''){
		frm1.f_intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
		frm1.intg_bl_seq.value=docObjects[0].GetCellValue(1, "sv_intg_bl_seq");
		frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
		frm1.bl_sts_label.value=docObjects[0].GetCellValue(1, "sv_bl_sts_label");
		//frm1.bkg_no.value       = docObjects[0].CellValue(1, "sv_bkg_no");
		//frm1.f_bkg_no.value     = frm1.bkg_no.value;
		frm1.f_bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
		frm1.bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
		frm1.h_bl_no.value=frm1.bl_no.value;
//		frm1.bkg_no.readOnly  = true; 
//		frm1.bkg_no.className = 'search_form-disable';
//		frm1.bl_no.readOnly  = true; 
//		frm1.bl_no.className = 'search_form-disable';
		//Freight항목을 조회함
		//#6642 [JAPT] Ex. Rate Date Criteria Change request
		var obdt;
		if(BL_EXPORT_EX_DT == 'ETD'){
			obdt=frm1.etd_dt_tm.value;
		} else {
			obdt=frm1.obrd_dt_tm.value;
		}
		getXcrtInfo(obdt.replaceAll('-', ''));
	    isModi=false;
	}
	frm1.bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
	frm1.h_bl_no.value=frm1.bl_no.value;
	frm1.f_bl_no.value=frm1.bl_no.value;
	
	frm1.f_bkg_no.value = frm1.bkg_no.value;
	frm1.h_profit_share.value=frm1.profit_share.value;
	
	frm1.org_bkg_seq.value = frm1.bkg_seq.value;
	
	//#2068 - Document 번호 Title 에 반영
	setTabTitle(frm1.bl_no.value);
		
	if(bkgCntrSheet){
		searchGrid(1);
	}
	if(docListSheet){
		searchGrid(2);
	}
	if(xptListSheet){
		searchGrid(3);
	}
	if(cntrListSheet){
		searchGrid(4);
		searchGrid(6);
	}
	if(cmdtListSheet){
		searchGrid(5);
	}
	if(frtSdSheet){
		searchGrid(7);
	}
	if(frtBcSheet){
		searchGrid(8);
	}
	if(frtDcSheet){
		searchGrid(13);
	}
	if(dimListSheet){
		searchGrid(12);
	}
	if(jobListSheet){
		searchGrid(10);
	}
	if(udfListSheet){		//User Defined Field 조회
		searchGrid(14);
	}
	if(hwiFrtListSheet){
		searchGrid(15);
	}
	//#795 hsk work order List 조회
	searchGrid(9);
	//목록 Flag 초기화
	bkgCntrSheet=false;
	docListSheet=false;
	xptListSheet=false;
	cntrListSheet=false;
	cmdtListSheet=false;
	frtSdSheet=false;
	frtBcSheet=false;
	frtDcSheet=false;
	hwiFrtListSheet=false;
	//버튼 초기화
	btnLoad();
	//Freight 버튼 초기화
	cnfCntr('SD');
	cnfCntr('BC');
	cnfCntr('DC');
	//수정시 환률재 조회
	if(isModi){
		//Freight항목을 조회함
		//#6642 [JAPT] Ex. Rate Date Criteria Change request
		var obdt;
		if(BL_EXPORT_EX_DT == 'ETD'){
			obdt=frm1.etd_dt_tm.value;
		} else {
			obdt=frm1.obrd_dt_tm.value;
		}
	    obdt=obdt.replaceAll('-', '');
	    if(obdt!==frm1.xcrtDt.value){
		    getXcrtInfo(obdt);
	    }
	}
	//"Save success! ");
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
function sheet1_OnSearchEnd(errMsg){
	frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
	frm1.bl_sts_label.value=docObjects[0].GetCellValue(1, "sv_bl_sts_label");
	//버튼 초기화
	btnLoad();
	if(frm1.f_cmd.value==COMMAND01){
//		frm1.bkg_no.className = 'search_form-disable';
//		frm1.bkg_no.readOnly  = false;
	    getBtnObj('bkgCnfObj').style.display='none';
	}else if(frm1.f_cmd.value==COMMAND02){
		var tmpBlNo=docObjects[0].GetCellValue(1, "sv_bl_no");
		if(tmpBlNo!=''){
			//조회해온 결과를 Parent에 표시함
			frm1.bl_no.value=tmpBlNo;
			frm1.mk_bl_no.value=tmpBlNo;
		}
		//버튼 숨기기
		getBtnObj('hblCreObj').style.display='none';
//		frm1.bl_no.className = 'search_form-disable';
//		frm1.bl_no.readOnly  = true;
		//hblMk.style.display  = 'none';
	}
	doHideProcess();
}

function sheet2_OnSearchEnd(sheetObj, row, col) {
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
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
	       /* var cal=new ComCalendar();
	        cal.select(obj.name, 'MM-dd-yyyy');*/
	        var cal=new ComCalendar();
	        cal.select(obj, 'MM-dd-yyyy');

	    break;
    }
}
//Description에 Instrutction을 추가함
function addInst(){
	ajaxSendPost(addInstTxt, 'reqVal', '&goWhere=aj&bcKey=getInstTxt&loc_cd='+frm1.del_cd.value, './GateServlet.gsl');
}
function addInstTxt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(frm1.desc_txt.value==''){
				frm1.desc_txt.value=doc[1];
			}else{
				frm1.desc_txt.value=frm1.desc_txt.value+'\n'+doc[1];	
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * 파일목록 조회시. 3번째 Sheet를 리턴함.
 */
function getSelectedFiles(){
	fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[9];
}
//--------------------------------------------------------------------------------------------------------------
//                                             Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
var tab1click = '';
var tab2click = '';
var tab3click = '';
var tab4click = '';
var tab5click = '';
var tab6click = '';
var tab7click = '';
var isFreightText = true;

function goTabSelect(isNumSep) {
	//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 
	if(comIBSheetWaitChk()== false){ return;}
	
	//isNumSep가 없을경우  Default로 01설정 
	if (isNumSep == ""){
		isNumSep = "01"
	}

	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	frm1.f_isNumSep.value = isNumSep;
	
	
	var tabObjs = document.getElementsByName('tabLayer');
    if( isNumSep == "01" ) {
    
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
        
        //comSheetObject('sheet13');comSheetObject('sheet2');
        fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(11);   //grid가 생성되지않았으면 생성(속도개선)
        
        if(tab1click == ""){
	        tab1click = "Y"
	    }
	    
	    //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
	       
	
    } else if( isNumSep == "02" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "inline";
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
        
        //comSheetObject('sheet5');comSheetObject('sheet6');
        fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
        
        if(tab2click == ""){
        	tab2click = "Y";
        	
        	doWork('SEARCHCNTR');
        	//cntr grid search
        	//searchGrid(4);
        }
    	//스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
    
    //Mark Description 탭    
    }else if( isNumSep == "03" ) {
    	currTab = isNumSep;	//탭상태저장
    	
	    tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'inline';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
       
        //comSheetObject('sheet4');
        fnSetIBsheetInit(12);   //grid가 생성되지않았으면 생성(속도개선)
        
        if(tab3click== ""){
	        tab3click= "Y";
	        doWork('SEARCH_XPT');
    	}
      //#2081 [PATENT] OEM Container Information 버튼 옵션추가
        if(tab2click == ""){
        	tab2click = "Y";
        	
        	doWork('SEARCHCNTR');
        }
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
		
	//Freight탭
    }else if( isNumSep == "04" ) {
    	currTab = isNumSep;	//탭상태저장
        
	    tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'inline';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
        
        //comSheetObject('sheet7');comSheetObject('sheet8');comSheetObject('sheet14');comSheetObject('sheet9');
        fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
        
        //BL_COPY
        var copy_bl_seq = frm1.copy_bl_seq.value;
		if (copy_bl_seq == "") {
			
			if(frm1.intg_bl_seq.value != "" && frm1.org_bkg_seq.value == frm1.bkg_seq.value){
				//LHK 20130812 tab Click 이후 컨테이너 저장 후 다시 클릭 할 경우, 컨테이너를 재조회 한다. Unit 에 해당하는 Cntr type Size 를 다시 가져옴.
				searchGrid(6);
			}
			
	        if(tab4click== ""){
		        tab4click= "Y";
		        doWork('SEARCH_FRT');
	    	}
		} else {
			searchFrtCntr();	
		}
		
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
	
	//Work Order
    }else if( isNumSep == "05" ) {
    	currTab = isNumSep;	//탭상태저장
        
	    tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'inline';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'none';
       
        //comSheetObject('sheet10');
        fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
        
        if(tab5click== ""){
	        tab5click= "Y";
	        doWork('SEARCH_WO');
    	}
        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
    }else if( isNumSep == "06" ) {
    	currTab = isNumSep;	//탭상태저장
        
	    tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'inline';
        tabObjs[6].style.display = 'none';
       
        //comSheetObject('sheet11');comSheetObject('sheet3');comSheetObject('sheet12');comSheetObject('sheet15');
        fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(10);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(14);   //grid가 생성되지않았으면 생성(속도개선)
        
        if(tab6click== ""){
	        tab6click= "Y";
	        doWork('SEARCH_JB');

    	}
        
    // Hawaii Freight 탭    
    } else if( isNumSep == "07" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        tabObjs[5].style.display = 'none';
        tabObjs[6].style.display = 'inline';
        
        //comSheetObject('sheet16')
        fnSetIBsheetInit(15);   //grid가 생성되지않았으면 생성(속도개선)
        
        if(tab7click == ""){
        	tab7click = "Y";
        	doWork('SEARCH_HWIFRT');
        }
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
var blFrtChkYn = "N"; // option : OEH_BL_FRT_CHK_YN 관련 전역 변수
var blPrintOpt = false; // option : OEH_BL_PRINT_OPT 관련 전역 변수

var obl_decimal_len = 0;
var bkg_new_hbl_no_flg = "";

//#2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가
var bl_inv_auto_creation ="";

//#3356 [JTC]HB/L Form 개발
var hbl_check_pod_us_tri_flg ="N";  // option : HBL_CHECK_POD_US_TRI 관련 전역 변수

//#3811 [JAPT] POR,DEL,F.DEST & Sales PIC sync.	
var SYNC_PIC = "";

//OFVFOUR-7340: [JH Logistics] Customer copy option
var auto_select_shipper="Y";

function loadPage() {
	
	/* #1619 [CLT] Original B/L Type- 항목 정리
	var opt_key = "EXP_BL_YN";
	ajaxSendPost(setExpressTpCdVal, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    */
	//OFVFOUR-7038 [Zimex] Decimal length for Weight & Measurement
	var opt_key = "OEM_OEH_REMOVE_FUNC_COMMA";
	ajaxSendPost(chkFuncComma, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    //OFVFOUR-7707[Matrix] Restriction to block creating HBL in case the credit of customer exceeds credit limit
	var com_cd = "C330";
	var cd_val = "OEH";
	ajaxSendPost(chkCredit, "reqVal", "&goWhere=aj&bcKey=searchCmmDtlCd&com_cd="+com_cd+"&cd_val="+cd_val, "./GateServlet.gsl");
	
	var opt_key_sec = "OEH_BL_FRT_CHK_YN";
	ajaxSendPost(setblFrtChkYn, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

	//#501 [BNX JAPAN] OEH Mark & Desc 탭에서 No of Original B/L에 수량 조정사항
	var opt_key_thi = "OEH_BL_PRINT_OPT";
	ajaxSendPost(setblPrintOpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_thi, "./GateServlet.gsl");
	
	//#314 [IMPEX] OEM & OEH GROSS WEIGHT DB TO MANAGE DECIMAL UP TO 3 PLACES
	var opt_key = "OBL_DECIMAL_LEN";
	ajaxSendPost(setDecimalLen, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	/* #2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB No., HB/L No생성 로직 */
	/*[#4650] [JH]Booking No and MBL Filing No are same (by Duc.Nguyen)*/
/*	var opt_key = "BKG_NEW_HBL_NO_FLG";
	ajaxSendPost(setBkgNoFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");*/
	
	/* #2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가 */
	var opt_key = "BL_INV_AUTO_CREATION";
	ajaxSendPost(setBlInvAutoCreation, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	/* #3356 [JTC]HB/L Form 개발 */
	var opt_key = "HBL_CHECK_POD_US_TRI";
	ajaxSendPost(setHblCheckPodUsTri, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#3572 Japan Trust OEM/OEH Entry Fright Default
	var opt_key = "OE_DFLT_FRT_CC";
	ajaxSendPost(setFreight, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#6369 [AIF] SALES PIC NOT PROPERLY SYNC BTW MBL AND HBL
    var opt_key = "BL_SEA_USE_SALES_MAN_DFLT_FLG";
    ajaxSendPost(setSalesPICInfo, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
    //#6642 [JAPT] Ex. Rate Date Criteria Change request
    var opt_key = "BL_EXPORT_EX_DT";
    ajaxSendPost(setExDate, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    //OFVFOUR-7340: [JH Logistics] Customer copy option
	var opt_key = "AUTO_SELECT_SHIPPER";
	ajaxSendPost(setAutoSelectShipper, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//OFVFOUR-6866 - [BNX-LA] Selecting multi-Warehouse Receipt from B/L Entry screen (Zen#3533)
	var opt_key = "USE_MULTI_WH";
	ajaxSendPost(setMultiWhFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
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
    //#2268 [UNICO, PREMIER] Decimal place of container weight to be 3 decimal digits
    frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(obl_decimal_len));
    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(obl_decimal_len));
    //frm1.mk_grs_wgt.value=doMoneyFmt(Number(frm1.mk_grs_wgt.value.replace(/,/gi, "")).toFixed(obl_decimal_len));
    //frm1.mk_grs_wgt1.value=doMoneyFmt(Number(frm1.mk_grs_wgt1.value.replace(/,/gi, "")).toFixed(obl_decimal_len));
    frm1.meas.value=doMoneyFmt(Number(frm1.meas.value).toFixed(obl_decimal_len));
    frm1.meas1.value=doMoneyFmt(Number(frm1.meas1.value).toFixed(obl_decimal_len));
    frm1.ctrb_mgn.value=doMoneyFmt(Number(frm1.ctrb_mgn.value).toFixed(2));
    
 // frm1.mk_meas.value  	= doMoneyFmt(Number(frm1.mk_meas.value).toFixed(3));
 // frm1.mk_meas1.value  	= doMoneyFmt(Number(frm1.mk_meas1.value).toFixed(3));
 // frm1.mk_grs_wgt1.value  = doMoneyFmt(Number(frm1.mk_grs_wgt1.value.replaceAll(",","")).toFixed(0));

    frm1.mk_grs_wgt.value =doMoneyFmt(Number(frm1.mk_grs_wgt.value.replaceAll(",","")).toFixed(obl_decimal_len));
	frm1.mk_grs_wgt1.value =doMoneyFmt(Number(frm1.mk_grs_wgt1.value.replaceAll(",","")).toFixed(obl_decimal_len));
	frm1.mk_meas.value =doMoneyFmt(Number(frm1.mk_meas.value.replaceAll(",","")).toFixed(obl_decimal_len));
	frm1.mk_meas1.value =doMoneyFmt(Number(frm1.mk_meas1.value.replaceAll(",","")).toFixed(obl_decimal_len));

	//frm1.mk_grs_wgt.value=doMoneyFmt(Number(frm1.mk_grs_wgt.value.replace(/,/gi, "")).toFixed(obl_decimal_len));
	//frm1.mk_grs_wgt1.value=doMoneyFmt(Number(frm1.mk_grs_wgt1.value.replace(/,/gi, "")).toFixed(obl_decimal_len));

    //collect로 셋팅
    /* #21014 : [GPL] OE House B/L Entry - Modify Requests, jsjang 2013.10.10 */
    //frm1.frt_term_a_cd.value = 'CC';
    //frm1.frt_term_c_cd.value = 'CC';
    if(frm1.intg_bl_seq.value==""){
    	if(user_ofc_cnt_cd=="US"){
    		frm1.wgt_disp_cd.value='KL';
    	}else{
    		frm1.wgt_disp_cd.value='K';
    	}
    	
    	// Copy 시에 DESCRITION 이 존재하는 경우 유지하도록 수정
    	if(!(frm1.copy_bl_seq.value != "" && frm1.desc_txt1.value != "")){
	    	//office description
	    	shipModeChange();
    	}
    	
    	//clean on board
    	cobChange();
    	/* oyh 2013.11.08 #23113 : DESC항목에 값을 입력하기 이전에 초기값을 설정 */
        /* oyh 2013.09.04 #20421 : [BINEX] B/L type의 default를 Express에 Y로 */
        /* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting*/
        if(frm1.intg_bl_seq.value==""){
        	//frm1.express_tp_cd.value = "Y";
        	//frm1.pck_ut_cd.value = "CT";
        	//#6792 [AIR POWER] SETTNG UP PACKAGE DEFAULT FOR OCEAN ENTRY SCREEN
    		if(frm1.copy_bl_seq.value == "" && frm1.bkg_seq.value == ''){
        		setPckUtCd();
        	}
        }
    	/*
         *  2012.02.17 아래 내용을 Description에 추가한다.
         * "FREIGHT COLLECT"
         * "EXPRESS B/L"
         * Copy 했을 때는 나오지 않도록 desc_txt가 값이 없을 경우만 적용한다.
         */
    	if(frm1.exp_frt_desc.value==""){
    		//frm1.exp_frt_desc.value += '\r\n';
    		if(frm1.frt_term_c_cd.value=="PP"){
    			frm1.exp_frt_desc.value += '"FREIGHT PREPAID"';
    		}else{
    			frm1.exp_frt_desc.value += '"FREIGHT COLLECT"';
    		}
    		if(frm1.obl_tp_cd.value=="E"){ //#1619 [CLT] Original B/L Type- 항목 정리
    			frm1.exp_frt_desc.value += '\r\n';
    			frm1.exp_frt_desc.value += '"EXPRESS B/L"';
    		}
    	}
    	
    	//[#4650] [JH]Booking No and MBL Filing No are same (by Duc.Nguyen) (S)
    	/* #2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB No., HB/L No생성 로직 
    	if( frm1.bkg_no.value != "" && bkg_new_hbl_no_flg == "Y" ){
			frm1.bl_no.value = frm1.bkg_no.value;//bkg_no
		}else{
			frm1.bl_no.value="AUTO";
		}*/
    	frm1.bl_no.value="AUTO";
    	//[#4650] [JH]Booking No and MBL Filing No are same (by Duc.Nguyen) (E)
    	/* jsjang 2013.08.28 office, ooh_bkg_rmk 정보 처리 변경 */
    	//frm1.rmk.value	=	ooh_bkg_rmk;
    	frm1.rmk.value=frm1.h_ooh_bkg_rmk.value;
    	
    	//MBL ENTRY 에서 HBL button 을 눌렀을 경우 2012.10.05 LHK
    	if(frm1.ref_no.value!=""){
    		SYNC_PIC = "HBL_CREATE";   //#3811 [JAPT] POR,DEL,F.DEST & Sales PIC sync.	
        	checkRefNo(frm1.ref_no.value);
        	SYNC_PIC = "";             //#3811 [JAPT] POR,DEL,F.DEST & Sales PIC sync.	
        }
    	
    	// #1769 - [PATENT] Issued Place - Logic
    	//#3604 [JTC]OEH B/L Type 별 Original B/L 수 세팅 문제
/*    	if(ofc_city_nm != ""){
    		frm1.iss_loc_nm1.value = ofc_city_nm;
    		
    		if(ofc_state_cd != ""){
    			frm1.iss_loc_nm1.value += ", "+ofc_state_cd;
    		}
    	} else {
    		frm1.iss_loc_nm1.value = ofc_state_cd;
    	}*/
    }
	/* EXPRESS B/L 에 대해서는 DESC값이  있어도 체크를 한다 -- 이 부분은 사용자의 요청이 있을때 변경하도록 일단 주석처리 */
	/*
    if(frm1.desc_txt.value.indexOf('"EXPRESS B/L"') < 0) {
		if(frm1.express_tp_cd.value=="Y"){
			frm1.desc_txt.value += '\r\n';
			frm1.desc_txt.value += '"EXPRESS B/L"';
		}
	}
	*/
    if(frm1.bl_sts_cd.value=='HO' || frm1.bl_sts_cd.value=='HF'){
    	//Accounting Closed. You can only edit following fields.\nShipper / Consignee / Notify Party / POL / POD / DEL / B/L Body.');
    	alert(getLabel('FMS_COM_ALT034'));
    }
    //#501 [BNX JAPAN] OEH Mark & Desc 탭에서 No of Original B/L에 수량 조정사항
    if(!blPrintOpt){
	    /* LHK 20130822 #19706 Main Tab 의 Express B/L 을 Yes 로 했을 떄 Mark &Desc. Tab 의 Number of Original B/L 을 0 으로 변경, - No 로 하면 3 으로 변경 */
	    //if(frm1.obl_tp_cd.value=="E"){ //#1619 [CLT] Original B/L Type- 항목 정리
		//	frm1.org_bl_qty.value="0";
		//}else{
		//	frm1.org_bl_qty.value="3";
		//}
	    
	    //#3356 [JTC]HB/L Form 개발
    	//#3604 [JTC]OEH B/L Type 별 Original B/L 수 세팅 문제    	
    	if(frm1.obl_tp_cd.value=="O"){ //Original: Original 은 3장, Seaway Bill은 0장, 나머지는 1장 세팅(default)
    		frm1.org_bl_qty.value="3";
    	}else if(frm1.obl_tp_cd.value=="S"){
    		frm1.org_bl_qty.value="0";
    	}else{
    		frm1.org_bl_qty.value="1";
    	}	
	    
    }else{
    	//if(frm1.obl_tp_cd.value=="E"){ //#1619 [CLT] Original B/L Type- 항목 정리
		//	frm1.org_bl_qty.value="0";
		//}else{
		//	frm1.org_bl_qty.value="3";
		//}
    	
	    //#3356 [JTC]HB/L Form 개발
    	//#3604 [JTC]OEH B/L Type 별 Original B/L 수 세팅 문제
    	if(frm1.obl_tp_cd.value=="O"){ //Original: Original 은 3장, Seaway Bill은 0장, 나머지는 1장 세팅(default)
    		frm1.org_bl_qty.value="3";
    	}else if(frm1.obl_tp_cd.value=="S"){
    		frm1.org_bl_qty.value="0";
    	}else{
    		frm1.org_bl_qty.value="1";
    	}	
    }
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	goTabSelect(frm1.f_isNumSep.value);
    //단축키추가.
    //setShortcut();
	
	//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
	//조회
	chkIntgBlModiTms("VIEW");
	
	/* 2016-12-12 자동완성 기능 추가 S */
	/* Booking & HB/L Tab */
    fnSetAutocomplete('prnr_trdp_nm'	, 'LINER_POPLIST', 'partner', 'O'); 	//Partner

    fnSetAutocomplete('act_shpr_trdp_nm', 'LINER_POPLIST', 'ashipper', 'O'); //Customer
    fnSetAutocomplete('cust_trdp_nm'	, 'LINER_POPLIST', 'cust', 'O'); 	//C/Broker
    fnSetAutocomplete('vndr_trdp_nm'	, 'LINER_POPLIST', 'vndr', 'O'); 	//Vendor   
    fnSetAutocomplete('cgo_pu_trdp_nm'	, 'LINER_POPLIST', 'cgo_pu', 'O'); 	//Cargo Pick Up
    fnSetAutocomplete('trk_trdp_nm'		, 'LINER_POPLIST', 'trk', 'O'); 		//Trucker
    fnSetAutocomplete('lnr_trdp_nm'		, 'LINER_POPLIST', 'liner', 'O');	//Carrier
    fnSetAutocomplete('agent_trdp_nm'	, 'LINER_POPLIST', 'agent', 'O');	//Forwarding Agent
    fnSetAutocomplete('prnr_trdp_nm2'	, 'LINER_POPLIST', 'partner2', 'O');	//Triangle Agent
    fnSetAutocomplete('wh_trdp_nm'		, 'LINER_POPLIST', 'warehouse', 'O');//Warehouse
    
    fnSetAutocomplete('por_nm'			, 'LOCATION_POPLIST', 'por', 'O');	//POR
    fnSetAutocomplete('pol_nm'			, 'LOCATION_POPLIST', 'pol', 'O');	//POL
    fnSetAutocomplete('pod_nm'			, 'LOCATION_POPLIST', 'pod', 'O');	//POD
    fnSetAutocomplete('del_nm'			, 'LOCATION_POPLIST', 'del', 'O');	//DEL
    fnSetAutocomplete('fnl_dest_loc_nm'	, 'LOCATION_POPLIST', 'dest', 'O');	//Final Destination
    
    /* Mark & Desc Tab */
    fnSetAutocomplete('carr_trdp_nm1'	, 'LINER_POPLIST', 'carr1', 'O');	//Carrier
    /* 2016-12-12 자동완성 기능 추가 E */
    fnSetAutocomplete('shpr_trdp_nm'	, 'LINER_POPLIST', 'shipper', 'O'); 	//Shipper
    fnSetAutocomplete('cnee_trdp_nm'	, 'LINER_POPLIST', 'consignee', 'O');//Consignee
    fnSetAutocomplete('ntfy_trdp_nm'	, 'LINER_POPLIST', 'notify', 'O'); 	//Notify
    
    //#3873 [JAPT]  T/S popup , validation and sync.
    fnSetAutocomplete('trnk_vsl_nm'			, 'VESSEL_POPLIST', 'trunkvessel');	//VSL
    
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
	//#3801 [IMPEX] BL DISPLAYED WEIGHT SYNCED FROM BL INFO.
	//저장후 mk_meas 값이 변경이 일어남.
	//cbmChange(formObj.meas);
		
	//#996 [SHINE] CONTAINER LIST - REF NO. 항목 추가
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성
	// 사용자가 저장한 Header 정보를 읽어온다.
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[2], false,"fnRestoreGridSetEnd"); //Tab 2 Container List

	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
    
    //#2586 [BNX US] COD, CREDIT HOLD ACCOUNTS NO WARNING
    if(frm1.intg_bl_seq.value != ''){
//    	(formObj.prnr_trdp_cd.value != "") ? chkCodOnLoad("partner", formObj.prnr_trdp_cd.value, false) : "";
//    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, false) : "";
//    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, false) : "";
//    	(formObj.ntfy_trdp_cd.value != "") ? chkCodOnLoad("notify", formObj.ntfy_trdp_cd.value, false) : "";
//    	(formObj.act_shpr_trdp_cd.value != "") ? chkCodOnLoad("ashipper", formObj.act_shpr_trdp_cd.value, false) : "";
//    	(formObj.cust_trdp_cd.value != "") ? chkCodOnLoad("cust", formObj.cust_trdp_cd.value, false) : "";
//    	(formObj.vndr_trdp_cd.value != "") ? chkCodOnLoad("vndr", formObj.vndr_trdp_cd.value, false) : "";
//    	(formObj.cgo_pu_trdp_cd.value != "") ? chkCodOnLoad("cgo_pu", formObj.cgo_pu_trdp_cd.value, false) : "";
//    	(formObj.lnr_trdp_cd.value != "") ? chkCodOnLoad("liner", formObj.lnr_trdp_cd.value, false) : "";
//    	(formObj.agent_trdp_cd.value != "") ? chkCodOnLoad("agent", formObj.agent_trdp_cd.value, false) : "";
//    	(formObj.prnr_trdp_cd2.value != "") ? chkCodOnLoad("partner2", formObj.prnr_trdp_cd2.value, false) : "";
//    	(formObj.wh_trdp_cd.value != "") ? chkCodOnLoad("warehouse", formObj.wh_trdp_cd.value, false) : "";
    }else{
    	(formObj.prnr_trdp_cd.value != "") ? chkCodOnLoad("partner", formObj.prnr_trdp_cd.value, true) : "";
    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, true) : "";
    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, true) : "";
    	(formObj.ntfy_trdp_cd.value != "") ? chkCodOnLoad("notify", formObj.ntfy_trdp_cd.value, true) : "";
    	(formObj.act_shpr_trdp_cd.value != "") ? chkCodOnLoad("ashipper", formObj.act_shpr_trdp_cd.value, true) : "";
    	(formObj.cust_trdp_cd.value != "") ? chkCodOnLoad("cust", formObj.cust_trdp_cd.value, true) : "";
    	(formObj.vndr_trdp_cd.value != "") ? chkCodOnLoad("vndr", formObj.vndr_trdp_cd.value, true) : "";
    	(formObj.cgo_pu_trdp_cd.value != "") ? chkCodOnLoad("cgo_pu", formObj.cgo_pu_trdp_cd.value, true) : "";
    	(formObj.lnr_trdp_cd.value != "") ? chkCodOnLoad("liner", formObj.lnr_trdp_cd.value, true) : "";
    	(formObj.agent_trdp_cd.value != "") ? chkCodOnLoad("agent", formObj.agent_trdp_cd.value, true) : "";
    	(formObj.prnr_trdp_cd2.value != "") ? chkCodOnLoad("partner2", formObj.prnr_trdp_cd2.value, true) : "";
    	(formObj.wh_trdp_cd.value != "") ? chkCodOnLoad("warehouse", formObj.wh_trdp_cd.value, true) : "";
    }
    
//    #3135 [UCB] AFTER V450, DUPLICATE CONTAINER LIST AFTER RELOAD MASTER
    // 중복 조회 방지
    if(tab2click == ""){
    	tab2click = "Y";
    	doWork('SEARCHCNTR');
    } 
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
	shortcut.remove("Alt+Q");
	shortcut.add("Alt+Q",function() {
		if(frm1.bl_sts_cd.value == 'NA'){
			doWork('ADD');
		}else{
			doWork('MODIFY');
		}
	});
}
function fnRestoreGridSetEnd(){
	
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
		case "sheet13":
			docObjects[1]=sheet_obj;
		break;
		case "sheet5":
			docObjects[2]=sheet_obj;
		break;
		case "sheet6":
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
		case "sheet11":
			docObjects[8]=sheet_obj;
		break;
		case "sheet3":
			docObjects[9]=sheet_obj;
		break;
		case "sheet12":
			docObjects[10]=sheet_obj;
		break;
		case "sheet2":
			docObjects[11]=sheet_obj;
		break;
		case "sheet4":
			docObjects[12]=sheet_obj;
		break;
		case "sheet14":
			docObjects[13]=sheet_obj;
		break;
		case "sheet15":
			docObjects[14]=sheet_obj;
		break;
		case "sheet16":
			docObjects[15]=sheet_obj;
		break;
	}
   //docObjects[sheetCnt++] = sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:     
		    with(sheetObj){
//	        SetSheetHeight(0);
//	      (6, 0, 0, true);

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('SEE_BMD_0020_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_intg_bl_seq" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bkg_no" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_no" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_cd" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_label" } ];
	       
	      InitColumns(cols);

	      SetEditable(1);
	      SetVisible(false);

	            }


        break;
		case 2:     //Calculate CBM
		    with(sheetObj){
	       
	     // (13, 0, 0, true);

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1};
	      var headers = [ { Text:getLabel('SEE_BMD_0020_HDR2_1'), Align:"Center"}, { Text:getLabel('SEE_BMD_0020_HDR2_2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"DelCheck",  Hidden:0, Width:25,   Align:"Center",  ColMerge:1,   SaveName:"del",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"dim_ibflag" },
	             {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dim_len_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	             {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dim_wdt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	             {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dim_hgt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	             {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dim_pce_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
	             {Type:"Float",     Hidden:0,  Width:62,   Align:"Right",   ColMerge:1,   SaveName:"dim_act_dim",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	             
	             // #4666 [IMPEX] OEH Chargeable Weight from Dimension Input - Nhan.Le
	             {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dim_wgt_k",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	             {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dim_wgt_l",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	             
	             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt1",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	             {Type:"Text",      Hidden:1, Width:52,   Align:"Left",    ColMerge:1,   SaveName:"dim_pck_ut_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dim_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dim_wh_recp_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
	       
	      InitColumns(cols);

	      //SetCountPosition(0);
	      SetEditable(0);
	      SetSheetHeight(130);
	      //sheetObj.SetFocusAfterProcess(0);
	            }

                       
		break;
       //Container List 그리드
	   case 3:
		    with(sheetObj){
		  
		       //  (27, 0, 0, true);

		         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
					
							         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
							         var headers = [ { Text:getLabel('SEE_BMD_HDR4-4'), Align:"Center"} ];
							         InitHeaders(headers, info);
					
							         var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"Del" },
							                {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"conls_ibflag" },
							                {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"Seq",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
							                {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"soc_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                //#2961 [BNX US] AFTER V450, CANNOT CHANGE CONTAINER TYPE ON HBL
							                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:14 },
							                {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"cntr_tpsz_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
							                {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"seal_no1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
							                {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"seal_no2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
							                {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"seal_no3",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
							                {Type:"Text",      Hidden:0, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"cntr_ref_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
							                {Type:"Float",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"cgo_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
							                {Type:"Combo",     Hidden:0, Width:90,   Align:"Left",    ColMerge:0,   SaveName:"cgo_pck_ut",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
							                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt1",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
							                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
							                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
							                {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"vol_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cntr_sprl_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_sprl_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },


								             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",    ColMerge:0,   SaveName:"rc_flg",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
								             
								             {Type:"Float",     Hidden:0, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"temp_val",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:4 },
								             {Type:"Combo",     Hidden:0, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"temp_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },


								             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",    ColMerge:0,   SaveName:"mgset_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
								             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",    ColMerge:0,   SaveName:"ca_flg",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
								             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",    ColMerge:0,   SaveName:"vent_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },				             
								             {Type:"Float",     Hidden:0, Width:60,   Align:"Right",     ColMerge:0,   SaveName:"air_flow",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
								             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",    ColMerge:0,   SaveName:"air_flow_unit",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:2,   InsertEdit:1 },
								             {Type:"Float",     Hidden:0, Width:60,   Align:"Right",     ColMerge:0,   SaveName:"humid",      		  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5, AcceptKeys:"N" },							                
							                
							                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"dg_gds_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:0,   SaveName:"cntr_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
							                {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:0,   SaveName:"trkg_fee_txt",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
							               //#2107 [PATENT] HB/L의 FCL Shipmode 시 SAY 항목 표시 보완
							                {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"prt_cgo_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N"},
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_list_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vol_tot",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_cntr_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                //#1543 [LBS] Container Type/Size Reefer, Ventill 항목 관리
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"temp_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vent_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                
											//#304
											//[Starcluster] CARGO MANIFEST에서의 House Weight, CBM 자동 계산 로직
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"m_cgo_pck_qty",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"m_cgo_pck_ut",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"m_cgo_wgt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"m_cgo_wgt1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"m_cgo_meas",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"m_cgo_meas1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                
							                //BKG_CREATE #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bkg_create",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
							                ];
							          
							         InitColumns(cols);
					
							        // SetGetCountPosition()(0);
							         SetEditable(1);
		                             SetColProperty('cgo_pck_ut', {ComboText:PCKCD1, ComboCode:PCKCD2} );
		                             SetColProperty('soc_flg', {ComboText:LSTCD1, ComboCode:LSTCD2} );
		                      		 SetColProperty('cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
		                      		 SetColProperty('temp_cd', {ComboText:'|'+TEMPCD1, ComboCode:'|'+TEMPCD2} );
		                      		 SetColProperty('vent_cd', {ComboText:'|'+VENTCD1, ComboCode:'|'+VENTCD2} );
		                      		 SetColProperty('dg_gds_flg', {ComboText:'N|Y', ComboCode:'N|Y'} );
		                      		 //#996 [SHINE] CONTAINER LIST - REF NO. 항목 추가
		                      		 SetColProperty(0 ,"cntr_ref_no" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
		                      		
		                             SetColProperty('rc_flg', {ComboText:'|Y|N', ComboCode:'|Y|N'} );
		                             SetColProperty('mgset_flg', {ComboText:'|Y|N', ComboCode:'|Y|N'} );
		                             SetColProperty('ca_flg', {ComboText:'|Y|N', ComboCode:'|Y|N'} );
		                             SetColProperty('air_flow_unit', {ComboText:'|CBM|CFT', ComboCode:'|CBM|CFT'} );
		                      		 
		                      		 //#3076 [UCB] AFTER V450.04, CONTAINER TAB COPY & PASTE FUNCTION
		                      		 //SetActionMenu("Header Setting Save|Header Setting Reset");
		                      		
		                      		 SetSheetHeight(250);
		                      		         //sheetObj.SetFocusAfterProcess(0);
		                      		       //sheetObj.SetFocusAfterRowTransaction(0);
		                     /* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting*/
		         }

                             
		break;
       //Item 그리드
        case 4:      
            with(sheetObj){
        	
        	       //  (16, 0, 0, true);

        	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

        	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	         var headers = [ { Text:getLabel('SEE_BMD_HDR6'), Align:"Center"},
        	                   { Text:getLabel('SEE_BMD_HDR7'), Align:"Center"} ];
        	         InitHeaders(headers, info);

        	         var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"Del" },
        	             {Type:"Status",    Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_ibflag" },
        	             {Type:"Seq",       Hidden:0,  	Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Combo",     Hidden:0, 	Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_cntr_list_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:0,  	Width:100,  Align:"Left",    ColMerge:0,   SaveName:"item_cust_po_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Popup", 	Hidden:0, 	Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_cmdt_cd",    	   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    ColMerge:1,   SaveName:"item_cmdt_nm",    	   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:300 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Left",    ColMerge:0,   SaveName:"item_hs_grp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"PopupEdit", Hidden:0, 	Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_shp_cmdt_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
        	             {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    ColMerge:1,   SaveName:"item_shp_cmdt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:300 },
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
        	             {Type:"Text",      Hidden:0,  	Width:200,  Align:"Left",    ColMerge:1,   SaveName:"item_rmk",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1000 },
        	             {Type:"Combo",     Hidden:0, 	Width:70,   Align:"Left",    ColMerge:1,   SaveName:"item_dg_cd_tp",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:0,  	Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_dg_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
        	             {Type:"Text",      Hidden:0,  	Width:200,  Align:"Left",    ColMerge:1,   SaveName:"item_dg_cntc_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:24 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_shp_cmdt_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_po_sys_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_po_cmdt_seq",    KeyField:0,   CalcLogic:"",   Format:"",       	   PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_sys_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Left",    ColMerge:0,   SaveName:"item_cntr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
        	          
        	         InitColumns(cols);

        	      //   SetGetCountPosition()(0);
        	         SetEditable(1);
        	         SetAutoRowHeight(1);
        	         SetDataRowHeight(20);
        	         SetEditEnterBehavior("newline");
        	         
        	         SetColProperty(0 ,"item_cmdt_nm" 		, {InputCaseSensitive:1});
        	         SetColProperty(0 ,"item_shp_cmdt_nm" 	, {InputCaseSensitive:1});
        	         SetColProperty(0 ,"item_rmk" 			, {InputCaseSensitive:1});
        	         SetColProperty(0 ,"item_dg_cntc_nm" 	, {InputCaseSensitive:1});
        	         SetColProperty(0 ,"item_cmdt_cd" 		, {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
        	         SetColProperty(0 ,"item_shp_cmdt_cd" 	, {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
        	         SetColProperty('item_pck_ut_cd', {ComboText:PCKCD1, ComboCode:PCKCD2} );
        	                                    /* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting*/
        	         SetColProperty('item_cntr_list_seq', {ComboText:CNTCD2, ComboCode:CNTCD1} );
        	         SetColProperty('item_dg_cd_tp', {ComboText:'|UN|IMDG', ComboCode:'|U|I'} );
        	         SetSheetHeight(300);
        	         }

                                             
      	 break;
		 case 5:      //TP/SZ init
			    with(sheetObj){
		    //    SetSheetHeight(0);
		    //  (2, 0, 0, true);

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
      	 //Freight
         case 6:      //Selling/Debit 탭부분 init
        	 
        	 if(MULTI_CURR_FLAG == "Y"){	//Muti Currency 
        		 with(sheetObj){
                	 
             	    //   (44, 0, 0, true);
             	       var cnt=0;

             	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1, TabStop:0 } );

             	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             	       var headers = [ { Text:getLabel('SEE_BMD_0020_HDR6_3'), Align:"Center"},
             	                   { Text:getLabel('SEE_BMD_0020_HDR6_4'), Align:"Center"} ];
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
             	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
             	              {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
             	              {Type:"Float",     Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             	              
//           	              #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//           	              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
             	              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },

             	              
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             	              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_inv_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              
//           	              #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//           	              {Type:"PopupEdit",      Hidden:0, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
             	              {Type:"Float",      Hidden:0, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
             	              {Type:"Image",      Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             	              
             	              {Type:"Date",      Hidden:0, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:1,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
             	              {Type:"Float",      Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
             	              {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
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
             	              {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" },
              	              //<!-- #2504 [PATENT]Debit Note & AP for billing code based invoices -->
             	              {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_cmb_inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },             	              
             	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd_h",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
             	        
             	       InitColumns(cols);

             	       SetEditable(1);
             	    //   SetHeaderGetRowHeight(20 );
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
                	 
             	    //   (44, 0, 0, true);
             	       var cnt=0;

             	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1, TabStop:0 } );

             	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             	       var headers = [ { Text:getLabel('SEE_BMD_0020_HDR6_1'), Align:"Center"},
             	                   { Text:getLabel('SEE_BMD_0020_HDR6_2'), Align:"Center"} ];
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
             	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
             	              {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
             	              {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
             	              {Type:"Float",     Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             	              
//           	              #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//           	              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
             	              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
             	              
             	              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             	              {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
             	              
//           	              {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
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
             	              {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" },
              	              //<!-- #2504 [PATENT]Debit Note & AP for billing code based invoices -->
             	              {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_cmb_inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
             	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd_h",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
             	        
             	       InitColumns(cols);

             	       SetEditable(1);
             	    //   SetHeaderGetRowHeight(20 );
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
       case 7:      //Buying/Credit 탭부분 init
    	   if(MULTI_CURR_FLAG == "Y"){	//Muti Currency 
    		   with(sheetObj){
    		    	  
      	         var cnt=0;

      	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1, TabStop:0 } );

      	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      	         var headers = [ { Text:getLabel('SEE_BMD_0020_HDR7_3'), Align:"Center"},
      	                     { Text:getLabel('SEE_BMD_0020_HDR7_4'), Align:"Center"} ];
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
      	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
      	                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
      	                {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
      	                
//    	                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
      	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
      	                
      	                
      	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
      	                {Type:"Combo",      Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
      	                
//    	                {Type:"PopupEdit",      Hidden:0, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
      	                {Type:"Float",      Hidden:0, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
      	                {Type:"Image",      Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
      	                
      	                {Type:"Date",      Hidden:0, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_xcrt_dt",      KeyField:1,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
      	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
      	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
      	                {Type:"Float",      Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
      	                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
      	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
      	                {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
      	                {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
      	                {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
      	                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
      	                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
      	                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
      	                //#2504 [PATENT]Debit Note & AP for billing code based invoices
      	                {Type:"Text",      Hidden:1,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_cmb_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
      	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
      	                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
      	                {Type:"Text",  		Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              //<!-- #2504 [PATENT]Debit Note & AP for billing code based invoices -->
       	                {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cmb_inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }      	                
      	                ];
      	          
      	         InitColumns(cols);

      	         SetEditable(1);
      	       //  SetHeaderGetRowHeight(20 );
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
    		    	  
      	         var cnt=0;

      	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1, TabStop:0 } );

      	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      	         var headers = [ { Text:getLabel('SEE_BMD_0020_HDR7_1'), Align:"Center"},
      	                     { Text:getLabel('SEE_BMD_0020_HDR7_2'), Align:"Center"} ];
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
      	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
      	                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
      	                {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
      	                
//    	                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
      	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
      	              
      	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
      	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
      	                
//    	                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
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
      	                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
      	                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
      	                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
      	                //#2504 [PATENT]Debit Note & AP for billing code based invoices
      	                {Type:"Text",      Hidden:1,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_cmb_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },      	                
      	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
      	                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
      	                {Type:"Text",  		Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	            //<!-- #2504 [PATENT]Debit Note & AP for billing code based invoices -->
       	                {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cmb_inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }      	                
      	                ];
      	          
      	         InitColumns(cols);

      	         SetEditable(1);
      	       //  SetHeaderGetRowHeight(20 );
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
        //Pickup/WorkOrder 그리드        
        case 8:
            with(sheetObj){
        	      
        		SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

        	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	      var headers = [ { Text:getLabel('SEE_BMD_0020_HDR8_2'), Align:"Center"} ];
        	      InitHeaders(headers, info);

        	      var cols = [ {Type:"Text",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"wo_seq" },
        	             {Type:"Text",     Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"wo_no" },
        	             {Type:"Combo",     Hidden:0, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"wo_status" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"pickup_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"delivery_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"return_trdp_nm" },
        	             {Type:"Text",     Hidden:0,  Width:210,  Align:"Left",    ColMerge:0,   SaveName:"trucker_trdp_nm" },
        	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"wo_grs_wgt", Format:"Float",       PointCount:obl_decimal_len } ];
        	       
        	      InitColumns(cols);

        	   //   SetGetCountPosition()(0);
        	      SetEditable(0);
        	      SetColProperty('wo_status', {ComboText:"SAVED|ISSUED", ComboCode:"A|B"} );
        	      SetSheetHeight(400);
        	                  }

                               
        break;
        case 9:      //Job Visibility
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

        	       //  SetGetCountPosition()(0);
        	         SetEditable(1);
        	         SetImageList(0,APP_PATH+"/web/img/button/bt_green.gif");
        	         SetImageList(1,APP_PATH+"/web/img/button/bt_red.gif");
        	         //InitViewFormat(0, "jb_pln_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
        	         //InitViewFormat(0, "jb_act_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
        	         SetColProperty('jb_sts_nm', {ComboText:"|"+JBCD2, ComboCode:"|"+JBCD1} );
     	            SetSheetHeight(200);
        	         }

                                   
   		break;
        case 10:					//첨부파일
            with(sheetObj){
           
        // (15, 0, 0, true);

         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel('SEE_BMD_HDR2'), Align:"Center"} ];
         InitHeaders(headers, info);

         var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
             {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"Del",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"palt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_ext_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:380,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"palt_doc_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_img_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_pdf_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:0,   SaveName:"palt_doc_rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq_d",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
          
         InitColumns(cols);

      //   SetCountPosition()(0);
         SetEditable(1);
         SetImageList(0,APP_PATH+"/web/img/button/bt_img.gif");
         SetImageList(1,APP_PATH+"/web/img/button/bt_pdf.gif");
                  sheetObj.SetDataLinkMouse("palt_doc_nm",1);
         sheetObj.SetDataLinkMouse("palt_doc_img_url",1);
         sheetObj.SetDataLinkMouse("palt_doc_pdf_url",1);
         //InitViewFormat(0, "rgst_tms", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
         //SetAutoRowHeight(0);
         SetSheetHeight(200);
         //sheetObj.SetFocusAfterProcess(0);
         }

                            
	   break;
        case 11:      //HISTORY
            with(sheetObj){
            
       //  (6, 0, 0, true);

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
         SetSheetHeight(200);
                  }


     	break;
        case 12:     //Booking Container
            with(sheetObj){
        	
//        	        SetSheetHeight(0);
//        	      (7, 0, 0, true);

        	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

        	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	      var headers = [ { Text:getLabel('SEE_BMD_HDR1'), Align:"Center"} ];
        	      InitHeaders(headers, info);

        	      var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"Del" },
        	             {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"smry_ibflag" },
        	             {Type:"Seq",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"seq",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cntr_smry_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Combo",     Hidden:0, Width:120,  Align:"Right",   ColMerge:0,   SaveName:"smry_cntr_tpsz_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:0,   SaveName:"smry_cntr_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
        	       
        	      InitColumns(cols);

        	    //  SetGetCountPosition()(0);
        	      SetEditable(1);
        	      SetColProperty('smry_cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
        	      SetVisible(false);

        	                  }

                 
	    break;
	   //국내세관 수출신고 품목정보
	   case 13:
		    with(sheetObj){
	      //  SetSheetHeight(0);
	     // (16, 0, 0, true);

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('SEE_BMD_HDR3-1'), Align:"Center"},
	                  { Text:getLabel('SEE_BMD_HDR3-2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"del",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"xpt_ibflag",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"xpt_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"edi_snd_sts_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"xpt_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	             {Type:"Int",       Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"edi_pck_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
	             {Type:"Combo",     Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"edi_pck_ut_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_pck_ut_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"edi_grs_wt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"sprt_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"sprt_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"sam_pck_tp",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
	             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"sam_pck_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"sam_pck_ut_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_xpt_seq" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_snd_sts_cd" } ];
	       
	      InitColumns(cols);

	    //  SetGetCountPosition()(0);
	      SetEditable(1);
	      SetColProperty('edi_pck_ut_cd', {ComboText:PCKCD1, ComboCode:PCKCD2} );
	            /* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting*/
	      SetColProperty("sprt_flg", {ComboText:"NO|YES", ComboCode:"N|Y"} );
	      
	      if(user_ofc_cnt_cd=="KR"){
	    	  SetVisible(true);
	    	  $("#exDeclareAdd").show();
	    	  $("#exDeclareTitle").show();
	      }else{
	    	  SetVisible(false);
	    	  $("#exDeclareAdd").hide();
	    	  $("#exDeclareTitle").hide();
	      }
	      
	      
	      }


		break;
	   case 14:      //Buying/Credit 탭부분 init
		   if(MULTI_CURR_FLAG == "Y"){	//Muti Currency 
			   with(sheetObj){
					 
			       //  (42, 0, 0, true);
			         var cnt=0;

			         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1, TabStop:0 } );

			         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			         var headers = [ { Text:getLabel('SEE_BMD_0020_HDR14_3'), Align:"Center"},
			                     { Text:getLabel('SEE_BMD_0020_HDR14_4'), Align:"Center"} ];
			         InitHeaders(headers, info);

			         var cols = [ 
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
			                {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
			                
			                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			                {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
			                {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			                {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			                
//			                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1 },
			                
			                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Combo",      Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			                
//			                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			                {Type:"PopupEdit",      Hidden:0, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			                {Type:"Float",      Hidden:0, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			                {Type:"Image",      Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                
			                {Type:"Date",      Hidden:0, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:1,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
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
			                {Type:"Text",      Hidden:0,  Width:80,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_auto_trf_flg" },
			                {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_frt_ask_clss_cd" },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_due_dt" },
			                {Type:"Float",     Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" } ];
			          
				         InitColumns(cols);
	
				         SetEditable(1);
				       //  SetHeaderRowHeight(20);
				         SetHeaderRowHeight(21);
				         SetColProperty('dc_fr_frt_cd', {ComboText:DCFRTCD2, ComboCode:DCFRTCD1} );
						   SetColProperty('dc_fr_sell_buy_tp_cd', {ComboText:"Debit|Credit", ComboCode:"D|C"} );
						   SetColProperty('dc_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
						   SetColProperty('dc_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
						   SetColProperty('dc_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
						   SetColProperty('dc_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
						   SetColProperty('dc_fr_inv_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
						   SetColProperty(0 ,"dc_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
						   
						   // #48327 - [Impex] HBL -- Option to Show D/C Freight Charges
						   /*if(frm1.oe_hbl_form.value == "IGIC"){
						   	   SetColHidden("dc_reserve_field01", 0);
						   }*/
						   
						   // #48327 - 20151112 - [Impex] HBL -- Option to Show D/C Freight Charges
						   if(blFrtChkYn == "Y"){
							   SetColHidden("dc_reserve_field01", 0);
						   }
						   
						   SetSheetHeight(150);
						   InitComboNoMatchText(1,"",1); 
						   SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
			   		}
		   }else{
			   with(sheetObj){
					 
			       //  (42, 0, 0, true);
			         var cnt=0;

			         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1, TabStop:0 } );

			         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			         var headers = [ { Text:getLabel('SEE_BMD_0020_HDR14_1'), Align:"Center"},
			                     { Text:getLabel('SEE_BMD_0020_HDR14_2'), Align:"Center"} ];
			         InitHeaders(headers, info);

			         var cols = [ 
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
			                {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			                //OFVFOUR-7249 [SOUTHEAST WORLDWIDE] Pop up appears once click the buttons on Freight tab - Modified by Thuong Huynh 20210621
			                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
			                
			                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			                {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
			                {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			                {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			                
//			                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1 },
			                
			                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			                
//			                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			                {Type:"Image",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",   ColMerge:1,   SaveName:"dc_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0,  Width:80,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_auto_trf_flg" },
			                {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_frt_ask_clss_cd" },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_due_dt" },
			                {Type:"Float",     Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" } ];
			          
				         InitColumns(cols);
	
				         SetEditable(1);
				       //  SetHeaderRowHeight(20);
				         SetHeaderRowHeight(21);
				         SetColProperty('dc_fr_frt_cd', {ComboText:DCFRTCD2, ComboCode:DCFRTCD1} );
						   SetColProperty('dc_fr_sell_buy_tp_cd', {ComboText:"Debit|Credit", ComboCode:"D|C"} );
						   SetColProperty('dc_fr_aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
						   SetColProperty('dc_fr_scg_incl_flg', {ComboText:"N|Y", ComboCode:"N|Y"} );
						   SetColProperty('dc_fr_frt_term_cd', {ComboText:"P|C", ComboCode:"PP|CC"} );
						   SetColProperty('dc_fr_rat_curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
						   SetColProperty(0 ,"dc_fr_trdp_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
						   
						   // #48327 - [Impex] HBL -- Option to Show D/C Freight Charges
						   /*if(frm1.oe_hbl_form.value == "IGIC"){
						       SetColHidden("dc_reserve_field01", 0);
						   }*/
						   
						   // #48327 - 20151112 - [Impex] HBL -- Option to Show D/C Freight Charges
						   if(blFrtChkYn == "Y"){
							   SetColHidden("dc_reserve_field01", 0);
						   }
						   
						   SetSheetHeight(150);
						   InitComboNoMatchText(1,"",1);
						   SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
			         }
		   }
		   

                                        
        break;
	   case 15:      //User Defined Field
		    with(sheetObj){
		  
		           
		       //  (4, 0, 0, true);

		         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

		         var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
		         var headers = [ { Text:getLabel("SEE_BMD_HDR20"), Align:"Center"} ];
		         InitHeaders(headers, info);

		         var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"udf_del_chk",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"udf_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"udf_val",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
		                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"udf_ibflag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
		          
		         InitColumns(cols);

		      //   SetGetCountPosition()(0);
		         SetEditable(1);
		         SetColProperty('udf_cd', {ComboText:'|'+UDFCD, ComboCode:'|'+UDFNM} );
		         SetSheetHeight(200);
		                     }

		    break;
   	
		    // Hawaii Freight 그리드
	   		case 16:
	   			with(sheetObj){
	   				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
					
			         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			         var headers = [ { Text:getLabel('SEE_BMD_0020_HDR16'), Align:"Center"} ];
			         InitHeaders(headers, info);
	
			         var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"hwifr_del_chk" },
			                {Type:"Status",    Hidden:1,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"hwifr_ibflag" },
			                {Type:"Seq",       Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"hwifr_Seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"hwifr_frt_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
			                {Type:"Float",     Hidden:0,  Width:140,  Align:"Right",   ColMerge:0,   SaveName:"hwifr_grs_wgt1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
			                {Type:"Float",     Hidden:0,  Width:140,  Align:"Right",   ColMerge:0,   SaveName:"hwifr_meas1",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
			                {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"hwifr_ru",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
			                {Type:"AutoSum",   Hidden:0,  Width:180,  Align:"Right",   ColMerge:1,   SaveName:"hwifr_inv_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                {Type:"AutoSum",   Hidden:0,  Width:180,  Align:"Right",   ColMerge:1,   SaveName:"hwifr_cod_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                {Type:"AutoSum",   Hidden:1,  Width:180,  Align:"Right",   ColMerge:1,   SaveName:"hwifr_adv_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hwifr_frt_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hwifr_intg_bl_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
			          
			         InitColumns(cols);
	
			         SetEditable(1);
              		 SetSheetHeight(400);
	         }
	   		break;
    	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet3_OnDblClick(sheetObj,Row,Col){
	//Name선택 시에만 팝업 호출
	if(sheetObj.ColSaveName(Col)=="palt_doc_no" || sheetObj.ColSaveName(Col)=="palt_doc_msg"){
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
/**
 * 해운 EDI 수출품목 데이터조회
 */
function exDeclareRowAdd(){
//	setExDeclareList();
	gridAdd(12);
}
function sheet4_OnPopupClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="edi_pck_ut_cd"){
		gridPopCall(sheetObj, row, col, 'edi_pck_ut_cd');
	}
}
function sheet4_OnKeyUp(sheetObj, row, col, keyCode){
	doAutoComplete(sheetObj, row, col, keyCode);
}
function sheet4_OnClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="sprt_seq"){
		if(sheetObj.GetCellValue(row, "sprt_flg")=="N"){
			//분할선적 여부를 \"Yes\"로 변경하십시오!
			alert(getLabel('FMS_COM_ALT023'));
			sheetObj.SelectCell(row, "sprt_flg");
		}
	}
}
function sheet4_OnChange(sheetObj, row, col, value){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="sprt_flg"){
		if(sheetObj.GetCellValue(row, "sprt_flg")=='NA'){
			sheetObj.SetCellValue(row, "sprt_seq",'');
		}
	}
	else if(colStr=="sprt_seq"){
		if(sheetObj.GetCellValue(row, "sprt_flg")=='NA'&&sheetObj.GetCellValue(row, "sprt_seq") != ''){
			sheetObj.SetCellValue(row, "sprt_seq",'');
			//분할선적 여부가  \"No\"이므로 입력하실수 없습니다!
			alert(getLabel('FMS_COM_ALT024'));
		}
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

function sheet3_OnSearchEnd(sheetObj, row, col) {
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

function sheet13_OnSearchEnd(sheetObj, row, col) {
	loadDataProcess = "";////조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
	
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	
	if (sheetObj.GetEditable() == 0) {
		sheetObj.SetEditable(1);
	}
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
	
	/*Vinh.Vo (S) Set all item in sheet13 to Insert flag if in copy function*/
	if(isCopy){
		var count = sheet13.RowCount();
		
		for(var i = 2; i <= count; i++){
			sheet13.SetCellValue(i,"dim_ibflag","I",0);
		}
		
		isCopy = false;
	}
	/*Vinh.Vo (E)*/
	
}

function sheet5_OnSearchEnd(sheetObj, row, col) {
 	for (var idx=1; idx < sheetObj.LastRow() + 1; idx++) {
 		/*if ( getCntrGrpCd(sheetObj.GetCellValue(idx,"cntr_tpsz_cd")) == "RF") {
			sheetObj.SetCellEditable(idx,"temp_val",1);
			sheetObj.SetCellEditable(idx,"temp_cd",1);
			sheetObj.SetCellEditable(idx,"vent_cd",1);
		} else {
			sheetObj.SetCellValue(idx,"temp_val","",0);
			sheetObj.SetCellValue(idx,"temp_cd","",0);
			sheetObj.SetCellValue(idx,"vent_cd","",0);
			sheetObj.SetCellEditable(idx,"temp_val",0);
			sheetObj.SetCellEditable(idx,"temp_cd",0);
			sheetObj.SetCellEditable(idx,"vent_cd",0);
		}*/
 		
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
	}
 	
 	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
 	
 	sheetObj.SetBlur();	//IBSheet Focus out 처리
 	
 	//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
 	searchGrid(5);
}
function sheet5_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
		case "cgo_pck_qty" :
			calWeightCbm(sheetObj, row, col);
		case "cgo_pck_ut" :
			calWeightCbm(sheetObj, row, col)
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
			for(var i=1; i<=sheetObj.LastRow() + 1; i++){
				sheetObj.SetCellValue(i, 'Seq',i);
			}
			fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
			
			//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
			comCntrList_OnChange(sheetObj, row, col, value, docObjects[3]);			
			
        	cntrInfoSet(docObjects[2]);
        break;
		case "cntr_tpsz_cd" :
			fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
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
	}

	switch(sheetObj.ColSaveName(col)){
		case "cgo_wgt":
			//sheetObj.SetCellValue(row, "cgo_wgt1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len),0);
			//#2877 [Zimex] after v450, Mismatch kg to lb conversion
			sheetObj.SetCellValue(row, "cgo_wgt1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len),0);
		break;
		case "cgo_wgt1":
			sheetObj.SetCellValue(row, "cgo_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len),0);
		break;
		case "cgo_meas":
			sheetObj.SetCellValue(row, "cgo_meas1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_CBM_CFT, 3),0);
		break;
		case "cgo_meas1":
			sheetObj.SetCellValue(row, "cgo_meas",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_CBM_CFT, 3),0);
		break;
	}
	/* jsjang 2013.7.5  요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start  */
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
		var grs_wgt=0.000;
		var grs_wgt1=0.00;
		for(var i=1; i<=sheetObj.LastRow(); i++) {
			if(sheetObj.GetCellValue(i, "Del") == 0){
				cgo_pck_qty=parseInt(cgo_pck_qty) 			+ parseInt(sheetObj.GetCellValue(i,"cgo_pck_qty"));
				//meas 	= roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.CellValue(i,"cgo_meas"), 6));
				meas=roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas")), 6);
				meas1=roundXL(parseFloat(meas1), 6) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas1")), 6);
				grs_wgt=roundXL(parseFloat(grs_wgt), obl_decimal_len)*1.0 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt")), obl_decimal_len)*1.0;
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

		if((colNm == "cgo_pck_qty" || colNm == "Del") && cgo_pck_qty > 0){
			// #1264 - [Split - 1] [CLC] LCL HB/L 에 Filing No 변경 시  Measurement/Package정보 유지
			if(!(frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value != "")){
				formObj.pck_qty.value=cgo_pck_qty;
			}
		}
		// #3940 [BINEX, IMPEX] EXPORT 입력 에러 이슈.
		if((colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "Del") && grs_wgt > 0 && formObj.shp_mod_cd.value =="FCL"){
			// #1264 - [Split - 1] [CLC] LCL HB/L 에 Filing No 변경 시  Measurement/Package정보 유지
			if(!(frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value != "")){
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
				formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, obl_decimal_len);
				/*
				 * #27534 이렇게 바뀌어야 하지 않나?? 일단 보류 -타 업체 확인 필요
				 * formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") /
				 / CNVT_CNST_KG_LB, 3);
				 */ 
				chkComma(formObj.grs_wgt1,8,obl_decimal_len);	

				formObj.grs_wgt1.value=doMoneyFmt(Number(grs_wgt1).toFixed(obl_decimal_len));
				formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(obl_decimal_len)); 

				chkComma(formObj.grs_wgt,8,obl_decimal_len);			

				formObj.mk_grs_wgt.value=formObj.grs_wgt.value;
				formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value);		
				formObj.mk_grs_wgt.value=formObj.grs_wgt.value;
				formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value);

				formObj.mk_grs_wgt1.value=formObj.grs_wgt1.value;
				formObj.mk_grs_wgt1.value =doMoneyFmt(formObj.mk_grs_wgt1.value);
				formObj.mk_grs_wgt1.value=formObj.grs_wgt1.value;
				formObj.mk_grs_wgt1.value = doMoneyFmt(formObj.mk_grs_wgt1.value);	
			}
		}
		// #3940 [BINEX, IMPEX] EXPORT 입력 에러 이슈.
		if((colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del") && meas > 0 && formObj.shp_mod_cd.value =="FCL"){
			// #1264 - [Split - 1] [CLC] LCL HB/L 에 Filing No 변경 시  Measurement/Package정보 유지
			if(!(frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value != "")){
				/*
				 * formObj.meas.value=doMoneyFmt(Number(meas).toFixed(3));
				 * formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") *
				 * CNVT_CNST_CBM_CFT, 3); chkComma(formObj.meas1,8,3);
				 * formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(3));
				 * formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") /
				 * CNVT_CNST_CBM_CFT, 3); chkComma(formObj.meas,8,3);
				 */
				/*
				formObj.meas.value=doMoneyFmt(Number(meas).toFixed(3));
				formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, 3);
				formObj.mk_meas1.value=formObj.meas1.value;
				formObj.mk_meas.value=formObj.meas.value;		
				chkComma(formObj.meas1,8,3);
				formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value);
				formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value);
				formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(3));
				formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, 3);
				formObj.mk_meas.value=formObj.meas.value;
				formObj.mk_meas1.value=formObj.meas1.value;	
				chkComma(formObj.meas,8,3);
				formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value);
				formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value)
				*/

				var f_meas = Number(meas).toFixed(obl_decimal_len);
				var f_meas1 = roundXL(f_meas * CNVT_CNST_CBM_CFT, obl_decimal_len);
				var f_meas2 = roundXL(f_meas1 / CNVT_CNST_CBM_CFT, obl_decimal_len);
				formObj.meas.value = f_meas2;
				formObj.meas1.value = f_meas1;
				chkComma(formObj.meas,8,obl_decimal_len);
				chkComma(formObj.meas1,8,obl_decimal_len);

				formObj.mk_meas.value=formObj.meas.value;		
				formObj.mk_meas1.value=formObj.meas1.value;
			}
		}
		/* jsjang 2013.7.22  요구사항 #15952 Container Info 자동 필드값 반영요건  */
		//if((colNm == "cgo_pck_qty" || colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del") && formObj.shp_mod_cd.value =="FCL"){
		if((colNm == "cgo_pck_qty" || colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del") && (formObj.shp_mod_cd.value =="FCL" || formObj.shp_mod_cd.value =="FAK" || formObj.shp_mod_cd.value =="LCL")){
			fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
			mkSaidTxt(docObjects[2], formObj.sad_txt);

			//#3678 [JAPT] OEH Entry 로직 수정 요건
			setPacQty();
		}
	}
	/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 End */	
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet5_OnSelectMenu(sheetObj, MenuString){
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
	 }
}

//#304
//[Starcluster] CARGO MANIFEST에서의 House Weight, CBM 자동 계산 로직
function calWeightCbm(sheetObj, row, col){
	if(frm1.shp_mod_cd.value == "LCL" || frm1.shp_mod_cd.value == "FAK"){
		var pckUnit = sheetObj.GetCellValue(row, "cgo_pck_ut");
		var pckQty = sheetObj.GetCellValue(row, "cgo_pck_qty");
		
		var mPckUnit = sheetObj.GetCellValue(row, "m_cgo_pck_ut");
		var mPckQty = sheetObj.GetCellValue(row, "m_cgo_pck_qty");

		if(mPckUnit == "" && mPckQty == ""){
			ajaxSendPost(getMasterWeightCbm, 'reqVal', '&goWhere=aj&bcKey=getMasterCntr&f_ref_no='+frm1.ref_no.value+'&f_intg_bl_seq='+frm1.intg_bl_seq.value+'&f_rlt_intg_bl_seq='+frm1.rlt_intg_bl_seq.value, './GateServlet.gsl');	//[20130822  ojg] rlt_intg_bl_seq파라미터추가
		}

		if((pckUnit == mPckUnit)&& (pckUnit != "" && mPckUnit != "") ){
			var ratio = Number(pckQty) / Number(mPckQty);
			//#5165 [Zen] Export HBL Gross weight/ measurement mandatory error
			//Master에서 HBL CREATE 시 FAK 인 경우 Master pckqty가 0이면 House 컨테이너 weight(kg), weight(lb), cbm, cbf 0이 아닌 공백 문자 들어가는 버그 수정
			//추가 수정 : mPckQty = 0 이면 House Weight 분배로직 타지 않도록 개발
			if(mPckQty =="" || mPckQty=="0"){
				return;
			}
			/*if(isNaN(ratio)){
				ratio = 0;
			}*/
			//var ratio = Number(docObjects[2].GetCellValue(i, 'cgo_pck_qty')) / Number(docObjects[2].GetCellValue(i, 'm_cgo_pck_qty'));

			var cgoWgt = sheetObj.GetCellValue(row, "m_cgo_wgt");
			cgoWgt = cgoWgt.replace(/,/gi, "");

			var grsWgt1 = sheetObj.GetCellValue(row, "m_cgo_wgt1");
			grsWgt1 = grsWgt1.replace(/,/gi, "");

			var cgoMeas = sheetObj.GetCellValue(row, "m_cgo_meas");
			cgoMeas = cgoMeas.replace(/,/gi, "");
			
			var cgoMeas1 = sheetObj.GetCellValue(row, "m_cgo_meas1");
			cgoMeas1 = cgoMeas1.replace(/,/gi, "");
			
			sheetObj.SetCellValue(row,"cgo_wgt",(Number(cgoWgt) * ratio),0);
			sheetObj.SetCellValue(row,"cgo_wgt1",(Number(grsWgt1) * ratio),0);
			sheetObj.SetCellValue(row,"cgo_meas",(Number(cgoMeas) * ratio),0);
			sheetObj.SetCellValue(row,"cgo_meas1",(Number(cgoMeas1) * ratio),0);
		}
	}
}
//#304
//[Starcluster] CARGO MANIFEST에서의 House Weight, CBM 자동 계산 로직

function getMasterWeightCbm(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpList=doc[1].split("@;;@");
			fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
			var intRows=docObjects[2].LastRow();
			for(var i=0 ; i <= intRows ; i++){
				for(var j=0 ; j<tmpList.length-1 ; j++){
					var tmp=tmpList[j].split("@^^@");
					if(docObjects[2].GetCellValue(i, 'cntr_no') == tmp[0]){
						docObjects[2].SetCellValue(i, 'm_cgo_pck_qty',tmp[3]);
						docObjects[2].SetCellValue(i, 'm_cgo_pck_ut',tmp[4]);
						docObjects[2].SetCellValue(i, 'm_cgo_wgt',tmp[5]);
						docObjects[2].SetCellValue(i, 'm_cgo_wgt1',tmp[6]);
						docObjects[2].SetCellValue(i, 'm_cgo_meas',tmp[7]);
						docObjects[2].SetCellValue(i, 'm_cgo_meas1',tmp[8]);
					}
				}
			}
		}
	}
}

/**
 * Container 탭의 Container List
 */
function sheet5_OnPopupClick(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	//Container 번호 호출시
	if(colStr=="cntr_no"){
		//gridPopCall(sheetObj, row, col, 'cntr_no')
	//Lessor정보 처리
	}else if(colStr=="cntr_sprl_trdp_cd"){	
		gridPopCall(sheetObj, row, col, 'cntr_sprl_trdp_cd');
	}
}
function sheet5_OnKeyUp(sheetObj, row, col, keyCode) {
	doAutoComplete(sheetObj, row, col, keyCode);
}
/**
* Item 탭 처리
*/
/**
 * 열 추가시 Container 번호가 Container List에 있는지 확인함
 */
var cntrListed=false;
function setItemCntrList(){
	if(!cntrListed){
		fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
		var cntrListObj=docObjects[2];
 		var cntrSize=cntrListObj.LastRow() + 1;
		var cntrCd='';
		var cntrLabel='';
		if(cntrSize>1){
			var hasCntr=false;
			for(var i=1; i < cntrSize; i++){
				//26239 HiddenRow면 무시
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
				fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
				docObjects[3].InitDataCombo (0, 'item_cntr_list_seq', cntrLabel, cntrCd);
				cntrListed=true;
			}
		}
	}
}
function cmdtRowAdd(){
	setItemCntrList();
	if(cntrListed){		
		//#2128 [PATSON] OEH Entry Container Item 복사기능
		var sheetObj2 = docObjects[2];
		var sheetObj3 = docObjects[3];
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
		//먼저 Container List를 등록하여 주십시오! 
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
		
		//rtnary[4]=frm1.por_cd.value;
		//rtnary[5]=frm1.por_nm.value;
		//rtnary[6]=frm1.del_cd.value;
		//rtnary[7]=frm1.del_nm.value;
		callBackFunc = "PO_POPLIST";
		modal_center_open('./CMM_POP_0400.clt', rtnary, 1300,500,"yes");
	}
	else{
		//먼저 Container List를 등록하여 주십시오! 
		alert(getLabel('SEA_COM_ALT013'));
	}
}

function hwiFrtRowAdd(){
	gridAdd(15);
}

function PO_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("^^");
		fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
		var idx=docObjects[3].LastRow() + 1;
		
		for (var i=0; i < rtnValAry.length; i++) {
			if(rtnValAry[i] == ""){
				break;
			}
			gridAdd(3);
			
			var Seq = docObjects[3].GetCellValue(idx-1, "Seq");
			
			var itemArr=rtnValAry[i].split("@@");
			docObjects[3].SetCellValue(idx, "Seq",Number(idx == 2 ? "0" : docObjects[3].GetCellValue(idx-1, "Seq")) + 1,0);
			docObjects[3].SetCellValue(idx, "item_cust_po_no",itemArr[0],0);
			docObjects[3].SetCellValue(idx, "item_cmdt_cd",itemArr[1],0);
			docObjects[3].SetCellValue(idx, "item_cmdt_nm",itemArr[2],0);
			docObjects[3].SetCellValue(idx, "item_pck_qty",itemArr[3],0);
			docObjects[3].SetCellValue(idx, "item_pck_ut_cd",itemArr[4],0);
			docObjects[3].SetCellValue(idx, "item_pck_inr_qty",itemArr[5],0);
			docObjects[3].SetCellValue(idx, "item_ea_cnt",itemArr[6],0);
			docObjects[3].SetCellValue(idx, "item_ttl_qty",itemArr[7],0);
			docObjects[3].SetCellValue(idx, "item_wgt",itemArr[8],0);
			docObjects[3].SetCellValue(idx, "item_lbs_wgt",itemArr[9],0);
			docObjects[3].SetCellValue(idx, "item_meas",itemArr[10],0);
			docObjects[3].SetCellValue(idx, "item_cft_meas",itemArr[11],0);
			docObjects[3].SetCellValue(idx, "item_hs_grp_cd",itemArr[12],0);
			docObjects[3].SetCellValue(idx, "item_shp_cmdt_cd",itemArr[13],0);
			docObjects[3].SetCellValue(idx, "item_shp_cmdt_nm",itemArr[14],0);
			docObjects[3].SetCellValue(idx, "item_po_cmdt_seq",itemArr[15],0);
			docObjects[3].SetCellValue(idx, "item_po_sys_no",itemArr[16],0);
			idx++;
		}
	}
}

function sheet6_OnSearchEnd(sheetObj) {
	//setItemCntrList();
}
function sheet6_OnPopupClick(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	//Item 코드
	if(colStr=="item_cmdt_cd"){
		gridPopCall(sheetObj, row, col, 'item_cmdt_cd');
	} 
	//HTS 코드(Commidity)
	else if(colStr=="item_shp_cmdt_cd"){
		gridPopCall(sheetObj, row, col, 'item_shp_cmdt_cd');
	}
}
function sheet6_OnKeyUp(sheetObj, row, col, keyCode) {
	//doAutoComplete(sheetObj, row, col, keyCode);
}
function sheet6_OnChange(sheetObj, row, col, value){
	switch (sheetObj.ColSaveName(col)) {
		case "item_shp_cmdt_cd" :
			doItemSearch(sheetObj, row, "commodity", value);
		break;
		
		case "item_cmdt_cd" :
			//alert(sheetObj.GetCellValue(row, "item_cmdt_cd"));
			ajaxSendPost(searchCustItem, 'reqVal', '&goWhere=aj&bcKey=getWHItem&ctrt_no=&itm_cd='+sheetObj.GetCellValue(row, "item_cmdt_cd"), './GateServlet.gsl');
			//var row = sheetObj.GetSelectRow();
			//var xml = loadDftItmVal(sheetObj, value);
			//displayDftItmVal(xml,sheetObj,row);	
		break;
		
		case "item_pck_qty" :
		case "item_pck_inr_qty" :
		case "item_ea_cnt" :
		case "item_wgt" :
		case "item_lbs_wgt" :
		case "item_meas" :
		case "item_cft_meas" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
		case "item_cntr_list_seq" : 
			//#2128 [PATSON] OEH Entry Container Item 복사기능
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
	
	switch (sheetObj.ColSaveName(col)) {
		case "item_pck_qty" :
		case "item_pck_inr_qty" :
		case "item_ea_cnt" :
			sheetObj.SetCellValue(row, "item_ttl_qty", (Number(sheetObj.GetCellValue(row, "item_pck_qty")) * Number(sheetObj.GetCellValue(row, "item_pck_inr_qty"))) + Number(sheetObj.GetCellValue(row, "item_ea_cnt")),0);
		break;
	}
	
	var colStr=sheetObj.ColSaveName(col);
	//Item 코드(Commidity)
	if(colStr=="item_dg_cd_tp"){
		if(sheetObj.GetCellValue(row, "item_dg_cd_tp")=='U'||sheetObj.GetCellValue(row, "item_dg_cd_tp")=='I'){
			sheetObj.SetCellEditable(row, "item_dg_cd",1);
			sheetObj.SetCellEditable(row, "item_dg_cntc_nm",1);
		}else{
			sheetObj.SetCellValue(row, "item_dg_cd",'');
			sheetObj.SetCellValue(row, "item_dg_cntc_nm",'');
		}
	}else if(colStr=="item_dg_cd"){
		if(sheetObj.GetCellValue(row, "item_dg_cd")!=''){
			if(sheetObj.GetCellValue(row, "item_dg_cd_tp")!='U'&&sheetObj.GetCellValue(row, "item_dg_cd_tp")!='I'){
				//Please select Type first!
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

function sheet6_OnClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="item_dg_cd"){
		if(sheetObj.GetCellValue(row, "item_dg_cd_tp")!='U'&&sheetObj.GetCellValue(row, "item_dg_cd_tp")!='I'){
			//Please select Type first!
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
var etdRangeOk=true;
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
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
		moveTab('01');
		//frm1.ntfy_trdp_addr.focus();
	}
	//---------------20121130 OJG--------------------------
	/*
	 *  2012.02.23
	 * 필수값 설정
	 * REF_NO, ETD 
	 */
	//if(checkInputVal(frm1.ref_no.value, 2, 30, "T", 'Filing No.')!='O'){ //S.Y BAIK (2013.01.23)
	if(getStringLength(frm1.ref_no.value) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_FINO'));  
		isOk=false;
		moveTab('01');
		frm1.ref_no.focus();
		return isOk;
	}
	//else if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){ //S.Y BAIK (2013.01.23)
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
 	//#25246, 25247 필수값 설정 추가
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
	//#31594 [BINEX]B/L Entry 에서 Customer 항목을 mandatory 지정 - 필수값 설정 추가
	if(frm1.act_shpr_trdp_cd.value == "") { 
//		alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		moveTab('01');
		frm1.act_shpr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.act_shpr_trdp_nm.value == "") { 
//		alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		moveTab('01');
		frm1.act_shpr_trdp_nm.focus();
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
	//today를 기준으로 6개월 차이가 나면 안됨
	var tmpEtdDate=frm1.etd_dt_tm.value.replaceAll("-", "");
	var etdDate=new Date(tmpEtdDate.substring(4,8), tmpEtdDate.substring(0,2)-1, tmpEtdDate.substring(2,4));
	var tmpDate=new Date();
	var today=new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()); 
	if((today-etdDate)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	} else if((etdDate-today)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	} else{
		etdRangeOk=true;
	}
	fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj9=docObjects[8];
	for(var i=1; i<=sheetObj9.RowCount(); i++){
if(sheetObj9.GetCellValue(i,"jb_sts_nm") == ""){
			//alert("[ Status >> Job Visibility >> Task ] is mandatory field. ");
			alert(getLabel('FMS_COM_ALT001'));
			sheetObj9.SelectCell(i,"jb_sts_nm");
			isOk=false;
		}
	}
	fnSetIBsheetInit(14);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj15=docObjects[14];
	for(var i=1; i<=sheetObj15.RowCount(); i++){
if(sheetObj15.GetCellValue(i,"udf_cd") == ""){
			//alert("[ Status >> Job Visibility >> Task ] is mandatory field. ");
			alert(getLabel('FMS_COM_ALT001'));
			sheetObj15.SelectCell(i,"udf_cd");
			isOk=false;
		}
	}
	/*
	//Booking 시
	if(checkInputVal(frm1.act_shp_info.value, 0, 100, "T", 'A/Shipper MEMO')!='O'){
		isOk=false;
		moveTab('01');
		frm1.act_shp_info.focus();
	}else if(checkInputVal(frm1.obrd_dt_tm.value, 10, 10, "DD", 'On Board Date')!='O'){
		isOk=false;
		moveTab('01');
		frm1.obrd_dt_tm.focus();
	}else if(checkInputVal(frm1.trnk_vsl_nm.value, 2, 100, "T", 'Vessel Name')!='O'){
		isOk=false;
		moveTab('01');
		frm1.trnk_vsl_nm.focus();
	}else if(checkInputVal(frm1.trnk_voy.value, 3, 8, "T", 'Voyage')!='O'){
		isOk=false;
		moveTab('01');
		frm1.trnk_voy.focus();
	}else if(checkInputVal(frm1.pol_cd.value, 5, 6, "T", 'POL Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.pol_cd.focus();
	}else if(checkInputVal(frm1.pod_cd.value, 5, 6, "T", 'POD Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.pod_cd.focus();
	}else if(checkInputVal(frm1.del_cd.value, 5, 6, "T", 'DEL Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.del_cd.focus();
	}else if(checkInputVal(frm1.lnr_trdp_cd.value, 6, 7, "T", 'Liner Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
	}else if(checkInputVal(frm1.lnr_trdp_nm.value, 2, 50, "T", 'Liner')!='O'){
		isOk=false;
		moveTab('01');
		frm1.lnr_trdp_nm.focus();
	}else if(checkInputVal(frm1.bkg_dt_tm.value, 10, 10, "DD", 'Booking Date')!='O'){
		isOk=false;
		moveTab('01');
		frm1.bkg_dt_tm.focus();
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
	}else if(checkInputVal(frm1.rep_cmdt_cd.value, 0, 50, "T", 'Commodity')!='O'){
		isOk=false;
		moveTab('01');
		frm1.rep_cmdt_cd.focus();		
	}else if(checkInputVal(frm1.rep_cmdt_nm.value, 1, 200, "T", 'Commodity')!='O'){
		isOk=false;
		moveTab('01');
		frm1.rep_cmdt_nm.focus();		
	}
	//HBL작성시
	if(isOk){
		if(frm1.bl_sts_cd.value=='BF'||frm1.bl_sts_cd.value=='HC'){
			if(checkInputVal(frm1.shpr_trdp_nm.value, 2, 50, "T", 'Shipper Name')!='O'){
				moveTab('01');
				frm1.shpr_trdp_nm.focus();
				isOk=false;
			}else if(checkInputVal(frm1.shpr_trdp_addr.value, 2, 400, "T", 'Shipper Address')!='O'){
				moveTab('01');
				frm1.shpr_trdp_addr.focus();
				isOk=false;				
			}else if(checkInputVal(frm1.cnee_trdp_nm.value, 2, 50, "T", 'Consignee Name')!='O'){
				moveTab('01');
				frm1.cnee_trdp_nm.focus();
				isOk=false;
			}else if(checkInputVal(frm1.cnee_trdp_addr.value, 2, 400, "T", 'Consignee Address')!='O'){
				moveTab('01');
				frm1.cnee_trdp_addr.focus();
				isOk=false;				
			}else if(checkInputVal(frm1.bl_iss_dt.value, 10, 10, "DD", 'Issued Date')!='O'){
				moveTab('01');
				frm1.bl_iss_dt.focus();
				isOk=false;
			}
		}
	}
	*/
	/*==================================================================================================*/
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용						    */
	/* Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류 발생을 차단. */
	var sheetObjArr=new Array(3);
		fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
		sheetObjArr[0]=docObjects[5];		//AR LOCAL  'fr_'
		sheetObjArr[1]=docObjects[13];	//DC 		'dc_fr_'
		sheetObjArr[2]=docObjects[6];		//AP 		'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){	//Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/*=================================================================================================*/
	//Container List & Item List validation.
	//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
	if(comCntrDelCheckVals(docObjects[2], docObjects[3])){
		isOk=false;
	}
	
	
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
    var cntrListParam=docObjects[2].GetSaveString(false);
    if(docObjects[2].IsDataModified() && cntrListParam == "") { isOk=false; };
	if(cntrListParam!=''){
		if(cntrListCheckInpuVals(docObjects[2])){
			isOk=false;
		}
	}
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	var cmdtListParam=docObjects[3].GetSaveString(false);
	if(docObjects[3].IsDataModified() && cmdtListParam == "") { isOk=false; };
	if(cmdtListParam!=''){
		if(itemCheckInpuVals(docObjects[3])){
			isOk=false;
		}
	}
	
//	#1351 [CLT] B/L, AWB 등 Freight 탭에 대한 Mandatory Validation 메시지 기능 보완
	var frtSdListParam=docObjects[5].GetSaveString(false);
    if(docObjects[5].IsDataModified() && frtSdListParam == "") { isOk=false; moveTab('04'); };

    var frtBcListParam=docObjects[6].GetSaveString(false);
    if(docObjects[6].IsDataModified() && frtBcListParam == "") { isOk=false; moveTab('04'); };

    var frtDcListParam=docObjects[13].GetSaveString(false);
    if(docObjects[13].IsDataModified() && frtDcListParam == "") { isOk=false; moveTab('04'); };
    
    fnSetIBsheetInit(15);   //grid가 생성되지않았으면 생성(속도개선)
    var hwiFrtListParam=docObjects[15].GetSaveString(false);
	if(docObjects[15].IsDataModified() && hwiFrtListParam == "") { isOk=false; };
	if(hwiFrtListParam!=''){
		if(hwiFrtCheckInpuVals(docObjects[15])){
			isOk=false;
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
			if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_no'),      0, 14, "T", 'Container No.')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_tpsz_cd'), 2, 6, "T", 'Container Type/Size')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'seal_no1'),     0,20, "T", 'Seal No.1')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'seal_no2'),     0,20, "T", 'Seal No.2')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'seal_no3'),     0,20, "T", 'Seal No.3')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cgo_pck_qty'),  0, 7, "N", 'Package Qty')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cgo_pck_ut'),   0, 6, "T", 'Package Unit')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cgo_wgt'),      0, 10, "N", 'Weight')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cgo_meas'),     0, 12, "N", 'Meas.')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'vol_meas'),     0, 12, "N", 'Volume')!='O'){
				isError=true;
			}
			/*
else if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_sprl_trdp_cd'), 5, 10, "T", 'Lessor Code')!='O'){
				isError=true;
			}
			*/
			else if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_rmk'),     0, 50, "T", 'Remark.')!='O'){
				isError=true;
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
			//if(checkInputVal(sheetObj.GetCellValue(i, 'item_shp_cmdt_cd'), 4, 12, "T", 'Item Code')!='O'){
			//	isError=true;
			//} 
				
			if(checkInputVal(sheetObj.GetCellText(i, 'item_cntr_list_seq'), 1, 14, "T", 'Container No.')!='O'){
				isError=true;				
			}
		}
	}
	return isError;
}

/**
 * Hawaii Freight 입력값 확인
 */
function hwiFrtCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	var workItems=0;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'hwifr_ibflag')=='U'||sheetObj.GetCellValue(i, 'hwifr_ibflag')=='I'){
			if(checkInputVal(sheetObj.GetCellValue(i, "hwifr_frt_nm"), 1, 50, "T", "Freight") != 'O'){
				isError=true;
			}
		}
	}
	return isError;
}

/**
 * EDI 입력값 체크
 */
function ediCheckInpuVals(sheetObj){
	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	var workItems=0;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'xpt_ibflag')=='U'||sheetObj.GetCellValue(i, 'xpt_ibflag')=='I'){
			if(checkInputVal(sheetObj.GetCellValue(i, 'xpt_no'), 10, 20, "T", '수출신고번호')!='O'){
				isError=true;
			}
		}
	}
	return isError;
}
//***************Freight Sheets Event처리***************
/**
 * Freight Container List 목록조회
 */
function sheet7_OnSearchEnd(sheetObj, row, col) {
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
	
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
	docObjects[5].SetColProperty("fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[6].SetColProperty("b_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[13].SetColProperty("dc_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
}
var inv_viw_tp='S';
/**
 * Freight S/D 처리
 */
function sheet8_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, '', 'S', 'O', 'H');
	}else{
		mutiSheetOnClick(sheetObj, row, col, '');
	}
}
/**
 * Freight S/D 처리
 */
function sheet8_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'H');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'H');
}
/**
 * Freight S/D 처리. 
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet8_OnChange(sheetObj, row, col, value, OldValue) {
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
			//#3573 OE FRT AR Bill To 재정의			
			if(sheetObj.GetCellValue(row,'fr_frt_term_cd')=='PP') {
				sheetObj.SetCellValue(row,'fr_trdp_cd',frm1.act_shpr_trdp_cd.value);
				sheetObj.SetCellValue(row,'fr_trdp_nm',frm1.act_shpr_trdp_nm.value);

				//#4958 [JTC] request for defalt setting auto to show A/R Curr.
				if(MULTI_CURR_FLAG == 'Y') {
					sheetObj.SetCellValue(row, 'fr_inv_curr_cd', ofc_locl_curr_cd, 0);
				}

			}else if(sheetObj.GetCellValue(row,'fr_frt_term_cd')=='CC'){
				sheetObj.SetCellValue(row,'fr_trdp_cd',frm1.prnr_trdp_cd.value);
				sheetObj.SetCellValue(row,'fr_trdp_nm',frm1.prnr_trdp_nm.value);

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
	mutiSheetOnChange(sheetObj, row, col, '', 'S', 'O', 'H', OldValue);
}
/**
 * Freight S/D 조회 완료시
 */
function sheet8_OnSearchEnd(sheetObj, row, col) {
	//#25833 P/C값을 copy
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellValue(i,"fr_frt_term_cd_h",sheetObj.GetCellValue(i,"fr_frt_term_cd"),0);
		sheetObj.SetCellImage(i, "fr_att_file_1", 0);
	}
	//버튼 초기화
	cnfCntr('SD');
	//PPD, CCT, Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, '', 'S', 'O', 'H');
	} 

	if(getStringLength(frm1.ref_no.value) == 0){
		for(var i=2; i<=sheetObj.LastRow(); i++){
			sheetObj.SetCellValue(i,"fr_ibflag","I",0);
		}
	}
	
}
/**
 * Freight S/D 저장 완료시
 */
function sheet8_OnSaveEnd(sheetObj, row, col) {
	//P/C값을 copy
	for(var i=2; i<=sheetObj.LastRow(); i++){
sheetObj.SetCellValue(i,"fr_frt_term_cd_h",sheetObj.GetCellValue(i,"fr_frt_term_cd"),0);
	}
	//버튼 초기화
	cnfCntr('SD');
	//PPD, CCT, Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}
function sheet8_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, '');
}
function sheet9_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, 'b_', 'S', 'O', 'H');
	}
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "b_fr_att_file_1", 0);
	}
	
}
function sheet9_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
}
/**
 * Freight B/C 처리
 */
function sheet9_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "b_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'O', 'H');
	}
}
/**
 * Freight B/C 처리
 */
function sheet9_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "b_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, 'b_', 'S', 'O', 'H');
	}else{
		mutiSheetOnClick(sheetObj, row, col, 'b_');
	}
	
}
/**
 * Freight B/C 처리
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet9_OnChange(sheetObj, row, col, value, OldValue) {
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
	mutiSheetOnChange(sheetObj, row, col,  'b_', 'S', 'O', 'H', OldValue);
}
function sheet9_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'b_');
}
//Job Visibility 
function sheet11_OnChange(sheetObj, row, col, value) {
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
/**
 * Freight B/C 코드입력시 Name조회
 */
/*
function sheet9_OnKeyUp(sheetObj, row, col, keyCode){
	doAutoCdFind('b_', sheetObj, row, col, keyCode);
}
*/
/**
 * Container Sheet Object를 리턴함
 */
function getCrtrSheet(){
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[4];
}

/**
 * Selling/Debit Sheet를 리턴함
 */
function getSdSheet(){
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[5];
}
function getSdUrl(){
	return "./SEE_BMD_0024GS.clt";
}
function getSdFndSeq(){
	return 7;
}
/**
 * Buying/Selling Sheet를 리턴함
 */
function getBcSheet(){
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[6];
}
/**
 * Debit/Credit Sheet를 리턴함
 */
function getDcSheet(){
	fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[13];
}
function getBcUrl(){
	return "./SEE_BMD_0024GS.clt";
}
function getBcFndSeq(){
	return 8;
}
//-------------------------Work Order-------------------------
/**
 * Work Order 화면이동
 */
function sheet10_OnDblClick(sheetObj, row, col){
/*var param='f_wo_no=' + sheetObj.GetCellValue(row, 'wo_no');
	   param += '&air_sea_clss_cd=S'; 
	   param += '&bnd_clss_cd=O';
	   param += '&biz_clss_cd=H';
	 //#34862 - [BINEX]Work Order - Trucker 정보 Link
	   param += '&pickup_ref_no=' + document.frm1.cust_ref_no.value;
   	var paramStr="./AIC_WOM_0011.clt?f_cmd="+SEARCH+"&"+param;
   	parent.mkNewFrame('Pick/Delivery Instruction', paramStr);*/
   	
   	var paramStr="./AIC_WOM_0011.clt?air_sea_clss_cd=S&bnd_clss_cd=O&biz_clss_cd=H";
    var param = "&f_cmd=" + SEARCH;
    param += "&f_wo_no=" + sheetObj.GetCellValue(row, 'wo_no');
    param += '&pickup_ref_no=' + frm1.cust_ref_no.value;
    parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
}
/*
 * 도량형 변환식
 * jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완
 */
function sheet13_OnChange(sheetObj, row, col, value){
	switch (sheetObj.ColSaveName(col)) {
		case "dim_len_dim" :
		case "dim_wdt_dim" :
		case "dim_hgt_dim" :
		case "dim_pce_qty" :
		case "dim_act_dim" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	var colName=sheetObj.ColSaveName(col);
	var formObj=document.frm1;
	/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
	if (colName=="dim_len_dim" || colName=="dim_wdt_dim" || colName=="dim_hgt_dim" 
		|| colName=="dim_pce_qty" || colName=="del" || colName=="dim_act_dim") {
		var formObj=document.frm1;
		var length=sheetObj.GetCellValue(row, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_len_dim");
		var width=sheetObj.GetCellValue(row, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_wdt_dim");
		var height=sheetObj.GetCellValue(row, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_hgt_dim");
		var pcs=sheetObj.GetCellValue(row, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(row, "dim_pce_qty");
		var cbm=0;
		var kg= 0;
		var sumCbm=0;
		var sumPcs=0;
		if (formObj.size_ut_cd[0].checked) {
			kg = roundXL(length * width * height * pcs / 6000, 2);
			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 6);
		} else if (formObj.size_ut_cd[1].checked) {
			kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, 2);
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 6);
		}
		if (!ChkNumberCommaLen(kg, 15, 2) || !ChkNumberCommaLen(cbm,10, 6)) {
			ComShowCodeMessage('COM03230');
			sheetObj.SetCellValue(row, "dim_pce_qty", 0);
			return;
		} else {
			// #4666 [IMPEX] OEH Chargeable Weight from Dimension Input - Nhan.Le
			sheetObj.SetCellValue(row, "dim_wgt_k",kg.toFixed(2),0);
			sheetObj.SetCellValue(row, "dim_wgt_l",(kg * CNVT_CNST_KG_LB).toFixed(2),0);
		}
		/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
		/* if 문만 추가 */
		if (colName !="dim_act_dim")
		{
			sheetObj.SetCellValue(row, "dim_act_dim",cbm.toFixed(3),0);
		}
		if (cbm.toFixed(3) > 999999) {
			alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("6")));
			sheetObj.SetCellValue(row, "dim_act_dim",0,0);
			return;
		}
		for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
			/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
			/* if 문만 추가 */
			if(sheetObj.GetCellValue(i, "del") == 0)
			{
				sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_act_dim"));
				sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
			}
		}
		formObj.meas.value=sumCbm.toFixed(obl_decimal_len);
		formObj.pck_qty.value=sumPcs.toFixed(0);
		cbmChange(formObj.meas);

	}
	
	// #4666 [IMPEX] OEH Chargeable Weight from Dimension Input - Nhan.Le
	else if(colName=="dim_wgt_k" || colName=="dim_wgt_l"){
		if(colName=="dim_wgt_k")
		{
			var wgt_k_tmp = roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, 2);
			if (!ChkNumberCommaLen(wgt_k_tmp, 15, 2)) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row, "dim_wgt_k", 0);
				return;
			} else {
				sheetObj.SetCellValue(row, "dim_wgt_l",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, 2),0);
			}
		}else if(colName=="dim_wgt_l")
		{
			var wgt_l_tmp = roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, 2);
			if (!ChkNumberCommaLen(wgt_l_tmp, 15, 2)) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row, "dim_wgt_l", 0);
				return;
			} else {
				sheetObj.SetCellValue(row, "dim_wgt_k",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, 2),0);
			}
		}
	}
}


function setOfficeData(){
	var formObj=document.frm1;
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj=docObjects[1];
	//office size type setting
	//alert(oth_size_ut_cd);
	setSizeUtCd(oth_size_ut_cd);
	//office post date setting, Ocean Export
//	if(formObj.post_dt.value==""){
//		if(ofc_post_dt=="TODAY"){
//			formObj.post_dt.value = getTodayStr();
//		}
//	}
	//office currency
//	if(ofc_curr_cd!=""){
//		formObj.agent_curr_cd.value = ofc_curr_cd;
//		formObj.cust_curr_cd.value = ofc_curr_cd;
//	}
}

//#2268 [UNICO, PREMIER] Decimal place of container weight to be 3 decimal digits
function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt"){
		
		var grsWgtValue = Number(formObj.grs_wgt.value.replace(/,/gi, "")).toFixed(obl_decimal_len);
		var grsWgtMoney = doMoneyFmt(grsWgtValue);
		
		//var grsWgtValue1 = doMoneyFmt(Number(roundXL(grsWgtValue * CNVT_CNST_KG_LB, obl_decimal_len)));
		//#2877 [Zimex] after v450, Mismatch kg to lb conversion
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
	if(obj.name=="meas"){
		var rndXLValue=roundXL(formObj.meas.value.replaceAll(",", "") * CNVT_CNST_CBM_CFT, obl_decimal_len);
		formObj.meas1.value=doMoneyFmt(Number(rndXLValue).toFixed(obl_decimal_len));
		formObj.mk_meas1.value=doMoneyFmt(Number(rndXLValue).toFixed(obl_decimal_len));
		formObj.mk_meas.value=formObj.meas.value.replaceAll(",", "");
		//chkComma(formObj.meas1, 8, 3);
		formObj.mk_meas1.value=doMoneyFmt(formObj.mk_meas1.value);
		formObj.mk_meas.value=doMoneyFmt(formObj.mk_meas.value);
	}
	// CFT ==> CBM 기능  
	else if(obj.name=="meas1"){
		var rndXLValue=roundXL(formObj.meas1.value.replaceAll(",", "") / CNVT_CNST_CBM_CFT, obl_decimal_len);
		formObj.meas.value=rndXLValue;
		formObj.mk_meas.value=rndXLValue;
		formObj.mk_meas1.value=formObj.meas1.value.replaceAll(",","");
		chkComma(formObj.meas, 8, obl_decimal_len);
		formObj.mk_meas.value=doMoneyFmt(formObj.mk_meas.value);
		formObj.mk_meas1.value=doMoneyFmt(formObj.mk_meas1.value);
	}
	
	//#2889 [Zimex, JC Freight] after v450, Decimal handling on weight
	else if(obj.name=="mk_meas"){
		formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value.replace(/,/gi, ""));
	}else if(obj.name=="mk_meas1"){
		formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value.replace(/,/gi, ""));
	}
	
	/*
	if(obj.name=="mk_meas"){
		formObj.mk_meas1.value=roundXL(formObj.mk_meas.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, 3);
		chkComma(formObj.mk_meas1,8,3);
	}else if(obj.name=="mk_meas1"){
		formObj.mk_meas.value=roundXL(formObj.mk_meas1.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, 3);
		chkComma(formObj.mk_meas,8,3);
	}
	*/
	amountChange(frm1.agent_rt);
	amountChange(frm1.cust_rt);
	
}
function amountChange(obj){
	var formObj=document.frm1;
	//Selling/Buying Amount 계산시 R/T(G.WT/1000) 과 CBM 비교하여 값이 큰 것으로 계산한다.
	var grsWgtKg=formObj.grs_wgt.value.replaceAll(",","");
	var retWgt=roundXL(grsWgtKg / 1000, 3);
	var cbm=formObj.meas.value.replaceAll(",","");
	var volume=0;
	if(retWgt - cbm > 0){
		volume=retWgt;
	}else{
		volume=cbm;
	}
	if(obj.name=="agent_rt"){		
		if(formObj.agent_rt.value!=''){
			if(formObj.agent_curr_cd.value=="KRW"){
				formObj.agent_amt.value=roundXL(formObj.agent_rt.value.replaceAll(",","") * (volume<1 ? 1 : volume), 0);
				numberCommaLen(formObj.agent_amt, 8, 0);
			}else{
				if(volume<1){
					volume=1;
				}
				var curSum=getMultiplyFloat(formObj.agent_rt.value.replaceAll(",",""),  volume);
			    curSum=strToFloatByNDecimalTp(curSum, TP_TRM3);
			    if(curSum>9999999999999.99){
			    	alert(getLabel('FMS_COM_ALT002'));
			    	formObj.agent_rt.value=0;
			    	formObj.agent_amt.value=0;
			    	formObj.agent_rt.focus();
			    	return;
			    }
				formObj.agent_amt.value=curSum;
				chkComma(formObj.agent_amt, 8, 2);
			}			
		}
		//chkComma(formObj.agent_amt,8,2);
	}else if(obj.name=="cust_rt"){
		if(formObj.cust_rt.value!=''){
			if(formObj.cust_curr_cd.value=="KRW"){
				formObj.cust_amt.value=roundXL(formObj.cust_rt.value.replaceAll(",","") * (volume<1 ? 1 : volume), 0);
				numberCommaLen(formObj.cust_amt, 8, 0);
			}else{
				if(volume<1){
					volume=1;
				}
				var curSum=getMultiplyFloat(formObj.cust_rt.value.replaceAll(",",""),  volume);
			    curSum=strToFloatByNDecimalTp(curSum, TP_TRM3);
			    if(curSum>9999999999999.99){
			    	alert(getLabel('FMS_COM_ALT002'));
			    	formObj.cust_rt.value=0;
			    	formObj.cust_amt.value=0;
			    	formObj.cust_rt.focus();
			    	return;
			    }
				formObj.cust_amt.value=curSum;
				chkComma(formObj.cust_amt,8,2);
			}
			//chkComma(formObj.cust_amt,8,2);			
		}
	}
	if(obj.name=="agent_amt"){
		if(formObj.agent_curr_cd.value=="KRW"){
			numberCommaLen(formObj.agent_amt, 8, 0);
		}else{
			chkComma(formObj.agent_amt,8,2);
		}
	}else if(obj.name=="cust_amt"){
		if(formObj.cust_curr_cd.value=="KRW"){
			numberCommaLen(formObj.cust_amt, 8, 0);
		}else{
			chkComma(formObj.cust_amt,8,2);
		}
	}
}
function shipModeChange(){
	var formObj=document.frm1;
	var isOk=true;
	if(isOk){
		//office에서 설정한 FCL, LCL 문장을 가져온다.
		/*
		if(formObj.shp_mod_cd.value=="FCL") {

			//#3678 [JAPT] OEH Entry 로직 수정 요건
			if(OEH_SAID_DESC_PRT_QTY == "S") {
				formObj.desc_txt1.value=formObj.h_sea_fcl_desc.value;
			} else if (OEH_SAID_DESC_PRT_QTY == "D") {
				setFclDescTxt1();
			}

		} else if(formObj.shp_mod_cd.value=="LCL" || formObj.shp_mod_cd.value=="FAK") {
			formObj.desc_txt1.value=formObj.h_sea_lcl_desc.value;
			//frm1.fm_svc_term_cd.value='CF';
			//frm1.to_svc_term_cd.value='CF';
		} else {
			formObj.desc_txt1.value='';
		}
		*/
		
		setFclDescTxt1();
	}
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
function setActShipper(){
	var formObj=document.frm1;
	//2011.10.28 Kim,Jin-Hyuk
	//해상 수출 HBL Shipper 입력하면 A/Shipper도 같이 입력해준다. 수정은 가능
	// #25244 Customer 정보가 있어도 Shipper 변경 시 Customer 를 Shipper 로 다시 변경함
	/*if(trim(formObj.act_shpr_trdp_cd.value)=="" 
		  && trim(formObj.act_shpr_trdp_nm.value)=="" 
		  && trim(formObj.act_shp_info.value)==""){
		formObj.act_shpr_trdp_cd.value=formObj.shpr_trdp_cd.value;
		formObj.act_shpr_trdp_nm.value=formObj.shpr_trdp_nm.value;
		formObj.act_shp_info.value=formObj.shpr_trdp_addr.value;
	}*/
	//#3410 [JTC]Ocean Export/Import 수정 사항
	//Shipper 변경시 Customer 변경되지 않도록 주석처리
	/*
	formObj.act_shpr_trdp_cd.value=formObj.shpr_trdp_cd.value;
	formObj.act_shpr_trdp_nm.value=formObj.shpr_trdp_nm.value;
	*/

	creditRoleCheck();
	
	//#25711 [SUNWAY]Sales Man 자동 설정 
	if (typeof(formObj.sls_usrid.value)!='undefined'
		&& typeof(formObj.sls_usr_nm.value)!='undefined'
			&& typeof(formObj.sls_ofc_cd.value)!='undefined'
				&& typeof(formObj.sls_dept_cd.value)!='undefined')
	{
		setSalesMan(formObj.act_shpr_trdp_cd.value);
	}
}

function setShipper(engNm,blAddr){
	var formObj=document.frm1;
	//초기화
	if(formObj.shpr_trdp_nm.value =='' && formObj.shpr_trdp_addr.value ==''){
		formObj.shpr_trdp_cd.value ='';
	}
	
	//OFVFOUR-7340: [JH Logistics] Customer copy option
	if(auto_select_shipper=="N"){
		return;
	}
	
	if(formObj.shpr_trdp_cd.value !=''){
		if(formObj.shpr_trdp_cd.value !=formObj.act_shpr_trdp_cd.value){
			if(confirm(getLabel('FMS_COM_CFMCTS'))){
				formObj.shpr_trdp_cd.value=formObj.act_shpr_trdp_cd.value;
				formObj.shpr_trdp_nm.value=engNm;
				formObj.shpr_trdp_addr.value=blAddr;
			}
		}else{
			if(formObj.shpr_trdp_nm.value =='' && formObj.shpr_trdp_addr.value ==''){
				formObj.shpr_trdp_cd.value ='';
			}
		}
	}else{
		formObj.shpr_trdp_cd.value=formObj.act_shpr_trdp_cd.value;
		formObj.shpr_trdp_nm.value=engNm;
		formObj.shpr_trdp_addr.value=blAddr;
	}
	creditRoleCheck();
}

function creditRoleCheck(){
	var formObj=document.frm1;
	var s_type = "trdpCode";
	var s_code = formObj.act_shpr_trdp_cd.value;
	
	ajaxSendPost(actShprTrdpReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
	
	//#2737 [BNX] C/BROKER TO CHECK PAYMENT STATUS
	s_code = formObj.cust_trdp_cd.value;
	ajaxSendPost(cBrokerTrdpReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
}

function actShprTrdpReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){		
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
			try {creditOver=false;}catch(e){};
			
			if(masterVals[5] == 'KO'){
				
			} else if(masterVals[5] == 'CH'){
				try {creditOver=true;}catch(e){};
				formObj.act_shpr_trdp_cd.style.color= "#ff0000";
				formObj.act_shpr_trdp_cd.style.color= "#ff0000";
				
			} else if(masterVals[5] == 'CR'){
				var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
				var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
				var balLmtAmt=crdLmtAmt - curLmtAmt;
				var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
				var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
				
				//[20141217 YJW] #46708
				if(crdLmtAmt > 0) {
					if(overDueAmt > 0 && balLmtAmt < 0  ){
						try {creditOver=true;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";
							
					} else if (balLmtAmt < 0  ){
						try {creditOver=true;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";

					} else if (overDueAmt > 0 ) {
						try {creditOver=false;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";
					} else {
						try {creditOver=false;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#000000";
						formObj.act_shpr_trdp_nm.style.color= "#000000";
					}
				} else {
					try {creditOver=false;}catch(e){};
					formObj.act_shpr_trdp_cd.style.color= "#000000";
					formObj.act_shpr_trdp_nm.style.color= "#000000";
				}
			} else {
				try {creditOver=false;}catch(e){};
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					formObj.act_shpr_trdp_cd.style.color= "#ff0000";
					formObj.act_shpr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.act_shpr_trdp_cd.style.color= "#000000";
					formObj.act_shpr_trdp_nm.style.color= "#000000";
				}
			}
		}
	}
}

//#2737 [BNX] C/BROKER TO CHECK PAYMENT STATUS
function cBrokerTrdpReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){		
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
			try {creditOver=false;}catch(e){};
			
			if(masterVals[5] == 'KO'){

			} else if(masterVals[5] == 'CH'){
				try {creditOver=true;}catch(e){};
				formObj.cust_trdp_cd.style.color= "#ff0000";
				formObj.cust_trdp_nm.style.color= "#ff0000";
				
			} else if(masterVals[5] == 'CR'){
				var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
				var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
				var balLmtAmt=crdLmtAmt - curLmtAmt;
				var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
				var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
				
				//[20141217 YJW] #46708
				if(crdLmtAmt > 0) {
					if(overDueAmt > 0 && balLmtAmt < 0  ){
						try {creditOver=true;}catch(e){};
						formObj.cust_trdp_cd.style.color= "#ff0000";
						formObj.cust_trdp_nm.style.color= "#ff0000";
							
					} else if (balLmtAmt < 0  ){
						try {creditOver=true;}catch(e){};
						formObj.cust_trdp_cd.style.color= "#ff0000";
						formObj.cust_trdp_nm.style.color= "#ff0000";

					} else if (overDueAmt > 0 ) {
						try {creditOver=false;}catch(e){};
						formObj.cust_trdp_cd.style.color= "#ff0000";
						formObj.cust_trdp_nm.style.color= "#ff0000";
					} else {
						try {creditOver=false;}catch(e){};
						formObj.cust_trdp_cd.style.color= "#000000";
						formObj.cust_trdp_nm.style.color= "#000000";
					}
				} else {
					try {creditOver=false;}catch(e){};
					formObj.cust_trdp_cd.style.color= "#000000";
					formObj.cust_trdp_nm.style.color= "#000000";
				}
			} else {
				try {creditOver=false;}catch(e){};
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					formObj.cust_trdp_cd.style.color= "#ff0000";
					formObj.cust_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.cust_trdp_cd.style.color= "#000000";
					formObj.cust_trdp_nm.style.color= "#000000";
				}
			}
		}
	}
}

function setCargoPuckup(){
	//52126 [Zen] OEH BL Entry Cargo Pick Up 수정
    var opt_key_sec = "OEH_CARGO_PICKUP_SYNC";
    ajaxSendPost(setOehCargoPickupSync, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
    
}
//52126 [Zen] OEH BL Entry Cargo Pick Up 수정
//S 인 경우 Shipper 정보로 Sync, N 인 경우 Sync 하지 않음
function setOehCargoPickupSync(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	var oehCargoPickup = "S";
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
	    if(doc[1] == "N"){
	    	oehCargoPickup = "N";
		}else{
		}
	}else{
	} 
	 
	if (oehCargoPickup == "S"){
		var formObj=document.frm1;
		//2011.10.28 Kim,Jin-Hyuk
		//해상 수출 HBL Shipper 입력하면 A/Shipper도 같이 입력해준다. 수정은 가능 
		if(trim(formObj.cgo_pu_trdp_cd.value)=="" 
			  && trim(formObj.cgo_pu_trdp_nm.value)=="" 
			  && trim(formObj.cgo_pu_trdp_addr.value)==""){
			
			formObj.cgo_pu_trdp_cd.value=formObj.shpr_trdp_cd.value;
			formObj.cgo_pu_trdp_nm.value=formObj.shpr_trdp_nm.value;
			formObj.cgo_pu_trdp_addr.value=formObj.shpr_trdp_addr.value;
			
			var s_type = "trdpCode";
			var s_code = formObj.cgo_pu_trdp_cd.value;
			
			ajaxSendPost(cgoPuTrdpReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
		}
	}
}

function cgoPuTrdpReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){		
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
			if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
				formObj.cgo_pu_trdp_cd.style.color= "#ff0000";
				formObj.cgo_pu_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.cgo_pu_trdp_cd.style.color= "#000000";
				formObj.cgo_pu_trdp_nm.style.color= "#000000";
			}
		}
	}
}

function setLiner(){
	var formObj=document.frm1;
	//2011.10.28 Kim,Jin-Hyuk
	//해상 수출 HBL Shipper 입력하면 A/Shipper도 같이 입력해준다. 수정은 가능
	formObj.carr_trdp_cd1.value=formObj.lnr_trdp_cd.value;
	formObj.carr_trdp_nm1.value=formObj.lnr_trdp_nm.value; 

	if(typeof(formObj.doc_form) != 'undefined'){
		
		// #52613 Doc Form : Shipping Company 이름으로 지정 후 변경 가능 하도록
		formObj.doc_form.value=formObj.lnr_trdp_nm.value;
	}
}

function setLiner2(){
	// #52613 Doc Form : Shipping Company 이름으로 지정 후 변경 가능 하도록
	var formObj=document.frm1; 
	if (formObj.intg_bl_seq.value == "" && typeof(formObj.doc_form) != 'undefined' ){	
		formObj.doc_form.value=formObj.lnr_trdp_nm.value;
	}
}
function svcTermChange(){
	var formObj=document.frm1;
	formObj.to_svc_term_cd.value=formObj.fm_svc_term_cd.value;
}
/*
 * on board date, vsl name
 * clean on board 내용을 만들어 준다.
 */
function cobChange(){
	var formObj=document.frm1;
	formObj.clean_on_board.value=sea_cob;
	formObj.clean_on_board.value += "\r\n";
	
	if(formObj.obrd_dt_tm.value != ""){
		formObj.clean_on_board.value += mkCharDateFormat(formObj.obrd_dt_tm.value);
		formObj.clean_on_board.value += "\r\n";
	}
	//formObj.clean_on_board.value += mkCharDateFormat(formObj.obrd_dt_tm.value);
	//formObj.clean_on_board.value += "\r\n";		[20130412 OJG]
	formObj.clean_on_board.value += "\r\n";		
	//formObj.clean_on_board.value += "___________________";
	formObj.clean_on_board.value += "-------------------";
	if(vsl_show_flg=="Y"){
		formObj.clean_on_board.value += "\r\n";
		formObj.clean_on_board.value += formObj.trnk_vsl_nm.value + " " + formObj.trnk_voy.value;
	}
	if(load_port_show_flg=="Y"){
		formObj.clean_on_board.value += "\r\n";
		formObj.clean_on_board.value += formObj.pol_nm.value;
	}
	formObj.obrd_dt_tm1.value=formObj.obrd_dt_tm.value; 
	//ETD에도 on board date를 반영한다.
	//formObj.etd_dt_tm.value = formObj.obrd_dt_tm.value;
	//mkDateFormatType(formObj.etd_dt_tm, event, true, 1);
}
/* #21016 ETD of POL 이 변경되면 Onboard date도 자동변경  jsjang 2013.9.26 */ 
function chgOnboard(obj)
{
	var formObj=document.frm1;
	formObj.obrd_dt_tm.value=formObj.etd_dt_tm.value;
	cobChange();
}
//화면의 checkbox를 database 값으로 셋팅한다.
function checkBoxSetting(){
	var formObj=document.frm1;
	if(formObj.sub_mbl_flg.value=="Y"){
		formObj.sub_mbl_flg.checked=true;
	}else{
		formObj.sub_mbl_flg.checked=false;
	}
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
	//#30 #52843 - [IMPEX] 독일 지점 OPUS 기능 추가 관련의 건
	if(formObj.surrend.value=="Y"){
		formObj.surrend.checked=true;
	}else{
		formObj.surrend.checked=false;
	}
	//#657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL (S) - 2017.07.03 cyheo
	if(formObj.inter_use_flag.value=="Y"){
		formObj.inter_use_flag.checked=true;
	}else{
		formObj.inter_use_flag.checked=false;
	}
	//#657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL (E)
}

function setSizeUtCd(obj){
	var formObj=document.frm1;
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj=docObjects[1];
	if(obj=="CM"){
		formObj.size_ut_cd[0].checked=true;
		formObj.size_ut_cd[1].checked=false;
		//sheetObj.InitHeadRow(0, '|Del|Length|Width|Height|PCS|CBM', false);
//no support[implemented common]CLT 		sheetObj.InitHeadRow(0, getLabel('SEE_BMD_0020_HDR_C'), false);
	}else if(obj=="INCH"){
		formObj.size_ut_cd[0].checked=false;
		formObj.size_ut_cd[1].checked=true;
//		sheetObj.InitHeadRow(0, '|Del|Length|Width|Height|PCS|CBM', false);
//no support[implemented common]CLT 		sheetObj.InitHeadRow(0, getLabel('SEE_BMD_0020_HDR_C'), false);
	}else{
		formObj.size_ut_cd[0].checked=false;
		formObj.size_ut_cd[1].checked=false;
	}
}
function chkSizeType(){
	var formObj=document.frm1;
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj=docObjects[1];
	//LHK 20130812 CM에서 INCH SWITCH 할 경우 CMB Auto Calculation 적용
	var length=0;
	var width=0;
	var height=0;
	var pcs=0;
	var cbm=0;
	var kg		= 0;
	var sumCbm=0;
	var sumPcs=0;
	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
		length=sheetObj.GetCellValue(i, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_len_dim");
		width=sheetObj.GetCellValue(i, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_wdt_dim");
		height=sheetObj.GetCellValue(i, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_hgt_dim");
		pcs=sheetObj.GetCellValue(i, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(i, "dim_pce_qty");
		
		// #4666 [IMPEX] OEH Chargeable Weight from Dimension Input - Nhan.Le
		if (formObj.size_ut_cd[0].checked) {
			kg=roundXL(length * width * height * pcs / 6000, 3);
			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 6);
			sheetObj.SetCellValue(i, "dim_wgt_k",kg.toFixed(3),0);
			sheetObj.SetCellValue(i, "dim_wgt_l",(kg * CNVT_CNST_KG_LB).toFixed(2),0);
		} else if (formObj.size_ut_cd[1].checked) {
			kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, 3);
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 6);
			sheetObj.SetCellValue(i, "dim_wgt_k",kg.toFixed(3),0);
			sheetObj.SetCellValue(i, "dim_wgt_l",(kg * CNVT_CNST_KG_LB).toFixed(2),0);
		}
		sheetObj.SetCellValue(i, "dim_act_dim",cbm.toFixed(3),0);
	}
	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
		sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_act_dim"));
		sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
	}
	formObj.meas.value=sumCbm.toFixed(obl_decimal_len);
	//#3220 [CLT] WH Pickup, B/L Dimension 항목 로직 오류
//	formObj.pck_qty.value=sumPcs.toFixed(0);
	cbmChange(formObj.meas);
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
//화면로드시 데이터 표시
function loadData(){
	if(frm1.bl_sts_cd.value!='NA'){
		
		//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
		loadDataProcess ="loadDataWait"; //반드시 마지막 호출 그리드 _OnSearchEnd 이벤트에서 초기화 한다 loadDataProcess = "";
		
		//DIM 조회
		searchGrid(12);
		searchGrid(1);
		
		/* 속도개선 주석처리  
		//Doccument File List 조회
		//searchGrid(2);     
		//Container목록 기본조회
		//searchGrid(4);
		//Freight될 Container 조회
		//searchGrid(6);
		*/
	}else{
		fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
		if (docObjects[1].GetEditable() == 0) {
			docObjects[1].SetEditable(1);
		}
		//searhCopyFrt();

		//BL_COPY
		var orgBlSeq = frm1.copy_bl_seq.value;
		if (orgBlSeq != "") { 
			
			//#402 [BNX] BL COPY & SALES TYPE, SALEMAN DETERMINE LOGIC
			var chk_trdp_cd = "";
			var chk_partner_yn = "";
			var chk_cur_bizTp = "H";

			if(frm1.nomi_flg.value == "Y"){				
				chk_trdp_cd = frm1.prnr_trdp_cd.value;
				chk_partner_yn = "Y"
			}else{
				chk_trdp_cd = frm1.act_shpr_trdp_cd.value;
				chk_partner_yn = "N"
			}

			selectCopyBLFrt();

//			#141 #49037 - [IMPEX] OIH COPY후 OIM FILING# 입력 후 | {CO} MB/L and HB/L, MAWB and HAWB items copy rule opti
//			setSalesMan(chk_trdp_cd,chk_partner_yn,chk_cur_bizTp); // Copy original B/L's Sales PIC(user id & name) when <Copy> function called
			
		}
		
		//BKG_CREATE #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발
		if (frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value !="") {
			bkgCreat = true;
			//#1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발
			//bindBkgCntrData();
			//checkRefNo(frm1.ref_no.value);
			if(frm1.ref_no.value == ""){    //Filing No 가 없으면  Customer Booking Entry Container 조회
				bindBkgCntrCopyData();
			}
			//bindBkgFrtData();
			bindBkgFrtDataBkg();
		}
	}
	
	if(frm1.intg_bl_seq.value!=""){
		//currency를 database에 있는 값으로 셋팅함
		frm1.agent_curr_cd.value=frm1.h_agent_curr_cd.value;
		frm1.cust_curr_cd.value=frm1.h_cust_curr_cd.value;
		frm1.frt_term_a_cd.value=frm1.h_frt_term_a_cd.value;
		frm1.frt_term_c_cd.value=frm1.h_frt_term_c_cd.value;
		frm1.fm_svc_term_cd.value=frm1.h_fm_svc_term_cd.value;
		frm1.to_svc_term_cd.value=frm1.h_to_svc_term_cd.value;
		frm1.wgt_disp_cd.value=frm1.h_wgt_disp_cd.value;
		//attach rider 체크
		rowCount(frm1, 15, frm1.rider_lbl);
		//sizeUtCd 셋팅
		setSizeUtCd(frm1.size_ut_cd1.value);
		
		frm1.clean_on_board.value=frm1.h_clean_on_board.value;
		
//		frm1.bl_no.className = 'search_form-disable';
//		frm1.bl_no.readOnly  = true;
		
		//#2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.bl_no.value);
	}
	
	//#1423 Customer Booking 에서 링크될때, Asginee로 Issued by 지정.
	if(frm1.f_cmd_chk.value==135 && frm1.bkg_seq.value != "") {
		if( frm1.asgn_usrid.value != ""){
			frm1.opr_usrid.value = frm1.asgn_usrid.value;		
		}
		//#5289 - [Binex] Errors when retrieving Customer Booking on OEH BL Entry (Duc Nguyen)
		frm1.frt_term_c_cd.value=frm1.h_frt_term_c_cd.value;
		descFreight();	
	}
	
	/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start */        
	 cntr_ship_init();
	/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건  End */	
	
	 /* #1804 [Split - 1] [PATENT] Payment Verification - 기능보완(verify_flag = "Y" readonly) */		
	if( frm1.verify_flag.value == "Y" ){	
		$("select[name=obl_tp_cd]").attr("disabled",true);
	} else {
		$("select[name=obl_tp_cd]").attr("disabled",false);
	} 
	 
	//#41634 - [DMS] Default Cursor Position Change
	frm1.bl_no.focus();
}
function checkRefNo(obj){
	if(frm1.ref_no.value!="" &&  $('#chkDgt').val() == 'F'){
		ajaxSendPost(getRefNoInfo, 'reqVal', '&goWhere=aj&bcKey=getRefNoInfo&air_sea_clss_cd=S&bnd_clss_cd=O&ref_no='+frm1.ref_no.value, './GateServlet.gsl');
	}else{
		frm1.ref_no.value="";
		frm1.ref_ofc_cd.value="";
		$('#chkDgt').val('F');
	}
}

function getRefNoInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	$('#chkDgt').val('F');
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			var opt_key_sec = "HBL_DOCNO_SYNC";
		    ajaxSendPost(setHblDocnoSyncReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
		    
		    var opt_key_sec = "BL_PARTNER_ASSIGNMENT";
		    ajaxSendPost(setBlPartnerAssignReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
		    
			var result=doc[1].split('^^');
			//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
			var cfmFlg=true;
			
			if(frm1.prnr_trdp_cd.value != ""){
				//아래 validation 주석 처리. 
				//Customer Bkg--> OEH 만들 때, Customer Bkg의 partner 정보를 가져오는것이 맞은. 따라서 아래 부분 cfmFlg=false 지정 
				//cfmFlg=confirm(getLabel('SEA_COM_ALT030'));
				cfmFlg = false;
			}
			
			frm1.ref_ofc_cd.value=result[1];
			//#3604 [JTC]OEH B/L Type 별 Original B/L 수 세팅 문제
			frm1.iss_loc_nm1.value=result[136];
			frm1.rlt_intg_bl_seq.value=result[2];
			frm1.mbl_no.value=result[3]; //master bl no
			frm1.trnk_vsl_nm.value=result[4]; //trnk_vsl_nm
			frm1.trnk_voy.value=result[5]; //trnk_voy
			frm1.lnr_trdp_cd.value=result[6]; //lnr_trdp_cd
			frm1.lnr_trdp_nm.value=result[7]; //lnr_trdp_nm
			frm1.carr_trdp_cd1.value=result[6]; //Mark&Desc Tab Carrier
			frm1.carr_trdp_nm1.value=result[7]; //Mark&Desc Tab Carrier


			//#3700 [JAPT]OEM-OEH SYNC 로직 수정 (S)
			//POR, DEL, Final Destination 복사 허용 여부 판단
			if(OEH_OEM_SYNC_ROUTE_YN == 'Y') {
				
				//#3811 [JAPT] POR,DEL,F.DEST & Sales PIC sync.		
				if(frm1.pod_cd.value ==""){
					frm1.pod_cd.value=result[8]; //pod_cd
					frm1.pod_nm.value=result[9]; //pod_nm
				}
				if(frm1.pol_cd.value ==""){
					frm1.pol_cd.value=result[10]; //pol_cd
					frm1.pol_nm.value=result[11]; //pol_nm				
				}
				
				if(frm1.por_cd.value ==""){
					frm1.por_cd.value = result[18]; //por_cd
					frm1.por_nm.value = result[19]; //por_nm
				}
				if(frm1.del_cd.value ==""){
					frm1.del_cd.value=result[20]; //del_cd
					frm1.del_nm.value=result[21]; //del_nm
				}
				
			}else{
				frm1.pod_cd.value=result[8]; //pod_cd
				frm1.pod_nm.value=result[9]; //pod_nm
				frm1.pol_cd.value=result[10]; //pol_cd
				frm1.pol_nm.value=result[11]; //pol_nm			
				
				frm1.por_cd.value=result[18]; //por_cd
				frm1.por_nm.value=result[19]; //por_nm
				frm1.del_cd.value=result[20]; //del_cd
				frm1.del_nm.value=result[21]; //del_nm					
			}
			//#3700 [JAPT]OEM-OEH SYNC 로직 수정 (E)			
			
			
//			frm1.iss_loc_nm1.value=result[11]; //pol_nm
//			frm1.obrd_dt_tm.value=modiStrDateType(result[12], 1); //obrd_dt_tm
			frm1.etd_dt_tm.value=modiStrDateType(result[12], 1); //etd_dt_tm
			frm1.obrd_dt_tm.value=modiStrDateType(result[12], 1); //etd_dt_tm
			frm1.post_dt.value=modiStrDateType(result[51], 1); //etd_dt_tm
			frm1.eta_dt_tm.value=modiStrDateType(result[13], 1); //eta_dt_tm
			frm1.lnr_bkg_no.value=result[17]; //lnr_bkg_no
			//---------[20130405 OJG]---------------------
			//frm1.doc_recpt_no.value = frm1.lnr_bkg_no.value;	
			//---------[20130405 OJG]---------------------
			//---------[#20912 20130917 JJS]---------------------
			
			// #51924 [ZEN] OEH BL ENTRY에서 DOCUMENT NO. 로직
			if(HBL_DOCNO_SYNC == "M"){
				frm1.doc_recpt_no.value=frm1.mbl_no.value.toUpperCase();	
			}else{
				frm1.doc_recpt_no.value=frm1.ref_no.value.toUpperCase();	
			}
			
			frm1.prnr_ref_no.value=	result[135];

			//#3608 [JTC]OEH Entry  DOC Cut-Off Date
			frm1.hbl_cut_off_dt.value=	result[137];
			frm1.hbl_cut_off_tm.value=	result[138];
			
			// #4781 [Binex LA] After searching Filing No., Mark&desc didnt show the info
			vsl_show_flg = result[143];
			load_port_show_flg = result[144];
			
			
			//---------[#20912 20130917 JJS]---------------------
			//#25506 OEM POR 정보 OEH copy 방지 18,19주석처리
			//frm1.por_cd.value 			= result[18]; //por_cd
			//frm1.por_nm.value 			= result[19]; //por_nm
			var shpMode = result[22]; //shp_mod_cd
			frm1.shp_mod_cd.value = shpMode;
//			if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="JP"){
				//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
				if(cfmFlg){
					frm1.prnr_trdp_cd.value=result[23]; //prnr_trdp_cd
					frm1.prnr_trdp_nm.value=result[24]; //prnr_trdp_nm
					frm1.prnr_trdp_addr.value=result[37]; //
				}
//			}
			// #141 #49037 - Triangle Agent Ajax, Popup 동기화 안되어 있는 부분 수정
//			frm1.prnr_trdp_cd2.value=result[25]; //prnr_trdp_cd2
//			frm1.prnr_trdp_nm2.value=result[26]; //prnr_trdp_nm2
//			frm1.prnr_trdp_addr2.value=result[38]; //
			frm1.fm_svc_term_cd.value=result[32]; //fm_svc_term_cd
			frm1.to_svc_term_cd.value=result[33]; //to_svc_term_cd
			frm1.mrn_no.value=result[57]; //mrn_no
			
			/* #1757-[CLC] Freight Term Interface Logic - OEH B/L Entry */
			if( result[74] != "" && shpMode != "FAK"){
				frm1.frt_term_a_cd.value=result[74]; //frt_term_cd
			}
			
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start */  
			if(result[56] != null && result[56] != '' && (result[56] == 'DR' || result[56] == 'FW' || result[56] == 'DT' ) )
			{
				frm1.hbl_tp_cd.value=result[56]; //hbl_tp_cd
				frm1.ntfy_trdp_cd.value=result[58]; //ntfy_trdp_cd
				frm1.ntfy_trdp_nm.value=result[59]; //ntfy_trdp_nm
				frm1.ntfy_trdp_addr.value=result[60]; //ntfy_trdp_addr

				//#3700 [JAPT]OEM-OEH SYNC 로직 수정 (S)
				//POR, DEL, Final Destination 복사 허용 여부 판단
				if(OEH_OEM_SYNC_ROUTE_YN == 'Y') {
					//#3811 [JAPT] POR,DEL,F.DEST & Sales PIC sync.		
					if(frm1.fnl_dest_loc_cd.value ==""){
						frm1.fnl_dest_loc_cd.value=result[61]; //fnl_dest_loc_cd
						frm1.fnl_dest_loc_nm.value=result[62]; //fnl_dest_loc_nm
					}	
				}else{
					frm1.fnl_dest_loc_cd.value=result[61]; //fnl_dest_loc_cd
					frm1.fnl_dest_loc_nm.value=result[62]; //fnl_dest_loc_nm				
				}
				
				//#3700 [JAPT]OEM-OEH SYNC 로직 수정 (E)
				
				// #1264 - [Split - 1] [CLC] LCL HB/L 에 Filing No 변경 시  Measurement/Package정보 유지
				if(!(frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value != "")){
					frm1.pck_qty.value=result[64]; //pck_qty
					frm1.pck_ut_cd.value=result[65]; //pck_ut_cd
				}
				
				frm1.bl_iss_dt.value=result[70]; //bl_iss_dt
				frm1.shpr_trdp_cd.value=result[34]; //shpr_trdp_cd
				frm1.shpr_trdp_nm.value=result[35]; //shpr_trdp_nm
				frm1.shpr_trdp_addr.value=result[36]; //shpr_trdp_addr
				frm1.cnee_trdp_cd.value=result[23]; //cnee_trdp_cd
				frm1.cnee_trdp_nm.value=result[24]; //cnee_trdp_nm
				frm1.cnee_trdp_addr.value=result[37]; //cnee_trdp_addr
				
//				#1101 [Oceanland, Impex] V440 OE MBL Logic 변경 – Mark and Description
				if(frm1.mk_txt.value == "") {
					frm1.mk_txt.value=result[110]; //mark
				}
				if(frm1.desc_txt.value == "") {
					frm1.desc_txt.value=result[111]; //desc
				}
				frm1.rmk.value=result[121]; //rmk
				
				//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
				if(cfmFlg){
					frm1.prnr_trdp_cd.value=result[71]; //prnr_trdp_cd
					frm1.prnr_trdp_nm.value=result[72]; //prnr_trdp_nm
					frm1.prnr_trdp_addr.value=result[73]; //prnr_trdp_addr	
				}
				
				if(result[77]=="Y"){
					frm1.rlsd_flg.checked=true;
				}else{
					frm1.rlsd_flg.checked=false;
				}
				frm1.rlsd_dt_tm.value=result[78];//released date, bl.
			}
			//#141 #49037 - [IMPEX] OIH COPY후 OIM FILING# 입력 후 | {CO} MB/L and HB/L, MAWB and HAWB items copy rule opti
			frm1.agent_curr_cd.value = result[92]; //currency
			frm1.cust_curr_cd.value = result[92]; //currency
			
			frm1.ctrb_ofc_cd.value = result[108]; //contrib_ofc
			frm1.ctrb_dept_cd.value = result[106]; //contrib_dept
			frm1.ctrb_mgn.value = result[107]; //contrib_mgn
			(result[109] == "Y") ? frm1.ctrb_ratio_yn.checked = true : frm1.ctrb_ratio_yn.checked = false; //contrib_use
			
			frm1.profit_share.value=result[63]; //profit_share
			frm1.etd_por_tm.value = result[94]; //etd_of_por
			


			frm1.mrn_no.value=result[57]; //mrn_no
			
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */  
			/* jsjang 2013.8.5 요구사항 #19207 Booking Confirmation - Container Summary */	
			/* LHK 20130822 요구사항 #19016 # 18794 #18785 #18784 # 18783 OEH Booking Confirmation BKG Qyt 추가 */
			frm1.cntr_info.value=result[93]; //cntr_info
			/* #20553 : ETD of Place of Receipt 추가, jsjang 2013.9.30 */
			// #26727 LHK, 20140403, 자동연계 안되도록 요청
			//frm1.etd_por_tm.value		= result[94]; //etd_por_tm
			
			/*#991 - [SHINE] MB/L -> HB/L 데이터 연계 로직 추가 2017.01.19
			1) OEH B/L 의 Partner 필드 
			 B/L Type이 Direct , Direct Triangle 인 경우 OEM B/L.Destination Agent_Code를 Partner로 지정
			 B/L Type이 이외의 경우 OEM B/L.Consignee_Code를 Partner로 지정 

			2) OEH B/L 의 Forwarding Agent 필드 
			 B/L Type이 Direct , Direct Triangle 인 경우 OEM B/L.Forwarding Agent_Code를 Forwarding Agent로 지정
			 B/L Type이 이외의 경우 OEM B/L.Shipper_Code를 Forwarding Agent로 지정 

			3) OEH B/L 의 Triangle Agent 필드 
			 B/L Type이 Direct , Direct Triangle 인 경우  OEM.Triangle Agent_Code를 Triangle Agent로 지정*/
			
			if(BL_PARTNER_ASSIGNMENT == "Y"){
				//hbl 에서 mbl 만드는 경우는 제외. hblToMbl이 참이면 hbl -> mbl 만드는 경우. mbl--> hbl인 경우 hblToMbl = false
				if(result[56] != null && result[56] != '' && (result[56] == 'DR' || result[56] == 'FW' || result[56] == 'DT' )&& !hblToMbl){
					if(cfmFlg){
						frm1.prnr_trdp_cd.value=result[71]; //prnr_trdp_cd
						frm1.prnr_trdp_nm.value=result[72]; //prnr_trdp_nm
						frm1.prnr_trdp_addr.value=result[73]; //prnr_trdp_addr	
					}
					
					frm1.agent_trdp_cd.value=result[118]; //agent_trdp_cd
					frm1.agent_trdp_nm.value=result[119]; //agent_trdp_nm
					frm1.agent_trdp_addr.value=result[120]; //agent_trdp_addr	
					
					frm1.prnr_trdp_cd2.value=result[25]; //prnr_trdp_cd2
					frm1.prnr_trdp_nm2.value=result[26]; //prnr_trdp_nm2
					frm1.prnr_trdp_addr2.value=result[38]; //prnr_trdp_addr2	
					
				} else {
					if(cfmFlg){
						frm1.prnr_trdp_cd.value=result[23]; //cnee_trdp_cd
						frm1.prnr_trdp_nm.value=result[24]; //cnee_trdp_nm
						frm1.prnr_trdp_addr.value=result[37]; //cnee_trdp_addr
					}
					
					frm1.agent_trdp_cd.value=result[34]; //shpr_trdp_cd
					frm1.agent_trdp_nm.value=result[35]; //shpr_trdp_nm
					frm1.agent_trdp_addr.value=result[36]; //shpr_trdp_addr
				}
			}
			//hbl 에서 mbl 만드는 경우는 제외. hblToMbl이 참이면 hbl -> mbl 만드는 경우. mbl--> hbl인 경우 hblToMbl = false			
			if(result[56] != null && result[56] != '' && (result[56] == 'DR' || result[56] == 'FW' || result[56] == 'DT' ) && !hblToMbl){
				frm1.act_shpr_trdp_cd.value = result[124];   
				frm1.act_shpr_trdp_nm.value = result[125];  
				frm1.act_shp_info.value = result[126];  	
				frm1.nomi_flg.value = result[127];  
				frm1.rep_cmdt_cd.value =result[82];
				frm1.rep_cmdt_nm.value =result[83];
				
				// #4297 [CLA] Direct B/L not assigning Customer field on House Entry
				if(frm1.act_shpr_trdp_cd.value == ""){
		    		setActShipper();
		        }
				
				changeSalesType();
			}
			
			cobChange();
			shipModeChange();
			//26239 cntr sheet를 초기화한다.
			
			getRefCntrList();

			//getMasterCntrList();//[20130822 OJG]
			
			// #571 - [BINEX Visibility Task]PO, BKG, MBL 입력 간소화
			getRefItemList();
			
			// #1264 - [Split - 1] [CLC] LCL HB/L 에 Filing No 변경 시  Measurement/Package정보 유지
			if(!(frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value != "")){
				//42688 PWC(Packge,Weight,CBM) Change
				changePWC(result);
			}
			//#6792 [AIR POWER] SETTNG UP PACKAGE DEFAULT FOR OCEAN ENTRY SCREEN
			if(!hblToMbl) {
				//#22 #52882 - [CBM] MBL PACKAGE UNIT INFO TO COPY TO HOUSE
				if(result[22] == "FCL" || (result[56] == 'DR' || result[56] == 'FW' || result[56] == 'DT' )){
					
					// #1264 - [Split - 1] [CLC] LCL HB/L 에 Filing No 변경 시  Measurement/Package정보 유지
					if(!(frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value != "")){
						//#2667 [PATENT] Bugs were reported when doing internal testing for Partial B/L (Synchronization)
//						if(!cntrFlg){
							frm1.pck_qty.value=result[64];
							// #4302 [IMPEX] SHIPMENT & ITEM AFTER BL COPY NOT SHOWING
							frm1.pck_ut_cd.value= result[65];
							frm1.mk_grs_wgt.value=doMoneyFmt(Number(result[66]).toFixed(obl_decimal_len));
							frm1.mk_grs_wgt1.value=doMoneyFmt(Number(result[67]).toFixed(obl_decimal_len));
							frm1.mk_meas.value=doMoneyFmt(Number(result[68]).toFixed(obl_decimal_len));
							frm1.mk_meas1.value=doMoneyFmt(Number(result[69]).toFixed(obl_decimal_len));
							
							frm1.grs_wgt.value=doMoneyFmt(Number(result[66]).toFixed(obl_decimal_len)); //grs_wgt
							frm1.grs_wgt1.value=doMoneyFmt(Number(result[67]).toFixed(obl_decimal_len)); //grs_wgt1
							frm1.meas.value=doMoneyFmt(Number(result[68]).toFixed(obl_decimal_len)); //meas
							frm1.meas1.value=doMoneyFmt(Number(result[69]).toFixed(obl_decimal_len)); //meas1
							
							//#1855 [BINEX] OEH Container 정보 입력시, B/L Displayed Weight 오류
		//					frm1.mk_grs_wgt.value=result[66]; //grs_wgt
//							frm1.mk_grs_wgt.value=doMoneyFmt(Number(result[66]).toFixed(obl_decimal_len));
		//					frm1.mk_grs_wgt1.value=result[67]; //grs_wgt1
//							frm1.mk_grs_wgt1.value=doMoneyFmt(Number(result[67]).toFixed(obl_decimal_len));
		//					frm1.mk_meas.value=result[68]; //meas
//							frm1.mk_meas.value=doMoneyFmt(Number(result[68]).toFixed(obl_decimal_len));
		//					frm1.mk_meas1.value=result[69]; //meas1
//							frm1.mk_meas1.value=doMoneyFmt(Number(result[69]).toFixed(obl_decimal_len));
//						}
					}
					
//					#1101 [Oceanland, Impex] V440 OE MBL Logic 변경 – Mark and Description
					// frm1.mk_txt.value=result[110]; //mark
					// frm1.desc_txt.value=result[111]; //desc
		
					if(frm1.mk_txt.value == "") {
						frm1.mk_txt.value=result[110]; //mark
					}
					if(frm1.desc_txt.value == "") {
						frm1.desc_txt.value=result[111]; //desc
					}				
				}else{
					// #1264 - [Split - 1] [CLC] LCL HB/L 에 Filing No 변경 시  Measurement/Package정보 유지
					if(!(frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value != "")){
						frm1.pck_qty.value=0;
						// #4302 [IMPEX] SHIPMENT & ITEM AFTER BL COPY NOT SHOWING
						frm1.pck_ut_cd.value=result[65];
						frm1.grs_wgt.value="0"; //grs_wgt
						frm1.grs_wgt1.value="0"; //grs_wgt1
						frm1.meas.value="0"; //meas
						frm1.meas1.value="0"; //meas1
					}
				}
			}
			
			hblToMbl = false;
			
			//#304
			//[Starcluster] CARGO MANIFEST에서의 House Weight, CBM 자동 계산 로직
			frm1.m_shp_mod_cd.value = result[22];
			frm1.m_pck_ut_cd.value = result[65];
			frm1.m_pck_qty.value = result[64];
			frm1.m_mk_grs_wgt1.value = result[67];
			frm1.m_grs_wgt.value = result[66];
			frm1.m_meas.value = result[68];
			frm1.m_mk_meas1.value = result[69];
				
			// 프로그램 수정요청 - RE: Testing Summary for Patent_02May			
			frm1.pre_vsl_cd.value = result[128];
			frm1.pre_vsl_nm.value = result[129];
			frm1.pre_voy.value = result[130];
			frm1.ts1_port_cd.value = result[131];
			frm1.ts1_port_nm.value = result[132];
			frm1.ts1_etd_dt_tm.value = result[133];
			frm1.ts1_eta_dt_tm.value = result[134];
			
		}else{
			frm1.ref_no.value='';
			frm1.prnr_ref_no.value=	'';
			frm1.ref_ofc_cd.value='';
			frm1.rlt_intg_bl_seq.value='';
			frm1.mbl_no.value='';
			frm1.trnk_vsl_nm.value='';
			frm1.trnk_voy.value='';
			frm1.lnr_trdp_cd.value='';
			frm1.lnr_trdp_nm.value='';
			frm1.pod_cd.value='';
			frm1.pod_nm.value='';
			frm1.pol_cd.value='';
			frm1.pol_nm.value='';
			frm1.iss_loc_nm1.value='';
			frm1.obrd_dt_tm.value='';
			frm1.etd_dt_tm.value='';
			frm1.eta_dt_tm.value='';
			frm1.lnr_bkg_no.value='';
			//---------[20130405 OJG]---------------------
			frm1.doc_recpt_no.value='';
			//---------[20130405 OJG]---------------------
			frm1.por_cd.value='';
			frm1.por_nm.value='';
			frm1.del_cd.value='';
			frm1.del_nm.value='';
			frm1.shp_mod_cd.value='FCL';
			frm1.prnr_trdp_cd.value='';
			frm1.prnr_trdp_nm.value='';
			frm1.prnr_trdp_addr.value='';
			frm1.prnr_trdp_cd2.value='';
			frm1.prnr_trdp_nm2.value='';
			frm1.prnr_trdp_addr2.value='';
			frm1.fm_svc_term_cd.value='';
			frm1.to_svc_term_cd.value='';
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start */ 
			frm1.hbl_tp_cd.value='';
			frm1.mrn_no.value='';
			frm1.ntfy_trdp_cd.value='';
			frm1.ntfy_trdp_nm.value='';
			frm1.ntfy_trdp_addr.value='';
			frm1.fnl_dest_loc_cd.value='';
			frm1.fnl_dest_loc_nm.value='';
			frm1.profit_share.value='';
			
			// #1264 - [Split - 1] [CLC] LCL HB/L 에 Filing No 변경 시  Measurement/Package정보 유지
			if(!(frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value != "")){
				frm1.pck_qty.value='';
				frm1.pck_ut_cd.value='';
				frm1.grs_wgt.value='';
				frm1.grs_wgt1.value='';
				frm1.meas.value='';
				frm1.meas1.value='';
			}
			
			frm1.bl_iss_dt.value='';	
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */ 
			/* jsjang 2013.8.5 요구사항 #19207 Booking Confirmation - Container Summary */	
			/* LHK 20130822 요구사항 #19016 # 18794 #18785 #18784 # 18783 OEH Booking Confirmation BKG Qyt 추가 */
			frm1.cntr_info.value=''; //cntr_info
			/* #20553 : ETD of Place of Receipt 추가, jsjang 2013.9.30 */
			// #26727 LHK, 20140403, 자동연계 안되도록 요청
			//frm1.etd_por_tm.value		= ''; //etd_por_tm
			frm1.rlsd_flg.checked=false; //released
			frm1.rlsd_dt_tm.value='';//released date	
			
			fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[2].RemoveAll();	//[20130822 OJG]
		}  
		
		// Contribution Margin 조회
		if (frm1.act_shpr_trdp_cd.value != ""){
			setCtrbMgn(frm1.act_shpr_trdp_cd.value);
		}
	}else{
	}
	
	//#2168 [BNX] Sales PIC based on Sales type does not simultaneously update
	changeSalesType();
	
	
	
	//#3700 [JAPT]OEM-OEH SYNC 로직 수정 (S)
	if(OEH_OEM_SYNC_ROUTE_YN == 'Y') {
		//#3811 [JAPT] POR,DEL,F.DEST & Sales PIC sync.	
		
		//HBL화면에서 Filing# 할당할 경우에도 아래 로직 적용하기 위해, SYNC_PIC 조건 주석처리.
		//#4037 [JAPT] keeping Sales PIC , Freight code.
		//if(SYNC_PIC == "HBL_CREATE"){
			frm1.sls_ofc_cd.value  = result[139]; //sls_ofc_cd
			frm1.sls_dept_cd.value = result[140]; //sls_dept_cd
			frm1.sls_usrid.value   = result[141]; //sls_usrid
			frm1.sls_usr_nm.value  = result[142]; //sls_usr_nm					
		//}
	}	
}

//#1266 [CLT] OEH B/L Entry 에서 Booking 번호지정 시 Booking Data Copy 로직
function BKNO_POPLIST_OEH(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry = rtnVal.split("|");
		
		formObj.bkg_no.value = rtnValAry[0];//bkg_no
		//formObj.f_bkg_no.value = rtnValAry[0];//bkg_no
		//formObj.bkg_seq.value = rtnValAry[1];//bkg_seq
		//formObj.opr_usrid.value = rtnValAry[51];//bkg_seq
		
		checkBkgNo();
	}
}

function checkBkgNo(obj){
	if(frm1.bkg_no.value!=""){
		ajaxSendPost(getBkgNoInfo, 'reqVal', '&goWhere=aj&bcKey=getBkgNoInfo&f_bkg_no='+frm1.bkg_no.value, './GateServlet.gsl');
	
	}else{
		
		frm1.bkg_no.value = "";
		frm1.bkg_seq.value = "";
	}
}

function getBkgNoInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var result = doc[1].split('^^');
			
			carr_bkg_seq = "";
			carr_bkg_ref_no = "";
			
			// #1541 - [REL_REVIEW] Booking No. 연계 로직 정리
			ajaxSendPost(getCarrBkgMblInfo, 'reqVal', '&goWhere=aj&bcKey=getCarrBkgMblInfo&cust_bkg_seq='+result[1], './GateServlet.gsl');
			
			
			if(carr_bkg_seq != ""){ 
				if(carr_bkg_ref_no != ""){ 
					
					//11. OEH Booking No 지정시 Filing NO 가 달라지는 경우 Overwrite 처리
					if(frm1.ref_no.value != '' && frm1.ref_no.value != carr_bkg_ref_no ){
						if (!confirm(getLabel2("FMS_COM_ALT110",new Array(carr_bkg_ref_no)))) {  
							frm1.bkg_no.value = "";
							frm1.bkg_seq.value = "";
							return;
						}
					}
					frm1.ref_no.value = carr_bkg_ref_no;
					
				} else {
					// The carrier booking is exist. Please, create the MB/L in advance.
					alert(getLabel('SEA_COM_ALT035'));
					frm1.bkg_no.value = "";
					return;
				}
			}
			
			
			frm1.bkg_no.value = result[0];//bkg_no
			frm1.f_bkg_no.value = result[0];//bkg_no
			frm1.bkg_seq.value = result[1];//bkg_seq
			frm1.bkg_dt_tm.value = modiStrDateType(result[2], 1);//bkg_dt_tm
			frm1.lc_no.value = result[3];//lc_no
			frm1.act_shpr_trdp_cd.value = result[4]; //act_shpr_trdp_cd
			frm1.act_shpr_trdp_nm.value = result[5]; //act_shpr_trdp_nm
			frm1.exp_ref_no.value = result[15]; //exp_ref_no
			frm1.cgo_pu_trdp_cd.value = result[16]; //cgo_pu_trdp_cd
			frm1.cgo_pu_trdp_nm.value = result[17]; //cgo_pu_trdp_nm
			frm1.cgo_pu_trdp_addr.value = result[18]; //cgo_pu_trdp_addr
			frm1.trk_trdp_cd.value = result[19]; //trk_trdp_cd
			frm1.trk_trdp_nm.value = result[20]; //trk_trdp_nm
			frm1.cust_ref_no.value = result[21]; //cust_ref_no
			frm1.cntr_info.value = result[22]; //cntr_info
			frm1.por_cd.value = result[23]; //por_cd
			frm1.por_nm.value = result[24]; //por_nm
			frm1.del_cd.value = result[25]; //del_cd
			frm1.del_nm.value = result[26]; //del_nm
			frm1.etd_por_tm.value = modiStrDateType(result[29], 1);//etd_por_tm
			frm1.shp_mod_cd.value = result[30]; //shp_mod_cd
			frm1.rep_cmdt_cd.value = result[31]; //rep_cmdt_cd
			frm1.rep_cmdt_nm.value = result[32]; //rep_cmdt_nm
			frm1.fm_svc_term_cd.value = result[40]; //fm_svc_term_cd
			frm1.to_svc_term_cd.value = result[41]; //to_svc_term_cd
			frm1.cargo_tp_cd.value = result[42]; //cargo_tp_cd
			frm1.wh_cut_off_dt.value = modiStrDateType(result[43], 1);//wh_cut_off_dt
			frm1.wh_cut_off_tm.value = result[44].substring(0,2) + ":" + result[44].substring(2,4); //wh_cut_off_tm
			frm1.sls_ofc_cd.value = result[45]; //sls_ofc_cd
			frm1.sls_dept_cd.value = result[46]; //sls_dept_cd
			frm1.sls_usrid.value = result[47]; //sls_usrid
			frm1.sls_usr_nm.value = result[48]; //sls_usr_nm
			
			//#1423 hsk
			frm1.opr_usrid.value = result[68]; //set issued by with asgn_usrid

			
			frm1.cust_trdp_cd.value = result[69]; 
			frm1.cust_trdp_nm.value = result[70]; 
			frm1.wh_trdp_cd.value = result[71]; 
			frm1.wh_trdp_nm.value = result[72]; 

			// #5289 [Binex] Errors when retrieving Customer Booking on OEH BL Entry
			frm1.obl_tp_cd.value = result[73];
			
			//if (frm1.hbl_tp_cd.value != "DR") {
			if (!(frm1.hbl_tp_cd.value == "DR" || frm1.hbl_tp_cd.value == "FW" || frm1.hbl_tp_cd.value == "DT")) {
				frm1.shpr_trdp_cd.value = result[6]; //shpr_trdp_cd
				frm1.shpr_trdp_nm.value = result[7]; //shpr_trdp_nm
				frm1.shpr_trdp_addr.value = result[8]; //shpr_trdp_addr
				frm1.cnee_trdp_cd.value = result[9]; //cnee_trdp_cd
				frm1.cnee_trdp_nm.value = result[10]; //cnee_trdp_nm
				frm1.cnee_trdp_addr.value = result[11]; //cnee_trdp_addr
				frm1.ntfy_trdp_cd.value = result[12]; //ntfy_trdp_cd
				frm1.ntfy_trdp_nm.value = result[13]; //ntfy_trdp_nm
				frm1.ntfy_trdp_addr.value = result[14]; //ntfy_trdp_addr
				frm1.fnl_dest_loc_cd.value = result[27]; //fnl_dest_loc_cd
				frm1.fnl_dest_loc_nm.value = result[28]; //fnl_dest_loc_nm
				frm1.pck_qty.value = result[33]; //pck_qty					
				frm1.pck_ut_cd.value = result[34]; //pck_ut_cd
				frm1.grs_wgt_ut_cd.value = result[35]; //grs_wgt_ut_cd
				frm1.grs_wgt.value = result[36]; //grs_wgt
				frm1.grs_wgt1.value = result[37]; //grs_wgt1
				frm1.meas.value = result[38]; //meas
				frm1.meas1.value = result[39]; //meas1
				frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(2));
			    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(2));
			    frm1.meas.value=doMoneyFmt(Number(frm1.meas.value).toFixed(3));
			    frm1.meas1.value=doMoneyFmt(Number(frm1.meas1.value).toFixed(0));
			    
			    frm1.mk_grs_wgt.value = frm1.grs_wgt.value;
			    frm1.mk_grs_wgt1.value = frm1.grs_wgt1.value;
			    frm1.mk_meas.value = frm1.meas.value;
			    frm1.mk_meas1.value = frm1.meas1.value;
			}
			
			/* #1266 [CLT] OEH B/L Entry 에서 Booking 번호지정 시 Booking Data Copy 로직 */
	        frm1.hbl_tp_cd     .value = result[49]; //HBL_TP_CD     
		    frm1.lnr_bkg_no    .value = result[50]; //LNR_BKG_NO    
		    frm1.prnr_trdp_cd  .value = result[51]; //PRNR_TRDP_CD  
		    frm1.prnr_trdp_nm  .value = result[52]; //PRNR_TRDP_NM  
		    frm1.vndr_trdp_cd  .value = result[53]; //VNDR_TRDP_CD  
			frm1.vndr_trdp_nm  .value = result[54]; //VNDR_TRDP_NM  
        	frm1.vndr_trdp_addr.value = result[55]; //VNDR_TRDP_ADDR		
        	frm1.trnk_vsl_nm   .value = result[56]; //TRNK_VSL_NM   
        	frm1.trnk_voy      .value = result[57]; //TRNK_VOY      
        	frm1.pol_cd        .value = result[58]; //POL_CD        
        	frm1.pol_nm        .value = result[59]; //POL_NM        
        	frm1.pod_cd        .value = result[60]; //POD_CD        
        	frm1.pod_nm        .value = result[61]; //POD_NM        
        	frm1.lnr_trdp_cd   .value = result[62]; //LNR_TRDP_CD   
        	frm1.lnr_trdp_nm   .value = result[63]; //LNR_TRDP_NM      
        	frm1.nomi_flg      .value = result[64]; //NOMI_FLG   
	        frm1.etd_dt_tm     .value = modiStrDateType(result[65], 1); //ETD_DT_TM
	        frm1.eta_dt_tm     .value = modiStrDateType(result[66], 1); //ETA_DT_TM
	        frm1.frt_term_c_cd .value = result[67]; //FRT_TERM_CD
	        //6644 [Binex-LA] BL Delivery Contact 관련 문의 ( OEH Partner(P01) / Consignee(C01) data mixup )
	        frm1.prnr_trdp_addr.value = result[74]; //PARTNER ADDR
	        frm1.cust_trdp_addr.value = result[75]; //C/BROKER ADDR
	        frm1.trk_trdp_addr .value = result[76]; //TRUCKER ADDR
			shipModeChange();
			
			// ##48830 - BINEX Visibility/PO 개발
			ajaxSendPost(setBkgPoInfo, 'reqVal', '&goWhere=aj&bcKey=getBkgPoInfo&bkg_seq='+result[1], './GateServlet.gsl');
			ajaxSendPost(setBkgItemInfo, 'reqVal', '&goWhere=aj&bcKey=getBkgItemInfo&bkg_seq='+result[1], './GateServlet.gsl');
			
			
			/* #1266 [CLT] OEH B/L Entry 에서 Booking 번호지정 시 Booking Data Copy 로직 */
			//bindBkgCntrData();
			//bindBkgFrtData();
			bkgCreat = true;
			
			// #1541 - [REL_REVIEW] Booking No. 연계 로직 정리
			if(carr_bkg_ref_no != "" || frm1.ref_no.value == ""){    //Filing No 가 없으면  Customer Booking Entry Container 조회
				if(carr_bkg_ref_no != ""){
					checkRefNo(frm1.ref_no.value);
				}
				bindBkgCntrCopyData();
			}
			bindBkgFrtDataBkg();
			//#5289 - [Binex] Errors when retrieving Customer Booking on OEH BL Entry (Duc Nguyen)
			descFreight();
			expressChange(frm1.exp_frt_desc, frm1.h_obl_tp_cd);
			
			
		}else{
			frm1.bkg_no.value = "";//bkg_no
			frm1.bkg_seq.value = "";//bkg_seq
			
			/*frm1.bkg_dt_tm.value = "";//bkg_dt_tm
			frm1.lc_no.value = "";//lc_no
			frm1.act_shpr_trdp_cd.value = ""; //act_shpr_trdp_cd
			frm1.act_shpr_trdp_nm.value = ""; //act_shpr_trdp_nm
			frm1.exp_ref_no.value = ""; //exp_ref_no
			frm1.cgo_pu_trdp_cd.value = ""; //cgo_pu_trdp_cd
			frm1.cgo_pu_trdp_nm.value = ""; //cgo_pu_trdp_nm
			frm1.cgo_pu_trdp_addr.value = ""; //cgo_pu_trdp_addr
			frm1.trk_trdp_cd.value = ""; //trk_trdp_cd
			frm1.trk_trdp_nm.value = ""; //trk_trdp_nm
			frm1.cust_ref_no.value = ""; //cust_ref_no
			frm1.cntr_info.value = ""; //cntr_info
			frm1.por_cd.value = ""; //por_cd
			frm1.por_nm.value = ""; //por_nm
			frm1.del_cd.value = ""; //del_cd
			frm1.del_nm.value = ""; //del_nm
			frm1.etd_por_tm.value = "";//etd_por_tm
			frm1.shp_mod_cd.value = ""; //shp_mod_cd
			frm1.rep_cmdt_cd.value = ""; //rep_cmdt_cd
			frm1.rep_cmdt_nm.value = ""; //rep_cmdt_nm
			frm1.fm_svc_term_cd.value = ""; //fm_svc_term_cd
			frm1.to_svc_term_cd.value = ""; //to_svc_term_cd
			frm1.cargo_tp_cd.value = ""; //cargo_tp_cd
			frm1.wh_cut_off_dt.value = "";//wh_cut_off_dt
			frm1.wh_cut_off_tm.value = ""; //wh_cut_off_tm
			frm1.sls_ofc_cd.value = ""; //sls_ofc_cd
			frm1.sls_dept_cd.value = ""; //sls_dept_cd
			frm1.sls_usrid.value = ""; //sls_usrid
			frm1.sls_usr_nm.value = ""; //sls_usr_nm
			
			if (frm1.hbl_tp_cd.value != "DR") {
				frm1.shpr_trdp_cd.value = ""; //shpr_trdp_cd
				frm1.shpr_trdp_nm.value = ""; //shpr_trdp_nm
				frm1.shpr_trdp_addr.value = ""; //shpr_trdp_addr
				frm1.cnee_trdp_cd.value = ""; //cnee_trdp_cd
				frm1.cnee_trdp_nm.value = ""; //cnee_trdp_nm
				frm1.cnee_trdp_addr.value = ""; //cnee_trdp_addr
				frm1.ntfy_trdp_cd.value = ""; //ntfy_trdp_cd
				frm1.ntfy_trdp_nm.value = ""; //ntfy_trdp_nm
				frm1.ntfy_trdp_addr.value = ""; //ntfy_trdp_addr
				frm1.fnl_dest_loc_cd.value = ""; //fnl_dest_loc_cd
				frm1.fnl_dest_loc_nm.value = ""; //fnl_dest_loc_nm
				frm1.pck_qty.value = ""; //pck_qty					
				frm1.pck_ut_cd.value = ""; //pck_ut_cd
				frm1.grs_wgt_ut_cd.value = ""; //grs_wgt_ut_cd
				frm1.grs_wgt.value = ""; //grs_wgt
				frm1.grs_wgt1.value = ""; //grs_wgt1
				frm1.meas.value = ""; //meas
				frm1.meas1.value = ""; //meas1
			}*/
		}  
	}else{
		
	}
}

var carr_bkg_seq = "";
var carr_bkg_ref_no = "";

function getCarrBkgMblInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var result = doc[1].split('^^');
			
			carr_bkg_seq = result[0]; // Carrier Booking Seq
			carr_bkg_ref_no = result[1]; // Master B/L Filling No.
		}
	}
}

//[20141216 YJW] HBL 저장시 Booking No 유효성 체크
function checkHblBkgNo() {
	var formObj  = document.frm1;
	
	if (formObj.bkg_seq.value != "") {
		ajaxSendPost(checkHblReq, 'reqVal', '&goWhere=aj&bcKey=getCheckBlCreate&bkg_seq='+formObj.bkg_seq.value+'&biz_clss_cd=H&intg_bl_seq='+formObj.intg_bl_seq.value, './GateServlet.gsl');
		
		if (!isHblCrtOk) {
			alert(getLabel('FMS_COM_ALT071')); // Invalid Booking No. HB/L already created!
		}
		
		return isHblCrtOk;
	} else {
		return true;
	}
}

var isHblCrtOk = false;

function checkHblReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			isHblCrtOk = false;
		}
		else{
			isHblCrtOk = true;
		}
	}
}

function sheet14_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj,'dc_', 'S', 'O', 'H');
	}
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "dc_fr_att_file_1", 0);
	}
	
}
function sheet14_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
}
/**
 * Freight B/C 처리
 */
function sheet14_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "dc_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'H');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'H');
}
/**
 * Freight B/C 처리
 */
function sheet14_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "dc_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, 'dc_', 'S', 'O', 'H');
	}else{
		mutiSheetOnClick(sheetObj, row, col, 'dc_');
	}
}
/**
 * Freight B/C 처리
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet14_OnChange(sheetObj, row, col, value, OldValue) {
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
	mutiSheetOnChange(sheetObj, row, col,  'dc_', 'S', 'O', 'H', OldValue);
}
function sheet14_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'dc_');
}
//User Defined Field
function sheet15_OnChange(sheetObj, row, col, value) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "udf_cd"){
		for(var i=1; i<=sheetObj.LastRow(); i++){
			if(i != row){
					if(sheetObj.GetCellValue(i,"udf_cd") == sheetObj.GetCellValue(row,"udf_cd")){
					//Duplication Task 
					alert(getLabel('FMS_COM_ALT008'));
					sheetObj.SetCellValue(row,"udf_cd","");
				}
			}
		}
		
		//#52613 [BNX] TYO 오피스 B/L 양식, Booking Information 리포트
		//Freight Prepaid at/Freight Payable at/Place of B/L Issue 항목은 Text로 입력되도록 (User Defined Field : Default로 지정 TOKYO)
		var selected_udf_cd = sheetObj.GetCellValue(row,"udf_cd");
		if (selected_udf_cd == "FPP" || selected_udf_cd == "FPA" || selected_udf_cd == "PBL"){
			sheetObj.SetCellValue(row,"udf_val","TOKYO");
		} else{
			sheetObj.SetCellValue(row,"udf_val","");
		}
	}
}

function sheet16_OnSearchEnd(sheetObj, row, col) {
	var formObj=document.frm1;
	var rows=sheetObj.SearchRows();
	
	sheetObj.SetSumValue("hwifr_frt_nm", "TOTAL");
	
	var sRow=sheetObj.FindSumRow();
	
    if(sRow != -1){
    	sheetObj.SetCellFont("FontBold", sRow, "hwifr_frt_nm", sRow, "hwifr_frt_nm",1);
    	sheetObj.SetCellAlign(sRow, "hwifr_frt_nm", "Center")
    }
	
	if(rows == 0){
		var curRow = sheetObj.DataInsert();
		
		var v_index = formObj.pck_ut_cd.selectedIndex;
		if(v_index < 0) v_index = 0;
		
		var pck_qty = formObj.pck_qty.value;
		var pck_ut_nm = formObj.pck_ut_cd.options[v_index].text;
		
		if(pck_qty > 1){
			pck_ut_nm = pck_ut_nm + "S";
		}
		
		sheetObj.SetCellValue(curRow, "hwifr_frt_nm", pck_qty + " " + pck_ut_nm);
		sheetObj.SetCellValue(curRow, "hwifr_grs_wgt1", frm1.grs_wgt1.value==''? 0 : Number(frm1.grs_wgt1.value.replaceAll(",","")).toFixed(2));
		sheetObj.SetCellValue(curRow, "hwifr_meas1", frm1.meas1.value==''? 0 : Number(frm1.meas1.value.replaceAll(",","")).toFixed(6));
				
		var hwi_frt_list = HWI_FRT_NM.split("|");
		
		for(var i=0; i < hwi_frt_list.length; i++) {
			curRow = sheetObj.DataInsert();
			sheetObj.SetCellValue(curRow, "hwifr_frt_nm", hwi_frt_list[i]);
		}
		sheetObj.SetSelectRow(1);
	}
}

function sheet16_OnChange(sheetObj, row, col, value){
	var colStr = sheetObj.ColSaveName(col);
	if(colStr == "hwifr_inv_amt"){
		if(trim(sheetObj.GetCellValue(row, "hwifr_frt_nm").toUpperCase()) == "O/FRT"){
			for(var i=1; i < sheetObj.LastRow() + 1; i++){
				if(trim(sheetObj.GetCellValue(i, "hwifr_frt_nm").toUpperCase()) == "OCEAN FSC"){
					sheetObj.SetCellValue(i, "hwifr_inv_amt", roundXL(value * HWI_VAT_FSC_RATIO / 100, 2));
				}
			}
		}else if(trim(sheetObj.GetCellValue(row, "hwifr_frt_nm").toUpperCase()) == "DOOR DLY"){
			for(var i=1; i < sheetObj.LastRow() + 1; i++){
				if(trim(sheetObj.GetCellValue(i, "hwifr_frt_nm").toUpperCase()) == "TAX"){
					sheetObj.SetCellValue(i, "hwifr_inv_amt", roundXL(value * HWI_VAT_TAX_RATIO / 100, 2));
				}
			}
		}
	}else if(colStr == "hwifr_ru"){
		var hwifr_meas1 = sheetObj.GetCellValue(1, "hwifr_meas1");
		sheetObj.SetCellValue(row, "hwifr_inv_amt", roundXL(value * hwifr_meas1, 2));
	}
}

function goToInvoice(sheetObj, obj){
	switch(obj){
		case "LOCAL":
			var formObj=document.frm1;
			if( frFrtCheckRow(sheetObj, "")){
				return;
			}
			//#25833
 			for(var k=headerRowCnt; k < sheetObj.LastRow() + 1; k++){
 				if((sheetObj.GetCellValue(k, "fr_frt_check") == 1) && (sheetObj.GetCellValue(k, "fr_frt_term_cd_h") == "CC")){
					alert(getLabel('FMS_COM_ALT064'));
 					for(var j=headerRowCnt; j < sheetObj.LastRow() + 1; j++){
						sheetObj.SetCellValue(j, "fr_frt_check",0,0);
					}
					return;
				}
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
			param += "&f_biz_clss_cd=H";
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
			var chk_fr_trdp_cd="";
			var chk_fr_trdp_nm="";
			var chk_fr_inv_curr_cd="";
			var chk_fr_frt_seq="";
 			for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
				if(sheetObj.GetCellValue(i, "b_fr_frt_check") == 1){
				chk_fr_trdp_cd=sheetObj.GetCellValue(i, 'b_fr_trdp_cd');
				chk_fr_trdp_nm=sheetObj.GetCellValue(i, 'b_fr_trdp_nm');
				chk_fr_inv_curr_cd=sheetObj.GetCellValue(i, 'b_fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ',';
					}
					chk_fr_frt_seq		+= 	sheetObj.GetCellValue(i, 'b_fr_frt_seq');
					chkCnt++;
				}
			}
			var param="&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=S";
			param += "&f_biz_clss_cd=H";
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
			param += "&bl_frt_yn=Y";  //#3973 [JAPT]Invoice Date & Ex.Rate
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
			param += "&f_biz_clss_cd=H";
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
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
	var arObj=docObjects[5];
	var apObj=docObjects[6];
	var dcObj=docObjects[13];
	switch(obj){
		case "LOCAL":
			//[SENWA] Freight tab에서 invoice 버튼을 클릭햇을 경우.
if(arObj.GetSelectRow() > 0 && arObj.GetCellValue(arObj.GetSelectRow(), "fr_inv_seq")!=""){
var param="&f_inv_seq=" + arObj.GetCellValue(arObj.GetSelectRow(), "fr_inv_seq");
//				param += "&f_inv_no=" + arObj.CellValue(arObj.SelectRow, "fr_inv_no");
				var paramStr="./ACC_INV_0010.clt?f_cmd="+param;
				parent.mkNewFrame('A/R Entry', paramStr);
			}else{
			}
		break;
		case "AP":
if(apObj.GetSelectRow() > 0 && apObj.GetCellValue(apObj.GetSelectRow(), "b_fr_inv_seq")!=""){
var param="&f_inv_seq=" + apObj.GetCellValue(apObj.GetSelectRow(), "b_fr_inv_seq");
//				param += "&f_inv_no=" + apObj.CellValue(apObj.SelectRow, "b_fr_inv_no");
				var paramStr="./ACC_INV_0030.clt?f_cmd="+param;
				parent.mkNewFrame('A/P Entry(Cost)', paramStr);
			}else{
			}
		break;
		case "DC":
if(dcObj.GetSelectRow() > 0 && dcObj.GetCellValue(dcObj.GetSelectRow(), "dc_fr_inv_seq")!=""){
var param="&f_inv_seq=" + dcObj.GetCellValue(dcObj.GetSelectRow(), "dc_fr_inv_seq");
//				param += "&f_inv_no=" + dcObj.CellValue(dcObj.SelectRow, "dc_fr_inv_no");
				var paramStr="./ACC_INV_0020.clt?f_cmd="+param;
				parent.mkNewFrame('D/C Note Entry', paramStr);
			}else{
			}
		break;
	}
}
/* jsjang 2013.7.22 요구사항 #15952 Container Info 자동 필드값 반영요건  */
function setPacQty(){
	var formObj=document.frm1;
	if(formObj.shp_mod_cd.value !="FCL")
	{
		//formObj.sad_txt.value = formObj.pck_qty.value + "  " + formObj.pck_ut_cd.options[formObj.pck_ut_cd.selectedIndex].text;
		fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
		mkSaidTxt(docObjects[2], formObj.sad_txt);
	}
	/*
	//#3678 [JAPT] OEH Entry 로직 수정 요건
	else {
		if(OEH_SAID_DESC_PRT_QTY == "D") {
			setFclDescTxt1();
		}
	}
	*/
	setFclDescTxt1();
}
function checkTrdpCode(obj){
	if(obj.name=="prnr_trdp_nm"){
	}else if(obj.name=="shpr_trdp_nm"){
		if(frm1.shpr_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.shpr_trdp_addr.value ==""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.shpr_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);				
			}
		}
	}else if(obj.name=="cnee_trdp_nm"){
		if(frm1.cnee_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.cnee_trdp_addr.value ==""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.cnee_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);				
			}
			
		}
	}else if(obj.name=="ntfy_trdp_nm"){
		if(frm1.ntfy_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.ntfy_trdp_addr.value==""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.ntfy_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);					
			}
		}
	}else if(obj.name=="act_shpr_trdp_nm"){
		if(frm1.act_shpr_trdp_cd.value==""){
			frm1.act_shp_info.value=obj.value;
		}
	}else if(obj.name=="cust_trdp_nm"){
		if(frm1.cust_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.cust_trdp_addr.value==""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.cust_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);					
			}			
		}
	}else if(obj.name=="lnr_trdp_nm"){
	}else if(obj.name=="carr_trdp_nm"){
	}else if(obj.name=="prnr_trdp_nm2"){
	}else if(obj.name=="iss_trdp_nm"){
	}else if(obj.name=="third_trdp_nm"){
	}
}
/* Bug #21113 : Express B/L 자동입력 관련, jsjang 2013.9.27 */
function expressChange(obj, obj1){
	var tmp=obj.value.split("\n");
	var num=0;
	var num1=0;
	var text='"EXPRESS B/L"';
	for(var i=0 ; i<tmp.length ; i++){
		var chk=tmp[i].indexOf(text);
		if(chk>0){
			num=num + 1;
		}
	}
	
	if(frm1.obl_tp_cd.value=="E"){ //#1619 [CLT] Original B/L Type- 항목 정리
		if(num == 0)
		{
			obj.value += '\r\n"EXPRESS B/L"';
		}
		obj1.value='"EXPRESS B/L"';
		/* LHK 20130822 #19706 Main Tab 의 Express B/L 을 Yes 로 했을 떄 Mark &Desc. Tab 의 Number of Original B/L 을 0 으로 변경, - No 로 하면 3 으로 변경 */
	    //#501 [BNX JAPAN] OEH Mark & Desc 탭에서 No of Original B/L에 수량 조정사항
	    //if(!blPrintOpt){
	    //	frm1.org_bl_qty.value="0";
	    //}
	}else{
		obj.value=obj.value.replace(/\n/g, "");
		obj.value=obj.value.replace(/\r/g, "");
		obj.value=obj.value.replace('"EXPRESS B/L"', '');
	    //#501 [BNX JAPAN] OEH Mark & Desc 탭에서 No of Original B/L에 수량 조정사항
	    //if(!blPrintOpt){
	    //	frm1.org_bl_qty.value="3";
	    //}
	}
	
	//#3356 [JTC]HB/L Form 개발
	if(frm1.obl_tp_cd.value=="O"){ //Original: Original 은 3장, Seaway Bill은 0장, 나머지는 1장 세팅(default)
		frm1.org_bl_qty.value="3";
	}else if(frm1.obl_tp_cd.value=="S"){
		frm1.org_bl_qty.value="0";
	}else{
		frm1.org_bl_qty.value="1";
	}	
}
var grobalFlag="";
function selectAutoSea(flag){
	var param='';
	if(flag=="S"){
		grobalFlag=flag;
		frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
		param += '&trdp_tp_cd=';
		param += '&sell_buy_tp_cd=S' + '&bnd_clss_cd=O';
		frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
		frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
		frm1.del_cd.value		== '' ? param += '' : param += '&dest_del_cd=' + frm1.del_cd.value;
		frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	}else if(flag=="B"){
		grobalFlag=flag;
		frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
		param += '&trdp_tp_cd=';
		param += '&sell_buy_tp_cd=S' + '&bnd_clss_cd=O';
		frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
		frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
		frm1.del_cd.value		== '' ? param += '' : param += '&dest_del_cd=' + frm1.del_cd.value;
		frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	}else if(flag=="D"){
		grobalFlag=flag;
		frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
		param += '&trdp_tp_cd=';
		param += '&sell_buy_tp_cd=S' + '&bnd_clss_cd=O';
		frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
		frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
		frm1.del_cd.value		== '' ? param += '' : param += '&dest_del_cd=' + frm1.del_cd.value;
		frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	}
	ajaxSendPost(getAutoSea, 'reqVal', '&goWhere=aj&bcKey=selectAutoSea'+param, './GateServlet.gsl');
}
function getAutoSea(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArray=doc[1].split(",");
			var dtlArray=rtnArray[0].split("@@@");
 		   	var objPfx='';
 		   	var sheetObj='';
 		   	var gridVal='';
 		   	var trdp_cd='';
			if(grobalFlag=="S"){
				gridVal=5;
				trdp_cd=frm1.act_shpr_trdp_cd.value;
				fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
				sheetObj=docObjects[5];
			}
			else if(grobalFlag=="B"){
				objPfx='b_';
				gridVal=6;
				trdp_cd='';
				fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
				sheetObj=docObjects[6];
			}
			else if(grobalFlag=="D"){
				objPfx='dc_';
				gridVal=13;
				trdp_cd=frm1.prnr_trdp_cd.value;
				fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
				sheetObj=docObjects[13];
			}
			for(var i=0 ; i<dtlArray.length-1 ; i++){
				var tmpArray=dtlArray[i].split("^^^");
				var rows=0;
				var grsWgtKg=frm1.grs_wgt.value.replaceAll(",","");
				var retWgt=roundXL(grsWgtKg / 1000, 3);
				var cbm=frm1.meas.value.replaceAll(",","");
				if(cbm<1){
					cbm=1;
				}
				if(retWgt<1){
					retWgt=1;
				}
				var cntrCnt=0;
				var cntrTysz='';
				fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
				for(var j=1 ; j<docObjects[2].LastRow() + 1 ; j++){
					if(docObjects[2].GetCellValue(j, "cntr_no")!="undefined"){
						cntrCnt++;
						cntrTysz=docObjects[2].GetCellValue(j, "cntr_tpsz_cd");
					}
				}
				if(frm1.shp_mod_cd.value!="FCL" && tmpArray[4]!="SCN"){
					gridAdd(gridVal);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_cd",tmpArray[0]);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_cd_nm",tmpArray[1]);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_trdp_cd",trdp_cd);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_rat_curr_cd",tmpArray[3]);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_aply_ut_cd",tmpArray[4]);
					if(user_ofc_cnt_cd=="KR" && grobalFlag=="S"){
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_curr_cd","KRW");
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_term_cd","CC");
					}
					else{
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_curr_cd",tmpArray[4]);
					}
					if(tmpArray[4]=="KGS"){
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",grsWgtKg);
					}
					else if(tmpArray[4]=="CBM"){
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",cbm);
					}
					else if(tmpArray[4]=="RET"){
						if(retWgt > cbm){
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",retWgt);
						}
						else{
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",cbm);
						}
					}
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_ru",tmpArray[8]);
					var tmpInvSumAmt=sheetObj.GetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_sum_amt");
					if(tmpArray[6]==0 && tmpArray[7]==0){
					}
					else if(tmpArray[6]!=0 && tmpArray[7]==0){
						if(tmpArray[6]-tmpInvSumAmt>0){
							tmpInvSumAmt=tmpArray[6];
						}
						else{
							//tmpInvSumAmt = tmpInvSumAmt;
						}
					}
					else if(tmpArray[6]==0 && tmpArray[7]!=0){
						if(tmpArray[7]-tmpInvSumAmt>0){
							//tmpInvSumAmt = tmpInvSumAmt;
						}
						else{
							tmpInvSumAmt=tmpArray[7];
						}
					}
					else if(tmpArray[6]!=0 && tmpArray[7]!=0){
						if(tmpArray[6]-tmpInvSumAmt>0){
							tmpInvSumAmt=tmpArray[6];
						}
						else if(tmpArray[7]-tmpInvSumAmt>0){
							//tmpInvSumAmt = tmpInvSumAmt;
						}
						else{
							tmpInvSumAmt=tmpArray[7];
						}
					}
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_sum_amt",tmpInvSumAmt);
				}
				else if((frm1.shp_mod_cd.value=="FCL" && tmpArray[4]=="SCN")){
					if(cntrTysz!="" && cntrTysz.substring(0,2)==tmpArray[5].substring(0,2)){
						gridAdd(gridVal);
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_cd",tmpArray[0]);
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_cd_nm",tmpArray[1]);
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_trdp_cd",trdp_cd);
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_rat_curr_cd",tmpArray[3]);
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_aply_ut_cd",tmpArray[4]);
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_cntr_tpsz_cd",tmpArray[5]);
						if(user_ofc_cnt_cd=="KR" && grobalFlag=="S"){
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_curr_cd","KRW");
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_term_cd","CC");
						}
						else{
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_curr_cd",tmpArray[4]);
						}
						if(tmpArray[4]=="KGS"){
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",grsWgtKg);
						}
						else if(tmpArray[4]=="CBM"){
							sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",cbm);
						}
						else if(tmpArray[4]=="RET"){
							if(retWgt > cbm){
								sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",retWgt);
							}
							else{
								sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",cbm);
							}
						}
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_ru",tmpArray[8]);
						var tmpInvSumAmt=sheetObj.GetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_sum_amt");
						if(tmpArray[6]==0 && tmpArray[7]==0){
						}
						else if(tmpArray[6]!=0 && tmpArray[7]==0){
							if(tmpArray[6]>tmpInvSumAmt){
								tmpInvSumAmt=tmpArray[6];
							}
							else{
								//tmpInvSumAmt = tmpInvSumAmt;
							}
						}
						else if(tmpArray[6]==0 && tmpArray[7]!=0){
							if(tmpArray[7]>tmpInvSumAmt){
								//tmpInvSumAmt = tmpInvSumAmt;
							}
							else{
								tmpInvSumAmt=tmpArray[7];
							}
						}
						else if(tmpArray[6]!=0 && tmpArray[7]!=0){
							if(tmpArray[6]>tmpInvSumAmt){
								tmpInvSumAmt=tmpArray[6];
							}
							else if(tmpArray[7]>tmpInvSumAmt){
								//tmpInvSumAmt = tmpInvSumAmt;
							}
							else{
								tmpInvSumAmt=tmpArray[7];
							}
						}
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_sum_amt",tmpInvSumAmt);
					}
				}
			}
		}
		else{
			//There is no Iata Tariff Info
			alert(getLabel('FMS_COM_ALT010') + " - " + getLabel('FMS_COD_IATA') + getLabel('FMS_COD_RATE'));
		}
	}
}

//#2081 - [PATENT] OEM Container Information 버튼 옵션추가
//BL_CODE_UTIL.js 파일의 addCntrInfo(sheet, obj, type) 함수를 공통 적용
/*var cntrInfoType = "";
var cntrInfoHead = true;

function checkAddCntrInfo(){
	
	 *  2012.02.24
	 * 하우스의 컨테이너 정보가 달려있으면 해당 내용을 조합해서 찍어주고,
	 * 없으면 마스터의 컨테이너 정보를 가져온다.
	 
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	var cnt=docObjects[2].LastRow() + 1;
	var tmp="";
	var chkFlg=false;
	if(frm1.mk_txt.value != ""){
		tmp="\r\n";
	}
	
	//#466 [Fulltrans] strengthen the function for "container info" copy button
	var opt_key = "OE_CNTR_INFO_TYPE";
	ajaxSendPost(setCntrInfoType, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	//#786 [FULLTRANS] HBL 수정 사항 정리
	var opt_key = "CNTR_INFO_HEAD";
	ajaxSendPost(setCntrInfoHead, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	if(cntrInfoHead){
		if(cntrInfoType == "1"){//CNTR No + "/" + Seal No1
			tmp += "Container No/Seal No";
			tmp += "\r\n";
		}else if(cntrInfoType == "2"){//CNTR No + "/" + Seal No1 + Package No + Package Type + "/" + Weight K +"KGS /" + CBM + "CBM"
			tmp += "Container No/Seal No";
			tmp += "\r\n";
			tmp += "Package/Weight/CBM";
			tmp += "\r\n";
		}else if(cntrInfoType == "3"){//CNTR No + "/" + Seal No1 + Package No+Package Type + "/" + Weight K +"KGS"
			tmp += "Container No/Seal No";
			tmp += "\r\n";
			tmp += "Package/Weight";
			tmp += "\r\n";
		}else{//JP Option
			tmp += "Container No/Type/Seal No";
			tmp += "\r\n";
		}
	}
	
	for(var i = 1 ; i < cnt ; i++){
		if(docObjects[2].GetCellValue(i, "cntr_no")!=''){
			chkFlg=true;
			
			var sText = docObjects[2].GetComboInfo(i,"cgo_pck_ut", "Text");
			var sCode = docObjects[2].GetComboInfo(i,"cgo_pck_ut", "Code");
			
			var arrText = sText.split("|");
			var arrCode = sCode.split("|");
			
			var pck_nm = "";
			for(j = 0; j < arrCode.length; j++) {
				if(docObjects[2].GetCellValue(i, "cgo_pck_ut") == arrCode[j]) {
					pck_nm = arrText[j];
					break;
				}
			}
			
			if(cntrInfoType == "1"){//CNTR No + "/" + Seal No1
				tmp += docObjects[2].GetCellValue(i, "cntr_no") + "/" + docObjects[2].GetCellValue(i, "seal_no1");
				if(docObjects[2].GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + docObjects[2].GetCellValue(i, "seal_no2");
				}
			}else if(cntrInfoType == "2"){//CNTR No + "/" + Seal No1 + Package No + Package Type + "/" + Weight K +"KGS /" + CBM + "CBM"
				tmp += docObjects[2].GetCellValue(i, "cntr_no") + "/" + docObjects[2].GetCellValue(i, "seal_no1");
				if(docObjects[2].GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + docObjects[2].GetCellValue(i, "seal_no2");
				}
				tmp += "\r\n";
//				tmp += docObjects[2].GetCellValue(i, "cgo_pck_qty") + docObjects[2].GetCellValue(i, "cgo_pck_ut") + "/";
				tmp += docObjects[2].GetCellValue(i, "cgo_pck_qty") + pck_nm + "/";
				tmp += docObjects[2].GetCellValue(i, "cgo_wgt") + "KGS/" + docObjects[2].GetCellValue(i, "cgo_meas") + "CBM";
			}else if(cntrInfoType == "3"){//CNTR No + "/" + Seal No1 + Package No+Package Type + "/" + Weight K +"KGS"
				tmp += docObjects[2].GetCellValue(i, "cntr_no") + "/" + docObjects[2].GetCellValue(i, "seal_no1");
				if(docObjects[2].GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + docObjects[2].GetCellValue(i, "seal_no2");
				}
				tmp += "\r\n";
//				tmp += docObjects[2].GetCellValue(i, "cgo_pck_qty") + docObjects[2].GetCellValue(i, "cgo_pck_ut") + "/";
				tmp += docObjects[2].GetCellValue(i, "cgo_pck_qty") + pck_nm + "/";
				tmp += docObjects[2].GetCellValue(i, "cgo_wgt") + "KGS";
			}else{//JP Option
				tmp += docObjects[2].GetCellValue(i, "cntr_no") + "/" + docObjects[2].GetCellValue(i, "cntr_tpsz_cd") + "/" + docObjects[2].GetCellValue(i, "seal_no1");
				if(docObjects[2].GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + docObjects[2].GetCellValue(i, "seal_no2");
				}
			}
			tmp += "\r\n";
		}
	}

//	if(user_ofc_cnt_cd=="JP"){
//		;
//	}else{
//		tmp += "Container No/Seal No";
//	}
//	for(var i=1 ; i<cnt ; i++){
//		if(docObjects[2].GetCellValue(i, "cntr_no")!=''){
//			chkFlg=true;
//			tmp += "\r\n";
//			if(user_ofc_cnt_cd=="JP"){
//				if(docObjects[2].GetCellValue(i, "seal_no2")==''){
//					tmp += docObjects[2].GetCellValue(i, "cntr_no") + "/" + docObjects[2].GetCellValue(i, "cntr_tpsz_cd") + "/" + docObjects[2].GetCellValue(i, "seal_no1");
//				}else{
//					tmp += docObjects[2].GetCellValue(i, "cntr_no") + "/" + docObjects[2].GetCellValue(i, "cntr_tpsz_cd") + "/" + docObjects[2].GetCellValue(i, "seal_no1") + ', ' + docObjects[2].GetCellValue(i, "seal_no2");
//				}
//			}else{
//				if(docObjects[2].GetCellValue(i, "seal_no2")==''){
//					tmp += docObjects[2].GetCellValue(i, "cntr_no") + "/" + docObjects[2].GetCellValue(i, "seal_no1");
//				}else{
//					tmp += docObjects[2].GetCellValue(i, "cntr_no") + "/" + docObjects[2].GetCellValue(i, "seal_no1") + ', ' + docObjects[2].GetCellValue(i, "seal_no2");
//				}
//			}
//		}
//	}
	if(chkFlg){
		frm1.mk_txt.value += tmp;
	}else{
		if(user_ofc_cnt_cd=="JP"){
			addCntrInfoType('H');
		}else{
			//addCntrInfo('H');
			addCntrInfo(docObjects[2], 'H', 'OE');
		}
	}
}

//#466 [Fulltrans] strengthen the function for "container info" copy button
function setCntrInfoType(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		cntrInfoType = doc[1];
	}else{
	}
}

function setCntrInfoHead(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		if(doc[1] == "Y"){
			cntrInfoHead = true;
		}else{
			cntrInfoHead = false;
		}
	}else{
	}
}
*/

function descFreight(){
	if(frm1.frt_term_c_cd.value=="CC"){
		frm1.exp_frt_desc.value=frm1.exp_frt_desc.value.replace("FREIGHT PREPAID", "FREIGHT COLLECT");
	}else{
		frm1.exp_frt_desc.value=frm1.exp_frt_desc.value.replace("FREIGHT COLLECT", "FREIGHT PREPAID");
	}
}
//###############################################################################
// DIM 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet13_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "dim_act_dim" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			gridAdd(1);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "dim_len_dim" :
		case "dim_wdt_dim" :
		case "dim_hgt_dim" :
		case "dim_pce_qty" :
		case "dim_act_dim" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
// Conatiner 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet5_OnKeyDown(sheetObj, row, col, keyCode){
	/*	[20140116 OJG]
	if(sheetObj.LastRow()== row && "cntr_rmk" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			gridAdd(2);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
	*/
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

function sheet5_OnTab(sheetObj, Row, Col, ORow, OCol, isShift, isLast) {
	// #334 - [ZEN] PAYMENT AND DEPOSIT COLUMN ORDER ADJUSTMENT
	var lastCol = 0;
	
	for(var i=0; i<=sheetObj.LastCol(); i++){
		if(sheetObj.GetColHidden(i) == 0) {
			lastCol = i;
		}
	}
	
	if(sheetObj.LastRow() == Row && OCol == lastCol){
		//gridAdd(2);
		getRefCntrList();
		sheetObj.SelectCell(sheetObj.LastRow(), 0);
	}
}

// Freight AR 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
// freight tab에서 trdp_nm을 enter로 조회할 수 있도록 설정
function sheet8_OnKeyDown(sheetObj, row, col, keyCode){
	
	//alert("sheet8_OnKeyDown");
	
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'H');
		}
	}
	if(sheetObj.LastRow()== row && "fr_reserve_field01" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//gridAdd(5);
			// sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('ROWADD', docObjects[5], 'S', 'O', 'H');
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
// Freight AP 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
// freight tab에서 trdp_nm을 enter로 조회할 수 있도록 설정
function sheet9_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="b_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'O', 'H');
		}
	}
	if(sheetObj.LastRow()== row && "b_fr_frt_check" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//gridAdd(6);
			// sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('BCROWADD', docObjects[6], 'S', 'O', 'H');
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
// Freight DC 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
// freight tab에서 trdp_nm을 enter로 조회할 수 있도록 설정
function sheet14_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="dc_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'H');
		}
	}
	if(sheetObj.LastRow()== row && "dc_fr_frt_check" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//gridAdd(13);
			// sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('DCROWADD', docObjects[13], 'S', 'O', 'H');
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
//2012.06.19 회사 상호 변경
function chkReserve(){
	if(frm1.chk_flg.checked){
		if(user_ofc_cnt_cd=="US"){
			frm1.reserve_field06.value='Allstate Int’l Freight USA, Inc';
		}else if(user_ofc_cnt_cd=="DE"){
			frm1.reserve_field06.value='Cyberlogitec';
		}else if(user_ofc_cnt_cd=="IT"){
			frm1.reserve_field06.value='Cyberlogitec';
		}else if(user_ofc_cnt_cd=="FR"){
			frm1.reserve_field06.value='Cyberlogitec';
		}else if(user_ofc_cnt_cd=="JP"){
			//frm1.reserve_field06.value = '';
		}else{
		}
//		if(user_ofc_cnt_cd=="US"){
//			frm1.reserve_field06.value = 'Allstate Int’l Freight USA, Inc';
//		}else if(user_ofc_cnt_cd=="DE"){
//			frm1.reserve_field06.value = 'Atlantic Integrated Freight GmbH';
//		}else if(user_ofc_cnt_cd=="IT"){
//			frm1.reserve_field06.value = 'Atlantic Integrated Freight S.R.L.';
//		}else if(user_ofc_cnt_cd=="FR"){
//			frm1.reserve_field06.value = 'Atlantic Integrated Freight SARL';
//		}else if(user_ofc_cnt_cd=="JP"){
//			//frm1.reserve_field06.value = '';
//		}else{
//		}
	}else{
		frm1.reserve_field06.value='';
	}
}

function fncBlSearch() {
	var formObj  = document.frm1;
	formObj.f_ref_no.value = formObj.ref_no.value;
	if ( event.keyCode == 13 && formObj.f_ref_no.value != null ) {
		$('#chkDgt').val("T");
		srOpenPopUp('REF_POPLIST1',this);
		
	}	
}

function fncBkgSearch() {
	var formObj  = document.frm1;
	
	if ( event.keyCode == 13 && formObj.bkg_no.value != null ) {
		srOpenPopUp('BKNO_POPLIST',this);
	}
}

$(document).ready(function(){
	
	$('#ref_no').keydown( function (event) { //event==Keyevent
		if (event.keyCode == 13 ){
			//event.preventDefault();
			$('#chkDgt').val("T");
			setTimeout("window.self.focus();", 500 );			
			fncBlSearch();
		}
	    // event.preventDefault(); <- Disable all keys  action
	});
	
});
//function changePWC(result) {
//	
//	// M.BL Entry에서 H.BL Copy할 때, M.BL Ship Mode FCL이고, 
//	// M.BL CNTR Tab의 Container PWC의 각각 PWC의 합이 0일 때(경우)에는
//	// M.BL의 PWC 값을 H.BL의 PWC에 Copy 해준다. (그 외의 경우는 현재 로직 유지)
//	
//	var formObj  = document.frm1;
//	if(formObj.shp_mod_cd.value=="FCL") {
//		
//		var pTotal = 0;
//		var wTotal = 0;
//		var cTotal = 0;
//		
//		for(var i=1; i<= docObjects[2].RowCount(); i++){
//			pTotal  += Number(docObjects[2].GetCellValue(i, 'cgo_pck_qty'));
//			wTotal  += Number(docObjects[2].GetCellValue(i, 'cgo_wgt'));
//			wTotal  += Number(docObjects[2].GetCellValue(i, 'cgo_wgt1'));
//			cTotal  += Number(docObjects[2].GetCellValue(i, 'cgo_meas'));
//			cTotal  += Number(docObjects[2].GetCellValue(i, 'cgo_meas1'));
//		}
//		if(pTotal == 0) {
//			frm1.pck_qty.value				= result[64]; //pck_qty
//		}
//		if(wTotal == 0) {
//			frm1.grs_wgt.value				= result[66]; //grs_wgt
//			frm1.grs_wgt1.value				= result[67]; //grs_wgt1
//		}
//		if(cTotal == 0) {
//			frm1.meas.value					= doMoneyFmt(Number(result[68]).toFixed(3)); //meas
//			frm1.meas1.value				= doMoneyFmt(Number(result[69]).toFixed(3)); //meas1
//		}
//	}
//}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_bl_no.value = getParam(url,"f_bl_no");
	formObj.f_intg_bl_seq.value = getParam(url,"f_intg_bl_seq");
	
	doWork('SEARCHLIST');
}

function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./SEE_BMD_0020AJ.clt",
		   dataType: 'xml',
		   data: $(formObj).serialize(),
		   success: function(data){
			   setFieldValue( formObj.bl_sts_cd, $('bl_sts_cd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.f_intg_bl_seq, $('f_intg_bl_seq',data).text());
			   setFieldValue( formObj.mk_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.h_mbl_curr_cd, $('mbl_curr_cd',data).text());
			   setFieldValue( formObj.h_ooh_bkg_rmk, $('ooh_bkg_rmk',data).text());
			   setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());
			   setFieldValue( formObj.f_bl_no, $('f_bl_no',data).text());
			   setFieldValue( formObj.bl_sts_label, $('bl_sts_label',data).text());
			   setFieldValue( formObj.bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.h_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.hbl_tp_cd, $('hbl_tp_cd',data).text());
			   setFieldValue( formObj.lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.reserve_field03, $('reserve_field03',data).text());
			   setFieldValue( formObj.ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.rlt_intg_bl_seq, $('rlt_intg_bl_seq',data).text());
			   setFieldValue( formObj.post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.mrn_no, $('mrn_no',data).text());
			   setFieldValue( formObj.doc_recpt_no, $('doc_recpt_no',data).text());
			   setFieldValue( formObj.jb_tmplt_nm, $('jb_tmplt_nm',data).text());
			   setFieldValue( formObj.jb_tmplt_seq, $('jb_tmplt_seq',data).text());
			   
			   $(formObj.sub_mbl_flg).val($('sub_mbl_flg',data).text());
			   
			   setFieldValue( formObj.lc_no, $('lc_no',data).text());
			   setFieldValue( formObj.h_lc_no, $('lc_no',data).text());
			   setFieldValue( formObj.inv_no, $('inv_no',data).text());
			   setFieldValue( formObj.h_inv_no, $('inv_no',data).text());
			   setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.prnr_ref_no, $('prnr_ref_no',data).text());
			   setFieldValue( formObj.h_cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.bkg_no, $('bkg_no',data).text());
			   setFieldValue( formObj.f_bkg_no, $('bkg_no',data).text());
			   setFieldValue( formObj.bkg_seq, $('bkg_seq',data).text());
			   setFieldValue( formObj.org_bkg_seq, $('bkg_seq',data).text());
			   setFieldValue( formObj.prnr_trdp_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.prnr_trdp_nm, $('prnr_trdp_nm',data).text());
			   setFieldValue( formObj.prnr_trdp_addr, $('prnr_trdp_addr',data).text());
			   setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
			   setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
			   setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
			   setFieldValue( formObj.ntfy_trdp_cd, $('ntfy_trdp_cd',data).text());
			   setFieldValue( formObj.ntfy_trdp_nm, $('ntfy_trdp_nm',data).text());
			   setFieldValue( formObj.ntfy_trdp_addr, $('ntfy_trdp_addr',data).text());
			   setFieldValue( formObj.act_shpr_trdp_cd, $('act_shpr_trdp_cd',data).text());
			   setFieldValue( formObj.act_shpr_trdp_nm, $('act_shpr_trdp_nm',data).text());
			   setFieldValue( formObj.act_shp_info, $('act_shp_info',data).text());
			   setFieldValue( formObj.cust_trdp_cd, $('cust_trdp_cd',data).text());
			   setFieldValue( formObj.cust_trdp_nm, $('cust_trdp_nm',data).text());
			   setFieldValue( formObj.cust_trdp_addr, $('cust_trdp_addr',data).text());
			   setFieldValue( formObj.exp_ref_no, $('exp_ref_no',data).text());
			   setFieldValue( formObj.vndr_trdp_cd, $('vndr_trdp_cd',data).text());
			   setFieldValue( formObj.vndr_trdp_nm, $('vndr_trdp_nm',data).text());
			   setFieldValue( formObj.vndr_trdp_addr, $('vndr_trdp_addr',data).text());
			   setFieldValue( formObj.cgo_pu_trdp_cd, $('cgo_pu_trdp_cd',data).text());
			   setFieldValue( formObj.cgo_pu_trdp_nm, $('cgo_pu_trdp_nm',data).text());
			   setFieldValue( formObj.cgo_pu_trdp_addr, $('cgo_pu_trdp_addr',data).text());
			   setFieldValue( formObj.trk_trdp_cd, $('trk_trdp_cd',data).text());
			   setFieldValue( formObj.trk_trdp_nm, $('trk_trdp_nm',data).text());
			   setFieldValue( formObj.trk_trdp_addr, $('trk_trdp_addr',data).text());
			   setFieldValue( formObj.cntr_info, $('cntr_info',data).text());
			   setFieldValue( formObj.obrd_dt_tm, $('obrd_dt_tm',data).text());
			   setFieldValue( formObj.trnk_vsl_cd, $('trnk_vsl_cd',data).text());
			   setFieldValue( formObj.trnk_vsl_nm, $('trnk_vsl_nm',data).text());
			   setFieldValue( formObj.trnk_voy, $('trnk_voy',data).text());
			   setFieldValue( formObj.pre_vsl_cd, $('pre_vsl_cd',data).text());
			   setFieldValue( formObj.pre_vsl_nm, $('pre_vsl_nm',data).text());
			   setFieldValue( formObj.pre_voy, $('pre_voy',data).text());
			   setFieldValue( formObj.ts1_port_cd, $('ts1_port_cd',data).text());
			   setFieldValue( formObj.ts1_port_nm, $('ts1_port_nm',data).text());
			   setFieldValue( formObj.ts1_etd_dt_tm, $('ts1_etd_dt_tm',data).text());
			   setFieldValue( formObj.ts1_eta_dt_tm, $('ts1_eta_dt_tm',data).text());
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
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.etd_por_tm, $('etd_por_tm',data).text());
			   setFieldValue( formObj.inco_cd, $('inco_cd',data).text());
			   setFieldValue( formObj.shp_mod_cd, $('shp_mod_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_cd, $('rep_cmdt_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.h_rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.agent_trdp_cd, $('agent_trdp_cd',data).text());
			   setFieldValue( formObj.agent_trdp_nm, $('agent_trdp_nm',data).text());
			   setFieldValue( formObj.agent_trdp_addr, $('agent_trdp_addr',data).text());
			   setFieldValue( formObj.prnr_trdp_cd2, $('prnr_trdp_cd2',data).text());
			   setFieldValue( formObj.prnr_trdp_nm2, $('prnr_trdp_nm2',data).text());
			   setFieldValue( formObj.prnr_trdp_addr2, $('prnr_trdp_addr2',data).text());
			   setFieldValue( formObj.state_cd, $('state_cd',data).text());
			   setFieldValue( formObj.state_nm, $('state_nm',data).text());
			   setFieldValue( formObj.cnt_cd, $('cnt_cd',data).text());
			   setFieldValue( formObj.cnt_nm, $('cnt_nm',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.meas, $('meas',data).text());
			   setFieldValue( formObj.meas1, $('meas1',data).text());
			   setFieldValue( formObj.size_ut_cd1, $('size_ut_cd',data).text());
			   setFieldValue( formObj.wh_recp_no, $('wh_recp_no',data).text());
			   setFieldValue( formObj.agent_rt, $('agent_rt',data).text());
			   setFieldValue( formObj.agent_amt, $('agent_amt',data).text());
			   setFieldValue( formObj.agent_curr_cd, $('agent_curr_cd',data).text());
			   setFieldValue( formObj.h_agent_curr_cd, $('agent_curr_cd',data).text());
			   setFieldValue( formObj.cust_rt, $('cust_rt',data).text());
			   setFieldValue( formObj.cust_amt, $('cust_amt',data).text());
			   setFieldValue( formObj.cust_curr_cd, $('cust_curr_cd',data).text());
			   setFieldValue( formObj.h_cust_curr_cd, $('cust_curr_cd',data).text());
			   setFieldValue( formObj.frt_term_a_cd, $('frt_term_a_cd',data).text());
			   setFieldValue( formObj.h_frt_term_a_cd, $('frt_term_a_cd',data).text());
			   setFieldValue( formObj.frt_term_c_cd, $('frt_term_c_cd',data).text());
			   setFieldValue( formObj.h_frt_term_c_cd, $('frt_term_c_cd',data).text());
			   setFieldValue( formObj.fm_svc_term_cd, $('fm_svc_term_cd',data).text());
			   setFieldValue( formObj.to_svc_term_cd, $('to_svc_term_cd',data).text());
			   setFieldValue( formObj.h_fm_svc_term_cd, $('fm_svc_term_cd',data).text());
			   setFieldValue( formObj.h_to_svc_term_cd, $('to_svc_term_cd',data).text());
			   setFieldValue( formObj.profit_share, $('profit_share',data).text());
			   setFieldValue( formObj.h_profit_share, $('profit_share',data).text());
			   setFieldValue( formObj.express_tp_cd, $('express_tp_cd',data).text());
			   setFieldValue( formObj.h_express_tp_cd, $('express_tp_cd',data).text());
			   setFieldValue( formObj.obl_tp_cd, $('obl_tp_cd',data).text());
			   setFieldValue( formObj.cargo_tp_cd, $('cargo_tp_cd',data).text());
			   setFieldValue( formObj.nomi_flg, $('nomi_flg',data).text());
			   setFieldValue( formObj.shp_tp_cd, $('shp_tp_cd',data).text());
			   setFieldValue( formObj.wh_cut_off_dt, $('wh_cut_off_dt',data).text());
			   setFieldValue( formObj.wh_cut_off_tm, $('wh_cut_off_tm',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   setFieldValue( formObj.sls_usr_nm, $('sls_usr_nm',data).text());
			   setFieldValue( formObj.sls_dept_cd, $('sls_dept_cd',data).text());
			   setFieldValue( formObj.bkg_dt_tm, $('bkg_dt_tm',data).text());
			   setFieldValue( formObj.bl_iss_dt, $('bl_iss_dt',data).text());
			   setFieldValue( formObj.opr_usrid, $('issued_by',data).text());
			   setFieldValue( formObj.opr_usrnm, $('proc_usrnm',data).text());
			   setFieldValue( formObj.opr_ofc_cd, $('proc_ofccd',data).text());
			   setFieldValue( formObj.opr_dept_cd, $('proc_dept_cd',data).text());
			   setFieldValue( formObj.iss_loc_nm1, $('iss_loc_nm1',data).text());
			   setFieldValue( formObj.obrd_dt_tm1, $('obrd_dt_tm1',data).text());
			   setFieldValue( formObj.org_bl_qty, $('org_bl_qty',data).text());
			   setFieldValue( formObj.itn_no, $('itn_no',data).text());
			   setFieldValue( formObj.trans_shipment, $('trans_shipment',data).text());
			   setFieldValue( formObj.onward_rout, $('onward_rout',data).text());
			   setFieldValue( formObj.sad_txt, $('sad_txt',data).text());
			   setFieldValue( formObj.say_txt, $('say_txt',data).text());
			   setFieldValue( formObj.mk_grs_wgt, $('mk_grs_wgt',data).text());
			   setFieldValue( formObj.mk_grs_wgt1, $('mk_grs_wgt1',data).text());
			   setFieldValue( formObj.mk_meas, $('mk_meas',data).text());
			   setFieldValue( formObj.mk_meas1, $('mk_meas1',data).text());
			   setFieldValue( formObj.carr_trdp_cd1, $('carr_trdp_cd1',data).text());
			   setFieldValue( formObj.carr_trdp_nm1, $('carr_trdp_nm1',data).text());
			   setFieldValue( formObj.mk_txt, $('mk_txt',data).text());
			   setFieldValue( formObj.desc_txt1, $('desc_txt1',data).text());
			   setFieldValue( formObj.desc_txt, $('desc_txt',data).text());
			   setFieldValue( formObj.exp_frt_desc, $('exp_frt_desc',data).text());
			   setFieldValue( formObj.h_clean_on_board, $('clean_on_board',data).text());
			   setFieldValue( formObj.wgt_disp_cd, $('wgt_disp_cd',data).text());
			   setFieldValue( formObj.h_wgt_disp_cd, $('wgt_disp_cd',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   setFieldValue( formObj.po_no, $('po_no',data).text());
			   setFieldValue( formObj.h_po_no, $('po_no',data).text());
			   setFieldValue( formObj.item_no, $('item_no',data).text());
			   
			   setFieldValue( formObj.ctrb_ofc_cd, $('ctrb_ofc_cd',data).text());
			   setFieldValue( formObj.ctrb_dept_cd, $('ctrb_dept_cd',data).text());
			   setFieldValue( formObj.ctrb_ratio_yn, $('ctrb_ratio_yn',data).text());
			   setFieldValue( formObj.ctrb_mgn, $('ctrb_mgn',data).text());
			   setFieldValue( formObj.doc_form, $('doc_form',data).text());
			   setFieldValue( formObj.wh_trdp_cd, $('wh_trdp_cd',data).text());
			   setFieldValue( formObj.wh_trdp_nm, $('wh_trdp_nm',data).text());
			   
			   setFieldValue( formObj.rlsd_flg, $('rlsd_flg',data).text());
			   setFieldValue( formObj.rlsd_dt_tm, $('rlsd_dt_tm',data).text());
			   setFieldValue( formObj.rlsd_usrid, $('rlsd_usrid',data).text());
			   setFieldValue( formObj.rlsd_usr_nm, $('rlsd_usr_nm',data).text());
			   setFieldValue( formObj.rlsd_dept_cd, $('rlsd_dept_cd',data).text());
			   
			   //#3376 [JTC] Japan Trust 용 Profit Report 개발
			   setFieldValue( formObj.lane_cd, $('lane_cd',data).text());
			   setFieldValue( formObj.svc_lane_nm, $('svc_lane_nm',data).text());
			   
			   //#3608 [JTC]OEH Entry 에 DOC Cut-Off Date 추가
			   setFieldValue( formObj.hbl_cut_off_dt, $('hbl_cut_off_dt',data).text());
			   setFieldValue( formObj.hbl_cut_off_tm, $('hbl_cut_off_tm',data).text());
			   //OFVFOUR-8128: [JAPT] AMS/ISF No. field is error When searching the HBL on HBL Entry
			   setFieldValue( formObj.ams_no, $('ams_no',data).text());
			   setFieldValue( formObj.isf_no, $('isf_no',data).text());
			   
			   //setFieldValue( formObj.xcrtDt, $('obrd_dt_tm',data).text());
			   var obrddttm;
			   if(BL_EXPORT_EX_DT == 'ETD'){
				   obrddttm = $('etd_dt_tm',data).text().replaceAll('-','');
			   } else {
				   obrddttm = $('obrd_dt_tm',data).text().replaceAll('-','');
			   }
			   setFieldValue( formObj.xcrtDt, obrddttm);
			   
			   setFieldValue( formObj.f_modify, $('f_modify',data).text()); //#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED
			  //#1619 [CLT] Original B/L Type- 항목 정리 setFieldValue( formObj.bl_rlse_tp_cd, $('bl_rlse_tp_cd',data).text()); //<!--#1430 [PATENT] 0215_15 B/L TYPE DIVERSELY-->
			   sheet6.SetColProperty('item_cntr_list_seq', {ComboText:$('CNTCD2',data).text(), ComboCode:$('CNTCD1',data).text()} );
			   
			   /* #1804 [Split - 1] [PATENT] Payment Verification - 기능보완 */
			   setFieldValue( formObj.verify_flag, $('verify_flag',data).text());

			   //#657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL (2017.07.03)
			   setFieldValue( formObj.surrend, $('surrend',data).text());
			   setFieldValue( formObj.inter_use_flag, $('inter_use_flag',data).text());

			   ///#4128 [JAPT] New request - OEH TRI#, TLI#
			   setFieldValue( formObj.tli_no, $('tli_no',data).text());
			   
			   // #3171 [CLT] OEH BL - Mark탭의 Carrier 정보 연계
			   vsl_show_flg = $('vsl_show_flg',data).text();
			   load_port_show_flg = $('load_port_show_flg',data).text();

			   doBtnAuthority(attr_extension);
			   tab1click = '';
			   tab2click = '';
			   tab3click = '';
			   tab4click = '';
			   tab5click = '';
			   tab6click = '';
			   tab7click = '';
			   setupPage();
			   if(show_delete_complete == "Y"){
				   showCompleteProcess();
				   show_delete_complete = "N";
			   }    
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}
function sheet6_OnKeyDown(sheetObj, row, col, keyCode) {
	switch (sheetObj.ColSaveName(col)) {
		case "item_pck_qty" :
		case "item_pck_inr_qty" :
		case "item_ea_cnt" :
		case "item_wgt" :
		case "item_lbs_wgt" :
		case "item_meas" :
		case "item_cft_meas" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
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

function fncBlSearch() {
	var formObj  = document.frm1;
	formObj.f_ref_no.value = formObj.ref_no.value;
	if ( event.keyCode == 13 && formObj.f_ref_no.value != null ) {
		srOpenPopUp('REF_POPLIST1',this);
	}
}

function fncBkgSearch() {
	var formObj  = document.frm1;
	
	if ( event.keyCode == 13 && formObj.bkg_no.value != null ) {
		srOpenPopUp('BKNO_POPLIST',this);
	}
}

function changePWC(result) {
	
	// M.BL Entry에서 H.BL Copy할 때, M.BL Ship Mode FCL이고, 
	// M.BL CNTR Tab의 Container PWC의 각각 PWC의 합이 0일 때(경우)에는
	// M.BL의 PWC 값을 H.BL의 PWC에 Copy 해준다. (그 외의 경우는 현재 로직 유지)
	
	var formObj  = document.frm1;
	if(formObj.shp_mod_cd.value=="FCL") {
		
		var pTotal = 0;
		var wTotal = 0;
		var cTotal = 0;
		fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
		for(var i=1; i<= docObjects[2].RowCount(); i++){
			pTotal  += Number(docObjects[2].GetCellValue(i, 'cgo_pck_qty'));
			wTotal  += Number(docObjects[2].GetCellValue(i, 'cgo_wgt'));
			wTotal  += Number(docObjects[2].GetCellValue(i, 'cgo_wgt1'));
			cTotal  += Number(docObjects[2].GetCellValue(i, 'cgo_meas'));
			cTotal  += Number(docObjects[2].GetCellValue(i, 'cgo_meas1'));
		}
		if(pTotal == 0) {
			frm1.pck_qty.value				= result[64]; //pck_qty
		}
		if(wTotal == 0) {
			frm1.grs_wgt.value				= result[66]; //grs_wgt
			frm1.grs_wgt1.value				= result[67]; //grs_wgt1
		}
		if(cTotal == 0) {
			frm1.meas.value					= doMoneyFmt(Number(result[68]).toFixed(3)); //meas
			frm1.meas1.value				= doMoneyFmt(Number(result[69]).toFixed(3)); //meas1
		}
	}else{
		frm1.pck_qty.value=result[64]; //pck_qty
		frm1.pck_ut_cd.value=result[65]; //pck_ut_cd
		frm1.grs_wgt.value=result[66]; //grs_wgt
		frm1.grs_wgt1.value=result[67]; //grs_wgt1
		frm1.meas.value=result[68]; //meas
		frm1.meas1.value=result[69]; //meas1
	}
}
//function btnLoad(){
//	if(frm1.bl_sts_cd.value=='NA'){
//        titBlStyle(false);
//        getBtnObj("btnAdd").style.display    = 'inline';
//	}else{
//		getBtnObj("btnAdd").style.display = 'none';
//		getObj("sndEmlObj").style.display = 'none';
//		getObj("fileUpObj").style.display = 'inline';
//		getBtnObj("btnShippingAdvice").style.display = 'inline';
//		
//		//Bkking Confirm
//		if(frm1.bl_sts_cd.value=='BC'){
//			titBlStyle(false);
//
//			frm1.bkg_no.className = 'search_form-disable';
//            frm1.bkg_no.readOnly  = false;
//
//            getBtnObj("bkgCnfObj").style.display= 'inline';
//			getBtnObj("btnSave").style.display  = 'inline';
//			getBtnObj("btnfromBlModiObj").style.display    = 'inline';
//            getBtnObj("btnCopy").style.display  = 'inline';
//            getBtnObj("btnDelete").style.display  = 'inline';
//			getObj("goWoObj").style.display = 'inline';
//
//		//Booking Confirm
//		}else if(frm1.bl_sts_cd.value=='BF'){
//            titBlStyle(true);
//			frm1.bkg_no.readOnly  = true;
//			getBtnObj("bkgCnfObj").style.display = 'none';
//			getBtnObj("hblCreObj").style.display = 'inline';
//			getBtnObj("btnSave").style.display = 'inline';
//			getBtnObj("btnfromBlModiObj").style.display    = 'inline';
//			getBtnObj("btnCopy").style.display = 'inline';
//			getBtnObj("btnDelete").style.display  = 'inline';
//			getObj("goWoObj").style.display = 'inline';
//			if(bkCheck==99){
//				bkCheck = 0;
//			}
//		}else if(frm1.bl_sts_cd.value=='HC'){
//			titBlStyle(true);
//			getBtnObj("btnSave").style.display  = 'inline';
//			getBtnObj("btnfromBlModiObj").style.display    = 'inline';
//			getBtnObj("btnDelete").style.display   = 'inline';
//			getBtnObj("btnCopy").style.display  = 'inline';
//			getBtnObj("btnPrint").style.display = 'inline';
//			getBtnObj("btnHiPrint").style.display = 'inline';
//			getBtnObj("btnBookConfirm").style.display = 'inline';
//			getBtnObj("btnAccounting").style.display = 'inline';
//			getBtnObj("aesObj").style.display = 'inline';
//			getObj("goWoObj").style.display  = 'inline';
//
//			dispBizBtns('inline');
//
//		}else if(frm1.bl_sts_cd.value=='SR'||frm1.bl_sts_cd.value=='MC'){
//			getBtnObj("btnSave").style.display   = 'inline';
//			getBtnObj("btnfromBlModiObj").style.display    = 'inline';
//			getBtnObj("btnCopy").style.display   = 'inline';
//			getBtnObj("btnPrint").style.display  = 'inline';
//			getBtnObj("btnHiPrint").style.display  = 'inline';
//			getBtnObj("btnBookConfirm").style.display  = 'inline';
//			getBtnObj("btnAccounting").style.display  = 'inline';
//			getBtnObj("aesObj").style.display  = 'inline';
//
//            dispBizBtns('inline');
//
//		}else if(frm1.bl_sts_cd.value=='HO'){
//			getBtnObj("btnAdd").style.display = 'none';
//			getBtnObj("btnfromBlModiObj").style.display    = 'inline';
//			getBtnObj("btnSave").style.display = 'none';
//			getBtnObj("closeModiObj").style.display = 'inline';
//			
//			getBtnObj("bkgCnfObj").style.display = 'none';
//			getBtnObj("hblCreObj").style.display = 'none';
//			getBtnObj("btnPrint").style.display = 'inline';
//			getBtnObj("btnHiPrint").style.display = 'inline';
//			getBtnObj("btnBookConfirm").style.display = 'inline';
//			getBtnObj("btnAccounting").style.display = 'inline';
//			getBtnObj("aesObj").style.display = 'inline';
//			//getObj("caObj").style.display = 'none';
//			getBtnObj("btnCopy").style.display = 'inline';
//			getBtnObj("btnDelete").style.display = 'none';
//			getObj("goWoObj").style.display  = 'none';
//
//            dispBizBtns('none');
//
//		}else{
//			getBtnObj("btnAdd").style.display = 'none';
//			getBtnObj("btnfromBlModiObj").style.display    = 'inline';
//			getBtnObj("btnSave").style.display = 'none';
//			getBtnObj("closeModiObj").style.display = 'inline';
//			
//			getBtnObj("bkgCnfObj").style.display = 'none';
//			getBtnObj("hblCreObj").style.display = 'none';
//			getBtnObj("btnPrint").style.display = 'inline';
//			getBtnObj("btnHiPrint").style.display = 'inline';
//			getBtnObj("btnBookConfirm").style.display = 'inline';
//			getBtnObj("btnAccounting").style.display = 'inline';
//			getBtnObj("aesObj").style.display = 'inline';
//			//getObj("caObj").style.display = 'none';
//			getBtnObj("btnCopy").style.display = 'inline';
//			getBtnObj("btnDelete").style.display = 'none';
//			getObj("goWoObj").style.display  = 'none';
//
//            dispBizBtns('none');
//		}
//	}
//}

//BL_COPY
function selectCopyBLFrt(){
	 openBlCopyPopUp("COPY_CONFIRM_POPUP_3",this,this);
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
			var shpr_cne_copy_chk=rtnValAry[4];
			var shpmt_itm_copy_chk=rtnValAry[5];
			var mrk_des_copy_chk=rtnValAry[6];
			var rmk_copy_chk=rtnValAry[7];//#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
			var ref_no_copy_chk=rtnValAry[8]; //#1741 [PATENT]HBL Copy 옵션에 Filing No 복사여부 추가
			
			//#5878 [BNX-JAPAN] BNX C/S 요구사항
			var frt_trm_copy_chk = rtnValAry[9];
			
			var orgBlSeq = frm1.copy_bl_seq.value;
			if (orgBlSeq != "") {
				
				//#2348 [IMPEX] Pop up error message not closing after click OK
				cntrTpSzFlag = true;
			
				var tmpIntgBlSeq = frm1.intg_bl_seq.value;
				frm1.intg_bl_seq.value = frm1.copy_bl_seq.value;
				
				if ((arFrt_copy_chk == "Y")||(apFrt_copy_chk == "Y")||(dcFrt_copy_chk == "Y")) {
					//Freight될 Container 조회
					frm1.f_cmd.value=SEARCHLIST01;
					fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
		 			docObjects[4].DoSearch("SEE_FRT_0010GS.clt", FormQueryString(frm1) );
				}
							
				if (arFrt_copy_chk == "Y") {
					// Selling/Debit Freight 조회
					frm1.f_cmd.value=SEARCHLIST06;
					fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
					docObjects[5].DoSearch("./SEE_BMD_0024GS.clt", FormQueryString(frm1) );
				}
				
				if (apFrt_copy_chk == "Y") {
					// Buying/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST07;
					fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
					docObjects[6].DoSearch("./SEE_BMD_0024_1GS.clt", FormQueryString(frm1) );
				}
				if (dcFrt_copy_chk == "Y") {
					// DC 
					frm1.f_cmd.value=SEARCHLIST12;
					fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
					docObjects[13].DoSearch("./SEE_BMD_0024_2GS.clt", FormQueryString(frm1) );
				}
				/*Vinh.Vo (S)*/
				if (shpr_cne_copy_chk == "Y" || shpmt_itm_copy_chk == "Y" || mrk_des_copy_chk == "Y" || rmk_copy_chk == "Y") {
					
					// Shipper and Consignee
					
					frm1.f_cmd.value=COMMAND12;
					
					var xml = sheet1.GetSearchData("./SEE_BMD_0020_1GS.clt",FormQueryString(frm1));
					
					var xmlDoc = $.parseXML(xml);
					 
					 var $xml = $(xmlDoc);
					 
					 if($xml.find("result").text() == "1" ){
						 
//						 if(shpr_cne_copy_chk == "Y"){
//							
//							formObj.shpr_trdp_cd.value = $xml.find("shpr_trdp_cd").text();
//							formObj.shpr_trdp_nm.value = $xml.find("shpr_trdp_nm").text();
//							formObj.shpr_trdp_addr.value = $xml.find("shpr_trdp_addr").text();
//							
//							formObj.cnee_trdp_cd.value = $xml.find("cnee_trdp_cd").text();
//							formObj.cnee_trdp_nm.value = $xml.find("cnee_trdp_nm").text();
//							formObj.cnee_trdp_addr.value = $xml.find("cnee_trdp_addr").text();
//						}
						 
						if(shpmt_itm_copy_chk == "Y"){
							
							isCopy = true;
							// #4302 [IMPEX] SHIPMENT & ITEM AFTER BL COPY NOT SHOWING
							formObj.pck_ut_cd.value = $xml.find("pck_ut_cd").text();
							formObj.pck_qty.value = ($xml.find("pck_qty").text() == "" ? "0": doMoneyFmt(Number($xml.find("pck_qty").text().replaceAll(",","")).toFixed(0)));
							formObj.grs_wgt.value = ($xml.find("grs_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt").text().replaceAll(",","")).toFixed(obl_decimal_len)));
							formObj.grs_wgt1.value = ($xml.find("grs_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt1").text().replaceAll(",","")).toFixed(obl_decimal_len)));
							formObj.meas.value = ($xml.find("meas").text() == "" ? "0": doMoneyFmt(Number($xml.find("meas").text().replaceAll(",","")).toFixed(obl_decimal_len)));
							formObj.meas1.value = ($xml.find("meas1").text() == "" ? "0": doMoneyFmt(Number($xml.find("meas1").text().replaceAll(",","")).toFixed(obl_decimal_len)));

							formObj.mk_grs_wgt.value = ($xml.find("grs_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt").text().replaceAll(",","")).toFixed(obl_decimal_len)));
							formObj.mk_grs_wgt1.value = ($xml.find("grs_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt1").text().replaceAll(",","")).toFixed(obl_decimal_len)));
							formObj.mk_meas.value = ($xml.find("meas").text() == "" ? "0": doMoneyFmt(Number($xml.find("meas").text().replaceAll(",","")).toFixed(obl_decimal_len)));
							formObj.mk_meas1.value = ($xml.find("meas1").text() == "" ? "0": doMoneyFmt(Number($xml.find("meas1").text().replaceAll(",","")).toFixed(obl_decimal_len)));
							
							formObj.rep_cmdt_cd.value = $xml.find("rep_cmdt_cd").text();
							formObj.rep_cmdt_nm.value = $xml.find("rep_cmdt_nm").text();
							formObj.state_cd.value = $xml.find("state_cd").text();
							formObj.state_nm.value = $xml.find("state_nm").text();
							formObj.cnt_cd.value = $xml.find("cnt_cd").text();
							formObj.cnt_nm.value = $xml.find("cnt_nm").text();
							formObj.cargo_tp_cd.value = $xml.find("cargo_tp_cd").text();
													
							
							frm1.f_cmd.value=SEARCHLIST11;
							fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
				 			docObjects[1].DoSearch("./SEE_BMD_0021_2GS.clt", FormQueryString(frm1) );
						}
						
						if(mrk_des_copy_chk == "Y"){
							formObj.iss_loc_nm1.value = $xml.find("iss_loc_nm1").text();
							formObj.obrd_dt_tm1.value = $xml.find("obrd_dt_tm1").text();
							formObj.onward_rout.value = $xml.find("onward_rout").text();
//							formObj.org_bl_qty.value = $xml.find("org_bl_qty").text(); this value is set default by loadPage
//							formObj.itn_no.value = $xml.find("itn_no").text();
							formObj.trans_shipment.value = $xml.find("trans_shipment").text();
							formObj.sad_txt.value = $xml.find("sad_txt").text();
							formObj.say_txt.value = $xml.find("say_txt").text();
							//#1855 [BINEX] OEH Container 정보 입력시, B/L Displayed Weight 오류
							// #4302 [IMPEX] SHIPMENT & ITEM AFTER BL COPY NOT SHOWING
							formObj.mk_grs_wgt.value = ($xml.find("mk_grs_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("mk_grs_wgt").text().replaceAll(",","")).toFixed(obl_decimal_len)));
							formObj.mk_grs_wgt1.value = ($xml.find("mk_grs_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("mk_grs_wgt1").text().replaceAll(",","")).toFixed(obl_decimal_len)));
							formObj.mk_meas.value = ($xml.find("mk_meas").text() == "" ? "0": doMoneyFmt(Number($xml.find("mk_meas").text().replaceAll(",","")).toFixed(obl_decimal_len)));
							formObj.mk_meas1.value = ($xml.find("mk_meas1").text() == "" ? "0": doMoneyFmt(Number($xml.find("mk_meas1").text().replaceAll(",","")).toFixed(obl_decimal_len)));
							formObj.mk_txt.value = $xml.find("mk_txt").text();
							formObj.desc_txt1.value = $xml.find("desc_txt1").text();
							formObj.desc_txt.value = $xml.find("desc_txt").text();
							formObj.exp_frt_desc.value = $xml.find("exp_frt_desc").text();
							formObj.clean_on_board.value = $xml.find("clean_on_board").text();
							formObj.wgt_disp_cd.value = $xml.find("wgt_disp_cd").text();
						//	formObj.rmk.value = $xml.find("rmk").text();
//							formObj.po_no.value = $xml.find("po_no").text();
//							formObj.item_no.value = $xml.find("item_no").text();
						}
						if(rmk_copy_chk == "Y"){
							formObj.rmk.value = $xml.find("rmk").text();
						}
					 }
				}else{
					if(mrk_des_copy_chk != "Y"){
						frm1.h_rep_cmdt_nm.value = "";
						textAdd(frm1.desc_txt, '', frm1.rep_cmdt_nm.value, frm1.h_rep_cmdt_nm);
					}
				}
				
				/*Vinh.Vo (E)*/
				//#1741 [PATENT]HBL Copy 옵션에 Filing No 복사여부 추가
				if (ref_no_copy_chk == "Y" ){	
					formObj.ref_no.value = formObj.copy_ref_no.value;
					ajaxSendPost(getRefNoInfo, 'reqVal', '&goWhere=aj&bcKey=getRefNoInfo&air_sea_clss_cd=S&bnd_clss_cd=O&ref_no='+formObj.ref_no.value, './GateServlet.gsl');
				}		

				frm1.carr_trdp_cd1.value = frm1.lnr_trdp_cd.value;
				frm1.carr_trdp_nm1.value = frm1.lnr_trdp_nm.value;
				
				
				frm1.intg_bl_seq.value = tmpIntgBlSeq;	
				
				// 2015.06.12 Copy 했을 때 Container Summary, Said, Say, Gross Weight, Measurement 다시 세팅
				frm1.cntr_info.value = "";
				//#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				if(mrk_des_copy_chk != "Y"){
					fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
					mkSaidTxt(docObjects[2], frm1.sad_txt);
					mkSayTxt(docObjects[2], frm1.say_txt, frm1.intg_bl_seq.value, 'O');
				}
				// #50521 - [IMPEX] OE WEIGHT 관련 주석처리함. 2015.11.11 YJW
				/*formObj.mk_grs_wgt.value = formObj.grs_wgt.value;
				formObj.mk_grs_wgt1.value = formObj.grs_wgt1.value;
				formObj.mk_meas1.value = formObj.meas1.value;
				formObj.mk_meas.value = formObj.meas.value;*/
				
				if (frt_trm_copy_chk == "Y"){
					frm1.frt_term_a_cd.value = frm1.h_frt_term_a_cd.value;
					frm1.frt_term_c_cd.value = frm1.h_frt_term_c_cd.value;
				}
			}
			
			//#2348 [IMPEX] Pop up error message not closing after click OK
			cntrTpSzFlag = true;
		}
	}
}

function searchFrtCntr(){

	var orgBlSeq = frm1.copy_bl_seq.value;
	var tmpIntgBlSeq = frm1.intg_bl_seq.value;; 
	frm1.intg_bl_seq.value = frm1.copy_bl_seq.value;
	frm1.f_cmd.value=SEARCHLIST01;
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	docObjects[4].DoSearch("SEE_FRT_0010GS.clt", FormQueryString(frm1) );
	frm1.intg_bl_seq.value = tmpIntgBlSeq;	
}

function setCtrbDeptCd(){
	var formObj = document.frm1;
	formObj.ctrb_dept_cd.value = "OE";
}

// #48988 [JP LOGISTICS] OEH BL ENTRY 에서 EXPRESS B/L DEFAULT 옵션 NO로 설정
function setExpressTpCdVal(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var express_cd = frm1.h_express_tp_cd.value;
	
	if(express_cd == null || express_cd == ""){
		if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
			if(doc[1] == "Y"){
				frm1.express_tp_cd.value = "Y";
			} else {
				frm1.express_tp_cd.value = "N";
			}
		} else {
			frm1.express_tp_cd.value = "Y";
		}
		
		frm1.h_express_tp_cd.value = doc[1];
	}
}

//#48327 [Impex] HBL -- Option to Show D/C Freight Charges 설정
function setblFrtChkYn(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
	    if(doc[1] == "Y"){
	    	blFrtChkYn = "Y";
		}else{
		}
	}else{
	}
}

//#501 [BNX JAPAN] OEH Mark & Desc 탭에서 No of Original B/L에 수량 조정사항
function setblPrintOpt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
	    if(doc[1] == "Y"){
	    	blPrintOpt = true;
		}else{
		}
	}else{
	}
}

/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function blCheckInpuValsForAdding(){
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
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
		moveTab('01');
	}
	//else if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){ //S.Y BAIK (2013.01.23)
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
	
	//#25246, 25247 필수값 설정 추가
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
	
	//#416 [BINEX] SALES TYPE AND SALES PIC 관리 위한 요구사항
	//#416 Sales Type 필수값 설정 추가
	
	if(frm1.nomi_flg.value == "B"){
		alert(getLabel('FMS_COM_ALT001') + " - Sales Type");
		moveTab('01');
		frm1.nomi_flg.focus();
		isOk=false;
		return isOk;
	}
	
	
	//#31594 [BINEX]B/L Entry 에서 Customer 항목을 mandatory 지정 - 필수값 설정 추가
	if(frm1.act_shpr_trdp_cd.value == "") { 
//		alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		moveTab('01');
		frm1.act_shpr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.act_shpr_trdp_nm.value == "") { 
//		alert(getLabel('FMS_COM_ALT001'));
		alert(getLabel('FMS_COM_ALT001') + " - CUSTOMER");
		moveTab('01');
		frm1.act_shpr_trdp_nm.focus();
		isOk = false;
		return isOk; 
	}
	
	
	
	
	
	//today를 기준으로 6개월 차이가 나면 안됨
	var tmpEtdDate=frm1.etd_dt_tm.value.replaceAll("-", "");
	var etdDate=new Date(tmpEtdDate.substring(4,8), tmpEtdDate.substring(0,2)-1, tmpEtdDate.substring(2,4));
	var tmpDate=new Date();
	var today=new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()); 
	if((today-etdDate)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	} else if((etdDate-today)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	} else{
		etdRangeOk=true;
	}
	fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj9=docObjects[8];
	for(var i=1; i<=sheetObj9.RowCount(); i++){
		if(sheetObj9.GetCellValue(i,"jb_sts_nm") == ""){
			//alert("[ Status >> Job Visibility >> Task ] is mandatory field. ");
			alert(getLabel('FMS_COM_ALT001'));
			sheetObj9.SelectCell(i,"jb_sts_nm");
			isOk=false;
		}
	}
	fnSetIBsheetInit(14);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj15=docObjects[14];
	for(var i=1; i<=sheetObj15.RowCount(); i++){
		if(sheetObj15.GetCellValue(i,"udf_cd") == ""){
			//alert("[ Status >> Job Visibility >> Task ] is mandatory field. ");
			alert(getLabel('FMS_COM_ALT001'));
			sheetObj15.SelectCell(i,"udf_cd");
			isOk=false;
		}
	}
	var sheetObjArr=new Array(3);
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	sheetObjArr[0]=docObjects[5];   //AR LOCAL  'fr_'
	sheetObjArr[1]=docObjects[13];  //DC    'dc_fr_'
	sheetObjArr[2]=docObjects[6];   //AP    'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){  //Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/*=================================================================================================*/
	//Container List & Item List validation.
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	var cntrListParam=docObjects[2].GetSaveString(false);
	if(docObjects[2].IsDataModified() && cntrListParam == "") { isOk=false; };
	if(cntrListParam!=''){
		if(cntrListCheckInpuVals(docObjects[2])){
			isOk=false;
		}
	}
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	var cmdtListParam=docObjects[3].GetSaveString(false);
	if(docObjects[3].IsDataModified() && cmdtListParam == "") { isOk=false; };
	if(cmdtListParam!=''){
		if(itemCheckInpuVals(docObjects[3])){
			isOk=false;
		}
	}

//	#1351 [CLT] B/L, AWB 등 Freight 탭에 대한 Mandatory Validation 메시지 기능 보완
	var frtSdListParam=docObjects[5].GetSaveString(false);
	if(docObjects[5].IsDataModified() && frtSdListParam == "") { isOk=false; moveTab('04');};

	var frtBcListParam=docObjects[6].GetSaveString(false);
	if(docObjects[6].IsDataModified() && frtBcListParam == "") { isOk=false; moveTab('04');};

	var frtDcListParam=docObjects[13].GetSaveString(false);
	if(docObjects[13].IsDataModified() && frtDcListParam == "") { isOk=false; moveTab('04');};    

	return isOk;
}

function bindBkgCntrData(){
	if (frm1.bkg_seq.value != ""){
		ajaxSendPost(getLnrBkgCntrList, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgCntrList&bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');
	}
	
	tab2click = "Y";
}

//#1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발
function bindBkgCntrCopyData(){
	if (frm1.bkg_seq.value != ""){
		ajaxSendPost(getLnrBkgCntrCopyList, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgCntrCopyList&bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');
	}
	
	tab2click = "Y";
}

function getLnrBkgCntrList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpList=doc[1].split("@;;@");
			
			for(var i=0 ; i<tmpList.length-1 ; i++){
				var tmp=tmpList[i].split("@^^@");
				var intRows = docObjects[2].DataInsert();
				docObjects[2].SetCellValue(intRows, 'cntr_no',(tmp[0]== "null"?"":tmp[0]),0);
				docObjects[2].SetCellValue(intRows, 'cntr_tpsz_cd',(tmp[1]== "null"?"":tmp[1]),0);
				docObjects[2].SetCellValue(intRows, 'seal_no1',(tmp[2]== "null"?"":tmp[2]),0);
			}
			for(var i=1; i<=docObjects[2].LastRow(); i++){
				docObjects[2].SetCellValue(i, 'Seq', i);
			}
		}
	}
	
	docObjects[2].SetBlur();
}

function getLnrBkgCntrCopyList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpList=doc[1].split("@;;@");
			
			for(var i=0 ; i<tmpList.length-1 ; i++){
				var tmp=tmpList[i].split("@^^@");
				var intRows = docObjects[2].DataInsert();
				docObjects[2].SetCellValue(intRows, 'cntr_no',(tmp[0]== "null"?"":tmp[0]),0);
				docObjects[2].SetCellValue(intRows, 'cntr_tpsz_cd',(tmp[1]== "null"?"":tmp[1]),0);
				docObjects[2].SetCellValue(intRows, 'seal_no1',(tmp[2]== "null"?"":tmp[2]),0);
				docObjects[2].SetCellValue(intRows, 'bkg_create','BKG_COPY');
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
		
		//CNTR의 Unit Combo정보를 담을 Sheet를 만든다.
		fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
		var curSheet = docObjects[2];
		var frtSheet = docObjects[4];
		
		//sheet를 초기화한다.
		//frtSheet.RemoveAll();
		
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
		
		docObjects[5].RemoveAll();
		docObjects[6].RemoveAll();
		docObjects[13].RemoveAll();
		
		ajaxSendPost(getLnrBkgFrtArList, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgFrtList&f_frt_tp=AR&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');		
		ajaxSendPost(getLnrBkgFrtApList, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgFrtList&f_frt_tp=AP&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');		
		ajaxSendPost(getLnrBkgFrtDcList, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgFrtList&f_frt_tp=DC&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');
	}
	
	tab4click = "Y";
}

//#1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발
function bindBkgFrtDataBkg(){
	if (frm1.bkg_seq.value != ""){
		
		//CNTR의 Unit Combo정보를 담을 Sheet를 만든다.
		fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
		var curSheet = docObjects[2];
		var frtSheet = docObjects[4];
		
		//sheet를 초기화한다.
		//frtSheet.RemoveAll();
		
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
		docObjects[5].RemoveAll();
		docObjects[6].RemoveAll();
		docObjects[13].RemoveAll();
		//ojg request 20170213  
		ajaxSendPost(getLnrBkgFrtArListBkg, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgFrtList&f_frt_tp=AR&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');
		ajaxSendPost(getLnrBkgFrtApListBkg, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgFrtList&f_frt_tp=AP&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');
		ajaxSendPost(getLnrBkgFrtDcListBkg, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgFrtList&f_frt_tp=DC&f_bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');
	}
	
	tab4click = "Y";
}

function getLnrBkgFrtArList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			setLnrBkgFrt(docObjects[5], "", doc[1]);
		}
	}
	
	setBlFrtCopy(docObjects[5], '', 'S', 'O', 'H');
	
	for(var i=2; i<=docObjects[5].LastRow(); i++){
		docObjects[5].SetCellImage(i, "fr_att_file_1", 0);
	}
	
	docObjects[5].SetBlur();
}

function getLnrBkgFrtApList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			setLnrBkgFrt(docObjects[6], "b_", doc[1]);
		}
	}
	
	setBlFrtCopy(docObjects[6], 'b_', 'S', 'O', 'M');
	
	for(var i=2; i<=docObjects[6].LastRow(); i++){
		docObjects[6].SetCellImage(i, "b_fr_att_file_1", 0);
	}
	
	docObjects[6].SetBlur();
}

function getLnrBkgFrtDcList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			setLnrBkgFrt(docObjects[13], "dc_", doc[1]);
		}
	}
	
	setBlFrtCopy(docObjects[13], 'dc_', 'S', 'O', 'M');
	
	for(var i=2; i<=docObjects[13].LastRow(); i++){
		docObjects[13].SetCellImage(i, "dc_fr_att_file_1", 0);
	}
	
	docObjects[13].SetBlur();
}


function getLnrBkgFrtArListBkg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			setLnrBkgFrtBkg(docObjects[5], "", doc[1]);
		}
	}
	
	//setBlFrtCopy(docObjects[5], '', 'S', 'O', 'H');
	
	cnfCntr('SD');
	mutiSheetOnSearchEnd(docObjects[5], 0, '', '1', '');
	
	for(var i=2; i<=docObjects[5].LastRow(); i++){
		docObjects[5].SetCellImage(i, "fr_att_file_1", 0);
	}	
}

function getLnrBkgFrtApListBkg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			setLnrBkgFrtBkg(docObjects[6], "b_", doc[1]);
		}
	}
	
	//setBlFrtCopy(docObjects[6], 'b_', 'S', 'O', 'M');
	
	cnfCntr('BC');
	mutiSheetOnSearchEnd(docObjects[6], 0, '', 2, 'b_');
	
	for(var i=2; i<=docObjects[6].LastRow(); i++){
		docObjects[6].SetCellImage(i, "b_fr_att_file_1", 0);
	}	
}

function getLnrBkgFrtDcListBkg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			setLnrBkgFrtBkg(docObjects[13], "dc_", doc[1]);
		}
	}
	
	//setBlFrtCopy(docObjects[13], 'dc_', 'S', 'O', 'M');
	
	cnfCntr('DC');
	mutiSheetOnSearchEnd(docObjects[13], 0, '', 2, 'dc_');
	
	for(var i=2; i<=docObjects[13].LastRow(); i++){
		docObjects[13].SetCellImage(i, "dc_fr_att_file_1", 0);
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
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(13);   //grid가 생성되지않았으면 생성(속도개선)
	docObjects[5].SetColProperty("fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[6].SetColProperty("b_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	docObjects[13].SetColProperty("dc_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
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

function setLnrBkgFrtBkg(sheetObj, objPfx, rtnValue){
	var rtnArrList=rtnValue.split("@;;@");
	
	for(var i=0 ; i<rtnArrList.length-1 ; i++){
		var rtnArr=rtnArrList[i].split("@^^@");
		var intRows = sheetObj.DataInsert();
		
		sheetObj.SetCellValue(intRows, objPfx+'fr_frt_cd', 			rtnArr[0], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_frt_cd_nm', 		rtnArr[1], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_trdp_cd', 		rtnArr[2], 0);
		sheetObj.SetCellValue(intRows, objPfx+'fr_trdp_nm', 		(rtnArr[3]== "null"?"":rtnArr[3]) , 0);
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
		
		
		sheetObj.SetCellValue(intRows, objPfx+"fr_inv_no","",0);		
		sheetObj.SetCellValue(intRows, objPfx+"fr_buy_inv_no","",0);		
		sheetObj.SetCellValue(intRows, objPfx+"fr_inv_sts_cd","",0);		
		sheetObj.SetCellValue(intRows, objPfx+"fr_inv_sts_nm","",0);		
		sheetObj.SetCellValue(intRows, objPfx+"fr_inv_seq","",0);		
		sheetObj.SetCellValue(intRows, objPfx+"fr_trf_dtl_seq",0,0);	
		sheetObj.SetCellValue(intRows, objPfx+"fr_ibflag","I",0);	
		sheetObj.SetCellValue(intRows, objPfx+"fr_auto_trf_flg","N",0);	
		//sheetObj.SetCellValue(intRows, objPfx+"fr_inv_xcrt_dt","",0);
		//sheetObj.SetCellValue(intRows, objPfx+"fr_trdp_cd","",0);	
		//sheetObj.SetCellValue(intRows, objPfx+"fr_trdp_nm","",0);		
	}
}

/** #52165 [Globe Runner] HBL > MBL Create **/
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
function setPost_date(save_flag){
	var formObj=document.frm1;
	if(save_flag == "I"){
		if(ofc_post_dt=="ETD"){
			formObj.post_dt.value=formObj.etd_dt_tm.value;
		} else if(ofc_post_dt=="ETA"){
			formObj.post_dt.value=formObj.eta_dt_tm.value;
		//25273 OFC_CD변경시 TODAY에 대한 고려가 없어서 추가
		} else if(ofc_post_dt=="TODAY"){
			//LHK, 20140924 #43960 [DYNAMIC] Post Date 변경
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
	
	//Update 인 경우  post date 가 변경된 경우에만 post date 비교 처리로직 적용.
	if(save_flag == "U"){
		if(formObj.post_dt.value == formObj.org_post_dt.value){	
			return;
		}
	}
	
	//2016.04.18 C.W.Park Modified
	//#52109 office별 block_date 확인
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	
	var param = ""; //flag는 'I' 만 들어옴. 따라서 로그인 ofc_cd의 max_blck_dt를 가져옴
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt&searchOfcCd=' + param, './GateServlet.gsl');
	if(formObj.post_dt.value == ""){
		formObj.post_dt.value=NEXT_BLOCK_DT;
	}
	if(formObj.post_dt.value == ""){
		alert(getLabel("SEA_COM_ALT027"));
		return;
	}
	if(NEXT_BLOCK_DT != "") { 
		//post_dt 와 block_dt 비교
//		fromDate > toDate true
		if(compareTwoDate(NEXT_BLOCK_DT, formObj.post_dt.value)){
			formObj.post_dt.value=NEXT_BLOCK_DT;
		}
	}
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
function searchDim(name, obj){
	var formObj=document.frm1;
	if(obj.name == "mk_dim"){
		//show_mk_flg=true;
	}
	if(obj.name == "desc_dim"){
		//show_desc_flg=true;
	}
	var unitCd = frm1.size_ut_cd[0].checked?"CM":"IN";
	//pck_ut_nm
	var headerStr = document.getElementsByName("pck_ut_cd")[0]; 
	var packageCd = headerStr.options[headerStr.selectedIndex].text;
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	switch(name){
		case "MK_DIM":
			for(var i=1 ; i<docObjects[1].LastRow() + 1 ; i++){
				formObj.mk_txt.value += "\r\n";
				formObj.mk_txt.value += docObjects[1].GetCellValue(i, "dim_len_dim") + unitCd + ' X ' + docObjects[1].GetCellValue(i, "dim_wdt_dim")+ unitCd  + ' X ' + docObjects[1].GetCellValue(i, "dim_hgt_dim")+ unitCd  + ' ' + docObjects[1].GetCellValue(i, "dim_pce_qty") + packageCd;
			}
		break;
		case "DESC_DIM":
			// #4842 [JH] Mark& desc button function
			if ( frm1.rep_cmdt_nm.value != "" ) {
				formObj.desc_txt.value += "\r\n" + frm1.rep_cmdt_nm.value;
			}
			for(var i=1 ; i<docObjects[1].LastRow() + 1; i++){
				formObj.desc_txt.value += "\r\n";
				formObj.desc_txt.value += docObjects[1].GetCellValue(i, "dim_len_dim") + unitCd + ' X ' + docObjects[1].GetCellValue(i, "dim_wdt_dim") + unitCd + ' X ' + docObjects[1].GetCellValue(i, "dim_hgt_dim") + unitCd + '  ' + docObjects[1].GetCellValue(i, "dim_pce_qty") + packageCd;
			}
		break;
	}
}


function sheet6_OnBeforeEdit(sheetObj,Row, Col){
	if(sheetObj.ColSaveName(Col) == 'item_rmk'){
		sheetObj.SetRowHeight(Row, 75);
	} else {
		sheetObj.SetRowHeight(Row, 26);
	}
}
function sheet6_OnAfterEdit(sheetObj,Row, Col){
	if(sheetObj.ColSaveName(Col) == 'item_rmk'){
		var cellStr = sheetObj.GetCellValue(Row,Col);		
		var rowVal = (cellStr.match(/\n/g) == null ? 1 : cellStr.match(/\n/g).length +1) * 20;
		sheetObj.SetRowHeight(Row, rowVal);
	}
}

function sheet11_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="modi_usrid"){
		gridAdd(8);
		sheetObj.SelectCell(row+1, 1);
	}
}

function sheet15_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="udf_val"){
		gridAdd(14);
		sheetObj.SelectCell(row+1, 0);
	}
}

//#2165 [BINEX VISIBILITY] Costco TW Visibility 기능 요청 (S)
function sheet15_OnChange(sheetObj, row, col, value) {

	var colName = sheetObj.ColSaveName(col);

	if(colName == "udf_cd" || colName == "udf_val") {
		if(sheetObj.GetCellValue(row, "udf_cd") == 'RE' && sheetObj.GetCellValue(row, "udf_val") != '') {
 		   //#3145 [BINEX VISIBILITY] LOADING FOREVER ON OE (COSTCOTW)
		    if(!chkRetaDate(sheetObj.GetCellValue(row, "udf_val"), row)){
				alert(getLabel('FMS_COM_ALT040'));
				sheetObj.SetCellValue(row, 'udf_val', '');
			}
		}

        // OFVFOUR-7439: [Binex-Vis] Adding new column(user defined) into Ocean Export Visibility
        if(sheetObj.GetCellValue(row, "udf_cd") == 'WHP' && sheetObj.GetCellValue(row, "udf_val") != '') {
           //#3145 [BINEX VISIBILITY] LOADING FOREVER ON OE (COSTCOTW)
            if(!chkRetaDate(sheetObj.GetCellValue(row, "udf_val"), row)){
                alert(getLabel('FMS_COM_ALT040'));
                sheetObj.SetCellValue(row, 'udf_val', '');
            }
        }
        
      //OFVFOUR-7838: [Miragrown] Date Format on Custom
		if((sheetObj.GetCellValue(row, "udf_cd") == 'PU'||sheetObj.GetCellValue(row, "udf_cd") == 'PL') && sheetObj.GetCellValue(row, "udf_val") != '') {
			    if(!(sheetObj.GetCellValue(row, "udf_val").indexOf("/") > 0 
			    		&& dateValid(sheetObj.GetCellValue(row, "udf_val"))
			    		&& sheetObj.GetCellValue(row, "udf_val").length == 10)){
					alert(getLabel('FMS_COM_ALT170'));
					sheetObj.SetCellValue(row, 'udf_val', '');
				}
		}
	}
}
//#2165 [BINEX VISIBILITY] Costco TW Visibility 기능 요청 (E)

//#3145 [BINEX VISIBILITY] LOADING FOREVER ON OE (COSTCOTW)
function chkRetaDate(str, sRow){
	
	var sheetObj = docObjects[14];
	
	var tmpDate = str.replaceAll('-', '')
	
	sheetObj.SetCellValue(sRow, 'udf_val', tmpDate.substring(0, 2) + "-" + tmpDate.substring(2, 4) + "-" + tmpDate.substring(4, 8), 0)
	
	var validFlag = false;
	
	//#3145
	if(tmpDate.length < 8){
		validFlag = false;
	}else{
		if(inNumValid(tmpDate.substring(0, 2)) && inNumValid(tmpDate.substring(2, 4))){
			var tmpMM = parseInt(tmpDate.substring(0, 2));
			var tmpDD = parseInt(tmpDate.substring(2, 4));
			var tmpYY = parseInt(tmpDate.substring(4, 8));
			
	        if((tmpMM > 0 && tmpMM < 13) && (tmpDD > 0 && tmpDD <= 31) && 1900 < tmpYY){
	        	validFlag = true;
	            if(tmpMM == 2 && tmpDD >= 30){
	                validFlag = false;
	            }
	        }
		}else{
			validFlag = false;
		}
	}
	
	return validFlag;
}

// #571 - [BINEX Visibility Task]PO, BKG, MBL 입력 간소화
function searchCustItem(reqVal){
	var formObj = document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				fnSetIBsheetInit(11);   //grid가 생성되지않았으면 생성(속도개선)
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
		for(var i=2; i<=docObjects[5].LastRow(); i++){
			docObjects[5].SetCellImage(i, "fr_att_file_1", 0);
		}
	}else if(type == "DC"){
		for(var i=2; i<=docObjects[13].LastRow(); i++){
			docObjects[13].SetCellImage(i, "dc_fr_att_file_1", 0);
		}
	}else{
		for(var i=2; i<=docObjects[6].LastRow(); i++){
			docObjects[6].SetCellImage(i, "b_fr_att_file_1", 0);
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
		ajaxSendPost(getRoleInvt, 'reqVal', '&goWhere=aj&bcKey=checkHouseRoleInvAj&user_id='+usrId+"&intg_bl_seq="+intgBlSeq, './GateServlet.gsl');
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

/* #2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB No., HB/L No생성 로직 */
function setBkgNoFlg(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		bkg_new_hbl_no_flg = doc[1];
	}else{
		bkg_new_hbl_no_flg = "N";
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

//#1174 [BNX] Sales PIC based on Sales type does not simultaneously update
function changeSalesType(){
	
	var formObj=document.frm1;
	
	var chk_trdp_cd = "";
	var chk_partner_yn = "";
	var chk_cur_bizTp = "H";

	if(formObj.nomi_flg.value == "Y"){				
		chk_trdp_cd = formObj.prnr_trdp_cd.value;
		chk_partner_yn = "Y"
	}else{
		chk_trdp_cd = formObj.act_shpr_trdp_cd.value;
		chk_partner_yn = "N"
	}

	setSalesMan(chk_trdp_cd,chk_partner_yn,chk_cur_bizTp);
}




/*HBL 생성 후, Booking No 지정시, HBL 컨테이너 리스트에 있는 컨테이너를 Customer Booking에 있는 컨테이너와 비교해
컨테이너 #와 TPSZ가 같으면, Customer Booking 컨테이너 기준으로 업데이트하는 function
HSK
*/
function updateRefCntr(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpList=doc[1].split("@;;@");
 			var intRows=docObjects[2].LastRow() + 1;
 			
 			var pck_qty = 0;
 			var cgo_kg_wgt = 0;
 			var cgo_lb_wgt = 0;
 			var cgo_cbm_meas = 0;
 			var cgo_cft_meas = 0;
 			
 			var cnt=0;
 			
 			
 			for(var i=0 ; i<tmpList.length-1 ; i++){
				var tmp=tmpList[i].split("@^^@");
				
				//MBL에서 가져온 CNTR의 개수가 1개 이상이면 비교
				if(docObjects[2].LastRow() > 0) {
					
					for(var j=1; j<docObjects[2].LastRow() + 1 ; j ++) {
						
						if(tmp[0] == docObjects[2].GetCellValue(j,"cntr_no") && tmp[1] == docObjects[2].GetCellValue(j,"cntr_tpsz_cd")){
							docObjects[2].SetCellValue(j, 'cgo_pck_qty',tmp[2]);
							docObjects[2].SetCellValue(j, 'cgo_pck_ut',tmp[3]);
							docObjects[2].SetCellValue(j, 'cgo_wgt',tmp[4]);
							docObjects[2].SetCellValue(j, 'cgo_wgt1',tmp[5]);
							docObjects[2].SetCellValue(j, 'cgo_meas',tmp[6]);
							docObjects[2].SetCellValue(j, 'cgo_meas1',tmp[7]);
							
							docObjects[2].SetCellValue(j, 'm_cgo_pck_qty',tmp[2]);
							docObjects[2].SetCellValue(j, 'm_cgo_pck_ut',tmp[3]);
							docObjects[2].SetCellValue(j, 'm_cgo_wgt',tmp[4]);
							docObjects[2].SetCellValue(j, 'm_cgo_wgt1',tmp[5]);
							docObjects[2].SetCellValue(j, 'm_cgo_meas',tmp[6]);
							docObjects[2].SetCellValue(j, 'm_cgo_meas1',tmp[7]);
							
							cnt++;
						}
						
					}					
				} else {
				//MBL에서 가져온 CNTR의 개수가 0개면 비교 끝.
					break;
				}
			}
 			
 			//cnt>0 면, Booking의 Cntr 정보로 HBL CNTR이 업데이트 된 것이므로, Shipment&Item에 CNTR summury 정보 업데이트
 			if(cnt>0){
 				for(var i=1; i < docObjects[2].LastRow() +1; i++){
 					pck_qty += parseFloat(docObjects[2].GetCellValue(i,'cgo_pck_qty'));
 					cgo_kg_wgt += parseFloat(docObjects[2].GetCellValue(i,'cgo_wgt'));
 					cgo_lb_wgt += parseFloat(docObjects[2].GetCellValue(i,'cgo_wgt1'));
 					cgo_cbm_meas += parseFloat(docObjects[2].GetCellValue(i,'cgo_meas'));
 					cgo_cft_meas += parseFloat(docObjects[2].GetCellValue(i,'cgo_meas1'));
 				}
 				
 			    frm1.pck_qty.value=doMoneyFmt(Number(pck_qty).toFixed(0));
 			    frm1.grs_wgt.value=doMoneyFmt(Number(cgo_kg_wgt).toFixed(2));
 			    frm1.grs_wgt1.value=doMoneyFmt(Number(cgo_lb_wgt).toFixed(2));
 			    frm1.meas.value=doMoneyFmt(Number(cgo_cbm_meas).toFixed(3));
 			    frm1.meas1.value=doMoneyFmt(Number(cgo_cft_meas).toFixed(0));
 				
 			}
		}			
	}
}

//#2354 [PATENT] House Bill Based - Processing Logic Enhancement
function checkRouteChange(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined' && doc[1] == "N"){
			alert(getLabel('SEA_COM_ALT038'));
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

/* #3356 [JTC]HB/L Form 개발 */
function setHblCheckPodUsTri(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && typeof doc[1] != "undefined" && doc[1] == "Y"){
		hbl_check_pod_us_tri_flg = "Y";
	}else{
		hbl_check_pod_us_tri_flg = "N";
	}
}

/* #3356 [JTC]HB/L Form 개발 */
var chkTri = true;
function getPodCntCd(reqVal){
	chkTri = true;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var dtlArray = doc[1].split("@@^^@@");
			//alert(dtlArray[0]);
			//alert(dtlArray[1]);
			
			if(dtlArray[0] == "US")
			{
				if(dtlArray[1] == "" || dtlArray[1] == null || dtlArray[1] == "null")
				{    
					 //var chkCnt =0;	
/*					 for(var j=1; j<=docObjects[14].LastRow(); j++){
						//console.log(docObjects[14].GetCellValue(j,'udf_cd'));
						//console.log(docObjects[14].GetCellValue(j,'udf_val'));
						if(docObjects[14].GetCellValue(j,'udf_cd') == "TRI"){
							chkCnt += 1;
							if(docObjects[14].GetCellValue(j,'udf_val') == ""){
								chkTri =false;
							}
						}
					}*/
					 if(frm1.tli_no.value == ""){
						 chkTri =false;
					 } 
/*					 if(chkCnt < 1){
						 chkTri =false;
					 }*/
				}
			}
			
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

//#2284 CLC request -- change the "HBL add" button logic
function copyFromMBL(){
	if(frm1.intg_bl_seq.value!=''){
		ajaxSendPost(getMblDesc, 'reqVal', '&goWhere=aj&bcKey=getMblDescList&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
	}
}
function getMblDesc(reqVal){
	
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	
	formObj.mk_txt.value   = '';
	formObj.desc_txt.value = '';
	
	if(doc[0]=='OK'){
		
		if(typeof(doc[1])!='undefined'){
			
			var dataArr = new Array();
			
			dataArr = doc[1].split('^@');
			formObj.desc_txt.value = dataArr[1];
			formObj.mk_txt.value   = dataArr[0];
		}
	}	
	else{
		// SEE_BMD_MSG43
		refCheck=false;
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
	//console.log(seqArr.reverse()[0]);
	//console.log(seqArr.reverse()[0]);
	//console.log(seqArr.reverse()[0]);
  //var newArr = seqArr.reverse(); 
	//console.log(newArr);
	//console.log(newArr[0]);
	//alert(frm1.intg_bl_seq.value);
	

	
	var frItem = [];
	frItem.push({
		fr_frt_seq    : sheetObj.GetCellValue(currRow,objPfx+'fr_frt_seq'),     
		//fr_cmb_inv_no : sheetObj.GetCellValue(currRow,objPfx+'fr_cmb_inv_no'),
		//fr_inv_seq    : sheetObj.GetCellValue(currRow,objPfx+'fr_inv_seq'),
		fr_cmb_inv_seq: sheetObj.GetCellValue(currRow,objPfx+'fr_cmb_inv_seq'),
		fr_trdp_cd    : sheetObj.GetCellValue(currRow,objPfx+'fr_trdp_cd'),
		intg_bl_seq   : frm1.intg_bl_seq.value,
		cmb_inv_no    : frm1.mk_bl_no.value //OOEH-800276
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

/**
* Task No. : #1543
* Author : Huy.Mai
* Date : 2017/09/07
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
//				sheetObj.SetCellEditable(rowIdx,"air_flow",1);
//				sheetObj.SetCellEditable(rowIdx,"air_flow_unit",1);
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

function fncWOSearch() {
	var formObj  = document.frm1;
	
	if ( event.keyCode == 13 && formObj.reserve_field03.value != null ) {
		rtnary=new Array(2);
		rtnary[0]=formObj.reserve_field03.value;
		rtnary[1]='';
		rtnary[2]='';
		callBackFunc = "woOpenPopUp_callBackFunc1";
		modal_center_open('./CMM_POP_0350.clt', rtnary, 756,480,"yes");
	}else if(event.keyCode == 9 && formObj.reserve_field03.value != null){
		checkWONo();
	}
}

//#3376 [JTC] Japan Trust 용 Profit Report 개발
function laneCdChange(){
	var formObj=document.frm1;
	formObj.svc_lane_nm.value = formObj.lane_cd.options[formObj.lane_cd.selectedIndex].text;
}

function checkWONo(){
	if(frm1.reserve_field03.value!=""){
		ajaxSendPost(getWONoInfo, 'reqVal', '&goWhere=aj&bcKey=getWONoInfo&f_wo_no='+frm1.reserve_field03.value, './GateServlet.gsl');
	}else{
		frm1.reserve_field03.value = "";
	}
}

function getWONoInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var result = doc[1].split('^^');
			frm1.reserve_field03.value=result[0];
			frm1.pck_qty.value=doMoneyFmt(Number(result[1]));
			frm1.pck_ut_cd.value=result[2];
			frm1.grs_wgt.value=doMoneyFmt(Number(result[3]).toFixed(obl_decimal_len));
			frm1.grs_wgt1.value=doMoneyFmt(Number(result[4]).toFixed(obl_decimal_len));
			frm1.meas.value=doMoneyFmt(Number(result[5]).toFixed(obl_decimal_len));
			frm1.meas1.value=doMoneyFmt(Number(result[6]).toFixed(obl_decimal_len));
			frm1.shpr_trdp_cd.value=result[7];
			frm1.shpr_trdp_nm.value=result[8];
			frm1.shpr_trdp_addr.value=result[9];
			frm1.cnee_trdp_cd.value=result[10];
			frm1.cnee_trdp_nm.value=result[11];
			frm1.cnee_trdp_addr.value=result[12];
			frm1.prnr_trdp_cd.value=result[13];
			frm1.prnr_trdp_nm.value=result[14];
			frm1.prnr_trdp_addr.value=result[15];
			//Dimension Info
			ajaxSendPost(getDimInfo, 'reqVal', '&goWhere=aj&bcKey=getDimInfo&intg_bl_seq='+result[0], './GateServlet.gsl');
		}else{
			frm1.reserve_field03.value = "";
			frm1.pck_qty.value = "0";
			frm1.pck_ut_cd.value = "CT";
			frm1.grs_wgt.value = "0.00";
			frm1.grs_wgt1.value = "0.00";
			frm1.meas.value= "0.000";
			frm1.meas1.value= "0.000";
			frm1.shpr_trdp_cd.value = "";
			frm1.shpr_trdp_nm.value = "";
			frm1.shpr_trdp_addr.value = "";
			frm1.cnee_trdp_cd.value = "";
			frm1.cnee_trdp_nm.value = "";
			frm1.cnee_trdp_addr.value = "";
			frm1.prnr_trdp_cd.value = "";
			frm1.prnr_trdp_nm.value = "";
			frm1.prnr_trdp_addr.value = "";
			//Dimension Info
			ajaxSendPost(getDimInfo, 'reqVal', '&goWhere=aj&bcKey=getDimInfo&intg_bl_seq='+'', './GateServlet.gsl');
		}  
	}else{
		frm1.reserve_field03.value = "";
		frm1.pck_qty.value = "0";
		frm1.pck_ut_cd.value = "CT";
		frm1.grs_wgt.value = "0.00";
		frm1.grs_wgt1.value = "0.00";
		frm1.meas.value= "0.000";
		frm1.meas1.value= "0.000";
		frm1.shpr_trdp_cd.value = "";
		frm1.shpr_trdp_nm.value = "";
		frm1.shpr_trdp_addr.value = "";
		frm1.cnee_trdp_cd.value = "";
		frm1.cnee_trdp_nm.value = "";
		frm1.cnee_trdp_addr.value = "";
		frm1.prnr_trdp_cd.value = "";
		frm1.prnr_trdp_nm.value = "";
		frm1.prnr_trdp_addr.value = "";
		//Dimension Info
		ajaxSendPost(getDimInfo, 'reqVal', '&goWhere=aj&bcKey=getDimInfo&intg_bl_seq='+'', './GateServlet.gsl');
	}
}


//#3572 Japan Trust OEM/OEH Entry Fright Default
function setFreight(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		if(doc[1] =='Y') {
			formObj.frt_term_a_cd.value='CC';
			//#4189 [JAPT] OEH B/L, set selling rate as prepaid default,
			formObj.frt_term_c_cd.value='CC';
		}else if(doc[1] =='N'){
			formObj.frt_term_a_cd.value='PP';
			formObj.frt_term_c_cd.value='PP';
		}else if(doc[1] =='PC'){ //#5219를 위한 #4189 [JAPT] OEH B/L, set selling rate as prepaid default 재처리
			formObj.frt_term_a_cd.value='PP';
			formObj.frt_term_c_cd.value='CC';
		}else if(doc[1] =='CP'){ //#5219를 위한 #4189 [JAPT] OEH B/L, set selling rate as prepaid default 재처리
			formObj.frt_term_a_cd.value='CC';
			formObj.frt_term_c_cd.value='PP';
		}
	}
}

function setFclDescTxt1() {
	var formObj=document.frm1;
	
	//#3820 [JAPT] specific package showing in description.
	var tmpStr = "";
	if(formObj.shp_mod_cd.value=="FCL") {
		tmpStr=formObj.h_sea_fcl_desc.value;
	}else if(formObj.shp_mod_cd.value=="LCL" || formObj.shp_mod_cd.value=="FAK") {
		tmpStr=formObj.h_sea_lcl_desc.value;
	}else{
		tmpStr="";
	}
	
	/*
	if(OEH_SAID_DESC_PRT_QTY == "S") {
		formObj.desc_txt1.value = tmpStr;
		
	}else if (OEH_SAID_DESC_PRT_QTY == "D") {
		
		var tmp ='';
		if(tmpStr != null ){
			if(tmpStr.indexOf('%PKG%') > -1){
				tmp += formObj.pck_qty.value;
				tmp += ' ' + formObj.pck_ut_cd.options[formObj.pck_ut_cd.selectedIndex].text;
				tmpStr = tmpStr.replace('%PKG%', tmp);
			}
		}
		
		formObj.desc_txt1.value = tmpStr;
	}
	*/
	//#3820 [JAPT] specific package showing in description.
	var tmp ='';
	if(tmpStr != null ){
		if(tmpStr.indexOf('%PKG%') > -1){
			tmp += formObj.pck_qty.value;
			tmp += ' ' + formObj.pck_ut_cd.options[formObj.pck_ut_cd.selectedIndex].text;
			tmpStr = tmpStr.replace('%PKG%', tmp);
		}
	}
	
	formObj.desc_txt1.value = tmpStr;	
	
}


//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
function sheet5_OnCheckAllEnd(sheetObj, col, val) {
	
	if(sheetObj.ColSaveName(col) == "Del"){
		var itemObj = docObjects[3];
		comCntrList_OnCheckAllEnd(sheetObj, col, val , itemObj);
	}
	
	cntrInfoSet(docObjects[2]);
	
}


//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
function sheet5_OnBeforeCheckAll(sheetObj, row, col) {
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
	var opt_key = "PCK_VAL_OEH";
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
//OFVFOUR-7340: [JH Logistics] Customer copy option
function setAutoSelectShipper(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" && doc[1] == "N"){
		auto_select_shipper = "N";
	}else{
		auto_select_shipper = "Y";
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