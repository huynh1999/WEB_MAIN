/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0040.js
*@FileTitle  : Option
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
function doWork(srcName){
    switch(srcName) {
		case "Print":
			if(frm1.open_type.value=='S'){
				if(frm1.app_stamp[0].checked){
					frm1.stamp.value='Y';
				}else{
					frm1.stamp.value='N';
				}
				if(frm1.doc_type[0].checked){
					frm1.title.value='PAYMENT REQUEST';
					frm1.cmd_type.value='37';
				}else if(frm1.doc_type[1].checked){
					frm1.title.value='STATEMENT';
					frm1.cmd_type.value='10';
				}
			}else if(frm1.open_type.value=='G'){
				if(frm1.app_stamp[0].checked){
					frm1.stamp.value='Y';
				}else{
					frm1.stamp.value='N';
				}
				if(frm1.doc_type[0].checked){
					frm1.title.value='PAYMENT REQUEST';
					frm1.cmd_type.value='61';
				}else if(frm1.doc_type[1].checked){
					frm1.title.value='PAYMENT REQUEST';
					frm1.cmd_type.value='62';
				}
			}else if(frm1.open_type.value=='GL'){
				if(frm1.app_stamp[0].checked){
					frm1.stamp.value='Y';
				}else{
					frm1.stamp.value='N';
				}
				if(frm1.doc_type[0].checked){
					frm1.title.value='G. Invoice List';
					frm1.cmd_type.value='66';
				}else if(frm1.doc_type[1].checked){
					frm1.title.value='G. Invoice List';
					frm1.cmd_type.value='66';
				}
			}else{
				if(frm1.app_stamp[0].checked){
					frm1.stamp.value='Y';
				}else{
					frm1.stamp.value='N';
				}
				var tmp=frm1.sell_buy_tp_cd.value;
				if(frm1.open_type.value=='I'){
					if(tmp=='S' && frm1.doc_type[0].checked && frm1.frt_ask_clss_cd.value!='SU'){
						frm1.title.value='CUSTOMER INVOICE';
						frm1.cmd_type.value='7';
					}else if(tmp=='S' && frm1.doc_type[1].checked && frm1.frt_ask_clss_cd.value!='SU'){
						frm1.title.value='CUSTOMER INVOICE';
						frm1.cmd_type.value='32';
					}else if(tmp=='D' && frm1.doc_type[0].checked && frm1.frt_ask_clss_cd.value!='SU'){
						frm1.title.value='DEBIT INVOICE';
						frm1.cmd_type.value='8';
					}else if(tmp=='D' && frm1.doc_type[1].checked && frm1.frt_ask_clss_cd.value!='SU'){
						frm1.title.value='DEBIT INVOICE';
						frm1.cmd_type.value='34';
					}else if(tmp=='B' && frm1.doc_type[0].checked && frm1.frt_ask_clss_cd.value!='SU'){
						frm1.title.value='PAYMENT REQUEST';
						frm1.cmd_type.value='9';
					}else if(tmp=='B' && frm1.doc_type[1].checked && frm1.frt_ask_clss_cd.value!='SU'){
						frm1.title.value='PAYMENT REQUEST';
						frm1.cmd_type.value='33';
					}else if(tmp=='C' && frm1.doc_type[0].checked && frm1.frt_ask_clss_cd.value!='SU'){
						frm1.title.value='PAYMENT REQUEST';
						frm1.cmd_type.value='35';
					}else if(tmp=='C' && frm1.doc_type[1].checked && frm1.frt_ask_clss_cd.value!='SU'){
						frm1.title.value='CREDIT INVOICE';
						frm1.cmd_type.value='36';
					}else if(frm1.doc_type[0].checked && frm1.frt_ask_clss_cd.value=='SU'){
						if(tmp=='B' || tmp=='C'){
							frm1.title.value='PAYMENT REQUEST';
						}else{
							frm1.title.value='TOTAL INVOICE';
						}
						frm1.cmd_type.value='63';
					}else if(frm1.doc_type[1].checked && frm1.frt_ask_clss_cd.value=='SU'){
						frm1.title.value='TOTAL INVOICE';
						frm1.cmd_type.value='43';
					}
				}else if(frm1.open_type.value=='L'){
					if(tmp=='S' && frm1.doc_type[0].checked){
						frm1.title.value='CUSTOMER INVOICE LIST';
						frm1.cmd_type.value='38';
					}else if(tmp=='S' && frm1.doc_type[1].checked){
						frm1.title.value='CUSTOMER INVOICE LIST';
						frm1.cmd_type.value='38';
					}else if(tmp=='D' && frm1.doc_type[0].checked){
						frm1.title.value='DEBIT INVOICE LIST';
						frm1.cmd_type.value='40';
					}else if(tmp=='D' && frm1.doc_type[1].checked){
						frm1.title.value='DEBIT INVOICE LIST';
						frm1.cmd_type.value='40';
					}else if(tmp=='B' && frm1.doc_type[0].checked){
						frm1.title.value='PAYMENT REQUEST LIST';
						frm1.cmd_type.value='39';
					}else if(tmp=='B' && frm1.doc_type[1].checked){
						frm1.title.value='PAYMENT REQUEST LIST';
						frm1.cmd_type.value='39';
					}else if(tmp=='C' && frm1.doc_type[0].checked){
						frm1.title.value='PAYMENT REQUEST LIST';
						frm1.cmd_type.value='41';
					}else if(tmp=='C' && frm1.doc_type[1].checked){
						frm1.title.value='CREDIT INVOICE LIST';
						frm1.cmd_type.value='42';
					}
//					var param = 'cmd_type=' + frm1.cmd_type.value;
//					param += '&title=' + frm1.title.value;
//					param += '&inv_no=' + frm1.inv_no.value;
//					param += '&stamp=' + frm1.stamp.value;
//					param += '&remark=' + frm1.remark.value;
//					param += '&air_sea_clss_cd=' + frm1.air_sea_clss_cd.value;
//					param += '&sell_buy_tp_cd=' + frm1.sell_buy_tp_cd.value;
//					param += '&s_inv_sts_cd=' + frm1.s_inv_sts_cd.value;
//					param += '&sel_strdt=' + frm1.sel_strdt.value;
//					param += '&sel_enddt=' + frm1.sel_enddt.value;
//					param += '&usr_cd=' + frm1.usr_cd.value;
//					param += '&dept_cd=' + frm1.dept_cd.value;
//					param += '&trdp_cd=' + frm1.trdp_cd.value;
//					param += '&date_cd=' + frm1.date_cd.value;
				}else{
					//error
				}
			}
			if(frm1.open_type.value=='L' || frm1.frt_ask_clss_cd.value=='SU' || frm1.open_type.value=='GL'){
				popPOST(frm1, 'RPT_PRN_0050.clt', 'popTest', 1025, 740);
			}else{
				popPOST(frm1, 'RPT_PRN_0010.clt', 'popTest', 1025, 740);
			}
		break;
		case "CLOSE":
	    	window.close();
    	break;
    }
}
