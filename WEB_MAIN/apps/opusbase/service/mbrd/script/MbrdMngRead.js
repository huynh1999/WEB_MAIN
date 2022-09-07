/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MbrdMngRead.jsp
*@FileTitle  : 게시판 등록화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/25
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

function loadPage(){
	var formObj=document.fName;
	if(formObj.f_rtn_cmd.value =="ADD" || formObj.f_rtn_cmd.value =="MODIFY" || formObj.f_rtn_cmd.value =="REMOVE"){
		doWork("SEARCHLIST");
	}
	//alert(formObj.f_usrid.value)
	//alert(formObj.proc_usrid.value)
	if(formObj.f_usrid.value != formObj.proc_usrid.value){
		if(getBtnObj("btnModify") != null){
			getBtnObj('btnModify').style.display='none';
		}
	}else{
		if(getBtnObj("btnModify") != null){
			getBtnObj('btnModify').style.display='';
		}
	}
}
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    try {
        switch(srcName){
        	case "NEW":	//신규 작성화면 이동
            	//doShowProcess();
   		    	fName.f_cmd.value=COMMAND01;
   		    	fName.action='./MbrdMngRead.usr';
                fName.submit();
    	    break;
	        case "SEARCHLIST":	//조회
	        	//doShowProcess();
				var pgmSeqParam=fName.pgm_seq.value; 
				var pgmNmParam=fName.pgm_nm.value; 
				var pgmUrlParam=fName.pgm_url.value; 
				var locUrlParam=encodeURIComponent(fName.loc_url.value); 
				var usridParam=fName.proc_usrid.value; 
				var loclUsrNmParam=encodeURIComponent(fName.locl_usr_nm.value);
				var f_kind=fName.f_kind.value;
				var f_due_bgn_dt=fName.f_due_bgn_dt.value;
				var f_due_end_dt=fName.f_due_end_dt.value;
				var f_pgm_id=fName.f_pgm_id.value;
				var f_pgm_nm=fName.f_pgm_nm.value;
				var f_modi_usrid=fName.f_modi_usrid.value;
				var f_modi_eng_usr_nm=fName.f_modi_eng_usr_nm.value;				
				//var param = "?pgm_seq="+pgmSeqParam+"&pgm_url="+pgmUrlParam+"&pgm_nm="+pgmNmParam+"&loc_url="+locUrlParam+"&usrid="+usridParam+"&locl_usr_nm="+loclUsrNmParam+"&f_kind="+f_kind+"&f_due_bgn_dt="+f_due_bgn_dt+"&f_due_end_dt="+f_due_end_dt+"&f_pgm_id="+f_pgm_id+"&f_pgm_nm="+f_pgm_nm+"&f_modi_usrid="+f_modi_usrid+"&f_modi_eng_usr_nm="+f_modi_eng_usr_nm;
				//alert(param);
	        	//fName.action = './MbrdList.usr' + param;
	        	fName.action='./MbrdList.usr';
	        	fName.submit();
		    break;
            case "ADD":			//등록
                if(checkAddModiVal(fName)){
            		//doShowProcess();
            		fName.save_yn.value="Y";
	        	    fName.f_cmd.value=ADD;
	   		    	fName.action='./MbrdMngRead.usr';	//http://116.127.225.112:8001/opusfwd
	                fName.submit();
                }
    	    break;
            case "MODIFY":		//수정
            	/*
            	if(fName.f_usrid.value != fName.proc_usrid.value){
            		alert("not match");
            		return;
            	}
            	*/
            	if(fName.rply_cnt.value > 0){
            		alert("When the Reply is exist, You can not modify the data ");
            		return;
            	}
                if(checkAddModiVal(fName)){            	
                	//if(confirm(getLabel('FMS_COM_CFMSAV'))){
	            		//doShowProcess();
	            		fName.save_yn.value="Y";
		        	    fName.f_cmd.value=MODIFY;
		   		    	fName.action='./MbrdMngRead.usr';
		                fName.submit();
	            	//}
                }
    	    break;
    	    case "GO_REPLY":			//등록
                if(checkAddModiVal(fName)){
            		//doShowProcess();
            		fName.save_yn.value="Y";
	        	    fName.f_cmd.value=COMMAND04;
	   		    	fName.action='./MbrdMngRead.usr';	//http://116.127.225.112:8001/opusfwd
	                fName.submit();
                }
    	    break;
            case "REMOVE":		//게시물 삭제
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
            		//doShowProcess();
	        	    fName.f_cmd.value=REMOVE;
	   		    	fName.action='./MbrdMngRead.usr';
	                fName.submit();
            	}
    	    break;
            case "REMOVE01":	//첨부파일 삭제
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
            		//doShowProcess();
            		fName.save_yn.value="Y";
	        	    fName.f_cmd.value=REMOVE01;
	   		    	fName.action='./MbrdMngRead.usr';
	                fName.submit();
            	}
    	    break;
    	    case "COMMAND03":
    	    	var s_brd_seq=fName.brd_seq.value;
				var s_loc_url=fName.loc_url.value.split("/opusfwd")[0] + "/opusfwd";
            	downloadFile('org',s_brd_seq, s_loc_url);
            break;
    	    case "PGM_POPUP":
    	    	rtnary=new Array(2);
		      	rtnary[0]=fName.pgm_seq.value;
		      	rtnary[1]=fName.pgm_nm.value;
		      	
		      	callBackFunc = "PGM_POPUP";
		   		modal_center_open('./ProgramPopList.usr', rtnary, 556,600,"yes");
		      	
		      break;
   			case "CLOSE":
   		    	window.close();
   	    	break; 		      
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        } 
    }
}
//파일 다운로드
function downloadFile(downType,s_brd_seq, s_loc_url){
	document.fName2.docType.value=downType;
	document.fName2.s_brd_seq.value=s_brd_seq;
	//alert(s_loc_url.indexOf("http://"));
	if(s_loc_url == '' || s_loc_url.indexOf("http://")== -1 || s_loc_url.indexOf(":8001/opusfwd")== -1)
	{
		return;
	}
	document.fName2.action=s_loc_url+'/GateServletNSession.gsl';
	document.fName2.submit();
}
function checkAddModiVal(fName){
    var isOk=true; //checkFileExt(fName.file_nm.value, noticeDocExt);	//파일 확장자 확인
     //Title
    if((fName.brd_tit.value).length == 0){
    	alert(getLabel('FMS_COM_ALT007'));
    	fName.brd_tit.focus();
    	isOk=false;
     //Contents
    }else if((fName.brd_desc.value).length == 0){
    	alert(getLabel('FMS_COM_ALT007'));
    	isOk=false;	
    }else if(fName.due_dt.value ==""){
    	alert(getLabel('FMS_COM_ALT001') + "\n-" + getLabel('FMS_COD_DUEDT'));
    	fName.due_dt.focus();
    	isOk=false;
    }
     /* xxxxxxxxxxxxxxxxxxx
    if(!isOk){
    	//'You cannot upload the file with not permitted file extension!\r\n\r\nPermitted file extensions are as follows.')+' ['+noticeDocExt+']');
    	alert(getLabel('FMS_COM_ALT027') + noticeDocExt);
    }
    if(fName.brd_file.value!=''){
    	if(getFileNameLength(fName.brd_file.value)>40){
    		//Please modify the name of selected file!\r\n\r\nIts name should be limited to 40 characters or less.
    		alert(getLabel('SYS_COM_ALT002'));
    		return false;
    	}	
    }
    //Title
    if((fName.brd_tit.value).length < 1){
    	alert(getLabel('FMS_COM_ALT007')+ "\n-Title\n(The Min. Length of this field is 1.)");
    	isOk=false;
    }else if(checkInputVal(fName.brd_tit.value, 10, 100, "T",   getLabel('SYS_COD_TITL'))!='O'){
    	isOk=false;
    //Contents
    }else if((fName.brd_ctnt.value).length < 10){
    	alert(getLabel('FMS_COM_ALT007')+ "\n-Contents\n(The Min. Length of this field is 10.)");
    	isOk=false;	
    }else if(checkInputVal(fName.brd_ctnt.value, 10, 1000, "T", getLabel('SYS_COD_CONT'))!='O'){
    	isOk=false;
    }
    */
    if(isOk){
    	return true;
    }
}
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 
            var cal=new ComCalendar();
            cal.select(formObj.due_dt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * 게시기간 설정관
 */
function doDispDate(obj){
	var tmpObj=getObj('dateDispObj'); 
	if(obj.value=='P'){
		tmpObj.style.display='none';
		fName.dp_end_dt.value='3000-12-31';
	}else{
		tmpObj.style.display='block';
		fName.dp_end_dt.value='';
	}
}
function setDfDate(){
	/*
	if(fName.dp_end_dt.value==''){
		fName.dp_end_dt.value='3000-12-31';
	}
	*/
}
function complete(){
	//alert(getLabel('FMS_COM_NTYCOM'));	
	//showCompleteProcess();
}
function PGM_POPUP(rtnVal){
		var formObj=document.fName;
   	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
    	return;
  	} else {
    	var rtnValAry=rtnVal.split("|");
    	fName.pgm_seq.value=rtnValAry[0];
    	fName.pgm_nm.value=rtnValAry[1];
    	fName.lev1_nm.value=rtnValAry[2];
    	fName.lev2_nm.value=rtnValAry[3];
    	fName.lev3_nm.value=rtnValAry[4];
  	}
}
