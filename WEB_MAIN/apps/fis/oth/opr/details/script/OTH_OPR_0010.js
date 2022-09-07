var rtnary=new Array(2);
var callBackFunc = "";
var TODAY;
var isInvStsOk=false;
var isPdOrdStsOk=false;
var vOthSalesModiTms;
var creditOver = false;
var onKeyDownFlg = true;
var creditOver_flg = false;

//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
var TP_OVER_AMT_FLG = ""; 
function doWork(srcName) {
	
	// #1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
	setSaveConfirmMsg(srcName);
	
	if(!btnGetVisible(srcName)){
		return;
	}
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var formObj=document.frm1;
	switch (srcName) {
		case "NEW":
			//clearAll();
			// #2084 - [PATENT] NEW 버튼 Confirm 메시지 추가
    		if(confirm(getLabel('FMS_COM_CFMNEW'))){
				doShowProcess();
				
				var currLocUrl=this.location.href;
				currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
				currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
				//parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
		        //#3779 [CLT] v4.7.0 entry화면 new 버튼 클릭 시 tab 제목
		        setTabTitle(pageName);				
				window.location.href = currLocUrl;
    		}
	        break;
		case "ROWADD":
			var intRows=sheetObj2.LastRow()+1;
			sheetObj2.DataInsert(intRows);
		break;
		case "SELECT":
			formObj.f_cmd.value=SEARCH;
			formObj.action="OTH_OPR_0010.clt";
	    	formObj.submit();
		break;
		case "SEARCHLIST":
			//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
			//조회
			chkOthSalesModiTms("VIEW");
			formObj.f_cmd.value=SEARCHLIST;
			sheetObj2.DoSearch("OTH_OPR_0011GS.clt", FormQueryString(formObj) );
		break;
		case "REMOVE":
			
	     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정 
	     	if(!chkOthSalesModiTms(srcName)){
	     	   return;
	     	}			
			
			ajaxSendPost(checkOthInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckOthInv&oth_seq='+formObj.oth_seq.value, './GateServlet.gsl');
		   	if(isInvStsOk){
		   		
		   		// wo 생성 유무를 체크한다.
		     	ajaxSendPost(checkBlPdOrd, 'reqVal', '&goWhere=aj&bcKey=getCheckPdOrd&oth_seq='+formObj.oth_seq.value, './GateServlet.gsl');
		     	if(isPdOrdStsOk){
	     	      alert(getLabel('FMS_COM_ALT113'));
	     	      return;
		     	}
		   		
				if (confirm(getLabel('FMS_COM_CFMDEL'))) {
					formObj.f_cmd.value=REMOVE;
					formObj.action="OTH_OPR_0010.clt";
			    	formObj.submit();
				}
		   	 }else{
		   	 		alert(getLabel('FMS_COM_ALT022'));
		   	 }
		break;
		case "MODIFY"://저장
			//OFVFOUR-7919 [BNX-TOR] Question for total profit amount
			if(saleType == "Y" && frm1.nomi_flg.value == "B"){
				alert(getLabel('COM_FRT_CFM011'));
				return;
			}
			
          //#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
          if(edob_flg =='N'){
            if(ofc_cd != frm1.ofc_cd.value){
              alert(getLabel('SEA_COM_ALT042')+'\n\n' + 'B/L Office: ' + frm1.ofc_cd.value + ', Your Office: ' + ofc_cd);
              frm1.ofc_cd.focus();
              return;
            }
          }       
          			
			creditRoleCheck();
			
			// #553 EDIT BL WITH OVERLIMITED TP 
     	   	if (creditOver && frm1.credit_flg.value =="N") {
     	   		//Selected trade partner has exceed its credit limit. 
        		//You are not authorized issue any document(s) when credit limit is exceeded. 
        		//Please update trade partner’s credit limit or have authorized user issue the document(s).
     	   		alert(getLabel('COM_FRT_CFM009'));
     	   		return;
     	   	}
     	   	//OFVFOUR-7707[Matrix] Restriction to block creating HBL in case the credit of customer exceeds credit limit
     		var s_type = "trdpCode";
    	    var s_code =frm1.cust_cd.value;
        	if (frm1.f_credit_flg.value == "Y") {
        	    ajaxSendPost(chkCusCredit, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
        	    if (creditOver_flg ) {
        	        alert(getLabel('COM_FRT_CFM010'));
        	        return;
        	    }
        	}
			// 필수값 check
			if(checkAll()){
				// #48893 - [BINEX] OPEN Invoice 관련 - MB/L 공백제거 
		     	frm1.ref_no.value=trim(frm1.ref_no.value);
		     	frm1.mbl_no.value=trim(frm1.mbl_no.value);
		     	frm1.hbl_no.value=trim(frm1.hbl_no.value);
		     	frm1.old_ref_no.value=trim(frm1.old_ref_no.value);
		     	
		     	if(frm1.ref_no.value == "AUTO"){						
	      			frm1.ref_no.value = "";	          			
			    } 
		     	
		     	// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정 
		     	if(!chkOthSalesModiTms(srcName)){
		     	   return;
		     	}
		     	
    	     	/* #428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED */
    	     	/* O04 롤코드가 있으면 수정가능 or 롤코드가 없을땐 인보이스가 없을때 수정가능  (ref_no) */
    	     	if(!chkRoleOthInv(frm1.ref_no.value)){
    	     		return;
    	     	}		     	
		     	   
    	     	//#1600 [STARWAY] MISC. OPERATION ENTRY, MBL, HBL, CONTAINER # DUPLICATE VALIDATION
//				if (confirm(getLabel(saveMsg))) {
					
					blDupFlag = false;
					
					if (frm1.oth_seq.value == ""){
						frm1.save_sts_flg.value="I";
						ajaxSendPost(checkBlDup, "reqVal", "&goWhere=aj&bcKey=checkBlDup&mbl_no="+frm1.mbl_no.value + "&hbl_no="+frm1.hbl_no.value, "./GateServlet.gsl");
					} else {
						frm1.save_sts_flg.value="U";
						
						if (confirm(getLabel(saveMsg))) {
							blDupFlag = false;
						}else{
							blDupFlag = true;
						}
					}
					
					if(!blDupFlag){
						formObj.f_cmd.value=MODIFY;
						formObj.pck_qty.value=removeComma(formObj.pck_qty.value);
						formObj.grs_wgt_l.value=removeComma(formObj.grs_wgt_l.value);
						formObj.grs_wgt_k.value=removeComma(formObj.grs_wgt_k.value);
						formObj.meas_m.value=removeComma(formObj.meas_m.value);
						formObj.meas_f.value=removeComma(formObj.meas_f.value);
						var intRows=sheetObj.LastRow() + 1;
				        sheetObj.DataInsert(intRows);
						var sht2=sheetObj2.GetSaveString(false);
						sheetObj.DoAllSave("./OTH_OPR_0010GS.clt", FormQueryString(formObj)+'&'+sht2, true);
					}
//				}
			}
		break;
		case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
//	   		rtnary[1]=formObj.cust_nm.value;
			rtnary[1]="";
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	    
		break;
		case "CUSTOMER_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
	   		rtnary[1]=formObj.cust_nm.value;
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	    
		break;
		case "PICKUP_LOC_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
//	   		rtnary[1]=formObj.pu_loc_nm.value;
			rtnary[1]="";
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "PICKUP_LOC_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break;
		case "PICKUP_LOC_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
	   		rtnary[1]=formObj.pu_loc_nm.value;
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "PICKUP_LOC_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break;
		case "DOOR_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
//	   		rtnary[1]=formObj.door_loc_nm.value;
			rtnary[1]="";
	   		rtnary[2]=window;
  	        callBackFunc = "DOOR_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
		break;
		case "DOOR_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
	   		rtnary[1]=formObj.door_loc_nm.value;
	   		rtnary[2]=window;
  	        callBackFunc = "DOOR_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
		break;
		
        case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(1);
	   		rtnary[0]="1";
	        callBackFunc = "COMMODITY_POPLIST";
	        modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
	        
        break;
        case "COMMODITY_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=formObj.cmdt_nm.value;
	        callBackFunc = "COMMODITY_POPLIST";
	        modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
	        
        break;
        
		case "PACKAGE_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="1";
			var rtnVal= ComOpenWindow('./CMM_POP_0120.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px", true);
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				return;
			} else {
				var rtnValAry=rtnVal.split("|");
				frm1.pck_ut_cd.value=rtnValAry[0];
			}
		break;
		
   	 	case "SNDEML":	//Email전송
    		var reqParam='?intg_bl_seq='+frm1.ref_no.value;
       		reqParam += '&openMean=SEARCH01';
   	   		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
   	    break;
   	 	case "SEARCHLIST03":
   	 		if(frm1.ref_no.value!=""){
   	 			frm1.f_cmd.value=SEARCHLIST03;
   	 			docObjects[2].DoSearch("./OTH_OPR_0010_1GS.clt", FormQueryString(frm1) );
				//#6359 [FFN] Local Transport internal memo (Zen#2308)
   	 			//frm1.memo_txt.value="";
   	 		}
	 	break;
	 	
	 	  
		case "SHIPPER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
			rtnary[1]="";
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "SHIPPER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	    
		break;
		case "SHIPPER_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
	   		rtnary[1]=formObj.shpr_nm.value;
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "SHIPPER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	    
		break; 	  
		
	 	  
		case "CONSIGNEE_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
			rtnary[1]="";
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "CONSIGNEE_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	    
		break;
		case "CONSIGNEE_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
	   		rtnary[1]=formObj.cnee_nm.value;
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "CONSIGNEE_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	    
		break; 	  		
		
		case "FILE_LABEL":
			 var param = "";
    			var formObj=document.frm1;
			var oth_seq=frm1.oth_seq.value;
     			if(oth_seq != ""){
    			//alert(oth_seq);
    			formObj.file_name.value = 'file_label_01_oth_UFF.mrd';
    			formObj.title.value='File Label';
    			// Parameter Setting
    			
			param += '[' + oth_seq + ']'; // $1
    			formObj.rd_param.value=param;
    			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);

     			}else {
     				//Please select the row to print.
     				alert(getLabel('FMS_COM_ALT004'));
     		
     				return;
     			}           		
         		
          	break; 	
		
		
	   /* #20552 : [ADVC] Other Operation 에 Copy 기능 추가, jsjang 2013.10.24 */
       case "COPY":	//조회
 	   if(confirm(getLabel('FMS_COM_CFMCPY'))){
            frm1.f_cmd.value=COMMAND05;
     	    //doShowProcess();
			formObj.action="OTH_OPR_0010.clt";
	    	formObj.submit();
 	   }
  	 	break;
  	 	case "GOTOACCT":
			var ref_no  = formObj.ref_no.value;
			var oth_seq = formObj.oth_seq.value;
			
			var paramStr = "./ACC_INV_0040.clt?f_cmd=-1&f_ref_no="+ref_no+"&s_oth_seq="+oth_seq;
			paramStr+= "&refType=othRefNo";
			
			//#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : Link시 검색기간 제외 조회 옵션처리
			paramStr+= "&linkOpt=KEY";
			
	        parent.mkNewFrame('Invoice List', paramStr);
	
		break;
		
		
		case "INSTRUCTION":
			if(formObj.oth_seq.value == ''){
				//There is no data
				alert(getLabel('FMS_COM_ALT158'));	
			}else{
				var paramStr="";
				paramStr += "./AIC_WOM_0018.clt?f_cmd=-1";
				paramStr += "&s_type=G"; // Other 에서 Pickup 호출할때 G , BL에서 호출시 B
				paramStr += "&s_seq=" + formObj.oth_seq.value; // Other Seq
				paramStr += '&air_sea_clss_cd='; 
				paramStr += '&bnd_clss_cd=G';
				paramStr += '&biz_clss_cd=';
				parent.mkNewFrame('Pickup Delivery Instruction', paramStr);
			}
		break;		
		
 	   break;	 	
	}
}

function LOCATION_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		frm1.pod_cd.value=rtnValAry[0];// loc_cd
		frm1.pod_nod_cd.value=rtnValAry[1];// nod_cd
		frm1.pod_nm.value=rtnValAry[2];// loc_nm
	}
}

function USER_POPLIST2(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.opr_usrid.value=rtnValAry[0];
	}
	//OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN
	ajaxSendPost(setUserTeamInfo, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=opr_team&issued_by="+frm1.opr_usrid.value, "./GateServlet.gsl");
}

