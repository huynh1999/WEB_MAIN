var rtnary=new Array(1);
var callBackFunc = "";
var prt_sort=""
function submitForm(){	
	var formObj=document.frm1;
	doShowProcess();
	param = "f_cmd="+SEARCHLIST + "&f_bl_no="+ document.frm1.f_bl_no.value;
	$.ajax({
		   type: "POST",
		   url: "./AIE_BMD_0090AJ.clt",
		   dataType: 'xml',
		   data: param,
		   success: function(data){
			  setFieldValue( formObj.s_intg_bl_seq, $('intg_bl_seq',data).text());
			  setFieldValue( formObj.s_hbl_tp_cd, $('hbl_tp_cd',data).text());
			  setFieldValue( formObj.s_flt_no, $('flt_no',data).text());
			  setFieldValue( formObj.s_ref_ofc_cd, $('ref_ofc_cd',data).text());
			  setFieldValue( formObj.s_ref_ofc_eng_nm, $('ref_ofc_eng_nm',data).text());
    		  // #999 [SHINE] B/L 회사명 변경 옵션		
			  //alert('submit');
			  //setFieldValue( formObj.s_ofc_locl_nm, $('ref_ofc_eng_nm',data).text());
			  //setFieldValue( formObj.s_ofc_locl_nm, unescape($('ref_ofc_eng_nm',data).text()));
			  
			  // #4694 [IMPEX] AIR Document Package - COMPANY NAME ON REPORT : Name(Representing) 으로 변경요청하여 #999 주석 처리 및 변경
			  setFieldValue( formObj.s_ofc_locl_nm, $('ofc_rep_nm',data).text());
			  
			  setFieldValue( formObj.s_ref_ofc_cnt_cd, $('ref_ofc_cnt_cd',data).text());
			  setFieldValue( formObj.s_shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			  setFieldValue( formObj.s_lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			  setFieldValue( formObj.s_thr_trdp_nm, $('thr_trdp_nm',data).text());
			  setFieldValue( formObj.s_loc_inv_flg, $('loc_inv_flg',data).text());
			  setFieldValue( formObj.s_loc_inv_seq, $('loc_inv_seq',data).text());
			  setFieldValue( formObj.s_dc_inv_flg,  $('dc_inv_flg',data).text());
			  setFieldValue( formObj.s_dc_inv_seq,  $('dc_inv_seq',data).text());
			  setFieldValue( formObj.s_cmc_inv_seq, $('cmc_inv_seq',data).text());
			  setFieldValue( formObj.s_pck_inv_seq, $('pck_inv_seq',data).text());
			  setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			  setFieldValue( formObj.f_bl_no, $('bl_no',data).text());
			  setFieldValue( formObj.s_shp_desc, $('shpr_info',data).text());
			  setFieldValue( formObj.s_cne_desc, $('cnee_info',data).text());
			  setFieldValue( formObj.ae_hbl_form, $('ae_hbl_form',data).text());
			  
			  doBtnAuthority(attr_extension); 
			   $("#s_bl_radio6").prop('checked', true);
			   $("#s_send_to1").prop('checked', true);
			   doWork('CLEAR');
			   $("#s_hbl_opt").prop('checked', false);
			  loadPage();
			  doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
		   }
		 });
}

function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var formObj=document.frm1;
	switch(srcName) {
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST;
			//검증로직
			if(formObj.f_bl_no.value == ""){
				//alert("HAWB No. is mandatory field.");
				alert(getLabel('FMS_COM_ALT014'));
				formObj.f_bl_no.focus();
				return;
			}
//			formObj.action="./AIE_BMD_0090.clt";
//			formObj.submit();
			submitForm();
			break;
		case "Print":
//			if(formObj.s_intg_bl_seq.value == ""){
//				return;
//			}
			if(formObj.s_intg_bl_seq.value == ""){
				alert(getLabel('FMS_COM_ALT029'));
				return;
			}
			if(!(formObj.s_rpt_tp_1.checked
					|| formObj.s_rpt_tp_2.checked 
					|| formObj.s_rpt_tp_3.checked
					|| formObj.s_rpt_tp_4.checked 
					|| formObj.s_rpt_tp_5.checked 
					|| formObj.s_rpt_tp_6.checked 
					|| formObj.s_rpt_tp_7.checked
					)){
//				alert("Please select Report Type.");
				alert(getLabel('AIR_MSG_049'));
				return;
			}
			if (formObj.s_rpt_tp_1.checked == false && 
				formObj.s_rpt_tp_2.checked == false &&
				formObj.s_rpt_tp_3.checked == false &&
				formObj.s_rpt_tp_4.checked == false &&
				formObj.s_rpt_tp_5.checked == false && 
				formObj.s_rpt_tp_6.checked == false && 
				formObj.s_rpt_tp_7.checked == false 
				) {
				alert(getLabel('AIR_MSG_049'));
			}
			formObj.title.value='Document Package';
			var ttlFileName="";
			var ttlParam="";
			var arrPrtSort = prt_sort.split('\n');
			
			for ( var i=0 ; i < arrPrtSort.length-1 ; i++ ) {
				//1. House B/L
				if(arrPrtSort[i] == 'House B/L'){
					/* 
					if(formObj.ae_hbl_form.value != ""){
						/* HBL customer form 
						if(formObj.s_bl_radio[0].checked){
							ttlFileName += "^@@^" + 'HBL_AIR_' + formObj.ae_hbl_form.value + '_ORG.mrd';
						}else{
							ttlFileName += "^@@^" + 'HBL_AIR_' + formObj.ae_hbl_form.value + '_COPY.mrd';
						}
					}else{
						HBL normal form 
						if(formObj.s_bl_radio[0].checked){
							ttlFileName += "^@@^" + 'HBL_AIR_ORG.mrd';
						}else{
							ttlFileName += "^@@^" + 'HBL_AIR_COPY.mrd';
						}
					}*/
					
					// #829 [SI] Report Mgmt
					if(formObj.s_bl_radio[0].checked){
						ttlFileName += "^@@^" + 'HBL_AIR_ORG.mrd';
					}else{
						ttlFileName += "^@@^" + 'HBL_AIR_COPY.mrd';
					}
					
					//Parameter Setting
					var param='[' + "'" + formObj.s_intg_bl_seq.value + "'" + ']';	// [1]
					if(formObj.s_ref_ofc_cnt_cd.value == "US" || formObj.s_ref_ofc_cnt_cd.value == "CA"){
						param += '[' + 'Y' + ']';										// [2]
					}else{
						param += '[' + 'N' + ']';										// [2]
					}
					if(formObj.s_bl_radio[0].checked){
						param += '[' + 'org' + ']';										// [3]
					}else{
						param += '[' + 'copy' + ']';									// [3]
					}
					param += '[' + 'Y' + ']';											// [4]
					param += '[' + 'N' + ']';											// [5]
					if(formObj.s_send_to[0].checked){
						param += '[' + 'SHIP' + ']';									// [6]
					}else if(formObj.s_send_to[1].checked){
						param += '[' + 'CNEE' + ']';									// [6]
					}
					param += '[' + ']';													// [7]
					param += '[' + usrId + ']';											// [8]
					param += '[' + ']';													// [9]
					var byCarr=formObj.s_flt_no.value + " " + formObj.s_lnr_trdp_nm.value;
					param += '[' + byCarr + ']';										// [10]
					
					//#2220 [CARGOZONE] AEH DOCUMENT PACKAGE HAWB PRINT ISSUE
					var signShip="";
					if(formObj.s_hbl_tp_cd.value == "TP"){
						var nameVar = formObj.s_thr_trdp_nm.value;
						
						if(0 < nameVar.indexOf('%0AAS%20AGENT%20OF')){
							nameVar = nameVar.substring(0, nameVar.indexOf('%0AAS%20AGENT%20OF'));
						}
						
						signShip= nameVar + "\r\n" + "AS AGENT OF " + formObj.s_shpr_trdp_nm.value;
					}else if(formObj.s_ref_ofc_eng_nm.value != ""){
						var nameVar = formObj.s_ref_ofc_eng_nm.value;
						
						if(0 < nameVar.indexOf('%0AAS%20AGENT%20OF')){
							nameVar = nameVar.substring(0, nameVar.indexOf('%0AAS%20AGENT%20OF'));
						}
						
						signShip=nameVar + "\r\n" + "AS AGENT OF " + formObj.s_shpr_trdp_nm.value;
					}else{
						signShip="ADVANCED" + "\r\n" + "AS AGENT OF " + formObj.s_shpr_trdp_nm.value;
					}
					param += '[' + decodeURIComponent(signShip) + ']';										// [11]
					
					//#2220 [CARGOZONE] AEH DOCUMENT PACKAGE HAWB PRINT ISSUE
					var signCarr="";
					if(formObj.s_hbl_tp_cd.value == "TP"){
						var nameVar = formObj.s_thr_trdp_nm.value;
						
						if(0 < nameVar.indexOf('%0AAS%20AGENT%20OF')){
							nameVar = nameVar.substring(0, nameVar.indexOf('%0AAS%20AGENT%20OF'));
						}
						
//						signCarr= nameVar + "\r\n" + "AS AGENT FOR THE CARRIER " + formObj.s_lnr_trdp_nm.value;
						signCarr= nameVar + "\r\n" + "AS AGENT OF THE CARRIER " + formObj.s_lnr_trdp_nm.value;
					}else if(formObj.s_ref_ofc_eng_nm.value != ""){
						var nameVar = formObj.s_ref_ofc_eng_nm.value;
						
						if(0 < nameVar.indexOf('%0AAS%20AGENT%20OF')){
							nameVar = nameVar.substring(0, nameVar.indexOf('%0AAS%20AGENT%20OF'));
						}
						
//						signCarr= nameVar + "\r\n" + "AS AGENT FOR THE CARRIER " + formObj.s_lnr_trdp_nm.value;
						signCarr= nameVar + "\r\n" + "AS AGENT OF THE CARRIER " + formObj.s_lnr_trdp_nm.value;
					}else{
//						signCarr="ADVANCED" + "\r\n" + "AS AGENT FOR THE CARRIER " + formObj.s_lnr_trdp_nm.value;
						signCarr="ADVANCED" + "\r\n" + "AS AGENT OF THE CARRIER " + formObj.s_lnr_trdp_nm.value;
					}
					
					param += '[' + decodeURIComponent(signCarr) + ']';										// [12]
					param += '[' + 'Y' + ']';											// [13]
					param += '[' + 'X' + ']';											// [14]
					param += '[' + 'Y' + ']';											// [15]
					param += '[' + 'Y' + ']';											// [16]
					param += '[' + 'N' + ']';											// [17]
					param += '[' + formObj.s_ref_ofc_cnt_cd.value + ']';													// [18] 국가코드
					var shipper=formObj.s_send_to[0].checked ? '[SHIP]' : '[]';
					param += shipper;							// [19]
					param += '[' + ']';								// [20]
					var cnee=formObj.s_send_to[1].checked ? '[CNEE]' : '[]';
					param += cnee;									// [21]
					param += '[' + ']';								// [22]
					param += '[Y]';												// [23]
					param += '[N]';											// [24]
					param += '[Y]';												// [25]
					param += '[N]';														// [26]						
					if(formObj.s_bl_radio[0].checked){
						param += ' /rpaperlength [3049]';
					}else{
						param += ' /rpaperlength [2970]';
					}
					ttlParam += "^@@^" + param;		
				}
				//2. Local Invoice
				if(arrPrtSort[i] == 'Local Invoice'){
					/*if(formObj.s_ref_ofc_cnt_cd.value == "US" || formObj.s_ref_ofc_cnt_cd.value == "CA" || formObj.s_ref_ofc_cnt_cd.value == "DE"){
						ttlFileName += "^@@^" + 'invoice_01.mrd';
					}else if(formObj.s_ref_ofc_cnt_cd.value == "IT"){
						ttlFileName += "^@@^" + 'invoice_04.mrd';
					}else if(formObj.s_ref_ofc_cnt_cd.value == "JP"){
						ttlFileName += "^@@^" + 'invoice_03_jp.mrd';
					}else{
						if(formObj.s_ref_ofc_cd.value == "SEL"){
							ttlFileName += "^@@^" + 'invoice_03_kr.mrd';
						}else{
							ttlFileName += "^@@^" + 'invoice_03.mrd';
						}
					}*/
					
					ttlFileName += "^@@^" + 'invoice_01.mrd';
					
					//Parameter Setting
					var param='[' + usrEml + ']';											// [1]
					param += '[' + formObj.s_loc_inv_seq.value + ']';						// [2]
					param += '[' + ']';														// [3]
					param += '[' + ']';														// [4]
					param += '[' + ']';														// [5]
					param += '[' + ']';														// [6]
					param += '[' + formObj.s_ref_ofc_cd.value + 'MAINCMP' + ']';			// [7]
					param += '[' + formObj.s_ref_ofc_cd.value + ']';						// [8]
					param += '[' + formObj.s_ref_ofc_cnt_cd.value + ']';					// [9]
					param += '[' + usrNm + ']';												// [10]
					param += '[' + usrPhn + ']';											// [11]
					param += '[' + usrFax + ']';											// [12]
					param += '[' + usrId + ']';												// [13]
					param += '[' + ']';
					param += '[' + ']';
					ttlParam += "^@@^" + param;
				}
				//3. Shipping Advice
				if(arrPrtSort[i] == 'Shipping Advice'){
					
					/*if(formObj.s_ref_ofc_cnt_cd.value == "DE"){
						ttlFileName += "^@@^" + 'shipping_advice_ae_hawb_de_01.mrd';
						//Parameter Setting
						var param='[' + formObj.s_intg_bl_seq.value + ']';
						ttlParam += "^@@^" + param;
					}else{*/
					ttlFileName += "^@@^" + 'shipping_advice_ae_hawb_01.mrd';
					var sendTo=formObj.s_send_to[0].checked ? formObj.s_send_to[0].value : formObj.s_send_to[1].value;
					var param='[' + formObj.s_intg_bl_seq.value + ']';
					param += '[' + formObj.s_ofc_locl_nm.value + ']';
					param += '[' + usrNm + ']';
					param += '[' + ']';
					param += '[' + sendTo + ']';
					param += '[' + formObj.s_ref_ofc_cd.value + ']';
					param += '[' + ']';
					param += '[' + ']';
					param += '[' + usrPhn + ']';
					param += '[' + usrFax + ']';
					param += '[]';
					ttlParam += "^@@^" + param;
					//}
					
				}
				//4. Commercial Invoice
				if(arrPrtSort[i] == 'Commercial Invoice'){
					ttlFileName += "^@@^" + 'commercial_invoice_01.mrd';
					//Parameter Setting
					var param='[' + "'" + formObj.s_cmc_inv_seq.value + "'" + ']';
					param += '[' + 'CI' + ']';
					ttlParam += "^@@^" + param;
				}
				//5. Packing List
				if(arrPrtSort[i] == 'Packing List'){
					ttlFileName += "^@@^" + 'packing_list_01.mrd';
					//Parameter Setting
					var param='[' + "'" + formObj.s_pck_inv_seq.value + "'" + ']';
					param += '[' + 'PL' + ']';
					ttlParam += "^@@^" + param;
				}
				
				//6. Credit / Debit Note
				if(arrPrtSort[i] == 'Credit / Debit Note'){
					ttlFileName += "^@@^" + 'invoice_02_us.mrd';
					//Parameter Setting
		        	var param='[' + usrEml + ']';			// USER EMAIL';	[1]
		        	param += '[' + formObj.s_dc_inv_seq.value +  ']';			// [2]
					param += '[]';											// [3]
					param += '[]';											// [4]
					param += '[]';											// [5]
					param += '[]';											// [6]	
					//param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';	// CURR BRANCH
					param += '[]';			// Agent [7]
					param += '[' + formObj.s_ref_ofc_cd.value + ']';		// REF_OFC_CD  [8]
					param += '[' + usrPhn + ']';			// 9
					param += '[' + usrFax + ']';			// 10
					param += '[' + usrId + ']';				// 11
					param += '[]';			// 12
					param += '[' + formObj.s_ofc_locl_nm.value + ']';		//13  user local office name
					param += '[]';											// 14
					param += '[' + formObj.f_bl_no.value + ']';			// 15
					
					ttlParam += "^@@^" + param;
					
					formObj.mailTitle.value='Debit/Credit Note No : ' + formObj.s_dc_inv_seq.value;
					
					formObj.rpt_biz_tp.value="ACCT";
					formObj.rpt_biz_sub_tp.value="DC";
					formObj.rpt_trdp_cd.value='';
					formObj.rpt_pdf_file_nm.value=getPdfFileNm();
					
				}
				
				//7. Ausfuhr.
				if(arrPrtSort[i] == 'Ausfuhr.'){
					//if(user_ofc_cnt_cd == "DE"){
					ttlFileName += "^@@^" + 'shipping_advice_ae_hawb_de_01.mrd';
					//Parameter Setting
					var param_ausf = '[' + formObj.s_intg_bl_seq.value + ']';
					ttlParam += "^@@^" + param_ausf;
					//}
				}
			}
			
			if(ttlFileName.substring(4) != ""){
				formObj.file_name.value=ttlFileName.substring(4);
				formObj.rd_param.value=ttlParam.substring(4);
				formObj.rpt_biz_tp.value="AEH";
				formObj.rpt_biz_sub_tp.value="DP";
				if (formObj.s_send_to[0].checked) {
					formObj.rpt_tp.value=formObj.s_send_to[0].value.toUpperCase();
				} else if (formObj.s_send_to[1].checked) {
					formObj.rpt_tp.value=formObj.s_send_to[1].value.toUpperCase();
				}
				popPOST(formObj, "RPT_RD_0030.clt", "popTest", 1025, 740);
			}
		break;
		case "HBL_POPLIST":
			rtnary=new Array(1);
			rtnary[0]="A";//airSeaTp
			rtnary[1]="O";//bndTp;
			callBackFunc = "HBL_POPLIST";
  	        modal_center_open('./CMM_POP_0170.clt', rtnary, 818,468,"yes");
	  	        
		break;
		case "ALL":
			if(formObj.s_rpt_tp_1.disabled == false){
				formObj.s_rpt_tp_1.checked=true;
				prt_sort = prt_sort.replaceAll(formObj.s_rpt_tp_1.value+"\n",'');
				setPrintSort(formObj.s_rpt_tp_1);
			}
			if(formObj.s_send_to[0].checked == true && formObj.s_rpt_tp_2.disabled == false){
				formObj.s_rpt_tp_2.checked=true;
				prt_sort = prt_sort.replaceAll(formObj.s_rpt_tp_2.value+"\n",'');
				setPrintSort(formObj.s_rpt_tp_2);
			}
			if(formObj.s_rpt_tp_3.disabled == false){
				formObj.s_rpt_tp_3.checked=true;
				prt_sort = prt_sort.replaceAll(formObj.s_rpt_tp_3.value+"\n",'');
				setPrintSort(formObj.s_rpt_tp_3);
			}
			if(formObj.s_rpt_tp_4.disabled == false){
				formObj.s_rpt_tp_4.checked=true;
				prt_sort = prt_sort.replaceAll(formObj.s_rpt_tp_4.value+"\n",'');
				setPrintSort(formObj.s_rpt_tp_4);
			}
			if(formObj.s_rpt_tp_5.disabled == false){
				formObj.s_rpt_tp_5.checked=true;
				prt_sort = prt_sort.replaceAll(formObj.s_rpt_tp_5.value+"\n",'');
				setPrintSort(formObj.s_rpt_tp_5);
			}
			
			if(formObj.s_rpt_tp_6.disabled == false){
				formObj.s_rpt_tp_6.checked=true;
				prt_sort = prt_sort.replaceAll(formObj.s_rpt_tp_6.value+"\n",'');
				setPrintSort(formObj.s_rpt_tp_6);
			}
			// 독일 Ausfuhrbescheinigung 추가건
			if(usrCntCd == "DE"){
				if(formObj.s_rpt_tp_7.disabled == false){
					formObj.s_rpt_tp_7.checked = true;
					prt_sort = prt_sort.replaceAll(formObj.s_rpt_tp_7.value+"\n",'');
					setPrintSort(formObj.s_rpt_tp_7);
				}
			}	
		break;
		case "CLEAR":
			formObj.s_rpt_tp_1.checked=false;
			formObj.s_rpt_tp_2.checked=false;
			formObj.s_rpt_tp_3.checked=false;
			formObj.s_rpt_tp_4.checked=false;
			formObj.s_rpt_tp_5.checked=false;
			formObj.s_rpt_tp_6.checked=false;
			formObj.s_rpt_tp_7.checked=false;
			formObj.prt_sort.value='';
			prt_sort = '';
		break;
		case "SEND_TO":
			if(formObj.s_send_to[0].checked == true){
				formObj.s_rpt_tp_2.disabled=false;
				doWork('CLEAR');
			}else{
				formObj.s_rpt_tp_2.checked=false;
				formObj.s_rpt_tp_2.disabled=true;
				doWork('CLEAR');
			}
		break;
    }
}
function entSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		if(formObj.f_bl_no.value != ""){
			doWork('SEARCHLIST');
		}
	}
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {	
//    doWork('SEARCHLIST');	
	dispalyRptTp();
}
function dispalyRptTp() {
	var formObj=document.frm1;
//	#1694 [IMPEX][독일] OEH/AEH Document Package Clear 기능 확인
	if(formObj.s_intg_bl_seq.value != ""){
		if(formObj.s_loc_inv_flg.value == "N"){
			formObj.s_rpt_tp_2.disabled=true;
		}else{
			formObj.s_rpt_tp_2.disabled=false;
		}
		if(formObj.s_cmc_inv_seq.value == ""){
			formObj.s_rpt_tp_4.disabled=true;
		}else{
			formObj.s_rpt_tp_4.disabled=false;
		}
		if(formObj.s_pck_inv_seq.value == ""){
			formObj.s_rpt_tp_5.disabled=true;
		}else{
			formObj.s_rpt_tp_5.disabled=false;
		}
		if(formObj.s_dc_inv_flg.value == "N"){
			formObj.s_rpt_tp_6.disabled=true;
		}else{
			formObj.s_rpt_tp_6.disabled=false;
		}
	}
			
	// OFC가 DE가 아니면 독일전용을 Disable시킨다.
		
	if(usrCntCd != "DE"){
		formObj.s_rpt_tp_7.disabled = true;
		getObj("de_div").style.display = 'none';
	} else {
		formObj.s_rpt_tp_7.disabled = false;
		getObj("de_div").style.display = 'inline';
	}
	
}
/**
 * 콤보 조회
 */
