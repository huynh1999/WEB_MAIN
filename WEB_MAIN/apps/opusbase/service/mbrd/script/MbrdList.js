/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MbrdList.js
*@FileTitle  : 게시판 목록 화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/25
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	//doHideProcess();
	setFromToDt(fName.f_dp_bgn_dt, fName.f_dp_end_dt);
	//setFromToDt(fName.f_due_bgn_dt, fName.f_due_end_dt);
}
function doWork(srcName){
    try {
        switch(srcName){
            case "SEARCHLIST":
            	if(!formValidation()) return;
            	fName.f_cmd.value=SEARCHLIST;
            	//fName.f_kind.value = fName.s_kind.value;
            	//alert(fName.s_kind.value);
        	    fName.f_CurPage.value=1;
        	    //return;
        	    docObjects[0].DoSearch("MbrdListGS.usr", FormQueryString(fName) );
   		    break;
            case "SEARCH01":
        	    fName.f_cmd.value=SEARCHLIST;
        	    docObjects[0].DoSearch("MbrdListGS.usr", FormQueryString(fName) );
   		    break;
   		    case "NEW":	//신규 작성화면 이동
            	//doShowProcess();
   		    	fName.f_cmd.value=COMMAND01;
   		    	fName.action='./MbrdMngRead.usr';
                fName.submit();
    	    break;
   		    case "COMMAND02":	//게시물 내용확인
            	//doShowProcess();
		    	fName.f_cmd.value=COMMAND02;
   		    	fName.action='./MbrdMngRead.usr';
                fName.submit();
    	    break;
   			case "CLOSE":
   				ComClosePopup(); 
   	    	break;   
   			case "PROGRAM_POPLIST":   
   				rtnary=new Array(2);
				rtnary[0]=fName.f_pgm_id.value;
				rtnary[1]=fName.f_pgm_nm.value;
				callBackFunc = "PROGRAM_POPLIST";
		   		modal_center_open('./ProgramPopList.usr', rtnary, 556,610,"yes");
			break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: MbrdList.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: MbrdList.002");
        }
    }
}
function PROGRAM_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	  return;
	} else {
	  var rtnValAry=rtnVal.split("|");
	  fName.f_pgm_id.value=rtnValAry[0];
	  fName.f_pgm_nm.value=rtnValAry[1];
	}
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCH01');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat 
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
            var cal = new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.f_dp_bgn_dt,formObj.f_dp_end_dt, 'MM-dd-yyyy');
        break;
    }
    switch(doWhat){
    case 'DATE2':   //달력 조회 From ~ To 팝업 호출 

    	var cal = new ComCalendarFromTo();
        cal.displayType="date";
        cal.select(formObj.f_due_bgn_dt,formObj.f_due_end_dt, 'MM-dd-yyyy');
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
    if(fName.s_kind.value == '')
    {
    	fName.f_kind[0].selected=true;
    }else if(fName.s_kind.value == '1')
    {
    	fName.f_kind[fName.s_kind.value].selected=true;
    }
    //-------------------[20140110 OJG]-------------------- 아래 계정에 대해서 PARAMETER 제거
	//if(fName.usrid.value == 'cltmaster' || fName.usrid.value == 'steveback' || fName.usrid.value == 'jaykim' ){	//'cltmaster', 'steveback', 'jaykim'
		fName.f_pgm_id.value="";
		fName.f_pgm_nm.value="";
		fName.f_modi_usrid.value="";
		fName.f_modi_eng_usr_nm.value="";
	//	}
	//-------------------[20140110 OJG]--------------------
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
	        (13, 0, 0, true);
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('MBRD_LIST_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Seq",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no" },
	               {Type:"Text",     Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"title" },
	               {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pgm_nm" },
	               {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"brd_knd" },
	               {Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"user_id" },
	               {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"user_name" },
	               {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"reg_date",   KeyField:0,   CalcLogic:"",   Format:"Ymd" },
	               {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"due_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd" },
	               {Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"brd_ctnt" },
	               {Type:"Text",      Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"file_url",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"loc_url" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"brd_seq" } ];
	         
	        InitColumns(cols);

	        SetEditable(0);
	        SetImageList(0,APP_PATH+"/web/img/button/bt_img.gif");
	        InitViewFormat(0, "reg_date", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        InitViewFormat(0, "due_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        SetSheetHeight(500);
		   }                                                      
		break;
    }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for(var i=1; i<=sheetObj.LastRow();i++){
		var paramUrl=sheetObj.GetCellValue(i, "title");
		if ( paramUrl != "" ) {
			sheetObj.SetCellFont("FontUnderline", i,"title",1);
			sheetObj.SetCellFontColor(i, "title","#0000FF");
		}
	}	
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
function sheet1_OnClick(callSheet, row, col) {
	var colStr=callSheet.ColSaveName(col);
	var s_brd_seq;
	var s_loc_url;
	if(colStr=='title'){
		fName.f_brd_seq.value=callSheet.GetCellValue(row,"brd_seq");
		doWork('COMMAND02');
	}else if(colStr=='file_url')
	{
	if(callSheet.GetCellImage(row, "file_url")==0){
		s_brd_seq=callSheet.GetCellValue(row,"brd_seq");
		s_loc_url=callSheet.GetCellValue(row,"loc_url");
            downloadFile('org',s_brd_seq, s_loc_url);
    	}		
	}
}
//파일 다운로드
function downloadFile(downType,s_brd_seq, s_loc_url){
	document.frm2.docType.value=downType;
	document.frm2.s_brd_seq.value=s_brd_seq;
	//alert(s_loc_url.indexOf("http://"));
	if(s_loc_url == '' || s_loc_url.indexOf("http://")== -1 || s_loc_url.indexOf(":8001/opusfwd")== -1)
	{
		return;
	}
	document.frm2.action=s_loc_url+'/GateServletNSession.gsl';
	document.frm2.submit();
}
function isAlphaNum(){
	var key=window.event.keyCode;
	//alert('key  '+key);
	if ( key == 13  || key == 9 )
	{   // 엔터,TAB
		return true;
	}
	if(window.event.shiftKey == true){ 
		window.event.returnValue=false;
		return true;
    } 
	if (key == 91 || key == 92 || key == 93 || key == 229 || key == 21 || key == 25 || key == 19 ) return true;
	if (key >= 112 && key <= 123) {       // function key
		window.event.returnValue=true;
		return true;
	}
	if ((key == 40) || (key == 38 )) {    // 위, 아래 화살표
		window.event.returnValue=true;
		return true;
	}
	if (( key > 95) && ( key < 106 )) {   // 우측 키패드 숫자 key
		window.event.returnValue=true;
		return true;
	}
	if (( key > 47) && ( key < 58 )) {    // 키보드 상단 숫자 key
		window.event.returnValue=true;
		return true;
	}
	if (( key == 37)||( key == 39 )||( key == 46)||( key == 8 ) ) {  // 좌,우 화살표,DEL,BACKS,-
		window.event.returnValue=true;
		return true;
	}
	if (window.event.altKey || window.event.shiftKey || window.event.ctrlKey) 
	{ 
		window.event.returnValue=true;
		return true;
	}
	if (( key > 36) && ( key < 41 )) 
	{    // 좌,상,우,하 화살표
		window.event.returnValue=true;
		return true;
	}
	if (( key > 32) && ( key < 37 )) 
	{    // Page-Up, Page-Down, End, Home
		window.event.returnValue=true;
		return true;
	}
	if (( key == 45) || ( key == 46 ) || ( key == 144 )) 
	{    // Insert,Delete,NumLock
		window.event.returnValue=true;
		return true;
	}
	if (( key == 46)||( key == 8 )||( key == 17)||( key == 18 )||( key == 20)||( key == 27 )) 
	{  // DEL,BACKS,Ctrl,Alt,CapsLock,Esc
		window.event.returnValue=true;
		return true;
	}
	window.event.returnValue=false;
	//alert('숫자만 입력 가능합니다.');
	return false;
}
function formValidation(){
	var formObj=document.forms[0];
	if(trim(formObj.f_dp_bgn_dt.value)!= "" && trim(formObj.f_dp_end_dt.value) != ""){
		if(getDaysBetweenFormat(formObj.f_dp_bgn_dt,formObj.f_dp_end_dt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: MbrdList.262");
			formObj.f_dp_end_dt.focus();
			return false;
		}
	}
	if(trim(formObj.f_due_bgn_dt.value)!= "" && trim(formObj.f_due_end_dt.value) != ""){
		if(getDaysBetweenFormat(formObj.f_due_bgn_dt,formObj.f_due_end_dt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: MbrdList.271");
			formObj.f_due_end_dt.focus();
			return false;
		}
	}	
	return true;
}
function pgmCodeAction(c_forms, t_forms){
	//var formObj = document.forms[0];
	if(fName.f_pgm_id.value == ''){
		fName.f_pgm_nm.value="";
	}
	return true;
}
