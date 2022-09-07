
//=========================================================
//*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
//=========================================================
//=========================================================
//*@FileName   : MGT_MAC_0010.jsp
//*@FileTitle  : MAC Address
//*@Description: MAC Address
//*@author     : Tuan.Chau
//*@version    : 
//*@since      :
//
//*@Change history:
//=========================================================
//Calendar flag value
var firCalFlag=false;

function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var formObj=document.frm1;
    var sheetObj=docObjects[0];
    switch(srcName) {
		//NEW 버튼을 눌렀을때 Default 데이터를 조회한다.
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST;
			sheetObj.DoSearch("MGT_MAC_0010GS.clt", FormQueryString(formObj) );
		
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
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    var now=new Date(); 				// 현재시간 가져오기
	var year=now.getFullYear(); 		// 년도 가져오기
	var month=now.getMonth() + 1; 		// 월 가져오기 (+1)
	var date=now.getDate(); 			// 날짜 가져오기
	if(month < 10)
		month="0" + month;
	if(date < 10)
		date="0" + date;
	frm1.f_enddt.value=month + '-' + date + '-' + year;
	setFromToDtEndPlus(document.frm1.f_strdt, 7, document.frm1.f_enddt, 0);
	doWork('SEARCHLIST');
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
 * param : sheetObj1 ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('MGT_MAC_0010_HDR1'), Align:"Center"} ];
			      InitHeaders(headers, info);

				  var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
					             {Type:"Seq",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"rgst_usrid",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"ip_addr",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					             {Type:"Date",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"rgst_tms",    KeyField:0,   CalcLogic:"",   Format:"YmdHm",      PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					             {Type:"Text",     Hidden:0, Width:100,   Align:"Left",  ColMerge:0,   SaveName:"sts_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 ,   UpdateEdit:0,   InsertEdit:0},
					             {Type:"Combo",     Hidden:0, Width:100,   Align:"Left",  ColMerge:0,   SaveName:"log_sts_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 ,   UpdateEdit:0,   InsertEdit:0},
					             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" }];
			      
	      		InitColumns(cols);

	      		SetEditable(1);
	      		SetColProperty('log_sts_cd', {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
	            SetSheetHeight(500);
	      		resizeSheet();
		   }                                                      
		break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function doDisplay(doWhat, obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 From ~ To 팝업 호출      
	        var cal=new ComCalendarFromTo(); 
	        cal.select(obj.f_strdt,  obj.f_enddt, 'MM-dd-yyyy');
	        break;
    }
}

function entSearch(){
	if(event.keyCode == 13){
		document.forms[0].f_CurPage.value='';
		doWork('SEARCHLIST');
	}
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}

function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}

function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}