var rtnary = new Array(1);
function doWork(srcName){
	if(!btnVisible(srcName)){
		return;
	}
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var formObj  = document.frm1;

	switch(srcName) {

		case "SEARCHLIST":

			//sheetObj.ShowDebugMsg = true;
			formObj.f_cmd.value = SEARCHLIST;
			
			sheetObj.DoSearch4Post("SAL_TFM_0010GS.clt", FormQueryString(formObj));
				
			docObjects[1].RemoveAll();
			getObj('rowAdd').style.display = 'none';
			getObj('rowAdd2').style.display = 'none';
			//rowAdd3.style.display = 'none';
		break;
		case "SEARCHLIST01":

			//sheetObj.ShowDebugMsg = true;
			formObj.f_cmd.value = SEARCHLIST01;
				sheetObj1.DoSearch4Post("SAL_TFM_0010_1GS.clt", FormQueryString(formObj));
			//sheetObj.ShowDebugMsg = false;
		break;
		case "NEW":
	    	
	        displayClear();
	   	   
	    break;
		case "ROWADD":
			
			// insert 하려는 Master 정보는 하나여야 한다.
			for(var i=2 ; i<sheetObj.rows ; i++){
				if(sheetObj.CellValue(i, "ibflag")=="I"){
					return;
				}
			}
			
			var iRows = sheetObj.Rows;
			var Row = sheetObj.DataInsert(++iRows);
			
			// hid tariff 해제
			formObj.hid_trf_ctrt_no.value = "";
			// detail sheet clear
			sheetObj1.RemoveAll();
			
			if((sheetObj.RowCount)>1){ // no를 설정한다.
				sheetObj.CellValue2(Row, "no") = parseInt(sheetObj.CellValue(sheetObj.LastRow-1, "no"))+1;
				
			}else{
				sheetObj.CellValue2(Row, "no") = 1;
			
			}
			// default 로  office curr을 넣어준다. 
			sheetObj.CellValue2(Row, "trf_curr_cd") = formObj.ofc_curr_cd.value;
			
			getObj('rowAdd').style.display = 'none';
			getObj('rowAdd2').style.display = 'none';
			//rowAdd3.style.display = 'block';

			
		break;
		case "ROWADD2":
			if(sheetObj.CellValue(sheetObj.SelectRows, 'trf_ctrt_no')==''){
				
			}else{
				var iRows = sheetObj1.Rows;
				var Row = sheetObj1.DataInsert(++iRows);
				
				sheetObj1.CellValue2(Row, "trf_ctrt_no") = formObj.hid_trf_ctrt_no.value;
				if((sheetObj1.RowCount)>1){ // seq를 설정한다.
					
					sheetObj1.CellValue2(Row, "trf_dtl_seq") = parseInt(sheetObj1.CellValue(sheetObj1.LastRow-1, "trf_dtl_seq"))+1;
				}else{
					
					sheetObj1.CellValue2(Row, "trf_dtl_seq") = 1;
					
				}
			}
		break;
		case "MODIFYHEADER":
			formObj.f_cmd.value = MODIFY;
			// grid value validation

			if ( !fncGridCheck() ) return;

			if(confirm(getLabel('SAL_COM_ALT004'))){
				sheetObj.DoSave("SAL_TFM_0010GS.clt", FormQueryString(formObj),"ibflag",false);
//				sheetObj.DoAllSave("SAL_TFM_0010GS.clt", FormQueryString(formObj)+'&'+sht1,false);
			}
		break;
		case "MODIFYALL":
			
			formObj.f_cmd.value = MODIFY;
				
			//저장할 QueryString이 정확하지 않은 경우 다음 처리 하지 않음
			var sht1	= sheetObj1.GetSaveString(false);
			if (sht1 == "") return false;			
			var sht		= sheetObj.GetSaveString(false);
			if (sht == ""&&sht1 == "") return false;

			// grid value validation
			if ( !fncGridCheck1() ) return false;
			if(confirm(getLabel('SAL_COM_ALT004'))){
				sheetObj1.DoSave("SAL_TFM_0010GS.clt", FormQueryString(formObj),"dtl_ibflag",false);
//				sheetObj.DoAllSave("SAL_TFM_0010GS.clt", FormQueryString(formObj)+'&'+sht1,false);
			}
			// 저장 후 detail조회.
//			doWork('SEARCHLIST01');
		break;
		case "POL_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			
			rtnary = new Array(1);
			rtnary[0] = "SEA";
			rtnary[1] = "BL";
			
			// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2] = valObj;
	   		}else{
	   			rtnary[2] = "";
	   		}
			
			var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				
				formObj.pol_cd.value = rtnValAry[0];//loc_cd 
//				formObj.pol_nm.value	= rtnValAry[2];//loc_nm
				
			} 
		break;
		case "POD_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			
			rtnary = new Array(1);
			rtnary[0] = "SEA";
			rtnary[1] = "BL";
			
			// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2] = valObj;
	   		}else{
	   			rtnary[2] = "";
	   		}
	   		
			var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				return;
				
			}else{
				var rtnValAry = rtnVal.split("|");
				
				formObj.pod_cd.value = rtnValAry[0];//loc_cd 
//				formObj.pol_nm.value	= rtnValAry[2];//loc_nm
				
			} 
			break;
		case "CUSTOMER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			
			// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[1] = valObj;
	   		}else{
	   			rtnary[1] = "";
	   		}
				
	   		rtnary[2] = window;
	   		
			var cstmTpCd = 'CS';
			var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				formObj.trdp_cd.value = rtnValAry[0]; 
				formObj.trdp_nm.value  = rtnValAry[2];//loc_nm
			}
		break;
		case "PRINT":
			var param = '';
			var chkRow = sheetObj.FindCheckedRow("chk");
			
			if(chkRow !=""){
	       		var arrRow = chkRow.split("|");
	       		var cnt = arrRow.length - 2;
	       		
	       		formObj.s_trdp_cd.value = sheetObj.CellValue(arrRow[0], "trdp_cd");
	       		formObj.s_trdp_nm.value = sheetObj.CellValue(arrRow[0], "trdp_nm");
	       		if(cnt==0){
	       			formObj.quotation_no.value = sheetObj.CellValue(arrRow[0], "trf_ctrt_no");
	       		}else{
	       			formObj.quotation_no.value = sheetObj.CellValue(arrRow[0], "trf_ctrt_no") + ' 외 ' + cnt;
	       		}
	       		
	       		var value = '';
	       		for(var i=0;i<arrRow.length-1;i++){
	       			value += '\'' + sheetObj.CellValue(arrRow[i], "trf_ctrt_no") + '\'';
	       			if(arrRow.length!=i+2){
	       				value += ',';
	       			}
	       		}
	       		formObj.tariff_no.value = value;
	       		
	       		popPOST(formObj, 'RPT_PRN_0060.clt', 'popWin', 410, 470);
	       	}else{
	       		//alert("견적서를 보낼 Customer를 선택하여야 합니다.");
	       		alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_CUST') + "\n\n: SAL_TFM_0010.213");
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
//    if(frm1.sell_buy_cd.value=="S"){
//    	frm1.radio4.checked = true;
//    	doWork('SEARCHLIST');
//    	var trf_ctrt_no = docObjects[0].CellValue(2, "trf_ctrt_no");
//		// hid form에 값을 가지고 있는다.
//    	frm1.hid_trf_ctrt_no.value = trf_ctrt_no;
//    	doWork('SEARCHLIST01');
//    }
//    if(frm1.sell_buy_cd.value=="B"){
//    	frm1.radio5.checked = true;
//    	doWork('SEARCHLIST');
//    	var trf_ctrt_no = docObjects[0].CellValue(2, "trf_ctrt_no");
//		// hid form에 값을 가지고 있는다.
//    	frm1.hid_trf_ctrt_no.value = trf_ctrt_no;
//    	doWork('SEARCHLIST01');
//    }
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
                InitRowInfo( 2, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(18, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(false, true, false, true, false,false) ;
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('SAL_TFM_0010_HDR1_1'), true);
                InitHeadRow(1, getLabel('SAL_TFM_0010_HDR1_2'), true);
                
                var cnt = 0;
                
                //데이터속성    [ROW,   COL,   DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0,cnt++,  dtDelCheck,		30,    daCenter,	true,	"chk",			false,		"",       dfNone,      0,     true,      true);
                InitDataProperty(0,cnt++,  dtData,   		110,    daCenter,  true,	"trf_ctrt_no", 	false,		"",       dfNone,      0,     false,     false,		15);
				InitDataProperty(0,cnt++,  dtPopupEdit,      50,    daLeft,    true,	"trdp_cd",		false,		"",       dfNone,      0,     true,     true,		10);
				InitDataProperty(0,cnt++,  dtData,		    100,    daLeft,    true,	"trdp_nm",		false,		"",       dfNone,      0,     true,     true,		10);
				InitDataProperty(0,cnt++,  dtData,		    100,    daLeft,    true,	"trdp_clnt_nm", false,		"",       dfNone,      0,     true,      true,		100);
				
				InitDataProperty(0,cnt++,  dtCombo,		    100,    daLeft,    true,	"trdp_tp_cd", 	false,		"",       dfNone,      0,     true,      true,		6);
				
				InitDataProperty(0,cnt++,  dtCombo,		     70,    daLeft,    true,	"sell_buy_tp_cd",false,		"",       dfNone,      0,     true,      true,		6);
				
				InitDataProperty(0,cnt++,  dtCombo,          50,    daLeft,    true,	"bnd_clss_cd", 	false,		"",       dfNone,      0,     true,      true,		6);
				
				InitDataProperty(0,cnt++,  dtPopupEdit,	     60,    daLeft,    true,	"pol_cd", 		false,		"",       dfNone,	   0,     true,      true,		5);
				InitDataProperty(0,cnt++,  dtData,			 70,    daLeft,    true,	"pol_nm", 		false,		"",       dfNone,	   0,     true,     true,		100);
				InitDataProperty(0,cnt++,  dtPopupEdit,	     60,    daLeft,    true,	"pod_cd", 		false,		"",       dfNone,      0,     true,      true,		5);
				InitDataProperty(0,cnt++,  dtData,			 70,    daLeft,    true,	"pod_nm", 		false,		"",       dfNone,      0,     true,     true,		100);
				InitDataProperty(0,cnt++,  dtPopupEdit,	     60,    daLeft,    true,	"dest_del_cd",	false,		"",       dfNone,	   0,	  true,      true,		5);
				InitDataProperty(0,cnt++,  dtData,			 70,    daLeft,    true,	"dest_del_nm",	false,		"",       dfNone,	   0,	  true,     true,		100);
			
				InitDataProperty(0,cnt++,  dtPopupEdit,	     90,    daCenter,  true,	"trf_term_fm_dt",false,		"",       dfDateYmd,   0,     true,      true,		10);
				InitDataProperty(0,cnt++,  dtPopupEdit,	     90,    daCenter,  true,	"trf_term_to_dt",false,		"",       dfDateYmd,   0,     true,      true,		10);
				
				InitDataProperty(0,cnt++,  dtHidden,         50,    daLeft,    true,	"delt_flg", 	false,		"",       dfNone,      0,     true,      true,		1);
				InitDataProperty(0,cnt++,  dtHiddenStatus,   40,    daCenter,  true,	"ibflag");

				HeadRowHeight = 21;
				
				InitDataCombo (0, "trdp_tp_cd", PARAM4_1, PARAM4_2);
				InitDataCombo (0, "sell_buy_tp_cd", PARAM2_1, PARAM2_2);	//com_cd_dtl에서 가져온 코드값.
//				InitDataCombo (0, "sell_buy_tp_cd", "Selling|Buying", "S|B");
				InitDataCombo (0, "bnd_clss_cd", PARAM1_1, PARAM1_2);	//com_cd_dtl에서 가져온 코드값.
				InitDataCombo (0, "delt_flg", "Y|N", "Y|N", "N");	//com_cd_dtl에서 가져온 코드값.
				
				PopupImage = APP_PATH+"/web/img/button/btns_calendar.gif";
				ImageList(0) = APP_PATH+"/web/img/button/btns_search.gif";
				
				PopupButtonImage(0, "trdp_cd") = 0;
				PopupButtonImage(0, "pol_cd") = 0;
				PopupButtonImage(0, "pod_cd") = 0;
				PopupButtonImage(0, "dest_del_cd") = 0;
				
				InitViewFormat(0, "trf_term_fm_dt", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
				InitViewFormat(0, "trf_term_to_dt", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
      			EditDateFormat = "MDY";//날짜 입력을 월/일/년 으로 설정
				
				// 대문자 자동 치환
				InitDataValid(0, "trdp_cd",vtEngUpOther, "0123456789" );
				InitDataValid(0, "pol_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "pod_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "dest_del_cd",vtEngUpOther, "0123456789" );
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
                 InitRowInfo( 2, 1, 9, 100);

                 //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                 InitColumnInfo(13, 0, 0, true);

                 // 해더에서 처리할 수 있는 각종 기능을 설정한다
                 InitHeadMode(false, true, false, true, false,false) ;
                 
                 //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                 InitHeadRow(0, getLabel('SAL_TFM_0010_HDR2_1'), true);
                 InitHeadRow(1, getLabel('SAL_TFM_0010_HDR2_2'), true);
                 
                 var cnt = 0;
                 
                 //데이터속성    [ROW,   COL,   DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
 				InitDataProperty(0,cnt++,  dtDelCheck,		30,    daCenter,	true,	"chk",			false,		"",       dfNone,      0,     true,      true);
 				InitDataProperty(0,cnt++,  dtHidden,   		40,    daCenter,	true,	"trf_dtl_seq", 	false,		"",       dfNone,      0,     false,     false,		3);
 				InitDataProperty(0,cnt++,  dtPopupEdit,		60,    daLeft,		true,	"frt_cd",		false,		"",       dfNone,      0,     true,     true,		10);
 				InitDataProperty(0,cnt++,  dtData,		   100,    daLeft,		true,	"frt_nm",		false,		"",       dfNone,      0,     false,     false,		50);
 				
 				InitDataProperty(0,cnt++,  dtCombo,		    60,    daCenter,	true,	"trf_curr_cd",	false,		"",       dfNone,      0,     true,     true,		6);
 				InitDataProperty(0,cnt++,  dtCombo,		    60,    daLeft,		true,	"aply_ut_cd",	false,		"",       dfNone,      0,     true,     true,		6);
 				
 				InitDataProperty(0,cnt++,  dtData,		   110,    daRight,		true,	"min_amt", 		false,		"",       dfFloat,     2,     true,     true,		25);
 				InitDataProperty(0,cnt++,  dtData,		   110,    daRight,		true,	"max_amt", 		false,		"",       dfFloat,     2,     true,     true,		25);
 				
 				InitDataProperty(0,cnt++,  dtCombo,			60,    daCenter,	true,	"cntr_tpsz_cd",	false,		"",       dfNone,      0,     true,     true,		6);
 				InitDataProperty(0,cnt++,  dtData,		   120,    daRight,		true,	"trf_amt", 		false,		"",       dfFloat,     2,     true,     true,		25);
 				
 				InitDataProperty(0,cnt++,  dtData,		   150,    daLeft,		true,	"rmk",			false,      "",       dfNone,      0,	  true,     true,		100);
 				InitDataProperty(0,cnt++,  dtHidden,        50,    daLeft,		true,	"trf_ctrt_no", 	false,		"",       dfNone,      0,     true,     true,		15);
 				InitDataProperty(0,cnt++,  dtHiddenStatus,	40,    daCenter,	true,	"dtl_ibflag");

 				HeadRowHeight = 21;
 				
 				InitDataCombo (0, "aply_ut_cd", PARAM3_1, PARAM3_2);
 				InitDataCombo (0, "cntr_tpsz_cd", typeSize_1, typeSize_1);
 				InitDataCombo (0, "trf_curr_cd", PARAM5_1, PARAM5_2);
 				
 				ImageList(0) = APP_PATH+"/web/img/button/btns_search.gif";
 				
 				PopupButtonImage(0, "frt_cd") = 0;

 				// 대문자 자동 치환
				InitDataValid(0, "frt_cd",vtEngUpOther, "0123456789/" );

 				
 				EditableColorDiff = true;
 				
            }                                                      
            break;
     }
    
}


function fncGridCheck() {
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var intRow = sheetObj.Rows;
	var intRow1 = sheetObj1.Rows;
	
	if(sheetObj.RowCount < 1){
		alert(getLabel('SAL_COM_ALT008'));
		return false;		
	}
	
	for ( var i = 2 ; i < intRow ; i++ ) {
		if ( sheetObj.CellValue(i, "trdp_cd") == "") {
			alert(getLabel('SAL_COM_ALT009'));
			sheetObj.SelectCell(i, "trdp_cd");
			return false;
		}
//		if ( sheetObj.CellValue(i, "pol_cd") == sheetObj.CellValue(i, "fd_cd")) {
//			alert(i +' row '+getLabel('SAL_TFM_MSG07'));
//			sheetObj.SelectCell(i, "fd_cd");
//			return false;
//		}
	}
//	for ( var i = 2 ; i < intRow1 ; i++ ) {
//		
//		
//		// 금액은 0보다 커야한다.
//		if ( parseFloat(sheetObj1.CellValue(i, "trf_amt")) <= 0) {
//			alert(getLabel('SAL_TFM_MSG10'));
//			sheetObj1.SelectCell(i, "trf_amt");
//		return false;
//		}
//	}
//	// type과 size가 같은건 저장안되야함.
//	// 중복여부를 검사한다.
//	var duplRows = sheetObj1.ColValueDupRows("frt_cd|aply_ut_cd|cntr_tpsz_cd|cntr_sl_flg");
//	// array안에 중복 행을 넣는다.
//	var arrRow = duplRows.split(",");
//
//	// 중복값이 있을때만 for
//	if(arrRow!=""){
//    	for (idx=0; idx<arrRow.length; idx++){
//    		
//    		// 중복된 행을 화면에 보여주고
//    		alert(getLabel('SAL_TFM_MSG16'));
//    		
//    		// 해당되는 행으로 이동 시킨다.
//    		sheetObj1.SelectCell(arrRow[idx], "frt_cd");
//      		return false;
//    	}
//	}
	
	return true;
}
function sheet1_OnSearchEnd() {
	var formObj = document.frm1;
	
}
function sheet1_OnClick(sheetObj,Row,Col){
	if(sheetObj.RowStatus(Row)=="I") return;
	
	switch (sheetObj.ColSaveName(Col)) {
//		case "chk" :
//	       	// checked 된 것의 invoice no를 가져온다.
//	       	var chkRow = sheetObj.FindCheckedRow("chk");
//	       	
//	       	
//	       	// 체크된것이 있으면 trdp_cd가 같은지 확인후 체크 
//	       	if(chkRow !=""){
//	       		
//	       		var trdp_cd = sheetObj.cellvalue(Row, "trdp_cd");
//	       		var arrRow = chkRow.split("|");
//	       		
//	       		for(var j=0;j<arrRow.length-1;j++){
//	       			if(trdp_cd!=sheetObj.cellvalue(arrRow[j], "trdp_cd")){
//	       				alert(getLabel('SAL_TFM_MSG14'));
//	       				// check value를 Y해 줘야 N으로 바뀜.
//	       				sheetObj.cellvalue2(Row, "chk") = "Y";
//		        		return;
//	       			}
//	       		}
//	       	}
//
//		break;
	
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	
	switch (sheetObj.ColSaveName(Col)) {
	case "trdp_cd":
		codeNameAction('trdpCode_s',sheetObj.cellValue(Row, Col), 'onChange')
	break;
	case "pol_cd":
		codeNameAction('location_s_pol',sheetObj.cellValue(Row, Col), 'onChange')
	break;
	case "pod_cd":
		codeNameAction('location_s_pod',sheetObj.cellValue(Row, Col), 'onChange')
	break;
	case "dest_del_cd":
		codeNameAction('location_s_dest',sheetObj.cellValue(Row, Col), 'onChange')
	break;
	case "trf_curr_cd":
		codeNameAction('currency_s',sheetObj.cellValue(Row, Col), 'onChange');
	break;
	}
}
function sheet1_OnSaveEnd() {
	doWork('SEARCHLIST');
	
	// trf_ctrt_no가 있을경우만 detail 조회
	var formObj  = document.frm1;
	if(formObj.hid_trf_ctrt_no.value!="")
	doWork('SEARCHLIST01');
	
}
function sheet2_OnSaveEnd() {
	
	// trf_ctrt_no가 있을경우만 detail 조회
	var formObj  = document.frm1;
	if(formObj.hid_trf_ctrt_no.value!="")
	doWork('SEARCHLIST01');
	
}

function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj  = document.frm1;

	if(sheetObj.cellValue(Row, "ibflag")!="I"){
		
		var trf_ctrt_no = sheetObj.CellValue(Row, "trf_ctrt_no");
		// hid form에 값을 가지고 있는다.
		formObj.hid_trf_ctrt_no.value = trf_ctrt_no;	
		
		doWork('SEARCHLIST01');

	}
		
}
function sheet1_OnPopupClick(sheetObj,Row,Col){

	switch (sheetObj.ColSaveName(Col)) {
	
		case "trdp_cd" :
			rtnary = new Array(1);
			rtnary[0] = "1";
			
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[1] = valObj;
	   		}else{
	   			rtnary[1] = "";
	   		}
			
	   		rtnary[2] = window;
	   		
			var cstmTpCd = 'CS';
			var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				
				sheetObj.cellValue2(Row, Col) =  rtnValAry[0]; 
				sheetObj.cellValue2(Row, "trdp_nm") = rtnValAry[2];//loc_cd 
					
			}
		break;
		
		case "pol_cd" :
	        
			rtnary = new Array(1);
	   		rtnary[0] = "SEA";
	   		rtnary[1] = "BL";
	   		
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2] = valObj;
	   		}else{
	   			rtnary[2] = "";
	   		}
	   		
	   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				
				sheetObj.cellValue2(Row, Col) =  rtnValAry[0]; 
				sheetObj.cellValue2(Row, "pol_nm") =  rtnValAry[2]; 
					
			}
		break;
		
		case "pod_cd" :
			rtnary = new Array(1);
	   		rtnary[0] = "SEA";
	   		rtnary[1] = "BL";
	   		
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2] = valObj;
	   		}else{
	   			rtnary[2] = "";
	   		}
	   		
	   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				
				sheetObj.cellValue2(Row, Col) =  rtnValAry[0]; 
				sheetObj.cellValue2(Row, "pod_nm") =  rtnValAry[2];
					
			}
		break;
		
		case "dest_del_cd" :
			rtnary = new Array(1);
	   		rtnary[0] = "SEA";
	   		rtnary[1] = "BL";
	   		
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2] = valObj;
	   		}else{
	   			rtnary[2] = "";
	   		}
	   		
	   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				
				sheetObj.cellValue2(Row, Col) =  rtnValAry[0]; 
				sheetObj.cellValue2(Row, "dest_del_nm") =  rtnValAry[2];
			}
		break;
		case "trf_curr_cd": 				
	   		rtnary = new Array(1);
			rtnary[0] = "1";
			
			if(typeof(valObj)!='undefined'){
	   			rtnary[1] = valObj;
	   		}else{
	   			rtnary[1] = "";
	   		}
			
	        var rtnVal = window.showModalDialog('./CMM_POP_0040.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:660px;dialogHeight:360px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	        	return;
	        }else {
	        	var rtnValAry = rtnVal.split("|");

	        	sheetObj.cellValue2(Row, Col) =  rtnValAry[0];
	        	
	        }
	        
        break;
		case "trf_term_fm_dt" :
			var cal = new calendarPopupGrid();
	        cal.select(sheetObj, 'sheet1', Row, Col, 'MM-dd-yyyy');
		break;
		case "trf_term_to_dt" :
			var cal = new calendarPopupGrid();
	        cal.select(sheetObj, 'sheet1', Row, Col, 'MM-dd-yyyy');
		break;
	}
}
function sheet2_OnSearchEnd() {
	
	getObj('rowAdd').style.display = 'block';
	getObj('rowAdd2').style.display = 'block';
	//rowAdd3.style.display = 'block';

}

