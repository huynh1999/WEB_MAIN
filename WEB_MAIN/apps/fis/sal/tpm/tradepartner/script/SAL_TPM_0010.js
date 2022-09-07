var rtnary=new Array(1);
var callBackFunc = "";
var popupId = "";
var phone_check = 0;
var sybcBlAddr = "";
var isModiTmsOk = false;
//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
var personOpt ="";
//#6797 [GREAT LUCK] Make CLM as default by indicating checkmark when creating Trade Partner with TP type is 'Customer
var autoCheckClm=false;
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){
		return;
	}
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj3=docObjects[2];
	var sheetObj4=docObjects[3];
	var sheetObj5=docObjects[4];
	var sheetObj6=docObjects[5];
	//fuel surcharge, security charge
	var sheetObj7=docObjects[6];
	var sheetObj8=docObjects[7];
	var sheetObj9=docObjects[8];
    var formObj=document.frm1;
	var strTrdpCd=formObj.s_trdp_cd.value;
    switch(srcName) {
		case "SEARCHLIST":
			if(formObj.s_trdp_cd.value.length>0){
				submitForm(SEARCHLIST);		
			}else{
				//Please check Trade Partner Code!
				alert(getLabel('FMS_COM_ALT014'));
				formObj.s_trdp_cd.focus();
			}
			break;
		case "REMOVE1":
			var row = sheetObj3.LastRow() +1;
       		for ( var i=1 ; i < row ; i++ ) {
       			if ( sheetObj3.GetCellValue(i, 0) == "1" ) {
					sheetObj3.SetRowHidden(i,1);
				}
			}
       		break;
		case "REMOVE3":
			var row = sheetObj1.LastRow() +1;
       		for ( var i=1 ; i < row ; i++ ) {
       			if ( sheetObj1.GetCellValue(i, 0) == "1" ) {
					sheetObj1.SetRowHidden(i,1);
				}
			}
       		break;
		case "REMOVE4":
			var row = sheetObj2.LastRow() +1;
       		for ( var i=1 ; i < row ; i++ ) {
       			if ( sheetObj2.GetCellValue(i, 0) == "1" ) {
					sheetObj2.SetRowHidden(i,1);
				}
			}
       		break;
		case "NEW":
       		// displayClear();
			// break;
			doShowProcess();
			var currLocUrl=this.location.href;
				currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
				currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
			
				//parent.mkNewFrame(formObj.screen_title.value, currLocUrl);
				window.location.href = currLocUrl
			
			break;
		case "ADD":
			checkDeliveryTime();
			if(!checkTrdpUse()){
				break;
			}
			if(!fncInputCheck()){
				break;
			}else if(!validateForm(formObj)){
				break;
			}else{
				var s_trdp_cd=formObj.hidden_trdp_cd.value;
	       		formObj.f_CurPage.value=1;
	       		if ( s_trdp_cd != "" ) {
	       			formObj.f_cmd.value=MODIFY;
	       		}else {
	       			formObj.f_cmd.value=ADD;
       				//ajaxSendPost(chkBizNo, 'reqVal', '&goWhere=aj&bcKey=getBizNo&callId=O&biz_no='+ formObj.biz_no.value, './GateServlet.gsl');
	       			//if(formObj.f_biz_no.value=="Y"){
	       			//}else{
					//	alert("Duplicate TAX ID ");
					//	return;
					//}
		        }
	       		//저장후 조회하기 위해 해당 Object가 저장되었는지 Flag값을 세팅함.
	       		rotTot=sheetObj3.RowCount();
	       		for(var i=1; i < rotTot+1; i++){
	       			if(sheetObj3.GetCellValue(i, 'ibflag1')=='D'){
	       				obj1Work=true;
	       				break;
	       			}
	       		}
	       		/***********************************/
	       		phone_check = 0;
	       		rotTot=sheetObj1.RowCount();
	       		for(var i=1; i < rotTot+1; i++){
	       			var phone_no_var = sheetObj1.GetCellValue(i, 'pic_phn');
	       			var cntc_pson_seq_var = sheetObj1.GetCellValue(i, 'cntc_pson_seq');
	       			var rgst_ofc_cd_var = sheetObj1.GetCellValue(i, 'rgst_ofc_cd');
	       			var trdp_cd_var = sheetObj1.GetCellValue(i, 'trdp_cd');
	       			var pic_mphn_var = sheetObj1.GetCellValue(i, 'pic_mphn');
	       			var flag = sheetObj1.GetCellValue(i, 'ibflag4');
	       			if(phone_no_var ==''){
	       			}
	       			if(phone_no_var != '' || pic_mphn_var != '' ){ //전번 없는것은 pass
	       				if(flag == 'I' || flag == 'U'){ // Insert와 Update 데이터만 고려
		       				ajaxSendPost(chkTrdpPhoneDupl, 'reqVal', '&goWhere=aj&bcKey=checkDupPhone&pic_phn='+phone_no_var+'&cntc_pson_seq='+cntc_pson_seq_var+'&rgst_ofc_cd='+rgst_ofc_cd_var+'&trdp_cd='+trdp_cd_var+'&flag='+flag+'&pic_mphn='+pic_mphn_var, './GateServlet.gsl');	
	       				}
	       			}
	       		}
	       		if(phone_check > 0){
	       			if(!confirm(getLabel('FMS_COM_DUP_PHONE'))){
	       			    return;
	       			}
	       		}
	       		/***********************************/
	       		rotTot=sheetObj2.RowCount();
	       		for(var i=1; i < rotTot+1; i++){
	       			if(sheetObj2.GetCellValue(i, 'bank_cd') == ""){
	       				alert(getLabel('FMS_COM_ALT001') + "\n -" + getLabel('SAL_COD_BAIF'));
	       				goTabSelect("03");
	       				sheetObj2.SelectCell(i,'bank_cd');
	       				return; 
	       			}
	       			if(sheetObj2.GetCellValue(i, 'acct_no') == ""){
	       				alert(getLabel('FMS_COM_ALT001') + "\n -" + getLabel('SAL_COD_BAIF'));
	       				goTabSelect("03");
	       				sheetObj2.SelectCell(i,'acct_no');
	       				return; 
	       			}
	       			if(sheetObj2.GetCellValue(i, 'ibflag3')=='U'||sheetObj2.GetCellValue(i, 'ibflag3')=='I'||sheetObj2.GetCellValue(i, 'ibflag3')=='D'){
	       				obj4Work=true;
	       				break;
	       			}
	       		}
	       		rotTot=sheetObj6.RowCount();
	       		for(var i=1; i < rotTot+1; i++){
	       			if(sheetObj6.GetCellValue(i, 'ibflag6')=='U'||sheetObj6.GetCellValue(i, 'ibflag6')=='I'||sheetObj6.GetCellValue(i, 'ibflag6')=='D'){
	       				obj6Work=true;
	       				break;
	       			}
	       		}
	       		//2012.06.19 fuel surcharge
	       		rotTot = sheetObj7.LastRow() +1;
	       		for(var i=1; i < rotTot; i++){
	       			if(sheetObj7.GetCellValue(i, 'ibflag7')=='U'||sheetObj7.GetCellValue(i, 'ibflag7')=='I'||sheetObj7.GetCellValue(i, 'ibflag7')=='D'){
	       				obj7Work=true;
	       				break;
	       			}
	       		}
	       		//2012.06.19 security charge
	       		rotTot = sheetObj8.LastRow() +1;
	       		for(var i=1; i < rotTot; i++){
	       			if(sheetObj8.GetCellValue(i, 'ibflag8')=='U'||sheetObj8.GetCellValue(i, 'ibflag8')=='I'||sheetObj8.GetCellValue(i, 'ibflag8')=='D'){
	       				obj8Work=true;
	       				break;
	       			}
	       		}
				rotTot = sheetObj9.LastRow() + 1;
				for (var i = 1; i < rotTot; i++) {
					if (sheetObj9.GetCellValue(i, 'ibflag9') == 'U'
							|| sheetObj9.GetCellValue(i, 'ibflag9') == 'I'
							|| sheetObj9.GetCellValue(i, 'ibflag9') == 'D') { //체크 sheetObj8 -> sheetObj9
						obj9Work = true;
						break;
					}
				}
	       		var rep_chk_cnt = 0;
	       		rotTot=sheetObj1.RowCount();
	       		for(var i=1; i < rotTot+1; i++){
	       			if(sheetObj1.GetCellValue(i, "rep_flg") == '1'){
	       				rep_chk_cnt++;
	       			}
	       		}
	       		if(rep_chk_cnt > 1){
	       			alert(getLabel('FMS_COM_ALT089'));
	       			return;
	       		}
	       		// Trade Partner Code Duplication Check
	       		if(formObj.f_cmd.value == ADD){
	       			ajaxSendPost(chkTrdpCdDupl, 'reqVal', '&goWhere=aj&bcKey=chkTrdpCdDupl&trdp_cd='+frm1.i_trdp_cd.value, './GateServlet.gsl');
	       		}
		       	if(trdpCdDupl == "Y"){
		       		alert(getLabel('FMS_COM_ALT008')+ "\n" + getLabel('FMS_COD_CODE'));
					formObj.i_trdp_cd.focus();
					break;
		       	}
		       	//#3638 [CLA] Trade Partner duplicated creation validation 강화
				var engNmArr = frm1.eng_nm.value.trim().split(" ");
				var engAddrArr = frm1.eng_addr.value.trim().split(" ");
				var engNm = "";
				var engAddr = "";
				for (var i = 0; i<3; i++){
					if (engNmArr[i] != null){
						engNm += engNmArr[i] + " ";
					}
					if (engAddrArr[i] != null){
						engAddr += engAddrArr[i] + " ";
					}					
				}
				
				ajaxSendPost(getTrdpCheck, 'reqVal', '&goWhere=aj&bcKey=getTrdpCheck&eng_nm='+engNm.trim()+"&eng_addr="+engAddr.trim(), './GateServlet.gsl');
				//#4265  save and leaving the page
//				if (typeof warning === "function") { 
//					warning.changed = false;
//				}
	       		
			}
			break;
		case "ROWADD1":
			if ( formObj.i_trdp_cd.value != "" ) {
	            rtnary=new Array(1);
		  		var s_trdp_cd=formObj.i_trdp_cd.value;
		  		rtnary[0]="I";
				rtnary[1]=s_trdp_cd;
				callBackFunc = "ROWADD1";
	  	        modal_center_open('./SAL_TPM_0011.clt', rtnary, 480,327,"yes");
			}
			break;
		case "ROWADD2":
			if ( formObj.i_trdp_cd.value != "" ) {
				sheetObj4.DataInsert();
			}
			break;
		case "ROWADD3":
//			if ( formObj.i_trdp_cd.value != "" ){
				var intRows = sheetObj1.LastRow() +1;
   				var Row=sheetObj1.DataInsert(intRows);
   				sheetObj1.SetCellValue(Row, "sheet4","sheet4");
//			}
   			break;
		case "ROWADD4":
			if ( formObj.i_trdp_cd.value != "" ) {
				var intRows=sheetObj2.LastRow()+1;
   				var Row = sheetObj2.DataInsert(intRows);
   				sheetObj2.SetCellValue(Row, 6,"sheet3");
			}
			break;
		case "ROWADD6":
			if ( formObj.i_trdp_cd.value != "" ) {
				var intRows=sheetObj6.LastRow()+1;
				var Row=sheetObj6.DataInsert(intRows);
				sheetObj6.SetCellValue(Row, "sheet6","sheet6");
			}
			break;
		case "ROWADD7":
			if ( formObj.i_trdp_cd.value != "" ) {
				var intRows=sheetObj7.LastRow()+1;
				var Row=sheetObj7.DataInsert(intRows);
				sheetObj7.SetCellValue(Row, "sheet7","sheet7");
			}
			break;
		case "ROWADD8":
			if ( formObj.i_trdp_cd.value != "" ) {
				var intRows=sheetObj8.LastRow()+1;
				var Row=sheetObj8.DataInsert(intRows);
				sheetObj8.SetCellValue(Row, "sheet8","sheet8");
			}
			break;
		case "ROWADD9":
			if (formObj.i_trdp_cd.value != "") {
				var intRows = sheetObj9.LastRow() + 1;
				var Row = sheetObj9.DataInsert(intRows);
				sheetObj9.SetCellValue(Row, "sheet9", "sheet9");
				sheetObj9.SetCellImage(Row, "trdp_addr_img", 0);
			}
			break;
		case "COUNTRY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       	rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";//대륙코드
			callBackFunc = "COUNTRY_POPLIST";
  	        modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
  	        
	 	    break;
        case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
		   	rtnary[1]="";
        	rtnary[2]=window;
        	
        	callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	        
  	        /*
	   	    //var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp=LN', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px");
	   	    var rtnVal=window.showModalDialog('./CMM_POP_0010.clt?callTp=', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px");*/
	   	    
	   	   
	   	    break;

	   	//#48819
        case "LINER_POPLIST2":
        	rtnary=new Array(2);
        	rtnary[0]="";
        	rtnary[1]="";
        	rtnary[2]=window;
        	
        	callBackFunc = "LINER_POPLIST2";
        	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");

        	break;
	    
        case "CURRENCY_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="1";
			callBackFunc = "OFFICE_POPLIST";
  	        modal_center_open('./CMM_POP_0040.clt', rtnary, 656,480,"yes");
  	        
			break;
	    case "OFFICE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
	   		rtnary[0]="1";
	   		
	   		callBackFunc = "OFFICE_POPLIST";
  	        modal_center_open('./CMM_POP_0050.clt', rtnary, 556,634,"yes");
  	        
   	        break;
		case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
          	rtnary=new Array(1);
	   		rtnary[0]="1";
	   		//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
			personOpt=valObj;
	   		callBackFunc = "USER_POPLIST";
  	        modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
  	        
   	        break;
		case "ENTR_USR_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="1";
			callBackFunc = "ENTR_USR_POPLIST";
			modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
			
			break;
        
		case "CITY_POPLIST"://CITY코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(3);
      		rtnary[0]="";
      		rtnary[1]="";
      		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}
	   		else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "CITY_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
  	        
	        break;
		case "STATE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		callBackFunc = "STATE_POPLIST";
  	        modal_center_open('./CMM_POP_0310.clt', rtnary, 610,450,"yes");
  	        
	        break;
        case "SEA_TARIFF": // 해운 Tariff 화면
        	var formObj=document.frm1;
        	var intRow=sheetObj4.LastRow();
			var intCheckRow=0;
			for ( var i=1 ; i <= intRow ; i++ ) {
				if ( sheetObj4.GetCellValue(i, "ck") == 1 ) {
					intCheckRow=i;
				}
			}
			if ( intCheckRow > 0 ) {
				if ( sheetObj4.GetCellValue(intCheckRow, "m_trf_tp_cd") != "C" ) {
					//Choose the [Air Rate] button!
					alert(getLabel('SAL_COM_ALT001'));
					return false;
				}
			}
			if ( formObj.s_trdp_cd.value != "" && formObj.s_trdp_cd.value != null ) {
				if ( intCheckRow > 0 ) {
					formObj.f_trf_ctrt_no.value=sheetObj4.GetCellValue(intCheckRow, "m_trf_ctrt_no");
				}
				var paramStr="./SAL_TFM_0010.clt?f_cmd=";
       			paramStr+= "&f_trdp_cd=" + formObj.s_trdp_cd.value;
       			paramStr+= "&f_trf_ctrt_no=" + formObj.f_trf_ctrt_no.value
       			parent.mkNewFrame('Ocean Tariff', paramStr);
			}
			break;
        case "AIR_TARIFF": // 해운 Tariff 화면
        	var formObj=document.frm1;
        	var intRow=sheetObj4.LastRow();
			var intCheckRow=0;
			for ( var i=1 ; i <= intRow ; i++ ) {
				if ( sheetObj4.GetCellValue(i, "ck") == 1 ) {
					intCheckRow=i;
				}
			}
			if ( intCheckRow > 0 ) {
				if ( sheetObj4.GetCellValue(intCheckRow, "m_trf_tp_cd") != "A" ) {
					//Choose the [Ocean Rate] button.
					alert(getLabel('SAL_COM_ALT002'));
					return false;
				}
			}
			if ( formObj.s_trdp_cd.value != "" && formObj.s_trdp_cd.value != null ) {
				if ( intCheckRow > 0 ) {
					formObj.f_trf_ctrt_no.value=sheetObj4.GetCellValue(intCheckRow, "m_trf_ctrt_no");
				}
				var paramStr="./SAL_TFM_0020.clt?f_cmd=";
       			paramStr+= "&f_trdp_cd=" + formObj.s_trdp_cd.value;
       			paramStr+= "&f_trf_ctrt_no=" + formObj.f_trf_ctrt_no.value
       			parent.mkNewFrame('Air Tariff', paramStr);
			}
			break;
        case "LabelPrint":
        	var formObj=document.frm1;
        	if(formObj.i_trdp_cd.value==""){
        		//alert("Trade Partner를 조회하여야 합니다.");
        		formObj.s_trdp_cd.focus();
        		return false;
        	}
        	for(var i=1;i<=sheetObj1.RowCount();i++) {
				if(sheetObj1.GetCellValue(i, 2)==1){
					formObj.attn.value=sheetObj1.GetCellValue(i,4) + "  " + sheetObj1.GetCellValue(i,3);
        		}
        	}
        	popPOST(formObj, 'RPT_PRN_0010.clt', 'popWin', 1025, 740);
        	break;
        case "INTERFACE":
        	if(!fncInputCheck()){
				return false;
			}
        	else if(!validateForm(formObj)){
				return false;
			}
        	else{
				var s_trdp_cd=formObj.s_trdp_cd.value;
	       		formObj.f_CurPage.value=1;
	       		if ( s_trdp_cd != "" ) {
	       			formObj.f_cmd.value=COMMAND02;
	       		} else {
	       			formObj.f_cmd.value=COMMAND01;
		        }
	       		//저장후 조회하기 위해 해당 Object가 저장되었는지 Flag값을 세팅함.
	       		rotTot=sheetObj3.LastRow()+1;
	       		for(var i=1; i < rotTot; i++){
	       			if(sheetObj3.GetCellValue(i, 'ibflag1')=='D'){
	       				obj1Work=true;
	       				break;
	       			}
	       		}
	       		rotTot=sheetObj1.LastRow()+1;
	       		for(var i=1; i < rotTot; i++){
	       			if(sheetObj1.GetCellValue(i, 'ibflag4')=='U'||sheetObj1.GetCellValue(i, 'ibflag4')=='I'||sheetObj1.GetCellValue(i, 'ibflag4')=='D'){
	       				obj3Work=true;
	       				break;
	       			}
	       		}
	       		rotTot=sheetObj2.LastRow()+1;
	       		for(var i=1; i < rotTot; i++){
	       			if(sheetObj2.GetCellValue(i, 'ibflag3')=='U'||sheetObj2.GetCellValue(i, 'ibflag3')=='I'||sheetObj2.GetCellValue(i, 'ibflag3')=='D'){
	       				obj4Work=true;
	       				break;
	       			}
	       		}
	       		rotTot=sheetObj6.LastRow()+1;
	       		for(var i=1; i < rotTot; i++){
	       			if(sheetObj6.GetCellValue(i, 'ibflag6')=='U'||sheetObj6.GetCellValue(i, 'ibflag6')=='I'||sheetObj6.GetCellValue(i, 'ibflag6')=='D'){
	       				obj6Work=true;
	       				break;
	       			}
	       		}
	       		//#3638 [CLA] Trade Partner duplicated creation validation 강화
				var engNmArr = frm1.eng_nm.value.trim().split(" ");
				var engAddrArr = frm1.eng_addr.value.trim().split(" ");
				var engNm = "";
				var engAddr = "";
				for (var i = 0; i<3; i++){
					if (engNmArr[i] != null){
						engNm += engNmArr[i] + " ";
					}
					if (engAddrArr[i] != null){
						engAddr += engAddrArr[i] + " ";
					}					
				}
				
				ajaxSendPost(getTrdpCheck, 'reqVal', '&goWhere=aj&bcKey=getTrdpCheck&eng_nm='+engNm.trim()+"&eng_addr="+engAddr.trim(), './GateServlet.gsl');
        	}
        	break;
        case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(1);
	   		rtnary[0]="1";
