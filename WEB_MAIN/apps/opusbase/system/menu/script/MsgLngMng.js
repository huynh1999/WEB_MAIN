var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
	switch(srcName) {
	case "SEARCHLIST":
		formObj.f_cmd.value=SEARCHLIST;
		//검증로직
		if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
			sheetObj.DoSearch("MsgLngMngGS.clt", FormQueryString(formObj) );
		}
		break;
	case "NEW":
		break;
	case "ROWADD":
		var intRows=sheetObj.LastRow() + 1;
		sheetObj.DataInsert(intRows);
		sheetObj.SetCellValue(intRows, "DELT_FLG","N");
		
		// 기존에 등록된 데이터가 있는경우
		if (intRows > 1) {
			sheetObj.SetCellValue(intRows, "msg_prop_tp", sheetObj.GetCellValue(intRows-1, "msg_prop_tp"),0);
			sheetObj.SetCellValue(intRows, "msg_file_cd", sheetObj.GetCellValue(intRows-1, "msg_file_cd"),0);
			sheetObj.SetCellValue(intRows, "lang", sheetObj.GetCellValue(intRows-1, "lang"),0);
			
			if(sheetObj.GetCellValue(intRows-1, "msg_prop_tp")=='MGP'){
				sheetObj.CellComboItem(intRows,"msg_file_cd", {ComboText:"MessageResources", ComboCode:"MSG_RSC"} );
				sheetObj.SetCellValue(intRows, "msg_file_cd", "MSG_RSC",0);
//			} else if (sheetObj.GetCellValue(intRows-1, "msg_prop_tp")=='IBH') {
//				sheetObj.CellComboItem(intRows,"msg_file_cd", {ComboText:"IBHeader", ComboCode:"IBHEAD"} );
//				sheetObj.SetCellValue(intRows, "msg_file_cd", "IBHEAD",0);
			} else {
				var arrNewComboText = PARAM2_1.split('|');  
				var arrNewComboCode = PARAM2_2.split('|');  
				var newComboText="";
				var newComboCode="";
				var t_split = "";
				var index = 0;
				for (var i=0;i<arrNewComboText.length;i++) {
//					if (String(arrNewComboCode[i]) != "MSG_RSC" && String(arrNewComboCode[i]) != "IBHEAD") {
					if (String(arrNewComboCode[i]) != "MSG_RSC") {
						if (index > 0) {
							t_split = "|";
						}
						newComboText += t_split + arrNewComboText[i];
						newComboCode += t_split + arrNewComboCode[i];
						index++;
					}
				}
				sheetObj.CellComboItem(intRows,"msg_file_cd", {ComboText:newComboText, ComboCode:newComboCode} );
				sheetObj.SetCellValue(intRows, "msg_file_cd", sheetObj.GetCellValue(intRows-1, "msg_file_cd"),0);
			}
			
		} else {
			// IBHEADER FILE 프로퍼티 설정 -> MSG_RSC로 수정
		    sheetObj.SetCellValue(intRows, "msg_prop_tp", "MGP",0);
//			sheetObj.CellComboItem(intRows,"msg_file_cd", {ComboText:"IBHeader", ComboCode:"IBHEAD"} );
//			sheetObj.SetCellValue(intRows, "msg_file_cd", "IBHEAD",0);
			sheetObj.CellComboItem(intRows,"msg_file_cd", {ComboText:"MessageResources", ComboCode:"MSG_RSC"} );
			sheetObj.SetCellValue(intRows, "msg_file_cd", "MSG_RSC",0);
		}
	break;
	case "MODIFY":
		if ( !fncGridCheck() ) return false;
		formObj.f_cmd.value=MODIFY;
		//삭제된 행을 제외하고 중복 체크하기
		var dupFlg = false;
//		var dupRow = sheetObj.ColValueDup("msg_file_cd|lang|msg_key", 0);
//		if (dupRow > -1) {
//			dupFlg = true;
//		}
		if(!dupFlg){
			if (confirm(getLabel('FMS_COM_CFMSAV'))) {
				doProcess=true;
				sheetObj.DoSave("MsgLngMngGS.clt", FormQueryString(formObj),"ibflag",false);
			}
		} else {
			if (confirm(getLabel('FMS_COM_ALT008') + " - MSG File & LANG & MSG KEY\n" + getLabel('FMS_COM_CFMSAV'))){
				doProcess=true;
				sheetObj.DoSave("MsgLngMngGS.clt", FormQueryString(formObj),"ibflag",false);
			}
		}
		break;
	case "EXCEL":
		if(sheetObj.RowCount() < 1){//no data	
			ComShowCodeMessage("COM132501");
		}else{
			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
		}
		break;
	case "CREATE": 
