var ALT_TP; 
var TYPE; 
var EVENT; 


function doWork(srcName){ 
/*	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}*/
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var formObj=document.frm1;
    switch(srcName) {
		
    	case "ADD":

       	break;
       	
    	case "DELETE":
    		formObj.f_cmd.value=REMOVE;
			if(confirm(getLabel('FMS_COM_CFMSAV'))){
				parent.opener.setRegister("D");
				formObj.submit();
			}
    		break;
    		
		case "MODIFY":
			
			if (formObj.fom_seq.value =="") {
				formObj.f_cmd.value=ADD;
			} else {
				formObj.f_cmd.value=MODIFY;
			}
			
			if(confirm(getLabel('FMS_COM_CFMSAV'))){
				parent.opener.setRegister("S");
				formObj.submit();
			}
			
			break;
       	break;
       	case "CLOSE":
       		window.close()
       	break;
    }
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	
	
	if (frm1.fom_seq.value == "") {
		setInitForm();
		frm1.btnDel.style.display='none';
	} else {
		/*frm1.btnDel.style*/
		frm1.btnDel.style.display='inline';
	}
}


/**
 * Alert Mail Form의 기본값을 설정한다.
 */
function setInitForm(){
	
	var formObj=document.frm1;
	
	ALT_TP = formObj.alt_type.value;
	TYPE = formObj.phys_ett_nm.value;
	EVENT = formObj.phys_attr_nm.value;

	var strTitle = "(Alert) "+EVENT;
	TYPE == "TB_PO"?strTitle+=" Notification #PO_NO#":TYPE == "TB_INTG_BL"?strTitle+=" Notification #HBL_NO#":strTitle+=" Notification #BKG_NO#";

	formObj.fom_tit.value = strTitle;
	
	var defaultNo  = "PO Number: #PO_NO#" +	"\r\n" +
					"BL Number: #HBL_NO#" +	"\r\n" +			
					"Bookiing Number: #BKG_NO#" + "\r\n" +
					"Ship Window: #DEADLINE#";
		
	var defaultStr = "";
	if (ALT_TP=="A") {
		defaultStr = "Please, kindly be reminded for "+EVENT+" term requested.";
	} else {
		defaultStr = TYPE +" "+ EVENT+" is changed!."
	}
	var strCtnt = EVENT+" Notification \r\n" +
			"-----------------------------------------------------------------------------------" +	
			"\r\n" +
			"\r\n" +
			defaultNo +	
			"\r\n" +
			"\r\n" +
			defaultStr +	
			"\r\n" +
			"\r\n" +
			"------------------------------------------------------------------------------------" + 
			"\r\n" +
			"\r\n" +
			"#USER_NAME#" + "\r\n" +
			"#OFFICE#" + "\r\n" +
			"#PHONE#, #EMAIL#";
	
	formObj.fom_ctnt.value =strCtnt;
}
