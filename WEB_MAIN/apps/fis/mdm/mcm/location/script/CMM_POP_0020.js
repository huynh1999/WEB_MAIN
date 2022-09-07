/*
 * 2010/08/16 김진혁 추가
 * 조회 조건 입력 후 엔터로 조회하기 위한 펑션
 */
function fncTpCodeSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                     sheetObj.DoSearch("CMM_POP_0020GS.clt", FormQueryString(formObj) );
                    //디버깅
                   // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
                   // alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));
                }
    	   break;    
    	   case "btn_new":
    	            sheetObject.RemoveAll();
    	            formObject.reset();
       	   break;
       	    case "btn_ok":
   	             var opener=window.dialogArguments.document.sheet1 ;  // opener sheet1 이름은받아오세요
 	             var rows=sheetObject.LastRow() + 1 ;
   	             for ( i=0 ; i < rows ; i++ )
   	             {
   	            	 if ( sheetObject.GetCellValue( i, "chk" ) == 1 ) {
   	                    var iRow=opener.DataInsert(-1);
   	                    for( j=0 ; j < sheetObject.LastCol(); j ++)
   	                    {
   	                        if ( sheetObject.ColSaveName(j) != "" ) {   // 현재 SaveName이 없는것들을 걸러내기위한조건
        	                    for(k=0 ; k < opener.LastCol(); k ++)
       	                        {
   	                                if ( opener.ColSaveName(k) == sheetObject.ColSaveName(j)){
   	                                	opener.SetCellValue( iRow, opener.ColSaveName(k),sheetObject.GetCellValue( i , sheetObject.ColSaveName(j)) ,0);
     	                            }
      	                       	}
   	                    	}
   	               		}
   	             	}
   	             }
   	             ComClosePopup(); 
   	             break;
       	    case "CLOSE":
       	    	ComClosePopup(); 
       	    	break;	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0020.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0020.002");
        }
	}
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
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
	var arg = parent.rtnary;
	var formObj=document.form;
	//var formObj=document.frm;
//	alert("arg===>["+arg[1]+"]");
	formObj.openMean.value = arg[0];
	formObj.s_conti_code.value = arg[1];
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    if(arg[1] !=""){
		formObj.s_continent_code.disabled=true;
		//doWork('SEARCHLIST');
	}
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
        	    with(sheetObj){
             
        	//no support[check again]CLT if (location.hostname != "") //InitHostInfo(location.hostname, location.port, page_path);
		
		           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		
		           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		           var headers = [ { Text:"Code|Name", Align:"Center"} ];
		          // var headers = [ { Text:getLabel('cnt_cd|cnt_eng_nm'), Align:"Center"} ];
		           InitHeaders(headers, info);
		
		           var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"cnt_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cnt_eng_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
		            
	           		InitColumns(cols);
	           		SetEditable(0);
	              //  SetFocusAfterProcess(1);
	                SetSheetHeight(260);
	                sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
           }

           break;
    }
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
 /*
// 2011.12.27 KeyDown
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
if(keyCode==13 && sheetObj.GetCellValue(row, "ibflag1") != "I"){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}
*/
//2012.12.21 KeyUp, sheet1_OnKeyDown 시 enter  인식이 안됨
function sheet1_OnKeyUp(sheetObj, row, col, keyCode){
if(keyCode==13 && sheetObj.GetCellValue(row, "ibflag1") != "I"){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.form;
	var openMean=formObj.openMean.value ; 
	var retArray="";	
	retArray += sheetObj.GetCellValue(Row, "cnt_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cnt_eng_nm");
	ComClosePopup(retArray); 
}
