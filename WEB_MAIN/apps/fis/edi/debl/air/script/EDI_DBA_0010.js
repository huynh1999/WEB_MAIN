function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj  = docObjects[0];
    var sheetObj2 = docObjects[1];
    var sheetObj3 = docObjects[2];
    var sheetObj4 = docObjects[3];
    var sheetObj5 = docObjects[4];
    var sheetObj6 = docObjects[5];
    
    var formObj   = document.frm1;

    switch(srcName) {
    
	   case "DEFAULT":
		    formObj.f_cmd.value = -1;
	        formObj.submit();
	        
	   break;
      
       case "SEARCHLIST":
            formObj.f_cmd.value = SEARCHLIST;
            
			if(formObj.f_bl_no.value==''){
				//alert("Please, select BL");
				return;
			}else{
				
				var bl_type = document.getElementsByName("bl_type");
				
				if(bl_type[0].checked == true){
					formObj.f_bl_type.value = "M";
				}else{
					formObj.f_bl_type.value = "H";
				}

				formObj.f_cmd.value = SEARCHLIST;
         	    //doShowProcess();
         	    formObj.action = "./EDI_DBA_0010.clt";
         	    formObj.submit();
     	   }
			
	   break;
       
       case "SEARCHLIST01":
           formObj.f_cmd.value = SEARCHLIST01;
           
           sheetObj.DoSearch4Post("./EDI_DBA_0010GS.clt", FormQueryString(formObj));
       break;
       
       case "SEARCHLIST02":
           formObj.f_cmd.value = SEARCHLIST02;
           
           sheetObj2.DoSearch4Post("./EDI_DBA_0010_1GS.clt", FormQueryString(formObj));
       break;
       
       case "SEARCHLIST03":
           formObj.f_cmd.value = SEARCHLIST03;
           
           sheetObj3.DoSearch4Post("./EDI_DBA_0010_2GS.clt", FormQueryString(formObj));
       break;
       
       case "SEARCHLIST04":
           formObj.f_cmd.value = SEARCHLIST04;
           
           sheetObj4.DoSearch4Post("./EDI_DBA_0010_3GS.clt", FormQueryString(formObj));
       break;
      
       case "ADD":
    	   var rowCnt = 0; 
    	   rowCnt = sheetObj.DataInsert(-1);

    	   sheetObj.CellValue(rowCnt, 'zpl_seq') = rowCnt;
    	   sheetObj.CellValue(rowCnt, 'intg_bl_seq') = formObj.intg_bl_seq.value;
    	   if(sheetObj.RowCount == 1){
    		   sheetObj.CellValue(rowCnt, 'zpl_mrn') = formObj.mrn.value;
    	   }else{
    		   sheetObj.CellValue(rowCnt, 'zpl_mrn') = sheetObj.CellValue(rowCnt-1, 'zpl_mrn');
    	   }
    	   sheetObj.CellValue(rowCnt, 'zpl_position') = "000";
    	   sheetObj.CellValue(rowCnt, 'zpl_pkg_id') = "00";
    	   
    	   sheetObj.CellFont("FontBold", rowCnt, 'zpl_mrn') = true;
    	   sheetObj.CellFont("FontSize", rowCnt, 'zpl_mrn') = 10;
//    	   sheetObj.CellFont("FontColor", rowCnt, 'zpl_mrn') = "255,0,0";
       break;
       case "UPLOAD":
    	   if(uploadChk()) {
	       		
    		    formObj.f_cmd.value = MODIFY;
    		    
    		    sheetObj5.RemoveAll();
    			sheetObj5.DataInsert(-1);
    		    
    		    var sht1 = sheetObj.GetSaveString(false);
     		   
    		    sheetObj5.DoAllSave("EDI_DBA_0010GS.clt", FormQueryString(formObj)+'&'+sht1,true);
	       		
	       	}
           
       break;
       case "TRANSMIT":
    	   if(transmitChk()) {
    		    formObj.f_cmd.value = MODIFY01;
    		    
    		    sheetObj6.RemoveAll();
    			sheetObj6.DataInsert(-1);
    		    
    		    var sht1 = sheetObj.GetSaveString(false);
     		   
    		    sheetObj6.DoAllSave("EDI_DBA_0010GS.clt", FormQueryString(formObj)+'&'+sht1,true);
	       	}
       break;
       
    }
}

