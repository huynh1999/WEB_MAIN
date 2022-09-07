var docObjects=new Array();
var sheetCnt=0;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName, valObj){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		var srcName=ComGetEvent("name");
		var cal=new ComCalendar();
		switch(srcName) {
			case "btn_Search":	
				btn_Search();
				break;
			case "btn_OK":	
				btn_OK();
				break;
			case "btn_Close":	
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
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	initControl();
	if ( !ComIsEmpty(formObj.vslCd) || !ComIsEmpty(formObj.vslNm) ){
		btn_Search();
	}
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObject=document.form;
	//axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
   //axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('VesselPopup_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"Seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"vsl_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"vsl_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(320);
	      (3, 0, 0, true);
	      SetEditable(0);
	            }
	      break;
	}
}
function btn_Search()
{
	var formObj=document.form;
	formObj.vslCd.value=formObj.vslCd.value.toUpperCase();
	if(formObj.vslCd.value == "" && formObj.vslNm.value.trim().length < 3){
		ComShowCodeMessage("COM0098", "Vessel Name" ,"3");
		return;
	}
	docObjects[0].RemoveAll();
 	//var sXml=sheetObjects[0].DoSearch("searchVesselList.do", FormQueryString(formObj,''));
//	sheetObjects[0].LoadSearchData(sXml,{Sync:1} );
 	
 	var params = "f_cmd="+ SEARCH + "&vslCd=" + formObj.vslCd.value + "&vslNm=" + formObj.vslNm.value ;
	sheet1.DoSearch("./searchVesselListGS.clt" , params);
}
function btn_OK()
{
	if( sheet1.GetSelectRow() < 1 )	ComShowCodeMessage("COM0253");	
	else	ComClosePopup(rtnData());
}
function btn_Close()
{
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	ComClosePopup(rtnData());
}
function obj_keydown() {
	var formObj=document.form;
	var vKeyCode=event.keyCode;
	var srcName=ComGetEvent("name");
	var srcValue=event.srcElement.getAttribute("value");
	if (vKeyCode == 13) {
		switch (srcName) {	
			case "vslCd" :
			case "vslNm" :
				//if (!ComIsNull(srcValue)){
				btn_Search();
				//}
				break;
		}
	}
}
function rtnData(){
		var rtnVal="";
		rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "vsl_cd");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "vsl_nm");	
		return rtnVal;
}
