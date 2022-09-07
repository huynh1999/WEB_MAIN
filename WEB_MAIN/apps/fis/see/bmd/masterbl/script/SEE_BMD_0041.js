/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	setFromToDt(document.frm1.obrd_strdt, document.frm1.obrd_enddt);
}

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = srDocObjects[0];
    var formObj  = document.frm1;
	
    try {
        switch(srcName) {
    	   case "SEARCHLIST":
               formObj.f_cmd.value = SEARCHLIST;
               sheetObj.DoSearch4Post("./SEE_BMD_0031GS.clt", FormQueryString(formObj));
    	   
               break;    
    	   
    	   case "USEHBL":
    		   var tmpCnt = srDocObjects[1].rows;
    		   
    		   if(tmpCnt<2){
    			   //Shipping Request할 HBL을 선택하여 주십시오!
    			   alert(getLabel('FMS_COM_ALT004'));
    		   }
    		   else{
    			   var rtnStr = '';
    			   var divStr = '^';
    			   var clsStr = ';';
    			   
    			   //현재 BLSEQ가 등록되었는지를 확인함
    			   for(var i = 1; i< tmpCnt; i++){
    				   rtnStr+= srDocObjects[1].CellValue(i, 'to_bkg_no');
    				   rtnStr+= divStr; 
    				   rtnStr+= srDocObjects[1].CellValue(i, 'to_bl_no');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].CellValue(i, 'to_shipper');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].CellValue(i, 'to_obrd_dt_tm');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].CellValue(i, 'to_pol_cd');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].CellValue(i, 'to_pod_cd');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].CellValue(i, 'to_grs_wgt');		
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].CellValue(i, 'to_meas');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].CellValue(i, 'to_pck_qty');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].CellValue(i, 'to_pck_ut_cd');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].CellValue(i, 'to_intg_bl_seq');
    				   rtnStr+= clsStr;
    			   }
    			   window.returnValue = rtnStr;
    			   window.close();
    		   }
    	   
    		   break;
    	   
    	   case "btn_new":
    	       sheetObject.RemoveAll();
    	       formObject.reset();
       	   
    	       break;
    	   
    	   case "CLOSE":
    		   window.close();
       	   
    		   break;	 
        } // end switch
	}
    catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e ); 
        }
	}
}

/**
 * S/R List에 추가
 */
function hblToSrList(){
	var hblLen = srDocObjects[0].rows;
	hblLen--;
	for(var i= hblLen; 0 < i; i--){
		
		//선택된 경우
		if(srDocObjects[0].CellValue(i, 'sr_select')==1){

			if(frm1.cur_obrd_dt_tm.value==srDocObjects[0].CellValue(i, 'obrd_dt_tm')&&
			   frm1.cur_pol_cd.value==srDocObjects[0].CellValue(i, 'pol_cd')&&
			   frm1.cur_pod_cd.value==srDocObjects[0].CellValue(i, 'pod_cd')&&
			   srDocObjects[0].CellValue(i, 'used_chk')!='Y'
			  ){
				var intRows = srDocObjects[1].Rows;
				var newRow  = intRows-1; 
				srDocObjects[1].DataInsert(newRow);
				
				
				srDocObjects[1].CellValue(intRows, 'to_bkg_no')     = srDocObjects[0].CellValue(i, 'bkg_no'); 
				srDocObjects[1].CellValue(intRows, 'to_bl_no')      = srDocObjects[0].CellValue(i, 'bl_no');
				srDocObjects[1].CellValue(intRows, 'to_shipper')    = srDocObjects[0].CellValue(i, 'shipper');
				srDocObjects[1].CellValue(intRows, 'to_obrd_dt_tm') = srDocObjects[0].CellValue(i, 'obrd_dt_tm');
				
				srDocObjects[1].CellValue(intRows, 'to_pol_cd')     = srDocObjects[0].CellValue(i, 'pol_cd');
				srDocObjects[1].CellValue(intRows, 'to_pod_cd')     = srDocObjects[0].CellValue(i, 'pod_cd');
				
				srDocObjects[1].CellValue(intRows, 'to_grs_wgt')    = srDocObjects[0].CellValue(i, 'grs_wgt');		
				
				srDocObjects[1].CellValue(intRows, 'to_meas')       = srDocObjects[0].CellValue(i, 'meas');	
				srDocObjects[1].CellValue(intRows, 'to_pck_qty')    = srDocObjects[0].CellValue(i, 'pck_qty');	
				srDocObjects[1].CellValue(intRows, 'to_pck_ut_cd')  = srDocObjects[0].CellValue(i, 'pck_ut_cd');	
				srDocObjects[1].CellValue(intRows, 'to_intg_bl_seq')= srDocObjects[0].CellValue(i, 'intg_bl_seq');	
				
				/*
				srDocObjects[0].CellValue(i, 'used_chk') = 'Y';
				srDocObjects[0].CellValue(i, 'sr_select') = 0;
				*/
				
				srDocObjects[0].RowDelete(i, false);
			}else{
				
			}
		}
	}
}

