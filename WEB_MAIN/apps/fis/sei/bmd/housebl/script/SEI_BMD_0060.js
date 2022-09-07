/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEI_BMD_0060.jsp
*@FileTitle  : House B/L Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/10
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var USE_CFS_FIELDS = "N";
var USE_FAX_MAIL = "N";
var delete_show_msg = "N";
var isPdOrdStsOk=false;
var isInvStsOk=false;
var addAnEmlTitleInfoFlg = false;
var VALIDATE_RELEASE_DATE='N';//OFVFOUR-7214:[BNX-TOR] The alert message for RELEASED DATE
var checkReleasedDate=false;
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(document.frm1.f_strdt, 180, document.frm1.f_enddt, 60);
}
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj4=docObjects[2];
	formObj.f_cn_cp.value = "";
	//OFVFOUR-7214:[BNX-TOR] The alert message for RELEASED DATE
	if(VALIDATE_RELEASE_DATE=='Y' && (srcName == 'DELIVERY_ORDER' || srcName == 'RELEASE_ORDER')){
		ajaxSendPost(setValidateReleaseFlg, 'reqVal', '&goWhere=aj&bcKey=validateReleasedDate&f_intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq")+"&biz_clss_cd=H&air_sea_clss_cd=S&bnd_clss_cd=I&air_biz_clss_cd=SI", './GateServlet.gsl');
		if(checkReleasedDate){
			if(!confirm(getLabel('SEA_COM_ALT043'))){
				return;
			}
		}
	}
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		sheetObj2.RemoveAll();
    	   		sheetObj4.RemoveAll();
    	   		if(!formValidation()) return;
    	   		searchValueSet();
			    if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value=SEARCHLIST01;
			   		
	   				var dateValidFlag = true;
	   				var searchConditions = document.getElementsByClassName('search_form');
	   				var allEmpty = true;
	   				for(var q=0; q<searchConditions.length; q++){
	   					if("" != searchConditions[q].value)
	   						allEmpty = false;
	   				}	
	   				//#5183 [BINEX] AFTER V470.06 RELEASE, CANT SEARCH W FILING # & ETD TOGETHER
	   			    //검색 date Backup 
	   				var tempStrdt = formObj.f_strdt.value;
					var	tempEnddt = formObj.f_enddt.value;
					
	   				if("Y" == initDatLod){
	   					if(loadSearchFlag 
	   							&& "" == formObj.f_ref_no.value
	   							&& "" == formObj.f_mbl_no.value
	   							&& "" == formObj.f_hbl_no.value
	   							){
	   						if("" == formObj.f_strdt.value && "" == formObj.f_enddt.value && allEmpty == false){
		   						formObj.f_strdt.value = dtFm;
		   						formObj.f_enddt.value = dtTo;
	   						}
	   					}else
	   					if("" != formObj.f_ref_no.value || "" != formObj.f_mbl_no.value || "" != formObj.f_hbl_no.value){
	   						/* binex 요구로 검색 기간 까지 검색되도록 수정
	   						formObj.f_strdt.value = "";
	   						formObj.f_enddt.value = "";
	   						dateValidFlag = false; */
	   					}
	   					if(dateValidFlag){
		   					if(chkCmprPrdSc(formObj.f_strdt, formObj.f_enddt)){
			   					sheetObj1.DoSearch("./SEI_BMD_0060GS.clt", FormQueryString(formObj) );
						   		//Log Monitor Start
						   		gLogMonitor();
				   	 			//Log Monitor End
		   					}
	   					}else{
		   					sheetObj1.DoSearch("./SEI_BMD_0060GS.clt", FormQueryString(formObj) );
					   		//Log Monitor Start
					   		gLogMonitor();
			   	 			//Log Monitor End
					   		
					   		//#5183 [BINEX] AFTER V470.06 RELEASE, CANT SEARCH W FILING # & ETD TOGETHER
	   						//이전 검색 date 세팅
					   		/* binex 요구로 검색 기간 까지 검색되도록 수정
	   						formObj.f_strdt.value = tempStrdt;
	   						formObj.f_enddt.value = tempEnddt; */
	   					}
	   				}
	   				loadSearchFlag = true;
	   				initDatLod = "Y";
			    }
			    break;
           	case "NEW":
           		parent.mkNewFrame('House B/L Entry', './SEI_BMD_0020.clt');
           		break;
           	case "HBLCLS":
           		var ckRow=sheetObj1.FindCheckedRow('cls_check');
           		if(ckRow==''){
           			//Please checked the [Sel.] column!
           			alert(getLabel('FMS_COM_ALT004'));
           		}
           		else{
           			//'Do you want to close HBL?')){
           			if(confirm(getLabel('FMS_COM_CFMCLS'))){
           				frm1.f_cmd.value=COMMAND01;
    			    	sheetObj1.DoSave("./SEI_BMD_0060GS.clt", FormQueryString(formObj), "ibflag", false);
           			}
           		}
           		break;
           	case "HBLUNCNF":
           		var ckRow=sheetObj1.FindCheckedRow('cls_check');
           		if(ckRow==''){
           			//'Please checked the [Sel.] column!');
           			alert(getLabel('FMS_COM_ALT004'));
           		}
           		else{
           			if(confirm(getLabel('FMS_COM_CFMCAN'))){
           				frm1.f_cmd.value=COMMAND02;
    			    	sheetObj1.DoSave("./SEI_BMD_0060GS.clt", FormQueryString(formObj), "ibflag", false);
           			}
           		}
           		break;
           	case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "POL_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,500,"yes");
		   		
    	        break;
           	case "POR_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "POR_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,500,"yes");
		   		
    	        break;
           	case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		//2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "POD_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	         
    	        break;
           	case "DEL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "DEL_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	         
    	        break;
    	    // #4412 [Great Luck] Missing Search Condition (compared to v461)
           	case "DEST_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		callBackFunc = "DEST_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	         
    	        break;
           	case "PRNR_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "PRNR_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	                     
	   	        break;
           	case "CNEE_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "CNEE_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		             
	   	 		break;
           	case "ASHIP_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "ASHIP_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		             
	   	 		break;
	   	 	//#1327 [OCEAN BLUE] CUSTOM BROKER SEARCH FIELD ADD TO IMPORT HBL LIST	
           	case "CUST_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "CUST_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		             
	   	 		break;
           	case "NTFY_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   	 	rtnary=new Array(1);
		   	 	rtnary[0]="1";
		   	 	// 2011.12.27 value parameter
		   	 	if(typeof(valObj)!='undefined'){
		   	 		rtnary[1]=valObj;
		   	 	}
		   	 	else{
		   	 		rtnary[1]="";
		   	 	}
		   	 	rtnary[2]=window;
		   	 	callBackFunc = "NTFY_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		   	 	            
		   	 	break;
           	case "CFS_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   	 	rtnary=new Array(1);
		   	 	rtnary[0]="1";
		   	 	// 2011.12.27 value parameter
		   	 	if(typeof(valObj)!='undefined'){
		   	 		rtnary[1]=valObj;
		   	 	}
		   	 	else{
		   	 		rtnary[1]="";
		   	 	}
		   	 	rtnary[2]=window;
		   	 	callBackFunc = "CFS_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt?iata_cd=Y', rtnary, 1150,650,"yes");
		   		
		   	 	             
		   	 	break;
