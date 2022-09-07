/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   :  MGT_OFC_0010.js
*@FileTitle  : MGT_OFC_0010
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/10
=========================================================*/
/**
 * 화면로드 후 초기값 세팅
 */
var rtnary=new Array(1);
var callBackFunc = "";

function removeFirstKeyField(sheetObj) {
 $($('#DIV_' + ((typeof sheetObj == "string") ? sheetObj : sheetObj.id)).find('span.GMKeyfield')[0]).remove();
}

function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){
		return;
	}
    // 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
    	   formObj.f_cmd.value=SEARCHLIST;
           // 검증로직
           if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
        	   sheetObj.DoSearch("MGT_OFC_0010GS.clt", FormQueryString(formObj) );
           }
       break;
       case "ROWADD":
 			//var intRows=sheetObj.LastRow() + 1;
			var intRows = sheetObj.DataInsert();
			
			if (intRows > 2) {
				sheetObj.SetCellValue(intRows,"ofc_cd",sheetObj.GetCellValue(intRows - 1, "ofc_cd"));
			}
       break;
       case "ADD":    	   
    	   formObj.f_cmd.value=ADD;
    	   if ( fncGridCheck() ) {
    		   dupChkOfcIncnt();
    	   }
    	   break;
    }
}
// --------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
function loadPage() {
    for(var i=0;i<docObjects.length;i++){
        // khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        // khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    //removeFirstKeyField(docObjects[0]);
    
    frm1.f_ofc_cd.focus();
}
/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:      // IBSheet1 init
		  with(sheetObj){
	      
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('MGT_OFC_0010_HDR_1'), Align:"Center"},
	                      { Text:getLabel('MGT_OFC_0010_HDR_2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"check_col" },
	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
	             {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",        		KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0, Width:130,  Align:"Center",  ColMerge:1,   SaveName:"yrmon",  	   		KeyField:1,   CalcLogic:"",   Format:"Ym", 		    PointCount:0,   UpdateEdit:0,   InsertEdit:1, 	EditLen:7  },
	             {Type:"Float",     Hidden:0, Width:150,  Align:"Right",   ColMerge:1,   SaveName:"tgt_amt",       		KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1, 	EditLen:18 },
	             {Type:"Int",       Hidden:0, Width:150,  Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct",      KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1, 	EditLen:5  },
	             {Type:"Int",       Hidden:0, Width:150,  Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct",      KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1, 	EditLen:5  },
	             {Type:"Int",       Hidden:0, Width:150,  Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1, 	EditLen:5  },
	             {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"use_flg",       		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ofc_incnt_seq" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
	       
	      InitColumns(cols);

	      SetEditable(1);
	      InitViewFormat(0, "yrmon", "MM\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	      SetColProperty(8, {ComboText:"Enable|Disable", ComboCode:"Y|N"} );
	      SetColProperty("ofc_cd", {ComboText:OFCCD, ComboCode:OFCCD} );
	      SetHeaderRowHeight(20);
	      SetSheetHeight(500);
	      resizeSheet();
	      }
		break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST');
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
	        var cal=new ComCalendar();
	        cal.setDisplayType("month");
	        cal.select(formObj.f_yrmon, 'MM-yyyy');
        break;
    }
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	//removeFirstKeyField(docObjects[0]);
}

function fncGridCheck() {
	var sheetObj=docObjects[0];
	var intRow=sheetObj.RowCount();
	for ( var i=2 ; i < intRow+2 ; i++ ) {
		if(sheetObj.GetRowStatus(i)!="R"){
			if ( sheetObj.GetCellValue(i, "ofc_cd") == "" || sheetObj.GetCellValue(i, "ofc_cd") == null ) {
				// Please enter a Mandatory Value!
				alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('OFC_CD'));
				sheetObj.SelectCell(i,"ofc_cd");
				return false;
			}
			if ( sheetObj.GetCellValue(i, "yrmon") == "" || sheetObj.GetCellValue(i, "yrmon") == null ) {
				// Please enter a Mandatory Value!
				alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('MONTH'));
				sheetObj.SelectCell(i,"yrmon");
				return false;
			}
			if (sheetObj.GetCellValue(i, "tgt_amt") == 0){
				// Input data must be greater than 0.
				alert(getLabel('FMS_COM_ALT042') + "\n - " + getLabel('TGT_AMT'));
				sheetObj.SelectCell(i,"tgt_amt");
				return false;
			}
		}
	}
	return true;
}

var dupYn;

function dupChkOfcIncnt() {
	dupYn = "N";
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	var intRow=sheetObj.RowCount();
	
	for ( var i=2 ; i < intRow+2 ; i++ ) {
		if(sheetObj.GetRowStatus(i)== "I"){
			// 중복체크
 		   	ajaxSendPost(selectOfcIncntDupCheck, 'reqVal', '&goWhere=aj&bcKey=selectOfcIncntDupCheck&ofc_cd='+sheetObj.GetCellValue(i, "ofc_cd")+'&yrmon='+sheetObj.GetCellValue(i, "yrmon"), './GateServlet.gsl');
 		   
			if (dupYn == "Y") {
				break;
			}
		}
	}
	if (dupYn == "N") {
		if( confirm(getLabel('FMS_COM_CFMSAV')) ){    		   		   
 		   doProcess=true;
 		   sheetObj.DoSave("MGT_OFC_0010GS.clt", FormQueryString(formObj),"ibflag",false);
 	   }
	} else {
		return;
	}
}

function selectOfcIncntDupCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]!='0'){
				alert(getLabel('FMS_COM_ALT008'));
				dupYn = "Y";
				return;
			} else {
				return;
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}	

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		showCompleteProcess();
		doWork('SEARCHLIST');
	}
}

