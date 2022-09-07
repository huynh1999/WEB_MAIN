/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0330.js
*@FileTitle  : ?
*@author     : CLT
*@version    : 1.0
*@since      : 
=========================================================*/
var gl_type = "";

function doWork(srcName, curObj, valObj){
	var formObj=document.frm1;	
	switch(srcName) {
		case "CLOSE":
			var retArray=false;
			ComClosePopup(retArray); 
		break;	       
		case "SAVE":
			
//			if(formObj.auto_process_chk[0].checked){
//    	    	formObj.auto_process_chk.value="O"; // Overwrite
//    	    } else 
    	    if(formObj.auto_process_chk[0].checked) {
    	    	formObj.auto_process_chk.value="E"; // Exchange
    	    } else if(formObj.auto_process_chk[1].checked) {
    	    	formObj.auto_process_chk.value="M"; // Miscellaneous
    	    }
			
			var retArray = "";
			retArray += formObj.auto_process_chk.value;
			retArray += "|";
			retArray += gl_type;
			
			ComClosePopup(retArray); 
		break;	       
    }
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {	
	var arg=parent.rtnary;	
	gl_type = arg[0];
	
	var txt_ex = "Exchange ";
	var txt_misc = "Miscellaneous ";
	
	var txt_ex2 = "";
	var txt_misc2 = "";
	
	if(arg[0] == "P"){
		txt_ex += "Profit ";
		txt_misc += "Profit ";
	} else {
		txt_ex += "Loss ";
		txt_misc += "Loss ";
	}
	
	if(arg[1] == "" || arg[2] == ""){
		txt_ex2 += "(" + getLabel('ACC_MSG152') + ")";
		getObj("auto_process_ex").disabled = true;
	} else {
		txt_ex += "(G/L : " + arg[1] + "/" + arg[2] + ")";
	}
	
	if(arg[3] == "" || arg[4] == ""){
		txt_misc2 += "(" + getLabel('ACC_MSG152') + ")";
		getObj("auto_process_misc").disabled = true;
	} else {
		txt_misc += "(G/L : " + arg[3] + "/" + arg[4] + ")";
	}
	
	if(arg[5] == "Y"){
		$("[id=trExGlNo]").show();
	}
	
	$(".over_span").append("Overwrite");
	$(".ex_span").append(txt_ex);
	$(".ex_span2").append(txt_ex2);
	$(".misc_span").append(txt_misc);
	$(".misc_span2").append(txt_misc2);
}