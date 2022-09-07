//=========================================================
//*@FileName   : 
//*@FileTitle  : 
//*@Description: 
//*@author     : Tuan.Chau
//*@version    : 2.0 - 28/07/2014
//*@since      : 28/07/2014
//
//*@Change history:
//=========================================================

function loadPage(){
	setTimeout("document.frm1.house_bl_no.focus();",1000);
}

function doWork(srcName){
	var formObj=document.frm1;
	switch(srcName) {
		case 'Print':
			if(formObj.house_bl_no.value == ""){
//				alert("HBL No. is mandatory field.");
				alert(getLabel('AIR_MSG_026'));
				formObj.house_bl_no.focus();
				return;
			}
			formObj.title.value='Shipping Instruction Report';
			formObj.file_name.value="shipping_instruction_ae_hbl_01.mrd";
			var radio_ship_to=document.getElementsByName("s_ship_to");
			var s_ship_to="";
			var s_bl_issue="";//formObj.s_bl_issue.value.toUpperCase();
			for(var i=0; i<radio_ship_to.length; i++){
			   if(radio_ship_to[i].checked==true)
			   {
				   s_ship_to=radio_ship_to[i].value;
			   }
			}
			if(formObj.iv_atc_flg.checked == true){
				formObj.iv_atc_flg.value="Y";
			}else{
				formObj.iv_atc_flg.value="N";
			}
			if(formObj.insr_flg.checked == true){
				formObj.insr_flg.value="Y";
			}else{
				formObj.insr_flg.value="N";
			}
			if(formObj.pickup_flg.checked == true){
				formObj.pickup_flg.value="Y";
			}else{
				formObj.pickup_flg.value="N";
			}
			if(formObj.lc_flg.checked == true){
				formObj.lc_flg.value="Y";
			}else{
				formObj.lc_flg.value="N";
			}
			if(formObj.shpr_ctc_flg.checked == true){
				formObj.shpr_ctc_flg.value="Y";
			}else{
				formObj.shpr_ctc_flg.value="N";
			}
			if(formObj.impt_flg.checked == true){
				formObj.impt_flg.value="Y";
			}else{
				formObj.impt_flg.value="N";
			}
			if(formObj.final_flg.checked == true){
				formObj.final_flg.value="Y";
			}else{
				formObj.final_flg.value="N";
			}
			if(formObj.sft_doc_flg.checked == true){
				formObj.sft_doc_flg.value="Y";
			}else{
				formObj.sft_doc_flg.value="N";
			}
			if(formObj.dt_entr_flg.checked == true){
				formObj.dt_entr_flg.value="Y";
			}else{
				formObj.dt_entr_flg.value="N";
			}
			if(formObj.sa_flg.checked == true){
				formObj.sa_flg.value="Y";
			}else{
				formObj.sa_flg.value="N";
			}
			if(formObj.call_agt_flg.checked == true){
				formObj.call_agt_flg.value="Y";
			}else{
				formObj.call_agt_flg.value="N";
			}
			if(formObj.rtn_doc_flg.checked == true){
				formObj.rtn_doc_flg.value="Y";
			}else{
				formObj.rtn_doc_flg.value="N";
			}
			//Parameter Setting
			var param='[' + formObj.house_bl_no.value + ']';		//$1
			param += '[' + s_ship_to + ']';							//$2
			param += '[' + formObj.ntc_trdp_cd.value + ']';			//$3
			param += '[' + ofcCd + ']';								//$4
			param += '[' + userNm + ']';							//$5
			param += '[' + s_bl_issue  + ']';						//$6
			param += '[' + formObj.iv_atc_flg.value  + ']';			//$7	iv_atc_flg
			param += '[' + formObj.insr_flg.value  + ']';	        //$8	insr_flg
			param += '[' + formObj.pickup_flg.value  + ']';	        //$9	pickup_flg
			param += '[' + formObj.lc_flg.value  + ']';	        	//$10	lc_flg
			param += '[' + formObj.shpr_ctc_flg.value  + ']';	    //$11	shpr_ctc_flg
			param += '[' + formObj.impt_flg.value  + ']';	        //$12	impt_flg
			param += '[' + formObj.final_flg.value  + ']';	        //$13	final_flg
			param += '[' + formObj.sft_doc_flg.value  + ']';        //$14	sft_doc_flg
			param += '[' + formObj.dt_entr_flg.value  + ']';	    //$15	dt_entr_flg
			param += '[' + formObj.sa_flg.value  + ']';	        	//$16	sa_flg
			param += '[' + formObj.call_agt_flg.value  + ']';	    //$17	call_agt_flg
			param += '[' + formObj.rtn_doc_flg.value  + ']';	    //$18	rtn_doc_flg
			param += '[' + userTel  + ']';	    					//$19	usr tel
			param += '[' + userFax  + ']';	    					//$20	usr fax
			param += '[' + eml      + ']';	    					//$21	usr eml
			//추가 2012.02.24
			param += '[' + formObj.oth_trdp_cd.value + ']';			//$22
			//param += '[' + formObj.title.value + ']';
			formObj.rd_param.value=param;
			formObj.mailTitle.value='Shipping Instruction [Air Export House BL No : ' + frm1.house_bl_no.value + ']';;
			var trdp_cd='';
			trdp_cd += '(' + '\'' + '' + '\'';
			trdp_cd += ',' + '\'' + '' + '\'' + ')';
			ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
			formObj.mailTo.value=mailTo;
			formObj.rpt_biz_tp.value="AEH";
			formObj.rpt_biz_sub_tp.value="SI";
			formObj.rpt_tp.value=(s_ship_to == "A" ? "P": s_ship_to); ;    // [Other Company]가 아닐경우에 사용됨
			formObj.intg_bl_seq.value=formObj.s_intg_bl_seq.value;    // [Other Company]가 아닐경우에 사용됨
			formObj.rpt_trdp_cd.value=formObj.ntc_trdp_cd.value;    //[Other Company]일 경우에 사용됨
			popPOST(formObj, "RPT_RD_0010.clt", "popTest", 1025, 740);
		break;
		case "CLOSE":
			ComClosePopup();
		break;
	}
}



