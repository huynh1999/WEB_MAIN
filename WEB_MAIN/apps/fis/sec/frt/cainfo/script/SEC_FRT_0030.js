/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_FRT_0030.js
*@FileTitle  : Correction Advice
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var formObj=document.form;
    switch(srcName) {
   		case "SEARCH01":
		    formObj.f_cmd.value=SEARCH01;
        	doShowProcess();
//            formObj.action="./SEC_FRT_0030.clt";
//            formObj.submit();
        	submitForm();
   	   	break;
   	   	case "SEARCHLIST":
		   doWork("SEARCH02");
   	   	break;
   	   	case "SEARCH02":
   	   		if(formObj.ca_no.value==""){
   	   			//Please enter a [CA NO]!
   	   			alert(getLabel('FMS_COM_ALT014'));
   	   			formObj.ca_no.focus();
   	   			break;
   	   		}else{
   	   			formObj.f_cmd.value=SEARCH02;
//   	   			doShowProcess();
//   	   			formObj.action="./SEC_FRT_0030.clt";
//   	   			formObj.submit();
   	   		submitForm();
   	   		}
   	   		break;
   	   	case "SEARCH03":
   	   		//MBL Search
   	   		formObj.f_cmd.value=SEARCH03;
//   	   		doShowProcess();
//   	   		formObj.action="./SEC_FRT_0030.clt";
//   	   		formObj.submit();
   	   	submitForm();
   	    break;
   	   	case "SEARCH04":
	   		formObj.ca_no.value=formObj.s_ca_no.value;
         	formObj.f_cmd.value=SEARCH02;
//	    	doShowProcess();
//	        formObj.action="./SEC_FRT_0030.clt";
//	        formObj.submit();
         	submitForm();
	   	break;
		case "SAVE":
			/*
			if(formObj.house_bl_no.value==""){
				var blTxt=getLabel('FMS_COD_HBNO');
				if(formObj.air_sea_clss_cd.value=='A'){
					 blTxt=getLabel('FMS_COD_HANO');
				}
				alert(getLabel('FMS_COM_ALT007')+'\n-'+ blTxt);  
				break;
			}else if(formObj.cls_flg.value!="N"){
			*/
			var biz_cls_cd=formObj.biz_clss_cd.value;
			if(biz_cls_cd == 'H')
			{
				if(formObj.house_bl_no.value==""){
					var blTxt=getLabel('FMS_COD_HBNO');
					if(formObj.air_sea_clss_cd.value=='A'){
						 blTxt=getLabel('FMS_COD_HANO');
					}
					alert(getLabel('FMS_COM_ALT007')+'\n-'+ blTxt);  
					break;
				}
			}else if(biz_cls_cd == 'M')
			{
				if(formObj.master_bl_no.value==""){
					var blTxt=getLabel('FMS_COD_MBLN');
					if(formObj.air_sea_clss_cd.value=='A'){
						 blTxt=getLabel('FMS_COD_MBLN');
					}
					alert(getLabel('FMS_COM_ALT007')+'\n-'+ blTxt);  
					break;
				}
			}
			if(formObj.cls_flg.value!="N"){
		   		//Not Closed B/L. Please confirm.
				alert(getLabel('SEA_COM_ALT001'));
            	break;
			}
//			else if(formObj.house_bl_no.value==""){
//		   		//Please enter a [House B/L Number]!
//            	break;
//
//			}
			else if(formObj.master_ca_sts_cd.value=="I"){
				//There is a registered CA among House B/L of Master B/L. Please confirm.
		   		alert(getLabel('SEA_COM_ALT002'));
            	break;
			}else{
				chkBoxVal();
				/*if(formObj.ca_seq.value!=""){
					if(formObj.ca_sts_cd.value=="C"){
						alert("이미 CONFIRM된 건입니다.");
						break;
					}
				}*/
				formObj.ca_sts_cd.value="I";
				//if(formObj.ca_seq.value==""){
					formObj.f_cmd.value=ADD;
					if(checkAddModiVal(formObj)){
						//Do you want to ISSUE?
			            //if(confirm(getLabel('FMS_COM_CFMISS'))){
			            if(confirm(getLabel('FMS_COM_CFMSAV'))){
			            	formObj.save_yn.value="Y";
//		            	    doShowProcess();
//				            formObj.action="./SEC_FRT_0030.clt";
//				            formObj.submit();
			            	submitForm();
			            }
			        }
	           // }
			}
       	break;
		case "CONFIRM":
			if(formObj.ca_seq.value==""){
				//You can CONFIRM after [CA Issue].
				alert(getLabel('SEA_COM_ALT003'));
				break;
			}
			if(formObj.usr_id.value!=formObj.rgst_usrid.value){
				//Not permitted to CONFIRM.
				alert(getLabel('SEA_COM_ALT004'));
				break;
			}
//			if(formObj.house_bl_no.value==""){
//		   		//Please enter a [House B/L Number]!
//            	break;
//			}
			chkBoxVal()
			formObj.f_cmd.value=MODIFY01;
			formObj.ca_sts_cd.value="C";
			if(checkAddModiVal(formObj)){
	            //Do you want to Confirm?
				if(confirm(getLabel('FMS_COM_CFMCFM'))){
//                	doShowProcess();
                	formObj.save_yn.value="Y";
//		            formObj.action="./SEC_FRT_0030.clt";
//		            formObj.submit();
                	submitForm();
	            }
	    	}
       	break;
       	case "CANCEL":
       		//Do you want to Delete?
			if(confirm(getLabel('FMS_COM_CFMDEL'))){
//       			doShowProcess();
       			formObj.save_yn.value="Y";
				formObj.f_cmd.value=REMOVE;
//	            formObj.action="./SEC_FRT_0030.clt";
//	            formObj.submit();
				submitForm();
       		}
       	break;
       	case "CNPRINT":
       		//House B/L을 기준으로 출력
       		var param='ca_no=' + formObj.ca_no.value;
       		param += '&bl_no=' + formObj.house_bl_no.value;
       		param += '&biz_clss_cd=' + formObj.biz_clss_cd.value;
       		param += '&title=Correction Notice';
       		param += '&cmd_type=58';
			popPOST(formObj, "RPT_PRN_0010.clt?"+param, "popTest", 1025, 740);
		break;
       	case "CRPRINT":
       		//Master B/L을 기준으로 출력
       		var param='ca_no=' + formObj.ca_no.value;
       		param += '&bl_no=' + formObj.master_bl_no.value;
       		param += '&biz_clss_cd=' + formObj.biz_clss_cd.value;
       		param += '&title=Correction Request';
       		param += '&cmd_type=58';
			popPOST(formObj, "RPT_PRN_0010.clt?"+param, "popTest", 1025, 740);
        break;
    }
}

