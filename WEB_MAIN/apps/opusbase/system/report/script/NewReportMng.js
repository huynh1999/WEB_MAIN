//=========================================================
//*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
//=========================================================
//
//=========================================================
//*@FileName   : NewReportMng.jsp
//*@FileTitle  : New report Manage
//*@Description: New report Manage
//*@author: Duc.Nguyen
//*@version    : 1.0 - 2017-12-04
//*@since      : 2017-12-04
//=========================================================
var show_complete = "N";
function doWork(srcName) {
	if (!btnGetVisible(srcName)) { // 버튼의 단축키 사용가능여부 체크
		return;
	}
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj = docObjects[0];
	var formObj = document.frm1;
	try {
		switch (srcName) {

		case "SEARCHLIST":
			formObj.f_cmd.value = SEARCHLIST;
			sheetObj.DoSearch("NewReportMngGS.clt", FormQueryString(formObj) );
			break;
		case "SAVE":
			formObj.f_cmd.value = MODIFY;
            if(checkData(sheetObj)){
                //전체 CellRow의 갯수
            	//Do you want to proceed?
                if(confirm(getLabel('FMS_COM_CFMSAV'))){
                    doProcess=true;
                    show_complete = "Y";
                    sheetObj.DoSave("NewReportMngGS.clt", FormQueryString(formObj),"ibflag",false);
                }
            }			
			break;
		case "ROWADD":
			var intRows = sheetObj.LastRow() + 1;
			sheetObj.DataInsert(intRows);
			break;
		case "UPLOAD":
			btn_upload();
			break
		case "CLOSE":
			// Close without any value
   	    	ComClosePopup();
   	    break;
		case "APPLY":
			// Close and get value
			var rtnArr = "";
			// Get value of selected Row
			var rowIdx =  sheetObj.GetSelectRow();
			if(rowIdx == -1){
				ComShowCodeMessage("COM0228");
				return;
			}
			rtnArr += sheetObj.GetCellValue(rowIdx, "rpt_id");
			rtnArr += "|";
			rtnArr += sheetObj.GetCellValue(rowIdx, "rpt_nm");
			rtnArr += "|";
			rtnArr += sheetObj.GetCellValue(rowIdx, "mrd_nm");
			rtnArr += "|";
			rtnArr += sheetObj.GetCellValue(rowIdx, "mrd_path_cd");
			rtnArr += "|";
			rtnArr += sheetObj.GetCellText(rowIdx, "mrd_path_cd");
			rtnArr += "|";
			rtnArr += sheetObj.GetCellValue(rowIdx, "ppr_cd");
			rtnArr += "|";
			rtnArr += sheetObj.GetCellText(rowIdx, "ppr_cd");
			rtnArr += "|";
			rtnArr += sheetObj.GetCellValue(rowIdx, "rmk");
   	    	ComClosePopup(rtnArr);
   	    break;
		} // end switch
	} catch (e) {
		if (e == "[object Error]") {
			// Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			// System Error! + MSG
			alert(getLabel('FMS_COM_ERR001'));
		}
	}
}

