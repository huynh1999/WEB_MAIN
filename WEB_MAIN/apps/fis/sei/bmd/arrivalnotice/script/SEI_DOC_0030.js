/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(document.form.eta_strdt, document.form.eta_enddt);
}

function doWork(srcName){
	if(!btnVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.form;
    var sheetObj = docObjects[0];
	try { 
		switch(srcName) {
    	   	case "SEARCHLIST":
			    if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value = SEARCHLIST;
			    	sheetObj.DoSearch4Post("./SEI_DOC_0030GS.clt", FormQueryString(formObj));
			    }
				window._childwin="";
    	   	break;
           	case "HBL_POPLIST"://   S = 해운에서 오픈, A = 항공에서 오픈
           
          		var rtnary = new Array(1);
	   			rtnary[0] = "S";
	   			rtnary[1] = "I";
	   		
   	        	var rtnVal = window.showModalDialog('./CMM_POP_0170.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
   	        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 		return;
				}else{
			
					var rtnValAry = rtnVal.split("|");
					formObj.s_house_bl_no.value = rtnValAry[0];//house_bl_no
					formObj.s_intg_bl_seq.value = rtnValAry[3];//intg_bl_seq
				}
			break;  
	   	 	case "PARTNER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	   
		   		var rtnary = new Array(1);
		   		rtnary[0] = "1";
		   		rtnary[1] = "";
		   		rtnary[2] = window;
		   		
	   	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 		return;
				}else{
					var rtnValAry = rtnVal.split("|");
					formObj.s_trdp_cd.value = rtnValAry[0];//trdp_cd
					formObj.s_trdp_short_nm.value = rtnValAry[1];//shrt_nm
					formObj.s_trdp_full_nm.value = rtnValAry[2];//full_nm
   	        	}
          	break;
        
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SEI_DOC_0030.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEI_DOC_0030.002"); 
        }
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
            cal.select(formObj.eta_strdt, 'eta_strdt', formObj.eta_enddt, 'eta_enddt', 'yyyy-MM-dd');
        break;
             
    }
}

