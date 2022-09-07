//=========================================================
//*Copyright(c) 2017 DouNetwork. All Rights Reserved.
//=========================================================
//
//=========================================================
//*@FileName   : ReportSetMng.js
//*@FileTitle  : Report Set Management
//*@Description: 
//*@author     : Diem.Huynh - DouNetwork
//*@version    : 1.0 - 12/04/2017
//*@since      : 12/04/2017
//
//*@Change history:
//=========================================================

/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */

var SELECTROW;
var duplicateFlg = false;
var docObjects = new Array();
var sheetCnt = 0;
/*
 * Sheet initialization and 
 * Search report set list after loading the screen
 */
function loadPage() {
	for ( var i = 0; i < docObjects.length; i++) {
		// khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i], i + 1);
		// khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	doWork('SEARCHLIST');
}

function doWork(srcName) {
	var formObj = document.frm1;
	sheetObj = docObjects[0];
	switch (srcName) {
	case "SEARCHLIST":
		sheetObj.SetColHidden('set_nm', 0);
		formObj.f_cmd.value = SEARCHLIST;
		sheetObj.DoSearch("./ReportSetMngGS.clt", FormQueryString(formObj));
		break;
	case "MODIFY":
		if(sheetObj.GetCellValue(SELECTROW, "ibflag") == "I"){
			//Enter mandatory field when processing insert.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COM_RPT_SET'));
			return;
		}
		if (checkRptID()) {
			formObj.f_cmd.value = MODIFY;
			// Do you want to proceed?
			if (confirm(getLabel('FMS_COM_CFMSAV'))) {
				doProcess = true;
				sheetObj.DoSave("./ReportSetMngGS.clt", FormQueryString(formObj), "ibflag", false);
			}
		}
		break;
	case "SAVEAS":
		//Get last row to check ibflag.
		if(sheetObj.LastRow() > 1){
			SELECTROW = sheetObj.GetSelectRow();
		}
		if(sheetObj.GetCellValue(SELECTROW, "ibflag") != "I") {
			if(sheetObj.GetCellValue(SELECTROW, "ibflag") == "U"){
				alert(getLabel('RPTSETMNG_HDR1'));
				return;
			} else {
				alert(getLabel('RPTSETMNG_HDR2'));
				return;
			}
		}
		if (checkCrrRowRptID()) { // Check for mandatory fields
			var call_id = sheetObj.GetCellValue(SELECTROW, "call_id");
			var rpt_id = sheetObj.GetCellValue(SELECTROW, "rpt_id");
			// Check Report Set Name list before opening popup
			ajaxSendPost(checkReportSetNameList, 'reqVal', '&goWhere=aj&bcKey=checkReportSetNameList&call_id='+call_id+'&rpt_id='+rpt_id, './GateServlet.gsl');
		}
		break;
	case "ADD":
		ajaxSendPost(selectCallID, 'reqVal', '&goWhere=aj&bcKey=selectCallID', './GateServlet.gsl');
	} // end switch
}

function checkReportSetNameList(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	var sheetObj = docObjects[0];
	var formObj = document.frm1;
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			var rtnArr = doc[1].split('^@^');
			if(rtnArr[0] != null) {
				var rtnary=new Array();
				var call_id = sheetObj.GetCellValue(SELECTROW, "call_id");
				var rpt_id = sheetObj.GetCellValue(SELECTROW, "rpt_id")
				callBackFunc = "srOpenPopUp_RPT_SET_NM";
				modal_center_open('./ReportSetPop.clt?call_id=' + call_id + "&rpt_id=" + rpt_id , rtnary, 380, 215, "yes");
			}
		} else {
			alert(getLabel('RPTSETMNG_HDR3'));
		}
	} else {
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));	
	}
}

function srOpenPopUp_RPT_SET_NM(rtnVal) {
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		if(rtnValAry[0] != null || rtnValAry[0] != "") {
			// Set return value for all Rows
			for(var i=1 ; i<sheetObj.RowCount()+sheetObj.HeaderRows() ; i++){
				sheetObj.SetCellValue(i, "set_id", rtnValAry[0]);
				sheetObj.SetCellValue(i, "set_nm", rtnValAry[1]);
			}
			// Save data on sheet to physical DB
			formObj.f_cmd.value = MODIFY;
			sheetObj.DoSave("./ReportSetMngGS.clt", FormQueryString(formObj), "ibflag", false);
		}
		
	}
}

