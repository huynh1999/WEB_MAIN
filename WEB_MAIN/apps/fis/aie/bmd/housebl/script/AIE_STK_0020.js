

function doWork(srcName){

    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var sheetObj1 = docObjects[1];
    var formObj  = document.frm1;
    
	try {
        switch(srcName) {
    	       	   
       	   case "CLOSE":
   	       		window.close();
       	   break;	   
    	   
    	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: AIE_STK_0020.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: AIE_STK_0020.002");
        }
	}
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
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

	var arg=window.dialogArguments;
	var formObj  = document.frm1;
	
	//frm1Obj.openMean.value = arg[0];
	

    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    
    //BRANCH 를 조회한다.
    CODETYPE   = "Branch";
	ajaxSendPost(commaonSelectAjaxReq, 'reqVal', '&goWhere=aj&bcKey=commonCode&codeType='+CODETYPE, './GateServlet.gsl');
	
	formObj.branch_in.value 		= arg[1];
	formObj.air_sea_bnd_in.value 	= arg[2];
	
    var sheetObj1 = docObjects[1];
    
	//두번째 그리드 정보를 조회한다. Stock Summary	
	formObj.f_cmd.value = SEARCHLIST02;
    sheetObj1.DoSearch4Post("AIE_STK_0021GS.clt", FormQueryString(formObj));
    
                    
                
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
                style.height = 250;
                
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
                InitColumnInfo(4, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
				
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('AIE_STK_0020_HDR1'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN,   COLMERGE, SAVENAME,    		KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, 0,    dtData,            110,   daCenter,    false,    "rct_dt",  		false,      "",       dfDateYmd,    0,     false,      false);
      			InitDataProperty(0, 1,    dtData,            120,   daCenter,    false,    "hbl_no",   		false,      "",       dfNone,       0,     false,      false);
      			InitDataProperty(0, 2,    dtData,             80,   daCenter,    false,    "edi_cd",    	false,      "",       dfNone,  		0,     false,      false);
      			InitDataProperty(0, 3,    dtCheckBox,         50,   daCenter,    false,    "h_use_flg",  	false,      "",       dfNone,  		0,     false,      false,		-1,		false,		false,		"",		false);
      			
                
                HeadRowHeight = 20 ;
           }                                                      
           break;
           
           
         case 2:      //IBSheet1 init

            with (sheetObj) {
                // 높이 설정
                style.height = 150;
                
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
                InitColumnInfo(5, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
				
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('AIE_STK_0020_HDR2'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,   WIDTH, DATAALIGN,   COLMERGE, SAVENAME,    		KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, 0,    dtData,      120,   daCenter,    false,    "brnc_trdp_cd",	false,      "",       dfNone,       0,     false,      false);
                InitDataProperty(0, 1,    dtData,      105,   daCenter,    false,    "rct_dt",  		false,      "",       dfDateYmd,    0,     false,      false);
                InitDataProperty(0, 2,    dtData,       70,   daCenter,    false,    "s_use_tot",  		false,      "",       dfNone,       0,     false,      false);
      			InitDataProperty(0, 3,    dtData,       70,   daCenter,    false,    "s_stk_tot",   	false,      "",       dfNone,       0,     false,      false);
				
                HeadRowHeight = 20 ;
           }                                                      
           break;
           
           
       
           
           
           
    }
}



//조회 후 그리드 데이터를 각 필드에 셋팅한다.
function sheet1_OnSearchEnd(){
	
	var sheetObj1 = docObjects[1];
	var formObj = document.frm1;
	
	
	
}


