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

    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.form;
    
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value = SEARCHLIST;
                
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                    sheetObj.DoSearch4Post("./CMM_POP_0390GS.clt", FormQueryString(formObj));

                    //디버깅
                   // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
                   // alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));
                }
    	   break;    
    	   case "btn_new":
    	            sheetObject.RemoveAll();
    	            formObject.reset();
       	   break;
       	   
       	   case "CNTSEARCH":       	   
               	doCntAction();               
    	   break;
    	   
    	   case "LOCSEARCH":    	   		
               	doLocTpAction();
    	   break;

       	    case "btn_ok":
   	             var opener = window.dialogArguments.document.sheet1 ;  // opener sheet1 이름은받아오세요
   	             var rows = sheetObj.Rows ;
   	             for ( i = 0 ; i < rows ; i++ )
   	             {
   	               if ( sheetObj.CellValue( i, "chk" ) == 1 ) {
   	                    var iRow = opener.DataInsert(-1);
   	                    for( j=0 ; j < sheetObj.LastCol ; j ++)
   	                    {
   	                        if ( sheetObj.ColSaveName(j) != "" ) {   // 현재 SaveName이 없는것들을 걸러내기위한조건
        	                         for(k=0 ; k < opener.LastCol ; k ++)
       	                        {
   	                                if ( opener.ColSaveName(k) == sheetObj.ColSaveName(j))
      	                                opener.CellValue2( iRow, opener.ColSaveName(k)) = sheetObj.CellValue( i , sheetObj.ColSaveName(j)) ;
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
    	   
    	   case "MAPPING":
       		var modiMsg = "Do you want to proceed with selected code mapping?";//좌측 목록에서 선택후 수정한 경우
       		
       		if(sheetObj.RowCount() > 0 ){
       			formObj.f_cmd.value = COMMAND01;	
       			
       			for(var i=1; i<=sheetObj.RowCount+1; i++){
       				if(sheetObj.CellValue(i, sheetObj.SaveNameCol("chk")) == 1){
       					formObj.f_mp_val.value = formObj.s_name_on_ams.value;
	   					formObj.f_mp_cd.value = sheetObj.CellValue(i, sheetObj.SaveNameCol("loc_code"));
	   					formObj.f_eng_nm.value = sheetObj.CellValue(i, sheetObj.SaveNameCol("loc_name"));
	   					break;
       				}
       			}
   				
   				if(formObj.s_name_on_ams.value != '' && formObj.f_add_mapping.checked && confirm(modiMsg)){
   					sheetObj.DoSave("CMM_POP_0380GS.clt", FormQueryString(formObj),"chk",false);
   				}else{
   					sheet1_OnSaveEnd();
   				}
				
       		}
					
       	break;
    	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0390.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0390.002");
        }
	}
}

/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value = callPage;	
	doWork('SEARCHLIST');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){

	document.form.f_CurPage.value = 1;
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

    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
        
    var arg=window.dialogArguments;
		
	var formObj  = document.form;
	formObj.openMean.value = arg[0];	
	
	//2009.03.03 정성욱 추가 BL화면에서 OPEN시 CLASS를 LOCATION으로 selected 한다.
	if(arg[1] == "BL"){
		//formObj.s_class[1].selected 		= true;
		//formObj.s_class.disabled 			= true;
		//formObj.s_subconti_code.disabled 	= true;
		//formObj.s_country_code.disabled 	= true;
		
		//formObj.s_class.remove(3);
		doLocTpAction();
	//Node코드조회	
	}
	
	// 2011.12.27 value parameter
	formObj.s_loc_nm.value = arg[2];
	
	formObj.s_name_on_ams.value = arg[3];
	
	doWork('SEARCHLIST');
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
                style.height = 240;
                
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
                InitColumnInfo(16, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;

                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('CMM_POP_0390_HDR'), true);
				
				var cnt = 0;
				
                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, cnt++,  dtRadioCheck, 30,   daCenter,  false,    "chk",    	false,      "",       dfNone,  		0,    true,      true);
                 
                InitDataProperty(0, cnt++,  dtData, 		30,   daCenter,  false,    "",    		  false,      "",       dfNone);
                InitDataProperty(0, cnt++,  dtHidden,        0,   daCenter,  false,    "s_class",     false,      "",       dfNone);
                
                InitDataProperty(0, cnt++,  dtData,         60,   daCenter,  false,    "loc_code",	  false,      "",       dfNone);
      			InitDataProperty(0, cnt++,  dtData,        180,   daLeft,    false,    "loc_name",    false,      "",       dfNone);
                InitDataProperty(0, cnt++,  dtData,        120,   daLeft,    false,    "cnt_nm",      false,      "",       dfNone);
                
                InitDataProperty(0, cnt++,  dtData,         80,   daLeft,    false,    "loc_tp_desc", false,      "",       dfNone);
                
                InitDataProperty(0, cnt++,  dtData,         80,   daCenter,  false,    "iata_cd" ,	  false,      "",       dfNone);
      			InitDataProperty(0, cnt++,  dtData,         80,   daCenter,  false,    "ams_loc_val", false,      "",       dfNone);
      			InitDataProperty(0, cnt++,  dtHidden,      100,   daCenter,  false,    "loc_cd",	  false,      "",       dfNone);
      			InitDataProperty(0, cnt++,  dtHidden,      100,   daLeft,    false,    "loc_nm",      false,      "",       dfNone);
                InitDataProperty(0, cnt++,  dtHidden,      100,   daCenter,  false,    "nod_cd",  	  false,      "",       dfNone);
                InitDataProperty(0, cnt++,  dtHidden,      100,   daLeft,    false,    "nod_eng_nm",  false,      "",       dfNone);
                InitDataProperty(0, cnt++,  dtHidden,      100,   daLeft,    false,    "cnt_cd",  	  false,      "",       dfNone);
                InitDataProperty(0, cnt++,  dtData,         80,   daCenter,  false,    "stn_no", 	  false,      "",       dfNone);
      			InitDataProperty(0, cnt++,  dtHidden,     	 0,   daCenter,  false,    "Indexing");
      			  
                //콤보항목설정[ROW, COL, COMBO-TEXT, COMBO-CODE, DEFAULT-TEXT]
                InitDataCombo (0, 's_class',"LOCATION|NODE",        "L|N");
                
           }                                                      
           break;
    }
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].CellValue(1, 'Indexing'), getObj('pagingTb'));
} 