//	   	 	case "Print":
////	   	 		var param = "bkg_no=" + formObj.f_bkg_no.value;
//	   	 		var param = "&hbl_no=" + formObj.f_hbl_no.value;
//	   	 		param += "&hbl_tp_cd=" + formObj.f_hbl_tp_cd.value;
//	   	 		param += "&ofc_cd=" + formObj.f_ofc_cd.value;
////	   	 		param += "&lnr_bkg_no=" + formObj.f_lnr_bkg_no.value;
////	   	 		param += "&sr_no=" + formObj.f_sr_no.value;
//	   	 		param += "&mbl_no=" + formObj.f_mbl_no.value;
//	   	 		param += "&obrd_dt_strdt=" + formObj.eta_strdt.value;
//	   	 		param += "&obrd_dt_enddt=" + formObj.eta_enddt.value;
//	   	 		param += "&pol_cd=" + formObj.f_pol_cd.value;
//	   	 		param += "&pod_cd=" + formObj.f_pod_cd.value;
//	   	 		
//	   	 		param += "&cmd_type=2";
//	   	 		param += "&title=H B/L List";
//	   	 		
//	   	 		window.showModalDialog('RPT_PRN_0010.clt?'+param, [],'dialogWidth:1025px; dialogHeight:740px');
//	   	 	break;
	   	 	case "ArrivalNotice":
				if(sheetObj1.RowCount()== 0){
					//There is no data
					alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var filingNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "ref_no");
					var mblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "mbl_no");					
					var reqParam='?intg_bl_seq=' + intgBlSeq;
					reqParam += '&hbl_no=' + encodeURIComponent(hblNo);
					reqParam += '&filing_no=' + encodeURIComponent(filingNo);
					reqParam += '&mbl_no=' + encodeURIComponent(mblNo);
					reqParam += '&air_sea_tp=' + "S";
					reqParam += '&cgor_pic_info=' + oi_cgor_pic_info;					
					reqParam += '&mailTitle=' + 'ARRIVAL NOTICE / INVOICE ';					
	         		reqParam += '&mailTo=' + mailTo;
					popGET('RPT_PRN_0140.clt'+reqParam, '', 480, 310, "scroll:yes;status:no;help:no;");
				}
				break;
	   	 	case "PreliminaryClaim":
				if(sheetObj1.RowCount()== 0){
					//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					var sRow=sheetObj1.GetSelectRow();
					var reqParam='?air_sea_tp=' + 'S';
					reqParam += '&intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
					reqParam += '&hbl_no=' + encodeURIComponent(sheetObj1.GetCellValue(sRow, "bl_no"));
					reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
					reqParam += '&cgor_pic_info=' + oi_cgor_pic_info;
					popGET('RPT_PRN_0230.clt'+reqParam, '', 620, 565, "scroll:yes;status:no;help:no;");
				}
				break;		
	   	 	case "CCN":
	   	 		if(sheetObj1.RowCount()== 0){
	   	 			//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 		}
	   	 		else{
		   	 		printHouseCcn();
	   	 		}
	   	 		break;
	   	 	case "DELIVERY_ORDER":
				if(sheetObj1.RowCount()== 0){
					//There is no data
					alert(getLabel('FMS_COM_ALT004'));
				}else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
					var liner_trdp_nm=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "act_trdp_nm");
					var trk_trdp_cd=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "trk_trdp_cd");
					var trk_trdp_nm=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "trk_trdp_nm");
					var cne_trdp_cd=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cne_trdp_cd");
					
					var cntrNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cntr_no");
					
					var reqParam='?intg_bl_seq=' + intgBlSeq;
					reqParam += '&f_bl_no=' + hblNo;
					reqParam += '&cust_ref_no=' + encodeURIComponent(custRefNo);
					reqParam += '&liner_trdp_nm=' + encodeURIComponent(liner_trdp_nm);
					reqParam += '&air_sea_clss_cd=S';
					reqParam += '&biz_clss_cd=H';
					reqParam += '&bnd_clss_cd=I';
					reqParam += '&trsp_trdp_cd='+encodeURIComponent(trk_trdp_cd) ;
					reqParam += '&trsp_trdp_nm='+encodeURIComponent(trk_trdp_nm);
					reqParam += '&dest_rout_trdp_cd='+cne_trdp_cd;
					reqParam += '&mrd_file_nm=delivery_order_01.mrd';
					
					reqParam += '&f_cntr_no='+encodeURIComponent(cntrNo);
					
					popGET('CMM_POP_0320.clt'+reqParam, '', 700, 750, "scroll:yes;status:no;help:no;");
				}
				break;
	   	 	case "RELEASE_ORDER":
				if(sheetObj1.RowCount()== 0){
					//There is no data
					alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
					var reqParam='';
					reqParam += '?s_intg_bl_seq=' + intgBlSeq;
					reqParam += '&f_bl_no=' + hblNo;
					reqParam += '&cust_ref_no=' + custRefNo;
					popGET('SEI_DOC_1080.clt'+reqParam, '', 600, 478, "scroll:yes;status:no;help:no;");
				}
				break;
	   	 	case "P_O_D":
	   	 		if(sheetObj1.RowCount()== 0){
	   	 			//There is no data
					alert(getLabel('FMS_COM_ALT004'));
	   	 		}
	   	 		else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
	   	 			var reqParam='';
	   	 			reqParam += '?s_intg_bl_seq=' + intgBlSeq;
	   	 			reqParam += '&f_bl_no=' + hblNo;
	   	 			reqParam += '&cust_ref_no=' + custRefNo;
	   	 			popGET('SEE_BMD_0062.clt'+reqParam, '', 600, 660, "scroll:yes;status:no;help:no;");
	   	 		}
	   	 		break;
	   	 	case "USDA_HOLD_NOTICE":
		   	 	if(sheetObj1.RowCount()== 0){
	   	 			//There is no data
					alert(getLabel('FMS_COM_ALT004'));
	   	 		}
	   	 		else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
					var cne_trdp_cd=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cne_trdp_cd");
					var ntfy_trdp_cd=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "ntfy_trdp_cd");
					var cust_trdp_cd=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_trdp_cd"); //broker
	   	 			var reqParam='';
	   	 			reqParam += '?s_intg_bl_seq=' + intgBlSeq;
	   	 			reqParam += '&f_bl_no=' + hblNo;
	   	 			reqParam += '&cust_ref_no=' + custRefNo;
	   	 			reqParam += '&cne_trdp_cd=' + cne_trdp_cd;
	   	 			reqParam += '&ntfy_trdp_cd=' + ntfy_trdp_cd;
	   	 			reqParam += '&cust_trdp_cd=' + cust_trdp_cd;
	   	 			popGET('SEE_BMD_0064.clt'+reqParam, '', 600, 590, "scroll:yes;status:no;help:no;");
	   	 		}

	   	 		break;
	   	 	case "ITNTE":
				if(sheetObj1.RowCount()== 0){
					//There is no data
					alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var reqParam='?intg_bl_seq=' + intgBlSeq;
					reqParam += '&hbl_no=' + hblNo;
					reqParam += '&f_ofc_cd=' + formObj.f_ofc_cd.value;					
					reqParam += '&air_sea_tp=' + "S";
					popGET('RPT_PRN_0170.clt'+reqParam, '', 480, 115, "scroll:yes;status:no;help:no;");
				}
				break;
	   	 	case 'CERTIFICATE':
	   			//프린트
	   			var formObj=document.frm1;
	   			formObj.file_name.value="carrier_certificate_01.mrd";
	   			formObj.title.value="Carrier's Certificate";
	   			// Parameter Setting
	   			var param='';
	   			param += '[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") + ']'; // $1
	   			param += '[S]';
	   			formObj.rd_param.value=param;
	   			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
	   			formObj.rpt_intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	   			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   			break;
	   	 	case "PROFIT_REPORT":
		   	 	if(sheetObj1.GetSelectRow()== 0){
		   	 		//There is no data
					alert(getLabel('FMS_COM_ALT004'));
				}
		   	 	else{
					var sRow=sheetObj1.GetSelectRow();
						var reqParam='?intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
						reqParam += '&hbl_no=' + sheetObj1.GetCellValue(sRow, "bl_no");
						reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
						reqParam += '&air_sea_clss_cd=' + "S";
						reqParam += '&bnd_clss_cd=' + "I";
						reqParam += '&biz_clss_cd=' + "H";
						reqParam += '&mbl_no=' + sheetObj1.GetCellValue(sRow, "mbl_no");
					popGET('RPT_PRN_0200.clt'+reqParam, '', 1100, 750, "scroll:yes;status:no;help:no;");
				}
		   	 	break;	
	   	 	case "GOTOACCT":
	   	 		if(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no')!='-1'){
	   	 		var formObj=document.frm1;
	   		   	var paramStr="./ACC_INV_0040.clt?";
	   		   	//#34054 [BINEX]B/L List/Entry 에서 AR/AP List Link
	   		   	paramStr+= 'f_mhbl_no=' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no')
	   		   		+"&s_intg_bl_seq="+sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'intg_bl_seq')
	   		   		+"&f_ref_no="+sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no');
	   		   	paramStr+= "&refType=fileNo";
	   		   	paramStr+= "&linkFlag=Y&blType=HBL";
	   		   	
	   		   	//#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : Link시 검색기간 제외 조회 옵션처리
				paramStr+= "&linkOpt=KEY";
				// OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
				paramStr+= "&f_air_sea_clss_cd=S&f_bnd_clss_cd=I";
				
	   		   	parent.mkNewFrame('Invoice List', paramStr);

	   	 		}
	   	 		break;
	   	 	case "GOTOVERIFY":
	   	 		if(sheetObj1.GetTotalRows()== 0){
	   	 			//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 		} else {
	   	 			var formObj=document.frm1;
	   	 			var paramStr="./ACC_INV_0130.clt?";
	   	 			paramStr+= "&p_hbl_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no');
	   	 			//paramStr+= "&p_date=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'post_dt');
	   	 			paramStr+= "&p_bnd_clss_cd=" + "I";
	   	 			paramStr+= "&p_biz_clss_cd=" + "H";
	   	 			parent.mkNewFrame('Payment Verification', paramStr);
	   	 		}
  	 		break;
	   	 	case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		 	rtnary=new Array(2);
		   		rtnary[0]="1";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		callBackFunc = "COMMODITY_POPLIST";
		   		modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
		   		
		   		break;
	   	 	case "EXCEL":
		   	 	if(docObjects[0].RowCount() < 1){//no data	
		   			ComShowCodeMessage("COM132501");
		   		}else{
		   			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
//		   	 		docObjects[0].Down2Excel({ HiddenColumn:true});
		   		}
	   	 		break;
	   	 	/*Vinh.Vo (S) - 04/14/2015 */
		   	 case "EXCEL_ALL":
		        	excelDown(sheet1);
		        break;
		     /*Vinh.Vo (E)*/
	   	 	case "HBL_COPY":
	   	 		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
	   	 			//Select Please.
		   	 		alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	    		}
		   	 	else{
	    			if(confirm(getLabel('FMS_COM_CFMCPY'))){
	   	 				var paramStr="./SEI_BMD_0020.clt?";
	   	 				paramStr+= "f_cmd=" + COMMAND05;
	   	 				paramStr+= "&intg_bl_seq=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	   	 				parent.mkNewFrame('House B/L Entry', paramStr);
	   	 			}
	    		}
		   	 	break;
	   	 	case "DELETE":
	   	 		
	   	 		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
	   	 		var ref_ofc_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ref_ofc_cd");
	   	 		
	   	 		//alert(edob_flg + " "+ofc_cd+" "+ref_ofc_cd);
		   	 	var btnflag = "Y";
				if (edob_flg == "N"){
					if (ofc_cd != ref_ofc_cd){  
						btnflag = "N";
					}
				}  
				if (btnflag == "Y"){ 
				}else{
					alert(getLabel('FMS_COM_ALT084'));
					return;
				}
				
				//BLOCK 체크한다.
				var block_flg = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "block_flag");
				if(block_flg == "Y"){
					alert(getLabel('FMS_COM_ALT115'));
		     	    return;
				}
				
	   	 		ajaxSendPost(checkBlInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckInv&intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq"), './GateServlet.gsl');
	   	 		if(isInvStsOk){
	   	 			
	   	 			// wo 생성 유무를 체크한다.
			      	ajaxSendPost(checkBlPdOrd, 'reqVal', '&goWhere=aj&bcKey=getCheckPdOrd&intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq"), './GateServlet.gsl');
			      	if(isPdOrdStsOk){
		      	      alert(getLabel('FMS_COM_ALT113'));
		      	      return;
			      	}
	   	 			
	   	 			//'Do you want to delete?')){
	   	 			if(confirm(getLabel('FMS_COM_CFMDEL'))){
	   	 				frm1.f_cmd.value=REMOVE;
						frm1.intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
						frm1.rlt_intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "rlt_intg_bl_seq");
						delete_show_msg = "Y";
						docObjects[0].DoSearch("./SEI_BMD_0060GS.clt", FormQueryString(formObj) );
	   	 			}
	   	 		}
	   	 		else{
	   	 			//You Cannot delete HB/L. Because Invoice was already Issued.
	   	 			alert(getLabel('FMS_COM_ALT022'));
	   	 			return;
	   	 		}
	   	 		
	   	 	
	   	 		
	   	 		break;
	   	 	case "SNDEML":	//Email전송
	   	 		var reqParam='?intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	       		reqParam += '&openMean=SEARCH01';
	   	   		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
	   	   		break;
	   	 	case "MBL_LIST":
				var refNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'ref_no');
				var mblNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'mbl_no');
			   	var paramStr="./SEI_BMD_0070.clt?";
			   	paramStr+= 'f_ref_no=' + refNo + '&f_mbl_no=' + mblNo;
			   	paramStr += "&linkFlag=Y";
			   	parent.mkNewFrame('Master B/L List', paramStr);
			   	break;
		     case "WORK_ORDER":	//Work Order 화면호출
		    	if(docObjects[0].RowCount()== 0 || docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
		   	 		//Select Please.
			   	 	alert(getLabel('FMS_COM_ALT004'));
		   	 		return;
		    	}
		    	 /*
		    	 var param='f_intg_bl_seq=' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
			  		param += '&air_sea_clss_cd=S'; 
			   		param += '&bnd_clss_cd=I';
			   		param += '&biz_clss_cd=H';
	            var paramStr="./AIC_WOM_0013.clt?f_cmd="+SEARCH01+"&s_type=B&"+param;
	            parent.mkNewFrame('Pick/Delivery Instruction', paramStr);
	            */
		    	var paramStr="./AIC_WOM_0013.clt?air_sea_clss_cd=S&bnd_clss_cd=I&biz_clss_cd=H";
           		var param = "&f_cmd=" + SEARCH01;
           		param += "&s_type=B";
           		param += "&f_intg_bl_seq="  + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
           		parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
                break;
				/* #18782 [BINEX, GPL] OBL RCV and Release update function (From BL List) jsjang 2013.9.14  */
		        case "MODIFY":	//값 수정
			        	
			   	 		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			   	 		var ref_ofc_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ref_ofc_cd");
			   	 		
			   	 		//alert(edob_flg + " "+ofc_cd+" "+ref_ofc_cd);
				   	 	var btnflag = "Y";
						if (edob_flg == "N"){
							if (ofc_cd != ref_ofc_cd){  
								btnflag = "N";
							}
						}  
						if (btnflag == "Y"){ 
						}else{
							alert(getLabel('FMS_COM_ALT083'));
							return;
						}

					
					   frm1.f_cmd.value=MODIFY;
					   if(formObj.r_intg_bl_seq.value == "")
					   {
						   alert(getLabel('FMS_COM_ALT049'));
						   return;
					   }
					   //alert(frm1.f_rlsd_dt_tm.value);
			           if(confirm(getLabel('FMS_COM_CFMSAV'))){
			        	   //formObj.f_intg_bl_seq.value = removeComma(formObj.s_amt_fr.value);
			               //formObj.s_amt_to.value = removeComma(formObj.s_amt_to.value);
			        	   //docObjects[0].DoAllSave("./SEI_BMD_0060GS.clt", FormQueryString(frm1), true);
			        	   docObjects[0].DoSave("./SEI_BMD_0060GS.clt", FormQueryString(frm1),"ibflag", false);
			        	   //doWork('SEARCHLIST');
			           }
				break;
			   	/* #20962, Log history, jsjang 2013.10.11 */
		   	 	case "LOG":
			   	 	if(sheetObj1.GetTotalRows()== 0){
			   	 		//There is no data
		   				alert(getLabel('FMS_COM_ALT004'));
					}
			   	 	else{
						var sRow=sheetObj1.GetSelectRow();
						var reqParam='?s_bl_inv=' + sheetObj1.GetCellValue(sRow, "bl_no");
							//reqParam += '&s_bl_inv=' + sheetObj1.CellValue(sRow, "bl_no");
							reqParam += '&f_his_type=' + "";
							//reqParam += '&his_call_view=' + "B/L Print";
							reqParam += '&f_cmd=' + "11";
							reqParam += '&p_gb=' + "POP";
							//reqParam += '&biz_clss_cd=' + "H";
							//reqParam += '&mbl_no=' + sheetObj1.CellValue(sRow, "mbl_no");
							//formObj.f_cmd.value = -1;
							popGET('MGT_HIS_0041.clt'+reqParam, '', 1240, 670, "scroll:yes;status:no;help:no;");
					}
			   	 	break;
		   	 	case "OPR_POPLIST":
		   	    	rtnary =new Array(1);
			   		rtnary[0]="1";
			   		callBackFunc = "OPR_POPLIST";
					modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
			   	break;
			   	
			   	//#50591 [BNX TORONTO] FREIGHT LOCATION인 RAIL 회사인 CN과 CP의 CONTAINER LIST 및 EXCEL 다운로드 화면 추가
	    	   	case "CN":  
	    	 	case "CP": 
	    	   		if(!formValidation()) return;
				    if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
				    	formObj.f_cmd.value=SEARCHLIST04;
				    	formObj.f_cn_cp.value=srcName;  
				    	//alert(formObj.f_cn_cp.value); 
				    	docObjects[3].DoSearch("./SEI_BMD_0060_4GS.clt", FormQueryString(formObj) );  
				    }
				    break;
		   	 	case "CARGO_TRACKING":
			   	 	if(sheetObj1.GetTotalRows()== 0){
			   	 		//There is no data
		   				alert(getLabel('FMS_COM_ALT004'));
			   	 	}
			   	 	else{
						var blNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "mbl_no");
						var liner=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "lnr_trdp_nm");
			   	 		var preBlNo=blNo.substring(0,4);
			   	 		var popLink="";
			   	 		var reqParam=""; 
			   	 		/* jsjang 2013.8.20 #19202 carrier link */
			   	 		var cntrNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cntr_no");
			   	 		
			   	 		
			   	 		//#998 [SHINE] TRACK-TRACE 기능 Container No. 로 조회 추가
			   	 		if( ComIsNull(blNo) && ComIsNull(cntrNo))
			   	 		{
			   	 			alert(getLabel('FMS_COM_ALT051'));
			   	 		}else{
			   	 			
			   	 			var param='intg_bl_seq=' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
			   	 			param += '&air_sea_clss_cd=S';
			   	 			param += '&bnd_clss_cd=I';
			   	 			param += '&biz_clss_cd=H';
			   	 			param += '&bl_no='+blNo;
			   	 			var paramStr="./SEE_BMD_0600.clt?f_cmd="+SEARCHLIST+"&s_type=B&"+param;
			   	 			parent.mkNewFrame('Tracking', paramStr);
			   	 		}			   	 		
			   	 		
			   	 		
			   	 		
			   	 	    /* 주석#998 [SHINE] TRACK-TRACE 기능 Container No. 로 조회 추가
		   	 			// jsjang 2013.9.11 #20775 carrier link - MBL 
			   	 		if(blNo == '' || blNo == null)
			   	 		{		   	 		
				   	 		if(cntrNo == '' || cntrNo == null)
				   	 		{
					   	 		alert(getLabel('FMS_COM_ALT051'));		   	 			
				   	 		}else{		   	 		
				   	 			
//					   	 		if(preBlNo == "HJSC"){
//					   	 			popLink="http://www.hanjin.com/hanjin/CUP_HOM_3301.do?trakNoTpCdParam=B";
//					   	 			reqParam="&trakNoParam=" + blNo.substring(4);
//					   	 		}
//					   	 		else if(preBlNo == "NYKS"){
//					   	 			popLink="http://www2.nykline.com/ct/searchForm.nyk";
//					   	 		}
//					   	 		else if(preBlNo == "HDMU"){
//					   	 			popLink="http://www.hmm21.com/otherSites/mobile/main.jsp";
//					   	 		}
//					   	 		else if(preBlNo == "MAEU"){
//					   	 			popLink="http://www.maerskline.com/appmanager/maerskline/public?_nfpb=true&_nfls=false&_pageLabel=page_tracking3_trackSimple";
//					   	 		}
//					   	 		else if(preBlNo == "KKLU"){
//					   	 			popLink="http://app2.kline.com/GctApp/search?id=tracker";
//					   	 		}
//					   	 		else if(preBlNo.substring(0,3) == "YHU"){
//					   	 			popLink="http://www.yml.com.tw/track_trace/track_trace_cargo_tracking.asp";
//					   	 		}
//					   	 		else if(preBlNo == "EGLV"){
//					   	 			popLink="http://www.shipmentlink.com/servlet/TDB1_CargoTracking.do";
//					   	 		}
//					   	 		else if(preBlNo == "OOLU"){
//					   	 			popLink="http//www.oocl.com/eng/ourservices/eservices/cargotracking/Pages/cargotracking.aspx";
//					   	 		}
//					   	 		else{
//					   	 			popLink="http://www.track-trace.com/container";
//					   	 		}
					   	 		
					   	 		// jsjang 2013.8.20 #19202 carrier link 
					   	 		popLink='http://connect.track-trace.com/for/opus/container/'+cntrNo+'/action,direct';
					   	 		window.open(popLink + reqParam, "_blank");
			//					popGET(popLink + reqParam, '', 480, 500, "scroll:yes;status:no;help:no;");
				   	 		}
			   	 		}else{
				   	 		popLink='http://connect.track-trace.com/for/opus/billoflading/'+blNo+'/action,direct';
				   	 		window.open(popLink + reqParam, "_blank");
			   	 		}*/				   	 		
					}
			   	 	break;
			   	 	
			   	//#2177 [ACROCARGO] OCEAN IMPORT DISCLAIMER / GUARANTEE OF CHARGES
		   	 	case "DISCLAIMER":
					if(sheetObj1.RowCount()== 0){
						//There is no data
		   				alert(getLabel('FMS_COM_ALT004'));
					}
					else{
						var sRow=sheetObj1.GetSelectRow();
						var reqParam='?intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
						reqParam += '&hbl_no=' + encodeURIComponent(sheetObj1.GetCellValue(sRow, "bl_no"));
						reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
						reqParam += '&ref_ofc_cd=' + sheetObj1.GetCellValue(sRow, "ref_ofc_cd");
						popGET('RPT_PRN_0270.clt'+reqParam, '', 720, 565, "scroll:yes;status:no;help:no;");
					}
					break;	
					// #5394 : [BNX Toronto] GUARANTEE OF CHARGES (GOC) LETTER 
		   	 	case "GOC":
		   	 		var param = "";
		   	 		var sRow=sheetObj1.GetSelectRow();
		   	 	    	param ='[' + sheetObj1.GetCellValue(sRow, "intg_bl_seq") + ']';	//[1]	
		   	 	    	param += '[' + ofc_cd + ']';	//[2]	
		   	 	    formObj.file_name.value = 'GURANTEE_BNX.mrd';	
		   	 	    formObj.rd_param.value = param;
		   	 	    popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   	 		break;

				    
        } // end switch
		
		//Log Monitor Start:Btn
		if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
		//Log Monitor End:Btn
		
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
function OPR_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.opr_usrid.value=rtnValAry[0];
		formObj.opr_usrnm.value=rtnValAry[1];
		formObj.opr_ofc_cd.value=rtnValAry[2];
		formObj.opr_dept_cd.value=rtnValAry[3];
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
	    case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.f_strdt,  formObj.f_enddt,  'MM-dd-yyyy');
	    break;
    }
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var setSubBlNoText = "";
//#6837 : [JAPT] B/L Type column add request on BL List
var COMBOBLTypeTEXT = ' |';
var COMBOBLTypeCODE = ' |';
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
var obl_decimal_len = "";
function loadPage() { 
	
	var formObj=document.frm1;
	
	var opt_key = "USE_CFS_FIELDS";
    ajaxSendPost(setUseCfsFieldsReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	setCondition("R", formObj.f_date_type, formObj.f_strdt, formObj.f_enddt);
	
    
    var opt_key_s = "AN_FIRST_SEND_DATE";
    ajaxSendPost(setAnFaxMailFiled, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_s, "./GateServlet.gsl");
    
	//	개인정보 관리화면 정렬순서 2016.03 
	ajaxSendPost(setOrderByInfo, 'reqVal','&goWhere=aj&bcKey=searchTbUserOrderbyInfoAttr&pgm_usr_id='+formObj.user_id.value+'&pgm_url=./SEI_BMD_0060.clt',	'./GateServlet.gsl');
    
	//$438 subBlNo 옵션처리
    var opt_key = "TITLE_SUB_BL_NO";
    ajaxSendPost(setSubBLNo, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
    //OFVFOUR-7214:[BNX-TOR] The alert message for RELEASED DATE
    var opt_key = "VALIDATE_RELEASE_DATE";
    ajaxSendPost(setCheckReleaseFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
	var formObj=document.frm1;
	var s_ofc_cd=formObj.s_ofc_cd.value;
	if(s_ofc_cd != ""){
		formObj.f_ofc_cd.value=s_ofc_cd;
	}
	
	//#314 [IMPEX] OEM & OEH GROSS WEIGHT DB TO MANAGE DECIMAL UP TO 3 PLACES
	var opt_key = "OBL_DECIMAL_LEN";
	ajaxSendPost(setDecimalLen, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd); 
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
  	
    /* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
    //오늘일자구하기
    var now=new Date();
    var year=now.getFullYear();
    var month=now.getMonth() + 1;
    var date=now.getDate();
    if (month < 10) {
    	month="0" + (month);
    }
    if (date < 10) {
    	date="0" + date;
    }
    TODAY=month + "-" + date + "-" + year;  
    
    // IMPEX HBL_SER_NO 리스트 추가    
    if (frm1.use_hbl_ser.value == 'Y') {
    	docObjects[0].SetColHidden('hbl_ser_no',0);
    } 
    
    setUseCfsField();
    
	/* operation 권한이 없는 경우 */    	   		
	var objDisable = false; 
	if (uod_flg == "N"){ 
		objDisable = true;
		formObj.opr_usrid.value=usrId;
		formObj.opr_usrnm.value=usrNm;
		formObj.opr_ofc_cd.value=ofc_cd;
		formObj.opr_dept_cd.value=usrDept;
		formObj.opr_usrid.disabled = objDisable; 
		$("#oprBtn").prop('disabled', objDisable);    	   			
	}
	
	// 박철우 오류 수정
	if("" != formObj.linkFlag.value){
		initDatLod = formObj.linkFlag.value;
	}
}

function RestoreGrid(){
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
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, FrozenCol:3} );
	        var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
	        var headers = "";
	        if(setSubBlNoText == 'JP'){
	        	headers = [ { Text:getLabel('SEI_BMD_0060_HDR2'), Align:"Center"} ];
	        }else{
	        	headers = [ { Text:getLabel('SEI_BMD_0060_HDR1'), Align:"Center"} ];
	        }
	        InitHeaders(headers, info);
	        var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ref_ofc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Image",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"view_mbl",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:false },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"prnr_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"prnr_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"shp_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"shp_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cne_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cne_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"act_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"act_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ntfy_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"ntfy_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"trnk_vsl_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"trnk_voy",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"lnr_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },	               
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"isf_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"f_eta_dt_tm",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cust_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cust_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cfs_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cfs_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"it_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Int",       Hidden:0,  Width:60,   Align:"Right",   ColMerge:0,   SaveName:"pck_qty",          KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"grs_wgt1",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"meas",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"CheckBox",  Hidden:0,  Width:85,   Align:"Center",  ColMerge:0,   SaveName:"org_bl_rcvd_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"rcvd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"express_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"CheckBox",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"rlsd_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"rlsd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"ccn_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"mnf_fr_loc",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"mnf_to_loc",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               //<!-- #1430 [PATENT] 0215_15 B/L TYPE DIVERSELY -->	
	              //#1619 [CLT] Original B/L Type- 항목 정리 {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bl_rlse_tp_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"frt_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ar_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ap_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dc_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"CheckBox",  Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"verify_flag",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N" },
	               {Type:"CheckBox",  Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"pay_flag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N" },
	               {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"memo",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_usr_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"sls_usr_nm",      KeyField:0,   CalcLogic:"",   Format:"",             PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
				   {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"cs_usr_nm",    	 KeyField:0,   CalcLogic:"",   Format:"",              PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"ams_id",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:108,  Align:"Left",    ColMerge:0,   SaveName:"cust_ref_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"ams_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               
	               {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"hbl_ser_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"entr_no",       	 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pkup_dt",       	 KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"post_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"sub_bl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"rep_cmdt_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"an_fax_snd_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"an_eml_snd_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	              
	               //#4980 [Best Ocean] Created Time and Last Modify Time columns add to BL List
	               {Type:"Date",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"modi_usr_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               //#6837 : [JAPT] B/L Type column add request on BL List
	               {Type:"Combo",      Hidden:0, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"hbl_tp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               //OFVFOUR-7105 [JAPAN TRUST] Adding "Original B/L Type" Column and Search on B/L List
	               {Type:"Combo",      Hidden:0, Width:140,   Align:"Center",  ColMerge:0,   SaveName:"obl_tp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"trk_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"trk_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cust_ref_no_h",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_cnt",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_sts_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"rlt_intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_cnt" },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Status",    Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"po_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0}];
	        InitColumns(cols);
	        SetEditable(1);
	        SetImageList(0,APP_PATH+"/web/img/button/btns_view.gif");
	         /* #18782 [BINEX, GPL] OBL RCV and Release update function (From BL List) jsjang 2013.9.14  */
	        /* #18782 [BINEX, GPL] OBL RCV and Release update function (From BL List) jsjang 2013.9.14  */
	        SetDataLinkMouse('view_mbl',1);
//	        InitViewFormat(0, "eta_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
//	        InitViewFormat(0, "post_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
//	        InitViewFormat(0, "rlsd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
//	        InitViewFormat(0, "etd_dt_tm", 	"MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	        /* #18782 [BINEX, GPL] OBL RCV and Release update function (From BL List) jsjang 2013.9.14  */
//	        InitViewFormat(0, "rcvd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
//	        InitViewFormat(0, "pkup_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	        
	        if(USE_FAX_MAIL == 'N'){
			    SetColHidden("an_fax_snd_dt", 1);
	  		    SetColHidden("an_eml_snd_dt", 1);
	        }else{
	        }  		    
	        SetSheetHeight(SYSTEM_ROW_HEIGHT*18);
	        //sheetObj.SetFocusAfterProcess(1);
	        //#6837 : [JAPT] B/L Type column add request on BL List
	        	SetColProperty('hbl_tp_cd', {ComboText:COMBOBLTypeTEXT, ComboCode:COMBOBLTypeCODE} );
	        //OFVFOUR-7105 [JAPAN TRUST] Adding "Original B/L Type" Column and Search on B/L List
	        	var formObj = document.frm1;
	        	var COMBOORGBLTypeTEXT = '';
	            var COMBOORGBLTypeCODE = '';
	            for(var i=1; i < formObj.f_obl_tp_cd.options.length; i++){
	            	COMBOORGBLTypeTEXT = COMBOORGBLTypeTEXT + '|' + formObj.f_obl_tp_cd.options[i].text;
	            	COMBOORGBLTypeCODE = COMBOORGBLTypeCODE + '|' + formObj.f_obl_tp_cd.options[i].value;
	            }
	            SetColProperty('obl_tp_cd', {ComboText:COMBOORGBLTypeTEXT, ComboCode:COMBOORGBLTypeCODE} );
		   }                                                      
		break;
		 case 2:      //IBSheet1 init
		    with (sheetObj) {
	            var cnt=0;
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('SEE_BMD_HDR11'), Align:"Center"} ];
	            InitHeaders(headers, info);
	            var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mbl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"shipper_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"shipper_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"consignee_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"consignee_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0 },
	                {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0 },
	                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bl_sts_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 } ];
	            InitColumns(cols);
	            SetEditable(0);
	            //InitViewFormat(0, "etd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		        //InitViewFormat(0, "eta_dt_tm", 	"MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		        SetSheetHeight(SYSTEM_ROW_HEIGHT*5);
	            //sheetObj.SetFocusAfterProcess(0);
		   }                                                      
		break;
		 case 3:					//첨부파일
			 initMemo(sheetObj);
			 break;
		   
		 case 4:					//cn cp excel 
		     with (sheetObj) { 
             var info    = { Sort:1, ColMove:1 , ColResize:1 }; 
             var headers = [ { Text:getLabel('SEE_BMD_HDR3'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [  
                 {Type:"Text",      Hidden:0, Width:150,  Align:"Center",    ColMerge:0,   SaveName:"hbl_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0, Width:150,  Align:"Center",    ColMerge:0,   SaveName:"ref_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ,
                 {Type:"Date",      Hidden:0, Width:150,  Align:"Center",    ColMerge:0,   SaveName:"post_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ,
                 {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cfs_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ,
                 {Type:"Text",      Hidden:0, Width:150,  Align:"Center",    ColMerge:0,   SaveName:"cntr_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } 
                 ];
                 InitColumns(cols); 
                 SetSheetHeight(SYSTEM_ROW_HEIGHT*8);
		 	}                                                      
		   break;		   
    }
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet1_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 사용자가 저장한 Header Setting을 삭제한다.
		//		case "Header Setting Delete":
		//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
		//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
var curBlNo='';
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=='view_mbl'){
		var formObj=document.frm1;
	    var sheetObj1=docObjects[0];
		var sheetObj2=docObjects[1];
	  	searchSheet2(sheetObj,Row,Col);
	  	
	  	var intg_bl_seq =  sheetObj.GetCellValue(Row, "intg_bl_seq");
		var palt_mnu_cd = 'OIH';
		var opr_no = sheetObj.GetCellValue(Row, "bl_no");
		setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
		doWorkMemo("SEARCHMEMO");
	/* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
	}
	else if(Col==-2){
		var intg_bl_seq =  sheetObj.GetCellValue(Row, "intg_bl_seq");
		var palt_mnu_cd = 'OIH';
		var opr_no = sheetObj.GetCellValue(Row, "bl_no");
		setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
		doWorkMemo("SEARCHMEMO");
	}
	else if(colStr =='rlsd_flg'){
		var f_rlsd_flg=sheetObj.GetCellValue(Row,"rlsd_flg");
		var f_rlsd_dt_tm=sheetObj.GetCellValue(Row,"rlsd_dt_tm");
		if(f_rlsd_flg == 1)
		{
			//frm1.f_rlsd_flg.value = "Y";
		}else{
			if(f_rlsd_dt_tm == "")
			{
				sheetObj.SetCellValue(Row,"rlsd_dt_tm",getTodayStr("MM-dd-yyyy"),0);
			}
		}
		//frm1.f_rlsd_dt_tm.value =  = sheetObj.CellValue(Row,"rlsd_dt_tm");
	}else if(colStr =='org_bl_rcvd_flg'){
		var f_org_bl_rcvd_flg=sheetObj.GetCellValue(Row,"org_bl_rcvd_flg");
		var f_rcvd_dt_tm=sheetObj.GetCellValue(Row,"rcvd_dt_tm");
		if(f_org_bl_rcvd_flg == 1)
		{
		}else{
			if(f_rcvd_dt_tm == "")
			{
				sheetObj.SetCellValue(Row,"rcvd_dt_tm",getTodayStr("MM-dd-yyyy"),0);
			}
		}
		//frm1.f_rcvd_dt_tm.value =  = sheetObj.CellValue(Row,"rcvd_dt_tm");
	}else if(colStr =='isf_no'){
		var formObj=document.frm1;
   		formObj.file_name.value='isf_history.mrd';
   		if( trim(sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ams_no"))  != ""){
   			formObj.title.value='Importer Security Filling History[' +  sheetObj.GetCellValue(sheetObj.GetSelectRow(),"ams_no") + ']';
   		}else{
   			formObj.title.value='Importer Security Filling History[' +  sheetObj.GetCellValue(sheetObj.GetSelectRow(),"bl_no") + ']';
   		}
    	formObj.mailTitle.value=formObj.title.value;
    	var isfNo=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "isf_no");
    	// BL_NO는 SCAC + BL_NO 이므로 AMS_NO를 넘겨준다.
    	var blNo=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ams_no");
    	if(isfNo == "") return;
		var param='[' + isfNo + ']';				// [1]
		param	  += '[' + blNo + ']';				// [2]
		formObj.rd_param.value=param;
		popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);	
			
	}else {		
		/* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
		var f_rlsd_flg=sheetObj.GetCellValue(Row,"rlsd_flg");
		frm1.r_intg_bl_seq.value=sheetObj.GetCellValue(Row,"intg_bl_seq");
		frm1.f_rlsd_dt_tm.value=sheetObj.GetCellValue(Row,"rlsd_dt_tm");
		var f_org_bl_rcvd_flg=sheetObj.GetCellValue(Row,"org_bl_rcvd_flg");
		frm1.f_rcvd_dt_tm.value=sheetObj.GetCellValue(Row,"rcvd_dt_tm");
		//alert(f_rlsd_flg);
		if(f_rlsd_flg == 1)
		{
			frm1.f_rlsd_flg.value="Y";
		}else{
			frm1.f_rlsd_flg.value="N";
		}		
		if(f_org_bl_rcvd_flg == 1)
		{
			frm1.f_org_bl_rcvd_flg.value="Y";
		}else{
			frm1.f_org_bl_rcvd_flg.value="N";
		}		
		
	}
	/*
	else{
	if(curBlNo!=''&&curBlNo!=sheetObj.GetCellValue(Row, 'bl_no')){
			docObjects[1].RemoveAll();
		}
	}
	*/
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	/* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
	if(colStr =='rlsd_flg' || colStr =='rlsd_dt_tm' || colStr =='org_bl_rcvd_flg' || colStr =='rcvd_dt_tm'){
	}else{		
		if(colStr!='view_mbl'){
			var formObj=document.frm1;
		   	doProcess=true;
		   	formObj.f_cmd.value="";                   
		   	var paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+escape(sheetObj.GetCellValue(Row,"bl_no"))+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row,"intg_bl_seq");
		   	parent.mkNewFrame('Booking & HB/L Entry', paramStr,"SEI_BMD_0020_SHEET_" + sheetObj.GetCellValue(Row,"bl_no")+"_"+sheetObj.GetCellValue(Row,"intg_bl_seq")); 
		}
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet2에서 OnDblClick이벤트 발생시.
 * sheet2_OnDblClick(sheetObj, Row, Col)  <= sheet2번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet2_OnDblClick(sheetObj,Row,Col){	
	var formObj=document.frm1;
   	var paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST;
   	paramStr+= '&f_ref_no='+sheetObj.GetCellValue(Row, 'ref_no');
   	parent.mkNewFrame('Master B/L Entry', paramStr, "SEI_BMD_0040_SHEET_" +sheetObj.GetCellValue(Row, 'ref_no')); 
}
/**
 * sheet2 search
 */
function searchSheet2(sheetObj,Row,Col){
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	formObj.f_intg_bl_seq.value=sheetObj1.GetCellValue(Row,"intg_bl_seq");
	formObj.master_bl_no.value=sheetObj1.GetCellValue(Row,"bl_no");
	formObj.f_cmd.value=SEARCHLIST02;
	sheetObj2.DoSearch("./SEI_BMD_0060_2GS.clt", FormQueryString(formObj) );
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
			}else if(CODETYPE == "location_por"){
				formObj.f_por_cd.value=masterVals[0];
				formObj.f_por_nm.value=masterVals[3];
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value=masterVals[0];
				formObj.f_pod_nm.value=masterVals[3];
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value=masterVals[0];
				formObj.f_del_nm.value=masterVals[3];
			}else if(CODETYPE == "location_dest"){
				formObj.f_fnl_dest_loc_cd.value=masterVals[0];
				formObj.f_fnl_dest_loc_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=masterVals[0]; 
				formObj.f_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_por"){
				formObj.f_por_cd.value="";
				formObj.f_por_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value="";
				formObj.f_del_nm.value="";
			}else if(CODETYPE == "location_dest"){
				formObj.f_fnl_dest_loc_cd.value="";
				formObj.f_fnl_dest_loc_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=""; 
				formObj.f_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "bl_sts_cd") == "HF") {
			sheetObj.SetCellValue(i, "block_flag","Y");
			sheetObj.SetCellFontColor(i, "block_flag","#FF0000");
			//#6590 [Binex-AWS] Release Order 버튼 로직 확인
			sheetObj.SetCellValue(i, "ibflag","R");
		}	
	}
	// #22632 oyh Isf No 에 링크걸기
	sheetObj.SetCellFontColor(i, "isf_no","#0000FF");
	
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){		
		if(delete_show_msg == 'Y'){
			setTimeout("showCompleteProcess()",1000);
			delete_show_msg = 'N';
		}
	} 
	
	if(frm1.f_cmd.value == REMOVE){		
		doWork("SEARCHLIST");	
	}
}
function sheet2_OnSearchEnd(sheetObj, errMsg){
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "bl_sts_cd") == "HF") {
			sheetObj.SetCellValue(i, "block_flag","Y");
			sheetObj.SetCellFontColor(i, "block_flag","#FF0000");
			//#6590 [Binex-AWS] Release Order 버튼 로직 확인
			sheetObj.SetCellValue(i, "ibflag","R");
		}
	}
}

 
function sheet4_OnSearchEnd(sheetObj, errMsg){
	 
	sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
}

