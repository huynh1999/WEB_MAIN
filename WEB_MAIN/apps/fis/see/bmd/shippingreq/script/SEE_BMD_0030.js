var tab3click = "";
var tab4click = "";

var hblListSheet = false;
var docListSheet = false;

//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	
	var hblListParam = docObjects[1].GetSaveString(false);
	var docListParam = docObjects[2].GetSaveString(false);
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
  return sheetParam;
}

function doWork(srcName){
    try {
        switch(srcName) {
           case "ADD":	//등록
               if(inpuValCheck()){
                   //전체 CellRow의 갯수
                   //'등록하시겠습니까?')){
            	   if(confirm(getLabel('FMS_COM_CFMSAV'))){
                       frm1.f_cmd.value = ADD;

                	   gridAdd(0);
                	   docObjects[0].CellValue(1, 1) = 1;

                	   doShowProcess();
                	   //docObjects[0].ShowDebugMsg = true;
                	   docObjects[0].DoAllSave("./SEE_BMD_0030GS.clt", FormQueryString(frm1)+getSndParam(), false);
                	   //docObjects[0].ShowDebugMsg = false;
                   }
               }
               
               break;
           
           case "PRINT":
        	   var param = 'intg_bl_seq=' + frm1.intg_bl_seq.value;
        	   param += '&cmd_type=6';
        	   param += '&sr_no=' + frm1.sr_no.value;
        	   
        	   popGET('RPT_PRN_0010.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
        	   
        	   break;
        	   
           case "MFPRINT":
        	   frm1.bl_no.value = trim(frm1.bl_no.value);
        	   if(frm1.bl_no.value==""){
        		   //조회를 하여야 출력 할 수 있습니다.
        		   alert(getLabel('FMS_COM_ALT010') + "\n\n: SEE_BMD_0030.62");
        		   
        		   return;
        	   }
        	   
        	   var param = 'title=Sea Consolidated Cargo Manifest';
        	   param += '&cmd_type=46';
        	   param += '&bl_no=' + frm1.bl_no.value;
        	   
        	   popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
           
        	   break;
           
           case "RWBLPRINT":
        	   frm1.sr_no.value = trim(frm1.sr_no.value);
        	   if(frm1.sr_no.value==""){
        		   //"S/R No.로 조회하여야 합니다.");
        		   alert(getLabel('FMS_COM_ALT010') + "\n\n: SEE_BMD_0030.78");
        		   
        		   return;
        	   }
        	   var param = 'title=RWBL INSTRUCTION FOR MULTI MODAL SHIPMENT';
        	   param += '&cmd_type=12';
        	   param += '&sr_no=' + frm1.sr_no.value;
        	   param += '&intg_bl_seq=' + frm1.intg_bl_seq.value;
        	   
        	   popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
           
        	   break;
        	   
           case "HBLADD":	//등록
        	   
        	   var keyYn = '';
        	   
        	   if(frm1.bl_sts_cd.value!='NA'){
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
	        	   var rtnArr   = rtnVal.split(';;');
	        	   var isBegin  = true;
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
	        					   } //가장빠른 Onboard 일자를 가지고 온다
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
								   if(frm1.intg_bl_seq.value==''){
									   shpAddr+= '\n';
									   shpAddr+= hblArr[29];
									   instObj.style.display = 'block';   
									   frm1.shpr_trdp_addr.value = shpAddr; 
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
	        		   if(blSeq!=''){
	        			   ajaxSendPost(autoMrkDesc, 'reqVal', '&goWhere=aj&bcKey=searchMrkDesc&intg_bl_seq='+blSeq, './GateServlet.gsl');
	        		   }
	        	   }
				   
				//	frm1.act_wgt.value    = hblArr[19];
				//	frm1.meas.value       = hblArr[21];
				//	frm1.pck_qty.value    = hblArr[23];
  
        	   }
       	  
        	   break;
       	   
           case "MODIFY":	//등록
               frm1.f_cmd.value = MODIFY;
               
               if(inpuValCheck()){
                   //전체 CellRow의 갯수
                   if(confirm(getLabel('FMS_COM_CFMSAV'))){
                	   
                	   gridAdd(0);
                	   docObjects[0].CellValue(1, 1) = 1;

                	   doShowProcess();
                	   //docObjects[0].ShowDebugMsg = true;
                	   docObjects[0].DoAllSave("./SEE_BMD_0030GS.clt", FormQueryString(frm1)+getSndParam(), false);
                	   //docObjects[0].ShowDebugMsg = false;
                   }
               }
           
               break;
           
           case "REMOVE":	//삭제
        	   //BL중에 Confirm이 된 건이 있는지 확인함.
    		   ajaxSendPost(doRmvSrInfo, 'reqVal', '&goWhere=aj&bcKey=getHblClsChk&biz_clss_cd=M&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');

           
    		   break;
           
           case "DOCFILE":	//첨부파일
        	   
        	   var 	reqParam = '?intg_bl_seq='+frm1.intg_bl_seq.value;
          			reqParam += '&openMean=SEARCH01';
          	   popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 450, "scroll:no;status:no;help:no;");
          	   
          	   break;
           
           case "SNDEML":	//Email전송
          		var reqParam = '?intg_bl_seq='+frm1.intg_bl_seq.value;
             		reqParam += '&openMean=SEARCH01';
         	   		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
       	   
         	   	break;
           
           case "SEARCHLIST":	//조회
        	   if(frm1.f_sr_no.value==''&&frm1.f_bl_no.value==''){
        		   alert(getLabel('FMS_COM_ALT014') + "\n\n: SEE_BMD_0030.366");
        		   return;
        	   }
        	   else{
                   frm1.f_cmd.value = SEARCHLIST;
            	   doShowProcess();
            	   frm1.submit();
        	   }
       	   
        	   break;
           
           case "SEARCHLIST01":	//조회
        	   if(frm1.intg_bl_seq.value!=''){
	        	   if(frm1.f_sr_no.value==''&&frm1.f_bl_no.value==''){
	        		   alert(getLabel('FMS_COM_ALT014') + "\n\n: SEE_BMD_0030.380");
	        		   return;
	        	   }
	        	   else{
	                   frm1.f_cmd.value = SEARCHLIST01;
	            	   //doShowProcess();
	            	   docObjects[1].DoSearch4Post("SEE_BMD_0030_1GS.clt", FormQueryString(frm1));
	        	   }
        	   }
           
        	   
        	   break;
           
           case "SEARCH_DOC":	//첨부문서 조회
        	   frm1.intg_bl_seq.value = trim(frm1.intg_bl_seq.value);
        	   if(frm1.intg_bl_seq.value!=''){
	        	   //Doccument File List 조회
		   	       frm1.f_cmd.value = SEARCHLIST02;
		   	 	   docObjects[2].DoSearch4Post("./SEE_BMD_0021_1GS.clt", FormQueryString(frm1));
        	   }	   	 	   
      	   
        	   break;
           
           case "SEARCH_CNTR":	//첨부문서 조회
        	   frm1.intg_bl_seq.value = trim(frm1.intg_bl_seq.value);
        	   if(frm1.intg_bl_seq.value!=''){
	   		      //Doccument File List 조회
	   	          frm1.f_cmd.value = SEARCHLIST03;
	   	 	      docObjects[3].DoSearch4Post("./SEE_BMD_0040_2GS.clt", FormQueryString(frm1));
        	   }	   	 	   
      	   
        	   break;      	   
           
           case "MKMBL":	//MBL생성
        	   frm1.bl_no.value = trim(frm1.bl_no.value);
               if(frm1.bl_no.value==''){
            	   //'MBL번호를 입력하시기 바랍니다!'); 
            	   alert(getLabel('FMS_COM_ALT006') + "\n\n: SEE_BMD_0030.414");
        	   }
               else{
        		   ajaxSendPost(getMblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_biz_clss_cd=M&f_bl_no='+frm1.bl_no.value, './GateServlet.gsl');
        	   }
           
               break;
        
        }
    }
    catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SEE_BMD_0030.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEE_BMD_0030.002"); 
        }
    }
}