//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {

	var tabObjs = document.getElementsByName('tabLayer');
	if( isNumSep == "01" ) {
	
		currTab = isNumSep;	//탭상태저장
		
		document.all.Tab01.className = "tab_head-l";
		document.all.Tab02.className = "tab_head_non-l";
		
		tabObjs[0].style.display = 'inline';
		tabObjs[1].style.display = 'none';
		
		//스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
		
		//Mark Description 탭
	} else if( isNumSep == "02" ) {
		currTab = isNumSep;	//탭상태저장
		
		document.all.Tab01.className = "tab_head_non-l";
		document.all.Tab02.className = "tab_head-l";
		
		tabObjs[0].style.display = 'none';
		tabObjs[1].style.display = "inline";
		
		//스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
		
		//Shipping Document 탭
	} 
}


//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
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

	setResult();
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
         
	    case 1:      //IBSheet2 init
	
		    with (sheetObj) {
		       	 // 높이 설정
		            style.height = 100;
		            
		            //전체 너비 설정
		            SheetWidth = mainTable.clientWidth;
		            //SheetWidth = 400;
		
		            //Host정보 설정[필수][HostIp, Port, PagePath]
		            if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
		
		            //전체Merge 종류 [선택, Default msNone]
		            MergeSheet = msHeaderOnly;
		
		            //전체Edit 허용 여부 [선택, Default false]
		            Editable = true;
		
		            //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
		            InitRowInfo( 1, 1, 9, 100);
		
		            //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
		            InitColumnInfo(7, 0, 0, true);
		
		            // 해더에서 처리할 수 있는 각종 기능을 설정한다
		            InitHeadMode(true, true, true, true, false,false) ;
		            
		            //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		             InitHeadRow(0, getLabel('EDI_DBA_0010_HDR1_1'), true);
		             
		             var cnt = 0;
		             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		             InitDataProperty(0, cnt++,  dtDelCheckEx,	 40,    daCenter,    true,    "",      	 	false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,   	     40,    daCenter,    true,    "zpl_seq",    		false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,		150,    daCenter,    true,    "zpl_mrn",      	false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,   		 80,    daCenter,    true,    "zpl_position",    	false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,   		 80,    daCenter,    true,    "zpl_pkg_id",    	false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,   		 80,    daRight,     true,    "zpl_wgt",    		false,   "",       dfFloat,     	2,     true,      true);
		             InitDataProperty(0, cnt++,  dtHidden,        0,  	daCenter,    true,    "intg_bl_seq",      false,   "",       dfNone,          0,     false,        false);
	    } 
		break;
    
    	case 2:      //IBSheet1 init

            with (sheetObj) {
	        	 // 높이 설정
	             style.height = 180;
	             
	             //전체 너비 설정
	             SheetWidth = mainTable.clientWidth;
	             //SheetWidth = 400;
	
	             //Host정보 설정[필수][HostIp, Port, PagePath]
	             if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	
	             //전체Merge 종류 [선택, Default msNone]
	             MergeSheet = msHeaderOnly;
	
	             //전체Edit 허용 여부 [선택, Default false]
	             Editable = true;
	
	             //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
	             InitRowInfo( 1, 1, 9, 100);
	
	             //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
	             InitColumnInfo(6, 0, 0, true);
	
	             // 해더에서 처리할 수 있는 각종 기능을 설정한다
	             InitHeadMode(true, true, true, true, false,false) ;
	             
	             //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
	             InitHeadRow(0, getLabel('EDI_DBA_0010_HDR2_1'), true);
	             
	             var cnt = 0;
	             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
	             InitDataProperty(0, cnt++,  dtData,         40,    daCenter,    true,    "seq",               false,   "",       dfNone,          0,     false,        false);
	             InitDataProperty(0, cnt++,  dtData,	    120,    daCenter,    true,    "msg_dt",      	 false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,   	     60,    daCenter,    true,    "msg_seq",    false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,		 50,    daCenter,    true,    "msg_type",      	 false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,		 70,    daCenter,    true,    "rgst_usrid",      	 false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden,        0,  	daCenter,    true,    "intg_bl_seq",      false,   "",       dfNone,          0,     false,        false);
	             
	             //HeadRowHeight = 21;
	             
	             //InitViewFormat(0, "msg_dt", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정

           }                                                      
         break;
           
         case 3:      //IBSheet2 init

             with (sheetObj) {
 	        	 // 높이 설정
 	             style.height = 180;
 	             
 	             //전체 너비 설정
 	             SheetWidth = mainTable.clientWidth;
 	             //SheetWidth = 400;
 	
 	             //Host정보 설정[필수][HostIp, Port, PagePath]
 	             if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
 	
 	             //전체Merge 종류 [선택, Default msNone]
 	             MergeSheet = msHeaderOnly;
 	
 	             //전체Edit 허용 여부 [선택, Default false]
 	             Editable = true;
 	
 	             //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
 	             InitRowInfo( 1, 1, 9, 100);
 	
 	             //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
 	             InitColumnInfo(5, 0, 0, true);
 	
 	             // 해더에서 처리할 수 있는 각종 기능을 설정한다
 	             InitHeadMode(true, true, true, true, false,false) ;
 	             
 	             //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
 	            InitHeadRow(0, getLabel('EDI_DBA_0010_HDR3_1'), true);
 	             
 	             var cnt = 0;
 	             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
 	             InitDataProperty(0, cnt++,  dtData,         40,    daCenter,    true,    "seq",               false,   "",       dfNone,          0,     false,        false);
	             InitDataProperty(0, cnt++,  dtData,	     80,    daCenter,    true,    "msg_type",      	 false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,   	    100,    daCenter,    true,    "rgst_tms",    		 false,   "",      	dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,		180,      daLeft,    true,    "ack_ftx",      	 false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden,        0,  	daCenter,    true,    "intg_bl_seq",      false,   "",       dfNone,          0,     false,        false);  
        
         }      
         break;
         
         case 4:      //IBSheet2 init

	         with (sheetObj) {
		        	 // 높이 설정
		             style.height = 200;
		             
		             //전체 너비 설정
		             SheetWidth = mainTable.clientWidth;
		             //SheetWidth = 400;
		
		             //Host정보 설정[필수][HostIp, Port, PagePath]
		             if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
		
		             //전체Merge 종류 [선택, Default msNone]
		             MergeSheet = msHeaderOnly;
		
		             //전체Edit 허용 여부 [선택, Default false]
		             Editable = true;
		
		             //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
		             InitRowInfo( 1, 1, 9, 100);
		
		             //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
		             InitColumnInfo(11, 0, 0, true);
		
		             // 해더에서 처리할 수 있는 각종 기능을 설정한다
		             InitHeadMode(true, true, true, true, false,false) ;
		             
		             //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		             InitHeadRow(0, getLabel('EDI_DBA_0010_HDR4_1'), true);
		             
		             var cnt = 0;
		             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		             InitDataProperty(0, cnt++,  dtData,         40,    daCenter,    true,    "seq",               false,   "",       dfNone,          0,     false,        false);
		             InitDataProperty(0, cnt++,  dtData,	    120,    daCenter,    true,    "sts_event_dttm",      	 false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   	     80,    daCenter,    true,    "sts_cd",    false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,	    120,    daCenter,    true,    "zpl_no",      	 false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   	    120,    daCenter,    true,    "zpl_mrn",    false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,	     90,    daCenter,    true,    "zpl_position",      	 false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   	     70,    daCenter,    true,    "zpl_pkg_id",    false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,	    100,    daCenter,    true,    "csi_cus_sts",      	 false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   	    200,    daCenter,    true,    "cti_txt",    false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   	    200,    daCenter,    true,    "txt_txt",    false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtHidden,        0,  	daCenter,    true,    "intg_bl_seq",      false,   "",       dfNone,          0,     false,        false);
         	}      
	     break;
	     
         case 5:      //IBSheet2 init
     	
		    with (sheetObj) {
		       	 // 높이 설정
		            style.height = 0;
		            
		            //전체 너비 설정
		            SheetWidth = mainTable.clientWidth;
		            //SheetWidth = 400;
		
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
		            InitHeadRow(0, getLabel('EDI_DBA_0010_HDR5_1'), true);
		             
		             var cnt = 0;
		             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		             InitDataProperty(0, cnt++,  dtDelCheckEx,	 40,    daCenter,    true,    "",      	 	false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,   	     40,    daCenter,    true,    "upload_temp",    		false,   "",       dfNone,          0,     true,      true);
	    } 
		break;
		
         case 6:      //IBSheet2 init
      	
		    with (sheetObj) {
		       	 // 높이 설정
		            style.height = 0;
		            
		            //전체 너비 설정
		            SheetWidth = mainTable.clientWidth;
		            //SheetWidth = 400;
		
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
		            InitHeadRow(0, getLabel('EDI_DBA_0010_HDR6_1'), true);
		             
		             var cnt = 0;
		             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		             InitDataProperty(0, cnt++,  dtDelCheckEx,	 40,    daCenter,    true,    "",      	 	false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,   	     40,    daCenter,    true,    "transmit_temp",    		false,   "",       dfNone,          0,     true,      true);
	    } 
		break;
         
     }
}

