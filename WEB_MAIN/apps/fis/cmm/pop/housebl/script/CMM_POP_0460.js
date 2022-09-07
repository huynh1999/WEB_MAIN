/*=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : COM_POP_0460.js
 *@FileTitle  : Print Popup
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2017/04/03
=========================================================*/

function doWork(srcName) {	
	
	var formObj = document.frm1;
	
	try {
		switch (srcName) {		
		case "PRINT": 		
			
			formObj.title.value = "CONTAINER LOAD PLAN";
			formObj.file_name.value = "clp.mrd";
			     	
        	// Parameter Setting        	
			var param = '[' + formObj.bkg_seq.value + ']';			//[1]
			param += '[' + formObj.ofc_cd.value + ']';				//[2]
			param += '[' + formObj.trk_trdp_nm.value + ']';			//[3]
			param += '[' + formObj.trk_trdp_addr.value + ']';		//[4]
			param += '[' + formObj.trk_trdp_attention.value + ']';	//[5]
			param += '[' + formObj.trk_trdp_phn.value + ']';		//[6]
			param += '[' + formObj.trk_trdp_fax.value + ']';		//[7]			
			formObj.rd_param.value = param;			
			
        	popPOST(frm1, "RPT_RD_0010.clt", "popTest", 1025, 740);
			break;   
			
		case "CLOSE":
			window.close();
 		   //ComClosePopup(); 
    	   break;	
    	   
		case "CFS_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
		   	rtnary[1]="";
        	rtnary[2]=window;
        	
        	callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
		break;
		} // end switch
		
	} catch (e) {
		if (e == "[object Error]") {
			// Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			// System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e);
		}
	}
}

function CUSTOMER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.trk_trdp_cd.value=rtnValAry[0];
		formObj.trk_trdp_nm.value=rtnValAry[2];		
		//#2677 [PATENT] Bugs were reported when doing internal testing for Consolication
		//formObj.trk_trdp_attention.value=rtnValAry[4];
		formObj.trk_trdp_attention.value=rtnValAry[3];
		formObj.trk_trdp_phn.value=rtnValAry[4];
		formObj.trk_trdp_fax.value=rtnValAry[5];
		$("#trk_trdp_addr").val(rtnValAry[7]);
	}
}

