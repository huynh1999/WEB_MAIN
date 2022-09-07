var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName, curObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST":
			if(!formValidation()) return;
			//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(formObj.s_fm_visit_tm_fm.value == "" || formObj.s_fm_visit_tm_fm.value == ""){
            	alert(getLabel('FMS_COM_ALT001')+ "\n - " + getLabel('DATE'));
            	return;
            }
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
				sheetObj.DoSearch("SAL_TPM_0110GS.clt", FormQueryString(formObj) );
            }
            //sheetObj.ShowDebugMsg = false;
       	break;
       	case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			var id=curObj.id;			
			rtnary=new Array(1);
			rtnary[0]="1";		   		
//			rtnary[1]=frm1.s_trdp_nm.value;					
			rtnary[1]="";
			rtnary[2]=window;
		    //var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp=TK', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			callBackFunc = "PARTNER_POPLIST";
			modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
	    break;
       	case "PARTNER_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			var id=curObj.id;			
			rtnary=new Array(1);
			rtnary[0]="1";		   		
			rtnary[1]=frm1.s_trdp_nm.value;					
			rtnary[2]=window;
		    //var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp=TK', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			callBackFunc = "PARTNER_POPLIST";
			modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
	    break;
        case 'PRINT':        	
			popGET('RPT_PRN_0220.clt', '', 490, 370, "scroll:yes;status:no;help:no;"); /* 기존 400, 115 일때 .. 달력이 잘려서 안보임.  */
		break;
        case 'EXCEL':
        	if(sheetObj.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
    		}
        break;
        case 'NEW':
            var paramStr="./SAL_TPM_0100.clt?f_cmd=-1";
            parent.mkNewFrame('Sales Daily Report Entry', paramStr);
        break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
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
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
    setFromToDtEndPlus(document.frm1.s_fm_visit_tm_fm, 7, document.frm1.s_to_visit_tm_to, 0);
}
function RestoreGrid () {
    //doWork('SEARCHLIST');
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
	var cnt=0;
	switch(sheetNo) {
		case 1:      //sheet1 init
			with (sheetObj) {
		        (12, 0, 0, false);
	
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('SAL_TPM_0110_HDR1'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Seq",       Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"",                  KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:0, Width:300,  Align:"Left",    ColMerge:1,   SaveName:"eng_nm",            KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Date",      Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"visit_tm_fm",       KeyField:0,   CalcLogic:"",   Format:"Ymd", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:0, Width:170,  Align:"Left",    ColMerge:1,   SaveName:"pic_nm",            KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Combo",     Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"division",          KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"rgst_usrnm",        KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:0, Width:400,  Align:"Left",    ColMerge:1,   SaveName:"sls_his_tit",       KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"file_popup",        KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sls_his_flat_url",  KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sls_his_flat_nm",   KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cntc_seq",          KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
			         
		        InitColumns(cols);

	        	SetEditable(1);
	        	SetImageList(0,APP_PATH+"/web/img/button/bt_file.gif");
	            SetColProperty('division', {ComboText:'QUOTATION|BIDDING|CLAIM|NEWCUSTOMER|GENERAL', ComboCode:'Q|B|C|N|G'} );
	            //InitViewFormat(0, "visit_tm_fm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	            sheetObj.SetDataLinkMouse("file_popup",1);
	            SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	            SetSheetHeight(450);
	            resizeSheet();
			}
		break;
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
	    case "file_popup" :	//파일다운로드
			if(sheetObj.GetCellValue(Row, "sls_his_flat_nm") != ''){
				document.frm2.trdp_cd.value=sheetObj.GetCellValue(Row, "trdp_cd");
				document.frm2.cntc_seq.value=sheetObj.GetCellValue(Row, "cntc_seq");
		    	document.frm2.target='ifrm1';
				document.frm2.submit();
	    	}
		break;
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	var asVar       = docObjects[0].GetCellValue(Row,"trdp_cd");
	var asSeq       = docObjects[0].GetCellValue(Row,"cntc_seq");
	if(asVar == null || asVar == ''){
		asVar = '';
	}
	ajaxSendPost(checkDupcheckDupCntc, 'reqVal', '&goWhere=aj&bcKey=checkDupCntc&trdp_cd='+asVar+'&cntc_seq='+asSeq, './GateServlet.gsl');

	
	//var paramStr="./SAL_TPM_0100.clt?f_cmd=2&trdp_cd="+asVar+"&cntc_seq="+sheetObj.GetCellValue(Row,"cntc_seq");
    //parent.mkNewFrame('Sales Daily Report Entry', paramStr, "SAL_TPM_0100_SHEET_" + sheetObj.GetCellValue(Row,"trdp_cd")+"_"+sheetObj.GetCellValue(Row,"cntc_seq"));
}
function checkDupcheckDupCntc(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if (doc[1] == "pass"){
				var rowPosition = docObjects[0].GetSelectRow();
				var asVar       = docObjects[0].GetCellValue(rowPosition,"trdp_cd");
				var asSeq       = docObjects[0].GetCellValue(rowPosition,"cntc_seq");
				if(asVar == null || asVar == ''){
					asVar = '';
				}
				var paramStr="./SAL_TPM_0100.clt?f_cmd=2&trdp_cd="+asVar+"&cntc_seq="+asSeq;
			    parent.mkNewFrame('Sales Daily Report Entry', paramStr, "SAL_TPM_0100_SHEET_" + asVar+"_"+asSeq);
			}
		} else {
			alert(getLabel('FMS_COM_DUP_CNTC'));
		}
	}
}
function data_count_validation(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == "OK" && doc[1]!= undefined ) {
		if(doc[1] == "Y"){
		}else{                             
		}
	}
}
/**
* code name select
*/
function codeNameAction(str, obj, tmp){
	if(obj.value != ""){
		CODETYPE=str;
		var sub_str=str.substring(0,8);
		if(sub_str == "partner_"){
			str='trdpcode'
		}
		if(tmp=="onKeyDown"){
			if (event.keyCode == 13){
				var s_code=obj.value;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}else if(tmp == "onBlur" && obj.value == ""){
		frm1.s_trdp_nm.value="";
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var frm1=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');		
			var masterVals=rtnArr[0].split('@@^');
			//alert(rtnArr[0]);
			if(CODETYPE =="partner_pickup"){
				frm1.s_trdp_cd.value=masterVals[0];
				frm1.s_trdp_nm.value=masterVals[3];
			}
		}else{
			if(CODETYPE =="partner_pickup"){
				frm1.s_trdp_cd.value="";
				frm1.s_trdp_nm.value="";
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST');
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal= new ComCalendarFromTo();
	        cal.select(formObj.s_fm_visit_tm_fm,formObj.s_to_visit_tm_to, 'MM-dd-yyyy');
	    break;
    }
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet1_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 사용자가 저장한 Header Setting을 삭제한다.
//		case "Header Setting Delete":
//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.MouseCol();
			if(sheetObj.ColSaveName(col)==""){
//				alert("You can't Hidden this column.");
				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
function formValidation(){
	var formObj=document.frm1;
	if(trim(formObj.s_fm_visit_tm_fm.value)!= "" && trim(formObj.s_to_visit_tm_to.value) != ""){
		if(getDaysBetweenFormat(formObj.s_fm_visit_tm_fm,formObj.s_to_visit_tm_to,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033'));
			formObj.s_to_visit_tm_to.focus();
			return false;
		}
	}
	return true;
}

function PARTNER_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{					
		var rtnValAry=rtnVal.split("|");
		frm1.s_trdp_cd.value=rtnValAry[0];//trdp_cd
		frm1.s_trdp_nm.value=rtnValAry[2];//eng_nm
	}
}

function clearAll(){
	//docObjects[0].RemoveAll();
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
	setFromToDtEndPlus(document.frm1.s_fm_visit_tm_fm, 7, document.frm1.s_to_visit_tm_to, 0);
}