function sheet2_OnChange(sheetObj,Row,Col){
	switch (sheetObj.ColSaveName(Col)) {
	
	case "frt_cd":
		codeNameAction('freight_s',sheetObj.cellValue(Row, Col), 'onChange')
	break;
		
	case "aply_ut_cd" :
		// unit type이 container인 경우 type size와 sell여부를 선택할 수 있다.
		if(sheetObj.cellValue(Row, "aply_ut_cd") == "SCN"){
			
			sheetObj.CellEditable(Row,"cntr_tpsz_cd") = true;
			sheetObj.CellEditable(Row,"cntr_sl_flg") = true;
		}else{
			sheetObj.cellValue2(Row, "cntr_tpsz_cd") = "";
			sheetObj.cellValue2(Row, "cntr_sl_flg") = "";
			sheetObj.CellEditable(Row,"cntr_tpsz_cd") = false;
			sheetObj.CellEditable(Row,"cntr_sl_flg") = false;
		}
		
		break;
	}
}
function sheet2_OnPopupClick(sheetObj,Row,Col){

	// 
	switch (sheetObj.ColSaveName(Col)) {
	case "frt_cd" :
		rtnary = new Array(1);
   		rtnary[0] = "2";
   		
        var rtnVal = window.showModalDialog('./CMM_POP_0070.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry = rtnVal.split("|");

			sheetObj.CellValue2(Row, "frt_cd") = rtnValAry[0];
			sheetObj.CellValue2(Row, "frt_nm") = rtnValAry[1];
			
		}
	break;
	
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
	
    switch(doWhat){
		case 'DATE1':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.trf_term_dt, 'trf_term_dt', 'MM-dd-yyyy');
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
	getObj('rowAdd').style.display = 'none';
	getObj('rowAdd2').style.display = 'none';
	//rowAdd3.style.display = 'none';
	
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
				formObj.trdp_cd.value  = masterVals[0]; 
				formObj.trdp_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "trdpCode_s"){
				sheetObj.cellValue(sheetObj.selectRow, "trdp_cd") = masterVals[0]; 
				sheetObj.cellValue(sheetObj.selectRow, "trdp_nm") = masterVals[3];//trdp_nm
				
			}else if(CODETYPE == "location_s_pol"){
				sheetObj.cellValue2(sheetObj.selectRow, "pol_cd") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "pol_nm") = masterVals[3]; 
				
			}else if(CODETYPE == "location_s_pod"){
				sheetObj.cellValue2(sheetObj.selectRow, "pod_cd") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "pod_nm") = masterVals[3]; 
				
			}else if(CODETYPE == "location_s_dest"){
				sheetObj.cellValue2(sheetObj.selectRow, "dest_del_cd") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "dest_del_nm") = masterVals[3]; 
			}else if(CODETYPE == "currency_s"){
				sheetObj.cellValue(sheetObj.selectRow, "trf_curr_cd") = masterVals[0];
				
			}else if(CODETYPE == "freight_s"){
				sheetObj1.cellValue2(sheetObj1.selectRow, "frt_cd") = masterVals[0]; 
				sheetObj1.cellValue2(sheetObj1.selectRow, "frt_nm") = masterVals[3];
			}
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.trdp_cd.value  = ""; 
				formObj.trdp_nm.value  = "";
				
			}else if(CODETYPE == "trdpCode_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "trdp_cd") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "trdp_nm") = "";
				
			}else if(CODETYPE == "location_s_pol"){
				sheetObj.cellValue2(sheetObj.selectRow, "pol_cd") = "";  
				sheetObj.cellValue2(sheetObj.selectRow, "pol_nm") = "";  
				
			}else if(CODETYPE == "location_s_pod"){
				sheetObj.cellValue2(sheetObj.selectRow, "pod_cd") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "pod_nm") = ""; 
				
			}else if(CODETYPE == "location_s_dest"){
				sheetObj.cellValue2(sheetObj.selectRow, "dest_del_cd") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "dest_del_nm") = ""; 
			}else if(CODETYPE == "currency_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "trf_curr_cd") = "";  
				
			}else if(CODETYPE == "freight_s"){
				sheetObj1.cellValue2(sheetObj1.selectRow, "frt_cd") = ""; 
				sheetObj1.cellValue2(sheetObj1.selectRow, "frt_nm") = "";
			}
		}
	}else{
		//Error occurred
		alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TFM_0010.923");
	}
}