function OFFICE_GRID_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(cur_curObj.id == "ctrbOfc"){
			formObj.ctrb_ofc_cd.value=rtnValAry[0];
		}else{
			formObj.sls_ofc_cd.value=rtnValAry[0];
		}
	}
}

function USER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.sls_usrid.value=rtnValAry[0];
	}
}

function DOOR_POPLIST(rtnVal){
  	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.door_loc_cd.value=rtnValAry[0];//full_nm
		formObj.door_loc_nm.value=rtnValAry[2];//full_nm
	}  
}

function PICKUP_LOC_POPLIST(rtnVal){
  	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.pu_loc_cd.value=rtnValAry[0];//full_nm
		formObj.pu_loc_nm.value=rtnValAry[2];//full_nm
	}
}

function F_DEST_DATE(rtnVal){
	if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		frm1.fnl_dest_loc_cd.value=rtnValAry[0];
		frm1.fnl_dest_loc_nm.value=rtnValAry[2];
	}
}

function POL_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		frm1.pol_cd.value=rtnValAry[0];// loc_cd
		frm1.pol_nod_cd.value=rtnValAry[1];// nod_cd
		frm1.pol_nm.value=rtnValAry[2];// loc_nm
	}
}

function POD_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		frm1.pod_cd.value=rtnValAry[0];// loc_cd
		frm1.pod_nod_cd.value=rtnValAry[1];// nod_cd
		frm1.pod_nm.value=rtnValAry[2];// loc_nm
	}
}


function COMMODITY_POPLIST(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.cmdt_cd.value=rtnValAry[0];
		formObj.cmdt_nm.value=rtnValAry[2];
	}
}

function CUSTOMER_POPLIST(rtnVal){
  	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
		var opt_key_sec = "TP_OVER_AMT_FLG";
		ajaxSendPost(setOverAmtCurrFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
		
		if(rtnValAry[13] == 'KO'){
			alert(getLabel('COM_FRT_ALT015'));
			formObj.cust_cd.value="";//trdp_cd
			formObj.cust_nm.value="";//full_nm
			return;
			
		} else if(rtnValAry[13] == 'CR'){

			//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
			if (TP_OVER_AMT_FLG != ""){
				var objArr=new Array();
				var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
				if (overDueDateAmt != 0){
					objArr[0]=rtnValAry[2];
					objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
					if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
						formObj.cust_cd.style.color= "#000000";
						formObj.cust_nm.style.color= "#000000";
						return;
					} else {
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
					}
				}
			}

			//[20140317 OJG] 요구사항 #27358 - [BINEX] Trade Partner 중 “Credit Limit”이 초과 되었을 경우의 Alert 내용 변경 필요
			//[20140317 OYH] #27474
			var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
			var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
			var balLmtAmt=crdLmtAmt - curLmtAmt;
			var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
			var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
			
			//[20141217 YJW] #46708
			if(crdLmtAmt > 0) {
				if(overDueAmt > 0 && balLmtAmt < 0  ){
					var objArr=new Array();
					//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
					//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
					objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));   
					if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
						try {creditOver=false;}catch(e){};
						formObj.cust_cd.style.color= "#000000";
						formObj.cust_nm.style.color= "#000000";
						return;
					} else {
						try {creditOver=true;}catch(e){};
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
					}
				} else if (balLmtAmt < 0  ){
					var objArr=new Array();
					//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
					//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));  
					objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
					if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
						try {creditOver=false;}catch(e){};
						formObj.cust_cd.style.color= "#000000";
						formObj.cust_nm.style.color= "#000000";
						return;
					} else {
						try {creditOver=true;}catch(e){};
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
					}
				} else if (overDueAmt > 0 ) {
					try {creditOver=false;}catch(e){};
					var objArr=new Array();
					objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
					if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
						formObj.cust_cd.style.color= "#000000";
						formObj.cust_nm.style.color= "#000000";
						return;
					} else {
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
					}
				} else {
					try {creditOver=false;}catch(e){};
					formObj.cust_cd.style.color= "#000000";
					formObj.cust_nm.style.color= "#000000";
				}
			} else {
				try {creditOver=false;}catch(e){};
				formObj.cust_cd.style.color= "#000000";
				formObj.cust_nm.style.color= "#000000";
			}
			
		} else if(rtnValAry[13] == 'CO'){
			try {creditOver=false;}catch(e){};
			if(confirm(getLabel('COM_FRT_ALT001'))){
				formObj.cust_cd.style.color= "#ff0000";
				formObj.cust_nm.style.color= "#ff0000";
			}else{
				formObj.cust_cd.value = "";
				formObj.cust_nm.value = "";
				formObj.cust_cd.style.color= "#000000";
				formObj.cust_nm.style.color= "#000000";
				return;
			}
			
		} /*else {
			try {creditOver=false;}catch(e){};
			if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
				//COD
				alert(getLabel('COM_FRT_ALT001'));
				//try {creditOver=true;}catch(e){};
				formObj.cust_cd.style.color= "#ff0000";
				formObj.cust_nm.style.color= "#ff0000";
			} else {
				//try {creditOver=false;}catch(e){};
				formObj.cust_cd.style.color= "#000000";
				formObj.cust_nm.style.color= "#000000";
			}
		}*/
		
		formObj.cust_cd.value=rtnValAry[0];//full_nm
		formObj.cust_nm.value=rtnValAry[2];//full_nm
		
		setSalesMan(rtnValAry[0]);
		setCtrbMgn(rtnValAry[0]);
	}
}

function SHIPPER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
		var opt_key_sec = "TP_OVER_AMT_FLG";
		ajaxSendPost(setOverAmtCurrFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
		
		if(rtnValAry[13] == 'KO'){
			alert(getLabel('COM_FRT_ALT015'));
			formObj.shpr_trdp_cd.value="";//trdp_cd
			formObj.shpr_nm.value="";//eng_nm
			formObj.shpr_trdp_cd.style.color= "#000000";
			formObj.shpr_nm.style.color= "#000000";
			return;
		
		} else if(rtnValAry[13] == 'CR'){

			//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
			if (TP_OVER_AMT_FLG != ""){
				var objArr=new Array();
				var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
				if (overDueDateAmt != 0){
					objArr[0]=rtnValAry[2];
					objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
					if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_nm.style.color= "#000000";
						return;
					} else {
						formObj.shpr_trdp_cd.style.color= "#ff0000";
						formObj.shpr_nm.style.color= "#ff0000";
					}
				}
			}

			//[20140317 OJG] 요구사항 #27358 - [BINEX] Trade Partner 중 “Credit Limit”이 초과 되었을 경우의 Alert 내용 변경 필요
			//[20140317 OYH] #27474
			var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
			var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
			var balLmtAmt=crdLmtAmt - curLmtAmt;
			var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
			var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
			
			//[20141217 YJW] #46708
			if(crdLmtAmt > 0) {
				if(overDueAmt > 0 && balLmtAmt < 0  ){
					var objArr=new Array();
					//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
					//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
					objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
					if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_nm.style.color= "#000000";
						return;
					} else {
						formObj.shpr_trdp_cd.style.color= "#ff0000";
						formObj.shpr_nm.style.color= "#ff0000";
					}
				} else if (balLmtAmt < 0  ){
					var objArr=new Array();
					//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
					//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
					objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
					if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_nm.style.color= "#000000";
						return;
					} else {
						formObj.shpr_trdp_cd.style.color= "#ff0000";
						formObj.shpr_nm.style.color= "#ff0000";
					}
				} else if (overDueAmt > 0 ) {
					var objArr=new Array();
					objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
					if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_nm.style.color= "#000000";
						return;
					} else {
						formObj.shpr_trdp_cd.style.color= "#ff0000";
						formObj.shpr_nm.style.color= "#ff0000";
					}
				} else {
					formObj.shpr_trdp_cd.style.color= "#000000";
					formObj.shpr_nm.style.color= "#000000";
				}
			} else {
				formObj.shpr_trdp_cd.style.color= "#000000";
				formObj.shpr_nm.style.color= "#000000";
			}
			
		//[20140307 OJG] #26863Credit Hold가 걸려 있는 TP가 SHIPPER, CONSIGNEE, NOTIFY 중 선택이 되면 Alert 추가. - Alert 내용 : “Credit Hold is on this Trade Partner. Do you want to proceed?”
		} else if(rtnValAry[13] == 'CH'){
			if(confirm(getLabel('COM_FRT_CFM005'))){ 
				formObj.shpr_trdp_cd.style.color= "#ff0000";
				formObj.shpr_nm.style.color= "#ff0000";
				formObj.shpr_nm.className='search_form focusElem';
			}else{
				formObj.shpr_trdp_cd.style.color= "#000000";
				formObj.shpr_nm.style.color= "#000000";
				return;
			}
			
		} else if(rtnValAry[13] == 'CO'){
			if(confirm(getLabel('COM_FRT_ALT001'))){
				formObj.shpr_trdp_cd.style.color= "#ff0000";
				formObj.shpr_nm.style.color= "#ff0000";
			}else{
				formObj.shpr_trdp_cd.value = "";
				formObj.shpr_nm.value = "";
				formObj.shpr_trdp_cd.style.color= "#000000";
				formObj.shpr_nm.style.color= "#000000";
				return;
			}
			
		/*} else if(rtnValAry[13] == 'CO'){
			if(rtnValAry[14] != '' && rtnValAry[15] != '' && rtnValAry[14] < rtnValAry[15]){
				//COD
				alert(getLabel('COM_FRT_ALT001')); 	
				formObj.shpr_trdp_cd.style.color= "#ff0000";
				formObj.shpr_nm.style.color= "#ff0000";
			} else {
				formObj.shpr_trdp_cd.style.color= "#000000";
				formObj.shpr_nm.style.color= "#000000";
			}*/
			
		} else {
			formObj.shpr_trdp_cd.style.color= "#000000";
			formObj.shpr_nm.style.color= "#000000";
		}
		
		formObj.shpr_trdp_cd.value=rtnValAry[0];//trdp_cd
		formObj.shpr_nm.value=rtnValAry[2];//eng_nm
	}
}

