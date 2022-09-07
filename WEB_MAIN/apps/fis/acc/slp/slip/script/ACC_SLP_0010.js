/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : ACC_SLP_0010.jsp
 *@FileTitle : SLIP CREATION
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
    	    if(PROC_FLAG != "Y"){
    	    	if(!chkSearchCmprPrd(true, frm1.s_strdt, frm1.s_enddt)){
    	    		return;
    	    	}
    	    	if(progress.style.display == "inline" || success.style.display == "inline" || error.style.display == "inline"){
//    	    		alert("Please Screen Refresh!!");
    	    		alert(getLabel('ACC_MSG43'));
    	    		return;
    	    	}
    	    	if(!checkJournalize()){
    	    		return;
    	    	}
    	    	var action="";
    	    	if(formObj.f_slip_tp[1].selected){
    	    		formObj.f_cmd.value=COMMAND03;		// Close
    	    		action="Close Monthly";
    	    	}else if(formObj.f_slip_tp[2].selected){
    	    		formObj.f_cmd.value=COMMAND04;		// Journalize
    	    		action="Journalize Monthly";
    	    	}else if(formObj.f_slip_tp[3].selected){
    	    		formObj.f_cmd.value=COMMAND01;		// Close + Journalize
    	    		action="Close + Journalize Monthly";
    	    	}
        	    if(confirm("Do you want to "+action+ "? ")){
        	    	getObj('blank').style.display="none";
        	    	getObj('progress').style.display="inline";
        	    	getObj('success').style.display="none";
        	    	getObj('error').style.display="none";
        	    	formObj.f_range_flg.value="N";
        	        setTimeout("goAction()", 1000);
        	        //sheetObj.DoAllSave("./ACC_SLP_0010GS.clt", FormQueryString(formObj), true);
        	    }
    	    }else{
//    	    	alert("Processing Wait Please!!");
    	    	alert(getLabel('ACC_MSG44'));
    	    	return;
    	    }
       break;
       case "COMMAND11":
   	    if(PROC_FLAG != "Y"){
   	    	if(!chkSearchCmprPrd(true, frm1.s_strdt, frm1.s_enddt)){
   	    		return;
   	    	}
   	    	var action="";
    		formObj.f_cmd.value=COMMAND01;		// Close + Journalize
//    		formObj.f_slip_tp[3].selected = true;
    		action="Block + Journalize Range";
       	    if(confirm("Do you want to "+action+ "? ")){
       	    	getObj('blank').style.display="none";
       	    	getObj('progress').style.display="inline";
       	    	getObj('success').style.display="none";
       	    	getObj('error').style.display="none";
       	    	formObj.f_range_flg.value="Y";
       	        setTimeout("goAction()", 1000);
       	        //sheetObj.DoAllSave("./ACC_SLP_0010GS.clt", FormQueryString(formObj), true);
       	    }
   	    }else{
//   	    	alert("Processing Wait Please!!");
   	    	alert(getLabel('ACC_MSG44'));
   	    	return;
   	    }
      break;
       case "COMMAND02":
    	    if(!chkSearchCmprPrd(true, frm1.s_strdt, frm1.s_enddt)){
    			return;
    		}
   	    	formObj.f_cmd.value=COMMAND02;
       	    if(confirm("Do you want to Verify? ")){
       	    	docObjects[1].RemoveAll();
        	    docObjects[1].DoSearch("./ACC_SLP_0011GS.clt", FormQueryString(formObj) );
       	    }
	   break;
       case "COMMAND03":
	   	    if(PROC_FLAG != "Y"){
	    	    if(!chkSearchCmprPrd(true, frm1.s_strdt, frm1.s_enddt)){
	    			return;
	    		}
	   	    	formObj.f_cmd.value=COMMAND03;
	       	    if(confirm("Do you want to Close? ")){
	       	    	getObj('blank').style.display="none";
	       	    	getObj('progress').style.display="inline";
	       	    	getObj('success').style.display="none";
	       	    	getObj('error').style.display="none";
	       	        setTimeout("goAction()", 1000);
	       	        //sheetObj.DoAllSave("./ACC_SLP_0010GS.clt", FormQueryString(formObj), true);
	       	    }
	   	    }else{
//	   	    	alert("Processing Wait Please!!");
	   	    	alert(getLabel('ACC_MSG44'));
	   	    	return;
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
	formObj.s_enddt.value=TODAY;
	//startBlink();
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
        	 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

        	 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	 var headers = [ { Text:getLabel('ACC_SLP_0010_HDR1'), Align:"Center"} ];
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
        	 sheetObj.SetFocusAfterProcess(1);
        	 SetVisible(0);
        	 SetEditable(1);
           }                                                      
           break;
         case 2:      //IBSheet1 init
             with (sheetObj) {
 	        	 // 높이 설정
        	 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

        	 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	 var headers = [ { Text:getLabel('ACC_SLP_0010_HDR2'), Align:"Center"} ];
        	 InitHeaders(headers, info);

        	 var cols = [ {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"type",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:120,   Align:"Left",    ColMerge:1,   SaveName:"ref_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:1,   SaveName:"com_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"com_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"gl_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"p_ofc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"ref_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"error",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"m_type",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"m_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ibflag2",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
        	  
        	 InitColumns(cols);
        	 SetSheetHeight(262);
        	 SetEditable(1);
        	 sheetObj.SetFocusAfterProcess(1);
        	 //InitViewFormat(0, "post_dt", "MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
//        	 sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
        	 resizeSheet();
            }                                                      
            break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[1]);
}

