/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AII_BMD_0020.js
*@FileTitle  : 항공 수입 HGBL등록
*@author     : CLT
*@version    : 1.0
*@since      : 2014/08/14
=========================================================*/
var loadDataProcess ="";//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
var rcpListSheet=false;
var docListSheet=false;
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
var dimListSheet=false;
var frtSdSheet=false;
var frtBcSheet=false;
var frtDcSheet=false;
var jobListSheet=false;
var cmdtListSheet=false;
var isError=false;
var isInvStsOk=false;
var ccn_dupl=false;
var mblCreate =false;
var isMBLCreated = false;
var vIntgBlModiTms;
var creditOver = false;
var delete_show_complete = "N";
var isPdOrdStsOk = false;
var creditOver_flg = false;
//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	isError=false;
    var sheetParam='';
    fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
    var docListParam=docObjects[4].GetSaveString(false);
    if(docListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= docListParam;
    	docListSheet=true;
	}       
	/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim Start */
    fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
    var dimListParam=docObjects[7].GetSaveString(false);
    if(dimListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= dimListParam;
        dimListSheet=true;
    } 
    /* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim End */
    fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
    var frtSdListParam=docObjects[1].GetSaveString(false);
    if(frtSdListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[1], '');
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtSdListParam=docObjects[1].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtSdListParam;
    	frtSdSheet=true;
	}
    fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
    var frtBcListParam=docObjects[2].GetSaveString(false);
    if(frtBcListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[2], 'b_')
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtBcListParam=docObjects[2].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtBcListParam;
    	frtBcSheet=true;
	}
    fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
    var frtDcListParam=docObjects[6].GetSaveString(false);
	if(frtDcListParam!=''){
		var rtnFlg=frCheckInpuVals(docObjects[6], 'dc_')
		if(rtnFlg=='IV'){
    		isError=true;
    	}
		frtDcListParam=docObjects[6].GetSaveString(false);
		sheetParam+= '&';
		sheetParam+= frtDcListParam;
		frtDcSheet=true;
	}
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	var jobListParam=docObjects[3].GetSaveString(false);
    if(jobListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= jobListParam;
        jobListSheet=true;
    }
    fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
    var cmdtListParam=docObjects[9].GetSaveString(false);
	if(cmdtListParam!=''){
		isError=itemCheckInpuVals(docObjects[9]);
		if(!isError){
	    	sheetParam+= '&';
	    	sheetParam+= cmdtListParam;
	    	cmdtListSheet=true;
		}
	}
    /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
    if(isError == true)
    {
    	return true;
    }      
	return sheetParam;
}
var rtnary=new Array(2);
var callBackFunc = "";
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

				//OFVFOUR-7899: [Matrix] Set mandatory field in OIH, AEH, AIH B/L entry
				if (IncotermsCode == "Y") {
					if (!document.frm1.inco_cd.value)
					{
						ComShowCodeMessage('COM0789');
						document.frm1.inco_cd.focus();
						break;
					}
				}

            //#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
            if(edob_flg =='N' && (getStringLength(frm1.ref_no.value) != 0)){
              if(ofc_cd != $("input[name=ref_ofc_cd]").val()){
                alert(getLabel('AIR_MSG_119')+'\n\n' + 'B/L Office: ' + frm1.ref_ofc_cd.value + ', Your Office: ' + ofc_cd);
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
        	
        		//OFVFOUR-6866 - [BNX-LA] Selecting multi-Warehouse Receipt from B/L Entry screen (Zen#3533)
				if(multiWhFlg=="Y"){
			    	updateMultiWh_recp_no('AI');
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
	      case "HBL_ADD":	//등록
	    	  var asRef_no     = frm1.ref_no.value;
	          var asCcn_no     = frm1.ccn_no.value;
              var asMnf_fr_loc = frm1.mnf_fr_loc.value;
	          var asMnf_to_loc = frm1.mnf_to_loc.value;
	        	
	          var paramStr="./AII_BMD_0020.clt?";
	        	  paramStr+= "f_mbl_ref_no=" + asRef_no;
	        	  paramStr+= "&f_pre_ccn_no=" + asCcn_no;
	        	  paramStr+= "&f_mnf_fr_loc=" + asMnf_fr_loc;
	        	  paramStr+= "&f_mnf_to_loc=" + asMnf_to_loc;
	        	  parent.mkNewFrame('AIH AWB Entry', paramStr);
	          break;            		
           case "SAVE_ADD":	//등록
        	   frm1.f_cmd.value=ADD;
        	   if(blCheckInpuValsForAdding()){

        		   frm1.bl_no.value=trim(frm1.bl_no.value);
        		   frm1.ref_no.value=trim(frm1.ref_no.value);

        		   if(!mblCreate){
	        		   if(!etdRangeOk){
	        			   // [Warning] ETD is outside range of 6 months from
	        			   // today. \nPlease kindly check ETD again.
	        			   alert(getLabel('FMS_COM_ALT021'));	
	        		   }
	        		   if(!etaRangeOk){
	        			   // [Warning] ETA is outside range of 6 months from
	        			   // today. \nPlease kindly check ETD again.
	        			   alert(getLabel('FMS_COM_ALT021'));	
	        		   }
        		   }
        		   //MBL이 없는 경우(ref_no == null)	
        		   // HBL > MBL Create 로직 주석처리하기로 함 2016.11.29
            	   /*if(getStringLength(frm1.ref_no.value) == 0){
        			   
        			   // #52165 [Globe Runner] HBL > MBL Create
            		   if (confirm(getLabel('FMS_COM_CFMMBLCRE'))){
            			   setPost_date("I");
    				       srOpenPopUp('CREATE_MBL_POPLIST_AIH',this);
            			   mblCreate = true;
            		   } else {
            			   moveTab('01');
            			   frm1.ref_no.focus();
            			   return;
            		   }
        			   
        		   }else{*/
        			   if (!checkHblRefNo('A','I')) { // #43380 HBL 저장시 Filing
        				   return;
        			   }
        			   ajaxSendPost(getHblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=A&f_bnd_clss_cd=I&f_biz_clss_cd=H&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');
        		   //}
        	   }
        	   break;
           case "MBLADD":
				rtnary=new Array(1);
				rtnary[0]='A';
				rtnary[1]='I';
				var rtnVal=window.showModalDialog('./CMM_POP_0180.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
				if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				}else{
					var rtnValAry=rtnVal.split("|");
					if(rtnValAry[0]!=''){
						frm1.mbl_no.value=rtnValAry[0];//house_bl_no
						ajaxSendPost(getMblImpInfo, 'reqVal', '&goWhere=aj&bcKey=getAirBlSmry&airSeaClssCd=A&f_biz_clss_cd=M&f_intg_bl_seq='+rtnValAry[1], './GateServlet.gsl');
					}
				}
           break;
           case "SAVE_MODIFY":	//등록
        	   //doSumCgoRt();
               frm1.f_cmd.value=MODIFY;
               //alert("");
               //if(inpuValCheck(sheetObj, ADD)){
                   //전체 CellRow의 갯수
                   //if(!isError&&confirm(getLabel(saveMsg))){
                	   if(blCheckInpuVals()){
                		   //alert(etdRangeOk);
                		   //return;
                		   
                		   //#48103 remove space
                     	   frm1.bl_no.value=trim(frm1.bl_no.value);
                     	   frm1.ref_no.value=trim(frm1.ref_no.value);
                     		
                		   if (!checkHblRefNo('A','I')) { // #43380 HBL 저장시 Filing No 유효성 체크
                    		   return;
                    	   }                		   
                		   if(!etdRangeOk){
                     			//[Warning] ETD is outside range of 6 months from today. \nPlease kindly check ETD  again.
                     			alert(getLabel('FMS_COM_ALT021'));	
                		   }
	               		   if(!etaRangeOk){
	                 			//[Warning] ETA is outside range of 6 months from today. \nPlease kindly check ETD  again.
	                 			alert(getLabel('FMS_COM_ALT021'));	
	               		   }
                		   if(frm1.h_bl_no.value!=frm1.bl_no.value){
                			   ajaxSendPost(getHblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=A&f_bnd_clss_cd=I&f_biz_clss_cd=H&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');
                		   }
                		   else{
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
                				   docObjects[0].DoAllSave("./AII_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
                			   }
                		   }
                       }
                break;
           case "CLOSE_MODIFY":	//등록
        	   
	   	     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정 
	   	     	if(!chkIntgBlModiTms(srcName)){
	   	     	   return;
	   	     	}			
   	     	
        	   frm1.f_cmd.value=COMMAND10;
        	   if(confirm(getLabel(saveMsg))){
		    	   gridAdd(0);
				   docObjects[0].SetCellValue(1, 1,1);
				   frm1.f_bl_no.value=frm1.bl_no.value;
        		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
        		   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}					   
				   doShowProcess();
				   //docObjects[0].DoAllSave("./AII_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
				   docObjects[0].DoAllSave("./AII_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
        	   }
		   break;
           case "SEARCHLIST":	//조회
			   frm1.f_bl_no.value=trim(frm1.f_bl_no.value);
        	   if(frm1.f_bl_no.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_bl_no.focus();
        		   return;
        	   }else{
        		   
        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
                   frm1.f_cmd.value=SEARCHLIST;
            	   doShowProcess();
            	   //frm1.submit();
            	   submitForm(SEARCHLIST);
        	   }
       	   break;
           case "DOCFILE":	//첨부파일
        		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
        		/**  Document List ==> Common Memo 연동 파라미터 (S) */
        		reqParam += '&palt_mnu_cd=AIH';
        		reqParam += '&opr_no='+frm1.f_bl_no.value;
        		/**  Document List ==> Common Memo 연동 파라미터 (E) */
           		reqParam += '&openMean=SEARCH01';
       	   		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 420, "scroll:no;status:no;help:no;");
      	   break;
           case "SNDEML":	//Email전송
       		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
          		reqParam += '&openMean=SEARCH01';
      	   		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
     	   break;
           case "HBLCNF":	//Booking Confirm
        	   if(confirm(getLabel('FMS_COM_CFMCFM'))){
                   frm1.f_cmd.value=COMMAND03;
                   doShowProcess();
                   fnSetIBsheetInit(0);   //grid가 생성되지않았으면 생성(속도개선)
                   docObjects[0].DoSearch("./AII_BMD_0020GS.clt", FormQueryString(frm1) );
        	   }
       	   break;
           case "HBLCLS":	//Booking Closing
        	   if(confirm(getLabel('FMS_COM_CFMCLS'))){
                   frm1.f_cmd.value=COMMAND04;
                   doShowProcess();
                   fnSetIBsheetInit(0);   //grid가 생성되지않았으면 생성(속도개선)
                   docObjects[0].DoSearch("./AII_BMD_0020GS.clt", FormQueryString(frm1) );
        	   }
       	   break;
           case "COPY":	//조회
        	   //BL_COPY COPY시 컨펌메시지 없이 바로 Submit후 frt Check화면을 보여준다
        	   frm1.f_cmd.value=COMMAND05;
        	   doShowProcess();
        	   frm1.submit();
        	   
        	   /*if(confirm(getLabel('FMS_COM_CFMCPY'))){
                   frm1.f_cmd.value=COMMAND05;
            	  
            	  // frm1.submit();
            	   submitForm(COMMAND05);
            	   doShowProcess();
        	   }*/
        	   break;
	   	 	case "S_DOC":
	   	 		fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
        		var sheetObj3=docObjects[4];	
	   	 		if(sheetObj3.GetTotalRows()> 0){
		   	 		var formObj=document.frm1;
		   	 		formObj.file_name.value='doc_list.mrd';
		   	 		formObj.title.value='Document List';
		   	 		//Parameter Setting
		   	 		var param='[' + formObj.intg_bl_seq.value + ']';			// [1]
		   	 		param += '[AIH]'; 											// [2] MASTER/HOUSE/OTH 여부
		   	 		param += '[' + formObj.bl_no.value + ']';				// [3] MBL_NO/HBL_NO
		   	 		param += '[' + formObj.user_id.value + ']';				// [4]
		   	 		formObj.rd_param.value=param;
		   	 		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
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
	        		   delete_show_complete = "Y";
	                   frm1.f_cmd.value=REMOVE;
	            	   
	            	   //frm1.submit();
	            	   submitForm(REMOVE);
	            	   doShowProcess();
	        	   }
    		   }
    		   else{
    			   //You Cannot delete B/L. Because Invoice was already Issued.
    			   alert(getLabel('FMS_COM_ALT022'));	
    			   return;
    		   }
        	   
        	   
    		   break;
           case "SEARCH_XPT":	//수출신고 번호 조회
          		if(frm1.bl_sts_cd.value!='NA'){
          			searchGrid(1);
          			searchGrid(2);
          			searchGrid(3);
          		}
          		break;
           case "SEARCH_ITEM":	//Item 조회
        		if(frm1.bl_sts_cd.value!='NA'){
        			//Commodity List 조회
       			searchGrid(10);
        		}
        		break;
           case "SEARCH_FRT":	//Freight 조회
       		if(frm1.bl_sts_cd.value!='NA'){
				//Selling/Debit Freight 조회
       			searchGrid(4);
				//Buying/Crebit List 조회
       			searchGrid(5);
       			//Debit/Crebit List 조회
       			searchGrid(8);
    		}
           break;   
           case "SEARCH_JB":	//Job template & History
        	   if(frm1.bl_sts_cd.value!='NA'){
        		 //처리내역( Job temlate에 따라서)   
        		 searchGrid(6);
        		//처리내역( Job temlate에 따라서)
        		 searchGrid(7);
        		 //document
        		 searchGrid(2);
        	   }
      	   break;
      	   //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
           case "SEARCH_WO":	//WORK ORDER 조회
        	   if(frm1.bl_sts_cd.value!='NA'){
				   //Container List 조회
        		   searchGrid(9);
        	   }
        	   break;
           case "WORKORDER":	//Work Order 화면호출
 	           /*var param='f_intg_bl_seq=' + frm1.intg_bl_seq.value;
 		   		   param += '&air_sea_clss_cd=A'; 
 		   		   param += '&bnd_clss_cd=I';
 		   		   param += '&biz_clss_cd=H';
	 		   	   //#34862 - [BINEX]Work Order - Trucker 정보 Link
	 		   	   param += '&delivery_ref_no=' + document.frm1.cust_ref_no.value;
                var paramStr="./AIC_WOM_0017.clt?f_cmd="+SEARCH01+"&s_type=B&"+param;
                parent.mkNewFrame('Pick/Delivery Instruction', paramStr);*/
                
                var paramStr="./AIC_WOM_0017.clt?air_sea_clss_cd=A&bnd_clss_cd=I&biz_clss_cd=H";
                var param = "&f_cmd=" + SEARCH01;
                param += "&s_type=B";
                param += "&f_intg_bl_seq=" + frm1.intg_bl_seq.value;
                param += '&delivery_ref_no=' + frm1.cust_ref_no.value;
                parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
                break;
	   	   case "CALLCT":
	   		   ajaxSendPost(getCtradeAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCtradeKey', './GateServlet.gsl');
		   break;
	       case "ArrivalNotice":
				if(frm1.intg_bl_seq.value==""){
					//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
				}else{
					var intgBlSeq=frm1.intg_bl_seq.value;
					var hblNo=frm1.bl_no.value;
					var custRefNo=encodeURIComponent(frm1.cust_ref_no.value);
					var reqParam='?intg_bl_seq=' + intgBlSeq;
					var filingNo=encodeURIComponent(frm1.ref_no.value);
					var mblNo=encodeURIComponent(frm1.mbl_no.value);
					reqParam += '&hbl_no=' + encodeURIComponent(hblNo);
					reqParam += '&filing_no=' + filingNo;
					reqParam += '&mbl_no=' + mblNo;
					//reqParam += '&cust_ref_no=' + custRefNo;
					reqParam += '&air_sea_tp=' + "A";
					reqParam += '&cgor_pic_info=' + ai_cgor_pic_info;
					reqParam += '&mailTitle=' + 'ARRIVAL NOTICE / INVOICE \[HAWB No : ' + encodeURIComponent(frm1.bl_no.value) + '\]';
	         		reqParam += '&mailTo=' + mailTo;
					popGET('RPT_PRN_0140.clt'+reqParam, '', 480, 290, "scroll:yes;status:no;help:no;");
				}
	       break;
   	       case "PreliminaryClaim":
				var reqParam='?air_sea_tp=' + 'A';
				reqParam += '&intg_bl_seq=' + frm1.intg_bl_seq.value;
				reqParam += '&hbl_no=' + frm1.f_bl_no.value;
				reqParam += '&ref_no=' + frm1.ref_no.value;
				popGET('RPT_PRN_0230.clt'+reqParam, '', 620, 565, "scroll:yes;status:no;help:no;");
			break;	
	   	   //2010.12.20 김진혁 추가, 항공은 set 버튼을 통해 BL의 CBM, C.weight, G.weight 값을 Freight에 반영함.
	   	   case "SET":
	   		   //Freight에 Row가 없으면 set 할 수 없음. 
	   		   fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	   		   fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	   		   if(docObjects[4].RowCount()-2==0 && docObjects[5].LastRow() -1==0){
//	   			   alert('There is no freight information.');
	   			   alert(getLabel('AIR_MSG_083'));	
	   		   }else{
	   			   setFrtAuto(docObjects[4], "");
	   			   setFrtAuto(docObjects[5], "b_");
	   		   }
	   	   break;
	   	   //2012/03/12 Chungrue 추가 GLOVIS EDI
	   	   case "GOALS"://삭제
	   	   // EDI 필수항목을 체크한다.	   
	   	   if(confirm("EDI 전송을 하시겠습니까? ")){
	   		   ajaxSendPost(transGoalsAjaxReq, 'reqVal', '&goWhere=aj&bcKey=transGoals&intg_bl_seq='+frm1.intg_bl_seq.value+'&email='+frm1.email.value, './GateServlet.gsl');
	   	   }
    	   break;
	   	case "COUNTRY_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   	    callBackFunc = "COUNTRY_POPLIST";
	   	    modal_center_open('./CMM_POP_0020.clt', rtnary, 560,445,"yes");
		break;
	   	case "GOTOACCT":
	   		var formObj=document.frm1;
   	 		if(formObj.bl_no.value!=''){
	   		   	var paramStr="./ACC_INV_0040.clt?";
/*	   		   	paramStr+= 's_hbl_no=' + formObj.bl_no.value;
	   		   	paramStr+= '&s_intg_bl_seq=' + formObj.intg_bl_seq.value;
	   		   	paramStr+= "&s_ref_no=" + formObj.ref_no.value;*/
	   		   	
	   			//#34054 [BINEX]B/L List/Entry 에서 AR/AP List Link
   		   		paramStr+= 'f_mhbl_no=' + formObj.bl_no.value
   		   				+"&s_intg_bl_seq="+formObj.intg_bl_seq.value
   		   				+"&f_ref_no="+formObj.ref_no.value;
   		   		paramStr+= "&refType=fileNo";
   		   		paramStr+= "&linkFlag=Y&blType=HBL";	
   		   		
   		   		//#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : Link시 검색기간 제외 조회 옵션처리
				paramStr+= "&linkOpt=KEY";
				// OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
				paramStr+= "&f_air_sea_clss_cd=A&f_bnd_clss_cd=I";
				
	   		   	parent.mkNewFrame('Invoice List', paramStr);
   	 		}
   	 	break;
	   	case "IT_NUM":
	   		var formObj=document.frm1;
	   		if(formObj.bl_no.value!=''){
				ajaxSendPost(getItNextNumReq, 'reqVal', '&goWhere=aj&bcKey=getItNextNum&ofc_cd='+frm1.ref_ofc_cd.value, './GateServlet.gsl');	   		} else{
	   		}
	   		break;
	   	case "CCN_NUM":
	   		var formObj=document.frm1;
	   		// #27537 hbl을 입력하지 않아도 CCN을 취득할 수 있도록 변경 
	   		// hbl_no가 없으면 OFC_CD가 null이므로 USER의 OFC_CD를 취득한다.
	   		var ofcCd=frm1.ref_ofc_cd.value;
   			if(ofcCd == "") {
   				ofcCd=login_user_ofc_cd;
   			}
	   		ajaxSendPost(getCcnNextNumReq, 'reqVal', '&goWhere=aj&bcKey=getCcnNextNum&type=A&ofc_cd='+ofcCd, './GateServlet.gsl');	   		
	   		break;	
	   	/* LHK 20130822 19891 List 버튼 Entry 화면에서도 표시 */
	   	case "DELIVERY_ORDER":
	   		   var formObj=document.frm1;
				var intgBlSeq=formObj.intg_bl_seq.value;
				var hblNo=formObj.bl_no.value;
				var custRefNo=formObj.cust_ref_no.value; 
				var liner_trdp_nm=formObj.act_shpr_trdp_nm.value; 
				var trsp_trdp_cd=formObj.trk_trdp_cd.value; 
				var trsp_trdp_nm=formObj.trk_trdp_nm.value; 
				var cne_trdp_cd=formObj.cnee_trdp_cd.value;
				var reqParam='?intg_bl_seq=' + intgBlSeq;
				reqParam += '&f_bl_no=' + encodeURIComponent(hblNo);
				reqParam += '&cust_ref_no=' + encodeURIComponent(custRefNo); 
				reqParam += '&liner_trdp_nm=' + encodeURIComponent(liner_trdp_nm); 
				reqParam += '&trsp_trdp_cd='+encodeURIComponent(trsp_trdp_cd) ;
				reqParam += '&trsp_trdp_nm='+encodeURIComponent(trsp_trdp_nm);
				reqParam += '&air_sea_clss_cd=A';
				reqParam += '&biz_clss_cd=H';
				reqParam += '&bnd_clss_cd=I';
				reqParam += '&dest_rout_trdp_cd='+cne_trdp_cd; 
				reqParam += '&mrd_file_nm=delivery_order_01.mrd';
				popGET('CMM_POP_0320.clt'+reqParam, '', 700, 750, "scroll:yes;status:no;help:no;");
			break;
	   	 	/* #20428 : [BINEX] A/R, A/P, D/C등이 보이는 화면에서 Profit Report 버튼 추가 (Entry 화면에서) jsjang 2013.9.10 */	
   	 	case "PROFIT_REPORT":
			var reqParam='?intg_bl_seq=' + frm1.intg_bl_seq.value;
				reqParam += '&hbl_no=' + frm1.bl_no.value;
				reqParam += '&ref_no=' + frm1.ref_no.value;
				reqParam += '&air_sea_clss_cd=' + "A";
				reqParam += '&bnd_clss_cd=' + "I";
				reqParam += '&biz_clss_cd=' + "H";
				reqParam += '&mbl_no=' + frm1.mbl_no.value;				
				popGET('RPT_PRN_0200.clt'+reqParam, '', 1100, 750, "scroll:yes;status:no;help:no;");
	   	 	break;
   	 	case "RELEASE_ORDER":
			var intgBlSeq=frm1.intg_bl_seq.value;
			var hblNo=frm1.bl_no.value;
			var custRefNo=frm1.ref_no.value;
			var reqParam='';
			reqParam += '?s_intg_bl_seq=' + intgBlSeq;
			reqParam += '&f_bl_no=' + hblNo;
			reqParam += '&cust_ref_no=' + custRefNo;
			popGET('SEI_DOC_1081.clt'+reqParam, '', 600, 478, "scroll:yes;status:no;help:no;");
			break;
			
        //48218
   	 	case 'AUTHORITY':
   	 		var formObj=document.frm1;
	   	 	if(formObj.bl_no.value!='' && formObj.intg_bl_seq.value !=''){
	   	 		formObj.file_name.value='authority_01.mrd';
	        	formObj.title.value='AUTHORITY TO MAKE ENTRY';
	        	formObj.mailTitle.value = "AUTHORITY TO MAKE ENTRY" + " [HAWB No : " + formObj.bl_no.value + "]";
				//Parameter Setting
	        	var param='[' + formObj.email.value + ']';										// USER EMAIL';	[1]
	        	param += '[' + formObj.intg_bl_seq.value + ']';									// [2]
	        	param += '[' + formObj.ref_ofc_cd.value+'MAINCMP]';								// CURR BRANCH [3]
	        	param += '[' + formObj.usrNm.value + ']';										// [4]
	        	param += '[' + formObj.usrPhn.value + ']';										// [5]
	        	param += '[' + formObj.usrFax.value + ']';										// [6]
				formObj.rd_param.value=param;
				formObj.rpt_biz_tp.value="AIH";
				formObj.rpt_biz_sub_tp.value="AT";
				formObj.rpt_pdf_file_nm.value=getPdfFileNm();
				popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   	 	}
			break;
			
        }
        
		//Log Monitor Start:Btn
		if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
		//Log Monitor End:Btn
		
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
function COUNTRY_POPLIST(rtnVal){
   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.cnt_cd.value=rtnValAry[0];//cd_val
		frm1.cnt_nm.value=rtnValAry[1];//cd_nm
		frm1.cnt_nm.onchange();
	}
 }
function getItNextNumReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if (doc[1] == "ERR01"){
			alert(getLabel('AII_BMD_MSG75'));
			return;
		}
		if (doc[1] == "ERR02"){
			alert(getLabel('AII_BMD_MSG77'));
			return;
		}
		var retVal=doc[1].split("|");
		var it9Num=retVal[0];
		var gap=retVal[1];
		alert(getLabel2('AII_BMD_MSG76',new Array(gap)));
		formObj.it_no.value=convertItType(it9Num);
    	// ###.###.### 형식으로 변환
		//frm1.real_it_no.value = it9Num;
	} else {
    	//System Error! + MSG
    	alert(getLabel('FMS_COM_ERR001'));
	}
}
function getCcnNextNumReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if (doc[1] == "ERR01"){
			return;
		}
		if (doc[1] == "ERR02"){
			return;
		}
		var retVal=doc[1].split("|");		
		//CCN_NO를 취득했으므로 true, hidden으로 현재 취득한 값 설정
		formObj.h_ccn_no.value=retVal[0];
		formObj.ccn_no.value=retVal[0];
	} else {
		// Error일땐 가져오지 않는다.
		return;
	}
}
function convertItType(str){
	var cnvVal=str.substring(0,3).concat('.').concat(str.substring(3,6)).concat('.').concat(str.substring(6,9));
	return cnvVal;
}
function getItNum() {
	doWork("IT_NUM");
}
function getCcnNum() {
	var formObj=document.frm1;
	if (formObj.ccn_no.value != '') {
		if (confirm(getLabel('FMS_COM_ALT062'))) {
			doWork("CCN_NUM");
		}
	} else {
		doWork("CCN_NUM");
	}
}
function fnItNumChange(val) {
	if (val.length == 9){
		frm1.it_no.value=convertItType(val);
	}
}
//2012/03/12 Chungrue 추가 Glovis Edi 전송
function transGoalsAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] == "Y"){
				alert(rtnArr[1]);
			}else{
				alert(rtnArr[1]);
			}
		}else{
		}
	}else{
	}
}
//GLOVIS EDI 필수항목 체크
function checkGoals(){
	var rtnFlg=true;
	return rtnFlg;
}
//2010.12.20 김진혁 추가, 앞의 정보 중C.Weight, G.Weight, CBM 값을 Freight에 끌어오는 로직
function setFrtAuto(sheetObj, prepix) {
	for(var i=2;i<sheetObj.RowCount();i++){
		if(sheetObj.GetCellValue(i, prepix+"fr_inv_sts_cd")=="FI" || sheetObj.GetCellValue(i, prepix+"fr_inv_sts_cd")==""){
			if(sheetObj.GetCellValue(i, prepix+"fr_aply_ut_cd") == "ACW") {
				sheetObj.SetCellValue(i, prepix+"fr_qty",frm1.chg_wgt.value);
			}else if(sheetObj.GetCellValue(i, prepix+"fr_aply_ut_cd") == "AGW"){
				sheetObj.SetCellValue(i, prepix+"fr_qty",frm1.grs_wgt.value);
			}else if(sheetObj.GetCellValue(i, prepix+"fr_aply_ut_cd") == "AMT"){
				sheetObj.SetCellValue(i, prepix+"fr_qty",frm1.meas.value);
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
			var myform=document.forms[0];
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
//화면로드시 데이터 표시
function loadData(){
	//frm1.f_intg_bl_seq.value = '';
	if(frm1.bl_sts_cd.value!='NA'){
	}else{
		fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
		if (docObjects[7].GetEditable() == 0) {
			docObjects[7].SetEditable(1);
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

			setSalesMan(chk_trdp_cd,chk_partner_yn,chk_cur_bizTp);
			
			frm1.intg_bl_seq.value = frm1.copy_bl_seq.value;
			//searchGrid(3);
			frm1.intg_bl_seq.value = "";
			
		}
	}
	if(frm1.intg_bl_seq.value!=""){
		if (frm1.copy_bl_seq.value == ""){
			frm1.curr_cd.value=frm1.h_curr_cd.value;
		}
//		frm1.bl_no.className = 'search_form-disable';
//		frm1.bl_no.readOnly  = true;
		//sizeUtCd 셋팅 jsjang 2013.7.18 #16510 CBM Auto Caculation, dim 
		setSizeUtCd(frm1.size_ut_cd1.value);		
		
		//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
		loadDataProcess ="loadDataWait"; //반드시 마지막 호출 그리드 _OnSearchEnd 이벤트에서 초기화 한다 loadDataProcess = "";
		
		/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
		searchGrid(3);
		
		//#2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.bl_no.value);
	}
	
	//#41634 - [DMS] Default Cursor Position Change
	frm1.bl_no.focus();
}
/* 
* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim 
*/
function setSizeUtCd(obj){
	var formObj=document.frm1;
	//alert(obj);
	if(obj=="CM"){
		formObj.size_ut_cd[0].checked=true;
		formObj.size_ut_cd[1].checked=false;
	}else if(obj=="INCH"){
		formObj.size_ut_cd[0].checked=false;
		formObj.size_ut_cd[1].checked=true;
	}else{
		formObj.size_ut_cd[0].checked=false;
		formObj.size_ut_cd[1].checked=false;
	}
}
function searchGrid(gridIdx){
	switch(gridIdx){
		case 1:
			//RCP List 조회
	        frm1.f_cmd.value=SEARCHLIST01;
	        fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	        docObjects[1].DoSearch("./AIE_BMD_0021_1GS.clt", FormQueryString(frm1) );
		break;
		case 2:
			//Doccument File List 조회
	        frm1.f_cmd.value=SEARCHLIST02;
	        fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	        docObjects[4].DoSearch("./AIE_BMD_0021_2GS.clt", FormQueryString(frm1) );
		break;
		/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim Start */
		case 3:
			//Dimension
			frm1.f_cmd.value=SEARCHLIST04;
			//alert(frm1.f_cmd.value);
			fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[7].DoSearch("./AIE_BMD_0022_1GS.clt", FormQueryString(frm1) );
		break;
		/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim End */
		case 4:
			//Selling/Debit Freight 조회
			frm1.f_cmd.value=SEARCHLIST06;
			fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[1].DoSearch("./AII_BMD_0024GS.clt", FormQueryString(frm1) );
		break;
		case 5:
			//Buying/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST07;
			fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[2].DoSearch("./AII_BMD_0024_1GS.clt", FormQueryString(frm1) );
		break;
		case 6:
			//처리내역( Job temlate에 따라서)
			frm1.f_cmd.value=SEARCHLIST09;
			fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[3].DoSearch("./AIE_BMD_0026GS.clt", FormQueryString(frm1) );
		break;
		case 7:
			//Change Log
			frm1.f_cmd.value=SEARCHLIST10;
			fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[5].DoSearch("./AIE_BMD_0026_1GS.clt", FormQueryString(frm1) );
		break;
		case 8:
			//Selling/Debit Freight 조회
			frm1.f_cmd.value=SEARCHLIST12;
			fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[6].DoSearch("./AII_BMD_0024_2GS.clt", FormQueryString(frm1) );
		break;	
		//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
		case 9:
			//WorkOrder List 조회
			frm1.f_cmd.value=SEARCHLIST08;
			fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[8].DoSearch("./AIE_BMD_0025GS.clt", FormQueryString(frm1) );
		break;
		case 10:
			//Commodity List 조회
			frm1.f_cmd.value=SEARCHLIST05;
			fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
 			docObjects[9].DoSearch("./AIE_BMD_0022_2GS.clt", FormQueryString(frm1) );
			break;
	}
}
/**
 * 화면이동
 */
function goToBlPage(toPage, toNo){
	if(toNo!==''){
		if(toPage=='view_hbl'){
		   	var paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+toNo;
		   	parent.mkNewFrame('Booking & House AWB Entry', paramStr);
		}else if(toPage=='view_mbl'){
		   	var paramStr="./AII_BMD_0040.clt?f_cmd="+SEARCHLIST;
		   	paramStr+= '&f_bl_no='+toNo+'&f_hbl_intg_bl_seq='+frm1.intg_bl_seq.value;
		   	parent.mkNewFrame('Master AWB Entry', paramStr);
		}
	}
}
/**
 * 파일 업로드 팝업에서 목록 Reload
 */
function reloadDocList(){
	searchGrid(2);
}
/**
 * MBL 내용 출력
 */
function getMblImpInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			frm1.etd_dt_tm.value=mkStrToDate(rtnArr[0]);
			frm1.etd_tm.value=mkStrToTime(rtnArr[1]);
			frm1.eta_dt_tm.value=mkStrToDate(rtnArr[2]);
			frm1.eta_tm.value=mkStrToTime(rtnArr[3]);
			frm1.flt_no.value=rtnArr[4];
			frm1.ts1_port_cd.value=rtnArr[5];
			frm1.ts1_flt_no.value=rtnArr[6];
			frm1.ts2_port_cd.value=rtnArr[7];
			frm1.ts2_flt_no.value=rtnArr[8];
			frm1.ts3_port_cd.value=rtnArr[9];
			frm1.ts3_flt_no.value=rtnArr[10];
			frm1.pol_cd.value=rtnArr[11];
			frm1.pol_nm.value=rtnArr[12];
			frm1.pol_nod_cd.value=rtnArr[13];
			frm1.pod_cd.value=rtnArr[14];
			frm1.pod_nm.value=rtnArr[15];
			frm1.pod_nod_cd.value=rtnArr[16];
			frm1.lnr_trdp_cd.value=rtnArr[17];
			frm1.lnr_trdp_nm.value=rtnArr[18];
			//frm1.rep_cmdt_cd = rtnArr[19];
			//frm1.rep_cmdt_nm = rtnArr[20];
			frm1.pck_qty.value=doMoneyFmt(rtnArr[19]);
			frm1.pck_ut_cd.value=rtnArr[20];
			frm1.grs_wgt.value=doMoneyFmt(rtnArr[21]);
			frm1.grs_wgt_ut_cd.value=rtnArr[22];
			frm1.chg_wgt.value=doMoneyFmt(rtnArr[23]);
			frm1.chg_wgt_ut_cd.value=rtnArr[24];
			frm1.meas.value=doMoneyFmt(rtnArr[25]);
			frm1.meas_ut_cd.value=rtnArr[26];
			btnAdd.style.display='block';
//	        frm1.bl_no.className = 'search_form';
//            frm1.bl_no.readOnly  = false;
//            frm1.bl_no.focus();
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * HBL 중복 여부를 확인함
 */
function getHblCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				/*
				 *  2012.02.24
				 * 중복되면 저장 수행 안함
				 */
				//HAWB No. is duplicate.
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_HAWB'));
				frm1.bl_no.focus();
			}else{
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
            	   //docObjects[0].DoAllSave("./AII_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
            	   docObjects[0].DoAllSave("./AII_BMD_0020GS.clt", FormQueryString(frm1)+sndParam, true);
            	   isMBLCreated = false;
        	   }			
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * Amount를 계산함
 */
function doSumCgoRt(){
	var isOk=true;
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	var cntCnt=docObjects[1].LastRow() + 1;
	if(cntCnt==2){
		isOk=false;
	}else if(cntCnt==3){
		if(docObjects[1].GetCellValue(2, 'rcp_pce_qty')==''){
			isOk=false;
		}
	}
	if(isOk){
		var grsSum=0;
		var chgSum=0;
		for(var i=2; i < cntCnt; i++){
			if(docObjects[1].GetCellValue(i, 'rcp_ibflag')!='D'){
				grsSum=getSumFloatByNDecimalTp(grsSum, docObjects[1].GetCellValue(i, 'rcp_grs_wgt'), TP_TRM3);
				chgSum=getSumFloatByNDecimalTp(chgSum, docObjects[1].GetCellValue(i, 'rcp_chg_wgt_meas'), TP_TRM3);
			}
		}
		frm1.grs_wgt.value=doMoneyFmt(grsSum);
		frm1.chg_wgt.value=doMoneyFmt(chgSum);
	}
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
 * 화면초기화
 */
function clearScreen(){
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
		frm1.bl_sts_label.value=docObjects[0].GetCellValue(1, "sv_bl_sts_label");
		frm1.f_bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
		frm1.bl_ser_no.value=docObjects[0].GetCellValue(1, "sv_bl_ser_no");
		frm1.h_bl_no.value=frm1.bl_no.value;
//		frm1.bl_no.className = 'search_form-disable';
//		frm1.bl_no.readOnly  = true;
		//Freight항목을 조회함
	    var eta=frm1.eta_dt_tm.value;
	    getXcrtInfo(eta.replaceAll('-', ''));
	}
	/* 20130822 LHK 20413 BL# 변경 후 저장 시 Duplicated Error */
	frm1.bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
	frm1.h_bl_no.value=frm1.bl_no.value;
	frm1.f_bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
	
	//#2068 - Document 번호 Title 에 반영
	setTabTitle(frm1.bl_no.value);
	
	if(rcpListSheet){
		searchGrid(1);
	}
	if(docListSheet){
		searchGrid(2);
	}
	/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim Start */
	if(dimListSheet){
		searchGrid(3);
	}
	if(cmdtListSheet){
		searchGrid(10);
	}
	/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim End */
	if(jobListSheet){
		searchGrid(6);
	}
	if(frtSdSheet){
		searchGrid(4);
	}
	if(frtBcSheet){
		searchGrid(5);
	}
	if(frtDcSheet){
		searchGrid(8);
	}
	//목록 Flag 초기화
	bkgCntrSheet=false;
	docListSheet=false;
	frtSdSheet=false;
	frtBcSheet=false;
	frtDcSheet=false;
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
/**
 * Status Grid
 */
function sheet1_OnSearchEnd(errMsg){
	frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
	frm1.bl_sts_label.value=docObjects[0].GetCellValue(1, "sv_bl_sts_label");
	//버튼 초기화
	btnLoad();
	if(frm1.f_cmd.value==COMMAND02){
		var tmpBlNo=docObjects[0].GetCellValue(1, "sv_bl_no");
		if(tmpBlNo!=''){
			//조회해온 결과를 Parent에 표시함
			frm1.bl_no.value=tmpBlNo;
			frm1.mk_bl_no.value=tmpBlNo;
		}
		//버튼 숨기기
		hblCreObj.style.display='none';
//		frm1.bl_no.className = 'search_form-disable';
//		frm1.bl_no.readOnly  = true;
		hblMk.style.display='none';
	}
	doHideProcess();
}

function sheet2_OnSearchEnd(sheetObj, row, col){
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
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
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[2];
}
//--------------------------------------------------------------------------------------------------------------
//                                             Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
var tab1click='';
var tab2click='';
var tab3click='';
var tab4click='';
var tab5click='';
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
        
        //comSheetObject('sheet4');
        fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
        
        if(tab1click == ""){
	        tab1click="Y"
	    }
	    //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
	//Mark Description 탭
    } else if( isNumSep == "02" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="inline";
        tabObjs[2].style.display="none";
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='none';
        
        //comSheetObject('sheet8');
        fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
        
        if(tab2click == ""){
        	tab2click="Y";
        	doWork('SEARCH_XPT');
        	doWork('SEARCH_ITEM');
        }
    	//스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
	//Body & Entry File탭
    } else if( isNumSep == "03" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="none";
        tabObjs[2].style.display="inline";
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='none';
        
        //comSheetObject('sheet5');comSheetObject('sheet14');comSheetObject('sheet6');
        fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)

        //BL_COPY
        var copy_bl_seq = frm1.copy_bl_seq.value;
		if (copy_bl_seq == "") {
	        if(tab3click== ""){
		        tab3click= "Y";
		        doWork('SEARCH_FRT');
	    	}
		}		
    	//스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
      //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
    	//Work Order
    }else if( isNumSep == "04" ) {
    	currTab=isNumSep;	//탭상태저장
	    tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='inline';
        tabObjs[4].style.display='none';
        
        //comSheetObject('sheet15');
        fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
        
        if(tab5click== ""){
	        tab5click="Y";
	        doWork('SEARCH_WO');
    	}
	//Freight탭
    } else if( isNumSep == "05" ) {
    	currTab=isNumSep;	//탭상태저장
	    tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='inline';
        
        //comSheetObject('sheet11');comSheetObject('sheet3');comSheetObject('sheet12');
        fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
        
        if(tab4click== ""){
	        tab4click="Y";
	        doWork('SEARCH_JB');
    	}
    }
    //스크롤을 하단으로 이동한다.
    //document.body.scrollTop = document.body.scrollHeight;
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

//OFVFOUR-7340: [JH Logistics] Customer copy option
var auto_select_shipper="Y";

function loadPage() {
	//OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN
	ajaxSendPost(setUserTeamInfo, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=opr_team&issued_by="+frm1.opr_usrid.value, "./GateServlet.gsl");
	//alert(docObjects.length);
	
	//OFVFOUR-7707[Matrix] Restriction to block creating HBL in case the credit of customer exceeds credit limit
	var com_cd = "C330";
	var cd_val = "AIH";
	ajaxSendPost(chkCredit, "reqVal", "&goWhere=aj&bcKey=searchCmmDtlCd&com_cd="+com_cd+"&cd_val="+cd_val, "./GateServlet.gsl");

	//OFVFOUR-7899: [Matrix] Set mandatory field in OIH, AEH, AIH B/L entry
	var com_cd_02 = "MFC01";
	var cd_val_02 = "IC";
	ajaxSendPost(getIncotermsCode, "reqVal", "&goWhere=aj&bcKey=searchCmmDtlCd&com_cd="+com_cd_02+"&cd_val="+cd_val_02, "./GateServlet.gsl");

	/* #2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가 */
	var opt_key = "BL_INV_AUTO_CREATION";
	ajaxSendPost(setBlInvAutoCreation, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
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

	//OFVFOUR-7899: [Matrix] Set mandatory field in OIH, AEH, AIH B/L entry
	if( IncotermsCode == "Y" ) {
		document.frm1.inco_cd.classList.remove("search_form");
		document.frm1.inco_cd.classList.add("input1");
	}

	//#2504 [PATENT]Debit Note & AP for billing code based invoices
    if(bl_inv_auto_creation == "Y"){
    	getObj("spanARprint").style.display = "inline";
    	getObj("spanAPprint").style.display = "inline";
    }
      	
	
    checkBoxSetting();
    
	//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
	//조회
	chkIntgBlModiTms("VIEW");
	
    frm1.pck_qty.value=doMoneyFmt(Number(frm1.pck_qty.value).toFixed(0));
    frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(1));
    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(1));
    frm1.chg_wgt.value=doMoneyFmt(Number(frm1.chg_wgt.value).toFixed(1));
    frm1.chg_wgt1.value=doMoneyFmt(Number(frm1.chg_wgt1.value).toFixed(1));
    frm1.ctrb_mgn.value=doMoneyFmt(Number(frm1.ctrb_mgn.value).toFixed(2));
    if(frm1.intg_bl_seq.value==""){
    	frm1.desc_txt1.value = frm1.h_dflt_an_memo.value;	// #45795 - [COMMON] 항공수입 Arrival Notice 에도 Remark 가 Print 될 수 있도록 변경 (해운과 동일)
    	
    	//#48588 [Webtrans][게시판#9] AE PACKAGE TYPE INPUT
    	//#22
    	if(frm1.copy_bl_seq.value == ""){
    		setPckUtCd();
    	}
    	//frm1.pck_ut_cd.value="CT";
    	
    	//MBL ENTRY 에서 HBL button 을 눌렀을 경우 2012.10.05 LHK
    	if(frm1.ref_no.value!=""){
        	checkRefNo(frm1.ref_no.value);
        }
    }
    if(user_ofc_cnt_cd=='DE'){
    	if(frm1.intg_bl_seq.value==''){
    		frm1.frt_term_cd.value='PP';
    	}
    }
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	goTabSelect(frm1.f_isNumSep.value);      
    if(frm1.bl_sts_cd.value=='HO' || frm1.bl_sts_cd.value=='HF'){
//    	alert('Accounting Closed. You can only edit following fields.\nCargo Released On / Cargo Released To.');
    	alert(getLabel('AIR_MSG_084'));	
    }
    /*
    // IT NUMBER형식에 맞게 변환
    var frmItNum=frm1.it_no.value;
    if (frmItNum.length == 9){
    	frm1.it_no.value=convertItType(frmItNum);
    	// ###.###.### 형식으로 변환
    	//frm1.real_it_no.value = frmItNum;
    }
    */
    
    setTimeout("document.frm1.f_bl_no.focus();",1000);
    
    if(user_ofc_cnt_cd == "KR"){
    	$("[id=trKrOnlyWh]").show();
    }
    
    /* 2016-12-21 자동완성 기능 추가 S */
    fnSetAutocomplete('prnr_trdp_nm'	, 'LINER_POPLIST', 'partner', 'A'); //Partner
    fnSetAutocomplete('shpr_trdp_nm'	, 'LINER_POPLIST', 'shipper', 'A'); //Shipper
    fnSetAutocomplete('cnee_trdp_nm'	, 'CNEE_POPLIST', 'consignee', 'A'); //Consignee
    fnSetAutocomplete('ntfy_trdp_nm'	, 'LINER_POPLIST', 'notify', 'A'); //Notify
    fnSetAutocomplete('cust_trdp_nm'	, 'LINER_POPLIST', 'cust', 'A'); //Customs Broker
    fnSetAutocomplete('act_shpr_trdp_nm', 'LINER_POPLIST', 'ashipper', 'A'); //Customer
    fnSetAutocomplete('third_trdp_nm'	, 'LINER_POPLIST', 'third', 'A'); //Third Party	
    fnSetAutocomplete('prnr_trdp_nm2'	, 'LINER_POPLIST', 'partner2', 'A'); //Triangle Agent
    fnSetAutocomplete('lnr_trdp_nm'		, 'LINER_POPLIST_M', 'liner', 'A'); //Carrier  
    fnSetAutocomplete('pol_nm'			, 'LOCATION_POPLIST', 'pol', 'A'); //Departure 
    fnSetAutocomplete('fst_to_nm'		, 'LOCATION_POPLIST', 'fst', 'A'); //First To
    fnSetAutocomplete('first_port_nm'	, 'LOCATION_POPLIST', 'first'); //First Port of Entry	
    fnSetAutocomplete('pod_nm'			, 'LOCATION_POPLIST', 'air_des', 'A'); //Destination  
    fnSetAutocomplete('fnl_dest_loc_nm'	, 'LOCATION_POPLIST', 'wh'); //Final Destination  
    fnSetAutocomplete('door_loc_nm'		, 'LINER_POPLIST', 'door', 'A'); //Delivery Location
    fnSetAutocomplete('cfs_trdp_nm'		, 'LINER_POPLIST', 'cfs', 'A'); //Freight Location	     
    fnSetAutocomplete('trk_trdp_nm'		, 'LINER_POPLIST', 'trk', 'A'); //Trucker	
    fnSetAutocomplete('bond_carr_nm'	, 'LINER_POPLIST', 'bond', 'A'); //Bond Carrier\
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
	
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
    
    //#2586 [BNX US] COD, CREDIT HOLD ACCOUNTS NO WARNING
    if(frm1.intg_bl_seq.value != ''){
//    	(formObj.prnr_trdp_cd.value != "") ? chkCodOnLoad("partner", formObj.prnr_trdp_cd.value, false) : "";
//    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, false) : "";
//    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, false) : "";
//    	(formObj.ntfy_trdp_cd.value != "") ? chkCodOnLoad("notify", formObj.ntfy_trdp_cd.value, false) : "";
//    	(formObj.cust_trdp_cd.value != "") ? chkCodOnLoad("cust", formObj.cust_trdp_cd.value, false) : "";
//    	(formObj.act_shpr_trdp_cd.value != "") ? chkCodOnLoad("ashipper", formObj.act_shpr_trdp_cd.value, false) : "";
//    	(formObj.third_trdp_cd.value != "") ? chkCodOnLoad("third", formObj.third_trdp_cd.value, false) : "";
//    	(formObj.prnr_trdp_cd2.value != "") ? chkCodOnLoad("partner2", formObj.prnr_trdp_cd2.value, false) : "";
//    	(formObj.lnr_trdp_cd.value != "") ? chkCodOnLoad("liner", formObj.lnr_trdp_cd.value, false) : "";
//    	(formObj.door_loc_cd.value != "") ? chkCodOnLoad("door", formObj.door_loc_cd.value, false) : "";
//    	(formObj.cfs_trdp_cd.value != "") ? chkCodOnLoad("cfs", formObj.cfs_trdp_cd.value, false) : "";
    }else{
    	(formObj.prnr_trdp_cd.value != "") ? chkCodOnLoad("partner", formObj.prnr_trdp_cd.value, true) : "";
    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, true) : "";
    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, true) : "";
    	(formObj.ntfy_trdp_cd.value != "") ? chkCodOnLoad("notify", formObj.ntfy_trdp_cd.value, true) : "";
    	(formObj.cust_trdp_cd.value != "") ? chkCodOnLoad("cust", formObj.cust_trdp_cd.value, true) : "";
    	(formObj.act_shpr_trdp_cd.value != "") ? chkCodOnLoad("ashipper", formObj.act_shpr_trdp_cd.value, true) : "";
    	(formObj.third_trdp_cd.value != "") ? chkCodOnLoad("third", formObj.third_trdp_cd.value, true) : "";
    	(formObj.prnr_trdp_cd2.value != "") ? chkCodOnLoad("partner2", formObj.prnr_trdp_cd2.value, true) : "";
    	(formObj.lnr_trdp_cd.value != "") ? chkCodOnLoad("liner", formObj.lnr_trdp_cd.value, true) : "";
    	(formObj.door_loc_cd.value != "") ? chkCodOnLoad("door", formObj.door_loc_cd.value, true) : "";
    	(formObj.cfs_trdp_cd.value != "") ? chkCodOnLoad("cfs", formObj.cfs_trdp_cd.value, true) : "";
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
		/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim Start */
		case "sheet4":
			docObjects[7]=sheet_obj;
		break;	
		/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim End */
		case "sheet5":
			docObjects[1]=sheet_obj;
		break;
		case "sheet6":
			docObjects[2]=sheet_obj;
		break;
		case "sheet11":
			docObjects[3]=sheet_obj;
		break;
		case "sheet3":
			docObjects[4]=sheet_obj;
		break;
		case "sheet12":
			docObjects[5]=sheet_obj;
		break;
		case "sheet14":
			docObjects[6]=sheet_obj;
		break;
		//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
		case "sheet15":
			docObjects[8]=sheet_obj;
			break;
		case "sheet8":
			docObjects[9]=sheet_obj;
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
			with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('AII_BMD_0020_HDR1'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_intg_bl_seq" },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bkg_no" },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_no" },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_cd" },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_label" },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_ser_no" } ];
		         
		        InitColumns(cols);
		        SetEditable(1);
		        SetVisible(false);
			}
	    break;
		//Freight
		case 2:      //Selling/Debit 탭부분 init
			if(MULTI_CURR_FLAG == "Y"){	//Muti Currency
			    with(sheetObj){
			        var cnt=0;

			        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

			        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			        var headers = [ { Text:getLabel('AII_BMD_0020_HDR2_3'), Align:"Center"},
			                    { Text:getLabel('AII_BMD_0020_HDR2_4'), Align:"Center"} ];
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
			               {Type:"Text",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,  EditLen:12 },
			               {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			               
//			               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			               
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			               
//			               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			               {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
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
			               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" },
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
			        SetSheetHeight(140);
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
			      var headers = [ { Text:getLabel('AII_BMD_0020_HDR2_1'), Align:"Center"},
			                  { Text:getLabel('AII_BMD_0020_HDR2_2'), Align:"Center"} ];
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
			             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,	  EditLen:12 },
			             {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			             
//			             #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			             
			             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			             
//			             #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			             {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			             {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			             {Type:"Image",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
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
			             {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" },
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
				  SetSheetHeight(140);
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
		case 3:      //Buying/Credit 탭부분 init
			if(MULTI_CURR_FLAG == "Y"){	//Muti Currency
			    with(sheetObj){
			        var cnt=0;

			        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

			        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			        var headers = [ { Text:getLabel('AII_BMD_0020_HDR3_3'), Align:"Center"},
			                    { Text:getLabel('AII_BMD_0020_HDR3_4'), Align:"Center"} ];
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
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,	  EditLen:12 },
			               {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			               
//			               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			               
			               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			               
//			               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			               {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
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
			          SetSheetHeight(140);
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
			      var headers = [ { Text:getLabel('AII_BMD_0020_HDR3_1'), Align:"Center"},
			                  { Text:getLabel('AII_BMD_0020_HDR3_2'), Align:"Center"} ];
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
			             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			             {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			             
//			             #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			             
			             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			             
//			             #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			             {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
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
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
			      		 {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" },
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
					        SetSheetHeight(140);
					        InitComboNoMatchText(1,"",1);
					        SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
					        
		                   	  //#2504 [PATENT]Debit Note & AP for billing code based invoices
		                   	  if(bl_inv_auto_creation == "Y"){
		                   		 SetColHidden("b_fr_cmb_inv_no", 0);
		                   	  }					        
	    	}      
			}
	    break;
        case 4:      //Job Visibility
             with (sheetObj) {
	          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
	
	          var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
	          var headers = [ { Text:getLabel('AII_BMD_0020_HDR6'), Align:"Center"} ];
	          InitHeaders(headers, info);
	
	          var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"jb_del_chk",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1,   EditLen:-1 },
	                 {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	                 {Type:"Combo",     Hidden:0, Width:130,  Align:"Left",    ColMerge:1,   SaveName:"jb_sts_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1 },
	                 {Type:"Image",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"jb_sts_img",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	                 {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"jb_pln_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                 {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"jb_pln_tm",     KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                 {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"jb_act_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                 {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"jb_act_tm",     KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                 {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dur_tm_qty",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1 },
	                 {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	                 {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"jb_tmplt_Seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	                 {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"jb_ibflag",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	           
		          InitColumns(cols);
		
		          SetCountPosition(0);
		          SetEditable(1);
		          SetImageList(0,APP_PATH+"/web/img/button/bt_green.gif");
		          SetImageList(1,APP_PATH+"/web/img/button/bt_red.gif");
		          InitViewFormat(0, "jb_pln_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
		          InitViewFormat(0, "jb_act_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
		          SetColProperty('jb_sts_nm', {ComboText:"|"+JBCD2, ComboCode:"|"+JBCD1} );
		          SetSheetHeight(200);
            }                                                      
   		break;
        case 5:					//첨부파일
	        with (sheetObj) {
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('AII_BMD_0020_HDR7'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
	                   {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"Del",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                   {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"palt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                   {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:0,   SaveName:"palt_ext_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:1, Width:140,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"palt_doc_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:0,  Width:190,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_img_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"palt_doc_pdf_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq_d",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	             
	            InitColumns(cols);
	
	            SetCountPosition(0);
	            SetEditable(1);
	            SetImageList(0,APP_PATH+"/web/img/button/bt_img.gif");
	            SetImageList(1,APP_PATH+"/web/img/button/bt_pdf.gif");
	                  sheetObj.SetDataLinkMouse("palt_doc_nm",1);
	            sheetObj.SetDataLinkMouse("palt_doc_img_url",1);
	            sheetObj.SetDataLinkMouse("palt_doc_pdf_url",1);
	            SetSheetHeight(200);
	       }                                                      
	   break;
        case 6:      //HISTORY
            with (sheetObj) {
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel("AII_BMD_0020_HDR8"), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"Float",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cng_seq" },
	                   {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"itm_lbl" },
	                   {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"bfr_cng_txt" },
	                   {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"aft_cng_txt" },
	                   {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"rgst_usrid" },
	                   {Type:"Date",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,  Format:"YmdHm",  SaveName:"rgst_tms" } ];
	             
	            InitColumns(cols);
	            SetEditable(0);
	            SetSheetHeight(200);
            }
     	break;
		   case 7:      //Buying/Credit 탭부분 init
			   if(MULTI_CURR_FLAG == "Y"){	//Muti Currency
				    with(sheetObj){
				        var cnt=0;

				        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1 } );

				        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				        var headers = [ { Text:getLabel('AII_BMD_0020_HDR7_3'), Align:"Center"},
				                    { Text:getLabel('AII_BMD_0020_HDR7_4'), Align:"Center"} ];
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
				               {Type:"Float",     Hidden:1,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,	EditLen:12 },
				               {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
				               
//				               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//				               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
				               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
				               
				               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
				               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
				               
//				               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//				               {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
				               {Type:"Float", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
				               {Type:"Image", Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				               
				               {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				               {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
				               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
				               {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
				               {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
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
				               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 } ];
				         
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
				          SetSheetHeight(140);
				          InitComboNoMatchText(1,"",1);
				          SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
				        }
			   }else{
	            with (sheetObj) {
			         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1, TabStop:0 } );
			         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			         var headers = [ { Text:getLabel('AII_BMD_0020_HDR7_1'), Align:"Center"},
			                     { Text:getLabel('AII_BMD_0020_HDR7_2'), Align:"Center"} ];
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
			                {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			                {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			                {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			                
//			                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			                
			                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			                
//			                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//			                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			                {Type:"Image",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_att_file_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
					           SetSheetHeight(140);
					           InitComboNoMatchText(1,"",1);
					           SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
	             }        
			   }
	         break;
	       /* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim Start */
		   case 8:      //Dimension
			with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('AIE_BMD_0020_HDR2_1'), Align:"Center"},
		                    { Text:getLabel('AIE_BMD_0020_HDR2_2'), Align:"Center"} ];
		        InitHeaders(headers, info);

		        var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"del",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"dim_ibflag" },
		               {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_len_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		               {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_wdt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		               {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_hgt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		               {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_pce_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
		               {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_act_dim",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10},
		               {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
		               {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt1",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
		               {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:16 },
		               {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:16 },
		               {Type:"Text",      Hidden:1, Width:52,   Align:"Left",    ColMerge:1,   SaveName:"dim_pck_ut_cd" },
		               {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dim_seq" },
		               {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dim_wh_recp_no" }];
		         
		        InitColumns(cols);
		        SetCountPosition(0);
		        SetEditable(0);
		        SetSheetHeight(120);
		        //sheetObj.SetFocusAfterProcess(0);
			}                                                   
        break;
        /* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim End */
        //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
        //Pickup/WorkOrder 그리드        
       case 9:
            with (sheetObj) {
	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
	
	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	         var headers = [ { Text:getLabel('AIE_BMD_0020_HDR5_1'), Align:"Center"} ];
	         InitHeaders(headers, info);
	
	         var cols = [ {Type:"Text",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"wo_seq" },
	                {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"wo_no" },
	                {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"wo_status" },
	                {Type:"Text",     Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"pickup_trdp_nm" },
	                {Type:"Text",     Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"delivery_trdp_nm" },
	                {Type:"Text",     Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"return_trdp_nm" },
	                {Type:"Text",     Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"trucker_trdp_nm" },
	         		{Type:"Float",    Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"act_wgt_k" , Format:"Float",       PointCount:2} ];	          
	         InitColumns(cols);
	
	         SetCountPosition(0);
	         SetEditable(0);
	         SetColProperty('wo_status', {ComboText:"SAVED|ISSUED", ComboCode:"A|B"} );
	           SetSheetHeight(400);
           }                                                      
        break;
        
      //Item 그리드
       case 10:      
           with(sheetObj){

       	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

       	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
       	         var headers = [ { Text:getLabel('AIE_BMD_HDR35'), Align:"Center"},
       	                   { Text:getLabel('AIE_BMD_HDR36'), Align:"Center"} ];
       	         InitHeaders(headers, info);

       	         var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"Del" },
       	             {Type:"Status",    Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_ibflag" },
       	             {Type:"Seq",       Hidden:0,  	Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
       	             {Type:"Text",      Hidden:0,  	Width:100,  Align:"Left",    ColMerge:0,   SaveName:"item_cust_po_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
       	             {Type:"PopupEdit", Hidden:0, 	Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_cmdt_cd",    	   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
       	             {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    ColMerge:0,   SaveName:"item_cmdt_nm",    	   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:300 },
       	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Left",    ColMerge:0,   SaveName:"item_hs_grp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
       	             {Type:"PopupEdit", Hidden:0, 	Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_shp_cmdt_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
       	             {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    ColMerge:0,   SaveName:"item_shp_cmdt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:300 },
       	             {Type:"Int",       Hidden:0,  	Width:90,   Align:"Right",   ColMerge:1,   SaveName:"item_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
       	             {Type:"Combo",     Hidden:0, 	Width:90,   Align:"Center",  ColMerge:1,   SaveName:"item_pck_ut_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
       	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Left",    ColMerge:0,   SaveName:"item_pck_ut_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
       	             {Type:"Float",     Hidden:0,   Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_pck_inr_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
       	             {Type:"Float",     Hidden:0,   Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_ea_cnt",    	   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
       	             {Type:"Float",     Hidden:0,   Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_ttl_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
       	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
       	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_lbs_wgt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
       	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
       	             {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_cft_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
       	             {Type:"Text",      Hidden:0,  	Width:200,  Align:"Left",    ColMerge:1,   SaveName:"item_rmk",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
       	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_shp_cmdt_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
       	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_po_sys_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
       	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_po_cmdt_seq",    KeyField:0,   CalcLogic:"",   Format:"",       	   PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
       	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"item_sys_no",    KeyField:0,   CalcLogic:"",   Format:"",       	   PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
       	             {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
       	          
       	         InitColumns(cols);

       	         SetEditable(1);
       	         SetColProperty(0 ,"item_cmdt_cd" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
       	         SetColProperty(0 ,"item_shp_cmdt_cd" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
       	         SetColProperty('item_pck_ut_cd', {ComboText:PCKCD1, ComboCode:PCKCD2} );
       	         SetSheetHeight(170);
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
 	if(sheetObj.ColSaveName(Col)=='palt_doc_no' || sheetObj.ColSaveName(Col)=='palt_doc_msg'){
 		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
 		reqParam += '&s_palt_doc_seq='+sheetObj.GetCellValue(Row,"palt_doc_seq");
 		reqParam += '&openMean='+SEARCH02;
 		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDocUp', 806, 550, "scroll:no;status:no;help:no;");
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

function sheet4_OnSearchEnd(sheetObj, row, col) {
	loadDataProcess = "";////조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
	
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	
	if (sheetObj.GetEditable() == 0) {
		sheetObj.SetEditable(1);
	}
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

//***************Dimension Sheets Event처리 시작***************
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
function sheet4_OnPopupClick(sheetObj, Row, Col){	
	switch (sheetObj.ColSaveName(Col)) {
        case "dim_pck_ut_cd" :
	  	 	rtnary=new Array(1);
	   		rtnary[0]="1";
	        var rtnVal=window.showModalDialog('./CMM_POP_0120.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(Row, Col,rtnValAry[0]);
			}
        break;
	}
}
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
//function sheet4_OnChange(sheetObj, Row, Col){
function sheet4_OnChange(sheetObj, row, col, value){
	//Length(cm) × Width(cm) × Height(cm)/6000 by actual dimensions
	switch (sheetObj.ColSaveName(col)) {
	case "dim_len_dim" :
	case "dim_wdt_dim" :
	case "dim_hgt_dim" :
	case "dim_pce_qty" :
	case "dim_chg_wgt"  :
	case "dim_chg_wgt1" :
	case "dim_meas" :
	case "dim_meas1" :
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
	//if (colName=="dim_len_dim" || colName=="dim_wdt_dim" || colName=="dim_hgt_dim" || colName=="dim_pce_qty") {
	if (colName=="dim_len_dim" || colName=="dim_wdt_dim" || colName=="dim_hgt_dim" || colName=="dim_pce_qty" || colName=="del"){
		var length=sheetObj.GetCellValue(row, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_len_dim");
		var width=sheetObj.GetCellValue(row, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_wdt_dim");
		var height=sheetObj.GetCellValue(row, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_hgt_dim");
		var pcs=sheetObj.GetCellValue(row, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(row, "dim_pce_qty");
		var cbm=0;
		var kg=0;
		var sumCbm=0;
		var sumPcs=0;
		if(formObj.size_ut_cd[0].checked){
			kg=roundXL(length * width * height * pcs / 6000, 1);
			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 6);
			sheetObj.SetCellValue(row, "dim_act_dim",cbm.toFixed(6),0);
			sheetObj.SetCellValue(row, "dim_chg_wgt",kg.toFixed(1));
			sheetObj.SetCellValue(row, "dim_chg_wgt1",(kg * CNVT_CNST_KG_LB).toFixed(1));
			/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
			/* if 문만 추가 */
			if (colName !="dim_meas")
			{			
				sheetObj.SetCellValue(row, "dim_meas",cbm.toFixed(6),0);
			}
			sheetObj.SetCellValue(row, "dim_meas1",(cbm * CNVT_CNST_CBM_CFT).toFixed(6),0);
		} else if(formObj.size_ut_cd[1].checked) {
			kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, 1);
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 6);
			sheetObj.SetCellValue(row, "dim_act_dim",cbm.toFixed(6),0);
			sheetObj.SetCellValue(row, "dim_chg_wgt",kg.toFixed(1)); 
			sheetObj.SetCellValue(row, "dim_chg_wgt1",(kg * CNVT_CNST_KG_LB).toFixed(1));  
			/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
			/* if 문만 추가 */
			if (colName !="dim_meas")
			{				
				sheetObj.SetCellValue(row, "dim_meas",cbm.toFixed(6),0);
			}
			sheetObj.SetCellValue(row, "dim_meas1",(cbm * CNVT_CNST_CBM_CFT).toFixed(6),0);
		}
		if (kg.toFixed(1) > 9999999999) {
			alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("10")));
			sheetObj.SetCellValue(row, "dim_chg_wgt",0,0);
			return;
		}
		if ((kg * CNVT_CNST_KG_LB).toFixed(1) > 9999999999) {
			alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("10")));
			sheetObj.SetCellValue(row, "dim_chg_wgt1",0,0);
			return;
		}
		if (cbm.toFixed(6) > 9999999999) {
			alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("10")));
			sheetObj.SetCellValue(row, "dim_meas",0,0);
			return;
		}
		if ((cbm * CNVT_CNST_CBM_CFT).toFixed(6) > 9999999999) {
			alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("10")));
			sheetObj.SetCellValue(row, "dim_meas1",0,0);
			return;
		}
		for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
			/* jsjang 2013.8.22 #18650 B/L Entry 화면에서 Dimensions 리스트 항목 - 삭제 Check시 상단 Measurement/Package 등에 반영 안됨 보완 */
			/* if 문만 추가 */
			if(sheetObj.GetCellValue(i, "del") == 0)
			{ 			
				sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_meas"));
				sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
			}
		}
		//alert(sumCbm);
		/*
		 * 2012.02.15
		 * Total CBM 필드 추가
		 * Total CBM 값을 구하고 Vol Weight로 환산
		 */
		frm1.vol_meas.value=sumCbm.toFixed(6);
		//alert(sumCbm.toFixed(6));
		//alert(sumPcs.toFixed(0));
		frm1.pck_qty.value=sumPcs.toFixed(0);
		//frm1.vol_wgt.value = (frm1.vol_meas.value * 1000 / 6).toFixed(1);
		weightChange(frm1.pck_qty);
	}
}
//***************Dimension Sheets Event처리 종료***************
//***************EDI Sheets Event처리 시작***************
/**
 * 해운 EDI 수출품목 데이터조회
 */
function sheet5_OnPopupClick(sheetObj, row, col){	
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="edi_pck_ut_cd"){
		gridPopCall(sheetObj, row, col, 'edi_pck_ut_cd')
	}
}
function sheet5_OnKeyUp(sheetObj, row, col, keyCode){
	doAutoComplete(sheetObj, row, col, keyCode);
}
function sheet5_OnClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="sprt_seq"){
		if(sheetObj.GetCellValue(row, "sprt_flg")=="N"){
			//분할선적 여부를 \"Yes\"로 변경하십시오!
			alert(getLabel('FMS_COM_ALT024'));
			sheetObj.SelectCell(row, "sprt_flg");
		}
	}
}
function sheet5_OnChange(sheetObj, row, col, value){
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
		case "fr_trdp_cd" :
			if(value < 0){
				sheetObj.SetCellValue(row, "fr_trdp_nm",'');
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
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="sprt_flg"){
		if(sheetObj.GetCellValue(row, "sprt_flg")=='NA'){
			sheetObj.SetCellValue(row, "sprt_seq",'');
		}
	}
	else if(colStr=="fr_trdp_cd"){
		//alert(value);
	}
	else if(colStr=="sprt_seq"){
		
	}
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col, '', 'A', 'I', 'H');
}
//***************EDI Sheets Event처리 종료***************
//***************Freight Sheets Event처리 시작***************
var inv_viw_tp='A';
/**
 * Freight S/D 처리
 */
function sheet5_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, '', 'A', 'I', 'H');
	}else{
		mutiSheetOnClick(sheetObj, row, col, '', 'A', 'I', 'H');
	}
//	mutiSheetOnClick(sheetObj, row, col, '', 'A', 'I', 'H');
}
/**
 * Freight S/D 처리
 */
function sheet5_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, '', 'A', 'I', 'H');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, '', 'A', 'I', 'H');
}
/**
 * Freight S/D 조회 완료시
 */
function sheet5_OnSearchEnd(sheetObj, row, col) {
	//버튼 초기화
	cnfCntr('SD');
	//PPD, CCT, Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, '', 'A', 'I', 'H');
	}
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "fr_att_file_1", 0);
	}
}
/**
 * Freight S/D 저장 완료시
 */
function sheet5_OnSaveEnd(sheetObj, row, col) {
	//버튼 초기화
	cnfCntr('SD');
	//PPD, CCT, Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}
function sheet5_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, '');
}
function sheet6_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, 'b_', 'A', 'I', 'H');
	}
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "b_fr_att_file_1", 0);
	}
}
function sheet6_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
}
/**
 * Freight B/C 처리
 */
function sheet6_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "b_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'A', 'I', 'H');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'A', 'I', 'H');
}
/**
 * Freight B/C 처리
 */
function sheet6_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "b_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, 'b_', 'A', 'I', 'H');
	}else{
		mutiSheetOnClick(sheetObj, row, col, 'b_', 'A', 'I', 'H');
	}
//	mutiSheetOnClick(sheetObj, row, col, 'b_', 'A', 'I', 'H');
}
/**
 * Freight B/C 처리
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet6_OnChange(sheetObj, row, col, value) {
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
		case "b_fr_trdp_cd" :
			if(value < 0){
				sheetObj.SetCellValue(row, "b_fr_trdp_nm",'');				
			}
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
	mutiSheetOnChange(sheetObj, row, col,  'b_', 'A', 'I', 'H');
}
function sheet6_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'b_');
}
/**
 * Freight B/C 코드입력시 Name조회
 */
/*
function sheet6_OnKeyUp(sheetObj, row, col, keyCode){
	doAutoCdFind('b_', sheetObj, row, col, keyCode);
}
*/
/**
 * Selling/Debit Sheet를 리턴함
 */
function getSdSheet(){
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[1];
}
function getSdUrl(){
	return "./AII_BMD_0024GS.clt";
}
function getSdFndSeq(){
	return 4;
}
/**
 * Buying/Selling Sheet를 리턴함
 */
function getBcSheet(){
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[2];
}
/**
 * Debit/Selling Sheet를 리턴함
 */
function getDcSheet(){
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[6];
}
function getBcUrl(){
	return "./AII_BMD_0024GS.clt";
}
function getBcFndSeq(){
	return 5;
}
//***************Freight Sheets Event처리 종료***************
var etdRangeOk=true;
var etaRangeOk=true;
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
	//if(checkInputVal(frm1.bl_no.value, 2, 16, "T", 'HAWB No.')!='O'){ //S.Y BAIK (2013.01.23)
	if(getStringLength(frm1.bl_no.value) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_HANO'));
		moveTab('01');
		isOk=false;
		frm1.bl_no.focus();
		return isOk;
	}
	//else if(checkInputVal(frm1.ref_no.value, 2, 30, "T", 'Filing No.')!='O'){ //S.Y BAIK (2013.01.23)
	else if(getStringLength(frm1.ref_no.value) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_FINO'));
		isOk=false;
		moveTab('01');
		frm1.ref_no.focus();
		return isOk;
	}
	//LHK, 20140612 #33814 [BINEX]Import Mandatory 추가 - Carrier
	else if(frm1.lnr_trdp_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - Carrier");
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	//else if(checkInputVal(frm1.eta_dt_tm.value, 10, 10, "DD", 'Arrival Date')!='O'){ //S.Y BAIK (2013.01.23)
	else if(!checkInType(frm1.eta_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ARRV') + getLabel('FMS_COD_DATE'));
		isOk=false;
		moveTab('01');
		frm1.eta_dt_tm.focus();
		return isOk;
	}
	else if(!checkInType(frm1.f_eta_dt_tm.value, "DD") && trim(frm1.f_eta_tm.value) != ""  ){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + 'Final ETA');
		isOk=false;
		moveTab('01');
		frm1.f_eta_tm.focus();
		return isOk;
	}
	if (trim(frm1.etd_dt_tm.value) != "" && trim(frm1.eta_dt_tm.value) != "") {
		var daysTerms=getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy");
		if (daysTerms < -1) {	//미국에서 수입일 경우 하루 차이가 발생가능 
			// Arrival Date time must be greater than Flight Date time
			alert(getLabel("AIR_MSG_091"));
			frm1.eta_dt_tm.focus();
			isOk=false;
			return isOk; 
		} /*else if (daysTerms == 0) {
			if (getDaysBetweenFormat(frm1.etd_tm, frm1.eta_tm, "hh:mm") < 0) {
				// Arrival Date time must be greater than Flight Date time
				alert(getLabel("AIR_MSG_091"));
				moveTab('01');
				frm1.eta_tm.focus();
				isOk=false;
				return isOk; 
			}
		}*/
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
		isOk=false;
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
	//var tmpEtdDate=frm1.etd_dt_tm.value.replaceAll("-", "");
	var tmpEtaDate=frm1.eta_dt_tm.value.replaceAll("-", "");
	//var etdDate=new Date(tmpEtdDate.substring(4,8), tmpEtdDate.substring(0,2)-1, tmpEtdDate.substring(2,4));
	var etaDate=new Date(tmpEtaDate.substring(4,8), tmpEtaDate.substring(0,2)-1, tmpEtaDate.substring(2,4));
	var tmpDate=new Date();
	var today=new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()); 
	/*
	if((today-etdDate)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	}else if((etdDate-today)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	}else{
		etdRangeOk=true;
	}
	*/
	if((today-etaDate)/(60*60*24*1000) > 180){
		etaRangeOk=false;
	}else if((etaDate-today)/(60*60*24*1000) > 180){
		etaRangeOk=false;
	}else{
		etaRangeOk=true;
	}
	/*==================================================================================================*/
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용						    */
	/* Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류 발생을 차단. */
	var sheetObjArr=new Array(3);
		fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
		sheetObjArr[0]=docObjects[1];		//AR LOCAL  'fr_'
		sheetObjArr[1]=docObjects[6];		//DC 		'dc_fr_'
		sheetObjArr[2]=docObjects[2];		//AP 		'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){	//Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/*=================================================================================================*/
	
	//Item List validation.
	fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
	var cmdtListParam=docObjects[9].GetSaveString(false);
	if(docObjects[9].IsDataModified() && cmdtListParam == "") { isOk=false; };
	if(cmdtListParam!=''){
		if(itemCheckInpuVals(docObjects[9])){
			isOk=false;
		}
	}
	
//	#1351 [CLT] B/L, AWB 등 Freight 탭에 대한 Mandatory Validation 메시지 기능 보완
	var frtSdListParam=docObjects[1].GetSaveString(false);
    if(docObjects[1].IsDataModified() && frtSdListParam == "") { isOk=false; moveTab('03'); };

    var frtBcListParam=docObjects[2].GetSaveString(false);
    if(docObjects[2].IsDataModified() && frtBcListParam == "") { isOk=false; moveTab('03'); };

    var frtDcListParam=docObjects[6].GetSaveString(false);
    if(docObjects[6].IsDataModified() && frtDcListParam == "") { isOk=false; moveTab('03'); };
	
	//alert(isOk);
	// 24620 CCN NO 중복 체크
	checkDuplCcn();
	if (ccn_dupl){
		//[warning] Duplicated CCN number found.
	 	alert(getLabel('FMS_COM_ALT063'));
	 	moveTab('02');
	 	frm1.ccn_no.value="";
	 	frm1.ccn_no.focus();
	 	isOk=false;
	}
	return isOk;
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
	var inLen=0;
	for(var i=1; i < totRow ; i++){
if(sheetObj.GetCellValue(i, 'xpt_ibflag')=='U'||sheetObj.GetCellValue(i, 'xpt_ibflag')=='I'){
inLen=getStringLength(trim(sheetObj.GetCellValue(i, 'xpt_no')))
			//if(checkInputVal(sheetObj.CellValue(i, 'xpt_no'), 10, 20, "T", '수출신고번호')!='O'){
			if(inLen < 10 || inLen > 20){
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BOND') + getLabel('FMS_COD_NUM_'));
				isError=true;
				return isError;
			}
		}
	}
	return isError;
}
function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt"){
		//formObj.grs_wgt.value = calcWeight(formObj.grs_wgt.value, 0);
		chkComma(formObj.grs_wgt,8,1);
		formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
		chkComma(formObj.grs_wgt1,8,1);
	}
	else if(obj.name=="grs_wgt1"){
		//formObj.grs_wgt1.value = calcWeight(formObj.grs_wgt1.value, 1);
		chkComma(formObj.grs_wgt1,8,1);
		formObj.grs_wgt.value=roundXL(formObj.grs_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 1);
		chkComma(formObj.grs_wgt,8,1);
	}
	if(obj.name=="chg_wgt"){
		//#41637 - [BINEX] Charge weight
		//formObj.chg_wgt.value=calcWeight(formObj.chg_wgt.value.replaceAll(",",""), 0);
		chkComma(formObj.chg_wgt,8,1);
		formObj.chg_wgt1.value=roundXL(formObj.chg_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
		chkComma(formObj.chg_wgt1,8,1);
		//formObj.agent_chg_wgt.value = formObj.chg_wgt.value;
		//formObj.agent_chg_wgt1.value = formObj.chg_wgt1.value;
	}
	else if(obj.name=="chg_wgt1"){
		//#41637 - [BINEX] Charge weight
		//formObj.chg_wgt1.value=calcWeight(formObj.chg_wgt1.value.replaceAll(",",""), 1);
		chkComma(formObj.chg_wgt1,8,1);
		formObj.chg_wgt.value=roundXL(formObj.chg_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 1);
		chkComma(formObj.chg_wgt,8,1);
		//formObj.agent_chg_wgt1.value = formObj.chg_wgt1.value;
		//formObj.agent_chg_wgt.value = formObj.chg_wgt.value;
	}
	else if(obj.name=="pck_qty"){
		formObj.vol_wgt.value=calcWeight(parseInt((formObj.vol_meas.value.replaceAll(",","") * 1000 / 6) * 1000) / 1000, 0);
		var bl_grs_wgt=0;
		//if(formObj.agent_grs_wgt.value.replaceAll(",","") - formObj.grs_wgt.value.replaceAll(",","") >= 0){
		//	bl_grs_wgt = formObj.agent_grs_wgt.value.replaceAll(",","");
		//}else{
			bl_grs_wgt=formObj.grs_wgt.value.replaceAll(",","");
		//}
		//if(bl_grs_wgt - formObj.vol_wgt.value.replaceAll(",","") >= 0){
		//	formObj.agent_chg_wgt.value = calcWeight(bl_grs_wgt, 0);
			//formObj.chg_wgt.value = calcWeight(bl_grs_wgt, 0);
		//}else{
		//	formObj.agent_chg_wgt.value = calcWeight(formObj.vol_wgt.value.replaceAll(",",""), 0);
			formObj.chg_wgt.value=calcWeight(formObj.vol_wgt.value.replaceAll(",",""), 0);
			//alert(formObj.chg_wgt.value);
		//}
		//weightChange(formObj.agent_chg_wgt);
		weightChange(formObj.chg_wgt);
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
function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="meas"){
		formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, 3);
		chkComma(formObj.meas1,8,3);
	}
	/*
	else if(obj.name=="meas1"){
		formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, 3);
		chkComma(formObj.meas,8,3);
	}
	*/
}
function setOfficeData(){
	var formObj=document.frm1;
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj=docObjects[1];
	//office post date setting, Ocean Export
//	if(formObj.post_dt.value==""){
//		if(ofc_post_dt=="TODAY"){
//			formObj.post_dt.value = getTodayStr();
//		}
//	}
	/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
	setSizeUtCd(oth_size_ut_cd);
	//formObj.ref_ofc_cd.value = v_ofc_cd; //[20131230 OJG]
	if (formObj.copy_bl_seq.value == ""){
		formObj.curr_cd.value=ofc_curr_cd;
	}
}
function checkRefNo(obj){
	if(frm1.ref_no.value!=""){
		ajaxSendPost(getRefNoInfo, 'reqVal', '&goWhere=aj&bcKey=getRefNoInfo&air_sea_clss_cd=A&bnd_clss_cd=I&ref_no='+frm1.ref_no.value, './GateServlet.gsl');
	}else{
		frm1.ref_no.value="";
		frm1.ref_ofc_cd.value="";
	}
}
function getRefNoInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var result=doc[1].split('^^');
			//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
			var cfmFlg=true;
			if(frm1.prnr_trdp_cd.value != ""){
				cfmFlg=confirm(getLabel('AIR_MSG_100'));
			}
			frm1.ref_ofc_cd.value=result[1];
			frm1.rlt_intg_bl_seq.value=result[2];
			frm1.mbl_no.value=result[3]; //master bl no
			frm1.lnr_trdp_cd.value=result[6]; //lnr_trdp_cd
			frm1.lnr_trdp_nm.value=result[7]; //lnr_trdp_nm
			frm1.pod_nod_cd.value=result[8]; //pod_cd
			frm1.pod_cd.value=result[8]; //pod_cd
			frm1.pod_nm.value=result[9]; //pod_nm
			frm1.pol_nod_cd.value=result[10]; //pol_cd
			frm1.pol_cd.value=result[10]; //pol_cd
			frm1.pol_nm.value=result[11]; //pol_nm
			frm1.etd_dt_tm.value=modiStrDateType(result[12].substring(0,8), 1); //etd_dt_tm
			frm1.eta_dt_tm.value=modiStrDateType(result[13].substring(0,8), 1); //eta_dt_tm
			frm1.post_dt.value=modiStrDateType(result[51].substring(0,8), 1); //eta_dt_tm
			frm1.etd_tm.value=frm1.etd_dt_tm.value=='' ? '' : result[12].substring(8,10) + ":" + result[12].substring(10,12);
			frm1.eta_tm.value=frm1.eta_dt_tm.value=='' ? '' : result[13].substring(8,10) + ":" + result[13].substring(10,12);
			frm1.flt_no.value=result[14];
			/* 
			 * 아래 로직에서 또 호출됨 , 주석 처리함 , lhk 20140318 
			frm1.prnr_trdp_cd.value=result[34];
			frm1.prnr_trdp_nm.value=result[35];
			frm1.prnr_trdp_addr.value=result[36];
			*/
			
//			#1072 [AIF] V440 AI AWB Logic 변경 - Freight Location
			frm1.cfs_trdp_cd.value=result[48]; //frt_loc_cd
			frm1.cfs_trdp_nm.value=result[49]; //frt_loc_nm
			if(result[50]!=''){
				frm1.f_eta_dt_tm.value=modiStrDateType(result[50].substring(0,8), 1); //f_eta_dt_tm
				frm1.f_eta_tm.value=result[50].substring(8,10) + ":" + result[50].substring(10,12);
				frm1.post_dt.value=modiStrDateType(result[51].substring(0,8), 1); //f_eta_dt_tm
			}
			//--------------------------------------
			frm1.flt_no.value=result[14];
			frm1.prnr_trdp_cd2.value=result[25];
			frm1.prnr_trdp_nm2.value=result[26];
			frm1.prnr_trdp_addr2.value=result[38];
			frm1.ts1_port_cd.value=result[42];
			frm1.ts1_flt_no.value=result[43];
			frm1.ts2_port_cd.value=result[44];
			frm1.ts2_flt_no.value=result[45];
			frm1.ts3_port_cd.value=result[46];
			frm1.ts3_flt_no.value=result[47];
			frm1.mrn_no.value=result[57]; //mrn_no
			
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start */  
			if(result[56] != null && result[56] != '' && (result[56] == 'DR' || result[56] == 'FW' || result[56] == 'DT'))
			{
				frm1.hbl_tp_cd.value=result[56]; //hbl_tp_cd
				//frm1.ntfy_trdp_cd.value			= result[58]; //ntfy_trdp_cd
				//frm1.ntfy_trdp_nm.value			= result[59]; //ntfy_trdp_nm
				//frm1.ntfy_trdp_addr.value		= result[60]; //ntfy_trdp_addr
				//frm1.fnl_dest_loc_cd.value		= result[61]; //fnl_dest_loc_cd
				//frm1.fnl_dest_loc_nm.value		= result[62]; //fnl_dest_loc_nm
				//frm1.profit_share.value			= result[63]; //profit_share
//				frm1.pck_qty.value=result[64]; //pck_qty
//				frm1.pck_ut_cd.value=result[65]; //pck_ut_cd
				//frm1.grs_wgt.value				= result[66]; //grs_wgt
				//frm1.grs_wgt1.value				= result[67]; //grs_wgt1
				//frm1.meas.value					= result[68]; //meas
				//frm1.meas1.value				= result[69]; //meas1
				frm1.bl_iss_dt.value=result[70]; //bl_iss_dt
				frm1.shpr_trdp_cd.value=result[34]; //shpr_trdp_cd
				frm1.shpr_trdp_nm.value=result[35]; //shpr_trdp_nm
				frm1.shpr_trdp_addr.value=result[36]; //shpr_trdp_addr
				frm1.cnee_trdp_cd.value=result[23]; //cnee_trdp_cd
				frm1.cnee_trdp_nm.value=result[24]; //cnee_trdp_nm
				frm1.cnee_trdp_addr.value=result[37]; //cnee_trdp_addr
				/* jsjang 2013.7.10 요구사항 #17108 HAWB Agent 정보 추가 Start */
				/*
				frm1.prnr_trdp_cd.value=result[71]; //prnr_trdp_cd
				frm1.prnr_trdp_nm.value=result[72]; //prnr_trdp_nm
				frm1.prnr_trdp_addr.value=result[73]; //prnr_trdp_addr	
				*/
				/* jsjang 2013.7.10 요구사항 #17108 HAWB Agent 정보 추가 End */
				//frm1.bl_dt_tm.value				= result[79]; //bl_dt_tm
				//disp_ntfy_flg
				//if(result[80]=="Y"){
				//	frm1.disp_ntfy_flg.checked = true;
				//}
				//else{
				//	frm1.disp_ntfy_flg.checked = false;
				//}				
				//frm1.cargo_tp_cd.value			= result[81]; //cargo_tp_cd
				frm1.rep_cmdt_cd.value=result[82];	//rep_cmdt_cd
				frm1.rep_cmdt_nm.value=result[83];	//rep_cmdt_nm
				//frm1.agent_grs_wgt.value		= result[66];	//agent_grs_wgt
				//frm1.agent_grs_wgt1.value		= result[67];	//agent_grs_wgt1
				frm1.grs_wgt.value=result[66];	//grs_wgt
				frm1.grs_wgt1.value=result[67];	//grs_wgt1
				//frm1.agent_chg_wgt.value		= result[84];	//agent_chg_wgt
				//frm1.agent_chg_wgt1.value		= result[85];	//agent_chg_wgt1
				frm1.chg_wgt.value=result[84];	//chg_wgt
				frm1.chg_wgt1.value=result[85];	//chg_wgt1
				/*
				frm1.vol_wgt.value=result[86];	//vol_wgt
				frm1.vol_meas.value=result[87];	//vol_meas
				frm1.h_vol_meas.value=result[87]; //h_vol_meas
				*/
				if(result[88]=="CM"){
					frm1.size_ut_cd[0].checked=true;
					frm1.size_ut_cd[1].checked=false;
				}else if(result[88]=="INCH"){
					frm1.size_ut_cd[0].checked=false;
					frm1.size_ut_cd[1].checked=true;
				}else{
					frm1.size_ut_cd[0].checked=false;
					frm1.size_ut_cd[1].checked=false;
				}
				frm1.size_ut_cd1.value=result[88];
				/*
				frm1.decl_cstms_val.value=result[89];	//decl_cstms_val
				frm1.rt_clss_cd.value=result[90];	//rt_clss_cd
				*/
				frm1.prnr_ref_no.value=result[91];	//prnr_ref_no
//				frm1.curr_cd.value=result[92];	//curr_cd
			}
			
//			frm1.pck_qty.value=result[64]; //pck_qty
//			frm1.pck_ut_cd.value=result[65]; //pck_ut_cd
			frm1.pck_ut_cd.value="CT";
			
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */  	
			/* jsjang 2013.7.10 요구사항 #17108 HAWB Agent 정보 추가 Start */
			//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
			if(cfmFlg){
				frm1.prnr_trdp_cd.value=result[34]; //prnr_trdp_cd
				frm1.prnr_trdp_nm.value=result[35]; //prnr_trdp_nm
				frm1.prnr_trdp_addr.value=result[36]; //prnr_trdp_addr	
			}	
			/* jsjang 2013.7.10 요구사항 #17108 HAWB Agent 정보 추가 End */			
			frm1.pre_ccn_no.value=result[98];//#24620 ccn 
			frm1.mnf_fr_loc.value=result[99];//#24620 ccn 
			frm1.mnf_to_loc.value=result[100];//#24620 ccn 
			
			//#48209
			frm1.sto_start_dt.value=result[105];//#24620 ccn
			
			frm1.ctrb_ofc_cd.value   = result[108];
			(result[109] == "Y") ? frm1.ctrb_ratio_yn.checked = true : frm1.ctrb_ratio_yn.checked = false;
			frm1.ctrb_mgn.value      = result[107];
			frm1.ctrb_dept_cd.value  = result[106];
			frm1.bl_ser_no.value     = result[104];
			frm1.curr_cd.value       = result[92];
			frm1.ccn_no.value        = result[98];
			frm1.eta_fpoe_tm.value   = result[112];
			frm1.fpoe_tm.value       = result[113];
			
			if(result[61] == ""){
				frm1.fnl_dest_loc_cd.value=result[8]; //final_destination
				frm1.fnl_dest_loc_nm.value=result[9]; //final_destination
			}else{
				frm1.fnl_dest_loc_cd.value= result[61]; //fnl_dest_loc_cd
				frm1.fnl_dest_loc_nm.value= result[62]; //fnl_dest_loc_nm
			}

			frm1.first_port_cd.value= result[114]; //first_port
			frm1.first_port_nm.value= result[115]; //first_port
			
		}else{
			frm1.ref_no.value='';
			frm1.ref_ofc_cd.value='';
			frm1.rlt_intg_bl_seq.value='';
			frm1.mbl_no.value='';
			frm1.lnr_trdp_cd.value='';
			frm1.lnr_trdp_nm.value='';
			frm1.pod_nod_cd.value='';
			frm1.pod_cd.value='';
			frm1.pod_nm.value='';
			frm1.pol_nod_cd.value='';
			frm1.pol_cd.value='';
			frm1.pol_nm.value='';
			frm1.etd_dt_tm.value='';
			frm1.eta_dt_tm.value='';
			frm1.etd_tm.value='';
			frm1.eta_tm.value='';
			frm1.flt_no.value='';
			frm1.f_eta_dt_tm.value='';
			//--------------------------------------
			frm1.flt_no.value='';
			frm1.prnr_trdp_cd2.value='';
			frm1.prnr_trdp_nm2.value='';
			frm1.prnr_trdp_addr2.value='';
			frm1.ts1_port_cd.value='';
			frm1.ts1_flt_no.value='';
			frm1.ts2_port_cd.value='';
			frm1.ts2_flt_no.value='';
			frm1.ts3_port_cd.value='';
			frm1.ts3_flt_no.value='';
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start */  
			if (result != undefined) {
				if(result[56] != null && result[56] != '' && (result[56] == 'DR' || result[56] == 'FW' || result[56] == 'DT'))
				{
					frm1.hbl_tp_cd.value='';
					frm1.pck_qty.value='';
					frm1.pck_ut_cd.value='';
					frm1.bl_iss_dt.value='';
					frm1.shpr_trdp_cd.value='';
					frm1.shpr_trdp_nm.value='';
					frm1.shpr_trdp_addr.value='';
					frm1.cnee_trdp_cd.value='';
					frm1.cnee_trdp_nm.value='';
					frm1.cnee_trdp_addr.value='';r
					frm1.rep_cmdt_cd.value='';
					frm1.rep_cmdt_nm.value='';
					frm1.grs_wgt.value='';
					frm1.grs_wgt1.value='';
					frm1.chg_wgt.value='';
					frm1.chg_wgt1.value='';
					frm1.size_ut_cd[0].checked=true;
					frm1.size_ut_cd[1].checked=false;	
					frm1.size_ut_cd1.value='';				
					frm1.prnr_ref_no.value='';
					frm1.curr_cd.value='';
				}
			}
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */ 
			frm1.prnr_trdp_cd.value='';
			frm1.prnr_trdp_nm.value='';
			frm1.prnr_trdp_addr.value='';	
			frm1.eta_fpoe_tm.value='';
			frm1.fpoe_tm.value='';
		}  
		
		// Contribution Margin 조회
		if (frm1.act_shpr_trdp_cd.value != ""){
			setCtrbMgn(frm1.act_shpr_trdp_cd.value);
		}
	}else{
	}
	//#2168 [BNX] Sales PIC based on Sales type does not simultaneously update
	changeSalesType();
}
function sheet14_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj,'dc_', 'A', 'I', 'H');
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
		mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'A', 'I', 'H');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'A', 'I', 'H');
}
/**
 * Freight B/C 처리
 */
function sheet14_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "dc_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, 'dc_', 'A', 'I', 'H');
	}else{
		mutiSheetOnClick(sheetObj, row, col, 'dc_', 'A', 'I', 'H');
	}
//	mutiSheetOnClick(sheetObj, row, col, 'dc_', 'A', 'I', 'H');
}
/**
 * Freight B/C 처리
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet14_OnChange(sheetObj, row, col, value) {
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
		case "dc_fr_trdp_cd" :
			if(value < 0){
				sheetObj.SetCellValue(row, "dc_fr_trdp_nm",'');				
			}
		break;
	}
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col,  'dc_', 'A', 'I', 'H')
}
function sheet14_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'dc_');
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
			param += "&f_biz_clss_cd=H";
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
			param += "&f_air_sea_clss_cd=A";
			param += "&f_biz_clss_cd=H";
			param += "&f_bnd_clss_cd=I";
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
			param += "&f_air_sea_clss_cd=A";
			param += "&f_biz_clss_cd=H";
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
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	var arObj=docObjects[1];
	var apObj=docObjects[2];
	var dcObj=docObjects[6];
	switch(obj){
		case "LOCAL":
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
		if(frm1.ntfy_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.ntfy_trdp_addr.value == ""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.ntfy_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);
			}			
		}
	}else if(obj.name=="act_shpr_trdp_nm"){
	}else if(obj.name=="cust_trdp_nm"){
		if(frm1.cust_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.cust_trdp_addr.value == ""){
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
//Dim 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
function sheet4_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "dim_meas1" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			gridAdd(7);
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "dim_len_dim" :
		case "dim_wdt_dim" :
		case "dim_hgt_dim" :
		case "dim_pce_qty" :
		case "dim_chg_wgt"  :
		case "dim_chg_wgt1" :
		case "dim_meas" :
		case "dim_meas1" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
function cbCheck(){
	if(frm1.cnee_trdp_cd.value!=''){
		ajaxSendPost(getCbList, 'reqVal', '&goWhere=aj&bcKey=getCbList&trdp_cd='+frm1.cnee_trdp_cd.value, './GateServlet.gsl');
	}
}
function getCbList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpVal=doc[1].split("^^;");
			if(tmpVal.length<2){
			}else if(tmpVal.length==2){
				//Customs Broker가 하나 밖에 없으므로 바로 셋팅
				var resultVal=tmpVal[0].split("@@^");
				frm1.cust_trdp_cd.value=resultVal[3];
				frm1.cust_trdp_nm.value=resultVal[4];
				frm1.cust_trdp_addr.value=resultVal[5];
				
				trCheck();
				
			}else if(tmpVal.length>2){
				//Customs Broker가 2개 이상이면 팝업으로 조회함
				rtnary=new Array(1);
		   		rtnary[0]=doc[1];
		   		rtnary[1]="Customs Broker"; //Popup title;
		   		
		   		callBackFunc = "getCbList_callBackFunc";
		   	    modal_center_open('./CMM_POP_0340.clt', rtnary, 350,270,"yes");
				
			}
		} else {
			trCheck();
			//#5961 [Binex-LA] arrival notice sent to wrong recipient
			frm1.cust_trdp_cd.value="";
			frm1.cust_trdp_nm.value="";
			frm1.cust_trdp_addr.value="";
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function getCbList_callBackFunc(rtnVal){
   	if(!(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined)) {
		var rtnValAry=rtnVal.split("|");
		frm1.cust_trdp_cd.value=rtnValAry[2];
		frm1.cust_trdp_nm.value=rtnValAry[3];
		frm1.cust_trdp_addr.value=rtnValAry[4];
	}
   	//trCheck();
   	// IE Debug시 Error 발생하여 처리
   	setTimeout("trCheck()",500);
}

function trCheck(){
	if(frm1.cnee_trdp_cd.value!=''){
		ajaxSendPost(getTrList, 'reqVal', '&goWhere=aj&bcKey=getTrList&trdp_cd='+frm1.cnee_trdp_cd.value, './GateServlet.gsl');
	}
}
function getTrList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpVal=doc[1].split("^^;");
			if(tmpVal.length<2){
			}else if(tmpVal.length==2){
				//Customs Broker가 하나 밖에 없으므로 바로 셋팅
				var resultVal=tmpVal[0].split("@@^");
				frm1.trk_trdp_cd.value=resultVal[3];
				frm1.trk_trdp_nm.value=resultVal[4];
				frm1.trk_trdp_addr.value=resultVal[5];
				
				doCheck();
				
			}else if(tmpVal.length>2){
				//Customs Broker가 2개 이상이면 팝업으로 조회함
				rtnary=new Array(1);
		   		rtnary[0]=doc[1];
		   		rtnary[1]="Trucker";	//set Popup title
		   		callBackFunc = "getTrList_callBackFunc";
		   	    modal_center_open('./CMM_POP_0340.clt', rtnary, 350,270,"yes");
			}
		} else {
			doCheck();
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function getTrList_callBackFunc(rtnVal){
   	if(!(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined)){
		var rtnValAry=rtnVal.split("|");
		frm1.trk_trdp_cd.value=rtnValAry[2];
		frm1.trk_trdp_nm.value=rtnValAry[3];
		frm1.trk_trdp_addr.value=rtnValAry[4];
	}
//   	doCheck();
   	// IE Debug시 Error 발생하여 처리
   	setTimeout("doCheck()",500);
}

function doCheck(){
	if(frm1.cnee_trdp_cd.value!=''){
		ajaxSendPost(getDoList, 'reqVal', '&goWhere=aj&bcKey=getDoList&trdp_cd='+frm1.cnee_trdp_cd.value, './GateServlet.gsl');
	}	
}
function getDoList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpVal=doc[1].split("^^;");
			if(tmpVal.length<2){
			}else if(tmpVal.length==2){
				//Customs Broker가 하나 밖에 없으므로 바로 셋팅
				var resultVal=tmpVal[0].split("@@^");
				frm1.door_loc_cd.value=resultVal[3];
				frm1.door_loc_nm.value=resultVal[4];
//				frm1.trk_trdp_addr.value = resultVal[5];
			}else if(tmpVal.length>2){
				//Customs Broker가 2개 이상이면 팝업으로 조회함
				rtnary=new Array(1);
		   		rtnary[0]=doc[1];
		   		rtnary[1]="Door Delivery";	//set Popup title
		   		callBackFunc = "getDoList_callBackFunc";
		   		modal_center_open('./CMM_POP_0340.clt', rtnary, 350,270,"yes");
			}
		}else{
			frm1.door_loc_cd.value=frm1.cnee_trdp_cd.value;
			frm1.door_loc_nm.value=frm1.cnee_trdp_nm.value;
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function getDoList_callBackFunc(rtnVal){
   	if(!(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined)){
		var rtnValAry=rtnVal.split("|");
		frm1.door_loc_cd.value=rtnValAry[2];
		frm1.door_loc_nm.value=rtnValAry[3];
	}
}

function selectDCList(obj){
	var sheetObj=obj;
	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
		if(sheetObj.GetCellValue(i, "fr_frt_check")=="1" && sheetObj.GetCellValue(i, "fr_rat_curr_cd")!="KRW"){
			gridAdd(6);
			var tmpSheetObj=docObjects[6];
			var tmpCnt=docObjects[6].RowCount() - 1;
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_sell_buy_tp_cd",'C');
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_frt_cd",sheetObj.GetCellValue(i, "fr_frt_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_frt_cd_nm",sheetObj.GetCellValue(i, "fr_frt_cd_nm"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_trdp_cd",frm1.prnr_trdp_cd.value);
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_trdp_nm",frm1.prnr_trdp_nm.value);
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_rat_curr_cd",sheetObj.GetCellValue(i, "fr_rat_curr_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_aply_ut_cd",sheetObj.GetCellValue(i, "fr_aply_ut_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_cntr_tpsz_cd",sheetObj.GetCellValue(i, "fr_cntr_tpsz_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_qty",sheetObj.GetCellValue(i, "fr_qty"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_scg_incl_flg",sheetObj.GetCellValue(i, "fr_scg_incl_flg"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_frt_term_cd",sheetObj.GetCellValue(i, "fr_frt_term_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_ru",0);
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_agent_ru",sheetObj.GetCellValue(i, "fr_ru"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_trf_cur_sum_amt",sheetObj.GetCellValue(i, "fr_trf_cur_sum_amt"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_vat_rt",0);
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_vat_amt",0);
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_curr_cd",sheetObj.GetCellValue(i, "fr_rat_curr_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_xcrt",1);
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_xcrt_dt",sheetObj.GetCellValue(i, "fr_inv_xcrt_dt"));
//			tmpSheetObj.CellValue(tmpCnt, "dc_fr_inv_amt") 			= sheetObj.CellValue(i, "fr_inv_amt");
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_vat_amt",0);
//			tmpSheetObj.CellValue(tmpCnt, "dc_fr_inv_sum_amt") 		= sheetObj.CellValue(i, "fr_inv_sum_amt");
//			tmpSheetObj.CellValue(tmpCnt, "dc_fr_agent_amt") 		= 0;
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_perf_curr_cd",sheetObj.GetCellValue(i, "fr_perf_curr_cd"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_perf_xcrt",sheetObj.GetCellValue(i, "fr_perf_xcrt"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_perf_amt",sheetObj.GetCellValue(i, "fr_perf_amt"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_perf_vat_amt",sheetObj.GetCellValue(i, "fr_perf_vat_amt"));
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_no",'');
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_buy_inv_no",'');
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_seq",'');
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_sts_cd",'');
			tmpSheetObj.SetCellValue(tmpCnt, "dc_fr_inv_sts_nm",'');
		}
	}
	for(var j=2 ; j<sheetObj.LastRow() + 1 ; j++){
		sheetObj.SetCellValue(j, "fr_frt_check","0",0);
	}
}
// Freight AR 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
//freight tab에서 trdp_nm을 enter로 조회할 수 있도록 설정
function sheet5_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, '', 'A', 'I', 'H');
		}
	}
	if(sheetObj.LastRow()== row && "fr_reserve_field01" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//gridAdd(1);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('ROWADD', docObjects[1], 'A', 'I', 'H');
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
//freight tab에서 trdp_nm을 enter로 조회할 수 있도록 설정
function sheet6_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="b_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'A', 'I', 'H');
		}
	}
	if(sheetObj.LastRow()== row && "b_fr_reserve_field01" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//gridAdd(2);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('BCROWADD', docObjects[2], 'A', 'I', 'H');
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
//freight tab에서 trdp_nm을 enter로 조회할 수 있도록 설정
function sheet14_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="dc_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'A', 'I', 'H');
		}
	}
	if(sheetObj.LastRow()== row && "dc_fr_frt_check" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			//gridAdd(6);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('DCROWADD', docObjects[6], 'A', 'I', 'H');
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

function sheet11_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="modi_usrid"){		
		gridAdd(3);
		sheetObj.SelectCell(row+1, 1); 
	}
}

var grobalFlag="";
function selectAutoAir(flag){
	var param='';
	if(flag=="S"){
		grobalFlag=flag;
		//frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
		param += '&trdp_tp_cd=';
		param += '&sell_buy_tp_cd=A' + '&bnd_clss_cd=I';
		frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
		frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
		frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	}else if(flag=="B"){
		grobalFlag=flag;
		//frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
		param += '&trdp_tp_cd=';
		param += '&sell_buy_tp_cd=A' + '&bnd_clss_cd=I';
		frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
		frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
		frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	}else if(flag=="D"){
		grobalFlag=flag;
		//frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
		param += '&trdp_tp_cd=';
		param += '&sell_buy_tp_cd=A' + '&bnd_clss_cd=I';
		frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
		frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
		frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	}
	ajaxSendPost(getAutoAir, 'reqVal', '&goWhere=aj&bcKey=selectAutoAir'+param, './GateServlet.gsl');
}
function getAutoAir(reqVal){
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
				gridVal=1;
				trdp_cd=frm1.act_shpr_trdp_cd.value;
				fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
				sheetObj=docObjects[1];
			}else if(grobalFlag=="B"){
				objPfx='b_';
				gridVal=2;
				trdp_cd='';
				fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
				sheetObj=docObjects[2];
			}else if(grobalFlag=="D"){
				objPfx='dc_';
				gridVal=6;
				trdp_cd=frm1.prnr_trdp_cd.value;
				fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
				sheetObj=docObjects[6];
			}
			for(var i=0 ; i<dtlArray.length-1 ; i++){
				var tmpArray=dtlArray[i].split("^^^");
				var rows=0;
				var grsWgtKg=frm1.grs_wgt.value;
				var chgWgtKg=frm1.chg_wgt.value;
				var masterWgt='';
				if(tmpArray[4]=="AGW"){
					masterWgt=grsWgtKg;
				}else if(tmpArray[4]=="ACW"){
					masterWgt=chgWgtKg;
				}
				//section range check
				var useFlag=true;
				if(tmpArray[8]==0 && tmpArray[9]==0){
					alert(1 + "  " + tmpArray[8] + "  " + tmpArray[9]);
				}else if(tmpArray[8]==0 && tmpArray[9]!=0){
					if(0<=masterWgt-tmpArray[9]){
						useFlag=false;
					}
				}else if(tmpArray[8]!=0 && tmpArray[9]==0){
					if(tmpArray[8]-msterWgt>0){
						useFlag=false;
					}
				}else if(tmpArray[8]!=0 && tmpArray[9]!=0){
					if(tmpArray[8]-masterWgt>0 || 0<=masterWgt-tmpArray[9]){
						useFlag=false;
					}
				}
				if(useFlag){
					gridAdd(gridVal);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_cd",tmpArray[0]);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_cd_nm",tmpArray[1]);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_trdp_cd",trdp_cd);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_rat_curr_cd",tmpArray[3]);
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_aply_ut_cd",tmpArray[4]);
					if(user_ofc_cnt_cd=="KR" && grobalFlag=="S"){
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_curr_cd","KRW");
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_frt_term_cd","CC");
					}else{
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_curr_cd",tmpArray[4]);
					}
					if(tmpArray[4]=="AGW"){
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",grsWgtKg);
					}
					else if(tmpArray[4]=="ACW"){
						sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_qty",chgWgtKg);
					}
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_ru",tmpArray[7]);
					var tmpInvSumAmt=sheetObj.GetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_sum_amt");
					/*if(tmpArray[5]==0 && tmpArray[6]==0){
					}
					else*/ 
					if(tmpArray[5]!=0 && tmpArray[6]==0){
						if(tmpArray[5]-tmpInvSumAmt>0){
							tmpInvSumAmt=tmpArray[5];
						}
						/*else{
							tmpInvSumAmt=tmpInvSumAmt;
						}*/
					}
					else if(tmpArray[5]==0 && tmpArray[6]!=0){
						if(tmpArray[6]-tmpInvSumAmt>0){
							//tmpInvSumAmt = tmpInvSumAmt;
						}
						else{
							tmpInvSumAmt=tmpArray[6];
						}
					}
					else if(tmpArray[5]!=0 && tmpArray[6]!=0){
						if(tmpArray[5]-tmpInvSumAmt>0){
							tmpInvSumAmt=tmpArray[5];
						}
						else if(tmpArray[6]-tmpInvSumAmt>0){
							//tmpInvSumAmt = tmpInvSumAmt;
						}
						else{
							tmpInvSumAmt=tmpArray[6];
						}
					}
					sheetObj.SetCellValue(sheetObj.LastRow(), objPfx+"fr_inv_sum_amt",tmpInvSumAmt);
				}
			}
		}
		else{
			//There is no Iata Tariff Info.
			alert(getLabel('FMS_COM_ALT010'));	
		}
	}
}
function setActShipper(){
	var formObj=document.frm1;
 	// #25244 Customer 정보가 있어도 Shipper 변경 시 Customer 를 Shipper 로 다시 변경함
/*	if(  trim(formObj.act_shpr_trdp_cd.value)=="" 
	  && trim(formObj.act_shpr_trdp_nm.value)=="" 
	  && trim(formObj.act_shp_info.value)==""){
		formObj.act_shpr_trdp_cd.value=formObj.cnee_trdp_cd.value;
		formObj.act_shpr_trdp_nm.value=formObj.cnee_trdp_nm.value;
		formObj.act_shp_info.value=formObj.cnee_trdp_addr.value;
	}*/
	/*formObj.act_shpr_trdp_cd.value=formObj.cnee_trdp_cd.value;
	formObj.act_shpr_trdp_nm.value=formObj.cnee_trdp_nm.value;
	formObj.act_shp_info.value=formObj.cnee_trdp_addr.value;
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
	if(formObj.cnee_trdp_nm.value =='' && formObj.cnee_trdp_addr.value ==''){
		formObj.cnee_trdp_cd.value ='';
	}
	
	//OFVFOUR-7340: [JH Logistics] Customer copy option
	if(auto_select_shipper=="N"){
		return;
	}
	
	if(formObj.cnee_trdp_cd.value !=''){
		if(formObj.cnee_trdp_cd.value !=formObj.act_shpr_trdp_cd.value){
			if(confirm(getLabel('FMS_COM_CFMCTC'))){
				formObj.cnee_trdp_cd.value=formObj.act_shpr_trdp_cd.value;
				formObj.cnee_trdp_nm.value=engNm;
				formObj.cnee_trdp_addr.value=blAddr;
			}
		}else{
			if(formObj.cnee_trdp_nm.value =='' && formObj.cnee_trdp_addr.value ==''){
				formObj.cnee_trdp_cd.value ='';
			}
		}
	}else{
		formObj.cnee_trdp_cd.value=formObj.act_shpr_trdp_cd.value;
		formObj.cnee_trdp_nm.value=engNm;
		formObj.cnee_trdp_addr.value=blAddr;
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

function chkSizeType(){
	var formObj=document.frm1;
	fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj=docObjects[7];
	//LHK 20130812 CM에서 INCH SWITCH 할 경우 CMB Auto Calculation 적용
//	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
//		sheetObj.CellValue(i, "dim_act_dim") = 0;
//	}
	var length=0;
	var width=0;
	var height=0;
	var pcs=0;
	var cbm=0;
	var kg=0;
	var sumCbm=0;
	var sumPcs=0;
	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
		length=sheetObj.GetCellValue(i, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_len_dim");
		width=sheetObj.GetCellValue(i, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_wdt_dim");
		height=sheetObj.GetCellValue(i, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_hgt_dim");
		pcs=sheetObj.GetCellValue(i, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(i, "dim_pce_qty");
		if(formObj.size_ut_cd[0].checked){
			kg=roundXL(length * width * height * pcs / 6000, 1);
			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 6);
			sheetObj.SetCellValue(i, "dim_chg_wgt",kg.toFixed(1));
			sheetObj.SetCellValue(i, "dim_chg_wgt1",(kg * CNVT_CNST_KG_LB).toFixed(1));
		} else if(formObj.size_ut_cd[1].checked) {
			kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, 1);
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 6);
			sheetObj.SetCellValue(i, "dim_chg_wgt",kg.toFixed(1)); 
			sheetObj.SetCellValue(i, "dim_chg_wgt1",(kg * CNVT_CNST_KG_LB).toFixed(1)); 
		}
		sheetObj.SetCellValue(i, "dim_act_dim",cbm.toFixed(6),0);
		sheetObj.SetCellValue(i, "dim_meas",cbm.toFixed(6),0);
		sheetObj.SetCellValue(i, "dim_meas1",(cbm * CNVT_CNST_CBM_CFT).toFixed(6),0);
	}
	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
		sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_meas"));
		sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
	}
	/*
	 * 2012.02.15
	 * Total CBM 필드 추가
	 * Total CBM 값을 구하고 Vol Weight로 환산
	 */
	frm1.vol_meas.value=sumCbm.toFixed(6);
	frm1.pck_qty.value=sumPcs.toFixed(0);
	weightChange(frm1.pck_qty);
}
//#24620 CCN NO CHECK
function checkDuplCcn() {
	var formObj=document.frm1;
	if (trim(formObj.ccn_no.value) != '') {
		ajaxSendPost(checkDuplCcnAjaxReq, 'reqVal', '&goWhere=aj&bcKey=checkDuplCcn&bl_seq='+frm1.intg_bl_seq.value+'&ccn_no='+frm1.ccn_no.value, './GateServlet.gsl');
	}else{
		//#2232 [EXTRANS] CCN DUPLICATION VALIDATION
		ccn_dupl=false;
	}
} 
function checkDuplCcnAjaxReq(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	ccn_dupl=false;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if (doc[1] == "ERROR"){
				ccn_dupl=true;
				return;
			}
		} else {
			ccn_dupl=false;
		}
	}
	ccn_dupl=false;
}
//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
/**
* Work Order 화면이동
*/
function sheet15_OnDblClick(sheetObj, row, col){
/*var param='f_wo_no=' + sheetObj.GetCellValue(row, 'wo_no');
	   param += '&air_sea_clss_cd=A'; 
	   param += '&bnd_clss_cd=I';
	   param += '&biz_clss_cd=H';
	   //#34862 - [BINEX]Work Order - Trucker 정보 Link
	   param += '&delivery_ref_no=' + document.frm1.cust_ref_no.value;
	var paramStr="./AIC_WOM_0017.clt?f_cmd="+SEARCH+"&"+param;
	parent.mkNewFrame('Pick/Delivery Instruction', paramStr);*/
	
	var paramStr="./AIC_WOM_0017.clt?air_sea_clss_cd=A&bnd_clss_cd=I&biz_clss_cd=H";
    var param = "&f_cmd=" + SEARCH;
    param += "&f_wo_no=" + sheetObj.GetCellValue(row, 'wo_no');
    param += '&delivery_ref_no=' + frm1.cust_ref_no.value;
    parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
}

