var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName){
	var formObj=document.frm1;
    switch(srcName) {
		case 'Print':
			formObj.house_bl_no.value=trim(formObj.house_bl_no.value);
			if(formObj.house_bl_no.value == ""){
				//HBL No. is mandatory field.
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEE_BMD_0090.12");
				formObj.house_bl_no.focus();
				return;
			}
			formObj.title.value="Shipping Instruction Report";			
			formObj.file_name.value="shipping_instruction_oe_hbl_01.mrd";
			var radio_ship_to=document.getElementsByName("s_ship_to");
			var s_ship_to="";
//			var s_bl_issue = formObj.s_bl_issue.value.toUpperCase();
			var s_bl_issue="";
			for(var i=0; i<radio_ship_to.length; i++){
			   if(radio_ship_to[i].checked==true)
			   {
				   s_ship_to=radio_ship_to[i].value;
			   }
			}
			//Parameter Setting
			var param='[' + formObj.house_bl_no.value + ']';	//$1
			param += '[' + s_ship_to + ']';			//$2
			param += '[' + formObj.ntc_trdp_cd.value + ']';			//$3
			param += '[' + ofcCd + ']';								//$4
			param += '[' + userNm + ']';							//$5			
			param += '[' + s_bl_issue  + ']';			//$6
			param += '[' + formObj.title.value + ']';  //$7
			param += '['+""+']';	    //$8	
			param += '['+""+']';	    //$9	
			param += '[' + userTel  + ']';	    //$10	usr tel
			param += '[' + userFax  + ']';	    //$11	usr fax
			param += '[' + ""  + ']';	    //$12	 
			param += '[' + userEml + ']';		//$13	usr eml
			formObj.rd_param.value=param;
			formObj.mailTitle.value='Shipping Instruction [Ocean Export House BL No : ' + frm1.house_bl_no.value + ']';;
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
function doPop(srcName){
    var formObj=document.frm1;
    switch(srcName) {
   	   	case "HBL_POPLIST":
          	rtnary=new Array(1);
	   		rtnary[0]="S";
	   		rtnary[1]="O";
	   		callBackFunc = "HBL_POPLIST";
	        modal_center_open('./CMM_POP_0170.clt', rtnary, 818,476,"yes");
   	        
			doWork('SEARCH01');
		break; 
		case "PARTNER_POPLIST":
			if(formObj.s_ship_to5.checked == true){
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]=formObj.ntc_trdp_full_nm.value;
		   		rtnary[2]=window;
		   		callBackFunc = "PARTNER_POPLIST";
		        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	       
			}else{
			}
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
