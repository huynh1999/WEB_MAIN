function doWork(srcName){
	if(!btnVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.fName;

    try {
        switch(srcName) {
           case "SEARCHLIST":

                formObj.f_cmd.value = SEARCHLIST;
                
                //sheetObj.ShowDebugMsg = true;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                    sheetObj.DoSearch4Post("SYS_OFC_0010GS.clt", FormQueryString(formObj));
                }
                //sheetObj.ShowDebugMsg = false;
           break;
           case "MODIFY":
               formObj.f_cmd.value = MODIFY;
               
               if(inpuValCheck(sheetObj, MODIFY)){
	               //전체 CellRow의 갯수
            	   //Do you want to APPLY?
	               if(confirm(getLabel('FMS_COM_CFMCON'))){
	                   doProcess = true;
	                   sheetObj.DoSave("SYS_OFC_0010GS.clt", FormQueryString(formObj),"ibflag",false);
	               }
               }
          break;
           case "REMOVE":
                formObj.f_cmd.value = REMOVE;
                
                if(inpuValCheck(sheetObj, REMOVE)){
	                //전체 CellRow의 갯수
                	//Do you want to delete?
	                if(confirm(getLabel('FMS_COM_CFMDEL'))){
	                    doProcess = true;
	                    sheetObj.DoSave("SYS_OFC_0010GS.clt", FormQueryString(formObj),"ibflag",false);
	                }
                }
           break;
           case "ROWADD":

        	   var curRowIdx = sheetObj.SelectRow;
        	   var Row = sheetObj.DataInsert();
               
        	   //총 데이터 Row의 갯수
        	   var totRpws = sheetObj.RowCount;
        	   
        	   //선택이되지 않은경우 제일 앞열에 표시
        	   if(totRpws==0){
        		   sheetObj.RowLevel(Row) = 1;
        	   }else{
        		   if(curRowIdx==1){
        			   
        		   }else{
            		   sheetObj.RowLevel(Row) = sheetObj.RowLevel(curRowIdx);        			   
        		   }
        	   }

        	   var curLevel = sheetObj.RowLevel(Row);	//현재 Row의레벨
        	   for(var i = Row-1; i > 0; i--){
        		   var upLevel = sheetObj.RowLevel(i);
        		   
        		   //상위 레벨인경우
        		   if(upLevel<curLevel){
        			   sheetObj.CellValue(Row, 1) = sheetObj.CellValue(i, 4);
        			   break;
        		   }
        	   }
           break;
           case "SUBROWADD":
        	   var Row = sheetObj.DataInsert();
 
        	   var curLevel = sheetObj.RowLevel(Row);	//현재 Row의레벨
        	   var totRpws  = sheetObj.RowCount;		//전체 Row갯수
        	   
        	   for(var i = Row-1; i > 0; i--){
        		   var upLevel = sheetObj.RowLevel(i);
        		   
        		   //상위 레벨인경우
        		   if(upLevel<curLevel){
        			   sheetObj.CellValue(Row, 1) = sheetObj.CellValue(i, 4);   
        			   break;
        		   }
        	   }
        	   
           break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SYS_OFC_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SYS_OFC_0010.002"); 
        }
    }
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value = 1;
	doWork('SEARCHLIST');
}

var calledMenu;
var displayedMenu;

//코드표시 Ajax
function dispAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		}
	}
}