//	   		rtnary[1]=formObj.cmdt_cd.value;
//	   		rtnary[2]=formObj.cmdt_nm.value;
	   		rtnary[1]="";
	   		rtnary[2]="";
	   		callBackFunc = "COMMODITY_POPLIST"
	   		//callBackFunc = "comPopupCallBack";
	   		//popupId = "COMMODITY_POPLIST"
  	        modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
	        
	        break;
        case "COMMODITY_POPLIST_NAME":
       		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		rtnary[1]=formObj.cmdt_cd.value;
	   		rtnary[2]=formObj.cmdt_nm.value;
	   		callBackFunc = "COMMODITY_POPLIST"
	   		//callBackFunc = "comPopupCallBack";
	   		//popupId = "COMMODITY_POPLIST"
  	        modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
	        
	        break;
	    /* jsjang 2013.7.16 요구 # 14719 [IMPEX]Trade Partner List/Entry 에 Copy 기능 추가 Start */ 
        case "COPY":	//조회
     	   if(confirm(getLabel('FMS_COM_CFMCPY'))){
     		   formObj.f_cmd.value=COMMAND05;
         	   submitForm(COMMAND05);
     	   }
     	   break;
     
    	case "PRNR_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "PRNR_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		
		// #51932 [ZEN] Trade partner group 컬럼 추가 
		case "TRDP_GROUP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       	rtnary=new Array(1);
			rtnary[0]="1";	// Group Code
			rtnary[1]=formObj.s_tp_grp.value;//  Trdp Group Code
			callBackFunc = "TRDP_GROUP_POPLIST";
  	        modal_center_open('./CMM_POP_0410.clt', rtnary, 560,390,"yes");
  	        
	 	    break;
    }
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.s_trdp_cd.value = getParam(url,"s_trdp_cd");
	
	doWork('SEARCHLIST');
}

