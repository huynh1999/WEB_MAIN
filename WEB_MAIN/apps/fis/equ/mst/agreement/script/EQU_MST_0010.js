var rtnary = new Array(1);
function doWork(srcName){
	if(!btnVisible(srcName)){
		return;
	}
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var formObj  = document.frm1;

	switch(srcName) {
		case "SEARCHLIST":

			//sheetObj.ShowDebugMsg = true;
			formObj.f_cmd.value = SEARCHLIST;
			
				sheetObj.DoSearch4Post("EQU_MST_0010GS.clt", FormQueryString(formObj));
				
				docObjects[1].RemoveAll();
		break;
		case "SEARCHLIST01":

			//sheetObj.ShowDebugMsg = true;
			formObj.f_cmd.value = SEARCHLIST01;
				sheetObj1.DoSearch4Post("EQU_MST_0010_1GS.clt", FormQueryString(formObj));
			//sheetObj.ShowDebugMsg = false;
		break;
		case "NEW":
			displayClear();
			fncFromToDate();
			doWork('ROWADD');
			
		break;
		case "ROWADD":
			var iRows = sheetObj.Rows;
			var Row = sheetObj.DataInsert(++iRows);
			// hid agreement 해제
			formObj.hid_agmt_no.value = "";
			
			if((sheetObj.RowCount)>1){ // no를 설정한다.
				sheetObj.CellValue2(Row, "no") = parseInt(sheetObj.CellValue(sheetObj.LastRow-1, "no"))+1;
			}else{
				sheetObj.CellValue2(Row, "no") = 1;
			}
		break;
		case "ROWADD2":
			var iRows = sheetObj1.Rows;
			var Row = sheetObj1.DataInsert(++iRows);

				sheetObj1.CellValue2(Row, "agmt_no") = formObj.hid_agmt_no.value;
			
				if((sheetObj1.RowCount)>1){ // seq를 설정한다.
				
				sheetObj1.CellValue2(Row, "agmt_dtl_seq") = parseInt(sheetObj1.CellValue(sheetObj1.LastRow-2, "agmt_dtl_seq"))+1;
				// sheet의 내용을 hidden sheet로 옮긴다.
				//  sheetCopyMethod Copy2SheetCol(TargetSheet,SrcColumns,DestColumns,StartRow ,EndRow,DestRow,AddType,useSameSaveName,raiseChangeEvent, SrcCheckCol, DestCheckCol) 
				docObjects[1].Copy2SheetCol(docObjects[1],	"Port_loc_cd|Port_loc_nm|Port_nod_cd|Port_nod_nm",	"Port_loc_cd|Port_loc_nm|Port_nod_cd|Port_nod_nm",	 docObjects[1].rowCount-1,	docObjects[1].rowCount-1,		2,		0,		true,			true,				true,		true);
			}else{
				sheetObj1.CellValue2(Row, "agmt_dtl_seq") = 1;
			}
				sheetObj1.cellValue2(sheetObj1.lastRow, "Port_loc_cd") = "Grand TTL";
		break;
		case "MODIFY":
			
				formObj.f_cmd.value = MODIFY;
				
			var sht		= sheetObj.GetSaveString(false);
			var sht1	= sheetObj1.GetSaveString(false);
			
			//저장할 QueryString이 정확하지 않은 경우 다음 처리 하지 않음
			if (sht == "" && sht1 == "") return false;
			
			// grid value validation
			if ( !fncGridCheck() ) return false;
			if( confirm(getLabel('EQU_MST_MSG09')) ){
				sheetObj.DoAllSave("EQU_MST_0010GS.clt", FormQueryString(formObj)+'&'+sht1,true);
			}
		break;
		case "REMOVE":
			
			formObj.f_cmd.value = REMOVE;
			
			var sht		= sheetObj.GetSaveString(false);
			var sht1	= sheetObj1.GetSaveString(false);
			
			//저장할 QueryString이 정확하지 않은 경우 다음 처리 하지 않음
			if (sht == "" && sht1 == "") return false;
			
			// grid value validation
			if ( !fncGridCheck() ) return false;
			if( confirm(getLabel('EQU_MST_MSG26')) ){
				sheetObj.DoAllSave("EQU_MST_0010GS.clt", FormQueryString(formObj)+'&'+sht1,true);
			}
		break;
		case "LESSOR_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			rtnary = new Array(1);
				rtnary[0] = "1";
				rtnary[1] = "";
				rtnary[2] = window;
				
				var cstmTpCd = 'LS';
			var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				formObj.lr_trdp_cd.value = rtnValAry[0]; 
				formObj.lr_trdp_nm.value  = rtnValAry[2];//loc_nm
			}
		break;
		
		case "OFFICE_POPLIST" :
			
	  		rtnary = new Array(2);
				rtnary[0] = "1";
				rtnary[1] = "111";
				
				var rtnVal = window.showModalDialog('./CMM_POP_0150.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:600px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
			
				var rtnValAry = rtnVal.split("|");
				formObj.agmt_ofc.value = rtnValAry[0];
			}
		break;
        case "SUPPLY":	//Email전송
        	// checked 된 것의 invoice no를 가져온다.
        	var chkRow = sheetObj.FindCheckedRow("chk");
        	
        	
        	// 체크된것이 없으면 mapping불가.
        	if(chkRow ==""){
        		alert(getLabel('EQU_INV_MSG26'));
        		return;
        	}
        	chkRow = chkRow.replaceAll("\|", "");
        	formObj.hid_agmt_no.value = sheetObj.cellvalue(chkRow, "agmt_no");
        	
        	var reqParam = '?agmt_no='+formObj.hid_agmt_no.value;
      		reqParam += '&openMean=DEFAULT';
  	   		popGET('./EQU_MST_0012.clt'+reqParam, 'mailSend', 471, 500, "scroll:no;status:no;help:no;");
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

	formObj.fm_agmt_dt.value = year+'-01-01';
	formObj.to_agmt_dt.value = year+'-12-31';
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
               style.height = 200;
                
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
                InitColumnInfo(14, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(false, true, true, true, false,false) ;
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('EQU_MST_0010_HDR'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0, 0,  dtDelCheck,       30,    daCenter,  true,		"chk",			false,		"",       dfNone,      0,     true,      true);
				InitDataProperty(0, 1,  dtHiddenStatus,   40,    daCenter,  true,		"ibflag");
				InitDataProperty(0, 2,  dtData,   		  30,    daCenter,  true,		"no", 		false,		"",       dfNone,      0,     false,     true,		3);
				InitDataProperty(0, 3,  dtData,           90,    daLeft,    false,		"agmt_no", 	false,		"",       dfNone,      0,     false,      false,		15);
				InitDataProperty(0, 4,  dtPopupEdit,      60,    daLeft,    false,		"lr_trdp_cd",false,		"",       dfNone,      0,     false,      true,		15);
				InitDataProperty(0, 5,  dtData,			  90,    daLeft,    false,		"lr_trdp_nm",true,		"",       dfNone,      0,     false,      false,	10);
				InitDataProperty(0, 6,  dtPopupEdit,      60,    daLeft,    false,		"agmt_ofc", true,		"",       dfNone,      0,     false,      true,		10);
				InitDataProperty(0, 7,  dtData,			  80,    daLeft,    false,		"ref_no", 	true,		"",       dfNone,      0,     false,      true,		10);
				InitDataProperty(0, 8,  dtData,			  60,    daRight,   false,		"dur_mon", 	false,		"",       dfInteger,   0,     false,      true,		2);
				InitDataProperty(0, 9,  dtCombo,		  90,    daCenter,  false,		"lstm_cd", 	true,		"",       dfNone,      0,     false,      true,		3);
				InitDataProperty(0,10,	dtPopupEdit,	  80,    daCenter,  false,      "agmt_dt",	true,      "",       dfUserFormat,0,	  false,      true,		10);
				InitDataProperty(0,11,  dtPopupEdit,	  50,    daLeft,    false,		"curr_cd", 	true,		"",       dfNone,      0,     false,      true,		3);
				InitDataProperty(0,12,  dtPopupEdit,	  80,    daCenter,  false,		"eff_dt", 	true,		"",       dfUserFormat,0,     false,      true,		10);
				InitDataProperty(0,13,  dtData,			  90,    daLeft,    false,		"rmk", 		false,		"",       dfNone,      0,     false,      true,		200);
				
				InitDataCombo (0, "lstm_cd", PARAM1_1, PARAM1_2);	//com_cd_dtl에서 가져온 코드값.
				PopupImage = APP_PATH+"/web/img/button/btns_calendar.gif";
				ImageList(0) = APP_PATH+"/web/img/button/btns_search.gif";
				
				PopupButtonImage(0, "lr_trdp_cd") = 0;
				PopupButtonImage(0, "agmt_ofc") = 0;
				PopupButtonImage(0, "curr_cd") = 0;
				
				InitUserFormat(0, "agmt_dt",  "####-##-##", "-");
				InitUserFormat(0, "eff_dt",  "####-##-##", "-");
				
				// 대문자 자동 치환
		        InitDataValid(0, "lr_trdp_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "agmt_ofc",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "curr_cd",	vtEngUpOther, "0123456789" );
           }                                                      
           break;
         case 2:      //IBSheet1 init

             with (sheetObj) {
                 // 높이 설정
                style.height = 200;
                 
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
                 InitColumnInfo(12, 0, 0, true);

                 // 해더에서 처리할 수 있는 각종 기능을 설정한다
                 InitHeadMode(false, true, true, true, false,false) ;
                 
                 //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                 InitHeadRow(0, getLabel('EQU_MST_0010_1_HDR'), true);

                 //데이터속성    [ROW,   COL,   DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
 				InitDataProperty(0, 0,  dtDelCheck,       30,    daCenter,  true,		"",				false,		"",       dfNone,      0,     true,      true);
 				InitDataProperty(0, 1,  dtHiddenStatus,   40,    daCenter,  true,		"dtl_ibflag");
 				InitDataProperty(0, 2,  dtData,   		  40,    daCenter,  true,		"agmt_dtl_seq",	false,		"",       dfNone,      0,     false,     false,		3);
 				InitDataProperty(0, 3,  dtPopupEdit,      80,    daLeft,    false,		"Port_loc_cd",	true,		"",       dfNone,      0,     false,      true,		5);
 				InitDataProperty(0, 4,  dtData,      	 120,    daLeft,    false,		"Port_loc_nm",	true,		"",       dfNone,      0,     false,     false,		50);
 				InitDataProperty(0, 5,  dtPopupEdit,	  80,    daLeft,    false,		"Port_nod_cd",	true,		"",       dfNone,      0,     false,     true,		7);
 				InitDataProperty(0, 6,  dtData,			 120,    daLeft,    false,		"Port_nod_nm",	true,		"",       dfNone,      0,     false,     false,		7);
 				InitDataProperty(0, 7,  dtCombo,		  80,    daCenter,  false,		"cntr_tpsz_cd",	true,		"",       dfNone,      0,     false,      true,		2);
 				InitDataProperty(0, 8,  dtAutoSum,		  80,    daRight,   false,		"qty", 			false,		"",       dfInteger,   0,     false,      true,		7);
 				InitDataProperty(0, 9,	dtData,			 150,    daRight,   false,		"amt",			false,      "",       dfFloat,     2,	  false,      true,		20);
 				InitDataProperty(0,10,	dtAutoSum,		  80,    daRight,   false,		"sub_ttl",		false,      "",       dfFloat,     2,	  false,      false,	20);
 				InitDataProperty(0,11,  dtHidden,         50,    daLeft,    false,		"agmt_no", 		false,		"",       dfNone,      0,     false,      true,		15);
 				
 				InitDataCombo (0, "cntr_tpsz_cd", typeSize_1, typeSize_1);
 				
 				ImageList(0) = APP_PATH+"/web/img/button/btns_search.gif";
 				
				// 대문자 자동 치환
		        InitDataValid(0, "Port_loc_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "Port_nod_cd",vtEngUpOther, "0123456789" );

 				AutoSumBottom = true;

 				
            }                                                      
            break;
     }
    
}

/*
 *  조건들을 clear한다. 
 */
function displayClear(){
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var formObj = document.frm1;
	// form reset
	formObj.reset();
	
	// sheet clear
	sheetObj.RemoveAll();
	sheetObj1.RemoveAll();
	
	// rowadd를 보여준다.
	getObj('rowAdd').style.display = 'inline';
	getObj('rowAdd2').style.display = 'none';
	
}

function fncGridCheck() {
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var intRow = sheetObj.Rows;
	var intRow1 = sheetObj1.Rows;
		
	for ( var i = 1 ; i < intRow1-1 ; i++ ) {
		if ( parseInt(sheetObj1.CellValue(i, "qty")) <= 0) {
			alert(getLabel('EQU_MST_MSG19'));
			sheetObj1.SelectCell(i, "qty");
			return false;
		}
		if ( parseFloat(sheetObj1.CellValue(i, "amt")) <= 0) {
			alert(getLabel('EQU_MST_MSG20'));
			sheetObj1.SelectCell(i, "amt");
		return false;
		}
	}
	return true;
}

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
	
    switch(doWhat){
		case 'DATE1':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.fm_agmt_dt, 'fm_agmt_dt', 'yyyy-MM-dd');
        break;
        
        case 'DATE2':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.to_agmt_dt, 'to_agmt_dt', 'yyyy-MM-dd');
        break;
        
    }
}
function sheet1_OnSearchEnd() {
	var formObj = document.frm1;
	
	getObj('rowAdd').style.display = 'inline';
}
function sheet2_OnSearchEnd() {
	
	getObj('rowAdd2').style.display = 'block';
	for(var j=1;j<=docObjects[1].rowCount;j++){
		docObjects[1].cellValue2(j, "sub_ttl") = docObjects[1].cellValue(j, "qty")*docObjects[1].cellValue(j, "amt");
	}
	docObjects[1].cellValue2(docObjects[1].lastRow, "Port_loc_cd") = "Grand TTL";
}

