function doWork(srcName){
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	
    switch(srcName) {
	    case "SEARCHLIST":
	    	formObj.f_cmd.value = SEARCHLIST;
	    	sheetObj.DoSearch4Post("RPT_FAX_0010GS.clt", FormQueryString(formObj));
    	
	    	break;		
	    
	    case "ROW_ADD":
	    	sheetObj.DataInsert(sheetObj.Rows);
	    
	    	break;
		
	    case "SEND":
			if(formObj.tifFile.value == ""){
				//Please input file field
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: RPT_FAX_0010.19");	
			}
			
			if(sheetObj.Rows > 1){
				for(var i = 1 ; i < sheetObj.Rows ; i++){
					if(sheetObj.CellValue(i, "country_no") == "" || sheetObj.CellValue(i, "area_no") == ""
						|| sheetObj.CellValue(i, "fax_no") == ""){
						//Please input mandatory field
						alert(getLabel('FMS_COM_ALT001')+ "\n\n: RPT_FAX_0010.27");	
						
						return;
					}
				}
				ajaxSendPost(resultAjaxReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+"fax_cre_no"+'&s_code='+"", './GateServlet.gsl');
			}
		
			break;
			
		case "MODIFY":
			frm1.f_cmd.value = MODIFY;
			
			var sht1 = sheetObj1.GetSaveString(true);
			 
			sheetObj2.DataInsert(sheetObj2.LastRow);
			 
			sheetObj2.DoAllSave("./RPT_FAX_0010_2GS.clt", FormQueryString(frm1));
		
			break;
			
		case "CLOSE":
	    	window.close();
    	
	    	break;
    }
}

//코드표시 Ajax
function resultAjaxReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	
	var sheetObj1 = docObjects[0];
	var sheetObj2 = docObjects[1];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');	

			formObj.m_corpfrcode.value = masterVals[0];
			
			frm1.f_cmd.value = ADD;
			
			var sht1 = sheetObj1.GetSaveString(true);
			 
			sheetObj2.DataInsert(sheetObj2.LastRow);
			 
			sheetObj2.DoAllSave("./RPT_FAX_0010_2GS.clt", FormQueryString(frm1)+'&'+sht1);
		}
	}
}

/**
* 전체 데이터 저장 완료시
*/
function sheet2_OnSaveEnd(sheetObj, Row, Col) {
	var formObj  = document.frm1;
	var sheetObj1 = docObjects[0];
	
	formObj.m_id.value = "clt00";
	formObj.m_pw.value = "clt00";
	
	var faxNo = "";
	for(var i = 1 ; i < sheetObj1.Rows ; i++){
		faxNo += "," + sheetObj1.CellValue(i, "country_no") + "-" + sheetObj1.CellValue(i, "area_no")
			+ "-" + sheetObj1.CellValue(i, "fax_no");
	}
	
	formObj.m_fax.value = faxNo.substring(1);
	
	formObj.action = "http://www.netshot.co.kr/corp/tsend.php"
	formObj.submit();
}

//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
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
//	doWork('SEARCHLIST');
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
		style.height = 200;
		
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
		InitColumnInfo(7, 0, 0, true);
		
		// 해더에서 처리할 수 있는 각종 기능을 설정한다
		InitHeadMode(true, true, true, true, false,false) ;
		
		//해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		InitHeadRow(0, getLabel('RPT_FAX_0010_HDR1'), true);
		
		var cnt = 0;
		
		//데이터속성    [ROW,   COL,   DATATYPE,	WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		InitDataProperty(0, cnt++,  dtCheckBox,     40,  daCenter,  true,    "chk",			false,      "",       dfNone,      0,     true);
		InitDataProperty(0, cnt++,  dtData,        150,  daLeft,  	true,    "rcpt_cmp_nm",	false,      "",       dfNone,      0,     false);
		InitDataProperty(0, cnt++,  dtData,         80,  daLeft,  	true,    "country_no",	true,       "",       dfNone,      0,     true,		true);
		InitDataProperty(0, cnt++,  dtData,         60,  daLeft,  	true,    "area_no",		true,       "",       dfNone,      0,     true,		true);
		InitDataProperty(0, cnt++,  dtData,        100,  daLeft,  	true,    "fax_no",		true,       "",       dfNone,      0,     true,		true);
		InitDataProperty(0, cnt++,  dtHidden,      100,  daLeft,  	true,    "trdp_cd",		false,      "",       dfNone,      0,     false);
		InitDataProperty(0, cnt++,  dtHiddenStatus,  0,  daCenter,  false,   "ibflag1");
		
		}                                                      
		break;
		
		case 2:     //Hidden
		with (sheetObj) {
		// 높이 설정
		style.height = 0;
		
		//전체 갯수표시 위치 지정. 0: 사라지게함.
		CountPosition = 0;
		
		//전체 너비 설정
		SheetWidth = mainTable.clientWidth;
		// SheetWidth = 400;
		
		//Host정보 설정[필수][HostIp, Port, PagePath]
		if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
		
		//전체Merge 종류 [선택, Default msNone]
		//MergeSheet = msHeaderOnly;
		MergeSheet = msHeaderOnly;
		
		//전체Edit 허용 여부 [선택, Default false]
		Editable = true;
		
		//행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
		InitRowInfo( 1, 1, 9, 100);
		
		//컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
		InitColumnInfo(1, 0, 0, true);
		
		// 해더에서 처리할 수 있는 각종 기능을 설정한다
		InitHeadMode(true, true, true, true, false,false) ;
		
		//해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		InitHeadRow(0, "ibflag", false);
		
		var cnt = 0;
		//데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE,    SAVENAME,        KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		InitDataProperty(0, cnt++,   dtHiddenStatus,   0,   daCenter,    false,    "ibflag2");
		}                                                      
		break;
	}
}