function doSContiAction(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var s_prnt_conti_cd=formObj.s_prnt_conti_cd.value;
	ajaxSendPost(dispSContiAjaxReq1, 'reqVal', '&goWhere=aj&bcKey=searchSubContinentCode&s_prnt_conti_cd='+s_prnt_conti_cd, './GateServlet.gsl');
}
/**
 * 콤보 조회
 */
function doIContiAction(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var i_prnt_conti_cd=formObj.i_prnt_conti_cd.value;
	ajaxSendPost(dispIContiAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchSubContinentCode&s_prnt_conti_cd='+i_prnt_conti_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispSContiAjaxReq1(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined' && doc[1]!=';'){
			var arrTmp=doc[1].split(';');
			var arrContiCd=arrTmp[0].split('|');
			var arrContiNm=arrTmp[1].split('|');
			document.frm1.s_conti_cd.text=1; 
			document.frm1.s_conti_cd.options[0]=new Option("","");
			for ( var i=1 ; i < arrContiCd.length ; i++ ) {
				document.frm1.s_conti_cd.options[i]=new Option(arrContiNm[i-1],arrContiCd[i-1]);
			}
			document.frm1.s_conti_cd.options[0].selected="true";
		} else {
			document.frm1.s_conti_cd.length=1;
			document.frm1.s_conti_cd.options[0]=new Option("","");
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
//확인 Ajax
function dispIContiAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined' && doc[1]!=';'){
			var arrTmp=doc[1].split(';');
			var arrContiCd=arrTmp[0].split('|');
			var arrContiNm=arrTmp[1].split('|');
			document.frm1.i_conti_cd.text=1; 
			document.frm1.i_conti_cd.options[0]=new Option("","");
			for ( var i=1 ; i < arrContiCd.length ; i++ ) {
				document.frm1.i_conti_cd.options[i]=new Option(arrContiNm[i-1],arrContiCd[i-1]);
			}
			document.frm1.i_conti_cd.options[0].selected="true";
		} else {
			document.frm1.i_conti_cd.length=1;
			document.frm1.i_conti_cd.options[0]=new Option("","");
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function doAction(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var i_cnt_cd=formObj.i_cnt_cd.value;
	if(checkAddModiVal(frm1)){
		ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchContryCode&s_cnt_cd='+i_cnt_cd, './GateServlet.gsl');
	}
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(checkAddModiVal(frm1)){
				doWork("MODIFY");
			}
		} else {
			if(checkAddModiVal(frm1)){
				doWork("ADD");
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function useFlgChange() {
	var formObj=document.frm1;
	if ( formObj.i_use_flg.checked == true ) {
		formObj.i_use_flg.value="Y";
	} else if ( formObj.i_use_flg.checked == false ) {
		formObj.i_use_flg.value="N";
	}
	formObj.i_cnt_cd.disabled=false;
}
function fncContrySearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function checkAddModiVal(frm1){
    //if(checkInputVal(frm1.i_cnt_cd.value, 2, 2, "T", getLabel('CNT_CD'))!='O'){
	if(getStringLength(trim(frm1.i_cnt_cd.value)) != 2){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CNTY') + getLabel('FMS_COD_CODE'));
		frm1.i_cnt_cd.focus();
    	return false;
    } 
	//else if(checkSelectVal(frm1.i_prnt_conti_cd.value, getLabel('CONTI_CD'))!='O'){
	else if(getStringLength(trim(frm1.i_prnt_conti_cd.value)) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CONT') + getLabel('FMS_COD_CODE'));
		frm1.i_prnt_conti_cd.focus();
    	return false;
    } 
	//else if(checkSelectVal(frm1.i_conti_cd.value, getLabel('SUB_CONTI_CD'))!='O'){
	else if(getStringLength(trim(frm1.i_conti_cd.value)) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_SUBC') + getLabel('FMS_COD_CODE'));
		frm1.i_conti_cd.focus();
    	return false;
    } 
	//else if(checkInputVal(frm1.i_cnt_locl_nm.value, 1, 100, "T", getLabel('LOCAL_NM'))!='O'){
	else if(getStringLength(trim(frm1.i_cnt_locl_nm.value)) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_LOCN'));
		frm1.i_cnt_locl_nm.focus();
    	return false;
    } 
	//else if(checkInputVal(frm1.i_cnt_eng_nm.value, 1, 50, "T", getLabel('ENG_NM'))!='O'){
	else if(getStringLength(trim(frm1.i_cnt_eng_nm.value)) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ENGN'));
		frm1.i_cnt_eng_nm.focus();
    	return false;
    } 
	//else if(checkInputVal(frm1.i_desc.value, 0, 200, "T", getLabel('DESC'))!='O'){
	else if(getStringLength(trim(frm1.i_desc.value)) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_DESC'));
		frm1.i_desc.focus();
    	return false;
    } 
	//else if(checkInputVal(frm1.i_curr_cd.value, 0, 3, "T", getLabel('CURR'))!='O'){
	else if(getStringLength(trim(frm1.i_curr_cd.value)) == 0){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CURR') + getLabel('FMS_COD_CODE'));
		frm1.i_curr_cd.focus();
    	return false;
    }
    return true;
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	if ( obj.value != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="partner"){
				formObj.s_liner_code.value=masterVals[0];//trdp_cd
				formObj.s_liner_abbr.value=masterVals[2];//shrt_nm
				formObj.s_liner_name.value=masterVals[3];//full_nm
			}else if(CODETYPE =="country"){
				formObj.s_country_code.value=masterVals[0];//cnt_cd
				formObj.s_country_name.value=masterVals[3];//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.s_Port_code.value=masterVals[0];//loc_cd 
				formObj.s_node_code.value=masterVals[1];//nod_cd 
				formObj.s_Port_name.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.i_curr_cd.value=masterVals[0];//cd_val
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.s_office_code.value=masterVals[0];
				formObj.s_office_name.value=masterVals[3];
			}else if(CODETYPE =="user"){
				formObj.s_user_id.value=masterVals[0];
				formObj.s_user_name.value=masterVals[3];
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value=masterVals[0];
				formObj.s_freight_name.value=masterVals[3];
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value=masterVals[0];
				formObj.s_container_name.value=masterVals[3];
			}else if(CODETYPE =="commodity"){
				formObj.s_commodity_code.value=masterVals[0];
				formObj.s_commodity_name.value=masterVals[3];
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value=masterVals[0];
				formObj.s_package_name.value=masterVals[3];
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value=masterVals[0];
				formObj.s_cargo_name.value=masterVals[3];
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value=masterVals[0];
				formObj.s_vessel_name.value=masterVals[3];
			}
		}else{
			if(CODETYPE =="partner"){
				formObj.s_liner_code.value=masterVals[0];//trdp_cd
				formObj.s_liner_abbr.value=masterVals[2];//shrt_nm
				formObj.s_liner_name.value=masterVals[3];//full_nm
			}else if(CODETYPE =="country"){
				formObj.s_country_code.value=masterVals[0];//cnt_cd
				formObj.s_country_name.value=masterVals[3];//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.s_Port_code.value=masterVals[0];//loc_cd 
				formObj.s_node_code.value=masterVals[1];//nod_cd 
				formObj.s_Port_name.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.i_curr_cd.value="";
				//doWork('CURRENCY_POPLIST');
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.s_office_code.value=masterVals[0];
				formObj.s_office_name.value=masterVals[3];
			}else if(CODETYPE =="user"){
				formObj.s_user_id.value=masterVals[0];
				formObj.s_user_name.value=masterVals[3];
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value=masterVals[0];
				formObj.s_freight_name.value=masterVals[3];
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value=masterVals[0];
				formObj.s_container_name.value=masterVals[3];
			}else if(CODETYPE =="commodity"){
				formObj.s_commodity_code.value=masterVals[0];
				formObj.s_commodity_name.value=masterVals[3];
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value=masterVals[0];
				formObj.s_package_name.value=masterVals[3];
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value=masterVals[0];
				formObj.s_cargo_name.value=masterVals[3];
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value=masterVals[0];
				formObj.s_vessel_name.value=masterVals[3];
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function HBL_POPLIST(rtnVal){
	var formObj = document.frm1;	
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_bl_no.value=rtnValAry[0];//house_bl_no		
		doWork('SEARCHLIST');
	}
}

function setPrintSort(reqVal){
	var formObj = document.frm1;
	
	if(reqVal.checked==true){
		prt_sort += reqVal.value+"\n";
	} else {
		prt_sort = prt_sort.replaceAll(reqVal.value+"\n",'');
	}
	formObj.prt_sort.value = prt_sort;
}	

function getPdfFileNm(){
	var formObj=document.frm1;
	var pdfFileNm = "";
	var inv_no = formObj.s_dc_inv_seq.value;
	if (inv_no == "" || inv_no == "undefined" || inv_no == undefined) {
		return "";
	}
	pdfFileNm = "DC_"+inv_no;	
	return pdfFileNm;
}