function submitForm(cmd){
	var formObj=document.frm1;
	formObj.spi_edi_vndr_cd.value = "";
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./SAL_TPM_0010AJ.clt",
		   dataType: 'xml',
		   data: { f_cmd: cmd,  s_trdp_cd: formObj.s_trdp_cd.value , f_isNumSep:formObj.f_isNumSep.value },
		   success: function(data){
			 setFieldValue( formObj.f_sls_ofc_cd, $('sls_ofc_cd',data).text());
			 setFieldValue( formObj.f_sls_ofc_nm, $('sls_ofc_nm',data).text());
			 setFieldValue( formObj.f_bankList, $('bankCode',data).text());
			 setFieldValue( formObj.f_RltPrnrTpCd, $('rtlPrnrTp',data).text());
			 setFieldValue( formObj.f_TrdDiv, $('trdDiv',data).text());
			 setFieldValue( formObj.h_trdp_tp_cd, $('trdp_tp_cd',data).text());
			 setFieldValue( formObj.h_trdp_tp_nm, $('trdp_tp_nm',data).text());
			 setFieldValue( formObj.h_sls_gp_cd, $('sls_gp_cd',data).text());
			 setFieldValue( formObj.h_cr_term_cd, $('cr_term_cd',data).text());
			 setFieldValue( formObj.h_cr_term_dt, $('cr_term_dt',data).text());
			 setFieldValue( formObj.h_crd_lmt_amt, $('crd_lmt_amt',data).text());
			 setFieldValue( formObj.vis_id_org, $('vis_id',data).text());
			 setFieldValue( formObj.copyFlag, $('copyFlag',data).text());
			 setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());
			 setFieldValue( formObj.default_maincmp_yn, $('default_maincmp_yn',data).text());
			 setFieldValue( formObj.s_trdp_cd, $('trdp_cd',data).text());
			 setFieldValue( formObj.i_trdp_cd, $('trdp_cd',data).text());
			 setFieldValue( formObj.hidden_trdp_cd, $('trdp_cd',data).text());
			 setFieldValue( formObj.shrt_nm, $('shrt_nm',data).text());
			 setFieldValue( formObj.eng_nm, $('eng_nm',data).text());
			 setFieldValue( formObj.pre_eng_nm, $('eng_nm',data).text());
			 setFieldValue( formObj.locl_nm, $('locl_nm',data).text());
			 setFieldValue( formObj.lgl_addr, $('lgl_addr',data).text());
			 setFieldValue( formObj.city_cd, $('city_cd',data).text());
			 setFieldValue( formObj.city_nm, $('city_nm',data).text());
			 setFieldValue( formObj.state_cd, $('state_cd',data).text());
			 setFieldValue( formObj.rep_zip, $('rep_zip',data).text());
			 setFieldValue( formObj.cnt_cd, $('cnt_cd',data).text());
			 setFieldValue( formObj.cnt_nm, $('cnt_nm',data).text());
			 setFieldValue( formObj.smt_id, $('smt_id',data).text());
			 setFieldValue( formObj.edi_cust_id, $('edi_cust_id',data).text());
			 setFieldValue( formObj.eng_addr, $('eng_addr',data).text());
			 setFieldValue( formObj.tax_iss_addr, $('tax_iss_addr',data).text());
			 setFieldValue( formObj.ceo_nm, $('ceo_nm',data).text());
			 setFieldValue( formObj.biz_no, $('biz_no',data).text());
			 setFieldValue( formObj.h_tax_type, $('tax_type',data).text());
			 setFieldValue( formObj.corp_no, $('corp_no',data).text());
			 setFieldValue( formObj.acct_cd, $('acct_cd',data).text());
			 setFieldValue( formObj.iata_cd, $('iata_cd',data).text());
			 setFieldValue( formObj.scac_cd, $('scac_cd',data).text());
			 setFieldValue( formObj.prefix, $('prefix',data).text());
			 setFieldValue( formObj.dcnsl_cd, $('dcnsl_cd',data).text());
			 setFieldValue( formObj.cbsa_scac_cd, $('cbsa_scac_cd',data).text());
			 setFieldValue( formObj.cmdt_cd, $('cmdt_cd',data).text());
			 setFieldValue( formObj.cmdt_nm, $('cmdt_nm',data).text());
			 setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			 setFieldValue( formObj.sls_ofc_nm, $('sls_ofc_nm',data).text());
			 setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			 setFieldValue( formObj.sls_usrnm, $('sls_usrnm',data).text());
			 //OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
			 setFieldValue( formObj.cs_usrid, $('cs_usrid',data).text());
			 setFieldValue( formObj.cs_usrnm, $('cs_usrnm',data).text());
			 setFieldValue( formObj.h_bill_to_agent, $('bill_to_agent',data).text());
			 setFieldValue( formObj.rgst_usrid, $('rgst_usrid',data).text());
			 setFieldValue( formObj.rgst_dt, $('rgst_dt',data).text());
			 setFieldValue( formObj.modi_usrid, $('modi_usrid',data).text());
			 setFieldValue( formObj.modi_dt, $('modi_dt',data).text());
			 setFieldValue( formObj.h_ar_vat_line, $('ar_vat_line',data).text());
			 setFieldValue( formObj.h_ap_vat_line, $('ap_vat_line',data).text());
			 setFieldValue( formObj.h_clm_flg, $('clm_flg',data).text());
			 setFieldValue( formObj.reserve_field09, $('reserve_field09',data).text());
			 setFieldValue( formObj.oi_ref_prfx, $('oi_ref_prfx',data).text());
			 setFieldValue( formObj.oi_ref_seq_no, $('oi_ref_seq_no',data).text());
			 setFieldValue( formObj.oe_ref_prfx, $('oe_ref_prfx',data).text());
			 setFieldValue( formObj.oe_ref_seq_no, $('oe_ref_seq_no',data).text());
			 setFieldValue( formObj.ai_ref_prfx, $('ai_ref_prfx',data).text());
			 setFieldValue( formObj.ai_ref_seq_no, $('ai_ref_seq_no',data).text());
			 setFieldValue( formObj.ae_ref_prfx, $('ae_ref_prfx',data).text());
			 setFieldValue( formObj.ae_ref_seq_no, $('ae_ref_seq_no',data).text());
			 setFieldValue( formObj.oe_hbl_prfx, $('oe_hbl_prfx',data).text());
			 setFieldValue( formObj.oe_hbl_seq_no, $('oe_hbl_seq_no',data).text());
			 setFieldValue( formObj.ae_awb_prfx, $('ae_awb_prfx',data).text());
			 setFieldValue( formObj.ae_awb_seq_no, $('ae_awb_seq_no',data).text()); 
			 setFieldValue( formObj.s_trdp_tp_cd, $('trdp_tp_cd',data).text());
			 if ($('tp_grp',data).text() == ""){
				 formObj.s_tp_grp.value = "";
			 }else{
				 setFieldValue( formObj.s_tp_grp, $('tp_grp',data).text());
			 }
			 setFieldValue( formObj.delt_flg, $('delt_flg',data).text());
			 setFieldValue( formObj.s_sts_cd, $('sts_cd',data).text());
			 setFieldValue( formObj.profit_share, $('profit_share',data).text());
			 setFieldValue( formObj.an_bond_no, $('an_bond_no',data).text());
			 setFieldValue( formObj.an_bond_exp_dt, $('an_bond_exp_dt',data).text());
			 setFieldValue( formObj.an_bond_entr_usrid, $('an_bond_entr_usrid',data).text());
			 setFieldValue( formObj.an_bond_entr_usrnm, $('an_bond_entr_usrnm',data).text());
			 setFieldValue( formObj.an_bond_pur_cd, $('an_bond_pur_cd',data).text());
			 setFieldValue( formObj.an_bond_pur_nm, $('an_bond_pur_nm',data).text());
			 setFieldValue( formObj.an_bond_pur_dt, $('an_bond_pur_dt',data).text()); 
			 setFieldValue( formObj.crd_appr_dt, $('crd_appr_dt',data).text()); 
			 setFieldValue( formObj.ofc_hr, $('ofc_hr',data).text());
			 setFieldValue( formObj.ctrt_no, $('ctrt_no',data).text());   
			 setFieldValue( formObj.spi_vndr_mapg_cd, $('spi_vndr_mapg_cd',data).text());   
			 setFieldValue( formObj.spi_edi_vndr_cd, $('spi_edi_vndr_cd',data).text());
			 setFieldValue( formObj.ofc_fm_hr, $('ofc_fm_hr',data).text());   
			 setFieldValue( formObj.ofc_to_hr, $('ofc_to_hr',data).text());   

			 //#3355 [JTC]Dock Receipt 수정
			 setFieldValue( formObj.dock_rcpt_rmk, $('dock_rcpt_rmk',data).text());

			 setFieldValue( formObj.shpr_cd, $('shpr_cd',data).text());
//			 setFieldValue( formObj.agt_edi_cd, $('agt_edi_cd',data).text());
//			 setFieldValue( formObj.agt_edi_msg_tp_cd, $('agt_edi_msg_tp_cd',data).text());
			 formObj.agt_edi_cd.value = $('agt_edi_cd',data).text();
			 formObj.agt_edi_msg_tp_cd.value = $('agt_edi_msg_tp_cd',data).text();
				 
			 
			 doBtnAuthority(attr_extension);
			  loadPage();
			  checkTpCode();
			  btnLoad();
			  addTpTyCd();
			  doHideProcess();
			  //[#5077] [CLA] TP NAME & ADDRESS LINE AND CHARACTER COUNT TO SHOW
			  engAddrChck(formObj.eng_addr);
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}
//URL 인코딩
function uriEncode(data){
	if(data!=""){
		//&와=로 일단 분해해서 encode
		var encdata='';
		var datas=data.split('&');
		for(var i=1;i<datas.length;i++)
		{
			var dataq=datas[i].split('=');
			encdata += '&'+encodeURIComponent(dataq[0])+'='+encodeURIComponent(dataq[1]);
		}
	} 
	else {
		encdata="";
	}
	return encdata;
}
function sheet1_OnClick(sheetObj,Row,Col){
	switch (sheetObj.ColSaveName(Col)) {
		/*case "rep_flg" :
			if(sheetObj.GetCellValue(Row, "del_flg") == '0'){
				sheetObj.CheckAll("rep_flg", 0, 0);
			}
		break;*/
		case "del_flg" :
			if(sheetObj.GetCellValue(Row, "rep_flg") == '1'){
				sheetObj.SetCellValue(Row, "rep_flg",'0',0);
				bl_addr_chg();
			}
		break;
	}
}
function sheet1_OnChange(sheetObj, Row, Col, Value){
	switch (sheetObj.ColSaveName(Col)) {
		case "trd_div_cd" :
			sheetObj.SetCellValue(Row, "trd_div_nm",sheetObj.GetCellText(Row, Col),0);
		break;
		case "del_flg" :
			if(sheetObj.GetCellValue(Row, "rep_flg") == '1'){
				sheetObj.SetCellValue(Row, "rep_flg",'0',0);
				bl_addr_chg();
			}
		break;
		case "rep_flg" :
			if(sheetObj.GetCellValue(Row, "del_flg") == '0'){
				if(sheetObj.GetCellValue(Row, "rep_flg") == "1"){
					for(var i = 1; i < sheetObj.LastRow()+1; i++){
						if(i != Row){
							sheetObj.SetCellValue(i, "rep_flg", "0", "0");
						}
					}
				}
				bl_addr_chg();
			}
		break;
		case "pic_nm" :
			if(sheetObj.GetCellValue(Row, "del_flg")=='0' && sheetObj.GetCellValue(Row, "rep_flg") == '1'){
				bl_addr_chg();
			}
		break;
		case "pic_phn" :
			if(sheetObj.GetCellValue(Row, "del_flg")=='0' && sheetObj.GetCellValue(Row, "rep_flg") == '1'){
				bl_addr_chg();
			}
		break;
		case "pic_fax" :
			if(sheetObj.GetCellValue(Row, "del_flg")=='0' && sheetObj.GetCellValue(Row, "rep_flg") == '1'){
				bl_addr_chg();
			}
		break;
		case "pic_eml" :
			if(sheetObj.GetCellValue(Row, "del_flg")=='0' && sheetObj.GetCellValue(Row, "rep_flg") == '1'){
				bl_addr_chg();
			}
		break;
	}
}
function sheet2_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
	if ( Row > 0 && Col == 3 ) {
		var strAcctNo=sheetObj.GetCellValue(Row, Col);
		formObj.s_Acct_Info_Row.value=Row;
		ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAcctNo&s_acct_no='+strAcctNo, './GateServlet.gsl');
	}
}
function sheet3_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
	    case "sls_popup" :	//파일다운로드
	    	if(sheetObj.GetCellValue(Row, "sls_his_flat_nm")!=''){
		    	document.frm2.trdp_cd.value=formObj.i_trdp_cd.value;
		    	document.frm2.cntc_seq.value=sheetObj.GetCellValue(Row, "cntc_seq");
				document.frm2.submit();
	    	}
	    	break;
	    case "sls_pson_pic" : case "sls_his_tit" :	//파일다운로드
	    	formObj.s_s3_sls_his_ctnt.value=sheetObj.GetCellValue(Row, "sls_his_ctnt");
	    	break;
	}
}
function sheet3_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	rtnary=new Array(1);
	var trdp_cd=formObj.s_trdp_cd.value;
	var cntc_seq=sheetObj.GetCellValue(Row,"cntc_seq");
	var sls_pson_pic=sheetObj.GetCellValue(Row,"sls_pson_pic");
	var sls_his_tit=sheetObj.GetCellValue(Row,"sls_his_tit");
	var sls_his_ctnt=sheetObj.GetCellValue(Row,"sls_his_ctnt");
	var sls_his_flat_url=sheetObj.GetCellValue(Row,"sls_his_flat_url");
	var sls_his_flat_nm=sheetObj.GetCellValue(Row,"sls_his_flat_nm");
	rtnary[0]="U";
	rtnary[1]=trdp_cd;
	rtnary[2]=cntc_seq;
	rtnary[3]=sls_pson_pic;
	rtnary[4]=sls_his_tit;
	rtnary[5]=sls_his_ctnt;
	rtnary[6]=sls_his_flat_url;
	rtnary[7]=sls_his_flat_nm;
	
	callBackFunc = "ROWADD1";
    modal_center_open('./SAL_TPM_0011.clt', rtnary, 480,327,"yes");
    
    //20160621 이 부분 주석처리
    /* if (rtnVal == "true") {
    	gridSearch("1");
		return;
	} 
    else {
		return;
	}*/
}
//#546 [BNX JAPAN] TRADE PARTNER ENTRY - LOG BOOK Content 자동 로딩 요청
function sheet3_OnSearchEnd(){
	var formObj=document.frm1;
	if (docObjects[2].RowCount()>0){
		formObj.s_s3_sls_his_ctnt.value=docObjects[2].GetCellValue(1, "sls_his_ctnt");
	}
}
function displayClear() {
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj3=docObjects[2];
	var sheetObj4=docObjects[3];
	var sheetObj5=docObjects[4];
	var sheetObj6=docObjects[5];
	var formObj=document.frm1;
	formObj.s_trdp_cd.value="";
	formObj.i_trdp_cd.value="";
	formObj.shrt_nm.value="";
	formObj.delt_flg.value='N';
//	formObj.full_nm.value = "";
	formObj.locl_nm.value="";
	formObj.eng_nm.value="";
	formObj.lgl_addr.value="";
	formObj.eng_addr.value="";
	formObj.ceo_nm.value="";
	formObj.tax_iss_addr.value="";
//	formObj.cr_term_cd.value = "";
//	formObj.cr_term_dt.value = "";
//	formObj.url.value = "";
	formObj.cnt_cd.value="";
	formObj.cnt_nm.value="";
//	formObj.curr_cd.value = "";
//	formObj.curr_nm.value = "";
	formObj.biz_no.value="";
	formObj.corp_no.value="";
	formObj.acct_cd.value="";
//	formObj.grp_id_cd.value = "";
	formObj.s_trdp_tp_cd.value="";
	formObj.s_tp_grp.value="";
//	formObj.rep_phn.value = "";
//	formObj.rep_fax.value = "";
	formObj.rep_zip.value = "";
	formObj.state_cd.value = "";
	formObj.city_nm.value = "";
	formObj.city_cd.value = "";
	formObj.smt_id.value = "";
	formObj.edi_cust_id.value = "";
	//formObj.vis_id.value = "";
	//formObj.vis_pwd.value = "";
	formObj.tax_type.value = "";
	formObj.h_tax_type.value = "";
	formObj.iata_cd.value = "";
	formObj.shpr_cd.value = "";
	formObj.scac_cd.value = "";
	formObj.prefix.value = "";
	formObj.bill_to_agent.checked = false;
	formObj.h_bill_to_agent.value = "";
	formObj.ar_vat_line.checked = false;
	formObj.h_ar_vat_line.value = "";
	formObj.ap_vat_line.checked = false;
	formObj.h_ap_vat_line.value = "";
	formObj.clm_flg.checked = false;
	formObj.h_clm_flg.value = "";
	// Comodity cmdt_cd cmdt_nm 초기화
	formObj.cmdt_cd.value="";
	formObj.cmdt_nm.value="";
	//2012/01/03 clear시 초기상태 유지 Chungrue
	formObj.sls_ofc_cd.value=formObj.t_sls_ofc_cd.value;
	formObj.sls_ofc_nm.value=formObj.t_sls_ofc_nm.value;
	formObj.sls_usrid.value=formObj.t_sls_usrid.value;
	formObj.sls_usrnm.value=formObj.t_sls_usrnm.value;
	formObj.rgst_usrid.value="";
	formObj.rgst_dt.value="";
	formObj.modi_usrid.value="";
	formObj.modi_dt.value="";
	if(formObj.s_sts_cd.length > 1){
		formObj.s_sts_cd.selectedIndex=2;
	}
//	if(formObj.s_sls_gp_cd.length > 0){
//		formObj.s_sls_gp_cd.selectedIndex = 0;
//	}
//	formObj.cr_term_cd.selectedIndex = 1;
//	formObj.cr_term_dt.value = 30;
//	formObj.s_crd_lmt_amt.value = 0;
//	formObj.s_cur_lmt_amt.value = 0;
	formObj.doKeyIn.checked=false;
	formObj.hidden_trdp_cd.value="";
	formObj.oi_ref_prfx.value="";
	formObj.oi_ref_seq_no.value="";
	formObj.oe_ref_prfx.value="";
	formObj.oe_ref_seq_no.value="";
	formObj.ai_ref_prfx.value="";
	formObj.ai_ref_seq_no.value="";
	formObj.ae_ref_prfx.value="";
	formObj.ae_ref_seq_no.value="";
	formObj.ae_awb_prfx.value="";
	formObj.ae_awb_seq_no.value="";
	formObj.oe_hbl_prfx.value="";
	formObj.oe_hbl_seq_no.value="";
	sheetObj1.RemoveAll();
	sheetObj2.RemoveAll();
	sheetObj3.RemoveAll();
	sheetObj4.RemoveAll();
	sheetObj5.RemoveAll();
	sheetObj6.RemoveAll();
	getObj('keyInDisp').style.display='inline';
	//  Copy버튼 비활성화
	frm1.copyFlag.value='N';
	btnCopy.style.display='none';
	checkTpCode();
}
function gridSearch(gridNum) {
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj3=docObjects[2];
	var sheetObj4=docObjects[3];
	var sheetObj6=docObjects[5];
	var sheetObj7=docObjects[6];
	var sheetObj8=docObjects[7];
	var sheetObj9 = docObjects[8];
    var formObj=document.frm1;
    if ( formObj.s_trdp_cd.value != "" ) {
    	formObj.f_cmd.value=SEARCHLIST;
	    if(gridNum=="ALL"||gridNum== "1"){
	    	formObj.s_s3_sls_his_ctnt.value="";
	    	sheetObj3.DoSearch("SAL_TPM_0011GS.clt",FormQueryString(formObj) );
		}
	    if(gridNum=="ALL"||gridNum=="2"){
	    	formObj.f_cmd.value=SEARCHLIST01;
	    	sheetObj4.DoSearch("SAL_TPM_0012GS.clt",FormQueryString(formObj) );
		}
	    if(gridNum=="ALL"||gridNum=="3"){
	    	formObj.f_cmd.value=SEARCHLIST02;
	    	sheetObj1.DoSearch("SAL_TPM_0014GS.clt",FormQueryString(formObj) );
		}
	    if(gridNum=="ALL"||gridNum=="4"){
	    	formObj.f_cmd.value=SEARCHLIST01;
	    	sheetObj2.DoSearch("SAL_TPM_0013GS.clt",FormQueryString(formObj) );
		}
	    if(gridNum=="ALL"||gridNum=="6"){
	    	formObj.f_cmd.value=SEARCHLIST;
	    	sheetObj6.DoSearch("SAL_TPM_0016GS.clt",FormQueryString(formObj) );
	    }
	    if(gridNum=="ALL"||gridNum=="7"){
	    	formObj.f_cmd.value=SEARCHLIST;
	    	sheetObj7.DoSearch("SAL_TPM_0017GS.clt",FormQueryString(formObj) );
	    }
	    if(gridNum=="ALL"||gridNum=="8"){
	    	formObj.f_cmd.value=SEARCHLIST;
	    	sheetObj8.DoSearch("SAL_TPM_0018GS.clt",FormQueryString(formObj) );
	    }
		if (gridNum == "ALL" || gridNum == "9") {
			formObj.f_cmd.value = SEARCHLIST;
			sheetObj9.DoSearch("SAL_TPM_0019GS.clt", FormQueryString(formObj));
		}
	}
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if ( doc[0]=='OK' ) {
		if (typeof(doc[1])!='undefined'){
			var sheetObj1=docObjects[1];
			var iRow=formObj.s_Acct_Info_Row.value;
			//alert("[" + doc[1] + "]" + getLabel('SAL_TPM_0010_MSG3')); Duplicated account!
			alert(getLabel('FMS_COM_ALT008') + " - " + doc[1]);	
			sheetObj1.SetCellValue(iRow, 3,"");
		}
	}
	else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));
	}
}
function fncTpCodeSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		if ( formObj.s_trdp_cd.value != null && formObj.s_trdp_cd.value != "" ) {
			doWork('SEARCHLIST');
		}
	}
}
function fncInputCheck() {
	var formObj=document.frm1;
	//---------------20121130 OJG---------------------------
	// #4811 [AIF, BNX TOR, CLA] Be able to enter and save longer trade partner address
	if(!checkTxtAreaLn(formObj.eng_addr, 70, 7, 'Name on B/L') ){
		//CoBizCommon 메시지 처리를 어떻게 할 것인지 결정 필요 (S.Y BAIK)
		//alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.719");
		goTabSelect("01");
		formObj.eng_addr.focus();
		return false;
	}
	//--------------------------------------------------------
	
	//---------------20141226 OJG---------------------------
	if(!checkTxtAreaLn(formObj.ofc_hr, 100, 2, 'Openning Hours') ){
		goTabSelect("01");
		formObj.ofc_hr.focus();
		return false;
	}
	//--------------------------------------------------------
	
	/*
	if(checkInputVal(formObj.locl_nm.value, 1, 100, "T", getLabel('LOCAL_NM'))!='O'){
    	formObj.locl_nm.focus();
    	return false;
    }else 
    */
    if(checkInputVal(formObj.eng_nm.value, 1, 50, "T", getLabel('ENG_NM'))!='O'){
    	//CoBizCommon 메시지 처리를 어떻게 할 것인지 결정 필요 (S.Y BAIK)
    	//alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.733");
    	goTabSelect("01");
    	formObj.eng_nm.focus();
    	return false;
    }
    else if(checkInputVal(formObj.lgl_addr.value, 0, 400, "T", getLabel('LGL_ADDR'))!='O'){
    	//CoBizCommon 메시지 처리를 어떻게 할 것인지 결정 필요 (S.Y BAIK)
    	//alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.737");
    	goTabSelect("01");
    	formObj.lgl_addr.focus();
    	return false;
    /*
    }else if(checkInputVal(formObj.eng_addr.value, 0, 400, "T", getLabel('ENG_ADDR'))!='O'){
    	formObj.eng_addr.focus();
    	return false;
    }else if(!checkTxtAreaLn(formObj.eng_addr, 60, 6, 'Address(for B/L ref.')){
    	return false;
    */
	}else if(checkInputVal(formObj.rep_zip.value, 0, 20, "T", getLabel('ZIP_CD'))!='O'){
		//CoBizCommon 메시지 처리를 어떻게 할 것인지 결정 필요 (S.Y BAIK)
		//alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.748");
		goTabSelect("01");
		formObj.rep_zip.focus();
    	return false;
    /*2012.12.02 (Use Y/N is Lis Box!)	
	}else if(formObj.delt_flg.value==''){
		//alert('Please input [Use Flag]!');
		//alert(getLabel('SAL_MSG_005'));
		formObj.delt_flg.focus();
		return false;
    */	
    }else if(checkInputVal(formObj.tax_iss_addr.value, 0, 400, "T", getLabel('LGL_ADDR'))!='O'){
    	//CoBizCommon 메시지 처리를 어떻게 할 것인지 결정 필요 (S.Y BAIK)
    	//alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.759");
    	goTabSelect("01");
    	formObj.tax_iss_addr.focus();
    	return false;
    }
	if(checkInputVal(formObj.ceo_nm.value, 0, 50, "T", getLabel('CEO'))!='O'){
		//CoBizCommon 메시지 처리를 어떻게 할 것인지 결정 필요 (S.Y BAIK)
		//alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.765");
		goTabSelect("01");
		formObj.ceo_nm.focus();
    	return false;
//    }else if(formObj.biz_no.value.length!=10){
//    	alert("Biz ID는 10자리 숫자입니다.");
//    	formObj.biz_no.focus();
//    	return false;
    }else if(checkInputVal(formObj.corp_no.value, 0, 20, "T", getLabel('BIZ_REG_NO'))!='O'){
    	//CoBizCommon 메시지 처리를 어떻게 할 것인지 결정 필요 (S.Y BAIK)
    	//alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.773");
    	goTabSelect("01");
    	formObj.corp_no.focus();
    	return false;
    }
	if(formObj.s_trdp_tp_cd.value==""){
		//Please select Partner Type
		alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.780");
		goTabSelect("01");
		formObj.s_trdp_tp_cd.focus();
		return false;
	}else if(checkInputVal(formObj.cnt_cd.value, 2, 2, "T", getLabel('CNT'))!='O'){
		//CoBizCommon 메시지 처리를 어떻게 할 것인지 결정 필요 (S.Y BAIK)
		//alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.785");
		goTabSelect("01");
		formObj.cnt_cd.focus();
		return false;
	}
	/*
	else if(checkInputVal(formObj.curr_cd.value, 3, 3, "T", getLabel('CURR'))!='O'){
		formObj.curr_cd.focus();
		return false;
	}*/
	else if(formObj.sls_ofc_cd.value != "" && checkInputVal(formObj.sls_ofc_cd.value, 1, 10, "T", getLabel('SAL_BRN'))!='O'){
		//CoBizCommon 메시지 처리를 어떻게 할 것인지 결정 필요 (S.Y BAIK)
		//alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.795");
		goTabSelect("01");
		formObj.sls_ofc_cd.focus();
		return false;
	/*} 요구사항 #27433 [SFI] Changing to OPTIONAL from MANDATORY for Saels Person at Trading Partner
	else if(checkInputVal(formObj.sls_usrid.value, 1, 12, "T", getLabel('SAL_PRN'))!='O'){
		//CoBizCommon 메시지 처리를 어떻게 할 것인지 결정 필요 (S.Y BAIK)
		//alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.799");
		goTabSelect("01");
		formObj.sls_usrid.focus();
		return false;
	*/
	/*
	}else if(formObj.cr_term_cd.value==''){
		//Please input [Credit Term]!
		alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.805");
		formObj.cr_term_cd.focus();
		return false;
	}else if(formObj.s_sts_cd.value==''){
		//alert('Please select [Status]!');
		formObj.cr_term_cd.focus();
		return false;
	}else if(formObj.s_sls_gp_cd.value==''){
		//alert('Please select [Credit Group]!');
		alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TPM_0010.817");
		formObj.s_sls_gp_cd.focus();
		return false;
	*/
	/* } else if (trim(formObj.vis_id.value) == "" && trim(formObj.vis_pwd.value) != "") {
		//Please enter a Value first!
		alert(getLabel("FMS_COM_ALT006") + "\n[Visibility ID]");
		goTabSelect("01");
		formObj.vis_id.value=trim(formObj.vis_id.value);
		formObj.vis_id.focus();
		return false;
	} else if (trim(formObj.vis_id.value) != "" && formObj.vis_id_org.value != trim(formObj.vis_id.value)) {
		//LHK, Save 시에만 Check 하도록 로직 이동, Visibility ID Check, USR Table 에서 Duplicate check 가 어려워 org id 로 비교 체크
		codeNameAction('all_user_count', formObj.vis_id);
		if(formObj.vis_id_chk.value == 'Y'){
			return false;
		}
		if(trim(formObj.vis_pwd.value) == ""){
			//Please enter a Value first!
			alert(getLabel("FMS_COM_ALT006") + "\n[Visibility PW]");
			goTabSelect("01");
			formObj.vis_pwd.value=trim(formObj.vis_pwd.value);
			formObj.vis_pwd.focus();
			return false;
		}	
	} 
	*/
	}
	formObj.oi_ref_prfx.value=trim(formObj.oi_ref_prfx.value);
	formObj.oe_ref_prfx.value=trim(formObj.oe_ref_prfx.value);
	formObj.ai_ref_prfx.value=trim(formObj.ai_ref_prfx.value);
	formObj.ae_ref_prfx.value=trim(formObj.ae_ref_prfx.value);
	formObj.ae_awb_prfx.value=trim(formObj.ae_awb_prfx.value);
	formObj.oe_hbl_prfx.value=trim(formObj.oe_hbl_prfx.value);
	//Other Info Check.
	if(formObj.oi_ref_prfx.value == "" && formObj.oi_ref_seq_no.value != ""){
		//[Prefix or Sequence] is Missing. 
		//alert(getLabel('SAL_COM_ALT021'));
		//goTabSelect("08");
		//formObj.oi_ref_prfx.focus();
		//return false;
		formObj.oi_ref_seq_no.value = "";
	}
	if(formObj.oi_ref_prfx.value != "" && formObj.oi_ref_seq_no.value == ""){
		//[Prefix or Sequence] is Missing.
		alert(getLabel('SAL_COM_ALT021'));
		goTabSelect("08");
		formObj.oi_ref_seq_no.focus();
		return false;
	}
	if(formObj.oe_ref_prfx.value == "" && formObj.oe_ref_seq_no.value != ""){
		//[Prefix or Sequence] is Missing.
		//alert(getLabel('SAL_COM_ALT022'));
		//goTabSelect("08");
		//formObj.oe_ref_prfx.focus();
		//return false;
		formObj.oe_ref_seq_no.value = "";
	}
	if(formObj.oe_ref_prfx.value != "" && formObj.oe_ref_seq_no.value == ""){
		//[Prefix or Sequence] is Missing.
		alert(getLabel('SAL_COM_ALT022'));
		goTabSelect("08");
		formObj.oe_ref_seq_no.focus();
		return false;
	}
	if(formObj.ai_ref_prfx.value == "" && formObj.ai_ref_seq_no.value != ""){
		//[Prefix or Sequence] is Missing.
		//alert(getLabel('SAL_COM_ALT023'));
		//goTabSelect("08");
		//formObj.ai_ref_prfx.focus();
		//return false;
		formObj.ai_ref_seq_no.value = "";
	}
	if(formObj.ai_ref_prfx.value != "" && formObj.ai_ref_seq_no.value == ""){
		//[Prefix or Sequence] is Missing.
		alert(getLabel('SAL_COM_ALT023'));
		goTabSelect("08");
		formObj.ai_ref_seq_no.focus();
		return false;
	}
	if(formObj.ae_ref_prfx.value == "" && formObj.ae_ref_seq_no.value != ""){
		//[Prefix or Sequence] is Missing.
		//alert(getLabel('SAL_COM_ALT024'));
		//goTabSelect("08");
		//formObj.ae_ref_prfx.focus();
		//return false;
		formObj.ae_ref_seq_no.value = "";
	}
	if(formObj.ae_ref_prfx.value != "" && formObj.ae_ref_seq_no.value == ""){
		//[Prefix or Sequence] is Missing.
		alert(getLabel('SAL_COM_ALT024'));
		goTabSelect("08");
		formObj.ae_ref_seq_no.focus();
		return false;
	}
	if(formObj.ae_awb_prfx.value == "" && formObj.ae_awb_seq_no.value != ""){
		//[Prefix or Sequence] is Missing.
		//alert(getLabel('SAL_COM_ALT025'));
		//goTabSelect("08");
		//formObj.ae_awb_prfx.focus();
		//return false;
		formObj.ae_ref_seq_no.value = "";
	}
	if(formObj.ae_awb_prfx.value != "" && formObj.ae_awb_seq_no.value == ""){
		//[Prefix or Sequence] is Missing.
		alert(getLabel('SAL_COM_ALT025'));
		goTabSelect("08");
		formObj.ae_awb_seq_no.focus();
		return false;
	}
	if(formObj.oe_hbl_prfx.value == "" && formObj.oe_hbl_seq_no.value != ""){
		//[Prefix or Sequence] is Missing.
		//alert(getLabel('SAL_COM_ALT026'));
		//goTabSelect("08");
		//formObj.oe_hbl_prfx.focus();
		//return false;
		formObj.oe_hbl_seq_no.value = "";
	}
	if(formObj.oe_hbl_prfx.value != "" && formObj.oe_hbl_seq_no.value == ""){
		//[Prefix or Sequence] is Missing.
		alert(getLabel('SAL_COM_ALT026'));
		goTabSelect("08");
		formObj.oe_hbl_seq_no.focus();
		return false;
	}
	
	if(formObj.spi_edi_vndr_cd.value != "" && formObj.spi_vndr_mapg_cd.value == ""){
		alert(getLabel('FMS_COM_ALT001'));
		goTabSelect("07");
		formObj.spi_vndr_mapg_cd.focus();
		return false;
	}
	
	return true;
}

