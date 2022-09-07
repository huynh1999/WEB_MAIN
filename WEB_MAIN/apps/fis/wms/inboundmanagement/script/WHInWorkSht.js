/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInList.js
*@FileTitle  : Inbound Search
*@author     : Tien.Duong - DOU Network
*@version    : 1.0
*@since      : 2015/04/13
=========================================================*/
//docObjects
var rtnary=new Array(2);
var callBackFunc = "";
var formObj;
var docObjects=new Array();
var sheetCnt=0;
//comboObjects
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var sts_cd_n = "N";
var loading_flag = "N";
//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
var gJsWmsRuPoint = "N";
var vPointCount = 3;
var vEditLen = 14;
/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

function loadPage() {
	formObj = document.form;
	for(var i=0;i<docObjects.length;i++){
		var sheetObject = docObjects[i];
	    comConfigSheet(sheetObject);
	    initSheet(sheetObject,i+1);
	    comEndConfigSheet(sheetObject);
	}
	
	// Print Size 세션값 세팅
	var paper_size = $("#paper_size").val();	
	if (!ComIsNull(paper_size)) {
		comboObjects[0].Code = paper_size;
	}	
	
	// 디폴트 Search 실행
	if ($("#wib_bk_no").val().trim() != "") {
		doWork('SEARCH');
	}else{
		$("#unload_dt").val(ComGetNowInfo());
		formObj.btnSave.disabled = true;
		formObj.btnDelete.disabled = true;
		formObj.btnPrint.disabled = true;
	}
}

var InputName = "cust_ord_no|supv_nm|unload_dt|unload_hm_fr|unload_hm_to|msg_to_wk|eq_tpsz_cd|eq_no|gate_in_hm|gate_out_hm|driver_nm|driver_lic_no|gate_no|unload_loc|unload_loc_nm|unload_sht_yn|bk_sts_cd|wh_cd";
/**
 * Search 
 */
function btn_Search() {
	formObj.f_cmd.value = SEARCH;
	sheet1.DoSearch("searchWHInWorkShtInfoGS.clt", FormQueryString(formObj,""));
}
function sheet1_OnSearchEnd() {
	formObj.cust_ord_no.value = sheet1.GetCellValue(1,"Grd01cust_ord_no");
	formObj.supv_nm.value = sheet1.GetCellValue(1,"Grd01supv_nm");
	formObj.msg_to_wk.value = sheet1.GetCellValue(1,"Grd01msg_to_wk");
	formObj.driver_nm.value = sheet1.GetCellValue(1,"Grd01driver_nm");
	formObj.driver_lic_no.value = sheet1.GetCellValue(1,"Grd01driver_lic_no");
	formObj.gate_no.value = sheet1.GetCellValue(1,"Grd01gate_no");
	formObj.unload_loc.value = sheet1.GetCellValue(1,"Grd01unload_loc");
	formObj.unload_loc_nm.value = sheet1.GetCellValue(1,"Grd01unload_loc_nm");		
	formObj.eq_tpsz_cd.value = sheet1.GetCellValue(1,"Grd01eq_tpsz_cd");
	formObj.eq_no.value = sheet1.GetCellValue(1,"Grd01eq_no");      
	formObj.wh_cd.value = sheet1.GetCellValue(1,"Grd01wh_cd");
	
	formObj.unload_dt.value    = sheet1.GetCellValue(1,"Grd01unload_dt")   != "" ? parseDate(sheet1.GetCellValue(1,"Grd01unload_dt")) : "";
	formObj.gate_in_hm.value   = sheet1.GetCellValue(1,"Grd01gate_in_hm")  != "" ? parseTime(sheet1.GetCellValue(1,"Grd01gate_in_hm")) : "";	  
	formObj.gate_out_hm.value  = sheet1.GetCellValue(1,"Grd01gate_out_hm") != "" ? parseTime(sheet1.GetCellValue(1,"Grd01gate_out_hm")) : "";
	formObj.unload_hm_fr.value = sheet1.GetCellValue(1,"Grd01unload_hm_fr")!= "" ? parseTime(sheet1.GetCellValue(1,"Grd01unload_hm_fr")) : "";
	formObj.unload_hm_to.value = sheet1.GetCellValue(1,"Grd01unload_hm_to")!= "" ? parseTime(sheet1.GetCellValue(1,"Grd01unload_hm_to")) : "";
	if(sheet1.RowCount() == 1){
		//BOOKING 상태에 따른 Default Check
		if(sheet1.GetCellValue(1,"Grd01bk_sts_cd") == "I"){
			$('#chOption1').attr('checked',true);
		}
		else if(sheet1.GetCellValue(1,"Grd01bk_sts_cd") == "X"){
			$('#chOption2').attr('checked',true);
		}
		
		//work sht존재유무에 따른 delete버튼 활성화 처리
		if(sheet1.GetCellValue(1,"Grd01unload_sht_yn") == "N"){
			//날짜 기본셋팅
			formObj.unload_dt.value = ComGetNowInfo();
			formObj.btnDelete.disabled = true;
		}else{
			formObj.btnDelete.disabled = false;
		}
	}
}

