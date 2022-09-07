/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0150.js 
*@FileTitle  : OEH Remark 팝업(등록/수정) 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/16
=========================================================*/
function doDispRmkList(){
	 opener.reloadRmkList();
	 this.focus();
	 //showCompleteProcess();
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
            frm1.action="./MDM_MCM_0150_NW.clt";
            frm1.submit();              
            break;
       	case "SEARCH02":
			frm1.f_cmd.value=SEARCH02;
			doProcess=true;
            showProcess('WORKING', document);
            frm1.action="./MDM_MCM_0150_NW.clt";
            frm1.submit();
            break;
		case "MODIFY":
			frm1.f_cmd.value=MODIFY;
            //'Do you want save?')){
			if(frm1.rmk_txt.value ==''){
				alert(getLabel('FMS_COM_ALT001'));
				return;
			}			
        	if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true;
                showProcess('WORKING', document);
                frm1.action="./MDM_MCM_0150_NW.clt";
                frm1.submit();
             }      		
        	break;
       	case "CLOSE":
       		// parent.opener.searchSheet3Child();
       		ComClosePopup();
       		window.close();
       	break;
    }
}
/* val check*/
function checkAddModiVal(formObj){
	/*
    if(formObj.palt_doc_img_url.value==""){
    	//Please select a file!
    	return false;
    }
    */
    var isOk=checkFileExt(formObj.palt_doc_img_url.value, shipDocExt);	//파일 확장자 확인
    if(!isOk){
    	//'You can\'t upload unauthorized file!\n\nThe premitted file extension is ['+shipDocExt+']'); alert(getLabel2('SEE_MSG_062', new Array(shipDocExt)));
    	alert(getLabel('FMS_COM_ALT027') + shipDocExt + "\n\n: SEE_BMD_0051.106");
    }
    /*
    if(formObj.brd_file.value!=''){
    	if(getFileNameLength(formObj.brd_file.value)>40){
    		//'Please change selected file name! The file name must be in 40 character include file extensio!');
    		return false;
    	}	
    }*/
    //textarea 길이 체크
	if(checkInputVal(formObj.palt_doc_msg.value, 0, 1000, "T", 'MESSAGE')!='O'){
    	isOk=false;
    }
	else if(checkInputVal(formObj.palt_doc_rmk.value, 0, 50, "T", 'REMARK')!='O'){
    	isOk=false;
    }
	if(isOk){
    	return true;
    }
}
/*pop up open*/
function doPop(srcName){
    var formObj=document.frm1;
    switch(srcName) {
		case "PARTNER_POPLIST":
	   		var rtnary=new Array(1);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
   	        var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
   	        //window.open ('./CMM_POP_0010.clt', "list", "scrollbars=no,fullscreen=no,width=1024,height=480");
   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				return;
			}else{
				var rtnValAry=rtnVal.split("|");
				formObj.palt_trdp_cd.value=rtnValAry[0];//trdp_cd
				formObj.s_trdp_short_nm.value=rtnValAry[1];//shrt_nm
				formObj.s_trdp_full_nm.value=rtnValAry[2];//full_nm
			}
         break; 
    }
} 
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	/*
	var arg=window.dialogArguments;
    formObj.intg_bl_seq.value=arg[0];
 	formObj.intg_bl_rgst_tms.value=arg[1];
 	//formObj.mbl_no.value = arg[2];
 	//formObj.hbl_no.value = arg[3];
 	formObj.palt_doc_seq.value=arg[2];
 	formObj.f_cmd.value=arg[3];
 	if(arg[3]=="SEARCH01" && formObj.hbl_no.value ==""){
 		doWork('SEARCH01');
 	}else if(arg[3]=="SEARCH02" && formObj.hbl_no.value =="") {
 		doWork('SEARCH02');
 	}
 	opener.searchSheet3Child();
 	*/
	/*
    if(formObj.doc_tp_cd.value!=""){
    	formObj.palt_doc_tp_cd.value=formObj.doc_tp_cd.value;
    }
    if(formObj.palt_doc_tp_cd.value=="UD"){
    	formObj.palt_doc_nm.disabled=false;
    }else{
    	formObj.palt_doc_nm.value="";
    	formObj.palt_doc_nm.disabled=true;
    }
    */
}	
function downloadFile(downType){
	frm2.docType.value=downType;
	frm2.target='ifrm1';
	frm2.submit();
}
