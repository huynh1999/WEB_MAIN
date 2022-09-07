var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    var sheetObj4=docObjects[3];
    var sheetObj5=docObjects[4];
    /*
    var sheetObj6=docObjects[5];
    var sheetObj7=docObjects[6];
    var sheetObj8=docObjects[7];
    */
    var formObj=document.frm1;
    switch(srcName) {
    	case "NEW":
    		frm1.val_msg.value = "";
			clearForm();
	        sheetObj.RemoveAll();
    	   	sheetObj2.RemoveAll();
    	   	sheetObj3.RemoveAll();
    	   	sheetObj4.RemoveAll();
    	   	sheetObj5.RemoveAll();
    	   	setDefaultParty(frm1.f_isf_tp.value);
	   	break;
       case "SEARCHLIST":
    	   frm1.val_msg.value = "";
    	   if(frm1.f_isf_no_ret.value==''){
    		   alert(CM_MSG5);
    		   return;
    	   }else{
               frm1.f_cmd.value=SEARCHLIST;
        	   doShowProcess();
        	   //frm1.submit();
        	   submitForm(SEARCHLIST);
    	   }
    	   sheetObj.RemoveAll();
    	   sheetObj2.RemoveAll();
    	   sheetObj3.RemoveAll();
    	   sheetObj4.RemoveAll();
    	   sheetObj5.RemoveAll();
	   break;
       case "SEARCHLIST01":
    	   formObj.f_cmd.value=SEARCHLIST01;
           sheetObj.DoSearch("./EDI_ISF_0010GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST02":
           formObj.f_cmd.value=SEARCHLIST02;
           sheetObj2.DoSearch("./EDI_ISF_0010_1GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST03":
           formObj.f_cmd.value=SEARCHLIST03;
           sheetObj3.DoSearch("./EDI_ISF_0010_2GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST04":
           formObj.f_cmd.value=SEARCHLIST04;
           sheetObj4.DoSearch("./EDI_ISF_0010_3GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST05":
           formObj.f_cmd.value=SEARCHLIST05;
           //alert(sheetObj4.CellValue(sheetObj4.SelectRow, "snd_seq"));
           formObj.f_snd_seq.value=sheetObj4.GetCellValue(sheetObj4.GetSelectRow(), "snd_seq")
           sheetObj5.DoSearch("./EDI_ISF_0010_4GS.clt", FormQueryString(formObj) );
       break;
       case "IMPORTER":	//openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   	rtnary=new Array(3);
    	    rtnary[0]="";
    	    rtnary[1]=formObj.f_isf_imp_name.value;
    	    rtnary[2]=window;
    	    callBackFunc = "IMPORTER";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	        
          	break;
      case "BOND":	//openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(3);
		   		rtnary[0]="1";
		   		rtnary[1]=formObj.f_isf_bond_name.value;
		   		rtnary[2]=window;
		   		callBackFunc = "BOND";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		   	
		   		break;
		   		
       case "TRANS_ADD":
    	   var rowCnt=0; 
    	   //rowCnt = sheetObj.DataInsert(-1);
       break;
       case "BL_ADD":
    	   var rowCnt=0; 
    	   rowCnt=sheetObj.DataInsert(-1);
       break;
       case "PARTY_ADD":
    	   	
    	   if(formObj.f_isf_tp.value == "1") { // isf-10
    		    var rowCnt=0; 
	    	   	rowCnt=sheetObj2.DataInsert(-1);
	    	   	for(var i=2; i<sheetObj2.RowCount()+2; i++){
	    	   		sheetObj2.SetCellValue(i, "entt_seq",i-1);
	    	   		if(i==sheetObj2.RowCount()+1){
	    	   			sheetObj2.SetCellEditable(i, "party_del",1);
	    	   		}
	    	   	}
    	   }
       break;
       case "HTS_ADD":
       		var cntMF=0;
       		var enttSeqMF=0;
       		for(var i=2; i<sheetObj2.RowCount()+2; i++){
       			if(sheetObj2.GetCellValue(i, "entt_cd") == "MF"){
       				cntMF++;
       				enttSeqMF=sheetObj2.GetCellValue(i, "entt_seq");
       			}
       		}
    	   	var rowCnt=0; 
    	   	if(formObj.f_isf_tp.value == "1") { // isf-10
	    	   	if(cntMF == 1){
	    	   		var rowCnt=0; 
    	   			rowCnt=sheetObj3.DataInsert(-1);
					sheetObj3.SetCellValue(sheetObj3.RowCount(), "party_entt_seq",enttSeqMF);
	    	   	}else if(sheetObj2.GetCellValue(sheetObj2.GetSelectRow(), "entt_cd") == "MF"){
	    	   		var rowCnt=0; 
    	   			rowCnt=sheetObj3.DataInsert(-1);
    	   			sheetObj3.SetCellValue(sheetObj3.RowCount(), "party_entt_seq",sheetObj2.GetCellValue(sheetObj2.GetSelectRow(), "entt_seq"));
	    	   	}else{
	    	   		return;
	    	   	}
    	   	}else if(formObj.f_isf_tp.value == "2"){	// isf-5
    	   		rowCnt=sheetObj3.DataInsert(-1);
    	   		sheetObj3.SetCellValue(sheetObj3.RowCount(), "party_entt_seq",0);
    	   	}
       break;
       case "SAVE":
    	   frm1.val_msg.value = "";
       		if(frm1.f_msg_sts.value == 'S'){
       			alert("You can't save ISF data When Status is Sent !");
       			return;
       		}
		    if(formObj.f_isf_no.value == ""){
		    	formObj.f_cmd.value=ADD;
		    }else{
		    	formObj.f_cmd.value=MODIFY;
		    }
	    	var sht2=sheetObj2.GetSaveString(true);
		    var sht3=sheetObj3.GetSaveString(true);
		    doShowProcess();
			sheetObj.DoAllSave("EDI_ISF_0010GS.clt", FormQueryString(formObj) +'&'+sht2+'&'+sht3,true);
       break;	
       	case "TRANSMIT":
       		frm1.val_msg.value = "";
			if(frm1.f_isf_no.value == ""){
		 		alert("Please Transmit After Retrieve !");
		 		return;					 
			}       		
			if((frm1.f_isf_act_cd.value =="R" || frm1.f_isf_act_cd.value =="D" ) && frm1.f_isf_trac_no.value ==""){
		 		alert('Case when Action Type is [Delete],[Replace] then \nTransction No is Mandatory!');
		 		return;					 	
		 	}
		 	if(frm1.f_isf_act_cd.value =="A" && frm1.f_isf_trac_no.value !=""){
		 		alert("Case when Action Type is [Add] then \nTransction No is empty Only!");
		 		return;					 	
		 	}		 	
		 	
		 	if(!transmitValidation()){
				return;
			}
			
			
			if(confirm("ISF Info Transmit?") == false){ return; }	
			var sht1=sheetObj.GetSaveString(true);
			var sht2=sheetObj2.GetSaveString(true);
			var sht3=sheetObj3.GetSaveString(true);
			if( ( frm2.f_frm1_str.value.substring(frm2.f_frm1_str.value.indexOf("&")) !=  FormQueryString(formObj).substring(frm2.f_frm1_str.value.indexOf("&")) )
					|| ( frm2.f_sht1_str.value != sht1) 
					|| (frm2.f_sht2_str.value  != sht2) 
					|| (frm2.f_sht3_str.value  != sht3) ){	
				formObj.f_cmd.value=COMMAND02;	//변경내용 저장 후 전송
			}else{
				formObj.f_cmd.value=COMMAND01; 
			}
			frm1.f_msg_sts.value='S';
	        sheetObj.DoAllSave("./EDI_ISF_0010GS.clt", FormQueryString(formObj) +'&'+sht2+'&'+sht3,true);
       break;
	   case "DELETE":
		   frm1.val_msg.value = "";
	   		if(frm1.f_msg_sts.value == "C"){
	   			if(confirm("Do you want to delete?") == false){ return; }
	   			formObj.f_cmd.value=REMOVE;
	       		sheetObj.DoAllSave("EDI_ISF_0010GS.clt", FormQueryString(formObj) ,true);
	   		}else{
	   			alert("You can only delete file when Status is 'Created'. Once 'Sent' or 'Accepted', it cannot be deleted.");
	   			return;
	   		}
		break;
    }
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_isf_no_ret.value = getParam(url,"f_isf_no_ret");
	
	doWork('SEARCHLIST');
}

function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./EDI_ISF_0010AJ.clt",
		   dataType: 'xml',
		   data: {f_cmd: cmd, f_isf_no_ret: formObj.f_isf_no_ret.value },
		   success: function(data){
			   setFieldValue( formObj.f_hbl_no, $('hbl_no',data).text());
			   setFieldValue( formObj.f_cnee_trdp_cd, $('cnee_trdp_cd',data).text());
			   setFieldValue( formObj.f_cnee_eng_nm, $('cnee_eng_nm',data).text());
			   setFieldValue( formObj.f_cnee_lgl_addr, $('cnee_lgl_addr',data).text());
			   setFieldValue( formObj.f_cnee_biz_no, $('cnee_biz_no',data).text());
			   setFieldValue( formObj.f_cnee_tax_type, $('cnee_tax_type',data).text());
			   setFieldValue( formObj.f_cnee_state_cd, $('cnee_state_cd',data).text());
			   setFieldValue( formObj.f_cnee_city_nm, $('cnee_city_nm',data).text());
			   setFieldValue( formObj.f_cnee_rep_zip, $('cnee_rep_zip',data).text());
			   setFieldValue( formObj.f_cnee_cnt_cd, $('cnee_cnt_cd',data).text());
			   setFieldValue( formObj.f_cnee_cnt_nm, $('cnee_cnt_nm',data).text());
			   setFieldValue( formObj.f_hbl_tp_cd, $('hbl_tp_cd',data).text());
			   setFieldValue( formObj.f_isf_no_ret, $('isf_no',data).text());
			   setFieldValue( formObj.f_isf_no, $('isf_no',data).text());
			   setFieldValue( formObj.f_isf_trac_no, $('isf_trac_no',data).text());
			   setFieldValue( formObj.f_rgst_tms, $('rgst_tms',data).text());
			   setFieldValue( formObj.f_rgst_usrid, $('rgst_usrid',data).text());
			   setFieldValue( formObj.f_modi_usrid, $('modi_tms',data).text());
			   setFieldValue( formObj.f_modi_tms, $('modi_usrid',data).text());
			   setFieldValue( formObj.f_mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.f_isf_etd, $('isf_etd',data).text());
			   setFieldValue( formObj.f_isf_eta, $('isf_eta',data).text());
			   setFieldValue( formObj.f_isf_scac, $('isf_scac',data).text());
			   setFieldValue( formObj.f_isf_vessel, $('isf_vessel',data).text());
			   setFieldValue( formObj.f_isf_voyage, $('isf_voyage',data).text());
			   setFieldValue( formObj.f_ref_no_6c, $('ref_no_6c',data).text());
			   setFieldValue( formObj.f_isf_pol_cd, $('isf_pol_cd',data).text());
			   setFieldValue( formObj.f_isf_pol_name, $('isf_pol_name',data).text());
			   setFieldValue( formObj.f_isf_pod_cd, $('isf_pod_cd',data).text());
			   setFieldValue( formObj.f_isf_pod_name, $('isf_pod_name',data).text());
			   setFieldValue( formObj.f_del, $('del',data).text());
			   setFieldValue( formObj.f_isf_del_nm, $('isf_del_name',data).text());
			   setFieldValue( formObj.f_fpod, $('fpod',data).text());
			   setFieldValue( formObj.f_fpod_name, $('isf_fpod_name',data).text());
			   //setFieldValue( formObj.f_isf_imp_cd, $('isf_imp_cd',data).text());
			   //setFieldValue( formObj.f_isf_imp_name, $('isf_imp_name',data).text());
			   //setFieldValue( formObj.f_isf_imp_no, $('isf_imp_no',data).text());
			   //setFieldValue( formObj.f_isf_cntry_cd, $('isf_cntry_cd',data).text());
			   //setFieldValue( formObj.f_isf_imp_dob, $('isf_imp_dob',data).text());
			   setFieldValue( formObj.f_isf_bond_cd, $('isf_bond_cd',data).text());
			   setFieldValue( formObj.f_isf_bond_name, $('isf_bond_name',data).text());
			   setFieldValue( formObj.f_isf_bond_holder, $('isf_bond_holder',data).text());
			   setFieldValue( formObj.f_ref_no_v1, $('ref_no_v1',data).text());
			   setFieldValue( formObj.f_ref_no_sbn, $('ref_no_sbn',data).text());
			   setFieldValue( formObj.f_infm_est_quan, $('infm_est_quan',data).text());
			   setFieldValue( formObj.f_infm_unit_mea, $('infm_unit_mea',data).text());
			   setFieldValue( formObj.f_infm_est_value, $('infm_est_value',data).text());
			   setFieldValue( formObj.f_infm_est_wgt, $('infm_est_wgt',data).text());
			   setFieldValue( formObj.f_file_nm, $('f_party_cd',data).text());
			   setFieldValue( formObj.f_ref_no, $('f_party_cd',data).text());
			   setFieldValue( formObj.f_cr_no, $('f_party_cd',data).text());
			   setFieldValue( formObj.msg_desc, $('desc',data).text());
			   setFieldValue( formObj.f_isf_tp, $('isf_tp',data).text());
			   setFieldValue( formObj.f_msg_sts, $('msg_sts',data).text());
			   setFieldValue( formObj.f_isf_act_cd, $('isf_act_cd',data).text());
			   //setFieldValue( formObj.f_isf_act_reason, $('isf_act_reason',data).text());
			   setFieldValue( formObj.f_isf_ship_tp, $('isf_ship_tp',data).text());
			   setFieldValue( formObj.f_isf_trans_mode, $('isf_trans_mode',data).text());
			   //setFieldValue( formObj.f_isf_imp_qual, $('isf_imp_qual',data).text());
			   setFieldValue( formObj.f_isf_bond_act_cd, $('isf_bond_act_cd',data).text());
			   setFieldValue( formObj.f_isf_bond_tp, $('f_isf_bond_tp',data).text());
			   
			   //doBtnAuthority(attr_extension);
			   loadData();
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}

function clearForm(){
	for(var i=0; i<frm1.elements.length; i++){
		frm1.elements[i].value='';
	}
	frm1.f_isf_tp.selectedIndex=0;
	frm1.f_isf_act_cd.selectedIndex=0;
	//frm1.f_isf_act_reason.selectedIndex=0;
	frm1.f_isf_ship_tp.selectedIndex=0;
}
function loadData(){
	var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
	if(frm1.f_isf_no_ret.value != ""){
		doWork("SEARCHLIST01");
		doWork("SEARCHLIST02");
		doWork("SEARCHLIST03");
		doWork("SEARCHLIST04");
		//doWork("SEARCHLIST05");
	}
	if(frm1.f_isf_no_ret.value == "" && frm1.f_hbl_no.value != ""){
		sheetObj.DataInsert(-1);
		sheetObj.SetCellValue(1, "bl_no",frm1.f_hbl_no.value);
	}
	setInformal(frm1.f_isf_ship_tp.value);
	if(frm1.f_isf_no.value == ""){
		setDefaultParty(frm1.f_isf_tp.value);
		setPartyData();
		if(frm1.f_hbl_tp_cd.value == "DR" || frm1.f_hbl_tp_cd.value == "FW" || frm1.f_hbl_tp_cd.value == "DT"){
			sheetObj.SetCellValue(1, "bl_tp","OB");//Direct B/L 일 경우 Ocean B/L
		}
	}else{
		frm2.f_frm1_str.value=FormQueryString(frm1);
		frm2.f_sht1_str.value=sheetObj.GetSaveString(true);
		frm2.f_sht2_str.value=sheetObj2.GetSaveString(true);
		frm2.f_sht3_str.value=sheetObj3.GetSaveString(true);
	}	
	
	var docSts = frm1.f_msg_sts.value;
	if(docSts != ''){
		frm1.f_isf_tp.disabled=true;
	}
}
function setPartyData(){
	//Importer Copy
	/*
	frm1.f_isf_imp_cd.value=frm1.f_cnee_trdp_cd.value;
	frm1.f_isf_imp_name.value=frm1.f_cnee_eng_nm.value;
	if(frm1.f_cnee_tax_type.value == "E" || frm1.f_cnee_tax_type.value == "EI"){
		frm1.f_isf_imp_qual.value="EI";
		frm1.f_isf_imp_no.value=frm1.f_cnee_biz_no.value; 
	}
	*/
	//Bond Holder Copy
	frm1.f_isf_bond_cd.value=frm1.f_cnee_trdp_cd.value;
	frm1.f_isf_bond_name.value=frm1.f_cnee_eng_nm.value;
	frm1.f_isf_bond_holder.value=frm1.f_cnee_biz_no.value;
	frm1.f_isf_bond_act_cd.value="01";
	frm1.f_isf_bond_tp.value="8";
	//Party Detail Copy (CN, IM)
	var sheetObj2=docObjects[1];
	for(var i=2; i<sheetObj2.RowCount()+2; i++){
		enttCd=sheetObj2.GetCellValue(i,"entt_cd");
		if(enttCd == "IM" || enttCd == "CN"){
			sheetObj2.SetCellValue(i,"party_cd",frm1.f_cnee_trdp_cd.value,0);
			sheetObj2.SetCellValue(i,"entt_name",frm1.f_cnee_eng_nm.value,0);
			if(frm1.f_cnee_tax_type.value == "E" || frm1.f_cnee_tax_type.value == "EI"){
				sheetObj2.SetCellValue(i,"entt_id_qual","EI",0);
				sheetObj2.SetCellValue(i,"entt_id",frm1.f_cnee_biz_no.value,0);
			}
			sheetObj2.SetCellValue(i, "add_zip_cd",frm1.f_cnee_rep_zip.value,0);
			sheetObj2.SetCellValue(i, "add_cntry",frm1.f_cnee_cnt_cd.value,0);
			sheetObj2.SetCellValue(i, "add_cntry_nm",frm1.f_cnee_cnt_nm.value,0);
			//Address 
			sheetObj2.SetCellValue(i, "add_info",frm1.f_cnee_lgl_addr.value,0);
			//City
			sheetObj2.SetCellValue(i, "add_ct",frm1.f_cnee_city_nm.value,0);
			sheetObj2.SetCellValue(i, "add_cntry_sub",frm1.f_cnee_state_cd.value,0);
		}
	}
}
function sheet1_OnSaveEnd(obj, ErrMsg){
	
	var sheet1=docObjects[0];
	doHideProcess();
	if(frm1.f_cmd.value == REMOVE){
		doWork("NEW")	;
	}
	
	var isfNo = sheet1.GetEtcData("isf_no");
	if(isfNo !=''){
		frm1.f_isf_no_ret.value	= isfNo;
		frm1.f_isf_no.value		= isfNo;
		doWork("SEARCHLIST")	;
	}
		
	
	
}
function transmitValidation(){
	var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    
    var valMsgArr = new Array();
    
	if(frm1.f_isf_trac_no.value == '' && (frm1.f_isf_act_cd.value == 'D' || frm1.f_isf_act_cd.value == 'R' ) ){
		valMsgArr.push(getLabel('EDI_COM_ALT257'));
	}
	if(frm1.f_isf_tp.value == "2") { // isf-5일때만 필수 
		if(frm1.f_fpod.value == ""){
			valMsgArr.push(getLabel('EDI_COM_ALT258'));
		}
		if(frm1.f_del.value == ""){
			valMsgArr.push(getLabel('EDI_COM_ALT259'));
		}
		if(frm1.f_isf_ship_tp.value != "01"){
			valMsgArr.push(getLabel('EDI_COM_ALT260'));
		}			
	}
	/*
	if(!(frm1.f_isf_ship_tp.value == "03" || frm1.f_isf_ship_tp.value == "05" || frm1.f_isf_ship_tp.value == "06") ) { 
		if (frm1.f_isf_imp_qual.value == "AEF") {
			alert("Case when Shipment type is not '[03],[05],[06]' then \nID Qualifier Info is not Passport Number!");
			goTabSelect('01');
			frm1.f_isf_imp_qual.focus();
			return false;
		}
	}
	if(frm1.f_isf_ship_tp.value == "03" ) { 
		if (frm1.f_isf_imp_qual.value == "2") {
			alert("Case when Shipment type is '[03]' then \nID Qualifier Info is not Standard Carrier Alpha Code(SCAC)!");
			goTabSelect('01');
			frm1.f_isf_imp_qual.focus();
			return false;
		}
	}
	if(frm1.f_isf_tp.value == "1"){	
		if (frm1.f_isf_imp_qual.value == "2") {
			alert("Case when ISF Type is 'ISF-10' then \nID Qualifier Info is not Standard Carrier Alpha Code!");
			goTabSelect('01');
			frm1.f_isf_imp_qual.focus();
			return false;
		}
	}
	*/
	/*
	if (frm1.f_isf_imp_qual.value == "AEF") {
		if (frm1.f_isf_cntry_cd.value == "") {
			alert("Case when ID Qualifier is '[AEF]' then \nCountry of iss Info is Mandatory!");
			goTabSelect('01');
			frm1.f_isf_cntry_cd.focus();
			return false;
		}
		if (frm1.f_isf_imp_dob.value == "") {
			alert("Case when ID Qualifier is '[AEF]' then \nDate of birth Info is Mandatory!");
			goTabSelect('01');
			frm1.f_isf_imp_dob.focus();
			return false;
		}			
	} else {
		if(frm1.f_isf_cntry_cd.value != "") {
			alert("Case when ID Qualifier is not '[AEF]' then \nCountry of iss Info is empty only!");
			goTabSelect('01');
			frm1.f_isf_cntry_cd.focus();
			return false;
		}
		if(frm1.f_isf_imp_dob.value != "") {
			alert("Case when ID Qualifier is not '[AEF]' then \nDate of birth Info is empty only!");
			goTabSelect('01');
			frm1.f_isf_imp_dob.focus();
			return false;
		}			
	}
	*/
	if(frm1.f_isf_ship_tp.value == "06"){ // Carnet
		if(frm1.f_ref_no_6c.value == ""){ 
			valMsgArr.push(getLabel('EDI_COM_ALT261'));
		}
	} else {
	    if (frm1.f_ref_no_6c.value != "") {
			valMsgArr.push(getLabel('EDI_COM_ALT262'));
		}
	}
	/*
	if(frm1.f_isf_imp_qual.value == ""){
		alert("ID Qualifier(for Importer) is Mandatory!");
		goTabSelect('01');
		frm1.f_isf_imp_qual.focus();
		return false;
	}
	if(frm1.f_isf_imp_no.value == ""){
		alert("Importer No Info is Mandatory!");
		goTabSelect('01');
		frm1.f_isf_imp_no.focus();
		return false;
	}
	*/
	if(frm1.f_isf_act_cd.value == "A" || frm1.f_isf_act_cd.value == "R" ){
		if(frm1.f_isf_ship_tp.value == "01" || frm1.f_isf_ship_tp.value == "02" || frm1.f_isf_ship_tp.value == "07" || frm1.f_isf_ship_tp.value == "08"  || frm1.f_isf_ship_tp.value == "10"){
			if(frm1.f_isf_bond_holder.value == ""){
			    valMsgArr.push(getLabel('EDI_COM_ALT263'));
			}	
			if(frm1.f_isf_bond_act_cd.value == ""){
			    valMsgArr.push(getLabel('EDI_COM_ALT264'));
			}	
			if(frm1.f_isf_bond_tp.value == ""){
			    valMsgArr.push(getLabel('EDI_COM_ALT265'));
			}									
		}
	}
	if(frm1.f_isf_bond_act_cd.value != "16"){
		if(frm1.f_isf_bond_tp.value == "9"){
			valMsgArr.push(getLabel('EDI_COM_ALT266'));
		}
	}		
	if(frm1.f_isf_bond_act_cd.value == "16" && frm1.f_isf_bond_tp.value == "9" ){
		if(frm1.f_ref_no_v1.value == ""){	
			valMsgArr.push(getLabel('EDI_COM_ALT267'));
		} 
		if(frm1.f_ref_no_sbn.value == ""){
			valMsgArr.push(getLabel('EDI_COM_ALT268'));
		}				
	} else {
		if(frm1.f_ref_no_v1.value != ""){
			valMsgArr.push(getLabel('EDI_COM_ALT269'));
		}
		if(frm1.f_ref_no_sbn.value != ""){
			valMsgArr.push(getLabel('EDI_COM_ALT270'));
		}	
	}
	/*
	if(frm1.f_isf_imp_name.value.length > 35){
		alert("Importer Party Name max Length is 35 characters !");
		goTabSelect('01');
		frm1.f_isf_imp_name.focus();
		return false;
	}
	*/
	if(frm1.f_isf_bond_name.value.length > 35){
		valMsgArr.push(getLabel('EDI_COM_ALT271'));
	}
	// B/L Info : Validation
	if(sheetObj.RowCount()== 0){
		valMsgArr.push(getLabel('EDI_COM_ALT272'));
	}
	for(var i=1; i<sheetObj.RowCount()+1; i++){
		if(sheetObj.GetCellValue(i,"bl_tp") == "" ){
			valMsgArr.push("BL Info Row["+i+"] : Type is Mandatory!");
		}
		if(sheetObj.GetCellValue(i,"bl_no") == "" ){
			valMsgArr.push("BL Info Row["+i+"] : B/L No is Mandatory!");
		}
		/*
		if(sheetObj.GetCellValue(i,"bl_tp") == "BM" && sheetObj.GetCellValue(i,"bl_scac") == "" ){
			alert("BL Info Row["+i+"] : SCAC is Mandatory When BL Type is [BM]!" );
			goTabSelect('01');
			return false;
		}
		if(sheetObj.GetCellValue(i,"bl_no").length + sheetObj.GetCellValue(i,"bl_scac").length > 16 ){
			alert("BL Info Row["+i+"] : AMS B/L No(include SCAC) Max Length is 16 characters!" );
			goTabSelect('01');
			return false;
		}
		*/
	}
	/*		ID Qualifier
	EI	Employer Identification Number (IRS#)
	ANI	CBP-assigned Number for Consignee
	CIN	CBP encrypted Consignee ID
	34	Social Security Number
	DUN	DUNS Number
	DNS	DUNS+4 Number
	FR	Facility Information Resource Management System (FIRMS) Code
	AEF	Passport Number
	*/
	// Party Info
	var importerCnt=0;
	var enttCd="";
	var enttIdQual="";
	var enttId="";
	
	for(var i=2; i<sheetObj2.RowCount()+2; i++){
		enttCd		=	sheetObj2.GetCellValue(i,"entt_cd");
		enttIdQual	=	sheetObj2.GetCellValue(i,"entt_id_qual");
		enttId		=	sheetObj2.GetCellValue(i,"entt_id");
		if(enttCd == ""){
			valMsgArr.push("Party Info Row["+(i-1)+"] : Type is Mandatory!");
		}	
		if(sheetObj2.GetCellValue(i,"entt_name").length > 35 /* && enttIdQual == "" */){
			valMsgArr.push("Party Info Row["+(i-1)+"] : Party Name Max length is 35 characters!");
		}
		if(enttIdQual !=  ""){
			var msg=chkEnttIdFormat(enttIdQual, enttId);
			if(msg != ""){
				valMsgArr.push("Party Info Row["+(i-1)+"] : " + msg);
			}
		}
		if(enttCd == "IM") {
			importerCnt++;
		}
		
		if(enttCd == "IM" ||enttCd == "CN") {
			if(enttIdQual == ""){
				valMsgArr.push("Party Info Row["+(i-1)+"] : ID Qualifier is Mandatory!");
			}else if(enttIdQual == "AEF" && !( frm1.f_isf_ship_tp.value =="03" || frm1.f_isf_ship_tp.value =="05" || frm1.f_isf_ship_tp.value =="06" ) ){	//Passport Number 일 경우, Shpimment Type이 03, 05, 06 만 가능
				valMsgArr.push("Party Info Row["+(i-1)+"] : This qualifier may only be used with Shpimment Type 03, 05, 06 !");
			}else if(!(enttIdQual == "EI" || enttIdQual == "ANI" || enttIdQual == "CIN" || enttIdQual == "34" || enttIdQual == "AEF")){
				valMsgArr.push("Party Info Row["+(i-1)+"] : This qualifier may only be used with Entity Codes MF, SE, BY, ST, LG, CS, or BKP !");
			}
			if(enttId == ""){
				valMsgArr.push("Party Info Row["+(i-1)+"] : ID No is Mandatory!");
			}
		}else{
			if(enttIdQual == ""){
				if(sheetObj2.GetCellValue(i,"entt_name") == ""){
					valMsgArr.push("Party Info Row["+(i-1)+"] : Party Name is Mandatory!");
				}
				if(sheetObj2.GetCellValue(i,"add_info") == ""){
					valMsgArr.push("Party Info Row["+(i-1)+"] : Address is Mandatory!");
				}
				if(sheetObj2.GetCellValue(i,"add_ct") == ""){
					valMsgArr.push("Party Info Row["+(i-1)+"] :City is Mandatory!");
				}	
				if(sheetObj2.GetCellValue(i,"add_cntry") == ""){
					valMsgArr.push("Party Info Row["+(i-1)+"] : Country is Mandatory!");
				}	
				if(sheetObj2.GetCellValue(i,"add_info").length > 105){
					valMsgArr.push("Party Info Row["+(i-1)+"] :  Address Max length is 105 characters!");
				}
				
			}else{
				if(enttCd == "BY" || enttCd == "SE"){
					if(enttIdQual == "FR"){
						valMsgArr.push("Party Info Row["+(i-1)+"] : This qualifier may only be used with Entity Codes ST !");
					}else if(enttIdQual == "AEF"){
						valMsgArr.push("Party Info Row["+(i-1)+"] : This qualifier may only be used with Entity Codes IM, CN !");
					}
				}
				if(enttCd == "MF" || enttCd == "LG" || enttCd == "CS" || enttCd == "BKG"){
					if(!(enttIdQual == "DUN" || enttIdQual == "DNS")){
						valMsgArr.push("Party Info Row["+(i-1)+"] : This qualifier may only be used with Entity Codes IM, CN, BY, SE ,ST !");
					}
				}
				if(enttCd == "ST"){
					if(!(enttIdQual == "DUN" || enttIdQual == "DNS"  || enttIdQual == "FR")){
						valMsgArr.push("Party Info Row["+(i-1)+"] : This qualifier may only be used with Entity Codes IM, CN, BY, SE !");
					}
				}
				if(frm1.f_isf_tp.value == "2"){ //ISF-5
					if(!(enttCd == "IM" || enttCd == "ST" || enttCd == "BKP")){
						valMsgArr.push("Party Info Row["+(i-1)+"] : Type is error!(Only Importer or Ship To Party or Booking Party!");
					}
				}
				if(enttId == ""){
					valMsgArr.push("Party Info Row["+(i-1)+"] : ID No is Mandatory!");
				}
			}			
		}
	}
	if(importerCnt >= 2) { // type 이 2개 이상 안들어감.
		valMsgArr.push(getLabel('EDI_COM_ALT273'));
	}	
	// HTS Info
	
	if(sheetObj3.RowCount()== 0 ){
    	valMsgArr.push(getLabel('EDI_COM_ALT274'));
    }
    if(frm1.f_msg_sts.value == 'S'){
    	valMsgArr.push(getLabel('EDI_COM_ALT275'));
    }
	
	for(var i=1; i<sheetObj3.RowCount()+1; i++){
		if(sheetObj3.GetCellValue(i,"hts_cd") == ""){
			valMsgArr.push("HTS Detail Info Row["+i+"] : HTS Code is Mandatory!");
		}
		if(sheetObj3.GetCellValue(i,"cntry_org") == ""){
			valMsgArr.push("HTS Detail Info Row["+i+"] : Country of Origin is Mandatory!");
		}
		if(sheetObj3.GetCellValue(i,"hts_cd").length != 6 && sheetObj3.GetCellValue(i,"hts_cd").length != 8 && sheetObj3.GetCellValue(i,"hts_cd").length != 10){
			valMsgArr.push("HTS Detail Info Row["+i+"] : HTS Code Length is 6 or 8 or 10!");
		}
	}		
	
	if(valMsgArr.length > 0){
    	frm1.val_msg.value = "";
    	for(var i=0; i<valMsgArr.length; i++){
    		frm1.val_msg.value += ((i+1) + ". " + valMsgArr[i] + "\n");
	    }
    	disp_val_msg.style.display='inline';
    	return false;
    }
	return true;			
}
//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	var tabObjs=document.getElementsByName('tabLayer');
	if( isNumSep == "01" ) {
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.display='inline';
		tabObjs[1].style.display='none';
		tabObjs[2].style.display='none';
		//스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
		//탭
	} else if( isNumSep == "02" ) {
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.display='none';
		tabObjs[1].style.display='inline';
		tabObjs[2].style.display='none';
		//Default Party Info Setting
		//setDefaultParty(frm1.f_isf_tp.value);
		//스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
		// 탭
	} else if( isNumSep == "03" ) {
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.display='none';
		tabObjs[1].style.display='none';
		tabObjs[2].style.display='inline';
		//스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
		//탭
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
function setDefaultParty(isfTp){
	var sheetObj2=docObjects[1];
	sheetObj2.RemoveAll();
	if(isfTp == "1"){
		sheetObj2.DataInsert(-1);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_cd","IM");
		sheetObj2.DataInsert(-1);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_cd","SE");
		sheetObj2.DataInsert(-1);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_cd","BY");
		sheetObj2.DataInsert(-1);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_cd","ST");
		sheetObj2.DataInsert(-1);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_cd","LG");
		sheetObj2.DataInsert(-1);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_cd","CS");
		sheetObj2.DataInsert(-1);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_cd","CN");
		sheetObj2.DataInsert(-1);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_cd","MF");
	}else if(isfTp == "2"){
		sheetObj2.DataInsert(-1);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_cd","IM");
		sheetObj2.DataInsert(-1);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_cd","ST");
		sheetObj2.DataInsert(-1);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_cd","BKP");
	}
	for(var i=2; i<sheetObj2.RowCount()+2; i++){
   		sheetObj2.SetCellValue(i, "entt_seq",i-1);
   		sheetObj2.SetCellImage(i, "add_img", 0);
		sheetObj2.SetCellValue(i, 'add_info',  sheetObj2.GetCellValue(i,"add_info").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
   	} 
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
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
	            (6, 0, 0, true);
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('EDI_ISF_0010_HDR2'), Align:"Center"}]
	            InitHeaders(headers, info);
	
	            var cols = [ 
	                {Type:"Combo",     Hidden:0, Width:150,   Align:"Left",    ColMerge:1,   SaveName:"bl_tp",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 ,InputCaseSensitive:1 },
	                {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"shp_ref_ibflag",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	             
	            InitColumns(cols);

            	SetEditable(1);
            	
            	BL_TP_CD = BL_TP_CD.substring(1);
            	BL_TP_NM = BL_TP_NM.substring(1);
            	
                SetColProperty('bl_tp', {ComboText:BL_TP_NM, ComboCode:BL_TP_CD} );
                SetSheetHeight(110);
           }                                                      
         break;
         case 2:      //IBSheet2 init--사용안함
             with (sheetObj) {

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

             var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('EDI_ISF_0010_HDR1_1'), Align:"Center"},
		                     { Text:getLabel('EDI_ISF_0010_HDR1_2'), Align:"Center"} ];
             
             InitHeaders(headers, info);

             var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"party_del",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"entt_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Combo",     Hidden:0, Width:160,  Align:"Left",    ColMerge:1,   SaveName:"entt_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"party_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 ,InputCaseSensitive:1 },
                 {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"entt_name",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:35 ,InputCaseSensitive:1 },
                 {Type:"Combo",     Hidden:0, Width:160,  Align:"Left",    ColMerge:1,   SaveName:"entt_id_qual",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"entt_id",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 ,InputCaseSensitive:1 },
                 {Type:"Text",      Hidden:0,  Width:350,  Align:"Left",    ColMerge:1,   SaveName:"add_info",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:105 ,InputCaseSensitive:1 },
                 {Type:"Image",     Hidden:0,  Width:30,    Align:"Center", ColMerge:0,   SaveName:"add_img",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"PopupEdit", Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"add_ct_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 ,InputCaseSensitive:1 },
                 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"add_ct",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:35 ,InputCaseSensitive:1 },
                 {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"add_cntry_sub",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 ,InputCaseSensitive:1 },
                 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"add_zip_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 ,InputCaseSensitive:1 },
                 {Type:"PopupEdit", Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"add_cntry",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 ,InputCaseSensitive:1 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"add_cntry_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:35 ,InputCaseSensitive:1 },
                 {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"party_ibflag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Text",      Hidden:1, Width:130,  Align:"Center",  ColMerge:1,   SaveName:"add_qual",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:35 },
                 {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"add_qual2",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:35 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"add_qual3",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:35 } ];
              
             InitColumns(cols);
             SetImageList(0,"web/img/main/icon_m.gif");
             SetEditable(1);
             ENTT_NM = ENTT_NM.substring(1);
             ENTT_CD = ENTT_CD.substring(1);
             SetColProperty('entt_cd', {ComboText:ENTT_NM, ComboCode:ENTT_CD} );
         	 SetColProperty('entt_id_qual', {ComboText:ENTT_ID_QUAL_NM, ComboCode:ENTT_ID_QUAL_CD} );
             SetSheetHeight(307);

         }      
         break;
         case 3:      //IBSheet3 init
	         with (sheetObj) {
             (8, 0, 0, true);

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('EDI_ISF_0010_HDR3'), Align:"Center"}]
             InitHeaders(headers, info);

             var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"hts_del",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				{Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"party_entt_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				{Type:"PopupEdit", Hidden:0, Width:110,  Align:"Center",  ColMerge:1,   SaveName:"hts_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 ,InputCaseSensitive:1 },
				{Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"cntry_org",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 ,InputCaseSensitive:1 },
				{Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"cntry_org_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 ,InputCaseSensitive:1 },
				{Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"hts_ibflag",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				{Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"hts_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				{Type:"Text",      Hidden:1, Width:110,  Align:"Center",  ColMerge:1,   SaveName:"hts_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
              
             InitColumns(cols);
             SetSheetHeight(120);
             SetEditable(1);

		 }      
	     break;
		case 4:      //IBSheet4 init
		    with (sheetObj) {
	            (7, 0, 0, true);
	
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('EDI_ISF_0010_HDR4'), Align:"Center"}]
	            InitHeaders(headers, info);
	
	            var cols = [ 
	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"snd_tms",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"rcv_tms",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"isf_act_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ack_tp",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"msg_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"isf_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"snd_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	             
	            InitColumns(cols);
	            SetSheetHeight(400);
	            SetEditable(1);

        } 
		break;
		case 5:      //IBSheet5 init
		    with (sheetObj) {
	        (3, 0, 0, true);

	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('EDI_ISF_0010_HDR5'), Align:"Center"}]
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"type",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"code",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"text",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	         
	        InitColumns(cols);
	        SetSheetHeight(400);
	        SetEditable(1);
        } 
		break;
     }
}
function sheet1_OnChange(sheetObj,Row,Col, Val){	
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=="bl_del"){
		if(sheetObj.GetCellValue(Row, "bl_del") == 1){
			sheetObj.RowDelete(Row);
			sheetObj.SetCellValue(Row, "bl_del",0);
		}
	}
}
function sheet2_OnChange(sheetObj,Row,Col){	
	var sheetObj3=docObjects[2];
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=="party_del"){
		if(sheetObj.GetCellValue(Row, "party_del") == 1){
			if(sheetObj.GetCellValue(Row, "entt_cd") == "MF"){
			for(var j=1; j<sheetObj3.RowCount()+1; j++){
				if(sheetObj3.GetCellValue(j, "party_entt_seq") == sheetObj.GetCellValue(Row, "entt_seq")){
						alert("Please, First Delete related HTS Detail Info !");
						sheetObj.SetCellValue(Row, "party_del",0);
						return;
					}
				}
			}
			sheetObj.RowDelete(Row);
			sheetObj.SetCellValue(Row, "party_del",0);
			//Seq 재설정.
			for(var i=2; i<sheetObj.RowCount()+2; i++){
    	   		sheetObj.SetCellValue(i, "entt_seq",i-1);
    	   	}
    	   	//MF에 연결된 HTS 정보 Seq 재배치
    	   	for(var i=2; i<sheetObj.RowCount()+2; i++){
    	   		if(sheetObj.GetCellValue(i, "entt_cd") == "MF"){
					for(var j=1; j<sheetObj3.RowCount()+1; j++){
						sheetObj3.SetCellValue(j, "party_entt_seq",sheetObj.GetCellValue(i, "entt_seq"));
					}
				}
			}
		}
	}else if(colStr=="entt_cd"){
		//
		var enttCd=sheetObj.GetCellValue(Row, "entt_cd");
	}else if(colStr=="party_cd"){
		var codeStr=sheetObj.GetCellValue(Row, "party_cd");
		if(codeStr.length>2){
			//결과를 표시할 Col을 초기화함
			sheetObj.SetCellValue(Row, "entt_name",'');
			doAutoSelectPartyDetailInfo(sheetObj, Row, Col, codeStr);	
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: EDI_ISF_0010.851");
			sheetObj.SelectCell(Row, colStr);
		}
	}else if(colStr=="entt_id_qual"){
		chkEnttIdQual(sheetObj.GetCellValue(Row, "entt_cd"), sheetObj.GetCellValue(Row, "entt_id_qual"));
	}else if(colStr=="add_ct_cd"){
		var codeStr=sheetObj.GetCellValue(Row, "add_ct_cd");
		if(codeStr.length>2){
			//결과를 표시할 Col을 초기화함
			sheetObj.SetCellValue(Row, "add_ct",'');
			doAutoSearch(sheetObj, Row, Col, 'location', codeStr, "add_ct_cd", "add_ct");	
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: EDI_ISF_0010.863");
			sheetObj.SelectCell(Row, colStr);
		}
	}else if(colStr=="add_cntry"){
		var codeStr=sheetObj.GetCellValue(Row, "add_cntry");
		if(codeStr.length==2){
			//결과를 표시할 Col을 초기화함
			sheetObj.SetCellValue(Row, "add_cntry_nm",'');
			doAutoSearch(sheetObj, Row, Col, 'country', codeStr, "add_cntry", "add_cntry_nm");	
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: EDI_ISF_0010.875");
			sheetObj.SelectCell(Row, colStr);
		}
	}
}
var curRow=-1; 
var curCol=-1;
function doAutoSelectPartyDetailInfo(sheetObj, Row, Col, trdpCd){
	curRow=Row;
	curCol=Col;
	ajaxSendPost(setPartyDetailInfo, 'reqVal', '&goWhere=aj&bcKey=searchPartyDetailInfo&trdp_cd=' + trdpCd , './GateServlet.gsl');
}
function setPartyDetailInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			sheetObj.SetCellValue(curRow, "party_cd","",0);
			sheetObj.SetCellValue(curRow, "entt_name","",0);
			sheetObj.SetCellValue(curRow, "entt_id_qual","",0);
			sheetObj.SetCellValue(curRow, "entt_id","",0);
			sheetObj.SetCellValue(curRow, "add_info","",0);
			sheetObj.SetCellValue(curRow, "add_ct","",0);
			sheetObj.SetCellValue(curRow, "add_cntry_sub","",0);
			sheetObj.SetCellValue(curRow, "add_zip_cd","",0);
			sheetObj.SetCellValue(curRow, "add_cntry","",0);
			sheetObj.SetCellValue(curRow, "add_cntry_nm","",0);
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@^');
			sheetObj.SetCellValue(curRow, "party_cd",rtnArr[0],0);
			sheetObj.SetCellValue(curRow, "entt_name",rtnArr[1],0);
			if(rtnArr[2] == "E" || rtnArr[2] == "EI"){
				sheetObj.SetCellValue(curRow,"entt_id_qual","EI",0);
				sheetObj.SetCellValue(curRow,"entt_id",rtnArr[3],0);
			};
			sheetObj.SetCellValue(curRow, "add_info",rtnArr[4],0);
			sheetObj.SetCellValue(curRow, "add_ct",rtnArr[5],0);
			sheetObj.SetCellValue(curRow, "add_cntry_sub",rtnArr[6],0);
			sheetObj.SetCellValue(curRow, "add_zip_cd",rtnArr[7],0);
			sheetObj.SetCellValue(curRow, "add_cntry",rtnArr[8],0);
			sheetObj.SetCellValue(curRow, "add_cntry_nm",rtnArr[9],0);
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function sheet2_OnPopupClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=="party_cd"){
		rtnary=new Array(3);
	    rtnary[0]="";
	    rtnary[1]=sheetObj.GetCellValue(Row, "entt_name") ;
	    rtnary[2]=window;
	    callBackFunc = "PARTY_CD";
	    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
        
	}else if(colStr=="add_ct_cd"){
		rtnary=new Array(3);
	    rtnary[0]="";
	    rtnary[1]="" ;
	    rtnary[2]="";
	    callBackFunc = "ADD_CT_CD";
	    modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	    
	}else if(colStr=="add_cntry"){
		rtnary=new Array(3);
	    rtnary[0]="";
	    rtnary[1]="" ;
	    rtnary[2]="";
	    callBackFunc = "ADD_CNTRY";
	    modal_center_open('./CMM_POP_0020.clt', rtnary, 806,480,"yes");
	    
	}
}
function sheet2_OnMouseMove(Button, Shift, X, Y){
    if (docObjects[1].MouseRow()== 1 && docObjects[1].MouseCol()== 6){
    //no support[check again]CLT 	docObjects[1].MouseToolTipText="EI=NN-NNNNNNNXX\nANI=YYDDPP-NNNNN\nCIN=CCCCCCCCCCC\n34=NNN-NN-NNNN\nDUN=NNNNNNNNN\nDNS=NNNNNNNNNNNNN\nFR=ANNN\nAEF=XXXXXXXXXXXXXXX\n2=AAAA";
    }else{
    //no support[check again]CLT 	docObjects[1].MouseToolTipText="";
    }
}
function sheet2_OnSearchEnd() {
	var formObj = document.frm1;
	var sheetObj = docObjects[1];
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "add_img", 0);
		sheetObj.SetCellValue(i, 'add_info',  sheetObj.GetCellValue(i,"add_info").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
	}
}
function sheet2_OnClick(sheetObj, Row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if (colStr == "add_img") {
		ComShowMemoPad4(sheetObj, Row, "add_info", false, 250, 130, col, "add_info");   
	}
}
function sheet3_OnPopupClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=="hts_cd"){
		rtnary=new Array(3);
	    rtnary[0]="";
	    rtnary[1]="" ;
	    rtnary[2]="";
	    callBackFunc = "HTS_CD";
	    modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
	    
	}if(colStr=="cntry_org"){
		rtnary=new Array(3);
	    rtnary[0]="";
	    rtnary[1]="" ;
	    rtnary[2]="";
	    callBackFunc = "CNTRY_ORG";
	    modal_center_open('./CMM_POP_0020.clt', rtnary, 756,483,"yes");
	    
       
	}
}
function sheet3_OnChange(sheetObj,Row,Col, Val){	
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=="hts_del"){
		if(sheetObj.GetCellValue(Row, "hts_del") == 1){
			sheetObj.RowDelete(Row);
			sheetObj.SetCellValue(Row, "hts_del",0 );
		}
	}else if(colStr=="hts_cd"){
		var codeStr=sheetObj.GetCellValue(Row, "hts_cd");
		if(codeStr.length>2){
			//결과를 표시할 Col을 초기화함
			sheetObj.SetCellValue(Row, "hts_nm",'');
			//주석제거하삼.
			//doAutoSearch(sheetObj, Row, Col, 'commodity', codeStr, "hts_cd", "hts_nm");	
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: EDI_ISF_0010.981");
			sheetObj.SelectCell(Row, colStr);
		}
	}else if(colStr=="cntry_org"){
		var codeStr=sheetObj.GetCellValue(Row, "cntry_org");
		if(codeStr.length==2){
			//결과를 표시할 Col을 초기화함
			sheetObj.SetCellValue(Row, "cntry_org_nm",'');
			doAutoSearch(sheetObj, Row, Col, 'country', codeStr, "cntry_org", "cntry_org_nm");	
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: EDI_ISF_0010.993");
			sheetObj.SelectCell(Row, colStr);
		}
	}
}
function sheet4_OnClick(sheetObj,Row,Col, Val){	
	var colStr	=sheetObj.ColSaveName(Col);
	var stsNm	=sheetObj.GetCellValue(Row, "ack_tp");
	if(colStr=="ack_tp" && stsNm=='Rejected' ){
		doWork("SEARCHLIST05");
	}
}
/*
function sheet2_OnSelectCell(OldRow, OldCol, NewRow, NewCol){
	for(var i=2; i<=docObjects[1].RowCount()+2; i++){
		if(i == NewCol){
			docObjects[1].SetCellBackColor(NewCol,0,"#C0C0C0");
		}else{
			docObjects[1].SetCellBackColor(i,0,"#FFFFFF");
		}
	}
}
*/
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat, obj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
            var cal=new ComCalendar(); 
            cal.select(obj,  'MM-dd-yyyy');
        break;
    }
}
function fieldChange(param) {
	var form=document.frm1;
	switch(param){
		case "ISF_TP" : // ISF Type
			if (form.f_isf_tp.value == "1") { //isf-10
				//cfEnableObjects([form.f_isf_ship_tp]);
				document.getElementById('td_fpod').className="table_search_head"; // Foreign POD
				document.getElementById('td_del').className="table_search_head"; // DEL
				document.getElementById('fpod_mandatory').style.display="none";
				document.getElementById('del_mandatory').style.display="none";
			} else if (form.f_isf_tp.value == "2") { //isf-5
				//form.f_isf_ship_tp.value = "01";
				//cfDisableObjects([form.f_isf_ship_tp]);
				document.getElementById('td_fpod').className="table_search_head_r"; // Foreign POD
				document.getElementById('td_del').className="table_search_head_r"; // DEL
				document.getElementById('fpod_mandatory').style.display="";
				document.getElementById('del_mandatory').style.display="";
			}
			//funcComboboxChange("ISF_TP");
			if (form.f_isf_tp.value == "2") {
				form.f_isf_ship_tp.value="01";
			}
			setDefaultParty(form.f_isf_tp.value);
		break;	
		//case "ISF_TRAC_NO" : // Transction No
		//	if (form.ISF_TRAC_NO.value == "") { 
		//	    form.f_isf_act_cd.value = "A";
		//	}
		//break;			
		case "ISF_ACT_CD" : // Action Type
			if (form.f_isf_act_cd.value == "A" || form.f_isf_act_cd.value == "R" ) { //Action Type
				if (form.f_isf_ship_tp.value == "01" || form.f_isf_ship_tp.value == "02" || form.f_isf_ship_tp.value == "07" || form.f_isf_ship_tp.value == "08" || form.f_isf_ship_tp.value == "10" ) { // Shipment Type
					document.getElementById('isf_bond_holder_mandatory').style.display=""; // Bond Holder
					document.getElementById('isf_bond_act_cd_mandatory').style.display=""; // Bond Activity
					document.getElementById('isf_bond_tp_mandatory').style.display=""; // Bond Type
				} else {
					document.getElementById('isf_bond_holder_mandatory').style.display="none"; // Bond Holder
					document.getElementById('isf_bond_act_cd_mandatory').style.display="none"; // Bond Activity
					document.getElementById('isf_bond_tp_mandatory').style.display="none"; // Bond Type
				}
			} else {
				document.getElementById('isf_bond_holder_mandatory').style.display="none"; // Bond Holder
				document.getElementById('isf_bond_act_cd_mandatory').style.display="none"; // Bond Activity
				document.getElementById('isf_bond_tp_mandatory').style.display="none"; // Bond Type
			}
		break;					
		case "ISF_SHIP_TP" : // Shipment Type
			if (form.f_isf_act_cd.value == "A" || form.f_isf_act_cd.value == "R" ) { //Action Type
				if (form.f_isf_ship_tp.value == "01" || form.f_isf_ship_tp.value == "02" || form.f_isf_ship_tp.value == "07" || form.f_isf_ship_tp.value == "08" || form.f_isf_ship_tp.value == "10" ) { // Shipment Type
					document.getElementById('isf_bond_holder_mandatory').style.display=""; // Bond Holder
					document.getElementById('isf_bond_act_cd_mandatory').style.display=""; // Bond Activity
					document.getElementById('isf_bond_tp_mandatory').style.display=""; // Bond Type
				} else {
					document.getElementById('isf_bond_holder_mandatory').style.display="none"; // Bond Holder
					document.getElementById('isf_bond_act_cd_mandatory').style.display="none"; // Bond Activity
					document.getElementById('isf_bond_tp_mandatory').style.display="none"; // Bond Type
				}
			} else {
				document.getElementById('isf_bond_holder_mandatory').style.display="none"; // Bond Holder
				document.getElementById('isf_bond_act_cd_mandatory').style.display="none"; // Bond Activity
				document.getElementById('isf_bond_tp_mandatory').style.display="none"; // Bond Type
			}
			if (form.f_isf_ship_tp.value == "06") { //Carnet
				cfEnableObjects([form.REF_NO_6C]);
				document.getElementById('valREF_NO_6C').style.display=""; //Carnet Country/No
			} else { 
				form.REF_NO_6C.value="";
				cfDisableObjects([form.REF_NO_6C]);
				document.getElementById('valREF_NO_6C').style.display="none"; //Carnet Country/No
			}
			funcComboboxChange("ISF_SHIP_TP");
		break;		
		case "ENTT_CD" : 
			if (form.ISF_TP.value == "1") {  // isf-10
				var itemYn="N";
				for(var row=isf_party_list_dst.CountRow; row >= 1; row--){
				//alert(isf_party_list_dst.NameValue(row,"ENTT_CD");
					if(isf_party_list_dst.NameValue(row,"ENTT_CD") == "MF"){
						itemYn="Y";
					}
				}	
				if (itemYn == "Y" || form.ENTT_CD.value == "MF") {
					DivChange("DIV_ITEM", "YES");
				} else {
					DivChange("DIV_ITEM", "NO");
				}
			} else {
				DivChange("DIV_ITEM", "YES");
			}	
		   //if (form.ISF_TP.value == "1") { // isf-10
		   //	if (form.ENTT_CD.value == "MF") { 
			//	    DivChange("DIV_ITEM", "YES");
			//	} else {
			//		DivChange("DIV_ITEM", "NO");
			//	}
			//} else if (form.ISF_TP.value == "2") { // isf-5
			//	DivChange("DIV_ITEM", "YES");
			//}
		break;	
		case "ISF_IMP_QUAL" : // ID Qualifier	
			if (form.ISF_IMP_QUAL.value == "AEF") { 
			    document.getElementById('valISF_CNTRY_CD').style.display=""; // Country of Iss
				document.getElementById('valISF_IMP_DOB').style.display=""; // Date of Birth
			} else { 
			    document.getElementById('valISF_CNTRY_CD').style.display="none"; // Country of Iss
				document.getElementById('valISF_IMP_DOB').style.display="none"; // Date of Birth
			}
		break;	
		case "ISF_BOND_ACT_CD" : // // Bond Activity
			if(form.ISF_BOND_ACT_CD.value == "16" && form.ISF_BOND_TP.value == "9" ){
				document.getElementById('valREF_NO_V1').style.display=""; // Surety Code
				document.getElementById('valREF_NO_SBN').style.display=""; // Bond Ref No
			} else { 
				document.getElementById('valREF_NO_V1').style.display="none"; // Surety Code
				document.getElementById('valREF_NO_SBN').style.display="none"; // Bond Ref No
			}
			funcComboboxChange("ISF_BOND_ACT_CD");
		break;	
		case "ISF_BOND_TP" : // Bond Type	
			if(form.ISF_BOND_ACT_CD.value == "16" && form.ISF_BOND_TP.value == "9" ){
				document.getElementById('valREF_NO_V1').style.display=""; // Surety Code
				document.getElementById('valREF_NO_SBN').style.display=""; // Bond Ref No
			} else { 
				document.getElementById('valREF_NO_V1').style.display="none"; // Surety Code
				document.getElementById('valREF_NO_SBN').style.display="none"; // Bond Ref No
			}
		break;	
		case "ENTT_ID_QUAL" : // ID Qualifier
			/*
			if (form.ENTT_ID_QUAL.value == "AEF") { 
				document.getElementById('valCNTRY_N_DOB').style.display=""; // Date of Birth
			} else { 
				document.getElementById('valCNTRY_N_DOB').style.display="none"; // Date of Birth
			}
			*/
			if (form.ENTT_ID_QUAL.value == "") { 
			    document.getElementById('valENTT_ID').style.display="none"; // Identifier No
				document.getElementById('valENTT_NAME').style.display=""; // Party Name
				document.getElementById('valADD_INFO').style.display=""; // Address 1
				document.getElementById('valADD_CT_CD').style.display=""; // City
				document.getElementById('valADD_CNTRY').style.display=""; // Country
			} else { 
			    document.getElementById('valENTT_ID').style.display=""; // Identifier No
				document.getElementById('valENTT_NAME').style.display="none"; // Party Name
				document.getElementById('valADD_INFO').style.display="none"; // Address 1
				document.getElementById('valADD_CT_CD').style.display="none"; // City
				document.getElementById('valADD_CNTRY').style.display="none"; // Country
			}				
		break;																
	}	
}	
function formatMask(param,obj) {
	var form=document.frm1;
	var alph="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var num="0123456789";
	var alpanum="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var harf="-";
	switch(param){
		case "ISF_IMP_NO" :	
			if (form.f_isf_imp_qual.value == "EI") {
				if (obj.value.length > 0 && ( obj.value.length < 10 || obj.value.length > 12 )) {
			    	alert("Case when ID Qualifier [EI] then format 'NN-NNNNNNNXX' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
				    if (i == 0 || i == 1 || i == 3|| i == 4|| i == 5|| i == 6|| i == 7|| i == 8|| i == 9) {
				    	chars=num;
				    } else if (i == 2) {
				    	chars=harf;
				    } else if (i == 10 || i == 11) {				    
				    	chars=alpanum;
				    } 
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [EI] then format 'NN-NNNNNNNXX' ");
				    	obj.value="";
				    	return;
				    }
			    }
			} else if (form.f_isf_imp_qual.value == "ANI") {
				if (obj.value.length > 0 && ( obj.value.length < 12 || obj.value.length > 12 )) {
			    	alert("Case when ID Qualifier [ANI] then format 'YYDDPP-NNNNN' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
				    if (i == 0 || i == 1 || i == 2|| i == 3|| i == 4|| i == 5|| i == 7|| i == 8|| i == 9|| i == 10|| i == 11) {
				    	chars=num;
				    } else if (i == 6) {
				    	chars=harf;
				    }
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [ANI] then format 'YYDDPP-NNNNN' ");
				    	obj.value="";
				    	return;
				    }
			    }
			} else if (form.f_isf_imp_qual.value == "34") {
				if (obj.value.length > 0 && ( obj.value.length < 11 || obj.value.length > 11 )) {
			    	alert("Case when ID Qualifier [34] then format 'NNN-NN-NNNN' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
				    if (i == 0 || i == 1 || i == 2|| i == 4|| i == 5|| i == 7|| i == 8|| i == 9|| i == 10) {
				    	chars=num;
				    } else if (i == 3 || i == 6) {
				    	chars=harf;
				    } 
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [34] then format 'NNN-NN-NNNN' ");
				    	obj.value="";
				    	return;
				    }
			    }
			} else if (form.f_isf_imp_qual.value == "AEF") {
				if (obj.value.length > 0 && obj.value.length > 15 ) {
			    	alert("Case when ID Qualifier [AEF] then format 'XXXXXXXXXXXXXXX' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
			    	chars=alpanum;
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [AEF] then format 'XXXXXXXXXXXXXXX' ");
				    	obj.value="";
				    	return;
				    }
			    }
			}
		break;
		case "ISF_BOND_HOLDER" :	
			/*
			if (form.f_isf_imp_qual.value == "EI") {
				if (obj.value.length > 0 && ( obj.value.length < 10 || obj.value.length > 12 )) {
			    	alert("Case when ID Qualifier [EI] then format 'NN-NNNNNNNXX' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
				    if (i == 0 || i == 1 || i == 3|| i == 4|| i == 5|| i == 6|| i == 7|| i == 8|| i == 9) {
				    	chars=num;
				    } else if (i == 2) {
				    	chars=harf;
				    } else if (i == 10 || i == 11) {				    
				    	chars=alpanum;
				    } 
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [EI] then format 'NN-NNNNNNNXX' ");
				    	obj.value="";
				    	return;
				    }
			    }
			} else if (form.f_isf_imp_qual.value == "ANI") {
				if (obj.value.length > 0 && ( obj.value.length < 12 || obj.value.length > 12 )) {
			    	alert("Case when ID Qualifier [ANI] then format 'YYDDPP-NNNNN' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
				    if (i == 0 || i == 1 || i == 2|| i == 3|| i == 4|| i == 5|| i == 7|| i == 8|| i == 9|| i == 10|| i == 11) {
				    	chars=num;
				    } else if (i == 6) {
				    	chars=harf;
				    }
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [ANI] then format 'YYDDPP-NNNNN' ");
				    	obj.value="";
				    	return;
				    }
			    }
			} else if (form.f_isf_imp_qual.value == "34") {
				if (obj.value.length > 0 && ( obj.value.length < 11 || obj.value.length > 11 )) {
			    	alert("Case when ID Qualifier [34] then format 'NNN-NN-NNNN' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
				    if (i == 0 || i == 1 || i == 2|| i == 4|| i == 5|| i == 7|| i == 8|| i == 9|| i == 10) {
				    	chars=num;
				    } else if (i == 3 || i == 6) {
				    	chars=harf;
				    } 
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [34] then format 'NNN-NN-NNNN' ");
				    	obj.value="";
				    	return;
				    }
			    }
			}
			*/
		break;	
		case "ENTT_ID" :	
			if (form.ENTT_ID_QUAL.value == "EI") {
				if (obj.value.length > 0 && ( obj.value.length < 10 || obj.value.length > 12 )) {
			    	alert("Case when ID Qualifier [EI] then format 'NN-NNNNNNNXX' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
				    if (i == 0 || i == 1 || i == 3|| i == 4|| i == 5|| i == 6|| i == 7|| i == 8|| i == 9) {
				    	chars=num;
				    } else if (i == 2) {
				    	chars=harf;
				    } else if (i == 10 || i == 11) {				    
				    	chars=alpanum;
				    } 
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [EI] then format 'NN-NNNNNNNXX' ");
				    	obj.value="";
				    	return;
				    }
			    }
			} else if (form.ENTT_ID_QUAL.value == "ANI") {
				if (obj.value.length > 0 && ( obj.value.length < 12 || obj.value.length > 12 )) {
			    	alert("Case when ID Qualifier [ANI] then format 'YYDDPP-NNNNN' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
				    if (i == 0 || i == 1 || i == 2|| i == 3|| i == 4|| i == 5|| i == 7|| i == 8|| i == 9|| i == 10|| i == 11) {
				    	chars=num;
				    } else if (i == 6) {
				    	chars=harf;
				    }
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [ANI] then format 'YYDDPP-NNNNN' ");
				    	obj.value="";
				    	return;
				    }
			    }
			} else if (form.ENTT_ID_QUAL.value == "34") {
				if (obj.value.length > 0 && ( obj.value.length < 11 || obj.value.length > 11 )) {
			    	alert("Case when ID Qualifier [34] then format 'NNN-NN-NNNN' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
				    if (i == 0 || i == 1 || i == 2|| i == 4|| i == 5|| i == 7|| i == 8|| i == 9|| i == 10) {
				    	chars=num;
				    } else if (i == 3 || i == 6) {
				    	chars=harf;
				    } 
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [34] then format 'NNN-NN-NNNN' ");
				    	obj.value="";
				    	return;
				    }
			    }
			} else if (form.ENTT_ID_QUAL.value == "AEF") {
				if (obj.value.length > 0 && obj.value.length > 15 ) {
			    	alert("Case when ID Qualifier [AEF] then format 'XXXXXXXXXXXXXXX' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
			    	chars=alpanum;
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [AEF] then format 'XXXXXXXXXXXXXXX' ");
				    	obj.value="";
				    	return;
				    }
			    }
			} else if (form.ENTT_ID_QUAL.value == "CIN") {
				//if (obj.value.length > 0 obj.value.length > 15 ) {
			    //	alert("Case when ID Qualifier [CIN] then format 'CCCCCCCCCCC' ");
			    //	obj.value = "";
			    //	return;
				//}	
			    //for (var i = 0; i < obj.value.length; i++) {
			    //	chars = num;
				//    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				//    	alert("Case when ID Qualifier [CIN] then format 'CCCCCCCCCCC' ");
				//    	obj.value = "";
				//    	return;
				//    }
			    //}
			} else if (form.ENTT_ID_QUAL.value == "DUN") {
				if (obj.value.length > 0 && obj.value.length > 9 ) {
			    	alert("Case when ID Qualifier [DUN] then format 'NNNNNNNNN' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
			    	chars=num;
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [DUN] then format 'NNNNNNNNN' ");
				    	obj.value="";
				    	return;
				    }
			    }
			} else if (form.ENTT_ID_QUAL.value == "DNS") {
				if (obj.value.length > 0 && obj.value.length > 13 ) {
			    	alert("Case when ID Qualifier [DNS] then format 'NNNNNNNNNNNNN' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
			    	chars=num;
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [DNS] then format 'NNNNNNNNNNNNN' ");
				    	obj.value="";
				    	return;
				    }
			    }
			} else if (form.ENTT_ID_QUAL.value == "FR") {
				if (obj.value.length > 0 && obj.value.length > 15 ) {
			    	alert("Case when ID Qualifier [FR] then format 'ANNN' ");
			    	obj.value="";
			    	return;
				}	
			    for (var i=0; i < obj.value.length; i++) {
				    if (i == 0 ) {
				    	chars=alph;
				    } else if (i == 1 || i == 2 || i == 3) {
				    	chars=num;
				    }	
				    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
				    	alert("Case when ID Qualifier [FR] then format 'ANNN' ");
				    	obj.value="";
				    	return;
				    }
			    }
			}
		break;
		case "CNTRY_N_DOB" :
			if (obj.value.length > 0 && obj.value.length != 10 ) {
		    	alert("Case when Country & DOB then format 'CCMMDDYYYY' ");
		    	obj.value="";
		    	return;
			}	
		    for (var i=0; i < obj.value.length; i++) {
			    if (i == 0 || i == 1 ) {
			    	chars=alph;
			    } else if (i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
			    	chars=num;
			    }	
			    if (chars.indexOf(obj.value.charAt(i))== -1 ){ 
			    	alert("Case when Country & DOB then format 'CCMMDDYYYY' ");
			    	obj.value="";
			    	return;
			    }
		    }
		break;							
	}	
}
/*		ID Qualifier
	EI	Employer Identification Number (IRS#)
	ANI	CBP-assigned Number for Consignee
	CIN	CBP encrypted Consignee ID
	34	Social Security Number
	DUN	DUNS Number
	DNS	DUNS+4 Number
	FR	Facility Information Resource Management System (FIRMS) Code
	AEF	Passport Number
	*/
