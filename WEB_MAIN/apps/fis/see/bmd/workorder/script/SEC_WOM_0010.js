var cntrSheet = false;
function getSndParam(){
	var cntrParam =  docObjects[2].GetSaveString(true);
	if(cntrParam!=''){
		cntrSheet = true;
	}
	return cntrParam;
}

function doWork(srcName){
	if(!btnVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
	
	try {
		switch(srcName) {
			case "SEARCH":
				frm1.f_wo_no.value = trim(frm1.f_wo_no.value);
				if(frm1.f_wo_no.value==''){
					//[Work Order No.]를 먼저 입력하십시오!
					alert(getLabel('FMS_COM_ALT006') + "\n\n: SEC_WOM_0010.20");
					
					frm1.f_wo_no.focus();
				}
				else{
					doShowProcess();
		       		frm1.f_cmd.value = SEARCH;
	       			frm1.action = "./SEC_WOM_0010.clt";
				    frm1.submit();
				}
			
				break;
			
			case "SEARCHLIST01":	//TP/SZ 목록을 조회함
				frm1.intg_bl_seq.value = trim(frm1.intg_bl_seq.value);
				if(frm1.intg_bl_seq.value!=''){
					frm1.f_cmd.value = SEARCHLIST01;
				    docObjects[1].DoSearch4Post("./SEE_BMD_0021GS.clt", FormQueryString(frm1));
				}
			
			
				break;
				
			case "SEARCHLIST02":	//Work Order Container List를 조회함
				frm1.intg_bl_seq.value = trim(frm1.intg_bl_seq.value);
				if(frm1.intg_bl_seq.value!=''){
					frm1.f_cmd.value = SEARCHLIST02;
					docObjects[2].DoSearch4Post("SEC_WOM_0010_1GS.clt", FormQueryString(frm1));
				}
			
			
				break;
				
			case "NEW":
				//	if(confirm(getLabel('FMS_COM_CFMSAV'))){
					doShowProcess();
					frm1.f_cmd.value = '';
	       			frm1.action = "./SEC_WOM_0010.clt";
				    frm1.submit();
				//	}
			
				    break;
				    
			case "ADD"://저장
				if(woCheckInpuVals()){
					var intRow = docObjects[2].LastRow;
					
					for ( var i = 2 ; i <= intRow ; i++ ) {
						if ( docObjects[2].CellValue(i, "sell_buy_tp_cd") != "" ) {
							if ( docObjects[2].CellValue(i, "frt_cd") == "" ) {
								//Please enter a [Freight Code]!
								alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEC_WOM_0010.57");
								return false;
							}
							
							if ( docObjects[2].CellValue(i, "trdp_cd") == "" ) {
								//Please enter a [Partner]!
								alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEC_WOM_0010.63");
								return false;
							}
							
							if ( docObjects[2].CellValue(i, "rat_curr_cd") == "" ) {
								//Please enter a [Rate Cur]
								alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEC_WOM_0010.69");
								return false;
							}
						}
					}
					
					if(confirm(getLabel('FMS_COM_CFMSAV'))){
						frm1.f_cmd.value = ADD;
						
						gridAdd(0);
						docObjects[0].CellValue(1, 1) = 1;
	
						doShowProcess();
	             	    docObjects[0].DoAllSave("./SEC_WOM_0010GS.clt", FormQueryString(frm1)+'&'+getSndParam(), false);
					}
				}
			
				break;
				
			case "MODIFY"://저장
				if(woCheckInpuVals()){
					var intRow = docObjects[2].LastRow;
					
					for ( var i = 2 ; i <= intRow ; i++ ) {
						if ( docObjects[2].CellValue(i, "sell_buy_tp_cd") != "" ) {
							if ( docObjects[2].CellValue(i, "frt_cd") == "" ) {
								//Please enter a [Freight Code]!
								alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEC_WOM_0010.90");
								return false;
							}
							
							if ( docObjects[2].CellValue(i, "trdp_cd") == "" ) {
								alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEC_WOM_0010.95");
								return false;
							}
							
							if ( docObjects[2].CellValue(i, "rat_curr_cd") == "" ) {
								alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEC_WOM_0010.100");
								return false;
							}
						}
					}
					
					if(confirm(getLabel('FMS_COM_CFMSAV'))){
						frm1.f_cmd.value = MODIFY;
						
						gridAdd(0);
						docObjects[0].CellValue(1, 1) = 1;
	
						doShowProcess();
	             	    docObjects[0].DoAllSave("./SEC_WOM_0010GS.clt", FormQueryString(frm1)+'&'+getSndParam(), false);
					}
				}
			
				break;
				
			case "REMOVE"://삭제
	        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
	                   frm1.f_cmd.value = REMOVE;
	            	   doShowProcess();
	            	   frm1.submit();
	        	   }
			
	        	   break;
			
			case "HBLSMRY":
				ajaxSendPost(dispHblSmry, 'reqVal', '&goWhere=aj&bcKey=searchBkgSmry&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
			
				break;
			
			case "ISSUE":		//ISSUE
				if(frm1.wo_sts_cd.value!="A"){
					//You can ISSUE after [SAVE].
					alert(getLabel('FMS_COM_ALT015')+ "\n\n: SEC_WOM_0010.133");
					return;
				}
				else{
					//Do you want to issue?
					if(confirm(getLabel('FMS_COM_CFMISS'))){
						frm1.f_cmd.value = COMMAND01;
						
						gridAdd(0);
						docObjects[0].CellValue(1, 1) = 1;

						doShowProcess();
	             	    docObjects[0].DoAllSave("./SEC_WOM_0010GS.clt", FormQueryString(frm1)+'&'+getSndParam(), false);
					}
				}
			
				break;
				
			case "CANCEL":		//ISSUE Cancel
				if(frm1.wo_sts_cd.value!="B"){
					//You can CANCEL after [ISSUE].
					alert(getLabel('FMS_COM_ALT016')+ "\n\n: SEC_WOM_0010.150");
					return;
				}
				else{
					//Do you want to CANCEL?
					if(confirm(getLabel('FMS_COM_CFMCAN'))){
						frm1.f_cmd.value = COMMAND02;
						
						gridAdd(0);
						docObjects[0].CellValue(1, 1) = 1;

						doShowProcess();
	             	    docObjects[0].DoAllSave("./SEC_WOM_0010GS.clt", FormQueryString(frm1)+'&'+getSndParam(), false);
					}
				}
			
				break;
				
			case "COPY":
				//'복사 하시겠습니까?')){
				if(confirm(getLabel('FMS_COM_CFMCPY'))){
					doShowProcess();
					
					frm1.f_wo_no.value = '';
					frm1.wo_no.value = '';
					frm1.bkg_no.value = '';
					frm1.hbl_no.value = '';
					frm1.intg_bl_seq.value = '';
					frm1.wo_sts_cd.value = 'NA';
					
					frm1.cgo_itm_cmdt_cd.value = '';
					frm1.cgo_itm_cmdt_nm.value = '';
					frm1.cgo_pck_qty.value = '';
					frm1.cgo_pck_ut_cd.value = '';
					
					frm1.grs_wgt.value = '';
					frm1.grs_wgt_ut_cd.value = '';
					
					frm1.act_wgt.value = '';
					frm1.act_wgt_ut_cd.value = '';
					
					frm1.cgo_meas.value = '';
					frm1.cgo_meas_ut_cd.value = '';
					frm1.lnr_trdp_nm.value = '';
					frm1.lnr_trdp_cd.value = '';
					frm1.pol_cd.value = '';
					frm1.pol_nod_cd.value = '';
					frm1.pol_nm.value = '';
					frm1.pod_cd.value = '';
					frm1.pod_nod_cd.value = '';
					frm1.pod_nm.value = '';
					
					
					modiObj.style.display  = 'none';
					prntObj.style.display  = 'none';
					getBtnObj('cancelObj').style.display= 'none';
		            getBtnObj('issObj').style.display   = 'none';
					copyObj.style.display  = 'none';
					
					var tmpBtn = getObj('bkgBtn');
		            tmpBtn.style.display = 'block';
					
					
					docObjects[1].RemoveAll();
					docObjects[2].RemoveAll();
					
					doHideProcess();
				}
			
				break;
				
			case "WO_POPLIST"://openMean S = 해운에서 오픈, A = 항공에서 오픈				
	         	var rtnary = new Array(2);   		
	   			rtnary[0] = "S";
	   			rtnary[1] = "O";
	  	        var rtnVal = window.showModalDialog('./CMM_POP_0200.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:480px");
	  	        
	  	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 		return;
				}
	  	        else{
					var rtnValAry = rtnVal.split("|");
					frm1.f_wo_no.value  = rtnValAry[0];//wo_no
					frm1.hbl_no.value     = rtnValAry[1];//hbl_no
					frm1.intg_bl_seq.value= rtnValAry[2];//intg_bl_seq		
					doWork('SEARCH');
				}			
			
	  	        break; 
	  	        
			case "BKNO_POPLIST"://openMean S = 해운에서 오픈, A = 항공에서 오픈
				var rtnary = new Array(2);   		
	   			rtnary[0] = "S";
	   			rtnary[1] = "O";
	   		
   	        	var rtnVal = window.showModalDialog('./CMM_POP_0210.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:815px;dialogHeight:480px");
   	       
   	        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 		return;
				}
   	        	else{
					var rtnValAry = rtnVal.split("|");
					frm1.bkg_no.value = rtnValAry[0];//bkg_no
					frm1.hbl_no.value = rtnValAry[1];//hbl_no
					frm1.intg_bl_seq.value = rtnValAry[2];//intg_bl_seq

					var tmpBtn = getObj('bkgBtn');
		            tmpBtn.style.display = 'none';
		            
					doWork('HBLSMRY');
				}			
			
   	        	break; 
   	        	
			case "PARTNER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
		   		var rtnary = new Array(1);
		   		rtnary[0] = "1";
		   		rtnary[1] = "";
		   		rtnary[2] = window;
		   		
    	        //var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp=TK', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
		   		/* #23817 D/O PRINT시 TRUCKER 로 검색이아닌 ALL, jsjang 2013.11.22*/
    	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp=', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
    	        
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}
    	        else{
					frm1.trsp_trdp_cd.value  = "";
					frm1.trsp_trdp_nm.value  = "";

					/*
					frm1.trsp_trdp_pic.value = "";
					frm1.trsp_trdp_phn.value = "";
					frm1.trsp_trdp_fax.value = "";
					*/
					frm1.rmk.value = "";
					
					var rtnValAry = rtnVal.split("|");
					frm1.trsp_trdp_cd.value = rtnValAry[0];//trdp_cd
					frm1.trsp_trdp_nm.value = rtnValAry[2];//eng_nm
					
					frm1.trsp_trdp_pic.value = rtnValAry[3];//pic_nm
					frm1.trsp_trdp_phn.value = rtnValAry[4];//pic_phn
					frm1.trsp_trdp_fax.value = rtnValAry[5];//pic_fax
				}
           
    	        break;
    	        
		   case "PARTNER_POPLIST2"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
				   
		   		var rtnary = new Array(1);
		   		
		   		rtnary[0] = "1";
		   		rtnary[1] = "";
		   		rtnary[2] = window;
		   		
    	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
    	        //window.open ('./CMM_POP_0010.clt', "list", "scrollbars=no,fullscreen=no,width=1024,height=480");
    	        
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}
    	        else{
					//Charge의 Invoice					
					frm1.trsp_inv_cd.value = "";//trdp_cd
					frm1.trsp_inv_nm.value = "";//trdp_nm
					
					var rtnValAry = rtnVal.split("|");
	
					frm1.trsp_inv_cd.value = rtnValAry[0];//trdp_cd
					frm1.trsp_inv_nm.value = rtnValAry[2];//full_nm
					
					//Sheet3의 Customer Code를 일괄 수정 적용한다.
					for(var i = 2; i <= docObjects[2].lastRow; i++){						
						docObjects[2].CellValue(i, "trdp_cd") = rtnValAry[0];
						docObjects[2].CellValue(i, "trdp_nm") = rtnValAry[2];
					}
				}
           
    	        break;
    	        
           //Invoice Currency
		   case "CURRENCY_POPLIST"://통화코드 openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	           
           		var rtnary = new Array(1);		   		
		   		rtnary[0] = "1";		   		
    	        var rtnVal = window.showModalDialog('./CMM_POP_0040.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px");
    	       
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}
    	        else{				
					var rtnValAry = rtnVal.split("|");
	
					frm1.s_currency_code.value = rtnValAry[0];//cd_val
					frm1.s_currency_name.value = rtnValAry[1];//cd_nm
					
					for(var i = 2; i <= docObjects[2].lastRow; i++){
						docObjects[2].CellValue(i, "inv_curr_cd") = frm1.s_currency_code.value;
					}
				}
				
           
    	        break;
           
           case "COMMODITY_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈           
           		var rtnary = new Array(1);	   		
		   		rtnary[0] = "1";		   		
    	        var rtnVal = window.showModalDialog('./CMM_POP_0110.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:483px");
    	       
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}
    	        else{
				
					var rtnValAry = rtnVal.split("|");
	
					frm1.cgo_itm_cmdt_cd.value = rtnValAry[0];
					frm1.cgo_itm_cmdt_nm.value = rtnValAry[2];
				}
           
    	        break;
           
           case "PACKAGE_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
           
           		var rtnary = new Array(1);
		   		
		   		rtnary[0] = "1";
		   		
    	        var rtnVal = window.showModalDialog('./CMM_POP_0120.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px");
    	       
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}
    	        else{
					var rtnValAry = rtnVal.split("|");
					frm1.cgo_pck_ut_cd.value = rtnValAry[0];
				}
          
    	        break;
           
	       case "ROWADD":
				frm1.intg_bl_seq.value = trim(frm1.intg_bl_seq.value);
	       		if (frm1.intg_bl_seq.value != "") {
		       		// Issue, Cancel인 경우 Charge를 추가 할 수 없다. 2009. 05. 04 Choi, Gil-Ju
		       		if ( frm1.wo_sts_cd.value != "I" && frm1.wo_sts_cd.value != "D" ) {
			   			var intRows3 = docObjects[2].Rows;
			   			docObjects[2].DataInsert(intRows3);
			   			docObjects[2].CellValue2(docObjects[2].lastRow, "sheet3") = "sheet3";
		
		   				//AddRow시 Default값을 셋팅한다.
			   			docObjects[2].CellValue2(docObjects[2].lastRow, "aply_ut_cd") = "SCN";
			   			
			   			//Vol, Rate, Vate default설정
						docObjects[2].CellValue2(docObjects[2].lastRow, "qty") = 0;
						docObjects[2].CellValue2(docObjects[2].lastRow, "ru") = 0;
						docObjects[2].CellValue2(docObjects[2].lastRow, "vat_rt") = 0;
						docObjects[2].CellValue2(docObjects[2].lastRow, "vat_amt") = 0;
		   				
			   			
			   			//Amount(Invoice) default설정
						docObjects[2].CellValue2(docObjects[2].lastRow, "inv_xcrt") = 0;
		   				docObjects[2].CellValue2(docObjects[2].lastRow, "inv_amt") = 0;
		   				docObjects[2].CellValue2(docObjects[2].lastRow, "inv_vat_amt") = 0;
			   			
			   			//Amount(Perfomance) default설정
						docObjects[2].CellValue2(docObjects[2].lastRow, "perf_xcrt") = 0;
		   				docObjects[2].CellValue2(docObjects[2].lastRow, "perf_amt") = 0;
		   				docObjects[2].CellValue2(docObjects[2].lastRow, "perf_vat_amt") = 0;
		   				
		   				if(frm1.trsp_inv_cd.value !=""){
		   					docObjects[2].CellValue2(docObjects[2].lastRow, "trdp_cd") = frm1.trsp_inv_cd.value;
		   				}
		
		   				if(frm1.trsp_inv_nm.value !=""){
		   					docObjects[2].CellValue2(docObjects[2].lastRow, "trdp_nm") = frm1.trsp_inv_nm.value;
		   				}
		   				
		   				//inv_curr_cd default설정
		   				if(frm1.s_currency_code.value !=""){
		   					docObjects[2].CellValue2(i, "inv_curr_cd") = frm1.s_currency_code.value;
		   				}
		   				else{
			   				if(docObjects[2].CellValue(i, "inv_curr_cd") != ""){
			   					docObjects[2].CellValue2(docObjects[2].lastRow, "inv_curr_cd") = docObjects[2].CellValue(3, "inv_curr_cd");
			   				}
		   				}
						
		   				//Type Size 코드를 가져온다
		   				doTplAction();
		   				docObjects[2].CellValue2(docObjects[2].lastRow, "cntr_tpsz_cd") = "";
		   			}
		   		}
	   		
	       		break;   
	       		
	        case "APPLY":
				
				//Grid 초기화
				docObjects[2].RemoveAll();
				docObjects[3].RemoveAll();
				
				//PPD 값과 CCT값을 표시한다.
				doShowTotalTbl(docObjects[1], docObjects[2], docObjects[3]);
			
				break;
			
	        case "PRINT":
	        	//alert(frm1.wo_tp_cd.value);
	        	var param = 'wo_no=' + frm1.wo_no.value;
	        	param += '&cmd_type=30';
        		param += '&title=Work Order';
        		
        		popGET('RPT_PRN_0010.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
		   
        		break;
        } // end switch
	}
	catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SEC_WOM_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEC_WOM_0010.002"); 
        }
	}
}


