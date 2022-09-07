//=========================================================
//*@FileName   : CMM_POP_0110.jsp
//*@FileTitle  : CMM
//*@Description: commodity pop
//*@author     : 이광훈 - commodity pop
//*@version    : 1.0 - 01/05/2009
//*@since      : 01/05/2009
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/06/10
//*@since      : 2014/06/10
//=========================================================
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
	var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	document.form.f_CurPage.value=1;
                	sheetObj.DoSearch("./CMM_POP_0110GS.clt", FormQueryString(formObj) );
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
   	                                if ( opener.ColSaveName(k) == sheetObject.ColSaveName(j))
   	                                	opener.SetCellValue( iRow, opener.ColSaveName(k),sheetObject.GetCellValue( i , sheetObject.ColSaveName(j)) ,0);
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
       	    case "NEW":
       	    	var opener = parent.opener;
        		if (opener == null) opener = parent.parent;
        		opener.mkNewFrame('Commodity Code','./MDM_MCM_0120.clt?callId=NEW');
        		ComClosePopup();       		
    		break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0110.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0110.002");
        }
	}
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	var sheetObj=docObjects[0];
    var formObj=document.form;
	document.form.f_CurPage.value=callPage;	
	if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
		docObjects[0].RemoveAll();
		sheetObj.DoSearch("./CMM_POP_0110GS.clt", FormQueryString(formObj) );
    }
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.form.f_CurPage.value=1;
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
	var arg=parent.rtnary;
	var formObj=document.form;
	formObj.openMean.value=arg[0];
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	if(arg[1]!=undefined){
		formObj.s_commodity_code.value=arg[1];
	}
	if(arg[2]!=undefined){
		formObj.s_key_word.value=arg[2];
		doWork('SEARCHLIST');
	}
	if(hs_grp_cd !='')
		form.s_hs_grp_cd.value=hs_grp_cd;
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
             (6, 0, 0, true);

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('CMM_POP_0110_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cmdt_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"cmdt_grp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:320,  Align:"Left",    ColMerge:0,   SaveName:"cmdt_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cmdt_ut1" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cmdt_ut2" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
              
             		InitColumns(cols);

             		SetEditable(0);
                    SetFocusAfterProcess(1);
                    SetSheetHeight(260);
                    sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
           }                                                      
           break;
    }
}
function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var retArray="";	
	retArray += sheetObj.GetCellValue(Row, "cmdt_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cmdt_grp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cmdt_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cmdt_ut1");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cmdt_ut2");
	retArray += "|";
	retArray += form.s_hs_grp_cd.value;
	ComClosePopup(retArray); 
}
//Enter키 입력
function sheet1_OnKeyUp(sheetObj, row, col, keyCode){
	if(keyCode==13){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}
