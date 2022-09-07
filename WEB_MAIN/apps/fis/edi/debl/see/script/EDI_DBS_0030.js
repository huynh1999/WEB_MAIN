/*
 * 2010/08/16 김진혁 추가
 * 조회 조건 입력 후 엔터로 조회하기 위한 펑션
 */
function doWork(srcName){
    var sheetObj = docObjects[0];
    var formObj  = document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value = SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                    sheetObj.DoSearch4Post("./EDI_DBS_0030GS.clt", FormQueryString(formObj));
                }
    	   break;    
    	   case "APPLY":
    		    
    		    var retArray = "";	

    		    var deli = "@@^";
    		    var lastDeli = "@@;";
				
				if(sheetObj.RowCount > 0){
				
					for(var i=1; i<=sheetObj.LastRow;i++){
					
						if(sheetObj.CellValue(i,"chk") == "1"){
						
							retArray += sheetObj.CellValue(i,"z_number");		//[0]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"b_number");		//[1]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"mrn_no");			//[2]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"ref_no");			//[3]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"bkgnbr");			//[4]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"goods_pkg");		//[5]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"goods_pkg_type");	//[6]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"goods_gross_wgt");	//[7]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"goods_gross_wgt_unit");	//[8]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"goods_net_wgt");	//[9]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"goods_net_wgt_unit");	//[10]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"goods_pos_no");		//[11]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"goods_pkg_id");		//[12]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"cntr_no");				//[13]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"cntr_tpsz_cd");		//[14]
				   		 	retArray += deli;	
				   		 	retArray += sheetObj.CellValue(i,"cntr_desc");			//[15]
				   		 	retArray += deli;
				   		 	retArray += sheetObj.CellValue(i,"cntr_list_seq");		//[16]
				   		 	retArray += deli;
				   		 
				   		 	retArray += lastDeli;
				   		 	
						}
					}
				}
	   		 		 	
	   		 	window.returnValue = retArray;
	   		 	
	   		 	window.close();
	   		 	
       	   break;       	   
       	   case "CLOSE":
   	              window.close();
       	   break;	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: EDI_DBS_0030.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: EDI_DBS_0030.002");
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
function viewCntChg(){
	document.forms[0].f_CurPage.value = 1;
	doWork('SEARCHLIST');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
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
	
	//alert("arg===>["+arg[0]+"]");
	
	var formObj  = document.form;
	formObj.openMean.value = arg[0];
	formObj.msg_no.value = arg[1];
	
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
                InitColumnInfo(19, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('EDI_DBS_0030_HDR1'), true);
                
                var cnt = 0;
                
                //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,     KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, cnt++,  dtCheckBox,	 40,    daCenter,    true,     	"chk",       false,    "",       dfNone,      0,     true,      true);
	            InitDataProperty(0, cnt++,  dtData,      90,    daCenter,  	false,     	"z_number",    false,    "",       dfNone,  	  0,     false,      false);
                InitDataProperty(0, cnt++,  dtData,      90,    daCenter,   false,     	"b_number" ,	 false,    "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, cnt++,  dtData,     120,    daCenter,  	false,  	"mrn_no",    false,    "",       dfNone,      0,     false,      false);
      			InitDataProperty(0, cnt++,  dtData,     100,    daCenter,   false,     	"ref_no", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtData,     100,    daCenter,   false,    	"bkgnbr", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0,    daCenter,   false,    	"goods_pkg", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0,    daCenter,   false,    	"goods_pkg_type", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0,    daCenter,   false,    	"goods_gross_wgt", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0,    daCenter,   false,    	"goods_gross_wgt_unit", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0,    daCenter,   false,    	"goods_net_wgt", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0,    daCenter,   false,    	"goods_net_wgt_unit", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0,    daCenter,   false,    	"goods_pos_no", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0,    daCenter,   false,    	"goods_pkg_id", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0,    daCenter,   false,    	"cntr_no", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0,    daCenter,   false,    	"cntr_tpsz_cd", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0,    daCenter,   false,    	"cntr_desc", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0,    daCenter,   false,    	"cntr_list_seq", 	 false,    "",       dfNone,  	  0,     false,      false);
      			InitDataProperty(0, cnt++,  dtHidden,     0, 	daCenter,  	false, 		"Indexing");
           }                                                      
           break;
    }
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].CellValue(1, 'Indexing'), getObj('pagingTb'));
} 

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
}

// 2011.12.27 KeyDown
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}