function sheet1_OnChange(sheetObj, rowIdx, colIdx){
	var colStr=sheetObj.ColSaveName(colIdx);
	if(colStr=="cls_check"){
		if(sheetObj.GetCellValue(rowIdx, 'bl_sts_cd')!='HO'){
			sheetObj.SetCellValue(rowIdx, 'cls_check',0,0);
		}
	}
	if(colStr=="org_bl_rcvd_flg"){
		if(sheetObj.GetCellValue(rowIdx, 'org_bl_rcvd_flg') == 0){
			sheetObj.SetCellValue(rowIdx, 'rcvd_dt_tm',"",0);
		}
	}
	if(colStr=="rcvd_dt_tm"){
		if(sheetObj.GetCellValue(rowIdx, 'rcvd_dt_tm').length == 8){
			sheetObj.SetCellValue(rowIdx, 'org_bl_rcvd_flg',1);
		}else{
			sheetObj.SetCellValue(rowIdx, 'org_bl_rcvd_flg',0);
		}
	}
	if(colStr=="rlsd_flg"){
		if(sheetObj.GetCellValue(rowIdx, 'rlsd_flg') == 0){
			sheetObj.SetCellValue(rowIdx, 'rlsd_dt_tm',"",0);
		}
	}
	if(colStr=="rlsd_dt_tm"){
		if(sheetObj.GetCellValue(rowIdx, 'rlsd_dt_tm').length == 8){
			sheetObj.SetCellValue(rowIdx, 'rlsd_flg',1);
		}else{
			sheetObj.SetCellValue(rowIdx, 'rlsd_flg',0);
		}
	}
 	//var colStr = sheetObj.ColSaveName(Col);
 	/* #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) - check 시에는 아무 동작 안함. */
	var f_rlsd_flg=sheetObj.GetCellValue(rowIdx,"rlsd_flg");
	frm1.r_intg_bl_seq.value=sheetObj.GetCellValue(rowIdx,"intg_bl_seq");
	frm1.f_rlsd_dt_tm.value=sheetObj.GetCellValue(rowIdx,"rlsd_dt_tm");
	if(f_rlsd_flg == 1)
	{
		frm1.f_rlsd_flg.value="Y";
	}else{
		frm1.f_rlsd_flg.value="N";
	}
	var f_org_bl_rcvd_flg=sheetObj.GetCellValue(rowIdx,"org_bl_rcvd_flg");
	frm1.f_rcvd_dt_tm.value=sheetObj.GetCellValue(rowIdx,"rcvd_dt_tm");
	if(f_org_bl_rcvd_flg == 1)
	{
		frm1.f_org_bl_rcvd_flg.value="Y";
	}else{
		frm1.f_org_bl_rcvd_flg.value="N";
	}		
}

function checkBlInvReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			isInvStsOk=false;
		}else{
			isInvStsOk=true;
		}
	}
}

function checkBlPdOrd(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			isPdOrdStsOk=true;
		}else{
			isPdOrdStsOk=false;
		}
	}
}
function reloadDocList(){
	sheet1_OnClick(docObjects[0], docObjects[0].GetSelectRow(), -2);
}

function clearAll(){
	//docObjects[0].RemoveAll();
	//docObjects[1].RemoveAll();
	var formObj=document.frm1;
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	formObj.f_shp_mod_cd.selectedIndex=0;
	
	// [#1265][OIH B/L List]Clear function does not reset search conditions to default value
	formObj.f_tp_type.selectedIndex=0;
	formObj.f_date_type.selectedIndex=0;
	formObj.f_isb_pic_sel_cd.selectedIndex=0;
	formObj.f_grs_wgt_sel_cd.selectedIndex=0;
	
	//formObj.f_bl_rlse_tp_cd.selectedIndex=0;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
	if (uod_flg == "N"){ 
		formObj.opr_usrid.value=usrId;
	}
	setCondition("R", formObj.f_date_type, formObj.f_strdt, formObj.f_enddt);
}
function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST');
	}
}
function copyPckQty(){
	frm1.to_pck_qty.value=frm1.fm_pck_qty.value;
}
function copyGrsWgt(){
	frm1.to_grs_wgt.value=frm1.fm_grs_wgt.value;
}
function copyMeas(){
	frm1.to_meas.value=frm1.fm_meas.value;
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == "" || errMsg == undefined || errMsg == null || errMsg == 0){
		
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
	 	setTimeout("showCompleteProcess()",1000);
		//showCompleteProcess();
	}	
	doWork('SEARCHLIST');
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
function formValidation(){
	if(!chkSearchCmprPrd(false, frm1.f_strdt, frm1.f_enddt)){
		return false;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;
function printHouseCcn(){
	var sheetObj1=docObjects[0];
	// 하단부 print text 설정
	var end_txt=new Array();
	end_txt[0]="MAIL COPY - EXEMPLAIRE DE LA POSTE";
	end_txt[1]="STATION COPY - EXEMPLAIRE DE LA GARE";
	end_txt[2]="LONG ROOM COPY - EXEMPLAIRE DE LA SALLE DES COMPTOIRS";
	end_txt[3]="WAREHOUSE OPERATOR'S COPY - EXEMPLAIRE DE L'EXPLOITANT D'ENTREPOT";
	end_txt[4]="CUSTOMS DELIVERY AUTHORITY COPY - EXEMPLAIRE DE L'AUTORISATION DOUANIERE DE";
	frm1.title.value='CARGO CONTROL NO SHEET';
	//Parameter Setting
	var ttlFileName='cargo_control_no.mrd';
	var param="";
	for (var i=0; i< end_txt.length; i++) {
		if (i > 0){
			ttlFileName += '^@@^' + 'cargo_control_no.mrd';
			param +=  "^@@^";
		}		
		param += '[' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq") + ']';		// [1] Intg_bl_seq
		param += '[' + frm1.f_user_ofc_cd.value + ']';										// [2] ofc_cd
		param += '[' + frm1.f_phone.value + ']';											// [3] tel
		param += '[' + frm1.f_fax.value + ']';												// [4] fax
		param += '[' + frm1.f_email.value + ']';											// [5] email
		param += '[' + end_txt[i] + ']';													// [6] end_txt
	}
	frm1.file_name.value=ttlFileName;
	frm1.rd_param.value=param;
	popPOST(frm1, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
 }
function POL_LOCATION_POPLIST(rtnVal){
		var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pol_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pol_nm.value=rtnValAry[2];//loc_nm
	} 
}
function POR_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_por_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_por_nm.value=rtnValAry[2];//loc_nm
	} 
}
function POD_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	}
}
function DEL_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_del_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_del_nm.value=rtnValAry[2];//loc_nm
	}
}
function DEST_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_fnl_dest_loc_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_fnl_dest_loc_nm.value=rtnValAry[2];//loc_nm
	}
}
function PRNR_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_prnr_trdp_nm.value=rtnValAry[10];//local_nm
	}
}
function CNEE_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cnee_trdp_nm.value=rtnValAry[2];//full_nm
	}
}
function ASHIP_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ahpr_trdp_nm.value=rtnValAry[10];//local_nm
	}
}
/* #1327 [OCEAN BLUE] CUSTOM BROKER SEARCH FIELD ADD TO IMPORT HBL LIST */
function CUST_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cust_trdp_nm.value=rtnValAry[10];//local_nm
	}
}
function NTFY_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
 	}
 	else{
 		var rtnValAry=rtnVal.split("|");
 		formObj.f_ntfy_trdp_nm.value=rtnValAry[2];//full_nm
 	} 
}
function CFS_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
 	}
 	else{
 		var rtnValAry=rtnVal.split("|");
 		formObj.f_cfs_trdp_nm.value=rtnValAry[2];//full_nm
 	}
 }