var rtnary=new Array(1);
var callBackFunc = "";
/*pop up open*/
function doPop(srcName,curObj){
    var formObj=document.frm1;
    switch(srcName) {
   	   	case "HBL_POPLIST":
          	rtnary=new Array(1);
	   		rtnary[0]="A";
	   		rtnary[1]="O";
   	        callBackFunc = "HBL_POPLIST";
   	        modal_center_open('./CMM_POP_0170.clt', rtnary, 818,480,"yes");
			doWork('SEARCH01');
		break; 
		case "PARTNER_POPLIST":
			if(formObj.s_ship_to5.checked == true){
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		if(curObj.type != "button"){
		   			rtnary[1]=formObj.ntc_trdp_full_nm.value;		   			
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
	   	        callBackFunc = "PARTNER_POPLIST";
	   	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			}else{
			}
        break; 
		case "OTH_PARTNER_POPLIST":
	   		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		if(curObj.type != "button"){
	   			rtnary[1]=formObj.oth_trdp_full_nm.value;
	   		}else{
	   			rtnary[1]="";
	   		}	
	   		rtnary[2]=window;
   	        callBackFunc = "OTH_PARTNER_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
         break;   
		 case "PARTNER_POPLIST_CLS":
	   		if(curObj.value == ""){
	   			formObj.ntc_trdp_full_nm.value = "";
	   		};
         break;
		 case "OTH_PARTNER_POPLIST_CLS":
		 	if(curObj.value == ""){
		 		formObj.oth_trdp_full_nm.value = "";
		 	};
	     break;
    }
} 

function HBL_POPLIST(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.house_bl_no.value=rtnValAry[0];//house_bl_no
		formObj.master_bl_no.value=rtnValAry[1];//master_bl_no
		formObj.s_intg_bl_seq.value=rtnValAry[3];//intg_bl_seq
	}
}
function PARTNER_POPLIST(rtnVal){	
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ntc_trdp_cd.value=rtnValAry[0];//trdp_cd
		formObj.ntc_trdp_full_nm.value=rtnValAry[2];//eng_nm
	}
}
function OTH_PARTNER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.oth_trdp_cd.value=rtnValAry[0];//trdp_cd
		formObj.oth_trdp_full_nm.value=rtnValAry[2];//eng_nm
	}
}