function parseDate(dateInput){
	var temp = dateInput;
	return temp.substring(0,2)+"-"+temp.substring(2,4)+"-"+temp.substring(4,8);
}
function parseTime(dateInput){
	var temp = dateInput;
	return temp.substring(0,2)+":"+temp.substring(2,4);
}

/**
 * Close
 */
function btn_Close(){
	ComClosePopup();
}

/**
 * Print
 */
function btn_Print(){
	var wib_bk_no = ComGetObjValue(formObj.wib_bk_no);	
	if (ComIsEmpty(wib_bk_no)) {
		ComShowCodeMessage("COM0015"); // Booking No does not exist.
		return;
	}		
	if (!formObj.chOption1.checked && !formObj.chOption2.checked && !formObj.chOption3.checked && !formObj.chOption5.checked){
		ComShowCodeMessage("COM0538");
		return;
	}	
	var fileName = "";
	var param= "";
	var mrd_size="";
	formObj.title.value="Inbound Worksheet Report";
	//Inbound Work Sheet
	if(formObj.chOption1.checked) 
	{
		fileName +="^@@^" + 'WH_IN_WORK_SHT.mrd' ;
		param += "^@@^" +"['" + formObj.wib_bk_no.value + "']" ; //파라메타 입력
	}
	//Inbound OS&D Sheet
	if(formObj.chOption2.checked) 
	{
		fileName +="^@@^" + 'WH_IN_OSD_SHT.mrd' ;
		param += "^@@^" +"['" + formObj.wib_bk_no.value + "']" ; //파라메타 입력
	}

	//Warehouse Receipt
	if(formObj.chOption5.checked) 
	{
		fileName += "^@@^" +'WH_IN_WH_REC_SHT.mrd' ;
		param += "^@@^" +"['" + formObj.wib_bk_no.value + "']" ; //파라메타 입력
	}
	
	//Work Sheet
	if(formObj.chOption3.checked) 
	{
		fileName += "^@@^" +'WH_IN_PALLET_LABEL_SHT.mrd' ;
		param += "^@@^" +"['" + formObj.wib_bk_no.value + "']" ; //파라메타 입력
	}
	fileName = fileName.substring(4);
	param = param.substring(4);
	formObj.file_name.value= fileName;
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
}

/**
 * Save
 */
function save_Validation(){
	if(ComGetLenByByte($("#supv_nm").val().trim()) > 100){	
		ComShowCodeMessage("COM0539");
		ComSetFocus(formObj.supv_nm);
		return false;
	}
	if(ComGetLenByByte($("#msg_to_wk").val().trim()) > 1000){	
		ComShowCodeMessage("COM0540");
		ComSetFocus(formObj.msg_to_wk);
		return false;
	}
	if(ComGetLenByByte($("#driver_nm").val().trim()) > 100){	
		ComShowCodeMessage("COM0541");
		ComSetFocus(formObj.driver_nm);
		return false;
	}
	if(ComGetLenByByte($("#driver_lic_no").val().trim()) > 20){	
		ComShowCodeMessage("COM0542");
		ComSetFocus(formObj.driver_lic_no);
		return false;
	}
	if(ComGetLenByByte($("#gate_no").val().trim()) > 20){	
		ComShowCodeMessage("COM0543");
		ComSetFocus(formObj.gate_no);
		return false;
	}
	if (ComShowCodeConfirm("COM0036") == false) {
		return false;
	}
	return true;
}
function btn_Save() {	
	if(!save_Validation()){
		return;
	}
	var unload_sht_yn = $("#unload_sht_yn").val();
	formObj.f_cmd.value = ADD;
	var saveXml = sheet1.GetSearchData("saveWHInWorkShtInfoGS.clt",  FormQueryString(formObj, ""));
	// Save 후 조회
	if (sheet1.GetEtcData("mess") == 'OK') 
	{			
		showCompleteProcess();
		doWork('SEARCH');
		if(unload_sht_yn == "N" || unload_sht_yn == ""){
			//work sht가 존재하지않다가 신규입력된경우
			SaveAfterProcess("Y");
		}
		else{
			//work sht가 존재했었고 update된경우
			SaveAfterProcess("update");
		}
	}
}
function SaveAfterProcess(unload_sht_yn)
{
	if(unload_sht_yn == "update") //업데이트시 화면에 SHT관련 버튼, 이미지 변동 없음.
	{
		return;
	}
	if(!opener)
	{
		opener = parent;
	}
	opener.setWorkShtInfo(unload_sht_yn, $("#wib_bk_no").val());
}