// 공통전역변수
var tabObjects=new Array();
var tabCnt=0 ;
var beforetab=1;
var beforetab2=1;
var docObjects=new Array();
var sheetCnt=0;
/**
 * IBTab Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setTabObject(tab_obj){
	tabObjects[tabCnt++]=tab_obj;
}
/**
 * Tab 기본 설정
 * 탭의 항목을 설정한다.
 */
function initTab(tabObj , tabNo) {
	switch(tabNo) {
		case 1:
			with (tabObj) {
				var cnt=0 ;
				InsertTab( cnt++ , "Company Info." , -1 );
				InsertTab( cnt++ , "Contact Info." , -1 );
				InsertTab( cnt++ , " Tariff Info. " , -1 );
				InsertTab( cnt++ , "  Etc Info.  " , -1 );
			}
		break;
	}
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
		break;
		case "sheet2":
			docObjects[1]=sheet_obj;
		break;
		case "sheet3":
			docObjects[2]=sheet_obj;
		break;
		case "sheet4":
			docObjects[3]=sheet_obj;
		break;
		case "sheet5":
			docObjects[4]=sheet_obj;
		break;
		case "sheet6":
			docObjects[5]=sheet_obj;
		break;
		case "sheet7":
			docObjects[6]=sheet_obj;
		break;
		case "sheet8":
			docObjects[7]=sheet_obj;
		break;
		case "sheet9":
			docObjects[8]=sheet_obj;
		break;
	}
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
var isRun = true;
function loadPage() {
	//#1179 Cannot auto suggestion when name inputted
	fnSetAutocompleteCallBack('city_nm', 'CITY_POPLIST', 'LOCATION_POPLIST'); //City
	var formObj=document.frm1;
	
	// TRADE PARTNER 등록시 SALES OFFICE, SALES PERSON BLANK 로 나오도록 여부 (#50239)
	if(formObj.i_trdp_cd.value =="" || formObj.i_trdp_cd.value == null){
	    var opt_key = "TRDP_SALES_INFO_BLANK";
	    ajaxSendPost(setSales_Office_Person, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	}
	// TRADE PARTNER 처음생성시 DEFAULT CREDIT TERM 30 DAYS로 변경여부 (#50421)
	if(formObj.i_trdp_cd.value =="" || formObj.i_trdp_cd.value == null){
	    var opt_key = "TRDP_DFLT_CREDIT_TERM";
	    ajaxSendPost(setTrdp_create_Dt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	}
	// TRADE PARTNER 처음생성시 DEFAULT Payment type 코드 관련 여부 (#50499)
	if(formObj.i_trdp_cd.value =="" || formObj.i_trdp_cd.value == null){
	    var opt_key = "TP_PAYMENT_TYPE_DEFAULT";
	    ajaxSendPost(setTrdp_payment_cd, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	}
	
	var opt_key = "TRDP_PAY_TO_SYNC";
    ajaxSendPost(setTrdpPryToSyncReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
    //52500 SYNC_BL_ADDR 키로 	Y 현재와 같이 localaddress 다른인포를 가지고 자동생성 	N 자동생성 하지 않는다 (사용자 직접입력) 2016.05 변경 
	ajaxSendPost(sybcBlAddrReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key=SYNC_BL_ADDR", "./GateServlet.gsl");
	//#6797:[GREAT LUCK] Make CLM as default by indicating checkmark when creating Trade Partner with TP type is 'Customer'
	var opt_key = "TP_AUTO_CHK_CLM";
	ajaxSendPost(getCheckClmFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	//OFVFOUR-7113: [GREAT LUCK] CLM INFORMATION MISSING
	//changeTrdpTp();

	/* 
	    AIF ERP Interface Button 이나 이제는 사용치 않음. 2016.12.29 (jipark)
		
		if(user_ofc_cd=="HQ"){
			document.getElementById("Interface").style.display="";
		}else{
			document.getElementById("Interface").style.display="none";
		}
	*/
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	goTabSelect(frm1.f_isNumSep.value);
	for(var i=0;isRun && i<docObjects.length;i++) {
		comConfigSheet (docObjects[i] , SYSTEM_BLUE);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
		if(i == docObjects.length - 1){
        	isRun = false;
        }
	}
	for(k=0;k<tabObjects.length;k++){
		initTab(tabObjects[k],k+1);
	}
	if(formObj.h_bill_to_agent.value == "Y"){
		formObj.bill_to_agent.checked=true;
	}
	//VAT LINE 설정
	if(formObj.h_ar_vat_line.value == "Y"){
		formObj.ar_vat_line.checked=true;
	}
	if(formObj.h_ap_vat_line.value == "Y"){
		formObj.ap_vat_line.checked=true;
	}
	if(formObj.h_clm_flg.value == "Y"){
		formObj.clm_flg.checked = true;
	}else{ //OFVFOUR-7113: [GREAT LUCK] CLM INFORMATION MISSING
		formObj.clm_flg.checked = false;
	}
	formObj.tax_type.value=formObj.h_tax_type.value;
	if(formObj.i_trdp_cd.value == ""){
		if(formObj.s_sts_cd.length > 1){
			formObj.s_sts_cd.selectedIndex=2;
		}
	}
	// Payment Term을 설정한다.
	setPaymentTerm();
	gridSearch("ALL");
	
	// #45003 : [Common] DEFAULT, MAINCMP 거래처 코드가 삭제 안되도록 수정
	var default_maincmp_yn = formObj.default_maincmp_yn.value;
	
	if (default_maincmp_yn == "Y") {
		formObj.delt_flg.disabled = true;
	} else {
		formObj.delt_flg.disabled = false;
	}
	
	//#5083 [CLA] BL EDI Improvement Requests
	if(formObj.edi_trdp_nm.value != ""){
		formObj.locl_nm.value   = formObj.edi_trdp_nm.value;	
	}
	if(formObj.edi_trdp_addr.value != ""){
		formObj.lgl_addr.value  = formObj.edi_trdp_addr.value;
	}
	if(formObj.edi_trdp_cnt_cd.value != ""){
		formObj.cnt_cd.value    = formObj.edi_trdp_cnt_cd.value;
	}
	//[#5077] [CLA] TP NAME & ADDRESS LINE AND CHARACTER COUNT TO SHOW
	engAddrChck(formObj.eng_addr);
	//OFVFOUR-7902 [Lever Logistics] Trade Partner Entry - Additional Name & Address
	ajaxSendPost(chkTrdpModiTms1, 'reqVal', '&goWhere=aj&bcKey=chkTrdpModiTms&trdp_cd='+formObj.i_trdp_cd.value, './GateServlet.gsl');
}
/** 
 * LHK 2013.02.07
 * Disable 된 Trade partner code 인 경우 조회 되지 않지만 기존 등록시 저장된 경우에는 combo 에 값을 Set
 */	
function addTpTyCd(){
	var formObj=document.frm1;
	var com_val=formObj.h_trdp_tp_cd.value;
	var com_nm=formObj.h_trdp_tp_nm.value;
	var cnt=0;
	$("#sel_trdp_tp_cd").find("option").each(function(){
		if(this.value == com_val){
			cnt++;
		}
	});
	if(cnt == 0){
		$("#sel_trdp_tp_cd").append("<option value='"+com_val+"'>"+com_nm+"</option>");
	}
}	
/**
 * Tab 클릭시 이벤트 관련
 * 선택한 탭의 요소가 활성화 된다.
 */
function tab1_OnChange(tabObj , nItem) {
	var objs=document.all.item("tabLayer");
	objs[nItem].style.display="Inline";
	objs[beforetab].style.display="none";
	//--------------- 요기가 중요 --------------------------//
	objs[beforetab].style.zIndex=objs[nItem].style.zIndex -1 ;
	//------------------------------------------------------//
	beforetab=nItem;
}

/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var formObj  = document.frm1;
	var cnt = 0;
	switch(sheetNo) {
		case 1:      //sheet 2 init
			with (sheetObj) {
	
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );
		        var arrTrdDiv=formObj.f_TrdDiv.value.split(";");
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel("SAL_TPM_0010_HDR1_1"), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"DelCheck",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"del_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ibflag4",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"CheckBox",  HeaderCheck:0, Hidden:0, TrueValue:"Y", FalseValue:"N"  , Width:60,   Align:"Center",  ColMerge:0,   SaveName:"rep_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
		               {Type:"CheckBox",  Hidden:0, TrueValue:"Y", FalseValue:"N"  , Width:60,   Align:"Center",  ColMerge:0,   SaveName:"pic_eml_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"pic_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		               {Type:"Combo",     Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"trd_div_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"pic_phn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:30 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"pic_mphn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:30 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"pic_fax",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:30 },
		               {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:0,   SaveName:"pic_eml",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		               {Type:"Text",      Hidden:0,  Width:250,   Align:"Left",    ColMerge:0,   SaveName:"pic_desc",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
		               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"sheet4",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cntc_pson_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"trd_div_nm" },
		               {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"rgst_ofc_cd" },
		               {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"trdp_cd" }];
		              if (arrTrdDiv.length > 0) {
		            	  	sheetObj.InitDataCombo(0, "trd_div_cd", " |"+arrTrdDiv[1], " |"+arrTrdDiv[0]);
		              }
		   
		        InitColumns(cols);

		        SetEditable(1);
		        SetColProperty("trd_div_cd", {ComboText:"|"+arrTrdDiv[1], ComboCode:"|"+arrTrdDiv[0]} );
		        SetColProperty(0 ,"pic_eml" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:0});
	            SetHeaderRowHeight(20 );

			    SetSheetHeight(150);
			       

			}
		break;

		case 2:      //sheet 2 init
			with (sheetObj) {
		        
	
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );
		        var strBankCd="";
		        var strBankVal="";
		        var strBank=formObj.f_bankList.value;
		        var arrBank=strBank.split(';');
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('SAL_TPM_0010_HDR3'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"DelCheck",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Status",    Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag3" },
		               {Type:"Combo",     Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"bank_cd",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"acct_no",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:40 },
		               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"acct_dpsr_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		               {Type:"Text",      Hidden:0,  Width:200,   Align:"Left",    ColMerge:1,   SaveName:"acct_desc",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
		               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sheet3",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 }  ];
		              if ( arrBank.length > 0 ) {
		        strBankCd = arrBank[0];
		        strBankVal = arrBank[1];
		        sheetObj.InitDataCombo(0, 2, strBankVal, strBankCd);
		        }
		   
		        InitColumns(cols);
	
		        SetEditable(1);
		        SetColProperty(2, {ComboText:strBankVal, ComboCode:strBankCd} );
		              //지원안함[확인요망]HANJIN: 				InitDataValid(0, 3, vtNumericOther, "-");
		      
		        SetSheetHeight(240);

			}
		break;
		
		case 3:      //sheet1 init
		    with(sheetObj){
	        

		      SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SAL_TPM_0010_HDR1'), Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"DelCheck",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Status",    Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag1" },
		             {Type:"Text",      Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"cntc_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"sls_pson_pic",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
		             {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:"sls_his_tit",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
		             {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sls_popup",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"sls_his_ctnt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:4000 },
		             {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sheet1",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sls_his_flat_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sls_his_flat_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }  ];
		       
		      InitColumns(cols);
	
		      SetEditable(1);
		      SetImageList(0,APP_PATH+"/web/img/button/bt_file.gif");
		      SetCellAlign(0, 'sls_popup', "Center");
		      sheetObj.SetDataLinkMouse("sls_popup",1);
		      SetSheetHeight(240);
	      }


		break;

		case 4:      //sheet 2 init
		    with(sheetObj){

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('SAL_TFM_0040_HDR_1'), Align:"Center"},
	                  { Text:getLabel('SAL_TFM_0040_HDR_2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag2" },
	             {Type:"Seq",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	             {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
	             {Type:"Combo",     Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"trf_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:6 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"trf_ctrt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
	             {Type:"Combo",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"sell_buy_tp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:6 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"pol_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
	             {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:1,   SaveName:"pol_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"pod_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
	             {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:1,   SaveName:"pod_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"dest_del_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
	             {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:1,   SaveName:"dest_del_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
	             {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"trf_term_fm_dt",  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
	             {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"trf_term_to_dt",  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 }  ];
	       
	      InitColumns(cols);

	      SetEditable(1);
	      SetColProperty("sell_buy_tp_cd", {ComboText:"Selling|Buying", ComboCode:"S|B"} );
	      SetColProperty("trf_tp_cd", {ComboText:"SEA|AIR", ComboCode:"S|A"} );
	            SetHeaderRowHeight(21);
//	      InitViewFormat(0, "trf_term_fm_dt", "MM\\/dd\\/yyyy");//날짜 포맷을 월/일/년 으로 설정
//	      InitViewFormat(0, "trf_term_to_dt", "MM\\/dd\\/yyyy");//날짜 포맷을 월/일/년 으로 설정
	      //InitViewFormat(0, "trf_term_fm_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	      //InitViewFormat(0, "trf_term_to_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	      //지원안함[확인요망]HANJIN: 			EditDateFormat="MDY";//날짜 입력을 월/일/년 으로 설정
	        SetSheetHeight(240);
	      }


		break;
		
		case 5:      //sheet 5 init
		  with(sheetObj){
		      var HeadTitle0="TRDP_CD";
	
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:2, FrozenCol:0, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:HeadTitle0, Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ,{Type:"Status",    Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" }
		                        ];
		       
		      InitColumns(cols);
		      SetVisible(0);
		      SetEditable(1);
	      }


		break;
		case 6:      //sheet 2 init
		    with(sheetObj){
			      var i=0;
		
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );
			      var strRltPrnrTpCd="";
			      var strRltPrnrTpCdVal="";
			      var strRltPrnrTpCd=formObj.f_RltPrnrTpCd.value;
			      var arrRltPrnrTpCd=strRltPrnrTpCd.split(';');
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('SAL_TPM_0010_HDR6_1'), Align:"Center"},
			                  { Text:getLabel('SAL_TPM_0010_HDR6_2'), Align:"Center"} ];
			      InitHeaders(headers, info);
		
			      var cols = [ {Type:"DelCheck",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Status",    Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag6" },
			             {Type:"Text",      Hidden:1,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			             {Type:"Text",      Hidden:1,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"cb_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"cb_dest",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			             {Type:"PopupEdit", Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"cb_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:400,  Align:"Left",    ColMerge:1,   SaveName:"cb_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
			             {Type:"Combo",     Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:"rlt_prnr_tp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
			             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"rgst_usrid",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
			             {Type:"Date",      Hidden:0,  Width:200,  Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Date",      Hidden:0,  Width:200,  Align:"Center",  ColMerge:1,   SaveName:"modi_tms",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sheet6",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 }  ];
			            if ( arrRltPrnrTpCd.length > 0 ) {
			            	strRltPrnrTpCd = arrRltPrnrTpCd[0];
						      strRltPrnrTpCdVal = arrRltPrnrTpCd[1];
						      sheetObj.InitDataCombo(0, "rlt_prnr_tp_cd", strRltPrnrTpCdVal, strRltPrnrTpCd);
				      }
	 
			      InitColumns(cols);
		
			      SetEditable(1);
			      SetColProperty("rlt_prnr_tp_cd", {ComboText:strRltPrnrTpCdVal, ComboCode:strRltPrnrTpCd} );
//			      InitViewFormat(0, "rgst_tms", "MM\\/dd\\/yyyy");//날짜 포맷을 월/일/년 으로 설정
//			      InitViewFormat(0, "modi_tms", "MM\\/dd\\/yyyy");//날짜 포맷을 월/일/년 으로 설정
			      //InitViewFormat(0, "rgst_tms", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
			      //InitViewFormat(0, "modi_tms", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
			      SetSheetHeight(240);
			      //지원안함[확인요망]HANJIN: 			EditDateFormat="MDY";//날짜 입력을 월/일/년 으로 설정

	      }


		break;
		
		case 7:
		    with(sheetObj){
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SAL_TPM_0010_HDR7'), Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"DelCheck",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Status",    Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag7" },
		             {Type:"Float",     Hidden:0,  Width:150,   Align:"Right",   ColMerge:1,   SaveName:"f_rate",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",     Hidden:0,  Width:150,   Align:"Right",   ColMerge:1,   SaveName:"f_min",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",     Hidden:0,  Width:150,   Align:"Right",   ColMerge:1,   SaveName:"f_max",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Combo",     Hidden:0,  Width:150,   Align:"Center",  ColMerge:1,   SaveName:"f_ut_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Date",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"f_valid_dt",  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"f_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sheet7",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"f_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 }  ];
		       
		      InitColumns(cols);
	
		      SetEditable(1);
		      SetColProperty("f_ut_cd", {ComboText:"G.wgt|C.wgt|G.lbs|C.lbs", ComboCode:"gw|cw|gl|cl"} );
		      //SetColProperty("f_ut_cd", {ComboText:UNITCD1, ComboCode:UNITCD2} );
		      
//		      InitViewFormat(0, "f_valid_dt", "MM\\/dd\\/yyyy");//날짜 포맷을 월/일/년 으로 설정
		      //InitViewFormat(0, "f_valid_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		      //지원안함[확인요망]HANJIN: 			EditDateFormat="MDY";//날짜 입력을 월/일/년 으로 설정
			  SetSheetHeight(280);
	      }


		break;
		
		case 8:
		    with(sheetObj){

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('SAL_TPM_0010_HDR8'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"DelCheck",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Status",    Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag8" },
	             {Type:"Float",      Hidden:0,  Width:150,   Align:"Right",   ColMerge:1,   SaveName:"s_rate",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",      Hidden:0,  Width:150,   Align:"Right",   ColMerge:1,   SaveName:"s_min",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",      Hidden:0,  Width:150,   Align:"Right",   ColMerge:1,   SaveName:"s_max",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Combo",     Hidden:0,  Width:150,   Align:"Center",  ColMerge:1,   SaveName:"s_ut_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"s_valid_dt",  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"s_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sheet8",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"s_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 }  ];
	       
	      InitColumns(cols);

	      SetEditable(1);
	      SetColProperty("s_ut_cd", {ComboText:"G.wgt|C.wgt|G.lbs|C.lbs", ComboCode:"gw|cw|gl|cl"} );
//	            InitViewFormat(0, "s_valid_dt", "MM\\/dd\\/yyyy");//날짜 포맷을 월/일/년 으로 설정
	            //InitViewFormat(0, "s_valid_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	      //지원안함[확인요망]HANJIN: 			EditDateFormat="MDY";//날짜 입력을 월/일/년 으로 설정
		        SetSheetHeight(280);
	      }


		break;
		case 9:
			with (sheetObj) {

				SetConfig({	SearchMode : 2,MergeSheet : 5,Page : 100,FrozenCol : 0,DataRowMerge : 1});

				var info = {Sort : 1,ColMove : 1,HeaderCheck : 1,ColResize : 1};
				var headers = [ {Text:getLabel('SAL_TPM_0010_HDR9'),Align:"Center"} ];
				InitHeaders(headers, info);

				var cols = [ {Type : "DelCheck",Hidden : 0,Width : 60,Align : "Center",ColMerge : 1,SaveName : "",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,UpdateEdit : 1,InsertEdit : 1}, 
					{Type : "seq",Hidden : 1,Width : 50,Align : "Center",ColMerge : 1,SaveName : "seq",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,UpdateEdit : 1,InsertEdit : 1,EditLen : 3},
					{Type : "Text",Hidden : 0,Width : 300,Align : "Left",ColMerge : 1,SaveName : "trdp_nm",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,UpdateEdit : 1,InsertEdit : 1,EditLen : 200},
					{Type : "Combo",Hidden : 0,Width : 150,	Align : "Center",ColMerge : 1,SaveName : "trdp_addr_tp",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,	UpdateEdit : 1,InsertEdit : 1},
					{Type : "Text",Hidden : 0,Width : 700,Align : "Left",ColMerge : 1,SaveName : "trdp_add_addr",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,UpdateEdit : 0,InsertEdit : 0,EditLen : 400},
					{Type : "Image",Hidden : 0,Width : 30,Align : "Center",ColMerge : 0,SaveName : "trdp_addr_img",KeyField : 0,CalcLogic : "",Format : "",	PointCount : 0,	UpdateEdit : 0,InsertEdit : 0},
					{Type : "Text",Hidden : 0,Width : 400,Align : "Left",ColMerge : 1,SaveName : "rmk",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,UpdateEdit : 1,InsertEdit : 1,EditLen : 400},
					{Type : "Text",Hidden : 1,Width : 80,Align : "Center",ColMerge : 1,SaveName : "sheet9",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,UpdateEdit : 1,InsertEdit : 1},
					{Type : "Status",Hidden : 1,Width : 40,Align : "Center",ColMerge : 1,SaveName : "ibflag9"} ];

				InitColumns(cols);
				SetColProperty("trdp_addr_tp", {
					ComboText : "Local Address|B/L Address|Billing Address",
					ComboCode : "lcl|bl|blg"
				});
				SetImageList(0, "web/img/main/icon_m.gif");
				SetEditable(1);

				SetSheetHeight(200);
			}
			break;
	}
}
var obj1Work=false;
var obj3Work=false;
var obj4Work=false;
var obj6Work=false;
//2012.06.19 fuel surcharge, security charge
var obj7Work=false;
var obj8Work=false;
/**
 * Save 버튼 실행시 저장처리 완료후 메시지 및 데이터 표시
 */
function sheet5_OnSaveEnd(sheetObj, ErrMsg){
	if(ErrMsg == undefined  || ErrMsg==''){
		if(obj1Work){
			gridSearch("1");
		}
		if(obj3Work){
			gridSearch("3");
		}
		if(obj4Work){
			gridSearch("4");	
		}
		if(obj6Work){
			gridSearch("6");	
		}
		if(obj7Work){
			gridSearch("7");	
		}
		if(obj8Work){
			gridSearch("8");	
		}
		//alert(CM_MSG3); //Completed!
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
		obj1Work=false;
		obj3Work=false;
		obj4Work=false;
		obj6Work=false;
		obj7Work=false;
		obj8Work=false;
	}
	if(frm1.f_cmd.value==ADD || frm1.f_cmd.value==COMMAND01){
		frm1.s_trdp_cd.value=sheetObj.GetCellValue(1, 'trdp_cd');
		frm1.i_trdp_cd.value=sheetObj.GetCellValue(1, 'trdp_cd');
		frm1.hidden_trdp_cd.value=frm1.i_trdp_cd.value;
		frm1.i_trdp_cd.className='search_form-disable';
		frm1.i_trdp_cd.readOnly=true;
		getObj('keyInDisp').style.display='none';
	}
	//frm1.vis_id_org.value=frm1.vis_id.value;
	
	submitForm(SEARCHLIST);	
}
/**
 * 화면 폼입력값에 대한 유효성검증 프로세스 처리
 */
function validateForm(formObj){
	var isOk=true;
	//Bank Account Information인 경우
	var totRow=docObjects[2].LastRow()+1;
	for(var i=1; i < totRow ; i++){
		if(docObjects[2].GetCellValue(i, 'ibflag3')=='U'||docObjects[2].GetCellValue(i, 'ibflag3')=='I'){
			if(checkInputVal(docObjects[2].GetCellValue(i, 'bank_cd'), 1, 6, "T", getLabel('NAME'))!='O'){
				isOk=false;
				break;
			}else if(checkInputVal(docObjects[2].GetCellValue(i, 'acct_no'),      3, 20, "T", getLabel('ACC_NO'))!='O'){
				isOk=false;
				break;
			}else if(checkInputVal(docObjects[2].GetCellValue(i, 'acct_dpsr_nm'), 3, 50, "T", getLabel('HOL'))!='O'){
				isOk=false;
				break;
			}else if(checkInputVal(docObjects[2].GetCellValue(i, 'acct_desc'),    0, 200, "T", getLabel('RMK'))!='O'){
				isOk=false;
				break;
			}
		}
	}
	//Contact Person Information
	if(isOk){
		totRow=docObjects[3].LastRow()+1;
		for(var i=1; i < totRow ; i++){
			if(docObjects[3].GetCellValue(i, 'ibflag4')=='U'||docObjects[3].GetCellValue(i, 'ibflag4')=='I'){
					if(checkInputVal(docObjects[3].GetCellValue(i, 'pic_nm'), 3, 50, "T", getLabel('NAME'))!='O'){
						isOk=false;
						break;
					}else if(checkInputVal(docObjects[3].GetCellValue(i, 'trd_div_nm'), 2, 50, "T", getLabel('DIV'))!='O'){
						isOk=false;
						break;
					}else if(checkInputVal(docObjects[3].GetCellValue(i, 'pic_phn'),  3, 30, "T", getLabel('TEL'))!='O'){
						isOk=false;
						break;
					}else if(checkInputVal(docObjects[3].GetCellValue(i, 'pic_fax'),  0, 30, "T", getLabel('FAX'))!='O'){
						isOk=false;
						break;
					}else if(checkInputVal(docObjects[3].GetCellValue(i, 'pic_eml'),  0, 100, "T", getLabel('EMAIL'))!='O'){
						isOk=false;
						break;
					}else if(checkInputVal(docObjects[3].GetCellValue(i, 'pic_desc'), 0, 200, "T", getLabel('RMK'))!='O'){
						isOk=false;
						break;
				}
			}
		}
	}
    return isOk;
}
//직접입력 여부
function doKeyInCheck(obj){
	//alert(obj.checked + " " + frm1.hidden_trdp_cd.value );
	if(obj.checked && frm1.hidden_trdp_cd.value == ""){
		frm1.i_trdp_cd.className='search_form';
		frm1.i_trdp_cd.readOnly=false;
		frm1.i_trdp_cd.focus();
	}else if(!obj.checked && frm1.hidden_trdp_cd.value == ""){
		frm1.i_trdp_cd.className='search_form-disable';
		frm1.i_trdp_cd.readOnly=true;
		frm1.i_trdp_cd.value="";
	}else{
		frm1.i_trdp_cd.className='search_form-disable';
		frm1.i_trdp_cd.readOnly=true;
		//frm1.i_trdp_cd.value = '';
	}
}
//function credit(){
//	var formObj = document.frm1;
//	if(formObj.cr_term_cd.value=="A" || formObj.cr_term_cd.value=="D"){
//		formObj.cr_term_dt.disabled = false;
//		formObj.cr_term_dt.focus();
//	}else{
//		formObj.cr_term_dt.disabled = true;
//		formObj.cr_term_dt.value = "";
//	}
//}
function checkTpCode(){
	var formObj=document.frm1;
	formObj.ceo_nm.readOnly=false;		formObj.ceo_nm.className="search_form";
//		formObj.grp_id_cd.disabled = false;		formObj.grp_id_cd.className = "search_form";
	formObj.corp_no.readOnly=false;		formObj.corp_no.className="search_form";
//		formObj.biz_no.readOnly = false;		formObj.biz_no.className = "search_form";
//		formObj.tax_iss_addr.readOnly = false;	formObj.tax_iss_addr.className = "search_form";
//		formObj.rmk.readOnly = false;			formObj.rmk.className = "search_form";
}
function chkBiz(){
	var formObj=document.frm1;
	onOnlyNumber(formObj.biz_no);
	if(formObj.biz_no.value.length==3 || formObj.biz_no.value.length==6){
		formObj.biz_no.value += "-";
	}else if(formObj.biz_no.value.length==12){
		event.returnValue=false;
	}
}
function chkZip(){
	/*
	var formObj=document.frm1;
	onOnlyNumber(formObj.rep_zip);
	if(formObj.rep_zip.value.length==3){
		formObj.rep_zip.value += "-";
	}else if(formObj.rep_zip.value.length==12){
		event.returnValue=false;
	}
	*/
}
function chkCorp(){
	var formObj=document.frm1;
	onOnlyNumber(formObj.corp_no);
}
function onOnlyNumber(obj){
	for(var i=0; i<obj.value.length ; i++){
		var chr=obj.value.substr(i,1);  
		var chr=escape(chr);
		var key_eg=chr.charAt(1);
		if(key_eg == "u"){
			key_num=chr.substr(i,(chr.length-1));   
			if((key_num < "AC00") || (key_num > "D7A3")) { 
				event.returnValue=false;
			}    
		}
	}
	if(event.keyCode >= 48 && event.keyCode <= 57){
	}else{
		event.returnValue=false;
	}
}
/**
 * code name select
 */
function codeNameAction(str, obj){
	var s_code=obj.value.toUpperCase();
	
	CODETYPE=str;
	//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
	if (str == "entered_by" || str == "user_sales" || str == "user_cs"){
		str = 'user';
	}
	
	if (window.event.keyCode == 13 && s_code == "") {
		if ((str == "commodity") || (str == "country") || (str == "location") || (str == "state")) {
			document.getElementById(str).onclick();
		}
	} else if ((window.event.keyCode == 13 && s_code != "") || window.event.type == "blur" || str == "all_user_count") {
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+obj.value, './GateServlet.gsl');
	}
}


function sheet4_OnDblClick(sheetObj,Row,Col){
    var formObj=document.frm1;
    doProcess=true;
   	formObj.f_cmd.value="";
   	var trf_tp_cd=sheetObj.cellValue(Row, "trf_tp_cd");
   	if(trf_tp_cd=="S"){
		var paramStr="./SAL_TFM_0010.clt?f_cmd="+COMMAND01+"&trdp_cd="+sheetObj.GetCellValue(Row,"trdp_cd")+"&trf_tp_cd="+sheetObj.GetCellValue(Row,"trf_tp_cd")+
		"&trf_ctrt_no="+sheetObj.GetCellValue(Row,"trf_ctrt_no")+"&sell_buy_tp_cd="+sheetObj.GetCellValue(Row,"sell_buy_tp_cd")+
		"&pol_cd="+sheetObj.GetCellValue(Row,"pol_cd")+"&pod_cd="+sheetObj.GetCellValue(Row,"pod_cd")+
		"&dest_del_cd="+sheetObj.GetCellValue(Row,"dest_del_cd")+"&f_req_type=C";
   		parent.mkNewFrame('Sea Tarrif', paramStr);
	}else{
		var paramStr="./SAL_TFM_0020.clt?f_cmd="+COMMAND01+"&trdp_cd="+sheetObj.GetCellValue(Row,"trdp_cd")+"&trf_tp_cd="+sheetObj.GetCellValue(Row,"trf_tp_cd")+
		"&trf_ctrt_no="+sheetObj.GetCellValue(Row,"trf_ctrt_no")+"&sell_buy_tp_cd="+sheetObj.GetCellValue(Row,"sell_buy_tp_cd")+
		"&pol_cd="+sheetObj.GetCellValue(Row,"pol_cd")+"&pod_cd="+sheetObj.GetCellValue(Row,"pod_cd")+
		"&dest_del_cd="+sheetObj.GetCellValue(Row,"dest_del_cd")+"&f_req_type=C";
   		parent.mkNewFrame('Air Tarrif', paramStr);
   	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined' && doc[1] != ''){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="trdpcode"){
				formObj.an_bond_pur_cd.value=masterVals[0];//trdp_cd
				formObj.an_bond_pur_nm.value=masterVals[3];//full_nm
			}else if(CODETYPE =="country"){
				formObj.cnt_cd.value=masterVals[0];//cnt_cd
				formObj.cnt_nm.value=masterVals[3];//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.city_cd.value=masterVals[0]; // loc_cd 
				formObj.city_nm.value=masterVals[3]; // loc_nm 
				bl_addr_chg();
			}else if(CODETYPE =="currency"){
				formObj.curr_cd.value=masterVals[0];//cd_val
				formObj.curr_nm.value=masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.sls_ofc_cd.value=masterVals[0];
				formObj.sls_ofc_nm.value=masterVals[3];
			}else if(CODETYPE =="user_sales"){//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
				formObj.sls_usrid.value=masterVals[0];
				formObj.sls_usrnm.value=masterVals[4];
			}else if(CODETYPE =="user_cs"){//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
				formObj.cs_usrid.value=masterVals[0];
				formObj.cs_usrnm.value=masterVals[4];
			} else if(CODETYPE =="entered_by"){
				formObj.an_bond_entr_usrid.value=masterVals[0];
				formObj.an_bond_entr_usrnm.value=masterVals[3];
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value=masterVals[0];
				formObj.s_freight_name.value=masterVals[3];
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value=masterVals[0];
				formObj.s_container_name.value=masterVals[3];
			}else if(CODETYPE =="commodity"){
				formObj.cmdt_cd.value=masterVals[0];
				formObj.cmdt_nm.value=masterVals[3];
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value=masterVals[0];
				formObj.s_package_name.value=masterVals[3];
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value=masterVals[0];
				formObj.s_cargo_name.value=masterVals[3];
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value=masterVals[0];
				formObj.s_vessel_name.value=masterVals[3];
			}else if(CODETYPE =="state"){
				formObj.state_cd.value=masterVals[0];
			}else if(CODETYPE =="all_user_count"){
				/*formObj.vis_id_chk.value='N';
				if (masterVals[3] > 0) {
					// Duplicated Data!
					alert(getLabel("FMS_COM_ALT008") + "\n[Visibility ID]");
					formObj.vis_id.value="";
					formObj.vis_id.focus();
					formObj.vis_id_chk.value='Y';
				}*/
			}
		}else{
			if(CODETYPE =="trdpcode"){
				formObj.an_bond_pur_cd.value="";//trdp_cd
				formObj.an_bond_pur_nm.value="";//full_nm
			}else if(CODETYPE =="country"){
				formObj.cnt_cd.value="";//cnt_cd
				formObj.cnt_nm.value="";//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.city_cd.value=""; // loc_cd 
				formObj.city_nm.value=""; // loc_nm 
				bl_addr_chg();
			}else if(CODETYPE =="currency"){
				formObj.curr_cd.value="";
				formObj.curr_nm.value="";//cd_nm
			}else if(CODETYPE =="office"){
				formObj.sls_ofc_cd.value="";
				formObj.sls_ofc_nm.value="";
			}else if(CODETYPE =="user_sales"){//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
				formObj.sls_usrid.value="";
				formObj.sls_usrnm.value="";
			}else if(CODETYPE =="user_cs"){//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
				formObj.cs_usrid.value="";
				formObj.cs_usrnm.value="";
			} else if(CODETYPE =="entered_by"){
				formObj.an_bond_entr_usrid.value="";
				formObj.an_bond_entr_usrnm.value="";
			}else if(CODETYPE =="freight"){
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value="";
				formObj.s_freight_name.value="";
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value="";
				formObj.s_container_name.value="";
			}else if(CODETYPE =="commodity"){
				formObj.cmdt_cd.value="";
				formObj.cmdt_nm.value="";
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value="";
				formObj.s_package_name.value="";
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value="";
				formObj.s_cargo_name.value="";
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value="";
				formObj.s_vessel_name.value="";
			}else if(CODETYPE =="state"){
				formObj.state_cd.value="";
			}else if(CODETYPE =="all_user_count"){
				// Unexpected Error occurred. Please Contact Help Desk!
				alert(getLabel("FMS_COM_ERR002"));
/*				formObj.vis_id.value="";
				formObj.vis_id.focus();*/
			}
		}
	}else{
		//Error Errupt!	
		//alert(getLabel('FMS_COM_ERR001'));		
	}
}
function chkBizNo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(formObj.biz_no.value != ""){
		formObj.f_biz_no.value=doc[1];
	}else{
		formObj.f_biz_no.value="Y";
	}
}
function formatZipCode(code){
	var formObj=document.frm1;
	if(code==null || code==""){
		return;
	}
	var zip=code.substr(0,3) + "-" + code.substr(3,3);
	formObj.rep_zip.value=zip;
}
//function deFormatZipCode(code){
//	var formObj  = document.frm1;
//	if(code==null || code==""){
//		return "";
//	}
//	var zip = code.substr(0,3) + code.substr(4,3);
//	formObj.rep_zip.value = zip;
//}
function eng_nm_chg(val){
	var formObj=document.frm1;
	if(val != ""){
		if(formObj.i_trdp_cd.value == ""){
			if(formObj.locl_nm.value == ""){
				formObj.locl_nm.value=val;
			}
		}
		if(formObj.shrt_nm.value == ""){
			formObj.shrt_nm.value=val;
		}
		//#27540 [BINEX] Check Vendor 명 표기
		//#48932 [IMPEX] TRDP ENTRY - PAY TO THE ORDER OF NAME > 값이 있더라도 Eng nm 수정시 같이 수정되도록 
		//if(formObj.reserve_field09.value == ""){
		//formObj.reserve_field09.value = val;
		//}
		
		// #48932 - [IMPEX] TRDP ENTRY - PAY TO THE ORDER OF NAME
		if(formObj.reserve_field09.value == ""){
			formObj.reserve_field09.value = val;
		}else{
			if(TRDP_PAY_TO_SYNC == "Y"){
				if(formObj.pre_eng_nm.value != formObj.eng_nm.value){
					formObj.reserve_field09.value = val;
				}
			}
		}
		frm1.pre_eng_nm.value = frm1.eng_nm.value;
	}
}
/*
function addr_locl_chg(val){
	var formObj=document.frm1;
	if(val != ""){
		if(formObj.eng_nm.value != ""){
			formObj.eng_addr.value=formObj.eng_nm.value + "\r\n" + val;
		}else{
			formObj.eng_addr.value=val;
		}
//		formObj.tax_iss_addr.value = val;
	}
}
*/ 
function bl_addr_chg(){
	
	//52500[CLT] Trade Partner Address 자동생성 옵션화 |Enhanced optional synchronization between Trade Partner B/L Address and Local Address for non US customer, 
	//다국어 등록가능할시에는 자동생성을 하지 않는다
	//alert(MULTI_LANGUAGE);
	//SYNC_BL_ADDR 키로 	Y 현재와 같이 localaddress 다른인포를 가지고 자동생성 	N 자동생성 하지 않는다 (사용자 직접입력) 2016.05 변경
	//alert(sybcBlAddr);
	if (sybcBlAddr == "N"){
		return false;
	} 
	
	
	
	var formObj=document.frm1;
	var loclAddr="";
	var addStr=formObj.city_nm.value;
	if(formObj.lgl_addr.value != ""){
		if(formObj.eng_nm.value != ""){
			loclAddr=formObj.eng_nm.value + "\r\n" +formObj.lgl_addr.value;
		}else{
			loclAddr=formObj.lgl_addr.value;
		}
	}
	//if(formObj.tax_iss_addr.value != ""){
	//	return;
	//}
	if(formObj.state_cd.value != ""){
		addStr=addStr != "" ? addStr + ", " + formObj.state_cd.value : formObj.state_cd.value;
	}
	if(formObj.rep_zip.value != "" ){
		if(formObj.state_cd.value != ""){
			addStr=addStr + " " + formObj.rep_zip.value;
		}else{
			addStr=addStr != "" ? addStr + ", " + formObj.rep_zip.value : formObj.rep_zip.value;
		}
	}
	
	// #48740 - [IMPEX] TRADE PARTNER'S COUNTRY INFO TO SHOW ON BL ADDRESSES
	if(formObj.cnt_nm.value != "" ){
		addStr=addStr != "" ? addStr + " " + formObj.cnt_nm.value : formObj.cnt_nm.value;
	}
	
	var opt_key = "BL_ADDR_ATTN";
	ajaxSendPost(setBlAddrAttnReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//LHK 2013.07.11 BL Adress 에 Pic 정보 추가 
	var sheetObj=docObjects[0];	
	var picInfoStr="";
	var totRow=sheetObj.LastRow()+1;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'del_flg')=='0' && sheetObj.GetCellValue(i, 'rep_flg')=='1'){
			if (bl_addr_attn != "N"){
				if(sheetObj.GetCellValue(i, 'pic_nm') != "" || sheetObj.GetCellValue(i, 'pic_eml') != ""){
					picInfoStr="ATTN:";
				}
				picInfoStr=picInfoStr + sheetObj.GetCellValue(i, 'pic_nm');
				if(sheetObj.GetCellValue(i, 'pic_eml') != ""){
					if(sheetObj.GetCellValue(i, 'pic_nm') == ""){
						picInfoStr=picInfoStr + sheetObj.GetCellValue(i, 'pic_eml');
					}else{
						picInfoStr=picInfoStr + " (" + sheetObj.GetCellValue(i, 'pic_eml') + ")";
					}
				}
			}
			if(sheetObj.GetCellValue(i, 'pic_phn') != ""){
				if(picInfoStr == ""){
					picInfoStr="TEL:" + sheetObj.GetCellValue(i, 'pic_phn');
				}else{
					picInfoStr=picInfoStr + "\r\n" + "TEL:" + sheetObj.GetCellValue(i, 'pic_phn');
				}
			}
			if(sheetObj.GetCellValue(i, 'pic_fax') != ""){
				if(picInfoStr == ""){
					picInfoStr="Fax:" + sheetObj.GetCellValue(i, 'pic_fax');
				}else{
					picInfoStr=picInfoStr + " Fax:" + sheetObj.GetCellValue(i, 'pic_fax');
				}
			}	
		}
	}
	if(addStr != ""){
		addStr=addStr + "\r\n" + picInfoStr;
	}else{
		addStr=picInfoStr;
	}
	if(loclAddr != ""){
		if(addStr != ""){
			formObj.eng_addr.value=loclAddr + "\r\n" + addStr;
		}else{
			formObj.eng_addr.value=loclAddr;
		}
	}else{
		formObj.eng_addr.value=addStr;
	}
//	if(!checkTxtAreaLn(formObj.eng_addr, 62, 6, 'Name on B/L')){
//		formObj.eng_addr.focus();
//	}
	
	// #48153 New일 경우에 Billing Address에도 수정을 한다
	// New일 경우 > s_trdp_cd.value(조회항목의 Trdp CD가 입력되지 않았을 경우로 판단)
	if (formObj.s_trdp_cd.value == '') {
		//formObj.tax_iss_addr.value = formObj.eng_addr.value;
		//LHK, 20150506 #48528 [IMPEX] TP ENTRY BILLING 주소에 이름도 자동 카피되어 CHECK에도 회사 이름 DUPLICATE 됨
		acct_addr_copy();
	}
}
function acct_addr_copy(){
	var formObj=document.frm1;
	var loclAddr=formObj.lgl_addr.value;
	var addStr=formObj.city_nm.value;
	
	/* 48153 요건으로 주석처리함  
	if(formObj.tax_iss_addr.value != ""){
		return;
	}*/
	
	if(formObj.state_cd.value != ""){
		addStr=addStr != "" ? addStr + ", " + formObj.state_cd.value : formObj.state_cd.value;
	}
	if(formObj.rep_zip.value != "" ){
		if(formObj.state_cd.value != ""){
			addStr=addStr + " " + formObj.rep_zip.value;
		}else{
			addStr=addStr != "" ? addStr + ", " + formObj.rep_zip.value : formObj.rep_zip.value;
		}
	}
	/*
	if(formObj.cnt_nm.value != "" ){
		addStr=addStr != "" ? addStr + "\r\n" + formObj.cnt_nm.value : formObj.cnt_nm.value;
	}
	*/
	if(loclAddr != ""){
		if(addStr != ""){
			formObj.tax_iss_addr.value=loclAddr + "\r\n" + addStr;
		}else{
			formObj.tax_iss_addr.value=loclAddr;
		}
	}else{
		formObj.tax_iss_addr.value=addStr;
	}
}
var trdpCdDupl="N";
function chkTrdpCdDupl(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		trdpCdDupl=doc[1];
	}
}
function getTrdpCheck(reqVal){
	var rtnVal=true;
	var doc=getAjaxMsgXML(reqVal);
//	var strVal = "";
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj3=docObjects[2];
	var sheetObj4=docObjects[3];
	var sheetObj5=docObjects[4];
	var sheetObj6=docObjects[5];
	var sheetObj7=docObjects[6];
	var sheetObj8=docObjects[7];
	var sheetObj9 = docObjects[8];
    var formObj=document.frm1;
    
	if(doc[0]=='OK'){
		if(formObj.i_trdp_cd.value == "" && (typeof(doc[1])!='undefined'  && doc[1] != '0' )){//데이터 신규생성일때만 Eng Name 중복체크
			//#24572 OYH 중복 체크 걸려도 Alert만 하고  SAVE 가능하게 변경
			alert(getLabel('SAL_COM_ALT030'));
		}
		
		ajaxSendPost(getTrdpCheckByIata, 'reqVal', '&goWhere=aj&bcKey=getTrdpCheckByIata&iata_cd='+ frm1.iata_cd.value + '&trdp_cd=' + frm1.i_trdp_cd.value, './GateServlet.gsl');		
		
		if(iataDupChecker){
			//2013.07.04 LHK Other Info. Prefix 중복 체크
	   		ajaxSendPost(getPrefixCheck, 'reqVal', '&goWhere=aj&bcKey=getPrefixCheck&trdp_cd=' +frm1.i_trdp_cd.value
	   																				+"&oe_ref_prfx="+frm1.oe_ref_prfx.value
	   																				+"&oi_ref_prfx="+frm1.oi_ref_prfx.value
	   																				+"&ae_ref_prfx="+frm1.ae_ref_prfx.value
	   																				+"&ai_ref_prfx="+frm1.ai_ref_prfx.value
	   																				+"&oe_hbl_prfx="+frm1.oe_hbl_prfx.value
	   																				+"&ae_awb_prfx="+frm1.ae_awb_prfx.value, './GateServlet.gsl');
		}
	}
//	else{
//	}
	return rtnVal;
}

var iataDupChecker = false;
var alertChecker = false;

function getTrdpCheckByIata(reqVal){
	var rtnVal=true;
	var doc=getAjaxMsgXML(reqVal);
    var formObj=document.frm1;
    
	if(doc[0]=='OK'){
		if(0 < Number(doc[1])){
			if(confirm(getLabel('SAL_COM_ALT029') + "\n" + getLabel('SAL_COM_ALT004'))){
				iataDupChecker = true;
				alertChecker = true;
			}else{
				iataDupChecker = false;
			}
		}else{
			iataDupChecker = true;
			alertChecker = false;
		}
	}
//	else{
//	}
	return rtnVal;
}
function getPrefixCheck(reqVal){
	try {
		var rtnVal=true;
		var doc=getAjaxMsgXML(reqVal);
		var sheetObj1=docObjects[0];
		var sheetObj2=docObjects[1];
		var sheetObj3=docObjects[2];
		var sheetObj4=docObjects[3];
		var sheetObj5=docObjects[4];
		var sheetObj6=docObjects[5];
		var sheetObj7=docObjects[6];
		var sheetObj8=docObjects[7];
		var sheetObj9=docObjects[8];
		var formObj=document.frm1;
		if(doc[0]=='OK'){
			if(typeof(doc[1])!='undefined'){
				var rtnArr=doc[1].split('@@;');
				var masterVals=rtnArr[0].split('@@^');
				if(masterVals[1] == formObj.oi_ref_prfx.value && masterVals[1] != ''){
					alert(getLabel('SAL_COM_ALT013'));
					formObj.oi_ref_prfx.focus();
					return;
				}
				if(masterVals[0] == formObj.oe_ref_prfx.value && masterVals[0] != ''){
					alert(getLabel('SAL_COM_ALT012'));
					formObj.oe_ref_prfx.focus();
					return;
				}
				if(masterVals[3] == formObj.ai_ref_prfx.value && masterVals[3] != ''){
					alert(getLabel('SAL_COM_ALT015'));
					formObj.ai_ref_prfx.focus();
					return;
				}
				if(masterVals[2] == formObj.ae_ref_prfx.value && masterVals[2] != ''){
					alert(getLabel('SAL_COM_ALT014'));
					formObj.ae_ref_prfx.focus();
					return;
				}
				if(masterVals[4] == formObj.oe_hbl_prfx.value && masterVals[4] != ''){
					alert(getLabel('SAL_COM_ALT016'));
					formObj.oe_hbl_prfx.focus();
					return;
				}
				if(masterVals[5] == formObj.ae_awb_prfx.value && masterVals[5] != ''){
					alert(getLabel('SAL_COM_ALT017'));
					formObj.ae_awb_prfx.focus();
					return;
				}
				var confirmChecker = true;
				
				if(!alertChecker){
					confirmChecker = confirm(getLabel('FMS_COM_CFMSAV'))
				}
				
				if(confirmChecker){
					//OFVFOUR-7902 [Lever Logistics] Trade Partner Entry - Additional Name & Address
					if (formObj.f_modi_tms.value != ""){					
						ajaxSendPost(chkTrdpModiTms2, 'reqVal', '&goWhere=aj&bcKey=chkTrdpModiTms&trdp_cd='+formObj.i_trdp_cd.value, './GateServlet.gsl');
						if(!isModiTmsOk){
							alert(getLabel('FMS_COM_DUP_CNTC'));
							return;
						}
					}

					doShowProcess();
	    			doProcess=true;
	    			var sht1=sheetObj1.GetSaveString(true);
	    			var sht2=sheetObj2.GetSaveString(true);
	    			var sht3=sheetObj3.GetSaveString(true);
	    			var sht4=sheetObj4.GetSaveString(true);
	    			var sht6=sheetObj6.GetSaveString(true);
	    			var sht7=sheetObj7.GetSaveString(true);
	    			var sht8=sheetObj8.GetSaveString(true);
	    			var sht9=sheetObj9.GetSaveString(true);
	    			
//	    			sheetObj5.DataInsert();
	    			
	    			//var strReponse=sheetObj5.DoAllSave("./SAL_TPM_0010GS.clt", FormQueryString(formObj)+'&'+sht1+'&'+sht2+'&'+sht3+'&'+sht4+'&'+sht6+'&'+sht7+'&'+sht8,false);
	    			/*var strReponse=sheetObj5.DoAllSave("./SAL_TPM_0010GS.clt", {Param:FormQueryString(formObj)+'&'+sht1+'&'+sht2+'&'+sht3+'&'+sht4+'&'+sht6+'&'+sht7+'&'+sht8
	    				, UrlEncode:false
	    				, Sync:1
	    			});*/
	    			var sht5 = sheetObj5.GetSaveString(true);
	    			var strReponse=sheetObj5.GetSaveData("./SAL_TPM_0010GS.clt", FormQueryString(formObj)+'&'+sht1+'&'+sht2+'&'+sht3+'&'+sht4+'&'+sht5+'&'+sht6+'&'+sht7+'&'+sht8+'&'+sht9,false);
	    			sheetObj5.LoadSaveData(strReponse, {Sync:0});
	    			doHideProcess();
	    			gridSearch("ALL");
	    			// 성공시 Copy버튼 활성화
	    			btnCopy.style.display='inline';
	    			
	    			confirmChecker = true;
	    			alertChecker = false;
	    		}
			}
		}
	} catch (e){}
}
var callRow=0;
var callNm='';
function sheet6_OnChange(sheetObj, row, col) {
    var colNm=sheetObj.ColSaveName(col);
    if(colNm=='cb_trdp_cd'){
if(sheetObj.GetCellValue(row, colNm)!=''){
        	callRow=row;
            callNm='cb_trdp_cd';
ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpcode&s_code='+sheetObj.GetCellValue(row, colNm), './GateServlet.gsl');
    	}else{
    		docObjects[5].SetCellValue(row, 'cb_trdp_nm','',0);
    	}
    }
}
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
            docObjects[5].SetCellValue(callRow, 'cb_trdp_nm',masterVals[3],0);
		}else{
			//alert(getLabel('FMS_COM_ALT007'));
			docObjects[5].SetCellValue(callRow, callNm,'',0);
			docObjects[5].SetCellValue(callRow, 'cb_trdp_nm','',0);
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		//alert(getLabel('FMS_COM_ALT007'));
		docObjects[5].SetCellValue(callRow, callNm,'',0);
		docObjects[5].SetCellValue(callRow, 'cb_trdp_nm','',0);
	}
}
var cur_row;
var cur_sheetObj;
function sheet6_OnPopupClick(sheetObj, row, col) {
	cur_row = row;
	cur_sheetObj = sheetObj;
	rtnary=new Array(1);
	rtnary[0]="2";
	rtnary[1]="";
	rtnary[2]=window;
	callBackFunc = "sheet6_OnPopupClick_Calback";
    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
}
function sheet6_OnKeyDown(sheetObj, row, col, keyCode) {
	var colName=sheetObj.ColSaveName(col);
	switch(colName){
		case "cb_dest":
			if(keyCode==13){
				rtnary=new Array(3);
		   		rtnary[0]="";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(sheetObj.GetCellValue(row, col)!=''){
		   			sheetObj.SelectCell(row, col);
		   			rtnary[2]=sheetObj.GetCellValue(row, col);
		   		}else{
		   			rtnary[2]="";
		   		}
		   		var rtnVal=window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					sheetObj.SetCellValue(row, col,rtnValAry[2]);
				} 
			}
		break;
	}
}

function setPaymentTerm() {
	var frm1=document.frm1;
	var payment_tp=frm1.h_sls_gp_cd.value;
	var term_tp=frm1.h_cr_term_cd.value;
	var term_dt=frm1.h_cr_term_dt.value;
	var lmt_amt=frm1.h_crd_lmt_amt.value;
	if (lmt_amt != "" ) {
		lmt_amt="$"+Number(lmt_amt).toFixed(2);
	}
	//C083, CR, Credit, 1, Y, 신용 좋은 거래처]
	//C083, CO, COD, 2, Y, 거래가 드물거나 신용이 좋지 않아 Cargo Release 전 수금되어야 하는 업체(Cash of delivery)]
	//C083, KO, KOINFO, 3, Y, 본사에서 관리하는 거래처로, 가급적 거래를 하지 않아야 하는 업체
	//"Days ____|End of this month|End of next month|____th of next month", "A|B|C|D"   
	var payment_term_txt="";
	if (payment_tp == "CR") {
		payment_term_txt="Credit / ";
	} else if (payment_tp == "CO") {
		payment_term_txt="COD / ";
	} else if (payment_tp == "KO") {
		payment_term_txt="KOINFO / ";
	//#2550 [BNX] Trade Partner Entry's Payment Term Error
	} else if (payment_tp == "CH"){
		payment_term_txt="Credit Hold / ";
	}
	if (term_tp == "A") {
		payment_term_txt=payment_term_txt + term_dt + " Days";
	} else if (term_tp == "B") {
		payment_term_txt=payment_term_txt + "End of this month";
	} else if (term_tp == "C") {
		payment_term_txt=payment_term_txt + "End of next month";
	} else if (term_tp == "D") {
		var th="th";
		if (term_dt == "1") {
			th="st";
		} if (term_dt == "2") {
			th="nd";
		} if (term_dt == "3") {
			th="rd";
		}
		payment_term_txt=payment_term_txt + term_dt + th +" of next month";
	}
	frm1.payment_term.value=payment_term_txt;
	frm1.credit_limit.value=lmt_amt;
}

function CUSTOMER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_trdp_cd.value=rtnValAry[0];
   	    doWork("SEARCHLIST");
	}
}

//48819
function LINER_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.an_bond_pur_cd.value=rtnValAry[0];
		formObj.an_bond_pur_nm.value=rtnValAry[2];
	}
}

function OFFICE_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
    	var rtnValAry=rtnVal.split("|");
		formObj.sls_ofc_cd.value=rtnValAry[0];
		formObj.sls_ofc_nm.value=rtnValAry[1];
	}
}

