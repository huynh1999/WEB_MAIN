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
var biz_clss_cd = "";

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
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
	    	   	 if(formObj.f_bl_no.value == '' ){
	      		   alert(getLabel('FMS_COM_ALT014'));
	      		   frm1.f_bl_no.focus();
	      		   return;
	    	   	 }
  	
    	   		if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value=SEARCHLIST;
			   		sheetObj.DoSearch("./SEE_BMD_0250GS.clt", FormQueryString(formObj) );
			   		//데이터 초기화
			   		clearAll();
			    }
			    break;
            case "SEARCH_CNTR_LIST": // CNTR List조회
  			   frm1.f_cmd.value = SEARCHLIST01;
  	           setSheetHeader_cntr();
  	           setSheet_cntr();
  	           docObjects[2].DoSearch("./SEE_BMD_0250_1GS.clt", FormQueryString(frm1));
  			   break;  			   
            case "SEARCH_PO":	// PO 조회
         	   frm1.f_cmd.value=SEARCHLIST02;
         	   docObjects[3].DoSearch("./SEE_BMD_0250_2GS.clt", FormQueryString(frm1) );
         	   break;
    	   	case "ADD":
    	   		if(formObj.f_chk_o.checked == true ){
    	   			formObj.chk_origin.value ="Y";
    	   		}else{
    	   			formObj.chk_origin.value ="N";
    	   		}
    	   		var dupRow=sheetObj1.ColValueDup("bl_no|suffix");
    	   		if(dupRow > 0){
    	   			alert(getLabel('FMS_COM_ALT104'));
    	   			return false;
    	   		}
    	   						
    	   		//총합 체크
    	   		//if(hbl_tp_cd != 'DR'){
    	   		if( !(hbl_tp_cd == 'DR' || hbl_tp_cd == 'FW' || hbl_tp_cd == 'DT')){	
    	   			if(!sumValueCheck()) return;
    	   		}
    	   		//cotainer 
    	   		if(!cntrChk()) return;;
				formObj.f_cmd.value=MODIFY;
				formObj.cntrListSeq.value =cntrListSeq;
				//BL No. 중복 체크
				var rowCnt=0;
				var chkCnt=0;
//				if(formObj.f_chk_o.checked == true ){
//					rowCnt = parseInt(splitCnt)+headerRowCnt+1; //keep original booking인 경우
//					chkCnt = headerRowCnt+1;
//				}else{
					rowCnt = parseInt(splitCnt)+headerRowCnt;
					chkCnt = headerRowCnt;