function sheet1_OnSaveEnd() {
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	var agmt_no = sheetObj.CellValue(1, "agmt_no");
//	hid form에 값을 가지고 있는다.
	formObj.hid_agmt_no.value = agmt_no;
	
	doWork('SEARCHLIST01');
}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "chk" :
			var agmt_no = sheetObj.CellValue(Row, "agmt_no");
			// hid form에 값을 가지고 있는다.
			formObj.hid_agmt_no.value = agmt_no;
		break
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	var agmt_no = sheetObj.CellValue(Row, "agmt_no");
	// hid form에 값을 가지고 있는다.
	formObj.hid_agmt_no.value = agmt_no;
	
	doWork('SEARCHLIST01');
		
}
function sheet1_OnPopupClick(sheetObj,Row,Col){

	// 
	switch (sheetObj.ColSaveName(Col)) {
	
		case "lr_trdp_cd" :
        
			rtnary = new Array(1);
			rtnary[0] = "1";
			rtnary[1] = "";
			rtnary[2] = window;
			
			var cstmTpCd = 'LS';
			var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				
					sheetObj.cellValue2(Row, "lr_trdp_cd") = rtnValAry[0]; 
					sheetObj.cellValue2(Row, "lr_trdp_nm") = rtnValAry[2]; 
					
			}
		break;
		
		case "agmt_ofc" :
	           
       		rtnary = new Array(2);
	   		rtnary[0] = "1";
	   		rtnary[1] = "111";
	   		
	   		var rtnVal = window.showModalDialog('./CMM_POP_0150.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:600px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
			
				var rtnValAry = rtnVal.split("|");
				sheetObj.cellValue2(Row, "agmt_ofc") =  rtnValAry[0];
			}
       break;
		
		case "curr_cd": 				
	   		rtnary = new Array(1);
			rtnary[0] = "1";
			
	        var rtnVal = window.showModalDialog('./CMM_POP_0040.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:660px;dialogHeight:360px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	        	return;
	        }else {
	        	var rtnValAry = rtnVal.split("|");

	        	sheetObj.cellValue2(Row, "curr_cd") =  rtnValAry[0];
	        	
	        }
	        
        break;
		case "agmt_dt" :
			var cal = new calendarPopupGrid();
	        cal.select(sheetObj, 'sheet1', Row, Col, 'yyyy-MM-dd');
		break;
		case "eff_dt" :
			var cal = new calendarPopupGrid();
	        cal.select(sheetObj, 'sheet1', Row, Col, 'yyyy-MM-dd');
		break;
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	
	switch (sheetObj.ColSaveName(Col)) {
	case "lr_trdp_cd":
		codeNameAction('trdpCode_s',sheetObj.cellValue(Row, Col), 'onChange');
		break;
	case "agmt_ofc":
		codeNameAction('office_s',sheetObj.cellValue(Row, Col), 'onChange');
		break;
	case "curr_cd":
		codeNameAction('currency_s',sheetObj.cellValue(Row, Col), 'onChange');
		break;
		
	}
}
function sheet2_OnChange(sheetObj,Row,Col){
	switch (sheetObj.ColSaveName(Col)) {
	case "Port_loc_cd":
		codeNameAction('location_only_s',sheetObj.cellValue(Row, Col), 'onChange')
		break;
	case "Port_nod_cd":
		codeNameAction('node_s',sheetObj.cellValue(Row, Col), 'onChange')
		break;
	case "qty" :
		sheetObj.cellValue2(Row, "sub_ttl") = sheetObj.cellValue(Row, "qty")*sheetObj.cellValue(Row, "amt");
		break;
	case "amt" :
		sheetObj.cellValue2(Row, "sub_ttl") = sheetObj.cellValue(Row, "qty")*sheetObj.cellValue(Row, "amt");
		break;
		
	}
}
function sheet2_OnPopupClick(sheetObj,Row,Col){

	// 
	switch (sheetObj.ColSaveName(Col)) {
	case "Port_loc_cd" :
        
		rtnary = new Array(1);
   		rtnary[0] = "SEA";
   		rtnary[1] = "BL";
   		
   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
				sheetObj.cellValue2(Row, "Port_loc_cd") = rtnValAry[0]; 
//				sheetObj.cellValue2(Row, "Port_nod_cd") = rtnValAry[1];//nod_cd 
				sheetObj.cellValue2(Row, "Port_loc_nm") = rtnValAry[2];//loc_nm 
				
		}
	break;
	case "Port_nod_cd" :
        
		rtnary = new Array(1);
   		rtnary[0] = "SEA";
   		rtnary[1] = "ND";
   		
   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
//				sheetObj.cellValue2(Row, "Port_loc_cd") = rtnValAry[0]; 
				sheetObj.cellValue2(Row, "Port_nod_cd") = rtnValAry[1];//nod_cd 
				sheetObj.cellValue2(Row, "Port_nod_nm") = rtnValAry[2];//loc_nm 
				
		}
	break;
	}
}