function chkImporterIdQual(enttIdQual){
	if(enttIdQual != "EI" && enttIdQual != "ANI" &&enttIdQual != "34" &&enttIdQual != "AEF"){
		alert("Importer ID Qualifier should be [EI] or [ANI] or [34] or [AEF]");
		frm1.f_isf_imp_qual.value="";
		return;
	}
}
function chkEnttIdQual(enttIdCd, enttIdQual){
	var sheetObj2=docObjects[1];
	switch(enttIdCd) {
    	case "IM":
    		if(enttIdQual != "EI" && enttIdQual != "ANI" &&enttIdQual != "34" && enttIdQual != "AEF"){
				alert("[IM] ID Qualifier should be [EI] or [ANI] or [34] or [AEF]");
				sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "entt_id_qual","",0);
				return;
			}
	   	break;
	   	case "CN":
    		if(enttIdQual != "EI" && enttIdQual != "ANI" &&enttIdQual != "34" && enttIdQual != "AEF" && enttIdQual != "CIN"){
				alert("[CN] ID Qualifier should be [EI] or [ANI] or [34] or [AEF] or [CIN]");
				sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "entt_id_qual","",0);
				return;
			}
	   	break;
	   	case "ST":
    		if(enttIdQual != "DUN" && enttIdQual != "DNS" &&enttIdQual != "FR" ){
				alert("[ST] ID Qualifier should be [DUN] or [DNS] or [FR]");
				sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "entt_id_qual","",0);
				return;
			}
	   	break;
	   	case "BKG":
    		if(enttIdQual != "DUN" && enttIdQual != "DNS"){
				alert("[BKG] ID Qualifier should be [DUN] or [DNS]");
				sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "entt_id_qual","",0);
				return;
			}
		break;	
		case "MF":
    		if(enttIdQual != "DUN" && enttIdQual != "DNS"){
				alert("[MF] ID Qualifier should be [DUN] or [DNS]");
				sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "entt_id_qual","",0);
				return;
			}
		break;	
		case "BY":
    		if(enttIdQual != "EI" && enttIdQual != "ANI" && enttIdQual != "CIN" && enttIdQual != "34" && enttIdQual != "DUN" && enttIdQual != "DNS"){
				alert("[BY] ID Qualifier should be [EI] or[ANI] or[CIN] or[34] or[DUN] or [DNS]");
				sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "entt_id_qual","",0);
				return;
			}
		break;	
		case "SE":
    		if(enttIdQual != "EI" && enttIdQual != "ANI" && enttIdQual != "CIN" && enttIdQual != "34" && enttIdQual != "DUN" && enttIdQual != "DNS"){
				alert("[SE]] ID Qualifier should be [EI] or[ANI] or[CIN] or[34] or[DUN] or [DNS]");
				sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "entt_id_qual","",0);
				return;
			}
		break;	
		case "CS":
    		if(enttIdQual != "DUN" && enttIdQual != "DNS"){
				alert("[CS] ID Qualifier should be [DUN] or [DNS]");
				sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "entt_id_qual","",0);
				return;
			}
		break;	
		case "LG":
    		if(enttIdQual != "DUN" && enttIdQual != "DNS"){
				alert("[LG] ID Qualifier should be [DUN] or [DNS]");
				sheetObj2.SetCellValue(sheetObj2.GetSelectRow(), "entt_id_qual","",0);
				return;
			}
		break;	
	}
}
function setIsfBondTp(){
	//Bond Activity Code가 '16'(ISF Bond)인 경우에만 Bond Type'9'인 경우 입력 가능 
	if(frm1.f_isf_bond_act_cd.value == "16"){
		frm1.f_isf_bond_tp.value="9";
	}else{
		frm1.f_isf_bond_tp.value="8";
	}
}
function chkEnttIdFormat(enttIdQual, enttId) {
	var form=document.frm1;
	var alph="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var num="0123456789";
	var alpanum="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var harf="-";
	var msg="";
	if (enttIdQual == "EI") {
		if (enttId.length > 0 && ( enttId.length < 10 || enttId.length > 12 )) {
	    	msg="Case when ID Qualifier [EI] then format 'NN-NNNNNNNXX' ";
		}	
	    for (var i=0; i < enttId.length; i++) {
		    if (i == 0 || i == 1 || i == 3|| i == 4|| i == 5|| i == 6|| i == 7|| i == 8|| i == 9) {
		    	chars=num;
		    } else if (i == 2) {
		    	chars=harf;
		    } else if (i == 10 || i == 11) {				    
		    	chars=alpanum;
		    } 
		    if (chars.indexOf(enttId.charAt(i))== -1 ){ 
		    	msg="Case when ID Qualifier [EI] then format 'NN-NNNNNNNXX' ";
		    }
	    }
	} else if (enttIdQual == "ANI") {
		if (enttId.length > 0 && ( enttId.length < 12 || enttId.length > 12 )) { 
	    	msg="Case when ID Qualifier [ANI] then format 'YYDDPP-NNNNN' ";
		}	
	    for (var i=0; i < enttId.length; i++) {
		    if (i == 0 || i == 1 || i == 2|| i == 3|| i == 4|| i == 5|| i == 7|| i == 8|| i == 9|| i == 10|| i == 11) {
		    	chars=num;
		    } else if (i == 6) {
		    	chars=harf;
		    }
		    if (chars.indexOf(enttId.charAt(i))== -1 ){ 
		    	msg="Case when ID Qualifier [ANI] then format 'YYDDPP-NNNNN' ";
		    }
	    }
	} else if (enttIdQual == "34") {
		if (enttId.length > 0 && ( enttId.length < 11 || enttId.length > 11 )) {
	    	msg="Case when ID Qualifier [34] then format 'NNN-NN-NNNN' ";
		}	
	    for (var i=0; i < enttId.length; i++) {
		    if (i == 0 || i == 1 || i == 2|| i == 4|| i == 5|| i == 7|| i == 8|| i == 9|| i == 10) {
		    	chars=num;
		    } else if (i == 3 || i == 6) {
		    	chars=harf;
		    } 
		    if (chars.indexOf(enttId.charAt(i))== -1 ){ 
		    	msg="Case when ID Qualifier [34] then format 'NNN-NN-NNNN' ";
		    }
	    }
	} else if (enttIdQual == "AEF") {
		if (enttId.length > 0 && enttId.length > 15 ) {
	    	msg="Case when ID Qualifier [AEF] then format 'XXXXXXXXXXXXXXX' ";
		}	
	    for (var i=0; i < enttId.length; i++) {
	    	chars=alpanum;
		    if (chars.indexOf(enttId.charAt(i))== -1 ){ 
		    	msg="Case when ID Qualifier [AEF] then format 'XXXXXXXXXXXXXXX' ";
		    }
	    }
	} else if (enttIdQual == "CIN") {
		//if (enttId.length > 0 enttId.length > 15 ) {
	    //	alert("Case when ID Qualifier [CIN] then format 'CCCCCCCCCCC' ");
	    //	enttId = "";
	    //	return;
		//}	
	    //for (var i = 0; i < enttId.length; i++) {
	    //	chars = num;
		//    if (chars.indexOf(enttId.charAt(i))== -1 ){ 
		//    	alert("Case when ID Qualifier [CIN] then format 'CCCCCCCCCCC' ");
		//    	enttId = "";
		//    	return;
		//    }
	    //}
	} else if (enttIdQual == "DUN") {
		if (enttId.length > 0 && enttId.length > 9 ) {
	    	msg="Case when ID Qualifier [DUN] then format 'NNNNNNNNN' ";
		}	
	    for (var i=0; i < enttId.length; i++) {
	    	chars=num;
		    if (chars.indexOf(enttId.charAt(i))== -1 ){ 
		    	msg="Case when ID Qualifier [DUN] then format 'NNNNNNNNN' ";
		    }
	    }
	} else if (enttIdQual == "DNS") {
		if (enttId.length > 0 && enttId.length > 13 ) {
	    	msg="Case when ID Qualifier [DNS] then format 'NNNNNNNNNNNNN' ";
		}	
	    for (var i=0; i < enttId.length; i++) {
	    	chars=num;
		    if (chars.indexOf(enttId.charAt(i))== -1 ){ 
		    	msg="Case when ID Qualifier [DNS] then format 'NNNNNNNNNNNNN' ";
		    }
	    }
	} else if (enttIdQual == "FR") {
		if (enttId.length > 0 && enttId.length > 15 ) {
	    	msg="Case when ID Qualifier [FR] then format 'ANNN' ";
		}	
	    for (var i=0; i < enttId.length; i++) {
		    if (i == 0 ) {
		    	chars=alph;
		    } else if (i == 1 || i == 2 || i == 3) {
		    	chars=num;
		    }	
		    if (chars.indexOf(enttId.charAt(i))== -1 ){ 
		    	msg="Case when ID Qualifier [FR] then format 'ANNN' ";
		    }
	    }
	}
	return msg;
}
/**
 * 해운수출
 */
