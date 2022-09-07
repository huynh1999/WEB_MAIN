/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInLotSelectPopup.js
*@FileTitle  : Lot ID Selection Popup
*@author     : TanPham - DOU Network
*@version    : 1.0
*@since      : 2015/04/21
=========================================================--*/
var rtnary=new Array(1);
var callBackFunc = "";
var isDuplicateInternalCode = false;
var checkInternalCode = false;
var isDuplicateCustAndCdUsedByCust = false;

var sheetCnt=0;
var sheetObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var sheetCnt=0;
var firCalFlag=false;
function doWork(srcName){
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "SEARCHLIST":
			btn_Search();
			break;	
		case "btn_ok":
			btn_OK();
			break;
		case "CLOSE":   
			btn_Close();
			break;
		case "btn_prop_date_fm":
            var cal = new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.prop_date_fm, formObj.prop_date_to, 'MM-dd-yyyy');
			break;
		case "btn_prop_date_to":	
			var cal = new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.prop_date_fm, formObj.prop_date_to, 'MM-dd-yyyy');
			break;
		} // end switch
	}catch(e) {
		if( e == "[object Error]") {
			ComShowMessage(OBJECT_ERROR);
		} else {
			alert(e);
		}
	}
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	sheetObjects[sheetCnt++]=sheet_obj;
}
/**
 * Combo Object를 배열로 등록
 */    
function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
}
function loadPage() {
	var formObj=document.form;	
	for(var i=0;i<sheetObjects.length;i++){
		comConfigSheet(sheetObjects[i]);
		initSheet(sheetObjects[i],i+1);
		comEndConfigSheet(sheetObjects[i]);
	}
	// 디폴트 Search 실행
	if (!isNull(formObj.ctrt_no)) {
		btn_Search();
	}	
}
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 

function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
				      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
				      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				      var headers = [ { Text:getLabel('WHInLotSelectPopup_HDR1'), Align:"Center"},
					                      { Text:getLabel('WHInLotSelectPopup_HDR2'), Align:"Center"} ];
				      InitHeaders(headers, info);
		
				      var cols = [ {Type:"Seq",       Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"seq" },
				             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"item_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
				             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
				             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"inbound_dt",  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
				             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"lot_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
				             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"exp_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:30 },
				             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lot_04",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
				             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lot_05",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
				             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"fix_lot_id",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:4 } ];
				       
				      InitColumns(cols);
					  SetSheetHeight(320);
				      SetEditable(1);
				      resizeSheet();
		            }
		      break;


	}
}

function resizeSheet(){
	ComResizeSheet(sheetObjects[0]);
}
function getData(){
	var retArray="";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"item_cd");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"item_nm");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"inbound_dt");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"lot_no");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"exp_dt");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"lot_04");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"lot_05");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"fix_lot_id");
	return retArray;
}

function sheet1_OnSearchEnd(sheetObj, row, col){
	var formObj=document.form;
	sheetObj.SetSelectRow(-1);
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13 && sheetObj.GetSelectRow() != -1){
		sheet1_OnDblClick(sheetObj, row, col);
	}else{
		return;
	}
}

/**
 * Inbound Date
 * @param name
 */
function on_btn_dt_from(name) {
	var formObj=document.form;
	var cal=new ComCalendar();
	cal.select(eval("formObj."+name), 'MM-dd-yyyy');
}
function on_btn_dt_to(name) {
	var formObj=document.form;
	var cal=new ComCalendar();
	cal.select(eval("formObj."+name), 'MM-dd-yyyy');
}
/**
 * Search
 */
function btn_Search() {
	var formObj=document.form;
	if (validateForm(sheetObjects[0],formObj, 'Search')) {
		sheetObjects[0].RemoveAll();
		formObj.f_cmd.value = SEARCH;
		sheetObjects[0].DoSearch("./searchWHInLotSelectListGS.clt", FormQueryString(formObj, ""));
	}	
}

/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'Search':
			if (isNull(formObj.ctrt_no)) {
				// CONTRACT NO
				ComShowCodeMessage("COM0278", "CONTRACT NO");
				formObj.ctrt_no.focus();
				return false;		
			} 
			/* 3개월 duration 주석
			//Item 이 없는경우 Inbound Date는 필수 (MAX 93일까지)
			if (getDaysBetween2(formObj.prop_date_fm.value, formObj.prop_date_to.value) > 92) {
				ComShowCodeMessage("COM0141", "3", "(Inbound(Expiration) Date)");
				formObj.prop_date_fm.focus();
				return false;
			}
			*/
			if (!ComIsEmpty(formObj.prop_date_fm) && ComIsEmpty(formObj.prop_date_to)) {
				formObj.prop_date_to.value=ComGetNowInfo();
			}
			if (!ComIsEmpty(formObj.prop_date_fm) && !isDate(formObj.prop_date_fm)) {
				ComShowCodeMessage("COM0114","Inbound(Expiration) Date");
				formObj.prop_date_fm.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.prop_date_to) && !isDate(formObj.prop_date_to)) {
				ComShowCodeMessage("COM0114","Inbound(Expiration) Date");
				formObj.prop_date_to.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.prop_date_fm)&&ComIsEmpty(formObj.prop_date_to))||(ComIsEmpty(formObj.prop_date_fm)&&!ComIsEmpty(formObj.prop_date_to))) {
				ComShowCodeMessage("COM0122","Inbound(Expiration) Date");
				formObj.prop_date_fm.focus();
				return false;
			}
			if (getDaysBetween2(formObj.prop_date_fm.value, formObj.prop_date_to.value)<0) {
				ComShowCodeMessage("COM0122","Inbound(Expiration) Date!");
				formObj.prop_date_fm.focus();
				return false;
			}			
/*			
			else if (isNull(formObj.item_cd)) {
				// Item
				ComShowCodeMessage("COM0278", "Item");
				ComSetFocus(formObj.item_cd);
				return false;
			} else if (isNull(formObj.lot_id)) {
				// Lot ID
				ComShowCodeMessage("COM0278", "Lot ID");
				ComSetFocus(formObj.lot_id);
				return false;
			} else if (isNull(formObj.prop_date_fm)) {
				// Inbound Date
				ComShowCodeMessage("COM0278", "Inbound Date");
				ComSetFocus(formObj.prop_date_fm);
				return false;
			} else if (isNull(formObj.lot_property)) {
				// Lot Property
				ComShowCodeMessage("COM0278", "Lot Property");
				ComSetFocus(formObj.lot_property);
				return false;
			}			
*/			
			break;
		}
	}
	return true;
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	btn_OK();
}
function btn_OK() {
	if(sheet1.GetSelectRow() > 0){
		sheetObj=sheetObjects[0];
		ComClosePopup(getData());
	}else ComShowCodeMessage("COM12189");
	
}
document.onchange=form_onChange;
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	if(srcName == "prop_date_tp"){
	if (formObj.prop_date_tp.value == "EXP_DT" && formObj.exp_dt.value != ""){
		formObj.prop_date_fm.value = formObj.exp_dt.value;
		formObj.prop_date_to.value = formObj.exp_dt.value;
	}else if (formObj.prop_date_tp.value == "INBOUND_DT" && formObj.inbound_dt.value != ""){
		formObj.prop_date_fm.value = formObj.inbound_dt.value;
		formObj.prop_date_to.value = formObj.inbound_dt.value;
	}else {
		formObj.prop_date_fm.value ='';
		formObj.prop_date_to.value ='';
	}
	}
}
/**
 * Close
 */
function btn_Close() {
  ComClosePopup(); 
}
