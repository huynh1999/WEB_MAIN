/**
 * 파일 업로드 팝업에서 목록 Reload
 */
var rtnary=new Array(2);
var callBackFunc = "";
var ready_flg = false;

var chkVals = "";

function reloadRmkList(){
	doWork('SEARCH_OFC_RMK');
}
function doWork(srcName, strFlg){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj1=docObjects[1];
    var sheetObj2=docObjects[2];
    var sheetObj3=docObjects[3];
    var sheetObj4 = docObjects[4];
    var formObj=document.frm1;
    
    switch(srcName) {
		case "SEARCH":
			//alert(formObj.s_ofc_cd.value);
			if(formObj.s_ofc_cd.value!=''){
				formObj.f_cmd.value=SEARCH;
				//검증로직
				//formObj.submit();
				submitForm(SEARCH);
			}
			else{
				//Please enter more than one Search Condition!
				alert(getLabel('FMS_COM_ALT014'));
			}
			break;
		case "SEARCH_ACCT_GL":
			formObj.f_cmd.value=SEARCHLIST01;
			formObj.f_com_cd.value = "C320";
			sheetObj.DoSearch("MDM_MCM_0053_NWGS1.clt", FormQueryString(formObj));
			break;
		case "SAVE_ACCT_GL":
			formObj.f_cmd.value=MODIFY01;
			formObj.f_com_cd.value = "C320";
			var ib_flg = sheetObj2.GetCellValue(2, "ibflag");
			if (confirm(getLabel('FMS_COM_CFMSAV'))) {
				doProcess = true;
				sheetObj.DoSave("./MDM_MCM_0053_NWGS1.clt", FormQueryString(formObj), "ibflag", false);
			}
			break;
		case "SEARCH_PRF_SHR":
			formObj.f_cmd.value=SEARCHLIST01;
			formObj.f_com_cd.value = "C321";
			sheetObj1.DoSearch("./MDM_MCM_0053_NWGS2.clt", FormQueryString(formObj));
			break;
		case "SAVE_PRF_SHR":
			formObj.f_cmd.value=MODIFY02;
			formObj.f_com_cd.value = "C321";
			if (confirm(getLabel('FMS_COM_CFMSAV'))) {
				doProcess = true;
				sheetObj1.DoSave("./MDM_MCM_0053_NWGS2.clt", FormQueryString(formObj), "ibflag", false);
			}
			break;
		case "SEARCH_ACCT_OPT":
			//alert(formObj.s_ofc_cd.value);
			//if(formObj.s_ofc_cd.value!=''){
			formObj.f_cmd.value=SEARCHLIST01;
			formObj.f_com_cd.value = "C322";
			sheetObj2.DoSearch("./MDM_MCM_0053_NWGS3.clt", FormQueryString(formObj));
			//}
			//else{
				//Please enter more than one Search Condition!
				//alert(getLabel('FMS_COM_ALT014'));
			//}
			break;
		case "SAVE_ACCT_OPT":
			formObj.f_cmd.value=MODIFY03;
			formObj.f_com_cd.value = "C322";
			var ib_flg = sheetObj2.GetCellValue(2, "ibflag");
			if (confirm(getLabel('FMS_COM_CFMSAV'))) {
				doProcess = true;
				sheetObj2.DoSave("./MDM_MCM_0053_NWGS3.clt", FormQueryString(formObj), "ibflag", false);
			}
			break;
		case "SEARCH_OFC_RMK":
			formObj.f_cmd.value=SEARCHLIST01;
			formObj.f_com_cd.value = "C323";
			sheetObj4.DoSearch("./MDM_MCM_0055_NWGS.clt", FormQueryString(formObj));
			break;
		case "SAVE_OFC_RMK":
			formObj.f_cmd.value=MODIFY04;
			formObj.f_com_cd.value = "C323";
			var ib_flg = sheetObj2.GetCellValue(2, "ibflag");
			if (confirm(getLabel('FMS_COM_CFMSAV'))) {
				doProcess = true;
				sheetObj4.DoSave("./MDM_MCM_0055_NWGS.clt", FormQueryString(formObj), "ibflag", false);
			}
			break;
		case "ADD_1":
			if (checkInpuVals()){
				if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
					//검증로직
					//useFlgChange();
					formObj.s_ofc_cd.value=formObj.i_ofc_cd.value;
					if(formObj.i_use_flg.checked){
						formObj.i_use_flg.value="Y";
					}
					else{
						formObj.i_use_flg.value="N";
					}
					if(formObj.i_company_flg.checked){
						formObj.i_company_flg.value="Y";
					}
					else{
						formObj.i_use_flg.value="N";
					}
					
					if(formObj.i_use_hbl_ser.checked){
						formObj.i_use_hbl_ser.value="Y";
					}
					else{
						formObj.i_use_hbl_ser.value="N";
					}
					
					if(formObj.i_pps_use_flg.checked){
						formObj.i_pps_use_flg.value="Y";
					}
					else{
						formObj.i_pps_use_flg.value="N";
					}
					
					if(formObj.i_ctf_use_flg.checked){
						formObj.i_ctf_use_flg.value="Y";
					}else{
						formObj.i_ctf_use_flg.value="N";
					}
					if(formObj.i_cf_use_flg.checked){
						formObj.i_cf_use_flg.value="Y";
					}else{
						formObj.i_cf_use_flg.value="N";
					}
					
					formObj.logo_square_upload_yn.value = formObj.logo_square.value;
					formObj.logo_rectangle_upload_yn.value = formObj.logo_rectangle.value;
					formObj.logo_sub_upload_yn.value = formObj.logo_sub.value;
					
					//#52013 [CLC] Stamp Watermark 기능 
					formObj.stamp_normal_upload_yn.value = formObj.stamp_normal.value;
					formObj.stamp_guarantee_upload_yn.value = formObj.stamp_guarantee.value;
					
					if(GROSS_METHOD_IN_DC == "N"){
						formObj.i_gl_agent_ap.value = formObj.i_gl_agent_ar.value;
					}
					
					formObj.f_cmd.value=ADD;
					//formObj.submit();
					frm1.show_complete.value = "Y";
					submitForm(ADD);
					//alert(getLabel('FMS_COM_NTYCOM'));
		        }
			}	
			break;
		case "MODIFY_1":
			//alert(formObj.logo_square_flg.value);
			if (checkInpuVals()){
				if(currTab == "01") {
					modifyTab1(formObj);
				} else if(currTab == "02") {
					modifyTab2(formObj);
				} else if(currTab == "03") {
					if (confirm(getLabel('FMS_COM_CFMSAV'))) {
						formObj.f_cmd.value=MODIFY03;
					}
				}
				//formObj.submit();
				frm1.show_complete.value = "Y";
				submitForm(MODIFY);
				//alert(getLabel('FMS_COM_NTYCOM'));
		        
			}
			break;
		case "SAVE":
			if(ready_flg){
				
				formObj.svr_ip.value=location.host;
				
				//#10	#52925 - [CLT] Office Code 등 콤보형식으로 지정된 항목 중 Inactive 항목에 대한 처리
				var chkCnd = $('input:checkbox[id="i_use_flg"]').prop("checked");
				
				if(!chkCnd){
					chkVals = "";
					
					doAction3();
					
					if(chkVals == "B"){
						document.frm1.i_ofc_cd.focus();
						return false;
					}					
				}
								
				doAction1();
			}			
			break;
		case "NEW":
			displayClear();
			break;
		case "EXCEL":
			if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
           break;
		case "COUNTRY_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
   	        
   	        callBackFunc = "COUNTRY_POPLIST";
   	        modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
   	        break;
		case "COUNTRY_POPLIST2"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
   	        
   	        callBackFunc = "COUNTRY_POPLIST2";
	        modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
   	        break;
		case "STATE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]=formObj.i_cnt_cd.value;
   	        
   	        callBackFunc = "STATE_POPLIST";
	        modal_center_open('./CMM_POP_0310.clt', rtnary, 610,445,"yes");
   	        break;
		case "STATE_POPLIST2"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
   	        
   	        callBackFunc = "STATE_POPLIST2";
	        modal_center_open('./CMM_POP_0310.clt', rtnary, 610,445,"yes");
   	        break;
		case "LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(4);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]="";
	   		rtnary[3]="LOC";
   	        
   	        callBackFunc = "LOCATION_POPLIST";
	        modal_center_open('./CMM_POP_0030.clt', rtnary, 806,480,"yes");
   	        break;
		case "OFFICE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
	   		rtnary[0]="1";
   	        
   	        callBackFunc = "OFFICE_POPLIST";
	        modal_center_open('./CMM_POP_0050.clt', rtnary, 556,634,"yes");
   	        break;
		case "OFFICE_POPLIST2"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
	   		rtnary[0]="1";
   	        
   	        callBackFunc = "OFFICE_POPLIST2";
	        modal_center_open('./CMM_POP_0050.clt', rtnary, 556,634,"yes");
   	        break;
		case "OFFICE_POPLIST3"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
	   		rtnary[0]="1";
   	        
   	        callBackFunc = "OFFICE_POPLIST3";
	        modal_center_open('./CMM_POP_0050.clt', rtnary, 556,634,"yes");
   	        break;
		case "OFFICE_POPLIST4"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
	   		rtnary[0]="1";
	   		
	   		callBackFunc = "OFFICE_POPLIST4";
	   		//#52918 - [BINEX] TO REVIVE DISABLED OFFICE CODE
	        modal_center_open('./CMM_POP_0050.clt?display_inactive=Y', rtnary, 556,634,"yes");
	   		break;
		case "CURRENCY_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
   	        callBackFunc = "CURRENCY_POPLIST";
	        modal_center_open('./CMM_POP_0040.clt', rtnary, 660,355,"yes");
   	        break;
		case "CURRENCY_LOCAL_POPLIST" :	//#138 Local Currency 추가
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
   	        callBackFunc = "CURRENCY_LOCAL_POPLIST";
	        modal_center_open('./CMM_POP_0040.clt', rtnary, 660,355,"yes");
			break;
			
		// #1435 - [PATENT] 0215_20 DEPOSIT/PAYMENT MULTI CURRENCY LIQUIDATION
		case "JNR_CURR_POPLIST1" : 
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
   	        callBackFunc = "JNR_CURR_POPLIST1";
	        modal_center_open('./CMM_POP_0040.clt', rtnary, 660,355,"yes");
			break;
		case "JNR_CURR_POPLIST2" : 
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
   	        callBackFunc = "JNR_CURR_POPLIST2";
	        modal_center_open('./CMM_POP_0040.clt', rtnary, 660,355,"yes");
			break;
		case "JNR_CURR_POPLIST3" : 
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
   	        callBackFunc = "JNR_CURR_POPLIST3";
	        modal_center_open('./CMM_POP_0040.clt', rtnary, 660,355,"yes");
			break;
		case "JNR_CURR_POPLIST4" : 
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
   	        callBackFunc = "JNR_CURR_POPLIST4";
	        modal_center_open('./CMM_POP_0040.clt', rtnary, 660,355,"yes");
			break;
		case "JNR_CURR_POPLIST5" : 
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
   	        callBackFunc = "JNR_CURR_POPLIST5";
	        modal_center_open('./CMM_POP_0040.clt', rtnary, 660,355,"yes");
			break;
			
		case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
		   	rtnary[1]="";
		   	rtnary[2]=window;
	   	    
	   	    callBackFunc = "LINER_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt??callTp=LN', rtnary, 1150,650,"yes");
	   	    break;
	   case "PPS_PAYTO_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
//		   	rtnary[1]=strFlg;
		   	rtnary[1]="";
		   	rtnary[2]=window;
	   	    
	   	    callBackFunc = "PPS_PAYTO_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt??callTp=LN', rtnary, 1150,650,"yes");
	   	    break;
	   case "PPS_PAYTO_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
		   	rtnary[1]=strFlg;
		   	rtnary[2]=window;
	   	    
	   	    callBackFunc = "PPS_PAYTO_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt??callTp=LN', rtnary, 1150,650,"yes");
	   	    break;
	   	    
	   case "CTF_PAYTO_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
//		   	rtnary[1]=strFlg;
		   	rtnary[1]="";
		   	rtnary[2]=window;
	   	    
	   	    callBackFunc = "CTF_PAYTO_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt??callTp=LN', rtnary, 1150,650,"yes");
	   	    break;
	   case "CTF_PAYTO_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
		   	rtnary[1]=strFlg;
		   	rtnary[2]=window;
	   	    
	   	    callBackFunc = "CTF_PAYTO_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt??callTp=LN', rtnary, 1150,650,"yes");
	   	    break;
	   case "CF_PAYTO_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
//		   	rtnary[1]=strFlg;
		   	rtnary[1]="";
		   	rtnary[2]=window;
	   	    
	   	    callBackFunc = "CF_PAYTO_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt??callTp=LN', rtnary, 1150,650,"yes");
	   	    break;
	   case "CF_PAYTO_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
		   	rtnary[1]=strFlg;
		   	rtnary[2]=window;
	   	    
	   	    callBackFunc = "CF_PAYTO_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt??callTp=LN', rtnary, 1150,650,"yes");
	   	    break;	    
	   /* jsjang 2013.7.23 요구 #16904 - OEH BL Print Remark Start */
       case "SEARCH_DE":	//DEPARTMENT 조회
	 	   if(frm1.s_ofc_cd.value!='NA'){
		   	   //BL REMARK 조회
	 		   //loadPage();	 		   
	 	   	   searchGrid(4);
	 	   }
	       break;	
  	   case "DEL":
	  	   if ( !fncGridCheck() ) return false;
	   	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
				frm1.f_cmd.value=COMMAND03;
	 			docObjects[0].DoAllSave("./MDM_MCM_0051GS.clt", FormQueryString(frm1), true);
	 			//#1782 [CLA DEMO] OCEAN EXPORT HB/L REMARK DELETE AND DEFAULT SETTING ISSUE
	 			setTimeout('reloadRmkList()', 1000);
	   	   }	
	   	   break;
  	 	case "REMARK":	//OEH REMARK 팝업
	  	 	if(frm1.s_ofc_cd.value == null || frm1.s_ofc_cd.value == '')
	  	 	{
	  	 		alert(getLabel('MDM_COM_ALT012'));
	  	 		return false;
	  	 	}
	 		//var reqParam = '?rmk_cd='+docObjects[0].CellValue(docObjects[0].SelectRow, "rmk_cd");
	 		var reqParam='?s_ofc_cd='+frm1.s_ofc_cd.value;
	    		reqParam += '&openMean=SEARCH01';
		   		popGET('./MDM_MCM_0150.clt'+reqParam, 'seeShipDoc', 806, 300, "scroll:no;status:no;help:no;");
       			//var reqParam = '?intg_bl_seq='+frm1.intg_bl_seq.value;
       			//reqParam += '&openMean=SEARCH01';
      	   		//popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");		   		
		   	break;   	   
   	   /* jsjang 2013.7.23 요구 #16904 - OEH BL Print Remark End */
  	 	case "SEARCH_RPT":
			formObj.f_cmd.value = SEARCH01;
			sheetObj1.DoSearch("ReportMngGS.clt", FormQueryString(formObj) );
			break;	
  	 	case "SAVE_RPT":
			formObj.f_cmd.value = COMMAND01;
			if(confirm(getLabel('FMS_COM_CFMCON'))){
				sheetObj1.DoSave("ReportMngGS.clt", FormQueryString(formObj),"ibflag",false);
			}
			break;
  	 	case "ROWADD_RPT":
			var intRows = sheetObj1.LastRow() + 1;
			sheetObj1.DataInsert(intRows);
			break;	
    }
}

