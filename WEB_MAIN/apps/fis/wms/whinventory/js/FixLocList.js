/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : FixLocList.js
*@FileTitle  : FixLocList
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================*/
var firCalFlag=false;
var rtnary=new Array(1);
var callBackFunc = "";
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var loading_flag="N";
function loadPage() {
	var formObj=document.form;	
//	doShowProcess();
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
    doHideProcess();
    loading_flag="Y";
	initControl();
	var formObj=document.form;
	setFieldValue(formObj.wh_cd, ComGetObjValue(formObj.def_wh_cd));
	setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no));	
	setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));	
	searchZoneCodeList();
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
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
/*function initCombo(comboObj, comboNo) {
		var vTextSplit=null;
		var vCodeSplit=null;
		switch(comboObj.options.id) {
		case "zone_cd":
			var txt="ALL";
			var val="ALL";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
        	} 			
			break;
		case "block_cd":
			var txt="ALL";
			var val="ALL";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
        	} 			
			break;
		}	
}*/
function searchZoneCodeList(code){
	var formObj=document.form;
	if (!ComIsEmpty(form.wh_cd)) {
		var sXml=docObjects[0].GetSearchData("./searchZoneCodeGS.clt?f_cmd="+SEARCH01+"&f_loc_cd="+formObj.wh_cd.value);
		removeOptions(formObj.zone_cd);
		var item = document.createElement("option");
        document.getElementById("zone_cd").options.add(item);
		if(getTotalRow(sXml)){
			var xmlDoc = $.parseXML(sXml);
			var $xml = $(xmlDoc);
			var code= $xml.find("zone_cd").text();
			var codeList=code.split("|");
			item.text = "ALL";
	        item.value = "ALL";
			for(var i=0;i<codeList.length;i++){
			var item = document.createElement("option");
	        // Add an Option object to Drop Down/List Box
	        document.getElementById("zone_cd").options.add(item);
	        // Assign text and value to Option object
	        item.text = codeList[i];
	        item.value = codeList[i];
			}
			zone_cd_OnChange();
		}
	}
}

function removeOptions(selectbox)
{
    var i;
    for(i=selectbox.options.length-1;i>=0;i--)
    {
        selectbox.remove(i);
    }
}

function getTotalRow(xmlStr)
{
	var xmlDoc = $.parseXML(xmlStr); 
	var $xml = $(xmlDoc);
	if( $xml.find("DATA").length == 0  ){
		 return null;
	}
	return $xml.find("DATA")[0].getAttribute("TOTAL")
		
}

