function doWork(srcName){
	if(!btnVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.frm1;

    switch(srcName) {
		case "SEARCHLIST":
            formObj.f_cmd.value = SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch4Post("MDM_MCM_0020GS.clt", FormQueryString(formObj));
            }
		break;
		case "ADD":
			if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
				useFlgChange();
				formObj.f_cmd.value = ADD;
            	sheetObj.DoSearch4Post("MDM_MCM_0020GS.clt", FormQueryString(formObj));
	        }
		break;
		case "MODIFY":
			if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
				useFlgChange();
				formObj.f_cmd.value = MODIFY;
            	sheetObj.DoSearch4Post("MDM_MCM_0020GS.clt", FormQueryString(formObj));
	        }
		break;
		case "ROWADD":
       		var iRows = sheetObj.Rows;
            var Row = sheetObj.DataInsert(++iRows);
            sheetObj.CellValue(Row, 3) = formObj.i_conti_cd.value;
			sheetObj.CellValue(Row, 4) = formObj.i_locl_nm.value;
			sheetObj.CellValue(Row, 5) = formObj.i_desc.value;
			sheetObj.CellValue(Row, 9) = formObj.i_rgst_usrid.value;
			sheetObj.CellValue(Row, 11) = formObj.i_rgst_tms.value;
			sheetObj.CellValue(Row, 12) = formObj.i_modi_usrid.value;
			sheetObj.CellValue(Row, 13) = formObj.i_modi_tms.value;
			
			var bolUseYn = formObj.i_use_flg.checked;
			if ( bolUseYn == "true" ) {
				sheetObj.CellValue(Row, 6) = "Y";
			} else {
				sheetObj.CellValue(Row, 6) = "N";
			}
		break;
		
		case "REMOVE":
            formObj.f_cmd.value = REMOVE;
            if(validateForm(sheetObj,formObj,REMOVE, 1)){
                //'삭제하시겠습니까?')){
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
                    doProcess = true;
                    sheetObj.DoSave("MDM_MCM_0020GS.clt", FormQueryString(formObj),"ibflag",false);
                }
			}
		break;
		
       	case "SEARCH":
			doAction();
		break;
		
		case "EXCEL":
			if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel(1,false,false,true,'','',false,false,'',false);
	   		}
		break;
    }
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value = callPage;
	doWork('SEARCHLIST', '');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value = 1;
	doWork('SEARCHLIST');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value = 1;
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
    doWork('SEARCHLIST');
}


/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++] = sheet_obj;
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
                // 높이 설정
               style.height = 310;
                
                //전체 너비 설정
                SheetWidth = mainTable.clientWidth;
               // SheetWidth = 400;

                //Host정보 설정[필수][HostIp, Port, PagePath]
                if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

                //전체Merge 종류 [선택, Default msNone]
                //MergeSheet = msPrevColumnMerge;
                MergeSheet = msHeaderOnly;

               //전체Edit 허용 여부 [선택, Default false]
                Editable = true;

                //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
                InitRowInfo( 1, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(17, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;

                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('MDM_MCM_0020_HDR'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, 0,  dtHidden,         40,  daCenter,  true,   "",     false,      "",       dfNone,      0,     true,      true);
                InitDataProperty(0, 1,  dtHidden,     		40,  daCenter,  true,    "ibflag");
      			InitDataProperty(0, 2,  dtData,           40,   daCenter,    true,    "",     false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 3,  dtData,           80,   daCenter,    true,    "conti_cd",   false,      "",       dfNone,      0,     false,      false);                
      			InitDataProperty(0, 4,  dtData,           130,   daLeft,    true,    "locl_nm",   false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 5,  dtData,           160,   daLeft,    true,    "desc",   false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 6,  dtData,           40,   daCenter,    true,    "use_flg",   false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 7,  dtHidden,           130,   daLeft,    true,    "eng_nm",   false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 8,  dtHidden,           80,   daLeft,    true,    "prnt_conti_cd",   false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 9,  dtHidden,           80,   daLeft,    true,    "prnt_conti_nm",   false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 10,  dtHidden,           80,   daLeft,    true,    "rgst_usrid",   false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 11,  dtHidden,           80,   daLeft,    true,    "rgst_ofc_cd",   false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 12,  dtHidden,           80,   daLeft,    true,    "rgst_tms",   false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 13,  dtHidden,           80,   daLeft,    true,    "modi_usrid",   false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 14,  dtHidden,           80,   daLeft,    true,    "modi_ofc_cd",   false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 15,  dtHidden,           80,   daLeft,    true,    "modi_tms",   false,      "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, 16,  dtHidden,         0,   daCenter,    false,    "Indexing");
           }                                                      
           break;
     }
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].CellValue(1, 'Indexing'), getObj('pagingTb'));
} 

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doDispPaging(docObjects[0].CellValue(1, 'Indexing'), getObj('pagingTb'));
}