var frmCall = -1;
/**
 * HBL에서 SR이동후 HBL목록을 조회함
 */
function doDispHBL_List(inHblSeq){
	if(inHblSeq!=''&&frm1.intg_bl_seq.value==''){
		frmCall = inHblSeq;
		docObjects[1].DoSearch4Post("./SEE_BMD_0030_1GS.clt", 'f_cmd='+SEARCHLIST03+'&f_hbl_bl_seq='+inHblSeq);
	}
}

/**
 * HBL 중복 여부를 확인함
 */
function getMblCheck(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				//동일한 BL번호가 사용되었습니다! 다시 입력하여 주십시오!
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: SEE_BMD_0030.457");
			}
			else if(doc[1]=='RV'){
				//입력이 불가능한 BL번호 입니다! 다시 입력하여 주십시오!
				alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: SEE_BMD_0030.457");
			}
			else{
				//MBL을 생성하시겠습니까?
				if(confirm(getLabel('FMS_COM_CFMCRE'))){
            	   gridAdd(0);
            	   docObjects[0].CellValue(1, 1) = 1;
            	   
            	   doShowProcess();
                   frm1.f_cmd.value = COMMAND01;
            	   docObjects[0].DoAllSave("./SEE_BMD_0030GS.clt", FormQueryString(frm1), false);
        	   }			
			}
		}
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
	     	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
	               frm1.f_cmd.value = REMOVE;
	        	   doShowProcess();
	        	   frm1.submit();
	    	   }				
		   }
		   else{
			   //Confirm 또는 Closing된 HBL이 있어 삭제가 불가능합니다!
			   alert(getLabel('FMS_COM_ALT026') + "\n\n: SEE_BMD_0030.497");
		   }
		}
	}
}

