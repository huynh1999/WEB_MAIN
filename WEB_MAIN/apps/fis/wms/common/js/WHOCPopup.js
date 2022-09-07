/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOCPopup.js
*@FileTitle  : OB Complete
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/24
=========================================================--*/
var rtnary=new Array(2);
var callBackFunc = "";
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
	
    initControl();
    if ($("#wob_bk_no").val().trim() != "")
    {
    	 searchList();
    }
}
/** 
 * initControl()
 */ 
//document.onkeydown=form_keyEnter;
function initControl() {
//    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('WHOCPopup_HDR1'), Align:"Center"}];
		      InitHeaders(headers, info);
	
		      var cols = [ 	{Type:"Seq",       	Hidden:0, 	Width:50,     	Align:"Center",     ColMerge:1,    Format:"",      SaveName:"seq",     KeyField:0},
							{Type:"Text",     	Hidden:0,  	Width:150,     	Align:"Center",     ColMerge:1,    Format:"",      SaveName:"wob_out_no",     KeyField:0 },
							{Type:"Text",      	Hidden:1, 	Width:150,     	Align:"Center",     ColMerge:1,    Format:"",      SaveName:"whoc_flag",     KeyField:0 } ];
		       
		      InitColumns(cols);
		      SetSheetHeight(250);
		      SetEditable(0);
		      resizeSheet();
	      }
	      break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}


function sheet1_OnDblClick(sheetObj, Row, Col){
	//comPopupOK();
	ComClosePopup(rtnData()); 
}
function btn_Close(){
  ComClosePopup(); 
}
function searchList(){
	var formObj=document.form;
	formObj.f_cmd.value=SEARCH;
	docObjects[0].DoSearch("./searchWHOCPopup_1GS.clt", FormQueryString(formObj,""));
}

function doWork(srcName){
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

function rtnData(){
	 var rtnVal="";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "seq");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "wob_out_no");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "whoc_flag");
	 return rtnVal;
}