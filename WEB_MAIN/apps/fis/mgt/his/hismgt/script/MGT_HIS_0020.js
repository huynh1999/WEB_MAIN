// 공통전역변수
var docObjects = new Array();
var sheetCnt = 0;

/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++] = sheet_obj;
}

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
    
    comSelectList();
    
    //화면 OPEN시 GROUP NAME을 조회해온다.
    /*
    var sheetObj1 = docObjects[1];
	var formObj = document.frm1;
	formObj.f_cmd.value = COMMAND01;
    sheetObj1.DoSearch4Post("MGT_HIS_0020_1GS.clt", FormQueryString(formObj));
		*/
}

/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	
	switch(sheetNo) {
		case 1:      //sheet1 init
			with (sheetObj) {
                // 높이 설정
                style.height = 550;
                
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
                InitColumnInfo(10, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;

                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('MGT_HIS_0020_HDR'), false);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    		KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0,  0,  dtDelCheck,        40,   daCenter,  false,    "Del");
                InitDataProperty(0,  1,  dtHiddenStatus,  	40,   daCenter,  false,    "ibflag");
                InitDataProperty(0,  2,  dtData,       	   120,   daLeft,    false,    "table_name",		false,      "",       dfNone,      0,     		false,      true);
                InitDataProperty(0,  3,  dtData,       	   140,   daLeft,    false,    "column_name",		false,      "",       dfNone,      0,     		false,      true);
                InitDataProperty(0,  4,  dtData,       	   180,   daLeft,    false,    "lgc_attr_nm",		false,      "",       dfNone,      0,     		 true,      true);
                InitDataProperty(0,  5,  dtHidden,          90,   daLeft,    false,    "cng_grp_attr_seq",  false,      "",       dfNone,      0,     		 true,      true);
                InitDataProperty(0,  6,  dtData,       	    40,   daCenter,  false,    "column_key",		false,      "",       dfNone,      0,     		false,      true);
                InitDataProperty(0,  7,  dtCheckBox,       	50,   daCenter,  false,    "use_flg",			false,      "",       dfNone,     -1,            true,       true,		 -1,	false,		true,		"",	    false);
                InitDataProperty(0,  8,  dtData,       	    60,   daCenter,  false,    "warning",			false,      "",       dfNone,      0,     		false,      true);
                InitDataProperty(0,  9,  dtData,       	   160,   daLeft,    false,    "column_comment",	false,      "",       dfNone,      0,     		false,      true);
                
                
           }                                                      
    	break;
    	
    	
    	case 2:      //sheet1 init
			with (sheetObj) {
                // 높이 설정
                style.height = 0;
                
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
                InitColumnInfo(2, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;

                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('MGT_HIS_0020_HDR1'), false);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    		KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0,  0,  dtData,       	   140,   daLeft,    false,    "cng_grp_attr_nm",	false,      "",       dfNone,      0,     		true,      true);
                InitDataProperty(0,  1,  dtData,       	   140,   daLeft,    false,    "cng_grp_attr_seq",	false,      "",       dfNone,      0,     		true,      true);
                
                
                
                
           }                                                      
    	break;
    	
	}
}



/***********************************************************************************************************************************/
//SUBMIT 통신을 한다.
/***********************************************************************************************************************************/
function doWork(srcName){
	if(!btnVisible(srcName)){
		return;
	}
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];		
		
	var formObj = document.frm1;
	
	
	try {	
    	switch(srcName) {
        	case "SEARCHLIST":
           			
            	//통신전 그리드를 초기화한다.
				//sheetObj.RemoveAll();
				formObj.f_cmd.value = SEARCHLIST01;
                sheetObj.DoSearch4Post("MGT_HIS_0020GS.clt", FormQueryString(formObj));
               								
         	break;
           
           	case "ADD":
           		           		
				formObj.f_cmd.value = ADD;
           		if(confirm(getLabel('FMS_COM_CFMSAV'))){
                     doProcess = true;
                     sheetObj.DoSave("MGT_HIS_0020GS.clt", FormQueryString(formObj),"ibflag",false);
                     
                 }
				
  	       	break;
           	
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: MGT_HIS_0020.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: MGT_HIS_0020.002");
        }
    }
}


/****************************************************************************************************
그리드1에 대한 function HISTORY GROUP CODE
****************************************************************************************************/

 //Group List 조회 후
