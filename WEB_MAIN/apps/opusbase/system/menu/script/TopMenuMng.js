var show_complete = "N";
function doWork(srcName) {
    if (!btnGetVisible(srcName)) {	//버튼의 단축키 사용가능여부 체크
        return;
    }
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj = document.form;
    try {
        switch (srcName) {
            case "SEARCHLIST":
                formObj.f_cmd.value = SEARCHLIST;
                //검증로직
                if (validateForm(sheetObj, formObj, SEARCHLIST, 1)) {
                    sheetObj.DoSearch("TopMenuMngGS.clt", FormQueryString(formObj));
                }
                break;
            case "ADD":
                formObj.f_cmd.value = ADD;
                if (inpuValCheck(sheetObj, ADD)) {
                    //전체 CellRow의 갯수
                    //Do you want to proceed?
                    if (confirm(getLabel('FMS_COM_CFMCON'))) {
                        doProcess = true;
                        sheetObj.DoSave("TopMenuMngGS.clt", FormQueryString(formObj), "ibflag", false);
                    }
                }
                break;
            case "MODIFY":
                formObj.f_cmd.value = MODIFY;
                if (inpuValCheck(sheetObj, MODIFY)) {
                    if (confirm(getLabel('FMS_COM_CFMMOD'))) {
                        doProcess = true;
                        show_complete = "Y";
                        sheetObj.DoSave("TopMenuMngGS.clt", FormQueryString(formObj), "ibflag", false);
                    }
                }
                break;
            case "REMOVE":
                var delYn = true;
                formObj.f_cmd.value = REMOVE;
                var rowLen = sheetObj.RowCount();
                for (var i = 1; i <= rowLen; i++) {
                    if (sheetObj.GetCellValue(i, 'curSelec') == 1 && sheetObj.GetCellValue(i, 'ibflag') == 'D') {
                        if (sheetObj.GetCellValue(i, 'cur_cnt') > 0) {
                            //alert(getLabel('ITM_MNU')+' "'+sheetObj.CellValue(i, 'mnu_nm')+'] has a registered [Sub-Menu] so that it failed to delete.\r\n\r\nPlease delete [Sub-Menu] first!');
                            alert(getLabel('SYS_COM_ALT004'));
                            delYn = false;
                            sheetObj.SelectCell(i, 'pgm_nm');
                            break;
                        }
                    }
                }
                if (delYn && validateForm(sheetObj, formObj, REMOVE, 1)) {
                    if (confirm(getLabel('FMS_COM_CFMDEL'))) {
                        doProcess = true;
                        sheetObj.DoSave("TopMenuMngGS.clt", FormQueryString(formObj), "ibflag", false);
                    }
                }
                break;
            case "EXCEL":
                if (sheetObj.RowCount() < 1) {//no data
                    ComShowCodeMessage("COM132501");
                } else {
                    sheetObj.Down2Excel({DownCols: makeHiddenSkipCol(sheetObj), SheetDesign: 1, Merge: 1});
                }
                break;
            case "ROWADD":
                var intRows = sheetObj.LastRow() + 1;
                sheetObj.DataInsert(intRows);
                break;
                // #535: [SBS] 다국어 처리 V1.0 2차
                // 메뉴 스타일 시트 관련 저장
            case "CSS_SAVE":
                formObj.f_cmd.value=COMMAND01; // CSS 저장
                if(inpuValCheck2()){
                    //전체 CellRow의 갯수
                    if(confirm(getLabel('FMS_COM_CFMSAV'))){
                        doProcess=true;
                        formObj.submit();
                    }                	
                }
            	break;
        } // end switch
    } catch (e) {
        if (e == "[object Error]") {
            //Unexpected Error occurred. Please contact Help Desk!
            alert(getLabel('FMS_COM_ERR002'));
        }
        else {
            //System Error! + MSG
            alert(getLabel('FMS_COM_ERR001'));
        }
    }
}
/**
 * #535: [SBS] 다국어 처리 V1.0 2차
 * CSS 저장시 입력값 체크
 */