//화면로드시 데이터 표시
function loadData(){
	if(frm1.intg_bl_seq.value!=''){
		doWork('SEARCHLIST01');
		
		doWork('SEARCHLIST02');
	}
	doHideProcess();
}


function gridAdd(objIdx){
	var intRows = docObjects[objIdx].Rows;
	intRows--;
	docObjects[objIdx].DataInsert(intRows);
}


function openPopUp(srcName, curObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var frm1  = document.frm1;
	try {
		switch(srcName) {
		
	        case "Port_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
           
           		var rtnary = new Array(1);
		   		if(curObj!="via"){
		   			rtnary[0] = "1";
		   			rtnary[1] = "ND";//Node Code
		   			rtnary[2] = "L04";//국가코드
		   		}
		   		else{
		   	   		rtnary[0] = "SEA";
			   		rtnary[1] = "BL";
		   		}
		   		
    	        var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
    	        
    	        if(rtnVal==""||rtnVal=="undefined"||rtnVal==undefined){
				 	return;
				 	
				}
    	        else{
					var rtnValAry = rtnVal.split("|");	
					
					if(curObj == "org"){
						frm1.org_rout_loc_cd.value = rtnValAry[0];//loc_cd 
						frm1.org_rout_nod_cd.value = rtnValAry[1];//nod_cd						
						frm1.org_rout_loc_nm.value = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
						
						ajaxSendPost(setNodPic, 'reqVal', '&goWhere=aj&bcKey=getNodePic&callId=O&node_cd='+rtnValAry[1], './GateServlet.gsl');

					}
					else if(curObj == "org2"){
						frm1.org2_rout_loc_cd.value = rtnValAry[0];//loc_cd 
						frm1.org2_rout_nod_cd.value = rtnValAry[1];//nod_cd						
						frm1.org2_rout_loc_nm.value = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
						
						ajaxSendPost(setNodPic, 'reqVal', '&goWhere=aj&bcKey=getNodePic&callId=O2&node_cd='+rtnValAry[1], './GateServlet.gsl');
						
					}
					else if(curObj == "via"){
						frm1.via_rout_loc_cd.value = rtnValAry[0];//loc_cd
						frm1.via_rout_nod_cd.value = rtnValAry[1];//nod_cd
						frm1.via_rout_loc_nm.value = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
						
					}
					else if(curObj == "dest"){
						frm1.dest_rout_loc_cd.value = rtnValAry[0];//loc_cd 
						frm1.dest_rout_nod_cd.value = rtnValAry[1];//nod_cd
						frm1.dest_rout_loc_nm.value = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
						
						ajaxSendPost(setNodPic, 'reqVal', '&goWhere=aj&bcKey=getNodePic&callId=D&node_cd='+rtnValAry[1], './GateServlet.gsl');
					}
				} 
            
    	        break;
    	        
    	   case "LINER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
		   		var rtnary = new Array(2);
		   		rtnary[0] = "1";
		   		rtnary[1] = "";
		   		rtnary[2] = window;
		   		
				var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp=LN', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
    	        
				if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}
				else{
					var rtnValAry = rtnVal.split("|");
						frm1.lnr_trdp_cd.value = rtnValAry[0];//trdp_cd
						frm1.lnr_trdp_nm.value = rtnValAry[2];//full_nm
				}
           
				break;
				
           case "LOCATION_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
          		var rtnary = new Array(3);
		   		rtnary[0] = "SEA";
		   		rtnary[1] = "BL";
		   		rtnary[2] = "";
		   		
		   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
   	            
		   		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}
		   		else{
					var curObjId = curObj.id;
					var rtnValAry = rtnVal.split("|");
				
					if(curObjId == "pol"){
						frm1.pol_cd.value = rtnValAry[0];//loc_cd 
						frm1.pol_nod_cd.value= rtnValAry[1];//nod_cd
						frm1.pol_nm.value  = rtnValAry[2];//loc_nm
						
					}else if(curObjId == "pod"){
						frm1.pod_cd.value = rtnValAry[0];//loc_cd
						frm1.pod_nod_cd.value= rtnValAry[1];//nod_cd
						frm1.pod_nm.value  = rtnValAry[2];//loc_nm
					}
				} 
          
		   		break;
        } // end switch
	}
	catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SEC_WOM_0010.003");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEC_WOM_0010.004"); 
        }
	}
}




