/*
 *@FileName   : AIE_BMD_0160.js
*@FileTitle  : CERTIFICATE OF ORIGIN
*@Description: CERTIFICATE OF ORIGIN
*@author     : CLT
*@version    : 2.0 - 2014/06/17
*@since      : 2014/06/17
*@Change history:
 */

var rtnary=new Array(1);
var callBackFunc = "";

/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(document.frm1.obrd_strdt, document.frm1.obrd_enddt);
}
function doWork(srcName){
    var formObj=document.frm1;
	try {
		switch(srcName) {
			case "SEARCHLIST":
				if(formObj.txt_hbl_no.value != formObj.hbl_no.value){
					formObj.f_intg_bl_seq.value="";
					formObj.intg_bl_seq.value="";
				}
	    	    if(formObj.txt_hbl_no.value == ""){
//        	    	alert("Select the MBL No. in advance! ");
        	    	alert(getLabel('FMS_COM_ALT014'));
        	    	formObj.txt_hbl_no.focus();
        	    	return;
	    	    }
	       		formObj.f_cmd.value=SEARCHLIST;
	       		//formObj.action="./AIE_BMD_0160.clt";
			    //formObj.submit();
			    submitForm(SEARCHLIST);
	        break;
			case "MODIFY":
	    	    if(formObj.txt_hbl_no.value == "" || formObj.intg_bl_seq.value == ""){
//        	    	alert("Select the HBL No. in advance! ");
        	    	alert(getLabel('FMS_COM_ALT029'));
        	    	formObj.txt_hbl_no.focus();
        	    	return;
	    	    }
	    	    if(formObj.intg_bl_seq.value == "" ){
	    	    	alert(getLabel('FMS_COM_ALT043'));
	    	    	return;
	    	    }
	    	    if(formObj.txt_hbl_no.value != formObj.hbl_no.value){
	    	    	alert(getLabel('FMS_COM_ALT029'));
        	    	formObj.txt_hbl_no.focus();
        	    	return;
	    	    }
	    	    if(confirm(getLabel('FMS_COM_CFMSAV'))){
	    	    	formObj.f_cmd.value=MODIFY;
		       		formObj.print_yn.value="N";
		       		formObj.save_yn.value="Y";
		       		//formObj.action="./AIE_BMD_0160.clt";
				   // formObj.submit();
		       		submitForm(MODIFY);
	    	    }
	       		
	        break;
			case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]="A";
	   			rtnary[1]="O";
	   			
	   			callBackFunc = "MBL_POPLIST";
		  	    modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
   	        	
			break;
	   	 	case "PRINT":
		   	 	if(formObj.txt_hbl_no.value == ""){
//	    	    	alert("Select the HBL No. in advance! ");
	    	    	alert(getLabel('FMS_COM_ALT029'));
	    	    	formObj.txt_hbl_no.focus();
	    	    	return;
	    	    }
	       		formObj.f_cmd.value=MODIFY;
	       		formObj.print_yn.value="Y";
	       		formObj.save_yn.value="N";
	       		//formObj.action="./AIE_BMD_0160.clt";
			   // formObj.submit();
			    submitForm(MODIFY);
	   	 		/*
	   	 		if(formObj.f_wrk_tp.value == ""){
		   	 		if(formObj.txt_hbl_no.value == ""){
	        	    	alert("Select the HBL No. in advance! ");
	        	    	formObj.txt_hbl_no.focus();
	        	    	return;
		    	    }
		       		formObj.f_cmd.value=MODIFY;
		       		formObj.print_yn.value="Y";
		       		formObj.action="./SEE_BMD_0130.clt";
				    formObj.submit();
	   	 		}else{
		   	 		formObj.file_name.value='commercial_invoice_01.mrd';
		        	formObj.title.value='COMMERCIAL INVOICE';
					//Parameter Setting
		        	var param='[' + formObj.intg_bl_seq.value + ']';			// [1]
		        	param 	  += '[' + formObj.f_wrk_tp.value +']';										// [2]
					formObj.rd_param.value=param;
					popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   	 		}
	   	 		*/
	   	 	break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
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
	if(formObj.print_yn.value == "Y" && formObj.f_wrk_tp.value != ""){
		formObj.file_name.value='certificateoforigin_02.mrd';
    	formObj.title.value='CERTIFICATE OF ORIGIN';
		//Parameter Setting
    	var param='[' + formObj.intg_bl_seq.value + ']';			// [1]
    	param 	  += '[' + formObj.f_wrk_tp.value + ']';			// [2]
		formObj.rd_param.value=param;
		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	}
	else if(formObj.save_yn.value == "Y" && formObj.f_wrk_tp.value != ""){
		//Save success!
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	if(formObj.intg_bl_seq.value == "" && formObj.txt_hbl_no.value != ""){
		alert(getLabel('FMS_COM_ALT010'));
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj.f_bl_dt, 'MM-dd-yyyy');
        break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj.f_dept_dt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
function getBlInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null"){
				frm1.txt_ship_nm.value=rtnArr[0];
				frm1.txt_input_03.value=rtnArr[0];
			}
			if(rtnArr[2] != "null"){
				frm1.txt_nty_nm.value=rtnArr[2];
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	var textarea=document.getElementsByTagName("TEXTAREA");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden" || collTxt[i].type == "textarea"){
		  collTxt[i].value="";
	  }           
	}
	for(var i=0; i<textarea.length; i++){
		textarea[i].value="";
	}
}

function MBL_POPLIST(rtnVal){
  	var formObj = document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.txt_hbl_no.value=rtnValAry[0];//Master_bl_no
		formObj.intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		doWork('SEARCHLIST');
	}
  }

function submitForm(){
	var formObj=document.frm1;
	doShowProcess();
	
	$.ajax({
		   type: "POST",
		   url: "./AIE_BMD_0160AJ.clt",
		   dataType: 'xml',
		   data:  $("form" ).serialize(),
		   success: function(data){
			   setFieldValue( formObj.f_wrk_tp, $('wrk_tp',data).text());
			   setFieldValue( formObj.print_yn, $('print_yn',data).text());
			   setFieldValue( formObj.save_yn, $('save_yn',data).text());
			   setFieldValue( formObj.txt_hbl_no, $('txt_hbl_no',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.hbl_no, $('txt_hbl_no',data).text());
			   setFieldValue( formObj.f_seller, $('shpr_addr',data).text());
			   setFieldValue( formObj.f_consignee, $('cnee_addr',data).text());
			   setFieldValue( formObj.f_notify, $('notify_addr',data).text());
			   setFieldValue( formObj.f_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.f_bl_dt, $('inv_dt',data).text());
			   setFieldValue( formObj.f_exp_ref, $('exp_ref_no',data).text());
			   setFieldValue( formObj.f_cnt_origin, $('cnt_origin',data).text());
			   setFieldValue( formObj.f_point_entry, $('point_entry',data).text());
			   setFieldValue( formObj.f_exp_carrier, $('exp_carrier',data).text());
			   setFieldValue( formObj.f_pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.f_pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.f_chamber, $('chamber',data).text());
			   setFieldValue( formObj.f_state_nm, $('state_nm',data).text());
			   setFieldValue( formObj.f_mark_num, $('mk_txt',data).text());
			   setFieldValue( formObj.f_qty, $('qty',data).text());
			   setFieldValue( formObj.f_desc_good, $('desc_txt',data).text());
			   setFieldValue( formObj.f_grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.f_chg_wgt, $('chg_wgt',data).text());
			   setFieldValue( formObj.f_meas, $('meas',data).text());
			   
			   doBtnAuthority(attr_extension);
			   loadPage();
			   
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}