function COUNTRY_POPLIST(rtnVal){
  	var formObj=document.frm1;
    if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
	 	return;
	}
        else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_cnt_cd.value=rtnValAry[0];//cd_val
		formObj.i_cnt_nm.value=rtnValAry[1];//cd_nm
	}
}
function COUNTRY_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_aes_cnt_cd.value=rtnValAry[0];//cd_val
	}
}
function STATE_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_state_cd.value=rtnValAry[0];//cd_val
		formObj.i_state_nm.value=rtnValAry[1];//cd_nm
	}
}
function STATE_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_aes_state_cd.value=rtnValAry[0];//cd_val
	}
}

function LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_loc_cd.value=rtnValAry[0];
		formObj.i_loc_nm.value=rtnValAry[2];
	} 
}

function OFFICE_POPLIST(rtnVal){
	var formObj=document.frm1;
	if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_prnt_ofc_cd.value=rtnValAry[0];
		formObj.i_prnt_ofc_nm.value=rtnValAry[1];
	}
}

function OFFICE_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_sls_ofc_cd.value=rtnValAry[0];
		formObj.i_sls_ofc_nm.value=rtnValAry[1];
	}
}
function OFFICE_POPLIST3(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_finc_ofc_cd.value=rtnValAry[0];
		formObj.i_finc_ofc_nm.value=rtnValAry[1];
	}
}

function OFFICE_POPLIST4(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
		else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_ofc_cd.value=rtnValAry[0];
		formObj.s_ofc_nm.value=rtnValAry[1];
		doWork('SEARCH');
	}
}

function CURRENCY_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_trf_cur_cd.value=rtnValAry[0];//cd_val
	}
}

//#138 Local Currency 추가
function CURRENCY_LOCAL_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_locl_cur_cd.value=rtnValAry[0];//cd_val
	}
}
// #1435 - [PATENT] 0215_20 DEPOSIT/PAYMENT MULTI CURRENCY LIQUIDATION
function JNR_CURR_POPLIST1(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_jnr_dflt_curr_cd1.value=rtnValAry[0];//cd_val
	}
}

function JNR_CURR_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_jnr_dflt_curr_cd2.value=rtnValAry[0];//cd_val
	}
}

function JNR_CURR_POPLIST3(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_jnr_dflt_curr_cd3.value=rtnValAry[0];//cd_val
	}
}

function JNR_CURR_POPLIST4(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_jnr_dflt_curr_cd4.value=rtnValAry[0];//cd_val
	}
}

function JNR_CURR_POPLIST5(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_jnr_dflt_curr_cd5.value=rtnValAry[0];//cd_val
	}
}

function LINER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	    else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_trdp_cd.value=rtnValAry[0];
		formObj.i_trdp_nm.value=rtnValAry[2];
	}
}

function PPS_PAYTO_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	    else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_pps_payto_trdp_cd.value=rtnValAry[0];
		formObj.i_pps_payto_trdp_nm.value=rtnValAry[2];
	}
}
function CTF_PAYTO_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	    else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_ctf_payto_trdp_cd.value=rtnValAry[0];
		formObj.i_ctf_payto_trdp_nm.value=rtnValAry[2];
	}
}
function CF_PAYTO_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	    else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_cf_payto_trdp_cd.value=rtnValAry[0];
		formObj.i_cf_payto_trdp_nm.value=rtnValAry[2];
	}
}