//코드표시 Ajax
function dispHblSmry(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('@@;');
			var rtnVal = rtnArr[0].split('@@^');	
			frm1.pol_cd.value = rtnVal[0];
			frm1.pol_nm.value = rtnVal[1];

			frm1.pod_cd.value = rtnVal[2];
			frm1.pod_nm.value = rtnVal[3];

			frm1.cgo_itm_cmdt_cd.value= rtnVal[4];
			frm1.cgo_itm_cmdt_nm.value= rtnVal[5];

			frm1.cgo_pck_qty.value   = doMoneyFmt(rtnVal[6]);
			frm1.cgo_pck_ut_cd.value = rtnVal[7];

			frm1.grs_wgt.value       = doMoneyFmt(rtnVal[9]);
			frm1.grs_wgt_ut_cd.value = rtnVal[10];

			frm1.act_wgt.value       = doMoneyFmt(rtnVal[16]);
			frm1.act_wgt_ut_cd.value = rtnVal[17];
			
			frm1.cgo_meas.value      = doMoneyFmt(rtnVal[11]);
			frm1.cgo_meas_ut_cd.value= rtnVal[12];

			frm1.lnr_trdp_cd.value = rtnVal[13];
			frm1.lnr_trdp_nm.value = rtnVal[14];
			frm1.lnr_bkg_no.value  = rtnVal[15];

			doWork('SEARCHLIST01');
		}
	}
}
				
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param frm1
 * @return
