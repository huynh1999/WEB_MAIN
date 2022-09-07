/*=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : SEE_BMD_0060.js
 *@FileTitle  : Booking And House B/L Search 
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/16
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
	var sheetObj2 = docObjects[1];
	var sheetObj3 = docObjects[2];
	try {
		switch (srcName) {
		case "SEARCHLIST": 
			if (!formValidation())
				return;
		 
			if (validateForm(sheetObj1, formObj, SEARCHLIST, 1)) {
				formObj.f_cmd.value = SEARCHLIST;
				sheetObj1.DoSearch("./SEE_BMD_0230GS.clt",
						FormQueryString(formObj));
			}
			break;      
		case "EXCEL":
			// parent.doDeleteWin(parent.sixd);
			// alert(parent);
			// alert(parent.sixd);
			if(docObjects[0].RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
//				docObjects[0].Down2Excel({
//					HiddenColumn : true
//				});
	   			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
	   		}
			break;   
			
		case "PRNR_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "PRNR_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		case "SHIP_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "SHIP_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		case "CNEE_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "CNEE_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		case "ASHIP_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "ASHIP_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			break;
		case "NTFY_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "NTFY_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		case "NEW": 
	 
			
			var bl_no = escape(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bl_no"));
			var intg_bl_seq = escape(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq"));
			var hbl_no = escape(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no"));
			var xtra_bl_seq = escape(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "xtra_bl_seq"));
			
			//alert(bl_no);
			if (bl_no == "-1" || bl_no == "") { return false; }
			
			
			var formObj = document.frm1;
			doProcess = true;
			formObj.f_cmd.value = "";
			var paramStr = "./SEE_BMD_0220.clt?f_cmd=-1" 
					+ "&param_bl_no="
					+ hbl_no 
					+ "&param_intg_bl_seq="
					+ intg_bl_seq
					+ "&param_xtra_bl_seq="
					+ "&param_new=Y";
			
			//alert(paramStr);
			parent.mkNewFrame('CO Load', paramStr,"SEE_BMD_0223_SHEET_NEW_" +  bl_no + "_" + intg_bl_seq+ "_" + xtra_bl_seq);

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
	case 'DATE2': // 달력 조회 팝업 호출
		var cal = new ComCalendar();
		cal.select(formObj.s_bkg_dt_tm, 'MM-dd-yyyy');
		break;
	case 'DATE13':   //달력 조회 From ~ To 팝업 호출 
    	var cal=new ComCalendarFromTo();
        cal.displayType="date";
        cal.select(formObj.post_strdt,  formObj.post_enddt,  'MM-dd-yyyy');
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
	   
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	
	for ( var i = 0; i < docObjects.length; i++) {
		// khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i], i + 1);
		// khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	
	doWork("SEARCHLIST");
}
function setShortcut() {
	
	doWork('SEARCHLIST');
}
/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++] = sheet_obj;
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
        var headers = [ { Text:getLabel('SEE_BMD_0223_HDR1'), Align:"Center"} ];
        InitHeaders(headers, info);
        var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:0,   SaveName:"block_flag",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"hbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:130,   Align:"Center",  ColMerge:0,   SaveName:"bl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"xtra_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"ref_ofc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"shp_mod_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"act_shpr_trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",  ColMerge:0,   SaveName:"vndr_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",  ColMerge:0,   SaveName:"trnk_vsl_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"mbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               
		             {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"bl_sts_cd",        KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" }];
        InitColumns(cols);
        SetEditable(1);
        //SetImageList(0,APP_PATH+"/web/img/button/btns_view.gif");
        //SetDataLinkMouse('view_mbl',1);
//        InitViewFormat(0, "etd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
        //InitViewFormat(0, "post_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
        //SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
        SetSheetHeight(SYSTEM_ROW_HEIGHT*18);
        //sheetObj.SetFocusAfterProcess(1);
		}
		break;
	 
		break;
	}
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
 
var curBlNo = '';
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet1_OnClick(sheetObj, Row, Col) { 
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet1_OnDblClick(sheetObj, Row, Col) {
	var colStr = sheetObj.ColSaveName(Col);
	if (colStr != 'view_mbl') {
		var formObj = document.frm1;
		doProcess = true;
		formObj.f_cmd.value = "";
		var paramStr = "./SEE_BMD_0220.clt?f_cmd=-1" 
				+ "&param_bl_no="
				+ escape(sheetObj.GetCellValue(Row, "hbl_no")) 
				+ "&param_intg_bl_seq="
				+ sheetObj.GetCellValue(Row, "intg_bl_seq")
				+ "&param_xtra_bl_seq="
				+ sheetObj.GetCellValue(Row, "xtra_bl_seq")
				+ "&param_new=N";
		//alert(paramStr);
		parent.mkNewFrame('CO Load', paramStr,"SEE_BMD_0223_SHEET_" +  sheetObj.GetCellValue(Row, "bl_no") + "_" + sheetObj.GetCellValue(Row, "intg_bl_seq")+ "_" + sheetObj.GetCellValue(Row, "xtra_bl_seq"));
	}
}
 
// 조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	for ( var i = 1; i <= sheetObj.LastRow(); i++) {
		if (sheetObj.GetCellValue(i, "bl_sts_cd") == "HF") {
			sheetObj.SetCellValue(i, "block_flag", "Y");
			sheetObj.SetCellFontColor(i, "block_flag", "#FF0000");
		}
	}
 
	doDispPaging(docObjects[0].GetCellValue(1, "Indexing"), getObj('pagingTb'));
	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}  
 
  
function entSearch() {
	if (event.keyCode == 13) {
		document.frm1.f_CurPage.value = '';
		doWork('SEARCHLIST');
	}
}    
 

function formValidation() {
	if (!chkSearchCmprPrd(false, frm1.etd_strdt, frm1.etd_enddt)) {
		return false;
	}
	return true;
}
function clearAll() {
	//docObjects[0].RemoveAll(); 
	var collTxt = document.getElementsByTagName("INPUT"); // document 상의 모든
															// INPUT 태그 요소들을
															// 컬렉션으로 구하고...
	for ( var i = 0; i < collTxt.length; i++) {
		if (collTxt[i].type == "text") {
			collTxt[i].value = "";
		}
	}
	
	// Set default value for Office combobox.
	document.frm1.f_ofc_cd[3].selected=true;
}

function PRNR_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_prnr_trdp_nm.value = rtnValAry[2];// full_nm
	}
}
function SHIP_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_shpr_trdp_nm.value = rtnValAry[2];// full_nm
	}
}
function CNEE_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_cnee_trdp_nm.value = rtnValAry[2];// full_nm
	}
}
function ASHIP_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_ahpr_trdp_nm.value = rtnValAry[2];// full_nm
	}
}
function NTFY_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_ntfy_trdp_nm.value = rtnValAry[2];// full_nm
	}
}

function setHblSizeUp(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*32);//height
}
function setHblSizeDown(sheetObj){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT*18);//height
}