function inpuValCheck2() {
	var formObj = document.form;
	if(formObj.f_font_size.value == ""){
		alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('MENU_FONT_SIZE'));
		formObj.f_font_size.focus();
		return false;
	}
	if(formObj.f_min_width.value == ""){
		alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('MENU_MIN_WIDTH'));
		formObj.f_min_width.focus();
		return false;
	}
	
	var f_font_size_fr = "10";
	var f_font_size_to = "24";
	if (Number(formObj.f_font_size.value) < Number(f_font_size_fr) || Number(formObj.f_font_size.value) > Number(f_font_size_to)) {
		var objArr = new Array();
		objArr[0] = f_font_size_fr;
		objArr[1] = f_font_size_to; 
		alert(getLabel2('FMS_COM_ALT091', objArr));
		formObj.f_font_size.value = "";
		formObj.f_font_size.focus();
		return false;
	}
	var f_min_width_fr = "170";
	var f_min_width_to = "300";
	if (Number(formObj.f_min_width.value) < Number(f_min_width_fr) || Number(formObj.f_min_width.value) > Number(f_min_width_to)) {
		var objArr = new Array();
		objArr[0] = f_min_width_fr;
		objArr[1] = f_min_width_to; 
		alert(getLabel2('FMS_COM_ALT091', objArr));
		formObj.f_min_width.value = "";
		formObj.f_min_width.focus();
		return false;
	}
		
	return true;
}

/**
 * 입력값 체크
 */
