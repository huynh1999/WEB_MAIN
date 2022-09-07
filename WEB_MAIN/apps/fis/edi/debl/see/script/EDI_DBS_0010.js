function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj  = docObjects[0];
    var sheetObj2 = docObjects[1];
    var sheetObj3 = docObjects[2];
    var sheetObj4 = docObjects[3];
    var sheetObj5 = docObjects[4];
    var sheetObj6 = docObjects[5];
    var sheetObj7 = docObjects[6];
    var sheetObj8 = docObjects[7];
    
    var formObj   = document.frm1;

    switch(srcName) {
    
	   case "DEFAULT":
		    formObj.f_cmd.value = -1;
	        formObj.submit();
	        
	   break;
      
       case "SEARCHLIST":
            formObj.f_cmd.value = SEARCHLIST;
            
            	if(formObj.msg_no.value=='' && formObj.f_bl_no.value=='' && formObj.f_ref_no.value==''){
            			//alert("Please, select BL");
            			return;
				}else{
					
					var msg_tp = document.getElementsByName("f_msg_tp");
					
					if(msg_tp[0].checked == true){
						formObj.f_msg_tp.value = "M";
					}else{
						formObj.f_msg_tp.value = "H";
					}
	
					formObj.f_cmd.value = SEARCHLIST;
	         	    //doShowProcess();
	         	    formObj.action = "./EDI_DBS_0010.clt";
	         	    formObj.submit();
	     	   }
			
	   break;
       
       case "SEARCHLIST01":
           formObj.f_cmd.value = SEARCHLIST01;
           
           sheetObj.DoSearch4Post("./EDI_DBS_0010GS.clt", FormQueryString(formObj));
       break;
       
       case "SEARCHLIST02":
           formObj.f_cmd.value = SEARCHLIST02;
           
           sheetObj2.DoSearch4Post("./EDI_DBS_0010_1GS.clt", FormQueryString(formObj));
       break;
       
       case "SEARCHLIST03":
           formObj.f_cmd.value = SEARCHLIST03;
           
           sheetObj3.DoSearch4Post("./EDI_DBS_0010_2GS.clt", FormQueryString(formObj));
       break;
       
       case "SEARCHLIST04":
           formObj.f_cmd.value = SEARCHLIST04;
           
           sheetObj4.DoSearch4Post("./EDI_DBS_0010_3GS.clt", FormQueryString(formObj));
       break;
      
       case "ADD":
    	   var rowCnt = 0; 
    	   rowCnt = sheetObj.DataInsert(-1);

    	   sheetObj.CellValue(rowCnt, 'goods_item_seq') = rowCnt;
    	   sheetObj.CellValue(rowCnt, 'msg_no') = formObj.msg_no.value;
    	   sheetObj.CellValue(rowCnt, 'goods_pkg') = formObj.pck_qty.value;
    	   sheetObj.CellValue(rowCnt, 'goods_pkg_type') = formObj.pck_ut_cd.value;
    	   sheetObj.CellValue(rowCnt, 'goods_pos_no') = "000";
    	   sheetObj.CellValue(rowCnt, 'goods_pkg_id') = "00";
    	   sheetObj.CellValue(rowCnt, 'goods_gross_wgt') = formObj.grs_wgt.value;
    	   sheetObj.CellValue(rowCnt, 'goods_gross_wgt_unit') = "KGM";
    	   sheetObj.CellValue(rowCnt, 'goods_net_wgt') = formObj.grs_wgt.value;
    	   sheetObj.CellValue(rowCnt, 'goods_net_wgt_unit') = "KGM";
    	   sheetObj.CellValue(rowCnt, 'cntr_desc') = formObj.rep_cmdt_nm.value;
    	   
    	   
       break;
       case "ZBNUMBER":
    	   var rtnary = new Array(2);
	   		rtnary[0] = "1";
	   		rtnary[1] = formObj.msg_no.value;
	   			   		
	   		var rtnVal = window.showModalDialog('./EDI_DBS_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				
				var deli = "@@^";
				var lastDeli = "@@;";
				var rowCnt = 0;
				
				var rtnValAryList = rtnVal.split(lastDeli);

				for(var i=0; i<rtnValAryList.length-1; i++){
					
					var rtnValAry= new Array(); 
					var rtnValAry = rtnValAryList[i].split(deli);
					
					rowCnt = sheetObj.DataInsert(-1);

		    	    sheetObj.CellValue(rowCnt, 'cntr_ibflag') 			= "U";
		    	    sheetObj.CellValue(rowCnt, 'goods_item_seq') 		= rowCnt;
		    	    sheetObj.CellValue(rowCnt, 'cntr_no') 				= rtnValAry[13];
		    	    sheetObj.CellValue(rowCnt, 'cntr_list_seq') 		= rtnValAry[16];
		    	    sheetObj.CellValue(rowCnt, 'cntr_tpsz_cd') 			= rtnValAry[14];
		    	    
		    	    sheetObj.CellValue(rowCnt, 'goods_pkg') 			= rtnValAry[5];
		    	    sheetObj.CellValue(rowCnt, 'goods_pkg_type') 		= rtnValAry[6];
		    	    sheetObj.CellValue(rowCnt, 'goods_gross_wgt') 		= rtnValAry[7];
		    	    sheetObj.CellValue(rowCnt, 'goods_gross_wgt_unit') 	= rtnValAry[8];
		    	    sheetObj.CellValue(rowCnt, 'goods_net_wgt') 		= rtnValAry[9];
		    	    sheetObj.CellValue(rowCnt, 'goods_net_wgt_unit') 	= rtnValAry[10];
		    	    sheetObj.CellValue(rowCnt, 'goods_pos_no') 			= rtnValAry[11];
		    	    sheetObj.CellValue(rowCnt, 'goods_pkg_id') 			= rtnValAry[12];
		    	    
		    	    sheetObj.CellValue(rowCnt, 'z_number') 				= rtnValAry[0];
		    	    sheetObj.CellValue(rowCnt, 'b_number') 				= rtnValAry[1];
		    	    
		    	    sheetObj.CellValue(rowCnt, 'cntr_desc') 			= rtnValAry[15];
		    	    
		    	    sheetObj.CellValue(rowCnt, 'msg_no') 				= formObj.msg_no.value;
				}
			}
       break;
       case "UPLOAD":
    	   if(uploadChk()) {
	       		
    		    formObj.f_cmd.value = MODIFY;
    		 
    		    sheetObj3.RemoveAll();
    		    sheetObj3.DataInsert(-1);
    		    sheetObj3.CellValue(1, 'msg_no') =formObj.msg_no.value ;
    		    
    		    var sht1 = sheetObj.GetSaveString(false);
     		   
    		    var Result = sheetObj3.DoAllSave("EDI_DBS_0010_2GS.clt", FormQueryString(formObj)+'&'+sht1,true);
    		    if(Result){
    		    	formObj.msg_no.value = sheetObj3.CellValue(1, 'msg_no');
    		    	alert("Upload success! ");
    		    	doWork('SEARCHLIST');
    		    }
	       	}
       break;
       case "TRANSMIT":
    	   if(transmitChk()) {
    		    formObj.f_cmd.value = MODIFY01;
    		    
    		    sheetObj3.RemoveAll();
    		    sheetObj3.DataInsert(-1);
    		    sheetObj3.CellValue(1, 'msg_no') =formObj.msg_no.value ;
    		    
    		    var sht1 = sheetObj.GetSaveString(false);
     		   
    		    var Result = sheetObj3.DoAllSave("EDI_DBS_0010_2GS.clt", FormQueryString(formObj)+'&'+sht1,true);
    		    if(Result){
    		    	formObj.msg_no.value = sheetObj3.CellValue(1, 'msg_no');
    		    	alert("Transmit success! ");
    		    	doWork('SEARCHLIST');
    		    }
	       	}
       break;
	   case "CANCEL":
		   if(cancelChk()) {
			    formObj.f_cmd.value = MODIFY02;
			    
			    sheetObj3.RemoveAll();
			    sheetObj3.DataInsert(-1);
			    sheetObj3.CellValue(1, 'msg_no') =formObj.msg_no.value ;
			    
			    var sht1 = sheetObj.GetSaveString(false);
			   
			    var Result = sheetObj3.DoAllSave("EDI_DBS_0010_2GS.clt", FormQueryString(formObj)+'&'+sht1,true);
			    if(Result){
			    	formObj.msg_no.value = sheetObj3.CellValue(1, 'msg_no');
    		    	alert("Cancel success! ");
    		    	doWork('SEARCHLIST');
    		    }
		   }
		break;
//		case "AMENDMENT":
//			   if(amendmentChk()) {
//				    formObj.f_cmd.value = MODIFY01;
//				    
//				    sheetObj6.RemoveAll();
//	    			sheetObj6.DataInsert(-1);
//	    		    
//	    		    var sht1 = sheetObj.GetSaveString(false);
//	     		   
//	    		    sheetObj6.DoAllSave("EDI_DBS_0010GS.clt", FormQueryString(formObj)+'&'+sht1,true);
//		    	}
//			break;
	   case "DELETE":
		   if(deleteChk()) {
			    formObj.f_cmd.value = MODIFY03;
			    
			    sheetObj3.RemoveAll();
			    sheetObj3.DataInsert(-1);
			    sheetObj3.CellValue(1, 'msg_no') =formObj.msg_no.value ;
			    
			    var sht1 = sheetObj.GetSaveString(false);
			   
			    var Result = sheetObj3.DoAllSave("EDI_DBS_0010_2GS.clt", FormQueryString(formObj)+'&'+sht1,true);
			    if(Result){
			    	formObj.msg_no.value = sheetObj3.CellValue(1, 'msg_no');
    		    	alert("Delete success! ");
    		    	doWork('SEARCHLIST');
    		    }
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
		            style.height = 110;
		            
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
		            InitColumnInfo(18, 0, 0, true);
		
		            // 해더에서 처리할 수 있는 각종 기능을 설정한다
		            InitHeadMode(true, true, true, true, false,false) ;
		            
		            //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		            InitHeadRow(0, getLabel('EDI_DBA_0010_HDR1'), true);
		            
		            var cnt = 0;
		             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		             InitDataProperty(0, cnt++,  dtDelCheckEx,	 35,    daCenter,    true,    "",      	 				false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtHiddenStatus, 30,    daCenter,    true,    "cntr_ibflag",    		false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,   	     30,    daCenter,    true,    "goods_item_seq",    		false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,		 70,    daCenter,    true,    "cntr_no",      			false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtHidden,        0,  	daCenter,    true,    "cntr_list_seq",    		false,   "",       dfNone,          0,     false,     false);
		             InitDataProperty(0, cnt++,  dtCombo,    	 60,    daCenter,    true,    "cntr_tpsz_cd",    		false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,   		 50,    daRight,     true,    "goods_pkg",    			false,   "",       dfInteger,       0,     true,      true);
		             InitDataProperty(0, cnt++,  dtCombo,   	 80,    daCenter,    true,    "goods_pkg_type",    		false,   "",       dfNone,     	    0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,		 60,    daRight,     true,    "goods_gross_wgt",      	false,   "",       dfFloat,       	1,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,		 30,    daRight,     true,    "goods_gross_wgt_unit",   false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,		 60,    daRight,     true,    "goods_net_wgt",     		false,   "",       dfFloat,       	1,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,		 30,    daRight,     true,    "goods_net_wgt_unit",    	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,		 70,    daCenter,    true,    "goods_pos_no",      		false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,		 50,    daCenter,    true,    "goods_pkg_id",      		false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,         90,  	daCenter,    true,    "z_number",      			false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,         90,  	daCenter,    true,    "b_number",      			false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,        100,  	daCenter,    true,    "cntr_desc",     			false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtHidden,        0,  	daCenter,    true,    "msg_no",      			false,   "",       dfNone,          0,     false,     false);
	   
		             InitDataValid(0, 'cntr_no',  vtEngUpOther, "1234567890");
		             InitDataCombo(0,  'cntr_tpsz_cd', ' |'+EDI_TPCD1, ' |'+EDI_TPCD2);
		             InitDataCombo(0,  'goods_pkg_type', ' |'+EDI_PCKCD1, ' |'+EDI_PCKCD2);
		             
	    
	    } 
		break;
    
    	case 2:      //IBSheet1 init

            with (sheetObj) {
	        	 // 높이 설정
	             style.height = 150;
	             
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
	             InitHeadRow(0, getLabel('EDI_DBA_0010_HDR2'), true);
	             
	             var cnt = 0;
	             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
	             InitDataProperty(0, cnt++,  dtData,         40,  	daCenter,    true,    "seq",               false,   "",       dfNone,          0,     false,        false);
	             InitDataProperty(0, cnt++,  dtHidden,	      0,    daCenter,    true,    "msg_no",      	 false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,	    140,    daCenter,    true,    "send_dt",      	 false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,   	     80,    daCenter,    true,    "send_seq",    false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,		130,    daCenter,    true,    "rgst_usrid",      	 false,   "",       dfNone,          0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,        150,  	daCenter,    true,    "send_no",      false,   "",       dfNone,          0,     false,        false);
	             
	             //HeadRowHeight = 21;
	             
	             //InitViewFormat(0, "send_dt", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정

           }                                                      
         break;
           
         case 3:      //IBSheet2 init--사용안함

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
 	             InitColumnInfo(1, 0, 0, true);
 	
 	             // 해더에서 처리할 수 있는 각종 기능을 설정한다
 	             InitHeadMode(true, true, true, true, false,false) ;
 	             
 	             //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
 	             InitHeadRow(0, "MSG. NO", true);
 	             
 	             var cnt = 0;
 	             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
 	             InitDataProperty(0, cnt++,  dtData,         40,  	daCenter,    true,    "msg_no",               false,   "",       dfNone,          0,     false,        false);
        
         }      
         break;
         
         case 4:      //IBSheet2 init

	         with (sheetObj) {
		        	 // 높이 설정
		             style.height = 230;
		             
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
		             InitColumnInfo(12, 0, 0, true);
		
		             // 해더에서 처리할 수 있는 각종 기능을 설정한다
		             InitHeadMode(true, true, true, true, false,false) ;
		             
		             //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
	 	             InitHeadRow(0, getLabel('EDI_DBA_0010_HDR4'), true);

		             var cnt = 0;
		            
		             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		             InitDataProperty(0, cnt++,  dtData,         40,  	daCenter,    true,    "seq",               	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,        100,  	daCenter,    true,    "msg_no",      		false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,	    110,    daCenter,    true,    "msg_dt",      	 	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,	     50,    daCenter,    true,    "msg_sts",      	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,	    120,      daLeft,    true,    "msg_desc",      	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   	    110,    daCenter,    true,    "loading_stop_dt",    false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,	    120,    daCenter,    true,    "release_dt",      	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   	     50,    daCenter,    true,    "error_cd",    		false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,	    120,      daLeft,    true,    "error_note",      	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,	    220,      daLeft,    true,    "error_desc",      	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtHidden,        0,  	daCenter,    true,    "doc_no",      		false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtHidden,        0,  	daCenter,    true,    "rslt_seq",      		false,   "",       dfNone,          0,     false,      false);
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
		            InitHeadRow(0, "Del|Temp", true);
		             
		             var cnt = 0;
		             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		             InitDataProperty(0, cnt++,  dtDelCheckEx,	 40,    daCenter,    true,    "",      	 	false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,   	     40,    daCenter,    true,    "upload_temp",    		false,   "",       dfNone,          0,     true,      true);
	    } 
		break;
		         
     }
}