function USER_POPLIST(rtnVal){
	var formObj=document.frm1;
   	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		if(personOpt == "salesperson") {
			formObj.sls_usrid.value = rtnValAry[0];
			formObj.sls_usrnm.value = rtnValAry[4];
		} else { //OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
			formObj.cs_usrid.value = rtnValAry[0];
			formObj.cs_usrnm.value = rtnValAry[4];
		}
	}
}

function ENTR_USR_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.an_bond_entr_usrid.value=rtnValAry[0];
		formObj.an_bond_entr_usrnm.value=rtnValAry[1];
	}
}
function PRNR_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_prnr_trdp_cd.value = rtnValAry[1];// 
		formObj.f_prnr_trdp_nm.value = rtnValAry[2];// full_nm
	}
}
function STATE_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.state_cd.value=rtnValAry[0];//cd_val
  }
}

function COUNTRY_POPLIST(rtnVal){
	var formObj=document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	    else{
		var rtnValAry=rtnVal.split("|");
		formObj.cnt_cd.value=rtnValAry[0];//cnt_cd
		formObj.cnt_nm.value=rtnValAry[1];//cnt_eng_nm
	}
 }

function TRDP_GROUP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		formObj.s_tp_grp.value=rtnVal;//s_tp_grp
//		var rtnValAry=rtnVal.split("|");
//		formObj.s_tp_grp.value=rtnValAry[0];//s_tp_grp
//		formObj.cd_nm.value=rtnValAry[1];//cd_nm
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