//function sheet2_OnSort(sheetObj, col, sortArrow) {
//	docObjects[1].SetSelectRow(sheetObj.HeaderRows());
//}
function sheet1_OnSort(sheetObj, col, sortArrow) {
	docObjects[0].SetSelectRow(sheetObj.HeaderRows());
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
		formObj.f_inv_crt.value=sheetObj.GetCellValue(1, "inv_crt");
		formObj.f_inv_dept.value="";
		formObj.f_inv_void.value="";
		formObj.f_ap_crt.value=sheetObj.GetCellValue(1, "ap_crt");
		formObj.f_ap_dept.value="";
		formObj.f_ap_void.value="";
		formObj.f_cd_crt.value=sheetObj.GetCellValue(1, "cd_crt");
		formObj.f_cd_dept.value="";
		formObj.f_cd_void.value="";
		formObj.f_dept_crt.value=sheetObj.GetCellValue(1, "dept_crt");
		formObj.f_dept_dept.value=sheetObj.GetCellValue(1, "dept_dept");
		formObj.f_dept_void.value=sheetObj.GetCellValue(1, "dept_void");
		formObj.f_tot_crt.value=sheetObj.GetCellValue(1, "tot_crt");
		formObj.f_tot_dept.value="";
		formObj.f_tot_void.value=sheetObj.GetCellValue(1, "tot_void");
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
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet2_OnDblClick(sheetObj2,Row,Col){
	var formObj=document.frm1;
	var type=sheetObj2.GetCellValue(Row, "m_type");
	var seq=sheetObj2.GetCellValue(Row, "m_seq");
	var ref_no=sheetObj2.GetCellValue(Row, "ref_no");
	switch(type){
		case 'LC' :
			var paramStr="./ACC_INV_0010.clt?f_cmd=-1&f_inv_seq="+seq+"&s_inv_no="+ref_no;
	        parent.mkNewFrame('A/R Entry', paramStr);
		break;
		case 'CD' :
			var paramStr="./ACC_INV_0020.clt?f_cmd=-1&f_inv_seq="+seq+"&s_inv_no="+ref_no;
	        parent.mkNewFrame('DC Note Entry', paramStr);
		break;
		case 'AP' :
			var paramStr="./ACC_INV_0030.clt?f_cmd=-1&f_inv_seq="+seq+"&s_inv_no="+ref_no;
	        parent.mkNewFrame('A/P Entry(Cost)', paramStr);
		break;
		case 'DP' :
			var paramStr="./ACC_JOR_0010.clt?f_cmd=-1&s_jnr_no="+seq;
		    parent.mkNewFrame('Deposit', paramStr);
	    break;
		case 'CK' :
			var paramStr="./ACC_JOR_0030.clt?f_cmd=-1&s_jnr_no="+seq;
		    parent.mkNewFrame('Payment', paramStr);
	    break;
		case 'DC' :
			var paramStr="./ACC_JOR_0200.clt?f_cmd=-1&s_jnr_no="+seq;
		    parent.mkNewFrame('C.Deposit Journal', paramStr);
	    break;
		case 'CC' :
			var paramStr="./ACC_JOR_0210.clt?f_cmd=-1&s_jnr_no="+seq;
		    parent.mkNewFrame('C.Check Journal', paramStr);
	    break;
		case 'CB' :
			var paramStr="./ACC_INV_0080.clt?f_cmd="+SEARCH+"&f_inv_no="+ref_no;
		   	parent.mkNewFrame('C. Invoice', paramStr);
	    break;
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE':   //달력 조회 From ~ To 팝업 호출 
	        var cal = new ComCalendarFromTo();
	        cal.displayType = "date";
	        cal.select(formObj.s_strdt, formObj.s_enddt, 'MM-dd-yyyy');
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
 	var intRows=sheetObj.LastRow()+1;
    sheetObj.DataInsert(intRows);
    PROC_FLAG="Y";
    //sheetObj.ShowDebugMsg = true;
	sheetObj.DoAllSave("./ACC_SLP_0010GS.clt", FormQueryString(formObj), true);
	//sheetObj.ShowDebugMsg = false;
}
// Journalize 시 기간내 마감데이터가 있을경우 진행을 못하게 한다.
function checkJournalize(){
	var formObj=document.frm1;
	if(formObj.f_slip_tp[0].selected){
//		alert("Please Select [Slip Type]");
		alert(getLabel('ACC_MSG47'));
		formObj.f_slip_tp.focus();
		return false;
	}
	var staNum=Number(formObj.s_strdt.value.substring(0,2));
	var endNum=Number(formObj.s_enddt.value.substring(0,2));
	var monArray=new Array(12);
	var num=0;
	for(var i=staNum; i<=endNum; i++){
		if(i < 10){
			monArray[num]="0"+ i;
		}else{
			monArray[num]=i;
		}
		num++;
	}
	var monStr=monArray.toString();
/* LHK 20131010 달력 삭제 BINEX 요구 사항에 포함 됨 */	
/*	
	// SLIP 생성시 CLOSE 유무를 체크한다.
	if(formObj.f_slip_tp[2].selected){
		if(formObj.c_jan.value == "N" || formObj.c_jan.value == ""){
			if(monStr.indexOf("01") != -1){
//				alert("January Not Closed !! ");
				alert(getLabel('ACC_MSG51'));
				return false;
			}
		}
		if(formObj.c_feb.value == "N" || formObj.c_feb.value == ""){
			if(monStr.indexOf("02") != -1){
//				alert("February Not Closed !! ");
				alert(getLabel('ACC_MSG52'));
				return false;
			}
		}
		if(formObj.c_mar.value == "N" || formObj.c_mar.value == ""){
			if(monStr.indexOf("03") != -1){
//				alert("March Not Closed !! ");
				alert(getLabel('ACC_MSG53'));
				return false;
			}
		}
		if(formObj.c_apr.value == "N" || formObj.c_apr.value == ""){
			if(monStr.indexOf("04") != -1){
//				alert("April Not Closed !! ");
				alert(getLabel('ACC_MSG54'));
				return false;
			}
		}
		if(formObj.c_may.value == "N" || formObj.c_may.value == ""){
			if(monStr.indexOf("05") != -1){
//				alert("May Not Closed !! ");
				alert(getLabel('ACC_MSG55'));
				return false;
			}
		}
		if(formObj.c_jun.value == "N" || formObj.c_jun.value == ""){
			if(monStr.indexOf("06") != -1){
//				alert("June Not Closed !! ");
				alert(getLabel('ACC_MSG56'));
				return false;
			}
		}
		if(formObj.c_jul.value == "N" || formObj.c_jul.value == ""){
			if(monStr.indexOf("07") != -1){
//				alert("July Not Closed !! ");
				alert(getLabel('ACC_MSG57'));
				return false;
			}
		}
		if(formObj.c_aug.value == "N" || formObj.c_aug.value == ""){
			if(monStr.indexOf("08") != -1){
//				alert("August Not Closed !! ");
				alert(getLabel('ACC_MSG58'));
				return false;
			}
		}
		if(formObj.c_sep.value == "N" || formObj.c_sep.value == ""){
			if(monStr.indexOf("09") != -1){
//				alert("September Not Closed !! ");
				alert(getLabel('ACC_MSG59'));
				return false;
			}
		}
		if(formObj.c_oct.value == "N" || formObj.c_oct.value == ""){
			if(monStr.indexOf("10") != -1){
//				alert("October Not Closed !! ");
				alert(getLabel('ACC_MSG60'));
				return false;
			}
		}
		if(formObj.c_nov.value == "N" || formObj.c_nov.value == ""){
			if(monStr.indexOf("11") != -1){
//				alert("November Not Closed !! ");
				alert(getLabel('ACC_MSG61'));
				return false;
			}
		}
		if(formObj.c_dec.value == "N" || formObj.c_dec.value == ""){
			if(monStr.indexOf("12") != -1){
//				alert("December Not Closed !! ");
				alert(getLabel('ACC_MSG62'));
				return false;
			}
		}
	}
	// SLIPI 생성시 해당월이 이미 마감이 되었는지 체크한다.
	if(formObj.f_slip_tp[2].selected || formObj.f_slip_tp[3].selected){
		if(formObj.s_jan.value == "Y"){
			if(monStr.indexOf("01") != -1){
//				alert("January aready Journalized !! ");
				alert(getLabel('ACC_MSG71'));
				return false;
			}
		}
		if(formObj.s_feb.value == "Y"){
			if(monStr.indexOf("02") != -1){
//				alert("February  aready Journalized !! ");
				alert(getLabel('ACC_MSG72'));
				return false;
			}
		}
		if(formObj.s_mar.value == "Y"){
			if(monStr.indexOf("03") != -1){
//				alert("March aready Journalized !! ");
				alert(getLabel('ACC_MSG73'));
				return false;
			}
		}
		if(formObj.s_apr.value == "Y"){
			if(monStr.indexOf("04") != -1){
//				alert("April aready Journalized !! ");
				alert(getLabel('ACC_MSG74'));
				return false;
			}
		}
		if(formObj.s_may.value == "Y"){
			if(monStr.indexOf("05") != -1){
//				alert("May aready Journalized !! ");
				alert(getLabel('ACC_MSG75'));
				return false;
			}
		}
		if(formObj.s_jun.value == "Y"){
			if(monStr.indexOf("06") != -1){
//				alert("June aready Journalized !! ");
				alert(getLabel('ACC_MSG76'));
				return false;
			}
		}
		if(formObj.s_jul.value == "Y"){
			if(monStr.indexOf("07") != -1){
//				alert("July aready Journalized !! ");
				alert(getLabel('ACC_MSG77'));
				return false;
			}
		}
		if(formObj.s_aug.value == "Y"){
			if(monStr.indexOf("08") != -1){
//				alert("August aready Journalized !! ");
				alert(getLabel('ACC_MSG78'));
				return false;
			}
		}
		if(formObj.s_sep.value == "Y"){
			if(monStr.indexOf("09") != -1){
//				alert("September aready Journalized !! ");
				alert(getLabel('ACC_MSG79'));
				return false;
			}
		}
		if(formObj.s_oct.value == "Y"){
			if(monStr.indexOf("10") != -1){
//				alert("October aready Journalized !! ");
				alert(getLabel('ACC_MSG80'));
				return false;
			}
		}
		if(formObj.s_nov.value == "Y"){
			if(monStr.indexOf("11") != -1){
//				alert("November aready Journalized !! ");
				alert(getLabel('ACC_MSG81'));
				return false;
			}
		}
		if(formObj.s_dec.value == "Y"){
			if(monStr.indexOf("12") != -1){
//				alert("December aready Journalized !! ");
				alert(getLabel('ACC_MSG82'));
				return false;
			}
		}
	}
*/	
	return true;
}
//Journalize 시 기간내 마감데이터가 있을경우 진행을 못하게 한다.
function checkRanceJournalize(){
	var formObj=document.frm1;
	if(formObj.f_slip_tp[0].selected){
//		alert("Please Select [Slip Type]");
		alert(getLabel('ACC_MSG47'));
		formObj.f_slip_tp.focus();
		return false;
	}
	var staNum=Number(formObj.s_strdt.value.substring(0,2));
	var endNum=Number(formObj.s_enddt.value.substring(0,2));
	var monArray=new Array(12);
	var num=0;
	for(var i=staNum; i<=endNum; i++){
		if(i < 10){
			monArray[num]="0"+ i;
		}else{
			monArray[num]=i;
		}
		num++;
	}
	var monStr=monArray.toString();
/*	
	// SLIP 생성시 CLOSE 유무를 체크한다.
	if(formObj.f_slip_tp[2].selected){
		if(formObj.c_jan.value == "N" || formObj.c_jan.value == ""){
			if(monStr.indexOf("01") != -1){
//				alert("January Not Closed !! ");
				alert(getLabel('ACC_MSG51'));
				return false;
			}
		}
		if(formObj.c_feb.value == "N" || formObj.c_feb.value == ""){
			if(monStr.indexOf("02") != -1){
//				alert("February Not Closed !! ");
				alert(getLabel('ACC_MSG52'));
				return false;
			}
		}
		if(formObj.c_mar.value == "N" || formObj.c_mar.value == ""){
			if(monStr.indexOf("03") != -1){
//				alert("March Not Closed !! ");
				alert(getLabel('ACC_MSG53'));
				return false;
			}
		}
		if(formObj.c_apr.value == "N" || formObj.c_apr.value == ""){
			if(monStr.indexOf("04") != -1){
//				alert("April Not Closed !! ");
				alert(getLabel('ACC_MSG54'));
				return false;
			}
		}
		if(formObj.c_may.value == "N" || formObj.c_may.value == ""){
			if(monStr.indexOf("05") != -1){
//				alert("May Not Closed !! ");
				alert(getLabel('ACC_MSG55'));
				return false;
			}
		}
		if(formObj.c_jun.value == "N" || formObj.c_jun.value == ""){
			if(monStr.indexOf("06") != -1){
//				alert("June Not Closed !! ");
				alert(getLabel('ACC_MSG56'));
				return false;
			}
		}
		if(formObj.c_jul.value == "N" || formObj.c_jul.value == ""){
			if(monStr.indexOf("07") != -1){
//				alert("July Not Closed !! ");
				alert(getLabel('ACC_MSG57'));
				return false;
			}
		}
		if(formObj.c_aug.value == "N" || formObj.c_aug.value == ""){
			if(monStr.indexOf("08") != -1){
//				alert("August Not Closed !! ");
				alert(getLabel('ACC_MSG58'));
				return false;
			}
		}
		if(formObj.c_sep.value == "N" || formObj.c_sep.value == ""){
			if(monStr.indexOf("09") != -1){
//				alert("September Not Closed !! ");
				alert(getLabel('ACC_MSG59'));
				return false;
			}
		}
		if(formObj.c_oct.value == "N" || formObj.c_oct.value == ""){
			if(monStr.indexOf("10") != -1){
//				alert("October Not Closed !! ");
				alert(getLabel('ACC_MSG60'));
				return false;
			}
		}
		if(formObj.c_nov.value == "N" || formObj.c_nov.value == ""){
			if(monStr.indexOf("11") != -1){
//				alert("November Not Closed !! ");
				alert(getLabel('ACC_MSG61'));
				return false;
			}
		}
		if(formObj.c_dec.value == "N" || formObj.c_dec.value == ""){
			if(monStr.indexOf("12") != -1){
//				alert("December Not Closed !! ");
				alert(getLabel('ACC_MSG62'));
				return false;
			}
		}
	}
*/	
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
//Calendar flag value
var firCalFlag=false;
var row = 0;
function sheet2_OnSort(sheetObj, col, sortArrow) {
//	if(row > 0){
//		sheetObj.SetSelectRow(sheetObj.HeaderRows());
//		sheetObj.SetSelectRow(row);
//	}else{
		sheetObj.SetSelectRow(sheetObj.HeaderRows());
//	}
}

function sheet2_OnClick(sheetObj, Row, Col) {
	row = Row;
}