//=========================================================
//*@FileName   : AIC_WOM_0010.jsp
//*@FileTitle  :
//*@Description:
//*@author     :
//*@version    :
//*@since      :
//*@Change history:
//*@author     :	Tuan.Chau	
//*@version    :	2.0
//*@since      :	2014-06-24
//=========================================================
var rtnary=new Array(2);
var callBackFunc = "";
var cur_curObj;

var defaultVals = [];
var WO_RETURN_LOC_BLANK = ""; //Pickup 데이터를 불러왔을때 Return 데이터에 넣을지 말지 여부 변수

//Tab order 정의
var wo_no_tab = 1;


var nextTabSet = 0;

//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	var tabObjs = document.getElementsByName('tabLayer');
	if (isNumSep == "01") {
		currTab = isNumSep;	// 탭상태저장
		tabObjs[0].style.display = 'inline';
		tabObjs[1].style.display = 'none';
		tabObjs[2].style.display = 'none';
		tabObjs[3].style.display = 'none';
	} else if (isNumSep == "02") {
		currTab = isNumSep;	// 탭상태저장
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = 'inline';
		tabObjs[2].style.display = 'none';
		tabObjs[3].style.display = 'none';
	} else if (isNumSep == "03") {
		currTab = isNumSep;	// 탭상태저장
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = 'none';
		tabObjs[2].style.display = 'inline';
		tabObjs[3].style.display = 'none';
	} else if (isNumSep == "04") {
		currTab = isNumSep;	// Work Order tab
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = 'none';
		tabObjs[2].style.display = 'none';
		tabObjs[3].style.display = 'inline';
		
	}
}






