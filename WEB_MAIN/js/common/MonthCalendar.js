/*--==============================================================================
'주  시 스 템 : 
'서브  시스템 : 자바스크립트
'프로그램 ID  : CoCalendar.js
'프로그램 명  : 달력팝업관련 스크립트
'프로그램개요 : 달력팝업관련 스크립트
'작   성   자 : 장회수
'작   성   일 : 
==================================================================================
'수정자/수정일 : 김성욱/2006.11.23
'수정사유/내역 : 
==============================================================================--*/
var gRow, gCol, toRow, toCol;
// CONSTRUCTOR for the MonthCalPopup Object with IBSheet
function monthCalPopupGrid() {
	var c;
	if (arguments.length>0) {
		c=new MonthCalWindowGrid(arguments[0]);
		}
	else {
		c=new MonthCalWindowGrid();
		c.setSize(240, 110);
		}
	c.offsetX=-152;
	c.offsetY=25;
	c.autoHide();
	// Calendar-specific properties
	c.monthNames=new Array("1","2","3","4","5","6","7","8","9","10","11","12");
	c.monthAbbreviations=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	c.dayHeaders=new Array("SUN","MON","TUE","WED","THU","FRI","SAT");
	c.returnFunction="MonthCalPopupGrid_tmpReturnFunction";
	c.returnFunction2="MonthCalPopupGrid_tmpReturnFunction2";// 수정자 : 조경신
	c.returnMonthFunction="MonthCalPopup_tmpReturnMonthFunction";
	c.returnQuarterFunction="MonthCalPopup_tmpReturnQuarterFunction";
	c.returnYearFunction="MonthCalPopup_tmpReturnYearFunction";
	c.weekStartDay=0;
	c.isShowYearNavigation=false;
	c.displayType="date";
	c.disabledWeekDays=new Object();
	c.yearSelectStartOffset=2;
	c.currentDate=null;
	c.todayText="Today";
	window.MonthCalPopup_targetInput=null;// grid
	window.MonthCalPopup_targetInput2=null;// input field
	window.MonthCalPopupGrid_dateFormat="yyyymmdd";
	// Method mappings
	c.setReturnFunction=MonthCalPopup_setReturnFunction;
	c.setReturnMonthFunction=MonthCalPopup_setReturnMonthFunction;
	c.setReturnQuarterFunction=MonthCalPopup_setReturnQuarterFunction;
	c.setReturnYearFunction=MonthCalPopup_setReturnYearFunction;
	c.setMonthNames=MonthCalPopup_setMonthNames;
	c.setMonthAbbreviations=MonthCalPopup_setMonthAbbreviations;
	c.setDayHeaders=MonthCalPopup_setDayHeaders;
	c.setWeekStartDay=MonthCalPopup_setWeekStartDay;
	c.setDisplayType=MonthCalPopup_setDisplayType;
	c.setDisabledWeekDays=MonthCalPopup_setDisabledWeekDays;
	c.setYearSelectStartOffset=MonthCalPopup_setYearSelectStartOffset;
	c.setTodayText=MonthCalPopup_setTodayText;
	c.showYearNavigation=MonthCalPopup_showYearNavigation;
	c.showCalendar=MonthCalPopup_showCalendar;
	c.hideCalendar=MonthCalPopup_hideCalendar;
	c.getStyles=MonthCalPopup_getStyles;
	c.refreshCalendar=MonthCalPopup_refreshCalendar;
	//c.refreshCalendar2 = MonthCalPopup_refreshCalendar2;// 수정자 : 조경신
	c.getCalendar=MonthCalPopup_getCalendar;
	//c.getCalendar2 = MonthCalPopup_getCalendar2;// 수정자 : 조경신
	c.select=MonthCalPopupGrid_select;
	// This method fills date information into not only entire column cells in the grid object but also input field.
	//c.select2 = MonthCalPopupGrid_select2;
	// Return the object
	return c;
	}
// CONSTRUCTOR for the MonthCalPopup Object with IBSheet
function monthCalPopupFromTo() {
	var c;
	if (arguments.length>0) {
		c=new MonthCalWindow(arguments[0]);
		}
	else {
		c=new MonthCalWindow();
		c.setSize(240,320);
		}
	c.offsetX=-152;
	c.offsetY=25;
	c.autoHide();
	// Calendar-specific properties
	c.monthNames=new Array("1","2","3","4","5","6","7","8","9","10","11","12");
	c.monthAbbreviations=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	c.dayHeaders=new Array("SUN","MON","TUE","WED","THU","FRI","SAT");
	c.returnFunction="MonthCalPopup_tmpReturnFunctionFromTo";      //
	c.returnMonthFunction="MonthCalPopup_tmpReturnMonthFunction";
	c.returnQuarterFunction="MonthCalPopup_tmpReturnQuarterFunction";
	c.returnYearFunction="MonthCalPopup_tmpReturnYearFunction";
	c.weekStartDay=0;
	c.isShowYearNavigation=false;
	c.displayType="date";
	c.disabledWeekDays=new Object();
	c.yearSelectStartOffset=2;
	c.currentDate=null;
	c.todayText="Today";
	window.MonthCalPopup_targetInput=null;// input field1
	window.MonthCalPopup_targetInput2=null;// input field2
	window.MonthCalPopup_dateFormat=arguments[4];//"yyyy-mm-dd";
	// Method mappings
	c.setReturnFunction=MonthCalPopup_setReturnFunction;
	c.setReturnMonthFunction=MonthCalPopup_setReturnMonthFunction;
	c.setReturnQuarterFunction=MonthCalPopup_setReturnQuarterFunction;
	c.setReturnYearFunction=MonthCalPopup_setReturnYearFunction;
	c.setMonthNames=MonthCalPopup_setMonthNames;
	c.setMonthAbbreviations=MonthCalPopup_setMonthAbbreviations;
	c.setDayHeaders=MonthCalPopup_setDayHeaders;
	c.setWeekStartDay=MonthCalPopup_setWeekStartDay;
	c.setDisplayType=MonthCalPopup_setDisplayType;
	c.setDisabledWeekDays=MonthCalPopup_setDisabledWeekDays;
	c.setYearSelectStartOffset=MonthCalPopup_setYearSelectStartOffset;
	c.setTodayText=MonthCalPopup_setTodayText;
	c.showYearNavigation=MonthCalPopup_showYearNavigation;
	c.hideCalendar=MonthCalPopup_hideCalendar;
	c.getStyles=MonthCalPopup_getStyles;
	c.refreshCalendar=MonthCalPopup_refreshCalendarFromTo; // 
	//c.select = MonthCalPopup_selectFromTo; //
	// Return the object
	return c;
	}
