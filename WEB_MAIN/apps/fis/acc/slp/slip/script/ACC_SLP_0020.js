/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : ACC_SLP_0070.js
 *@FileTitle : SLIP CANCEL
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/

var TODAY;
var PROC_FLAG="N";
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "COMMAND01":
    	   	if(formObj.f_proc_dt.value == ""){
//    	   		alert("[Processing Date] is mandatory field. ");
    	   		alert(getLabel('FMS_COM_ALT007') + " \n- " + getLabel('FMS_COD_PROCEDT'));
    	   		formObj.f_proc_dt.focus();
    	   		return;
    	   	}else{
    	   		if(PROC_FLAG != "Y"){
    	   			if(progress.style.display == "inline" || success.style.display == "inline" || error.style.display == "inline"){
//        	    		alert("Please Screen Refresh!!");
        	    		alert(getLabel('ACC_MSG43'));
        	    		return;
        	    	}
    	   			/*
    	   			if(!checkJournalize()){
        	    		return;
        	    	}
    	   			*/
    	   			var action="";
    	   			/*
    	   			if(formObj.f_slip_tp[1].selected){
        	    		formObj.f_cmd.value=COMMAND01;		// Close + Journalize
        	    		action="Close + Journalize";
        	    	}else if(formObj.f_slip_tp[2].selected){
        	    		formObj.f_cmd.value=COMMAND02;		// Journalize
        	    		action="Journalize";
        	    	}else if(formObj.f_slip_tp[3].selected){
        	    		formObj.f_cmd.value=COMMAND03;		// Close
        	    		action="Close";
        	    	}
            	    */
    	   			formObj.f_cmd.value=COMMAND02;		// Journalize
    	    		action="Journalize.";
            	    if(confirm("Do you want to Cancel " +action+ "? ")){
            	    	getObj('blank').style.display="none";
            	    	getObj('progress').style.display="inline";
            	    	getObj('success').style.display="none";
            	    	getObj('error').style.display="none";
            	    	formObj.f_oneDay.value="N";
            	        setTimeout("goAction()", 1000)
            	        //sheetObj.DoAllSave("./ACC_SLP_0020GS.clt", FormQueryString(formObj), true);
            	    }
        	    }else{
//        	    	alert("Processing Wait Please!!");
        	    	alert(getLabel('ACC_MSG44'));
        	    	return;
        	    }
    	   	}
       break;
       case "COMMAND02":
   	   	if(formObj.f_proc_dt.value == ""){
//   	   		alert("[Processing Date] is mandatory field. ");
   	   		alert(getLabel('ACC_MSG48'));
   	   		formObj.f_proc_dt.focus();
   	   		return;
   	   	}else{
   	   		if(PROC_FLAG != "Y"){
   	   			if(progress.style.display == "inline" || success.style.display == "inline" || error.style.display == "inline"){
//       	    		alert("Please Screen Refresh!!");
       	    		alert(getLabel('ACC_MSG43'));
       	    		return;
       	    	}
   	   			/*
   	   			if(!checkJournalize2()){
       	    		return;
       	    	}
   	   			*/
   	   			var action="";
   	   			/* LHK, 20131012  */
   	   			/*
   	   			if(formObj.f_slip_tp[1].selected){
       	    		formObj.f_cmd.value=COMMAND01;		// Close + Journalize
       	    		action="Close + Journalize One Day";
       	    	}else if(formObj.f_slip_tp[2].selected){
       	    		formObj.f_cmd.value=COMMAND02;		// Journalize
       	    		action="Journalize One Day";
       	    	}else if(formObj.f_slip_tp[3].selected){
       	    		formObj.f_cmd.value=COMMAND03;		// Close
       	    		action="Close One Day";
       	    	}
       	    	*/
   	   			formObj.f_cmd.value=COMMAND02;		// Journalize
	    		action="Journalize.";
           	    if(confirm("Do you want to Cancel " +action+ "? ")){
           	    	getObj('blank').style.display="none";
           	    	getObj('progress').style.display="inline";
           	    	getObj('success').style.display="none";
           	    	getObj('error').style.display="none";
           	    	formObj.f_oneDay.value="Y";
           	        setTimeout("goAction()", 1000)
           	        //sheetObj.DoAllSave("./ACC_SLP_0020GS.clt", FormQueryString(formObj), true);
           	    }
       	    }else{
//       	    	alert("Processing Wait Please!!");
       	    	alert(getLabel('ACC_MSG44'));
       	    	return;
       	    }
   	   	}
      break;
       case "REFRESH":
    	   location.reload();
       break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
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
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//오늘일자구하기
	var now=new Date(); 				
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 			
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	TODAY=month + "-" + date + "-" + year;
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {
	        	 // 높이 설정
//        	 SetSheetHeight(0);
        	 (20, 0, 0, true);
        	 var cnt=0;

        	 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

        	 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	 var headers = [ { Text:getLabel('ACC_SLP_0020_HDR1'), Align:"Center"} ];
        	 InitHeaders(headers, info);

        	 var cols = [ {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"inv_crt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"inv_dept",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"inv_void",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ap_crt",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ap_dept",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ap_void",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"cd_crt",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"cd_dept",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"cd_void",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dept_crt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dept_dept",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dept_void",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk_crt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk_dept",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk_void",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"tot_crt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"tot_dept",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"tot_void",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"errMsg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Status",    Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
        	  
        	 InitColumns(cols);
        	 SetVisible(0);
        	 SetEditable(1);
           }                                                      
           break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	PROC_FLAG="N";
if(sheetObj.GetCellValue(1, "errMsg") != ""){
		getObj('blank').style.display="none";
		getObj('progress').style.display="none";
		getObj('success').style.display="none";
		getObj('error').style.display="inline";
	}else{
		getObj('blank').style.display="none";
		getObj('progress').style.display="none";
		getObj('success').style.display="inline";
		getObj('error').style.display="none";
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출  
//	    	var cal=new calendarPopup();
//	        cal.select(formObj.f_proc_dt, 'f_proc_dt', 'MM-dd-yyyy');
	        var cal=new ComCalendar();
	        cal.select(formObj.f_proc_dt, 'MM-dd-yyyy');

	    break;
    }
}
function doBlink(){
	var blink=document.all.tags("blink");
	for (var i=0; i < blink.length; i++){
		blink[i].style.visibility=blink[i].style.visibility == "" ? "hidden" : ""
	}
} 
function startBlink() { 
	setInterval("doBlink()", 500);
} 
function goAction(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var intRows=sheetObj.LastRow() + 1;
    sheetObj.DataInsert(intRows);
    PROC_FLAG="Y";
	sheetObj.DoAllSave("./ACC_SLP_0020GS.clt", FormQueryString(formObj), true);
}
//Journalize 시 기간내 마감데이터가 있을경우 진행을 못하게 한다.
function checkJournalize(){
	var formObj=document.frm1;
	var procDate=getEndDate(formObj.f_proc_dt.value);
	if(formObj.f_proc_dt.value != procDate){
//		alert("Please Input Correct EndDate !! ");
//	Please, input end date of month!
		//alert(getLabel('ACC_MSG46'));
		alert(getLabel('ACC_MSG117'));
		formObj.f_proc_dt.select();
		return false;
	}
	var staNum=Number(formObj.f_proc_dt.value.substring(0,2));
	if(staNum == 12){
		staNum=1;
	}else{
		staNum=staNum + 1; 
	}
	if(staNum < 10){
		staNum="0" + staNum;
	}
	var monStr=staNum.toString();
	if(formObj.f_slip_tp[0].selected){
//		alert("Please Select [Slip Type]");
		alert(getLabel('ACC_MSG47'));
		formObj.f_slip_tp.focus();
		return false;
	}
	// CLOSE 취소시  SLIP 유무를 체크한다.
	if(formObj.f_slip_tp[3].selected){
		if(monStr.indexOf("01") != -1){
			if(formObj.s_jan.value == "Y"){
//				alert("January Journalized !! ");
				alert(getLabel('ACC_MSG91'));
				return false;
			}
		}
		if(monStr.indexOf("02") != -1){
			if(formObj.f_feb.value == "Y"){
//				alert("February Journalized !! ");
				alert(getLabel('ACC_MSG93'));
				return false;
			}
		}
		if(monStr.indexOf("03") != -1){
			if(formObj.s_mar.value == "Y"){
//				alert("March Journalized !! ");
				alert(getLabel('ACC_MSG94'));
				return false;
			}
		}
		if(monStr.indexOf("04") != -1){
			if(formObj.s_apr.value == "Y"){
//				alert("April Journalized !! ");
				alert(getLabel('ACC_MSG94'));
				return false;
			}
		}
		if(monStr.indexOf("05") != -1){
			if(formObj.s_may.value == "Y"){
//				alert("May Journalized !! ");
				alert(getLabel('ACC_MSG95'));
				return false;
			}
		}
		if(monStr.indexOf("06") != -1){
			if(formObj.s_jun.value == "Y"){
//				alert("June Journalized !! ");
				alert(getLabel('ACC_MSG96'));
				return false;
			}
		}
		if(monStr.indexOf("07") != -1){
			if(formObj.s_jul.value == "Y"){
//				alert("July Journalized !! ");
				alert(getLabel('ACC_MSG97'));
				return false;
			}
		}
		if(monStr.indexOf("08") != -1){
			if(formObj.s_aug.value == "Y"){
//				alert("August Journalized !! ");
				alert(getLabel('ACC_MSG98'));
				return false;
			}
		}
		if(monStr.indexOf("09") != -1){
			if(formObj.s_sep.value == "Y"){
//				alert("September Journalized !! ");
				alert(getLabel('ACC_MSG99'));
				return false;
			}
		}
		if(monStr.indexOf("10") != -1){
			if(formObj.s_oct.value == "Y"){
//				alert("October Journalized !! ");
				alert(getLabel('ACC_MSG100'));
				return false;
			}
		}
		if(monStr.indexOf("11") != -1){
			if(formObj.s_nov.value == "Y"){
//				alert("November Journalized !! ");
				alert(getLabel('ACC_MSG101'));
				return false;
			}
		}
		if(monStr.indexOf("12") != -1){
			if(formObj.s_dec.value == "Y"){
//				alert("December Journalized !! ");
				alert(getLabel('ACC_MSG102'));
				return false;
			}
		}
	}
	return true;
}
//Journalize 시 기간내 마감데이터가 있을경우 진행을 못하게 한다.
function checkJournalize2(){
	var formObj=document.frm1;
	if(formObj.f_slip_tp[0].selected){
//		alert("Please Select [Slip Type]");
		alert(getLabel('ACC_MSG47'));
		formObj.f_slip_tp.focus();
		return false;
	}
	return true;
}
//말일구하기
function getEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2));
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
