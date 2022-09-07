/*=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : SEE_BKG_0020.js
 *@FileTitle  : Consolidation List
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2017/03/14
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var firCalFlag = false;
function initFinish() {
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	// setFromToDtEndPlus(document.frm1.etd_strdt, 180, document.frm1.etd_enddt,
	// 30);
}
function doWork(srcName, valObj) {
	if (!btnGetVisible(srcName)) {
		return;
	}
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
	var formObj = document.frm1;	
	var sheetObj1 = docObjects[0];
	try {
		switch (srcName) {		
		case "SEARCHLIST": 
			if (!formValidation())
				return;
			searchValueSet();
			if (validateForm(sheetObj1, formObj, SEARCHLIST, 1)) {
				formObj.f_cmd.value = SEARCHLIST;	
				sheetObj1.DoSearch("./SEE_BKG_0020GS.clt", FormQueryString(formObj));
				//Log Monitor Start
		   		gLogMonitor();
   	 			//Log Monitor End

			}			
			break;   
		case "DELETE":
			formObj.f_cmd.value = REMOVE;
			if (confirm(getLabel('FMS_COM_CFMDEL'))) {
				sheetObj1.DoSave("./SEE_BKG_0020GS.clt", FormQueryString(formObj),"ibflag",false);
			}
			break;
			
		case "NEW":
			parent.mkNewFrame('Consolidation Entry', './SEE_BKG_0010.clt');
			break;
			
		case "PRINT":
			var reqParam='?f_plan_no='+sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "plan_no")+'&f_bkg_seq='+sheetObj1.GetCellValue(sheet1.GetSelectRow(), "bkg_seq");
			popGET('CMM_POP_0460.clt'+reqParam, '', 500, 350, "scroll:yes;status:no;help:no;");
			break;
			
		}// end switch
		
		//Log Monitor Start:Btn
		if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
		//Log Monitor End:Btn
		
	} catch (e) {
		if (e == "[object Error]") {
			// Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			// System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e);
		}
	}
}
/**
 * 화면에서 사용하는 메소드
 * 
 * @param doWhat
 * @param formObj
 * @return
 */
