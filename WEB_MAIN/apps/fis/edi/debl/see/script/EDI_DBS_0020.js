function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj  = docObjects[0];
    var formObj   = document.frm1;

    switch(srcName) {
    
	   case "DEFAULT":
		    formObj.f_cmd.value = -1;
	        formObj.submit();
	        
	   break;
       
       case "SEARCHLIST":
           formObj.f_cmd.value = SEARCHLIST;

           sheetObj.DoSearch4Post("./EDI_DBS_0020GS.clt", FormQueryString(formObj));
       break;
       
       case "TRANSMIT":
    	   if(transmitChk()) {
	       		
    		    formObj.f_cmd.value = MODIFY01;
    		    
    		    var Result = sheetObj.DoAllSave("EDI_DBS_0020GS.clt", FormQueryString(formObj),true);
    		    if(Result){
    		    	alert("Transmit success! ");
    		    	doWork('SEARCHLIST');
    		    }
	       	}
           
       break;
       
       case "CANCEL":
    	   if(cancelChk()) {
	       		
    		    formObj.f_cmd.value = MODIFY02;
    		    
    		    var Result = sheetObj.DoAllSave("EDI_DBS_0020GS.clt", FormQueryString(formObj),true);
    		    if(Result){
    		    	alert("Cancel success! ");
    		    	doWork('SEARCHLIST');
    		    }
	       	}
           
       break;
       
       case "DELETE":
		   if(deleteChk()) {
			    formObj.f_cmd.value = MODIFY03;
			    
			    var Result = sheetObj.DoAllSave("EDI_DBS_0020GS.clt", FormQueryString(formObj),true);
			    if(Result){
    		    	alert("Delete success! ");
    		    	doWork('SEARCHLIST');
    		    }
	    	}
		break;
		
       case "test":
    	   formObj.f_cmd.value = COMMAND01;
		    
		   var Result = sheetObj.DoSearch4Post("EDI_DBS_0020GS.clt", FormQueryString(formObj));
       break;
    }
}

function getMain(reqVal){
	
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
	
	initFinish();
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
		            style.height = 430;
		            
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
		            InitColumnInfo(16, 0, 0, true);
		
		            // 해더에서 처리할 수 있는 각종 기능을 설정한다
		            InitHeadMode(true, true, true, true, false,false) ;
		            
		            //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		            InitHeadRow(0, getLabel('EDI_DBS_0020_HDR1'), true);
		            
		             var cnt = 0;
		             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		             InitDataProperty(0, cnt++,  dtCheckBox,	 40,    daCenter,    true,    "chk",      	 		false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtData,		120,    daCenter,    true,    "ref_no",      	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,		120,    daCenter,    true,    "mbl_no",      	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		 40,    daCenter,    true,    "trns_tp",    	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		 55,    daCenter,    true,    "msg_sts",    	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		 80,    daCenter,    true,    "error_cd",   	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		 90,    daCenter,    true,    "abt_no",    		false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		120,    daCenter,    true,    "pol_nm",    	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		120,    daCenter,    true,    "pod_nm",    		false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		120,    daCenter,     true,   "trnk_vsl_nm",  	false,   "",       dfNone,     	0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		 70,    daCenter,     true,   "etd_dt_tm",   	false,   "",       dfNone,     	0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		100,    daCenter,    true,    "modi_tms",    	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtHidden,        0,    daCenter,    true,    "intg_bl_seq", 	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtHidden,        0,  	daCenter,    true,    "msg_no",      false,   "",       dfNone,          0,     false,        false);
		             InitDataProperty(0, cnt++,  dtData,        110,  	daCenter,    true,    "cntr_no",      false,   "",       dfNone,          0,     false,        false);
		             InitDataProperty(0, cnt++,  dtData,   		 60,    daCenter,    true,    "rgst_usrid",    	false,   "",       dfNone,          0,     false,      false);
		             
	    } 
		break;
         
     }
}

 /**
  * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
  * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
  */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr = sheetObj.ColSaveName(Col);
	//if(colStr == "mbl_no"){
	var formObj  = document.frm1;
	//doProcess = true;
	formObj.f_cmd.value = "";
	
	var paramStr = "./EDI_DBS_0010.clt?f_cmd="+SEARCHLIST
											+"&f_bl_type="+sheetObj.CellValue(Row, "bl_type")
											+"&trns_tp="+sheetObj.CellValue(Row, "trns_tp")
											+"&msg_no="+sheetObj.CellValue(Row, "msg_no");
	parent.mkNewFrame('DE Customs EDI (Ocean)', paramStr);
}
  
function sheet1_OnSearchEnd(){
	
}

/**
* 화면로드 후 초기값 세팅
*/
function initFinish(){
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(document.frm1.f_rgst_strdt, 180, document.frm1.f_rgst_enddt, 30);
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
	        cal.select(formObj.f_rgst_strdt, 'f_rgst_strdt', formObj.f_rgst_enddt, 'f_rgst_enddt', 'MM-dd-yyyy');
	    break;
	    case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
        	var cal = new calendarPopupFromTo();
	        cal.displayType = "date";
	        cal.select(formObj.f_etd_strdt, 'f_etd_strdt', formObj.f_etd_enddt, 'f_etd_enddt', 'MM-dd-yyyy');
	    break;
	    case 'DATE13':   //달력 조회 From ~ To 팝업 호출 
	        var cal = new calendarPopupFromTo();
	        cal.displayType = "date";
	        cal.select(formObj.f_rgst_strdt1, 'f_rgst_strdt1', formObj.f_rgst_enddt1, 'f_rgst_enddt1', 'MM-dd-yyyy');
	    break;
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
					}
				}
				
				doWork('SEARCHLIST');
				 
		    break;
    	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: EDI_DBS_0020.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: EDI_DBS_0020.002");
        }
	}
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	//alert("Transmit success! ");
	//alert("Success! ");
	//doWork('SEARCHLIST');
}


/**
* IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
*/
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj  = document.frm1;
	
	switch (sheetObj.ColSaveName(Col)) {
		case "chk" :
			var chk = sheetObj.FindCheckedRow("chk").split('|');
        	var len = chk.length;
        	
        	formObj.chk_sts.value = sheetObj.CellValue(chk[0],"msg_sts");
        	//sheetObj.CellValue(chk[i-1],"msg_sts");
        	for( var i = 1; i < len-1 ; i++ ){ 
        		if(sheetObj.CellValue(chk[i],"msg_sts") != sheetObj.CellValue(Row,"msg_sts")){
        			alert("Please select the same status.");
        			sheetObj.CellValue(Row,"chk") = 0;
        		}
        	}
		break;
	
	}
}

function transmitChk(){
	
	var chkVal = true;
	var formObj  = document.frm1;
	
	if(formObj.chk_sts.value == "Transmit"){
		chkVal = false;
		alert("After Cancel you can transmit.");
	}
		
	return chkVal;
}

function cancelChk(){
	
	var chkVal = true;
	var formObj  = document.frm1;
	
	if(formObj.chk_sts.value != "Transmit"){
		chkVal = false;
		alert("After transmit you can Cancel.");
	}
		
	return chkVal;
}

function deleteChk(){
	
	var chkVal = true;
	var formObj  = document.frm1;
	
	if(formObj.chk_sts.value == "N/A" || formObj.chk_sts.value == "Upload"){
		chkVal = false;
		alert("Can't Delete.");
	}
		
	return chkVal;
}