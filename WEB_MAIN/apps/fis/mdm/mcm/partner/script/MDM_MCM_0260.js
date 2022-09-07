/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0250.js
*@FileTitle  : Trade Partner ManagementList
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/

function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj1 = docObjects[0];//#2827 : [BINEX]Fresh Cargo C/I & P/L 기능 수정
	var sheetObj2 = docObjects[1];
	var formObj=document.form;
	switch(srcName) {
		case "DEFAULT":
			frm1.f_cmd.value = -1;
			formObj.submit();
			break;
		case "ROWADD1":
			if(!saveValid2(sheetObj1)){
				return;
			} else{
				setSaveKeyValue();
				var intRows=sheetObj1.LastRow()+1;
				sheetObj1.DataInsert(intRows);
				sheetObj1.SetCellValue(intRows,"item_nm",$("#h_item_nm").val());
				sheetObj1.SetCellValue(intRows,"item_sys_no",$("#h_item_sys_no").val());
			}
			break;
		case "SAVE1":
//			var modiMsg="Do you want to save?";//좌측 목록에서 선택후 수정한 경우
			if(saveValid2(sheetObj1) && dupCheck(sheetObj1)){
				setSaveKeyValue();
//				if ( confirm(modiMsg) ) {
					formObj.f_cmd.value = MULTI;
					if(sheetObj1.DoSave("MDM_MCM_0260_1GS.clt", FormQueryString(formObj) + "&sheet=1","ibflag",true)){
						formObj.f_cmd.value = SEARCHLIST;
						sheetObj1.DoSearch("MDM_MCM_0260_1GS.clt", FormQueryString(formObj) + "&sheet=1");
						sheetObj2.DoSearch("MDM_MCM_0260_2GS.clt", FormQueryString(formObj) + "&sheet=2" );
					}

//				}
			}
			break;
		case "SEARCHLIST":
			//sheetObj.ShowDebugMsg = true;
			formObj.f_cmd.value=SEARCHLIST;
			//검증로직
			if(saveValid(sheetObj1)){
				//저장 정보 세팅 //#2827 [BINEX]Fresh Cargo C/I & P/L 기능 수정
				formObj.h_ctrt_no.value = formObj.f_ctrt_no.value;
				formObj.h_ctrt_nm.value = formObj.f_ctrt_nm.value; 
				formObj.h_item_no.value = formObj.f_item_no.value;
				formObj.h_item_nm.value = formObj.f_item_nm.value;
				formObj.h_item_sys_no.value = formObj.f_item_sys_no.value;				
				
				sheetObj1.DoSearch("MDM_MCM_0260_1GS.clt", FormQueryString(formObj) + "&sheet=1");
			}
			if(saveValid(sheetObj2)){
				sheetObj2.DoSearch("MDM_MCM_0260_2GS.clt", FormQueryString(formObj) + "&sheet=2");
			}
			//sheetObj.ShowDebugMsg = false;
			break;

		case "SEARCHLIST2":
			//sheetObj.ShowDebugMsg = true;
			formObj.f_cmd.value=SEARCHLIST;
			//검증로직
			if(saveValid(sheetObj2)){
				sheetObj2.DoSearch("MDM_MCM_0260_2GS.clt", FormQueryString(formObj) + "&sheet=2");
			}
			break;
		case "ROWADD":
			if(saveValid2(sheetObj2)){
				setSaveKeyValue();
				var intRows=sheetObj2.LastRow()+1;
				sheetObj2.DataInsert(intRows);
				sheetObj2.SetCellValue(intRows,"item_nm",$("#h_item_nm").val());
				sheetObj2.SetCellValue(intRows,"item_sys_no",$("#h_item_sys_no").val());
			}
			break;
		case "SAVE":
			var modiMsg="Do you want to save?";//좌측 목록에서 선택후 수정한 경우
			if(saveValid2(sheetObj2)){
				setSaveKeyValue();
				if ( confirm(modiMsg) ) {
					formObj.f_cmd.value=ADD;
					sheetObj2.DoSave("MDM_MCM_0260_2GS.clt", FormQueryString(formObj)+ "&sheet=2","ibflag",false);
				}
			}
			break;
		}
}

