var fileRow = 0;
function doWork(srcName){

    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.frm1;
    try {
        switch(srcName) {
        case "SEARCHLIST":

			//sheetObj.ShowDebugMsg = true;
			formObj.f_cmd.value = SEARCHLIST;
			sheetObj.DoSearch4Post("EQU_MST_0012GS.clt", FormQueryString(formObj));
				
		break;   
        case "ADD":
        	   var isOk = true;
        	   if(checkAllEml(formObj.eml_to_addr.value)==false){
        		   isOk = false;
        	   }
        	   if(formObj.eml_cc_addr.value.length>0){
        		   if(checkAllEml(formObj.eml_cc_addr.value)==false){
            		   isOk = false;
        		   }
        	   }
        	   
        	   //Maxlength를 확인함.
        	   var objArr = checkLen(document, 'eml_to_addr;eml_cc_addr;eml_tit;');
 
        	   //입력되지 않은 항목처리
        	   if(objArr[0]!=''){        		   
        		   if(objArr[0].indexOf('eml_to_addr')>-1){
        			   //alert(getShowErrMsg(formObj.eml_to_addr));
        			   alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_ADDR') + "\n\n: EQU_MST_0012.34");
        			   formObj.eml_to_addr.focus();
        			   
            		   isOk = false;            		   
        		   }else if(objArr[0].indexOf('eml_tit')>-1){
        			   //alert(getShowErrMsg(formObj.eml_tit));
        			   alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_MAIL') + "\n\n: EQU_MST_0012.40");
        			   formObj.eml_tit.focus();
        			   
            		   isOk = false;
        		   }
        	   }
        	
        	   //MaxLength보다 긴 항목들
        	   if(objArr[1]!=''){
        		   isOk = false;
        	   }

        	   //처리중 오류항목처리
        	   if(objArr[2]!=''){
        		   isOk = false;
        		   alert(getLabel('EQU_MST_MSG25'));
        	   }

        	   if(isOk){

					if(confirm(getLabel('EQU_MST_MSG24'))){
						
						var intRows = docObjects[1].Rows;
						intRows--;
						docObjects[1].DataInsert(intRows);
						docObjects[1].CellValue(1,1) = 1;
						
						formObj.f_cmd.value = ADD;
						
						showProcess('WORKING', document);
	                	docObjects[1].DoAllSave("./EQU_MST_0012GS.clt", FormQueryString(frm1)+docObjects[0].GetSaveString(false), true);
					}        	    	
        	   }
           break;
        case "APPLY":
        	var strHtml = sheetObj.Down2Html(2);
        	formObj.eml_msg.value=strHtml;
        	 //Html 파일로 변환하여 내린다.
//        	sheetObj.Down2Html(0, "C:\\IBSheetFile.html");
        	//브라우저로 열어본다.
//        	popGET('C:\\IBSheetFile.html', 'mailTmp', 371, 300, "scroll:no;status:no;help:no;");  
//        	window.open('C:\\IBSheetFile.html','sheet_html', 'toozlbar=1,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=1013,height=600,left=0,top=0');


        	break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: EQU_MST_0012.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: EQU_MST_0012.002");
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
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    doWork('SEARCHLIST')
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
                style.height = 150 ;
                //전체 너비 설정
                SheetWidth = mainTable.clientWidth;

                //Host정보 설정[필수][HostIp, Port, PagePath]
                if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

                //전체Merge 종류 [선택, Default msNone]
                MergeSheet = msHeaderOnly;

               //전체Edit 허용 여부 [선택, Default false]
                Editable = true;

                //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
                InitRowInfo( 1, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(12, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;

                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('EQU_MST_0012_HDR'), false);
                
                //데이터속성    [ROW,   COL,   DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0, 0,  dtDelCheck,       30,    daCenter,  true,		"",				false,		"",       dfNone,      0,     true,      true);
				InitDataProperty(0, 1,  dtHiddenStatus,   40,    daCenter,  true,		"dtl_ibflag");
				InitDataProperty(0, 2,  dtData,   		  40,    daCenter,  true,		"agmt_dtl_seq",	false,		"",       dfNone,      0,     false,     false,		3);
				InitDataProperty(0, 3,  dtPopupEdit,      80,    daLeft,    false,		"Port_loc_cd",	true,		"",       dfNone,      0,     false,      true,		5);
				InitDataProperty(0, 4,  dtData,      	 120,    daLeft,    false,		"Port_loc_nm",	true,		"",       dfNone,      0,     false,     false,		50);
				InitDataProperty(0, 5,  dtPopupEdit,	  80,    daLeft,    false,		"Port_nod_cd",	true,		"",       dfNone,      0,     false,     true,		7);
				InitDataProperty(0, 6,  dtData,			 120,    daLeft,    false,		"Port_nod_nm",	true,		"",       dfNone,      0,     false,     false,		7);
				InitDataProperty(0, 7,  dtData,		 	  80,    daCenter,  false,		"cntr_tpsz_cd",	true,		"",       dfNone,      0,     false,      true,		2);
				InitDataProperty(0, 8,  dtAutoSum,		  80,    daRight,   false,		"qty", 			false,		"",       dfInteger,   0,     false,      true,		7);
				InitDataProperty(0, 9,	dtData,			 150,    daRight,   false,		"amt",			false,      "",       dfFloat,     4,	  false,      true,		20);
				InitDataProperty(0,10,	dtAutoSum,		  80,    daRight,   false,		"sub_ttl",		false,      "",       dfFloat,     4,	  false,      false,	20);
				InitDataProperty(0,11,  dtHidden,         50,    daLeft,    false,		"agmt_no", 		false,		"",       dfNone,      0,     false,      true,		15);
				
				
				ImageList(0) = APP_PATH+"/web/img/button/btns_search.gif";
				
				// 대문자 자동 치환
		        InitDataValid(0, "Port_loc_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "Port_nod_cd",vtEngUpOther, "0123456789" );
           }                                                      
        break;
         case 2:      //IBSheet1 init
             with (sheetObj) {
                 // 높이 설정
                 style.height = 100;
                 //전체 너비 설정
                 SheetWidth = mainTable.clientWidth;

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
                 InitHeadRow(0, 'FLAG|STS', false);
                 
                 //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                 InitDataProperty(0, 0,  dtHiddenStatus, 40,  daCenter,  true,     "sv_ibflag");
                 InitDataProperty(0, 1,  dtHidden,       40,  daCenter,  false,    "");
            }                                                      
        break;
    }
}

function sheet2_OnSaveEnd(sheetObj, errMsg){
	hideProcess('WORKING', document);
	
	if(errMsg == null || errMsg == ""){
		var num = 1;
		fileRow = 0;
		var opSheetObj = opener.getSelectedFiles();
		for(var i = 1; i <= opSheetObj.rows; i++){
			if(opSheetObj.CellValue(i, 'palt_check')==1){
				var shIdx = docObjects[0].DataInsert();
				docObjects[0].CellValue(shIdx, 'docSeq') = num++;
				docObjects[0].CellValue(shIdx, 'docKind')= opSheetObj.CellValue(i, 'palt_doc_tp_cd');
				docObjects[0].CellValue(shIdx, 'docNm')  = opSheetObj.CellValue(i, 'palt_doc_nm'); 
				docObjects[0].CellValue(shIdx, 'f_palt_doc_seq')= opSheetObj.CellValue(i, 10);
				fileRow++;
			}
		}
//		alert('Mail send success!');
		alert(getLabel('EQU_MSG_001'));
		window.close();
    }
}