function CONSIGNEE_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
		var opt_key_sec = "TP_OVER_AMT_FLG";
		ajaxSendPost(setOverAmtCurrFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
		
		if(rtnValAry[13] == 'KO'){
			alert(getLabel('COM_FRT_ALT015'));
			formObj.cnee_trdp_cd.value="";//trdp_cd
			formObj.cnee_nm.value="";//eng_nm
			formObj.cnee_trdp_cd.style.color= "#000000";
			formObj.cnee_nm.style.color= "#000000";
			return;
			
		} else if(rtnValAry[13] == 'CR'){

			//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
			if (TP_OVER_AMT_FLG != ""){
				var objArr=new Array();
				var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
				if (overDueDateAmt != 0){
					objArr[0]=rtnValAry[2];
					objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
					if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
						formObj.cnee_trdp_cd.style.color= "#000000";
						formObj.cnee_nm.style.color= "#000000";
						return;
					} else {
						formObj.cnee_trdp_cd.style.color= "#ff0000";
						formObj.cnee_nm.style.color= "#ff0000";
					}
				}
			}

			//[20140317 OJG] 요구사항 #27358 - [BINEX] Trade Partner 중 “Credit Limit”이 초과 되었을 경우의 Alert 내용 변경 필요
			//[20140317 OYH] #27474
			var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
			var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
			var balLmtAmt=crdLmtAmt - curLmtAmt;
			var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
			var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
			
			//[20141217 YJW] #46708
			if(crdLmtAmt > 0) {
				if(overDueAmt > 0 && balLmtAmt < 0  ){
					var objArr=new Array();
					//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
					//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
					objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2)); 
					if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
						formObj.cnee_trdp_cd.style.color= "#000000";
						formObj.cnee_nm.style.color= "#000000";
						return;
					} else {
						formObj.cnee_trdp_cd.style.color= "#ff0000";
						formObj.cnee_nm.style.color= "#ff0000";
					}
				} else if (balLmtAmt < 0  ){
					var objArr=new Array();
					//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
					//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
					objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
					if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
						formObj.cnee_trdp_cd.style.color= "#000000";
						formObj.cnee_nm.style.color= "#000000";
						return;
					} else {
						formObj.cnee_trdp_cd.style.color= "#ff0000";
						formObj.cnee_nm.style.color= "#ff0000";
					}
				} else if (overDueAmt > 0 ) {
					var objArr=new Array();
					objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
					if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
						formObj.cnee_trdp_cd.style.color= "#000000";
						formObj.cnee_nm.style.color= "#000000";
						return;
					} else {
						formObj.cnee_trdp_cd.style.color= "#ff0000";
						formObj.cnee_nm.style.color= "#ff0000";
					}
				} else {
					formObj.cnee_trdp_cd.style.color= "#000000";
					formObj.cnee_nm.style.color= "#000000";
				}
			} else {
				formObj.cnee_trdp_cd.style.color= "#000000";
				formObj.cnee_nm.style.color= "#000000";
			}
			
		//[20140307 OJG] #26863Credit Hold가 걸려 있는 TP가 SHIPPER, CONSIGNEE, NOTIFY 중 선택이 되면 Alert 추가. - Alert 내용 : “Credit Hold is on this Trade Partner. Do you want to proceed?”	
		} else if(rtnValAry[13] == 'CH'){
			if(confirm(getLabel('COM_FRT_CFM005'))){ 
				formObj.cnee_trdp_cd.style.color= "#ff0000";
				formObj.cnee_nm.style.color= "#ff0000";
				formObj.cnee_nm.className='search_form focusElem';
			}else{
				formObj.cnee_trdp_cd.style.color= "#000000";
				formObj.cnee_nm.style.color= "#000000";
				return;
			}
			
		} else if(rtnValAry[13] == 'CO'){
			if(confirm(getLabel('COM_FRT_ALT001'))){
				formObj.cnee_trdp_cd.style.color= "#ff0000";
				formObj.cnee_nm.style.color= "#ff0000";
			}else{
				formObj.cnee_trdp_cd.value = "";
				formObj.cnee_nm.value = "";
				formObj.cnee_trdp_cd.style.color= "#000000";
				formObj.cnee_nm.style.color= "#000000";
				return;
			}
			
		/*} else if(rtnValAry[13] == 'CO'){
			if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
				//COD
				alert(getLabel('COM_FRT_ALT001'));	
				formObj.cnee_nm.style.color= "#ff0000";
			} else {
				formObj.cnee_nm.style.color= "#000000";
			}*/
			
		} else {
			formObj.cnee_trdp_cd.style.color= "#000000";
			formObj.cnee_nm.style.color= "#000000";
		}
		
		formObj.cnee_trdp_cd.value=rtnValAry[0];//trdp_cd
		formObj.cnee_nm.value=rtnValAry[2];//eng_nm
	}
}

//화면 이동
//var paramStr = "./SEE_BMD_0030.clt?f_cmd="+SEARCHLIST02+"&f_hbl_bl_seq="+frm1.intg_bl_seq.value;
//parent.mkNewFrame('S/R Entry', paramStr);
var cur_curObj;
function openPopUp(srcName, curObj) {
	cur_curObj = curObj;
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
	var frm1=document.frm1;
	try {
		switch (srcName) {
		
			case "LOCATION_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]="";
				callBackFunc = "LOCATION_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			break;
			case "POL_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
//				rtnary[2]=frm1.pol_nm.value;
				rtnary[2]="";
				
				callBackFunc = "POL_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			break;
			case "POL_POPLIST_NAME":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=frm1.pol_nm.value;
				
				callBackFunc = "POL_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			break;
			case "POD_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
//				rtnary[2]=frm1.pod_nm.value;
				rtnary[2]="";
				
				callBackFunc = "POD_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
				
				/*
				var rtnVal =  ComOpenWindow('./CMM_POP_0030.clt',  rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:440px" , true);
				if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				} else {
					var curObjId=curObj.id;
					var rtnValAry=rtnVal.split("|");
					//frm1.pol_cd.value = "";
					frm1.pod_cd.value=rtnValAry[0];// loc_cd
					frm1.pod_nod_cd.value=rtnValAry[1];// nod_cd
					frm1.pod_nm.value=rtnValAry[2];// loc_nm
				}
				*/
			break;
			case "POD_POPLIST_NAME":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=frm1.pod_nm.value;
				
				callBackFunc = "POD_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
				
			break;
			
			case "F_DEST_DATE":
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
//				rtnary[2]=frm1.fnl_dest_loc_nm.value;
				rtnary[2]="";
				
				callBackFunc = "F_DEST_DATE";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			break;
			case "F_DEST_DATE_NAME":
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=frm1.fnl_dest_loc_nm.value;
				
				callBackFunc = "F_DEST_DATE";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			break;
			
	        case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		
		   		callBackFunc = "USER_POPLIST";
		   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
	        break;
	        case "USER_POPLIST2"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		callBackFunc = "USER_POPLIST2";
		   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556,470,"yes");
	        break;
	        case "OFFICE_GRID_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		callBackFunc = "OFFICE_GRID_POPLIST";
		   		modal_center_open('./CMM_POP_0150.clt', rtnary, 556,580,"yes");
	        break;
	        
		} // end switch
	} catch (e) {
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
function setCtrbDeptCd(){
	var formObj = document.frm1;
	formObj.ctrb_dept_cd.value = "OT";
}

function setCtrbMgn(s_cust_cd) {
	var formObj=document.frm1;
	var s_post_dt = formObj.post_dt.value;
	
	if (typeof(formObj.ctrb_ofc_cd)!='undefined')
	{
		if (s_post_dt != ""){
			ajaxSendPost(searchCtrbMgnReq, "reqVal", "&goWhere=aj&bcKey=searchCtrbMgn&s_cust_cd="+s_cust_cd + "&s_post_dt="+s_post_dt, "./GateServlet.gsl");
		}
	}
}

function checkBoxSetting(){
	var formObj=document.frm1;
	
	if(formObj.ctrb_ratio_yn.value=="Y"){
		formObj.ctrb_ratio_yn.checked=true;
	}else{
		formObj.ctrb_ratio_yn.checked=false;
	}

	/*#657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL*/
	if(formObj.inter_use_flag.value=="Y"){
		formObj.inter_use_flag.checked=true;
	}else{
		formObj.inter_use_flag.checked=false;
	}
}


function searchCtrbMgnReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@^^@');
			
			formObj.ctrb_ofc_cd.value = rtnArr[0];
			formObj.ctrb_ratio_yn.value = rtnArr[1];
			formObj.ctrb_mgn.value = doMoneyFmt(Number(rtnArr[2]).toFixed(2));
			
			setCtrbDeptCd();
		} else {
			formObj.ctrb_ofc_cd.value = "";
			formObj.ctrb_ratio_yn.value = "N";
			formObj.ctrb_mgn.value = "";
			formObj.ctrb_dept_cd.value = "";
		}
		
		if(formObj.ctrb_ratio_yn.value=="Y"){
			formObj.ctrb_ratio_yn.checked=true;
		}else{
			formObj.ctrb_ratio_yn.checked=false;
		}
	}
}