function fncBlSearch() {
	var formObj  = document.frm1;
	formObj.f_ref_no.value = formObj.ref_no.value;
	if ( event.keyCode == 13 && formObj.f_ref_no.value != null ) {
		srAirOpenPopUp('REF_POPLIST3',this, 'A', 'I')
	}
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_bl_no.value = getParam(url,"f_bl_no");
	formObj.f_intg_bl_seq.value = getParam(url,"f_intg_bl_seq");
	
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
		   url: "./AII_BMD_0020AJ.clt",
		   dataType: 'xml',
		   data: $("form" ).serialize(),
		   success: function(data){
			   setFieldValue( formObj.bl_sts_cd, $('bl_sts_cd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.f_intg_bl_seq, $('f_intg_bl_seq',data).text());
			   setFieldValue( formObj.mk_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.h_dflt_an_memo, $('dflt_an_memo',data).text());
			   setFieldValue( formObj.h_mbl_curr_cd, $('mbl_curr_cd',data).text());
			   setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());
			   setFieldValue( formObj.f_bl_no, $('f_bl_no',data).text());
			   setFieldValue( formObj.bl_sts_label, $('bl_sts_label',data).text());
			   
			   //AII_BMD_0021 (S)
			   setFieldValue( formObj.bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.h_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.hbl_tp_cd, $('hbl_tp_cd',data).text());
			   setFieldValue( formObj.post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.ams_no, $('ams_no',data).text());
			   setFieldValue( formObj.isf_no, $('isf_no',data).text());
			   setFieldValue( formObj.bl_ser_no, $('bl_ser_no',data).text());
			   setFieldValue( formObj.ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.rlt_intg_bl_seq, $('rlt_intg_bl_seq',data).text());
			   setFieldValue( formObj.mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.prnr_ref_no, $('prnr_ref_no',data).text());
			   setFieldValue( formObj.jb_tmplt_nm, $('jb_tmplt_nm',data).text());
			   setFieldValue( formObj.jb_tmplt_seq, $('jb_tmplt_seq',data).text());
			   setFieldValue( formObj.prnr_trdp_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.prnr_trdp_nm, $('prnr_trdp_nm',data).text());
			   setFieldValue( formObj.prnr_trdp_addr, $('prnr_trdp_addr',data).text());
			   setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
			   setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
			   setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
			   setFieldValue( formObj.ntfy_trdp_cd, $('ntfy_trdp_cd',data).text());
			   setFieldValue( formObj.ntfy_trdp_nm, $('ntfy_trdp_nm',data).text());
			   setFieldValue( formObj.ntfy_trdp_addr, $('ntfy_trdp_addr',data).text());
			   setFieldValue( formObj.cust_trdp_cd, $('cust_trdp_cd',data).text());
			   setFieldValue( formObj.cust_trdp_nm, $('cust_trdp_nm',data).text());
			   setFieldValue( formObj.cust_trdp_addr, $('cust_trdp_addr',data).text());
			   setFieldValue( formObj.act_shpr_trdp_cd, $('act_shpr_trdp_cd',data).text());
			   setFieldValue( formObj.act_shpr_trdp_nm, $('act_shpr_trdp_nm',data).text());
			   setFieldValue( formObj.act_shp_info, $('act_shp_info',data).text());
			   setFieldValue( formObj.third_trdp_cd, $('third_trdp_cd',data).text());
			   setFieldValue( formObj.third_trdp_nm, $('third_trdp_nm',data).text());
			   setFieldValue( formObj.third_trdp_addr, $('third_trdp_addr',data).text());
			   setFieldValue( formObj.prnr_trdp_cd2, $('prnr_trdp_cd2',data).text());
			   setFieldValue( formObj.prnr_trdp_nm2, $('prnr_trdp_nm2',data).text());
			   setFieldValue( formObj.prnr_trdp_addr2, $('prnr_trdp_addr2',data).text());
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.obrd_dt_tm, $('obrd_dt_tm',data).text());
			   setFieldValue( formObj.flt_no, $('flt_no',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.etd_tm, $('etd_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.eta_tm, $('eta_tm',data).text());
			   setFieldValue( formObj.f_eta_dt_tm, $('f_eta_dt_tm',data).text());
			   setFieldValue( formObj.f_eta_tm, $('f_eta_tm',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.pol_nod_cd, $('pol_nod_cd',data).text());
			   setFieldValue( formObj.ts1_port_cd, $('ts1_port_cd',data).text());
			   setFieldValue( formObj.ts1_flt_no, $('ts1_flt_no',data).text());
			   setFieldValue( formObj.ts2_port_cd, $('ts2_port_cd',data).text());
			   setFieldValue( formObj.ts2_flt_no, $('ts2_flt_no',data).text());
			   setFieldValue( formObj.ts3_port_cd, $('ts3_port_cd',data).text());
			   setFieldValue( formObj.ts3_flt_no, $('ts3_flt_no',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.pod_nod_cd, $('pod_nod_cd',data).text());
			   setFieldValue( formObj.fnl_dest_loc_cd, $('fnl_dest_loc_cd',data).text());
			   setFieldValue( formObj.fnl_dest_loc_nm, $('fnl_dest_loc_nm',data).text());
			   setFieldValue( formObj.door_loc_cd, $('door_loc_cd',data).text());
			   setFieldValue( formObj.door_loc_nm, $('door_loc_nm',data).text());
			   setFieldValue( formObj.cfs_trdp_cd, $('cfs_trdp_cd',data).text());
			   setFieldValue( formObj.cfs_trdp_nm, $('cfs_trdp_nm',data).text());
			   setFieldValue( formObj.cfs_nod_cd, $('cfs_nod_cd',data).text());
			   setFieldValue( formObj.cfs_loc_nm, $('cfs_loc_nm',data).text());
			   setFieldValue( formObj.cfs_loc_cd, $('cfs_loc_cd',data).text());
			   setFieldValue( formObj.sto_start_dt, $('sto_start_dt',data).text());
			   setFieldValue( formObj.go_dt_tm, $('go_dt_tm',data).text());
			   setFieldValue( formObj.foreign_dest, $('foreign_dest',data).text());
			   setFieldValue( formObj.wh_arrv_dt_tm, $('wh_arrv_dt_tm',data).text());
			   setFieldValue( formObj.wh_arrv_tm, $('wh_arrv_tm',data).text());
			   setFieldValue( formObj.doc_pkup_on_dt_tm, $('doc_pkup_on_dt_tm',data).text());
			   setFieldValue( formObj.doc_pkup_on_tm, $('doc_pkup_on_tm',data).text());
			   setFieldValue( formObj.doc_pkup_by, $('doc_pkup_by',data).text());
			   setFieldValue( formObj.cgo_rlsd_on_dt_tm, $('cgo_rlsd_on_dt_tm',data).text());
			   setFieldValue( formObj.cgo_rlsd_on_tm, $('cgo_rlsd_on_tm',data).text());
			   setFieldValue( formObj.cgo_rlsd_to, $('cgo_rlsd_to',data).text());
			   setFieldValue( formObj.rep_cmdt_cd, $('rep_cmdt_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.h_rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.inco_cd, $('inco_cd',data).text());
			   setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.chg_wgt, $('chg_wgt',data).text());
			   setFieldValue( formObj.chg_wgt1, $('chg_wgt1',data).text());
			   setFieldValue( formObj.curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   
			   //#399 [BNXON, Common] Available date is not shown on Air Import Arival Notice
			   var availDtTm = $('avail_dt_tm',data).text();
			   if(availDtTm != ""){
				   setFieldValue( formObj.avail_dt_tm, availDtTm.substring(0, 2) + "-" + availDtTm.substring(2, 4) + "-" + availDtTm.substring(4, 8));
			   }
			   
			   if($('frt_term_cd',data).text() == ''){
				   setFieldValue( formObj.frt_term_cd, "CC");
			   }else{
				   setFieldValue( formObj.frt_term_cd, $('frt_term_cd',data).text());
			   }
			   setFieldValue( formObj.size_ut_cd1, $('size_ut_cd',data).text());
			   setFieldValue( formObj.wh_recp_no, $('wh_recp_no',data).text());
			   setFieldValue( formObj.srd_flg, $('srd_flg',data).text());
			   setFieldValue( formObj.nomi_flg, $('nomi_flg',data).text());
			   setFieldValue( formObj.shp_tp_cd, $('shp_tp_cd',data).text());
			   setFieldValue( formObj.bl_iss_dt, $('bl_iss_dt',data).text());
			   setFieldValue( formObj.opr_usrid, $('issued_by',data).text());
			   setFieldValue( formObj.opr_usrnm, $('proc_usrnm',data).text());
			   setFieldValue( formObj.opr_ofc_cd, $('proc_ofccd',data).text());
			   setFieldValue( formObj.opr_dept_cd, $('proc_dept_cd',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   setFieldValue( formObj.sls_usr_nm, $('sls_usr_nm',data).text());
			   setFieldValue( formObj.sls_dept_cd, $('sls_dept_cd',data).text());
			   setFieldValue( formObj.lc_no, $('lc_no',data).text());
			   setFieldValue( formObj.inv_no, $('inv_no',data).text());
			   setFieldValue( formObj.po_no, $('po_no',data).text());
			   setFieldValue( formObj.cnt_cd, $('cnt_cd',data).text());
			   setFieldValue( formObj.cnt_nm, $('cnt_nm',data).text());
			   setFieldValue( formObj.trk_trdp_cd, $('trk_trdp_cd',data).text());
			   setFieldValue( formObj.trk_trdp_nm, $('trk_trdp_nm',data).text());
			   setFieldValue( formObj.trk_trdp_addr, $('trk_trdp_addr',data).text());

			   //AII_BMD_0021 (E)
			   
			   //AII_BMD_0023 (S)
			   setFieldValue( formObj.it_class, $('it_class',data).text());
			   setFieldValue( formObj.it_no, $('it_no',data).text());
			   setFieldValue( formObj.te_dt_tm, $('te_dt_tm',data).text());
			   setFieldValue( formObj.it_loc, $('it_loc',data).text());
			   setFieldValue( formObj.te, $('te',data).text());
			   setFieldValue( formObj.bond_carr_cd, $('bond_carr_cd',data).text());
			   setFieldValue( formObj.bond_carr_nm, $('bond_carr_nm',data).text());
			   setFieldValue( formObj.bond_no, $('bond_no',data).text());
			   setFieldValue( formObj.goods_at, $('goods_at',data).text());
			   setFieldValue( formObj.goods_value, $('goods_value',data).text());
			   setFieldValue( formObj.ccn_no, $('ccn_no',data).text());
			   setFieldValue( formObj.ccn_dt, $('ccn_dt',data).text());
			   setFieldValue( formObj.pre_ccn_no, $('pre_ccn_no',data).text());
			   setFieldValue( formObj.mnf_fr_loc, $('mnf_fr_loc',data).text());
			   setFieldValue( formObj.mnf_to_loc, $('mnf_to_loc',data).text());
			   setFieldValue( formObj.mk_txt, $('mk_txt',data).text());
			   setFieldValue( formObj.desc_txt, $('desc_txt',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   setFieldValue( formObj.att_mk_txt, $('att_mk_txt',data).text());  //#1572 [CARGOZONE] AIH ENTRY - AUTHORITY TO MAKE ENTRY REMARK MAPPING ERROR
			   setFieldValue( formObj.desc_txt1, $('desc_txt1',data).text());
			   setFieldValue( formObj.ucr_no, $('ucr_no',data).text());
			   
			   setFieldValue( formObj.ctrb_ofc_cd, $('ctrb_ofc_cd',data).text());
			   setFieldValue( formObj.ctrb_dept_cd, $('ctrb_dept_cd',data).text());
			   setFieldValue( formObj.ctrb_ratio_yn, $('ctrb_ratio_yn',data).text());
			   setFieldValue( formObj.ctrb_mgn, $('ctrb_mgn',data).text());
			   setFieldValue( formObj.mrn_no, $('mrn_no',data).text());
			   //setFieldValue( formObj.xcrtDt, $('eta_dt_tm',data).text());
			   var etadttm = $('eta_dt_tm',data).text().replaceAll('-','');
			   setFieldValue( formObj.xcrtDt, etadttm);
			   setFieldValue( formObj.f_modify, $('f_modify',data).text()); //#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED
			   
			   //#1041 [BNX Vietnam] A/R Entry does not show any information from AIH
				 setFieldValue( formObj.agent_trdp_cd, $('agent_trdp_cd',data).text());
				 setFieldValue( formObj.agent_trdp_nm, $('agent_trdp_nm',data).text());
				 setFieldValue( formObj.agent_trdp_addr, $('agent_trdp_addr',data).text());

			   //#657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL
			   setFieldValue( formObj.inter_use_flag, $('inter_use_flag',data).text());
			   
			   //#3376 [JTC] Japan Trust 용 Profit Report 개발
			   setFieldValue( formObj.lane_cd, $('lane_cd',data).text());
			   setFieldValue( formObj.svc_lane_nm, $('svc_lane_nm',data).text());
			   
			   doBtnAuthority(attr_extension);
			   tab1click='';
			   tab2click='';
			   tab3click='';
			   tab4click='';
			   tab5click='';
			   setupPage();
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

function cmdtRowAdd(){
	gridAdd(9);
}
function cmdtLoadPO(){
	rtnary=new Array(8);
	rtnary[0]=frm1.cnee_trdp_cd.value;
	rtnary[1]=frm1.cnee_trdp_nm.value;
	rtnary[2]=frm1.shpr_trdp_cd.value;
	rtnary[3]=frm1.shpr_trdp_nm.value;
	//rtnary[4]=frm1.pol_cd.value;
	//rtnary[5]=frm1.pol_nm.value;
	//rtnary[6]=frm1.pod_cd.value;
	//rtnary[7]=frm1.pod_nm.value;
	callBackFunc = "PO_POPLIST";
	modal_center_open('./CMM_POP_0400.clt', rtnary, 1300,500,"yes");
}

function PO_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("^^");
		fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
		var idx=docObjects[9].LastRow() + 1;
		
		for (var i=0; i < rtnValAry.length; i++) {
			if(rtnValAry[i] == ""){
				break;
			}
			gridAdd(9);
			
			var Seq = docObjects[9].GetCellValue(idx-1, "Seq");
			
			var itemArr=rtnValAry[i].split("@@");
			docObjects[9].SetCellValue(idx, "Seq",Number(idx == 2 ? "0" : docObjects[9].GetCellValue(idx-1, "Seq")) + 1,0);
			docObjects[9].SetCellValue(idx, "item_cust_po_no",itemArr[0],0);
			docObjects[9].SetCellValue(idx, "item_cmdt_cd",itemArr[1],0);
			docObjects[9].SetCellValue(idx, "item_cmdt_nm",itemArr[2],0);
			docObjects[9].SetCellValue(idx, "item_pck_qty",itemArr[3],0);
			docObjects[9].SetCellValue(idx, "item_pck_ut_cd",itemArr[4],0);
			docObjects[9].SetCellValue(idx, "item_pck_inr_qty",itemArr[5],0);
			docObjects[9].SetCellValue(idx, "item_ea_cnt",itemArr[6],0);
			docObjects[9].SetCellValue(idx, "item_ttl_qty",itemArr[7],0);
			docObjects[9].SetCellValue(idx, "item_wgt",itemArr[8],0);
			docObjects[9].SetCellValue(idx, "item_lbs_wgt",itemArr[9],0);
			docObjects[9].SetCellValue(idx, "item_meas",itemArr[10],0);
			docObjects[9].SetCellValue(idx, "item_cft_meas",itemArr[11],0);
			docObjects[9].SetCellValue(idx, "item_hs_grp_cd",itemArr[12],0);
			docObjects[9].SetCellValue(idx, "item_shp_cmdt_cd",itemArr[13],0);
			docObjects[9].SetCellValue(idx, "item_shp_cmdt_nm",itemArr[14],0);
			docObjects[9].SetCellValue(idx, "item_po_cmdt_seq",itemArr[15],0);
			docObjects[9].SetCellValue(idx, "item_po_sys_no",itemArr[16],0);
			docObjects[9].SetCellValue(idx, "item_sys_no",itemArr[17],0);
			idx++;
		}
	}
}

function sheet8_OnSearchEnd(sheetObj) {
	//setItemCntrList();
}
function sheet8_OnPopupClick(sheetObj, row, col) {
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
function sheet8_OnKeyUp(sheetObj, row, col, keyCode) {
	//doAutoComplete(sheetObj, row, col, keyCode);
}
function sheet8_OnChange(sheetObj, row, col, value){
	switch (sheetObj.ColSaveName(col)) {
		case "item_shp_cmdt_cd" :
			doItemSearch(sheetObj, row, "commodity", value);
		break;
		
		case "item_cmdt_cd" :
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
		case "item_shp_cmdt_cd" :
			if(value < 0){
				sheetObj.SetCellValue(row, "item_shp_cmdt_nm",'');				
			}
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
	if(colStr=="item_wgt"){
		sheetObj.SetCellValue(row, "item_lbs_wgt",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, 2),0);
		if (sheetObj.GetCellValue(row, "item_lbs_wgt") >99999999.99) {
			alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));				
			sheetObj.SetCellValue(row, "item_wgt","",0);
			sheetObj.SelectCell(row, "item_wgt");
		}
	}else if(colStr=="item_lbs_wgt"){
		sheetObj.SetCellValue(row, "item_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, 2),0);
			
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

function sheet8_OnClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="item_cmdt_cd" || colStr=="item_shp_cmdt_cd"){
		if (sheetObj.GetCellValue(row, "item_po_cmdt_seq") == "") {
			sheetObj.SetCellEditable(row, colStr, 1);
		} else {
			sheetObj.SetCellEditable(row, colStr, 0);
		}
	}
}

function sheet8_OnKeyDown(sheetObj, row, col, keyCode) {
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="item_rmk"){		
		cmdtRowAdd();
		//doWork('ROWADD');
		sheetObj.SelectCell(row+1, 2); 
	}
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="item_rmk"){		
		cmdtRowAdd();
		//doWork('ROWADD');
		sheetObj.SelectCell(row+1, 2); 
	}	
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
}

//BL_COPY
function selectCopyBLFrt(){
	 openBlCopyPopUp("COPY_CONFIRM_POPUP_3",this,this); //#1741 [PATENT]HBL Copy 옵션에 Filing No 복사여부 추가
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
			
			var shpmt_itm_copy_chk=rtnValAry[5];
			var mrk_des_copy_chk=rtnValAry[6];
			var rmk_copy_chk=rtnValAry[7];//#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
			var ref_no_copy_chk=rtnValAry[8]; //#1741 [PATENT]HBL Copy 옵션에 Filing No 복사여부 추가
			
			
			if (orgBlSeq != "") {
			
				//#2348 [IMPEX] Pop up error message not closing after click OK
				cntrTpSzFlag = true;
				
				var orgBlSeq = frm1.copy_bl_seq.value;
				var tmpIntgBlSeq = frm1.intg_bl_seq.value;; 
				frm1.intg_bl_seq.value = frm1.copy_bl_seq.value;
							
				if (arFrt_copy_chk == "Y") {
					//Selling/Debit Freight 조회
					frm1.f_cmd.value=SEARCHLIST06;
					fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
					docObjects[1].DoSearch("./AII_BMD_0024GS.clt", FormQueryString(frm1) );
				}
				
				if (apFrt_copy_chk == "Y") {					
					//Buying/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST07;
					fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
					docObjects[2].DoSearch("./AII_BMD_0024_1GS.clt", FormQueryString(frm1) );					
				}
				
				if (dcFrt_copy_chk == "Y") {					
					//Selling/Debit Freight 조회
					frm1.f_cmd.value=SEARCHLIST12;
					fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
					docObjects[6].DoSearch("./AII_BMD_0024_2GS.clt", FormQueryString(frm1) );
				}
				//#1741 [PATENT]HBL Copy 옵션에 Filing No 복사여부 추가
				if (ref_no_copy_chk =="Y") {
					formObj.ref_no.value = formObj.copy_ref_no.value;
					ajaxSendPost(getRefNoInfo, 'reqVal', '&goWhere=aj&bcKey=getRefNoInfo&air_sea_clss_cd=A&bnd_clss_cd=I&ref_no='+formObj.ref_no.value, './GateServlet.gsl');
				}
				//#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				if (shpmt_itm_copy_chk == "Y" || mrk_des_copy_chk == "Y" || rmk_copy_chk == "Y") {
					frm1.f_cmd.value=COMMAND12;					
					var xml = sheet1.GetSearchData("./AII_BMD_0020_1GS.clt",FormQueryString(frm1));					
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
							
							formObj.rep_cmdt_cd.value = $xml.find("rep_cmdt_cd").text();
							formObj.rep_cmdt_nm.value = $xml.find("rep_cmdt_nm").text();
							formObj.cnt_cd.value = $xml.find("cnt_cd").text();
							formObj.cnt_nm.value = $xml.find("cnt_nm").text();
							formObj.goods_value.value = $xml.find("goods_value").text();
													
							frm1.f_cmd.value=SEARCHLIST04;
							fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
							docObjects[7].DoSearch("./AIE_BMD_0022_1GS.clt", FormQueryString(frm1) );
				 			
						}
						
						if(mrk_des_copy_chk == "Y"){
							formObj.mk_txt.value = $xml.find("mk_txt").text();
							formObj.desc_txt.value = $xml.find("desc_txt").text();		

						}
						if(rmk_copy_chk == "Y"){
							formObj.desc_txt1.value = $xml.find("desc_txt1").text();
							formObj.rmk.value = $xml.find("rmk").text();
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

//화면의 checkbox를 database 값으로 셋팅한다.
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

function setCtrbDeptCd(){
	var formObj = document.frm1;
	formObj.ctrb_dept_cd.value = "AI";
}

//#48588 [Webtrans][게시판#9] AE PACKAGE TYPE INPUT
function setPckUtCd(){
	// Notice를 Email보낼 그룹메일정보를 취득한다. 
	var opt_key = "PCK_VAL_AIH";
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

function getPdfFileNm(){
	var formObj=document.frm1;
	var pdfFileNm = "";
	var bl_no = formObj.bl_no.value;
	
	if (bl_no == "" || bl_no == "undefined" || bl_no == undefined) {
		return "";
	}
	pdfFileNm = "AUTH_HBL_"+bl_no;	
	return pdfFileNm;
}







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
		//frm1.ntfy_trdp_addr.focus();
	}
	if(getStringLength(frm1.bl_no.value) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_HANO'));
		moveTab('01');
		isOk=false;
		frm1.bl_no.focus();
		return isOk;
	}
	else if(frm1.lnr_trdp_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - Carrier");
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	//else if(checkInputVal(frm1.eta_dt_tm.value, 10, 10, "DD", 'Arrival Date')!='O'){ //S.Y BAIK (2013.01.23)
	else if(!checkInType(frm1.eta_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ARRV') + getLabel('FMS_COD_DATE'));
		isOk=false;
		moveTab('01');
		frm1.eta_dt_tm.focus();
		return isOk;
	}
	else if(!checkInType(frm1.f_eta_dt_tm.value, "DD") && trim(frm1.f_eta_tm.value) != ""  ){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + 'Final ETA');
		isOk=false;
		moveTab('01');
		frm1.f_eta_tm.focus();
		return isOk;
	}
	if (trim(frm1.etd_dt_tm.value) != "" && trim(frm1.eta_dt_tm.value) != "") {
		var daysTerms=getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy");
		if (daysTerms < -1) {	//미국에서 수입일 경우 하루 차이가 발생가능 
			// Arrival Date time must be greater than Flight Date time
			alert(getLabel("AIR_MSG_091"));
			frm1.eta_dt_tm.focus();
			isOk=false;
			return isOk; 
		} /*else if (daysTerms == 0) {
			if (getDaysBetweenFormat(frm1.etd_tm, frm1.eta_tm, "hh:mm") < 0) {
				// Arrival Date time must be greater than Flight Date time
				alert(getLabel("AIR_MSG_091"));
				moveTab('01');
				frm1.eta_tm.focus();
				isOk=false;
				return isOk; 
			}
		}*/
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
		isOk=false;
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
	//var tmpEtdDate=frm1.etd_dt_tm.value.replaceAll("-", "");
	var tmpEtaDate=frm1.eta_dt_tm.value.replaceAll("-", "");
	//var etdDate=new Date(tmpEtdDate.substring(4,8), tmpEtdDate.substring(0,2)-1, tmpEtdDate.substring(2,4));
	var etaDate=new Date(tmpEtaDate.substring(4,8), tmpEtaDate.substring(0,2)-1, tmpEtaDate.substring(2,4));
	var tmpDate=new Date();
	var today=new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()); 
	/*
	if((today-etdDate)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	}else if((etdDate-today)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	}else{
		etdRangeOk=true;
	}
	*/
	if((today-etaDate)/(60*60*24*1000) > 180){
		etaRangeOk=false;
	}else if((etaDate-today)/(60*60*24*1000) > 180){
		etaRangeOk=false;
	}else{
		etaRangeOk=true;
	}
	/*==================================================================================================*/
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용						    */
	/* Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류 발생을 차단. */
	var sheetObjArr=new Array(3);
		fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
		sheetObjArr[0]=docObjects[1];		//AR LOCAL  'fr_'
		sheetObjArr[1]=docObjects[6];		//DC 		'dc_fr_'
		sheetObjArr[2]=docObjects[2];		//AP 		'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){	//Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/*=================================================================================================*/
	
	//Item List validation
	fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선).
	var cmdtListParam=docObjects[9].GetSaveString(false);
	if(docObjects[9].IsDataModified() && cmdtListParam == "") { isOk=false; };
	if(cmdtListParam!=''){
		if(itemCheckInpuVals(docObjects[9])){
			isOk=false;
		}
	}
	
//	#1351 [CLT] B/L, AWB 등 Freight 탭에 대한 Mandatory Validation 메시지 기능 보완
	var frtSdListParam=docObjects[1].GetSaveString(false);
    if(docObjects[1].IsDataModified() && frtSdListParam == "") { isOk=false; moveTab('03'); };

    var frtBcListParam=docObjects[2].GetSaveString(false);
    if(docObjects[2].IsDataModified() && frtBcListParam == "") { isOk=false; moveTab('03'); };

    var frtDcListParam=docObjects[6].GetSaveString(false);
    if(docObjects[6].IsDataModified() && frtDcListParam == "") { isOk=false; moveTab('03'); };
	
	//alert(isOk);
	// 24620 CCN NO 중복 체크
	checkDuplCcn();
	if (ccn_dupl){
		//[warning] Duplicated CCN number found.
	 	alert(getLabel('FMS_COM_ALT063'));
	 	moveTab('02');
	 	frm1.ccn_no.value="";
	 	frm1.ccn_no.focus();
	 	isOk=false;
	}
	return isOk;
}

/** #52165 [Globe Runner] HBL > MBL Create **/
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
 *  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
 **/
function setPost_date(save_flag){
 	var formObj=document.frm1;
 	//var ofc_post_tp=frm1.h_post_dt_imp.value;
 	var ofc_post_tp=ofc_post_dt;
 	
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
 			if(formObj.post_dt.value == ""){
 				frm1.post_dt.value=frm1.eta_dt_tm.value;
 		 	}
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
 	
	//2016.04.18 C.W.Park Modified
	//#52109 office별 block_date 확인
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	
	var param = ""; //flag는 'I' 만 들어옴. 따라서 로그인 ofc_cd의 max_blck_dt를 가져옴
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt&searchOfcCd=' + param, './GateServlet.gsl');
	
 	if(formObj.post_dt.value == ""){
 		formObj.post_dt.value=NEXT_BLOCK_DT;
 	}
 	if(formObj.post_dt.value == ""){
 		alert(getLabel("AIR_MSG_097"));
 		return;
 	}
 	if(NEXT_BLOCK_DT != "") {
 		//post_dt 와 block_dt 비교
// 		fromDate > toDate true
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
		for(var i=2; i<=docObjects[1].LastRow(); i++){
			docObjects[1].SetCellImage(i, "fr_att_file_1", 0);
		}
	}else if(type == "DC"){
		for(var i=2; i<=docObjects[6].LastRow(); i++){
			docObjects[6].SetCellImage(i, "dc_fr_att_file_1", 0);
		}
	}else{
		for(var i=2; i<=docObjects[2].LastRow(); i++){
			docObjects[2].SetCellImage(i, "b_fr_att_file_1", 0);
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

function fnSetIBsheetInit(sheetNo){
	//if(docObjects[sheetNo].HeaderRows() < 1){
	//console.log(sheetNo  +' / fnSetIBsheetInit  = ' + docObjects[sheetNo].id + '  /  ' + docObjects[sheetNo].ColSaveName(1));
	if(docObjects[sheetNo].ColSaveName(1) == -1){
		comConfigSheet(docObjects[sheetNo], SYSTEM_FIS);
		initSheet(docObjects[sheetNo], (sheetNo+1) );
		comEndConfigSheet(docObjects[sheetNo]);
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
		chk_partner_yn = "Y";
	}else{
		chk_trdp_cd = formObj.act_shpr_trdp_cd.value;
		chk_partner_yn = "N";
	}

	setSalesMan(chk_trdp_cd,chk_partner_yn,chk_cur_bizTp);
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
		cmb_inv_no    : frm1.mk_bl_no.value 
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

//#3376 [JTC] Japan Trust 용 Profit Report 개발
function laneCdChange(){
	var formObj=document.frm1;
	formObj.svc_lane_nm.value = formObj.lane_cd.options[formObj.lane_cd.selectedIndex].text;
}

function debit_Note_AP_POPUP(rtnVal){
	
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

//OFVFOUR-7899: [Matrix] Set mandatory field in OIH, AEH, AIH B/L entry
var IncotermsCode;
function getIncotermsCode(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == "OK" && doc[1] != "" && doc[1] != undefined) {
		var rtnArr=doc[1].split('@@;');
		var masterVals=rtnArr[0].split('@@^');
		IncotermsCode = masterVals[4];
	}
	else {
		IncotermsCode = "N";
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