/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0130.jsp
*@FileTitle  : Package Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/05
=========================================================*/
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch("MDM_MCM_0130GS.clt", FormQueryString(formObj) );
            }
            var intRows=sheetObj.LastRow() + 1;
            for ( var i=1 ; i < intRows ; i++ ) {
            	if ( sheetObj.GetCellValue(i, "db_value") == "Y" ) {
            		sheetObj.SetCellEditable(i, "pck_ut_cd",0);
            	} else {
            		sheetObj.SetCellEditable(i, "pck_ut_cd",1);
            	}
            }
            //sheetObj.ShowDebugMsg = false;
       break;
       case "NEW":
       break;
       case "ROWADD":
    	   var intRows=sheetObj.LastRow() + 1;
		   sheetObj.DataInsert(intRows);
       break;
       case "MODIFY":
       		if ( !fncGridCheck() ) return false;
            formObj.f_cmd.value=MODIFY;
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true;
                sheetObj.DoSave("MDM_MCM_0130GS.clt", FormQueryString(formObj),"ibflag",false);
                var intRows=sheetObj.LastRow() + 1;
	            for ( var i=1 ; i < intRows ; i++ ) {
	            	if ( sheetObj.GetCellValue(i, "db_value") == "Y" ) {
	            		sheetObj.SetCellEditable(i, "pck_ut_cd",0);
	            	} else {
	            		sheetObj.SetCellEditable(i, "pck_ut_cd",1);
	            	}
	            }
            }
       break;
       case "EXCEL":
    	   if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
//	   			sheetObj.Down2Excel({ HiddenColumn:1,Merge:true,TreeLevel:false});
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
       break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
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
            
          (11, 0, 0, true);

          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
          var headers = [ { Text:getLabel('MDM_MCM_0130_HDR'), Align:"Center"} ];
          InitHeaders(headers, info);

          var cols = [ {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"CheckBox",  Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"pck_ut_cd",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
              {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:"pck_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
              {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"ams_pck_cd_val",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"afr_pck_cd_val",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
              {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"cstms_pck_cd_val",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
              {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"descr",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"db_value" },
              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
           
          InitColumns(cols);          
          SetSheetHeight(500);
          SetColProperty(0 ,"pck_ut_cd" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
          SetColProperty(0 ,"ams_pck_cd_val" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
          SetColProperty(0 ,"afr_pck_cd_val" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
          SetColProperty(0 ,"cstms_pck_cd_val" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
          SetEditable(1);
          resizeSheet();
          
                   }

            
           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	//Save success!
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnClick(sheetObj,Row,Col){
    switch (sheetObj.ColSaveName(Col)) {
        case "cstms_cntr_cd" :
        	/*
            var rtnary=new Array();
	   		rtnary[0]="1";
   	        var rtnVal =  ComOpenWindow('./CMM_POP_0080.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:812px;dialogHeight:480px" , true);
   	        //window.open ('./CMM_POP_0010.clt', "list", "scrollbars=no,fullscreen=no,width=1024,height=480");
   	        if (rtnVal == null) {
			 	return;
			}
			//alert("rtnVal==>"+rtnVal);
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(Row, "cstms_cntr_cd",rtnValAry[0]);
			*/
		break;
	}
}
/**
 * 콤보 조회
 */
function doAction(pck_ut_cd){
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchPackageKeyCode&s_pck_ut_cd='+pck_ut_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//[Package Code] is duplicated!
			alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_PKGECD') + ": " + doc[1]);
			var sheetObj=docObjects[0];
			var intRow=sheetObj.LastRow();
			sheetObj.SetCellValue(intRow, "pck_ut_cd","");
		}	
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
    	case "pck_ut_cd" :
    		var strCd=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strCd.toUpperCase());
			doAction(sheetObj.GetCellValue(Row, Col));
		break;
		case "pck_nm" :
			var strPckNm=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strPckNm.toUpperCase());
		break;
	}
}
function fncGridCheck() {
	var sheetObj=docObjects[0];
	var intRow=sheetObj.LastRow() + 1;
	for ( var i=1 ; i < intRow ; i++ ) {
		if ( sheetObj.GetCellValue(i, "pck_ut_cd") == "" || sheetObj.GetCellValue(i, "pck_ut_cd") == null ) {
			//Please enter a [Package Code]!
			alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_PKGECD'));
			return false;
		}
	}
	 var dupRow=sheetObj.ColValueDup("pck_ut_cd");
	 if(dupRow >0){
		 alert(getLabel('MDM_COM_ALT009'));
		 return false;
	 }
	return true;
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="descr"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 1);
	}
}