function searchBlockCodeList(){
	var formObj=document.form;
	var sXml=docObjects[0].GetSearchData("./searchBlockCodeGS.clt?f_cmd="+SEARCH02+"&f_loc_cd="+formObj.wh_cd.value+"&f_zone_cd="+formObj.zone_cd.value);
	removeOptions(formObj.block_cd);
	var item = document.createElement("option");
    document.getElementById("block_cd").options.add(item);
    item.text = "ALL";
    item.value = "ALL";
	if(getTotalRow(sXml)){
		var xmlDoc = $.parseXML(sXml);
		var $xml = $(xmlDoc);
		var code= $xml.find("block_cd").text();
		if(code != null && code != ""){
			var codeList=code.split("|");
			for(var i=0;i<codeList.length;i++){
			var item = document.createElement("option");
	        document.getElementById("block_cd").options.add(item);
	        item.text = codeList[i];
	        item.value = codeList[i];
			} 
		}
	}
}
function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
//    axon_event.addListenerForm('beforedeactivate', 'form_deactivate', formObject);
//	axon_event.addListenerForm("blur", "form_onChange", formObject);    
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
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
		case "btn_to_bk_date":
			if (document.getElementById('btn_to_bk_date').disabled) {
				return;
			}
			var cal=new ComCalendarFromTo();
			cal.displayType="date";
			cal.select(formObj.prop_date_fm, formObj.prop_date_to, 'MM-dd-yyyy');
			break;
		case "btn_ctrt_no":	
			var formObj=document.form;
		    callBackFunc = "setCtrtNoInfo";
		    modal_center_open('./ContractRoutePopup.clt?ctrt_no=' + formObj.ctrt_no.value + '&ctrt_nm='+formObj.ctrt_nm.value, callBackFunc, 900, 580,"yes");
			break;
		case "btn_wh_loc_cd":
			var formObj=document.form;
			if (formObj.btn_wh_loc_cd.disable == true) {
				return;
			}
			if (ComIsEmpty(formObj.wh_cd)) {
				ComShowCodeMessage("COM12113", "Warehouse");
				return;
			}
		      callBackFunc = "setPutawayLocInfo";
		      modal_center_open('./WarehouseLocPopup.clt?f_loc_cd='+formObj.wh_cd.value+'&f_fix_wh_loc_nm=' +formObj.wh_loc_nm.value, rtnary, 700, 500,"yes");
			break;
		case "SEARCHLIST":	
			btn_Search();
			break;
		case "btn_Excel":	
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
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
	        with(sheetObj){
           

        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        var headers = [ { Text:getLabel('FixLocList_HDR1'), Align:"Center"},
                        { Text:getLabel('FixLocList_HDR2'), Align:"Center"} ];
        InitHeaders(headers, info);

        var cols = [ 
             {Type:"Seq",       Hidden:0, Width:40,    Align:"Center",  ColMerge:1,   SaveName:"seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"zone_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"block_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"wh_loc_cd_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:1, Width:80,    Align:"Center",    ColMerge:1,   SaveName:"wh_loc_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:1,   SaveName:"item_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"inbound_dt",    KeyField:0,   CalcLogic:"",   Format:"Ymd", 		PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",    ColMerge:1,   SaveName:"lot_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"lot_id",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Float",   	Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"stc_qty",       KeyField:0,   CalcLogic:"",   Format:"Integer",		PointCount:0,	UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"cbm",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,	UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"cbf",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,	UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_kgs",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,	UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_lbs",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,	UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"net_kgs",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,	UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"net_lbs",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,	UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Combo",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"wh_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",    ColMerge:1,   SaveName:"ctrt_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"exp_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",			PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"lot_04",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"lot_05",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",    ColMerge:1,   SaveName:"wib_bk_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	         {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:1,   SaveName:"cust_ord_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 } ];
	         
	        InitColumns(cols);
	        SetColProperty("wh_cd", {ComboCode:WHCDLIST1, ComboText:WHCDLIST1} )
	        SetSheetHeight(450);
	        SetHeaderRowHeight(30);
		    SetAutoRowHeight(0);
		    resizeSheet();
	        SetEditable(0);
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
function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}
/*
 * 팝업 관련 로직 시작
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
function setPutawayLocInfo(aryPopupData) {
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		   return;
		  }else{
			  var rtnValAry=aryPopupData.split("|");
			   formObj.wh_loc_cd.value=rtnValAry[0];
			   formObj.wh_loc_nm.value=rtnValAry[1];
		  }
}
/**
 * 마우스 아웃일때 
 */
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if (srcName == "wh_loc_nm") {
		if (srcValue != "") {
			var sParam="f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_wh_loc_nm=" + srcValue;
			var sXml=docObjects[0].GetSearchData("./searchWarehouseLocInfoForName.clt?"+sParam);
			ComSetObjValue(formObj.wh_loc_cd,     getXmlDataNullToNullString(sXml,'wh_loc_cd')); // wh_loc_cd
			ComSetObjValue(formObj.wh_loc_nm,     getXmlDataNullToNullString(sXml,'wh_loc_nm')); // wh_loc_nm
			if (getXmlDataNullToNullString(sXml,'exception_msg') != "") {
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
				ComSetFocus(formObj.wh_loc_nm);
			}
		} else {
			ComSetObjValue(formObj.wh_loc_cd,     ""); // wh_loc_cd
			ComSetObjValue(formObj.wh_loc_nm,     ""); // wh_loc_nm
		}				
	}
}
/*
 * 팝업 관련 로직 끝
 */