function setResult() {
	
	var formObj  = document.frm1;
	
	var trns_tp = document.getElementsByName("trns_tp");
	var cgo_tp = document.getElementsByName("cgo_tp");
	var f_msg_tp = document.getElementsByName("f_msg_tp");
//	
//	for(i=0; i<trns_tp.length; i++){
//		trns_tp[i].disabled = true;
//	}
//alert("[msg_no]["+formObj.msg_no.value + "]        [intg_bl_seq]["+formObj.intg_bl_seq.value + "]");
	/*
	if(formObj.msg_no.value != "" || formObj.intg_bl_seq.value != ""){
		var f_msg_tp = document.getElementsByName("f_msg_tp");
		var trns_tp = document.getElementsByName("trns_tp");
		
		if(formObj.trns_tp_val.value == "AES"){ //msg_tp = "M"
			trns_tp[0].checked = true;
			f_msg_tp[0].checked = true;
		
			trns_tp[1].checked = false;
			f_msg_tp[1].checked = false;
			
		}else{
			trns_tp[0].checked = false;			
			f_msg_tp[0].checked = false;
			
			trns_tp[1].checked = true;
			f_msg_tp[1].checked = true;
		}	
	}
	*/
	
	if(formObj.hbl_no.value != ""){ //msg_tp = "H"
		f_msg_tp[0].checked = false;
		f_msg_tp[1].checked = true;
	}else{
		f_msg_tp[0].checked = true;
		f_msg_tp[1].checked = false;
	}
	
	if(formObj.trns_tp_val.value == "AES"){
		trns_tp[0].checked = true;
		trns_tp[1].checked = false;
		trns_tp[2].checked = false;
		
	}else if(formObj.trns_tp_val.value == "SAC"){ 
		trns_tp[0].checked = false;			
		trns_tp[1].checked = true;
		trns_tp[2].checked = false;
		
	}else if(formObj.trns_tp_val.value == "SBF"){ 
		trns_tp[0].checked = false;			
		trns_tp[1].checked = false;
		trns_tp[2].checked = true;	
	}else{ 
		trns_tp[0].checked = true;
		trns_tp[1].checked = false;
		trns_tp[2].checked = false;
	}
	
	if(formObj.cgo_tp_val.value == "F"){
		cgo_tp[0].checked = true;
		cgo_tp[1].checked = false;
		
	}else if(formObj.cgo_tp_val.value == "L"){ 
		cgo_tp[0].checked = false;			
		cgo_tp[1].checked = true;
		
	}else{ 
		cgo_tp[0].checked = true;
		cgo_tp[1].checked = false;
	}

	//trns_tp 에 따른 화면 Set
	changeTransTpVal();
	changeCgoTpVal();
	
	if(formObj.msg_no.value != ""){
		
		doWork('SEARCHLIST01');
		doWork('SEARCHLIST02');
		//doWork('SEARCHLIST03');
		doWork('SEARCHLIST04');
		
	}else{
		if(formObj.intg_bl_seq.value != ""){
			doWork('SEARCHLIST01');
		}
	}
}	

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat, obj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
            var cal = new calendarPopup();
            cal.select(obj, obj.name, 'MM-dd-yyyy');
        break;
    }
}