/**
 * Delete
 */
function btn_Delete() {
	if (ComShowCodeConfirm("COM0053") == false) {
		return;
	}
	formObj.f_cmd.value = REMOVE;
	var deleteXml = sheet1.GetSearchData("removeWHInWorkShtInfoGS.clt",FormQueryString(formObj,""));
	// Delete 후 조회
	if (sheet1.GetEtcData("mess") == 'OK') {
		showCompleteProcess();
		doWork('SEARCH');
		SaveAfterProcess("N");
	}
}

function doWork(srcName){
	try {
		switch(srcName) {
		case "SEARCH": 	
			btn_Search();
			break;
		case "SAVE": 	
			btn_Save();
			break;
		case "DELETE":
			btn_Delete();
			break;
		case "PRINT": 
			btn_Print();
			break;
		case "CLOSE":
			btn_Close();
			break;
		case "btn_unload_dt": 	
			var cal = new ComCalendar();
	           cal.select(formObj.unload_dt, 'MM-dd-yyyy');
			break;
		case "btn_unload_loc":
			if(ComIsEmpty(formObj.wh_cd)){
 				ComShowCodeMessage("COM0493");
 				return;
 			}
			var sUrl="WarehouseLocPopup.clt?f_loc_cd="+ComGetObjValue(formObj.wh_cd);
			callBackFunc = "setPutawayLocInfo";
			modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
			break;
      } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}
function locPopup(){
	if(ComIsEmpty(formObj.wh_cd)){
			ComShowCodeMessage("COM0493");
			return;
		}
	var sUrl="WarehouseLocPopup.clt?f_loc_cd="+ComGetObjValue(formObj.wh_cd)+"&f_wh_loc_nm="+ComGetObjValue(formObj.unload_loc_nm);
	callBackFunc = "setPutawayLocInfo";
	modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
}
function setPutawayLocInfo(rtnVal){
	var formObj = document.form;
	var sheetObj=docObjects[0];
     if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		setFieldValue(formObj.unload_loc, rtnValAry[0]);
		setFieldValue(formObj.unload_loc_nm, rtnValAry[1]);
	}        
    
}

var temp = '';
function getInboundLocInfo(div){	
	var formObj=document.form;
	temp = div;
	if($("#unload_loc_nm").val() == "")
	{
		$("#unload_loc").val("");
		return;
	}
	if(ComIsEmpty(formObj.wh_cd)){
		ComShowCodeMessage("COM0493");
		return;
	}
	var sParam="f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm=" + $("#unload_loc_nm").val() + "&f_putaway_flg=Y" + "&f_cmd=" + COMMAND01;
	ajaxSendPost(resultPutawayLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
}
function resultPutawayLocInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
	    	if(rtnArr[0] != ""){
	    		formObj.unload_loc_nm.value=rtnArr[1];
	    		formObj.unload_loc.value=rtnArr[0];
	    	}
	    	else{
	    		formObj.unload_loc_nm.value="";
	    		formObj.unload_loc.value=""; 
	    		formObj.unload_loc_nm.focus();
	    	}
		}
		else{
			formObj.unload_loc_nm.value="";
    		formObj.unload_loc.value=""; 
    		formObj.unload_loc_nm.focus();
		}
	}
	else{
		formObj.unload_loc_nm.value="";
	 	formObj.unload_loc.value=""; 
	 	formObj.unload_loc_nm.focus();
	 }
}

