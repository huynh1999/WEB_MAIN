/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : 
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2017/01/05
=========================================================*/
var dataArr = [];
var checkData;
function doWork(srcName){
    var formObj=document.frm1;
    var dataObj = parent.docObjects[0];
    try {
        switch(srcName) {
	        case "COPY":
	        	var to_role_cd = dataObj.Rows[dataObj.GetSelectRow()].C3;
	        	var role_cd = formObj.role_cd.value;
	        	var role_nm = formObj.role_nm.value;
	        	var role_desc = formObj.role_desc.value;
	        	var param = null;
    		   
	        	param =	'&to_role_cd=' + to_role_cd;
	        	param +=	'&role_cd=' + role_cd;
	        	param +=	'&role_nm=' + role_nm;
	        	param +=	'&role_desc=' + role_desc;
	        	
	        	console.log(param);
	        	
	        	if(paramCheck(role_cd)){
	        		ajaxSendPost(complate, 'reqVal', '&goWhere=aj&bcKey=copyRole' + param, './GateServlet.gsl');
	        	}

	        	break;    
       	   case "CLOSE":
       	    	ComClosePopup();
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0010.002");
        }
	}
}
function paramCheck(role_cd){
	if(dataArr.filter(function(item){return item == role_cd}).length > 0){
		alert(getLabel('FMS_COM_ALT008') + "(Role Code)");
		return false;
	}
	$.each(checkData, function(index, item){
		if($("#"+item.id).val()==""){
			alert(getLabel('FMS_COM_ALT007') + "("+item.name+")");
			return false;
		}else{
			return true;
		}
	});
	
	return true;
}
function complate(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK' && doc[1] != '' && doc[1] !='undefined'){
		if(doc[1] == "SUCCESS"){
			alert(getLabel('FMS_COM_NTYCOM'));
			parent.doWork("SEARCHLIST");
			ComClosePopup();
		}
	}
}
function loadPage(){
	
}
//@ sourceURL=RoleCopyPop.js
