var tab3click = "";
var tab4click = "";
var tab5click = "";
var hblListSheet = false;
var docListSheet = false;
var cntrListSheet= false;

var frtSdSheet = false;
var frtBcSheet = false;
var frtDcSheet = false;

var isInvStsOk = false;

//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	
	var hblListParam = docObjects[1].GetSaveString(false);
	var docListParam = docObjects[3].GetSaveString(false);
	var cntrListParam= docObjects[2].GetSaveString(false);
	var sheetParam = '';
	
	if(hblListParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= hblListParam;
	  	hblListSheet = true;
	}
	  	
	if(docListParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= docListParam;
	  	docListSheet = true;
	}
	
	if(cntrListParam!=''){
		sheetParam+= '&';
    	sheetParam+= cntrListParam;
    	cntrListSheet= true
    }
	
	var frtSdListParam= docObjects[4].GetSaveString(false);
    
	if(frtSdListParam!=''){
    	var rtnFlg = frCheckInpuVals(docObjects[4], '');
    	
    	if(rtnFlg=='IV'){
    		isError = true;
    	}
    	
    	frtSdListParam= docObjects[4].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtSdListParam;

    	frtSdSheet = true;
	}
    
    var frtBcListParam= docObjects[5].GetSaveString(false);
    
    if(frtBcListParam!=''){
    	var rtnFlg = frCheckInpuVals(docObjects[5], 'b_')
    	if(rtnFlg=='IV'){
    		isError = true;
    	}
    	
    	frtBcListParam= docObjects[5].GetSaveString(false);
    	sheetParam+= '&';
    	sheetParam+= frtBcListParam;

    	frtBcSheet = true;
	}
    
    var frtDcListParam= docObjects[6].GetSaveString(false);
	
    if(frtDcListParam!=''){
		var rtnFlg = frCheckInpuVals(docObjects[6], 'dc_')
		
		if(rtnFlg=='IV'){
    		isError = true;
    	}
		
		frtDcListParam= docObjects[6].GetSaveString(false);
		sheetParam+= '&';
		sheetParam+= frtDcListParam;
		
		frtDcSheet = true;
	}
	
  return sheetParam;
}

var refCheck = true;

function doWork(srcName){
	if(!btnVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
	
// try{
		var formObj  = document.frm1;
        switch(srcName) {
        	case "NEW":
        		clearScreen();
        		break;

        	case "SAVE":
				formObj.intg_bl_seq.value = trim(formObj.intg_bl_seq.value);
        		if(formObj.intg_bl_seq.value=="" || formObj.intg_bl_seq.value=="1"){
        			doWork("SAVE_ADD");
        		}
        		else{
        			doWork("SAVE_MODIFY");
        		}
        		break;

			case "SAVE_ADD":	//등록, 2011.10.27 Kim,Jin-Hyuk
//	        	if(blCheckInpuVals()){
//	        		if(confirm(getLabel('FMS_COM_CFMSAV'))){
//	        			formObj.f_cmd.value = ADD;
//	        			gridAdd(0);
//	        			docObjects[0].CellValue(1, 1) = 1;
//	        			
//	        			//save post date, office info
//	        			if(ofc_post_dt=="ETD"){
//            				formObj.post_dt.value = formObj.etd_dt_tm.value;
//            			}else if(ofc_post_dt=="ETA"){
//            				formObj.post_dt.value = formObj.eta_dt_tm.value;
//            			}
//	                	   
//	        			//doShowProcess();
//	        			//docObjects[0].ShowDebugMsg = true;
//	        			docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), false);
//	        			//docObjects[0].ShowDebugMsg = false;
//	        		}
//	        	}
	        	
	        	if(blCheckInpuVals()){
					formObj.intg_bl_seq.value = trim(formObj.intg_bl_seq.value);
					formObj.ref_no.value = trim(formObj.ref_no.value);
	        		if(formObj.intg_bl_seq.value==''){
	        			if(formObj.ref_no.value=='' || formObj.ref_no.value=="AUTO"){
	        				formObj.ref_no.value = '';
	        				refCheck = true;
	        			}
	        			else{
	        				//ref_no가 자동채번이 아닌경우 저장되어 있는지 체크해야 함.
	        				ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+formObj.ref_no.value, './GateServlet.gsl');
	        			}
	        		}
	        		if(refCheck){
	        			ajaxSendPost(getMblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_bl_no='+formObj.bl_no.value, './GateServlet.gsl');        		   
	        		}
	        	}
	       
	        	break;
	        	
           case "SAVE_MODIFY":	//등록
               formObj.f_cmd.value = MODIFY;
               //if(inpuValCheck(sheetObj, ADD)){
                   //전체 CellRow의 갯수
               //20121130 OJG 
               if(blCheckInpuVals()){
                   if(confirm(getLabel('FMS_COM_CFMSAV'))){
                	   
                	   gridAdd(0);
                	   docObjects[0].CellValue(1, 1) = 1;
                	   
                	   formObj.f_bl_no.value = formObj.bl_no.value;
                	   
                	   //if(user_role_cd!="ADM"){
                		   //save post date, office info
                		   if(ofc_post_dt=="ETD"){
                			   formObj.post_dt.value = formObj.etd_dt_tm.value;
                		   }
                		   else if(ofc_post_dt=="ETA"){
                			   formObj.post_dt.value = formObj.eta_dt_tm.value;
                		   }
                	   //}

                	   //LHK REF_NO MODIFY 시 중복 Check
                	   ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+formObj.ref_no.value+'&mbl_seq='+formObj.intg_bl_seq.value, './GateServlet.gsl');
                	   
                	   if(refCheck){
                		   doShowProcess();
                    	   //docObjects[0].ShowDebugMsg = true;
                    	   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), false);
                    	   //docObjects[0].ShowDebugMsg = false;
                	   }
                	   
                   }
                }
                   
               //}
           
               break;
               
           case "CLOSE_MODIFY":	//등록
        	   formObj.f_cmd.value = COMMAND10;
        	   if(confirm(getLabel('FMS_COM_CFMSAV'))){
        		   gridAdd(0);
        		   docObjects[0].CellValue(1, 1) = 1;
        		   
        		   formObj.f_bl_no.value = formObj.bl_no.value;
        		   
        		   doShowProcess();
        		   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), false);
        	   }
           
        	   break;
        	   
           case "FINAL_MODIFY":	//등록
        	   formObj.f_cmd.value = COMMAND11;
        	   if(confirm(getLabel('FMS_COM_CFMSAV'))){
        		   gridAdd(0);
        		   docObjects[0].CellValue(1, 1) = 1;
        		   
        		   formObj.f_bl_no.value = formObj.bl_no.value;
        		   
        		   doShowProcess();
        		   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), false);
        	   }
          
        	   break;
        	   
           case "REMOVE":	//삭제
        	   ajaxSendPost(doRmvSrInfo, 'reqVal', '&goWhere=aj&bcKey=getHblClsChk&biz_clss_cd=M&intg_bl_seq='+formObj.intg_bl_seq.value, './GateServlet.gsl');
//        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
//	               formObj.f_cmd.value = REMOVE;
//	        	   doShowProcess();
//	        	   formObj.submit();
//        	   }
           
        	   break;
        	   
           case "DOCFILE":	//첨부파일
       			var reqParam = '?intg_bl_seq='+formObj.intg_bl_seq.value;
          		
       			reqParam += '&openMean=SEARCH01';
      	   		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 450, "scroll:no;status:no;help:no;");
     	   
      	   		break;
      	   		
      	   		// Email 전송로직 삭제 Bug 10366
