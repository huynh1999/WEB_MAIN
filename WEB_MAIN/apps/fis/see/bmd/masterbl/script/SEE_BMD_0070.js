/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0070.jsp
*@FileTitle  : Master B/L Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var delete_show_msg = "N";
var isPdOrdStsOk=false;
var isInvStsOk=false;
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
//	setFromToDtEndPlus(document.frm1.f_strdt, 180, document.frm1.f_enddt, 30);
}
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){	//단축키사용가능여부체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];	
	var sheetObj3=docObjects[2];	
	try {
		formObj.rpt_file_name_title.value = "";
		switch(srcName) {
    	   	case "SEARCHLIST":
//    	   		if(!formValidation()) return;
    	   		// search 조건 추가로 combo box 이용한 추가 조건 set
    			searchValueSet();
	   			if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
	   				formObj.f_cmd.value = SEARCHLIST01;
	   				sheetObj2.RemoveAll();
	   				sheetObj3.RemoveAll();
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
	   							&& "" == formObj.f_lnr_bkg_no.value
	   							){
	   						if("" == formObj.f_strdt.value && "" == formObj.f_enddt.value && allEmpty == false){	   							
		   						formObj.f_strdt.value = dtFm;
		   						formObj.f_enddt.value = dtTo;
	   						}
	   					}else if("" != formObj.f_ref_no.value || "" != formObj.f_mbl_no.value || "" != formObj.f_hbl_no.value
	   							||"" != formObj.f_lnr_bkg_no.value){
	   					    /* binex 요구로 검색 기간 까지 검색되도록 수정 
	   						formObj.f_strdt.value = "";
	   						formObj.f_enddt.value = "";
	   						dateValidFlag = false; */
	   					}
	   					if(dateValidFlag){
		   					if(chkCmprPrdSc(formObj.f_strdt, formObj.f_enddt)){
		   						sheetObj1.DoSearch("./SEE_BMD_0070GS.clt", FormQueryString(formObj) );
		   					}
	   					}else{
	   						sheetObj1.DoSearch("./SEE_BMD_0070GS.clt", FormQueryString(formObj) );
	   						//#5183 [BINEX] AFTER V470.06 RELEASE, CANT SEARCH W FILING # & ETD TOGETHER
	   						//이전 검색 date 세팅 
	   						/* binex 요구로 검색 기간 까지 검색되도록 수정 
	   						formObj.f_strdt.value = tempStrdt;
	   						formObj.f_enddt.value = tempEnddt; */
	   					}
	   				}
	   				loadSearchFlag = true;
	   				initDatLod = "Y";
	   				//Log Monitor Start
			   		gLogMonitor();
	   	 			//Log Monitor End
	   			}
			    break;
           	case "NEW":
           		parent.parent.mkNewFrame('Master B/L Entry', './SEE_BMD_0040.clt');
           		break;
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
            	   docObjects[0].DoSave("./SEE_BMD_0070GS.clt", FormQueryString(frm1),"ibflag", false);
               }
               break;
           	case "POR_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
		   		callBackFunc = "POR_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	        
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
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	        
    	        break;
			case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
		   		callBackFunc = "POD_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
    	        
    	        break;
			case "DEL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
		   		callBackFunc = "DEL_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
				
				break;
	   	 	case "PRNR2_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
	   	 	case "CARR_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
	   	 	callBackFunc = "CARR_TRDP_POPLIST";
	   	 	//2017.03.15
	   	 	if( formObj.f_lt_ct_sel_cd.value == "CTP" ){
	   	 		modal_center_open('./CMM_POP_0010.clt?callTp=LN', rtnary, 1150,650,"yes");
	   	 	}else{
	   	 		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 	}
	   		
	   	 		           
	   	 		break;
	   	 	case "CargoManifest":
				if(sheetObj1.GetTotalRows()== 0){
					//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					var reqParam='?intg_bl_seq='  + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					reqParam += '&bl_no=' +sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					popGET('RPT_PRN_0130.clt'+reqParam, '', 480, 530, "scroll:yes;status:no;help:no;");
				}
				break;
	   	 	case "PROFIT_REPORT":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}
		   	 	else{
					var sRow=sheetObj1.GetSelectRow();
						var reqParam='?intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
						reqParam += '&mbl_no=' + sheetObj1.GetCellValue(sRow, "bl_no");
						reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
						reqParam += '&air_sea_clss_cd=' + "S";
						reqParam += '&bnd_clss_cd=' + "O";
						reqParam += '&biz_clss_cd=' + "M";
					popGET('RPT_PRN_0180.clt'+reqParam, '', 1270, 750, "scroll:yes;status:no;help:no;");
				}
		   	 	break;	
	   	 	case "PROFIT_REPORT_BY_HBL":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}
		   	 	else{
					var sRow=sheetObj1.GetSelectRow();
					var reqParam='?intg_bl_seq=' + sheetObj1.GetCellValue(sRow, "intg_bl_seq");
					reqParam += '&mbl_no=' + sheetObj1.GetCellValue(sRow, "bl_no");
					reqParam += '&ref_no=' + sheetObj1.GetCellValue(sRow, "ref_no");
						reqParam += '&air_sea_clss_cd=' + "S";
						reqParam += '&bnd_clss_cd=' + "O";
						reqParam += '&biz_clss_cd=' + "M";
					popGET('RPT_PRN_0190.clt'+reqParam, '', 1100, 670, "scroll:yes;status:no;help:no;");
				}
		   	 	break;	
	   	 	case "GOTOACCT":
	   	 		if(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no')!='-1' || sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no')!='-1'){
		   	 		var formObj=document.frm1;
		   		   	var paramStr="./ACC_INV_0040.clt?";
		   		   	/* #23987, s_mbl_no 링크제거 jsjang 2013.11.25 */
		   		   	//24842 oyh Mbl에서 AP를 눌렀을 경우 Vendor inv no에 MBLno가 세팅안됨 으로 기존 로직으로 재수정
					paramStr+= "f_mhbl_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no');
					paramStr+= "&s_intg_bl_seq=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'intg_bl_seq');
					paramStr+= "&f_ref_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no');
					           			//#22112 Billing Carrier 추가 
					paramStr+= "&s_carr_trdp_cd=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'carr_trdp_cd');
					paramStr+= "&s_carr_trdp_nm=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'carr_trdp_nm');
					paramStr+= "&refType=fileNo";
					paramStr+= "&linkFlag=Y&blType=MBL";
					
					//#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : Link시 검색기간 제외 조회 옵션처리
					paramStr+= "&linkOpt=KEY";
					// OFVFOUR-8124 [OceanBlue] Filing NO - I1OBOI-21083 Invoice has been added after file block
					paramStr+= "&f_air_sea_clss_cd=S&f_bnd_clss_cd=O";
					
		   		   	parent.mkNewFrame('AR/AP List', paramStr);
	   	 		}
	   	 		break;
		   	case "GOTOVERIFY":
		   		 if(sheetObj1.GetTotalRows()== 0){
		   			 //There is no data
		   			 alert(getLabel('FMS_COM_ALT004'));
		   		 } else {
		   			 
		   			 /*var p_date = "";
		   			 var eta_dt_tm = sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'eta_dt_tm');
		   			 var etd_dt_tm = sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'etd_dt_tm');
		   			 
		   			 
		   			 if(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'obl_tp_cd') == "E"){
		   				 if(eta_dt_tm != ""){
		   					p_date = addDate('d', 7, eta_dt_tm, "");
		   				 }
		   			 } else {
		   				 p_date = addDate('d', 1, etd_dt_tm, "");
		   			 }*/
		   				 
		   			 var formObj=document.frm1;
		   			 var paramStr="./ACC_INV_0130.clt?";
					 paramStr+= "&p_ref_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no');
					 //paramStr+= "&p_date=" + p_date;
					 paramStr+= "&p_bnd_clss_cd=" + "O";
					 paramStr+= "&p_biz_clss_cd=" + "M";
		   		   	 parent.mkNewFrame('Payment Verification', paramStr);
		   		 }
	   	 		break;
	   	 	case "CARGO_TRACKING":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
		   	 	}
		   	 	else{
					var blNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					var liner=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "lnr_trdp_nm");
		   	 		var preBlNo=blNo.substring(0,4);
		   	 		var popLink="";
		   	 		var reqParam=""; 
		   	 		/* jsjang 2013.8.20 #19202 carrier link */
		   	 		var cntrNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cntr_no");
	   	 			/* jsjang 2013.9.11 #20775 carrier link - MBL */
		   	 		
		   	 		/* 주석#998 [SHINE] TRACK-TRACE 기능 Container No. 로 조회 추가
		   	 		if(blNo == '' || blNo == null)
		   	 		{		   	 		
		   	 			if(cntrNo == '' || cntrNo == null)
			   	 		{
				   	 		alert(getLabel('FMS_COM_ALT051'));
			   	 		}else{
				   	 		// jsjang 2013.8.20 #19202 carrier link 
				   	 		popLink='http://connect.track-trace.com/for/opus/container/'+cntrNo+'/action,direct';
				   	 		//popGET('http://connect.track-trace.com/for/opus/container/'+cntrNo+'/open,self', '', 1200, 640, "scroll:yes;status:no;help:no;");
				   	 		window.open(popLink + reqParam, "_blank");
		//					popGET(popLink + reqParam, '', 480, 500, "scroll:yes;status:no;help:no;");
			   	 		}
		   	 		}else{
			   	 		popLink='http://connect.track-trace.com/for/opus/billoflading/'+blNo+'/action,direct';
			   	 		window.open(popLink + reqParam, "_blank");
		   	 		}
		   	 		*/
		   	 		
		   	 		//#998 [SHINE] TRACK-TRACE 기능 Container No. 로 조회 추가
		   	 		if( ComIsNull(blNo) && ComIsNull(cntrNo))
		   	 		{
		   	 			alert(getLabel('FMS_COM_ALT051'));
		   	 		}else{
		   	 			
		   	 			var param='intg_bl_seq=' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
		   	 			param += '&air_sea_clss_cd=S';
		   	 			param += '&bnd_clss_cd=O';
		   	 			param += '&biz_clss_cd=M';
		   	 			param += '&bl_no='+sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
		   	 			var paramStr="./SEE_BMD_0600.clt?f_cmd="+SEARCHLIST+"&s_type=B&"+param;
		   	 			parent.mkNewFrame('Tracking', paramStr);
		   	 		}
		   	 		
				}
		   	 	break;
	   	 	case "DOCK_RECEIPT":
				if(sheetObj1.GetTotalRows()== 0){
					//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}else{
					var row=sheetObj1.GetSelectRow();
					var intgBlSeq=sheetObj1.GetCellValue(row, "intg_bl_seq");
					var refOfcCd=sheetObj1.GetCellValue(row, "ref_ofc_cd");
					var param='intg_bl_seq=' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
			  			param += '&air_sea_clss_cd=S';
			  			param += '&bnd_clss_cd=O';
			  			param += '&biz_clss_cd=M';
						param += '&f_mbl_no='+sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
						param += '&f_ref_no='+sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "ref_no");
		            var paramStr="./SEE_BMD_0180.clt?f_cmd="+SEARCHLIST+"&s_type=B&"+param;
		            parent.mkNewFrame('Dock Receipt', paramStr);
				}
			break;	   	 	
	   	 	case "EXCEL":
		   	 	if(docObjects[0].RowCount() < 1){//no data	
		   			ComShowCodeMessage("COM132501");
		   		}else{
		   	 		docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
		   		}
	   	 		break;
		   	 /*Vinh.Vo (S) - 04/10/2015 */
		   	 case "EXCEL_ALL":
		   		// Check if don't have data on grid, don't allow downloading excel file.
				if(docObjects[0].RowCount() < 1){ //no data	
	    			ComShowCodeMessage("COM132501");
	    		}else{
	        	excelDown(sheetObj1);
	    		}
		     break;
		     /*Vinh.Vo (E)*/
	   	 	case "PRINT":
	   	 		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
	   	 			//Select Please.
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
	   	 		else{
		   	 		
		   	 		var sRow = sheetObj1.GetSelectRow();
					var s_intg_bl_seq = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
					/* blueprint #235 */					
					var reqParam='?intg_bl_seq='  + s_intg_bl_seq;
					reqParam += '&usrPhn=' + usrPhn;
					reqParam += '&usrFax=' + usrFax;
					reqParam += '&usrEml=' + usrEml;			
					reqParam += '&bl_no=' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no");
	         		popGET('RPT_PRN_0250.clt'+reqParam, '', 500, 220, "scroll:yes;status:no;help:no;");
	   	 			
	   	 			/*
	         		var formObj=document.frm1;
	    			formObj.file_name.value='SR_SEA.mrd';
	            	formObj.title.value='Ocean Export SR';
	    			//Parameter Setting
	            	var param='[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") + ']';		// [1]
		            	param += '[' + usrPhn + ']';		// [2]
						param += '[' + usrFax + ']';		// [3]
						param += '[' + usrEml + ']';		// [4]
	    			formObj.rd_param.value=param;
	    			formObj.mailTitle.value='Master Set / Shipping Request [MBL No : ' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no") + ']';;
	    			formObj.mailTo.value=mailTo;
	    			formObj.rpt_biz_tp.value="OEM";
	    			formObj.rpt_biz_sub_tp.value="BL";
	    			*/
	    			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
	    			//formObj.rpt_intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	    			
	    			//#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report 
	    			/*
	   	 			if (docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no") != ""){
	    				var v_bl_no = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no"); 
	    				v_bl_no = v_bl_no.replace(/\./g, "");
	    				v_bl_no = v_bl_no.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
	    				formObj.rpt_file_name_title.value = "SR-"+v_bl_no;
	    			} else {
	    				formObj.rpt_file_name_title.value = "";
	    			}
	    			
					popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
					formObj.rpt_biz_tp.value="";
	    			formObj.rpt_biz_sub_tp.value="";
	    			*/
	   	 		}
	   	 		break;
		   	 case "HBL_PRINT":
		   		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq")!="-1"){
		   			var formObj=document.frm1;
		   			ajaxSendPost(getHBLList, 'reqVal', '&goWhere=aj&bcKey=getHBLList&intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq"), './GateServlet.gsl');
		   		}

			   	break;
			
		   	case "FILE_LABEL":  	         	  	         	
    			if(docObjects[0].RowCount() > 0){	
    			var param = "";
				var formObj=document.frm1;
				formObj.f_intg_bl_seq.value = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
				formObj.file_name.value = 'file_label_01_UFF.mrd';
				formObj.title.value='File Label';
				// Parameter Setting
				param += '[' + formObj.f_intg_bl_seq.value + ']'; // $1
				formObj.rd_param.value=param;
				popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);

    			}else {
    				//Please select the row to print.
    				alert(getLabel('FMS_COM_ALT004'));
    		
    				return;
    			}
    			break;   	
			   	
			   	
			case "PACKAGE_LABEL":
				if (sheetObj1.RowCount() == 0) {
					// There is no data
					alert(getLabel('FMS_COM_ALT004'));
				} else {
					var reqParam = '';
					reqParam += '?s_intg_bl_seq='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
					reqParam += '&biz_clss_cd=' + "M";
					reqParam += '&label_type=' + "01";
					popGET('SEE_BMD_0061.clt' + reqParam, '', 600, 280,
							"scroll:yes;status:no;help:no;");
				}
				break;
				
			case "PACKAGE_LABEL2":
				if (sheetObj1.RowCount() == 0) {
					// There is no data
					alert(getLabel('FMS_COM_ALT004'));
				} else {
					var reqParam = '';
					reqParam += '?s_intg_bl_seq='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
					reqParam += '&biz_clss_cd=' + "M";
					reqParam += '&label_type=' + "02";
					popGET('SEE_BMD_0061.clt' + reqParam, '', 600, 280,
							"scroll:yes;status:no;help:no;");
				}
				break;
	   	 	case "COPY":
	   	 		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
	   	 			//Select Please.
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
	   	 		else{
	   	 			if(confirm(getLabel('FMS_COM_CFMCPY'))){
	   	 				var paramStr="./SEE_BMD_0040.clt?";
	   	 				paramStr+= "f_cmd=" + COMMAND02;
	   	 				paramStr+= "&intg_bl_seq=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	   	 				parent.mkNewFrame('Master B/L Entry', paramStr);
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
					alert(getLabel('FMS_COM_ALT116'));
		     	    return;
				}
				
	   	 		ajaxSendPost(doRmvSrInfo, 'reqVal', '&goWhere=aj&bcKey=getHblClsChk&biz_clss_cd=M&intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq"), './GateServlet.gsl');
	   	 		
	   	 		break;	   	 	
	   	 	case "SNDEML":	//Email전송
	   	 		var reqParam='?intg_bl_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	       		reqParam += '&openMean=SEARCH01';
	   	   		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
	   	   		break;
	   	 	case "SEND_AGENT_EDI":	// AGNET EDI 전송
		   	 	if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
	   	 			//Select Please.
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
		   	 	
		   	 	//#4035 B/L EDI validation 추가
		   	 	if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "snd_flg") == "X"){
		   	 		alert(getLabel('FMS_COM_ALT148'));
		   	 		return;
		   	 	}
	    		var reqParam = '?f_trnk_vsl_nm='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trnk_vsl_nm")) 
	    		       + '&f_trnk_voy='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trnk_voy")) 
	    		       + '&f_lnr_trdp_nm='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lnr_trdp_nm")) 
	    		       + '&f_intg_bl_seq='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq")) ;
	    		//#3704 [JAPT] Agent EDI popup 호출 시 bl_no 추가
	    		reqParam+= '&f_mbl_no=' + encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no"));
	    		
	   	   		popGET('./EDI_AGT_0010.clt'+reqParam, 'seeSendAgentEdi', 790, 500, "scroll:no;status:no;help:no;");
	   	   		break;	
	   	   		
	   	   	
	   	 	case "SEND_SI_EDI":	
		   	 	if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
	   	 			//Select Please.
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}

		   	 	var trnk_vsl_nm = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trnk_vsl_nm");
   	 			var trnk_voy = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trnk_voy");
   	 			var lnr_trdp_nm = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lnr_trdp_nm");
   	 			var lnr_trdp_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lnr_trdp_cd");
   	 			
   	 			var paramStr = './EDI_CMM_0010.clt?f_trnk_vsl_nm=' + trnk_vsl_nm + '&f_trnk_voy='+trnk_voy+'&f_lnr_trdp_nm='+lnr_trdp_nm+'&f_lnr_trdp_cd='+lnr_trdp_cd;
   	 			parent.mkNewFrame("EDI Portal", paramStr);

	   	   		break;	
	   	   		
	   	 	case "SEND_VGM_EDI":	
	   	 		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
	   	 			//Select Please.
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
	   	 		
	   	 		var reqParam = '?f_intg_bl_seq='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq")) ;
	   	 		
	   	 		popGET('./EDI_VGM_0010.clt'+reqParam, 'VGM EDI', 1000, 620, "scroll:no;status:no;help:no;");
	   	 		break;	
	   	 		
	   	 	case "SEND_SI_VGM_EDI":	
	   	 		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
	   	 			//Select Please.
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
	   	 		
	   	 		var trnk_vsl_nm = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trnk_vsl_nm");
	 			var trnk_voy = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trnk_voy");
	 			var lnr_trdp_nm = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lnr_trdp_nm");
	 			var lnr_trdp_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lnr_trdp_cd");
	 			
	 			var paramStr = './EDI_CMM_0020.clt?f_trnk_vsl_nm=' + trnk_vsl_nm + '&f_trnk_voy='+trnk_voy+'&f_lnr_trdp_nm='+lnr_trdp_nm+'&f_lnr_trdp_cd='+lnr_trdp_cd;
	 			parent.mkNewFrame("EDI Portal", paramStr);
	 			
	   	 		break;	
	   	 		
	   	 	case "SEND_MBL_EDI":	// M B/L BKG EDI 전송
		   	 	if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") == "-1"){
	   	 			//Select Please.
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
	    		var reqParam = '?f_trnk_vsl_nm='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trnk_vsl_nm")) 
	    		       + '&f_trnk_voy='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trnk_voy")) 
	    		       + '&f_lnr_trdp_nm='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lnr_trdp_nm")) 
	    		       + '&f_intg_bl_seq='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq")) ;
	    		
	   	   		popGET('./EDI_BKG_0020.clt'+reqParam, 'seeSendMblEdi', 795, 700, "scroll:no;status:no;help:no;");
	   	   		break;
	   	 	case "docPackage":
	   	 		if(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no')!='-1' || sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no')!='-1'){
		   	 		var formObj=document.frm1;
		   		   	var paramStr="./SEE_BMD_0100.clt?";
		   		   	paramStr+= "f_bl_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no');
		   		   	paramStr+= "&f_ref_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no');
		   		   	paramStr+= "&f_cmd=" + SEARCH01;
		   		   	parent.mkNewFrame('Document Package', paramStr);
	   	 		}
	   	 		break;
	   	 	case "loadPlan":
	   	 		if(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no')!='-1' || sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no')!='-1'){
	   	 			var formObj=document.frm1;
	   	 			var paramStr="./SEE_DOC_1030.clt?";
	   	 			paramStr+= "s_mbl_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'bl_no');
	   	 			paramStr+= "&s_ref_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), 'ref_no');
	   	 			paramStr+= "&f_cmd=" + SEARCH;
	   	 			parent.mkNewFrame('Load Plan', paramStr);
	   	 		}
	   	 		break;
	   	 	case "shipInstruction":
	   	 		if(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no")!="-1" || sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "ref_no")!="-1"){
	   	 			var formObj=document.frm1;
	   	 			var paramStr="./SEE_BMD_0170.clt?";
					paramStr+= "s_mbl_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
					paramStr+= "&s_ref_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "ref_no");
					paramStr+= "&intg_bl_seq=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
					parent.mkNewFrame("Shipping Instruction", paramStr);
	   	 		}
	   	 		break;
	   	 	case "HBL_LIST":
				{
		   	 		var refNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'ref_no');
					var mblNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'bl_no');
				   	var paramStr="./SEE_BMD_0060.clt?";
				   	paramStr+= 'f_ref_no=' + refNo + '&f_mbl_no=' + mblNo;
				   	paramStr+= "&linkFlag=Y";
				   	parent.mkNewFrame('House B/L List', paramStr);
				}
				break;
				//#27548 [BINEX]BL 공통-HC 단축키 추가
	   	 	case "HBL_ENTRY":
	   	 		if (docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "HC") != "") {
	   	 			var refNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), 'ref_no');
	   	 			if(refNo !=''){
		   	   			var paramStr="./SEE_BMD_0020.clt?";
		   	   			paramStr+= "f_mbl_ref_no=" + refNo;
		   	   			parent.mkNewFrame('Booking & HBL', paramStr);
	   	 			}
	   	 		}

	   	 		break;
		   	/* #20962, Log history, jsjang 2013.10.11 */
	   	 	case "LOG":
		   	 		if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
		   	 		alert(getLabel('FMS_COM_ALT004'));
				}
		   	 	else{
		   	 		if(sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no") == '')
		   	 		{
		   	 			alert(getLabel('FMS_COM_ALT058'));
		   	 		}else{		   	 		
		   	 			var sRow=sheetObj1.GetSelectRow();
		   	 			var reqParam='?s_bl_inv=' + sheetObj1.GetCellValue(sRow, "bl_no");
						//reqParam += '&s_bl_inv=' + sheetObj1.CellValue(sRow, "bl_no");
						reqParam += '&f_his_type=' + "";
						//reqParam += '&his_call_view=' + "Ocean Export SR";
						reqParam += '&f_cmd=' + "11";
						reqParam += '&p_gb=' + "POP";
						//reqParam += '&biz_clss_cd=' + "H";
						//reqParam += '&mbl_no=' + sheetObj1.CellValue(sRow, "mbl_no");
						//formObj.f_cmd.value = -1;
						popGET('MGT_HIS_0041.clt'+reqParam, '', 1240, 670, "scroll:yes;status:no;help:no;");
		   	 		}
				}
		   	 	break;	
		   	 	
	   	 	case "HI_STAT":
		   	 	if(sheetObj1.GetTotalRows()> 0){
	   	 			var formObj=document.frm1;
	   	 			formObj.file_name.value='bnxd_hawaii_statement.mrd';
	   	 			formObj.title.value='Statement';
	   	 			//Parameter Setting
	   	 			var param='[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") + ']'; // [1]
	   	 			param += '[N]'; // [2]  C.O.D. 여부
	   	 			param += '[' + usrPhn + ']'; // [3] Phone
	   	 			param += '[' + usrFax + ']'; // [4] Fax
	   	 			param += '[' + usrEml + ']'; // [5] Email
	   	 			param += '[S]';	// [6] Air/Ocean
	   	 			formObj.rd_param.value=param;
	   	 			formObj.rpt_biz_tp.value="ACCT";
	   	 			formObj.rpt_biz_sub_tp.value="AS";
	   	 			popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
	   	 		}
				break;
				
	   	 	case "HI_STAT_COD":
		   	 	if(sheetObj1.GetTotalRows()> 0){
	   	 			var formObj=document.frm1;
	   	 			formObj.file_name.value='bnxd_hawaii_statement.mrd';
	   	 			formObj.title.value='Statement (C.O.D.)';
	   	 			//Parameter Setting
	   	 			var param='[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq") + ']'; // [1]
	   	 			param += '[Y]'; // [2]  C.O.D. 여부
	   	 			param += '[' + usrPhn + ']'; // [3] Phone
	   	 			param += '[' + usrFax + ']'; // [4] Fax
	   	 			param += '[' + usrEml + ']'; // [5] Email
	   	 			param += '[S]';	// [6] Air/Ocean
	   	 			formObj.rd_param.value=param;
	   	 			formObj.rpt_biz_tp.value="ACCT";
	   	 			formObj.rpt_biz_sub_tp.value="AS";
	   	 			popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
	   	 		}
				break;
	   	    case "OPR_POPLIST":
	   	    	rtnary =new Array(1);
		   		rtnary[0]="1";
		   		callBackFunc = "OPR_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
		   		break;	
		   		
	   	    case "BOOKING_INFO":
				if (sheetObj1.RowCount() == 0) {
					// There is no data
					alert(getLabel('FMS_COM_ALT004'));
				} else {
					var sRow = sheetObj1.GetSelectRow();
					formObj.intg_bl_seq.value = sheetObj1.GetCellValue(sRow,"intg_bl_seq");
					/* blueprint #235 */
	    			var reqParam='?intg_bl_seq='  +formObj.intg_bl_seq.value;  
	         		popGET('RPT_PRN_0241.clt'+reqParam, '', 500, 540, "scroll:yes;status:no;help:no;");
				}
		   		break;	

				//#3355 [JTC]Dock Receipt 수정 (S)
			case "SHIPPING_INSTRUCTION" :
				var paramStr = "";
				paramStr += "./SEE_BMD_0170.clt";
				if(sheetObj1.GetSelectRow() < 0 ) {
					alert("Please select row");
					return;
				}
				//paramStr += "?ref_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "ref_no");
				paramStr += "?intg_bl_seq=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "intg_bl_seq");
				//6301 [JAPT] Mail sending function related request
				paramStr += "&lnr_bkg_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "lnr_bkg_no");
				paramStr += "&trnk_vsl_nm=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "trnk_vsl_nm");
				paramStr += "&trnk_voy=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "trnk_voy");
				var etd_dt_tm = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "etd_dt_tm");
				if(etd_dt_tm != ""){
					etd_dt_tm = etd_dt_tm.substring(0,4) + "." + etd_dt_tm.substring(4,6) + "." + etd_dt_tm.substring(6,8);
				}
				paramStr += "&etd_dt_tm=" + etd_dt_tm;
				paramStr += "&bl_no=" + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "bl_no");
				parent.mkNewFrame('Shipping Instruction (FOR D/R)', paramStr);

				break;
			//#3355 [JTC]Dock Receipt 수정 (E)

        } // end switch
		
		//Log Monitor Start:Btn
		if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
		//Log Monitor End:Btn
		
	}
	catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e); 
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
//            var cal=new calendarPopupFromTo();
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
	