function COMMODITY_POPLIST(){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cmdt_nm.value=rtnValAry[2];
	}
}

function setHblSizeUp(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*32);//height
}
function setHblSizeDown(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*18);//height
}

/* Vinh.Vo (S)*/
function onlyNumberAndAnphabet(evt){
	/**
	 * 	Accept numbers and anphabets only
	*/
	
	var formObj = document.frm1;
	
	var theEvent = evt || window.event;
	
	var key = theEvent.keyCode || theEvent.which;
	
	key = String.fromCharCode( key );
	
	var regex = /[0-9A-Za-z ]/;
	
	if( !regex.test(key) ) {
	  theEvent.returnValue = false;
	  if(theEvent.preventDefault) theEvent.preventDefault();
	}
}

function formValidation2(){
	var formObj=document.frm1;
	if(!chkSearchCmprPrd(false, frm1.f_strdt, frm1.f_enddt)){
		return false;
	}
	return true;
}

function excelDown(mySheet){
	
	var formObj = document.frm1;
	
	if(!formValidation()){
		return;
	}
	
	if(formObj.f_strdt.value == ""){
		ComShowCodeMessage("COM132602");
		formObj.f_strdt.focus();
		return;
	}
	
	formObj.f_cmd.value = COMMAND10;
	
	
	var formParam = FormQueryString(formObj);
	
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,URL:"./SEI_BMD_0060.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};	
	mySheet.DirectDown2Excel(param);
}

