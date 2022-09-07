/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0320.js
*@FileTitle  : Bank Setup
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/10
=========================================================*/
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            sheetObj.DoSearch("MDM_MCM_0320GS.clt", FormQueryString(formObj) );
		break;
		case "MODIFY":
			var modiMsg="Do you want to Save?";//좌측 목록에서 선택후 수정한 경우  			
			if(saveValid(sheetObj)){
				
				// Update : Warning message - MDM_COM_CFMSAVEBNK
		        var msgFlg = false;
		        var ttlRow=sheetObj.LastRow() + 1;
		        for(var i = 1; i < ttlRow; i++){
		        	if(sheetObj.GetCellValue(i,"ibflag") == "U"){
		        		msgFlg = true;
		        		break;
		        	}
		        }
		        // If Updating is true
		        if(msgFlg){
		        	alert(getLabel('MDM_COM_CFMSAVEBNK'));
		        }
		        
				if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
					formObj.f_cmd.value=MODIFY;
					sheetObj.DoSave("MDM_MCM_0320GS.clt", FormQueryString(formObj),"ibflag",false);
				}
			}
		break;

		case "ROWADD":
			var row=sheetObj.LastRow() + 1;
			iRow=sheetObj.DataInsert(row);
			sheetObj.SetCellValue(iRow, "use_flg","1",0);
			
//			#394 [SUNWAY] BANK SET UP ADD CURRENCY VALIDATION
			if(formObj.ofc_curr_cd.value == ""){
				sheetObj.SetCellValue(iRow, "curr_cd",formObj.trf_curr_cd.value,0);
			}else{
				sheetObj.SetCellValue(iRow, "curr_cd",formObj.ofc_curr_cd.value,0);
			}

			//#5030 [SENWA] DEPOSIT ENTRY 화면에서 Check No 메세지 수정 요청
			sheetObj.SetCellEditable(iRow, 'cur_chk_no', 0);
			sheetObj.SetCellEditable(iRow, 'lst_chk_no', 0);
			break;
	}
}

function saveValid(sheetObj){
	var rows=sheetObj.LastRow() + 1;
	var cnt=0;
	for(var i=2 ; i < rows ; i++){
		if(sheetObj.GetCellValue(i, "ibflag") != "R"){
			if(sheetObj.GetCellValue(i, "bank_nm")==""||sheetObj.GetCellValue(i, "gl_cd")==""){
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_GLNO'));
				return false;
			}
			//#394 [SUNWAY] BANK SET UP ADD CURRENCY VALIDATION
			if(sheetObj.GetCellValue(i, "curr_cd")==""){
				alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('CURR'));
				return false;
			}
			if(eval(sheetObj.GetCellValue(i, "cur_chk_no")) > eval(sheetObj.GetCellValue(i, "lst_chk_no")) ){
				alert(getLabel('SUP_COM_ALT006') + /*getLabel('MDM_MCM_0320_MSG1')+*/ "\n\n: MDM_MCM_0320.66");
				return false;
			}
			cnt++;
		}
	}
	if(cnt == 0){
		//alert("No data to save!");
		alert(getLabel('FMS_COM_ALT009'));
		return false;
	}else{
		return true;
	}
}