// Temporary default functions to be called when items clicked, so no error is thrown
function MonthCalPopup_tmpReturnFunction(y,m,d) {
	if (window.MonthCalPopup_targetInput!=null) {
		//var d = new Date(y,m-1,d,0,0,0);
		var tmp=new Date();
		var d=new Date(y,m-1,d,tmp.getHours(),tmp.getMinutes(),tmp.getSeconds());
		window.MonthCalPopup_targetInput.value=formatDate(d,window.MonthCalPopup_dateFormat);
		window.MonthCalPopup_targetInput.focus();
		}
	else {
		alert('Use setReturnFunction() to define which function will get the clicked results!');
		}
	}
// Temporary default functions to be called when items clicked, so no error is thrown
function MonthCalPopupGrid_tmpReturnFunction(y,m,d) {
	if (window.MonthCalPopup_targetInput!=null) {
		var bgin=new Date(y,m-1,1,0,0,0);
		window.MonthCalPopup_targetInput.SetCellValue(gRow, gCol,formatDate(bgin, window.MonthCalPopupGrid_dateFormat));
		var d=new Date(y,m-1,d,0,0,0);
		window.MonthCalPopup_targetInput.SetCellValue(toRow, toCol,formatDate(d,window.MonthCalPopupGrid_dateFormat));
		//window.CalendarPopup_targetInput.SelectCell(gRow, gCol);
		}
	else {
		alert('Use setReturnFunction() to define which function will get the clicked results!');
		}
	}
// Temporary default functions to be called when items clicked, so no error is thrown
/**
 *작성자 : 조경신
 *기능   : 인풋 필드와 그리드의 특정 셀 또는 특정 컬럼의 전체 로우를 업데이트 한다.
**/
function MonthCalPopupGrid_tmpReturnFunction2(y,m,d)
{
//	window.MonthCalPopup_targetInput  = ibsheet_obj; // grid
//	window.MonthCalPopup_targetInput2 = inputobj;    // input field
	if (window.MonthCalPopup_targetInput!=null && window.MonthCalPopup_targetInput2!=null)
	{
		var d=new Date(y,m-1,d,0,0,0);
		if ( gRow == -1 )
		{ // update entire rows
			for ( var k=1 ; k <= window.MonthCalPopup_targetInput.rowCount ; k++ )
			{
				// 행의 RowEditable 이 TRUE 인 경우만 UPDATE
				if ( window.MonthCalPopup_targetInput.GetRowEditable(k) == true )
				{
					window.MonthCalPopup_targetInput.SetCellValue(k, gCol,formatDate(d,window.MonthCalPopupGrid_dateFormat),0);
				}
			}
//				window.MonthCalPopup_targetInput.SelectCell(gRow, gCol);
		}
		else
		{
			window.MonthCalPopup_targetInput.SetCellValue(gRow, gCol,formatDate(d,window.MonthCalPopupGrid_dateFormat),0);
			//window.MonthCalPopup_targetInput.SelectCell(gRow, gCol);
		}
		window.MonthCalPopup_targetInput2.value=formatDate(d,window.MonthCalPopup_dateFormat);
		window.MonthCalPopup_targetInput2.focus();
	}
	else
	{
		alert('Use setReturnFunction() to define which function will get the clicked results!');
	}
}
// Temporary default functions to be called when items clicked, so no error is thrown
/**
 *작성자 : 김성욱
 *기능   : from,to 폼필드를 업데이트한다.
**/
function MonthCalPopup_tmpReturnFunctionFromTo()
{
	if (window.MonthCalPopup_targetInput!=null && window.MonthCalPopup_targetInput2!=null)
	{
		window.MonthCalPopup_targetInput.value=this.window.document.form1.from.value;//formatDate(d,window.MonthCalPopup_dateFormat);
		window.MonthCalPopup_targetInput2.value=this.window.document.form1.to.value;//formatDate(d,window.MonthCalPopup_dateFormat);
		window.MonthCalPopup_targetInput2.focus();
	}
	else
	{
		alert('Use setReturnFunction() to define which function will get the clicked results!');
	}
}
// Temporary default functions to be called when items clicked, so no error is thrown
/**
 *작성자 : 김성욱
 *기능   : 팝업의 from,to 폼필드를 업데이트한다.
**/
function MonthCalPopup_setFromTo()
{
	if (window.MonthCalPopup_targetInput!=null && window.MonthCalPopup_targetInput2!=null)
	{
		var d=new Date(y,m-1,d,0,0,0);
		window.MonthCalPopup_targetInput.value=formatDate(d,window.MonthCalPopup_dateFormat);
		window.MonthCalPopup_targetInput2.value=formatDate(d,window.MonthCalPopup_dateFormat);
		window.MonthCalPopup_targetInput2.focus();
	}
	else
	{
		alert('Use setReturnFunction() to define which function will get the clicked results!');
	}
}
function MonthCalPopup_tmpReturnMonthFunction(y,m) {
	alert('Use setReturnMonthFunction() to define which function will get the clicked results!\nYou clicked: year='+y+' , month='+m);
	}
