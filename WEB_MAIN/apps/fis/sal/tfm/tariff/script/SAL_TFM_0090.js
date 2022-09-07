/*=========================================================
*Copyright(c) 2017 CyberLogitec. All Rights Reserved.
*@FileName   : SAL_TFM_0090.js
*@FileTitle  : Rate Management - Ocean
*@author     : CLT
*@version    : 1.0
*@since      : 2017/07/26
=========================================================*/

function doWork(srcName){

	//TODO - 공통버튼이 아니라서 어떻게 해야하나???
	/*if(!btnGetVisible(srcName)){
		return;
	}*/

	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var formObj=document.frm1;
	switch(srcName) {
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST;
			sheetObj.DoSearch("SAL_TFM_0090GS.clt", FormQueryString(formObj) );
			break;

		case "SEARCHLIST01":
			formObj.f_cmd.value=SEARCHLIST01;
			sheetObj2.DoSearch("SAL_TFM_0090_1GS.clt", FormQueryString(formObj) );
			break;

		case "ROWADD":
			var intRows=sheetObj.LastRow() + 1;
			sheetObj.DataInsert(intRows);
			sheetObj.SetCellEditable(intRows, 'chk',0);
			break;

		case "MODIFY":
			formObj.f_cmd.value=MODIFY;
			if(confirm(getLabel('FMS_COM_CFMSAV'))){
				doProcess=true;
				sheetObj.DoSave("SAL_TFM_0090GS.clt", FormQueryString(formObj), "ibflag", false);
			}
			break;

		case "MODIFY_DTL":
			formObj.f_cmd.value=COMMAND01;
			if(confirm(getLabel('FMS_COM_CFMSAV'))){
				doProcess=true;
				sheetObj2.DoSave("SAL_TFM_0090GS.clt", FormQueryString(formObj), "ibflag", false);
			}
			break;

	}
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
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	//doWork('SEARCHLIST', '');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
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
	var formObj = document.frm1;
	IBS_RestoreGridSetting(formObj.user_id.value, formObj.pageurl.value, docObjects[0], false, "restoreGrid");

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

			with(sheetObj){

				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, FrozenCol: 7 } );

				var HDR1_1 = "SAL_TFM_0090_HDR1_1";
				var HDR1_2 = "SAL_TFM_0090_HDR1_2";

				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel(HDR1_1), Align:"Center"}
				              , { Text:getLabel(HDR1_2), Align:"Center"} ];

				InitHeaders(headers, info);

				var cols = [
					  {Type:"DelCheck",   Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"del_chk",          KeyField:0,   CalcLogic:"",   Format:"",        PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 }
					, {Type:"Status",     Hidden:1,   Width:40,     Align:"Center",    ColMerge:1,   SaveName:"ibflag" }
					, {Type:"Text",       Hidden:0,   Width:100,    Align:"Center",    ColMerge:1,   SaveName:"rt_no",            KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
					, {Type:"Combo",      Hidden:0,   Width:60,     Align:"Center",    ColMerge:1,   SaveName:"bnd_cls_cd",       KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
					, {Type:"Combo",      Hidden:0,   Width:100,    Align:"Center",    ColMerge:1,   SaveName:"rt_tp_cd",         KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
					, {Type:"Combo",      Hidden:0,   Width:60,     Align:"Center",    ColMerge:1,   SaveName:"std_flg",          KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
					, {Type:"Combo",      Hidden:0,   Width:120,    Align:"Center",    ColMerge:1,   SaveName:"rt_ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
					, {Type:"Text",       Hidden:0,   Width:100,    Align:"Center",    ColMerge:1,   SaveName:"ref_no",           KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
					, {Type:"Combo",      Hidden:0,   Width:60,     Align:"Center",    ColMerge:1,   SaveName:"sell_buy_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
					, {Type:"Combo",      Hidden:0,   Width:40,     Align:"Center",    ColMerge:1,   SaveName:"cust_vndr_tp_cd",  KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"PopupEdit",  Hidden:0,   Width:60,     Align:"Center",    ColMerge:1,   SaveName:"cust_vndr_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1, AcceptKeys:"N|E", InputCaseSensitive:1 }
					, {Type:"Text",       Hidden:0,   Width:100,    Align:"Center",    ColMerge:1,   SaveName:"cust_vndr_cd_nm",  KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
					, {Type:"Combo",      Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"por_tp",           KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"PopupEdit",  Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"por_cd",           KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:5, AcceptKeys:"N|E", InputCaseSensitive:1 }
					, {Type:"Text",       Hidden:0,   Width:100,    Align:"Left",      ColMerge:1,   SaveName:"por_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
					, {Type:"Combo",      Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"pol_tp",           KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"PopupEdit",  Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"pol_cd",           KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:5, AcceptKeys:"N|E", InputCaseSensitive:1 }
					, {Type:"Text",       Hidden:0,   Width:100,    Align:"Left",      ColMerge:1,   SaveName:"pol_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
					, {Type:"Combo",      Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"pod_tp",           KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"PopupEdit",  Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"pod_cd",           KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:5, AcceptKeys:"N|E", InputCaseSensitive:1 }
					, {Type:"Text",       Hidden:0,   Width:120,    Align:"Left",      ColMerge:1,   SaveName:"pod_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
					, {Type:"Combo",      Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"del_tp",           KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"PopupEdit",  Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"del_cd",           KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:5, AcceptKeys:"N|E", InputCaseSensitive:1 }
					, {Type:"Text",       Hidden:0,   Width:120,    Align:"Left",      ColMerge:1,   SaveName:"del_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
					, {Type:"Combo",      Hidden:0,   Width:70,     Align:"Center",    ColMerge:1,   SaveName:"fm_svc_term_cd",   KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Combo",      Hidden:0,   Width:70,     Align:"Center",    ColMerge:1,   SaveName:"to_svc_term_cd",   KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Date",       Hidden:0,   Width:80,     Align:"Center",    ColMerge:1,   SaveName:"eff_fm_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Combo",      Hidden:0,   Width:80,     Align:"Center",    ColMerge:1,   SaveName:"eff_fm_crt",       KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Date",       Hidden:0,   Width:80,     Align:"Center",    ColMerge:1,   SaveName:"eff_to_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Combo",      Hidden:0,   Width:80,     Align:"Center",    ColMerge:1,   SaveName:"eff_to_crt",       KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Text",       Hidden:1,   Width:120,    Align:"Center",    ColMerge:1,   SaveName:"cmdt_cd",          KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"PopupEdit",  Hidden:0,   Width:120,    Align:"Center",    ColMerge:1,   SaveName:"cmdt_nm",          KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Combo",      Hidden:0,   Width:40,     Align:"Center",    ColMerge:1,   SaveName:"nm_acct_flg",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Text",       Hidden:1,   Width:0,      Align:"Center",    ColMerge:1,   SaveName:"nm_acct_cd",       KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"PopupEdit",  Hidden:0,   Width:120,    Align:"Center",    ColMerge:1,   SaveName:"nm_acct_nm",       KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
				];

				InitColumns(cols);
				SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
				SetEditable(1);

				SetColProperty( 'bnd_cls_cd',      {ComboCode:MODE_CD,      ComboText:MODE_VAL   } );
				SetColProperty( 'rt_tp_cd',        {ComboCode:RATE_TP_CD,   ComboText:RATE_TP_VAL} );
				SetColProperty( 'std_flg',         {ComboCode:YN_CD,        ComboText:YN_CD,        DefaultValue:'Y'  } );
				SetColProperty( 'rt_ofc_cd',       {ComboCode:OFFICE_CD,    ComboText:OFFICE_VAL,   DefaultValue:ofcCd} );
				SetColProperty( 'sell_buy_tp_cd',  {ComboCode:S_B_CD,       ComboText:S_B_VAL    } );
				SetColProperty( 'cust_vndr_tp_cd', {ComboCode:CUST_VNDR_CD, ComboText:CUST_VNDR_CD, DefaultValue:'TP'} );
				SetColProperty( 'por_tp',          {ComboCode:CNTR_LOC_CD,  ComboText:CNTR_LOC_CD,  DefaultValue:'C'} );
				SetColProperty( 'pol_tp',          {ComboCode:CNTR_LOC_CD,  ComboText:CNTR_LOC_CD,  DefaultValue:'C'} );
				SetColProperty( 'pod_tp',          {ComboCode:CNTR_LOC_CD,  ComboText:CNTR_LOC_CD,  DefaultValue:'C'} );
				SetColProperty( 'del_tp',          {ComboCode:CNTR_LOC_CD,  ComboText:CNTR_LOC_CD,  DefaultValue:'C'} );
				SetColProperty( 'fm_svc_term_cd',  {ComboCode:SVC_TERM_CD,  ComboText:SVC_TERM_VAL } );
				SetColProperty( 'to_svc_term_cd',  {ComboCode:SVC_TERM_CD,  ComboText:SVC_TERM_VAL } );
				SetColProperty( 'eff_fm_crt',      {ComboCode:CRIT_TP_CD,   ComboText:CRIT_TP_VAL } );
				SetColProperty( 'eff_to_crt',      {ComboCode:CRIT_TP_CD,   ComboText:CRIT_TP_VAL } );
				SetColProperty( 'nm_acct_flg',     {ComboCode:YN_CD,        ComboText:YN_CD,        DefaultValue:'Y'  } );

				//InitDataValid(0, "cust_vndr_cd", vtEngUpOther, "0123456789" );

				SetSheetHeight(360);
				resizeSheet();
			}
			break;

		case 2:      //IBSheet1 init

			with(sheetObj){
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
				var HDR2_1 = "SAL_TFM_0090_HDR2_1";
				var HDR2_2 = "SAL_TFM_0090_HDR2_2";
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel(HDR2_1), Align:"Center"}
							  , { Text:getLabel(HDR2_2), Align:"Center"} ];
				InitHeaders(headers, info);

				var cols = [
				      {Type:"DelCheck",   Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"del_chk",          KeyField:0,   CalcLogic:"",   Format:"",        PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 }
					, {Type:"Status",     Hidden:1,   Width:40,     Align:"Center",    ColMerge:1,   SaveName:"ibflag" }
					, {Type:"Text",       Hidden:0,   Width:100,    Align:"Center",    ColMerge:1,   SaveName:"rt_no",            KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
					, {Type:"Text",       Hidden:1,   Width:50,     Align:"Left",      ColMerge:1,   SaveName:"rt_no_sub_seq",    KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
					, {Type:"Combo",      Hidden:0,   Width:120,    Align:"Center",    ColMerge:1,   SaveName:"rt_ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
					, {Type:"Combo",      Hidden:0,   Width:40,     Align:"Center",    ColMerge:1,   SaveName:"cust_vndr_tp_cd",  KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"PopupEdit",  Hidden:0,   Width:60,     Align:"Center",    ColMerge:1,   SaveName:"cust_vndr_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Text",       Hidden:0,   Width:120,    Align:"Center",    ColMerge:1,   SaveName:"cust_vndr_cd_nm",  KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
					, {Type:"Combo",      Hidden:0,   Width:120,    Align:"Center",    ColMerge:1,   SaveName:"bil_cd",           KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
					, {Type:"Text",       Hidden:0,   Width:120,    Align:"Left",      ColMerge:1,   SaveName:"bil_cd_nm",        KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
					, {Type:"Combo",      Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"aply_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
					, {Type:"Combo",      Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
					, {Type:"Combo",      Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"curr_cd",          KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
					, {Type:"Float",      Hidden:0,   Width:100,    Align:"Right",     ColMerge:1,   SaveName:"rt",               KeyField:0,   CalcLogic:"",   Format:"",        PointCount:2,   UpdateEdit:0,   InsertEdit:1 }
					, {Type:"Date",       Hidden:0,   Width:80,     Align:"Center",    ColMerge:1,   SaveName:"dtl_eff_fm_dt",    KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Date",       Hidden:0,   Width:80,     Align:"Center",    ColMerge:1,   SaveName:"dtl_eff_to_dt",    KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Combo",      Hidden:0,   Width:50,     Align:"Center",    ColMerge:1,   SaveName:"inc_bil_flg",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
					, {Type:"Text",       Hidden:0,   Width:120,    Align:"Left",      ColMerge:1,   SaveName:"rmk",              KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
				];

				InitColumns(cols);
				SetEditable(1);
				SetColProperty( 'rt_ofc_cd',       {ComboCode:OFFICE_CD,      ComboText:OFFICE_VAL,   DefaultValue:''} );
				SetColProperty( 'cust_vndr_tp_cd', {ComboCode:CUST_VNDR_CD,   ComboText:CUST_VNDR_CD, DefaultValue:'TP'} );
				SetColProperty( 'aply_ut_cd',      {ComboCode:'|'+UNIT_CD,    ComboText:'|'+UNIT_VAL } );
				SetColProperty( 'cntr_tpsz_cd',    {ComboCode:'|'+TPSZ_CD,    ComboText:'|'+TPSZ_VAL } );
				SetColProperty( 'curr_cd',         {ComboCode:'|'+CURR_CD,    ComboText:'|'+CURR_VAL,     DefaultValue:ofcCurrCd } );
				SetColProperty( 'inc_bil_flg',     {ComboCode:YN_CD,          ComboText:YN_CD,        DefaultValue:'Y'  } );
				SetColProperty( 'bil_cd',          {ComboCode:'|'+AR_FRT_VAL, ComboText:'|'+AR_FRT_VAL } );

				SetSheetHeight(200);
				resizeSheet2();
			}
			sheetObj.SetFocusAfterProcess(0);
			break;
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function resizeSheet2() {
	ComResizeSheet(docObjects[1]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj = document.frm1;
	//doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));

	if(docObjects[0].RowCount() > docObjects[0].HeaderRows()) {
		var info;
		var code;
		var name;
		for(var iRow=docObjects[0].HeaderRows(); iRow<(docObjects[0].HeaderRows()+docObjects[0].RowCount()); iRow++) {
			code = docObjects[0].GetCellValue(iRow, "cust_vndr_cd");
			name = docObjects[0].GetCellValue(iRow, "cust_vndr_nm");
			if (docObjects[0].GetCellValue(iRow, "cust_vndr_tp_cd") == 'TP') {
				info = {Type:"PopupEdit",  Hidden:0,   Width:60,     Align:"Center",    ColMerge:1,   SaveName:"cust_vndr_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 };
			} else if(docObjects[0].GetCellValue(iRow, "cust_vndr_tp_cd") == 'AG') {
				info = {Type:"Combo", ComboCode:ACCT_CD, ComboText:ACCT_CD};
			}

			docObjects[0].InitCellProperty(iRow, "cust_vndr_cd", info);

			docObjects[0].SetCellValue(iRow, "cust_vndr_cd", code);
			docObjects[0].SetCellValue(iRow, "cust_vndr_nm", name);

			//Named Account Enable/Disable
			if(docObjects[0].GetCellValue(iRow, "nm_acct_flg") == "N") {
				docObjects[0].SetCellEditable(iRow, "nm_acct_nm", false);
			} else if(docObjects[0].GetCellValue(iRow, "nm_acct_flg") == "Y") {
				docObjects[0].SetCellEditable(iRow, "nm_acct_nm", true);
			}

		}

		formObj.rt_no.value = docObjects[0].GetCellValue(docObjects[0].HeaderRows(), "rt_no");
		doWork("SEARCHLIST01");
	}

}

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == "" || errMsg == undefined || errMsg == null){
		showCompleteProcess();
		doWork('SEARCHLIST');
	}
}

//등록/수정/삭제 후 페이지징 표시
function sheet2_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == "" || errMsg == undefined || errMsg == null){
		showCompleteProcess();
		doWork('SEARCHLIST01');
	}
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column)
 */
function sheet1_OnDblClick(sheetObj,Row,Col) {
	if(sheetObj.ColSaveName(Col) == "rt_no"){
		if(sheetObj.GetCellValue(Row, "ibflag") != 'I'){
		    var formObj = document.frm1;
		    formObj.rt_no.value = docObjects[0].GetCellValue(Row, "rt_no");
		    doWork('SEARCHLIST01');
		}
	}
}

var codeTp = "";

function sheet1_OnChange(sheetObj, Row, Col, Value) {
	var colName = sheetObj.ColSaveName(Col);
	codeTp = colName;
	var loc_tp_cd = "";
	switch (colName) {
		case "nm_acct_flg" :
			if (Value == "Y") {
				sheetObj.SetCellEditable(Row, 'nm_acct_nm', true);
			} else {
				sheetObj.SetCellEditable(Row, 'nm_acct_nm', false);
			}
			break;

		case "cust_vndr_tp_cd" :
			var info;
			if (Value == 'TP') {
				info = {Type:"PopupEdit",  Hidden:0,   Width:60,     Align:"Center",    ColMerge:1,   SaveName:"cust_vndr_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 };
			} else if(Value == 'AG') {
				info = {Type:"Combo", ComboCode:ACCT_CD, ComboText:ACCT_CD};
			}
			sheetObj.InitCellProperty(Row, "cust_vndr_cd", info);
			sheetObj.SetCellValue(Row, "cust_vndr_cd", "");
			break;

		case "cust_vndr_cd" :
			if(sheetObj.GetCellValue(Row, "cust_vndr_tp_cd") == "TP" && Value != "") {
				ajaxSendPost(setCodeName, "reqVal", "&goWhere=aj&bcKey=searchNameOfCode&code_type=TradePartner&s_tp_code="+Value, "./GateServlet.gsl");
			} else {
				if(Value == "") {
					sheetObj.SetCellValue(Row, "cust_vndr_cd_nm", "");
				}
			}
			break;

		case "por_cd" :
		case "pol_cd" :
		case "pod_cd" :
		case "del_cd" :

			if(Value != "") {
				ajaxSendPost(setCodeName, "reqVal", "&goWhere=aj&bcKey=searchNameOfCode&code_type=Location&s_loc_cd="+Value, "./GateServlet.gsl");
			} else {
				if(colName == "por_cd") sheetObj.SetCellValue(Row, "por_cd_nm", "");
				else if(colName == "pol_cd") sheetObj.SetCellValue(Row, "pol_cd_nm", "");
				else if(colName == "pod_cd") sheetObj.SetCellValue(Row, "pod_cd_nm", "");
				else if(colName == "del_cd") sheetObj.SetCellValue(Row, "del_cd_nm", "");
			}
			break;

		case "por_tp" :
			sheetObj.SetCellValue(Row, "por_cd", "");
			sheetObj.SetCellValue(Row, "por_cd_nm", "");
			break;

		case "pol_tp" :
			sheetObj.SetCellValue(Row, "pol_cd", "");
			sheetObj.SetCellValue(Row, "pol_cd_nm", "");
			break;

		case "pod_tp" :
			sheetObj.SetCellValue(Row, "pod_cd", "");
			sheetObj.SetCellValue(Row, "pod_cd_nm", "");
			break;

		case "del_tp" :
			sheetObj.SetCellValue(Row, "del_cd", "");
			sheetObj.SetCellValue(Row, "del_cd_nm", "");
			break;

		case "eff_fm_dt" :
		case "eff_to_dt" :
			var fm_dt = Number(sheetObj.GetCellValue(Row, "eff_fm_dt"));
			var to_dt = Number(sheetObj.GetCellValue(Row, "eff_to_dt"));
			if(fm_dt != 0 && to_dt != 0) {
				if(fm_dt > to_dt) {
					alert("Please check effective date.\nEffective end date is greater than begin date.");
					sheetObj.SetCellValue(Row, colName, "");
				}
			}
			break;

	}
}

function sheet2_OnChange(sheetObj, Row, Col, Value) {
	var colName = sheetObj.ColSaveName(Col);
	switch (colName) {
		case "aply_ut_cd" :
			if(Value == "SCN") { // CNTR => SCN
				sheetObj.SetCellEditable(Row, "cntr_tpsz_cd", true);
			} else {
				sheetObj.SetCellValue(Row, "cntr_tpsz_cd", "");
				sheetObj.SetCellEditable(Row, "cntr_tpsz_cd", false);
			}
			break;

		case "bil_cd" :
			sheetObj.SetCellValue(Row, "bil_cd_nm", sheetObj.GetCellValue(Row, "bil_cd"));
			break;

		case "cust_vndr_tp_cd" :
			var info;
			if (Value == 'TP') {
				info = {Type:"PopupEdit",  Hidden:0,   Width:60,     Align:"Center",    ColMerge:1,   SaveName:"cust_vndr_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 };
			} else if(Value == 'AG') {
				info = {Type:"Combo", ComboCode:ACCT_CD, ComboText:ACCT_CD};
			}
			sheetObj.InitCellProperty(Row, "cust_vndr_cd", info);
			sheetObj.SetCellValue(Row, "cust_vndr_cd", "");
			sheetObj.SetCellValue(Row, "cust_vndr_cd_nm", "");
			break;

		case "dtl_eff_fm_dt" :
		case "dtl_eff_to_dt" :
			var fm_dt = Number(sheetObj.GetCellValue(Row, "dtl_eff_fm_dt"));
			var to_dt = Number(sheetObj.GetCellValue(Row, "dtl_eff_to_dt"));
			if(fm_dt != 0 && to_dt != 0) {
				if(fm_dt > to_dt) {
					alert("Please check effective date.\nEffective end date is greater than begin date.");
					sheetObj.SetCellValue(Row, colName, "");
				}
			}
			break;
	}
}

function setCodeName(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = docObjects[0];
	var selRow = sheetObj.GetSelectRow();

	switch(codeTp) {
		case "cust_vndr_cd" :
			if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
				sheetObj.SetCellValue(selRow, "cust_vndr_cd_nm", doc[1]);
			} else {
				sheetObj.SetCellValue(selRow, codeTp, "");
				sheetObj.SetCellValue(selRow, "cust_vndr_cd_nm", "");
			}
			break;

		case "por_cd" :
			if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
				sheetObj.SetCellValue(selRow, "por_cd_nm", doc[1]);
			} else {
				sheetObj.SetCellValue(selRow, codeTp, "");
				sheetObj.SetCellValue(selRow, "por_cd_nm", "");
			}
			break;

		case "pol_cd" :
			if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
				sheetObj.SetCellValue(selRow, "pol_cd_nm", doc[1]);
			} else {
				sheetObj.SetCellValue(selRow, codeTp, "");
				sheetObj.SetCellValue(selRow, "pol_cd_nm", "");
			}
			break;

		case "pod_cd" :
			if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
				sheetObj.SetCellValue(selRow, "pod_cd_nm", doc[1]);
			} else {
				sheetObj.SetCellValue(selRow, codeTp, "");
				sheetObj.SetCellValue(selRow, "pod_cd_nm", "");
			}
			break;

		case "del_cd" :
			if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
				sheetObj.SetCellValue(selRow, "del_cd_nm", doc[1]);
			} else {
				sheetObj.SetCellValue(selRow, codeTp, "");
				sheetObj.SetCellValue(selRow, "del_cd_nm", "");
			}
			break;
	}
}

var cur_row;
var cur_col;
var rtnary=new Array(1);
var callBackFunc = "";
var popupScr = "";
function sheet1_OnPopupClick(sheetObj, row, col){
	cur_row = row;
	switch (sheetObj.ColSaveName(col)) {
		case "por_cd" :
			rtnary=new Array(1);
			callBackFunc = "sheet1_OnPopupClick_por_cd";
			if(sheetObj.GetCellValue(row, "por_tp") == "L") {	//Location
				rtnary[0]="SEA";
				rtnary[1]="BL";
				rtnary[2]="";
				popupScr = "./CMM_POP_0030.clt";
			} else {											//Country
				rtnary[0]="";
				rtnary[1]="";
				popupScr = "./CMM_POP_0020.clt";
			}
			modal_center_open(popupScr, rtnary, 806, 415, "yes");
			break;
		case "pol_cd" :
			rtnary=new Array(1);
			callBackFunc = "sheet1_OnPopupClick_pol_cd";
			if(sheetObj.GetCellValue(row, "pol_tp") == "L") {	//Location
				rtnary[0]="SEA";
				rtnary[1]="BL";
				rtnary[2]="";
				popupScr = "./CMM_POP_0030.clt";
			} else {											//Country
				rtnary[0]="";
				rtnary[1]="";
				popupScr = "./CMM_POP_0020.clt";
			}
			modal_center_open(popupScr, rtnary, 806, 415, "yes");			break;
		case "pod_cd" :
			rtnary=new Array(1);
			callBackFunc = "sheet1_OnPopupClick_pod_cd";
			if(sheetObj.GetCellValue(row, "pod_tp") == "L") {	//Location
				rtnary[0]="SEA";
				rtnary[1]="BL";
				rtnary[2]="";
				popupScr = "./CMM_POP_0030.clt";
			} else {											//Country
				rtnary[0]="";
				rtnary[1]="";
				popupScr = "./CMM_POP_0020.clt";
			}
			modal_center_open(popupScr, rtnary, 806, 415, "yes");
			break;
		case "del_cd" :
			rtnary=new Array(1);
			callBackFunc = "sheet1_OnPopupClick_del_cd";
			if(sheetObj.GetCellValue(row, "del_tp") == "L") {	//Location
				rtnary[0]="SEA";
				rtnary[1]="BL";
				rtnary[2]="";
				popupScr = "./CMM_POP_0030.clt";
			} else {											//Country
				rtnary[0]="";
				rtnary[1]="";
				popupScr = "./CMM_POP_0020.clt";
			}
			modal_center_open(popupScr, rtnary, 806, 415, "yes");
			break;
		case "cust_vndr_cd" :
			var cstmTpCd = "LN";
			var iata_val = "";
			rtnary=new Array(2);
			rtnary[0]="1";
			rtnary[2]=window;
			callBackFunc = "sheet1_OnPopupClick_cust_vndr_cd";
			modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");
			break;
		case "cmdt_nm" :
			if(sheet1.GetCellValue(sheet1.GetSelectRow(), "rt_no") == '') {
				alert("Please save header data before save commodity info.");
			} else {
				rtnary=new Array(1);
				rtnary[0]=sheet1.GetCellValue(sheet1.GetSelectRow(), "rt_no");
				callBackFunc = "sheet1_OnPopupClick_cmdt_cd";
				modal_center_open('./SAL_TFM_CMDT_POP.clt', rtnary, 756, 483, "yes");
			}
			break;
		case "nm_acct_nm" :
			if(sheet1.GetCellValue(sheet1.GetSelectRow(), "rt_no") == '') {
				alert("Please save header data before save account info.");
			} else {
				rtnary=new Array(1);
				rtnary[0]=sheet1.GetCellValue(sheet1.GetSelectRow(), "rt_no");
				callBackFunc = "sheet1_OnPopupClick_acct_cd";
				modal_center_open('./SAL_TFM_ACCT_POP.clt', rtnary, 756, 483, "yes");
			}
			break;

	}
}

function sheet1_OnPopupClick_por_cd(rtnVal) {
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "por_cd", rtnValAry[0]);
		if(docObjects[0].GetCellValue(cur_row, "por_tp")=="L") {
			docObjects[0].SetCellValue(cur_row, "por_cd_nm", rtnValAry[2]);
		} else {
			docObjects[0].SetCellValue(cur_row, "por_cd_nm", rtnValAry[1]);
		}
	}
}

function sheet1_OnPopupClick_pol_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "pol_cd",rtnValAry[0]);
		if(docObjects[0].GetCellValue(cur_row, "pol_tp")=="L") {
			docObjects[0].SetCellValue(cur_row, "pol_cd_nm", rtnValAry[2]);
		} else {
			docObjects[0].SetCellValue(cur_row, "pol_cd_nm", rtnValAry[1]);
		}
	}
}

function sheet1_OnPopupClick_pod_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "pod_cd",rtnValAry[0]);
		if(docObjects[0].GetCellValue(cur_row, "pod_tp")=="L") {
			docObjects[0].SetCellValue(cur_row, "pod_cd_nm", rtnValAry[2]);
		} else {
			docObjects[0].SetCellValue(cur_row, "pod_cd_nm", rtnValAry[1]);
		}
	}
}

function sheet1_OnPopupClick_del_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "del_cd",rtnValAry[0]);
		if(docObjects[0].GetCellValue(cur_row, "del_tp")=="L") {
			docObjects[0].SetCellValue(cur_row, "del_cd_nm", rtnValAry[2]);
		} else {
			docObjects[0].SetCellValue(cur_row, "del_cd_nm", rtnValAry[1]);
		}
	}
}

function sheet1_OnPopupClick_cust_vndr_cd(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "cust_vndr_cd", rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "cust_vndr_cd_nm", rtnValAry[2]);
	}
}

function sheet1_OnPopupClick_cmdt_cd(){
	//doWork("SEARCHLIST");
}

function sheet1_OnPopupClick_acct_cd() {
	//doWork("SEARCHLIST");
}

function sheet2_OnPopupClick(sheetObj, row, col){
	cur_row = row;
	switch (sheetObj.ColSaveName(col)) {
		case "cust_vndr_cd" :
			var cstmTpCd = "LN";
			var iata_val = "";
			rtnary=new Array(2);
			rtnary[0]="1";
			rtnary[2]=window;
			callBackFunc = "sheet2_OnPopupClick_cust_vndr_cd";
			modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150, 650, "yes");
			break;
	}
}

function sheet2_OnPopupClick_cust_vndr_cd(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[1].SetCellValue(cur_row, "cust_vndr_cd", rtnValAry[0]);
		docObjects[1].SetCellValue(cur_row, "cust_vndr_cd_nm", rtnValAry[2]);
	}
}

function restoreGrid() {
	doWork('SEARCHLIST');
}

/**
 * add button click
 * @param sheetGb
 */
function addRow(sheetGb) {
	var sheetObj;
	switch (sheetGb) {
		case 'Master' :
			var sheetObj = docObjects[0];
			sheetObj.DataInsert(sheetObj.LastRow() + 1);
			sheet2.RemoveAll();
			break;
		case 'Detail' :
			var sheetMain = docObjects[0];
			var sheetObj = docObjects[1];
			var selectRow = sheetMain.GetSelectRow();

			if(sheetMain.RowCount() > 0 && sheetMain.GetCellValue(selectRow, "rt_no") != '') {
				sheetObj.DataInsert(sheetObj.LastRow()+1);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "rt_no", sheetMain.GetCellValue(selectRow, "rt_no"));
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "rt_ofc_cd", sheetMain.GetCellValue(selectRow, "rt_ofc_cd"));
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "cust_vndr_tp_cd", sheetMain.GetCellValue(selectRow, "cust_vndr_tp_cd"));
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "cust_vndr_cd", sheetMain.GetCellValue(selectRow, "cust_vndr_cd"));
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "cust_vndr_cd_nm", sheetMain.GetCellValue(selectRow, "cust_vndr_cd_nm"));
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "dtl_eff_fm_dt", sheetMain.GetCellValue(selectRow, "eff_fm_dt"));
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "dtl_eff_to_dt", sheetMain.GetCellValue(selectRow, "eff_to_dt"));

				//Selling or Buying Type
				if(sheetMain.GetCellValue(selectRow, "sell_buy_tp_cd") == "S") {
					sheetObj.SetColProperty('bil_cd', {ComboCode:'|'+AR_FRT_VAL, ComboText:'|'+AR_FRT_VAL});
				} else {
					sheetObj.SetColProperty('bil_cd', {ComboCode:'|'+AP_FRT_VAL, ComboText:'|'+AP_FRT_VAL});
				}
			}

			break;
	}
}

