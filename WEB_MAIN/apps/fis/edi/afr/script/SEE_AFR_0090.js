/**
 * 화면로드 후 초기값 세팅
 */
var TODAY;
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
}
function doWork(srcName){
	switch(srcName) {
		case "SEARCHLIST01":
			frm1.f_cmd.value=SEARCHLIST01;
			docObjects[0].DoSearch("SEE_AFR_0090GS.clt",   FormQueryString(frm1) );
		break;
		case "CLOSE":	//팝업종료
			ComClosePopup();
		break;
	}
}


//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var headerRowCnt=2;
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	doWork('SEARCHLIST01');
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
			with (sheetObj) {
		      SetConfig( { SearchMode:2, MergeSheet:8, Page:20, DataRowMerge:0, FrozenCol: 8 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SEE_AFR_0090_HDR'), Align:"Center"}];
		      InitHeaders(headers, info);
		      
		      var cols = [ {Type:"Date",     Hidden:0, Width:120,  Align:"Center", ColMerge:0, SaveName:"f_rgst_tms",     Format:"Ymd", PointCount:0, UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:80,   Align:"Center", ColMerge:0, SaveName:"f_msg_type",     UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:80,   Align:"Center", ColMerge:0, SaveName:"f_edi_sts",      UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Date",     Hidden:0, Width:120,  Align:"Center", ColMerge:0, SaveName:"f_msg_rcv_date", Format:"Ymd", PointCount:0, UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:150,  Align:"Left", ColMerge:0, SaveName:"f_err_msg",      Ellipsis:1, UpdateEdit:1, InsertEdit:0, MultiLineText:1 },
		                   {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  	ColMerge:0,   SaveName:"err_img",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:160,   Align:"Left", ColMerge:0, SaveName:"f_err_sol_msg",  Ellipsis:1, UpdateEdit:1, InsertEdit:0, MultiLineText:1 },
		                   {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  	ColMerge:0,   SaveName:"sol_img",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
		                 ];
		       
		      	InitColumns(cols);
//		      	InitViewFormat(0, "f_rgst_tms", "MM\\-dd\\-yyyy");
//		      	InitViewFormat(0, "f_msg_rcv_date", "MM\\-dd\\-yyyy");
		      	SetImageList(0,"web/img/main/icon_m.gif");
		      	SetImageList(1,"web/img/main/icon_m.gif");
		      	SetEditable(1);
		        SetSheetHeight(300);
			}
		break;
	}
}

function sheet1_OnSearchEnd() {
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	
	for(var i=1; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "err_img", 0);
		sheetObj.SetCellImage(i, "sol_img", 0);
	}
}


function sheet1_OnClick(sheetObj, Row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	 if (colStr == "err_img") {
		ComShowMemoPad4(sheetObj, Row, "f_err_msg", false, 250, 130, col, "f_err_msg");   
	}else if (colStr == "sol_img") {
		ComShowMemoPad4(sheetObj, Row, "f_err_sol_msg", false, 250, 130, col, "f_err_sol_msg");   
	}
}