/**
 * 달력 POPUP
 * @param doWhat
 * @param frm1
 * @return
*/
function doDisplay(doWhat, frm1){
    switch(doWhat){
        case 'DATE_ETD':    //달력 조회 팝업 호출      
            var cal=new ComCalendar(); 
        	cal.select(frm1.etd_dt_tm,  'MM-dd-yyyy');
        break;
        case 'DATE_ETA':   //달력 조회 팝업 호출      
            var cal=new ComCalendar(); 
        	cal.select(frm1.eta_dt_tm,  'MM-dd-yyyy');
        break;        
        case 'DATE_FETA':   //달력 조회 팝업 호출      
            var cal=new ComCalendar(); 
        	cal.select(frm1.feta_dt_tm,  'MM-dd-yyyy');
        break;  
        case 'DATE_POST':   //달력 조회 팝업 호출  
            var cal=new ComCalendar(); 
        	cal.select(frm1.post_dt,  'MM-dd-yyyy');
        break;
        case 'DATE_LOAD':   //달력 조회 팝업 호출  
            var cal=new ComCalendar(); 
        	cal.select(frm1.lod_dt_tm,  'MM-dd-yyyy');
        break;
    }
}
/*
 * function saveValid(sheetObj){ var rows = sheetObj.Rows; var cnt = 0; for(var
 * i = 1 ; i < rows ; i++){ if(sheetObj.CellValue(i, "ibflag") != "R"){
 * if(sheetObj.CellValue(i, "oth_tp") == ""){ alert("[Type] is mandatory
 * field!") return false; } cnt++; } } if(cnt == 0){ alert("No data to save!")
 * return false; }else{ return true; } }
 */
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
function loadPage() {
	
	//OFVFOUR-7919 [BNX-TOR] Question for total profit amount
	var opt_key = "OTH_SALE_TYPE_VALIDATE_FLG";
	ajaxSendPost(chkSaleTypeValidate, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN
	ajaxSendPost(setUserTeamInfo, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=opr_team&issued_by="+frm1.opr_usrid.value, "./GateServlet.gsl");

	//OFVFOUR-7707[Matrix] Restriction to block creating HBL in case the credit of customer exceeds credit limit
	var com_cd = "C330";
	var cd_val = "OTH";
	ajaxSendPost(chkCredit, "reqVal", "&goWhere=aj&bcKey=searchCmmDtlCd&com_cd="+com_cd+"&cd_val="+cd_val, "./GateServlet.gsl");
	//#314 [IMPEX] OEM & OEH GROSS WEIGHT DB TO MANAGE DECIMAL UP TO 3 PLACES
	var opt_key = "OBL_DECIMAL_LEN";
	ajaxSendPost(setDecimalLen, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var formObj=document.frm1;
	if (frm1.ref_no.value == ""){
		frm1.save_sts_flg.value="I";
		frm1.ref_no.value = "AUTO";
	} else {
		frm1.save_sts_flg.value="U";
	}
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
	    comConfigSheet(docObjects[i], SYSTEM_FIS);
	    initSheet(docObjects[i],i+1);
	    //khlee-마지막 환경 설정 함수 추가
	    comEndConfigSheet(docObjects[i]);
	}
	frm1.ctrb_mgn.value=doMoneyFmt(Number(frm1.ctrb_mgn.value).toFixed(2));
	checkBoxSetting();
	//오늘일자구하기
	var now=new Date(); 				
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 			
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	TODAY=month + "-" + date + "-" + year;
	if(formObj.post_dt.value == ""){
		formObj.post_dt.value=TODAY;
	}else{
		var post_dt=formObj.post_dt.value;
		//formObj.post_dt.value = post_dt.substr(0,2) + "-" + post_dt.substr(2,2) + "-" + post_dt.substr(4,4);
	}
	if(formObj.ref_no.value != ""){
		doWork('SEARCHLIST');
	}
	if(formObj.sls_usrid.value == ""){
		formObj.sls_usrid.value=formObj.f_usr_id.value;
	}
	if(formObj.sls_ofc_cd.value == ""){
		formObj.sls_ofc_cd.value=formObj.f_ofc_cd.value;
	}
	if(formObj.opr_usrid.value == ""){
		formObj.opr_usrid.value=formObj.f_usr_id.value;
	}
	/* #20552 : [ADVC] Other Operation 에 Copy 기능 추가, jsjang 2013.10.24 */
	if(formObj.oth_seq.value != ""){
		getBtnObj('btnCopy').style.display='inline';
		getBtnObj('btnAccounting').style.display='inline';
		
		//#2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.ref_no.value);
	}else{
		//#5600 [BNX] Other Operation > MISC > MISC. Operation List Improvement (Requirment 1) - Duc Nguyen
		setTabTitle('');
	}
	
	
	
	//2016.04.21 C.W.Park Modified
	//#52109 로직 수정
	//LHK, 20131028 setPost_date(save_flag) 추가 비교 로직으로 인해 저장 후 org_post_dt reset
//	setBlock_dt();
	
	//LHK, 20140228, #26595  Other Operation 의 Accounting Validation 
	if(formObj.f_sts_cd.value == "B"){
		formObj.cust_cd.className='search_form-disable';
		formObj.cust_cd.disabled=true;
		formObj.cust_nm.className='search_form-disable';
		formObj.cust_nm.disabled=true;
		formObj.cust.disabled = true;
		formObj.post_dt.className='search_form-disable';
		formObj.post_dt.disabled=true;
		formObj.post_dt_cal.style.display="none";
		formObj.ofc_cd.className='search_form-disable';
		formObj.ofc_cd.disabled=true;
	}else{
		formObj.cust_cd.className='search_form';
		formObj.cust_cd.disabled=false;
		formObj.cust_nm.className='search_form';
		formObj.cust_nm.disabled=false;
		formObj.cust.disabled = false;
		formObj.post_dt.className='search_form';
		formObj.post_dt.disabled=false;
		formObj.post_dt_cal.style.display="inline";
		formObj.ofc_cd.className='search_form';
		formObj.ofc_cd.disabled=false;
	}
	
    /* 2016-12-21 자동완성 기능 추가 S */
	fnSetAutocompleteCallBack('cust_nm'	, 'CUSTOMER_POPLIST', 'LINER_POPLIST'); //Customer
	fnSetAutocompleteCallBack('shpr_nm'	, 'SHIPPER_POPLIST', 'LINER_POPLIST'); //Shipper
	fnSetAutocompleteCallBack('cnee_nm'	, 'CONSIGNEE_POPLIST', 'LINER_POPLIST'); //Consignee
	fnSetAutocompleteCallBack('pol_nm'	, 'POL_POPLIST', 'LOCATION_POPLIST'); //POL
	fnSetAutocompleteCallBack('pod_nm'	, 'POD_POPLIST', 'LOCATION_POPLIST'); //POD
	fnSetAutocompleteCallBack('fnl_dest_loc_nm'	, 'F_DEST_DATE', 'LOCATION_POPLIST'); //Final Destination  
	fnSetAutocompleteCallBack('pu_loc_nm'	, 'PICKUP_LOC_POPLIST', 'LINER_POPLIST'); //Pickup 
	fnSetAutocompleteCallBack('door_loc_nm'	, 'DOOR_POPLIST', 'LINER_POPLIST'); //Delivery
    /* 2016-12-21 자동완성 기능 추가 E */ 
	
	/* operation 권한이 없는 경우 */   
	var objDisable = false; 
	if (uod_flg == "N"){ 		
		objDisable = true;		
		if (formObj.opr_usrid.value ==""){
			formObj.opr_usrid.value=usrId;
		}
		if (formObj.sls_usrid.value ==""){
			formObj.sls_usrid.value=usrId;
		}
		formObj.opr_usrid.disabled = objDisable; 
		$("#operator").prop('disabled', objDisable);    	
		
		formObj.sls_usrid.disabled = objDisable; 
		$("#salesperson").prop('disabled', objDisable);  
		
	}
	
	fnSetIBsheetInit(1);   //grid가 생성되지않았으면 생성
	// 사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[1], false,"fnRestoreGridSetEnd"); //Tab 2 Container List
    
    //#2586 [BNX US] COD, CREDIT HOLD ACCOUNTS NO WARNING
    if(frm1.oth_seq.value != ''){
//    	(formObj.cust_cd.value != "") ? chkCodOnLoad("cust", formObj.cust_cd.value, false) : "";
//    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, false) : "";
//    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, false) : "";
    }else{
    	(formObj.cust_cd.value != "") ? chkCodOnLoad("cust", formObj.cust_cd.value, true) : "";
    	(formObj.shpr_trdp_cd.value != "") ? chkCodOnLoad("shipper", formObj.shpr_trdp_cd.value, true) : "";
    	(formObj.cnee_trdp_cd.value != "") ? chkCodOnLoad("consignee", formObj.cnee_trdp_cd.value, true) : "";
    }
 
    //#3494 [BINEX TOR] OTHER OPERATION ENTRY ISSUE : 아래로 수정.
    //formObj.grs_wgt_k.value=doMoneyFmt(Number(frm1.grs_wgt_k.value).toFixed(obl_decimal_len));
    //formObj.grs_wgt_l.value=doMoneyFmt(Number(frm1.grs_wgt_l.value).toFixed(obl_decimal_len));
    
    var grsWgtValue = Number(formObj.grs_wgt_k.value.replace(/,/gi, "")).toFixed(obl_decimal_len);
	var grsWgtMoney = doMoneyFmt(grsWgtValue);
	formObj.grs_wgt_k.value = grsWgtMoney;
	
	var grsWgtLValue = Number(formObj.grs_wgt_l.value.replace(/,/gi, "")).toFixed(obl_decimal_len);
	var grsWgtLMoney = doMoneyFmt(grsWgtLValue);
	formObj.grs_wgt_l.value = grsWgtLMoney;
}

function fnRestoreGridSetEnd(){
	
}

function fnSetIBsheetInit(sheetNo){
	//if(docObjects[sheetNo].HeaderRows() < 1){
	//console.log(sheetNo  +' / fnSetIBsheetInit  = ' + docObjects[sheetNo].id + '  /  ' + docObjects[sheetNo].ColSaveName(1));
	if(docObjects[sheetNo].ColSaveName(1) == -1){
		comConfigSheet(docObjects[sheetNo], SYSTEM_FIS);
		initSheet(docObjects[sheetNo], (sheetNo+1) );
		comEndConfigSheet(docObjects[sheetNo]);
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
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('OTH_OPR_0010_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_ref_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_type",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_mbl_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_hbl_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_oth_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Status",    Hidden:0, Width:1,    Align:"Center",  ColMerge:1,   SaveName:"g_ibflag" } ];
	         
	        InitColumns(cols);
	        SetEditable(1);
	        SetVisible(false);
	     }                                                      
	   break;
       case 2:      //IBSheet1 init
          with (sheetObj) {
    	   	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

    	   	var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	   	var headers = [ { Text:getLabel('OTH_OPR_0010_HDR2'), Align:"Center"} ];
    	   	InitHeaders(headers, info);

         var cols = [ {Type:"DelCheck",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck: 0 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cntr_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
                {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"seal_no1",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"cntr_ref_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cgo_pck_qty",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
                
                {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	            {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"cgo_wgt1",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	            {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"cgo_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
	            {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"cgo_meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
                
	            {Type:"Text",      Hidden:0, Width:140,   Align:"Left",    ColMerge:1,   SaveName:"pkup_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:20 },
                //{Type:"Text",      Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"lst_free_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Date",      Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"lst_free_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                
                {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"cntr_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"oth_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Status",    Hidden:1, Width:1,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" } ];
          
         	InitColumns(cols);
         	SetEditable(1);
         	SetColProperty('cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
         	SetColProperty(0 ,"cntr_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
         	SetColProperty(0 ,"seal_no1" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
         	SetColProperty(0 ,"cntr_ref_no" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
  			
         	//#6798 [FULLTRANS] CONTAINER PASTE FUNCTION IN B/L ENTRY SCREEN
			//SetActionMenu("Header Setting Save|Header Setting Reset");
			  
         	SetFocusAfterProcess(0);
         	SetSheetHeight(165);
         }                                                      
       break;
       case 3:					//첨부파일
    	   initMemo(sheetObj);    	   
    	   break;
   }
}

//[OFVFOUR-6955] - [ABC LOGIS] UPLOAD DOC ISSUE IN LOCAL TRANSPORT
function sheet1_OnClick() {
}

//조회 후
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(sheetObj.GetCellValue(1, "g_ref_no") != "" && sheetObj.GetCellValue(1, "g_ref_no") != undefined){
		formObj.ref_no.value=sheetObj.GetCellValue(1, "g_ref_no");
		formObj.oth_seq.value=sheetObj.GetCellValue(1, "g_oth_seq");
		//Save success!
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
//		doWork("SEARCHLIST");
	}
}
//저장 후
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
//	if(sheetObj.CellValue(1, "g_ref_no") != "" && sheetObj.CellValue(1, "g_ref_no") != undefined){
	if(errMsg == "" || errMsg == undefined || errMsg == null){
		formObj.ref_no.value=sheetObj.GetCellValue(1, "g_ref_no");
		formObj.old_ref_no.value=sheetObj.GetCellValue(1, "g_ref_no");
		formObj.oth_seq.value=sheetObj.GetCellValue(1, "g_oth_seq");
		formObj.grs_wgt_l.value=doMoneyFmt(formObj.grs_wgt_l.value);
		formObj.grs_wgt_k.value=doMoneyFmt(formObj.grs_wgt_k.value);
		formObj.meas_f.value=doMoneyFmt(formObj.meas_f.value);
		formObj.meas_m.value=doMoneyFmt(formObj.meas_m.value);
		
		//#2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.ref_no.value);
		
		//Save success!
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
		formObj.org_post_dt.value=formObj.post_dt.value;
		doWork("SEARCHLIST");
		
		if(formObj.oth_seq.value != ""){
			getBtnObj('btnCopy').style.display='inline';
			getBtnObj('btnAccounting').style.display='inline';
		}
	}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}

function sheet2_OnSearchEnd(sheetObj, row, col) {	
	var intg_bl_seq =  document.frm1.ref_no.value;
	var palt_mnu_cd = 'OTH';
	var opr_no = sheetObj.GetCellValue(1, "ref_no");
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	doWorkMemo("SEARCHMEMO");
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}


function sheet2_OnChange(sheetObj, row, col){
	var cntrColStr="cntr_no";
	if(sheetObj.ColSaveName(col)==cntrColStr){
		//Contaienr Number 유효성 검증
		if(sheetObj.GetCellValue(row, cntrColStr)!==''){
			var rtnVal=cntrNumCheck(sheetObj.GetCellValue(row, cntrColStr));
			if(rtnVal){		//정상인경우
				//중복 확인
				if(!checkCntrNo(sheetObj.GetCellValue(row, cntrColStr))){
					//This Container Number is already used!\nPlease check the Container Number!
					alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('FMS_COD_CNTR'));
					sheetObj.SetCellValue(row, cntrColStr,'',0);
					sheetObj.SelectCell(row, cntrColStr);
				}
			}
			else{
				//Proceed anyway? ...??? 
				if(confirm(getLabel('FMS_COM_CFMCON')) == false){
					sheetObj.SetCellValue(row, cntrColStr,'',0);
					sheetObj.SelectCell(row, cntrColStr);
				}else{
					//중복 확인
					if(!checkCntrNo(sheetObj.GetCellValue(row, cntrColStr))){
						//This Container Number is already used!\nPlease check the Container Number!
						alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('FMS_COD_CNTR'));
						sheetObj.SetCellValue(row, cntrColStr,'',0);
						sheetObj.SelectCell(row, cntrColStr);
					}
				}
			}
		}
	}
	
	switch(sheetObj.ColSaveName(col)){
		case "cgo_wgt":
			sheetObj.SetCellValue(row, "cgo_wgt1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, 2),0);
		break;
		case "cgo_wgt1":
			sheetObj.SetCellValue(row, "cgo_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, 2),0);
		break;
		case "cgo_meas":
			sheetObj.SetCellValue(row, "cgo_meas1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_CBM_CFT, 3),0);
		break;
		case "cgo_meas1":
			sheetObj.SetCellValue(row, "cgo_meas",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_CBM_CFT, 3),0);
		break;
	}
	//#3247 [CLT] B/L Entry - Container List 정보 -> PKG, WGT, VOL정보 계산로직 누락
	var colNm=sheetObj.ColSaveName(col);
	if(colNm == "cgo_pck_qty" || colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "del_chk")
	{
		var cgo_pck_qty='0';
		var meas_m='0.000000';
		var meas_f='0.000000';
		var grs_wgt_k=0.000;
		var grs_wgt_l=0.00;
		for(var i=1; i<=sheetObj.LastRow(); i++){
			if(sheetObj.GetCellValue(i, "del_chk") == 0)
		   {
				cgo_pck_qty=parseInt(cgo_pck_qty) 			+ parseInt(sheetObj.GetCellValue(i,"cgo_pck_qty"));
			   //meas 	= roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.CellValue(i,"cgo_meas"), 6));
				meas_m=roundXL(parseFloat(meas_m), 6) 		+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas")), 6);
				meas_f=roundXL(parseFloat(meas_f), 6) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas1")), 6);
				grs_wgt_k=roundXL(parseFloat(grs_wgt_k), obl_decimal_len)*1.0 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt")), obl_decimal_len)*1.0;
				grs_wgt_l=roundXL(parseFloat(grs_wgt_l), obl_decimal_len) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt1")), obl_decimal_len);
		   }
		}
		var formObj=document.frm1;
		
		if((colNm == "cgo_pck_qty" || colNm == "del_chk") && cgo_pck_qty > 0){
			formObj.pck_qty.value=cgo_pck_qty;
		}
		if((colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "del_chk") && grs_wgt_k > 0){
			formObj.grs_wgt_k.value=doMoneyFmt(Number(grs_wgt_k).toFixed(obl_decimal_len));
			formObj.grs_wgt_l.value=roundXL(formObj.grs_wgt_k.value.replaceAll(",","") * CNVT_CNST_KG_LB, obl_decimal_len);
			chkComma(formObj.grs_wgt_l,8,obl_decimal_len);	
			formObj.grs_wgt_l.value=doMoneyFmt(Number(grs_wgt_l).toFixed(obl_decimal_len));
			formObj.grs_wgt_k.value=doMoneyFmt(Number(grs_wgt_k).toFixed(obl_decimal_len)); 
			chkComma(formObj.grs_wgt_k,8,obl_decimal_len);			
		}
		if((colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "del_chk") && meas_m > 0){
			formObj.meas_m.value=doMoneyFmt(Number(meas_m).toFixed(3));
			formObj.meas_f.value=roundXL(formObj.meas_m.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, 3);
			chkComma(formObj.meas_f,8,3);
			formObj.meas_f.value=doMoneyFmt(Number(meas_f).toFixed(3));
			formObj.meas_m.value=roundXL(formObj.meas_f.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, 3);
			chkComma(formObj.meas_m,8,3);
		}
	}	
	
}

function sheet2_OnKeyDown(sheetObj, row, col, keyCode){
	// 마지막 Cell에서 Tab했을 경우 Tab 이벤트 때문에 SelectCell에서 지정한 Cell의 다음 Index로 포커스 이동됨.
	// OnTab 이벤트로 변경처리함 (YJW 2017.02.15)
	/*if(sheetObj.LastRow()== row && "cgo_meas1" == sheetObj.ColSaveName(col)){
		if(keyCode==9){
			doWork("ROWADD");
			sheetObj.SelectCell(sheetObj.LastRow(), 0);
		}
	}*/
}

function sheet2_OnTab(sheetObj, Row, Col, ORow, OCol, isShift, isLast) {
	// #334 - [ZEN] PAYMENT AND DEPOSIT COLUMN ORDER ADJUSTMENT
	var lastCol = 0;
	
	for(var i=0; i<=sheetObj.LastCol(); i++){
		if(sheetObj.GetColHidden(i) == 0) {
			lastCol = i;
		}
	}
	
	if(sheetObj.LastRow() == Row && OCol == lastCol){
		doWork("ROWADD");
		sheetObj.SelectCell(sheetObj.LastRow(), 0);
	}
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet2_OnSelectMenu(sheetObj, MenuString){
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
	 }
}
/**
 * Container번호 중복확인
 */
function checkCntrNo(inCntrNo){
	var intRows=docObjects[1].LastRow() + 1;
	var loopNum=0;
	for(var i=1; i < intRows; i++){
		if(inCntrNo==docObjects[1].GetCellValue(i, 'cntr_no')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}
function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt_k"){
		formObj.grs_wgt_l.value=doMoneyFmt(roundXL(formObj.grs_wgt_k.value.replaceAll(",","") * CNVT_CNST_KG_LB, obl_decimal_len));
	}else if(obj.name=="grs_wgt_l"){
		formObj.grs_wgt_k.value=doMoneyFmt(roundXL(formObj.grs_wgt_l.value.replaceAll(",","") / CNVT_CNST_KG_LB, obl_decimal_len));
	}
}
function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="meas_m"){
		formObj.meas_f.value=doMoneyFmt(roundXL(formObj.meas_m.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, 3));
	}else if(obj.name=="meas_f"){
		formObj.meas_m.value=doMoneyFmt(roundXL(formObj.meas_f.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, 3));
	}
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	
	var formObj=document.frm1;
	
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}				
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				onKeyDownFlg = false;
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="Location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				onKeyDownFlg = true;
			}
		} else if ( tmp == "onBlur" ) {
			if(!onKeyDownFlg) return;
			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="Location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}else if ( tmp == "onChange" ) {
			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}else{
		if(str == "trdpCode_cs"){
			formObj.cust_cd.value = "";
			formObj.cust_nm.value = "";
		}else if(str == "commodity"){
			formObj.cmdt_cd.value = "";
			formObj.cmdt_nm.value = "";
		}else if(str == "Location_pol"){
			formObj.pol_cd.value = "";
			formObj.pol_nm.value = "";
		}else if(str == "Location_pod"){
			formObj.pod_cd.value = "";
			formObj.pod_nm.value = "";
		}else if(str == "Location_dest"){
			formObj.fnl_dest_loc_cd.value = "";
			formObj.fnl_dest_loc_nm.value = "";
		}else if(str == "trdpCode_pu"){
			formObj.pu_loc_cd.value = "";
			formObj.pu_loc_nm.value = "";
		}else if(str == "trdpCode_door"){
			formObj.door_loc_cd.value = "";
			formObj.door_loc_nm.value = "";
		}else if(str == "trdpCode_sh"){
			formObj.shpr_trdp_cd.value = "";
			formObj.shpr_nm.value = "";
		}else if(str == "trdpCode_co"){
			formObj.cnee_trdp_cd.value = "";
			formObj.cnee_nm.value = "";			
		}
	}
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

			//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
			var opt_key_sec = "TP_OVER_AMT_FLG";
			ajaxSendPost(setOverAmtCurrFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

			if(CODETYPE == "Location_por"){	
				if(masterVals[0]==''){
					formObj.por_cd.focus();
				}else{
					formObj.por_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd
					formObj.por_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				}
			}else if(CODETYPE == "Location_pol"){
				if(masterVals[0]==''){
					formObj.pol_cd.focus();
				}else{
					formObj.pol_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd
					formObj.pol_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				}
			}else if(CODETYPE == "Location_pod"){
				if(masterVals[0]==''){
					formObj.pod_cd.focus();
				}else{
					formObj.pod_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd 
					formObj.pod_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				}
			}else if(CODETYPE == "Location_del"){
				if(masterVals[0]==''){
					formObj.del_cd.focus();
				}else{
					formObj.del_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd 
					//formObj.del_nod_cd.value= masterVals[1];//nod_cd
					//formObj.del_nm.value    = masterVals[3]+', '+masterVals[4];//loc_nm
					formObj.del_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				}
			}else if(CODETYPE == "Location_dest"){
				formObj.fnl_dest_loc_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd 
				//formObj.fnl_dest_nod_cd.value = masterVals[1];//nod_cd
				//formObj.fnl_dest_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				formObj.fnl_dest_loc_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
			}else if(CODETYPE == "commodity"){
				formObj.cmdt_cd.value=masterVals.length > 0 ? masterVals[0] : ""; 
				formObj.cmdt_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				
			}else if(CODETYPE == "trdpCode_cs"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.cust_cd.value="";//trdp_cd  AS param1
					formObj.cust_nm.value="";//eng_nm   AS param2
					return;
					
				} else if(masterVals[5] == 'CR'){

					//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
					if (TP_OVER_AMT_FLG != ""){
						var objArr=new Array();
						var overDueDateAmt = masterVals[38]==""?0:eval(masterVals[38]);
						if (overDueDateAmt != 0){
							objArr[0]=masterVals[3];
							objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
								formObj.cust_cd.value="";
								formObj.cust_nm.value="";
								formObj.cust_cd.style.color= "#000000";
								formObj.cust_nm.style.color= "#000000";
								return;
							} else {
								formObj.cust_cd.style.color= "#ff0000";
								formObj.cust_nm.style.color= "#ff0000";
							}
						}
					}

					var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
					var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
					var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
					
					//[20141217 YJW] #46708
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
								formObj.cust_cd.value="";	//trdp_cd  AS param1
								formObj.cust_nm.value="";		//eng_nm   AS param2
								try {creditOver=false;}catch(e){};
								formObj.cust_cd.style.color= "#000000";
								formObj.cust_nm.style.color= "#000000";
								return;
							} else {
								try {creditOver=true;}catch(e){};
								formObj.cust_cd.style.color= "#ff0000";
								formObj.cust_nm.style.color= "#ff0000";
							}
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
								formObj.cust_cd.value="";	//trdp_cd  AS param1
								formObj.cust_nm.value="";		//eng_nm   AS param2
								try {creditOver=false;}catch(e){};
								formObj.cust_cd.style.color= "#000000";
								formObj.cust_nm.style.color= "#000000";
								return;
							} else {
								try {creditOver=true;}catch(e){};
								formObj.cust_cd.style.color= "#ff0000";
								formObj.cust_nm.style.color= "#ff0000";
							}
						} else if (overDueAmt > 0 ) {
							try {creditOver=false;}catch(e){};
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
							if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
								formObj.cust_cd.value="";	//trdp_cd  AS param1
								formObj.cust_nm.value="";		//eng_nm   AS param2
								formObj.cust_cd.style.color= "#000000";
								formObj.cust_nm.style.color= "#000000";
								return;
							} else {
								formObj.cust_cd.style.color= "#ff0000";
								formObj.cust_nm.style.color= "#ff0000";
							}
						} else {
							try {creditOver=false;}catch(e){};
							formObj.cust_cd.style.color= "#000000";
							formObj.cust_nm.style.color= "#000000";
						}
					} else {
						try {creditOver=false;}catch(e){};
						formObj.cust_cd.style.color= "#000000";
						formObj.cust_nm.style.color= "#000000";
					}
					
				} else if(masterVals[5] == 'CO'){
					try {creditOver=false;}catch(e){};
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
					}else{
						formObj.cust_cd.value="";
						formObj.cust_nm.value="";
						formObj.cust_cd.style.color= "#000000";
						formObj.cust_nm.style.color= "#000000";
					}
				} /*else {
					try {creditOver=false;}catch(e){};
					if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
						//try {creditOver=true;}catch(e){};
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
					} else {
						//try {creditOver=false;}catch(e){};
						formObj.cust_cd.style.color= "#000000";
						formObj.cust_nm.style.color= "#000000";
					}
				}*/
				
				formObj.cust_cd.value=masterVals[0];//trdp_cd  AS param1
				formObj.cust_nm.value=masterVals[3];//eng_nm   AS param2
				
				setSalesMan(formObj.cust_cd.value);
				setCtrbMgn(formObj.cust_cd.value);
				
			}else if(CODETYPE == "trdpCode_pu"){
				formObj.pu_loc_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd 
				formObj.pu_loc_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
			}else if(CODETYPE == "trdpCode_door"){
				formObj.door_loc_cd.value=masterVals.length > 0 ? masterVals[0] : ""; 
				formObj.door_loc_nm.value=masterVals.length > 3 ? masterVals[3] : "";
			}else if(CODETYPE == "booking_s"){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "bkg_no",masterVals.length > 0 ? masterVals[0] : "", 0); 
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "intg_bl_seq",masterVals.length > 1 ? masterVals[1] : "", 0); 
				
			}else if(CODETYPE == "trdpCode_sh"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.shpr_trdp_cd.value="";	//trdp_cd  AS param1
					formObj.shpr_nm.value="";		//eng_nm   AS param2
					formObj.shpr_trdp_cd.style.color= "#000000";
					formObj.shpr_nm.style.color= "#000000";
					return;
					
				} else if(masterVals[5] == 'CR'){

					//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
					if (TP_OVER_AMT_FLG != ""){
						var objArr=new Array();
						var overDueDateAmt = masterVals[38]==""?0:eval(masterVals[38]);
						if (overDueDateAmt != 0){
							objArr[0]=masterVals[3];
							objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
								formObj.shpr_trdp_cd.value="";
								formObj.shpr_nm.value="";
								formObj.shpr_trdp_cd.style.color= "#000000";
								formObj.shpr_nm.style.color= "#000000";
								return;
							} else {
								formObj.shpr_trdp_cd.style.color= "#ff0000";
								formObj.shpr_nm.style.color= "#ff0000";
							}
						}
					}

					var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
					var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
					var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
					
					//[20141217 YJW] #46708
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
								formObj.shpr_trdp_cd.value="";	//trdp_cd  AS param1
								formObj.shpr_nm.value="";		//eng_nm   AS param2
								formObj.shpr_trdp_cd.style.color= "#000000";
								formObj.shpr_nm.style.color= "#000000";
								return;
							} else {
								formObj.shpr_trdp_cd.style.color= "#ff0000";
								formObj.shpr_nm.style.color= "#ff0000";
							}
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2)); 
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
								formObj.shpr_trdp_cd.value="";	//trdp_cd  AS param1
								formObj.shpr_nm.value="";		//eng_nm   AS param2
								formObj.shpr_trdp_cd.style.color= "#000000";
								formObj.shpr_nm.style.color= "#000000";
								return;
							} else {
								formObj.shpr_trdp_cd.style.color= "#ff0000";
								formObj.shpr_nm.style.color= "#ff0000";
							}
						} else if (overDueAmt > 0 ) {
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
							if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
								formObj.shpr_trdp_cd.value="";	//trdp_cd  AS param1
								formObj.shpr_nm.value="";		//eng_nm   AS param2
								formObj.shpr_trdp_cd.style.color= "#000000";
								formObj.shpr_nm.style.color= "#000000";
								return;
							} else {
								formObj.shpr_trdp_cd.style.color= "#ff0000";
								formObj.shpr_nm.style.color= "#ff0000";
							}
						} else {
							formObj.shpr_trdp_cd.style.color= "#000000";
							formObj.shpr_nm.style.color= "#000000";
						}
					} else {
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_nm.style.color= "#000000";
					}
					
				//[20140307 OJG] #26863Credit Hold가 걸려 있는 TP가 SHIPPER, CONSIGNEE, NOTIFY 중 선택이 되면 Alert 추가. - Alert 내용 : “Credit Hold is on this Trade Partner. Do you want to proceed?”
				} else if(masterVals[5] == 'CH'){
					if(confirm(getLabel('COM_FRT_CFM005'))){
						formObj.shpr_trdp_cd.style.color= "#ff0000";
						formObj.shpr_nm.style.color= "#ff0000";
						formObj.shpr_nm.className='search_form focusElem';
					}else{
						formObj.shpr_trdp_cd.value="";	//trdp_cd  AS param1
						formObj.shpr_nm.value="";		//eng_nm   AS param2
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_nm.style.color= "#000000";
						return;
					}
					
				} else if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.shpr_trdp_cd.style.color= "#ff0000";
						formObj.shpr_nm.style.color= "#ff0000";
					}else{
						formObj.shpr_trdp_cd.value="";	
						formObj.shpr_nm.value="";		
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_nm.style.color= "#000000";
						return;
					}
					
				/*} else if(masterVals[5] == 'CO'){
					if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
						formObj.shpr_trdp_cd.style.color= "#ff0000";
						formObj.shpr_nm.style.color= "#ff0000";
					} else {
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_nm.style.color= "#000000";
					}*/
					
				} else {
					formObj.shpr_trdp_cd.style.color= "#000000";
					formObj.shpr_nm.style.color= "#000000";
				}
				
				formObj.shpr_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.shpr_nm.value=masterVals[3];		//eng_nm   AS param2
				
			}else if(CODETYPE == "trdpCode_co"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.cnee_trdp_cd.value="";	//trdp_cd  AS param1
					formObj.cnee_nm.value="";		//eng_nm   AS param2
					formObj.cnee_trdp_cd.style.color= "#000000";
					formObj.cnee_nm.style.color= "#000000";
					return;
					
				} else if(masterVals[5] == 'CR'){

					//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
					if (TP_OVER_AMT_FLG != ""){
						var objArr=new Array();
						var overDueDateAmt = masterVals[38]==""?0:eval(masterVals[38]);
						if (overDueDateAmt != 0){
							objArr[0]=masterVals[3];
							objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
								formObj.cnee_trdp_cd.value="";
								formObj.cnee_nm.value="";
								formObj.cnee_trdp_cd.style.color= "#000000";
								formObj.cnee_nm.style.color= "#000000";
								return;
							} else {
								formObj.cnee_trdp_cd.style.color= "#ff0000";
								formObj.cnee_nm.style.color= "#ff0000";
							}
						}
					}


					var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
					var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
					var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
					
					//[20141217 YJW] #46708
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
								formObj.cnee_trdp_cd.value="";	//trdp_cd  AS param1
								formObj.cnee_nm.value="";		//eng_nm   AS param2
								formObj.cnee_trdp_cd.style.color= "#000000";
								formObj.cnee_nm.style.color= "#000000";
								return;
							} else {
								formObj.cnee_trdp_cd.style.color= "#ff0000";
								formObj.cnee_nm.style.color= "#ff0000";
							}
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));  
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
								formObj.cnee_trdp_cd.value="";	//trdp_cd  AS param1
								formObj.cnee_nm.value="";		//eng_nm   AS param2
								formObj.cnee_trdp_cd.style.color= "#000000";
								formObj.cnee_nm.style.color= "#000000";
								return;
							} else {
								formObj.cnee_trdp_cd.style.color= "#ff0000";
								formObj.cnee_nm.style.color= "#ff0000";
							}
						} else if (overDueAmt > 0 ) {
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
							if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
								formObj.cnee_trdp_cd.value="";	//trdp_cd  AS param1
								formObj.cnee_nm.value="";		//eng_nm   AS param2
								formObj.cnee_trdp_cd.style.color= "#000000";
								formObj.cnee_nm.style.color= "#000000";
								return;
							} else {
								formObj.cnee_trdp_cd.style.color= "#ff0000";
								formObj.cnee_nm.style.color= "#ff0000";
							}
						} else {
							formObj.cnee_trdp_cd.style.color= "#000000";
							formObj.cnee_nm.style.color= "#000000";
						}
					} else {
						formObj.cnee_trdp_cd.style.color= "#000000";
						formObj.cnee_nm.style.color= "#000000";
					}
					
				//[20140307 OJG] #26863Credit Hold가 걸려 있는 TP가 SHIPPER, CONSIGNEE, NOTIFY 중 선택이 되면 Alert 추가. - Alert 내용 : “Credit Hold is on this Trade Partner. Do you want to proceed?”
				} else if(masterVals[5] == 'CH'){
					if(confirm(getLabel('COM_FRT_CFM005'))){
						formObj.cnee_trdp_cd.style.color= "#ff0000";
						formObj.cnee_nm.style.color= "#ff0000";
						formObj.cnee_nm.className='search_form focusElem';
					}else{
						formObj.cnee_trdp_cd.value="";	//trdp_cd  AS param1
						formObj.cnee_nm.value="";		//eng_nm   AS param2
						formObj.cnee_trdp_cd.style.color= "#000000";
						formObj.cnee_nm.style.color= "#000000";
						return;
					}
					
				} else if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.cnee_trdp_cd.style.color= "#ff0000";
						formObj.cnee_nm.style.color= "#ff0000";
					}else{
						formObj.cnee_trdp_cd.value="";	
						formObj.cnee_nm.value="";		
						formObj.cnee_trdp_cd.style.color= "#000000";
						formObj.cnee_nm.style.color= "#000000";
						return;
					}
					
				/*} else if(masterVals[5] == 'CO'){
					if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
						formObj.cnee_trdp_cd.style.color= "#ff0000";
						formObj.cnee_nm.style.color= "#ff0000";
					} else {
						formObj.cnee_trdp_cd.style.color= "#000000";
						formObj.cnee_nm.style.color= "#000000";
					}*/
					
				} else {
					formObj.cnee_trdp_cd.style.color= "#000000";
					formObj.cnee_nm.style.color= "#000000";
				}
				
				formObj.cnee_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.cnee_nm.value=masterVals[3];		//eng_nm   AS param2	
			}
		}else{
			if(CODETYPE == "Location_por"){
				formObj.por_cd.value="";//loc_cd
				//formObj.por_nod_cd.value = "";//nod_cd
				formObj.por_nm.value="";//loc_nm
				formObj.por_cd.focus();
			}else if(CODETYPE == "Location_pol"){
				formObj.pol_cd.value="";//loc_cd
				//formObj.pol_nod_cd.value = "";//nod_cd
				formObj.pol_nm.value="";//loc_nm
				formObj.pol_cd.focus();
			}else if(CODETYPE == "Location_pod"){
				formObj.pod_cd.value="";//loc_cd
				//formObj.pod_nod_cd.value = "";//nod_cd
				formObj.pod_nm.value="";//loc_nm
				formObj.pod_cd.focus();
			}else if(CODETYPE == "Location_del"){
				formObj.del_cd.value="";//loc_cd 
				//formObj.del_nod_cd.value = "";//nod_cd
				formObj.del_nm.value="";//loc_nm
				formObj.del_cd.focus();
			}else if(CODETYPE == "Location_dest"){
				formObj.fnl_dest_loc_cd.value="";//loc_cd
				//formObj.fnl_dest_nod_cd.value = "";//nod_cd
				formObj.fnl_dest_loc_nm.value="";//loc_nm
				formObj.fnl_dest_loc_cd.focus();
			}else if(CODETYPE == "commodity"){
				formObj.cmdt_cd.value=""; 
				formObj.cmdt_nm.value="";
			}else if(CODETYPE == "trdpCode_cs"){
				formObj.cust_cd.value=""; 
				formObj.cust_nm.value="";//loc_nm	
			}else if(CODETYPE == "trdpCode_pu"){
				formObj.pu_loc_cd.value="";
				formObj.pu_loc_cd.focus();
			}else if(CODETYPE == "trdpCode_door"){
				formObj.door_loc_cd.value=""; 
				formObj.door_loc_nm.value="";
			}else if(CODETYPE == "booking_s"){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "bkg_no","", 0); 
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "intg_bl_seq","", 0);
			}else if(CODETYPE == "trdpCode_sh"){
				formObj.shpr_trdp_cd.value=""; 
				formObj.shpr_nm.value="";//loc_nm				
			}else if(CODETYPE == "trdpCode_co"){
				formObj.cnee_trdp_cd.value=""; 
				formObj.cnee_nm.value="";//loc_nm						
			}
		}
	}else{
		//Error occurred!
		alert(getLabel('FMS_COM_ERR001'));
	}
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
//		  if(collTxt[i].name != "f_usr_id" && collTxt[i].name != "f_ofc_cd"){
//	  			collTxt[i].value = "";
//			}
			if(!(collTxt[i].name == "f_usr_id" || collTxt[i].name == "f_ofc_cd" || 
					collTxt[i].name == "grs_wgt_ut_cd" || collTxt[i].name == "grs_wgt_ut_cd1" ||
					collTxt[i].name == "meas_ut_cd" || collTxt[i].name == "meas_ut_cd1")){
				collTxt[i].value="";
			}
	  }           
	}
	setSelection();
	frm1.type[0].selected=true;
	frm1.pck_ut_cd[0].selected=true;
	frm1.post_dt.value=TODAY;
	sheetObj2.RemoveAll();
	docObjects[2].RemoveAll();
	formObj.sls_usrid.value=formObj.f_usr_id.value;
	formObj.sls_ofc_cd.value=formObj.f_ofc_cd.value;
	formObj.opr_usrid.value=formObj.f_usr_id.value;
	//LHK, 20131028 setPost_date(event_flag) 추가 비교 로직으로 인해 저장 후 org_post_dt reset
	setBlock_dt();
}
//필수값 체크
function checkAll(){
	var formObj=document.frm1;
	var rtnVal=true;
	if(frm1.ofc_cd.value == ""){
//		alert("[Office] is mandatory field. ");
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_OFFICE_CD'));	
		frm1.ofc_cd.focus();
		rtnVal=false;
	}else if(frm1.cust_cd.value == ""){
//		alert("[Customer] is mandatory field. ");
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CUST'));	
		frm1.cust_cd.focus();
		rtnVal=false;
	}else if(frm1.post_dt.value == ""){
//		alert("[Post Date] is mandatory field. ");
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_POSTDT'));	
		frm1.post_dt.focus();
		rtnVal=false;
	}else if(checkInputVal(frm1.cntr_info.value, 0, 200, "T", 'Container Information')!='O'){
		frm1.cntr_info.focus();
		rtnVal=false;
	}else if(checkInputVal(frm1.int_memo.value, 0, 200, "T", getLabel('FMS_COM_MARK'))!='O'){
		frm1.int_memo.focus();
		rtnVal=false;
	}else if(checkInputVal(frm1.ext_memo.value, 0, 200, "T", getLabel('DESC'))!='O'){
		frm1.ext_memo.focus();
		rtnVal=false;
	} else if(checkInputVal(frm1.memo_txt.value, 0, 200, "T", getLabel('FMS_COM_INTERNAL_MEMO'))!='O'){
		frm1.memo_txt.focus();
		rtnVal=false;
	} 
	if(frm1.lod_tm.value != ""){
		// #4149 [AIT] Other BL Entry not opening (Null)
		if(!checkInType(frm1.lod_dt_tm.value, "DD")){
			alert(getLabel('FMS_COM_ALT157') + "\n - " + getLabel('FMS_COD_LOADDT'));	
			frm1.lod_dt_tm.focus();
			rtnVal=false;
		}		
	}
	if(frm1.feta_tm.value != ""){
		// #4149 [AIT] Other BL Entry not opening (Null)
		if(!checkInType(frm1.feta_dt_tm.value, "DD")){
			alert(getLabel('FMS_COM_ALT157') + "\n - " + getLabel('FMS_COD_FINALETA'));	
			frm1.feta_dt_tm.focus();
			rtnVal=false;
		}		
	}
	
	var sheetObj2=docObjects[1];
	for(var i=1; i< docObjects[1].LastRow() + 1; i++){
		if(sheetObj2.GetCellValue(i, 'ibflag')=="I"){
			if(sheetObj2.GetCellValue(i, 'cntr_no')== "" && sheetObj2.GetCellValue(i, 'cntr_tpsz_cd')== ""
				&& sheetObj2.GetCellValue(i, 'seal_no1')== "" && sheetObj2.GetCellValue(i, 'cgo_pck_qty')== "0"){
				alert(getLabel('SUP_COM_ALT003'));	
				sheetObj2.SelectCell(i, 'cntr_no');
				rtnVal=false;
			}
		}
	}
	return rtnVal;	
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST_NAME");
		}else if(type == "COMMODITY"){
			doWork("COMMODITY_POPLIST");
		}else if(type == "LOC_POL"){
			openPopUp('POL_POPLIST_NAME',obj);
		}else if(type == "LOC_POD"){
			openPopUp('POD_POPLIST_NAME',obj);
		}else if(type == "LOC_DEST"){
			openPopUp('F_DEST_DATE_NAME',obj);
		}else if(type == "LOC_PICKUP"){
			doWork('PICKUP_LOC_POPLIST_NAME',obj);
		}else if(type == "LOC_DOOR"){
			doWork('DOOR_POPLIST_NAME',obj);
		}else if(type == "COMMODITY_NAME"){
			doWork("COMMODITY_NAME");
		}else if(type == "SHIPPER"){
			doWork("SHIPPER_POPLIST_NAME");
		}else if(type == "CONSIGNEE"){
			doWork("CONSIGNEE_POPLIST_NAME");			
		}
	}
}
//Invoice NO 중복체크를 한다.
function checkRefNo(){
	var formObj=document.frm1;
	if(formObj.ref_no.value != ""){
		if(formObj.ref_no.value != formObj.old_ref_no.value){
			ajaxSendPost(checkRefDup, 'reqVal', '&goWhere=aj&bcKey=checkRefDup&ref_no='+formObj.ref_no.value, './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * REF NO 중복체크
 */
function checkRefDup(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				//alert("Ref. No Duplicate!! ");
				alert(getLabel('FMS_COM_ALT008') + "\n - " + getLabel('FMS_COD_MISCFILNO'));	
				formObj.ref_no.value=formObj.old_ref_no.value;
				formObj.ref_no.select();
			}
		}
	}
}

function getSelectedFiles(){
	return docObjects[2];
}

var ORG_BLOCK_DT=""; 		//MAX(BLOCK_DT)
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
 *  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
 **/
function setBlock_dt(){
	var formObj=document.frm1;
	
	//2016.04.18 C.W.Park Modified
	//#52109 office별 block_date 확인
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	var param = formObj.ofc_cd.options[formObj.ofc_cd.selectedIndex].text;
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt&searchOfcCd=' + param, './GateServlet.gsl');
	
 	if(NEXT_BLOCK_DT != "") {
 		var nextBlockDtYMD=NEXT_BLOCK_DT.replaceAll("-", "");														//NEXT_BLOCK_DT  12-01-2013
			nextBlockDtYMD=nextBlockDtYMD.substring(4,8)+nextBlockDtYMD.substring(0,2)+nextBlockDtYMD.substring(2,4);	//nextBlockDtYMD 20131201
			ORG_BLOCK_DT=addDate('d', -1, nextBlockDtYMD, "");
			ORG_BLOCK_DT=ORG_BLOCK_DT.substring(4,6) + "-" + ORG_BLOCK_DT.substring(6,8) + "-" + ORG_BLOCK_DT.substring(0,4);
		//post_dt 와 block_dt 비교
		//fromDate > toDate true
		if(formObj.oth_seq.value == ""){
			if(compareTwoDate(NEXT_BLOCK_DT, formObj.post_dt.value)){
	 			formObj.post_dt.value=NEXT_BLOCK_DT;
	 		}
			formObj.org_post_dt.value=formObj.post_dt.value;
		}	
 	}
}
function checkPostDate(obj){
	var formObj=document.frm1;
	var post_dt=obj.value;
	//OnChange 시에 check 함
	if(post_dt == formObj.org_post_dt.value){
		return;
	}
	
	//2016.04.18 C.W.Park Added
	//#52109 office별 block_date 확인을 위한 로직 변경.
//	//이벤트 발생시점에 max_blck_date 획득
//	setBlock_dt();
	
	//Post Date 가 변경되는 경우에 NEXT_BLOCK_DT 보다 작으면 warnning massage 띄워줌
	if(NEXT_BLOCK_DT != "") {
		if(compareTwoDate(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			alert(getLabel2('SUP_COM_ALT007',new Array(ORG_BLOCK_DT)));	//The Post Date must be later than the block date (@)";
			formObj.post_dt.value=formObj.org_post_dt.value;
			formObj.post_dt.select();
			return false;
		}
	}
	
	setCtrbMgn(formObj.cust_cd.value);
}
function getMaxBlockOrJnrNextDt(reqVal){
 	var doc=getAjaxMsgXML(reqVal);
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			NEXT_BLOCK_DT=doc[1];
 			NEXT_BLOCK_DT=NEXT_BLOCK_DT.substring(4,6) + "-" + NEXT_BLOCK_DT.substring(6,8) + "-" + NEXT_BLOCK_DT.substring(0,4);
 		}else{
			NEXT_BLOCK_DT="";
		}
 	}
}
function checkOthInvReq(reqVal){
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

function refreshAjaxTab(url){
	var formObj=document.frm1;
	doShowProcess();
	$.ajax({
		   type: "POST",
		   url: "./OTH_OPR_0010AJ.clt?f_cmd="+getParam(url,"f_cmd")+"&ref_no="+getParam(url,"ref_no")+"&oth_seq="+getParam(url,"oth_seq"),
		   dataType: 'xml',
		   success: function(data){
			   setFieldValue( formObj.oth_seq, $('oth_seq',data).text());
			   setFieldValue( formObj.old_ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.f_sts_cd, $('sts_cd',data).text());
			   setFieldValue( formObj.org_post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.h_ofc_cd, $('ofc_cd',data).text());
			   setFieldValue( formObj.type, $('type',data).text());
			   setFieldValue( formObj.mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.hbl_no, $('hbl_no',data).text());
			   setFieldValue( formObj.vsl_flt, $('vsl_flt',data).text());
			   setFieldValue( formObj.cust_cd, $('cust_cd',data).text());
			   setFieldValue( formObj.cust_nm, $('cust_nm',data).text());
			   setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.shpr_nm, $('shpr_nm',data).text());
			   setFieldValue( formObj.cnee_nm, $('cnee_nm',data).text());
			   setFieldValue( formObj.cmdt_cd, $('cmdt_cd',data).text());
			   setFieldValue( formObj.cmdt_nm, $('cmdt_nm',data).text());
			   setFieldValue( formObj.loc_nm, $('loc_nm',data).text());
			   setFieldValue( formObj.cntr_info, $('cntr_info',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.fnl_dest_loc_cd, $('fnl_dest_loc_cd',data).text());
			   setFieldValue( formObj.fnl_dest_loc_nm, $('fnl_dest_loc_nm',data).text());
			   setFieldValue( formObj.pu_loc_cd, $('pu_loc_cd',data).text());
			   setFieldValue( formObj.pu_loc_nm, $('pu_loc_nm',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.grs_wgt_k, $('grs_wgt_k',data).text());
			   setFieldValue( formObj.grs_wgt_l, $('grs_wgt_l',data).text());
			   setFieldValue( formObj.meas_m, $('meas_m',data).text());
			   setFieldValue( formObj.meas_f, $('meas_f',data).text());
			   setFieldValue( formObj.post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.int_memo, $('int_memo',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.feta_dt_tm, $('feta_dt_tm',data).text());
			   setFieldValue( formObj.door_loc_cd, $('door_loc_cd',data).text());
			   setFieldValue( formObj.door_loc_nm, $('door_loc_nm',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.opr_usrid, $('opr_usrid',data).text());
			   setFieldValue( formObj.ext_memo, $('ext_memo',data).text());
			   setFieldValue( formObj.ctrb_ofc_cd, $('ctrb_ofc_cd',data).text());
			   setFieldValue( formObj.ctrb_dept_cd, $('ctrb_dept_cd',data).text());
			   setFieldValue( formObj.ctrb_ratio_yn, $('ctrb_ratio_yn',data).text());
			   setFieldValue( formObj.ctrb_mgn, $('ctrb_mgn',data).text());
			   
			   doBtnAuthority(attr_extension);
			   
			   setupPage();
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}

function checkRatioValid(){
	var formObj = document.frm1;
	
	if (formObj.ctrb_ratio_yn.value == "Y"){
		if (Number(removeComma(formObj.ctrb_mgn.value)) > 50) {
			alert(getLabel2('FMS_COM_ALT076',new Array("50")));
			formObj.ctrb_mgn.value = "";
			formObj.ctrb_mgn.focus();
			return;
		}
	}
}

function clickCtrbRatioYn(){
	var formObj = document.frm1;
	
	frm1.ctrb_mgn.value = '';
	frm1.ctrb_mgn.focus();
}


//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
function chkOthSalesModiTms(flag){
	var returnVal=true;
	var formObj=document.frm1; 
	var oth_seq =  formObj.oth_seq.value;
 	 
	if (flag == "VIEW"){ // 조회시 
		ajaxSendPost(getOthSalesViewModiTms, 'reqVal', '&goWhere=aj&bcKey=searchOthSalesModiTms&oth_seq='+oth_seq, './GateServlet.gsl');  
	}else{ // 수정 삭제시 
		ajaxSendPost(getOthSalesModiTms, 'reqVal', '&goWhere=aj&bcKey=searchOthSalesModiTms&oth_seq='+oth_seq, './GateServlet.gsl');
		//alert(vOthSalesModiTms + " "+frm1.trx_modi_tms.value);
		if (vOthSalesModiTms != frm1.trx_modi_tms.value) {
			returnVal=false;
		}
	 	 
	 	if(!returnVal){
	 		// Check 이 변경된 경우
			alert(getLabel('ACC_MSG147')); 
	 	}
		return returnVal;
	}
}
function getOthSalesViewModiTms(reqVal){
	vOthSalesModiTms='';
	var doc=getAjaxMsgXML(reqVal);
	// alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			frm1.trx_modi_tms.value=doc[1];
		}
	}
}
function getOthSalesModiTms(reqVal){
	vOthSalesModiTms='';
	var doc=getAjaxMsgXML(reqVal);
	// alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			vOthSalesModiTms=doc[1];
		}
	}
}
	
/**
 * Sales Man 자동 설정 
 **/
function setSalesMan(s_code) {
	var formObj=document.frm1;
	ajaxSendPost(searchTradePartnerReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+s_code + "&user_id="+formObj.f_usr_id.value, "./GateServlet.gsl");
}

function searchTradePartnerReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var salesPs=doc[1].split('@@^');
			formObj.sls_usrid.value=salesPs[0];//sls_usrid
			formObj.sls_ofc_cd.value=salesPs[2];//sls_ofc_cd
		}
	}
}

