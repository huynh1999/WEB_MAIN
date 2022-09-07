/*=========================================================
*@FileName   : SEE_BMD_0500.jsp
*@FileTitle  : Carrier Booking Entry 등록
*@Description: Carrier Booking Entry 등록 및 조회
*@author     : You,Ji-Won
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
*@author     : Hoang.Pham
*@version    : 2.0 - 2014/12/25
*@since      : 2014/12/25
=========================================================*/
var cntrSmrySheet=false;
var cntrListSheet=false;
var poListSheet=false;
var frtSdSheet=false;
var frtBcSheet=false;
var frtDcSheet=false;
var show_delete_complete = "N";
var BKG_INIT_STATUS = "";
var BKG_EDIT_MODE = "";

// --------------------------------------------------------------------------------------------------------------
// Tab 설정
// --------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	frm1.f_isNumSep.value = isNumSep;
	var tabObjs = document.getElementsByName('tabLayer');
	if (isNumSep == "01") {
		currTab = isNumSep;	// 탭상태저장
		tabObjs[0].style.display = 'inline';
		tabObjs[1].style.display = 'none';
		tabObjs[2].style.display = 'none';
		tabObjs[3].style.display = 'none';
		tabObjs[4].style.display = 'none';
	} else if (isNumSep == "02") {
		currTab = isNumSep;	// 탭상태저장
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = 'inline';
		tabObjs[2].style.display = 'none';
		tabObjs[3].style.display = 'none';
		tabObjs[4].style.display = 'none';
	} else if (isNumSep == "03") {
		currTab = isNumSep;	// 탭상태저장
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = 'none';
		tabObjs[2].style.display = 'inline';
		tabObjs[3].style.display = 'none';
		tabObjs[4].style.display = 'none';
	} else if (isNumSep == "04") {
		currTab = isNumSep;	// Work Order tab
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = 'none';
		tabObjs[2].style.display = 'none';
		tabObjs[3].style.display = 'inline';
		tabObjs[4].style.display = 'none';
		
		doWork("SEARCH_WO");
		
	} else if (isNumSep == "05") {
		currTab = isNumSep;	// 탭상태저장
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = 'none';
		tabObjs[2].style.display = 'none';
		tabObjs[3].style.display = 'none';
		tabObjs[4].style.display = 'inline';
	}

	var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function () {
		if (count++ == index - 1) {
			$(this).addClass('nowTab');
		} else {
			$(this).removeClass('nowTab');
		}
	});
}