/**
 * S/R List에서 제거
 */
function srListToHbl(){
	var hblLen = srDocObjects[1].rows;
	for(var i= 1; i <hblLen; i++){
		
		//선택된 경우
		if(srDocObjects[1].CellValue(i, 'to_sr_select')==1){
			
			//HBL List의 선택된 HBL 선택여부 초기화
			var intRows = srDocObjects[0].Rows;
			var newRow  = intRows-1; 
			srDocObjects[0].DataInsert(newRow);
			srDocObjects[0].CellValue(intRows, 'bkg_no')     = srDocObjects[1].CellValue(i, 'to_bkg_no'); 
			srDocObjects[0].CellValue(intRows, 'bl_no')      = srDocObjects[1].CellValue(i, 'to_bl_no');
			srDocObjects[0].CellValue(intRows, 'shipper')    = srDocObjects[1].CellValue(i, 'to_shipper');
			srDocObjects[0].CellValue(intRows, 'obrd_dt_tm') = srDocObjects[1].CellValue(i, 'to_obrd_dt_tm');
			
			srDocObjects[0].CellValue(intRows, 'pol_cd')     = srDocObjects[1].CellValue(i, 'to_pol_cd');
			srDocObjects[0].CellValue(intRows, 'pod_cd')     = srDocObjects[1].CellValue(i, 'to_pod_cd');
			
			srDocObjects[0].CellValue(intRows, 'grs_wgt')    = srDocObjects[1].CellValue(i, 'to_grs_wgt');		
			
			srDocObjects[0].CellValue(intRows, 'meas')       = srDocObjects[1].CellValue(i, 'to_meas');	
			srDocObjects[0].CellValue(intRows, 'pck_qty')    = srDocObjects[1].CellValue(i, 'to_pck_qty');	
			srDocObjects[0].CellValue(intRows, 'pck_ut_cd')  = srDocObjects[1].CellValue(i, 'to_pck_ut_cd');	
			srDocObjects[0].CellValue(intRows, 'intg_bl_seq')= srDocObjects[1].CellValue(i, 'to_intg_bl_seq');
				
			//현재 Row 삭제
			srDocObjects[1].RowDelete(i, false);

			//현 S/R HBL List에 BL존재여부 확인 및 미 존재시 조회조건 초기화
			if(srDocObjects[1].rows==1){
				frm1.cur_obrd_dt_tm.value = '';
				frm1.cur_pol_cd.value = '';
				frm1.cur_pod_cd.value = '';
			}
			
			
		}
	}
}

function doDispPrnrList(){
	
	if(srDocObjects[1].rows>1){
		var totRow = srDocObjects[1].rows;
		totRow--;
		for(var i = totRow; 0 < i; i--){
			srDocObjects[1].RowDelete(i, false);
		}
	}
	
	var isBegin = true;
	var arg = window.dialogArguments;
    var rtnArr = arg[0].split(';');
	var intRows= srDocObjects[1].rows;
	var newRow  = intRows-1;
	for(var i = 0; i < rtnArr.length; i++){
		var hblArr = rtnArr[i].split('^');
		if(rtnArr[i]!=''){
			srDocObjects[1].DataInsert(newRow);
			   
			srDocObjects[1].CellValue(intRows, 'to_bkg_no')   = hblArr[0];
			srDocObjects[1].CellValue(intRows, 'to_bl_no')    = hblArr[1];
			   
			srDocObjects[1].CellValue(intRows, 'to_shipper')  = hblArr[2];
			   
			srDocObjects[1].CellValue(intRows, 'to_obrd_dt_tm')= hblArr[3];
			srDocObjects[1].CellValue(intRows, 'to_pol_cd')   = hblArr[4];
			srDocObjects[1].CellValue(intRows, 'to_pod_cd')   = hblArr[5];
			   
			srDocObjects[1].CellValue(intRows, 'to_grs_wgt')  = hblArr[6];
			srDocObjects[1].CellValue(intRows, 'to_meas')     = hblArr[7];
			srDocObjects[1].CellValue(intRows, 'to_pck_qty')  = hblArr[8];
			srDocObjects[1].CellValue(intRows, 'to_pck_ut_cd')= hblArr[9];
			   
			srDocObjects[1].CellValue(intRows, 'to_intg_bl_seq') = hblArr[10];
			   
		    //저장된 HBL인 경우
			if(hblArr[11]=='R'){
				srDocObjects[1].CellEditable(intRows, 'to_sr_select') = false;
			}
			   
			//처음인 경우
			if(isBegin){
				frm1.cur_obrd_dt_tm.value = hblArr[3];
				frm1.cur_pol_cd.value     = hblArr[4];
				frm1.cur_pod_cd.value     = hblArr[5];
				
				isBegin = false;
			}
		}
	}
}

