/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(document.form.s_rgst_strdt, document.form.s_rgst_enddt);
}

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var formObj  = document.form;
    var sheetObj = docObjects[0];
    
    switch(srcName) {
   		case "SEARCHLIST":
   		
   			/*if(formObj.s_rgst_strdt.value==""){
		   		alert("조회 시작일자를 입력하세요");
            	break;
			}else if(formObj.s_rgst_enddt.value==""){
		   		alert("조회 종료일자를 입력하세요");
            	break;
			}*/

            //디버깅
            // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
            // alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));

            	if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value = SEARCHLIST;
			    	sheetObj.DoSearch4Post("./SEC_FRT_0040GS.clt", FormQueryString(formObj));
		    	}
			    
   	   	break;
       	
       	case "PARTNER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	   
	   		var rtnary = new Array(1);
	   		
	   		rtnary[0] = "1";
	   		rtnary[1] = "";
	   		rtnary[2] = window;
	   		
   	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
   	        //window.open ('./CMM_POP_0010.clt', "list", "scrollbars=no,fullscreen=no,width=1024,height=480");
   	        
   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
			}else{
			
				var rtnValAry = rtnVal.split("|");
	
				formObj.s_trdp_cd.value = rtnValAry[0];//trdp_cd
				formObj.s_trdp_short_nm.value = rtnValAry[1];//shrt_nm
				formObj.s_trdp_full_nm.value = rtnValAry[2];//full_nm
				//rtnValAry[3];//pic_nm
				//rtnValAry[4];//pic_phn
				//rtnValAry[5];//pic_fax
				//rtnValAry[6];//pic_eml
				//rtnValAry[7];//pic_desc  	
			}
  	        
         break;
         
    }
}

/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal = new calendarPopupFromTo();
            cal.displayType = "date";
            cal.select(formObj.s_rgst_strdt, 's_rgst_strdt', formObj.s_rgst_enddt, 's_rgst_enddt', 'yyyy-MM-dd');
        break;
        
        case 'DATE2':   //달력 조회 팝업 호출      
             var cal = new calendarPopup();
             cal.select(formObj.s_bkg_dt_tm, 's_bkg_dt_tm', 'yyyy-MM-dd');
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

	var formObj  = document.form;
	
	var s_ofc_cd = formObj.s_ofc_cd.value;
	
	if(s_ofc_cd != ""){
		
		formObj.ofc_cd.value = s_ofc_cd;
	
	}
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    var openMean = formObj.openMean.value;
	
	if(openMean=="SEC"){
		
		var pre_ofc_cd = formObj.pre_ofc_cd.value;
	
		if(pre_ofc_cd != ""){
			
			formObj.ofc_cd.value = pre_ofc_cd;
		
		}
			
		doWork('SEARCHLIST');
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
            	style.height = 350;
                
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
                InitColumnInfo(9, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;

                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('SEC_FRT_0040_HDR'), false);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, 0,  dtData,        30,   daCenter,  false,    "no"	,   			false,      "",       dfNone,      0,     false,      true);
		        InitDataProperty(0, 1,  dtData,    	  120,   daLeft,    false,    "ca_no",   			false,      "",       dfNone,      0,     false,      true);
		        InitDataProperty(0, 2,  dtData,    	  120,   daLeft,    false,    "house_bl_no",   		false,      "",       dfNone,      0,     false,      true);
      			InitDataProperty(0, 3,  dtData,       120,   daLeft,    false,    "master_bl_no",   	false,      "",       dfNone,      0,     false,      true);
      			InitDataProperty(0, 4,  dtData,       100,   daCenter,  false,    "iss_dt_tm",    		false,      "",       dfNone,  		0,     false,      true);
      			InitDataProperty(0, 5,  dtData,       100,   daCenter,  false,    "cfm_dt_tm",   		false,      "",       dfNone,      0,     false,       true);
                InitDataProperty(0, 6,  dtData,       150,   daLeft,    false,    "ca_sts_cd_nm",  		false,      "",       dfNone,      0,     false,       true);
                InitDataProperty(0, 7,  dtData,       150,   daLeft,    false,    "ntc_trdp_full_nm",   false,      "",       dfNone,      0,     false,       true);
                InitDataProperty(0, 8,  dtHidden,     150,   daCenter,  false,    "intg_bl_seq",   false,      "",       dfNone,      0,     false,       true);
                
           }
           break;
    }
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var formObj  = document.form;
	
	formObj.s_ca_no.value = sheetObj.CellValue(Row,"ca_no");
	formObj.s_intg_bl_seq.value = sheetObj.CellValue(Row,"intg_bl_seq");
	formObj.f_cmd.value = SEARCH02;
   	doProcess = true;
	formObj.action = "./SEC_FRT_0030.clt";
    formObj.submit();
   	
	//searchSheet3(sheetObj,Row,Col);
}

