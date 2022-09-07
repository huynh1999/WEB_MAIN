/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0030.js
*@FileTitle  : Label_Print
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
//var 
function doWork(srcName){
    switch(srcName) {
		case 'Print':
			
			var param='loc_name=' + encodeURI(frm1.loc_name.value);
			param += '&loc_addr=' + frm1.loc_addr.value;
			param += '&attn=' + frm1.attn.value;
			param += '&zip_code=' + frm1.zip_code.value;
			frm1.action="./PRT_PRN_0010.clt";
			frm1.submit();	
			//popPOST(frm1, 'RPT_PRN_0010.clt','', 300,300);
//			window.showModalDialog('RPT_PRN_0010.clt?title=Label Print&cmd_type=26&'+param, [],'dialogWidth:1025px; dialogHeight:740px');
		break;
		case "CLOSE":
	    	window.close();
    	break;
    }
}
