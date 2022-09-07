function doWork(srcName){
	var formObj=document.frm1;
    switch(srcName) {
		case "PRINT":
		case 'PREVIEW':			
			var frt_ins="N";
			if(formObj.frt_flg[0].checked){
				frt_ins="Y";
			}
			var desc_flg1="Y";
			var desc_flg2="Y";
			var charge_flg1="Y";
			var charge_flg2="Y";
			var desc_flg3="Y";
			var desc_flg4="Y";
			var charge_flg3="Y";
			var charge_flg4="Y";
			if(formObj.desc_flg[0].checked == false){	desc_flg1="N";	}
			if(formObj.desc_flg[1].checked == false){	desc_flg2="N";	}
			if(formObj.charge_flg[0].checked == false){	charge_flg1="N";	}
			if(formObj.charge_flg[1].checked == false){	charge_flg2="N";	}	
			if(formObj.desc_flg[2].checked == false){	desc_flg3="N";	}
			if(formObj.desc_flg[3].checked == false){	desc_flg4="N";	}
			if(formObj.charge_flg[2].checked == false){	charge_flg3="N";	}
			if(formObj.charge_flg[3].checked == false){	charge_flg4="N";	}				

			if(srcName == "PREVIEW") {
				$("#prt_option").val("opt_preview");
			} else if(srcName == "PRINT") {
				$("#prt_option").val("opt_print");
			}

			if($("#chk_auto_close").is(":checked")){
				doWork("CLOSE");
			}

			if(formObj.cmdVal.value == "ADD")
			{
				ajaxSendPost(goPrint, "reqVal", "&goWhere=aj&bcKey=insertBLPrintOptInfo&intg_bl_seq="+formObj.intg_bl_seq.value+"&prn_type="+formObj.prn_type.value
						+"&sci="+formObj.sci.value
						+"&dest_cnt="+formObj.dest_cnt.value
						+"&by_carr="+escape(formObj.by_carr.value)
						+"&frt_flg="+frt_ins
						+"&sign_carr="+escape(formObj.sign_carr.value)
						+"&sign_ship="+escape(formObj.sign_ship.value)
						+"&desc_flg1="+desc_flg1+"&desc_flg2="+desc_flg2
						+"&desc_flg3="+desc_flg3+"&desc_flg4="+desc_flg4
						+"&charge_flg3="+charge_flg3+"&charge_flg4="+charge_flg4
						+"&charge_flg1="+charge_flg1+"&charge_flg2="+charge_flg2, "./GateServlet.gsl");
			}else{
				ajaxSendPost(goPrint, "reqVal", "&goWhere=aj&bcKey=modifyBLPrintOptInfo&intg_bl_seq="+formObj.intg_bl_seq.value
						+"&prn_type="+formObj.prn_type.value
						+"&sci="+formObj.sci.value+"&dest_cnt="+formObj.dest_cnt.value
						+"&by_carr="+escape(formObj.by_carr.value)
						+"&frt_flg="+frt_ins
						+"&sign_carr="+escape(formObj.sign_carr.value)
						+"&sign_ship="+escape(formObj.sign_ship.value)
						+"&desc_flg1="+desc_flg1+"&desc_flg2="+desc_flg2
						+"&desc_flg3="+desc_flg3+"&desc_flg4="+desc_flg4
						+"&charge_flg3="+charge_flg3+"&charge_flg4="+charge_flg4
						+"&charge_flg1="+charge_flg1+"&charge_flg2="+charge_flg2, "./GateServlet.gsl");
			}
		break;
		case "CLOSE":
  			window.close(); 
    	break;
    }
}
//코드표시 Ajax
function goPrint(reqVal){
	var formObj=document.frm1;
//	try{
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
			//if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {
				if(formObj.biz_clss.value=="House"){
					/*
					if(ofc_cnt_cd1=="JP"){
						if(formObj.bl_type[0].checked){
							formObj.file_name.value='HBL_AIR_ORG_JP.mrd';
						}else if(formObj.bl_type[1].checked){
							formObj.file_name.value = 'HBL_AIR_COPY_JP.mrd';
						}
					}else{
						
						if(formObj.ae_hbl_form.value != ""){
							 HBL customer form 
							if(formObj.bl_type[0].checked){
								formObj.file_name.value = 'HBL_AIR_' + formObj.ae_hbl_form.value + '_ORG.mrd';
							}else{
								formObj.file_name.value = 'HBL_AIR_' + formObj.ae_hbl_form.value + '_COPY.mrd';
							}
						}else{
							 HBL normal form 
							if(formObj.bl_type[0].checked){
								formObj.file_name.value = 'HBL_AIR_ORG.mrd';
							}else if(formObj.bl_type[1].checked){
								formObj.file_name.value = 'HBL_AIR_COPY.mrd';
							}
						}				
						
						
					}*/
					// #829 [SI] Report Mgmt
					if(formObj.bl_type[0].checked){
						formObj.file_name.value = 'HBL_AIR_ORG.mrd';
					}else if(formObj.bl_type[1].checked){
						formObj.file_name.value = 'HBL_AIR_COPY.mrd';
					}
					
					formObj.title.value = 'Air Export House B/L';
				}else{
				
					/*
					if(formObj.ae_hbl_form.value != ""){
						 HBL customer form 
						if(formObj.bl_type[0].checked){
							formObj.file_name.value = 'MBL_AIR_' + formObj.ae_hbl_form.value + '_ORG.mrd';
						}else{
							formObj.file_name.value = 'MBL_AIR_' + formObj.ae_hbl_form.value + '_COPY.mrd';
						}
					}else{
						HBL normal form
						if(formObj.bl_type[0].checked){
							formObj.file_name.value = 'MBL_AIR_ORG.mrd';
						}else if(formObj.bl_type[1].checked){
							formObj.file_name.value = 'MBL_AIR_COPY.mrd';
						}
					}
					*/
					// #829 [SI] Report Mgmt
					if(formObj.bl_type[0].checked){
						formObj.file_name.value = 'MBL_AIR_ORG.mrd';
					}else if(formObj.bl_type[1].checked){
						formObj.file_name.value = 'MBL_AIR_COPY.mrd';
					}

					formObj.title.value = 'Air Export Master B/L';
				}
				
	        	
				//Parameter Setting
	        	var param  = "['" + formObj.intg_bl_seq.value + "']";	// [1]
	        	if(formObj.clause_rule.checked){
	        		param += '[Y]';										// [2]
	        	}else{
	        		param += '[N]';										// [2]
	        	}
	        	if(formObj.bl_type[0].checked){
	        		param += '[org]';									// [3]
	        	}else if(formObj.bl_type[1].checked){
	        		param += '[copy]';									// [3]
	        	}
	        	if(formObj.frt_flg[0].checked){
	        		param += '[Y]';										// [4]
	        	}else if(formObj.frt_flg[1].checked){
	        		param += '[N]';										// [4]
	        	}
	        	if(formObj.charge_flg[0].checked){						//shipper
	        		param += '[Y]';										// [5]
	        	}else{
	        		param += '[N]';										// [5]
	        	}
	        	
	        	/* #24114, [BINEX]AWB PRINT, jsjang 2013.12.5  국가코드 */
	        	//if(formObj.bl_for[0].checked){
	        	//	param += '[SHIP]';									// [6]
	        	//}else if(formObj.bl_for[1].checked){
	        	//	param += '[CNEE]';									// [6]
	        	//}else if(formObj.bl_for[2].checked){
	        		param += '[ALL]';									// [6]
	        	//}
	        	param += '[]';											// [7]
	        	param += '[' + usrid + ']';								// [8]
	        	param += '[' + formObj.dest_cnt.value + ']';			// [9]
	        	param += '[' + formObj.by_carr.value + ']';				// [10]
	        	param += '[' + formObj.sign_ship.value + ']';			// [11]
	        	param += '[' + formObj.sign_carr.value + ']';			// [12]
	        	if(formObj.show_org.checked){
	        		param += '[Y]';										// [13]
	        	}else{
	        		param += '[N]';										// [13]
	        	}
	        	param += '[' + formObj.sci.value + ']';					// [14]
	        	if(formObj.desc_flg[0].checked){						//shipper
	        		param += '[Y]';										// [15]
	        	}else{
	        		param += '[N]';										// [15]
	        	}
	        	if(formObj.desc_flg[2].checked){						//consignee
	        		param += '[Y]';										// [16]
	        	}else{
	        		param += '[N]';										// [16]
	        	}
	        	if(formObj.charge_flg[2].checked){						//consignee
	        		param += '[Y]';										// [17]
	        	}else{
	        		param += '[N]';										// [17]
	        	}
	        	/* #24114, [BINEX]AWB PRINT, jsjang 2013.12.5  국가코드 */
	        	param += '[' + formObj.cnt_cd.value + ']';				// [18]

	        	//if(formObj.cnt_cd.value == 'CA')
	        	//{
	        	if(formObj.bl_for_s.checked){
	        		param += '[SHIP]';							// [19]
	        	}else{
	        		param += '[]';								// [19]
	        	}
	        	if(formObj.bl_for_i.checked){
	        		param += '[ISUE]';							// [20]
	        	}else{
	        		param += '[]';								// [20]
	        	}
	        	if(formObj.bl_for_c.checked){
	        		param += '[CNEE]';							// [21]
	        	}else{
	        		param += '[]';								// [21]
	        	}
	        	if(formObj.bl_for_d.checked){
	        		param += '[DELI]';							// [22]
	        	}else{
	        		param += '[]';								// [22]
	        	}
	        	if(!formObj.bl_for_s.checked && !formObj.bl_for_i.checked && !formObj.bl_for_c.checked && !formObj.bl_for_d.checked){
	        		alert(getLabel('FMS_COM_ALT061'));
	        		return;
	        	}
	        	//}
	        	/*
	        	else{
	        		if(formObj.bl_for[0].checked){
		        		param += '[SHIP]';								// [19]
		        		param += '[]';									// [20]
		        		param += '[]';									// [21]
		        		param += '[]';									// [22]
		        	}else if(formObj.bl_for[1].checked){
		        		param += '[]';									// [19]
		        		param += '[]';									// [20]
		        		param += '[CNEE]';								// [21]
		        		param += '[]';									// [22]
		        	}else if(formObj.bl_for[2].checked){
		        		param += '[SHIP]';								// [19]
		        		param += '[]';									// [20]
		        		param += '[CNEE]';								// [21]
		        		param += '[]';									// [22]
		        	}
	        	}	        	
	        	*/
	        	if(formObj.desc_flg[1].checked){						//issuing carrier
	        		param += '[Y]';										// [23]
	        	}else{
	        		param += '[N]';										// [23]
	        	}
	        	if(formObj.desc_flg[3].checked){						//delivery receipt
	        		param += '[Y]';										// [24]
	        	}else{
	        		param += '[N]';										// [24]
	        	}
	        	if(formObj.charge_flg[1].checked){						//issuing carrier
	        		param += '[Y]';										// [25]
	        	}else{
	        		param += '[N]';										// [25]
	        	}	 	        	
	        	if(formObj.charge_flg[3].checked){						//delivery receipt
	        		param += '[Y]';										// [26]
	        	}else{
	        		param += '[N]';										// [26]
	        	}	        	
	        	
	        	
	        	//52295 [Arkman] M & H Airway Bill Signature of Issuing Carrier or Agent 
	        	param += '['+formObj.sign_agent.value+']';										// [27]
	        	if(formObj.biz_clss.value=="House"){
	        	// #473 [IMPEX] AIR EXPORT HAWB DRAFT VERSION OPTION
	        		param += '['+formObj.show_bl_type.value+']';	//28
	        	}else{
	        		param += '[]';									//28	
	        	}
	        	//#6521 [JH Logistics] Flight type 추가요청
	        	if(formObj.biz_clss.value=="Master"){
		        	if(formObj.flight_type[0].checked){
		        		param += '[C]';								// [29]
		        	}else{
		        		param += '[P]';								// [29]
		        	}
	        	}
	        	if(formObj.show_rider.checked){
	        		param += ' /rv showRider[Y]';
	        	}else{
	        		param += ' /rv showRider[N]';
	        	}
	        	if(formObj.bl_type[0].checked){
	        		param += ' /rpaperlength [3049]';
				}else if(formObj.bl_type[1].checked){
					param += ' /rpaperlength [2794]';	// 11 inch = 279.4 mm
				}
	        	
	        	//alert(param);
				formObj.rd_param.value=param;
				if (formObj.biz_clss.value=="House") {
					formObj.rpt_biz_tp.value="AEH";
				} else {
					formObj.rpt_biz_tp.value="AEM";
				}
				formObj.rpt_biz_sub_tp.value="BL";
				
				//#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report 
				var mrd_name = "";
				if(formObj.biz_clss.value=="House"){
					mrd_name = "HBL_AIR_";
				}else{
					mrd_name = "MBL_AIR_";
				}
				
				formObj.rpt_file_name_title.value = "";
				//if (formObj.ae_hbl_form.value == "IGIC"){
					if (formObj.house_bl_no.value != ""){
						
						var v_bl_no = formObj.house_bl_no.value;
						v_bl_no = v_bl_no.replace(/\./g, "");
						v_bl_no = v_bl_no.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");					 
						formObj.rpt_file_name_title.value = mrd_name+v_bl_no;
						
					} else {
						formObj.rpt_file_name_title.value = "";
					}
				//} 
				//alert(param);
				popPOST(formObj, "RPT_RD_0030.clt", "popTest", 1025, 740);
				formObj.cmdVal.value="MODIFY";
			//}
		}else{
			//Error Errupt!	
			alert(getLabel('FMS_COM_ERR001') + "\n\n: PRT_PRN_0080.250");		
		}
