/*
 * 2016/02/17 LSY 추가
 * #51932 [ZEN] Trade partner group 컬럼 추가
 */
function fncTpCodeSearch() {
	var formObj=document.form;
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
           case "SELECT":
        	   	var retVal = "";
        	   	var cnt = 0;
	             var rows=sheetObj.LastRow() + 1 ;

   	             if (cnt > 0) {
   	            	retVal = retVal.substr(0, retVal.length - 1);
   	             }
   	             ComClosePopup(retVal); 
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                //if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                     sheetObj.DoSearch("CMM_POP_0420GS.clt", FormQueryString(formObj) );
               // }
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
	
	console.log(arg[0]);
	formObj.f_loc_cd.value = arg[0];
	formObj.f_loc_nm.value = arg[1];
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
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
             
        
		           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		
		           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		           var headers = [ { Text:"UN Location Code|Loction Code|Loction Name", Align:"Center"} ];
		          // var headers = [ { Text:getLabel('cnt_cd|cnt_eng_nm'), Align:"Center"} ];
		           InitHeaders(headers, info);
		
		           var cols = [ {Type:"Text",  Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"un_loc_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
		                        {Type:"Text",  Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"loc_cd",	     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                        {Type:"Text",  Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"loc_nm",		 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		            
	           		InitColumns(cols);
	           		SetEditable(1);
	              //  SetFocusAfterProcess(1);
	                SetSheetHeight(250);
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
	retArray += sheetObj.GetCellValue(Row, "un_loc_cd");
//	retArray += "|";
//	retArray += sheetObj.GetCellValue(Row, "cd_nm");
	ComClosePopup(retArray); 
}
