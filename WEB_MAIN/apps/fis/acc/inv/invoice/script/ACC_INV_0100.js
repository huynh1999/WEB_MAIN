var FROMDATE;
var TODAY;
var ENDDATE;
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            docObjects[0].DoSearch("./ACC_INV_0100GS.clt", FormQueryString(formObj) );
       break;
       case "CLOSE":
    	   ComClosePopup(); 
       break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Paging 항목 선택시 호출되
 */
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
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
    parent.rtnary;
    var arg= parent.rtnary;//window.dialogArguments;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//오늘일자구하기
	var now=new Date(); 				
	var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1;
	var date=now.getDate(); 	
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	if(month < 10){
		month="0"+(month);
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	if(date < 10){
		date="0"+date;
	}
	FROMDATE=premonth + "-" + "01" + "-" + preyear;
	TODAY=month + "-" + date + "-" + year;
	formObj.f_inv_seq.value=arg[0];
	if(formObj.f_inv_seq.value != ""){
		doWork("SEARCHLIST");
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
         case 1:      //IBSheet1 init
            with (sheetObj) {
	           (16, 0, 0, true);
	
	           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	           var headers = [ { Text:getLabel('ACC_INV_0100_HDR1_1'), Align:"Center"} ];
	           InitHeaders(headers, info);
	
	           var cols = [ {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"jnr_tp",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"ttl_pay_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"chk_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"bill_to_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"bill_to_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"inv_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"pay_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"bal_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Date",      Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"clr_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"bank_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"bank_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"rmk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Date",      Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"void_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Status",    Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	            
	           InitColumns(cols);
	
	           SetEditable(1);
	           SetColProperty('jnr_tp', {ComboText:"Payment|Deposit", ComboCode:"C|D"} );
	           SetSheetHeight(350);
	           //InitViewFormat(0, "post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	           //InitViewFormat(0, "void_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
           }                                                      
           break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(sheetObj.GetTotalRows() == 0){
		return;
	}
	sheetObj.SetRowBackColor(1,"#DFFFFF");
	formObj.bill_to.value=sheetObj.GetCellValue(1, "bill_to_nm");
	formObj.inv_amt.value=doMoneyFmt((sheetObj.GetCellValue(1, "inv_sum_amt")*1).toFixed(2));
	formObj.pay_amt.value=doMoneyFmt((sheetObj.GetCellValue(1, "pay_amt")*1).toFixed(2));
	formObj.due_amt.value=doMoneyFmt((sheetObj.GetCellValue(1, "bal_amt")*1).toFixed(2));
	var post_dt=sheetObj.GetCellValue(1, "post_dt");
	if(post_dt != ""){
		post_dt=post_dt.substring(4,6) + "-" + post_dt.substring(6,8) + "-" + post_dt.substring(0,4);
	}
	formObj.post_dt.value=post_dt;
	formObj.curr_cd.value=sheetObj.GetCellValue(1, "curr_cd");
	var clr_dt=sheetObj.GetCellValue(1, "clr_dt");
	if(clr_dt != ""){
		clr_dt=clr_dt.substring(4,6) + "-" + clr_dt.substring(6,8) + "-" + clr_dt.substring(0,4);
	}
	formObj.clr_dt.value=clr_dt;
	formObj.void_dt.value=sheetObj.GetCellText(1, "void_dt");
	formObj.chk_no.value=sheetObj.GetCellText(1, "chk_no");
	formObj.bank_nm.value=sheetObj.GetCellValue(1, "bank_nm");
	formObj.ttl_pay_amt.value=doMoneyFmt((sheetObj.GetCellValue(1, "ttl_pay_amt")*1).toFixed(2));
	formObj.rmk.value=sheetObj.GetCellValue(1, "rmk");
} 
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(i == Row){
			sheetObj.SetRowBackColor(i,"#DFFFFF");
		}else{
			sheetObj.SetRowBackColor(i,"#FFFFFF");
		}
	}
	formObj.bill_to.value=sheetObj.GetCellValue(Row, "bill_to_nm");
	formObj.inv_amt.value=doMoneyFmt(sheetObj.GetCellValue(Row, "inv_sum_amt"));
	formObj.pay_amt.value=doMoneyFmt(sheetObj.GetCellValue(Row, "pay_amt"));
	formObj.due_amt.value=doMoneyFmt(sheetObj.GetCellValue(Row, "bal_amt"));
	var post_dt=sheetObj.GetCellValue(Row, "post_dt");
	if(post_dt != ""){
		post_dt=post_dt.substring(4,6) + "-" + post_dt.substring(6,8) + "-" + post_dt.substring(0,4);
	}
	formObj.post_dt.value=post_dt;
	formObj.curr_cd.value=sheetObj.GetCellValue(Row, "curr_cd");
	var clr_dt=sheetObj.GetCellValue(Row, "clr_dt");
	if(clr_dt != ""){
		clr_dt=clr_dt.substring(4,6) + "-" + clr_dt.substring(6,8) + "-" + clr_dt.substring(0,4);
	}
	formObj.clr_dt.value=clr_dt;
	formObj.bank_nm.value=sheetObj.GetCellValue(Row, "bank_nm");
	formObj.ttl_pay_amt.value=doMoneyFmt(sheetObj.GetCellValue(Row, "ttl_pay_amt"));
	formObj.rmk.value=sheetObj.GetCellValue(Row, "rmk");
	formObj.void_dt.value=sheetObj.GetCellText(Row, "void_dt");
	formObj.chk_no.value=sheetObj.GetCellText(Row, "chk_no");
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal = new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_post_strdt,formObj.s_post_enddt, 'MM-dd-yyyy');
	    break;
        case 'DATE2':    //달력 조회 팝업 호출      
	        var cal = new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_inv_strdt,formObj.s_inv_enddt, 'MM-dd-yyyy');
        break;
    }
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }           
	}
}