var rtnary=new Array(1);
var callBackFunc = "";
var cur_curObj = null;

function doWork(srcName, curObjParam){
	if(!btnGetVisible(srcName)){
		return;
	}
	var formObj=document.frm1;
	try{
		switch(srcName){
		case "SEARCHLIST":	//조회
			if(frm1.f_bl_no.value==''){
				alert(getLabel('FMS_COM_ALT014'));
				frm1.f_bl_no.focus();
				return;
			}
			else{
				frm1.f_cmd.value=SEARCHLIST;
//				doShowProcess();
				//frm1.submit();
				submitForm(SEARCHLIST);
			}
			break;
		case "SEARCH_CMDT":	//Commodity List 조회
			frm1.f_cmd.value=SEARCHLIST01;
				docObjects[0].DoSearch("./AIE_BMD_0121GS.clt", FormQueryString(frm1) );
			break;
		case "SEARCH_VEHICLE":	//Vehicle List 조회
			if(frm1.s_intg_bl_seq.value != ""){
				frm1.f_cmd.value=SEARCHLIST02;
				docObjects[1].DoSearch("./AIE_BMD_0123_1GS.clt", FormQueryString(frm1) );
			}
			break;
		case "ADD_ROW1":
			if(frm1.s_intg_bl_seq.value != ""){
				var row=docObjects[0].DataInsert(-1);
				
				docObjects[0].SetCellValue(row, "intg_bl_seq",frm1.s_intg_bl_seq.value,0);
				if(row == 1){
					docObjects[0].SetCellValue(row, "cmdt_cd",frm1.s_rep_cmdt_cd.value,0);
					docObjects[0].SetCellValue(row, "cmdt_desc",frm1.s_rep_cmdt_nm.value.substring(0,45),0);
					docObjects[0].SetCellValue(row, "pck_ut_cd",frm1.s_cmdt_ut1.value,0);
					docObjects[0].SetCellValue(row, "pck_ut_cd1",frm1.s_cmdt_ut2.value,0);
					docObjects[0].SetCellValue(row, "pck_qty",frm1.s_pck_qty.value,0);
					// HBL의 DLD Customs 값 중 숫자를 추출해서 반올림
					var usdVal=frm1.s_decl_cstms_val.value;
					var numStr="0123456789.";
					var tmpVal="";
					if(usdVal != ""){
						for(var i=0 ; i < usdVal.length ; i++){
							if(numStr.indexOf(usdVal.substring(i,i+1)) != -1){
								tmpVal += usdVal.substring(i,i+1);
							}
						}
						if(!isNaN(Math.round(tmpVal))){
							docObjects[0].SetCellValue(row, "usd_val",Math.round(tmpVal),0);
						}
					}
					docObjects[0].SetCellValue(row, "grs_wgt",frm1.s_wgt.value,0);
				}
			}
			break;
		case "ADD_ROW2":
			if(frm1.s_intg_bl_seq.value != ""){
				var row=docObjects[1].DataInsert(-1);
				docObjects[1].SetCellValue(row, "intg_bl_seq",frm1.s_intg_bl_seq.value,0);
			}
			break;
		case "MODIFY":	//등록			
			/*
			var lnrBkgNo=frm1.s_lnr_bkg_no.value;
			if(lnrBkgNo == ""){
				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('TRANS_REF_NO') + "\n\n: AIE_BMD_0120.90");
				return;
			}
			*/
			if(frm1.s_intg_bl_seq.value == ""){
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_HANO'));
				frm1.f_bl_no.focus();
				return;
			}
			if(trim(frm1.s_carr_trdp_cd1.value) !="" && frm1.s_carr_trdp_cd1.value.length > 4){
				alert(getLabel('AIR_MSG_089'));
				frm1.s_carr_trdp_cd1.focus();
				return;
			}
			
			// City Name Validation 추가
			if(frm1.s_shp_city_nm.value.length > 25){
				alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("25")));
				goTabSelect('02');
				frm1.s_shp_city_nm.focus();
				return;
			}
			if(frm1.s_fwd_city_nm.value.length > 25){
				alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("25")));
				goTabSelect('02');
				frm1.s_fwd_city_nm.focus();
				return;
			}
			if(frm1.s_ult_cnee_city_nm.value.length > 25){
				alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("25")));
				goTabSelect('02');
				frm1.s_ult_cnee_city_nm.focus();
				return;
			}
			if(frm1.s_inter_cnee_city_nm.value.length > 25){
				alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("25")));
				goTabSelect('02');
				frm1.s_inter_cnee_city_nm.focus();
				return;
			}
			
			if(frm1.s_shp_zip.value.length > 9){
				alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("9")));
				goTabSelect('02');
				frm1.s_shp_zip.focus();
				return;
			}
			if(frm1.s_fwd_zip.value.length > 9){
				alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("9")));
				goTabSelect('02');
				frm1.s_fwd_zip.focus();
				return;
			}
			if(frm1.s_ult_cnee_zip.value.length > 9){
				alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("9")));
				goTabSelect('02');
				frm1.s_ult_cnee_zip.focus();
				return;
			}
			if(frm1.s_inter_cnee_zip.value.length > 9){
				alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("9")));
				goTabSelect('02');
				frm1.s_inter_cnee_zip.focus();
				return;
			}
			//OFVFOUR-7021: [AMRUS] ACE/AES SENDING ISSUE AND DATA AMOUNT
			if(frm1.s_ult_cnee_state_cd.value.length > 2){
				alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("2")));
				goTabSelect('02');
				frm1.s_ult_cnee_state_cd.focus();
				return;
			}
			if(frm1.s_shp_state_cd.value.length > 2){
				alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("2")));
				goTabSelect('02');
				frm1.s_shp_state_cd.focus();
				return;
			}
			if(frm1.s_fwd_state_cd.value.length > 2){
				alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("2")));
				goTabSelect('02');
				frm1.s_fwd_state_cd.focus();
				return;
			}
			if(frm1.s_inter_cnee_state_cd.value.length > 2){
				alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("2")));
				goTabSelect('02');
				frm1.s_inter_cnee_state_cd.focus();
				return;
			}
			if(confirm("Do you want save data?")){
				frm1.f_cmd.value=MODIFY;
				var sht1=docObjects[0].GetSaveString(true);
				var sht2=docObjects[1].GetSaveString(true);
				docObjects[2].DataInsert(docObjects[2].LastRow() + 1);
				docObjects[2].DoAllSave("./AIE_BMD_0123_2GS.clt", FormQueryString(frm1)+'&'+sht1+'&'+sht2);
			}
			break;
		case "SEND_FORM":	//등록
			//var lnrBkgNo = frm1.s_lnr_bkg_no.value;
			var shpIdTp=frm1.s_shp_tax_type.value;
			/*
			if(lnrBkgNo == ""){
				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('TRANS_REF_NO') + "\n\n: SEE_BMD_0120.85");
				return;
			}
			*/
			if(shpIdTp != "" && !(shpIdTp == "E" || shpIdTp == "T")){
				//Please check ID Type.
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_IDTP'));
				return;
			}
			var fwdIdTp=frm1.s_fwd_tax_type.value;
			if(fwdIdTp != "" && !(fwdIdTp == "E" || fwdIdTp == "T" || fwdIdTp == "D")){
				//Please check ID Type.
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_IDTP'));
				return;
			}
			if(frm1.f_save_flg.value != "U"){
				alert(getLabel('FMS_COM_ALT015'));
				return;
			}
			//Do you want send A.E.S?
			if(frm1.f_save_flg.value == "U" && confirm(getLabel('FMS_COM_CFMSEN'))){
				sndDataSet();
//				alert(document.getElementById("aes_data_1").innerHTML);
//				alert(document.getElementById("aes_data_2").innerHTML);
//				alert(document.getElementById("aes_data_3").innerHTML);
//				alert(document.getElementById("aes_data_4").innerHTML);
//				alert(document.getElementById("aes_data_5").innerHTML);
//				alert(document.getElementById("aes_data_6").innerHTML);
//				alert(document.getElementById("aes_data_temp_1").innerHTML);
//				alert(document.getElementById("aes_data_temp_2").innerHTML);
//				alert(document.getElementById("aes_data_temp_3").innerHTML);
				frm3.submit();
			}
			break;
		case "COUNTRY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";//대륙코드
			callBackFunc = "COUNTRY_POPLIST";
			modal_center_open('./CMM_POP_0020.clt', rtnary, 560,441,"yes");
	   		
	   		break;
		case "STATE_POPLIST2":
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		
	   		callBackFunc = "STATE_POPLIST2";
			modal_center_open('./CMM_POP_0310.clt', rtnary, 610,460,"yes");
			
	        break;
	   	case "LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(3);
	   		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		rtnary[2]="";
	   		curObj = curObjParam;
	   		callBackFunc = "LOCATION";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 806,435,"yes");
			
	   		break;
		case "PRINT":
			if(frm1.f_save_flg.value !="U"){
				alert(getLabel('FMS_COM_ALT015'));
				return;
			}
			goPrint();
		break;
        }
	}
	catch(e) {
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


function goPrint(){
	var formObj=document.frm1;
//	try{
		
		//Parameter Setting
		/*
		var param = ' /rv s_shp_nm[' +formObj.s_shp_nm.value + ']';	  //1a
    	    param += ' s_shp_addr['+formObj.s_shp_addr.value   +']';	  //1a
    	    param += ' s_shp_city['+formObj.s_shp_city_nm.value+'   '+ formObj.s_shp_state_cd.value + ']';  //1a
    	    param += ' s_shp_zip['+formObj.s_shp_zip.value   +']';           //1 zip code
    	    param += ' s_shp_tax_type['+formObj.s_shp_tax_type.options[formObj.s_shp_tax_type.selectedIndex].text +']'; //1b   ///// 
    	    param += ' s_shp_id['+formObj.s_shp_id.value   +']';             //1b
    	    param += ' s_rcc_flg['+formObj.s_rcc_flg.value + ']';            //1c   checkbox    	    
    	    param += ' s_etd_dt_tm['+formObj.s_etd_dt_tm.value   +']';       //2
    	    param += ' s_lnr_bkg_no['+formObj.s_lnr_bkg_no.value   +']';     //3
    	    param += ' s_ult_cnee_nm['+formObj.s_ult_cnee_nm.value   +']';   //4a
    	    param += ' s_ult_cnee_addr['+formObj.s_ult_cnee_addr.value +']'; //4a
    	    param += ' s_ult_cnee_city['+formObj.s_ult_cnee_city_nm.value+'   '+ formObj.s_ult_cnee_state_cd.value + ']'; //4a
    	    param += ' s_ult_cnee_zip['+formObj.s_ult_cnee_zip.value+'   '+ formObj.s_ult_cnee_cnt.value + ']'; //4a
    	    
    	    if(formObj.s_ult_cnee_tp.value == ""){
    	    	param += ' s_ult_cnee_tp[]'; //4a    ///////
    	    }else{
    	    	param += ' s_ult_cnee_tp['+formObj.s_ult_cnee_tp.options[formObj.s_ult_cnee_tp.selectedIndex].text + ']'; //4a    ///////
    	    }
    	    param += ' s_inter_cnee_nm['+formObj.s_inter_cnee_nm.value + ']';     //4b    
    	    param += ' s_inter_cnee_addr['+formObj.s_inter_cnee_addr.value + ']'; //4b    
    	    param += ' s_inter_cnee_city['+formObj.s_inter_cnee_city_nm.value+'   '+ formObj.s_inter_cnee_state_cd.value + ']'; //4b 
    	    param += ' s_inter_cnee_zip['+formObj.s_inter_cnee_zip.value+'   '+ formObj.s_inter_cnee_cnt.value + ']';           //4b
    	    param += ' s_fwd_nm['+formObj.s_fwd_nm.value   +']';       //5a
    	    param += ' s_fwd_addr['+formObj.s_fwd_addr.value   +']';   //5a
    	    param += ' s_fwd_city['+formObj.s_fwd_city_nm.value+'   '+ formObj.s_fwd_state_cd.value + ']'; //5a
    	    param += ' s_fwd_zip['+formObj.s_fwd_zip.value+'   '+ formObj.s_fwd_cnt.value + ']';           //5a 
    	    param += ' s_fwd_tax_type['+formObj.s_fwd_tax_type.options[formObj.s_fwd_tax_type.selectedIndex].text+'   '+ formObj.s_fwd_id.value + ']';  //5b   ////
    	    param += ' s_state_cd['+formObj.s_state_cd.value + ']';  //6
    	    param += ' s_cnt_cd['+formObj.s_cnt_cd.value+'   '+ formObj.s_cnt_nm.value + ']';  //7
    	    param += ' P_AO[A]';  
    	    param += ' s_pol_nm['+formObj.s_pol_nm.value + ']';  //8.(Ocean) , 11.  
    	    param += ' s_trs_cd['+formObj.s_trs_cd.options[formObj.s_trs_cd.selectedIndex].text + ']';  //9     ///////////// 
    	    param += ' s_carr_trdp_nm1['+formObj.s_carr_trdp_nm1.value + ']';  //10     
    	    param += ' s_pod_nm['+formObj.s_pod_nm.value + ']';  //12     
    	    param += ' s_cntr_flg['+formObj.s_cntr_flg.value + ']';  //13    checkbox 
    	    param += ' s_carr_trdp_cd1['+formObj.s_carr_trdp_cd1.value + ']';  //14 
    	    param += ' s_hbl_no['+formObj.s_hbl_no.value + ']';  //15 
    	    param += ' s_imp_en_no['+formObj.s_imp_en_no.value + ']';  //16 
    	    param += ' s_haz_flg['+formObj.s_haz_flg.value + ']';  //17   checkbox   
    	    param += ' s_ibd_tp['+formObj.s_ibd_tp.options[formObj.s_ibd_tp.selectedIndex].text + ']';  //18   /////////  
    	    param += ' s_rt_flg['+formObj.s_rt_flg.value + ']';  //19   checkbox
    	    param += ' s_licen_no['+formObj.s_licen_no.value + ']';  //27 
    	    param += ' s_eccn_no['+formObj.s_eccn_no.value + ']';  //28 
    	    param += ' v_usrNm['+v_usrNm + ']';  //29  
    	    param += ' v_ofc_cd['+v_ofc_cd + ']';  //29  
    	    param += ' v_agent['+formObj.s_fwd_nm.value + ']';  //agnet  5a 
    	    param += ' v_eml['+v_eml + ']';  //email  
    	    //console.log(param);
    	    */
	
		    var param ="["+formObj.s_hbl_no.value+"]";  	//1
		    param += "["+v_usrNm+"]";  	                        //2
		    param += "["+v_ofc_cd+"]";  	                    //3
		    param += "[A]";  	                                //4
	
    	    formObj.file_name.value = 'ace.mrd';
    	    formObj.title.value = 'AEH ACE';
    	    formObj.rd_param.value=param;
    	    popPOST(formObj, "RPT_RD_0030.clt", "popTest", 1025, 740);
}

function setCheckBoxValue( obj, val){
	obj.value = '' != val ? val : 'N';
}

function setRadioValue( obj, val){
	obj.value =  '' != val ? val : 2;
	if (val == 4) {
		frm1.s_file_tp[1].checked = true;
	} else {
		frm1.s_file_tp[0].checked = true;
	}
}

function submitForm(cmd){
	var formObj=document.frm1;
	var formObj3=document.frm3;
	var Temp_eda ="";
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./AIE_BMD_0120AJ.clt",
		   dataType: 'xml',
		   data: { f_cmd: cmd,  f_bl_no: formObj.f_bl_no.value },
		   success: function(data){
			   
			   setFieldValue( formObj.f_save_flg, $('saveFlg',data).text());
			   setFieldValue( formObj.s_rep_cmdt_cd, $('rep_cmdt_cd',data).text());
			   setFieldValue( formObj.s_rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.s_cmdt_ut1, $('cmdt_ut1',data).text());
			   setFieldValue( formObj.s_cmdt_ut2, $('cmdt_ut2',data).text());
			   setFieldValue( formObj.s_pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.s_wgt, $('wgt',data).text());
			   setFieldValue( formObj.s_decl_cstms_val, $('decl_cstms_val',data).text());
			   setFieldValue( formObj.s_cntr_add_flg, $('cntr_add_flg',data).text());
			   setFieldValue( formObj.f_bl_no, $('hbl_no',data).text());

			   
			   // AIE_BMD_0122
			   setFieldValue( formObj.s_shp_nm, $('shp_nm',data).text());
			   setFieldValue( formObj.s_shp_pic_f, $('shp_pic_f',data).text());
			   setFieldValue( formObj.s_shp_pic_l, $('shp_pic_l',data).text());
			   setFieldValue( formObj.s_shp_phn, $('shp_phn',data).text());
			   setFieldValue( formObj.s_shp_addr, $('shp_addr',data).text());
			   setFieldValue( formObj.s_shp_city_nm, $('shp_city_nm',data).text());
			   setFieldValue( formObj.s_shp_state_cd, $('shp_state_cd',data).text());
			   setFieldValue( formObj.s_shp_zip, $('shp_zip',data).text());
			   setFieldValue( formObj.s_shp_cnt, $('shp_cnt',data).text());
			   setFieldValue( formObj.s_h_shp_tax_type, $('shp_tax_type',data).text());
			   setFieldValue( formObj.s_shp_id, $('shp_id',data).text());
			   setFieldValue( formObj.s_ult_cnee_nm, $('ult_cnee_nm',data).text());
			   setFieldValue( formObj.s_ult_cnee_pic, $('ult_cnee_pic',data).text());
			   setFieldValue( formObj.s_ult_cnee_phn, $('ult_cnee_phn',data).text());
			   setFieldValue( formObj.s_ult_cnee_addr, $('ult_cnee_addr',data).text());
			   setFieldValue( formObj.s_ult_cnee_city_nm, $('ult_cnee_city_nm',data).text());
			   setFieldValue( formObj.s_ult_cnee_state_cd, $('ult_cnee_state_cd',data).text());
			   setFieldValue( formObj.s_ult_cnee_zip, $('ult_cnee_zip',data).text());
			   setFieldValue( formObj.s_ult_cnee_cnt, $('ult_cnee_cnt',data).text());
			   setFieldValue( formObj.s_h_ult_cnee_tp, $('ult_cnee_tp',data).text());
			   setFieldValue( formObj.s_fwd_nm, $('fwd_nm',data).text());
			   setFieldValue( formObj.s_fwd_pic, $('fwd_pic',data).text());
			   setFieldValue( formObj.s_fwd_phn, $('fwd_phn',data).text());
			   setFieldValue( formObj.s_fwd_addr, $('fwd_addr',data).text());
			   setFieldValue( formObj.s_fwd_city_nm, $('fwd_city_nm',data).text());
			   setFieldValue( formObj.s_fwd_state_cd, $('fwd_state_cd',data).text());
			   setFieldValue( formObj.s_fwd_zip, $('fwd_zip',data).text());
			   setFieldValue( formObj.s_fwd_cnt, $('fwd_cnt',data).text());
			   setFieldValue( formObj.s_h_fwd_tax_type, $('fwd_tax_type',data).text());
			   setFieldValue( formObj.s_fwd_id, $('fwd_id',data).text());
			   setFieldValue( formObj.s_inter_cnee_nm, $('inter_cnee_nm',data).text());
			   setFieldValue( formObj.s_inter_cnee_pic, $('inter_cnee_pic',data).text());
			   setFieldValue( formObj.s_inter_cnee_phn, $('inter_cnee_phn',data).text());
			   setFieldValue( formObj.s_inter_cnee_addr, $('inter_cnee_addr',data).text());
			   setFieldValue( formObj.s_inter_cnee_city_nm, $('inter_cnee_city_nm',data).text());
			   setFieldValue( formObj.s_inter_cnee_state_cd, $('inter_cnee_state_cd',data).text());
			   setFieldValue( formObj.s_inter_cnee_zip, $('inter_cnee_zip',data).text());
			   setFieldValue( formObj.s_inter_cnee_cnt, $('inter_cnee_cnt',data).text());


			   // AIE_BMD_0121
			   setFieldValue( formObj.s_hbl_no, $('hbl_no',data).text());
			   setFieldValue( formObj.s_intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.s_pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.s_pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.s_aes_sts, $('aes_sts',data).text());
			   setFieldValue( formObj.s_lnr_bkg_no, $('lnr_bkg_no',data).text()); 
			   setFieldValue( formObj.s_etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.s_it_no, $('it_no',data).text());
			   setFieldValue( formObj.s_h_trs_cd, $('trs_cd',data).text());
			   setFieldValue( formObj.s_pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.s_pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.s_cnt_cd, $('cnt_cd',data).text());
			   setFieldValue( formObj.s_cnt_nm, $('cnt_nm',data).text());
			   setFieldValue( formObj.s_state_cd, $('state_cd',data).text());
			   setFieldValue( formObj.s_state_nm, $('state_nm',data).text());
			   setFieldValue( formObj.s_carr_trdp_cd1, $('carr_trdp_cd1',data).text());
			   setFieldValue( formObj.s_carr_trdp_nm1, $('carr_trdp_nm1',data).text());
			   setFieldValue( formObj.s_h_ibd_tp, $('ibd_tp',data).text());
			   setFieldValue( formObj.s_vsl_nm, $('trnk_vsl_nm',data).text());
			   setFieldValue( formObj.s_vsl_cd, $('trnk_vsl_cd',data).text());
			   setFieldValue( formObj.s_imp_en_no, $('imp_en_no',data).text());
			   setCheckBoxValue( formObj.s_rt_flg, $('rt_flg',data).text());
			   setFieldValue( formObj.s_ftz_cd, $('ftz_cd',data).text());
			   setRadioValue( formObj.s_file_tp, $('file_tp',data).text());
			   setCheckBoxValue( formObj.s_haz_flg, $('haz_flg',data).text());
			   setFieldValue( formObj.s_h_exp_cd, $('exp_cd',data).text());
			   setFieldValue( formObj.s_rsps_eml, $('rsps_eml',data).text());
			   setCheckBoxValue( formObj.s_rcc_flg, $('rcc_flg',data).text());

			   
			   // AIE_BMD_0123
			   setFieldValue( formObj.s_h_licen_tp, $('licen_tp',data).text());
			   setFieldValue( formObj.s_licen_no, $('licen_no',data).text());
			   setFieldValue( formObj.s_ddtc_itar_no, $('ddtc_itar_no',data).text());
			   setFieldValue( formObj.s_eccn_no, $('eccn_no',data).text());
			   setFieldValue( formObj.s_h_ddtc_usml_cd, $('ddtc_usml_cd',data).text());
			   setFieldValue( formObj.s_ddtc_regi_no, $('ddtc_regi_no',data).text());
			   setFieldValue( formObj.s_ddtc_pck_qty, $('ddtc_pck_qty',data).text());
			   setFieldValue( formObj.s_h_ddtc_pck_ut_cd, $('ddtc_pck_ut_cd',data).text());
			   setFieldValue( formObj.s_h_ddtc_prty_certi_flg, $('ddtc_prty_certi_flg',data).text());
			   setFieldValue( formObj.s_h_ddtc_eq_flg, $('ddtc_eq_flg',data).text());

			// SEE_BMD_0124
			   setFieldValue( formObj3.EMAIL, $('rsps_eml',data).text());
			   setFieldValue( formObj3.SRN, $('hbl_no',data).text());
			   setFieldValue( formObj3.ST, $('state_cd',data).text());
			   setFieldValue( formObj3.FTZ, $('ftz_cd',data).text());
			   setRadioValue( formObj3.FO, $('file_tp',data).text());
			   setFieldValue( formObj3.POE, $('pol_cd',data).text());
			   setFieldValue( formObj3.COD, $('cnt_cd',data).text());
			   
			   if( $('etd_dt_tm',data).text() != ""){
				   Temp_eda=$('etd_dt_tm',data).text().substring(0,2)+"/"+$('etd_dt_tm',data).text().substring(3,5)+"/"+$('etd_dt_tm',data).text().substring(8,10); 
			   }
			   
			   setFieldValue( formObj3.EDA, Temp_eda);
			   
			   setFieldValue( formObj3.MOT, $('trs_cd',data).text());
			   setFieldValue( formObj3.SCAC, $('carr_trdp_cd1',data).text());
			   setFieldValue( formObj3.VN, $('carr_trdp_nm1',data).text());
			   setFieldValue( formObj3.VF, $('vsl_flg',data).text());
			   setFieldValue( formObj3.RCC, $('rcc_flg',data).text());
			   setFieldValue( formObj3.HAZ, $('haz_flg',data).text());
			   setFieldValue( formObj3.RT, $('rt_flg',data).text());
			   setFieldValue( formObj3.IBN, $('imp_en_no',data).text());
			   setFieldValue( formObj3.IBT, $('ibd_tp',data).text());
			   setFieldValue( formObj3.AD0_1, $('shp_nm',data).text());
			   setFieldValue( formObj3.AD0_2, $('shp_id',data).text());
			   setFieldValue( formObj3.AD0_3, $('shp_tax_type',data).text());
			   setFieldValue( formObj3.AD0_6, $('shp_city_nm',data).text());
			   setFieldValue( formObj3.AD0_7, $('shp_state_cd',data).text());
			   setFieldValue( formObj3.AD0_8, $('shp_zip',data).text());
			   setFieldValue( formObj3.AD0_9, $('shp_pic_f',data).text());
			   setFieldValue( formObj3.AD0_11, $('shp_pic_l',data).text());
			   setFieldValue( formObj3.AD1_3, $('ult_cnee_nm',data).text());
			   setFieldValue( formObj3.AD1_5, $('ult_cnee_pic',data).text());
			   setFieldValue( formObj3.AD1_7, $('ult_cnee_phn',data).text());
			   setFieldValue( formObj3.AD1_10, $('ult_cnee_city_nm',data).text());
			   setFieldValue( formObj3.AD1_11, $('ult_cnee_state_cd',data).text());
			   setFieldValue( formObj3.AD1_12, $('ult_cnee_cnt',data).text());
			   setFieldValue( formObj3.AD1_13, $('ult_cnee_zip',data).text());
			   setFieldValue( formObj3.AD1_14, $('ult_cnee_tp',data).text());
			   setFieldValue( formObj3.AD4_3, $('inter_cnee_nm',data).text());
			   setFieldValue( formObj3.AD4_5, $('inter_cnee_pic',data).text());
			   setFieldValue( formObj3.AD4_7, $('inter_cnee_phn',data).text());
			   setFieldValue( formObj3.AD4_10, $('inter_cnee_city_nm',data).text());
			   setFieldValue( formObj3.AD4_11, $('inter_cnee_state_cd',data).text());
			   setFieldValue( formObj3.AD4_12, $('inter_cnee_cnt',data).text());
			   setFieldValue( formObj3.AD4_13, $('inter_cnee_zip',data).text());
			   setFieldValue( formObj3.AD3_2, $('fwd_tax_type',data).text());
			   setFieldValue( formObj3.AD3_3, $('fwd_nm',data).text());
			   setFieldValue( formObj3.AD3_4, $('fwd_id',data).text());
			   setFieldValue( formObj3.AD3_5, $('fwd_pic',data).text());
			   setFieldValue( formObj3.AD3_7, $('fwd_phn',data).text());
			   setFieldValue( formObj3.AD3_10, $('fwd_city_nm',data).text());
			   setFieldValue( formObj3.AD3_11, $('fwd_state_cd',data).text());
			   setFieldValue( formObj3.AD3_12, $('fwd_cnt',data).text());
			   setFieldValue( formObj3.AD3_13, $('fwd_zip',data).text());
			   
			   //remove all aes_data_temp_
			   $("form[name='frm3']").find("div").each(function(){
				   var idVal = $(this).attr("id");
				   if(idVal.indexOf("aes_data_temp_") >= 0){
					   $(this).remove();
				   }
			   });
			   
			   if($('sndAesRow',data).text() != ""){
				   var row = parseInt($('sndAesRow',data).text()) + 1;
				   
				   for(var i = 1; i < row; i++){
					  var div =    $("<div id='aes_data_temp_" + i + "'>").appendTo($("form[name='frm3']"));
					  $("<input type='hidden' name='isLine" + i + "'  id='isLine" + i + "' >").val('Y').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_1'  id='IT" + i + "_1' >").val($('exp_cd',data).text()).appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_2'  id='IT" + i + "_2' >").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_3'  id='IT" + i + "_3' >").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_4'  id='IT" + i + "_4' >").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_5'  id='IT" + i + "_5' >").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_6'  id='IT" + i + "_6' >").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_7'  id='IT" + i + "_7' >").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_8'  id='IT" + i + "_8' >").val($('licen_tp',data).text()).appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_9'  id='IT" + i + "_9' >").val($('licen_no',data).text()).appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_12' id='IT" + i + "_12' >").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_13' id='IT" + i + "_13' >").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_15' id='IT" + i + "_15' >").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_16' id='IT" + i + "_16' >").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_17' id='IT" + i + "_17' >").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_18' id='IT" + i + "_18' >").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_19' id='IT" + i + "_19' >").val('').appendTo(div);
					  
					  $("<input type='hidden' name='IT" + i + "_20' id='IT" + i + "_20'>").val('').appendTo(div);
					  $("<input type='hidden' name='IT" + i + "_21' id='IT" + i + "_21'>").val('').appendTo(div);
					  
					  $("<input type='hidden' name='EP" + i + "_1' id='EP" + i + "_1'>").val('').appendTo(div);
					  $("<input type='hidden' name='EP" + i + "_2' id='EP" + i + "_2'>").val('').appendTo(div);
					  $("<input type='hidden' name='EP" + i + "_3' id='EP" + i + "_3'>").val('').appendTo(div);
					  $("<input type='hidden' name='EP" + i + "_4' id='EP" + i + "_4'>").val('').appendTo(div);
					  $("<input type='hidden' name='EP" + i + "_5' id='EP" + i + "_5'>").val('').appendTo(div);
						                                                                
					  $("<input type='hidden' name='ODTC" + i + "_1   id='ODTC" + i + "_1 '>").val($('ddtc_itar_no',data).text()).appendTo(div);
					  $("<input type='hidden' name='ODTC" + i + "_2   id='ODTC" + i + "_2 '>").val($('ddtc_regi_no',data).text()).appendTo(div);
					  $("<input type='hidden' name='ODTC" + i + "_3   id='ODTC" + i + "_3 '>").val($('ddtc_eq_flg',data).text()).appendTo(div);
					  $("<input type='hidden' name='ODTC" + i + "_4   id='ODTC" + i + "_4 '>").val($('ddtc_prty_certi_flg',data).text()).appendTo(div);
					  $("<input type='hidden' name='ODTC" + i + "_5   id='ODTC" + i + "_5 '>").val($('ddtc_usml_cd',data).text()).appendTo(div);
					  $("<input type='hidden' name='ODTC" + i + "_6   id='ODTC" + i + "_6 '>").val($('ddtc_pck_qty',data).text()).appendTo(div);
					  $("<input type='hidden' name='ODTC" + i + "_7   id='ODTC" + i + "_7 '>").val($('ddtc_pck_ut_cd',data).text()).appendTo(div);
				   }
			   }
			   
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