function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	formObj.f_cmd.value = cmd;
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./AIC_WOM_0010AJ.clt",
		   dataType: 'xml',
		   data: $("form" ).serialize(),
		   success: function(data){
			   setFieldValue( formObj.sys_ofc_cd, $('sysOfcCd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.wo_sts_cd, $('wo_sts_cd',data).text());
			   setFieldValue( formObj.bnd_clss_cd, $('bnd_clss_cd',data).text());
			   setFieldValue( formObj.oth_seq, $('oth_seq',data).text());
			   setFieldValue( formObj.pkup_rmk, $('pkup_rmk',data).text());
			   setFieldValue( formObj.f_wo_no, $('wo_no',data).text());
			   setFieldValue( formObj.wo_no, $('wo_no',data).text());
			   setFieldValue( formObj.wo_tp_cd, $('wo_tp_cd',data).text());
			   setFieldValue( formObj.pickup_trdp_cd, $('pickup_trdp_cd',data).text());
			   setFieldValue( formObj.pickup_trdp_nm, $('pickup_trdp_nm',data).text());
			   setFieldValue( formObj.pickup_trdp_addr, $('pickup_trdp_addr',data).text());
			   setFieldValue( formObj.pickup_pic, $('pickup_pic',data).text());
			   setFieldValue( formObj.pickup_phn, $('pickup_phn',data).text());
			   setFieldValue( formObj.pickup_fax, $('pickup_fax',data).text());
			   setFieldValue( formObj.pickup_ref_no, $('pickup_ref_no',data).text());
			   setFieldValue( formObj.pickup_dt, $('pickup_dt',data).text());
			   setFieldValue( formObj.pickup_tm, $('pickup_tm',data).text());
			   setFieldValue( formObj.pickup_to_tm, $('pickup_to_tm',data).text());
			   setFieldValue( formObj.delivery_trdp_cd, $('delivery_trdp_cd',data).text());
			   setFieldValue( formObj.delivery_trdp_nm, $('delivery_trdp_nm',data).text());
			   setFieldValue( formObj.delivery_trdp_addr, $('delivery_trdp_addr',data).text());
			   setFieldValue( formObj.delivery_pic, $('delivery_pic',data).text());
			   setFieldValue( formObj.delivery_phn, $('delivery_phn',data).text());
			   setFieldValue( formObj.delivery_fax, $('delivery_fax',data).text());
			   setFieldValue( formObj.delivery_ref_no, $('delivery_ref_no',data).text());
			   setFieldValue( formObj.delivery_dt, $('delivery_dt',data).text());
			   setFieldValue( formObj.delivery_tm, $('delivery_tm',data).text());
			   setFieldValue( formObj.delivery_to_tm, $('delivery_to_tm',data).text());
			   setFieldValue( formObj.return_trdp_cd, $('return_trdp_cd',data).text());
			   setFieldValue( formObj.return_trdp_nm, $('return_trdp_nm',data).text());
			   setFieldValue( formObj.return_trdp_addr, $('return_trdp_addr',data).text());
			   setFieldValue( formObj.return_pic, $('return_pic',data).text());
			   setFieldValue( formObj.return_phn, $('return_phn',data).text());
			   setFieldValue( formObj.return_fax, $('return_fax',data).text());
			   setFieldValue( formObj.return_ref_no, $('return_ref_no',data).text());
			   setFieldValue( formObj.return_dt, $('return_dt',data).text());
			   setFieldValue( formObj.return_tm, $('return_tm',data).text());
			   setFieldValue( formObj.return_to_tm, $('return_to_tm',data).text());
			   setFieldValue( formObj.bl_no, $('bl_no',data).text());
			   //OFVFOUR-7798: [Southeast] Update the Title/Subject of Pickup# Notice
			   setFieldValue( formObj.mbl_no_ref, $('mbl_no_ref',data).text());
			   setFieldValue( formObj.mbl_no, $('bl_no',data).text());
			   //#2668 [PATENT] Bugs were reported when doing internal testing (Work Order)
//			   setFieldValue( formObj.ref_no, $('bill_to_ref_no',data).text());
			   setFieldValue( formObj.ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.oth_ref_no, $('bl_no',data).text());
			   setFieldValue( formObj.bill_to_trdp_cd, $('bill_to_trdp_cd',data).text());
			   setFieldValue( formObj.bill_to_trdp_nm, $('bill_to_trdp_nm',data).text());
			   setFieldValue( formObj.bill_to_trdp_addr, $('bill_to_trdp_addr',data).text());
			   setFieldValue( formObj.bill_to_pic, $('bill_to_pic',data).text());
			   setFieldValue( formObj.bill_to_phn, $('bill_to_phn',data).text());
			   setFieldValue( formObj.bill_to_fax, $('bill_to_fax',data).text());
			   setFieldValue( formObj.bill_to_ref_no, $('bill_to_ref_no',data).text());
			   setFieldValue( formObj.trucker_trdp_cd, $('trucker_trdp_cd',data).text());
			   setFieldValue( formObj.trucker_trdp_nm, $('trucker_trdp_nm',data).text());
			   setFieldValue( formObj.trucker_trdp_addr, $('trucker_trdp_addr',data).text());
			   setFieldValue( formObj.trucker_pic, $('trucker_pic',data).text());
			   setFieldValue( formObj.trucker_phn, $('trucker_phn',data).text());
			   setFieldValue( formObj.trucker_fax, $('trucker_fax',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.cgo_itm_cmdt_cd, $('cgo_itm_cmdt_cd',data).text());
			   setFieldValue( formObj.cgo_itm_cmdt_nm, $('cgo_itm_cmdt_nm',data).text());
			   setFieldValue( formObj.cgo_pck_qty, $('cgo_pck_qty',data).text());
			   setFieldValue( formObj.cgo_pck_ut_cd, $('cgo_pck_ut_cd',data).text());
			   setFieldValue( formObj.act_wgt_k, $('act_wgt_k',data).text());
			   setFieldValue( formObj.act_wgt_l, $('act_wgt_l',data).text());
			   setFieldValue( formObj.cgo_meas_m, $('cgo_meas_m',data).text());
			   setFieldValue( formObj.cgo_meas_f, $('cgo_meas_f',data).text());
			   setFieldValue( formObj.cgo_meas_m, $('cgo_meas_m',data).text());
			   setFieldValue( formObj.cgo_meas_f, $('cgo_meas_f',data).text());
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.prt_md_yn, $('prt_md_yn',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   setFieldValue( formObj.wh_instr_txt, $('wh_instr_txt',data).text());
			   setFieldValue( formObj.cstms_instr_txt, $('cstms_instr_txt',data).text());
			   /*#2045 hsk*/
			   setFieldValue( formObj.drv_nm, $('drv_nm',data).text());
			   setFieldValue( formObj.drv_phn, $('drv_phn',data).text());
			   setFieldValue( formObj.trk_plat_no, $('trk_plat_no',data).text());
			   setFieldValue( formObj.wh_lodg_instr_txt, $('wh_lodg_instr_txt',data).text());
			   
			   setFieldValue( formObj.cstms_cust_cd, $('cstms_cust_cd',data).text());
			   setFieldValue( formObj.cstms_cust_nm, $('cstms_cust_nm',data).text());
			   setFieldValue( formObj.cstms_cust_pic, $('cstms_cust_pic',data).text());
			   setFieldValue( formObj.cstms_cust_phn, $('cstms_cust_phn',data).text());
			   setFieldValue( formObj.cstms_cust_fax, $('cstms_cust_fax',data).text());
			   setFieldValue( formObj.cut_off_dt_tm, $('cut_off_dt_tm',data).text());
			   setFieldValue( formObj.exp_ref_no, $('exp_ref_no',data).text());
			   setFieldValue( formObj.cust_cd, $('cust_cd',data).text());
			   setFieldValue( formObj.cust_nm, $('cust_nm',data).text());
			   setFieldValue( formObj.cust_pic, $('cust_pic',data).text());
			   setFieldValue( formObj.cust_phn, $('cust_phn',data).text());
			   setFieldValue( formObj.cust_fax, $('cust_fax',data).text());
			   setFieldValue( formObj.cust_addr, $('cust_addr',data).text());
			   setFieldValue( formObj.wh_cd, $('wh_cd',data).text());
			   setFieldValue( formObj.wh_nm, $('wh_nm',data).text());
			   setFieldValue( formObj.wh_pic, $('wh_pic',data).text());
			   setFieldValue( formObj.wh_phn, $('wh_phn',data).text());
			   setFieldValue( formObj.wh_fax, $('wh_fax',data).text());
			   setFieldValue( formObj.wh_ref_no, $('wh_ref_no',data).text());
			   setFieldValue( formObj.trnk_vsl_cd, $('trnk_vsl_cd',data).text());
			   setFieldValue( formObj.trnk_vsl_nm, $('trnk_vsl_nm',data).text());
			   setFieldValue( formObj.cstms_tp_cd, $('cstms_tp_cd',data).text());
			   setFieldValue( formObj.cut_off_to_tm, $('cut_off_to_tm',data).text());
			   setFieldValue( formObj.wh_to_tm, $('wh_to_tm',data).text());
			   setFieldValue( formObj.wh_tm, $('wh_tm',data).text());
			   setFieldValue( formObj.wh_dt, $('wh_dt',data).text());
			   setFieldValue( formObj.cut_off_tm, $('cut_off_tm',data).text());
			   setFieldValue( formObj.cut_off_dt, $('cut_off_dt',data).text());
			   
			   setFieldValue( formObj.cstms_cust_addr, $('cstms_cust_addr',data).text());
			   setFieldValue( formObj.wh_addr, $('wh_addr',data).text());
			   setFieldValue( formObj.cargo_tp_cd, $('cargo_tp_cd',data).text());
			   setFieldValue( formObj.cntr_smry, $('cntr_smry',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());

			   setFieldValue( formObj.rgst_usrid, $('rgst_usrid',data).text());
			   setFieldValue( formObj.modi_usrid, $('modi_usrid',data).text());

			   setFieldValue( formObj.rgst_tms, $('rgst_tms',data).text());
			   setFieldValue( formObj.modi_tms, $('modi_tms',data).text());

			   //#2114
			   setFieldValue( formObj.biz_unit_trdp_cd, $('biz_unit_trdp_cd',data).text());
			   setFieldValue( formObj.biz_unit_trdp_nm, $('biz_unit_trdp_nm',data).text());
			   //OFVFOUR-7857: [SENKO USA] Container Summary on Pickup & Delivery Order form
			   setFieldValue( formObj.cntr_info, $('cntr_info',data).text());
			   if(formObj.prt_md_yn.value == "Y"){
				   formObj.prt_md_yn.checked = true;
			   }else{
				   formObj.prt_md_yn.checked = false;
			   }
			   
//               doBtnAuthority(attr_extension);
//			   loadPage();
//	           loadData();
	           btnLoad();
			   doHideProcess();
			   if(formObj.f_cmd.value== REMOVE){
			       showCompleteProcess();
			   }
			   
			   // #2068 - Document 번호 Title 에 반영
			   setTabTitle(formObj.wo_no.value);
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
	//OFVFOUR-7857: [SENKO USA] Container Summary on Pickup & Delivery Order form

	if (frm1.cntr_info.value == '') {
		cntrInfoSet();
	}
}

function doWork(srcName, curObj){
	
	// #1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
	setSaveConfirmMsg(srcName);
	
	var formObj=document.frm1;
	cur_curObj = curObj; 
	if(!btnGetVisible(srcName)){
		return;
	}
	try {
		switch(srcName) {
		
			case "SEARCH":
				if(formObj.f_wo_no.value==''){
//					alert('Please enter a Mandatory Value! (Red indicates required field)!');
					alert(getLabel('FMS_COM_ALT014'));
					formObj.f_wo_no.focus();
				}else{
					doShowProcess();
		       		/*formObj.f_cmd.value=SEARCH;
	       			formObj.action="./AIC_WOM_0010.clt";
				    formObj.submit()*/;
				    formObj.f_cmd.value=SEARCH;
				    submitForm(SEARCH);
				}
				doWork("SEARCHLIST");
			break;
	        case "SEARCHLIST":
	       		formObj.f_cmd.value=SEARCHLIST;
	       		docObjects[0].DoSearch("AIC_WOM_0011GS.clt", FormQueryString(formObj) );
	        break;
			case "NEW":
				//'Do you want to CREATE?'
//				    doShowProcess();
//					formObj.f_cmd.value = '';
//	       			formObj.action = "./AIC_WOM_0010.clt";
//				    formObj.submit();
				/*
				    clearAll();
//				    btnBL.style.display = 'inline';				// LHK 20130812 BL NO /REF_NO 에 대한 display 설정 없앰
				    formObj.act_wgt_k.value="0.00";
				    formObj.act_wgt_l.value="0.00";
				    formObj.cgo_meas_m.value="0.000";
				    formObj.cgo_meas_f.value="0.000";
				    getBtnObj('btnPrint').style.display='none';
					getBtnObj('cancelObj').style.display='none';
					getBtnObj('btnDelete').style.display='none';
					*/
//					var currLocUrl = this.location.href;
//					currLocUrl = currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
//					currLocUrl = '.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
//
//					parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
//					break;
				    /*
					// NEW 버튼 누를시 새로운창이 뜨는 이유?? 일단 원복
				    clearAll();
				    formObj.act_wgt_k.value="0.00";
				    formObj.act_wgt_l.value="0.00";
				    formObj.cgo_meas_m.value="0.000";
				    formObj.cgo_meas_f.value="0.000";
				    getBtnObj('btnPrint').style.display='none';
				    getBtnObj('btnSblPrint').style.display='none';
				    
					getBtnObj('cancelObj').style.display='none';
					getBtnObj('btnDelete').style.display='none';
					formObj.f_cmd.value='';
	       			//formObj.action="./AIC_WOM_0010.clt";
				    //formObj.submit();
	       			submitForm('');
	       			*/
				
					// #2084 - [PATENT] NEW 버튼 Confirm 메시지 추가
        			if(confirm(getLabel('FMS_COM_CFMNEW'))){
					    //#892 #876 #807
						doShowProcess();
					    var hash;
					    var strLocation="";
					    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					    for(var i = 0; i < hashes.length; i++)
					    {
					        hash = hashes[i].split('=');
					        if(hash[0] == 'air_sea_clss_cd' 
					           ||hash[0] == 'bnd_clss_cd'	
					           ||hash[0] == 'biz_clss_cd'	
					        ){
					        	strLocation +=   '&'+hash[0]+'='+hash[1];
					        }
					    }
					    
						var currLocUrl = this.location.href;
						currLocUrl = currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
						currLocUrl = '.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']' + strLocation;
						window.location.href = currLocUrl;
        			}
			break;
			case "SAVE":
				if(woCheckInpuVals()){
					var cMsg=saveMsg;
					var wFlag='F';
					if(parseFloat(trim(formObj.cgo_meas_m.value).replace(/,/g, '')) <= 0 && formObj.air_sea_clss_cd.value == 'S')
					{
						cMsg='FMS_COM_CFMMEAS';
						wFlag='M';
					}
					if(parseFloat(trim(formObj.act_wgt_k.value).replace(/,/g, '')) <= 0 )
					{
						cMsg='FMS_COM_CFMGRS';
						wFlag='G';
					}
					if(confirm(getLabel(cMsg))){
						if(formObj.prt_md_yn.checked){
							formObj.prt_md_yn.value = "Y"; 
						}else{
							formObj.prt_md_yn.value = "N"; 
						}
						gridAdd(1);
						docObjects[1].SetCellValue(1, 1,1);
						doShowProcess();
						if(formObj.wo_no.value==''){
							formObj.f_cmd.value=ADD;
						}else{
							formObj.f_cmd.value=MODIFY;
						}	
						var cntrSheetData=docObjects[0].GetSaveString(true);
	             	    docObjects[1].DoAllSave("./AIC_WOM_0010GS.clt", FormQueryString(formObj)+'&'+cntrSheetData, true);
	             	    //alert(formObj.wo_no.value);
	             	    // cntr정보를 update한다.
	             	    //formObj.f_cmd.value = MULTI01;
	             	    //docObjects[0].DoSave("./AIC_WOM_0010GS.clt", FormQueryString(formObj), -1,false);
					}else{
						if(wFlag == 'G'){	formObj.act_wgt_k.focus();	return; }
						if(wFlag == 'M' && formObj.air_sea_clss_cd.value == 'S'){	formObj.cgo_meas_m.focus();	return; }
					}
				}
			break;
			case "REMOVE"://삭제
	        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
	                   formObj.f_cmd.value=REMOVE;
//	            	   doShowProcess();
	            	  // formObj.submit();
	            	   submitForm(REMOVE);
	        	   }
			break;
			case "HBLSMRY":
				// 부킹번호 선택시 데이터 새로 가져오기 
				if(formObj.bnd_clss_cd.value == "" || formObj.bnd_clss_cd.value == "G"){	/* [20130410 OJG]*/			
					var oth_ref_no=trim(formObj.oth_ref_no.value);
					if(oth_ref_no ==""){
						alert(getLabel('AIE_BMD_MSG67'));
						formObj.oth_ref_no.focus();
						return;
					}
					ajaxSendPost(dispOthHblSmry, 'reqVal', '&goWhere=aj&bcKey=getOthblSmryInfo&oth_ref_no='+oth_ref_no, './GateServlet.gsl');
				}else{
					var intg_bl_seq=formObj.intg_bl_seq.value;
					var bl_no="";
					var mbl_no="";
					var ref_no="";
					var oth_ref_no="";
					var bkg_seq="";
					var air_sea_clss_cd=formObj.air_sea_clss_cd.value;
					var bnd_clss_cd=formObj.bnd_clss_cd.value;
					var biz_clss_cd=formObj.biz_clss_cd.value;
					if(formObj.biz_clss_cd.value == 'H'){
						bl_no=formObj.bl_no.value;
					}
					if(formObj.biz_clss_cd.value == 'M'){
						mbl_no=formObj.mbl_no.value;
						ref_no=formObj.ref_no.value;
					}
					if(formObj.biz_clss_cd.value == ''){
						oth_ref_no=formObj.oth_ref_no.value;
					}
					//Booking DATA를 POD에 뿌려줄 경우
					if(formObj.biz_clss_cd.value == 'CU' || formObj.biz_clss_cd.value == 'CA'){
						bkg_seq=formObj.bkg_seq.value;
					}
										
					ajaxSendPost(dispHblSmry, 'reqVal', '&goWhere=aj&bcKey=searchBkgSmry&intg_bl_seq='+intg_bl_seq + '&bl_no='+bl_no + '&mbl_no='+mbl_no + '&ref_no='+ref_no+ '&oth_ref_no='+oth_ref_no+ '&air_sea_clss_cd='+air_sea_clss_cd+ '&bnd_clss_cd='+bnd_clss_cd+ '&biz_clss_cd='+biz_clss_cd+'&bkg_seq=' + bkg_seq, './GateServlet.gsl');
				}
				doWork("SEARCHLIST");
			break;
			case "ISSUE":		//ISSUE
				if(formObj.wo_sts_cd.value!="A"){
					alert(getLabel('AIC_WOM_0010_MSG33'));
					return;
				}else{
					//Do you want to Issue?
					if(confirm(getLabel('FMS_COM_CFMISS'))){
						formObj.f_cmd.value=COMMAND01;
						gridAdd(1);
						docObjects[1].SetCellValue(1, 1,1);
						doShowProcess();
	             	    docObjects[1].DoAllSave("./AIC_WOM_0010GS.clt", FormQueryString(formObj), true);
					}
				}
			break;
			case "CANCEL":		//ISSUE Cancel
				if(formObj.wo_sts_cd.value!="B"){
					alert(getLabel('AIC_WOM_0010_MSG34'));
					return;
				}else{
					if(confirm(getLabel('FMS_COM_CFMCAN'))){
						formObj.f_cmd.value=COMMAND02;
						gridAdd(1);
						docObjects[1].SetCellValue(1, 1,1);
						doShowProcess();
	             	    docObjects[1].DoAllSave("./AIC_WOM_0010GS.clt", FormQueryString(formObj), true);
					}
				}
			break;
			case "COPY":
				if(confirm(getLabel('FMS_COM_CFMCPY'))){
					doShowProcess();
					formObj.f_wo_no.value='';
					formObj.wo_no.value='';
					//formObj.bkg_no.value = '';
					formObj.hbl_no.value='';
					formObj.intg_bl_seq.value='';
					formObj.wo_sts_cd.value='NA';
					formObj.cgo_itm_cmdt_cd.value='';
					formObj.cgo_itm_cmdt_nm.value='';
					formObj.cgo_pck_qty.value='';
					formObj.cgo_pck_ut_cd.value='';
					formObj.act_wgt_k.value='0.00';
					formObj.chg_wgt.value='';
//					formObj.chg_wgt_ut_cd.value = '';
//					formObj.grs_wgt_ut_cd.value = '';
					formObj.cgo_meas_m.value='0.000';
//					formObj.cgo_meas_ut_cd.value = '';
					formObj.lnr_trdp_nm.value='';
					formObj.lnr_trdp_cd.value='';
					formObj.lnr_bkg_no.value='';
					modiObj.style.display='none';
					prntObj.style.display='none';
					getBtnObj('cancelObj').style.display='none';
		            getBtnObj('issObj').style.display='none';
					copyObj.style.display='none';
					var tmpBtn=getObj('bkgBtn');
		            tmpBtn.style.display='block';
					doHideProcess();
				}
			break;
			case "WO_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈		
	         	rtnary=new Array(2);   		
	   			rtnary[0]=formObj.air_sea_clss_cd.value;
	   			rtnary[1]=formObj.bnd_clss_cd.value;
	   			rtnary[2]=formObj.biz_clss_cd.value;
	   			
	   			callBackFunc = "WO_POPLIST";
	   			modal_center_open('./CMM_POP_0200.clt', rtnary, 1150,484,"yes");
			break;  
			case "HBL_POPLIST":
	          	rtnary=new Array(1);
	          	rtnary[0]=formObj.air_sea_clss_cd.value;
	   			rtnary[1]=formObj.biz_clss_cd.value;
				callBackFunc = "HBL_POPLIST";
	  	        modal_center_open('./CMM_POP_0170.clt', rtnary, 818,468,"yes");
			break;
			
           case "BKNO_DO_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
        		rtnary=new Array(1);
        		rtnary[0] = "";
	   			rtnary[1] = '';
	   			//rtnary[2] = formObj.biz_clss_cd.value; //Customer Booking:CU, Carrier Booking:CA
				if(formObj.biz_clss_cd.value == 'CU'){
					callBackFunc = "CU_BKNO_DO_POPLIST_BLANK";
					modal_center_open('./CMM_POP_0210.clt', rtnary, 815,480,"yes");
				} else if (formObj.biz_clss_cd.value == 'CA'){
					callBackFunc = "CA_BKNO_DO_POPLIST_BLANK";
					modal_center_open('./CMM_POP_0280.clt', rtnary, 815,480,"yes");
				}
			break;        
			
			
			case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=formObj.air_sea_clss_cd.value; //S=해운에서 오픈, A=항공에서 오픈
				rtnary[1]=formObj.bnd_clss_cd.value; //I: In-bound, O: Out-bound
				callBackFunc = "MBL_POPLIST";
	  	        modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			break;			
			case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
					rtnary=new Array(3);
					rtnary[0]=formObj.air_sea_clss_cd.value;
					rtnary[1]=formObj.bnd_clss_cd.value;
					callBackFunc = "REF_POPLIST";
					 modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			break;
			case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				var id = curObj.id;
				tmp_tp = curObj.type;
				rtnary=new Array(1);
				/* jsjang 2013.8.6 #18801 trade partner 조회조건 변경 */
				var iata_val="";
		   		var cstmTpCd='CS';
		   		var airSeaTp=formObj.air_sea_clss_cd.value;
		   		//alert(airSeaTp);
		   		rtnary[0]="1";
		   		rtnary[1]="";
		   		rtnary[2]=window;
		   		if(id=="pic"){
//		   			rtnary[3]=formObj.pickup_trdp_nm.value;	
		   			cstmTpCd='';
				}else if(id=="del") {
//					rtnary[3]=formObj.delivery_trdp_nm.value;
					cstmTpCd='';
				}else if(id=="trn") {
//					rtnary[3]=formObj.return_trdp_nm.value;
					cstmTpCd='';
				}else if(id=="bil") {
//					rtnary[3]=formObj.bill_to_trdp_nm.value;	
					cstmTpCd='';
				}else if(id=="trk") {
//					rtnary[3]=formObj.trucker_trdp_nm.value;	
					//cstmTpCd = 'TK';
					/* #23817 D/O PRINT시 TRUCKER 로 검색이아닌 ALL, jsjang 2013.11.22*/
					cstmTpCd='';
				}else if(id=="cstms_cust") {
//					rtnary[3]=formObj.trucker_trdp_nm.value;	
					//cstmTpCd = 'TK';
					/* #23817 D/O PRINT시 TRUCKER 로 검색이아닌 ALL, jsjang 2013.11.22*/
					cstmTpCd='CB';
				}else if(id=="wh") {
//					rtnary[3]=formObj.trucker_trdp_nm.value;	
					//cstmTpCd = 'TK';
					/* #23817 D/O PRINT시 TRUCKER 로 검색이아닌 ALL, jsjang 2013.11.22*/
					cstmTpCd='WH';
				}else if(id=="biz") {
//					rtnary[3]=formObj.trucker_trdp_nm.value;	
					//cstmTpCd = 'TK';
					/* #23817 D/O PRINT시 TRUCKER 로 검색이아닌 ALL, jsjang 2013.11.22*/
					cstmTpCd='';
				}
				else if(id=="liner") {
//					rtnary[3]=formObj.lnr_trdp_nm.value;	
					//cstmTpCd = 'LN';
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}						
				}
		   		rtnary[3]="";
		   		callBackFunc = "PARTNER_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");
           break;
			case "PARTNER_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				var id=curObj.id;			
				rtnary=new Array(1);
				/* jsjang 2013.8.6 #18801 trade partner 조회조건 변경 */
				var iata_val="";
		   		var cstmTpCd='CS';
		   		var airSeaTp=formObj.air_sea_clss_cd.value;
		   		//alert(airSeaTp);
		   		rtnary[0]="1";
		   		rtnary[1]="";
		   		rtnary[2]=window;
		   		if(id=="pic"){
		   			rtnary[3]=formObj.pickup_trdp_nm.value;	
		   			cstmTpCd='';
				}else if(id=="del") {
					rtnary[3]=formObj.delivery_trdp_nm.value;
					cstmTpCd='';
				}else if(id=="trn") {
					rtnary[3]=formObj.return_trdp_nm.value;
					cstmTpCd='';
				}else if(id=="bil") {
					rtnary[3]=formObj.bill_to_trdp_nm.value;	
					cstmTpCd='';
				}else if(id=="trk") {
					rtnary[3]=formObj.trucker_trdp_nm.value;	
					//cstmTpCd = 'TK';
					/* #23817 D/O PRINT시 TRUCKER 로 검색이아닌 ALL, jsjang 2013.11.22*/
					cstmTpCd='';
				}
				else if(id=="cstms_cust") {
					rtnary[3]=formObj.cstms_cust_nm.value;
					cstmTpCd='CB';
				}else if(id=="wh") {
					rtnary[3]=formObj.wh_nm.value;
					cstmTpCd='WH';
				}else if(id=="cust") {
					rtnary[3]=formObj.cust_nm.value;
				}else if(id=="biz") {
					rtnary[3]=formObj.biz_unit_trdp_nm.value;
					cstmTpCd='';
				}
				else if(id=="liner") {
					rtnary[3]=formObj.lnr_trdp_nm.value;	
					//cstmTpCd = 'LN';
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}						
				}
		   		
		   		callBackFunc = "PARTNER_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");
           break;
           case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈           
           		rtnary=new Array(1);	   		
		   		rtnary[0]="1";		   		
    	        var rtnVal =  ComOpenWindow('./CMM_POP_0110.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:483px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.cgo_itm_cmdt_cd.value=rtnValAry[0];
					formObj.cgo_itm_cmdt_nm.value=rtnValAry[2];
				}
           break;
           case "PACKAGE_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
		   		rtnary[0]="1";
    	        var rtnVal =  ComOpenWindow('./CMM_POP_0120.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.cgo_pck_ut_cd.value=rtnValAry[0];
				}
           break;
           case "SBL_PRINT":
       	    // 프린트
       	    var prt_md_yn="";
          	    //#52969[STAR CLUSTER] MISC. OTHER FILE DELIVERY ORDER FORM CHANGE
       	    /*//Blue Print #244
       	    if (formObj.biz_clss_cd.value==""){ // Other 신규
       	    	formObj.file_name.value='pickup_delivery_instruction_other.mrd';
       	    }else{
       	    	formObj.file_name.value='pickup_delivery_instruction_01.mrd';
       	    }
       	    */
       	    	formObj.file_name.value = 'straight_b_l.mrd'
				formObj.title.value='';
				if(formObj.prt_md_yn.checked==true){
					prt_md_yn="Y";
				}else{
					prt_md_yn="N";
				}
				//Parameter Setting
				var param='';
				param += '[' + formObj.f_wo_no.value + ']'; //$1
				param += '[' + formObj.ofc_locl_nm.value + ']'; //$2
				param += '[' + formObj.eml.value + ']'; //$3
				param += '[' + formObj.user_name.value + ']'; //$4
				param += '[' + formObj.intg_bl_seq.value + ']'; //$5
				param += '[' + formObj.user_phn.value + ']'; //$6
				param += '[' + formObj.user_fax.value + ']'; //$7
				param += '[' + prt_md_yn + ']'; //$8
				param += '[' + formObj.oth_seq.value + ']'; //$9	[20130411 OJG]
				
				formObj.rd_param.value=param;
				 
				/* oyh 2013.09.05 #20448 :[BINEX] D/O 메일 전송 시 Mail Subject 에 HBL# 같이 표기 */
				var tempTitle='';
				tempTitle = 'Straight B/L';
/*				if(formObj.bnd_clss_cd.value=="O"){
					tempTitle += 'Pick Up [';
				}else{
					tempTitle += 'D/O [';
				}
				if(formObj.air_sea_clss_cd.value=="A"){
					tempTitle += 'Air ';
					if(formObj.bnd_clss_cd.value=="O"){
						tempTitle += 'Export ';
					}else{
						tempTitle += 'Import ';
					}
				}else if(formObj.air_sea_clss_cd.value=="S"){
					tempTitle += 'Ocean ';
					if(formObj.bnd_clss_cd.value=="O"){
						tempTitle += 'Export ';
					}else{
						tempTitle += 'Import ';
					}
				}else{
					tempTitle='Pickup/Delivery Order[Other]';
				}*/
				
				
				if (formObj.bl_no != "undefined"  && formObj.bl_no != undefined) {
					if(formObj.biz_clss_cd.value=="H"){
						tempTitle += 'House ';
						tempTitle += 'HBL No : '+formObj.bl_no.value+']';
					}else{
						tempTitle += '';
						tempTitle += 'HBL No : '+formObj.mbl_no.value+']';
					}
				}else if (formObj.mbl_no != "undefined"  && formObj.mbl_no != undefined) {
					if(formObj.biz_clss_cd.value=="M"){
						tempTitle += 'Master ';
						tempTitle += 'MBL No : '+formObj.mbl_no.value+']';
					}else{
						tempTitle += '';
						tempTitle += 'MBL No : '+formObj.mbl_no.value+']';
					}
				}
				formObj.title.value=tempTitle;
				formObj.mailTitle.value=tempTitle;
				//formObj.mailTitle.value = tempTitle + 'Other Reference No. : ' + formObj.oth_ref_no.value + ']';;
				var trdp_cd='';
        		trdp_cd += '(' + '\'' + formObj.return_trdp_cd.value + '\'' + ')';
				ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
				formObj.mailTo.value=mailTo;
				
				// History화면에서 Link 를 걸기위해 WO_NO와 CLSS_CD를 넘긴다. 
				formObj.rpt_biz_tp.value="PDI";
				formObj.rpt_biz_sub_tp.value=formObj.wo_no.value+formObj.air_sea_clss_cd.value;
				formObj.rpt_trdp_cd.value=formObj.trucker_trdp_cd.value;
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   break;
           
           
           case "PRINT":     //Pickup delivery ORder //trucking_order(patent)
           case "PRINT_CO":	 //Customs order
           case "PRINT_LO":  //Loading Order      	
           case "PRINT_PN":	 //Pickup Notice  
        	    // 프린트
        	    var prt_md_yn="";
        	    var wo_no = formObj.f_wo_no.value;
           	    //#52969[STAR CLUSTER] MISC. OTHER FILE DELIVERY ORDER FORM CHANGE
        	    //Blue Print #244
        	    if (formObj.biz_clss_cd.value==""){ // Other 신규
        	    	formObj.file_name.value='pickup_delivery_instruction_other.mrd';
        	    	//OFVFOUR-6889 [NONGHAO] ADJUSTMENT ON HB/L OUTPUT
            		formObj.rpt_file_name_title.value = "";
            			if (formObj.f_wo_no.value != ""){	
                			formObj.rpt_file_name_title.value = "pickup_delivery_instruction_other_" + wo_no;    					
                		} else {
                			formObj.rpt_file_name_title.value = "";
                		}
        	    	if(srcName == "PRINT_CO"){
        	    		formObj.file_name.value='customs_order.mrd';
        	    	}
        	    } else {
        	    	if(srcName == "PRINT"){
        	    		formObj.file_name.value='pickup_delivery_instruction_01.mrd';
        	    		/*OFVFOUR-6889 [NONGHAO] ADJUSTMENT ON HB/L OUTPUT*/
        	    		formObj.rpt_file_name_title.value = "";
        	    			if (formObj.f_wo_no.value != "") {
           	    			 formObj.rpt_file_name_title.value = "pickup_delivery_instruction_01_" + wo_no;
           	    		 }else {
           	    			formObj.rpt_file_name_title.value = "";
           	    		 }
        	    	} else if(srcName == "PRINT_CO") {
        	    		formObj.file_name.value='customs_order.mrd';
        	    	} else if(srcName == "PRINT_LO") {
        	    		formObj.file_name.value='loading_order.mrd';
        	    	} else {
        	    		formObj.file_name.value='pickup_notice.mrd';
        	    	}
        	    }

        	    formObj.title.value='';
				if(formObj.prt_md_yn.checked==true){
					prt_md_yn="Y";
				}else{
					prt_md_yn="N";
				}
				//Parameter Setting
				var param='';
				param += '[' + formObj.f_wo_no.value + ']'; //$1
				param += '[' + formObj.ofc_locl_nm.value + ']'; //$2
				param += '[' + formObj.eml.value + ']'; //$3
				param += '[' + formObj.user_name.value + ']'; //$4
				param += '[' + formObj.intg_bl_seq.value + ']'; //$5
				param += '[' + formObj.user_phn.value + ']'; //$6
				param += '[' + formObj.user_fax.value + ']'; //$7
				param += '[' + prt_md_yn + ']'; //$8
				param += '[' + formObj.oth_seq.value + ']'; //$9	[20130411 OJG]
				
				param += '[' + formObj.user_ofc_cd.value + ']'; //$10
				
				/*#1777*/
				param += '[' + formObj.air_sea_clss_cd.value + ']'; //$11
				param += '[' + formObj.biz_clss_cd.value + ']'; //$12
				param += '[' + formObj.bkg_seq.value + ']'; //$13
				
				
				formObj.rd_param.value=param;
				 /* oyh 2013.09.05 #20448 :[BINEX] D/O 메일 전송 시 Mail Subject 에 HBL# 같이 표기 */
				var tempTitle='';
				if(formObj.bnd_clss_cd.value=="O"){
					tempTitle += 'Pick Up [';
				}else{
					tempTitle += 'D/O [';
				}
				if(formObj.air_sea_clss_cd.value=="A"){
					tempTitle += 'Air ';
					if(formObj.bnd_clss_cd.value=="O"){
						tempTitle += 'Export ';
					}else{
						tempTitle += 'Import ';
					}
				}else if(formObj.air_sea_clss_cd.value=="S"){
					tempTitle += 'Ocean ';
					if(formObj.bnd_clss_cd.value=="O"){
						tempTitle += 'Export ';
					}else{
						tempTitle += 'Import ';
					}
				}else{
					tempTitle='Pickup/Delivery Order[Other]';
				}
				if (formObj.bl_no != "undefined"  && formObj.bl_no != undefined) {
					if(formObj.biz_clss_cd.value=="H"){
						tempTitle += 'House ';
						tempTitle += 'HBL No : '+formObj.bl_no.value+']';
					}else{
						tempTitle += '';
						tempTitle += 'HBL No : '+formObj.mbl_no.value+']';
					}
				}else if (formObj.mbl_no != "undefined"  && formObj.mbl_no != undefined) {
					if(formObj.biz_clss_cd.value=="M"){
						tempTitle += 'Master ';
						tempTitle += 'MBL No : '+formObj.mbl_no.value+']';
					}else{
						tempTitle += '';
						tempTitle += 'MBL No : '+formObj.mbl_no.value+']';
					}
				}
				
				if(formObj.bkg_no != "undefined"  && formObj.bkg_no != undefined ){
					if(formObj.biz_clss_cd.value == "CU"){
						tempTitle += "Customer Booking : " +formObj.bkg_no.value+']'; ;
					}else if(formObj.biz_clss_cd.value == "CA"){
						tempTitle += "Carrier Booking :" +formObj.bkg_no.value+']';
					}
				}

				//OFVFOUR-7798: [Southeast] Update the Title/Subject of Pickup# Notice
			   if (optPckpDOMailTitle === 'Y') {
				   if (formObj.bl_no != "undefined"  && formObj.bl_no != undefined) {
					   if(formObj.biz_clss_cd.value=="H"){
						   tempTitle = 'Pick Up# Notice - HBL# '+ formObj.bl_no.value;

					   }else{
						   tempTitle += 'Pick Up# Notice - HBL# '+ formObj.mbl_no.value;
					   }
					   if (formObj.mbl_no_ref.value) {
						   tempTitle += ' - MBL# ' + formObj.mbl_no_ref.value;
					   }
				   }
			   }

				
				formObj.title.value=tempTitle;
				formObj.mailTitle.value=tempTitle;
				//formObj.mailTitle.value = tempTitle + 'Other Reference No. : ' + formObj.oth_ref_no.value + ']';;
				var trdp_cd='';
         		trdp_cd += '(' + '\'' + formObj.return_trdp_cd.value + '\'' + ')';
				ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
				formObj.mailTo.value=mailTo;
				// History화면에서 Link 를 걸기위해 WO_NO와 CLSS_CD를 넘긴다. 
				formObj.rpt_biz_tp.value="PDI";
				formObj.rpt_biz_sub_tp.value=formObj.wo_no.value+formObj.air_sea_clss_cd.value;
				formObj.rpt_trdp_cd.value=formObj.trucker_trdp_cd.value;
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   break;
           case "PRINT_POD":	//POD PRINT
       	   	formObj.file_name.value='proof_of_delivery_03.mrd';
       	   	formObj.title.value='P.O.D.';
	   			// Parameter Setting
       		var param='';
	   			param += '[' + formObj.intg_bl_seq.value + ']'; // $1
	   			param += '[]';
	   			param += '[]';
	   			param += '[' + formObj.user_phn.value + ']';  //$4
	   			param += '[' + formObj.user_fax.value + ']';  //$5
	   			param += '[' + formObj.eml.value + ']'; // $6
	   		 	param += '[' + formObj.f_wo_no.value + ']';
	   			param += '[]'; 	//$8
	   			param += '[]'; 
	   			param += '[]';
	   			param += '[]'; // $11
	   			
	   			var toDate = getTodayStr().split("-");
	   			param += '[' + toDate[2] + toDate[0] + toDate[1] + ']'; 
	   			param += '[' + formObj.user_name.value + ']';
	   			param += '[]'; //$14
	   			param += '[]'; 
	   			
	   			formObj.rd_param.value=param;
	   			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   	 		
            break;	
           case "EDI":
        	    	
				if (!ediValidation()){
					return false;
				}
           break;
           case "SEND_EDI":
        	    //#1307 [Starway/Starcluser] EDI with Hyundai Glovis America (Weight Ratio)
	   			if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
					var formObj=document.frm1;
					doShowProcess();
					gridAdd(1);
					formObj.f_cmd.value=COMMAND03;
					var cntrSheetData=docObjects[0].GetSaveString(true);
					docObjects[1].DoAllSave("./AIC_WOM_0010GS.clt", FormQueryString(formObj)+'&'+cntrSheetData, true);   
				}	
        	   break;
        } // end switch
	}catch(e) {
		//alert(e.description);
        if(e == "[object Error]"){
        	//Please enter a Value correctly!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
	}
}

