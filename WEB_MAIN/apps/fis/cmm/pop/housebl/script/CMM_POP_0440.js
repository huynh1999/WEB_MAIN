/*=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : COM_POP_0440.js
 *@FileTitle  : Plan No Popup
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2017/03/20
=========================================================*/
//var rtnary=new Array(1);
//var callBackFunc = "";
//var firCalFlag = false;
function initFinish() {
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	// setFromToDtEndPlus(document.frm1.etd_strdt, 180, document.frm1.etd_enddt,
	// 30);
}
function doWork(srcName) {	
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
	var formObj = document.form;	
	var sheetObj = docObjects[0];
	
	try {
		switch (srcName) {		
		case "SEARCHLIST": 			
						
			//searchValueSet();
			if (validateForm(sheetObj, formObj, SEARCHLIST, 1)) {
				formObj.f_cmd.value = SEARCHLIST;	
				sheetObj.DoSearch("./CMM_POP_0440GS.clt", FormQueryString(formObj));
			}
			
			break;   
		case "CLOSE":
 		   ComClosePopup(); 
    	   break;	
    	   
		case "POL_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			rtnary=new Array(3);
	   		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		rtnary[3]="";		   		
	   		
	   		callBackFunc = "POL_POPLIST";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			
		break;
		
		case "POD_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			rtnary=new Array(3);
	   		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		rtnary[3]="";		   		
	   		
	   		callBackFunc = "POD_POPLIST";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			
		break;
		} // end switch
		
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
	var formObj = document.form;		
	for ( var i = 0; i < docObjects.length; i++) {
		// khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i], i + 1);
		// khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}	
	//doWork("SEARCHLIST");
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
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj, sheetNo) {	
	switch (sheetNo) {
	case 1: // IBSheet1 init
		with (sheetObj) {
        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        var headers = [ { Text:getLabel('CMM_POP_0440_HDR1'), Align:"Center"} ];
        InitHeaders(headers, info);
        var cols = [                      
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Center", ColMerge:0,   SaveName:"plan_no",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:70,	Align:"Center", ColMerge:0,   SaveName:"con_status",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Center", ColMerge:0,   SaveName:"carrier_bkg_no",	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Center", ColMerge:0,   SaveName:"filling_no",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:100,   Align:"Center", ColMerge:0,   SaveName:"bkg_seq",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Center", ColMerge:0,   SaveName:"master_bl_no",      KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center", ColMerge:0,   SaveName:"pol_cd",       		KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:120,   Align:"Left", 	ColMerge:0,   SaveName:"pol_nm",       		KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center", ColMerge:0,   SaveName:"pod_cd",       		KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:120,  	Align:"Left",   ColMerge:0,   SaveName:"pod_nm",      		KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:80,  	Align:"Center", ColMerge:0,   SaveName:"etd_dt_tm",      	KeyField:0,   CalcLogic:"",   Format:"Ymd", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:80,  	Align:"Center", ColMerge:0,   SaveName:"eta_dt_tm",      	KeyField:0,   CalcLogic:"",   Format:"Ymd", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,   	Align:"Center", ColMerge:0,   SaveName:"Indexing",      	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
                   ];
        InitColumns(cols);
        SetEditable(1);
        //SetImageList(0,APP_PATH+"/web/img/button/btns_view.gif");
        //SetDataLinkMouse('view_mbl',1);
        //InitViewFormat(0, "etd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
        //InitViewFormat(0, "eta_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
        SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
        SetSheetHeight(260);        
        //sheetObj.SetFocusAfterProcess(1);
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
	retArray += sheetObj.GetCellValue(Row, "plan_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "carrier_bkg_no");	
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "bkg_seq");
	ComClosePopup(retArray); 	
}
function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){		
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}

  
function entSearch() {
	if (event.keyCode == 13) {
		document.frm1.f_CurPage.value = '';
		doWork('SEARCHLIST');
	}
}    
 
function POL_POPLIST(rtnVal){
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		formObj.pol_cd.value = rtnValAry[0];//lnr_bkg_no
		formObj.pol_nm.value = rtnValAry[2];//bkg_no
		
	}
}

function POD_POPLIST(rtnVal){
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		formObj.pod_cd.value = rtnValAry[0];//lnr_bkg_no
		formObj.pod_nm.value = rtnValAry[2];//bkg_no
		
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