function MonthCalPopup_tmpReturnQuarterFunction(y,q) {
	alert('Use setReturnQuarterFunction() to define which function will get the clicked results!\nYou clicked: year='+y+' , quarter='+q);
	}
function MonthCalPopup_tmpReturnYearFunction(y) {
	alert('Use setReturnYearFunction() to define which function will get the clicked results!\nYou clicked: year='+y);
	}
// Set the name of the functions to call to get the clicked item
function MonthCalPopup_setReturnFunction(name) { this.returnFunction=name; }
function MonthCalPopup_setReturnMonthFunction(name) { this.returnMonthFunction=name; }
function MonthCalPopup_setReturnQuarterFunction(name) { this.returnQuarterFunction=name; }
function MonthCalPopup_setReturnYearFunction(name) { this.returnYearFunction=name; }
// Over-ride the built-in month names
function MonthCalPopup_setMonthNames() {
	for (var i=0; i<arguments.length; i++) { this.monthNames[i]=arguments[i]; }
	}
// Over-ride the built-in month abbreviations
function MonthCalPopup_setMonthAbbreviations() {
	for (var i=0; i<arguments.length; i++) { this.monthAbbreviations[i]=arguments[i]; }
	}
// Over-ride the built-in column headers for each day
function MonthCalPopup_setDayHeaders() {
	for (var i=0; i<arguments.length; i++) { this.dayHeaders[i]=arguments[i]; }
	}
// Set the day of the week (0-7) that the calendar display starts on
// This is for countries other than the US whose calendar displays start on Monday(1), for example
function MonthCalPopup_setWeekStartDay(day) { this.weekStartDay=day; }
// Show next/last year navigation links
function MonthCalPopup_showYearNavigation() { this.isShowYearNavigation=true; }
// Which type of calendar to display
function MonthCalPopup_setDisplayType(type) {
	if (type!="date"&&type!="week-end"&&type!="month"&&type!="quarter"&&type!="year") { alert("Invalid display type! Must be one of: date,week-end,month,quarter,year"); return false; }
	this.displayType=type;
	}
// How many years back to start by default for year display
function MonthCalPopup_setYearSelectStartOffset(num) { this.yearSelectStartOffset=num; }
// Set which weekdays should not be clickable
function MonthCalPopup_setDisabledWeekDays() {
	this.disabledWeekDays=new Object();
	for (var i=0; i<arguments.length; i++) { this.disabledWeekDays[arguments[i]]=true; }
	}
// Set the text to use for the "Today" link
function MonthCalPopup_setTodayText(text) {
	this.todayText=text;
	}
// Hide a calendar object
function MonthCalPopup_hideCalendar() {
	if (arguments.length > 0) { window.MonthCalWindowObjects[arguments[0]].hidePopup(); }
	else { this.hidePopup(); }
	}
// Refresh the contents of the calendar display
function MonthCalPopup_refreshCalendar(index) {
	var calObject=window.MonthCalWindowObjects[index];
	if (arguments.length>1) {
		calObject.populate(calObject.getCalendar(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]));
		}
	else {
		calObject.populate(calObject.getCalendar());
		}
	calObject.refresh();
	}
// Refresh the contents of the calendar display
/*
function MonthCalPopup_refreshCalendar2(index) {
	var calObject=window.MonthCalWindowObjects[index];
	if (arguments.length>1) {
		calObject.populate(calObject.getCalendar2(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]));
		}
	else {
		calObject.populate(calObject.getCalendar2());
		}
	calObject.refresh();
	}
*/
// Refresh the contents of the calendar display
// 수정자 : 김성욱
function MonthCalPopup_refreshCalendarFromTo(index) {
	var calObject=window.MonthCalWindowObjects[index];
	if (arguments.length>1) {
		calObject.populate(calObject.getCalendar(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]));
		}
	else {
		calObject.populate(calObject.getCalendar());
		}
	calObject.refresh();
}
// Populate the calendar and display it
function MonthCalPopup_showCalendar(anchorname)
{
	this.populate(this.getCalendar());
	this.showPopup(anchorname);
}
// Populate the calendar and display it
// 수정자 : 김성욱
function MonthCalPopup_showCalendarFromTo(anchorname)
{
	this.populate(this.getCalendar());
	// this method dont use gRow or gCol
	this.showPopup(anchorname);
}
// Simple method to interface popup calendar with a text-entry box
function MonthCalPopup_select(inputobj, linkname, format) {
	if (!window.getDateFromFormat) {
		alert("calendar.select: To use this method you must also include 'date.js' for date formatting");
		return;
		}
	if (this.displayType!="date"&&this.displayType!="week-end") {
		//alert("calendar.select: This function can only be used with displayType 'date' or 'week-end'");
		//return;
		}
	if (inputobj.type!="text" && inputobj.type!="hidden" && inputobj.type!="textarea") {
		alert("calendar.select: Input object passed is not a valid form input object");
		window.MonthCalPopup_targetInput=null;
		return;
		}
	window.MonthCalPopup_targetInput=inputobj;
	if (inputobj.value!="") {
		var time=getDateFromFormat(inputobj.value,format);
		if (time==0) { this.currentDate=null; }
		else { this.currentDate=new Date(time); }
		}
	else { this.currentDate=null; }
	window.MonthCalPopup_dateFormat=format;
	this.showCalendar(linkname);
	}
