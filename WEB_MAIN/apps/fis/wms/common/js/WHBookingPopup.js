//<%--=========================================================
//*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
//*@FileName   : WHBookingPopup.js
//*@FileTitle  : Booking No Selection
//*@author     : Bao.Huynh - DOU Network
//*@version    : 1.0
//*@since      : 2015/04/21
//=========================================================--%>
var sheetCnt=0;
var docObjects=new Array();
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var firCalFlag=false;
/*
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/*
 * Combo Object를 배열로 등록
 */    
 /*function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
 }*/
/*
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }
   // initControl();
    $("#fm_bk_date").val(ComGetDateAdd(null, "d", -31, "-"));
	$("#to_bk_date").val(ComGetNowInfo());
	setFieldValue(formObj.wh_cd, ComGetObjValue(formObj.def_wh_cd));
	//Tan.Pham comment
	if($("#cond_search_yn").val() == "N")
	{
		var formObj=document.form;
		ComEnableObject(formObj.wh_cd, false);
		ComEnableObject(formObj.ctrt_no, false);
		ComEnableObject(formObj.ctrt_nm, false);
		ComBtnDisable("btn_ctrt_no");
	}
	//Khoa.Nguyen open
	btn_Search();
}
/*
 * initControl()
 */ 
function initControl() {
	var formObject=document.form;
    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/*
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){
	       
	      //var headCount=ComCountHeadTitle(hdr1);
	      var prefix=fix_grid01;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WHBookingPopup_HDR1'), Align:"Center"}];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",   Hidden:0,  Width:80,		Align:"Center",     ColMerge:1, SaveName:prefix+"bk_cls_nm", 	KeyField:0, Format:""},
	  	             {Type:"Text",     Hidden:0,  Width:80,		Align:"Center",     ColMerge:1, SaveName:prefix+"ctrt_no", 		KeyField:0, Format:""},
	  	             {Type:"Text",     Hidden:0,  Width:150,    Align:"Left",      ColMerge:1, SaveName:prefix+"ctrt_nm", 		KeyField:0, Format:""},
	  	             {Type:"Date",     Hidden:0,  Width:90,		Align:"Center",     ColMerge:1, SaveName:prefix+"bk_date", 		KeyField:0, Format:"Ymd"},
	  	             {Type:"Date",     Hidden:0,  Width:90,		Align:"Center",     ColMerge:1, SaveName:prefix+"comp_date", 	KeyField:0, Format:"Ymd"},
	  	             {Type:"Text",     Hidden:0,  Width:110,	Align:"Center",    	ColMerge:1, SaveName:prefix+"bk_no", 		KeyField:0, Format:""},
	  	             {Type:"Text",     Hidden:0,  Width:110,	Align:"Left",     	ColMerge:1, SaveName:prefix+"cust_ord_no", 	KeyField:0, Format:""},
	  	             {Type:"Text",     Hidden:1,  Width:0,		Align:"Center", 				SaveName:prefix+"cust_cd", 		KeyField:0, Format:""},
	  	             {Type:"Text",     Hidden:1,  Width:0,		Align:"Center", 				SaveName:prefix+"cust_nm", 		KeyField:0, Format:""},
	  	             {Type:"Text",     Hidden:1,  Width:0,		Align:"Center", 				SaveName:prefix+"bk_cls_cd", 	KeyField:0, Format:""},
	  	             {Type:"Text",     Hidden:1,  Width:0,		Align:"Center", 				SaveName:prefix+"ord_tp_cd", 	KeyField:0, Format:""},
	  	             {Type:"Text",     Hidden:1,  Width:0,		Align:"Center", 				SaveName:prefix+"load_tp_cd", 	KeyField:0, Format:""},
	  	             {Type:"Text",     Hidden:1,  Width:0,		Align:"Center", 				SaveName:prefix+"order_rel", 	KeyField:0, Format:""},
	  	             {Type:"Text",     Hidden:1,  Width:0,		Align:"Center", 				SaveName:prefix+"wh_cd", 		KeyField:0, Format:""},
	  	             {Type:"Text",     Hidden:1,  Width:0,		Align:"Center", 				SaveName:prefix+"wh_nm", 		KeyField:0, Format:""},
	  	             {Type:"Text",     Hidden:1,  Width:0,		Align:"Center", 				SaveName:prefix+"sts_cd", 		KeyField:0, Format:""}];
	       
	      InitColumns(cols);
	      SetSheetHeight(350);
	      SetEditable(0);
	      resizeSheet();
	            }
	      break;
	}
}
function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
 function initCombo(comboObj, comboNo) {
	var vTextSplit=null;
	var vCodeSplit=null;
	switch(comboObj.options.id) {
		case "search_dt":
			var txt="Booking Date|Complete Date";
			var val="B|C";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("B");
        	} 			
			break;
		case "search_tp":
			var txt="ALL|Inbound|Outbound";
			var val="ALL|IN|OUT";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("ALL");
        	} 			
			break;
	}
} 
/*
 * search End event
 */
function sheet1_OnSearchEnd() {	
	doHideProcess(false);
	var sheetObj = sheet1;
    var hdrR = sheetObj.HeaderRows();
    var rowCnt = sheetObj.RowCount();
	// Closing Status가 Confirmed Or Invoiced인 경우
    for (var i = hdrR; i < rowCnt + hdrR; i++) {
		if (sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "CON" 
			|| sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "INV") {
			
			sheetObj.SetCellFontColor(i, fix_grid01 + "bk_cls_nm","#FF0000");
			sheetObj.SetCellFontColor(i, fix_grid01 + "ctrt_no","#FF0000");
			sheetObj.SetCellFontColor(i, fix_grid01 + "ctrt_nm","#FF0000");
			sheetObj.SetCellFontColor(i, fix_grid01 + "bk_date","#FF0000");
			sheetObj.SetCellFontColor(i, fix_grid01 + "comp_date","#FF0000");
			sheetObj.SetCellFontColor(i, fix_grid01 + "bk_no","#FF0000");
			sheetObj.SetCellFontColor(i, fix_grid01 + "cust_ord_no","#FF0000");
		}
    }
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	// Closing 상태가 Confirmed or Invoiced인 경우 
	if (sheetObj.GetCellValue(Row, fix_grid01 + "sts_cd") != "CON" 
		&& sheetObj.GetCellValue(Row, fix_grid01 + "sts_cd") != "INV") {
		btn_OK();
	}
}
/*
 * 버튼 Search
 */
function btn_Search(){
	var formObj=document.form;
	if(ComIsEmpty(formObj.wh_cd))
	{
		ComShowCodeMessage("COM0114","Warehouse");
		$("#wh_cd").focus();
		return;
	}
	var search_dt_value = formObj.search_dt.value;
	var search_dt_text;
	if(search_dt_value == "B") search_dt_text = "Booking Date";
	else search_dt_text = "Complete Date";
	
	if (ComIsEmpty(formObj.fm_bk_date) && ComIsEmpty(formObj.to_bk_date)) {
		ComShowCodeMessage("COM0114",search_dt_text);
		$("#fm_bk_date").focus();
		return false;
	}
	if(!ComIsEmpty(formObj.fm_bk_date) && ComIsEmpty(formObj.to_bk_date)){
		formObj.to_bk_date.value=ComGetNowInfo();
	}
	if (!ComIsEmpty(formObj.fm_bk_date) && !isDate(formObj.fm_bk_date)) {
		ComShowCodeMessage("COM0114", formObj.search_dt.options[formObj.search_dt.selectedIndex].text);
		formObj.fm_bk_date.focus();
		return;
	}
	if (!ComIsEmpty(formObj.to_bk_date) && !isDate(formObj.to_bk_date)) {
		ComShowCodeMessage("COM0114",formObj.search_dt.options[formObj.search_dt.selectedIndex].text);
		formObj.to_bk_date.focus();
		return;
	}
	if ((!ComIsEmpty(formObj.fm_bk_date)&&ComIsEmpty(formObj.to_bk_date))||(ComIsEmpty(formObj.fm_bk_date)&&!ComIsEmpty(formObj.to_bk_date))) {
		ComShowCodeMessage("COM0122",formObj.search_dt.options[formObj.search_dt.selectedIndex].text);
		formObj.fm_bk_date.focus();
		return;
	}
	if (getDaysBetween2(formObj.fm_bk_date.value, formObj.to_bk_date.value)<0) {
		ComShowCodeMessage("COM0122",formObj.search_dt.options[formObj.search_dt.selectedIndex].text);
		formObj.fm_bk_date.focus();
		return;
	}
	var formObj=document.form;
	formObj.f_cmd.value=SEARCH;
	var sXml = sheet1.DoSearch("WHBookingPopupGS.clt", FormQueryString(formObj, null, ""));
}
/*
 * close 버튼 클릭
 */
function btn_Close(){
  ComClosePopup(); 
}
/*
 * ok 버튼 클릭
 */
function btn_OK(){
	var prefix=fix_grid01;
	// Closing 상태가 Confirmed or Invoiced인 경우
	if (sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "sts_cd") == "CON" 
		|| sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "sts_cd") == "INV") {
		return;
	}
	
	if(sheet1.RowCount() < 1 || sheet1.GetSelectRow() == -1){
		ComShowMessage("No data to select!");
		return;
	}else{
		var retArray=new Array();
		//0-9
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"bk_cls_nm");               
		retArray += "|";                                                                                   
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"ctrt_no");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"ctrt_nm");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"bk_date");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"comp_date");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"bk_no");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"cust_ord_no");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"bk_cls_cd");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"ord_tp_cd");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"load_tp_cd");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"order_rel");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"wh_cd");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"wh_nm");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"cust_cd");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"cust_nm");               
		retArray += "|";
		ComClosePopup(retArray); 
	}
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_to_bk_date":	
				if (document.getElementById('btn_to_bk_date').disabled) {
					return;
				}
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
				cal.select(formObj.fm_bk_date, formObj.to_bk_date, 'MM-dd-yyyy');
				break;
			case "btn_ctrt_no" :
				if (document.getElementById('btn_ctrt_no').disabled) {
					return;
				}
				var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value+"&ctrt_no="+formObj.ctrt_no.value;
				callBackFunc = "setCtrtNoInfo";
				modal_center_open(sUrl, callBackFunc, 900,580,"yes");s
			break;
			case "SEARCHLIST":
				sheet1.RemoveAll();
 				btn_Search();
 				break;
			case "btn_OK":
				btn_OK();
 				break;
			case "CLOSE":
				btn_Close();
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
/*
 * key down event
 */
function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
    var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
		}
	}
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
}


function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13 && sheetObj.GetSelectRow() != -1){
		sheet1_OnDblClick(sheetObj, row, col);
	}else{
		return;
	}
}
/*
***
* AJAX CODE SEARCH
*/
/*
* Warehouse search
* OnKeyDown 13 or onChange
*/
/*
* Contract search
* OnKeyDown 13 or onChange
*/
function getCtrtInfo(obj){
	var formObj=document.form;
	if(obj.value != ""){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
	} else{
		formObj.ctrt_no.value="";
		formObj.ctrt_nm.value="";
	}
}
function resultCtrtInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.ctrt_nm.value=rtnArr[0];
	   }
	   else{
	    formObj.ctrt_no.value="";
	    formObj.ctrt_nm.value=""; 
	   }
	  }
	  else{
	   formObj.ctrt_no.value="";
	   formObj.ctrt_nm.value=""; 
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
/*
 * NAME 엔터시 팝업호출 - contract name
 */
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	}else{
	   var rtnValAry=rtnVal.split("|");
	   formObj.ctrt_no.value=rtnValAry[0];//full_nm
	   formObj.ctrt_nm.value=rtnValAry[1];//full_nm
	} 
}