//#1307 [Starway/Starcluser] EDI with Hyundai Glovis America (Weight Ratio)
function setRatePop(){
	var formObj=document.frm1;
	formObj.h_volume.value = "";
	formObj.k_volume.value = "";
	
 	rtnary=new Array(2);   		
	callBackFunc = "SEND_EDI";
	modal_center_open('./CMM_POP_0800.clt', rtnary, 400,200,"yes");
}
function SEND_EDI(rtnVal){
	var formObj=document.frm1;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var ediYn = rtnValAry[0];
		if (ediYn) {
			formObj.h_volume.value = rtnValAry[1];
			formObj.k_volume.value = rtnValAry[2];
			
			doWork('SEND_EDI');
		}
	}
	
	
}

function ediValidation(){
	var formObj=document.frm1;
	var v_remark = formObj.rmk.value;
	var remarkArry;
	
	if(formObj.wo_no.value == null || formObj.wo_no.value.length <1 ){
		alert(getLabel('FMS_COM_ALT010'));
		return false;
	}
	
	
	if(v_remark == null || v_remark.length <1 ){
		alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_RMK') );
		return false;
	}else{
		remarkArry = v_remark.split("\n");
		
		//기아차(KMA)/현대차(HMA) 구분 
		//기아 일경우는 GA001로 현대일때는 GA002로 생성 . 
		if(remarkArry[0].lastIndexOf("KMA") < 0 && remarkArry[0].lastIndexOf("HMA") < 0){
			alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_RMK') );
			return false;
		}
		
	}
	
	if(!chkVesselData(formObj.oth_ref_no.value)){
		alert(formObj.oth_ref_no.value + ' : ' +getLabel('AIC_WOM_0010_MSG36'));
		return false;
	}
	
	
	//#1307 [Starway/Starcluser] EDI with Hyundai Glovis America (Weight Ratio)
	if(remarkArry[0].lastIndexOf("KMA") > -1 && remarkArry[0].lastIndexOf("HMA") > -1){
		//기아차(KMA)/현대차(HMA) 일경우 Volume Percentage 팝업
		setRatePop();
	}else{
		//기아차(KMA) or 현대차(HMA)일경우 Volume Percentage 100 세팅
		formObj.h_volume.value = "100";
		formObj.k_volume.value = "100";
		doWork('SEND_EDI');
	}	
	
	return true;
}

var chkRoleFlag = false;
function chkVesselData(othRefNo){
	ajaxSendPost(getCheckVesselFalg, 'reqVal', '&goWhere=aj&bcKey=checkVesselData&othRefNo='+othRefNo, './GateServlet.gsl');

	return chkRoleFlag;
}

function getCheckVesselFalg(reqVal){
	var formObj=document.frm1
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='PASS'){
				chkRoleFlag=true;
			}
			else{
				chkRoleFlag=false;
			}
		}
	}
}