function ROWADD1(){
 	gridSearch("1");
 }

function comPopupCallBack(popupId ,rtnVal){
	var formObj=document.frm1;
	
	if(rtnVal == undefined || rtnVal == null || rtnVal == ""){
		return;
	}
	
	alert(rtnVal);
	
	var rtnValAry=rtnVal.split("|");
	formObj.cmdt_cd.value=rtnValAry[0];
	formObj.cmdt_nm.value=rtnValAry[2];
	
}

function sheet6_OnPopupClick_Calback(rtnVal){
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			cur_sheetObj.SetCellValue(cur_row, "cb_trdp_cd",rtnValAry[0],0);//trdp_cd
			cur_sheetObj.SetCellValue(cur_row, "cb_trdp_nm",rtnValAry[2],0);//full_nm
		}   
}


var trdpUse = false;
function checkTrdpUse(){
	if(frm1.delt_flg.value == "Y") {
		
		if (frm1.i_trdp_cd.value != "") {
			ajaxSendPost(checkTrdpUseRet, 'reqVal', '&goWhere=aj&bcKey=chkTrdpCdUse&trdp_cd='+frm1.i_trdp_cd.value, './GateServlet.gsl');
		}
		
		if (trdpUse) {
			if(!confirm(getLabel('SAL_COM_ALT027'))){
				frm1.delt_flg.value = "N";
				frm1.delt_flg.selectedIndex = 0;
				return false;
			}
		}
	}
	return true;
}

