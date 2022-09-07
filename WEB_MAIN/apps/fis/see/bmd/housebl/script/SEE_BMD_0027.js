function doWork(srcName){

	var sheetObj = docObjects[0];
    var formObj  = document.frm1;
    
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value = SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                    sheetObj.DoSearch4Post("./SEE_BMD_0027GS.clt", FormQueryString(formObj));
                }
    	   
                break;    
                
      	   case "APPLY":
      		 var totSize = sheetObj.Rows;
      		 var rtnStr = '';
      		 var isWork = false;
      		 
      		 for(var i = 1; i < totSize; i++){
      			 if(sheetObj.CellValue(i, 'ck')==1){
 	      			rtnStr += sheetObj.CellValue(i, 'cntr_no');
	      			rtnStr += ',';
	      			rtnStr += sheetObj.CellValue(i, 'soc_flg');
	      			rtnStr += ',';
	      			rtnStr += sheetObj.CellValue(i, 'cntr_tpsz_cd');
	      			rtnStr += ',';
	      			rtnStr += sheetObj.CellValue(i, 'cntr_sprl_trdp_cd');
	      			rtnStr += ',';
	      			rtnStr += sheetObj.CellValue(i, 'cntr_sprl_trdp_nm');
	      			rtnStr += '|';
	      			isWork = true;
      			 }
      		 }
      		 
      		 if(isWork){
	      		window.returnValue = rtnStr;
	      		window.close();
      		 }
      		 else{
      			 //사용할 Container를 선택하여 주십시오!
      			alert(getLabel('FMS_COM_ALT001'));
      		 }
           
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
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEE_BMD_0027.002"); 
        }
	}
}

function openPopUp(){
   		var rtnary = new Array(1);
   		rtnary[0] = "1";
   		rtnary[1] = "";
   		rtnary[2] = window;
   		
		var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp=PR', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px");
        
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}
		else{
			var rtnValAry = rtnVal.split("|");
				frm1.f_cntr_sprl_trdp_cd.value = rtnValAry[0];//trdp_cd
				frm1.f_cntr_sprl_trdp_nm.value = rtnValAry[2];//eng_nm
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

	document.form.f_CurPage.value = 1;
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

	var arg=window.dialogArguments;
	
	frm1.openMean.value = arg[0];
	if(arg[1]!=undefined){
		frm1.rgst_cntr_yn.value = arg[1];
	}
	
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
                style.height = 320;
                
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
                InitHeadRow(0, getLabel('SEE_BMD_0027_HDR1'), true);
                
                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, 0,  dtCheckBox,       50,   daCenter,  false,    "ck",    	false,      "",       dfNone,  	   0,     true,      true);
                InitDataProperty(0, 1,  dtData,           60,   daCenter,  false,    "cntr_sprl_trdp_cd", false,      "",       dfNone,      0,     false,    false);
                InitDataProperty(0, 2,  dtData,          120,   daLeft,    false,    "cntr_sprl_trdp_nm", false,      "",       dfNone,      0,     false,    false);
                
      			InitDataProperty(0, 3,  dtData,          100,   daLeft,    false,    "cntr_no",   	false,      "",       dfNone,      0,     false,     false);
      			InitDataProperty(0, 4,  dtData,           60,   daLeft,    false,    "cntr_tpsz_cd",   	false,      "",       dfNone,      0,     false,     false);

      			InitDataProperty(0, 5,  dtCombo,          90,   daCenter,  false,    "soc_flg",   	false,      "",       dfNone,      0,     false,     false);
      			
      			InitDataProperty(0, 6,  dtData,           80,   daCenter,  false,    "agmt_dt",   	false,      "",       dfNone,      0,     false,     false);
      			InitDataProperty(0, 7,  dtData,           80,   daCenter,  false,    "eff_dt",   	false,      "",       dfNone,      0,     false,     false);

      			InitDataProperty(0, 8,  dtHidden, 		   0, 	daCenter,  false, 	"Indexing");
      			
      			
                //콤보항목설정[ROW, COL, COMBO-TEXT, COMBO-CODE, DEFAULT-TEXT]
                InitDataCombo (0, 'soc_flg',LEASECD1, LEASECD2);
           }                                                      
           break;
    }
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].CellValue(1, 'Indexing'), getObj('pagingTb'));
	
	// rgst_cntr_yn 이 있으면 apply button 숨김.
	if(frm1.rgst_cntr_yn.value!=""){
		getObj('apply').style.display = 'none';
	}
	
} 
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	// rgst_cntr_yn값이 있을때만 실행.
	if(formObj.rgst_cntr_yn.value!=""){
		var rtnStr = sheetObj.CellValue(Row, 'cntr_no');
		window.returnValue = rtnStr;
  		window.close();
	}
}