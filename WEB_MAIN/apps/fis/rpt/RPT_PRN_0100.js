
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0100.js
*@FileTitle  : B/L Print
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
function doWork(srcName){
	var formObj=document.frm1;
    switch(srcName) {
    case "PRINT":
		if(formObj.bl_type[0].checked){
			formObj.cmd_type.value='56';
		}else if(formObj.bl_type[1].checked){
			formObj.cmd_type.value='57';
		}
		formObj.stamp.value=formObj.stamp_type.value;
		popPOST(formObj, 'RPT_PRN_0010.clt', 'popTest', 1025, 740);
	break;
		case "CLOSE":
	    	window.close();
    	break;
    }
}