function openPopUpEdi(srcName, curObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
	try {
		switch(srcName) {
		
			case "BL_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	        
				var f_msg_tp = document.getElementsByName("f_msg_tp");
				var str_poplist = "";
				
				if(f_msg_tp[0].checked == true){
					
					var rtnary = new Array(1);
					rtnary[0] = "S"; //S = 해운에서 오픈, A = 항공에서 오픈
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
			   		
			   		rtnary[0] = "S";
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
				
				BLSEARCHLIST();
				
		    break;
           
			case "REF_POPLIST"://openMean S = 해운에서 오픈, A = 항공에서 오픈
				var rtnary = new Array(1);
				rtnary[0] = "S";
				rtnary[1] = "O";
				
		    	var rtnVal = window.showModalDialog('./CMM_POP_0180.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
		    	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		    		return;
				}else{
					var rtnValAry = rtnVal.split("|");
					formObj.intg_bl_seq.value = rtnValAry[1];//intg_bl_seq
					formObj.f_ref_no.value = rtnValAry[2];					
					formObj.f_bl_no.value = "";
				}
		    	
		    	BLSEARCHLIST();
		    	
			break;
			
			case "EDI_LINER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
		   		var rtnary = new Array(2);
		   		rtnary[0] = "1";
		   		
		   		var curObjId = curObj.id;
		   		var cstmTpCd = '';
		   		
		   		if(curObjId=='agent'){
		   			rtnary[1] = formObj.agent_trdp_nm.value.toUpperCase();
		   		}else if(curObjId=='carrier'){
		   			rtnary[1] = formObj.carr_trdp_nm.value.toUpperCase();
		   		}else if(curObjId=='shipper'){
		   			rtnary[1] = formObj.shp_trdp_nm.value.toUpperCase();
		   		}else if(curObjId=='declarant'){
		   			rtnary[1] = formObj.decl_trdp_nm.value.toUpperCase();
		   		}

		   		rtnary[2] = window;
		   		
		   		var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px");
		        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				 	
				}else{
					var rtnValAry = rtnVal.split("|");
					if(curObjId == "agent"){
						if(rtnValAry[0]==''){
							//formObj.agent_trdp_cd.focus();
						}else{
							formObj.agent_trdp_cd.value = rtnValAry[0];//trdp_cd
							formObj.agent_trdp_nm.value = rtnValAry[10];//locl_nm
							formObj.agent_trdp_cnt.value = rtnValAry[12];//cnt
							formObj.agent_trdp_addr.value = rtnValAry[16];//agent_trdp_addr
							formObj.agent_trdp_pic.value = rtnValAry[3];//pic_nm
							formObj.agent_trdp_email.value = rtnValAry[6];//pic_eml
							formObj.agent_trdp_phn.value = rtnValAry[4];//agent_trdp_phn
							formObj.agent_trdp_fax.value = rtnValAry[5];//agent_trdp_fax
							s_type = "edi_agent_trdp_cd";
							CODETYPE =s_type;	
							//ajaxSendPost(trdpCdReqEdi,      'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+formObj.agent_trdp_cd.value, './GateServlet.gsl');
						}
						
					}else if(curObjId == "carrier"){
						if(rtnValAry[0]==''){
							//formObj.carr_trdp_cd.focus();
						}else{
							formObj.carr_trdp_cd.value = rtnValAry[0];//trdp_cd
							formObj.carr_trdp_nm.value = rtnValAry[10];//locl_nm
							formObj.carr_trdp_cnt.value = rtnValAry[12];//cnt
							formObj.carr_trdp_addr.value = rtnValAry[16];//carr_trdp_addr
							formObj.carr_trdp_pic.value = rtnValAry[3];//carr_pic_nm
							formObj.carr_trdp_email.value = rtnValAry[6];//carr_pic_eml
							formObj.carr_trdp_phn.value = rtnValAry[4];//carr_trdp_phn
							formObj.carr_trdp_fax.value = rtnValAry[5];//carr_trdp_fax
							s_type = "edi_carrier_trdp_cd";
							CODETYPE =s_type;	
							ajaxSendPost(trdpCdReqEdi,      'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+formObj.carr_trdp_cd.value, './GateServlet.gsl');
						}						
					}else if(curObjId == "shipper"){
						if(rtnValAry[0]==''){
							//formObj.shp_trdp_cd.focus();
						}else{
							formObj.shp_trdp_cd.value = rtnValAry[0];//trdp_cd
							formObj.shp_trdp_nm.value = rtnValAry[10];//locl_nm
							formObj.shp_trdp_cnt.value = rtnValAry[12];//cnt
							formObj.shp_trdp_addr.value = rtnValAry[16];//carr_trdp_addr
							formObj.shp_trdp_pic.value = rtnValAry[3];//carr_pic_nm
							formObj.shp_trdp_email.value = rtnValAry[6];//carr_pic_eml
							formObj.shp_trdp_phn.value = rtnValAry[4];//carr_trdp_phn
							formObj.shp_trdp_fax.value = rtnValAry[5];//carr_trdp_fax
						}						
					}else if(curObjId == "declarant"){
						if(rtnValAry[0]==''){
							//formObj.decl_trdp_cd.focus();
						}else{
							formObj.decl_trdp_cd.value = rtnValAry[0];//trdp_cd
							formObj.decl_trdp_nm.value = rtnValAry[10];//locl_nm
							formObj.decl_trdp_cnt.value = rtnValAry[12];//cnt
							formObj.decl_trdp_addr.value = rtnValAry[16];//carr_trdp_addr
							formObj.decl_trdp_pic.value = rtnValAry[3];//carr_pic_nm
							formObj.decl_trdp_email.value = rtnValAry[6];//carr_pic_eml
							formObj.decl_trdp_phn.value = rtnValAry[4];//carr_trdp_phn
							formObj.decl_trdp_fax.value = rtnValAry[5];//carr_trdp_fax
						}						
					}
				}
	       break;
	       
		   case "EDI_LOCATION_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
        		var rtnary = new Array(3);
		   		rtnary[0] = "S";
		   		rtnary[1] = "BL";
		   		
		   		var curObjId = curObj.id;
		   		var cstmTpCd = '';
		   		
		   		if(curObjId == "pol"){
		   			rtnary[2] = formObj.pol_nm.value.toUpperCase();
		   		}else if(curObjId == "pod"){
		   			rtnary[2] = formObj.pod_nm.value.toUpperCase();
		   		}
		   		
		   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
		   		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				 	
				}else{
					var curObjId = curObj.id;
					var rtnValAry = rtnVal.split("|");
					if(curObjId == "pol"){
						if(rtnValAry[0]==''){
							//formObj.pol_cd.focus();
							
						}else{
							formObj.origin_pol_cd.value = rtnValAry[0];//loc_cd 
							formObj.pol_nm.value  = rtnValAry[2];//loc_nm
							formObj.pol_cd.value = rtnValAry[6];//stn_no 
							
						}
						
					}else if(curObjId == "pod"){
						
						if(rtnValAry[0]==''){
							//formObj.pod_cd.focus();
							
						}else{
							formObj.origin_pod_cd.value = rtnValAry[0];//loc_cd
							formObj.pod_nm.value  = rtnValAry[2];//loc_nm
							formObj.pod_cd.value = rtnValAry[6];//stn_no 
						}
					}
				} 
        break;	       
    	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: EDI_DBS_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: EDI_DBS_0010.002");
        }
	}
}

