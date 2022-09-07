var FROMDATE;
var TODAY;
var ENDDATE;

function doWork(srcName){
    if(!btnVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.frm1;

    switch(srcName) {
    	
    
	   case "DEFAULT":
	        
	   break;
   
       case "SEARCHLIST":

            formObj.f_cmd.value = SEARCHLIST;
            //검증로직
            docObjects[0].DoSearch4Post("./ACC_SLP_0060GS.clt", FormQueryString(formObj));
            
       break;
       
       case "MODIFY":	//수정
    	   
    	   debit  = removeComma(formObj.f_debit_tot.value);
    	   credit = removeComma(formObj.f_credit_tot.value);
    	   
    	   if(debit != credit){
//    		   alert("Debit 금액과 Credit 금액의 차액이 발생했습니다. ");
    		   alert(getLabel('ACC_MSG84'));
    		   return;
    	   }
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
        	   frm1.f_cmd.value = MODIFY;
        	   sheetObj.DoSave("ACC_SLP_0060GS.clt", FormQueryString(formObj),"ibflag",false);
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
	
	
	ENDDATE  = getEndDate(TODAY);
	
	//formObj.s_post_strdt.value = FROMDATE;
	//formObj.s_post_enddt.value = ENDDATE;
	
	/*
	if(btn_role == "Y"){
    	deleteBtn1.style.display = "inline";
    	deleteBtn2.style.display = "inline";
    }else{
    	deleteBtn1.style.display = "none";
    	deleteBtn2.style.display = "none";
    }
	*/
	
	
	/*
	//INV_DT 셋팅
	var fr_inv_dt;
	var to_inv_dt;
	
	to_inv_dt  = formObj.slip_post_dt.value;
	
	if(to_inv_dt != ""){
		tmp_inv_dt = to_inv_dt.replaceAll("-","");
		fr_inv_dt  = tmp_inv_dt.substring(0,2) +"-"+ "01" +"-"+ tmp_inv_dt.substring(4,8);
		
		formObj.s_inv_strdt.value = fr_inv_dt;
		formObj.s_inv_enddt.value = to_inv_dt;
	}
	*/
	
	
    
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
	             InitRowInfo( 1, 1, 9, 100);
	
	             //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
	             InitColumnInfo(14, 0, 0, true);
	
	             // 해더에서 처리할 수 있는 각종 기능을 설정한다
	             InitHeadMode(true, true, true, true, false,false) ;
	             
	             //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
	             InitHeadRow(0, getLabel('ACC_SLP_0060_HDR1'), true);
	             
	             var cnt = 0;
	             //데이터속성    [ROW,  COL, DATATYPE,  	  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
	             InitDataProperty(0, cnt++,  dtData,        40,   daCenter,  true,    "slip_tp",        false,   "",       	dfDateYmd,      0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,       100,   daCenter,  true,    "row_id",        	false,   "",       	dfDateYmd,      0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,        35,   daCenter,  true,    "row_no",         false,   "",       	dfDateYmd,      0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,        70,   daCenter,  true,    "dt_acct",        false,   "",       	dfDateYmd,      0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,   		70,   daCenter,  true,    "cd_partner",     false,   "",       	dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,  	   150,   daLeft,    true,    "nm_partner",     false,   "",       	dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,        60,   daRight,   true,    "rt_exch",		false,   "",   		dfFloat,        2,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,        80,   daRight,   true,    "am_ex",  		false,   "",      	dfFloat,    	2,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,        90,   daRight,   true,    "debit_amt", 		false,   "",  		dfInteger,      0,     true,        true);
	             InitDataProperty(0, cnt++,  dtData,        90,   daRight,   true,    "credit_amt",		false,   "",  		dfInteger,      0,     true,        true);
	             InitDataProperty(0, cnt++,  dtData,       180,   daLeft,    true,    "nm_note",      	false,   "",     	dfNone,    		0,     false,       false);
	             InitDataProperty(0, cnt++,  dtData,       100,   daCenter,  true,    "no_bdocu",  		false,   "",  		dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtHidden,      40,   daCenter,  true,    "tp_drcr",   		false,   "",  		dfNone,         0,     false,       false);
	             InitDataProperty(0, cnt++,  dtHiddenStatus,30,   daCenter,  true,    "ibflag",         false,   "",       	dfNone,         0,     false,       false);
	             
	             InitViewFormat(0, "dt_acct", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	             EditDateFormat = "MDY"; //그리드에 입력할 때 월/일/년 순으로 입력되게 설정	
      			
           }                                                      
           break;
     }
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	var debit  = 0;
	var credit = 0;
	for(var i=1; i<=sheetObj.LastRow;i++){
		debit  += Number(sheetObj.CellValue(i, "debit_amt"));
		credit += Number(sheetObj.CellValue(i, "credit_amt"));
	}
	
	formObj.f_debit_tot.value  = doMoneyFmt(debit);
	formObj.f_credit_tot.value = doMoneyFmt(credit);
	
	
} 

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	
	var debit  = 0;
	var credit = 0;
	for(var i=1; i<=sheetObj.LastRow;i++){
		debit  += Number(sheetObj.CellValue(i, "debit_amt"));
		credit += Number(sheetObj.CellValue(i, "credit_amt"));
	}
	
	formObj.f_debit_tot.value  = doMoneyFmt(debit);
	formObj.f_credit_tot.value = doMoneyFmt(credit);
	
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}	
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
//이 로직은 무엇인가요? (S.Y BAIK 2012.12.13)
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	
    /*switch (sheetObj.ColSaveName(Col)) {
    }*/
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
		case "debit_amt" :
			var debit  = 0;
			var credit = 0;
			for(var i=1; i<=sheetObj.LastRow;i++){
				debit  += Number(sheetObj.CellValue(i, "debit_amt"));
				credit += Number(sheetObj.CellValue(i, "credit_amt"));
			}
			
			formObj.f_debit_tot.value  = doMoneyFmt(debit);
			formObj.f_credit_tot.value = doMoneyFmt(credit);
			
		break;
		
		case "credit_amt" :
			var debit  = 0;
			var credit = 0;
			for(var i=1; i<=sheetObj.LastRow;i++){
				debit  += Number(sheetObj.CellValue(i, "debit_amt"));
				credit += Number(sheetObj.CellValue(i, "credit_amt"));
			}
			
			formObj.f_debit_tot.value  = doMoneyFmt(debit);
			formObj.f_credit_tot.value = doMoneyFmt(credit);
			
		break;
		
	}
}


/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){

    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal = new calendarPopupFromTo();
	        cal.displayType = "date";
	        cal.select(formObj.s_post_strdt, 's_post_strdt', formObj.s_post_enddt, 's_post_enddt', 'MM-dd-yyyy');
	    break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal = new calendarPopupFromTo();
	        cal.displayType = "date";
	        cal.select(formObj.s_inv_strdt, 's_inv_strdt', formObj.s_inv_enddt, 's_inv_enddt', 'MM-dd-yyyy');
        break;
       
    }
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
	
	sheetObj.RemoveAll();
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


function custEnterAction(obj, type){
	var formObj  = document.frm1;
	
	if (event.keyCode == 13){
		doWork("CUSTOMER_POPLIST");
	}
}


function entSearch(){
	var formObj  = document.frm1;
	
	if(event.keyCode == 13){
		if(formObj.s_acct_slip_no.value.length == 14){
			doWork('SEARCHLIST')
		}
		
	}
}


function setAmount(){
	var formObj  = document.frm1;
	
	formObj.s_amt_to.value = formObj.s_amt_fr.value;
	
}