function openPopUp(popName, curObj, valObj){
	cmmOpenPopUp(popName, curObj, "S", "O", valObj);
}
function cmmOpenPopUp(popName, curObj, airSeaTp, bndTp, valObj, bizTp){
	var formObj=document.frm1;
	try {
		switch(popName) {
			case "CUSTBKG":
           		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]="";
		   		rtnary[2]=window;
    	        var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {    	        
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.cust_doc_seq.value=rtnValAry[0];//cust_doc_seq
					//formObj.cust_doc_tp_cd.value 		= rtnValAry[7];//cust_doc_tp_cd
					formObj.cust_no.value=rtnValAry[1];//cust_no
					formObj.shpr_trdp_addr.value=rtnValAry[3];//shpr_trdp_addr
					formObj.cnee_trdp_addr.value=rtnValAry[4];//cnee_trdp_addr
					formObj.ntfy_trdp_addr.value=rtnValAry[5];//ntfy_trdp_addr
					formObj.pol_nm.value=rtnValAry[6];//pol_nm
					formObj.pod_nm.value=rtnValAry[7];//pod_nm
					formObj.lnr_trdp_nm.value=rtnValAry[8];//crr_nm
					formObj.obrd_dt.value=rtnValAry[9];//obrd_dt
					formObj.mk_txt.value=rtnValAry[10];//mk_txt
					formObj.desc_txt.value=rtnValAry[11];//desc_txt
				}
       	   break;
           case "PRINT":
           		if(formObj.intg_bl_seq.value == ""){
           			alert(getLabel('SEE_BMD_MSG56'));
           		}else{
           			var reqParam='?intg_bl_seq='  +formObj.intg_bl_seq.value;
	         		reqParam += '&house_bl_no=' +formObj.f_bl_no.value;
	         		if(formObj.rider_lbl.style.color=="black"){
	         			reqParam += '&rider_flg=N';
	         		}else{
	         			reqParam += '&rider_flg=Y';
	         		}
	         		reqParam += '&agent_text=' + sea_body;
	         		// #6897 [BNX] Adjust B/L (Zen#4238)
	         		if(sea_body.indexOf('(END') < 0){
	         			if(user_ofc_cnt_cd=="JP"){
		         		}else if(user_ofc_cnt_cd=="DE"){
		         			reqParam += " " + formObj.lnr_trdp_nm.value;
		         		}else{
		         			reqParam += ", " + formObj.lnr_trdp_nm.value;
		         		}
	         		} else{
	         			reqParam = reqParam.substring(0,reqParam.indexOf("(END)"));
	         		}
	         		reqParam += '&mailTitle=' + 'House BL : ' + frm1.bl_no.value;
	         		var trdp_cd='';
	         		trdp_cd += '(' + '\'' + frm1.shpr_trdp_cd.value + '\'';
	         		trdp_cd += ',' + '\'' + frm1.prnr_trdp_cd.value + '\'' + ')';
	         		ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
	         		reqParam += '&mailTo=' + mailTo;
	         		popGET('RPT_PRN_0020.clt'+reqParam, '', 430, 500, "scroll:yes;status:no;help:no;");
           		}
       	   break;
    	   case "PACKAGE_POPLIST":
    	  	 	rtnary=new Array(1);
		   		rtnary[0]="1";
    	        var rtnVal =  ComOpenWindow('./CMM_POP_0120.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.pck_ut_cd.value=rtnValAry[0];
					formObj.pck_ut_nm.value=rtnValAry[1];
				}
    	   break;
    	   case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		var curObjId=curObj.id;
		   		var cstmTpCd='CS';
		   		//선사
		   		if(curObjId=='liner'){
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}
		   		//Shipper/Consignee인경우
		   		}else if(curObjId=='shipper'||curObjId=='consignee'){
		   			cstmTpCd='';
		   		// 파트너사
		   		}else if(curObjId=='partner'){
		   			cstmTpCd='';
		   		//콘솔사
		   		}else if(curObjId=='console'){
		   			cstmTpCd='PR';
		   		}else if(curObjId=='cust'){
		   			cstmTpCd='';
		   		}else if(curObjId=='carr'){
		   			cstmTpCd='LN';
		   		}else if(curObjId=='notify'){
		   			cstmTpCd='';
		   		}
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
				var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt?callTp='+cstmTpCd,  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					if(curObjId == "shipper"){
						if(rtnValAry[0]==''){
							//formObj.shpr_trdp_cd.focus();
						}else{
							formObj.shpr_trdp_cd.value=rtnValAry[0];//trdp_cd
							formObj.shpr_trdp_nm.value=rtnValAry[2];//eng_nm
							if(airSeaTp=='S' && bndTp=='I' && rtnValAry[7]==""){
								formObj.shpr_trdp_addr.value=rtnValAry[2];
							}else{
								formObj.shpr_trdp_addr.value=rtnValAry[7];//eng_addr
							}
							if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//								alert('COD');
								alert(getLabel('CMM_MSG_005'));	
							}
							if(airSeaTp=='S' && bndTp=='O' && bizTp!='M'){
								formObj.rep_cmdt_cd.value=rtnValAry[24];
								formObj.rep_cmdt_nm.value=rtnValAry[25];
							}
						}
						//formObj.act_shpr_trdp_cd.value = rtnValAry[0];//trdp_cd
						//formObj.act_shpr_trdp_nm.value = rtnValAry[2];//eng_nm
						//rtnValAry[8];==nomi_flg   i_nomi_flg
						//rtnValAry[9];==sls_brnc_cd   i_sls_ofc_cd
						/*
						if(rtnValAry[8] =="Y"){
							formObj.nomi_flg.checked=true;
							formObj.sls_ofc_cd.value=rtnValAry[9];
						}else{
							formObj.nomi_flg.checked=false;
							formObj.sls_ofc_cd.value=formObj.ofc_cd.value;
						}
						*/
					}else if(curObjId == "consignee"){
						if(rtnValAry[0]==''){
							//formObj.cnee_trdp_cd.focus();
						}else{
							formObj.cnee_trdp_cd.value=rtnValAry[0];//trdp_cd
							formObj.cnee_trdp_nm.value=rtnValAry[2];//eng_nm
							if(airSeaTp=='S' && bndTp=='I' && rtnValAry[7]==""){
								formObj.cnee_trdp_addr.value=rtnValAry[2];
							}else{
								formObj.cnee_trdp_addr.value=rtnValAry[7];//eng_addr 
							}
							if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//								alert('COD');
								alert(getLabel('CMM_MSG_005'));	
							}
						}						
						/*
						if(formObj.order_chk.checked == true){
							formObj.cnee_trdp_addr.value=formObj.cnee_trdp_nm.value;
						}
						*/
						//formObj.ntfy_trdp_cd.value = rtnValAry[0];//trdp_cd
						//formObj.ntfy_trdp_nm.value = rtnValAry[2];//eng_nm
						//formObj.ntfy_trdp_addr.value = rtnValAry[7];//eng_addr 
					}else if(curObjId == "notify"){
						formObj.ntfy_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.ntfy_trdp_nm.value=rtnValAry[2];//full_nm
						if(airSeaTp=='S' && bndTp=='I' && rtnValAry[7]==""){
							formObj.ntfy_trdp_addr.value=rtnValAry[2];
						}else{
							formObj.ntfy_trdp_addr.value=rtnValAry[7];//eng_addr 
						}
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
						// AEM Notify 선택하면 Acct_info에 찍어주도록 설정함.
						if(airSeaTp=='A' && bndTp=='O' && bizTp=='M'){
							if(document.getElementsByName("disp_ntfy_flg")[0].value == "Y"){
								formObj.mk_txt.value='[NOTIFY]' + '\r\n' + rtnValAry[7];
							}else{
								formObj.mk_txt.value=rtnValAry[7];
							}
						}else if(airSeaTp=='A' && bndTp=='O' && typeof(bizTp)=="undefined"){
							if(typeof(document.getElementsByName("disp_ntfy_flg")[0])=="undefined"){
								formObj.acctg_info_txt.value=rtnValAry[7];
							}else{
								if(document.getElementsByName("disp_ntfy_flg")[0].value == "Y"){
									formObj.acctg_info_txt.value='[NOTIFY]' + '\r\n' + rtnValAry[7];
								}else{
									formObj.acctg_info_txt.value=rtnValAry[7];
								}
							}
						}
					}else if(curObjId == "ashipper"){
						formObj.act_shpr_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.act_shpr_trdp_nm.value=rtnValAry[2];//full_nm
						formObj.act_shp_info.value=rtnValAry[7];//Remark
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					}else if(curObjId == "anotify"){
						/*
						formObj.ANotify_co_in.value=rtnValAry[0];//trdp_cd
						formObj.ANotify_sn_in.value=rtnValAry[1];//cnt_cd
						formObj.ANotify_na_in.value=rtnValAry[2];//trdp_tp_cd
						formObj.AN_pic_in.value=rtnValAry[2];//eng_nm
						formObj.AN_tel_in.value=rtnValAry[4];//locl_nm
						formObj.AN_fax_in.value=rtnValAry[5];//edi_cd
						//trdp_seq
						formObj.AN_addr_in.value=rtnValAry[7];//eng_addr 
						*/
					}else if(curObjId == "liner"){
						formObj.lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.lnr_trdp_nm.value=rtnValAry[2];//full_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					}else if(curObjId == "console"){
						formObj.agt_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.agt_trdp_nm.value=rtnValAry[2];//eng_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
							//alert('COD');
							alert(getLabel('FMS_COM_000000') + "\n\n: BL_CODE_UTIL.461");
						}
					}else if(curObjId == "partner"){
						formObj.prnr_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.prnr_trdp_nm.value=rtnValAry[2];//eng_nm
						formObj.prnr_trdp_addr.value=rtnValAry[7];//eng_addr
						if(rtnValAry[13]=='CR'){
							if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//								alert('COD');
								alert(getLabel('CMM_MSG_005'));
							}
						}else{
							alert(rtnValAry[13]);
						}
					}else if(curObjId == "agent"){
						formObj.agent_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.agent_trdp_nm.value=rtnValAry[2];//eng_nm
						formObj.agent_trdp_addr.value=rtnValAry[7];//eng_addr
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					}else if(curObjId == "third"){
						formObj.third_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.third_trdp_nm.value=rtnValAry[2];//eng_nm
						formObj.third_trdp_addr.value=rtnValAry[7];//eng_addr
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
						if(typeof(document.getElementsByName("iss_trdp_cd")[0])=="undefined"){
						}else{
							formObj.iss_trdp_cd.value=rtnValAry[0];
							formObj.iss_trdp_nm.value=rtnValAry[2];
							formObj.iss_trdp_addr.value=rtnValAry[7];
						}
					}else if(curObjId == "partner2"){
						formObj.prnr_trdp_cd2.value=rtnValAry[0];//trdp_cd
						formObj.prnr_trdp_nm2.value=rtnValAry[2];//eng_nm
						formObj.prnr_trdp_addr2.value=rtnValAry[7];//eng_addr
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					}else if(curObjId == "rcv_wh"){
						formObj.rcv_wh_cd.value=rtnValAry[0];//trdp_cd
						formObj.rcv_wh_nm.value=rtnValAry[2];//eng_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					}else if(curObjId == "carr"){
						formObj.carr_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.carr_trdp_nm.value=rtnValAry[2];//eng_nm
						formObj.carr_trdp_addr.value=rtnValAry[7];//eng_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
						formObj.lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.lnr_trdp_nm.value=rtnValAry[2];//eng_nm 
					}else if(curObjId == "cust"){
						formObj.cust_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.cust_trdp_nm.value=rtnValAry[2];//eng_nm
						formObj.cust_trdp_addr.value=rtnValAry[7];//eng_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					}else if(curObjId == "carr1"){
						formObj.carr_trdp_cd1.value=rtnValAry[0];//trdp_cd
						formObj.carr_trdp_nm1.value=rtnValAry[2];//eng_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					// Ocean Import Master, CY Location
					}else if(curObjId == "cy"){
						formObj.cy_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.cy_trdp_nm.value=rtnValAry[2];//eng_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					// Ocean Import Master, CFS Location
					}else if(curObjId == "cfs"){
						formObj.cfs_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.cfs_trdp_nm.value=rtnValAry[2];//eng_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					// Ocean Import Master, Container Return Place
					}else if(curObjId == "rt"){
						formObj.rt_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.rt_trdp_nm.value=rtnValAry[2];//eng_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					}else if(curObjId == "wh"){
						formObj.fnl_wh_cd.value=rtnValAry[0];//trdp_cd
						formObj.fnl_wh_nm.value=rtnValAry[2];//eng_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					}else if(curObjId == "bond"){
						formObj.bond_carr_cd.value=rtnValAry[0];//trdp_cd
						formObj.bond_carr_nm.value=rtnValAry[2];//eng_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					}else if(curObjId == "iss"){
						formObj.iss_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.iss_trdp_nm.value=rtnValAry[2];//eng_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					}else if(curObjId == "frt_loc"){
						formObj.frt_loc_cd.value=rtnValAry[0];//trdp_cd
						formObj.frt_loc_nm.value=rtnValAry[2];//eng_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
					}else if(curObjId == "trk"){
						//2012.04.27 GOALS EDI
						formObj.trk_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.trk_trdp_nm.value=rtnValAry[2];//eng_nm
//						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
//						}
					}
				}
           break;
    	   case "LINER_POPLIST_M"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		var curObjId=curObj.id;
		   		var cstmTpCd='CS';
		   		if(curObjId=='liner'){
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}
		   		}
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
				var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt?callTp='+cstmTpCd,  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
				if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					if(curObjId == "liner"){
						formObj.lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.lnr_trdp_nm.value=rtnValAry[2];//full_nm
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//							alert('COD');
							alert(getLabel('CMM_MSG_005'));
						}
						if(user_ofc_cnt_cd=="JP"){
							if(rtnValAry[21]!=''){
								formObj.bl_no.value=rtnValAry[21] + '-';
							}
							if(rtnValAry[22]!=''){
								formObj.flt_no.value=rtnValAry[22] + '-';
							}
						}else{
							if(formObj.bl_no.value=='' && rtnValAry[21]!=''){
								formObj.bl_no.value=rtnValAry[21] + '-';
							}
							if(formObj.flt_no.value=='' && rtnValAry[22]!=''){
								formObj.flt_no.value=rtnValAry[22] + '-';
							}
						}
					}
				}
			break;
           case "PIC_POP":
		   		if(formObj.intg_bl_seq.value == ""){
//		   			alert("House B/L 정보가 없습니다. House B/L 저장후 PIC정보를 등록할수 있습니다. ");
		   			alert(getLabel('CMM_MSG_012'));
		   			return;
		   		}else{
			   		rtnary=new Array(1);
			   		var curObjId=curObj.id;
			   		rtnary[0]="";
			   		rtnary[2]=formObj.intg_bl_seq.value;
			   		if(curObjId == "shipper"){
			   			if(formObj.shpr_trdp_cd.value == ""){
				   			//alert("shipper 정보가 없습니다. shipper정보를 선택후  PIC정보를 등록할수 있습니다. ");
				   			//formObj.shpr_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="S01";
			   			rtnary[1]=formObj.shpr_trdp_cd.value;
			   		}else if(curObjId == "consignee"){
			   			if(formObj.cnee_trdp_cd.value == ""){
				   			//alert("consignee 정보가 없습니다. consignee정보를 선택후  PIC정보를 등록할수 있습니다. ");
				   			//formObj.cnee_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="C01";							
			   			rtnary[1]=formObj.cnee_trdp_cd.value;
			   		}else if(curObjId == "notify"){
			   			if(formObj.ntfy_trdp_cd.value == ""){
				   			//alert("notify 정보가 없습니다. notify정보를 선택후  PIC정보를 등록할수 있습니다. ");
				   			//formObj.ntfy_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="N01";
			   			rtnary[1]=formObj.ntfy_trdp_cd.value;
			   		}else if(curObjId == "ashipper"){
			   			if(formObj.act_shpr_trdp_cd.value == ""){
				   			//alert("ashipper 정보가 없습니다. ashipper정보를 선택후  PIC정보를 등록할수 있습니다. ");
				   			//formObj.act_shpr_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="S02";
			   			rtnary[1]=formObj.act_shpr_trdp_cd.value;
			   		}else if(curObjId == "liner"){
			   			if(formObj.lnr_trdp_cd.value == ""){
				   			//alert("liner 정보가 없습니다. liner정보를 선택후  PIC정보를 등록할수 있습니다. ");
				   			//formObj.lnr_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="L01";							
			   			rtnary[1]=formObj.lnr_trdp_cd.value;
			   		}else if(curObjId == "console"){
			   			if(formObj.agt_trdp_cd.value == ""){
				   			//alert("console 정보가 없습니다. console정보를 선택후  PIC정보를 등록할수 있습니다. ");
				   			//formObj.agt_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="L02";							
			   			rtnary[1]=formObj.agt_trdp_cd.value;	
			   		}else if(curObjId == "partner"){
			   			if(formObj.prnr_trdp_cd.value == ""){
				   			//alert("partner 정보가 없습니다. partner정보를 선택후  PIC정보를 등록할수 있습니다. ");
				   			//formObj.prnr_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="P02";
			   			rtnary[1]=formObj.prnr_trdp_cd.value;
			   		}
	    	        var rtnVal =  ComOpenWindow('./SEE_BMD_0028.clt?trdp_cd='+rtnary[1],  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:470px" , true);
		   		}
           break;
           case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
		   		rtnary[0]="1";
    	        var rtnVal =  ComOpenWindow('./CMM_POP_0110.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:483px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.rep_cmdt_cd.value=rtnValAry[0];
					formObj.rep_cmdt_nm.value=rtnValAry[2];
					formObj.rep_cmdt_nm.onchange();
				}
           break;
           case "LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
        	   	rtnary=new Array(3);
       	    	rtnary[0]=airSeaTp;
       	    	rtnary[1]="BL";
       	    	// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "LOCATION_POPLIST";
		   		
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
       	    
           break;
	        case "NODECODE_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
		   		rtnary[0]="1";
	   			rtnary[1]="ND";//Node Code
		   		rtnary[2]="L04";//국가코드
    	        var rtnVal =  ComOpenWindow('./CMM_POP_0030.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px" , true);
    	        if(rtnVal==""||rtnVal=="undefined"||rtnVal==undefined){
				 	return;
				}else{
					var curObjId=curObj.id;
					var rtnValAry=rtnVal.split("|");
					if(curObjId == "dpt"){
						frm1.pol_nod_cd.value=rtnValAry[1];//nod_cd
						frm1.pol_cd.value=rtnValAry[0];//loc_cd
						frm1.pol_nm.value=rtnValAry[2];//loc_nm
					}else if(curObjId == "des"){
						frm1.pod_nod_cd.value=rtnValAry[1];//nod_cd
						frm1.pod_cd.value=rtnValAry[0];//loc_cd
						frm1.pod_nm.value=rtnValAry[2];//loc_nm
					}else if(curObjId == "cfs"){
						frm1.cfs_loc_cd.value=rtnValAry[0];//loc_cd
						frm1.cfs_nod_cd.value=rtnValAry[1];//nod_cd
						frm1.cfs_loc_nm.value=rtnValAry[2];//loc_nm
					//항공 - TS1
					}else if(curObjId == "ts1"){
						if(rtnValAry[0]==''){
							//formObj.ts1_port_cd.focus();
						}else{
							formObj.ts1_port_cd.value=rtnValAry[1];//loc_cd 
						}
					//항공 - TS2
					}else if(curObjId == "ts2"){
						if(rtnValAry[0]==''){
							//formObj.ts2_port_cd.focus();
						}else{
							formObj.ts2_port_cd.value=rtnValAry[1];//loc_cd 
						}
					//항공 - TS3
					}else if(curObjId == "ts3"){
						if(rtnValAry[0]==''){
							//formObj.ts3_port_cd.focus();
						}else{
							formObj.ts3_port_cd.value=rtnValAry[1];//loc_cd 
						}
					}else if(curObjId == "wh"){
						if(rtnValAry[0]==''){
							//formObj.fnl_wh_cd.focus();
						}else{
							formObj.fnl_wh_cd.value=rtnValAry[1];//loc_cd 
							frm1.fnl_wh_nm.value=rtnValAry[2];//loc_nm
						}
					}
				} 
            break;
           case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		var rtnVal =  ComOpenWindow('./CMM_POP_0060.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.sls_usrid.value=rtnValAry[0];
					formObj.sls_usr_nm.value=rtnValAry[1];
					//2011.01.12 김진혁 추가, sls_dept_cd 값을 저장할 수 있도록 수정.
					formObj.sls_dept_cd.value=rtnValAry[3];
				}
           break;
           case "OPR_POPLIST"://담당자openMean 1=화면에서 오픈, 2=그리드에서 오픈
          		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		var rtnVal =  ComOpenWindow('./CMM_POP_0060.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px" , true);
		   		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.opr_usrid.value=rtnValAry[0];
					formObj.opr_usrnm.value=rtnValAry[1];
					formObj.opr_ofc_cd.value=rtnValAry[2];
					formObj.opr_dept_cd.value=rtnValAry[3];
				}
          break;
           case "VESSEL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
        	    rtnary=new Array(3);
        	    rtnary[0]="1";
        	    rtnary[1]="";
		   		rtnary[2]=window;
		   		callBackFunc = "VESSEL_POPLIST";
		   		modal_center_open('./CMM_POP_0140.clt', rtnary, 656,470,"yes");
        	    
           break;
           case "OFFICE_GRID_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(2);
		   		rtnary[0]="1";
//		   		rtnary[1] = "111";
		   		var rtnVal =  ComOpenWindow('./CMM_POP_0150.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:600px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.sls_ofc_cd.value=rtnValAry[0];
				}
           break;
           case "BKNO_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
	   			var rtnVal =  ComOpenWindow('./CMM_POP_0210.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:815px;dialogHeight:480px" , true);
   	        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 		return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_bkg_no.value=rtnValAry[0];//bkg_no
					formObj.f_bl_no.value=rtnValAry[1];//house_bl_no
					formObj.f_intg_bl_seq.value=rtnValAry[2];//intg_bl_seq
				}
				if(formObj.f_bkg_no.value !=""){
					doWork('SEARCHLIST');
                }
			break;  
            case "HBL_POPLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
	   			var rtnVal =  ComOpenWindow('./CMM_POP_0170.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px" , true);
   	        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 		return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_bl_no.value=rtnValAry[0];//house_bl_no
					formObj.intg_bl_seq.value=rtnValAry[2];//intg_bl_seq
					//formObj.f_bkg_no.value    = rtnValAry[3];//bkg_no
//					if(bndTp!='I'){
//						formObj.f_bkg_no.value = '';	
//					}
				}
				if(formObj.f_bl_no.value !=""){				
					doWork('SEARCHLIST');
				}
			break;
            case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
   	        	var rtnVal =  ComOpenWindow('./CMM_POP_0180.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px" , true);
   	        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 		return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_bl_no.value=rtnValAry[0];//house_bl_no
					formObj.intg_bl_seq.value=rtnValAry[2];//intg_bl_seq
					if(formObj.f_bl_no.value!=''){
						doWork('SEARCHLIST');	
					}
					//formObj.f_bkg_no.value  = rtnValAry[3];//bkg_no
					//formObj.f_bkg_no.value = '';
				}
			break;
			case "SR_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
   	        	var rtnVal =  ComOpenWindow('./CMM_POP_0190.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px" , true);
   	        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 		return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_sr_no.value=rtnValAry[0];//sr_no
					if(formObj.f_sr_no.value!=''){
						doWork('SEARCHLIST');	
					}
				}
			break;
			case "WORKFLOW_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]=airSeaTp+bndTp;
			var rtnVal =  ComOpenWindow('./CMM_POP_0100.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:610px;dialogHeight:480px" , true);
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				formObj.jb_tmplt_seq.value=rtnValAry[0];
				formObj.jb_tmplt_nm.value=rtnValAry[1];
			}
			break;
			case "STATE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
		   		rtnary[0]="1";
		   		if(typeof(formObj.pol_cnt_cd) != "undefined"){
		   			rtnary[1]=formObj.pol_cnt_cd.value;
		   		}else{
		   			rtnary[1]="";
		   		}
	   	        var rtnVal =  ComOpenWindow('./CMM_POP_0310.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:610px;dialogHeight:400px" , true);
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.state_cd.value=rtnValAry[0];//cd_val
					formObj.state_nm.value=rtnValAry[2];//cd_nm
				}
			break;
			case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
   	        	var rtnVal =  ComOpenWindow('./CMM_POP_0180.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px" , true);
   	        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 		return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_ref_no.value=rtnValAry[2];//ref_no
					//formObj.f_bl_no.value = '';//house_bl_no
					//formObj.f_sr_no.value = '';
					if(formObj.f_ref_no.value!=''){
						doWork('SEARCHLIST');	
					}
				}
			break;
			case "AES_HBL_POPLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
      		rtnary=new Array(1);
   			rtnary[0]=airSeaTp;
   			rtnary[1]=bndTp;
   			var rtnVal =  ComOpenWindow('./CMM_POP_0170.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px" , true);
	        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 		return;
			}else{
				var rtnValAry=rtnVal.split("|");
				formObj.f_bl_no.value=rtnValAry[0];//house_bl_no
				if(formObj.f_bl_no.value !=""){				
					doWork('SEARCHLIST');
				}
			}
			break;
        break;
      } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			showErrMessage(AJ_CMM_ERR);
		} else {
			showErrMessage(e);
		}
	}
}
function copyImporterToBond(){
	//alert(frm1.f_isf_imp_no.value)
	if(frm1.f_isf_bond_cd.value == ""){
		frm1.f_isf_bond_cd.value=frm1.f_isf_imp_cd.value;
	}
	if(frm1.f_isf_bond_name.value == ""){
		frm1.f_isf_bond_name.value=frm1.f_isf_imp_name.value;
	}
	if(frm1.f_isf_bond_holder.value == ""){
		frm1.f_isf_bond_holder.value=frm1.f_isf_imp_no.value;
	}
	if(frm1.f_isf_bond_act_cd.value == ""){
		frm1.f_isf_bond_act_cd.selectedIndex=1;
	}
	if(frm1.f_isf_bond_tp.value == ""){
		frm1.f_isf_bond_tp.selectedIndex=1;
	}
}
function copyImporterToParty(){
	var sheetObj2=docObjects[1];
	var enttCd="";
	var enttIdQual="";
	var bExistImporter=false; 
	for(var i=2; i<sheetObj2.RowCount()+2; i++){
		enttCd=sheetObj2.GetCellValue(i,"entt_cd");
		enttIdQual=sheetObj2.GetCellValue(i,"entt_id_qual");
		if(enttCd == "IM"){	//Impporter 정보 존재시
//			sheetObj2.SetCellValue(i,"entt_id_qual",frm1.f_isf_imp_qual.value);
//			sheetObj2.SetCellValue(i,"entt_id",frm1.f_isf_imp_no.value);
//			sheetObj2.CellValue(i,"party_cd") = frm1.f_isf_imp_cd.value;
//			sheetObj2.CellValue(i,"entt_name") = frm1.f_isf_imp_name.value;
			bExistImporter=true;
			break;
		}
	}
	if(!bExistImporter){	//Impporter 정보 미존재시
		var rowCnt=0; 
		rowCnt=sheetObj2.DataInsert(-1);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_cd","IM");
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_id_qual",frm1.f_isf_imp_qual.value);
		sheetObj2.SetCellValue(sheetObj2.GetSelectRow(),"entt_id",frm1.f_isf_imp_no.value);
//		sheetObj2.CellValue(sheetObj2.SelectRow,"party_cd") = frm1.f_isf_imp_cd.value;
//		sheetObj2.CellValue(sheetObj2.SelectRow,"entt_name") = frm1.f_isf_imp_name.value;
		for(var i=2; i<sheetObj2.RowCount()+2; i++){
	   		sheetObj2.SetCellValue(i, "entt_seq",i-1);
	   	}
	}
}
function setInformal(isfShiptp){
	if(isfShiptp == "11"){
		document.getElementById('informal').style.display=""
	}else{
		document.getElementById('informal').style.display="none"
	}
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	var s_type="";
//	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}else if ( tmp == "onChange" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}
//	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value=masterVals[0];
				formObj.f_pol_nm.value=masterVals[3];
			}else if(CODETYPE == "location_fpod"){
				formObj.f_fpod.value=masterVals[0];
				formObj.f_fpod_name.value=masterVals[3];
			}else if(CODETYPE == "location_ts_cd"){
				formObj.f_ts_cd.value=masterVals[0];
				formObj.f_ts_nm.value=masterVals[3];
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value=masterVals[0];
				formObj.f_del_nm.value=masterVals[3];
			}else if(CODETYPE == "location_hub_cd"){
				formObj.f_hub_cd.value=masterVals[0];
				formObj.f_hub_nm.value=masterVals[3];
			}else if(CODETYPE == "location_usa_cd"){
				formObj.f_usa_cd.value=masterVals[0];
				formObj.f_usa_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=masterVals[0]; 
				formObj.s_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_fpod"){
				formObj.f_fpod.value="";
				formObj.f_fpod_name.value="";
			}else if(CODETYPE == "location_last_pod"){
				formObj.f_lst_pol_cd.value="";
				formObj.f_lst_pol_nm.value="";
			}else if(CODETYPE == "location_ts_cd"){
				formObj.f_ts_cd.value="";
				formObj.f_ts_nm.value="";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value="";
				formObj.f_del_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=""; 
				formObj.s_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function IMPORTER(rtnVal){
	var formObj=document.frm1;    		
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		//formObj.f_isf_imp_cd.value=rtnValAry[0];
		formObj.f_isf_imp_name.value=rtnValAry[2];//full_nm
		if(rtnValAry[28] == "E"){
			formObj.f_isf_imp_qual.value="EI";
			formObj.f_isf_imp_no.value=rtnValAry[23];
			formObj.f_isf_imp_no.focus();
		}else{
			formObj.f_isf_imp_qual.focus();
		}
	}   
	copyImporterToBond(); 
}

function BOND(rtnVal){
	var formObj=document.frm1;    		
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_isf_bond_cd.value=rtnValAry[0];
		formObj.f_isf_bond_name.value=rtnValAry[2];//full_nm
		//formObj.f_isf_bond_name.value = rtnValAry[23];
		//formObj.f_isf_bond_name.value = rtnValAry[28];
	//	alert(rtnValAry[23]);
	//	alert(rtnValAry[28]);
	}        
}

function VESSEL_POPLIST(rtnVal){
	var formObj=document.frm1;    	
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_isf_vessel.value=rtnValAry[1];
	}
}

function LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;    	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_fpod.value=rtnValAry[0];
		formObj.f_fpod_name.value=rtnValAry[2];
	}
}

function PARTY_CD(rtnVal){
	var formObj=document.frm1;    	
	var sheetObj=docObjects[1];
	var Row = sheetObj.GetSelectRow();
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(Row, "party_cd",rtnValAry[0]);
		sheetObj.SetCellValue(Row, "entt_name",rtnValAry[2]);
		//Zip code
		sheetObj.SetCellValue(Row, "add_zip_cd",rtnValAry[11]);
		//Country
		sheetObj.SetCellValue(Row, "add_cntry",rtnValAry[12]);
		//Address 
		sheetObj.SetCellValue(Row, "add_info",rtnValAry[16]);
		//City
		sheetObj.SetCellValue(Row, "add_ct",rtnValAry[19]);
		//State
		sheetObj.SetCellValue(Row, "add_cntry_sub",rtnValAry[20]);
	}    
}

