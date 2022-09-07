//=========================================================
//*@FileName   : AII_BMD_0060.jsp
//*@FileTitle  : HAWB Search  
//*@Description: HWAB 목록 조회
//*@author     : Kang,Jung-Gu 
//*@version    :
//*@since      :
//
//*@Change history:
//*@author     : Tuan.Chau 
//*@version    : 2.0
//*@since      : 2014-06-17
//=========================================================
/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	//ZOOT::TODO
	//setFromToDtEndPlus(document.frm1.eta_strdt, 90, document.frm1.eta_enddt, 30);
}
var rtnary=new Array(1);
var callBackFunc = "";
var USE_FAX_MAIL = "N";
var delete_show_msg = "N";
var isPdOrdStsOk=false;
var isInvStsOk=false;
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];	
	var sheetObj3=docObjects[2];	
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		if(!formValidation()) return;
    	   		sheetObj1.RemoveAll();
    	   		sheetObj2.RemoveAll();
    	   		sheetObj3.RemoveAll();
			    if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
			    	searchValueSet();
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
						   		sheetObj1.DoSearch("./AII_BMD_0060GS.clt", FormQueryString(formObj) );
						   		//Log Monitor Start
						   		gLogMonitor();
				   	 			//Log Monitor End
		   					}
	   					}else{
					   		sheetObj1.DoSearch("./AII_BMD_0060GS.clt", FormQueryString(formObj) );
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
           		var paramStr="./AII_BMD_0020.clt?f_cmd=-1";
           		parent.mkNewFrame('House AWB Entry',paramStr);
           break;
           	case "HBLCLS":
           		var ckRow=sheetObj1.FindCheckedRow('cls_check');
           		if(ckRow==''){
           			//Please checked the [Sel.] column!
           			alert(getLabel('FMS_COM_ALT004') + "\n\n: AII_BMD_0060.38");	
           		}
           		else{
           			if(confirm(getLabel('FMS_COM_CFMCLS'))){
           				frm1.f_cmd.value=COMMAND01;
    			    	sheetObj1.DoSave("./AII_BMD_0060GS.clt", FormQueryString(formObj), "ibflag", false);
           			}
           		}
           		break;
           	case "HBLUNCNF":
           		var ckRow=sheetObj1.FindCheckedRow('cls_check');
           		if(ckRow==''){
           			//Please checked the [Sel.] column!
           			alert(getLabel('FMS_COM_ALT004'));	
           		}
           		else{
           			if(confirm(getLabel('FMS_COM_CFMCAN'))){
           				frm1.f_cmd.value=COMMAND02;
    			    	sheetObj1.DoSave("./AII_BMD_0060GS.clt", FormQueryString(formObj), "ibflag", false);
           			}
           		}
           		break;
           	case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
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
    	        modal_center_open('./CMM_POP_0030.clt', rtnary, 1150,480,"yes");
    	        break;
			case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}else{
		   			rtnary[2]="";
		   		}
    	        callBackFunc = "POD_LOCATION_POPLIST";
    	        modal_center_open('./CMM_POP_0030.clt', rtnary, 1150,480,"yes");
    	        break;
			case "FNL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="SEA";
				rtnary[1]="BL";
				// 2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[2]=valObj;
				}else{
					rtnary[2]="";
				}
				callBackFunc = "FNL_LOCATION_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 1150,480,"yes");
				break;
			case "SHIP_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
		   		
		   		callBackFunc = "SHIP_TRDP_POPLIST";
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
	   	 		
	   	 case "ACNEE_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
	   	 		
		   		callBackFunc = "ACNEE_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		break;
	   	 		
	   	 	case "AHPR_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   	 	rtnary=new Array(1);
		   	 	rtnary[0]="1";
		   	 	// 2011.12.27 value parameter
		   	 	if(typeof(valObj)!='undefined'){
		   	 		rtnary[1]=valObj;
		   	 	}else{
		   	 		rtnary[1]="";
		   	 	}
		   	 	rtnary[2]=window;
		   	 	
		   	 	callBackFunc = "AHPR_TRDP_POPLIST";
		   	 	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
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
	   	 	case "CUST_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
		   	 	callBackFunc = "CUST_TRDP_POPLIST";
		   	 	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		   	 	break;
	   	 	case "DELIVERY_ORDER":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
				}
		   	 	else{
		   	 		var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
		   	 		var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
		   	 		var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
		   	 		var liner_trdp_nm=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "act_shpr_trdp_nm");
		   	 		var trsp_trdp_cd=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "trk_trdp_cd");
		   	 		var trsp_trdp_nm=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "trk_trdp_nm");
		   	 		var cne_trdp_cd=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cnee_trdp_cd");
					var reqParam='?intg_bl_seq=' + intgBlSeq;
					reqParam += '&f_bl_no=' + encodeURIComponent(hblNo);
					reqParam += '&cust_ref_no=' + encodeURIComponent(custRefNo);
					reqParam += '&liner_trdp_nm=' + encodeURIComponent(liner_trdp_nm);
					reqParam += '&trsp_trdp_cd='+encodeURIComponent(trsp_trdp_cd) ;
					reqParam += '&trsp_trdp_nm='+encodeURIComponent(trsp_trdp_nm);
					reqParam += '&air_sea_clss_cd=A';
					reqParam += '&biz_clss_cd=H';
					reqParam += '&bnd_clss_cd=I';
					reqParam += '&dest_rout_trdp_cd='+cne_trdp_cd;
					reqParam += '&mrd_file_nm=delivery_order_01.mrd';
					popGET('CMM_POP_0320.clt'+reqParam, '', 700, 750, "scroll:yes;status:no;help:no;");
				}
		   	 	break;
		   	 	
	   	 	case "ArrivalNotice":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
				}
		   	 	else{
		   	 		//OFVFOUR-7770: [SOUTH EAST WORLD WIDE] Adding MBL# and ETA to AN's email subject
		   	 		var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
		   	 		var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
		   	 		var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
					var reqParam='?intg_bl_seq=' + intgBlSeq;
					var filingNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "ref_no");
					var mblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "mbl_no");
					reqParam += '&hbl_no=' + encodeURIComponent(hblNo);
					//reqParam += '&cust_ref_no=' + custRefNo;
					reqParam += '&filing_no=' + encodeURIComponent(filingNo);
					reqParam += '&mbl_no=' + encodeURIComponent(mblNo);
					reqParam += '&air_sea_tp=' + "A";
					reqParam += '&cgor_pic_info=' + ai_cgor_pic_info;
					reqParam += '&mailTitle=' + 'ARRIVAL NOTICE / INVOICE [HAWB No : ' + encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow()), "bl_no") + ']';
	         		reqParam += '&mailTo=' + mailTo;
					popGET('RPT_PRN_0140.clt'+reqParam, '', 480, 290, "scroll:yes;status:no;help:no;");
				}
		   	 	break;
	   	 	case "PreliminaryClaim":
	   	 		
				if(sheetObj1.RowCount()== 0){
					//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					var sRow=sheetObj1.GetSelectRow();
					var reqParam='?air_sea_tp=' + 'A';
					reqParam += '&intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
					reqParam += '&hbl_no=' + encodeURIComponent(sheetObj1.GetCellValue(sRow, "bl_no"));
					reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
					
					/*reqParam += '&cgor_pic_info=' + oi_cgor_pic_info;*/
					popGET('RPT_PRN_0230.clt'+reqParam, '', 620, 565, "scroll:yes;status:no;help:no;");
				}
				break;			
	   	 	case "CCN":
	   	 		if(sheetObj1.GetTotalRows()== 0){
	   	 			//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 		}
	   	 		else{
	   	 			printHouseCcn();
	   	 		}
		   	 	break;
           	//2011/12/07 Chungrue 추가 Authority to make entry 인쇄물
	   	 	case 'AUTHORITY':
	   	 		formObj.file_name.value='authority_01.mrd';
	        	formObj.title.value='AUTHORITY TO MAKE ENTRY';
	        	formObj.mailTitle.value = "AUTHORITY TO MAKE ENTRY" + " [HAWB No : " + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no") + "]";
				//Parameter Setting
	        	var param='[' + formObj.f_email.value + ']';										// USER EMAIL';	[1]
	        	param += '[' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq") + ']';		// [2]
	        	param += '[' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "ref_ofc_cd")+'MAINCMP]';	// CURR BRANCH [3]
	        	param += '[' + formObj.f_usr_nm.value + ']';										// [4]
	        	param += '[' + formObj.f_phon.value + ']';											// [5]
	        	param += '[' + formObj.f_fax.value + ']';											// [6]
				formObj.rd_param.value=param;
				formObj.rpt_biz_tp.value="AIH";
				formObj.rpt_biz_sub_tp.value="AT";
				formObj.rpt_pdf_file_nm.value=getPdfFileNm();
				
				//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청	 
				var t_attachFileName = formObj.title.value + "_" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no");
				t_attachFileName = t_attachFileName.replace(/\./g, "");
				t_attachFileName = t_attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
				formObj.rpt_file_name_title.value = t_attachFileName;
				
				popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				break;
	   	 	case "RELEASE_ORDER":
				if(sheetObj1.GetTotalRows()== 0){
					//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
					var reqParam='';
					reqParam += '?s_intg_bl_seq=' + intgBlSeq;
//					reqParam += '?s_intg_bl_seq=18770';
					reqParam += '&f_bl_no=' + hblNo;
					reqParam += '&cust_ref_no=' + custRefNo;
					popGET('SEI_DOC_1081.clt'+reqParam, '', 600, 478, "scroll:yes;status:no;help:no;");
				}
           	break;
	   	 	case "P_O_D":
	   	 		if(sheetObj1.GetTotalRows()== 0){
	   	 			//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 		}else{
	   	 			var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
	   	 			var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
	   	 			var custRefNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
	   	 			var reqParam='';
	   	 			reqParam += '?s_intg_bl_seq=' + intgBlSeq;
//					reqParam += '?s_intg_bl_seq=18770';
	   	 			reqParam += '&f_bl_no=' + hblNo;
	   	 			reqParam += '&cust_ref_no=' + custRefNo;
	   	 			popGET('SEE_BMD_0063.clt'+reqParam, '', 600, 660, "scroll:yes;status:no;help:no;");
	   	 		}
	   	 		break;
		   	case "ITNTE":
					if(sheetObj1.GetTotalRows()== 0){
						//There is no data
		   	 			alert(getLabel('FMS_COM_ALT004'));
					}else{
						var intgBlSeq=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
						var hblNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
						var reqParam='?intg_bl_seq=' + intgBlSeq;
						reqParam += '&hbl_no=' + hblNo;
						reqParam += '&f_ofc_cd=' + ofcCd;					
						reqParam += '&air_sea_tp=' + "A";
						popGET('RPT_PRN_0170.clt'+reqParam, '', 480, 130, "scroll:yes;status:no;help:no;");
					}
	     	break;
		   	case 'CERTIFICATE':
	   			// /////////////////////////////////////////////////////////
	   			// 프린트
	   			var formObj=document.frm1;
	   			formObj.file_name.value="carrier_certificate_01.mrd";
	   			formObj.title.value="Carrier's Certificate";
	   			// Parameter Setting
	   			var param='';
	   			param += '[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") + ']'; // $1
	   			param += '[A]';
	   			formObj.rd_param.value=param;
	   			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   			// /////////////////////////////////////////////////////////
	   		break;
		   	case "PROFIT_REPORT":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
				}else{
					var sRow=sheetObj1.GetSelectRow();
					var reqParam='?intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
					reqParam += '&hbl_no=' + sheetObj1.GetCellValue(sRow, "bl_no");
					reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
					reqParam += '&air_sea_clss_cd=' + "A";
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
		   		   		paramStr+= 'f_mhbl_no=' + (sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no') == "-1" ? "" : sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no'))
		   		   				+"&s_intg_bl_seq="+(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'intg_bl_seq') == "-1" ? "" : sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'intg_bl_seq'))
		   		   				+"&f_ref_no="+(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no') == "-1" ? "" : sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no'));
		   		   		paramStr+= "&refType=fileNo";
		   		   		paramStr+= "&linkFlag=Y&blType=HBL";
		   		   		
		   		   		//#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : Link시 검색기간 제외 조회 옵션처리
						paramStr+= "&linkOpt=KEY";
						// OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
						paramStr+= "&f_air_sea_clss_cd=A&f_bnd_clss_cd=I";
						
		   		   		parent.mkNewFrame('Invoice List', paramStr);
	   	 		}

	   	 	break;
		   	case "EXCEL":
		   		if(docObjects[0].RowCount() < 1){//no data	
	    			ComShowCodeMessage("COM132501");
	    		}else{
	    			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
	    		}
	   	 	break;
		   	case "HAWB_COPY":
		   		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
	   				//Select Please.
	   				alert(getLabel('FMS_COM_ALT004'));
	   				return;
	   	 		}
		   		else{
	   	 			if(confirm(getLabel('FMS_COM_CFMCPY'))){
	   	 				var paramStr="./AII_BMD_0020.clt?";
	   	 				paramStr+= "f_cmd=" + COMMAND05;
	   	 				paramStr+= "&intg_bl_seq=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	   	 				parent.mkNewFrame('Booking & Booking & House AWB Entry', paramStr);
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
					alert(getLabel('FMS_COM_ALT117'));
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
	   	 			
	   	 			if(confirm(getLabel('FMS_COM_CFMDEL'))){
	   	 				frm1.f_cmd.value=REMOVE;
	   	 				delete_show_msg = "Y";
	   	 				frm1.intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	   	 				frm1.rlt_intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "rlt_intg_bl_seq");
	   	 				docObjects[0].DoSearch("./AII_BMD_0060GS.clt", FormQueryString(formObj) );
	   	 			}
	   	 		}
	   	 		else{
	   	 			//You Cannot delete HAWB. Because Invoice was already Issued.
	   	 			alert(getLabel('FMS_COM_ALT022'));
	   	 			return;
	   	 		}
	   	 		
	   	 		
	   	 		
	   	 		break;
		   	case "HAWB_CLAIM":
		   		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq")!="-1"){
		   			var formObj=document.frm1;
		   			formObj.file_name.value="pre_claim.mrd";
		   			formObj.title.value="PRE-CLAIM";
		   			// Parameter Setting
		   			var param='';
		   			param += '[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") + ']'; // $1
		   			param += '/reditmode /rfixallobject';
		   			formObj.rd_param.value=param;
		   			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   		}
		   		break;
		   	case "SNDEML":	//Email전송
	   	 		var reqParam='?intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	    		reqParam += '&openMean=SEARCH01';
	    		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
	   	   		break;
	   	 	case "MBL_LIST":
	   	 		var refNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'ref_no');
				var mblNo="";
			   	var paramStr="./AII_BMD_0070.clt?";
			   	paramStr+= 'f_ref_no=' + refNo + '&f_mbl_no=' + mblNo;
			   	paramStr += "&linkFlag=Y";
			   	parent.mkNewFrame('Master B/L List', paramStr);
			break;
	        case "WORK_ORDER":	//Work Order 화면호출
	        	/*var param='f_intg_bl_seq=' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
		   		   param += '&air_sea_clss_cd=A'; 
		   		   param += '&bnd_clss_cd=I';
		   		   param += '&biz_clss_cd=H';
            var paramStr="./AIC_WOM_0017.clt?f_cmd="+SEARCH01+"&s_type=B&"+param;
            parent.mkNewFrame('Pick/Delivery Instruction', paramStr);*/
            
            var paramStr="./AIC_WOM_0017.clt?air_sea_clss_cd=A&bnd_clss_cd=I&biz_clss_cd=H";
            var param = "&f_cmd=" + SEARCH01;
            param += "&s_type=B";
            param += "&f_intg_bl_seq=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
            param += "&delivery_ref_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cust_ref_no");
            parent.mkNewFrame('Pick/Delivery Instruction', paramStr + param);
            
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
	   	    
	   	    case "CARGO_TRACKING":
	   	    	
	   	 		//#998 [SHINE] TRACK-TRACE 기능 Container No. 로 조회 추가
	   	    	var blNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "mbl_no");
	   	 		if( ComIsNull(blNo) || sheetObj1.RowCount()== 0)
	   	 		{
	   	 			alert(getLabel('FMS_COM_ALT051'));
	   	 		}else{
	   	 			
	   	 			var param='intg_bl_seq=' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
	   	 			param += '&air_sea_clss_cd=A';
	   	 			param += '&bnd_clss_cd=I';
	   	 			param += '&biz_clss_cd=H';
	   	 			param += '&bl_no='+blNo;
	   	 			var paramStr="./SEE_BMD_0600.clt?f_cmd="+SEARCHLIST+"&s_type=B&"+param;
	   	 			parent.mkNewFrame('Tracking', paramStr);
	   	 		}
	   	    	break; 		   	    
	   	    
		   	    //#2900 PQC★[CLA] - AIR 화면 적용 MISSING EXCEL(ALL) FUNCTION KEY
				case "EXCEL_ALL":
					excelDown(sheetObj1);
				break;		
		   	 	case "PRNR2_TRDP_POPLIST": //openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
			   		
			   		callBackFunc = "PRNR2_TRDP_POPLIST";
			   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		   	        
		   	        break;				
        } // end switch
		
		//Log Monitor Start:Btn
		if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
		//Log Monitor End:Btn
		
	}
	catch(e){
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
//        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
//            var cal = new ComCalendarFromTo();
//        	cal.select(formObj.eta_strdt,formObj.eta_enddt, 'MM-dd-yyyy');
//        break;
//        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
//	        var cal = new ComCalendarFromTo();
//        	cal.select(formObj.f_eta_strdt,formObj.f_eta_enddt, 'MM-dd-yyyy');
//        break;
//        case 'DATE2':   //달력 조회 팝업 호출      
//             var cal=new calendarPopup();
//             cal.select(formObj.s_bkg_dt_tm, 's_bkg_dt_tm', 'yyyy-MM-dd');
//        break;
//	    case 'DATE13':   //달력 조회 From ~ To 팝업 호출 
//		    var cal = new ComCalendarFromTo();
//        	cal.select(formObj.etd_strdt,formObj.etd_enddt, 'MM-dd-yyyy');
//	    break;
//	    case 'DATE14':   //달력 조회 From ~ To 팝업 호출 
//	    	var cal=new ComCalendarFromTo();
//	        cal.displayType="date";
//	        cal.select(formObj.post_strdt,  formObj.post_enddt,  'MM-dd-yyyy');
//        break;	
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
          	var cal=new ComCalendarFromTo();
              cal.displayType="date";
              cal.select(formObj.f_strdt, formObj.f_enddt, 'MM-dd-yyyy');
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
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
//	if(formObj.f_h_ofc_cd.value != ""){
//		formObj.f_ofc_cd.value = formObj.f_h_ofc_cd.value;
//	}
	
	setCondition("R", formObj.f_date_type, formObj.f_strdt, formObj.f_enddt);
	
	var opt_key_s = "AN_FIRST_SEND_DATE";
    ajaxSendPost(setAnFaxMailFiled, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_s, "./GateServlet.gsl");
    
	//	개인정보 관리화면 정렬순서 2016.03 
	ajaxSendPost(setOrderByInfo, 'reqVal','&goWhere=aj&bcKey=searchTbUserOrderbyInfoAttr&pgm_usr_id='+formObj.user_id.value+'&pgm_url=./AII_BMD_0060.clt',	'./GateServlet.gsl');
    
    
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

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AII_BMD_0060_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"mbl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,UpdateEdit:0, InsertEdit:0  },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Left",    ColMerge:0,   SaveName:"ref_ofc_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Image",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"view_mbl",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"prnr_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"prnr_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm1",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm2",         KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"f_eta_dt_tm1",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"f_eta_dt_tm2",       KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm1",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm2",         KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"flt_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"shpr_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"shpr_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cnee_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cnee_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"act_shpr_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"act_shpr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ntfy_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"ntfy_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"lnr_trdp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },	               
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"pol_cd",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"pod_cd",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Left",  ColMerge:1,   SaveName:"door_loc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	        	   {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"door_loc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:0,   SaveName:"ts1_port_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"ts2_port_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"ts3_port_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cust_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cust_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Int",       Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"pck_qty",            KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"grs_wgt1",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cfs_trdp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cfs_trdp_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:105,  Align:"Center",  ColMerge:0,   SaveName:"cgo_rlsd_on_dt_tm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"ccn_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"mnf_fr_loc",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"mnf_to_loc",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"frt_chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ar_chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ap_chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dc_chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"memo",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_usr_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"sls_usr_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"post_dt",            KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               //#4980 [Best Ocean] Created Time and Last Modify Time columns add to BL List
	               {Type:"Date",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"modi_usr_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               //#6837 : [JAPT] B/L Type column add request on BL List
	               {Type:"Combo",      Hidden:0, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"hbl_tp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                
	               {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"an_fax_snd_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"an_eml_snd_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cust_ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"rlt_intg_bl_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"trk_trdp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"trk_trdp_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"bl_sts_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
	               {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"po_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0}];
	         
		        InitColumns(cols);
	
		        SetEditable(1);
		        SetImageList(0,APP_PATH+"/web/img/button/btns_view.gif");
		        SetDataLinkMouse('view_mbl',1);
		        InitViewFormat(0, "post_dt", 	"MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
		        SetColProperty("cgo_rlsd_on_dt_tm", {Format:"##-##-######:##"} );
		        InitViewFormat(0, "eta_dt_tm1",  "MM-dd-yyyy");
		        InitViewFormat(0, "eta_dt_tm2",  "HH:mm");
		        InitViewFormat(0, "f_eta_dt_tm1",  "MM-dd-yyyy");
		        InitViewFormat(0, "f_eta_dt_tm2",  "HH:mm");
		        InitViewFormat(0, "etd_dt_tm1",  "MM-dd-yyyy");
		        InitViewFormat(0, "etd_dt_tm2",  "HH:mm");
		        SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		        if(USE_FAX_MAIL == 'N'){
				    SetColHidden("an_fax_snd_dt", 1);
		  		    SetColHidden("an_eml_snd_dt", 1);
		        }else{
		        }
		        SetSheetHeight(SYSTEM_ROW_HEIGHT*18);
		        //sheetObj.SetFocusAfterProcess(1);
		        
		        var formObj = document.frm1;  
		        var COMBOBLTypeTEXT = '';
				var COMBOBLTypeCODE = '';
				for(var i=1; i<formObj.f_hbl_tp_cd.options.length; i++){
					COMBOBLTypeTEXT = COMBOBLTypeTEXT + '|' + formObj.f_hbl_tp_cd.options[i].text;
					COMBOBLTypeCODE = COMBOBLTypeCODE + '|' + formObj.f_hbl_tp_cd.options[i].value;
				}
				SetColProperty('hbl_tp_cd', {ComboText:COMBOBLTypeTEXT, ComboCode:COMBOBLTypeCODE} );
		   }                                                      
	    break;
		 case 2:      //IBSheet1 init
		    with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('AII_BMD_0060_HDR2'), Align:"Center"} ];
		        InitHeaders(headers, info);

		        var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"mbl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"shipper_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"shipper_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"consignee_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"consignee_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:0,  Width:140,  Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:0,  Width:140,  Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bl_sts_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 } ];
		         
		        InitColumns(cols);
		        SetCountPosition(0);
		        SetEditable(0);
		        SetColProperty("etd_dt_tm", {Format:"####-##-## ##:##"} );
		        SetColProperty("eta_dt_tm", {Format:"####-##-## ##:##"} );
		        SetSheetHeight(SYSTEM_ROW_HEIGHT*5);
		        //sheetObj.SetFocusAfterProcess(0);
		   }                                                      
	    break;
		 case 3:					//첨부파일
			 initMemo(sheetObj);
			 break;
    }
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
	 sheetObj.SetSelectRow(sheetObj.HeaderRows());
	}

function sheet2_OnSort(sheetObj, col, sortArrow) {
	 sheetObj.SetSelectRow(sheetObj.HeaderRows());
	}

function sheet3_OnSort(sheetObj, col, sortArrow) {
	 sheetObj.SetSelectRow(sheetObj.HeaderRows());
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
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=='view_mbl'){
		var formObj=document.frm1;
	    var sheetObj1=docObjects[0];
		var sheetObj2=docObjects[1];
	  	searchSheet2(sheetObj,Row,Col);
	  	
		var intg_bl_seq =  sheetObj.GetCellValue(Row, "intg_bl_seq");
		var palt_mnu_cd = 'AIH';
		var opr_no = sheetObj.GetCellValue(Row, "bl_no");
		setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
		doWorkMemo("SEARCHMEMO");
	}
	else if(Col==-2){
		var intg_bl_seq =  sheetObj.GetCellValue(Row, "intg_bl_seq");
		var palt_mnu_cd = 'AIH';
		var opr_no = sheetObj.GetCellValue(Row, "bl_no");
		setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
		doWorkMemo("SEARCHMEMO");
	}
	/*
	else{
if(curBlNo!=''&&curBlNo!=sheetObj.GetCellValue(Row, 'bl_no')){
			docObjects[1].RemoveAll();
		}
	}
	*/
	//#5702 [IMPEX-LA] AI ATME Email Sending
	//formObj.f_intg_bl_seq.value=docObjects[0].GetCellValue(Row, "intg_bl_seq");
	formObj.intg_bl_seq.value=docObjects[0].GetCellValue(Row, "intg_bl_seq");
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr!='view_mbl'){
		var formObj=document.frm1;
	   	doProcess=true;
	   	formObj.f_cmd.value="";                   
	   	//var paramStr = "./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no="+sheetObj.CellValue(Row,"bkg_no")+"&f_intg_bl_seq="+sheetObj.CellValue(Row,"intg_bl_seq");
	   	var paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no="+escape(sheetObj.GetCellValue(Row,"bkg_no"))+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row,"intg_bl_seq") + "&f_bl_no="+escape(sheetObj.GetCellValue(Row,"bl_no"));
	   	parent.mkNewFrame('Booking & House AWB Entry', paramStr, "AII_BMD_0020_SHEET_" + sheetObj.GetCellValue(Row,"bkg_no")+"_"+sheetObj.GetCellValue(Row,"intg_bl_seq") + "_"+escape(sheetObj.GetCellValue(Row,"bl_no")));
	}
}
function sheet2_OnDblClick(sheetObj,Row,Col){	
   	var paramStr="./AII_BMD_0040.clt?f_cmd="+SEARCHLIST;
   	paramStr+= '&f_ref_no='+sheetObj.GetCellValue(Row, 'ref_no');
   	parent.mkNewFrame('Master AWB Entry', paramStr, "AII_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no'));
}
/**
 * sheet2 search
 */
function searchSheet2(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	formObj.s_intg_bl_seq.value=sheetObj1.GetCellValue(Row,"intg_bl_seq");
	formObj.master_bl_no.value=sheetObj1.GetCellValue(Row,"bl_no");
	formObj.f_cmd.value=SEARCHLIST02;
	sheetObj2.DoSearch("./AII_BMD_0060_1GS.clt", FormQueryString(formObj) );
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
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value=masterVals[0];
				formObj.f_pod_nm.value=masterVals[3];
			}else if(CODETYPE == "location_dest"){
				formObj.fnl_dest_loc_cd.value=masterVals[0];
				formObj.fnl_dest_loc_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=masterVals[0]; 
				formObj.f_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "location_dest"){
				formObj.fnl_dest_loc_cd.value="";
				formObj.fnl_dest_loc_nm.value="";
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
		}
	}
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){		
		if(delete_show_msg == 'Y'){
			setTimeout("showCompleteProcess()",1000);
			delete_show_msg = 'N';
		}
	} 	
	if(frm1.f_cmd.value==REMOVE){
		doWork("SEARCHLIST");
	}
	frm1.intg_bl_seq.value=sheetObj.GetCellValue(1, "intg_bl_seq");
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
function sheet2_OnSearchEnd(sheetObj, errMsg){
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "bl_sts_cd") == "HF") {
			sheetObj.SetCellValue(i, "block_flag","Y");
			sheetObj.SetCellFontColor(i, "block_flag","#FF0000");
		}
	}
}
function sheet1_OnChange(sheetObj, rowIdx, colIdx){
	var colStr=sheetObj.ColSaveName(colIdx);
	if(colStr=="cls_check"){
		if(sheetObj.GetCellValue(rowIdx, 'bl_sts_cd')!='HO'){
			sheetObj.SetCellValue(rowIdx, 'cls_check',0,0);
		}
	}
}
function sheet1_OnMouseMove(sheetObj, row, col){
//	if(sheetObj.MouseCol()==0){
//		sheetObj.ToolTipOption="balloon:true;width:320;backcolor:#FFFFE0;forecolor:#000000;icon:0;title:Memo";
//		var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "memo");
//		memo=memo.replaceAll("@^^@", "\n");
//		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(),memo);
//	}
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
function getSelectedFiles(){
//	return docObjects[2];
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
 function sheet3_OnDblClick(sheetObj,Row,Col){
		//Name선택 시에만 팝업 호출
		if(sheetObj.ColSaveName(Col)=='palt_doc_no' || sheetObj.ColSaveName(Col)=='palt_doc_msg'){
			var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
			reqParam += '&s_palt_doc_seq='+sheetObj.GetCellValue(Row,"palt_doc_seq");
			reqParam += '&openMean='+SEARCH02;
			popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDocUp', 806, 550, "scroll:no;status:no;help:no;");
		}
	}
function sheet3_OnMouseMove(sheetObj, row, col){
	if(sheetObj.MouseCol()==9){
		sheetObj.ToolTipOption="balloon:true;width:320;backcolor:#FFFFE0;forecolor:#000000;icon:0;title:Message";
		var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "palt_doc_msg");
		memo=memo.replaceAll("@^^@", "\n");
		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(),memo);
	}
} 
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet3_OnClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet3_OnClick(sheetObj, Row, Col){	
   	var downType;
   	var s_palt_doc_seq;
   	var s_intg_bl_seq;
	switch (sheetObj.ColSaveName(Col)) {
        case "palt_doc_img_url" :
        	if(sheetObj.GetCellImage(Row, "palt_doc_img_url") != ""){
        		s_palt_doc_seq=sheetObj.GetCellValue(Row,"palt_doc_seq");
        		s_intg_bl_seq = sheetObj.GetCellValue(Row, "intg_bl_seq_d");
                downloadFile('org', s_intg_bl_seq, s_palt_doc_seq);
        	}
        break;
        case "palt_doc_pdf_url" :
        	if(sheetObj.GetCellImage(Row, "palt_doc_pdf_url") != ""){
        		s_palt_doc_seq=sheetObj.GetCellValue(Row,"palt_doc_seq");
        		s_intg_bl_seq = sheetObj.GetCellValue(Row, "intg_bl_seq_d");
	            downloadFile('pdf', s_intg_bl_seq, s_palt_doc_seq);
        	}
        break;
        case "palt_doc_msg":
//        	frm1.memo_txt.value = sheetObj.CellValue(Row, Col);
        break;
	} // end switch
}
function downloadFile(downType, s_intg_bl_seq, s_palt_doc_seq){
	document.frm2.docType.value=downType;
	document.frm2.s_palt_doc_seq.value=s_palt_doc_seq;
	document.frm2.intg_bl_seq.value = s_intg_bl_seq;
	//document.frm2.target = '_self';
	document.frm2.submit();
}
function clearAll(){
	//docObjects[0].RemoveAll();
	//docObjects[1].RemoveAll();
//	docObjects[2].RemoveAll();
	var formObj=document.frm1;
	formObj.f_hbl_tp_cd.selectedIndex=0;
	formObj.f_tp_type.selectedIndex=0;
	formObj.f_date_type.selectedIndex=0;
	formObj.f_search_no_tp.selectedIndex=0;
	formObj.f_isb_pic_sel_cd.selectedIndex=0;
	formObj.f_inco_cd.selectedIndex=0;
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
	if (uod_flg == "N"){ 
		formObj.opr_usrid.value=usrId;
	}
	
	formObj.f_grs_wgt_sel_cd.selectedIndex=0;

}
function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST')
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
function sheet3_OnSaveEnd(sheetObj, row, col){
	doWork("SEARCHLIST03");
}
function sheet3_OnSearchEnd(sheetObj, row, col){
	var formObj=document.frm1;
//	if(docObjects[2].SearchRows>0){
//		formObj.memo_txt.value = docObjects[2].CellValue(1, "palt_doc_msg");
//	}
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
		param += '[' + ofcCd + ']';															// [2] ofc_cd
		param += '[' + frm1.f_phon.value + ']';												// [3] tel
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

function CNEE_TRDP_POPLIST(rtnVal){
 	var formObj=document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cnee_trdp_nm.value=rtnValAry[2];//full_nm
	}    
}

