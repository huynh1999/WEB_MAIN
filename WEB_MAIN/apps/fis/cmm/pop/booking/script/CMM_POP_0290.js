function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	try {
        switch(srcName) {
        	case "SAVE":
        		if(form.rsn_txt.value == ""){
        			var bkg_sts_cd = "";
        			
        			if(form.bkg_sts_cd.value == "RJ"){
        				bkg_sts_cd = "Reject";
        			}else{
        				bkg_sts_cd = "Cancel";
        			}
    				alert(getLabel('FMS_COM_ALT001') + "\n - " + bkg_sts_cd + " Reason");
    				form.rsn_txt.focus();
    				return;
         	   }
         	   if(confirm(getLabel('FMS_COM_CFMSAV'))){   
         		   form.f_cmd.value = MODIFY;
         		   form.submit();  
         	   }
	    	   break;  
			case "CLOSE":
				ComClosePopup();
      	    break;	
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001'));
        }
	}
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var arg=parent.rtnary;
	
	var formObj  = document.form;
	
	formObj.bkg_seq.value = (arg[0] == undefined || arg[0] == 'undefined') ? '' : arg[0];
	formObj.bkg_sts_cd.value = (arg[1] == undefined || arg[1] == 'undefined') ? '' : arg[1];
	
	if(formObj.bkg_sts_cd.value == "RJ"){
		title_reject.style.display="inline";
		//reject.style.display="inline";
		msg_reject.style.display="inline";
	} else {
		title_cancel.style.display="inline";
		//cancel.style.display="inline";
		msg_cancel.style.display="inline";
	}
}