var CODETYPE="";
function codeCheck(str, obj){
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if ( s_code != "" ) {
		if ( s_code != "" ) {
			CODETYPE=str;		
			var sub_str=str.substring(0,8);
			if(sub_str=="Location"){
				s_type="location_ams";
				ajaxSendPost(changeCodeNameAjaxReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}else{
				s_type=str;
				ajaxSendPost(changeCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}else{
		if(str == "Location_pol"){
			frm1.s_pol_nm.value="";
		}else if(str == "Location_pod"){
			frm1.s_pod_nm.value="";
		}else if(str == "state_us"){
			frm1.s_state_nm.value="";
		}else if(str == "country"){
			frm1.s_cnt_nm.value="";
		}
	}
}
//코드표시 Ajax
function changeCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj4=docObjects[2];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="Location_pol"){
				formObj.s_pol_cd.value=masterVals[0];//ams_loc_val
				formObj.s_pol_nm.value=masterVals[1];//loc_nm
			}else if(CODETYPE =="Location_pod"){
				formObj.s_pod_cd.value=masterVals[0];//ams_loc_val
				formObj.s_pod_nm.value=masterVals[1];//loc_nm
			}else if(CODETYPE =="state_us"){
				formObj.s_state_cd.value=masterVals[0];
				formObj.s_state_nm.value=masterVals[3];
			}else if(CODETYPE =="country"){
				formObj.s_cnt_cd.value=masterVals[0];
				formObj.s_cnt_nm.value=masterVals[3];
			}
		}else{
			if(CODETYPE =="Location_pol"){
//				formObj.s_pol_cd.value = "";//loc_cd 
				formObj.s_pol_nm.value="";//loc_nm
			}else if(CODETYPE =="Location_pod"){
//				formObj.s_pod_cd.value = "";//loc_cd 
				formObj.s_pod_nm.value="";//loc_nm
			}else if(CODETYPE =="state_us"){
				formObj.s_state_cd.value="";
				formObj.s_state_nm.value="";
			}else if(CODETYPE =="country"){
				formObj.s_cnt_cd.value="";
				formObj.s_cnt_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
var cur_callFlg;
function companyPopup(callFlg, valObj){
	cur_callFlg = callFlg;
	rtnary=new Array(1);
	rtnary[0]="1";
	// 2011.12.27 value parameter
	if(typeof(valObj)!='undefined'){
		rtnary[1]=valObj;
	}else{
		rtnary[1]="";
	}
	rtnary[2]=window;
	//Shipper/Consignee인경우
	var cstmTpCd='';
	callBackFunc = "companyPopup_CallBackFunc";
	modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
}

function companyPopup_CallBackFunc(rtnVal){
	var callFlg = cur_callFlg;
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(callFlg == "USPPI"){
			if(rtnValAry[0]==''){
				formObj.s_shp_nm.focus();
			}else{
				formObj.s_shp_nm.value=rtnValAry[2];
				if(rtnValAry[3] != ""){
					if(rtnValAry[3].indexOf(" ") != -1){
						formObj.s_shp_pic_f.value=rtnValAry[3].substring(0, (rtnValAry[3].length-1) - rtnValAry[3].lastIndexOf(" "));
						formObj.s_shp_pic_l.value=rtnValAry[3].substring(rtnValAry[3].length - rtnValAry[3].lastIndexOf(" "));
					}else{
						formObj.s_shp_pic_f.value=rtnValAry[3];
					}
				}else{
					formObj.s_shp_pic_f.value="";
					formObj.s_shp_pic_l.value="";
				}
				formObj.s_shp_phn.value=rtnValAry[4].replaceAll("-","").replaceAll("(","").replaceAll(")","");
				//formObj.s_shp_addr.value=rtnValAry[7];
				formObj.s_shp_addr.value=rtnValAry[16];
				formObj.s_shp_zip.value=rtnValAry[11];
				formObj.s_shp_cnt.value=rtnValAry[12];
				formObj.s_shp_city_nm.value=rtnValAry[19];
				formObj.s_shp_id.value=rtnValAry[23];
				formObj.s_shp_state_cd.value=rtnValAry[20];
			}
		}else if(callFlg == "FWD"){
			if(rtnValAry[0]==''){
				formObj.s_fwd_nm.focus();
			}else{
				formObj.s_fwd_nm.value=rtnValAry[2];
				formObj.s_fwd_pic.value=rtnValAry[3];
				formObj.s_fwd_phn.value=rtnValAry[4].replaceAll("-","").replaceAll("(","").replaceAll(")","");
				//formObj.s_fwd_addr.value=rtnValAry[7];
				formObj.s_fwd_addr.value=rtnValAry[16];
				formObj.s_fwd_zip.value=rtnValAry[11];
				formObj.s_fwd_cnt.value=rtnValAry[12];
				formObj.s_fwd_city_nm.value=rtnValAry[19];
				formObj.s_fwd_state_cd.value=rtnValAry[20];
			}
		}else if(callFlg == "ULT"){
			if(rtnValAry[0]==''){
				formObj.s_ult_cnee_nm.focus();
			}else{
				formObj.s_ult_cnee_nm.value=rtnValAry[2];
				formObj.s_ult_cnee_pic.value=rtnValAry[3];
				formObj.s_ult_cnee_phn.value=rtnValAry[4].replaceAll("-","").replaceAll("(","").replaceAll(")","");
				//formObj.s_ult_cnee_addr.value=rtnValAry[7];
				formObj.s_ult_cnee_addr.value=rtnValAry[16];
				formObj.s_ult_cnee_zip.value=rtnValAry[11];
				formObj.s_ult_cnee_cnt.value=rtnValAry[12];
				formObj.s_ult_cnee_city_nm.value=rtnValAry[19];
				formObj.s_ult_cnee_state_cd.value=rtnValAry[20];
			}
		}else if(callFlg == "INTER"){
			if(rtnValAry[0]==''){
				formObj.s_inter_cnee_nm.focus();
			}else{
				formObj.s_inter_cnee_nm.value=rtnValAry[2];
				formObj.s_inter_cnee_pic.value=rtnValAry[3];
				formObj.s_inter_cnee_phn.value=rtnValAry[4].replaceAll("-","").replaceAll("(","").replaceAll(")","");
				//formObj.s_inter_cnee_addr.value=rtnValAry[7];
				formObj.s_inter_cnee_addr.value=rtnValAry[16];
				formObj.s_inter_cnee_zip.value=rtnValAry[11];
				formObj.s_inter_cnee_cnt.value=rtnValAry[12];
				formObj.s_inter_cnee_city_nm.value=rtnValAry[19];
				formObj.s_inter_cnee_state_cd.value=rtnValAry[20];
			}
		}
	}
}

var callFlg = "";
function countryPopup(callFlgParam){
	rtnary=new Array(2);
	rtnary[0]="1";
	rtnary[1]="";
	callBackFunc = "countryPopup_CallBackFunc";
	callFlg = callFlgParam;
	modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
	
}

function countryPopup_CallBackFunc(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(callFlg == "USPPI"){
			formObj.s_shp_cnt.value=rtnValAry[0];//cd_val
		}else if(callFlg == "FWD"){
			formObj.s_fwd_cnt.value=rtnValAry[0];//cd_val
		}else if(callFlg == "ULT"){
			formObj.s_ult_cnee_cnt.value=rtnValAry[0];//cd_val
		}else if(callFlg == "INTER"){
			formObj.s_inter_cnee_cnt.value=rtnValAry[0];//cd_val
		}
	}
}

function sheet1_OnChange(sheetObj, Row, Col){
	switch (sheetObj.ColSaveName(Col)) {
	case "cmdt_cd" :
		var cmdtNo=sheetObj.GetCellValue(Row, "cmdt_cd").toUpperCase();
		var sType="commoditysb";
		if(sheetObj.GetCellValue(Row, "cmdt_cd") != ""){
			ajaxSendPost(cmdtChange, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+sType+'&s_code='+cmdtNo, './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(Row, "cmdt_cd","",0);
			sheetObj.SetCellValue(Row, "cmdt_desc","",0);
			sheetObj.SetCellValue(Row, "pck_ut_cd","",0);
			sheetObj.SetCellValue(Row, "pck_ut_cd1","",0);
		}
    break;
	} // end switch
}
function cmdtChange(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj1=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "cmdt_cd",masterVals[0],0);
			if(masterVals[3].length > 45){
				sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "cmdt_desc",masterVals[3].substring(0,45),0);
			}else{
				sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "cmdt_desc",masterVals[3],0);
			}
			sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "pck_ut_cd",masterVals[2],0);
			sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "pck_ut_cd1",masterVals[4],0);

			if (masterVals[2] == "X") {
				sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "pck_qty",0,0);
			}
			if (masterVals[4] == "X") {
				sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "pck_qty1",0,0);
			}
			
			
		}else{
			sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "cmdt_cd","",0);
			sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "cmdt_desc","",0);
			sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "pck_ut_cd","",0);
			sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "pck_ut_cd1","",0);
		}
	}
}
var cur_row;
function sheet1_OnPopupClick(sheetObj, Row, Col){
	switch (sheetObj.ColSaveName(Col)) {
	case "cmdt_cd" :
		cur_row = Row;
		rtnary=new Array(1);
		rtnary[0]="1";
		callBackFunc = "cmdt_cd";
		modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
		
    break;
	} // end switch
}