//	}catch(err){
//		//alert('Error Msg.:'+err.message);
//		alert(getLabel('FMS_COM_ERR001') + err.message + "\n\n: PRT_PRN_0080.253");
//	}
}
function loadPage(){
	
	var opt_key = "MAWB_ORG_RIDER_DFLT";
	ajaxSendPost(setMAWBOrgRiderDfltReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key = "HAWB_ORG_RIDER_DFLT";
	ajaxSendPost(setHAWBOrgRiderDfltReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key = "AWB_PRN_POP_SIGN";
	ajaxSendPost(setAWBPrnPopSignReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var formObj = document.frm1;
	// 미주 지점을 제외하고 show rule clause 를 보이지 않도록 설정한다.
	if(ofc_cnt_cd1=="US"){
		document.all.rule1.style.display = "block";
		
		//26240 ref Office가 Canada인 경우 uncheck
		if(formObj.cnt_cd.value != 'CA') { 
			formObj.clause_rule.checked = true;
		} else {
			formObj.clause_rule.checked = false;
		}
	}else{
		document.all.rule1.style.display = "none";
	}
	
	var refOfcCd = frm1.refOfcCd.value;
	//ref_ofc_cd가 Canada일경우 
	if (refOfcCd == "TOR"){
		formObj.clause_rule.checked = false;
		formObj.dest_cnt.value = "";
	}
	
	//alert(formObj.cmdVal.value);
	/* #24114, [BINEX]AWB PRINT, jsjang 2013.12.5 */
	//if(formObj.cnt_cd.value == "CA"){
	//	tblForNonCA.style.display    	= 'none';
		tblForCA.style.display='block';
	//}else{
	//	tblForNonCA.style.display    	= 'block';
	//	tblForCA.style.display    		= 'none';
	//}
	

		
		
	if(formObj.cmdVal.value == "ADD")
	{
		if(formObj.biz_clss.value=="Master"){
			if(ofc_cnt_cd1=="JP"){
				formObj.sign_ship.value='';
			}
			formObj.frt_flg[1].checked=true;
//			formObj.desc_flg[0].checked = true;
//			formObj.desc_flg[1].checked = true;
//			formObj.charge_flg[0].checked = true;
//			formObj.charge_flg[1].checked = true;
			/* #23225, [BINEX] AIR EXPORT > HOUSE AWB: B/L PRINT "DISPLAY DESCRIPTION" DEFAULT SETTINGS, jsjang 2013.11.18 */
			formObj.desc_flg[0].checked=true;
			//formObj.desc_flg[1].checked = true;
			formObj.charge_flg[0].checked=true;
			//formObj.charge_flg[1].checked = true;		
			formObj.desc_flg[2].checked=true;
			//formObj.desc_flg[3].checked = true;
			formObj.charge_flg[2].checked=true;
			//formObj.charge_flg[3].checked = true;				
		}
		if(formObj.biz_clss.value=="House"){
			if(ofc_cnt_cd1=="JP"){
				formObj.sign_ship.value='';
				// 2012.04.05 적용
				/* #24114, [BINEX]AWB PRINT, jsjang 2013.12.5  국가코드 */
				//formObj.bl_for[1].checked = true;
			}else{
//				formObj.desc_flg[0].checked = true;
//				formObj.desc_flg[1].checked = true;
				/* #23225, [BINEX] AIR EXPORT > HOUSE AWB: B/L PRINT "DISPLAY DESCRIPTION" DEFAULT SETTINGS, jsjang 2013.11.18 */
				//formObj.desc_flg[0].checked = false;
				//formObj.desc_flg[1].checked = false;
				formObj.desc_flg[0].checked=false;
				formObj.desc_flg[1].checked=false;
				formObj.charge_flg[0].checked=false;
				formObj.charge_flg[1].checked=false;	
				formObj.desc_flg[2].checked=false;
				formObj.desc_flg[3].checked=false;
				formObj.charge_flg[2].checked=false;
				formObj.charge_flg[3].checked=false;					
			}
			formObj.frt_flg[0].checked=true;
		}
	}else{
		if(formObj.desc_flg1.value=="Y"){
			formObj.desc_flg[0].checked=true;
			flgChange(formObj.desc_flg[0]);
		}else{
			formObj.desc_flg[0].checked=false;
		}
		if(formObj.desc_flg2.value=="Y"){
			formObj.desc_flg[1].checked=true;
			flgChange(formObj.desc_flg[1]);
		}else{
			formObj.desc_flg[1].checked=false;
		}
		if(formObj.desc_flg3.value=="Y"){
			formObj.desc_flg[2].checked=true;
			flgChange(formObj.desc_flg[2]);
		}else{
			formObj.desc_flg[2].checked=false;
		}
		if(formObj.desc_flg4.value=="Y"){
			formObj.desc_flg[3].checked=true;
			flgChange(formObj.desc_flg[3]);
		}else{
			formObj.desc_flg[3].checked=false;
		}		
		if(formObj.charge_flg1.value=="Y"){
			formObj.charge_flg[0].checked=true;
			flgChange(formObj.charge_flg[0]);
		}else{
			formObj.charge_flg[0].checked=false;
		}
		if(formObj.charge_flg2.value=="Y"){
			formObj.charge_flg[1].checked=true;
			flgChange(formObj.charge_flg[1]);
		}else{
			formObj.charge_flg[1].checked=false;
		}
		if(formObj.charge_flg3.value=="Y"){
			formObj.charge_flg[2].checked=true;
			flgChange(formObj.charge_flg[2]);
		}else{
			formObj.charge_flg[2].checked=false;
		}
		if(formObj.charge_flg4.value=="Y"){
			formObj.charge_flg[3].checked=true;
			flgChange(formObj.charge_flg[3]);
		}else{
			formObj.charge_flg[3].checked=false;
		}		
	}
	
	
	// 기본값 설정  Air	
	// CHI 지점의 요청 긴급 반영 04/17 OYH
	// Master = FreightArrange의 Default No 
	// Houst  = FreightArrange의 Default YES
	// Master = Display Description,Display Charge에 Consignee 에 체크 되어야 함
	if(formObj.biz_clss.value=="House"){
		formObj.frt_flg[0].checked = true;
	} else {
		formObj.frt_flg[1].checked = true;
		formObj.desc_flg[2].checked = true;
		formObj.charge_flg[2].checked = true;
	}
	
	// unescape - 특수문자 처리
	formObj.by_carr.value = unescape(formObj.encode_by_carr.value);
	formObj.sign_carr.value = unescape(formObj.encode_sign_carr.value);
	formObj.sign_ship.value = unescape(formObj.encode_sign_ship.value);	
}

function chkBlType(){
	var formObj = document.frm1;
	if(formObj.bl_type[0].checked){
		
		if(formObj.biz_clss.value=="House"){
			if(hawb_org_rider_dflt == "Y"){
				formObj.show_rider.checked = true;
			}else{
				formObj.show_rider.checked = false;
			}
		}else{
			if(mawb_org_rider_dflt == "Y"){
				formObj.show_rider.checked = true;
			}else{
				formObj.show_rider.checked = false;
			}
		}
		formObj.show_rider.disabled = false;
		
	}else if(formObj.bl_type[1].checked){
		formObj.show_rider.checked = false;
		formObj.show_rider.disabled = true;
	}
}

var mawb_org_rider_dflt;

function setMAWBOrgRiderDfltReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		mawb_org_rider_dflt=doc[1];
	} else {
		mawb_org_rider_dflt="";
	}
}

var hawb_org_rider_dflt;

function setHAWBOrgRiderDfltReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		hawb_org_rider_dflt=doc[1];
	} else {
		hawb_org_rider_dflt="";
	}
}


var awb_prn_pop_sign;
function setAWBPrnPopSignReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		awb_prn_pop_sign=doc[1];
	} else {
		awb_prn_pop_sign="";
	} 
	if (awb_prn_pop_sign == "Y"){ 
		document.getElementById("awb_prn_pop_sign").style.display="inline";
	}else{ 
		document.getElementById("awb_prn_pop_sign").style.display="none";
	}
}

$(document).ready(function(){
	var cookie_key = "rpt_prn_0080_auto_close";
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

