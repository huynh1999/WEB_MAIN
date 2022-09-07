
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0120.js
*@FileTitle  : Shipping Advice Print
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/11
=========================================================*/
function doWork(srcName, curObj, valObj){
	var formObj=document.form;
    switch(srcName) {
		case 'Print':
		case 'PREVIEW':
//			if($(':radio[name="f_to_radio"]:checked').val() == "brk"){
//				if(formObj.trdp_cd.value == ""){
//					alert("Please select a Customs Broker!");
//					$("#trdp_cd").focus();
//					return false;
//				}
//			}
			for(var i=0 ; i < formObj.f_to_radio.length ; i++){
				if(formObj.f_to_radio[i].checked == true){
					formObj.f_to_type.value=formObj.f_to_radio[i].value;
					break;
				}
			}
			if(formObj.f_air_sea_tp.value == "S"){
				formObj.file_name.value='shipping_advice_oe_hbl_01.mrd';
			}else{
				formObj.file_name.value='shipping_advice_ae_hawb_01.mrd';
			}
			formObj.title.value='Shipping Advice';
			
			// Remark 내용을 1페이지 출력용, Rider 출력용으로 분리
			var rmk_arr = formObj.f_rmk.value.split('\n');
			var rmk_txt = "";
			var rmk_rider = "";
			for(var j=0; j<rmk_arr.length; j++){
				if(j<10)
					rmk_txt += (rmk_arr[j]+'\n');
				else
					rmk_rider += (rmk_arr[j]+'\n');
			}
			//Parameter Setting
			var param='[' + formObj.f_intg_bl_seq.value + ']';  //  1  intg_bl_seq
			param += '[' + formObj.f_ofc_locl_nm.value + ']';   //  2  ofc_locl_nm
			param += '[' + usrNm + ']';                         //  3  user Nm
			param += '[' + rmk_txt + ']';           //  4  Remark
			param += '[' + formObj.f_to_type.value + ']';       //  5  to_type 
			param += '[' + formObj.f_ref_ofc_cd.value + ']';    //  6  ref_ofc_cd
			param += '[]';                                      //  7 
			param += '[]';                                      //  8
			param += '[' + usrPhn + ']';                        //  9  user phone No
			param += '[' + usrFax + ']';                        // 10  user Fax No 
			param += '[]';                                      // 11
			if($(':radio[name="f_to_radio"]:checked').val() == "brk" && formObj.trdp_addr.value != null){
				param += '[Y]';                                  // 12   customer broker check Y/N	
				param += '['+ formObj.trdp_addr.value +']';      // 13   customer broker 
			}else{
				param += '[]';                                   // 12   customer broker check Y/N
				param += '[]';                                   // 13   customer broker 
			}
			
			//#3899  [BNX] Shipping Advice Rider
			var text = $("#f_rmk").val();   
			var lines = text.split(/\r|\r\n|\n/);
			var count = lines.length;
			param += '[' + count + ']';                        // 14  Remark line counts 
			param += '[' + rmk_rider + ']';					   // 15  Remark Rider
			if(formObj.f_air_sea_tp.value == "A"){
				//항공 shipping advice 출력할 때, shipper를 선택한 경우만 e-mail list를 유지한다.
				if(formObj.f_to_radio[1].checked){
					//
				}else{
					formObj.mailTo.value="";
				}
			}
			formObj.rd_param.value=param;
			if (formObj.f_air_sea_tp.value == "S") {
				formObj.rpt_biz_tp.value="OEH";
			} else if (formObj.f_air_sea_tp.value == "A") {
				formObj.rpt_biz_tp.value="AEH";
			}
			formObj.rpt_biz_sub_tp.value="SA";
			formObj.rpt_tp.value=(formObj.f_to_type.value == "agt" ? "P": formObj.f_to_type.value.substring(0, 1).toUpperCase());
			
			//#50593
			if(formObj.f_air_sea_tp.value == "S" && user_ofc_cnt_cd == "DE"){
				var ttlFileName = formObj.file_name.value;
				ttlFileName += "^@@^" + 'shipping_advice_oe_hbl_de_01.mrd';
				var ttlParam = formObj.rd_param.value;
				ttlParam += "^@@^" + '[' + formObj.f_intg_bl_seq.value + ']';;
				
				formObj.file_name.value = ttlFileName;
				formObj.rd_param.value = ttlParam;
			}else if(formObj.f_air_sea_tp.value == "A" && user_ofc_cnt_cd == "DE"){
				var ttlFileName = formObj.file_name.value;
				ttlFileName += "^@@^" + 'shipping_advice_ae_hawb_de_01.mrd';
				var ttlParam = formObj.rd_param.value;
				ttlParam += "^@@^" + '[' + formObj.f_intg_bl_seq.value + ']';
				
				formObj.file_name.value = ttlFileName;
				formObj.rd_param.value = ttlParam;
			}
						
			if(srcName == "PREVIEW") {
				$("#prt_option").val("opt_preview");
			} else if(srcName == "Print") {
				$("#prt_option").val("opt_print");
			}

			if($("#chk_auto_close").is(":checked")){
				doWork("CLOSE");
			}

			popPOST(form, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			
		break;
		case "PARTNER_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[1]=valObj;
	   		}else{
	   			rtnary[1]="";
	   		}
	   		rtnary[2]=window;
	        //var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp=TK', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   		/* #23817 D/O PRINT시 TRUCKER 로 검색이아닌 ALL, jsjang 2013.11.22*/
	   		curObjId = curObj.id;
	        callBackFunc = "PARTNER_POPLIST_SA";
	        modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
			break;
		case "CLOSE":
			window.close(); 
    	break;
    }
}