/**
 * S/R된 HBL을 선택적으로 삭제하는 경우
 */
function doRmvHblInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		   if(doc[1]!='HO'&&doc[1]!='HC'){
	     	   //'Do you want to delete this HBL?')){
			   if(confirm(getLabel('FMS_COM_CFMDEL'))){
	     		  ajaxSendPost(retriveHblList, 'reqVal', '&goWhere=aj&bcKey=getRmSrHbl&mbl_seq='+frm1.intg_bl_seq.value+'&intg_bl_seq='+curIntgSeq, './GateServlet.gsl');
	    	   }				
		   }
		   else{
			   if(doc[1]=='HO'){
				   //HBL이 Confirm 되어있어 삭제가 불가능합니다!
				   alert(getLabel('FMS_COM_ALT026') + "\n\n: SEE_BMD_0030.522");
			   }
			   else{
				   //HBL이 Closing 되어있어 삭제가 불가능합니다!
				   alert(getLabel('FMS_COM_ALT026') + "\n\n: SEE_BMD_0030.526");
			   }
		   }
		}
	}
}

/**
 * HBL삭제후 조회
 */
function retriveHblList(reqVal){
	doWork('SEARCHLIST01');
}

//코드표시 Ajax
function autoMrkDesc(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	
	var sheetObj4 = docObjects[4];
	
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split(';;');
			var rmkDescVal = rtnArr[0].split('@@^');
			frm1.mk_txt.value   = rmkDescVal[0];	//Mark
			frm1.desc_txt.value = rmkDescVal[1];	//Descritpion
		}
	}
}

/**
 * 화면초기화
 */
function clearScreen(){
	doShowProcess();
    frm1.f_cmd.value = '';
    frm1.submit();
}

/**
 * MBL Input시
 */
function doKeyInCheck(obj){
	if(obj.checked){
		//[MBL Crate]시 저장됩니다!
		alert(getLabel('FMS_COM_ALT015') + "\n\n: SEE_BMD_0030.576");
		
        frm1.bl_no.className = 'search_form';
        frm1.bl_no.readOnly  = false;
        frm1.bl_no.focus();
	}
	else{
		frm1.bl_no.value = '';
        frm1.bl_no.className = 'search_form-disable';
        frm1.bl_no.readOnly  = true;
        frm1.bl_no.focus();		
	}
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	
	if(frm1.intg_bl_seq.value==''){
		frmCall = -1;
		frm1.intg_bl_seq.value = docObjects[0].CellValue(1, "sv_intg_bl_seq");
		frm1.bl_sts_cd.value   = docObjects[0].CellValue(1, "sv_bl_sts_cd");
		frm1.sr_no.value       = docObjects[0].CellValue(1, "sv_sr_no");
		frm1.f_sr_no.value     = frm1.sr_no.value;
		frm1.f_bl_no.value     = docObjects[0].CellValue(1, "sv_bl_no");
		frm1.mbl_chk.value     = docObjects[0].CellValue(1, "sv_bl_no");
	}
	else if(frm1.f_bl_no.value==''){
		frm1.f_bl_no.value     = docObjects[0].CellValue(1, "sv_bl_no");
		frm1.mbl_chk.value     = docObjects[0].CellValue(1, "sv_bl_no");
		frm1.bl_sts_cd.value   = docObjects[0].CellValue(1, "sv_bl_sts_cd");
	}
	else{
		frm1.bl_sts_cd.value   = docObjects[0].CellValue(1, "sv_bl_sts_cd");
	}
	
	if(hblListSheet){
		doWork('SEARCHLIST01');		
	}
	
	if(docListSheet){
		doWork('SEARCH_DOC');
	}
	
	//버튼 초기화
	btnLoad();
}



/**
 * 화면에 기본값 Display
 */