function inpuValCheck(sheetObj, f_cmd){
	var rowCnt = sheetObj.rows;
	var isOk = true;
	var loopNum = 0;
	
	var checkVal = false;
	for(var i = 1; i < rowCnt; i++){
	   var stat = sheetObj.CellValue(i, 'ibflag');
	   if(stat!='R'){
		   if(f_cmd==ADD&&stat=='I'){
			   checkVal = true;
			   loopNum++;
		   }else if(f_cmd==MODIFY&&stat=='U'){
			   checkVal = true;
			   loopNum++;
		   }else if(f_cmd==REMOVE&&stat=='D'){
			   loopNum++;
		   }
		   
		   if(checkVal){
			   if(checkInputVal(sheetObj.CellValue(i, 'ofc_cd'),           3,  10, "T", getLabel('ITM_OFFICE_CD'))!='O'){
				   isOk = false;
				   break;
			   }else if(checkInputVal(sheetObj.CellValue(i, 'ofc_eng_nm'), 3,  50, "T", getLabel('ITM_OFFICE_NM'))!='O'){
				   isOk = false;
				   break;
			   }else if(checkInputVal(sheetObj.CellValue(i, 'cnt_cd'),     2,   2, "T", getLabel('ITM_COUNTRY'))!='O'){
				   isOk = false;
				   break;
			   }else if(checkInputVal(sheetObj.CellValue(i, 'ofc_addr'),  10, 400, "T", getLabel('ITM_ADDR'))!='O'){
				   isOk = false;
				   break;
			   }
		   }
		   checkVal = false;
	   }
	}
	
	if(loopNum==0){
		if(f_cmd==MODIFY){
			//There is nothing to register or modify!
			
		}else if(f_cmd==REMOVE){
			//There is nothing to delete!
			
		}
		isOk = false;
	}else{
		for(var i = 1; i < rowCnt; i++){
		   var stat = sheetObj.CellValue(i, 'ibflag');
		   if(stat!='R'){
			   if(f_cmd==ADD&&stat=='I'){
			   }else if(f_cmd==MODIFY&&stat=='U'){
			   }else if(f_cmd==REMOVE&&stat=='D'){
			   }else{
				   sheetObj.CellValue(i, 'ibflag') = 'R';
			   }
		   }
		}
	}
	return isOk;
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
		        style.height = 410;
		        
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
		        InitColumnInfo(8, 0, 0, true);
		
		        // 해더에서 처리할 수 있는 각종 기능을 설정한다
		        InitHeadMode(true, true, true, true, false,false) ;

		        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		        InitHeadRow(0, getLabel('SYS_OFC_0010_HDR1'), true);
						        
		        //데이터속성         [ROW,COL,DATATYPE,     WIDTH, DATAALIGN,COLMERGE,  SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		        InitDataProperty(0, 0, dtHiddenStatus, 0,   daCenter, false,    "ibflag");
		        InitDataProperty(0, 1, dtHidden,       0,   daLeft,   false,    "prnt_ofc_cd",false,   "",    dfNone,      0,     false,      true);
		        InitDataProperty(0, 2, dtDelCheck,    40,   daCenter, true,      "");
		        InitDataProperty(0, 3, dtData,       200,   daLeft,   false,    "ofc_level",  false,   "",    dfNone,      0,     false,      true);
		        InitDataProperty(0, 4, dtPopup,       90,   daLeft,   false,    "ofc_cd",     false,   "",    dfNone,      0,     false,      true);
				InitDataProperty(0, 5, dtData,       120,   daLeft,   false,    "ofc_eng_nm", false,   "",    dfNone,      0,     false,      true);
				InitDataProperty(0, 6, dtData,       120,   daLeft,   false,    "cnt_cd",     false,   "",    dfNone,      0,     false,      true);
				InitDataProperty(0, 7, dtData,       120,   daLeft,   false,    "ofc_addr",   false,   "",    dfNone,      0,     false,      true);
				
		        
		        //Cell Image display
		        ImageList(0) = APP_PATH+"/web/img/button/btns_search.gif";
		        PopupButtonImage(0, "ofc_cd") = 0;
		        
		        //Mouse Cursor Hand
		        InitTreeInfo(3, "sLevel", RgbColor(0,0,255), true);
		   }                                                      
		break;
    }
}

function sheet1_OnPopupClick(callSheet, row, col) {
	var curRowIdx = callSheet.SelectRow;

	var colStr = callSheet.ColSaveName(col);
	if(colStr=="ofc_cd"){
		
		var tmpStr = callSheet.CellValue(row, col);
		
		tmpStr = tmpStr.replaceAll(' ', '');
		if(tmpStr.length==0){
		
	   		var rtnary = new Array(2);
	   		rtnary[0] = "";
	   		rtnary[1] = "MST";
	   		
	        var rtnVal = window.showModalDialog('./CMM_POP_0150.clt?s_prnt_ofc_cd=MST', rtnary, "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:600px");
	        if (rtnVal==""||typeof(rtnVal)=='undefined') {
			 	return;
			}
			var rtnValAry = rtnVal.split("|");
			
			var isNew = true;
			//동일한 코드 존재여부 확인
			for(var i = 1; i <= callSheet.RowCount; i++){
				if(rtnValAry[0]==callSheet.CellValue(i, 4)){
					isNew = false;
					break;
				}
			}
			
			//동일한 코드가 없는경우
			if(isNew){
				//Root 여부확인
				if(curRowIdx==1){
					callSheet.CellValue(row, 1) = rtnValAry[0];
				}
				callSheet.CellValue(row, 4) = rtnValAry[0];
				callSheet.CellValue(row, 5) = rtnValAry[1];
				callSheet.CellValue(row, 6) = rtnValAry[2];
				callSheet.CellValue(row, 7) = rtnValAry[3];
			}else{
				//That code is used already
				alert(getLabel('SYS_COM_ALT007')+ "\n\n: SYS_OFC_0010.321");
				return;
			}
		}
	}
}