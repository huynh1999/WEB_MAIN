/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0330.js
*@FileTitle  : ?
*@author     : CLT
*@version    : 1.0
*@since      : 
=========================================================*/

function loadPage() {	
}

function doWork(srcName, curObj, valObj){
	var formObj=document.frm1;	
	switch(srcName) {
		case "CLOSE":
			var retArray=false;
			ComClosePopup(retArray); 
		break;	       
		case "YES":
			
			var retArray="";
			
			var h_volume = formObj.h_volume.value;
			var k_volume = formObj.k_volume.value;
			var r_sum = Number(h_volume) + Number(k_volume); 
			
			if(r_sum == 100){
				retArray += true
				retArray += "|";
				retArray += h_volume;
				retArray += "|";
				retArray += k_volume;
				
				ComClosePopup(retArray); 
				
			}else{
				alert(getLabel('EDI_COM_ALT248'));			
				
			}
			
			
		break;	       
		case "NO":
			var retArray=false;
			ComClosePopup(retArray); 
			break;	       
    }
}