//				}
				for(var i=chkCnt; i < rowCnt; i++){
					if(formObj.f_chk_o.checked == true ){
						if(i != chkCnt){
							ajaxSendPost(getBlCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=O&f_bl_no='+sheetObj1.GetCellValue(i, 'bl_no')+sheetObj1.GetCellValue(i, 'suffix') +'&f_biz_clss_cd='+ biz_clss_cd, './GateServlet.gsl');
						}
					}else{
						ajaxSendPost(getBlCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea=S&f_bnd_clss_cd=O&f_bl_no='+sheetObj1.GetCellValue(i, 'bl_no')+sheetObj1.GetCellValue(i, 'suffix') +'&f_biz_clss_cd='+ biz_clss_cd, './GateServlet.gsl');
					}
					
					if(chekMsg == 'DP'){
						alert(getLabel2('FMS_COM_000001',new Array(sheetObj1.GetCellValue(i, 'bl_no')+sheetObj1.GetCellValue(i, 'suffix'))));
						sheetObj1.SelectCell(i, "suffix", false);
						return;
					}
				}
				
				//저장 처리
				if(confirm(getLabel('FMS_COM_CFMSAV'))){
					var sndParam=getSndParam();
	     		    if(sndParam == true)	{	return false;	}
		     		   var intRows3=docObjects[4].LastRow() + 1;
		     		   docObjects[4].DataInsert(intRows3);
		     		   docObjects[4].SetCellValue(1,1,1);
		     		   docObjects[4].DoAllSave("./SEE_BMD_0250_3GS.clt", FormQueryString(formObj)+sndParam, false);
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
	
	var blParam=docObjects[1].GetSaveString(false);
	var cntrListParam=docObjects[2].GetSaveString(false);
	var poListParam=docObjects[3].GetSaveString(1);	
	var sheetParam='';
	isError=false;

	if(blParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= blParam;
	  	bookingParam=true;
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
function openBlPopUp(obj){
	var formObj = document.frm1;
	
	if(getRadioVal(formObj.f_biz_clss_cd) == 'M'){
		srOpenPopUp('MBL_POPLIST',obj);
	}else{
		openPopUp('HBL_POPLIST',obj);
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
var hbl_tp_cd = "";
var hbl_cnt = 0;
function splitBl(){
	
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
//	if(formObj.f_chk_o.checked == true ){
//		rowCnt = parseInt(splitCnt)+headerRowCnt+1; //keep original booking인 경우 
//		calcCnt = parseInt(splitCnt)+1;
//	}else{
		rowCnt = parseInt(splitCnt)+headerRowCnt;
		calcCnt = parseInt(splitCnt);
//	}
	formObj.f_intg_bl_seq.value = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'intg_bl_seq');
	biz_clss_cd = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'biz_clss_cd');
	hbl_tp_cd = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'hbl_tp_cd');
	hbl_cnt = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'hbl_cnt');
	formObj.f_ref_no.value = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'ref_no');
	formObj.org_biz_clss_cd.value = sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'biz_clss_cd');
	
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
    	sheetObj1.SetCellValue(i, "bl_no", 	sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'bl_no'),0);
    	if(formObj.f_chk_o.checked == true ){
    		if(i!=headerRowCnt){
    			sheetObj1.SetCellValue(i, "suffix", 	arr_suffix[i],0);
    		}
    	}else{
    		sheetObj1.SetCellValue(i, "suffix", 	arr_suffix[i],0);
    	}
		sheetObj1.SetCellValue(i, "intg_bl_seq", 	sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'intg_bl_seq')+"_"+j,0);
		sheetObj1.SetCellValue(i, "no", j,0);
		j++;
    	
    	if(hbl_tp_cd == 'DR' || hbl_tp_cd == 'FW' || hbl_tp_cd == 'DT'){
        	sheetObj1.SetCellValue(i, "pck_qty", 	o_pck_qty,0);
        	sheetObj1.SetCellValue(i, "pck_ut_cd", 	sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'pck_ut_cd'),0);
        	sheetObj1.SetCellValue(i, "pck_ut_nm", 	sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'pck_ut_nm'),0);
        	sheetObj1.SetCellValue(i, "grs_wgt", 	o_grs_wgt,0);
        	sheetObj1.SetCellValue(i, "grs_wgt1", 	o_grs_wgt1,0);
        	sheetObj1.SetCellValue(i, "meas", 		o_meas,0);
        	sheetObj1.SetCellValue(i, "meas1", 		o_meas1,0);
    	}else{
        	sheetObj1.SetCellValue(i, "pck_qty", 	pck_qty,0);
        	sheetObj1.SetCellValue(i, "pck_ut_cd", 	sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'pck_ut_cd'),0);
        	sheetObj1.SetCellValue(i, "pck_ut_nm", 	sheetObj.GetCellValue(sheetObj.GetSelectRow(), 'pck_ut_nm'),0);
        	sheetObj1.SetCellValue(i, "grs_wgt", 	grs_wgt,0);
        	sheetObj1.SetCellValue(i, "grs_wgt1", 	grs_wgt1,0);
        	sheetObj1.SetCellValue(i, "meas", 		meas,0);
        	sheetObj1.SetCellValue(i, "meas1", 		meas1,0);
    	}
    }

    doWork('SEARCH_PO');
	doWork('SEARCH_CNTR_LIST'); 
    	
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
//	if(formObj.f_chk_o.checked == true ){
//		rowCnt = parseInt(splitCnt)+headerRowCnt+1; //keep original booking인 경우 
//		calcCnt = parseInt(splitCnt)+1;
//	}else{
		rowCnt = parseInt(splitCnt)+headerRowCnt;
		calcCnt = parseInt(splitCnt);