function setResult() {
	var formObj  = document.frm1;
	var bl_type 			= document.getElementsByName("bl_type");
	var rd_zpi_local_goods 	= document.getElementsByName("rd_zpi_local_goods");
	
	for(var i=0; i<bl_type.length; i++){
		bl_type[i].disabled = true;
	}
	
	
	if(formObj.zpi_local_goods.value == "N" && formObj.zpi_pre_note.value== "J"){	//N 이면 : ZPI_LOCAL_GOODS : N, ZPI_PRE_NOTE : J 
		rd_zpi_local_goods[0].checked = false;
		rd_zpi_local_goods[1].checked = true;
	}else{																			//(default : Y)Y 이면 : ZPI_LOCAL_GOODS : J, ZPI_PRE_NOTE : N 
		rd_zpi_local_goods[0].checked = true;
		rd_zpi_local_goods[1].checked = false;
	}

	
	if(formObj.intg_bl_seq.value != ""){
		var f_bl_type = document.getElementsByName("f_bl_type");
		var bl_type = document.getElementsByName("bl_type");
		
		if(formObj.bl_type_val.value == "M"){
			bl_type[0].checked = true;
			f_bl_type[0].checked = true;
		
			bl_type[1].checked = false;
			f_bl_type[1].checked = false;
			
			formObj.hbl_pck_qty.className = 'search_form-disable';
			formObj.hbl_pck_qty.readOnly  = true;
			formObj.hbl_grs_wgt.className = 'search_form-disable';
			formObj.hbl_grs_wgt.readOnly  = true;
			
			document.getElementById("tdPcs").className = 'table_search_head'
			document.getElementById("tdWgt").className = 'table_search_head'
			document.getElementById("tdCmdt").className = 'table_search_head'
			
		}else{
			bl_type[0].checked = false;			
			f_bl_type[0].checked = false;
			
			bl_type[1].checked = true;
			f_bl_type[1].checked = true;
			
			document.getElementById("tdPcs").className = 'table_search_head_r'
			document.getElementById("tdWgt").className = 'table_search_head_r'
			document.getElementById("tdCmdt").className = 'table_search_head_r'

		}	
		
		doWork('SEARCHLIST01');
		doWork('SEARCHLIST02');
		doWork('SEARCHLIST03');
		doWork('SEARCHLIST04');
		
	}
	
	if(formObj.sts_cd.value == "N/A" && formObj.mrn.value != ""){
		doWork('ADD');
	}
}	


