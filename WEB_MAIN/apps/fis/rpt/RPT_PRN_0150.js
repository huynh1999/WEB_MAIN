function doWork(srcName){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
    switch(srcName) {
		case 'Print':
		case 'PREVIEW':			
			if(sheetObj.RowCount()> 0){
				
				/*
				var intgBlSeq="";
				var hblNos="";
				for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
				if(sheetObj.GetCellValue(i , "chk") == "1"){
					intgBlSeq += ",'" + sheetObj.GetCellValue(i , "intg_bl_seq") + "'";
					hblNos += "," + sheetObj.GetCellValue(i , "bl_no");
					}
				}
				intgBlSeq=intgBlSeq.substring(1);
				if(intgBlSeq == ""){
				 	alert(getLabel('FMS_COM_ALT007')+ "\n\n: RPT_PRN_0150.16");
					return;
				} 	
				if(formObj.f_air_sea_tp.value == "S"){
					//#24613 [GPL] Arrival Notice에다 "Place of Receipt" 추가
					//#27250
					if (prn_ofc_cd == "GPL") {
						formObj.f_file_name.value='arrival_notice_oi_mbl_01_GPL.mrd';
						formObj.file_name.value='arrival_notice_oi_mbl_01_GPL.mrd';
					} else if (prn_ofc_cd == "BNXC") {
						formObj.f_file_name.value='arrival_notice_oi_mbl_01_BNXC.mrd';
						formObj.file_name.value='arrival_notice_oi_mbl_01_BNXC.mrd';
					} else {
						formObj.f_file_name.value='arrival_notice_oi_mbl_01.mrd';
						formObj.file_name.value='arrival_notice_oi_mbl_01.mrd';
					}
				}else{
					//27250
					//formObj.f_file_name.value = 'arrival_notice_ai_mawb_01.mrd';
					//formObj.file_name.value = 'arrival_notice_ai_mawb_01.mrd';
					if (prn_ofc_cd == "BNXC"){
						formObj.f_file_name.value='arrival_notice_ai_mawb_01_BNXC.mrd';
						formObj.file_name.value='arrival_notice_ai_mawb_01_BNXC.mrd';
					//#41137 - [YM] Arrival Notice 폼의 STORAGE START 를 LAST FREE DATE 으로 변경
					} else if (prn_ofc_cd == "YM"){
						formObj.f_file_name.value = 'arrival_notice_ai_mawb_01_YM.mrd';
						formObj.file_name.value = 'arrival_notice_ai_mawb_01_YM.mrd';
					} else {					
						formObj.f_file_name.value='arrival_notice_ai_mawb_01.mrd';
						formObj.file_name.value='arrival_notice_ai_mawb_01.mrd';
					}
				}
				formObj.title.value='Arrival Notice';
				formObj.mailTitle.value='Arrival Notice[' + hblNos.substring(1, hblNos.length-1) + "]";
				//Parameter Setting
				var param='[' + formObj.f_intg_bl_seq.value + ']';		// [1]
				param += '[' + ofcLoclNm + ']';								// [2]
				param += '[' + ofcCd + ']'									// [3]
				param += '[' + usrEml + ']';								// [4]
				param += '[' + intgBlSeq + ']';								// [5]
				param += '[' + formObj.f_rmk.value + ']';					// [6]
				if(formObj.f_sel_radio[0].checked){
					param += '[' + formObj.f_sel_title.value + ']';			// [7]
				}else{
					param += '[' + formObj.f_txt_title.value + ']';			// [7]
				}
				param += '[' + usrPhn + ']';								// [8]
				param += '[' + usrFax + ']';								// [9]
				if(formObj.f_show_frt.checked){
					param += '[' + 'Y' + ']';								// [10]
				}else{
					param += '[]';											// [10]
				}
				*/
				
				//For로 돌리면서 Merge실시
				var intgBlSeq = "";
				var hblNos = "";
				var intgBlSeqs = "";
				var fileName = "";
				var param = "";
				//var iCheckRow = sheetObj.FindCheckedRow('chk');
				
				var iCheckRow = "";
				var v_bl_no = "";
				
				for(var i=1; i<=sheetObj.LastRow(); i++){
					if(sheetObj.GetCellValue(i, "chk") == "1"){
						if(v_bl_no == sheetObj.GetCellValue(i , "bl_no")){
							continue;
						}
						v_bl_no = sheetObj.GetCellValue(i , "bl_no");
						iCheckRow += i + "|";
					}
				}
				
				if(iCheckRow == ""){
				 	alert(getLabel('FMS_COM_ALT007'));
					return;
				}	
				
				//가져온 행을 배열로 반든다.
				var arrRow = iCheckRow.split("|");
				for(var i = 0 ; i < arrRow.length-1; i++){
					hblNos += "," + sheetObj.GetCellValue(arrRow[i] , "bl_no");
					intgBlSeqs += ",'" + sheetObj.GetCellValue(arrRow[i] , "intg_bl_seq") + "'";
					intgBlSeq = sheetObj.GetCellValue(arrRow[i] , "intg_bl_seq");
					
					if(formObj.f_air_sea_tp.value == "S"){
						// #46332 [ZIMEX + IML] Arrival Notice to show two charge like Binex A/N does
						// CMM =  Invoice가 2개인 Common Arrival Notice출력
						if (prn_ofc_cd == "CMM"){
							formObj.f_file_name.value = "arrival_notice_oi_hbl_us_01_CMM.mrd";
							fileName += 'arrival_notice_oi_hbl_us_01_CMM.mrd';
						} else if (prn_ofc_cd == "GPL") {
							formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_GPL.mrd';
							fileName += 'arrival_notice_oi_hbl_us_01_GPL.mrd';
						} else if (prn_ofc_cd == "BNXC") {
							formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_BNXC.mrd';
							fileName += 'arrival_notice_oi_hbl_us_01_BNXC.mrd';
						} else if (prn_ofc_cd == "BLS") {
							formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_BLS.mrd';
							fileName += 'arrival_notice_oi_hbl_us_01_BLS.mrd';
						} else if (prn_ofc_cd == "WEBT") {
							formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_WEBT.mrd';
							fileName += 'arrival_notice_oi_hbl_us_01_WEBT.mrd';
						} else if (prn_ofc_cd == "IGIC") {
							formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_IGIC.mrd';
							fileName += 'arrival_notice_oi_hbl_us_01_IGIC.mrd';
						} else if (prn_ofc_cd == "BNXD") {
							formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_BNXD.mrd';
							fileName += 'arrival_notice_oi_hbl_us_01_BNXD.mrd';
						} else if (prn_ofc_cd == "BNXV"){
							//OFVFOUR-8148 [BNX HN] Print Arrival Notice from OIM BL but no data show
							formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_BNXV.mrd';
							fileName += 'arrival_notice_oi_hbl_us_01_BNXV.mrd';
						} else {
							formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01.mrd';
							fileName += 'arrival_notice_oi_hbl_us_01.mrd';
						}
					}else{
						// #46332 [ZIMEX + IML] Arrival Notice to show two charge like Binex A/N does
						// CMM =  Invoice가 2개인 Common Arrival Notice출력
						if (prn_ofc_cd == "CMM"){
							formObj.f_file_name.value = "arrival_notice_ai_hawb_01_CMM.mrd";
							fileName += 'arrival_notice_ai_hawb_01_CMM.mrd';
						} else if (prn_ofc_cd == "BNXC"){
							formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_BNXC.mrd';
							fileName += 'arrival_notice_ai_hawb_01_BNXC.mrd';
						} else if (prn_ofc_cd == "YM"){
							formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_YM.mrd';
							fileName += 'arrival_notice_ai_hawb_01_YM.mrd';
						} else if (prn_ofc_cd == "IGIC"){
							formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_IGIC.mrd';
							fileName += 'arrival_notice_ai_hawb_01_IGIC.mrd';
						} else if (prn_ofc_cd == "BNXD"){
							formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_BNXD.mrd';
							fileName += 'arrival_notice_ai_hawb_01_BNXD.mrd';
						} else if (prn_ofc_cd == "WEBT"){
							formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_WEBT.mrd';
							fileName += 'arrival_notice_ai_hawb_01_WEBT.mrd';
						} else if (prn_ofc_cd == "BNXV"){
							formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_BNXV.mrd';
							fileName += 'arrival_notice_ai_hawb_01_BNXV.mrd';
						} else {					
							formObj.f_file_name.value = 'arrival_notice_ai_hawb_01.mrd';
							fileName += 'arrival_notice_ai_hawb_01.mrd';
						}
					}
					
					//#3358 [JTC]Japan Trust 용 Arrival Notice 개발
					//fileName = 'arrival_notice_A4_JAPT.mrd';
					
					param += '[' + intgBlSeq + ']';		// [1]
					
					if(formObj.f_sel_radio[0].checked){
						param += '[' + formObj.f_sel_title.value + ']';				// [2]
					}else{
						param += '[' + formObj.f_txt_title.value + ']';				// [2]
					}
					
					param += '[' + ofcCd + ']';										// [3]
					param += '[' + usrEml + ']';									// [4]
					param += '[' + usrPhn + ']';									// [5]
					param += '[' + usrFax + ']';									// [6]
					
					if(formObj.f_show_frt.checked){
						param += '[' + 'Y' + ']';									// [7]
					}else{
						param += '[]';												// [7]
					}
					
					// #45965 - [BINEX] Master Arrival Notice의 House Arrival Notice들의 Customer Ref. No. 들이 표시 안되고 있음
					param += '[' + sheetObj.GetCellValue(arrRow[i] , "cust_ref_no") + ']';   // [8] cust_ref_no
					param += '[' + usrnm + ']';					    				// [9]
					param += '[' + formObj.f_rmk.value + ']';					    // [10] Master Only
					param += '[http://' + location.host + ']';						// [11] TODO 삭제되어야 함 > /rv 로 대처
					
					// #47347 - [BINEX] Arrival Notice 프린트 시 아래 담당자 정보가 출력물에 추가되어야 함 (office별 관리)
					param += '[' + formObj.f_cgor_pic_info.value + ']';				// [12]
					
					// #50494 - [BNX] AIR IMPORT HAWB에 FREIGHT OPTION A/N에 표기 안되도록
					if(formObj.f_show_frt_term.checked){
						param += '[' + 'Y' + ']';									// [13]
					}else{
						param += '[]';												// [13]
					}	
					
					if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA"){
						if(RD_path.indexOf("/letter/") == -1) {  
							RD_path += "letter/";
						}
					}else{
						//US / CA 제외 경로셋팅 옵션 제공
						var opt_key = "MRD_A4_FOLDER";
					    ajaxSendPost(rdSetter, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
						
					}
					
					param += ' /rv invRptUrl[' +RD_path + 'invoice_01.mrd]';					//[20150330 OJG]  [invRptUrl] : Invoice Report URL 추가
					// TB_SYS_PROP에 'PRNT_LOGIN_USR', 'Y'이면
					// Login한 USERID를 파라미터로 넘긴다
					if (prn_login_usr == "Y"){
						param += ' loginUsrNm['+usrnm+']';					//[loginUsrNm]
						param += ' loginUsrTel['+usrPhn+']';					//[loginUsrTel] 
						param += ' loginUsrFax['+usrFax+']';					//[loginUsrFax]
						param += ' loginUsrEml['+usrEml+']';					//[loginUsrEml] 
					}
					
					if(i < arrRow.length-2){
						fileName += '^@@^';
						param += '^@@^';
					}	
				}
				
				formObj.title.value = 'Arrival Notice';
				// #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴
				var mailTitle;
				
				if(formObj.f_sel_radio[0].checked){
					mailTitle = formObj.f_sel_title.value;	
				}else{
					mailTitle = formObj.f_txt_title.value;
				}
				
				formObj.mailTitle.value = mailTitle + " [" + hblNos.substring(1, hblNos.length) + "]";
				
				var attachFileName = mailTitle.toLowerCase();
				
				for(var i=0; i<attachFileName.length; i++){
					attachFileName = attachFileName.replace(/\./g, "");
					attachFileName = attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
			    }
				
				formObj.attachFileName.value = attachFileName + formObj.f_file_name.value.replace(".mrd","").replace("arrival_notice","");;
				
				//formObj.mailTitle.value = 'Arrival Notice[' + hblNos.substring(1, hblNos.length-1) + "]";
				
				formObj.file_name.value = fileName;
				formObj.rd_param.value = param;
				
				if (formObj.f_air_sea_tp.value == "S") {
					formObj.rpt_biz_tp.value="OIM";    // Ocean Import > Master B/L > Master B/L List
				} else if (formObj.f_air_sea_tp.value == "A") {
					formObj.rpt_biz_tp.value="AIM";    // Air Import > Master B/L > Master B/L List
				}
				formObj.rpt_biz_sub_tp.value="AN";   // [Arrival Notice]
				//formObj.intg_bl_seq.value=formObj.f_intg_bl_seq.value; // intgBlSeq.substring(1, intgBlSeq.length-1);
				formObj.intg_bl_seq.value=formObj.f_intg_bl_seq.value;
				formObj.h_intg_bl_seq.value=intgBlSeqs.substring(2, intgBlSeqs.length-1);
				formObj.rpt_pdf_file_nm.value=getPdfFileNm();
				
				//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청
				if(formObj.f_sel_radio[0].checked){
					formObj.rpt_file_name_title.value = formObj.f_sel_title.value + "_"+hblNos.substring(1, hblNos.length);
				}else{
					formObj.rpt_file_name_title.value = formObj.f_txt_title.value + "_"+hblNos.substring(1, hblNos.length);
				}  				
				var t_attachFileName = formObj.rpt_file_name_title.value;
				t_attachFileName = t_attachFileName.replace(/\./g, "");
				t_attachFileName = t_attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
				formObj.rpt_file_name_title.value = t_attachFileName;
				
				if(srcName == "PREVIEW") {
					$("#prt_option").val("opt_preview");
				} else if(srcName == "PRINT") {
					$("#prt_option").val("opt_print");
				}

				if($("#chk_auto_close").is(":checked")){
					doWork("CLOSE");
				}

				popPOST(formObj, "RPT_RD_0010.clt", "popTest", 1025, 740);
			}
		break;
		case 'EMAIL':														
			if(sheetObj.RowCount()> 0){
				/*var iCheckRow=sheetObj.CheckedRows(0);
				if(iCheckRow == 0){
				 	alert(getLabel('FMS_COM_ALT007'));
					return;
				}*/	
				
				var custCheckRow=sheetObj.CheckedRows(8);
				var brkCheckRow=sheetObj.CheckedRows(10);
				
				if(custCheckRow + brkCheckRow == 0){
					alert(getLabel('FMS_COM_ALT007') + "\n\n CM or BM");
					return;
				}	
				
				var intgBlSeq = "";
				
				// #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴
				var mailTitle;
				
				if(formObj.f_sel_radio[0].checked){
					mailTitle = formObj.f_sel_title.value;	
				}else{
					mailTitle = formObj.f_txt_title.value;
				}
				
				if(formObj.f_air_sea_tp.value == "S"){
					// #46332 [ZIMEX + IML] Arrival Notice to show two charge like Binex A/N does
					// CMM =  Invoice가 2개인 Common Arrival Notice출력
					if (prn_ofc_cd == "CMM"){
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_CMM.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_CMM.mrd';
					} else if (prn_ofc_cd == "GPL") {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_GPL.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_GPL.mrd';
					} else if (prn_ofc_cd == "BNXC") {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_BNXC.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_BNXC.mrd';
					} else if (prn_ofc_cd == "BLS") {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_BLS.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_BLS.mrd';
					} else if (prn_ofc_cd == "WEBT") {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_WEBT.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_WEBT.mrd';
					} else if (prn_ofc_cd == "IGIC") {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_IGIC.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_IGIC.mrd';
					} else if (prn_ofc_cd == "BNXD") {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_BNXD.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_BNXD.mrd';
					} else if (prn_ofc_cd == "BNXV"){
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_01_BNXV.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_01_BNXV.mrd';
					} else {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01.mrd';
					}
					
				}else{
					// #46332 [ZIMEX + IML] Arrival Notice to show two charge like Binex A/N does
					// CMM =  Invoice가 2개인 Common Arrival Notice출력
					if (prn_ofc_cd == "CMM"){
						formObj.f_file_name.value = "arrival_notice_ai_hawb_01_CMM.mrd";
						formObj.file_name.value = 'arrival_notice_ai_hawb_01_CMM.mrd';
					} else if (prn_ofc_cd == "BNXC"){
						formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_BNXC.mrd';
						formObj.file_name.value = 'arrival_notice_ai_hawb_01_BNXC.mrd';
					} else if (prn_ofc_cd == "YM"){
						formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_YM.mrd';
						formObj.file_name.value = 'arrival_notice_ai_hawb_01_YM.mrd';
					} else if (prn_ofc_cd == "IGIC"){
						formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_IGIC.mrd';
						formObj.file_name.value = 'arrival_notice_ai_hawb_01_IGIC.mrd';
					} else if (prn_ofc_cd == "BNXD"){
						formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_BNXD.mrd';
						formObj.file_name.value = 'arrival_notice_ai_hawb_01_BNXD.mrd';
					} else if (prn_ofc_cd == "BNXV"){
						formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_BNXV.mrd';
						formObj.file_name.value = 'arrival_notice_ai_hawb_01_BNXV.mrd';
					} else {					
						formObj.f_file_name.value = 'arrival_notice_ai_hawb_01.mrd';
						formObj.file_name.value = 'arrival_notice_ai_hawb_01.mrd';
					}
				}
				
				// #266 - [BNX] EMAIL FUNCTION TO: AND CC: EMAIL from MBL List
				var v_intg_bl_seq = "";
				
				for(var i=1; i<=sheetObj.LastRow(); i++){
					
					if(v_intg_bl_seq.indexOf(sheetObj.GetCellValue(i, "intg_bl_seq")) != -1){
						continue;
					}
					
					var eml_addr = "";
					
					for(var j=1; j<=sheetObj.LastRow(); j++){
						if(sheetObj.GetCellValue(i, "intg_bl_seq") == sheetObj.GetCellValue(j, "intg_bl_seq")){
							if(sheetObj.GetCellValue(j, "cust_eml_flg") == "1"){
								if(eml_addr.indexOf(sheetObj.GetCellValue(j, "cust_eml")) == -1){
									eml_addr += sheetObj.GetCellValue(j, "cust_eml") + ";";
								}
							}
							if(sheetObj.GetCellValue(j, "brk_eml_flg") == "1"){
								if(eml_addr.indexOf(sheetObj.GetCellValue(j, "brk_eml")) == -1){
									eml_addr += sheetObj.GetCellValue(j, "brk_eml") + ";";
								}
							}
						}
					}
					
					sheetObj.SetCellValue(i, "eml_addr", eml_addr);
					
					v_intg_bl_seq += sheetObj.GetCellValue(i, "intg_bl_seq") + "&";
				}
				
				for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
					/*if(sheetObj.GetCellValue(i , "cust_eml_flg") != 1 && sheetObj.GetCellValue(i , "brk_eml_flg") != 1 ){
						//alert("Please Check the Email Check box ! ");
						alert(getLabel('FMS_COM_ALT007') + "\n\n CM or BM");
						return;
					}*/
					//RD File Name
					/*if(formObj.f_air_sea_tp.value == "S"){
						//#24613 [GPL] Arrival Notice에다 "Place of Receipt" 추가
						if (prn_ofc_cd == "GPL") {
							formObj.f_file_name.value='arrival_notice_oi_mbl_01_GPL.mrd';
							formObj.file_name.value='arrival_notice_oi_mbl_01_GPL.mrd';
							sheetObj.SetCellValue(i , "file_name",'arrival_notice_oi_mbl_01_GPL.mrd');
						} else if (prn_ofc_cd == "BNXC") {
							formObj.f_file_name.value='arrival_notice_oi_mbl_01_BNXC.mrd';
							formObj.file_name.value='arrival_notice_oi_mbl_01_BNXC.mrd';
							sheetObj.SetCellValue(i , "file_name",'arrival_notice_oi_mbl_01_BNXC.mrd');
						} else {
							formObj.f_file_name.value='arrival_notice_oi_mbl_01.mrd';
							formObj.file_name.value='arrival_notice_oi_mbl_01.mrd';
							sheetObj.SetCellValue(i , "file_name",'arrival_notice_oi_mbl_01.mrd');
						}
						sheetObj.SetCellValue(i , "eml_tit_nm","ARRIVAL NOTICE / INVOICE [HBL No : " + docObjects[0].GetCellValue(i, "bl_no") + ']');
					}else{
						if (prn_ofc_cd == "BNXC") {
							formObj.f_file_name.value='arrival_notice_ai_mawb_01_BNXC.mrd';
							formObj.file_name.value='arrival_notice_ai_mawb_01_BNXC.mrd';
							sheetObj.SetCellValue(i , "file_name",'arrival_notice_ai_mawb_01_BNXC.mrd');
						}else {
							formObj.f_file_name.value='arrival_notice_ai_mawb_01.mrd';
							formObj.file_name.value='arrival_notice_ai_mawb_01.mrd';
							sheetObj.SetCellValue(i , "file_name",'arrival_notice_ai_mawb_01.mrd');
						}
						sheetObj.SetCellValue(i , "eml_tit_nm","ARRIVAL NOTICE / INVOICE [HAWB No : " + docObjects[0].GetCellValue(i, "bl_no") + ']');
					}*/
					
					var tmpVal = docObjects[0].GetCellValue(i, "bl_no");
					if(formObj.f_air_sea_tp.value == "S"){
						//sheetObj.SetCellValue(i , "file_name", formObj.f_file_name.value);
						//sheetObj.SetCellValue(i , "eml_tit_nm") = "ARRIVAL NOTICE / INVOICE [HBL No : " + docObjects[0].GetCellValue(i, "bl_no") + ']';						
						sheetObj.SetCellValue(i , "eml_tit_nm", mailTitle + " [HBL No : " +tmpVal + "]");
						
						
						var tmp =  mailTitle + "_" +tmpVal;
						tmp = tmp.replace(/\./g, "");
						tmp = tmp.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
						sheetObj.SetCellValue(i , "eml_mrd_nm",  tmp);
						 
						
					}else{
						//sheetObj.SetCellValue(i , "file_name", formObj.f_file_name.value);
						//sheetObj.SetCellValue(i , "eml_tit_nm") = "ARRIVAL NOTICE / INVOICE [HAWB No : " + docObjects[0].GetCellValue(i, "bl_no") + ']';
						sheetObj.SetCellValue(i , "eml_tit_nm", mailTitle + " [HAWB No : " + tmpVal + "]");
						
						var tmp =  mailTitle + "_" +tmpVal;
						tmp = tmp.replace(/\./g, "");
						tmp = tmp.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
						sheetObj.SetCellValue(i , "eml_mrd_nm",  tmp);
						 
					}	
					
					//Email Title
					var usrEmlCon = formObj.h_usrEmlCon.value;
					var eml_ctnt = "";
					eml_ctnt += usrEmlCon;
					eml_ctnt += "\r\n";
					eml_ctnt += usrnm;
					eml_ctnt += "\r\n";
					eml_ctnt += usrEml;
					eml_ctnt += "\r\n";
					eml_ctnt += usrPhn;
					eml_ctnt += "\r\n";
					eml_ctnt += usrFax;
					eml_ctnt += "\r\n";
					sheetObj.SetCellValue(i , "eml_ctnt",eml_ctnt);
					
					/*//Parameter Setting
					var param='/rp '
					param += "["+formObj.f_intg_bl_seq.value + "]";		// [1]
					param += '[' + ofcLoclNm + ']';								// [2]
					param += '[' + ofcCd + ']'									// [3]
					param += '[' + usrEml + ']';								// [4]
					param += "['" + sheetObj.GetCellValue(i , "intg_bl_seq") + "']";								// [5]
					param += '[' + formObj.f_rmk.value + ']';					// [6]
					if(formObj.f_sel_radio[0].checked){
						param += '[' + formObj.f_sel_title.value + ']';			// [7]
					}else{
						param += '[' + formObj.f_txt_title.value + ']';			// [7]
					}
					param += '[' + usrPhn + ']';								// [8]
					param += '[' + usrFax + ']';								// [9]
					if(formObj.f_show_frt.checked){
						param += '[' + 'Y' + ']';								// [10]
					}else{
						param += '[]';											// [10]
					}
					//param += ' /riprnmargin';	
					//alert(param)
					sheetObj.SetCellValue(i , "rd_param",param);*/
					
					var param = '/rp ';
					intgBlSeq = sheetObj.GetCellValue(i , "intg_bl_seq");	
						
					param += '[' + intgBlSeq + ']';									// [1]
					
					if(formObj.f_sel_radio[0].checked){
						param += '[' + formObj.f_sel_title.value + ']';				// [2]
					}else{
						param += '[' + formObj.f_txt_title.value + ']';				// [2]
					}
					
					param += '[' + ofcCd + ']';										// [3]
					param += '[' + usrEml + ']';									// [4]
					param += '[' + usrPhn + ']';									// [5]
					param += '[' + usrFax + ']';									// [6]
					
					if(formObj.f_show_frt.checked){
						param += '[' + 'Y' + ']';									// [7]
					}else{
						param += '[]';												// [7]
					}
					
					// #45965 - [BINEX] Master Arrival Notice의 House Arrival Notice들의 Customer Ref. No. 들이 표시 안되고 있음
					param += '[' + sheetObj.GetCellValue(i, "cust_ref_no") + ']';   // [8] cust_ref_no
					param += '[' + usrnm + ']';					    				// [9]
					param += '[' + formObj.f_rmk.value + ']';					    // [10] Master Only
					param += '[http://' + location.host + ']';						// [11] TODO 삭제되어야 함 > /rv 로 대처
					
					// #47347 - [BINEX] Arrival Notice 프린트 시 아래 담당자 정보가 출력물에 추가되어야 함 (office별 관리)
					param += '[' + formObj.f_cgor_pic_info.value + ']';				// [12]
					
					// #50494 - [BNX] AIR IMPORT HAWB에 FREIGHT OPTION A/N에 표기 안되도록
					if(formObj.f_show_frt_term.checked){
						param += '[' + 'Y' + ']';									// [13]
					}else{
						param += '[]';												// [13]
					}	
					
					param += ' /rv invRptUrl[' +RD_path + 'invoice_01.mrd]';					//[20150330 OJG]  [invRptUrl] : Invoice Report URL 추가
					// TB_SYS_PROP에 'PRNT_LOGIN_USR', 'Y'이면
					// Login한 USERID를 파라미터로 넘긴다
					if (prn_login_usr == "Y"){
						param += ' loginUsrNm['+usrnm+']';					//[loginUsrNm]
						param += ' loginUsrTel['+usrPhn+']';					//[loginUsrTel] 
						param += ' loginUsrFax['+usrFax+']';					//[loginUsrFax]
						param += ' loginUsrEml['+usrEml+']';					//[loginUsrEml] 
					}
					
					sheetObj.SetCellValue(i , "rd_param", param);
				}
				
				// #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴
				/*사용안함 그리드 안 타이틀로 대신 생성 
				var attachFileName = mailTitle.toLowerCase();
				
				for(var i=0; i<attachFileName.length; i++){
					attachFileName = attachFileName.replace(/\./g, "");
					attachFileName = attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
			    }
				 
				formObj.attachFileName.value = attachFileName + formObj.f_file_name.value.replace(".mrd","").replace("arrival_notice","");
				
				//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청
				if (attachFileName != ""){
					formObj.attachFileName.value = attachFileName+"_"+tmpVal;
				}*/
				
				if (formObj.f_air_sea_tp.value == "S") {
					formObj.rpt_biz_tp.value="OIM_P";    // Ocean Import > Master B/L > Master B/L List
				} else if (formObj.f_air_sea_tp.value == "A") {
					formObj.rpt_biz_tp.value="AIM_P";    // Air Import > Master B/L > Master B/L List
				}
				formObj.rpt_biz_sub_tp.value="AN";   // [Arrival Notice]
				formObj.f_cmd.value=COMMAND01;
				if(confirm(getLabel('FMS_COM_CFMSENDEML'))){
					sheetObj.DoAllSave("./RPT_PRN_0150GS.clt", FormQueryString(formObj), true);
				}
			}
		break;
		case 'FAX':														
			if(sheetObj.RowCount()> 0){
				/*var iCheckRow=sheetObj.CheckedRows(0);
				if(iCheckRow == 0){
				 	alert(getLabel('FMS_COM_ALT007'));
					return;
				}*/	
				
				var custCheckRow=sheetObj.CheckedRows(7);
				var brkCheckRow=sheetObj.CheckedRows(9);
				
				if(custCheckRow + brkCheckRow == 0){
					alert(getLabel('FMS_COM_ALT007') + "\n\n CF or BF");
					return;
				}	
				
				var intgBlSeq = "";	
				
				// #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴
				var mailTitle;
				
				if(formObj.f_sel_radio[0].checked){
					mailTitle = formObj.f_sel_title.value;	
				}else{
					mailTitle = formObj.f_txt_title.value;
				}
				
				if(formObj.f_air_sea_tp.value == "S"){
					if (prn_ofc_cd == "CMM"){
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_CMM.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_CMM.mrd';
					} else if (prn_ofc_cd == "GPL") {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_GPL.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_GPL.mrd';
					} else if (prn_ofc_cd == "BNXC") {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_BNXC.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_BNXC.mrd';
					} else if (prn_ofc_cd == "BLS") {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_BLS.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_BLS.mrd';
					} else if (prn_ofc_cd == "WEBT") {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_WEBT.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_WEBT.mrd';
					} else if (prn_ofc_cd == "IGIC") {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01_IGIC.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01_IGIC.mrd';
					} else {
						formObj.f_file_name.value = 'arrival_notice_oi_hbl_us_01.mrd';
						formObj.file_name.value = 'arrival_notice_oi_hbl_us_01.mrd';
					}
					
				}else{
					if (prn_ofc_cd == "CMM"){
						formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_CMM.mrd';
						formObj.file_name.value = 'arrival_notice_ai_hawb_01_CMM.mrd';
					} else if (prn_ofc_cd == "BNXC"){
						formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_BNXC.mrd';
						formObj.file_name.value = 'arrival_notice_ai_hawb_01_BNXC.mrd';
					} else if (prn_ofc_cd == "YM"){
						formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_YM.mrd';
						formObj.file_name.value = 'arrival_notice_ai_hawb_01_YM.mrd';
					} else if (prn_ofc_cd == "IGIC"){
						formObj.f_file_name.value = 'arrival_notice_ai_hawb_01_IGIC.mrd';
						formObj.file_name.value = 'arrival_notice_ai_hawb_01_IGIC.mrd';
					} else {					
						formObj.f_file_name.value = 'arrival_notice_ai_hawb_01.mrd';
						formObj.file_name.value = 'arrival_notice_ai_hawb_01.mrd';
					}
				}
				
				for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
					/*if(sheetObj.GetCellValue(i , "cust_fax_flg") != 1 && sheetObj.GetCellValue(i , "brk_fax_flg") != 1 ){
						//alert("Please Check the Fax Check box ! ");
						alert(getLabel('FMS_COM_ALT007') + "\n\n CF or BF");
						return;
					}*/
					
					/*//RD File Name, Email Title
					if(formObj.f_air_sea_tp.value == "S"){
						//#24613 [GPL] Arrival Notice에다 "Place of Receipt" 추가
						if (prn_ofc_cd == "GPL") {
							formObj.f_file_name.value='arrival_notice_oi_mbl_01_GPL.mrd';
							formObj.file_name.value='arrival_notice_oi_mbl_01_GPL.mrd';
							sheetObj.SetCellValue(i , "file_name",'arrival_notice_oi_mbl_01_GPL.mrd');
						} else if (prn_ofc_cd == "BNXC") {
							formObj.f_file_name.value='arrival_notice_oi_mbl_01_BNXC.mrd';
							formObj.file_name.value='arrival_notice_oi_mbl_01_BNXC.mrd';
							sheetObj.SetCellValue(i , "file_name",'arrival_notice_oi_mbl_01_BNXC.mrd');
						} else {
							formObj.f_file_name.value='arrival_notice_oi_mbl_01.mrd';
							formObj.file_name.value='arrival_notice_oi_mbl_01.mrd';
							sheetObj.SetCellValue(i , "file_name",'arrival_notice_oi_mbl_01.mrd');
						}
						sheetObj.SetCellValue(i , "eml_tit_nm","ARRIVAL NOTICE / INVOICE [HBL No : " + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no") + ']');
					}else{
						if (prn_ofc_cd == "GPL") {
							formObj.f_file_name.value='arrival_notice_ai_mawb_01_GPL..mrd';
							formObj.file_name.value='arrival_notice_ai_mawb_01_GPL..mrd';
							sheetObj.SetCellValue(i , "file_name",'arrival_notice_ai_mawb_01_GPL..mrd');
							sheetObj.SetCellValue(i , "eml_tit_nm","ARRIVAL NOTICE / INVOICE [HAWB No : " + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no") + ']');
						}else if (prn_ofc_cd == "BNXC") {
							formObj.f_file_name.value='arrival_notice_ai_mawb_01_BNXC.mrd';
							formObj.file_name.value='arrival_notice_ai_mawb_01_BNXC.mrd';
							sheetObj.SetCellValue(i , "file_name",'arrival_notice_ai_mawb_01_BNXC.mrd');
							sheetObj.SetCellValue(i , "eml_tit_nm","ARRIVAL NOTICE / INVOICE [HAWB No : " + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no") + ']');
						}else {
							formObj.f_file_name.value='arrival_notice_ai_mawb_01.mrd';
							formObj.file_name.value='arrival_notice_ai_mawb_01.mrd';
							sheetObj.SetCellValue(i , "file_name",'arrival_notice_ai_mawb_01.mrd');
							sheetObj.SetCellValue(i , "eml_tit_nm","ARRIVAL NOTICE / INVOICE [HAWB No : " + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no") + ']');
						}
					}
					//Parameter Setting
					var param='/rp '
					param += "["+formObj.f_intg_bl_seq.value + "]";		// [1]
					param += '[' + ofcLoclNm + ']';								// [2]
					param += '[' + ofcCd + ']'									// [3]
					param += '[' + usrEml + ']';								// [4]
					param += "['" + sheetObj.GetCellValue(i , "intg_bl_seq") + "']";								// [5]
					param += '[' + formObj.f_rmk.value + ']';					// [6]
					if(formObj.f_sel_radio[0].checked){
						param += '[' + formObj.f_sel_title.value + ']';			// [7]
					}else{
						param += '[' + formObj.f_txt_title.value + ']';			// [7]
					}
					param += '[' + usrPhn + ']';								// [8]
					param += '[' + usrFax + ']';								// [9]
					if(formObj.f_show_frt.checked){
						param += '[' + 'Y' + ']';								// [10]
					}else{
						param += '[]';											// [10]
					}
					param += ' /riprnmargin';*/
					
					if(formObj.f_air_sea_tp.value == "S"){
						//sheetObj.SetCellValue(i , "file_name", formObj.f_file_name.value);
						//sheetObj.SetCellValue(i , "eml_tit_nm") = "ARRIVAL NOTICE / INVOICE [HBL No : " + docObjects[0].GetCellValue(i, "bl_no") + ']';
						sheetObj.SetCellValue(i , "eml_tit_nm", mailTitle + " [HBL No : " + docObjects[0].GetCellValue(i, "bl_no") + "]");
						
					}else{
						//sheetObj.SetCellValue(i , "file_name", formObj.f_file_name.value);
						//sheetObj.SetCellValue(i , "eml_tit_nm") = "ARRIVAL NOTICE / INVOICE [HAWB No : " + docObjects[0].GetCellValue(i, "bl_no") + ']';
						sheetObj.SetCellValue(i , "eml_tit_nm", mailTitle + " [HAWB No : " + docObjects[0].GetCellValue(i, "bl_no") + "]");
					}	
					
					//Parameter Setting
					var param = '/rp ';
					intgBlSeq = sheetObj.GetCellValue(i , "intg_bl_seq");	
					
					param += '[' + intgBlSeq + ']';		// [1]
					
					if(formObj.f_sel_radio[0].checked){
						param += '[' + formObj.f_sel_title.value + ']';				// [2]
					}else{
						param += '[' + formObj.f_txt_title.value + ']';				// [2]
					}
					
					param += '[' + ofcCd + ']';										// [3]
					param += '[' + usrEml + ']';									// [4]
					param += '[' + usrPhn + ']';									// [5]
					param += '[' + usrFax + ']';									// [6]
					
					if(formObj.f_show_frt.checked){
						param += '[' + 'Y' + ']';									// [7]
					}else{
						param += '[]';												// [7]
					}
					
					// #45965 - [BINEX] Master Arrival Notice의 House Arrival Notice들의 Customer Ref. No. 들이 표시 안되고 있음
					param += '[' + sheetObj.GetCellValue(i, "cust_ref_no") + ']';   // [8] cust_ref_no
					param += '[' + usrnm + ']';					    				// [9]
					param += '[' + formObj.f_rmk.value + ']';					    // [10] Master Only
					param += '[http://' + location.host + ']';						// [11] TODO 삭제되어야 함 > /rv 로 대처
					
					// #47347 - [BINEX] Arrival Notice 프린트 시 아래 담당자 정보가 출력물에 추가되어야 함 (office별 관리)
					param += '[' + formObj.f_cgor_pic_info.value + ']';				// [12]
					
					// #50494 - [BNX] AIR IMPORT HAWB에 FREIGHT OPTION A/N에 표기 안되도록
					if(formObj.f_show_frt_term.checked){
						param += '[' + 'Y' + ']';									// [13]
					}else{
						param += '[]';												// [13]
					}	
					
					param += ' /rv invRptUrl[' +RD_path + 'invoice_01.mrd]';					//[20150330 OJG]  [invRptUrl] : Invoice Report URL 추가
					// TB_SYS_PROP에 'PRNT_LOGIN_USR', 'Y'이면
					// Login한 USERID를 파라미터로 넘긴다
					if (prn_login_usr == "Y"){
						param += ' loginUsrNm['+usrnm+']';					//[loginUsrNm]
						param += ' loginUsrTel['+usrPhn+']';					//[loginUsrTel] 
						param += ' loginUsrFax['+usrFax+']';					//[loginUsrFax]
						param += ' loginUsrEml['+usrEml+']';					//[loginUsrEml] 
					}
					
					sheetObj.SetCellValue(i , "rd_param",param);
				}
				
				// #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴
				var attachFileName = mailTitle.toLowerCase();
				
				for(var i=0; i<attachFileName.length; i++){
					attachFileName = attachFileName.replace(/\./g, "");
					attachFileName = attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
			    }
				
				formObj.attachFileName.value = attachFileName + formObj.f_file_name.value.replace(".mrd","").replace("arrival_notice","");
				
				if (formObj.f_air_sea_tp.value == "S") {
					formObj.rpt_biz_tp.value="OIM_P";    // Ocean Import > Master B/L > Master B/L List
				} else if (formObj.f_air_sea_tp.value == "A") {
					formObj.rpt_biz_tp.value="AIM_P";    // Air Import > Master B/L > Master B/L List
				}
				formObj.rpt_biz_sub_tp.value="AN";   // [Arrival Notice]
				formObj.f_cmd.value=COMMAND02;
				if(confirm(getLabel('FMS_COM_CFMSENDFAX'))){
					sheetObj.DoAllSave("./RPT_PRN_0150GS.clt", FormQueryString(formObj), true);
				}
			}
		break;
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST;
			sheetObj.DoSearch("RPT_PRN_0150GS.clt", FormQueryString(formObj) );
		break;		
		case "CLOSE":
			window.close(); 
		break;
		}
}
function changeSel(){
	var formObj=document.frm1; 
	if(formObj.f_sel_radio[0].checked){
		if(formObj.f_sel_title.value.indexOf("FREIGHT INVOICE") != -1){
			formObj.f_show_frt.checked=true;
		}else{
			formObj.f_show_frt.checked=false;
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
	
	var formObj=document.frm1;
	
	// #50494 - [BNX] AIR IMPORT HAWB에 FREIGHT OPTION A/N에 표기 안되도록
	if (formObj.f_air_sea_tp.value == "A") {
		var opt_key = "AI_AN_FRT_TERM_DFT";
		ajaxSendPost(setAiAnFrtTermDftReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	}
	
	for(var i=0;i<docObjects.length;i++){
	//khlee-시작 환경 설정 함수 이름 변경
	comConfigSheet(docObjects[i], SYSTEM_FIS);
	initSheet(docObjects[i],i+1);
	//khlee-마지막 환경 설정 함수 추가
	comEndConfigSheet(docObjects[i]);
	}
	
	if (formObj.f_air_sea_tp.value == "S") {
		formObj.f_rpt_biz_tp.value = "OIH";
	}else{
		formObj.f_rpt_biz_tp.value = "AIH";
	}
	
	doWork('SEARCHLIST');
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
	        SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:0 } );

	        var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('RPT_PRN_0150_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ 
	               {Type:"Text",      Hidden:0,  Width:125,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"cust_ref_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cust_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:235,  Align:"Left",    ColMerge:1,   SaveName:"cust_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"brk_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:234,  Align:"Left",    ColMerge:1,   SaveName:"brk_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1 },
	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"cust_fax_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1, TrueValue:"Y" ,FalseValue:"N" },
	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"cust_eml_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1, TrueValue:"Y" ,FalseValue:"N" },
	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"brk_fax_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1, TrueValue:"Y" ,FalseValue:"N" },
	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"brk_eml_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1, TrueValue:"Y" ,FalseValue:"N" },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cust_fax",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cust_eml",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"brk_fax",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"brk_eml",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"cust_pic_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"brk_pic_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },	               
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sndr_eml",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sndr_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"to_eml_ctnt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"cc_eml_ctnt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eml_tit_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eml_ctnt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"rd_param",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eml_mrd_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"eml_addr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 }];
	         
	        InitColumns(cols);

	        SetEditable(1);
	        SetSheetHeight(300);
		}                                                      
		break;
	}
}
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(sheetObj.DataRows == 1){
		sheetObj.SetCellValue(1, "chk",1);
	}
	for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
		if(sheetObj.GetCellValue(i , "cust_eml") == "" ){
			sheetObj.SetCellEditable(i , "cust_eml_flg",0);
		}
		if(sheetObj.GetCellValue(i , "cust_fax") == "" ){
			sheetObj.SetCellEditable(i , "cust_fax_flg",0);
		}
		if(sheetObj.GetCellValue(i , "brk_fax") == "" ){
			sheetObj.SetCellEditable(i , "brk_fax_flg",0);
		}
		if(sheetObj.GetCellValue(i , "brk_eml") == "" ){
			sheetObj.SetCellEditable(i , "brk_eml_flg",0);
		}
	}
} 
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
		if(sheetObj.GetCellValue(i , "cust_eml") == "" ){
			sheetObj.SetCellEditable(i , "cust_eml_flg",0);
		}
		if(sheetObj.GetCellValue(i , "cust_fax") == "" ){
			sheetObj.SetCellEditable(i , "cust_fax_flg",0);
		}
		if(sheetObj.GetCellValue(i , "brk_fax") == "" ){
			sheetObj.SetCellEditable(i , "brk_fax_flg",0);
		}
		if(sheetObj.GetCellValue(i , "brk_eml") == "" ){
			sheetObj.SetCellEditable(i , "brk_eml_flg",0);
		}
		// #266 - [BNX] EMAIL FUNCTION TO: AND CC: EMAIL from MBL List
		sheetObj.SetCellValue(i , "eml_addr", "");
	}
	if(errMsg == ""){
		if(formObj.f_cmd.value == COMMAND01){
			alert(getLabel('FMS_COM_ALT056'));
		}else if(formObj.f_cmd.value == COMMAND02){
			alert(getLabel('FMS_COM_ALT057'));
		}
	}	
}
function getRptMailParameters(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {
			formObj.mailTo.value=doc[1];
		}
	}
}

function setAiAnFrtTermDftReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == "N"){
			formObj.f_show_frt_term.checked = false;
		}
	}
}

function getPdfFileNm(){
	var formObj=document.frm1;
	var pdfFileNm = "";
	var ref_no = formObj.f_ref_no.value;
	
	if (ref_no == "" || ref_no == "undefined" || ref_no == undefined) {
		return "";
	}
	pdfFileNm = "AN_FilingNo_"+ref_no;	
	return pdfFileNm;
}

function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
        case "chk" :
    		for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
    			if(sheetObj.GetCellValue(Row,"bl_no") == sheetObj.GetCellValue(i,"bl_no")){
    				sheetObj.SetCellValue(i, "chk", sheetObj.GetCellValue(Row,"chk"));
    			}
    		}
    }
}

//Jpn RD폴더 셋팅.
function rdSetter(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1] != "") {
			RD_path += doc[1];
		}
	}
}

$(document).ready(function(){
	var cookie_key = "rpt_prn_0150_auto_close";
	console.log("AAA " + getCookie(cookie_key))
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