//	}
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
function getBlCheck(reqVal){
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
	
    var splitCnt = formObj.f_split_no.value;
	if (splitCnt=="")splitCnt=0;
	
	if (sheetObj2.RowCount()>0){	  
		var rowCnt2 = 0;
//	    if(formObj.f_chk_o.checked == true ){ //original 포함 계산
//	    	rowCnt2 = parseInt(splitCnt)+headerRowCnt+1; //keep original booking인 경우 	    	
//	    }else{
	    	rowCnt2 = parseInt(splitCnt)+headerRowCnt;
//	    }
	    	
	    var cntrChkArray = new Array(cntrListCnt);
	    for(var i=2; i < rowCnt2; i++){	
	    	var cntrL_All="";
		    for(var a=0;a<cntrListCnt;a++){ //넘어온 header값
		    	cntrL_All += sheetObj2.GetCellValue(i,"cntrL_qty"+a )+ ";";
		    	var tempVal = cntrChkArray[a];
		    	if(tempVal == 'undefined' || tempVal == undefined){
		    		tempVal = "";
		    	}
		    	cntrChkArray[a] = tempVal + sheetObj2.GetCellValue(i,"cntrL_qty"+a );
		    }
		    sheetObj2.SetCellValue(i,"cntrL_qtyAll", cntrL_All );
	    }
	    
	    var retFlag = true;
	    
	    for(var j = 0; j < cntrChkArray.length; j++){
	    	if (cntrChkArray[j].indexOf('1') == -1) {
	    		retFlag = false;
	    		break;
	    	}
	    }
	    
	    if(!retFlag){
			if(confirm(getLabel('FMS_COM_ALT111'))){
				return true;
			}else{
				return false;
			}
	    }else{
	    	return true;
	    }
	    
	    
	}
}
var cntrHdr1="";
var cntrSaveName="";
var cntrListHdr1="";
var cntrListHdr2="";
var cntrListSeq="";
var cntrLSaveName="";
var chk_cntr_rlt = "";
function getBlSpitCntrListHdr(reqVal){
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
			chk_cntr_rlt=rtnArr[4];
		}else{
			cntrListHdr1 = "";
			cntrListHdr2 = "";
			cntrListSeq = "";
			cntrLSaveName="";
			chk_cntr_rlt = "";
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
		var paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+'&f_ref_no='+escape(sheetObj.GetCellValue(Row, 'ref_no'))+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row, "intg_bl_seq");
	   	parent.mkNewFrame('Master B/L Entry', paramStr, "SEE_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no')+"_"+sheetObj.GetCellValue(Row, "intg_bl_seq"));
   	}else{
   		
		var paramStr = "./SEE_BMD_0020.clt?f_cmd=" + SEARCHLIST + "&f_bl_no="
		+ escape(sheetObj.GetCellValue(Row, "bl_no")) + "&f_intg_bl_seq="
		+ sheetObj.GetCellValue(Row, "intg_bl_seq");
		parent.mkNewFrame('Booking & HBL', paramStr,"SEE_BMD_0020_SHEET_" +  escape(sheetObj.GetCellValue(Row, "bl_no")) + "_" + sheetObj.GetCellValue(Row, "intg_bl_seq"));
   	}
}
function sheet3_OnClick(sheetObj,Row,Col){
	if(biz_clss_cd == 'M'){
		if(sheetObj.GetCellEditable(Row, Col) == 1){
			for(var i = 2; i < sheetObj.LastRow() + 1; i++){
				sheetObj.SetCellValue(i, Col, 0);
			}
			sheetObj.SetCellValue(i, Col, 1);
		}
	}
}