function openPopUp(srcName, curObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
	try {
		switch(srcName) {
		
			case "BL_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	        
				var f_bl_type = document.getElementsByName("f_bl_type");
				var str_poplist = "";
				
				if(f_bl_type[0].checked == true){
					
					var rtnary = new Array(1);
					rtnary[0] = "A"; //S = 해운에서 오픈, A = 항공에서 오픈
					rtnary[1] = "O"; //I: In-bound, O: Out-bound
					
			    	var rtnVal = window.showModalDialog('./CMM_POP_0180.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
			    	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			    		return;
					}else{
						var rtnValAry = rtnVal.split("|");
						formObj.f_bl_no.value = rtnValAry[0];//mbl_no
						formObj.intg_bl_seq.value = rtnValAry[1];//intg_bl_seq
					}
					
				}else{
					var rtnary = new Array(1);
			   		
			   		rtnary[0] = "A";
			   		rtnary[1] = "O";

		   	        var rtnVal = window.showModalDialog('./CMM_POP_0170.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
		   	       
		   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					 	return;
					}else{
					
						var rtnValAry = rtnVal.split("|");

						formObj.f_bl_no.value = rtnValAry[0];//house_bl_no
						formObj.intg_bl_seq.value = rtnValAry[3];//intg_bl_seq
					}
				}
				
				doWork('SEARCHLIST');
				 
		    break;
		    
			case "COMMODITY_POPLIST1"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
				var rtnary = new Array(1);
		   		rtnary[0] = "1";
		        var rtnVal = window.showModalDialog('./CMM_POP_0110.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:483px");
		        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				 	
				}else{
					var rtnValAry = rtnVal.split("|");
					formObj.hbl_rep_cmdt_cd.value = rtnValAry[0];
					formObj.hbl_rep_cmdt_nm.value = rtnValAry[2];
					//formObj.hbl_ep_cmdt_nm.onchange();
				}
	       break;
           
			case "EDI_LINER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
		   		var rtnary = new Array(2);
		   		rtnary[0] = "1";
		   		
		   		var curObjId = curObj.id;
		   		var cstmTpCd = '';
		   		
		   		if(curObjId=='shipper'){
		   			rtnary[1] = formObj.shpr_trdp_nm.value;
		   		}else if(curObjId=='consignee'){
		   			rtnary[1] = formObj.cnee_trdp_nm.value;
		   		}

		   		rtnary[2] = window;
		   		
		   		var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px");
		        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				 	
				}else{
					var rtnValAry = rtnVal.split("|");
					if(curObjId == "shipper"){
						if(rtnValAry[0]==''){
							//formObj.shpr_trdp_cd.focus();
						}else{
							formObj.shpr_trdp_cd.value = rtnValAry[0];//trdp_cd
							formObj.shpr_trdp_nm.value = rtnValAry[2];//eng_nm
							formObj.shpr_trdp_addr.value = rtnValAry[7];//shpr_trdp_addr
							formObj.shpr_trdp_zip.value = rtnValAry[11];//shpr_trdp_zip
							formObj.shpr_trdp_city.value = rtnValAry[19];//shpr_trdp_city
							formObj.shpr_trdp_cnt.value = rtnValAry[12];//shpr_trdp_cnt
							formObj.shpr_trdp_phn.value = rtnValAry[4];//shpr_trdp_phn
							formObj.shpr_trdp_fax.value = rtnValAry[5];//shpr_trdp_fax
						}
						
					}else if(curObjId == "consignee"){
						if(rtnValAry[0]==''){
							//formObj.cnee_trdp_cd.focus();
						}else{
							formObj.cnee_trdp_cd.value = rtnValAry[0];//trdp_cd
							formObj.cnee_trdp_nm.value = rtnValAry[2];//eng_nm
							formObj.cnee_trdp_addr.value = rtnValAry[7];//cnee_trdp_addr
							formObj.cnee_trdp_zip.value = rtnValAry[11];//cnee_trdp_zip
							formObj.cnee_trdp_city.value = rtnValAry[19];//cnee_trdp_city
							formObj.cnee_trdp_cnt.value = rtnValAry[12];//cnee_trdp_cnt
							formObj.cnee_trdp_phn.value = rtnValAry[4];//cnee_trdp_phn
							formObj.cnee_trdp_fax.value = rtnValAry[5];//cnee_trdp_fax
						}						
					}
				}
	       break;
    	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: EDI_DBA_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: EDI_DBA_0010.002");
        }
	}
}