function refreshAjaxTab(url){
	
	var formObj=document.form;
	formObj.ca_no.value = getParam(url,"s_ca_no");
	formObj.s_ca_no.value = getParam(url,"s_ca_no");
	formObj.call_val.value = getParam(url,"call_val");
	
	doWork('SEARCH02');
}

function submitForm(){
	var formObj=document.form;
	doShowProcess();
	
	$.ajax({
		   type: "POST",
		   url: "./SEC_FRT_0030AJ.clt",
		   dataType: 'xml',
		   data:  $(formObj).serialize() /*f_cmd: cmd,  ntc_trdp_cd: formObj.f_wo_no.value*/ ,
		   success: function(data){
			   setFieldValue( formObj.blFlg, $('blFlg',data).text());
			   setFieldValue( formObj.s_intg_bl_seq, $('s_intg_bl_seq',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.bkg_no, $('bkg_no',data).text());
			   setFieldValue( formObj.ca_seq, $('ca_seq',data).text());
			   setFieldValue( formObj.bnd_clss_cd, $('bnd_clss_cd',data).text());
			   setFieldValue( formObj.air_sea_clss_cd, $('air_sea_clss_cd',data).text());
			   setFieldValue( formObj.biz_clss_cd, $('biz_clss_cd',data).text());
			   setFieldValue( formObj.ca_sts_cd, $('ca_sts_cd',data).text());
			   setFieldValue( formObj.master_bl_seq, $('master_bl_seq',data).text());
			   setFieldValue( formObj.master_ca_sts_cd, $('master_ca_sts_cd',data).text());
			   setFieldValue( formObj.cls_flg, $('cls_flg',data).text());
			   setFieldValue( formObj.save_yn, $('save_yn',data).text());
			   setFieldValue( formObj.s_house_bl_no, $('s_house_bl_no',data).text());
			   setFieldValue( formObj.s_master_bl_no, $('s_master_bl_no',data).text());
			   setFieldValue( formObj.s_trdp_cd, $('s_trdp_cd',data).text());
			   setFieldValue( formObj.s_trdp_short_nm, $('s_trdp_short_nm',data).text());
			   setFieldValue( formObj.s_trdp_full_nm, $('s_trdp_full_nm',data).text());
			   setFieldValue( formObj.s_status, $('s_status',data).text());
			   setFieldValue( formObj.s_rgst_strdt, $('s_rgst_strdt',data).text());
			   setFieldValue( formObj.s_rgst_enddt, $('s_rgst_enddt',data).text());
			   setFieldValue( formObj.s_ofc_cd, $('s_ofc_cd',data).text());
			   setFieldValue( formObj.call_val, $('call_val',data).text());
			   setFieldValue( formObj.s_ca_no, $('s_ca_no',data).text());
			   setFieldValue( formObj.rgst_usrid, $('rgst_usrid',data).text());
			   setFieldValue( formObj.ca_no, $('ca_no',data).text());
			   setFieldValue( formObj.house_bl_no, $('house_bl_no',data).text());
			   setFieldValue( formObj.house_bl_no, $('house_bl_no',data).text());
			   setFieldValue( formObj.master_bl_no, $('master_bl_no',data).text());
			   setFieldValue( formObj.master_bl_no, $('master_bl_no',data).text());
			   setFieldValue( formObj.iss_usrid, $('iss_usrid',data).text());
			   setFieldValue( formObj.iss_ofc_cd, $('iss_ofc_cd',data).text());
			   setFieldValue( formObj.ntc_trdp_pic_phn, $('ntc_trdp_pic_phn',data).text());
			   setFieldValue( formObj.ntc_trdp_pic_fax, $('ntc_trdp_pic_fax',data).text());
			   setFieldValue( formObj.ntc_trdp_cd, $('ntc_trdp_cd',data).text());
			   setFieldValue( formObj.ntc_trdp_full_nm, $('ntc_trdp_full_nm',data).text());
			   setFieldValue( formObj.ntc_trdp_pic, $('ntc_trdp_pic',data).text());
			   setFieldValue( formObj.cfm_usrid, $('cfm_usrid',data).text());
			   setFieldValue( formObj.cfm_ofc_cd, $('cfm_ofc_cd',data).text());
			   setFieldValue( formObj.ntc_trdp_pic_eml, $('ntc_trdp_pic_eml',data).text());
			   //check box
			   setCheckBoxValue( formObj.grs_wgt_flg, $('grs_wgt_flg',data).text());
			   setCheckBoxValue( formObj.cbm_flg, $('cbm_flg',data).text());
			   setCheckBoxValue( formObj.mk_desc_flg, $('mk_desc_flg',data).text());
			   setCheckBoxValue( formObj.vsl_flg, $('vsl_flg',data).text());
			   setCheckBoxValue( formObj.cntr_flg, $('cntr_flg',data).text());
			   setCheckBoxValue( formObj.frt_term_flg, $('frt_term_flg',data).text());
			   setCheckBoxValue( formObj.shpr_pty_flg, $('shpr_pty_flg',data).text());
			   setCheckBoxValue( formObj.cnee_pty_flg, $('cnee_pty_flg',data).text());
			   setCheckBoxValue( formObj.ntfy_pty_flg, $('ntfy_pty_flg',data).text());
			   setCheckBoxValue( formObj.cmdt_flg, $('cmdt_flg',data).text());
			   setCheckBoxValue( formObj.rout_flg, $('rout_flg',data).text());
			   setCheckBoxValue( formObj.trf_inv_amt_flg, $('trf_inv_amt_flg',data).text());
			   setCheckBoxValue( formObj.otr_flg, $('otr_flg',data).text());
			   //end checkbox
			   setFieldValue( formObj.pre_info_txt, $('pre_info_txt',data).text());
			   setFieldValue( formObj.corr_info_txt, $('corr_info_txt',data).text());
			   
			   if($('ca_sts_cd',data).text() == 'I'){
				   $("#status").html(sts_issue);
			   }else if($('ca_sts_cd',data).text() == 'C'){
				   $("#status").html(sts_confirm);
			   }else{
				   $("#status").html("");
			   }
			  
			   /*var btn_act = $("#btn_act").html("");
			   if($('ca_sts_cd',data).text() != 'C'){
				   var btn1 = $("<button type='button' class='btn_etc' id='btnSave'>").text(bnt_save).appendTo(btn_act);
				   btn1.click(function(){
					   doWork('SAVE');
				   });
				   if($('ca_sts_cd',data).text() == 'I'){
					   var btn2 = $("<button type='button' class='btn_etc'>").text(bnt_confirm).appendTo(btn_act);
					   btn2.click(function(){
						   doWork('CONFIRM');
					   });
					   
					   var btn3 = $("<button type='button' class='btn_etc'>").text(bnt_cancel).appendTo(btn_act);
					   btn3.click(function(){
						   doWork('CANCEL');
					   });
				   }
			   }*/
			   
			   if(form.ca_sts_cd.value != "C"){
				   getBtnObj("btnSave").style.display = "inline";
				   if(form.ca_sts_cd.value == "I"){
					   getBtnObj("btnConfirm").style.display = "inline";
					   getBtnObj("btnCancel").style.display = "inline";
				   }else{
					   getBtnObj("btnConfirm").style.display = "none";
					   getBtnObj("btnCancel").style.display = "none";
				   }
			   }else{
				   getBtnObj("btnSave").style.display = "none";
				   getBtnObj("btnConfirm").style.display = "none";
				   getBtnObj("btnCancel").style.display = "none";
			   }
			   
			   doBtnAuthority(attr_extension);
			   loadPage();
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}
function setCheckBoxValue(obj, value){
   if(value == 'Y'){
	   $(obj).prop('checked', true);
   }else{
	   $(obj).prop('checked', false);
   }
}
/* val check*/
function checkAddModiVal(formObj){
	var isOk=true;
    /*var isOk=checkFileExt(formObj.brd_file.value, noticeDocExt);	//파일 확장자 확인
    if(!isOk){
    	//alert('You can\'t upload unauthorized file!\n\nThe premitted file extension is ['+noticeDocExt+']');
    }
    if(formObj.brd_file.value!=''){
    	if(getFileNameLength(formObj.brd_file.value)>40){
    		//alert('Please change selected file name! The file name must be in 40 character include file extensio!');
    		return false;
    	}
    }*/
	if(checkInputVal(formObj.pre_info_txt.value, 1, 2000, "T", getLabel('SEA_COD_CURI'))!='O'){
		formObj.pre_info_txt.focus();
    	isOk=false;
    }
	else if(checkInputVal(formObj.corr_info_txt.value, 1, 2000, "T", getLabel('SEA_COD_CORI'))!='O'){
		formObj.corr_info_txt.focus();
    	isOk=false;
    }
	if(isOk){
    	return true;
    }
}
/*pop up open*/
function doPop(srcName){
    var formObj=document.form;
    switch(srcName) {
   	   	case "HBL_POPLIST":
          	rtnary=new Array(1);
	   		rtnary[0]=formObj.air_sea_clss_cd.value;
	   		rtnary[1]=formObj.bnd_clss_cd.value;
   	        callBackFunc = "HBL_POPLIST";
	        modal_center_open('./CMM_POP_0170.clt', rtnary, 818,468,"yes");
	        
		break;
   	    case "MBL_POPLIST":
   	    	rtnary=new Array(1);
   	    	rtnary[0]=formObj.air_sea_clss_cd.value;
	   		rtnary[1]=formObj.bnd_clss_cd.value;
        	
        	callBackFunc = "MBL_POPLIST";
	  	    modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
	  	    
		break;
		case "PARTNER_POPLIST":
	   		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
   	        
   	        callBackFunc = "PARTNER_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	        
         break;
         case "HOUSEBL":
		   	formObj.f_cmd.value=SEARCHLIST;
		    formObj.action="./SEE_BMD_0020.clt?f_bkg_no="+formObj.bkg_no.value+"&f_intg_bl_seq="+formObj.intg_bl_seq.value;
		    formObj.submit();
		break;
    }
}
function chkBoxVal(){
	var formObj=document.form;
	if(formObj.grs_wgt_flg.checked == true){
		formObj.grs_wgt_flg.value="Y";
	}
	if(formObj.cbm_flg.checked == true){
		formObj.cbm_flg.value="Y";
	}
	if(formObj.mk_desc_flg.checked == true){
		formObj.mk_desc_flg.value="Y";
	}
	if(formObj.vsl_flg.checked == true){
		formObj.vsl_flg.value="Y";
	}
	if(formObj.cntr_flg.checked == true){
		formObj.cntr_flg.value="Y";
	}
	if(formObj.frt_term_flg.checked == true){
		formObj.frt_term_flg.value="Y";
	}
	if(formObj.shpr_pty_flg.checked == true){
		formObj.shpr_pty_flg.value="Y";
	}
	if(formObj.cnee_pty_flg.checked == true){
		formObj.cnee_pty_flg.value="Y";
	}
	if(formObj.ntfy_pty_flg.checked == true){
		formObj.ntfy_pty_flg.value="Y";
	}
	if(formObj.cmdt_flg.checked == true){
		formObj.cmdt_flg.value="Y";
	}
	if(formObj.rout_flg.checked == true){
		formObj.rout_flg.value="Y";
	}
	if(formObj.trf_inv_amt_flg.checked == true){
		formObj.trf_inv_amt_flg.value="Y";
	}
	if(formObj.otr_flg.checked == true){
		formObj.otr_flg.value="Y";
	}
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.form;
	var cnPrint = getBtnObj("cnPrint");
	var crPrint = getBtnObj("crPrint");
    if (formObj.ca_seq.value == "" && formObj.ca_no.value != ""){
    	getBtnObj('cnPrint').style.display='none';
 		getBtnObj('crPrint').style.display='none';
        // No Data found! 
		alert(getLabel("FMS_COM_ALT010"));
        return;
	}
	if( formObj.s_intg_bl_seq.value != "" ) {
		if(formObj.biz_clss_cd.value=="H"){
			doWork('SEARCH01');
	 	}else if(formObj.biz_clss_cd.value=="M"){
	 		doWork('SEARCH03');
	 	}
 	}
	//search 에서 온 경우
	if( formObj.call_val.value != "") {
		formObj.call_val.value="";
 		doWork('SEARCH04');
 	}
 	if(formObj.biz_clss_cd.value=="H" && formObj.ca_sts_cd.value=="C"){
 		getBtnObj('cnPrint').style.display='inline';
 		getBtnObj('crPrint').style.display='none';
 	}else if(formObj.biz_clss_cd.value=="M" && formObj.ca_sts_cd.value=="C"){
 		getBtnObj('cnPrint').style.display='none';
 		getBtnObj('crPrint').style.display='inline';
 	}else{
 		getBtnObj('cnPrint').style.display='none';
 		getBtnObj('crPrint').style.display='none';
 	}
	if(formObj.save_yn.value == "Y" && formObj.ca_sts_cd.value != ""){
		//Save success!
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}

function HBL_POPLIST(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.house_bl_no.value=rtnValAry[0];//house_bl_no
		formObj.master_bl_no.value=rtnValAry[1];//master_bl_no
		formObj.ca_sts_cd.value=rtnValAry[2];//ca_sts_cd
		formObj.s_intg_bl_seq.value=rtnValAry[3];//intg_bl_seq
		formObj.bkg_no.value=rtnValAry[4];//bkg_no
	}
	doWork('SEARCH01');
}

function MBL_POPLIST(rtnVal){
  	var formObj=document.form;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.master_bl_no.value=rtnValAry[0];//house_bl_no
		formObj.s_intg_bl_seq.value=rtnValAry[1];//intg_bl_seq(master)
		if(formObj.master_bl_no.value!=''){
			doWork('SEARCH03');
		}
	}
  }

function PARTNER_POPLIST(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ntc_trdp_cd.value=rtnValAry[0];//trdp_cd
//		formObj.ntc_trdp_short_nm.value = rtnValAry[1];//shrt_nm
		formObj.ntc_trdp_full_nm.value=rtnValAry[2];//eng_nm
	}
}