function PARTNER_POPLIST_SA(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {		
		var rtnValAry=rtnVal.split("|");		
		formObj.trdp_cd.value=rtnValAry[0];// trdp_cd
		formObj.trdp_nm.value=rtnValAry[2];// eng_nm
		formObj.trdp_addr.value=rtnValAry[7];// lgl_addr
	}
}


function loadPage(){
    if(user_ofc_cnt_cd=="JP"){
		document.getElementsByName("f_to_radio")[1].checked=true;
	}
}

function getTrdpInfo(obj, tmp){
	var formObj=document.form;
	var trdp_cd=obj.value.toUpperCase();		
	if (trdp_cd != "") {
		if (tmp == "onKeyDown") {
			if (event.keyCode == 13) {
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal',
						'&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + trdp_cd, './GateServlet.gsl');
			}
		} else if (tmp == "onBlur") {
			if (trdp_cd != "") {
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal',
						'&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + trdp_cd, './GateServlet.gsl');
			}
		} else {			
			ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal',
					'&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + tmp, './GateServlet.gsl');
		}
	} else {		
		formObj.trdp_cd.value="";//trdp_cd
		formObj.trdp_addr.value="";//shrt_nm
		formObj.trdp_nm.value="";//full_nm		
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^^;');
			var masterVals=rtnArr[0].split('@@^');	
			formObj.trdp_cd.value=masterVals[0];//trdp_cd
			formObj.trdp_nm.value=masterVals[2];			
			if(masterVals[4] == "NULL" || masterVals[4] == "null"){
				formObj.trdp_addr.value=""
			}else{
				formObj.trdp_addr.value=masterVals[4];
			}				
		}else{
			formObj.trdp_cd.value="";//trdp_cd
			formObj.trdp_addr.value="";//shrt_nm
			formObj.trdp_nm.value="";//full_nm			
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: RPT_PRN_0120.152");		
	}
}

$(document).ready(function(){
	var cookie_key = "rpt_prn_0120_auto_close";
	if(getCookie(cookie_key) == "1") {
		$("#chk_auto_close").attr("checked", true);
	}
    $("#chk_auto_close").change(function(){
        if($("#chk_auto_close").is(":checked")){
			setCookie(cookie_key, "1", 365);
        }else{
            setCookie(cookie_key, "", -1);
        }
	});
});