/**
 * delete button click
 * @param sheetGb
 */
function delRow(sheetGb) {
	var sheetObj;
	switch (sheetGb) {
		case 'Master' :
			var sheetObj = docObjects[0];
			sheetObj.RowDelete(sheetObj.GetSelectRow(), false);
			break;
		case 'Detail' :
			var sheetObj = docObjects[1];
			sheetObj.RowDelete(sheetObj.GetSelectRow(), false);
			break;
	}
}

/**
 * save master
 */
function saveMaster() {
	if(validData(docObjects[0], "eff_fm_dt", "eff_to_dt")) {
		doWork("MODIFY");
	} else {
		alert("Please check effective date of header grid data.");
	}
}

/**
 * save detail
 */
function saveDetail() {
	if(validData(docObjects[1], "dtl_eff_fm_dt", "dtl_eff_to_dt")) {
		doWork("MODIFY_DTL");
	} else {
		alert("Please check effective date of detail grid data.");
	}
}

/**
 * Validation effective date.
 * @param sheetObj
 * @param fm_dt
 * @param to_dt
 * @returns {Boolean}
 */
function validData(sheetObj, fm_dt, to_dt) {
	var isValid = true;
	var rowCnt = sheetObj.HeaderRows() + sheetObj.RowCount();
	for(var i=sheetObj.HeaderRows(); i<rowCnt; i++) {
		if((sheetObj.GetCellValue(i, fm_dt) != '' && sheetObj.GetCellValue(i, to_dt) == '') ||
		   (sheetObj.GetCellValue(i, fm_dt) == '' && sheetObj.GetCellValue(i, to_dt) != '')) {
			isValid = false;
		}
	}
	return isValid;
}

/**
 * clearAll
 */
function clearAll() {
	var formObj = document.frm1;

	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();

	formObj.f_rt_no.value = '';
	formObj.f_rt_ofc_cd.value = '';
	formObj.f_ref_no.value = '';
	formObj.f_sell_buy_tp_cd.value = '';
	formObj.f_cust_vndr_tp_cd.value = '';

}