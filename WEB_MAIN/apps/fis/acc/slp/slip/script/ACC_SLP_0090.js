/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : ACC_SLP_0090.jsp
 *@FileTitle : Year-End Processing
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
function setupPage(){
			loadPage();
		}
var TODAY;
var PROC_FLAG="N";
//#6462 [NTL]BALANCE SHEET & INCOME STATEMENT missmatch - Retained Earning Check Logic.
var checkRetainedEarning = "";
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "COMMAND01":
    	   
    	    // 52297 [COMMON] Year End Processing 처리 Validation 추가
    		var parmStr='&goWhere=aj&bcKey=searchYearEndProcessingValidation&s_last_ye_dt='+formObj.s_last_ye_dt.value+'&s_processing_year='+formObj.s_year_end_yyyy.value+formObj.s_year_end_mm.value+"01";
    		ajaxSendPost(searchYearEndProcessingValidationReq,  'reqVal', parmStr, './GateServlet.gsl');
    	   
    	   

       break;
       case "REFRESH":
	 	   location.reload();
	    break;
    }
}

/**
* searchYearEndProcessingValidationReq
* 52297 [COMMON] Year End Processing 처리 Validation 추가
*/
function searchYearEndProcessingValidationReq(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
    var doc=getAjaxMsgXML(reqVal);
    var cnt = "0";
    if(doc[0]=='OK'){
       if(doc[1] != undefined){
    	   cnt = doc[1]
       }else{
    	   
       }
    }
    
    if (cnt != "0" && formObj.year_end_chk[0].checked){ 
    
//    	#490 [CLA] YEAR END VALIDATION MESSAGE UPDATE (Reopen #52297)
    	var lastDay = (new Date(formObj.sel_year_end_yyyy.value, formObj.s_year_end_mm.value, 0)).getDate();
    	
    	alert("You must do Accounting Block as of " + formObj.s_year_end_mm.value + "-" + lastDay + "-" + formObj.sel_year_end_yyyy.value + " for all offices to proceed with Year End of " + formObj.s_year_end_mm.value + "-" + formObj.sel_year_end_yyyy.value + ".");
    	return;
//    	alert(getLabel('ACC_MSG150')); 
    }else{
    	if(formObj.year_end_chk[0].checked){	//Year-End Processing
		    formObj.f_cmd.value=COMMAND01;
			formObj.action.value='Year-End Processing';
	    	formObj.s_ye_action.value='Y';
	    	//#6462 [NTL]BALANCE SHEET & INCOME STATEMENT missmatch - Retained Earning Check Logic.
	    	ajaxSendPost(blockYearEndProcessingValidation,  'reqVal', '&goWhere=aj&bcKey=blockYearEndProcessing', './GateServlet.gsl');
	    	if(checkRetainedEarning != ""){
	    		alert(getLabel('ACC_MSG175') + checkRetainedEarning);
	    		return;
	    	}
	    }else if(formObj.year_end_chk[1].checked){	//Cancel Year-End Processing
	    	formObj.f_cmd.value=COMMAND02;
			formObj.action.value='Cancel Year-End Processing';
	    	formObj.s_ye_action.value='N';
	    }
	    var s_last_ye_dt=formObj.s_last_ye_dt.value;
		var last_y=eval(s_last_ye_dt.substr(6,4))+1;
	    if(formObj.year_end_chk[0].checked && last_y != formObj.s_year_end_yyyy.value){
	    	alert(getLabel('ACC_MSG123'));
	    	return;
	    }
	    if(confirm("Do you want to "+formObj.action.value+ "? ")){
	    	var intRows=sheetObj.LastRow() + 1;
	        sheetObj.DataInsert(intRows);
	        doProcess=true;
	       showProcess('WORKING', document);
	        sheetObj.DoAllSave("./ACC_SLP_0090GS.clt", FormQueryString(formObj), true);
	    } 
    }
}

//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
    for(var i=0;i<docObjects.length;i++){
	//khlee-시작 환경 설정 함수 이름 변경
	comConfigSheet(docObjects[i], SYSTEM_FIS);
	initSheet(docObjects[i],i+1);
	//khlee-마지막 환경 설정 함수 추가
	comEndConfigSheet(docObjects[i]);
	}
    setProcYearCombo();
}
function setProcYearCombo(){
	var formObj=document.frm1;
	var s_last_ye_dt=formObj.s_last_ye_dt.value;
	var sys_beg_ym=formObj.sys_beg_ym.value.substr(0,4);
	var s_year_end_mm=formObj.s_year_end_mm.value;
	if(s_last_ye_dt == ''){
		if( s_year_end_mm == '12'){
			s_last_ye_dt=eval(sys_beg_ym) - 1;
			s_last_ye_dt="12-31-" + s_last_ye_dt;
	    }else{
	    	s_last_ye_dt=formObj.sys_beg_ym.value + '01';
	    	s_last_ye_dt=addDate("d", -1, s_last_ye_dt, "");
	    	s_last_ye_dt=s_last_ye_dt.substring(4,6) + "-" + s_last_ye_dt.substring(6,8) + "-" + s_last_ye_dt.substring(0,4);
	    }
		formObj.s_last_ye_dt.value=s_last_ye_dt;
	} 
	var last_y=eval(s_last_ye_dt.substr(6,4)) + 1;
	if( s_year_end_mm == '12' || s_year_end_mm >= todayMonth()){
		for(var i=last_y; i < todayYear(); i++){
			$("#sel_year_end_yyyy").append("<option value='"+i+"'>"+i+"</option>");
		}
	}else{
		for(var i=last_y; i <= todayYear(); i++){
			$("#sel_year_end_yyyy").append("<option value='"+i+"'>"+i+"</option>");
		}
	}
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:      //IBSheet2 init
		with (sheetObj) {
		// 높이 설정
			
			(1, 0, 0, true);
			var cnt=0;

			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:"err", Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"Text",      Hidden:0,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"errMsg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
			 
			InitColumns(cols);
			SetVisible(0);
			SetEditable(1);
		} 
		break;
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
} 
function sheet1_OnSaveEnd(sheetObj, errMsg){
	hideProcess('WORKING', document);
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg == ""){
		showCompleteProcess();
	}
	//Last Processed End Year Date Set
	var parmStr='&goWhere=aj&bcKey=searchLastEndYearDate';
	ajaxSendPost(setLastEndYearDt,  'reqVal', parmStr, './GateServlet.gsl');
	$("#sel_year_end_yyyy option").remove();
	setProcYearCombo();
}
/**
* Last Processed End Year Date
*/
function setLastEndYearDt(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
       if(doc[1] != undefined){
    	   formObj.s_last_ye_dt.value=doc[1];
       }else{
    	   formObj.s_last_ye_dt.value="";
       }
    }
}
function setDateForm(){
	var formObj=document.frm1;
	if(formObj.year_end_chk[0].checked){	//Year-End Processing
		formObj.sel_year_end_yyyy.className="search_form";
		formObj.sel_year_end_yyyy.readOnly=false;
    }else if(formObj.year_end_chk[1].checked){	//Cancel Year-End Processing
    	formObj.sel_year_end_yyyy.className="search_form-disable";
		formObj.sel_year_end_yyyy.readOnly=true;
    }
}
//#6462 [NTL]BALANCE SHEET & INCOME STATEMENT missmatch - Retained Earning Check Logic.
function blockYearEndProcessingValidation(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1] != "null" && doc[1] != ""){
			checkRetainedEarning = doc[1];
		} else {
			checkRetainedEarning = "";
		}
	}
}