function sheet3_OnSearchEnd(sheetObj, errMsg) {

	var formObj=document.frm1;
	var sheetObj1=docObjects[1];
	
	if (sheetObj.RowCount()>0){
	    
	    //split 값 채움
	    var splitCnt = formObj.f_split_no.value;
		if (splitCnt=="")splitCnt=0;
		var rowCnt2 = 0;

//	    if(formObj.f_chk_o.checked == true ){ //original 포함 계산
//	    	rowCnt2 = parseInt(splitCnt)+headerRowCnt+1; //keep original booking인 경우 	    	
//	    }else{    	
	    	rowCnt2 = parseInt(splitCnt)+headerRowCnt;
//	    }
	    var j=0;
	    for(var i=2; i < rowCnt2; i++){	
	    	sheetObj.DataInsert(i);
	    	sheetObj.SetCellValue(i,"cntrL_Text", sheetObj1.GetCellValue(headerRowCnt+j,"no",0) );

	    	for(var a=0;a<cntrListCnt;a++){
		    	sheetObj.SetCellValue(i,"cntrL_qty"+a, 0 );
		    	sheetObj.SetCellEditable(i,"cntrL_qty"+a, 1);
		    	
		    	if(sheetObj.GetColHidden("cntrL_qty"+a) == 1) {
		    		sheetObj.SetColHidden("cntrL_qty"+a, 0);
		    	}
	    	}
	    	j++;
	    	
	    	if(biz_clss_cd == 'M'){
	    		var cntrListHdr1Sp = cntrListHdr1.split("|");
	    		var chk_cntr_rltSp = chk_cntr_rlt.split("#^^#");
	    		
	    		for(k = 0; k <= cntrListHdr1Sp.length; k++){
	    			for(l = 0; l <= chk_cntr_rltSp.length; l++){
	    				if(chk_cntr_rltSp[l] != '' && undefined != chk_cntr_rltSp[l]){
		    				var chkValue = chk_cntr_rltSp[l].split("*^^*");
		    				if(cntrListHdr1Sp[k] == chkValue[0]){
		    					 
		    					if(hbl_tp_cd == 'DR' || hbl_tp_cd == 'FW' || hbl_tp_cd == 'DT'){
		    						//#2355 [PATENT] B/L Split / Combine
		    						if(hbl_cnt != 0){
				    					sheetObj.SetCellValue(i, chkValue[2], 1);
				    					sheetObj.SetCellEditable(i, chkValue[2], 0);
		    						}
		    					}else{
			    					if(chkValue[1] == 'N'){
			    						if(i == 2){
			    							sheetObj.SetCellValue(i, chkValue[2], 1);
			    						}else{
			    							sheetObj.SetCellValue(i, chkValue[2], 0);
			    						}
			    						sheetObj.SetCellEditable(i, chkValue[2], 0);
			    					}else{
			    						sheetObj.SetCellEditable(i, chkValue[2], 1);
			    					}
			    				}
		    				}
	    				}
	    			}
	    		}
	    	}
	    	
	    }
	    if (sheetObj.GetCellValue(2,"cntrL_Text",0)==""){
	    	sheetObj.SetCellValue(2,"cntrL_Text", "Original");
	    }
	    
	    sheetObj.SetExtendLastCol(1);
	    sheetObj.RenderSheet(1);
		sheetObj.RowDelete(rowCnt2,0);
	}
}
function sheet4_OnSearchEnd(sheetObj,errMsg) {
	
	var formObj=document.frm1;
	var BKGSELCD ='';
	var BKGSELNM ='';
	
	var CntrHdr = '';
	
//    if(formObj.f_chk_o.checked == true ){ //original 포함 계산
//    	BKGSELNM ="Original|";    	
//    	BKGSELCD ="|";
//    }
    for(var i=1; i<=splitCnt; i++){
    	if (i==splitCnt){
        	BKGSELNM +=i;
        	BKGSELCD +=i;
    	}else{
        	BKGSELNM +=i+"|";
        	BKGSELCD +=i+"|";
    	}
    }
	
	var cntrListHeader1Sp = cntrListHeader1.split('|');
	
	for(var i = 1; i <= cntrListHeader1Sp.length; i++){
		if(cntrListHeader1Sp[i] != '' && cntrListHeader1Sp[i] != undefined){
			CntrHdr += "|" + cntrListHeader1Sp[i];
		}
	}
	
	for(var i=1; i<=sheetObj.LastRow(); i++){
		sheetObj.CellComboItem(i,"sel_bl", {ComboText:BKGSELNM, ComboCode:BKGSELCD} );
		sheetObj.CellComboItem(i,"sel_cntr", {ComboText:CntrHdr, ComboCode:CntrHdr} );
	}
	
}
var cur_row;