function doDisplay(doWhat, formObj) {	
	switch (doWhat) {
	case 'DATE11': // 달력 조회 From ~ To 팝업 호출
		cal=new ComCalendarFromTo();
		cal.displayType = "date";
		cal.select(formObj.etd_strdt, formObj.etd_enddt, 'MM-dd-yyyy');
		break;	
	case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
    	var cal=new ComCalendarFromTo();
        cal.displayType="date";
        cal.select(formObj.eta_strdt,  formObj.eta_enddt,  'MM-dd-yyyy');
        break;
	}
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage) {
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value = callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList() {
	doWork('SEARCHLIST');
}

function clearAll(){
	//docObjects[0].RemoveAll();
	var formObj = document.frm1;	
	
	formObj.f_plan_no.value = "";
	formObj.pol_cd.value = "";
	formObj.pol_nm.value = "";
	formObj.etd_strdt.value = "";
	formObj.etd_enddt.value = "";
	
	formObj.f_bkg_nm.value = "";
	formObj.pod_cd.value = "";
	formObj.pod_nm.value = "";
	formObj.eta_strdt.value = "";
	formObj.eta_enddt.value = "";
	
	formObj.f_bl_nm.value = "";
	formObj.trnk_vsl_cd.value = "";
	formObj.trnk_vsl_nm.value = "";
	formObj.f_cntr_nm.value = "";
}

// --------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
function loadPage() {	
	var formObj = document.frm1;	
	for ( var i = 0; i < docObjects.length; i++) {
		// khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i], i + 1);
		// khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	
	doWork("SEARCHLIST");
}

/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}

function setShortcut() {	
	doWork('SEARCHLIST');
}

/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj, sheetNo) {
	switch (sheetNo) {
	case 1: // IBSheet1 init
		with (sheetObj) {
        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
        var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
        var headers = [ { Text:getLabel('SEE_BKG_0020_HDR1'), Align:"Center"} ];
        InitHeaders(headers, info);
        var cols = [ 
                     {Type:"Radio",  	Hidden:0,  Width:60,   	Align:"Center",	ColMerge:0,   SaveName:"check_flag",        KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                     {Type:"Status",    Hidden:1,  Width:30,   	Align:"Center", ColMerge:1,   SaveName:"ibflag",      		KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                     {Type:"Text",      Hidden:0,  Width:120,   Align:"Center", ColMerge:0,   SaveName:"plan_no",       	KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,	Align:"Center", ColMerge:0,   SaveName:"con_status",       	KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:120,   Align:"Center", ColMerge:0,   SaveName:"system_bkg_no",		KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:120,   Align:"Center", ColMerge:0,   SaveName:"carrier_bkg_no",	KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",   ColMerge:0,   SaveName:"trnk_vsl_nm",   	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:70,    Align:"Center", ColMerge:0,   SaveName:"trnk_voy",      	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	                 {Type:"Text",      Hidden:1,  Width:0,     Align:"Center", ColMerge:0,   SaveName:"lnr_trdp_cd",   	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:140,   Align:"Left",   ColMerge:0,   SaveName:"lnr_trdp_nm",   	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:120,   Align:"Center", ColMerge:0,   SaveName:"bkg_seq",			KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:120,   Align:"Center", ColMerge:0,   SaveName:"filling_no",       	KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:120,   Align:"Center", ColMerge:0,   SaveName:"master_bl_no",      KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center", ColMerge:0,   SaveName:"pol_cd",       		KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:200,   Align:"Left", 	ColMerge:0,   SaveName:"pol_nm",       		KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center", ColMerge:0,   SaveName:"pod_cd",       		KeyField:0,   CalcLogic:"",   Format:"",		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:200,  	Align:"Left",   ColMerge:0,   SaveName:"pod_nm",      		KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:100,  	Align:"Center", ColMerge:0,   SaveName:"etd_dt_tm",      	KeyField:0,   CalcLogic:"",   Format:"Ymd", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:100,  	Align:"Center", ColMerge:0,   SaveName:"eta_dt_tm",      	KeyField:0,   CalcLogic:"",   Format:"Ymd", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:150,  	Align:"Left",   ColMerge:0,   SaveName:"cntr_sum",      	KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Center", ColMerge:0,   SaveName:"issued_by",      	KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:100,   Align:"Center", ColMerge:0,   SaveName:"issued_at",       	KeyField:0,   CalcLogic:"",   Format:"YmdHm",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center", ColMerge:0,   SaveName:"Indexing",      	KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
                   ];
        InitColumns(cols);
        SetEditable(1);
        //SetImageList(0,APP_PATH+"/web/img/button/btns_view.gif");
        //SetDataLinkMouse('view_mbl',1);
        //InitViewFormat(0, "etd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
        //InitViewFormat(0, "eta_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
        SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
        SetSheetHeight(SYSTEM_ROW_HEIGHT*18);
        //sheetObj.SetFocusAfterProcess(1);
		}
		break;
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){	
	//alert('paging : '+docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	
	for(var i=1; i<=docObjects[0].LastRow();i++){
		docObjects[0].SetCellFont("FontUnderline", i,"system_bkg_no",i,"system_bkg_no",1);
		docObjects[0].SetCellFontColor(i, "system_bkg_no","#0000FF");
		
		docObjects[0].SetCellFont("FontUnderline", i,"filling_no",i,"filling_no",1);
		docObjects[0].SetCellFontColor(i, "filling_no","#0000FF");
	}
}

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}

function entSearch() {
	if (event.keyCode == 13) {
		document.frm1.f_CurPage.value = '';
		doWork('SEARCHLIST');
	}
}    
 
//Combo Box 검색조건
function searchValueSet(){
	var formObj = document.frm1;
	
	formObj.f_carrier_bkg_no.value="";
	formObj.f_customer_bkg_no.value="";
	formObj.f_filling_no.value="";
	formObj.f_master_bl_no.value="";
	formObj.f_container_no.value="";
	formObj.f_ref_no.value="";
	
	if(formObj.f_biz_clss_cd.value == "M"){
		formObj.f_carrier_bkg_no.value=formObj.f_bkg_nm.value;
	}else if(formObj.f_biz_clss_cd.value == "H"){
		formObj.f_customer_bkg_no.value=formObj.f_bkg_nm.value;
	}
	
	if(formObj.f_bl_no.value == "MBL_No"){
		formObj.f_master_bl_no.value=formObj.f_bl_nm.value;
	}else if(formObj.f_bl_no.value == "REF_No"){
		formObj.f_filling_no.value=formObj.f_bl_nm.value;
	}
	
	if(formObj.f_cntr_no.value == "CNTR_No"){
		formObj.f_container_no.value=formObj.f_cntr_nm.value;
	}else if(formObj.f_cntr_no.value == "REF_No"){
		formObj.f_ref_no.value=formObj.f_cntr_nm.value;
	}
	
}

//Clear
function clearAll(){
	//docObjects[0].RemoveAll();
	var formObj=document.frm1;		
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
	formObj.f_biz_clss_cd[0].selected=true;
	formObj.f_bl_no[0].selected=true;
	formObj.f_cntr_no[0].selected=true;
	
	if (uod_flg == "N"){ 
		formObj.f_opr_usrid.value=usrId;
	}
}

function sheet1_OnDblClick(sheetObj,Row,Col){ 
	var formObj=document.frm1;
	var titleStr = "";
	var paramStr = "";

	if(sheetObj.SearchRows() == 0){
		//There is no data
		alert(getLabel('FMS_COM_ALT010')+ "\n\n: ACC_JOR_0060.102");
		return;
	}else{	
		tnsParm = "&plan_no="+sheetObj.GetCellValue(Row, "plan_no")+"&bkg_seq="+sheetObj.GetCellValue(Row, "bkg_seq")+"&bkg_no="+sheetObj.GetCellValue(Row, "system_bkg_no");
		titleStr="";		
		paramStr="./SEE_BKG_0010.clt?f_cmd=-1"+tnsParm;
		parent.mkNewFrame(titleStr, paramStr);
	}

}

function sheet1_OnClick(sheetObj,Row,Col){
	var paramStr = "";
	
	switch (sheetObj.ColSaveName(Col)) {
		case "system_bkg_no" :
			if(sheetObj.GetCellValue(Row, "system_bkg_no") == ''){
				return;
			}			
			paramStr="./SEE_BMD_0500.clt?f_cmd="+SEARCHLIST+"&f_lnr_bkg_no="+sheetObj.GetCellValue(Row,"carrier_bkg_no")+"&f_bkg_seq="+sheetObj.GetCellValue(Row,"bkg_seq")+"&f_bkg_no="+sheetObj.GetCellValue(Row,"system_bkg_no");
   	   		parent.mkNewFrame('Carrier Booking Entry', paramStr,"SEE_BMD_0500_SHEET_"+sheetObj.GetCellValue(Row,"carrier_bkg_no")+"_"+sheetObj.GetCellValue(Row,"bkg_seq")+"_"+sheetObj.GetCellValue(Row,"system_bkg_no"));
   	   		break;
   	   		
		case "filling_no" :
			if(sheetObj.GetCellValue(Row, "filling_no") == ''){
				return;
			}			
			paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+escape(sheetObj.GetCellValue(Row, "filling_no"));
			parent.mkNewFrame("Master B/L Entry", paramStr,"SEE_BMD_0040_SHEET_"+sheetObj.GetCellValue(Row,"filling_no"));
   	   		break;
	}
}

function searchValueClear(obj) {
	
	var formObj = document.frm1;
	
	if(obj.name == "f_biz_clss_cd"){
		formObj.f_bkg_nm.value = "";
	}else if(obj.name == "f_bl_no"){
		formObj.f_bl_nm.value = "";
	}else if(obj.name == "f_cntr_no"){
		formObj.f_cntr_nm.value = "";
	}
}