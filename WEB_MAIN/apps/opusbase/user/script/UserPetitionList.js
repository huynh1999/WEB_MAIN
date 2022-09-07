function doWork(srcName){
    try {
        switch(srcName){
            case "SEARCHLIST":
        	    frm2.f_cmd.value = SEARCHLIST;
        	    frm2.f_CurPage.value = 1;
   		    	docObjects[0].DoSearch4Post("UserPetitionListGS.clt", FormQueryString(frm2));

   		    break;
            case "Send":
        		var formObj = document.frm1;
        		
        		formObj.f_cmd.value = MODIFY;
        		
        		formObj.target = "ifr_hidden";
    			
    			formObj.action = "./UserPetitionList.clt";
    			formObj.submit();
        	break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: UserPetitionList.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: UserPetitionList.002");
        }
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
    
    frm1.f_eml_title.value = '[E-Petition] '
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
		        style.height = 435;
		        
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
		        InitColumnInfo(8, 0, 0, true);
		
		        // 해더에서 처리할 수 있는 각종 기능을 설정한다
		        InitHeadMode(true, true, true, true, false,false) ;
		

		        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		        InitHeadRow(0, getLabel('NTC_LIST_HDR1'), false);
		        
		        //데이터속성    [ROW,   COL,   DATATYPE,WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		        InitDataProperty(0, 0,  dtData,        40,   daCenter,  false,    "no");
		        InitDataProperty(0, 1,  dtData,       350,   daLeft,    false,    "title");
		        InitDataProperty(0, 2,  dtHidden,     100,   daLeft,    false,    "user_id");
				InitDataProperty(0, 3,  dtHidden,     170,   daLeft,    false,    "user_name");
				InitDataProperty(0, 4,  dtData,        80,   daCenter,  false,    "reg_date",    false,   "",       dfDateYmd);
				InitDataProperty(0, 5,  dtHidden,       0,   daCenter,  false,    "exp_date",    false,   "",       dfDateYmd);
				InitDataProperty(0, 6,  dtHidden,       0,   daCenter,  false,    "Indexing");
				InitDataProperty(0, 7,  dtHidden,       0,   daCenter,  false,    "brd_seq");
				
		        sheetObj.DataLinkMouse("title")  = true;
		   }                                                      
		break;
    }
}

function sheet1_OnClick(callSheet, row, col) {
	var colStr = callSheet.ColSaveName(col);
	if(colStr=='title'){
		frm2.f_brd_seq.value = callSheet.CellValue(row, 7);
		doWork('COMMAND02');
	}
	
}