//           case "SNDEML":	//Email전송
//          		var reqParam = '?intg_bl_seq='+formObj.intg_bl_seq.value;
//             	
//          		reqParam += '&openMean=SEARCH01';
//         	   	popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
//       	   
//         	   	break;
         	   	
           case "SEARCHLIST":	//조회
			   formObj.f_ref_no.value = trim(formObj.f_ref_no.value);
			   formObj.f_bl_no.value = trim(formObj.f_bl_no.value);
			   formObj.f_lnr_bkg_no.value = trim(formObj.f_lnr_bkg_no.value);
        	   if(formObj.f_ref_no.value==''&&formObj.f_bl_no.value==''&&formObj.f_lnr_bkg_no.value==''){
        		   //Please enter more than one Search Condition!
        		   alert(getLabel('FMS_COM_ALT014'));
        		   formObj.f_ref_no.focus();
        		   return;
        	   }
        	   else{
                   formObj.f_cmd.value = SEARCHLIST;
            	   doShowProcess();
            	   formObj.submit();
        	   }
       	   
        	   break;
        	   
           case "SEARCHLIST01":	//조회
			   formObj.intg_bl_seq.value = trim(formObj.intg_bl_seq.value);
			   formObj.f_bl_no.value = trim(formObj.f_bl_no.value);
			   formObj.f_ref_no.value = trim(formObj.f_ref_no.value);
			   formObj.f_lnr_bkg_no.value = trim(formObj.f_lnr_bkg_no.value);
        	   if(formObj.intg_bl_seq.value!=''){
	        	   if(formObj.f_bl_no.value==''&&formObj.f_ref_no.value==''&&formObj.f_lnr_bkg_no.value==''){
	        		   alert(getLabel('FMS_COM_ALT014'));
	        		   return;
	        	   }
	        	   else{
	                   formObj.f_cmd.value = SEARCHLIST01;
	            	   //doShowProcess();
	            	   docObjects[1].DoSearch4Post("SEE_BMD_0040_1GS.clt", FormQueryString(frm1));
	        	   }
        	   }
           
        	   break;
        	   
           case "SEARCH_DOC":	//첨부문서 조회
			   formObj.intg_bl_seq.value = trim(formObj.intg_bl_seq.value);
        	   if(formObj.intg_bl_seq.value!=''){
	        	   //Doccument File List 조회
		   	       formObj.f_cmd.value = SEARCHLIST02;
		   	 	   docObjects[3].DoSearch4Post("./SEE_BMD_0021_1GS.clt", FormQueryString(frm1));
        	   }	   	 	   
      	   
        	   break;
        	   
           case "SEARCH_CNTR":	//첨부문서 조회
			   formObj.intg_bl_seq.value = trim(formObj.intg_bl_seq.value);
        	   if(formObj.intg_bl_seq.value!=''){
	   		      //Doccument File List 조회
	   	          formObj.f_cmd.value = SEARCHLIST03;
	   	 	      docObjects[2].DoSearch4Post("./SEE_BMD_0040_2GS.clt", FormQueryString(frm1));
        	   }	   	 	   
      	  
        	   break;
        	   
           case "MFPRINT":
			   formObj.bl_no.value = trim(formObj.bl_no.value);
        	   if(formObj.bl_no.value==""){
        		   //Please retrieve data.
        		   alert(getLabel('FMS_COM_ALT029'));
        		   return;
        	   }
        	   
        	   var param = 'title=Sea Consolidated Cargo Manifest';
        	   param += '&cmd_type=46';
        	   param += '&bl_no=' + formObj.bl_no.value;
        	   
        	   popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
           
        	   break;
        	   
           case "PRINT":
			   formObj.intg_bl_seq.value = trim(formObj.intg_bl_seq.value);
        	   if(formObj.intg_bl_seq.value == ""){
        		   //Please retrieve data.
        		   alert(getLabel('FMS_COM_ALT029'));
          	   }
        	   else{
	    			formObj.file_name.value = 'SR_SEA.mrd';
	            	formObj.title.value = 'Ocean Export SR';
	            	
	    			//Parameter Setting
	            	var param  = '[' + formObj.intg_bl_seq.value + ']';		// [1]

	            	formObj.rd_param.value = param;
	    			
	    			formObj.mailTitle.value = 'Master Set / Shipping Request [MBL No : ' + formObj.bl_no.value + ']';;
	    			formObj.mailTo.value = mailTo;
	    			
	    			formObj.rpt_biz_tp.value = "OEM";
	    			formObj.rpt_biz_sub_tp.value = "BL";
	    			
	    			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
          	   }
      	  
        	   break;
        	   
      	   //2010.12.22 김진혁 추가, MBL도 HBL과 같은 조건으로 Copy 버튼 추가
           case "COPY":	//조회
        	   if(confirm(getLabel('FMS_COM_CFMCPY'))){
        		   formObj.f_cmd.value = COMMAND02;
            	   doShowProcess();
            	   formObj.submit();
        	   }
       	   
        	   break;
        	   
           case "HBLADD":	//등록
        	   var keyYn = '';
        	   
        	   if(formObj.bl_sts_cd.value!='NA'){
        		   keyYn = 'Y';
        	   }
        	   
               var paramArr = new Array(1);
			   var curHblStr = '';
			   var divStr = '^';
			   var clsStr = ';;';
			   
			   //현재 BLSEQ가 등록되었는지를 확인함
			   for(var i = 1; i< docObjects[1].rows; i++){
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_bkg_no');
				   curHblStr+= divStr; 
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_bl_no');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_act_shipper');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_obrd_dt_tm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_trnk_vsl');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_trnk_voy');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_pol_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_pol_nod_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_pol_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_pod_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_pod_nod_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_pod_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_del_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_del_nod_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_del_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_rep_cmdt_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_rep_cmdt_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_grs_wgt');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_grs_wgt_ut_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_act_wgt');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_act_wgt_ut_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_meas');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_meas_ut_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_pck_qty');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_pck_ut_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_pck_ut_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_intg_bl_seq');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_ibflag');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_lnr_trdp_cd');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_lnr_trdp_nm');
				   curHblStr+= divStr;
				   curHblStr+= docObjects[1].CellValue(i, 'hbl_shpr_trdp_nm');
				   
				   curHblStr+= clsStr;
			   }
			   paramArr[0] = curHblStr;
        	   var rtnVal = window.showModalDialog('./SEE_BMD_0031.clt', paramArr, "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:670px");
        	   
        	   //HBL ADD이후
        	   if(rtnVal!=''&&typeof(rtnVal)!='undefined'){
	        	   var rtnArr = rtnVal.split(';;');
	        	   	
	        	   var isBegin = true;
	        	   
	        	   var savedHbl = '';
	        	   
	        	   //기존 HBL목록을 초기화
	             	if(docObjects[1].rows>1){
	            		var totRow = docObjects[1].rows;
	            		totRow--;
	            		
	            		for(var i = totRow; 0 < i; i--){
	            			if(docObjects[1].CellValue(i, 'hbl_ibflag')!='R'){
	            				docObjects[1].RowDelete(i, false);	            				
	            			}
	            			else{
	            				savedHbl+= docObjects[1].CellValue(i, 'hbl_bl_no');
	            				savedHbl+= ':';
	            			}
	            		}
	            	}
	        	   
	               //현재 선택된 HBL정보를 표시함 
				   var intRows= docObjects[1].rows;
				   var newRow  = intRows-1;
				   var dispArr;
				   
				   var totPck = 0;
				   var totMeas= 0;
				   var totActWgt= 0;
				   var totWgt = 0;
				   var blSeq = '';
				   var firstObrdDt = 0;
				   
	        	   for(var i = 0; i < rtnArr.length; i++){
	        		   var hblArr = rtnArr[i].split('^');
	        		   if(rtnArr[i]!=''){
	        			   
	        			   //BL번호가 저장되어있지 않음경우
	        			   if(savedHbl.indexOf(hblArr[1]+':')==-1){
	        				   
	        				   //화면표시
	        				   if(i==0){
	        					   dispArr = hblArr;
	        					   firstObrdDt = hblArr[3];
	        				   }
	        				   else{
	        					   if(firstObrdDt==0){
	        						   firstObrdDt = hblArr[3];   

	        					   //가장빠른 Onboard 일자를 가지고 온다
	        					   }
	        					   else if(firstObrdDt>hblArr[3]){
	        						   firstObrdDt = hblArr[3];   
	        					   }
	        				   }
	        				   
							    docObjects[1].DataInsert(newRow);
							  
								docObjects[1].CellValue(intRows, 'hbl_bkg_no')    = hblArr[0];       
								docObjects[1].CellValue(intRows, 'hbl_bl_no')     = hblArr[1];        
								docObjects[1].CellValue(intRows, 'hbl_act_shipper')= hblArr[2];      

								docObjects[1].CellValue(intRows, 'hbl_obrd_dt_tm')=hblArr[3];   
								docObjects[1].CellValue(intRows, 'hbl_trnk_vsl')  = hblArr[4];     
								docObjects[1].CellValue(intRows, 'hbl_trnk_voy')  = hblArr[5];     

								docObjects[1].CellValue(intRows, 'hbl_pol_cd')    = hblArr[6];       
								docObjects[1].CellValue(intRows, 'hbl_pol_nod_cd')= hblArr[7];   
								docObjects[1].CellValue(intRows, 'hbl_pol_nm')    = hblArr[8];       

								docObjects[1].CellValue(intRows, 'hbl_pod_cd')    = hblArr[9];       
								docObjects[1].CellValue(intRows, 'hbl_pod_nod_cd')= hblArr[10];   
								docObjects[1].CellValue(intRows, 'hbl_pod_nm')    = hblArr[11];       

								docObjects[1].CellValue(intRows, 'hbl_del_cd')    = hblArr[12];       
								docObjects[1].CellValue(intRows, 'hbl_del_nod_cd')= hblArr[13];   
								docObjects[1].CellValue(intRows, 'hbl_del_nm')    = hblArr[14];       

								docObjects[1].CellValue(intRows, 'hbl_rep_cmdt_cd')= hblArr[15];  
								docObjects[1].CellValue(intRows, 'hbl_rep_cmdt_nm')= hblArr[16];  

								docObjects[1].CellValue(intRows, 'hbl_grs_wgt')    = hblArr[17];      
								docObjects[1].CellValue(intRows, 'hbl_grs_wgt_ut_cd')= hblArr[18];

								docObjects[1].CellValue(intRows, 'hbl_act_wgt')    = hblArr[19];      
								docObjects[1].CellValue(intRows, 'hbl_act_wgt_ut_cd')= hblArr[20];

								docObjects[1].CellValue(intRows, 'hbl_meas')       = hblArr[21];         
								docObjects[1].CellValue(intRows, 'hbl_meas_ut_cd') = hblArr[22];   

								docObjects[1].CellValue(intRows, 'hbl_pck_qty')    = hblArr[23];      
								docObjects[1].CellValue(intRows, 'hbl_pck_ut_cd')  = hblArr[24];    
								docObjects[1].CellValue(intRows, 'hbl_pck_ut_nm')  = hblArr[25];    

								docObjects[1].CellValue(intRows, 'hbl_intg_bl_seq')= hblArr[26];  
								
								docObjects[1].CellValue(intRows, 'hbl_lnr_trdp_cd')= hblArr[27];  
								docObjects[1].CellValue(intRows, 'hbl_lnr_trdp_nm')= hblArr[28];
								
								docObjects[1].CellValue(intRows, 'hbl_shpr_trdp_nm')= hblArr[29];
									
								blSeq+= hblArr[26];
								blSeq+= ',';
								               
								totWgt = getSumFloat(totWgt, hblArr[17]);
								totActWgt=getSumFloat(totActWgt, hblArr[19]);
								
								totMeas= getSumFloat(totMeas,hblArr[21]);
								totPck = getSumFloat(totPck, hblArr[23]);
								
							   if(isBegin){
								   if(formObj.intg_bl_seq.value==''){
									   shpAddr+= '\n';
									   shpAddr+= hblArr[29];
									   formObj.shpr_trdp_addr.value = shpAddr;
								   }
								   isBegin = false;
							   }
							   
							   newRow++;
							   intRows++;
	        			   }
	        		   }
	        	   }
	        	   
	        	   if(typeof(dispArr)!='undefined'&&newRow>0){
	        		   dispArr[3]  = mkStrToDate(firstObrdDt);
	        		   
	        		   dispArr[23] = strToFloatByNDecimalTp(totPck, 100);
	        		   dispArr[17] = strToFloatByNDecimalTp(totWgt, 100);
	        		   dispArr[19] = strToFloatByNDecimalTp(totActWgt, 100);
	        		   dispArr[21] = strToFloatByNDecimalTp(totMeas,10000);
	        		   
	        		   //화면에 기본값 표시
	        		   setDfltVal(dispArr);
	        		   
	        		   //Mark/Description 표시
//	        		   if(blSeq!=''){
//	        			   ajaxSendPost(autoMrkDesc, 'reqVal', '&goWhere=aj&bcKey=searchMrkDesc&intg_bl_seq='+blSeq, './GateServlet.gsl');
//	        		   }
	        	   }
				   
				//	formObj.act_wgt.value    = hblArr[19];
				//	formObj.meas.value       = hblArr[21];
				//	formObj.pck_qty.value    = hblArr[23];
  
        	   }
       	   
        	   break;
        	   
           	case "SEARCH_FRT":	//Freight 조회
          		if(formObj.bl_sts_cd.value!='NA'){
//            		searchGrid(6);    // 동적 Sheet생성 로직추가로 인하여 주석처리
          			searchGrid(7);
          			searchGrid(8);
          			searchGrid(9);
          		}
          	
          		break;
          	
           	case "GOTOACCT":
				formObj.bl_no.value = trim(formObj.bl_no.value);
				formObj.ref_no.value = trim(formObj.ref_no.value);
           		if(formObj.bl_no.value!='' || formObj.ref_no.value!=''){
           			var paramStr = "./ACC_INV_0040.clt?";
           			paramStr+= "s_mbl_no=" + formObj.bl_no.value;
           			paramStr+= "&s_intg_bl_seq=" + formObj.intg_bl_seq.value;
           			paramStr+= "&s_ref_no=" + formObj.ref_no.value;
           			
           		    //#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : Link시 검색기간 제외 조회 옵션처리
					paramStr+= "&linkOpt=KEY";
					
           			parent.mkNewFrame('Invoice List', paramStr);
           		}
            
           		break;
            
           	case "HBL_ENTRY":
				formObj.ref_no.value = trim(formObj.ref_no.value);
           		if(formObj.ref_no.value!=''){
           			var paramStr = "./SEE_BMD_0020.clt?";
           			paramStr+= "f_mbl_ref_no=" + formObj.ref_no.value;
           			
           			parent.mkNewFrame('Booking & HBL', paramStr);
           		}
            
           		break;

        }
//    } catch(e) {
//        if(e == "[object Error]"){
//        	//Unexpected Error occurred. Please contact Help Desk!
//        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SEE_BMD_0040.001");
//        } 
//        else{
//        	//System Error! + MSG
//        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEE_BMD_0040.002"); 
//        }
//    }
}

/**
 * 화면에 기본값 Display
 */
function setDfltVal(hblArr){
	
	frm1.etd_dt_tm.value = hblArr[3];
	
	frm1.lnr_trdp_cd.value= hblArr[27];  
	frm1.lnr_trdp_nm.value= hblArr[28];  
	       
	frm1.pol_cd.value    = hblArr[6];       
	frm1.pol_nm.value    = hblArr[8];       

	frm1.pod_cd.value    = hblArr[9];       
	frm1.pod_nm.value    = hblArr[11];       

	frm1.del_cd.value    = hblArr[12];       
	frm1.del_nm.value    = hblArr[14];       

	frm1.trnk_vsl_nm.value  = hblArr[4];     
	frm1.trnk_voy.value  = hblArr[5];     
	
	frm1.grs_wgt.value    = hblArr[17];      
	frm1.grs_wgt_ut_cd.value= hblArr[18];
	weightChange(frm1.grs_wgt);

	frm1.meas.value       = hblArr[21];         
	frm1.meas_ut_cd.value = hblArr[22];
	cbmChange(frm1.meas);

	frm1.pck_qty.value    = hblArr[23];      
	frm1.pck_ut_cd.value  = hblArr[24];    
}

/**
 * 화면초기화
 */
function clearScreen(){
	btnPrint.style.display = 'none';
	doShowProcess();
    frm1.f_cmd.value = '';
    frm1.submit();
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	if(errMsg==''&&frm1.intg_bl_seq.value==''){
		frm1.f_intg_bl_seq.value= docObjects[0].CellValue(1, "sv_intg_bl_seq"); 
		frm1.intg_bl_seq.value  = docObjects[0].CellValue(1, "sv_intg_bl_seq");
		frm1.bl_sts_cd.value    = docObjects[0].CellValue(1, "sv_bl_sts_cd");
		//frm1.sr_no.value        = docObjects[0].CellValue(1, "sv_sr_no");
		//frm1.f_sr_no.value      = frm1.sr_no.value;
		frm1.f_bl_no.value      = docObjects[0].CellValue(1, "sv_bl_no");
		frm1.ref_no.value       = docObjects[0].CellValue(1, "sv_ref_no");
		frm1.f_ref_no.value     = docObjects[0].CellValue(1, "sv_ref_no");
		frm1.sel_ref_no.value       = docObjects[0].CellValue(1, "sv_ref_no");
		
//		frm1.ref_no.className = 'search_form-disable';
//		frm1.ref_no.readOnly  = true;
		
		//etd가 변경되었을 수 있으므로 etd 날짜를 post에 덮어쓴다.
		frm1.post_dt.value = frm1.etd_dt_tm.value;
	}
	
	frm1.f_ref_no.value     = frm1.ref_no.value;
	frm1.sel_ref_no.value   = frm1.ref_no.value;
	
	if(hblListSheet){
		doWork('SEARCHLIST01');		
	}
	
	if(docListSheet){
		doWork('SEARCH_DOC');
	}
	
	if(cntrListSheet){
		doWork('SEARCH_CNTR');
	}
	
	if(frtSdSheet){
		searchGrid(7);
	}
	if(frtBcSheet){
		searchGrid(8);
	}
	if(frtDcSheet){
		searchGrid(9);
	}
	
	//버튼 초기화
	btnLoad();
	
	//"Save success! ");
	
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}

function gridAdd(objIdx){
	var intRows = docObjects[objIdx].Rows;
	intRows--;
	docObjects[objIdx].DataInsert(intRows);
}

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat, obj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
            var cal = new calendarPopup();
            cal.select(obj, obj.name, 'MM-dd-yyyy');
        break;
    }
}

/**
 * 파일목록 조회시. 3번째 Sheet를 리턴함.
 */
function getSelectedFiles(){
	return docObjects[3];
}


