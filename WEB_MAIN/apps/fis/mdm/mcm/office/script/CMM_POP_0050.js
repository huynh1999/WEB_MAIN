function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
	            formObj.f_cmd.value=SEARCHLIST;
	            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
	            	sheetObj.DoSearch("./CMM_POP_0050GS.clt", FormQueryString(formObj) );
	            }
    	   break;    
       	    case "CLOSE":
       	    	ComClosePopup(); 
       	    break;	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0050.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0050.002");
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
	var arg = parent.rtnary;
	//alert("arg===>["+arg[0]+"]");
	var formObj=document.form;
//	formObj.openMean.value=arg[0];
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
//    doWork('SEARCHLIST');
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
                // 높이 설정
        	 
        	

        	 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	 var headers = [ { Text:getLabel('CMM_POP_0050_HDR'), Align:"Center"} ];
        	 InitHeaders(headers, info);

        	 var cols = [ {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"ofc_depth" },
        	              {Type:"Text",     Hidden:0,  Width:250,  Align:"Left",    ColMerge:0,   SaveName:"ofc_eng_nm",   TreeCol:0 ,  LevelSaveName:"ofc_eng_nm" },
        	              {Type:"Text",     Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"ofc_cd" },
        	              {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnt_ofc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 } ];
        	  
        	 InitColumns(cols);
        	 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
        	 SetEditable(0);
//        	 InitTreeInfo(1, "ofc_eng_nm", "#0000FFNAN");
        	 SetSheetHeight(500);
           }
           break;
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var retArray="";	
	retArray += sheetObj.GetCellValue(Row, "ofc_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ofc_eng_nm");
	ComClosePopup(retArray); 
}