var chkRoleFlag = false;
function chkRoleOthInv(refNo){
	var formObj=document.frm1
	var refNo  = formObj.ref_no.value;

	if(h_ref_no !=  refNo){
		ajaxSendPost(getRoleInvt, 'reqVal', '&goWhere=aj&bcKey=checkRoleInvOthAj&user_id='+formObj.user_id.value+"&ref_no="+refNo, './GateServlet.gsl');
	}else{
		return true;
	}
	
	return chkRoleFlag;
}

function getRoleInvt(reqVal){
	var formObj=document.frm1
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='NOT'){
				chkRoleFlag=false;
				//Ref. No. is duplicate.
				alert(getLabel('FMS_COM_ALT094'));
				formObj.ref_no.value = formObj.sel_ref_no.value;
				formObj.ref_no.focus();
			}
			else{
				chkRoleFlag=true;
			}
		}
	}	
}

function creditRoleCheck(){
	var formObj=document.frm1;
	var s_type = "trdpCode";
	var s_code = formObj.cust_cd.value;
	
	ajaxSendPost(actShprTrdpReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
}

function actShprTrdpReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){		
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
			try {creditOver=false;}catch(e){};
			
			if(masterVals[5] == 'KO'){
				
			} else if(masterVals[5] == 'CR'){
				var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
				var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
				var balLmtAmt=crdLmtAmt - curLmtAmt;
				var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
				var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
				
				//[20141217 YJW] #46708
				if(crdLmtAmt > 0) {
					if(overDueAmt > 0 && balLmtAmt < 0  ){
						try {creditOver=true;}catch(e){};
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
							
					} else if (balLmtAmt < 0  ){
						try {creditOver=true;}catch(e){};
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";

					} else if (overDueAmt > 0 ) {
						try {creditOver=false;}catch(e){};
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
					} else {
						try {creditOver=false;}catch(e){};
						formObj.cust_cd.style.color= "#000000";
						formObj.cust_nm.style.color= "#000000";
					}
				} else {
					try {creditOver=false;}catch(e){};
					formObj.cust_cd.style.color= "#000000";
					formObj.cust_nm.style.color= "#000000";
				}
			} else {
				try {creditOver=false;}catch(e){};
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					formObj.cust_cd.style.color= "#ff0000";
					formObj.cust_nm.style.color= "#ff0000";
				} else {
					formObj.cust_cd.style.color= "#000000";
					formObj.cust_nm.style.color= "#000000";
				}
			}
		}
	}
}

