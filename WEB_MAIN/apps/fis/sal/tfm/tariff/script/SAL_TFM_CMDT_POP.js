/*
 * 2010/08/16 김진혁 추가
 * 조회 조건 입력 후 엔터로 조회하기 위한 펑션
 */
function fncTpCodeSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		//doWork('SEARCHLIST');
	}
}

function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var formObj=document.form;
	try {
		switch(srcName) {
			case "SEARCHLIST":
				formObj.f_cmd.value=COMMAND02;
				sheetObj.DoSearch("SAL_TFM_CMDT_POP_1GS.clt", FormQueryString(formObj) );
				break;
			case "SAVE":
				if(docObjects[0].ColValueDup('cmdt_cd', 0) > -1) {
					alert("Commodity codes are duplicated.");
					break;
				}
				formObj.f_cmd.value=COMMAND03;
				sheetObj.DoSave("SAL_TFM_0090GS.clt", FormQueryString(formObj), "ibflag", false);
				break;
			case "CLOSE":
				ComClosePopup();
				break;
		} // end switch
	} catch(e) {
		if(e == "[object Error]"){
			//Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002') + "\n\n: SAL_TFM_CMDT_POP.001");
		} else {
			//System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SAL_TFM_CMDT_POP.002");
		}
	}
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
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
	var arg = parent.rtnary;
	var formObj=document.form;

	formObj.rt_no.value=arg[0];
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}

	if(arg[0] != "") {
		doWork('SEARCHLIST');
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

/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:
			with(sheetObj){

				//no support[check again]CLT if (location.hostname != "") //InitHostInfo(location.hostname, location.port, page_path);

				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:"Del||Rate No.|Code|Name|Group", Align:"Center"} ];
				// var headers = [ { Text:getLabel('cnt_cd|cnt_eng_nm'), Align:"Center"} ];
				InitHeaders(headers, info);

				var cols = [
					  {Type:"DelCheck",  Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",    KeyField:0,   CalcLogic:"",   Format:"",        PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 }
					, {Type:"Status",    Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" }
					, {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rt_no",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"PopupEdit", Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"cmdt_cd",    KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Text",      Hidden:0,  Width:450,  Align:"Left",    ColMerge:0,   SaveName:"cmdt_nm",    KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"hs_grp_cd",  KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
				];

				InitColumns(cols);
				SetEditable(1);
				//  SetFocusAfterProcess(1);
				SetSheetHeight(260);
				sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
			}

			break;
	}
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == "" || errMsg == undefined || errMsg == null){
		doWork("SEARCHLIST");
	}
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column)
 */
function sheet1_OnDblClick(sheetObj,Row,Col) {
	var formObj=document.form;
	var openMean=formObj.openMean.value ;
	var retArray="";
	retArray += sheetObj.GetCellValue(Row, "cnt_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cnt_eng_nm");
	ComClosePopup(retArray);
}

function addRow() {
	var formObj = document.form;
	var currRow = sheet1.LastRow() + 1;
	sheet1.DataInsert(sheet1.LastRow()+1);
	sheet1.SetCellValue(currRow, "rt_no", formObj.rt_no.value);
}

var cur_row;
var cur_col;
var rtnary=new Array(1);
var callBackFunc = "";
function sheet1_OnPopupClick(sheetObj, row, col){
	cur_row = row;
	var formObj=document.form;
	switch (sheetObj.ColSaveName(col)) {
		case 'cmdt_cd' :
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";	//Commodity code	   		
			callBackFunc = "sheet1_OnPopupClick_cmdt_cd";	   		
			modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
			break;
	}
}

function sheet1_OnPopupClick_cmdt_cd(rtnVal) {
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "cmdt_cd", rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "cmdt_nm", rtnValAry[2]);
		docObjects[0].SetCellValue(cur_row, "hs_grp_cd", rtnValAry[5]);
	}
}