function searchGrid(gridIdx){
	switch(gridIdx){
		/* jsjang 2013.7.23 요구 #16904 - OEH BL Print Remark */
		case 1:
			//OEH REMARK GRID 조회
			document.frm1.f_cmd.value=SEARCHLIST08;
			//alert(document.frm1.f_cmd.value);
			//loadPage();
//			#1782 [CLA DEMO] OCEAN EXPORT HB/L REMARK DELETE AND DEFAULT SETTING ISSUE
			docObjects[3].RemoveAll();
			docObjects[3].DoSearch("./MDM_MCM_0051GS.clt", FormQueryString(document.frm1) );
		break;
	}
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
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
var isRun = true;
function loadPage() {
	var opt_key = "GROSS_METHOD_IN_DC";
	ajaxSendPost(setGrossMethodInDcReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	for(var i=0;isRun && i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        //alert(SYSTEM_FIS);
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        //alert("121212");
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
        if(i == docObjects.length - 1){
        	isRun = false;
        }
    }
	
    /* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
    goTabSelect(frm1.f_isNumSep.value); 
    if(frm1.i_company_flg.value == "Y") {
    	document.getElementById('active_company').style.disabled = false;
		document.getElementById('i_prnt_ofc_cd').disabled = true;
		document.getElementById('btnParentOfc').disabled = true;
		frm1.i_use_flg.checked = true;
    }
    //
    
    checkStsSet();
	checkNoMbl();
//	checkCreHblFlg();
	checkPrnCreInv();
	checkInvApro();
	checkCsrApro();
	//activeNxtStep();
    doWork('SEARCHLIST');
    if(frm1.s_ofc_cd.value!=''){
    	checkBoxSetting();
    	selectBoxSetting();
    }else{
    	frm1.i_use_flg.checked=true;
    	frm1.i_pps_use_flg.checked=true;
    	frm1.i_ctf_use_flg.checked=true;
    	frm1.i_cf_use_flg.checked=true;
    }
    
    //44406
    if(frm1.i_use_hbl_ser.value=="Y"){
    	frm1.i_use_hbl_ser.checked=true;
    } else {
    	frm1.i_use_hbl_ser.checked=false;
    }
    
    
    if(frm1.i_ofc_cd.value != ""){
    	frm1.i_ofc_cd.className='search_form-disable';
    	frm1.i_ofc_cd.readOnly=true;
    }	
    if (frm1.i_it_next_no.value != "" && frm1.i_it_next_no.value.length == 11){
    	frm1.i_it_next_no.value=frm1.i_it_next_no.value.replaceAll(".","").substr(0,8);
    }
    
    if (frm1.logo_square_yn.value != "") {
	   getObj('logo_square_id').style.display="inline";
	   frm1.logo_square_flg.style.display="inline";
	   frm1.logo_square_chk.style.display="inline";
   } else {
	   getObj('logo_square_id').style.display="none";
	   frm1.logo_square_flg.style.display="none";
	   frm1.logo_square_chk.style.display="none";
   }
   
    if (frm1.logo_rectangle_yn.value != "") {
	   getObj('logo_rec_id').style.display="inline";
	   frm1.logo_rec_flg.style.display="inline";
	   frm1.logo_rec_chk.style.display="inline";
   } else {
	   getObj('logo_rec_id').style.display="none";
	   frm1.logo_rec_flg.style.display="none";
	   frm1.logo_rec_chk.style.display="none";
   }
   
   if (frm1.logo_sub_yn.value != "") {
	   getObj('logo_sub_id').style.display="inline";
	   frm1.logo_sub_flg.style.display="inline";
	   frm1.logo_sub_chk.style.display="inline";
   } else {
	   getObj('logo_sub_id').style.display="none";
	   frm1.logo_sub_flg.style.display="none";
	   frm1.logo_sub_chk.style.display="none";
   }
   
   //#52013 [CLC] Stamp Watermark 기능 
   if (frm1.stamp_normal_yn.value != "") {
	   getObj('stamp_normal_id').style.display="inline";
	  /* frm1.stamp_normal_flg.style.display="inline";
	   frm1.stamp_normal_chk.style.display="inline";*/
   } else {
	   getObj('stamp_normal_id').style.display="none";
	   /*frm1.stamp_normal_flg.style.display="none";
	   frm1.stamp_normal_chk.style.display="none";*/
   }
   
   if (frm1.stamp_guarantee_yn.value != "") {
	   getObj('stamp_guarantee_id').style.display="inline";
	   frm1.stamp_guarantee_flg.style.display="inline";
	   frm1.stamp_guarantee_chk.style.display="inline";
   } else {
	   getObj('stamp_guarantee_id').style.display="none";
	   frm1.stamp_guarantee_flg.style.display="none";
	   frm1.stamp_guarantee_chk.style.display="none";
   }
   
   
   if (frm1.i_vat_rt_dp_cnt.value == "") {
	   frm1.i_vat_rt_dp_cnt.value = "0";
   }

   if (frm1.i_xch_rt_dp_cnt.value == "") {
	   frm1.i_xch_rt_dp_cnt.value = "4";
   }
   
   /*getObj('prfx_modify').style.display="inline";*/
   
   if(GROSS_METHOD_IN_DC == "N"){
	   getObj("tr_credit").style.display="none";
	   getObj("th_debit_note").innerHTML = th_debit_note;
   }
   //2017-02-08 요청
   /*if (frm1.f_role_cd.value == 'Master') {
	   mTab.style.display="inline";
	} else {
		mTab.style.display="none";
	}*/

   //setPrefixSeqReadonly(true);
   ready_flg = true;
   
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++] = sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         //OEH Remark 그리드        
	    case 1:
	        with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('MDM_MCM_0053_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);
	
	        var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	               {Type:"Text",      Hidden:1,  Width:340,    Align:"left",  ColMerge:1,   SaveName:"acct_gl_id",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:250,    Align:"left",  ColMerge:1,   SaveName:"acct_gl_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Combo",      Hidden:0, Width:50,   Align:"left",  ColMerge:1,   SaveName:"acct_gl_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"modi_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	         
	        InitColumns(cols);
	
	        SetCountPosition(0);
	        SetEditable(1);
	        SetSheetHeight(250);
	        sheetObj.SetColProperty("acct_gl_cd", {ComboText:GL_CODE_1, ComboCode:GL_CODE_2} );
	       }                                                      
	    break;
	     case 2:
	         with (sheetObj) {
	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	         var headers = [ { Text:getLabel('MDM_MCM_0053_HDR2'), Align:"Center"} ];
	         InitHeaders(headers, info);
	
	         var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	                {Type:"Text",      Hidden:1,  Width:210,    Align:"left",  ColMerge:1,   SaveName:"dc_pfit_shr_id",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:210,    Align:"left",  ColMerge:1,   SaveName:"dc_pfit_shr_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Combo",      Hidden:0, Width:90,   Align:"left",  ColMerge:1,   SaveName:"pfit_shr_frt_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                {Type:"Float",      Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"mbl_pfit_shr_pct",      KeyField:0,   CalcLogic:"", EditLen:3,        PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	                {Type:"Float",      Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"hbl_pfit_shr_pct",      KeyField:0,   CalcLogic:"",  EditLen:3,          PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	                {Type:"Text",      Hidden:1,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"modi_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	          
	         InitColumns(cols);
	
	         SetCountPosition(0);
	         SetEditable(1);
	         SetSheetHeight(250);
	         sheetObj.SetColProperty("pfit_shr_frt_cd", {ComboText:FRT_CODE_1, ComboCode:FRT_CODE_2} );
	        }                                                      
	     break;
	     case 3:
	         with (sheetObj) {
	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	         var headers = [ { Text:getLabel('MDM_MCM_0053_HDR3'), Align:"Center"} ];
	         InitHeaders(headers, info);
	
	         var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	                {Type:"Text",      Hidden:1,  Width:340,    Align:"left",  ColMerge:1,   SaveName:"acct_opt_id",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:300,    Align:"left",  ColMerge:1,   SaveName:"acct_opt_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Combo",      Hidden:0, Width:50,   Align:"left",  ColMerge:1,   SaveName:"acct_opt_bss",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                {Type:"Text",      Hidden:1,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"modi_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	          
	         InitColumns(cols);
	
	         SetCountPosition(0);
	         SetEditable(1);
	         SetSheetHeight(250);
	         sheetObj.SetColProperty("acct_opt_bss", {ComboText:PST_DT_1, ComboCode:PST_DT_2} );
	        }                                                      
	     break;
	     case 4:
             with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('MDM_MCM_0054_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
                    {Type:"Text",      Hidden:0,  Width:450,    Align:"Center",  ColMerge:1,   SaveName:"doc_id",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0, Width:350,   Align:"Center",  ColMerge:1,   SaveName:"rule_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:350,  Align:"Left",    ColMerge:1,   SaveName:"pfx",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:210,  Align:"Left",    ColMerge:1,   SaveName:"seq_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:210,  Align:"Left",    ColMerge:1,   SaveName:"seq_no_len",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:1,  Width:0,   Align:"Center",    ColMerge:1,   SaveName:"use_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
              
             InitColumns(cols);

             var height = $(window).height();

             SetCountPosition(0);
             SetEditable(1);
             SetSheetHeight(height - 200);
            }                                                      
         break; 
         case 5:
             with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('MDM_MCM_0055_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"rmk_ibflag" },
                    {Type:"Text",      Hidden:1,  Width:400,    Align:"Center",  ColMerge:1,   SaveName:"rmk_id",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:400,    Align:"Left",  ColMerge:1,   SaveName:"rmk_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0, Width:400,   Align:"Left",  ColMerge:1,   SaveName:"rmk_txt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"font_sz",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:1,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"modi_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
              
             InitColumns(cols);

             SetCountPosition(0);
             var height = $(window).height();
             SetEditable(1);
             SetSheetHeight(height - 200);
            }                                                      
         break; 
         case 6:
             with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, FrozenCol:0 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('RPTMNG_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             // Hidden:0 ->화면에 보이는것 , Hidden:1 -> 화면에 안보이는것 
             var cols = [ {Type:"DelCheck", Hidden:0, Width:60, Align:"Center", ColMerge:0, SaveName:"curSelec" },
                          {Type:"Status", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"ibflag" },
                          {Type:"Popup", Hidden:0, Width:200, Align:"Left", ColMerge:0, SaveName:"mrd_key", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:1 },
                          {Type:"Text", Hidden:0, Width:300, Align:"Left", ColMerge:0, SaveName:"mrd", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1 },
                          {Type:"Text", Hidden:0, Width:100, Align:"Left", ColMerge:0, SaveName:"path", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"CheckBox", Hidden:1, Width:100, Align:"Left", ColMerge:0, SaveName:"ltr_dflt", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"CheckBox", Hidden:1, Width:100, Align:"Left", ColMerge:0, SaveName:"a4_en_dflt", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"CheckBox", Hidden:1, Width:100, Align:"Left", ColMerge:0, SaveName:"a4_zh_dflt", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"CheckBox", Hidden:1, Width:100, Align:"Left", ColMerge:0, SaveName:"a4_ja_dflt", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"Text", Hidden:0, Width:200, Align:"Left", ColMerge:0, SaveName:"pgm_id", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"Text", Hidden:0, Width:300, Align:"Left", ColMerge:0, SaveName:"rpt_desc", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 }
      	              ];
              
                 InitColumns(cols);
                 var height = $(window).height();
                 SetEditable(1);
                 SetSheetHeight(height - 200);
             }                                                       
         break; 
     }
}

function sheetOfficeReport_OnPopupClick(sheetObj, row, col){
	cur_row = row;
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	//GLCODE POPUP을 호출한다.
	rtnary = new Array();
	rtnary[0] = row;
	callBackFunc = "sheetOfficeReport_OnPopupClick_setMrdKey";
	modal_center_open('./MDM_MCM_0058_Pop.clt?sheetObj='+sheetObj+'&row='+row, rtnary, 750,495,"yes");
}
function sheetOfficeReport_OnPopupClick_setMrdKey(){
	
}
function displayClear() {
	var formObj=document.frm1;
	formObj.s_ofc_cd.value="";
	formObj.s_ofc_nm.value="";
	//formObj.s_use_flg.value = "";
	formObj.i_ofc_cd.value="";
	formObj.i_cnt_cd.value="";
	formObj.i_cnt_nm.value="";
	formObj.i_ofc_eng_nm.value="";
	formObj.i_ofc_zip.value="";
	formObj.i_ofc_addr.value="";
	formObj.i_ofc_phn.value="";
	formObj.i_ofc_fax.value="";
	//formObj.i_trdp_cd.value = "";
	formObj.i_prnt_ofc_cd.value="";
	formObj.i_prnt_ofc_nm.value="";
	formObj.i_loc_cd.value = "";
	formObj.i_loc_nm.value = "";
	formObj.i_descr.value="";
	formObj.i_use_flg.checked=true;
	formObj.i_company_flg.checked=false;
	document.getElementById('i_prnt_ofc_cd').disabled = false;
	document.getElementById('btnParentOfc').disabled = false;
	formObj.i_finc_ofc_cd.value="";
	formObj.i_finc_ofc_nm.value="";
	formObj.i_sls_ofc_cd.value="";
	formObj.i_sls_ofc_nm.value="";
	formObj.i_trf_cur_cd.value="";
	formObj.i_locl_cur_cd.value=""; //#138 Local Currency 추가
	formObj.i_state_cd.value="";
	formObj.i_state_nm.value="";
	formObj.i_ofc_locl_nm.value="";
	formObj.i_ofc_email.value="";
	formObj.i_ofc_url.value="";
	formObj.i_iata_cd.value="";
	formObj.i_fmc_no.value="";
	formObj.i_tax_type.value="D";
	formObj.i_tax_no.value="";
	
	//ACE Setup
	formObj.i_aes_cntc_nm.value="";
	formObj.i_aes_addr.value="";
	formObj.i_aes_city.value="";
	formObj.i_aes_state_cd.value="";
	formObj.i_aes_zip.value="";
	formObj.i_aes_cnt_cd.value="";
	formObj.i_aes_rspn_email.value="";
	formObj.i_aes_prt_type.value="";
	//IT Number
	formObj.i_it_next_no.value="";
	formObj.i_it_end.value="";
	//Unit
	formObj.i_oth_wgt_ut_cd.value="KG";
	formObj.i_oth_meas_ut_cd.value="SCN";
	formObj.i_oth_size_ut_cd.value="CM";
	//
	
	
	
	/*formObj.i_air_body.value="";
	formObj.i_aem_hand_info.value="";
	formObj.i_aeh_hand_info.value="";
	formObj.i_dflt_an_memo.value="";
	formObj.i_dock_rcpt_rmk.value="";
	formObj.i_email_sign.value="";
	formObj.i_oi_cgor_pic_info.value = "";
	formObj.i_ai_cgor_pic_info.value = "";
*/	//Cargo Control Number (Canada Only)
	formObj.i_ccn_prfx.value = "";
	formObj.i_oi_ccn_seqno.value = "";
	formObj.i_ai_ccn_seqno.value = "";
	//Ocean Pierpass-Clean Truck Fee-Chassis Fee
	formObj.i_pps_use_flg.checked=true;
	formObj.i_ctf_use_flg.checked=true;
	formObj.i_cf_use_flg.checked=true;
	formObj.i_pps_payto_trdp_cd.value = "";
	formObj.i_pps_payto_trdp_nm.value = "";
	formObj.i_ctf_payto_trdp_cd.value = "";
	formObj.i_ctf_payto_trdp_nm.value = "";
	formObj.i_cf_payto_trdp_cd.value = "";
	formObj.i_cf_payto_trdp_nm.value = "";
	formObj.i_pps_cntr20_rt.value = "";
	formObj.i_pps_cntr40_rt.value = "";
	formObj.i_pps_cbm_rt.value = "";
	formObj.i_ctf_cntr20_rt.value = "";
	formObj.i_ctf_cntr40_rt.value = "";
	formObj.i_ctf_cbm_rt.value = "";
	formObj.i_cf_cntr20_rt.value = "";
	formObj.i_cf_cntr40_rt.value = "";
	formObj.i_cf_cbm_rt.value = "";
	

	//#52300
	formObj.i_time_zone.value="";
	
	formObj.i_ofc_cd.className='search_form';
	formObj.i_ofc_cd.readOnly=false;
	
	formObj.i_ofc_rep_nm.value="";
	
	formObj.logo_square.outerHTML="<input type='file' name='logo_square' class='search_form' size='25'/>";
	//formObj.set_type_logo1.value="";
	if(formObj.logo_square_yn.value != '')
	{
		getObj('logo_square_id').style.display='none';
		formObj.logo_square_flg.style.display='none';
		formObj.logo_square_chk.style.display='none';
	}
	formObj.logo_square_yn.value="";
	formObj.logo_rectangle.outerHTML="<input type='file' name='logo_rectangle' class='search_form' size='25'/>";
	//formObj.set_type_logo2.value="";
	if(formObj.logo_rectangle_yn.value != '')
	{
		getObj('logo_rec_id').style.display='none';
		formObj.logo_rec_flg.style.display='none';
		formObj.logo_rec_chk.style.display='none';
	}
	formObj.logo_rectangle_yn.value="";
	formObj.logo_sub.outerHTML="<input type='file' name='logo_sub' class='search_form' size='25'/>";
	//formObj.set_type_logo3.value="";
	//formObj.logo_sub_flg.checked 	= false;
	if(formObj.logo_sub_yn.value != '')
	{
		getObj('logo_sub_id').style.display='none';
		formObj.logo_sub_flg.style.display='none';
		formObj.logo_sub_chk.style.display='none';
	}	
	formObj.logo_sub_yn.value="";
	
	//#52013 [CLC] Stamp Watermark 기능 
	formObj.stamp_normal.outerHTML="<input type='file' name='stamp_normal' class='search_form' size='25'/>"; 
	if(formObj.stamp_normal_yn.value != '')
	{
		getObj('stamp_normal_id').style.display='none';
		//formObj.stamp_normal_flg.style.display='none';
		//formObj.stamp_normal_chk.style.display='none';
	}	
	formObj.stamp_normal_yn.value="";
	
	formObj.stamp_guarantee.outerHTML="<input type='file' name='stamp_guarantee' class='search_form' size='25'/>"; 
	if(formObj.stamp_guarantee_yn.value != '')
	{
		getObj('stamp_guarantee_id').style.display='none';
		formObj.stamp_guarantee_flg.style.display='none';
		formObj.stamp_guarantee_chk.style.display='none';
	}	
	formObj.stamp_guarantee_yn.value="";
	
	formObj.i_tsa_sec_no.value = "";
	formObj.i_use_hbl_ser.value = "";
	formObj.i_use_hbl_ser.checked = false;
	/* jsjang 2013.07.30 #16393 Company, C-TPAT Logo Outgoing End */
	
	formObj.i_rvn_bank_seq.value = "";
	formObj.i_cost_bank_seq.value = "";	
	
	/*formObj.i_prfx_modify_flg.checked = false;
	formObj.i_prfx_modify_flg.value="N";*/
	
	// WMS 고도화
	formObj.i_wh_sto_acc_cd.value = "";	
	
	//#1322 [CLT] Office Code화면 Prefix - 읽기전용 상태표시 오류
	//formObj.i_nip.value = "";
	//formObj.i_vat_id_ue.value = "";

	formObj.i_vat_rt_dp_cnt.value = "";
	formObj.i_xch_rt_dp_cnt.value = "";
	
	//#1441 [PATENT] 0215_28 CONTAINER LOAD PLAN (CONSOLE)
	/*formObj.i_clp_doc_prfx.value="";
	formObj.i_clp_doc_seq_no.value="";*/
	
	//Office Report 탭 clear
	//formObj.i_rpt_tp_cd.value = "LTR_DFLT";
	docObjects[1].RemoveAll();
	
	
	docObjects[0].RemoveAll();
	//STS_SET
	formObj.st_step_sts_set[0].checked = false;
	formObj.st_step_sts_set[1].checked = false;
	formObj.st_step_sts_set[2].checked = false;
	formObj.next_step_bk_cf.checked = false;
	formObj.i_sts_set.checked = false;
	//NO_MBL
	formObj.hbl_crt_wt_mbl.checked = false;
	formObj.crt_inv_hbl.checked = false;
	//CRE_HBL_FLG
	formObj.hbl_creation.checked = false;
	//PRN_CRE_INV
	formObj.crt_inv_by_clk_prt.checked = false;
	//INV_APRO
	//formObj.i_inv_apro.checked = false;
	formObj.st_inv_apro[0].checked = false;
	formObj.st_inv_apro[1].checked = false;
	formObj.nd_inv_apro[0].checked = false;
	formObj.nd_inv_apro[1].checked = false;
	//CSR_APRO
	formObj.st_csr_apro[0].checked = false;
	formObj.st_csr_apro[1].checked = false;
	//formObj.i_csr_apro.checked = false;
	//Auto Calculating
	formObj.i_kgs_lbs_auto_calc[0].checked = true;
	//Decimal Place and Round
	formObj.i_air_grs_wgt_dcm_plc.value = "0";
	formObj.i_air_grs_wgt_rnd.value = "";
	formObj.i_air_vol_wgt_dcm_plc.value = "0";
	formObj.i_air_vol_wgt_rnd.value = "";
	formObj.i_air_chg_wgt_dcm_plc.value = "0";
	formObj.i_air_chg_wgt_rnd.value = "";
	formObj.i_sea_grs_wgt_dcm_plc.value = "0";
	formObj.i_sea_grs_wgt_rnd.value = "";
	formObj.i_sea_vol_wgt_dcm_plc.value = "0";
	formObj.i_sea_vol_wgt_rnd.value = "";
	
	//setPrefixSeqReadonly(true);
}
/**
 * 콤보 조회
 */
function doAction1(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var i_ofc_cd=formObj.i_ofc_cd.value;
	if ( !fncInputCheck() ) return;
	ajaxSendPost(dispAjaxReq1, 'reqVal', '&goWhere=aj&bcKey=searchOfficeCode&s_ofc_cd='+i_ofc_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq1(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			doWork("MODIFY_1");
		} else {
			doWork("ADD_1");
		}	
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
/**
 * 콤보 조회
 */
function doAction2(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var i_trdp_cd=formObj.i_trdp_cd.value;
	var i_ofc_cd=formObj.i_ofc_cd.value;
//	alert(1111111111111);
	if ( formObj.i_ofc_cd.value == "" || formObj.i_ofc_cd.value == null ) {
		//Please enter a [Office Code]!
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_OFFICE_CD'));
		formObj.i_trdp_cd.value="";
		formObj.i_trdp_nm.value="";
		formObj.i_ofc_cd.focus();
		return false;
	}
	ajaxSendPost(dispAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchOfficePartnerCode&s_trdp_cd='+i_trdp_cd+'&s_ofc_cd='+i_ofc_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq2(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);  
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//Please change the [Partner Code]!
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_TRPT') + "\n\n: MDM_MCM_0050.634");
			formObj.i_trdp_cd.value="";
			formObj.i_trdp_nm.value="";
			formObj.i_ofc_cd.focus();
			return false;
		}	
	}
}

/**
 * Office Code Inactive 시 User 존재 여부 확인
 * #52925 - [CLT] Office Code 등 콤보형식으로 지정된 항목 중 Inactive 항목에 대한 처리
 */
function doAction3(){
	var formObj=document.frm1;
	var i_ofc_cd=formObj.i_ofc_cd.value;	
	ajaxSendPost(dispAjaxReq3, 'reqVal', '&goWhere=aj&bcKey=searchOfficePartnerCodeUseYn&s_ofc_cd='+i_ofc_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq3(reqVal){
	
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);  
	var targetFr='mainFrame';
	var chkVal = "";
	
	if(doc[0]=='OK'){
		
		var chkVal = doc[1];
		
		if(chkVal > 0){ //현재 지정된 ofc_cd 코드를 사용하는 user가 있는지 체크
			$('input:checkbox[id="i_use_flg"]').attr("checked", true); //단일건
			//There are user(s) assigned to this Office Code. Please change their Office information before disable Office Code. 
			alert(getLabel('FMS_COM_IS_USER'));			
			chkVals = "B";			
			return false;
		}	
	}
	
	
		
}


function useFlgChange() {
	var formObj=document.frm1;
	if ( formObj.i_use_flg.checked == true ) {
		formObj.i_use_flg.value="Y";
	} else if ( formObj.i_use_flg.checked == false ) {
		formObj.i_use_flg.value="N";
	}
	formObj.i_ofc_cd.disabled=false;
}
function fncOfficeSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function convertItType(str){
	var cnvVal=str.substring(0,3).concat('.').concat(str.substring(3,6)).concat('.').concat(str.substring(6,9));
	return cnvVal;
}
function fncInputCheck() {
	var formObj=document.frm1;
	// IT Num Check
	// IT_NEXT_NUMBER, IT_END_NUMBER 각각 8자리어야 한다.
	var itNextNumber=formObj.i_it_next_no.value;
	var itEndNumber=formObj.i_it_end.value;
	// 두 값이 존재하지 않으면 체크하지 않는다
	if (itNextNumber.length != 0 || itEndNumber.length != 0) {
		if (itNextNumber.length != 0 && itNextNumber.length != 8){
			alert(getLabel('MDM_COM_ALT006') + "\n\n: MDM_MCM_0050.720");	
			document.frm1.i_it_next_no.focus();
			return false;
		}
		if (itEndNumber.length != 0 && itEndNumber.length != 8){
			alert(getLabel('MDM_COM_ALT007') + "\n\n: MDM_MCM_0050.726");	
			document.frm1.i_it_end.focus();
			return false;
		}
		// NEXT < END이어야 한다 
		if (Number(itNextNumber) >= Number(itEndNumber)) {
			alert(getLabel('MDM_COM_ALT005') + "\n\n: MDM_MCM_0050.744");	
			document.frm1.i_it_next_no.focus();
			return false;
		}
		// IT 양쪽값이 입력되어있는지 체크
		if (itNextNumber.length == 0 ^ itEndNumber.length == 0){
			alert(getLabel('MDM_COM_ALT008') + "\n\n: MDM_MCM_0050.726");	
			document.frm1.i_it_next_no.focus();
			return false;
		}
		// 모든값이 정상이면 9자리로 변환후 comma추가
		var next9=String(itNextNumber) + (Number(itNextNumber)%7);
		frm1.i_9_it_next_no.value=convertItType(next9);
	}
	if(formObj.i_ofc_cd.value.length < 2){
		alert(getLabel('MDM_COM_ALT010') + "\n - " + getLabel('ITM_OFFICE_CD'));	
		formObj.i_ofc_cd.focus();
    	return false;
	}
	//#1296 [CLT]Office Code 의 Report Type 필수입력처리
	/*if(formObj.i_rpt_tp_cd.value == ""){
		alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_RPTT'));	
		formObj.i_rpt_tp_cd.focus();
    	return false;
	}*/
	if(formObj.i_ofc_eng_nm.value.length < 3){
		alert(getLabel('MDM_COM_ALT010') + "\n - " + getLabel('ENG_NM'));	
		formObj.i_ofc_eng_nm.focus();
    	return false;
	}
	
	if(formObj.i_time_zone.value == ""){
		alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_TMZN'));	
		formObj.i_time_zone.focus();
    	return false;
	}
	
	return true;
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	
	var formObj=document.frm1;
	
	ctlKind=obj;
	if ( obj.value != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}else{
		if(str == "office"){
			if(obj.name == "s_ofc_cd"){
				formObj.s_ofc_cd.value = "";
				formObj.s_ofc_nm.value = "";
			}else if(obj.name == "i_prnt_ofc_cd"){
				formObj.i_prnt_ofc_cd.value = "";
				formObj.i_prnt_ofc_nm.value = "";
			}else if(obj.name == "i_sls_ofc_cd"){
				formObj.i_sls_ofc_cd.value = "";
				formObj.i_sls_ofc_nm.value = "";
			}else if(obj.name == "i_finc_ofc_cd"){
				formObj.i_finc_ofc_cd.value = "";
				formObj.i_finc_ofc_nm.value = "";
			}
		}else if(str == "country"){
			formObj.i_cnt_cd.value = "";
			formObj.i_cnt_nm.value = "";
		}else if(str == "state"){
			formObj.i_state_cd.value = "";
			formObj.i_state_nm.value = "";
		}else if(str == "location"){
			formObj.i_loc_cd.value = "";
			formObj.i_loc_nm.value = "";
		}else if(str == "trdpcode"){
			if(obj.name == "i_pps_payto_trdp_cd"){
				formObj.i_pps_payto_trdp_cd.value = "";
				formObj.i_pps_payto_trdp_nm.value = "";
			}else if(obj.name == "i_ctf_payto_trdp_cd"){
				formObj.i_ctf_payto_trdp_cd.value = "";
				formObj.i_ctf_payto_trdp_nm.value = "";
			}else if(obj.name == "i_cf_payto_trdp_cd"){
				formObj.i_cf_payto_trdp_cd.value = "";
				formObj.i_cf_payto_trdp_nm.value = "";
			}
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
			if(CODETYPE =="trdpcode"){
				if ( ctlKind == formObj.i_pps_payto_trdp_cd ) {
					formObj.i_pps_payto_trdp_cd.value=masterVals[0];//state_cd
					formObj.i_pps_payto_trdp_nm.value=masterVals[3];//state_locl_nm
				}else if( ctlKind == formObj.i_ctf_payto_trdp_cd ){
					formObj.i_ctf_payto_trdp_cd.value=masterVals[0];//state_cd
					formObj.i_ctf_payto_trdp_nm.value=masterVals[3];//state_locl_nm
				}else if( ctlKind == formObj.i_cf_payto_trdp_cd ){
					formObj.i_cf_payto_trdp_cd.value=masterVals[0];//state_cd
					formObj.i_cf_payto_trdp_nm.value=masterVals[3];//state_locl_nm
				}else{
					formObj.i_trdp_cd.value=masterVals[0];//trdp_cd
					formObj.i_trdp_nm.value=masterVals[3];//full_nm
				}
			}else if(CODETYPE =="country"){
				if ( ctlKind == formObj.i_cnt_cd ) {
					formObj.i_cnt_cd.value=masterVals[0];//cnt_cd
					formObj.i_cnt_nm.value=masterVals[3];//cnt_eng_nm
				} else if ( ctlKind == formObj.i_aes_cnt_cd ) {
					formObj.i_aes_cnt_cd.value=masterVals[0];//cnt_cd
				}
			}else if(CODETYPE =="location"){
				formObj.i_loc_cd.value=masterVals[0];//loc_cd 
				//formObj.s_node_code.value = masterVals[1];//nod_cd 
				formObj.i_loc_nm.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				//#138 Local Currency 추가
				//formObj.i_trf_cur_cd.value=masterVals[0];//cd_val
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
				if(ctlKind == formObj.i_trf_cur_cd){
					formObj.i_trf_cur_cd.value = masterVals[0];
				}
				else if(ctlKind == formObj.i_locl_cur_cd){
					formObj.i_locl_cur_cd.value = masterVals[0];
				}				
			}else if(CODETYPE =="office"){
				if ( ctlKind == formObj.i_prnt_ofc_cd ) {
					formObj.i_prnt_ofc_cd.value=masterVals[0];
					formObj.i_prnt_ofc_nm.value=masterVals[3];
				} else if ( ctlKind == formObj.i_sls_ofc_cd ) {
					formObj.i_sls_ofc_cd.value=masterVals[0];
					formObj.i_sls_ofc_nm.value=masterVals[3];
				} else if ( ctlKind == formObj.i_finc_ofc_cd ) {
					formObj.i_finc_ofc_cd.value=masterVals[0];
					formObj.i_finc_ofc_nm.value=masterVals[3];
				}else if ( ctlKind == formObj.s_ofc_cd ) {
					formObj.s_ofc_cd.value=masterVals[0];
					formObj.s_ofc_nm.value=masterVals[3];
				}
			}else if(CODETYPE =="state"){
				if ( ctlKind == formObj.i_state_cd ) {
					formObj.i_state_cd.value=masterVals[0];//state_cd
					formObj.i_state_nm.value=masterVals[3];//state_locl_nm
				} else if ( ctlKind == formObj.i_aes_state_cd ) {
					formObj.i_aes_state_cd.value=masterVals[0];//state_cd
				}
			}
		}else{
			if(CODETYPE =="partner"){
				formObj.i_trdp_cd.value="";//trdp_cd
				//formObj.s_liner_abbr.value = "";//shrt_nm
				formObj.i_trdp_nm.value="";//full_nm
			}else if(CODETYPE =="trdpcode"){
				if ( ctlKind == formObj.i_pps_payto_trdp_cd ) {
					formObj.i_pps_payto_trdp_cd.value="";
					formObj.i_pps_payto_trdp_nm.value="";
				}else if(ctlKind == formObj.i_ctf_payto_trdp_cd){
					formObj.i_ctf_payto_trdp_cd.value="";
					formObj.i_ctf_payto_trdp_nm.value="";
				}else if(ctlKind == formObj.i_cf_payto_trdp_cd){
					formObj.i_cf_payto_trdp_cd.value="";
					formObj.i_cf_payto_trdp_nm.value="";
				}else{
					formObj.i_trdp_cd.value="";//trdp_cd
					formObj.i_trdp_nm.value="";//full_nm
				}
			}else if(CODETYPE =="country"){
				if ( ctlKind == formObj.i_cnt_cd ) {
					formObj.i_cnt_cd.value="";//cnt_cd
					formObj.i_cnt_nm.value="";//cnt_eng_nm
				} else if ( ctlKind == formObj.i_aes_cnt_cd ) {
					formObj.i_aes_cnt_cd.value="";//cnt_cd
				}
			}else if(CODETYPE =="location"){
				formObj.i_loc_cd.value="";//loc_cd 
				//formObj.s_node_code.value = "";//nod_cd 
				formObj.i_loc_nm.value="";//loc_nm 
			}else if(CODETYPE =="currency"){
				//#138 Local Currency 추가
				//formObj.i_trf_cur_cd.value="";
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
				if(ctlKind == formObj.i_trf_cur_cd){
					formObj.i_trf_cur_cd.value = "";
				}
				else if(ctlKind == formObj.i_locl_cur_cd){
					formObj.i_locl_cur_cd.value = "";
				}
			}else if(CODETYPE =="office"){
				if ( ctlKind == formObj.i_prnt_ofc_cd ) {
					formObj.i_prnt_ofc_cd.value="";
					formObj.i_prnt_ofc_nm.value="";
				} else if ( ctlKind == formObj.i_sls_ofc_cd ) {
					formObj.i_sls_ofc_cd.value="";
					formObj.i_sls_ofc_nm.value="";
				} else if ( ctlKind == formObj.i_finc_ofc_cd ) {
					formObj.i_finc_ofc_cd.value="";
					formObj.i_finc_ofc_nm.value="";
				}else if ( ctlKind == formObj.s_ofc_cd ) {
					formObj.s_ofc_cd.value="";
					formObj.s_ofc_nm.value="";	
				}
			}else if(CODETYPE =="state"){
				if ( ctlKind == formObj.i_state_cd ) {
					formObj.i_state_cd.value="";
					formObj.i_state_nm.value="";
				} else if ( ctlKind == formObj.i_aes_state_cd ) {
					formObj.i_aes_state_cd.value="";
				}
			}
		}
	}else{
		//Error Errupt!	
		//alert(getLabel('FMS_COM_ERR001') + "\n\n: MDM_MCM_0050.824");		
	}
}
//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
var tab1click='';
var tab2click='';
var tab3click='';
var tab4click='';
var tab5click='';
var tab6click='';
var tab7click='';
function goTabSelect(isNumSep) {
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	frm1.f_isNumSep.value=isNumSep;
	var tabObjs=document.getElementsByName('tabLayer');
	if( isNumSep == "01" ) {
		currTab=isNumSep;	//탭상태저장
//		document.all.Tab01.className = "tab_head-l";
//		document.all.Tab02.className = "tab_head_non-l";
//		document.all.Tab03.className = "tab_head_non-l";
//		document.all.Tab04.className = "tab_head_non-l";
//		document.all.Tab05.className = "tab_head_non-l";
//		document.all.Tab06.className = "tab_head_non-l";
//		document.all.Tab07.className = "tab_head_non-l";
		tabObjs[0].style.display='inline';
		tabObjs[1].style.display='none';
		tabObjs[2].style.display='none';
		tabObjs[3].style.display='none';
		tabObjs[4].style.display='none';
		//tabObjs[5].style.display='none';
		if(tab1click == ""){
			tab1click="Y"
		}
		//스크롤을 하단으로 이동한다.
		//document.body.scrollTop=document.body.scrollHeight;
	//Mark Description 탭
	} else if( isNumSep == "02" ) {
		currTab=isNumSep;	//탭상태저장
//		document.all.Tab01.className = "tab_head_non-l";
//		document.all.Tab02.className = "tab_head-l";
//		document.all.Tab03.className = "tab_head_non-l";
//		document.all.Tab04.className = "tab_head_non-l";
//		document.all.Tab05.className = "tab_head_non-l";
//		document.all.Tab06.className = "tab_head_non-l";
//		document.all.Tab07.className = "tab_head_non-l";
		tabObjs[0].style.display='none';
		tabObjs[1].style.display="inline";
		tabObjs[2].style.display='none';
		tabObjs[3].style.display='none';
		tabObjs[4].style.display='none';
		//tabObjs[5].style.display='none';
		if(tab2click == ""){
			tab2click="Y";
			//doWork('SEARCH_XPT');
		}
		//스크롤을 하단으로 이동한다.
		//document.body.scrollTop=document.body.scrollHeight;
	}else if( isNumSep == "03" ) {
		currTab=isNumSep;	//탭상태저장
//		document.all.Tab01.className = "tab_head_non-l";
//		document.all.Tab02.className = "tab_head_non-l";
//		document.all.Tab03.className = "tab_head-l";
//		document.all.Tab04.className = "tab_head_non-l";
//		document.all.Tab05.className = "tab_head_non-l";
//		document.all.Tab06.className = "tab_head_non-l";
//		document.all.Tab07.className = "tab_head_non-l";
		tabObjs[0].style.display='none';
		tabObjs[1].style.display='none';
		tabObjs[2].style.display='inline';
		tabObjs[3].style.display='none';
		tabObjs[4].style.display='none';
		//tabObjs[5].style.display='none';
		if(tab3click== ""){
			tab3click="Y";
			doWork('SEARCH_ACCT_GL');
			doWork('SEARCH_PRF_SHR');
			doWork('SEARCH_ACCT_OPT');
		}
		//스크롤을 하단으로 이동한다.
		//document.body.scrollTop=document.body.scrollHeight;
	//Freight탭
	}else if( isNumSep == "04" ) {
		currTab=isNumSep;	//탭상태저장
//		document.all.Tab01.className = "tab_head_non-l";
//		document.all.Tab02.className = "tab_head_non-l";
//		document.all.Tab03.className = "tab_head_non-l";
//		document.all.Tab04.className = "tab_head-l";
//		document.all.Tab05.className = "tab_head_non-l";
//		document.all.Tab06.className = "tab_head_non-l";
//		document.all.Tab07.className = "tab_head_non-l";
		tabObjs[0].style.display='none';
		tabObjs[1].style.display='none';
		tabObjs[2].style.display='none';
		tabObjs[3].style.display='inline';
		tabObjs[4].style.display='none';
		//tabObjs[5].style.display='none';
		if(tab4click== ""){
			tab4click="Y";
			//doWork('SEARCH_FRT');
		}
		//스크롤을 하단으로 이동한다.
		//document.body.scrollTop=document.body.scrollHeight;
	//Department
	}else if( isNumSep == "05" ) {
		currTab=isNumSep;	//탭상태저장
//		document.all.Tab01.className = "tab_head_non-l";
//		document.all.Tab02.className = "tab_head_non-l";
//		document.all.Tab03.className = "tab_head_non-l";
//		document.all.Tab04.className = "tab_head_non-l";
//		document.all.Tab05.className = "tab_head-l";
//		document.all.Tab06.className = "tab_head_non-l";
//		document.all.Tab07.className = "tab_head_non-l";
		tabObjs[0].style.display='none';
		tabObjs[1].style.display='none';
		tabObjs[2].style.display='none';
		tabObjs[3].style.display='none';
		tabObjs[4].style.display='inline';
		//tabObjs[5].style.display='none';
		if(tab5click== ""){
			tab5click="Y";
			doWork('SEARCH_OFC_RMK');
		}
		//스크롤을 하단으로 이동한다.
		//document.body.scrollTop=document.body.scrollHeight;
		///* jsjang 2013.7.23 요구 #16904 - OEH BL Print Remark */
		//doWork('WORKORDER');
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
//화면의 flag value 값을 변경한다.
function flgChange(check) {
	var formObj=document.frm1;
	if(check.checked==true){
		check.value='Y';
	}else{		

		if(!formObj.i_use_flg.checked){
			doAction3();
			
			if(formObj.sys_ofc_cd.value == formObj.i_ofc_cd.value){
				$('input:checkbox[id="i_use_flg"]').attr("checked", true); //단일건
				//In cast that System Office Code and Office Code are same, you’re not able to modify it unchecked. 
				alert(getLabel('FMS_COM_SYS_OFC_CD'));
				return false;
			}
			check.value='N';
		}
	}
}
//#2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB No., HB/L No생성 로직
function ymdFlgChange(check) {
	var formObj=document.frm1;
	if(check.checked==true){
		check.value='Y';
	}else{	
		check.value='N';
	}
}
//화면의 checkbox를 database 값으로 셋팅한다.
function checkBoxSetting(){
	var formObj=document.frm1;
	if(formObj.i_use_flg.value=="Y"){
		formObj.i_use_flg.checked=true;
	}else{
		formObj.i_use_flg.checked=false;
	}
	if(formObj.i_company_flg.value=="Y"){
		formObj.i_company_flg.checked=true;
	}else{
		formObj.i_company_flg.checked=false;
	}
	if(formObj.i_pps_use_flg.value=="Y"){
		formObj.i_pps_use_flg.checked=true;
	}else{
		formObj.i_pps_use_flg.checked=false;
	}
	if(formObj.i_ctf_use_flg.value=="Y"){
		formObj.i_ctf_use_flg.checked=true;
	}else{
		formObj.i_ctf_use_flg.checked=false;
	}
	if(formObj.i_cf_use_flg.value=="Y"){
		formObj.i_cf_use_flg.checked=true;
	}else{
		formObj.i_cf_use_flg.checked=false;
	}
	//#2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB No., HB/L No생성 로직
	/*if(formObj.i_oe_lnr_bkg_ymd_prfx.value=="Y"){
		formObj.i_oe_lnr_bkg_ymd_prfx.checked=true;
	}else{
		formObj.i_oe_lnr_bkg_ymd_prfx.checked=false;
	}
	if(formObj.i_oe_bkg_ymd_prfx.value=="Y"){
		formObj.i_oe_bkg_ymd_prfx.checked=true;
	}else{
		formObj.i_oe_bkg_ymd_prfx.checked=false;
	}
	if(formObj.i_oe_hbl_ymd_prfx.value=="Y"){
		formObj.i_oe_hbl_ymd_prfx.checked=true;
	}else{
		formObj.i_oe_hbl_ymd_prfx.checked=false;
	}
	if(formObj.i_ae_awb_ymd_pfx.value=="Y"){
		formObj.i_ae_awb_ymd_pfx.checked=true;
	}else{
		formObj.i_ae_awb_ymd_pfx.checked=false;
	}*/
}
//화면의 selectBox를 database 값으로 셋팅한다.
function selectBoxSetting(){
	frm1.i_tax_type.value=frm1.h_tax_type.value;
	//frm1.i_rpt_tp_cd.value=frm1.h_rpt_tp_cd.value;
	frm1.i_oth_size_ut_cd.value=frm1.h_oth_size_ut_cd.value;
	frm1.i_oth_meas_ut_cd.value=frm1.h_oth_meas_ut_cd.value;
	frm1.i_oth_wgt_ut_cd.value=frm1.h_oth_wgt_ut_cd.value;
	/*frm1.i_gl_agent_ps_oth.value=frm1.h_gl_agent_ps_oth.value;
	frm1.i_gl_agent_ps_ae.value=frm1.h_gl_agent_ps_ae.value;
	frm1.i_gl_agent_ps_ai.value=frm1.h_gl_agent_ps_ai.value;
	frm1.i_gl_agent_ps_oe.value=frm1.h_gl_agent_ps_oe.value;
	frm1.i_gl_agent_ps_oi.value=frm1.h_gl_agent_ps_oi.value;
	frm1.i_gl_misc_loss.value=frm1.h_gl_misc_loss.value;
	frm1.i_gl_xcrt_gain.value=frm1.h_gl_xcrt_gain.value;  //<!--#1437 [PATENT] 0215_23 Daily Block / Monthly Closing Additional Function  -->
	frm1.i_gl_xcrt_lss.value=frm1.h_gl_xcrt_lss.value;    //<!--#1437 [PATENT] 0215_23 Daily Block / Monthly Closing Additional Function  -->
	frm1.i_gl_misc_profit.value=frm1.h_gl_misc_profit.value;
	frm1.i_gl_ex_loss.value=frm1.h_gl_ex_loss.value;
	frm1.i_gl_ex_profit.value=frm1.h_gl_ex_profit.value;
	frm1.i_gl_re_earn.value=frm1.h_gl_re_earn.value;
	frm1.i_gl_agent_ae.value=frm1.h_gl_agent_ae.value;
	frm1.i_gl_agent_ai.value=frm1.h_gl_agent_ai.value;
	frm1.i_gl_agent_oe.value=frm1.h_gl_agent_oe.value;
	frm1.i_gl_agent_oi.value=frm1.h_gl_agent_oi.value;
	frm1.i_gl_agent_oth.value=frm1.h_gl_agent_oth.value;
	frm1.i_gl_agent_ar.value=frm1.h_gl_agent_ar.value;
	frm1.i_gl_agent_ap.value=frm1.h_gl_agent_ap.value;
	frm1.i_gl_ap.value=frm1.h_gl_ap.value;
	frm1.i_gl_ar.value=frm1.h_gl_ar.value;*/
	/* VAT Setup 주석처리
	frm1.i_gl_vat_rev.value=frm1.h_gl_vat_rev.value;
	frm1.i_gl_vat_cost.value=frm1.h_gl_vat_cost.value;
	frm1.i_gl_vat_exp.value=frm1.h_gl_vat_exp.value;
	*/
	/*frm1.i_inv_font_size.value=frm1.h_inv_font_size.value;
	frm1.i_inv_carr_font_size.value=frm1.h_inv_carr_font_size.value;
	frm1.i_crdr_font_size.value=frm1.h_crdr_font_size.value;
	frm1.i_locl_stmt_font_size.value=frm1.h_locl_stmt_font_size.value;
	frm1.i_agent_stmt_font_size.value=frm1.h_agent_stmt_font_size.value;
	frm1.i_do_font_size.value=frm1.h_do_font_size.value;
	frm1.i_ooh_bkg_font_size.value=frm1.h_ooh_bkg_font_size.value;
	frm1.i_awb_font_size.value=frm1.h_awb_font_size.value;
	frm1.i_pkup_font_size.value=frm1.h_pkup_font_size.value;*/
	//frm1.i_quo_font_size.value=frm1.h_quo_font_size.value;
	/*frm1.i_oi_quo_font_size.value=frm1.h_oi_quo_font_size.value;
	frm1.i_oe_quo_font_size.value=frm1.h_oe_quo_font_size.value;
	frm1.i_ai_quo_font_size.value=frm1.h_ai_quo_font_size.value;
	frm1.i_ae_quo_font_size.value=frm1.h_ae_quo_font_size.value;
	frm1.i_wh_rct_font_size.value=frm1.h_wh_rct_font_size.value;
	frm1.i_oi_an_font_size.value=frm1.h_oi_an_font_size.value;
	frm1.i_ai_an_font_size.value=frm1.h_ai_an_font_size.value;
	frm1.i_post_dt_exp.value=frm1.h_post_dt_exp.value;
	frm1.i_post_dt_imp.value=frm1.h_post_dt_imp.value;
	frm1.i_post_dt_inv.value=frm1.h_post_dt_inv.value;
	frm1.i_post_dt_crdr.value=frm1.h_post_dt_crdr.value;*/
	
	//#376 [ZEN] OFFICE CODE > ACCCOUTING OPTION > INVOICE POST DAET OPTION
	/*frm1.i_post_dt_acct.value=frm1.h_post_dt_acct.value;*/
	frm1.i_rvn_bank_seq.value=frm1.h_rvn_bank_seq.value;
	frm1.i_cost_bank_seq.value=frm1.h_cost_bank_seq.value;
	//#52300
	frm1.i_time_zone.value=frm1.h_time_zone.value;
	// WMS 고도화
	frm1.i_wh_sto_acc_cd.value=frm1.h_wh_sto_acc_cd.value;
	
	//#1098 [BNX] INDIA 오피스 - 요구사항 항목
	frm1.i_tax_opt.value = frm1.h_tax_opt.value;
	//Rounds
	frm1.i_air_grs_wgt_rnd.value=frm1.h_air_grs_wgt_rnd.value;
	frm1.i_air_vol_wgt_rnd.value=frm1.h_air_vol_wgt_rnd.value;
	frm1.i_air_chg_wgt_rnd.value=frm1.h_air_chg_wgt_rnd.value;
	
	frm1.i_sea_grs_wgt_rnd.value=frm1.h_sea_grs_wgt_rnd.value;
	frm1.i_sea_vol_wgt_rnd.value=frm1.h_sea_vol_wgt_rnd.value;
	
	// Basic Setting tab
	frm1.i_kgs_lbs_auto_calc.value=frm1.h_kgs_lbs_auto_calc.value;
	
}
function loaddata(){
	if(frm1.i_ofc_cd.value=='' && frm1.s_ofc_cd.value!=''){
		//There is no Office Code.
		alert(getLabel('FMS_COM_ALT010') + " - " + getLabel('FMS_COD_OFCE') + "\n\n: MDM_MCM_0050.1179");	
		frm1.s_ofc_cd.value='';
	}
}
function checkInpuVals(){
	var rtnVal=true;
	var formObj=document.frm1;
	if(formObj.i_ofc_cd.value == ""){
		//Please enter a [Office Code]!
		alert(getLabel('FMS_COM_ALT001') + "\n\n: MDM_MCM_0050.1190");	
		rtnVal=false;
	}
	if(checkInputVal(formObj.i_descr.value, 0, 200, "T", getLabel('DESC'))!='O'){
		rtnVal=false;
	}
	if(checkInputVal(formObj.i_ofc_addr.value, 0, 200, "T", getLabel('FMS_COD_ADDR'))!='O'){
		rtnVal=false;
	}
	// 26939	
	/*if(checkInputVal(formObj.i_do_rmk.value, 0, 1000, "T", "D/O Remark")!='O'){
		rtnVal=false;
	}*/
	/*if(checkInputVal(formObj.i_ooh_bkg_rmk.value, 0, 400, "T", "OOH Booking Remark")!='O'){
		rtnVal=false;
	}
	if(checkInputVal(formObj.i_awb_rmk.value, 0, 400, "T", "AWB Remark")!='O'){
		rtnVal=false;
	}
	if(checkInputVal(formObj.i_pkup_rmk.value, 0, 400, "T", "Pickup/Delivery Remark")!='O'){
		rtnVal=false;
	}*/
	/*if(checkInputVal(formObj.i_quo_rmk.value, 0, 400, "T", "Quotation Remark ")!='O'){
		rtnVal=false;
	}*/
	
	/*var jnr_dflt_curr_cds = "";
	
	for(var i=1; i<=5; i++){
		var jnr_dflt_curr_cd = eval("formObj.i_jnr_dflt_curr_cd" + i + ".value");
		
		if(jnr_dflt_curr_cd == "") continue;
		
		if(jnr_dflt_curr_cds.indexOf(jnr_dflt_curr_cd) != -1){
			alert(getLabel('FMS_COM_ALT008') + " - Journal Currency for China");	
			rtnVal=false;
			break;
		}
		jnr_dflt_curr_cds += jnr_dflt_curr_cd + "&";
	}*/
	
	return rtnVal;
}
function checkItNum(obj){
	var inputValue=obj.value;
	var inputName=obj.name;
	var formObj=document.frm1;
	var itNextNumber=formObj.i_it_next_no.value;
	var itEndNumber=formObj.i_it_end.value;
	// 8자리 체크
	if(inputValue.length != 0 && inputValue.length != 8){
		if (inputName == 'i_it_next_no') {
			alert(getLabel('MDM_COM_ALT006') + "\n\n: MDM_MCM_0050.1298");	
			document.frm1.i_it_next_no.focus();
			return;
		} else {
			alert(getLabel('MDM_COM_ALT007') + "\n\n: MDM_MCM_0050.1232");	
			document.frm1.i_it_end.focus();
			return;
		}
	}
}

/*function setPrefixSeqReadonly(bool){
	var formObj=document.frm1;
	var v_class = "";
	
	if(bool) {
		v_class = 'search_form-disable';
	} else {
		v_class = 'search_form';
	}
	*/
	/*formObj.i_inv_prfx.className=v_class;
	formObj.i_inv_prfx.readOnly=bool;
	
	formObj.i_inv_seq_no.className=v_class;
	formObj.i_inv_seq_no.readOnly=bool;
	
	formObj.i_crdr_prfx.className=v_class;
	formObj.i_crdr_prfx.readOnly=bool;
	
	formObj.i_crdr_seq_no.className=v_class;
	formObj.i_crdr_seq_no.readOnly=bool;
	
	formObj.i_oi_ref_prfx.className=v_class;
	formObj.i_oi_ref_prfx.readOnly=bool;
	
	formObj.i_oi_ref_seq_no.className=v_class;
	formObj.i_oi_ref_seq_no.readOnly=bool;
	
	formObj.i_oe_ref_prfx.className=v_class;
	formObj.i_oe_ref_prfx.readOnly=bool;
	
	formObj.i_oe_ref_seq_no.className=v_class;
	formObj.i_oe_ref_seq_no.readOnly=bool;
	
	formObj.i_ai_ref_prfx.className=v_class;
	formObj.i_ai_ref_prfx.readOnly=bool;
	
	formObj.i_ai_ref_seq_no.className=v_class;
	formObj.i_ai_ref_seq_no.readOnly=bool;
	
	formObj.i_ae_ref_prfx.className=v_class;
	formObj.i_ae_ref_prfx.readOnly=bool;
	
	formObj.i_ae_ref_seq_no.className=v_class;
	formObj.i_ae_ref_seq_no.readOnly=bool;
	
	formObj.i_ae_awb_prfx.className=v_class;
	formObj.i_ae_awb_prfx.readOnly=bool;
	
	formObj.i_ae_awb_seq_no.className=v_class;
	formObj.i_ae_awb_seq_no.readOnly=bool;
	
	formObj.i_oe_hbl_prfx.className=v_class;
	formObj.i_oe_hbl_prfx.readOnly=bool;
	
	formObj.i_oe_hbl_seq_no.className=v_class;
	formObj.i_oe_hbl_seq_no.readOnly=bool;
	
	formObj.i_oe_bkg_prfx.className=v_class;
	formObj.i_oe_bkg_prfx.readOnly=bool;
	
	formObj.i_oe_bkg_seq_no.className=v_class;
	formObj.i_oe_bkg_seq_no.readOnly=bool;
	
	formObj.i_oe_lnr_bkg_prfx.className=v_class;
	formObj.i_oe_lnr_bkg_prfx.readOnly=bool;
	
	formObj.i_oe_lnr_bkg_seq_no.className=v_class;
	formObj.i_oe_lnr_bkg_seq_no.readOnly=bool;
	
	//formObj.i_ae_bkg_prfx.className=v_class;
	//formObj.i_ae_bkg_prfx.readOnly=bool;
	
	//formObj.i_ae_bkg_seq_no.className=v_class;
	//formObj.i_ae_bkg_seq_no.readOnly=bool;
	
	formObj.i_sea_quo_prfx.className=v_class;
	formObj.i_sea_quo_prfx.readOnly=bool;
	
	formObj.i_sea_quo_seq_no.className=v_class;
	formObj.i_sea_quo_seq_no.readOnly=bool;
	
	formObj.i_air_quo_prfx.className=v_class;
	formObj.i_air_quo_prfx.readOnly=bool;
	
	formObj.i_air_quo_seq_no.className=v_class;
	formObj.i_air_quo_seq_no.readOnly=bool;
	
	formObj.i_wh_rcpt_prfx.className=v_class;
	formObj.i_wh_rcpt_prfx.readOnly=bool;
	
	formObj.i_wh_rcpt_seq_no.className=v_class;
	formObj.i_wh_rcpt_seq_no.readOnly=bool;
	
	formObj.i_wh_rcv_prfx.className=v_class;
	formObj.i_wh_rcv_prfx.readOnly=bool;
	
	formObj.i_wh_rcv_seq_no.className=v_class;
	formObj.i_wh_rcv_seq_no.readOnly=bool;
	
	formObj.i_wh_shp_prfx.className=v_class;
	formObj.i_wh_shp_prfx.readOnly=bool;
	
	formObj.i_wh_shp_seq_no.className=v_class;
	formObj.i_wh_shp_seq_no.readOnly=bool;
	
	formObj.i_trk_prfx.className=v_class;
	formObj.i_trk_prfx.readOnly=bool;
	
	formObj.i_trk_seq_no.className=v_class;
	formObj.i_trk_seq_no.readOnly=bool;
	
	formObj.i_wm_doc_prfx.className=v_class;
	formObj.i_wm_doc_prfx.readOnly=bool;
	
	formObj.i_wm_doc_seq_no.className=v_class;
	formObj.i_wm_doc_seq_no.readOnly=bool;
	*/
	//#1441 [PATENT] 0215_28 CONTAINER LOAD PLAN (CONSOLE)
	/*formObj.i_clp_doc_prfx.className=v_class;
	formObj.i_clp_doc_prfx.readOnly=bool;
	
	formObj.i_clp_doc_seq_no.className=v_class;
	formObj.i_clp_doc_seq_no.readOnly=bool;
	
	document.all.i_oe_lnr_bkg_ymd_prfx.disabled = bool;
	document.all.i_oe_bkg_ymd_prfx.disabled = bool;
	document.all.i_oe_hbl_ymd_prfx.disabled = bool;
	document.all.i_ae_awb_ymd_pfx.disabled = bool;
}*/

function sheet2_OnChange(sheetObj, Row, Col, Value){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "frt_cd" :
			var strCd=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strCd.toUpperCase());
			doAction1(sheetObj.GetCellValue(Row, Col));
		break;
		case "frt_cd_nm" :
			var strPckNm=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strPckNm.toUpperCase());
		break;
		case "tax_flg" :
			var taxFlg=sheetObj.GetCellValue(Row, Col);
			if(taxFlg == 'Y'){
				sheetObj.SetCellEditable(Row, "tax_rate",1);
			}
		break;
		case "gl_cd_rev" :
		case "gl_cd_cost" :
		case "gl_cd_prnr" :
		case "gl_cd_prnr2" :
			SELECTROW=Row;
			// GL NO에 매핑되어있는 BANK 정보를 가져온다.
			ajaxSendPost(searchGlBankInfo, sheetObj.ColSaveName(Col), '&goWhere=aj&bcKey=searchGlBankInfo&gl_no='+Value+'&gl_rmk='+sheetObj.GetCellValue(Row, Col+1), './GateServlet.gsl');
		break;
	}
}
//Sheet Account GL after saving successfully
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		showCompleteProcess();
	}
}
//Sheet Profit Share after saving successfully
function sheet2_OnSaveEnd(sheetObj1, errMsg){
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		showCompleteProcess();
	}
} 
//Sheet Account Option after saving successfully
function sheet3_OnSaveEnd(sheetObj2, errMsg){
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		showCompleteProcess();
	}
}
//Sheet Remark after saving successfully
function sheet5_OnSaveEnd(sheetObj, errMsg){
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		showCompleteProcess();
	}
}


function sheet2_OnPopupClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	//GLCODE POPUP을 호출한다.
	var rtnary=new Array(1);
	rtnary[0]="1";
	var rtnVal=window.showModalDialog('./CMM_POP_0260.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:658px;dialogHeight:450px");
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(row, colStr,rtnValAry[0]);
		sheetObj.SetCellValue(row, colStr.replaceAll("_cd_", "_rmk_"),rtnValAry[1]);
	}
}
function sheet2_OnKeyUp(sheetObj, Row, Col, KeyCode, Shift){
	var colStr=sheetObj.ColSaveName(Col);
	if (KeyCode == 13 && (colStr == "gl_rmk_rev" || colStr == "gl_rmk_cost" || colStr == "gl_rmk_prnr")){
		if(SELECTROW == Row){
			sheetObj.SelectCell(Row, Col);
			Row=Row;
		} else {
			sheetObj.SelectCell(Row-1, Col);
			Row=Row-1
		}
		//GLCODE POPUP을 호출한다.
		var rtnary=new Array(2);
		rtnary[0]="GLRMK"
			rtnary[1]=sheetObj.GetCellValue(Row, colStr);
		var rtnVal=window.showModalDialog('./CMM_POP_0260.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:658px;dialogHeight:450px");
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
		} else {
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(Row, colStr.replaceAll("_rmk_", "_cd_"),rtnValAry[0]);
			sheetObj.SetCellValue(Row, colStr,rtnValAry[1]);
			sheetObj.SelectCell(Row, Col+1, false);
		}
	}
}
/**
* IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
* sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
*/
function sheet5_OnDblClick(sheetObj,Row,Col){
	//Name선택 시에만 팝업 호출
	if(sheetObj.ColSaveName(Col)=='rmk_id' || sheetObj.ColSaveName(Col)=='rmk_txt'){
		//doWork('REMARK');
  	 	if(frm1.s_ofc_cd.value == null || frm1.s_ofc_cd.value == '')
  	 	{
  	 		alert(getLabel('MDM_COM_ALT012') + " \n\n: MDM_MCM_0050.1190");
  	 		return false;
  	 	}
  	 	var reqParam='?rmk_id='+docObjects[4].GetCellValue(docObjects[4].GetSelectRow(), "rmk_id");
 		    reqParam += '&s_ofc_cd='+frm1.s_ofc_cd.value;
    		reqParam += '&openMean=SEARCH01';
    		//alert(s_ofc_cd);
    		//var callBackFunc = "SEARCH_OFC_RMK";
	   		popGET('./MDM_MCM_0150_NW.clt'+reqParam, 'seeShipDoc', 606, 400, "scroll:no;status:no;help:no;");
	   		//doWork('SEARCH_OFC_RMK);
			
	}
}
function sheet5_OnSearchEnd(){
	for(var i=1; i<docObjects[0].RowCount() ; i++ ){
		docObjects[0].SetCellValue(i, "del_chk",0);
	}
}
function fncGridCheck() {
	var sheetObj=docObjects[0];
	var intRow=sheetObj.LastRow() + 1;
	var cnt=0;
	//#1782 [CLA DEMO] OCEAN EXPORT HB/L REMARK DELETE AND DEFAULT SETTING ISSUE
	for( var i=1 ; i < intRow ; i++ ) {
		//del_chk
		cnt=Number(cnt) + Number(sheetObj.GetCellValue(i, "del_chk"));
	}
	
	if(cnt < 1)
	{
		alert(getLabel('FMS_COM_ALT007') + "\n\n: MDM_MCM_0050.444");
		return false;
	}		
	return true;
}
/* jsjang 2013.07.30 #16393 Company, C-TPAT Logo Outgoing report */
function downloadFile(downType, set_type){
	document.frm2.docType.value=downType;
	document.frm2.v_set_type.value=set_type;
	document.frm2.v_ofc_cd.value=frm1.s_ofc_cd.value;
	//document.frm2.target='ifrm1';
	document.frm2.submit();
}
/* #20956 : [BINEX] BL Common - B/L Print - add Name Representing , jsjang 2013.10.11 해당 값이 없으면 Name(Eng) 와 동일하게 설정 */
function strRepnm(obj)
{
	if(obj.value != '' && frm1.i_ofc_rep_nm.value == '')
	{
		frm1.i_ofc_rep_nm.value=obj.value;
	}
}

