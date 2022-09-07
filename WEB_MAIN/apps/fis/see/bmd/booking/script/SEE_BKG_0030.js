/**
=========================================================
*@FileName   : SEE_BKG_0030.js
*@FileTitle  : Carrier Booking / Customer Booking split
*@Description:
*@author     : 
*@version    : 
*@since      : 
=========================================================
 */
var rtnary=new Array(1);
var formObj = document.frm1;

function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
//	setFromToDtEndPlus(document.frm1.etd_strdt, 180, document.frm1.etd_enddt, 30);
}
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj=docObjects[0];
    var sheetObj1=docObjects[1];
    var sheetObj2=docObjects[2];
    var sheetObj3=docObjects[3];
    var sheetObj4=docObjects[4];
	var sheetObj5=docObjects[5];
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
	    	   	 if(formObj.f_bkg_no.value == '' ){
	      		   alert(getLabel('FMS_COM_ALT014'));
	      		   frm1.f_bkg_no.focus();
	      		   return;
	    	   	 }
	    	   	//#1892 [PATENT] BKG SPLIT/COMBINE 점검항목
	    	    //TB_CLP, TB_BKG_RLT에 속해있는지 비교 - Validation 주석 2017-04-26 요청
		    	//ajaxSendPost(getBkgSplitChk, 'reqVal', '&goWhere=aj&bcKey=getBkgSplitChk&f_bkg_no='+formObj.f_bkg_no.value+'&f_biz_clss_cd='+ formObj.f_biz_clss_cd.value, './GateServlet.gsl');
  	
    	   		if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
    	   			cntrSeq = "";	//초기화
			   		formObj.f_cmd.value=SEARCHLIST;
			   		sheetObj.DoSearch("./SEE_BKG_0030GS.clt", FormQueryString(formObj) );
			   		//데이터 초기화
			   		clearAll();
			    }
			    break;
            case "SEARCH_CNTR_QTY": // CNTR 조회
 			   frm1.f_cmd.value = SEARCHLIST02;
 			   setSheetHeader2();
	           setSheet2();
	           sheetObj2=docObjects[2];
 			   sheetObj2.DoSearch("./SEE_BKG_0030_2GS.clt", FormQueryString(frm1));

 			   break;   
            case "SEARCH_CNTR_LIST": // CNTR List조회
  			   frm1.f_cmd.value = SEARCHLIST03;
  	           setSheetHeader3();
  	           setSheet3();
  	           sheetObj3=docObjects[3];
  			   sheetObj3.DoSearch("./SEE_BKG_0030_3GS.clt", FormQueryString(frm1));
  			   break;  			   
            case "SEARCH_PO":	// PO 조회
         	   frm1.f_cmd.value=SEARCHLIST01;

         	   sheetObj4.DoSearch("./SEE_BKG_0030_4GS.clt", FormQueryString(frm1) );
         	   break;
    	   	case "ADD":
    	   		if(formObj.f_chk_o.checked == true ){
    	   			formObj.chk_origin.value ="Y";
    	   		}else{
    	   			formObj.chk_origin.value ="N";
    	   		}
    	   		var dupRow=sheetObj1.ColValueDup("bkg_no|suffix");
    	   		if(dupRow > 0){
    	   			alert(getLabel('FMS_COM_ALT104'));
    	   			return false;
    	   		}
    	   						
    	   		//총합 체크
    	   		if(!sumValueCheck()) return;
    	   		//cotainer 
    	   		cntrChk();
				formObj.f_cmd.value=MODIFY;
				formObj.cntrSeq.value =cntrSeq;
				formObj.cntrListSeq.value =cntrListSeq;
				//Booking No. 중복 체크
				var rowCnt=0;
				var chkCnt=0;
				if(formObj.f_chk_o.checked == true ){
					rowCnt = parseInt(splitCnt)+headerRowCnt+1; //keep original booking인 경우
					chkCnt = headerRowCnt+1;
					
				}else{
					rowCnt = parseInt(splitCnt)+headerRowCnt;
					chkCnt = headerRowCnt;
				}
				var chekMsgTxt="";
				for(var i=chkCnt; i < rowCnt; i++){
					 ajaxSendPost(getBkgCheck, 'reqVal', '&goWhere=aj&bcKey=getBkgCheck&f_bkg_no='+sheetObj1.GetCellValue(i, 'bkg_no')+sheetObj1.GetCellValue(i, 'suffix') +'&f_biz_clss_cd='+ formObj.f_biz_clss_cd.value, './GateServlet.gsl');
					 chekMsgTxt += chekMsg;
				}
				if (chekMsgTxt.indexOf("DP")!= -1){
					alert(getLabel('FMS_COM_ALT105'));
					sheetObj1.SelectCell(headerRowCnt, "suffix", false);
				}else{
					//저장 처리
					var sndParam=getSndParam();
	     		    if(sndParam == true)	{	return false;	}
		     		   var intRows3=sheetObj5.LastRow() + 1;
		     		   sheetObj5.DataInsert(intRows3);
		     		   sheetObj5.SetCellValue(1,1,1);
		     		   sheetObj5.DoAllSave("./SEE_BKG_0030_5GS.clt", FormQueryString(formObj)+sndParam, false);
				}
						    	
			    break;
           		
	   	} // end switch
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
//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	
	var bookingParam=docObjects[1].GetSaveString(false);
	var cntrQuantityParam=docObjects[2].GetSaveString(false);
	var cntrListParam=docObjects[3].GetSaveString(false);
	var poListParam=docObjects[4].GetSaveString(1);	
	var sheetParam='';
	isError=false;

	if(bookingParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= bookingParam;
	  	bookingParam=true;
	}
	if(cntrQuantityParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= cntrQuantityParam;
	  	cntrQuantityParam=true;
	}
	if(cntrListParam!=''){
		sheetParam+= '&';
	    sheetParam+= cntrListParam;
	    cntrListSheet=true;
	}
	if(poListParam!=''){
	    sheetParam+= '&';
	    sheetParam+= poListParam;
	    poListParam=true;
	}
    if(isError == true)
    {
    	return true;
    }
  return sheetParam;
}
function openBkgPopUp(){
	var formObj = document.frm1;
	var f_biz_clss_cd = document.getElementsByName("f_biz_clss_cd");		
	var biz_clss_cd = getRadioVal(f_biz_clss_cd);
	rtnary=new Array(1);
	//rtnary[0]= formObj.f_bkg_no.value;
	rtnary[1]= biz_clss_cd;
	callBackFunc = "srOpenPopUp_BKNO_POPLIST";
	modal_center_open('./CMM_POP_0510.clt', rtnary, 818,500,"yes");
}
function srOpenPopUp_BKNO_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		formObj.f_bkg_no.value = rtnValAry[0];//bkg_no
		formObj.f_bkg_seq.value = rtnValAry[1];//bkg_seq
		
		if(formObj.f_bkg_no.value !=""){
			doWork('SEARCHLIST');
        }
	}
}
function getRadioVal(radioObj){
	var rtnStr="";
	for(var i=0; i<radioObj.length; i++){
	   if(radioObj[i].checked==true)
	   {
		   rtnStr=radioObj[i].value;
	   }
	}
	return rtnStr;
}

