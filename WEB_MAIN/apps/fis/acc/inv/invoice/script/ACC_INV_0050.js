function doWork(srcName){
	var formObj=document.form;
    switch(srcName) {
		case 'Print':
			if(formObj.f_oth_seq.value != ""){
				if(formObj.f_print_type.value == "A/R"){
					/*if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA" || formObj.f_bl_cnt_cd.value == "DE"){
						formObj.file_name.value='invoice_06.mrd';
						formObj.title.value='Local Invoice';
		        	}else if(formObj.f_bl_cnt_cd.value == "IT"){
						formObj.file_name.value='invoice_09.mrd';
						formObj.title.value='Local Invoice';
		        	}else if(formObj.f_bl_cnt_cd.value == "JP"){
						formObj.file_name.value='invoice_08_jp.mrd';
						formObj.title.value='Local Invoice';
		        	}else{
		        		if(formObj.f_ref_ofc_cd.value == "SEL"){
	            			formObj.file_name.value='invoice_08_kr.mrd';
	            		}else{
	            			formObj.file_name.value='invoice_08.mrd';
	            		}
		        	}*/
					formObj.file_name.value='invoice_06.mrd';
					formObj.title.value='Local Invoice';
				}else if(formObj.f_print_type.value == "DB/CR"){
					/*if(formObj.f_bl_cnt_cd.value == "IT"){
						formObj.file_name.value='invoice_10.mrd';
					}else if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA" || formObj.f_bl_cnt_cd.value == "DE"){
	        			formObj.file_name.value='invoice_07_us.mrd';
					}else{
						formObj.file_name.value='invoice_07.mrd';
					}*/
					formObj.file_name.value='invoice_07_us.mrd';
					formObj.title.value='Debit/Credit Note';
				}else if(formObj.f_print_type.value == "A/P"){
					/*
		       		if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA"){
		       			formObj.file_name.value='invoice_11_1.mrd';
		       		}else{
		       			formObj.file_name.value='invoice_12_1.mrd';
		       		}
		       		formObj.title.value='Account Payable';
		      		*/
					formObj.file_name.value='invoice_13.mrd';
					formObj.title.value='PAYMENT REQUEST';
				}
			}else{
				if(formObj.f_print_type.value == "A/R"){
					/*if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA" || formObj.f_bl_cnt_cd.value == "DE"){
	        			formObj.file_name.value='invoice_01.mrd';
						formObj.title.value='Local Invoice';
		        	}else if(formObj.f_bl_cnt_cd.value == "IT"){
						formObj.file_name.value='invoice_04.mrd';
						formObj.title.value='Local Invoice';
		        	}else if(formObj.f_bl_cnt_cd.value == "JP"){
						formObj.file_name.value='invoice_03_jp.mrd';
						formObj.title.value='Local Invoice';
		        	}else{
		        		if(formObj.f_ref_ofc_cd.value == "SEL"){
	            			formObj.file_name.value='invoice_03_kr.mrd';
	            		}else{
	            			formObj.file_name.value='invoice_03.mrd';
	            		}
						formObj.title.value='Local Invoice';
		        	}*/
					formObj.file_name.value='invoice_01.mrd';
					formObj.title.value='Local Invoice';
				}else if(formObj.f_print_type.value == "DB/CR"){
					/*if(formObj.f_bl_cnt_cd.value == "IT"){
						formObj.file_name.value='invoice_05.mrd';
					}else if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA" || formObj.f_bl_cnt_cd.value == "DE"){
	        			formObj.file_name.value='invoice_02_us.mrd';
					}else{
						formObj.file_name.value='invoice_02.mrd';
					}*/
					formObj.file_name.value='invoice_02_us.mrd';
					formObj.title.value='Debit/Credit Note';
				}else if(formObj.f_print_type.value == "A/P"){
					/*
					if(formObj.f_bl_cnt_cd.value == "US" || formObj.f_bl_cnt_cd.value == "CA"){
		       			formObj.file_name.value='invoice_11.mrd';
		       		}else{
		       			formObj.file_name.value='invoice_12.mrd';
		       		}
					formObj.title.value='Account Payable';
					*/
					formObj.file_name.value='invoice_13.mrd';
					formObj.title.value='PAYMENT REQUEST';
				}
			}
			// 날짜변환
			var tmp_start=formObj.f_strdt.value.replaceAll("-","");
			var tmp_end=formObj.f_enddt.value.replaceAll("-","");
			var start_dt=tmp_start.substring(4,8)+tmp_start.substring(0,2)+tmp_start.substring(2,4);
			var end_dt=tmp_end.substring(4,8)+tmp_end.substring(0,2)+tmp_end.substring(2,4);
			if(formObj.f_print_type.value == "A/P"){
				//Parameter Setting
	      		var param="[" + "'" + formObj.f_inv_seq.value + "'" + ']';	// [1]
				param += '[' + formObj.f_trdp_cd.value + ']';					// Vendor [2]
				param += '[' + formObj.f_ref_ofc_cd.value + ']';				// REF_OFC_CD [3]
				param += '[' + formObj.f_bl_cnt_cd.value + ']';					// CNT_CD  [4]
				param += '[' + formObj.f_usr_nm.value + ']';					// USER_NM [5]
				param += '[' + formObj.f_email.value + ']';						// USER EMAIL [6]
				param += '[' + formObj.f_usrPhn.value + ']';					// 7
				param += '[' + formObj.f_usrFax.value + ']';					// 8
				param += '[' + formObj.f_usr_nm.value + ']';						// 9
			}else{
				var param='[' + formObj.f_email.value + ']';				// USER EMAIL';	[1]
				if(formObj.prn_radio[0].checked){
					param += "[" + "'" + formObj.f_inv_seq.value + "'" + ']';			// [2]
					param += '[]';											// [3]
					param += '[]';											// [4]
					param += '[]';											// [5]
					param += '[]';											// [6]	
				}else{
					param += '[]';											// [2]
					param += '[' + start_dt + ']';							// [3]
					param += '[' + end_dt + ']';							// [4] 
					if(formObj.date_radio[0].checked){
						formObj.f_search_type.value="POST";
					}else{
						formObj.f_search_type.value="INVOICE";
					}
					param += '[' + formObj.f_search_type.value + ']';		// POST DATE OR INVOICE DATE [5]
					if(formObj.sort_radio[0].checked){
						formObj.f_order_type.value="DATE";
					}else{
						formObj.f_order_type.value="INVNO";
					}
					param += '[' + formObj.f_order_type.value + ']';		// ORDER BY(DATE OR INV_NO)	[6]
				}
				if(formObj.f_print_type.value == "DB/CR"){
					//param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';		// CURR BRANCH[7]
					param += '[' + formObj.f_trdp_cd.value + ']';				// TRDP_CD [7]
					param += '[' + formObj.f_ref_ofc_cd.value + ']';			// OFC_CD  [8]
				}else if(formObj.f_print_type.value == "A/R"){
					//param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';		// CURR BRANCH[7]
					param += '[' + formObj.f_trdp_cd.value + ']';				// TRDP_CD [7]
					param += '[' + formObj.f_ref_ofc_cd.value + ']';			// OFC_CD  [8]
					param += '[' + formObj.f_bl_cnt_cd.value + ']';				// CNT_CD  [9]
					param += '[' + formObj.f_usr_nm.value + ']';				// USER_NM [10]
				}
				param += '[' + formObj.f_usrPhn.value + ']';				// 9,  11
				param += '[' + formObj.f_usrFax.value + ']';				// 10, 12
				param += '[' + formObj.f_usrId.value + ']';					// 11, 13
				param += '[' + formObj.main_trdp.value + ']';				// 12, 14
				param += '[' + formObj.f_ofc_loc_nm.value + ']';		//13  cr_db
				if(formObj.f_print_type.value == "DB/CR"){
					param += '[]';
					param += '[]';
				}				
			}
			formObj.rd_param.value=param;
			popPOST(form, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
		case "CLOSE":
	    	window.close();
    	break;
    }
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.f_strdt, formObj.f_enddt, 'MM-dd-yyyy');
	    break;
    }
}
function loadPage(){
	var formObj=document.form;
	if(formObj.f_inv_no.value != ""){
		formObj.prn_radio[0].checked=true;
		formObj.prn_radio[1].checked=false;
	}else{
		formObj.prn_radio[0].checked=false;
		formObj.prn_radio[1].checked=true;
	}
	//오늘일자구하기
	var now=new Date(); 				
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 			
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	var fromDate=month + "-" + "01" + "-" + year;
	var today=month + "-" + date + "-" + year;
	formObj.f_strdt.value=today;
	formObj.f_enddt.value=today;
	formObj.rpt_biz_tp.value=opener.document.frm1.rpt_biz_tp.value;
	formObj.rpt_biz_sub_tp.value= parent.document.frm1.rpt_biz_sub_tp.value;
//	if(formObj.f_cnt_cd.value=="IT" && formObj.f_print_type.value=="A/R"){
//		formObj.temp_radio[1].checked = true;
//	}else{
//		formObj.temp_radio[0].checked = true;
//	}
//	chkTrdp();
}
//function chkTrdp(){
//	formObj = document.form;
//	
//	var temp_addr = "";
//	if(formObj.temp_radio[0].checked){
//		
//		formObj.main_trdp.value = "";
//	}else{
//		if(formObj.f_cnt_cd.value=="US" || formObj.f_bl_cnt_cd.value == "CA"){
//			formObj.main_trdp.value = "Allstate Int’l Freight Company";
//		}else if(formObj.f_cnt_cd.value=="DE"){
//			formObj.main_trdp.value = "Atlantic Integrated Freight GmbH";
//		}else if(formObj.f_cnt_cd.value=="IT"){
//			formObj.main_trdp.value = "Atlantic Integrated Freight S.R.L.";
//		}else if(formObj.f_cnt_cd.value=="FR"){
//			formObj.main_trdp.value = "Atlantic Integrated Freight SARL";
//		}else{
//			formObj.main_trdp.value = "";
//		}
//	}
//}