var obl_decimal_len = "";
function loadPage() {
	var formObj=document.frm1;
	var s_ofc_cd=formObj.s_ofc_cd.value;
	
	setCondition("S", formObj.f_date_type, formObj.f_strdt, formObj.f_enddt);
	
	if(s_ofc_cd != ""){
		formObj.f_ofc_cd.value=s_ofc_cd;
	}
	
	//	개인정보 관리화면 정렬순서 2016.03 
	ajaxSendPost(setOrderByInfo, 'reqVal','&goWhere=aj&bcKey=searchTbUserOrderbyInfoAttr&pgm_usr_id='+formObj.user_id.value+'&pgm_url=./SEE_BMD_0070.clt',	'./GateServlet.gsl');

	
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	
	//#314 [IMPEX] OEM & OEH GROSS WEIGHT DB TO MANAGE DECIMAL UP TO 3 PLACES
	var opt_key = "OBL_DECIMAL_LEN";
	ajaxSendPost(setDecimalLen, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    for(var i=0;i<docObjects.length;i++){    
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);        
    }    
    
    // 사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false,"setShortcut");
    //단축키추가.
    //();
    /* LHK 20131118 공통으로 처리
	shortcut.add("Alt+4",function() {
		doWork('PROFIT_REPORT');
	});
	shortcut.add("Alt+5",function() {
		doWork('PROFIT_REPORT_BY_HBL');
	});
     */
    shortcut.add("Alt+B",function() {
    	doWork('docPackage');
    });
    shortcut.add("Alt+G",function() {
    	sheet1_OnDblClick(docObjects[0], docObjects[0].GetSelectRow(), 1);
    });
    
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
function setShortcut(){
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
            var cnt=0;
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, FrozenCol:3 } );
            var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
            var headers = [ { Text:getLabel('SEE_BMD_0070_HDR1'), Align:"Center"} ];
            
            InitHeaders(headers, info);
            var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                //#29408 [BINEX]B/L List 검색조건 추가 - 불필요해서 삭제
                //{Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"hbl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Image",     Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"HC",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Image",     Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"view_hbl",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Combo",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"shp_mod_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ref_ofc_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"hbl_cnt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Date",      Hidden:0,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"doc_cut_off_dt", KeyField:0,   CalcLogic:"",   Format:"YmdHm",      PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Date",      Hidden:0,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"vgm_cut_off_dt", KeyField:0,   CalcLogic:"",   Format:"YmdHm",      PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cntr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cntr_summary",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },    //#1230 HBL list modification--FULLTRANS                
                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"prnr_trdp_cd2",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"prnr_trdp_nm4",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"prnr_trdp_nm3",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"prnr_trdp_nm2",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"shpr_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"shpr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cnee_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cnee_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"carr_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"carr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"trnk_voy",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                //<!--  #943  [PATENT] Lane 추가  -->	
                {Type:"Text",      Hidden:1,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"svc_lane_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"lnr_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },                
                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                //#1743 [PATENT]OEM B/L Pickup Date/Time 필요
                {Type:"Date",      Hidden:0,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"pkup_dt",          KeyField:0,   CalcLogic:"",   Format:"YmdHm",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                //<!-- #1430 [PATENT] 0215_15 B/L TYPE DIVERSELY -->	
                {Type:"CheckBox",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"rlsd_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
                {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"rlsd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
               //#1619 [CLT] Original B/L Type- 항목 정리 {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bl_rlse_tp_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"frt_chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ar_chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ap_chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dc_chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                //#1019 [UFF] Add “FWDR Reference No” column and search field to OEM B/L List
                {Type:"Text",      Hidden:0,  Width:130,   Align:"Center",  ColMerge:0,   SaveName:"cust_ref_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"CheckBox",  Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"verify_flag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N" },
                {Type:"CheckBox",  Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"pay_flag",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N" },
                {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"memo",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_usr_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },

                {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"sls_usr_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"post_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"prnr_ref_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                //#3704 [JAPT] Agent EDI send flag 추가
                {Type:"Text",      Hidden:0,  Width:40,  Align:"Center",  ColMerge:0,   SaveName:"snd_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },

                //#4980 [Best Ocean] Created Time and Last Modify Time columns add to BL List
                {Type:"Date",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"modi_usr_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Date",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                //#6837 : [JAPT] B/L Type column add request on BL List
                {Type:"Combo",      Hidden:0, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"hbl_tp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                
                {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_sts_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"CheckBox",  Hidden:1,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"bnd_release_flag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
                {Type:"CheckBox",  Hidden:1,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"bnd_hold_flag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
                {Type:"Combo",      Hidden:0, Width:220,   Align:"Center",  ColMerge:0,   SaveName:"obl_tp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" }

                ];
            InitColumns(cols);
            SetEditable(1);
            SetImageList(0,APP_PATH+"/web/img/button/btns_hc.gif");
            SetImageList(1,APP_PATH+"/web/img/button/btns_view.gif");
            SetDataLinkMouse('HC',1);
            SetDataLinkMouse('view_hbl',1);
//            InitViewFormat(0, "etd_dt_tm", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
//            InitViewFormat(0, "eta_dt_tm", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
//            InitViewFormat(0, "post_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
            SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
            SetSheetHeight(SYSTEM_ROW_HEIGHT*18);
            var formObj = document.frm1;            
            var COMBOTEXT = '';
            var COMBOCODE = '';
            for(var i=1; i<formObj.f_shp_mod_cd.options.length; i++){
            	COMBOTEXT = COMBOTEXT + '|' + formObj.f_shp_mod_cd.options[i].text;
            	COMBOCODE = COMBOCODE + '|' + formObj.f_shp_mod_cd.options[i].value;
            }
            SetColProperty('shp_mod_cd', {ComboText:COMBOTEXT, ComboCode:COMBOCODE} );
            //sheetObj.SetFocusAfterProcess(0);
            //sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
	            var COMBOBLTypeTEXT = '';
	            var COMBOBLTypeCODE = '';
	            for(var i=1; i < formObj.f_hbl_tp_cd.options.length; i++){
	                COMBOBLTypeTEXT = COMBOBLTypeTEXT + '|' + formObj.f_hbl_tp_cd.options[i].text;
	                COMBOBLTypeCODE = COMBOBLTypeCODE + '|' + formObj.f_hbl_tp_cd.options[i].value;
	            }
	            SetColProperty('hbl_tp_cd', {ComboText:COMBOBLTypeTEXT, ComboCode:COMBOBLTypeCODE} );
	            
	        //OFVFOUR-7105 [JAPAN TRUST] Adding "Original B/L Type" Column and Search on B/L List
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
		      with(sheetObj){
	         var cnt=0;
	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	         var headers = [ { Text:getLabel('SEE_BMD_0070_HDR2'), Align:"Center"} ];
	         InitHeaders(headers, info);
	         var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"master_bl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"shipper_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"shipper_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"consignee_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"consignee_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"liner_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"liner_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"prnr_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"prnr_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"ntfy_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"ntfy_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cfm_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"clz_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"pck_qty",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"pck_ut_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"meas",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"meas1",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",      Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",      Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"grs_wgt1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_sts_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"hbl_intg_bl_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 }];
	         InitColumns(cols);
//	         SetCountPosition()(0);
	         SetEditable(1);
	         SetSheetHeight(SYSTEM_ROW_HEIGHT*9);
	         //sheetObj.SetFocusAfterProcess(0);
	         //SetCountFormat("BOTTOMDATA / TOTALROWS");
	                  }

		      break;
		 case 3:					//첨부파일
			 initMemo(sheetObj);
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
	if(colStr=='view_hbl'){	
		var formObj=document.frm1;
	    var sheetObj1=docObjects[0];
		var sheetObj2=docObjects[1];
	  	searchSheet2(sheetObj,Row,Col);
		var intg_bl_seq =  sheetObj.GetCellValue(Row, "intg_bl_seq");
		var palt_mnu_cd = 'OEM';
		var opr_no = sheetObj.GetCellValue(Row, "bl_no");
		setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
		doWorkMemo("SEARCHMEMO");
	}
	else if(Col==-2){
		var intg_bl_seq =  sheetObj.GetCellValue(Row, "intg_bl_seq");
		var palt_mnu_cd = 'OEM';
		var opr_no = sheetObj.GetCellValue(Row, "bl_no");
		setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
		doWorkMemo("SEARCHMEMO");
	}
	else if(colStr=='HC' && sheetObj.GetCellValue(Row, "HC") != ""){		
		if(sheetObj.GetCellValue(Row, 'ref_no') !=''){
   			var paramStr="./SEE_BMD_0020.clt?";
//   			#549 [SBS] BL List 에서 Entry 조회시 B/L SEQ 로 조회 하도록 수정
   			paramStr+= "f_mbl_ref_no=" + encodeURIComponent(sheetObj.GetCellValue(Row, 'ref_no'));
   			parent.mkNewFrame('Booking & HBL', paramStr);
   		}
	}else if(colStr =='rlsd_flg'){
		var f_rlsd_flg=sheetObj.GetCellValue(Row,"rlsd_flg");
		var f_rlsd_dt_tm=sheetObj.GetCellValue(Row,"rlsd_dt_tm");
		if(f_rlsd_flg != 1)
		{
			if(f_rlsd_dt_tm == "")
			{
				sheetObj.SetCellValue(Row,"rlsd_dt_tm",getTodayStr("MM-dd-yyyy"),0);
			}
		}
	}else /*if(colStr=='bl_no')*/{
		var formObj=document.frm1;
		
		var f_rlsd_flg=sheetObj.GetCellValue(Row,"rlsd_flg");
		frm1.r_intg_bl_seq.value=sheetObj.GetCellValue(Row,"intg_bl_seq");
		frm1.f_rlsd_dt_tm.value=sheetObj.GetCellValue(Row,"rlsd_dt_tm");
		
		if(f_rlsd_flg == 1)
		{
			frm1.f_rlsd_flg.value="Y";
		}else{
			frm1.f_rlsd_flg.value="N";
		}
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr != 'rlsd_flg' || colStr != 'rlsd_dt_tm' || colStr!='view_hbl'){
		var formObj=document.frm1;
		doProcess=true;
		formObj.f_cmd.value="";
		var paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+'&f_ref_no='+escape(sheetObj.GetCellValue(Row, 'ref_no'))+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row, "intg_bl_seq");
	   	parent.mkNewFrame('Master B/L Entry', paramStr, "SEE_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no')+"_"+sheetObj.GetCellValue(Row, "intg_bl_seq"));
	}
}
function sheet2_OnDblClick(sheetObj,Row,Col){
	var hblNo=sheetObj.GetCellValue(Row, 'hbl_no');
	//OFVFOUR-7951: [JAPT] OPUS down 03/29/2022
	var hblSeq=sheetObj.GetCellValue(Row, 'hbl_intg_bl_seq');
	if(sheetObj.ColSaveName(Col)!='del_icon'&&(hblNo!=''||hblSeq!='')){
	   	var paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+escape(hblNo)+"&f_intg_bl_seq="+encodeURIComponent(hblSeq);
	   	parent.mkNewFrame('HB/L Entry', paramStr, "SEE_BMD_0020_SHEET_" + hblNo);
	}
}
/**
 * sheet2 search
 */
function searchSheet2(sheetObj,Row,Col){
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	formObj.s_intg_bl_seq.value=sheetObj1.GetCellValue(Row,"intg_bl_seq");
	formObj.master_bl_no.value=sheetObj1.GetCellValue(Row,"bl_no");
	formObj.f_cmd.value=SEARCHLIST02;
	sheetObj2.DoSearch("./SEE_BMD_0070_2GS.clt", FormQueryString(formObj) );
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
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value=masterVals[0];
				formObj.f_del_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=masterVals[0]; 
				formObj.f_trdp_full_nm.value=masterVals[3];//loc_nm
			}else if(CODETYPE == "location_por"){
				formObj.f_por_cd.value=masterVals[0];
				formObj.f_por_nm.value=masterVals[3];
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value="";
				formObj.f_del_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=""; 
				formObj.f_trdp_full_nm.value="";
			}else if(CODETYPE == "location_por"){
				formObj.f_por_cd.value="";
				formObj.f_por_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == "" || errMsg == undefined || errMsg == null || errMsg == 0){
		
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
	 	setTimeout("showCompleteProcess()",1000);
		//showCompleteProcess();
	}	
	doWork('SEARCHLIST');
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	//#29408 [BINEX]B/L List 검색조건 추가
	/*
	var formObj = document.frm1; 
	if (formObj.f_bl_cd.value == "HBL_No"){
		sheetObj.ColHidden(3) = false;
		sheetObj.ColHidden(9) = true;
		var fMlbNo = formObj.f_mbl_no.value;
		var tfMlbNo = "";
		if (fMlbNo != null) {
			tfMlbNo = trim(fMlbNo);
		}
		if( fMlbNo == null || tfMlbNo == "") {
			sheetObj.ColHidden(3) = true;
			sheetObj.ColHidden(9) = false;
			formObj.f_bl_cd.value = "MBL_No";
		}
	} else {
		sheetObj.ColHidden(3) = true;
		sheetObj.ColHidden(9) = false;
	}
	*/
	
	var formObj=document.frm1;
	
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "bl_sts_cd") == "HF") {
			sheetObj.SetCellValue(i, "block_flag","Y");
			sheetObj.SetCellFontColor(i, "block_flag","#FF0000");
			//#6590 [Binex-AWS] Release Order 버튼 로직 확인
			sheetObj.SetCellValue(i, "ibflag","R");
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
	formObj.intg_bl_seq.value=sheetObj.GetCellValue(1,"intg_bl_seq");
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	
	
    for(var i=1; i<=sheetObj.LastRow(); i++){
    	if(sheetObj.GetCellValue(i, "bnd_hold_flag") == "1"){
    		sheetObj.SetRowFontColor(i,"#FF0000");
    	} else if(sheetObj.GetCellValue(i, "bnd_release_flag") == "1"){
    		sheetObj.SetRowFontColor(i,"#007A0B");
    	}
	}
	
	
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
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
function sheet1_OnChange(sheetObj, rowIdx, colIdx) {
	var colStr = sheetObj.ColSaveName(colIdx);
	if(colStr=="rlsd_flg"){
		if(sheetObj.GetCellValue(rowIdx, 'rlsd_flg') == 0){
			sheetObj.SetCellValue(rowIdx, 'rlsd_dt_tm',"",0);
		}
	}else if(colStr=="rlsd_dt_tm"){
		if(sheetObj.GetCellValue(rowIdx, 'rlsd_dt_tm').length == 8){
			sheetObj.SetCellValue(rowIdx, 'rlsd_flg',1);
		}else{
			sheetObj.SetCellValue(rowIdx, 'rlsd_flg',0);
		}
	}
	
	var f_rlsd_flg=sheetObj.GetCellValue(rowIdx,"rlsd_flg");
	frm1.r_intg_bl_seq.value=sheetObj.GetCellValue(rowIdx,"intg_bl_seq");
	frm1.f_rlsd_dt_tm.value=sheetObj.GetCellValue(rowIdx,"rlsd_dt_tm");
	if(f_rlsd_flg == 1)
	{
		frm1.f_rlsd_flg.value="Y";
	}else{
		frm1.f_rlsd_flg.value="N";
	}
}
//function sheet1_OnMouseMove(sheetObj, row, col){
//	if(sheetObj.MouseCol()==0){
//		sheetObj.ToolTipOption="balloon:true;width:320;backcolor:#FFFFE0;forecolor:#000000;icon:0;title:Memo";
//		var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "memo");
//		memo=memo.replaceAll("@^^@", "\n");
//		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(),memo);
//	}
//}
//function sheet3_OnMouseMove(sheetObj, row, col){
//	if(sheetObj.MouseCol()==9){
//		sheetObj.ToolTipOption="balloon:true;width:320;backcolor:#FFFFE0;forecolor:#000000;icon:0;title:Message";
//		var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "palt_doc_msg");
//		memo=memo.replaceAll("@^^@", "\n");
//		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(),memo);
//	}
//}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
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
			var col=sheetObj.MouseCol();
			if(sheetObj.ColSaveName(col)==""){
				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
function setMblSizeUp(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*32);//height
}
function setMblSizeDown(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*18);//height
}
function setHblSizeUp(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*16);//height
}
function setHblSizeDown(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*9);//height
}
function doRmvSrInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		   if(doc[1]==0){
			   //invoice 생성 유무를 체크한다.
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
	                   delete_show_msg = 'Y';
	                   frm1.intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
	                   docObjects[0].DoSearch("./SEE_BMD_0070GS.clt", FormQueryString(formObj) );
	        	   }
    		   }else{
    			   //You Cannot delete MB/L. Because Invoice was already Issued.
    			   alert(getLabel('FMS_COM_ALT022'));
    			   return;
    		   }
		   }
		   else{
			   //Please delete the HB/L in advance.
			   alert(getLabel('FMS_COM_ALT026'));
			   return;
		   }
		}
	}
}

function checkBlInvReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			isInvStsOk=false;
		}
		else{
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
	return docObjects[2];
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
//function sheet3_OnDblClick(sheetObj,Row,Col){
//	//Name선택 시에만 팝업 호출
//	if(sheetObj.ColSaveName(Col)=='palt_doc_no' || sheetObj.ColSaveName(Col)=='palt_doc_msg'){
//		var reqParam='?intg_bl_seq='+frm1.intg_bl_seq.value;
//		reqParam += '&s_palt_doc_seq='+sheetObj.GetCellValue(Row,"palt_doc_seq");
//		reqParam += '&openMean='+SEARCH02;
//		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDocUp', 806, 450, "scroll:no;status:no;help:no;");
//	}
//}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet3_OnClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
//function sheet3_OnClick(sheetObj, Row, Col){	
//   	var downType;
//   	var s_palt_doc_seq;
//   	var s_intg_bl_seq;
//	switch (sheetObj.ColSaveName(Col)) {
//        case "palt_doc_img_url" :
//			if(sheetObj.GetCellImage(Row, "palt_doc_img_url") != ""){
//        		s_palt_doc_seq=sheetObj.GetCellValue(Row,"palt_doc_seq");
//        		s_intg_bl_seq = sheetObj.GetCellValue(Row, "intg_bl_seq_d");
//                downloadFile('org', s_intg_bl_seq, s_palt_doc_seq);
//        	}
//        	break;
//        case "palt_doc_pdf_url" :
//			if(sheetObj.GetCellImage(Row, "palt_doc_pdf_url") != ""){
//        		s_palt_doc_seq=sheetObj.GetCellValue(Row,"palt_doc_seq");
//        		s_intg_bl_seq = sheetObj.GetCellValue(Row, "intg_bl_seq_d");
//        		downloadFile('pdf', s_intg_bl_seq, s_palt_doc_seq);
//        	}
//        	break;
//        case "palt_doc_msg":
//        //        	frm1.memo_txt.value = sheetObj.CellValue(Row, Col);
//        	break;
//	} // end switch
//}
function clearAll(){
	//docObjects[0].RemoveAll();
	//docObjects[1].RemoveAll();
//	docObjects[2].RemoveAll();
	var formObj=document.frm1;
	formObj.f_hbl_tp_cd.selectedIndex=0;

	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	
	formObj.f_shp_mod_cd.selectedIndex=0;
	
	// #1308 Update clear function
	formObj.f_tp_type.selectedIndex = 0;
	formObj.f_date_type.selectedIndex = 1;
	formObj.f_isb_pic_sel_cd.selectedIndex = 0;
	formObj.f_prnr_cust_cd.selectedIndex = 0;
	formObj.f_obl_tp_cd.selectedIndex = 0
	
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
	
}
function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST');
	}
}
//function sheet3_OnSaveEnd(sheetObj, row, col){
//	doWork("SEARCHLIST03");
//}
//function sheet3_OnSearchEnd(sheetObj, row, col){
//	var formObj=document.frm1;
//	/*
//	if(docObjects[2].GetTotalRows()>0){
//	formObj.memo_txt.value=docObjects[2].GetCellValue(1, "palt_doc_msg");
//	}
//	*/
//}