// Simple method to interface popup calendar with a text-entry box
function MonthCalPopupGrid_select(inputobj, linkname, row, col, format, to_row, to_col) {
    gRow=row;
    gCol=col;
    toRow=to_row;
    toCol=to_col;
	if (!window.getDateFromFormat) {
		alert("calendar.select: To use this method you must also include 'date.js' for date formatting");
		return;
		}
	if (this.displayType!="date"&&this.displayType!="week-end") {
		alert("calendar.select: This function can only be used with displayType 'date' or 'week-end'");
		return;
		}
//  if (inputobj.type!="text" && inputobj.type!="hidden" && inputobj.type!="textarea") {
//  	alert("calendar.select: Input object passed is not a valid form input object");
//  	window.MonthCalPopup_targetInput=null;
//  	return;
//  	}
	window.MonthCalPopup_targetInput=inputobj;
	if (inputobj.value!="") {
var time=getDateFromFormat(inputobj.GetCellValue(gRow,gCol),format);
		if (time==0) { this.currentDate=null; }
		else { this.currentDate=new Date(time); }
		}
	else { this.currentDate=null; }
	window.MonthCalPopupGrid_dateFormat=format;
	this.showCalendar(linkname);
	}
// Get style block needed to display the calendar correctly
function MonthCalPopup_getStyles() {
	var result="";
	result += "<link href='css/calendar.css' rel='stylesheet' type='text/css'>\n";
	return result;
}
// Return a string containing all the calendar code to be displayed
function MonthCalPopup_getCalendar() {
	var now=new Date();
	// Reference to window
	if (this.type == "WINDOW") { var windowref="window.opener."; }
	else { var windowref=""; }
	var result="";
	// If POPUP, write entire HTML document
	if (this.type == "WINDOW") {
    result += "<html>\n";
    result += "<head>\n";
    result += "<title>Calendar</title>\n";
    result += "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n";
    result += "<link href=\"./web/css/calendar.css\" rel=\"stylesheet\" type=\"text/css\">\n";
    result += "<script language=\"JavaScript\" src=\"./js/common/CoFormControl.js\"></script>\n";
    result += "<script language=\"JavaScript\" src=\"./js/common/CoMessage_ko_KR.js\"></script>\n";
    result += "</head>\n";
    result += "<body> \n";
    result += "<form name=\"form1\"> \n";
    result += "<!-- OUTER - POPUP (S)tart -->\n";
    result += "<table width=\"240\" class=\"popup\" cellpadding=\"8\" border=\"0\"> \n";
    result += "<tr><td class=\"top\"></td></tr>\n";
    result += "<tr><td valign=\"top\">\n";
	}
	// Code for DATE display (default)
	// -------------------------------
	if (this.displayType=="date" || this.displayType=="week-end") {
		if (this.currentDate==null) {
		    this.currentDate=now;
		}
		if (arguments.length > 0) {
		    var month=arguments[0];
		} else {
		    var month=this.currentDate.getMonth()+1;
		}
		if (arguments.length > 1) {
		    var year=arguments[1];
		} else {
		    var year=this.currentDate.getFullYear();
		}
    var from="";
    var to="";
		if (arguments.length > 2) {
		    from=arguments[2];
		    to=arguments[3];
		}
		//alert(from+","+to);
		var daysinmonth=new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
		if ( ( (year%4 == 0)&&(year%100 != 0) ) || (year%400 == 0) ) {
			daysinmonth[2]=29;
			}
		var current_month=new Date(year,month-1,1);
		var display_year=year;
		var display_month=month;
		var display_date=1;
		var weekday=current_month.getDay();
		var offset=0;
		if (weekday >= this.weekStartDay) {
			offset=weekday - this.weekStartDay;
		} else {
			offset=7-this.weekStartDay+weekday;
		}
		if (offset > 0) {
			display_month--;
			if (display_month < 1) {
			    display_month=12; display_year--;
			}
			display_date=daysinmonth[display_month]-offset+1;
		}
		var next_month=month+1;
		var next_month_year=year;
		if (next_month > 12) { next_month=1; next_month_year++; }
		var last_month=month-1;
		var last_month_year=year;
		if (last_month < 1) { last_month=12; last_month_year--; }
		var date_class;
		var refresh='javascript:'+windowref+'MonthCalPopup_refreshCalendarFromTo';
    result += "		<!-- : ( Search Options ) (S) -->\n";
    result += "		<table class=\"search\" style=\"width:224;\" align=\"center\"> \n";
    result += "			<tr><td class=\"bg_a\">\n";
    result += "					<table class=\"search\" border=\"0\" style=\"width:100%\">\n";
    result += "						<tr class=\"h23\">\n";
    result += "							<td width=\"17%\"></td>\n";
    result += "							<td width=\"20%\" style=\"font-size:14px\">"+year+"</td>\n";
    result += "							<td width=\"18%\"><a href='"+refresh+"("+this.index+","+month+","+(year+1)+");'><img src=\"./web/img/button/bu_next01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\"></a><br>\n";
    result += "							<a href='"+refresh+"("+this.index+","+month+","+(year-1)+");'><img src=\"./web/img/button/bu_prev01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\"></a></td>\n";
    result += "							<td width=\"20%\" style=\"font-size:14px\">"+this.monthAbbreviations[month-1]+"</td>\n";
    result += "							<td width=\"8%\"><a href='"+refresh+"("+this.index+","+next_month+","+next_month_year+");'><img src=\"./web/img/button/bu_next01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\"></a><br>\n";
    result += "							<a href='"+refresh+"("+this.index+","+last_month+","+last_month_year+");'><img src=\"./web/img/button/bu_prev01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\"></a></td>\n";
    result += "							<td width=\"17%\"></td>\n";
    result += "						</tr>\n";
    result += "					</table>\n";
    result += "					<!-- : ( Calendar ) (E) -->\n";
    result += "					<table class=\"height_2\"><tr><td></td></tr></table>\n";
    result += "				  <table class=\"height_5\"><tr><td></td></tr></table>\n";
    result += "			</td></tr>\n";
    result += "		</table>\n";
    result += "		<!-- : ( Search Options ) (E) --> \n";
	}
	// Code for YEAR display (default)
	// -------------------------------
	if (this.displayType=="year") {
		var yearColumnSize=4;
		result += '<TABLE WIDTH=144 BORDER=0 BORDERWIDTH=0 CELLSPACING=0 CELLPADDING=0>\n';
		result += '<TR BGCOLOR="#C0C0C0">\n';
		result += '	<TD BGCOLOR="#C0C0C0" CLASS="cal" WIDTH=50% ALIGN=CENTER VALIGN=MIDDLE><B><A CLASS="cal" HREF="javascript:'+windowref+'MonthCalPopup_refreshCalendar('+this.index+','+(year-(yearColumnSize*2))+');">&lt;&lt;</A></B></TD>\n';
		result += '	<TD BGCOLOR="#C0C0C0" CLASS="cal" WIDTH=50% ALIGN=CENTER VALIGN=MIDDLE><B><A CLASS="cal" HREF="javascript:'+windowref+'MonthCalPopup_refreshCalendar('+this.index+','+(year+(yearColumnSize*2))+');">&gt;&gt;</A></B></TD>\n';
		result += '</TR></TABLE>\n';
		result += '<TABLE WIDTH=120 BORDER=0 CELLSPACING=1 CELLPADDING=0 ALIGN=CENTER>\n';
		for (var i=0; i<yearColumnSize; i++) {
			for (var j=0; j<2; j++) {
				var currentyear=year+(j*yearColumnSize)+i;
				result += '<TD WIDTH=50% ALIGN=CENTER><A CLASS="textlink" HREF="javascript:'+windowref+this.returnYearFunction+'('+currentyear+');'+windowref+'MonthCalPopup_hideCalendar(\''+this.index+'\');" CLASS="'+date_class+'">'+currentyear+'</A></TD>';
				}
			result += '</TR>';
			}
		result += '</TABLE></TD></TR></TABLE>\n';
		}
	// Common
	if (this.type == "WINDOW") {
    result += "</td></tr>\n";
    result += "</table> \n";
    result += "<!-- OUTER - POPUP (E)nd -->\n";
    result += "<table class=\"height_10\"><tr><td></td></tr></table> \n";
    result += "<!-- : ( Button : Sub ) (S) -->\n";
    result += "<table width=\"100%\" class=\"sbutton\">\n";
    result += "<tr><td height=\"71\" class=\"popup\">\n";
    result += "		<table class=\"sbutton\">\n";
    result += "		<tr><td class=\"p_bt\">";
    result += "		     <img class=\"cursor\" src=\"./web/img/button/btn_apply.gif\" width=\"66\" height=\"20\" border=\"0\" onClick=\"";
	result += windowref+this.returnFunction+"("+year+","+month+","+daysinmonth[month]+");window.close();\"";
	result += ">";
    result += "		     <img class=\"cursor\" src=\"./web/img/button/btn_close.gif\" width=\"66\" height=\"20\" border=\"0\" onClick=\"window.close();\">\n ";
    result += "		</td></tr>"
    result += "		</table>\n";
    result += "	</td></tr>\n";
    result += "</table>\n";
    result += "<!-- : ( Button : Sub ) (E) -->\n";
    result += "</form> \n";
    result += "</body>\n";
    result += "</html>\n";
		}
	return result;
	}