//#873 [STARWAY] LOAD DATE, DATE OF RECEIPT FIELDS TO BE ADDED
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

//#1600 [STARWAY] MISC. OPERATION ENTRY, MBL, HBL, CONTAINER # DUPLICATE VALIDATION
var blDupFlag = false;
function checkBlDup(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){		
		if(typeof(doc[1])!='undefined'){
			if(doc[1] == 'Y'){
				
				var bl_no = "";
				
				if(formObj.mbl_no.value != "" && formObj.hbl_no.value != ""){
					bl_no = formObj.hbl_no.value;
				}else if(formObj.mbl_no.value != "" && formObj.hbl_no.value == ""){
					bl_no = formObj.mbl_no.value;
				}else if(formObj.mbl_no.value == "" && formObj.hbl_no.value != ""){
					bl_no = formObj.hbl_no.value;
				}
				
				if (confirm(getLabel2('SUP_COM_ALT009',new Array(bl_no)))) {
					blDupFlag = false;
				}else{
					blDupFlag = true;
				}
			}else{
				if (confirm(getLabel(saveMsg))) {
					blDupFlag = false;
				}else{
					blDupFlag = true;
				}
			}
		}
	}
}

//#2586 [BNX US] COD, CREDIT HOLD ACCOUNTS NO WARNING
var copyFlg = false;
var copyAltFlg = false;
var codType = "";
function chkCodOnLoad(type, value, cFlg){
	copyFlg = cFlg;
	codType = type;
	
	ajaxSendPost(fnCodOnLoad, "reqVal", "&goWhere=aj&bcKey=chkCodOnLoad&s_tp_code="+value, "./GateServlet.gsl");
	
	copyFlg = false;
}
function fnCodOnLoad(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		
		var rtnValAry=doc[1].split("|");
		if(codType == "shipper"){
			if(rtnValAry[0]==''){
				//formObj.shpr_trdp_cd.focus();
			}else{
				formObj.shpr_trdp_cd.style.color= "#000000";
				formObj.shpr_nm.style.color= "#000000";
				
				if(rtnValAry[13] == 'KO'){
					
				} else if(rtnValAry[13] == 'CR'){
					var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
					var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
					var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
					
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0){
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM008', objArr));
								copyAltFlg = true;
							}
							formObj.shpr_trdp_cd.style.color= "#ff0000";
							formObj.shpr_nm.style.color= "#ff0000";
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM006', objArr));
								copyAltFlg = true;
							}
							formObj.shpr_trdp_cd.style.color= "#ff0000";
							formObj.shpr_nm.style.color= "#ff0000";
						} else if (overDueAmt > 0 ) {
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM007', objArr));
								copyAltFlg = true;
							}
							formObj.shpr_trdp_cd.style.color= "#ff0000";
							formObj.shpr_nm.style.color= "#ff0000";
						} else {
							formObj.shpr_trdp_cd.style.color= "#000000";
							formObj.shpr_nm.style.color= "#000000";
						}
					} else {
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_nm.style.color= "#000000";
					}
					
				} else if(rtnValAry[13] == 'CH'){
					if(copyFlg && !copyAltFlg){
						alert(getLabel('COM_FRT_CFM005'));
						copyAltFlg = true;
					}
					formObj.shpr_trdp_cd.style.color= "#ff0000";
					formObj.shpr_nm.style.color= "#ff0000";
				} else if(rtnValAry[13] == 'CO'){
					if(copyFlg && !copyAltFlg){
						alert(getLabel('COM_FRT_ALT001'));
						copyAltFlg = true;
					}
					formObj.shpr_trdp_cd.style.color= "#ff0000";
					formObj.shpr_nm.style.color= "#ff0000";
				} else {
					formObj.shpr_trdp_cd.style.color= "#000000";
					formObj.shpr_nm.style.color= "#000000";
				}
			}
			
		}else if(codType == "consignee"){
			
			formObj.cnee_nm.style.color= "#000000";
			formObj.cnee_trdp_cd.style.color= "#000000";
			
			if(rtnValAry[0]==''){
				//formObj.cnee_trdp_cd.focus();
			}else{
				if(rtnValAry[13] == 'KO'){
					
				} else if(rtnValAry[13] == 'CR'){
					var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
					var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
					var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
					
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0  ){
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM008', objArr));
								copyAltFlg = true;
							}
							formObj.cnee_nm.style.color= "#ff0000";
							formObj.cnee_trdp_cd.style.color= "#ff0000";
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM006', objArr));
								copyAltFlg = true;
							}
							formObj.cnee_nm.style.color= "#ff0000";
							formObj.cnee_trdp_cd.style.color= "#ff0000";
						} else if (overDueAmt > 0 ) {
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM007', objArr));
								copyAltFlg = true;
							}
							formObj.cnee_nm.style.color= "#ff0000";
							formObj.cnee_trdp_cd.style.color= "#ff0000";
						} else {
							formObj.cnee_nm.style.color= "#000000";
							formObj.cnee_trdp_cd.style.color= "#000000";
						}
					} else {
						formObj.cnee_nm.style.color= "#000000";
						formObj.cnee_trdp_cd.style.color= "#000000";
					}
					
				} else if(rtnValAry[13] == 'CH'){
					if(copyFlg && !copyAltFlg){
						alert(getLabel('COM_FRT_CFM005'));
						copyAltFlg = true;
					}
					formObj.cnee_nm.style.color= "#ff0000";
					formObj.cnee_trdp_cd.style.color= "#ff0000";
				} else if(rtnValAry[13] == 'CO'){
					if(copyFlg && !copyAltFlg){
						alert(getLabel('COM_FRT_ALT001'));
						copyAltFlg = true;
					}
					formObj.cnee_nm.style.color= "#ff0000";
					formObj.cnee_trdp_cd.style.color= "#ff0000";
				} else {
					formObj.cnee_nm.style.color= "#000000";
					formObj.cnee_trdp_cd.style.color= "#000000";
				}
			}
		}else if(codType == "cust"){
			if(rtnValAry[13] == 'KO'){
				
			} else if(rtnValAry[13] == 'CR'){
				var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
				var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
				var balLmtAmt=crdLmtAmt - curLmtAmt;
				var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
				var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
				
				if(crdLmtAmt > 0) {
					if(overDueAmt > 0 && balLmtAmt < 0  ){
						var objArr=new Array();
						objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
						
						if(copyFlg && !copyAltFlg){
							alert(getLabel2('COM_FRT_CFM008', objArr));
							copyAltFlg = true;
						}
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
					} else if (balLmtAmt < 0  ){
						var objArr=new Array();
						objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
						if(copyFlg && !copyAltFlg){
							alert(getLabel2('COM_FRT_CFM006', objArr));
							copyAltFlg = true;
						}
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
					} else if (overDueAmt > 0 ) {
						try {creditOver=false;}catch(e){};
						var objArr=new Array();
						objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
						if(copyFlg && !copyAltFlg){
							alert(getLabel2('COM_FRT_CFM007', objArr));
							copyAltFlg = true;
						}
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
					} else {
						try {creditOver=false;}catch(e){};
						formObj.cust_cd.style.color= "#000000";
						formObj.cust_nm.style.color= "#000000";
					}
				} else {
					try {creditOver=false;}catch(e){};
					formObj.cust_cd.style.color= "#000000";
					formObj.cust_nm.style.color= "#000000";
				}
				
			} else if(rtnValAry[13] == 'CO'){
				try {creditOver=false;}catch(e){};
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.cust_cd.style.color= "#ff0000";
				formObj.cust_nm.style.color= "#ff0000";
			}
		}
	}
}

