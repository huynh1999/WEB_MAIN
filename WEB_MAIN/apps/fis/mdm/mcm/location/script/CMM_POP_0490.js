/*=========================================================
*Copyright(c) 2018 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0490.jsp
*@FileTitle  : Lane Code
*@author     : CLT
*@version    : 1.0
*@since      : 2018/01/16
=========================================================*/

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
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("./CMM_POP_0490GS.clt", FormQueryString(formObj) );
                }
    	   break;
       	    case "CLOSE":
       	    	ComClosePopup(); 
       	    break;
            case "APPLY":
            	selectMultiRow();
    		break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0490.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0490.002");
        }
	}
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;	
	doWork('SEARCHLIST');
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
    for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
    var arg=parent.rtnary;
	var formObj=document.form;	
	
	var arg=parent.rtnary;
	var formObj=document.form;
	if(arg != undefined && arg != 'undefined'){
		formObj.openMean.value = arg[0];
		if(arg[1] != undefined && arg[1] != 'undefined'){
			formObj.s_lane_cd.value = arg[1];
		}
		if(arg[2] != undefined && arg[2] != 'undefined'){
			formObj.s_descr.value = arg[2];
		}
		if(arg[3] != undefined){
			formObj.f_MultiSelect.value=arg[3];
		}
		if(formObj.f_MultiSelect.value == "Y"){
			var sheetObj=docObjects[0];
			sheetObj.SetColHidden("chk", 0);
			getObj("btnApply").style.display = "inline";
		}
	}else{
		formObj.openMean.value = "";
	}
	if(formObj.s_lane_cd.value != "" || formObj.s_descr.value != ""){
		doWork("SEARCHLIST");
	}
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
	          var headers = [ { Text:getLabel('CMM_POP_0490_HDR'), Align:"Center"} ];
	          InitHeaders(headers, info);
	          var formObj=document.form;
	           var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
	                          {Type:"CheckBox",  Hidden: 0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"chk" },
			                  {Type:"Text",      Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"rownum",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                  {Type:"Text",      Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"lane_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                  {Type:"Text",      Hidden:0, Width:120,  Align:"Center",    ColMerge:1,   SaveName:"from_area_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                  {Type:"Text",      Hidden:0, Width:120,  Align:"Center",    ColMerge:1,   SaveName:"to_area_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                  {Type:"Combo",     Hidden:0, Width:150,  Align:"Center",  ColMerge:1,   SaveName:"div_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                  {Type:"Text",      Hidden:0, Width:160,  Align:"Left",    ColMerge:1,   SaveName:"descr",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                  {Type:"Text",      Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"delt_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"Indexing" } ];
	          InitColumns(cols);
	          SetEditable(1);
	          SetFocusAfterProcess(1);
	          SetSheetHeight(230);
	          sheetObj.SetColProperty("div_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
	          sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
           }                                                      
           break;
    }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	if(sheet1.ColSaveName(Col) == "chk"){
		return;
	}
	var retArray="";	
	retArray += sheetObj.GetCellValue(Row, "lane_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "descr");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "from_area_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "to_area_nm");
	retArray += "|";	 	
	retArray += sheetObj.GetCellValue(Row, "div_cd");
	retArray += "|";	 	
	retArray += sheetObj.GetCellValue(Row, "delt_flg");
	retArray += "|";
	ComClosePopup(retArray); 
}

function selectMultiRow(){
	var sheetObj=docObjects[0];
	var retArray="";
	for(i=1; i <= sheetObj.RowCount(); i++){
		if(sheetObj.GetCellValue(i, "chk") == "1"){		
			retArray += sheetObj.GetCellValue(i, "lane_cd");
			retArray += "|";	 	
			retArray += sheetObj.GetCellValue(i, "descr");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "from_area_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "to_area_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "div_cd");
			retArray += "|";	 	
			retArray += sheetObj.GetCellValue(i, "delt_flg");
			retArray += ";";
		}
	}	
	if(retArray != ""){
		ComClosePopup(retArray);
	}else{
		ComShowMessage(getLabel('FMS_COM_ALT004'));	
	}	
}

function sheet1_OnKeyUp(sheetObj, row, col, keyCode){
	if(keyCode==13){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}