function codeNameActionEdi(str, obj, tmp){
	var s_code = obj.value.toUpperCase();		
	var s_type = "";
	
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE =str;		
				var sub_str = str.substring(0,8);
				s_type = str;
				ajaxSendPost(dispCodeNameAjaxReqEdi, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			
			}
		} else if ( tmp == "onBlur" ) {
			CODETYPE =str;		
			var sub_str = str.substring(0,8);
			
			s_type = str;
			ajaxSendPost(dispCodeNameAjaxReqEdi, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}
}

//코드표시 Ajax
function dispCodeNameAjaxReqEdi(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');	
			
			if(CODETYPE =="commodity"){
				formObj.hbl_rep_cmdt_cd.value = masterVals[0];
				formObj.hbl_rep_cmdt_nm.value = masterVals[3];
//				formObj.hbl_rep_cmdt_nm.onchange();
			}
		}else{
			
			if(CODETYPE =="commodity"){
				formObj.hbl_rep_cmdt_cd.value = "";
				formObj.hbl_rep_cmdt_nm.value = "";
			}
		}
	}else{
	}
}

function uploadChk(){
	var chkVal = true;
	var formObj  = document.frm1;
	
	/*
	 * 필수값 설정
	 */
	
	var intg_bl_seq = formObj.intg_bl_seq.value;
	var bl_type = formObj.bl_type_val.value;
	
	if(intg_bl_seq ==""){
		chkVal = false;
		alert("Please,  Retrieve.");
		return chkVal;
	}
	
	if(checkInputVal(formObj.mbl_no.value, 2, 16, "T", 'MAWB No.')!='O'){
		chkVal = false;
		formObj.mbl_no.focus();
		return chkVal;
	}
	
	if(checkInputVal(formObj.mbl_pck_qty.value, 1, 7, "N", 'AWB PCS')!='O'){
		chkVal = false;
		formObj.mbl_pck_qty.focus();
		return chkVal;
	}
	
	if(checkInputVal(formObj.mbl_rt_pck_qty.value, 1, 7, "N", 'Rate PCS')!='O'){
		chkVal = false;
		formObj.mbl_rt_pck_qty.focus();
		return chkVal;
	}
	
	if(checkInputVal(formObj.mbl_grs_wgt.value, 1, 8, "N", 'AWB G/Weight')!='O'){
		chkVal = false;
		formObj.mbl_grs_wgt.focus();	
		return chkVal;
	}
	
	if(checkInputVal(formObj.mbl_rt_grs_wgt.value, 1, 8, "N", 'AWB Rate Weight')!='O'){
		chkVal = false;
		formObj.mbl_rt_grs_wgt.focus();	
		return chkVal;
	}
	
	if(checkInputVal(formObj.mbl_rt_clss_cd.value, 1, 1, "T", 'AWB Rate')!='O'){
		chkVal = false;
		formObj.mbl_rt_clss_cd.focus();	
		return chkVal;
	}
	
	if(formObj.mbl_pck_qty.value <= 0){
		alert("please enter a value greater than zero in the AWB PCS");
		chkVal = false;
		formObj.mbl_pck_qty.focus();
		return chkVal;
	}
	
	if(formObj.mbl_grs_wgt.value <= 0){
		alert("please enter a value greater than zero in the AWB G/Weight");
		chkVal = false;
		formObj.mbl_grs_wgt.focus();
		return chkVal;
	}

	if(bl_type == "H"){
		if(checkInputVal(formObj.hbl_no.value, 2, 16, "T", 'HAWB NO.')!='O'){
			chkVal = false;
			formObj.hbl_no.focus();
			return chkVal;
		}
		
		if(checkInputVal(formObj.hbl_pck_qty.value, 1, 7, "N", 'HAWB PCS')!='O'){
			chkVal = false;
			formObj.hbl_pck_qty.focus();
			return chkVal;
		}
		
		if(checkInputVal(formObj.hbl_grs_wgt.value, 1, 8, "N", 'HAWB G/Weight')!='O'){
			chkVal = false;
			formObj.hbl_grs_wgt.focus();	
			return chkVal;
		}
		
//		if(checkInputVal(formObj.hbl_rep_cmdt_cd.value, 1, 13, "T", 'Commodity')!='O'){
//			chkVal = false;
//			formObj.hbl_rep_cmdt_cd.focus();
//			return chkVal;
//		}
		
		if(checkInputVal(formObj.hbl_rep_cmdt_nm.value, 1, 31, "T", 'Commodity')!='O'){
			chkVal = false;
			formObj.hbl_rep_cmdt_nm.focus();
			return chkVal;
		}
		
		if(formObj.hbl_pck_qty.value <= 0){
			alert("please enter a value greater than zero in the HAWB PCS");
			chkVal = false;
			formObj.hbl_pck_qty.focus();
			return chkVal;
		}
		
		if(formObj.hbl_grs_wgt.value <= 0){
			alert("please enter a value greater than zero in the HAWB G/Weight");
			chkVal = false;
			formObj.hbl_grs_wgt.focus();
			return chkVal;
		}
	}
	
	if(checkInputVal(formObj.lnr_trdp_cd.value, 5, 21, "T", 'Air Line')!='O'){
		chkVal = false;
		formObj.lnr_trdp_cd.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.flt_no.value, 5, 16, "T", 'FLT No.')!='O'){
		chkVal = false;
		formObj.flt_no.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.pol_cd.value, 1, 16, "T", 'Departure')!='O'){
		chkVal = false;
		formObj.pol_cd.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.etd_dt_tm.value, 10, 10, "DD", 'Departure')!='O'){
		chkVal = false;
		formObj.etd_dt_tm.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.etd_tm.value, 5, 5, "T", 'Departure')!='O'){
		chkVal = false;
		formObj.etd_tm.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.pod_cd.value, 1, 16, "T", 'Destination')!='O'){
		chkVal = false;
		formObj.pod_cd.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.eta_dt_tm.value, 10, 10, "DD", 'Destination')!='O'){
		chkVal = false;
		formObj.eta_dt_tm.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.eta_tm.value, 5, 5, "T", 'Destination')!='O'){
		chkVal = false;
		formObj.eta_tm.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.gate_han_agt.value, 1, 10, "T", 'Gate Handling Agent')!='O'){
		chkVal = false;
		formObj.gate_han_agt.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.car_han_agt.value, 1, 10, "T", 'Carrier Handling Agent')!='O'){
		chkVal = false;
		formObj.car_han_agt.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.cust_ofc_cd.value, 1, 10, "T", 'Customs Office')!='O'){
		chkVal = false;
		formObj.cust_ofc_cd.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.tin_cd.value, 1, 10, "T", 'TIN')!='O'){
		chkVal = false;
		formObj.tin_cd.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.frwd_ofc_nm.value, 1, 50, "T", 'Forwarder')!='O'){
		chkVal = false;
		formObj.frwd_ofc_nm.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.frwd_trdp_pic.value, 1, 50, "T", 'PIC')!='O'){
		chkVal = false;
		formObj.frwd_trdp_pic.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.frwd_trdp_email.value, 1, 50, "T", 'eMail')!='O'){
		chkVal = false;
		formObj.frwd_trdp_email.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.shpr_trdp_nm.value, 1, 50, "T", 'Shipper')!='O'){
		chkVal = false;
		formObj.shpr_trdp_nm.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.shpr_trdp_addr.value, 1, 100, "T", 'Shipper Address')!='O'){
		chkVal = false;
		formObj.shpr_trdp_addr.focus();
		return chkVal;
	}