function BLSEARCHLIST(){
	var formObj  = document.frm1;
	
	if(formObj.f_bl_no.value != ""){
		formObj.msg_no.value = "";
	}
	
	if(formObj.f_ref_no.value != ""){
		formObj.msg_no.value = "";
	}
	doWork('SEARCHLIST');
}

function uploadChk(){
	var chkVal = true;
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	/*
	 * 필수값 설정
	 */
	
	var intg_bl_seq = formObj.intg_bl_seq.value;
	var trns_tp = formObj.trns_tp_val.value;
	var cgo_tp  = formObj.cgo_tp_val.value;

//	if(intg_bl_seq ==""){
//		chkVal = false;
//		alert("Please,  Retrieve.");
//		return chkVal;
//	}
	
//	if(checkInputVal(formObj.mbl_no.value, 2, 16, "T", 'Master BL No.')!='O' && checkInputVal(formObj.hbl_no.value, 2, 16, "T", 'House BL No.')!='O'){
//		chkVal = false;
//		formObj.mbl_no.focus();
//		return chkVal;
//	}
	
	if(checkInputVal(formObj.ref_no.value, 1, 40, "T", 'Ref. No')!='O'){
		chkVal = false;
		formObj.ref_no.focus();
		return chkVal;
	}
	
	//ref_no 중복 체크
	chkRefNoDuplicate();
	
	var dpChkVal = formObj.refno_dp_flg.value;
	if(dpChkVal == "Y"){
		alert(getLabel('FMS_COM_ALT008'))
		chkVal = false;
		return chkVal;
	}
	
	
	if(checkInputVal(formObj.lnr_bkg_no.value, 1, 20, "T", 'Liner Booking No')!='O'){
		chkVal = false;
		formObj.lnr_bkg_no.focus();
		return chkVal;
	}
	
//	if(checkInputVal(formObj.abt_no.value, 1, 40, "T", 'ABT No.')!='O'){
//		chkVal = false;
//		formObj.abt_no.focus();
//		return chkVal;
//	}
	
//	if(checkInputVal(formObj.mrn.value, 1, 40, "T", 'MRN')!='O'){
//		chkVal = false;
//		formObj.mrn.focus();
//		return chkVal;
//	}

	if(formObj.mrn.value.length > 0 && formObj.mrn.value.length != 18){
		alert("MRN should be 18 characters.");
		chkVal = false;
		formObj.mrn.focus();	
		return chkVal;
	}
	
	if(formObj.exs_mrn_no.value.length > 0 && formObj.exs_mrn_no.value.length != 18){
		alert("[EXS MRN No] should be 18 characters.");
		chkVal = false;
		formObj.exs_mrn_no.focus();	
		return chkVal;
	}

	if(checkInputVal(formObj.pol_cd.value, 1, 5, "T", 'Pol Code')!='O'){
		chkVal = false;
		formObj.pol_cd.focus();	
		return chkVal;
	}
	
	if(checkInputVal(formObj.pol_nm.value, 1, 50, "T", 'Pol Name')!='O'){
		chkVal = false;
		formObj.pol_nm.focus();	
		return chkVal;
	}
	
	if(checkInputVal(formObj.pol_tml_cd.value, 1, 5, "T", 'Pol Terminal Code')!='O'){
		chkVal = false;
		formObj.pol_tml_cd.focus();	
		return chkVal;
	}
	
	if(checkInputVal(formObj.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){
		chkVal = false;
		formObj.etd_dt_tm.focus();	
		return chkVal;
	}
	
	if(checkInputVal(formObj.pod_cd.value, 1, 5, "T", 'Pod Code')!='O'){
		chkVal = false;
		formObj.pod_cd.focus();	
		return chkVal;
	}
	
	if(checkInputVal(formObj.pod_nm.value, 1, 50, "T", 'Pod Name')!='O'){
		chkVal = false;
		formObj.pod_nm.focus();	
		return chkVal;
	}
	
	if(checkInputVal(formObj.eta_dt_tm.value, 10, 10, "DD", 'ETA')!='O'){
		chkVal = false;
		formObj.eta_dt_tm.focus();	
		return chkVal;
	}
//	if(checkInputVal(formObj.agent_trdp_edi_cd.value, 1, 20, "T", 'Agent Code')!='O'){
//		chkVal = false;
//		formObj.agent_trdp_edi_cd.focus();
//		return chkVal;
//	}
	if(checkInputVal(formObj.agent_trdp_addr.value, 1, 400, "T", 'Agent Address')!='O'){
		chkVal = false;
		formObj.agent_trdp_addr.focus();
		return chkVal;
	}	
	if(checkInputVal(formObj.agent_trdp_pic.value, 1, 40, "T", 'Agent PIC')!='O'){
		chkVal = false;
		formObj.agent_trdp_pic.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.agent_trdp_email.value, 1, 50, "T", 'Agent eMail')!='O'){
		chkVal = false;
		formObj.agent_trdp_email.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.agent_trdp_phn.value, 1, 30, "T", 'Agent Tel')!='O'){
		chkVal = false;
		formObj.agent_trdp_phn.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.agent_trdp_fax.value, 1, 30, "T", 'Agent Fax')!='O'){
		chkVal = false;
		formObj.agent_trdp_fax.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.carr_trdp_edi_cd.value, 1, 20, "T", 'Carrier Code')!='O'){
		chkVal = false;
		formObj.carr_trdp_edi_cd.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.carr_trdp_addr.value, 1, 400, "T", 'Carrier Address')!='O'){
		chkVal = false;
		formObj.carr_trdp_addr.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.carr_trdp_pic.value, 1, 40, "T", 'Carrier PIC')!='O'){
		chkVal = false;
		formObj.carr_trdp_pic.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.carr_trdp_email.value, 1, 50, "T", 'Carrier eMail')!='O'){
		chkVal = false;
		formObj.carr_trdp_email.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.carr_trdp_phn.value, 1, 30, "T", 'Carrier Tel')!='O'){
		chkVal = false;
		formObj.carr_trdp_phn.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.carr_trdp_fax.value, 1, 30, "T", 'Carrier Fax')!='O'){
		chkVal = false;
		formObj.carr_trdp_fax.focus();
		return chkVal;
	}
	
	if(trns_tp == "SBF"){
		if(checkInputVal(formObj.shp_trdp_nm.value, 1, 50, "T", 'Shipper Name')!='O'){
			chkVal = false;
			formObj.shp_trdp_nm.focus();
			return chkVal;
		}
		if(checkInputVal(formObj.shp_trdp_addr.value, 1, 400, "T", 'Shipper Address')!='O'){
			chkVal = false;
			formObj.shp_trdp_addr.focus();
			return chkVal;
		}
		if(checkInputVal(formObj.shp_trdp_pic.value, 1, 40, "T", 'Shipper PIC')!='O'){
			chkVal = false;
			formObj.shp_trdp_pic.focus();
			return chkVal;
		}
		if(checkInputVal(formObj.shp_trdp_email.value, 1, 50, "T", 'Shipper eMail')!='O'){
			chkVal = false;
			formObj.shp_trdp_email.focus();
			return chkVal;
		}
		if(checkInputVal(formObj.shp_trdp_phn.value, 1, 30, "T", 'Shipper Tel')!='O'){
			chkVal = false;
			formObj.shp_trdp_phn.focus();
			return chkVal;
		}
		if(checkInputVal(formObj.shp_trdp_fax.value, 1, 30, "T", 'Shipper Fax')!='O'){
			chkVal = false;
			formObj.shp_trdp_fax.focus();
			return chkVal;
		}
		
		if(checkInputVal(formObj.decl_trdp_nm.value, 1, 50, "T", 'Declarant Name')!='O'){
			chkVal = false;
			formObj.decl_trdp_nm.focus();
			return chkVal;
		}
		if(checkInputVal(formObj.decl_trdp_addr.value, 1, 400, "T", 'Declarant Address')!='O'){
			chkVal = false;
			formObj.decl_trdp_addr.focus();
			return chkVal;
		}
		if(checkInputVal(formObj.decl_trdp_pic.value, 1, 40, "T", 'Declarant PIC')!='O'){
			chkVal = false;
			formObj.decl_trdp_pic.focus();
			return chkVal;
		}
		if(checkInputVal(formObj.decl_trdp_email.value, 1, 50, "T", 'Declarant eMail')!='O'){
			chkVal = false;
			formObj.decl_trdp_email.focus();
			return chkVal;
		}
		if(checkInputVal(formObj.decl_trdp_phn.value, 1, 30, "T", 'Declarant Tel')!='O'){
			chkVal = false;
			formObj.decl_trdp_phn.focus();
			return chkVal;
		}
		if(checkInputVal(formObj.decl_trdp_fax.value, 1, 30, "T", 'Declarant Fax')!='O'){
			chkVal = false;
			formObj.decl_trdp_fax.focus();
			return chkVal;
		}
	}
	
	var sumPackage = 0;
	var sumGWeight = 0;
	var sumNWeight = 0;
	
	var m_cntr_no = formObj.m_cntr_no.value;
	var m_cntr_tpsz_cd = formObj.m_cntr_tpsz_cd.value;
	
	if(sheetObj.RowCount > 0){
		for(var i=1; i<=sheetObj.LastRow;i++){
			
			sheetObj.CellValue(i,"cntr_ibflag") = "U";
			
			//total Package, G.weight, N.weight 0 보다 커야 한다. 
			sumPackage = sumPackage + Number(sheetObj.CellValue(i, "goods_pkg"));
			sumGWeight = sumGWeight + Number(sheetObj.CellValue(i, "goods_gross_wgt"));
			sumNWeight = sumNWeight + Number(sheetObj.CellValue(i, "goods_net_wgt"));

			if(trns_tp == "SAC"){
				if(checkInputVal(m_cntr_no, 1, 30, "T", 'Cntr no')!='O'){
					chkVal = false;
					return chkVal;
				}
				
				if(checkInputVal(m_cntr_tpsz_cd, 1, 30, "T", 'Cntr Type/Size')!='O'){
					chkVal = false;
					return chkVal;
				}
				
				if(sheetObj.CellValue(i, "z_number") == "" && sheetObj.CellValue(i, "b_number") == ""){
					alert("please input the Z-Number or B-Number");
					chkVal = false;
					return chkVal;
				}
				
//				if(checkInputVal(sheetObj.CellValue(i, "z_number"), 1, 20, "T", 'Z-Number')!='O'){
//					chkVal = false;
//					return chkVal;
//				}
//				
//				if(checkInputVal(sheetObj.CellValue(i, "b_number"), 1, 20, "T", 'B-Number')!='O'){
//					chkVal = false;
//					return chkVal;
//				}
			}else{
				if(cgo_tp == "F"){		// AES, SBF 이고 FCL 일 경우 Mandatory check
					if(checkInputVal(sheetObj.CellValue(i, "cntr_no"), 1, 30, "T", 'Cntr no')!='O'){
						chkVal = false;
						return chkVal;
					}
					
					if(checkInputVal(sheetObj.CellValue(i, "cntr_tpsz_cd"), 1, 30, "T", 'Cntr Type/Size')!='O'){
						chkVal = false;
						return chkVal;
					}
				}
			}
			
			if(checkInputVal(sheetObj.CellValue(i, "goods_pkg"), 1, 7, "N", 'Package')!='O'){
				chkVal = false;
				return chkVal;
			}
			if(checkInputVal(sheetObj.CellValue(i, "goods_gross_wgt"), 1, 8, "N", 'G.Weight')!='O'){
				chkVal = false;
				return chkVal;
			}
			if(checkInputVal(sheetObj.CellValue(i, "goods_net_wgt"), 1, 8, "N", 'N.Weight')!='O'){
				chkVal = false;
				return chkVal;
			}
//			if(sheetObj.CellValue(i, "goods_pkg") <= 0){
//				alert("please enter a value greater than zero in the Package");
//				chkVal = false;
//				return chkVal;
//			}
//			if(sheetObj.CellValue(i, "goods_gross_wgt") <= 0){
//				alert("please enter a value greater than zero in the G.Weight");
//				chkVal = false;
//				return chkVal;
//			}
//			if(sheetObj.CellValue(i, "goods_net_wgt") <= 0){
//				alert("please enter a value greater than zero in the N.Weight");
//				chkVal = false;
//				return chkVal;
//			}
			if(checkInputVal(sheetObj.CellValue(i, "cntr_desc"), 1, 250, "T", 'Cntr Desc.')!='O'){
				chkVal = false;
				return chkVal;
			}
		}
		
		if(sumPackage == 0){
			alert("please enter a value greater than zero in the Package.");
			chkVal = false;
			return chkVal;
		}
		if(sumGWeight == 0){
			alert("please enter a value greater than zero in the G.Weight.");
			chkVal = false;
			return chkVal;
		}
		if(sumNWeight == 0){
			alert("please enter a value greater than zero in the N.Weight.");
			chkVal = false;
			return chkVal;
		}
		
		var gWeight = 0;
		var addCntrVal = 0;
		
		if(trns_tp == "SAC"){
			//WEIGHT 의 값이 0 이나 null 인 경우, 저장 시 리스트의 N.WEIGHT + CNTR 무게
			if(Number(formObj.grs_wgt.value) == 0){
				
				//Type/Size Code 의 앞 두자리가  
				//20인 경우(ex. 20DR) G.Weight = N.Weight + 2000, 아닌 경우 G.Weight (ex.40DR) = N.Weight + 4000
				if(m_cntr_tpsz_cd.substring(0,2) == "20"){
					addCntrVal = 2000;
				}else{
					addCntrVal = 4000;
				}
				//화면의 WEIGHT 의 값이 0 이나 null 인 경우, 저장 시 리스트의 N.WEIGHT + CNTR 무게
				//CNTR 무게 계산:
				gWeight = sumNWeight + addCntrVal;
				formObj.grs_wgt.value = doMoneyFmt(roundXL(gWeight,2));
			}	
		}else{
			//화면의  WEIGHT 의 값이 0 이나 null 인 경우, 저장 시 리스트의 G.WEIGHT 
			if(Number(formObj.grs_wgt.value) == 0){
				gWeight = sumGWeight;
				formObj.grs_wgt.value = doMoneyFmt(roundXL(gWeight,2));
			}
		}
		
	}else{
		//alert('Please input the Goods Information');
		alert(getLabel('FMS_COM_ALT006') + "\n\n: EDI_DBS_0010.1265");
		chkVal = false;
		return chkVal;
	}
	
	return chkVal;
}

