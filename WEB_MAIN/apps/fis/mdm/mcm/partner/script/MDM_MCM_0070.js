/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0070.js
*@FileTitle  : Trade Partner Management
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj3=docObjects[2];
	var sheetObj4=docObjects[3];
	var sheetObj5=docObjects[4];
    var formObj=document.frm1;
	var strTrdpCd=formObj.s_trdp_cd.value;
	switch(srcName) {
		case "SEARCHLIST":
			if(formObj.s_trdp_cd.value.length>4){
	            formObj.f_cmd.value=SEARCHLIST; // SEARCHLIST
	            formObj.action="./MDM_MCM_0070.clt";
	            formObj.submit();				
			}else{
				//Trade Partner 항목에 파트너 코드를 입력하세요!
				alert(getLabel('FMS_COM_ALT001') + "\n\n: MDM_MCM_0070.22");
				formObj.s_trdp_cd.focus();
			}
//            doShowProcess();
//            formObj.f_cmd.value = SEARCHLIST; // SEARCHLIST
//            formObj.action = "./MDM_MCM_0070.clt";
//            formObj.submit();
		break;
		case "NEW":
//            doShowProcess();
            formObj.f_cmd.value='';
            formObj.action="./MDM_MCM_0070.clt";
            formObj.submit();			
        break;
		case "ADD":
			if(!fncInputCheck()){
				return false;
			}else if(!validateForm(formObj)){
				return false;
			}else{
				var trdp_cd=formObj.sv_trdp_tp_cd.value;
	       		if(trdp_cd!=""){
	       			formObj.f_cmd.value=MODIFY;
	       		}else{
	       			formObj.f_cmd.value=ADD;
		        }
	       		//저장후 조회하기 위해 해당 Object가 저장되었는지 Flag값을 세팅함.
	       		rotTot=sheetObj1.RowCount();
	       		for(var i=1; i < rotTot; i++){
	       			if(sheetObj1.GetCellValue(i, 'ibflag1')=='D'){
	       				obj1Work=true;
	       				break;
	       			}
	       		}
	       		rotTot=sheetObj3.RowCount();
	       		for(var i=1; i < rotTot; i++){
	       			if(sheetObj3.GetCellValue(i, 'ibflag3')=='U'||sheetObj3.GetCellValue(i, 'ibflag3')=='I'||sheetObj3.GetCellValue(i, 'ibflag3')=='D'){
	       				obj3Work=true;
	       				break;
	       			}
	       		}
	       		rotTot=sheetObj4.RowCount();
	       		for(var i=1; i < rotTot; i++){
	       			if(sheetObj4.GetCellValue(i, 'ibflag4')=='U'||sheetObj4.GetCellValue(i, 'ibflag4')=='I'||sheetObj4.GetCellValue(i, 'ibflag4')=='D'){
	       				obj4Work=true;
	       				break;
	       			}
	       		}
	            if(confirm(getLabel('FMS_COM_CFMSAV'))){
	                doProcess=true;
	                var sht1=sheetObj1.GetSaveString(true);
	                var sht2=sheetObj2.GetSaveString(true);
	                var sht3=sheetObj3.GetSaveString(true);
	                var sht4=sheetObj4.GetSaveString(true);
	                sheetObj5.DataInsert();
	                var strReponse=sheetObj5.DoAllSave("./MDM_MCM_0070GS.clt", FormQueryString(formObj)+'&'+sht1+'&'+sht2+'&'+sht3+'&'+sht4,true);
	            }
			}
//			if(confirm(getLabel('FMS_COM_CFMSAV'))){
//                doShowProcess();
//		        formObj.i_trdp_cd.disabled = false;
//	            formObj.action = "./MDM_MCM_0070.clt";
//	            formObj.submit();
//	        }
			break;
		case "ROWADD1":
			if ( formObj.i_trdp_cd.value != "" ) {
	            var rtnary=new Array(1);
		  		var s_trdp_cd=formObj.s_trdp_cd.value;
		  		rtnary[0]="I";
				rtnary[1]=s_trdp_cd;
		 	    var rtnVal =  ComOpenWindow('./MDM_MCM_0011.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:458px;dialogHeight:328px" , true);
		 	    if (rtnVal == "true") {
		 	    	//setTimeout("gridSearch('1')", 50);
		 	    	//doWork("SEARCHLIST");
		 	    	gridSearch("1");
					return;
				}
			}
			break;
		case "ROWADD2":
			if ( formObj.i_trdp_cd.value != "" ) {
				sheetObj2.DataInsert();
			}
			break;
		case "ROWADD3":
			if ( formObj.i_trdp_cd.value != "" ){
				var intRows=sheetObj3.RowCount();
   				intRows--;
   				var Row=sheetObj3.DataInsert(intRows);
	            sheetObj3.SetCellValue(Row, 6,"sheet3");
			}
			break;
		case "ROWADD4":
			if ( formObj.i_trdp_cd.value != "" ) {
				var intRows=sheetObj4.RowCount();
   				intRows--;
   				var Row=sheetObj4.DataInsert(intRows);
   				sheetObj4.SetCellValue(Row, 9,"sheet4");
			}
			break;
		case "REMOVE1":
			var row=sheetObj1.RowCount();
       		for ( var i=1 ; i < row ; i++ ) {
       			if ( sheetObj1.GetCellValue(i, 0) == "1" ) {
					sheetObj1.SetRowHidden(i,1);
				}
			}
       		break;
		case "REMOVE3":
			var row=sheetObj3.RowCount();
       		for ( var i=1 ; i < row ; i++ ) {
       			if ( sheetObj3.GetCellValue(i, 0) == "1" ) {
					sheetObj3.SetRowHidden(i,1);
				}
			}
       		break;
		case "REMOVE4":
			var row=sheetObj4.RowCount();
       		for ( var i=1 ; i < row ; i++ ) {
       			if ( sheetObj4.GetCellValue(i, 0) == "1" ) {
					sheetObj4.SetRowHidden(i,1);
				}
			}
       		break;
		case "REMOVE":
			formObj.f_cmd.value=REMOVE;
            //if(validateForm(sheetObj,formObj,REMOVE, 1)){
				//삭제하시겠습니까?
        		if(confirm(getLabel('FMS_COM_CFMDEL'))){
                    doProcess=true;
                    sheetObj.DoSave("SALTFM0040GS.usr", FormQueryString(formObj),"ibflag",false);
                    sheetObj2.DoSave("SALTFM0041GS.usr", FormQueryString(formObj),"ibflag",false);
                }
            //}
        	break;
		case "EXCEL":
			if(sheetObj.RowCount() < 1){//no data
				ComShowCodeMessage("COM132501");
				}else{
//					sheetObj.Down2Excel({ HiddenColumn:1,Merge:true,TreeLevel:false});
					sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
				}
			break;
		case "COUNTRY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       	var rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]=""; //대륙코드
			callBackFunc = "COUNTRY_POPLIST";
			modal_center_open('./CMM_POP_0020.clt', rtnary, 1150,480,"yes");
			
	 	   
		break;
        case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			var rtnary=new Array(2);
		   	rtnary[0]="SAL";
		   	rtnary[1]="";
		   	rtnary[2]=window;
		   	callBackFunc = "LINER_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
	   	    
	    break;
	    case "CURRENCY_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			var rtnary=new Array(1);
			rtnary[0]="1";
			callBackFunc = "CURRENCY_POPLIST";
			modal_center_open('./CMM_POP_0040.clt', rtnary, 1150,480,"yes");
			
			
		break;
		case "OFFICE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			var rtnary=new Array(1);
	   		rtnary[0]="1";
	   		callBackFunc = "OFFICE_POPLIST";
			modal_center_open('./CMM_POP_0050.clt', rtnary, 556,634,"yes");
			
   	        
		break;
		case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
          	var rtnary=new Array(1);
	   		rtnary[0]="1";
	   		callBackFunc = "USER_POPLIST";
			modal_center_open('./CMM_POP_0060.clt', rtnary, 1150,480,"yes");
			
   	        
		break;
    }
}
function COUNTRY_POPLIST(rtnVal){
	 var formObj = document.frm1;
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			formObj.cnt_cd.value=rtnValAry[0];
			formObj.cnt_nm.value=rtnValAry[1];
		}
}
function LINER_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_trdp_cd.value=rtnValAry[0];
		formObj.shrt_nm.value=rtnValAry[1];
		formObj.full_nm.value=rtnValAry[2];    	        
   	    doWork("SEARCHLIST");
	}
}
function CURRENCY_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.curr_cd.value=rtnValAry[0];
		//formObj.s_currency_name.value = rtnValAry[1];
	}
}
function OFFICE_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.sls_ofc_cd.value=rtnValAry[0];
		formObj.sls_ofc_nm.value=rtnValAry[1];
	}
}
function USER_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.sls_usrid.value=rtnValAry[0];
		formObj.sls_usrnm.value=rtnValAry[1];
	}
}
function sheet3_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
	if ( Row > 0 && Col == 3 ) {
		var strAcctNo=sheetObj.GetCellValue(Row, Col);
		formObj.s_Acct_Info_Row.value=Row;
		ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAcctNo&s_acct_no='+strAcctNo, './GateServlet.gsl');
	}
}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
	    case "sls_popup" :	//파일다운로드
	    	if(sheetObj.GetCellValue(Row, "sls_his_flat_nm")!=''){
		    	document.frm2.trdp_cd.value=formObj.i_trdp_cd.value;
		    	document.frm2.cntc_seq.value=sheetObj.GetCellValue(Row, "cntc_seq");
				document.frm2.submit();
	    	}
		break;
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	var rtnary=new Array(1);
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
	callBackFunc = "CUSTOMER_POPLIST2";
	modal_center_open('./SAL_TPM_0011.clt', rtnary, 1150,480,"yes");
	
    
}
function CUSTOMER_POPLIST2(rtnVal){
	if (rtnVal == "true") {
    	gridSearch("1");
		return;
	} else {
		return;
	}
}
function displayClear() {
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj3=docObjects[2];
	var sheetObj4=docObjects[3];
	var sheetObj5=docObjects[4];
	var formObj=document.frm1;
	formObj.s_trdp_cd.value="";
	formObj.i_trdp_cd.value="";
	formObj.shrt_nm.value="";
	formObj.full_nm.value="";
	formObj.locl_nm.value="";
	formObj.eng_nm.value="";
	formObj.lgl_addr.value="";
	formObj.eng_addr.value="";
	formObj.ceo_nm.value="";
	formObj.url.value="";
	formObj.cnt_cd.value="";
	formObj.cnt_nm.value="";
	formObj.curr_cd.value="";
	formObj.curr_nm.value="";
	formObj.bztp_val.value="";
	formObj.biz_no.value="";
	formObj.grp_id_cd.value="";
	formObj.rgst_tp_cd.value="";
	formObj.biz_itm_val.value="";
	formObj.s_trdp_tp_cd.value="";
	formObj.rep_phn.value="";
	formObj.rep_fax.value="";
	formObj.rep_zip.value="";
	formObj.rep_eml.value="";
	formObj.rmk.value="";
	formObj.sls_ofc_cd.value="";
	formObj.sls_ofc_nm.value="";
	formObj.sls_usrid.value="";
	formObj.sls_usrnm.value="";
	formObj.rgst_usrid.value="";
	formObj.rgst_dt.value="";
	formObj.modi_usrid.value="";
	formObj.modi_dt.value="";
	sheetObj1.RemoveAll();
	sheetObj2.RemoveAll();
	sheetObj3.RemoveAll();
	sheetObj4.RemoveAll();
	sheetObj5.RemoveAll();
}
function gridSearch(gridNum) {
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj3=docObjects[2];
	var sheetObj4=docObjects[3];
    var formObj=document.frm1;
    if ( formObj.s_trdp_cd.value != "" ) {
    	formObj.f_cmd.value=SEARCHLIST;
	    if(gridNum=="ALL"||gridNum== "1"){
	    	sheetObj1.DoSearch("MDM_MCM_0071GS.clt", FormQueryString(formObj) );
		}
		if(gridNum=="ALL"||gridNum=="2"){
	    	formObj.f_cmd.value=SEARCHLIST01;
	    	sheetObj2.DoSearch("MDM_MCM_0070GS.clt", FormQueryString(formObj) );
		}
	    if(gridNum=="ALL"||gridNum=="3"){
	    	formObj.f_cmd.value=SEARCHLIST01;
	    	sheetObj3.DoSearch("MDM_MCM_0073GS.clt", FormQueryString(formObj) );
		}
	    if(gridNum=="ALL"||gridNum=="4"){
	    	formObj.f_cmd.value=SEARCHLIST02;
	    	sheetObj4.DoSearch("MDM_MCM_0074GS.clt", FormQueryString(formObj) );
		}
	}
}
function setGridCombo() {
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj3=docObjects[2];
	var sheetObj4=docObjects[3];
    var formObj=document.frm1;
	var strBankCd="";
	var strBankVal="";
	var strBank=formObj.f_bankList.value;
	var arrBank=strBank.split(',');
	if ( arrBank.length > 0 ) {
		strBankCd=arrBank[0];
		strBankVal=arrBank[1];
		sheetObj3.SetColProperty(2, {ComboText:strBankVal, ComboCode:strBankCd} );
	}
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var sheetObj3=docObjects[2];
			var iRow=formObj.s_Acct_Info_Row.value;
			//Duplicated account!
			alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_ACCT') + ": " + doc[1] + "\n\n: MDM_MCM_0070.426");
			sheetObj3.SetCellValue(iRow, 3,"");
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MDM_MCM_0070.424");		
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
	if(checkInputVal(formObj.locl_nm.value, 1, 100, "T", getLabel('LOCAL_NM'))!='O'){
    	formObj.locl_nm.focus();
    	return false;
    }
	if(checkInputVal(formObj.eng_nm.value, 1, 50, "T", getLabel('ENG_NM'))!='O'){
    	formObj.eng_nm.focus();
    	return false;
    }
	if(checkInputVal(formObj.lgl_addr.value, 1, 200, "T", getLabel('LGL_ADDR'))!='O'){
    	formObj.lgl_addr.focus();
    	return false;
    }
	if(checkInputVal(formObj.eng_addr.value, 1, 200, "T", getLabel('ENG_ADDR'))!='O'){
    	formObj.eng_addr.focus();
    	return false;
	} else {
		var strEngAddr=formObj.eng_addr.value;
		var arrEngAddr=strEngAddr.split("\n");
		var intLen=arrEngAddr.length;
		if(intLen > 5 && arrEngAddr[5].length > 0){
			//Limitation of 5 lines!
			alert(getLabel('MDM_COM_ALT002') + "\n\n: MDM_MCM_0070.470");
		}
		for(var i=0 ; i < intLen ; i++){
			if(arrEngAddr[i].length > 35){
				//Limitation of 5 lines!
				alert(getLabel('MDM_COM_ALT002') + "\n\n: MDM_MCM_0070.476");
				return false;
			}
		}
	}
	if(checkInputVal(formObj.cnt_cd.value, 2, 2, "T", getLabel('CNT'))!='O'){
    	formObj.cnt_cd.focus();
    	return false;
    }
	if(checkInputVal(formObj.curr_cd.value, 3, 3, "T", getLabel('CURR'))!='O'){
    	formObj.curr_cd.focus();
    	return false;
    }
//	if(checkInputVal(formObj.shrt_nm.value, 1, 20, "T", getLabel('SHT_NM'))!='O'){
//    	formObj.shrt_nm.focus();
//    	return false;
//    }
//	
//	if(checkInputVal(formObj.full_nm.value, 1, 50, "T", getLabel('FULL_NM'))!='O'){
//    	formObj.full_nm.focus();
//    	return false;
//    }
	// 2009.04.16 현재 Radio버튼은 필수입력 공통 체크 로직이 없음.
	if ( formObj.rgst_tp_cd[0].checked == false && formObj.rgst_tp_cd[1].checked == false ) {
		//Reg. Type Data Insert.
		alert(getLabel('FMS_COM_ALT001') + "\n\n: MDM_MCM_0070.526");
		return false;
	}
	if(checkInputVal(formObj.sls_ofc_cd.value, 1, 10, "T", getLabel('SAL_BRN'))!='O'){
    	formObj.sls_ofc_cd.focus();
    	return false;
    }
	if(checkInputVal(formObj.sls_usrid.value, 1, 12, "T", getLabel('SAL_PRN'))!='O'){
    	formObj.sls_usrid.focus();
    	return false;
    }
    if(checkInputVal(formObj.ceo_nm.value, 0, 50, "T", getLabel('CEO'))!='O'){
    	formObj.ceo_nm.focus();
    	return false;
    }
    if(checkInputVal(formObj.url.value, 0, 100, "T", getLabel('URL'))!='O'){
    	formObj.url.focus();
    	return false;
    }
    if(checkInputVal(formObj.biz_no.value, 0, 20, "T", getLabel('BIZ_REG_NO'))!='O'){
    	formObj.biz_no.focus();
    	return false;
    }
    if(checkInputVal(formObj.bztp_val.value, 0, 50, "T", getLabel('BIZ_TYPE'))!='O'){
    	formObj.bztp_val.focus();
    	return false;
    }
    if(checkInputVal(formObj.biz_itm_val.value, 0, 50, "T", getLabel('ITEM'))!='O'){
    	formObj.biz_itm_val.focus();
    	return false;
    }
    if(checkInputVal(formObj.rep_phn.value, 0, 30, "T", getLabel('TEL'))!='O'){
    	formObj.rep_phn.focus();
    	return false;
    }
    if(checkInputVal(formObj.rep_fax.value, 0, 30, "T", getLabel('FAX'))!='O'){
    	formObj.rep_fax.focus();
    	return false;
    }
    if(checkInputVal(formObj.rep_zip.value, 0, 20, "T", getLabel('ZIP_CD'))!='O'){
    	formObj.rep_zip.focus();
    	return false;
    }
    if(checkInputVal(formObj.rep_eml.value, 0, 100, "T", getLabel('EMAIL'))!='O'){
    	formObj.rep_eml.focus();
    	return false;
    }
    if(checkInputVal(formObj.rmk.value, 0, 50, "T", getLabel('RMK'))!='O'){
    	formObj.rmk.focus();
    	return false;
    }
	return true;
}
//공통전역변수
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
				InsertItem( "Contact Info." , "");
				InsertItem( " Tariff Info. " , "");
				InsertItem( "  Etc Info.  " , "");
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
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage(){
	for(var i=0;i<docObjects.length;i++) {
		comConfigSheet (docObjects[i] , SYSTEM_BLUE);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	for(var k=0;k<tabObjects.length;k++){
		initTab(tabObjects[k],k+1);
	}
	gridSearch("ALL");
}
/**
 * Tab 클릭시 이벤트 관련
 * 선택한 탭의 요소가 활성화 된다.
 */
function tab1_OnChange(tabObj , nItem) {
	var objs=document.all.item("tabLayer");
	objs[nItem].style.display="Inline";
	objs[beforetab].style.display="Inline";
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
	var cnt=0;
	switch(sheetNo) {
		case 1:      //sheet1 init
			with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('SAL_TPM_0010_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);
	        var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag1" },
	               {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"cntc_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"sls_pson_pic",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:520,  Align:"Left",    ColMerge:1,   SaveName:"sls_his_tit",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sls_popup",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"sls_his_ctnt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sheet1",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sls_his_flat_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sls_his_flat_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		        InitColumns(cols);
	        	SetEditable(1);
	        	SetImageList(0,APP_PATH+"/web/img/button/bt_file.gif");
	            sheetObj.SetDataLinkMouse("sls_popup",1);
	            SetSheetHeight(240);
			}
		break;
		case 2:      //sheet 2 init
			with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('SAL_TPM_0010_HDR2_1'), Align:"Center"},
	                    { Text:getLabel('SAL_TPM_0010_HDR2_2'), Align:"Center"} ];
	        InitHeaders(headers, info);
	        var cols = [ {Type:"Radio",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ck",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag1",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"m_delt_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"m_seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"m_trf_ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"m_trf_tp_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"m_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"m_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"m_sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:1 },
	               {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:1,   SaveName:"m_stnd_trf_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:1 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"m_bnd_clss_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:6 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"m_trdp_grp_id_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
	               {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"m_lnk_trf_ctrt_no",  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Left",    ColMerge:1,   SaveName:"m_org_conti_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"m_org_cnt_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"m_org_por_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
	               {Type:"Text",      Hidden:0,  Width:20,   Align:"Center",  ColMerge:1,   SaveName:"m_org_por_cd2",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"m_org_pol_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
	               {Type:"Text",      Hidden:0,  Width:20,   Align:"Center",  ColMerge:1,   SaveName:"m_org_pol_cd2",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Left",    ColMerge:1,   SaveName:"m_dest_conti_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"m_dest_cnt_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"m_dest_pod_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
	               {Type:"Text",      Hidden:0,  Width:20,   Align:"Center",  ColMerge:1,   SaveName:"m_dest_pod_cd2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"m_dest_del_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
	               {Type:"Text",      Hidden:0,  Width:20,   Align:"Center",  ColMerge:1,   SaveName:"m_dest_del_cd2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"m_trf_term_fm_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"m_trf_term_to_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"m_trf_ctrt_rmk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"m_org_pol_nod_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:7 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"m_org_por_nod_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:7 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"m_dest_pod_nod_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:7 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"m_dest_del_nod_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:7 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"sheet1",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"m_duplication",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"m_trf_tp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 } ];
	        InitColumns(cols);
	        SetEditable(1);
	        SetHeaderRowHeight(20 );
	        SetHeaderRowHeight(21);
	        SetSheetHeight(240);
			}
		break;
		case 3:      //sheet 2 init
			with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('SAL_TPM_0010_HDR3'), Align:"Center"} ];
	        InitHeaders(headers, info);
	        var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag3" },
		               {Type:"Combo",     Hidden:0, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"bank_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"acct_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
		               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"acct_dpsr_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"acct_desc",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sheet3",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	        InitColumns(cols);
        	SetEditable(1);
            var formObj=document.frm1;
            SetSheetHeight(240);
			}
		break;
		case 4:      //sheet 2 init
			with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('SAL_TPM_0010_HDR4'), Align:"Center"} ];
	        InitHeaders(headers, info);
	        var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag4",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"rep_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"pic_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	               {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"trd_div_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"pic_phn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:30 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"pic_fax",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:30 },
	               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"pic_eml",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	               {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"pic_desc",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sheet4",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"cntc_pson_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	        InitColumns(cols);
	        SetEditable(1);
	        SetHeaderRowHeight(20 );
	        SetSheetHeight(240);
			}
		break;
		case 5:      //sheet 5 init
			with (sheetObj) {
	        var HeadTitle0="TRDP_CD";
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:HeadTitle0, Align:"Center"} ];
	        InitHeaders(headers, info);
	        var cols = [ {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	        InitColumns(cols);
	        SetEditable(1);
	        SetVisible(0);
			}
		break;
	}
}
var obj1Work=false;
var obj3Work=false;
var obj4Work=false;
/**
 * Save 버튼 실행시 저장처리 완료후 메시지 및 데이터 표시
 */
function sheet5_OnSaveEnd(sheetObj, ErrMsg){
	if(ErrMsg==undefined || ErrMsg==null || ErrMsg==''){
		if(obj1Work){
			gridSearch("1");
		}
		if(obj3Work){
			gridSearch("3");
		}
		if(obj4Work){
			gridSearch("4");	
		}
		//alert(CM_MSG3); //Completed!
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
		obj1Work=false;
		obj3Work=false;
		obj4Work=false;
	}
}
/**
 * 화면 폼입력값에 대한 유효성검증 프로세스 처리
 */
function validateForm(formObj){
	var isOk=true;
	//Bank Account Information인 경우
	var totRow=docObjects[2].RowCount();
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
		totRow=docObjects[3].RowCount();
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
	if(obj.checked){
		frm1.i_trdp_cd.className='search_form';
		frm1.i_trdp_cd.readOnly=false;
		frm1.i_trdp_cd.focus();
	}else{
		frm1.i_trdp_cd.className='search_form-disable';
		frm1.i_trdp_cd.readOnly=true;
		frm1.i_trdp_cd.value='';
	}
}
/**
 * clipboard에서 copy했을시 글자수 체크.
 */
function fnPaste(vEl) {
	var intMaxLength, intCurrLength, strClip ;
	var intClipLength, intAvailLength ;
	var blnReturn ;
	blnReturn=true ;
	intMaxLength=vEl.getAttribute("maxlength") ;
	intCurrLength=vEl.value.length ;
	strClip=window.clipboardData.getData("Text") ;
	intClipLength=strClip.length ;
	intAvailLength=intMaxLength - intCurrLength ;
	if (intAvailLength > 0) {
		if (intAvailLength < intClipLength) {
			strClip=strClip.substr(0, intAvailLength) ;
			window.clipboardData.setData("Text",strClip) ;
		}
	} else {
		blnReturn=false ;
	}
	return blnReturn ;
}
function blockKey(item) {
	if(event.keyCode==9) {
		item.focus();
		space=" ";
		item.selection=document.selection.createRange();
		item.selection.text=space;
		event.returnValue=false;
	}
}
  /**
  * 라인을 센다. (엔터값을 센다고 생각하면.)
  */
function countLineBreaks (string) {
	var re=/\r\n|\r|\n/g;
	var n=0;
	while (re.exec(string))
		n++;
	return n;
}
 /**
 * textarea의 rows보다 라인이 더 입력되면,
 * 입력받은 이벤트를 무시한다. 
 * 따라서 onKeyPress 에 걸어줘야 함.
 */
function fixRowTextArea(textarea){
	var rows=parseInt(textarea.rows);
	var lineBreaks=countLineBreaks(textarea.value);
	if(rows-1 < lineBreaks){
		//Limitation of 5 lines!
		alert(getLabel('MDM_COM_ALT002') + "\n\n: MDM_MCM_0070.1074");
		event.keyCode='';
		return false;
	}else{
		return true;
	}
}
//function fncShrtNmChange() {
//	var formObj  = document.frm1;
//	var strShrtNm = formObj.shrt_nm.value;
//	string = new String(strShrtNm);
//	strShrtNm = string.toUpperCase();
//	formObj.shrt_nm.value = strShrtNm;
//}
//
//function fncFullNmChange() {
//	var formObj  = document.frm1;
//	var strFullNm = formObj.full_nm.value;
//	string = new String(strShrtNm);
//	strFullNm = string.toUpperCase();
//	formObj.full_nm.value = strFullNm;
//}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
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
			if(CODETYPE =="partner"){
				formObj.i_trdp_cd.value=masterVals[0];//trdp_cd
				//formObj.s_liner_abbr.value = masterVals[2];//shrt_nm
				formObj.i_trdp_nm.value=masterVals[3];//full_nm
			}else if(CODETYPE =="country"){
				formObj.cnt_cd.value=masterVals[0];//cnt_cd
				formObj.cnt_nm.value=masterVals[3];//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.i_loc_cd.value=masterVals[0];//loc_cd 
				//formObj.s_node_code.value = masterVals[1];//nod_cd 
				formObj.i_loc_nm.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.curr_cd.value=masterVals[0];//cd_val
				formObj.curr_nm.value=masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.sls_ofc_cd.value=masterVals[0];
				formObj.sls_ofc_nm.value=masterVals[3];
			}else if(CODETYPE =="user"){
				formObj.sls_usrid.value=masterVals[0];
				formObj.sls_usrnm.value=masterVals[3];
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value=masterVals[0];
				formObj.s_freight_name.value=masterVals[3];
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value=masterVals[0];
				formObj.s_container_name.value=masterVals[3];
			}else if(CODETYPE =="commodity"){
				formObj.s_commodity_code.value=masterVals[0];
				formObj.s_commodity_name.value=masterVals[3];
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value=masterVals[0];
				formObj.s_package_name.value=masterVals[3];
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value=masterVals[0];
				formObj.s_cargo_name.value=masterVals[3];
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value=masterVals[0];
				formObj.s_vessel_name.value=masterVals[3];
			}
		}else{
			if(CODETYPE =="partner"){
				formObj.i_trdp_cd.value="";//trdp_cd
				//formObj.s_liner_abbr.value = "";//shrt_nm
				formObj.i_trdp_nm.value="";//full_nm
			}else if(CODETYPE =="country"){
				formObj.cnt_cd.value="";//cnt_cd
				formObj.cnt_nm.value="";//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.i_loc_cd.value="";//loc_cd 
				//formObj.s_node_code.value = "";//nod_cd 
				formObj.i_loc_nm.value="";//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.curr_cd.value="";
				formObj.curr_nm.value="";//cd_nm
			}else if(CODETYPE =="office"){
				formObj.sls_ofc_cd.value="";
				formObj.sls_ofc_nm.value="";
			}else if(CODETYPE =="user"){
				formObj.sls_usrid.value="";
				formObj.sls_usrnm.value="";
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value="";
				formObj.s_freight_name.value="";
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value="";
				formObj.s_container_name.value="";
			}else if(CODETYPE =="commodity"){
				formObj.s_commodity_code.value="";
				formObj.s_commodity_name.value="";
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value="";
				formObj.s_package_name.value="";
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value="";
				formObj.s_cargo_name.value="";
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value="";
				formObj.s_vessel_name.value="";
			}
		}
	}else{
		//Error Errupt!	
		//alert(getLabel('FMS_COM_ERR001') + "\n\n: MDM_MCM_0070.1203");		
	}
}