*/
function doDisplay(doWhat, frm1){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
            var cal = new calendarPopup();
            cal.select(frm1.org_rout_dt, 'org_rout_dt', 'yyyy-MM-dd');
       
            break;
            
        case 'DATE2':   //달력 조회 팝업 호출      
            var cal = new calendarPopup();
            cal.select(frm1.via_rout_dt, 'via_rout_dt', 'yyyy-MM-dd');
        
            break;   
            
        case 'DATE3':   //달력 조회 팝업 호출      
            var cal = new calendarPopup();
            cal.select(frm1.dest_rout_dt, 'dest_rout_dt', 'yyyy-MM-dd');
        
            break; 
            
        case 'DATE4':   //달력 조회 팝업 호출      
            var cal = new calendarPopup();
            cal.select(frm1.cgo_clz_dt,   'cgo_clz_dt', 'yyyy-MM-dd');
        
            break;
    }
}

/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	if(obj.value!=""){
		if(tmp=="onKeyDown"){
			if (event.keyCode == 13){
				var s_code = obj.value;
				CODETYPE =str;
				var sub_str = str.substring(0,8);
				
				if(sub_str=="Location"){
					str = sub_str;
				}
				else if(sub_str=="Nodecode"){
					str = 'node';
				}
				else if(sub_str=="partner_"){
					str = 'trdpcode';
				}

				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} 
		else if ( tmp == "onBlur" ) {
			var s_code = obj.value;
			CODETYPE =str;
			var sub_str = str.substring(0,8);
		
			if(sub_str=="Location"){
				str = sub_str;
			}
			else if(sub_str=="Nodecode"){
				str = 'node';
			}
			else if(sub_str=="partner_"){
				str = 'trdpcode';
			}
			
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var frm1  = document.frm1;
	
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');		
			var masterVals = rtnArr[0].split('@@^');
			
			if(CODETYPE =="partner_trdpcode"){
				frm1.trsp_trdp_cd.value = masterVals[0];//trdp_cd
				//frm1.trsp_trdp_nm.value = masterVals[2];//full_nm
				frm1.trsp_trdp_nm.value = masterVals[3];//full_nm
				/*
				frm1.trsp_trdp_pic.value = masterVals[4];//pic_nm
				frm1.trsp_trdp_phn.value = masterVals[5];//pic_phn
				frm1.trsp_trdp_fax.value = masterVals[6];//pic_fax
				frm1.trsp_trdp_eml.value = masterVals[7];//pic_eml
				
				//Charge의(화면 하단) Invoice를 디폴트값으로 셋팅한다----
				frm1.trsp_inv_cd.value = masterVals[0];//trdp_cd
				frm1.trsp_inv_nm.value = masterVals[2];//full_nm
*/
			}
			else if(CODETYPE =="partner_liner"){
				frm1.lnr_trdp_cd.value = masterVals[0];
				frm1.lnr_trdp_nm.value = masterVals[3];
			}
			else if(CODETYPE =="Nodecode_org"){
				frm1.org_rout_nod_cd.value = masterVals[0];//nod_cd 
				frm1.org_rout_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm 
				
				ajaxSendPost(setNodPic, 'reqVal', '&goWhere=aj&bcKey=getNodePic&callId=O&node_cd='+masterVals[0], './GateServlet.gsl');
			}
			else if(CODETYPE =="Nodecode_org2"){
				frm1.org2_rout_nod_cd.value = masterVals[0];//nod_cd 
				frm1.org2_rout_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm 
				
				ajaxSendPost(setNodPic, 'reqVal', '&goWhere=aj&bcKey=getNodePic&callId=O2&node_cd='+masterVals[0], './GateServlet.gsl');
			}
			else if(CODETYPE =="Nodecode_via"){
				frm1.via_rout_nod_cd.value = masterVals[0];//nod_cd 
				frm1.via_rout_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
			}
			else if(CODETYPE =="Nodecode_dest"){
				frm1.dest_rout_nod_cd.value = masterVals[0];//nod_cd 
				frm1.dest_rout_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				
				ajaxSendPost(setNodPic, 'reqVal', '&goWhere=aj&bcKey=getNodePic&callId=D&node_cd='+masterVals[0], './GateServlet.gsl');
			}
			else if(CODETYPE =="Location_via"){
				frm1.via_rout_loc_cd.value = masterVals[0];//loc_cd
				frm1.via_rout_nod_cd.value = masterVals[1];//nod_cd
				frm1.via_rout_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
			}
			else if(CODETYPE == "Location_pol"){
				if(masterVals[0]==''){
					frm1.pol_cd.focus();
				}
				else{
					frm1.pol_cd.value  = masterVals[0];//loc_cd
					frm1.pol_nod_cd.value= masterVals[1];//nod_cd
					frm1.pol_nm.value  = masterVals[3];//loc_nm
					frm1.pod_cd.focus();
				}
			}
			else if(CODETYPE == "Location_pod"){
				if(masterVals[0]==''){
					frm1.pod_cd.focus();
				}
				else{
					frm1.pod_cd.value    = masterVals[0];//loc_cd 
					frm1.pod_nod_cd.value= masterVals[1];//nod_cd
					frm1.pod_nm.value    = masterVals[3];//loc_nm
				}	
			}
			else if(CODETYPE =="country"){
				frm1.s_country_code.value = masterVals[0];//cnt_cd
				frm1.s_country_name.value = masterVals[3];//cnt_eng_nm
			}
			else if(CODETYPE =="currency"){
				frm1.s_currency_code.value = masterVals[0];//cd_val
				frm1.s_currency_name.value = masterVals[3];//cd_nm
			}
			else if(CODETYPE =="commodity"){
				frm1.cgo_itm_cmdt_cd.value = masterVals[0];
				frm1.cgo_itm_cmdt_nm.value = masterVals[3];
			}
			else if(CODETYPE =="package"){
				frm1.cgo_pck_ut_cd.value = masterVals[0];
			}
		}
		else{
			if(CODETYPE =="partner"){
				frm1.trsp_trdp_cd.value = "";//trdp_cd
				frm1.trsp_trdp_nm.value = "";//full_nm
				frm1.trsp_trdp_pic.value = "";//pic_nm
				frm1.trsp_trdp_phn.value = "";//pic_phn
				frm1.trsp_trdp_fax.value = "";//pic_fax
				frm1.trsp_trdp_eml.value = "";//pic_eml
				frm1.trsp_inv_cd.value = "";//trdp_cd
				frm1.trsp_inv_nm.value = "";//full_nm
			}
			else if(CODETYPE =="partner_inv"){			
				frm1.trsp_inv_cd.value = "";//trdp_cd
				frm1.trsp_inv_nm.value = "";//full_nm
			}
			else if(CODETYPE =="Location_org"){
				frm1.org_rout_loc_cd.value = "";//loc_cd 
				frm1.org_rout_nod_cd.value = "";//nod_cd 
				frm1.org_rout_loc_nm.value = "";//loc_nm
			}
			else if(CODETYPE =="Location_org2"){
				frm1.org2_rout_loc_cd.value = "";//loc_cd 
				frm1.org2_rout_nod_cd.value = "";//nod_cd 
				frm1.org2_rout_loc_nm.value = "";//loc_nm
			}
			else if(CODETYPE =="Location_via"){
				frm1.via_rout_loc_cd.value = "";//loc_cd 
				frm1.via_rout_nod_cd.value = "";//nod_cd 
				frm1.via_rout_loc_nm.value = "";//loc_nm
			}
			else if(CODETYPE =="Location_dest"){
				frm1.dest_rout_loc_cd.value = "";//loc_cd 
				frm1.dest_rout_nod_cd.value = "";//nod_cd 
				frm1.dest_rout_loc_nm.value = "";//loc_nm 
			}
			else if(CODETYPE =="country"){
				frm1.s_country_code.value = "";//cnt_cd
				frm1.s_country_name.value = "";//cnt_eng_nm
			}
			else if(CODETYPE =="Location"){
				frm1.s_Port_code.value = "";//loc_cd 
				frm1.s_node_code.value = "";//nod_cd 
				frm1.s_Port_name.value ="";//loc_nm 
			}
			else if(CODETYPE =="currency"){
				frm1.s_currency_code.value = "";
				frm1.s_currency_name.value = "";//cd_nm
			}
			else if(CODETYPE =="office"){
				frm1.s_office_code.value = "";
				frm1.s_office_name.value = "";
			}
			else if(CODETYPE =="user"){
				frm1.s_user_id.value = "";
				frm1.s_user_name.value = "";
			}
			else if(CODETYPE =="freight"){
				frm1.s_freight_code.value = "";
				frm1.s_freight_name.value = "";
			}
			else if(CODETYPE =="container"){
				frm1.s_container_code.value = "";
				frm1.s_container_name.value = "";
			}
			else if(CODETYPE =="commodity"){
				frm1.cgo_itm_cmdt_cd.value = "";
				frm1.cgo_itm_cmdt_nm.value = "";
			}
			else if(CODETYPE =="package"){
				frm1.cgo_pck_ut_cd.value = "";
			}
			else if(CODETYPE =="cargo"){
				frm1.s_cargo_code.value = "";
				frm1.s_cargo_name.value = "";
			}
			else if(CODETYPE =="vessel"){
				frm1.s_vessel_code.value = "";
				frm1.s_vessel_name.value = "";
			}
		}
	}
	else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEC_WOM_0010.819");		
	}
}


