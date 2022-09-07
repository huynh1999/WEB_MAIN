/*=========================================================
*Copyright(c) 2015 DOU Networks. All Rights Reserved.
*@FileName   : MonthlyStorageRpt.js
*@FileTitle  : Monthly Storage Report
*@author     : Vinh.Vo
*@version    : 1.0
*@since      : 2015/07/17
=========================================================*/
var rtnary=new Array(2);
var callBackFunc = "";
var fix_grid01="Grd01";
var loading_flag="N";
var firCalFlag=false;
function doWork(srcName){
	
//	if(!btnGetVisible(srcName)){
//		return;
//	}
	var formObj = document.frm1;
	
    switch(srcName) {
       case "SEARCH":
    	   btn_Search();
       break;
       
       case "CREATE":
    	   btn_Create();
       break;
       case "EXCEL":
    	   btn_Excel_Dl();
       break;
       case "CTRT_POPLIST":
    	   var params = "?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value+"&ctrt_use_flg=A";
    	   
			callBackFunc = "clbck_CTRT_POPLIST";
			modal_center_open('./ContractRoutePopup.clt' + params  , new Array(), 900, 580,"yes");
	    break;
    }
}

function clbck_CTRT_POPLIST(rtnVal){
	
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		formObj.ctrt_no.value = rtnValAry[0];
		formObj.ctrt_nm.value = rtnValAry[1];
	}
}


function doDisplay(doWhat, formObj, obj1, obj2){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(obj1, 'MM-dd-yyyy');
        break;
        case 'DATE11':   //달력 조회 팝업 호출      
            var cal=new ComCalendarFromTo();
            cal.displayType = "date";
            cal.select(obj1,obj2, 'MM-dd-yyyy');
        break;        
       
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
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
	setFieldValue(formObj.wh_cd, ComGetObjValue(formObj.def_wh_cd));
	setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no));	
	setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));	
    loading_flag="Y";
	initControl();
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
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
    switch(sheetObj.id) {
	    case "sheet1":      //IBSheet1 init
	        with (sheetObj) {
	    		SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, FrozenCol:3 } );
	    		var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    		var headers = [ { Text:getLabel('MONSTORPT_HDR_1'), Align:"Center"}, { Text:getLabel('MONSTORPT_HDR_2'), Align:"Center"} ];
	    		
	    		InitHeaders(headers, info);
	
	    		var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	    		             {Type:"Seq",       Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",          KeyField:0,   CalcLogic:"",   Format:"",            		  PointCount:0,            		UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",    ColMerge:1,   SaveName:"item_cd",      KeyField:0,   CalcLogic:"",   Format:"",            		  PointCount:0,            		UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",      KeyField:0,   CalcLogic:"",   Format:"",            		  PointCount:0,            		UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"lot_id",       KeyField:0,   CalcLogic:"",   Format:"",            		  PointCount:0,            		UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Int",   	Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"stc_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",            		  PointCount:0,		UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Int",   	Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"out_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",            		  PointCount:0,		UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"inbound_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   				UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"outbound_dt",  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   				UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"str_fr_dt",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   				UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"str_to_dt",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   				UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"str_days",     KeyField:0,   CalcLogic:"",   Format:"",            		  PointCount:0,   				UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",    ColMerge:1,   SaveName:"ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            		  PointCount:0,   				UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_nm",      KeyField:0,   CalcLogic:"",   Format:"",            		  PointCount:0,   				UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",    ColMerge:1,   SaveName:"wh_cd",        KeyField:0,   CalcLogic:"",   Format:"",            		  PointCount:0,   				UpdateEdit:1,   InsertEdit:1 },
		  	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"wh_nm",        KeyField:0,   CalcLogic:"",   Format:"",            		  PointCount:0,   				UpdateEdit:1,   InsertEdit:1 } ];
	    		SetSheetHeight(450);
	    		InitColumns(cols);
	    		SetEditable(0);
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

