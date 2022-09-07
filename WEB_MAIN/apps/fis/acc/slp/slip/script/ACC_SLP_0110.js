/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : ACC_SLP_0110.jsp
 *@FileTitle : Accounting Block / Unblock
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
var TODAY;
var PROC_FLAG="N";
function setupPage(){
	loadPage();
}
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":	        
	   break;
       case "COMMAND01":
    	    if(formObj.s_block_dt.value == ""){
    	    	alert(getLabel('ACC_MSG121'));
    	    	return;
    	    }
    	    if(formObj.sel_month_cls_vat_ym.selectedIndex != 0){
    	    	alert(getLabel('ACC_MSG145'));
    	    	return;
    	    }
    	    if(confirm(getLabel('FMS_COM_CFMSAV'))){
    	    	formObj.f_cmd.value=COMMAND01;
    	    	var intRows=sheetObj.LastRow() + 1;
    	        sheetObj.DataInsert(intRows);
    	        doProcess=true;
                showProcess('WORKING', document);
    	        sheetObj.DoAllSave("./ACC_SLP_0110GS.clt", FormQueryString(formObj), true);
    	    }
       break;
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
    ajaxSendPost(setFirstClrDt,  'reqVal', '&goWhere=aj&bcKey=searchFirstClrDt', './GateServlet.gsl');
    setProcMonthYearCombo();
}

var first_clr_dt = "";
var last_jnr_dt = "";

function setProcMonthYearCombo(){
	ajaxSendPost(setLastJnrDt, 'reqVal', '&goWhere=aj&bcKey=searchLastJnrDt', './GateServlet.gsl');
	
	if(first_clr_dt == "" && last_jnr_dt == "" ) return;
	
	var formObj = document.frm1;
	var today = new Date();
	
	var start_y = "";
	var start_m = "";
	
	if(last_jnr_dt != ""){
		var start_ym = new Date(last_jnr_dt.substring(0,4), eval(last_jnr_dt.substring(4,6)) + 1, 0);
		start_y = start_ym.getFullYear();
		start_m = start_ym.getMonth() + 1;
	} else {
		start_y = first_clr_dt.substring(0,4);
		start_m = first_clr_dt.substring(4,6);
		if(start_m.substring(0,1) == "0") start_m = start_m.substring(1,2);
	}
	
	var end_ym = today.getFullYear() + "";
		end_ym+= (today.getMonth()+1)<10?'0'+(today.getMonth()+1):(today.getMonth()+1) + "";
		end_ym+= today.getDate() + "";
	
	end_ym = new Date(end_ym.substring(0,4), eval(end_ym.substring(4,6)) - 1, 0);
	var end_y = end_ym.getFullYear();
	var end_m = end_ym.getMonth() + 1;
	
	for(var i = start_y; i <= end_y; i++){
		var fr_mm;
		var to_mm;
		
		if(start_y == end_y){
			fr_mm = start_m;
			to_mm = end_m;
		}else{
			if(i == start_y){
				fr_mm = start_m;
				to_mm = 12;
			}else if(i == end_y){
				fr_mm = 1;
				to_mm = end_m;
			}else{
				fr_mm = 1;
				to_mm = 12;
			}
		}
		
		for(var j = fr_mm; j <= to_mm; j++){
			j = j<10?'0'+j:j;
			$("#sel_month_cls_vat_ym").append("<option value='"+i+j+"'>"+j+"-"+i+"</option>");
		}
	}
	setBlockDate();
}

function setBlockDate(){
	var formObj = document.frm1;
	var blockDate = new Date(formObj.sel_month_cls_vat_ym.value.substring(0,4), formObj.sel_month_cls_vat_ym.value.substring(4,6), 0);
	var month = blockDate.getMonth() + 1;
	var day   = blockDate.getDate();
	var year  = blockDate.getFullYear();
    if(month<10){month = '0'+ month;}
    if(day<10){day =  '0' + day;}

    formObj.s_block_dt.value = month + "-" + day + "-" + year;
    formObj.s_clr_ym.value = formObj.sel_month_cls_vat_ym.value;
}

/**
* First Clear Date
*/
function setFirstClrDt(reqVal){
	var formObj=document.frm1;
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
       if(doc[1] != undefined){
    	   first_clr_dt=doc[1];
       }
    }
}

/**
* Last Journalizing Date
*/
function setLastJnrDt(reqVal){
	var formObj=document.frm1;
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
       if(doc[1] != undefined){
    	   last_jnr_dt=doc[1];
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
//			SetSheetHeight(0);
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
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	hideProcess('WORKING', document);
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg == ""){
		$("#sel_month_cls_vat_ym option").remove();
		setProcMonthYearCombo();
		showCompleteProcess();
	}
}