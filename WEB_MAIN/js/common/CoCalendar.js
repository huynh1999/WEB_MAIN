/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CoCalendar.js
*@FileTitle  : 달력 관련 공통 함수 정의 Script
*@author     : CLT
*@version    : 1.0
*@since      : 2014/04/08
=========================================================*/

    
    var CAL_DIV_NAME="OpusCalendar";
    var viframe=null;
    /**
     * HTML컨트롤을 위한 달력팝업을 생성하는 Object이다.
     * <br><b>Example :</b>
     * <pre>
     *     //달력을 연다
     *     cal = new ComCalendar();
     *     cal.select(formObject.frDate_cnt, 'yyyy-MM-dd');
     *
     *     //달력열기(월)
     *     cal = new ComCalendar();
     *     cal.setDisplayType('month');
     *     cal.select(formObject.frDate_cnt, 'yyyy-MM');
     *
     *     //달력열기(년)
     *     cal = new ComCalendar();
     *     cal.setDisplayType('year');
     *     cal.select(formObject.frDate_cnt, 'yyyy');
     * </pre>
     * @extends ComCalendarWindow
     * @class ComCalendar
     * @see ComCalendar#select
     */
    function ComCalendar() {
        try {
            var c;
            if (CAL_DIV_NAME != "") {
                c=new ComCalendarWindow(CAL_DIV_NAME);
            } else if (arguments.length>0) {
                c=new ComCalendarWindow(arguments[0]);
            } else {
                c=new ComCalendarWindow();
            }
            c.setSize(234,256);
            c.offsetX=-152;
            c.offsetY=25;
            c.autoHide();
            c.diffDomain=false;
            // Calendar-specific properties
            c.monthNames=new Array("1","2","3","4","5","6","7","8","9","10","11","12");
            c.monthAbbreviations=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
            c.dayHeaders=new Array("SUN","MON","TUE","WED","THU","FRI","SAT");
            c.returnFunction="ComCalendar_tmpReturnFunction";
            c.returnMonthFunction="ComCalendar_tmpReturnMonthFunction";
            c.returnQuarterFunction="ComCalendar_tmpReturnQuarterFunction";
            c.returnYearFunction="ComCalendar_tmpReturnYearFunction";
            c.endFunction="ComCalendar_tmpEndFunction";
            c.weekStartDay=0;
            c.isShowYearNavigation=false;
            c.displayType="date";
            c.disabledWeekDays=new Object();
            c.yearSelectStartOffset=2;
            c.currentDate=null;
            c.todayText="Today";
            window.ComCalendar_targetInput=null;
            window.ComCalendar_targetInput2=null;
            window.ComCalendar_dateFormat="yyyy-MM-dd";
            // Method mappings
            c.setReturnFunction=ComCalendar_setReturnFunction;
            c.setReturnMonthFunction=ComCalendar_setReturnMonthFunction;
            c.setReturnQuarterFunction=ComCalendar_setReturnQuarterFunction;
            c.setReturnYearFunction=ComCalendar_setReturnYearFunction;
            c.setEndFunction=ComCalendar_setEndFunction;
            c.setMonthNames=ComCalendar_setMonthNames;
            c.setMonthAbbreviations=ComCalendar_setMonthAbbreviations;
            c.setDayHeaders=ComCalendar_setDayHeaders;
            c.setWeekStartDay=ComCalendar_setWeekStartDay;
            c.setDisplayType=ComCalendar_setDisplayType;
            c.setDisabledWeekDays=ComCalendar_setDisabledWeekDays;
            c.setYearSelectStartOffset=ComCalendar_setYearSelectStartOffset;
            c.setTodayText=ComCalendar_setTodayText;
            c.showYearNavigation=ComCalendar_showYearNavigation;
            c.showCalendar=ComCalendar_showCalendar;
            c.hideCalendar=ComCalendar_hideCalendar;
            c.getStyles=ComCalendar_getStyles;
            c.refreshCalendar=ComCalendar_refreshCalendar;
            c.getCalendar=ComCalendar_getCalendar;
            c.select=ComCalendar_select;
            c.setDiffDomain=ComCalendar_setDiffDomainFunction;
            // Return the object
            return c;
        } catch(err) { ComFuncErrMsg(err.message); }
    }
    ComCalendar.prototype.select=ComCalendar_select;
    ComCalendar.prototype.setDisplayType=ComCalendar_setDisplayType;
    
    var gRow, gCol;
    
    /**
     * IBSheet의 특정 셀을 위한 달력팝업을 생성하는 Object이다.
     * <br><b>Example :</b>
     * <pre>
     *     //sheetObj.CellValue2(2, "mDate")의 셀에 달력표시 및 값 변경
     *     cal = new ComCalendarGrid();
     *     cal.select(sheetObj, 2, "mDate", 'yyyyMMdd');
     *
     *     //frmMain.txtsDate의 값과 sheetObj의 "mDate"컬럼의 전체행의 값을 변경한다.
     *     cal = new ComCalendarGrid();
     *     cal.select2(frmMain.txtsDate, sheetObj, -1, "mDate", 'yyyy-MM-dd');
     *
     *     //frmMain.txtsDate의 값과 sheetObj.CellValue2(2,"mDate")셀의 값을 변경한다.
     *     cal = new ComCalendarGrid();
     *     cal.select2(frmMain.txtsDate, sheetObj, 2, "mDate", 'yyyy-MM-dd');
     * </pre>
     * @extends ComCalendarWindow
     * @class ComCalendarGrid
     * @see ComCalendarGrid#select
     * @see ComCalendarGrid#select2
     */
    function ComCalendarGrid() {
        try {
            var c;
            if (CAL_DIV_NAME != "") {
                c=new ComCalendarWindow(CAL_DIV_NAME);
            } else if (arguments.length>0) {
                c=new ComCalendarWindow(arguments[0]);
                }
            else {
                c=new ComCalendarWindow();
                }
            c.setSize(235,256);
            c.offsetX=-152;
            c.offsetY=25;
            c.autoHide();
            c.diffDomain=false;
           // Calendar-specific properties
            c.monthNames=new Array("1","2","3","4","5","6","7","8","9","10","11","12");
            c.monthAbbreviations=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
            c.dayHeaders=new Array("SUN","MON","TUE","WED","THU","FRI","SAT");
            c.returnFunction="ComCalendar_tmpReturnFunction";
            c.returnMonthFunction="ComCalendar_tmpReturnMonthFunction";
            c.returnQuarterFunction="ComCalendar_tmpReturnQuarterFunction";
            c.returnYearFunction="ComCalendar_tmpReturnYearFunction";
            c.endFunction="ComCalendar_tmpEndFunction";
            c.weekStartDay=0;
            c.isShowYearNavigation=false;
            c.displayType="date";
            c.disabledWeekDays=new Object();
            c.yearSelectStartOffset=2;
            c.currentDate=null;
            c.todayText="Today";
            window.ComCalendar_targetInput=null;// grid
            window.ComCalendar_targetInput2=null;// input field
            window.ComCalendar_dateFormat="yyyyMMdd";
            // Method mappings
            c.setReturnFunction=ComCalendar_setReturnFunction;
            c.setReturnMonthFunction=ComCalendar_setReturnMonthFunction;
            c.setReturnQuarterFunction=ComCalendar_setReturnQuarterFunction;
            c.setReturnYearFunction=ComCalendar_setReturnYearFunction;
            c.setEndFunction=ComCalendar_setEndFunction;
            c.setMonthNames=ComCalendar_setMonthNames;
            c.setMonthAbbreviations=ComCalendar_setMonthAbbreviations;
            c.setDayHeaders=ComCalendar_setDayHeaders;
            c.setWeekStartDay=ComCalendar_setWeekStartDay;
            c.setDisplayType=ComCalendar_setDisplayType;
            c.setDisabledWeekDays=ComCalendar_setDisabledWeekDays;
            c.setYearSelectStartOffset=ComCalendar_setYearSelectStartOffset;
            c.setTodayText=ComCalendar_setTodayText;
            c.showYearNavigation=ComCalendar_showYearNavigation;
            c.showCalendar=ComCalendar_showCalendar;
            c.hideCalendar=ComCalendar_hideCalendar;
            c.getStyles=ComCalendar_getStyles;
            c.refreshCalendar=ComCalendar_refreshCalendar;
            c.getCalendar=ComCalendar_getCalendar;
            c.select=ComCalendarGrid_select;
            // This method fills date information into not only entire column cells in the grid object but also input field.
            c.select2=ComCalendarGrid_select2;
            c.setDiffDomain=ComCalendar_setDiffDomainFunction;
            // Return the object
            return c;
        } catch(err) { ComFuncErrMsg(err.message); }
    }
    ComCalendarGrid.prototype.select=ComCalendarGrid_select;
    ComCalendarGrid.prototype.select2=ComCalendarGrid_select2;
    ComCalendarGrid.prototype.setDisplayType=ComCalendar_setDisplayType;
    
    /**
     * HTML컨트롤이 2개이고, 기간일때 달력팝업을 생성하는 Object이다.
     * <br><b>Example :</b>
     * <pre>
     *     //달력 열기
     *     cal = new ComCalendarFromTo();
     *     cal.select(frmMain.txtsDate, frmMain.txteDate, 'yyyy-MM-dd');
     * </pre>
     * @extends ComCalendarWindow
     * @class ComCalendarFromTo
     * @see ComCalendarFromTo#select
     */
    function ComCalendarFromTo() {
        try {
            var c;
            if (CAL_DIV_NAME != "") {
                c=new ComCalendarWindow(CAL_DIV_NAME);
            } else if (arguments.length>0) {
                c=new ComCalendarWindow(arguments[0]);
            } else {
                c=new ComCalendarWindow();
            }
            c.setSize(235,300);
            c.offsetX=-152;
            c.offsetY=25;
            c.autoHide();
            c.diffDomain=false;
            // Calendar-specific properties
            c.monthNames=new Array("1","2","3","4","5","6","7","8","9","10","11","12");
            c.monthAbbreviations=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
            c.dayHeaders=new Array("SUN","MON","TUE","WED","THU","FRI","SAT");
            c.returnFunction="ComCalendar_tmpReturnFunctionFromTo";      //
            c.returnMonthFunction="ComCalendar_tmpReturnMonthFunction";
            c.returnQuarterFunction="ComCalendar_tmpReturnQuarterFunction";
            c.returnYearFunction="ComCalendar_tmpReturnYearFunction";
            c.endFunction="ComCalendar_tmpEndFunction";
            c.weekStartDay=0;
            c.isShowYearNavigation=false;
            c.displayType="date";
            c.calendar_type="fromto"; //khlee
            c.disabledWeekDays=new Object();
            c.yearSelectStartOffset=2;
            c.currentDate=null;
            c.todayText="Today";
            window.ComCalendar_targetInput=null;// input field1
            window.ComCalendar_targetInput2=null;// input field2
            window.ComCalendar_dateFormat=arguments[2];//"yyyy-mm-dd";
            // Method mappings
            c.setReturnFunction=ComCalendar_setReturnFunction;
            c.setReturnMonthFunction=ComCalendar_setReturnMonthFunction;
            c.setReturnQuarterFunction=ComCalendar_setReturnQuarterFunction;
            c.setReturnYearFunction=ComCalendar_setReturnYearFunction;
            c.setEndFunction=ComCalendar_setEndFunction;
            c.setMonthNames=ComCalendar_setMonthNames;
            c.setMonthAbbreviations=ComCalendar_setMonthAbbreviations;
            c.setDayHeaders=ComCalendar_setDayHeaders;
            c.setWeekStartDay=ComCalendar_setWeekStartDay;
            c.setDisplayType=ComCalendar_setDisplayType;
            c.setDisabledWeekDays=ComCalendar_setDisabledWeekDays;
            c.setYearSelectStartOffset=ComCalendar_setYearSelectStartOffset;
            c.setTodayText=ComCalendar_setTodayText;
            c.showYearNavigation=ComCalendar_showYearNavigation;
            c.showCalendar=ComCalendar_showCalendar; //
            c.hideCalendar=ComCalendar_hideCalendar;
            c.getStyles=ComCalendar_getStyles;
            c.refreshCalendar=ComCalendar_refreshCalendar; //
            c.getCalendar=ComCalendar_getCalendar; //
            c.select=ComCalendar_selectFromTo; //
            c.setDiffDomain=ComCalendar_setDiffDomainFunction;
            // Return the object
            return c;
        } catch(err) { ComFuncErrMsg(err.message); }
    }

     /**
      * HTML컨트롤이 2개이고, 기간일때 달력팝업을 생성하는 Object이다.
      * <br><b>Example :</b>
      * <pre>
      *     //달력 열기
      *     cal = new ComCalendarFromTo();
      *     cal.select(frmMain.txtsDate, frmMain.txteDate, 'yyyy-MM-dd');
      * </pre>
      * @extends ComCalendarWindow
      * @class ComCalendarFromTo
      * @see ComCalendarFromTo#select
      */
     function ComCalendarFromTo(novalidaterform) {
             var c;
             if (CAL_DIV_NAME != "") {
                 c=new ComCalendarWindow(CAL_DIV_NAME);
             } else if (arguments.length>0) {
                 c=new ComCalendarWindow(arguments[0]);
             } else {
                 c=new ComCalendarWindow();
             }

             c.setSize(235,300);
             c.offsetX=-152;
             c.offsetY=25;
             c.autoHide();
             c.diffDomain=false;
             // Calendar-specific properties
             c.monthNames=new Array("1","2","3","4","5","6","7","8","9","10","11","12");
             c.monthAbbreviations=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
             c.dayHeaders=new Array("SUN","MON","TUE","WED","THU","FRI","SAT");
             c.returnFunction="ComCalendar_tmpReturnFunctionFromTo";      //
             c.returnMonthFunction="ComCalendar_tmpReturnMonthFunction";
             c.returnQuarterFunction="ComCalendar_tmpReturnQuarterFunction";
             c.returnYearFunction="ComCalendar_tmpReturnYearFunction";
             c.endFunction="ComCalendar_tmpEndFunction";
             c.weekStartDay=0;
             c.isShowYearNavigation=false;
             c.displayType="date";
             c.calendar_type="fromto"; //khlee
             c.disabledWeekDays=new Object();
             c.yearSelectStartOffset=2;
             c.currentDate=null;
             c.todayText="Today";
             window.ComCalendar_targetInput=null;// input field1
             window.ComCalendar_targetInput2=null;// input field2
             window.ComCalendar_dateFormat=arguments[2];//"yyyy-mm-dd";
             // Method mappings
             c.setReturnFunction=ComCalendar_setReturnFunction;
             c.setReturnMonthFunction=ComCalendar_setReturnMonthFunction;
             c.setReturnQuarterFunction=ComCalendar_setReturnQuarterFunction;
             c.setReturnYearFunction=ComCalendar_setReturnYearFunction;
             c.setEndFunction=ComCalendar_setEndFunction;
             c.setMonthNames=ComCalendar_setMonthNames;
             c.setMonthAbbreviations=ComCalendar_setMonthAbbreviations;
             c.setDayHeaders=ComCalendar_setDayHeaders;
             c.setWeekStartDay=ComCalendar_setWeekStartDay;
             c.setDisplayType=ComCalendar_setDisplayType;
             c.setDisabledWeekDays=ComCalendar_setDisabledWeekDays;
             c.setYearSelectStartOffset=ComCalendar_setYearSelectStartOffset;
             c.setTodayText=ComCalendar_setTodayText;
             c.showYearNavigation=ComCalendar_showYearNavigation;
             c.showCalendar=ComCalendar_showCalendar; //
             c.hideCalendar=ComCalendar_hideCalendar;
             c.getStyles=ComCalendar_getStyles;
             c.refreshCalendar=ComCalendar_refreshCalendar; //
             c.getCalendar=ComCalendar_getCalendar; //
             c.select=ComCalendar_selectFromTo; //
             c.setDiffDomain=ComCalendar_setDiffDomainFunction;
             c.validateForm=novalidaterform;
             // Return the object
             return c;
     }

    ComCalendarFromTo.prototype.select=ComCalendar_selectFromTo;

    // Temporary default functions to be called when items clicked, so no error is thrown
    function ComCalendar_tmpReturnFunction(y,m,d) {
        if (window.ComCalendar_targetInput!=null) {
            var tmp=new Date();
            var d=new Date(y,m-1,d,tmp.getHours(),tmp.getMinutes(),tmp.getSeconds());
            var sVal=formatDate(d,window.ComCalendar_dateFormat);
            if (window.ComCalendar_targetInput && window.ComCalendar_targetInput.IBSheetVersion) {
                //Row인자가 -1이면 IBSheet 행 전체의 값을 변경하고, Row값이 특정행의 값이면 해당 행에만 값을 변경한다.
                if (gRow==-1) {
                    // update entire rows
                    window.ComCalendar_targetInput.RenderSheet(0);
                    for ( var k=window.ComCalendar_targetInput.HeaderRows() ; k <= window.ComCalendar_targetInput.LastRow() ; k++ ) {
                        // 행의 RowEditable 이 TRUE 인 경우만 UPDATE
                        if ( !window.ComCalendar_targetInput.GetRowEditable(k)) continue;
                        var oldDate=window.ComCalendar_targetInput.GetCellValue(k, gCol);
                        if( oldDate.length > 10 )
                        	window.ComCalendar_targetInput.SetCellValue(k, gCol,sVal + oldDate.substring(9,oldDate.length),0);
                        else
                        	window.ComCalendar_targetInput.SetCellValue(k, gCol,sVal,0);
                    }
                    window.ComCalendar_targetInput.RenderSheet(1);
                } else {
                    // update one row
                	var oldDate=window.ComCalendar_targetInput.GetCellValue(gRow, gCol);
                    if( oldDate.length > 10 )
                    	window.ComCalendar_targetInput.SetCellValue(gRow, gCol,sVal + oldDate.substring(9,oldDate.length),0);
                    else
                    	window.ComCalendar_targetInput.SetCellValue(gRow, gCol,sVal,0);
                }
            } else {
                window.ComCalendar_targetInput.value=formatDate(d,window.ComCalendar_dateFormat);
                window.ComCalendar_targetInput.focus();
            }
        } else {
            alert('Use setReturnFunction() to define which function will get the clicked results!');
        }
        if (window.ComCalendar_targetInput2!=null) {
            window.ComCalendar_targetInput2.value=formatDate(d,window.ComCalendar_dateFormat);
            window.ComCalendar_targetInput2.focus();
        }
    }
    // Temporary default functions to be called when items clicked, so no error is thrown
    /**
     *작성자 : 김성욱
     *기능   : from,to 폼필드를 업데이트한다.
    **/
    function ComCalendar_tmpReturnFunctionFromTo(sFrom, sTo)
    {
        if (window.ComCalendar_targetInput!=null && window.ComCalendar_targetInput2!=null)
        {
            var fromDate="";
            var toDate="";
            if(sFrom != ""){
            	fromDate=new Date(sFrom.split("-")[0], eval(sFrom.split("-")[1]-1), sFrom.split("-")[2]);
            	window.ComCalendar_targetInput.value=formatDate(fromDate,window.ComCalendar_dateFormat);
            }
            if(sTo != ""){
            	toDate=new Date(sTo.split("-")[0],   eval(sTo.split("-")[1]-1),   sTo.split("-")[2]);
            	window.ComCalendar_targetInput2.value=formatDate(toDate,window.ComCalendar_dateFormat);
            }
            window.ComCalendar_targetInput2.focus();
        }
        else
        {
            alert('Use setReturnFunction() to define which function will get the clicked results!');
        }
    }
    function ComCalendar_tmpEndFunction()
    {
    }
    function ComCalendar_tmpReturnMonthFunction(y,m) {
        alert('Use setReturnMonthFunction() to define which function will get the clicked results!\nYou clicked: year='+y+' , month='+m);
        }
    function ComCalendar_tmpReturnQuarterFunction(y,q) {
        alert('Use setReturnQuarterFunction() to define which function will get the clicked results!\nYou clicked: year='+y+' , quarter='+q);
        }
    function ComCalendar_tmpReturnYearFunction(y) {
        alert('Use setReturnYearFunction() to define which function will get the clicked results!\nYou clicked: year='+y);
        }
    function ComCalendar_setDiffDomainFunction(flag) {
    	this.diffDomain=flag;
        }
    // Set the name of the functions to call to get the clicked item
    function ComCalendar_setReturnFunction(name) { this.returnFunction=name; }
    function ComCalendar_setReturnMonthFunction(name) { this.returnMonthFunction=name; }
    function ComCalendar_setReturnQuarterFunction(name) { this.returnQuarterFunction=name; }
    function ComCalendar_setReturnYearFunction(name) { this.returnYearFunction=name; }
    function ComCalendar_setEndFunction(name) { this.endFunction=name; }
    // Over-ride the built-in month names
    function ComCalendar_setMonthNames() {
        for (var i=0; i<arguments.length; i++) { this.monthNames[i]=arguments[i]; }
        }
    // Over-ride the built-in month abbreviations
    function ComCalendar_setMonthAbbreviations() {
        for (var i=0; i<arguments.length; i++) { this.monthAbbreviations[i]=arguments[i]; }
        }
    // Over-ride the built-in column headers for each day
    function ComCalendar_setDayHeaders() {
        for (var i=0; i<arguments.length; i++) { this.dayHeaders[i]=arguments[i]; }
        }
    // Set the day of the week (0-7) that the calendar display starts on
    // This is for countries other than the US whose calendar displays start on Monday(1), for example
    function ComCalendar_setWeekStartDay(day) { this.weekStartDay=day; }
    // Show next/last year navigation links
    function ComCalendar_showYearNavigation() { this.isShowYearNavigation=true; }
    /**
     * 달력의 표시형태를 설정한다. 설정할수 있는 형태는 다음과 같다.<br>
     *  "date" 		: 기본 달력 <br>
     *  "year" 		: 년도 달력 <br>
     *  "month"		: 월 달력 <br>
     *  "week-end"  : 기본 달력과 동일 <br>
     *  "quarter"	: 분기 달력(사용불가) <br>
     * <br><b>Example :</b>
     * <pre>
     *     //달력열기(기본)
     *     cal = new ComCalendar();
     *     cal.select(formObject.frDate_cnt, 'yyyy-MM-dd');
     *
     *     //달력열기(월)
     *     cal = new ComCalendar();
     *     cal.setDisplayType('month');
     *     cal.select(formObject.frDate_cnt, 'yyyy-MM');
     *
     *     //달력열기(년)
     *     cal = new ComCalendar();
     *     cal.setDisplayType('year');
     *     cal.select(formObject.frDate_cnt, 'yyyy');
     * </pre>
     * @param {string} type       달력 표시 형태, default="date"
     **/
    function ComCalendar_setDisplayType(type) {
        if (type!="date"&&type!="week-end"&&type!="month"&&type!="quarter"&&type!="year") { alert("Invalid display type! Must be one of: date,week-end,month,quarter,year"); return false; }
        //khlee-년도와 월 달력인 경우 높이 변경(보이는 순간에 높이 변경하도록) 함, displayType 속성을 언제 호출할지 모르기 때문임
        if (this.displayType!=type && this.calendar_type!="fromto") {
        	var iHeight=238;
        	var iWidth =235;
	        switch (type) {
	        	case "year":	iWidth=238; iHeight=122; break;
	        	case "month":	iWidth=238; iHeight=145; break;
	        	case "quarter":	iHeight=100; break;
	        }
	        this.setSize(iWidth, iHeight);
	    }
        this.displayType=type;
    }
    // How many years back to start by default for year display
    function ComCalendar_setYearSelectStartOffset(num) { this.yearSelectStartOffset=num; }
    // Set which weekdays should not be clickable
    function ComCalendar_setDisabledWeekDays() {
        this.disabledWeekDays=new Object();
        for (var i=0; i<arguments.length; i++) { this.disabledWeekDays[arguments[i]]=true; }
        }
    // Set the text to use for the "Today" link
    function ComCalendar_setTodayText(text) {
        this.todayText=text;
        }
    // Hide a calendar object
    function ComCalendar_hideCalendar() {
        if (arguments.length > 0) { window.popupWindowObjects[arguments[0]].hidePopup(); }
        else { this.hidePopup(); }
        }
    // Refresh the contents of the calendar display
    function ComCalendar_refreshCalendar(index) {
        var calObject=window.popupWindowObjects[index];
        if (arguments.length>1) {
            calObject.populate(calObject.getCalendar(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]));
            }
        else {
            calObject.populate(calObject.getCalendar());
            }
        calObject.refresh();
        }
    // Populate the calendar and display it
    function ComCalendar_showCalendar(anchorname)
    {
        this.populate(this.getCalendar());
        this.showPopup(anchorname);
    }
    /**
     * HTML태그(Object)에 달력팝업을 표시하고, 날짜를 선택하면 HTML태그(Object)에 값을 변경한다. <br>
     * format 인자에 설정할 수 있는 값은 다음 키워드를 조합한 문자열이다. 예를 들어 "yyyy-MM-dd"로 조합한다. <br>
     *  "yyyy" : 년 4자리 <br>
     *  "yy"   : 년 2자리 <br>
     *  "MM"   : 월 2자리 <br>
     *  "MMM"  : 월 (Jan,Feb..) <br>
     *  "d"    : 일 1자리 <br>
     *  "dd"   : 일 2자리 <br>
     *  "h"    : 시 1자리 <br>
     *  "hh"   : 시 2자리 <br>
     *  "m"    : 분 1자리 <br>
     *  "mm"   : 분 2자리 <br>
     *  "s"    : 초 1자리 <br>
     *  "ss"   : 초 2자리 <br>
     * <br><b>Example :</b>
     * <pre>
     *     //div 레이어로 달력을 연다
     *     cal = new ComCalendar();
     *     cal.select(formObject.frDate_cnt, 'yyyy-MM-dd');
     *
     *     //달력열기(월)
     *     cal = new ComCalendar();
     *     cal.setDisplayType('month');
     *     cal.select(formObject.frDate_cnt, 'yyyy-MM');
     *
     *     //달력열기(년)
     *     cal = new ComCalendar();
     *     cal.setDisplayType('year');
     *     cal.select(formObject.frDate_cnt, 'yyyy');
     * </pre>
     * @param {object} inputobj     HTML태그(Object)로 input type=text,hidden,textarea만 가능
     * @param {string} format       포멧 "yyyy-MM-dd"
     * @see ComCalendarFromTo#select
     * @see ComCalendarGrid#select
     * @see ComCalendarGrid#select2
     **/
    function ComCalendar_select(inputobj, format) {
        if (this.displayType!="date"&&this.displayType!="week-end") {
            //alert("calendar.select: This function can only be used with displayType 'date' or 'week-end'");
            //return;
            }
        if (inputobj.type!="text" && inputobj.type!="hidden" && inputobj.type!="textarea") {
            alert("calendar.select: Input object passed is not a valid form input object");
            window.ComCalendar_targetInput=null;
            return;
            }
        window.ComCalendar_targetInput=inputobj;
        if (inputobj.value!="") {
            var time=getDateFromFormat(inputobj.value,format);
            if (time==0) { this.currentDate=null; }
            else { this.currentDate=new Date(time); }
            }
        else { this.currentDate=null; }
        window.ComCalendar_dateFormat=format;
        if (inputobj.name==undefined || inputobj.name == "")
            this.showCalendar(inputobj.id);
        else
            this.showCalendar(inputobj.name);
    }
    /**
     * IBSheet의 특정셀 위치에 달력팝업을 표시하고, 날짜를 선택하면 해당 셀에 값을 변경한다. <br>
     * format 인자에 설정할 수 있는 값은 다음 키워드를 조합한 문자열이다. 예를 들어 "yyyy-MM-dd"로 조합한다. <br>
     *  "yyyy" : 년 4자리 <br>
     *  "yy"   : 년 2자리 <br>
     *  "MM"   : 월 2자리 <br>
     *  "MMM"  : 월 (Jan,Feb..) <br>
     *  "d"    : 일 1자리 <br>
     *  "dd"   : 일 2자리 <br>
     *  "h"    : 시 1자리 <br>
     *  "hh"   : 시 2자리 <br>
     *  "m"    : 분 1자리 <br>
     *  "mm"   : 분 2자리 <br>
     *  "s"    : 초 1자리 <br>
     *  "ss"   : 초 2자리 <br>
     * <br><b>Example :</b>
     * <pre>
     *     //달력열기
     *     cal = new ComCalendarGrid();
     *     cal.select(sheetObj, Row, Col, 'yyyyMMdd');
     * </pre>
     * @param {object} inputobj     IBSheet Object ID
     * @param {int}    row          IBSheet의 행번호
     * @param {int}    col          IBSheet의 컬럼번호
     * @param {string} format       결과포멧
     * @see ComCalendar#select
     * @see ComCalendarFromTo#select
     * @see ComCalendarGrid#select2
     **/
    function ComCalendarGrid_select(inputobj, row, col, format) {
        gRow=row;
        gCol=col;
		//khlee-IBSheet에서는 Quarter 달력을 제외하고 모두 사용가능하도록 변경함
        if (this.displayType=="quarter") {
            alert("calendargrid.select: This function can not used with displayType 'quarter'");
            return;
        }
        /*
        if (this.displayType!="date" && this.displayType!="week-end") {
            alert("calendargrid.select: This function can only be used with displayType 'date' or 'week-end'");
            return;
        }*/
        window.ComCalendar_targetInput=inputobj;
        if (inputobj.GetCellValue(gRow,gCol)!="") {
            var time=getDateFromFormat(inputobj.GetCellValue(gRow,gCol),format);
            if (time==0) { this.currentDate=null; }
            else { this.currentDate=new Date(time); }
            }
        else { this.currentDate=null; }
        window.ComCalendar_dateFormat=format;
        if (inputobj.name==undefined || inputobj.name == "")
            this.showCalendar(inputobj.id);
        else
            this.showCalendar(inputobj.name);
        }
    /**
     * IBSheet의 특정셀 위치에 달력팝업을 표시하고, 날짜를 선택하면 해당 셀과  HTML태그(Object)에 값을 변경한다. <br>
     * row인자를 -1로 설정하면 특정셀이 아니라 전체행의 값을 변경한다. <br>
     * format 인자에 설정할 수 있는 값은 다음 키워드를 조합한 문자열이다. 예를 들어 "yyyy-MM-dd"로 조합한다. <br>
     *  "yyyy" : 년 4자리 <br>
     *  "yy"   : 년 2자리 <br>
     *  "MM"   : 월 2자리 <br>
     *  "MMM"  : 월 (Jan,Feb..) <br>
     *  "d"    : 일 1자리 <br>
     *  "dd"   : 일 2자리 <br>
     *  "h"    : 시 1자리 <br>
     *  "hh"   : 시 2자리 <br>
     *  "m"    : 분 1자리 <br>
     *  "mm"   : 분 2자리 <br>
     *  "s"    : 초 1자리 <br>
     *  "ss"   : 초 2자리 <br>
     * <br><b>Example :</b>
     * <pre>
     *     //frmMain.txtsDate의 값과 sheetObj의 "mDate"컬럼의 전체행의 값을 변경한다.
     *     cal = new ComCalendarGrid();
     *     cal.select2(frmMain.txtsDate, sheetObj, -1, "mDate", 'yyyy-MM-dd');
     *
     *     //frmMain.txtsDate의 값과 sheetObj.CellValue2(2,"mDate")셀의 값을 변경한다.
     *     cal = new ComCalendarGrid();
     *     cal.select2(frmMain.txtsDate, sheetObj, 2, "mDate", 'yyyy-MM-dd');
     * </pre>
     * @param {object} input_obj    HTML태그(Object)로 input type=text,hidden,textarea만 가능
     * @param {object} ibsheet_obj  IBSheet Object ID
     * @param {int}    row          IBSheet의 행번호 (-1 일 경우 전체 로우를 업데이트 )
     * @param {int}    col          IBSheet의 컬럼번호
     * @param {string} format       결과포멧
     * @see ComCalendar#select
     * @see ComCalendarFromTo#select
     * @see ComCalendarGrid#select
     **/
    function ComCalendarGrid_select2(input_obj, ibsheet_obj, row, col, format)
    {
        gRow=row;
        gCol=col;
		//khlee-IBSheet에서는 Quarter 달력을 제외하고 모두 사용가능하도록 변경함
        if (this.displayType=="quarter") {
            alert("calendargrid.select2: This function can not used with displayType 'quarter'");
            return;
        }
        /*
        if (this.displayType!="date"&&this.displayType!="week-end") {
            alert("calendargrid.select: This function can only be used with displayType 'date' or 'week-end'");
            return;
            }
            */
        if (input_obj.type!="text" && input_obj.type!="hidden" && input_obj.type!="textarea") {
            alert("calendargrid.select2: Input object passed is not a valid form input object");
            window.ComCalendar_targetInput=null;
            return;
            }
        window.ComCalendar_targetInput=ibsheet_obj; // grid
        window.ComCalendar_targetInput2=input_obj;   // input field
        if (input_obj.value!="") {
            var time=getDateFromFormat(input_obj.value,format);
            if (time==0) { this.currentDate=null; }
            else { this.currentDate=new Date(time); }
            }
        else if (ibsheet_obj.GetCellValue(row,col)!="") {
        var time=getDateFromFormat(ibsheet_obj.GetCellValue(row,col),format);
            if (time==0) { this.currentDate=null; }
            else { this.currentDate=new Date(time); }
            }
        else { this.currentDate=null; }
        window.ComCalendar_dateFormat=format;
        if (ibsheet_obj.id==undefined || ibsheet_obj.id == "")
            this.showCalendar(ibsheet_obj.name);
        else
            this.showCalendar(ibsheet_obj.id);
    }
    /**
     * 기간에 해당하는 2개의 HTML태그(Object) 위치에 달력팝업을 표시하고, 기간의 날짜를 선택하고 "Apply" 버튼을 누르면  2개의 HTML태그(Object)에 값을 변경한다. <br>
     * format 인자에 설정할 수 있는 값은 다음 키워드를 조합한 문자열이다. 예를 들어 "yyyy-MM-dd"로 조합한다. <br>
     *  "yyyy" : 년 4자리 <br>
     *  "yy"   : 년 2자리 <br>
     *  "MM"   : 월 2자리 <br>
     *  "MMM"  : 월 (Jan,Feb..) <br>
     *  "d"    : 일 1자리 <br>
     *  "dd"   : 일 2자리 <br>
     *  "h"    : 시 1자리 <br>
     *  "hh"   : 시 2자리 <br>
     *  "m"    : 분 1자리 <br>
     *  "mm"   : 분 2자리 <br>
     *  "s"    : 초 1자리 <br>
     *  "ss"   : 초 2자리 <br>
     * <br><b>Example :</b>
     * <pre>
     *     //달력 열기
     *     cal = new ComCalendarFromTo();
     *     cal.select(frmMain.txtsDate, frmMain.txteDate, 'yyyy-MM-dd');
     * </pre>
     * @param {object} input_obj1   HTML태그(Object)로 시작일. input type=text,hidden,textarea만 가능
     * @param {object} input_obj2   HTML태그(Object)로 종료일. input type=text,hidden,textarea만 가능
     * @param {string} format       결과
     * @see ComCalendar#select
     * @see ComCalendarGrid#select
     * @see ComCalendarGrid#select2
     **/
    function ComCalendar_selectFromTo(input_obj1, input_obj2, format)
    {
        if (this.displayType!="date"&&this.displayType!="week-end") {
            alert("calendar.selectFromTo: This function can only be used with displayType 'date' or 'week-end'");
            return;
            }
        if (input_obj1.type!="text" && input_obj1.type!="hidden" && input_obj1.type!="textarea") {
            alert("calendar.selectFromTo: Input1 object passed is not a valid form input object");
            window.ComCalendar_targetInput=null;
            return;
            }
        if (input_obj2.type!="text" && input_obj2.type!="hidden" && input_obj2.type!="textarea") {
            alert("calendar.selectFromTo: Input2 object passed is not a valid to input object");
            window.ComCalendar_targetInput2=null;
            return;
            }
        window.ComCalendar_targetInput=input_obj1;   // input field1
        window.ComCalendar_targetInput2=input_obj2;   // input field2
        if (input_obj1.value!="") {
            var time=getDateFromFormat(input_obj1.value,format);
            if (time==0) { this.currentDate=null; }
            else { this.currentDate=new Date(time); }
            }
        else { this.currentDate=null; }
        window.ComCalendar_dateFormat=format;
        
        if (input_obj1.type=="hidden") input_obj1=input_obj2;	//case input1 is hidden
        if (input_obj1.name==undefined || input_obj1.name == "")
            this.showCalendar(input_obj1.id);
        else
            this.showCalendar(input_obj1.name);
    }
    // Get style block needed to display the calendar correctly
    function ComCalendar_getStyles() {
        return "<link href=\"style/css/theme_default.css\" rel=\"stylesheet\" type=\"text/css\">\n";
    }
    //Return a string containing all the calendar code to be displayed
	//arguments[0] : 월
	//arguments[1] : 년
	//arguments[2] : from
	//arguments[3] : to
    function ComCalendar_getCalendar() {
        var now=new Date();
        // Reference to window
        if (this.type == "WINDOW") { var windowref="window.opener."; }
        else if(this.use_gebi)  { var windowref="parent."; } //khlee
        else { var windowref=""; }
        var result="";
        // If POPUP, write entire HTML document
        if (this.type == "WINDOW" || this.use_gebi) {
            result += "<!DOCTYPE html>																														\n";
            result += "<html lang=\"en\">																													\n";
            result += "<head>																																\n";
            result += "<meta charset=\"utf-8\" />																											\n";
            result += "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\" />																	\n";
            result += "<title>OPUS Calendar(Redesign)</title>																								\n";
            result += "<link href=\"style/css/theme_default.css\" rel=\"stylesheet\" type=\"text/css\">														\n";
            result += "<script language=\"javascript\" type=\"text/javascript\" src=\"js/common/CoFormControl.js\"></script>								\n";
            if (this.calendar_type=="fromto") {
            	result += "<script language=\"javascript\" type=\"text/javascript\" src=\"js/common/CoCommon.js\"></script>									\n";
                result += "<script language=\"javascript\" type=\"text/javascript\" src=\"js/common/CoMessage.js\"></script>								\n";
                result += "<script language=\"javascript\" type=\"text/javascript\" src=\"style/js/jquery-1.11.0.min.js\"></script>							\n";
                result += "<script language=\"javascript\" type=\"text/javascript\" src=\"style/js/opus_ui.js\"></script>									\n";
                result += "<script language=\"javascript\">                     																			\n";
                result += "  var from_to_cmd = 0;                          																					\n";
                result += "  var focus_fieled = '';                          																				\n";
                result += "  function whichField(sField){                          																			\n";
               // result += "    "+windowref+"document.all.f_cmd.value  = (sField=='from')?0:1;\n";
                result += "    		"+windowref+"document.getElementsByName('f_cmd')[0].value  = (sField=='from')?0:1; 										\n";
                result += "    		focus_fieled = sField; 																									\n";
                result += "  }                                                  																			\n";
                result += "  function setFromTo(y,m,d){                         																			\n";
                result += "    var tmp=new Date();                            																				\n";
                result += "    var d=new Date(y,m-1,d,tmp.getHours(),tmp.getMinutes(),tmp.getSeconds());													\n";
                result += "    if (focus_fieled == '') {																									\n";
                result += "    		if (document.getElementsByName('from')[0].value=='' && document.getElementsByName('to')[0].value=='') {					\n";
                result += "    			from_to_cmd = 0;																									\n";		
                result += "    		} else if (document.getElementsByName('from')[0].value == '' && document.getElementsByName('to')[0].value != '') {		\n";
                result += "    			from_to_cmd = 0;																									\n";		
                result += "    		} else if (document.getElementsByName('from')[0].value != '' && document.getElementsByName('to')[0].value == '') {		\n";
                result += "    			from_to_cmd = 1;																									\n";	
                result += "    		} else {																												\n";
                result += "    			from_to_cmd = 0;																									\n";					
                result += "    		}																														\n";
                result += "    } else {																														\n";
                result += "    		if (focus_fieled == 'from') {																							\n";
                result += "    			from_to_cmd = 0;																									\n";
                result += "    		} else {																												\n";
                result += "    			from_to_cmd = 1;																									\n";
                result += "    		}																														\n";
                result += "    }																															\n";
                //result += "    if (document.getElementsByName('from')[0].value=='' && document.getElementsByName('to')[0].value=='') {		\n";
                //result += "    		"+windowref+"document.all.f_cmd.value  = 0\n";
                //result += "    		from_to_cmd  =0;\n";
                //result += "    }		\n";
                //result += "    if("+windowref+"document.all.f_cmd.value == '1') {                    	    \n";
                result += "    if(from_to_cmd== '1') {                    	    																			\n";
                result += "    		document.getElementsByName('to')[0].value=" +windowref+ "formatDate(d,'yyyy-MM-dd');									\n";
                result += "    		document.getElementsByName('from')[0].focus();                   														\n";
                result += "    		focus_fieled = 'from'; 																									\n";
                result += "    }else{                    	    																							\n";
                result += "    		document.getElementsByName('from')[0].value=" +windowref+ "formatDate(d,'yyyy-MM-dd');									\n";
                result += "    		document.getElementsByName('to')[0].focus();                   															\n";
                result += "    		focus_fieled = 'to'; 																									\n";
                result += "     }                                                  																			\n";
                result += "  }                                                  																			\n";
                result += "                                                     																			\n";
                result += "  function returnFromTo(){                                																		\n";
                result += "    var tmpInterval=ComGetDaysBetween(document.getElementsByName('from')[0],document.getElementsByName('to')[0]);                \n";
                result += "    if(!ComIsDate(document.getElementsByName('from')[0])||!ComIsDate(document.getElementsByName('to')[0])){                      \n";
                result += "      ComShowCodeMessage(\'COM12132\');                            																\n";
                result += "      return;                                                          															\n";
                result += "    }else{                                                             															\n";
                result += "      if(tmpInterval<0){                                               															\n";
                result += "        ComShowMessage(\'End date must be greater than start date.\'); 															\n";
                result += "        return;                                                        															\n";
                result += "      }                                                                															\n";
                result += "    }                                                                  															\n";
                result += "    "+windowref+"ComCalendar_tmpReturnFunctionFromTo(document.getElementsByName('from')[0].value, document.getElementsByName('to')[0].value);     \n";
                result += "    "+windowref+this.endFunction+"();                                  															\n";
                result += "    "+windowref+"ComCalendar_hideCalendar("+this.index+");                                  										\n";
                result += "  }                                                  																			\n";
                result += "  function returnNoFromTo(){                                																		\n";
                result += "    var tmpInterval=ComGetDaysBetween(document.getElementsByName('from')[0],document.getElementsByName('to')[0]);                \n";
                result += "    if(!ComIsDate(document.getElementsByName('from')[0])){                              											\n";
                result += "      ComShowCodeMessage(\'COM12132\');                            																\n";
                result += "      return;                                                          															\n";
                result += "    } 	                                                          																\n";
                result += "    "+windowref+"ComCalendar_tmpReturnFunctionFromTo(document.getElementsByName('from')[0].value, document.getElementsByName('to')[0].value);     \n";
                result += "    "+windowref+this.endFunction+"();                                  															\n";
                result += "    "+windowref+"ComCalendar_hideCalendar("+this.index+");                                 	 									\n";
                result += "  }                                                  																			\n";
                result += "</script>                                            																			\n";
            }
            result += "</head>\n";
            result += "<script language=\"javascript\">\n";
            result += "if(document.attachEvent){document.attachEvent(\"onkeydown\", " + windowref + "document_onkeydown );}else{document.addEventListener(\"keydown\", " + windowref + "document_onkeydown , false);}\n";
            result += "</script>\n";
            result += "<body  marginHeight=0 marginWidth=0 style=\"overflow:hidden\" onkeydown='javascript:if (event.keyCode==27) {" + windowref + "ComCalendar_hideCalendar("+this.index+");}'>\n"
            result += "<!-- OUTER - POPUP (S)tart -->\n"
            result += "<div class=\"calendar_wrap\">\n"
        }
        if (this.currentDate==null)  this.currentDate=now;
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
        var sRefresh='javascript:'+windowref+'ComCalendar_refreshCalendar';
        // Code for DATE display (default)
        // -------------------------------
        if (this.displayType=="date" || this.displayType=="week-end") {
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
            var sFromToParam=(this.calendar_type=="fromto")?",document.getElementsByName('from')[0].value,document.getElementsByName('to')[0].value":"";
        	result += "    <div class=\"calendar_year  align_center\">\n";
        	result += "        <span>\n";
        	result += "            "+year+"<!-- \n";
        	result += "         --><span>\n";
        	result += "                <button type=\"button\" class=\"prev_year ir\" onclick=\""+sRefresh+"("+this.index+","+month+","+(year-1)+sFromToParam+");\">Previous year</button>\n";
        	result += "                <button type=\"button\" class=\"next_year ir\" onclick=\""+sRefresh+"("+this.index+","+month+","+(year+1)+sFromToParam+");\">Next year</button>\n";
        	result += "            </span>\n";
        	result += "        </span>\n";
        	result += "        <span>\n";
        	result += "            "+this.monthAbbreviations[month-1]+"<!-- \n";
        	result += "         --><span>\n";
        	result += "                <button type=\"button\" class=\"prev_year ir\" onclick=\""+sRefresh+"("+this.index+","+last_month+","+last_month_year+sFromToParam+");\">Previous month</button>\n";
        	result += "                <button type=\"button\" class=\"next_year ir\" onclick=\""+sRefresh+"("+this.index+","+next_month+","+next_month_year+sFromToParam+");\">Next month</button>\n";
        	result += "            </span>\n";
        	result += "        </span>\n";
        	result += "    </div>\n";

        	result += "    <table>\n";
        	result += "        <thead>\n";
        	result += "            <tr>\n";
        	result += "                <th scope=\"col\" title=\"Sunday\">Su</th>\n";
        	result += "                <th scope=\"col\" title=\"Monday\">Mo</th>\n";
        	result += "                <th scope=\"col\" title=\"Tuesday\">Tu</th>\n";
        	result += "                <th scope=\"col\" title=\"Wednesday\">We</th>\n";
        	result += "                <th scope=\"col\" title=\"Thursday\">Th</th>\n";
        	result += "                <th scope=\"col\" title=\"Friday\">Fr</th>\n";
        	result += "                <th scope=\"col\" title=\"Saturday\">Sa</th>\n";
        	result += "            </tr>\n";
        	result += "        </thead>\n";
        	result += "        <tbody>\n";
        	
        	var targetDate1 = window.ComCalendar_targetInput.value;
        	
        	for (var row=1; row<=6; row++) {
        		result += "            <tr>\n";
                for (var col=1; col<=7; col++) {
                    switch(col){
                        case 1:	//sun
                            dayClass=" bgcolor=\"#FEF8FA\""; break;
                        case 7:	//sat
                            dayClass=" bgcolor=\"#F7FBFE\""; break;
                        default:
                            dayClass=""; break;
                    }
                    var selected_date=display_date;
                    var selected_month=display_month;
                    var selected_year=display_year;
                    if (this.displayType=="week-end") {
                        var d=new Date(selected_year,selected_month-1,selected_date,0,0,0,0);
                        d.setDate(d.getDate() + (7-col));
                        selected_year=d.getYear();
                        if (selected_year < 1000) {
                            selected_year += 1900;
                        }
                        selected_month=d.getMonth()+1;
                        selected_date=d.getDate();
                    }
                    var sDateStyle="";
                    if(selected_month != month){
                    	dayClass="class=\"non_active\"";
                    } else {
                    	dayClass="";	//clt-sun,sat 배경색 없기로 디자인 함
                    }
                    	
                    var selected_month_temp=selected_month;
                    var selected_date_temp=selected_date;
                    var display_date_temp=display_date;
                    if (selected_month < 10) { selected_month_temp="0" + selected_month; }
                    if (selected_date  < 10) { selected_date_temp="0" + selected_date; }
                    if (display_date   < 10) { display_date_temp="0" + display_date; }
                    
                    var sCalDate = (year + "-" +selected_month_temp + "-" + display_date_temp);
                    if (targetDate1==sCalDate) dayClass="class=\"today\"";
                    if (this.calendar_type=="fromto") {
                        result += "                <td "+dayClass+ " onclick=\"setFromTo('"+selected_year+"','"+selected_month_temp+"','"+selected_date_temp+"');\">";
                    }else{
                        result += "                <td "+dayClass+ " onclick='javascript:"+windowref+this.returnFunction+"("+selected_year+","+selected_month+","+selected_date+");"+windowref+this.endFunction+"();"+windowref+"ComCalendar_hideCalendar(\""+this.index+"\");' " + sDateStyle + ">";
                    }
                    result += display_date_temp+"</td>\n";
                    display_date++;
                    if (display_date > daysinmonth[display_month]) {
                        display_date=1;
                        display_month++;
                    }
                    if (display_month > 12) {
                        display_month=1;
                        display_year++;
                    }
                }
        		result += "            </tr>\n";
            }
            var current_weekday=now.getDay();
            result += "        </tbody>\n"
            result += "    </table>\n"
            if (this.calendar_type=="fromto") {
            	result += "    <div class=\"calendar_apply\">\n";
            	result += "        <input maxlength=\"10\" name=\"from\" type=\"text\" value=\""+from+"\" onFocus=\"whichField(this.name)\" readonly/> <span>-</span> \n";
            	result += "        <input maxlength=\"10\" name=\"to\"   type=\"text\" value=\""+to+"\"   onFocus=\"whichField(this.name)\" readonly class=\"day_to\" />\n";
            	result += "        <button type=\"button\" class=\"btn_etc\" style=\"width:48px\" onclick=\"returnFromTo();\">Apply</button>\n";
            	result += "    </div>\n";
            }
        }
        
        // Code for YEAR display (default)
        // -------------------------------
        if (this.displayType=="year") {
        	var fromYear=(year.toString().substr(0,3) + "1").parseInt();
        	var toYear=fromYear + 9;
        	result += "    <div class=\"calendar_year  align_center\">\n";
        	result += "        <span>\n";
        	result += "            "+year+"<!-- \n";
        	result += "         --><span>\n";
        	result += "                <button type=\"button\" class=\"prev_year ir\" onclick=\""+sRefresh+"("+this.index+","+month+","+(year-1)+");\">Previous year</button>\n";
        	result += "                <button type=\"button\" class=\"next_year ir\" onclick=\""+sRefresh+"("+this.index+","+month+","+(year+1)+");\">Next year</button>\n";
        	result += "            </span>\n";
        	result += "        </span>\n";
        	result += "    </div>\n";
        	result += "    <table>\n";
        	result += "        <tbody>\n";
            for (var row=0; row<2; row++) {
            	result += "            <tr>\n";
                for (var col=0; col<5; col++) {
					result += '                <td onclick=\"javascript:'+windowref+this.returnFunction+'('+fromYear+',1,1);'+windowref+this.endFunction+'();'+windowref+'ComCalendar_hideCalendar('+this.index+');\" >'+fromYear+'</td>\n';
                    fromYear++;
                }
                result += "            </tr>\n";
            }
        	result += "        </tbody>\n";
        	result += "    </table>\n";
        }
        // Code for Month display (default)
        // -------------------------------
        if (this.displayType=="month") {
        	result += "    <div class=\"calendar_year align_center\">\n";
        	result += "        <span>\n";
        	result += "            "+year+"<!-- \n";
        	result += "         --><span>\n";
        	result += "                <button type=\"button\" class=\"prev_year ir\" onclick=\""+sRefresh+"("+this.index+","+month+","+(year-1)+");\">Previous year</button>\n";
        	result += "                <button type=\"button\" class=\"next_year ir\" onclick=\""+sRefresh+"("+this.index+","+month+","+(year+1)+");\">Next year</button>\n";
        	result += "            </span>\n";
        	result += "        </span>\n";
        	result += "    </div>\n";
        	result += "    <table>\n";
        	result += "        <tbody>\n";
			month=1;
            for (var row=0; row<2; row++) {
            	result += "            <tr>\n";
                for (var col=0; col<6; col++) {
					result += '            <td onclick=\"javascript:'+windowref+this.returnFunction+'('+year+','+month+',1);'+windowref+this.endFunction+'();'+windowref+'ComCalendar_hideCalendar('+this.index+');\" >'+month.toString().lpad(2, '0')+'</td>\n';
                    month++;
                }
            	result += "            </tr>\n";
            }
        	result += "        </tbody>\n";
        	result += "    </table>\n";
        }
        // Common
        if (this.type == "WINDOW" || this.use_gebi) {
    		result += "    <button type=\"button\" class=\"calendar_close ir\" onclick=\"" + windowref + "ComCalendar_hideCalendar("+this.index+");\">Calendar close</button>\n"
            result += "</div>\n"
            result += "</body>\n"
            result += "</html>\n"
        }

        //parent.document.all["txtaDebug"].value = result;
        return result;
    }
    //------------------------------------------ComCalendarWindow--------------------------------------------//
    // Set the position of the popup window based on the anchor
    function ComCalendarWindow_getXYPosition(anchorname) {
        var coordinates;
        if (this.type == "WINDOW") {
            coordinates=getAnchorWindowPosition(anchorname);
            }
        else {
            coordinates=getAnchorPosition(anchorname);
         }

        //khlee-IBSheet에서 팝업을 연 경우
        if (window.ComCalendar_targetInput && window.ComCalendar_targetInput.IBSheetVersion) {
        	var CellX=coordinates.x + window.ComCalendar_targetInput.ColLeft(gCol);
        	var CellY=0;
        	var CellWidth=window.ComCalendar_targetInput.GetColWidth(gCol);
              if (gRow < window.ComCalendar_targetInput.HeaderRows()) {
              CellY=coordinates.y +window.ComCalendar_targetInput.RowTop(window.ComCalendar_targetInput.GetTopRow());
            } else {
              CellY=coordinates.y +window.ComCalendar_targetInput.RowTop(gRow);
            }
            if(window.document.body.clientHeight-CellY-this.height<0){
            	if (CellY-this.height-20<0)
            		this.y=0;
            	else
            		this.y=CellY-this.height-20;
            }else
    	        this.y=CellY;
            if(window.document.body.clientWidth-(CellX+this.width)<0){
            	this.x=CellX+150+CellWidth-this.width;
            }else{
            	this.x=CellX+150;
            }
            //건수정보가 표시될 때 달력위치를 조금 내린다.
            //if (window.ComCalendar_targetInput.GetCountPosition()!= 0)  this.y += 16;
        }else{
            if(window.document.body.clientHeight-coordinates.y-this.height<0){
            	if (coordinates.y-this.height-20<0)
            		this.y=0;
            	else
            		this.y=coordinates.y-this.height-20;
            }else
    	        this.y=coordinates.y;
            if(window.document.body.clientWidth-(coordinates.x+150+this.width)<0)
            	this.x=coordinates.x+250-this.width;
            else
            	this.x=coordinates.x+150;
        }
    }
    // Set width/height of DIV/popup window
    function ComCalendarWindow_setSize(width,height) {
        this.width=width;
        this.height=height;
        //khlee-div인 경우 크기 설정
        if (this.divName != "" && document.getElementById(this.divName) != null) {
            document.getElementById(this.divName).style.height=height;
            document.getElementById(this.divName).style.width=width;
        }
    }
    // Fill the window with contents
    function ComCalendarWindow_populate(contents) {
        this.contents=contents;
        this.populated=false;
        }
    // Refresh the displayed contents of the popup
    function ComCalendarWindow_refresh() {
        if (this.divName != null) {
            if (this.use_gebi) {
            // Iframe 생성은 ComCalendarWindow() 부분으로 옮김.2009-08-14
            	var iDoc=viframe.contentWindow.document;
            	iDoc.open(); 
            	iDoc.write(this.contents);
            	iDoc.close(); 
            	
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
            if (this.popupWindow != null && !this.popupWindow.closed) {
                this.popupWindow.document.open();
                this.popupWindow.document.clear();
                this.popupWindow.document.write(this.contents);
                this.popupWindow.document.close();
                this.popupWindow.focus();
                }
            }
        }
    // Position and show the popup, relative to an anchor object
    function ComCalendarWindow_showPopup(anchorname) {
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
                //현재페이지가 iframe이나 frame 안에 있고, 그것의 scrolling이 불가능한 경우 달력 표시 위치를 변경함
                if(this.diffDomain){
            		if (this.x + this.width  > document.body.clientWidth)   this.x=document.body.clientWidth - this.width;    //넓이초과
            		if (this.y + this.height > document.body.clientHeight)  this.y=document.body.clientHeight - this.height;  //높이초과
                }else{
                	 if (top != self && window.frameElement.scrolling=="no") {
	                	if (this.x + this.width  > document.body.clientWidth)   this.x=document.body.clientWidth - this.width;    //넓이초과
	                    if (this.y + this.height > document.body.clientHeight)  this.y=document.body.clientHeight - this.height;  //높이초과
	                } else if (top != self && window.frameElement.scrolling=="auto") {
	                	if (this.x + this.width  > document.body.clientWidth)   this.x=document.body.clientWidth - this.width;    //넓이초과
	                	// IBTab 사용, div over_wrap으로 Scroll시 오류 수정 :  JIPark - 2018.01.04 
	                	if (typeof(document.getElementsByClassName("over_wrap")) != "undefined" && document.getElementsByClassName("over_wrap") != null) {
		                	if (document.getElementsByClassName("over_wrap")[0].scrollTop > 0) {  
		                    	this.y=this.y - document.getElementsByClassName("over_wrap")[0].scrollTop;
		                    }
	                	}
	                }
                }
                document.getElementById(this.divName).style.left=this.x+'px';
                document.getElementById(this.divName).style.top=this.y+'px';
                document.getElementById(this.divName).style.visibility="visible";
                document.getElementById(this.divName).focus();
                }
            else if (this.use_css) {
                document.all[this.divName].style.left=this.x+'px';
                document.all[this.divName].style.top=this.y+'px';
                document.all[this.divName].style.visibility="visible";
                }
            else if (this.use_layers) {
                document.layers[this.divName].left=this.x+'px';
                document.layers[this.divName].top=this.y+'px';
                document.layers[this.divName].visibility="visible";
                }
            }
        else {
            if (this.popupWindow == null || this.popupWindow.closed) {
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
                this.popupWindow=window.open("about:blank","window_"+anchorname,
                "toolbar=no,location=no,status=no,menubar=no,scrollbars=auto,resizable=no,alwaysRaised,dependent,titlebar=no,width="
                +this.width+"px,height="+this.height+"px,screenX="+this.x+"px,left="+this.x+"px,screenY="+this.y+"px,top="+this.y+"px");
                }
            this.refresh();
            }
        }
    // Hide the popup
    function ComCalendarWindow_hidePopup() {
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
            if (this.popupWindow && !this.popupWindow.closed) {
                this.popupWindow.close();
                this.popupWindow=null;
                }
            }
        }
    // Pass an event and return whether or not it was the popup DIV that was clicked
    function ComCalendarWindow_isClicked(e) {
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
            else if (window.event.srcElement) { // Need to hard-code this to trap IE for error-handling
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
    function ComCalendarWindow_hideIfNotClicked(e) {
    	if (!this.isClicked(e)) {
    	//if (this.autoHideSetEnabled && !this.isClicked(e)) {
            this.hidePopup();
            }
        }
    // Call this to make the DIV disable automatically when mouse is clicked outside it
    function ComCalendarWindow_autoHide() {
        //this.autoHideSetEnabled(true);
        }
    // This global function checks all ComCalendarWindow objects onmouseup to see if they should be hidden
    function ComCalendarWindow_hideCalendarWindows(e) {
        for (var i=0; i<popupWindowObjects.length; i++) {
            if (popupWindowObjects[i] != null  && event.type != "focus" ) {
                var p=popupWindowObjects[i];
                p.hideIfNotClicked(e);
            }
        }
    }
    // Run this immediately to attach the event listener
    function ComCalendarWindow_attachListener() {
        if (document.layers) {
            document.captureEvents(ComEvent.MOUSEUP);
        }
        window.popupWindowOldEventListener=document.onmouseup;
        if (window.popupWindowOldEventListener != null) {
            //기존에 document.onmouseup에  정의된 함수가 있는 경우
            document.onmouseup=new Function("window.popupWindowOldEventListener(); ComCalendarWindow_hideCalendarWindows();");
        } else {
            //기존에 document.onmouseup에  정의된 함수가 없는 경우
            document.onmouseup=ComCalendarWindow_hideCalendarWindows;
        }
        //ActiveX에 포커스가 갔을때 달력DiV 닫기
        var objs=document.getElementsByTagName("OBJECT")
		window.popupWindowOldObjEventListener=new Array(objs.length);
        for(var i=0 ; i < objs.length ; i++){
	        window.popupWindowOldObjEventListener[i]=objs[i].onfocus;
	        if (window.popupWindowOldObjEventListener[i] != null) {
	            //기존에 document.onmouseup에  정의된 함수가 있는 경우
	            objs[i].onfocus=new Function("window.popupWindowOldObjEventListener["+i+"](); ComCalendarWindow_hideCalendarWindows();");
	        } else {
	            //기존에 document.onmouseup에  정의된 함수가 없는 경우
	            objs[i].onfocus=ComCalendarWindow_hideCalendarWindows;
	        }
        }
    }
    // Pass it a DIV name to use a DHTML popup, otherwise will default to window popup
    /**
     * @extends CoCalendar
     * @class ComCalendarWindow 달력팝업에서 사용하는 팝업 Window
     */
    function ComCalendarWindow() {
        try{
        if (!window.popupWindowIndex) { window.popupWindowIndex=0; }
        if (!window.popupWindowObjects) { window.popupWindowObjects=new Array(); }
        //Axon에서 onmouseup을 쓰고 있으므로, 아래와 같은 방법으로 체크한다.
        if (document.onmouseup==null || document.onmouseup.toString().indexOf("ComCalendarWindow_hideCalendarWindows") < 0) {
            ComCalendarWindow_attachListener();
        }
        this.index=popupWindowIndex++;
        popupWindowObjects[this.index]=this;
        this.divName=null;
        this.popupWindow=null;
        this.width=0;
        this.height=0;
        this.populated=false;
        this.visible=false;
        //this.autoHideSetEnabled(false);
        this.contents="";
        if (arguments.length>0) {
            this.type="DIV";
            this.divName="_" + arguments[0] + "_";
            //khlee-div가 없으면 생성한다.
            if (document.getElementById(this.divName) == null) {

                var _divCal=document.createElement("div");
                _divCal.id=this.divName;
                _divCal.style.position = "absolute";
                _divCal.style.overflow = "hidden";
                _divCal.style.left= "0px";
                _divCal.style.top = "0px";
                _divCal.style.width = "270px";
                _divCal.style.height = "300px";
                _divCal.style.zIndex = "1000";
                _divCal.style.visibility="hidden";
                document.body.appendChild(_divCal);

                //var _divCal=document.createElement("<div id='"+  this.divName +"' style='position:absolute; left:0px; top:0px; width:250px; height:300px; z-index:1000; visibility:hidden;'/>");
                //document.body.insertBefore(_divCal);
                var fName=this.divName + "IFrame";
                _divCal.innerHTML="<IFRAME id='"+ fName +"' src='' frameborder=0 marginHeight=0 marginWidth=0 style='position:absolute; overflow:hidden; width:100%; height:100%' />";
                viframe=document.getElementById(fName);
            }
        } else {
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
        this.getXYPosition=ComCalendarWindow_getXYPosition;
        this.populate=ComCalendarWindow_populate;
        this.refresh=ComCalendarWindow_refresh;
        this.showPopup=ComCalendarWindow_showPopup;
        this.hidePopup=ComCalendarWindow_hidePopup;
        this.setSize=ComCalendarWindow_setSize;
        this.isClicked=ComCalendarWindow_isClicked;
        this.autoHide=ComCalendarWindow_autoHide;
        this.hideIfNotClicked=ComCalendarWindow_hideIfNotClicked;
        //khlee
        this.calendar_type="";    //khlee: calendar_type="" 또는 "fromto";
        this.validateForm="";
    } catch(err){
        alert(err);
    }
        }
    //---------------------------------------------Date----------------------------------------------//
    var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December');
    var MONTH_SHORT_NAMES=new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
    function LZ(x) {return(x<0||x>9?"":"0")+x}
    function formatDate(date,format) {
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
        value["MMM"]=MONTH_SHORT_NAMES[M-1];   //value["MMM"]=MONTH_NAMES[M-1];
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
                    if (val.substring(i_val,i_val+MONTH_NAMES[i].length).toLowerCase()==MONTH_NAMES[i].toLowerCase()) {
                        month=i+1;
                        i_val += MONTH_NAMES[i].length;
                        break;
                    } else if (val.substring(i_val,i_val+MONTH_SHORT_NAMES[i].length).toLowerCase()==MONTH_SHORT_NAMES[i].toLowerCase()) {
                        month=i+1;
                        i_val += MONTH_SHORT_NAMES[i].length;
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
        if (use_gebi && document.all[anchorname]) {
            x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
            y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
            }
        else if (use_gebi) {
            var o=document.getElementById(anchorname);
            x=AnchorPosition_getPageOffsetLeft(o);
            y=AnchorPosition_getPageOffsetTop(o);
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
        coordinates.x=x+2;
        coordinates.y=y-4;
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
    	//mig-IBSheet7인 경우 IBSheet7을 감싸고 있는 div로 offset을 계산해야 한다.
    	if (el && el.IBSheetVersion) el=eval("DIV_"+el.id);
        var ol=el.offsetLeft;
        while ((el=el.offsetParent) != null) { ol += el.offsetLeft; }
        return ol;
        }
    function AnchorPosition_getWindowOffsetLeft (el) {
        return AnchorPosition_getPageOffsetLeft(el)-document.body.scrollLeft;
        }
    function AnchorPosition_getPageOffsetTop (el) {
    	//mig-IBSheet7인 경우 IBSheet7을 감싸고 있는 div로 offset을 계산해야 한다.
    	if (el && el.IBSheetVersion) el=eval("DIV_"+el.id);
        var ot=el.offsetTop;
        while((el=el.offsetParent) != null) { ot += el.offsetTop; }
        return ot;
        }
    function AnchorPosition_getWindowOffsetTop (el) {
        return AnchorPosition_getPageOffsetTop(el)-document.body.scrollTop;
        }