function timeCheck(obj, objStart, objEnd){
	var formObj = document.form;
	var size=obj.value.length;
	if(size==1){
		obj.value="0" + obj.value + ":00";
	}else if(size==2){
		if(hourCheck(obj.value)){
			obj.value=obj.value + ":00";
		}else{
			obj.value='';
		}
	}else if(size==3){
		if(hourCheck(obj.value.substring(0,2))){
			if(obj.value.substring(2,3)>5 || obj.value.substring(2,3)<0){
				obj.value='';
			}else if(obj.value.substring(2,3) == ":"){
				obj.value=obj.value.substring(0,2) + ":" + "00";
			}else{
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,3) + "0";
			}
		}else{
			obj.value='';
		}
	}else if(size==4){
		if(hourCheck(obj.value.substring(0,2))){
			if(minuteCheck(obj.value.substring(2,4))){
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,4);
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}else if(size==5){
		var val = obj.value.split(':');
		if(hourCheck(val[0])){
			if(minuteCheck(val[1])){
				obj.value=val[0] + ":" + val[1];
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}
	if(checkTimeStartEnd(objStart, objEnd) == false){
		ComShowCodeMessage('COM0049');
		objEnd.value='';
		objEnd.focus();
	}
}

function hourCheck(obj){
	if(isNaN(obj)){
		ComShowCodeMessage("COM0047");
		return false;
	}
	if(obj>23 || obj<0){
		//HOUR: 0-23
		ComShowCodeMessage("COM0047");
		return false;
	}else{
		return true;
	}
}

function minuteCheck(obj){
	if(isNaN(obj)){
		ComShowCodeMessage("COM0048");
		return false;
	}
	if(obj>59 || obj<0){
		//alert('0-59');
		ComShowCodeMessage("COM0048");
		return false;
	}else{
		return true;
	}
}

function checkTimeStartEnd(objStart, objEnd){
	var startTime = objStart.value;
	var endTime = objEnd.value;
	if(startTime != '' && endTime != ''){
		if(parseInt(startTime.replace(':', '')) > parseInt(endTime.replace(':', ''))){
			return false;
		}
	}
	return true;
}

/*
 * init sheet
 */ 
function initSheet(sheetObj,sheetNo) {
	var cnt = 0;
	switch(sheetNo) {
	case 1:      //IBSheet1 init
		with(sheetObj){
		      var hdr1="cust_ord_no|supv_nm|unload_dt|unload_hm_fr|unload_hm_to|msg_to_wk|gate_in_hm|gate_out_hm|driver_nm|driver_lic_no|gate_no|unload_loc|unload_loc_nm|eq_tpsz_cd|eq_no|unload_sht_yn|bk_sts_cd|wh_cd";
		      var prefix=fix_grid01;
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		      var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"}];
		      InitHeaders(headers, info);
		      var cols = [
		             {Type:"Text",      Hidden:0, 	Width:120, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"cust_ord_no", 															 Format:""	},
		             {Type:"Text",      Hidden:0,  	Width:80, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"supv_nm",  		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""	},
		             {Type:"Text",      Hidden:0,  	Width:65, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"unload_dt",  		KeyField:0,   UpdateEdit:0,    InsertEdit:1, 		 Format:""	},
		             {Type:"Text",      Hidden:0,  	Width:60, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"unload_hm_fr",   	KeyField:0,   UpdateEdit:0,    InsertEdit:1, 		 Format:""	},
		             {Type:"Text",      Hidden:0,  	Width:65, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"unload_hm_to",   	KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""	},
		             {Type:"Text", 		Hidden:0, 	Width:100, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"msg_to_wk",   		KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""	},
		             {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"gate_in_hm",   	KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""	},
		             {Type:"Text",     	Hidden:0,  	Width:120, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"gate_out_hm",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""	},
		             {Type:"Text",      Hidden:0, 	Width:60, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"driver_nm",        KeyField:0,   UpdateEdit:0,    InsertEdit:1, 		 Format:""	},
		             {Type:"Text",  	Hidden:0, 	Width:30, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"driver_lic_no",   	KeyField:0,   UpdateEdit:0,    InsertEdit:1,  		 Format:""	},
		             {Type:"Text", 		Hidden:0, 	Width:60, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"gate_no",   		KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""	},
		             {Type:"Text",     	Hidden:0, 	Width:100, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"unload_loc",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""	},
		             {Type:"Text",   	Hidden:0, 	Width:50, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"unload_loc_nm",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""	},
		             {Type:"Text",     	Hidden:0,  	Width:30, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"eq_tpsz_cd",   	KeyField:0,   UpdateEdit:1,    InsertEdit:1,		 Format:""	},
		             {Type:"Text",      Hidden:0, 	Width:50, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"eq_no",   			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""	},
		             {Type:"Text",    	Hidden:0,  	Width:60, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"unload_sht_yn",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""  },
		             {Type:"Text",      Hidden:0, 	Width:30, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"bk_sts_cd",   		KeyField:0,	  UpdateEdit:0,    InsertEdit:0, 		 Format:""	},
		             {Type:"Text",  	Hidden:0, 	Width:50, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"wh_cd",   			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""	}];
			      InitColumns(cols);
			      SetSheetHeight(450);
			      resizeSheet();
		      }
		      break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}