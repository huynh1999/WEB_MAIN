/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0110.jsp
*@FileTitle  : Option
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/29
=========================================================*/
function doWork(srcName){
    switch(srcName) {
		case "Print":
			if(frm1.app_stamp[0].checked){
				frm1.stamp.value='Y';
			}else{
				frm1.stamp.value='N';
			}
			var tmp=frm1.sell_buy_tp_cd.value;
			if(frm1.open_type.value=='C'){
				if(tmp=='S' && frm1.doc_type[0].checked){
					frm1.title.value='CUSTOMER COMBINED INVOICE';
				}else if(tmp=='S' && frm1.doc_type[1].checked){
					frm1.title.value='CUSTOMER COMBINED INVOICE';
				}else if(tmp=='B' && frm1.doc_type[0].checked){
					frm1.title.value='PAYMENT REQUEST';
				}else if(tmp=='B' && frm1.doc_type[1].checked){
					frm1.title.value='PAYMENT REQUEST';
				}else if(tmp=='D' && frm1.doc_type[0].checked){
					frm1.title.value='DEBIT COMBINED INVOICE';
				}else if(tmp=='D' && frm1.doc_type[1].checked){
					frm1.title.value='DEBIT COMBINED INVOICE';
				}else if(tmp=='C' && frm1.doc_type[0].checked){
					frm1.title.value='PAYMENT REQUEST';
				}else if(tmp=='C' && frm1.doc_type[1].checked){
					frm1.title.value='CREDIT INVOICE';
				}
				frm1.cmd_type.value='64';
			}else if(frm1.open_type.value=='L'){
				if(tmp=='S' && frm1.doc_type[0].checked){
					frm1.title.value='CUSTOMER COMBINED INVOICE LIST';
				}else if(tmp=='S' && frm1.doc_type[1].checked){
					frm1.title.value='CUSTOMER COMBINED INVOICE LIST';
				}else if(tmp=='B' && frm1.doc_type[0].checked){
					frm1.title.value='PAYMENT REQUEST LIST';
				}else if(tmp=='B' && frm1.doc_type[1].checked){
					frm1.title.value='PAYMENT REQUEST LIST';
				}else if(tmp=='D' && frm1.doc_type[0].checked){
					frm1.title.value='DEBIT COMBINED INVOICE LIST';
				}else if(tmp=='D' && frm1.doc_type[1].checked){
					frm1.title.value='DEBIT COMBINED INVOICE LIST';
				}else if(tmp=='C' && frm1.doc_type[0].checked){
					frm1.title.value='PAYMENT REQUEST LIST';
				}else if(tmp=='C' && frm1.doc_type[1].checked){
					frm1.title.value='CREDIT INVOICE LIST';
				}
				frm1.cmd_type.value='65';
			}
			popPOST(frm1, 'RPT_PRN_0050.clt', 'popTest', 1025, 740);
		break;
		case "CLOSE":
	    	window.close();
    	break;
    }
}