function cmdt_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "cmdt_cd",rtnValAry[0],0);
		if(rtnValAry[2].length > 45){
			docObjects[0].SetCellValue(cur_row, "cmdt_desc",rtnValAry[2].substring(0,45),0);
		}else{
			docObjects[0].SetCellValue(cur_row, "cmdt_desc",rtnValAry[2],0);
		}
		docObjects[0].SetCellValue(cur_row, "pck_ut_cd",rtnValAry[3],0);
		docObjects[0].SetCellValue(cur_row, "pck_ut_cd1",rtnValAry[4],0);
	}
}

//AES Send Data(Grid)를 셋팅
function sndDataSet(){
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var dataForm=document.frm1;
	var sndForm=document.frm3;
	var isFirst=true;
	var sndRow=1;
	
	//#48295 NAME 30자 제한 
	if(dataForm.s_shp_nm.value.length > 30){
		dataForm.s_shp_nm.value = dataForm.s_shp_nm.value.substring(0,30);
	}
	if(dataForm.s_ult_cnee_nm.value.length > 30){
		dataForm.s_ult_cnee_nm.value = dataForm.s_ult_cnee_nm.value.substring(0,30);
	}
	if(dataForm.s_fwd_nm.value.length > 30){
		dataForm.s_fwd_nm.value = dataForm.s_fwd_nm.value.substring(0,30);
	}
	if(dataForm.s_inter_cnee_nm.value.length > 30){
		dataForm.s_inter_cnee_nm.value = dataForm.s_inter_cnee_nm.value.substring(0,30);
	}
	
	//USPPI Phone
	if(dataForm.s_shp_phn.value != ""){
		var shpPhn=dataForm.s_shp_phn.value.replaceAll("-","").replaceAll("(","").replaceAll(")","");
		if(shpPhn.length > 10){
			//Please check USPPI Phone Number.
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_USPP'));
			return;
		}
		else{
			sndForm.AD0_12.value=shpPhn;
		}
	}
	else{
		sndForm.AD0_12.value="";
	}
	//USPPI ID
	if(dataForm.s_shp_id.value != ""){
		var shpId=dataForm.s_shp_id.value.replaceAll("-","");
		sndForm.AD0_2.value=shpId;
	}else{
		sndForm.AD0_2.value="";
	}
	//Freight Forwarder ID
	if(dataForm.s_fwd_id.value != ""){
		var fwdId=dataForm.s_fwd_id.value.replaceAll("-","");
		sndForm.AD3_4.value=fwdId;
	}else{
		sndForm.AD3_4.value="";
	}
	//USPPI Address
	if(dataForm.s_shp_addr.value.length > 0){
		var addrVal=dataForm.s_shp_addr.value.replaceAll("\n"," ");
		if(addrVal.length > 31){
			sndForm.AD0_4.value=addrVal.substring(0,31);
			sndForm.AD0_5.value=addrVal.substring(31,65);
		}else{
			sndForm.AD0_4.value=addrVal;
		}
	}
	//Freight Forwarder Address
	if(dataForm.s_fwd_addr.value.length > 0){
		var addrVal=dataForm.s_fwd_addr.value.replaceAll("\n"," ");
		if(addrVal.length > 31){
			sndForm.AD3_8.value=addrVal.substring(0,31);
			sndForm.AD3_9.value=addrVal.substring(31,65);
		}else{
			sndForm.AD3_8.value=addrVal;
		}
	}
	//Ultimate Consignee Address
	if(dataForm.s_ult_cnee_addr.value.length > 0){
		var addrVal=dataForm.s_ult_cnee_addr.value.replaceAll("\n", " ");
		if(addrVal.length > 31){
			sndForm.AD1_8.value=addrVal.substring(0,31);
			sndForm.AD1_9.value=addrVal.substring(31,65);
		}else{
			sndForm.AD1_8.value=addrVal;
		}
	}	
	//Intermediate Consignee Address
	if(dataForm.s_inter_cnee_addr.value.length > 0){
		var addrVal=dataForm.s_inter_cnee_addr.value.replaceAll("\n"," ");
		if(addrVal.length > 31){
			sndForm.AD4_8.value=addrVal.substring(0,31);
			sndForm.AD4_9.value=addrVal.substring(31,65);
		}else{
			sndForm.AD4_8.value=addrVal;
		}
	}
	for(var i=1 ; i < sheetObj1.SearchRows()+1 ; i++){
		if(isFirst){
			if(sheetObj2.SearchRows()== 0){
				document.getElementsByName("IT" + sndRow + "_2")[0].value=sheetObj1.GetCellValue(i, "usd_val");
				document.getElementsByName("IT" + sndRow + "_3")[0].value=sheetObj1.GetCellValue(i, "pck_ut_cd");
				document.getElementsByName("IT" + sndRow + "_4")[0].value=sheetObj1.GetCellValue(i, "pck_qty");
				document.getElementsByName("IT" + sndRow + "_5")[0].value=sheetObj1.GetCellValue(i, "pck_ut_cd1");
				document.getElementsByName("IT" + sndRow + "_6")[0].value=sheetObj1.GetCellValue(i, "pck_qty1");
				document.getElementsByName("IT" + sndRow + "_7")[0].value=sheetObj1.GetCellValue(i, "grs_wgt");
				//52339 추가 Start
				document.getElementsByName("IT" + sndRow + "_20")[0].value=sheetObj1.GetCellValue(i, "eccn_no");
				document.getElementsByName("EP" + sndRow + "_1")[0].value=sheetObj1.GetCellValue(i, "pga_lic_flg");
				//52339 추가 End
				document.getElementsByName("IT" + sndRow + "_12")[0].value=sheetObj1.GetCellValue(i, "cmdt_desc");
				document.getElementsByName("IT" + sndRow + "_13")[0].value=sheetObj1.GetCellValue(i, "cmdt_cd");
				document.getElementsByName("IT" + sndRow + "_15")[0].value="N";
				document.getElementsByName("IT" + sndRow + "_21")[0].value=sheetObj1.GetCellValue(i, "org_tp");
				
				// Exception 처리 
				try{
					document.getElementsByName("ODTC" + sndRow + "_3")[0].value="";
					document.getElementsByName("ODTC" + sndRow + "_4")[0].value="";
				} catch(e){}
				
				sndRow++;
			}else{
				for(var j=1 ; j < sheetObj2.SearchRows()+1 ; j++){
					document.getElementsByName("IT" + sndRow + "_2")[0].value=sheetObj1.GetCellValue(1, "usd_val");
					document.getElementsByName("IT" + sndRow + "_3")[0].value=sheetObj1.GetCellValue(1, "pck_ut_cd");
					document.getElementsByName("IT" + sndRow + "_4")[0].value=sheetObj1.GetCellValue(1, "pck_qty");
					document.getElementsByName("IT" + sndRow + "_5")[0].value=sheetObj1.GetCellValue(1, "pck_ut_cd1");
					document.getElementsByName("IT" + sndRow + "_6")[0].value=sheetObj1.GetCellValue(1, "pck_qty1");
					document.getElementsByName("IT" + sndRow + "_7")[0].value=sheetObj1.GetCellValue(1, "grs_wgt");
					//52339 추가 Start
					document.getElementsByName("IT" + sndRow + "_20")[0].value=sheetObj1.GetCellValue(i, "eccn_no");
					document.getElementsByName("EP" + sndRow + "_1")[0].value=sheetObj1.GetCellValue(i, "pga_lic_flg");
					//52339 추가 End
					document.getElementsByName("IT" + sndRow + "_12")[0].value=sheetObj1.GetCellValue(1, "cmdt_desc");
					document.getElementsByName("IT" + sndRow + "_13")[0].value=sheetObj1.GetCellValue(1, "cmdt_cd");
					document.getElementsByName("IT" + sndRow + "_15")[0].value="Y";
					document.getElementsByName("IT" + sndRow + "_16")[0].value=sheetObj2.GetCellValue(j, "vhc_id_tp");
					document.getElementsByName("IT" + sndRow + "_17")[0].value=sheetObj2.GetCellValue(j, "vhc_id");
					document.getElementsByName("IT" + sndRow + "_18")[0].value=sheetObj2.GetCellValue(j, "vhc_ttl");
					document.getElementsByName("IT" + sndRow + "_19")[0].value=sheetObj2.GetCellValue(j, "vhc_ttl_state");
					document.getElementsByName("IT" + sndRow + "_21")[0].value=sheetObj1.GetCellValue(i, "org_tp");
					
					// Exception 처리 
					try{
						document.getElementsByName("ODTC" + sndRow + "_3")[0].value="";
						document.getElementsByName("ODTC" + sndRow + "_4")[0].value="";
					} catch(e){}
					sndRow++;
				}
			}
			isFirst=false;
		}else{
			document.getElementsByName("IT" + sndRow + "_2")[0].value=sheetObj1.GetCellValue(i, "usd_val");
			document.getElementsByName("IT" + sndRow + "_3")[0].value=sheetObj1.GetCellValue(i, "pck_ut_cd");
			document.getElementsByName("IT" + sndRow + "_4")[0].value=sheetObj1.GetCellValue(i, "pck_qty");
			document.getElementsByName("IT" + sndRow + "_5")[0].value=sheetObj1.GetCellValue(i, "pck_ut_cd1");
			document.getElementsByName("IT" + sndRow + "_6")[0].value=sheetObj1.GetCellValue(i, "pck_qty1");
			document.getElementsByName("IT" + sndRow + "_7")[0].value=sheetObj1.GetCellValue(i, "grs_wgt");
			//52339 추가 Start
			document.getElementsByName("IT" + sndRow + "_20")[0].value=sheetObj1.GetCellValue(i, "eccn_no");
			document.getElementsByName("EP" + sndRow + "_1")[0].value=sheetObj1.GetCellValue(i, "pga_lic_flg");
			//52339 추가 End
			document.getElementsByName("IT" + sndRow + "_12")[0].value=sheetObj1.GetCellValue(i, "cmdt_desc");
			document.getElementsByName("IT" + sndRow + "_13")[0].value=sheetObj1.GetCellValue(i, "cmdt_cd");
			document.getElementsByName("IT" + sndRow + "_15")[0].value="N";
			document.getElementsByName("IT" + sndRow + "_21")[0].value=sheetObj1.GetCellValue(i, "org_tp");
			
			// Exception 처리 
			try{
				document.getElementsByName("ODTC" + sndRow + "_3")[0].value="";
				document.getElementsByName("ODTC" + sndRow + "_4")[0].value="";
			} catch(e){}
			sndRow++;
		}
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	        var cal=new ComCalendar(); 
	        cal.select(obj,  'MM-dd-yyyy');
	    break;
    }
}
//Description에 Instrutction을 추가함
function addInst(){
	ajaxSendPost(addInstTxt, 'reqVal', '&goWhere=aj&bcKey=getInstTxt&loc_cd='+frm1.del_cd.value, './GateServlet.gsl');
}
//--------------------------------------------------------------------------------------------------------------
//                                             Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
var tab1click='';
var tab2click='';
var tab3click='';
function goTabSelect(isNumSep) {
	var tabObjs=document.getElementsByName('tabLayer');
    if( isNumSep == "01" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='inline';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        if(tab1click == ""){
	        tab1click="Y"
	    }
	    //스크롤을 하단으로 이동한다.
//		document.body.scrollTop = document.body.scrollHeight;
	//Mark Description 탭
    } else if( isNumSep == "02" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="inline";
        tabObjs[2].style.display='none';
        if(tab2click == ""){
        	tab2click="Y";
        }
    	//스크롤을 하단으로 이동한다.
//		document.body.scrollTop = document.body.scrollHeight;
    }else if( isNumSep == "03" ) {
    	currTab=isNumSep;	//탭상태저장
	    tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='inline';
        if(tab3click== ""){
	        tab3click="Y";
//	        doWork('SEARCH_VEHICLE');
    	}
        //스크롤을 하단으로 이동한다.
//		document.body.scrollTop = document.body.scrollHeight;
    }
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});
}
function sheet1_OnSearchEnd(sheetObj) {
	
	/*for(var i=1; i<=sheetObj.LastRow();i++){
		
		if(sheetObj.GetCellValue(i, "pck_ut_cd") == "X") {
			sheetObj.SetCellValue(i, "pck_qty",0);
		}
		if(sheetObj.GetCellValue(i, "pck_ut_cd1") == "X") {
			sheetObj.SetCellValue(i, "pck_qty1",0);
		}
	}*/
	
	// #48937 - [CARGOIS] HOUSE ENTRY에 있는 COMMODITY 정보를 AES 화면 COMMODITY에 불러오도록
	var formObj=document.frm1;
	if(formObj.f_save_flg.value == "R"){
		if(frm1.s_rep_cmdt_cd.value != ""){
			doWork("ADD_ROW1");
		}
	}
	
	doWork('SEARCH_VEHICLE');
}
/**
 * 전체 데이터 저장 완료시
 */