//--------------------------------------------------------------------------------------------------------------
//                                             Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	
	var tabObjs = document.getElementsByName('tabLayer');
    if( isNumSep == "01" ) {
    
    	currTab = isNumSep;	//탭상태저장
    	
        document.all.Tab01.className = "tab_head-l";
        document.all.Tab02.className = "tab_head_non-l";
        document.all.Tab03.className = "tab_head_non-l";
        document.all.Tab04.className = "tab_head_non-l";
        document.all.Tab05.className = "tab_head_non-l";

        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';

	    //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;

    //Container List 목록
    }else if( isNumSep == "02" ) {
		callSheetObject("td4sheet4", "sheet4");    // 해당탭의 IBSheet 생성

    	currTab = isNumSep;	//탭상태저장
    	
        document.all.Tab01.className = "tab_head_non-l";
        document.all.Tab02.className = "tab_head-l";
        document.all.Tab03.className = "tab_head_non-l";
        document.all.Tab04.className = "tab_head_non-l";
        document.all.Tab05.className = "tab_head_non-l";
        
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "inline";
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        if(tab3click == ""){
        	tab3click = "Y";
        	doWork('SEARCH_CNTR');
        }

    //Mark Description 탭
    }else if( isNumSep == "03" ) {
    	currTab = isNumSep;	//탭상태저장
    	
    	document.all.Tab01.className = "tab_head_non-l";
        document.all.Tab02.className = "tab_head_non-l";
        document.all.Tab03.className = "tab_head-l";
        document.all.Tab04.className = "tab_head_non-l";
        document.all.Tab05.className = "tab_head_non-l";
        
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = 'inline';
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'none';
        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        
    }else if( isNumSep == "04" ) {
		callSheetObject("td4sheet7", "sheet7");    // 해당탭의 IBSheet 생성
		callSheetObject("td4sheet9", "sheet9");    // 해당탭의 IBSheet 생성
		callSheetObject("td4sheet8", "sheet8");    // 해당탭의 IBSheet 생성

    	currTab = isNumSep;	//탭상태저장
    	
        document.all.Tab01.className = "tab_head_non-l";
        document.all.Tab02.className = "tab_head_non-l";
        document.all.Tab03.className = "tab_head_non-l";
        document.all.Tab04.className = "tab_head-l";
        document.all.Tab05.className = "tab_head_non-l";
              
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = "none";
        tabObjs[3].style.display = 'inline';
        tabObjs[4].style.display = 'none';
        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        if(tab4click == ""){
        	tab4click = "Y";
        	doWork('SEARCH_FRT');
        }
    //Shipping Document 탭
    }else if( isNumSep == "05" ) {
		callSheetObject("td4sheet3", "sheet3");    // 해당탭의 IBSheet 생성
		callSheetObject("td4sheet10", "sheet10");    // 해당탭의 IBSheet 생성

    	currTab = isNumSep;	//탭상태저장
    	
        document.all.Tab01.className = "tab_head_non-l";
        document.all.Tab02.className = "tab_head_non-l";
        document.all.Tab03.className = "tab_head_non-l";
        document.all.Tab04.className = "tab_head_non-l";
        document.all.Tab05.className = "tab_head-l";
              
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = "none";
        tabObjs[3].style.display = 'none';
        tabObjs[4].style.display = 'inline';
        
        //스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
        if(tab5click == ""){
        	tab5click = "Y";
        	doWork('SEARCH_DOC');
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
    
    frm1.pck_qty.value  	= doMoneyFmt(Number(frm1.pck_qty.value).toFixed(0));
    frm1.grs_wgt.value  	= doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(2));
    frm1.grs_wgt1.value  	= doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(2));
    frm1.meas.value  		= doMoneyFmt(Number(frm1.meas.value).toFixed(3));
    frm1.meas1.value  		= doMoneyFmt(Number(frm1.meas1.value).toFixed(3));
    
    // 2011.12.28 BL Type에서 Third Party 뺄 것
    for(var i=0 ; i<frm1.hbl_tp_cd.length ; i++){
    	if(frm1.hbl_tp_cd.options[i].value == 'TP'){
    		frm1.hbl_tp_cd.options[i] = null;
    	}
    }
    
    if(frm1.intg_bl_seq.value==''){
    	//collect로 셋팅
    	frm1.frt_term_cd.value = 'CC';
    	
    	//AUTO 표시
    	frm1.ref_no.value = "AUTO";
    	/* oyh 2013.09.04 #20421 : [BINEX] B/L type의 default를 Express에 Y로 */
    	/* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting*/
       	frm1.obl_tp_cd.value = "E";
    	frm1.pck_ut_cd.value = "CT";
    }
    
    if(frm1.bl_sts_cd.value=='HO' || frm1.bl_sts_cd.value=='HF'){
    	//Accounting Closed. You can only edit following fields.\nContainer Info. / B/L Body / Vessel name & voyage.
    	alert(getLabel('SEA_COM_ALT011'));
    }
    
    //단축키추가.
    setShortcut();
}

function setShortcut(){
}