// 저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	isError = false;
	var sheetParam='';
    
    // var cntrSmryParam=docObjects[1].GetSaveString(false); //#1024 [PATENT]
	// Booking Entry 개선 및 Quotation Audit 기능 개발 (TB_BKG_CNTR제거)
    var cntrListParam=docObjects[2].GetSaveString(false);
    var poListParam=docObjects[3].GetSaveString(false);
    var frtSdListParam=docObjects[4].GetSaveString(false);
    var frtBcListParam=docObjects[6].GetSaveString(false);
    var frtDcListParam=docObjects[5].GetSaveString(false);
    
    /*
	 * //#1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발 (TB_BKG_CNTR제거)
	 * if(cntrSmryParam!=''){ sheetParam+= '&'; sheetParam+= cntrSmryParam;
	 * cntrSmrySheet=true; }
	 */
    
    if(cntrListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= cntrListParam;
    	cntrListSheet=true;
    } 
    
    if(poListParam!=''){
    	sheetParam+= '&';
    	sheetParam+= poListParam;
    	poListSheet=true;
    }  
    
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
    
    if(frtDcListParam!=''){
		var rtnFlg=frCheckInpuVals(docObjects[5], 'dc_');
		if(rtnFlg=='IV'){
    		isError=true;
    	}
		frtDcListParam=docObjects[5].GetSaveString(false);
		sheetParam+= '&';
		sheetParam+= frtDcListParam;
		frtDcSheet=true;
	}
    
	if (isError == true) {
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
        
        	case "NEW":	// NEW
        		// #2084 - [PATENT] NEW 버튼 Confirm 메시지 추가
        		if(confirm(getLabel('FMS_COM_CFMNEW'))){
	        		doShowProcess();
	        		var currLocUrl=this.location.href;
					currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
					currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
					window.location.href = currLocUrl;
        		}
				break;
				
        	case "CREATEMBL":
        		
        		if(!chkBkgModiTms(srcName)){
     	     	   return;
     	     	}
        		
        		ajaxSendPost(createMBL, 'reqVal', '&goWhere=aj&bcKey=getCheckBlCreate&bkg_seq='+frm1.bkg_seq.value+'&biz_clss_cd='+ frm1.biz_clss_cd.value, './GateServlet.gsl');
    			break;
    			
        	case "ADD":	// 등록
	        case "MODIFY":	// 등록
	        	if(!checkRfCntrUnit()){ //#3520
		        	checkBoxSave();
		        	if(frm1.bkg_seq.value == ''){
		    			doWork('SAVE_ADD');
		    		}else{
		    			doWork('SAVE_MODIFY');
		    		}
	        	}
	            break;
	            
        	case "SAVE_ADD":	// 등록
        		frm1.f_cmd.value=ADD;
               	if(bkgCheckInpuVals()){
               		/*
					 * if(!etdRangeOk){ //[Warning] ETD is outside range of 6
					 * months from today. \nPlease kindly check ETD again.
					 * alert(getLabel('FMS_COM_ALT021')); }
					 */
               		
               		if(frm1.bkg_no.value == "AUTO"){
               			frm1.bkg_no.value="";
               		}
               		
               		// Booking No. 중복 체크
               		ajaxSendPost(getBkgCheck, 'reqVal', '&goWhere=aj&bcKey=getBkgCheck&f_bkg_no='+frm1.bkg_no.value +'&f_biz_clss_cd='+ frm1.biz_clss_cd.value, './GateServlet.gsl');
               	}
               	break;
        		
           case "SAVE_MODIFY":	// 등록
        	   
        	   if(!chkBkgModiTms(srcName)){
     	     	   return;
     	     	}
        	   
        	   ajaxSendPost(checkMblModifyReq, 'reqVal', '&goWhere=aj&bcKey=getCheckBlCreate&bkg_seq='+frm1.bkg_seq.value+'&biz_clss_cd='+ frm1.biz_clss_cd.value, './GateServlet.gsl');
               break;
               
           case "REMOVE":// 삭제
        	   
        	   if(!chkBkgModiTms(srcName)){
     	     	   return;
     	     	}
        	   
        	   ajaxSendPost(checkMblRemoveReq, 'reqVal', '&goWhere=aj&bcKey=getCheckBlCreate&bkg_seq='+frm1.bkg_seq.value+'&biz_clss_cd='+ frm1.biz_clss_cd.value, './GateServlet.gsl');
    		   break;
    		   
           case "READY": // READY
        	   
        	   if(!chkBkgModiTms(srcName)){
     	     	   return;
     	     	}
        	   
        	   frm1.f_cmd.value=COMMAND01;
        	   if(confirm(getLabel('FMS_COM_CFMSAV'))){        				   
           	    	gridAdd(0);
              	    docObjects[0].SetCellValue(1, 1, 1);
              	    
              	    var sndParam=getSndParam();
              	    if(sndParam == true)	{	return false;	}	  
    				doShowProcess();
        				
    				docObjects[0].DoAllSave("./SEE_BMD_0500GS.clt", FormQueryString(frm1)+sndParam, false);
        	   }
    		   break;
    		   
           case "REJECT": // REJECT
        	   
        	   if(!chkBkgModiTms(srcName)){
     	     	   return;
     	     	}
        	   
        	   rtnary=new Array(1);
        	   rtnary[0] = frm1.bkg_seq.value;
        	   rtnary[1] = "RJ";
	   		   callBackFunc = "POPUP_REJECT_CANCEL";
			   modal_center_open('./CMM_POP_0290.clt', rtnary, 400,280,"yes");
        	   
        	   /*
				 * frm1.f_cmd.value=COMMAND04; if(frm1.rsn_txt.value == ""){
				 * alert(getLabel('FMS_COM_ALT001') + "\n - " +
				 * getLabel('INTER_RMK')); goTabSelect("01");
				 * frm1.rsn_txt.focus(); return; }
				 * if(confirm(getLabel('FMS_COM_CFMSAV'))){ gridAdd(0);
				 * docObjects[0].SetCellValue(1, 1, 1);
				 * 
				 * var sndParam=getSndParam(); if(sndParam == true) { return
				 * false; } doShowProcess();
				 * 
				 * docObjects[0].DoAllSave("./SEE_BMD_0500GS.clt",
				 * FormQueryString(frm1)+sndParam, false); }
				 */
    		   break;
    		   
           case "CONFIRM": // CONFIRM
        	   
        	   if(!chkBkgModiTms(srcName)){
     	     	   return;
     	     	}
        	   
        	   frm1.f_cmd.value=COMMAND02;
        	   if(confirm(getLabel('FMS_COM_CFMSAV'))){        				   
          	    	gridAdd(0);
             	    docObjects[0].SetCellValue(1, 1, 1);
             	    
             	    var sndParam=getSndParam();
             	    if(sndParam == true)	{	return false;	}	  
             	    doShowProcess();
       				
             	    docObjects[0].DoAllSave("./SEE_BMD_0500GS.clt", FormQueryString(frm1)+sndParam, false);
        	   }
    		   break;
    		   
           case "CANCEL": // CANCEL
        	   
        	   if(!chkBkgModiTms(srcName)){
     	     	   return;
     	       }
        	   
        	   rtnary=new Array(1);
        	   rtnary[0] = frm1.bkg_seq.value;
        	   rtnary[1] = "CN";
	   		   callBackFunc = "POPUP_REJECT_CANCEL";
			   modal_center_open('./CMM_POP_0290.clt', rtnary, 400,280,"yes");
        	   
        	   /*
				 * frm1.f_cmd.value=COMMAND03; if(frm1.rsn_txt.value == ""){
				 * alert(getLabel('FMS_COM_ALT001') + "\n - " +
				 * getLabel('INTER_RMK')); frm1.rsn_txt.focus(); return; }
				 * if(confirm(getLabel('FMS_COM_CFMSAV'))){ gridAdd(0);
				 * docObjects[0].SetCellValue(1, 1, 1);
				 * 
				 * var sndParam=getSndParam(); if(sndParam == true) { return
				 * false; } doShowProcess();
				 * 
				 * docObjects[0].DoAllSave("./SEE_BMD_0500GS.clt",
				 * FormQueryString(frm1)+sndParam, false); }
				 */
    		   break;
    		   
           case "SEARCHLIST":	// 조회
        	   frm1.f_bkg_no.value=trim(frm1.f_bkg_no.value);
        	   frm1.f_lnr_bkg_no.value=trim(frm1.f_lnr_bkg_no.value);
        	   if(frm1.f_bkg_no.value == '' && frm1.f_lnr_bkg_no.value == ''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_bkg_no.focus();
        		   return;
        	   }else{
        		   if(frm1.f_bkg_no.value != '' || frm1.f_lnr_bkg_no.value != ''){
        			   frm1.f_bkg_seq.value = '';
        		   }
        	   }
        	   /*
				 * if(frm1.f_lnr_bkg_no.value==''){
				 * alert(getLabel('FMS_COM_ALT014')); frm1.f_lnr_bkg_no.focus();
				 * return; } else{ if(frm1.f_lnr_bkg_no.value!=''){
				 * frm1.f_bkg_seq.value=''; }
				 * 
				 * frm1.f_cmd.value=SEARCHLIST; submitForm(SEARCHLIST); }
				 */
        	   
        	    frm1.c_create.value ='';  // #1024 [PATENT] Booking Entry 개선 및
											// Quotation Audit 기능 개발
        	    frm1.c_bkg_seq.value='';	
        
        		frm1.f_cmd.value=SEARCHLIST;
        		submitForm(SEARCHLIST);
        	   break;
        	
           case "SEARCH_CNTR": // CNTR 조회
   			   frm1.f_cmd.value = SEARCHLIST01;
   			   docObjects[1].DoSearch("./SEE_BMD_0500_1GS.clt", FormQueryString(frm1));
   			   break;
   			   
           case "SEARCH_CNTR_LIST": // CNTR LIST 조회
   			   frm1.f_cmd.value = SEARCHLIST02;
   			   docObjects[2].DoSearch("./SEE_BMD_0500_2GS.clt", FormQueryString(frm1));
   			   break;
   			   
           case "SEARCH_PO":	// PO 조회
        	   frm1.f_cmd.value=SEARCHLIST03;
        	   docObjects[3].DoSearch("./SEE_BMD_0500_3GS.clt", FormQueryString(frm1) );
        	   break;
        	   
           case "SEARCH_FRT":	// Freight 조회
        	   searchGrid(4);
        	   searchGrid(1);
        	   searchGrid(2);
        	   searchGrid(3);
        	   break;
        	   
           case "SEARCH_HIS":	// Booking Status History 조회
        	   frm1.f_cmd.value=SEARCHLIST07;
        	   docObjects[7].DoSearch("./SEE_BMD_0500_7GS.clt", FormQueryString(frm1) );
        	   break;
        	   
           case "COPY":	// 조회
        	   if(confirm(getLabel('FMS_COM_CFMCPY'))){
                   frm1.f_cmd.value=COMMAND05;
                   submitForm(COMMAND05);
        	   }
        	   
        	   break;
        	   
           case "PO_ADD":
        	   // gridAdd(1);
        	   var formObj=document.frm1;
        	   rtnary=new Array(8);
        	   // rtnary[0]=formObj.cnee_trdp_cd.value;
        	   // rtnary[1]=formObj.cnee_trdp_nm.value;
        	   
        	   // 2016.01.29 yjw "P/O & Item Search" Popup 열때 Customer에 세팅되는
				// 데이터를 Consignee에서 Customer로 변경
        	   /*
				 * rtnary[0]=formObj.cnee_trdp_cd.value;
				 * rtnary[1]=formObj.cnee_trdp_nm.value;
				 * rtnary[2]=formObj.shpr_trdp_cd.value;
				 * rtnary[3]=formObj.shpr_trdp_nm.value;
				 */
        	   
        	   // rtnary[4]=formObj.por_cd.value;
        	   // rtnary[5]=formObj.por_nm.value;
        	   // rtnary[6]=formObj.del_cd.value;
        	   // rtnary[7]=formObj.del_nm.value;
				
        	   callBackFunc = "PO_POPLIST";
        	   modal_center_open('./CMM_POP_0500.clt', rtnary, 1300,500,"yes");
        	   break;
       		
           case "PRINT":
        	   var formObj=document.frm1;
        	   if(formObj.bkg_seq.value == ""){
        		   alert(getLabel('FMS_COM_ALT004'));
        		   return;
        	   }
        	   formObj.file_name.value='booking_confirmation_02.mrd';
        	   formObj.title.value='Booking Confirmation';
        	   // Parameter Setting
        	   var param='';
        	   param += '[' + formObj.bkg_seq.value + ']'; // $1
        	   param += '[' + v_ofc_eng_nm + ']';		// 2
        	   param += '[' + v_eml + ']';		// 3
        	   param += '[' + v_ofc_cd + ']';	// 4
        	   param += '[' + v_phn + ']';		// 5
        	   param += '[' + v_fax + ']';		// 6
        	   // #24658 [GPL] Arrival Notice에다 "Place of Receipt" 추가
        	   if (prn_ofc_cd == "GPL") {
        		   param += '[]';								// 7
        		   param += '[Y]';								// 8
        	   } else {
        		   param += '[]';								// 7
        		   param += '[N]';								// 8
        	   }
        	   formObj.rd_param.value=param;
        	   formObj.bkg_seq.value=formObj.bkg_seq.value;
        	   formObj.rpt_trdp_cd.value=formObj.shpr_trdp_cd.value;
        	   formObj.rpt_biz_tp.value="OEH";
        	   formObj.rpt_biz_sub_tp.value="BC";
        	   popPOST(formObj, 'RPT_RD_0010.clt', 'popB_Confirm', 1025, 740);			
        	   break; 
           case "SEARCH_CNTR_LIST_COPY": // CNTR LIST 조회 #1024 [PATENT]
											// Booking Entry 개선 및 Quotation
											// Audit 기능 개발
   			   frm1.f_cmd.value = SEARCHLIST09;
   			   docObjects[2].DoSearch("./SEE_BMD_0500_2GS.clt", FormQueryString(frm1));
   			   break;      
           case "SEARCH_PO_COPY":	// PO 조회 #1024 [PATENT] Booking Entry 개선 및
									// Quotation Audit 기능 개발
        	   frm1.f_cmd.value=SEARCHLIST10;
        	   docObjects[3].DoSearch("./SEE_BMD_0500_3GS.clt", FormQueryString(frm1) );
        	   break;           	   
        
           case "WORKORDER":
	               var paramStr="./AIC_WOM_0022.clt?air_sea_clss_cd=S&bnd_clss_cd=O&biz_clss_cd=CA";
 	               var param = "&f_cmd=" + SEARCH02;
 	               param += "&bkg_seq=" + frm1.bkg_seq.value;
 	               parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
        	   break;
        	   
           case "PROFIT_REPORT":
        	   var formObj=document.frm1;
        	   var reqParam='?bkg_seq=' + formObj.bkg_seq.value;
        	   reqParam += '&bkg_no=' + formObj.bkg_no.value;
        	   reqParam += '&biz_clss_cd=' + "M";
        	   reqParam += '&entry_yn=' + "Y";
        	   popGET('RPT_PRN_0260.clt'+reqParam, '', 1000, 700, "scroll:yes;status:no;help:no;");
        	   break;
        	   
           case "SEARCH_WO":	// PO 조회
        	   // booking Seq가 있으면, 저장된 상태이므로, PO가 있는지 조회
        	   if(frm1.bkg_seq.value){
        		   searchGrid(5);
        	   }
        	   break;      
 
	   	 	case "BKG_EDI_POP":	// BKG EDI 전송
	    		var reqParam = '?&lnr_trdp_cd='+encodeURIComponent(frm1.lnr_trdp_cd.value, "lnr_trdp_cd") 
		 			   + '&trnk_vsl_nm='+encodeURIComponent(frm1.trnk_vsl_nm.value, "trnk_vsl_nm")
		 		       + '&trnk_voy='+encodeURIComponent(frm1.trnk_voy.value, "trnk_voy")
		 		       + '&lnr_trdp_nm='+encodeURIComponent(frm1.lnr_trdp_nm.value, "lnr_trdp_nm");
	    		
	   	   		popGET('./EDI_BKG_0010.clt'+reqParam, 'EdiBkgEDIList', 600, 500, "scroll:no;status:no;help:no;");
	   	   		break;	        	   
        	   
        
        }
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

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_bkg_no.value = getParam(url,"f_bkg_no");
	formObj.f_bkg_seq.value = getParam(url,"f_bkg_seq");
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
	
	if(cmd == 15){ // copy
		formObj.c_bkg_seq.value=formObj.bkg_seq.value;
		formObj.c_create.value='C';
	}
	
	$.ajax({
		   type: "POST",
		   url: "./SEE_BMD_0500AJ.clt",
		   dataType: 'xml',
		   data: $(formObj).serialize(),
		   success: function(data){
			   setFieldValue( formObj.f_bkg_no, $('f_bkg_no',data).text());
			   setFieldValue( formObj.f_bkg_seq, $('f_bkg_seq',data).text());
			   setFieldValue( formObj.f_lnr_bkg_no, $('f_lnr_bkg_no',data).text());
			   setFieldValue( formObj.bkg_sts_cd, $('bkg_sts_cd',data).text());
			   setFieldValue( formObj.h_bkg_sts_cd, $('bkg_sts_cd',data).text());
			   setFieldValue( formObj.bkg_seq, $('bkg_seq',data).text());
			   setFieldValue( formObj.bkg_no, $('bkg_no',data).text());
			   setFieldValue( formObj.h_bkg_no, $('bkg_no',data).text());
			   setFieldValue( formObj.lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.h_lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.bkg_dt_tm, $('bkg_dt_tm',data).text());
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
			   setFieldValue( formObj.shpr_pic_nm, $('shpr_pic_nm',data).text());
			   setFieldValue( formObj.shpr_pic_phn, $('shpr_pic_phn',data).text());
			   // setFieldValue( formObj.cust_ref_no,
				// $('cust_ref_no',data).text()); #1024 [PATENT] Booking Entry
				// 개선 및 Quotation Audit 기능 개발
			   
			   //#4899 ** [Binex] Carrier Booking Entry to have Customer Ref. No., Export References No., Agent Ref. No.
			   if(formObj.c_create.value=='C') {//Carrier Booking copy시에 제외
				   setFieldValue( formObj.cust_ref_no, '');
				   setFieldValue( formObj.exp_ref_no, '');
				   setFieldValue( formObj.prnr_ref_no, '');
			   }else{
				   setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
				   setFieldValue( formObj.exp_ref_no, $('exp_ref_no',data).text());
				   setFieldValue( formObj.prnr_ref_no, $('prnr_ref_no',data).text());
			   }
			   
			   setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
			   setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
			   setFieldValue( formObj.cnee_pic_nm, $('cnee_pic_nm',data).text());
			   setFieldValue( formObj.cnee_pic_phn, $('cnee_pic_phn',data).text());
			   setFieldValue( formObj.ntfy_trdp_cd, $('ntfy_trdp_cd',data).text());
			   setFieldValue( formObj.ntfy_trdp_nm, $('ntfy_trdp_nm',data).text());
			   setFieldValue( formObj.ntfy_trdp_addr, $('ntfy_trdp_addr',data).text());
			   setFieldValue( formObj.ntfy_pic_nm, $('ntfy_pic_nm',data).text());
			   setFieldValue( formObj.ntfy_pic_phn, $('ntfy_pic_phn',data).text());
			   setFieldValue( formObj.carr_trdp_cd, $('carr_trdp_cd',data).text());
			   setFieldValue( formObj.carr_trdp_nm, $('carr_trdp_nm',data).text());
			   setFieldValue( formObj.carr_trdp_addr, $('carr_trdp_addr',data).text());
			   setFieldValue( formObj.lnr_ctrt_no, $('lnr_ctrt_no',data).text());
			   setFieldValue( formObj.fwrd_agn_trdp_cd, $('fwrd_agn_trdp_cd',data).text());
			   setFieldValue( formObj.fwrd_agn_trdp_nm, $('fwrd_agn_trdp_nm',data).text());
			   setFieldValue( formObj.fwrd_agn_trdp_addr, $('fwrd_agn_trdp_addr',data).text());
			   setFieldValue( formObj.prnr_trdp_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.prnr_trdp_nm, $('prnr_trdp_nm',data).text());
			   setFieldValue( formObj.prnr_trdp_addr, $('prnr_trdp_addr',data).text());
			   setFieldValue( formObj.trnk_vsl_cd, $('trnk_vsl_cd',data).text());
			   setFieldValue( formObj.trnk_vsl_nm, $('trnk_vsl_nm',data).text());
			   setFieldValue( formObj.trnk_voy, $('trnk_voy',data).text());
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
			   setFieldValue( formObj.etd_por_tm, $('etd_por_tm',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   // setFieldValue( formObj.eta_del_dt_tm,
				// $('eta_del_dt_tm',data).text()); //#1024 [PATENT] Booking
				// Entry 개선 및 Quotation Audit 기능 개발
			   // setFieldValue( formObj.eta_fnl_dest_dt_tm,
				// $('eta_fnl_dest_dt_tm',data).text()); //#1024 [PATENT]
				// Booking Entry 개선 및 Quotation Audit 기능 개발
			   setFieldValue( formObj.rep_cmdt_cd, $('rep_cmdt_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.frt_term_cd, $('frt_term_cd',data).text());
			   setFieldValue( formObj.h_frt_term_cd, $('frt_term_cd',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.h_pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.meas, $('meas',data).text());
			   setFieldValue( formObj.meas1, $('meas1',data).text());

			   setFieldValue( formObj.iss_loc_cd, $('iss_loc_cd',data).text());
			   setFieldValue( formObj.iss_loc_nm, $('iss_loc_nm',data).text());
			   setFieldValue( formObj.org_bl_qty, $('org_bl_qty',data).text());
		   
			   setFieldValue( formObj.fm_svc_term_cd, $('fm_svc_term_cd',data).text());
			   setFieldValue( formObj.to_svc_term_cd, $('to_svc_term_cd',data).text());
			   setFieldValue( formObj.h_fm_svc_term_cd, $('fm_svc_term_cd',data).text());
			   setFieldValue( formObj.h_to_svc_term_cd, $('to_svc_term_cd',data).text());
			   setFieldValue( formObj.cargo_tp_cd, $('cargo_tp_cd',data).text());
			   setFieldValue( formObj.h_cargo_tp_cd, $('cargo_tp_cd',data).text());
			   setFieldValue( formObj.cntr_info, $('cntr_info',data).text());
			   setFieldValue( formObj.rgst_usrid, $('rgst_usrid',data).text());
			   setFieldValue( formObj.modi_usrid, $('modi_usrid',data).text()); 
			   setFieldValue( formObj.svc_lane_nm, $('svc_lane_nm',data).text()); // #943
																					// [PATENT]
																					// Lane
																					// 및
																					// Port
																					// Cut-off
																					// time
																					// 추가
			   
			   var t_rgst_tms = $('rgst_tms',data).text();
			   /*
				 * if(t_rgst_tms != ""){ t_rgst_tms =
				 * t_rgst_tms.substring(0,2)+"-"+ t_rgst_tms.substring(2,4)+"-"+
				 * t_rgst_tms.substring(4,8) + " " + t_rgst_tms.substring(8,10) +
				 * ":" + t_rgst_tms.substring(10,12) + ":" +
				 * t_rgst_tms.substring(12,14); }
				 */
			   setFieldValue( formObj.rgst_tms, t_rgst_tms);
			   setFieldValue( formObj.cstms_tp_cd, $('cstms_tp_cd',data).text());	
			   var t_modi_tms = $('modi_tms',data).text();
			   /*
				 * if(t_modi_tms != ""){ t_modi_tms =
				 * t_modi_tms.substring(0,2)+"-"+ t_modi_tms.substring(2,4)+"-"+
				 * t_modi_tms.substring(4,8) + " " + t_modi_tms.substring(8,10) +
				 * ":" + t_modi_tms.substring(10,12) + ":" +
				 * t_modi_tms.substring(12,14); }
				 */
			   setFieldValue( formObj.modi_tms, t_modi_tms);
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   setFieldValue( formObj.rsn_txt, $('rsn_txt',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   
			   // #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발
			   setFieldValue( formObj.hbl_tp_cd, $('hbl_tp_cd',data).text());
			   setFieldValue( formObj.shp_mod_cd, $('shp_mod_cd',data).text());
			   setFieldValue( formObj.nomi_flg, $('nomi_flg',data).text());
			   setFieldValue( formObj.ref_no, $('ref_no',data).text());

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
			   
			   setFieldValue( formObj.pu_trdp_cd, $('pu_trdp_cd',data).text());
			   setFieldValue( formObj.pu_trdp_nm, $('pu_trdp_nm',data).text());
			   setFieldValue( formObj.rcv_wh_cd, $('rcv_wh_cd',data).text());
			   setFieldValue( formObj.rcv_wh_nm, $('rcv_wh_nm',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   
			   setFieldValue( formObj.act_shpr_trdp_cd, $('act_shpr_trdp_cd',data).text());
			   setFieldValue( formObj.act_shpr_trdp_nm, $('act_shpr_trdp_nm',data).text());

			   
			   
			   setFieldValue( formObj.obl_tp_cd, $('obl_tp_cd',data).text());
			   setFieldValue( formObj.asgn_usrid, $('asgn_usrid',data).text());
			   setFieldValue( formObj.cstms_cut_off_dt, $('cstms_cut_off_dt',data).text());
			   setFieldValue( formObj.cstms_cut_off_tm, $('cstms_cut_off_tm',data).text());
			   setFieldValue( formObj.trkg_svc_flg, $('trkg_svc_flg',data).text());
			   setFieldValue( formObj.cstms_svc_flg, $('cstms_svc_flg',data).text());
			   setFieldValue( formObj.inter_rmk_txt, $('inter_rmk_txt',data).text());	
			   
			   //Carrier Booking copy시에 Package, Weight, Measurement 항목 값 복사 제외
			   if(formObj.c_create.value=='C') {
				   setFieldValue( formObj.pck_qty, '');
				   setFieldValue( formObj.pck_ut_cd, '');
				   setFieldValue( formObj.grs_wgt, '');
				   setFieldValue( formObj.grs_wgt1, '');
				   setFieldValue( formObj.meas, '');
				   setFieldValue( formObj.meas1, '');
				   
				   //copy시에 bkg no가 상단에 표시되지 않도록
				   setTabTitle('');
			   }	
			   doBtnAuthority(attr_extension);
			   loadPage();
			   btnLoad();
			   loadData();
			   doHideProcess();
	   
			   
			   if(show_delete_complete == "Y"){
				   showCompleteProcess();
				   show_delete_complete = "N";
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

function checkMblModifyReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		
		//#3523 [BINEX] Carrier Booking으로 MBL Create 이후에도 Carrier Booking 수정할 수 있도록 변경
		//if(doc[1]=='Y'){
		if(false){
			// Cannot modify because MB/L was Created!
			alert(getLabel('FMS_COM_ALT093'));
		} else{
			frm1.f_cmd.value=MODIFY;
			if(bkgCheckInpuVals()){
				/*
				 * if(!etdRangeOk){ //[Warning] ETD is outside range of 6 months
				 * from today. \nPlease kindly check ETD again.
				 * alert(getLabel('FMS_COM_ALT021')); }
				 */
				
				if(frm1.bkg_no.value=="AUTO"){
          			frm1.bkg_no.value="";
				}
				
				frm1.lnr_bkg_no.value = trim(frm1.lnr_bkg_no.value);
				
				if(frm1.h_bkg_no.value!=frm1.bkg_no.value){
          			ajaxSendPost(getBkgCheckModify, 'reqVal', '&goWhere=aj&bcKey=getBkgCheck&f_bkg_no='+frm1.bkg_no.value +'&f_biz_clss_cd='+ frm1.biz_clss_cd.value, './GateServlet.gsl');
    		   } else {
	   				if(frm1.lnr_bkg_no.value == ""){
	   					if(confirm(getLabel(saveMsg))){        				   
                    	    gridAdd(0);
	                   	    docObjects[0].SetCellValue(1, 1,1);
	                   	    frm1.f_lnr_bkg_no.value = frm1.lnr_bkg_no.value;
	                   	    
	                   	    var sndParam=getSndParam();
    	        		    if(sndParam == true)	{	return false;	}	  
    	        		    // calculatorCntr();
    	        		    calculatorCntr_list(); // #1024 [PATENT] Booking
													// Entry 개선 및 Quotation
													// Audit 기능 개발
													// (TB_BKG_CNTR제거)
             				doShowProcess();
	             				
             				docObjects[0].DoAllSave("./SEE_BMD_0500GS.clt", FormQueryString(frm1)+sndParam, false);
             			}
	   				}else{
	   					if(frm1.h_lnr_bkg_no.value!=frm1.lnr_bkg_no.value){
	                 			ajaxSendPost(getLnrBkgCheckModify, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgCheck&f_lnr_bkg_no='+frm1.lnr_bkg_no.value +'&f_biz_clss_cd='+ frm1.biz_clss_cd.value, './GateServlet.gsl');
	           		   } else {
	           			   if(confirm(getLabel(saveMsg))){        				   
                        	    gridAdd(0);
                        	    docObjects[0].SetCellValue(1, 1,1);
                        	    frm1.f_lnr_bkg_no.value = frm1.lnr_bkg_no.value;
                       	    
                        	    var sndParam=getSndParam();
        	        		    if(sndParam == true)	{	return false;	}	  
        	        		    // calculatorCntr();
        	        		    calculatorCntr_list();// #1024 [PATENT]
														// Booking Entry 개선 및
														// Quotation Audit 기능 개발
														// (TB_BKG_CNTR제거)
                 				doShowProcess();
                 				
                 				docObjects[0].DoAllSave("./SEE_BMD_0500GS.clt", FormQueryString(frm1)+sndParam, false);
                 			}
                 		}
	   				}
    		   	}
            }
		}
	}
}

function checkMblRemoveReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			// Cannot delete because MB/L was Created!
			alert(getLabel('FMS_COM_ALT092'));
		}
		else{
			if(confirm(getLabel('FMS_COM_CFMDEL'))){
                frm1.f_cmd.value=REMOVE;
                show_delete_complete = "Y";
                submitForm(REMOVE);
     	   }
		}
	}
}

function getBkgCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bkg_no.value!=''){
				/*
				 * 2012.02.24 중복되면 저장 수행 안함
				 */
				// Duplicated Data!
				alert(getLabel('FMS_COM_ALT008'));
				frm1.bkg_no.focus();
			}else{
				frm1.lnr_bkg_no.value = trim(frm1.lnr_bkg_no.value);
        		
        		if(frm1.lnr_bkg_no.value == ""){
        			// 'Do you want to save HB/L?')){
    				if(confirm(getLabel(saveMsg))){
    					gridAdd(0);
    					docObjects[0].SetCellValue(1, 1,1);
    					var sndParam=getSndParam();
                	   
    					if(sndParam == true)	{	return false;	}
    					// calculatorCntr();
    					calculatorCntr_list();// #1024 [PATENT] Booking Entry
												// 개선 및 Quotation Audit 기능 개발
												// (TB_BKG_CNTR제거)
    					doShowProcess();
                	   
    					docObjects[0].DoAllSave("./SEE_BMD_0500GS.clt", FormQueryString(frm1)+sndParam, false);
            	    }
        		}else{
        			ajaxSendPost(getLnrBkgCheck, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgCheck&f_lnr_bkg_no='+frm1.lnr_bkg_no.value +'&f_biz_clss_cd='+ frm1.biz_clss_cd.value, './GateServlet.gsl');
        		}
			}
		}
	}else{
		// alert(getLabel('SEE_BMD_MSG43'));
	}
}

function getLnrBkgCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			
			//Carrier Bkg.No 중복 체크 validation 제거
			if(doc[1]=='DP' && frm1.lnr_bkg_no.value!=''){
				
				 //* 2012.02.24 중복되면 저장 수행 안함
				 
				// Duplicated Data!
				alert(getLabel('FMS_COM_ALT008'));
				frm1.lnr_bkg_no.focus();
			}else{
			
			
	    	    // 'Do you want to save HB/L?')){
				if(confirm(getLabel(saveMsg))){
	    		   gridAdd(0);
            	   docObjects[0].SetCellValue(1, 1,1);
            	   var sndParam=getSndParam();
            	   
        		   if(sndParam == true)	{	return false;	}
        		   // calculatorCntr();
        		   calculatorCntr_list();// #1024 [PATENT] Booking Entry 개선 및
											// Quotation Audit 기능 개발
											// (TB_BKG_CNTR제거)
            	   doShowProcess();
            	   
            	   docObjects[0].DoAllSave("./SEE_BMD_0500GS.clt", FormQueryString(frm1)+sndParam, false);
        	    }
			}
		}
	}else{
		 alert(getLabel('SEE_BMD_MSG43'));
	}
}

function getBkgCheckModify(reqVal){	
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bkg_no.value!=''){
				/*
				 * 2012.02.24 중복되면 저장 수행 안함
				 */
				// Duplicated Data!
				alert(getLabel('FMS_COM_ALT008'));
				frm1.bkg_no.focus();
			}else{
			    // BL No. 가 없을 경우
 			    // The [HB/L No.] is Blank. Generate the Number? Yes/No. Yes 일
				// 경우 Save 진행
 			    var blNullChk=true;
       		    if(frm1.bkg_no.value == ""){
       			    blNullChk=confirm(getLabel('SEA_COM_ALT032'));
       		    }
       		    if(blNullChk){
       		    	if(frm1.lnr_bkg_no.value == ""){
	   					if(confirm(getLabel(saveMsg))){        				   
                    	    gridAdd(0);
	                   	    docObjects[0].SetCellValue(1, 1,1);
	                   	    frm1.f_lnr_bkg_no.value = frm1.lnr_bkg_no.value;
	                   	    
	                   	    var sndParam=getSndParam();
    	        		    if(sndParam == true)	{	return false;	}	  
    	        		    // calculatorCntr();
    	        		    calculatorCntr_list();// #1024 [PATENT] Booking
													// Entry 개선 및 Quotation
													// Audit 기능 개발
													// (TB_BKG_CNTR제거)
             				doShowProcess();
	             				
             				docObjects[0].DoAllSave("./SEE_BMD_0500GS.clt", FormQueryString(frm1)+sndParam, false);
             			}
	   				}else{
	   					if(frm1.h_lnr_bkg_no.value!=frm1.lnr_bkg_no.value){
                 			ajaxSendPost(getLnrBkgCheckModify, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgCheck&f_lnr_bkg_no='+frm1.lnr_bkg_no.value +'&f_biz_clss_cd='+ frm1.biz_clss_cd.value, './GateServlet.gsl');
	           		   } else {
	           			   if(confirm(getLabel(saveMsg))){        				   
                        	    gridAdd(0);
                        	    docObjects[0].SetCellValue(1, 1,1);
                        	    frm1.f_lnr_bkg_no.value = frm1.lnr_bkg_no.value;
                       	    
                        	    var sndParam=getSndParam();
        	        		    if(sndParam == true)	{	return false;	}	  
        	        		    // calculatorCntr();
        	        		    calculatorCntr_list();// #1024 [PATENT]
														// Booking Entry 개선 및
														// Quotation Audit 기능 개발
														// (TB_BKG_CNTR제거)
                 				doShowProcess();
                 				
                 				docObjects[0].DoAllSave("./SEE_BMD_0500GS.clt", FormQueryString(frm1)+sndParam, false);
                 			}
                 		}
	   				}
		    	}	
			}
		}
	}else{
		// alert(getLabel('SEE_BMD_MSG43'));
	}
}

function getLnrBkgCheckModify(reqVal){	
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			//Carrier Booking 중복체크 제거 
			//#3551 [BINEX] YANG MING CARRIER BOOKING 315 UPDATE 안됨 - Carrier Booking 중복 체크 추가
			if(doc[1]=='DP' && frm1.lnr_bkg_no.value!=''){
				
				 //* 2012.02.24 중복되면 저장 수행 안함
				 
				// Duplicated Data!
				alert(getLabel('FMS_COM_ALT008'));
				frm1.lnr_bkg_no.focus();
			}else{
			    // 'Do you want to save HB/L?')){
				if(confirm(getLabel(saveMsg))){
	    		   gridAdd(0);
            	   docObjects[0].SetCellValue(1, 1,1);
            	   var sndParam=getSndParam();
        		   if(sndParam == true)	{	return false;	}	 
        		   // calculatorCntr();
        		   calculatorCntr_list();// #1024 [PATENT] Booking Entry 개선 및
											// Quotation Audit 기능 개발
											// (TB_BKG_CNTR제거)
            	   doShowProcess();
            	   
            	   docObjects[0].DoAllSave("./SEE_BMD_0500GS.clt", FormQueryString(frm1)+sndParam, false);
        	    }
			}
		}
	}else{
		// alert(getLabel('SEE_BMD_MSG43'));
	}
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	// #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발
	// carrier booking 생성(coustomer booking copy) 초기화
	// Copy Flag 초기화
	frm1.c_create.value='';	
	frm1.c_bkg_seq.value='';	
	
	if(errMsg==''&&frm1.bkg_seq.value==''){
		frm1.f_bkg_no.value=docObjects[0].GetCellValue(1, "sv_bkg_no");
		frm1.f_bkg_seq.value=docObjects[0].GetCellValue(1, "sv_bkg_seq");
		frm1.f_lnr_bkg_no.value=docObjects[0].GetCellValue(1, "sv_lnr_bkg_no");
		frm1.bkg_no.value=docObjects[0].GetCellValue(1, "sv_bkg_no");
		frm1.bkg_seq.value=docObjects[0].GetCellValue(1, "sv_bkg_seq");
		frm1.lnr_bkg_no.value=docObjects[0].GetCellValue(1, "sv_lnr_bkg_no");
		frm1.h_bkg_no.value=frm1.bkg_no.value;
		frm1.h_lnr_bkg_no.value=frm1.lnr_bkg_no.value;
	}
	frm1.bkg_no.value=docObjects[0].GetCellValue(1, "sv_bkg_no");
	frm1.lnr_bkg_no.value=docObjects[0].GetCellValue(1, "sv_lnr_bkg_no");
	frm1.bkg_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bkg_sts_cd");
	frm1.rsn_txt.value=docObjects[0].GetCellValue(1, "sv_rsn_txt");
	
	frm1.h_lnr_bkg_no.value=frm1.lnr_bkg_no.value;
	frm1.f_lnr_bkg_no.value=frm1.lnr_bkg_no.value;
	
	frm1.h_bkg_no.value=frm1.bkg_no.value;
	frm1.f_bkg_no.value=frm1.bkg_no.value;
	
	frm1.rgst_usrid.value=docObjects[0].GetCellValue(1, "sv_rgst_usrid");
	frm1.modi_usrid.value=docObjects[0].GetCellValue(1, "sv_modi_usrid"); 
	
	var t_modi_tms =docObjects[0].GetCellValue(1, "sv_modi_tms");
	frm1.modi_tms.value=t_modi_tms.substring(0,2)+"-"+ t_modi_tms.substring(2,4)+"-"+ t_modi_tms.substring(4,8) + " " + t_modi_tms.substring(8,10) + ":" + t_modi_tms.substring(10,12) + ":" + t_modi_tms.substring(12,14);
		
	var t_rgst_tms = docObjects[0].GetCellValue(1, "sv_rgst_tms");
	frm1.rgst_tms.value=t_rgst_tms.substring(0,2)+"-"+ t_rgst_tms.substring(2,4)+"-"+ t_rgst_tms.substring(4,8) + " " + t_rgst_tms.substring(8,10) + ":" + t_rgst_tms.substring(10,12) + ":" + t_rgst_tms.substring(12,14);
	
	//#2068 - Document 번호 Title 에 반영
	setTabTitle(frm1.bkg_no.value);
	
	if(poListSheet){
		doWork('SEARCH_PO');
	}
	
	if(cntrSmrySheet){
		// doWork('SEARCH_CNTR'); //#1024 [PATENT] Booking Entry 개선 및 Quotation
		// Audit 기능 개발 (TB_BKG_CNTR제거)
	}
	
	if(cntrListSheet){
		doWork('SEARCH_CNTR_LIST');
	}
	
	if(frtSdSheet){
		searchGrid(1);
	}
	if(frtBcSheet){
		searchGrid(2);
	}
	if(frtDcSheet){
		searchGrid(3);
	}
	
	doWork('SEARCH_HIS');
	
	chkBkgModiTms("VIEW");
	
	// 목록 Flag 초기화
	poListSheet=false;
	
	// 목록 Flag 초기화
	cntrSmrySheet=false;
	
	// 목록 Flag 초기화
	cntrListSheet=false;
	
	// 목록 Flag 초기화
	frtSdSheet=false;
	
	// 목록 Flag 초기화
	frtBcSheet=false;
	
	// 목록 Flag 초기화
	frtDcSheet=false;
	
	// 버튼 초기화
	btnLoad();
	
	if(errMsg =='' ){
		showCompleteProcess();
	}
	sheetObj.SetBlur();	// IBSheet Focus out 처리
}
function sheet1_OnSearchEnd(errMsg){
	// 버튼 초기화
	btnLoad();
	doHideProcess();
}
function gridAdd(objIdx){
	var intRows=docObjects[objIdx].LastRow() + 1;
	docObjects[objIdx].DataInsert(intRows);
}
/**
 * 달력팝업을 호출한다.
 */
