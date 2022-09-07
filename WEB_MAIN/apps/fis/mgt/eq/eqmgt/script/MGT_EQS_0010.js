//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
var tab1click="Y";
var tab2click="";
var show_complete = "N";
function doWork(srcName, strFlg){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj1=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST01;
			if (tab1click == "Y") {
				if (checkDate()) {
					sheetObj.DoSearch("MGT_EQS_0011GS.clt", FormQueryString(formObj) );
				} else {
					alert(getLabel('SYS_COM_ALT010')); 
				}	
			} else {
				sheetObj1.DoSearch("MGT_EQS_0012GS.clt", FormQueryString(formObj) );
			}
			break;
		case "SAVE":
				if (tab1click == "Y") {
					for(var i=1; i<=sheetObj.LastRow();i++){
						// Hidden의 Year, Week를 설정한다.
						if (sheetObj.GetCellValue(i,"year") =='') {
							sheetObj.SetCellValue(i,"year",formObj.year_val.value,0);
						}
						if (sheetObj.GetCellValue(i,"week") =='') {
							sheetObj.SetCellValue(i,"week",formObj.week_val.value,0);
						}
					}
					if(confirm(getLabel('FMS_COM_CFMSAV'))){
						frm1.f_cmd.value=MODIFY;
						show_complete = "Y";
					    sheetObj.DoSave("MGT_EQS_0011GS.clt", FormQueryString(formObj),"ibflag",false);
					}
				} else {
					if (checkLocVal()) {
						if(confirm(getLabel('FMS_COM_CFMSAV'))){
							frm1.f_cmd.value=MODIFY;
							show_complete = "Y";
						    sheetObj1.DoSave("MGT_EQS_0012GS.clt", FormQueryString(formObj),"ibflag",false);
						}
					} else {
						alert('Please Check Location Data'); 
					}
				}
			break;
		case "ADD_ROW":
			sheetObj1.SetSelectRow(sheetObj1.LastRow());
			sheetObj1.DataInsert();
			sheetObj1.SetCellValue(sheetObj1.LastRow(),'seq',sheetObj1.LastRow(),0);
			break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	if (tab1click == "Y") {
		document.forms[0].f_CurPage.value=callPage;
	} else {
		document.forms[1].f_CurPage.value=callPage;
	}
	docObjects[0].RemoveAll();
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;	
	for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
    // 현재의 년도를 구한다.
    var curYear=selectCurYear();
    formObj.year_val.value=curYear;
    // 현재의 주를 구한다.
    var curWeek=selectCurWeek();
    formObj.week_val.value=curWeek;
    // 현재의 주의 기간을 구한다.
    //searchWeekArea(curYear,curWeek);
    chkWeek();
    // 현재의 년도와 주로 Data를 취득한다.
    goTabSelect('01');
	doWork('SEARCHLIST');
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
    switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
		case "sheet2":
			docObjects[1]=sheet_obj;
		break;  
    }
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {     
         case 1:
             with (sheetObj) {
        	       (13, 0, 0, true);

        	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

        	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	       var headers = [ { Text:getLabel('MGT_EQS_0010_HDR1'), Align:"Center"} ];
        	       InitHeaders(headers, info);

        	       var cols = [ {Type:"Status",    Hidden:1,  Width:10,   Align:"Center",  ColMerge:0,   SaveName:"ibflag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	                    {Type:"Seq",       Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"cnt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"cnt_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"st_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"loc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:0,  Width:300,  Align:"Center",  ColMerge:0,   SaveName:"loc_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Combo",     Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"cntr1",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
        	                    {Type:"Combo",     Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"cntr2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
        	                    {Type:"Combo",     Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"cntr3",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
        	                    {Type:"Combo",     Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"cntr4",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:10,   Align:"Center",  ColMerge:0,   SaveName:"bgparam" },
        	                    {Type:"Text",      Hidden:1,  Width:10,   Align:"Center",  ColMerge:0,   SaveName:"year" },
        	                    {Type:"Text",      Hidden:1,  Width:10,   Align:"Center",  ColMerge:0,   SaveName:"week" },
        	                    {Type:"Text",      Hidden:1,  Width:10,   Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
        	        
        	       InitColumns(cols);

        	       SetEditable(1);
        	       SetColProperty("cntr1", {ComboText:'N/A|LOW|MID|HIGH', ComboCode:'0|1|2|3'} );
              	   SetColProperty("cntr2", {ComboText:'N/A|LOW|MID|HIGH', ComboCode:'0|1|2|3'} );
              	   SetColProperty("cntr3", {ComboText:'N/A|LOW|MID|HIGH', ComboCode:'0|1|2|3'} );
              	   SetColProperty("cntr4", {ComboText:'N/A|LOW|MID|HIGH', ComboCode:'0|1|2|3'} );              	   
              	   
              	   SetSheetHeight(500);
              	 sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
            }                                                      
         break;     
 		 case 2:     //Location
 			with (sheetObj) {
	 	       (9, 0, 0, true);
	
	 	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
	
	 	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	 	       var headers = [ { Text:getLabel('MGT_EQS_0010_HDR2'), Align:"Center"} ];
	 	       InitHeaders(headers, info);
	
	 	       var cols = [ {Type:"Status",    Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"ibflag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	 	              {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"del_chk",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
	 	              {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	 	              {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"cnt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	 	              {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"st_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	 	              {Type:"Popup", Hidden:0, Width:130,  Align:"Left",    ColMerge:0,   SaveName:"loc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:0 },
	 	              {Type:"Text",      Hidden:0,  Width:380,  Align:"Center",  ColMerge:0,   SaveName:"loc_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	 	              {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"cnt_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	 	              {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
	 	        
	 	       InitColumns(cols);
	
	 	       SetEditable(1);
	 	       SetSheetHeight(500);
	 	      sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
 			}
 		break;
     }
}
/**
 * sheet1_OnSaveEnd
 */
function sheet1_OnSaveEnd(){
	sheet1_OnSearchEnd();
}
/**
 * sheet2_OnSaveEnd
 */
function sheet2_OnSaveEnd(){
	sheet2_OnSearchEnd();
}
/**
 * sheet1_OnSearchEnd
 */
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for(var i=1; i<=sheetObj.LastRow();i++){
		// 콤보박스의 bgColor을 설정한다. 
		if ('1'==sheetObj.GetCellValue(i,'cntr1')) {
			sheetObj.SetCellBackColor(i,"cntr1","#FF82AB");
		} else if('2'==sheetObj.GetCellValue(i,'cntr1')) {
			sheetObj.SetCellBackColor(i,"cntr1","#FFFFC0");
		} else if('3'==sheetObj.GetCellValue(i,'cntr1')) {
			sheetObj.SetCellBackColor(i,"cntr1","#B4EEB4");
		} else {
			sheetObj.SetCellBackColor(i,"cntr1","#FFFFFF");
		}
		if ('1'==sheetObj.GetCellValue(i,'cntr2')) {
			sheetObj.SetCellBackColor(i,"cntr2","#FF82AB");
		} else if('2'==sheetObj.GetCellValue(i,'cntr2')) {
			sheetObj.SetCellBackColor(i,"cntr2","#FFFFC0");
		} else if('3'==sheetObj.GetCellValue(i,'cntr2')) {
			sheetObj.SetCellBackColor(i,"cntr2","#B4EEB4");
		} else {
			sheetObj.SetCellBackColor(i,"cntr2","#FFFFFF");
		}
		if ('1'==sheetObj.GetCellValue(i,'cntr3')) {
			sheetObj.SetCellBackColor(i,"cntr3","#FF82AB");
		} else if('2'==sheetObj.GetCellValue(i,'cntr3')) {
			sheetObj.SetCellBackColor(i,"cntr3","#FFFFC0");
		} else if('3'==sheetObj.GetCellValue(i,'cntr3')) {
			sheetObj.SetCellBackColor(i,"cntr3","#B4EEB4");
		} else {
			sheetObj.SetCellBackColor(i,"cntr3","#FFFFFF");
		}
		if ('1'==sheetObj.GetCellValue(i,'cntr4')) {
			sheetObj.SetCellBackColor(i,"cntr4","#FF82AB");
		} else if('2'==sheetObj.GetCellValue(i,'cntr4')) {
			sheetObj.SetCellBackColor(i,"cntr4","#FFFFC0");
		} else if('3'==sheetObj.GetCellValue(i,'cntr4')) {
			sheetObj.SetCellBackColor(i,"cntr4","#B4EEB4");
		} else {
			sheetObj.SetCellBackColor(i,"cntr4","#FFFFFF");
		}
		if ('1'==sheetObj.GetCellValue(i,'bgParam')) {
			sheetObj.SetCellBackColor(i,"bgParam","#FFFFFF");
		}
		
	}
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	if(show_complete == "Y"){
        showCompleteProcess();
	    show_complete = "N";
	}
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
function sheet2_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

/**
 * sheet2_OnSearchEnd
 */
function sheet2_OnSearchEnd(){
	doDispPaging(docObjects[1].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	if(show_complete == "Y"){
        showCompleteProcess();
	    show_complete = "N";
	}
}
/**
 * sheet1_OnChange
 */
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;	
	switch (sheetObj.ColSaveName(Col)) {
	case "cntr1":
		if ('1'==sheetObj.GetCellValue(Row,'cntr1')) {
			sheetObj.SetCellBackColor(Row,"cntr1","#FF82AB");
		} else if('2'==sheetObj.GetCellValue(Row,'cntr1')) {
			sheetObj.SetCellBackColor(Row,"cntr1","#FFFFC0");
		} else if('3'==sheetObj.GetCellValue(Row,'cntr1')) {
			sheetObj.SetCellBackColor(Row,"cntr1","#B4EEB4");
		} else {
			sheetObj.SetCellBackColor(Row,"cntr1","#FFFFFF");
		}
		break;
	case "cntr2":
		if ('1'==sheetObj.GetCellValue(Row,'cntr2')) {
			sheetObj.SetCellBackColor(Row,"cntr2","#FF82AB");
		} else if('2'==sheetObj.GetCellValue(Row,'cntr2')) {
			sheetObj.SetCellBackColor(Row,"cntr2","#FFFFC0");
		} else if('3'==sheetObj.GetCellValue(Row,'cntr2')) {
			sheetObj.SetCellBackColor(Row,"cntr2","#B4EEB4");
		} else {
			sheetObj.SetCellBackColor(Row,"cntr2","#FFFFFF");
		}
		break;
	case "cntr3":
		if ('1'==sheetObj.GetCellValue(Row,'cntr3')) {
			sheetObj.SetCellBackColor(Row,"cntr3","#FF82AB");
		} else if('2'==sheetObj.GetCellValue(Row,'cntr3')) {
			sheetObj.SetCellBackColor(Row,"cntr3","#FFFFC0");
		} else if('3'==sheetObj.GetCellValue(Row,'cntr3')) {
			sheetObj.SetCellBackColor(Row,"cntr3","#B4EEB4");
		} else {
			sheetObj.SetCellBackColor(Row,"cntr3","#FFFFFF");
		}
		break;
	case "cntr4":
		if ('1'==sheetObj.GetCellValue(Row,'cntr4')) {
			sheetObj.SetCellBackColor(Row,"cntr4","#FF82AB");
		} else if('2'==sheetObj.GetCellValue(Row,'cntr4')) {
			sheetObj.SetCellBackColor(Row,"cntr4","#FFFFC0");
		} else if('3'==sheetObj.GetCellValue(Row,'cntr4')) {
			sheetObj.SetCellBackColor(Row,"cntr4","#B4EEB4");
		} else {
			sheetObj.SetCellBackColor(Row,"cntr4","#FFFFFF");
		}
		break;		
	}
	
}
/**
 * sheet2_OnChange
 */
function sheet2_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;	
	switch (sheetObj.ColSaveName(Col)) {
	case "loc_cd":
		var loc_cd=sheetObj.GetCellValue(Row,"loc_cd");
		// sheet에서 LOC_CD가 중복되었는지 체크한다.
		if (checkDuplLocSheet()){
			// DB에 등록된 LOC_CD를 체크한다.
			checkDuplLoc(loc_cd);
		}
		break;		
	}
}
/**
 * Tab 클릭 
 */
function goTabSelect(isNumSep) {
	var tabObjs=document.getElementsByName('tabLayer');
	if( isNumSep == "01" ) {
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.display='inline';
		tabObjs[1].style.display='none';
		if(tab1click == ""){
			tab1click="Y";
			tab2click="";
		}
		//스크롤을 하단으로 이동한다.
		document.body.scrollTop=document.body.scrollHeight;
	} else if( isNumSep == "02" ) {
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.display='none';
		tabObjs[1].style.display="inline";
		if(tab2click == ""){
			tab1click="";
			tab2click="Y";
		}
		//스크롤을 하단으로 이동한다.
		doWork('SEARCHLIST');
	}
	var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});
}
/**
 * 현재 년도를 취득한다.
 */
function selectCurYear() {
	var date=new Date();
	return date.getFullYear();
}
/**
 * 현재 주를 취득한다.
 */
function selectCurWeek() {
	var date=new Date();	
	var onejan=new Date(date.getFullYear(),0,1);
    return Math.ceil((((date - onejan) / 86400000) + onejan.getDay()+1)/7);
}
/**
 * 콤보박스의 week값이 변경시 그주에 속한 area를 출력한다.
 */
function chkWeek(){
	var formObj=document.frm1;
	var year=formObj.year_val.value;
	var week=formObj.week_val.value; 	
	var date=new Date();
	// 년초의 1주의 첫날을 알기위해 1월1일에서 1주일 전의 날자를 구해서 + getDay()한다.
	var start_date=new Date(year-1,11,25);
	var end_date;
	var nIdx=1;
	var weekToDay=new Array();
	// 시작일 
	var intDate=Number(start_date.getDay());
	var start_date=dateFormat(start_date);
	start_date=addDate("d", 7-intDate,start_date,"-");
	end_date=addDate("d", 6 ,start_date,"-");
	weekToDay[nIdx]=start_date+" ~ "+end_date;
	for (var i=1;i<53;i++) {
		start_date=end_date;
		start_date=addDate("d", 1 ,start_date,"-");
		end_date=addDate("d", 6 ,start_date,"-");
		nIdx ++;
		weekToDay[nIdx]=start_date+" ~ "+end_date;
	}
	formObj.weekarea.value=weekToDay[week];  
	doWork("SEARCHLIST");
}
/**
 * MM-DD-YYYY 형식으로 반환한다
 */
function dateFormat(d){
	return 	("00" + (d.getMonth() + 1)).slice(-2) + "-" + ("00" + d.getDate()).slice(-2) + "-" + d.getFullYear();
}
/**
 * MM-DD-YYYY 형식의 년도에 날짜를 더한다.
 */
function addDate(pInterval, pAddVal, pYyyymmdd, pDelimiter) {
	var yyyy;
	var mm;
	var dd;
	var cDate;
	var oDate;
	var cYear, cMonth, cDay;
	if (pDelimiter != "") {
		pYyyymmdd=pYyyymmdd.replace(eval("/\\" + pDelimiter + "/g"), "");
	}
	yyyy=pYyyymmdd.substr(4, 4);
	mm=pYyyymmdd.substr(0, 2);
	dd=pYyyymmdd.substr(2, 2);
	if (pInterval == "yyyy") {
		yyyy=(yyyy * 1) + (pAddVal * 1);
	} else if (pInterval == "m") {
		mm=(mm * 1) + (pAddVal * 1);
	} else if (pInterval == "d") {
		dd=(dd * 1) + (pAddVal * 1);
	}
	cDate=new Date(yyyy, mm - 1, dd); // 12월, 31일을 초과하는 입력값에 대해 자동으로 계산된 날짜가 만들어짐.
	cYear=cDate.getFullYear();
	cMonth=cDate.getMonth() + 1;
	cDay=cDate.getDate();
	cMonth=cMonth < 10 ? "0" + cMonth : cMonth;
	cDay=cDay < 10 ? "0" + cDay : cDay;
	return cMonth + pDelimiter + cDay + pDelimiter + cYear;
}
/**
 * 콤보박스로 선택한 주의 기간을 취득하기 위해 Ajax함수를 호출한다. -성능고려하여 스크립트로 변경 
 */
function searchWeekArea(yyyy,week) {
	ajaxSendPost(searchWeekAreaAjaxReq,  'reqVal', '&goWhere=aj&bcKey=searchWeekArea&year='+yyyy+'&week='+week, './GateServlet.gsl');
}
/**
 * DB에 등록된 LOC값의 중복을 체크한다.
 * LOC값을 체크한다.
 */
function checkDuplLoc(loc_cd) {
	ajaxSendPost(checkDuplLocAjaxReq, 'reqVal', '&goWhere=aj&bcKey=checkDuplLoc&loc_cd='+loc_cd, './GateServlet.gsl');
}
/**
 * Sheet 내의 LOC값의 중복을 체크한다.
 * @returns {Boolean}
 */
function checkDuplLocSheet() {
	var sheetObj=docObjects[1];
	var duplRow="";
	duplRow=sheetObj.ColValueDup("loc_cd");
	if(duplRow>0){
		//Loc_cd Duplicate!!
		alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('LOC_CD'));
		sheetObj.SetCellValue(sheetObj.GetSelectRow(),"loc_cd","",0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(),"loc_nm","",0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(),"cnt_nm","",0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(),"st_cd","",0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(),"cnt_cd","",0);
		sheetObj.SelectCell(sheetObj.GetSelectRow(),"loc_cd");
		return false;
	}
	return true;
}
/**
 * 콤보박스로 선택한 주의 기간을 ajax로 취득한다.
 * @returns {Boolean}
 */
function searchWeekAreaAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var area_val=doc[1].split('@@;');
			formObj.weekarea.value=area_val;
		}
	}
	doWork('SEARCHLIST');
}
/**
 * 년도를 체크한다.
 * @returns {Boolean}
 */
function checkDate() {
	var formObj=document.frm1;
	// year 체크
	if (formObj.year_val.value.length == 2) {
		formObj.year_val.value="20"+formObj.year_val.value;
	}
	var year=formObj.year_val.value;
	if (year.length != 4) {
		return false;
	}
	return true;
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
var rtnary=new Array(3);
var callBackFunc = "";
var row = -1;
function sheet2_OnPopupClick(sheetObj,Row,Col){
    switch (sheetObj.ColSaveName(Col)) {
        case "loc_cd" :
        	row =  Row;
    		rtnary=new Array(3);
    		rtnary[0]="";
    		rtnary[1]="";
    		rtnary[2]="";
	   		callBackFunc = "LOCATION_POP";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
		break;
	}
}

function LOCATION_POP(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheet2.SetCellValue(row,"loc_nm",rtnValAry[2],0);//loc_nm
		sheet2.SetCellValue(row,"cnt_nm",rtnValAry[4],0);//cnt_nm
		sheet2.SetCellValue(row,"st_cd",rtnValAry[7],0);//sts_cd
		sheet2.SetCellValue(row,"cnt_cd",rtnValAry[3],0);//cnt_cd
		sheet2.SetCellValue(row,"loc_cd",rtnValAry[0]);//loc_cd
	} 
}
/**
 * AJAX RETURN
 * LOC_CD 중복체크
 */
function checkDuplLocAjaxReq(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				//Loc_cd Duplicate!!
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('LOC_CD'));
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),"loc_cd","",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),"loc_nm","",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),"cnt_nm","",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),"st_cd","",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),"cnt_cd","",0);
				sheetObj.SelectCell(sheetObj.GetSelectRow(),"loc_cd");
			}
		}
	}
}
/**
 * LOC값을 체크한다.
 * @returns {Boolean}
 */
function checkLocVal() {
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	for(var i=1; i<=sheetObj.LastRow();i++){
		var loc_cd=sheetObj.GetCellValue(i,"loc_cd");
		var loc_nm=sheetObj.GetCellValue(i,"loc_nm");
		var cnt_nm=sheetObj.GetCellValue(i,"cnt_nm");
		var st_cd=sheetObj.GetCellValue(i,"st_cd");
		var cnt_cd=sheetObj.GetCellValue(i,"cnt_cd");
		// null 체크한다.
		if (loc_cd == '' || loc_nm == '' || cnt_nm == '' || st_cd == '' || cnt_cd == '') {
			sheetObj.SelectCell(i,"loc_cd");
			return false;
		}
	}
	return true;
} 

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

//#582 [Master Menu] Not Insert a new row automatically when focus in [Index] column at grid and pressing "tab" key
function sheet2_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="loc_nm"){
		doWork('ADD_ROW');
		sheetObj.SelectCell(row+1, 2);
	}
}