function sheet3_OnSaveEnd(sheetObj, errMsg) {
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	doWork("SEARCHLIST");
}
//화면의 select의 option을 database 값으로 셋팅한다.
function selectOptionSetting(){
	var formObj=document.frm1;
	//Transport Code
	if(formObj.s_h_trs_cd.value != ""){
		for(var i=0 ; i < formObj.s_trs_cd.length ; i++){
			if(formObj.s_trs_cd[i].value == formObj.s_h_trs_cd.value){
				formObj.s_trs_cd[i].selected=true;
				break;
			}
		}
	}else{
		formObj.s_trs_cd.value="40";
	}
	//Inbond Type
	if(formObj.s_h_ibd_tp.value != ""){
		for(var i=0 ; i < formObj.s_ibd_tp.length ; i++){
			if(formObj.s_ibd_tp[i].value == formObj.s_h_ibd_tp.value){
				formObj.s_ibd_tp[i].selected=true;
				break;
			}
		}
	} else {
		//52294 Default 값 설정 
		formObj.s_ibd_tp.value='70';
	}
	
	//Export Code
	if(formObj.s_h_exp_cd.value != ""){
		for(var i=0 ; i < formObj.s_exp_cd.length ; i++){
			if(formObj.s_exp_cd[i].value == formObj.s_h_exp_cd.value){
				formObj.s_exp_cd[i].selected=true;
				break;
			}
		}
	}else{
		formObj.s_exp_cd.value="OS";
	}
	//ID Type(USPPI)
	if(formObj.s_h_shp_tax_type.value != ""){
		formObj.s_shp_tax_type.value=formObj.s_h_shp_tax_type.value;	
	}
	//ID Type(Freight Forwarder)
	if(formObj.s_h_fwd_tax_type.value != ""){
		formObj.s_fwd_tax_type.value=formObj.s_h_fwd_tax_type.value;	
	}
	//License Type
	if(formObj.s_h_licen_tp.value != ""){
		for(var i=0 ; i < formObj.s_licen_tp.length ; i++){
			if(formObj.s_licen_tp[i].value == formObj.s_h_licen_tp.value){
				formObj.s_licen_tp[i].selected=true;
				formObj.s_licen_tp_nm.value=licenseTpArr[i];
				break;
			}
		}
	}else{
		for(var i=0 ; i < formObj.s_licen_tp.length ; i++){
			if(formObj.s_licen_tp[i].value == "C33"){
				formObj.s_licen_tp[i].selected=true;
				formObj.s_licen_tp_nm.value=licenseTpArr[i];
				break;
			}
		}
	}
	//DDTC USML Category
	if(formObj.s_h_ddtc_usml_cd.value != ""){
		for(var i=0 ; i < formObj.s_ddtc_usml_cd.length ; i++){
			if(formObj.s_ddtc_usml_cd[i].value == formObj.s_h_ddtc_usml_cd.value){
				formObj.s_ddtc_usml_cd[i].selected=true;
				formObj.s_ddtc_usml_nm.value=ddtcUsmlCdArr[i];
				break;
			}
		}
	}
	//DDTC Unit
	if(formObj.s_h_ddtc_pck_ut_cd.value != ""){
		for(var i=0 ; i < formObj.s_ddtc_pck_ut_cd.length ; i++){
			if(formObj.s_ddtc_pck_ut_cd[i].value == formObj.s_h_ddtc_pck_ut_cd.value){
				formObj.s_ddtc_pck_ut_cd[i].selected=true;
				formObj.s_ddtc_pck_ut_nm.value=ddtcUnitCdArr[i];
				break;
			}
		}
	}
	//DDTC Eligible Party Certification Indicator
	if(formObj.s_h_ddtc_prty_certi_flg.value != ""){
		formObj.s_ddtc_prty_certi_flg.value=formObj.s_h_ddtc_prty_certi_flg.value;	
	}else{
		formObj.s_ddtc_prty_certi_flg.value="N";	
	}
	//DDTC Significant Military Equip. Indicator
	if(formObj.s_h_ddtc_eq_flg.value != ""){
		formObj.s_ddtc_eq_flg.value=formObj.s_h_ddtc_eq_flg.value;	
	}else{
		formObj.s_ddtc_eq_flg.value="N";
	}
	
	//ult cnee type
	if(formObj.s_h_ult_cnee_tp.value != ""){
		for(var i=0 ; i < formObj.s_ult_cnee_tp.length ; i++){
			if(formObj.s_ult_cnee_tp[i].value == formObj.s_h_ult_cnee_tp.value){
				formObj.s_ult_cnee_tp[i].selected=true;				
				break;
			}
		}
	}
	
}
//화면의 checkbox를 database 값으로 셋팅한다.
function checkBoxSetting(){
	var formObj=document.frm1;
	//Routed Export Transaction
	if(formObj.s_rt_flg.value == "Y"){
		formObj.s_rt_flg.checked=true;
	}else{
		formObj.s_rt_flg.checked=false;
	}
	//Hazardous Material
	if(formObj.s_haz_flg.value == "Y"){
		formObj.s_haz_flg.checked=true;
	}else{
		formObj.s_haz_flg.checked=false;
	}
	//Company Related
	if(formObj.s_rcc_flg.value == "Y"){
		formObj.s_rcc_flg.checked=true;
	}else{
		formObj.s_rcc_flg.checked=false;
	}
}
//화면의 select를 선택하면 코드명의 값을 셋팅한다.
function flgChange(obj){
	if(obj.checked == true){
		obj.value="Y";
	}else{
		obj.value="N";
	}
}
function optChange(callFlg){
	var formObj=document.frm1;
	var idx=0;
	if(callFlg == "LICENSE_TP"){//License Type
		idx=formObj.s_licen_tp.selectedIndex;
		formObj.s_licen_tp_nm.value=licenseTpArr[idx];
	}else if(callFlg == "DDTC_USML"){//DDTC USML Category
		idx=formObj.s_ddtc_usml_cd.selectedIndex;
		formObj.s_ddtc_usml_nm.value=ddtcUsmlCdArr[idx];
	}else if(callFlg == "DDTC_UNIT"){//DDTC Unit
		idx=formObj.s_ddtc_pck_ut_cd.selectedIndex;
		formObj.s_ddtc_pck_ut_nm.value=ddtcUnitCdArr[idx];
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
var isRun = true;
function loadPage() {
	for(var i=0;isRun && i<docObjects.length;i++){
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
		if(i == docObjects.length - 1){
			isRun = false;
		}
	}

	var formObj=document.frm1;
	var shpPicNm=formObj.s_shp_pic_f.value;
	if(formObj.f_save_flg.value == "R" && shpPicNm != ""){
		var spaceIndex=shpPicNm.indexOf(" ");
		if(spaceIndex > 0){
			formObj.s_shp_pic_f.value=shpPicNm.substring(0, spaceIndex);
			formObj.s_shp_pic_l.value=shpPicNm.substring(spaceIndex+1);
		}
	}
	selectOptionSetting();
	checkBoxSetting();
	if(formObj.s_intg_bl_seq.value != ""){
		doWork("SEARCH_CMDT");
	}
	formObj.s_shp_zip.value=onlyNumberRtn (formObj.s_shp_zip.value) ;
	formObj.s_fwd_zip.value=onlyNumberRtn (formObj.s_fwd_zip.value) ;
	formObj.s_ult_cnee_zip.value=onlyNumberRtn (formObj.s_ult_cnee_zip.value) ;
	formObj.s_inter_cnee_zip.value=onlyNumberRtn (formObj.s_inter_cnee_zip.value) ;
	//OFVFOUR-7600: [Webtrans] AES filling error
	var opt_key = "ACE_AES_URL";
	ajaxSendPost(setAceAesUrl, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	//OFVFOUR-7821: [CBP] New ACE Portal
	var opt_key = "ACE_AES_URL_LOGIN";
	ajaxSendPost(setAceAesUrlLogin, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
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
		case 1:     //Commodity
			with (sheetObj) {

		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('AIE_BMD_0120_HDR1'), Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag1" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"aes_cmdt_seq" },
		             {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"del_chk" },
		             {Type:"Combo",     Hidden:0, Width:130,  Align:"Left",    ColMerge:0,   SaveName:"org_tp" },
		             {Type:"PopupEdit", Hidden:0, Width:140,  Align:"Left",    ColMerge:0,   SaveName:"cmdt_cd" },
		             {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:0,   SaveName:"cmdt_desc",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:45 },
		             {Type:"Int",       Hidden:0,  Width:110,   Align:"Right",   ColMerge:0,   SaveName:"pck_qty",       KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"pck_ut_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
		             {Type:"Int",       Hidden:0,  Width:110,   Align:"Right",   ColMerge:0,   SaveName:"pck_qty1",      KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"pck_ut_cd1",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
		             {Type:"Int",       Hidden:0,  Width:130,  Align:"Right",   ColMerge:0,   SaveName:"usd_val",       KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:13 },
		             {Type:"Int",       Hidden:0,  Width:110,   Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",       KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:13 },
		             {Type:"Text",      Hidden:0,  Width:80,  Align:"Right",   ColMerge:0,   SaveName:"eccn_no",       KeyField:0,   CalcLogic:"",   Format:"", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		             {Type:"Combo",      Hidden:0,  Width:50,  Align:"Right",   ColMerge:0,   SaveName:"pga_lic_flg",     KeyField:0,   CalcLogic:"",   Format:"", PointCount:0,   UpdateEdit:1,   InsertEdit:1, DefaultValue:'N' }];
		       
		      InitColumns(cols);
		      SetEditable(1);
		      SetColProperty('org_tp', {ComboText:orgTpNm, ComboCode:orgTpCd} );
		      SetColProperty('pga_lic_flg', {ComboText:'N|Y', ComboCode:'N|Y'} );
		      SetSheetHeight(200);
	            
			}
		break;
		case 2:     //Vehicle
			with (sheetObj) {
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('AIE_BMD_0120_HDR2'), Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag2" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"aes_vhc_seq" },
		             {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"del_chk" },
		             {Type:"Combo",     Hidden:0, Width:130,  Align:"Left",    ColMerge:0,   SaveName:"vhc_id_tp",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
		             {Type:"Text",      Hidden:0,  Width:110,   Align:"Left",    ColMerge:0,   SaveName:"vhc_id",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:25 },
		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"vhc_ttl",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Text",      Hidden:0,  Width:110,   Align:"Left",    ColMerge:0,   SaveName:"vhc_ttl_state",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 } ];
		       
		      InitColumns(cols);
	
		      SetCountPosition(0);
		      SetEditable(1);
		      SetColProperty('vhc_id_tp', {ComboText:vhcIdTpNm, ComboCode:vhcIdTpCd} );
		      SetSheetHeight(267);
			}
		break;
		case 3:     //Hidden
			with (sheetObj) {

	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:"ibflag", Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag3" } ];
	         
	        InitColumns(cols);

	        SetCountPosition(0);
	        SetEditable(1);
			}
		break;
	}
}
/**
 * IBSeet내의 데이터 셀에서 키보드가 눌린 경우 발생하는 Event<br>
 * @param {sheetObj} String : 해당 IBSheet Object
 * @param {row} Long : 해당 셀의 row Index
 * @param {col} Long : 해당 셀의 Column Index
 * @param {keyCode} Integer : 키보드의 아스키 값
 */
function sheet1_OnKeyDown(sheetObj, row, col, keyCode) {
	switch (sheetObj.ColSaveName(col)) {
		case "pck_qty":
		case "pck_qty1":
		case "usd_val":
		case "grs_wgt":
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="pga_lic_flg"){
		doWork('ADD_ROW1');
		sheetObj.SelectCell(row+1, 2); 
	}
}

function sheet2_OnKeyDown(sheetObj, row, col, keyCode) {
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="vhc_ttl_state"){
		doWork('ADD_ROW2');
		sheetObj.SelectCell(row+1, 2); 
	}
}

function COUNTRY_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_cnt_cd.value=rtnValAry[0];//cnt_cd
		formObj.s_cnt_nm.value=rtnValAry[1];//cnt_eng_nm
	} 
}

function STATE_POPLIST2(rtnVal){
	var formObj = document.frm1;
	if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
    	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_state_cd.value=rtnValAry[0];//cd_val
		formObj.s_state_nm.value=rtnValAry[1];//cnt_eng_nm
	}
}

function LOCATION(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
		else{
		var curObjId=curObj.id;
		var rtnValAry=rtnVal.split("|");
		if(curObjId == "pol"){
			if(rtnValAry[0]==''){
				formObj.s_pol_cd.focus();
			}else{
				formObj.s_pol_cd.value=rtnValAry[3];//loc_cd 
				formObj.s_pol_nm.value=rtnValAry[2];//loc_nm
			}
		}else if(curObjId == "pod"){
			if(rtnValAry[0]==''){
				formObj.s_pod_cd.focus();
			}
			else{
				formObj.s_pod_cd.value=rtnValAry[3];//loc_cd
				formObj.s_pod_nm.value=rtnValAry[2];//loc_nm
			}
		}
	} 
}
function validateValue(obj) {
    var formObj = document.getElementById(obj.id);
    for(var i=0; i<formObj.value.length; i++){
    	var filter = /[0-9a-zA-Z#+()\-\_]/;
    	if(!filter.test(formObj.value[i])) {
            //ComShowCodeMessage("COM0457","This fields");
    	 	formObj.value="";
    	 	return;
    	}
    }
} 
//OFVFOUR-7600: [Webtrans] AES filling error
function setAceAesUrl(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1]!=""){
			frm3.action=doc[1];
		}
	}
}
//OFVFOUR-7821: [CBP] New ACE Portal
function setAceAesUrlLogin(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1]!=""){
			document.getElementById("ace_login_url").href=doc[1];
			$("#ace_login_url button").prop("disabled",false);
		}
	}
}