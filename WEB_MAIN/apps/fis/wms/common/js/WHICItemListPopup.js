/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICItemListPopup.js
*@FileTitle  : Inbound Complete Search
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/06/05
=========================================================*/
var sheetCnt=0;
var docObjects=new Array();
var startRow = 0;
var totalRowMerge = 0;
var wib_in_no="";
var inbound_dt="";

var wib_in_no_ori="";
var inbound_dt_ori="";
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
    initControl();
    if ($("#wib_bk_no").val().trim() != "")
    {
    	searchList();
    }
}
/** 
 * initControl()
 */ 
function initControl() {
    //axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
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
	        
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WHICItemListPopup_HDR1'), Align:"Center"},
	                      { Text:getLabel('WHICItemListPopup_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",     		Hidden:0,  		Width:120, 		Align:"Center", 	ColMerge: 1, 	SaveName:"wib_in_no", 		KeyField: 0, 	Format: "" },
	  	             {Type:"Date",     	Hidden:0,  		Width:80, 		Align:"Center", 	ColMerge: 1, 	SaveName:"inbound_dt", 		KeyField: 0, 	Format:"Ymd" },
	  	             {Type:"Text",     	Hidden:0,  		Width:100, 		Align:"Center", 	ColMerge: 0, 	SaveName:"item_cd", 		KeyField: 0, 	Format: "" },
	  	             {Type:"Text",     	Hidden:0,  		Width:160, 		Align:"Left", 		ColMerge: 0, 	SaveName:"item_nm", 		KeyField: 0, 	Format: "" },
	  	             {Type:"Text",     	Hidden:0,  		Width:100, 		Align:"Center", 	ColMerge: 1, 	SaveName:"lot_no", 			KeyField: 0, 	Format: "" },
	  	             {Type:"Text",     	Hidden:0,  		Width:35, 		Align:"Center", 	ColMerge: 0, 	SaveName:"in_item_unit", 	KeyField: 0, 	Format: "" },
	  	             {Type:"Text",     	Hidden:0,  		Width:70, 		Align:"Right", 		ColMerge: 0, 	SaveName:"in_item_qty", 	KeyField: 0, 	Format:"Integer", PointCount: 0 },
	  	             {Type:"Text",     	Hidden:0,  		Width:300, 		Align:"Center", 	ColMerge: 1, 	SaveName:"lot_id", 			KeyField: 0, 	Format: ""} ];
	       
	      InitColumns(cols);
	      SetSheetHeight(300);
	      SetEditable(0);
	            //no support[check again]CLT 				MultiSelection=false;
	      SetSelectionMode(0);
	      resizeSheet();
	      }
	      break;
	}
}
function btn_Close(){
  ComClosePopup(); 
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	var sheetObj=sheet1;//sheetObjects[0];
	for(var i=1; i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, "wib_in_no","#0100FF");
 		sheetObj.SetCellFontUnderline(i, "wib_in_no", 1);
	}
	mergeCell(2);
	if(sheetObj.RowCount()>0)
	{
		sheetObj.SelectCell(2,"inbound_dt");
	}
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr == "wib_in_no"){ //IB Complete no클릭시
		rtnData();
	}
}
function rtnData(){
	var rtnVal="";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "wib_in_no");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "inbound_dt");	
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "item_cd");	
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "item_nm");	
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lot_no");	
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "in_item_unit");	
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "in_item_qty");	
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lot_id");	
//	return rtnVal;
//	ComClosePopup(); 
	ComClosePopup(rtnVal);
}
function searchList(){
	var formObj=document.form;
	var sheetObj=sheet1;
	formObj.f_cmd.value = SEARCH;
	sheet1.DoSearch("./searchWHICItemListPopupGS.clt" , FormQueryString(formObj,""));
}
function mergeCell(Row){
	var prefix="";
	totalRowMerge = 0;
	startRow = 0;
	for(var i = Row ; i <= sheet1.RowCount() + 1 ; i++){
		if(i == Row){
			getDataOri(i);
			i++;
		}
		checkDataMerge(i);
	}
}
function checkDataMerge(i){
	getData(i);
	if(wib_in_no == wib_in_no_ori && inbound_dt == inbound_dt_ori){
		if(startRow == 0){
			startRow = i;
			totalRowMerge = 1;
		}
		totalRowMerge++;
	}
	else{
		if(totalRowMerge == 1){
			totalRowMerge++;
		}
		startRow = startRow - 1;
		setMergeCell(startRow, totalRowMerge);
		
		getDataOri(i);
		
		startRow = 0;
		totalRowMerge = 0;
	}
	
	if(i == sheet1.RowCount() + 1){
		if(startRow != 0){
			if(totalRowMerge == 1){
				totalRowMerge++;
			}
			startRow = startRow - 1;
			setMergeCell(startRow, totalRowMerge);
			startRow = 0;
			totalRowMerge = 0;
		}
	}
}
function getDataOri(i){
	var prefix="";
	wib_in_no_ori = sheetObj.GetCellValue(i, prefix+"wib_in_no");
	inbound_dt_ori = sheetObj.GetCellValue(i, prefix+"inbound_dt");
}
function getData(i){
	var prefix="";	
	wib_in_no = sheetObj.GetCellValue(i, prefix+"wib_in_no");
	inbound_dt = sheetObj.GetCellValue(i, prefix+"inbound_dt");
}
function setMergeCell(startRow, totalRowMerge){
	sheet1.SetMergeCell(startRow, 0, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 1, totalRowMerge, 1);
}
function resizeSheet(){
	 ComResizeSheet(sheet1);
}