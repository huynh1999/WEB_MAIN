
///*--=========================================================
//*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
//*@FileName   : WHOCListByBookingPopup.jsp
//*@FileTitle  : OB Complete List(By Booking)
//*@author     : Bao.Huynh - DOU Network
//*@version    : 1.0
//*@since      : 2015/07/08
//=========================================================--*/

var docObjects=new Array();
var sheetCnt=0;
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
	}

function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
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

/**
* Sheet  onLoad
*/
function loadPage() {
	
	var formObj=document.form;
	
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
//    initControl();
    if ($("#wob_bk_no").val().trim() != "")
    {
    	searchList();
    }
}
/** 
 * initControl()
 */ 
function initControl() {
    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:      //IBSheet1 init
			with(sheetObj){
//			SetSheetHeight(400);
			var prefix="";
//			var hdr1='OB Complete No|Complete Date|BK_NO';
			SetConfig( { SearchMode:2, DataRowMerge:0 } );
			var headers=[ { Text:getLabel('WHOCListByBookingPopup_HDR1'), Align:"Center"}];
			InitHeaders(headers, info);
			var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
			var cols = [ {Type:"Text",     Hidden:0,  Width:width=150,    Align:"Center",  ColMerge:1,        Format:"",    SaveName:prefix+"wob_out_no",    KeyField:0, UpdateEdit:0,   InsertEdit:0},
						 {Type:"Text",     Hidden:0,  Width:width=100,    Align:"Center",  ColMerge:1,        Format:"",    SaveName:prefix+"outbound_dt",    KeyField:0,	UpdateEdit:0,   InsertEdit:0},
						 {Type:"Text",     Hidden:1,  Width:width=80,    Align:"Center",  ColMerge:1,        Format:"",    SaveName:prefix+"wob_bk_no",    KeyField:0,	UpdateEdit:0,   InsertEdit:0}];
			InitColumns(cols);
			SetSheetHeight(300);
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
	
	var rtnVal = "";
	rtnVal += sheet1.GetCellValue(Row, "wob_out_no");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "outbound_dt");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "wob_bk_no");
	ComClosePopup(rtnVal); 
//	
//	comPopupOK();
//  ComClosePopup(); 
}
function btn_Close(){
  ComClosePopup(rtnData()); 
}

function rtnData(){
	var rtnVal = "";
	rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "wob_out_no");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "outbound_dt");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "wob_bk_no");
	return rtnVal;
}
function searchList(){
	var formObj=document.form;
	docObjects[0].RemoveAll();
	formObj.f_cmd.value = SEARCH;
    docObjects[0].DoSearch("./WHOCListByBookingPopupGS.clt", FormQueryString(formObj,""));

}
