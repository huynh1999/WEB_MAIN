/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CTRTHSTPopup.js
*@FileTitle  : Contract History
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/03/20
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");	
		var cal=new ComCalendar();
		switch(srcName) {
			case "CLOSE":	
				btn_Close();
				break;
		} // end switch
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}
/**
* Sheet  onLoad
*/
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	var formObj=document.form;
	if(formObj.ctrt_no.value != ""){
		doSearch();
	}
}
/**
* IBSheet Object
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
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
            with(sheetObj){
      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    var headers = [ { Text:getLabel('CTRTHSTPopup_Sheet1_HDR1'), Align:"Center"} ];		                      
      InitHeaders(headers, info);

      var cols = [ {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                   {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"rgst_sys_dt",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
                   {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"rgst_id",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hst_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 } ];
       
      InitColumns(cols);
      SetSheetHeight(360);
      SetEditable(0);
      resizeSheet();
                        }
      break;


		case 2:      //IBSheet1 init
            with(sheetObj){
      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    var headers = [ { Text:getLabel('CTRTHSTPopup_Sheet2_HDR1'), Align:"Center"} ];		                      
      InitHeaders(headers, info);

      var cols = [ {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                   {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
                   {Type:"Text",      Hidden:0,  Width:270,  Align:"Left",    ColMerge:1,   SaveName:"pre_val",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12, MultiLineText: 1 },
                   {Type:"Text",      Hidden:0,  Width:270,  Align:"Left",    ColMerge:1,   SaveName:"cur_val",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12, MultiLineText: 1 },
                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hst_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 } ];
       
      InitColumns(cols);
      SetSheetHeight(360);
      SetEditable(0);
      resizeSheet();
                        }
      break;


	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
	ComResizeSheet(docObjects[1]);
}

function doSearch(){
	var formObj=document.form;
	formObj.f_cmd.value = SEARCH;
	var params = '?ctrt_no=' + formObj.ctrt_no.value + '&' + FormQueryString(formObj);
	docObjects[0].DoSearch('./CTRTHSTPopupGS.clt', params);
}
function sheet1_OnClick(sheetObj, Row, Col){
	var formObj=document.form;
	formObj.f_cmd.value = SEARCH01;
	var params = '?ctrt_no=' + sheetObj.GetCellValue(Row, "ctrt_no") + '&hst_seq=' + sheetObj.GetCellValue(Row, "hst_seq") + '&' + FormQueryString(formObj);
	docObjects[1].DoSearch('./CTRTHSTPopup_1GS.clt', params);
}
function btn_Close() {
  ComClosePopup(); 
}
