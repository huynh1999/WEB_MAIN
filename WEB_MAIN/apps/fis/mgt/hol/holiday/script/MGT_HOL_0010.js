/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MGT_HOL_0010.js
*@FileTitle  : 휴일관리
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/29
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    // 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
    	   if(formObj.f_curr_tp_cd.value == ""){
    		   //Apply Scope Data Select
    		   alert(getLabel('FMS_COM_ALT001')+ "\n\n: MGT_HOL_0010.13");
    	   }
    	   else if(formObj.f_aply_fm_dt.value == "" || formObj.f_aply_to_dt.value ==""){
    		   //Apply Date Data Select
    		   alert(getLabel('FMS_COM_ALT001')+ "\n\n: MGT_HOL_0010.17");
    		   formObj.f_aply_fm_dt.focus();
    	   }
    	   else{
	            formObj.f_cmd.value=SEARCHLIST;
	            // 검증로직
	            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
	            	sheetObj.DoSearch("MGT_HOL_0010GS.clt", FormQueryString(formObj) );
	            }
    	   }
       break;
       case "ROWADD":
    	    var intRows=sheetObj.LastRow() +1;
			var newRowIdx=intRows -1;
			sheetObj.DataInsert(intRows);
			sheetObj.SetCellValue(intRows, 'to_curr_cd',dfCurrency);
			sheetObj.SetCellValue(intRows, 'to_rt_ut',dfUnit);
       break;
       case "REMOVE":
            formObj.f_cmd.value=REMOVE;
            	//'삭제하시겠습니까?')){
        		if(confirm(getLabel('FMS_COM_CFMDEL'))){
                    doProcess=true;
                    sheetObj.DoSave("MGT_HOL_0010GS.clt", FormQueryString(formObj),"ibflag",false);
                }
       break;
       case "ADD":    	   
    	   formObj.f_cmd.value=ADD;
    	   	//'저장하시겠습니까?')){
       		if(confirm(getLabel('FMS_COM_CFMSAV'))){
    		   doProcess=true;
    		   sheetObj.DoSave("MGT_HOL_0010GS.clt", FormQueryString(formObj),"ibflag",false);
    	   }
   	   break;
       case "CURRENCY_POPLIST":// 통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="1";
			callBackFunc = "CUSTOMER_POPLIST";
			modal_center_open('./CMM_POP_0040.clt', rtnary, 1150,480,"yes");
			
       break;
       case "TRDP_POPLIST":
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";
			rtnary[2]=window;
			callBackFunc = "TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
       break;
    }
}

