/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0090.js
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
				formObj.cmd_type.value='54';
				formObj.stamp.value=frm1.stamp_type.value;
			}else if(formObj.bl_type[1].checked){
				formObj.cmd_type.value='54';
				formObj.all.value='Y';
				formObj.stamp.value='';
			}else{
				formObj.cmd_type.value='55';
				formObj.stamp.value=frm1.stamp_type.value;
			}
			popPOST(formObj, 'RPT_PRN_0010.clt', 'popTest', 1025, 740);
		break;
		case "CLOSE":
	    	window.close();
    	break;
    }
}
