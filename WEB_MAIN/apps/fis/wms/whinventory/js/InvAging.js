/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvAging.js
*@FileTitle  : Inventory Aging
*@author     : Long.Le
*@version    : 1.0
*@since      : 2015/04/14
=========================================================--*/
var firCalFlag=false;
var rtnary=new Array(1);
var callBackFunc = "";
var sheetCnt=0;
var comboObjects=new Array();
var docObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
    for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }	
	initControl();
	changeColumn(form, "3", "3");
	var formObj=document.form;
	formObj.period.value = "3";
	setFieldValue(formObj.wh_cd, ComGetObjValue(formObj.def_wh_cd));
	setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no));	
	setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));	
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/**
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
 }
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
//    // OnKeyUp 이벤트
//    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
//    //- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "wib_bk_no":	
				btn_Search();
			break;	
			case "item_cd":	
				btn_Search();
			break;
			case "lot_no":	
				btn_Search();
			break;
			case "cust_ord_no":	
				btn_Search();
			break;
			case "po_no":	
				btn_Search();
			break;
		}
	}
	var backspace=8; 
    var t=document.activeElement;  
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
	return true;
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "btn_fm_bk_date":	
			var cal=new ComCalendar();
            cal.select(formObj.fm_bk_date, 'MM-dd-yyyy');
			break;
		case "btn_to_bk_date":	
			var cal=new ComCalendar();
            cal.select(formObj.to_bk_date, 'MM-dd-yyyy');
			break;
		case "btn_ctrt_no" :	
			var formObj=document.form;
			var sUrl="ContractRoutePopup.clt?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;
//				ComOpenPopup(sUrl, 900, 620, "setCtrtNoInfo", "0,0", true);
		    callBackFunc = "setCtrtNoInfo";
		    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
			break;	
		case "SEARCHLIST":
			btn_Search();
			break;
		case "EXCEL":
			btn_Excel();
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
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){
	        
	      
	      var prefix=fix_grid01;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('InvAging_HDR1'), Align:"Center"},
	                      { Text:getLabel('InvAging_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ 
	 				 {Type:"Seq",       Hidden:0,  Width:40,     Align:"Center",     ColMerge:1,   SaveName:prefix+"seq",         	KeyField:0, CalcLogic:"",  Format:"", 			PointCount:0,	UpdateEdit:0,	InsertEdit:0},
	 	             {Type:"Text",      Hidden:0,  Width:80,     Align:"Center",       ColMerge:1,   SaveName:prefix+"ctrt_no", 	  	KeyField:0, CalcLogic:"",  Format:"", 			PointCount:0,	UpdateEdit:0,	InsertEdit:0},
	 	             {Type:"Text",      Hidden:0,  Width:120,    Align:"Left",       ColMerge:1,   SaveName:prefix+"ctrt_nm",     	KeyField:0, CalcLogic:"",  Format:"", 			PointCount:0,	UpdateEdit:0,	InsertEdit:0},
	 	             {Type:"Text",      Hidden:0,  Width:100,    Align:"Center",       ColMerge:1,   SaveName:prefix+"item_cd",     	KeyField:0, CalcLogic:"",  Format:"", 			PointCount:0,	UpdateEdit:0,	InsertEdit:0},
	 	             {Type:"Text",      Hidden:0,  Width:170,    Align:"Left",       ColMerge:1,   SaveName:prefix+"item_nm",     	KeyField:0, CalcLogic:"",  Format:"", 			PointCount:0,	UpdateEdit:0,	InsertEdit:0},
	 	             {Type:"Date",      Hidden:0,  Width:80,     Align:"Center",     ColMerge:1,   SaveName:prefix+"inbound_dt",  	KeyField:0, CalcLogic:"",  Format:"Ymd", PointCount:0,	UpdateEdit:0,	InsertEdit:0},
	 	             {Type:"Text",      Hidden:0,  Width:110,    Align:"Center",       ColMerge:1,   SaveName:prefix+"lot_no",      	KeyField:0, CalcLogic:"",  Format:"", 			PointCount:0,	UpdateEdit:0,	InsertEdit:0},
	 	             {Type:"Text",      Hidden:0,  Width:130,    Align:"Center",       ColMerge:1,   SaveName:prefix+"lot_id",      	KeyField:0, CalcLogic:"",  Format:"", 			PointCount:0,	UpdateEdit:0,	InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"inv_qty",     	KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp01",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp02",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp03",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp04",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp05",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp06",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp07",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp08",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp09",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp10",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp11",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp12",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Float",     Hidden:0,  Width:70,     Align:"Right",      ColMerge:1,   SaveName:prefix+"grp13",         KeyField:0, CalcLogic:"",  Format:"NullFloat",  PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	 	             {Type:"Text",      Hidden:1,  Width:80,     Align:"Center",     ColMerge:1,   SaveName:prefix+"wh_cd",         KeyField:0, CalcLogic:"",  Format:"", 			PointCount:0,	UpdateEdit:0,	InsertEdit:0},
	 	            {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
	 	       
		      	InitColumns(cols);
		      	SetSheetHeight(450);
		      	SetEditable(0);
		      	SetHeaderRowHeight(30);
		      	SetAutoRowHeight(0);
		      	resizeSheet();
		      	SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
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
function sheet1_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.form;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
function goToPage(callPage){
	document.form.f_CurPage.value=callPage;
	btn_Search();
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.form.f_CurPage.value=1;
	if(sheet1.RowCount() > 0) btn_Search();
}

function searchList(){
	document.form.f_CurPage.value=1;
	if(sheet1.RowCount() > 0) btn_Search();
}
function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	var formObj = document.form;
	doDispPaging(sheetObj.GetCellValue(2, "Indexing"), getObj('pagingTb'));
	if(formObj.period.value == '1'){
	for(var i = sheet1.HeaderRows(); i < sheet1.LastRow()+ 1; i++){
		var vl11 = sheet1.GetCellValue(i, fix_grid01+"grp11");
		var vl10 = sheet1.GetCellValue(i, fix_grid01+"grp10");
		var vl09 = sheet1.GetCellValue(i, fix_grid01+"grp09");
		var vl08 = sheet1.GetCellValue(i, fix_grid01+"grp08");
		var vl07 = sheet1.GetCellValue(i, fix_grid01+"grp07");
		var vl06 = sheet1.GetCellValue(i, fix_grid01+"grp06");
		var vl05 = sheet1.GetCellValue(i, fix_grid01+"grp05");
			if(vl11 > 0){
				sheet1.SetCellValue(i,fix_grid01+"grp13", vl11);
			}else if(vl10 > 0){
				sheet1.SetCellValue(i,fix_grid01+"grp13", vl10);
			}else if(vl09 > 0){
				sheet1.SetCellValue(i,fix_grid01+"grp13", vl09);
			}else if(vl08 > 0){
				sheet1.SetCellValue(i,fix_grid01+"grp13", vl08);
			}else if(vl07 > 0){
				sheet1.SetCellValue(i,fix_grid01+"grp13", vl07);
			}else if(vl06 > 0){
				sheet1.SetCellValue(i,fix_grid01+"grp13", vl06);
			}else if(vl05 > 0){
				sheet1.SetCellValue(i,fix_grid01+"grp13", vl05);
			}
		}
	}else if (formObj.period.value == '2'){
		for(var i = sheet1.HeaderRows(); i < sheet1.LastRow()+ 1; i++){
			var vl11 = sheet1.GetCellValue(i, fix_grid01+"grp11");
			var vl10 = sheet1.GetCellValue(i, fix_grid01+"grp10");
			var vl09 = sheet1.GetCellValue(i, fix_grid01+"grp09");
				if(vl11 > 0){
					sheet1.SetCellValue(i,fix_grid01+"grp13", vl11);
				}else if(vl10 > 0){
					sheet1.SetCellValue(i,fix_grid01+"grp13", vl10);
				}else if(vl09 > 0){
					sheet1.SetCellValue(i,fix_grid01+"grp13", vl09);
				}
			}
	}
	sheet1.SetTotalRows(sheet1.RowCount());
	doHideProcess(false);
}
function sheet1_OnClick(sheetObj, Row, Col) {
//	changeInboundMgmtBtn(sheetObj, Row);
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
}
function setWHICItemList(aryPopupData){
	var wib_in_no=aryPopupData[0][0];
	var sUrl="./WHICUpdate.clt?search_no="+wib_in_no + "&search_tp=WIB_IN_NO";
	parent.mkNewFrame('Inbound Complete Update', sUrl, "WHICUpdate_" + wib_in_no + "&search_tp=WIB_IN_NO");
}
/*
 * NAME 엔터시 팝업호출 - warehouse name
 */