function sheet4_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	cur_row=Row;
	var colStr=sheetObj.ColSaveName(Col);
	var BKGSELCD ='';
	var BKGSELNM ='';
//    if(formObj.f_chk_o.checked == true ){ //original 포함 계산
//    	BKGSELNM ="Original|";    	
//    	BKGSELCD ="|";
//    }
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
		 sheetObj.SetCellValue(Row+1, "item_cust_po_no",sheetObj.GetCellValue(Row, "item_cust_po_no"));
		 sheetObj.SetCellValue(Row+1, "item_cmdt_cd",sheetObj.GetCellValue(Row, "item_cmdt_cd"));
		 sheetObj.SetCellValue(Row+1, "item_cmdt_nm",sheetObj.GetCellValue(Row, "item_cmdt_nm"));
		 sheetObj.SetCellValue(Row+1, "item_ttl_qty",sheetObj.GetCellValue(Row, "item_ttl_qty"));
		 sheetObj.SetCellValue(Row+1, "item_po_sys_no",sheetObj.GetCellValue(Row, "item_po_sys_no"));
		 sheetObj.SetCellValue(Row+1, "item_shp_cmdt_seq",sheetObj.GetCellValue(Row, "item_shp_cmdt_seq"));
		 sheetObj.CellComboItem(Row+1,"sel_bl", {ComboText:BKGSELNM, ComboCode:BKGSELCD} );
		 sheetObj.SetCellValue(Row+1, "rowadd","+");
		 sheetObj.SetCellValue(Row+1, "rowdel","-");

	}else if(colStr == "rowdel"){
		sheetObj.RowDelete(Row,0);

	}
}

function sheet4_OnChange(sheetObj,Row,Col){

	var cntrRow = Number(sheetObj.GetCellValue(Row, "sel_bl")) + 1;
	var cntrCol = Number(sheetObj.GetComboInfo(Row,"sel_cntr","SelectedIndex")) - 1;
	
	switch (sheetObj.ColSaveName(Col)) {
		case "sel_bl" :
			if(sheetObj.GetCellValue(Row, "sel_cntr") != ""){
				if(docObjects[2].GetCellValue(cntrRow, "cntrL_qty" + cntrCol.toString()) != 1){
					alert("Please. Check Container.");
					sheetObj.SetCellValue(Row, Col, "");
				}
			}
		break;
		case "sel_cntr" :
			if(sheetObj.GetCellValue(Row, "sel_bl") != ""){
				if(docObjects[2].GetCellValue(cntrRow, "cntrL_qty" + cntrCol.toString()) != 1){
					alert("Please. Check Container.");
					sheetObj.SetCellValue(Row, Col, "");
				}
			}
		break;
	}
	
}