function sheet1_OnChange(sheetObj,Row,Col){	
	
	var formObj  = document.frm1;
	
	switch (sheetObj.ColSaveName(Col)) {
	    case "goods_net_wgt" :

	    	var GWeight = Number(sheetObj.CellValue(Row, "goods_gross_wgt"));
	    	var NWeight = Number(sheetObj.CellValue(Row, "goods_net_wgt"));
	    	var addCntrVal = 0;
	    	var cntr_tpsz_cd = sheetObj.CellValue(Row, "cntr_tpsz_cd");
	    	
	    	if(cntr_tpsz_cd == ""){
	    		addCntrVal = 0;
	    	}else{
	    		if(cntr_tpsz_cd.substring(0,2) == "20"){
					addCntrVal = 2000;
				}else{
					addCntrVal = 4000;
				}
	    	}
	    	
	    	if(formObj.trns_tp_val.value != "SAC" && GWeight == 0){
	    		sheetObj.CellValue(Row, "goods_gross_wgt") = NWeight + addCntrVal;
	    	}
	    break;
	}
	
}
		
function transmitChk(){
	
	var chkVal = true;
	var formObj  = document.frm1;
	
	if(formObj.msg_sts.value == "N/A"){
		chkVal = false;
		alert("After upload you can transmit.");
	}
	
	
	
	if(chkVal){
		chkVal = uploadChk();
	}
	
	return chkVal;
}

