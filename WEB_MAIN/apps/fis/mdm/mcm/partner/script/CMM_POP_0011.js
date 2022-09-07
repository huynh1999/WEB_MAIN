﻿﻿﻿//OFVFOUR-7902 [Lever Logistics] Trade Partner Entry - Additional Name & Address
var isTrdpNmDupl = "N";
function doWork(srcName){
    var formObj=document.form;
	try {
        switch(srcName) {
        	case "save" :
  
		     	var param =  '&trdp_cd=' + formObj.trdp_cd.value;
		     		param += '&trdp_nm=' + formObj.trdp_nm.value;
		     		param += '&trdp_addr_tp=' + formObj.trdp_addr_tp.value;
		     		param += '&trdp_add_addr=' + formObj.trdp_add_addr.value;
		     		param += '&rmk=' + formObj.rmk.value;
		     		param += '&seq=' + formObj.trdp_seq.value;
		     		param += '&user_id=' + formObj.user_id.value;
		     		param += '&user_ofc_cd=' + formObj.user_ofc_cd.value;

		     		
  	      		if(formObj.trdp_sts.value=="add"){
  	      			if(!chkCmpAddr(formObj.trdp_add_addr, "Address")){
  	      				return;
  	      			}
  	      			
  	      			ajaxSendPost(chkTrdpNmDupl, 'reqVal', '&goWhere=aj&bcKey=chkTrdpNmDupl&trdp_cd='+formObj.trdp_cd.value+'&trdp_nm='+trim(formObj.trdp_nm.value), './GateServlet.gsl');
  	      			if(isTrdpNmDupl == "Y"){
  	      				alert(getLabel('FMS_COM_ALT008')+ "\n" + getLabel('FMS_COD_NAME'));
  	      				return;
  	      			}
  	      			
  	      			doShowProcess();
        			ajaxSendPost(trdpAddrComplete, 'reqVal', '&goWhere=aj&bcKey=trdpAddrAdd'+param, './GateServlet.gsl');
        		}
        		if(formObj.trdp_sts.value=="modify"){
  	      			if(!chkCmpAddr(formObj.trdp_add_addr, "Address")){
  	      				return;
  	      			}
  	      			if(formObj.trdp_nm.value != formObj.trdp_nm_hidden.value){
	  	      			ajaxSendPost(chkTrdpNmDupl, 'reqVal', '&goWhere=aj&bcKey=chkTrdpNmDupl&trdp_cd='+formObj.trdp_cd.value+'&trdp_nm='+trim(formObj.trdp_nm.value), './GateServlet.gsl');
	  	      			if(isTrdpNmDupl == "Y"){
	  	      				alert(getLabel('FMS_COM_ALT008')+ "\n" + getLabel('FMS_COD_NAME'));
	  	      				return;
	  	      			}
  	      			}
        			doShowProcess();
        			ajaxSendPost(trdpAddrComplete, 'reqVal', '&goWhere=aj&bcKey=trdpAddrModify'+param, './GateServlet.gsl');
        		}
        		if(formObj.trdp_sts.value=="delete"){
        			doShowProcess();
        			ajaxSendPost(trdpAddrComplete, 'reqVal', '&goWhere=aj&bcKey=trdpAddrDelete'+param, './GateServlet.gsl');
        		}
        	break;

        } // end switch
	}catch(e) {
		alert(e);
	}
}

function loadPage() {
	var arg=parent.rtnary;
	var formObj=document.form;
	formObj.trdp_cd.value = (arg[0] == undefined || arg[0] == 'undefined') ? "" : arg[0];
	formObj.trdp_seq.value=(arg[1] == undefined || arg[1] == 'undefined') ? "" : arg[1];
	formObj.trdp_sts.value =   (arg[2] == undefined || arg[2] == 'undefined') ? "" : arg[2];

	if(formObj.trdp_sts.value == "add"){
		$("#btnDelete").hide();
	}

	if(formObj.trdp_sts.value=="modify"){
		ajaxSendPost(trdpAddrSearch, 'reqVal', '&goWhere=aj&bcKey=trdpAddrSearch&seq='+formObj.trdp_seq.value, './GateServlet.gsl');
		formObj.trdp_nm_hidden.value = formObj.trdp_nm.value;
	}
	
}



function trdpAddrComplete(reqVal){
	doHideProcess();
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		//bl_addr_attn=doc[1];

	} else {
		//bl_addr_attn="";
	}
	showCompleteProcess();

	setTimeout(function(){ ComClosePopup(); }, 1500);
	

}


function trdpAddrSearch(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		var rtnArr=doc[1].split('^&&^');
		$("#trdp_nm").val(rtnArr[0]);
		$("#trdp_addr_tp").val(rtnArr[1]);
		$("#trdp_add_addr").val(rtnArr[2]);
		$("#rmk").val(rtnArr[3]);
	} else {
		//bl_addr_attn="";
	}
}


function addrDelete(){
	var formObj=document.form;
	formObj.trdp_sts.value ="delete";
	doWork('save')	;
}


function chkCmpAddr(obj, msgTxt){
	//20121130 OJG 
	//checkTxtAreaLn(obj, 100, 10, msgTxt);
	textarea_autoenter_50(obj);
	// #4227 [Webtrans] TP Entry maximum number of line validation message
	//return checkTxtAreaLn(obj, 62, 6, msgTxt); 
	blnCheck = checkTxtAreaLn(obj, 70, 7, msgTxt); 
	if (!blnCheck) obj.blur();
	return blnCheck;
	
}

/**********************************************************************/
/* LHK 20130222, 이은조 수석님 요청사항, BL 화면에만 적용함                                      */
/* document에 존재하는 textarea의 cols 에 50자 입력시 auto enter 기능 추가          */
/**********************************************************************/ 
function textarea_autoenter_50(obj){
   	var enterText='\r\n';
	var textareaVal=obj.value.replace(/\r/g, '');
	var txtValArr=textareaVal.split('\n');
	var replaceVal='';
	for (var i=0 ; i < txtValArr.length; i++) {
		var rowVal=txtValArr[i];
		var rowLen=rowVal.length;
		if (rowLen > 70) {
			var replaceRowVal='';
			for (var j=0 ; j < rowLen ; j++) {
				rowVal=rowVal.replace(/\n/g, ''); 
				var tempChar=rowVal.charAt(j);
				if (0 < j && j%70 == 0) {
					replaceRowVal += (enterText + tempChar);
				} else {
					replaceRowVal += tempChar;
				}
			}
			rowVal=replaceRowVal;
		}
		if(i>0){
			replaceVal += (enterText + rowVal);
		}else{
			replaceVal += rowVal;
		}
	}
	obj.value=replaceVal;
}

function chkTrdpNmDupl(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		isTrdpNmDupl=doc[1];
	}
}