function setCtrtNoInfo(aryPopupData){
	  var formObj=document.form;
	  if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	   return;
	  }else{
		  var rtnValAry=aryPopupData.split("|");
		  formObj.ctrt_no.value=rtnValAry[0];
		  formObj.ctrt_nm.value=rtnValAry[1];
	  }
}

/*
 * 팝업 관련 로직 끝
 */
function btn_Search(){
	 var formObj=document.form;
	 var sheetObj=docObjects[0]; 
	 if (validateForm(formObj, 'search')) { 
		 formObj.f_cmd.value=SEARCH;
		 sheet1.RemoveAll();
		 var sXml = sheet1.GetSearchData("./InvAgingGS.clt", FormQueryString(formObj,""));
		 sheet1.LoadSearchData(sXml, {sync:1})
	 }
}
/*
 * 엑셀다운로드
 */
function btn_Excel() {
	 if(docObjects[0].RowCount() < 1){//no data
	      ComShowCodeMessage("COM132501");
	    }else{
	     var prefix="Grd01"; 
	     //docObjects[0].Down2Excel(-1);
	     docObjects[0].Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
	    }
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			if(formObj.wh_cd.value == ""){
				ComShowCodeMessage("COM12233");
				return;
			}
			if(ComIsEmpty(formObj.ctrt_no)){
				ComShowCodeMessage("COM0114","Contract No");
				$("#ctrt_no").focus();
				return false;
			}
			break;
		}
	}
	return true;
}
/***
 * AJAX CODE SEARCH
 */
