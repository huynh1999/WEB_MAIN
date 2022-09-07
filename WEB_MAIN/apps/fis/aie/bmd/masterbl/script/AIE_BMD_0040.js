/*=========================================================
+*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0040.js
*@FileTitle  : MAWB등록 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/08/14
=========================================================*/
var loadDataProcess ="";//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
var tab1click="";
var tab2click="";
var tab3click="";
var tab4click="";
var tab5click="";
/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
var tab6click="";
//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
var tab7click="";
var hblListSheet=false;
var docListSheet=false;
var dimListSheet=false;
var airFrtListSheet=false;
var airOthListSheet=false;
var frtSdSheet=false;
var frtBcSheet=false;
var frtDcSheet=false;
var isInvStsOk=false;
var blDupl=false;
var copyBlRate1 = false;
var copyBlRate2 = false;
var linerBkgNoDup = false;
var isPdOrdStsOk = false;

//#45955 - [IMPEX] 독일 지점 요구사항 3가지, (AEM Entry 화면 디멘젼 길이 디폴트 옵션, Document Package Weight Option, AEM Entry에서 "SUM" 버튼 로직)
//var getSumHblYn = "N";

var rtnary=new Array(1);
var callBackFunc = "";
var vIntgBlModiTms;

var delete_show_complete = "N";
var wgtCeilYn = "";
//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	/* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리(flag) */
	isError=false;	
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	var hblListParam=docObjects[1].GetSaveString(false);
	var docListParam=docObjects[4].GetSaveString(false);
	var dimListParam=docObjects[5].GetSaveString(false);
	/*
	 * 2011.11.21 Kim,Jin-Hyuk
	 * Air Freight, Other Charge 추가 
	 */
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	var airFrtListParam=docObjects[2].GetSaveString(false);
	var airOthListParam=docObjects[3].GetSaveString(false);
	var sheetParam='';
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
	//dim
	if(dimListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= dimListParam;
        dimListSheet=true;
    }
	if(airFrtListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= airFrtListParam;
        airFrtListSheet=true;
    }
	if(airOthListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= airOthListParam;
        airOthListSheet=true;
    }
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	var frtSdListParam=docObjects[6].GetSaveString(false);
    if(frtSdListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[6], '');
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtSdListParam=docObjects[6].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtSdListParam;
    	frtSdSheet=true;
	}
    fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
    var frtBcListParam=docObjects[7].GetSaveString(false);
    if(frtBcListParam!=''){
    	var rtnFlg=frCheckInpuVals(docObjects[7], 'b_')
    	if(rtnFlg=='IV'){
    		isError=true;
    	}
    	frtBcListParam=docObjects[7].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtBcListParam;
    	frtBcSheet=true;
	}
    fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
    var frtDcListParam=docObjects[8].GetSaveString(false);
	if(frtDcListParam!=''){
		var rtnFlg=frCheckInpuVals(docObjects[8], 'dc_')
		if(rtnFlg=='IV'){
    		isError=true;
    	}
		frtDcListParam=docObjects[8].GetSaveString(false);
		sheetParam+= '&';
		sheetParam+= frtDcListParam;
		frtDcSheet=true;
	}
	
	
	//hsk
	fnSetIBsheetInit(11); 
    var itemListParam=docObjects[11].GetSaveString(false);
	if(itemListParam!=''){
		sheetParam+= '&';
		sheetParam+= itemListParam;
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
					//parent.parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
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
	        				ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=A&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+frm1.ref_no.value, './GateServlet.gsl');
	        			}
	        		}
	        		// #52880 - [ZEN] DUPLICATE CARRIER BOOKING NO. AND NOT SAVING
        	   		checkDuplicateLinerBkgNo();
        	   
        	   		if(linerBkgNoDup){
        		   		return;
        	   		}
	        		if(refCheck){
	        			ajaxSendPost(getMblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=A&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');        		   
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
        	   if(frm1.ref_no.value=='' && frm1.bl_no.value==""){
//        		   alert("Please retrieve data.");
        		   alert(getLabel('AIR_MSG_030'));
        		   return;
        	   }
        	   var param='title=Air Consolidated Cargo Manifest';
        	   param += '&cmd_type=48';
        	   param += '&bl_no=' + frm1.bl_no.value;
        	   popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
        	   break;
           case "PRINT":
        	   if(frm1.bl_no.value==""){
	   			   //Please Search...
	   			   /* jsjang 2013i.8.26 #19334 AIR MAWB Entry 화면 Print 버튼 클릭 시 MAWB No 확인 메시지 조정 */
	   			   //alert(getLabel('FMS_COM_ALT001') + "\n\n: AIE_BMD_0020.430");
	   			   alert(getLabel('FMS_COM_ALT047')); // Please, Enter MAWB No!
	   			   frm1.bl_no.focus();
	   			   return;
	   		   }
	   		   var param='intg_bl_seq=' + frm1.intg_bl_seq.value;
	   		   param += '&house_bl_no=' + frm1.bl_no.value; 
	   		   param += '&biz_clss=Master';
	   		   
	   		   // #4681 Air Waybill Routing 표기 관련 개선 (v470, v5반영 필요)
	   		   //param += '&by_carr=' + frm1.flt_no.value + " " + frm1.lnr_trdp_nm.value;
	   		   param += '&by_carr=' + frm1.lnr_trdp_nm.value;
	   		   
	   		   param += '&sign_ship=';
	   		   //param += ref_ofc_eng_nm;
	   		   param += frm1.iss_trdp_nm.value;
   			   /*	   		   
	   		   if(frm1.hbl_tp_cd.value=="TP"){
	   			   param += frm1.third_trdp_nm.value;
	   		   }else{
	   			   param += "CyberLogitec";
                    if(user_ofc_cnt_cd=="US"){
	   					param += 'Allstate Int’l Freight USA, Inc. (' + frm1.ref_ofc_cd.value + ')';
	   				}else if(user_ofc_cnt_cd=="DE"){
	   					param += 'Atlantic Integrated Freight GmbH';
	   				}else if(user_ofc_cnt_cd=="IT"){
	   					param += 'Atlantic Integrated Freight S.R.L.';
	   				}else if(user_ofc_cnt_cd=="FR"){
	   					param += 'Atlantic Integrated Freight SARL';
	   				}else if(user_ofc_cnt_cd=="JP"){
	   					//param += '';
	   				}else{
	   				}
	   		   }*/
	   		   param += "&sign_ship1=" + "AS AGENT OF " + frm1.shpr_trdp_nm.value;
	   		   param += "&sign_carr=";
	   		   //param += ref_ofc_eng_nm;
	   		   param += frm1.iss_trdp_nm.value;
   			   /*	   		   
	   		   if(frm1.hbl_tp_cd.value=="TP"){
	   			   param += frm1.third_trdp_nm.value;
	   		   }else{
	   			   param += "CyberLogitec";
					if(user_ofc_cnt_cd=="US"){
	   					param += 'Allstate Int’l Freight USA, Inc. (' + frm1.ref_ofc_cd.value + ')';
	   				}else if(user_ofc_cnt_cd=="DE"){
	   					param += 'Atlantic Integrated Freight GmbH';
	   				}else if(user_ofc_cnt_cd=="IT"){
	   					param += 'Atlantic Integrated Freight S.R.L.';
	   				}else if(user_ofc_cnt_cd=="FR"){
	   					param += 'Atlantic Integrated Freight SARL';
	   				}else if(user_ofc_cnt_cd=="JP"){
	   					//param += '';
	   				}else{
	   				}
	   		   } */
	   		   param += "&sign_carr1=" + "AS AGENT OF THE " + frm1.lnr_trdp_nm.value;
	   		param += '&mailTitle=' + 'Master Air Way [BL No : ' + frm1.bl_no.value + ']';
			var trdp_cd='';
     		trdp_cd += '(' + '\'' + frm1.cnee_trdp_cd.value + '\'' + ')';
			ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
			param += '&mailTo=' + mailTo;
			param += '&refOfcCd=' + frm1.h_ref_ofc_cd.value; 
	   		   popGET('RPT_PRN_0080.clt?'+param, '', 420, 675, "scroll:yes;status:no;help:no;");
           break;
           case "HBLADD":	//등록
        	   var keyYn='';
        	   if(frm1.bl_sts_cd.value!='NA'){
        		   keyYn='Y';
        	   }
               rtnary=new Array(1);
			   var curHblStr='';
			   var divStr='^';
			   var clsStr=';';
			   fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
			   //현재 BLSEQ가 등록되었는지를 확인함
			   for(var i=1; i< docObjects[1].LastRow() + 1; i++){
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_bkg_no');
				   curHblStr+= divStr; 
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_bl_no');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_shipper');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_obrd_dt_tm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_trnk_cd');
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
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_etd_tm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_ibflag');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].GetCellValue(i, 'hbl_shpr_trdp_nm');
				   curHblStr+= clsStr;
			   }
			   rtnary[0]=curHblStr;
			   
			   callBackFunc = "HBLADD";
		   	   modal_center_open('./AIE_BMD_0041.clt', rtnary, 756,670,"yes");
		   	   
		   	   
        	   
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
                			   frm1.post_dt.value=frm1.eta_dt_tm.value;
                		   }
                		   ***/
                	   //}
                	   ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=A&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+frm1.ref_no.value+'&mbl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
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
                		  ajaxSendPost(getMblCheckNoEmpBL, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=A&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');        		   
                	  } 
                	  if (blDupl){
                		  return;
                	  }
                	  // #52880 - [ZEN] DUPLICATE CARRIER BOOKING NO. AND NOT SAVING
                	  checkDuplicateLinerBkgNo();
                	  
	               	  if(linerBkgNoDup){
	               	      return;
	               	  }
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
                        		   doShowProcess();
                   				   //docObjects[0].DoAllSave("./AIE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
                        		   
                          		 //#4084 (JAPT) same currency invoice - exchange rate validation
                        		   exchangeRateVal();                        		   
                   				   docObjects[0].DoAllSave("./AIE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
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
					//docObjects[0].DoAllSave("./AIE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
					docObjects[0].DoAllSave("./AIE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
	        	}
		   break;
           case "REMOVE":	//삭제
	   	     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정 
	   	     	if(!chkIntgBlModiTms(srcName)){
	   	     	   return;
	   	     	}		        	   
        	   
        	   //BL중에 Confirm이 된 건이 있는지 확인함.
    		   ajaxSendPost(doRmvSrInfo, 'reqVal', '&goWhere=aj&bcKey=getHblClsChk&biz_clss_cd=M&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
    		   
           break;
           case "DOCFILE":	//첨부파일
       		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
       		
	       		/**  Document List ==> Common Memo 연동 파라미터 (S) */
	       		reqParam += '&palt_mnu_cd=AEM';
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
        	   /*
        	   if(frm1.f_bl_no.value==''){
        		   alert(CM_MSG5);
        		   return;
        	   }else{
        	   */
        	   if(frm1.f_ref_no.value=='' && frm1.f_bl_no.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_ref_no.focus();
        		   return;
        	   }else{
                   frm1.f_cmd.value=SEARCHLIST;
                   
                   //#5188 [BINEX] AFTER V470.06 RELEASE, FILING # RETRIEVE ON BL ENTRY
        		   frm1.f_intg_bl_seq.value='';
        		   
        		   //BL_COPY Form의 Copy_bl_seq를 초기화한다
        		   if (frm1.copy_bl_seq.value != ""){
        			   frm1.copy_bl_seq.value = "";
        		   }
        		   
            	   //doShowProcess();
            	  // frm1.submit();
            	   submitForm(document.frm1);
        	   }
               /*
        	   }
        	   */
       	   break;
           case "SEARCHLIST01":	//조회
        	   /*
        	   if(frm1.intg_bl_seq.value!=''){
	        	   if(frm1.f_bl_no.value==''){
	        		   alert(CM_MSG5);
	        		   return;
	        	   }else{
	           */
	                   frm1.f_cmd.value=SEARCHLIST01;
	                   fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	                   docObjects[1].DoSearch("AIE_BMD_0040_1GS.clt", FormQueryString(frm1) );
	                   // #30283 - [BINEX]AEM Weight 정보 동기화 (탭 클릭 전에는 Tariff가 조회전이라 B/L Rate가 동기화가 안됨. 탭 클릭했을 때가 아니라 B/L 조회할 때 Tariff도 조회되도록 수정)
	            	   doWork('SEARCH_TARIFF');
	           /*
	        	   }
        	   }
        	   */
           break;
           case "SEARCH_DOC":	//첨부문서 조회
        	   if(frm1.intg_bl_seq.value!=''){
	        	   //Doccument File List 조회
		   	       frm1.f_cmd.value=SEARCHLIST02;
		   	       fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
		   	       docObjects[4].DoSearch("./SEE_BMD_0021_1GS.clt", FormQueryString(frm1) );
        	   }	   	 	   
      	   break;
      	   //2010.12.22 김진혁 추가, MBL도 HBL과 같은 조건으로 Copy 버튼 추가
           case "COPY":	//조회
        	   
        	   //BL_COPY COPY시 컨펌메시지 없이 바로 Submit후 frt Check화면을 보여준다
        	   frm1.f_cmd.value=COMMAND02;
        	   doShowProcess();
        	   frm1.submit();        	   
        	   /*if(confirm(getLabel('FMS_COM_CFMCPY'))){
                   frm1.f_cmd.value=COMMAND02;
            	  // doShowProcess();
            	   //frm1.submit();
            	   submitForm(document.frm1);
        	   }*/        	   
       	   break;
           case "DIM":
        	   if(frm1.intg_bl_seq.value!=''){
        		   frm1.f_cmd.value=SEARCHLIST04;
        		   fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
        		   docObjects[5].DoSearch("./AIE_BMD_0040_2GS.clt", FormQueryString(frm1) );
        	   }
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
		   	 		param += '[AEM]'; 											// [2] MASTER/HOUSE/OTH 여부
		   	 		param += '[' + formObj.bl_no.value + ']';				// [3] MBL_NO/HBL_NO
		   	 		param += '[' + formObj.user_id.value + ']';				// [4]
		   	 		formObj.rd_param.value=param;
		   	 		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
	   	 		break;           
           case "SEARCH_TARIFF":
        	   if(frm1.intg_bl_seq.value!=''){
        		   frm1.f_cmd.value=SEARCHLIST05;
        		   fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
        		   docObjects[2].DoSearch("./AIE_BMD_0040_3GS.clt", FormQueryString(frm1) );
        		   frm1.f_cmd.value=SEARCHLIST06;
        		   fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
        		   docObjects[3].DoSearch("./AIE_BMD_0040_4GS.clt", FormQueryString(frm1) );
        	   }
//        	   else{
//        		   docObjects[2].DataInsert(-1);
//        		   //init. seeting
//        		   
//        		   var rowCnt = docObjects[2].rows - 1;
//        		   var sumPck = 0;
//        		   
//        		   for(var i=1 ; i<docObjects[1].rows ; i++){
//        			   sumPck = parseInt(sumPck) + parseInt(docObjects[1].CellValue(i, "hbl_pck_qty"));
//        		   }
//        		   
//        		   docObjects[2].CellValue(rowCnt, "air_pce_qty") = sumPck; //HB/L pck_qty
//        		   docObjects[2].CellValue(rowCnt, "air_grs_wgt") = frm1.bl_grs_wgt.value;
//        		   docObjects[2].CellValue(rowCnt, "air_r_class") = frm1.rt_clss_cd.value;
//        		   docObjects[2].CellValue(rowCnt, "air_chg_wgt") = frm1.bl_chg_wgt.value;
//        		   docObjects[2].CellValue(rowCnt, "air_frt_term_cd") = frm1.frt_term_cd.value;
//        		   docObjects[2].CellValue(rowCnt, "air_aply_ut_cd") = "ACW"; //Japan
//        		   
//        	   }
           break;
           case "AIR_FRT_ADD":
        	   fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
        	   var intRows=docObjects[2].LastRow() + 1;
        	   docObjects[2].DataInsert(intRows);
    		   docObjects[2].SetCellValue(intRows, "air_frt_term_cd",frm1.frt_term_cd.value);
    		   docObjects[2].SetCellValue(intRows, "air_aply_ut_cd","ACW");
    		   docObjects[2].SetCellValue(intRows, "air_chg_wgt",frm1.bl_chg_wgt.value);
           break;
           case "OTH_FRT_ADD":
        	   fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
    		   var intRows=docObjects[3].LastRow() + 1;
    		   docObjects[3].DataInsert(intRows);
    		   docObjects[3].SetCellValue(intRows, "oth_disp_ord",'0');
    		   docObjects[3].SetCellValue(intRows, "oth_frt_term_cd",frm1.otr_chg_term_cd.value);
    		   docObjects[3].SetCellValue(intRows, "oth_curr_cd",frm1.curr_cd[frm1.curr_cd.selectedIndex].value);
    		   docObjects[3].SetCellValue(intRows, "oth_aply_ut_cd","ACW");
    		   docObjects[3].SetCellValue(intRows, "oth_chg_wgt",frm1.bl_chg_wgt.value);
           break;
           case "AIR_AUTO":
        	   frm1.f_cmd.value=SEARCHLIST08;
        	   fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
        	   docObjects[2].DoSearch("./AIE_BMD_0040_3GS.clt", FormQueryString(frm1) );
           break;
           case "OTH_AUTO":
        	   frm1.f_cmd.value=SEARCHLIST09;
        	   fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
        	   docObjects[3].DoSearch("./AIE_BMD_0040_4GS.clt", FormQueryString(frm1) );
           break;
           case "STOCK_POP":	//통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
          		rtnary=new Array(2);
	   			rtnary[0]="M";
	   			rtnary[1]=frm1.ref_ofc_cd.value;
		   		//rtnary[1] = formObj.branch_in.value;
//		   		if(formObj.awbType_in[2].selected){
//		   			rtnary[2] = "EX";
//		   		}else{
//		   			rtnary[2] = "CL";
//		   		}
	   			callBackFunc = "STOCK_POP";
		   		modal_center_open('./AIE_STK_0010.clt', rtnary, 456,550,"yes");
		   		
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
        	   if(formObj.bl_no.value!='' || formObj.ref_no.value!=''){
        		   var paramStr="./ACC_INV_0040.clt?";
        		   /* #23987, s_mbl_no 링크제거 jsjang 2013.11.25 */
        		   //24842 oyh Mbl에서 AP를 눌렀을 경우 Vendor inv no에 MBLno가 세팅안됨 으로 기존 로직으로 재수정
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
					paramStr+= "&f_air_sea_clss_cd=A&f_bnd_clss_cd=O";
					
        		    parent.parent.mkNewFrame('Invoice List', paramStr);
        	   }
           break;
           case "HBL_ENTRY":
         		var formObj=document.frm1;
         		if(formObj.ref_no.value!=''){
         			var paramStr="./AIE_BMD_0020.clt?";
         			paramStr+= "f_mbl_ref_no=" + formObj.ref_no.value;
         			parent.parent.mkNewFrame('Booking & HBL', paramStr);
         		}
          break;
           case "PROFIT_REPORT":
        	   var formObj=document.frm1;
        	   var reqParam='?intg_bl_seq=' + formObj.intg_bl_seq.value;
					reqParam += '&mbl_no=' + formObj.bl_no.value;
					reqParam += '&ref_no=' + formObj.ref_no.value;
					reqParam += '&air_sea_clss_cd=' + "A";
					reqParam += '&bnd_clss_cd=' + "O";
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
 		   		   param += '&bnd_clss_cd=O';
 		   		   param += '&biz_clss_cd=M';
                var paramStr="./AIC_WOM_0014.clt?f_cmd="+SEARCH01+"&s_type=B&"+param;
                parent.parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
                */
               var paramStr="./AIC_WOM_0014.clt?air_sea_clss_cd=A&bnd_clss_cd=O&biz_clss_cd=M";
               var param = "&f_cmd=" + SEARCH01;
               param += "&s_type=B";
               param += "&f_intg_bl_seq=" + frm1.intg_bl_seq.value;
               parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
                break;
   			//HOSEOK KANG, 2016-03-14	
	   	 	case "CON_POUCH":
   	 			var formObj=document.frm1;
   	 			formObj.file_name.value='consolidation_pouch.mrd';
   	 			var reqParam='';
   	 			reqParam += '['+frm1.intg_bl_seq.value+']';
   	 			formObj.rd_param.value=reqParam;
   	 			popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
				break;                
           case "AIR_LABEL":
        	   var reqParam='';
        	   reqParam += '?intg_bl_seq=' + frm1.intg_bl_seq.value;
        	   reqParam += '&biz_clss_cd=' + "M";
        	   popGET('AIE_BMD_0061.clt'+reqParam, '', 600, 330, "scroll:yes;status:no;help:no;");
        	   //}
        	   break;	
           case "CargoManifest":
				var reqParam='?intg_bl_seq='  + frm1.intg_bl_seq.value;
				reqParam += '&bl_no=' + frm1.bl_no.value;
				
				popGET('RPT_PRN_0160.clt'+reqParam, '', 480, 550, "scroll:yes;status:no;help:no;");
          	break;
	   	 	case 'TSA':
	   	 		var reqParam = '';
	   	 		reqParam += '?intg_bl_seq=' + frm1.intg_bl_seq.value;
	   	 		reqParam += '&bl_no=' + frm1.bl_no.value;
	   	 		reqParam += '&issued_by=' + frm1.opr_usrnm.value;
	   	 		reqParam += '&biz_clss_cd=' + "M";
	   	 		
	   	 		popGET('AIE_BMD_0200.clt'+reqParam, '', 600, 250, "scroll:yes;status:no;help:no;");
	   	 	break;	
                
        }
        
		//Log Monitor Start:Btn
		if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
		//Log Monitor End:Btn        
        
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        	doHideProcess();
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        	doHideProcess();
        }
    }
}
function entSearch(){
	if(event.keyCode == 13){
	//	document.frm1.f_CurPage.value = 1;
		doWork('SEARCHLIST');
	}
}
function getMblCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=''){
				//alert('Please check B/L no.!');
								// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다. 
	            setPost_date("I");
	            
	            //#4940 ** [BEST OCEAN] WRONG MAWB VALIDATION & NO DUPLICATE ALLOWED
	            //2.MAWB DUPLICATE CHECK
	            if(mawb_verify_yn =='Y'){//Cannot bypass
					alert(getLabel('FMS_COM_ALT090'));//MAWB No. is duplicated! 
					return;					
				}
				
				//B/L No. is duplicated. \nDo you want to create MBL?
				if(confirm(getLabel('FMS_COM_ALT090') + getLabel('FMS_COM_CFMCON'))){
	            	   gridAdd(0);
	            	   docObjects[0].SetCellValue(1, 1,1);
	            	   //if(user_role_cd!="ADM"){
	            		   //save post date, office info
			            	// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다. 
		           	   		//confirm 전에 check;
		           	       /***
	            		   if(ofc_post_dt=="ETD"){
	            			   frm1.post_dt.value=frm1.etd_dt_tm.value;
	            		   }else if(ofc_post_dt=="ETA"){
	            			   frm1.post_dt.value=frm1.eta_dt_tm.value;
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
	            	   //docObjects[0].DoAllSave("./AIE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
	            	   docObjects[0].DoAllSave("./AIE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
	        	   }
			}else if(doc[1]=='RV'){
//				alert('Please check B/L no.!!');
				alert(getLabel('AIR_MSG_031')+" [RV]");//확인 필요 RV 사용안함
			}else{
				// /*** ***/ 아래 로직 공통 함수에서 처리하도록 하고 주석 처리함, LHK 20131025 , 저장 전 post_dt 를 Set 한다. 
	            setPost_date("I");
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
            		   }else if(ofc_post_dt=="ETA"){
            			   frm1.post_dt.value=frm1.eta_dt_tm.value;
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
            	   //docObjects[0].DoAllSave("./AIE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), true);
            	   docObjects[0].DoAllSave("./AIE_BMD_0040GS.clt", FormQueryString(frm1)+sndParam, true);
        	   }			
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
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
				
				if(confirm(getLabel('FMS_COM_ALT090') + getLabel('FMS_COM_CFMCON'))){
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
	            	   //doShowProcess();
	            	  // frm1.submit();
	            	   submitForm(document.frm1);
	        	   }
    		   }else{
    			   //You Cannot delete B/L. Because Invoice was already Issued.
    			   alert(getLabel('FMS_COM_ALT022'));
    			   return;
    		   }
    		   /*
	     	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
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
/**
 * S/R된 HBL을 선택적으로 삭제하는 경우
 */
function doRmvHblInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		   if(doc[1]!='HO'&&doc[1]!='HC'){
			   if(confirm(getLabel('FMS_COM_CFMDEL'))){
	     		  ajaxSendPost(retriveHblList, 'reqVal', '&goWhere=aj&bcKey=getRmSrHbl&mbl_seq='+frm1.intg_bl_seq.value+'&intg_bl_seq='+curIntgSeq, './GateServlet.gsl');
	    	   }				
		   }else{
			   if(doc[1]=='HO'){
				   //HAWB aleady confirmed, so can not delete data!
				   alert(getLabel('AIR_MSG_034'));
			   }else{
				   //HBL aleardy closing, so can not delete data!
				   alert(getLabel('AIR_MSG_035'));
			   }
		   }
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

/**
 * HBL삭제후 조회
 */
function retriveHblList(reqVal){
	doWork('SEARCHLIST01');
}
//코드표시 Ajax
function autoMrkDesc(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var rmkDescVal=rtnArr[0].split('@@^');
			frm1.mk_txt.value=rmkDescVal[0];	//Mark
			//frm1.rmk.value = rmkDescVal[1];	//Mark2
			frm1.desc_txt.value=rmkDescVal[2];	//Descritpion
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
    //submitForm(document.frm1);
}
/**
 * MBL Input시
 */