//	if(checkInputVal(formObj.shpr_trdp_zip.value, 1, 10, "T", 'Shipper Zip')!='O'){
//		chkVal = false;
//		formObj.shpr_trdp_zip.focus();
//		return chkVal;
//	}
	if(checkInputVal(formObj.shpr_trdp_city.value, 1, 30, "T", 'Shipper City')!='O'){
		chkVal = false;
		formObj.shpr_trdp_city.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.shpr_trdp_cnt.value, 1, 3, "T", 'Shipper Country')!='O'){
		chkVal = false;
		formObj.shpr_trdp_cnt.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.cnee_trdp_nm.value, 1, 50, "T", 'Consignee')!='O'){
		chkVal = false;
		formObj.cnee_trdp_nm.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.cnee_trdp_addr.value, 1, 100, "T", 'Consignee Address')!='O'){
		chkVal = false;
		formObj.cnee_trdp_addr.focus();
		return chkVal;
	}
//	if(checkInputVal(formObj.cnee_trdp_zip.value, 1, 10, "T", 'Consignee Zip')!='O'){
//		chkVal = false;
//		formObj.cnee_trdp_zip.focus();
//		return chkVal;
//	}
	if(checkInputVal(formObj.cnee_trdp_city.value, 1, 30, "T", 'Consignee City')!='O'){
		chkVal = false;
		formObj.cnee_trdp_city.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.cnee_trdp_cnt.value, 1, 3, "T", 'Consignee Country')!='O'){
		chkVal = false;
		formObj.cnee_trdp_cnt.focus();
		return chkVal;
	}
	
	if(formObj.awb_direct.value== "DR" || bl_type == "H"){
		var sheetObj = docObjects[0];
		
		if(sheetObj.RowCount == 0){
			//alert("The case of direct bl must be entered to mrn");
			alert("Please Input the MRN.");
			chkVal = false;
			return chkVal;
		}else{
			for(var i=1; i<=sheetObj.LastRow;i++){
				if(sheetObj.CellValue(i, "zpl_mrn").length != 18){
					alert("MRN should be 18 characters.");
					chkVal = false;
					return chkVal;
				}
	            if(checkInputVal(sheetObj.CellValue(i, "zpl_position"), 1, 3, "T", 'Position')!='O'){
					chkVal = false;
					return chkVal;
				} 
	            if(checkInputVal(sheetObj.CellValue(i, "zpl_pkg_id"), 1, 2, "T", 'Package id.')!='O'){
					chkVal = false;
					return chkVal;
				}
//	            if(sheetObj.CellValue(i, "zpl_wgt") <= 0){
//					alert("please enter a value greater than zero in the Weight");
//					chkVal = false;
//					return chkVal;
//				}
			}	
		}
	}
	
	return chkVal;
}

