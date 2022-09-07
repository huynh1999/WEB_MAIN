function doDispAclList(){
	 opener.reloadAclList();
	 this.focus();
	 doWork('CLOSE');
}
function doWork(srcName){ 
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var formObj=document.frm1;
    switch(srcName) {
    	
		case "ADD":
			frm1.f_cmd.value=ADD;
            //업로드 가능한 확장자인 경우
            if(checkAddModiVal(formObj)){
                //'Do you want save?')){
            	if(confirm(getLabel('FMS_COM_CFMSAV'))){
                    doProcess=true;
                    //showProcess('WORKING', document);
                    showCompleteProcess();
                    frm1.action="./EDI_ACL_0020.clt";
                    frm1.submit();                    
                }
            }
       	break;
		case "CLOSE":
 
       		window.close()
       	break;
       	case "CANCEL":
       		formObj.palt_doc_nm.value="";			 
		    formObj.palt_doc_no.value="";			 			 
		    formObj.palt_doc_msg.value="";			 
		    formObj.palt_doc_rmk.value="";
       	break;      
    }
}
/* val check*/
function checkAddModiVal(formObj){
	
    if(formObj.acl_edi_url.value==""){
    	//Please select a file!
    	return false;
    }
    
    //var isOk=checkFileExt(formObj.acl_edi_url.value, shipDocExt);	//파일 확장자 확인
    
    var isOk=true;
    if(!isOk){
    	//'You can\'t upload unauthorized file!\n\nThe premitted file extension is ['+shipDocExt+']'); alert(getLabel2('SEE_MSG_062', new Array(shipDocExt)));
    	alert(getLabel('FMS_COM_ALT027') + shipDocExt + "\n\n: SEE_BMD_0051.106");
    }
  
    //#3120 [ZEN CONTINENTAL] Cannot upload email into the system
    var fileValue = formObj.acl_edi_url.value.split("\\");
    var fileName = fileValue[fileValue.length-1]; // 파일명

	if(checkInputVal(fileName, 0, 100, "T", 'File')!='O'){
    	isOk=false;
    }
   
	if(isOk){
    	return true;
    }
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	
    
}
