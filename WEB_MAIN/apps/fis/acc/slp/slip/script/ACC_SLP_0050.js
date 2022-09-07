var FROMDATE;
var TODAY;
var ENDDATE;

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.frm1;

    switch(srcName) {
    	
    
	   case "DEFAULT":
	        
	   break;
   
       case "SEARCHLIST":
    	    
            formObj.f_cmd.value = SEARCHLIST;
            //검증로직
            docObjects[0].DoSearch4Post("./ACC_SLP_0050GS.clt", FormQueryString(formObj));
            
       break;
       
       case "INTERFACE":	//INTERFACE
           
    	   frm1.f_cmd.value = COMMAND01;
    	   
    	   if(formObj.f_cust_cd.value == ""){
//    		   alert("[Acct. Company] 를 입력해 주십시요. ");
    		   alert(getLabel('ACC_MSG70'));
    		   formObj.f_cust_cd.focus();
    		   return;
    	   }
    	   
    	   if(confirm("Trade Partner Interface를 진행하시겠습니까? ")){
    		   sheetObj.DoSave("ACC_SLP_0050GS.clt", FormQueryString(formObj),"ibflag",false);
    	   }
           
              
           
           
       break;
       
     	
       case "APPLY":	//환율적용
           
    	   if(formObj.f_curr_cd[0].selected){
//    		   alert("Select Please [Currency]");
    		   alert(getLabel('ACC_MSG50'));
    		   formObj.f_curr_cd.focus();
    		   return;
    	   }
    	   if(formObj.f_xcrt.value == ""){
//    		   alert("Input Please [Ex.Rate]");
    		   alert(getLabel('ACC_MSG66'));
    		   formObj.f_xcrt.focus();
    		   return;
    	   }
    	       	   
    	   var cnt = 0;
    	   for(var i=2;i<=sheetObj.LastRow;i++){
    		   if(sheetObj.CellValue(i, "curr_cd") == formObj.f_curr_cd.value){
    			   sheetObj.CellValue(i, "xcrt") 		= formObj.f_xcrt.value;
    			   sheetObj.CellValue(i, "ttl_debit") 	= Number(formObj.f_xcrt.value) * Number(sheetObj.CellValue(i, "debit"));
    			   sheetObj.CellValue(i, "ttl_credit") 	= Number(formObj.f_xcrt.value) * Number(sheetObj.CellValue(i, "credit"));
    			   
    			   cnt += 1;
    		   }
    	   }
//    	   alert("[" + cnt + "] 건이 적용되었습니다. ");
    	   //alert("[" + cnt + "] " + getLabel('ACC_MSG67'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
           
       break;
       
       
       
       case "VERIFY":
           
    	   var cnt = 0;
    	   for(var i=2;i<=sheetObj.LastRow;i++){
    		   if(sheetObj.CellValue(i, "acct_gl_no") == "" || sheetObj.CellValue(i, "xcrt") == 0){
    			   sheetObj.RowFontColor(i) = sheetObj.RgbColor(255,0,0);
    			   sheetObj.CellValue(i, "verify_yn") = "N";
    			   cnt += 1;
    		   }else{
    			   sheetObj.RowFontColor(i) = sheetObj.RgbColor(0,0,0);
    			   sheetObj.CellValue(i, "verify_yn") = "Y";
    		   }
    	   }
    	   
    	   if(cnt > 0){
    		   //alert("[" + cnt + "] 건이 유효하지 않습니다. ");
    		   //alert("[" + cnt + "] " + getLabel('ACC_MSG67'));
    		   alert(cnt + getLabel('ACC_COM_ALT011') + "\n\n[MSG ID: ACC_SLP_0050.97]");
    	   }else{
    		   //모든 데이터가 정상입니다.
    		   //alert(getLabel('ACC_MSG69'));
    			/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
    			showCompleteProcess();
    	   }
           
       break;
        
     	
    }
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
var ctlKind = "";
var ctlCol = 0;
var ctlRow = 0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value = callPage;
	doWork('SEARCHLIST', '');
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

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj = document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }

	//오늘일자구하기
	var now 		= new Date(); 				
	var preDt		= new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
	
	var year		= now.getYear(); 			
	var month		= now.getMonth() + 1;
	var date		= now.getDate(); 	
	
	var preyear		= preDt.getYear();
	var premonth	= preDt.getMonth() + 1;
	
	if(month < 10){
		month = "0"+(month);
	}
	
	if(premonth < 10){
		premonth = "0"+(premonth);
	}
	
	if(date < 10){
		date = "0"+date;
	}

	FROMDATE = premonth + "-" + "01" + "-" + preyear;
	TODAY    = month + "-" + date + "-" + year;
    
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
	             style.height = 500;
	             
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
	             InitRowInfo(1, 1, 9, 100);
	
	             //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
	             InitColumnInfo(11, 0, 0, true);
	
	             // 해더에서 처리할 수 있는 각종 기능을 설정한다
	             InitHeadMode(true, true, true, true, false,false) ;
	             
	             //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
	             InitHeadRow(0, getLabel('ACC_SLP_0050_HDR1'), true);
	             
	             var cnt = 0;
	             //데이터속성    [ROW,  	  COL, DATATYPE,  	  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
	             InitDataProperty(0, cnt++,  dtCheckBox,    40,   daCenter,  true,    "chk_flag",       false,   "",        dfNone,         0,     true,        true,			-1,			false,		true,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        60,   daCenter,  true,    "trdp_cd",      	false,   "",       	dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,       120,   daLeft,    true,    "eng_nm",    		false,   "",       	dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,       120,   daLeft,    true,    "locl_nm",    	false,   "",  		dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,       220,   daLeft,    true,    "lgl_addr",    	false,   "",  		dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,       220,   daLeft,    true,    "tax_iss_addr",   false,   "",  		dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,        50,   daCenter,  true,    "rgst_ofc_cd",   	false,   "",  		dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,        70,   daCenter,  true,    "corp_no",  		false,   "",  		dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtHidden,      80,   daCenter,  true,    "rgst_tms",  		false,   "",  		dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtHidden,      80,   daCenter,  true,    "rtn_flag",  		false,   "",  		dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtHiddenStatus,30,   daCenter,  true,    "ibflag",        	false,   "",       	dfNone,         0,     false,       false);
	             
	             HeadRowHeight = 21;
	             
           }                                                      
           break;
     }
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
} 

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
//	alert("정상처리 되었습니다. ");
	alert(getLabel('ACC_MSG83'));
	
	
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	
    switch (sheetObj.ColSaveName(Col)) {
    	
    }
    
    
}


/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
    
	
	
    
}

function sheet1_OnChange(sheetObj,Row,Col){
	var formObj  = document.frm1;
	
	switch (sheetObj.ColSaveName(Col)) {
		
	}
}


/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){

    switch(doWhat){
	    case 'DATE':    //달력 조회 팝업 호출      
	    	var cal = new calendarPopup();
	        cal.select(formObj.f_crt_dt, 'f_crt_dt', 'MM-dd-yyyy');
	    break;
       
    }
}



//말일구하기
function getEndDate(datestr){
	
	datestr = datestr.replaceAll("-","");
	
    var yy = Number(datestr.substring(4,8));
    var mm = Number(datestr.substring(0,2));
    
    //윤년 검증
    var boundDay = "";
  
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm = "0"+mm
       }
       boundDay = mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm = "0"+mm
          }
          boundDay = mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm = "0"+mm
          }
          boundDay = mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}




//화면 클리어
function clearAll(){
	var sheetObj = docObjects[0];
	var collTxt = document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	    if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		    collTxt[i].value = "";
	    }           
	}
	
	frm1.f_crt_dt.value = TODAY;
	
	sheetObj.RemoveAll();
}