function sheet5_OnSaveEnd(sheetObj, errMsg){
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
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;

    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
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
	            var headers = [ { Text:getLabel('SEE_BMD_0250_HDR1'), Align:"Center"},
	        	                   { Text:getLabel('SEE_BMD_0250_HDR2'), Align:"Center"}  ];
	            InitHeaders(headers, info);
	
	            var cols = [ 
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Combo",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"biz_clss_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ref_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
	                         {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"hbl_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"hbl_cnt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
	                         ];
	             
	            InitColumns(cols);
	
	            SetEditable(1);
	            SetColProperty("pck_ut_cd", {ComboText:BKGPCKNM, ComboCode:BKGPCKCD} );
	            SetColProperty("biz_clss_cd", {ComboText:'Master|House', ComboCode:'M|H'} );
	            SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	            SetSheetHeight(200);
		   }                                                      
		break;
		case 2:
		    with (sheetObj) {
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('SEE_BMD_0250_HDR3'), Align:"Center"},
	        	                   { Text:getLabel('SEE_BMD_0250_HDR4'), Align:"Center"}  ];
	            InitHeaders(headers, info);
	
	            var cols = [  
	                         {Type:"Text",     	Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
							 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"suffix",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                         {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_qty",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	                         {Type:"Combo",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_ut_cd",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	     	                 {Type:"Text",      Hidden:1,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_ut_nm",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",    ColMerge:0,   SaveName:"meas",         KeyField:0,   CalcLogic:"",   Format:"Float",        PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
	     	                 {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Status",    Hidden:1, Width:40,    Align:"Center",  ColMerge:1,  SaveName:"ibflag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 }
	                        
	                         ];
	             
	            InitColumns(cols);
	            SetColProperty("pck_ut_cd", {ComboText:BKGPCKNM, ComboCode:BKGPCKCD} );
	            SetEditable(1);
	            SetSheetHeight(200);
		   }                                                      
		break;
		case 3:      //Container
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
	            cols.push({Type:"Status", Hidden:1,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cntrl_ibflag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
	            cols.push({Type:"Text",   Hidden:1,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cntrL_qtyAll",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 });          
	            InitColumns(cols);
	
	            SetEditable(1);
	            SetSheetHeight(200);
		   }                                                      
		break;
		case 4:      //P/O
		    with (sheetObj) {
			SetConfig( { SearchMode:2, MergeSheet:4, Page:20, DataRowMerge:1, TabStop:0 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('SEE_BMD_0250_HDR5'), Align:"Center"},
		                    { Text:getLabel('SEE_BMD_0250_HDR6'), Align:"Center"} ];
			InitHeaders(headers, info);
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

			var cols = [ 
			             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_ibflag" },
			             {Type:"Text",   	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq" },
			             {Type:"Text",    	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_po_sys_no" },
			             {Type:"Text",    	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_shp_cmdt_seq" },
			             {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_cust_po_no",			KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text", 		Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"item_cmdt_cd",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"item_cmdt_nm",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_ttl_qty",       KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:7 }, 
        	             
        	             {Type:"Text",      Hidden:0, Width:50,  Align:"Center",   ColMerge:0,   SaveName:"rowadd",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:0, Width:50,  Align:"Center",   ColMerge:0,   SaveName:"rowdel",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_ea_cnt",    	KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
        	             {Type:"Combo",     Hidden:0, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"sel_bl",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Int",       Hidden:1, Width:90,   Align:"Right",   ColMerge:0,   SaveName:"item_pck_qty",   	KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_pck_ut_cd",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Text",      Hidden:1, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"item_pck_nm",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Float",     Hidden:1, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"item_pck_inr_qty",	KeyField:0,   CalcLogic:"",   Format:"Integer", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	             {Type:"Float",     Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_wgt",  	 	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Float",     Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_lbs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
        	             {Type:"Float",     Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_meas",  	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
        	             {Type:"Float",     Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"item_cft_meas",  	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
        	             {Type:"Text",   	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_shp_cmdt_seq" },
        	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"sel_cntr",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
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
		case 5:     //submit sheet
			with (sheetObj) {
            	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

            	var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            	var headers = [ { Text:"|Intg Bl Seq.|BL No.", Align:"Center"} ];
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

function fnSetIBsheetInit(sheetNo){
	//if(docObjects[sheetNo].HeaderRows() < 1){
	//console.log(sheetNo  +' / fnSetIBsheetInit  = ' + docObjects[sheetNo].id + '  /  ' + docObjects[sheetNo].ColSaveName(1));
	if(docObjects[sheetNo].ColSaveName(1) == -1){
		comConfigSheet(docObjects[sheetNo], SYSTEM_FIS);
		initSheet(docObjects[sheetNo], (sheetNo+1) );
		comEndConfigSheet(docObjects[sheetNo]);
	}
}

function setSheetHeader_cntr(){
	var formObj=document.frm1;
	 ajaxSendPost(getBlSpitCntrListHdr, 'reqVal', '&goWhere=aj&bcKey=getBlSpitCntrListHdr&f_intg_bl_seq='+formObj.f_intg_bl_seq.value, './GateServlet.gsl')
	 //header
	 cntrListHeader1 = "Cntr No.|"+cntrListHdr1;
	 cntrListHeader2 = "Type/Size|"+cntrListHdr2;
	 cntrListCnt=cntrListHdr2.substring(0, cntrListHdr2.length-1).split("|").length;
	 if (cntrListCnt>51){
		 alert(getLabel('FMS_COM_ALT109'));
		 cntrListCnt=50; 
	 }
}
function setSheet_cntr() {
	if (cntrListHeader1!="|"){
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
