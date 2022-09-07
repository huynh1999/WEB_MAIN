function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var formObj  = document.frm1;

	switch(srcName) {
	case "SEARCHLIST":

 		//sheetObj.ShowDebugMsg = true;
		formObj.f_cmd.value = SEARCHLIST;
				
		sheetObj.DoSearch4Post("EQU_MST_0050GS.clt", FormQueryString(formObj));
  	
		docObjects[1].RemoveAll();
		getObj('excel').style.display = 'inline';
	break;
	case "SEARCHLIST01":

		//sheetObj.ShowDebugMsg = true;
		formObj.f_cmd.value = SEARCHLIST01;
		sheetObj1.DoSearch4Post("EQU_MST_0050_1GS.clt", FormQueryString(formObj));
		//sheetObj.ShowDebugMsg = false;
	break;
	//엑셀내려받기
	case "EXCEL":
		sheetObj.SpeedDown2Excel(true);
	break;
  	
	case "NEW":
 	   formObj.reset();
 	   sheetObj.RemoveAll();
 	  sheetObj1.RemoveAll();
    break;
	case "LESSOR_POPLIST" :
			  
		var rtnary = new Array(1);
		rtnary[0] = "1";
		rtnary[1] = "";
		rtnary[2] = window;
		
		var cstmTpCd = 'LS';
		var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
			formObj.lr_trdp_cd.value = rtnValAry[0];//sr_no 
			formObj.lr_trdp_nm.value = rtnValAry[2];//sr_no 
				
		}
	break;

	case "LOCATION_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
		var rtnary = new Array(3);
		rtnary[0] = "SEA";
		rtnary[1] = "BL";
		rtnary[2] = "";
		
		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
			formObj.loc_cd.value = rtnValAry[0];//loc_cd 
			formObj.loc_nm.value = rtnValAry[1];//loc_cd 
			
		}
	break;
	case "LSTERM_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
		var rtnary = new Array(1);
		rtnary[0] = "1";
		
		var rtnVal = window.showModalDialog('./EQU_MST_0051.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:360px;dialogHeight:480px");
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
			// lttm_nm 에 값이 있으면 추가 해준다.
			if(formObj.lstm_nm.value.length>0){
				
				formObj.lstm_nm.value = formObj.lstm_nm.value + ', '+rtnValAry[1];//loc_cd
				formObj.lstm_cd.value = formObj.lstm_cd.value + '\', \''+rtnValAry[0];//loc_cd
				
			}else{
				formObj.lstm_nm.value = rtnValAry[1];//loc_cd
				formObj.lstm_cd.value = '\''+rtnValAry[0];//loc_cd
			}
			
		}
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
    //doWork('SEARCHLIST');
    fncFromToDate();
}
function fncFromToDate() {
	var formObj = document.frm1;
	
	// 오늘 날짜 가져오기
	var now 	= new Date(); 				// 현재시간 가져오기
	var year	= now.getYear(); 			// 년도 가져오기

	formObj.fm_rgst_dt.value = year+'-01-01';
	formObj.to_rgst_dt.value = year+'-12-31';
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
                //MergeSheet = msPrevColumnMerge;
                MergeSheet = msPrevColumnMerge + msHeaderOnly;

               //전체Edit 허용 여부 [선택, Default false]
                Editable = true;

                //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
                InitRowInfo( 1, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(11, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(false, true, true, true, false,false) ;
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('EQU_MST_0050_HDR'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0, 0,  dtHiddenStatus,   40,    daCenter,  true,		"ibflag");
				InitDataProperty(0, 1,  dtData,   		  100,   daLeft,    true,		"lr_trdp_nm",	false,		"",       dfNone,      0,     false,     false,		3);
				InitDataProperty(0, 2,  dtData,   		  50,    daCenter,  true,		"loc_cd", 		false,		"",       dfNone,      0,     false,     false,		3);
				InitDataProperty(0, 3,  dtData,   		  35,    daCenter,  true,		"lstm_nm",	 	false,		"",       dfNone,      0,     false,     false,		3);
				InitDataProperty(0, 4,  dtAutoSum, 		  45,    daCenter,  true,		"n1st", 		false,		"",       dfInteger,   0,     false,     false,		10);
				InitDataProperty(0, 5,  dtAutoSum,		  45,    daCenter,  false,		"n2nd", 		false,		"",       dfInteger,   0,     false,     false,		10);
				InitDataProperty(0, 6,  dtAutoSum,		  45,    daCenter,  false,		"n3rd", 		false,		"",       dfInteger,   0,     false,     false,		10);
				InitDataProperty(0, 7,  dtAutoSum,		  45,    daCenter,  false,		"n4th", 		false,		"",       dfInteger,   0,     false,     false,		10);
				InitDataProperty(0, 8,  dtAutoSum,        50,    daCenter,  false,		"total", 		false,		"",       dfInteger,   0,     false,     false,		10);
				InitDataProperty(0, 9,  dtHidden,         40,    daCenter,  false,		"lstm_cd",	 	false,		"",       dfNone,   0,     false,     false,		10);
				InitDataProperty(0,10,  dtHidden,         40,    daCenter,  false,		"lr_trdp_cd", 	false,		"",       dfNone,   0,     false,     false,		10);
				
           }                                                      
           break;
         case 2:      //IBSheet1 init

             with (sheetObj) {
                 // 높이 설정
                style.height = 400;
                 
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
                 InitColumnInfo(9, 3, 0, true);

                 // 해더에서 처리할 수 있는 각종 기능을 설정한다
                 InitHeadMode(false, true, true, true, false,false) ;
                 
                 //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                 InitHeadRow(0, getLabel('EQU_MST_0050_1_HDR'), true);

                 //데이터속성    [ROW,   COL,   DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
 				InitDataProperty(0, 0,  dtHiddenStatus,   40,    daCenter,  true,	"dtl_ibflag");
 				InitDataProperty(0, 1,  dtData,   		  40,    daCenter,  true,   "no", 			false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0, 2,  dtData,   		  100,    daLeft,  true,   "lr_trdp_nm", 	false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0, 3,  dtData,   		  105,   daCenter,  true,   "bkg_no", 		false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0, 4,  dtData,   		  100,   daCenter,  true,   "sr_no", 		false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0, 5,  dtData,   		  110,   daCenter,  true,   "bl_no", 		false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0, 6,  dtData,   		  75,    daCenter,  true,   "cntr_tpsz_cd", false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0, 7,  dtData,   		  80,    daCenter,  true,   "cntr_no", 		false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0, 8,  dtHidden,   	  40,    daCenter,  true,   "amt", 			false,   "",       dfNone,      0,     false,     false,	20);
 				
            }                                                      
            break;
     }
    
}


