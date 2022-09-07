/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   :  MGT_MGN_0010.js
*@FileTitle  : MGT_MGN_0010
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
        	   sheetObj.DoSearch("MGT_MGN_0010GS.clt", FormQueryString(formObj) );
           }
       break;
       case "ROWADD":
 			//var intRows=sheetObj.LastRow() + 1;
			var intRows = sheetObj.DataInsert();
			
			//if (intRows > 2) {
			//	sheetObj.SetCellValue(intRows,"ofc_cd",sheetObj.GetCellValue(intRows - 1, "ofc_cd"));
			//}
       break;
       case "ADD":    	   
    	   formObj.f_cmd.value=ADD;
    	   if ( fncGridCheck() ) {
    		   dupChkCtrbMgn();
    	   }
       break;
       case "CUST_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
			rtnary[0]="";
//			rtnary[1]=formObj.f_cust_nm.value;
			rtnary[1]="";
			rtnary[2]=window;
	   		
	   		callBackFunc = "CUST_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	   break;
       case "CUST_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
			rtnary[0]="";
			rtnary[1]=formObj.f_cust_nm.value;
			rtnary[2]=window;
	   		
	   		callBackFunc = "CUST_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
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

	      var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
	      var headers = [ { Text:getLabel('MGT_MGN_0010_HDR_1'), Align:"Center"},
	                      { Text:getLabel('MGT_MGN_0010_HDR_2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
	                   {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cust_cd",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20  },
	    	           {Type:"Text",      Hidden:0, Width:230,  Align:"Left",    ColMerge:1,   SaveName:"cust_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:200 },
		               {Type:"Combo",     Hidden:0, Width:150,  Align:"Center",  ColMerge:1,   SaveName:"ctrb_ofc_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"ctrb_ratio_yn",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, 	TrueValue:"Y" ,FalseValue:"N" },
		               {Type:"Float",     Hidden:0, Width:200,  Align:"Right",   ColMerge:1,   SaveName:"ctrb_mgn",    		KeyField:0,   CalcLogic:"",   Format:"Float",     	PointCount:2,   UpdateEdit:1,   InsertEdit:1, 	EditLen:23  },
		               {Type:"Date",      Hidden:0, Width:150,  Align:"Center",  ColMerge:0,   SaveName:"fm_dt",       		KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Date",      Hidden:0, Width:150,  Align:"Center",  ColMerge:0,   SaveName:"to_dt",       		KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ctrb_mgn_seq" },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
		       
	      InitColumns(cols);

	      SetEditable(1);
	      SetColProperty(0 ,"cust_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
	      SetColProperty("ctrb_ofc_cd", {ComboText:OFCCD, ComboCode:OFCCD} );
	      //InitViewFormat(0, "fm_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	      //InitViewFormat(0, "to_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
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

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	//removeFirstKeyField(docObjects[0]);
}

var cur_row;

function sheet1_OnPopupClick(sheetObj, row, col) {
	
	cur_row = row;
	
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	
	// Customer Code 조회
	if(colStr == "cust_cd"){
		var formObj=document.frm1;
		rtnary=new Array(1);
		rtnary[0]="1";
		rtnary[1]="";
		rtnary[2]=window;
		callBackFunc = "gridPopCall_cust_cd";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
   		
	}
}

function gridPopCall_cust_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "cust_cd", rtnValAry[0]);//Code
		docObjects[0].SetCellValue(cur_row, "cust_nm", rtnValAry[2]);//Code Name
	} 
}

function sheet1_OnChange(sheetObj, row, col) {
	switch (sheetObj.ColSaveName(col)) {
		case "cust_cd" :
			cur_row = row;
			codeNameAction('CUST_GRID', sheetObj.GetCellValue(row, col), 'Sheet');
		break;
		case "ctrb_mgn" :
			if (sheetObj.GetCellValue(row, "ctrb_ratio_yn") == "1" && sheetObj.GetCellValue(row, col) > 50) {
				alert(getLabel2('FMS_COM_ALT076',new Array("50")));
				sheetObj.SetCellValue(row, "ctrb_mgn", "");
				sheetObj.SelectCell(row, "ctrb_mgn");
				return;
			}
		break;
	}
	switch(sheetObj.ColSaveName(col)){
		case "cust_cd":
		case "ctrb_ofc_cd":
			var v_cust_cd = sheetObj.GetCellValue(row, "cust_cd");
			var v_ctrb_ofc_cd = sheetObj.GetCellValue(row, "ctrb_ofc_cd");
			
			if(v_cust_cd != '' && v_ctrb_ofc_cd != ''){
				if (!chkCtrbMgnGrid(v_cust_cd, v_ctrb_ofc_cd)){
					alert(getLabel('FMS_COM_ALT075')); // You cannot enter a different Contribution Office for the same customers.
					sheetObj.SetCellValue(row, "ctrb_ofc_cd", "");
					sheetObj.SelectCell(row, "ctrb_ofc_cd");
					return;
				}
			}
		break;
	}
}

function sheet1_OnClick(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="ctrb_ratio_yn"){
		sheetObj.SetCellValue(row, "ctrb_mgn", 0, 0);
	}
}

function fncGridCheck() {
	var sheetObj=docObjects[0];
	var intRow=sheetObj.RowCount();
	for ( var i=2 ; i < intRow+2 ; i++ ) {
		if(sheetObj.GetRowStatus(i)!="R"){
			if ( sheetObj.GetCellValue(i, "cust_cd") == "" || sheetObj.GetCellValue(i, "cust_cd") == null ) {
				// Please enter a Mandatory Value!
				alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_CUST'));
				sheetObj.SelectCell(i,"cust_cd");
				return false;
			}
			if ( sheetObj.GetCellValue(i, "ctrb_ofc_cd") == "" || sheetObj.GetCellValue(i, "ctrb_ofc_cd") == null ) {
				// Please enter a Mandatory Value!
				alert(getLabel('FMS_COM_ALT001') + "\n - " + "Contribution Office");
				sheetObj.SelectCell(i,"ctrb_ofc_cd");
				return false;
			}
			if (sheetObj.GetCellValue(i, "ctrb_mgn") == 0){
				// Input data must be greater than 0.
				alert(getLabel('FMS_COM_ALT042') + "\n - " + getLabel('CTRB_MGN'));
				sheetObj.SelectCell(i,"ctrb_mgn");
				return false;
			}
			if ( sheetObj.GetCellValue(i, "fm_dt") == "" || sheetObj.GetCellValue(i, "fm_dt") == null ) {
				// Please enter a Mandatory Value!
				alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('MAC_MSG52'));
				sheetObj.SelectCell(i,"fm_dt");
				return false;
			}
			if ( sheetObj.GetCellValue(i, "to_dt") == "" || sheetObj.GetCellValue(i, "to_dt") == null ) {
				// Please enter a Mandatory Value!
				alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('MAC_MSG51'));
				sheetObj.SelectCell(i,"to_dt");
				return false;
			}
			if ( sheetObj.GetCellValue(i, "fm_dt") > sheetObj.GetCellValue(i, "to_dt") ) {
				alert("To date must be greater than From date.");
				sheetObj.SelectCell(i,"fm_dt");
				return false;
			}
		}
	}
	return true;
}