function sheet1_OnChange(sheetObj, row, col) {
	switch(sheetObj.ColSaveName(col)){
		case "ofc_cd":
		case "yrmon":
			if(sheetObj.GetCellValue(row, "ofc_cd") != '' && sheetObj.GetCellValue(row, "yrmon") != ''){
				if (!dupChkOfcIncntGrid(sheetObj.GetCellValue(row, "ofc_cd"), sheetObj.GetCellValue(row, "yrmon"))){
					alert(getLabel('FMS_COM_ALT008'));
					sheetObj.SetCellValue(row, sheetObj.ColSaveName(col), "");
					return;
				}
			}
		break;
	}
}

/**
 * Office Incentive 중복확인
 */
function dupChkOfcIncntGrid(inOfcCd, inYrmon){
 	var intRows=docObjects[0].LastRow() +1;
	var loopNum=0;
	for(var i=2; i < intRows; i++){
		if(inOfcCd==docObjects[0].GetCellValue(i, 'ofc_cd') && inYrmon==docObjects[0].GetCellValue(i, 'yrmon')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}

/**
 * 입력된 문자열이 일자 Format YYYYMM이 맞는지를 확인 - (/, -, .) 제거되고 비교
 * @param str   문자열
 * @return true 일자 , false
*/
function isValidMMYYYY ( obj ) {
   str=obj.value.replace(/\/|\-|\./g,"");
   if(trim(str).length==0){
	return;   
   }
   if (!isNumSlash(obj) && !isNumPeriod(obj) && !isNumDash(obj)) {
	   alert(getLabel('FMS_COM_ALT040'));
	   obj.value="";
       return;
   }
   if (str.length != 6) {
	   alert(getLabel('FMS_COM_ALT040'));
	   obj.value="";
       return;
   }
   var year=str.substring(2,6);
   var month=str.substring(0,2);
   if ( parseInt2( year ) >= 1900  && isMonth( month )){
	   obj.value=month+"-"+year;
       return;
   }else {
	   alert(getLabel('FMS_COM_ALT040'));
	   obj.value="";
       return;
   }
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="use_flg"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 1);
	}
}