function setAnFaxMailFiled(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
    	if(doc[1] == "Y"){
    		USE_FAX_MAIL = "Y";
    	}else{
    		USE_FAX_MAIL = "N";
    	}
    }
}

//개인정보 관리화면 정렬순서 2016.03 
function setOrderByInfo(reqVal) {
	
	var formObj = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	var orderByInfo = "";
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) == "undefined") {
			orderByInfo = "";
		} else {
			orderByInfo = doc[1];
		}
	}
	formObj.f_orderByInfo.value = orderByInfo; 
}

//#438 subBlNo. 옵션처리
function setSubBLNo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
		if(doc[1] == 'JP'){
			$("#sub_bl_no_th").text("NACCS No.");
			setSubBlNoText = doc[1];
		}
	}
}

function searchValueSet() {
	var formObj = document.frm1;
	
	if (formObj.f_isb_pic_sel_cd.value == "PIC") {
		formObj.sls_tp_cd.value = "PIC";
	} else if (formObj.f_isb_pic_sel_cd.value == "ISB") {
		formObj.sls_tp_cd.value = "ISB";
		//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
	} else if (formObj.f_isb_pic_sel_cd.value == "CSPIC") {
		formObj.sls_tp_cd.value = "CSPIC";
	} else if (formObj.f_isb_pic_sel_cd.value == "OR") {
		formObj.sls_tp_cd.value = "OR";
	}
	
}
function searchValueClear(obj) {
	
	var formObj = document.frm1;
	
	if (uod_flg == "N"){ 
	
	}else if(obj.name == "f_tp_type"){
		formObj.f_prnr_trdp_nm.value = "";
	}else if(obj.name == "f_ams_isf_sel_cd"){
		formObj.f_ams_no.value = "";
	}else if(obj.name == "f_grs_wgt_sel_cd"){ //#4635 [BNX] G.WGT(LB) search condition
		formObj.fm_grs_wgt.value = "";
		formObj.to_grs_wgt.value = "";
	}else{
		formObj.opr_usrid.value = "";
		formObj.opr_usrnm.value = "";
		formObj.sls_tp_cd.value = "";
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

function addAnEmlTitleInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		if(doc[1] == "Y"){
			addAnEmlTitleInfoFlg = true;
		}
		else{
			addAnEmlTitleInfoFlg = false;
		}
	}
}

function setUseCfsFieldsReq(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
    	if(doc[1] == "Y"){
    		USE_CFS_FIELDS = "Y";
    	}
    }
}

function setUseCfsField(){
	if(USE_CFS_FIELDS == "Y"){
		$('[id=show_entr_no]').show();
		docObjects[0].SetColHidden('entr_no',0);
		docObjects[0].SetColHidden('pkup_dt',0);
		$('[id=show_entr_no1]').hide()
	}else{
		
	}
}
//OFVFOUR-7214:[BNX-TOR] The alert message for RELEASED DATE
function setCheckReleaseFlg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
    	if(doc[1] == "Y"){
    		VALIDATE_RELEASE_DATE = "Y";
    	}
    }
}
function setValidateReleaseFlg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
    	if(doc[1] == "N"){
    		checkReleasedDate = true;
    	}else{
    		checkReleasedDate = false;
    	}
    }else{
    	checkReleasedDate = false;
    }
}

//OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen
function openPopUp(popName, curObj, valObj){
	cmmOpenPopUp(popName, curObj, "S", "O", valObj, "H");
}

function COMMODITY_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cmdt_cd.value = rtnValAry[0];
		formObj.f_cmdt_nm.value = rtnValAry[2];
	}
}

