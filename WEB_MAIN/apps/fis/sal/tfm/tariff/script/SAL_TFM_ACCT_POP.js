function doWork(srcName) {
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var formObj=document.form;
	try {
		switch(srcName) {
			case "SEARCHLIST":
				formObj.f_cmd.value=COMMAND04;
				sheetObj.DoSearch("SAL_TFM_ACCT_POP_1GS.clt", FormQueryString(formObj) );
				break;
			case "SAVE":
				if(docObjects[0].ColValueDup('nm_acct_cd', 0) > -1) {
					alert("Account codes are duplicated.");
					break;
				}
				formObj.f_cmd.value=COMMAND05;
				sheetObj.DoSave("SAL_TFM_0090GS.clt", FormQueryString(formObj), "ibflag", false);
				break;
			case "CLOSE":
				ComClosePopup();
				break;
		} // end switch
	} catch(e) {
		if(e == "[object Error]"){
			//Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002') + "\n\n: SAL_TFM_ACCT_POP.001");
		} else {
			//System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SAL_TFM_ACCT_POP.002");
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

			with(sheetObj) {

				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:"Del||Rate No.|seq|Type|Named Account|Named Account", Align:"Center"}
							  , { Text:"Del||Rate No.|seq|Type|Code|Name", Align:"Center"}
							  ];
				InitHeaders(headers, info);

				var cols = [
					  {Type:"DelCheck",  Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 }
					, {Type:"Status",    Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" }
					, {Type:"Text",      Hidden:1,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"rt_no",        KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"nm_acct_seq",  KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Combo",     Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"nm_acct_tp",   KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"PopupEdit", Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"nm_acct_cd",   KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:0,   SaveName:"nm_acct_nm",   KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
				];

				InitColumns(cols);
				SetColProperty( 'nm_acct_tp', {ComboCode:CUST_VNDR_CD, ComboText:CUST_VNDR_CD, DefaultValue:'TP'} );
				SetEditable(1);
				//  SetFocusAfterProcess(1);
				SetSheetHeight(260);
				sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
			}

			break;
	}
}

function sheet1_OnChange(sheetObj, Row, Col, Value) {
	if (sheetObj.ColSaveName(Col) == "nm_acct_tp") { console.log(Value);
		var info;
		if (Value == 'TP') {
			info = {Type:"PopupEdit",  Hidden:0,   Width:60,     Align:"Center",    ColMerge:1,   SaveName:"nm_acct_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 };
		} else if(Value == 'AG') {
			info = {Type:"Combo", ComboCode:ACCT_CD, ComboText:ACCT_CD};
		}
		sheetObj.InitCellProperty(Row, "nm_acct_cd", info);
	}
}

function sheet1_OnSearchEnd(sheetObj) {
	if(sheetObj.RowCount() > docObjects[0].HeaderRows()) {
		var info;
		var code;
		var name;
		for(var iRow=sheetObj.HeaderRows(); iRow<(sheetObj.HeaderRows()+sheetObj.RowCount()); iRow++) {
			code = sheetObj.GetCellValue(iRow, "nm_acct_cd");
			name = sheetObj.GetCellValue(iRow, "nm_acct_nm");
			if (sheetObj.GetCellValue(iRow, "nm_acct_tp") == 'TP') {
				info = {Type:"PopupEdit",  Hidden:0,   Width:60,     Align:"Center",    ColMerge:1,   SaveName:"nm_acct_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 };
			} else if(sheetObj.GetCellValue(iRow, "nm_acct_tp") == 'AG') {
				info = {Type:"Combo", ComboCode:ACCT_CD, ComboText:ACCT_CD};
			}
			sheetObj.InitCellProperty(iRow, "nm_acct_cd", info);

			sheetObj.SetCellValue(iRow, "nm_acct_cd", code);
			sheetObj.SetCellValue(iRow, "nm_acct_nm", name);
		}
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
		case "nm_acct_cd" :
			var opt_key_sec = "BL_SAME_AS_CNEE01";
			ajaxSendPost(ajaxSendPost_callback, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
			var cstmTpCd = "LN";
			var iata_val = "";
			rtnary=new Array(2);
			rtnary[0]="1";
			rtnary[2]=window;
			callBackFunc = "sheet1_OnPopupClick_nm_acct_cd";
			modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150, 650, "yes");
		break;
	}
}

function sheet1_OnPopupClick_nm_acct_cd(rtnVal){
	var formObj = document.frm1;
	if (rtnVal != "" && rtnVal != "undefined" && rtnVal != undefined) {
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "nm_acct_cd", rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "nm_acct_nm", rtnValAry[2]);
	}
}

function ajaxSendPost_callback(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		if(doc[1] == "N"){
			console.log("N");
		}
	}
}