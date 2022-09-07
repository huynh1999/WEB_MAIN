var rtnary = new Array(3);
function doWork(srcName){
	if(!btnVisible(srcName)){
		return;
	}
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj = docObjects[0];
	var formObj  = document.frm1;

	switch(srcName) {
		case "SEARCHLIST":

		//sheetObj.ShowDebugMsg = true;
		formObj.f_cmd.value = SEARCHLIST;
			
		sheetObj.DoSearch4Post("EQU_MST_0040GS.clt", FormQueryString(formObj));
		//sheetObj.ShowDebugMsg = false;
		break;
	
		case "ROWADD":
			var iRows = sheetObj.Rows;
			var Row = sheetObj.DataInsert(++iRows);
			if((sheetObj.RowCount)>1){ // ?대떦 ?곗씠?곕? 遺紐?洹몃━?쒖뿉??媛?몄삩??
				
				sheetObj.CellValue2(Row, "no") = parseInt(sheetObj.CellValue(sheetObj.LastRow-1, "no"))+1;
				
			}else{
			
				sheetObj.CellValue2(Row, "no") = 1;
			
			}
			break;
		case "MODIFY":
			if ( !fncGridCheck() ) return false;
			formObj.f_cmd.value = MODIFY;
			if( confirm(getLabel('EQU_MST_MSG09')) ){
				sheetObj.DoSave("EQU_MST_0040GS.clt", FormQueryString(formObj),"ibflag",false);
			}
		break;
	
		case "LOCATION_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			rtnary = new Array(3);
			rtnary[0] = "SEA";
			rtnary[1] = "BL";
			rtnary[2] = "";
			
			var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 return;
				 
			}else{
				var rtnValAry = rtnVal.split("|");
				
				formObj.pol_cd.value = rtnValAry[0];//loc_cd 
				formObj.pol_nm.value  = rtnValAry[2];//loc_nm
				
			} 
		break;
		case "CLOSE":
			window.close();
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
               style.height = 300;
                
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
                InitHeadRow(0, getLabel('EQU_MST_0040_HDR'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0, 0,  dtDelCheck,       40,   daCenter,  true,    "",           	false,   "",       dfNone,      0,     true,      true);
				InitDataProperty(0, 1,  dtHiddenStatus,   40,   daCenter,  true,    "ibflag");
				InitDataProperty(0, 2,  dtData,   		  30,   daCenter,  true,    "no",			false,   "",       dfNone,      0,     false,     false,	2);
				InitDataProperty(0, 3,  dtPopupEdit,      50,   daLeft,    false,   "pol_cd",		 true,   "",       dfNone,      0,     false,      true,		10);
				InitDataProperty(0, 4,  dtData,			  60,   daLeft,    false,   "pol_nm",		false,   "",       dfNone,      0,     false,      false,		10);
				InitDataProperty(0, 5,  dtPopupEdit,   	  50,   daLeft,    false,   "pod_cd",		 true,   "",       dfNone,      0,     false,      true,		10);                
				InitDataProperty(0, 6,  dtData,			  60,   daLeft,    false,   "pod_nm",		false,   "",       dfNone,      0,     false,      false,		10);                
				InitDataProperty(0, 7,  dtData,           60,   daRight,   false,   "to_dis_day",	false,   "",       dfInteger,   0,     true,      true,		3);
				InitDataProperty(0, 8,  dtData,      	  70,   daRight,   true,    "to_bod_day",	false,   "",       dfInteger,   0,     true,      true,		3);
				InitDataProperty(0, 9,  dtData,		      50,   daRight,   true,    "to_fd_day",	false,   "",       dfInteger,   0,     true,      true,		3);
				InitDataProperty(0,10,  dtPopupEdit,   	  50,   daLeft,    true,    "fd_cd",		 true,   "",       dfNone,      0,     false,      true,		10);
				InitDataProperty(0,11,  dtData,		  	  60,  daLeft,    true,    "fd_nm",		false,   "",       dfNone,      0,     false,      false,		10);
				
				ImageList(0) = APP_PATH+"/web/img/button/btns_search.gif";
				
				// 대문자 자동 치환
		        InitDataValid(0, "pol_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "pod_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "fd_cd",	vtEngUpOther, "0123456789" );
           }                                                      
           break;
     }
}


