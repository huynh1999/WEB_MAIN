//=========================================================
//*@FileName   : MDM_MCM_0301.jsp
//*@FileTitle  : GL Code
//*@Description: GL Code
//*@author     : Kim,Jin-Hyuk - Cyberlogitec
//*@version    : 1.0 - 2011/10/07
//*@since      : 2011/10/07
//
//*@Change history:
//*@author	 : Tuan.Chau
//*@version	 : 2.0 - 2014/06/11
//*@since		 : 2014/06/11
//=========================================================
	
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
            sheetObj.DoSearch("MDM_MCM_0301GS.clt", FormQueryString(formObj) );
       break;
       case "ROWADD":
//    	    var intRows=sheetObj.LastRow() + 1;
//   			var newRows=sheetObj.DataInsert(intRows);
//   			sheetObj.SetCellValue(newRows, "use_flg",1);
   			
   			var intRows=sheetObj.LastRow()+1;
   			var newRows=intRows;
	        sheetObj.DataInsert(intRows);
	        sheetObj.SetCellValue(intRows, "use_flg","1",1);
	        sheetObj.CellComboItem(newRows,"ggl_grp_cd", {ComboText:"", ComboCode:""} );
       break;
       case "MODIFY":
    	    if ( !fncGridCheck() ) return ;
            formObj.f_cmd.value=MODIFY;
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true;
                sheetObj.DoSave("MDM_MCM_0301GS.clt", FormQueryString(formObj),"ibflag",false);
            }
       break;
       case "EXCEL":
//    	   sheetObj.Down2Excel({ HiddenColumn:1,Merge:true,TreeLevel:false});
    	   if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
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
var checkGlcdRow=0;
var checkGlcdCol=0;
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
            with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('MDM_MCM_0301_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                    {Type:"DelCheck",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"del_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:200,  Align:"Center",  ColMerge:1,   SaveName:"ggl_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"Combo",     Hidden:0, Width:180,  Align:"Center",  ColMerge:1,   SaveName:"ggl_type",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Combo",     Hidden:0, Width:180,  Align:"Center",  ColMerge:1,   SaveName:"ggl_grp_cd",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:450,  Align:"Left",    ColMerge:1,   SaveName:"rmk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
                    {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                    {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"gl_cnt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
              
                   InitColumns(cols);

             	   SetEditable(1);
                   sheetObj.SetColProperty("ggl_type", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
                   sheetObj.SetColProperty("ggl_grp_cd", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
                   SetSheetHeight(460);
                   resizeSheet();
           }                                                      
           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	doDispPaging(sheetObj.GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	for(var i=1; i<sheetObj.RowCount()+1 ; i++ ){
		if (sheetObj.GetCellValue(i, 'gl_cnt') == "0" || sheetObj.GetCellValue(i, 'gl_cnt') == "") {
			sheetObj.SetCellEditable(i, "del_flg",1);
		} else {
			sheetObj.SetCellEditable(i, "del_flg",0);
		}
	}
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
	for(var i=1; i<sheetObj.RowCount()+1 ; i++ ){
		if (sheetObj.GetCellValue(i, 'gl_cnt') == "0" || sheetObj.GetCellValue(i, 'gl_cnt') == "") {
			sheetObj.SetCellEditable(i, "del_flg",1);
		} else {
			sheetObj.SetCellEditable(i, "del_flg",0);
		}
	}
}
//데이터 수정 이벤트
function sheet1_OnChange(sheetObj, Row, Col){
	var colNm=sheetObj.ColSaveName(Col);
	switch(colNm){
		case "ggl_cd" :
			// var curr_gl_cd = sheetObj.CellValue(Row, Col);
			checkGlcdRow=Row;
			checkGlcdCol=Col;
			ajaxSendPost(dispSContiAjaxReq, 'reqVal', '&goWhere=aj&bcKey=checkGglCd&ggl_cd='+sheetObj.GetCellValue(Row, Col), './GateServlet.gsl');
			break;	
		case "ggl_type" :
			if(sheetObj.GetCellValue(Row, Col) == ""){
				sheetObj.CellComboItem(Row,"ggl_grp_cd", {ComboText:"", ComboCode:""} );
				return;
			}
			var glGrpNmArr=PARAM2_1.split("|");
			var glGrpCdArr=PARAM2_2.split("|");
			var glTp=sheetObj.GetCellValue(Row, Col);
			var newGlNm=" ";
			var newGlCd=" ";
			for(var i=0 ; i < glGrpCdArr.length ; i++){
				if(glGrpCdArr[i].substr(0,2) == glTp){
					newGlCd += "|" + glGrpCdArr[i];
					newGlNm += "|" + glGrpNmArr[i];
				}
			}
			sheetObj.CellComboItem(Row,"ggl_grp_cd", {ComboText:newGlNm, ComboCode:newGlCd} );
			break;
	}
}
//데이터 수정 이벤트
function sheet1_OnClick(sheetObj, Row, Col){
	var colNm=sheetObj.ColSaveName(Col);
	switch(colNm){
	case "ggl_grp_cd" :
		if(sheetObj.GetCellValue(Row, "ggl_type") == ""){
			return;
		}
		var glGrpNmArr=PARAM2_1.split("|");
		var glGrpCdArr=PARAM2_2.split("|");
		var glGrpTp=sheetObj.GetCellValue(Row, Col);
		var glTp=sheetObj.GetCellValue(Row, "ggl_type");
		var newGlNm=" ";
		var newGlCd=" ";
		for(var i=0 ; i < glGrpCdArr.length ; i++){
			if(glGrpCdArr[i].substr(0,2) == glTp){
				newGlCd += "|" + glGrpCdArr[i];
				newGlNm += "|" + glGrpNmArr[i];
			}
		}
		sheetObj.CellComboItem(Row,"ggl_grp_cd", {ComboText:newGlNm, ComboCode:newGlCd} );
		// #292 LATONA LOGISTICS, INC - NEW INSTALLATION
		//sheetObj.SetCellValue(Row, Col,glGrpTp,0);
		break;
	}
}
function fncGridCheck() {
	var sheetObj=docObjects[0];
	var intRow=sheetObj.RowCount();
	for(var i=1 ; i < intRow ; i++){
		if(sheetObj.GetCellValue(i, "ggl_cd") == "" || sheetObj.GetCellValue(i, "ggl_cd") == null){
			//CL Code is mandatory
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_GL'));
			return false;
		}
	}
	return true;
}
function fncSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function dispSContiAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined' && doc[1]!=';'){
			var dupl=doc[1];
			if (dupl == 'Y') {
				alert(getLabel('FMS_COM_ALT013')+ "\n - " + getLabel('FMS_COD_GLNO') + "\n\n: MDM_MCM_0301.188");
				sheetObj.SetCellValue(checkGlcdRow, 'ggl_cd','');
				sheetObj.SelectCell(checkGlcdRow, 'ggl_cd');
			}
		} else {
			// ERROR
			alert("ajax error");
		}
	}else{
		//Error Errupt!			
		alert("ajax error");
	}
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="use_flg"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 1);
	}
}