var cur_curObj;
var cur_airSeaTp;
var cur_bndTp;
var cur_valObj;
var cur_bizTp;
var curObjId="";
function cmmOpenPopUp(popName, curObj, airSeaTp, bndTp, valObj, bizTp,cobFlag){
	cur_curObj = curObj;
	cur_airSeaTp = airSeaTp;
	cur_bndTp = bndTp;
	cur_valObj = valObj;
	cur_bizTp = bizTp;
	var formObj=document.frm1;
	try {
		switch(popName) {
			case "CUSTBKG":
				rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]="";
				rtnary[2]=window;
				callBackFunc = "CUSTBKG_callBackFunc";
				modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");

				break;
			case "PRINT":
				if(formObj.intg_bl_seq.value == ""){
					//
					alert(getLabel('FMS_COM_ALT010'));
				}else{
					var reqParam='?intg_bl_seq='  +formObj.intg_bl_seq.value;
					reqParam += '&house_bl_no=' +formObj.f_bl_no.value;

					if(formObj.rider_lbl.style.color=="black"){
						reqParam += '&rider_flg=N';
					}else{
						reqParam += '&rider_flg=Y';
					}

					reqParam += '&agent_text=' + sea_body;
					//#1912 [PATENT]B/L 출력 AS AGENT FOR THE CARRIER 설정
					/*
                    if(user_ofc_cnt_cd=="JP"){
                    }else if(user_ofc_cnt_cd=="DE"){
                        reqParam += " " + formObj.lnr_trdp_nm.value.replaceAll('&','%26');
                    }else{
                        reqParam += ", " + formObj.lnr_trdp_nm.value.replaceAll('&','%26');
                    }
                    */
					// #6897 [BNX] Adjust B/L (Zen#4238)
					if(sea_body.lastIndexOf('(END') != -1){
						reqParam = reqParam.substring(0,reqParam.lastIndexOf("(END)"));
					} else if(user_ofc_cnt_cd !="JP"){
						reqParam += " " + formObj.lnr_trdp_nm.value.replaceAll('&','%26');
					}


					reqParam += '&mailTitle=' + 'House BL : ' + frm1.bl_no.value;
					var trdp_cd='';
					trdp_cd += '(' + '\'' + frm1.shpr_trdp_cd.value + '\'';
					trdp_cd += ',' + '\'' + frm1.prnr_trdp_cd.value + '\'' + ')';

					ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
					reqParam += '&mailTo=' + mailTo;
					if($("#shp_mod_cd").length) {
						var shpModCd = $("#shp_mod_cd option:selected").val();
						reqParam += '&shp_mod_cd=' + shpModCd;
					}
					//OFVFOUR-7452 [SOUTH EAST WORLD WIDE] CREATING HB/L PRINT FUNCTION IN OIH B/L ENTRY
					if(!(cur_airSeaTp == "S" && cur_bndTp =="I" && cur_bizTp =="H")){
						//#6301 [JAPT] Mail sending function related request(requirement 1)
						reqParam += '&lnr_bkg_no=' + frm1.lnr_bkg_no.value;
						reqParam += '&trnk_vsl_nm=' + frm1.trnk_vsl_nm.value;
						reqParam += '&trnk_voy=' + frm1.trnk_voy.value;
						var etdDtTm='';
						if(frm1.etd_dt_tm.value != ""){
							etdDtTm = frm1.etd_dt_tm.value.substring(6,10) + "." + frm1.etd_dt_tm.value.substring(0,2) + "." + frm1.etd_dt_tm.value.substring(3,5);
						}
						reqParam += '&etd_dt_tm=' + etdDtTm;
					}
					reqParam += '&airSeaTp=' + cur_airSeaTp;
					reqParam += '&bndTp=' + cur_bndTp;
					reqParam += '&bizTp=' + cur_bizTp;
					popGET('RPT_PRN_0020.clt'+reqParam, '', 440, 616, "scroll:yes;status:no;help:no;");
				}
				break;
			case "B_CONFIRM":
				if(formObj.intg_bl_seq.value == ""){
					//
					alert(getLabel('FMS_COM_ALT010'));
				}else{
					var reqParam='?intg_bl_seq='  +formObj.intg_bl_seq.value;
					//reqParam += '&house_bl_no=' +formObj.f_bl_no.value;
					//reqParam += '&v_ofc_eng_nm=' +formObj.v_ofc_eng_nm.value;
					//reqParam += '&v_eml=' +formObj.v_eml.value;
					reqParam += '&v_ofc_cd=' +formObj.u_ofc_cd.value;
					//reqParam += '&v_phn=' +formObj.v_phn.value;
					//reqParam += '&v_fax=' +formObj.v_fax.value;

					popGET('RPT_PRN_0240.clt'+reqParam, '', 780, 530, "scroll:yes;status:no;help:no;");
				}
				break;
			case "PACKAGE_POPLIST":
				rtnary=new Array(1);
				rtnary[0]="1";
				callBackFunc = "PACKAGE_POPLIST";
				modal_center_open('./CMM_POP_0120.clt', rtnary, 450,480,"yes");

				break;

			case "CNEE_POPLIST":
				var opt_key_sec = "BL_SAME_AS_CNEE01";
				ajaxSendPost(setBlSameAsCnee, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

				rtnary=new Array(2);
				rtnary[0]="1";
				/* jsjang 2013.8.6 #18801 trade partner 조회조건 변경 */
				var iata_val="";
				curObjId=curObj.id;
				var cstmTpCd='';
				if(typeof(valObj)!='undefined'){
					rtnary[1]=valObj;
				}else{
					rtnary[1]="";
				}
				rtnary[2]=window;
				callBackFunc = "CNEE_POPLIST";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");

				break;

			case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				var opt_key_sec = "BL_SAME_AS_CNEE01";
				ajaxSendPost(setBlSameAsCnee, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

				rtnary=new Array(2);
				rtnary[0]="1";
				/* jsjang 2013.8.6 #18801 trade partner 조회조건 변경 */
				var iata_val="";
				curObjId=curObj.id;
				//`alert(curObjId);
				var cstmTpCd='';
				//선사
				if(curObjId=='liner'){
					//alert(airSeaTp);
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
					//cstmTpCd = 'LN';
					cstmTpCd='';
				}else if(curObjId=='notify'){
					cstmTpCd='';
				}else if(curObjId=='ashipper'){
					cstmTpCd='';
				}else if(curObjId=='vndr'){
					cstmTpCd='';
				}else if(curObjId=='agent'){
					cstmTpCd='';
				}else if(curObjId=='partner2'){
					cstmTpCd='';
				}else if(curObjId=='rcv'){
					cstmTpCd='';
				}else if(curObjId=='pu'){
					cstmTpCd='';
				}else if(curObjId=='cgo_pu'){
					cstmTpCd='';
				}else if(curObjId=='cy' || curObjId=='cfs' || curObjId== 'frt_loc'){
					//alert(airSeaTp);
					if(airSeaTp=='A'){
						cstmTpCd='';
					}
					//#3508 Multi Language 옵션인 경우 TRDP Popup 에서 Firm Check 제거
					if(MULTI_LANGUAGE != 'Y') {
						iata_val="Y" // jsjang 수정예정 , iata_cd 값 자체는 텍스트 데이타임.
					}
				}else if(curObjId=='door'){
					cstmTpCd='';
				}else if(curObjId=='third'){
					cstmTpCd='';
				}else if(curObjId=='frt_loc'){
					cstmTpCd='';
				}else if(curObjId=='forwarder'){
					cstmTpCd='';
				}
				// 2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[1]=valObj;
				}else{
					rtnary[1]="";
				}
				rtnary[2]=window;
				callBackFunc = "LINER_POPLIST";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");

				break;
			case "LINER_POPLIST_BLANK"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				var opt_key_sec = "BL_SAME_AS_CNEE01";
				ajaxSendPost(setBlSameAsCnee, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

				rtnary=new Array(2);
				rtnary[0]="1";
				/* jsjang 2013.8.6 #18801 trade partner 조회조건 변경 */
				var iata_val="";
				curObjId=curObj.id;
				//`alert(curObjId);
				var cstmTpCd='';
				//선사
				if(curObjId=='liner'){
					//alert(airSeaTp);
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
					//cstmTpCd = 'LN';
					cstmTpCd='';
				}else if(curObjId=='notify'){
					cstmTpCd='';
				}else if(curObjId=='ashipper'){
					cstmTpCd='';
				}else if(curObjId=='vndr'){
					cstmTpCd='';
				}else if(curObjId=='agent'){
					cstmTpCd='';
				}else if(curObjId=='partner2'){
					cstmTpCd='';
				}else if(curObjId=='rcv'){
					cstmTpCd='';
				}else if(curObjId=='pu'){
					cstmTpCd='';
				}else if(curObjId=='cgo_pu'){
					cstmTpCd='';
				}else if(curObjId=='cy' || curObjId=='cfs' || curObjId== 'frt_loc'){
					//alert(airSeaTp);
					if(airSeaTp=='A'){
						cstmTpCd='';
					}
					//#3508 Multi Language 옵션인 경우 TRDP Popup 에서 Firm Check 제거
					if(MULTI_LANGUAGE != 'Y') {
						iata_val="Y" // jsjang 수정예정 , iata_cd 값 자체는 텍스트 데이타임.
					}
				}else if(curObjId=='door'){
					cstmTpCd='';
				}else if(curObjId=='third'){
					cstmTpCd='';
				}else if(curObjId=='frt_loc'){
					cstmTpCd='';
				}
				rtnary[1]="";
				rtnary[2]=window;
				callBackFunc = "LINER_POPLIST";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");

				break;

			case "LINER_POPLIST_MS"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				curObjId=curObj.id;
				var cstmTpCd='CS';
				//선사
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
				callBackFunc = "LINER_POPLIST_MS";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");

				break;


			case "LINER_POPLIST_M"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				curObjId=curObj.id;
				var cstmTpCd='CS';
				if(curObjId=='liner'){
					if(airSeaTp=='A'){
						cstmTpCd='AC';
					}else{
						cstmTpCd='LN';
					}
				}
				//2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[1]=valObj;
				}else{
					rtnary[1]="";
				}
				rtnary[2]=window;
				callBackFunc = "LINER_POPLIST_M";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");

				break;
			case "LINER_POPLIST_AIR_M"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				curObjId=curObj.id;
				var cstmTpCd='CS';
				if(curObjId=='liner'){
					if(airSeaTp=='A'){
						cstmTpCd='AC';
					}else{
						cstmTpCd='LN';
					}
				}
				//2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[1]=valObj;
				}else{
					rtnary[1]="";
				}
				rtnary[2]=window;
				callBackFunc = "LINER_POPLIST_AIR_M";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
				break;
			case "LINER_POPLIST_IATA"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				curObjId=curObj.id;
				var cstmTpCd='CS';
				if(curObjId=='liner'){
					if(airSeaTp=='A'){
						cstmTpCd='AC';
					}else{
						cstmTpCd='LN';
					}
				}
				//2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[1]=valObj;
				}else{
					rtnary[1]="";
				}
				rtnary[2]=window;
				callBackFunc = "LINER_POPLIST_IATA";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
				break;
			case "PIC_POP":
				if(formObj.intg_bl_seq.value == ""){
					//House B/L 정보가 없습니다. House B/L 저장후 PIC정보를 등록할수 있습니다.
					alert(getLabel('FMS_COM_ALT015'));
					return;
				}else{
					rtnary=new Array(1);
					curObjId=curObj.id;
					rtnary[0]="";
					rtnary[2]=formObj.intg_bl_seq.value;
					if(curObjId == "shipper"){
						if(formObj.shpr_trdp_cd.value == ""){
							//shipper 정보가 없습니다. shipper정보를 선택후  PIC정보를 등록할수 있습니다.
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_SHIP'));
							//formObj.shpr_trdp_cd.focus();
							return;
						}
						rtnary[0]="S01";
						rtnary[1]=formObj.shpr_trdp_cd.value;
					}else if(curObjId == "consignee"){
						if(formObj.cnee_trdp_cd.value == ""){
							//consignee 정보가 없습니다. consignee정보를 선택후  PIC정보를 등록할수 있습니다.
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_CNEE'));
							//formObj.cnee_trdp_cd.focus();
							return;
						}
						rtnary[0]="C01";
						rtnary[1]=formObj.cnee_trdp_cd.value;
					}else if(curObjId == "notify"){
						if(formObj.ntfy_trdp_cd.value == ""){
							//notify 정보가 없습니다. notify정보를 선택후  PIC정보를 등록할수 있습니다.
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_NTFY'));
							//formObj.ntfy_trdp_cd.focus();
							return;
						}
						rtnary[0]="N01";
						rtnary[1]=formObj.ntfy_trdp_cd.value;
					}else if(curObjId == "ashipper"){
						if(formObj.act_shpr_trdp_cd.value == ""){
							//ashipper 정보가 없습니다. ashipper정보를 선택후  PIC정보를 등록할수 있습니다.
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_ASHP'));
							//formObj.act_shpr_trdp_cd.focus();
							return;
						}
						rtnary[0]="S02";
						rtnary[1]=formObj.act_shpr_trdp_cd.value;
					}else if(curObjId == "liner"){
						if(formObj.lnr_trdp_cd.value == ""){
							//liner 정보가 없습니다. liner정보를 선택후  PIC정보를 등록할수 있습니다.
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_LINE'));
							//formObj.lnr_trdp_cd.focus();
							return;
						}
						rtnary[0]="L01";
						rtnary[1]=formObj.lnr_trdp_cd.value;
					}else if(curObjId == "console"){
						if(formObj.agt_trdp_cd.value == ""){
							//alert("console 정보가 없습니다. console정보를 선택후  PIC정보를 등록할수 있습니다. ");
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_CONS'));
							//formObj.agt_trdp_cd.focus();
							return;
						}
						rtnary[0]="L02";
						rtnary[1]=formObj.agt_trdp_cd.value;
					}else if(curObjId == "partner"){
						if(formObj.prnr_trdp_cd.value == ""){
							//partner 정보가 없습니다. partner정보를 선택후  PIC정보를 등록할수 있습니다.
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TRPT'));
							//formObj.prnr_trdp_cd.focus();
							return;
						}
						rtnary[0]="P02";
						rtnary[1]=formObj.prnr_trdp_cd.value;
					}
					callBackFunc = "PIC_POP";
					modal_center_open('./SEE_BMD_0028.clt?trdp_cd='+rtnary[1], rtnary, 756,470,"yes");
				}
				break;
			case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]="";	//Commodity code
				rtnary[2]=curObj.value;	//Commodity name
				callBackFunc = "COMMODITY_POPLIST";
				/*20170118 #986에 의해 변경*/
				modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
				//modal_center_open('./CMM_POP_0110.clt', rtnary, 556,483,"yes");

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
				rtnary[3]="";
				//[ LHK 20130712 ]
				//Ocean POL, POD 항목의 Location 화면 Popup아이콘에 Type=L01 지정
				//Air 의 Departure, Trans1, Trans2, Trans3, Destination 항목의 Location 화면 Popup아이콘에 Type=L02 지정
				rtnary[4]=curObj;
				callBackFunc = "LOCATION_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");

				break;
			case "LOCATION_POPLIST_BLANK"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]=airSeaTp;
				rtnary[1]="BL";
				// 2011.12.27 value parameter
