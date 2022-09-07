//=========================================================
//*@FileName   : RPT_PRN_0020.jsp
//*@FileTitle  : RPT
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 10/06/2014
//*@since      : 10/06/2014
//=========================================================
function loadPage(){
	var formObj=document.frm1;
	var d=new Date();
	formObj.rcvd_dt_tm.value=getTodayStr() + "  " + leadingZeros(d.getHours(),2) + ":" + leadingZeros(d.getMinutes(),2);
	if(ofc_cnt_cd1=="US"){
		document.all.rule1.style.display="block";
		frm1.clause_rule.checked=true;
	}else{
		document.all.rule1.style.display="none";
	}
	formObj.rcvd_pic.value=usrid;
	formObj.agent_text.value += formObj.h_agent_text.value;
	initSetting(1);
}
function initSetting(obj){
	var formObj=document.frm1;
	if(obj=="1"){
		formObj.rcvd_by.className='search_form-disable';
		formObj.rcvd_by.disabled=true;
		formObj.rcvd_dt_tm.className='search_form-disable';
		formObj.rcvd_dt_tm.disabled=true;
		formObj.rcvd_pic.className='search_form-disable';
		formObj.rcvd_pic.disabled=true;
	}else{
		formObj.rcvd_by.className='search_form';
		formObj.rcvd_by.disabled=false;
		formObj.rcvd_dt_tm.className='search_form';
		formObj.rcvd_dt_tm.disabled=false;
		formObj.rcvd_pic.className='search_form';
		formObj.rcvd_pic.disabled=false;
	}
}
function leadingZeros(n, digits){
	var zero='';
	n=n.toString();
	if(n.length < digits){
		for(var i=0 ; i<digits - n.length ; i++){
			zero += '0';
		}
	}
	return zero + n;
}
function doWork(srcName){
    switch(srcName) {
		case 'Print':
			/*
			if(frm1.bl_type[0].checked){
				frm1.cmd_type.value='23';
				frm1.stamp.value=frm1.stamp_type.value;
			}else if(frm1.bl_type[1].checked){
				frm1.cmd_type.value='23';
				frm1.all.value='Y';
				frm1.stamp.value='';
				var val=window.opener.document.frm1.org_bl_qty.value;
				if(val==null || val==0){
					window.opener.document.frm1.org_bl_qty.value=1;
				}else if(val<3){
					window.opener.document.frm1.org_bl_qty.value=parseInt(val) + 1;
				}
			}else{
				frm1.cmd_type.value='22';
				frm1.stamp.value=frm1.stamp_type.value;
			}
			popPOST(frm1, 'RPT_PRN_0010.clt', 'popTest', 1025, 740);
			*/
			/*
			 * Sea Export House B/L
			 * 
			 */
			var formObj=document.frm1;
			if(formObj.oe_hbl_form.value != ""){
				if(formObj.bl_type[0].checked){
					formObj.file_name.value='CO_LOAD_ORG.mrd';
				}else{
					formObj.file_name.value='CO_LOAD_COPY.mrd';
				}
			}else{
				formObj.file_name.value='CO_LOAD_COPY.mrd';
			}
			//alert(formObj.file_name.value);
        	formObj.title.value='Co Load B/L';
			//Parameter Setting
        	var param="['" + formObj.intg_bl_seq.value + "']";	// [1]
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
        	param += '[' + formObj.page_count.value + ']';			// [4]
        	if(formObj.frt_flg[0].checked){
        		param += '[Y]';										// [5]
        	}else if(formObj.frt_flg[1].checked){
        		param += '[N]';										// [5]
        	}
        	if(formObj.show_bl_type[0].checked){
        		param += '[org]';									// [6]
        	}else if(formObj.show_bl_type[1].checked){
        		param += '[nego]';									// [6]
        	}else if(formObj.show_bl_type[2].checked){
        		param += '[dra]';									// [6]
        	}else if(formObj.show_bl_type[3].checked){
        		param += '[copy]';									// [6]
        	}else if(formObj.show_bl_type[4].checked){
        		param += '[telex]';									// [6]
        	}else if(formObj.show_bl_type[5].checked){
        		param += '[none]';									// [6]
        	}
        	if(formObj.title_name[0].checked){
        		param += '[Y]';										// [7]
        		param += '[]';										// [8]
            	param += '[]';										// [9]
            	param += '[]';										// [10]
        	}else if(formObj.title_name[1].checked){
        		param += '[N]';										// [7]
        		param += '[' + formObj.rcvd_by.value + ']';			// [8]
            	param += '[' + formObj.rcvd_dt_tm.value + ']';		// [9]
            	param += '[' + formObj.rcvd_pic.value + ']';		// [10]
        	}
        	param += '[' + formObj.agent_text.value + ']';			// [11]
        	param += '[' + formObj.rider_flg.value + ']';			// [12]
        	/* OEH Print 팝업에서 bl Remark 정보를 조회.jsjang #16904 */
        	param += '[' + formObj.rmk_cd.value + ']';			// [13]
        	param += '[' + formObj.xtra_bl_seq.value + ']';			// [14] xtra_bl_seq CO Load Entry no
        	//alert(formObj.rmk_cd.value);
        	//alert(param);
        	//return;
			formObj.rd_param.value=param;
			formObj.rpt_biz_tp.value="OEH";
			formObj.rpt_biz_sub_tp.value="BL";
			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			if(ofc_cnt_cd1=="JP"){
				ComClosePopup(); 
			}
		break;
		case "CLOSE":
			window.close(); 
    	break;
    }
}