function transmitChk(){
	
	var chkVal = true;
	var formObj  = document.frm1;
	
	if(formObj.sts_cd.value == "N/A"){
		chkVal = false;
		alert("After upload you can transmit.");
	}
	
	if(chkVal){
		chkVal = uploadChk();
	}
	
	return chkVal;
}


function sheet5_OnSaveEnd(sheetObj, errMsg){
	
	alert("Upload success! ");
	doWork('SEARCHLIST');
}

function sheet6_OnSaveEnd(sheetObj, errMsg){
	
	alert("Transmit success! ");
	doWork('SEARCHLIST');

}


function teilnehmer_von_select(s, dest) {
	var f = $(dest);
	if ( f ) {
		element_set_value(f, $F(s));
		if ( f.onchange )
			f.onchange();
		f.activate();
		if ( WBE && WBE.focus_next )
			WBE.focus_next();
	}
}

function setCar_han_agtd(obj){
	var formObj  = document.frm1;
	formObj.car_han_agt.value = formObj.gate_han_agt.value;
}

function changeZpiVal(){

	var formObj  = document.frm1;
	var rd_zpi_local_goods 	= document.getElementsByName("rd_zpi_local_goods");
	
	if(rd_zpi_local_goods[0].checked){
		formObj.zpi_local_goods.value = "J";
		formObj.zpi_pre_note.value= "N"
	}
	
	if(rd_zpi_local_goods[1].checked){
		formObj.zpi_local_goods.value = "N";
		formObj.zpi_pre_note.value= "J"
	}
	
}
