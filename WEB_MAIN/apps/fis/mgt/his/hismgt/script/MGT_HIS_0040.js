function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var formObj=document.frm1;
    var sheetObj=docObjects[0];
    switch(srcName) {
		//NEW 버튼을 눌렀을때 Default 데이터를 조회한다.
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST;
     	   if((frm1.s_rgst_tms.value != '' && frm1.e_rgst_tms.value == '') || (frm1.s_rgst_tms.value == '' && frm1.e_rgst_tms.value != '')){
    		   alert(getLabel('FMS_COM_ALT001'));
    		   frm1.s_rgst_tms.focus();
    		   return;
    	   }			
			sheetObj.DoSearch("MGT_HIS_0040GS.clt", FormQueryString(formObj) );
		break;
		case "CLOSE":
  			ComClosePopup(); 
  			window.close();
    	break;		
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
//    var now=new Date(); 				// 현재시간 가져오기
//	var year=now.getFullYear(); 			// 년도 가져오기
//	var month=now.getMonth() + 1; 		// 월 가져오기 (+1)
//	var month1=now.getMonth(); 		// 월 가져오기 (+1)
//	var date=now.getDate(); 			// 날짜 가져오기
//	if(month < 10)
//		month="0" + month;
//	if(date < 10)
//		date="0" + date;
//	if(month1 < 10)
//		month1="0" + month1;	
//	
//	frm1.s_rgst_tms.value=month1 + '-' + date + '-' + year;
//	frm1.e_rgst_tms.value=month + '-' + date + '-' + year;
//	frm1.f_enddt.value = year + '-' + month + '-' + date;
	
    //POP에선 날자설정 안하고 Search되게 변경
//	setFromToDtEndPlus(document.frm1.s_rgst_tms, 4, document.frm1.e_rgst_tms, 0);
	if(frm1.p_gb.value == 'POP')
	{	
		doWork('SEARCHLIST');
		
		
		getBtnObj('btnClose').style.display='inline';	
		getObj('pageTitlePop').style.display='inline';

		//nevi.style.display='none';		
		
		/* 20170117 신규추가 		*/
		//$('.wrap_search').css('display','none');		
		
	}else{
		
		//POP에선 날자설정 안하고 Search되게 변경
		setFromToDtEndPlus(document.frm1.s_rgst_tms, 4, document.frm1.e_rgst_tms, 0);

		getObj('pageTitleMain').style.display='inline';
		
	}
	doWork('SEARCHLIST');
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
 * param : sheetObj1 ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with (sheetObj) {
	
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('MGT_HIS_0040_HDR'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
		               {Type:"Int",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"seq",            KeyField:0,   CalcLogic:"",   Format:"NullInteger",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:1, Width:180,  Align:"Center",  ColMerge:1,   SaveName:"his_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"his_type",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"his_call_view",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"inv_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               //#6859:[KING FREIGHT] ADDING 'LOG' BUTTON ON B/L LIST UNDER LOCAL TRANSPORT
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"oth_ref_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"his_4",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"eng_usr_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Date",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",       KeyField:0,   CalcLogic:"",   Format:"YmdHms",      PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:270,  Align:"Left",    ColMerge:1,   SaveName:"rcvr_info",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"proc_sts_cd",    KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:270,  Align:"Left",    ColMerge:1,   SaveName:"err_msg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Image",     Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"att_file_1",    KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"snd_no",   	  KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"his_title",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"his_1",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"his_2",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"his_3",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"his_call_url",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:1,   SaveName:"his_call_frm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,  SaveName:"Indexing",       KeyField:0,   CalcLogic:"", Format:"",  PointCount:0,  UpdateEdit: 0, InsertEdit:0 }
		               ];
		         
		        InitColumns(cols);
		      
	            SetImageList(0,APP_PATH+"/web/img/button/bt_pdf.gif");
	            SetDataLinkMouse('att_file_1',1);
	
		        SetEditable(0);
		        SetSheetHeight(500);
		        resizeSheet();
		   }                                                      
		break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnSearchEnd(errMsg) {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for(var i=1; i<=sheetObj.LastRow();i++){
		var paramUrl=sheetObj.GetCellValue(i, "his_call_url");
		var paramFrm=sheetObj.GetCellValue(i, "his_call_frm");
		var type=sheetObj.GetCellValue(i, "his_type");
		if (paramUrl != "" && paramFrm != "" && type != "PRINT" ) {
			sheetObj.SetCellFont("FontUnderline", i,"bl_no",1);
			sheetObj.SetCellFont("FontUnderline", i,"inv_no",1);
			sheetObj.SetCellFontColor(i, "inv_no","#0000FF");
			sheetObj.SetCellFontColor(i, "bl_no","#0000FF");
		}
		
		if ("Success" !=  sheetObj.GetCellValue(i, "proc_sts_cd")) {
			sheetObj.SetCellImage(i, "att_file_1", 1);
		}
	}
	
	doDispPaging(sheetObj.GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) == "inv_no" || sheetObj.ColSaveName(Col) == "bl_no"){
		var paramUrl=sheetObj.GetCellValue(Row, "his_call_url");
		var paramFrm=sheetObj.GetCellValue(Row, "his_call_frm");
		var type=sheetObj.GetCellValue(Row, "his_type");
		if (paramUrl != "" && paramFrm != "" && type != "PRINT" ) {
			if(frm1.p_gb.value == 'POP')
			{
				opener.parent.mkNewFrame(paramFrm, paramUrl);
			}else{
				parent.mkNewFrame(paramFrm, paramUrl);
			}
		}
	}
}


/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet3_OnClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnClick(sheetObj, Row, Col){	
  
	var colStr = sheetObj.ColSaveName(Col);
	
	if(colStr=='att_file_1'){	
		if ("Success" ==  sheetObj.GetCellValue(Row, "proc_sts_cd")) {
			var snd_no = sheetObj.GetCellValue(Row,"snd_no");
			var downType =  sheetObj.GetCellValue(Row,"his_type")=="EMAIL"?"pdf":"tif";
			
			ajaxSendPost(hisFileCheck, 'reqVal', '&goWhere=aj&bcKey=hisFileCheck&snd_no='+snd_no+'&docType='+downType, './GateServlet.gsl');
		}
	}
}

function hisFileCheck(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			if (doc[1] !="NG") {
				var tmpArray = doc[1].split('@@@');

				var filePath = tmpArray[0];
				var fileNm = tmpArray[1];
				downloadFile(filePath,  fileNm);
			} else {
				alert(getLabel('FMS_COM_ALT067'));
			}
		}else{
			alert(getLabel('FMS_COM_ALT067'));
		}
	}else{
		alert(getLabel('FMS_COM_ALT067'));
	}
}

