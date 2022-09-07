
/**
 <%--
=========================================================
*@FileName   : MGT_CUR_0020.js
*@FileTitle  : Finance Exchange Rate
*@Description: Finance Exchange Rate Management
*@author     : Phitran
*@since      : 06/10/2014

=========================================================
--%>
 */
var rtnary=new Array(2);
var callBackFunc = "";

function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(frm1.f_aply_fm_dt, frm1.f_aply_to_dt);
}
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    // 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
    	   if(!formValidation()) return;
    	   /*if(formObj.f_fm_curr_cd.value == ""){
    		   //alert('Please select from currency.');
    		   alert(getLabel('FMS_COM_ALT014') + "\n - " + getLabel('CURR'));
    		   formObj.f_fm_curr_cd.focus();
    		   return;
    	   }else*/ 
    		   
    	   if(formObj.f_aply_fm_dt.value == "" || formObj.f_aply_to_dt.value ==""){
    		   //Please enter a [Apply Date]!
    		   alert(getLabel('FMS_COM_ALT014') + "\n - " + getLabel('APPLY_DATE'));
    	   }else{
	           formObj.f_cmd.value=SEARCHLIST;
	           // 검증로직
	           if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
               sheetObj.DoSearch("MGT_CUR_0020GS.clt", FormQueryString(formObj) );
	           }
    	   }
       break;
       case "ROWADD":
    	    var intRows = sheetObj.LastRow() + 1;
			var intRow=sheetObj.DataInsert(intRows);
			sheetObj.SetCellValue(intRows, 'to_curr_cd',dfCurrency);
			sheetObj.SetCellValue(intRows, 'to_rt_ut',dfUnit);
			
		break;
       case "REMOVE":
            formObj.f_cmd.value=REMOVE;
                if(confirm(getLabel('FMS_COM_CFMDEL'))){
                    doProcess=true;
                    sheetObj.DoSave("MGT_CUR_0020GS.clt", FormQueryString(formObj),"ibflag",false);
                }
       break;
       case "SAVE":
    	   /*
    	   if(!saveValid()){
    		   return;
    	   }
    	   formObj.f_cmd.value=ADD;
    	   //TODO Data 검증 로직 추가
	    	   if(confirm(getLabel('FMS_COM_CFMSAV'))){
	    		   doProcess=true;
	    		   sheetObj.DoSave("MGT_CUR_0020GS.clt", FormQueryString(formObj),"ibflag",false);
	    	   }
   	 
   	   break;
   	   */
    	   formObj.f_cmd.value=ADD;
    	   if ( fncGridCheck() ) {
	    	   if( confirm(getLabel('FMS_COM_CFMSAV')) ){    		   		   
	    		   doProcess=true;
	    		   sheetObj.DoSave("MGT_CUR_0020GS.clt", FormQueryString(formObj),"ibflag",false);
	    	   }
    	   }
    	   break;
       case "CURRENCY_POPLIST":// 통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);		   		
			rtnary[0]="1";
			callBackFunc = "CURRENCY_POPLIST";
  	        modal_center_open('./CMM_POP_0040.clt', rtnary, 656,375,"yes");
			
       break;
    }	
}
// --------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
function loadPage() {
	
	//#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
	ajaxSendPost(setVat_rt_dp_cnt, "reqVal", "&goWhere=aj&bcKey=getVat_rt_dp_cnt&s_ofc_cd="+ofc_cd, "./GateServlet.gsl");
	
    for(var i=0;i<docObjects.length;i++){
        // khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        // khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    var opt_key = "EX_RATE_FM_CURR";
	ajaxSendPost(setCurrencyVal, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}
/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:      // IBSheet1 init
		    with(sheetObj){
	       
	     // (14, 0, 0, true);

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('MGT_CUR_0020_HDR_1'), Align:"Center"},
	                  { Text:getLabel('MGT_CUR_0020_HDR_2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"check_col" },
	             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
	             {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"fm_curr_cd",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"fm_rt_ut",       KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"to_curr_cd",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"to_rt_ut",       KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"xch_rt_ut",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Combo",     Hidden:0, Width:120,   Align:"Left",    ColMerge:1,   SaveName:"dt_clss_cd",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"PopupEdit", Hidden:0, Width:100,   Align:"Center",  ColMerge:1,   SaveName:"aply_fm_dt",     KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 , FormatFix:1},
	             {Type:"PopupEdit", Hidden:0, Width:100,   Align:"Center",  ColMerge:1,   SaveName:"aply_to_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 , FormatFix:1},
	             {Type:"Text",      Hidden:0,  Width:500,   Align:"Left",    ColMerge:1,   SaveName:"rmk",    	   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:100},
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"proc_usrid",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"finc_xcrt_seq" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
	       
	      InitColumns(cols);

	      SetEditable(1);
	      SetImageList(0,APP_PATH+"/web/img/button/btns_search.gif");
	      SetImageList(1,APP_PATH+"/web/img/button/btns_calendar.gif");
	      SetHeaderRowHeight(20);
//	      InitViewFormat(0, "aply_fm_dt", "MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
//	      InitViewFormat(0, "aply_to_dt", "MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	      SetColProperty(8, {ComboText:"Day|Month", ComboCode:"D|M"} );
	      SetColProperty("fm_curr_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
	      SetColProperty("to_curr_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
	      SetSheetHeight(500);
	      resizeSheet();
	      }

                                
		break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//저장하기전 null 체크
function check_save_null(){
	var sheetObj=docObjects[0];
	var check_value=0;
 	for(var i=1; i <= sheetObj.LastRow(); i++){
	if (sheetObj.GetCellValue(i, "fm_curr_cd") == ""){
			//Please enter a From Currency! 
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CURR'));
			check_value ++;
			break;
		}	
	if (sheetObj.GetCellValue(i, "xch_rt_ut") == "" || sheetObj.GetCellValue(i, "xch_rt_ut") == 0){
			//Please enter a Exchange Rate!
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_EXRT'));			
			check_value ++; 
			break;
		}
	if (sheetObj.GetCellValue(i, "aply_fm_dt") == ""){
			//Please enter a Apply Date!
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_DATE'));			
			check_value ++;
			break;
		}
	}
	//alert(check_value);
	if(check_value == 0){
		doWork("ADD");
	}
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
 */
function doDisplay(doWhat, formObj){
    switch(doWhat){
	    case 'DATE01':   //달력 조회 From ~ To 팝업 호출 
	 
	        var cal=new ComCalendarFromTo();
	        cal.select(formObj.f_aply_fm_dt, formObj.f_aply_to_dt, 'MM-dd-yyyy');
	    break;
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
var Row = -1;
var Col = "";
function sheet1_OnPopupClick(sheetObj, row, col){	
	switch(sheetObj.ColSaveName(col)){
		case 'fm_curr_cd':	//Currency Code 조회
	    	rtnary=new Array(1);
	   		rtnary[0]="1";
	   		Row = row;
	   		Col = col;
	        callBackFunc = "FM_CURR_CD";
	        modal_center_open('./CMM_POP_0040.clt', rtnary, 656,375,"yes");
		break;
		case 'to_curr_cd':	//Currency Code 조회
			rtnary=new Array(1);
			rtnary[0]="1";
			
			callBackFunc = "TO_CURR_CD";
	        modal_center_open('./CMM_POP_0040.clt', rtnary, 656,375,"yes");
		break;
		case 'aply_fm_dt': 
			if(sheetObj.GetCellValue(row, "fm_rt_ut").length == 0){
	    		sheetObj.SelectCell(row, "fm_rt_ut");
	    		//
	    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_EXRT')); 
			}else if(sheetObj.GetCellValue(row, "to_curr_cd").length == 0){
	    		sheetObj.SelectCell(row, "to_curr_cd");
	    		//
	    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CURR'));
	    	}else{
			    var celldata = sheetObj.GetCellValue(row,col);        
			    if(sheetObj.GetCellValue(row,col-1) == "M" && celldata != ""){
			    	var dtArr = celldata.split("-");
			    	celldata = dtArr[2] + ""  + dtArr[0];
			    }
		        var opt;
		        if(sheetObj.GetCellValue(row,col-1) == "M"){
		        	opt =  { Format:"yyyyMM",CallBack : "dateInsert",CalButtons:"Close"};              
		        }else{
		            opt =  { Format:"Ymd",CallBack : "dateInsert",CalButtons:"Close"};
		        }        
		        //console.log(celldata);
		        IBShowCalendar(celldata, opt);
	    	}
		break;
	}
}

function dateInsert(date){
	var sheetObj=docObjects[0];
    var row = sheetObj.GetSelectRow();
    var col = sheetObj.GetSelectCol();
    
    if(date.length == 6){
		sheetObj.SetCellValue(row, "aply_fm_dt", date + "01" );
		sheetObj.SetCellValue(row, "aply_to_dt", firstAndLastDayOfMonth(date, "L") );
    }else{
    	sheetObj.SetCellValue(row,"aply_fm_dt",date);
    	sheetObj.SetCellValue(row,"aply_to_dt",date);
    }
    
}

function FM_CURR_CD(rtnVal){
	var sheetObj=docObjects[0];
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(Row, Col,rtnValAry[0]);
	}
}

function TO_CURR_CD(rtnVal){
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(row, col,rtnValAry[0]);
	}
}

function sheet1_OnChange(sheetObj, row, col) {
	switch(sheetObj.ColSaveName(col)){
		//From의 Rate Unit 변경 또는 To의 Rate Unit변경인 경우
		case "fm_rt_ut":
			if(sheetObj.GetCellValue(row, "fm_rt_ut")==''){
				sheetObj.SelectCell(row, "fm_rt_ut");
			}else if(sheetObj.GetCellValue(row, "to_rt_ut")==''){
				sheetObj.SelectCell(row, "to_rt_ut");
			//계산
			}else{
				if(sheetObj.GetCellValue(row, "fm_rt_ut")>0 && sheetObj.GetCellValue(row, "to_rt_ut")>0){
					// #5622 [BNX INDIA] PROFIT REPORT RELATED TO EXCHANGE RATE 
					sheetObj.SetCellValue(row, "xch_rt_ut",parseFloat(getDivideFloatByNDecimalTp(sheetObj.GetCellValue(row, "to_rt_ut"), sheetObj.GetCellValue(row, "fm_rt_ut"), TP_TRM5)).toFixed(xch_rt_dp_cnt));
				}else{
					sheetObj.SetCellValue(row, "xch_rt_ut",0);
				}
			}
		break;
		case "to_rt_ut":
			if(sheetObj.GetCellValue(row, "fm_rt_ut")==''){
				sheetObj.SelectCell(row, "fm_rt_ut");
			}else if(sheetObj.GetCellValue(row, "to_rt_ut")==''){
				sheetObj.SelectCell(row, "to_rt_ut");
			//계산
			}else{
				if(sheetObj.GetCellValue(row, "fm_rt_ut")>0 && sheetObj.GetCellValue(row, "to_rt_ut")>0){
					// #5622 [BNX INDIA] PROFIT REPORT RELATED TO EXCHANGE RATE 
					sheetObj.SetCellValue(row, "xch_rt_ut",parseFloat(getDivideFloatByNDecimalTp(sheetObj.GetCellValue(row, "to_rt_ut"), sheetObj.GetCellValue(row, "fm_rt_ut"), TP_TRM5)).toFixed(xch_rt_dp_cnt));
				}else{
					sheetObj.SetCellValue(row, "xch_rt_ut",0);
				}
			}
		break;
		case "dt_clss_cd":	//Day/Month 구분
			//Data 초기화
			sheetObj.SetCellValue(row, "aply_fm_dt",'', 0);
			sheetObj.SetCellValue(row, "aply_to_dt",'', 0);
		break;
		case "aply_fm_dt":	//From 일자가 선택되고 일기준인 경우
			if(sheetObj.GetCellValue(row,  "dt_clss_cd")=='D'){
				sheetObj.SetCellValue(row, "aply_to_dt",sheetObj.GetCellValue(row, "aply_fm_dt"));
			}else{
				////#941 [SBM] Exchange Rate 수정 오류
			    var celldata = sheetObj.GetCellValue(row,"aply_fm_dt");
			    
			    if(sheetObj.GetCellValue(row,  "dt_clss_cd")=='D'){
					sheetObj.SetCellValue(row, "aply_to_dt",sheetObj.GetCellValue(row, "aply_fm_dt"));
				}
			    
			    if(sheetObj.GetCellValue(row,col-1) == "M" && celldata != ""){
			    	var dtArr = celldata.split("-");
			    	
			    	var st_date = dtArr[0] + "-01"  + "-" + dtArr[2];

			    	var lastDay = ( new Date( dtArr[2], dtArr[0], 0) ).getDate();
			    	var end_date = dtArr[0] + "-" + lastDay + "-" + dtArr[2];
			    	
			    	sheetObj.SetCellValue(row, "aply_fm_dt", st_date);
			    	sheetObj.SetCellValue(row, "aply_to_dt", end_date);
			    }
			}
		break;
		case "aply_to_dt":	//Apply Date From인 경우
			if(sheetObj.GetCellValue(row, "aply_fm_dt")!=''){
				if(sheetObj.GetCellValue(row, "dt_clss_cd")=='D'){
					sheetObj.SetCellValue(row, "aply_to_dt",sheetObj.GetCellValue(row, "aply_fm_dt"), 0);
				}
			}
		break;
	}
}
var checkRow = 0;

function fincCheckResult(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    
    if(doc[0]=='OK'){
    	if(doc[1] == 'N'){
    		//That exchange rate is registered already!
    		alert(getLabel('FMS_COM_ALT098'));
    		docObjects[0].SetCellValue(checkRow, "aply_fm_dt",'');
    		docObjects[0].SetCellValue(checkRow, "aply_to_dt",'');
   			checkRow=-1;
    	}
    }else{
    	//alert('System err');
    	alert(getLabel('FMS_COM_ERR001'));
    }
}
//#6141 [BNX-TOR] 환율 입력시 중복/누락시 alert messasge
function fincCheckPair(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    
    if(doc[0]=='OK'){
    	if(doc[1] == 'N'){
    		//That exchange rate is registered already!
    		alert(getLabel('FMS_COM_ALT169'));
   			checkRow=-1;
    	}
    }else{
    	//alert('System err');
    	alert(getLabel('FMS_COM_ERR001'));
    }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
		//doWork('SEARCHLIST');
	}
}
function saveValid(){
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    var rowCnt=sheetObj.RowCount();
    if(rowCnt < 1){
    	alert(getLabel('SUP_COM_ALT004'));
    	return false;
    }
    
   return true;   
}
function fncGridCheck() {
	var sheetObj=docObjects[0];
	var intRow=sheetObj.RowCount();
	var dupRow="";
	for ( var i=2 ; i < intRow+2 ; i++ ) {
		if(sheetObj.GetRowStatus(i)!="R"){
			if ( sheetObj.GetCellValue(i, "fm_curr_cd") == "" || sheetObj.GetCellValue(i, "fm_curr_cd") == null ) {
				//Please enter a From Currency!
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CURR'));
				return false;
			}
			if ( sheetObj.GetCellValue(i, "to_curr_cd") == "" || sheetObj.GetCellValue(i, "to_curr_cd") == null ) {
				//Please enter a To Currency!
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('TO_CURR_CD'));
				return false;
			}
			if ( sheetObj.GetCellValue(i, "dt_clss_cd") == "" || sheetObj.GetCellValue(i, "dt_clss_cd") == null ) {
				//Please enter a Day/Month Type!
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('DAY_MONTH'));
				return false;
			}
			if ( sheetObj.GetCellValue(i, "aply_fm_dt") == "" || sheetObj.GetCellValue(i, "aply_fm_dt") == null ) {
				//Please enter a Apply Date From!
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('MAC_MSG52'));
				return false;
			}
			//#2160 [BINEX MEXICO] FINANCE EXCHANGE RATE 삭제 불가능
//			var dupRow=sheetObj.ColValueDup("fm_curr_cd|to_curr_cd|dt_clss_cd|aply_fm_dt|aply_to_dt", 0);
//			if(dupRow > 0){
//				alert(getLabel('FMS_COM_ALT098'));
//				sheetObj.SetCellValue(i, "aply_fm_dt",'');
//				sheetObj.SetCellValue(i, "aply_to_dt",'');
//	    		return false;
//			}
			//#5858 [BNX-TOR] Exchagne rate 화면 중복 입력 validation
			dupRow=sheetObj.ColValueDup("fm_curr_cd|to_curr_cd|dt_clss_cd|aply_fm_dt");
			if(dupRow > 0){
				alert(getLabel('FMS_COM_ALT098'));
				docObjects[0].SetCellValue(dupRow, "aply_fm_dt",'');
				docObjects[0].SetCellValue(dupRow, "aply_to_dt",'');
				return false;
			}
			//#2173 [BINEX] EXCHANGE RATE / FINANCE EXCHANGE RATE 화면  Validation 추가
			if(sheetObj.GetRowStatus(i)!="D"){
				checkRow=i;
				var chkDate=sheetObj.GetCellValue(i, "aply_fm_dt");
				chkDate=chkDate.substr(6, 4) + '-' + chkDate.substr(0, 2) + '-' + chkDate.substr(3, 2);
				//일자가 들어가 있는경우 중복 여부를 확인한다.
				var parmStr='&goWhere=aj&bcKey=searchFincCurr';
				parmStr += '&ck_fm_curr_cd=';
				parmStr += sheetObj.GetCellValue(i, "fm_curr_cd");
				parmStr += '&ck_to_curr_cd=';
				parmStr += sheetObj.GetCellValue(i, "to_curr_cd");
				parmStr += '&ck_dt_clss_cd=';
				parmStr += sheetObj.GetCellValue(i, "dt_clss_cd");
				parmStr += '&ck_aply_fm_dt=';
				parmStr += chkDate.replaceAll('-', '');
				parmStr += '&ck_finc_xcrt_seq=';
				parmStr += sheetObj.GetCellValue(i, "finc_xcrt_seq");
				ajaxSendPost(fincCheckResult,  'reqVal', parmStr, './GateServlet.gsl');
				sheetObj.SetSelectRow(i);
				
				if(checkRow < 0){
					return false;
				}
			}
			// #6141 [BNX-TOR] 환율 입력시 중복/누락시 alert messasge
			var halfPair = sheetObj.GetCellValue(i, "fm_curr_cd")+sheetObj.GetCellValue(i, "to_curr_cd")+sheetObj.GetCellValue(i, "dt_clss_cd")+sheetObj.GetCellValue(i, "aply_fm_dt");
			var checkPair = 0;
			for( var j=2 ; j < intRow+2 ; j++ ) {
				var parmStr = sheetObj.GetCellValue(j, "to_curr_cd")+sheetObj.GetCellValue(j, "fm_curr_cd")+sheetObj.GetCellValue(j, "dt_clss_cd")+sheetObj.GetCellValue(j, "aply_fm_dt");
				if(i != j && halfPair==parmStr){
					checkPair = 1;
				}
			}
			if(checkPair == 0){
				if(sheetObj.GetRowStatus(i)!="D"){
					checkRow=i;
					var chkDate=sheetObj.GetCellValue(i, "aply_fm_dt");
					chkDate=chkDate.substr(6, 4) + '-' + chkDate.substr(0, 2) + '-' + chkDate.substr(3, 2);
					
					var parmStr='&goWhere=aj&bcKey=searchFincPair';
					parmStr += '&ck_fm_curr_cd=';
					parmStr += sheetObj.GetCellValue(i, "fm_curr_cd");
					parmStr += '&ck_to_curr_cd=';
					parmStr += sheetObj.GetCellValue(i, "to_curr_cd");
					parmStr += '&ck_dt_clss_cd=';
					parmStr += sheetObj.GetCellValue(i, "dt_clss_cd");
					parmStr += '&ck_aply_fm_dt=';
					parmStr += chkDate.replaceAll('-', '');
					parmStr += '&ck_finc_xcrt_seq=';
					parmStr += sheetObj.GetCellValue(i, "finc_xcrt_seq");
					ajaxSendPost(fincCheckPair,  'reqVal', parmStr, './GateServlet.gsl');
					sheetObj.SetSelectRow(i);
					
					if(checkRow < 0){
						return true;
					}
				}
			}
		}
	}
	
	return true;
}
function formValidation(){
	var formObj=document.frm1;
	if(!chkSearchCmprPrd(true, frm1.f_aply_fm_dt, frm1.f_aply_to_dt)){
		return false;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;
function CURRENCY_POPLIST(rtnVal){
  	var formObj=document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
		}else{
			var rtnValAry=rtnVal.split("|");
			//formObj.bzc_curr_cd.value = rtnValAry[0];
			//formObj.bzc_curr_nm.value = rtnValAry[1];
			formObj.f_fm_curr_cd.value=rtnValAry[0];
		}
  }

//매월의 시작일과 말일 취득
function firstAndLastDayOfMonth(secDate, dayClssFL){
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = "01";

	var date = new Date(year, month-1, day);  // date로 변경
	
	var frDt = new Date(date);
	var lastDayOfMonth = new Date(frDt.getFullYear(), frDt.getMonth()+1, 0);
	
	// 월의 말일 취득
	var reDay = "01";
	if (dayClssFL == "L") {
		var lastDay = lastDayOfMonth.getDate();
		if (("" + lastDay).length  == 1) { lastDay  = "0" + lastDay; }
		
		reDay = lastDay;
	} 
	
	rtnDate = frDt.getFullYear() + month + reDay;
	return rtnDate;
}

//#49001 [BINEX MEXICO] OEH BL ENTRY 에서 EXPRESS B/L DEFAULT 옵션 NO로 설정
function setCurrencyVal(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		if(doc[1] == "USD"){
			formObj.f_fm_curr_cd.value = "USD";
		}
	} 
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="proc_usrid"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 1);
	}
}

//#799 [BNX] (베트남) ACCOUNTING VAT 기능 추가
function setVat_rt_dp_cnt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		var spValue = doc[1].split("^@@^");
		vat_rt_dp_cnt = spValue[0];
		xch_rt_dp_cnt = spValue[1];
	}
}
