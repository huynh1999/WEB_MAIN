var rtnary=new Array(1);
var callBackFunc = "";
var prt_sort=""
function submitForm(){
	var formObj=document.frm1;
	doShowProcess();
	param = "f_cmd="+SEARCH01 + "&f_bl_no="+ formObj.f_bl_no.value;
	$.ajax({
		   type: "POST",
		   url: "./AIE_BMD_0100AJ.clt",
		   dataType: 'xml',
		   data: param,
		   success: function(data){
			   setFieldValue( formObj.s_intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.s_ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.s_ref_ofc_eng_nm, $('ref_ofc_eng_nm',data).text());
			   // #999 [SHINE] B/L 회사명 변경 옵션
			   //setFieldValue( formObj.s_ofc_locl_nm, $('ref_ofc_eng_nm',data).text());
			   // #4694 [IMPEX] AIR Document Package - COMPANY NAME ON REPORT : Name(Representing) 으로 변경요청하여 #999 주석 처리 및 변경
			   setFieldValue( formObj.s_ofc_locl_nm, $('ofc_rep_nm',data).text());
			   
			   setFieldValue( formObj.s_ref_ofc_cnt_cd, $('ref_ofc_cnt_cd',data).text());
			   setFieldValue( formObj.s_cmc_inv_flg, $('cmc_inv_flg',data).text());
			   setFieldValue( formObj.s_pck_inv_flg, $('pck_inv_flg',data).text());
			   setFieldValue( formObj.s_cr_db_flg, $('cr_db_flg',data).text());
			   setFieldValue( formObj.s_hbl_flg, $('hbl_flg',data).text());
			   setFieldValue( formObj.mbl_agt_tedp_cd, $('agt_trdp_cd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.f_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.s_agt_desc, $('agt_info',data).text());
			   setFieldValue( formObj.ae_hbl_form, $('ae_hbl_form',data).text());
			   
			   doBtnAuthority(attr_extension);
			   $("#s_bl_radio6").prop('checked', true);
			   $("#s_agt_tp1").prop('checked', true);
			   doWork('CLEAR');
			   $("#f_wgt_opt_radio1").prop('checked', true);
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
    var formObj=document.frm1;
    var sheetObj=docObjects[0];
    switch(srcName) {
	    case "SEARCH":
	    	formObj.f_cmd.value=SEARCH01;
			//검증로직
			if(formObj.f_bl_no.value == ""){
//				alert("MAWB No. is mandatory field.");
				alert(getLabel('FMS_COM_ALT014'));
				formObj.f_bl_no.focus();
				return;
			}
			formObj.action="./AIE_BMD_0100.clt";
			formObj.submit();
			//submitForm();
		break;
		case "SEARCHLIST":
	        formObj.f_cmd.value=SEARCHLIST;
			//검증로직
			if(formObj.f_bl_no.value == ""){
//				alert("MAWB No. is mandatory field.");
				alert(getLabel('AIR_MSG_047'));
				formObj.f_bl_no.focus();
				return;
			}
			sheetObj.DoSearch("AIE_BMD_0100GS.clt", FormQueryString(formObj) );
		break;
		case "MBL_POPLIST":
			rtnary=new Array(1);
			rtnary[0]="A";//airSeaTp
			rtnary[1]="O";//bndTp;
			callBackFunc = "MBL_POPLIST";
	  	    modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
	  	        
		break;
		case "Print":
			if(formObj.s_intg_bl_seq.value == ""){
//				alert("MBL No. is mandatory field.");
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
					|| formObj.s_rpt_tp_8.checked
					|| formObj.s_rpt_tp_9.checked
					)){
//				alert("Please select Report Type.");
				alert(getLabel('AIR_MSG_049'));
				return;
			}
			if(formObj.s_agt_tp[1].checked == true && formObj.s_hbl_agt.value == ""){
//				alert("Please select Agent.");
				alert(getLabel('AIR_MSG_050'));
				return;
			}
			var crdbSeq="";
			var dataTp="";
			var dataTrdpCd="";
			var dataSeq="";
			formObj.title.value='Document Package';
			var ttlFileName="";
			var ttlParam="";
			
			
			//check order print
			var arrPrtSort = prt_sort.split('\n');
			
			for ( var k=0 ; k < arrPrtSort.length-1 ; k++ ) {
				
				//1. Cargo Manifest
				if(arrPrtSort[k] == 'Cargo Manifest'){
					
					var agtTp="";
					for(var i=0 ; i < formObj.s_agt_tp.length ; i++){
						if(formObj.s_agt_tp[i].checked){
							agtTp=formObj.s_agt_tp[i].value;
							break;
						}
					}
			    	for(var i=0 ; i < formObj.f_wgt_opt_radio.length ; i++){
			    		if(formObj.f_wgt_opt_radio[i].checked == true){
							formObj.f_wgt_opt.value=formObj.f_wgt_opt_radio[i].value;
							break;
						}
			    	}	    					
					switch(agtTp){
					    case "1" : 
					    	ttlFileName += "^@@^" + "cargo_manifest_ae_mawb_01.mrd";
						break;
						case "2" : 
							ttlFileName += "^@@^" + "cargo_manifest_ae_mawb_02.mrd";
						break;
						case "3" : 
//							ttlFileName += "^@@^" + "cargo_manifest_ae_mawb_05.mrd";
//							LHK 20130502
							ttlFileName += "^@@^" + "cargo_manifest_ae_mawb_04.mrd";
						break;
						case "4" : 
//							ttlFileName += "^@@^" + "cargo_manifest_ae_mawb_08.mrd";
//							LHK 20130502
							ttlFileName += "^@@^" + "cargo_manifest_ae_mawb_06.mrd";
							break;
					}
					//Parameter Setting
					var param='[' + formObj.s_intg_bl_seq.value + ']';
					param += '[' + formObj.s_ofc_locl_nm.value + ']';
					param += '[' + formObj.s_ref_ofc_cd.value + ']';
					if(formObj.s_agt_tp[1].checked){
						param += "['" + formObj.s_hbl_agt.value + "']";
					}else{
						param += '[]';
					}
					param += '[' + formObj.f_rmk.value + ']';	//Master Agent(Acctual Shipper와 Co-Load)를 선택하였을시 Remark 추가(1,2)
					if(agtTp == '1' || agtTp == '2' )
					{
						param += '['+ formObj.f_wgt_opt.value +']';
					}else{
						param += '[]';
					}
					param += '[' + roleCd + ']'; // [7] Role Code
					ttlParam += "^@@^" + param;
				}
				
				//2. Master Set / MAWB
				if(arrPrtSort[k] == 'Master Set / MAWB'){
					if(formObj.ae_hbl_form.value != ""){
						/* HBL customer form */
						if(formObj.s_bl_radio[0].checked){
							ttlFileName += "^@@^" + 'MBL_AIR_' + formObj.ae_hbl_form.value + '_ORG.mrd';
						}else{
							ttlFileName += "^@@^" + 'MBL_AIR_' + formObj.ae_hbl_form.value + '_COPY.mrd';
						}
					}else{
						/* HBL normal form */
						if(formObj.s_bl_radio[0].checked){
							ttlFileName += "^@@^" + 'MBL_AIR_ORG.mrd';
						}else{
							ttlFileName += "^@@^" + 'MBL_AIR_COPY.mrd';
						}
					}			
					
					/*if(formObj.s_bl_radio[0].checked){
						ttlFileName += "^@@^" + 'MBL_AIR_ORG.mrd';
					}else{
						ttlFileName += "^@@^" + 'MBL_AIR_COPY.mrd';
					}*/
					
					//Parameter Setting
					var param='[' + "'" + formObj.s_intg_bl_seq.value + "'" + ']';	// [1]
					if(formObj.s_ref_ofc_cnt_cd.value == "US"){
						param += '[' + 'Y' + ']';										// [2]
					}else{
						param += '[' + 'N' + ']';										// [2]
					}
					if(formObj.s_bl_radio[0].checked){
						param += '[' + 'org' + ']';										// [3]
					}else{
						param += '[' + 'copy' + ']';									// [3]
					}
					param += '[' + 'N' + ']';											// [4]
					param += '[' + 'Y' + ']';											// [5]
					param += '[' + 'CNEE' + ']';										// [6]
					param += '[' + ']';													// [7]
					param += '[' + usrId + ']';											// [8]
					param += '[' + ']';													// [9]
					
					// #4693 [BNX GE] AEM Doc package , HAWB Print 시 일부 칼럼 값 틀리게 출력되는 문제 - 버그 수정 중 발견
					// MAWB의 경우 Signature 표기되지 않음, HAWB와 로직 일치하도록 변경 
					//param += '[' + ']';													// [10]
					//param += '[' + ']';													// [11]
					//param += '[' + ']';													// [12]
					
					var byCarr = formObj.s_flt_no.value + " " + formObj.s_lnr_trdp_nm.value;
					param += '[' + byCarr + ']';										// [10]
					
					var signShip="";
					if( formObj.s_hbl_tp_cd.value == "TP" ){
						signShip=formObj.s_thr_trdp_nm.value + "\r\n" + "AS AGENT OF " + formObj.s_shpr_trdp_nm.value;
					}else if(formObj.s_iss_trdp_nm.value != ""){
						signShip=formObj.s_iss_trdp_nm.value + "\r\n" + "AS AGENT OF " + formObj.s_shpr_trdp_nm.value;
					}else{
						signShip="ADVANCED" + "\r\n" + "AS AGENT OF " + formObj.s_shpr_trdp_nm.value;
					}
					param += '[' + decodeURIComponent(signShip) + ']';										// [11]
					
					var signCarr="";
					if( formObj.s_hbl_tp_cd.value == "TP" ){
						signCarr=formObj.s_thr_trdp_nm.value + "\r\n" + "AS AGENT FOR THE CARRIER " + formObj.s_lnr_trdp_nm.value;
					}else if(formObj.s_iss_trdp_nm.value != ""){
						signCarr=formObj.s_iss_trdp_nm.value + "\r\n" + "AS AGENT FOR THE CARRIER " + formObj.s_lnr_trdp_nm.value;
					}else{
						signCarr="ADVANCED" + "\r\n" + "AS AGENT FOR THE CARRIER " + formObj.s_lnr_trdp_nm.value;
					}
					param += '[' + decodeURIComponent(signCarr) + ']';										// [12]
					
					param += '[' + 'Y' + ']';											// [13]
					param += '[' + 'X' + ']';											// [14]
					param += '[' + 'Y' + ']';											// [15]
					param += '[' + 'Y' + ']';											// [16]
					param += '[' + 'Y' + ']';											// [17]
					param += '[' + formObj.s_ref_ofc_cnt_cd.value + ']';				// [18] 국가코드
					
					//param += '[SHIP]';												// [19]
					
					if(formObj.s_send_to1.checked){ 									// [19]
						param += '[SHIP]';
					}else{
						param += '[' + ']';
					}
					
					param += '[' + ']';													// [20]
					
					//param += '[CNEE]';												// [21]
					
					if(formObj.s_send_to2.checked){ 									// [21]
						param += '[CNEE]';
					}else{
						param += '[' + ']';
					}
					
					param += '[' + ']';													// [22]
					param += '[Y]';														// [23]
					param += '[N]';														// [24]
					param += '[Y]';														// [25]
					param += '[N]';														// [26]
					if(formObj.s_bl_radio[0].checked){
						param += ' /rpaperlength [3049]';
					}else{
						//param += ' /rpaperlength [2970]';
						param += ' /rpaperlength [2794]';	// 11 inch = 279.4 mm
						
					}
					ttlParam += "^@@^" + param;
				}
				
				
				//3. Credit / Debit Note
				if(arrPrtSort[k] == 'Credit / Debit Note' && !formObj.s_agt_tp[1].checked){
					
					for(var i=1 ; i <= sheetObj.RowCount() ; i++){
						dataTp=sheetObj.GetCellValue(i, "data_tp");
						dataSeq=sheetObj.GetCellValue(i, "data_seq");
						if(dataTp == "MCRDB"){
							crdbSeq=crdbSeq + ",'" +  dataSeq + "'";
						}
					}
					crdbSeq=crdbSeq.substring(1);
					if(crdbSeq != ""){
						if(formObj.s_ref_ofc_cnt_cd.value == "IT"){
							ttlFileName += "^@@^" + 'invoice_05.mrd';
						}else{
							ttlFileName += "^@@^" + 'invoice_02_us.mrd';
						}
						//Parameter Setting
						var param='[' + usrEml + ']';											// [1]
						param += '[' + crdbSeq + ']';											// [2]
						param += '[' + ']';														// [3]
						param += '[' + ']';														// [4]
						param += '[' + ']';														// [5]
						param += '[' + ']';														// [6]
						if(formObj.s_agt_tp[1].checked == true){
							param += '[' + formObj.s_hbl_agt.value + ']';						// [7]
						}else{
							param += '[' + formObj.s_ref_ofc_cd.value + 'MAINCMP' + ']';		// [7]
						}
						param += '[' + formObj.s_ref_ofc_cd.value + ']';						// [8]
						param += '[' + usrPhn + ']';											// [9]
						param += '[' + usrFax + ']';											// [10]
						param += '[' + usrId + ']';												// [11]
						param += '[' + ']';														// [12]
						param += '[' + ofcLoclNm + ']';											// [13]  user local office name
						param += '[]';
						param += '[]';
						ttlParam += "^@@^" + param;
					}
				}
				
				for(var i=1 ; i <= sheetObj.RowCount() ; i++){
					dataTp=sheetObj.GetCellValue(i, "data_tp");
					dataTrdpCd=sheetObj.GetCellValue(i, "data_trdp_cd");
					dataSeq=sheetObj.GetCellValue(i, "data_seq");
					
					if(dataTp == "HBL" && (formObj.s_hbl_agt.value == "" || formObj.s_hbl_agt.value == dataTrdpCd)){
						//추가 LHK 20130615
						var agt_tp_flg=true;
						
						if(formObj.s_agt_tp[0].checked && formObj.mbl_agt_tedp_cd.value != dataTrdpCd){
							agt_tp_flg=false;
						}
						
						//4. HBL
						if(arrPrtSort[k] == 'HB/L' && agt_tp_flg == true){
							if(formObj.ae_hbl_form.value != ""){
								/* HBL customer form */
								if(formObj.s_bl_radio[0].checked){
									ttlFileName += "^@@^" + 'HBL_AIR_' + formObj.ae_hbl_form.value + '_ORG.mrd';
								}else{
									ttlFileName += "^@@^" + 'HBL_AIR_' + formObj.ae_hbl_form.value + '_COPY.mrd';
								}
							}else{
								/* HBL normal form */
								if(formObj.s_bl_radio[0].checked){
									ttlFileName += "^@@^" + 'HBL_AIR_ORG.mrd';
								}else{
									ttlFileName += "^@@^" + 'HBL_AIR_COPY.mrd';
								}
							}		
							
							/*if(formObj.s_bl_radio[0].checked){
								ttlFileName += "^@@^" + 'HBL_AIR_ORG.mrd';
							}else{
								ttlFileName += "^@@^" + 'HBL_AIR_COPY.mrd';
							}*/
							
							//Parameter Setting
							var param="['" + dataSeq + "']";									// [1]
							if(formObj.s_ref_ofc_cnt_cd.value == "US"){
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
							param += '[' + 'CNEE' + ']';										// [6]
							param += '[' + ']';													// [7]
							param += '[' + usrId + ']';											// [8]
							param += '[' + ']';													// [9]
							var byCarr=sheetObj.GetCellValue(i, "flt_no") + " " + sheetObj.GetCellValue(i, "lnr_trdp_nm");
							param += '[' + byCarr + ']';										// [10]
							var signShip="";
							if(sheetObj.GetCellValue(i, "hbl_tp_cd") == "TP"){
								signShip=sheetObj.GetCellValue(i, "thr_trdp_nm") + "\r\n" + "AS AGENT OF " + sheetObj.GetCellValue(i, "shpr_trdp_nm");
							}else if(formObj.s_iss_trdp_nm.value != ""){
								//signShip=formObj.s_ref_ofc_eng_nm.value + "\r\n" + "AS AGENT OF " + sheetObj.GetCellValue(i, "shpr_trdp_nm");
								signShip=formObj.s_iss_trdp_nm.value + "\r\n" + "AS AGENT OF " + sheetObj.GetCellValue(i, "shpr_trdp_nm");
							}else{
								signShip="ADVANCED" + "\r\n" + "AS AGENT OF " + sheetObj.GetCellValue(i, "shpr_trdp_nm");
							}
							// #4526 [BNX GE] Cargo mafniest , Doc package 확인 요청
							param += '[' + decodeURIComponent(signShip) + ']';										// [11]
							//param += '[' + signShip + ']';										// [11]
							var signCarr="";
							if(sheetObj.GetCellValue(i, "hbl_tp_cd") == "TP"){
								signCarr=sheetObj.GetCellValue(i, "thr_trdp_nm") + "\r\n" + "AS AGENT FOR THE CARRIER " + sheetObj.GetCellValue(i, "lnr_trdp_nm");
							}else if(formObj.s_iss_trdp_nm.value != ""){
								//signCarr=formObj.s_ref_ofc_eng_nm.value + "\r\n" + "AS AGENT FOR THE CARRIER " + sheetObj.GetCellValue(i, "lnr_trdp_nm");
								signCarr=formObj.s_iss_trdp_nm.value + "\r\n" + "AS AGENT FOR THE CARRIER " + sheetObj.GetCellValue(i, "lnr_trdp_nm");
							}else{
								signCarr="ADVANCED" + "\r\n" + "AS AGENT FOR THE CARRIER " + sheetObj.GetCellValue(i, "lnr_trdp_nm");
							}
							// #4526 [BNX GE] Cargo mafniest , Doc package 확인 요청
							param += '[' + decodeURIComponent(signCarr) + ']';										// [12]
							//param += '[' + signCarr + ']';										// [12]
							param += '[' + 'Y' + ']';											// [13]
							param += '[' + 'X' + ']';											// [14]
							param += '[' + 'Y' + ']';											// [15]
							param += '[' + 'Y' + ']';											// [16]
							param += '[' + 'N' + ']';											// [17]
							param += '[' + formObj.s_ref_ofc_cnt_cd.value + ']';				// [18] 국가코드
							//param += '[SHIP]';												// [19]
							if(formObj.s_send_to1.checked){ 									// [19]
								param += '[SHIP]';
							}else{
								param += '[' + ']';
							}
							param += '[' + ']';													// [20]
							//param += '[CNEE]';												// [21]
							if(formObj.s_send_to2.checked){ 									// [21]
								param += '[CNEE]';
							}else{
								param += '[' + ']';
							}
							param += '[' + ']';													// [22]
							param += '[Y]';														// [23]
							param += '[N]';														// [24]
							param += '[Y]';														// [25]
							param += '[N]';														// [26]						
							if(formObj.s_bl_radio[0].checked){
								param += ' /rpaperlength [3049]';
							}else{
								//param += ' /rpaperlength [2970]';
								param += ' /rpaperlength [2794]';	// 11 inch = 279.4 mm
							}
							ttlParam += "^@@^" + param;
						}
						
						
						//7. Shipping Advice
						if(arrPrtSort[k] == 'Shipping Advice' && agt_tp_flg == true){
							/*
							if(formObj.s_ref_ofc_cnt_cd.value == "DE"){
								ttlFileName += "^@@^" + 'shipping_advice_ae_hawb_de_01.mrd';
								//Parameter Setting
								var param='[' + dataSeq + ']';
								param += '[' + formObj.s_hbl_agt.value + ']';
								param += '[' + ']';
								param += '[' + formObj.f_rmk.value + ']';
								ttlParam += "^@@^" + param;
							}else{ */
								ttlFileName += "^@@^" + 'shipping_advice_ae_hawb_01.mrd';
								var param='[' + dataSeq + ']';
								param += '[' + formObj.s_ofc_locl_nm.value + ']';
								param += '[' + usrNm + ']';
								param += '[' + formObj.f_rmk.value + ']';
								param += '[' + 'agt' + ']';
								param += '[' + formObj.s_ref_ofc_cd.value + ']';
								param += '[' + ']';
								param += '[' + formObj.s_hbl_agt.value + ']';
								param += '[' + usrPhn + ']';
								param += '[' + usrFax + ']';
								param += '[]';
								ttlParam += "^@@^" + param;
						
							//}
						}
						
						// 독일 Ausfuhrbescheinigung 추가건
						//9. Ausfuhrbescheinigung (독일전용)
						if(arrPrtSort[k] == 'Ausfuhr.' && agt_tp_flg == true){
							ttlFileName += "^@@^" + 'shipping_advice_ae_hawb_de_01.mrd';
							
							//Parameter Setting
							var param = '[' + dataSeq + ']';					
							ttlParam += "^@@^" + param;
						}	
					}
					
					if(dataTp == "HCRDB" && (formObj.s_hbl_agt.value == "" || formObj.s_hbl_agt.value == dataTrdpCd)){
						//추가 LHK 20130615
						var agt_tp_flg=true;
						if(formObj.s_agt_tp[0].checked && formObj.mbl_agt_tedp_cd.value != dataTrdpCd){
							agt_tp_flg=false;
						}
						
						//3. Credit / Debit Note (HBL)
						if(arrPrtSort[k] == 'Credit / Debit Note' && agt_tp_flg == true){
							
							if(formObj.s_ref_ofc_cnt_cd.value == "IT"){
								ttlFileName += "^@@^" + 'invoice_05.mrd';
							}else{
								ttlFileName += "^@@^" + 'invoice_02_us.mrd';
							}
							//Parameter Setting
							var param='[' + usrEml + ']';											// [1]
							param += "['" + dataSeq + "']";											// [2]
							param += '[' + ']';														// [3]
							param += '[' + ']';														// [4]
							param += '[' + ']';														// [5]
							param += '[' + ']';														// [6]
							if(formObj.s_agt_tp[1].checked){
								param += '[' + formObj.s_hbl_agt.value + ']';						// [7]
							}else{
								param += '[' + formObj.s_ref_ofc_cd.value + 'MAINCMP' + ']';		// [7]
							}
							param += '[' + formObj.s_ref_ofc_cd.value + ']';						// [8]
							param += '[' + usrPhn + ']';											// [9]
							param += '[' + usrFax + ']';											// [10]
							param += '[' + usrId + ']';												// [11]
							param += '[' + ']';														// [12]
							param += '[' + ofcLoclNm + ']';											// [13]  user local office name
							param += '[]';
							param += '[]';
							ttlParam += "^@@^" + param;
						}
					}
					
					if(dataTp == "CMC" && (formObj.s_hbl_agt.value == "" || formObj.s_hbl_agt.value == dataTrdpCd)){
						//5. Commercial Invoice
						if(arrPrtSort[k] == 'Commercial_Invoice'){
							ttlFileName += "^@@^" + 'commercial_invoice_01.mrd';
							//Parameter Setting
							var param="['" + dataSeq + "']";
							param += '[' + 'CI' + ']';
							ttlParam += "^@@^" + param;
						}
					}
					
					if(dataTp == "PCK" && (formObj.s_hbl_agt.value == "" || formObj.s_hbl_agt.value == dataTrdpCd)){
						//6. Packing List
						if(arrPrtSort[k] == 'Packing List'){
							ttlFileName += "^@@^" + 'packing_list_01.mrd';
							//Parameter Setting
							var param="['" + dataSeq + "']";
							param += '[' + 'PL' + ']';
							ttlParam += "^@@^" + param;
						}
					}
				}
				
				var hblCnt = 0;
				
				for(var i=1 ; i <= sheetObj.RowCount() ; i++){
					dataTp=sheetObj.GetCellValue(i, "data_tp");
					if(dataTp == "HBL"){
						hblCnt++;
					}
				}
				
				if (hblCnt == 0) {
					
					//HBL이 존재하지 않을 경우 MBL로 데이타를 조회한다.
					if(arrPrtSort[k] == 'Shipping Advice'){
						ttlFileName += "^@@^" + 'shipping_advice_ae_hawb_01.mrd';
						var param='[]';
						param += '[' + formObj.s_ofc_locl_nm.value + ']';
						param += '[' + usrNm + ']';
						param += '[' + formObj.f_rmk.value + ']';
						param += '[' + 'agt' + ']';
						param += '[' + formObj.s_ref_ofc_cd.value + ']';
						param += '[' + ']';
						param += '[' + formObj.s_hbl_agt.value + ']';
						param += '[' + usrPhn + ']';
						param += '[' + usrFax + ']';
						var mblSeq = formObj.s_intg_bl_seq.value;
						param += '[' + mblSeq + ']';
						ttlParam += "^@@^" + param;
					}
					
					// 독일 Ausfuhrbescheinigung 추가건
					//9. Ausfuhrbescheinigung (독일전용)
					if(arrPrtSort[k] == 'Ausfuhr.'){
						ttlFileName += "^@@^" + 'shipping_advice_ae_hawb_de_01.mrd';
						var mblSeq = formObj.s_intg_bl_seq.value;
						var param = '[' + mblSeq + ']';							
						ttlParam += "^@@^" + param;
					}
				}
			}	
						
			formObj.rpt_biz_tp.value="AEM";
			formObj.rpt_biz_sub_tp.value="DP";
			if (agtTp == "1" || agtTp == "2") {
				formObj.rpt_tp.value="MA";
				formObj.rpt_trdp_cd.value="";
			} else if (agtTp == "3") {
				formObj.rpt_tp.value="";
				formObj.rpt_trdp_cd.value=formObj.s_hbl_agt.value;
			} else {
				formObj.rpt_tp.value="CR";
				formObj.rpt_trdp_cd.value="";
			}
			
			
			if(ttlFileName.substring(4) != ""){
				formObj.file_name.value=ttlFileName.substring(4);
				formObj.rd_param.value=ttlParam.substring(4);
				popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
			}else{
				//There is no data
   	 			alert(getLabel('FMS_COM_ALT010'));
				return;
			}
		break;
		case "ALL":
			if(formObj.s_rpt_tp_1.disabled == false){
				formObj.s_rpt_tp_1.checked=true;
				prt_sort = prt_sort.replaceAll(formObj.s_rpt_tp_1.value+"\n",'');
				setPrintSort(formObj.s_rpt_tp_1);
			}
			if(formObj.s_rpt_tp_2.disabled == false){
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
			if(formObj.s_rpt_tp_7.disabled == false){
				formObj.s_rpt_tp_7.checked = true;
				prt_sort = prt_sort.replaceAll(formObj.s_rpt_tp_7.value+"\n",'');
				setPrintSort(formObj.s_rpt_tp_7);
			}
			if(formObj.s_rpt_tp_8.disabled == false){
				formObj.s_rpt_tp_8.checked = true;
				prt_sort = prt_sort.replaceAll(formObj.s_rpt_tp_8.value+"\n",'');
				setPrintSort(formObj.s_rpt_tp_8);
			}
			if(user_ofc_cnt_cd == "DE"){
				if(formObj.s_rpt_tp_9.disabled == false){
					formObj.s_rpt_tp_9.checked = true;
					prt_sort = prt_sort.replaceAll(formObj.s_rpt_tp_9.value+"\n",'');
					setPrintSort(formObj.s_rpt_tp_9);
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
			formObj.s_rpt_tp_8.checked=false;
			formObj.s_rpt_tp_9.checked=false;
			formObj.prt_sort.value='';
			prt_sort = '';
		break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
function dispalyRptTp() {
	var formObj=document.frm1;
	if(formObj.s_intg_bl_seq.value != ""){
		if(formObj.s_cr_db_flg.value == "N"){
			formObj.s_rpt_tp_3.disabled=true;
		} else {
			formObj.s_rpt_tp_3.disabled=false;
		}
		if(formObj.s_hbl_flg.value == "N"){
			formObj.s_rpt_tp_4.disabled=true;
			//formObj.s_rpt_tp_7.disabled=true;
		} else {
			formObj.s_rpt_tp_4.disabled=false;
			//formObj.s_rpt_tp_7.disabled=false;			
		}
		if(formObj.s_cmc_inv_flg.value == "N"){
			formObj.s_rpt_tp_5.disabled=true;
		} else {
			formObj.s_rpt_tp_5.disabled=false;
		}
		if(formObj.s_pck_inv_flg.value == "N"){
			formObj.s_rpt_tp_6.disabled=true;
		} else {
			formObj.s_rpt_tp_6.disabled=false;
		}
	}
	
	// OFC가 DE가 아니면 독일전용을 Disable시킨다.
	
	if(user_ofc_cnt_cd != "DE"){
		formObj.s_rpt_tp_9.disabled = true;			
		getObj("de_div").style.display = 'none';
	}else {
		formObj.s_rpt_tp_9.disabled = false;		
		getObj("de_div").style.display = 'inline';
	}
	
}
/**
* Agent Type 중 Master Agent(Co-Load)를 선택하면 MBL의 Agent 목록이 나오고
* Sub Agent(New)를 선택하면 HBL의 Agent 목록이 나옴
*/
function agtTpChange(val){
	var formObj=document.frm1;
	if(val == "2"){//Master Agent(Co-Load)
		formObj.s_hbl_agt.disabled=false;
		var len=formObj.s_hbl_agt.length-1;
		for(var i=0 ; i < len ; i++){
			formObj.s_hbl_agt.remove(1);
		}
		for(var i=0 ; i < agtTrdpCdArr.length ; i++){
			if(blFlgArr[i] == "M"){
				var addOpt=document.createElement("OPTION");
				formObj.s_hbl_agt.add(addOpt);
				addOpt.innerText=agtTrdpNmArr[i];
				addOpt.value=agtTrdpCdArr[i];
			}
		}
	}else if(val == "3"){//Sub Agent(New)
		formObj.s_hbl_agt.disabled=false;
		var len=formObj.s_hbl_agt.length-1;
		for(var i=0 ; i < len ; i++){
			formObj.s_hbl_agt.remove(1);
		}
		for(var i=0 ; i < agtTrdpCdArr.length ; i++){
			if(blFlgArr[i] == "H"){
				var addOpt=document.createElement("OPTION");
				formObj.s_hbl_agt.add(addOpt);
				addOpt.innerText=agtTrdpNmArr[i];
				addOpt.value=agtTrdpCdArr[i];
			}
		}
	}else{
		formObj.s_hbl_agt.disabled=true;
		formObj.s_hbl_agt.value="";
	}
}
function entSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		if(formObj.f_bl_no.value != ""){
			doWork('SEARCH');
		}
	}
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	dispalyRptTp();
	
	// #45955 - [IMPEX] 독일 지점 요구사항 3가지, (AEM Entry 화면 디멘젼 길이 디폴트 옵션, Document Package Weight Option, AEM Entry에서 "SUM" 버튼 로직)
	if (user_ofc_cnt_cd == "DE") {
		formObj.f_wgt_opt_radio[1].checked = true;
	} else {
		formObj.f_wgt_opt_radio[0].checked = true;
	}
	
	// #999 [SHINE] B/L 회사명 변경 옵션
	//if(ref_ofc_eng_nm == '' || ref_ofc_eng_nm == null || ref_ofc_eng_nm == 'undefined'){		
	//	formObj.s_ofc_locl_nm.value = ofcLoclNm;		
	//}else{
	//	formObj.s_ofc_locl_nm.value = unescape(ref_ofc_eng_nm);
	//}
	
	// #4694 [IMPEX] AIR Document Package - COMPANY NAME ON REPORT : Name(Representing) 으로 변경요청하여 #999 주석 처리 및 변경
	formObj.s_ofc_locl_nm.value = formObj.s_ofc_rep_nm.value;
		
	if(formObj.s_intg_bl_seq.value != ""){
		doWork("SEARCHLIST");
	}
	
	
}
/**
* IBSheet Object를 배열로 등록
* 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
* 배열은 소스 상단에 정의
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
* 시트 초기설정값, 헤더 정의
* param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
* 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
*/
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIE_BMD_0100_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"data_tp",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"data_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"data_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"sort_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hbl_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"flt_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"shpr_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"thr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	         
	        InitColumns(cols);

	        SetEditable(1);
	        SetVisible(0);
			}                                                      
		break;
	}
}
function sheet1_OnSearchEnd(sheetObj){
	sheetObj.ColumnSort("trdp_nm|bl_no|sort_no");
}
function chgRmk(){
	var formObj=document.frm1;
	if(formObj.s_rpt_tp_7.checked){
		formObj.f_rmk.className='search_form';
		formObj.f_rmk.readOnly=false;
	}else{
		formObj.f_rmk.value='';
		formObj.f_rmk.className='search_form-disable';
		formObj.f_rmk.readOnly=true;
	}
}
function MBL_POPLIST(rtnVal){
	var formObj = document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_bl_no.value=rtnValAry[0];//master_bl_no
		doWork('SEARCH');
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