function sheet1_OnChange(sheetObj, Row, Col, Value) {
	switch(sheetObj.ColSaveName(Col)){
		case "use_flg" :
			if(sheetObj.GetCellValue(Row, Col) == "0" && sheetObj.GetCellValue(Row, "inact_tms") == ""){
				sheetObj.SetCellValue(Row, "inact_tms", getTodayStr("MM-dd-yyyy"), 0);
			}
			if(sheetObj.GetCellValue(Row, Col) == "1"){
				sheetObj.SetCellValue(Row, "inact_tms","",0);
			}
		break;
		case "gl_cd" :
			SELECTROW=Row;
			var gl_cd=sheetObj.GetCellValue(Row, "gl_cd");
			ajaxSendPost(searchGlBankInfo, 'reqVal', '&goWhere=aj&bcKey=searchGlBankInfo&gl_no='+gl_cd+'&block_all_yn=Y', './GateServlet.gsl');
		break;
		case "bank_nm" :
			var isDupl=false;
			SELECTROW=Row;
			var bank_nm=sheetObj.GetCellValue(Row, "bank_nm");
			for (var i=1;i<sheetObj.RowCount();i++) {
				var b_nm=sheetObj.GetCellValue(i, "bank_nm");
				if (Row != i && bank_nm == b_nm) {
					isDupl=true;
					break;
				}
			}
			if(isDupl){
				alert(getLabel('MDM_COM_ALT009'));
				sheetObj.SetCellValue(Row, "bank_nm","",0);
				sheetObj.SelectCell(Row, "bank_nm");
			}
		break;
		case "inact_tms" :
			if(trim(sheetObj.GetCellValue(Row,"inact_tms")) != ""){
				if(sheetObj.GetCellValue(Row,"inact_tms") < "19000101"){
					sheetObj.SetCellValue(Row,"inact_tms","",0);
					// MSG : Year must be greater than 1900.
					alert(getLabel('FMS_COM_ALT041'));
				}
			}
		break;

		case "chk_no_use_flg" :
			//use flag == 'Y' editable
			if(!Value){
				sheetObj.SetCellValue(Row, 'cur_chk_no', "");
				sheetObj.SetCellValue(Row, 'lst_chk_no', "");
			}else{
				sheetObj.SetCellValue(Row, 'cur_chk_no', sheetObj.CellSearchValue(Row, 'cur_chk_no'));
				sheetObj.SetCellValue(Row, 'lst_chk_no', sheetObj.CellSearchValue(Row, 'lst_chk_no'));
			}
			sheetObj.SetCellEditable(Row, 'cur_chk_no', Value);
			sheetObj.SetCellEditable(Row, 'lst_chk_no', Value);
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
            with (sheetObj) {
        	 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
        	 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	 var headers = [ { Text:getLabel('MDM_MCM_0320_HDR_1'), Align:"Center"},
                             { Text:getLabel('MDM_MCM_0320_HDR_2'), Align:"Center"} ];
        	 InitHeaders(headers, info);
        	 var cols = [
              {Type:"Status",    Hidden:1,  Width:40,   Align:"Left",    ColMerge:1,   SaveName:"ibflag" },
              {Type:"Text",      Hidden:1,  Width:40,   Align:"Left",    ColMerge:1,   SaveName:"bank_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Combo",     Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"gl_cd",          KeyField:1},
              {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"bank_nm",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
              {Type:"Combo",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"chk_form",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
              {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"init_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
              {Type:"Combo",     Hidden:0,  Width:75,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              {Type:"CheckBox",  Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk_no_use_flg", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" },
              {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"cur_chk_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:10  },
              {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"lst_chk_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:10  },
              {Type:"Radio",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"rvn_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , TrueValue:"Y" ,FalseValue:"N" },
              {Type:"Radio",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"cost_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , TrueValue:"Y" ,FalseValue:"N" },
              {Type:"Combo",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"bank_ofc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              {Type:"Date",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"inact_tms",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              {Type:"CheckBox",  Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" },
              {Type:"Int",       Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"clr_dt_cell",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
              {Type:"Int",       Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"chk_no_cell",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
              {Type:"Int",       Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"amt_cell",       KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 }
             ];
        	 InitColumns(cols);
        	 SetEditable(1);
        	 SetColProperty("gl_cd", {ComboText:gl_cd, ComboCode:gl_cd} );
        	 SetColProperty("curr_cd", {ComboText:curr_cd, ComboCode:curr_cd} );
        	 SetColProperty("chk_form", {ComboText:check_form_nm, ComboCode:check_form} );
        	 SetColProperty("bank_ofc_cd", {ComboText:'|'+bank_ofc_cd, ComboCode:'|'+bank_ofc_cd});
        	 
        	 //InitViewFormat(0, "inact_tms", "MM-dd-yyyy");
        	 InitComboNoMatchText(1,"",1);
        	 SetSheetHeight(500);
        	 resizeSheet();
          }
           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function searchGlBankInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			sheetObj.SetCellValue(SELECTROW, "bank_nm",rtnArr[3]);
		}else{
			sheetObj.SetCellValue(SELECTROW, "bank_nm","");
		}
	}
}

function sheet1_OnSearchEnd(sheetObj) {
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
		sheetObj.SetCellEditable(i, 'cur_chk_no', sheetObj.GetCellValue(i, 'chk_no_use_flg'));
		sheetObj.SetCellEditable(i, 'lst_chk_no', sheetObj.GetCellValue(i, 'chk_no_use_flg'));
	}
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg==undefined || errMsg==null || errMsg==''){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}else{
		alert(getLabel('FMS_COM_ERR002'));
	}
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="amt_cell"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 1);
	}
}