function CUSTOMER_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		//formObj.bzc_curr_cd.value = rtnValAry[0];
		formObj.f_fm_curr_cd.value=rtnValAry[0];				
	}
}
function TRDP_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	var rtnValAry=rtnVal.split("|");
	frm1.f_trdp_cd.value=rtnValAry[0];
	frm1.f_trdp_nm.value=rtnValAry[2];
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
	//오늘날짜 가져오기(BookingNo 생성용)
    //현재날짜와 Default로 일주일 전날짜를 가져온다.
	var now=new Date(); 				// 현재시간 가져오기
	var year=now.getYear(); 			// 년도 가져오기
	var month=now.getMonth() + 1; 		// 월 가져오기 (+1)
	var date=now.getDate(); 			// 날짜 가져오기
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}	
	today=year +"-"+ month +"-"+ date;
	var default_day="7";
	var dateinfo=today.split("-");
	var src=new Date(dateinfo[0], dateinfo[1]-1, dateinfo[2]);
	src.setDate(src.getDate() - parseInt(default_day));
	var year=src.getYear();
	var month=src.getMonth() + 1;
	var date=src.getDate(); 
	if(month<10) month="0" + month;
	if(date<10) date="0" + date; 
	fromday=year + "-" + month + "-" + date;
	document.frm1.f_aply_fm_dt.value=fromday;
	document.frm1.f_aply_to_dt.value=today;	
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
		    with (sheetObj) {
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('MGT_HOL_0010_HDR1_1'), Align:"Center"},
                      { Text:getLabel('MGT_HOL_0010_HDR1_2'), Align:"Center"} ];
            InitHeaders(headers, info);
            var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"check_col" },
                {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"curr_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"fm_curr_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fm_rt_ut",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"to_curr_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"to_rt_ut",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"xch_rt_ut",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Combo",     Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"dt_clss_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aply_fm_dt",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aply_to_dt",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"proc_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"inv_xcrt_seq" },
                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"indexing" } ];
            InitColumns(cols);
            SetEditable(1);
            SetSetImageList(0,APP_PATH+"/web/img/button/btns_search.gif");
            SetSetImageList(1,APP_PATH+"/web/img/button/btns_calendar.gif");
            SetHeaderRowHeight(20);
            SetColProperty(3, {ComboText:"Customer|Standard", ComboCode:"N|S"} );
            SetColProperty(11, {ComboText:"Day|Month", ComboCode:"D|M"} );
            SetSheetHeight(410);
		   }                                                      
		break;
    }
}
//저장하기전 null 체크
function check_save_null(){
	var sheetObj=docObjects[0];
	var check_value=0;
	for(var i=1; i <= sheetObj.RowCount(); i++){
	if (sheetObj.GetCellValue(i, "trdp_cd") == "" && sheetObj.GetCellValue(i,"curr_tp_cd") != "S"){
			//Customer Code Data Insert
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_CUST') + "\n\n: MGT_HOL_0010.232");
			check_value ++;
			break;
		}		
	if (sheetObj.GetCellValue(i, "fm_curr_cd") == ""){
			//From Currency Data Insert.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_CURR') + "\n\n: MGT_HOL_0010.239");
			check_value ++;
			break;
		}
	if (sheetObj.GetCellValue(i, "to_curr_cd") == ""){
			//To Currency Data Insert.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_TCUR') + "\n\n: MGT_HOL_0010.246");
			check_value ++;
			break;
		}
	if (sheetObj.GetCellValue(i, "xch_rt_ut") == 0){
			//Exchange Rate Data Insert.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_EXRT') + "\n\n: MGT_HOL_0010.254");
			check_value ++;
			break;
		}
	}
	if(check_value == 0){
		doWork("ADD");
	}
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
        case 'DATE01':   // 달력 조회 From ~ To 팝업 호출
            var cal=new calendarPopupFromTo();
            cal.displayType="date";
            cal.select(formObj.f_aply_fm_dt, 'f_aply_fm_dt', formObj.f_aply_to_dt, 'f_aply_to_dt', 'yyyy-MM-dd');
        break;        
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet1_OnPopupClick(sheetObj, row, col){	
	switch(sheetObj.ColSaveName(col)){
		case 'trdp_cd':     //Trade Partner 조회
			rtnary=new Array(1);
		   	rtnary[0]="1";
		   	rtnary[1]="";
		   	rtnary[2]=window;
//		   	callBackFunc = "CUSTOMER_POPLIST";
//		   	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		   	
		   	var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   	    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				return;
			}
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(row, 'trdp_cd',rtnValAry[0]);
			sheetObj.SetCellValue(row, 'trdp_nm',rtnValAry[2]);
	    break;
		break;
		case 'fm_curr_cd':	//From Currency Code 조회
	    	rtnary=new Array(1);
	   		rtnary[0]="1";
	        var rtnVal=window.showModalDialog('./CMM_POP_0040.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(row, col,rtnValAry[0]);
			}
		break;
		case 'to_curr_cd':	//To Currency Code 조회
	    	rtnary=new Array(1);
	   		rtnary[0]="1";
	        var rtnVal=window.showModalDialog('./CMM_POP_0040.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(row, col,rtnValAry[0]);
			}
		break;
		case "aply_fm_dt":	//환률 유효일자 시작일
			if(sheetObj.GetCellValue(row, "fm_rt_ut").length == 0){
	    		sheetObj.SelectCell(row, "fm_rt_ut");
	    		//환율을 먼저 입력하십시오!
	    		alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_EXRT') + "\n\n: MGT_HOL_0010.355");
	    	}
			else if(sheetObj.GetCellValue(row, "to_curr_cd").length == 0){
	    		sheetObj.SelectCell(row, "to_curr_cd");
	    		//환율을 먼저 입력하십시오!
	    		alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_EXRT') + "\n\n: MGT_HOL_0010.360");
	    	}
	    	else{
	    		if(sheetObj.GetCellValue(row, "dt_clss_cd")=='D'){
	    			var cal=new calendarModalPopupGrid();
	    			cal.addX=70;
	    			cal.addY=220;
	    	        cal.select(sheetObj, 'sheet1', row, col, 'yyyy-MM-dd');
	        	}
	    	}
	    	break;
	}
}
function sheet1_OnDblClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col)=="aply_fm_dt"){	//환률 유효일자 시작일
		if(sheetObj.GetCellValue(row, "fm_rt_ut").length == 0){
    		sheetObj.SelectCell(row, "fm_rt_ut");
    		//환율을 먼저 입력하십시오!
    		alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_EXRT') + "\n\n: MGT_HOL_0010.381");
    	}
		else if(sheetObj.GetCellValue(row, "to_curr_cd").length == 0){
    		sheetObj.SelectCell(row, "to_curr_cd");
    		//환율을 먼저 입력하십시오!
    		alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_EXRT') + "\n\n: MGT_HOL_0010.386");
    	}
    	else{
    		if(sheetObj.GetCellValue(row,"dt_clss_cd")=='M'){
				var mCal=new calendarModalMonthGrid();
				mCal.addX=70;
				mCal.addY=220;	    			
				mCal.select(sheetObj, 'sheet1', row, col, "aply_to_dt", 'yyyy-MM-dd');
				sheetObj.SetSelectCol(row,"dt_clss_cd")(0);
			}
    	}
	}
}
function sheet1_OnChange(sheetObj, row, col) {
	switch(sheetObj.ColSaveName(col)){
		case "curr_tp_cd":	//공통 일반 구분
			//표준
			if(sheetObj.GetCellValue(row, "curr_tp_cd")=='S'){
				sheetObj.SetCellValue(row, "trdp_cd",'');
				sheetObj.SetCellValue(row, "trdp_nm",'');
				sheetObj.SetCellEditable(row, "trdp_cd",0);
				sheetObj.SetCellEditable(row, "trdp_nm",0);
			//일반
			}else if(sheetObj.GetCellValue(row, "curr_tp_cd")=='N'){
				sheetObj.SetCellValue(row, "trdp_cd",'');
				sheetObj.SetCellValue(row, "trdp_nm",'');
				sheetObj.SetCellEditable(row, "trdp_cd",1);
				sheetObj.SetCellEditable(row, "trdp_nm",1);
			}
		break;
		case "fm_rt_ut":	//From의 Rate Unit 변경 또는 To의 Rate Unit변경인 경우
			if(sheetObj.GetCellValue(row, "fm_rt_ut")==''){
				sheetObj.SelectCell(row, "fm_rt_ut");
			}else if(sheetObj.GetCellValue(row, "to_rt_ut")==''){
				sheetObj.SelectCell(row, "to_rt_ut");
			//계산
			}else{
				if(sheetObj.GetCellValue(row, "fm_rt_ut")>0){
					sheetObj.SetCellValue(row, "xch_rt_ut",getDivideFloatByNDecimalTp(sheetObj.GetCellValue(row, "to_rt_ut"), sheetObj.GetCellValue(row, "fm_rt_ut"), TP_TRM5));
				}
			}
		break;
		case "to_rt_ut":
			if(sheetObj.GetCellValue(row, "fm_rt_ut")==''){
				sheetObj.SelectCell(row, "fm_rt_ut");
			}else if(sheetObj.GetCellValue(row, "to_rt_ut")==''){
				sheetObj.SelectCell(row, "to_rt_ut");
			//계산
			}else{
				if(sheetObj.GetCellValue(row, "fm_rt_ut")>0){
					sheetObj.SetCellValue(row, "xch_rt_ut",getDivideFloatByNDecimalTp(sheetObj.GetCellValue(row, "to_rt_ut"), sheetObj.GetCellValue(row, "fm_rt_ut"), TP_TRM5));
				}
			}
		break;
		case "dt_clss_cd":	//Day/Month 구분
			//Data 초기화
			sheetObj.SetCellValue(row, "aply_fm_dt",'');
			sheetObj.SetCellValue(row, "aply_to_dt",'');
		break;
		case "aply_fm_dt":	//From 일자가 선택되고 일기준인 경우
			if(sheetObj.GetCellValue(row,  "dt_clss_cd")=='D'){
				sheetObj.SetCellValue(row, "aply_to_dt",sheetObj.GetCellValue(row, "aply_fm_dt"));
			}
		break;
		case "aply_to_dt":	//Apply Date From인 경우
			if(sheetObj.GetCellValue(row, "aply_fm_dt")!=''){
				checkRow=row;
					var chkDate=sheetObj.GetCellValue(row, "aply_fm_dt");
				//일자가 들어가 있는경우 중복 여부를 확인한다.
				var parmStr='&goWhere=aj&bcKey=searchInvCurr';
				parmStr += '&ck_trdp_cd=';
				parmStr += sheetObj.GetCellValue(row, "trdp_cd");
				parmStr += '&ck_fm_curr_cd=';
				parmStr += sheetObj.GetCellValue(row, "fm_curr_cd");
				parmStr += '&ck_to_curr_cd=';
				parmStr += sheetObj.GetCellValue(row, "to_curr_cd");
				parmStr += '&ck_dt_clss_cd=';
				parmStr += sheetObj.GetCellValue(row, "dt_clss_cd");
				parmStr += '&ck_aply_fm_dt=';
				parmStr += chkDate.replaceAll('-', '');
				ajaxSendPost(fincCheckResult,  'reqVal', parmStr, './GateServlet.gsl');
				if(sheetObj.GetCellValue(row, "dt_clss_cd")=='D'){
					sheetObj.SetCellValue(row, "aply_to_dt",sheetObj.GetCellValue(row, "aply_fm_dt"));
				}
			}
		break;
	}
}
var checkRow=-1;
function fincCheckResult(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	if(doc[1]=='N'){
    		//Already registered exchange rate.
    		alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_EXRT') + "\n\n: MGT_HOL_0010.496");
    		docObjects[0].SetCellValue(checkRow, "aply_fm_dt",'');
    		docObjects[0].SetCellValue(checkRow, "aply_to_dt",'');
   			checkRow=-1;
    	}
    }
    else{
    	//System err
    	alert(getLabel('FMS_COM_ERR001') + " - " + doc[0] + "\n\n: MGT_HIS_0020.213");
    }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var tbObj=getObj('pagingTb');
	var tmp=docObjects[0].GetCellValue(2, "indexing");
	if(tmp!=''){
		tmp=tmp.replaceAll('&lt;', '<');
		tmp=tmp.replaceAll('&gt;', '>');
		tmp=tmp.replaceAll('&#39;', '"');
		tmp=tmp.replaceAll('&quot;', '\'');
		tbObj.innerHTML=tmp;		
	}
}