function setNodPic(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('^@');
            //Pickup CY 1
			if(rtnArr[0]=='O'){
				frm1.org_rout_pic.value    = rtnArr[1];
				frm1.org_rout_pic_phn.value= rtnArr[2];
				frm1.org_rout_pic_fax.value= rtnArr[3];
				
				frm1.org_rout_addr.value   = rtnArr[4];

            //Pickup CY 2
			}else if(rtnArr[0]=='O2'){
				frm1.org2_rout_pic.value    = rtnArr[1]; 
				frm1.org2_rout_pic_phn.value= rtnArr[2];
				frm1.org2_rout_pic_fax.value= rtnArr[3];

				frm1.org2_rout_addr.value   = rtnArr[4];
				
			}else if(rtnArr[0]=='D'){
				frm1.dest_rout_pic.value    = rtnArr[1]; 
				frm1.dest_rout_pic_phn.value= rtnArr[2];
				frm1.dest_rout_pic_fax.value= rtnArr[3];
				
				frm1.dest_rout_addr.value   = rtnArr[4];
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

//시간분이 유효한지 체크한다.
function checkTime(obj){
	
	var objTime = obj.value;
	
	if(objTime.length != 0){
		if(objTime.length == 4){
			objHr = objTime.substring(0,2);
			objMn = objTime.substring(2,4);
			
			if(objHr != "00"){
				if(objHr < 0 || objHr > 23){
					obj.value = "";
					//Invalid value for time.
					alert(getLabel('FMS_COM_ALT002')+ "\n\n: SEC_WOM_0010.884");
					obj.focus();
				}
			}
			
			if(objMn != "00"){
				if(objMn < 0 || objMn > 59){
					obj.value = "";
					//Invalid value for time.
					alert(getLabel('FMS_COM_ALT002')+ "\n\n: SEC_WOM_0010.893");
					obj.focus();
				}
			}
			
			//obj.value = objHr+":"+objMn;
			
		}else{
			//obj.value = "";
			//Please enter both time and minute.
			alert(getLabel('FMS_COM_ALT002')+ "\n\n: SEC_WOM_0010.903");
			obj.focus();
		}	
	}		
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
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
		case 1:     
		with (sheetObj) {
            // 높이 설정
            style.height = 0;
            
            //전체 너비 설정
            SheetWidth = mainTable.clientWidth;
           // SheetWidth = 400;

            //Host정보 설정[필수][HostIp, Port, PagePath]
            if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

            //전체Merge 종류 [선택, Default msNone]
            //MergeSheet = msHeaderOnly;
            MergeSheet = msHeaderOnly;

           //전체Edit 허용 여부 [선택, Default false]
            Editable = true;

            //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
            InitRowInfo( 1, 1, 9, 100);

            //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
            InitColumnInfo(4, 0, 0, true);

            // 해더에서 처리할 수 있는 각종 기능을 설정한다
            InitHeadMode(true, true, true, true, false,false) ;
            
//			HEAD_TITLE = "STATUS|INTGBL|WONO|STATUS";
            
            //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
//            InitHeadRow(0, HEAD_TITLE, false);
            InitHeadRow(0, getLabel('SEE_WOM_0010_HDR1'), false);

            //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE,    SAVENAME,        KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
            InitDataProperty(0, 0,   dtHiddenStatus,   0,   daCenter,    false,    "ibflag");
            InitDataProperty(0, 1,   dtHidden,         0,   daCenter,    false,    "sv_intg_bl_seq");
            InitDataProperty(0, 2,   dtHidden,         0,   daCenter,    false,    "sv_wo_no");
            InitDataProperty(0, 3,   dtHidden,         0,   daCenter,    false,    "sv_wo_sts_cd");
		}
        break;
	   case 2:      //IBSheet2 init
		   with (sheetObj) {
			// 높이 설정
			style.height = 100;
			 
			//전체 너비 설정
			SheetWidth = mainTable.clientWidth;
			// SheetWidth = 400;
			
			//Host정보 설정[필수][HostIp, Port, PagePath]
			if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
			
			//전체Merge 종류 [선택, Default msNone]
			MergeSheet = msHeaderOnly;
			
			//전체Edit 허용 여부 [선택, Default false]
			Editable = false;
			
			//행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
			InitRowInfo( 1, 1, 9, 100);
			
			//컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
			InitColumnInfo(7, 0, 0, true);
			
			// 해더에서 처리할 수 있는 각종 기능을 설정한다
			InitHeadMode(true, true, true, true, false,false) ;
			
			//해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
//			InitHeadRow(0, "Del|con_ibflag|Seq.|cntr_list_seq|TP/SZ|Quantity|intg_bl_seq", true);
			InitHeadRow(0, getLabel('SEE_WOM_0010_HDR2'), true);

			//데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,           KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX] 
            InitDataProperty(0, 0,   dtHidden,        0,     daCenter,    false,    "Del");
            InitDataProperty(0, 1,   dtHidden,   	  0,     daCenter,    false,    "smry_ibflag");
            InitDataProperty(0, 2,   dtHidden,        0,     daCenter,    false,    "seq",           	 false,      "",       dfNone,      0,     		false,     false);
			InitDataProperty(0, 3,   dtHidden,        0,     daLeft,      false,    "cntr_smry_seq",     false,      "",       dfNone,      0,     		true,      true);

			InitDataProperty(0, 4,   dtData,         60,     daLeft,      false,    "bkg_tp_sz",         false,      "",       dfNone,      0,     		true,      true);
			InitDataProperty(0, 5,   dtData,         50,     daRight,     false,    "bk_qty",   	     false,      "",       dfInteger,   0,     		true,      true);
			InitDataProperty(0, 6,   dtHidden,        0,     daCenter,    false,    "intg_bl_seq",       false,      "",       dfNone,      0,     		true,      true);
			              
			
			
	    }
	break;
	case 3:      //Buying/Credit 탭부분 init
		with (sheetObj) {
			    // 높이 설정
			style.height = 100;
			 
			//전체 너비 설정
			SheetWidth = mainTable.clientWidth;
			// SheetWidth = 400;
			
			//Host정보 설정[필수][HostIp, Port, PagePath]
			if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
			
			//전체Merge 종류 [선택, Default msNone]
			MergeSheet = msHeaderOnly;
			
			//전체Edit 허용 여부 [선택, Default false]
			Editable = true;
			
			//행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
			InitRowInfo( 1, 1, 9, 100);
			
			//컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
			InitColumnInfo(6, 0, 0, true);
			
			// 해더에서 처리할 수 있는 각종 기능을 설정한다
			InitHeadMode(true, true, true, true, false,false) ;
			
			//해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
//			InitHeadRow(0, 'STATUS|DEL|CNTR SEQ|TP/SZ|Quantity|Container No', true);
			InitHeadRow(0, getLabel('SEE_WOM_0010_HDR3'), true);
			
			//데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,           KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
			InitDataProperty(0, 0,  dtHiddenStatus,  0,   daCenter,    true,    "cntr_ibflag");
			InitDataProperty(0, 1,  dtDelCheck,     40,   daCenter,    false,   "Del");
			InitDataProperty(0, 2,  dtHidden,        0,   daCenter,    false,   "wo_seq");
			
			InitDataProperty(0, 3,  dtCombo,        60,   daCenter,    false,   "cntr_tpsz_cd");
			InitDataProperty(0, 4,  dtData,         60,   daRight,     false,   "cntr_qty");
			InitDataProperty(0, 5,  dtData,         80,   daLeft,      false,   "wo_cntr_no");
			
			InitDataCombo (0,  'cntr_tpsz_cd', ' |'+TPCD1, ' |'+TPCD2);
	   }           
	   break;
    }
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	
	if(frm1.wo_no.value==''){
		frm1.wo_no.value  = docObjects[0].CellValue(1, "sv_wo_no");
		frm1.f_wo_no.value= docObjects[0].CellValue(1, "sv_wo_no");
	}
	frm1.wo_sts_cd.value  = docObjects[0].CellValue(1, "sv_wo_sts_cd");
	btnLoad();
	
	if(cntrSheet){
		cntrSheet = false;
		doWork('SEARCHLIST02');
	}
}

function sheet2_OnSearchEnd(){
	btnLoad();
}

/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function woCheckInpuVals(){
	var isOk = true;
	
	if(checkInputVal(frm1.org_rout_nod_cd.value, 3, 7, "T", 'Pickup C.Y.1 Code')!='O'){
		frm1.org_rout_nod_cd.focus();
		isOk = false;
		
	}else if(checkInputVal(frm1.org_rout_addr.value, 0, 400, "T", 'Door Address')!='O'){
		frm1.org_rout_addr.focus();
		isOk = false;
		
	}else if(checkInputVal(frm1.org_rout_pic.value, 0, 50, "T", 'PIC')!='O'){
		frm1.org_rout_pic.focus();
		isOk = false;
	
	}else if(checkInputVal(frm1.pkup_ord_no.value, 2, 40, "T", 'Pickup Order No.')!='O'){
		frm1.pkup_ord_no.focus();
		isOk = false;

	}
	
	if(isOk){
		if(frm1.org_rout_dt.value!=''||frm1.org_rout_tm.value!=''){
			if(checkInputVal(frm1.org_rout_dt.value, 10, 10, "D", 'Pickup Date')!='O'){
				frm1.org_rout_dt.focus();
				isOk = false;
				
			}else if(checkInputVal(frm1.org_rout_tm.value, 5, 5, "T", 'Pickup Time')!='O'){
				frm1.org_rout_tm.focus();
				isOk = false;
			}
		}
		
		if(isOk){
			if(frm1.org2_rout_nod_cd.value!=''||frm1.org2_rout_addr.value!=''||frm1.org2_rout_pic.value!=''||
			   frm1.org2_rout_pic_phn.value!=''||frm1.org2_rout_pic_fax.value!=''||frm1.pkup_ord_no2.value||frm1.org2_rout_dt.value!=''){
				
				if(checkInputVal(frm1.org2_rout_nod_cd.value, 3, 7, "T", 'Pickup C.Y.2 Code')!='O'){
					frm1.org2_rout_nod_cd.focus();
					isOk = false;
					
				}else if(checkInputVal(frm1.pkup_ord_no2.value, 2, 40, "T", 'Pickup Order No.')!='O'){
					frm1.pkup_ord_no2.focus();
					isOk = false;
					
				}else if(checkInputVal(frm1.org2_rout_addr.value, 0, 400, "T", 'Door Address')!='O'){
					frm1.org2_rout_addr.focus();
					isOk = false;
				}
				
				if(frm1.org2_rout_dt.value!=''||frm1.org2_rout_tm.value!=''){
					if(checkInputVal(frm1.org2_rout_dt.value, 10, 10, "D", 'Pickup Date')!='O'){
						frm1.org2_rout_dt.focus();
						isOk = false;
						
					}else if(checkInputVal(frm1.org2_rout_tm.value, 5, 5, "T", 'Pickup Time')!='O'){
						frm1.org2_rout_tm.focus();
						isOk = false;
					}
				}
			}
		}
		if(isOk){
			if(frm1.via_rout_loc_cd.value!=''||frm1.via_rout_addr.value!=''||frm1.via_rout_pic.value!=''||
			   frm1.via_rout_pic_phn.value!=''||frm1.via_rout_pic_fax.value!=''||frm1.via_rout_dt.value!=''){
				
				/*
				if(checkInputVal(frm1.via_rout_loc_cd.value, 3, 7, "T", 'Door Code')!='O'){
					frm1.via_rout_loc_cd.focus();
					isOk = false;
				}
				*/
				if(frm1.via_rout_dt.value!=''||frm1.via_rout_dt.value!=''){
					if(checkInputVal(frm1.via_rout_dt.value, 10, 10, "D", 'Door Date')!='O'){
						frm1.via_rout_dt.focus();
						isOk = false;
						
					}else if(checkInputVal(frm1.via_rout_tm.value, 5, 5, "T", 'Door Time')!='O'){
						frm1.via_rout_tm.focus();
						isOk = false;
					}
				}
			}
		}
		
		if(isOk){
			if(frm1.cgo_clz_dt.value!=''||frm1.cgo_clz_tm.value!=''){
				if(checkInputVal(frm1.cgo_clz_dt.value, 10, 10, "D", 'Cargo Closing Date')!='O'){
					frm1.cgo_clz_dt.focus();
					isOk = false;
					
				}else if(checkInputVal(frm1.cgo_clz_tm.value, 5, 5, "T", 'Cargo Closing Time')!='O'){
					frm1.cgo_clz_tm.focus();
					isOk = false;
				}
			}
			
			if(checkInputVal(frm1.dest_rout_nod_cd.value, 1, 10, "T", 'Return C.Y.')!='O'){
				frm1.dest_rout_nod_cd.focus();
				isOk = false;
			
			}else if(checkInputVal(frm1.dest_rout_addr.value, 0, 400, "T", 'Return Address')!='O'){
				frm1.dest_rout_addr.focus();
				isOk = false;
				
			}else if(checkInputVal(frm1.dest_rout_pic.value, 0, 50, "T", 'Return PIC')!='O'){
				frm1.dest_rout_pic.focus();
				isOk = false;
				
			}else if(checkInputVal(frm1.dest_ord_no.value, 2, 40, "T", 'Return Order')!='O'){
				frm1.dest_ord_no.focus();
				isOk = false;
				
			}else if(checkInputVal(frm1.dest_rmk.value, 0, 100, "T", 'Return Remark')!='O'){
				frm1.dest_rmk.focus();
				isOk = false;
				
			}else if(checkInputVal(frm1.trsp_trdp_cd.value, 4, 6, "T", 'TransPorter Code')!='O'){
				frm1.trsp_trdp_cd.focus();
				isOk = false;		
				
			}else if(checkInputVal(frm1.trsp_trdp_nm.value, 2, 50, "T", 'TransPorter Name')!='O'){
				frm1.trsp_trdp_nm.focus();
				isOk = false;
				
			}else if(checkInputVal(frm1.rmk.value, 0, 100, "T", 'TransPorter Remark')!='O'){
				frm1.rmk.focus();
				isOk = false;
				
			//}else if(checkInputVal(frm1.cgo_itm_cmdt_cd.value, 2, 20, "T", 'Commodity Code')!='O'){
			//	frm1.cgo_itm_cmdt_cd.focus();
			//	isOk = false;
		
			}else if(checkInputVal(frm1.cgo_pck_qty.value, 0, 7, "N", 'Package Qty')!='O'){
				isOk = false;
				frm1.cgo_pck_qty.focus();		
				
			}else if(checkInputVal(frm1.grs_wgt.value, 0, 8, "N", 'G/Weight')!='O'){
				isOk = false;
				frm1.grs_wgt.focus();	
				
			}else if(checkInputVal(frm1.act_wgt.value, 0, 8, "N", 'A/Weight')!='O'){
				isOk = false;
				frm1.act_wgt.focus();	
				
			}else if(checkInputVal(frm1.cgo_meas.value, 0, 8, "N", 'Measurement')!='O'){
				isOk = false;
				frm1.cgo_meas.focus();	
				
			}else if(checkInputVal(frm1.lnr_trdp_cd.value, 6, 7,  "T", 'Liner Code')!='O'){
				frm1.lnr_trdp_cd.focus();
				isOk = false;
				
			}else if(checkInputVal(frm1.lnr_trdp_nm.value, 2, 50, "T", 'Liner Name')!='O'){
				frm1.lnr_trdp_nm.focus();
				isOk = false;
			}
		}
	}
	return isOk;
}