function inpuValCheck(sheetObj, f_cmd) {
    var rowCnt = sheetObj.LastRow() + 1;
    var isOk = true;
    var loopNum = 0;
    var checkVal = false;
    for (var i = 1; i <= rowCnt; i++) {
        var stat = sheetObj.GetCellValue(i, 'ibflag');
        if (stat != 'R') {
            if (f_cmd == ADD && stat == 'I') {
                checkVal = true;
                loopNum++;
            } else if (f_cmd == MODIFY && stat == 'U') {
                checkVal = true;
                loopNum++;
            } else if (f_cmd == REMOVE && stat == 'D') {
                loopNum++;
            }
            if (checkVal) {
                //Menu
                if (checkInputVal(sheetObj.GetCellValue(i, 'mnu_nm'), 1, 50, "T", getLabel('SYS_COD_MENU')) != 'O') {
                    isOk = false;
                    break;
                } else if (checkInputVal(sheetObj.GetCellValue(i, 'srt_seq'), 1, 3, "N", getLabel('ITM_ORD')) != 'O') {
                    isOk = false;
                    break;
                } else if (checkInputVal(sheetObj.GetCellValue(i, 'mnu_desc'), 1, 200, "T", getLabel('ITM_DESC')) != 'O') {
                    isOk = false;
                    break;
                }
            }
            checkVal = false;
        }
    }
    if (loopNum == 0) {
        if (f_cmd == ADD) {
            //There is nothing to register!
        } else if (f_cmd == MODIFY) {
            //There is no change to UPDATE!
        }
        isOk = false;
    } else {
        for (var i = 1; i < rowCnt; i++) {
            var stat = sheetObj.GetCellValue(i, 'ibflag');
            if (stat != 'R') {
                if (f_cmd == ADD && stat == 'I') {
                } else if (f_cmd == MODIFY && stat == 'U') {
                } else if (f_cmd == REMOVE && stat == 'D') {
                } else {
                    sheetObj.SetCellValue(i, 'ibflag', 'R');
                }
            }
        }
    }
    return isOk;
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage) {
    docObjects[0].RemoveAll();
    document.forms[0].f_CurPage.value = callPage;
    doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList() {
    document.forms[0].f_CurPage.value = 1;
    doWork('SEARCHLIST');
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for (var i = 0; i < docObjects.length; i++) {
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i], i + 1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    // 유저에 해당하는 언어 설정
    document.form.f_lang_cd.value = ln_lang_tp;
    
	// #535: [SBS] 다국어 처리 V1.0 
	// 언어 설정별 좌측 메뉴 틀어지는 현상 수정 
	// system option에서 설정된 언어별 css값을 설정
	ajax_Send_css_opt_minWidth_Value2();
	ajax_Send_css_opt_fontSize_Value2();
	
	//#576 [Master Menu] Don't Auto searching data when opening UI
	doWork('SEARCHLIST');
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj) {
    docObjects[sheetCnt++] = sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj, sheetNo) {
    switch (sheetNo) {
        case 1:      //IBSheet1 init
            with (sheetObj) {

                SetConfig({SearchMode: 2, MergeSheet: 5, Page: 20, DataRowMerge: 0, FrozenCol:5});

                var info = {Sort: 1, ColMove: 1, HeaderCheck: 1, ColResize: 1};
                var headers = [{Text: getLabel('TOP_MNU_HDR1'), Align: "Center"}];
                InitHeaders(headers, info);

                var cols = [{
                    Type: "DelCheck",
                    Hidden: 0,
                    Width: 60,
                    Align: "Center",
                    ColMerge: 0,
                    SaveName: "curSelec"
                },
                    {Type: "Status", Hidden: 1, Width: 0, Align: "Center", ColMerge: 0, SaveName: "ibflag"},
                    {Type: "Text", Hidden: 1, Width: 0, Align: "Center", ColMerge: 0, SaveName: "mnu_seq"},
                    {
                        Type: "Text",
                        Hidden: 0,
                        Width: 150,
                        Align: "Left",
                        ColMerge: 0,
                        SaveName: "mnu_nm",
                        KeyField: 1,
                        CalcLogic: "",
                        Format: "",
                        PointCount: 0,
                        UpdateEdit: 1,
                        InsertEdit: 1
                    },
                    {
                        Type: "Text",
                        Hidden: 0,
                        Width: 60,
                        Align: "Center",
                        ColMerge: 0,
                        SaveName: "srt_seq",
                        KeyField: 1,
                        CalcLogic: "",
                        Format: "",
                        PointCount: 0,
                        UpdateEdit: 1,
                        InsertEdit: 1
                    },
                    // #535: [SBS] 다국어 처리 V1.0
                    {
                        Type: "Text",
                        Hidden: 0,
                        Width: 200,
                        Align: "Left",
                        ColMerge: 0,
                        SaveName: "mnu_nm_en",
                        KeyField: 0,
                        CalcLogic: "",
                        Format: "",
                        PointCount: 0,
                        UpdateEdit: 1,
                        InsertEdit: 1
                    },
                    {
                    	Type: "Text",
                    	Hidden: 0,
                    	Width: 200,
                    	Align: "Left",
                    	ColMerge: 0,
                    	SaveName: "mnu_nm_zh",
                    	KeyField: 0,
                    	CalcLogic: "",
                    	Format: "",
                    	PointCount: 0,
                    	UpdateEdit: 1,
                    	InsertEdit: 1
                    },
                    {
                    	Type: "Text",
                    	Hidden: 0,
                    	Width: 200,
                    	Align: "Left",
                    	ColMerge: 0,
                    	SaveName: "mnu_nm_ja",
                    	KeyField: 0,
                    	CalcLogic: "",
                    	Format: "",
                    	PointCount: 0,
                    	UpdateEdit: 1,
                    	InsertEdit: 1
                    },
                    {
                    	Type: "Text",
                    	Hidden: 0,
                    	Width: 200,
                    	Align: "Left",
                    	ColMerge: 0,
                    	SaveName: "mnu_nm_ko",
                    	KeyField: 0,
                    	CalcLogic: "",
                    	Format: "",
                    	PointCount: 0,
                    	UpdateEdit: 1,
                    	InsertEdit: 1
                    },
                    {
                        Type: "Text",
                        Hidden: 0,
                        Width: 500,
                        Align: "Left",
                        ColMerge: 0,
                        SaveName: "mnu_desc",
                        KeyField: 1,
                        CalcLogic: "",
                        Format: "",
                        PointCount: 0,
                        UpdateEdit: 1,
                        InsertEdit: 1
                    },
                    {
                        Type: "Combo",
                        Hidden: 0,
                        Width: 90,
                        Align: "Center",
                        ColMerge: 0,
                        SaveName: "use_flg",
                        KeyField: 0,
                        CalcLogic: "",
                        Format: "",
                        PointCount: 0,
                        UpdateEdit: 1,
                        InsertEdit: 1
                    },
                    {Type: "Text", Hidden: 1, Width: 0, Align: "Center", ColMerge: 0, SaveName: "cur_cnt"},
                    {
                        Type: "Int",
                        Hidden: 0,
                        Width: 90,
                        Align: "Center",
                        ColMerge: 0,
                        SaveName: "mnu_img_index",
                        KeyField: 1,
                        CalcLogic: "",
                        Format: "",
                        PointCount: 0,
                        UpdateEdit: 1,
                        InsertEdit: 1
                    }];
                InitColumns(cols);
                SetEditable(1);
                SetSheetHeight(600);
                SetColProperty("use_flg", {ComboText: "ENABLE|DISABLE", ComboCode: "Y|N"});
            }
            break;
    }
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		showCompleteProcess();
	}
}
function sheet1_OnSearchEnd(sheetObj, errMsg){
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		if(show_complete == "Y"){
			showCompleteProcess();
			show_complete = "N";
		}
	}
}