function initControl() {
	var formObject=document.frm1;
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
    axon_event.addListenerForm('beforedeactivate', 'form_deactivate', formObject);
	axon_event.addListenerForm("change", "form_onChange", formObject);    
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.frm1;
	var srcName=ComGetEvent("name");
	var srcValue=event.srcElement.getAttribute("value");
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

function form_onChange() {
	var formObj=document.frm1;
	var srcName=ComGetEvent("name");
	var srcValue=window.event.srcElement.getAttribute("value");
	if (srcName == "wh_loc_nm") {
		if (srcValue != "") {
			
			var sParam="f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_wh_loc_nm=" + srcValue;
			
			var xml=sheet1.GetSearchData("searchWarehouseLocInfoForName.clt?"+sParam);
			
			if(xml.replace(/^\s+|\s+$/gm,'') != ""){
				
				var xmlDoc = $.parseXML(xml);
				 var $xml1 = $(xmlDoc);
				
				 var res = $xml1.find("result").text();
				 
				 formObj.wh_loc_cd.value = $xml1.find("wh_loc_cd").text(); // wh_loc_cd
				formObj.wh_loc_nm.value = $xml1.find("wh_loc_nm").text(); // wh_loc_nm
				
				if ($xml1.find("exception_msg").text() != "") {
					alert($xml1.find("exception_msg").text());
					formObj.wh_loc_nm.focus();
				}
			}
			
		} else {
			formObj.wh_loc_cd.value = ""; // wh_loc_cd
			formObj.wh_loc_nm.value = ""; // wh_loc_nm
		}				
	}
}
/*
 * 팝업 관련 로직 끝
 */
function btn_Search(){
	
	var formObj=document.frm1;
	
	if(loading_flag != "Y"){
		return;
	}
	
	if (validateForm(formObj, 'search')) {
		var sts_cd="";
		
		var params = "?ctrt_no="+formObj.ctrt_no.value
					+"&wh_cd="+formObj.wh_cd.value
					+"&rpt_fr_dt="+formObj.rpt_fr_dt.value
					+"&rpt_to_dt="+formObj.rpt_to_dt.value
					+"&f_cmd="+SEARCH01;
		
		var xml = sheet1.GetSearchData("MonthlyStorageRpt_01GS.clt" + params);
		
		if(xml.replace(/^\s+|\s+$/gm,'') != ""){
			
			var xmlDoc = $.parseXML(xml);
			var $xml1 = $(xmlDoc);
			
			sts_cd = $xml1.find("result").text();
		}
		
		if(sts_cd == ""){
			alert("It has not been created yet. Please create data previously.");
			return;
		}else if(sts_cd == "S"){
			alert("It is processing. Please check it after a few minute.");
			return;
		}else if(sts_cd == "X"){
			alert("An error has occurred during the operation. Please create data again.");
			return;
		}
		
		sheet1.RemoveAll();
		
		formObj.f_cmd.value = SEARCH;
		
		sheet1.DoSearch("MonthlyStorageRptGS.clt", FormQueryString(formObj));
	}
}
function btn_Create(){
	var formObj=document.frm1;
	
	if(!validateForm(formObj, 'create')) return;
	
	//Check Status
	
	var sts_cd= getMonthlyStorageRptSts();
	 
	//If Status == "" then show message confirm 'Do you want to create ?'
	
	var bFlag = true;
	
	if(sts_cd == ""){
		bFlag = ComShowCodeConfirm("COM132607");
	}
	
	if(bFlag){
		
		var params = "?ctrt_no="+formObj.ctrt_no.value+"&wh_cd="+formObj.wh_cd.value+"&rpt_fr_dt="+formObj.rpt_fr_dt.value+"&rpt_to_dt="+formObj.rpt_to_dt.value+"&f_cmd="+SEARCH02;
		
		var res = createMonthlyStorageRpt(params);
		
		if(res != ""){
			if(res == "S"){
				alert("It is processing. Please check it after a few minute.");
			}else if(res == "E"){
				
				if(confirm("It has been already created. Continue to create again?")){
					
					var params = "?ctrt_no="+formObj.ctrt_no.value+"&wh_cd="+formObj.wh_cd.value+"&rpt_fr_dt="+formObj.rpt_fr_dt.value+"&rpt_to_dt="+formObj.rpt_to_dt.value+"&rc_flg=Y"+"&f_cmd="+SEARCH02;
					
					var res1 = createMonthlyStorageRpt(params);
					
					if(res1 != ""){
						
					}else{
						var res2 = "";
						
						res2 = MonthlyStorageRptDetail();
						
//						if(res2!=""){
//							alert(res2);
//						}
					}
				}
			}else if(res == "X"){
				if(confirm("An error has occurred during the operation. Continue to create again?")){
					
					var params = "?ctrt_no="+formObj.ctrt_no.value+"&wh_cd="+formObj.wh_cd.value+"&rpt_fr_dt="+formObj.rpt_fr_dt.value+"&rpt_to_dt="+formObj.rpt_to_dt.value+"&rc_flg=Y"+"&f_cmd="+SEARCH02;
					
					var res1 = createMonthlyStorageRpt(params);
					
					if(res1 != ""){
						
					}else{
						var res2 = MonthlyStorageRptDetail();
						
						if(res2 != ""){
							//alert(res2);
						}
					}
				}
			}else{
				alert(res);
			}
		}else{
			
			var res1 = MonthlyStorageRptDetail();
			
//			if(res1!=""){
//				alert(res1);
//			}
		}
	}
}

function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	
	var sheetObj=sheet1;
	
	for(var i=2; i<=sheetObj.LastRow();i++){
	}
	
	doHideProcess();
}
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	
	var colName=sheetObj.ColSaveName(Col);
	
	if (colName == "in_bk_no") {
		
		var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, "in_bk_no");
		parent.mkNewFrame('Inbound Booking Management', sUrl, "WHInbkMgmt_" + sheetObj.GetCellValue(Row, "in_bk_no"));
		
	}else if (colName == "out_bk_no") {
		
		var sUrl="./WHOutbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, "out_bk_no");
		parent.mkNewFrame('Outbound Booking Management', sUrl, "WHOutbkMgmt_" + sheetObj.GetCellValue(Row, "out_bk_no"));
	}  
}
/*
 * 엑셀다운로드
 */
