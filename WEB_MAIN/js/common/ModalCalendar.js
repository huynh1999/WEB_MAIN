/*
=========================================================
*@FileName   : CoCalendar.js
*@FileTitle  : 달력 호출
*@Description: 달력 팝업을 호출할 때 사용하는 메소드 js 파일. 
*              달력을 Class로 생성하여 처리함  
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 03/09/2009
*@since      : 03/09/2009
*@Change history:
=========================================================
*/

//---------------------------------------일일 칼렌더 조회 ---------------------------------------

//========================일반화면에서 조회========================
/**
 * 일일 칼렌더 호출 팝업
 */
function calendarModalPopup() {
	var cal    = new CalendarPopup();
	cal.select = CalendarPopup_select;
	return cal;
}

/**
 * 일일 칼렌더 호출 팝업 생성자
 */
function CalendarPopup(){
}

/**
 * 일일 칼렌더 호출 팝업 칼렌더 생성하는 메소드임
 */
function CalendarPopup_select(inputobj, linkname, strFormat){
	
	if (inputobj.type!="text" && inputobj.type!="hidden" && inputobj.type!="textarea") {
		alert("calendar.select: Input object passed is not a valid form input object");
		return;
		
	}else{
		var paramStr = 'callTp=D';
			paramStr+= '&periodYn=N';
		var rtnVal = window.showModalDialog('./Calendar.clt?'+paramStr, null, 
				                             "scroll:yes;status:no;help:no;dialogWidth:247px;dialogHeight:330px");
		var dateArr = rtnVal.split('|');
		var rtnDate = '';
		if(strFormat=='yyyy-MM-dd'){
			rtnDate = dateArr[0]+'-'+dateArr[1]+'-'+dateArr[2];
		}
		inputobj.value = rtnDate;
	}
}

//========================일반화면에서 From To 조회========================
/**
 * Html에서 From ~ To Calendar 팝업 호출
 */
function calendarModalPopupFromTo() {
	var cal = new CalendarFromToPopup();
	cal.select = CalendarFromToPopup_select;
	return cal;
}

/**
 * 일일 칼렌더 호출 팝업 생성자
 */
function CalendarFromToPopup(){
}


function CalendarFromToPopup_select(frmObj, frmObjStr, toObj, toObjStr, strFormat){
	if (frmObj.type!="text" && frmObj.type!="hidden" && frmObj.type!="textarea") {
		alert("calendar.select: Input object passed is not a valid form input object");
		return;
		
	}else{
		var paramStr = 'callTp=D';
			paramStr+= '&periodYn=Y';
		var rtnVal = window.showModalDialog('./Calendar.clt?'+paramStr, null, 
				                             "scroll:yes;status:no;help:no;dialogWidth:247px;dialogHeight:345px");
		var dateArr = rtnVal.split(';');

		var frmArr = dateArr[0].split('|');
		var toArr  = dateArr[1].split('|');
		
		var rtnDate = '';
		var rtnToDate = '';
		if(strFormat=='yyyy-MM-dd'){
			rtnDate   = frmArr[0]+'-'+frmArr[1]+'-'+frmArr[2];
			rtnToDate = toArr[0]+'-'+toArr[1]+'-'+toArr[2];
		}
		frmObj.value = rtnDate;
		toObj.value  = rtnToDate;
	}
}

//========================Grid Date========================
/**
 * 그리드에서 사용되는 일일 칼렌더 호출
 */
function calendarModalPopupGrid(){
	var c = new PopupWindowGrid();
	c.select = CalendarPopupGrid_select;
	return c;
}

/**
 * 그리드에서 사용되는 일일 칼렌더 생성자
 */
function PopupWindowGrid() {
	this.addX = 0;
	this.addY = 0;
}

/**
 * 그리드에서 사용되는 일일 칼렌더 생성하는 메소드임
 */
function CalendarPopupGrid_select(sheetObj, linkname, row, col, strFormat) {
	var paramStr = 'callTp=D';
	    paramStr+= '&periodYn=N';
	    
   

	var rtnVal = window.showModalDialog('./Calendar.clt?'+paramStr, null, 
			                             "scroll:yes;status:no;help:no;dialogWidth:247px;dialogHeight:330px"+
			                             getDialogPosit(sheetObj, row, col, this.addX, this.addY));
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var dateArr = rtnVal.split('|');
		var rtnDate = '';
		if(strFormat=='yyyy-MM-dd'){
			rtnDate = dateArr[0]+'-'+dateArr[1]+'-'+dateArr[2];
		}
		sheetObj.CellValue(row, col) = rtnDate;
	}		                             
	
}

function getDialogPosit(sheetObj, row, col, xpos, ypos){
	var positInfo= getGridXy(sheetObj, row, col, xpos, ypos);
    var positStr = ';dialogLeft:'+positInfo[0];
        positStr+= ';dialogTop:'+positInfo[1];
    return positStr;
}

function getGridXy(mySheet, row, col, xpos, ypos){
	var point = fGetXY(mySheet);
	var positInfo = new Array();
	positInfo[0] = mySheet.ColLeft(col)+point.x+xpos; //선택한 셀의 좌측 x 좌표

	positInfo[1] = mySheet.RowTop(row) + mySheet.RowHeight(col)+point.y+ypos; //선택한 셀의 상단 y 좌표
	//건수 정보 표시가 상단에 있는 경우
    if (mySheet.CountPosition==1||mySheet.CountPosition==2){
    	positInfo[1] += 15;
    }
    return positInfo;
}

