/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0170.js
*@FileTitle  : Vat Rate
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
       		if ( formObj.s_cnt_cd.value == null || formObj.s_cnt_cd.value == "" ) {
       			//Please enter a [Country Code]!
       			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_CNTY') + "\n\n: MDM_MCM_0170.13");
       			formObj.s_cnt_cd.focus();
       			return false;
       		}
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch("MDM_MCM_0170GS.clt", FormQueryString(formObj) );
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
                sheetObj.DoSave("MDM_MCM_0170GS.clt", FormQueryString(formObj),"ibflag",false);
            }
       break;
       case "CONTRY_LIST" :
            rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";
			
			callBackFunc = "CONTRY_LIST";
			modal_center_open('./CMM_POP_0020.clt', rtnary, 660,480,"yes");
		break;
		case "FREIGHT_LIST" :
			rtnary=new Array(1);
			rtnary[0]="1";
			callBackFunc = "FREIGHT_LIST";
			modal_center_open('./CMM_POP_0070.clt', rtnary, 560,480,"yes");
		break;
       case "EXCEL":
    	   if(sheetObj.RowCount() < 1){//no data
    		   ComShowCodeMessage("COM132501");
    		   }else{
//    			   sheetObj.Down2Excel({ HiddenColumn:1,Merge:true,TreeLevel:false});
    			   sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
    		   }

       break;
    }
}

function CONTRY_LIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_cnt_cd.value=rtnValAry[0];
	}
}

function FREIGHT_LIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.s_frt_cd.value=rtnValAry[0];
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
    //doWork('SEARCHLIST');
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
             var headers = [ { Text:getLabel('MDM_MCM_0170_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [ {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                    {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"vat_aply_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cnt_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
                    {Type:"Text",      Hidden:0,  Width:160,  Align:"Center",  ColMerge:1,   SaveName:"frt_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
                    {Type:"Text",      Hidden:0,  Width:500,  Align:"Left",    ColMerge:0,   SaveName:"descr",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
                    {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"tax_aply_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"db_value" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
             InitColumns(cols);
             SetEditable(1);
             SetSheetHeight(350);
           }                                                      
           break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
    	case "cnt_cd" :
    		var strCntrTpszCd=sheetObj.GetCellValue(Row, Col);
    		var intRows=sheetObj.RowCount();
			for(var i=1 ; i < intRows ; i++ ){
				if( i != Row ){
					if(sheetObj.GetCellValue(i, Col) == strCntrTpszCd){
						//[Freight Code] is duplicated!
						alert(getLabel('FMS_COM_ALT008') + "\n - " + getLabel('FMS_COD_FRET') + getLabel('FMS_COD_CODE') + ": " + strCntrTpszCd + "\n\n: MDM_MCM_0170.215");
						sheetObj.SetCellValue(Row, Col,"");
						return;
					}
				}
			}
			sheetObj.SetCellValue(Row, Col,strCntrTpszCd.toUpperCase());
			break;
		case "frt_cd" :
			var strPckNm=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strPckNm.toUpperCase());
			break;
	}
}
function fncGridCheck() {
	var sheetObj=docObjects[0];
 	var intRow=sheetObj.RowCount();
	for(var i=1 ; i < intRow ; i++){
		if(sheetObj.GetCellValue(i, "cnt_cd") == "" || sheetObj.GetCellValue(i, "cnt_cd") == null){
			//Please enter a [Country Code]!
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_CNTY') + "\n\n: MDM_MCM_0170.234");
			return false;
		}
		if(sheetObj.GetCellValue(i, "frt_cd") == "" || sheetObj.GetCellValue(i, "frt_cd") == null){
			//Please enter a [Freight Code]!
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_FRET') + getLabel('FMS_COD_CODE') + "\n\n: MDM_MCM_0170.240");
			return false;
		}
	}
	return true;
}