function sheet1_OnSearchEnd(errMsg){
	doDispPrnrList();
	
	var docCnt = srDocObjects[0].rows;
	docCnt--;
	for(var i = docCnt; 0 < i; i--){
		for(var j = 1; j < srDocObjects[1].rows; j++){
			if(srDocObjects[0].CellValue(i, 'bl_no')==srDocObjects[1].CellValue(j, 'to_bl_no')){
				srDocObjects[0].RowDelete(i, false);
				break;
			}
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
            cal.select(formObj.obrd_strdt, 'obrd_strdt', formObj.obrd_enddt, 'obrd_enddt', 'MM-dd-yyyyy');
        break;
        
        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
            var cal = new calendarPopupFromTo();
            cal.displayType = "date";
            cal.select(formObj.eta_strdt, 'eta_strdt', formObj.eta_enddt, 'eta_enddt', 'MM-dd-yyyyy');
        break;        

        case 'DATE2':   //달력 조회 팝업 호출      
             var cal = new calendarPopup();
             cal.select(formObj.f_cre_dt_begin, 'f_cre_dt_begin', 'MM-dd-yyyyy');
        break;        
    }
}

/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();

	document.frm1.f_CurPage.value = callPage;	
	doWork('SEARCHLIST');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){

	document.frm1.f_CurPage.value = 1;
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
var srDocObjects = new Array();
var sheetCnt = 0;

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for(var i=0;i<srDocObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(srDocObjects[i], SYSTEM_FIS);

        initSheet(srDocObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(srDocObjects[i]);
    }
}


/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   srDocObjects[sheetCnt++] = sheet_obj;
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
                style.height = 190;
                
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
                InitColumnInfo(13, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
                
                var formObj  = document.form;
                
                var HeadTitle1 ="";
                
				
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('SEE_BMD_0041_HDR1'), true);
                
                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, 0,  dtCheckBox,       45,   daCenter,  false,    "sr_select",    	false,      "",       dfNone,  	0,     true,      true);
                InitDataProperty(0, 1,  dtData,          110,   daLeft,    false,    "bkg_no",  	    false,      "",       dfNone,   0,     false,     false);
      			InitDataProperty(0, 2,  dtData,     	 110,   daLeft,    false,    "bl_no",     false,      "",       dfNone,  	0,     false,     false);
      			
                InitDataProperty(0, 3,  dtData,          100,   daLeft,    false,    "shipper",  		false,      "",       dfNone,   0,     false,     false);

      			
                InitDataProperty(0, 4,  dtData,           70,   daCenter,  false,    "obrd_dt_tm",		false,      "",       dfNone,   0,     false,     false);
      			InitDataProperty(0, 5,  dtData,     	  50,   daLeft,    false,    "pol_cd",    		false,      "",       dfNone,  	0,     false,     false);
                InitDataProperty(0, 6,  dtData,           50,   daLeft,    false,    "pod_cd",		    false,      "",       dfNone,   0,     false,     false);
                
      			InitDataProperty(0, 7,  dtData,     	  80,   daRight,   false,    "grs_wgt",    	    false,      "",       dfNone,  	0,     false,     false);
                InitDataProperty(0, 8,  dtData,           80,   daRight,   false,    "meas",	        false,      "",       dfNone,   0,     false,     false);
      			InitDataProperty(0, 9,  dtData,     	  80,   daRight,   false,    "pck_qty",    	    false,      "",       dfNone,  	0,     false,     false);
                InitDataProperty(0,10,  dtData,           60,   daLeft,    false,    "pck_ut_cd",		false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0,11,  dtHidden, 		   0, 	daCenter,  false, 	 "intg_bl_seq");
                InitDataProperty(0,12,  dtHidden, 		   0, 	daCenter,  false, 	 "used_chk");

           }                                                      
        break;
 		case 2:     //HBL List
			with (sheetObj) {
                // 높이 설정
                style.height = 150;
                
                //전체 갯수표시 위치 지정. 0: 사라지게함.
				CountPosition = 0;
				
                //전체 너비 설정
                SheetWidth = mainTable.clientWidth;
               // SheetWidth = 400;

                //Host정보 설정[필수][HostIp, Port, PagePath]
                if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

                //전체Merge 종류 [선택, Default msNone]
                //MergeSheet = msHeaderOnly;
                MergeSheet = msHeaderOnly;

               //전체Edit 허용 여부 [선택, Default false]
                Editable = true;

                //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
                InitRowInfo( 1, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(13, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
                
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('SEE_BMD_0041_HDR2'), true);
                
                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,        KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, 0,  dtCheckBox,       45,   daCenter,  false,    "to_sr_select",       false,      "",       dfNone,  	0,     true,      true);
                InitDataProperty(0, 1,  dtData,          110,   daLeft,    false,    "to_bkg_no",  	false,      "",       dfNone,   0,     false,     false);
      			InitDataProperty(0, 2,  dtData,     	 110,   daLeft,    false,    "to_bl_no",       false,      "",       dfNone,  	0,     false,     false);
      			
                InitDataProperty(0, 3,  dtData,          100,   daLeft,    false,    "to_shipper",  	false,      "",       dfNone,   0,     false,     false);

      			
                InitDataProperty(0, 4,  dtData,           70,   daCenter,  false,    "to_obrd_dt_tm",	false,      "",       dfNone,   0,     false,     false);
      			InitDataProperty(0, 5,  dtData,     	  50,   daLeft,    false,    "to_pol_cd",    	false,      "",       dfNone,  	0,     false,     false);
                InitDataProperty(0, 6,  dtData,           50,   daLeft,    false,    "to_pod_cd",		false,      "",       dfNone,   0,     false,     false);
                
      			InitDataProperty(0, 7,  dtData,     	  80,   daRight,   false,    "to_grs_wgt",    	false,      "",       dfNone,  	0,     false,     false);
                InitDataProperty(0, 8,  dtData,           80,   daRight,   false,    "to_meas",	    false,      "",       dfNone,   0,     false,     false);
      			InitDataProperty(0, 9,  dtData,     	  80,   daRight,   false,    "to_pck_qty",    	false,      "",       dfNone,  	0,     false,     false);
                InitDataProperty(0,10,  dtData,           60,   daLeft,    false,    "to_pck_ut_cd",	false,      "",       dfNone,   0,     false,     false);
                InitDataProperty(0,11,  dtHidden, 		   0, 	daCenter,  false, 	 "to_intg_bl_seq");
                
                InitDataProperty(0,12,  dtData, 		  10, 	daCenter,  false, 	 "to_is_save");
           }                                                      
	    break;
    }
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnClick(sheetObj, row, col){
	var colStr = sheetObj.ColSaveName(col);
	//Item 코드(Commidity)
	if(colStr=="sr_select"){
		//선택하는 경우
		if(sheetObj.CellValue(row, colStr)==0){
			
			//최초 선택인 경우
			if(frm1.cur_obrd_dt_tm.value==''){
				frm1.cur_obrd_dt_tm.value = sheetObj.CellValue(row, 'obrd_dt_tm');
				frm1.cur_pol_cd.value     = sheetObj.CellValue(row, 'pol_cd');
				frm1.cur_pod_cd.value     = sheetObj.CellValue(row, 'pod_cd');
			}
			else{
				if(frm1.cur_obrd_dt_tm.value!=sheetObj.CellValue(row, 'obrd_dt_tm')||
					frm1.cur_pol_cd.value!= sheetObj.CellValue(row, 'pol_cd')||
					frm1.cur_pod_cd.value!= sheetObj.CellValue(row, 'pod_cd'))
				  {
					 //OnBoard Date, POL 그리고  POD가 동일해야 하나의 Shipping Request로 묶일 수 있습니다!
					 alert(getLabel('SEA_COM_ALT006'));
					 sheetObj.CellValue(row, colStr) = 0;
				  }
			}
		}
	}
}


