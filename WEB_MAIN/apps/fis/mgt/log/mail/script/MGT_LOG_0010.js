
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var formObj  = document.frm1;
    var sheetObj = docObjects[0];
    
    switch(srcName) {
		//NEW 버튼을 눌렀을때 Default 데이터를 조회한다.
		case "SEARCHLIST":
			formObj.f_cmd.value = SEARCHLIST;
    	  
			sheetObj.DoSearch4Post("MGT_LOG_0010GS.clt", FormQueryString(formObj));
    	  
		break;
		
    }
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
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    var now 	= new Date(); 				// 현재시간 가져오기
	var year	= now.getFullYear(); 			// 년도 가져오기
	var month	= now.getMonth() + 1; 		// 월 가져오기 (+1)
	var date	= now.getDate(); 			// 날짜 가져오기
	
	if(month < 10)
		month = "0" + month;
	if(date < 10)
		date = "0" + date;
	
	frm1.f_strdt.value = month + '-01' + '-' + year;
	frm1.f_enddt.value = month + '-' + date + '-' + year;
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
 * param : sheetObj1 ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:      //IBSheet1 init
		
		    with (sheetObj) {
		        // 높이 설정
		        style.height = 350;
		        
		        //전체 너비 설정
		        SheetWidth = mainTable.clientWidth;
		       // SheetWidth = 400;
		
		        //Host정보 설정[필수][HostIp, Port, PagePath]
		        if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
		
		        //전체Merge 종류 [선택, Default msNone]
		        MergeSheet = msHeaderOnly;
		
		       //전체Edit 허용 여부 [선택, Default false]
		        Editable = false;
		
		        //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
		        InitRowInfo( 1, 1, 9, 100);
		
		        //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
		        InitColumnInfo(9, 0, 0, true);
		
		        // 해더에서 처리할 수 있는 각종 기능을 설정한다
		        InitHeadMode(true, true, true, true, false,false) ;
				        		        
		        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('MGT_LOG_0010_HDR1'), false);
                
		        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                //var HeadTitle1 = " |ibflag|jb_tmplt_seq|Step|Sequence|Duration|Use Chk." ;
		        //InitHeadRow(0, HeadTitle1, false);
		        
                var cnt = 0;
                
		        //데이터속성    [ROW,   COL,   DATATYPE,   WIDTH, DATAALIGN, COLMERGE,  SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]		        
				InitDataProperty(0, cnt++,  dtData,         35,   daCenter,  true,    "seq",      	false,       "",       dfNone,      0,         false,     false);
				InitDataProperty(0, cnt++,  dtData,        120,   daLeft,    true,    "title",    	false,       "",       dfNone,      0,         false,     false);
				InitDataProperty(0, cnt++,  dtData,        290,   daLeft,  	 true,    "contents",   false,       "",       dfNone,      0,         false,     false);
				InitDataProperty(0, cnt++,  dtData,        190,   daLeft,    true,    "recipient", 	false,       "",       dfNone,      0,         false,     false);
				InitDataProperty(0, cnt++,  dtData,    	   120,   daLeft,    true,    "sender",   	false,       "",       dfNone,   	0,         false,     false);
				InitDataProperty(0, cnt++,  dtData,         40,   daCenter,  true,    "send_type",  false,       "",       dfNone,   	0,         false,     false);
				InitDataProperty(0, cnt++,  dtData,         60,   daCenter,  true,    "status",  	false,       "",       dfNone,   	0,         false,     false);
				InitDataProperty(0, cnt++,  dtData,         80,   daCenter,  true,    "rgst_tms",   false,       "",       dfDateYmd,   0,         false,     false);
				InitDataProperty(0, cnt++,  dtHiddenStatus,  0,   daCenter,  true,    "ibflag");
				
				InitViewFormat(0, "rgst_tms", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
      			EditDateFormat = "MDY";//날짜 입력을 월/일/년 으로 설정
      			
		   }                                                      
		break;
    }
}

function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
            var cal = new calendarPopupFromTo();
            cal.displayType = "date";
            cal.select(formObj.f_strdt, 'f_strdt', formObj.f_enddt, 'f_enddt', 'MM-dd-yyyy');
        break;
    }
}

function sheet1_OnDblClick(sheetObj, row, col){
	var colStr = sheetObj.ColSaveName(col);
	
	var rtnary = new Array(6);
	rtnary[0] = sheetObj.CellValue(row, "title");
	rtnary[1] = sheetObj.CellValue(row, "contents");
	rtnary[2] = sheetObj.CellValue(row, "recipient");
	rtnary[3] = sheetObj.CellValue(row, "sender");
	rtnary[4] = sheetObj.CellValue(row, "send_type");
	rtnary[5] = sheetObj.CellValue(row, "rgst_tms");
		
	var rtnVal = window.showModalDialog('./syscommon/mailtemplate/MailFormat.html', rtnary, "scroll:yes;status:no;help:no;dialogWidth:450px;dialogHeight:600px");
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		return;
	}
}