function btn_Excel_Dl() 
{
	if(sheet1.RowCount() < 1){//no data	
		ComShowCodeMessage("COM132501");
	}else{
		sheet1.Down2Excel( {DownCols: makeHiddenSkipCol(sheet1), SheetDesign:1,Merge:1 });
	}
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
			case 'search':
				// Warehouse 체크			
				if(formObj.wh_cd.value == ""){
					ComShowCodeMessage('COM12113',"Warehouse");
					formObj.wh_cd.focus();
					return false;
				}
				// Contract 체크			
				if (ComIsEmpty(formObj.ctrt_no)) {
					ComShowCodeMessage("COM0114", "Contract");
					formObj.ctrt_no.focus();
					return false;
				}
				// Storage Month 체크			
				if (ComIsEmpty(formObj.rpt_fr_dt)) {
					ComShowCodeMessage("COM0114", "Storage Month");
					formObj.rpt_fr_dt.focus();
					return false;
				}
				if (ComIsEmpty(formObj.rpt_to_dt)) {
					ComShowCodeMessage("COM0114", "Storage Month");
					formObj.rpt_to_dt.focus();
					return false;
				}
				if(!ComIsEmpty(formObj.rpt_fr_dt) && ComIsEmpty(formObj.rpt_to_dt)){
					formObj.rpt_to_dt.value=ComGetNowInfo();
				}
				// 30일 duration 주석
				if (!ComIsEmpty(formObj.rpt_fr_dt) && getDaysBetween2(formObj.rpt_fr_dt.value, formObj.rpt_to_dt.value)> 30) {
					ComShowCodeMessage("COM132608","1","(" + "Storage Month" + ")");
					formObj.rpt_fr_dt.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.rpt_fr_dt) && !isDate(formObj.rpt_fr_dt)) {
					ComShowCodeMessage("COM0114", "Storage Month");
					formObj.rpt_fr_dt.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.rpt_to_dt) && !isDate(formObj.rpt_to_dt)) {
					ComShowCodeMessage("COM0114", "Storage Month");
					formObj.rpt_to_dt.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.rpt_fr_dt)&&ComIsEmpty(formObj.rpt_to_dt))||(ComIsEmpty(formObj.rpt_fr_dt)&&!ComIsEmpty(formObj.rpt_to_dt))) {
					ComShowCodeMessage("COM0122", "Storage Month");
					formObj.rpt_fr_dt.focus();
					return false;
				}
				if (getDaysBetween2(formObj.rpt_fr_dt.value, formObj.rpt_to_dt.value)<0) {
					ComShowCodeMessage("COM0122", "Storage Month");
					formObj.rpt_fr_dt.focus();
					return false;
				}
				break;
			case 'create':
				// Warehouse 체크			
				if (ComIsEmpty(formObj.wh_cd)) {
					ComShowCodeMessage("COM12113", "Warehouse");
					formObj.wh_cd.focus();
					return false;
				}
				// Contract 체크			
				if (ComIsEmpty(formObj.ctrt_no)) {
					ComShowCodeMessage("COM0114", "Contract");
					formObj.ctrt_no.focus();
					return false;
				}
				// Storage Month 체크			
				if (ComIsEmpty(formObj.rpt_fr_dt)) {
					ComShowCodeMessage("COM0114", "Storage Month");
					formObj.rpt_fr_dt.focus();
					return false;
				}
				if (ComIsEmpty(formObj.rpt_to_dt)) {
					ComShowCodeMessage("COM0114", "Storage Month");
					formObj.rpt_to_dt.focus();
					return false;
				}
				if(!ComIsEmpty(formObj.rpt_fr_dt) && ComIsEmpty(formObj.rpt_to_dt)){
					formObj.rpt_to_dt.value=ComGetNowInfo();
				}
				// 30일 duration 주석
				if (!ComIsEmpty(formObj.rpt_fr_dt) && getDaysBetween2(formObj.rpt_fr_dt.value, formObj.rpt_to_dt.value)> 30) {
					ComShowCodeMessage("COM132608","1","(" + "Storage Month" + ")");
					formObj.rpt_fr_dt.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.rpt_fr_dt) && !isDate(formObj.rpt_fr_dt)) {
					ComShowCodeMessage("COM0114", "Storage Month");
					formObj.rpt_fr_dt.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.rpt_to_dt) && !isDate(formObj.rpt_to_dt)) {
					ComShowCodeMessage("COM0114", "Storage Month");
					formObj.rpt_to_dt.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.rpt_fr_dt)&&ComIsEmpty(formObj.rpt_to_dt))||(ComIsEmpty(formObj.rpt_fr_dt)&&!ComIsEmpty(formObj.rpt_to_dt))) {
					ComShowCodeMessage("COM0122", "Storage Month");
					formObj.rpt_fr_dt.focus();
					return false;
				}
				if (getDaysBetween2(formObj.rpt_fr_dt.value, formObj.rpt_to_dt.value)<0) {
					ComShowCodeMessage("COM0122", "Storage Month");
					formObj.rpt_fr_dt.focus();
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
function getCtrtInfo(objCd, objNm){
	
	codeField = objCd;
	nameField = objNm;
	
	if(objCd.value.trim() == ""){
		objCd.value = "";
		objNm.value = "";
		
		return;
	}

	ajaxSendPost(setCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+objCd.value, './GateServlet.gsl');
}
function setCtrtInfo(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				nameField.value=rtnArr[0];
			}
			else{
				codeField.value="";
				nameField.value="";	
			}
		}
		else{
			codeField.value="";
			nameField.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

/** 
 * Zone Code 선택시
 */
function zone_cd_OnChange(comObj, code, text) {
	searchBlockCodeList(comObj, code, text);
}
/**
 * 조회조건 활성화/비활성화
 * @param code
 */
function setCondEnable(code) {
	var formObj=document.frm1;
	sheet1.RemoveAll();
	sheetObjects[1].RemoveAll();
	sheetObjects[2].RemoveAll();
	ComEnableObject(formObj.prop_no_tp, true);
	ComEnableObject(formObj.prop_no, true);
	ComEnableObject(formObj.prop_date_tp, true);
	ComEnableObject(formObj.rpt_fr_dt, true);
	ComEnableObject(formObj.rpt_to_dt, true);		
	ComEnableObject(formObj.wh_loc_nm, true);
	ComEnableObject(formObj.wib_bk_no, true);
	ComEnableObject(formObj.cust_ord_no, true);
	//formObj.wh_cd.value = "";
	//formObj.wh_nm.value = "";
	//formObj.ctrt_no.value = "";
	//formObj.ctrt_nm.value = "";	
	//formObj.item_cd.value = "";	
	formObj.prop_no.value="";
	formObj.rpt_fr_dt.value="";
	formObj.rpt_to_dt.value="";
	formObj.wh_loc_cd.value="";
	formObj.wh_loc_nm.value="";
	formObj.wib_bk_no.value="";
	formObj.cust_ord_no.value="";	
	if (code == "ITEM") {
		ComEnableObject(formObj.prop_no_tp, false);
		ComEnableObject(formObj.prop_no, false);
		ComEnableObject(formObj.prop_date_tp, false);
		ComEnableObject(formObj.rpt_fr_dt, false);
		ComEnableObject(formObj.rpt_to_dt, false);
		ComEnableObject(formObj.wh_loc_nm, false);
		ComEnableObject(formObj.wib_bk_no, false);
		ComEnableObject(formObj.cust_ord_no, false);
		comboObjects[1].index=0;
		comboObjects[1].SetEnable(0);
		comboObjects[2].index=0;
		comboObjects[2].SetEnable(0);
		ComBtnDisable("btn_rpt_fr_dt");		
		ComBtnDisable("btn_rpt_to_dt");		
		ComBtnDisable("btn_wh_loc_cd");		
	} else if (code == "LOT") {
		ComEnableObject(formObj.wh_loc_nm, false);
		ComEnableObject(formObj.wib_bk_no, false);
		ComEnableObject(formObj.cust_ord_no, false);
		comboObjects[1].index=0;
		comboObjects[1].SetEnable(1);
		comboObjects[2].index=0;
		comboObjects[2].SetEnable(1);
		formObj.rpt_fr_dt.value =  ComGetDateAdd(null, "d", -31, "-");	
		formObj.rpt_to_dt.value =  ComGetNowInfo();
		ComBtnEnable("btn_rpt_fr_dt");		
		ComBtnEnable("btn_rpt_to_dt");		
		ComBtnDisable("btn_wh_loc_cd");		
	} else if (code == "LOC") {
		comboObjects[1].index=0;
		comboObjects[1].SetEnable(1);
		comboObjects[2].index=0;
		comboObjects[2].SetEnable(1);
		formObj.rpt_fr_dt.value = ComGetDateAdd(null, "d", -31, "-");	
		formObj.rpt_to_dt.value =  ComGetNowInfo();
		ComBtnEnable("btn_rpt_fr_dt");		
		ComBtnEnable("btn_rpt_to_dt");		
		ComBtnEnable("btn_wh_loc_cd");		
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

function mmddyyyyToyyyymmdd(sDate){
	var sDt = sDate.replaceAll("-","");
	
	var sYear = sDt.substring(4);
	var sMonth = sDt.substring(0,2);
	var sDay = sDt.substring(2,4);
	
	return sYear + sMonth + sDay;
}

function getMonthlyStorageRptSts(){
	var formObj = document.frm1;
	var res = "";
	 
	 var params = "?ctrt_no="+formObj.ctrt_no.value
		+"&wh_cd="+formObj.wh_cd.value
		+"&rpt_fr_dt="+formObj.rpt_fr_dt.value
		+"&rpt_to_dt="+formObj.rpt_to_dt.value
		+"&f_cmd="+SEARCH01;

	var xml = sheet1.GetSearchData("MonthlyStorageRpt_01GS.clt" + params);
	
	if(xml.replace(/^\s+|\s+$/gm,'') != ""){
	
		var xmlDoc = $.parseXML(xml);
		var $xml1 = $(xmlDoc);
		
		res = $xml1.find("result").text();
	}else{
		//show message: fail to query
		return null;
	}
	
	return res;
}

function createMonthlyStorageRpt(params){
	
	var xml = sheet1.GetSearchData("MonthlyStorageRpt_01GS.clt" + params);
	
	var res = "";
	
	if(xml.replace(/^\s+|\s+$/gm,'') != ""){
		
		var xmlDoc = $.parseXML(xml);
		var $xml1 = $(xmlDoc);
		
		res = $xml1.find("result").text();
	}else{
		//show message: fail to query
		return null;
	}
	
	return res;
}

function MonthlyStorageRptDetail(){
	var formObj = document.frm1;
	var params = "?ctrt_no="+formObj.ctrt_no.value
				+"&wh_cd="+formObj.wh_cd.value
				+"&rpt_fr_dt="+formObj.rpt_fr_dt.value
				+"&rpt_to_dt="+formObj.rpt_to_dt.value
				+"&user_id="+formObj.user_id.value
				+"&ofc_cd="+formObj.org_cd.value
				+"&f_cmd="+SEARCH03;
	
	var xml = sheet1.GetSearchData("MonthlyStorageRpt_02GS.clt" + params);
	
	var res = "";
	
	if(xml.replace(/^\s+|\s+$/gm,'') != ""){
		
		var xmlDoc = $.parseXML(xml);
		var $xml1 = $(xmlDoc);
		
		res = $xml1.find("result").text();
		if(res == 1)
			showCompleteProcess();
		else alert("An error has occurred during the operation. Please create data again.");
	}else{
		//show message: fail to query
		return null;
	}
	
	return res;
	
	return "";
}
function getXmlDataNullToNullString(xmlStr, id){
	var data = getXmlDataObject(xmlStr, id);
	if(data == null){
		return "";
	}
	return data.text;
}

function getXmlDataObject(xmlStr, id){    	
	var xmlRoot = getXmlObject(xmlStr);
	var data = xmlRoot.getElementsByTagName(id).item(0);
	return data;
}