function sheet1_OnSearchEnd() {
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	
	var rowCnt = sheetObj.rowcount;
	
	// 가로 합계를 구해 total에 넣어준다.
	for(var i=1;i<=rowCnt;i++){
		sheetObj.cellValue2(i, "total") = sheetObj.ComputeSum("|4|+|5|+|6|+|7|", i, i);
	}
	// total의 배경색을 소계 색과 동일하게 한다.
	sheetObj.ColBackColor("total") = sheetObj.RgbColor(247,231,236);
	
	// location마다의 소계를 보여준다.
	sheetObj.ShowSubSum(1, "4|5|6|7|8", -1, true, false, -1, "lr_trdp_nm=Sub Total");
		
}
function sheet2_OnSearchEnd() {
	
	for(var j=1;j<=docObjects[1].rowCount;j++){
		docObjects[1].cellValue2(j, "sub_ttl") = docObjects[1].cellValue(j, "qty")*docObjects[1].cellValue(j, "amt");
	}
	docObjects[1].cellValue2(docObjects[1].lastRow, "Port_loc_cd") = "Grand TTL";
}

function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	
	var loc_cd = sheetObj.CellValue(Row, "loc_cd");
	var lstm_cd = sheetObj.CellValue(Row, "lstm_cd");
	var trdp_cd = sheetObj.CellValue(Row, "lr_trdp_cd");
	var cntr_tpsz_cd = "";
	
	// sub total에선 적용 차단.
	if(trdp_cd!=""){
		// 컬럼별 type size를 넣어준다.
		switch(Col){
		case 4:
			cntr_tpsz_cd = '20';
			break;
			
		case 5:
			cntr_tpsz_cd = '40';
			break;
			
		case 6:
			cntr_tpsz_cd = '45';
			break;
			
		case 7:
			cntr_tpsz_cd = 'REFFER';
			break;
		default:
			return;
		}
		
		
		// hid form에 값을 가지고 있는다.
		formObj.hid_loc_cd.value = loc_cd;
		formObj.hid_lstm_cd.value = lstm_cd;	
		formObj.hid_tpsz_cd.value = cntr_tpsz_cd;	
		formObj.hid_trdp_cd.value = trdp_cd;	
		
		doWork('SEARCHLIST01');
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
	
    switch(doWhat){
		case 'DATE1':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.fm_rgst_dt, 'fm_rgst_dt', 'yyyy-MM-dd');
        break;
        
        case 'DATE2':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.to_rgst_dt, 'to_rgst_dt', 'yyyy-MM-dd');
        break;
        
    }
    
}
var CODETYPE = '';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	
	var s_code = obj.value.toUpperCase();		
	var s_type = "";
	
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE =str;		
				var sub_str = str.substring(0,8);
				
				if(sub_str=="Location"){
					s_type = sub_str;
				}else if(sub_str=="trdpCode"){
					s_type = sub_str;
				}else{
					s_type = str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE =str;		
				var sub_str = str.substring(0,8);
				
				if(sub_str=="Location"){
					s_type = sub_str;
				}else if(sub_str=="trdpCode"){
					s_type = sub_str;
				}else{
					s_type = str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	
	var sheetObj4 = docObjects[4];
	
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			
			if(CODETYPE == "Location_pol"){
				formObj.loc_cd.value  = masterVals[0];//loc_cd 
				formObj.loc_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "trdpCode"){
				formObj.lr_trdp_cd.value  = masterVals[0];//loc_cd 
				formObj.lr_trdp_nm.value  = masterVals[3];//loc_nm
				
			}
			
		}else{
			if(CODETYPE == "Location_pol"){
				formObj.loc_cd.value  = "";//loc_cd 
				formObj.loc_nm.value  = "";//loc_nm						
			}else if(CODETYPE == "trdpCode"){
				formObj.lr_trdp_cd.value  = "";//loc_cd 
				formObj.lr_trdp_nm.value  = "";//loc_nm						
			}
		}
	}else{
		alert(getLabel('EQU_MST_MSG01'));		
	}
}
