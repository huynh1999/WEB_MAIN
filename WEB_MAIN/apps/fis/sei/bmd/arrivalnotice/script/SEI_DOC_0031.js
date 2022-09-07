function doWork(srcName){
    var formObj  = document.frm1;
    switch(srcName) {
    	case "SEARCH01":
        	formObj.f_cmd.value = SEARCH01;
			        
        	doProcess = true;
            showProcess('WORKING', document);
            formObj.action = "./SEI_DOC_0031.clt";
            formObj.submit();
       	break;
       	case "SEARCH02":
        	formObj.f_cmd.value = SEARCH02;
        	doProcess = true;
            showProcess('WORKING', document);
            formObj.action = "./SEI_DOC_0031.clt";
            formObj.submit();
       	break;
		case "ADD":
			formObj.f_cmd.value = ADD;			
            //업로드 가능한 확장자인 경우
            if(checkAddModiVal(formObj)){
                if(confirm(getLabel('SEI_BMD_MSG44'))){
                    doProcess = true;
                    showProcess('WORKING', document);
                    formObj.action = "./SEI_DOC_0031.clt";
                    formObj.submit();
                }            	
            }
       	break;
		case "MODIFY":
			formObj.f_cmd.value = MODIFY;
			if(formObj.palt_doc_no.value!=""){
				alert(getLabel('SEI_BMD_MSG71'));
				break;
			}
            if(checkAddModiVal(formObj)){
                if(confirm(getLabel('SEI_BMD_MSG69'))){
                    doProcess = true;
                    showProcess('WORKING', document);
                    formObj.action = "./SEI_DOC_0031.clt";
                    formObj.submit();
                }            	
            }
       	break;
		case "REMOVE":
			if(confirm(getLabel('FMS_COM_CFMDEL'))){
				formObj.f_cmd.value = REMOVE;
                showProcess('WORKING', document);
                formObj.action = "./SEI_DOC_0031.clt";
                formObj.submit();
			}
		break;
       	case "CLOSE":
       		window.returnValue = "false";
       		window.close();
       	break;
        case "ANSEARCH":
        	formObj.f_cmd.value = SEARCH;   	
        	formObj.iss_dt.value = "";
		    formObj.ft_dt.value = "";
		    
		    formObj.s_tmplt_tit.options[0] = new Option( '',  ''  );
			formObj.s_tmplt_tit.options.length = '1';	 
			
			formObj.tmplt_seq.value = "";
       		doANAction();
       	break;
       	case "ISSUE":
        	formObj.f_cmd.value = MODIFY01;
        	if(formObj.palt_doc_seq.value==""){
            	alert(getLabel('SEI_BMD_MSG72'));
            	break;
            }
			
			formObj.palt_doc_tp_cd.value = "AN";			
        	if(confirm(getLabel('SEI_BMD_MSG73'))){
	        	doProcess = true;
	            showProcess('WORKING', document);
	            formObj.action = "./SEI_DOC_0031.clt";
	            formObj.submit();
            }
       	break;
       	case "TITLESEARCH":
       		if(formObj.s_tmplt_tit.value!=''){
       			doTitleAction();	
       		}else{
       			formObj.palt_doc_nm.value  = '';
       			formObj.palt_doc_msg.value = '';
       		}
       	break;
       	case "TEMPOPEN":	//Template 등록 팝업 호출
       		getObj('tpObj').style.display = 'block';
       	break;
       	case "TEMPCLOSE":	//Template 등록 팝업 닫기
       		getObj('tpObj').style.display = 'none';
       		formObj.mk_tmplt_tit.value = '';
       		formObj.mk_tmplt_msg.value = '';
        break;
       	case "TEMPSAVE":
       		doaddTitleTempAction();
       	break;
    }
}

/* val check*/
function checkAddModiVal(formObj){
    var isOk = true;
    
    if(formObj.palt_doc_img_url.value!=""){
        var isOk = checkFileExt(formObj.palt_doc_img_url.value, shipDocExt);	//파일 확장자 확인
        
        if(!isOk){
        	//'You can\'t upload unauthorized file!\n\nThe premitted file extension is ['+shipDocExt+']'); alert(getLabel2('SEE_MSG_062', new Array(shipDocExt)));
        	alert(getLabel('FMS_COM_ALT027') + shipDocExt + "\n\n: SEI_DOC_0031.113");	
        }
    }
    if(isOk){
        if(checkInputVal(formObj.palt_doc_nm.value, 2, 50, "T", 'Title')!='O'){
        	isOk = false;
    	}
        else if(checkInputVal(formObj.palt_doc_msg.value, 1, 1000, "T", getLabel('MESSAGE'))!='O'){
        	isOk = false;
        }    	
    }
    return isOk;
}


/*팝업*/
function doPop(srcName){

    var formObj  = document.frm1;
    
    switch(srcName) {
	    case "PARTNER_POPLIST":
	   		var rtnary = new Array(1);
	   		rtnary[0] = "1";
	   		rtnary[1] = "";
	   		rtnary[2] = window;
	   		
	  	    var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	  	    
	  	    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}
	  	    else{
				var rtnValAry = rtnVal.split("|");
				formObj.palt_trdp_cd.value    = rtnValAry[0];//trdp_cd
				formObj.s_trdp_short_nm.value = rtnValAry[1];//shrt_nm
				formObj.s_trdp_full_nm.value  = rtnValAry[2];//full_nm   
			}     
		
	  	    break;
	}
} 