//------------------------------------------MonthCalWindow--------------------------------------------//
// Set the position of the popup window based on the anchor
function MonthCalWindow_getXYPosition(anchorname) {
	var coordinates;
	if (this.type == "WINDOW") {
		coordinates=getAnchorWindowPosition(anchorname);
		}
	else {
		coordinates=getAnchorPosition(anchorname);
		}
	this.x=coordinates.x+150;
	this.y=coordinates.y;
	}
// Set the position of the popup window based on the anchor
function MonthCalWindowGrid_getXYPosition(anchorname) {
	var coordinates;
	if (this.type == "WINDOW") {
		coordinates=getAnchorWindowPosition(anchorname);
		}
	else {
		coordinates=getAnchorPosition(anchorname);
		}
	this.x=coordinates.x + 155 +  window.MonthCalPopup_targetInput.ColLeft(gCol);
	this.y=coordinates.y + window.MonthCalPopup_targetInput.RowTop(gRow) + 10;
	}
// Set width/height of DIV/popup window
function MonthCalWindow_setSize(width,height) {
	this.width=width;
	this.height=height;
	}
// Fill the window with contents
function MonthCalWindow_populate(contents) {
	this.contents=contents;
	this.populated=false;
	}
// Refresh the displayed contents of the popup
function MonthCalWindow_refresh() {
	if (this.divName != null) {
		// refresh the DIV object
		if (this.use_gebi) {
			document.getElementById(this.divName).innerHTML=this.contents;
			}
		else if (this.use_css) {
			document.all[this.divName].innerHTML=this.contents;
			}
		else if (this.use_layers) {
			var d=document.layers[this.divName];
			d.document.open();
			d.document.writeln(this.contents);
			d.document.close();
			}
		}
	else {
		if (this.MonthCalWindow != null && !this.MonthCalWindow.closed) {
			this.MonthCalWindow.document.open();
			this.MonthCalWindow.document.clear();
			this.MonthCalWindow.document.write(this.contents);
			this.MonthCalWindow.document.close();
			this.MonthCalWindow.focus();
			}
		}
	}