//		var reqParam = '';
//		popGET('CreatePropList.clt'+reqParam, '', 850, 700, "scroll:yes;status:no;help:no;");

		// Create Properties File List 팝업 화면 호출		
  		rtnary=new Array(1);
		rtnary[0]='';

		callBackFunc = "createPropListCallback";
		modal_center_open('./CreatePropList.clt', rtnary, 850,700,"yes");
		
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
 * Paging 항목 선택시 호출됨
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
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    var selectObj = document.getElementById("f_msg_prop_file"); 
	
	// IBHEADER FILE 프로퍼티 설정 -> MSG_RSC로 수정
    document.frm1.f_msg_prop_tp.value = "MGP";
	for(var i=0; i < selectObj.options.length ; i++ ){ 

//		if (selectObj.options[i].value == "IBHEAD"){ 
		if (selectObj.options[i].value == "MSG_RSC"){ 
			selectObj.options[i].disabled = false ; 
			selectObj.options[i].selected = true;
		} else {
			selectObj.options[i].disabled = true ; 
		}

	} 
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
    switch(sheetNo) {
		case 1:      //IBSheet1 init
	      with(sheetObj){
	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	         var headers = [ { Text:getLabel('MSG_LNG_HDR1'), Align:"Center"}];
	         InitHeaders(headers, info);
	         
	         var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
	                      {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
	                      {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                      {Type:"msg_key_seq",      Hidden:1,  Width:140,   Align:"Center",  ColMerge:1,   SaveName:"msg_key_seq",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                      {Type:"Combo",      Hidden:0,  Width:130,   Align:"Left",    ColMerge:1,   SaveName:"msg_prop_tp",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                      {Type:"Combo",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"msg_file_cd",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                      {Type:"Combo",      Hidden:0,  Width:80,  Align:"Left",    ColMerge:1,   SaveName:"lang",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                      {Type:"Text",      Hidden:0,  Width:220,  Align:"Left",    ColMerge:1,   SaveName:"msg_key",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:30 },
	                      {Type:"Text",      Hidden:0,  Width:500,  Align:"Left",    ColMerge:1,   SaveName:"msg_val",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4000 },
	                      {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"desc",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:150 },
	                      {Type:"Date",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"modi_tms",    KeyField:0,   CalcLogic:"",   Format:"YmdHm",            PointCount:0,   UpdateEdit:0, InsertEdit:0 },
	                      {Type:"Text",      Hidden:1,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"delt_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 }
	                      ];
	         
	         InitColumns(cols);
	         SetSheetHeight(550);
	         SetEditable(1);
	         SetDataLinkMouse("msg_key", 1);
	         SetColProperty('msg_prop_tp', {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
	         SetColProperty('msg_file_cd', {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
	         SetColProperty('lang', {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
	         resizeSheet();
          }
		break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	//Save success!
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		var formObj=document.frm1;
		formObj.h_msg_key.value = "";
		for(var i=1;i<=sheetObj.LastRow();i++){
			// MSG KEY 컬럼 폰트 설정
			sheetObj.SetCellFont("FontUnderline", i,"msg_key", i,"msg_key",1);
			sheetObj.SetCellFontColor(i, "msg_key","#0000FF");
			sheetObj.SetCellFont("FontBold", i, "msg_key",i, "msg_key",1);
		}
		showCompleteProcess();
	}
	//doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
}

function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	formObj.h_msg_key.value = "";
	for(var i=1;i<=sheetObj.LastRow();i++){
		// MSG KEY 폰트 설정
		sheetObj.SetCellFont("FontUnderline", i,"msg_key", i,"msg_key",1);
		sheetObj.SetCellFontColor(i, "msg_key","#0000FF");
		sheetObj.SetCellFont("FontBold", i, "msg_key",i, "msg_key",1);
	}
	//doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
}

function sheet1_OnClick(sheetObj,Row,Col){
	/*var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) == "msg_key"){
		// ADD ROW에 대하여 처리 안하게 하기 위함
		if (sheetObj.GetCellValue(Row, "modi_tms") != "") {
			formObj.f_msg_prop_tp.value = sheetObj.GetCellValue(Row, "msg_prop_tp");
			formObj.f_msg_prop_file.value = "";
			formObj.f_lang_cd.value = "";
			formObj.f_msg_val.value = "";
			//formObj.f_msg_key.value = "";
			//formObj.h_msg_key.value = sheetObj.GetCellValue(Row, "msg_key");
			formObj.f_msg_key.value = sheetObj.GetCellValue(Row, "msg_key");
			doWork('SEARCHLIST');
		}
	}*/
}

function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) == "msg_key"){
		// ADD ROW에 대하여 처리 안하게 하기 위함
		if (sheetObj.GetCellValue(Row, "modi_tms") != "") {
			formObj.f_msg_prop_tp.value = sheetObj.GetCellValue(Row, "msg_prop_tp");
			formObj.f_msg_prop_file.value = "";
			formObj.f_lang_cd.value = "";
			formObj.f_msg_val.value = "";
	
			formObj.f_msg_key.value = sheetObj.GetCellValue(Row, "msg_key");
			doWork('SEARCHLIST');
		}
	}
}

function sheet1_OnChange(sheetObj, row, col, value){
	var colStr=sheetObj.ColSaveName(col);
	// msg_prop_tp변경에 따른 msg_file_cd 콤보 제어
	if(colStr=="msg_prop_tp"){
		if(sheetObj.GetCellValue(row, "msg_prop_tp")=='MGP'){
			sheetObj.CellComboItem(row,"msg_file_cd", {ComboText:"MessageResources", ComboCode:"MSG_RSC"} );
			sheetObj.SetCellValue(row, "msg_file_cd", "MSG_RSC",0);
//		} else if (sheetObj.GetCellValue(row, "msg_prop_tp")=='IBH') {
//			sheetObj.CellComboItem(row,"msg_file_cd", {ComboText:"IBHeader", ComboCode:"IBHEAD"} );
//			sheetObj.SetCellValue(row, "msg_file_cd", "IBHEAD",0);
		} else {
			var arrNewComboText = PARAM2_1.split('|');  
			var arrNewComboCode = PARAM2_2.split('|');  
			var newComboText="";
			var newComboCode="";
			var t_split = "";
			var index = 0;
			for (var i=0;i<arrNewComboText.length;i++) {
//				if (String(arrNewComboCode[i]) != "MSG_RSC" && String(arrNewComboCode[i]) != "IBHEAD") {
				if (String(arrNewComboCode[i]) != "MSG_RSC") {
					if (index > 0) {
						t_split = "|";
					}
					newComboText += t_split + arrNewComboText[i];
					newComboCode += t_split + arrNewComboCode[i];
					index++;
				}
			}
			sheetObj.CellComboItem(row,"msg_file_cd", {ComboText:newComboText, ComboCode:newComboCode} );
			if (sheetObj.RowCount() == 1) {
				sheetObj.SetCellValue(row, "msg_file_cd", "ACC_COM",0);
			} else {
				if (sheetObj.GetCellValue(row-1, "msg_prop_tp") == sheetObj.GetCellValue(row, "msg_prop_tp")) {
					sheetObj.SetCellValue(row, "msg_file_cd", sheetObj.GetCellValue(row-1, "msg_file_cd"),0);
				} else {
					sheetObj.SetCellValue(row, "msg_file_cd", "ACC_COM",0);
				}
			}
		}
	}
}

function fncSearch(){
	if(event.keyCode==13){doWork('SEARCHLIST');};
}

function fncGridCheck() {
	var sheetObj=docObjects[0];
	for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
		if ( sheetObj.GetCellValue(i, 'msg_prop_tp') == '') {
			alert(getLabel('FMS_COM_ALT007') + "\n - MSG PROP TYPE");
			sheetObj.SelectCell(i, 'msg_prop_tp');
			return false;
		}	
		if ( sheetObj.GetCellValue(i, 'msg_file_cd') == '') {
			alert(getLabel('FMS_COM_ALT007') + "\n - MSG File");
			sheetObj.SelectCell(i, 'msg_file_cd');
			return false;
		}	
		if ( sheetObj.GetCellValue(i, 'lang') == '') {
			alert(getLabel('FMS_COM_ALT007') + "\n - LANG");
			sheetObj.SelectCell(i, 'lang');
			return false;
		}	
		if ( sheetObj.GetCellValue(i, 'msg_key') == '') {
			alert(getLabel('FMS_COM_ALT007') + "\n - MSG KEY");
			sheetObj.SelectCell(i, 'msg_key');
			return false;
		}	
		/*if ( sheetObj.GetCellValue(i, 'msg_val') == '') {
			alert(getLabel('FMS_COM_ALT007') + "\n - MSG Value");
			sheetObj.SelectCell(i, 'msg_val');
			return false;
		}*/	
	}

	return true;
}

function msgFileCodeFilter(obj) {
	var objVal = obj.value;
	
	var selectObj = document.getElementById("f_msg_prop_file"); 
	
	var selIndex = 0;
	// MSG PROP TYPE에 따른 MSG FILE 프로퍼티 설정
	for(var i=0; i < selectObj.options.length ; i++ ){ 
		if (objVal == "MGP") {
			if (selectObj.options[i].value == "MSG_RSC"){ 
				selectObj.options[i].disabled = false ; 
				selectObj.options[i].selected = true;
			} else {
				selectObj.options[i].disabled = true ; 
			}
//		} else if (objVal == "PGM"){
		} else if (objVal == "PGM" || objVal == "IBH"){
//			if (selectObj.options[i].value == "MSG_RSC" || selectObj.options[i].value == "IBHEAD"){ 
			if (selectObj.options[i].value == "MSG_RSC"){ 
				selectObj.options[i].disabled = true ; 
			} else {
				selectObj.options[i].disabled = false ;
				if (selIndex == 0) {
					selectObj.options[i].selected = true;
				}
				selIndex ++;
			}
//		} else if (objVal == "IBH"){
//			if (selectObj.options[i].value == "IBHEAD"){ 
//				selectObj.options[i].disabled = false ; 
//				selectObj.options[i].selected = true;
//			} else {
//				selectObj.options[i].disabled = true ; 
//			}
		} else {
			selectObj.options[i].disabled = false ; 
			if (selIndex == 0) {
				selectObj.options[i].selected = true;
			}
			selIndex ++;
		}
	} 
}

function createPropListCallback(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{

	}
}

function showCompleteProc() {
	showCompleteProcess();
}