function sheet1_OnClick(sheetObj, row, col){
	var colStr = sheetObj.ColSaveName(col);
	//Item 코드(Commidity)
	if(colStr=="sr_select"){
		//선택하는 경우
		if(sheetObj.CellValue(row, colStr)==0){
			
			//최초 선택인 경우
			if(frm1.cur_obrd_dt_tm.value==''){
				frm1.cur_obrd_dt_tm.value = sheetObj.CellValue(row, 'obrd_dt_tm');
				frm1.cur_pol_cd.value     = sheetObj.CellValue(row, 'pol_cd');
				frm1.cur_pod_cd.value     = sheetObj.CellValue(row, 'pod_cd');
			}
		}
	}
}

function sheet1_OnChange(sheetObj, row, col){
	var colStr = sheetObj.ColSaveName(col);
	//Item 코드(Commidity)
	if(colStr=="sr_select"){
		if(sheetObj.CellValue(row, colStr)==1){
			if(frm1.cur_obrd_dt_tm.value!=sheetObj.CellValue(row, 'obrd_dt_tm')||
				frm1.cur_pol_cd.value!= sheetObj.CellValue(row, 'pol_cd')||
				frm1.cur_pod_cd.value!= sheetObj.CellValue(row, 'pod_cd'))
			  {
				  //OnBoard Date, POL 그리고  POD가 동일해야 하나의 Shipping Request로 묶일 수 있습니다!
				  alert(getLabel('SEA_COM_ALT006')+ "\n\n: SEE_BMD_0041.515");
				  sheetObj.CellValue(row, colStr) = 0;
			  }	
		}
		else{
			var loopNum = 0;
			
			for(var i = 1; i < sheetObj.rows; i++){
				if(sheetObj.CellValue(i, 'sr_select')==1){
					loopNum++;
				}
			}
			
			if(srDocObjects[1].rows==1){
				if(loopNum==0){
					frm1.cur_obrd_dt_tm.value = '';
					frm1.cur_pol_cd.value     = '';
					frm1.cur_pod_cd.value     = '';
				}
			}
		}
	}
}