function getHBLList(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpArray = doc[1].split('@@@');
			
			//HBL 1개면 바로 프린트
			if(tmpArray.length<3){
				var result = tmpArray[0].split("^^^");
				
				var param = 'intg_bl_seq=' + result[0];
				param += '&house_bl_no=' + result[1]; 
				param += '&agent_text=' + sea_body;
				//#1912 [PATENT]B/L 출력 AS AGENT FOR THE CARRIER 설정
				/*
				if(user_ofc_cnt_cd=="JP"){
         		}
         		else if(user_ofc_cnt_cd=="DE"){
         			param += " " + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lnr_trdp_nm");
         		}
         		else{
				param += ", " + result[4];
         		}
         		*/
				// #6897 [BNX] Adjust B/L (Zen#4238)
				if(sea_body.indexOf('(END') < 0){
					param += " " + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lnr_trdp_nm");
				} else {
					param = param.substring(0,param.indexOf("(END)"));
				}
				param += '&mailTitle=' + 'House BL No : ' + result[1];

         		var trdp_cd = '';
         		trdp_cd += '(' + '\'' + result[5] + '\'';
         		trdp_cd += ',' + '\'' + result[6] + '\'' + ')';
         		
         		ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
         		
         		param += '&mailTo=' + mailTo;
         		
         		popGET('RPT_PRN_0020.clt?'+param, '', 440, 620, "scroll:yes;status:no;help:no;");
         		
			}else{
				rtnary = new Array(1);		   		
				rtnary[0] = doc[1];
				
		   		callBackFunc = "HBL_LIST_POP";
		   		//#1739 [Patent] OEH B/L Print 의 Freight Arrange Default 설정 Option 처리
		   		/*var param = "";
		   		var opt_key = "OEH_BL_PRT_FRT_ARR_FLG";
			    ajaxSendPost(getSysOpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
			    param += '?frtArrFlg=' + frtArrFlg;*/
		   		//[#5947] [JTC] print all HBL together 
		   		var with_num = 360;
		   		var heigth_num = 630;
		   		var param = "";
		   		var opt_key = "OEH_BL_PRINT_JA_OPT";
			    ajaxSendPost(getSysOpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
			    if(frtArrFlg == "Y"){
			    	with_num = 450;
			    	heigth_num = 645;
			    }			    	
		   		modal_center_open('./SEE_BMD_0071.clt'+param, rtnary, with_num,heigth_num,"yes");
				//var rtnVal = window.showModalDialog('./SEE_BMD_0071.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:360px;dialogHeight:530px");
				
			}
		}else{
//			alert("There is no House B/L.");
			alert(getLabel('SEA_COM_ALT024'));
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

var mailTo="";
function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}
		else{
			mailTo=doc[1];
		}
	}
}