function fn_langChang(obj) {
	document.form.f_lang_cd.value = obj.value;
	ln_lang_tp = document.form.f_lang_cd.value;
	// #535: [SBS] 다국어 처리 V1.0 
	// 언어 설정별 좌측 메뉴 틀어지는 현상 수정 
	// system option에서 설정된 언어별 css값을 설정
	ajax_Send_css_opt_minWidth_Value2();
	ajax_Send_css_opt_fontSize_Value2();
}


//#535: [SBS] 다국어 처리 V1.0 2차
// 언어 설정별 좌측 메뉴 틀어지는 현상 수정 
// system option에서 설정된 언어별 css값을 설정
// MIN_WIDTH설정
function ajax_Send_css_opt_minWidth_Value2(){
	var formObj = document.form;

	var opt_key = "CSS_MENU_MIN_WIDTH_";
	var sUseLangCd = ln_lang_tp;
	opt_key = opt_key + sUseLangCd;
	ajaxSendPost(setSend_css_opt_minWidth_Value2, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setSend_css_opt_minWidth_Value2(reqVal){
	var formObj = document.form;
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == "OK" && doc[1]!= undefined ) { //DB 에서 option data가 잘 들어가 있는 경우
		if (doc[1] != "") {
			formObj.f_min_width.value = doc[1];
		}
	}
}

// 폰트 사이즈 설정
function ajax_Send_css_opt_fontSize_Value2(){
	var formObj = document.form;
	var opt_key = "CSS_MENU_FONT_SIZE_";
	var sUseLangCd = ln_lang_tp;
	opt_key = opt_key + sUseLangCd;
	ajaxSendPost(setSend_css_opt_fontSize_Value2, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setSend_css_opt_fontSize_Value2(reqVal){
	var formObj = document.form;
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == "OK" && doc[1]!= undefined ) { //DB 에서 option data가 잘 들어가 있는 경우
		if (doc[1] != "") {
			formObj.f_font_size.value = doc[1];
		}
	}
}

function fncMenuCssSave(){
	if(event.keyCode==13){
		doWork("CSS_SAVE");
	};
}

//#582 [Master Menu] Not Insert a new row automatically when focus in [Index] column at grid and pressing "tab" key
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="mnu_img_index"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 2);
	}
}