/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}

var headerRowCnt=2;
var splitCnt=0;
function splitBkg(){
	
    var formObj=document.frm1;
    var sheetObj=docObjects[0];
    var sheetObj1=docObjects[1];
    var sheetObj2=docObjects[2];
    var sheetObj3=docObjects[3];
    var sheetObj4=docObjects[4];

    sheetObj1.RemoveAll();
    splitCnt = formObj.f_split_no.value;
	if (splitCnt=="")splitCnt=0;
	
	if (sheetObj.RowCount()<1){
		alert(getLabel('FMS_COM_ALT029'));
		return false;
	}
    //#2142 [PATENT] Booking Split - Split No. 1도 입력 가능하게 할것 (Original B/L을 유지하는 경우)
	if(formObj.f_chk_o.checked == false ){
		if (splitCnt<2){
			alert(getLabel('FMS_COM_ALT106'));
			return false;
		}
	}
	if (splitCnt>27){
		alert(getLabel('FMS_COM_ALT107'));
		return false;
	}
	
	var arr_suffixO=new Array("","","","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
	var arr_suffix=new Array("","","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
	
	var rowCnt ;
	var calcCnt ;
	if(formObj.f_chk_o.checked == true ){
		rowCnt = parseInt(splitCnt)+headerRowCnt+1; //keep original booking인 경우 
		calcCnt = parseInt(splitCnt)+1;
	}else{
		rowCnt = parseInt(splitCnt)+headerRowCnt;
		calcCnt = parseInt(splitCnt);
	}
	formObj.f_bkg_seq.value = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'bkg_seq');

	//booking 계산식 
	var o_pck_qty = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'pck_qty');
	var o_grs_wgt = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'grs_wgt');
	var o_grs_wgt1 = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'grs_wgt1');
	var o_meas = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'meas');
	var o_meas1 = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'meas1');
	var pck_qty = 0;
	var grs_wgt = 0;
	var grs_wgt1 = 0;
	var meas = 0;
	var meas1 = 0;
	var lastCnt =0;
	var sum_pck_qty=0;
	var sum_grs_wgt=0;
	var sum_grs_wgt1=0;
	var sum_meas=0;
	var sum_meas1=0;
    var j=1;
    
    for(var i=headerRowCnt; i < rowCnt; i++){	
    	sheetObj1.DataInsert(rowCnt)
    	lastCnt = rowCnt-1;
    	//alert("i : "+i+" rowCnt : "+rowCnt+" lastCnt : "+lastCnt);
    	if (i==lastCnt){ 
    		//alert("o_pck_qty : "+o_pck_qty+" sum "+ sum_pck_qty);
    		 pck_qty = o_pck_qty - sum_pck_qty;
    		 grs_wgt = o_grs_wgt - sum_grs_wgt;
    		 grs_wgt1 = o_grs_wgt1 - sum_grs_wgt1;
    		 meas = o_meas - sum_meas;
    		 meas1 = o_meas1 - sum_meas1;
    		 if (pck_qty<0) pck_qty=0;
    		 if (grs_wgt<0) grs_wgt=0;
    		 if (grs_wgt1<0) grs_wgt1=0;
    		 if (meas<0) meas=0;
    		 if (meas1<0) meas1=0;	 

    	}else{
    	     pck_qty = roundXL((o_pck_qty/calcCnt),0);
    		 grs_wgt = roundXL((o_grs_wgt/calcCnt),2);
    		 grs_wgt1 = roundXL((o_grs_wgt1/calcCnt),2);
    		 meas = roundXL((o_meas/calcCnt),2);
    		 meas1 = roundXL((o_meas1/calcCnt),2);
    		 sum_pck_qty += pck_qty;
    		 sum_grs_wgt += grs_wgt;
    		 sum_grs_wgt1 += grs_wgt1;
    		 sum_meas += meas;
    		 sum_meas1 += meas1;
    	}
    	
    	sheetObj1.SetCellValue(i, "bkg_no", 	sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'bkg_no'),0);
    	if(formObj.f_chk_o.checked == true ){
    		if(i==headerRowCnt){
    			sheetObj1.SetCellValue(headerRowCnt, "bkg_seq", 	sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'bkg_seq'),0);
    			sheetObj1.SetCellEditable(headerRowCnt,"suffix",0);
    		}else{
    			sheetObj1.SetCellValue(i, "bkg_seq", 	sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'bkg_seq')+"_"+j,0);
    			sheetObj1.SetCellValue(i, "no", j,0);
    			j++;
    		}
    		sheetObj1.SetCellValue(i, "suffix", 	arr_suffixO[i],0);
    	}else{
    		sheetObj1.SetCellValue(i, "suffix", 	arr_suffix[i],0);	
    		sheetObj1.SetCellValue(i, "bkg_seq", 	sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'bkg_seq')+"_"+j,0);
    		sheetObj1.SetCellValue(i, "no", j,0);
    		j++;
    	}
    	
    	sheetObj1.SetCellValue(i, "pck_qty", 	pck_qty,0);
    	sheetObj1.SetCellValue(i, "pck_ut_cd", 	sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'pck_ut_cd'),0);
    	sheetObj1.SetCellValue(i, "pck_ut_nm", 	sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'pck_ut_nm'),0);
    	sheetObj1.SetCellValue(i, "grs_wgt", 	grs_wgt,0);
    	sheetObj1.SetCellValue(i, "grs_wgt1", 	grs_wgt1,0);
    	sheetObj1.SetCellValue(i, "meas", 		meas,0);
    	sheetObj1.SetCellValue(i, "meas1", 		meas1,0);
    	
    }

    doWork('SEARCH_PO');
    if(formObj.f_biz_clss_cd.value=="M"){
    	doWork('SEARCH_CNTR_LIST'); 
    }else if(formObj.f_biz_clss_cd.value=="H"){
    	doWork('SEARCH_CNTR_QTY');
    }
    	
}