// --------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
function loadPage() {
	for ( var i = 0; i < docObjects.length; i++) {
		// khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i], i + 1);
		// khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
}
/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++] = sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj, sheetNo) {
	switch (sheetNo) {
	case 1: // IBSheet1 init
       with (sheetObj) {
       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, FrozenCol:0 } );

       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
       var headers = [ { Text:getLabel('NWRPTMNG_HDR'), Align:"Center"} ];
       InitHeaders(headers, info);
       if(document.frm1.pop_yn.value == 'Y'){
    	   var cols = [ {Type:"DelCheck", 	Hidden:1, Width:50, 	Align:"Center", ColMerge:0, SaveName:"del_chk" },   
    					{Type:"Seq", 		Hidden:0, Width:50, 	Align:"Center", ColMerge:0, SaveName:"" },
                        {Type:"Status", 	Hidden:1, Width:0, 		Align:"Center", ColMerge:0, SaveName:"ibflag" },                    
                        {Type:"Combo", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"mdl_id", 		KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                        {Type:"Text", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"rpt_id", 		KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0,   EditLen:50 },
                        {Type:"Text", 		Hidden:0, Width:150, 	Align:"Left", 	ColMerge:0, SaveName:"rpt_nm", 		KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0,   EditLen:50 },
                        {Type:"Text", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"call_id", 	KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0,   EditLen:50 },
                        {Type:"Text", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"purp_desc", 	KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0,   EditLen:50 },
                        {Type:"Text", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"mrd_nm", 		KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0,   EditLen:50 },
                        {Type:"Combo", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"mrd_path_cd", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                        {Type:"Combo", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"ppr_cd", 		KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                        {Type:"Combo", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"lang_cd", 	KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                        {Type:"CheckBox", 	Hidden:0, Width:80, 	Align:"Left", 	ColMerge:0, SaveName:"chk_flg", 	KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0, TrueValue:"Y" ,FalseValue:"N" },
                        {Type:"CheckBox", 	Hidden:0, Width:130, 	Align:"Left", 	ColMerge:0, SaveName:"priv_flg", 	KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0, TrueValue:"Y" ,FalseValue:"N" },
                        {Type:"Text", 		Hidden:0, Width:200, 	Align:"Left", 	ColMerge:0, SaveName:"rmk", 		KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0,   EditLen:50 },
                        {Type:"Text", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"qry_ctnt", 	KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },                    
                        {Type:"Image", 		Hidden:0, Width:150, 	Align:"Center", ColMerge:0, SaveName:"pdf_btn", 	KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },                    
                        {Type:"Text", 		Hidden:1, Width:150, 	Align:"Left", 	ColMerge:0, SaveName:"delt_rsn_rmk",KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0,   EditLen:50 },   
                        {Type:"Text", 		Hidden:1, Width:150, 	Align:"Center", ColMerge:0, SaveName:"pdf_nm", 		KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                        {Type:"Text", 		Hidden:1, Width:0, 		Align:"Left", 	ColMerge:0, SaveName:"pdf_path", 	KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 }
    	              ];
       }else{
    	// Hidden:0 ->화면에 보이는것 , Hidden:1 -> 화면에 안보이는것 
           var cols = [ {Type:"DelCheck", 	Hidden:0, Width:50, 	Align:"Center", ColMerge:0, SaveName:"del_chk" },   
    					{Type:"Seq", 		Hidden:0, Width:50, 	Align:"Center", ColMerge:0, SaveName:"" },
                        {Type:"Status", 	Hidden:1, Width:0, 		Align:"Center", ColMerge:0, SaveName:"ibflag" },                    
                        {Type:"Combo", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"mdl_id", 		KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1 },
                        {Type:"Text", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"rpt_id", 		KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:1,   EditLen:50 },
                        {Type:"Text", 		Hidden:0, Width:150, 	Align:"Left", 	ColMerge:0, SaveName:"rpt_nm", 		KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:50 },
                        {Type:"Text", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"call_id", 	KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:1,   EditLen:50 },
                        {Type:"Text", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"purp_desc", 	KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:50 },
                        {Type:"Text", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"mrd_nm", 		KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:50 },
                        {Type:"Combo", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"mrd_path_cd", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1 },
                        {Type:"Combo", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"ppr_cd", 		KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1 },
                        {Type:"Combo", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"lang_cd", 	KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1 },
                        {Type:"CheckBox", 	Hidden:0, Width:80, 	Align:"Left", 	ColMerge:0, SaveName:"chk_flg", 	KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" },
                        {Type:"CheckBox", 	Hidden:0, Width:130, 	Align:"Left", 	ColMerge:0, SaveName:"priv_flg", 	KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" },
                        {Type:"Text", 		Hidden:0, Width:200, 	Align:"Left", 	ColMerge:0, SaveName:"rmk", 		KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:50 },
                        {Type:"Text", 		Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"qry_ctnt", 	KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },                    
                        {Type:"Image", 		Hidden:0, Width:150, 	Align:"Center", ColMerge:0, SaveName:"pdf_btn", 	KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },                    
                        {Type:"Text", 		Hidden:0, Width:150, 	Align:"Left", 	ColMerge:0, SaveName:"delt_rsn_rmk",KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:50 },   
                        {Type:"Text", 		Hidden:1, Width:150, 	Align:"Center", ColMerge:0, SaveName:"pdf_nm", 		KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 },
                        {Type:"Text", 		Hidden:1, Width:0, 		Align:"Left", 	ColMerge:0, SaveName:"pdf_path", 	KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0 }
    	              ];
       }
       
           InitColumns(cols);
           var height = $(window).height();
           SetEditable(1);
           SetSheetHeight(height - 150);
           if(document.frm1.pop_yn.value == 'Y'){
        	   SetSheetHeight(300);
           }
           SetImageList(1, APP_PATH + "/web/img/button/bt_pdf.gif");
           //SetImageList(2, "web/img/main/btn_s_add.gif");
           SetColProperty('mdl_id', {ComboText:MDLCD1, ComboCode:MDLCD2} );
           SetColProperty('mrd_path_cd', {ComboText:MRDCD1, ComboCode:MRDCD2} );
           SetColProperty('ppr_cd', {ComboText:PPRCD1, ComboCode:PPRCD2} );
           SetColProperty('lang_cd', {ComboText:LANGCD1, ComboCode:LANGCD2} );
           SetColProperty('rpt_id', {InputCaseSensitive:1} );
           SetColProperty('call_id', {InputCaseSensitive:1} );
       }                                                  
       break;
	}
}
/**
 * IBSheet 이벤트 처리후 이벤트를 받아서 처리하기 위한 메소드임
 */
var dupValue = "NO";
function checkData(sheetObj){	
	// Check data input
	var insertUpdateRow_List = new Array();
	insertUpdateRow_List = sheetObj.FindStatusRow("I|U").split(";");
	for (var i = 0; i <= insertUpdateRow_List.length ; i++){
		if(sheetObj.GetCellValue(insertUpdateRow_List[i], "ibflag") == "I"){
			if(sheetObj.GetCellValue(insertUpdateRow_List[i], "mdl_id") == ""  
				|| sheetObj.GetCellValue(insertUpdateRow_List[i], "rpt_id") == ""
				|| sheetObj.GetCellValue(insertUpdateRow_List[i], "rpt_nm") == ""
				|| sheetObj.GetCellValue(insertUpdateRow_List[i], "call_id") == ""
				|| sheetObj.GetCellValue(insertUpdateRow_List[i], "purp_desc") == ""
				|| sheetObj.GetCellValue(insertUpdateRow_List[i], "mrd_nm") == ""
				|| sheetObj.GetCellValue(insertUpdateRow_List[i], "mrd_path_cd") == ""
				|| sheetObj.GetCellValue(insertUpdateRow_List[i], "ppr_cd") == ""
				|| sheetObj.GetCellValue(insertUpdateRow_List[i], "lang_cd") == ""
			){
				ComShowMessage(getLabel("FMS_COM_ALT001"));
				sheetObj.SetSelectRow(insertUpdateRow_List[i]);
				return false;
			}
		}
	}
	//Check duplicate data on grid
	var dupRow=sheetObj.ColValueDup("rpt_id");
	if(dupRow >0){
		alert(getLabel('MDM_COM_ALT009') + " \n - " + getLabel('FMS_COD_RPTID'));
		return false;
	}
	dupRow=sheetObj.ColValueDup("mrd_nm");
	if(dupRow >0){
		alert(getLabel('MDM_COM_ALT009') + " \n - " + getLabel('FMS_COD_MRDNM'));
		return false;
	}
	// Check duplicate data on DB -  If during user is updating data but there is another saving transaction before then system will notify
	if (insertUpdateRow_List.length > 0){
		for(var i = 0; i < insertUpdateRow_List.length; i++){
			var rptId = sheetObj.GetCellValue(insertUpdateRow_List[i], "rpt_id");
			var mrdNm = sheetObj.GetCellValue(insertUpdateRow_List[i], "mrd_nm");
			dupValue = "NO";
			//Check duplicate report id
			if(sheetObj.GetCellValue(insertUpdateRow_List[i], "ibflag") == 'I'){
				ajaxSendPost(getDuplicateCheck, 'reqVal', '&goWhere=aj&bcKey=searchNewReportId&s_rpt_id='+rptId, './GateServlet.gsl');
				if(dupValue == 'DP'){
					alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_RPTID') + ": " + rptId);
					sheetObj.SetSelectRow(insertUpdateRow_List[i]);
					return false;
				}
			}		
			//Check duplicate mrd name
			ajaxSendPost(getDuplicateCheck, 'reqVal', '&goWhere=aj&bcKey=searchNewReportMrdNm&s_mrd_nm='+mrdNm + '&s_rpt_id='+ rptId, './GateServlet.gsl');
			if(dupValue == 'DP'){
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_MRDNM') + ": " + mrdNm);
				sheetObj.SetSelectRow(insertUpdateRow_List[i]);
				return false;
			}			
		}
	}
	return true;	
}

function getDuplicateCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			dupValue = 'DP';
		}
	}
}

function checkDelete(sheetObj){	
	var intRow=sheetObj.LastRow() + 1;
	var iChkCnt=sheetObj.CheckedRows("del_chk");
	if(iChkCnt == 0) 
	{
		ComShowCodeMessage("COM0228");
		return;
	}
	var arrDel = new Array();
	arrDel = sheet1.FindStatusRow("D").split(";");
	for ( var i=0 ; i < arrDel.length ; i++ ) {
		if (sheetObj.GetCellValue(arrDel[i], "delt_rsn_rmk")  == "" || sheetObj.GetCellValue(arrDel[i], "delt_rsn_rmk") == null ) {
			//Please enter a [Reason for Deleting]!
			alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_DELTRSN'));
			return false;
		}
	}
	return true;	
}

function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
}

function sheet1_OnSearchEnd(sheetObj, errMsg){
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "pdf_nm") != "") {
			sheetObj.SetCellImage(i, "pdf_btn", 1);
			sheetObj.SetCellValue(i, "ibflag", "R");
		}
		
	}
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "pdf_nm") != "") {
			sheetObj.SetCellImage(i, "pdf_btn", 1);
			sheetObj.SetCellValue(i, "ibflag", "R");
		}
	}
	if(errMsg == "" || errMsg == undefined || errMsg == null){		
		showCompleteProcess();
	}
}