//#1739
var frtArrFlg = "";
function getSysOpt(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) == "undefined") {
			frtArrFlg = "";
		} else {
			frtArrFlg = doc[1];
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
function PRNR2_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_prnr_trdp_nm.value=rtnValAry[2];//full_nm
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
function CARR_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_carr_trdp_nm.value=rtnValAry[2];//full_nm
	}  
}
function HBL_LIST_POP(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry = rtnVal.split("@@@");
	}
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
}

function searchValueClear(obj){
	
	var formObj = document.frm1;
	
	if(obj.name == "f_bl_cd"){
		formObj.f_mbl_no.value = "";
	}else if(obj.name == "f_isb_pic_sel_cd"){
       if (uod_flg == "N"){ 
			
		}else{
			formObj.opr_usrid.value = "";
			formObj.opr_usrnm.value = "";
			formObj.sls_tp_cd.value = "";
		}
	}else if(obj.name == "f_lt_ct_sel_cd"){
		formObj.f_carr_trdp_nm.value = "";
//		#3248 [FULLTRANS CN] can not search carrier data at OEM BL List
//		formObj.trdp_tp_cd.value = "";		
	}else if(obj.name == "f_tp_type"){
		formObj.f_prnr_trdp_nm.value = "";
	}else if(obj.name == "f_prnr_cust_cd"){
		formObj.f_prnr_cust_no.value = "";
	}
}

/*Vinh.Vo (S) - 04/10/2015 */

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
					,URL:"./SEE_BMD_0070.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};	
	mySheet.DirectDown2Excel(param);
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

function setDecimalLen(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		obl_decimal_len = doc[1];
	}else{
		obl_decimal_len = "3";
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

/*Vinh.Vo (E) */