function sheet1_OnClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	formObj.i_conti_cd.value = sheetObj.CellValue(Row, 3);
	formObj.i_locl_nm.value = sheetObj.CellValue(Row, 4);
	formObj.i_desc.value = sheetObj.CellValue(Row, 5);
	formObj.i_eng_nm.value = sheetObj.CellValue(Row, 7);
	formObj.i_prnt_conti_cd.value = sheetObj.CellValue(Row, 8);
	//formObj.i_prnt_conti_nm.value = sheetObj.CellValue(Row, 9);
	formObj.i_rgst_usrid.value = sheetObj.CellValue(Row, 10);
	formObj.i_rgst_tms.value = sheetObj.CellValue(Row, 12);
	formObj.i_modi_usrid.value = sheetObj.CellValue(Row, 13);
	formObj.i_modi_tms.value = sheetObj.CellValue(Row, 15);
	formObj.i_conti_cd.disabled = true;
	formObj.i_conti_cd.className = "search_form-disable";
	
	var bolUseYn = sheetObj.CellValue(Row, 6);
	if ( bolUseYn == "Y" ) {
		formObj.i_use_flg.checked = true;
	} else if ( bolUseYn == "N" ) {
		formObj.i_use_flg.checked = false;
	}
}

function displayClear() {
	var formObj  = document.frm1;
	formObj.i_conti_cd.value = "";
	formObj.i_locl_nm.value = "";
	formObj.i_eng_nm.value = "";
	formObj.i_desc.value = "";
	formObj.i_prnt_conti_cd.value = "";
	//formObj.i_prnt_conti_nm.value = "";
	formObj.i_rgst_usrid.value = "";
	formObj.i_rgst_tms.value = "";
	formObj.i_modi_usrid.value = "";
	formObj.i_modi_tms.value = "";
	formObj.i_use_flg.checked = "true";
	formObj.i_conti_cd.disabled = false;
	formObj.i_conti_cd.className = "search_form";
}

/**
 * 콤보 조회
 */
function doAction(){
	var formObj  = document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var i_conti_cd = formObj.i_conti_cd.value;
	if(checkAddModiVal(frm1)){
		ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchContinentCode&s_conti_cd='+i_conti_cd, './GateServlet.gsl');
	}
}

//확인 Ajax
function dispAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(checkAddModiVal(frm1)){
				doWork("MODIFY");
			}
		} else {
			if(checkAddModiVal(frm1)){
				doWork("ADD");
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MDM_MCM_0020.262");		
	}
	
}

function useFlgChange() {
	var formObj  = document.frm1;
	if ( formObj.i_use_flg.checked == true ) {
		formObj.i_use_flg.value = "Y";
	} else if ( formObj.i_use_flg.checked == false ) {
		formObj.i_use_flg.value = "N";
	}
	formObj.i_conti_cd.disabled = false;
}

function fncSubContinentSearch() {
	var formObj  = document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}

function checkAddModiVal(frm1){
    if(checkInputVal(frm1.i_conti_cd.value, 1, 2, "T", getLabel('SUB_CONTI_CD'))!='O'){
    	return false;
    } else if(checkSelectVal(frm1.i_prnt_conti_cd.value, getLabel('CONTI_CD'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_locl_nm.value, 1, 100, "T", getLabel('LOCAL_NM'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_eng_nm.value, 1, 50, "T", getLabel('ENG_NM'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_desc.value, 0, 200, "T", getLabel('DESC'))!='O'){
    	return false;
    }
    return true;
}