function saveValid(sheetObj){
	// 필수 입력값 체크
	var checkBool = false;
	var index;
	$.each(requiredFrom,function(idx, item){
		if($("#"+item.id).val() ==""){
			index = idx;
			checkBool = true;
			return false;
		}
	});
	if(checkBool){
		alert(getLabel('FMS_COM_ALT001')+ "\n\n: " + requiredFrom[index].msg);
		return false;
	}
	var rows=sheetObj.LastRow()+1;

	return true;
}

//#2827 [BINEX]Fresh Cargo C/I & P/L 기능 수정
function saveValid2(sheetObj){
	var formObj=document.form;
	
	if(form.h_item_nm.value == "" 
	   || form.h_item_sys_no.value == ""
	   || form.h_ctrt_no.value == ""
    ){
		alert(getLabel('FMS_COM_ALT039'));
		return false;
	}
	return true;
}

//#2827 [BINEX]Fresh Cargo C/I & P/L 기능 수정
function setSaveKeyValue(){
	var formObj=document.form;
	formObj.f_ctrt_no.value = formObj.h_ctrt_no.value;
	formObj.f_ctrt_nm.value = formObj.h_ctrt_nm.value; 
	formObj.f_item_no.value = formObj.h_item_no.value;
	formObj.f_item_nm.value = formObj.h_item_nm.value;
	formObj.f_item_sys_no.value = formObj.h_item_sys_no.value;		
}

//sheet1의 dup 체크
function dupCheck(sheetObj){
	var rtn = true;
	var dupRow = sheetObj.ColValueDup("item_nm|item_dtl_cd_tp|item_dtl_cd", 0);
	if(dupRow>0) {
		alert(getLabel('MDM_COM_ALT009'));
		sheetObj.SetSelectRow(dupRow);
		rtn = false;
	}
	return rtn;
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[1].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST2', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST2');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST2');
}
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
    setRequiredFrom();
}
var requiredFrom = [];
function setRequiredFrom(){
	$.each($(":input:text"),function(idx, item){
		if(item.getAttribute("required")){
			requiredFrom.push({"id": item.id, "msg": item.getAttribute("msg")});
		}
	});
}
//Contract No 조회
function searchTlCtrtInfo(){
	var formObj=document.form;
	if(formObj.f_ctrt_no.value != "" || formObj.f_ctrt_nm.value != "" ){		
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.f_ctrt_no.value, './GateServlet.gsl');
	}
}
function resultCtrtInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.f_ctrt_nm.value=rtnArr[0];
			}
			else{
				formObj.f_ctrt_no.value="";
				formObj.f_ctrt_nm.value="";
			}
		}
		else{
			formObj.f_ctrt_no.value="";
			formObj.f_ctrt_nm.value="";
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
//Item code
function searchItemCodeInfo(){
	var formObj=document.form;
	if(formObj.f_item_no.value != "" || formObj.f_item_nm.value != "" ){
		var sParam="ctrt_no=" + formObj.f_ctrt_no.value + "&item_cd=" + encodeURIComponent(formObj.f_item_no.value);
		ajaxSendPost(resultsearchWHItemCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
		//ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.f_ctrt_no.value, './GateServlet.gsl');
	}
}

function resultsearchWHItemCodeInfo (reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.f_item_nm.value = rtnArr[3];
				formObj.h_item_sys_no.value = rtnArr[0];
				formObj.f_item_sys_no.value = rtnArr[0];

			}
		}
		else{
			formObj.f_item_nm.value = "";
			formObj.f_item_no.value = "";
			formObj.h_item_sys_no.value = "";
		}
	}
}