/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 팝업 호출      
             var cal = new calendarPopup();
             cal.select(formObj.iss_dt, 'iss_dt', 'yyyy-MM-dd');
        
             break;
             
        case 'DATE2':   //달력 조회 팝업 호출      
             var cal = new calendarPopup();
             cal.select(formObj.ft_dt, 'ft_dt', 'yyyy-MM-dd');
        
             break;
    }
}

/* 파일 다운로드 */
function downloadFile(downType){
	frm2.docType.value = downType;
	frm2.target = 'ifrm1';
	frm2.submit();
}

/**
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage(){
	//이슈가 안된경우 화면 처리
	if(!isIssued){
		doANAction();
		
		if((frm1.iss_dt.value=="") && (frm1.ft_dt.value=="")){
			fncFormStart();
		}
		
		this.focus();
	}
}

// 날짜 세팅
function fncFormStart() {
	var formObj = document.frm1;
	
	// 오늘 날짜 가져오기
	var now 	= new Date(); 				// 현재시간 가져오기
	var year	= now.getYear(); 			// 년도 가져오기
	var month	= now.getMonth() + 1; 		// 월 가져오기 (+1)
	var date	= now.getDate(); 			// 날짜 가져오기
	
	var fromDate = new Date();

	var tempDate = now.getTime() + ( 7*24*60*60*1000);
	fromDate.setTime(tempDate);
   
	var iyear = fromDate.getYear();
	var imonth = fromDate.getMonth() +1;
	var iday = fromDate.getDate();

	if(imonth < 10){
		imonth = "0"+(imonth);
	}
	
	if(iday < 10){
		iday = "0"+iday;
	}

	if(month < 10){
		month = "0"+(month);
	}
	
	if(date < 10){
		date = "0"+date;
	}

	var searchDay1 = iyear + "-" + imonth + "-" + iday;
	today = year +"-"+ month +"-"+ date +"";

	formObj.iss_dt.value = today;
	formObj.ft_dt.value = searchDay1;
}



/**
 * ANDO combo select
 */
function doANAction(){
	var formObj  = document.frm1;
	var s_bztp_cd = "AN";
	ajaxSendPost(dispANAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchANDO&s_bztp_cd='+s_bztp_cd, './GateServlet.gsl');
}

//ANDO combo표시 Ajax
function dispANAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split(';');
			var arrLen = rtnArr.length-1;

			document.frm1.s_tmplt_tit.options[0] = new Option( '',  ''  );
			var loopCnt = 1;
			for(var i = 0; i<arrLen; i++){
				var masterVals = rtnArr[i].split(',');	
				document.frm1.s_tmplt_tit.options[loopCnt] = new Option(masterVals[2],masterVals[0]);
				loopCnt++;
			}
			/*
			var s_tmplt_seq  = formObj.tmplt_seq.value;
			if(s_tmplt_seq !=""){
				var tmplt_seq = eval(s_tmplt_seq-1);
				document.frm1.s_tmplt_tit.options[tmplt_seq].selected = true;
			}
				*/					
		}
		else{
			document.frm1.s_tmplt_tit.options[0] = new Option( '',  ''  );
			document.frm1.s_tmplt_tit.options.length = '1';
		}
	}
	else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEI_DOC_0031.276");		
	}
}

/**
 * Title select
 */
function doTitleAction(){
	var formObj  = document.frm1;
	var	s_bztp_cd = "AN";
	var s_tmplt_seq = formObj.s_tmplt_tit.value;
	
	ajaxSendPost(dispTitleAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchTitle&s_bztp_cd='+s_bztp_cd+'&s_tmplt_seq='+s_tmplt_seq, './GateServlet.gsl');
}

//Title Ajax
function dispTitleAjaxReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split(';');
			var arrLen = rtnArr.length-1;
			
			for(var i = 0; i<arrLen; i++){
				var masterVals = rtnArr[i].split(',');	
				document.frm1.palt_doc_nm.value = masterVals[2];
				document.frm1.palt_doc_msg.value= masterVals[3];
			}
		}
		
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEI_DOC_0031.312");		
	}
	
}

/**
 * Template 저장
 */
function doaddTitleTempAction(){
	var formObj  = document.frm1;
	
	var tmplt_seq = formObj.tmplt_seq.value;
	var bztp_cd = "AN";
	
	var tmplt_tit = formObj.mk_tmplt_tit.value;
	var tmplt_msg = formObj.mk_tmplt_msg.value;	
	
	ajaxSendPost(dispaddTitleTempAjaxReq, 'reqVal', '&goWhere=aj&bcKey=addTitleTemp&bztp_cd='+bztp_cd+'&tmplt_tit='+tmplt_tit+'&tmplt_msg='+tmplt_msg, './GateServlet.gsl');

}

/**
 * Template 저장후 처리
 */
function dispaddTitleTempAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split(';');
			var arrLen = rtnArr.length-1;
			for(var i = 0; i<arrLen; i++){
				var masterVals = rtnArr[i].split(',');
				document.frm1.tmplt_seq.value=masterVals[0];
			}
		}
		doWork('TEMPCLOSE');
		doANAction();
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEI_DOC_0031.356");		
	}
	
}