function gridAdd(objIdx){
	var intRows=docObjects[objIdx].RowCount() + 1;
	docObjects[objIdx].DataInsert(intRows);
}
//화면로드시 데이터 표시
function loadData(){
	doHideProcess();
	//-----------[20130410 OJG]-----------------
	//alert(frm1.oth_ref_no.value);
	//LHK 조건 추가, 조회된 data 의 경우 그대로 보여줌. 
	if(document.getElementById("oth_ref_no") != null && frm1.oth_ref_no.value != '' && frm1.wo_no.value==''){
		doWork("HBLSMRY");
	}
	//-----------[20130410 OJG]-----------------
	// Sea,Other인 경우에만 SEARCH한다
	if(frm1.air_sea_clss_cd.value!="A"){
		if(frm1.intg_bl_seq.value!='' || frm1.bkg_seq.value != ''){
		    doWork("SEARCHLIST");
		}
	} else {
		docObjects[0].SetVisible(false);
	}
	if(frm1.bnd_clss_cd.value == "I" || frm1.bnd_clss_cd.value == "G"){
		frm1.wo_tp_cd.value = "DE";
	}
	if(frm1.wo_no.value=='' && frm1.bnd_clss_cd.value != 'G' ){
		doWork("HBLSMRY");
	}
}
function openPopUp(srcName, curObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
	try {
		switch(srcName) {
    	   case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		rtnary[1]="";
		   		rtnary[2]=window;
		   		rtnary[3]=formObj.lnr_trdp_nm.value;
		   		var airSeaTp="";
		   		var curObjId=curObj.id;
		   		var cstmTpCd='';
		   		//선사
		   		if(curObjId=='liner'){
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}
		   		}
				var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt?callTp='+cstmTpCd,  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
						formObj.lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
						formObj.lnr_trdp_nm.value = rtnValAry[2];//eng_nm
//						formObj.lnr_trdp_nm.value=rtnValAry[10];//local_nm
				}
           break;
    	   case "LOCATION_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
   			rtnary=new Array(3);
   			rtnary[0]="SEA";
   			rtnary[1]="BL";
   			var curObjId=curObj.id;
   			if (curObjId == "pol") {
   				rtnary[2]=formObj.pol_nm.value;
   			} else if (curObjId == "pod") {
   				rtnary[2]=formObj.pod_nm.value;
   			}
   			var rtnVal =  ComOpenWindow('./CMM_POP_0030.clt',  rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px" , true);
   			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
   				return;
   			} else {
   				var id=curObj.id;
   				var rtnValAry=rtnVal.split("|");
   				if (id == "pol") {
   					formObj.pol_cd.value=rtnValAry[0];// loc_cd
   					formObj.pol_nm.value=rtnValAry[2];// loc_nm
   				} else if (id == "pod") {
   					formObj.pod_cd.value=rtnValAry[0];// loc_cd
   					formObj.pod_nm.value=rtnValAry[2];// loc_nm
   				} 
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
					formObj.cgo_itm_cmdt_cd.value=rtnValAry[0];
					formObj.cgo_itm_cmdt_nm.value=rtnValAry[2];
				}
   	        break;
        } // end switch
	}catch(e) {
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
/**
 * 
 *  Pickup / Delivery / Transporter Address : Local Name + \n + Local Address + '\n' + city + ' ' + state +  ' ' + zip Code 
 *  Bill To Address : Local Name + '\n + Billing Address
 */
//코드표시 Ajax
function dispHblSmry(reqVal){
	var formObj=document.frm1;
	// 부킹번호 선택시 데이터 새로 가져오기 
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			var rtnArr=doc[1].split('@;');
			var rtnVal=rtnArr[0].split('@^');	
			formObj.intg_bl_seq.value=rtnVal[0];
			formObj.pol_cd.value=rtnVal[1];
			formObj.pol_nm.value=rtnVal[2];
			formObj.pod_cd.value=rtnVal[3];
			formObj.pod_nm.value=rtnVal[4];
			formObj.cgo_itm_cmdt_cd.value=rtnVal[5];
			formObj.cgo_itm_cmdt_nm.value=rtnVal[6];
			formObj.cgo_pck_qty.value=doMoneyFmt(rtnVal[7]);
			formObj.cgo_pck_ut_cd.value=rtnVal[8];
			formObj.act_wgt_k.value=doMoneyFmt(rtnVal[24]);
			formObj.act_wgt_l.value=doMoneyFmt(rtnVal[25]);
			if(doMoneyFmt(rtnVal[12])=="0.000000"){
				formObj.cgo_meas_m.value="0.000";
			}else{
				formObj.cgo_meas_m.value=doMoneyFmt(Number(rtnVal[12]).toFixed(3));
			}
			// CBM 표시후 CFT 계산 
			formObj.cgo_meas_f.value=doMoneyFmt(roundXL(formObj.cgo_meas_m.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, 3));
			if(formObj.cgo_meas_f.value =="0" ||formObj.cgo_meas_f.value ==""){
				formObj.cgo_meas_f.value="0.000";
			}
//			formObj.cgo_meas_ut_cd.value= rtnVal[13];
			formObj.lnr_trdp_cd.value=rtnVal[14];
			formObj.lnr_trdp_nm.value=rtnVal[15];
			formObj.lnr_bkg_no.value=rtnVal[16];
			formObj.bill_to_trdp_cd.value=rtnVal[21];
			formObj.bill_to_trdp_nm.value=rtnVal[22];
			formObj.bill_to_trdp_addr.value=rtnVal[23];
			formObj.bill_to_pic.value=rtnVal[35];
			formObj.bill_to_phn.value=rtnVal[36];
			formObj.bill_to_fax.value=rtnVal[37];
			formObj.cgo_itm_cmdt_cd.value=rtnVal[26];
			formObj.cgo_itm_cmdt_nm.value=rtnVal[27];
			formObj.bill_to_ref_no.value=rtnVal[28];
			
//			if(formObj.biz_clss_cd.value != "H"){
				formObj.trucker_trdp_cd.value=rtnVal[29];
				formObj.trucker_trdp_nm.value=rtnVal[30];
				formObj.trucker_trdp_addr.value=rtnVal[31];
				formObj.trucker_pic.value=rtnVal[32];
				formObj.trucker_phn.value=rtnVal[33];
				formObj.trucker_fax.value=rtnVal[34];
//			}
			
			formObj.pickup_trdp_cd.value=rtnVal[38];
			formObj.pickup_trdp_nm.value=rtnVal[39];
			formObj.pickup_trdp_addr.value=rtnVal[40];
			formObj.pickup_pic.value=rtnVal[41];
			formObj.pickup_phn.value=rtnVal[42];
			formObj.pickup_fax.value=rtnVal[43];
			formObj.delivery_trdp_cd.value=rtnVal[44];
			formObj.delivery_trdp_nm.value=rtnVal[45];
			formObj.delivery_trdp_addr.value=rtnVal[46];
			formObj.delivery_pic.value=rtnVal[47];
			formObj.delivery_phn.value=rtnVal[48];
			formObj.delivery_fax.value=rtnVal[49];
			formObj.return_trdp_cd.value=rtnVal[50];
			formObj.return_trdp_nm.value=rtnVal[51];
			formObj.return_trdp_addr.value=rtnVal[52];
			formObj.return_pic.value=rtnVal[53];
			formObj.return_phn.value=rtnVal[54];
			formObj.return_fax.value=rtnVal[55];
			
			//#335 [IMPEX] OEM WORK ORDER LOGIC
			//OEM
			if(formObj.air_sea_clss_cd.value == "S" && formObj.bnd_clss_cd.value == "O" && formObj.biz_clss_cd.value == "M"){
				formObj.mbl_no.value = rtnVal[56];
				formObj.return_ref_no.value = formObj.mbl_no.value;
			}
			
			//OEH
			if(formObj.air_sea_clss_cd.value == "S" && formObj.bnd_clss_cd.value == "O" && formObj.biz_clss_cd.value == "H"){
				formObj.delivery_ref_no.value = rtnVal[28];
				formObj.return_ref_no.value = formObj.bl_no.value;
			}
			
			//Booking Customer
			if(formObj.air_sea_clss_cd.value == "S" && formObj.bnd_clss_cd.value == "O" && (formObj.biz_clss_cd.value == "CU" || formObj.biz_clss_cd.value == "CA")){
				formObj.bkg_seq.value = rtnVal[65];
			}
			
			//OIM
			if(formObj.air_sea_clss_cd.value == "S" && formObj.bnd_clss_cd.value == "I" && formObj.biz_clss_cd.value == "M"){
				formObj.mbl_no.value = rtnVal[56];
				formObj.pickup_ref_no.value = formObj.mbl_no.value;
				formObj.bill_to_ref_no.value = formObj.ref_no.value;
			}
			
			//OIH
			if(formObj.air_sea_clss_cd.value == "S" && formObj.bnd_clss_cd.value == "I" && formObj.biz_clss_cd.value == "H"){
				//#1157 [Fulltrans] D/O's Return Location follows Delivery Location, even if system optin WO_Return_LOC_BLANK = Y
//				formObj.bill_to_ref_no.value = formObj.ref_no.value;
				formObj.pickup_ref_no.value = formObj.bl_no.value;
				formObj.return_trdp_cd.value="";
				formObj.return_trdp_nm.value="";
				formObj.return_trdp_addr.value="";
				formObj.return_pic.value="";
				formObj.return_phn.value="";
				formObj.return_fax.value="";
			}
			
//			#1584 [IMPEX] OEH PICKUP/DELIVERY ORDER INTERFACING ISSUE - LOADED RETURN LOCATION
//			if(WO_RETURN_LOC_BLANK != "Y"){ //blank가 아닌 case
			if(WO_RETURN_LOC_BLANK == "B"){
				if (formObj.return_trdp_cd.value == "") {
					formObj.return_trdp_cd.value=formObj.pickup_trdp_cd.value;
					formObj.return_trdp_nm.value=formObj.pickup_trdp_nm.value;
					formObj.return_trdp_addr.value=formObj.pickup_trdp_addr.value;
					formObj.return_pic.value=formObj.pickup_pic.value;
					formObj.return_phn.value=formObj.pickup_phn.value;
					formObj.return_fax.value=formObj.pickup_fax.value;
				}
//				#570 [Sales] #52700 OEH P/DO wrong address connected when T/P searched
//				if (formObj.return_trdp_nm.value == "") {
//					formObj.return_trdp_nm.value=formObj.pickup_trdp_nm.value;
//				}
//				if (formObj.return_trdp_addr.value == "") {
//					formObj.return_trdp_addr.value=formObj.pickup_trdp_addr.value;
//				}
//				if (formObj.return_pic.value == "") {
//					formObj.return_pic.value=formObj.pickup_pic.value;
//				}
//				if (formObj.return_phn.value == "") {
//					formObj.return_phn.value=formObj.pickup_phn.value;
//				}
//				if (formObj.return_fax.value == "") {
//					formObj.return_fax.value=formObj.pickup_fax.value;
//				}	
			}
			
			formObj.wh_tm.value			=rtnVal[57];
			formObj.wh_to_tm.value		=rtnVal[58];
			formObj.pickup_tm.value		=rtnVal[59];
			formObj.pickup_to_tm.value	=rtnVal[60];				
			formObj.delivery_tm.value	=rtnVal[61];
			formObj.delivery_to_tm.value=rtnVal[62];
			formObj.return_tm.value		=rtnVal[63];
			formObj.return_to_tm.value	=rtnVal[64];	
				
				
			// wo_no 리셋
			formObj.wo_no.value="";
			formObj.f_wo_no.value="";
			btnLoad();
			if(formObj.bill_to_trdp_cd.value==""){
			    formObj.bill_to_trdp_cd.value=formObj.user_ofc_cd.value + "MAINCMP";
			    //formObj.bill_to_trdp_cd.value=formObj.sys_ofc_cd.value + "MAINCMP";
				codeNameAction('partner_bill', formObj.bill_to_trdp_cd, 'onBlur');	
			}
		}else{
			formObj.intg_bl_seq.value="";
			formObj.pol_cd.value="";
			formObj.pol_nm.value="";
			formObj.pod_cd.value="";
			formObj.pod_nm.value="";
			formObj.cgo_itm_cmdt_cd.value="";
			formObj.cgo_itm_cmdt_nm.value="";
			formObj.cgo_pck_qty.value="";
			formObj.cgo_pck_ut_cd.value="";
			formObj.act_wgt_k.value="0.00";
			formObj.act_wgt_l.value="0.00";
			formObj.cgo_meas_m.value="0.000";
			// CBM 표시후 CFT 계산 
			formObj.cgo_meas_f.value="0.000";
//			formObj.cgo_meas_ut_cd.value= rtnVal[12];
			formObj.lnr_trdp_cd.value="";
			formObj.lnr_trdp_nm.value="";
			formObj.lnr_bkg_no.value="";
			formObj.bill_to_trdp_cd.value="";
			formObj.bill_to_trdp_nm.value="";
			formObj.bill_to_trdp_addr.value="";
			if(formObj.biz_clss_cd.value == 'H'){
				formObj.bl_no.value="";
			}
			if(formObj.biz_clss_cd.value == 'M'){
				formObj.mbl_no.value="";
				formObj.ref_no.value="";
			}
			if(formObj.biz_clss_cd.value == ''){
				formObj.oth_ref_no.value="";
			}
			formObj.trucker_trdp_cd.value="";
			formObj.trucker_trdp_nm.value="";
			formObj.trucker_trdp_addr.value="";
			formObj.trucker_pic.value="";
			formObj.trucker_phn.value="";
			formObj.trucker_fax.value="";
			formObj.pickup_trdp_cd.value="";
			formObj.pickup_trdp_nm.value="";
			formObj.pickup_trdp_addr.value="";
			formObj.pickup_pic.value="";
			formObj.pickup_phn.value="";
			formObj.pickup_fax.value="";
			formObj.delivery_trdp_cd.value="";
			formObj.delivery_trdp_nm.value="";
			formObj.delivery_trdp_addr.value="";
			formObj.delivery_pic.value="";
			formObj.delivery_phn.value="";
			formObj.delivery_fax.value="";
			formObj.return_trdp_cd.value="";
			formObj.return_trdp_nm.value="";
			formObj.return_trdp_addr.value="";
			formObj.return_pic.value="";
			formObj.return_phn.value="";
			formObj.return_fax.value="";
			formObj.bill_to_ref_no.value="";
			formObj.bill_to_pic.value="";
			formObj.bill_to_phn.value="";
			formObj.bill_to_fax.value="";
			formObj.pickup_ref_no.value="";
			formObj.pickup_dt.value="";
			formObj.pickup_tm.value="";
			formObj.pickup_to_tm.value="";
			formObj.delivery_ref_no.value="";
			formObj.delivery_dt.value="";
			formObj.delivery_tm.value="";
			formObj.delivery_to_tm.value="";
			formObj.return_ref_no.value="";
			formObj.return_dt.value="";
			formObj.return_tm.value="";
			formObj.return_to_tm.value="";
			formObj.rmk.value=formObj.pkup_rmk.value;
			formObj.wh_instr_txt.value=formObj.wh_instr_rmk.value;	
			formObj.cstms_instr_txt.value=formObj.cstms_instr_rmk.value;
			/*#2045 hsk*/
			formObj.drv_nm.value="";
			formObj.drv_phn.value="";
			formObj.trk_plat_no.value="";
			formObj.wh_lodg_instr_txt.value=formObj.wh_lodg_instr_rmk.value;
			
			formObj.wo_no.value="";
			formObj.f_wo_no.value="";
			
			formObj.wh_tm.value			="";
			formObj.wh_to_tm.value		="";
			formObj.pickup_tm.value		="";
			formObj.pickup_to_tm.value	="";				
			formObj.delivery_tm.value	="";
			formObj.delivery_to_tm.value="";
			formObj.return_tm.value		="";
			formObj.return_to_tm.value	="";	
		}
	}
}
//코드표시 Ajax
function dispOthHblSmry(reqVal){
	var formObj=document.frm1;
	// 부킹번호 선택시 데이터 새로 가져오기 
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@;');
			var rtnVal=rtnArr[0].split('@^');
			var paramLen = rtnVal.length;
			
			for(var i = 0; i < paramLen; i++){
				if(null == rtnVal[i] || 'null' == rtnVal[i] || 'undefined' == rtnVal[i]){
					rtnVal[i] = "";
				}
			}
			
			formObj.wo_sts_cd.value=rtnVal[1];
			formObj.oth_seq.value=rtnVal[2];
			// #6126 [FFN] "Bill to" information in Local Transportation > Work order
			formObj.bill_to_trdp_cd.value=formObj.user_ofc_cd.value + "MAINCMP";
			codeNameAction('partner_bill', formObj.bill_to_trdp_cd, 'onBlur');
//			formObj.bill_to_trdp_cd.value=rtnVal[4];
//			formObj.bill_to_trdp_nm.value=rtnVal[5];
//			formObj.bill_to_trdp_addr.value=rtnVal[6];
			//---------------[20130410 OJG]------------------------------
			formObj.bill_to_pic.value=rtnVal[7];
			formObj.bill_to_phn.value=rtnVal[8];
			formObj.bill_to_fax.value=rtnVal[9];
			formObj.bill_to_ref_no.value=rtnVal[10];
			formObj.pol_cd.value=rtnVal[11];
			formObj.pol_nm.value=rtnVal[12];
			formObj.pod_cd.value=rtnVal[13];
			formObj.pod_nm.value=rtnVal[14];
			formObj.cgo_itm_cmdt_cd.value=rtnVal[15];
			formObj.cgo_itm_cmdt_nm.value=rtnVal[16];
			formObj.cgo_pck_qty.value=doMoneyFmt(rtnVal[17]);
			formObj.cgo_pck_ut_cd.value=rtnVal[18];
			formObj.act_wgt_k.value=doMoneyFmt(rtnVal[19]);
			formObj.act_wgt_l.value=doMoneyFmt(rtnVal[20]);
			formObj.cgo_meas_m.value=doMoneyFmt(rtnVal[21]);
			formObj.cgo_meas_f.value=doMoneyFmt(rtnVal[22]);
			//---------------[20130410 OJG]------------------------------
			
			//#335 [IMPEX] OEM WORK ORDER LOGIC
			formObj.pickup_trdp_cd.value=rtnVal[23];
			formObj.pickup_trdp_nm.value=rtnVal[24];
			formObj.pickup_trdp_addr.value=rtnVal[25];
			formObj.pickup_pic.value=rtnVal[26];
			formObj.pickup_phn.value=rtnVal[27];
			formObj.pickup_fax.value=rtnVal[28];
			
			formObj.delivery_trdp_cd.value=rtnVal[29];
			formObj.delivery_trdp_nm.value=rtnVal[30];
			formObj.delivery_trdp_addr.value=rtnVal[31];
			formObj.delivery_pic.value=rtnVal[32];
			formObj.delivery_phn.value=rtnVal[33];
			formObj.delivery_fax.value=rtnVal[34];
			
			/*#1777*/
			formObj.cust_cd.value=rtnVal[35];
			formObj.cust_nm.value=rtnVal[36];
			formObj.cust_addr.value=rtnVal[37];
			formObj.cust_pic.value=rtnVal[38];
			formObj.cust_phn.value=rtnVal[39];
			formObj.cust_fax.value=rtnVal[40];			
			
			formObj.wh_tm.value			=rtnVal[41];
			formObj.wh_to_tm.value		=rtnVal[42];
			formObj.pickup_tm.value		=rtnVal[43];
			formObj.pickup_to_tm.value	=rtnVal[44];				
			formObj.delivery_tm.value	=rtnVal[45];
			formObj.delivery_to_tm.value=rtnVal[46];
			formObj.return_tm.value		=rtnVal[47];
			formObj.return_to_tm.value	=rtnVal[48];
			//OFVFOUR-6168 [FFN] B/L Entry 화면에서 Pickup Delivery Order 생성 후 문의v
			formObj.trnk_vsl_nm.value	=rtnVal[49];
			formObj.etd_dt_tm.value	    =rtnVal[50];
			formObj.eta_dt_tm.value	    =rtnVal[51];
			
			btnLoad();
		}else {
			formObj.wo_sts_cd.value="";
			formObj.oth_seq.value="";
			formObj.intg_bl_seq.value="";
			formObj.pol_cd.value="";
			formObj.pol_nm.value="";
			formObj.pod_cd.value="";
			formObj.pod_nm.value="";
			formObj.cgo_itm_cmdt_cd.value="";
			formObj.cgo_itm_cmdt_nm.value="";
			formObj.cgo_pck_qty.value="";
			formObj.cgo_pck_ut_cd.value="";
			formObj.act_wgt_k.value="0.00";
			formObj.act_wgt_l.value="0.00";
			formObj.cgo_meas_m.value="0.000";
			// CBM 표시후 CFT 계산 
			formObj.cgo_meas_f.value="0.000";
//			formObj.cgo_meas_ut_cd.value= rtnVal[12];
			formObj.lnr_trdp_cd.value="";
			formObj.lnr_trdp_nm.value="";
			formObj.lnr_bkg_no.value="";
			formObj.bill_to_trdp_cd.value="";
			formObj.bill_to_trdp_nm.value="";
			formObj.bill_to_trdp_addr.value="";
			formObj.oth_ref_no.value="";
			formObj.trucker_trdp_cd.value="";
			formObj.trucker_trdp_nm.value="";
			formObj.trucker_trdp_addr.value="";
			formObj.trucker_pic.value="";
			formObj.trucker_phn.value="";
			formObj.trucker_fax.value="";
			formObj.pickup_trdp_cd.value="";
			formObj.pickup_trdp_nm.value="";
			formObj.pickup_trdp_addr.value="";
			formObj.pickup_pic.value="";
			formObj.pickup_phn.value="";
			formObj.pickup_fax.value="";
			formObj.delivery_trdp_cd.value="";
			formObj.delivery_trdp_nm.value="";
			formObj.delivery_trdp_addr.value="";
			formObj.delivery_pic.value="";
			formObj.delivery_phn.value="";
			formObj.delivery_fax.value="";
			formObj.return_trdp_cd.value="";
			formObj.return_trdp_nm.value="";
			formObj.return_trdp_addr.value="";
			formObj.return_pic.value="";
			formObj.return_phn.value="";
			formObj.return_fax.value="";
			formObj.bill_to_ref_no.value="";
			formObj.bill_to_pic.value="";
			formObj.bill_to_phn.value="";
			formObj.bill_to_fax.value="";
			formObj.pickup_ref_no.value="";
			formObj.pickup_dt.value="";
			formObj.pickup_tm.value="";
			formObj.pickup_to_tm.value="";
			formObj.delivery_ref_no.value="";
			formObj.delivery_dt.value="";
			formObj.delivery_tm.value="";
			formObj.delivery_to_tm.value="";
			formObj.return_ref_no.value="";
			formObj.return_dt.value="";
			formObj.return_tm.value="";
			formObj.return_to_tm.value="";
			formObj.rmk.value=formObj.pkup_rmk.value;
			formObj.wh_instr_txt.value=formObj.wh_instr_rmk.value;	
			formObj.cstms_instr_txt.value=formObj.cstms_instr_rmk.value;	
			formObj.wo_no.value="";
			formObj.f_wo_no.value="";			
			
			/*#2045 hsk*/
			formObj.drv_nm.value="";
			formObj.drv_phn.value="";
			formObj.trk_plat_no.value="";
			formObj.wh_lodg_instr_txt.value=formObj.wh_lodg_instr_rmk.value;
			
			/*#1777*/
			formObj.cust_cd.value="";
			formObj.cust_nm.value="";
			formObj.cust_addr.value="";
			formObj.cust_pic.value="";
			formObj.cust_phn.value="";
			formObj.cust_fax.value="";					
			
			formObj.wh_tm.value			="";
			formObj.wh_to_tm.value		="";
			formObj.pickup_tm.value		="";
			formObj.pickup_to_tm.value	="";				
			formObj.delivery_tm.value	="";
			formObj.delivery_to_tm.value="";
			formObj.return_tm.value		="";
			formObj.return_to_tm.value	="";	
			
			//OFVFOUR-6168 [FFN] B/L Entry 화면에서 Pickup Delivery Order 생성 후 문의
			formObj.trnk_vsl_nm.value	="";
			formObj.etd_dt_tm.value     ="";
			formObj.eta_dt_tm.value     ="";
		}
	}
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(formObj.pickup_dt, 'MM-dd-yyyy');
        break;
        case 'DATE2':   //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(formObj.delivery_dt, 'MM-dd-yyyy');
        break;        
        case 'DATE3':   //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(formObj.return_dt, 'MM-dd-yyyy');
        break;
        case 'DATE4':   //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(formObj.cut_off_dt, 'MM-dd-yyyy');
        break;
        case 'DATE5':   //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(formObj.wh_dt, 'MM-dd-yyyy');
        break;        
    }
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp, ofcHr){
	var formObj=document.frm1;
	
	if(obj.value!=""){
		if(tmp=="onKeyDown"){			
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					str=sub_str;
				}else if(sub_str=="Nodecode"){
					str='node';
				}else if(sub_str=="partner_"){
					str='trdpcode'
				}				
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			var sub_str=str.substring(0,8);
			if(sub_str=="location"){
				str=sub_str;
			}else if(sub_str=="Nodecode"){
				str='node';
			}else if(sub_str=="partner_"){
				str='trdpcode'
			}			
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}
	else if(obj.value == ""){
		var formObj=document.frm1;
		CODETYPE=str;
		if(CODETYPE =="partner_pickup"){
			formObj.pickup_trdp_cd.value="";
			formObj.pickup_trdp_nm.value="";
			formObj.pickup_trdp_addr.value="";
			formObj.pickup_pic.value="";//pic_nm
			formObj.pickup_phn.value="";//pic_phn
			formObj.pickup_fax.value="";//pic_fax
		}else if(CODETYPE =="partner_delivery"){
			formObj.delivery_trdp_cd.value="";
			formObj.delivery_trdp_nm.value="";
			formObj.delivery_trdp_addr.value="";
			formObj.delivery_pic.value="";//pic_nm
			formObj.delivery_phn.value="";//pic_phn
			formObj.delivery_fax.value="";//pic_fax
		}else if(CODETYPE =="partner_trsp"){
			formObj.return_trdp_cd.value="";//trdp_cd
			formObj.return_trdp_nm.value="";//full_nm
			formObj.return_trdp_addr.value="";//lgl_addr
			formObj.return_pic.value="";//pic_nm
			formObj.return_phn.value="";//pic_phn
			formObj.return_fax.value="";//pic_fax
		}else if(CODETYPE =="partner_bill"){
			formObj.bill_to_trdp_cd.value="";//trdp_cd
			formObj.bill_to_trdp_nm.value="";//full_nm
			formObj.bill_to_trdp_addr.value="";//lgl_addr
			formObj.bill_to_pic.value="";//pic_nm
			formObj.bill_to_phn.value="";//pic_phn
			formObj.bill_to_fax.value="";//pic_fax
		}else if(CODETYPE =="partner_trucker"){
			formObj.trucker_trdp_cd.value="";//trdp_cd
			formObj.trucker_trdp_nm.value="";//full_nm
			formObj.trucker_trdp_addr.value="";//lgl_addr
			formObj.trucker_pic.value="";//pic_nm
			formObj.trucker_phn.value="";//pic_phn
			formObj.trucker_fax.value="";//pic_fax
		}else if(CODETYPE =="location_pol"){
			formObj.pol_cd.value="";//loc_cd
			formObj.pol_nm.value="";//loc_nm
		}else if(CODETYPE =="location_pod"){
			formObj.pod_cd.value="";//loc_cd
			formObj.pod_nm.value="";//loc_nm
		}else if(CODETYPE =="partner_liner"){
			formObj.lnr_trdp_cd.value="";
			formObj.lnr_trdp_nm.value="";
		}else if(CODETYPE =="commodity"){
			formObj.cgo_itm_cmdt_cd.value="";
			formObj.cgo_itm_cmdt_nm.value="";
		}else if(CODETYPE =="package"){
			formObj.cgo_pck_ut_cd.value="";
		}else if(CODETYPE =="partner_cstms_cust"){
			formObj.cstms_cust_cd.value="";
			formObj.cstms_cust_nm.value="";
			formObj.cstms_cust_addr.value="";
			formObj.cstms_cust_pic.value="";
			formObj.cstms_cust_phn.value="";
			formObj.cstms_cust_fax.value="";
		}else if(CODETYPE =="partner_cust"){
			formObj.cust_cd.value="";
			formObj.cust_nm.value="";
			formObj.cust_addr.value="";
			formObj.cust_pic.value="";
			formObj.cust_phn.value="";
			formObj.cust_fax.value="";
		}else if(CODETYPE =="partner_wh"){
			formObj.wh_cd.value="";
			formObj.wh_nm.value="";
			formObj.wh_addr.value="";
			formObj.wh_pic.value="";
			formObj.wh_phn.value="";
			formObj.wh_fax.value="";
			formObj.wh_tm.value="";//ofc_fm_hr
			formObj.wh_to_tm.value="";//ofc_to_hr
		}else if(CODETYPE =="partner_biz"){
			formObj.biz_unit_trdp_cd.value="";
			formObj.biz_unit_trdp_nm.value="";
		}
	}
	
	
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');		
			var masterVals=rtnArr[0].split('@@^');
			
			if(CODETYPE =="partner_pickup"){
				formObj.pickup_trdp_cd.value=masterVals[0];
//				formObj.pickup_trdp_nm.value = masterVals[3];// eng trdp nm
				formObj.pickup_trdp_nm.value=masterVals[16];//local trdp name 
				//formObj.pickup_trdp_addr.value=masterVals[14];//trdp_addr
				formObj.pickup_trdp_addr.value=masterVals[29];//dflt_addr
				formObj.pickup_pic.value=masterVals[10];//pic_nm // 현재 AJAX 에서 안넘어오는 데이터 
				formObj.pickup_phn.value=masterVals[11];//pic_phn
				formObj.pickup_fax.value=masterVals[12];//pic_fax
				// 25604 Delivery Order에서 Pickup Location을 선택 하면, 자동으로 Pickup Location이 Return Location으로 설정
				/*formObj.return_trdp_cd.value=masterVals[0];//trdp_cd
				formObj.return_trdp_nm.value = masterVals[3];//eng trdp name				
				formObj.return_trdp_nm.value=masterVals[16];//local trdp name
				formObj.return_trdp_addr.value=masterVals[14];//trdp_addr
				formObj.return_pic.value=masterVals[10];//pic_nm
				formObj.return_phn.value=masterVals[11];//pic_phn
				formObj.return_fax.value=masterVals[12];//pic_fax*/
				
//				#1584 [IMPEX] OEH PICKUP/DELIVERY ORDER INTERFACING ISSUE - LOADED RETURN LOCATION
				if(WO_RETURN_LOC_BLANK == "B"){
					formObj.return_trdp_cd.value   = masterVals[0];
					formObj.return_trdp_nm.value   = masterVals[3];
					//formObj.return_trdp_addr.value = masterVals[14];
					formObj.return_trdp_addr.value = masterVals[29];
					formObj.return_pic.value       = masterVals[10];
					formObj.return_phn.value       = masterVals[11];
					formObj.return_fax.value       = masterVals[12];
				}else if(WO_RETURN_LOC_BLANK == "Y"){
					formObj.return_trdp_cd.value   = "";
					formObj.return_trdp_nm.value   = "";
					//formObj.return_trdp_addr.value = masterVals[14];
					formObj.return_trdp_addr.value = "";
					formObj.return_pic.value       = "";
					formObj.return_phn.value       = "";
					formObj.return_fax.value       = "";
				}
				formObj.pickup_tm.value=masterVals[35];	//ofc_fm_hr
				formObj.pickup_to_tm.value=masterVals[36];//ofc_to_hr
			}
			if(CODETYPE =="partner_delivery"){
				formObj.delivery_trdp_cd.value=masterVals[0];
//				formObj.delivery_trdp_nm.value = masterVals[3];//eng trdp name 				
				formObj.delivery_trdp_nm.value=masterVals[16];//local trdp name 
				//formObj.delivery_trdp_addr.value=masterVals[14];//trdp_addr
				formObj.delivery_trdp_addr.value=masterVals[29];//dflt_addr
				formObj.delivery_pic.value=masterVals[10];//pic_nm
				formObj.delivery_phn.value=masterVals[11];//pic_phn
				formObj.delivery_fax.value=masterVals[12];//pic_fax
				formObj.delivery_tm.value=masterVals[35];	//ofc_fm_hr
				formObj.delivery_to_tm.value=masterVals[36];//ofc_to_hr
			}
			if(CODETYPE =="partner_trsp"){
				formObj.return_trdp_cd.value=masterVals[0];//trdp_cd
//				formObj.return_trdp_nm.value = masterVals[3];//eng trdp name				
				formObj.return_trdp_nm.value=masterVals[16];//local trdp name
				//formObj.return_trdp_addr.value=masterVals[14];//trdp_addr
				formObj.return_trdp_addr.value=masterVals[29];//dflt_addr
				formObj.return_pic.value=masterVals[10];//pic_nm
				formObj.return_phn.value=masterVals[11];//pic_phn
				formObj.return_fax.value=masterVals[12];//pic_fax
				formObj.return_tm.value=masterVals[35];	//ofc_fm_hr
				formObj.return_to_tm.value=masterVals[36];//ofc_to_hr
			}
			if(CODETYPE =="partner_bill"){
				formObj.bill_to_trdp_cd.value=masterVals[0];//trdp_cd
//				formObj.bill_to_trdp_nm.value = masterVals[3];//eng trdp name
				formObj.bill_to_trdp_nm.value=masterVals[16];//local trdp name				
				//formObj.bill_to_trdp_addr.value=masterVals[15];//bill to Address
				formObj.bill_to_trdp_addr.value=masterVals[29];//bill to Address
				formObj.bill_to_pic.value=masterVals[10];//pic_nm
				formObj.bill_to_phn.value=masterVals[11];//pic_phn
				formObj.bill_to_fax.value=masterVals[12];//pic_fax
			}
			if(CODETYPE =="partner_trucker"){
				formObj.trucker_trdp_cd.value=masterVals[0];//trdp_cd
//				formObj.trucker_trdp_nm.value = masterVals[3];//eng_nm
				formObj.trucker_trdp_nm.value=masterVals[16];//local_nm
				//formObj.trucker_trdp_addr.value=masterVals[14];//trdp_addr
				formObj.trucker_trdp_addr.value=masterVals[29];//dflt_addr
				//formObj.trucker_trdp_addr.value=masterVals[15];//bill to Address
				formObj.trucker_pic.value=masterVals[10];//pic_nm
				formObj.trucker_phn.value=masterVals[11];//pic_phn
				formObj.trucker_fax.value=masterVals[12];//pic_fax
			}
			if(CODETYPE =="partner_cstms_cust"){
				formObj.cstms_cust_cd.value=masterVals[0];
				formObj.cstms_cust_nm.value=masterVals[3];//local_nm
				formObj.cstms_cust_addr.value=masterVals[1];//addr
				formObj.cstms_cust_pic.value=masterVals[10];//pic_nm
				formObj.cstms_cust_phn.value=masterVals[11];//pic_nm
				formObj.cstms_cust_fax.value=masterVals[12];//pic_nm//pic_fax

			}
			if(CODETYPE =="partner_cust"){
				formObj.cust_cd.value=masterVals[0];
				formObj.cust_nm.value=masterVals[16];//local_nm
				formObj.cust_addr.value=masterVals[29];//addr
				formObj.cust_pic.value=masterVals[10];//pic_nm
				formObj.cust_phn.value=masterVals[11];//pic_nm
				formObj.cust_fax.value=masterVals[12];//pic_nm//pic_fax

			}
			if(CODETYPE =="partner_wh"){
				formObj.wh_cd.value=masterVals[0];
				formObj.wh_nm.value=masterVals[16];//local_nm
				formObj.wh_addr.value=masterVals[29];//addr
				formObj.wh_pic.value=masterVals[10];//pic_nm
				formObj.wh_phn.value=masterVals[11];//pic_nm
				formObj.wh_fax.value=masterVals[12];//pic_nm//pic_fax
				formObj.wh_tm.value=masterVals[35];	//ofc_fm_hr
				formObj.wh_to_tm.value=masterVals[36];//ofc_to_hr
			}
			if(CODETYPE =="partner_biz"){
				formObj.biz_unit_trdp_cd.value=masterVals[0];
				formObj.biz_unit_trdp_nm.value=masterVals[16];//local_nm
			}				
			if(CODETYPE =="location_pol"){
				formObj.pol_cd.value=masterVals[0];//loc_cd
				formObj.pol_nm.value=masterVals[3];//loc_nm
				//formObj.pol_cd.value = masterVals[1];//nod_cd 
//				formObj.pol_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
			}
			if(CODETYPE =="location_pod"){
				formObj.pod_cd.value=masterVals[0];//loc_cd
				formObj.pod_nm.value=masterVals[3];//loc_nm
				//formObj.pol_cd.value = masterVals[1];//nod_cd 
//				formObj.pol_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
			}
			if(CODETYPE =="partner_liner"){
				formObj.lnr_trdp_cd.value=masterVals[0];
				formObj.lnr_trdp_nm.value = masterVals[3];// eng_nm
			}
			if(CODETYPE =="commodity"){
				formObj.cgo_itm_cmdt_cd.value=masterVals[0];
				formObj.cgo_itm_cmdt_nm.value=masterVals[3];
			}else if(CODETYPE =="package"){
				formObj.cgo_pck_ut_cd.value=masterVals[0];
			}
		}else{
			if(CODETYPE =="partner_pickup"){
				formObj.pickup_trdp_cd.value="";
				formObj.pickup_trdp_nm.value="";
				formObj.pickup_trdp_addr.value="";
				formObj.pickup_pic.value="";//pic_nm
				formObj.pickup_phn.value="";//pic_phn
				formObj.pickup_fax.value="";//pic_fax
				formObj.pickup_tm.value="";//ofc_fm_hr
				formObj.pickup_to_tm.value="";//ofc_to_hr
			}
			if(CODETYPE =="partner_delivery"){
				formObj.delivery_trdp_cd.value="";
				formObj.delivery_trdp_nm.value="";
				formObj.delivery_trdp_addr.value="";
				formObj.delivery_pic.value="";//pic_nm
				formObj.delivery_phn.value="";//pic_phn
				formObj.delivery_fax.value="";//pic_fax
				formObj.delivery_tm.value="";//ofc_fm_hr
				formObj.delivery_to_tm.value="";//ofc_to_hr
			}
			if(CODETYPE =="partner_trsp"){
				formObj.return_trdp_cd.value="";//trdp_cd
				formObj.return_trdp_nm.value="";//full_nm
				formObj.return_trdp_addr.value="";//lgl_addr
				formObj.return_pic.value="";//pic_nm
				formObj.return_phn.value="";//pic_phn
				formObj.return_fax.value="";//pic_fax
				formObj.return_tm.value="";//ofc_fm_hr
				formObj.return_to_tm.value="";//ofc_to_hr
			}
			if(CODETYPE =="partner_wh"){
				formObj.wh_cd.value="";//trdp_cd
				formObj.wh_nm.value="";//full_nm
				formObj.wh_addr.value="";//full_nm
				formObj.wh_pic.value="";//pic_nm
				formObj.wh_phn.value="";//pic_phn
				formObj.wh_fax.value="";//pic_fax
				formObj.wh_tm.value="";//ofc_fm_hr
				formObj.wh_to_tm.value="";//ofc_to_hr
			}	
			if(CODETYPE =="partner_biz"){
				formObj.biz_unit_trdp_cd.value="";//trdp_cd
				formObj.biz_unit_trdp_nm.value="";//full_nm
			}			
			if(CODETYPE =="partner_bill"){
				formObj.bill_to_trdp_cd.value="";//trdp_cd
				formObj.bill_to_trdp_nm.value="";//full_nm
				formObj.bill_to_trdp_addr.value="";//lgl_addr
				formObj.bill_to_pic.value="";//pic_nm
				formObj.bill_to_phn.value="";//pic_phn
				formObj.bill_to_fax.value="";//pic_fax
			}
			if(CODETYPE =="location_pol"){
				formObj.pol_cd.value="";//loc_cd
				formObj.pol_nm.value="";//loc_nm
			}
			if(CODETYPE =="location_pod"){
				formObj.pod_cd.value="";//loc_cd
				formObj.pod_nm.value="";//loc_nm
			}
			if(CODETYPE =="partner_liner"){
				formObj.lnr_trdp_cd.value="";
				formObj.lnr_trdp_nm.value="";
			}
			if(CODETYPE =="commodity"){
				formObj.cgo_itm_cmdt_cd.value="";
				formObj.cgo_itm_cmdt_nm.value="";
			}else if(CODETYPE =="package"){
				formObj.cgo_pck_ut_cd.value="";
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function setNodPic(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0]=='O'){
				formObj.pickup_pic.value=rtnArr[1] 
				formObj.pickup_phn.value=rtnArr[2]
				formObj.pickup_fax.value=rtnArr[3]
				formObj.pickup_trdp_addr.value=rtnArr[4];
			}else if(rtnArr[0]=='D'){
				formObj.return_pic.value=rtnArr[1]; 
				formObj.return_phn.value=rtnArr[2];
				formObj.return_fax.value=rtnArr[3];
				formObj.return_trdp_addr.value=rtnArr[4];
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//시간분이 유효한지 체크한다.
function checkTime(obj){
	var objTime=obj.value;
	if(objTime.length != 0){
		if(objTime.length == 4){
			objHr=objTime.substring(0,2);
			objMn=objTime.substring(2,4);
			if(objHr != "00"){
				if(objHr < 0 || objHr > 23){
					obj.value="";
					alert(getLabel('AIC_WOM_0010_MSG23'));
					obj.focus();
				}
			}
			if(objMn != "00"){
				if(objMn < 0 || objMn > 59){
					obj.value="";
					alert(getLabel('AIC_WOM_0010_MSG23'));
					obj.focus();
				}
			}
			//obj.value = objHr+":"+objMn;
		}else{
			//obj.value = "";
			alert(getLabel('AIC_WOM_0010_MSG24'));
			obj.focus();
		}	
	}		
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;

var obl_decimal_len = "";
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	
	//#314 [IMPEX] OEM & OEH GROSS WEIGHT DB TO MANAGE DECIMAL UP TO 3 PLACES
	var opt_key = "OBL_DECIMAL_LEN";
	ajaxSendPost(setDecimalLen, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	//OFVFOUR-7798: [Southeast] Update the Title/Subject of Pickup# Notice
	var opt_key_2 = "OIH_PICKUP_DO_TITLE";
	ajaxSendPost(setOptPckDOMailTitle, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_2, "./GateServlet.gsl");
    for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
	var formObj=document.frm1;
	if(formObj.wo_sts_cd.value == 'NA'){
	    formObj.bill_to_trdp_cd.value=formObj.user_ofc_cd.value + "MAINCMP";
	    //formObj.bill_to_trdp_cd.value=formObj.sys_ofc_cd.value + "MAINCMP";
		codeNameAction('partner_bill', formObj.bill_to_trdp_cd, 'onBlur');
		
		frm1.modi_usrid.value="";
		frm1.modi_tms.value="";
		frm1.rgst_usrid.value="";
		frm1.rgst_tms.value="";
	}
	if(formObj.prt_md_yn.value == 'Y'){
	    formObj.prt_md_yn.checked = true;
	}
	//LHK 조회된 Data 가 존재하는 경우 버튼 Set
	if(formObj.wo_no.value!=''){
		btnLoad();
	}
	ajax_Send_check_opt_Value();
	//var air_sea_clss_cd = formObj.air_sea_clss_cd.value;
	//var bnd_clss_cd = formObj.bnd_clss_cd.value;
	//var biz_clss_cd = formObj.biz_clss_cd.value;
	//alert("air_sea_clss_cd : " + air_sea_clss_cd +" bnd_clss_cd : " + bnd_clss_cd + " biz_clss_cd : " + biz_clss_cd);
	
	//26939 처음 조회되었을 경우 (WO_NO와 BL_NO로 조회되지 않았을경우) Remark는 Office Code에 저장된 P/D Remark값을 가져온다
	if(formObj.wo_no.value ==''){
		formObj.rmk.value=formObj.pkup_rmk.value;	
		formObj.wh_instr_txt.value=formObj.wh_instr_rmk.value;	
		formObj.cstms_instr_txt.value=formObj.cstms_instr_rmk.value;
		formObj.wh_lodg_instr_txt.value=formObj.wh_lodg_instr_rmk.value;
		
//		#1584 [IMPEX] OEH PICKUP/DELIVERY ORDER INTERFACING ISSUE - LOADED RETURN LOCATION
//		if(WO_RETURN_LOC_BLANK != "Not"){
		if(WO_RETURN_LOC_BLANK == "B"){
			if (formObj.return_trdp_cd.value == "") {
				formObj.return_trdp_cd.value=formObj.pickup_trdp_cd.value;
				formObj.return_trdp_nm.value=formObj.pickup_trdp_nm.value;
				formObj.return_trdp_addr.value=formObj.pickup_trdp_addr.value;
				formObj.return_pic.value=formObj.pickup_pic.value;
				formObj.return_phn.value=formObj.pickup_phn.value;
				formObj.return_fax.value=formObj.pickup_fax.value;
			}
//			#570 [Sales] #52700 OEH P/DO wrong address connected when T/P searched
//			if (formObj.return_trdp_nm.value == "") {
//				formObj.return_trdp_nm.value=formObj.pickup_trdp_nm.value;
//			}
//			if (formObj.return_trdp_addr.value == "") {
//				formObj.return_trdp_addr.value=formObj.pickup_trdp_addr.value;
//			}
//			if (formObj.return_pic.value == "") {
//				formObj.return_pic.value=formObj.pickup_pic.value;
//			}
//			if (formObj.return_phn.value == "") {
//				formObj.return_phn.value=formObj.pickup_phn.value;
//			}
//			if (formObj.return_fax.value == "") {
//				formObj.return_fax.value=formObj.pickup_fax.value;
//			}	
		}
	} else {
		// #2068 - Document 번호 Title 에 반영
		setTabTitle(formObj.wo_no.value);
	}

	setDefaultValue();	
	
	//#335 [IMPEX] OEM WORK ORDER LOGIC
	//AIE_BMD_MSG67 meassge 제거
	if(document.getElementById("oth_ref_no") != null && formObj.oth_ref_no.value != '' && formObj.wo_no.value==''){
		doWork('HBLSMRY');
	}	
	
	setTimeout("document.frm1.f_wo_no.focus();",1000);
	//OFVFOUR-7857: [SENKO USA] Container Summary on Pickup & Delivery Order form
	setTimeout("if (!isCntrQtyEmpty()) {cntrInfoSet();}", 1000);

	fnSetAutocomplete('pickup_trdp_nm'	, 'PDO_POPLIST', 'pic'); //Pickup
	fnSetAutocomplete('delivery_trdp_nm', 'PDO_POPLIST', 'del'); //Delivery
	fnSetAutocomplete('return_trdp_nm'	, 'PDO_POPLIST', 'trn'); //Return
	fnSetAutocomplete('bill_to_trdp_nm'	, 'PDO_POPLIST', 'bil'); //Bill To	
	fnSetAutocomplete('trucker_trdp_nm'	, 'PDO_POPLIST', 'trk'); //Trucker	
	fnSetAutocomplete('lnr_trdp_nm'		, 'PDO_POPLIST', 'liner'); //Carrier  
	fnSetAutocomplete('cstms_cust_nm'		, 'PDO_POPLIST', 'cstms_cust'); //C.Broker  
	fnSetAutocomplete('wh_nm'		, 'PDO_POPLIST', 'wh'); //warehouse  
	fnSetAutocomplete('cust_nm'		, 'PDO_POPLIST', 'cust'); //warehouse  
	fnSetAutocomplete('biz_unit_trdp_nm'		, 'PDO_POPLIST', 'biz'); //warehouse 
	
	formObj.cgo_itm_cmdt_nm.value = decodeURIComponent(formObj.cgo_itm_cmdt_nm.value);
	
	// #4244 [AGL AWS #2] Work Order Issue
	//formObj.act_wgt_k.value=doMoneyFmt(Number(formObj.act_wgt_k.value).toFixed(obl_decimal_len));
	//formObj.act_wgt_l.value=doMoneyFmt(Number(formObj.act_wgt_l.value).toFixed(obl_decimal_len));
	
	var grsWgtValue = Number(formObj.act_wgt_k.value.replace(/,/gi, "")).toFixed(obl_decimal_len);
	var grsWgtMoney = doMoneyFmt(grsWgtValue);
	formObj.act_wgt_k.value = grsWgtMoney;
	
	var grsWgtLValue = Number(formObj.act_wgt_l.value.replace(/,/gi, "")).toFixed(obl_decimal_len);
	var grsWgtLMoney = doMoneyFmt(grsWgtLValue);
	formObj.act_wgt_l.value = grsWgtLMoney;

}

function setDefaultValue() {
	var formObj = document.frm1;
	formObj.grs_wgt_ut_cd.value = "KG";
	formObj.grs_wgt_ut_cd1.value = "LB";
	formObj.meas_ut_cd.value = "CBM";
	formObj.meas_ut_cd1.value = "CFT";
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
		case 2:     
		with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIC_WOM_0010_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_intg_bl_seq" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_wo_no" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_wo_sts_cd" } ];
	         
	        InitColumns(cols);
	        SetEditable(1);
	        SetVisible(false);
		}
        break;
		case 1:      //IBSheet2 init
			with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIC_WOM_0010_HDR2'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"CheckBox", Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"chk",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"cntr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:14 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"cntr_tpsz_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:55,   Align:"Left",    ColMerge:0,   SaveName:"seal_no1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
	               {Type:"Int",       Hidden:0,  Width:30,   Align:"Right",   ColMerge:1,   SaveName:"cgo_pck_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:55,   Align:"Left",    ColMerge:1,   SaveName:"pck_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
	               {Type:"Float",     Hidden:1,  Width:60,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:1,  Width:60,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:0,   InsertEdit:0,   EditLen:11 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"pickup_number",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"cntr_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"oth_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"ref_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Status",    Hidden:1, Width:1,    Align:"Center",  ColMerge:0,   SaveName:"cntr_ibflag" } ];
	         
	        InitColumns(cols);
	        SetEditable(1);
	        SetSheetHeight(150);
			}                                                      
		break;
    }
}
function updateWgt(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	var cntCheck=sheetObj.CheckedRows("chk");
	if (cntCheck == 0) {
		return;
	}
	var grossWeight_tot=0.00;
	var measurement_tot=0.0000;
	var pck_tot=0;
	for(var i=1; i<=sheetObj.LastRow()+1;i++){
		if(sheetObj.GetCellValue(i, "chk")== 1){
			grossWeight_tot 	+= Number(sheetObj.GetCellValue(i, "cgo_wgt"));
			measurement_tot 	+= Number(sheetObj.GetCellValue(i, "cgo_meas"));
			pck_tot			 	+= Number(sheetObj.GetCellValue(i, "cgo_pck_qty"));
		}
	}
	
	if(formObj.air_sea_clss_cd.value != 'A'){
		frm1.act_wgt_k.value=grossWeight_tot;
		numberCommaLen(frm1.act_wgt_k,8,obl_decimal_len);
		chkComma(frm1.act_wgt_k,8,obl_decimal_len);
		weightChange(frm1.act_wgt_k);
		numberCommaLen(frm1.act_wgt_l,8,obl_decimal_len);
		chkComma(frm1.act_wgt_l,8,obl_decimal_len);
	}else{
		frm1.act_wgt_k.value=grossWeight_tot;
		numberCommaLen(frm1.act_wgt_k,8,2);
		chkComma(frm1.act_wgt_k,8,2);
		weightChange(frm1.act_wgt_k);
		numberCommaLen(frm1.act_wgt_l,8,2);
		chkComma(frm1.act_wgt_l,8,2);
	}
	frm1.cgo_meas_m.value=measurement_tot;
	numberCommaLen(frm1.cgo_meas_m,8,3);
	chkComma(frm1.cgo_meas_m,8,3);
	cbmChange(frm1.cgo_meas_m);
	numberCommaLen(frm1.cgo_meas_f,8,3);
	chkComma(frm1.cgo_meas_f,8,3);
	frm1.cgo_pck_qty.value=pck_tot;
}
function sheet1_OnSearchEnd(sheetObj, errMsg){
	var formObj=document.frm1;	
	if(sheetObj.GetVisible()){
		if(formObj.bnd_clss_cd.value=="O"){
			for(var i=1; i<=sheetObj.LastRow()+1;i++){
				sheetObj.SetCellValue(i, "pickup_number","",0);
			}
		}	
		//formObj.pickup_trdp_cd.focus();	
		if(nextTabSet==1){
			formObj.bill_to_ref_no.focus();
			nextTabSet = 0;
		}else if(nextTabSet==2){
			formObj.wh_ref_no.focus();
			nextTabSet = 0;
		}

	}
	//OFVFOUR-7857: [SENKO USA] Container Summary on Pickup & Delivery Order form
	//cntrInfoSet();
	
}
function sheet1_OnChange(Row, Col, Value, OldValue, RaiseFlag){
	cntrInfoSet();
}
function sheet2_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	doHideProcess();
	if(formObj.wo_no.value==''){
		formObj.wo_no.value=docObjects[1].GetCellValue(1, "sv_wo_no");
		formObj.f_wo_no.value=docObjects[1].GetCellValue(1, "sv_wo_no");
	}
	formObj.wo_sts_cd.value=docObjects[1].GetCellValue(1, "sv_wo_sts_cd");
	
	// #2068 - Document 번호 Title 에 반영
	setTabTitle(formObj.wo_no.value);
	
	btnLoad();
	if(errMsg == undefined  || errMsg==null || errMsg == ""){
		if(formObj.f_cmd.value=="1" || formObj.f_cmd.value=="4" || formObj.f_cmd.value=="13" ){
			//alert(getLabel('FMS_COM_NTYCOM'));
			/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
			showCompleteProcess();
		}
	}
	submitForm(SEARCH);
	doWork("SEARCHLIST");
}
function getWhCd(){
	rtnary=new Array(1);
   	rtnary[0]="SAL";
   	rtnary[1]="A";	
	var rtnVal =  ComOpenWindow('./CMM_POP_0250.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:812px;dialogHeight:480px" , true);
	    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var formObj=document.frm1;
		var rtnValAry=rtnVal.split("|");
		formObj.dest_rout_loc_nm.value=rtnValAry[1];    	   
		formObj.dest_rout_nod_cd.value=rtnValAry[3];    	        
	}
}
/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function woCheckInpuVals(){
	var formObj=document.frm1;
	var isOk=true;
	/*            
	if(checkInputVal(formObj.bkg_no.value, 3, 15, "T", 'Booking No')!='O') {
		///////////////////////////////////////////////////////////////////////////
		// Booking No
		///////////////////////////////////////////////////////////////////////////
		formObj.bkg_no.focus();
		isOk=false;
	}
	*/
	/*
	if(checkInputVal(formObj.org_rout_trdp_cd.value, 3, 7, "T", 'Pick-Up')!='O'){
		///////////////////////////////////////////////////////////////////////////
		// Route Information
		///////////////////////////////////////////////////////////////////////////
		formObj.org_rout_trdp_cd.focus();
		isOk=false;
	}else if(checkInputVal(formObj.org_rout_addr.value, 2, 400, "T", 'Address')!='O'){
		formObj.org_rout_addr.focus();
		isOk=false;
	}else if(checkInputVal(formObj.org_rout_pic.value, 2, 50, "T", 'PIC')!='O'){
		formObj.org_rout_pic.focus();
		isOk=false;
	}else if(checkInputVal(formObj.pkup_ord_no.value, 2, 50, "T", 'Reference')!='O'){
		formObj.pkup_ord_no.focus();
		isOk=false;
	}else if(checkInputVal(formObj.dest_rout_trdp_cd.value, 1, 50, "T", 'Delivery')!='O'){
		///////////////////////////////////////////////////////////////////////////
		// Delivery
		///////////////////////////////////////////////////////////////////////////
		formObj.dest_rout_trdp_cd.focus();
		isOk=false;
	}else if(checkInputVal(formObj.dest_rout_addr.value, 2, 400, "T", 'Address')!='O'){
		formObj.dest_rout_addr.focus();
		isOk=false;
	}else if(checkInputVal(formObj.dest_rout_pic.value, 2, 50, "T", 'PIC')!='O'){
		formObj.dest_rout_pic.focus();
		isOk=false; 
	}
	*/
	if(formObj.biz_clss_cd.value == "H" && formObj.bl_no.value == ""){
		//Select Hbl No.
		alert(getLabel('AIR_MSG_067'));
		formObj.bl_no.focus();
		isOk=false;
		return isOk;
	}
	if(formObj.biz_clss_cd.value == "M"){
		if(formObj.intg_bl_seq.value == "" && formObj.ref_no.value == ""){
			//Select Mbl No or Ref No
			alert(getLabel('AIR_MSG_068'));
			formObj.ref_no.focus();
			isOk=false;
			return isOk;
		}
	}
	// #21020 [WEBTRANS] SUP - Pickup/Delivery Order에서 Save/Update 시 Other Filing No. (Optional)
	/*
	if(formObj.air_sea_clss_cd.value == "" && formObj.bnd_clss_cd.value == "" && formObj.biz_clss_cd.value == "" ){
		if(formObj.oth_ref_no.value ==""){
	//		alert("Select Ref No.");
			alert(getLabel('AIR_MSG_069'));
			isOk=false;
			return isOk;
		}
	}
	*/
	/*52435 Other Pickup Delivery order 일 경우 에만 적용*/
	if(formObj.biz_clss_cd.value == ''){
		if(formObj.oth_ref_no.value ==""){
			//Other Filling No
			alert(getLabel('FMS_COM_ALT007') + "\n - " + "Other Filling No" );
			formObj.oth_ref_no.focus();
			isOk=false;
			return isOk;
		}
	}
	if(trim(formObj.bill_to_trdp_cd.value)==""){
		//Bill to information
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BLTO') );
		formObj.bill_to_trdp_cd.focus();
		isOk=false;
		return isOk;
	}
	if(trim(formObj.bill_to_trdp_nm.value)==""){
		//Bill to information
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BLTO') );
		formObj.bill_to_trdp_nm.focus();
		isOk=false;
		return isOk;
	}
	if(trim(formObj.bill_to_trdp_addr.value)==""){
		//Bill to information
		alert(getLabel('FMS_COM_ALT007') + "\n - " + "Bill To Address" );
		formObj.bill_to_trdp_addr.focus();
		isOk=false;
		return isOk;
	}
	/* jsjang 2013.7.15  요구사항 #15935 Pickup/Delivery Order 화면 G/WT, Measurement Mandatory  제외 건 Start */
	//if(parseFloat(trim(formObj.act_wgt_k.value).replace(/,/g, '')) <= 0 || trim(formObj.act_wgt_k.value)=="" ){
	
	 //Redmine request #48114 20150312 Skwoo
	if(trim(formObj.act_wgt_k.value)=="" && formObj.air_sea_clss_cd.value == 'A'){
		alert(getLabel('FMS_COM_ALT007') + "(Gross Weight)" );
		formObj.act_wgt_k.focus();
		isOk=false;
		return isOk;
	}
	
/*	
	else{
*/
	if (parseFloat(trim(formObj.act_wgt_k.value).replace(/, /g, "")) > 0 && trim(formObj.act_wgt_k.value) != "") {
		var arr_act_wgt_k=(trim(formObj.act_wgt_k.value).replace(/, /g, '')).split(".");
		if(arr_act_wgt_k[0].length > 12){
			alert(getLabel('AIR_MSG_092') + "(Max Length : 999,999,999,999.99)" );
			formObj.act_wgt_k.focus();
			isOk=false;
			return isOk;
		}
	}
/*
	if(parseFloat(trim(formObj.act_wgt_l.value).replace(/,/g, '')) <= 0 || trim(formObj.act_wgt_l.value) =="" ){
		alert(getLabel('FMS_COM_ALT007') + "(Gross Weight)" );
		formObj.act_wgt_l.focus();
		isOk=false;
		return isOk;
	}else{
*/
	if (parseFloat(trim(formObj.act_wgt_l.value).replace(/, /g, "")) > 0 && trim(formObj.act_wgt_l.value) != "") {
		var arr_act_wgt_l=(trim(formObj.act_wgt_l.value).replace(/, /g, '')).split(".");
		if(arr_act_wgt_l[0].length > 12){
			alert(getLabel('AIR_MSG_092') + "(Max Length : 999,999,999,999.99)" );
			formObj.act_wgt_l.focus();
			isOk=false;
			return isOk;
		}
	}
	/* jsjang 2013.7.15  요구사항 #15935 Pickup/Delivery Order 화면 G/WT, Measurement Mandatory  제외 건 Start */
	//if(parseFloat(trim(formObj.cgo_meas_m.value).replace(/,/g,'')) <= 0 || trim(formObj.cgo_meas_m.value)==""){
	if(trim(formObj.cgo_meas_m.value)==""  && formObj.air_sea_clss_cd.value == 'S'){
		alert(getLabel('FMS_COM_ALT007') + "(Measurement)" );
		formObj.cgo_meas_m.focus();
		isOk=false;
		return isOk;
	}
/*
	else{
*/
	if (parseFloat(trim(formObj.cgo_meas_m.value).replace(/, /g, "")) > 0 && trim(formObj.cgo_meas_m.value) != "") {
		var arr_cgo_meas_m=(trim(formObj.cgo_meas_m.value).replace(/, /g, '')).split(".");
		if(arr_cgo_meas_m[0].length > 10){
			alert(getLabel('AIR_MSG_092') + "(Max Length : 9,999,999,999.999999)" );
			formObj.cgo_meas_m.focus();
			isOk=false;
			return isOk;
		}
	}
/*
	if(parseFloat(trim(formObj.cgo_meas_f.value).replace(/,/g, '')) <= 0 || trim(formObj.cgo_meas_f.value)==""){
		alert(getLabel('FMS_COM_ALT007') + "(Measurement)" );
		formObj.cgo_meas_f.focus();
		isOk=false;
		return isOk;
	}else{
*/
	if (parseFloat(trim(formObj.cgo_meas_f.value).replace(/, /g, "")) > 0 && trim(formObj.cgo_meas_f.value) != "") {
		var arr_cgo_meas_f=(trim(formObj.cgo_meas_f.value).replace(/, /g, '')).split(".");
		if(arr_cgo_meas_f[0].length > 10){
			alert(getLabel('AIR_MSG_092') + "(Max Length : 9,999,999,999.999999)" );
			formObj.cgo_meas_f.focus();
			isOk=false;
			return isOk;
		}
	}
/**
	}else if(checkInputVal(formObj.lnr_trdp_cd.value, 6, 20, "T", 'Carrier Code')!='O'){
		formObj.lnr_trdp_cd.focus();
		isOk=false;
		return isOk;
	}else if(checkInputVal(formObj.lnr_trdp_nm.value, 2, 50, "T", 'Carrier Name')!='O'){
		formObj.lnr_trdp_nm.focus();
		isOk=false;
		return isOk;
**/
	//Remark maxlength ckeck
	 lengthChk(formObj.rmk);
	/*
	if(act_wgt_k ==""){
		alert(getLabel('AII_BMD_MSG78'));
		formObj.act_wgt_k.focus();
		return;
	}else if(act_wgt_k =="0" || act_wgt_k =="0.00")
	{
		if(confirm(getLabel('FMS_COM_CFMGRS'))){
			if(formObj.wo_no.value==''){
				doWork("SAVE_ADD");
			}else{
				doWork("SAVE_MODIFY");
			}
		}else{
			formObj.act_wgt_k.focus();
			return;
		}
	}else{
		if(formObj.wo_no.value==''){
			doWork("SAVE_ADD");
		}else{
			doWork("SAVE_MODIFY");
		}
	}
	*/
	return isOk;
}
function weightChange(obj){
		var formObj=document.frm1;
		if(obj.name=="act_wgt_k"){
			if(formObj.air_sea_clss_cd.value != 'A'){
				formObj.act_wgt_k.value=doMoneyFmt(Number(formObj.act_wgt_k.value.replace(/,/gi, "")).toFixed(obl_decimal_len));
				formObj.act_wgt_l.value=doMoneyFmt(roundXL(formObj.act_wgt_k.value.replaceAll(",","") * CNVT_CNST_KG_LB, obl_decimal_len));
			}else{
				formObj.act_wgt_l.value=doMoneyFmt(roundXL(formObj.act_wgt_k.value.replaceAll(",","") * CNVT_CNST_KG_LB, 2));
			}
			if(formObj.act_wgt_l.value =="0" || formObj.act_wgt_l.value ==""){
				formObj.act_wgt_l.value="0.00";
				if(formObj.air_sea_clss_cd.value != 'A'){
					chkComma(formObj.act_wgt_l,8,obl_decimal_len);
				}else{
					chkComma(formObj.act_wgt_l,8,2);
				}
			}else{
				var beforeMoneyFom = formObj.act_wgt_l.value;
				formObj.act_wgt_l.value = doMoneyFmt(beforeMoneyFom);
			}
		}else if(obj.name=="act_wgt_l"){
			if(formObj.air_sea_clss_cd.value != 'A'){
				formObj.act_wgt_l.value=doMoneyFmt(Number(formObj.act_wgt_l.value.replace(/,/gi, "")).toFixed(obl_decimal_len));
				formObj.act_wgt_k.value=doMoneyFmt(roundXL(formObj.act_wgt_l.value.replaceAll(",","") / CNVT_CNST_KG_LB, obl_decimal_len));
			}else{
				formObj.act_wgt_k.value=doMoneyFmt(roundXL(formObj.act_wgt_l.value.replaceAll(",","") / CNVT_CNST_KG_LB, 2));
			}
			if(formObj.act_wgt_k.value =="0" || formObj.act_wgt_k.value ==""){
				formObj.act_wgt_k.value="0.00";
				if(formObj.air_sea_clss_cd.value != 'A'){
					chkComma(formObj.act_wgt_k,8,obl_decimal_len);
				}else{
					chkComma(formObj.act_wgt_k,8,2);
				}
			}else{
				var beforeMoneyFom = formObj.act_wgt_k.value;
				formObj.act_wgt_k.value = doMoneyFmt(beforeMoneyFom);
			}
		}
	}
