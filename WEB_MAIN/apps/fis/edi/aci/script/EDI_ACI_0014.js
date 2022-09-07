
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("./EDI_ACI_0014GS.clt", FormQueryString(formObj) );
                }
    	   break;   
    	   case "TRANSMIT":
    		   	for(var i=2; i<=sheetObj.LastRow();i++){
    		   		if(sheetObj.GetCellValue(i ,"chk") == "1"){
    		   			if( confirm(getLabel('FMS_COM_CFMSENDEDI')) ){
    	  					formObj.f_cmd.value=COMMAND01;
    	  					docObjects[0].DoSave("./EDI_ACI_0014GS.clt", FormQueryString(formObj), "ibflag", false);
    	  				}
    		   		}
   		    	}
  				
          break;
   	   case "DELETE_TRANSMIT":
	   		for(var i=2; i<=sheetObj.LastRow();i++){
		   		if(sheetObj.GetCellValue(i ,"chk") == "1"){
		   		   if( confirm(getLabel('FMS_COM_CFMSENDEDI')) ){
		   			   	formObj.f_cmd.value=COMMAND02;
							sheetObj.DoSave("./EDI_ACI_0014GS.clt", FormQueryString(formObj), "ibflag", false);
					}
			   	}
	   		}
          break;
           break;
       	   case "CLOSE":
       		   	ComClosePopup(); 
       	   break;	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: EDI_ACI_0014.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: EDI_ACI_0014.002");
        }
	}
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value=callPage;	
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
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
    var arg=parent.rtnary;
	var formObj=document.frm1;
	
	formObj.f_act_rsn_cd.disabled = true;
	doWork('SEARCHLIST');
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
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
	          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	          
//	          MSG_KEY['EDI_ACI_0014_HDR_1'] = 'No.|CHK|B/L No|CCN|Close Status|House Bill Status|House Bill Status|Match Status';
//	          MSG_KEY['EDI_ACI_0014_HDR_2'] = 'No.|CHK|B/L No|CCN|Close Status|Filing Status|Risk Assessment|Match Status';
	          
	          var headers = [ { Text:getLabel('EDI_ACI_0014_HDR_1'), Align:"Center"},
	  		                  { Text:getLabel('EDI_ACI_0014_HDR_2'), Align:"Center"} ];
	          InitHeaders(headers, info);
	
	          var cols = [ {Type:"Seq",       Hidden:0,  Width:30,  Align:"Center",  ColMerge:0,   SaveName:"f_seq",    	KeyField:0},
	                       {Type:"Radio",     Hidden:0,  Width:35,  Align:"Center",  ColMerge:0,   SaveName:"chk",		 	KeyField:0,                   Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:0, TrueValue : "Y", FalseValue : "N"},
	                       {Type:"Text",      Hidden:0,  Width:200, Align:"Left",    ColMerge:0,   SaveName:"hbl_no", 	    KeyField:0,   CalcLogic:"",   Format:"",    UpdateEdit:0, InsertEdit:1, TreeCol:1 ,  LevelSaveName:"level" },
	                       {Type:"Text",      Hidden:0,  Width:150, Align:"Left",    ColMerge:0,   SaveName:"ccn_no", 	    KeyField:0,   CalcLogic:"",   Format:"",    UpdateEdit:0, InsertEdit:0 },
	                       {Type:"Text",      Hidden:1,  Width:100, Align:"Center",    ColMerge:0,   SaveName:"hbl_cmpl_flg", 	    KeyField:0,   CalcLogic:"",   Format:"",    UpdateEdit:0, InsertEdit:0 },
	                       {Type:"Combo",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"msg_sts_cd",   KeyField:0,   CalcLogic:"",   Format:"",    UpdateEdit:0, InsertEdit:0 },
	                       {Type:"Combo",     Hidden:0,  Width:130, Align:"Left",    ColMerge:0,   SaveName:"rsk_ass_cd",   KeyField:0,   CalcLogic:"",   Format:"",    UpdateEdit:0, InsertEdit:0 },
	                       {Type:"Combo",     Hidden:1,  Width:130, Align:"Left",    ColMerge:0,   SaveName:"mtch_sts_cd",  KeyField:0,   CalcLogic:"",   Format:"",    UpdateEdit:0, InsertEdit:0 },
	                       {Type:"Text",      Hidden:1,  Width:100, Align:"Left",    ColMerge:0,   SaveName:"pre_hbl_no",  	KeyField:0,   CalcLogic:"",   Format:"",    UpdateEdit:0, InsertEdit:0 },
	                       {Type:"Text",      Hidden:1,  Width:100, Align:"Left",    ColMerge:0,   SaveName:"level",        KeyField:0,   CalcLogic:"",   Format:"",    UpdateEdit:0, InsertEdit:0 },
	                       {Type:"Status",    Hidden:1,  Width:0,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" }, 
	                       {Type:"Text",      Hidden:1,  Width:0,   Align:"Center",  ColMerge:0,   SaveName:"Indexing" } 
	                       ];
	           
	          InitColumns(cols);
	          SetEditable(1);
	          SetColProperty('msg_sts_cd', {ComboText:MSG_STS_NM, ComboCode:MSG_STS_CD} );
		      SetColProperty('rsk_ass_cd', {ComboText:DSPO_NM, ComboCode:DSPO_CD} );
		      SetColProperty('mtch_sts_cd', {ComboText:DSPO_NM, ComboCode:DSPO_CD} );	          
	          SetSheetHeight(400);
	          SetHeaderRowHeight(20);
      
           }                                                      
           break;
    }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	
	sheetObj.ShowTreeLevel(-1);
	
    
	//하위레벨 라디오박스 제거
    var info = {Type: "Text", Edit: 0};
    for(var j=sheetObj.HeaderRows(); j < sheetObj.LastRow(); j++) {
    	var myLevel = sheetObj.GetCellValue(j,"level");
    	var nextLevel = sheetObj.GetCellValue(j+1,"level");
    	
    	if(myLevel >= nextLevel){
    		sheetObj.InitCellProperty(j,"chk", info);
    		sheetObj.SetCellValue(j,"chk", "");	    
    	}
    }
	sheetObj.InitCellProperty(sheetObj.LastRow(),"chk", info);
	sheetObj.SetCellValue(sheetObj.LastRow(),"chk", "");	    

	//doDispPaging(sheetObj.GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

function sheet1_OnClick(sheetObj, Row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "chk" && sheetObj.GetCellValue(Row,"chk") == 0){
		formObj.f_clz_ccn_no.value = sheetObj.GetCellValue(Row,"hbl_no");
	}
}

function sheet1_OnSaveEnd(sheetObj, errCd, errMsg){
	if(errMsg != ""){
		alert(errMsg);
	}
	doWork("SEARCHLIST");
}

function chgSmtTp(){
	var formObj = document.frm1;
	
	if(formObj.f_smt_tp_cd.value == "Amendment"){
		formObj.f_act_rsn_cd.disabled = false;
	}else{
		formObj.f_act_rsn_cd.value = '';
		formObj.f_act_rsn_cd.disabled = true;
	}
}