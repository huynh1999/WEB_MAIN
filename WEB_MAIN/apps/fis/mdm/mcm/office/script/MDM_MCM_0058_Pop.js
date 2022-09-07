/**
 * 파일 업로드 팝업에서 목록 Reload
 */
var rtnary=new Array(2);
var callBackFunc = "";
var ready_flg = false;

var chkVals = "";

function reloadRmkList(){
	searchGrid(1);
}
function doWork(srcName, strFlg){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    
    switch(srcName) {
		case "SEARCH":
			formObj.f_cmd.value = SEARCHLIST;
			sheetObj.DoSearch("ReportMngGS.clt", FormQueryString(formObj) );
			break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++] = sheet_obj;
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
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, FrozenCol:0 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('RPTMNG_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             // Hidden:0 ->화면에 보이는것 , Hidden:1 -> 화면에 안보이는것 
             var cols = [ {Type:"DelCheck", Hidden:1, Width:60, Align:"Center", ColMerge:0, SaveName:"curSelec" },
                          {Type:"Status", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"ibflag" },
                          {Type:"Text", Hidden:0, Width:200, Align:"Left", ColMerge:0, SaveName:"mrd_key", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"Text", Hidden:0, Width:300, Align:"Left", ColMerge:0, SaveName:"mrd", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"Text", Hidden:0, Width:100, Align:"Left", ColMerge:0, SaveName:"path", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"CheckBox", Hidden:1, Width:100, Align:"Left", ColMerge:0, SaveName:"ltr_dflt", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"CheckBox", Hidden:1, Width:100, Align:"Left", ColMerge:0, SaveName:"a4_en_dflt", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"CheckBox", Hidden:1, Width:100, Align:"Left", ColMerge:0, SaveName:"a4_zh_dflt", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"CheckBox", Hidden:1, Width:100, Align:"Left", ColMerge:0, SaveName:"a4_ja_dflt", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"Text", Hidden:0, Width:200, Align:"Left", ColMerge:0, SaveName:"pgm_id", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                          {Type:"Text", Hidden:0, Width:300, Align:"Left", ColMerge:0, SaveName:"rpt_desc", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 }
      	              ];
              
                 InitColumns(cols);
                 var height = $(window).height();
                 SetEditable(1);
                 SetSheetHeight(height - 200);
             }                                                       
         break; 
     }
}
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
}

function sheet1_OnDblClick(sheetObj,Row,Col){
	
	parent.docObjects[1].SetCellValue(parent.rtnary[0],"C3",sheetObj.Rows[Row].C3);
	parent.docObjects[1].SetCellValue(parent.rtnary[0],"C4",sheetObj.Rows[Row].C4);
	
	ComClosePopup();
}