function btn_Search(){
	var formObj=document.form;
	if(loading_flag != "Y"){
		return;
	}
	if (validateForm(formObj, 'search')) {
		formObj.f_cmd.value=SEARCH;
 		docObjects[0].DoSearch("./searchFixLocListGS.clt", FormQueryString(formObj, ""));
		//comboObjects[0].LoadSearchData(sXml,{Sync:1} );
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
	     docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(	docObjects[0]), SheetDesign:1,Merge:1 });
	    }
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			//날짜
			if(formObj.wh_cd.value == ""){
				ComShowCodeMessage('COM12113',"Warehouse");
				formObj.wh_cd.focus();
				return false;
			}
			if(!ComIsEmpty(formObj.prop_date_fm) && ComIsEmpty(formObj.prop_date_to)){
				formObj.prop_date_to.value=ComGetNowInfo();
			}
			/* 3개월 duration 주석
			if (!ComIsEmpty(formObj.prop_date_fm) && getDaysBetween2(formObj.prop_date_fm.value, formObj.prop_date_to.value)> 92) {
				ComShowCodeMessage("COM0141","3","(" + $("#prop_date_tp")[0].GetSelectText()+ ")");
				formObj.prop_date_fm.focus();
				return false;
			}
			*/
			if (!ComIsEmpty(formObj.prop_date_fm) && !isDate(formObj.prop_date_fm)) {
				//ComShowCodeMessage("COM0114",$("#prop_date_tp")[0].GetSelectText());
				ComShowCodeMessage("COM0114",prop_date_tp.options[prop_date_tp.selectedIndex].text);
				formObj.prop_date_fm.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.prop_date_to) && !isDate(formObj.prop_date_to)) {
				//ComShowCodeMessage("COM0114",$("#prop_date_tp")[0].GetSelectText());
				ComShowCodeMessage("COM0114",prop_date_tp.options[prop_date_tp.selectedIndex].text);
				formObj.prop_date_to.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.prop_date_fm)&&ComIsEmpty(formObj.prop_date_to))||(ComIsEmpty(formObj.prop_date_fm)&&!ComIsEmpty(formObj.prop_date_to))) {
				//ComShowCodeMessage("COM0122",$("#prop_date_tp")[0].GetSelectText());
				ComShowCodeMessage("COM0122",prop_date_tp.options[prop_date_tp.selectedIndex].text);
				formObj.prop_date_fm.focus();
				return false;
			}
			if (getDaysBetween(formObj.prop_date_fm, formObj.prop_date_to, 'MM-dd-yyyy')<0) {
				//ComShowCodeMessage("COM0122",$("#prop_date_tp")[0].GetSelectText());
				ComShowCodeMessage("COM0122",prop_date_tp.options[prop_date_tp.selectedIndex].text);
				formObj.prop_date_fm.focus();
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
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj){
	var formObj=document.form;
	if(formObj.value != ""){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
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
/** 
 * Zone Code 선택시
 */
function zone_cd_OnChange() {
	searchBlockCodeList();
}
/** 
 * TinLuong Modify
 * Warehouse Code 선택시
 */
function wh_cd_OnChange(comObj, code, text) {
	searchZoneCodeList();
}
/**
 * 조회조건 활성화/비활성화
 * @param code
 */
function setCondEnable(code) {
	var formObj=document.form;
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	ComEnableObject(formObj.prop_no_tp, true);
	ComEnableObject(formObj.prop_no, true);
	ComEnableObject(formObj.prop_date_tp, true);
	ComEnableObject(formObj.prop_date_fm, true);
	ComEnableObject(formObj.prop_date_to, true);		
	ComEnableObject(formObj.wh_loc_nm, true);
	ComEnableObject(formObj.wib_bk_no, true);
	ComEnableObject(formObj.cust_ord_no, true);
	formObj.prop_no.value="";
	formObj.prop_date_fm.value="";
	formObj.prop_date_to.value="";
	formObj.wh_loc_cd.value="";
	formObj.wh_loc_nm.value="";
	formObj.wib_bk_no.value="";
	formObj.cust_ord_no.value="";	
	if (code == "ITEM") {
		ComEnableObject(formObj.prop_no_tp, false);
		ComEnableObject(formObj.prop_no, false);
		ComEnableObject(formObj.prop_date_tp, false);
		ComEnableObject(formObj.prop_date_fm, false);
		ComEnableObject(formObj.prop_date_to, false);
		ComEnableObject(formObj.wh_loc_nm, false);
		ComEnableObject(formObj.wib_bk_no, false);
		ComEnableObject(formObj.cust_ord_no, false);
		comboObjects[1].index=0;
		comboObjects[1].SetEnable(0);
		comboObjects[2].index=0;
		comboObjects[2].SetEnable(0);
		ComEnableButton("btn_prop_date_fm", false, 5);		
		ComEnableButton("btn_prop_date_to", false, 5);		
		ComEnableButton("btn_wh_loc_cd", false, 3);		
	} else if (code == "LOT") {
		ComEnableObject(formObj.wh_loc_nm, false);
		ComEnableObject(formObj.wib_bk_no, false);
		ComEnableObject(formObj.cust_ord_no, false);
		comboObjects[1].index=0;
		comboObjects[1].SetEnable(1);
		comboObjects[2].index=0;
		comboObjects[2].SetEnable(1);
		ComSetObjValue(formObj.prop_date_fm, ComGetDateAdd(null, "d", -31, "-"));	
		ComSetObjValue(formObj.prop_date_to, ComGetNowInfo());
		ComEnableButton("btn_prop_date_fm", true, 5);		
		ComEnableButton("btn_prop_date_to", true, 5);		
		ComEnableButton("btn_wh_loc_cd", false, 3);		
	} else if (code == "LOC") {
		comboObjects[1].index=0;
		comboObjects[1].SetEnable(1);
		comboObjects[2].index=0;
		comboObjects[2].SetEnable(1);
		ComSetObjValue(formObj.prop_date_fm, ComGetDateAdd(null, "d", -31, "-"));	
		ComSetObjValue(formObj.prop_date_to, ComGetNowInfo());
		ComEnableButton("btn_prop_date_fm", true, 5);		
		ComEnableButton("btn_prop_date_to", true, 5);		
		ComEnableButton("btn_wh_loc_cd", true, 3);		
	}
}
/**
 * Sheet 선택
 * @param code
 */
function setSelectSheet(code) {
    var tabObjs=document.getElementsByName('sheetLayer');
    if (code == "ITEM") {
		tabObjs[0].style.display='inline';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
    } else if(code == "LOT") {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='inline';
        tabObjs[2].style.display='none';        
    } else if(code == "LOC") {
		tabObjs[0].style.display='none';
		tabObjs[1].style.display='none';
        tabObjs[2].style.display='inline';
    }
}
function getLocationInfo(){
	var formObj=document.form;
	if ($("#wh_loc_nm").val() == "") {
		$("#wh_loc_cd").val("");
	}
	if (ComIsEmpty(formObj.wh_cd)) {
		ComShowCodeMessage("COM0114", "Warehouse");
		$("#wh_loc_nm").val("");
		$("#wh_cd").focus();
		return;
	}
	var sParam = "f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm="
			+ $("#wh_loc_nm").val() + "&f_move_flg=Y";
	ajaxSendPost(resultLocationInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
}
function resultLocationInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
	    var rtnArr=doc[1].split('^@');
	    	if(rtnArr[0] != ""){
	    		$("#wh_loc_nm").val(rtnArr[1]);
	    		$("#wh_loc_cd").val(rtnArr[0]);
	    	}
	    	else{
	    		$("#wh_loc_nm").val("");
	    		$("#wh_loc_cd").val("");
	    	}
		}
		else{
		}
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
