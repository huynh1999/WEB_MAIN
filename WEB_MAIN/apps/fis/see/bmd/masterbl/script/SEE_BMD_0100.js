var rtnary=new Array(1);
var callBackFunc = "";
var prt_sort=""
function setFieldValue(obj, value){
	if($(obj).is("select") || $(obj).is("input:radio") || $(obj).is("input:checkbox")){
		if(value != ""){
			$(obj).val(value);
		}
	}else {
		$(obj).val(value);
	}
}

function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./SEE_BMD_0100AJ.clt",
		   dataType: 'xml',
		   data: { f_cmd: cmd,  f_ref_no: formObj.f_ref_no.value , f_bl_no: formObj.f_bl_no.value},
		   success: function(data){
			   setFieldValue( formObj.s_intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.s_ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.s_ofc_locl_nm, $('ref_ofc_eng_nm',data).text());
			   setFieldValue( formObj.s_ref_ofc_cnt_cd, $('ref_ofc_cnt_cd',data).text());
			   setFieldValue( formObj.s_sea_body, $('sea_body',data).text());
			   setFieldValue( formObj.s_cmc_inv_flg, $('cmc_inv_flg',data).text());
			   setFieldValue( formObj.s_pck_inv_flg, $('pck_inv_flg',data).text());
			   setFieldValue( formObj.s_cr_db_flg, $('cr_db_flg',data).text());
			   setFieldValue( formObj.s_hbl_flg, $('hbl_flg',data).text());
			   setFieldValue( formObj.mbl_agt_tedp_cd, $('agt_trdp_cd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.rmk_cd, $('rmk_cd',data).text());
			   setFieldValue( formObj.oe_hbl_form, $('oe_hbl_form',data).text());
			   setFieldValue( formObj.f_ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.f_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.s_agt_desc, $('agt_info',data).text());
			   
			  doBtnAuthority(attr_extension);
			  $("#s_bl_radio6").prop('checked', true);
			  $("#s_agt_tp1").prop('checked', true);
			  doWork('CLEAR');
			  loadPage();
			  
			  doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}
function doWork(srcName){
    var formObj=document.frm1;
    var sheetObj=docObjects[1];
    var sheetObj1=docObjects[0];
    switch(srcName) {
	    case "SEARCH":
			//검증로직
	    	formObj.f_bl_no.value=trim(formObj.f_bl_no.value);
	    	formObj.f_ref_no.value=trim(formObj.f_ref_no.value);
			if(formObj.f_bl_no.value == "" && formObj.f_ref_no.value == ""){
				//MBL No./Reference No. is mandatory field.
				alert(getLabel('FMS_COM_ALT014'));
				formObj.f_ref_no.focus();
				return;
			}
	    	formObj.f_cmd.value=SEARCH01;
			formObj.action="./SEE_BMD_0100.clt";
			formObj.submit();
			//submitForm(SEARCH01);
			break;
		case "SEARCHLIST":
			//검증로직
	    	formObj.f_bl_no.value=trim(formObj.f_bl_no.value);
	    	formObj.f_ref_no.value=trim(formObj.f_ref_no.value);
			if(formObj.f_bl_no.value == "" && formObj.f_ref_no.value == ""){
				//MBL No./Reference No. is mandatory field.
				alert(getLabel('FMS_COM_ALT001'));
				formObj.f_ref_no.focus();
				return;
			}
            formObj.f_cmd.value=SEARCHLIST;
            sheetObj.DoSearch("SEE_BMD_0100GS.clt", FormQueryString(formObj) );
			break;
		case "SEARCHLIST01":
			//검증로직
	    	formObj.f_bl_no.value=trim(formObj.f_bl_no.value);
	    	formObj.f_ref_no.value=trim(formObj.f_ref_no.value);
			if(formObj.f_bl_no.value == "" && formObj.f_ref_no.value == ""){
				//MBL No./Reference No. is mandatory field.
				alert(getLabel('FMS_COM_ALT001'));
				formObj.f_ref_no.focus();
				return;
			}
            formObj.f_cmd.value=SEARCHLIST01;
            sheetObj1.DoSearch("SEE_BMD_0100_1GS.clt", FormQueryString(formObj) );
			break;
		case "MBL_POPLIST":
			rtnary=new Array(1);
			rtnary[0]="S";//airSeaTp
			rtnary[1]="O";//bndTp;
			
			callBackFunc = "MBL_POPLIST";
	  	    modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
	  	    
			break;
		case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(1);
			rtnary[0]="S";
			rtnary[1]="O";
			
			callBackFunc = "REF_POPLIST";
	  	    modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
	  	    
	    	break;
		case "Print":
			formObj.f_ref_no.value=trim(formObj.f_ref_no.value);
			if(formObj.f_ref_no.value == ""){
				//MBL No. is mandatory field.
				alert(getLabel('FMS_COM_ALT029'));
				formObj.f_ref_no.focus();
				return;
			}
			if((formObj.s_rpt_tp_1.checked==false) 
					&& (formObj.s_rpt_tp_2.checked==false) 
					&& (formObj.s_rpt_tp_3.checked==false)
					&& (formObj.s_rpt_tp_4.checked==false) 
					&& (formObj.s_rpt_tp_5.checked==false) 
					&& (formObj.s_rpt_tp_6.checked==false)
					&& (formObj.s_rpt_tp_7.checked==false)
					&& (formObj.s_rpt_tp_8.checked==false)
			){
				//Please select Report Type.
				alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_RPTT'));
				return;
			}
			formObj.s_hbl_agt.value=trim(formObj.s_hbl_agt.value);
			if(formObj.s_agt_tp[1].checked == true && formObj.s_hbl_agt.value == ""){
				//Please select Agent.
				alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_AGNT'));
				return;
			}
			var crdbSeq="";
			var dataTp="";
			var dataTrdpCd="";
			var dataSeq="";
			formObj.title.value="Document Package";
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
					switch(agtTp){
						case "1" : 
							ttlFileName += "^@@^" + "cargo_manifest_oe_mbl_01.mrd";
							break;
						case "2" : 
							ttlFileName += "^@@^" + "cargo_manifest_oe_mbl_02.mrd";
							break;
						case "3" : 
//							ttlFileName += "^@@^" + "cargo_manifest_oe_mbl_05.mrd";
//							LHK 20130502						
							ttlFileName += "^@@^" + "cargo_manifest_oe_mbl_04.mrd";
							break;
					}
					//Parameter Setting
					var param='[' + formObj.s_intg_bl_seq.value + ']';
					param += '[' + formObj.s_ofc_locl_nm.value + ']';
					param += '[' + formObj.s_ref_ofc_cd.value + ']';
					if(formObj.s_agt_tp[1].checked){
						param += "['" + formObj.s_hbl_agt.value + "']";
					}
					else{
						param += '[]';
					}
					param += '[' + formObj.f_rmk.value + ']';	//Master Agent(Acctual Shipper와 Co-Load)를 선택하였을시 Remark 추가(1,2)
					
					if(formObj.s_pck_rpt_opt[0].checked){ // N : By B/L, Y : By Container
		        		param += '[N]'; // [6]
		        	}else{
		        		param += '[Y]'; // [6]
		        	}
					param += '[' + roleCd + ']'; // [7] Role Code
					
					ttlParam += "^@@^" + param;
					//#1247 [CLT] HB/L Company Name - Print 시 저장 요청 및 Document Package 시 표시
					ajaxSendPost(goPrint, "reqVal", "&goWhere=aj&bcKey=mergeBLPrintOptInfo&intg_bl_seq="+formObj.s_intg_bl_seq.value+"&prn_type=OEM"
							+"&sign_ship="+formObj.s_ofc_locl_nm.value
							+"&usr_id="+usrId
							, "./GateServlet.gsl");	
				}
				//2. Master Set / MAWB
				if(arrPrtSort[k] == 'Master Set / MAWB'){
					ttlFileName += "^@@^" + 'SR_SEA.mrd';
					//Parameter Setting
					var hd_tit = "Master Bill Of Lading"; 
					var seaway_bill_yn = "N"
					var param='[' + formObj.s_intg_bl_seq.value + ']';					// [1]
						param += '[' + usrPhn + ']';		// [2]
						param += '[' + usrFax + ']';		// [3]
						param += '[' + usrEml + ']';		// [4]
						param += '[' + hd_tit + ']';								    // [5] Main Header Title
						param += '[' + seaway_bill_yn + ']';							// [6] Seaway Bill Watermark 
						param += '[' + formObj.s_ref_ofc_cd.value + ']';									// [7] ofc_cd
						param += '[' + formObj.s_ofc_locl_nm.value + ']';               //[8] //#1247 [CLT] HB/L Company Name - Print 시 저장 요청 및 Document Package 시 표시
					ttlParam += "^@@^" + param;
				}
				
				//3. Credit / Debit Note
				if(arrPrtSort[k] == 'Credit / Debit Note'){
					for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
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
						}else if(formObj.s_ref_ofc_cnt_cd.value == "US" || formObj.s_ref_ofc_cnt_cd.value == "CA" || formObj.s_ref_ofc_cnt_cd.value == "DE"){
							ttlFileName += "^@@^" + 'invoice_02_us.mrd';
						}else{
							ttlFileName += "^@@^" + 'invoice_02.mrd';
						}
						
						//ttlFileName += "^@@^" + 'invoice_02_us.mrd';
						
						//Parameter Setting
						var param='[' + usrEml + ']';											// [1]
						param += '[' + crdbSeq + ']';											// [2]
						param += '[' + ']';														// [3]
						param += '[' + ']';														// [4]
						param += '[' + ']';														// [5]
						param += '[' + ']';														// [6]
						if(formObj.s_agt_tp[1].checked == true){
							param += '[' + formObj.s_hbl_agt.value + ']';						// [7]
						}
						else{
							param += '[' + formObj.s_ref_ofc_cd.value + 'MAINCMP' + ']';		// [7]
						}
						param += '[' + formObj.s_ref_ofc_cd.value + ']';						// [8]
						param += '[' + usrPhn + ']';											// [9]
						param += '[' + usrFax + ']';											// [10]
						param += '[' + usrId + ']';												// [11]
						param += '[' + ']';						// 12
						param += '[' + ofcLoclNm + ']';		//13  user local office name
						param += '[]';
						param += '[]';
						ttlParam += "^@@^" + param;
					}
				}
				
				
				
				for(var i=1 ; i < sheetObj1.LastRow() + 1 ; i++){
					if(sheetObj1.GetCellValue(i,"chk") == 1){
						dataTrdpCd=sheetObj1.GetCellValue(i, "data_trdp_cd");
						dataSeq=sheetObj1.GetCellValue(i, "data_seq");
						
						if(formObj.s_hbl_agt.value == "" || formObj.s_hbl_agt.value == dataTrdpCd){
							var agt_tp_flg=true;
							
							//4. HB/L
							if(arrPrtSort[k] == 'HB/L'){
								
								/*
								if(formObj.oe_hbl_form.value != ""){
									ttlFileName += "^@@^" + 'HBL_SEA_' + formObj.oe_hbl_form.value + '_COPY.mrd';
								}else{
									ttlFileName += "^@@^" + 'HBL_SEA.mrd';
								}
								*/
								ttlFileName += "^@@^" + 'HBL_SEA_COPY.mrd';
								//Parameter Setting
								var param="['" + dataSeq + "']";										// [1]
								if(formObj.s_ref_ofc_cnt_cd.value == "US" || formObj.s_ref_ofc_cnt_cd.value == "CA"){
									param += '[' + 'Y' + ']';											// [2]
								}
								else{
									param += '[' + 'N' + ']';											// [2]
								}
								if(formObj.s_bl_radio[0].checked){
									param += '[' + 'org' + ']';											// [3]
								}
								else{
									param += '[' + 'copy' + ']';										// [3]
								}
								param += '[' + '1' + ']';												// [4]
								param += '[' + sheetObj1.GetCellValue(i, "frt_flg") + ']';				// [5]
								if(formObj.s_bl_radio[0].checked){
									param += '[' + 'org' + ']';											// [6]
								}
								else if(formObj.s_bl_radio[1].checked){
									param += '[' + 'nego' + ']';										// [6]
								}
								else if(formObj.s_bl_radio[2].checked){
									param += '[' + 'dra' + ']';											// [6]
								}
								else if(formObj.s_bl_radio[3].checked){
									param += '[' + 'copy' + ']';										// [6]
								}
								else if(formObj.s_bl_radio[4].checked){
									param += '[' + 'telex' + ']';										// [6]
								}
								else if(formObj.s_bl_radio[5].checked){
									param += '[' + 'none' + ']';										// [6]
								}
								param += '[' + 'Y' + ']';												// [7]
								param += '[' + ']';														// [8]
								param += '[' + ']';														// [9]
								param += '[' + ']';														// [10]
								//#1912 [PATENT]B/L 출력 AS AGENT FOR THE CARRIER 설정
								/*
								if(formObj.s_ref_ofc_cnt_cd.value == "JP"){
									param += '[' + ']';													// [11]
								}
								else if(formObj.s_ref_ofc_cnt_cd.value == "DE"){
									param += '[' + formObj.s_sea_body.value + " " + sheetObj.GetCellValue(i, "lnr_trdp_nm") + ']';	// [11]
								}
								else{
									param += '[' + formObj.s_sea_body.value + ", " + sheetObj.GetCellValue(i, "lnr_trdp_nm") + ']';// [11]
								}
								*/
								param += '[' + formObj.s_sea_body.value + " " + sheetObj.GetCellValue(i, "lnr_trdp_nm") + ']';	// [11]
								param += '[' + 'N' + ']';												// [12]
								/* OEH Print 팝업에서 bl Remark 정보를 조회.jsjang #16904 */
								param += '[' + formObj.rmk_cd.value + ']';								// [13]	
//								param += '['+ sheetObj1.GetCellValue(i, "sign_ship") + ']';				// [14] B/L Company Name #1247 [CLT] HB/L Company Name - Print 시 저장 요청 및 Document Package 시 표시

								param += '[]';	      //14
								//#4197 [JAPT] DOC.PKG in MBL List is not working well.
								//15 ~ 21번 파라미터는 모두 jptc용 옵션 파라미터.
								param += '[1]';	      //15
								param += '[N]';		  //16
								param += '[N]';       //17
								param += '[Y]';	      //18
								param += '[N]';	      //19
								param += '[N]';       //20
								param += '[N]';	      //21
								
								
								ttlParam += "^@@^" + param;
								
								
							}
							
							//7. Shipping Advice
							if(arrPrtSort[k] == 'Shipping Advice'){
								ttlFileName += "^@@^" + 'shipping_advice_oe_hbl_01.mrd';
								var param='[' + dataSeq + ']';
								param += '[' + formObj.s_ofc_locl_nm.value + ']';
								param += '[' + usrNm + ']';
								param += '[' + formObj.f_rmk.value + ']';
								// [20140306 OJG] Shipping Advise 출력이 안되 변경 
								if( formObj.s_agt_tp[0].checked || formObj.s_agt_tp[2].checked ){
									param += '[' + 'mbl_agt' + ']';
								}else{
									param += '[' + 'agt' + ']';
								}
								param += '[' + formObj.s_ref_ofc_cd.value + ']';
								param += '[' + ']';
								param += '[' + formObj.s_hbl_agt.value + ']';
								param += '[' + usrPhn + ']';
								param += '[' + usrFax + ']';
								ttlParam += "^@@^" + param;
							}
							
							//8. Ausfuhr.
							if(arrPrtSort[k] == 'Ausfuhr.'){
								ttlFileName += "^@@^" + 'shipping_advice_oe_hbl_de_01.mrd';
								//Parameter Setting
								var param = '[' + dataSeq + ']';							
								ttlParam += "^@@^" + param;
							}
						}
					}
				}
				
				
				
				for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
					dataTp=sheetObj.GetCellValue(i, "data_tp");
					dataTrdpCd=sheetObj.GetCellValue(i, "data_trdp_cd");
					dataSeq=sheetObj.GetCellValue(i, "data_seq");
					/*if(dataTp == "HBL" && (formObj.s_hbl_agt.value == "" || formObj.s_hbl_agt.value == dataTrdpCd)){
						//추가 LHK 20130615
						var agt_tp_flg=true;
						 [20140306 OJG] Shipping Advise 출력이 안되 변경
						if(formObj.s_agt_tp[0].checked && formObj.mbl_agt_tedp_cd.value != dataTrdpCd){
							agt_tp_flg=false;
						}
						
						//7. Shipping Advice
						if(formObj.s_rpt_tp_7.checked && agt_tp_flg == true){
							
							if(formObj.s_ref_ofc_cnt_cd.value == "DE"){
								ttlFileName += "^@@^" + 'shipping_advice_oe_hbl_de_01.mrd';
								//Parameter Setting
								var param='[' + dataSeq + ']';
								param += '[' + ']';
								param += '[' + formObj.s_hbl_agt.value + ']';
								param += '[' + formObj.f_rmk.value + ']';
								ttlParam += "^@@^" + param;
							}
							else{
								ttlFileName += "^@@^" + 'shipping_advice_oe_hbl_01.mrd';
								var param='[' + dataSeq + ']';
								param += '[' + formObj.s_ofc_locl_nm.value + ']';
								param += '[' + usrNm + ']';
								param += '[' + formObj.f_rmk.value + ']';
								// [20140306 OJG] Shipping Advise 출력이 안되 변경 
								if( formObj.s_agt_tp[0].checked || formObj.s_agt_tp[2].checked ){
									param += '[' + 'mbl_agt' + ']';
								}else{
									param += '[' + 'agt' + ']';
								}
								param += '[' + formObj.s_ref_ofc_cd.value + ']';
								param += '[' + ']';
								param += '[' + formObj.s_hbl_agt.value + ']';
								param += '[' + usrPhn + ']';
								param += '[' + usrFax + ']';
								ttlParam += "^@@^" + param;
							//}
						}
						//4. HBL
						if(formObj.s_rpt_tp_4.checked && agt_tp_flg == true){
							if(formObj.oe_hbl_form.value != ""){
								ttlFileName += "^@@^" + 'HBL_SEA_' + formObj.oe_hbl_form.value + '_COPY.mrd';
							}else{
								ttlFileName += "^@@^" + 'HBL_SEA.mrd';
							}
							//Parameter Setting
							var param="['" + dataSeq + "']";										// [1]
							if(formObj.s_ref_ofc_cnt_cd.value == "US" || formObj.s_ref_ofc_cnt_cd.value == "CA"){
								param += '[' + 'Y' + ']';											// [2]
							}
							else{
								param += '[' + 'N' + ']';											// [2]
							}
							if(formObj.s_bl_radio[0].checked){
								param += '[' + 'org' + ']';											// [3]
							}
							else{
								param += '[' + 'copy' + ']';										// [3]
							}
							param += '[' + '1' + ']';												// [4]
							param += '[' + 'Y' + ']';												// [5]
							if(formObj.s_bl_radio[0].checked){
								param += '[' + 'org' + ']';											// [6]
							}
							else if(formObj.s_bl_radio[1].checked){
								param += '[' + 'nego' + ']';										// [6]
							}
							else if(formObj.s_bl_radio[2].checked){
								param += '[' + 'dra' + ']';											// [6]
							}
							else if(formObj.s_bl_radio[3].checked){
								param += '[' + 'copy' + ']';										// [6]
							}
							else if(formObj.s_bl_radio[4].checked){
								param += '[' + 'telex' + ']';										// [6]
							}
							else if(formObj.s_bl_radio[5].checked){
								param += '[' + 'none' + ']';										// [6]
							}
							param += '[' + 'Y' + ']';												// [7]
							param += '[' + ']';														// [8]
							param += '[' + ']';														// [9]
							param += '[' + ']';														// [10]
							if(formObj.s_ref_ofc_cnt_cd.value == "JP"){
								param += '[' + ']';													// [11]
							}
							else if(formObj.s_ref_ofc_cnt_cd.value == "DE"){
								param += '[' + formObj.s_sea_body.value + " " + sheetObj.GetCellValue(i, "lnr_trdp_nm") + ']';	// [11]
							}
							else{
								param += '[' + formObj.s_sea_body.value + ", " + sheetObj.GetCellValue(i, "lnr_trdp_nm") + ']';// [11]
							}
							param += '[' + 'N' + ']';												// [12]
							 OEH Print 팝업에서 bl Remark 정보를 조회.jsjang #16904 
							param += '[' + formObj.rmk_cd.value + ']';								// [13]						
							ttlParam += "^@@^" + param;
							

							// 독일 Ausfuhrbescheinigung 추가건
							//8. Ausfuhrbescheinigung (독일전용)
							if(formObj.s_rpt_tp_8.checked && agt_tp_flg == true){
								ttlFileName += "^@@^" + 'shipping_advice_oe_hbl_de_01.mrd';
								
								//Parameter Setting
								var param = '[' + dataSeq + ']';							
								ttlParam += "^@@^" + param;
							}
							
						}
					}*/
					if(dataTp == "HCRDB" && (formObj.s_hbl_agt.value == "" || formObj.s_hbl_agt.value == dataTrdpCd)){
						//추가 LHK 20130615
						var agt_tp_flg=true;
						if(formObj.s_agt_tp[0].checked && formObj.mbl_agt_tedp_cd.value != dataTrdpCd){
							agt_tp_flg=false;
						}
						
						//3. Credit / Debit Note (HBL)
						if(arrPrtSort[k] == 'Credit / Debit Note' && agt_tp_flg == true){
							/*if(formObj.s_ref_ofc_cnt_cd.value == "IT"){
								ttlFileName += "^@@^" + 'invoice_05.mrd';
							}else if(formObj.s_ref_ofc_cnt_cd.value == "US" || formObj.s_ref_ofc_cnt_cd.value == "CA" || formObj.s_ref_ofc_cnt_cd.value == "DE"){
								ttlFileName += "^@@^" + 'invoice_02_us.mrd';
							}else{
								ttlFileName += "^@@^" + 'invoice_02.mrd';
							}*/
							
							ttlFileName += "^@@^" + 'invoice_02_us.mrd';
							
							//Parameter Setting
							var param='[' + usrEml + ']';											// [1]
							param += "['" + dataSeq + "']";											// [2]
							param += '[' + ']';														// [3]
							param += '[' + ']';														// [4]
							param += '[' + ']';														// [5]
							param += '[' + ']';														// [6]
							if(formObj.s_agt_tp[1].checked){
								param += '[' + formObj.s_hbl_agt.value + ']';						// [7]
							}
							else{
								param += '[' + formObj.s_ref_ofc_cd.value + 'MAINCMP' + ']';		// [7]
							}
							param += '[' + formObj.s_ref_ofc_cd.value + ']';						// [8]
							param += '[' + usrPhn + ']';											// [9]
							param += '[' + usrFax + ']';											// [10]
							param += '[' + usrId + ']';												// [11]
							//param += '[' + formObj.main_trdp.value + ']';			// 12
							param += '[' + ']';										// 12
							param += '[' + ofcLoclNm + ']';		//13  user local office name
							param += '[]';
							param += '[]';
							ttlParam += "^@@^" + param;
						}
					}
					if(dataTp == "CMC" && (formObj.s_hbl_agt.value == "" || formObj.s_hbl_agt.value == dataTrdpCd)){
						
						//5. Commercial Invoice
						// #4561 [Perfect Logistics] Commercial invoice not printing on OEM document package
						if(arrPrtSort[k] == 'Commercial Invoice'){
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
			}	
			
			
			formObj.rpt_biz_tp.value="OEM";
			formObj.rpt_biz_sub_tp.value="DP";
			if (agtTp == "3") {
				formObj.rpt_tp.value="";
				formObj.rpt_trdp_cd.value=formObj.s_hbl_agt.value;
			} else {
				formObj.rpt_tp.value="MA";
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
			if(usrCntCd == "DE"){
				if(formObj.s_rpt_tp_8.disabled == false){
					formObj.s_rpt_tp_8.checked = true;
					prt_sort = prt_sort.replaceAll(formObj.s_rpt_tp_8.value+"\n",'');
					setPrintSort(formObj.s_rpt_tp_8);
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
			formObj.prt_sort.value='';
			prt_sort = '';
			break;
    }
}
function dispalyRptTp() {
	var formObj=document.frm1;
	if(formObj.s_intg_bl_seq.value != ""){
		if(formObj.s_cr_db_flg.value == "N"){
			formObj.s_rpt_tp_3.disabled=true;
		}
		if(formObj.s_hbl_flg.value == "N"){
			formObj.s_rpt_tp_4.disabled=true;
			formObj.s_rpt_tp_7.disabled=true;
		}
		if(formObj.s_cmc_inv_flg.value == "N"){
			formObj.s_rpt_tp_5.disabled=true;
		}
		if(formObj.s_pck_inv_flg.value == "N"){
			formObj.s_rpt_tp_6.disabled=true;
		}
	}
	// OFC가 DE가 아니면 독일전용을 Disable시킨다.
	//formObj.s_ref_ofc_cnt_cd.value='DE'
	
	if(usrCntCd != "DE"){
		formObj.s_rpt_tp_8.disabled = true;		
		getObj("de_div").style.display = 'none';
	} else {
		formObj.s_rpt_tp_8.disabled = false;
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
		if(formObj.f_bl_no.value != "" || formObj.f_ref_no.value != ""){
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

	// #999 [SHINE] B/L 회사명 변경 옵션
	if(ref_ofc_eng_nm == '' || ref_ofc_eng_nm == null || ref_ofc_eng_nm == 'undefined'){
		
		formObj.s_ofc_locl_nm.value = ofcLoclNm;		
	}else{
		
		formObj.s_ofc_locl_nm.value = ref_ofc_eng_nm;
	}
	
	if(formObj.s_intg_bl_seq.value != ""){
		doWork("SEARCHLIST");
		doWork("SEARCHLIST01");
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
		case 1:      //IBSheet2 init
		    with(sheetObj){
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('SEE_BMD_0100_HDR2'), Align:"Center"} ];
				InitHeaders(headers, info);
	
				var cols = [ {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"chk",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   TrueValue:"Y", FalseValue:"N" },
				     {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"data_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"data_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"sort_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Combo",     Hidden:0,  Width:90,  Align:"Center",  ColMerge:1,   SaveName:"frt_flg",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sign_ship",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 }];
		       
				InitColumns(cols);
				SetColProperty('frt_flg', {ComboText:'No|Yes', ComboCode:'N|Y'} );
				SetEditable(1);	
				SetVisible(1);		// Grid Hidden처리
				SetSheetHeight(170);
			}
	    break;
		case 2:      //IBSheet1 init
		    with(sheetObj){
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('SEE_BMD_0100_HDR1'), Align:"Center"} ];
				InitHeaders(headers, info);

				var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"data_tp",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"data_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"data_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"sort_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		       
				InitColumns(cols);
				SetEditable(1);	
				SetVisible(0);		// Grid Hidden처리
			}
	    break;
	}
}

function sheet1_OnSearchEnd(sheetObj){
	sheetObj.ColumnSort("trdp_nm|bl_no|sort_no");
}

function sheet2_OnSearchEnd(sheetObj){
	sheetObj.ColumnSort("trdp_nm|bl_no|sort_no");
	checkHblOpt();
}

function MBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else
	{
		var rtnValAry=rtnVal.split("|");
		formObj.f_bl_no.value=rtnValAry[0];//master_bl_no
		formObj.f_ref_no.value=rtnValAry[2];
		doWork("SEARCH");
	}
}

function REF_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_bl_no.value=rtnValAry[0];
		formObj.f_ref_no.value=rtnValAry[2];
		doWork("SEARCH");
	}
}

function checkHblOpt(){
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	
	for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
		sheetObj.SetCellValue(i, "chk", "Y", 0);
	}
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet2_OnDblClick(sheetObj, Row, Col) {
	var colStr = sheetObj.ColSaveName(Col);
	if (colStr == "bl_no") {
		var hblNo = sheetObj.GetCellValue(Row,colStr);
		if(hblNo!=''){
		   	var paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+hblNo;
		   	parent.mkNewFrame('HB/L Entry', paramStr, "SEE_BMD_0020_SHEET_" + hblNo);
		}
	}
}

function goPrint(reqVal){
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