var CODETYPE = '';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code = obj.value.toUpperCase();
	}else{
		var s_code = obj;
	}
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
		}else if ( tmp == "onChange" ) {
			if ( s_code != "" ) {
				CODETYPE =str;

				var sub_str = str.substring(0,str.indexOf("_s"));
				
				s_type = sub_str;
				
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
	
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			if(CODETYPE == "trdpCode"){
				formObj.lr_trdp_cd.value  = masterVals[0]; 
				formObj.lr_trdp_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "trdpCode_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "lr_trdp_cd") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "lr_trdp_nm")  = masterVals[3];//trdp_nm
				
			}else if(CODETYPE == "office_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "agmt_ofc") = masterVals[0];
				
			}else if(CODETYPE == "currency_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "curr_cd") = masterVals[0]; 
				
			}else if(CODETYPE == "location_only_s"){
				sheetObj1.cellValue2(sheetObj1.selectRow, "Port_loc_cd") = masterVals[0]; 
				sheetObj1.cellValue2(sheetObj1.selectRow, "Port_loc_nm") = masterVals[3]; 
				
			}else if(CODETYPE == "node_s"){
				sheetObj1.cellValue2(sheetObj1.selectRow, "Port_nod_cd") = masterVals[0]; 
				sheetObj1.cellValue2(sheetObj1.selectRow, "Port_nod_nm") = masterVals[3]; 
				
			}
			
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.lr_trdp_cd.value  = ""; 
				formObj.lr_trdp_nm.value  = "";//loc_nm		
				
			}else if(CODETYPE == "trdpCode_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "lr_trdp_cd") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "lr_trdp_nm")  = "";
				
			}else if(CODETYPE == "office_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "agmt_ofc") = "";
				
			}else if(CODETYPE == "currency_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "curr_cd") = ""; 
				
			} else if(CODETYPE == "location_only_s"){
				sheetObj1.cellValue2(sheetObj1.selectRow, "Port_loc_cd") = ""; 
				sheetObj1.cellValue2(sheetObj1.selectRow, "Port_loc_nm") = ""; 
				
			}else if(CODETYPE == "node_s"){
				sheetObj1.cellValue2(sheetObj1.selectRow, "Port_nod_cd") = ""; 
				sheetObj1.cellValue2(sheetObj1.selectRow, "Port_nod_nm") = ""; 
				
			}
		}
	}else{
		alert(getLabel('EQU_MST_MSG01'));		
	}
}