//시트 객체의 위치를 얻기 위한 함수
function Point(iX, iY){
	this.x = iX;
	this.y = iY;
}

function fGetXY(sheet){
	var oTmp = sheet;
	var pt = new Point(0,0);
	do{
		pt.x += oTmp.offsetLeft;
		pt.y += oTmp.offsetTop;
		oTmp = oTmp.offsetParent;
	}while(oTmp.tagName!="BODY");
	return pt;
}
//========================Grid From to Date========================
/**
 * Html에서 From ~ To Calendar 팝업 호출
 */
function calendarModalPopupFromToGrid() {
	var cal = new CalendarFromToPopupGrid();
	cal.select = CalendarFromToPopupGrid_select;
	return cal;
}

/**
 * 일일 칼렌더 호출 팝업 생성자
 */
function CalendarFromToPopupGrid(){
}


function CalendarFromToPopupGrid_select(sheetObj, linkname, row, col, toCol, strFormat){
	if (frmObj.type!="text" && frmObj.type!="hidden" && frmObj.type!="textarea") {
		alert("calendar.select: Input object passed is not a valid form input object");
		return;
		
	}else{
		var paramStr = 'callTp=D';
			paramStr+= '&periodYn=Y';
		var rtnVal = window.showModalDialog('./Calendar.clt?'+paramStr, null, 
				                             "scroll:yes;status:no;help:no;dialogWidth:247px;dialogHeight:345px");
		var dateArr = rtnVal.split(';');

		var frmArr = dateArr[0].split('|');
		var toArr  = dateArr[1].split('|');
		
		var rtnDate = '';
		var rtnToDate = '';
		if(strFormat=='yyyy-MM-dd'){
			rtnDate   = frmArr[0]+'-'+frmArr[1]+'-'+frmArr[2];
			rtnToDate = toArr[0]+'-'+toArr[1]+'-'+toArr[2];
		}
		sheetObj.CellValue(row, col)   = rtnDate;
		sheetObj.CellValue(row, toCol) = rtnToDate;
		
	}
}
//========================Grid Date From to========================



//---------------------------------------Month Calendar Grid처리처리---------------------------------------
/**
 * Month 칼렌더 팝업
 */
function calendarModalMonthGrid(){
	var c = new PopupMonthWindowGrid();
	c.select = PopupMonthWindowGrid_select;
	return c;
}

/**
 * Month 칼렌더 생성자
 */
function PopupMonthWindowGrid(){
}

/**
 * Month 칼렌더 생성하는 메소드임
 */
function PopupMonthWindowGrid_select(sheetObj, linkname, row, col, toCol, strFormat){
	var paramStr = 'callTp=M'
		paramStr+= '&periodYn=N';
		var rtnVal = window.showModalDialog('./Calendar.clt?'+paramStr, null, 
				                             "scroll:yes;status:no;help:no;dialogWidth:247px;dialogHeight:160px"+getDialogPosit(sheetObj, row, col, this.addX, this.addY));
		
		if(rtnVal == 'undefined' || rtnVal == null) return;
		
		var dateArr = rtnVal.split('|');
		var rtnDate = '';
		if(strFormat=='yyyy-MM-dd'){
			rtnDate = dateArr[0]+'-'+dateArr[1]+'-';
		}
		sheetObj.CellValue(row, col)   = rtnDate+'01';
		sheetObj.CellValue(row, toCol) = rtnDate+dateArr[2];
}
 
 /**
  * Month 칼렌더 팝업
  */
 function calendarModalMonth(){
 	var c = new PopupMonthWindow();
 	c.select = PopupMonthWindow_select;
 	return c;
 }

 /**
  * Month 칼렌더 생성자
  */
 function PopupMonthWindow(){
 }
 /**
  * Month 칼렌더 생성하는 메소드임
  */
function PopupMonthWindow_select(inputobj, linkname, strFormat){
 	if (inputobj.type!="text" && inputobj.type!="hidden" && inputobj.type!="textarea") {
		alert("calendar.select: Input object passed is not a valid form input object");
		return;
		
	}else{
		var paramStr = 'callTp=M';
			paramStr+= '&periodYn=N';
		var rtnVal = window.showModalDialog('./Calendar.clt?'+paramStr, null, 
				                             "scroll:yes;status:no;help:no;dialogWidth:247px;dialogHeight:330px");
		
		/* jsjang 2013.9.5 #19345 : [UI-142][Airline Schedule] system error when click Close calendar pop up */
		if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
			return;
		} else {

			var dateArr = rtnVal.split('|');
		}
		
		var rtnDate = '';

		if(strFormat=='MM-yyyy'){
			rtnDate = dateArr[1]+'-'+dateArr[0];
		}else if(strFormat=='yyyy-MM'){
			rtnDate = dateArr[0]+'-'+dateArr[1];
		}else if(strFormat=='yyyy-MM-dd'){
			rtnDate = dateArr[0]+'-'+dateArr[1];
		}

		inputobj.value = rtnDate;
		
	}
 }