function submitForm(){
	
	
	var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	var formData;
	if(navigator.appName.indexOf("Microsoft") != -1) {
		if(formObj.f_cmd.value==SEARCH){
			//formData = $(formObj).serialize();
			formObj.submit();
			return;
		}else{
			formObj.submit();
			return;
		}
	} else {
		formData = new FormData();
		$.each($("form").find("input[type='file']"), function(i, tag) {
	        $.each($(tag)[0].files, function(i, file) {
	            formData.append(tag.name, file);
	        });
	    });
	    var params = $("form").serializeArray();
	    $.each(params, function (i, val) {
	        formData.append(val.name, val.value);
	    });
	}
    
	
	$.ajax({
		   type: "POST",
		   url: "./MDM_MCM_0050_NWAJ.clt",
		   dataType: 'xml',
		   data: formData,
		   contentType: false,
	       processData: false,
		   success: function(data){
			   
			   
			  /* Set Basis Setting tab*/
			   setFieldValue( formObj.i_air_grs_wgt_dcm_plc, $('air_grs_wgt_dcm_plc',data).text());
			   setFieldValue( formObj.h_air_grs_wgt_rnd, $('air_grs_wgt_rnd',data).text());
			   
			   setFieldValue( formObj.i_air_vol_wgt_dcm_plc, $('air_vol_wgt_dcm_plc',data).text());
			   setFieldValue( formObj.h_air_vol_wgt_rnd, $('air_vol_wgt_rnd',data).text());
			   
			   setFieldValue( formObj.i_air_chg_wgt_dcm_plc, $('air_chg_wgt_dcm_plc',data).text());
			   setFieldValue( formObj.h_air_chg_wgt_rnd, $('air_chg_wgt_rnd',data).text());
			   
			   setFieldValue( formObj.i_sea_grs_wgt_dcm_plc, $('sea_grs_wgt_dcm_plc',data).text());
			   setFieldValue( formObj.h_sea_grs_wgt_rnd, $('sea_grs_wgt_rnd',data).text());
			   
			   setFieldValue( formObj.i_sea_vol_wgt_dcm_plc, $('sea_vol_wgt_dcm_plc',data).text());
			   setFieldValue( formObj.h_sea_vol_wgt_rnd, $('sea_vol_wgt_rnd',data).text());
			   
			   setFieldValue( formObj.h_kgs_lbs_auto_calc, $('kgs_lbs_auto_calc',data).text());
			   
			   setFieldValue( formObj.sts_set, $('sts_set',data).text());
			   setFieldValue( formObj.no_mbl, $('no_mbl',data).text());
			   setFieldValue( formObj.cre_hbl_flg, $('cre_hbl_flg',data).text());
			   setFieldValue( formObj.prn_cre_inv, $('prn_cre_inv',data).text());
			   setFieldValue( formObj.inv_apro, $('inv_apro',data).text());
			   setFieldValue( formObj.csr_apro, $('csr_apro',data).text());
			   checkStsSet();
			   checkNoMbl();
			   //checkCreHblFlg();
			   checkPrnCreInv();
			   checkInvApro();
			   checkCsrApro();
			   
			   /*Set Basis Information Tab*/
			   setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());
			   setFieldValue( formObj.s_ofc_cd, $('s_ofc_cd',data).text());
			   setFieldValue( formObj.s_ofc_nm, $('s_ofc_nm',data).text());
			   $("form[name='frm3']").find("input:hidden [name='v_ofc_cd']").val($('s_ofc_cd',data).text());
			   setFieldValue( formObj.sys_ofc_cd, $('sys_ofc_cd',data).text());
			   //Basis Information
			   setFieldValue( formObj.i_ofc_cd, $('ofc_cd',data).text());
			   setFieldValue( formObj.i_use_flg, $('use_flg',data).text());
			   setFieldValue( formObj.i_company_flg, $('is_co_flg',data).text());
			   coFlgChange(formObj.i_company_flg);
			   setFieldValue( formObj.i_cnt_cd, $('cnt_cd',data).text());
			   setFieldValue( formObj.i_cnt_nm, $('cnt_nm',data).text());
			   setFieldValue( formObj.i_state_cd, $('state_cd',data).text());
			   setFieldValue( formObj.i_state_nm, $('state_nm',data).text());
			   setFieldValue( formObj.i_loc_cd, $('loc_cd',data).text());
			   setFieldValue( formObj.i_loc_nm, $('loc_nm',data).text());
			   setFieldValue( formObj.i_prnt_ofc_cd, $('prnt_ofc_cd',data).text());
			   setFieldValue( formObj.i_prnt_ofc_nm, $('prnt_ofc_nm',data).text());
			   setFieldValue( formObj.i_sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.i_sls_ofc_nm, $('sls_ofc_nm',data).text());
			   setFieldValue( formObj.i_finc_ofc_cd, $('finc_ofc_cd',data).text());
			   setFieldValue( formObj.i_finc_ofc_nm, $('finc_ofc_nm',data).text());
			   setFieldValue( formObj.i_trf_cur_cd, $('trf_cur_cd',data).text());
			   setFieldValue( formObj.i_locl_cur_cd, $('locl_curr_cd',data).text());	//#138 Local Currency 추가
			   setFieldValue( formObj.i_ofc_eng_nm, $('ofc_eng_nm',data).text());
			   setFieldValue( formObj.i_ofc_locl_nm, $('ofc_locl_nm',data).text());
			   setFieldValue( formObj.i_ofc_rep_nm, $('ofc_rep_nm',data).text());
			   setFieldValue( formObj.i_descr, $('descr',data).text());
			   setFieldValue( formObj.i_ofc_addr, $('ofc_addr',data).text());
			   setFieldValue( formObj.i_ofc_zip, $('ofc_zip',data).text());
			   setFieldValue( formObj.i_ofc_phn, $('ofc_phn',data).text());
			   setFieldValue( formObj.i_ofc_fax, $('ofc_fax',data).text());
			   setFieldValue( formObj.i_ofc_email, $('ofc_email',data).text());
			   setFieldValue( formObj.i_time_zone, $('time_zone',data).text());
			   setFieldValue( formObj.i_ofc_url, $('ofc_url',data).text());
			   setFieldValue( formObj.h_time_zone, $('time_zone',data).text());
			   setFieldValue( formObj.i_iata_cd, $('iata_cd',data).text());
			   setFieldValue( formObj.i_fmc_no, $('fmc_no',data).text());
			   setFieldValue( formObj.h_tax_type, $('tax_type',data).text());
			   frm1.i_tax_type.value=frm1.h_tax_type.value;
			   setFieldValue( formObj.i_tax_no, $('tax_no',data).text());
			   setFieldValue( formObj.i_tsa_sec_no, $('tsa_sec_no',data).text());
			   setFieldValue( formObj.i_use_hbl_ser, $('use_hbl_ser',data).text());	
			   //IT Number
			   setFieldValue( formObj.i_it_next_no, $('it_next_no',data).text());
			   setFieldValue( formObj.i_it_end, $('it_end',data).text());
			   //Cargo Control Number (Canada Only)
			   setFieldValue( formObj.i_ccn_prfx, $('ccn_prfx',data).text());
			   setFieldValue( formObj.i_oi_ccn_seqno, $('oi_ccn_seqno',data).text());
			   setFieldValue( formObj.i_ai_ccn_seqno, $('ai_ccn_seqno',data).text());
			   
			   //Unit
			   setFieldValue( formObj.h_oth_wgt_ut_cd, $('oth_wgt_ut_cd',data).text());
			   setFieldValue( formObj.h_oth_meas_ut_cd, $('oth_meas_ut_cd',data).text());
			   setFieldValue( formObj.h_oth_size_ut_cd, $('oth_size_ut_cd',data).text());
			   //Logo square
			   setFieldValue( formObj.logo_square_yn, $('logo_square',data).text());			   
			   setFieldValue( formObj.logo_rectangle_yn, $('logo_rectangle',data).text());
			   setFieldValue( formObj.logo_sub_yn, $('logo_sub',data).text());
			   
			   //Stamp
			   setFieldValue( formObj.stamp_normal_yn, $('stamp_normal',data).text());
			   setFieldValue( formObj.stamp_guarantee_yn, $('stamp_guarantee',data).text());
			   //ACE Setup
			   setFieldValue( formObj.i_aes_cntc_nm, $('aes_cntc_nm',data).text());
			   setFieldValue( formObj.i_aes_addr, $('aes_addr',data).text());
			   setFieldValue( formObj.i_aes_city, $('aes_city',data).text());
			   setFieldValue( formObj.i_aes_state_cd, $('aes_state_cd',data).text());
			   setFieldValue( formObj.i_aes_zip, $('aes_zip',data).text());
			   setFieldValue( formObj.i_aes_cnt_cd, $('aes_cnt_cd',data).text());
			   setFieldValue( formObj.i_aes_rspn_email, $('aes_rspn_email',data).text());
			   setFieldValue( formObj.i_aes_prt_type, $('aes_prt_type',data).text());
			   
			   /*Accounting Tab*/
			   //Accounting - Bank Setup
			   setFieldValue( formObj.h_rvn_bank_seq, $('rvn_bank_seq',data).text());
			   setFieldValue( formObj.h_cost_bank_seq, $('cost_bank_seq',data).text());
			   
			   // Accounting - Warehouse
			   setFieldValue( formObj.h_wh_sto_acc_cd, $('wh_sto_acc_cd',data).text());
			   
			   //Accounting - Accounting Decimal Point
			   setFieldValue( formObj.i_vat_rt_dp_cnt, $('vat_rt_dp_cnt',data).text());
			   setFieldValue( formObj.i_xch_rt_dp_cnt, $('xch_rt_dp_cnt',data).text());
			   
			   //Accounting - Tax Option
			   setFieldValue( formObj.h_tax_opt, $('tax_opt',data).text());
			   
			   //Acounting - Ocean Pierpass
			   setFieldValue( formObj.i_pps_use_flg, $('pps_use_flg',data).text());
			   setFieldValue( formObj.i_pps_payto_trdp_cd, $('pps_payto_trdp_cd',data).text());
			   setFieldValue( formObj.i_pps_payto_trdp_nm, $('pps_payto_trdp_nm',data).text());
			   setFieldValue( formObj.i_pps_cntr20_rt, $('pps_cntr20_rt',data).text());
			   setFieldValue( formObj.i_pps_cntr40_rt, $('pps_cntr40_rt',data).text());
			   setFieldValue( formObj.i_pps_cbm_rt, $('pps_cbm_rt',data).text());
			   
			   //Acounting - Clean Truck Fee
			   setFieldValue( formObj.i_ctf_use_flg, $('ctf_use_flg',data).text());
			   setFieldValue( formObj.i_ctf_payto_trdp_cd, $('ctf_payto_trdp_cd',data).text());
			   setFieldValue( formObj.i_ctf_payto_trdp_nm, $('ctf_payto_trdp_nm',data).text());
			   setFieldValue( formObj.i_ctf_cntr20_rt, $('ctf_cntr20_rt',data).text());
			   setFieldValue( formObj.i_ctf_cntr40_rt, $('ctf_cntr40_rt',data).text());
			   setFieldValue( formObj.i_ctf_cbm_rt, $('ctf_cbm_rt',data).text());
			   
			   //Accoungting - Chassis Fee
			   setFieldValue( formObj.i_cf_use_flg, $('cf_use_flg',data).text());
			   setFieldValue( formObj.i_cf_payto_trdp_cd, $('cf_payto_trdp_cd',data).text());
			   setFieldValue( formObj.i_cf_payto_trdp_nm, $('cf_payto_trdp_nm',data).text());
			   setFieldValue( formObj.i_cf_cntr20_rt, $('cf_cntr20_rt',data).text());
			   setFieldValue( formObj.i_cf_cntr40_rt, $('cf_cntr40_rt',data).text());
			   setFieldValue( formObj.i_cf_cbm_rt, $('cf_cbm_rt',data).text());
			   
			   
			   //frm1.h_rpt_tp_cd.value=$('rpt_tp_cd',data).text();
			   //#2113 [PATENT] Bank Account - Office 항목 지정에 따른 사용분류
			   var selecthtml = '';
			   var bank_cd1  = $('BANKCD1',data).text();
			   var bank_cd2  = $('BANKCD2',data).text();
			   
			   var vCodeSplit = bank_cd1.split("|");
			   var vTextSplit = bank_cd2.split("|");
			   for(var j=0;j<vCodeSplit.length; j++){
					if(vCodeSplit[j] != ""){
						selecthtml += '<option value="'+ vCodeSplit[j] +'">'+ vTextSplit[j] +'</option>';
					}
				}
			   $('#i_rvn_bank_seq').html(selecthtml);
			   $('#i_cost_bank_seq').html(selecthtml);
			   
			   		   
			   /*setFieldValue( formObj.i_oe_lnr_bkg_ymd_prfx, $('oe_lnr_bkg_ymd_prfx',data).text());
			   setFieldValue( formObj.i_oe_bkg_ymd_prfx, 	 $('oe_bkg_ymd_prfx',data).text());
			   setFieldValue( formObj.i_oe_hbl_ymd_prfx, 	 $('oe_hbl_ymd_prfx',data).text());
			   setFieldValue( formObj.i_ae_awb_ymd_pfx, 	 $('ae_awb_ymd_pfx',data).text());*/
			   
			   selectBoxSetting();
			   

			   
			   tab1click='';
			   tab2click='';
			   tab3click='';
			   tab4click='';
			   tab5click='';
			   tab6click='';
			   tab7click='';

			   /*formObj.i_prfx_modify_flg.checked = false;
			   formObj.i_prfx_modify_flg.value="N";*/

			   setupPage();
			   
			   doHideProcess();
			   
			   formObj.logo_square_flg.value = "N";
			   formObj.logo_square_flg.checked = false;
			   
			   if (formObj.logo_square_yn.value != "") {
				   getObj('logo_square_id').style.display="inline";
				   formObj.logo_square_flg.style.display="inline";
				   formObj.logo_square_chk.style.display="inline";
				   
				   $("#logo_square_filenm").html($('logo_square_filenm',data).text());
				   formObj.logo_square.value = "";
			   } else {
				   getObj('logo_square_id').style.display="none";
				   formObj.logo_square_flg.style.display="none";
				   formObj.logo_square_chk.style.display="none";
			   }
			   
			   formObj.logo_rec_flg.value = "N";
			   formObj.logo_rec_flg.checked = false;
			   
			   if (formObj.logo_rectangle_yn.value != "") {
				   getObj('logo_rec_id').style.display="inline";
				   formObj.logo_rec_flg.style.display="inline";
				   formObj.logo_rec_chk.style.display="inline";
				   
				   $("#logo_rectangle_filenm").html($('logo_rectangle_filenm',data).text());
				   formObj.logo_rectangle.value = "";
			   } else {
				   getObj('logo_rec_id').style.display="none";
				   formObj.logo_rec_flg.style.display="none";
				   formObj.logo_rec_chk.style.display="none";
			   }
			   
			   formObj.logo_sub_flg.value = "N";
			   formObj.logo_sub_flg.checked = false;
			   
			   if (formObj.logo_sub_yn.value != "") {
				   getObj('logo_sub_id').style.display="inline";
				   formObj.logo_sub_flg.style.display="inline";
				   formObj.logo_sub_chk.style.display="inline";
				   
				   $("#logo_sub_filenm").html($('logo_sub_filenm',data).text());
				   formObj.logo_sub.value = "";
			   } else {
				   getObj('logo_sub_id').style.display="none";
				   formObj.logo_sub_flg.style.display="none";
				   formObj.logo_sub_chk.style.display="none";
			   }
			   
			   
			   //#52013 [CLC] Stamp Watermark 기능 
			   //formObj.stamp_normal_flg.value = "N";
			   //formObj.stamp_normal_flg.checked = false;
			   
			   if (formObj.stamp_normal_yn.value != "") {
				   getObj('stamp_normal_id').style.display="inline";
				   //formObj.stamp_normal_flg.style.display="inline";
				   //formObj.stamp_normal_chk.style.display="inline";
				   
				   $("#stamp_normal_filenm").html($('stamp_normal_filenm',data).text());
				   formObj.stamp_normal.value = "";
			   } else {
				   getObj('stamp_normal_id').style.display="none";
				   //formObj.stamp_normal_flg.style.display="none";
				   //formObj.stamp_normal_chk.style.display="none";
			   }
			   
			   formObj.stamp_guarantee_flg.value = "N";
			   formObj.stamp_guarantee_flg.checked = false;
			   
			   if (formObj.stamp_guarantee_yn.value != "") {
				   getObj('stamp_guarantee_id').style.display="inline";
				   formObj.stamp_guarantee_flg.style.display="inline";
				   formObj.stamp_guarantee_chk.style.display="inline";
				   
				   $("#stamp_guarantee_filenm").html($('stamp_guarantee_filenm',data).text());
				   formObj.stamp_guarantee.value = "";
			   } else {
				   getObj('stamp_guarantee_id').style.display="none";
				   formObj.stamp_guarantee_flg.style.display="none";
				   formObj.stamp_guarantee_chk.style.display="none";
			   }			   
			   
			   
			   
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}

/*function modifyPrfxFlgChange(){
	
	//Checked이면
	if ( frm1.i_prfx_modify_flg.checked == true ) {
		// 메시지 먼저 출력한다.
		
		//Changing "Prefix/Sequence" during business hours can cause "duplicated" sequence. 
		 if(confirm(getLabel('FMS_COM_ALT078'))) {
			 frm1.i_prfx_modify_flg.value="Y";
			setPrefixSeqReadonly(false);
		} else {
			frm1.i_prfx_modify_flg.checked = false;
			frm1.i_prfx_modify_flg.value="N";
		}
	} else {
		if(confirm(getLabel('FMS_COM_ALT079'))) {
			frm1.i_prfx_modify_flg.value="N";
			setPrefixSeqReadonly(true);
		} else {
			frm1.i_prfx_modify_flg.checked = true;
			frm1.i_prfx_modify_flg.value="Y";
		}
	}
}*/

var GROSS_METHOD_IN_DC = "N";

//#50476 - [BNX] Agent Credit 계정 분리
function setGrossMethodInDcReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]=="Y") {
			GROSS_METHOD_IN_DC = "Y";
		}
	}
}
function validateValue(obj) {
    var formObj = document.getElementById(obj.id);
    for(var i=0; i<formObj.value.length; i++){
    	var filter = /[0-9a-zA-Z#+()\-\_\s]/;
    	if(!filter.test(formObj.value[i])) {
            //ComShowCodeMessage("COM0457","This fields");
    	 	formObj.value="";
    	 	return;
    	}
    }
}

//Active Auto Calculating and Decimal Place and Round in Basis Setting Tab
function coFlgChange(check) {
	var formObj=document.frm1;
	if(check.checked==true){
		document.getElementById('active_company').style.disabled = false;
		document.getElementById('i_prnt_ofc_cd').disabled = true;
		document.getElementById('btnParentOfc').disabled = true;
		//document.getElementById('parent_ofc').style.display = 'none';
		frm1.i_use_flg.checked = true;
		//frm1.i_company_flg.checked = true;
		
	}else{		
		document.getElementById('active_company').style.disabled = true;
		document.getElementById('i_prnt_ofc_cd').disabled = false;
		document.getElementById('btnParentOfc').disabled = false;
		//document.getElementById('parent_ofc').removeAttribute("style");
		//frm1.i_use_flg.checked = false;
		
	}
}

//Set show and hidden next children steps in Basic Setting tab
function activeNxtStep() {
	var formObj=document.frm1;
	if(formObj.next_step_bk_cf.checked){
		formObj.nd_step_sts_set[0].disabled = false;
		formObj.nd_step_sts_set[1].disabled = false;
		formObj.st_step_sts_set[1].disabled = true;
		formObj.st_step_sts_set[2].disabled = true;
		formObj.st_step_sts_set[0].checked = true;
		formObj.nd_step_sts_set[0].checked = true;
	} else {
		formObj.nd_step_sts_set[0].disabled = true;
		formObj.nd_step_sts_set[1].disabled = true;
		formObj.st_step_sts_set[1].disabled = false;
		formObj.st_step_sts_set[2].disabled = false;
		formObj.nd_step_sts_set[0].checked = false;
		formObj.nd_step_sts_set[1].checked = false;
	}
	
	if (formObj.hbl_crt_wt_mbl.checked) {
		formObj.crt_inv_hbl.disabled = false;
	} else {
		formObj.crt_inv_hbl.disabled = true;
		formObj.crt_inv_hbl.checked = false;
	}
	if(formObj.st_inv_apro[0].checked) {
		formObj.nd_inv_apro[0].checked = true;
	} else {
		formObj.nd_inv_apro[0].checked = false;
		formObj.nd_inv_apro[1].checked = false;
	}
	if(formObj.nd_inv_apro[0].checked){
		formObj.st_inv_apro[1].checked = false;
	}
	
}

function setCheckInv() {
	var formObj=document.frm1;
	if(formObj.nd_inv_apro[0].checked || formObj.nd_inv_apro[1].checked){
		formObj.st_inv_apro[1].checked = false;
	}

}

//Set value for STS_SET (Status on Booking being created.)
function setStsSet() {
	var formObj=document.frm1;
	if(formObj.nd_step_sts_set[0].checked) {
		formObj.sts_set.value = "A2";
		return;
	}
	if(formObj.nd_step_sts_set[1].checked) {
		formObj.sts_set.value = "A3";
		return;
	}
	if(formObj.st_step_sts_set[0].checked) {
		formObj.sts_set.value = "A1";
		return;
	}
	if(formObj.st_step_sts_set[1].checked) {
		formObj.sts_set.value= "B1";
		return;
	}
	if(formObj.st_step_sts_set[2].checked) {
		formObj.sts_set.value = "C1";
		return;
	} 
	formObj.sts_set.value = "A0";
}

//Set value for NO_MBL (HB/L can be created without MB/L Info.)
function setNoMbl() {
	var formObj=document.frm1;
	if(formObj.crt_inv_hbl.checked) {
		formObj.no_mbl.value = "A2";
		return;
	}
	if(formObj.hbl_crt_wt_mbl.checked) {
		formObj.no_mbl.value = "A1";
		return;
	}
	formObj.no_mbl.value = "A0";
}

//Set value for CRT_HBL_FLG (HB/L Creation: On Booking being confirmed)
function setCreateHblFlg() {
	var formObj=document.frm1;
	if(formObj.hbl_creation.checked) {
		formObj.cre_hbl_flg.value = "A1";
		return;
	}
	formObj.cre_hbl_flg.value = "A0";
}

//Set value for PRN_CRE_INV (Creating invoice by clicking “Print” button.)
function setPrnCreInv() {
	var formObj=document.frm1;
	if(formObj.crt_inv_by_clk_prt.checked) {
		formObj.prn_cre_inv.value = "A1";
		return;
	}
	formObj.prn_cre_inv.value = "A0";
}

//Set value for INV_APRO (Invoice Approval (A/R,D/C))
function setInvApro() {
	var formObj=document.frm1;
	if(formObj.nd_inv_apro[0].checked) {
		formObj.inv_apro.value = "A1";
		return;
	}
	if(formObj.nd_inv_apro[1].checked) {
		formObj.inv_apro.value = "A2";
		return;
	}
	if(formObj.st_inv_apro[1].checked) {
		formObj.inv_apro.value = "B1";
		return;
	}
	formObj.inv_apro.value = "A0";
}
//Set value for CSR_APRO (CSR Approval (A/P) )
function setCsrApro() {
	var formObj=document.frm1;
	if(formObj.st_csr_apro[0].checked) {
		formObj.csr_apro.value = "A1";
		return;
	}
	if(formObj.st_csr_apro[1].checked) {
		formObj.csr_apro.value = "B1";
		return;
	}
	formObj.csr_apro.value = "A0";
}
 //Set checkbox Sts_set
function checkStsSet() {
	var formObj=document.frm1;
	var sts_set = formObj.sts_set.value;
	if(sts_set == "A0" || sts_set == "null" || sts_set =="") {
		formObj.st_step_sts_set[0].checked = false;
		formObj.st_step_sts_set[1].checked = false;
		formObj.st_step_sts_set[2].checked = false;
		formObj.next_step_bk_cf.checked = false;
		formObj.i_sts_set.checked = false;
		return;
	} else if(sts_set == "A1"){
		formObj.st_step_sts_set[0].checked = true;
		formObj.next_step_bk_cf.checked = false;
		return;
	} else if(sts_set == "B1"){
		formObj.st_step_sts_set[1].checked = true;
		formObj.next_step_bk_cf.checked = false;
		return;
	} else if(sts_set == "C1"){
		formObj.st_step_sts_set[2].checked = true;
		formObj.next_step_bk_cf.checked = false;
		return;
	} else if(sts_set == "A2"){
		formObj.next_step_bk_cf.checked = true;
		formObj.nd_step_sts_set[0].checked = true;
		formObj.nd_step_sts_set[0].disabled = false;
		formObj.nd_step_sts_set[1].disabled = false;
		formObj.st_step_sts_set[1].disabled = true;
		formObj.st_step_sts_set[2].disabled = true;
		formObj.st_step_sts_set[0].checked = true;
		return;
	} else if(sts_set == "A3"){
		formObj.next_step_bk_cf.checked = true;
		formObj.nd_step_sts_set[1].checked = true;
		formObj.nd_step_sts_set[0].disabled = false;
		formObj.nd_step_sts_set[1].disabled = false;
		formObj.st_step_sts_set[1].disabled = true;
		formObj.st_step_sts_set[2].disabled = true;
		formObj.st_step_sts_set[0].checked = true;
		return;
	}
}

// Set checkbox NO_MBL
function checkNoMbl() {
	var formObj=document.frm1;
	var no_mbl = formObj.no_mbl.value;
	if(no_mbl == "A0" || no_mbl == "null" || no_mbl =="") {
		formObj.hbl_crt_wt_mbl.checked = false;
		formObj.crt_inv_hbl.checked = false;
		formObj.crt_inv_hbl.disabled = true;
		return;
	} else if(no_mbl == "A1"){
		formObj.hbl_crt_wt_mbl.checked = true;
		formObj.crt_inv_hbl.checked = false;
		formObj.crt_inv_hbl.disabled = false;
		return;
	} else if(no_mbl == "A2"){
		formObj.hbl_crt_wt_mbl.checked = true;
		formObj.crt_inv_hbl.checked = true;
		formObj.crt_inv_hbl.disabled = false;
		return;
	}
}

//Set checkbox CRE_HBL_FLG
/*
function checkCreHblFlg() {
	var formObj=document.frm1;
	var cre_hbl_flg = formObj.cre_hbl_flg.value;
	if(cre_hbl_flg == "A0" || cre_hbl_flg == "null" || cre_hbl_flg =="") {
		formObj.hbl_creation.checked = false;
		return;
	} else if(cre_hbl_flg == "A1"){
		formObj.hbl_creation.checked = true;
		return;
	}
}
*/

//Set checkbox PRN_CRE_INV
function checkPrnCreInv() {
	var formObj=document.frm1;
	var prn_cre_inv = formObj.prn_cre_inv.value;
	if(prn_cre_inv == "A0" || prn_cre_inv == "null" || prn_cre_inv =="") {
		formObj.crt_inv_by_clk_prt.checked = false;
		return;
	} else if(prn_cre_inv == "A1"){
		formObj.crt_inv_by_clk_prt.checked = true;
		return;
	}
}

//Set checkbox Prn_Cre_Inv
function checkInvApro() {
	var formObj=document.frm1;
	var inv_apro = formObj.inv_apro.value;
	if(inv_apro == "A0" || inv_apro == "null" || inv_apro =="") {
		//formObj.i_inv_apro.checked = false;
		formObj.st_inv_apro[0].checked = false;
		formObj.st_inv_apro[1].checked = false;
		formObj.nd_inv_apro[0].checked = false;
		formObj.nd_inv_apro[1].checked = false;
		return;
	} else if(inv_apro == "A1"){
		formObj.st_inv_apro[0].checked = true;
		formObj.nd_inv_apro[0].checked = true;
		return;
	} else if(inv_apro == "A2"){
		formObj.st_inv_apro[0].checked = true;
		formObj.nd_inv_apro[1].checked = true;
		return;
	} else if(inv_apro == "B1"){
		formObj.st_inv_apro[1].checked = true;
		return;
	}
}
//Set checkbox CSR_APRO
function checkCsrApro() {
	var formObj=document.frm1;
	var csr_apro = formObj.csr_apro.value;
	if(csr_apro == "A0" || csr_apro == "null" || csr_apro == "") {
		formObj.st_csr_apro[0].checked = false;
		formObj.st_csr_apro[1].checked = false;
		//formObj.i_csr_apro.checked = false;
		return;
	} else if(csr_apro == "A1"){
		formObj.st_csr_apro[0].checked = true;
		formObj.st_csr_apro[1].checked = false;
		return;
	} else if(csr_apro == "B1"){
		formObj.st_csr_apro[0].checked = false;
		formObj.st_csr_apro[1].checked = true;
		return;
	}
}
function modifyTab1(formObj) {
	if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
		//useFlgChange();
		if(formObj.i_use_flg.checked){
			formObj.i_use_flg.value="Y";
		} else{
			formObj.i_use_flg.value="N";
		}
		
		if(formObj.i_company_flg.checked){
			formObj.i_company_flg.value="Y";
		} else {
			formObj.i_company_flg.value="N";
		}
		
		if(formObj.i_use_hbl_ser.checked){
			formObj.i_use_hbl_ser.value="Y";
		} else{
			formObj.i_use_hbl_ser.value="N";
		}	
		
		if(formObj.i_pps_use_flg.checked){
			formObj.i_pps_use_flg.value="Y";
		} else{
			formObj.i_pps_use_flg.value="N";
		}
		if(formObj.i_ctf_use_flg.checked){
			formObj.i_ctf_use_flg.value="Y";
		} else{
			formObj.i_ctf_use_flg.value="N";
		}
		if(formObj.i_cf_use_flg.checked){
			formObj.i_cf_use_flg.value="Y";
		} else {
			formObj.i_cf_use_flg.value="N";
		}
		
		if(GROSS_METHOD_IN_DC == "N"){
			formObj.i_gl_agent_ap.value = formObj.i_gl_agent_ar.value;
		}
		
		formObj.f_cmd.value=MODIFY01;
		
		formObj.logo_square_upload_yn.value = formObj.logo_square.value;
		formObj.logo_rectangle_upload_yn.value = formObj.logo_rectangle.value;
		formObj.logo_sub_upload_yn.value = formObj.logo_sub.value;
		
		//#52013 [CLC] Stamp Watermark 기능 
		formObj.stamp_normal_upload_yn.value = formObj.stamp_normal.value;
		formObj.stamp_guarantee_upload_yn.value = formObj.stamp_guarantee.value;
	}
}

//Modify Office Code in Basis Setting tab
function modifyTab2(formObj){
	if (confirm(getLabel('FMS_COM_CFMSAV'))) {
		setStsSet();
		setNoMbl();
		setCreateHblFlg();
		setPrnCreInv();
		setInvApro();
		setCsrApro();
		formObj.f_cmd.value=MODIFY02;
	}
}