function ACNEE_TRDP_POPLIST(rtnVal){
 	var formObj=document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ahpr_trdp_nm.value=rtnValAry[2];//full_nm
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

function FNL_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.fnl_dest_loc_cd.value=rtnValAry[0];//loc_cd 
		formObj.fnl_dest_loc_nm.value=rtnValAry[2];//loc_nm
	} 
}

function SHIP_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_shpr_trdp_nm.value=rtnValAry[2];//full_nm
	}       
}

function AHPR_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
 	}
 	else{
 		var rtnValAry=rtnVal.split("|");
 		formObj.f_ahpr_trdp_nm.value=rtnValAry[2];//full_nm
 	}        
}

function PRNR_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
 	}
 	else{
 		var rtnValAry=rtnVal.split("|");
 		formObj.f_trdp_nm.value=rtnValAry[2];//full_nm
 	}  
}

function CUST_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
 	}
 	else{
 		var rtnValAry=rtnVal.split("|");
 		formObj.f_cust_trdp_nm.value=rtnValAry[2];//full_nm
 	}     
}

function PRNR2_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_trdp_nm.value=rtnValAry[2];//full_nm
	}
}

function setHblSizeUp(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*32);//height
}
function setHblSizeDown(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*18);//height
}

function getPdfFileNm(){
	var formObj=document.frm1;
	var pdfFileNm = "";
	var bl_no = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no");
	
	if (bl_no == "" || bl_no == "undefined" || bl_no == undefined) {
		return "";
	}
	pdfFileNm = "AUTH_HBL_"+bl_no;	
	return pdfFileNm;
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

function searchValueSet() {
	var formObj = document.frm1;
	
	if (formObj.f_isb_pic_sel_cd.value == "PIC") {
		formObj.sls_tp_cd.value = "PIC";
	} else if (formObj.f_isb_pic_sel_cd.value == "ISB") {
		formObj.sls_tp_cd.value = "ISB";
	} else if (formObj.f_isb_pic_sel_cd.value == "OR") {
		formObj.sls_tp_cd.value = "OR";
	}
	if(formObj.f_search_no_tp.value == "LC"){
		formObj.f_lc_no.value=formObj.f_search_no.value;
		formObj.f_inv_no.value="";
		formObj.f_lnr_bkg_no.value="";
		formObj.f_exp_ref_no.value="";
	}else if(formObj.f_search_no_tp.value == "INV"){
		formObj.f_lc_no.value="";
		formObj.f_inv_no.value=formObj.f_search_no.value;
		formObj.f_lnr_bkg_no.value="";
		formObj.f_exp_ref_no.value="";
	}else if(formObj.f_search_no_tp.value == "LNR_BKG_NO"){
		formObj.f_lc_no.value="";
		formObj.f_inv_no.value="";
		formObj.f_lnr_bkg_no.value=formObj.f_search_no.value;
		formObj.f_exp_ref_no.value="";	
	}else if(formObj.f_search_no_tp.value == "EXP_REF_NO"){
		formObj.f_lc_no.value="";
		formObj.f_inv_no.value="";
		formObj.f_lnr_bkg_no.value="";
		formObj.f_exp_ref_no.value=formObj.f_search_no.value;
	}	
	
}
function searchValueClear(obj) {
	
	var formObj = document.frm1;
	
	if(obj.name == "f_isb_pic_sel_cd"){
		if (uod_flg == "N"){ 
			
		}else{
			formObj.opr_usrid.value = "";
			formObj.opr_usrnm.value = "";
			formObj.sls_tp_cd.value = "";
		}
	} else {
		if (obj.name == "f_grs_wgt_sel_cd"){ // #4635 [BNX] G.WGT(LB) search condition.
			if(uod_flg == "N"){
				
			} else {
				formObj.fm_grs_wgt.value = "";
				formObj.to_grs_wgt.value = "";
			}
		}
	}
}

//#2900 PQC★[CLA] - AIR 화면 적용 MISSING EXCEL(ALL) FUNCTION KEY
function excelDown(mySheet){
	
	var formObj = document.frm1;
	
	if(!formValidation()){
		return;
	}
	
//	var f_dt_tp = $(":input:radio[name=f_date_type]:checked").val();
	
//	if(formObj.etd_strdt.value == "" && formObj.eta_strdt.value == ""){
    if(formObj.f_strdt.value == "" ){
	
		ComShowCodeMessage("COM132602");
		formObj.f_strdt.focus();
		return;
	}
	
	formObj.f_cmd.value = COMMAND10;
	
	
	var formParam = FormQueryString(formObj);
	
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,Merge:1
					,URL:"./AII_BMD_0060.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};	
	mySheet.DirectDown2Excel(param);
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