function checkRptID() {
	var sheetObj = docObjects[0];
	var intRow = sheetObj.RowCount();
	for ( var i = 1; i < intRow + 1; i++) {
		if (sheetObj.GetCellValue(i, "rpt_id") == "" || sheetObj.GetCellValue(i, "rpt_id") == null) {
			// Please enter a Mandatory Value!
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COM_RPT'));
			return false;
		}
		return true;
	}
}
	
function checkCrrRowRptID() {
	var sheetObj = docObjects[0];
	if(sheetObj.RowCount() > 0){
		for(var i=1 ; i<sheetObj.RowCount()+sheetObj.HeaderRows(); i++){
			if (sheetObj.GetCellValue(i, "rpt_id") == "" || sheetObj.GetCellValue(i, "rpt_id") == null) {
				// Please enter a Mandatory Value!
				alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COM_RPT'));
				// Focus on missing cell
				sheetObj.SelectCell(i, "rpt_id");			
				return false;
			}
		}
	}
	return true;
}
		

/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++] = sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj, sheetNo) {
	switch (sheetNo) {
	case 1: // IBSheet1 init
       with (sheetObj) {
       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, FrozenCol:0 } );

       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
       var headers = [ { Text:getLabel('RPTSETMNG_HDR'), Align:"Center"} ];
       InitHeaders(headers, info);

       var cols = [ {Type:"Text", Hidden:1, Width:60, Align:"Center", ColMerge:0, SaveName:"" },
                    {Type:"Status", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"ibflag" },
                    {Type:"Seq", Hidden:0, Width:30, Align:"Center",  ColMerge:1, SaveName:"", KeyField:0, CalcLogic:"", Format:"", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text", Hidden:0, Width:150, Align:"Left", ColMerge:0, SaveName:"call_id", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                    {Type:"PopupEdit", Hidden:0, Width:150, Align:"Left", ColMerge:0, SaveName:"rpt_id", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1, InputCaseSensitive:1 },
                    {Type:"Text", Hidden:1, Width:150, Align:"Left", ColMerge:0, SaveName:"rpt_id_org", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                    {Type:"Text", Hidden:0, Width:200, Align:"Left", ColMerge:0, SaveName:"rpt_nm", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                    {Type:"Text", Hidden:0, Width:200, Align:"Left", ColMerge:0, SaveName:"mrd_nm", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                    {Type:"Text", Hidden:0, Width:100, Align:"Left", ColMerge:0, SaveName:"mrd_path_cd", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                    {Type:"Text", Hidden:0, Width:100, Align:"Left", ColMerge:0, SaveName:"ppr_cd", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                    {Type:"Text", Hidden:0, Width:200, Align:"Left", ColMerge:0, SaveName:"set_nm", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                    {Type:"Text", Hidden:0, Width:350, Align:"Left", ColMerge:0, SaveName:"rmk", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                    {Type:"Text", Hidden:1, Width:55, Align:"Left", ColMerge:0, SaveName:"set_id", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:1 }
	              ];
        
           InitColumns(cols);
           var height = $(window).height();
           SetEditable(1);
           SetSheetHeight(height - 150);
       }                                                  
       break;
	}
}

//Open Report New Management Popup
function sheet1_OnPopupClick(sheetObj, row, col) {

	SELECTROW = row;
	var formObj = document.frm1;
	var colStr = sheetObj.ColSaveName(col);

	// Report ID
	if (colStr == "rpt_id") {
		var formObj = document.frm1;
		rtnary = new Array(1);
		rtnary[0] = "1";
		rtnary[1] = "";
		rtnary[2] = window;
		callBackFunc = "gridPopCall_rpt_id";
		modal_center_open('./NewReportMng_Pop.clt?pop_yn=Y', rtnary, 1150, 460, "yes");

	}
}

function gridPopCall_rpt_id(rtnVal) {
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		docObjects[0].SetCellValue(SELECTROW, "rpt_id", rtnValAry[0]);// Report ID
		if(!duplicateFlg) {
			docObjects[0].SetCellValue(SELECTROW, "rpt_nm", rtnValAry[1]);// Report Name
			docObjects[0].SetCellValue(SELECTROW, "mrd_nm", rtnValAry[2]);// MRD Name
			docObjects[0].SetCellValue(SELECTROW, "mrd_path_cd", rtnValAry[4]);// MRD Path Code
			docObjects[0].SetCellValue(SELECTROW, "ppr_cd", rtnValAry[6]);// Paper Code
			docObjects[0].SetCellValue(SELECTROW, "rmk", rtnValAry[7]);// Remark
		}
	}
}

function sheet1_OnSaveEnd(sheetObj, errMsg) {
	// Save success!
	if (errMsg == undefined || errMsg == null || errMsg == '') {
		// alert(getLabel('FMS_COM_NTYCOM'));
		showCompleteProcess();
	}
}

function sheet1_OnChange(sheetObj, Row, Col) {
	var formObj = document.frm1;

	switch (sheetObj.ColSaveName(Col)) {
	case "rpt_id":
		SELECTROW = Row;
		duplicateFlg = false;
		// Get param to check duplicate
		var rpt_id = sheetObj.GetCellValue(Row, "rpt_id");
		var call_id = sheetObj.GetCellValue(Row, "call_id");
		var set_id = sheetObj.GetCellValue(Row, "set_id");
		doAction(rpt_id, call_id, set_id);
		if(duplicateFlg) {
			sheetObj.SetCellValue(Row, "rpt_id","");
		} else {
			// Get list report new with report id
			ajaxSendPost(selectRptNwById, 'reqVal', '&goWhere=aj&bcKey=selectRptNwById&rpt_id='+rpt_id, './GateServlet.gsl');
			break;
		}
     	
	}
	
}

function doAction(rpt_id, call_id, set_id) {
	ajaxSendPost(dispAjaxReq, 'reqVal',	'&goWhere=aj&bcKey=searchRptIDKeyCode&rpt_id=' + rpt_id +'&call_id='+call_id+'&set_id='+set_id,'./GateServlet.gsl');
}

function dispAjaxReq(reqVal){
	var sheetObj = docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var rpt_id_org = sheetObj.GetCellValue(SELECTROW, "rpt_id_org");
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined' && doc[1] != rpt_id_org) {
			//[Report ID] is duplicated!
			alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COM_RPT') + ": " + doc[1] + "\n\n: ReportSetMng");
			var intRow = SELECTROW;
			sheetObj.SetCellValue(intRow, "rpt_nm ","");
			sheetObj.SetCellValue(intRow, "mrd_nm","");
			sheetObj.SetCellValue(intRow, "mrd_path_cd","");
			sheetObj.SetCellValue(intRow, "ppr_cd","");
			sheetObj.SetCellValue(intRow, "rmk","");
			sheetObj.SetCellValue(intRow, "rpt_id","");
			duplicateFlg = true;
		}	
	}
	else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ALT007') + " - " + doc[0] + "\n\n: ReportSetMng");
	}
}

function selectCallID(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	var sheetObj = docObjects[0];
	var formObj = document.frm1;
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			//Remove all data on sheet1
			sheetObj.RemoveAll();
			var rtnArr = doc[1].split('^@^');
			for ( var i = 0; i < rtnArr.length - 1; i++) {
				if (rtnArr[0] != null) {
					sheetObj.DataInsert(i + 1);
					sheetObj.SetCellValue(i + 1, "call_id", rtnArr[i], 0);
					//sheetObj.SetCellValue(i + 1, "ibflag", 'R');
				}
			}
		} else {
			alert(getLabel('FMS_COM_RPT_CALL_ID'));
			return;
		}
	} else {
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));
	}
}