/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0] = sheet_obj;
		
			break;
			
		case "sheet2":
			docObjects[1] = sheet_obj;
		
			break;
			
		case "sheet4":
			docObjects[2] = sheet_obj;
		
			break;
			
		case "sheet3":
			docObjects[3] = sheet_obj;
		
			break;
		
		case "sheet7":
			docObjects[4] = sheet_obj;
		
			break;
			
		case "sheet8":
			docObjects[5] = sheet_obj;
		
			break;
			
		case "sheet9":
			docObjects[6] = sheet_obj;
		
			break;
		case "sheet10":
			docObjects[7] = sheet_obj;
		
			break;	
	}
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
            InitColumnInfo(6, 0, 0, true);

            // 해더에서 처리할 수 있는 각종 기능을 설정한다
            InitHeadMode(true, true, true, true, false,false) ;
            
            
            //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
            InitHeadRow(0, getLabel('SEE_BMD_0040_HDR1'), false);

            //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE,    SAVENAME,        KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
            InitDataProperty(0, 0,   dtHiddenStatus,   0,   daCenter,    false,    "ibflag");
            InitDataProperty(0, 1,   dtHidden,         0,   daCenter,    false,    "sv_intg_bl_seq");
            InitDataProperty(0, 2,   dtHidden,         0,   daCenter,    false,    "sv_sr_no");
            InitDataProperty(0, 3,   dtHidden,         0,   daCenter,    false,    "sv_bl_no");
            InitDataProperty(0, 4,   dtHidden,         0,   daCenter,    false,    "sv_bl_sts_cd");
            InitDataProperty(0, 5,   dtHidden,         0,   daCenter,    false,    "sv_ref_no");
		}
        break;
		case 2:     //HBL List
			with (sheetObj) {
                // 높이 설정
                style.height = 150;
                
                //전체 갯수표시 위치 지정. 0: 사라지게함.
				CountPosition = 0;
				
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
                InitColumnInfo(41, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
                
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('SEE_BMD_0040_HDR2'), true);
                
                var cnt = 0;
                
                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,        KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, cnt++,  dtData,           35,   daCenter,  false,    "seq");
                InitDataProperty(0, cnt++,  dtData,          120,   daLeft,    false,    "hbl_bkg_no",          false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtData,          120,   daLeft,    false,    "hbl_bl_no",           false,      "",       dfNone,   0,     false,     false);
                
                InitDataProperty(0, cnt++,  dtHidden,        100,   daLeft,    false,    "hbl_act_shipper",     false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtData,          120,   daLeft,    false,    "hbl_shpr_trdp_nm",    false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtData,          120,   daLeft,    false,    "hbl_cnee_trdp_nm",    false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtData,          120,   daLeft,    false,    "hbl_prnr_trdp_nm",    false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtHidden,        120,   daLeft,    false,    "hbl_lnr_trdp_nm",     false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtData,          120,   daLeft,    false,    "hbl_ntfy_trdp_nm",    false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtHidden,        120,   daLeft,    false,    "hbl_trnk_vsl",        false,      "",       dfNone,   0,    false,     false);
                InitDataProperty(0, cnt++,  dtHidden,         60,   daLeft,    false,    "hbl_trnk_voy",        false,      "",       dfNone,   0,    false,     false);
                
                InitDataProperty(0, cnt++,  dtHidden,        120,   daLeft,    false,    "hbl_por_nm",          false,      "",       dfNone,   0,     false,     false);
                
                InitDataProperty(0, cnt++,  dtHidden,         70,   daCenter,  false,    "hbl_obrd_dt_tm",      false,      "",       dfDateYmd,0,     false,     false);
                InitDataProperty(0, cnt++,  dtHidden,         50,   daLeft,    false,    "hbl_pol_cd",          false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtHidden,         50,   daLeft,    false,    "hbl_pol_nod_cd",      false,      "",       dfNone,   0,     false,     false);
				InitDataProperty(0, cnt++,  dtHidden,        120,   daLeft,    false,    "hbl_pol_nm",          false,      "",       dfNone,   0,     false,     false);			
							
				InitDataProperty(0, cnt++,  dtHidden,         50,   daLeft,    false,    "hbl_pod_cd",          false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtHidden,         50,   daLeft,    false,    "hbl_pod_nod_cd",      false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtHidden,        120,   daLeft,    false,    "hbl_pod_nm",          false,      "",       dfNone,   0,     false,     false);

                InitDataProperty(0, cnt++,  dtHidden,         50,   daLeft,    false,    "hbl_del_cd",          false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtHidden,         50,   daLeft,    false,    "hbl_del_nod_cd",      false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtHidden,        120,   daLeft,    false,    "hbl_del_nm",          false,      "",       dfNone,   0,     false,     false);

                InitDataProperty(0, cnt++,  dtHidden,         50,   daLeft,    false,    "hbl_rep_cmdt_cd",     false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtHidden,         50,   daLeft,    false,    "hbl_rep_cmdt_nm",     false,      "",       dfNone,   0,     false,     false);
							
                InitDataProperty(0, cnt++,  dtData,         60,   daRight,   false,    "hbl_pck_qty",         false,      "",       dfNullFloat,   2,false,     false);
                InitDataProperty(0, cnt++,  dtHidden,         60,   daLeft,    false,    "hbl_pck_ut_cd",       false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, cnt++,  dtData,         60,   daLeft,    false,    "hbl_pck_ut_nm",       false,      "",       dfNone,   0,     false,     false);

                InitDataProperty(0, cnt++,  dtData,         60,   daRight,   false,    "hbl_meas",            false,      "",       dfNullFloat,   4,false,     false);
                InitDataProperty(0, cnt++,  dtData,         60,   daRight,   false,    "hbl_meas1",            false,      "",       dfNullFloat,   4,false,     false);
                InitDataProperty(0, cnt++,  dtHidden,         80,   daRight,   false,    "hbl_meas_ut_cd",      false,      "",       dfNone,   0,     false,     false);

                InitDataProperty(0, cnt++,  dtData,         60,   daRight,   false,    "hbl_grs_wgt",         false,      "",       dfNullFloat,   2,false,     false);
                InitDataProperty(0, cnt++,  dtData,         60,   daRight,   false,    "hbl_grs_wgt1",         false,      "",       dfNullFloat,   2,false,     false);
                InitDataProperty(0, cnt++,  dtHidden,         80,   daRight,   false,    "hbl_grs_wgt_ut_cd",   false,      "",       dfNone,   0,     false,     false);
							
                InitDataProperty(0, cnt++,  dtHidden,         80,   daRight,   false,    "hbl_act_wgt",         false,      "",       dfNullFloat,   2,false,     false);
                InitDataProperty(0, cnt++,  dtHidden,         80,   daRight,   false,    "hbl_act_wgt_ut_cd",   false,      "",       dfNone,   0,     false,     false);
                
                InitDataProperty(0, cnt++,  dtHidden,         80,   daLeft,    false,    "hbl_cntr_no",   		false,      "",       dfNone,   0,     false,     false);

                InitDataProperty(0, cnt++,  dtHidden,          0,   daCenter,  false,    "hbl_intg_bl_seq");
                InitDataProperty(0, cnt++,  dtHiddenStatus ,   0,   daCenter,  false,    "hbl_ibflag");
                
                InitDataProperty(0, cnt++,  dtHidden,          0,   daCenter,  false,    "hbl_lnr_trdp_cd");
                
                InitDataProperty(0, cnt++,  dtHidden,          0,   daCenter,  false,    "hbl_shpr_trdp_nm");
                InitDataProperty(0, cnt++,  dtHidden,         20,   daCenter,  false,    "del_icon");
                
                ImageList(0) = APP_PATH+"/web/img/main/trash.gif";
                InitDataImage(0, 'del_icon', daCenter);
		        sheetObj.DataLinkMouse("del_icon")= true;

		        InitViewFormat(0, "hbl_obrd_dt_tm", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
      			EditDateFormat = "MDY";//날짜 입력을 월/일/년 으로 설정
      			
           }                                                      
	    break;
		case 3:		//Container List 그리드
			with (sheetObj) {
                // 높이 설정
                style.height = 400;
                
                //전체 갯수표시 위치 지정. 0: 사라지게함.
				CountPosition = 0;
				
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
                InitColumnInfo(24, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;

                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('SEE_BMD_HDR4'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE,    SAVENAME,        KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0,  0,  dtDelCheck,      40,   daCenter,    false,    "Del");
                InitDataProperty(0,  1,  dtHiddenStatus,  40,   daCenter,    false,    "conls_ibflag");
                InitDataProperty(0,  2,  dtData,          40,   daCenter,    false,    "Seq",        		false,      "",       dfNone,      0,     		false,      false);
                
				InitDataProperty(0,  3,  dtHidden,        70,   daCenter,    false,    "soc_flg",         	false,      "",       dfNone,      0,     		true,      true);
                InitDataProperty(0,  4,  dtData,    	 100,   daLeft,      false,    "cntr_no",        	false,      "",       dfNone,      0,     		true,      true		,14);
				InitDataProperty(0,  5,  dtCombo,         60,   daLeft,      false,    "cntr_tpsz_cd",      false,      "",       dfNone,      0,     		true,      true);
				
				InitDataProperty(0,  6,  dtData,          60,   daLeft,      false,    "seal_no1",          false,      "",       dfNone,      0,     		true,      true		,20);
				InitDataProperty(0,  7,  dtData,          60,   daLeft,      false,    "seal_no2",          false,      "",       dfNone,      0,     		true,      true		,20);
				InitDataProperty(0,  8,  dtHidden,        60,   daLeft,      false,    "seal_no3",          false,      "",       dfNone,      0,     		true,      true		,20);
				
				InitDataProperty(0,  9,  dtData,          40,   daRight,     false,    "cgo_pck_qty",       false,      "",       dfInteger,   0,     		true,      true		,7);
				InitDataProperty(0, 10,  dtCombo,         80,   daLeft,      false,    "cgo_pck_ut",        false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0, 11,  dtData,          60,   daRight,     false,    "cgo_wgt",         	false,      "",       dfFloat,     2,     		true,      true 	,10);
				InitDataProperty(0, 12,  dtData,          60,   daRight,     false,    "cgo_wgt1",         	false,      "",       dfFloat,     2,     		true,      true 	,10);
				InitDataProperty(0, 13,  dtData,          60,   daRight,     false,    "cgo_meas",          false,      "",       dfFloat,     6,     		true,      true 	,11);
				InitDataProperty(0, 14,  dtData,          60,   daRight,     false,    "cgo_meas1",         false,      "",       dfFloat,     6,     		true,      true 	,11);
				InitDataProperty(0, 15,  dtHidden,        60,   daRight,     false,    "vol_meas",         	false,      "",       dfFloat,     6,     		true,      true);
				
				InitDataProperty(0, 16,  dtHidden,        50,   daCenter,    false,    "cntr_sprl_trdp_cd", false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0, 17,  dtHidden,       100,   daLeft,      false,    "cntr_sprl_trdp_nm", false,      "",       dfNone,      0,     		true,      true);

				InitDataProperty(0, 18,  dtCombo,         50,   daCenter,    false,    "dg_gds_flg",        false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0, 19,  dtData,          80,   daLeft,      false,    "cntr_rmk",         	false,      "",       dfNone,      0,     		true,      true, 50);
				
				InitDataProperty(0, 20,  dtHidden,         0,   daCenter,    false,    "intg_bl_seq",       false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0, 21,  dtHidden,         0,   daCenter,    false,    "cntr_list_seq",     false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0, 22,  dtHidden,         0,   daCenter,    false,    "vol_tot",     		false,      "",       dfNone,      0,     		true,      true);
				
				InitDataProperty(0, 23,  dtHidden,         0,   daCenter,    false,    "rgst_cntr_yn",     	false,      "",       dfNone,      0,     		true,      true);
				
				InitDataValid(0, 'cntr_no',  vtEngUpOther, "1234567890");
				InitDataValid(0, 'seal_no1', vtEngUpOther, "1234567890-,/ .;:");
				InitDataValid(0, 'seal_no2', vtEngUpOther, "1234567890-,/ .;:");
				InitDataValid(0, 'seal_no3', vtEngUpOther, "1234567890-,/ .;:");
				
	            InitDataCombo (0,  'soc_flg',      LSTCD1, LSTCD2);
	            InitDataCombo (0,  'cntr_tpsz_cd', ' |'+TPCD1, ' |'+TPCD2);
	            InitDataCombo (0,  'cgo_pck_ut', PCKCD1, PCKCD2 ,'','CT');
	            InitDataCombo (0,  'dg_gds_flg', 'N|Y', 'N|Y');
            }                                                      
		break;
	    case 4:					//첨부파일
	        with (sheetObj) {
	            // 높이 설정
	            style.height = 400;
	            
	            //전체 갯수표시 위치 지정. 0: 사라지게함.
				CountPosition = 0;
				
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
	            InitColumnInfo(13, 0, 0, true);
	
	            // 해더에서 처리할 수 있는 각종 기능을 설정한다
	            InitHeadMode(true, true, true, true, false,false) ;
	            
	            //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
	            InitHeadRow(0, getLabel('SEE_BMD_0040_HDR4'), false);
	
	            //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    	KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
	            InitDataProperty(0,  0,  dtHiddenStatus,    40,   daCenter,  false,    "doc_ibflag");
	            InitDataProperty(0,  1,  dtDelCheck,       	40,   daCenter,  false,    "Del",	 			false,      "",       dfNone,      0,     		true,       true);
	            InitDataProperty(0,  2,  dtHidden,       	40,   daCenter,  false,    "palt_check",	 	false,      "",       dfNone,      0,     		true,       true);
	            InitDataProperty(0,  3,  dtHidden,         100,   daLeft,    false,    "palt_doc_seq",	 	false,      "",       dfNone,      0,     		false,      false);
	            InitDataProperty(0,  4,  dtHidden,           0,   daLeft,    false,    "palt_doc_tp_cd",	false,      "",       dfNone,      0,     		false,      false);
				
				InitDataProperty(0,  5,  dtData,           150,   daLeft,    false,    "palt_doc_tp_nm",	false,      "",       dfNone,      0,     		false,      false);
				
	            InitDataProperty(0,  6,  dtData,           200,   daLeft,    false,    "palt_doc_nm",	 	false,      "",       dfNone,      0,     		false,      false);
	            InitDataProperty(0,  7,  dtData,       	   150,   daLeft,    false,    "palt_doc_no",	 	false,      "",       dfNone,      0,     		false,      false);
	            InitDataProperty(0,  8,  dtImageText,       50,   daCenter,  false,    "palt_doc_img_url",	false,      "",       dfNone,      0,     		false,      false);
	            InitDataProperty(0,  9,  dtImageText,       50,   daCenter,  false,    "palt_doc_pdf_url",	false,      "",       dfNone,      0,     		false,      false);
	            
	            InitDataProperty(0,  10,  dtHidden,         320,   daLeft,    false,    "palt_doc_rmk",		false,      "",       dfNone,      0,     		false,      false);
	            InitDataProperty(0, 11,  dtData,           100,   daCenter,  false,    "rgst_tms",			false,      "",       dfDateYmd,      0,     	false,      false);
	            InitDataProperty(0, 12,  dtHidden,           0,   daCenter,  false,    "intg_bl_seq_d",		false,      "",       dfNone,      0,     		false,      false);
				
				ImageList(0) = APP_PATH+"/web/img/button/bt_img.gif";
		        ImageList(1) = APP_PATH+"/web/img/button/bt_pdf.gif";
		        
		        InitDataImage(0, 8, daCenter);
		        InitDataImage(0, 9	, daCenter);
		        
		        sheetObj.DataLinkMouse("palt_doc_nm")= true;
		        sheetObj.DataLinkMouse("palt_doc_img_url")= true;
		        sheetObj.DataLinkMouse("palt_doc_pdf_url")= true;
		        
		        InitViewFormat(0, "rgst_tms", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
      			EditDateFormat = "MDY";//날짜 입력을 월/일/년 으로 설정
	       }                                                      
	   break;
	   
	    case 5:      //Selling/Debit 탭부분 init

            with (sheetObj) {
                // 높이 설정
                style.height = 150;
                
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
                InitRowInfo( 2, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(42, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('SEE_BMD_0040_HDR5_1'), true);
                InitHeadRow(1, getLabel('SEE_BMD_0040_HDR5_2'), true);
                
                var cnt = 0;
                
                //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0,cnt++,  dtDelCheck,    40,   daCenter,  true,    "fr_del_chk",        false,   "",       dfNone,         1,     true,       true);
	            InitDataProperty(0,cnt++,  dtHidden,       0,   daCenter,  true,    "fr_frt_seq",        false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,cnt++,  dtCheckBox,    40,   daCenter,  true,    "fr_frt_check",      false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,cnt++,  dtHidden,      60,   daCenter,  true,    "fr_sell_buy_tp_cd", false,   "",       dfNone,         1,     true,       true);
                
                InitDataProperty(0,cnt++,  dtCombo,       70,   daCenter,  true,    "fr_frt_cd",         false,   "",       dfNone,         1,     true,       true, 10);
                InitDataProperty(0,cnt++,  dtData,       110,   daLeft,    true,    "fr_frt_cd_nm",      false,   "",       dfNone,         1,     true,       true, 50);
                InitDataProperty(0,cnt++,  dtPopupEdit,   43,   daCenter,  true,    "fr_trdp_cd",        false,   "",       dfNone,         1,     true,       true, 20);
                InitDataProperty(0,cnt++,  dtData,       120,   daLeft,    true,    "fr_trdp_nm",        false,   "",       dfNone,         1,     true,       true, 50);
                InitDataProperty(0,cnt++,  dtPopupEdit,   40,   daCenter,  true,    "fr_rat_curr_cd",    false,   "",       dfNone,         1,     true,       true, 3);
               
                InitDataProperty(0,cnt++,  dtCombo,       50,   daCenter,  true,    "fr_aply_ut_cd",     false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,cnt++,  dtCombo,       40,   daCenter,  true,    "fr_cntr_tpsz_cd",   false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,cnt++,  dtData,        40,   daRight,   true,    "fr_qty",            false,   "",       dfFloat,         3,     true,       true, 10);

                InitDataProperty(0,cnt++,  dtHidden,      30,   daCenter,  true,    "fr_scg_incl_flg",   false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,cnt++,  dtCombo,       30,   daCenter,  true,    "fr_frt_term_cd",    false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,cnt++,  dtData,        70,   daRight,   true,    "fr_ru",             false,   "",       dfFloat,        2,     true,       true,14);
                InitDataProperty(0,cnt++,  dtHidden,      70,   daRight,   true,    "fr_agent_ru",       false,   "",       dfFloat,        2,     true,       true,14);
                
                InitDataProperty(0,cnt++,  dtData,        70,   daRight,   true,    "fr_trf_cur_sum_amt",false,   "",       dfFloat,        2,     false,      false, 18);
                
                InitDataProperty(0,cnt++,  dtData,        23,   daRight,   true,    "fr_vat_rt",         false,   "",       dfFloat,        2,     true,       true, 5);
                InitDataProperty(0,cnt++,  dtData,        70,   daRight,   true,    "fr_vat_amt",        false,   "",       dfFloat,    	2,     false,      false, 18);

                InitDataProperty(0,cnt++,  dtPopupEdit,   40,   daRight,   true,    "fr_inv_curr_cd",    false,   "",       dfNone,         1,     true,       true, 3);
                InitDataProperty(0,cnt++,  dtPopupEditFormat,50,daRight,   true,    "fr_inv_xcrt",       false,   "",       dfFloat,        4,     true,       true, 10);
                InitDataProperty(0,cnt++,  dtHidden,       0,   daCenter,  true,    "fr_inv_xcrt_dt",    false,   "",       dfNone,         0,     true,       true);

                InitDataProperty(0,cnt++,  dtData,        90,   daRight,   true,    "fr_inv_amt",        false,   "",       dfFloat,    	2,     true,       true, 18);
                InitDataProperty(0,cnt++,  dtData,        70,   daRight,   true,    "fr_inv_vat_amt",    false,   "",       dfFloat,    	2,     true,       true, 18);
                InitDataProperty(0,cnt++,  dtData,        90,   daRight,   true,    "fr_inv_sum_amt",    false,   "",       dfFloat,    	2,     true,       true, 18);
                InitDataProperty(0,cnt++,  dtHidden,      90,   daRight,   true,    "fr_agent_amt",      false,   "",       dfFloat,        2,     true,       true);

                InitDataProperty(0,cnt++,  dtHidden,      80,   daRight,   true,    "fr_perf_curr_cd",   false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,cnt++,  dtHidden,      70,   daRight,   true,    "fr_perf_xcrt",      false,   "",       dfFloat,    	2,     true,       true);
                InitDataProperty(0,cnt++,  dtHidden,      70,   daRight,   true,    "fr_perf_amt",       false,   "",       dfFloat,    	2,     true,       true);
                InitDataProperty(0,cnt++,  dtHidden,      70,   daRight,   true,    "fr_perf_vat_amt",   false,   "",       dfFloat,    	4,     true,       true);
				
                InitDataProperty(0,cnt++,  dtData,       100,   daLeft,    true,    "fr_inv_no",         false,   "",       dfNone,         0,     false,      false);
                InitDataProperty(0,cnt++,  dtHidden,     100,   daLeft,    true,    "fr_buy_inv_no",     false,   "",       dfNone,         0,     false,      false);
                InitDataProperty(0,cnt++,  dtHidden,     100,   daLeft,    true,    "fr_inv_seq",        false,   "",       dfNone,         0,     false,      false);
                InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "fr_inv_sts_cd",     false,   "",       dfNone,         0,     false,      false);
                InitDataProperty(0,cnt++,  dtData,       100,   daLeft,    true,    "fr_inv_sts_nm",     false,   "",       dfNone,         0,     false,      false);

                InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "fr_auto_trf_flg");
                InitDataProperty(0,cnt++,  dtHidden,     100,   daRight,   true,    "fr_trf_ctrt_no",    false,   "",       dfNone,         0,     false,      false);
                InitDataProperty(0,cnt++,  dtHidden,      80,   daRight,   true,    "fr_trf_dtl_seq",    false,   "",       dfNone,         0,     false,      false);
                
                InitDataProperty(0,cnt++,  dtHiddenStatus, 0,   daCenter,  true,    "fr_ibflag",         false,   "",      dfNone,         1,     true,       true);
                InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "fr_frt_ask_clss_cd");
                InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "fr_inv_due_dt");
                InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "fr_org_agent_amt",      false,   "",       dfFloat,        2,     true,       true, 18);
                
				HeadRowHeight = 20 ;
				HeadRowHeight = 21;

				InitDataCombo (0, 'fr_frt_cd',    	   ARFRTCD2, ARFRTCD1);