/*
 * Warehouse search
 * OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj){
	var formObj=document.form;
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
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

function getLocInfo(obj){
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
}
function resultLocInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.wh_nm.value=rtnArr[0];
	   }
	   else{
	    formObj.wh_cd.value="";
	    formObj.wh_nm.value=""; 
	   }
	  }
	  else{
	   formObj.wh_cd.value="";
	   formObj.wh_nm.value=""; 
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
//Combo Object onChange 이벤트
function period_OnChange(obj){
	var formObj = document.form
	var sheetObj=docObjects[0];
	sheetObj.RemoveAll();
	//document.form.period.value = document.form.period.value;
	changeColumn(form, formObj.period.value, formObj.period.value);
}
function changeColumn(comObj, code, text){
	var sheetObj=docObjects[0];
	formObj=document.form;
	if(formObj.period.value <= 3){
		//comboObjects[1].index=0; 
		formObj.term.value = "7";
//		ComEnableObject(formObj.term, false);
		formObj.term.disabled = true;
	}else if(formObj.period.value <= 6){
		//comboObjects[1].index=1;
		formObj.term.value = "15";
//		ComEnableObject(formObj.term, false);
		formObj.term.disabled = true;
	}else{
		//comboObjects[1].index=2;
		formObj.term.value = "30";
		formObj.term.disabled = true;
//		ComEnableObject(formObj.term, false);
	}
	//컬럼셋팅
	if(code == "1"){
		sheetObj.SetColHidden(fix_grid01+"grp05",1);
		sheetObj.SetColHidden(fix_grid01+"grp06",1);
		sheetObj.SetColHidden(fix_grid01+"grp07",1);
		sheetObj.SetColHidden(fix_grid01+"grp08",1);
		sheetObj.SetColHidden(fix_grid01+"grp09",1);
		sheetObj.SetColHidden(fix_grid01+"grp10",1);
		sheetObj.SetColHidden(fix_grid01+"grp11",1);
		sheetObj.SetColHidden(fix_grid01+"grp12",1);
		sheetObj.SetCellText(0, fix_grid01+"grp01" ,"1~7");
		sheetObj.SetCellText(0, fix_grid01+"grp02" ,"8~14");
		sheetObj.SetCellText(0, fix_grid01+"grp03" ,"15~21");
		sheetObj.SetCellText(0, fix_grid01+"grp04" ,"22~28");
		
		sheetObj.SetCellText(1, fix_grid01+"grp01" ,"1~7");
		sheetObj.SetCellText(1, fix_grid01+"grp02" ,"8~14");
		sheetObj.SetCellText(1, fix_grid01+"grp03" ,"15~21");
		sheetObj.SetCellText(1, fix_grid01+"grp04" ,"22~28");
		
		sheetObj.SetCellText(0, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetCellText(1, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetHeaderRowHeight("30");
	}else if(code == "2"){
		sheetObj.SetColHidden(fix_grid01+"grp05",0);
		sheetObj.SetColHidden(fix_grid01+"grp06",0);
		sheetObj.SetColHidden(fix_grid01+"grp07",0);
		sheetObj.SetColHidden(fix_grid01+"grp08",0);
		sheetObj.SetColHidden(fix_grid01+"grp09",1);
		sheetObj.SetColHidden(fix_grid01+"grp10",1);
		sheetObj.SetColHidden(fix_grid01+"grp11",1);
		sheetObj.SetColHidden(fix_grid01+"grp12",1);
		sheetObj.SetCellText(0, fix_grid01+"grp01" ,"1~7");
		sheetObj.SetCellText(0, fix_grid01+"grp02" ,"8~14");
		sheetObj.SetCellText(0, fix_grid01+"grp03" ,"15~21");
		sheetObj.SetCellText(0, fix_grid01+"grp04" ,"22~28");
		sheetObj.SetCellText(0, fix_grid01+"grp05" ,"29~35");
		sheetObj.SetCellText(0, fix_grid01+"grp06" ,"36~42");
		sheetObj.SetCellText(0, fix_grid01+"grp07" ,"43~49");
		sheetObj.SetCellText(0, fix_grid01+"grp08" ,"50~56");
		
		sheetObj.SetCellText(1, fix_grid01+"grp01" ,"1~7");
		sheetObj.SetCellText(1, fix_grid01+"grp02" ,"8~14");
		sheetObj.SetCellText(1, fix_grid01+"grp03" ,"15~21");
		sheetObj.SetCellText(1, fix_grid01+"grp04" ,"22~28");
		sheetObj.SetCellText(1, fix_grid01+"grp05" ,"29~35");
		sheetObj.SetCellText(1, fix_grid01+"grp06" ,"36~42");
		sheetObj.SetCellText(1, fix_grid01+"grp07" ,"43~49");
		sheetObj.SetCellText(1, fix_grid01+"grp08" ,"50~56");
		
		sheetObj.SetCellText(0, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetCellText(1, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetHeaderRowHeight("30");
	}else if(code == "3"){
		sheetObj.SetColHidden(fix_grid01+"grp05",0);
		sheetObj.SetColHidden(fix_grid01+"grp06",0);
		sheetObj.SetColHidden(fix_grid01+"grp07",0);
		sheetObj.SetColHidden(fix_grid01+"grp08",0);
		sheetObj.SetColHidden(fix_grid01+"grp09",0);
		sheetObj.SetColHidden(fix_grid01+"grp10",0);
		sheetObj.SetColHidden(fix_grid01+"grp11",0);
		sheetObj.SetColHidden(fix_grid01+"grp12",0);
		sheetObj.SetCellText(0, fix_grid01+"grp01" ,"1~7");
		sheetObj.SetCellText(0, fix_grid01+"grp02" ,"8~14");
		sheetObj.SetCellText(0, fix_grid01+"grp03" ,"15~21");
		sheetObj.SetCellText(0, fix_grid01+"grp04" ,"22~28");
		sheetObj.SetCellText(0, fix_grid01+"grp05" ,"29~35");
		sheetObj.SetCellText(0, fix_grid01+"grp06" ,"36~42");
		sheetObj.SetCellText(0, fix_grid01+"grp07" ,"43~49");
		sheetObj.SetCellText(0, fix_grid01+"grp08" ,"50~56");
		sheetObj.SetCellText(0, fix_grid01+"grp09" ,"57~63");
		sheetObj.SetCellText(0, fix_grid01+"grp10" ,"64~70");
		sheetObj.SetCellText(0, fix_grid01+"grp11" ,"71~77");
		sheetObj.SetCellText(0, fix_grid01+"grp12" ,"78~84");
		sheetObj.SetCellText(1, fix_grid01+"grp01" ,"1~7");
		sheetObj.SetCellText(1, fix_grid01+"grp02" ,"8~14");
		sheetObj.SetCellText(1, fix_grid01+"grp03" ,"15~21");
		sheetObj.SetCellText(1, fix_grid01+"grp04" ,"22~28");
		sheetObj.SetCellText(1, fix_grid01+"grp05" ,"29~35");
		sheetObj.SetCellText(1, fix_grid01+"grp06" ,"36~42");
		sheetObj.SetCellText(1, fix_grid01+"grp07" ,"43~49");
		sheetObj.SetCellText(1, fix_grid01+"grp08" ,"50~56");
		sheetObj.SetCellText(1, fix_grid01+"grp09" ,"57~63");
		sheetObj.SetCellText(1, fix_grid01+"grp10" ,"64~70");
		sheetObj.SetCellText(1, fix_grid01+"grp11" ,"71~77");
		sheetObj.SetCellText(1, fix_grid01+"grp12" ,"78~84");
		sheetObj.SetCellText(0, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetCellText(1, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetHeaderRowHeight("30");
	}else if(code == "4"){
		sheetObj.SetColHidden(fix_grid01+"grp03",0);
		sheetObj.SetColHidden(fix_grid01+"grp04",0);
		sheetObj.SetColHidden(fix_grid01+"grp05",0);
		sheetObj.SetColHidden(fix_grid01+"grp06",0);
		sheetObj.SetColHidden(fix_grid01+"grp07",0);
		sheetObj.SetColHidden(fix_grid01+"grp08",0);
		sheetObj.SetColHidden(fix_grid01+"grp09",1);
		sheetObj.SetColHidden(fix_grid01+"grp10",1);
		sheetObj.SetColHidden(fix_grid01+"grp11",1);
		sheetObj.SetColHidden(fix_grid01+"grp12",1);
		sheetObj.SetCellText(0, fix_grid01+"grp01" ,"1~15");
		sheetObj.SetCellText(0, fix_grid01+"grp02" ,"16~30");
		sheetObj.SetCellText(0, fix_grid01+"grp03" ,"31~45");
		sheetObj.SetCellText(0, fix_grid01+"grp04" ,"46~60");
		sheetObj.SetCellText(0, fix_grid01+"grp05" ,"61~75");
		sheetObj.SetCellText(0, fix_grid01+"grp06" ,"76~90");
		sheetObj.SetCellText(0, fix_grid01+"grp07" ,"91~105");
		sheetObj.SetCellText(0, fix_grid01+"grp08" ,"106~120");
		sheetObj.SetCellText(1, fix_grid01+"grp01" ,"1~15");
		sheetObj.SetCellText(1, fix_grid01+"grp02" ,"16~30");
		sheetObj.SetCellText(1, fix_grid01+"grp03" ,"31~45");
		sheetObj.SetCellText(1, fix_grid01+"grp04" ,"46~60");
		sheetObj.SetCellText(1, fix_grid01+"grp05" ,"61~75");
		sheetObj.SetCellText(1, fix_grid01+"grp06" ,"76~90");
		sheetObj.SetCellText(1, fix_grid01+"grp07" ,"91~105");
		sheetObj.SetCellText(1, fix_grid01+"grp08" ,"106~120");
		sheetObj.SetCellText(0, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetCellText(1, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetHeaderRowHeight("30");
	}else if(code == "5"){
		sheetObj.SetColHidden(fix_grid01+"grp03",0);
		sheetObj.SetColHidden(fix_grid01+"grp04",0);
		sheetObj.SetColHidden(fix_grid01+"grp05",0);
		sheetObj.SetColHidden(fix_grid01+"grp06",0);
		sheetObj.SetColHidden(fix_grid01+"grp07",0);
		sheetObj.SetColHidden(fix_grid01+"grp08",0);
		sheetObj.SetColHidden(fix_grid01+"grp09",0);
		sheetObj.SetColHidden(fix_grid01+"grp10",0);
		sheetObj.SetColHidden(fix_grid01+"grp11",1);
		sheetObj.SetColHidden(fix_grid01+"grp12",1);
		sheetObj.SetCellText(0, fix_grid01+"grp01" ,"1~15");
		sheetObj.SetCellText(0, fix_grid01+"grp02" ,"16~30");
		sheetObj.SetCellText(0, fix_grid01+"grp03" ,"31~45");
		sheetObj.SetCellText(0, fix_grid01+"grp04" ,"46~60");
		sheetObj.SetCellText(0, fix_grid01+"grp05" ,"61~75");
		sheetObj.SetCellText(0, fix_grid01+"grp06" ,"76~90");
		sheetObj.SetCellText(0, fix_grid01+"grp07" ,"91~105");
		sheetObj.SetCellText(0, fix_grid01+"grp08" ,"106~120");
		sheetObj.SetCellText(0, fix_grid01+"grp09" ,"121~135");
		sheetObj.SetCellText(0, fix_grid01+"grp10" ,"136~150");
		sheetObj.SetCellText(1, fix_grid01+"grp01" ,"1~15");
		sheetObj.SetCellText(1, fix_grid01+"grp02" ,"16~30");
		sheetObj.SetCellText(1, fix_grid01+"grp03" ,"31~45");
		sheetObj.SetCellText(1, fix_grid01+"grp04" ,"46~60");
		sheetObj.SetCellText(1, fix_grid01+"grp05" ,"61~75");
		sheetObj.SetCellText(1, fix_grid01+"grp06" ,"76~90");
		sheetObj.SetCellText(1, fix_grid01+"grp07" ,"91~105");
		sheetObj.SetCellText(1, fix_grid01+"grp08" ,"106~120");
		sheetObj.SetCellText(1, fix_grid01+"grp09" ,"121~135");
		sheetObj.SetCellText(1, fix_grid01+"grp10" ,"136~150");
		sheetObj.SetCellText(0, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetCellText(1, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetHeaderRowHeight("30");
	}else if(code == "6"){
		sheetObj.SetColHidden(fix_grid01+"grp03",0);
		sheetObj.SetColHidden(fix_grid01+"grp04",0);
		sheetObj.SetColHidden(fix_grid01+"grp05",0);
		sheetObj.SetColHidden(fix_grid01+"grp06",0);
		sheetObj.SetColHidden(fix_grid01+"grp07",0);
		sheetObj.SetColHidden(fix_grid01+"grp08",0);
		sheetObj.SetColHidden(fix_grid01+"grp09",0);
		sheetObj.SetColHidden(fix_grid01+"grp10",0);
		sheetObj.SetColHidden(fix_grid01+"grp11",0);
		sheetObj.SetColHidden(fix_grid01+"grp12",0);
		sheetObj.SetCellText(0, fix_grid01+"grp01" ,"1~15");
		sheetObj.SetCellText(0, fix_grid01+"grp02" ,"16~30");
		sheetObj.SetCellText(0, fix_grid01+"grp03" ,"31~45");
		sheetObj.SetCellText(0, fix_grid01+"grp04" ,"46~60");
		sheetObj.SetCellText(0, fix_grid01+"grp05" ,"61~75");
		sheetObj.SetCellText(0, fix_grid01+"grp06" ,"76~90");
		sheetObj.SetCellText(0, fix_grid01+"grp07" ,"91~105");
		sheetObj.SetCellText(0, fix_grid01+"grp08" ,"106~120");
		sheetObj.SetCellText(0, fix_grid01+"grp09" ,"121~135");
		sheetObj.SetCellText(0, fix_grid01+"grp10" ,"136~150");
		sheetObj.SetCellText(0, fix_grid01+"grp11" ,"151~165");
		sheetObj.SetCellText(0, fix_grid01+"grp12" ,"166~180");
		sheetObj.SetCellText(1, fix_grid01+"grp01" ,"1~15");
		sheetObj.SetCellText(1, fix_grid01+"grp02" ,"16~30");
		sheetObj.SetCellText(1, fix_grid01+"grp03" ,"31~45");
		sheetObj.SetCellText(1, fix_grid01+"grp04" ,"46~60");
		sheetObj.SetCellText(1, fix_grid01+"grp05" ,"61~75");
		sheetObj.SetCellText(1, fix_grid01+"grp06" ,"76~90");
		sheetObj.SetCellText(1, fix_grid01+"grp07" ,"91~105");
		sheetObj.SetCellText(1, fix_grid01+"grp08" ,"106~120");
		sheetObj.SetCellText(1, fix_grid01+"grp09" ,"121~135");
		sheetObj.SetCellText(1, fix_grid01+"grp10" ,"136~150");
		sheetObj.SetCellText(1, fix_grid01+"grp11" ,"151~165");
		sheetObj.SetCellText(1, fix_grid01+"grp12" ,"166~180");
		sheetObj.SetCellText(0, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetCellText(1, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetHeaderRowHeight("30");
	}else if(code == "7"){
		sheetObj.SetColHidden(fix_grid01+"grp03",0);
		sheetObj.SetColHidden(fix_grid01+"grp04",0);
		sheetObj.SetColHidden(fix_grid01+"grp05",0);
		sheetObj.SetColHidden(fix_grid01+"grp06",0);
		sheetObj.SetColHidden(fix_grid01+"grp07",0);
		sheetObj.SetColHidden(fix_grid01+"grp08",1);
		sheetObj.SetColHidden(fix_grid01+"grp09",1);
		sheetObj.SetColHidden(fix_grid01+"grp10",1);
		sheetObj.SetColHidden(fix_grid01+"grp11",1);
		sheetObj.SetColHidden(fix_grid01+"grp12",1);
		sheetObj.SetCellText(0, fix_grid01+"grp01" ,"1~30");
		sheetObj.SetCellText(0, fix_grid01+"grp02" ,"31~60");
		sheetObj.SetCellText(0, fix_grid01+"grp03" ,"61~90");
		sheetObj.SetCellText(0, fix_grid01+"grp04" ,"91~120");
		sheetObj.SetCellText(0, fix_grid01+"grp05" ,"121~150");
		sheetObj.SetCellText(0, fix_grid01+"grp06" ,"151~180");
		sheetObj.SetCellText(0, fix_grid01+"grp07" ,"181~210");
		sheetObj.SetCellText(1, fix_grid01+"grp01" ,"1~30");
		sheetObj.SetCellText(1, fix_grid01+"grp02" ,"31~60");
		sheetObj.SetCellText(1, fix_grid01+"grp03" ,"61~90");
		sheetObj.SetCellText(1, fix_grid01+"grp04" ,"91~120");
		sheetObj.SetCellText(1, fix_grid01+"grp05" ,"121~150");
		sheetObj.SetCellText(1, fix_grid01+"grp06" ,"151~180");
		sheetObj.SetCellText(1, fix_grid01+"grp07" ,"181~210");
		sheetObj.SetCellText(0, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetCellText(1, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetHeaderRowHeight("30");
	}else if(code == "8"){
		sheetObj.SetColHidden(fix_grid01+"grp03",0);
		sheetObj.SetColHidden(fix_grid01+"grp04",0);
		sheetObj.SetColHidden(fix_grid01+"grp05",0);
		sheetObj.SetColHidden(fix_grid01+"grp06",0);
		sheetObj.SetColHidden(fix_grid01+"grp07",0);
		sheetObj.SetColHidden(fix_grid01+"grp08",0);
		sheetObj.SetColHidden(fix_grid01+"grp09",1);
		sheetObj.SetColHidden(fix_grid01+"grp10",1);
		sheetObj.SetColHidden(fix_grid01+"grp11",1);
		sheetObj.SetColHidden(fix_grid01+"grp12",1);
		sheetObj.SetCellText(0, fix_grid01+"grp01" ,"1~30");
		sheetObj.SetCellText(0, fix_grid01+"grp02" ,"31~60");
		sheetObj.SetCellText(0, fix_grid01+"grp03" ,"61~90");
		sheetObj.SetCellText(0, fix_grid01+"grp04" ,"91~120");
		sheetObj.SetCellText(0, fix_grid01+"grp05" ,"121~150");
		sheetObj.SetCellText(0, fix_grid01+"grp06" ,"151~180");
		sheetObj.SetCellText(0, fix_grid01+"grp07" ,"181~210");
		sheetObj.SetCellText(0, fix_grid01+"grp08" ,"211~240");
		sheetObj.SetCellText(1, fix_grid01+"grp01" ,"1~30");
		sheetObj.SetCellText(1, fix_grid01+"grp02" ,"31~60");
		sheetObj.SetCellText(1, fix_grid01+"grp03" ,"61~90");
		sheetObj.SetCellText(1, fix_grid01+"grp04" ,"91~120");
		sheetObj.SetCellText(1, fix_grid01+"grp05" ,"121~150");
		sheetObj.SetCellText(1, fix_grid01+"grp06" ,"151~180");
		sheetObj.SetCellText(1, fix_grid01+"grp07" ,"181~210");
		sheetObj.SetCellText(1, fix_grid01+"grp08" ,"211~240");
		sheetObj.SetCellText(0, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetCellText(1, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetHeaderRowHeight("30");
	}else if(code == "9"){
		sheetObj.SetColHidden(fix_grid01+"grp03",0);
		sheetObj.SetColHidden(fix_grid01+"grp04",0);
		sheetObj.SetColHidden(fix_grid01+"grp05",0);
		sheetObj.SetColHidden(fix_grid01+"grp06",0);
		sheetObj.SetColHidden(fix_grid01+"grp07",0);
		sheetObj.SetColHidden(fix_grid01+"grp08",0);
		sheetObj.SetColHidden(fix_grid01+"grp09",0);
		sheetObj.SetColHidden(fix_grid01+"grp10",1);
		sheetObj.SetColHidden(fix_grid01+"grp11",1);
		sheetObj.SetColHidden(fix_grid01+"grp12",1);
		sheetObj.SetCellText(0, fix_grid01+"grp01" ,"1~30");
		sheetObj.SetCellText(0, fix_grid01+"grp02" ,"31~60");
		sheetObj.SetCellText(0, fix_grid01+"grp03" ,"61~90");
		sheetObj.SetCellText(0, fix_grid01+"grp04" ,"91~120");
		sheetObj.SetCellText(0, fix_grid01+"grp05" ,"121~150");
		sheetObj.SetCellText(0, fix_grid01+"grp06" ,"151~180");
		sheetObj.SetCellText(0, fix_grid01+"grp07" ,"181~210");
		sheetObj.SetCellText(0, fix_grid01+"grp08" ,"211~240");
		sheetObj.SetCellText(0, fix_grid01+"grp09" ,"241~270");
		sheetObj.SetCellText(1, fix_grid01+"grp01" ,"1~30");
		sheetObj.SetCellText(1, fix_grid01+"grp02" ,"31~60");
		sheetObj.SetCellText(1, fix_grid01+"grp03" ,"61~90");
		sheetObj.SetCellText(1, fix_grid01+"grp04" ,"91~120");
		sheetObj.SetCellText(1, fix_grid01+"grp05" ,"121~150");
		sheetObj.SetCellText(1, fix_grid01+"grp06" ,"151~180");
		sheetObj.SetCellText(1, fix_grid01+"grp07" ,"181~210");
		sheetObj.SetCellText(1, fix_grid01+"grp08" ,"211~240");
		sheetObj.SetCellText(1, fix_grid01+"grp09" ,"241~270");
		sheetObj.SetCellText(0, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetCellText(1, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetHeaderRowHeight("30");
	}else if(code == "10"){
		sheetObj.SetColHidden(fix_grid01+"grp03",0);
		sheetObj.SetColHidden(fix_grid01+"grp04",0);
		sheetObj.SetColHidden(fix_grid01+"grp05",0);
		sheetObj.SetColHidden(fix_grid01+"grp06",0);
		sheetObj.SetColHidden(fix_grid01+"grp07",0);
		sheetObj.SetColHidden(fix_grid01+"grp08",0);
		sheetObj.SetColHidden(fix_grid01+"grp09",0);
		sheetObj.SetColHidden(fix_grid01+"grp10",0);
		sheetObj.SetColHidden(fix_grid01+"grp11",1);
		sheetObj.SetColHidden(fix_grid01+"grp12",1);
		sheetObj.SetCellText(0, fix_grid01+"grp01" ,"1~30");
		sheetObj.SetCellText(0, fix_grid01+"grp02" ,"31~60");
		sheetObj.SetCellText(0, fix_grid01+"grp03" ,"61~90");
		sheetObj.SetCellText(0, fix_grid01+"grp04" ,"91~120");
		sheetObj.SetCellText(0, fix_grid01+"grp05" ,"121~150");
		sheetObj.SetCellText(0, fix_grid01+"grp06" ,"151~180");
		sheetObj.SetCellText(0, fix_grid01+"grp07" ,"181~210");
		sheetObj.SetCellText(0, fix_grid01+"grp08" ,"211~240");
		sheetObj.SetCellText(0, fix_grid01+"grp09" ,"241~270");
		sheetObj.SetCellText(0, fix_grid01+"grp10" ,"271~300");
		sheetObj.SetCellText(1, fix_grid01+"grp01" ,"1~30");
		sheetObj.SetCellText(1, fix_grid01+"grp02" ,"31~60");
		sheetObj.SetCellText(1, fix_grid01+"grp03" ,"61~90");
		sheetObj.SetCellText(1, fix_grid01+"grp04" ,"91~120");
		sheetObj.SetCellText(1, fix_grid01+"grp05" ,"121~150");
		sheetObj.SetCellText(1, fix_grid01+"grp06" ,"151~180");
		sheetObj.SetCellText(1, fix_grid01+"grp07" ,"181~210");
		sheetObj.SetCellText(1, fix_grid01+"grp08" ,"211~240");
		sheetObj.SetCellText(1, fix_grid01+"grp09" ,"241~270");
		sheetObj.SetCellText(1, fix_grid01+"grp10" ,"271~300");
		sheetObj.SetCellText(0, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetCellText(1, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetHeaderRowHeight("30");
	}else if(code == "11"){
		sheetObj.SetColHidden(fix_grid01+"grp03",0);
		sheetObj.SetColHidden(fix_grid01+"grp04",0);
		sheetObj.SetColHidden(fix_grid01+"grp05",0);
		sheetObj.SetColHidden(fix_grid01+"grp06",0);
		sheetObj.SetColHidden(fix_grid01+"grp07",0);
		sheetObj.SetColHidden(fix_grid01+"grp08",0);
		sheetObj.SetColHidden(fix_grid01+"grp09",0);
		sheetObj.SetColHidden(fix_grid01+"grp10",0);
		sheetObj.SetColHidden(fix_grid01+"grp11",0);
		sheetObj.SetColHidden(fix_grid01+"grp12",1);
		sheetObj.SetCellText(0, fix_grid01+"grp01" ,"1~30");
		sheetObj.SetCellText(0, fix_grid01+"grp02" ,"31~60");
		sheetObj.SetCellText(0, fix_grid01+"grp03" ,"61~90");
		sheetObj.SetCellText(0, fix_grid01+"grp04" ,"91~120");
		sheetObj.SetCellText(0, fix_grid01+"grp05" ,"121~150");
		sheetObj.SetCellText(0, fix_grid01+"grp06" ,"151~180");
		sheetObj.SetCellText(0, fix_grid01+"grp07" ,"181~210");
		sheetObj.SetCellText(0, fix_grid01+"grp08" ,"211~240");
		sheetObj.SetCellText(0, fix_grid01+"grp09" ,"241~270");
		sheetObj.SetCellText(0, fix_grid01+"grp10" ,"271~300");
		sheetObj.SetCellText(0, fix_grid01+"grp11" ,"301~330");
		sheetObj.SetCellText(1, fix_grid01+"grp01" ,"1~30");
		sheetObj.SetCellText(1, fix_grid01+"grp02" ,"31~60");
		sheetObj.SetCellText(1, fix_grid01+"grp03" ,"61~90");
		sheetObj.SetCellText(1, fix_grid01+"grp04" ,"91~120");
		sheetObj.SetCellText(1, fix_grid01+"grp05" ,"121~150");
		sheetObj.SetCellText(1, fix_grid01+"grp06" ,"151~180");
		sheetObj.SetCellText(1, fix_grid01+"grp07" ,"181~210");
		sheetObj.SetCellText(1, fix_grid01+"grp08" ,"211~240");
		sheetObj.SetCellText(1, fix_grid01+"grp09" ,"241~270");
		sheetObj.SetCellText(1, fix_grid01+"grp10" ,"271~300");
		sheetObj.SetCellText(1, fix_grid01+"grp11" ,"301~330");
		sheetObj.SetCellText(0, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetCellText(1, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetHeaderRowHeight("30");
	}else if(code == "12"){
		sheetObj.SetColHidden(fix_grid01+"grp03",0);
		sheetObj.SetColHidden(fix_grid01+"grp04",0);
		sheetObj.SetColHidden(fix_grid01+"grp05",0);
		sheetObj.SetColHidden(fix_grid01+"grp06",0);
		sheetObj.SetColHidden(fix_grid01+"grp07",0);
		sheetObj.SetColHidden(fix_grid01+"grp08",0);
		sheetObj.SetColHidden(fix_grid01+"grp09",0);
		sheetObj.SetColHidden(fix_grid01+"grp10",0);
		sheetObj.SetColHidden(fix_grid01+"grp11",0);
		sheetObj.SetColHidden(fix_grid01+"grp12",0);
		sheetObj.SetCellText(0, fix_grid01+"grp01" ,"1~30");
		sheetObj.SetCellText(0, fix_grid01+"grp02" ,"31~60");
		sheetObj.SetCellText(0, fix_grid01+"grp03" ,"61~90");
		sheetObj.SetCellText(0, fix_grid01+"grp04" ,"91~120");
		sheetObj.SetCellText(0, fix_grid01+"grp05" ,"121~150");
		sheetObj.SetCellText(0, fix_grid01+"grp06" ,"151~180");
		sheetObj.SetCellText(0, fix_grid01+"grp07" ,"181~210");
		sheetObj.SetCellText(0, fix_grid01+"grp08" ,"211~240");
		sheetObj.SetCellText(0, fix_grid01+"grp09" ,"241~270");
		sheetObj.SetCellText(0, fix_grid01+"grp10" ,"271~300");
		sheetObj.SetCellText(0, fix_grid01+"grp11" ,"301~330");
		sheetObj.SetCellText(0, fix_grid01+"grp12" ,"331~360");
		sheetObj.SetCellText(1, fix_grid01+"grp01" ,"1~30");
		sheetObj.SetCellText(1, fix_grid01+"grp02" ,"31~60");
		sheetObj.SetCellText(1, fix_grid01+"grp03" ,"61~90");
		sheetObj.SetCellText(1, fix_grid01+"grp04" ,"91~120");
		sheetObj.SetCellText(1, fix_grid01+"grp05" ,"121~150");
		sheetObj.SetCellText(1, fix_grid01+"grp06" ,"151~180");
		sheetObj.SetCellText(1, fix_grid01+"grp07" ,"181~210");
		sheetObj.SetCellText(1, fix_grid01+"grp08" ,"211~240");
		sheetObj.SetCellText(1, fix_grid01+"grp09" ,"241~270");
		sheetObj.SetCellText(1, fix_grid01+"grp10" ,"271~300");
		sheetObj.SetCellText(1, fix_grid01+"grp11" ,"301~330");
		sheetObj.SetCellText(1, fix_grid01+"grp12" ,"331~360");
		sheetObj.SetCellText(0, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetCellText(1, fix_grid01+"grp13" ,"More Than\n("+code+" Month)");
		sheetObj.SetHeaderRowHeight("30");
	}
	doDispPaging(sheetObj.GetCellValue(2, "Indexing"), getObj('pagingTb'));
}