function cancelChk(){
	
	var chkVal = true;
	var formObj  = document.frm1;
	
	if(formObj.msg_sts.value != "Transmit"){
		chkVal = false;
		alert("After transmit you can Cancel.");
	}
	if(chkVal){
		chkVal = uploadChk();
	}
	
	return chkVal;
}
//
//
//function amendmentChk(){
//	
//	var chkVal = true;
//	var formObj  = document.frm1;
//	
//	if(formObj.msg_sts.value == "N/A"){
//		chkVal = false;
//		alert("After upload you can transmit.");
//	}
//	
//	if(formObj.msg_sts.value != "Cancel"){
//		chkVal = false;
//		alert("After Cancel you can amendment.");
//	}
//	
//	if(chkVal){
//		chkVal = uploadChk();
//	}
//	
//	return chkVal;
//}
function deleteChk(){
	
	var chkVal = true;
	var formObj  = document.frm1;
	
	if(formObj.msg_sts.value == "N/A" || formObj.msg_sts.value == "Upload"){
		chkVal = false;
		alert("Can't Delete.");
	}
//	if(chkVal){
//		chkVal = uploadChk();
//	}
	
	return chkVal;
}

function sheet3_OnSaveEnd(sheetObj, errMsg){
	
//	alert(errMsg);
//	if(errMsg ==""){
//		alert("success! ");
//	}else{
//		alert("Fail! ");
//	}
//	doWork('SEARCHLIST');
}

