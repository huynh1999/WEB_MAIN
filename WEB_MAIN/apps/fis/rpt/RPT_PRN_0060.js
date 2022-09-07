/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0060.js
*@FileTitle  : Sea Tariff Report
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
function doWork(srcName){
	formObj=document.frm1;
    switch(srcName) {
		case 'Print':
			if(formObj.air_sea_clss_cd.value=='S'){
				formObj.cmd_type.value='31';
			}else{
				formObj.cmd_type.value='50';
			}
			popPOST(formObj, 'RPT_PRN_0010.clt', 'popTest', 1025, 740);
		break;
		case "CLOSE":
	    	window.close();
    	break;
    }
}