var invalidYn;

function dupChkCtrbMgn() {
	invalidYn = "N";
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	var intRow=sheetObj.RowCount();
	
	for ( var i=2 ; i < intRow+2 ; i++ ) {
		if(sheetObj.GetRowStatus(i)== "I"){
			// 중복체크
 		   	ajaxSendPost(selectCtrbMgnCheck, 'reqVal', '&goWhere=aj&bcKey=selectCtrbMgnCheck&cust_cd='+sheetObj.GetCellValue(i, "cust_cd")+'&ctrb_ofc_cd='+sheetObj.GetCellValue(i, "ctrb_ofc_cd"), './GateServlet.gsl');
 		   
			if (invalidYn == "Y") {
				break;
			}
		}
	}
	if (invalidYn == "N") {
		if( confirm(getLabel('FMS_COM_CFMSAV')) ){    		   		   
 		   doProcess=true;
 		   sheetObj.DoSave("MGT_MGN_0010GS.clt", FormQueryString(formObj),"ibflag",false);
 	   }
	} else {
		return;
	}
}

function selectCtrbMgnCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]!='0'){
				alert(getLabel('FMS_COM_ALT075'));
				invalidYn = "Y";
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

/**
 * Contribution Margin 중복확인
 */
function chkCtrbMgnGrid(inCustCd, inSlsOfcCd){
 	var intRows=docObjects[0].LastRow() +1;
	var loopNum=0;
	for(var i=2; i < intRows; i++){
		var v_cust_cd = docObjects[0].GetCellValue(i, "cust_cd");
		var v_ctrb_ofc_cd = docObjects[0].GetCellValue(i, "ctrb_ofc_cd");
		
		if(inCustCd==v_cust_cd && inSlsOfcCd!=v_ctrb_ofc_cd){
			loopNum++;	
		}
	}
	if(loopNum==1){
		return false;
	}else{
		return true;
	}
}

var CODETYPE='';

/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	
	var s_type="trdpCode";
	CODETYPE = str;
	
	if ( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}
		
	} else if ( tmp == "onBlur" ) {
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		
	} else if( tmp == "Sheet" ){
		if (str == "CUST_GRID") {
			s_type = "trdpCode";
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+obj, './GateServlet.gsl');			
		}
	} else{
		if(obj.name == "f_cust_cd"){
			formObj.f_cust_nm.value="";
		}
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var Vals=rtnArr[0].split('@@^');
			
			if(CODETYPE == "CUST"){
				formObj.f_cust_cd.value=Vals[0]; 
				formObj.f_cust_nm.value=Vals[3];
				
			} else if(CODETYPE == "CUST_GRID"){
				sheetObj.SetCellValue(cur_row, "cust_cd", Vals[0], 0);
				sheetObj.SetCellValue(cur_row, "cust_nm", Vals[3], 0);
				
			}
			
		}else{
			if(CODETYPE == "CUST"){
				formObj.f_cust_cd.value="";
				formObj.f_cust_nm.value="";
				
			} else if(CODETYPE == "CUST_GRID"){
				sheetObj.SetCellValue(cur_row, "cust_cd", "", 0);
				sheetObj.SetCellValue(cur_row, "cust_nm", "", 0);
				
			} 
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function CUST_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cust_cd.value=rtnValAry[0];
		formObj.f_cust_nm.value=rtnValAry[2];
	}
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="to_dt"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 1);
	}
}