//				InitDataCombo (0, 'fr_sell_buy_tp_cd', "Selling", "S");      //S/D
				InitDataCombo (0, 'fr_aply_ut_cd',     UNITCD1, UNITCD2);     	  	  //Unit코드
				InitDataCombo (0, 'fr_scg_incl_flg',   "N|Y", "N|Y");				  //Inc.
				InitDataCombo (0, 'fr_frt_term_cd',   "P|C", "PP|CC"); //P/C
				
				InitDataValid(0, "fr_trdp_cd", vtEngUpOther, "1234567890");
				InitDataValid(0, "fr_rat_curr_cd", vtEngUpOnly, "");
				InitDataValid(0, "fr_inv_curr_cd", vtEngUpOnly, "");
			
           }                                                      
       break;
       //Freight
       case 6:      //Buying/Credit 탭부분 init
           with (sheetObj) {
                 // 높이 설정
                 style.height = 150;
                 
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
                 InitRowInfo( 2, 1, 9, 100);

                 //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                 InitColumnInfo(42, 0, 0, true);

                 // 해더에서 처리할 수 있는 각종 기능을 설정한다
                 InitHeadMode(true, true, true, true, false,false) ;

                 //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                 InitHeadRow(0, getLabel('SEE_BMD_0040_HDR6_1'), true);
                 InitHeadRow(1, getLabel('SEE_BMD_0040_HDR6_2'), true);
                 
                 var cnt = 0;
                 
                 //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                 InitDataProperty(0,cnt++,  dtDelCheck,    40,   daCenter,  true,    "b_fr_del_chk",        false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daCenter,  true,    "b_fr_frt_seq",        false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtCheckBox,    40,   daCenter,  true,    "b_fr_frt_check",      false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,      60,   daCenter,  true,    "b_fr_sell_buy_tp_cd", false,   "",       dfNone,         1,     true,       true);

                 InitDataProperty(0,cnt++,  dtCombo,       70,   daCenter,  true,    "b_fr_frt_cd",         false,   "",       dfNone,         1,     true,       true, 10);
                 InitDataProperty(0,cnt++,  dtData,       110,   daLeft,    true,    "b_fr_frt_cd_nm",      false,   "",       dfNone,         1,     true,       true, 50);
                 InitDataProperty(0,cnt++,  dtPopupEdit,   43,   daCenter,  true,    "b_fr_trdp_cd",        false,   "",       dfNone,         1,     true,       true, 20);
                 InitDataProperty(0,cnt++,  dtData,       120,   daLeft,    true,    "b_fr_trdp_nm",        false,   "",       dfNone,         1,     true,       true , 50);
                 InitDataProperty(0,cnt++,  dtPopupEdit,   40,   daCenter,  true,    "b_fr_rat_curr_cd",    false,   "",       dfNone,         1,     true,       true, 3);
                
                 InitDataProperty(0,cnt++,  dtCombo,       50,   daCenter,  true,    "b_fr_aply_ut_cd",     false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtCombo,       40,   daCenter,  true,    "b_fr_cntr_tpsz_cd",   false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtData,        40,   daRight,   true,    "b_fr_qty",            false,   "",       dfFloat,        3,     true,       true, 10);

                 InitDataProperty(0,cnt++,  dtHidden,      30,   daCenter,  true,    "b_fr_scg_incl_flg",   false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtCombo,       30,   daCenter,  true,    "b_fr_frt_term_cd",    false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtData,        70,   daRight,   true,    "b_fr_ru",             false,   "",       dfFloat,        2,     true,       true, 14);
                 InitDataProperty(0,cnt++,  dtHidden,      70,   daRight,   true,    "b_fr_agent_ru",       false,   "",       dfFloat,        2,     true,       true, 14);
                 
                 InitDataProperty(0,cnt++,  dtData,        70,   daRight,   true,    "b_fr_trf_cur_sum_amt",false,   "",       dfFloat,        2,     false,      false, 18);
                 
                 InitDataProperty(0,cnt++,  dtData,        23,   daRight,   true,    "b_fr_vat_rt",         false,   "",       dfFloat,        2,     true,       true, 5);
                 InitDataProperty(0,cnt++,  dtData,        70,   daRight,   true,    "b_fr_vat_amt",        false,   "",       dfFloat,    	   2,     false,      false, 18);
                 
                 InitDataProperty(0,cnt++,  dtPopupEdit,   40,   daCenter,  true,    "b_fr_inv_curr_cd",    false,   "",       dfNone,         1,     true,       true, 3);
                 InitDataProperty(0,cnt++,  dtPopupEditFormat,50,daRight,   true,    "b_fr_inv_xcrt",       false,   "",       dfFloat,        4,     true,       true, 10);
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daCenter,  true,    "b_fr_inv_xcrt_dt",    false,   "",       dfNone,         0,     true,       true);
                 
                 InitDataProperty(0,cnt++,  dtData,        90,   daRight,   true,    "b_fr_inv_amt",        false,   "",       dfFloat,    	   2,     true,       true, 18);
                 InitDataProperty(0,cnt++,  dtData,        70,   daRight,   true,    "b_fr_inv_vat_amt",    false,   "",       dfFloat,    	   2,     true,       true, 18);
                 InitDataProperty(0,cnt++,  dtData,        90,   daRight,   true,    "b_fr_inv_sum_amt",    false,   "",       dfFloat,        2,     true,       true, 18);
                 InitDataProperty(0,cnt++,  dtHidden,      90,   daRight,   true,    "b_fr_agent_amt",      false,   "",       dfFloat,        2,     true,       true);

                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "b_fr_perf_curr_cd",   false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,      80,   daRight,   true,    "b_fr_perf_xcrt",      false,   "",       dfFloat,    	   2,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,     120,   daRight,   true,    "b_fr_perf_amt",       false,   "",       dfFloat,    	   2,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "b_fr_perf_vat_amt",   false,   "",       dfFloat,    	   4,     true,       true);
 				
                 InitDataProperty(0,cnt++,  dtHidden,     100,   daLeft,    true,    "b_fr_inv_no",         false,   "",       dfNone,         0,     false,      false);
                 InitDataProperty(0,cnt++,  dtData,       100,   daLeft,    true,    "b_fr_buy_inv_no",     false,   "",       dfNone,         0,     false,      false);
                 InitDataProperty(0,cnt++,  dtHidden,     100,   daLeft,    true,    "b_fr_inv_seq",        false,   "",       dfNone,         0,     false,      false);
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "b_fr_inv_sts_cd",     false,   "",       dfNone,         0,     false,      false);
                 InitDataProperty(0,cnt++,  dtData,       100,   daLeft,    true,    "b_fr_inv_sts_nm",     false,   "",       dfNone,         0,     false,      false);

                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "b_fr_auto_trf_flg");
                 InitDataProperty(0,cnt++,  dtHidden,     100,   daRight,   true,    "b_fr_trf_ctrt_no",    false,   "",       dfNone,         0,     false,      false);
                 InitDataProperty(0,cnt++,  dtHidden,      80,   daRight,   true,    "b_fr_trf_dtl_seq",    false,   "",       dfNone,         0,     false,      false);
                 
                 InitDataProperty(0,cnt++,  dtHiddenStatus, 0,   daCenter,  true,    "b_fr_ibflag",         false,   "",      dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "b_fr_frt_ask_clss_cd");
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "b_fr_inv_due_dt");
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "b_fr_org_agent_amt",      false,   "",       dfFloat,        2,     true,       true, 18);
                 
   			     HeadRowHeight = 20 ;
   		    	 HeadRowHeight = 21;

   		    	 InitDataCombo (0, 'b_fr_frt_cd',    	  APFRTCD2, APFRTCD1);
//				 InitDataCombo (0, 'b_fr_sell_buy_tp_cd', "Buying", "B");     //B/C
				 InitDataCombo (0, 'b_fr_aply_ut_cd',     UNITCD1, UNITCD2);     	  	  //Unit코드
				 InitDataCombo (0, 'b_fr_scg_incl_flg',   "N|Y", "N|Y");				  //Inc.
				 InitDataCombo (0, 'b_fr_frt_term_cd',    "P|C", "PP|CC"); //P/C
				 
				 InitDataValid(0, "b_fr_trdp_cd", vtEngUpOther, "1234567890");
				 InitDataValid(0, "b_fr_rat_curr_cd", vtEngUpOnly, "");
				 InitDataValid(0, "b_fr_inv_curr_cd", vtEngUpOnly, "");
            }                                                      
        break;
       case 7:      //Buying/Credit 탭부분 init
           with (sheetObj) {
                 // 높이 설정
                 style.height = 150;
                 
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
                 InitRowInfo( 2, 1, 9, 100);

                 //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                 InitColumnInfo(42, 0, 0, true);

                 // 해더에서 처리할 수 있는 각종 기능을 설정한다
                 InitHeadMode(true, true, true, true, false,false) ;

                 //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
//                 InitHeadRow(0, 'DEL||Sel.|Revenue/\nCost|Freight\nCode|Freight\nCode|Customer Code|Customer Code|Tariff\nCur.|Unit|TP/SZ|Vol.|Inc.|P/C|Debit\nRate|Credit\nRate|Amount|VAT|VAT|Curr.|Ex.Rate|Debit/Credit|Debit/Credit|Debit/Credit|Debit/Credit|Debit/Credit|Amount(Performance)|Amount(Performance)|Amount(Performance)|Amount(Performance)|Invoice No.|Invoice No.|Invoice No.|STATUS CODE|Status|Dept.|Operator|AUTO Tariff FLAG|Tariff No.|Item Seq.|IBFlag', true);
//                 InitHeadRow(1, 'DEL||Sel.|Revenue/\nCost|Code|Name|Code|Name|Tariff\nCur.|Unit|TP/SZ|Vol.|Inc.|P/C|Debit\nRate|Credit\nRate|Amount|%|Rate|Curr.|Ex.Rate|Ex. Date|Amount|VAT|Debit Amount|Credit Amount|Curr.|Ex.Rate|Amount|VAT|Invoice No.|Invoice No.|Invoice No.|STATUS CODE|Status|Dept.|Operator|AUTO Tariff FLAG|Tariff No.|Item Seq.|IBFlag', true);
                 InitHeadRow(0, getLabel('SEE_BMD_0040_HDR7_1'), true);
                 InitHeadRow(1, getLabel('SEE_BMD_0040_HDR7_2'), true);
                 
                 var cnt = 0;
                 
                 //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                 InitDataProperty(0,cnt++,  dtDelCheck,    40,   daCenter,  true,    "dc_fr_del_chk",        false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daCenter,  true,    "dc_fr_frt_seq",        false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtCheckBox,    40,   daCenter,  true,    "dc_fr_frt_check",      false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtCombo,       60,   daCenter,  true,    "dc_fr_sell_buy_tp_cd", false,   "",       dfNone,         1,     true,       true);

                 InitDataProperty(0,cnt++,  dtCombo,       70,   daCenter,  true,    "dc_fr_frt_cd",         false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtData,       110,   daLeft,    true,    "dc_fr_frt_cd_nm",      false,   "",       dfNone,         1,     true,       true, 50);
                 InitDataProperty(0,cnt++,  dtPopupEdit,   43,   daCenter,  true,    "dc_fr_trdp_cd",        false,   "",       dfNone,         1,     true,       true, 20);
                 InitDataProperty(0,cnt++,  dtData,       120,   daLeft,    true,    "dc_fr_trdp_nm",        false,   "",       dfNone,         1,     true,       true, 50);
                 InitDataProperty(0,cnt++,  dtPopupEdit,   40,   daCenter,  true,    "dc_fr_rat_curr_cd",    false,   "",       dfNone,         1,     true,       true, 3);
                
                 InitDataProperty(0,cnt++,  dtCombo,       50,   daCenter,  true,    "dc_fr_aply_ut_cd",     false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtCombo,       40,   daCenter,  true,    "dc_fr_cntr_tpsz_cd",   false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtData,        40,   daRight,   true,    "dc_fr_qty",            false,   "",       dfFloat,        3,     true,       true, 10);

                 InitDataProperty(0,cnt++,  dtHidden,      30,   daCenter,  true,    "dc_fr_scg_incl_flg",   false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtCombo,       30,   daCenter,  true,    "dc_fr_frt_term_cd",    false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtData,        70,   daRight,   true,    "dc_fr_ru",             false,   "",       dfFloat,        2,     true,       true, 14);
                 InitDataProperty(0,cnt++,  dtData,        70,   daRight,   true,    "dc_fr_agent_ru",       false,   "",       dfFloat,        2,     true,       true, 14);
                 
                 InitDataProperty(0,cnt++,  dtHidden,      70,   daRight,   true,    "dc_fr_trf_cur_sum_amt",false,   "",       dfFloat,        2,     false,      false);
                 
                 InitDataProperty(0,cnt++,  dtHidden,      23,   daRight,   true,    "dc_fr_vat_rt",         false,   "",       dfFloat,        2,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,      70,   daRight,   true,    "dc_fr_vat_amt",        false,   "",       dfFloat,    	2,     false,      false);
                 
                 InitDataProperty(0,cnt++,  dtPopupEdit,   40,   daCenter,  true,    "dc_fr_inv_curr_cd",    false,   "",       dfNone,         1,     true,       true, 3);
                 InitDataProperty(0,cnt++,  dtPopupEditFormat,50,daRight,   true,    "dc_fr_inv_xcrt",       false,   "",       dfFloat,        4,     true,       true, 10);
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daCenter,  true,    "dc_fr_inv_xcrt_dt",    false,   "",       dfNone,         0,     true,       true);
                 
                 InitDataProperty(0,cnt++,  dtHidden,      90,   daRight,   true,    "dc_fr_inv_amt",        false,   "",       dfFloat,    	2,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,      70,   daRight,   true,    "dc_fr_inv_vat_amt",    false,   "",       dfFloat,    	2,     true,       true);
                 InitDataProperty(0,cnt++,  dtData,        90,   daRight,   true,    "dc_fr_inv_sum_amt",    false,   "",       dfFloat,        2,     true,       true, 18);
                 InitDataProperty(0,cnt++,  dtData,        90,   daRight,   true,    "dc_fr_agent_amt",      false,   "",       dfFloat,        2,     true,       true, 18);

                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "dc_fr_perf_curr_cd",   false,   "",       dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,      80,   daRight,   true,    "dc_fr_perf_xcrt",      false,   "",       dfFloat,    	2,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,     120,   daRight,   true,    "dc_fr_perf_amt",       false,   "",       dfFloat,    	2,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "dc_fr_perf_vat_amt",   false,   "",       dfFloat,    	4,     true,       true);
 				
                 InitDataProperty(0,cnt++,  dtData,       100,   daLeft,    true,    "dc_fr_inv_no",         false,   "",       dfNone,         0,     false,      false);
                 InitDataProperty(0,cnt++,  dtHidden,     100,   daLeft,    true,    "dc_fr_buy_inv_no",     false,   "",       dfNone,         0,     false,      false);
                 InitDataProperty(0,cnt++,  dtHidden,     100,   daLeft,    true,    "dc_fr_inv_seq",        false,   "",       dfNone,         0,     false,      false);
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "dc_fr_inv_sts_cd",     false,   "",       dfNone,         0,     false,      false);
                 InitDataProperty(0,cnt++,  dtData,       100,   daLeft,    true,    "dc_fr_inv_sts_nm",     false,   "",       dfNone,         0,     false,      false);

                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "dc_fr_auto_trf_flg");
                 InitDataProperty(0,cnt++,  dtHidden,     100,   daRight,   true,    "dc_fr_trf_ctrt_no",    false,   "",       dfNone,         0,     false,      false);
                 InitDataProperty(0,cnt++,  dtHidden,      80,   daRight,   true,    "dc_fr_trf_dtl_seq",    false,   "",       dfNone,         0,     false,      false);
                 
                 InitDataProperty(0,cnt++,  dtHiddenStatus, 0,   daCenter,  true,    "dc_fr_ibflag",         false,   "",      dfNone,         1,     true,       true);
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "dc_fr_frt_ask_clss_cd");
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "dc_fr_inv_due_dt");
                 InitDataProperty(0,cnt++,  dtHidden,       0,   daRight,   true,    "dc_fr_org_agent_amt",      false,   "",       dfFloat,        2,     true,       true, 18);
                 
   			     HeadRowHeight = 20 ;
   		    	 HeadRowHeight = 21;

   		    	 InitDataCombo (0, 'dc_fr_frt_cd',    	   DCFRTCD2, DCFRTCD1);
				 InitDataCombo (0, 'dc_fr_sell_buy_tp_cd', "Revenue|Cost", "D|C");     //B/C
				 InitDataCombo (0, 'dc_fr_aply_ut_cd',     UNITCD1, UNITCD2);     	  	  //Unit코드
				 InitDataCombo (0, 'dc_fr_scg_incl_flg',   "N|Y", "N|Y");				  //Inc.
				 InitDataCombo (0, 'dc_fr_frt_term_cd',    "P|C", "PP|CC"); //P/C
				 
				 InitDataValid(0, "dc_fr_trdp_cd", vtEngUpOther, "1234567890");
				 InitDataValid(0, "dc_fr_rat_curr_cd", vtEngUpOnly, "");
				 InitDataValid(0, "dc_fr_inv_curr_cd", vtEngUpOnly, "");
            }                                                      
        break;
       case 8:      //TP/SZ init
	    with (sheetObj) {
	        // 높이 설정
	        style.height = 0;

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
	        InitColumnInfo(2, 0, 0, true);

	        // 해더에서 처리할 수 있는 각종 기능을 설정한다
	        InitHeadMode(true, true, true, true, false,false) ;

	        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
	        InitHeadRow(0, getLabel('SEE_FRT_0010_HDR1'), false);

	        //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
	        InitDataProperty(0, 0,  dtData,       60,   daCenter,  false,    "");
	        InitDataProperty(0, 1,  dtData,       60,   daCenter,  false,    "");
	      }
	  break;
    }
}