function setDfltVal(hblArr){
	
	frm1.etd_dt_tm.value = hblArr[3];
	
	frm1.lnr_trdp_cd.value= hblArr[27];  
	frm1.lnr_trdp_nm.value= hblArr[28];  
	       
	frm1.pol_cd.value    = hblArr[6];       
	frm1.pol_nod_cd.value= hblArr[7];   
	frm1.pol_nm.value    = hblArr[8];       

	frm1.pod_cd.value    = hblArr[9];       
	frm1.pod_nod_cd.value= hblArr[10];   
	frm1.pod_nm.value    = hblArr[11];       

	frm1.del_cd.value    = hblArr[12];       
	frm1.del_nod_cd.value= hblArr[13];   
	frm1.del_nm.value    = hblArr[14];       

	frm1.trnk_vsl_nm.value  = hblArr[4];     
	frm1.trnk_voy.value  = hblArr[5];     
	
	frm1.grs_wgt.value    = hblArr[17];      
	frm1.grs_wgt_ut_cd.value= hblArr[18];

	frm1.act_wgt.value    = hblArr[19];      
	frm1.act_wgt_ut_cd.value= hblArr[20];

	frm1.meas.value       = hblArr[21];         
	frm1.meas_ut_cd.value = hblArr[22];   

	frm1.pck_qty.value    = hblArr[23];      
	frm1.pck_ut_cd.value  = hblArr[24];    
}

function gridAdd(objIdx){
	var intRows = docObjects[objIdx].Rows;
	intRows--;
	docObjects[objIdx].DataInsert(intRows);
}

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
            var cal = new calendarPopup();
            cal.select(formObj.etd_dt_tm, 'etd_dt_tm', 'yyyy-MM-dd');
       
            break;
            
        case 'DATE2':   //달력 조회 팝업 호출      
            var cal = new calendarPopup();
            cal.select(formObj.eta_dt_tm, 'eta_dt_tm', 'yyyy-MM-dd');
        
            break;    
            
        case 'DATE5':   //달력 조회 팝업 호출      
            var cal = new calendarPopup();
            cal.select(formObj.bl_iss_dt, 'bl_iss_dt', 'yyyy-MM-dd');
        
            break;
    }
}

/**
 * 파일목록 조회시. 3번째 Sheet를 리턴함.
 */
