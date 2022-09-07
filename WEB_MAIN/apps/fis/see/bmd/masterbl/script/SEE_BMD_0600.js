/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0600.jsp
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

function loadPage() {
	var formObj=document.frm1;
	//ifrm1.location.href = "http://www.track-trace.com/bol/open,self";
	//ifrm1.location.href = "http://connect.track-trace.com/open,self";
	//ifrm1.location.href = 'http://connect.track-trace.com/for/opus/billoflading/KKLURFR519224/open,self'
	//ifrm1.location.href = 'http://connect.track-trace.com/for/opus/billoflading/KKLURFR519224/action,direct'
	
	if(formObj.air_sea_clss_cd.value == "S"){
		if(frm1.f_bl_no.value != ""){
			formObj.search_radio[0].checked = true;
		}else{
			formObj.search_radio[1].checked = true;
		}
	}
	
	doWork('SEARCHLIST');
}



function doWork(srcName){
	var formObj=document.frm1;	
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":    	   		
    	   		var blNo   = formObj.f_bl_no.value;    	   		
    	   		var airSeaClssCd  = formObj.air_sea_clss_cd.value;
    	   		
    	   		var url = "";
    	   		//#5905 [Opus Demo] BL list에서 Tracking  button click 시 잘못된 tab 으로 오픈
    	   		//OFVFOUR-7056 [TRACK-TRACE CONNECT] POSSIBLE CHANGES TO SECURE CONNECTION FROM OPUS
    	   		var ptc = "https:";
    	   		if(airSeaClssCd =="S"){
    	   			var cntrNo = formObj.f_cntr_no.value;
    	   			if(formObj.search_radio[0].checked){
        	   			if( !ComIsNull(blNo) )  {
        	   				url = ptc+'//connect.track-trace.com/for/opus/billoflading/'+blNo+'/open,self'        	   				        	   				
        	   			}
        	   		}else if(formObj.search_radio[1].checked){
        	   			if( !ComIsNull(cntrNo) ){        	   				
        	   				url = ptc+'//connect.track-trace.com/for/opus/container/'+cntrNo+'/open,self';        	   				
        	   			}  
        	   		}
    	   		}else{    	   			
    	   			if( !ComIsNull(blNo) )  {
    	   				url = ptc+'//connect.track-trace.com/for/opus/aircargo/'+blNo+'/open,self'
    	   			}
    	   		}
    	   		    	   		
    	   		console.log(url);
    	   		
    	   		if(url != ""){
    	   			ifrm1.location.href = url;
    	   		}
    	   		
    	   	break;
    	   	
    	   	case "SEARCHCNTR" :
    	   		ajaxSendPost(cntrListReq, 'reqVal', '&goWhere=aj&bcKey=searchCntrList&ref_no='+formObj.f_ref_no.value, './GateServlet.gsl');
    	   	break;
		}
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
	}
}

function cntrListReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			//기존 cntr 옵션 삭제
			var s_cntr_no = formObj.f_cntr_no;
			for(var i=s_cntr_no.length-1; i>=0; i--){
				s_cntr_no.remove( s_cntr_no.options[i].index );
			}	
			
			//새로생성
			s_cntr_no.innerHTML = doc[1];
		}
	}
}
    	   		
