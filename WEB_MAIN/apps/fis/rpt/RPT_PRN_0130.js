function doWork(srcName){
	var formObj=document.frm1;
    switch(srcName) {
	    case 'Print':
		case 'PREVIEW':
	    	var trdpChk=document.getElementsByName("s_trdp_chk");
			var trdpCd=document.getElementsByName("s_trdp_cd");
			var trdpCds="";
	    	for(var i=0 ; i < formObj.f_rpt_type_radio.length ; i++){
	    		if(formObj.f_rpt_type_radio[i].checked == true){
					formObj.f_rpt_type.value=formObj.f_rpt_type_radio[i].value;
					break;
				}
	    	}
	    	var rtpType=formObj.f_rpt_type.value;
	    	if((rtpType == "4" || rtpType == "5" || rtpType == "7")){
	    		if(trdpChk == undefined){
	    			//Please select Sub Agent.
	    			alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_SAGT'));
	    			return;
	    		}else{
	    			for(var i=0 ; i < trdpChk.length ; i++){
	    				if(trdpChk[i].checked == true){
	    					trdpCds += ",'" + trdpCd[i].value + "'";
	    				}
	    			}
	    			trdpCds=trdpCds.substring(1);
	    			if(trdpCds == ""){
		    			//Please select Sub Agent.
		    			alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_SAGT'));
	    				return;
	    			}
	    		}
	    	}
			//formObj.title.value="Cargo Manifest";
			switch(formObj.f_rpt_type.value){
				case "1" : 
					formObj.file_name.value="cargo_manifest_oe_mbl_01.mrd";//Master Agent(Actual Shipper)
					formObj.rpt_tp.value="MA";
					formObj.rpt_trdp_cd.value="";
				break;
				case "2" : 
					formObj.file_name.value="cargo_manifest_oe_mbl_02.mrd";//Master Agent(Co-Load)
					formObj.rpt_tp.value="MA";
					formObj.rpt_trdp_cd.value="";
				break;
				case "3" : 
					formObj.file_name.value="cargo_manifest_oe_mbl_03.mrd";//Load Plan
					formObj.rpt_trdp_cd.value="";
					formObj.rpt_trdp_cd.value="";
				break;
				case "4" : 
					formObj.file_name.value="cargo_manifest_oe_mbl_04.mrd";//House Agent
					formObj.rpt_tp.value="";
					formObj.rpt_trdp_cd.value=trdpCds.substring(1, trdpCds.length-1);
				break;
				case "5" : 
					formObj.file_name.value="cargo_manifest_oe_mbl_05.mrd";//Carrier - Sub
					formObj.rpt_tp.value="";
					formObj.rpt_trdp_cd.value=trdpCds.substring(1, trdpCds.length-1);
				break;
				case "6" : 
					formObj.file_name.value="cargo_manifest_oe_mbl_06.mrd";//Carrier
					formObj.rpt_tp.value="CR";
					formObj.rpt_trdp_cd.value="";
				break;
				case "7" : 
					formObj.file_name.value="cargo_manifest_oe_mbl_07.mrd";//Carrier (House Agent)
					formObj.rpt_tp.value="CR";
					formObj.rpt_trdp_cd.value="";
				break;
				case "8" : 
					formObj.file_name.value="cargo_manifest_oe_mbl_08.mrd";//Carrier - New
					formObj.rpt_tp.value="CR";
					formObj.rpt_trdp_cd.value="";
				break;
			}
			//Parameter Setting
			var param='[' + formObj.intg_bl_seq.value + ']';
			param += '[' + formObj.f_ofc_locl_nm.value + ']';
			param += '[' + formObj.f_ofc_cd.value + ']';
			param += '[' + trdpCds + ']';
			param += '[' + formObj.f_remark.value + ']';	//Master Agent(Acctual Shipper와 Co-Load)를 선택하였을시 Remark 추가(1,2)
			
			if(formObj.f_pck_rpt_opt[0].checked){ // N : By B/L, Y : By Container
        		param += '[N]'; // [6]
        	}else{
        		param += '[Y]'; // [6]
        	}
			param += '[' + formObj.f_role_cd.value + ']'; // [7] Role Code
			
			formObj.rd_param.value=param;
			formObj.rpt_biz_tp.value="OEM";
			formObj.rpt_biz_sub_tp.value="MF";
			
			//#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report 
			if (formObj.f_bl_no.value != ""){
				
				var v_bl_no = formObj.f_bl_no.value ;
				v_bl_no = v_bl_no.replace(/\./g, "");
				v_bl_no = v_bl_no.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
				formObj.rpt_file_name_title.value = "Cargo_Manifest_oe_"+v_bl_no;  
				formObj.title.value="Cargo Manifest [MB/L No. : "+v_bl_no+"]";
			} else {
				formObj.rpt_file_name_title.value = "";
				formObj.title.value="Cargo Manifest";
			}			
			
			if(srcName == "PREVIEW") {
				$("#prt_option").val("opt_preview");
			} else if(srcName == "Print") {
				$("#prt_option").val("opt_print");
			}

			if($("#chk_auto_close").is(":checked")){
				doWork("CLOSE");
			}
			popPOST(formObj, "RPT_RD_0010.clt", "popTest", 1025, 740);
		break;
		case "CLOSE":
	    	window.close();
    	break;
		case "HOUSE_AGENT_ALL":
			var trdpChecks=document.getElementsByName("s_trdp_chk");
			for(var i=0 ; i < trdpChecks.length ; i++){
				trdpChecks[i].checked=true;
			}
		break;
		case "HOUSE_AGENT_CLEAR":
			var trdpChecks=document.getElementsByName("s_trdp_chk");
			for(var i=0 ; i < trdpChecks.length ; i++){
				trdpChecks[i].checked=false;
			}
		break;
    }
}
function loadPage(){
	var formObj=document.frm1;
	var trdpChk=document.getElementsByName("s_trdp_chk");
	var trdpCd=document.getElementsByName("s_trdp_cd");
	if(formObj.f_agt_cd.value != "" && trdpChk != undefined){
		for(var i=0 ; i < trdpChk.length ; i++){
			if(trdpCd[i].value == formObj.f_agt_cd.value){
				trdpChk[i].checked=true;
			}
		}
	}
}
function changeRptType(tpVal){
	var formObj=document.frm1;
	if(tpVal == "1" || tpVal == "2"){
		formObj.f_remark.className="search_form";
		formObj.f_remark.readOnly=false;
	}else{
		formObj.f_remark.className="search_form-disable";
		formObj.f_remark.readOnly=true;
	}
}

$(document).ready(function(){
	var cookie_key = "rpt_prn_0130_auto_close";
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