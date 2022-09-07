function doWork(srcName){
    // 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.frm1;

    switch(srcName) {
       case "SEARCHLIST":
            var chkOk = true;
            //일자를 선택한 경우
            if(frm1.f_dt_clss_cd[0].checked){
            	var tmpDt = frm1.etd_strdt.value;
            	if(tmpDt.length<10){
            		//alert('조회일자를 입력해 주십시오!');
            		alert(getLabel('FMS_COM_ALT001')+ "\n\n: CMM_POP_0230.14");
            		chkOk = false;
            		frm1.etd_strdt.focus();
            	}
            }
            if(chkOk){
	    	   	formObj.f_cmd.value = SEARCHLIST;
	            sheetObj.DoSearch4Post("CMM_POP_0230GS.clt", FormQueryString(formObj));
            }
       break;
    }
}

/**
 * 화면로드시 원간 조회의 <select>에 현재일을 선택하게함 
 */
function setToday(){

	getYearSelectList(frm1.f_etd_year);
	var curMonth= todayMonth();
	if(curMonth<10){
		curMonth = '0'+curMonth;
	}

	//유저 브라우저상의 월을 선택함
	var monthVals= frm1.f_etd_month.options;
	for(var i = 0; i < monthVals.length; i++){
		if(curMonth==monthVals[i].value){
			monthVals[i].selected = true;
		}
	}
}

/**
 * 조회기간 조건 선택시
 */
function chgDisp(dispTp){
	if(dispTp==1){
		getObj('monthVal').style.display = 'none';
		getObj('dayVal').style.display   = 'block';
	}else{
		getObj('dayVal').style.display   = 'none';
		getObj('monthVal').style.display = 'block';
	}
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
	
	var arg = window.dialogArguments;

	var formObj  = document.frm1;
	formObj.openMean.value = arg[0];
	
    for(var i=0;i<docObjects.length;i++){
        // khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        // khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    //오늘날짜 가져오기(BookingNo 생성용)
	var now 	= new Date(); 				// 현재시간 가져오기
	var year	= now.getYear(); 			// 년도 가져오기
	var month	= now.getMonth() + 1; 		// 월 가져오기 (+1)
	var date	= now.getDate(); 			// 날짜 가져오기
	
	if(month < 10){
		month = "0"+(month);
	}
	if(date < 10){
		date = "0"+date;
	}
	
	today = year +"-"+ month +"-"+ date;
	formObj.etd_strdt.value = today;
}


/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++] = sheet_obj;
}


/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:      // IBSheet1 init
		
		    with (sheetObj) {
		        // 높이 설정
		        style.height = 410;
		        
		        // 전체 너비 설정
		        SheetWidth = mainTable.clientWidth;
		       // SheetWidth = 400;
		
		        // Host정보 설정[필수][HostIp, Port, PagePath]
		        if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
		
		        // 전체Merge 종류 [선택, Default msNone]
		        MergeSheet = msHeaderOnly;
		
		       // 전체Edit 허용 여부 [선택, Default false]
		        Editable = false;
		
		        // 행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
		        InitRowInfo( 2, 1, 9, 100);
		
		        // 컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
		        InitColumnInfo(6, 0, 0, true);
		
		        // 해더에서 처리할 수 있는 각종 기능을 설정한다
		        InitHeadMode(true, true, true, true, false,false) ;
		
		        var HeadTitle1 = "No|Currency|Exchange\nRate|Apply Date|Apply Date";
		        var HeadTitle2 = "No|Currency|Exchange\nRate|From|To" ;

		        // 해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		        InitHeadRow(0, getLabel('CMM_POP_0230_HDR_1'), true);
		        InitHeadRow(1, getLabel('CMM_POP_0230_HDR_2'), true);
		        
		        //데이터속성          [ROW, COL,   DATATYPE,   WIDTH,  DATAALIGN, COLMERGE, SAVENAME,      KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		        InitDataProperty(0,   0,  dtData,          40,   daCenter,  true,    "");
		        InitDataProperty(0,   1,  dtHidden,       130,   daCenter,  true,    "xch_curr_cd",   false,      "",       dfNone,  	   0,         true,      true);		        
		        InitDataProperty(0,   2,  dtData,         260,   daRight,   true,    "xch_amt",       false,      "",       dfNone,  	   0,         true,      true);
				InitDataProperty(0,   3,  dtData,         130,   daCenter,  true,    "fm_dt",         false,      "",       dfDateYmd,     0,         true,      true);
				InitDataProperty(0,   4,  dtData,         130,   daCenter,  true,    "to_dt",         false,      "",       dfDateYmd,     0,         true,      true);
				InitDataProperty(0,   5,  dtHidden,       130,   daCenter,  true,    "finc_xcrt_seq", false,      "",       dfNone,        0,         true,      true);
		   }                                                      
		break;
    }
}

function doDisplay(doWhat, formObj){
    switch(doWhat){
        /*case 'DATE01':   //달력 조회 From ~ To 팝업 호출 
            var cal = new calendarPopupFromTo();
            cal.displayType = "date";
            cal.select(formObj.s_modi_tms_fm, 's_modi_tms_fm', formObj.s_modi_tms_to, 's_modi_tms_to', 'yyyy-MM-dd');
        break;*/
        case 'DATE01':   //달력 조회 팝업 호출
             var cal = new calendarPopup();
             cal.select(formObj.etd_strdt, 'etd_strdt', 'yyyy-MM-dd');
        break;
    }
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	
	var retArray = sheetObj.CellValue(Row, "xch_amt");
	retArray += "|";
	retArray += sheetObj.CellValue(Row, "xch_curr_cd");
	
	window.returnValue=retArray;
	window.close();
}