function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="cgo_meas_m"){
		formObj.cgo_meas_f.value=roundXL(formObj.cgo_meas_m.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, 3);
		if(formObj.cgo_meas_f.value =="0" || formObj.cgo_meas_f.value ==""){
			formObj.cgo_meas_f.value="0.000";
			chkComma(formObj.cgo_meas_f,8,3);
		}else{
			var beforeMoneyFom = formObj.cgo_meas_f.value;
			formObj.cgo_meas_f.value = doMoneyFmt(beforeMoneyFom);
		}
	}else if(obj.name=="cgo_meas_f"){
		formObj.cgo_meas_m.value=roundXL(formObj.cgo_meas_f.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, 3);
		if(formObj.cgo_meas_m.value =="0" || formObj.cgo_meas_m.value ==""){
			formObj.cgo_meas_m.value="0.000";
			chkComma(formObj.cgo_meas_m,8,3);
		}else{
			var beforeMoneyFom = formObj.cgo_meas_m.value;
			formObj.cgo_meas_m.value = doMoneyFmt(beforeMoneyFom);
		}
	}
}
var mailTo="";
function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}else{
			mailTo=doc[1];
		}
	}
}
function lengthChk(obj){
	if(obj.value.length > 1000){
		alert(getLabel('AIR_MSG_090'));
		obj.value=obj.value.substr(0,1000);
		obj.focus();
		return;
	}
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].name !="air_sea_clss_cd" && collTxt[i].name !="bnd_clss_cd" && collTxt[i].name !="biz_clss_cd" && collTxt[i].name !="sys_ofc_cd"){
		   if(collTxt[i].type == "text"|| collTxt[i].type == "hidden"){
			  //collTxt[i].value="";
		   }
		}
	}
	formObj.wo_no.value="";
	formObj.f_wo_no.value="";
	formObj.intg_bl_seq.value="";
	formObj.wo_sts_cd.value="NA";
	formObj.pickup_trdp_addr.value="";
	formObj.delivery_trdp_addr.value="";
	formObj.return_trdp_addr.value="";
	formObj.bill_to_trdp_addr.value="";
	formObj.trucker_trdp_addr.value="";
	formObj.rmk.value="";
	sheetObj.RemoveAll();
	setDefaultValue();
}

