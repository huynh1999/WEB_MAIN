
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var formObj  = document.frm1;
    var sheetObj = docObjects[0];


    switch(srcName) {
       case "SEARCHLIST":
    	   if(formObj.template_code.value == ""){
    		   //Template List Data Select
    		   alert(getLabel('FMS_COM_ALT001') + "\n\n: MGT_JOB_0040.12");
    	   }else{
	       		//sheetObj.ShowDebugMsg = true;
	            formObj.f_cmd.value = SEARCHLIST;
	            //검증로직
	            //if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
	            	sheetObj.DoSearch4Post("MGT_JOB_0040GS.clt", FormQueryString(formObj));
	            // }            
	            var template_code = formObj.template_code.value;
    	   }
       break;       
       case "NEW":			
			sheetObj.RemoveAll();
       break;
       case "ROWADD":
            sheetObj.DataInsert();
       break;     
   	   case "TPLSEARCH":
          	doTplAction();
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
    doTplAction();
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
		        style.height = 400;
		        
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
		        InitRowInfo( 2, 1, 9, 100);
		
		        //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
		        InitColumnInfo(10, 0, 0, true);
		
		        // 해더에서 처리할 수 있는 각종 기능을 설정한다
		        InitHeadMode(true, true, true, true, false,false) ;
		
		        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		        InitHeadRow(0, getLabel('MGT_JOB_0040_HDR1_1'), true);
		        InitHeadRow(1, getLabel('MGT_JOB_0040_HDR1_2'), true);
		        
		        //데이터속성    [ROW,   COL,   DATATYPE,   WIDTH, DATAALIGN, COLMERGE,  SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]

		        InitDataProperty(0, 0,  dtData,        120,   daLeft,    true,    "cd_nm",       false,       "",       dfNone,      0,          false,      true);
		        InitDataProperty(0, 1,  dtData,         80,   daLeft,    true,    "tmplt_nm",    false,       "",       dfNone,      0,          false,      true);
		        InitDataProperty(0, 2,  dtData,        150,   daLeft,    true,    "desc",        false,       "",       dfNone,      0,          false,      true);
		        InitDataProperty(0, 3,  dtData,         55,   daRight,   true,    "dur_tm_qty",  false,       "",       dfNone,      0,          false,      true);
		        InitDataProperty(0, 4,  dtData,         80,   daLeft,    true,    "rgst_usrid",  false,       "",       dfNone,      0,          false,      true);
		        InitDataProperty(0, 5,  dtData,        130,   daCenter,  true,    "rgst_tms",    false,       "",       dfNone,      0,          false,      true);
		        InitDataProperty(0, 6,  dtData,         80,   daLeft,    true,    "modi_usrid",  false,       "",       dfNone,      0,          false,      true);
		        InitDataProperty(0, 7,  dtData,        130,   daCenter,  true,    "modi_tms",    false,       "",       dfNone,      0,          false,      true);
		        InitDataProperty(0, 8,  dtData,         30,   daLeft,    true,    "rgst_ofc_cd", false,       "",       dfNone,      0,          false,      true);
		        InitDataProperty(0, 9,  dtHidden, 		 0,   daCenter,  false, 	"Indexing");
		    }
		break;		
    }
}


/**
 * Templet List 검색
 */
function doTplAction(){
//조회조건 Templet List 검색
	var formObj  = document.frm1;	
	var category_code = formObj.category_code.value;
	if(category_code==""){
		document.frm1.category_code.options[0] = new Option( 'All',  ''  );
		document.frm1.category_code.options.length = '1';
		return;
	}
	
	//alert("category_code===>"+category_code);

	ajaxSendPost(dispCntAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchTemplateCombo&category_code='+category_code, './GateServlet.gsl');

}

//Templet List 조회
function dispCntAjaxReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	
	//alert("reqVal===>");
	
	if(doc[0]=='OK'){

		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split(';');
			var arrLen = rtnArr.length;
			
			//alert("arrLen===>"+arrLen);
			var tempLen = document.frm1.template_code.length = 0;
			document.frm1.template_code.options[0]=new Option("", "");
			//alert(arrLen);
			for( var i = 1; i < arrLen ; i++ ){
				var masterVals = rtnArr[i-1].split(',');	
				
				//alert("masterVals[0]===>"+masterVals[0]);
				//alert("masterVals[1]===>"+masterVals[1]);
				document.frm1.template_code.options[i]=new Option(masterVals[1],masterVals[0]);
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MGT_JOB_0040.171");		
	}
	
}
