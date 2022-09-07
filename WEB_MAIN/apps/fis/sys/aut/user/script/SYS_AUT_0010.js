function doWork(srcName){
	if(!btnVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.fName;

    try {
        switch(srcName) {
           case "SEARCHLIST":
                formObj.f_cmd.value = SEARCHLIST;
                //sheetObj.ShowDebugMsg = true;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                    sheetObj.DoSearch4Post("SYS_AUT_0010GS.clt", FormQueryString(formObj));
                }
                //sheetObj.ShowDebugMsg = false;
           break;
           case "SAVE":
                formObj.f_cmd.value = MULTI;
                
                if(inpuValCheck(sheetObj)){
	                //전체 CellRow의 갯수
                	//Do you want to proceed?
	                if(confirm(getLabel('FMS_COM_CFMCON'))){
	                    doProcess = true;
	                    sheetObj.DoSave("SYS_AUT_0010GS.clt", FormQueryString(formObj),"ibflag",false);
	                }
                }
           break;
           case "ROWADD":
        	   //마지막행에 Row를 생성한다.
               sheetObj.DataInsert(-1);
           break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SYS_AUT_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SYS_AUT_0010.002"); 
        }
    }
}

/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value = callPage;
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
 * 좌측 메뉴조회
 */
function chgusrPwd(callId){
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=usrpwdchg&usrid='+callId, './GateServlet.gsl');
}

var calledMenu;
var displayedMenu;

//코드표시 Ajax
function dispAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	if(doc[0]=='OK'){
		//Changed password successfully!
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}


/**
 * 입력값 체크
 */
function inpuValCheck(sheetObj){
	var rowCnt = sheetObj.rows;
	var isOk = true;
	var loopNum = 0;
	var checkVal = false;
	
	for(var i = 1; i < rowCnt; i++){
	   var stat = sheetObj.CellValue(i, 'ibflag');
	   if(stat!='R'){
		   if(stat=='I'){
			   checkVal = true;
			   loopNum++;
		   }else if(stat=='U'){
			   checkVal = true;
			   loopNum++;
		   }
	
		   if(checkVal){
			   if(checkInputVal(sheetObj.CellValue(i, 'usrid'), 5, 12, "T", 'ID')!='O'){
			    	isOk = false;
			    	break;
			
			   }else if(checkInputVal(sheetObj.CellValue(i, 'eng_usr_nm'), 2, 200, "T", getLabel('ITM_USRNMENG'))!='O'){
			    	isOk = false;
			    	break;
					    	
			   }else if(checkInputVal(sheetObj.CellValue(i, 'locl_usr_nm'), 2, 50, "T", getLabel('ITM_USRNMLOCAL'))!='O'){
				 	isOk = false;
			    	break;   
				   
			   }else if(checkInputVal(sheetObj.CellValue(i, 'ofc_name'), 1, 100, "T", getLabel('FMS_COD_OFCE'))!='O'){
			    	isOk = false;
			    	break;
			    	
			   }else if(checkInputVal(sheetObj.CellValue(i, 'addr'), 10, 200, "T", getLabel('ITM_ADDR'))!='O'){
			    	isOk = false;
			    	break;
			    	
			   }else if(checkInputVal(sheetObj.CellValue(i, 'eml'),  7, 100, "T", getLabel('ITM_EML'))!='O'){
			    	isOk = false;
			    	break;
			    	
			   }else if(checkInputVal(sheetObj.CellValue(i, 'phn'),  5,   30, "T", getLabel('ITM_PHN'))!='O'){
			    	isOk = false;
			    	break;
			   }
			   checkVal = false;
		   }
	   }
	}

	if(loopNum==0){
		//No data to proceed!
		alert(getLabel('FMS_COM_ALT010')+ "\n\n: SYS_AUT_0010.138");
		isOk = false;
	}
	return isOk;
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
		        style.height = 410;
		        
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
		        InitColumnInfo(13, 0, 0, true);
		
		        // 해더에서 처리할 수 있는 각종 기능을 설정한다
		        InitHeadMode(true, true, true, true, false,false) ;

		
		        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		        InitHeadRow(0, getLabel('USERMGMT_HDR1'), false);
						        
		        //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		        InitDataProperty(0, 0,  dtHiddenStatus,     0,   daCenter, false,    "ibflag");
		        InitDataProperty(0, 1,  dtData,            80,   daLeft,   false,    "usrid",         true,  "", dfNone,  0,  false, true)
		        InitDataProperty(0, 2,  dtData,           100,   daLeft,   false,    "eng_usr_nm",    false, "", dfNone,  0,  true,  true,  200);
				InitDataProperty(0, 3,  dtData,           120,   daLeft,   false,    "locl_usr_nm",   false, "", dfNone,  0,  true,  true,  50);
				InitDataProperty(0, 4,  dtPopup,           80,   daLeft,   false,    "ofc_name",      false, "", dfNone,  0,  true,  true);
				InitDataProperty(0, 5,  dtCombo,           80,   daLeft,   false,    "use_lang_cd",   false, "", dfNone,  0,  true,  true);
				InitDataProperty(0, 6,  dtCombo,           80,   daLeft,   false,    "role_cd",       false, "", dfNone,  0,  true,  true);
				InitDataProperty(0, 7,  dtData,           280,   daLeft,   false,    "addr",          false, "", dfNone,  0,  true,  true,  400);
				InitDataProperty(0, 8,  dtData,           140,   daLeft,   false,    "eml",           false, "", dfNone,  0,  true,  true,  100);
		        InitDataProperty(0, 9,  dtData,           100,   daLeft,   false,    "phn",           false, "", dfNone,  0,  true,  true,  100);
		        InitDataProperty(0,10,  dtCombo,           70,   daCenter, false,    "use_flg");
		        InitDataProperty(0,11,  dtImage,           50,   daCenter, false,    "pwd",           false, "", dfNone,  0,  true,  true,  100);
				InitDataProperty(0,12,  dtHidden,          80,   daCenter, false,    "ofc_cd",        false, "", dfNone,  0,  true,  true);
				
		        //Cell Image display
		        ImageList(0) = APP_PATH+"/web/img/button/btn_reset.gif";
		        PopupButtonImage(0, "ofc_cd") = 0;
		        
		        //Mouse Cursor Hand
		        sheetObj.DataLinkMouse('pwd')= true;
		        
		        //콤보항목설정[ROW, COL, COMBO-TEXT, COMBO-CODE, DEFAULT-TEXT]
	            InitDataCombo (0,  5, LANGCD1,LANGCD2);
		        InitDataCombo (0,  6, ROLCD1, ROLCD2);
                InitDataCombo (0, 10, "ENABLE|DISABLE", "Y|N");
		   }                                                      
		break;
    }
}


function sheet1_OnClick(sheetObj, row, col) {
    var colStr = sheetObj.ColSaveName(col);

	//Ofice코드 조회
	if(colStr=='ofc_name'){
		var rtnary = new Array(1);
		rtnary[0] = "1";
		
		var rtnVal = window.showModalDialog('./CMM_POP_0050.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:600px");
	    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			//사무실명
			sheetObj.CellValue(row, 'ofc_name') = rtnValAry[1];
			
			//사무실코드
			sheetObj.CellValue(row, 'ofc_cd') = rtnValAry[0];
		}

	//패스워드 변경
	}else if(colStr=='pwd'){
		
		if(sheetObj.CellValue(row, 'pwd')==0){
			//Do you want to reset the User Password?
			if(confirm(getLabel('FMS_COM_CFMCON'))){
				chgusrPwd(sheetObj.CellValue(row, 'usrid'));	
			}
		}
	}
}