/*20151105 #49400 관련 사항 반영 시작*/
function ajax_Send_check_opt_Value(){
	var opt_key = "WO_RETURN_LOC_BLANK";
	ajaxSendPost(setSend_check_opt_Value, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setSend_check_opt_Value(reqVal){
	var formObj=document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == "OK" && doc[1]!= undefined ) { //DB 에서 option data가 잘 들어가 있는 경우
//		#1584 [IMPEX] OEH PICKUP/DELIVERY ORDER INTERFACING ISSUE - LOADED RETURN LOCATION
		WO_RETURN_LOC_BLANK = doc[1];
//		if(doc[1] == "Y"){
//			WO_RETURN_LOC_BLANK = "Not";
//		}
	}
}
/*20151105 #49400 관련 사항 반영 종료*/
function PARTNER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{	
		var id = cur_curObj.id;
		
		if(id=="pic"){
			var rtnValAry=rtnVal.split("|");
			formObj.pickup_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.pickup_trdp_nm.value=rtnValAry[10];//locl_nm
			//formObj.pickup_trdp_addr.value=rtnValAry[26];//
			formObj.pickup_trdp_addr.value=rtnValAry[37];
			formObj.pickup_pic.value=rtnValAry[3];//pic_nm
			formObj.pickup_phn.value=rtnValAry[4];//pic_phn
			formObj.pickup_fax.value=rtnValAry[5];//pic_fax	
			// 25604 Delivery Order에서 Pickup Location을 선택 하면, 자동으로 Pickup Location이 Return Location으로 설정
//			#1584 [IMPEX] OEH PICKUP/DELIVERY ORDER INTERFACING ISSUE - LOADED RETURN LOCATION
			if(WO_RETURN_LOC_BLANK == "Y"){
				formObj.return_trdp_cd.value=rtnValAry[0];
				formObj.return_trdp_nm.value=rtnValAry[10];
				//formObj.return_trdp_addr.value=rtnValAry[26];
				formObj.return_trdp_addr.value=rtnValAry[37];
				formObj.return_pic.value=rtnValAry[3];
				formObj.return_phn.value=rtnValAry[4];
				formObj.return_fax.value=rtnValAry[5];
			}else{
			}
			formObj.pickup_tm.value=rtnValAry[38];//ofc_fm_hr
			formObj.pickup_to_tm.value=rtnValAry[39];//ofc_to_hr			
			
		}else if(id=="del") {
			var rtnValAry=rtnVal.split("|");
			formObj.delivery_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.delivery_trdp_nm.value=rtnValAry[10];//locl_nm
			//formObj.delivery_trdp_addr.value=rtnValAry[26];//
			formObj.delivery_trdp_addr.value=rtnValAry[37];
			formObj.delivery_pic.value=rtnValAry[3];//pic_nm
			formObj.delivery_phn.value=rtnValAry[4];//pic_phn
			formObj.delivery_fax.value=rtnValAry[5];//pic_fax
			
			formObj.delivery_tm.value=rtnValAry[38];//ofc_fm_hr
			formObj.delivery_to_tm.value=rtnValAry[39];//ofc_to_hr	
		}else if(id=="trn") {
			var rtnValAry=rtnVal.split("|");
			formObj.return_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.return_trdp_nm.value=rtnValAry[10];//locl_nm
			//formObj.return_trdp_addr.value=rtnValAry[26];//
			formObj.return_trdp_addr.value=rtnValAry[37];
			formObj.return_pic.value=rtnValAry[3];//pic_nm
			formObj.return_phn.value=rtnValAry[4];//pic_phn
			formObj.return_fax.value=rtnValAry[5];//pic_fax
			
			formObj.return_tm.value=rtnValAry[38];//ofc_fm_hr
			formObj.return_to_tm.value=rtnValAry[39];//ofc_to_hr	
		}else if(id=="bil") {
			var rtnValAry=rtnVal.split("|");
			formObj.bill_to_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.bill_to_trdp_nm.value=rtnValAry[10];//eng_nm
			//formObj.bill_to_trdp_addr.value=rtnValAry[27];//
			formObj.bill_to_trdp_addr.value=rtnValAry[37];
			formObj.bill_to_pic.value=rtnValAry[3];//pic_nm
			formObj.bill_to_phn.value=rtnValAry[4];//pic_phn
			formObj.bill_to_fax.value=rtnValAry[5];//pic_fax
		}else if(id=="trk") {
			var rtnValAry=rtnVal.split("|");
			formObj.trucker_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.trucker_trdp_nm.value=rtnValAry[10];//locl_nm
			//formObj.trucker_trdp_addr.value=rtnValAry[26];//
			formObj.trucker_trdp_addr.value=rtnValAry[37];
			formObj.trucker_pic.value=rtnValAry[3];//pic_nm
			formObj.trucker_phn.value=rtnValAry[4];//pic_phn
			formObj.trucker_fax.value=rtnValAry[5];//pic_fax
		}
		else if(id=="liner") {
			var rtnValAry=rtnVal.split("|");
			formObj.lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.lnr_trdp_nm.value=rtnValAry[2];//full_nm
		}
		else if(id=="cstms_cust") {
			var rtnValAry=rtnVal.split("|");
			formObj.cstms_cust_cd.value=rtnValAry[0];//trdp_cd
			formObj.cstms_cust_nm.value=rtnValAry[2];//full_nm
			formObj.cstms_cust_addr.value=rtnValAry[7];
			formObj.cstms_cust_pic.value=rtnValAry[3];//pic_nm
			formObj.cstms_cust_phn.value=rtnValAry[4];//pic_phn
			formObj.cstms_cust_fax.value=rtnValAry[5];//pic_fax			
		}
		else if(id=="cust") {
			var rtnValAry=rtnVal.split("|");
			formObj.cust_cd.value=rtnValAry[0];//trdp_cd
			formObj.cust_nm.value=rtnValAry[10];//full_nm
			formObj.cust_addr.value=rtnValAry[37];
			formObj.cust_pic.value=rtnValAry[3];//pic_nm
			formObj.cust_phn.value=rtnValAry[4];//pic_phn
			formObj.cust_fax.value=rtnValAry[5];//pic_fax			
		}
		else if(id=="wh") {
			var rtnValAry=rtnVal.split("|");
			formObj.wh_cd.value=rtnValAry[0];//trdp_cd
			formObj.wh_nm.value=rtnValAry[10];//full_nm
			formObj.wh_addr.value=rtnValAry[37];
			formObj.wh_pic.value=rtnValAry[3];//pic_nm
			formObj.wh_phn.value=rtnValAry[4];//pic_phn
			formObj.wh_fax.value=rtnValAry[5];//pic_fax			
			formObj.wh_tm.value=rtnValAry[38];//ofc_fm_hr
			formObj.wh_to_tm.value=rtnValAry[39];//ofc_to_hr			
			
		}
		else if(id=="biz") {
			var rtnValAry=rtnVal.split("|");
			formObj.biz_unit_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.biz_unit_trdp_nm.value=rtnValAry[10];//local name
		}
	}
}