/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value = callPage;
	doWork('SEARCHLIST');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	//document.form.f_CurPage.value = 1;
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
    
    if(formObj.in_house_bl_no.value != ""){
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
                style.height = 370;
                
                //전체 너비 설정
                SheetWidth = mainTable.clientWidth;
               // SheetWidth = 400;

                //Host정보 설정[필수][HostIp, Port, PagePath]
                if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

                //전체Merge 종류 [선택, Default msNone]
                MergeSheet = msAll&&msHeaderOnly;

               //전체Edit 허용 여부 [선택, Default false]
                Editable = false;

                //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
                InitRowInfo(2, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(33, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;

               // var HeadTitle = "CK|ibflag|No.|HBL No.|MBL No.|AN|AN DOC|AN PRINT|DO|DO DOC|DO PRINT|ETA|Shipper|Shipper|Consignee|Consignee|Liner|Liner|POR|POL|POD|DEL|Weight|Measure|intg_bl_seq|an_palt_doc_seq|do_palt_doc_seq|intg_bl_rgst_tms|Indexing" ;

                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('SEI_BMD_HDR14_1'),       true);
                InitHeadRow(1, getLabel('SEI_BMD_HDR14_2'), true);
                
                
                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, 0,  dtHidden	,   30,   daCenter,  true,     "Del",        	        false,     "",        dfNone);
                InitDataProperty(0, 1,  dtHiddenStatus, 40,   daCenter,  true,     "ibflag");
                InitDataProperty(0, 2,  dtData,        	30,   daCenter,  true,     "no"	,   				false,      "",       dfNone);
		        InitDataProperty(0, 3,  dtData,        120,   daLeft,    true,     "house_bl_no",   		false,      "",       dfNone);
		        InitDataProperty(0, 4,  dtData,    	   120,   daLeft,    true,     "master_bl_no",   		false,      "",       dfNone);
				
		        InitDataProperty(0, 5,  dtImageText,    50,   daCenter,  true,     "an_palt_doc_icon",   	false,      "",       dfNone);
				InitDataProperty(0, 6,  dtImageText,    50,   daCenter,  true,     "an_palt_doc_pdf_url",   false,      "",       dfNone);
				InitDataProperty(0, 7,  dtHidden,        0,   daCenter,  true,     "an_img_val",            false,      "",       dfNone);
				InitDataProperty(0, 8,  dtImageText,    70,   daCenter,  true,     "an_print",   			false,      "",       dfNone);
				
				InitDataProperty(0, 9,  dtImageText,    50,   daCenter,  true,     "do_palt_doc_icon",		false,      "",       dfNone);
                InitDataProperty(0,10,  dtImageText,    50,   daCenter,  true,     "do_palt_doc_pdf_url",	false,      "",       dfNone);
                InitDataProperty(0,11,  dtHidden,        0,   daCenter,  true,     "do_img_val",	        false,      "",       dfNone);
                InitDataProperty(0,12,  dtImageText,    70,   daCenter,  true,     "do_print",				false,      "",       dfNone);
				
                InitDataProperty(0,13,  dtData,         80,   daCenter,  true,     "eta_dt_tm",   			false,      "",       dfDateYmd);
				
                InitDataProperty(0,14,  dtHidden,       50,   daCenter,  true,     "shipper_trdp_cd",   	false,      "",       dfNone);
				InitDataProperty(0,15,  dtData,        120,   daLeft,  	 true,     "shipper_trdp_nm",   	false,      "",       dfNone);
				
				InitDataProperty(0,16,  dtHidden,       50,   daCenter,  true,     "consignee_trdp_cd", 	false,      "",       dfNone);
		        InitDataProperty(0,17,  dtData,        120,   daLeft,  	 true,     "consignee_trdp_nm", 	false,      "",       dfNone);
		        
		        InitDataProperty(0,18,  dtHidden,       50,   daCenter,  true,     "liner_trdp_cd",    		false,      "",       dfNone);
		        InitDataProperty(0,19,  dtData,        120,   daLeft,  	 true,     "liner_trdp_nm",    		false,      "",       dfNone);
		        
		        InitDataProperty(0,20,  dtHidden,      120,   daLeft,  	 true,     "por_nm",     			false,      "",       dfNone);
		        InitDataProperty(0,21,  dtData,        120,   daLeft,  	 true,     "pol_nm",     			false,      "",       dfNone);
		        InitDataProperty(0,22,  dtData,        120,   daLeft,  	 true,     "pod_nm",     			false,      "",       dfNone);
		        InitDataProperty(0,23,  dtData,        120,   daLeft,  	 true,     "del_nm",     			false,      "",       dfNone);
		        InitDataProperty(0,24,  dtData,        	80,   daRight,   true,     "grs_wgt",    			false,      "",       dfNone);
		        InitDataProperty(0,25,  dtData,        	80,   daRight,   true,     "meas",    				false,      "",       dfNone);

		        InitDataProperty(0,26,  dtHidden,       80,   daCenter,  true,     "intg_bl_seq",   		false,      "",       dfNone);
                InitDataProperty(0,27,  dtHidden,      	80,   daLeft,    true,     "an_palt_doc_seq",   	false,      "",       dfNone);
                InitDataProperty(0,28,  dtHidden,      	80,   daLeft,    true,     "do_palt_doc_seq",   	false,      "",       dfNone);
                InitDataProperty(0,29,  dtHidden,      	80,   daLeft,    true,     "intg_bl_rgst_tms",  	false,      "",       dfNone);
                
                InitDataProperty(0,30,  dtHidden, 		 0,   daCenter,  true, 	   "Indexing");
                
				InitDataProperty(0,31,  dtHidden,        0,   daCenter,  true,     "an_palt_doc_tp_cd",   	false,      "",       dfNone);
				InitDataProperty(0,32,  dtHidden,        0,   daCenter,  true,     "do_palt_doc_tp_cd",		false,      "",       dfNone);

                
                ImageList(0) = APP_PATH+"/web/img/button/bt_img.gif";
                ImageList(1) = APP_PATH+"/web/img/button/bt_img.gif";
                ImageList(2) = APP_PATH+"/web/img/button/btn_print.gif";
                ImageList(3) = APP_PATH+"/web/img/button/btns_view.gif";
                ImageList(4) = APP_PATH+"/web/img/button/btns_create.gif";

                InitDataImage(0, 5, daCenter);
                InitDataImage(0, 6, daCenter);
                InitDataImage(0, 7, daCenter);
                InitDataImage(0, 8, daCenter);
                InitDataImage(0, 9, daCenter);
                InitDataImage(0,10, daCenter);
                
           }
           break;
    }
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet3_OnClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnClick(sheetObj,Row,Col){	
	var formObj  = document.form;
    var sheetObj1 = docObjects[0];
	
   	var downType;
   	var s_palt_doc_seq;
   	var s_palt_doc_tp_cd;
   	   	
	switch (sheetObj.ColSaveName(Col)) {
        case "an_palt_doc_pdf_url":	//AN DOC 선택시 이미지 파일 다운로드
        	if(sheetObj.CellValue(Row,"an_img_val")==''||sheetObj.CellValue(Row,"an_img_val")=='99'){
        		break;
        	}else{
                downType = sheetObj.CellValue(Row,"an_palt_doc_pdf_url_hidden");
                s_palt_doc_seq= sheetObj.CellValue(Row,"an_palt_doc_seq");
               	downloadFile('pdf', s_palt_doc_seq, 'AN');	
        	}
        break;
        case "an_print" :
	   		if ( sheetObj.CellValue(Row, "an_palt_doc_tp_cd") != "AN" ) {
	   			return false;
	   		}

	   		var param = "title=Notice of Arrival";
	   		param += "&cmd_type=52";
	   		param += "&intg_bl_seq=" + sheetObj.CellValue(Row, "intg_bl_seq"); 
	   		
	   		window.showModalDialog('RPT_PRN_0010.clt?'+param, [],'dialogWidth:1025px; dialogHeight:740px');
	   		
//	   		var rtnary = new Array();
//	   		rtnary[0]	= sheetObj.CellValue(Row, "intg_bl_seq");
//	   		var openClt = "./SEC_RPT_0100.clt";
//	   		var str_cnd = 	"scroll:yes;status:no;help:no;dialogWidth:1024px;dialogHeight:768px";
//			var rtnVal = window.showModalDialog(openClt, rtnary, str_cnd);
//				   		
//   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
//			 	return;
//			}
        break;
        case "do_print" :
	   		if ( sheetObj.CellValue(Row, "do_palt_doc_tp_cd") != "DO" ) {
	   			return false;
	   		}

	   		var param = "title=Delivery Order";
	   		param += "&cmd_type=53";
	   		param += "&intg_bl_seq=" + sheetObj.CellValue(Row, "intg_bl_seq"); 
	   		
	   		window.showModalDialog('RPT_PRN_0010.clt?'+param, [],'dialogWidth:1025px; dialogHeight:740px');
	   		
//	   		var rtnary = new Array();
//	   		rtnary[0]	= sheetObj.CellValue(Row, "intg_bl_seq");
//	   		var openClt = "./SEC_RPT_0110.clt";
//	   		var str_cnd = 	"scroll:yes;status:no;help:no;dialogWidth:1024px;dialogHeight:768px";
//			var rtnVal = window.showModalDialog(openClt, rtnary, str_cnd);
//				   		
//   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
//			 	return;
//			}
        break;
        case "do_palt_doc_pdf_url" ://DO DOC 선택시 이미지 파일 다운로드
        	if(sheetObj.CellValue(Row,"do_img_val")==''||sheetObj.CellValue(Row,"do_img_val")=='99'){
        		break;
        	}else{
                downType = sheetObj.CellValue(Row,"do_palt_doc_pdf_url_hidden");
                s_palt_doc_seq= sheetObj.CellValue(Row,"do_palt_doc_seq");
               	downloadFile('pdf', s_palt_doc_seq, 'DO');	
        	}
        break;
	} // end switch
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var formObj  = document.form;
	var sheetObj1 = docObjects[0];
	var sheet1Row = sheetObj1.Rows;
	
  	var reqParam = '?intg_bl_seq='+sheetObj.CellValue(Row,"intg_bl_seq");
    reqParam += '&intg_bl_rgst_tms='+sheetObj.CellValue(Row,"intg_bl_rgst_tms");
	switch (sheetObj.ColSaveName(Col)) {
        case "an_palt_doc_icon" :
        	var palt_doc_seq = sheetObj1.CellValue(Row,"an_palt_doc_seq");
			if(palt_doc_seq == ""){
				reqParam += '&palt_doc_seq='+sheetObj1.CellValue(Row,"an_palt_doc_seq");
				reqParam += '&palt_doc_tp_cd=AN';
				reqParam += '&openMean=SEARCH01';
			    window._childwin = popGET('./SEI_DOC_0031.clt'+reqParam, 'seiAn', 806, 470, "scroll:no;status:no;help:no;");
			}else{
	            reqParam += '&palt_doc_seq='+sheetObj1.CellValue(Row,"an_palt_doc_seq");
				reqParam += '&palt_doc_tp_cd=AN';
				reqParam += '&openMean=SEARCH02';
			    window._childwin = popGET('./SEI_DOC_0031.clt'+reqParam, 'seiAnUp', 806, 470, "scroll:no;status:no;help:no;");
  			}
        break;
		case "do_palt_doc_icon" :
        
        	var palt_doc_seq = sheetObj1.CellValue(Row,"do_palt_doc_seq");
			if(palt_doc_seq == ""){
				reqParam += '&palt_doc_seq='+sheetObj1.CellValue(Row,"do_palt_doc_seq");
				reqParam += '&palt_doc_tp_cd=DO';
				reqParam += '&openMean=SEARCH01';
			    window._childwin = popGET('./SEI_DOC_0032.clt'+reqParam, 'seiDo', 806, 470, "scroll:no;status:no;help:no;");
				
			}else{
	            reqParam += '&palt_doc_seq='+sheetObj1.CellValue(Row,"do_palt_doc_seq");
				reqParam += '&palt_doc_tp_cd=DO';
				reqParam += '&openMean=SEARCH02';
				
				window._childwin = popGET('./SEI_DOC_0032.clt'+reqParam, 'seiDoUp', 806, 470, "scroll:no;status:no;help:no;");
				/*
				if ( window._childwin ){  // 새창이 띄워져 있을때
			        window._childwin.focus();
			    }else{   // 새창이 띄워져 있지 않을때
			        window._childwin = popGET('./SEI_DOC_0032.clt'+reqParam, 'seiDoUp', 806, 470, "scroll:no;status:no;help:no;");
			    }
			    */
			}
        break;
	} // end switch
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].CellValue(2, 'Indexing'), getObj('pagingTb'));
}

/* 파일 다운로드 */
function downloadFile(downType,s_palt_doc_seq,s_palt_doc_tp_cd){
	document.frm2.docType.value = downType;
	document.frm2.s_palt_doc_seq.value   = s_palt_doc_seq;
	document.frm2.s_palt_doc_tp_cd.value = s_palt_doc_tp_cd;
	document.frm2.submit();
}

function closewin(){
    if ( window._childwin ) { window._childwin.opener = null; window._childwin.close(); }
}
