var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName, valObj){
    var formObj = document.frm1;

    switch(srcName) {
		case "CHANGE":
			
			if(!checkTrdpUse()){
				break;
			}
			
			if(saveValid(formObj) && confirm(getLabel('FMS_COM_CFMSAV'))){
				formObj.f_cmd.value = MODIFY;
				formObj.action = "./SAL_TPM_0090.clt";
				formObj.submit();

				//alert(getLabel('FMS_COM_NTYCOM'));
				/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
				//showCompleteProcess();
			}
		break;
		
		case "FM_TRDP_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			
			//value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[1] = valObj;
	   		}else{
	   			rtnary[1] = "";
	   		}
	   		rtnary[2] = window;
	   		// yjw 2014.10.20 #45003 : [Common] DEFAULT, MAINCMP 거래처 코드가 삭제 안되도록 수정
	   		rtnary[4] = "Y";
	   		
	   		callBackFunc = "FM_TRDP_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			           
		break;
		
		case "TO_TRDP_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			
			//value parameter
			if(typeof(valObj)!='undefined'){
				rtnary[1] = valObj;
			}else{
				rtnary[1] = "";
			}
			rtnary[2] = window;
			// yjw 2014.10.20 #45003 : [Common] DEFAULT, MAINCMP 거래처 코드가 삭제 안되도록 수정
			rtnary[4] = "N"; 
			
			callBackFunc = "TO_TRDP_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			            
		break;
    }
}

function saveValid(formObj){
	if (formObj.f_fm_trdp_cd.value == "") {
		//alert("[From] is mandatory field!");
		alert(getLabel('FMS_COM_ALT001'));
		formObj.f_fm_trdp_cd.focus();
		return false;

	} else if (formObj.f_to_trdp_cd.value == "") {
		//alert("[To] is mandatory field!");
		alert(getLabel('FMS_COM_ALT001'));
		formObj.f_to_trdp_cd.focus();
		return false;

	} else if (formObj.f_fm_trdp_cd.value == formObj.f_to_trdp_cd.value) {
		// [From] trade partner and [To] trade partner will not be the same!
		alert(getLabel('SAL_COM_ALT010'));
		formObj.f_to_trdp_cd.value = "";
		formObj.f_to_trdp_nm.value = "";
		formObj.f_to_trdp_cd.focus();
		return false;
	}
	
	formObj.f_h_merge_chk_1.value = formObj.f_merge_chk_1.checked ? "Y" : "N";
	formObj.f_h_merge_chk_2.value = formObj.f_merge_chk_2.checked ? "Y" : "N";
	formObj.f_h_merge_chk_3.value = formObj.f_merge_chk_3.checked ? "Y" : "N";
	
	return true;
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	
}

/**
* code name select
*/
function codeNameAction(str, obj, tmp){
	CODETYPE = str;
 	var formObj = document.frm1;
 	var s_code = obj.value.toUpperCase();		
 	var s_type = str.substring(0,8);
 	
 	if(str == "fm_trdpcode" || str == "to_trdpcode") {
 		s_type = "trdpcode";
 		
 	}

 	var s_default_maincmp_yn = "";
 	
 	if(str == "fm_trdpcode"){
 		s_default_maincmp_yn = "Y";
 	}else if(str == "to_trdpcode"){
 		s_default_maincmp_yn = "N";
 	}
 	
	if (s_code != "") {

 		if (tmp == "onKeyDown") {

 			if (event.keyCode == 13) {

 				ajaxSendPost(trdpCdReq, 'reqVal',
 						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
 								+ '&s_code=' + s_code
 								+ '&s_default_maincmp_yn=' + s_default_maincmp_yn, './GateServlet.gsl');
 			}
 		} else if (tmp == "onBlur") {
 			
 			if (s_code != "") {
 				ajaxSendPost(trdpCdReq, 'reqVal',
 						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
 								+ '&s_code=' + s_code
 								+ '&s_default_maincmp_yn=' + s_default_maincmp_yn, './GateServlet.gsl');
 			}
 		}
 	} else {
 		if (CODETYPE == "fm_trdpcode") {
 			formObj.f_fm_trdp_cd.value = "";// trdp_cd AS param1
 			formObj.f_fm_trdp_nm.value = "";// eng_nm AS param2
 			
 		}else if (CODETYPE == "to_trdpcode") {
 			formObj.f_to_trdp_cd.value = "";// trdp_cd AS param1
 			formObj.f_to_trdp_nm.value = "";// eng_nm AS param2
 			
 		}
 	}
 	
 }

 /**
 * Trade Partner 관련 코드조회
 */
 function trdpCdReq(reqVal){
 	var doc = getAjaxMsgXML(reqVal);
 	var formObj  = document.frm1;
 	if(doc[0]=='OK'){

 		if(typeof(doc[1])!='undefined'){

 			//조회해온 결과를 Parent에 표시함
 			var masterVals = doc[1].split('@@^');
 			
 			if(CODETYPE == "fm_trdpcode"){
 				formObj.f_fm_trdp_cd.value = masterVals[0];		//trdp_cd  AS param1
 				formObj.f_fm_trdp_nm.value = masterVals[3];		//eng_nm   AS param2
 				
 				checkTrdpUse();
 				
 			}else if(CODETYPE == "to_trdpcode"){
 				formObj.f_to_trdp_cd.value = masterVals[0];		//trdp_cd  AS param1
 				formObj.f_to_trdp_nm.value = masterVals[3];		//eng_nm   AS param2
 				
 			}
 			
 		} else {
 			if(CODETYPE == "fm_trdpcode"){
 				formObj.f_fm_trdp_cd.value = "";				//trdp_cd  AS param1
 				formObj.f_fm_trdp_nm.value = "";				//eng_nm   AS param2
 				
 			}else if(CODETYPE == "to_trdpcode"){
 				formObj.f_to_trdp_cd.value = "";				//trdp_cd  AS param1
 				formObj.f_to_trdp_nm.value = "";				//eng_nm   AS param2
 				
 			}
 		}
 	}else{
 		//alert(getLabel('SEE_BMD_MSG43'));		
 	}
}
 function FM_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry = rtnVal.split("|");
		formObj.f_fm_trdp_cd.value = rtnValAry[0];//full_nm
		formObj.f_fm_trdp_nm.value = rtnValAry[2];//full_nm
		
		checkTrdpUse();
	}  
}
 function TO_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry = rtnVal.split("|");
		formObj.f_to_trdp_cd.value = rtnValAry[0];//full_nm
		formObj.f_to_trdp_nm.value = rtnValAry[2];//full_nm
	} 
}

 var trdpUse = false;
 function checkTrdpUse(){
	 if (frm1.f_fm_trdp_cd.value != "") {
	 ajaxSendPost(checkTrdpUseRet, 'reqVal', '&goWhere=aj&bcKey=chkTrdpCdUse&trdp_cd='+frm1.f_fm_trdp_cd.value, './GateServlet.gsl');
 }

 if (trdpUse) {
	 if(!confirm(getLabel('SAL_COM_ALT027'))){
		 frm1.f_fm_trdp_cd.value = "";
		 frm1.f_fm_trdp_nm.value = "";
			 return false;
		 }
	 }
	 return true;
 }

 function checkTrdpUseRet(reqVal){
	 var doc = getAjaxMsgXML(reqVal);
	 if(doc[0]=='OK'){
	 if(typeof(doc[1])!='undefined'){
		 if(doc[1]=='NG'){
				 trdpUse = true;
			 } else {
				 trdpUse = false;
			 }
		 }
	 }else{
		 valCheck = false;
	 }
 }
 