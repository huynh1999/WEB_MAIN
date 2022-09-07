/*
 * 2010/08/16 김진혁 추가
 * 조회 조건 입력 후 엔터로 조회하기 위한 펑션
 */
function fncTpCodeSearch() {
	var formObj  = document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}

function doWork(srcName){

    var sheetObj = docObjects[0];
    var formObj  = document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value = SEARCHLIST;
                
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                    sheetObj.DoSearch4Post("./CMM_POP_0120GS.clt", FormQueryString(formObj));
                }
    	   break;    
    	   case "btn_new":
    	            sheetObject.RemoveAll();
    	            formObject.reset();
       	   break;
       	   case "btn_ok":
   	             var opener = window.dialogArguments.document.sheet1 ;  // opener sheet1 이름은받아오세요
   	             var rows = sheetObject.Rows ;
   	             for ( i = 0 ; i < rows ; i++ )
   	             {
   	               if ( sheetObject.CellValue( i, "chk" ) == 1 ) {
   	                    var iRow = opener.DataInsert(-1);
   	                    for( j=0 ; j < sheetObject.LastCol ; j ++)
   	                    {
   	                        if ( sheetObject.ColSaveName(j) != "" ) {   // 현재 SaveName이 없는것들을 걸러내기위한조건
        	                         for(k=0 ; k < opener.LastCol ; k ++)
       	                        {
   	                                if ( opener.ColSaveName(k) == sheetObject.ColSaveName(j))
      	                                opener.CellValue2( iRow, opener.ColSaveName(k)) = sheetObject.CellValue( i , sheetObject.ColSaveName(j)) ;
     	                            }
      	                       }
   	                    }
   	               }
   	             }
                 window.close();
        	break;

       	    case "CLOSE":
   	              window.close();
       	    break;	   
    	   
    	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0120.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0120.002");
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

	var arg=window.dialogArguments;
	
	//alert("arg===>["+arg[0]+"]");
	
	var formObj  = document.form;
	formObj.openMean.value = arg[0];
	
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
                style.height = 310;
                
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
                InitColumnInfo(3, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;

                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('CMM_POP_0120_HDR'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, 0,  dtData, 		  40, 	daCenter,  false, 	"",    	     false,      "",       dfNone,  		0,     true,      true);
                InitDataProperty(0, 1,  dtData,     	 100,   daCenter,  false,   "pck_ut_cd", false,      "",       dfNone,  		0,     true,      true);
                InitDataProperty(0, 2,  dtData,          200,   daLeft,    false,   "pck_nm", 	 false,      "",       dfNone,      0,     true,      true);
      			
                //콤보항목설정[ROW, COL, COMBO-TEXT, COMBO-CODE, DEFAULT-TEXT]
                // InitDataCombo (0, 6,"ENABLE|DISABLE",        "Y|N");
                
           }                                                      
           break;
    }
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){

	var formObj  = document.form;
	
	var openMean = formObj.openMean.value ; 
	
	var retArray = "";	
	
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "pck_ut_cd"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "pck_nm")); 
	
	retArray += sheetObj.CellValue(Row, "pck_ut_cd");
	retArray += "|";
	retArray += sheetObj.CellValue(Row, "pck_nm");
		 	
	window.returnValue=retArray;
	
	window.close();
}