function sheet1_OnSaveEnd(){
	var sheetObj = docObjects[0];
    var formObj  = document.form;
    var openMean = formObj.openMean.value ; 
 	var retArray = "";	
	
	
	retArray += formObj.f_mp_cd.value;
	retArray += "|";
	retArray += "";
	retArray += "|";
	retArray += formObj.f_eng_nm.value;
	retArray += "|";
	retArray += formObj.f_mp_cd.value;
	retArray += "|";	 	
	retArray += "";
	retArray += "|";	 	
	retArray += "";
	retArray += "|";	 	
	retArray += "";
	
	window.returnValue=retArray;
	
	window.close();				
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){

	var formObj  = document.form;
	
	var openMean = formObj.openMean.value ; 
	
	var retArray = "";	
	
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "loc_cd"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "nod_cd"));
		 
	retArray += sheetObj.CellValue(Row, "loc_cd");
	retArray += "|";
	retArray += sheetObj.CellValue(Row, "nod_cd");
	retArray += "|";
	retArray += sheetObj.CellValue(Row, "loc_name");
	retArray += "|";
	retArray += sheetObj.CellValue(Row, "ams_loc_val");
	retArray += "|";	 	
	retArray += sheetObj.CellValue(Row, "cnt_nm");
	retArray += "|";	 	
	retArray += sheetObj.CellValue(Row, "cnt_cd");
	retArray += "|";	 	
	retArray += sheetObj.CellValue(Row, "stn_no");
	
	window.returnValue=retArray;
	
	window.close();
}

/**
 * country combo select
 */
function doCntAction(){

	var formObj  = document.form;
	
	var s_subconti_code = formObj.s_subconti_code.value;
	if(s_subconti_code==""){
		document.form.s_country_code.options[0] = new Option( 'All',  ''  );
		document.form.s_country_code.options.length = '1';
		return;
	}
	
	//alert("s_subconti_code===>"+s_subconti_code);
	
	ajaxSendPost(dispCntAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCountryCombo&s_subconti_code='+s_subconti_code, './GateServlet.gsl');

}

//코드표시 Ajax
function dispCntAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	
	//alert("reqVal===>");
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split(';');
			var arrLen = rtnArr.length-1;
			
			//alert("arrLen===>"+arrLen);
			
			for(var i = 0; i<arrLen; i++){
				var masterVals = rtnArr[i].split(',');	
				
				//alert("masterVals[0]===>"+masterVals[0]);
				//alert("masterVals[1]===>"+masterVals[1]);
				
				document.form.s_country_code.options[i]=new Option(masterVals[1],masterVals[0]);

			}
			//document.formObj.selectObj.optionObj[4]=new Option('선택 5','value5')
			
			if(document.form.s_cnt_code.value!=""){
				document.form.s_country_code.value = document.form.s_cnt_code.value;
			}
			
		}else{
		
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0030.362");		
	}
	
}

/**
 * location type combo select
 */
function doLocTpAction(){

	var formObj  = document.form;
/*
	var s_class = formObj.s_class.value;
	var com_cd ="";// 'C023' location , C025 node
	
	if(s_class=="NOD"){
		com_cd = "C025";
	}else if(s_class=="LOC"){
		com_cd = "C023";
	}else {
		document.form.s_loc_tp_code.options[0] = new Option( 'All',  ''  );
		document.form.s_loc_tp_code.options.length = '1';
		return;
	}
	
	//alert("s_class===>"+formObj.s_class.value);
		
	ajaxSendPost(dispLocTpAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchLocCombo&com_cd='+com_cd, './GateServlet.gsl');
*/
}

//코드표시 Ajax
function dispLocTpAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
		
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split(';');
			var arrLen = rtnArr.length-1;			
			//alert("arrLen===>"+arrLen);
							
			for(var i = 0; i<arrLen; i++){
				var masterVals = rtnArr[i].split(',');	
				//alert("masterVals[0]===>"+masterVals[0]);
				//alert("masterVals[1]===>"+masterVals[1]);
				document.form.s_loc_tp_code.options[i]=new Option(masterVals[1],masterVals[0]);
			}
			
			//document.formObj.selectObj.optionObj[4]=new Option('선택 5','value5')
			
		}else{
			
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0030.421");		
	}
	
}

// 2011.12.27 KeyDown
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}