/**
 * HBL표시
 */
function sheet2_OnDblClick(sheetObj,Row,Col){
   	var paramStr = "./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.CellValue(Row, 'hbl_bl_no');
   	parent.mkNewFrame('Booking & HBL', paramStr);
}


//########################## 첨부문서 ##########################
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet3_OnDblClick(sheetObj,Row,Col){
	//Name선택 시에만 팝업 호출
	if(sheetObj.ColSaveName(Col)=='palt_doc_nm'){
		var reqParam = '?intg_bl_seq='+frm1.intg_bl_seq.value;
		reqParam += '&s_palt_doc_seq='+sheetObj.CellValue(Row,"palt_doc_seq");
		reqParam += '&openMean='+SEARCH02;

		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDocUp', 806, 450, "scroll:no;status:no;help:no;");
	}
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet3_OnClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet3_OnClick(sheetObj, Row, Col){	
   	var downType;
   	var s_palt_doc_seq;
   	
	switch (sheetObj.ColSaveName(Col)) {
        case "palt_doc_img_url" :
        	if(sheetObj.CellImage(Row, "palt_doc_img_url")==0){
                s_palt_doc_seq = sheetObj.CellValue(Row,"palt_doc_seq");
                downloadFile('org',s_palt_doc_seq);
        	}
        
        	break;
       
        case "palt_doc_pdf_url" :
        	if(sheetObj.CellImage(Row, "palt_doc_pdf_url")==1){
	            s_palt_doc_seq = sheetObj.CellValue(Row,"palt_doc_seq");
	            downloadFile('pdf', s_palt_doc_seq);
        	}
        
        	break;
	} // end switch
}

//파일 다운로드
function downloadFile(downType,s_palt_doc_seq){
	document.frm2.docType.value = downType;
	document.frm2.s_palt_doc_seq.value = s_palt_doc_seq;
	//document.frm2.target = '_self';
	document.frm2.submit();
}

/**
 * 파일 업로드 팝업에서 목록 Reload
 */
function reloadDocList(){
	doWork('SEARCH_DOC');
}

/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function blCheckInpuVals(){
	var isOk = true;
	
	//---------------20121130 OJG---------------------------
	if(!chkCmpAddr(frm1.shpr_trdp_addr, 'Shipper Address')){
		isOk = false;
		moveTab('01');
		//frm1.shpr_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.cnee_trdp_addr, 'Consignee Address')){
		isOk = false;
		moveTab('01');
		//frm1.cnee_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk = false;
		moveTab('01');
		//frm1.ntfy_trdp_addr.focus();
	}
	//---------------20121130 OJG--------------------------
	
	/*
	 *  2012.02.23
	 * 필수값 설정
	 * REF_NO, ETD
	 */
	/*if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){S.Y BAIK (2013.01.23)*/
	if(!checkInType(frm1.etd_dt_tm.value, "DD")){	
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETD_'));
		
		isOk = false;
		moveTab('01');
		frm1.etd_dt_tm.focus();

		return isOk; 

	}

	if(trim(frm1.etd_dt_tm.value)!= "" && trim(frm1.eta_dt_tm.value) != ""){
		if(getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy") < 0){
			// 'ETD date must be greater than ETA date
			alert(getLabel("SEA_COM_ALT021"));
			frm1.eta_dt_tm.focus();
			isOk = false;
			return isOk; 
		}
	}

/*
	if(checkInputVal(frm1.shpr_trdp_nm.value, 2, 50, "T", 'Shipper')!='O'){
		isOk = false;
		moveTab('01');
		frm1.shpr_trdp_nm.focus();

	}else if(checkInputVal(frm1.shpr_trdp_addr.value, 2, 400, "T", 'Shipper Address')!='O'){
		moveTab('01');
		frm1.shpr_trdp_addr.focus();
		isOk = false;		
		
	}else if(checkInputVal(frm1.cnee_trdp_nm.value, 2, 50, "T", 'Consignee Name')!='O'){
		isOk = false;
		moveTab('01');
		frm1.cnee_trdp_nm.focus();
		
	}else if(checkInputVal(frm1.cnee_trdp_addr.value, 2, 400, "T", 'Consignee Address')!='O'){
		moveTab('01');
		frm1.cnee_trdp_addr.focus();
		isOk = false;			
		
	}else if(checkInputVal(frm1.lnr_trdp_cd.value, 6, 7, "T", 'Liner Code')!='O'){
		isOk = false;
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
		
	}else if(checkInputVal(frm1.lnr_trdp_nm.value, 2, 50, "T", 'Liner Name')!='O'){
		isOk = false;
		moveTab('01');
		frm1.lnr_trdp_nm.focus();
		
	}else if(checkInputVal(frm1.trnk_vsl_nm.value, 2, 100, "T", 'Vessel Name')!='O'){
		isOk = false;
		moveTab('01');
		frm1.trnk_vsl_nm.focus();
		
	}else if(checkInputVal(frm1.trnk_voy.value, 3, 8, "T", 'Voyage')!='O'){
		isOk = false;
		moveTab('01');
		frm1.trnk_voy.focus();
		
	}else if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){
		isOk = false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
		
	}else if(checkInputVal(frm1.pol_cd.value, 5, 6, "T", 'POL')!='O'){
		isOk = false;
		moveTab('01');
		frm1.pol_cd.focus();
		
	}else if(checkInputVal(frm1.pod_cd.value, 5, 6, "T", 'POD')!='O'){
		isOk = false;
		moveTab('01');
		frm1.pod_cd.focus();
		
	}else if(checkInputVal(frm1.del_cd.value, 5, 6, "T", 'DEL Code')!='O'){
		isOk = false;
		moveTab('01');
		frm1.del_cd.focus();
		
	}else if(checkInputVal(frm1.pck_qty.value, 0, 7, "N", 'Package Qty')!='O'){
		isOk = false;
		moveTab('01');
		frm1.pck_qty.focus();		
		
	}else if(checkInputVal(frm1.grs_wgt.value, 0, 8, "N", 'G/Weight')!='O'){
		isOk = false;
		moveTab('01');
		frm1.grs_wgt.focus();	
		
	}else if(checkInputVal(frm1.meas.value, 0, 8, "N", 'Measurement')!='O'){
		isOk = false;
		moveTab('01');
		frm1.meas.focus();	
		
	}else if(checkInputVal(frm1.bl_iss_dt.value, 10, 10, "DD", 'Issued Date')!='O'){
		isOk = false;
		moveTab('01');
		frm1.bl_iss_dt.focus();
		
	}else if(checkInputVal(frm1.mk_txt.value, 0, 4000, "T", 'Mark')!='O'){
		isOk = false;
		moveTab('02');
		frm1.mk_txt.focus();
		
	}else if(checkInputVal(frm1.desc_txt.value, 0, 4000, "T", 'Description')!='O'){
		isOk = false;
		moveTab('02');
		frm1.desc_txt.focus();
		
	}else if(checkInputVal(frm1.rmk.value, 0, 400, "T", 'Remark')!='O'){
		isOk = false;
		moveTab('02');
		frm1.rmk.focus();
	}
*/

	/*==================================================================================================*/
	/* LHK, 20130128 Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용						    */
	/* Freight 생성 후 Invoice 를 생성한 후 재조회 하지 않고 다시 저장할 경우 delete 하거나 수정 건으로 인한 오류 발생을 차단. */
	var sheetObjArr = new Array(3);
		sheetObjArr[0] = docObjects[4];		//AR LOCAL  'fr_'
		sheetObjArr[1] = docObjects[6];	//DC 		'dc_fr_'
		sheetObjArr[2] = docObjects[5];		//AP 		'b_fr_'
	
	if(checkFrtSts(sheetObjArr)==false){	//Validation 후 Do you want to save 뜨지 않고 원래값 가져오기
		isOk = false;
	}
	
	/*=================================================================================================*/

	return isOk;
}

function svcTermChange(){
	var formObj = document.frm1;
	
	formObj.to_svc_term_cd.value = formObj.fm_svc_term_cd.value;
}

function setOfficeData(){
	var formObj = document.frm1;
	var sheetObj = docObjects[1];
	
	//office post date setting, Ocean Export
	if(formObj.post_dt.value==""){
		if(ofc_post_dt=="TODAY"){
			formObj.post_dt.value = getTodayStr();
		}
	}
	
	//office currency
	if(ofc_curr_cd!=""){
		formObj.curr_cd.value = ofc_curr_cd;
	}
	
	//office code
	formObj.ref_ofc_cd.value = v_ofc_cd;
}

function weightChange(obj){
	var formObj = document.frm1;
	
	if(obj.name=="grs_wgt"){
		formObj.grs_wgt1.value = roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
		chkComma(formObj.grs_wgt1,8,2);
	}
	else if(obj.name=="grs_wgt1"){
		formObj.grs_wgt.value = roundXL(formObj.grs_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 2);
		chkComma(formObj.grs_wgt,8,2);
	}
}

function cbmChange(obj){
	var formObj = document.frm1;
	
	if(obj.name=="meas"){
		formObj.meas1.value = roundXL(formObj.meas.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, 3);
		chkComma(formObj.meas1,8,3);
	}
	
	else if(obj.name=="meas1"){
		formObj.meas.value = roundXL(formObj.meas1.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, 3);
		chkComma(formObj.meas,8,3);
	}
	
}

function loadData(){
	if(frm1.intg_bl_seq.value!=""){
		//ref_ofc_cd를 database에 있는 값으로 셋팅함
		frm1.ref_ofc_cd.value = frm1.h_ref_ofc_cd.value;
		frm1.frt_term_cd.value = frm1.h_frt_term_cd.value;
		
		//currency를 database에 있는 값으로 셋팅함
		frm1.curr_cd.value = frm1.h_curr_cd.value;
		
		//attach rider 체크
		rowCount(frm1, 15, frm1.rider_lbl);
		
//		frm1.ref_no.className = 'search_form-disable';
//		frm1.ref_no.readOnly  = true;
		
		doWork('SEARCHLIST01');
//		doWork('SEARCH_CNTR');    // 동적 Sheet생성 로직추가로 인하여 주석처리
	}
}

//2011.11.21 Kim,Jin-Hyuk House B/L Add
function sheet2_OnSearchEnd(sheetObj, row, col){
	var rows = sheetObj.SearchRows;
	if(rows==0){
		sheetObj.RemoveAll();
	}
}

/**
 * Container번호 중복확인
 */
function checkCntrNo(inCntrNo){
	var intRows = docObjects[2].Rows;
	var loopNum = 0;
	for(var i = 1; i < intRows; i++){
		if(inCntrNo==docObjects[2].CellValue(i, 'cntr_no')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}

function sheet4_OnChange(sheetObj, row, col){
	switch (sheetObj.ColSaveName(col)) {
		case "cgo_pck_qty" :
		case "cgo_wgt" :
		case "cgo_wgt1" :
		case "cgo_meas" :
		case "cgo_meas1" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.CellValue2(row, col) = "";
				return;
			}
		break;
	}

	var cntrColStr = "cntr_no";
	
	if(sheetObj.ColSaveName(col)==cntrColStr){
		//Contaienr Number 유효성 검증
		if(sheetObj.CellValue(row, cntrColStr)!==''){
			var rtnVal = cntrNumCheck(sheetObj.CellValue(row, cntrColStr));
			
			if(rtnVal){		//정상인경우
				//중복 확인
				if(!checkCntrNo(sheetObj.CellValue(row, cntrColStr))){
					//This Container Number is already used!\nPlease check the Container Number!
					alert(getLabel('FMS_COM_ALT025') + " \n - " + getLabel('FMS_COD_CNTR'));
					
					sheetObj.CellValue2(row, cntrColStr) = '';
					sheetObj.SelectCell(row, cntrColStr);
				}
			}
			else{
				//Proceed anyway? ...??? 
				if(confirm(getLabel('FMS_COM_CFMCON')) == false){
					sheetObj.CellValue2(row, cntrColStr) = '';
					sheetObj.SelectCell(row, cntrColStr);
				}else{
					//중복 확인
					if(!checkCntrNo(sheetObj.CellValue(row, cntrColStr))){
						//This Container Number is already used!\nPlease check the Container Number!
						alert(getLabel('FMS_COM_ALT025') + " \n - " + getLabel('FMS_COD_CNTR'));
						
						sheetObj.CellValue2(row, cntrColStr) = '';
						sheetObj.SelectCell(row, cntrColStr);
					}
				}
			}
		}
	}
	
	switch(sheetObj.ColSaveName(col)){
		case "cgo_wgt":
			sheetObj.CellValue2(row, "cgo_wgt1") = roundXL(sheetObj.CellValue(row, col) * CNVT_CNST_KG_LB, 2);
			if (sheetObj.CellValue(row, "cgo_wgt1") >99999999.99) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));				
				sheetObj.CellValue2(row, "cgo_wgt") = "";
				sheetObj.SelectCell(row, "cgo_wgt");
			}
			break;
			
		case "cgo_wgt1":
			sheetObj.CellValue2(row, "cgo_wgt") = roundXL(sheetObj.CellValue(row, col) / CNVT_CNST_KG_LB, 2);
		
			break;
		
		case "cgo_meas":
			sheetObj.CellValue2(row, "cgo_meas1") = roundXL(sheetObj.CellValue(row, col) * CNVT_CNST_CBM_CFT, 3);
			if (sheetObj.CellValue(row, "cgo_meas1") > 999999.999999) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGMEAS'));
				sheetObj.CellValue2(row, "cgo_meas") = "";
				sheetObj.SelectCell(row, "cgo_meas");
			}
			break;
			
		case "cgo_meas1":
			sheetObj.CellValue2(row, "cgo_meas") = roundXL(sheetObj.CellValue(row, col) / CNVT_CNST_CBM_CFT, 3);
		
			break;
	}
}

