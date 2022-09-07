function doWork(srcName){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
    switch(srcName) {
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST;
			//검증로직
			sheetObj.DoSearch("CreatePropListGS.clt", FormQueryString(formObj) );
			break;
		break;	
		// File Create
		case "CREATE": 
			if ( !fncGridCheck() ) return false;
			if(confirm(getLabel('FMS_COM_MSGCREATE'))){
				formObj.f_cmd.value=COMMAND01;
				doProcess=true;
				sheetObj.DoSave("CreatePropListGS.clt", FormQueryString(formObj),"create_flg",false);
			}
			break; 
		case "CLOSE":
			//window.close(); 
			ComClosePopup();
		break;
		}
}

//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
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
* param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
* 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
*/
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:      //IBSheet1 init
	      with(sheetObj){
	         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1, HeaderCheck:1 };
	         var headers = [ { Text:getLabel('PROP_CREATE_HDR1'), Align:"Center"} ];
	         InitHeaders(headers, info);
	         
	         var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
	                      {Type:"DelCheck",  Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
	                      {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                      {Type:"Combo",      Hidden:1,  Width:210,   Align:"Left",    ColMerge:1,   SaveName:"msg_prop_tp",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                      {Type:"Combo",      Hidden:1,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"msg_file_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                      {Type:"Text",      Hidden:0,  Width:350,  Align:"Left",    ColMerge:1,   SaveName:"msg_file_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0},
	                      {Type:"Combo",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"lang",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                      {Type:"Text",      Hidden:1,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"modi_tms",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	                      {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"create_flg",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1 }
	                      ];
	         
	         InitColumns(cols);
	         SetSheetHeight(550);
	         SetEditable(1);
	         
	         SetColProperty('msg_prop_tp', {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
	         SetColProperty('msg_file_cd', {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
	         SetColProperty('lang', {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
          }
		break;
    }
}

function sheet1_OnSearchEnd(){
	// CHK컬럼 모두 체크
	docObjects[0].CheckAll("create_flg", 1);
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	//Save success!
	var formObj=document.frm1;
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		ComClosePopup();
		parent.showCompleteProc();
	}
}

/*function msgFileCodeFilter(obj) {
	var objVal = obj.value;
	
	// MSG PROP TYPE에 따른 MSG FILE 프로퍼티 설정
	var selectObj = document.getElementById("f_msg_prop_file"); 
	var selIndex = 0;  
	for(var i=0; i < selectObj.options.length ; i++ ){ 
		if (objVal == "MGP") {
			if (selectObj.options[i].value == "MSG_RSC"){ 
				selectObj.options[i].disabled = false ;
				selectObj.options[i].selected = true;
			} else {
				selectObj.options[i].disabled = true ; 
			}
		} else if (objVal == "PGM"){
			if (selectObj.options[i].value == "MSG_RSC"){ 
				selectObj.options[i].disabled = true ; 
			} else {
				selectObj.options[i].disabled = false ; 
				if (selIndex == 0) {
					selectObj.options[i].selected = true;
				}
				selIndex ++;
			}
		} else {
			selectObj.options[i].disabled = false ; 
			if (selIndex == 0) {
				selectObj.options[i].selected = true;
			}
			selIndex ++;
		}
	} 
}*/

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

function fncGridCheck() {
	var sheetObj=docObjects[0];
	var returnFlg = true;
	// 체크박스 1건이상 선택유무 체크
	if (sheetObj.CheckedRows("create_flg") != 0) {
		if(sheetObj.RowCount()> 0){
			//ComRowHideDelete(sheetObj,"create_flg");
			returnFlg = true;
		}
    } else {
    	ComShowCodeMessage("COM12114","create file");
    	returnFlg = false;
    }
	return returnFlg;
}