function fRadio(value) {
	var formObj=document.frm1;
	if(value == "O"){
		formObj.ntc_trdp_cd.className='search_form';
		formObj.ntc_trdp_full_nm.className='search_form';
		formObj.ntc_trdp_cd.readOnly=false;
		formObj.ntc_trdp_full_nm.readOnly=false;
	}else{
		formObj.ntc_trdp_cd.value="";//trdp_cd
		formObj.ntc_trdp_full_nm.value="";//eng_nm
		formObj.ntc_trdp_cd.className='search_form-disable';
		formObj.ntc_trdp_cd.readOnly=true;
		formObj.ntc_trdp_full_nm.className='search_form-disable';
		formObj.ntc_trdp_full_nm.readOnly=true;
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

/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	if(obj.value!=""){
		if(tmp=="onKeyDown"){			
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					str=sub_str;
				}else if(sub_str=="Nodecode"){
					str='node';
				}else if(sub_str=="partner_"){
					str='trdpcode'
				}				
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			var sub_str=str.substring(0,8);
			if(sub_str=="location"){
				str=sub_str;
			}else if(sub_str=="Nodecode"){
				str='node';
			}else if(sub_str=="partner_"){
				str='trdpcode'
			}			
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}
	else if(obj.value == ""){
		var formObj=document.frm1;
		CODETYPE=str;		
		if(CODETYPE =="partner_delivery"){
			formObj.oth_trdp_cd.value="";
			formObj.oth_trdp_full_nm.value="";			
		}
		if(CODETYPE =="partner_ntc_delivery"){
			formObj.ntc_trdp_cd.value="";
			formObj.ntc_trdp_full_nm.value="";			
		}
		
	}
	
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');		
			var masterVals=rtnArr[0].split('@@^');
			
			if(CODETYPE =="partner_delivery"){
				formObj.oth_trdp_cd.value=masterVals[0];
//				formObj.delivery_trdp_nm.value = masterVals[3];//eng trdp name 				
				formObj.oth_trdp_full_nm.value=masterVals[16];//local trdp name 
				//formObj.delivery_trdp_addr.value=masterVals[14];//trdp_addr
//				formObj.delivery_trdp_addr.value=masterVals[29];//dflt_addr
//				formObj.delivery_pic.value=masterVals[10];//pic_nm
//				formObj.delivery_phn.value=masterVals[11];//pic_phn
//				formObj.delivery_fax.value=masterVals[12];//pic_fax
			}
			if(CODETYPE =="partner_ntc_delivery"){
				formObj.ntc_trdp_cd.value=masterVals[0];
//				formObj.delivery_trdp_nm.value = masterVals[3];//eng trdp name 				
				formObj.ntc_trdp_full_nm.value=masterVals[16];//local trdp name 
				//formObj.delivery_trdp_addr.value=masterVals[14];//trdp_addr
//				formObj.delivery_trdp_addr.value=masterVals[29];//dflt_addr
//				formObj.delivery_pic.value=masterVals[10];//pic_nm
//				formObj.delivery_phn.value=masterVals[11];//pic_phn
//				formObj.delivery_fax.value=masterVals[12];//pic_fax
			}
		}else{
			if(CODETYPE =="partner_delivery"){				
				formObj.oth_trdp_cd.value="";
				formObj.oth_trdp_full_nm.value="";
//				formObj.delivery_trdp_addr.value="";
//				formObj.delivery_pic.value="";//pic_nm
//				formObj.delivery_phn.value="";//pic_phn
//				formObj.delivery_fax.value="";//pic_fax
			}
			if(CODETYPE =="partner_ntc_delivery"){
				formObj.ntc_trdp_cd.value="";//trdp_cd
				formObj.ntc_trdp_full_nm.value="";//full_nm
//				formObj.return_trdp_addr.value="";//lgl_addr
//				formObj.return_pic.value="";//pic_nm
//				formObj.return_phn.value="";//pic_phn
//				formObj.return_fax.value="";//pic_fax
			}			
		}
	}else{
		
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}