function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    // 달력 조회 팝업 호출
	        /*
			 * var cal=new calendarPopup(); cal.select(obj, obj.name,
			 * 'MM-dd-yyyy');
			 */
	    	var cal=new ComCalendar();
            cal.select(obj, 'MM-dd-yyyy');
	    break;
    }
}
// --------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
var isRun = false;

var obl_decimal_len = "";

function loadPage() {
	
	var opt_key = "OBL_DECIMAL_LEN";
	ajaxSendPost(setDecimalLen, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    for(var i=0;!isRun && i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
        if(i == docObjects.length - 1){
        	isRun = true;
        }
    }
    
    var opt_key = "BKG_INIT_STATUS";
	ajaxSendPost(setBkgInitStsCdVal, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key = "BKG_EDIT_MODE";
	ajaxSendPost(setBkgEditStsCdVal, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    frm1.pck_qty.value=doMoneyFmt(Number(frm1.pck_qty.value).toFixed(0));
    frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(obl_decimal_len));
    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(obl_decimal_len));
    frm1.meas.value=doMoneyFmt(Number(frm1.meas.value).toFixed(3));
    frm1.meas1.value=doMoneyFmt(Number(frm1.meas1.value).toFixed(0));
    
    
    /*#1425 hsk*/ 
    if(!frm1.org_bl_qty.value) {
        if(frm1.obl_tp_cd.value=="O"){
        	frm1.org_bl_qty.value="3" 
        } else {
        	frm1.org_bl_qty.value="0"
        }

    }
    
    // 2011.12.28 BL Type에서 Third Party 뺄 것
    for(var i=0 ; i<frm1.hbl_tp_cd.length ; i++){
    	if(frm1.hbl_tp_cd.options[i].value == 'TP'){
    		frm1.hbl_tp_cd.options[i]=null;
    	}
    }
    
    if(frm1.bkg_seq.value==""){
    	if(frm1.c_create.value != "C"){ //copy
    		setPckUtCd();
    	}
    	// shipModeChange();
    	frm1.bkg_no.value="AUTO";
    	frm1.bkg_sts_cd.value=BKG_INIT_STATUS;
    	// frm1.rmk.value=frm1.h_ooh_bkg_rmk.value;
    }
    setFrCntrList();
    
    /* 2016-12-12 자동완성 기능 추가 S */	
    /* Booking Tab */
	fnSetAutocomplete('lnr_trdp_nm'		, 'LINER_POPLIST_MS', 'liner', 'O'); 		// Carrier
	fnSetAutocomplete('shpr_trdp_nm'	, 'LINER_POPLIST'	, 'shipper', 'O'); 		// Shipper
	fnSetAutocomplete('cnee_trdp_nm'	, 'LINER_POPLIST'	, 'consignee', 'O'); 	// consignee
	fnSetAutocomplete('ntfy_trdp_nm'	, 'LINER_POPLIST'	, 'notify', 'O'); 		// Notify
	fnSetAutocomplete('fwrd_agn_trdp_nm', 'LINER_POPLIST'	, 'forwarder', 'O'); 	// Forwarder
	fnSetAutocomplete('prnr_trdp_nm'	, 'LINER_POPLIST'	, 'partner', 'O'); 		// Destination
																					// Agent
	fnSetAutocomplete('carr_trdp_nm'	, 'LINER_POPLIST'	, 'carr', 'O'); 			// Booking
																						// Agent
	fnSetAutocomplete('pu_trdp_nm'		, 'LINER_POPLIST'	, 'pu', 'O'); 			// Empty
																					// Pickup
	fnSetAutocomplete('rcv_wh_nm'		, 'LINER_POPLIST'	, 'rcv', 'O'); 			// Delivery
																					// To/Pier
	fnSetAutocomplete('act_shpr_trdp_nm', 'LINER_POPLIST'   , 'ashipper', 'O');     // Customer
																					// //#1153
																					// [Binex-Visibility]Carrier
																					// Booking
																					// Status
																					// 수정
	
	fnSetAutocomplete('por_nm'	, 'LOCATION_POPLIST', 'por', 'O'); 		// POR
	fnSetAutocomplete('pol_nm'	, 'LOCATION_POPLIST', 'pol', 'O'); 		// POR
	fnSetAutocomplete('pod_nm'	, 'LOCATION_POPLIST', 'pod', 'O'); 		// POD
	fnSetAutocomplete('del_nm'	, 'LOCATION_POPLIST', 'del', 'O'); 		// DEL
	fnSetAutocomplete('fnl_dest_loc_nm'	, 'LOCATION_POPLIST', 'dest', 'O'); 		// F.DEST
	fnSetAutocomplete('iss_loc_nm'	, 'LOCATION_POPLIST', 'iss', 'O'); 		// Issued Place
    /* 2016-12-12 자동완성 기능 추가 E */	
	
	var formObj=document.frm1;
	
	fnSetIBsheetInit(2);   // grid가 생성되지않았으면 생성
	// 사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[2], false,"fnRestoreGridSetEnd"); // Tab
																												// 2
																												// Container
																												// List
    checkBoxSetting();
}

function fnRestoreGridSetEnd(){
	
}

/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
 */
function setDocumentObject(sheet_obj){
	// docObjects[sheetCnt++]=sheet_obj;
	if (sheet_obj.id=='sheet1') docObjects[0]=sheet_obj;
	if (sheet_obj.id=='sheet2') docObjects[1]=sheet_obj;
	if (sheet_obj.id=='sheet3') docObjects[2]=sheet_obj;
	if (sheet_obj.id=='sheet4') docObjects[3]=sheet_obj;
	if (sheet_obj.id=='sheet5') docObjects[4]=sheet_obj;
	if (sheet_obj.id=='sheet7') docObjects[5]=sheet_obj;
	if (sheet_obj.id=='sheet6') docObjects[6]=sheet_obj;
	if (sheet_obj.id=='sheet8') docObjects[7]=sheet_obj;
	if (sheet_obj.id=='sheet9') docObjects[8]=sheet_obj;
	if (sheet_obj.id=='sheet10') docObjects[9]=sheet_obj;

}
/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetObj.id) {
		case "sheet1":     
			with (sheetObj) {
            	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

            	var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            	var headers = [ { Text:"|Booking Seq.|Booking No.", Align:"Center"} ];
            	InitHeaders(headers, info);
            
            	var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
            	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bkg_seq" },
            	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bkg_no" },
            	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_lnr_bkg_no" },
            	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bkg_sts_cd" },
            	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_rsn_txt" },
            	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_rgst_usrid" },
            	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_rgst_tms" },
            	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_modi_usrid" },
            	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_modi_tms" }
            	             ];
             
            	InitColumns(cols);
            	SetEditable(1);
            	SetVisible(0);
			}
        break;
		
		case "sheet2":     // Container Summary
            with (sheetObj) {
                SetConfig({SearchMode: 2, MergeSheet: 5, Page: 20, DataRowMerge: 1, TabStop: 0});

                var info = {Sort: 1, ColMove: 1, HeaderCheck: 1, ColResize: 1};
                var headers = [{Text: getLabel('SEE_BMD_0500_HDR3'), Align: "Center"}];
                InitHeaders(headers, info);

                var cols = [ {Type:"DelCheck", 	Hidden:0, Width:60,  Align:"Center", ColMerge:1, SaveName:"del", 			KeyField:0, CalcLogic:"", Format:"", 		PointCount:0, UpdateEdit:1, InsertEdit:1 },
                             {Type:"Int", 		Hidden:1, Width:0,   Align:"Center", ColMerge:0, SaveName:"cntr_seq" },
                             {Type:"Text", 		Hidden:1, Width:0,   Align:"Center", ColMerge:0, SaveName:"bkg_seq" },
                             {Type:"Combo", 	Hidden:0, Width:170, Align:"Left", 	 ColMerge:0, SaveName:"cntr_tpsz_cd", 	KeyField:1, CalcLogic:"", Format:""},
                             {Type:"Int", 		Hidden:0, Width:60,  Align:"Right",  ColMerge:1, SaveName:"qty", 			KeyField:1, CalcLogic:"", Format:"Integer", PointCount:0, UpdateEdit:1, InsertEdit:1, EditLen:7 },
                             {Type:"Status", 	Hidden:1, Width:0,   Align:"Center", ColMerge:0, SaveName:"cntrSmry_ibflag" }
                             ];
                
                InitColumns(cols);
                SetEditable(1);
                SetColProperty('cntr_tpsz_cd', {ComboText: '|' + TPCD1, ComboCode: '|' + TPCD2});
                SetSheetHeight(120);
                SetHeaderRowHeight(20);
            }
        break;
    
		case 'sheet3':     // Container
            with (sheetObj) {
                SetConfig({SearchMode: 2, MergeSheet: 5, Page: 20, DataRowMerge: 1, TabStop: 0});

                var info = {Sort: 1, ColMove: 1, HeaderCheck: 1, ColResize: 1};
                var headers = [{Text: getLabel('SEE_BMD_0500_HDR4'), Align: "Center"}];
                InitHeaders(headers, info);

                var cols = [ {Type:"DelCheck", 	Hidden:0, 	Width:60, 	Align:"Center", 	ColMerge:0, SaveName:"del", 			  KeyField:0, CalcLogic:"", Format:"", 	PointCount:0, UpdateEdit:1, InsertEdit:1 },
                             {Type:"Seq",      	Hidden:0,  	Width:40,   Align:"Center",  	ColMerge:0, SaveName:"no",                KeyField:0, CalcLogic:"", Format:"", 	PointCount:0, UpdateEdit:0, InsertEdit:0 },
                             {Type:"Int", 		Hidden:1, 	Width:0, 	Align:"Center", 	ColMerge:0, SaveName:"l_cntr_seq" },
                             {Type:"Text", 		Hidden:1,  	Width:0,  	Align:"Center",  	ColMerge:0, SaveName:"bkg_seq" },
                             {Type:"Text",      Hidden:0,   Width:150,  Align:"Left",       ColMerge:0, SaveName:"l_cntr_no",         KeyField:0, CalcLogic:"", Format:"", 	PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:14 },
                         	//#3467 [BINEX]Carrier Booking Entry 수정 - Container Tab ( TP/SZ 필드 필수처리 ) 
                             {Type:"Combo", 	Hidden:0, 	Width:110, 	Align:"Left", 		ColMerge:0, SaveName:"l_cntr_tpsz_cd", 	  KeyField:1, CalcLogic:"", Format:"", 	PointCount:0, UpdateEdit:1, InsertEdit:1 },
                             
                             {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    	ColMerge:0, SaveName:"l_seal_no",         KeyField:0, CalcLogic:"", Format:"", 	PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:20 },
                             {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    	ColMerge:0, SaveName:"cntr_ref_no",         KeyField:0, CalcLogic:"", Format:"", 	PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:20 },
        		             {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"cgo_pgk_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
        		             {Type:"Combo",     Hidden:0, Width:90,   Align:"Left",    ColMerge:0,   SaveName:"cgo_pck_ut_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_kgs_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_lbs_wgt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_cbm_qty",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
        		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cgo_cft_qty",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
                             {Type:"Date",      Hidden:0,   Width:120,  Align:"Center",  	ColMerge:0, SaveName:"l_mty_out_dt",      KeyField:0, CalcLogic:"", Format:"Ymd", PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:8 },
       		             	 {Type:"Date",      Hidden:0,   Width:100,  Align:"Center",  	ColMerge:0, SaveName:"l_mty_out_tm",      KeyField:0, CalcLogic:"", Format:"Hm",  PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:4 },
       		             	 {Type:"Date",      Hidden:0,   Width:120,  Align:"Center",  	ColMerge:0, SaveName:"l_full_rtn_dt",     KeyField:0, CalcLogic:"", Format:"Ymd", PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:8 },
    		             	 {Type:"Date",      Hidden:0,   Width:100,  Align:"Center",  	ColMerge:0, SaveName:"l_full_rtn_tm",     KeyField:0, CalcLogic:"", Format:"Hm",  PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:4 },

    		             	 {Type:"Text",      Hidden:1, Width:120,  Align:"Left",      ColMerge:0,   SaveName:"l_rc_flg",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",      ColMerge:0,   SaveName:"l_vent_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",    ColMerge:0,   SaveName:"rc_flg",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Float",     Hidden:0, Width:60,   Align:"Right",     ColMerge:0,   SaveName:"temp_val",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
				             {Type:"Combo",     Hidden:0, Width:40,   Align:"Left",      ColMerge:0,   SaveName:"temp_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },                                            
				             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",    ColMerge:0,   SaveName:"mgset_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },

				             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",    ColMerge:0,   SaveName:"ca_flg",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",    ColMerge:0,   SaveName:"vent_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },				             
				             {Type:"Float",     Hidden:0, Width:60,   Align:"Right",     ColMerge:0,   SaveName:"air_flow",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
				             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",    ColMerge:0,   SaveName:"air_flow_unit",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:2,   InsertEdit:1 },
				             {Type:"Float",     Hidden:0, Width:60,   Align:"Right",     ColMerge:0,   SaveName:"humid",      		  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5, AcceptKeys:"N" },
				             {Type:"Text",      Hidden:0,  Width:100, Align:"Left",      ColMerge:0,   SaveName:"cntr_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
				             
    		             	{Type:"Status", 	Hidden:1, 	Width:0, 	Align:"Center", 	ColMerge:0, SaveName:"cntr_ibflag" }
    		             	 ];
                
                
                InitColumns(cols);
                SetEditable(1);
                SetColProperty('l_cntr_tpsz_cd', {ComboText: '|' + TPCD1, ComboCode: '|' + TPCD2});
                SetColProperty('cgo_pck_ut_cd', {ComboText:PCKCD1, ComboCode:PCKCD2, DefaultValue:"CT"} );
                SetColProperty('cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
                SetColProperty('rc_flg', {ComboText:'|Y|N', ComboCode:'|Y|N'} );
                SetColProperty('temp_cd', {ComboText:'|'+TEMPCD1, ComboCode:'|'+TEMPCD2} );
                SetColProperty('mgset_flg', {ComboText:'|Y|N', ComboCode:'|Y|N'} );
                SetColProperty('vent_cd', {ComboText:'|'+VENTCD1, ComboCode:'|'+VENTCD2} );
                SetColProperty('ca_flg', {ComboText:'|Y|N', ComboCode:'|Y|N'} );
                SetColProperty('air_flow_unit', {ComboText:'|CBM|CFT', ComboCode:'|CBM|CFT'} );
                SetColProperty(0 ,"l_cntr_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
    			SetColProperty(0 ,"l_seal_no" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
    			SetColProperty(0 ,"cntr_ref_no" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
      			
    			// SetActionMenu("Header Setting Save|Header Setting Reset");
    			  
                SetSheetHeight(270);
                SetHeaderRowHeight(20);
            }
        break;
        
		case "sheet4":     // PO
			with(sheetObj){
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('SEE_BMD_0500_HDR1'), Align:"Center"},
				                { Text:getLabel('SEE_BMD_0500_HDR2'), Align:"Center"} ];
				InitHeaders(headers, info);

				var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"del",            	KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",   	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bkg_seq" },
				             {Type:"Text",    	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"po_sys_no" },
				             {Type:"Text",    	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"po_cmdt_seq" },
				             {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cust_po_no",			KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text", 		Hidden:0, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"cust_itm_id",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cust_itm_nm",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_shp_cmdt_cd",   KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
				             {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"item_shp_cmdt_nm",   KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:300 },
				             {Type:"Int",       Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"cmdt_pck_qty",   	KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
				             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cmdt_pck_ut_cd",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:0, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"cmdt_pck_ut_nm",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"cmdt_pck_inr_qty",	KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"cmdt_ea_cnt",    	KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
				             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"cmdt_ttl_qty",       KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:7 },
				             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_kgs_wgt",  	 	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
				             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_lbs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
				             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_cbm_meas",  	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_cft_meas",  	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_ibflag" }
				             ];
	       
				InitColumns(cols);
				
				
				SetEditable(1);
				SetSheetHeight(280);
				SetHeaderRowHeight(20);
				
				SetColProperty(0 ,"item_shp_cmdt_cd" , {AcceptKeys:"N" , InputCaseSensitive:1});
				
				SetHeaderRowHeight(21);
			}
		break;
		
		case "sheet5":      // Selling/Debit 탭부분 init
	    	if(MULTI_CURR_FLAG == "Y"){
	    		with(sheetObj){

	    		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	    		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    		      var headers = [ { Text:getLabel('SEE_BMD_0500_HDR5_3'), Align:"Center"},
	    		                      { Text:getLabel('SEE_BMD_0500_HDR5_4'), Align:"Center"} ];
	    		      InitHeaders(headers, info);

	    		      var cols = [
	    		             {Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	    		             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	    		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	    		             
	    		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    		             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
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
	    		             
	    		             {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    		             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    		             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_auto_trf_flg" },
	    		             {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_frt_ask_clss_cd" },
	    		             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_due_dt" },
	    		             {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	    		       
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
	    		}
	    	}else{
	    		with(sheetObj){
	    			
	    			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	    			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    			var headers = [ { Text:getLabel('SEE_BMD_0500_HDR5_1'), Align:"Center"},
	    			                { Text:getLabel('SEE_BMD_0500_HDR5_2'), Align:"Center"} ];
	    			
	    			InitHeaders(headers, info);

	    			var cols = [ 
	    			         {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    			         {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	    			         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	    			         {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	    			         {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	    			         
	    			         {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    			         {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    			         {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    			         {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    			         {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	    			         {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
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
	    			         {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    			         {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    			         {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    			         {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    			         {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    			         {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    			         {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    			         {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    			         {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_auto_trf_flg" },
	    			         {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    			         {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    			         {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	    			         {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_frt_ask_clss_cd" },
	    			         {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_inv_due_dt" },
	    			         {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	    			         {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	    	       
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
	    	   }
	    	}
	    break;
	    
	    // Freight
		case "sheet6":      // Buying/Credit 탭부분 init
    	   if(MULTI_CURR_FLAG == "Y"){
    		    with(sheetObj){
    		    	
    		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

    		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    		        var headers = [ { Text:getLabel('SEE_BMD_0500_HDR6_3'), Align:"Center"},
    		                        { Text:getLabel('SEE_BMD_0500_HDR6_4'), Align:"Center"} ];
    		        
    		        InitHeaders(headers, info);
    		        
    		        var cols = [
    		  		         {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    		  				 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    		  				 {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    		  				 {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    		  				 
    		  				 {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    		  				 {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
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
    		  					
    		  				 {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		  				 {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		  				 {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		  				 {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  				 {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  				 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  				 {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  				 {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  				 {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_auto_trf_flg" },
    		  				 {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  				 {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    		  				 {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    		  				 {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_frt_ask_clss_cd" },
    		  				 {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_due_dt" },
    		  				 {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    		  				 {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
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
    		    }
    	   	}else{
    	      with(sheetObj){
    	    	  
    	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

    	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	            var headers = [ { Text:getLabel('SEE_BMD_0500_HDR6_1'), Align:"Center"},
    	                            { Text:getLabel('SEE_BMD_0500_HDR6_2'), Align:"Center"} ];
    	            
    	            InitHeaders(headers, info);

    	            var cols = [
    	                     {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                     {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	                     {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	                     {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	                     
    	                     {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                     {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
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
    	                     {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                     {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                     {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                     {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"b_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                     {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_auto_trf_flg" },
    	                     {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                     {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"b_fr_trf_dtl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                     {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"b_fr_ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_frt_ask_clss_cd" },
    	                     {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_inv_due_dt" },
    	                     {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"b_fr_org_agent_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    	                     {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"b_fr_reserve_field01",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
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
    	        }
    	   	}
        break;
       
		case "sheet7":      // Buying/Credit 탭부분 init
    	   
    	   if(MULTI_CURR_FLAG == "Y"){
    		   	with(sheetObj){
    			  
    			    SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

    			    var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    			    var headers = [ { Text:getLabel('SEE_BMD_0500_HDR7_3'), Align:"Center"},
    			                    { Text:getLabel('SEE_BMD_0500_HDR7_4'), Align:"Center"} ];
    			   
    			    InitHeaders(headers, info);
    			   
    			    var cols = [
    			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    			             {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    			             
    			             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    			             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
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
    	             
    			             {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_inv_xcrt_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Float",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_amt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_vat_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    			             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
    			             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Float",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_xcrt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Float",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_perf_vat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    			             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    			             {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    			             {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    			             {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
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
    			   
    			    SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

    			    var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    			    var headers = [ { Text:getLabel('SEE_BMD_0500_HDR7_1'), Align:"Center"},
    			                    { Text:getLabel('SEE_BMD_0500_HDR7_2'), Align:"Center"} ];
    			   
    			    InitHeaders(headers, info);

    			    var cols = [
    	                     {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_frt_cd_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
    	                     {Type:"PopupEdit", Hidden:0, Width:43,   Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
    	                     {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
    	                     
    	                     {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Combo",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_scg_incl_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_rat_curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
    	                     {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_ru",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
    	                     {Type:"Float",     Hidden:1,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_agent_ru",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
    	                     {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_qty",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
    	                     {Type:"Float",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"dc_fr_trf_cur_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
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
    	                     {Type:"Text",      Hidden:1,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                     {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                     {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                     {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"dc_fr_inv_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                     {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dc_fr_inv_sts_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	                     {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
    	                     {Type:"CheckBox",  Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"dc_fr_frt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
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
        
		case "sheet8": // Booking Status History
    	    with(sheetObj){
          
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel("SEE_BMD_HDR22"), Align:"Center"} ];
				InitHeaders(headers, info);

				var cols = [ {Type:"Text",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"modi_seq" },
				             {Type:"Combo",    Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"bkg_sts_cd" },
				             {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"rsn_txt" },
				             {Type:"Image",    Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"rsn_txt_img" },
				             {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"rgst_usrid" },
				             {Type:"Date",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"rgst_tms", Format:"YmdHms" },
				             {Type:"Text",     Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bkg_seq" }];
          
				InitColumns(cols);
				SetColProperty("bkg_sts_cd", {ComboText:BKGSTSNM, ComboCode:BKGSTSCD} );
				SetImageList(0,"web/img/main/icon_m.gif");
				SetEditable(0);
				SetSheetHeight(400);
           }
	    break;
	    
		case "sheet9": // TP/SZ init
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
		case "sheet10": // Work Order List
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
    	             {Type:"Text",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"wo_grs_wgt" } ];
    	       
    	      InitColumns(cols);

    	   // SetGetCountPosition()(0);
    	      SetEditable(0);
    	      SetColProperty('wo_status', {ComboText:"SAVED|ISSUED", ComboCode:"A|B"} );
    	      SetSheetHeight(300);
		}
			
			
			break;
    }
}

var etdRangeOk=true;
/**
 * Booking&B/L 메인 화면의 입력값 확인
 */
function bkgCheckInpuVals(){
	var isOk=true;
	// ---------------20121130 OJG---------------------------
	if(!chkCmpAddr(frm1.shpr_trdp_addr, 'Shipper Address')){
		isOk=false;
	}
	if(!chkCmpAddr(frm1.cnee_trdp_addr, 'Consignee Address')){
		isOk=false;
	}
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
	}
	if(!checkInType(frm1.etd_dt_tm.value, "DD")){	
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETD_'));
		frm1.etd_dt_tm.focus();
		isOk=false;
		return isOk; 
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
	/*
	 * if(frm1.lnr_bkg_no.value == "") { alert(getLabel('FMS_COM_ALT001'));
	 * frm1.lnr_bkg_no.focus(); isOk=false; return isOk; }
	 */
 	// #25246, 25247 필수값 설정 추가
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
	// #31594 [BINEX]B/L Entry 에서 Customer 항목을 mandatory 지정 - 필수값 설정 추가
	/*
	 * if(frm1.act_shpr_trdp_cd.value == "") { alert(getLabel('FMS_COM_ALT001') + " -
	 * CUSTOMER"); frm1.act_shpr_trdp_cd.focus(); isOk=false; return isOk; }
	 * if(frm1.act_shpr_trdp_nm.value == "") { alert(getLabel('FMS_COM_ALT001') + " -
	 * CUSTOMER"); frm1.act_shpr_trdp_nm.focus(); isOk=false; return isOk; }
	 */
	if(frm1.shpr_trdp_nm.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - " + MSG_KEY['FMS_COD_SHIP']);
		frm1.shpr_trdp_nm.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.cnee_trdp_nm.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - " + MSG_KEY['FMS_COD_CNEE']);
		frm1.cnee_trdp_nm.focus();
		isOk=false;
		return isOk; 
	}
	/*
	 *  v4.5.0 릴리스 테스트 수행 결과 #2
	if(frm1.act_shpr_trdp_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - " + MSG_KEY['FMS_COD_CUST']);
		frm1.act_shpr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.act_shpr_trdp_nm.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - " + MSG_KEY['FMS_COD_CUST']);
		frm1.act_shpr_trdp_nm.focus();
		isOk=false;
		return isOk; 
	}
	*/
	if(frm1.lnr_trdp_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - " + MSG_KEY['FMS_COD_CARR']);
		frm1.lnr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.lnr_trdp_nm.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - " + MSG_KEY['FMS_COD_CARR']);
		frm1.lnr_trdp_nm.focus();
		isOk=false;
		return isOk; 
	}
	/* #1424 VSL 필수 항목 제외 */ 
/*
 * if(frm1.trnk_vsl_nm.value == "") { alert(getLabel('FMS_COM_ALT001') + " - " +
 * MSG_KEY['FMS_COD_VESL']); frm1.trnk_vsl_nm.focus(); isOk=false; return isOk; }
 */
	if(frm1.fm_svc_term_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - " + MSG_KEY['FMS_COD_TERM']);
		frm1.fm_svc_term_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.to_svc_term_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001') + " - " + MSG_KEY['FMS_COD_TERM']);
		frm1.to_svc_term_cd.focus();
		isOk=false;
		return isOk; 
	}
	/*
	 * if(Number(frm1.grs_wgt.value) == 0) { alert(getLabel('FMS_COM_ALT001') + " - " +
	 * MSG_KEY['FMS_COD_GWGT']); frm1.grs_wgt.focus(); isOk=false; return isOk; }
	 * if(Number(frm1.grs_wgt1.value) == 0) { alert(getLabel('FMS_COM_ALT001') + " - " +
	 * MSG_KEY['FMS_COD_GWGT']); frm1.grs_wgt1.focus(); isOk=false; return isOk; }
	 */
	if(frm1.shp_mod_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		frm1.shp_mod_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.nomi_flg.value == "B"){
		alert(getLabel('FMS_COM_ALT001') + " - Sales Type");
		frm1.nomi_flg.focus();
		isOk=false;
		return isOk;
	}
	if(checkInputVal(frm1.bkg_dt_tm.value, 10, 10, "DD", 'Booking Date')!='O'){
		frm1.bkg_dt_tm.focus();
		isOk=false;
		return isOk; 
	}
	// today를 기준으로 6개월 차이가 나면 안됨
	var tmpEtdDate=frm1.etd_dt_tm.value.replaceAll("-", "");
	
	if(tmpEtdDate != ""){
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
	}
	
	/*
	 * //#1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발 (TB_BKG_CNTR제거) //
	 * Container Summary List validation. var
	 * cntrSmryParam=docObjects[1].GetSaveString(false);
	 * //if(cntrSmryParam!=''){ if(cntrSmryCheckInpuVals(docObjects[1])){
	 * isOk=false; } //}
	 */
	
	// PO List validation.
    var poListParam=docObjects[3].GetSaveString(false);
	if(poListParam!=''){
		//if(poListCheckInpuVals(docObjects[3])){
			//isOk=false;
		//}
	}
	
	//#3467 [BINEX]Carrier Booking Entry 수정 - Container Tab ( TP/SZ 필드 필수처리 ) 
	var cntrListParam=docObjects[2].GetSaveString(false);
    if(docObjects[2].IsDataModified() && cntrListParam == "") { isOk=false; moveTab('02'); return isOk; };
	
    // #1351 [CLT] B/L, AWB 등 Freight 탭에 대한 Mandatory Validation 메시지 기능 보완
	var frtSdListParam=docObjects[4].GetSaveString(false);
    if(docObjects[4].IsDataModified() && frtSdListParam == "") { isOk=false; moveTab('03'); return isOk; };

    var frtBcListParam=docObjects[6].GetSaveString(false);
    if(docObjects[6].IsDataModified() && frtBcListParam == "") { isOk=false; moveTab('03'); return isOk; };

    var frtDcListParam=docObjects[5].GetSaveString(false);
    if(docObjects[5].IsDataModified() && frtDcListParam == "") { isOk=false; moveTab('03'); return isOk; };
	
	return isOk;
}

/**
 * Container Summary List의 입력값 확인
 */
function cntrSmryCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isError=false;
	
	var rowCnt = 0;
	
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'cntrSmry_ibflag') != 'D'){
			rowCnt++;
		}
		if(sheetObj.GetCellValue(i, 'cntrSmry_ibflag')=='U'||sheetObj.GetCellValue(i, 'cntrSmry_ibflag')=='I'){
			if(sheetObj.GetCellValue(i, 'cntr_tpsz_cd') == "") { 
				alert(getLabel('FMS_COM_ALT001'));
				sheetObj.SelectCell(i,"cntr_tpsz_cd");
				isError=true;
				break;
			}
			if(sheetObj.GetCellValue(i, 'qty') == "" || sheetObj.GetCellValue(i, 'qty') == "0") { 
				alert(getLabel('FMS_COM_ALT001'));
				sheetObj.SelectCell(i,"qty");
				isError=true;
				break;
			}
		}
	}
	if(rowCnt == 0){
		alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_CNTRQTY'));
		isError=true;
	}
	return isError;
}

/**
 * PO List의 입력값 확인
 */
function poListCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	for(var i=2; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'item_ibflag')=='U'||sheetObj.GetCellValue(i, 'item_ibflag')=='I'){
			if(sheetObj.GetCellValue(i, 'po_sys_no') == "") { 
				alert(getLabel('FMS_COM_ALT001'));
				sheetObj.SelectCell(i,"cust_po_no");
				isError=true;
				break;
			}
		}
	}
	return isError;
}

/**
 * cntr List의 입력값 확인
 */
function cntrListCheckInpuVals(sheetObj){


// cntr_ibflag
}

//#2268 [UNICO, PREMIER] Decimal place of container weight to be 3 decimal digits
function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt"){
		
		var grsWgtValue = Number(formObj.grs_wgt.value.replace(/,/gi, "")).toFixed(obl_decimal_len);
		var grsWgtMoney = doMoneyFmt(grsWgtValue);
		
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
		var rndXLValue=roundXL(formObj.meas.value.replaceAll(",", "") * CNVT_CNST_CBM_CFT, 3);
		formObj.meas1.value=doMoneyFmt(Number(rndXLValue).toFixed(0));
		// chkComma(formObj.meas1, 8, 3);
	}
	// CFT ==> CBM 기능
	else if(obj.name=="meas1"){
		var rndXLValue=roundXL(formObj.meas1.value.replaceAll(",", "") / CNVT_CNST_CBM_CFT, 3);
		formObj.meas.value=rndXLValue;
		chkComma(formObj.meas, 8, 3);
	}
}
function shipModeChange(){
	var formObj=document.frm1;
	if (formObj.shp_mod_cd.value == 'FCL' || formObj.shp_mod_cd.value == 'BLK') {
		formObj.to_svc_term_cd.value='CY';
		formObj.fm_svc_term_cd.value='CY';
	} else {
		formObj.to_svc_term_cd.value='CF';
		formObj.fm_svc_term_cd.value='CF';
	}
}
function svcTermChange(){
	var formObj=document.frm1;
	formObj.to_svc_term_cd.value=formObj.fm_svc_term_cd.value;
}
// 화면로드시 데이터 표시
function loadData(){
	
    // #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발 //carrier booking
	// 생성(coustomer booking copy)
	if(frm1.c_create.value=="Y"){ // customer booking copy(carrier booking)
		doWork('SEARCH_CNTR_LIST_COPY');
		doWork('SEARCH_PO_COPY');
		selectCopyFrt();
    	//document.frm1.rcv_wh_cd.value = "";
    	//document.frm1.rcv_wh_nm.value = "";
		return;
	}
	   
    if(frm1.c_create.value=="C"){ // copy

    	//#2879 [Zimex] after v450, booking confirmation issue
       frm1.asgn_usrid.value  = frm1.user_id.value;
	   frm1.sls_ofc_cd.value  = v_ofc_cd;
	   frm1.sls_usrid.value   = frm1.user_id.value;
	   frm1.rgst_usrid.value   = frm1.user_id.value;
	   frm1.sls_usr_nm.value  = usrNm;
	   frm1.sls_dept_cd.value = usrDeptCd;
    	
	   doWork('SEARCH_CNTR_LIST_COPY');
	   selectCopyFrt();
	   return;
    }			
	
	if(frm1.bkg_seq.value!=""){
		frm1.bkg_sts_cd.value=frm1.h_bkg_sts_cd.value;
		frm1.frt_term_cd.value=frm1.h_frt_term_cd.value;
		frm1.pck_ut_cd.value=frm1.h_pck_ut_cd.value;
		frm1.fm_svc_term_cd.value=frm1.h_fm_svc_term_cd.value;
		frm1.to_svc_term_cd.value=frm1.h_to_svc_term_cd.value;
		frm1.cargo_tp_cd.value=frm1.h_cargo_tp_cd.value;
		
		doWork('SEARCH_PO');
		// doWork('SEARCH_CNTR'); //#1024 [PATENT] Booking Entry 개선 및 Quotation
		// Audit 기능 개발 (TB_BKG_CNTR제거)
		doWork('SEARCH_CNTR_LIST');
		doWork('SEARCH_FRT');
		doWork('SEARCH_HIS');
		doWork("SEARCH_WO");
		
		//#2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.bkg_no.value);
		
	} else {
		if (docObjects[3].GetEditable() == 0) {
			docObjects[3].SetEditable(1);
		}
		frm1.rgst_tms.value='';
	}
	
	chkBkgModiTms("VIEW");
	
	// #41634 - [DMS] Default Cursor Position Change
	setTimeout("frm1.bkg_no.focus();", 100);
}

function selectCopyFrt(){
	frm1.rgst_tms.value='';
	rtnary=new Array(1);
	rtnary[0]= "CMM_POP_0700";
	callBackFunc = "COPY_CONFIRM_POPUP";
	modal_center_open('./CMM_POP_0700.clt', rtnary, 480,200,"no");		
	
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
			
			//#2348 [IMPEX] Pop up error message not closing after click OK
			cntrTpSzFlag = true;
			
			var arFrt_copy_chk=rtnValAry[1];
			var apFrt_copy_chk=rtnValAry[2];
			var dcFrt_copy_chk=rtnValAry[3];
			var shpr_cne_copy_chk=rtnValAry[4];
			var shpmt_itm_copy_chk=rtnValAry[5];
			var mrk_des_copy_chk=rtnValAry[6];
			var rmk_copy_chk=rtnValAry[7];//#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청		

			if ((arFrt_copy_chk == "Y")||(apFrt_copy_chk == "Y")||(dcFrt_copy_chk == "Y")) {
				// Freight될 Container 조회
				searchGrid(4);
			}			
			
			if (arFrt_copy_chk == "Y") {
				// Selling/Debit Freight 조회
				searchGrid(1);
			}
			
			if (apFrt_copy_chk == "Y") {
				// Buying/Crebit List 조회
				searchGrid(2);
			}
			if (dcFrt_copy_chk == "Y") {
				// DC
				searchGrid(3);
			}			
			//#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
			if (shpmt_itm_copy_chk == "Y" || rmk_copy_chk == "Y") {
				frm1.f_cmd.value=COMMAND12;		
				var xml = sheet1.GetSearchData("./SEE_BMD_0500_0GS.clt",FormQueryString(frm1));					
				var xmlDoc = $.parseXML(xml);					 
				var $xml = $(xmlDoc);
				 
				 if($xml.find("result").text() == "1" ){         

					if(shpmt_itm_copy_chk == "Y"){
						
						isCopy = true;
						
						formObj.frt_term_cd.value = $xml.find("frt_term_cd").text();
						formObj.rep_cmdt_cd.value = $xml.find("rep_cmdt_cd").text();
						formObj.rep_cmdt_nm.value = $xml.find("rep_cmdt_nm").text();
						formObj.pck_ut_cd.value = $xml.find("pck_ut_cd").text();
						formObj.pck_qty.value = ($xml.find("pck_qty").text() == "" ? "0": doMoneyFmt(Number($xml.find("pck_qty").text()).toFixed(0)));
						formObj.grs_wgt.value = ($xml.find("grs_wgt").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt").text()).toFixed(obl_decimal_len)));
						formObj.grs_wgt1.value = ($xml.find("grs_wgt1").text() == "" ? "0": doMoneyFmt(Number($xml.find("grs_wgt1").text()).toFixed(obl_decimal_len)));
						formObj.meas.value = ($xml.find("meas").text() == "" ? "0": doMoneyFmt(Number($xml.find("meas").text()).toFixed(3)));
						formObj.meas1.value = ($xml.find("meas1").text() == "" ? "0": doMoneyFmt(Number($xml.find("meas1").text()).toFixed(0)));
						formObj.cargo_tp_cd.value = $xml.find("cargo_tp_cd").text();
																								
					}						
					if(rmk_copy_chk == "Y"){
						formObj.rmk.value = $xml.find("rmk").text();
						
					}
				}
			}
			if(shpmt_itm_copy_chk != "Y"){
				frm1.frt_term_cd.value = "PP";
				frm1.cargo_tp_cd.value = "NOR";
			}
		}
		//#2348 [IMPEX] Pop up error message not closing after click OK
		cntrTpSzFlag = true;
	}
}


function checkTrdpCode(obj){
	if(obj.name=="shpr_trdp_nm"){
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
	}
}

function sheet4_OnSearchEnd(sheetObj, row, col) {
	if (sheetObj.GetEditable() == 0) {
		sheetObj.SetEditable(1);
	}
	
	sheetObj.SetBlur();	// IBSheet Focus out 처리
}

/*
 * function sheet4_OnChange(sheetObj, row, col, value){
 * switch(sheetObj.ColSaveName(col)){ case "cust_po_no": var
 * curVal=sheetObj.GetCellValue(row, "cust_po_no"); if(curVal==''){
 * sheetObj.SetCellValue(row, "po_sys_no",""); return; }else{ // PO 유효성 검증
 * if(!checkCustPoItem(sheetObj.GetCellValue(row, "cust_po_no"))){ //This
 * Container Number is already used!\nPlease check the P/O No.!
 * alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('PO'));
 * sheetObj.SetCellValue(row, "cust_po_no",'',0); sheetObj.SetCellValue(row,
 * "po_sys_no",'',0); sheetObj.SetCellValue(row, "buyr_trdp_nm",'',0);
 * sheetObj.SetCellValue(row, "vndr_trdp_nm",'',0); sheetObj.SetCellValue(row,
 * "org_loc_nm",'',0); sheetObj.SetCellValue(row, "dest_loc_nm",'',0);
 * sheetObj.SetCellValue(row, "ord_dt",'',0); sheetObj.SetCellValue(row,
 * "shpwin_fr_dt",'',0); sheetObj.SetCellValue(row, "shpwin_to_dt",'',0);
 * sheetObj.SelectCell(row, "cust_po_no"); } else {
 * ajaxSendPost(searchPoSysNoReq, 'reqVal',
 * '&goWhere=aj&bcKey=searchCustPoNo&s_cust_po_no='+sheetObj.GetCellValue(row,
 * 'cust_po_no'), './GateServlet.gsl'); } } break; } }
 */

/**
 * PO 중복확인
 */
function checkCustPoItem(inCustPoItem){
 	var intRows=docObjects[3].LastRow() +1;
	var loopNum=0;
	for(var i=2; i < intRows; i++){
		if(inCustPoItem==docObjects[3].GetCellValue(i, 'po_cmdt_seq')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}

/*
 * function sheet4_OnPopupClick(sheetObj, row, col) { var formObj=document.frm1;
 * var colStr=sheetObj.ColSaveName(col);
 *  // PO 조회 if(colStr == "cust_po_no"){ rtnary=new Array(8);
 * rtnary[0]=formObj.cnee_trdp_cd.value; rtnary[1]=formObj.cnee_trdp_nm.value;
 * rtnary[2]=formObj.shpr_trdp_cd.value; rtnary[3]=formObj.shpr_trdp_nm.value;
 * rtnary[4]=formObj.pol_cd.value; rtnary[5]=formObj.pol_nm.value;
 * rtnary[6]=formObj.pod_cd.value; rtnary[7]=formObj.pod_nm.value;
 * 
 * callBackFunc = "PO_POPLIST"; modal_center_open('./CMM_POP_0500.clt', rtnary,
 * 1300,500,"yes"); } }
 */

function PO_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("^^");
		var idx=docObjects[3].LastRow() + 1;
		
		for (var i=0; i < rtnValAry.length; i++) {
			if(rtnValAry[i] == ""){
				break;
			}
			gridAdd(3);
			
			var itemArr=rtnValAry[i].split("@@");
			docObjects[3].SetCellValue(idx, "cust_po_no",itemArr[0],0);
			docObjects[3].SetCellValue(idx, "cust_itm_id",itemArr[1],0);
			docObjects[3].SetCellValue(idx, "cust_itm_nm",itemArr[2],0);
			docObjects[3].SetCellValue(idx, "cmdt_pck_qty",itemArr[3],0);
			docObjects[3].SetCellValue(idx, "cmdt_pck_ut_cd",itemArr[4],0);
			docObjects[3].SetCellValue(idx, "cmdt_pck_ut_nm",itemArr[5],0);
			docObjects[3].SetCellValue(idx, "cmdt_pck_inr_qty",itemArr[6],0);
			docObjects[3].SetCellValue(idx, "cmdt_ea_cnt",itemArr[7],0);
			docObjects[3].SetCellValue(idx, "cmdt_ttl_qty",itemArr[8],0);
			docObjects[3].SetCellValue(idx, "cmdt_kgs_wgt",itemArr[9],0);
			docObjects[3].SetCellValue(idx, "cmdt_lbs_wgt",itemArr[10],0);
			docObjects[3].SetCellValue(idx, "cmdt_cbm_meas",itemArr[11],0);
			docObjects[3].SetCellValue(idx, "cmdt_cft_meas",itemArr[12],0);
			docObjects[3].SetCellValue(idx, "po_cmdt_seq",itemArr[13],0);
			docObjects[3].SetCellValue(idx, "po_sys_no",itemArr[14],0);
			
			// PO 유효성 검증
			if(!checkCustPoItem(docObjects[3].GetCellValue(idx, "po_cmdt_seq"))){
				// This Container Number is already used!\nPlease check the P/O
				// No.!
				alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('ITEM') + " (" + docObjects[3].GetCellValue(idx, "cust_itm_id") + ")");
				docObjects[3].SetCellValue(idx, "del","1",0);
				continue;
			}
			
			idx++;
		}
	}
	
	/*
	 * var formObj = document.frm1; if (rtnVal == "" || rtnVal == "undefined" ||
	 * rtnVal == undefined) { return; }else{ var curRow =
	 * docObjects[3].GetSelectRow(); var rtnValAry=rtnVal.split("|");
	 * 
	 * docObjects[3].SetCellValue(curRow, "cust_po_no",rtnValAry[0],0);
	 * docObjects[3].SetCellValue(curRow, "buyr_trdp_nm",rtnValAry[1],0);
	 * docObjects[3].SetCellValue(curRow, "vndr_trdp_nm",rtnValAry[2],0);
	 * docObjects[3].SetCellValue(curRow, "org_loc_nm",rtnValAry[3],0);
	 * docObjects[3].SetCellValue(curRow, "dest_loc_nm",rtnValAry[4],0);
	 * docObjects[3].SetCellValue(curRow, "ord_dt",rtnValAry[5],0);
	 * docObjects[3].SetCellValue(curRow, "shpwin_fr_dt",rtnValAry[6],0);
	 * docObjects[3].SetCellValue(curRow, "shpwin_to_dt",rtnValAry[7],0);
	 * docObjects[3].SetCellValue(curRow, "po_sys_no",rtnValAry[8],0);
	 * 
	 * sheet4_OnChange(docObjects[3], curRow, 4, ""); }
	 */
}

/*
 * function searchPoSysNoReq(reqVal){ var doc=getAjaxMsgXML(reqVal);
 * if(doc[0]=='OK'){ var curRow = docObjects[3].GetSelectRow();
 * if(typeof(doc[1])!='undefined'){ var rtnArr = doc[1].split('@@;'); var result =
 * rtnArr[0].split('@@^'); docObjects[3].SetCellValue(curRow,
 * 'po_sys_no',result[0],0); docObjects[3].SetCellValue(curRow,
 * 'buyr_trdp_nm',result[1],0); docObjects[3].SetCellValue(curRow,
 * 'vndr_trdp_nm',result[2],0); docObjects[3].SetCellValue(curRow,
 * 'org_loc_nm',result[3],0); docObjects[3].SetCellValue(curRow,
 * 'dest_loc_nm',result[4],0); docObjects[3].SetCellValue(curRow,
 * 'ord_dt',result[5],0); docObjects[3].SetCellValue(curRow,
 * 'shpwin_fr_dt',result[6],0); docObjects[3].SetCellValue(curRow,
 * 'shpwin_to_dt',result[7],0); }else{ alert(CODE_NOT_FND);
 * docObjects[3].SetCellValue(curRow, 'cust_po_no','',0);
 * docObjects[3].SetCellValue(curRow, 'po_sys_no','',0);
 * docObjects[3].SetCellValue(curRow, 'buyr_trdp_nm','',0);
 * docObjects[3].SetCellValue(curRow, 'vndr_trdp_nm','',0);
 * docObjects[3].SetCellValue(curRow, 'org_loc_nm','',0);
 * docObjects[3].SetCellValue(curRow, 'dest_loc_nm','',0);
 * docObjects[3].SetCellValue(curRow, 'ord_dt','',0);
 * docObjects[3].SetCellValue(curRow, 'shpwin_fr_dt','',0);
 * docObjects[3].SetCellValue(curRow, 'shpwin_to_dt','',0); } }else{
 * //alert(getLabel('SEE_BMD_MSG43')); } }
 */

function sheet4_OnChange(sheetObj, row, col, value){
	switch (sheetObj.ColSaveName(col)) {
		case "cmdt_pck_inr_qty" :
		case "cmdt_pck_qty" :
		case "cmdt_ea_cnt" :
		case "cmdt_kgs_wgt" :
		case "cmdt_lbs_wgt" :
		case "cmdt_cbm_meas" :
		case "cmdt_cft_meas" :
			if (value < 0) 
			{
				// Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	
	switch(sheetObj.ColSaveName(col)){
		case "cmdt_pck_inr_qty":
		case "cmdt_pck_qty":
		case "cmdt_ea_cnt":
			sheetObj.SetCellValue(row, "cmdt_ttl_qty", (Number(sheetObj.GetCellValue(row, "cmdt_pck_inr_qty")) * Number(sheetObj.GetCellValue(row, "cmdt_pck_qty"))) + Number(sheetObj.GetCellValue(row, "cmdt_ea_cnt")),0);
			break;
		
		case "cmdt_kgs_wgt":
			sheetObj.SetCellValue(row, "cmdt_lbs_wgt",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len),0);
			if (sheetObj.GetCellValue(row, "cmdt_lbs_wgt") >99999999.99) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));				
				sheetObj.SetCellValue(row, "cmdt_kgs_wgt","",0);
				sheetObj.SelectCell(row, "cmdt_kgs_wgt");
			}
			break;
			
		case "cmdt_lbs_wgt":
			sheetObj.SetCellValue(row, "cmdt_kgs_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len),0);
			break;
			
		case "cmdt_cbm_meas":
			sheetObj.SetCellValue(row, "cmdt_cft_meas",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_CBM_CFT, 3),0);
			if (sheetObj.GetCellValue(row, "cmdt_cft_meas") > 999999.999999) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGMEAS'));
				sheetObj.SetCellValue(row, "cmdt_cbm_meas","",0);
				sheetObj.SelectCell(row, "cmdt_cbm_meas");
			}
			break;
			
		case "cmdt_cft_meas":
			sheetObj.SetCellValue(row, "cmdt_cbm_meas",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_CBM_CFT, 3),0);
			break;
	}
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet4_OnDblClick(sheetObj,Row,Col){	
	if (sheetObj.GetCellValue(Row, "item_ibflag") == "R") {
		var colStr=sheetObj.ColSaveName(Col);
		var formObj=document.frm1;
		doProcess=true;
		formObj.f_cmd.value="";
		var paramStr="./OTH_OPR_0030.clt?f_cmd="+SEARCHLIST+'&f_po_sys_no='+sheetObj.GetCellValue(Row, 'po_sys_no')+"&f_cust_po_no="+sheetObj.GetCellValue(Row, "cust_po_no");
	   	parent.mkNewFrame('Purchase Order Entry', paramStr, "OTH_OPR_0030_SHEET_" + sheetObj.GetCellValue(Row, 'po_sys_no')+"_"+sheetObj.GetCellValue(Row, "cust_po_no"));
	}
}

/**
 * Vessel Popup이 BL_CODE_UTIL.js 공통함수 openPopUp를 호출하면서 Return 함수 필요
 */
function cobChange(){
	
}

var isError = false;

function createMBL(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		//if(doc[1]=='N'){
		if(true){
			
			ajaxSendPost(getLnrBkgNo, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgNo&bkg_seq='+frm1.bkg_seq.value, './GateServlet.gsl');
			
			if(v_lnr_bkg_no == ""){
				alert(getLabel('SAVE_CARRIER_BOOKING_ENTRY'));
				return;
			}
			if (frm1.bkg_sts_cd.value == 'BL'){
				if(!confirm(getLabel('FMS_COM_ALT142'))){
					return;
				}
			}
			// C.W Park.
			// 동일한 BKG_NO가 존재할 경우 Bug발생으로 Seq 까지 추가함.
			var paramStr="./SEE_BMD_0040.clt?f_cmd=130&f_lnr_bkg_no="+v_lnr_bkg_no + "&f_bkg_seq=" + frm1.bkg_seq.value 
			+ "&f_bkg_no=" + frm1.bkg_no.value + "&bkg_to_bl_flag=Y";
			// paramStr += "&asgn_usrid="+frm1.asgn_usrid.value;
			parent.mkNewFrame('Master B/L Entry', paramStr);
		}else{
			alert(getLabel('FMS_COM_ALT096'));
		}
	} else {
		// alert(getLabel('SEE_BMD_MSG43'));
	}
}

var v_lnr_bkg_no = "";

function getLnrBkgNo(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if(typeof(doc[1])!='undefined'){
			v_lnr_bkg_no = doc[1];
			return;
		}
	}
	
	//(2017/06/08 1차)  릴리스 테스트 내역 - 미진 사항 
	v_lnr_bkg_no ="";
}

function cntrGridAddCustom(obj){
	/*
	 * frm1.f_bkg_no.value = trim(frm1.f_bkg_no.value); if (frm1.f_bkg_no.value ==
	 * '') { alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') +
	 * "\n\n: BL_FRT.444"); return; }
	 */
	cntrGridAdd(obj);
}
function calculatorCntr(){
	var cntrQty = {};
	for(var i=0;i<docObjects[1].RowCount();i++){
		var dtmp = docObjects[1].GetRowJson(i+1);
		if(dtmp.cntr_tpsz_cd && dtmp.cntr_tpsz_cd && dtmp.cntr_tpsz_cd != "0" && dtmp.del != "1"){
			if(cntrQty[dtmp.cntr_tpsz_cd]){
				cntrQty[dtmp.cntr_tpsz_cd] += parseInt(dtmp.qty);
			}else{
				cntrQty[dtmp.cntr_tpsz_cd] = parseInt(dtmp.qty);
			}
		}
	}
	
	var first = true;
	frm1.cntr_info.value = "";
	for(key in cntrQty){
		if(!first) {frm1.cntr_info.value += ", ";}
		first=false;
		frm1.cntr_info.value += key+' X '+cntrQty[key];
	}
}

// docObjects[1] 제거
// #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발 (TB_BKG_CNTR제거)
function calculatorCntr_list(){
	var cntrQty = {};
	for(var i=docObjects[2].HeaderRows(); i <= docObjects[2].LastRow(); i++) {
		if("1" != docObjects[2].GetCellValue(i, 'del')){
		
			var cnt=0;
			var tpSzCd = docObjects[2].GetCellValue(i, 'l_cntr_tpsz_cd');
			for(var j=docObjects[2].HeaderRows(); j <= docObjects[2].LastRow(); j++) {
				if(tpSzCd == docObjects[2].GetCellValue(j, 'l_cntr_tpsz_cd')){
					cnt+=1;
				}
			}
			
			/*
			 * var chkDup = true; for(key in cntrQty){ if(key ==
			 * docObjects[2].GetCellValue(i, 'l_cntr_tpsz_cd')){ chkDup =false; } }
			 * 
			 * if(chkDup){ if(cntrQty[docObjects[2].GetCellValue(i,
			 * 'l_cntr_tpsz_cd')]){ cntrQty[docObjects[2].GetCellValue(i,
			 * 'l_cntr_tpsz_cd')] += cnt; }else{
			 * cntrQty[docObjects[2].GetCellValue(i, 'l_cntr_tpsz_cd')] = cnt; } }
			 */
			
			cntrQty[docObjects[2].GetCellValue(i, 'l_cntr_tpsz_cd')] = cnt;
		}
	}
	
	var first = true;
	frm1.cntr_info.value = "";
	for(key in cntrQty){
		if(!first) {frm1.cntr_info.value += ", ";}
		first=false;
		frm1.cntr_info.value += key+' X '+cntrQty[key];
	}	
	
}

function sheet2_OnChange(sheetObj, row, col, value){
	calculatorCntr();
	setFrCntrList();
}

// 이벤트 중복 제거
/*function sheet3_OnChange(sheetObj, row, col, value){
	
	switch(sheetObj.ColSaveName(col)){
		case "l_cntr_no":
			// Contaienr Number 유효성 검증
			if(sheetObj.GetCellValue(row, "l_cntr_no") != ''){
				var rtnVal=cntrNumCheck(sheetObj.GetCellValue(row, "l_cntr_no"));
				if(rtnVal){		// 정상인경우
					// 중복 확인
					if(!checkCntrNo(sheetObj.GetCellValue(row, "l_cntr_no"))){
						// This Container Number is already used!\nPlease check
						// the Container Number!
						alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('FMS_COD_CNTR'));
						sheetObj.SetCellValue(row, "l_cntr_no",'',0);
						sheetObj.SelectCell(row, "l_cntr_no");
					}
				}
				else{
					// Proceed anyway? ...???
					if(confirm(getLabel('FMS_COM_CFMCON')) == false){
						sheetObj.SetCellValue(row, "l_cntr_no",'',0);
						sheetObj.SelectCell(row, "l_cntr_no");
					}else{
						// 중복 확인
						if(!checkCntrNo(sheetObj.GetCellValue(row, "l_cntr_no"))){
							// This Container Number is already used!\nPlease
							// check the Container Number!
							alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('FMS_COD_CNTR'));
							sheetObj.SetCellValue(row, "l_cntr_no",'',0);
							sheetObj.SelectCell(row, "l_cntr_no");
						}
					}
				}
			}
		break;
	}
	
	// #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발 (TB_BKG_CNTR제거)
	calculatorCntr_list();
	setFrCntrList();
}*/

function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet3_OnSelectMenu(sheetObj, MenuString){
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

/**
 * Container번호 중복확인
 */
function checkCntrNo(inCntrNo){
 	var intRows=docObjects[2].LastRow() +1;
	var loopNum=0;
	for(var i=1; i < intRows; i++){
		if(inCntrNo==docObjects[2].GetCellValue(i, 'l_cntr_no')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}

function searchGrid(gridIdx){
	switch(gridIdx){
		case 1:
			// Selling/Debit Freight 조회
			frm1.f_cmd.value=SEARCHLIST04;
 			docObjects[4].DoSearch("./SEE_BMD_0500_4GS.clt", FormQueryString(frm1) );
			break;
		case 2:
			// Buying/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST05;
 			docObjects[6].DoSearch("./SEE_BMD_0500_5GS.clt", FormQueryString(frm1) );
			break;
		case 3:
			// Debit/Crebit List 조회
			frm1.f_cmd.value=SEARCHLIST06;
 			docObjects[5].DoSearch("./SEE_BMD_0500_6GS.clt", FormQueryString(frm1) );
			break;
		case 4:
			// Freight될 Container 조회
			// frm1.f_cmd.value=SEARCHLIST01;
 			// docObjects[8].DoSearch("./SEE_FRT_0010GS.clt",
			// FormQueryString(frm1) );
 			
 			// #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발
			frm1.f_cmd.value=SEARCHLIST08;
			docObjects[8].DoSearch("./SEE_BMD_0500_8GS.clt", FormQueryString(frm1) );
 			break;
 			
		case 5:
			// work Order 조회
			frm1.f_cmd.value=SEARCHLIST11;
			docObjects[9].DoSearch("./SEE_BMD_0500_9GS.clt", FormQueryString(frm1));
			break; 		 			
 			
 			
	}
}

function getSdSheet(){
	return docObjects[4];
}
function getBcSheet(){
	return docObjects[6];
}
function getDcSheet(){
	return docObjects[5];
}
function sheet5_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, '', 'S', 'O', 'M');
	}else{
		mutiSheetOnClick(sheetObj, row, col, '');
	}
	
// mutiSheetOnClick(sheetObj, row, col, '');
}

function sheet4_OnPopupClick(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	
	if(colStr=="item_shp_cmdt_cd"){
		gridPopCall(sheetObj, row, col, 'item_shp_cmdt_cd');
	}
}

function sheet5_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, '');
}
function sheet5_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'M'); 
	}
	
// mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'M');
}
function sheet5_OnChange(sheetObj, row, col, value) {
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
	}
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col, '', 'S', 'O', 'M'); 
}
function sheet5_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
	
	setFrCntrList();
	
	// BL_COPY
	/*
	 * if (frm1.copy_bl_seq.value != '') { setBlFrtCopy(sheetObj, '', 'S', 'O',
	 * 'M'); }
	 */ 	

	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "fr_att_file_1", 0);
	}
	
}
function sheet5_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}
function sheet5_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'M');  
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "fr_del_chk" == sheetObj.ColSaveName(col)){
			// gridAdd(4);
			// sheetObj.SelectCell(sheetObj.LastRow, 0);
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
function sheet6_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "b_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col-1, 'b_', 'S', 'O', 'M');
	}else{
		mutiSheetOnClick(sheetObj, row, col, 'b_');
	}
	
// mutiSheetOnClick(sheetObj, row, col, 'b_');
}
function sheet6_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'b_');
}
function sheet6_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "b_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'O', 'M'); 
	}

// mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'O', 'M');
}
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
				// Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}*/
		break;
	}
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col,  'b_', 'S', 'O', 'M'); 
}
function sheet6_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
	
	setFrCntrList();
	
	// BL_COPY
	/*
	 * if (frm1.copy_bl_seq.value != '') { setBlFrtCopy(sheetObj, 'b_', 'S',
	 * 'O', 'M'); }
	 */	
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "b_fr_att_file_1", 0);
	}
}
function sheet6_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
}
function sheet6_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="b_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'O', 'M'); 
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "b_fr_del_chk" == sheetObj.ColSaveName(col)){
			// gridAdd(5);
			// sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('BCROWADD', docObjects[6], 'S', 'O', 'M');
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
				// Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}*/
		break;
	}
}
function sheet7_OnClick(sheetObj, row, col){
	if(sheetObj.ColSaveName(col) == "dc_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col - 1, 'dc_', 'S', 'O', 'M');
	}else{
		mutiSheetOnClick(sheetObj, row, col, '');
	}
	
// mutiSheetOnClick(sheetObj, row, col, 'dc_');
}
function sheet7_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'dc_');
}
function sheet7_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col) != "dc_fr_att_file_1"){
		mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'M');
	}

// mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'M');
}
function sheet7_OnChange(sheetObj, row, col, value) {
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
	mutiSheetOnChange(sheetObj, row, col,  'dc_', 'S', 'O', 'M');
}
function sheet7_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
	
	setFrCntrList();
	
	// BL_COPY
	/*
	 * if (frm1.copy_bl_seq.value != '') { setBlFrtCopy(sheetObj, 'dc_', 'S',
	 * 'O', 'M'); }
	 */
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "dc_fr_att_file_1", 0);
	}
}
function sheet7_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
}
function sheet7_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="dc_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow()== row && "dc_fr_del_chk" == sheetObj.ColSaveName(col)){
			// gridAdd(6);
			// sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('DCROWADD', docObjects[5], 'S', 'O', 'M');
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

function afterRowAdd(type){
	if(type == "AR"){
		for(var i=2; i<=docObjects[4].LastRow(); i++){
			docObjects[4].SetCellImage(i, "fr_att_file_1", 0);
		}
	}else if(type == "DC"){
		for(var i=2; i<=docObjects[5].LastRow(); i++){
			docObjects[5].SetCellImage(i, "dc_fr_att_file_1", 0);
		}
	}else{
		for(var i=2; i<=docObjects[6].LastRow(); i++){
			docObjects[6].SetCellImage(i, "b_fr_att_file_1", 0);
		}
	}
}

function setFrCntrList(){
	var TPSZCD1=' |';
	
	var curSheet = docObjects[2];
	var frtSheet = docObjects[8];
	
	// sheet를 초기화한다.
	frtSheet.RemoveAll();
	
	var rowCnt=1;
	for(var i=1 ; i<curSheet.LastRow()+1 ; i++){
		// #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발 중복제거
		var dupRow = frtSheet.FindText(0, curSheet.GetCellValue(i,"l_cntr_tpsz_cd"), 0);
		if(dupRow < 0){
			cntrGridAdd(frtSheet);
			frtSheet.SetCellValue(rowCnt, 0, curSheet.GetCellValue(i,"l_cntr_tpsz_cd"));
			rowCnt++;
		}
	}
	
	for(var i=1;i<frtSheet.RowCount()+1;i++){
		if("1" != frtSheet.GetCellValue(i, 'del')){
			TPSZCD1 += frtSheet.GetCellValue(i,0);
			if(i < frtSheet.RowCount()){TPSZCD1 += "|";}
		}
	}
	
	sheet5.SetColProperty("fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD1} );
	sheet6.SetColProperty("b_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD1} );
	sheet7.SetColProperty("dc_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD1} );
}

function sheet8_OnSearchEnd(sheetObj, row, col) {
	var rsn_txt = "";
	for(var i=1; i<=sheetObj.LastRow(); i++){
		if(sheetObj.GetCellValue(i,"bkg_sts_cd") == "RJ" || sheetObj.GetCellValue(i,"bkg_sts_cd") == "CN"){
			sheetObj.SetCellImage(i, "rsn_txt_img", 0);
			if(rsn_txt != ""){
				rsn_txt += "\n";
			}
			rsn_txt += sheetObj.GetCellText(i,"rgst_usrid") + " " + sheetObj.GetCellText(i,"rgst_tms") + " - " + "[" + sheetObj.GetCellText(i,"bkg_sts_cd") + "] " + sheetObj.GetCellText(i,"rsn_txt");
		}
	}
	frm1.rsn_txt.value = rsn_txt;
}

function sheet8_OnClick(sheetObj, Row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if (colStr == "rsn_txt_img") {
		 if(sheetObj.GetCellValue(Row,"bkg_sts_cd") == "RJ" || sheetObj.GetCellValue(Row,"bkg_sts_cd") == "CN"){
			 ComShowMemoPad4(sheetObj, Row, "rsn_txt", true, 250, 130, col, "rsn_txt");   
		 }
	}
}

var vBkgModiTms;

function chkBkgModiTms(flag){
	var returnVal=true;
	var formObj=document.frm1; 
	var bkg_seq =  formObj.bkg_seq.value;
 	 
	if (flag == "VIEW"){ // 조회시
		ajaxSendPost(getBkgViewModiTms, 'reqVal', '&goWhere=aj&bcKey=searchBkgSeqModiTms&bkg_seq='+bkg_seq, './GateServlet.gsl');  
	}else{ // 수정 삭제시
		ajaxSendPost(getBkgModiTms, 'reqVal', '&goWhere=aj&bcKey=searchBkgSeqModiTms&bkg_seq='+bkg_seq, './GateServlet.gsl');
		if (vBkgModiTms != frm1.trx_modi_tms.value) {
			returnVal=false;
		}
	 	 
	 	if(!returnVal){
	 		// Booking 이 변경된 경우
			alert(getLabel('SEA_COM_ALT034')); 
	 	}
		return returnVal;
	}
}
function getBkgViewModiTms(reqVal){
	vBkgModiTms='';
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			frm1.trx_modi_tms.value=doc[1];
		}
	}
}
function getBkgModiTms(reqVal){
	vBkgModiTms='';
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			vBkgModiTms=doc[1];
		}
	}
}

/**
 * Container Sheet Object를 리턴함
 */
function getCrtrSheet(){
	// CNTR의 Unit Combo정보를 담을 Sheet를 만든다.
	var curSheet = docObjects[2];
	var frtSheet = docObjects[8];
	
	// sheet를 초기화한다.
	frtSheet.RemoveAll();
	
	/*
	 * for(var i=1 ; i<curSheet.LastRow()+1 ; i++){ cntrGridAdd(frtSheet);
	 * frtSheet.SetCellValue(i, 0, curSheet.GetCellValue(i,"l_cntr_tpsz_cd"));
	 * frtSheet.SetCellValue(i, 1, curSheet.GetCellValue(i,"qty")); }
	 */
	
	// #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발 (TB_BKG_CNTR제거)
	var cntrQty = {};
	for(var i=curSheet.HeaderRows(); i <= curSheet.LastRow(); i++) {
		if("1" != curSheet.GetCellValue(i, 'del')){
			var cnt=0;
			var tpSzCd = curSheet.GetCellValue(i, 'l_cntr_tpsz_cd');
			for(var j=curSheet.HeaderRows(); j <= curSheet.LastRow(); j++) {
				if(tpSzCd == curSheet.GetCellValue(j, 'l_cntr_tpsz_cd')){
					cnt+=1;
				}
			}
			cntrQty[curSheet.GetCellValue(i, 'l_cntr_tpsz_cd')] = cnt;
		}
	}
	
	var instRow = 1;
	for(key in cntrQty){
		cntrGridAdd(frtSheet);
		frtSheet.SetCellValue(instRow, 0, key);
		frtSheet.SetCellValue(instRow, 1, cntrQty[key]);
		instRow += 1;
	}	
	

	setFrtCntrUnitCombo(frtSheet);
	return frtSheet;
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
	sheet5.SetColProperty("fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	sheet6.SetColProperty("b_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
	sheet7.SetColProperty("dc_fr_cntr_tpsz_cd", {ComboText:TPSZCD1, ComboCode:TPSZCD2} );
}

function setBkgInitStsCdVal(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		BKG_INIT_STATUS = doc[1];
	}else{
		BKG_INIT_STATUS = "CR";
	}
}

function setRfCntrCols(reqVal){

	var sheetObj = docObjects[2];
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			var flgVal = doc[1].split("|");
			var rowIdx = sheetObj.GetSelectRow();
			var tempFlg = flgVal[0];
			var ventFlg = flgVal[1];
			
			if(tempFlg == "Y"){
				sheetObj.SetCellEditable(rowIdx,"rc_flg",1);
				sheetObj.SetCellEditable(rowIdx,"temp_val",1);
				sheetObj.SetCellEditable(rowIdx,"temp_cd",1);
				sheetObj.SetCellEditable(rowIdx,"mgset_flg",1);
				sheetObj.SetCellEditable(rowIdx,"ca_flg",1);
//				sheetObj.SetCellEditable(rowIdx,"air_flow",1);
//				sheetObj.SetCellEditable(rowIdx,"air_flow_unit",1);
				sheetObj.SetCellEditable(rowIdx,"humid",1);
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
				
			}
			if(ventFlg == "Y"){ 
				sheetObj.SetCellEditable(rowIdx, "vent_cd", 1);
			}else{
				sheetObj.SetCellEditable(rowIdx, "vent_cd", 0);
				sheetObj.SetCellValue(rowIdx,"vent_cd", "");
			}
			
		}
	}
}

function setVentCols(reqVal){
	var sheetObj = docObjects[2];
	var doc = getAjaxMsgXML(reqVal);
	var row = sheetObj.GetSelectRow();
	
	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		var objVal = doc[1].split("|");
		var ventFlg = objVal[1];
		if(ventFlg == "Y"){ 
			sheetObj.SetCellEditable(row, "vent_cd", 1);
		}else{
			sheetObj.SetCellEditable(row, "vent_cd", 0);
			sheetObj.SetCellValue(row,"vent_cd", "");
		}
	}
}

function setBkgEditStsCdVal(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		BKG_EDIT_MODE = doc[1];
	}else{
		BKG_EDIT_MODE = "[CR]:Y,[RD]:N,[RJ]:Y,[CF]:N,[CN]:Y,[BL]:N";
	}
}

function getBkgEditMode(bkg_sts_cd){
	var rtnValAry=BKG_EDIT_MODE.split(",");
	var bkg_edit_mode = "N";
	
	for (var i=0; i < rtnValAry.length; i++) {
		var result = rtnValAry[i].split(":");
		if(result[0] == "[" + bkg_sts_cd + "]"){
			bkg_edit_mode = result[1];
		}
	}
	
	return bkg_edit_mode;
}

function POPUP_REJECT_CANCEL(retArray){
	if(retArray == "SUCCESS"){
		doWork('SEARCHLIST');
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

function shipModeChange(){
	var formObj=document.frm1;
	if (formObj.shp_mod_cd.value == 'FCL' || formObj.shp_mod_cd.value == 'BLK') {
		formObj.to_svc_term_cd.value='CY';
		formObj.fm_svc_term_cd.value='CY';
	} else {
		formObj.to_svc_term_cd.value='CF';
		formObj.fm_svc_term_cd.value='CF';
	}
}

function cntrGridCopyCustom(sheetObj){
	if(frm1.shp_mod_cd.value=="FCL"){
 		var orgCnt=sheetObj.LastRow() + 1;
		var intRows=orgCnt;
		
		var row = sheetObj.GetSelectRow();
		var copyCnt = parseInt(intRows,10)+ parseInt(frm1.copy_cnt.value,10);
		
		if(intRows<=1){
			cntrGridAdd(sheetObj);
		}
		else if(intRows<3 && typeof(sheetObj.GetCellValue(intRows, 'l_cntr_tpsz_cd'))=="undefined"){
			cntrGridAdd(sheetObj);
		}
		else{
			
			for(var i=intRows; i< copyCnt ; i++){
				var curRow=sheetObj.DataInsert();
				sheetObj.SetCellValue(curRow, 'l_cntr_tpsz_cd' ,sheetObj.GetCellValue(row, 'l_cntr_tpsz_cd'),0);	
				//#3520 reefer용 column 추가
				sheetObj.SetCellValue(curRow, 'rc_flg' ,sheetObj.GetCellValue(row, 'rc_flg'),0);
				sheetObj.SetCellValue(curRow, 'temp_val' ,sheetObj.GetCellValue(row, 'temp_val'),0);
				sheetObj.SetCellValue(curRow, 'temp_cd' ,sheetObj.GetCellValue(row, 'temp_cd'),0);			
				sheetObj.SetCellValue(curRow, 'mgset_flg' ,sheetObj.GetCellValue(row, 'mgset_flg'),0);			
				sheetObj.SetCellValue(curRow, 'vent_cd' ,sheetObj.GetCellValue(row, 'vent_cd'),0);			
				sheetObj.SetCellValue(curRow, 'ca_flg' ,sheetObj.GetCellValue(row, 'ca_flg'),0);			
				sheetObj.SetCellValue(curRow, 'air_flow' ,sheetObj.GetCellValue(row, 'air_flow'),0);			
				sheetObj.SetCellValue(curRow, 'air_flow_unit' ,sheetObj.GetCellValue(row, 'air_flow_unit'),0);			
				sheetObj.SetCellValue(curRow, 'humid' ,sheetObj.GetCellValue(row, 'humid'),0);			

				
				sheetObj.SetCellValue(curRow, 'l_seal_no'    ,sheetObj.GetCellValue(row, 'l_seal_no'),0);
				sheetObj.SetCellValue(curRow, 'cntr_ref_no'  ,sheetObj.GetCellValue(row, 'cntr_ref_no'),0);
	// sheetObj.CellValue2(orgCnt, 'seal_no3') = sheetObj.CellValue(orgCnt-1,
	// 'seal_no3');
				sheetObj.SetCellValue(curRow, 'l_mty_out_dt',sheetObj.GetCellValue(row, 'l_mty_out_dt'),0);
				sheetObj.SetCellValue(curRow, 'l_mty_out_tm',sheetObj.GetCellValue(row, 'l_mty_out_tm'),0);
				sheetObj.SetCellValue(curRow, 'l_full_rtn_dt',sheetObj.GetCellValue(row, 'l_full_rtn_dt'),0);
				sheetObj.SetCellValue(curRow, 'l_full_rtn_tm',sheetObj.GetCellValue(row, 'l_full_rtn_tm'),0);
				
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


function cntrQtyGridAddCustom(sheetObj){
	var formObj=document.frm1; 
	var add_cntr_tpsz_cd=formObj.add_cntr_tpsz_cd.value;
	var cntr_q_ty=Number(eval((formObj.cntr_q_ty.value.replaceAll(",",""))));
	if(add_cntr_tpsz_cd==""){
		alert(getLabel('SEA_COM_ALT025'));
		return;
	}
	if(cntr_q_ty=="" || cntr_q_ty < 1){
		alert(getLabel('SEA_COM_ALT026'));
		return;
	}
	var intRows=sheetObj.LastRow();
	// var orgCnt=sheetObj.LastRow() + 1;
 	// var intRows=orgCnt-1;
 	var add_qty=(intRows+1) + cntr_q_ty;
 	for(var i=intRows+1; i<add_qty; i++){
	 	var curRow=sheetObj.DataInsert();
	 	sheetObj.SetCellValue(curRow, 'l_cntr_tpsz_cd',add_cntr_tpsz_cd,0);
 	}
 	sheet3_OnChange(sheetObj);
}
function checkBoxSetting(){
	var formObj=document.frm1;
	if(formObj.trkg_svc_flg.value=="Y"){
		formObj.trkg_svc_flg.checked=true;
	}else{
		formObj.trkg_svc_flg.checked=false;
	}
	if(formObj.cstms_svc_flg.value=="Y"){
		formObj.cstms_svc_flg.checked=true;
	}else{
		formObj.cstms_svc_flg.checked=false;
	}
	
}

function checkBoxSave(){
	var formObj=document.frm1;
	if(formObj.trkg_svc_flg.checked){
		formObj.trkg_svc_flg.value ="Y";
	}else{
		formObj.trkg_svc_flg.value ="N";
	}
	if(formObj.cstms_svc_flg.checked){
		formObj.cstms_svc_flg.value="Y";
		
	}else{
		formObj.cstms_svc_flg.value="N";
	}
}

function sheet10_OnDblClick(sheetObj, row, col){
    
	  var paramStr="./AIC_WOM_0022.clt?air_sea_clss_cd=S&bnd_clss_cd=O&biz_clss_cd=CA";
    var param = "&f_cmd=" + SEARCH;
    param += "&f_wo_no=" + sheetObj.GetCellValue(row, 'wo_no');
    param += "&bkg_seq=" + frm1.bkg_seq.value;
    parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param); 
	}



function sheet3_OnChange(sheetObj, row, col, value){
	// alert(sheetObj.ColSaveName(col));
	var formObj=document.frm1;
	
	switch (sheetObj.ColSaveName(col)) {
		case "cgo_pgk_qty" :
		case "cgo_kgs_wgt" :
		case "cgo_lbs_wgt" :
		case "cgo_cbm_qty" :
		case "cgo_cft_qty" :
			if (value < 0) 
			{
				// Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
		
		case "l_cntr_tpsz_cd":
			formObj.f_cntr_tpsz.value = value;
			ajaxSendPost(setRfCntrCols, "reqVal", "&goWhere=aj&bcKey=selectContainerTPSZFlags&cntr_tpsz_cd="+value, "./GateServlet.gsl");
//			ajaxSendPost(setVentCols, 'reqVal', '&goWhere=aj&bcKey=selectContainerTPSZFlags&cntr_tpsz_cd='+value, './GateServlet.gsl');
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
			
		case "vent_cd":
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
	
	var cntrColStr="l_cntr_no";
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
		case "cgo_kgs_wgt":
			sheetObj.SetCellValue(row, "cgo_lbs_wgt",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len),0);
			if (sheetObj.GetCellValue(row, "cgo_lbs_wgt") >99999999.99) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));				
				sheetObj.SetCellValue(row, "cgo_kgs_wgt","",0);
				sheetObj.SelectCell(row, "cgo_kgs_wgt");
			}
			break;
		case "cgo_lbs_wgt":
			sheetObj.SetCellValue(row, "cgo_kgs_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len),0);
			break;
		case "cgo_cbm_qty":
			sheetObj.SetCellValue(row, "cgo_cft_qty",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_CBM_CFT, 3),0);
			if (sheetObj.GetCellValue(row, "cgo_cft_qty") > 999999.999999) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGMEAS'));
				sheetObj.SetCellValue(row, "cgo_cbm_qty","",0);
				sheetObj.SelectCell(row, "cgo_cbm_qty");
			}
			break;
		case "cgo_cft_qty":
			sheetObj.SetCellValue(row, "cgo_cbm_qty",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_CBM_CFT, 3),0);
			break;
	}
	
	// #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발 (TB_BKG_CNTR제거)
	calculatorCntr_list();
	setFrCntrList();
		
	/* #1904 [Split - 1] [CLT] CONTAINER LIST, DEBIT/CREDIT NOTE ERROR */
	var sumFlag='N';
	var colNm=sheetObj.ColSaveName(col);
	if(colNm == "cgo_pgk_qty" || colNm == "cgo_kgs_wgt" || colNm == "cgo_lbs_wgt" || colNm == "cgo_cbm_qty" || colNm == "cgo_cft_qty" || colNm == "del")
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
			if(sheetObj.GetCellValue(i, "del") == 0)
		   {			
				cgo_pck_qty=parseInt(cgo_pck_qty) 			+ parseInt(sheetObj.GetCellValue(i,"cgo_pgk_qty"));
				meas=roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_cbm_qty")), 6);
				meas1=roundXL(parseFloat(meas1), 6) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_cft_qty")), 6);
				grs_wgt=roundXL(parseFloat(grs_wgt), obl_decimal_len) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_kgs_wgt")), obl_decimal_len);
				grs_wgt1=roundXL(parseFloat(grs_wgt1), obl_decimal_len) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_lbs_wgt")), obl_decimal_len);
		   }
		}
		
		var formObj=document.frm1;
		if((colNm == "cgo_pgk_qty" || colNm == "del") && cgo_pck_qty > 0){
			formObj.pck_qty.value=cgo_pck_qty;		
		}
		if((colNm == "cgo_kgs_wgt" || colNm == "cgo_lbs_wgt" || colNm == "del") && grs_wgt > 0){
			
			formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(obl_decimal_len));
			formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, obl_decimal_len);			
			chkComma(formObj.grs_wgt1,8,obl_decimal_len);	
					
			formObj.grs_wgt1.value=doMoneyFmt(Number(grs_wgt1).toFixed(obl_decimal_len));
			formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(obl_decimal_len)); 			
			chkComma(formObj.grs_wgt,8,obl_decimal_len);			
				
		}	
		if((colNm == "cgo_cbm_qty" || colNm == "cgo_cft_qty" || colNm == "del") && meas > 0){
			
			formObj.meas.value=doMoneyFmt(Number(meas).toFixed(3));
			formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, 3);			
			chkComma(formObj.meas1,8,3);
			
			formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(3));
			formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, 3);			
			chkComma(formObj.meas,8,3);
			
		}				
	}
	/* #1904 End */	
	
	// #4767 [BINEX LA] KEY DOES NOT WORK AFTER INPUT CARRIER BOOKING CONTAINER
	sheetObj.SetFocus();
	
}


function sheet3_OnSearchEnd(sheetObj, row, col) {
 	for (var idx=1; idx < sheetObj.LastRow() + 1; idx++) {
 		var lRcFlg = sheetObj.GetCellValue(idx,"l_rc_flg");
 		var rcFlg = sheetObj.GetCellValue(idx,"rc_flg");
 		var lVentFlg = sheetObj.GetCellValue(idx,"l_vent_flg");
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
 	 		if(lRcFlg == "R"){
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
 		
 		if(lVentFlg == "Y" ){
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
 	sheetObj.SetBlur();	//IBSheet Focus out 처리
}


function setOriBl(bltp){
	if(bltp.value=="O"){
		frm1.org_bl_qty.value="3";
	}else {
		frm1.org_bl_qty.value="0";
	}
}

function checkCstmsCd() {
	if (frm1.cstms_svc_flg.checked)	{
		frm1.cstms_tp_cd.disabled =false;
		
	} else {
		frm1.cstms_tp_cd.value = "";
		frm1.cstms_tp_cd.disabled =true;
	}
	
}

function setDecimalLen(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		obl_decimal_len = doc[1];
	}else{
		obl_decimal_len = "3";
	}
}

//#3520 Reefer flag 가 Y 일때 Unit 입력 체크 로직 추가
function checkRfCntrUnit(){
	var sheetObj = docObjects[2];
 	for (var idx=1; idx < sheetObj.LastRow() + 1; idx++) {
 		var rcFlg = sheetObj.GetCellValue(idx,"rc_flg");
 		var tempCd = sheetObj.GetCellValue(idx,"temp_cd");
 		if(rcFlg == "Y" && tempCd == ""){
 			var objArr = new Array();
 			objArr[0] = idx;
 			alert(getLabel2('SEA_COM_ALT041', objArr));
 	 		return true;
 		}
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