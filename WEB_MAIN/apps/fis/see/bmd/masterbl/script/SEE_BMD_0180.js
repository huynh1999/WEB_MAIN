function doWork(srcName){
    if(!btnGetVisible(srcName)){
		return;
	}
    var formObj=document.frm1;
	try {
		switch(srcName){
			case "SEARCHLIST":
			   formObj.f_ref_no.value=trim(formObj.f_ref_no.value);
			   formObj.f_bl_no.value=trim(formObj.f_bl_no.value);
				if(formObj.f_ref_no.value == ""){
					alert(getLabel('SEA_COM_ALT015'));
					formObj.f_ref_no.focus();
	    	    	return;
				}else{
		       		formObj.f_cmd.value=SEARCHLIST;
		       		// #4007 [UFF] CANNOT DO ANYTHING ON DOC RECEIPT ENTRY (#3714 reopen)
		       		//formObj.action="./SEE_BMD_0180.clt";
		       		if(formObj.air_sea_clss_cd.value == "A") {
		       			formObj.action="./AIE_BMD_0220.clt";
		       		} else {
		       			formObj.action="./SEE_BMD_0180.clt";
		       		}
				    formObj.submit();
				}
			break;
			case "MODIFY":
				if(confirm(getLabel('FMS_COM_CFMSAV'))){
					formObj.save_yn.value="Y";
			       	formObj.f_cmd.value=MODIFY;	    	    
			       	// #4007 [UFF] CANNOT DO ANYTHING ON DOC RECEIPT ENTRY (#3714 reopen)
		       		//formObj.action="./SEE_BMD_0180.clt";
		       		if(formObj.air_sea_clss_cd.value == "A") {
		       			formObj.action="./AIE_BMD_0220.clt";
		       		} else {
		       			formObj.action="./SEE_BMD_0180.clt";
		       		}
				    formObj.submit();
				}
			break;
			case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
//				var id = curObj.id;			
				rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]=formObj.f_inland_trdp_nm.value;
		   		rtnary[2]=window;
		        //var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp=TK', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
		        /* #23817 D/O PRINT시 TRUCKER 로 검색이아닌 ALL, jsjang 2013.11.22*/
		   		
		   		callBackFunc = "PARTNER_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	        break;
	   	 	case "PRINT":
				formObj.intg_bl_seq.value=trim(formObj.intg_bl_seq.value);
		   	 	if(formObj.intg_bl_seq.value == ""){
        	    	//Please Retrieve first! 
	    	    	alert(getLabel('FMS_COM_ALT029'));
	    	    	return;
	    	    }
		   	 	if(formObj.f_wrk_tp.value == ""){
        	    	//Please Retrieve first! 
	    	    	alert(getLabel('FMS_COM_ALT036'));
	    	    	return;
	    	    }
		   	 	
		   	 	
		   	 /*//#52445 [CBM] HOUSE BL LEVEL에서도 DOC RECEIPT 내용 수정 후 PRINT 가능하도록 
				var intgBlSeq = formObj.intg_bl_seq.value;
				var refOfcCd = formObj.f_ofc_cd.value;
				formObj.title.value = "Dock Receipt";
				formObj.file_name.value = "dock_receipt_oe_hbl_01.mrd";
				// Parameter Setting
				var param = '[' + intgBlSeq + ']';
				param += '[' + refOfcCd + ']';
				param += '[' + formObj.f_phn.value + ']';
				param += '[' + formObj.f_fax.value + ']';
				param += '[' + formObj.f_email.value + ']';
				param += '[M]';
				formObj.rd_param.value = param;
				formObj.rpt_biz_tp.value = "OEM";
				formObj.rpt_biz_sub_tp.value = "DR";
				popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				*/   	 	
        	    // 프린트
				formObj.file_name.value='dock_receipt_01.mrd';
				formObj.title.value='Dock Receipt';
				//Parameter Setting
				var param='';
				param += '[' + formObj.intg_bl_seq.value + ']'; //$1
				param += '[' + formObj.f_ofc_cd.value + ']'; 	//$2
				param += '[' + formObj.f_phn.value + ']'; 		//$3
				param += '[' + formObj.f_fax.value + ']'; 		//$4
				param += '[' + formObj.f_email.value + ']'; 	//$5
				formObj.rd_param.value=param;
				var tempTitle='Dock Receipt [';
				if(formObj.air_sea_clss_cd.value=="A"){
					tempTitle += 'Air ';
				}else{
					tempTitle += 'Ocean ';
				}
				if(formObj.bnd_clss_cd.value=="O"){
					tempTitle += 'Export ';
				}else{
					tempTitle += 'Import ';
				}
				if(formObj.biz_clss_cd.value=="H"){
					tempTitle += 'House ';
				}else{
					tempTitle += 'Master ';
				}
				//alert(param);
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);		
				
	   	 	break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001')); 
        }
	}
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	if(formObj.save_yn.value == "Y" && formObj.f_wrk_tp.value != ""){
		//Save success! MESSAGE;
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
        	var cal=new calendarPopup();
 //           cal.select(formObj.f_bl_dt, 'f_bl_dt', 'MM-dd-yyyy');
        break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal=new calendarPopup();
//            cal.select(formObj.f_dept_dt, 'f_dept_dt', 'MM-dd-yyyy');
        break;
    }
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	var textarea=document.getElementsByTagName("TEXTAREA");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].name !="air_sea_clss_cd" && collTxt[i].name !="bnd_clss_cd" && collTxt[i].name !="biz_clss_cd" && collTxt[i].name !="f_ofc_cd"){
			   if(collTxt[i].type == "text"|| collTxt[i].type == "hidden"){
				  collTxt[i].value="";
			   }
		}       
	}
	for(var i=0; i<textarea.length; i++){
	}
}
function initBlSeq(){
	var formObj=document.frm1;
	formObj.intg_bl_seq.value="";
}

function PARTNER_POPLIST(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_inland_trdp_cd.value=rtnValAry[0];//trdp_cd
		formObj.f_inland_trdp_nm.value=rtnValAry[10];//locl_nm
		formObj.f_inland_pic_nm.value=rtnValAry[3];//pic_nm
		formObj.f_inland_pic_phn.value=rtnValAry[4];//pic_phn
		formObj.f_inland_pic_fax.value=rtnValAry[5];//pic_fax	
	}
}