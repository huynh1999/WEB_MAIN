function doWork(srcName){
    //var sheetObj = docObjects[0];
    var formObj  = document.frm1;
    
	try {
        switch(srcName) {
    	   case "DEPARTURE":
				
    		   //if(formObj.sts_cd.value == "Released"){
    			   
    			    if(formObj.etd_dt.value == ""){
    			    	alert("Please, enter the Flight Date.");
    			    	return;
    			    }
    			   
    			    if(formObj.etd_dt.value == ""){
    			    	alert("Please, enter the Time.");
    			    	return;
    			    }
				    var reqParam = '&intg_bl_seq=' + formObj.intg_bl_seq.value;
					reqParam += '&mbl_no=' +formObj.mbl_no.value;
					reqParam += '&sts_cd=' + formObj.sts_cd.value;
					reqParam += '&flt_no=' + formObj.flt_no.value;
					reqParam += '&etd_dt_tm=' + formObj.etd_dt_tm.value;
					reqParam += '&etd_dt=' + formObj.etd_dt.value;
					reqParam += '&etd_tm=' + formObj.etd_tm.value;
					reqParam += '&bl_type=' + formObj.bl_type.value;
					reqParam += '&dep_cd=' + "DEP";
					
			    	ajaxSendPost(ediDepartureSend, 'reqVal', '&goWhere=aj&bcKey=ediFSUSend'+reqParam, './GateServlet.gsl');
			    	
    		   //}else{
    		   //   alert("BL can departure when the status is [Released]");
    		   //}
   		 	
    	   break;    
    	   case "CLOSE":
    		   
    			var retArray = "";	
    			
    			formObj.etd_dt_tm.value = formObj.etd_dt.value + " " + formObj.etd_tm.value;
    			
    			retArray += formObj.intg_bl_seq.value;
    		 	retArray += "|";
    		 	retArray += formObj.sts_cd.value;
    		 	retArray += "|";
    		 	retArray += formObj.etd_dt_tm.value;
    		 		 	
    		 	window.returnValue = retArray;
    		 	
    		 	window.close();
       	   break;	 
    	   
    	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: EDI_DBA_0030.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: EDI_DBA_0030.002");
        }
	}
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {

	var arg=window.dialogArguments;
	
	var formObj  = document.frm1;
	formObj.intg_bl_seq.value = arg[0];
	formObj.mbl_no.value = arg[1];
	formObj.sts_cd.value = arg[2];
	formObj.flt_no.value = arg[3];
	formObj.etd_dt_tm.value = arg[4];
	formObj.etd_dt.value = arg[5];
	formObj.etd_tm.value = arg[6];
	formObj.bl_type.value = arg[7];
	
//    for(i=0;i<docObjects.length;i++){
//        //khlee-시작 환경 설정 함수 이름 변경
//        comConfigSheet(docObjects[i], SYSTEM_FIS);
//
//        initSheet(docObjects[i],i+1);
//        //khlee-마지막 환경 설정 함수 추가
//        comEndConfigSheet(docObjects[i]);
//    }
}
 
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	        var cal = new calendarPopup();
	        cal.select(obj, obj.name, 'MM-dd-yyyy');
	    break;
    }
}

function ediDepartureSend(reqVal){
	
	var formObj  = document.frm1;	 
    var doc = getAjaxMsgXML(reqVal);
    
    alert(doc[0]);
    
	var targetFr= 'mainFrame';
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@^');
			
			formObj.intg_bl_seq.value   = rtnArr[0];//intg_bl_seq 
			formObj.sts_cd.value		= rtnArr[1];//sts_cd
//			formObj.etd_dt.value    	= rtnArr[2];//etd_dt
//			formObj.etd_tm.value    	= rtnArr[3];//etd_tm
			
		}
	}else{
		alert(getLabel('Fail'));		
	}
    
}