function doKeyInCheck(obj){
	if(obj.checked){
//		alert('[MBL Crate]시 저장됩니다!');
		alert(getLabel('AIR_MSG_036'));
        frm1.bl_no.className='search_form';
        frm1.bl_no.readOnly=false;
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
		frm1.sr_no.value=docObjects[0].GetCellValue(1, "sv_sr_no");
		//frm1.f_bl_no.value     = docObjects[0].CellValue(1, "sv_bl_no");
		//frm1.mbl_chk.value     = docObjects[0].CellValue(1, "sv_bl_no");
		frm1.ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
		frm1.f_ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
//		frm1.sel_ref_no.value     = docObjects[0].CellValue(1, "sv_ref_no");
//		frm1.ref_no.className = 'search_form-disable';
//		frm1.ref_no.readOnly  = true;
	}else{
		// #50048 - [IMPEX] B/L PRINT HISTORY 저장관련 ENTRY 화면에서 CODE FIELDS 저장시 업데이트
		if(AE_BL_HIS_UPDATE == "Y"){
			
			var v_param = "";
			var v_hbl_sync_yn = "N";
			
			if( frm1.pre_lnr_trdp_nm.value != frm1.lnr_trdp_nm.value ){
				// #4681 Air Waybill Routing 표기 관련 개선 (v470, v5반영 필요)
				//v_param += "&by_carr=" + frm1.flt_no.value + " " + escape(frm1.lnr_trdp_nm.value);
				v_param += "&by_carr=" + escape(frm1.lnr_trdp_nm.value);
				
				v_hbl_sync_yn = "Y";
			}
			if((frm1.pre_iss_trdp_nm.value != frm1.iss_trdp_nm.value) || (frm1.pre_lnr_trdp_nm.value != frm1.lnr_trdp_nm.value)){
				v_param += "&sign_carr=" + escape(frm1.iss_trdp_nm.value) + "\r\n" + "AS AGENT OF THE CARRIER " + escape(frm1.lnr_trdp_nm.value);
			}
			if((frm1.pre_iss_trdp_nm.value != frm1.iss_trdp_nm.value) || (frm1.pre_shpr_trdp_nm.value != frm1.shpr_trdp_nm.value)){
				v_param += "&sign_ship=" + escape(frm1.iss_trdp_nm.value) + "\r\n" + "AS AGENT OF " + escape(frm1.shpr_trdp_nm.value);
			}
			ajaxSendPost(funcTemp, "reqVal", "&goWhere=aj&bcKey=modifyBLPrintOptInfo&intg_bl_seq="+frm1.intg_bl_seq.value+"&prn_type=OEM"+v_param, "./GateServlet.gsl");
			
			if(v_hbl_sync_yn == "Y"){
				ajaxSendPost(getHAWBList, 'reqVal', '&goWhere=aj&bcKey=getHAWBList&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
			}
		}
	}
	
	if(frm1.f_bl_no.value==''){
		frm1.f_bl_no.value=docObjects[0].GetCellValue(1, "sv_bl_no");
		//frm1.mbl_chk.value     = docObjects[0].CellValue(1, "sv_bl_no");
	}
	
	frm1.bl_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
	
	// 처리후에 org_etd_dt_tm/org_eta_dt_tm 을  설정해준다. 
	frm1.org_etd_dt_tm.value=frm1.etd_dt_tm.value;
	frm1.org_eta_dt_tm.value=frm1.eta_dt_tm.value;
	
	//25595 중복 체크 
	frm1.h_bl_no.value=frm1.bl_no.value;
	frm1.ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
	frm1.f_ref_no.value=docObjects[0].GetCellValue(1, "sv_ref_no");
	//LHK, 20131028 setPost_date(save_flag) 추가 비교 로직으로 인해 저장 후 org_post_dt reset
	frm1.org_post_dt.value=frm1.post_dt.value;
	
	frm1.pre_flt_no.value = frm1.flt_no.value;
	frm1.pre_lnr_trdp_nm.value = frm1.lnr_trdp_nm.value;
	frm1.pre_shpr_trdp_nm.value = frm1.shpr_trdp_nm.value;
	frm1.pre_iss_trdp_nm.value = frm1.iss_trdp_nm.value;
	
	frm1.org_lnr_bkg_no.value = frm1.lnr_bkg_no.value;
	
	//#2068 - Document 번호 Title 에 반영
	setTabTitle(frm1.ref_no.value);
		
	if(hblListSheet){
		doWork('SEARCHLIST01');		
	}
	if(docListSheet){
		doWork('SEARCH_DOC');
	}
	if(airFrtListSheet || airOthListSheet){
		doWork('SEARCH_TARIFF');
	}
	if(dimListSheet){
		doWork('DIM');
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

function getHAWBList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@@@');
			for(var i=0; i<rtnArr.length-1; i++){
				var result=rtnArr[i].split("^^^");
				
				// #4681 Air Waybill Routing 표기 관련 개선 (v470, v5반영 필요)
				//var v_param = "&by_carr=" + frm1.flt_no.value + " " + escape(frm1.lnr_trdp_nm.value);
				var v_param = "&by_carr=" + escape(frm1.lnr_trdp_nm.value);
				
				if(frm1.pre_lnr_trdp_nm.value != frm1.lnr_trdp_nm.value){
					v_param += "&sign_carr=" + escape(result[8]) + "\r\n" + "AS AGENT OF THE CARRIER " + escape(frm1.lnr_trdp_nm.value);
				}

				ajaxSendPost(funcTemp, "reqVal", "&goWhere=aj&bcKey=modifyBLPrintOptInfo&intg_bl_seq="+result[0]+"&prn_type=OEH"+v_param, "./GateServlet.gsl");
			}
		}else{
//			alert("There is no HAWB.");
			alert(getLabel('AIR_MSG_045'));
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function funcTemp(){
	
}

/**
 * 화면에 기본값 Display
 */
function setDfltVal(hblArr){
	if(frm1.intg_bl_seq.value==""){
		frm1.etd_dt_tm.value=modiStrDateType(hblArr[3], 1);
		frm1.etd_tm.value=mkStrToTime(hblArr[28]);
		frm1.lnr_trdp_cd.value=hblArr[4];
		frm1.lnr_trdp_nm.value=hblArr[5];
		frm1.flt_no.value=hblArr[6];     
		frm1.pol_cd.value=hblArr[7];       
		frm1.pol_nod_cd.value=hblArr[8];   
		frm1.pol_nm.value=hblArr[9];       
		frm1.pod_cd.value=hblArr[10];       
		frm1.pod_nod_cd.value=hblArr[11];   
		frm1.pod_nm.value=hblArr[12];   
		frm1.grs_wgt.value=hblArr[18];      
		frm1.grs_wgt_ut_cd.value=hblArr[19];
		frm1.chg_wgt.value=hblArr[20];      
		frm1.chg_wgt_ut_cd.value=hblArr[21];
		//frm1.meas.value       = hblArr[22];         
		//frm1.meas_ut_cd.value = hblArr[23];   
		frm1.pck_qty.value=hblArr[24];      
		frm1.pck_ut_cd.value=hblArr[25];    
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
	        cal.select(obj,'MM-dd-yyyy');
	    break;
    }
}
function getSelectedFiles(){
	fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[4];
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
        
        //comSheetObject('sheet4');comSheetObject('sheet2');
        fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
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
        tabObjs[6].style.display='none';
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        fnSetIBsheetInit(11);
        searchGrid(12);
	//Shipping Document 탭
    } else if( isNumSep == "03" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="none";
        tabObjs[2].style.display='inline';
        tabObjs[3].style.display='none';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
        tabObjs[6].style.display='none';
        
        //comSheetObject('sheet5');comSheetObject('sheet6');
        fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
//		if(tab3click == ""){
//        	tab3click="Y";
//        	doWork('SEARCH_TARIFF');
//        }
    } else if( isNumSep == "04" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="none";
        tabObjs[2].style.display="none";
        tabObjs[3].style.display='inline';
        tabObjs[4].style.display='none';
        tabObjs[5].style.display='none';
        tabObjs[6].style.display='none';
        
        //comSheetObject('sheet7');comSheetObject('sheet9');comSheetObject('sheet8');
        fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
        fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
        
        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        //BL_COPY
        var copy_bl_seq = frm1.copy_bl_seq.value;
		if (copy_bl_seq == "") {
	        if(tab4click== ""){
		        tab4click= "Y";
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
        fnSetIBsheetInit(10);   //grid가 생성되지않았으면 생성(속도개선)
        
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
  	    
  	    //comSheetObject('sheet3');
  	    fnSetIBsheetInit(4);   //grid가 생성되지않았으면 생성(속도개선)
  	    
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
	    fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
	    
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
//#2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가
var bl_inv_auto_creation ="";

//#4940 ** [BEST OCEAN] WRONG MAWB VALIDATION & NO DUPLICATE ALLOWED
var mawb_verify_yn = "";
function loadPage() {
	//OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN
	ajaxSendPost(setUserTeamInfo, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=opr_team&issued_by="+frm1.opr_usrid.value, "./GateServlet.gsl");
	
	var opt_key = "AE_CERTI_VALIDITY";
	ajaxSendPost(setAeCertiValidityReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key = "AE_BL_HIS_UPDATE";
	ajaxSendPost(setAeBlHisUpdateReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	if(CERTI_YN == "Y"){
    	getObj("tdCertiHndlInfo").style.display = "inline"; 
    }
	
	var opt_key = "AE_VOL_ROUND";
	ajaxSendPost(setAeVolRoundReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	/* #2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가 */
	var opt_key = "BL_INV_AUTO_CREATION";
	ajaxSendPost(setBlInvAutoCreation, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key = "AEM_WGT_CEIL_YN";
	ajaxSendPost(setAemWgtCeilYn,"reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#4940 ** [BEST OCEAN] WRONG MAWB VALIDATION & NO DUPLICATE ALLOWED
	var opt_key = "MAWB_VERIFY_YN";
	ajaxSendPost(setMawbVerifyYn,"reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	/* 속도개선 주석처리
    for(var i=0;isRun && i<docObjects.length;i++){
    	//console.log(docObjects[i].id +' / '+ i);
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
    frm1.bl_grs_wgt.value=doMoneyFmt(Number(frm1.bl_grs_wgt.value).toFixed(1));
    frm1.bl_grs_wgt1.value=doMoneyFmt(Number(frm1.bl_grs_wgt1.value).toFixed(1));
    frm1.bl_chg_wgt.value=doMoneyFmt(Number(frm1.bl_chg_wgt.value).toFixed(1));
    frm1.bl_chg_wgt1.value=doMoneyFmt(Number(frm1.bl_chg_wgt1.value).toFixed(1));
    frm1.vol_wgt.value=doMoneyFmt(Number(frm1.vol_wgt.value).toFixed(1));
    frm1.vol_meas.value=doMoneyFmt(Number(frm1.vol_meas.value).toFixed(6));
    frm1.ctrb_mgn.value=doMoneyFmt(Number(frm1.ctrb_mgn.value).toFixed(2));
    
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	goTabSelect(frm1.f_isNumSep.value);       
    if(frm1.intg_bl_seq.value!=""){
    	doWork('SEARCHLIST01');
    }
    if(user_ofc_cnt_cd=="DE"){
    	if(frm1.intg_bl_seq.value==""){
    		//frm1.acctg_info_txt.value="LBA NO. DE/RA/00491-01/0213" + "\r\n" + "SPX BY ATTACHED CARGO MANIFEST";
    		//frm1.decl_cstms_val.value='AS ATTACHED';
    	}
    }
    if(frm1.intg_bl_seq.value=="" && frm1.copy_bl_seq.value==""){
    
    	//#48588 [Webtrans][게시판#9] AE PACKAGE TYPE INPUT
    	//#22
    	if(frm1.copy_bl_seq.value == ""){
    		setPckUtCd();
    	}
    	//frm1.pck_ut_cd.value="CT";
    	
    	
    	if(user_ofc_cnt_cd=="US"){
    		frm1.wgt_disp_cd.value='KL';
    	}else{
    		frm1.wgt_disp_cd.value='K';
    	}
    	//IATA CODE : AEM Entry Open 시 (New) 에 TB_OFC 에서 가져오는데, 이걸 TRDP 에서 가져오도록 수정
    	
    	//#2908 [ACE TRANS] IATA CODE NOT SHOWING ON AEM ENTRY
    	frm1.iata_cd.value=iata_cd;
    	frm1.ref_no.value="AUTO";
    	//frm1.frt_term_cd.value = "PP";
    }
    
    // #45955 - [IMPEX] 독일 지점 요구사항 3가지, (AEM Entry 화면 디멘젼 길이 디폴트 옵션, Document Package Weight Option, AEM Entry에서 "SUM" 버튼 로직)
    // ---> office의 Unit-Size 정보를 읽도록 로직이 변경되었음.
    // as-is: 독일은 무조건 CM로 변경
    // to-be: office의 Unit-Size 읽도록 변경.
    
/*    if(user_ofc_cnt_cd=="DE"){
    	frm1.size_ut_cd[0].checked = true;
	}else{
		frm1.size_ut_cd[1].checked = true;
	}
    */
    checkBoxSetting();
    
    
	//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
	//조회
	chkIntgBlModiTms("VIEW");
	
	if(user_ofc_cnt_cd == "KR"){
    	$("[id=trKrOnlyWh]").show();
    }
	
	// #4680 [CLA] Blocked file doesn't give Accounting Closed validation
    if(frm1.bl_sts_cd.value=='HO' || frm1.bl_sts_cd.value=='HF'){
    	//"Accounting Closed! Data that affects accounting or profit cannot be changed."
    	alert(getLabel('AIR_MSG_120'));
    }
	
	setTimeout("document.frm1.f_ref_no.focus();", 1000);
	
    /* 2016-12-21 자동완성 기능 추가 S */
    fnSetAutocomplete('shpr_trdp_nm'	, 'LINER_POPLIST', 'shipper', 'A'); //Shipper
    fnSetAutocomplete('cnee_trdp_nm'	, 'LINER_POPLIST', 'consignee', 'A'); //Consignee
    fnSetAutocomplete('ntfy_trdp_nm'	, 'LINER_POPLIST', 'notify', 'A'); //Notify
    fnSetAutocomplete('prnr_trdp_nm2'	, 'LINER_POPLIST', 'partner2', 'A'); //Triangle Agent
    fnSetAutocomplete('agent_trdp_nm'	, 'LINER_POPLIST', 'agent', 'A'); //Forwarding Agent	
    fnSetAutocomplete('lnr_trdp_nm'		, 'LINER_POPLIST_AIR_M', 'liner', 'A'); //Carrier   
    fnSetAutocomplete('iss_trdp_nm'		, 'LINER_POPLIST', 'iss', 'A'); //Issuing Carrier
    fnSetAutocomplete('carr_trdp_nm'	, 'LINER_POPLIST', 'carr', 'A'); //Billing Carrier      
    fnSetAutocomplete('pol_nm'			, 'LOCATION_POPLIST', 'pol', 'A'); //Departure 
    fnSetAutocomplete('fst_to_nm'		, 'LOCATION_POPLIST', 'fst', 'A'); //First To
    fnSetAutocomplete('pod_nm'			, 'LOCATION_POPLIST', 'air_des', 'A'); //Destination        
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
	
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
    fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
    
    //#2586 [BNX US] COD, CREDIT HOLD ACCOUNTS NO WARNING
    if(frm1.intg_bl_seq.value != ''){
//    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, false) : "";
//    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, false) : "";
//    	(formObj.ntfy_trdp_cd.value != "") ? chkCodOnLoad("notify", formObj.ntfy_trdp_cd.value, false) : "";
//    	(formObj.prnr_trdp_cd2.value != "") ? chkCodOnLoad("partner2", formObj.prnr_trdp_cd2.value, false) : "";
//    	(formObj.agent_trdp_cd.value != "") ? chkCodOnLoad("agent", formObj.agent_trdp_cd.value, false) : "";
//    	(formObj.lnr_trdp_cd.value != "") ? chkCodOnLoad("liner", formObj.lnr_trdp_cd.value, false) : "";
//    	(formObj.iss_trdp_cd.value != "") ? chkCodOnLoad("iss", formObj.iss_trdp_cd.value, false) : "";
//    	(formObj.carr_trdp_cd.value != "") ? chkCodOnLoad("carr", formObj.carr_trdp_cd.value, false) : "";
    }else{
    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, true) : "";
    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, true) : "";
    	(formObj.ntfy_trdp_cd.value != "") ? chkCodOnLoad("notify", formObj.ntfy_trdp_cd.value, true) : "";
    	(formObj.prnr_trdp_cd2.value != "") ? chkCodOnLoad("partner2", formObj.prnr_trdp_cd2.value, true) : "";
    	(formObj.agent_trdp_cd.value != "") ? chkCodOnLoad("agent", formObj.agent_trdp_cd.value, true) : "";
    	(formObj.lnr_trdp_cd.value != "") ? chkCodOnLoad("liner", formObj.lnr_trdp_cd.value, true) : "";
    	(formObj.iss_trdp_cd.value != "") ? chkCodOnLoad("iss", formObj.iss_trdp_cd.value, true) : "";
    	(formObj.carr_trdp_cd.value != "") ? chkCodOnLoad("carr", formObj.carr_trdp_cd.value, true) : "";
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
		case "sheet5":
			docObjects[2]=sheet_obj;
		break;
		case "sheet6":
			docObjects[3]=sheet_obj;
		break;
		case "sheet3":
			docObjects[4]=sheet_obj;
		break;
		case "sheet4":
			docObjects[5]=sheet_obj;
		break;
		case "sheet7":
			docObjects[6]=sheet_obj;
		break;
		case "sheet8":
			docObjects[7]=sheet_obj;
		break;
		case "sheet9":
			docObjects[8]=sheet_obj;
		break;
		/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
		case "sheet11":
			docObjects[9]=sheet_obj;
			break;	
		//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
		case "sheet12":
			docObjects[10]=sheet_obj;
			break;
		//Item 그리드
		case "sheet13":
			docObjects[11]=sheet_obj;
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
		with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIE_BMD_0040_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_intg_bl_seq" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_sr_no" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_no" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_cd" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_ref_no" } ];
	         
	        InitColumns(cols);

	        SetEditable(1);
	        SetVisible(0);
	        sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");

		}
        break;
		case 2:     //HBL List
			with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIE_BMD_0040_HDR2'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Seq",     Hidden:0,  Width:35,   Align:"Center",  ColMerge:0,   SaveName:"seq" },
	               {Type:"Text",      Hidden:1, Width:110,  Align:"Left",    ColMerge:0,   SaveName:"hbl_bkg_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:110,   Align:"Left",    ColMerge:0,   SaveName:"hbl_bl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"hbl_act_shipper",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_shpr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_cnee_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_prnr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_ntfy_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_trnk_vsl",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"hbl_trnk_voy",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"hbl_obrd_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_pol_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_pod_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_del_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_del_nod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_del_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_rep_cmdt_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"hbl_rep_cmdt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"hbl_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pck_ut_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"hbl_pck_ut_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"hbl_meas",           KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:4,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_meas_ut_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_grs_wgt",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_grs_wgt_ut_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_grs_wgt1",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_chg_wgt",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_chg_wgt1",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_act_wgt",        KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"hbl_act_wgt_ut_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"hbl_cntr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_intg_bl_seq" },
	               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_ibflag" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_lnr_trdp_cd" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_lnr_trdp_nm" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"hbl_shpr_trdp_nm" },
	               {Type:"Text",      Hidden:1, Width:20,   Align:"Center",  ColMerge:0,   SaveName:"del_icon" } ];
	         
	        InitColumns(cols);

	        SetCountPosition(0);
	        SetEditable(0);
	        SetImageList(0,APP_PATH+"/web/img/main/trash.gif");
	        sheetObj.SetDataLinkMouse("del_icon",1);
	        InitViewFormat(0, "hbl_obrd_dt_tm", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        SetSheetHeight(150);
	        sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
	        //sheetObj.SetFocusAfterProcess(0);
           }                                                      
	    break;
		case 3:		//Air Freight
			with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('AIE_BMD_0040_HDR3'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"del",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"air_frt_term_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"air_aply_ut_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Float",     Hidden:0,  Width:300,  Align:"Right",   ColMerge:0,   SaveName:"air_ru",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
		               {Type:"Float",     Hidden:0,  Width:300,  Align:"Right",   ColMerge:0,   SaveName:"air_chg_wgt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
		               {Type:"Float",     Hidden:0,  Width:300,  Align:"Right",   ColMerge:0,   SaveName:"air_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
		               {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"intg_bl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"air_frt_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"air_frt_ibflag" } ];
		         
		        InitColumns(cols);
	
		        SetCountPosition(0);
		        SetEditable(1);
		        SetColProperty('air_frt_term_cd', {ComboText:'|'+TERMCD1, ComboCode:'|'+TERMCD2} );
		        SetColProperty('air_aply_ut_cd', {ComboText:'|'+UNITCD2_1, ComboCode:'|'+UNITCD2_2} );
		        SetSheetHeight(200);
		        sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
		        //sheetObj.SetFocusAfterProcess(0);
            }
		break;
	    case 4:		//Other Charge
	    	with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('AIE_BMD_0040_HDR4'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"del",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"oth_frt_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:30 },
		               {Type:"Combo",     Hidden:0, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"oth_disp_ord",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		               {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"oth_frt_term_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"oth_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"oth_aply_ut_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Float",     Hidden:0,  Width:220,  Align:"Right",   ColMerge:0,   SaveName:"oth_ru",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
		               {Type:"Float",     Hidden:0,  Width:220,  Align:"Right",   ColMerge:0,   SaveName:"oth_chg_wgt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
		               {Type:"Float",     Hidden:0,  Width:220,  Align:"Right",   ColMerge:0,   SaveName:"oth_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
		               {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"intg_bl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"oth_frt_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"oth_frt_ibflag" } ];
		         
		        InitColumns(cols);
	
		        SetCountPosition(0);
		        SetEditable(1);
		        SetColProperty('oth_disp_ord', {ComboText:'|DueCarrier|DueAgent', ComboCode:'|0|1'} );
		        SetColProperty('oth_frt_term_cd', {ComboText:'|'+TERMCD1, ComboCode:'|'+TERMCD2} );
		        SetColProperty('oth_curr_cd', {ComboText:'|'+CURRCD1, ComboCode:'|'+CURRCD2} );
		        SetColProperty('oth_aply_ut_cd', {ComboText:'|'+UNITCD2_1, ComboCode:'|'+UNITCD2_2} );
		        //SetColProperty(0 ,"oth_frt_cd" , {AcceptKeys:"E|N|[ ]" , InputCaseSensitive:1});  //#1107 [BINEX] FREIGHT NAME TO SHOW ON HAWB
		        SetSheetHeight(200);
		        sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
		        //sheetObj.SetFocusAfterProcess(0);
	    	}                                                      
	    	break;
	    case 5:					//첨부파일
	        with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('AIE_BMD_0040_HDR5'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
		               {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"Del",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
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
		        sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
	       }                                                      
	   break;
	    case 6:	//Dimension     
			with (sheetObj) {
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('AIE_BMD_0040_HDR6_1'), Align:"Center"},
	                      { Text:getLabel('AIE_BMD_0040_HDR6_2'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"dim_ibflag" },
	                {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_len_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	                {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_wdt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	                {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_hgt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	                {Type:"Int",       Hidden:0,  Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_pce_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	                {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_act_dim",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	                {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	                {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt1",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	                {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	                {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	                {Type:"Text",      Hidden:1, Width:52,   Align:"Left",    ColMerge:1,   SaveName:"dim_pck_ut_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dim_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dim_wh_recp_no"}];
	             
	            InitColumns(cols);
	
	            SetEditable(0);
	            SetSheetHeight(150);
	            sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
	            //sheetObj.SetFocusAfterProcess(0);
			}
       break;
	    case 7:      //Account Receivable
	    	if(MULTI_CURR_FLAG == "Y"){	//Muti Currency 
	    	    with(sheetObj){
	    	        var cnt=0;

	    	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

	    	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    	        var headers = [ { Text:getLabel('AIE_BMD_0040_HDR7_3'), Align:"Center"},
	    	                    { Text:getLabel('AIE_BMD_0040_HDR7_4'), Align:"Center"} ];
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
	    	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
	    	               {Type:"Float",     Hidden:0,  Width:97,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    	               
//	    	               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//	    	               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    	               {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    	               
	    	               {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    	               {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    	               
//	    	               #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//	    	               {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
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
	    	  	  	InitViewFormat(0, "fr_inv_xcrt_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
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
	    	         var headers = [ { Text:getLabel('AIE_BMD_0040_HDR7_1'), Align:"Center"},
	    	                   { Text:getLabel('AIE_BMD_0040_HDR7_2'), Align:"Center"} ];
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
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	    	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
	    	             {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    	             
//	    	             #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//	    	             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    	             {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	    	             
	    	             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    	             {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    	             
//	    	             #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//	    	             {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
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
	    	             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
	    		     SetSheetHeight(150);
	    		     sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
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
       case 8:      //Account Payable
    	   if(MULTI_CURR_FLAG == "Y"){	//Muti Currency
    		    with(sheetObj){
    		        var cnt=0;

    		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

    		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    		        var headers = [ { Text:getLabel('AIE_BMD_0040_HDR8_3'), Align:"Center"},
    		                    { Text:getLabel('AIE_BMD_0040_HDR8_4'), Align:"Center"} ];
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
    		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
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
    		               {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_auto_trf_flg" },
    		               {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_frt_ask_clss_cd" },
    		               {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_due_dt" },
    		               {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
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
    	         var headers = [ { Text:getLabel('AIE_BMD_0040_HDR8_1'), Align:"Center"},
    	                     { Text:getLabel('AIE_BMD_0040_HDR8_2'), Align:"Center"} ];
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
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	                
//    	                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	                
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                
//    	                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
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
    	                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_auto_trf_flg" },
    	                {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_frt_ask_clss_cd" },
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_due_dt" },
    	                {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
 		                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
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
    		     SetColProperty(0 ,"b_fr_inv_curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
    	    	 SetSheetHeight(150);
    	    	 sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
    	    	 InitComboNoMatchText(1,"",1);
    	    	 SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
    	    	 
              	  //#2504 [PATENT]Debit Note & AP for billing code based invoices
              	  if(bl_inv_auto_creation == "Y"){
              		 SetColHidden("b_fr_cmb_inv_no", 0);
              	  }
              	  
            }           
    	   }
        break;
       case 9:      //Debit/Credit
    	   if(MULTI_CURR_FLAG == "Y"){	//Muti Currency 
    		      with(sheetObj){
    		          var cnt=0;

    		          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1 } );

    		          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    		          var headers = [ { Text:getLabel('AIE_BMD_0040_HDR9_3'), Align:"Center"},
    		                    { Text:getLabel('AIE_BMD_0040_HDR9_4'), Align:"Center"} ];
    		          InitHeaders(headers, info);

    		          var cols = [ 
    		              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    		              {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    		              {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    		              
    		              {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		              {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    		              {Type:"Float",     Hidden:1,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    		              {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
    		              {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    		              
//    		              #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    		              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    		              {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    		              
    		              {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    		              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		              
//    		              #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    		              {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
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
    	         var headers = [ { Text:getLabel('AIE_BMD_0040_HDR9_1'), Align:"Center"},
    	                     { Text:getLabel('AIE_BMD_0040_HDR9_2'), Align:"Center"} ];
    	         InitHeaders(headers, info);

    	         var cols = [ 
    	                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	                {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	                
    	                {Type:"Combo",     Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	                {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
    	                {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
    	                
//    	                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	                {Type:"Float",      Hidden:1, Width:23,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_rt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
    	                
    	                {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_vat_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	                {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                
//    	                #512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//    	                {Type:"Float",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_xcrt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
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
    	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
    	    	 SetSheetHeight(150);
    	    	 sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
    	    	 InitComboNoMatchText(1,"",1);
    	    	 SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
            }    
    	   }
        break;
  	  /* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
       case 10:      //HISTORY
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
                  {Type:"Date",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0, Format:"YmdHm",  SaveName:"rgst_tms" } ];
            
           InitColumns(cols);

           SetEditable(0);
           SetSheetHeight(210);
           sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
		  }                                                      
		  break; 
		  	//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
	        //Pickup/WorkOrder 그리드        
	       case 11:
	            with (sheetObj) {
			         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
			         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			         var headers = [ { Text:getLabel('AIE_BMD_0020_HDR5_1'), Align:"Center"}  ];
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
		
			         SetCountPosition(0);
			         SetEditable(0);
			         SetColProperty('wo_status', {ComboText:"SAVED|ISSUED", ComboCode:"A|B"} );
			         SetSheetHeight(400);
			         sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
	           }                                                      
	        break;

	        //Item 그리드
	        case 12:      
	            with(sheetObj){

	        	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	        	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        	         var headers = [ { Text:getLabel('AIE_BMD_HDR35'), Align:"Center"},
	        	                   { Text:getLabel('AIE_BMD_HDR36'), Align:"Center"} ];
	        	         InitHeaders(headers, info);

	        	         var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"Del" },
	        	             {Type:"Status",    Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_ibflag" },
	        	             {Type:"Seq",      Hidden:0,  	Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	        	             {Type:"Text",      Hidden:0,  	Width:100,  Align:"Left",    ColMerge:0,   SaveName:"item_cust_po_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	        	             {Type:"Popup", 	Hidden:0, 	Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_cmdt_cd",    	   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
var curIntgSeq=0;
/**
 * 삭제시
 */
function sheet2_OnClick(sheetObj, Row, Col){
	curIntgSeq=0;
	var hblNo=sheetObj.GetCellValue(Row, 'hbl_bl_no');
	if(frm1.intg_bl_seq.value!=''&&sheetObj.ColSaveName(Col)=='del_icon'&&hblNo!=''){
		if(sheetObj.LastRow() + 1 > 2){
			curIntgSeq=sheetObj.GetCellValue(Row, 'hbl_intg_bl_seq');
	 	   	//BL중에 Confirm이 된 건이 있는지 확인함.
			ajaxSendPost(doRmvHblInfo, 'reqVal', '&goWhere=aj&bcKey=getHblClsChk&biz_clss_cd=H&intg_bl_seq='+curIntgSeq, './GateServlet.gsl');
		}else{
//			alert('최소한 한 건의 HAWB가 필요합니다!');
			alert(getLabel('AIR_MSG_037'));
		}
	}
}
/**
 * HBL표시
 */
function sheet2_OnDblClick(sheetObj,Row,Col){
var hblNo=sheetObj.GetCellValue(Row, 'hbl_bl_no');
//OFVFOUR-7951: [JAPT] OPUS down 03/29/2022
var hblSeq=sheetObj.GetCellValue(Row, 'hbl_intg_bl_seq');
	if(sheetObj.ColSaveName(Col)!='del_icon'&&(hblNo!=''||hblSeq!='')){
	   	var paramStr="./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+hblNo+"&f_intg_bl_seq="+encodeURIComponent(hblSeq);
	   	parent.mkNewFrame('Booking & House AWB Entry', paramStr,"AIE_BMD_0020_SHEET_" + hblNo);
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
	 * ETD
	 */
	//if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'Flight Date')!='O'){ //S.Y BAIK (2013.01.23)
	if(!checkInType(frm1.etd_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_FLIT') + getLabel('FMS_COD_DATE'));
		isOk=false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
		return isOk;
	}
	if (trim(frm1.etd_dt_tm.value) != "" && trim(frm1.eta_dt_tm.value) != "") {
		var daysTerms=getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy");
		if (daysTerms < 0) {
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
		isOk = false;
		return isOk; 
	}
	
	//#3982 [BNX] wrong salesman saved
	if(frm1.nomi_flg.value == "" || frm1.nomi_flg.value == "B") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.nomi_flg.focus();
		isOk=false;
		return isOk; 
	}
	/*
	//Booking 시
	//if(checkInputVal(frm1.shpr_trdp_nm.value, 2, 50, "T", 'Shipper')!='O'){
		isOk=false;
		moveTab('01');
		frm1.shpr_trdp_nm.focus();
	}else //if(checkInputVal(frm1.shpr_trdp_addr.value, 2, 400, "T", 'Shipper Address')!='O'){
		moveTab('01');
		frm1.shpr_trdp_addr.focus();
		isOk=false;			
	}else //if(checkInputVal(frm1.cnee_trdp_nm.value, 2, 50, "T", 'Consignee Name')!='O'){
		isOk=false;
		moveTab('01');
		frm1.cnee_trdp_nm.focus();
	}else //if(checkInputVal(frm1.cnee_trdp_addr.value, 2, 400, "T", 'Consignee Address')!='O'){
		moveTab('01');
		frm1.cnee_trdp_addr.focus();
		isOk=false;
	}else //if(checkInputVal(frm1.lnr_trdp_cd.value, 6, 6, "T", 'Air Line Code')!='O'){
		isOk=false;
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
	}else //if(checkInputVal(frm1.lnr_trdp_nm.value, 2, 50, "T", 'Air Line')!='O'){
		isOk=false;
		moveTab('01');
		frm1.lnr_trdp_nm.focus();
	}else if(checkInputVal(frm1.flt_no.value, 3, 6, "T", 'Flight No.')!='O'){
		isOk=false;
		moveTab('01');
		frm1.flt_no.focus();
	}else //if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'Flight Date')!='O'){
		isOk=false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
	}else //if(checkInputVal(frm1.etd_tm.value, 5, 5, "T", 'Flight Time')!='O'){
		isOk=false;
		moveTab('01');
		frm1.etd_tm.focus();
	}else //if(checkInputVal(frm1.eta_dt_tm.value, 10, 10, "DD", 'Arrival Date')!='O'){
		isOk=false;
		moveTab('01');
		frm1.eta_dt_tm.focus();
	}else //if(checkInputVal(frm1.eta_tm.value, 5, 5, "T", 'Arrival Time')!='O'){
		isOk=false;
		moveTab('01');
		frm1.eta_tm.focus();
	}else //if(checkInputVal(frm1.rep_cmdt_cd.value, 0, 50, "T", 'Commodity')!='O'){
		isOk=false;
		moveTab('01');
		frm1.rep_cmdt_cd.focus();		
	}else //if(checkInputVal(frm1.rep_cmdt_nm.value, 1, 200, "T", 'Commodity')!='O'){
		isOk=false;
		moveTab('01');
		frm1.rep_cmdt_nm.focus();		
	}
	if(isOk){
		//if(checkInputVal(frm1.pol_nod_cd.value, 3, 8, "T", 'Departure Code')!='O'){
			isOk=false;
			moveTab('01');
			frm1.pol_nod_cd.focus();
		}else //if(checkInputVal(frm1.pod_nod_cd.value, 3, 8, "T", 'Destination Code')!='O'){
			isOk=false;
			moveTab('01');
			frm1.pod_nod_cd.focus();
		}else //if(checkInputVal(frm1.pck_qty.value, 0, 7, "N", 'Package Qty')!='O'){
			isOk=false;
			moveTab('01');
			frm1.pck_qty.focus();		
		}else if(checkInputVal(frm1.bl_iss_dt.value, 10, 10, "DD", 'Issued Date')!='O'){
			isOk=false;
			moveTab('01');
			frm1.bl_iss_dt.focus();
		}else //if(checkInputVal(frm1.mk_txt.value, 0, 4000, "T", 'Mark')!='O'){
			isOk=false;
			moveTab('02');
			frm1.mk_txt.focus();
		}else //if(checkInputVal(frm1.desc_txt.value, 0, 4000, "T", 'Description')!='O'){
			isOk=false;
			moveTab('02');
			frm1.desc_txt.focus();
		}
	}
	*/
	/*==================================================================================================*/
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용						    */
	/* Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류 발생을 차단. */
	var sheetObjArr=new Array(3);
		fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
		fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
		sheetObjArr[0]=docObjects[6];		//AR LOCAL  'fr_'
		sheetObjArr[1]=docObjects[8];		//DC 		'dc_fr_'
		sheetObjArr[2]=docObjects[7];		//AP 		'b_fr_'
	if(checkFrtSts(sheetObjArr)==false){	//Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk=false;
	}
	/*=================================================================================================*/
	
//	#1351 [CLT] B/L, AWB 등 Freight 탭에 대한 Mandatory Validation 메시지 기능 보완
	var frtSdListParam=docObjects[6].GetSaveString(false);
    if(docObjects[6].IsDataModified() && frtSdListParam == "") { isOk=false; moveTab('04'); };

    var frtBcListParam=docObjects[7].GetSaveString(false);
    if(docObjects[7].IsDataModified() && frtBcListParam == "") { isOk=false; moveTab('04'); };

    var frtDcListParam=docObjects[8].GetSaveString(false);
    if(docObjects[8].IsDataModified() && frtDcListParam == "") { isOk=false; moveTab('04'); };
	
	return isOk;
}
var frmCall=-1;
/**
 * HAWB에서 MAWB이동후 HAWB목록을 조회함
 * doDispHBL_List('<bean:write name="hblVO"  property="dir_intg_bl_seq"/>');
 */
function doDispHBL_List(inHblSeq){
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
	if(inHblSeq!=''&&frm1.intg_bl_seq.value==''){
		frmCall=inHblSeq;
		docObjects[1].DoSearch("./AIE_BMD_0040_1GS.clt", 'f_cmd='+SEARCHLIST03+'&f_hbl_bl_seq='+inHblSeq );
		instObj.style.display='inline';
	}
	var rowCnt=docObjects[1].LastRow() + 1;
	for(var i=1 ; i<rowCnt ; i++){
		docObjects[1].SetCellValue(i, "hbl_ibflag","I");
	}
}
var show_mk_flg=false;
var show_desc_flg=false;
function searchDim(name, obj){
	var formObj=document.frm1;
	if(obj.name == "mk_dim"){
		show_mk_flg=true;
	}
	if(obj.name == "desc_dim"){
		show_desc_flg=true;
	}
	/* oyh 2013.09.09 #20439 :[BINEX] AEM Manifest CBM 삭제 */
	//size_ut_cd
	var unitCd=frm1.size_ut_cd[0].checked?"CM":"IN";
	//pck_ut_nm
	var packageCd= $("select[name=pck_ut_cd]").find('option:selected').val();	
	switch(name){
		case "MK_DIM":
//			if(frm1.intg_bl_seq.value!=""){
//				ajaxSendPost(getDimAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchDim&intg_bl_seq=' + frm1.intg_bl_seq.value, './GateServlet.gsl');
//			}
			fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
			if(docObjects[5].RowCount() == 0){
				if(formObj.mk_txt.value != ""){
					formObj.mk_txt.value += "\r\n";
				}
				formObj.mk_txt.value += "0" + unitCd + ' X ' + "0" + unitCd  + ' X ' + "0" + unitCd  + ' ' + "0" + packageCd;
			}
			for(var i=2 ; i<docObjects[5].LastRow() + 1 ; i++){
				if(formObj.mk_txt.value != ""){
					formObj.mk_txt.value += "\r\n";
				}
				formObj.mk_txt.value += docObjects[5].GetCellValue(i, "dim_len_dim") + unitCd + ' X ' + docObjects[5].GetCellValue(i, "dim_wdt_dim") + unitCd  + ' X ' + docObjects[5].GetCellValue(i, "dim_hgt_dim")+ unitCd  + ' ' + docObjects[5].GetCellValue(i, "dim_pce_qty") + packageCd;
			}
		break;
		case "DESC_DIM":
//			if(frm1.intg_bl_seq.value!=""){
//				ajaxSendPost(getDimAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchDim&intg_bl_seq=' + frm1.intg_bl_seq.value, './GateServlet.gsl');
//			}
			fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
			if(docObjects[5].RowCount() == 0){
				if(formObj.desc_txt.value != ""){
					formObj.desc_txt.value += "\r\n";
				}
				formObj.desc_txt.value += "0" + unitCd  + ' X ' + "0" + unitCd + ' X ' + "0" + unitCd + ' ' + "0" + packageCd;
			}
			
			formObj.desc_txt.value += frm1.rep_cmdt_nm.value;
			for(var i=2 ; i<docObjects[5].LastRow() + 1 ; i++){
				formObj.desc_txt.value += "\r\n";
				formObj.desc_txt.value += docObjects[5].GetCellValue(i, "dim_len_dim") + unitCd  + ' X ' + docObjects[5].GetCellValue(i, "dim_wdt_dim") + unitCd + ' X ' + docObjects[5].GetCellValue(i, "dim_hgt_dim") + unitCd + ' ' + docObjects[5].GetCellValue(i, "dim_pce_qty") + packageCd;
			}
		break;
	}
}
/**
 * Mark, Description에 출력되는 Dimension 정보
 **/
function getDimAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(show_mk_flg){
				formObj.mk_txt.value += "\r\n";
				formObj.mk_txt.value += doc[1];
				formObj.mk_txt.value += "\r\n";
				show_mk_flg=false;
			}
			if(show_desc_flg){
				formObj.desc_txt.value += "\r\n";
				formObj.desc_txt.value += doc[1];
				formObj.desc_txt.value += "\r\n";
				show_desc_flg=false;
			}
			rowCount(frm1,15,frm1.rider_lbl);
		}
	}
}
function weightChange(obj){
	var formObj = document.frm1;
	
	if(obj.name=="grs_wgt"){		
		if(user_ofc_cnt_cd=="US"){
			//#3346 [IMPEX] AEH GROSS VS CHARGEABLE WEIGHT
			if(Number(formObj.grs_wgt.value.replaceAll(",","")) < Number(formObj.vol_wgt.value.replaceAll(",",""))){
				formObj.grs_wgt1.value = roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
				chkComma(formObj.grs_wgt1,8,1);
				
				// #45955 - [IMPEX] 독일 지점 요구사항 3가지, (AEM Entry 화면 디멘젼 길이 디폴트 옵션, Document Package Weight Option, AEM Entry에서 "SUM" 버튼 로직)
				//if (getSumHblYn == "Y") return;
				
				formObj.chg_wgt1.value = formObj.grs_wgt1.value;
				formObj.chg_wgt.value = formObj.grs_wgt.value;
			}else{
				formObj.grs_wgt1.value = roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
				chkComma(formObj.grs_wgt1,8,1);
				
				// #45955 - [IMPEX] 독일 지점 요구사항 3가지, (AEM Entry 화면 디멘젼 길이 디폴트 옵션, Document Package Weight Option, AEM Entry에서 "SUM" 버튼 로직)
				//if (getSumHblYn == "Y") return;
				
				formObj.chg_wgt1.value = formObj.grs_wgt1.value;
				formObj.bl_grs_wgt1.value = formObj.grs_wgt1.value;
				setPrtRateVol("bl_grs_wgt1");
				
				formObj.bl_chg_wgt1.value = formObj.grs_wgt1.value;
				setPrtRateVol("bl_chg_wgt1");
				
				formObj.chg_wgt.value = formObj.grs_wgt.value;
				
				formObj.bl_grs_wgt.value = formObj.grs_wgt.value;
				setPrtRateVol("bl_grs_wgt");
				
				formObj.bl_chg_wgt.value = formObj.grs_wgt.value;
				setPrtRateVol("bl_chg_wgt");
			}
		} else if (wgtCeilYn=="Y") {
			
			//#3346 [IMPEX] AEH GROSS VS CHARGEABLE WEIGHT
			if(Number(formObj.grs_wgt.value.replaceAll(",","")) < Number(formObj.vol_wgt.value.replaceAll(",",""))){
				formObj.grs_wgt.value = Math.ceil( Number(formObj.grs_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
				formObj.grs_wgt1.value = roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
				formObj.grs_wgt1.value = Math.ceil( Number(formObj.grs_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
				chkComma(formObj.grs_wgt,8,1);
				chkComma(formObj.grs_wgt1,8,1);
				
				// #45955 - [IMPEX] 독일 지점 요구사항 3가지, (AEM Entry 화면 디멘젼 길이 디폴트 옵션, Document Package Weight Option, AEM Entry에서 "SUM" 버튼 로직)
				//if (getSumHblYn == "Y") return;
				
				formObj.chg_wgt1.value = formObj.grs_wgt1.value;
				formObj.chg_wgt.value = formObj.grs_wgt.value;
			}else{
				formObj.grs_wgt.value = Math.ceil( Number(formObj.grs_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
				formObj.grs_wgt1.value = roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
				formObj.grs_wgt1.value = Math.ceil( Number(formObj.grs_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
				chkComma(formObj.grs_wgt,8,1);
				chkComma(formObj.grs_wgt1,8,1);
				
				// #45955 - [IMPEX] 독일 지점 요구사항 3가지, (AEM Entry 화면 디멘젼 길이 디폴트 옵션, Document Package Weight Option, AEM Entry에서 "SUM" 버튼 로직)
				//if (getSumHblYn == "Y") return;
				
				formObj.chg_wgt1.value = formObj.grs_wgt1.value;
				formObj.bl_grs_wgt1.value = formObj.grs_wgt1.value;
				setPrtRateVol("bl_grs_wgt1");
				
				formObj.bl_chg_wgt1.value = formObj.grs_wgt1.value;
				setPrtRateVol("bl_chg_wgt1");
				
				formObj.chg_wgt.value = formObj.grs_wgt.value;
				
				formObj.bl_grs_wgt.value = formObj.grs_wgt.value;
				setPrtRateVol("bl_grs_wgt");
				
				formObj.bl_chg_wgt.value = formObj.grs_wgt.value;
				setPrtRateVol("bl_chg_wgt");
			}
		} else {
			formObj.grs_wgt1.value = roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
			chkComma(formObj.grs_wgt1,8,1);
		}
	}
	
	else if(obj.name=="grs_wgt1"){
		if(user_ofc_cnt_cd=="US"){
			
			formObj.grs_wgt.value = roundXL(formObj.grs_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 1);
			//#3346 [IMPEX] AEH GROSS VS CHARGEABLE WEIGHT
			if(Number(formObj.grs_wgt.value.replaceAll(",","")) < Number(formObj.vol_wgt.value.replaceAll(",",""))){
				chkComma(formObj.grs_wgt,8,1); 
				
				formObj.chg_wgt1.value = formObj.grs_wgt1.value;
				formObj.chg_wgt.value = formObj.grs_wgt.value;
			}else{
				chkComma(formObj.grs_wgt,8,1); 
				
				formObj.chg_wgt1.value = formObj.grs_wgt1.value;
				
				formObj.bl_grs_wgt1.value = formObj.grs_wgt1.value;
				setPrtRateVol("bl_grs_wgt1");
				
				formObj.bl_chg_wgt1.value = formObj.grs_wgt1.value;
				setPrtRateVol("bl_chg_wgt1");
				
				formObj.chg_wgt.value = formObj.grs_wgt.value;
				
				formObj.bl_grs_wgt.value = formObj.grs_wgt.value;
				setPrtRateVol("bl_grs_wgt");
				
				formObj.bl_chg_wgt.value = formObj.grs_wgt.value;
				setPrtRateVol("bl_chg_wgt");
			}
		} else if (wgtCeilYn=="Y") {
			
			formObj.grs_wgt1.value = Math.ceil( Number(formObj.grs_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
			formObj.grs_wgt.value = roundXL(formObj.grs_wgt1.value.replaceAll(",","") * CNVT_CNST_KG_LB, 1);
			formObj.grs_wgt.value = Math.ceil( Number(formObj.grs_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
			
			//#3346 [IMPEX] AEH GROSS VS CHARGEABLE WEIGHT
			if(Number(formObj.grs_wgt.value.replaceAll(",","")) < Number(formObj.vol_wgt.value.replaceAll(",",""))){
				
				chkComma(formObj.grs_wgt,8,1);
				chkComma(formObj.grs_wgt1,8,1);
				
				formObj.chg_wgt1.value = formObj.grs_wgt1.value;
				formObj.chg_wgt.value = formObj.grs_wgt.value;
			}else{
				chkComma(formObj.grs_wgt,8,1);
				chkComma(formObj.grs_wgt1,8,1);
				
				formObj.chg_wgt1.value = formObj.grs_wgt1.value;
				
				formObj.bl_grs_wgt1.value = formObj.grs_wgt1.value;
				setPrtRateVol("bl_grs_wgt1");
				
				formObj.bl_chg_wgt1.value = formObj.grs_wgt1.value;
				setPrtRateVol("bl_chg_wgt1");
				
				formObj.chg_wgt.value = formObj.grs_wgt.value;
				
				formObj.bl_grs_wgt.value = formObj.grs_wgt.value;
				setPrtRateVol("bl_grs_wgt");
				
				formObj.bl_chg_wgt.value = formObj.grs_wgt.value;
				setPrtRateVol("bl_chg_wgt");
				
			}
		} else {
			formObj.grs_wgt.value = roundXL(formObj.grs_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 1);
			chkComma(formObj.grs_wgt,8,1);
		}
	}

	
if(obj.name=="chg_wgt"){
		
		if (wgtCeilYn=="Y"){			
			formObj.chg_wgt.value = Math.ceil( Number(formObj.chg_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
			formObj.chg_wgt1.value = roundXL(formObj.chg_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 1);
			formObj.chg_wgt1.value = Math.ceil( Number(formObj.chg_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
			
			chkComma(formObj.chg_wgt,8,1);
			chkComma(formObj.chg_wgt1,8,1);
		} else {
			formObj.chg_wgt1.value = roundXL(formObj.chg_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
			chkComma(formObj.chg_wgt1,8,1);
		}
	}
	//else if(obj.name=="grs_wgt1"){
	if(obj.name=="chg_wgt1"){
		if (wgtCeilYn=="Y"){
			formObj.chg_wgt1.value = Math.ceil( Number(formObj.chg_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
			formObj.chg_wgt.value = roundXL(formObj.chg_wgt1.value.replaceAll(",","") * CNVT_CNST_KG_LB, 1);
			formObj.chg_wgt.value = Math.ceil( Number(formObj.chg_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
			
			chkComma(formObj.chg_wgt,8,1);
			chkComma(formObj.chg_wgt1,8,1);
		} else {
			formObj.chg_wgt.value = roundXL(formObj.chg_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 1);
			chkComma(formObj.chg_wgt,8,1);
		}
	}
	
	if(obj.name=="bl_grs_wgt"){
		
		if (wgtCeilYn=="Y"){
			formObj.bl_grs_wgt.value = Math.ceil( Number(formObj.bl_grs_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
			formObj.bl_grs_wgt1.value = roundXL(formObj.bl_grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
			
			setPrtRateVol("bl_grs_wgt");
			formObj.bl_grs_wgt1.value = Math.ceil( Number(formObj.bl_grs_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
			
			chkComma(formObj.bl_grs_wgt,8,1);
			chkComma(formObj.bl_grs_wgt1,8,1);
			
			setPrtRateVol("bl_grs_wgt1");
		} else {
			setPrtRateVol("bl_grs_wgt");
			
			formObj.bl_grs_wgt1.value = roundXL(formObj.bl_grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
			chkComma(formObj.bl_grs_wgt1,8,1);
			
			setPrtRateVol("bl_grs_wgt1");
		}
	}
	//else if(obj.name=="bl_grs_wgt1"){
	if(obj.name=="bl_grs_wgt1"){
		
		if (wgtCeilYn=="Y"){
			formObj.bl_grs_wgt1.value = Math.ceil( Number(formObj.bl_grs_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
			formObj.bl_grs_wgt.value = roundXL(formObj.bl_grs_wgt1.value.replaceAll(",","") * CNVT_CNST_KG_LB, 1);
			
			setPrtRateVol("bl_grs_wgt1");
			formObj.bl_grs_wgt.value = Math.ceil( Number(formObj.bl_grs_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
			
			chkComma(formObj.bl_grs_wgt,8,1);
			chkComma(formObj.bl_grs_wgt1,8,1);
			
			setPrtRateVol("bl_grs_wgt");
		} else {
			setPrtRateVol("bl_grs_wgt1");
			
			formObj.bl_grs_wgt.value = roundXL(formObj.bl_grs_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 1);
			chkComma(formObj.bl_grs_wgt,8,1);
			
			setPrtRateVol("bl_grs_wgt");
		}
	}
	if(obj.name=="bl_chg_wgt"){
		
		if (wgtCeilYn=="Y"){
			formObj.bl_chg_wgt.value = Math.ceil( Number(formObj.bl_chg_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
			formObj.bl_chg_wgt1.value = roundXL(formObj.bl_chg_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
			
			setPrtRateVol("bl_chg_wgt");
			formObj.bl_chg_wgt1.value = Math.ceil( Number(formObj.bl_chg_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
			
			chkComma(formObj.bl_chg_wgt,8,1);
			chkComma(formObj.bl_chg_wgt1,8,1);
			
			setPrtRateVol("bl_chg_wgt1");
		} else {
			setPrtRateVol("bl_chg_wgt");
			
			formObj.bl_chg_wgt1.value = roundXL(formObj.bl_chg_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
			chkComma(formObj.bl_chg_wgt1,8,1);
			
			setPrtRateVol("bl_chg_wgt1");
		}
	}
	//else if(obj.name=="bl_grs_wgt1"){
	if(obj.name=="bl_chg_wgt1"){
		if (wgtCeilYn=="Y"){
			formObj.bl_chg_wgt1.value = Math.ceil( Number(formObj.bl_chg_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
			formObj.bl_chg_wgt.value = roundXL(formObj.bl_chg_wgt1.value.replaceAll(",","") * CNVT_CNST_KG_LB, 1);
			
			setPrtRateVol("bl_chg_wgt1");
			formObj.bl_chg_wgt.value = Math.ceil( Number(formObj.bl_chg_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
			
			chkComma(formObj.bl_chg_wgt,8,1);
			chkComma(formObj.bl_chg_wgt1,8,1);
			
			setPrtRateVol("bl_chg_wgt");
		} else {
			setPrtRateVol("bl_chg_wgt1");

			formObj.bl_chg_wgt.value = roundXL(formObj.bl_chg_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 1);
			chkComma(formObj.bl_chg_wgt,8,1);
			
			setPrtRateVol("bl_chg_wgt");
		}
		
	}
	else if(obj.name=="vol_wgt"){
		if (wgtCeilYn=="Y"){
			formObj.vol_wgt.value = Math.ceil( Number(formObj.vol_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
			chkComma(formObj.vol_wgt,8,1);
		} 	
	}
	
	if(obj.name=="vol_meas"){
		formObj.vol_wgt.value = calcWeight(parseInt((formObj.vol_meas.value.replaceAll(",","") * 1000 / 6) * 1000) / 1000, 0, "Y");
		chkComma(formObj.vol_wgt,8,1);
		
		if(formObj.grs_wgt.value.replaceAll(",","") - formObj.vol_wgt.value.replaceAll(",","") >= 0){
			formObj.chg_wgt.value = calcWeight(formObj.grs_wgt.value.replaceAll(",",""), 0);
		}else{
			formObj.chg_wgt.value = calcWeight(formObj.vol_wgt.value.replaceAll(",",""), 0);
		}
		weightChange(formObj.chg_wgt);
		getCBM();
		
		chkComma(formObj.chg_wgt,8,1);
	}
	
}


function getCBM(){
//	if(frm1.h_vol_meas.value==0){
//		frm1.desc_txt.value += "\r\n";
//		frm1.desc_txt.value += frm1.vol_meas.value + "(M3)";
//		frm1.desc_txt.value = frm1.desc_txt.value.replaceAll("\r\n0.000000(M3)", ""); 
//	}else{
//		frm1.desc_txt.value = frm1.desc_txt.value.replace(frm1.h_vol_meas.value, frm1.vol_meas.value);
//	}
	frm1.h_vol_meas.value=frm1.vol_meas.value;
}

function setSizeUtCd(obj){
	var formObj=document.frm1;
	var sheetObj=docObjects[5];
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

function chkSizeType(){
	var formObj=document.frm1;
	fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
	var sheetObj=docObjects[5];
//	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
//		sheetObj.CellValue(i, "dim_act_dim") = 0;
//	}
	//LHK 20130812 CM에서 INCH SWITCH 할 경우 CMB Auto Calculation 적용
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
			sheetObj.SetCellValue(i, "dim_act_dim",cbm.toFixed(6),0);
			sheetObj.SetCellValue(i, "dim_chg_wgt",kg.toFixed(1));
			sheetObj.SetCellValue(i, "dim_chg_wgt1",(kg * CNVT_CNST_KG_LB).toFixed(1));
			sheetObj.SetCellValue(i, "dim_meas",cbm.toFixed(6),0);
			sheetObj.SetCellValue(i, "dim_meas1",(cbm * CNVT_CNST_CBM_CFT).toFixed(6),0);
		}else if(formObj.size_ut_cd[1].checked){
			kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, 1);
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 6);
			sheetObj.SetCellValue(i, "dim_act_dim",cbm.toFixed(6),0);
			sheetObj.SetCellValue(i, "dim_chg_wgt",kg.toFixed(1)); 
			sheetObj.SetCellValue(i, "dim_chg_wgt1",(kg * CNVT_CNST_KG_LB).toFixed(1));  
			sheetObj.SetCellValue(i, "dim_meas",cbm.toFixed(6),0);
			sheetObj.SetCellValue(i, "dim_meas1",(cbm * CNVT_CNST_CBM_CFT).toFixed(6),0);
		}
	}
	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
		sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_meas"));
		sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
	}
	/*
	 *  2012.02.15
	 * Total CBM 필드 추가
	 * Total CBM 값을 구하고 Vol Weight로 환산
	 */
	frm1.vol_meas.value=sumCbm.toFixed(6);
	frm1.pck_qty.value=sumPcs.toFixed(0);
	//frm1.vol_wgt.value = (frm1.vol_meas.value * 1000 / 6).toFixed(1);
	weightChange(frm1.vol_meas);
}
//화면로드시 데이터 표시
function loadData(){
	if(frm1.intg_bl_seq.value!=""){
		//currency를 database에 있는 값으로 셋팅함
		frm1.ref_ofc_cd.value=frm1.h_ref_ofc_cd.value;
		frm1.curr_cd.value=frm1.h_curr_cd.value;
		frm1.wgt_disp_cd.value=frm1.h_wgt_disp_cd.value;
		frm1.certi_hndl_info.value=frm1.h_certi_hndl_info.value;
		
		//attach rider 체크
		rowCount(frm1, 15, frm1.rider_lbl);
		//sizeUtCd 셋팅
		setSizeUtCd(frm1.size_ut_cd1.value);
		
		//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
		loadDataProcess ="loadDataWait"; //반드시 마지막 호출 그리드 _OnSearchEnd 이벤트에서 초기화 한다 loadDataProcess = "";
		
		doWork("DIM");
//		frm1.ref_no.className = 'search_form-disable';
//		frm1.ref_no.readOnly  = true;
		
		//#2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.ref_no.value);
	}else{
		if(frm1.copy_bl_seq.value == "") {
    		frm1.hndl_info_txt.value = $("input[name='h_aem_hand_info']").val();
    	}
		
		if(frm1.desc_txt.value=='' && frm1.hndl_info_txt.value==''){
			cargoDesc();
		}
		
		fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
		if (docObjects[5].GetEditable() == 0) {
			docObjects[5].SetEditable(1);
		}
		
		//BL_COPY
		var orgBlSeq = frm1.copy_bl_seq.value;		
		if (orgBlSeq != "") {
			selectCopyBLFrt();
			
			frm1.intg_bl_seq.value = orgBlSeq;
			//doWork("DIM");
			frm1.intg_bl_seq.value = "";
		}
	}
	//OFC의 POST_DATE TYPE를 취득한다.
	ofcChDEta();
	
	//#41634 - [DMS] Default Cursor Position Change
	frm1.ref_no.focus();
}
/*
 * 도량형 변환식
 */
function sheet4_OnChange(sheetObj, row, col, value){
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
	//if(colName=="dim_len_dim" || colName=="dim_wdt_dim" || colName=="dim_hgt_dim" || colName=="dim_pce_qty" || colName=="dim_act_dim"){
	if(colName=="dim_len_dim" || colName=="dim_wdt_dim" || colName=="dim_hgt_dim" || colName=="dim_pce_qty" || colName=="dim_meas" || colName=="del"){		
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
		}else if(formObj.size_ut_cd[1].checked){
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
		else{
			//select size_ut_cd
			alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_SZUN'));
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
		/*
		 *  2012.02.15
		 * Total CBM 필드 추가
		 * Total CBM 값을 구하고 Vol Weight로 환산
		 */
		frm1.vol_meas.value=sumCbm.toFixed(6);
		frm1.pck_qty.value=sumPcs.toFixed(0);
		//frm1.vol_wgt.value = (frm1.vol_meas.value * 1000 / 6).toFixed(1);
		weightChange(frm1.vol_meas);
	}
}
function setOfficeData(){
	var formObj=document.frm1;
	//office size type setting
	setSizeUtCd(oth_size_ut_cd);
	//office post date setting, Ocean Export
	if(formObj.post_dt.value==""){
		if(ofc_post_dt=="TODAY"){
			formObj.post_dt.value=getTodayStr();
		}
	}
	formObj.ref_ofc_cd.value=v_ofc_cd;
	formObj.curr_cd.value=ofc_curr_cd;
}

function sheet5_OnSearchEnd(sheetObj, row, col) {
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
	
	if(copyBlRate1){
		for(var i = 1; i<= sheetObj.RowCount(); i++){
			sheetObj.SetCellValue(i, "air_frt_ibflag","I");
		}
		copyBlRate1 = false;
	}
	
	// #983 [STAR CLUSTER ATL/MIA] AEM AWB ENTRY TO HAVE TOTAL AMOUNT ON B/L RATE TAB
	setTotalPrepaidCollect();
}

function sheet6_OnSearchEnd(sheetObj, row, col) {
	//if (sheetObj.GetFocusAfterProcess() == 0) {
	//	sheetObj.SetFocusAfterProcess(1);
	//}
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
	
	if(copyBlRate2){
		for(var i = 1; i<= sheetObj.RowCount(); i++){
			sheetObj.SetCellValue(i, "oth_frt_ibflag","I");
		}
		copyBlRate2 = false;
	}
	
	// #983 [STAR CLUSTER ATL/MIA] AEM AWB ENTRY TO HAVE TOTAL AMOUNT ON B/L RATE TAB
	setTotalPrepaidCollect();
}

function setTotalPrepaidCollect(){
	// #983 [STAR CLUSTER ATL/MIA] AEM AWB ENTRY TO HAVE TOTAL AMOUNT ON B/L RATE TAB
	var sumPrepaid = 0;
	var sumCollect = 0;
	
	for(var i=1 ; i<=docObjects[2].LastRow() ; i++){
		if( docObjects[2].GetCellValue(i, "del") != '1' ){
			if( docObjects[2].GetCellValue(i, "air_frt_term_cd") == 'PP' ){
				sumPrepaid += parseFloat(docObjects[2].GetCellValue(i, "air_amt"));
			}else if( docObjects[2].GetCellValue(i, "air_frt_term_cd") == 'CC' ){
				sumCollect += parseFloat(docObjects[2].GetCellValue(i, "air_amt"));
			}
		}
	}
	
	for(var i=1 ; i<=docObjects[3].LastRow() ; i++){
		if( docObjects[3].GetCellValue(i, "del") != '1' ){
			if( docObjects[3].GetCellValue(i, "oth_frt_term_cd") == 'PP' ){
				sumPrepaid += parseFloat(docObjects[3].GetCellValue(i, "oth_amt"));
			}else if( docObjects[3].GetCellValue(i, "oth_frt_term_cd") == 'CC' ){
				sumCollect += parseFloat(docObjects[3].GetCellValue(i, "oth_amt"));
			}
		}
	}
	//roundXL(parseFloat(rtnArray[0]),1)
	frm1.f_total_prepaid.value = sumPrepaid;
	frm1.f_total_collect.value = sumCollect;
	
	chkComma(frm1.f_total_prepaid,8,2);
	chkComma(frm1.f_total_collect,8,2);
}

var cur_sheetObj;
var cur_row;
function sheet5_OnPopupClick(sheetObj, row, col){
	cur_sheetObj = sheetObj;
	cur_row = row;
	var colStr=sheetObj.ColSaveName(col);
	//Item 코드(Commidity)
	if(colStr=="air_cmdt_cd"){
		rtnary=new Array(1);
		rtnary[0]="1";
		callBackFunc = "sheet5_air_cmdt_cd";
   		modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
	}
}

function sheet5_air_cmdt_cd(){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		cur_sheetObj.SetCellValue(cur_row, 'air_cmdt_cd',rtnValAry[0]);//Code
		//sheetObj.CellValue(row, 'air_cmdt_nm') = rtnValAry[2];//Code Name
	}
}

function sheet5_OnChange(sheetObj, row, col, value){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="air_chg_wgt" || colStr=="air_ru"){
		sheetObj.SetCellValue(row, "air_amt",sheetObj.GetCellValue(row, "air_chg_wgt") * sheetObj.GetCellValue(row, "air_ru"));
	} else if(colStr=="air_aply_ut_cd") {
		if(sheetObj.GetCellValue(row,       "air_aply_ut_cd")=='ACW'){
			sheetObj.SetCellValue(row,      "air_chg_wgt",frm1.bl_chg_wgt.value);
		}else if(sheetObj.GetCellValue(row, "air_aply_ut_cd")=='AGW'){
			sheetObj.SetCellValue(row,		 "air_chg_wgt",frm1.bl_grs_wgt.value);
		}else if(sheetObj.GetCellValue(row, "air_aply_ut_cd")=='ACL'){
			sheetObj.SetCellValue(row,		 "air_chg_wgt",frm1.bl_chg_wgt1.value);
		}else if(sheetObj.GetCellValue(row, "air_aply_ut_cd")=='AGL'){
			sheetObj.SetCellValue(row,		 "air_chg_wgt",frm1.bl_grs_wgt1.value);
		//#1575	[BNX] INDIA - AWB FREIGHT UNIT에 PKG QTY 항목 추가	
		}else if(sheetObj.GetCellValue(row, "air_aply_ut_cd")=='PKG'){
			sheetObj.SetCellValue(row,		 "air_chg_wgt",frm1.pck_qty.value);
		}else{
			sheetObj.SetCellValue(row,		 "air_chg_wgt",'1');
		}
	} else if(colStr == "del" || colStr == "air_frt_term_cd" || colStr == "air_amt") {
		setTotalPrepaidCollect();
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
function sheet6_OnChange(sheetObj, row, col, value){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="oth_ru" || colStr=="oth_chg_wgt"){
		sheetObj.SetCellValue(row, "oth_amt",sheetObj.GetCellValue(row, "oth_ru") * sheetObj.GetCellValue(row, "oth_chg_wgt"));
	} else if(colStr=="oth_aply_ut_cd") {
		if(sheetObj.GetCellValue(row,       "oth_aply_ut_cd")=='ACW'){
			sheetObj.SetCellValue(row,      "oth_chg_wgt",frm1.bl_chg_wgt.value);
		}else if(sheetObj.GetCellValue(row, "oth_aply_ut_cd")=='AGW'){
			sheetObj.SetCellValue(row,		 "oth_chg_wgt",frm1.bl_grs_wgt.value);
		}else if(sheetObj.GetCellValue(row, "oth_aply_ut_cd")=='ACL'){
			sheetObj.SetCellValue(row,		 "oth_chg_wgt",frm1.bl_chg_wgt1.value);
		}else if(sheetObj.GetCellValue(row, "oth_aply_ut_cd")=='AGL'){
			sheetObj.SetCellValue(row,		 "oth_chg_wgt",frm1.bl_grs_wgt1.value);
		//#1575	[BNX] INDIA - AWB FREIGHT UNIT에 PKG QTY 항목 추가	
		}else if(sheetObj.GetCellValue(row, "oth_aply_ut_cd")=='PKG'){
			sheetObj.SetCellValue(row,		 "oth_chg_wgt",frm1.pck_qty.value);
		}else{
			sheetObj.SetCellValue(row,		 "oth_chg_wgt",'1');
		}
	} else if(colStr == "del" || colStr == "oth_frt_term_cd" || colStr == "oth_amt") {
		setTotalPrepaidCollect();
	}
}
function sumHblValue(){
	if(frm1.intg_bl_seq.value!=''){
		ajaxSendPost(getSumHblValue, 'reqVal', '&goWhere=aj&bcKey=sumHblValueAirExp&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
	}		
}
function getSumHblValue(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			rtnArray=doc[1].split("^^");
			var bl_grs_wgt=roundXL(parseFloat(rtnArray[0]),1);
			var bl_chg_wgt=roundXL(parseFloat(rtnArray[1]),1);
			var vol_wgt=roundXL(parseFloat(rtnArray[2]),1);
			var vol_meas=roundXL(parseFloat(rtnArray[3]),6);
			var pck_qty=roundXL(parseFloat(rtnArray[4]),0);
			var bl_grs_wgt1=roundXL(parseFloat(rtnArray[5]),0);
			var bl_chg_wgt1=roundXL(parseFloat(rtnArray[6]),0);
			
			formObj.grs_wgt.value=bl_grs_wgt;
			formObj.grs_wgt1.value=bl_grs_wgt1;
			formObj.bl_grs_wgt.value=bl_grs_wgt;
			formObj.bl_grs_wgt1.value=bl_grs_wgt1;
			formObj.chg_wgt1.value=bl_chg_wgt1;
			formObj.bl_chg_wgt1.value=bl_chg_wgt1;
			formObj.vol_wgt.value=vol_wgt;
			formObj.vol_meas.value=vol_meas;
			formObj.pck_qty.value=pck_qty;
			
			if(user_ofc_cnt_cd=="JP" || user_ofc_cnt_cd=="DE"){
				if(bl_grs_wgt >= vol_wgt){
					formObj.bl_chg_wgt.value=calcWeight(bl_grs_wgt, 0);
					formObj.chg_wgt.value=calcWeight(bl_grs_wgt, 0);
					formObj.bl_chg_wgt1.value=calcWeight(bl_grs_wgt1, 0);
					formObj.chg_wgt1.value=calcWeight(bl_grs_wgt1, 0);
				}else{
					formObj.bl_chg_wgt.value=calcWeight(vol_wgt, 0);
					formObj.chg_wgt.value=calcWeight(vol_wgt, 0);
					formObj.bl_chg_wgt1.value=calcWeight(roundXL(vol_wgt * CNVT_CNST_KG_LB, 1), 0);
					formObj.chg_wgt1.value=calcWeight(roundXL(vol_wgt * CNVT_CNST_KG_LB, 1), 0);
				}
			}else{
				if(bl_grs_wgt >= bl_chg_wgt){
					formObj.bl_chg_wgt.value=calcWeight(bl_grs_wgt, 0);
					formObj.chg_wgt.value=calcWeight(bl_grs_wgt, 0);
					formObj.bl_chg_wgt1.value=calcWeight(bl_grs_wgt1, 0);
					formObj.chg_wgt1.value=calcWeight(bl_grs_wgt1, 0);
				}else{
					formObj.bl_chg_wgt.value=calcWeight(bl_chg_wgt, 0);
					formObj.chg_wgt.value=calcWeight(bl_chg_wgt, 0);
					formObj.bl_chg_wgt1.value=calcWeight(bl_chg_wgt1, 0);
					formObj.chg_wgt1.value=calcWeight(bl_chg_wgt1, 0);
				}
			}
			
			// weightChange(formObj.bl_grs_wgt);
			if (wgtCeilYn=="Y"){
				formObj.bl_grs_wgt.value = Math.ceil( Number(formObj.bl_grs_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
				setPrtRateVol("bl_grs_wgt");
				
				formObj.bl_grs_wgt1.value = Math.ceil( Number(formObj.bl_grs_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
				setPrtRateVol("bl_grs_wgt1");
				
				chkComma(formObj.bl_grs_wgt,8,1);
				chkComma(formObj.bl_grs_wgt1,8,1);
				
			} else {
				setPrtRateVol("bl_grs_wgt");
				setPrtRateVol("bl_grs_wgt1");
				
				chkComma(formObj.bl_grs_wgt,8,1);
				chkComma(formObj.bl_grs_wgt1,8,1);
			}
			
			// weightChange(formObj.bl_chg_wgt);
			if (wgtCeilYn=="Y"){
				formObj.bl_chg_wgt.value = Math.ceil( Number(formObj.bl_chg_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
				setPrtRateVol("bl_chg_wgt");
				
				formObj.bl_chg_wgt1.value = Math.ceil( Number(formObj.bl_chg_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
				setPrtRateVol("bl_chg_wgt1");
				
				chkComma(formObj.bl_chg_wgt,8,1);
				chkComma(formObj.bl_chg_wgt1,8,1);
				
			} else {
				setPrtRateVol("bl_chg_wgt");
				setPrtRateVol("bl_chg_wgt1");
				
				chkComma(formObj.bl_chg_wgt,8,1);
				chkComma(formObj.bl_chg_wgt1,8,1);
			}
			
			// #47275 - [Binex] Actual Weight & Chargeable Weight Issue
			if(user_ofc_cnt_cd=="JP" || wgtCeilYn=="Y"){
				// #45955 - [IMPEX] 독일 지점 요구사항 3가지, (AEM Entry 화면 디멘젼 길이 디폴트 옵션, Document Package Weight Option, AEM Entry에서 "SUM" 버튼 로직)
				formObj.grs_wgt.value = Math.ceil( Number(formObj.grs_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
				formObj.grs_wgt1.value = Math.ceil( Number(formObj.grs_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
				
				chkComma(formObj.grs_wgt,8,1);
				chkComma(formObj.grs_wgt1,8,1);
				
				formObj.chg_wgt.value = Math.ceil( Number(formObj.chg_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
				formObj.chg_wgt1.value = Math.ceil( Number(formObj.chg_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
				
				chkComma(formObj.chg_wgt,8,1);
				chkComma(formObj.chg_wgt1,8,1);
				
			} else {
				
				//weightChange(formObj.grs_wgt);
				//weightChange(formObj.chg_wgt);
				//weightChange(formObj.vol_meas);		
				
				chkComma(formObj.grs_wgt,8,1);
				chkComma(formObj.grs_wgt1,8,1);
				
				//formObj.bl_grs_wgt.value = formObj.grs_wgt.value;
				//setPrtRateVol("bl_grs_wgt");
				
				formObj.chg_wgt.value = formObj.grs_wgt.value;
				
				formObj.bl_chg_wgt.value = formObj.grs_wgt.value;
				setPrtRateVol("bl_chg_wgt");

				//formObj.bl_grs_wgt1.value = formObj.grs_wgt1.value;
				//setPrtRateVol("bl_grs_wgt1");
				
				formObj.chg_wgt1.value = formObj.grs_wgt1.value;
				
				formObj.bl_chg_wgt1.value = formObj.grs_wgt1.value;
				setPrtRateVol("bl_chg_wgt1");
				
				formObj.vol_wgt.value = calcWeight(parseInt((formObj.vol_meas.value.replaceAll(",","") * 1000 / 6) * 1000) / 1000, 0, "Y");
				chkComma(formObj.vol_wgt,8,1);
				
				if(formObj.grs_wgt.value.replaceAll(",","") - formObj.vol_wgt.value.replaceAll(",","") >= 0){
					formObj.chg_wgt.value = calcWeight(formObj.grs_wgt.value.replaceAll(",",""), 0);
					formObj.chg_wgt1.value = calcWeight(formObj.grs_wgt1.value.replaceAll(",",""), 0);
				}else{
					formObj.chg_wgt.value = formObj.vol_wgt.value.replaceAll(",","");
					formObj.chg_wgt1.value = roundXL(formObj.vol_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 1);
				}
				chkComma(formObj.chg_wgt,8,1);
				chkComma(formObj.chg_wgt1,8,1);
				
				getCBM();
			}
			
			// #48063
			//frm1.f_cmd.value=SEARCHLIST10;
			//fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
			//docObjects[5].DoSearch("./AIE_BMD_0040_2GS.clt", FormQueryString(frm1) );
			
			// #972 - [STAR CLUSTER ATL/MIA] AEM ENTRY SUM BUTTON SHOWING DUPLICATE ITEMS
			ajaxSendPost(getHblDimList, 'reqVal', '&goWhere=aj&bcKey=getHblDimList&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
			
//			formObj.desc_txt.value += "\r\n";
//			formObj.desc_txt.value += formObj.vol_meas.value + "(M3)";
		}else{
			//"There is no HAWB B/L." 
			alert(getLabel('AIR_MSG_095'));
		}
	}
}
function calcWeight(wgt, type, volWgtCalcYn){
	var intWgt=parseInt(wgt);
	var tmpVal=wgt - intWgt;
	var result=0;
	
	if(volWgtCalcYn == "Y" && AE_VOL_ROUND == "R"){
		result = roundXL(wgt,0);
	}else{
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
	}
	return result;
}
function saveStockAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function cargoDesc(){
	if(frm1.cargo_tp_cd.value=='NOR'){
		frm1.desc_txt.value += "\r\n";
		frm1.desc_txt.value += "CONSOLIDATED SHIPMENT AS PER ATTACHED CARGO MANIFEST";
	}else if(frm1.cargo_tp_cd.value=='DGG'){
		frm1.hndl_info_txt.value += "DANGEROUS GOODS AS PER ATTACHED SHIPPER'S DECLARATION";
	}else if(frm1.cargo_tp_cd.value=='SPC'){
	}else if(frm1.cargo_tp_cd.value=='DRY'){
		frm1.desc_txt.value += "\r\n";
		frm1.desc_txt.value += "UN1845";
		frm1.desc_txt.value += "\r\n";
		frm1.desc_txt.value += "CARBON DIOXIDE, SOLID";
	}else if(frm1.cargo_tp_cd.value=='BAT'){
		frm1.hndl_info_txt.value += "LITHIUM METAL BATTERIES OR CELLS, NOT RESTRICTED AS PER PI970//THIS PACKAGE MUST BE HANDLED WITH CARE AND A FLAMMABLILITY HAZARD EXISTS, IF THE PACKAGE IS DAMAGED. DO NOT DAMAGE OR MISHANDLE THIS NECESSARY, BATTERIES MUST BE REPACKED SO AS TO PREVENT SHORT CIRCUIT. CON TACTTEL NUMBER : +81-465-85-2369 (JAPAN)";
	}else{
	}
}
function checkTrdpCode(obj){
	if(obj.name=="prnr_trdp_nm"){
	}else if(obj.name=="shpr_trdp_nm"){
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
	}else if(obj.name=="lnr_trdp_nm"){
	}else if(obj.name=="carr_trdp_nm"){
	}else if(obj.name=="prnr_trdp_nm2"){
	}else if(obj.name=="iss_trdp_nm"){
	}else if(obj.name=="third_trdp_nm"){
	}
}
var grobalFlag="";
function selectAutoIata(flag){
//	var param = '';
//	frm1.lnr_trdp_cd.value	== '' ? param += '' : param += '&trdp_cd=' + frm1.lnr_trdp_cd.value;
//	frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
//	frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
//	frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value;
//	
//	ajaxSendPost(getAutoIata, 'reqVal', '&goWhere=aj&bcKey=selectAutoIata'+param, './GateServlet.gsl');
	var param='';
	grobalFlag=flag;
	param += '&trdp_tp_cd=';
	param += '&sell_buy_tp_cd=A' + '&bnd_clss_cd=O';
	frm1.pol_cd.value		== '' ? param += '' : param += '&pol_cd=' + frm1.pol_cd.value;
	frm1.pod_cd.value		== '' ? param += '' : param += '&pod_cd=' + frm1.pod_cd.value;
	frm1.post_dt.value		== '' ? param += '' : param += '&trf_term_dt=' + frm1.post_dt.value.replaceAll("-","");
	ajaxSendPost(getAutoAir, 'reqVal', '&goWhere=aj&bcKey=selectAutoAir'+param, './GateServlet.gsl');
}
function getAutoIata(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArray=doc[1].split(",");
			var dtlArray=rtnArray[0].split("@@@");
			var sumPck=0;
			fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
			for(var i=1 ; i<docObjects[1].LastRow() + 1 ; i++){
				sumPck=parseInt(sumPck) + parseInt(docObjects[1].GetCellValue(i, "hbl_pck_qty"));
			}
			fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
			fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
			for(var i=0 ; i<dtlArray.length-1 ; i++){
				var tmpArray=dtlArray[i].split("^^^");
				var rows=0;
				if(tmpArray[3]=='A'){
					rows=docObjects[2].LastRow() + 1;
					docObjects[2].DataInsert(rows);
					docObjects[2].SetCellValue(rows, "air_aply_ut_cd",tmpArray[0]);
					docObjects[2].SetCellValue(rows, "air_r_class",tmpArray[1]);
					docObjects[2].SetCellValue(rows, "air_ru",tmpArray[2]);
					docObjects[2].SetCellValue(rows, "air_pce_qty",sumPck);
					docObjects[2].SetCellValue(rows, "air_grs_wgt",frm1.bl_grs_wgt.value);
					docObjects[2].SetCellValue(rows, "air_chg_wgt",frm1.bl_chg_wgt.value);
				}
				else if(tmpArray[3]=='O'){
					rows=docObjects[3].LastRow() + 1;
					docObjects[3].DataInsert(rows);
					docObjects[3].SetCellValue(rows, "oth_frt_cd",tmpArray[5]);
					docObjects[3].SetCellValue(rows, "oth_curr_cd",tmpArray[4]);
					docObjects[3].SetCellValue(rows, "oth_aply_ut_cd",tmpArray[0]);
					docObjects[3].SetCellValue(rows, "oth_ru",tmpArray[2]);
					docObjects[3].SetCellValue(rows, "oth_pck_qty",sumPck);
				}
			}
		}
		else{
			//There is no Iata Tariff Info.
			alert(getLabel('FMS_COM_ALT010'));
		}
	}
}
function issCarrSet(){
	frm1.lnr_trdp_cd.value=frm1.iss_trdp_cd.value;
	frm1.lnr_trdp_nm.value=frm1.iss_trdp_nm.value;
}
function notifyKeyIn(){
	if(typeof(document.getElementsByName("disp_ntfy_flg")[0])=="undefined"){
		frm1.acctg_info_txt.value=frm1.ntfy_trdp_addr.value;
	}else{
		if(document.getElementsByName("disp_ntfy_flg")[0].value == "Y"){
			frm1.acctg_info_txt.value='[NOTIFY]' + '\r\n' + frm1.ntfy_trdp_addr.value;
		}else{
			frm1.acctg_info_txt.value=frm1.ntfy_trdp_addr.value;
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
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[6];
}
function getBcSheet(){
	fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[7];
}
function getDcSheet(){
	fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
	return docObjects[8];
}
function sheet7_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, '', 'A', 'O', 'M');
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
		mutiSheetOnPopupClick(sheetObj, row, col, '', 'A', 'O', 'M');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, '', 'A', 'O', 'M');
}
function sheet7_OnChange(sheetObj, row, col, value) {

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
					sheetObj.SetCellValue(row, 'fr_inv_curr_cd', ofc_locl_curr_cd, 0);
				} else if (sheetObj.GetCellValue(row,'fr_frt_term_cd')=='CC') {
					sheetObj.SetCellValue(row, 'fr_inv_curr_cd', 'USD', 0);
				}
			}

			break;
	}

	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col, '', 'A', 'O', 'M');
}
function sheet7_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, '', 'A', 'O', 'M');
	}
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "fr_att_file_1", 0);
	}
}
function sheet7_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}
function sheet7_OnKeyDown(sheetObj, row, col, keyCode, Shift){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, '', 'A', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "fr_frt_check" == sheetObj.ColSaveName(col)){
			//gridAdd(6);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('ROWADD', docObjects[6], 'A', 'O', 'M');
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
		mutiSheetOnPopupClick(sheetObj, row, col - 1, 'b_', 'A', 'O', 'M');
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
		mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'A', 'O', 'M');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'A', 'O', 'M');
}
function sheet8_OnChange(sheetObj, row, col, value) {
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
			/* if (value < 0) {
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
	mutiSheetOnChange(sheetObj, row, col,  'b_', 'A', 'O', 'M')
}
function sheet8_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj, 'b_', 'A', 'O', 'M');
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
			mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'A', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "b_fr_frt_check" == sheetObj.ColSaveName(col)){
			//gridAdd(8);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('BCROWADD', docObjects[7], 'A', 'O', 'M');
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
		mutiSheetOnPopupClick(sheetObj, row, col - 1, 'dc_', 'A', 'O', 'M');
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
		mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'A', 'O', 'M');
	}
//	mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'A', 'O', 'M');
}
function sheet9_OnChange(sheetObj, row, col, value) {
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
	mutiSheetOnChange(sheetObj, row, col,  'dc_', 'A', 'O', 'M')
}
function sheet9_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
	
	//BL_COPY
	if (frm1.copy_bl_seq.value != '') {
		setBlFrtCopy(sheetObj,'dc_', 'A', 'O', 'M');
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
			mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'A', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "dc_fr_frt_check" == sheetObj.ColSaveName(col)){
			//gridAdd(7);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
			frtRowAdd('DCROWADD', docObjects[8], 'A', 'O', 'M');
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
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
			param += "&bl_frt_yn=Y";  //#3973 [JAPT]Invoice Date & Ex.Rate
		   	var paramStr="./ACC_INV_0010.clt?f_cmd="+param;
		   	parent.parent.mkNewFrame('A/R Entry', paramStr);
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
			param += "&f_bnd_clss_cd=O";
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
		   	parent.parent.mkNewFrame('A/P Entry(Cost)', paramStr);
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
			param += "&f_biz_clss_cd=M";
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
			param += "&bl_frt_yn=Y";  //#3973 [JAPT]Invoice Date & Ex.Rate
		   	var paramStr="./ACC_INV_0020.clt?f_cmd="+param;
		   	parent.parent.mkNewFrame('D/C Note Entry', paramStr);
		break;
	}
}
function goToInvoiceModify(obj){
	fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
	var arObj=docObjects[6];
	var apObj=docObjects[7];
	var dcObj=docObjects[8];
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
			fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[6].DoSearch("./AIE_BMD_0040_7GS.clt", FormQueryString(frm1) );
		break;
		case 8:
			//Buying/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST08;
			fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[7].DoSearch("./AIE_BMD_0040_8GS.clt", FormQueryString(frm1) );
		break;
		case 9:
			//Debit/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST09;
			fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[8].DoSearch("./AIE_BMD_0040_9GS.clt", FormQueryString(frm1) );
		break;
		/* #20416 : [BINEX] History 관리 기능, jsjang 2013.9.13 */
		case 10:
			//Status List 조회
			frm1.f_cmd.value=SEARCHLIST10;
			fnSetIBsheetInit(9);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[9].DoSearch("./SEE_BMD_0026_1GS.clt", FormQueryString(frm1) );
			break;	
		//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
		case 11:
			//WorkOrder List 조회
			frm1.f_cmd.value=SEARCHLIST08;
			fnSetIBsheetInit(10);   //grid가 생성되지않았으면 생성(속도개선)
			docObjects[10].DoSearch("./AIE_BMD_0025GS.clt", FormQueryString(frm1) );
		break;
		
		case 12:
			frm1.f_cmd.value=SEARCHLIST12;
			fnSetIBsheetInit(11);
			docObjects[11].DoSearch("./AIE_BMD_0040_10GS.clt", FormQueryString(frm1) );
			
	}
}
function displayChange(){
	if(frm1.disp_ntfy_flg.value == "Y"){
		//#6222 [BEST OCEAN] AWB 관련 [NOTIFY] option 관련 (Zen#1911)
		frm1.mk_txt.value= frm1.ntfy_trdp_addr.value + '\r\n' + frm1.mk_txt.value;
		//#6214 [BEST OCEAN] AWB 관련 [NOTIFY] option 관련 - AEM/AEH 동일 작동하도록 로직 추가
		frm1.acctg_info_txt.value = '[NOTIFY]' + '\r\n' + frm1.acctg_info_txt.value;
	}else{
		// alert ("[NOTIFY]" + frm1.ntfy_trdp_addr.value+'\r\n' + "\r\n-------\r\n" + frm1.mk_txt.value + '\r\n')
		//OFVFOUR-7602 [PQC][AEM AWB Entry] The system don't remove information of Notify on Mark, Account Info. filed in Mark&Desc Tab
		frm1.mk_txt.value=frm1.mk_txt.value.replace(frm1.ntfy_trdp_addr.value + '\n',"");
		//#6214 [BEST OCEAN] AWB 관련 [NOTIFY] option 관련 - AEM/AEH 동일 작동하도록 로직 추가	
		//OFVFOUR-7602 [PQC][AEM AWB Entry] The system don't remove information of Notify on Mark, Account Info. filed in Mark&Desc Tab
		frm1.acctg_info_txt.value = frm1.acctg_info_txt.value.replace("[NOTIFY]" + "\n","");
	}
}
function checkBoxSetting(){
	var formObj=document.frm1;
	if(formObj.disp_ntfy_flg.value=="Y"){
		formObj.disp_ntfy_flg.checked=true;
	}else{
		formObj.disp_ntfy_flg.checked=false;
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
	
}
//2012.06.19 회사 상호 변경
function chkReserve(){
	if(frm1.chk_flg.checked){
		if(user_ofc_cnt_cd=="US"){
			frm1.reserve_field06.value='Allstate Int’l Freight Company';
		}else if(user_ofc_cnt_cd=="DE"){
			frm1.reserve_field06.value='Atlantic Integrated Freight GmbH';
		}else if(user_ofc_cnt_cd=="IT"){
			frm1.reserve_field06.value='Atlantic Integrated Freight S.R.L.';
		}else if(user_ofc_cnt_cd=="FR"){
			frm1.reserve_field06.value='Atlantic Integrated Freight SARL';
		}else if(user_ofc_cnt_cd=="JP"){
			//frm1.reserve_field06.value = '';
		}else{
		}
	}else{
		frm1.reserve_field06.value='';
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
				/*if(tmpArray[8]==0 && tmpArray[9]==0){
					//alert(1 + "  " + tmpArray[8] + "  " + tmpArray[9]);
				}
				else*/ 
				if(tmpArray[8]==0 && tmpArray[9]!=0){
					if(0<=masterWgt-tmpArray[9]){
						useFlag=false;
					}
				}
				else if(tmpArray[8]!=0 && tmpArray[9]==0){
					if(tmpArray[8]-msterWgt>0){
						useFlag=false;
					}
				}
				else if(tmpArray[8]!=0 && tmpArray[9]!=0){
					if(tmpArray[8]-masterWgt>0 || 0<=masterWgt-tmpArray[9]){
						useFlag=false;
					}
				}
				if(useFlag){
					if(tmpArray[0]=="AF"){
						gridAdd(2);
						sheetObj=docObjects[2];
						sheetObj.SetCellValue(sheetObj.LastRow(), "air_pce_qty",frm1.pck_qty.value.replaceAll(',',''));
						sheetObj.SetCellValue(sheetObj.LastRow(), "air_grs_wgt",grsWgtKg);
						sheetObj.SetCellValue(sheetObj.LastRow(), "air_chg_wgt",chgWgtKg);
						sheetObj.SetCellValue(sheetObj.LastRow(), "air_aply_ut_cd",tmpArray[4]);
						sheetObj.SetCellValue(sheetObj.LastRow(), "air_frt_term_cd",frm1.frt_term_cd.value);
						sheetObj.SetCellValue(sheetObj.LastRow(), "air_ru",tmpArray[7]);
					}
					else{
						gridAdd(3);
						sheetObj=docObjects[3];
						sheetObj.SetCellValue(sheetObj.LastRow(), "oth_frt_cd",tmpArray[0]);
						sheetObj.SetCellValue(sheetObj.LastRow(), "oth_curr_cd",tmpArray[3]);
						sheetObj.SetCellValue(sheetObj.LastRow(), "oth_aply_ut_cd",tmpArray[4]);
						if(tmpArray[4]=="AGW"){
							sheetObj.SetCellValue(sheetObj.LastRow(), "oth_ru",grsWgtKg);
						}
						else if(tmpArray[4]=="ACW"){
							sheetObj.SetCellValue(sheetObj.LastRow(), "oth_ru",chgWgtKg);
						}
						sheetObj.SetCellValue(sheetObj.LastRow(), "oth_pck_qty",frm1.pck_qty.value);
					}
				}
			}
		}
		else{
			//There is no Iata Tariff Info.
			alert(getLabel('FMS_COM_ALT010'));
		}
	}
}
/**
 * IBSeet내의 데이터 셀에서 키보드가 눌린 경우 발생하는 Event<br>
 * @param {sheetObj} String : 해당 IBSheet Object
 * @param {row} Long : 해당 셀의 row Index
 * @param {col} Long : 해당 셀의 Column Index
 * @param {keyCode} Integer : 키보드의 아스키 값
 */
function sheet5_OnKeyDown(sheetObj, row, col, keyCode) {
	switch (sheetObj.ColSaveName(col)) {
		case "air_pce_qty":
		case "air_grs_wgt":
		case "air_chg_wgt":
		case "air_ru":
		case "air_amt":
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
/**
 * IBSeet내의 데이터 셀에서 키보드가 눌린 경우 발생하는 Event<br>
 * @param {sheetObj} String : 해당 IBSheet Object
 * @param {Row} Long : 해당 셀의 Row Index
 * @param {Col} Long : 해당 셀의 Column Index
 * @param {KeyCode} Integer : 키보드의 아스키 값
 */
function sheet6_OnKeyDown(sheetObj, row, col, keyCode) {
	switch (sheetObj.ColSaveName(col)) {
		case "oth_disp_ord":
		case "oth_xcrt":
		case "oth_pck_qty":
		case "oth_ru":
		case "oth_amt":
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
}
/**
 * IBSeet내의 데이터 셀에서 키보드가 눌린 경우 발생하는 Event<br>
 * @param {sheetObj} String : 해당 IBSheet Object
 * @param {row} Long : 해당 셀의 row Index
 * @param {col} Long : 해당 셀의 Column Index
 * @param {keyCode} Integer : 키보드의 아스키 값
 */
function sheet4_OnKeyDown(sheetObj, row, col, keyCode) {
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
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
 *  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
 **/
function setPost_date(save_flag){
 	var formObj=document.frm1;
 	if(save_flag == "I"){
 		if(ofc_post_dt=="ETD"){
 		   frm1.post_dt.value=frm1.etd_dt_tm.value;
 		}else if(ofc_post_dt=="ETA"){
 		   frm1.post_dt.value=frm1.eta_dt_tm.value;
 		   //25273 OFC_CD변경시 TODAY에 대한 고려가 없어서 추가
 		}else if(ofc_post_dt=="TODAY"){
 			//LHK, 20140924 #43960 [DYNAMIC] Post Date 변경
	 		if(formObj.post_dt.value==""){
	 			formObj.post_dt.value=getTodayStr();
	 		}
 		}
 	}else if(save_flag == "U"){
 		if(ofc_post_dt=="ETD"){
 			if (frm1.etd_dt_tm.value != frm1.org_etd_dt_tm.value ){
 				frm1.post_dt.value=frm1.etd_dt_tm.value;
 			}  		   
  		}else if(ofc_post_dt=="ETA"){
  			if (frm1.eta_dt_tm.value != frm1.org_eta_dt_tm.value ){
  				frm1.post_dt.value=frm1.eta_dt_tm.value;
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

function setFrtAdd() {
	doWork('AIR_FRT_ADD');
	//OFVFOUR-8064 [ABC LOGIS] Add 2 more charges for Default 'B/L Rate'
	//doWork('OTH_FRT_ADD');
	//fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	//docObjects[3].SetCellValue(docObjects[3].LastRow(), "oth_frt_cd",'FSC');
	//doWork('OTH_FRT_ADD');
	//docObjects[3].SetCellValue(docObjects[3].LastRow(), "oth_frt_cd",'SSC');
	var comCd = 'C331';
	ajaxSendPost(setOthFrtCd, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=sub_cd&comCd=' + comCd, './GateServlet.gsl');
}

function setOthFrtCd(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1] !=undefined ) {
		var itemList = doc[1].split('@@;');
		var subCd;
		
		for(var i=0 ; i< itemList.length ; i++){
			if ( itemList[i] != "" ){
				subCd = itemList[i].split('@@^');
				doWork('OTH_FRT_ADD');
				docObjects[3].SetCellValue(docObjects[3].LastRow(), "oth_frt_cd",subCd[3]);
			}
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
	if(formObj.lnr_bkg_no.value != ""){
		if(formObj.lnr_bkg_no.value != formObj.org_lnr_bkg_no.value){
			ajaxSendPost(checkDuplicateLinerBkgNoEnd, 'reqVal', '&goWhere=aj&bcKey=searchDuplicateLinerBkgNo&lnr_bkg_no='+formObj.lnr_bkg_no.value+'&air_sea_clss_cd='+'A' , './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * Carrier Bkg NO 중복체크
 */
function checkDuplicateLinerBkgNoEnd(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				//alert("Ref. No Duplicate!! ");
				if( !confirm( (getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CBKNO') + '\n'+ getLabel('FMS_COM_CFMPRO'))  ) ){
					formObj.lnr_bkg_no.value=formObj.org_lnr_bkg_no.value;
					formObj.lnr_bkg_no.select();
					linerBkgNoDup = true;
				}
			}
		}
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
	try{
		if (window.event.type == "blur" || (window.event.keyCode == 13 && s_code != "")) {
			if(formObj.lnr_trdp_cd.value == "" && s_code.length >= 3) {
				var bl_no=formObj.bl_no.value.toUpperCase();
				var s_code=bl_no.substring(0,3);
				formObj.lnr_trdp_cd.value=s_code;
				codeNameAction('trdpCode_exp_air_carr', formObj.lnr_trdp_cd, 'onBlur');
			}
		}
	}catch(e){
		
	}
}
/**
 * #30283 - [BINEX]AEM Weight 정보 동기화
 */
function setPrtRateVol(objName){
	var formObj=document.frm1;
	fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
	fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
	var airRowCnt=docObjects[2].LastRow() + 1;
	var othRowCnt=docObjects[3].LastRow() + 1;
	// B/L Gross Weight
	if (objName == "bl_grs_wgt") {
		for(var i=1 ; i<airRowCnt ; i++){
			if (docObjects[2].GetCellValue(i, "air_aply_ut_cd") == "AGW") {
				docObjects[2].SetCellValue(i, "air_chg_wgt",formObj.bl_grs_wgt.value);
			}
		}
		for(var i=1 ; i<othRowCnt ; i++){
			if (docObjects[3].GetCellValue(i, "oth_aply_ut_cd") == "AGW") {
				docObjects[3].SetCellValue(i, "oth_chg_wgt",formObj.bl_grs_wgt.value);
			}
		}
	} 
	// B/L Gross Weight(L)
	else if (objName == "bl_grs_wgt1") {
		for(var i=1 ; i<airRowCnt ; i++){
			if (docObjects[2].GetCellValue(i, "air_aply_ut_cd") == "AGL") {
				docObjects[2].SetCellValue(i, "air_chg_wgt",formObj.bl_grs_wgt1.value);
			}
		}
		for(var i=1 ; i<othRowCnt ; i++){
			if (docObjects[3].GetCellValue(i, "oth_aply_ut_cd") == "AGL") {
				docObjects[3].SetCellValue(i, "oth_chg_wgt",formObj.bl_grs_wgt1.value);
			}
		}
	} 
	// B/L Chargeable Weight
	else if (objName == "bl_chg_wgt") {
		for(var i=1 ; i<airRowCnt ; i++){
			if (docObjects[2].GetCellValue(i, "air_aply_ut_cd") == "ACW") {
				docObjects[2].SetCellValue(i, "air_chg_wgt",formObj.bl_chg_wgt.value);
			} 
		}
		for(var i=1 ; i<othRowCnt ; i++){
			if (docObjects[3].GetCellValue(i, "oth_aply_ut_cd") == "ACW") {
				docObjects[3].SetCellValue(i, "oth_chg_wgt",formObj.bl_chg_wgt.value);
			}
		}
	} 
	// B/L Chargeable Weight(L)
	else if (objName == "bl_chg_wgt1") {
		for(var i=1 ; i<airRowCnt ; i++){
			if (docObjects[2].GetCellValue(i, "air_aply_ut_cd") == "ACL") {
				docObjects[2].SetCellValue(i, "air_chg_wgt",formObj.bl_chg_wgt1.value);
			} 
		}
		for(var i=1 ; i<othRowCnt ; i++){
			if (docObjects[3].GetCellValue(i, "oth_aply_ut_cd") == "ACL") {
				docObjects[3].SetCellValue(i, "oth_chg_wgt",formObj.bl_chg_wgt1.value);
			}
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
	   param += '&bnd_clss_cd=O';
	   param += '&biz_clss_cd=M';
 	var paramStr="./AIC_WOM_0014.clt?f_cmd="+SEARCH+"&"+param;
 	parent.parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
 	*/
   	var paramStr="./AIC_WOM_0014.clt?air_sea_clss_cd=A&bnd_clss_cd=O&biz_clss_cd=M";
    var param = "&f_cmd=" + SEARCH;
    param += "&f_wo_no=" + sheetObj.GetCellValue(row, 'wo_no');
    parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
}

function HBLADD(rtnVal){
	   if(rtnVal!=''&&typeof(rtnVal)!='undefined'){
 	   var rtnArr=rtnVal.split(';');
 	   var isBegin=true;
 	   var savedHbl='';
 	   //기존 HBL목록을 초기화
 	    fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성(속도개선)
      	if(docObjects[1].LastRow() + 1>1){
     		var totRow=docObjects[1].LastRow();
     		for(var i=totRow; 0 < i; i--){
     			if(docObjects[1].GetCellValue(i, 'hbl_ibflag')!='R'){
     				docObjects[1].RowDelete(i, false);
     			}else{
     				savedHbl+= docObjects[1].GetCellValue(i, 'hbl_bl_no');
     				savedHbl+= ':';
     			}
     		}
     	}
        //현재 선택된 HBL정보를 표시함 
		   var intRows=docObjects[1].LastRow() + 1;
		   var newRow=intRows;
		   var dispArr;
		   var totPck=0;
		   var totMeas=0;
		   var totChgWgt=0;
		   var totWgt=0;
		   var blSeq='';
		   var isBgin=false;
 	   for(var i=0; i < rtnArr.length; i++){
 		   var hblArr=rtnArr[i].split('^');
 		   //화면표시
			   if(i==0){
				   dispArr=hblArr;
			   }
 		   if(rtnArr[i]!=''){
 			   //BL번호가 저장되어있지 않음경우
 			   if(savedHbl.indexOf(hblArr[1]+':')==-1){
					    docObjects[1].DataInsert(newRow);
						docObjects[1].SetCellValue(intRows, 'hbl_bkg_no',hblArr[0]);
						docObjects[1].SetCellValue(intRows, 'hbl_bl_no',hblArr[1]);
						docObjects[1].SetCellValue(intRows, 'hbl_shipper',hblArr[2]);
						docObjects[1].SetCellValue(intRows, 'hbl_obrd_dt_tm',hblArr[3]);
						docObjects[1].SetCellValue(intRows, 'hbl_trnk_cd',hblArr[4]);
						docObjects[1].SetCellValue(intRows, 'hbl_trnk_vsl',hblArr[5]);
						docObjects[1].SetCellValue(intRows, 'hbl_trnk_voy',hblArr[6]);
						docObjects[1].SetCellValue(intRows, 'hbl_pol_cd',hblArr[7]);
						docObjects[1].SetCellValue(intRows, 'hbl_pol_nod_cd',hblArr[8]);
						docObjects[1].SetCellValue(intRows, 'hbl_pol_nm',hblArr[9]);
						docObjects[1].SetCellValue(intRows, 'hbl_pod_cd',hblArr[10]);
						docObjects[1].SetCellValue(intRows, 'hbl_pod_nod_cd',hblArr[11]);
						docObjects[1].SetCellValue(intRows, 'hbl_pod_nm',hblArr[12]);
						docObjects[1].SetCellValue(intRows, 'hbl_del_cd',hblArr[13]);
						docObjects[1].SetCellValue(intRows, 'hbl_del_nod_cd',hblArr[14]);
						docObjects[1].SetCellValue(intRows, 'hbl_del_nm',hblArr[15]);
						docObjects[1].SetCellValue(intRows, 'hbl_rep_cmdt_cd',hblArr[16]);
						docObjects[1].SetCellValue(intRows, 'hbl_rep_cmdt_nm',hblArr[17]);
						docObjects[1].SetCellValue(intRows, 'hbl_grs_wgt',hblArr[18]);
						docObjects[1].SetCellValue(intRows, 'hbl_grs_wgt_ut_cd',hblArr[19]);
						docObjects[1].SetCellValue(intRows, 'hbl_act_wgt',hblArr[20]);
						docObjects[1].SetCellValue(intRows, 'hbl_act_wgt_ut_cd',hblArr[21]);
						docObjects[1].SetCellValue(intRows, 'hbl_meas',hblArr[22]);
						docObjects[1].SetCellValue(intRows, 'hbl_meas_ut_cd',hblArr[23]);
						docObjects[1].SetCellValue(intRows, 'hbl_pck_qty',hblArr[24]);
						docObjects[1].SetCellValue(intRows, 'hbl_pck_ut_cd',hblArr[25]);
						docObjects[1].SetCellValue(intRows, 'hbl_pck_ut_nm',hblArr[26]);
						docObjects[1].SetCellValue(intRows, 'hbl_intg_bl_seq',hblArr[27]);
						docObjects[1].SetCellValue(intRows, 'hbl_etd_tm',modiStrDateType(hblArr[28], 1));
						docObjects[1].SetCellValue(intRows, 'hbl_shpr_trdp_nm',hblArr[29]);
						blSeq+= hblArr[27];
						blSeq+= ',';
						totWgt=getSumFloat(totWgt, hblArr[18]);
						totMeas=getSumFloat(totMeas,hblArr[22]);
						totPck=getSumFloat(totPck, hblArr[24]);
						totChgWgt=getSumFloat(totChgWgt, hblArr[20]);
					   if(isBegin){
						   if(frm1.intg_bl_seq.value==''){
							   shpAddr+= '\n';
							   shpAddr+= hblArr[29];
							   frm1.shpr_trdp_addr.value=shpAddr; 
							   instObj.style.display='inline';   
						   }
						   isBegin=false;
					   }
					   newRow++;
					   intRows++;
 			   }
 		   }
 	   }
 	   if(newRow>0){
 		   dispArr[24]=strToFloatByNDecimalTp(totPck,    100);
 		   dispArr[18]=strToFloatByNDecimalTp(totWgt,    100);
 		   dispArr[20]=strToFloatByNDecimalTp(totChgWgt, 100);
 		   dispArr[22]=strToFloatByNDecimalTp(totMeas,   10000);
 		   //화면에 기본값 표시
 		   setDfltVal(dispArr);
 		   //Mark/Description 표시
 		   if(blSeq!=''){
 			   ajaxSendPost(autoMrkDesc, 'reqVal', '&goWhere=aj&bcKey=searchAirMrkDesc&intg_bl_seq='+blSeq, './GateServlet.gsl');	        			   
 		   }
 	   }
		//	frm1.act_wgt.value    = hblArr[19];
		//	frm1.meas.value       = hblArr[21];
		//	frm1.pck_qty.value    = hblArr[23];
	   }
   }
function STOCK_POP(rtnVal){
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var formObj=document.frm1;
		var rtnValAry=rtnVal.split("|");
		formObj.bl_no.value=rtnValAry[0];
		formObj.bl_no.focus();	
		formObj.bl_no.blur();
		//AJAX로 MASTER STOCK를 저장한다.
		var use_flg="Y";
		var mawb_no=formObj.bl_no.value;
		var param='';
		param += '&usr_id=' + usrid;
		param += '&ofc_cd=' + ofccd;
		ajaxSendPost(saveStockAjaxReq, 'reqVal', '&goWhere=aj&bcKey=saveMasterStock&use_flg='+use_flg+'&mawb_no='+mawb_no + param, './GateServlet.gsl');
		//Carrier 자동 기입
		setCarrierCd(formObj.bl_no);
//		formObj.use_stock.value = "Y";
//		stockDiv.style.display = "none";
//		returnDiv.style.display = "inline";
	}
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_ref_no.value = getParam(url,"f_ref_no");
	formObj.f_bl_no.value = "";
	
	doWork('SEARCHLIST');
}

function submitForm(formObj){
	//var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./AIE_BMD_0040AJ.clt",
		   dataType: 'xml',
		   data : $(formObj).serialize(),
		   success: function(data){
			   setFieldValue( formObj.bl_sts_cd, $('bl_sts_cd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.sr_no, $('sr_no',data).text());
			   setFieldValue( formObj.f_intg_bl_seq, $('f_intg_bl_seq',data).text());
			   setFieldValue( formObj.mk_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.h_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.sel_ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.org_lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.org_post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());
			   setFieldValue( formObj.f_ref_no, $('f_ref_no',data).text());
			   setFieldValue( formObj.f_bl_no, $('f_bl_no',data).text());
			   setFieldValue( formObj.ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.h_ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.hbl_tp_cd, $('hbl_tp_cd',data).text());
			   setFieldValue( formObj.post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.bl_dt_tm, $('bl_dt_tm',data).text());
			   setFieldValue( formObj.bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.mrn_no, $('mrn_no',data).text());
			   setFieldValue( formObj.exp_ref_no, $('exp_ref_no',data).text());
			   setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.prnr_ref_no, $('prnr_ref_no',data).text());
			   setFieldValue( formObj.lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.itn_no, $('itn_no',data).text());
			   setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
			   setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
			   setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
			   setFieldValue( formObj.ntfy_trdp_cd, $('ntfy_trdp_cd',data).text());
			   setFieldValue( formObj.ntfy_trdp_nm, $('ntfy_trdp_nm',data).text());
			   setFieldValue( formObj.ntfy_trdp_addr, $('ntfy_trdp_addr',data).text());
			   setFieldValue( formObj.disp_ntfy_flg, $('disp_ntfy_flg',data).text());
			   setFieldValue( formObj.prnr_trdp_cd2, $('prnr_trdp_cd2',data).text());
			   setFieldValue( formObj.prnr_trdp_nm2, $('prnr_trdp_nm2',data).text());
			   setFieldValue( formObj.prnr_trdp_addr2, $('prnr_trdp_addr2',data).text());
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.obrd_dt_tm, $('obrd_dt_tm',data).text());
			   setFieldValue( formObj.flt_no, $('flt_no',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.org_etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.etd_tm, $('etd_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.org_eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.eta_tm, $('eta_tm',data).text());
			   setFieldValue( formObj.iss_trdp_cd, $('iss_trdp_cd',data).text());
			   setFieldValue( formObj.iss_trdp_nm, $('iss_trdp_nm',data).text());
			   setFieldValue( formObj.iss_trdp_addr, $('iss_trdp_addr',data).text());
			   setFieldValue( formObj.carr_trdp_cd, $('carr_trdp_cd',data).text());
			   setFieldValue( formObj.carr_trdp_nm, $('carr_trdp_nm',data).text());
			   setFieldValue( formObj.carr_trdp_addr, $('carr_trdp_addr',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nod_cd, $('pol_nod_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.fst_to_cd, $('fst_to_cd',data).text());
			   setFieldValue( formObj.fst_to_nm, $('fst_to_nm',data).text());
			   setFieldValue( formObj.ts1_port_cd, $('ts1_port_cd',data).text());
			   setFieldValue( formObj.ts1_flt_no, $('ts1_flt_no',data).text());
			   setFieldValue( formObj.ts2_port_cd, $('ts2_port_cd',data).text());
			   setFieldValue( formObj.ts2_flt_no, $('ts2_flt_no',data).text());
			   setFieldValue( formObj.ts3_port_cd, $('ts3_port_cd',data).text());
			   setFieldValue( formObj.ts3_flt_no, $('ts3_flt_no',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nod_cd, $('pod_nod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.cfs_nod_cd, $('cfs_nod_cd',data).text());
		       setFieldValue( formObj.cfs_loc_nm, $('cfs_loc_nm',data).text());
			   setFieldValue( formObj.cfs_loc_cd, $('cfs_loc_cd',data).text());
			   setFieldValue( formObj.iata_cd, $('iata_cd',data).text());
			   setFieldValue( formObj.mm_txt, $('mm_txt',data).text());
			   setFieldValue( formObj.cargo_tp_cd, $('cargo_tp_cd',data).text());
			   setFieldValue( formObj.rt_clss_cd, $('rt_clss_cd',data).text());
			   setFieldValue( formObj.bl_iss_dt, $('bl_iss_dt',data).text());
			   setFieldValue( formObj.opr_usrid, $('issued_by',data).text());
			   setFieldValue( formObj.opr_usrnm, $('proc_usrnm',data).text());
			   setFieldValue( formObj.opr_ofc_cd, $('proc_ofccd',data).text());
			   setFieldValue( formObj.opr_dept_cd, $('proc_dept_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_cd, $('rep_cmdt_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.chg_wgt, $('chg_wgt',data).text());
			   setFieldValue( formObj.chg_wgt1, $('chg_wgt1',data).text());
			   setFieldValue( formObj.bl_grs_wgt, $('bl_grs_wgt',data).text());
			   setFieldValue( formObj.bl_grs_wgt1, $('bl_grs_wgt1',data).text());
			   setFieldValue( formObj.bl_chg_wgt, $('bl_chg_wgt',data).text());
			   setFieldValue( formObj.bl_chg_wgt1, $('bl_chg_wgt1',data).text());
			   setFieldValue( formObj.vol_wgt, $('vol_wgt',data).text());
			   setFieldValue( formObj.vol_meas, $('vol_meas',data).text());
			   setFieldValue( formObj.h_vol_meas, $('vol_meas',data).text());
			   setFieldValue( formObj.curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.size_ut_cd1, $('size_ut_cd',data).text());
			   setFieldValue( formObj.frt_term_cd, $('frt_term_cd',data).text());
			   setFieldValue( formObj.otr_chg_term_cd, $('otr_chg_term_cd',data).text());
			   setFieldValue( formObj.decl_crr_val, $('decl_crr_val',data).text());
			   setFieldValue( formObj.decl_cstms_val, $('decl_cstms_val',data).text());
			   setFieldValue( formObj.amt_insur_val, $('amt_insur_val',data).text());
			   setFieldValue( formObj.spot_no, $('spot_no',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   setFieldValue( formObj.sls_usr_nm, $('sls_usr_nm',data).text());
			   setFieldValue( formObj.sls_dept_cd, $('sls_dept_cd',data).text());
			   setFieldValue( formObj.hndl_info_txt, $('hndl_info_txt',data).text());
			   setFieldValue( formObj.acctg_info_txt, $('acctg_info_txt',data).text());
			   setFieldValue( formObj.mk_txt, $('mk_txt',data).text());
			   setFieldValue( formObj.desc_txt, $('desc_txt',data).text());
			   setFieldValue( formObj.wgt_disp_cd, $('wgt_disp_cd',data).text());
			   setFieldValue( formObj.h_wgt_disp_cd, $('wgt_disp_cd',data).text());
			   setFieldValue( formObj.ctrb_ofc_cd, $('ctrb_ofc_cd',data).text());
			   setFieldValue( formObj.ctrb_dept_cd, $('ctrb_dept_cd',data).text());
			   setFieldValue( formObj.ctrb_ratio_yn, $('ctrb_ratio_yn',data).text());
			   setFieldValue( formObj.ctrb_mgn, $('ctrb_mgn',data).text());
			   setFieldValue( formObj.certi_hndl_info, $('certi_hndl_info',data).text());
			   setFieldValue( formObj.h_certi_hndl_info, $('certi_hndl_info',data).text());

			   setFieldValue( formObj.po_no, $('po_no',data).text());
			   setFieldValue( formObj.item_no, $('item_no',data).text());
			   
			   //setFieldValue( formObj.xcrtDt, $('obrd_dt_tm',data).text());
			   var obrddttm = $('obrd_dt_tm',data).text().replaceAll('-','');
			   setFieldValue( formObj.xcrtDt, obrddttm);
			   
			   setFieldValue( formObj.pre_flt_no, $('flt_no',data).text());
			   setFieldValue( formObj.pre_lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.pre_shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.pre_iss_trdp_nm, $('iss_trdp_nm',data).text());
			   setFieldValue( formObj.f_modify, $('f_modify',data).text()); //#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED

			   /*#657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL*/
			   setFieldValue( formObj.inter_use_flag, $('inter_use_flag',data).text());
			   
			   doBtnAuthority(attr_extension);
			   
			   tab1click="";
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
			   alert("System Error!");
		   }
		 });
}



//BL_COPY
function selectCopyBLFrt(){
	 openBlCopyPopUp("COPY_CONFIRM_POPUP_1",this,this);
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
			var rtFrt_copy_chk=rtnValAry[8];
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
					fnSetIBsheetInit(6);   //grid가 생성되지않았으면 생성(속도개선)
					docObjects[6].DoSearch("./AIE_BMD_0040_7GS.clt", FormQueryString(frm1) );
				}
				
				if (apFrt_copy_chk == "Y") {
					//Buying/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST08;
					fnSetIBsheetInit(7);   //grid가 생성되지않았으면 생성(속도개선)
					docObjects[7].DoSearch("./AIE_BMD_0040_8GS.clt", FormQueryString(frm1) );
				}
				
				if (dcFrt_copy_chk == "Y") {
					//Debit/Crebit List 조회
					frm1.f_cmd.value=SEARCHLIST09;
					fnSetIBsheetInit(8);   //grid가 생성되지않았으면 생성(속도개선)
					docObjects[8].DoSearch("./AIE_BMD_0040_9GS.clt", FormQueryString(frm1) );
				}
				
				if (rtFrt_copy_chk == "Y") {
					//B/L rate 조회
					frm1.f_cmd.value=SEARCHLIST05;
					fnSetIBsheetInit(2);   //grid가 생성되지않았으면 생성(속도개선)
        		    docObjects[2].DoSearch("./AIE_BMD_0040_3GS.clt", FormQueryString(frm1) );
        		    copyBlRate1 = true;
        		    frm1.f_cmd.value=SEARCHLIST06;
        		    fnSetIBsheetInit(3);   //grid가 생성되지않았으면 생성(속도개선)
        		    docObjects[3].DoSearch("./AIE_BMD_0040_4GS.clt", FormQueryString(frm1) );
        		    copyBlRate2 = true;
				}
				//#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				if (shpmt_itm_copy_chk == "Y" || mrk_des_copy_chk == "Y") {
				    frm1.f_cmd.value=COMMAND12;	
					var xml = sheet1.GetSearchData("./AIE_BMD_0040_6GS.clt",FormQueryString(frm1));		
					var xmlDoc = $.parseXML(xml);					 
					var $xml = $(xmlDoc);
 
					 if($xml.find("result").text() == "1" ){
						if(shpmt_itm_copy_chk == "Y"){
							
							isCopy = true;					
							
							formObj.cargo_tp_cd.value = $xml.find("cargo_tp_cd").text();
							formObj.pck_ut_cd.value = $xml.find("pck_ut_cd").text();
							formObj.pck_qty.value = ($xml.find("pck_qty").text() == "" ? "0": doMoneyFmt(Number($xml.find("pck_qty").text()).toFixed(0)));
							formObj.grs_wgt.value = ($xml.find("grs_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt").text()).toFixed(1)));
							formObj.grs_wgt1.value = ($xml.find("grs_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt1").text()).toFixed(1)));
							
							
							formObj.chg_wgt.value = ($xml.find("chg_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("chg_wgt").text()).toFixed(1)));
							formObj.chg_wgt1.value = ($xml.find("chg_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("chg_wgt1").text()).toFixed(1)));
							
							// #5779 [BNX-LA] Wrong gross weight value when coping from AEM AWB
							formObj.bl_grs_wgt.value = ($xml.find("bl_grs_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("bl_grs_wgt").text()).toFixed(1)));
							formObj.bl_grs_wgt1.value = ($xml.find("bl_grs_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("bl_grs_wgt1").text()).toFixed(1)));
							formObj.bl_chg_wgt.value = ($xml.find("bl_chg_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("bl_chg_wgt").text()).toFixed(1)));
							formObj.bl_chg_wgt1.value = ($xml.find("bl_chg_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("bl_chg_wgt1").text()).toFixed(1)));
							formObj.vol_wgt.value = ($xml.find("vol_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("vol_wgt").text()).toFixed(1)));
							formObj.vol_meas.value = ($xml.find("vol_meas").text() == "" ? "0": doMoneyFmt(Number($xml.find("vol_meas").text()).toFixed(6)));
							
							formObj.rep_cmdt_cd.value = $xml.find("rep_cmdt_cd").text();
							formObj.rep_cmdt_nm.value = $xml.find("rep_cmdt_nm").text();
							
							formObj.decl_crr_val.value = $xml.find("decl_crr_val").text();
							formObj.decl_cstms_val.value = $xml.find("decl_cstms_val").text();
							formObj.amt_insur_val.value = $xml.find("amt_insur_val").text();
							
							
							frm1.f_cmd.value=SEARCHLIST04;
			        		fnSetIBsheetInit(5);   //grid가 생성되지않았으면 생성(속도개선)
			        		docObjects[5].DoSearch("./AIE_BMD_0040_2GS.clt", FormQueryString(frm1) );
																								
						}						
						if(mrk_des_copy_chk == "Y"){
							formObj.mk_txt.value = $xml.find("mk_txt").text();
							formObj.desc_txt.value = $xml.find("desc_txt").text();
							formObj.certi_hndl_info.value = $xml.find("certi_hndl_info").text();
							formObj.hndl_info_txt.value = $xml.find("hndl_info_txt").text();
							formObj.acctg_info_txt.value = $xml.find("acctg_info_txt").text();	
							
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
	var opt_key = "PCK_VAL_AEM";
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

var CERTI_YN;

function setAeCertiValidityReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		CERTI_YN=doc[1];
	} else {
		CERTI_YN="";
	}
}

function setCertiHndlInfo(){
	var formObj = document.frm1;
	if(formObj.certi_hndl_info.value != ""){
		
		var certi_hndl_info = formObj.certi_hndl_info[formObj.certi_hndl_info.selectedIndex].text;
		
		if((formObj.hndl_info_txt.value).replaceAll(" ","").length == 0){
			formObj.hndl_info_txt.value = certi_hndl_info;
		}else{
			formObj.hndl_info_txt.value += "\r\n";
			formObj.hndl_info_txt.value += certi_hndl_info;
		}
	}
}

var AE_BL_HIS_UPDATE = "N";

function setAeBlHisUpdateReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]=="Y") {
			AE_BL_HIS_UPDATE = "Y";
		}
	}
}

var AE_VOL_ROUND = "A"; // 0.5 절상

function setAeVolRoundReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]=="R") {
			AE_VOL_ROUND = "R"; // 반올림
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
		for(var i=2; i<=docObjects[6].LastRow(); i++){
			docObjects[6].SetCellImage(i, "fr_att_file_1", 0);
		}
	}else if(type == "DC"){
		for(var i=2; i<=docObjects[8].LastRow(); i++){
			docObjects[8].SetCellImage(i, "dc_fr_att_file_1", 0);
		}
	}else{
		for(var i=2; i<=docObjects[7].LastRow(); i++){
			docObjects[7].SetCellImage(i, "b_fr_att_file_1", 0);
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

function getHblDimList(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	fnSetIBsheetInit(5);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			for (var i=2; i<docObjects[5].LastRow() + 1 ; i++) {		
				if (docObjects[5].GetCellValue(i, 'dim_ibflag') != 'I') {
					docObjects[5].SetCellValue(i, 'dim_ibflag', 'D');
					docObjects[5].SetRowHidden(i,1);
				} else {
					docObjects[5].RowDelete(i, false);
					i--;
				}
			}
			
			var tmpList=doc[1].split("@;;@");
 			
			for(var i=0 ; i<tmpList.length-1 ; i++){
				var dimArr=tmpList[i].split("@^^@");
				var intRows=docObjects[5].LastRow() + 1;
				gridAdd(5);
				
				docObjects[5].SetCellValue(intRows, "dim_len_dim", 	dimArr[0],0);
				docObjects[5].SetCellValue(intRows, "dim_wdt_dim", 	dimArr[1],0);
				docObjects[5].SetCellValue(intRows, "dim_hgt_dim", 	dimArr[2],0);
				docObjects[5].SetCellValue(intRows, "dim_pce_qty", 	dimArr[3],0);
				docObjects[5].SetCellValue(intRows, "dim_act_dim", 	dimArr[4],0);
				docObjects[5].SetCellValue(intRows, "dim_chg_wgt", 	dimArr[5],0);
				docObjects[5].SetCellValue(intRows, "dim_chg_wgt1",	dimArr[6],0);
				docObjects[5].SetCellValue(intRows, "dim_meas",	   	dimArr[7],0);
				docObjects[5].SetCellValue(intRows, "dim_meas1",	dimArr[8],0);
				docObjects[5].SetCellValue(intRows, "dim_pck_ut_cd",dimArr[9],0);
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
	
	docObjects[5].SetBlur();	//IBSheet Focus out 처리
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

function changeTermCd(type){
	
	var termCd = type.value;
	if(type.name == 'frt_term_cd'){
		for(var i=1; i<=docObjects[2].LastRow(); i++){
			docObjects[2].SetCellValue(i, "air_frt_term_cd", termCd);
		}
	}else if(type.name == 'otr_chg_term_cd'){
		for(var i=1; i<=docObjects[3].LastRow(); i++){
			docObjects[3].SetCellValue(i, "oth_frt_term_cd", termCd);
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



function cmdtRowAdd(){
    gridAdd(11);
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
         fnSetIBsheetInit(11);   //grid가 생성되지않았으면 생성(속도개선)
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
              docObjects[11].SetCellValue(idx, "item_sys_no",itemArr[17],0);
              idx++;
         }
    }
}


function sheet13_OnPopupClick(sheetObj, row, col) {
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


function sheet13_OnChange(sheetObj, row, col, value){
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


function sheet13_OnClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="item_cmdt_cd" || colStr=="item_shp_cmdt_cd"){
		if (sheetObj.GetCellValue(row, "item_po_cmdt_seq") == "") {
			sheetObj.SetCellEditable(row, colStr, 1);
		} else {
			sheetObj.SetCellEditable(row, colStr, 0);
		}
	}
}

function sheet13_OnKeyDown(sheetObj, row, col, keyCode) {
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


function setAemWgtCeilYn(reqVal) {
	var doc=getAjaxMsgXML(reqVal);	
	if (doc[0]=="OK" && typeof doc[1] != "undefined" && doc[1] == "Y"){
		wgtCeilYn = "Y";
	}else{
		wgtCeilYn = "N";
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