var obl_decimal_len = "";
function setDecimalLen(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		obl_decimal_len = doc[1];
	}else{
		obl_decimal_len = "3";
	}
}

//#6798 [FULLTRANS] CONTAINER PASTE FUNCTION IN B/L ENTRY SCREEN
function sheet2_OnMouseDown(Button, Shift, X, Y) {
	var sheetObj1=docObjects[1];
    var Row=sheetObj1.MouseRow();
  	if(Row == 0){
  		sheetObj1.SetActionMenu("Header Setting Save|Header Setting Reset");
  	}else{
  		sheetObj1.SetActionMenu("");
  	}
}
//OFVFOUR-7707[Matrix] Restriction to block creating HBL in case the credit of customer exceeds credit limit
function chkCusCredit(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){		
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
			try {creditOver_flg=false;}catch(e){};
			
			if(masterVals[5] == 'KO'){
				
			} else if(masterVals[5] == 'CH'){
				try {creditOver_flg=true;}catch(e){};
				formObj.cust_cd.style.color= "#ff0000";
				formObj.cust_nm.style.color= "#ff0000";
				
			} else if(masterVals[5] == 'CR'){
				var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
				var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
				var balLmtAmt=crdLmtAmt - curLmtAmt;
				var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
				var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
				
				//[20141217 YJW] #46708
				if(crdLmtAmt > 0) {
					if(overDueAmt > 0 && balLmtAmt < 0  ){
						try {creditOver_flg=true;}catch(e){};
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
							
					} else if (balLmtAmt < 0  ){
						try {creditOver_flg=true;}catch(e){};
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";

					} else if (overDueAmt > 0 ) {
						try {creditOver_flg=false;}catch(e){};
						formObj.cust_cd.style.color= "#ff0000";
						formObj.cust_nm.style.color= "#ff0000";
					} else {
						try {creditOver_flg=false;}catch(e){};
						formObj.cust_cd.style.color= "#000000";
						formObj.cust_nm.style.color= "#000000";
					}
				} else {
					try {creditOver_flg=false;}catch(e){};
					formObj.cust_cd.style.color= "#000000";
					formObj.cust_nm.style.color= "#000000";
				}
			} else {
				try {creditOver_flg=false;}catch(e){};
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					formObj.cust_cd.style.color= "#ff0000";
					formObj.cust_nm.style.color= "#ff0000";
				} else {
					formObj.cust_cd.style.color= "#000000";
					formObj.cust_nm.style.color= "#000000";
				}
			}
		}
	}
}
//OFVFOUR-7707[Matrix] Restriction to block creating HBL in case the credit of customer exceeds credit limit
function chkCredit(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){		
		if(typeof(doc[1]) !="undefined"){
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');			
			if(masterVals[4] == "Y"){
				frm1.f_credit_flg.value ="Y";
			}
		}
	}
}

//OFVFOUR-7919 [BNX-TOR] Question for total profit amount
var saleType = "N";
function chkSaleTypeValidate(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" && doc[1] == "Y" ){
		saleType = "Y";
	}
}
//OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN
function setUserTeamInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		var rtnArr = doc[1].split('@@;');
		var teamInfo = rtnArr[0].split('@@^');
		frm1.team_cd.value=teamInfo[0];
	}else{
		frm1.team_cd.value="";
	}
}
//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
function setOverAmtCurrFlg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		TP_OVER_AMT_FLG = doc[1];
	}else{
		TP_OVER_AMT_FLG = "";
	}
}