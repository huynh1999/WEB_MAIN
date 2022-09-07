/*
 * 2010/08/16 김진혁 추가
 * 조회 조건 입력 후 엔터로 조회하기 위한 펑션
 */
function fncTpCodeSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("./EDI_ACI_0011GS.clt", FormQueryString(formObj) );
                    //디버깅
                   // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
                   // alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));
                }
    	   break;    
    	   
       	    case "CLOSE":
       	    	ComClosePopup(); 
       	    break;	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: EDI_ACI_0011.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: EDI_ACI_0011.002");
        }
	}
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;	
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.form.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
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
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    var arg=parent.rtnary;
	var formObj=document.form;
	
	formObj.f_port_rlt_cd.value=arg[0];	
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
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {
	          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	          
	          //MSG_KEY['EDI_ACI_0011_HDR'] = "Seq|Code|Warehouse|State|Address";
	          
	          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	          var headers = [ { Text:getLabel('EDI_ACI_0011_HDR'), Align:"Center"} ];
	          InitHeaders(headers, info);
	
	          var cols = [ {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"wh_id",     KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"wh_nm",     KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:0,  Width:60,  Align:"Left",    ColMerge:0,   SaveName:"ste_cd",       KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"wh_addr",  KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
	           
	          InitColumns(cols);
	
	          SetEditable(0);
	          SetFocusAfterProcess(1);
	          SetColProperty('s_class', {ComboText:"LOCATION|NODE", ComboCode:"L|N"} );
	          SetSheetHeight(240);
	          sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
           }                                                      
           break;
    }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var retArray="";	
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "loc_cd"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "nod_cd"));
	retArray += sheetObj.GetCellValue(Row, "wh_id");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "wh_nm");
	ComClosePopup(retArray); 
}
// Enter키 입력(keyDown 인식에러)
function sheet1_OnKeyUp(sheetObj, row, col, keyCode){
	if(keyCode==13){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}