function sheet1_OnSearchEnd(){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(sheetObj.RowCount > 0){
		formObj.m_cntr_no.value = sheetObj.CellValue(1,"cntr_no");
		formObj.m_cntr_tpsz_cd.value = sheetObj.CellValue(1,"cntr_tpsz_cd");
	}	
}

/**
* code name select
*/
function codeNameActionEdi(str, obj, tmp){

	var s_code = obj.value.toUpperCase();		
	var s_type = "";

//	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE =str;		
				var sub_str = str.substring(0,8);

				if(sub_str=="Location"){
					s_type = sub_str;
//					ajaxSendPost(locationCdReqEdi, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');

				}else if(sub_str=="trdpCode"){
					s_type = sub_str;
//					ajaxSendPost(trdpCdReqEdi,      'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');

				}
				
			}
		} else if ( tmp == "onBlur" ) {
//			if ( s_code != "" ) {
				CODETYPE =str;		
				var sub_str = str.substring(0,8);
				
				if(sub_str=="Location"){
					s_type = sub_str;
//					ajaxSendPost(locationCdReqEdi,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
					
				}else if(sub_str=="trdpCode"){
					s_type = sub_str;
//					ajaxSendPost(trdpCdReqEdi,      'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');

				}
//			}
		}
//	}
}