function sheet1_OnSearchEnd(){
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var formObj = document.frm1;
		
	//그리드 배경색을 흰색으로 셋팅한다.
	for(var i=0; i<=sheetObj.LastCol; i++){
    	sheetObj.ColBackColor(i)	= sheetObj.RgbColor(255,255,255);
    }
    
}

function sheet1_OnSaveEnd(){
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var formObj = document.frm1;
		
	//그리드 배경색을 흰색으로 셋팅한다.
	for(var i=0; i<=sheetObj.LastCol; i++){
    	sheetObj.ColBackColor(i)	= sheetObj.RgbColor(255,255,255);
    }
    
    //Saved successfully.
	//alert(getLabel('FMS_COM_NTYCOM'));
	/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
	showCompleteProcess();
}


//GROUP 클릭시 GROUP의 ATTRIBUTE를 조회한다.
function sheet1_OnClick(sheetObj,Row,Col){

	var sheetObj1 = docObjects[1];		
	var formObj = document.frm1;	
	//그리드 배경색을 흰색으로 셋팅한다.
	for(var i=0; i<=sheetObj.LastCol; i++){
    	sheetObj.ColBackColor(i)	= sheetObj.RgbColor(255,255,255);
    }
    
}


/****************************************************************************************************
그리드2에 대한 function HISTORY GROUP CODE
****************************************************************************************************/

 //Group Attribute 조회 후
function sheet2_OnSearchEnd(){
	var sheetObj  = docObjects[0];
	var sheetObj1 = docObjects[1];
	var formObj = document.frm1;
		
	var str  = "| ";
	var str2 = "| "
	for(var i=1;i<=sheetObj1.LastRow;i++){
		
		str = str + "|";
		str = str + sheetObj1.CellValue(i, "cng_grp_attr_nm");
		
		str2 = str2 + "|";
		str2 = str2 + sheetObj1.CellValue(i, "cng_grp_attr_seq");
		
		
	}	
	str = str + "|";
	str2 = str2 + "|";
	
	sheetObj.InitDataCombo (0, "cng_grp_attr_seq", str, str2);
}




function openOrder(cF,type){
    var param = "?openerForm=goals&openerType="+type+"&openerCodeField="+cF;
    window.open("/cupfmsWeb/cup/common/pop/COM_ORDER_01.jsp"+param,"search","height=550,width=450,scrollbars=yes");  
}

function openLocation(cF,nF, type){
	var param = "?openerForm=goals&openerType="+type+"&openerCodeField="+cF+"&openerNameField="+nF;
	window.open("/cupfmsWeb/cup/common/pop/COM_LOCATION_01.jsp"+param,"search","height=550,width=450,scrollbars=yes");  
}

function fncCategory() {
	var formObj  = document.frm1;
	var category_code = formObj.s_Category.value;
	if ( category_code != "" ) {
		ajaxSendPost(dispCntAjaxReq1, 'reqVal', '&goWhere=aj&bcKey=searchTemplateCombo&category_code='+category_code, './GateServlet.gsl');
	}
}

function fncTempletList() {
	var formObj  = document.frm1;
	var category_code = formObj.s_Category.value;
	var template_code = formObj.s_TemplateList.value;
	if ( category_code != "" && template_code != "" ) {
		ajaxSendPost(dispCntAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchCurrentStepCombo&category_code='+category_code+'&template_code='+template_code, './GateServlet.gsl');
	}
}

//코드리스트를 조회한다.
function comSelectList(){
    CODETYPE   = "HisGrp";
    ajaxSendPost(commaonSelectAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+CODETYPE, './GateServlet.gsl');
        
}

function commaonSelectAjaxReq(reqVal){
    var doc = getAjaxMsgXML(reqVal);
    var targetFr= 'mainFrame';
    var formObj  = document.frm1;

    if(doc[0]=='OK'){
        if(typeof(doc[1])!='undefined'){

            //조회해온 결과를 Parent에 표시함
            var rtnArr = doc[1].split(';');
            var arrLen = rtnArr.length;
                                    
            if(CODETYPE == "HisGrp"){
                formObj.Table_in.options[0] = new Option("ALL",'');
                
                for( var i = 0; i < arrLen-1 ; i++ ){
                    var masterVals = rtnArr[i].split('@@^');
                    
                    formObj.Table_in.options[i+1] = new Option(masterVals[1],masterVals[0]);
                }
            }
        }
    }else{
    	//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MGT_HIS_0020.319");        
    }
}