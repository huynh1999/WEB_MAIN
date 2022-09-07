
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.form;
	try {
        switch(srcName) {
    	   case "CLOSE":
    		   window.close();
       	   break;
    	   case "APPLY":
    		   var retArray = "";	
    		   for(var i=1 ; i<docObjects[0].rows ; i++){
    			   if(docObjects[0].CellValue(i, "check")==1){
    				   retArray += docObjects[0].CellValue(i, "intg_bl_seq");
    					retArray += "^^^";
    					retArray += docObjects[0].CellValue(i, "bl_no");
    					retArray += "@@@";
    			   }
    		   }
    		   if(retArray==""){
//    			   alert("Please select HAWB.");
    			   alert(getLabel('AIR_MSG_046'));
    		   }else{
    			   window.returnValue = retArray;
    			   window.close();
    		   }
    	   break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: AII_BMD_0071.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: AII_BMD_0071.002");
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
	var formObj  = document.form;
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    //arg[0]을 parsing 하여 리스트에 반영한다.
	var tmpArray = arg[0].toString().split(",");
	for(var i=0 ; i<tmpArray.length-1 ; i++){
		var result = tmpArray[i].split("^^^");
		docObjects[0].DataInsert(docObjects[0].Rows-1);
		
		docObjects[0].CellValue(docObjects[0].LastRow, "intg_bl_seq") = result[0];
		docObjects[0].CellValue(docObjects[0].LastRow, "bl_no") = result[1];
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
                style.height = 150;
                
                //전체 너비 설정
                SheetWidth = mainTable.clientWidth;
               // SheetWidth = 400;

                //Host정보 설정[필수][HostIp, Port, PagePath]
                if (location.hostname != "") InitHostInfo(location.hostname, location.Port, page_path);

                //전체Merge 종류 [선택, Default msNone]
                MergeSheet = msHeaderOnly;

               //전체Edit 허용 여부 [선택, Default false]
                Editable = true;

                //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
                InitRowInfo( 1, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(3, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
                
                var formObj  = document.form;
                
				if(true){
	                InitHeadRow(0, getLabel('AII_BMD_0071_HDR1'), true);
	                
	                InitDataProperty(0, 0,  dtCheckBox,		  40,   daCenter,  false,    "check",			false);
	                InitDataProperty(0, 1,  dtData,          140,   daLeft,    false,    "bl_no",			false,   "",       dfNone,         1,     false,       false);
	                InitDataProperty(0, 2,  dtHidden,         70,   daCenter,  false,    "intg_bl_seq",		false,   "",       dfNone,         1,     false,       false);
				}
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
	var retArray = "";	
	
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "house_bl_no"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "master_bl_no"));
		 
	retArray += sheetObj.CellValue(Row, "bl_no");
	retArray += "|";
	retArray += sheetObj.CellValue(Row, "intg_bl_seq");
		 	
	window.returnValue=retArray;
	
	window.close();
}

// 2011.12.27 KeyDown
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}