// Position and show the popup, relative to an anchor object
function MonthCalWindow_showPopup(anchorname) {
	this.getXYPosition(anchorname);
	this.x += this.offsetX;
	this.y += this.offsetY;
	if (!this.populated && (this.contents != "")) {
		this.populated=true;
		this.refresh();
		}
	if (this.divName != null) {
		// Show the DIV object
		if (this.use_gebi) {
			document.getElementById(this.divName).style.left=this.x;
			document.getElementById(this.divName).style.top=this.y;
			document.getElementById(this.divName).style.visibility="visible";
			}
		else if (this.use_css) {
			document.all[this.divName].style.left=this.x;
			document.all[this.divName].style.top=this.y;
			document.all[this.divName].style.visibility="visible";
			}
		else if (this.use_layers) {
			document.layers[this.divName].left=this.x;
			document.layers[this.divName].top=this.y;
			document.layers[this.divName].visibility="visible";
			}
		}
	else {
		if (this.MonthCalWindow == null || this.MonthCalWindow.closed) {
			// If the popup window will go off-screen, move it so it doesn't
			if (screen && screen.availHeight) {
				if ((this.y + this.height) > screen.availHeight) {
					this.y=screen.availHeight - this.height;
					}
				}
			if (screen && screen.availWidth) {
				if ((this.x + this.width) > screen.availWidth) {
					this.x=screen.availWidth - this.width;
					}
				}
			this.MonthCalWindow=window.open("about:blank","window_"+anchorname,
			"toolbar=no,location=no,status=no,menubar=no,scrollbars=auto,resizable=no,alwaysRaised,dependent,titlebar=no,width="
			+this.width+",height="+this.height+",screenX="+this.x+",left="+this.x+",screenY="+this.y+",top="+this.y+"");
			}
		this.refresh();
		}
	}
// Hide the popup
function MonthCalWindow_hidePopup() {
	if (this.divName != null) {
		if (this.use_gebi) {
			document.getElementById(this.divName).style.visibility="hidden";
			}
		else if (this.use_css) {
			document.all[this.divName].style.visibility="hidden";
			}
		else if (this.use_layers) {
			document.layers[this.divName].visibility="hidden";
			}
		}
	else {
		if (this.MonthCalWindow && !this.MonthCalWindow.closed) {
			this.MonthCalWindow.close();
			this.MonthCalWindow=null;
			}
		}
	}
// Pass an event and return whether or not it was the popup DIV that was clicked
function MonthCalWindow_isClicked(e) {
	if (this.divName != null) {
		if (this.use_layers) {
			var clickX=e.pageX;
			var clickY=e.pageY;
			var t=document.layers[this.divName];
			if ((clickX > t.left) && (clickX < t.left+t.clip.width) && (clickY > t.top) && (clickY < t.top+t.clip.height)) {
				return true;
				}
			else { return false; }
			}
		else if (document.all) { // Need to hard-code this to trap IE for error-handling
			var t=window.event.srcElement;
			while (t.parentElement != null) {
				if (t.id==this.divName) {
					return true;
					}
				t=t.parentElement;
				}
			return false;
			}
		else if (this.use_gebi) {
			var t=e.originalTarget;
			while (t.parentNode != null) {
				if (t.id==this.divName) {
					return true;
					}
				t=t.parentNode;
				}
			return false;
			}
		return false;
		}
	return false;
	}
// Check an onMouseDown event to see if we should hide
function MonthCalWindow_hideIfNotClicked(e) {
if (this.autoHideSetEnabled && !this.isClicked(e)) {
		this.hidePopup();
		}
	}
// Call this to make the DIV disable automatically when mouse is clicked outside it
function MonthCalWindow_autoHide() {
	this.autoHideSetEnabled(true);
	}
// This global function checks all MonthCalWindow objects onmouseup to see if they should be hidden
function MonthCalWindow_hideMonthCalWindows(e) {
	for (var i=0; i<MonthCalWindowObjects.length; i++) {
		if (MonthCalWindowObjects[i] != null) {
			var p=MonthCalWindowObjects[i];
			p.hideIfNotClicked(e);
			}
		}
	}
// Run this immediately to attach the event listener
function MonthCalWindow_attachListener() {
	if (document.layers) {
		document.captureEvents(Event.MOUSEUP);
		}
	window.MonthCalWindowOldEventListener=document.onmouseup;
	if (window.MonthCalWindowOldEventListener != null) {
		document.onmouseup=new Function("window.MonthCalWindowOldEventListener(); MonthCalWindow_hideMonthCalWindows();");
		}
	else {
		document.onmouseup=MonthCalWindow_hideMonthCalWindows;
		}
	}
// CONSTRUCTOR for the MonthCalWindow object
// Pass it a DIV name to use a DHTML popup, otherwise will default to window popup
function MonthCalWindow() {
	if (!window.MonthCalWindowIndex) { window.MonthCalWindowIndex=0; }
	if (!window.MonthCalWindowObjects) { window.MonthCalWindowObjects=new Array(); }
	if (!window.listenerAttached) {
		window.listenerAttached=true;
		MonthCalWindow_attachListener();
		}
	this.index=MonthCalWindowIndex++;
	MonthCalWindowObjects[this.index]=this;
	this.divName=null;
	this.MonthCalWindow=null;
	this.width=0;
	this.height=0;
	this.populated=false;
	this.visible=false;
	this.autoHideSetEnabled(false);
	this.contents="";
	if (arguments.length>0) {
		this.type="DIV";
		this.divName=arguments[0];
		}
	else {
		this.type="WINDOW";
		}
	this.use_gebi=false;
	this.use_css=false;
	this.use_layers=false;
	if (document.getElementById) { this.use_gebi=true; }
	else if (document.all) { this.use_css=true; }
	else if (document.layers) { this.use_layers=true; }
	else { this.type="WINDOW"; }
	this.offsetX=0;
	this.offsetY=0;
	// Method mappings
	this.getXYPosition=MonthCalWindow_getXYPosition;
	this.populate=MonthCalWindow_populate;
	this.refresh=MonthCalWindow_refresh;
	this.showPopup=MonthCalWindow_showPopup;
	this.hidePopup=MonthCalWindow_hidePopup;
	this.setSize=MonthCalWindow_setSize;
	this.isClicked=MonthCalWindow_isClicked;
	this.autoHide=MonthCalWindow_autoHide;
	this.hideIfNotClicked=MonthCalWindow_hideIfNotClicked;
	}