function checkTrdpUseRet(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='NG'){
				trdpUse = true;
			} else {
				trdpUse = false;
			}
		}
	}else{
		valCheck = false;
	}
}

var bl_addr_attn;

function setBlAddrAttnReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		bl_addr_attn=doc[1];
	} else {
		bl_addr_attn="";
	}
}
//20151103 TRADE PARTNER 등록시 SALES OFFICE, SALES PERSON BLANK 로 나오도록 여부 (#50239)
function setSales_Office_Person(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == "OK" && doc[1]!= undefined ) {
		if(doc[1] == "Y"){
			frm1.sls_ofc_cd.value = ""; 
			frm1.sls_ofc_nm.value = "";
			frm1.sls_usrid.value  = "";
			frm1.sls_usrnm.value  = "";
		}else{                             
		}
	}
}
//20151103 TRADE PARTNER 처음생성시 DEFAULT CREDIT TERM 30 DAYS로 변경여부 (#50421)
function setTrdp_create_Dt(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == "OK" && doc[1]!= undefined ) { //DB 에서 option data가 잘 들어가 있는 경우
		if(doc[1] != "0"){//BNX 에서는 0으로 세팅 안한다.
			frm1.cr_term_dt.value = doc[1];
		}else{                             
			frm1.cr_term_dt.value = "0";
		}
	}else{                                       //DB 에서 option data가 잘 들어가 있지 않는 경우
		frm1.cr_term_dt.value = "0";
	}
}
//20151112 TRADE PARTNER 처음생성시 DEFAULT PAYMENTTYPE CD 초기값 설정에 여부 (#50499)
function setTrdp_payment_cd(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == "OK" && doc[1]!= undefined ) { //DB 에서 option data가 잘 들어가 있는 경우
		frm1.s_sls_gp_cd.value = doc[1];
	}else{                                       //DB 에서 option data가 잘 들어가 있지 않는 경우
		frm1.s_sls_gp_cd.value = "CR";
	}
}