function sheet1_OnClick(sheetObj, Row, Col) {
	switch (sheetObj.ColSaveName(Col)) {
	case "pdf_btn":
		if (sheetObj.GetCellImage(Row, "pdf_btn") != ""){
			if (sheetObj.GetCellValue(Row, "pdf_nm") != "") {
				var pdf_nm = sheetObj.GetCellValue(Row, "pdf_nm");
				var pdf_path = sheetObj.GetCellValue(Row, "pdf_path");
				downloadFile(pdf_nm, pdf_path);
			}
		}		
		break;
	case "qry_ctnt":
		rtnary = new Array(1);
		rtnary[0] = sheetObj.GetCellValue(Row, "qry_ctnt");
		callBackFunc = "qry_ctnt_rs";
		modal_center_open('./NewReportMngQuery.clt', rtnary, 700,400,"yes");	
		break;
	} // end switch
}

function sheet1_OnDblClick(sheetObj, Row, Col) {
	if(document.frm1.pop_yn.value == 'Y'){
		doWork('APPLY');
	}
}

function downloadFile(pdf_nm, pdf_path){
	document.frm2.pdf_nm.value=pdf_nm;
	document.frm2.pdf_path.value=pdf_path;
	document.frm2.submit();
}

function qry_ctnt_rs(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var sheetObj=docObjects[0];
		var intRow=sheetObj.GetSelectRow();
		sheetObj.SetCellValue(intRow, "qry_ctnt",rtnVal);
	}
}

function pdf_nm_rs(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		doWork('SEARCHLIST');
	}
}

function btn_upload(){
	var formObj = document.frm1;
	var sheetObj=docObjects[0];
	var intRow=sheetObj.GetSelectRow();
	insertUpdateRow_List = sheetObj.FindStatusRow("I|U");
	if (intRow < 0) {
		ComShowCodeMessage("COM0228");
		return;
	} else if(insertUpdateRow_List != ""){
		alert(getLabel('MDM_COM_ALT013'));
		return;
	}
	else {
		rtnary = new Array(1);
		rtnary[0] = sheetObj.GetCellValue(intRow, "rpt_id"); //rpt_id
		rtnary[1] = sheetObj.GetCellText(intRow, "mrd_path_cd"); //mrd_path
		callBackFunc = "pdf_nm_rs";
		modal_center_open('./NewReportMngUpload.clt', rtnary, 500,200,"yes");
	}
}