function sumValueCheck(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
	var splitCnt = formObj.f_split_no.value;
	//Original 
	var o_pck_qty = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'pck_qty');
	var o_grs_wgt = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'grs_wgt');
	var o_grs_wgt1 = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'grs_wgt1');
	var o_meas = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'meas');
	var o_meas1 = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'meas1');
	var pck_qty = 0;
	var grs_wgt = 0;
	var grs_wgt1 = 0;
	var meas = 0;
	var meas1 = 0;
	var lastCnt =0;
	var sum_pck_qty=0;
	var sum_grs_wgt=0;
	var sum_grs_wgt1=0;
	var sum_meas=0;
	var sum_meas1=0;
	

	var calcCnt ;
	if(formObj.f_chk_o.checked == true ){
		rowCnt = parseInt(splitCnt)+headerRowCnt+1; //keep original booking인 경우 
		calcCnt = parseInt(splitCnt)+1;
	}else{
		rowCnt = parseInt(splitCnt)+headerRowCnt;
		calcCnt = parseInt(splitCnt);
	}
	 for(var i=headerRowCnt; i < rowCnt; i++){
		 pck_qty += roundXL((sheetObj1.GetCellValue(i, 'pck_qty')*1),2);
		 grs_wgt += roundXL((sheetObj1.GetCellValue(i, 'grs_wgt')*1),2);
		 grs_wgt1 += roundXL((sheetObj1.GetCellValue(i, 'grs_wgt1')*1),2);
		 meas += roundXL((sheetObj1.GetCellValue(i, 'meas')*1),3);
		 meas1 += roundXL((sheetObj1.GetCellValue(i, 'meas1')*1),3);
	}
	 grs_wgt =roundXL(grs_wgt,2);
	 grs_wgt1 =roundXL(grs_wgt1,2);
	/*
	 alert("총합 체크 o_pck_qty : "+o_pck_qty+" pck_qty : "+pck_qty);
	 alert("총합 체크 o_grs_wgt : "+o_grs_wgt+" grs_wgt : "+grs_wgt);
	 alert("총합 체크 o_grs_wg1 : "+o_grs_wgt1+" grs_wgt1 : "+grs_wgt1);
	 alert("총합 체크 o_meas : "+o_meas+" meas : "+meas);
	 alert("총합 체크 o_meas1 : "+o_meas1+" meas1 : "+meas1);
	*/
     if(o_pck_qty!=0 && o_pck_qty!=pck_qty){
    	 alert("sum check!!!"+"_Package");
			return false;
     }
     if(o_grs_wgt!=0 && o_grs_wgt!=grs_wgt){
    	 alert("sum check!!!"+"_Weight(KG)");
    		return false;
     }
     if(o_grs_wgt1!=0 && o_grs_wgt1!=grs_wgt1){
    	 alert("sum check!!!"+"_Weight(LB)");
    		return false;
     }
     if(o_meas!=0 && o_meas!=o_meas){
    	 alert("sum check!!!"+"_Measurement(CBM)");
    		return false;
     }
     if(o_meas1!=0 && o_meas1!=o_meas1){
    	 alert("sum check!!!"+"_Measurement(CFT)");
    		return false;
     }

	return true;
	
}
var chekMsg="";
function getBkgCheck(reqVal){
	var formObj=document.frm1;
	var sheetObj1=docObjects[1];
	var sheetObj5=docObjects[5];
	var doc=getAjaxMsgXML(reqVal);

	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				chekMsg = doc[1];
			}else{				
				chekMsg ="";    		   
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function cntrChk(){
	var formObj=document.frm1;
	var sheetObj2=docObjects[2];
	var sheetObj3=docObjects[3];
	
    var splitCnt = formObj.f_split_no.value;
	if (splitCnt=="")splitCnt=0;
	
	if (sheetObj2.RowCount()>0){	    
		var rowCnt1 = 0;
	    if(formObj.f_chk_o.checked == true ){ //original 포함 계산
	    	rowCnt1 = parseInt(splitCnt)+headerRowCnt+3; //keep original booking인 경우 	    	
	    }else{    	
	    	rowCnt1 = parseInt(splitCnt)+headerRowCnt+2;
	    }	    
	    for(var i=4; i < rowCnt1; i++){	
	    	var cntrQ_All="";
	    	for(var a=0;a<cntrQtyCnt;a++){ //넘어온 header값
		    	cntrQ_All += sheetObj2.GetCellValue(i,"cntrQ_qty"+a )+ ";";	
	    	}
	    	sheetObj2.SetCellValue(i,"cntrQ_qtyAll", cntrQ_All );
	    }
	}
	
	if (sheetObj3.RowCount()>0){	  
		var rowCnt2 = 0;
	    if(formObj.f_chk_o.checked == true ){ //original 포함 계산
	    	rowCnt2 = parseInt(splitCnt)+headerRowCnt+1; //keep original booking인 경우 	    	
	    }else{    	
	    	rowCnt2 = parseInt(splitCnt)+headerRowCnt;
	    }	    
	    for(var i=2; i < rowCnt2; i++){	
	    	var cntrL_All="";
		    for(var a=0;a<cntrListCnt;a++){ //넘어온 header값
		    	cntrL_All += sheetObj3.GetCellValue(i,"cntrL_qty"+a )+ ";";	
		    }
	    	sheetObj3.SetCellValue(i,"cntrL_qtyAll", cntrL_All );
	    }
	}
}
var cntrHdr1="";
var cntrSeq="";
var cntrSaveName="";
var cntrListHdr1="";
var cntrListHdr2="";
var cntrListSeq="";
var cntrLSaveName="";
function getBkgSpitCntrHdr(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			cntrHdr1=rtnArr[0];
			cntrSeq=rtnArr[1];
			cntrSaveName=rtnArr[2];
		}else{
			cntrHdr1="";
			cntrSeq="";
			cntrSaveName="";
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function getBkgSpitCntrListHdr(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			cntrListHdr1 = rtnArr[0];
			cntrListHdr2 = rtnArr[1];
			cntrListSeq = rtnArr[2];
			cntrLSaveName=rtnArr[3];
		}else{
			cntrListHdr1 = "";
			cntrListHdr2 = "";
			cntrListSeq = "";
			cntrLSaveName="";
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
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
			var col=sheetObj.GetSelectCol();
			sheetObj.SetColHidden(col,1);
			sheetObj.SetColWidth(col,1);
		break;
	 }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	var formObj=document.frm1;
   	doProcess=true;
   	formObj.f_cmd.value="";
   	var paramStr = "";
   	
   	if(sheetObj.GetCellValue(Row,"biz_clss_cd") == "M"){
   		paramStr="./SEE_BMD_0500.clt?f_cmd="+SEARCHLIST+"&f_lnr_bkg_no="+sheetObj.GetCellValue(Row,"lnr_bkg_no")+"&f_bkg_seq="+sheetObj.GetCellValue(Row,"bkg_seq")+"&f_bkg_no="+sheetObj.GetCellValue(Row,"bkg_no");
   	   	parent.mkNewFrame('Carrier Booking Entry', paramStr,"SEE_BMD_0500_SHEET_"+sheetObj.GetCellValue(Row,"lnr_bkg_no")+"_"+sheetObj.GetCellValue(Row,"bkg_seq")+"_"+sheetObj.GetCellValue(Row,"bkg_no"));
   	}else{
   		paramStr="./SEE_BMD_0200.clt?f_cmd="+SEARCHLIST+"&f_bkg_no="+sheetObj.GetCellValue(Row,"bkg_no")+"&f_bkg_seq="+sheetObj.GetCellValue(Row,"bkg_seq");
   	   	parent.mkNewFrame('OEH Booking Entry', paramStr,"SEE_BMD_0200_SHEET_"+sheetObj.GetCellValue(Row,"bkg_no")+"_"+sheetObj.GetCellValue(Row,"bkg_seq"));
   	}
}
function sheet3_OnSearchEnd(sheetObj, errMsg) {
	var formObj=document.frm1;
	var sheetObj1=docObjects[1];

	if (sheetObj.RowCount()>0){

		//Original Booking
	    sheetObj.SetCellValue(1, "cntrQ_Text", "Original Booking",0);	    
	    //Split Sum
	    sheetObj.DataInsert(2);
	    sheetObj.SetCellValue(2, "cntrQ_Text", "Split Sum",0);
	    //Balance/ Original
	    sheetObj.DataInsert(3);
	    sheetObj.SetCellValue(3, "cntrQ_Text", "Balance",0);
	    
	    for(var a=0;a<cntrQtyCnt;a++){ //넘어온 header값 만큼 값 채움
	    	sheetObj.SetCellEditable(1,"cntrQ_qty"+a, 0);
	    	sheetObj.SetCellValue(2, "cntrQ_qty"+a, 0);
	    	sheetObj.SetCellEditable(2,"cntrQ_qty"+a, 0);
	    	sheetObj.SetCellEditable(3,"cntrQ_qty"+a, 0);
	    	
	    	if(sheetObj.GetColHidden("cntrQ_qty"+a) == 1) {
	    		sheetObj.SetColHidden("cntrQ_qty"+a, 0);
	    	}
	    }
	    
	    sheetObj.SetExtendLastCol(1);
	    sheetObj.RenderSheet(1);
	    
	    sheetObj.SetCellValue(1,"cntrq_ibflag","R")
	    sheetObj.SetCellValue(2,"cntrq_ibflag","R")
	    sheetObj.SetCellValue(3,"cntrq_ibflag","R")
	    
	    //split 값 채움
	    var splitCnt = formObj.f_split_no.value;
		if (splitCnt=="")splitCnt=0;
		var rowCnt1 = 0;
		var calcCnt = 0;
		
	    if(formObj.f_chk_o.checked == true ){ //original 포함 계산
	    	rowCnt1 = parseInt(splitCnt)+headerRowCnt+3; //keep original booking인 경우 	
	    	calcCnt = parseInt(splitCnt)+1;	 
	    }else{    	
	    	rowCnt1 = parseInt(splitCnt)+headerRowCnt+2;
	    	calcCnt = parseInt(splitCnt);
	    }
	    var calcCnt1 = calcCnt-1;
	    var j=0;
		var lastCnt =0;
	
	    for(var i=4; i < rowCnt1; i++){	
	    	lastCnt = rowCnt1-1;
	    	sheetObj.DataInsert(i);
	    	sheetObj.SetCellValue(i,"cntrQ_Text", sheetObj1.GetCellValue(headerRowCnt+j,"no",0) );

	    	for(var a=0;a<cntrQtyCnt;a++){ //넘어온 header값
	    		var o_qty = sheetObj.GetCellValue(1,"cntrQ_qty"+a);	    

	    		var qty = 0;
	    		var qty1 = 0;
	    		if (i==lastCnt){
	    			qty1 = o_qty - Math.floor((o_qty/calcCnt))*calcCnt1;
	    			if(qty1<0) qty1=0;
			    	sheetObj.SetCellValue(i,"cntrQ_qty"+a, qty1 );
			    	sheetObj.SetCellEditable(i,"cntrQ_qty"+a, 1);
	    		}else{
	    			qty = Math.floor((o_qty/calcCnt))
	    			if(qty<0) qty=0;
			    	sheetObj.SetCellValue(i,"cntrQ_qty"+a, qty );
			    	sheetObj.SetCellEditable(i,"cntrQ_qty"+a, 1);
	    		}
	    	}
	    	j++;
	    }
	    if (sheetObj.GetCellValue(4,"cntrQ_Text",0)==""){
	    	sheetObj.SetCellValue(4,"cntrQ_Text", "Original");
	    }

	}
}

function sheet3_OnChange(sheetObj, Row, Col) {
	var formObj=document.frm1;
    var balance=0;	 
    var splitSum =0;

    if(formObj.f_chk_o.checked == true ){ //original 포함 계산
    	rowCnt1 = parseInt(splitCnt)+headerRowCnt+3; //keep original booking인 경우 	
    	calcCnt = parseInt(splitCnt)+1;	 
    }else{    	
    	rowCnt1 = parseInt(splitCnt)+headerRowCnt+2;
    	calcCnt = parseInt(splitCnt);
    }
    if(Row>3 && Col>0){  	
    	for(var i=4; i < rowCnt1; i++){	
    		splitSum += sheetObj.GetCellValue(i, Col, 0);
    	}
    	sheetObj.SetCellValue(2,Col, splitSum);
    	balance = sheetObj.GetCellValue(1,Col, 0)-sheetObj.GetCellValue(2,Col, 0)
    	sheetObj.SetCellValue(3,Col, balance ) ;  	
    }
    sheetObj.SetCellValue(1,"cntrq_ibflag","R")
    sheetObj.SetCellValue(2,"cntrq_ibflag","R")
    sheetObj.SetCellValue(3,"cntrq_ibflag","R")
}

function sheet4_OnSearchEnd(sheetObj, errMsg) {
	var formObj=document.frm1;
	var sheetObj1=docObjects[1];
	
	if (sheetObj.RowCount()>0){
	    
	    //split 값 채움
	    var splitCnt = formObj.f_split_no.value;
		if (splitCnt=="")splitCnt=0;
		var rowCnt2 = 0;

	    if(formObj.f_chk_o.checked == true ){ //original 포함 계산
	    	rowCnt2 = parseInt(splitCnt)+headerRowCnt+1; //keep original booking인 경우 	    	
	    }else{    	
	    	rowCnt2 = parseInt(splitCnt)+headerRowCnt;
	    }
	    
	    var j=0;
	    for(var i=2; i < rowCnt2; i++){	
	    	sheetObj.DataInsert(i);
	    	sheetObj.SetCellValue(i,"cntrL_Text", sheetObj1.GetCellValue(headerRowCnt+j,"no",0) );

	    	for(var a=0;a<cntrListCnt;a++){ //넘어온 header값
		    	sheetObj.SetCellValue(i,"cntrL_qty"+a, 0 );
		    	sheetObj.SetCellEditable(i,"cntrL_qty"+a, 1);
		    	
		    	if(sheetObj.GetColHidden("cntrL_qty"+a) == 1) {
		    		sheetObj.SetColHidden("cntrL_qty"+a, 0);
		    	}
	    	}
	    	j++;
	    }
	    if (sheetObj.GetCellValue(2,"cntrL_Text",0)==""){
	    	sheetObj.SetCellValue(2,"cntrL_Text", "Original");
	    }
	    sheetObj.SetExtendLastCol(1);
	    sheetObj.RenderSheet(1);
		sheetObj.RowDelete(rowCnt2,0);
		
		/*
		var f_biz_clss_cd = document.getElementsByName("f_biz_clss_cd");		
		var biz_clss_cd = getRadioVal(f_biz_clss_cd);
		if(biz_clss_cd=="M"){
			sheetObj.SetType
		}
		*/
	}
}
function sheet5_OnSearchEnd(sheetObj,errMsg) {
	
	var formObj=document.frm1;
	var BKGSELCD ='';
	var BKGSELNM ='';
	
    if(formObj.f_chk_o.checked == true ){ //original 포함 계산
    	BKGSELNM ="Original|";    	
    	BKGSELCD ="|";
    }
    for(var i=1; i<=splitCnt; i++){
    	if (i==splitCnt){
        	BKGSELNM +=i;
        	BKGSELCD +=i;
    	}else{
        	BKGSELNM +=i+"|";
        	BKGSELCD +=i+"|";
    	}
    }
	for(var i=1; i<=sheetObj.LastRow(); i++){
		sheetObj.CellComboItem(i,"sel_bkg", {ComboText:BKGSELNM, ComboCode:BKGSELCD} );
	}
}
var cur_row;
function sheet5_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	cur_row=Row;
	var colStr=sheetObj.ColSaveName(Col);
	var BKGSELCD ='';
	var BKGSELNM ='';
    if(formObj.f_chk_o.checked == true ){ //original 포함 계산
    	BKGSELNM ="Original|";    	
    	BKGSELCD ="|";
    }
    for(var i=1; i<=splitCnt; i++){
    	if (i==splitCnt){
        	BKGSELNM +=i;
        	BKGSELCD +=i;
    	}else{
        	BKGSELNM +=i+"|";
        	BKGSELCD +=i+"|";
    	}
    }
	if(colStr == "rowadd"){
		var intRows=sheetObj.LastRow()+1;

		 sheetObj.DataInsert(Row+1);
		 sheetObj.SetCellValue(Row+1, "cust_po_no",sheetObj.GetCellValue(Row, "cust_po_no"));
		 sheetObj.SetCellValue(Row+1, "cust_itm_id",sheetObj.GetCellValue(Row, "cust_itm_id"));
		 sheetObj.SetCellValue(Row+1, "cust_itm_nm",sheetObj.GetCellValue(Row, "cust_itm_nm"));
		 sheetObj.SetCellValue(Row+1, "cmdt_ttl_qty",sheetObj.GetCellValue(Row, "cmdt_ttl_qty"));
		 sheetObj.SetCellValue(Row+1, "po_sys_no",sheetObj.GetCellValue(Row, "po_sys_no"));
		 sheetObj.SetCellValue(Row+1, "po_cmdt_seq",sheetObj.GetCellValue(Row, "po_cmdt_seq"));
		 sheetObj.CellComboItem(Row+1,"sel_bkg", {ComboText:BKGSELNM, ComboCode:BKGSELCD} );
		 sheetObj.SetCellValue(Row+1, "rowadd","+");
		 sheetObj.SetCellValue(Row+1, "rowdel","-");

	}else if(colStr == "rowdel"){
		sheetObj.RowDelete(Row,0);

	}
}
function sheet6_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		showCompleteProcess();
	}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var cntrHeader="";
