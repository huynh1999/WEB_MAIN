var rtnary=new Array(1);
var callBackFunc = "";

function loadPage(){
	setTimeout("document.frm1.s_mbl_no.focus();",1000);
}

function doWork(srcName){
	var formObj=document.frm1;
    switch(srcName) {
		case 'Print':
			if(formObj.s_mbl_no.value == "" && formObj.s_ref_no.value == ""){
//				alert("[MBL No. / REF No.] is mandatory field.");
				alert(getLabel('AIR_MSG_052'));
				formObj.s_mbl_no.focus();
				return;
			}
			formObj.title.value='Shipping Instruction Report';			
			formObj.file_name.value="shipping_instruction_ae_mbl_01.mrd";
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
			var param='[' + formObj.s_mbl_no.value + ']';		//$1
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
			param += '[' + formObj.s_ref_no.value  + ']';	    	//$19	s_ref_no
			param += '[' + userTel  + ']';	    //$20	usr tel
			param += '[' + userFax  + ']';	    //$21	usr fax
			param += '[' + eml      + ']';	    //$22	usr eml
			//param += '[' + formObj.title.value + ']';
			formObj.rd_param.value=param;
			formObj.mailTitle.value='Shipping Instruction [Air Export Master BL No : ' + formObj.s_mbl_no.value + ']';;
			var trdp_cd='';
     		trdp_cd += '(' + '\'' + '' + '\'';
     		trdp_cd += ',' + '\'' + '' + '\'' + ')';
			ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
			formObj.mailTo.value=mailTo;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
		case "CLOSE":
	    	window.close();
    	break;
    }
}
/*pop up open*/
function doPop(srcName,curObj){
    var formObj=document.frm1;
    switch(srcName) {
	    case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(1);
			rtnary[0]="A"; //S=해운에서 오픈, A=항공에서 오픈
			rtnary[1]="O"; //I: In-bound, O: Out-bound
			callBackFunc = "MBL_POPLIST";
			modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			
		break;			
		case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(1);
			rtnary[0]="A";
			rtnary[1]="O";
			callBackFunc = "REF_POPLIST";
			modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			
		break;
		case "PARTNER_POPLIST":
	   		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		if(curObj.type == "button"){
	   			rtnary[1]="";
	   		}else{
	   			rtnary[1]=formObj.ntc_trdp_full_nm.value;	   			
	   		}
	   		rtnary[2]=window;
	   		callBackFunc = "PARTNER_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
         break; 
		 case "PARTNER_POPLIST_CLS":
	   		if(curObj.value == ""){
	   			formObj.ntc_trdp_full_nm.value = "";
	   		};
         break; 
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

function MBL_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_mbl_no.value=rtnValAry[0];//s_mbl_no
		if(formObj.s_mbl_no.value != ""){
			doWork('SEARCH');	
		}
	}
}
function REF_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_ref_no.value=rtnValAry[2];
		formObj.s_mbl_no.value="";
		if(formObj.s_ref_no.value != ""){
			doWork('SEARCH');	
		}
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