function WO_POPLIST(rtnVal){
  	var formObj=document.frm1;
      if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_wo_no.value=rtnValAry[0];//wo_no
		formObj.intg_bl_seq.value=rtnValAry[2];//intg_bl_seq		
		doWork('SEARCH');
	}
}

function HBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.bl_no.value=rtnValAry[0];//house_bl_no
		formObj.intg_bl_seq.value=rtnValAry[3];//intg_bl_seq
		//formObj.bkg_no.value = rtnValAry[4];//bkg_no
	}
	doWork('HBLSMRY');
 }

function MBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.mbl_no.value=rtnValAry[0];//s_mbl_no
		formObj.intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		formObj.ref_no.value=rtnValAry[2];//s_mbl_no
	}
	doWork('HBLSMRY');
 }

function REF_POPLIST(rtnVal){
	var formObj = document.frm1;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.mbl_no.value=rtnValAry[0];//s_mbl_no
		formObj.intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		formObj.ref_no.value=rtnValAry[2];
	}
	doWork('HBLSMRY');
 }
 
function CU_BKNO_DO_POPLIST_BLANK(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		formObj.bkg_no.value = rtnValAry[0];//bkg_no
		formObj.bkg_seq.value = rtnValAry[1];//bkg_seq
		
		if(formObj.bkg_no.value !=""){
			doWork('HBLSMRY');
        }
	}
}
function CA_BKNO_DO_POPLIST_BLANK(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		formObj.bkg_no.value = rtnValAry[1];//bkg_no
		formObj.bkg_seq.value = rtnValAry[2];//bkg_seq
		
		if(formObj.bkg_no.value !=""){
			doWork('HBLSMRY');
        }
	}
}