function fncGridCheck() {
	var sheetObj = docObjects[0];
	var intRow = sheetObj.Rows;
	for ( var i = 1 ; i < intRow ; i++ ) {
		if ( sheetObj.CellValue(i, "pol_cd") == "" || sheetObj.CellValue(i, "pol_cd") == null ) {
			alert(getLabel('EQU_MST_MSG02'));
			return false;
		}
		
		if ( sheetObj.CellValue(i, "pod_cd") == "" || sheetObj.CellValue(i, "pod_cd") == null ) {
			alert(getLabel('EQU_MST_MSG03'));
			return false;
		}
		if ( sheetObj.CellValue(i, "fd_cd") == "" || sheetObj.CellValue(i, "fd_cd") == null ) {
			alert(getLabel('EQU_MST_MSG04'));
			return false;
		}
		
		if ( sheetObj.CellValue(i, "pol_cd") == sheetObj.CellValue(i, "pod_cd")) {
			alert(getLabel('EQU_MST_MSG06'));
			sheetObj.SelectCell(i, "pod_cd");
			return false;
		}
		if ( sheetObj.CellValue(i, "pol_cd") == sheetObj.CellValue(i, "fd_cd")) {
			alert(getLabel('EQU_MST_MSG07'));
			sheetObj.SelectCell(i, "fd_cd");
			return false;
		}
		if ( sheetObj.CellValue(i, "pod_cd") == sheetObj.CellValue(i, "fd_cd")) {
			alert(getLabel('EQU_MST_MSG08'));
			sheetObj.SelectCell(i, "fd_cd");
			return false;
		}
	}
	
	// 중복여부를 검사한다.
	var duplRows = sheetObj.ColValueDupRows("pol_cd|pod_cd|fd_cd");
	// array안에 중복 행을 넣는다.
	var arrRow = duplRows.split(",");

	// 중복값이 있을때만 for
	if(arrRow!=""){
    	for (idx=0; idx<arrRow.length; idx++){
    		
    		// 중복된 행을 화면에 보여주고
    		alert(getLabel('EQU_MST_MSG05'));
    		
    		// 해당되는 행으로 이동 시킨다.
    		sheetObj.SelectCell(arrRow[idx], "pol_cd");
      		return;
    	}
	}
	
	return true;
}
function sheet1_OnSearchEnd() {
	var formObj = document.frm1;
	
	getObj('rowAdd').style.display = 'block';
		
}
function sheet1_OnChange(sheetObj,Row,Col){
	
	switch (sheetObj.ColSaveName(Col)) {
	case "pol_cd":
		codeNameAction('location_s_pol',sheetObj.cellValue(Row, Col), 'onChange')
		break;
	case "pod_cd":
		codeNameAction('location_s_pod',sheetObj.cellValue(Row, Col), 'onChange')
		break;
	case "fd_cd":
		codeNameAction('location_s_fd',sheetObj.cellValue(Row, Col), 'onChange')
		break;
		
	}
}
function sheet1_OnSaveEnd() {
	doWork('SEARCHLIST');
		
}
function sheet1_OnPopupClick(sheetObj,Row,Col){

	// 
	switch (sheetObj.ColSaveName(Col)) {
	
		case "pol_cd" :
        
			rtnary = new Array(1);
	   		rtnary[0] = "SEA";
	   		rtnary[1] = "BL";
	   		
	   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				
				sheetObj.cellValue2(Row, "pol_cd") = rtnValAry[0];//loc_cd 
				sheetObj.cellValue2(Row, "pol_nm") = rtnValAry[1];//loc_cd 
				
			}
		break;
		
		case "pod_cd" :
			rtnary = new Array(1);
	   		rtnary[0] = "SEA";
	   		rtnary[1] = "BL";
	   		
	   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				
					sheetObj.cellValue2(Row, "pod_cd") = rtnValAry[0];//loc_cd 
					sheetObj.cellValue2(Row, "pod_nm") = rtnValAry[1];//loc_cd
					
			}
		break;
		
		case "fd_cd" :
	        rtnary = new Array(1);
		   		
			rtnary[0] = "1";
			rtnary[1] = "";
		   		
			var rtnVal = window.showModalDialog('./CMM_POP_0020.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:660px;dialogHeight:480px");
		       
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				
				var rtnValAry = rtnVal.split("|");
				
				sheetObj.cellValue2(Row, "fd_cd") = rtnValAry[0];//loc_cd
				sheetObj.cellValue2(Row, "fd_nm") = rtnValAry[1];//loc_cd
				
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
	
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			
			if(CODETYPE == "location_s_pol"){
				sheetObj.cellValue2(sheetObj.selectRow, "pol_cd") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "pol_nm")  = masterVals[3];//trdp_nm
				
			}else if(CODETYPE == "location_s_pod"){
				sheetObj.cellValue2(sheetObj.selectRow, "pod_cd") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "pod_nm")  = masterVals[3];//trdp_nm
				
			}if(CODETYPE == "location_s_fd"){
				sheetObj.cellValue2(sheetObj.selectRow, "fd_cd") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "fd_nm")  = masterVals[3];//trdp_nm
				
			}
			
		}else{
			if(CODETYPE == "location_s_pol"){
				sheetObj.cellValue2(sheetObj.selectRow, "pol_cd") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "pol_nm")  = "";
				
			}else if(CODETYPE == "location_s_pod"){
				sheetObj.cellValue2(sheetObj.selectRow, "pod_cd") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "pod_nm")  = "";
				
			}if(CODETYPE == "location_s_fd"){
				sheetObj.cellValue2(sheetObj.selectRow, "fd_cd") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "fd_nm")  = "";
				
			}
		}
	}else{
		alert(getLabel('EQU_MST_MSG01'));		
	}
}