// CONSTRUCTOR for the MonthCalWindow object
// Pass it a DIV name to use a DHTML popup, otherwise will default to window popup
function MonthCalWindowGrid() {
	if (!window.MonthCalWindowIndex) { window.MonthCalWindowIndex=0; }
	if (!window.MonthCalWindowObjects) { window.MonthCalWindowObjects=new Array(); }
	if (!window.listenerAttached) {
		window.listenerAttached=true;
		MonthCalWindow_attachListener();
		}
	this.index=MonthCalWindowIndex++;
	MonthCalWindowObjects[this.index]=this;
	this.divName=null;
	this.MonthCalWindow=null;
	this.width=0;
	this.height=0;
	this.populated=false;
	this.visible=false;
	this.autoHideSetEnabled(false);
	this.contents="";
	if (arguments.length>0) {
		this.type="DIV";
		this.divName=arguments[0];
		}
	else {
		this.type="WINDOW";
		}
	this.use_gebi=false;
	this.use_css=false;
	this.use_layers=false;
	if (document.getElementById) { this.use_gebi=true; }
	else if (document.all) { this.use_css=true; }
	else if (document.layers) { this.use_layers=true; }
	else { this.type="WINDOW"; }
	this.offsetX=0;
	this.offsetY=0;
	// Method mappings
	this.getXYPosition=MonthCalWindowGrid_getXYPosition;
	this.populate=MonthCalWindow_populate;
	this.refresh=MonthCalWindow_refresh;
	this.showPopup=MonthCalWindow_showPopup;
	this.hidePopup=MonthCalWindow_hidePopup;
	this.setSize=MonthCalWindow_setSize;
	this.isClicked=MonthCalWindow_isClicked;
	this.autoHide=MonthCalWindow_autoHide;
	this.hideIfNotClicked=MonthCalWindow_hideIfNotClicked;
	}
//---------------------------------------------Date----------------------------------------------//
var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
function LZ(x) {return(x<0||x>9?"":"0")+x}
function formatDate(date, format) {
	format=format+"";
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var y=date.getYear()+"";
	var M=date.getMonth()+1;
	var d=date.getDate();
	var H=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real date parts into formatted versions
	var value=new Object();
	if (y.length < 4) {y=""+(y-0+1900);}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	value["M"]=M;
	value["MM"]=LZ(M);
	value["MMM"]=MONTH_NAMES[M-1];
	value["d"]=d;
	value["dd"]=LZ(d);
	value["H"]=H;
	value["HH"]=LZ(H);
	if (H==0){value["h"]=12;}
	else if (H>12){value["h"]=H-12;}
	else {value["h"]=H;}
	value["hh"]=LZ(value["h"]);
	if (H>11){value["K"]=H-12;} else {value["K"]=H;}
	value["k"]=H+1;
	value["KK"]=LZ(value["K"]);
	value["kk"]=LZ(value["k"]);
	if (H > 11) { value["a"]="PM"; }
	else { value["a"]="AM"; }
	value["m"]=m;
	value["mm"]=LZ(m);
	value["s"]=s;
	value["ss"]=LZ(s);
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		if (value[token] != null) { result=result + value[token]; }
		else { result=result + token; }
		}
	return result;
	}
// ------------------------------------------------------------------
// Utility functions for parsing in getDateFromFormat()
// ------------------------------------------------------------------
function _isInteger(val) {
	var digits="1234567890";
	for (var i=0; i < val.length; i++) {
		if (digits.indexOf(val.charAt(i))==-1) { return false; }
		}
	return true;
	}
function _getInt(str,i,minlength,maxlength) {
	for (var x=maxlength; x>=minlength; x--) {
		var token=str.substring(i,i+x);
		if (token.length < minlength) { return null; }
		if (_isInteger(token)) { return token; }
		}
	return null;
	}