function btn_ctrt(ctrt_nm){
	var formObj=document.form;
	var sUrl="ContractRoutePopup.clt?ctrt_nm="+(ctrt_nm == undefined ? "" : ctrt_nm);	
    callBackFunc = "setCtrtNoInfo";
    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
}
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ctrt_no.value=rtnValAry[0];//full_nm
		formObj.f_ctrt_nm.value=rtnValAry[1];//full_nm
	}
}
function btn_ctrt_item(item_nm){
	var formObj=document.form;
	var sUrl="CtrtItemPopup.clt?ctrt_no="+formObj.f_ctrt_no.value + "&item_nm=" + (item_nm == undefined ? "" : item_nm) ;
    callBackFunc = "setCtrtItemNo";
    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
}
function setCtrtItemNo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_item_no.value=rtnValAry[0];//full_nm
		formObj.f_item_nm.value=rtnValAry[1];//full_nm
		formObj.f_item_sys_no.value=rtnValAry[3];//full_nm
	}
}
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ctrt_no.value=rtnValAry[0];//full_nm
		formObj.f_ctrt_nm.value=rtnValAry[1];//full_nm
	}
}

function setVLPSComboListSheet2(){
	//#2827 : [BINEX]Fresh Cargo C/I & P/L 기능 수정
	var sheetObj1 = docObjects[0];
	var sheetObj2 = docObjects[1];
	//sheet2의 V/L/P/S 콤보 코드 세팅z
	var findColNameArray = ["is_v", "is_l", "is_p", "is_s"];
	var comboNameArray = ["var_nm", "lbl_nm", "pck_tp_nm", "sz_nm"];
	var sRow;
	var arrRow;
	var cCode = "";

	for(var cbIdx=0; cbIdx < 4; cbIdx++) {
		sRow = sheetObj1.FindCheckedRow(findColNameArray[cbIdx]);//
		cCode = "";
		if(sRow != -1) {
			arrRow =  sRow.split("|");
			for (var idx=0; idx < arrRow.length; idx++){
				if(parseInt(arrRow[idx]) > -1) {
					cCode += "|" + sheetObj1.GetCellValue(arrRow[idx], "item_dtl_cd");
				}
			}
			sheetObj2.SetColProperty(comboNameArray[cbIdx], {ComboText:cCode, ComboCode:cCode} );
		}
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
	         SetConfig( { SearchMode:0, MergeSheet:5, DataRowMerge:0 } );
	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	         var headers = [ { Text:getLabel('MDM_MCM_0260_HDR1'), Align:"Center"}];
	         InitHeaders(headers, info);
	         var cols = [
     	            {Type:"DelCheck",	Hidden:0, Width:50,	Align:"Center",	ColMerge:0,	SaveName:"",				KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,	UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
    	            {Type:"Status",	Hidden:1,	Width:10,	Align:"Center",	ColMerge:0,	SaveName:"ibflag" },
    	            {Type:"Text",	Hidden:0,	Width:300,	Align:"Center",	ColMerge:0,	SaveName:"item_nm",			KeyField:1,	CalcLogic:"",	Format:"",	PointCount:0,	UpdateEdit:0,   InsertEdit:0 },
    	            {Type:"Combo",	Hidden:0,	Width:120,	Align:"Center",	ColMerge:0,	SaveName:"item_dtl_cd_tp",	KeyField:1,	CalcLogic:"",	Format:"",	PointCount:0,	UpdateEdit:1,   InsertEdit:1 },
    	            {Type:"Text",	Hidden:0,	Width:100,	Align:"Center",	ColMerge:0,	SaveName:"item_dtl_cd",		KeyField:1,	CalcLogic:"",	Format:"",	PointCount:0,	UpdateEdit:1,   InsertEdit:1 },
    	            {Type:"Int",	Hidden:0,	Width:80,	Align:"Center",	ColMerge:0,	SaveName:"srt_seq",			KeyField:1,	CalcLogic:"",	Format:"",	PointCount:0,	UpdateEdit:1,   InsertEdit:1 },
    	            {Type:"CheckBox",Hidden:1,	Width:20,	Align:"Center",	ColMerge:0,	SaveName:"is_v" },
    	            {Type:"CheckBox",Hidden:1,	Width:20,	Align:"Center",	ColMerge:0,	SaveName:"is_l" },
    	            {Type:"CheckBox",Hidden:1,	Width:20,	Align:"Center",	ColMerge:0,	SaveName:"is_p" },
    	            {Type:"CheckBox",Hidden:1,	Width:20,	Align:"Center",	ColMerge:0,	SaveName:"is_s" },
    	            {Type:"Text",	Hidden:1,	Width:40,	Align:"Center",	ColMerge:0,	SaveName:"item_dtl_cd_tp_nm" },
    	            {Type:"Text",	Hidden:1,	Width:40,	Align:"Center",	ColMerge:0,	SaveName:"ctrt_no" },
    	            {Type:"Text",	Hidden:1,	Width:40,	Align:"Center",	ColMerge:0,	SaveName:"item_sys_no" },
    	            {Type:"Text",	Hidden:1,	Width:40,	Align:"Center",	ColMerge:0,	SaveName:"item_dtl_cd_seq" }
	             ];
	         InitColumns(cols);
	         SetEditable(1);
	         SetSheetHeight(310);
	         SetColProperty('item_dtl_cd_tp', {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
	       }
	       break;
         case 2:      //IBSheet2 init
            with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('MDM_MCM_0260_HDR2'), Align:"Center"}, { Text:getLabel('MDM_MCM_0260_HDR2_1'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [ {Type:"DelCheck", Hidden:0,	Width:50,   Align:"Center",	ColMerge:1,	SaveName:"",			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
                          {Type:"Status",	Hidden:1,	Width:10, 	Align:"Center",	ColMerge:1,	SaveName:"ibflag" },
                          {Type:"Text",  	Hidden:0,	Width:200,	Align:"Center",	ColMerge:1,	SaveName:"item_nm",		KeyField:0,	CalcLogic:"",	Format:"",     	PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
                          {Type:"Text",  	Hidden:0,	Width:120,	Align:"Left",  	ColMerge:1,	SaveName:"attr_nm",		KeyField:0,	CalcLogic:"",	Format:"",     	PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
                          {Type:"CheckBox",Hidden:0,	Width:70,	Align:"Center",	ColMerge:1,	SaveName:"vsbl_flg", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , TrueValue:"Y" ,FalseValue:"N" },
                          {Type:"Combo",	Hidden:0,	Width:120,	Align:"Center",	ColMerge:1,	SaveName:"var_nm",		KeyField:0,	CalcLogic:"",	Format:"",     	PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
                          {Type:"Combo",	Hidden:0,	Width:120,	Align:"Center",	ColMerge:1,	SaveName:"lbl_nm",		KeyField:0,	CalcLogic:"",	Format:"",     	PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
                          {Type:"Combo",	Hidden:0,	Width:120,	Align:"Center",	ColMerge:1,	SaveName:"pck_tp_nm",	KeyField:0,	CalcLogic:"",	Format:"",     	PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
                          {Type:"Combo",	Hidden:0,	Width:80, 	Align:"Center",	ColMerge:1,	SaveName:"sz_nm",		KeyField:0,	CalcLogic:"",	Format:"",     	PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
                          {Type:"Float", 	Hidden:0,	Width:90, 	Align:"Right", 	ColMerge:0,	SaveName:"grs_kgs_wgt",	KeyField:0,	CalcLogic:"",	Format:"NullFloat", PointCount:3,	UpdateEdit:1,	InsertEdit:1 },
                          {Type:"Float", 	Hidden:0,	Width:90, 	Align:"Right", 	ColMerge:0,	SaveName:"grs_lbs_wgt",	KeyField:0,	CalcLogic:"",	Format:"NullFloat", PointCount:3,	UpdateEdit:1,	InsertEdit:1 },
                          {Type:"Float", 	Hidden:0,	Width:90, 	Align:"Right", 	ColMerge:1,	SaveName:"net_kgs_wgt",	KeyField:0,	CalcLogic:"",	Format:"NullFloat", PointCount:3,	UpdateEdit:1,	InsertEdit:1 },
                          {Type:"Float", 	Hidden:0,	Width:90, 	Align:"Right", 	ColMerge:0,	SaveName:"net_lbs_wgt",	KeyField:0,	CalcLogic:"",	Format:"NullFloat", PointCount:3,	UpdateEdit:1,	InsertEdit:1 },
                          {Type:"Float", 	Hidden:0,	Width:120,	Align:"Right", 	ColMerge:0,	SaveName:"inv_amt",		KeyField:0,	CalcLogic:"",	Format:"Float",	PointCount:2,	UpdateEdit:1,	InsertEdit:1 },
                          {Type:"Text",  	Hidden:1,	Width:40, 	Align:"Center",	ColMerge:1,	SaveName:"ctrt_no" },
                          {Type:"Text",  	Hidden:1,	Width:40, 	Align:"Center",	ColMerge:1,	SaveName:"item_sys_no" },
                          {Type:"Text",  	Hidden:1,	Width:40, 	Align:"Center",	ColMerge:1,	SaveName:"item_atrr_seq" }
                       ];
             InitColumns(cols);
             SetEditable(1);
             SetSheetHeight(350);
//             SetColProperty('var_nm', {ComboText:itemNms, ComboCode:itemCds} );
//             SetColProperty('lbl_nm', {ComboText:itemNms, ComboCode:itemCds} );
//             SetColProperty('pck_tp_nm', {ComboText:itemNms, ComboCode:itemCds} );
//             SetColProperty('sz_nm', {ComboText:itemNms, ComboCode:itemCds} );
             resizeSheet();
           }
           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[1]);
}

/*
 * sheet1 조회 후 sheet2의 combo setting
 */
function sheet1_OnSearchEnd(sheetObj, errMsg){
	setVLPSComboListSheet2();
}

//sheet1 등록/수정/삭제 후 sheet2 재조회
function sheet1_OnSaveEnd(sheetObj, errMsg){
}

//조회 후 페이지징 표시
function sheet2_OnSearchEnd(sheetObj, errMsg){
	doDispPaging(sheetObj.GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
//등록/수정/삭제 후 페이지징 표시
function sheet2_OnSaveEnd(sheetObj, errMsg){
	doDispPaging(sheetObj.GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
function sheet2_OnDblClick(sheetObj,Row,Col){

}
function sheet2_OnChange(sheetObj, Row, Col, Value){
	if(Col == 9 || Col == 10 || Col == 11 || Col == 12){
		weightChange(sheetObj, Row, Col, Value)
	}
}
function weightChange(sheetObj, Row, Col, Value){
	if(Col == 9 || Col == 11){
		var rndXLValue=roundXL(Value * CNVT_CNST_KG_LB, 2);
		if(Col == 9){
			sheetObj.SetCellValue(Row, "grs_lbs_wgt",rndXLValue,0);
		}else{
			sheetObj.SetCellValue(Row, "net_lbs_wgt",rndXLValue,0);
		}
	}
	else{
		var rndXLValue=roundXL(Value / CNVT_CNST_KG_LB, 2);
		if(Col == 10){
			sheetObj.SetCellValue(Row, "grs_kgs_wgt",rndXLValue,0);
		}else{
			sheetObj.SetCellValue(Row, "net_kgs_wgt",rndXLValue,0);
		}
	}
}
