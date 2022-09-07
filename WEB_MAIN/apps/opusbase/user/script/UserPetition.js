function doWork(srcName){
	if(!btnVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    try {
        switch(srcName){
	        case "SEARCHLIST":	//조회
	        	doShowProcess();
	        	fName2.action = './NoticeList.clt';
	        	fName2.submit();
		    break;
            case "ADD":			//등록

                if(checkAddModiVal(fName)){
                	//Do you want to proceed?
                    if(confirm(getLabel('FMS_COM_CFMCON'))){
	            		doShowProcess();
		            	
		        	    fName.f_cmd.value = ADD;
		   		    	fName.action = './NoticeMngRead.clt';
		                fName.submit();
	            	}
                }
    	    break;
            case "MODIFY":		//수정
                if(checkAddModiVal(fName)){            	
	            	if(confirm(getLabel('FMS_COM_CFMMOD'))){
	            		doShowProcess();
		        	    fName.f_cmd.value = MODIFY;
		   		    	fName.action = './NoticeMngRead.clt';
		                fName.submit();
	            	}
                }
    	    break;
            case "REMOVE":		//게시물 삭제
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
            		doShowProcess();
	        	    fName.f_cmd.value = REMOVE;
	   		    	fName.action = './NoticeMngRead.clt';
	                fName.submit();
            	}
    	    break;
            case "REMOVE01":	//첨부파일 삭제
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
            		doShowProcess();
	        	    fName.f_cmd.value = REMOVE01;
	   		    	fName.action = './NoticeMngRead.clt';
	                fName.submit();
            	}
    	    break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: UserPetition.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: UserPetition.002");
        }
    }
}

function checkAddModiVal(fName){
    var isOk = checkFileExt(fName.brd_file.value, noticeDocExt);	//파일 확장자 확인
    if(!isOk){
    	//alert(getLabel('You cannot upload the file with not permitted file extension!\r\n\r\nPermitted file extensions are as follows.')+' ['+noticeDocExt+']');
    	alert(getLabel('FMS_COM_ALT027') + noticeDocExt + "\n\n: UserPetition.62");
    }
    if(fName.brd_file.value!=''){
    	if(getFileNameLength(fName.brd_file.value)>40){
    		//Please modify the name of selected file!\r\n\r\nIts name should be limited to 40 characters or less.
    		alert(getLabel('SYS_COM_ALT002')+ "\n\n: UserPetition.67");
    		return false;
    	}	
    }
    //Expire Date
    if(checkInputVal(fName.dp_end_dt.value, 10, 10, "D", getLabel('SYS_COD_EXDT'))!='O'){
    	isOk = false;
    //Title
    }else if(checkInputVal(fName.brd_tit.value, 10, 100, "T", getLabel('SYS_COD_TITL'))!='O'){
    	isOk = false;
    //Contents	
    }else if(checkInputVal(fName.brd_ctnt.value, 10, 1000, "T", getLabel('SYS_COD_CONT'))!='O'){
    	isOk = false;
    }
    if(isOk){
    	return true;
    }
}

function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.dp_end_dt, 'dp_end_dt', 'yyyy-MM-dd');
        break;
    }
}

/**
 * 게시기간 설정관
 */
function doDispDate(obj){
	var tmpObj = getObj('dateDispObj'); 
	if(obj.value=='P'){
		tmpObj.style.display = 'none';
		fName.dp_end_dt.value = '3000-12-31';
		
	}else{
		tmpObj.style.display = 'block';
		fName.dp_end_dt.value = '';
	}
}

function setDfDate(){
	if(fName.dp_end_dt.value==''){
		fName.dp_end_dt.value = '3000-12-31';
	}
}