//조회 후 그리드 데이터를 각 필드에 셋팅한다.
function sheet2_OnSearchEnd(){
	
	var sheetObj  = docObjects[0];
	var sheetObj1 = docObjects[1];
	var formObj = document.frm1;
	
	sheetObj.SelectCell(1,0);
	
	if(sheetObj.CellValue(1, "rct_dt") != ""){
		formObj.rct_dt_in.value = sheetObj1.CellValue(1, "rct_dt");
		
		
		//포커스색상을 준다.
		for(var i=0; i<sheetObj1.LastCol; i++){
			sheetObj1.RowBackColor(1)	= sheetObj1.RgbColor(223,255,255);
			
			for(var j=1; j<=sheetObj1.RowCount; j++){
				if(j != 1){
					sheetObj1.RowBackColor(j)	= sheetObj1.RgbColor(239,235,239);
				}
			}
		}
	
	
		//Stock List 
		formObj.f_cmd.value = SEARCHLIST01;
	    sheetObj.DoSearch4Post("AIE_STK_0020GS.clt", FormQueryString(formObj));
	}
	
}




//OnDblClick(Row,Col) 
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){

	var formObj  = document.frm1;
	var sheetObj  = docObjects[0];
	
	var retArray = "";	
	
	
	if(sheetObj.CellValue(Row,"h_use_flg") == 1){
//		alert("This HAWB already used. Please input another HAWB.");
		alert(getLabel('AIR_MSG_029'));
		return;
	}else{
		retArray += sheetObj.CellValue(Row, "hbl_no");
		window.returnValue = retArray;
		window.close();
	}	 
}


function sheet2_OnDblClick(sheetObj,Row,Col){
	
	var sheetObj  = docObjects[0];
	var sheetObj1 = docObjects[1];
	var formObj = document.frm1;
	
	
	//포커스색상을 준다.
	for(var i=0; i<sheetObj1.LastCol; i++){
		sheetObj1.RowBackColor(Row)	= sheetObj1.RgbColor(223,255,255);
		
		for(var j=1; j<=sheetObj1.RowCount; j++){
			if(j != Row){
				sheetObj1.RowBackColor(j)	= sheetObj1.RgbColor(239,235,239);
			}
		}
	}
	
	
	formObj.rct_dt_in.value = sheetObj1.CellValue(Row, "rct_dt");
	formObj.branch_in.value = sheetObj1.CellValue(Row, "brnc_trdp_cd");
	formObj.branch_in.value = sheetObj1.CellValue(Row, "brnc_trdp_cd");
		
	//Stock List 
	formObj.f_cmd.value = SEARCHLIST01;
    sheetObj.DoSearch4Post("AIE_STK_0020GS.clt", FormQueryString(formObj));
	    
	
}

function sheet1_OnMouseMove(Button, Shift, X, Y) {
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.frm1;
    
    var Row = sheetObj.MouseRow;
    var Col = sheetObj.MouseCol;
    sheetObj.MouseToolTipText = "";
    //window.status = "OnMouseMove Row=" + Row + ", Col=" + Col + ", Text=" + sText;
  	  	
  	if(Col == 5){
  		var sText = sheetObj.CellText(Row,Col);
  		//풍선도움말 만들기]
  		if(sText.length > 20  ){
  			sheetObj.ToolTipOption = "balloon:true;width:320;backcolor:#EBFFFF;forecolor:#333333;title:상세내용";  
		    sheetObj.MouseToolTipText = sText;
		    sheetObj.MousePointer = "Default";
		    window.status = sheetObj.MousePointer;
  		}
  	}
}

//공통 코드표시 Ajax
function commaonSelectAjaxReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	
	if(doc[0]=='OK'){
		
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split(';');
			var arrLen = rtnArr.length;
									
			//AIR
			if(CODETYPE == "Branch"){
				for( var i = 0; i < arrLen-1 ; i++ ){
					var masterVals = rtnArr[i].split('@^');
										
					formObj.branch_in.options[i] = new Option(masterVals[1],masterVals[0]);
				}
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: AIE_STK_0020.343");		
	}
}

function doSearchEvent(){
	var sheetObj1 = docObjects[1];
	var formObj   = document.frm1;

	//두번째 그리드 정보를 조회한다. Stock Summary	
	formObj.f_cmd.value = SEARCHLIST02;
    sheetObj1.DoSearch4Post("AIE_STK_0021GS.clt", FormQueryString(formObj));
}