//		   		if(typeof(valObj)!='undefined'){
//		   			rtnary[2]=valObj;
//		   		}else{
//		   			rtnary[2]="";
//		   		}
				rtnary[2]="";
				rtnary[3]="";
				//[ LHK 20130712 ]
				//Ocean POL, POD 항목의 Location 화면 Popup아이콘에 Type=L01 지정
				//Air 의 Departure, Trans1, Trans2, Trans3, Destination 항목의 Location 화면 Popup아이콘에 Type=L02 지정
				rtnary[4]=curObj;
				callBackFunc = "LOCATION_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");

				break;

			case "NODECODE_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]="ND";//Node Code
				rtnary[2]="L04";//국가코드
				callBackFunc = "NODECODE_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,480,"yes");

				break;
			case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";

				callBackFunc = "USER_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
				break;
			case "OPR_POPLIST"://담당자openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				callBackFunc = "OPR_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
				break;
			case "ISS_POPLIST"://Issued by 조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				callBackFunc = "ISS_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
				break;

			case "ASGN_POPLIST"://Issued by 조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				callBackFunc = "ASGN_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
				break;



			case "VESSEL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				// 2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[1]=valObj;
				}else{
					rtnary[1]="";
				}
				callBackFunc = "VESSEL_POPLIST";
				modal_center_open('./CMM_POP_0140.clt', rtnary, 656,470,"yes");

				break;
			case "VESSEL_POPLIST_BLANK"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				rtnary[1]="";
				callBackFunc = "VESSEL_POPLIST";
				modal_center_open('./CMM_POP_0140.clt', rtnary, 656,470,"yes");

				break;
			case "OFFICE_GRID_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
//		   		rtnary[1] = "111";
				callBackFunc = "OFFICE_GRID_POPLIST";
				modal_center_open('./CMM_POP_0150.clt', rtnary, 556,600,"yes");
				break;
			case "BKNO_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0] = formObj.f_bkg_no.value;
				rtnary[1] = '';
				callBackFunc = "BKNO_POPLIST";
				modal_center_open('./CMM_POP_0210.clt', rtnary, 815,480,"yes");
				break;


			case "BKNO_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0] = "";
				rtnary[1] = '';
				callBackFunc = "BKNO_POPLIST";
				modal_center_open('./CMM_POP_0210.clt', rtnary, 815,480,"yes");
				break;
			case "LNRBKNO_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0] = formObj.f_lnr_bkg_no.value;
				rtnary[1] = '';
				callBackFunc = "LNRBKNO_POPLIST";
				modal_center_open('./CMM_POP_0280.clt', rtnary, 815,480,"yes");
				break;
			case "LNRBKNO_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0] = "";
				rtnary[1] = '';
				callBackFunc = "LNRBKNO_POPLIST";
				modal_center_open('./CMM_POP_0280.clt', rtnary, 815,480,"yes");
				break;
			case "HBL_POPLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				callBackFunc = "HBL_POPLIST";
				modal_center_open('./CMM_POP_0170.clt', rtnary, 818,468,"yes");
				break;
			case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				if(curObj.type != "button"){
					rtnary[2]=formObj.f_bl_no.value;
				}else{
					rtnary[2]='';
				}
				rtnary[3]='';

				callBackFunc = "MBL_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");

				break;
			case "MBL_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
//	   			rtnary[2]=formObj.f_bl_no.value;
				rtnary[2]="";
				rtnary[3]='';

				callBackFunc = "MBL_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");

				break;

			case "SR_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				callBackFunc = "SR_POPLIST";
				modal_center_open('./CMM_POP_0190.clt', rtnary, 818,480,"yes");

				break;
			case "WORKFLOW_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]=airSeaTp+bndTp;

				callBackFunc = "WORKFLOW_POPLIST";
				modal_center_open('./CMM_POP_0100.clt', rtnary, 610,460,"yes");
				break;
			case "STATE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";

				if(typeof(formObj.pol_cnt_cd) != "undefined"){
					rtnary[1]=formObj.pol_cnt_cd.value;
				}else{
					rtnary[1]="";
				}
				callBackFunc = "STATE_POPLIST";
				modal_center_open('./CMM_POP_0310.clt', rtnary, 610,400,"yes");
				break;
			case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(3);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				rtnary[2]='';
				rtnary[3]=formObj.f_ref_no.value;
				callBackFunc = "REF_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");

				break;
			case "REF_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(3);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				rtnary[2]='';
//	   			rtnary[3]=formObj.f_ref_no.value;
				rtnary[3]="";
				callBackFunc = "REF_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");

				break;

			case "AES_HBL_POPLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				callBackFunc = "AES_HBL_POPLIST";
				modal_center_open('./CMM_POP_0170.clt', rtnary, 818,476,"yes");

				break;

			case "COPY_CONFIRM_POPUP"://BL_COPY
				rtnary=new Array(1);
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 260,200,"no");
				break;
			case "COPY_CONFIRM_POPUP_1"://BL_COPY
				rtnary=new Array(1);
				rtnary[0]= "AIE_BMD_0040";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");
				break;
			/*
			case "COPY_CONFIRM_POPUP_2"://BL_COPY  Vinh.Vo - 04/09/2015 - Modified
				rtnary=new Array(1);
				rtnary[0]= "SEE_BMD_0020";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");
			break;
			*/
			case "COPY_CONFIRM_POPUP_2"://#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				rtnary=new Array(1);
				rtnary[0]= "ABL";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");
				break;
			case "COPY_CONFIRM_POPUP_3": //#1741 [PATENT]HBL Copy 옵션에 Filing No 복사여부 추가
				rtnary=new Array(1);
				rtnary[0]= "HBL";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");
				break;
			case "COPY_CONFIRM_POPUP_31": //#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				rtnary=new Array(1);
				rtnary[0]= "HBL1";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");
				break;
			case "COPY_CONFIRM_POPUP_4"://#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				rtnary=new Array(1);
				rtnary[0]= "OBL";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");
				break;
			case "COUNTRY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]="";//대륙코드
				callBackFunc = "COUNTRY_POPLIST";
				modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
				break;
			case "STATE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				rtnary[1]="";
				callBackFunc = "STATE_POPLIST";
				modal_center_open('./CMM_POP_0310.clt', rtnary, 610,450,"yes");
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
