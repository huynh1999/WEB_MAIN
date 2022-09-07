/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICListPopup.js
*@FileTitle  : IB Complete List
*@author     : Kieu.Le
*@version    : 1.0
*@since      : 2015/05/26
=========================================================*/

var sheetCnt=0;
var docObjects=new Array();
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
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
   // initControl();
    if ($("#wib_bk_no").val().trim() != "")
    {
    	searchList();
    }
}
/** 
 * initControl()
 */ 
function initControl() {
//    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){
	        
			      //var headCount=ComCountHeadTitle(hdr1);
		
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('WHICListPopup_HDR1'), Align:"Center"}];
			      InitHeaders(headers, info);
		
			      var cols = [   {Type:"Text",     	Hidden:0,  	Width:150, 	Align:"Center", 	ColMerge:1,     SaveName:"wib_in_no",  	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					             {Type:"Date",     	Hidden:0,  	Width:100,  Align:"Center",   	ColMerge:1,     SaveName:"inbound_dt",  	KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0},
					             {Type:"Text",      Hidden:1, 	Width:80,  	Align:"Center",   	ColMerge:1,     SaveName:"wib_bk_no",  	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0} ];
			      
			      InitColumns(cols);
			      SetSheetHeight(250);
			      SetEditable(0);
	            }
	      break;

	}
}
function sheet1_OnDblClick(sheetObj, Row, Col){
//	comPopupOK();
	var rtnArray = '';
	rtnArray += sheet1.GetCellValue(Row, "wib_in_no");
	rtnArray += '|';
	rtnArray += sheet1.GetCellValue(Row, "wib_bk_no");
	rtnArray += '|';
	rtnArray += sheet1.GetCellValue(Row, "inbound_dt");
	ComClosePopup(rtnArray); 
}
function btn_Close(){
	ComClosePopup(); 
}
function searchList(){
	var formObj=document.form;
	var sheetObj=sheet1;
	formObj.f_cmd.value=SEARCH;
 	sheetObj.DoSearch("./WHICListPopupGS.clt", FormQueryString(formObj,""));
}

//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
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
	} catch(e) {
        if(e == "[object Error]"){
         //Unexpected Error occurred. Please contact Help Desk!
         alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
         //System Error! + MSG
         alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
 }
}