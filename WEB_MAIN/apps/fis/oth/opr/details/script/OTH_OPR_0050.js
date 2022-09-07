function doDispDocList(){
	 opener.reloadDocList();
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
    	case "SEARCH01":
			frm1.f_cmd.value=SEARCH01;
            doProcess=true;
            showProcess('WORKING', document);
            frm1.action="./OTH_OPR_0050.clt";
            frm1.submit();              
       	break;
       	case "SEARCH02":
			frm1.f_cmd.value=SEARCH02;
			doProcess=true;
            showProcess('WORKING', document);
            frm1.action="./OTH_OPR_0050.clt";
            frm1.submit();
       	break;
		case "ADD":
			frm1.f_cmd.value=ADD;
            //업로드 가능한 확장자인 경우
            if(checkAddModiVal(formObj)){
                //'Do you want save?')){
            	if(confirm(getLabel('FMS_COM_CFMSAV'))){
                    doProcess=true;
                    //showProcess('WORKING', document);
                    showCompleteProcess();
                    frm1.action="./OTH_OPR_0050.clt";
                    frm1.submit();                    
                }
            }
       	break;
		case "MODIFY":
			frm1.f_cmd.value=MODIFY;
            if(checkAddModiVal(formObj)){
                //'Do you want save?')){
            	if(confirm(getLabel('FMS_COM_CFMSAV'))){
                    doProcess=true;
                    //showProcess('WORKING', document);
                    showCompleteProcess();
                    frm1.action="./OTH_OPR_0050.clt";
                    frm1.submit();
                 }            	
            }
       	break;
       	case "CLOSE":
       		// parent.opener.searchSheet3Child();
  			//ComClosePopup(); 
       		window.close()
       	break;
       	case "CANCEL":
       		formObj.po_doc_nm.value="";			 
		    formObj.po_doc_no.value="";			 			 
		    formObj.po_doc_msg.value="";			 
		    formObj.po_doc_rmk.value="";
       	break;      
         case "DOC_TP_CD"://UD 사용사 정의일 경우는 po_doc_nm 활성화
       		if(formObj.po_doc_tp_cd.value=="UD"){
       			formObj.po_doc_nm.disabled=false;
       		}else{
       			formObj.po_doc_nm.value="";
       			formObj.po_doc_nm.disabled=true;
       		}
       	break;
    }
}
/* val check*/
function checkAddModiVal(formObj){
	/*
    if(formObj.po_doc_img_url.value==""){
    	//Please select a file!
    	return false;
    }
    */
    var isOk=checkFileExt(formObj.po_doc_img_url.value, shipDocExt);	//파일 확장자 확인
    if(!isOk){
    	//'You can\'t upload unauthorized file!\n\nThe premitted file extension is ['+shipDocExt+']'); alert(getLabel2('SEE_MSG_062', new Array(shipDocExt)));
    	alert(getLabel('FMS_COM_ALT027') + shipDocExt);
    }
    /*
    if(formObj.brd_file.value!=''){
    	if(getFileNameLength(formObj.brd_file.value)>40){
    		//'Please change selected file name! The file name must be in 40 character include file extensio!');
    		return false;
    	}	
    }*/
    //textarea 길이 체크
	if(checkInputVal(formObj.po_doc_msg.value, 0, 1000, "T", 'MESSAGE')!='O'){
    	isOk=false;
    }
	else if(checkInputVal(formObj.po_doc_rmk.value, 0, 50, "T", 'REMARK')!='O'){
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
	
    if(formObj.doc_tp_cd.value!=""){
    	formObj.po_doc_tp_cd.value=formObj.doc_tp_cd.value;
    }
    if(formObj.po_doc_tp_cd.value=="UD"){
    	formObj.po_doc_nm.disabled=false;
    }else{
    	formObj.po_doc_nm.value="";
    	formObj.po_doc_nm.disabled=true;
    }
    if(formObj.po_ext_flg.value == 'Y'){
		formObj.ext_flg_chk.checked=true;
	}else{
		formObj.ext_flg_chk.checked=false;
		formObj.po_ext_flg.value='N'
	}
}

function downloadFile(downType){
	frm2.docType.value=downType;
	frm2.target='ifrm1';
	frm2.submit();
}
function externalCheck(obj){
	var formObj=document.frm1;
	if(obj.checked){
		formObj.po_ext_flg.value='Y';
	}else{
		formObj.po_ext_flg.value='N';
	}
}