function getSelectedFiles(){
	return docObjects[2];
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

        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';

	    //스크롤을 하단으로 이동한다.
		document.body.scrollTop = document.body.scrollHeight;
	       
	//Mark Description 탭
    } else if( isNumSep == "02" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        document.all.Tab01.className = "tab_head_non-l";
        document.all.Tab02.className = "tab_head-l";
        document.all.Tab03.className = "tab_head_non-l";
        document.all.Tab04.className = "tab_head_non-l";
        
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "inline";
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        
        //스크롤을 하단으로 이동한다.
		document.body.scrollTop = document.body.scrollHeight;

	//Shipping Document 탭
    } 
    else if( isNumSep == "03" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        document.all.Tab01.className = "tab_head_non-l";
        document.all.Tab02.className = "tab_head_non-l";
        document.all.Tab03.className = "tab_head-l";
        document.all.Tab04.className = "tab_head_non-l";
        
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = 'inline';
        tabObjs[3].style.display = 'none';
        
        //스크롤을 하단으로 이동한다.
		document.body.scrollTop = document.body.scrollHeight;
        if(tab3click == ""){
        	tab3click = "Y";
        	doWork('SEARCH_DOC');
        }
        
    //Container List 목록
    }
    else if( isNumSep == "04" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        document.all.Tab01.className = "tab_head_non-l";
        document.all.Tab02.className = "tab_head_non-l";
        document.all.Tab03.className = "tab_head_non-l";
        document.all.Tab04.className = "tab_head-l";
              
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = "none";
        tabObjs[3].style.display = 'inline';
        
        //스크롤을 하단으로 이동한다.
		document.body.scrollTop = document.body.scrollHeight;
		
        if(tab4click == ""){
        	tab4click = "Y";
        	doWork('SEARCH_CNTR');
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
            InitColumnInfo(5, 0, 0, true);

            // 해더에서 처리할 수 있는 각종 기능을 설정한다
            InitHeadMode(true, true, true, true, false,false) ;
            
//			HEAD_TITLE = "STATUS|INTGBL|BKGNO|MBLNO|STATUS";
            
            //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
//            InitHeadRow(0, HEAD_TITLE, false);
            InitHeadRow(0, getLabel('SEE_BMD_0030_HDR1'), false);

            //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE,    SAVENAME,        KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
            InitDataProperty(0, 0,   dtHiddenStatus,   0,   daCenter,    false,    "ibflag");
            InitDataProperty(0, 1,   dtHidden,         0,   daCenter,    false,    "sv_intg_bl_seq");
            InitDataProperty(0, 2,   dtHidden,         0,   daCenter,    false,    "sv_sr_no");
            InitDataProperty(0, 3,   dtHidden,         0,   daCenter,    false,    "sv_bl_no");
            InitDataProperty(0, 4,   dtHidden,         0,   daCenter,    false,    "sv_bl_sts_cd");
		}
        break;
		case 2:     //HBL List
			with (sheetObj) {
                // 높이 설정
                style.height = 200;
                
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
                InitColumnInfo(33, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
                
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('SEE_BMD_HDR19'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,        KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, 0,  dtData,           40,   daCenter,  false,    "seq");
                InitDataProperty(0, 1,  dtData,          110,   daLeft,    false,    "hbl_bkg_no",          false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, 2,  dtData,          110,   daLeft,    false,    "hbl_bl_no",           false,      "",       dfNone,   0,     false,     false);
                
                InitDataProperty(0, 3,  dtData,          100,   daLeft,    false,    "hbl_act_shipper",     false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, 4,  dtData,          120,   daLeft,    false,    "hbl_trnk_vsl",        false,      "",       dfNone,   0,    false,     false);
                InitDataProperty(0, 5,  dtData,           60,   daLeft,    false,    "hbl_trnk_voy",        false,      "",       dfNone,   0,    false,     false);
                
                InitDataProperty(0, 6,  dtData,           70,   daCenter,  false,    "hbl_obrd_dt_tm",      false,      "",       dfDateYmd,0,     false,     false);
                InitDataProperty(0, 7,  dtData,           50,   daLeft,    false,    "hbl_pol_cd",          false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0, 8,  dtHidden,         50,   daLeft,    false,    "hbl_pol_nod_cd",      false,      "",       dfNone,   0,     false,     false);
				InitDataProperty(0, 9,  dtHidden,         50,   daLeft,    false,    "hbl_pol_nm",          false,      "",       dfNone,   0,     false,     false);			
							
				InitDataProperty(0,10,  dtData,           50,   daLeft,    false,    "hbl_pod_cd",          false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0,11,  dtHidden,         50,   daLeft,    false,    "hbl_pod_nod_cd",      false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0,12,  dtHidden,         50,   daLeft,    false,    "hbl_pod_nm",          false,      "",       dfNone,   0,     false,     false);

                InitDataProperty(0,13,  dtData,           50,   daLeft,    false,    "hbl_del_cd",          false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0,14,  dtHidden,         50,   daLeft,    false,    "hbl_del_nod_cd",      false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0,15,  dtHidden,         50,   daLeft,    false,    "hbl_del_nm",          false,      "",       dfNone,   0,     false,     false);

                InitDataProperty(0,16,  dtHidden,         50,   daLeft,    false,    "hbl_rep_cmdt_cd",     false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0,17,  dtHidden,         50,   daLeft,    false,    "hbl_rep_cmdt_nm",     false,      "",       dfNone,   0,     false,     false);
							
                InitDataProperty(0,18,  dtData,           80,   daRight,   false,    "hbl_grs_wgt",         false,      "",       dfNullFloat,   2,false,     false);
                InitDataProperty(0,19,  dtHidden,         80,   daRight,   false,    "hbl_grs_wgt_ut_cd",   false,      "",       dfNone,   0,     false,     false);
							
                InitDataProperty(0,20,  dtHidden,         80,   daRight,   false,    "hbl_act_wgt",         false,      "",       dfNullFloat,   2,false,     false);
                InitDataProperty(0,21,  dtHidden,         80,   daRight,   false,    "hbl_act_wgt_ut_cd",   false,      "",       dfNone,   0,     false,     false);

                InitDataProperty(0,22,  dtData,           80,   daRight,   false,    "hbl_meas",            false,      "",       dfNullFloat,   4,false,     false);
                InitDataProperty(0,23,  dtHidden,         80,   daRight,   false,    "hbl_meas_ut_cd",      false,      "",       dfNone,   0,     false,     false);
							
                InitDataProperty(0,24,  dtData,           80,   daRight,   false,    "hbl_pck_qty",         false,      "",       dfNullFloat,   2,false,     false);
                InitDataProperty(0,25,  dtHidden,         60,   daLeft,    false,    "hbl_pck_ut_cd",       false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0,26,  dtData,           60,   daLeft,    false,    "hbl_pck_ut_nm",       false,      "",       dfNone,   0,     false,     false);
							
                InitDataProperty(0,27,  dtHidden,          0,   daCenter,  false,    "hbl_intg_bl_seq");
                InitDataProperty(0,28,  dtHiddenStatus ,   0,   daCenter,  false,    "hbl_ibflag");
                
                InitDataProperty(0,29,  dtHidden,          0,   daCenter,  false,    "hbl_lnr_trdp_cd");
                InitDataProperty(0,30,  dtHidden,          0,   daCenter,  false,    "hbl_lnr_trdp_nm");
                
                InitDataProperty(0,31,  dtHidden,          0,   daCenter,  false,    "hbl_shpr_trdp_nm");
                InitDataProperty(0,32,  dtImage,          20,   daCenter,  false,    "del_icon");
                
                ImageList(0) = APP_PATH+"/web/img/main/trash.gif";
                InitDataImage(0, 'del_icon', daCenter);
		        sheetObj.DataLinkMouse("del_icon")= true;

           }                                                      
	    break;
	    case 3:					//첨부파일
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
	            InitColumnInfo(12, 0, 0, true);
	
	            // 해더에서 처리할 수 있는 각종 기능을 설정한다
	            InitHeadMode(true, true, true, true, false,false) ;
	            
//	            HEAD_TITLE = "doc_ibflag|Del|Sel.|palt_doc_seq|Doc. Kind|File Name|Ref. No.|File|PDF|palt_doc_rmk|Creation DT|intg_bl_seq";
	            
	            //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
//	            InitHeadRow(0, HEAD_TITLE, false);
	            InitHeadRow(0, getLabel('SEE_BMD_0030_HDR3'), false);
	
	            //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    	KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
	            InitDataProperty(0,  0,  dtHiddenStatus,    40,   daCenter,  false,    "doc_ibflag");
	            InitDataProperty(0,  1,  dtDelCheck,       	40,   daCenter,  false,    "Del",	 			false,      "",       dfNone,      0,     		true,       true);
	            InitDataProperty(0,  2,  dtCheckBox,       	40,   daCenter,  false,    "palt_check",	 	false,      "",       dfNone,      0,     		true,       true);
	            InitDataProperty(0,  3,  dtHidden,         100,   daLeft,    false,    "palt_doc_seq",	 	false,      "",       dfNone,      0,     		false,      false);
	            InitDataProperty(0,  4,  dtHidden,           0,   daLeft,    false,    "palt_doc_tp_cd",	false,      "",       dfNone,      0,     		false,      false);

	            InitDataProperty(0,  5,  dtData,           200,   daLeft,    false,    "palt_doc_nm",	 	false,      "",       dfNone,      0,     		false,      false);
	            InitDataProperty(0,  6,  dtData,       	   100,   daLeft,    false,    "palt_doc_no",	 	false,      "",       dfNone,      0,     		false,      false);
	            InitDataProperty(0,  7,  dtImageText,       50,   daCenter,  false,    "palt_doc_img_url",	false,      "",       dfNone,      0,     		false,      false);
	            InitDataProperty(0,  8,  dtImageText,       50,   daCenter,  false,    "palt_doc_pdf_url",	false,      "",       dfNone,      0,     		false,      false);
	            
	            InitDataProperty(0,  9,  dtHidden,         320,   daLeft,    false,    "palt_doc_rmk",		false,      "",       dfNone,      0,     		false,      false);
	            InitDataProperty(0, 10,  dtData,           100,   daCenter,  false,    "rgst_tms",			false,      "",       dfDateYmd,      0,     	false,      false);
	            InitDataProperty(0, 11,  dtHidden,           0,   daCenter,  false,    "intg_bl_seq_d",		false,      "",       dfNone,      0,     		false,      false);
				
				ImageList(0) = APP_PATH+"/web/img/button/bt_img.gif";
		        ImageList(1) = APP_PATH+"/web/img/button/bt_pdf.gif";
		        
		        InitDataImage(0, 7, daCenter);
		        InitDataImage(0, 8, daCenter);
		        
		        sheetObj.DataLinkMouse("palt_doc_nm")= true;
		        sheetObj.DataLinkMouse("palt_doc_img_url")= true;
		        sheetObj.DataLinkMouse("palt_doc_pdf_url")= true;
	       }                                                      
	   break;
	   case 4:		//Container List 그리드
			with (sheetObj) {
                // 높이 설정
                style.height = 380;
                
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
                Editable = false;

                //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
                InitRowInfo( 1, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(21, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;

                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('SEE_BMD_HDR10'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE,    SAVENAME,        KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0,  0,  dtData,          40,   daCenter,    false,    "Seq",        		false,      "",       dfNone,      0,     		false,      false);
                InitDataProperty(0,  1,  dtData,         120,   daLeft,      true,    "hblNo",        		false,      "",       dfNone,      0,     		false,      false);

				InitDataProperty(0,  2,  dtData,         70,   daCenter,     false,    "soc_flg",           false,      "",       dfNone,      0,     		true,      true);
                InitDataProperty(0,  3,  dtData,        100,   daLeft,       false,    "cntr_no",           false,      "",       dfNone,      0,     		true,      true,  14);
				InitDataProperty(0,  4,  dtData,         80,   daLeft,       false,    "cntr_tpsz_cd",      false,      "",       dfNone,      0,     		true,      true);
				
				InitDataProperty(0,  5,  dtData,          60,   daLeft,      false,    "seal_no1",          false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0,  6,  dtData,          60,   daLeft,      false,    "seal_no2",          false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0,  7,  dtData,          60,   daLeft,      false,    "seal_no3",          false,      "",       dfNone,      0,     		true,      true);
				
				InitDataProperty(0,  8,  dtData,          40,   daRight,     false,    "cgo_pck_qty",       false,      "",       dfInteger,   0,     		true,      true);
				InitDataProperty(0,  9,  dtData,          40,   daLeft,      false,    "cgo_pck_ut",        false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0, 10,  dtData,          60,   daRight,     false,    "cgo_wgt",         	false,      "",       dfFloat,     2,     		true,      true);
				InitDataProperty(0, 11,  dtData,          60,   daRight,     false,    "cgo_meas",          false,      "",       dfFloat,     3,     		true,      true);
				InitDataProperty(0, 12,  dtData,          60,   daRight,     false,    "vol_meas",         	false,      "",       dfFloat,     2,     		true,      true);
				
				InitDataProperty(0, 13,  dtData,          50,   daCenter,    false,    "cntr_sprl_trdp_cd", false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0, 14,  dtData,         100,   daLeft,      false,    "cntr_sprl_trdp_nm", false,      "",       dfNone,      0,     		true,      true);

				InitDataProperty(0, 15,  dtData,          50,   daCenter,    false,    "dg_gds_flg",        false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0, 16,  dtData,          80,   daLeft,      false,    "cntr_rmk",         	false,      "",       dfNone,      0,     		true,      true);
				
				InitDataProperty(0, 17,  dtHidden,         0,   daCenter,    false,    "intg_bl_seq",       false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0, 18,  dtHidden,         0,   daCenter,    false,    "cntr_list_seq",     false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0, 19,  dtHidden,         0,   daCenter,    false,    "vol_tot",     		false,      "",       dfNone,      0,     		true,      true);
				InitDataProperty(0, 20,  dtHidden,         0,   daCenter,    false,    "rgst_cntr_yn",     	false,      "",       dfNone,      0,     		true,      true);
            }                                                      
		
			break;
    }
}

/**
 * HBL목록 조회완료시
 */
function sheet2_OnSearchEnd(sheetObj) {
	
	//HBL에서 호출된 경우
	if(frmCall>0){
		var totRow = docObjects[1].rows;
		for(var i = 1; i < totRow; i++){
			if(docObjects[1].CellValue(i, 'hbl_intg_bl_seq')!=''){
				docObjects[1].CellValue(i, 'hbl_ibflag') = 'U';
			}
		}
	}
}

var curIntgSeq = 0;
/**
 * 삭제시
 */
function sheet2_OnClick(sheetObj, Row, Col){
	curIntgSeq = 0;

	var hblNo = sheetObj.CellValue(Row, 'hbl_bl_no');
	
	if(frm1.intg_bl_seq.value!=''&&sheetObj.ColSaveName(Col)=='del_icon'&&hblNo!=''){
		
		if(sheetObj.Rows>2){
			curIntgSeq = sheetObj.CellValue(Row, 'hbl_intg_bl_seq');
			
	 	   	//BL중에 Confirm이 된 건이 있는지 확인함.
			ajaxSendPost(doRmvHblInfo, 'reqVal', '&goWhere=aj&bcKey=getHblClsChk&biz_clss_cd=H&intg_bl_seq='+curIntgSeq, './GateServlet.gsl');
		}
		else{
			//최소한 한 건의 HBL이 필요합니다!
			alert(getLabel('FMS_COM_ALT004')+ "\n\n: SEE_BMD_0030.1125");
		}
	}
}

/**
 * HBL표시
 */
function sheet2_OnDblClick(sheetObj, Row, Col){
	var hblNo = sheetObj.CellValue(Row, 'hbl_bl_no');
	
	if(sheetObj.ColSaveName(Col)!='del_icon'&&hblNo!=''){
	   	var paramStr = "./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+hblNo;
	   	parent.mkNewFrame('Booking & HBL', paramStr);
	}
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
        	if(sheetObj.CellImage(Row, "palt_doc_pdf_url")==0){
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
function inpuValCheck(){
	var isOk = true;
	
	//Booking 시
	if(checkInputVal(frm1.shpr_trdp_cd.value, 6, 7, "T", 'Shipper CODE')!='O'){
		isOk = false;
		moveTab('01');
		frm1.shpr_trdp_cd.focus();
		
	}else if(checkInputVal(frm1.shpr_trdp_nm.value, 2, 50, "T", 'Shipper Name')!='O'){
		isOk = false;
		moveTab('01');
		frm1.shpr_trdp_nm.focus();

	}else if(checkInputVal(frm1.shpr_trdp_nm.value, 0, 50, "T", 'Shipper Name')!='O'){
		isOk = false;
		moveTab('01');
		frm1.shpr_trdp_nm.focus();
		
	}else if(checkInputVal(frm1.shpr_trdp_addr.value, 0, 400, "T", 'Shipper Address')!='O'){
		isOk = false;
		moveTab('01');
		frm1.shpr_trdp_addr.focus();		
		
	}else if(checkInputVal(frm1.cnee_trdp_nm.value,    2,  50, "T", 'Consignee Name')!='O'){
		isOk = false;
		moveTab('01');
		frm1.cnee_trdp_nm.focus();
		
	}else if(checkInputVal(frm1.cnee_trdp_addr.value, 0, 400, "T", 'Consignee Address')!='O'){
		isOk = false;
		moveTab('01');
		frm1.cnee_trdp_addr.focus();
		
	}else if(checkInputVal(frm1.ntfy_trdp_nm.value,    0, 50, "T", 'Notify Name')!='O'){
		isOk = false;
		moveTab('01');
		frm1.ntfy_trdp_nm.focus();
		
	}else if(checkInputVal(frm1.ntfy_trdp_addr.value, 0, 400, "T", 'Notify Address')!='O'){
		isOk = false;
		moveTab('01');
		frm1.ntfy_trdp_addr.focus();
		
		
	}else if(checkInputVal(frm1.lnr_trdp_cd.value, 6, 7, "T", 'Liner Code')!='O'){
		isOk = false;
		moveTab('01');
		frm1.lnr_trdp_cd.focus();
		
	}else if(checkInputVal(frm1.lnr_trdp_nm.value, 2, 50, "T", 'Liner')!='O'){
		isOk = false;
		moveTab('01');
		frm1.lnr_trdp_nm.focus();
		
	}else if(checkInputVal(frm1.lnr_trdp_pic.value, 0, 50, "T", 'Liner PIC')!='O'){
		isOk = false;
		moveTab('01');
		frm1.lnr_trdp_pic.focus();		
		
	}else if(checkInputVal(frm1.trnk_vsl_nm.value, 2, 100, "T", 'Vessel Name')!='O'){
		isOk = false;
		moveTab('01');
		frm1.trnk_vsl_nm.focus();
		
	}else if(checkInputVal(frm1.trnk_voy.value, 3, 8, "T", 'Voyage')!='O'){
		isOk = false;
		moveTab('01');
		frm1.trnk_voy.focus();

	}else if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "D", 'ETD')!='O'){
		isOk = false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
		
	}else if(checkInputVal(frm1.pol_cd.value, 5, 6, "T", 'POL Code')!='O'){
		isOk = false;
		moveTab('01');
		frm1.pol_cd.focus();
		
	}else if(checkInputVal(frm1.pod_cd.value, 5, 6, "T", 'POD Code')!='O'){
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
		
	}else if(checkInputVal(frm1.act_wgt.value, 0, 8, "N", 'A/Weight')!='O'){
		isOk = false;
		moveTab('01');
		frm1.act_wgt.focus();	
		
	}else if(checkInputVal(frm1.meas.value, 0, 8, "N", 'Measurement')!='O'){
		isOk = false;
		moveTab('01');
		frm1.meas.focus();	

	}else if(checkInputVal(frm1.iss_loc_cd.value, 5, 6, "T", 'Issue Location')!='O'){
		moveTab('01');
		frm1.iss_loc_cd.focus();
		isOk = false;
		
	}else if(checkInputVal(frm1.pay_loc_cd.value, 5, 6, "T", 'Payable Location')!='O'){
		moveTab('01');
		frm1.pay_loc_cd.focus();
		isOk = false;

	}else if(checkInputVal(frm1.bl_iss_dt.value, 10, 10, "D", 'Issued Date')!='O'){
		moveTab('01');
		frm1.bl_iss_dt.focus();
		isOk = false;
		
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
	
	return isOk;
}