function selectRptNwById(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	var sheetObj = docObjects[0];
	var formObj = document.frm1;
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			//
			var rtnArr = doc[1].split('^@^');
			sheetObj.SetCellValue(SELECTROW, "rpt_id", rtnArr[0], 0);
			sheetObj.SetCellValue(SELECTROW, "rpt_nm", rtnArr[1], 0);
			sheetObj.SetCellValue(SELECTROW, "mrd_nm", rtnArr[2], 0);
			sheetObj.SetCellValue(SELECTROW, "mrd_path_cd", rtnArr[3], 0);
			sheetObj.SetCellValue(SELECTROW, "ppr_cd", rtnArr[4], 0);
			sheetObj.SetCellValue(SELECTROW, "rmk", rtnArr[5], 0);
		} else {
			sheetObj.SetCellValue(SELECTROW, "rpt_id", "", 0);
			sheetObj.SetCellValue(SELECTROW, "rpt_nm", "", 0);
			sheetObj.SetCellValue(SELECTROW, "mrd_nm", "", 0);
			sheetObj.SetCellValue(SELECTROW, "mrd_path_cd", "", 0);
			sheetObj.SetCellValue(SELECTROW, "ppr_cd", "", 0);
			sheetObj.SetCellValue(SELECTROW, "rmk", "", 0);
		}
	} else {
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));	
	}
}