function fncGridCheck1(){
	/*
	 *  Detail Unit에 의해 필수값을 체크하는 로직
	 */
	var sheetObj1 = docObjects[1];
	
	for(var i=2 ; i<sheetObj1.rows ; i++){
		if(sheetObj1.CellValue(i, 'aply_ut_cd')=='SCN'){
			
			if ( sheetObj1.CellValue(i, 'cntr_tpsz_cd') == '') {
				//alert('CNTR TP/SZ field is mandatory.');
				alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TFM_0010.939");
				sheetObj1.SelectCell(i, 'cntr_tpsz_cd');
				return false;
			}
			
		}else if(sheetObj1.CellValue(i, 'aply_ut_cd')=='CBM'){
			
//			if ( sheetObj1.CellValue(i, 'min_amt') == '') {
//				alert('Min. Amount field is mandatory.');
//				sheetObj1.SelectCell(i, 'min_amt');
//				return false;
//			}
//			
//			if ( sheetObj1.CellValue(i, 'max_amt') == '') {
//				alert('Max. Amount field is mandatory.');
//				sheetObj1.SelectCell(i, 'max_amt');
//				return false;
//			}
			
		}else if(sheetObj1.CellValue(i, 'aply_ut_cd')=='RET'){
			
		}else if(sheetObj1.CellValue(i, 'aply_ut_cd')=='KGS'){
			
		}else if(sheetObj1.CellValue(i, 'aply_ut_cd')=='UNT'){
			
		}else{
			
		}
	}
	
	if(sheetObj1.ColValueDup('frt_cd') > 0){
		alert(getLabel('SAL_COM_ALT005') + "\n\n: SAL_TFM_0010.939");
		sheetObj1.SelectCell(sheetObj1.ColValueDup('frt_cd'), 'frt_cd');
		return false;
	}
	return true;
}