/*

InitDataProperty(0, 0,  dtCheckBox,       45,   daCenter,  false,    "sr_select",    	false,      "",       dfNone,  	0,     true,      true);
InitDataProperty(0, 1,  dtData,          110,   daLeft,    false,    "bkg_no",  	    false,      "",       dfNone,   0,     false,     false);
InitDataProperty(0, 2,  dtData,     	 110,   daLeft,    false,    "house_bl_no",     false,      "",       dfNone,  	0,     false,     false);
	
InitDataProperty(0, 3,  dtData,          100,   daLeft,    false,    "shipper",  		false,      "",       dfNone,   0,     false,     false);

	
InitDataProperty(0, 4,  dtData,           70,   daCenter,  false,    "obrd_dt_tm",		false,      "",       dfNone,   0,     false,     false);
InitDataProperty(0, 5,  dtData,     	  50,   daLeft,    false,    "pol_cd",    		false,      "",       dfNone,  	0,     false,     false);
InitDataProperty(0, 6,  dtData,           50,   daLeft,    false,    "pod_cd",		    false,      "",       dfNone,   0,     false,     false);

InitDataProperty(0, 7,  dtData,     	  80,   daRight,   false,    "grs_wgt",    	    false,      "",       dfNone,  	0,     false,     false);
InitDataProperty(0, 8,  dtData,           80,   daRight,   false,    "meas",	        false,      "",       dfNone,   0,     false,     false);
InitDataProperty(0, 9,  dtData,     	  80,   daRight,   false,    "pck_qty",    	    false,      "",       dfNone,  	0,     false,     false);
InitDataProperty(0,10,  dtData,           60,   daLeft,    false,    "pck_ut_cd",		false,      "",       dfNone,   0,     false,     false);
InitDataProperty(0,11,  dtHidden, 		   0, 	daCenter,  false, 	 "intg_bl_seq");

	var formObj  = document.form;
	
	var retArray = "";	
	
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "house_bl_no"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "master_bl_no"));
		 
	retArray += sheetObj.CellValue(Row, "house_bl_no");
	retArray += "|";
	retArray += sheetObj.CellValue(Row, "master_bl_no");
	retArray += "|";
	retArray += sheetObj.CellValue(Row, "ca_sts_cd");
	retArray += "|";
	retArray += sheetObj.CellValue(Row, "intg_bl_seq");
	retArray += "|";
	retArray += sheetObj.CellValue(Row, "bkg_no");
		 	
	window.returnValue=retArray;
	
	window.close();
}
*/