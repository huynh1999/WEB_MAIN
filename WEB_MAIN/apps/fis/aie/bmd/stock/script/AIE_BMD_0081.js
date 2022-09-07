

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var formObj  = document.frm1;

    switch(srcName) {
    	 
		case "UPLOAD":
		    //1. 파일일 선택된 경우
		    if(checkAddModiVal(formObj)){
		    	if(confirm(getLabel('FMS_COM_CFMSAV'))){
                    frm1.f_cmd.value = ADD;
                    doProcess = true;
                    showProcess('WORKING', document);
                    formObj.action = "./AIE_BMD_0081.clt";
                    formObj.submit();
					
                }
		    }	            
       	break;
		       	
       	case "CLOSE":
       		window._childwin = false;
       		//#5755 [Impex-Germany] Dublicate error message when creating MAWB stock
       		window.opener.f_delt_flg.value ="N"; 
       		//2016.04.14 C.W.Park Modified
       		window.opener.doWork("SEARCHLIST01");
       		window.close();
       	break;
    }
}

/* val check*/
function checkAddModiVal(formObj){
    if(formObj.cna_url.value == ""){
//    	alert("파일을 선택해 주십시요. ");
    	alert(getLabel('AIR_MSG_064'));
    	return false;
    }
    
    var thumbFile = formObj.cna_url.value;

    for(var i=thumbFile.length-1; i >0; i-- ){
        if(thumbFile.charAt(i)=='.'){
            var curExt=thumbFile.substring(i+1);
            curExt=curExt.toLowerCase();
            break;
        }
    }
	if(curExt != "xml"){
		alert('You can\'t upload unauthorized file!\n\nThe premitted file extension is [XML]');
		return false;

	}
    return true;

}


/* 파일 다운로드 */
function downloadFile(downType){
	frm2.docType.value = downType;
	frm2.target = 'ifrm1';
	frm2.submit();
}


function LoadPage(){
	
	var arg=window.dialogArguments;
	var formObj  = document.form;
		
}