// ------------------------------------------------------------------
// getDateFromFormat( date_string , format_string )
//
// This function takes a date string and a format string. It matches
// If the date string matches the format string, it returns the
// getTime() of the date. If it does not match, it returns 0.
// ------------------------------------------------------------------
function getDateFromFormat(val,format) {
	val=val+"";
	format=format+"";
	var i_val=0;
	var i_format=0;
	var c="";
	var token="";
	var token2="";
	var x,y;
	var now=new Date();
	var year=now.getYear();
	var month=now.getMonth()+1;
	var date=now.getDate();
	var hh=now.getHours();
	var mm=now.getMinutes();
	var ss=now.getSeconds();
	var ampm="";
	while (i_format < format.length) {
		// Get next token from format string
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		// Extract contents of value based on format token
		if (token=="yyyy" || token=="yy" || token=="y") {
			if (token=="yyyy") { x=4;y=4; }
			if (token=="yy")   { x=2;y=2; }
			if (token=="y")    { x=2;y=4; }
			year=_getInt(val,i_val,x,y);
			if (year==null) { return 0; }
			i_val += year.length;
			if (year.length==2) {
				if (year > 70) { year=1900+(year-0); }
				else { year=2000+(year-0); }
				}
			}
		else if (token=="MMM"){
			month=0;
			for (var i=0; i<MONTH_NAMES.length; i++) {
				var month_name=MONTH_NAMES[i];
				if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
					month=i+1;
					if (month>12) { month -= 12; }
					i_val += month_name.length;
					break;
					}
				}
			if ((month < 1)||(month>12)){return 0;}
			}
		else if (token=="MM"||token=="M") {
			month=_getInt(val,i_val,token.length,2);
			if(month==null||(month<1)||(month>12)){return 0;}
			i_val+=month.length;}
		else if (token=="dd"||token=="d") {
			date=_getInt(val,i_val,token.length,2);
			if(date==null||(date<1)||(date>31)){return 0;}
			i_val+=date.length;}
		else if (token=="hh"||token=="h") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>12)){return 0;}
			i_val+=hh.length;}
		else if (token=="HH"||token=="H") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>23)){return 0;}
			i_val+=hh.length;}
		else if (token=="KK"||token=="K") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>11)){return 0;}
			i_val+=hh.length;}
		else if (token=="kk"||token=="k") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>24)){return 0;}
			i_val+=hh.length;hh--;}
		else if (token=="mm"||token=="m") {
			mm=_getInt(val,i_val,token.length,2);
			if(mm==null||(mm<0)||(mm>59)){return 0;}
			i_val+=mm.length;}
		else if (token=="ss"||token=="s") {
			ss=_getInt(val,i_val,token.length,2);
			if(ss==null||(ss<0)||(ss>59)){return 0;}
			i_val+=ss.length;}
		else if (token=="a") {
			if (val.substring(i_val,i_val+2).toLowerCase()=="am") {ampm="AM";}
			else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {ampm="PM";}
			else {return 0;}
			i_val+=2;}
		else {
			if (val.substring(i_val,i_val+token.length)!=token) {return 0;}
			else {i_val+=token.length;}
			}
		}
	// If there are any trailing characters left in the value, it doesn't match
	if (i_val != val.length) { return 0; }
	// Is date valid for month?
	if (month==2) {
		// Check for leap year
		if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
			if (date > 29){ return false; }
			}
		else { if (date > 28) { return false; } }
		}
	if ((month==4)||(month==6)||(month==9)||(month==11)) {
		if (date > 30) { return false; }
		}
	// Correct hours value
	if (hh<12 && ampm=="PM") { hh+=12; }
	else if (hh>11 && ampm=="AM") { hh-=12; }
	var newdate=new Date(year,month-1,date,hh,mm,ss);
	return newdate.getTime();
	}
//----------------------Anchor---------------------//
function getAnchorPosition(anchorname) {
	// This function will return an Object with x and y properties
	var useWindow=false;
	var coordinates=new Object();
	var x=0,y=0;
	// Browser capability sniffing
	var use_gebi=false, use_css=false, use_layers=false;
	if (document.getElementById) { use_gebi=true; }
	else if (document.all) { use_css=true; }
	else if (document.layers) { use_layers=true; }
	// Logic to find position
 	if (use_gebi && document.all) {
		x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
		y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
		}
	else if (use_gebi) {
		var o=document.getElementById(anchorname);
		x=o.offsetLeft; y=o.offsetTop;
		}
 	else if (use_css) {
		x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
		y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
		}
	else if (use_layers) {
		var found=0;
		for (var i=0; i<document.anchors.length; i++) {
			if (document.anchors[i].name==anchorname) { found=1; break; }
			}
		if (found==0) {
			coordinates.x=0; coordinates.y=0; return coordinates;
			}
		x=document.anchors[i].x;
		y=document.anchors[i].y;
		}
	else {
		coordinates.x=0; coordinates.y=0; return coordinates;
		}
	coordinates.x=x;
	coordinates.y=y;
	return coordinates;
	}
// getAnchorWindowPosition(anchorname)
//   This function returns an object having .x and .y properties which are the coordinates
//   of the named anchor, relative to the window
function getAnchorWindowPosition(anchorname) {
	var coordinates=getAnchorPosition(anchorname);
	var x=0;
	var y=0;
	if (document.getElementById) {
		if (isNaN(window.screenX)) {
			x=coordinates.x-document.body.scrollLeft+window.screenLeft;
			y=coordinates.y-document.body.scrollTop+window.screenTop;
			}
		else {
			x=coordinates.x+window.screenX+(window.outerWidth-window.innerWidth)-window.pageXOffset;
			y=coordinates.y+window.screenY+(window.outerHeight-24-window.innerHeight)-window.pageYOffset;
			}
		}
	else if (document.all) {
		x=coordinates.x-document.body.scrollLeft+window.screenLeft;
		y=coordinates.y-document.body.scrollTop+window.screenTop;
		}
	else if (document.layers) {
		x=coordinates.x+window.screenX+(window.outerWidth-window.innerWidth)-window.pageXOffset;
		y=coordinates.y+window.screenY+(window.outerHeight-24-window.innerHeight)-window.pageYOffset;
		}
	coordinates.x=x;
	coordinates.y=y;
	return coordinates;
	}
// Functions for IE to get position of an object
function AnchorPosition_getPageOffsetLeft (el) {
	var ol=el.offsetLeft;
	while ((el=el.offsetParent) != null) { ol += el.offsetLeft; }
	return ol;
	}
function AnchorPosition_getWindowOffsetLeft (el) {
	return AnchorPosition_getPageOffsetLeft(el)-document.body.scrollLeft;
	}
function AnchorPosition_getPageOffsetTop (el) {
	var ot=el.offsetTop;
	while((el=el.offsetParent) != null) { ot += el.offsetTop; }
	return ot;
	}
function AnchorPosition_getWindowOffsetTop (el) {
	return AnchorPosition_getPageOffsetTop(el)-document.body.scrollTop;
	}