//#1790 [CLA TEST] PICKUP/DELIVERY ORDER DATE VALIDATION MESSAGE IS NOT BYPASSED.
function timeCheck(obj){
	var size=obj.value.length;
	if(size==1){
		obj.value="0" + obj.value + ":00";
	}else if(size==2){
		if(hourCheck(obj.value)){
			obj.value=obj.value + ":00";
		}else{
			obj.value='';
			obj.focus();
		}
	}else if(size==3){
		if(hourCheck(obj.value.substring(0,2))){
			if(obj.value.substring(2,3)>5 || obj.value.substring(2,3)<0){
				obj.value='';
				obj.focus();
			}else if(obj.value.substring(2,3) == ":"){
				obj.value=obj.value.substring(0,2) + ":" + "00";
			}else{
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,3) + "0";
			}
		}else{
			obj.value='';
			obj.focus();
		}
	}else if(size==4){
		if(hourCheck(obj.value.substring(0,2))){
			if(minuteCheck(obj.value.substring(2,4))){
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,4);
			}else{
				obj.value='';
				obj.focus();
			}
		}else{
			obj.value='';
			obj.focus();
		}
	}
}
function hourCheck(obj){
	if(isNaN(obj)){
		alert(getLabel('COM_FRT_ALT002'));
		return false;
	}
	if(obj>23 || obj<0){
		//HOUR: 0-23
		alert(getLabel('COM_FRT_ALT002'));
		return false;
	}else{
		return true;
	}
}
function minuteCheck(obj){
	if(isNaN(obj)){
		alert(getLabel('COM_FRT_ALT003'));
		return false;
	}
	if(obj>59 || obj<0){
		//alert('0-59');
		alert(getLabel('COM_FRT_ALT003'));
		return false;
	}else{
		return true;
	}
}

function cntrInfoSet() {
	
var sheetObj = docObjects[0];
var formObj=document.frm1; 
var cntr_info="";
var Rows=sheetObj.LastRow() + 1;
//OFVFOUR-7857: [SENKO USA] Container Summary on Pickup & Delivery Order form
	if(Rows == 1){
		return;
	}
	else {
		for(var i=1; i<Rows; i++){
			if(sheetObj.GetCellValue(i, "chk") == 1){
				var cntr_tpsz_cd=sheetObj.GetCellValue(i, "cntr_tpsz_cd");
		 		//
		 		if(cntr_info.indexOf(cntr_tpsz_cd) == -1){
		 			cntr_info += cntr_tpsz_cd + " X 1, ";
		 		}else{
		 			var arr_cntr_info=cntr_info.split(", ");
		 			cntr_info="";
		 			for(var j=0; j<arr_cntr_info.length-1; j++){
		 				var arr_cntr_tpsz=arr_cntr_info[j].split(" X ");
		 				if(arr_cntr_tpsz[0].indexOf(cntr_tpsz_cd) != -1){
		 					var cntr_tpsz_cnt=eval(arr_cntr_tpsz[1]) + 1;
		 					var addCntrStr=arr_cntr_tpsz[0] + " X " + cntr_tpsz_cnt + ", ";
		 					cntr_info += addCntrStr;
		 				}else{
		 					var CntrStr=arr_cntr_tpsz[0] + " X " + arr_cntr_tpsz[1] + ", ";
		 					cntr_info += CntrStr;
		 				}
		 			}
		 		}
			}
		}
	}
	if(cntr_info != ''){
		cntr_info=cntr_info.substring(0, cntr_info.length-2);
	}
	formObj.cntr_info.value=cntr_info;
}	


function nextTab(obj){
	
	if(obj.tabIndex == 2){
		//frm1.bill_to_ref_no.focus;
		nextTabSet = 1;
	} else if(obj.tabIndex==5){
		nextTabSet = 2;
	}
		
	
}

function clearBlPrnr(blTrdpTpCd){
	//alert();
	var formObj=document.frm1;
	switch(blTrdpTpCd) {
		case "C03":		//C03	CUSTOM BROKER
			formObj.cstms_cust_cd.value="";
			formObj.cstms_cust_nm.value="";
			formObj.cstms_cust_addr.value="";
			formObj.cstms_cust_pic.value="";
			formObj.cstms_cust_phn.value="";
			formObj.cstms_cust_fax.value="";
			break;

		case "B02":		//B02  Bill to
			formObj.bill_to_trdp_cd.value="";
			formObj.bill_to_trdp_nm.value="";
			formObj.bill_to_trdp_addr.value="";
			formObj.bill_to_pic.value="";
			formObj.bill_to_phn.value="";
			formObj.bill_to_fax.value="";
			break;			
		case "WH":		//WH #52613
			formObj.wh_cd.value=""; 
			formObj.wh_nm.value="";
			formObj.wh_addr.value="";
			formObj.wh_pic.value="";
			formObj.wh_phn.value="";
			formObj.wh_fax.value="";
			break;
		case "TR":		
			formObj.trucker_trdp_cd.value=""; 
			formObj.trucker_trdp_nm.value="";
			formObj.trucker_trdp_addr.value="";
			formObj.trucker_pic.value="";
			formObj.trucker_phn.value="";
			formObj.trucker_fax.value="";
			break;
		case "DL":		//WH #52613
			formObj.delivery_trdp_cd.value=""; 
			formObj.delivery_trdp_nm.value="";
			formObj.delivery_trdp_addr.value="";
			formObj.delivery_pic.value="";
			formObj.delivery_phn.value="";
			formObj.delivery_fax.value="";
			break;
		case "PU":		//WH #52613
			formObj.pickup_trdp_cd.value=""; 
			formObj.pickup_trdp_nm.value="";
			formObj.pickup_trdp_addr.value="";
			formObj.pickup_pic.value="";
			formObj.pickup_phn.value="";
			formObj.pickup_addr.value="";
			break;
	}
}


function PDO_POPLIST(rtnVal){
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
		}
	 
	 //bill to
	 if(cur_curObj.id == "bil"){
		frm1.bill_to_trdp_cd.value=rtnValAry[0];
		
		if(frm1.bill_to_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
			frm1.bill_to_trdp_nm.value=rtnValAry[10];//loc_nm	
			frm1.bill_to_trdp_addr.value=rtnValAry[26];//loc_nm	
		}else{
			frm1.bill_to_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.bill_to_trdp_addr.value=rtnValAry[7];//eng_nm
		}	
		frm1.bill_to_pic.value=rtnValAry[3];
		frm1.bill_to_phn.value=rtnValAry[4];
		frm1.bill_to_fax.value=rtnValAry[5];
	 }
	 
	 //trucker
	 if(cur_curObj.id == "trk"){
			frm1.trucker_trdp_cd.value=rtnValAry[0];
			
			if(frm1.bill_to_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
				frm1.trucker_trdp_nm.value=rtnValAry[10];
				frm1.trucker_trdp_addr.value=rtnValAry[26];	
			}else{
				frm1.trucker_trdp_nm.value=rtnValAry[2];
				frm1.trucker_trdp_addr.value=rtnValAry[7];
			}	
			frm1.trucker_pic.value=rtnValAry[3];
			frm1.trucker_phn.value=rtnValAry[4];
			frm1.trucker_fax.value=rtnValAry[5];
			
	}
	 
	 //C.Broker
	 if(cur_curObj.id == "cstms_cust"){
			frm1.cstms_cust_cd.value=rtnValAry[0];
			frm1.cstms_cust_nm.value=rtnValAry[2];
			frm1.cstms_cust_addr.value=rtnValAry[7];
			frm1.cstms_cust_pic.value=rtnValAry[3];
			frm1.cstms_cust_phn.value=rtnValAry[4];
			frm1.cstms_cust_fax.value=rtnValAry[5];
	}	

	 //business unit
	 if(cur_curObj.id == "biz"){
			frm1.biz_unit_trdp_cd.value=rtnValAry[0];
			
			if(frm1.cstms_cust_nm.getAttribute("dataformat") == "multiLanguage"){
				frm1.biz_unit_trdp_nm.value=rtnValAry[10];
			}else{
				frm1.biz_unit_trdp_nm.value=rtnValAry[2];
			}	
	}	 
	 
	 
	 //warehouse
	 if(cur_curObj.id == "wh"){
			frm1.wh_cd.value=rtnValAry[0];
			
			if(frm1.wh_nm.getAttribute("dataformat") == "multiLanguage"){
				frm1.wh_nm.value=rtnValAry[10];
				frm1.wh_addr.value=rtnValAry[26];	
			}else{
				frm1.wh_nm.value=rtnValAry[2];
				frm1.wh_addr.value=rtnValAry[7];
			}	
			frm1.wh_pic.value=rtnValAry[3];
			frm1.wh_phn.value=rtnValAry[4];
			frm1.wh_fax.value=rtnValAry[5];
			frm1.wh_tm.value=rtnValAry[38];
			frm1.wh_to_tm.value=rtnValAry[39];
			
	}	 
	 
	 
	 //customer
	 if(cur_curObj.id == "cust"){
			frm1.cust_cd.value=rtnValAry[0];
			
			if(frm1.cust_nm.getAttribute("dataformat") == "multiLanguage"){
				frm1.cust_nm.value=rtnValAry[10];
				frm1.cust_addr.value=rtnValAry[26];	
			}else{
				frm1.cust_nm.value=rtnValAry[2];
				frm1.cust_addr.value=rtnValAry[7];
			}	
			frm1.cust_pic.value=rtnValAry[3];
			frm1.cust_phn.value=rtnValAry[4];
			frm1.cust_fax.value=rtnValAry[5];
	}		 
	 //Carrier 
	 if(cur_curObj.id == "liner"){
		 frm1.lnr_trdp_cd.value=rtnValAry[0];
		 frm1.lnr_trdp_nm.value=rtnValAry[2];
		 	
	 }		 
	 
	 //Empty Pickup
	 if(cur_curObj.id == "pic"){
			frm1.pickup_trdp_cd.value=rtnValAry[0];
			
			if(frm1.pickup_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
				frm1.pickup_trdp_nm.value=rtnValAry[10];
				frm1.pickup_trdp_addr.value=rtnValAry[26];	
			}else{
				frm1.pickup_trdp_nm.value=rtnValAry[2];
				frm1.pickup_trdp_addr.value=rtnValAry[7];
			}	
			frm1.pickup_pic.value=rtnValAry[3];
			frm1.pickup_phn.value=rtnValAry[4];
			frm1.pickup_fax.value=rtnValAry[5];
			frm1.pickup_tm.value=rtnValAry[38];
			frm1.pickup_to_tm.value=rtnValAry[39];
			
	}		

	 //freight Pickup
	 if(cur_curObj.id == "del"){
			frm1.delivery_trdp_cd.value=rtnValAry[0];
			
			if(frm1.delivery_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
				frm1.delivery_trdp_nm.value=rtnValAry[10];
				frm1.delivery_trdp_addr.value=rtnValAry[26];	
			}else{
				frm1.delivery_trdp_nm.value=rtnValAry[2];
				frm1.delivery_trdp_addr.value=rtnValAry[7];
			}	
			frm1.delivery_pic.value=rtnValAry[3];
			frm1.delivery_phn.value=rtnValAry[4];
			frm1.delivery_fax.value=rtnValAry[5];
			frm1.delivery_tm.value=rtnValAry[38];
			frm1.delivery_to_tm.value=rtnValAry[39];
	}	
	 
	 //Loaded Return
	 if(cur_curObj.id == "trn"){
			frm1.return_trdp_cd.value=rtnValAry[0];
			
			if(frm1.return_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
				frm1.return_trdp_nm.value=rtnValAry[10];
				frm1.return_trdp_addr.value=rtnValAry[26];	
			}else{
				frm1.return_trdp_nm.value=rtnValAry[2];
				frm1.return_trdp_addr.value=rtnValAry[7];
			}	
			frm1.return_pic.value=rtnValAry[3];
			frm1.return_phn.value=rtnValAry[4];
			frm1.return_fax.value=rtnValAry[5];
			frm1.return_tm.value=rtnValAry[38];
			frm1.return_to_tm.value=rtnValAry[39];
	}	
}

function setDecimalLen(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		obl_decimal_len = doc[1];
	}else{
		obl_decimal_len = "3";
	}
}

//OFVFOUR-7798: [Southeast] Update the Title/Subject of Pickup# Notice
var optPckpDOMailTitle;
function setOptPckDOMailTitle(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		optPckpDOMailTitle = doc[1];
	}else{
		optPckpDOMailTitle = "N";
	}
}

//OFVFOUR-7857: [SENKO USA] Container Summary on Pickup & Delivery Order form
function isCntrQtyEmpty(){
	var sheetObj = docObjects[0];
	var formObj=document.frm1;
	var cntr_info="";
	var Rows=sheetObj.LastRow() + 1;
//OFVFOUR-7857: [SENKO USA] Container Summary on Pickup & Delivery Order form
	if(Rows == 1){
		return true;
	}
	else {
		for(var i=1; i<Rows; i++){
			if(sheetObj.GetCellValue(i, "chk") == 1){
				var cntr_tpsz_cd=sheetObj.GetCellValue(i, "cntr_tpsz_cd");
				//
				if(cntr_info.indexOf(cntr_tpsz_cd) == -1){
					cntr_info += cntr_tpsz_cd + " X 1, ";
				}else{
					var arr_cntr_info=cntr_info.split(", ");
					cntr_info="";
					for(var j=0; j<arr_cntr_info.length-1; j++){
						var arr_cntr_tpsz=arr_cntr_info[j].split(" X ");
						if(arr_cntr_tpsz[0].indexOf(cntr_tpsz_cd) != -1){
							var cntr_tpsz_cnt=eval(arr_cntr_tpsz[1]) + 1;
							var addCntrStr=arr_cntr_tpsz[0] + " X " + cntr_tpsz_cnt + ", ";
							cntr_info += addCntrStr;
						}else{
							var CntrStr=arr_cntr_tpsz[0] + " X " + arr_cntr_tpsz[1] + ", ";
							cntr_info += CntrStr;
						}
					}
				}
			}
		}
	}
	if(cntr_info != ''){
		return false;
	}
	return true;
}