function ADD_CT_CD(rtnVal){
	var formObj=document.frm1;    	
	var sheetObj=docObjects[1];
	var Row = sheetObj.GetSelectRow();
	if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
	 	return;
	}else{
		if(rtnVal[0]==''){
		}else{
			rtnVal=rtnVal.split("|");
			sheetObj.SetCellValue(Row, "add_ct_cd",rtnVal[0]);
			sheetObj.SetCellValue(Row, "add_ct",rtnVal[2]);
		}
	} 
}

function ADD_CNTRY(rtnVal){
	var formObj=document.frm1;    	
	var sheetObj=docObjects[1];
	var Row = sheetObj.GetSelectRow();
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(Row, "add_cntry",rtnValAry[0]);
		sheetObj.SetCellValue(Row, "add_cntry_nm",rtnValAry[1]);
	}
}

function HTS_CD(rtnVal){
	var formObj=document.frm1;    	
	var sheetObj=docObjects[2];
	var Row = sheetObj.GetSelectRow();
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(Row, "hts_cd",rtnValAry[0]);
	}
}

function CNTRY_ORG(rtnVal){
	var formObj=document.frm1;    	
	var sheetObj=docObjects[2];
	var Row = sheetObj.GetSelectRow();
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(Row, "cntry_org",rtnValAry[0]);
		sheetObj.SetCellValue(Row, "cntry_org_nm",rtnValAry[1]);
	}
}