function sumHblValue(){
	if(frm1.intg_bl_seq.value!=''){
		ajaxSendPost(getSumHblValue, 'reqVal', '&goWhere=aj&bcKey=sumHblValueSeaExp&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
	}		
}

function getSumHblValue(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			rtnArray = doc[1].split("^^");
			
			var grs_wgt = roundXL(parseFloat(rtnArray[0]), 2);
			var meas 	= roundXL(parseFloat(rtnArray[1]), 3);
			var pck_qty = roundXL(parseFloat(rtnArray[2]), 0);
			
			formObj.grs_wgt.value 	= grs_wgt;
			formObj.meas.value 		= meas;
			formObj.pck_qty.value 	= pck_qty;
			
			chkComma(formObj.grs_wgt,8,2);
			chkComma(formObj.meas,8,3);
			
			weightChange(formObj.grs_wgt);
			cbmChange(formObj.meas);
		}
	}
}

function test(){
	if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}
}

function checkTrdpCode(obj){
	
	/*if(obj.name=="prnr_trdp_nm"){
	}else if(obj.name=="shpr_trdp_nm"){
	}
	else*/ 
	if(obj.name=="cnee_trdp_nm"){
		if(frm1.cnee_trdp_cd.value==""){
			frm1.cnee_trdp_addr.value = obj.value;
		}
	}
	else if(obj.name=="ntfy_trdp_nm"){
		if(frm1.ntfy_trdp_cd.value==""){
			frm1.ntfy_trdp_addr.value = obj.value;
		}
	}
	/*else if(obj.name=="act_shpr_trdp_nm"){
	}
	else if(obj.name=="cust_trdp_nm"){
	}
	else if(obj.name=="lnr_trdp_nm"){
	}
	else if(obj.name=="carr_trdp_nm"){
	}
	else if(obj.name=="prnr_trdp_nm2"){
	}
	else if(obj.name=="iss_trdp_nm"){
	}else if(obj.name=="third_trdp_nm"){
	}*/
	
}

function getMblCheck(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP' && frm1.bl_no.value!=''){
				//Please check B/L no.! alert

				//B/L No. is duplicated. \nDo you want to create MBL?
				if(confirm(getLabel('FMS_COM_ALT008') + getLabel('FMS_COM_CFMCON'))){
	            	   gridAdd(0);
	            	   docObjects[0].CellValue(1, 1) = 1;
	            	   
	            	   //if(user_role_cd!="ADM"){
	            		   //save post date, office info
	            		   if(ofc_post_dt=="ETD"){
	            			   frm1.post_dt.value = frm1.etd_dt_tm.value;
	            		   }
	            		   else if(ofc_post_dt=="ETA"){
	            			   frm1.post_dt.value = frm1.eta_dt_tm.value;
	            		   }
	            	   //}
	            	   
	            	   doShowProcess();
	                   frm1.f_cmd.value = ADD;
	            	   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), false);
	        	   }
			}
			else if(doc[1]=='RV'){
				//Please check B/L no.!!
				alert(getLabel('FMS_COM_ALT007') + " /n- " + getLabel('FMS_COD_BLNO'));

			}else{
				//Do you want to create MBL?
				if(confirm(getLabel('FMS_COM_CFMSAV'))){
            	   gridAdd(0);
            	   docObjects[0].CellValue(1, 1) = 1;
            	   
            	   //if(user_role_cd!="ADM"){
            		   //save post date, office info
            		   if(ofc_post_dt=="ETD"){
            			   frm1.post_dt.value = frm1.etd_dt_tm.value;
            		   }
            		   else if(ofc_post_dt=="ETA"){
            			   frm1.post_dt.value = frm1.eta_dt_tm.value;
            		   }
            	   //}
            	   
            	   doShowProcess();
                   frm1.f_cmd.value = ADD;
            	   docObjects[0].DoAllSave("./SEE_BMD_0040GS.clt", FormQueryString(frm1)+getSndParam(), false);
        	   }			
			}
		}
	}
	else{
		//SEE_BMD_MSG43		
	}
}

function getRefNoCheck(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				refCheck = false;
				//Ref. No. is duplicate.
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_REFN'));
				
				frm1.ref_no.focus();
			}
			else{
				refCheck = true;
			}
		}
	}
	else{
		//SEE_BMD_MSG43
		refCheck = false;
	}
}

// Conatiner 마지막 Cell에서 Tab 이동하면 Rowadd 되는 기능 추가
function sheet4_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow == row && "cntr_rmk" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			gridAdd(2);
			sheetObj.SelectCell(sheetObj.LastRow, 0);
		}
	}

	switch (sheetObj.ColSaveName(col)) {
		case "cgo_pck_qty" :
		case "cgo_wgt" :
		case "cgo_wgt1" :
		case "cgo_meas" :
		case "cgo_meas1" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.CellValue2(row, col) = "";
				return;
			}
		break;
	}
}

function copyFromHBL(){
	if(frm1.intg_bl_seq.value!=''){
		ajaxSendPost(getHblDesc, 'reqVal', '&goWhere=aj&bcKey=getHblDesc&f_air_sea_clss_cd=S&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+frm1.ref_no.value, './GateServlet.gsl');
	}
}

function getHblDesc(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			frm1.desc_txt.value = doc[1];
		}
	}
	else{
		//SEE_BMD_MSG43
		refCheck = false;
	}
}

/**
 * HBL이 Confirm 또는 Closing 된 것이 있는지 확인후 삭제
 */
function doRmvSrInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		   if(doc[1]==0){
			   //invoice 생성 유무를 체크한다.
			   ajaxSendPost(checkBlInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckInv&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
    		   
			   if(isInvStsOk){
	        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
	                   frm1.f_cmd.value = REMOVE;
	            	   doShowProcess();
	            	   frm1.submit();
	        	   }
    		   }
    		   else{
    			   //You Cannot delete B/L. Because Invoice was already Issued.
    			   alert(getLabel('FMS_COM_ALT022'));
    		   }
    		   
//	     	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
//	               frm1.f_cmd.value = REMOVE;
//	        	   doShowProcess();
//	        	   frm1.submit();
//	    	   }				
		   }
		   else{
			   //Cannot delete, because some HAWB already confirmed or closing!
			   alert(getLabel('FMS_COM_ALT026'));
		   }
		}
	}
}

function checkBlInvReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			isInvStsOk = false;
		}
		else{
			isInvStsOk = true;
		}
	}
}

function cntrGridCopy(sheetObj){
	if(frm1.shp_mod_cd.value=="FCL"){
		var orgCnt = sheetObj.Rows;
		var intRows= orgCnt-1;
		
		if(intRows==0){
			cntrGridAdd(sheetObj);
		}
		else if(intRows<3 && typeof(sheetObj.CellValue(intRows, 'cntr_no'))=="undefined"){
			cntrGridAdd(sheetObj);
		}
		else{
			sheetObj.DataInsert(intRows);
			
//			sheetObj.CellValue2(orgCnt, 'cntr_no') 		= sheetObj.CellValue(orgCnt-1, 'cntr_no');
			sheetObj.CellValue2(orgCnt, 'cntr_tpsz_cd') = sheetObj.CellValue(orgCnt-1, 'cntr_tpsz_cd');
//			sheetObj.CellValue2(orgCnt, 'seal_no1') 	= sheetObj.CellValue(orgCnt-1, 'seal_no1');
//			sheetObj.CellValue2(orgCnt, 'seal_no2') 	= sheetObj.CellValue(orgCnt-1, 'seal_no2');
//			sheetObj.CellValue2(orgCnt, 'seal_no3') 	= sheetObj.CellValue(orgCnt-1, 'seal_no3');
			sheetObj.CellValue2(orgCnt, 'cgo_pck_qty') 	= sheetObj.CellValue(orgCnt-1, 'cgo_pck_qty');
			sheetObj.CellValue2(orgCnt, 'cgo_pck_ut') 	= sheetObj.CellValue(orgCnt-1, 'cgo_pck_ut');
			sheetObj.CellValue2(orgCnt, 'cgo_wgt') 		= sheetObj.CellValue(orgCnt-1, 'cgo_wgt');
			sheetObj.CellValue2(orgCnt, 'cgo_wgt1') 	= sheetObj.CellValue(orgCnt-1, 'cgo_wgt1');
			sheetObj.CellValue2(orgCnt, 'cgo_meas') 	= sheetObj.CellValue(orgCnt-1, 'cgo_meas');
			sheetObj.CellValue2(orgCnt, 'cgo_meas1') 	= sheetObj.CellValue(orgCnt-1, 'cgo_meas1');
			sheetObj.CellValue2(orgCnt, 'vol_meas') 	= sheetObj.CellValue(orgCnt-1, 'vol_meas');
			sheetObj.CellValue2(orgCnt, 'intg_bl_seq') 	= sheetObj.CellValue(orgCnt-1, 'intg_bl_seq');
		}
	}
}