function downloadFile(filePath, fileNm){
	frm2.filePath.value = filePath;
	frm2.fileNm.value = fileNm;
	frm2.target = 'ifrm1';
	frm2.submit();
}


/**
 * 입력값 체크
 */
function inpuValCheck(sheetObj){
	var rowCnt=sheetObj.LastRow() + 1;
	var isOk=true;
	var loopNum=0;
	var checkVal=false;
	if(sheetObj.RowCount()== 0){
		alert(getLabel('FMS_COM_ALT039'));
		isOk=false;
		return isOk;
	}
	for(var i=1; i < rowCnt; i++){
		var stat=sheetObj.GetCellValue(i, 'ibflag');
	   if(stat!='R'){
		   if(stat=='I'){
			   checkVal=true;
			   loopNum++;
		   }else if(stat=='U'){
			   checkVal=true;
			   loopNum++;
		   }else if(stat=='D'){
			   checkVal=true;
			   loopNum++;
		   }
		   if(checkVal){
				if(checkInputVal(sheetObj.GetCellValue(i, 'fm_date'), 8, 8, "T", getLabel('MAC_MSG52'))!='O'){
			    	isOk=false;
			    	break;
				}else if(checkInputVal(sheetObj.GetCellValue(i, 'to_date'), 8, 8, "T", getLabel('MAC_MSG51'))!='O'){
			    	isOk=false;
			    	break;
			   }
				if(getDaysBetween2(sheetObj.GetCellValue(i, 'fm_date'),sheetObj.GetCellValue(i, 'to_date'), 'ymd') < 1 ){
				    alert(getLabel('SYS_COM_ALT008'));
			    	isOk=false;
			    	break;			   
			   }
			   checkVal=false;
		   }
	   }
	}
	/*
	if(loopNum==0){
		//No data to proceed!
		alert(getLabel('FMS_COM_ALT038'));
		isOk=false;
	}
	*/
	return isOk;
}
function doDisplay(doWhat, obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	        var cal=new ComCalendar(); 
	        cal.select(obj,  'MM-dd-yyyy');
	        break;
    }
}
/**
* 전체 데이터 저장 완료시
*/
function sheet1_OnSaveEnd(sheetObj, errMsg) {
	//Save success!
	if(errMsg =='' ||errMsg ==undefined||errMsg == null ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}

/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList() {
	document.frm1.f_CurPage.value = 1;	
	doWork('SEARCHLIST');
}