/**
* Location Code 처리
*/
function locationCdReqEdi(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');	
			
			if(CODETYPE == "Location_pol"){
				if(masterVals[0]==''){
					//formObj.pol_cd.focus();
				}else{
					formObj.pol_cd.value    = masterVals[0];//loc_cd
					//formObj.pol_nod_cd.value= masterVals[1];//nod_cd
					//formObj.pol_nm.value    = masterVals[3]+', '+masterVals[4];//loc_nm
					formObj.pol_nm.value    = masterVals[3];//loc_nm
					
					if(typeof(formObj.pol_cnt_cd) != "undefined"){
						formObj.pol_cnt_cd.value = masterVals[2];
					}
				}
			}else if(CODETYPE == "Location_pod"){
				if(masterVals[0]==''){
					//formObj.pod_cd.focus();
				}else{
					formObj.pod_cd.value    = masterVals[0];//loc_cd 
					//formObj.pod_nod_cd.value= masterVals[1];//nod_cd
					//formObj.pod_nm.value    = masterVals[3]+', '+masterVals[4];//loc_nm
					formObj.pod_nm.value    = masterVals[3];//loc_nm
				}
			}
			
		}else{
			if(CODETYPE == "Location_pol"){
				formObj.pol_cd.value     = "";//loc_cd
				//formObj.pol_nod_cd.value = "";//nod_cd
				formObj.pol_nm.value     = "";//loc_nm
				//formObj.pol_cd.focus();
				
			}else if(CODETYPE == "Location_pod"){
				formObj.pod_cd.value     = "";//loc_cd
				//formObj.pod_nod_cd.value = "";//nod_cd
				formObj.pod_nm.value     = "";//loc_nm
				//formObj.pod_cd.focus();
				
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

/**
* Trade Partner 관린 코드조회
*/
function trdpCdReqEdi(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	if(doc[0]=='OK'){

		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			if(CODETYPE =="trdpCode_agent"){
				formObj.agent_trdp_cd.value = masterVals[0];//trdp_cd  AS param1
				formObj.agent_trdp_nm.value = masterVals[3];//eng_nm   AS param2
				formObj.agent_trdp_addr.value = masterVals[1];//eng_addr
				
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('FMS_COM_ALT006') + "\n\n: EDI_DBS_0010.1520");
				}
				
			}else if(CODETYPE =="trdpCode_consignee"){
				formObj.cnee_trdp_cd.value = masterVals[0];	//trdp_cd  AS param1
				formObj.cnee_trdp_nm.value = masterVals[3];		//eng_nm   AS param2
				formObj.cnee_trdp_addr.value = masterVals[1];		//eng_addr  AS param5 
				
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('FMS_COM_ALT006') + "\n\n: EDI_DBS_0010.1530");
				}
			}else if(CODETYPE =="edi_agent_trdp_cd"){
				formObj.agent_trdp_edi_cd.value = masterVals[1];//trdp_cd  AS param1
				
			}else if(CODETYPE =="edi_carrier_trdp_cd"){
				formObj.carr_trdp_edi_cd.value = masterVals[1];	//trdp_cd  AS param1
			}
			
		}else{
			if(CODETYPE =="trdpCode_agent"){
				formObj.agent_trdp_cd.value = '';//trdp_cd  AS param1
				formObj.agent_trdp_nm.value = '';//eng_nm   AS param2
				formObj.agent_trdp_addr.value = '';//eng_addr
				
			}else if(CODETYPE =="trdpCode_consignee"){
				formObj.cnee_trdp_cd.value = "";//trdp_cd  AS param1
				formObj.cnee_trdp_nm.value = "";//eng_nm   AS param2
				formObj.cnee_trdp_addr.value = "";//eng_addr  AS param5
				
			}else if(CODETYPE =="edi_agent_trdp_cd"){
				formObj.agent_trdp_edi_cd.value = masterVals[1];//trdp_cd  AS param1
				
			}else if(CODETYPE =="edi_carrier_trdp_cd"){
				formObj.carr_trdp_edi_cd.value = masterVals[1];	//trdp_cd  AS param1
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function changeTransTpVal(){

	//AES 인 경우에만 Mandatory, Type 이 AES 가 아닌 경우, MRN 비우고 Disable
	//SAC 인 경우에만 ZBNumber 버튼 활성화, cntr_no mandatory
	
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	var trns_tp 	= document.getElementsByName("trns_tp");
	
	if(trns_tp[0].checked  == true){
		formObj.trns_tp_val.value = "AES"
		document.all.btnLayer.style.display = 'none';
		document.all.cargoLayer.style.display = 'inline';
		document.all.cntrLayer.style.display = 'none';
//		document.getElementById("tdCntrNo").className = 'table_search_head'
//		document.getElementById("tdTpsz").className = 'table_search_head'
		
		sheetObj.ColHidden("cntr_no") = false;
		sheetObj.ColHidden("cntr_tpsz_cd") = false;
		
		document.all.shpLayer.style.display = 'none';
		document.all.declLayer.style.display = 'none';
//		formObj.mrn.className = 'search_form';
//		formObj.mrn.readOnly  = false;
	}
	if(trns_tp[1].checked  == true){
		formObj.trns_tp_val.value = "SAC"
		document.all.btnLayer.style.display = 'inline';
		document.all.cargoLayer.style.display = 'none';
		document.all.cntrLayer.style.display = 'inline';
//		document.getElementById("tdCntrNo").className = 'table_search_head_r'
//		document.getElementById("tdTpsz").className = 'table_search_head_r'
		
		sheetObj.ColHidden("cntr_no") = true;
		sheetObj.ColHidden("cntr_tpsz_cd") = true;
		
		document.all.shpLayer.style.display = 'none';
		document.all.declLayer.style.display = 'none';
//		formObj.mrn.value 	  = "";
//		formObj.mrn.className = 'search_form-disable';
//		formObj.mrn.readOnly  = true;
	}
	
	if(trns_tp[2].checked  == true){
		formObj.trns_tp_val.value = "SBF"
		document.all.btnLayer.style.display = 'none';
		document.all.cargoLayer.style.display = 'inline';
		document.all.cntrLayer.style.display = 'none';
//		document.getElementById("tdCntrNo").className = 'table_search_head'
//		document.getElementById("tdTpsz").className = 'table_search_head'
		
		sheetObj.ColHidden("cntr_no") = false;
		sheetObj.ColHidden("cntr_tpsz_cd") = false;
		
		document.all.shpLayer.style.display = 'inline';
		document.all.declLayer.style.display = 'inline';
//		formObj.mrn.value 	  = "";
//		formObj.mrn.className = 'search_form-disable';
//		formObj.mrn.readOnly  = true;
	}
	
}

function changeCgoTpVal(){

	//AES 인 경우에만 Mandatory, Type 이 AES 가 아닌 경우, MRN 비우고 Disable
	//SAC 인 경우에만 ZBNumber 버튼 활성화, cntr_no mandatory
	
	var formObj  = document.frm1;
	var cgo_tp 	= document.getElementsByName("cgo_tp");
	
	if(cgo_tp[0].checked  == true){
		formObj.cgo_tp_val.value = "F"
	}
	if(cgo_tp[1].checked  == true){
		formObj.cgo_tp_val.value = "L"
	}
}

function setHblSizeUp(){
	var sheetObj = docObjects[0];
	sheetObj.style.height = '200px';						//height
}

function setHblSizeDown(){
	var sheetObj = docObjects[0];
	sheetObj.style.height = '110px';						//height
}

function chkRefNoDuplicate(){
	
	var formObj  = document.frm1;
	
	var reqParam = '&msg_no=' + formObj.msg_no.value;
	reqParam += '&ref_no=' + formObj.ref_no.value; 

	ajaxSendPost(chkEdiRefNoDpAjaxReq, 'reqVal', '&goWhere=aj&bcKey=chkEdiRefNoDp'+reqParam, './GateServlet.gsl');
}


function chkEdiRefNoDpAjaxReq(reqVal){
	
	var sheetObj  = docObjects[0];
	var formObj  = document.frm1;	 
    var doc = getAjaxMsgXML(reqVal);
    
    var targetFr= 'mainFrame';
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('@@^');	
				
			formObj.refno_dp_flg.value = rtnArr[0]; // 'Y' -- 중복
//			alert(formObj.refno_dp_flg.value);
//			if(formObj.refno_dp_flg.value == "Y"){
//				alert("Please check Ref No.");
//			}
			
		}else{
			alert(getLabel('Fail'));
		}
	}else{
		alert(getLabel('Fail'));	
	}
}