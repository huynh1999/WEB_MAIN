function doWork(srcName){
	try {
        switch(srcName) {
        	case  "SEARCHLIST":
        		frm1.f_cmd.value = SEARCHLIST;

        		var arg = window.dialogArguments;
        	    frm1.trdp_tp.value = arg[0];
        	    frm1.trdp_cd.value = arg[1];
        	    frm1.intg_bl_seq.value = arg[2];

        	    //docObjects[0].ShowDebugMsg = true;
        		docObjects[0].DoSearch4Post("./AIE_BMD_0028GS.clt", FormQueryString(frm1));
        		//docObjects[0].ShowDebugMsg = false;
        	break;
        	case "MODIFY":
        		frm1.f_cmd.value = MODIFY;
                if(confirm("담당자를 변경하시겠습니까? ")){
                	docObjects[0].DoSave("./AIE_BMD_0028GS.clt", FormQueryString(frm1),"ibflag", false);
                }
    	   break;    
       	   case "CLOSE":
   	       		window.close();
       	   break;	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: AIE_BMD_0028.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: AIE_BMD_0028.002");
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
                style.height = 280;
                
                //전체 너비 설정
                SheetWidth = mainTable.clientWidth;
               // SheetWidth = 400;

                //Host정보 설정[필수][HostIp, Port, PagePath]
                if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

                //전체Merge 종류 [선택, Default msNone]
                MergeSheet = msHeaderOnly;

               //전체Edit 허용 여부 [선택, Default false]
                Editable = true;

                //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
                InitRowInfo( 1, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(9, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
				
				HEAD_TITLE = "";
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('AIE_BMD_0028_HDR1_1'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN,   COLMERGE, SAVENAME,    		KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, 0,    dtRadioCheck,    40,   daCenter,    false,    "rep_flg",  		     false,      "",       dfNone,       0,     true,      true,			-1,		 false,		true,		"",		  false);
                InitDataProperty(0, 1,    dtHiddenStatus,   0,   daCenter,    false,    "ibflag");
                 
      			InitDataProperty(0, 2,    dtData,         120,   daLeft,      false,    "pic_nm",   	 false,      "",       dfNone,       0,     false,      false);
      			InitDataProperty(0, 3,    dtData,         100,   daLeft,      false,    "trd_div_nm",    false,      "",       dfNone,  	 0,     false,      false);
      			InitDataProperty(0, 4,    dtData,          88,   daLeft,      false,    "pic_phn",       false,      "",       dfNone,  	 0,     false,      false);
				InitDataProperty(0, 5,    dtData,     	   88,   daLeft,      false,    "pic_fax",       false,      "",       dfNone,  	 0,     false,      false);
                InitDataProperty(0, 6,    dtData,         110,   daLeft,      false,    "pic_eml" ,	     false,      "",       dfNone,       0,     false,      false);
                
      			InitDataProperty(0, 7,    dtData,          80,   daLeft,      false,    "pic_desc" ,	 false,      "",       dfNone,       0,     false,      false);
    			InitDataProperty(0, 8,    dtHidden,        80,   daLeft,      false,    "cntc_pson_seq", false,      "",       dfNone,       0,     false,      false);
           }                                                      
           break;
    }
}