/*
 *  2012.03.21 
 * Master Freight Tab 추가
 */

function getSdSheet(){
	return docObjects[4];
}

function getBcSheet(){
	return docObjects[5];
}

function getDcSheet(){
	return docObjects[6];
}

function sheet7_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, '');
}

function sheet7_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, '');
}

function sheet7_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'M');
}

function sheet7_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
		case "fr_qty" :
		case "fr_ru" :
		case "fr_trf_cur_sum_amt" :
		case "fr_vat_rt" :
		case "fr_vat_amt" :
		case "fr_inv_xcrt" :
		case "fr_inv_amt" :
		case "fr_inv_vat_amt" :
		case "fr_inv_sum_amt" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.CellValue2(row, col) = "";
				return;
			}
		break;
	}
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col, '', 'S', 'O', 'M');
}

function sheet7_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}

function sheet7_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('SD');
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}

function sheet7_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow == row && "fr_inv_sts_nm" == sheetObj.ColSaveName(col)){
			//gridAdd(4);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('ROWADD', docObjects[4], 'S', 'O', 'M');
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "fr_qty" :
		case "fr_ru" :
		case "fr_trf_cur_sum_amt" :
		case "fr_vat_rt" :
		case "fr_vat_amt" :
		case "fr_inv_xcrt" :
		case "fr_inv_amt" :
		case "fr_inv_vat_amt" :
		case "fr_inv_sum_amt" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.CellValue2(row, col) = "";
				return;
			}
		break;
	}
}


function sheet8_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, 'b_');
}

function sheet8_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'b_');
}

function sheet8_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'O', 'M');
}

function sheet8_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
		case "b_fr_qty" :
		case "b_fr_ru" :
		case "b_fr_trf_cur_sum_amt" :
		case "b_fr_vat_rt" :
		case "b_fr_vat_amt" :
		case "b_fr_inv_xcrt" :
		case "b_fr_inv_amt" :
		case "b_fr_inv_vat_amt" :
		case "b_fr_inv_sum_amt" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.CellValue2(row, col) = "";
				return;
			}
		break;
	}
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col,  'b_', 'S', 'O', 'M')
}

function sheet8_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
}

function sheet8_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('BC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
}

function sheet8_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="b_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'b_', 'S', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow == row && "b_fr_inv_sts_nm" == sheetObj.ColSaveName(col)){
			//gridAdd(5);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('BCROWADD', docObjects[5], 'S', 'O', 'M')
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "b_fr_qty" :
		case "b_fr_ru" :
		case "b_fr_trf_cur_sum_amt" :
		case "b_fr_vat_rt" :
		case "b_fr_vat_amt" :
		case "b_fr_inv_xcrt" :
		case "b_fr_inv_amt" :
		case "b_fr_inv_vat_amt" :
		case "b_fr_inv_sum_amt" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.CellValue2(row, col) = "";
				return;
			}
		break;
	}
}


function sheet9_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, 'dc_');
}

function sheet9_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'dc_');
}

function sheet9_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'M');
}

function sheet9_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
		case "dc_fr_qty" :
		case "dc_fr_ru" :
		case "dc_fr_agent_ru" :
		case "dc_fr_inv_xcrt" :
		case "dc_fr_inv_sum_amt" :
		case "dc_fr_agent_amt" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.CellValue2(row, col) = "";
				return;
			}
		break;
	}
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col,  'dc_', 'S', 'O', 'M');
}

function sheet9_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
}

function sheet9_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('DC');
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'dc_');
}

function sheet9_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="dc_fr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			mutiSheetOnPopupClick(sheetObj, row, col, 'dc_', 'S', 'O', 'M');
		}
	}
	if(keyCode==9){
		if(sheetObj.LastRow == row && "dc_fr_inv_sts_nm" == sheetObj.ColSaveName(col)){
			//gridAdd(6);
			//sheetObj.SelectCell(sheetObj.LastRow, 0);
			frtRowAdd('DCROWADD', docObjects[6], 'S', 'O', 'M');
		}
	}
	switch (sheetObj.ColSaveName(col)) {
		case "dc_fr_qty" :
		case "dc_fr_ru" :
		case "dc_fr_agent_ru" :
		case "dc_fr_inv_xcrt" :
		case "dc_fr_inv_sum_amt" :
		case "dc_fr_agent_amt" :
			if (keyCode == 189 || keyCode == 109) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.CellValue2(row, col) = "";
				return;
			}
		break;
	}
}


function sheet10_OnSearchEnd(sheetObj, row, col) {
	//Container Type Size 설정
	var TPSZCD1 = ' |';
	var TPSZCD2 = ' |';

	var totCnt = sheetObj.Rows;
	for(var i = 1; i < totCnt; i++){
		if(sheetObj.CellValue(i, 1)!=''){
			TPSZCD1+= sheetObj.CellValue(i, 0);
			TPSZCD1+= '|';

			TPSZCD2+= sheetObj.CellValue(i, 0);
			TPSZCD2+= '|';
		}
	}

	docObjects[4].InitDataCombo(0,10, TPSZCD1, TPSZCD2); //P/C
	docObjects[5].InitDataCombo(0,10, TPSZCD1, TPSZCD2); //P/C
	docObjects[6].InitDataCombo(0,10, TPSZCD1, TPSZCD2); //P/C
}

/**
* Container Sheet Object를 리턴함
*/
function getCrtrSheet(){
	return docObjects[7];
}


function goToInvoice(sheetObj, obj){
	switch(obj){
		case "LOCAL":
			var formObj  = document.frm1;
			
			if( frFrtCheckRow(sheetObj, "")){
				return;
			}
			
			var chkCnt				= 0;
			var chk_fr_trdp_cd		= "";
			var chk_fr_trdp_nm		= "";
			var chk_fr_inv_curr_cd	= "";
			var chk_fr_frt_seq		= "";

			for(var i = headerRowCnt; i < sheetObj.Rows; i++){
				if(sheetObj.CellValue(i, "fr_frt_check") == 1){
					chk_fr_trdp_cd		= 	sheetObj.CellValue(i, 'fr_trdp_cd');
					chk_fr_trdp_nm		= 	sheetObj.CellValue(i, 'fr_trdp_nm');
					chk_fr_inv_curr_cd	= 	sheetObj.CellValue(i, 'fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ", ";
					}
					chk_fr_frt_seq		+= 	sheetObj.CellValue(i, 'fr_frt_seq');
					chkCnt++;
				}
			}
			
			var param = "&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=S";
			param += "&f_biz_clss_cd=M";
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
			
		   	var paramStr = "./ACC_INV_0010.clt?f_cmd="+param;
		   	parent.mkNewFrame('A/R Entry', paramStr);
		
		   	break;
		   	
		case "AP":
			var formObj  = document.frm1;
			
			if( frFrtCheckRow(sheetObj, "b_")){
				return;
			}
			
			var chkCnt				= 0;
			var chk_fr_trdp_cd		= "";
			var chk_fr_trdp_nm		= "";
			var chk_fr_inv_curr_cd	= "";
			var chk_fr_frt_seq		= "";

			for(var i = headerRowCnt; i < sheetObj.Rows; i++){
				if(sheetObj.CellValue(i, "b_fr_frt_check") == 1){
					chk_fr_trdp_cd		= 	sheetObj.CellValue(i, 'b_fr_trdp_cd');
					chk_fr_trdp_nm		= 	sheetObj.CellValue(i, 'b_fr_trdp_nm');
					chk_fr_inv_curr_cd	= 	sheetObj.CellValue(i, 'b_fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ',';
					}
					chk_fr_frt_seq		+= 	sheetObj.CellValue(i, 'b_fr_frt_seq');
					chkCnt++;
				}
			}
			
			var param = "&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=S";
			param += "&f_biz_clss_cd=M";
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
			
		   	var paramStr = "./ACC_INV_0030.clt?f_cmd="+param;
		   	parent.mkNewFrame('A/P Entry(Cost)', paramStr);
		
		   	break;
		   	
		case "DC":
			var formObj  = document.frm1;
			
			if( frFrtCheckRow(sheetObj, "dc_")){
				return;
			}
			
			var chkCnt				= 0;
			var chk_fr_trdp_cd		= "";
			var chk_fr_trdp_nm		= "";
			var chk_fr_inv_curr_cd	= "";
			var chk_fr_frt_seq		= "";

			for(var i = headerRowCnt; i < sheetObj.Rows; i++){
				if(sheetObj.CellValue(i, "dc_fr_frt_check") == 1){
					chk_fr_trdp_cd		= 	sheetObj.CellValue(i, 'dc_fr_trdp_cd');
					chk_fr_trdp_nm		= 	sheetObj.CellValue(i, 'dc_fr_trdp_nm');
					chk_fr_inv_curr_cd	= 	sheetObj.CellValue(i, 'dc_fr_inv_curr_cd');
					if(chkCnt > 0){
						chk_fr_frt_seq += ',';
					}
					chk_fr_frt_seq		+= 	sheetObj.CellValue(i, 'dc_fr_frt_seq');
					chkCnt++;
				}
			}
			
			var param = "&f_intg_bl_seq=" + formObj.intg_bl_seq.value;
			param += "&s_bl_no=" + formObj.bl_no.value;
			param += "&f_bl_no=" + formObj.bl_no.value;
			param += "&f_air_sea_clss_cd=S";
			param += "&f_biz_clss_cd=M";
			param += "&f_bnd_clss_cd=O";
			param += "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
			param += "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
			param += "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
			param += "&chk_fr_frt_seq=" + chk_fr_frt_seq;
			
		   	var paramStr = "./ACC_INV_0020.clt?f_cmd="+param;
		   	parent.mkNewFrame('D/C Note Entry', paramStr);
		
		   	break;
	}
}

function goToInvoiceModify(obj){
	
	var arObj = docObjects[4];
	var apObj = docObjects[5];
	var dcObj = docObjects[6];
	
	switch(obj){
		case "LOCAL":
			if(arObj.CellValue(arObj.SelectRow, "fr_inv_seq")!=""){
				var param = "&f_inv_seq=" + arObj.CellValue(arObj.SelectRow, "fr_inv_seq");
				
				var paramStr = "./ACC_INV_0010.clt?f_cmd="+param;
				parent.mkNewFrame('A/R Entry', paramStr);
			}
		
			break;
			
		case "AP":
			if(apObj.CellValue(apObj.SelectRow, "b_fr_inv_seq")!=""){
				var param = "&f_inv_seq=" + apObj.CellValue(apObj.SelectRow, "b_fr_inv_seq");
				
				var paramStr = "./ACC_INV_0030.clt?f_cmd="+param;
				parent.mkNewFrame('A/P Entry(Cost)', paramStr);
			}
		
			break;
			
		case "DC":
			if(dcObj.CellValue(dcObj.SelectRow, "dc_fr_inv_seq")!=""){
				var param = "&f_inv_seq=" + dcObj.CellValue(dcObj.SelectRow, "dc_fr_inv_seq");
				
				var paramStr = "./ACC_INV_0020.clt?f_cmd="+param;
				parent.mkNewFrame('D/C Note Entry', paramStr);
			}
		
			break;
	}
}

function searchGrid(gridIdx){
	switch(gridIdx){
		case 6:
			//Freight될 Container 조회
			frm1.f_cmd.value = SEARCHLIST01;
			docObjects[7].DoSearch4Post("./SEE_FRT_0010GS.clt", FormQueryString(frm1));
		
		break;
		
		case 7:
			//Selling/Debit Freight 조회
			frm1.f_cmd.value = SEARCHLIST07;
			docObjects[4].DoSearch4Post("./SEE_BMD_0040_7GS.clt", FormQueryString(frm1));
		
			break;
			
		case 8:
			//Buying/Crebit List 조회
			frm1.f_cmd.value = SEARCHLIST08;
			docObjects[5].DoSearch4Post("./SEE_BMD_0040_8GS.clt", FormQueryString(frm1));
		
			break;
			
		case 9:
			//Debit/Crebit List 조회
			frm1.f_cmd.value = SEARCHLIST09;
			docObjects[6].DoSearch4Post("./SEE_BMD_0040_9GS.clt", FormQueryString(frm1));
		
			break;
	}
}

var mailTo = "";

function getMailTo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo = "";
		}
		else{
			mailTo = doc[1];
		}
	}
}

function setBillingCarrier(){
	var formObj = document.frm1;
	
	formObj.carr_trdp_cd.value = formObj.lnr_trdp_cd.value;
	formObj.carr_trdp_nm.value = formObj.lnr_trdp_nm.value;
}