var cntrListHeader1="";
var cntrListHeader2="";
var cntrQtyCnt =0;
var cntrListCnt =0;
function setSheetHeader2(){
	var formObj=document.frm1;
	 ajaxSendPost(getBkgSpitCntrHdr, 'reqVal', '&goWhere=aj&bcKey=getBkgSpitCntrHdr&f_bkg_seq='+formObj.f_bkg_seq.value, './GateServlet.gsl');
	 //header
	 cntrHeader ="|"+cntrHdr1;
	 cntrQtyCnt= cntrHdr1.substring(0, cntrHdr1.length-1).split("|").length;
	 if (cntrQtyCnt>31){
		 alert(getLabel('FMS_COM_ALT108'));
		 cntrQtyCnt=30; 
	 }
}
function setSheetHeader3(){
	var formObj=document.frm1;
	 ajaxSendPost(getBkgSpitCntrListHdr, 'reqVal', '&goWhere=aj&bcKey=getBkgSpitCntrListHdr&f_bkg_seq='+formObj.f_bkg_seq.value, './GateServlet.gsl')
	 //header
	 cntrListHeader1 = "|"+cntrListHdr1;
	 cntrListHeader2 = "Type/Size|"+cntrListHdr2;
	 cntrListCnt=cntrListHdr2.substring(0, cntrListHdr2.length-1).split("|").length;
	 if (cntrListCnt>51){
		 alert(getLabel('FMS_COM_ALT109'));
		 cntrListCnt=50; 
	 }
}
function setSheet2() {
	if (cntrHeader!="|"){
		docObjects[2] = docObjects[2].Reset();
	    comConfigSheet(docObjects[2], SYSTEM_FIS);
	    initSheet(docObjects[2],3);
	    comEndConfigSheet(docObjects[2]);
	    docObjects[2].RenderSheet(0);
	    docObjects[2].SetExtendLastCol(0);
	}else{
		docObjects[2] = docObjects[2].Reset();
	    comConfigSheet(docObjects[2], SYSTEM_FIS);
	    initSheet(docObjects[2],3);
	    comEndConfigSheet(docObjects[2]);
	}
}
function setSheet3() {
	if (cntrListHeader1!="|"){
		docObjects[3] = docObjects[3].Reset();
	    comConfigSheet(docObjects[3], SYSTEM_FIS);
	    initSheet(docObjects[3],4);
	    comEndConfigSheet(docObjects[3]);
	    docObjects[3].RenderSheet(0);
	    docObjects[3].SetExtendLastCol(0);
	}else{
		docObjects[3] = docObjects[3].Reset();
	    comConfigSheet(docObjects[3], SYSTEM_FIS);
	    initSheet(docObjects[3],4);
	    comEndConfigSheet(docObjects[3]);
	}
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;

    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);																																																																												(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    var opt_key = "BKG_EDIT_MODE";
	ajaxSendPost(setBkgEditStsCdVal, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
 // 사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false);
    //단축키추가.
    setShortcut();
    initFinish();
    
    /* operation 권한이 없는 경우 */    	   		
	var objDisable = false; 
	if (uod_flg == "N"){ 
		objDisable = true;
		formObj.f_opr_usrid.value=usrId;
		formObj.f_opr_usrid.disabled = objDisable; 
		$("#oprBtn").prop('disabled', objDisable);    	   			
	} 
	//setSheetHeader();
    //doWork('SEARCHLIST');
}
function setShortcut(){
	/* LHK 20131118 공통으로 처리
	shortcut.add("Alt+4",function() {
		doWork('PROFIT_REPORT');
	});
	*/
	shortcut.add("Alt+G",function() {
		sheet1_OnDblClick(docObjects[0], docObjects[0].GetSelectRow(), 1);
	});
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
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('SEE_BKG_0030_HDR1'), Align:"Center"},
	        	                   { Text:getLabel('SEE_BKG_0030_HDR2'), Align:"Center"}  ];
	            InitHeaders(headers, info);
	
	            var cols = [ 
							 {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
							 {Type:"Combo",     Hidden:1,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"bkg_sts_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bkg_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         
	                         {Type:"Combo",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"biz_clss_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"act_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"act_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"lnr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         
	     	                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"trnk_voy",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_qty",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Combo",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_ut_cd",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:1,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_ut_nm",      KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",      Hidden:0,  Width:120,  Align:"Right",  ColMerge:0,   SaveName:"meas",         KeyField:0,   CalcLogic:"",   Format:"Float",         PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	     	         	     	                
	                         {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bkg_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                        
	                         ];
	             
	            InitColumns(cols);
	
	            SetEditable(1);
	            SetColProperty("pck_ut_cd", {ComboText:BKGPCKNM, ComboCode:BKGPCKCD} );
	            SetColProperty("biz_clss_cd", {ComboText:'Carrier Booking|Customer Booking', ComboCode:'M|H'} );
	            SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	            SetSheetHeight(200);
		   }                                                      
		break;
		case 2:      //Booking
		    with (sheetObj) {
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('SEE_BKG_0030_HDR3'), Align:"Center"},
	        	                   { Text:getLabel('SEE_BKG_0030_HDR4'), Align:"Center"}  ];
	            InitHeaders(headers, info);
	
	            var cols = [  
	                         {Type:"Text",     	Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
							 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bkg_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"suffix",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                         {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_qty",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	                         {Type:"Combo",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_ut_cd",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	     	                 {Type:"Text",      Hidden:1,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_ut_nm",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",    ColMerge:0,   SaveName:"meas",         KeyField:0,   CalcLogic:"",   Format:"Float",        PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
	     	                 {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bkg_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Status",    Hidden:1, Width:40,    Align:"Center",  ColMerge:1,  SaveName:"ibflag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 }
	                        
	                         ];
	             
	            InitColumns(cols);
	            SetColProperty("pck_ut_cd", {ComboText:BKGPCKNM, ComboCode:BKGPCKCD} );
	            SetEditable(1);
	            SetSheetHeight(200);
		   }                                                      
		break;
		case 3:      //Container Quantity 
		    with (sheetObj) {
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
        	
            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:cntrHeader, Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [];
            var cntr_name=cntrSaveName.substring(0, cntrSaveName.length-1).split(";");
           
            cols.push({Type:"Text",   Hidden:0,  Width:100,   Align:"Right",   ColMerge:0,   SaveName:"cntrQ_Text",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
            for(var cnt_hdr = 0 ; cnt_hdr < cntr_name.length; cnt_hdr++){
				cols.push({Type:"Float",   Hidden:0,  Width:40, Align:"Right", ColMerge:0,   SaveName:cntr_name[cnt_hdr],    KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,   UpdateEdit:1,   InsertEdit:0 });
			}
            cols.push({Type:"Text",   Hidden:1,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"bkg_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
            cols.push({Type:"Status", Hidden:1,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cntrq_ibflag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
            cols.push({Type:"Text",   Hidden:1,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cntrQ_qtyAll",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
			
            InitColumns(cols);
            SetEditable(1);
            SetSheetHeight(200); 
            ComResizeSheet(docObjects[2]);

		   }                                                      
		break;
		case 4:      //Container
		    with (sheetObj) {
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	            var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
	            var headers = [ { Text:cntrListHeader1, Align:"Center"}
	        	                   ,{ Text:cntrListHeader2, Align:"Center"}  
	            ]; 
	            InitHeaders(headers, info);
	           
	            var cols = [];
	            var cntrL_name=cntrLSaveName.substring(0, cntrLSaveName.length-1).split(";");
	           
	            cols.push({Type:"Text",   Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cntrL_Text",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
	            for(var cnt_hdr = 0 ; cnt_hdr < cntrL_name.length; cnt_hdr++){
	            	//carrier booking도 여러개 선택 가능하도록 요청 2017-04-17
					//cols.push({Type:"Radio",  RadioIcon:0,  Hidden:0,  Width:80, Align:"Right", ColMerge:0,   SaveName:cntrL_name[cnt_hdr],    KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,   UpdateEdit:1,   InsertEdit:0 });
	            	cols.push({Type:"CheckBox",   Hidden:0,  Width:80, Align:"Right", ColMerge:0,   SaveName:cntrL_name[cnt_hdr],    KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,   UpdateEdit:1,   InsertEdit:0 });
				}
	            cols.push({Type:"Text",   Hidden:1,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"bkg_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
	            cols.push({Type:"Status", Hidden:1,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cntrl_ibflag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
	            cols.push({Type:"Text",   Hidden:1,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cntrL_qtyAll",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });          
	            InitColumns(cols);
	
	            SetEditable(1);
	            SetSheetHeight(200);
		   }                                                      
		break;
		case 5:      //P/O
		    with (sheetObj) {
			SetConfig( { SearchMode:2, MergeSheet:4, Page:20, DataRowMerge:1, TabStop:0 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('SEE_BKG_0030_HDR5'), Align:"Center"},
		                    { Text:getLabel('SEE_BKG_0030_HDR6'), Align:"Center"} ];
			InitHeaders(headers, info);
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

			var cols = [ 
			             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_ibflag" },
			             {Type:"Text",   	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bkg_seq" },
			             {Type:"Text",    	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"po_sys_no" },
			             {Type:"Text",    	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"po_cmdt_seq" },
			             {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cust_po_no",			KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text", 		Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"cust_itm_id",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"cust_itm_nm",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_ttl_qty",       KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:7 }, 
        	             
        	             {Type:"Text",      Hidden:0, Width:50,  Align:"Center",   ColMerge:0,   SaveName:"rowadd",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:0, Width:50,  Align:"Center",   ColMerge:0,   SaveName:"rowdel",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"cmdt_ea_cnt",    	KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
        	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"sel_bkg",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Int",       Hidden:1, Width:90,   Align:"Right",   ColMerge:0,   SaveName:"cmdt_pck_qty",   	KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cmdt_pck_ut_cd",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:1, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"cmdt_pck_ut_nm",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Float",     Hidden:1, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"cmdt_pck_inr_qty",	KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Float",     Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_kgs_wgt",  	 	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Float",     Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_lbs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Float",     Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_cbm_meas",  	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
        	             {Type:"Float",     Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"cmdt_cft_meas",  	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
        	             {Type:"Status",     Hidden:1, Width:40,  Align:"Center",  ColMerge:1,   SaveName:"po_ibflag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 }
        	             
        	             ];
	       
			InitColumns(cols);
			SetEditable(1);
			SetSheetHeight(300);

			SetCellValue("rowadd","+");
			SetCellValue("rowdel","-");
			SetHeaderRowHeight(20);
	        SetHeaderRowHeight(21);
	        SetSheetHeight(150);
	        }
                                                     
		break;
		case 6:     //submit sheet
			with (sheetObj) {
            	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

            	var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            	var headers = [ { Text:"|Booking Seq.|Booking No.", Align:"Center"} ];
            	InitHeaders(headers, info);
            
            	var cols = [ {Type:"Status",    Hidden:0, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
            	             {Type:"Text",      Hidden:0, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bkg_seq" }
            	             ];
             
            	InitColumns(cols);
            	SetEditable(1);
            	SetVisible(0);
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

var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp, air_sea_clss_cd){
	var s_code=obj.value.toUpperCase();
	var s_type="";
//	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+'&air_sea_clss_cd='+air_sea_clss_cd, './GateServlet.gsl');
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else{
					s_type=str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+'&air_sea_clss_cd='+air_sea_clss_cd, './GateServlet.gsl');
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else{
					s_type=str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
//			}
		}else if ( tmp == "onChange" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+'&air_sea_clss_cd='+air_sea_clss_cd, './GateServlet.gsl');
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
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=masterVals[0]; 
				formObj.s_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=""; 
				formObj.s_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function checkBlReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	var biz_clss_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd");
	
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			if(biz_clss_cd == "M"){
				//Cannot delete because MB/L was Created!
	   	 		alert(getLabel('FMS_COM_ALT092'));
			}else{
				//Cannot delete because HB/L was Created!
	   	 		alert(getLabel('FMS_COM_ALT068'));
			}
		}
		else{
			ajaxSendPost(getBkgStatus, 'reqVal', '&goWhere=aj&bcKey=getBkgStatus&bkg_seq='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq")
																			  +'&biz_clss_cd='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd"), './GateServlet.gsl');
			
			if(getBkgEditMode(v_bkg_sts_cd) != "Y"){
				alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('BKG_STATUS'));
			} else {
				//'Do you want to delete?')){
				if(confirm(getLabel('FMS_COM_CFMDEL'))){
	   	 			formObj.f_cmd.value=REMOVE;
	   	 			formObj.bkg_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq");
		   	 		if(biz_clss_cd == "M"){
		   	 			docObjects[0].DoSearch("./SEE_BMD_0510GS.clt", FormQueryString(formObj) );
					}else{
						docObjects[0].DoSearch("./SEE_BMD_0210GS.clt", FormQueryString(formObj) );
					}
	 			}
			}
		}
	}
}

function clearAll(){
	var formObj = document.frm1;
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	docObjects[3].RemoveAll();
	docObjects[4].RemoveAll();
	formObj.f_split_no.value = "";
	formObj.f_chk_o.checked=false;
}
function entSearch(){
	if(event.keyCode == 13){
		document.forms[0].f_CurPage.value='';
		doWork('SEARCHLIST')
	}
}
function formValidation(){

	return true;
}

function searchValueClear(type){
	formObj = document.frm1;
	
	if(type == "TRDP"){
		formObj.f_sel_trdp_nm.value="";
	} else if(type == "BL"){
		formObj.f_bl_no.value="";
	} else if(type == "USER"){
		if (uod_flg != "N"){ 
			formObj.f_opr_usrid.value = "";
		}
	} else {
		formObj.f_sel_no.value="";
	}
}
function POL_LOCATION_POPLIST(rtnVal){
	formObj = document.frm1;
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
	formObj = document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	} 
}
function TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
        else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_sel_trdp_nm.value=rtnValAry[2];//full_nm
	}    
}
/*function SHIP_TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_shpr_trdp_nm.value=rtnValAry[2];//full_nm
	}    
}
function CNEE_TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cnee_trdp_nm.value=rtnValAry[2];//full_nm
	}  
}
function NTFY_TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ntfy_trdp_nm.value=rtnValAry[2];//full_nm
	}     
}*/


function createMBL(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if(doc[1]=='N'){
			ajaxSendPost(getBkgStatus, 'reqVal', '&goWhere=aj&bcKey=getBkgStatus&bkg_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq")
																			  +'&biz_clss_cd='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd"), './GateServlet.gsl');
		
			if(v_bkg_sts_cd == "CF"){
				ajaxSendPost(getLnrBkgNo, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgNo&bkg_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq"), './GateServlet.gsl');

				if(v_lnr_bkg_no == ""){
					alert(getLabel('SAVE_CARRIER_BOOKING_ENTRY'));
					return;
				}
				
				//C.W Park.
				//동일한 BKG_NO가 존재할 경우 Bug발생으로 Seq 까지 추가함.
				var paramStr="./SEE_BMD_0040.clt?f_cmd=130&f_lnr_bkg_no="+v_lnr_bkg_no + "&f_bkg_seq=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq");
				parent.mkNewFrame('Master B/L Entry', paramStr);
			} else{
				alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('BKG_STATUS'));
			}
		}else{
			alert(getLabel('FMS_COM_ALT096'));
		}
	} else {
		// alert(getLabel('SEE_BMD_MSG43'));
	}
}

var v_bkg_sts_cd = "";

function getBkgStatus(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if(typeof(doc[1])!='undefined'){
			v_bkg_sts_cd = doc[1];
		}
	}
}

var v_lnr_bkg_no = "";

function getLnrBkgNo(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if(typeof(doc[1])!='undefined'){
			v_lnr_bkg_no = doc[1];
		}
	}
}

function setBkgEditStsCdVal(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		BKG_EDIT_MODE = doc[1];
	}else{
		BKG_EDIT_MODE = "[CR]:Y,[RD]:N,[RJ]:Y,[CF]:N,[CN]:Y,[BL]:N";
	}
}

function getBkgEditMode(bkg_sts_cd){
	var rtnValAry=BKG_EDIT_MODE.split(",");
	var bkg_edit_mode = "N";
	
	for (var i=0; i < rtnValAry.length; i++) {
		var result = rtnValAry[i].split(":");
		if(result[0] == "[" + bkg_sts_cd + "]"){
			bkg_edit_mode = result[1];
		}
	}
	
	return bkg_edit_mode;
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
//#1892 [PATENT] BKG SPLIT/COMBINE 점검항목
function getBkgSplitChk(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1];
			if (rtnArr !="1"){
				if(formObj.f_biz_clss_cd.value=="M"){
					alert("CLP");
				}else if(formObj.f_biz_clss_cd.value=="H"){
					alert("BKG RLT");
				}
			}

		}else{
			alert("error");
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}