/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	    	var cal=new ComCalendar();
            cal.select(obj, 'MM-dd-yyyy');
	    break;
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
		case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]=formObj.an_bond_pur_nm.value;
	   		rtnary[2]=window;
	   		var airSeaTp="";
	   		var curObjId=curObj.id;
	   		var cstmTpCd='';
	   		callBackFunc = "LINER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
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

var TRDP_PAY_TO_SYNC = "N";

function setTrdpPryToSyncReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]=="Y") {
			TRDP_PAY_TO_SYNC = "Y";
		}
	}
}
function chkTrdpPhoneDupl(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]== "FALSE") {
			phone_check = phone_check + 1;
		}
	}
}

function sybcBlAddrReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		sybcBlAddr=doc[1];
	} else {
		sybcBlAddr="";
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
    bl_addr_chg();
} 

function CITY_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.city_cd.value=rtnValAry[0]; // loc_cd 
		formObj.city_nm.value=rtnValAry[2]; // loc_nm
		bl_addr_chg();
	} 
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="pic_desc"){
		doWork('ROWADD3');
		sheetObj.SelectCell(row+1, 3);
	}
}

function sheet2_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="acct_desc"){
		doWork('ROWADD4');
		sheetObj.SelectCell(row+1, 2);
	}
}

function sheet6_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="modi_tms"){
		doWork('ROWADD6');
		sheetObj.SelectCell(row+1, 2);
	}
}

function sheet7_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="f_valid_dt"){
		doWork('ROWADD7');
		sheetObj.SelectCell(row+1, 1);
	}
}

function sheet8_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="s_valid_dt"){
		doWork('ROWADD8');
		sheetObj.SelectCell(row+1, 1);
	}
}

function chgSpiEdiVndrCd(){
	var formObj=document.frm1;
	if(formObj.spi_edi_vndr_cd.value == "" || formObj.spi_edi_vndr_cd.value == "ENP"){
		formObj.spi_vndr_mapg_cd.value = "";
	}else if(formObj.spi_edi_vndr_cd.value == "INT"){
		formObj.spi_vndr_mapg_cd.value = formObj.scac_cd.value;
	}
}

var agtTypeUse="";
function chgAgtEdiMsgTpCd(val){
	var formObj=document.frm1;
	agtTypeUse = val;
	if(formObj.agt_edi_cd.value != "") {  
		ajaxSendPost(chkAgtEdiMsgTpCd, 'reqVal', '&goWhere=aj&bcKey=chkAgtEdiMsgTpCdUse&tp='+formObj.agt_edi_cd.value+'&agt_edi_msg_tp_cd='+formObj.agt_edi_msg_tp_cd.value+'&type='+val+'&trdp_cd='+formObj.s_trdp_cd.value, './GateServlet.gsl');
		
	}
}


function chkAgtEdiMsgTpCd(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
//	agtEdiMsgTpUse =doc[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(agtTypeUse=='MSG'){
				
				if(doc[1]=='NOT'){
//				MSG_KEY['FMS_COM_ALT145'] = 'Already EDI Msg type at Edi config!';
					alert(getLabel('FMS_COM_ALT145'));
					formObj.agt_edi_msg_tp_cd.value ="";
					
					
				} else  if(doc[1]=='EDI'){
//				MSG_KEY['FMS_COM_ALT146'] = 'Not found B/L EDI Code ar Edi config!';
					alert(getLabel('FMS_COM_ALT146'));
					formObj.agt_edi_msg_tp_cd.value ="";
				}
			} else if(agtTypeUse=='TP') {
				if(doc[1]=='NOT'){
//					MSG_KEY['FMS_COM_ALT147'] = 'Already assign B/L EDI CD to another TRDP!';
						alert(getLabel('FMS_COM_ALT147'));
							formObj.agt_edi_cd.value ="";
						
				} 
			}
		}
	} 

}


function GOTOCONCTRACT(trdpCd, ctrtNo,trdpNm){

	var trdp_cd;
	var ctrt_no;
	var trdp_nm;
	
	
	//trdp 코드 널 검사
	if(trdpCd == ''){

		return ;
	}
	//No of Contract 개수 검사
	if(ctrtNo == '' || parseInt(ctrtNo)==0){

		return;
	}
	trdp_cd = trdpCd;
	ctrt_no = ctrtNo;
	trdo_nm = trdpNm;
	
   	var paramStr = "./CtrtMgmt.clt";
   	paramStr+= '?s_cus_cd='+trdp_cd;
   	paramStr+= '&trdo_nm='+trdo_nm;
   	parent.mkNewFrame('Contract', paramStr);
	
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

function checkSpecial(obj) 
{
	var special_pattern = /^[A-Z0-9]+$/;	
	if(special_pattern.test(obj.value) == true)
	{
		return true;
	}else
	{
		obj.value='';
		return false;
	}
}
//[#5077] [CLA] TP NAME & ADDRESS LINE AND CHARACTER COUNT TO SHOW
function engAddrChck(obj){
	var formObj = document.frm1;
	if (obj == null) {
		var lines = 0;
		var characters = 0;
		document.getElementById('characters').innerHTML = characters;
		document.getElementById('lines').innerHTML = lines;
	} else {
		textarea_autoenter_50(obj);
		var inAddrTxt = obj.value;
		var addrArr = (inAddrTxt.replace(/\r(?!\n)|\n(?!\r)/g, "\r\n"))
				.split('\r\n');
		var lines = addrArr.length;
		var characters = inAddrTxt.length;
		document.getElementById('characters').innerHTML = characters;
		document.getElementById('lines').innerHTML = lines;
	}
}
//#6797 [GREAT LUCK] Make CLM as default by indicating checkmark when creating Trade Partner with TP type is 'Customer
function getCheckClmFlg(reqVal)
{
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]=="Y" ) {
		autoCheckClm=true;
	}
}
function changeTrdpTp() {
	if(autoCheckClm){
		if(frm1.sel_trdp_tp_cd.value=='CS'||frm1.sel_trdp_tp_cd.value=='CN'){
			frm1.clm_flg.checked=true;
		} else {
			frm1.clm_flg.checked=false;
		}
	}
}
//OFVFOUR-7241 [V4] Delivery time on Trade Partner Entry showing incorrect
function checkDeliveryTime(){
	var Dfm = frm1.ofc_fm_hr.value.replace(":","");
	var Dto = frm1.ofc_to_hr.value.replace(":","");
	if(Number(Dfm) > Number(Dto) && Dfm != "" && Dto != ""){
		alert (getLabel('FMS_COM_ALT168'));
	}
}
function strToUppr() {
	var string = frm1.dock_rcpt_rmk.value,
      regex ="((http|https|HTTP|HTTPS)://)((www|WWW).)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)",
	  modified = string.replace(/[^\s]+/g, function (match) {
	 return match.search(regex)  != -1 ? match : match.toUpperCase();
	});
	frm1.dock_rcpt_rmk.value = modified;
	
}
function sheet9_OnClick(sheetObj, Row, Col) {
	var formObj = document.frm1;
	var colStr = sheetObj.ColSaveName(Col);
	if (colStr == "trdp_addr_img") {
		ComShowMemoPad4(sheetObj, Row, "trdp_add_addr", false, 250, 130, Col,
				"trdp_add_addr");
	}

}

function sheet9_OnSearchEnd(sheetObj, Row, Col) {
	for (var i = 1; i <= sheetObj.LastRow(); i++) {
		sheetObj.SetCellImage(i, "trdp_addr_img", 0);
	}

}

function sheet9_OnChange(sheetObj, row, col) {
    var colNm=sheetObj.ColSaveName(col);
    if(colNm=='trdp_nm'){
    	var dupRow = sheetObj.ColValueDup('trdp_nm');
    	if (dupRow != -1){
    		alert(getLabel('FMS_COM_ALT008')+ "\n" + getLabel('FMS_COD_NAME'));
    		sheetObj.SetCellValue(row, col,"");
    	}
    }
}

function chkTrdpModiTms1(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		formObj.f_modi_tms.value = doc[1];
	}
}

function chkTrdpModiTms2(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		 if(doc[1] == formObj.f_modi_tms.value){
			 isModiTmsOk = true;
		 } else {
			 isModiTmsOk = false;
		 }
	}
}

