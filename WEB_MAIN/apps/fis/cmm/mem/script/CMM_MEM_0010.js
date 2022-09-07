/*=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : CMM_MEM_0010.jsp
 *@FileTitle  : COMMON MEMO  
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/12
=========================================================*/
//var rtnary=new Array(1);
//var callBackFunc = "";
var memSheetObject;

function initMemo(sheetObj) {

	with (sheetObj) {
		memSheetObject = sheetObj;
		comConfigSheet(sheetObj, SYSTEM_FIS);
		SetConfig({
			SearchMode : 2,
			MergeSheet : 5,
			Page : 20,
			DataRowMerge : 0
		});
		var info = {
			Sort : 1,
			ColMove : 1,
			HeaderCheck : 1,
			ColResize : 1
		};
		var headers = [ {
			Text : 'doc_ibflag|DEL|CHK|External|palt_doc_seq|Doc. Type|palt_doc_tp_nm|File Name|Reference|Message|File|PDF|Remark|Creation Date|intg_bl_seq',
			Align : "Center"
		} ];
		InitHeaders(headers, info);
		var cols = [ {
			Type : "Status",
			Hidden : 1,
			Width : 40,
			Align : "Center",
			ColMerge : 0,
			SaveName : "doc_ibflag"
		}, {
			Type : "DelCheck",
			Hidden : 0,
			Width : 45,
			Align : "Center",
			ColMerge : 0,
			SaveName : "Del",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 1,
			InsertEdit : 1
		}, {
			Type : "CheckBox",
			Hidden : 0,
			Width : 45,
			Align : "Center",
			ColMerge : 0,
			SaveName : "palt_check",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 1,
			InsertEdit : 1
		}, {
			Type : "Text",
			Hidden : 0,
			Width : 55,
			Align : "Center",
			ColMerge : 0,
			SaveName : "palt_ext_flg",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 0,
			InsertEdit : 0
		}, {
			Type : "Text",
			Hidden : 1,
			Width : 100,
			Align : "Left",
			ColMerge : 0,
			SaveName : "palt_doc_seq",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 0,
			InsertEdit : 0
		}, {
			Type : "Text",
			Hidden : 1,
			Width : 0,
			Align : "Left",
			ColMerge : 0,
			SaveName : "palt_doc_tp_cd",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 0,
			InsertEdit : 0
		}, {
			Type : "Text",
			Hidden : 1,
			Width : 150,
			Align : "Left",
			ColMerge : 0,
			SaveName : "palt_doc_tp_nm",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 0,
			InsertEdit : 0
		}, {
			Type : "Text",
			Hidden : 1,
			Width : 140,
			Align : "Left",
			ColMerge : 0,
			SaveName : "palt_doc_nm",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 0,
			InsertEdit : 0
		}, {
			Type : "Text",
			Hidden : 0,
			Width : 110,
			Align : "Left",
			ColMerge : 0,
			SaveName : "palt_doc_no",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 0,
			InsertEdit : 0
		}, {
			Type : "Text",
			Hidden : 0,
			Width : 300,
			Align : "Left",
			ColMerge : 0,
			SaveName : "palt_doc_msg",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 0,
			InsertEdit : 0
		}, {
			Type : "Text",
			Hidden : 0,
			Width : 50,
			Align : "Center",
			ColMerge : 0,
			SaveName : "palt_doc_img_url",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 0,
			InsertEdit : 0
		}, {
			Type : "Text",
			Hidden : 0,
			Width : 50,
			Align : "Center",
			ColMerge : 0,
			SaveName : "palt_doc_pdf_url",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 0,
			InsertEdit : 0
		}, {
			Type : "Text",
			Hidden : 1,
			Width : 100,
			Align : "Left",
			ColMerge : 0,
			SaveName : "palt_doc_rmk",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 0,
			InsertEdit : 0
		}, {
			Type : "Date",
			Hidden : 0,
			Width : 80,
			Align : "Center",
			ColMerge : 0,
			SaveName : "rgst_tms",
			KeyField : 0,
			CalcLogic : "",
			Format : "Ymd",
			PointCount : 0,
			UpdateEdit : 0,
			InsertEdit : 0
		}, {
			Type : "Text",
			Hidden : 1,
			Width : 0,
			Align : "Center",
			ColMerge : 0,
			SaveName : "intg_bl_seq_d",
			KeyField : 0,
			CalcLogic : "",
			Format : "",
			PointCount : 0,
			UpdateEdit : 0,
			InsertEdit : 0
		} ];
		sheetObj.InitColumns(cols);
		sheetObj.SetEditable(1);
		sheetObj.SetImageList(0, APP_PATH + "/web/img/button/bt_img.gif");
		sheetObj.SetImageList(1, APP_PATH + "/web/img/button/bt_pdf.gif");
		sheetObj.SetDataLinkMouse("palt_doc_nm", 1);
		sheetObj.SetDataLinkMouse("palt_doc_img_url", 1);
		sheetObj.SetDataLinkMouse("palt_doc_pdf_url", 1);
		//sheetObj.InitViewFormat(0, "rgst_tms", "MM\\-dd\\-yyyy");// 날짜 포맷을
		// 월/일/년 으로
		// 설정
		//sheetObj.SetAutoRowHeight(0);
		sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT * 8);
		sheetObj.SetFocusAfterProcess(0);
		// sheetObject.comEndConfigSheet(sheetObj);
	}
	// break;
	// doWorkMemo('SEARCHMEMO', sheetObj);
}

function loadMemo() {
	// for(var i=0;i<docObjects.length;i++){
	// khlee-시작 환경 설정 함수 이름 변경
	//comConfigSheet(docObjects[1], SYSTEM_FIS);
	//initMemo(docObjects[1], 1);
	// khlee-마지막 환경 설정 함수 추가
	//comEndConfigSheet(docObjects[1]);
	// }
	// doWork('SEARCHLIST');
}
/**
 * 
 * @param srcName : doWork case
 * @param intg_bl_seq : 공통 memo seq
 * @param palt_mnu_cd : 공통 memo menu code(default 값 "OEMB")
 */
function doWorkMemo(srcName) {

	if (!btnGetVisible(srcName)) {
		return;
	}
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
	var mformObj = document.frm1;
	var memSheetObj = memSheetObject;
	try {
		switch (srcName) {
		case "SEARCHMEMO":
			
			mformObj.f_cmd.value = SEARCHLIST20;
			//mformObj.f_intg_bl_seq.value = intg_bl_seq;
			//mformObj.f_palt_mnu_cd.value = palt_mnu_cd;
			memSheetObj.DoSearch("CMM_MEM_0010GS.clt",
					FormQueryString(mformObj));
			break;
		case "NEWMEMO":
			if (mformObj.f_palt_mnu_cd.value == "" || mformObj.f_palt_mnu_cd.value == "undefined" || mformObj.f_palt_mnu_cd.value == undefined) {
				alert('Select Sheet Row Please!!');
				break;
			}
//			if (mformObj.f_opr_no.value == "" || mformObj.f_opr_no.value == "undefined" || mformObj.f_opr_no.value == undefined) {
//				alert('Select Sheet Row Please!!');
//				break;
//			}
			var reqParam = '?intg_bl_seq=' + mformObj.f_intg_bl_seq.value;
			reqParam += '&palt_mnu_cd=' + mformObj.f_palt_mnu_cd.value;
			reqParam += '&opr_no=' + mformObj.f_opr_no.value;
			reqParam += '&openMean=SEARCH01';
			popGET('./SEE_BMD_0051.clt' + reqParam, 'seeShipDoc', 806, 450,
					"scroll:no;status:no;help:no;");
			break;
		case "DELMEMO":
			mformObj.f_cmd.value = COMMAND03;
			memSheetObj.DoAllSave("CMM_MEM_0010GS.clt",FormQueryString(mformObj), false);
			break;
		case "S_DOC":
			if (memSheetObj.GetTotalRows() > 0) {
				mformObj.file_name.value = 'doc_list.mrd';
				mformObj.title.value = 'Document List';
				// Parameter Setting
				var param = '[' + mformObj.f_intg_bl_seq.value + ']'; // [1]
				param += '[' + mformObj.f_palt_mnu_cd.value + ']'; // [2] MASTER/HOUSE/OTH 여부
				param += '[' + mformObj.f_opr_no.value + ']'; // [3]
				// MBL_NO
				param += '[' + mformObj.user_id.value + ']'; // [4]
				mformObj.rd_param.value = param;
				mformObj.mailTitle.value = searchMailTitle(mformObj.f_palt_mnu_cd.value)
						+ mformObj.f_opr_no.value + ']';
				mformObj.mailTo.value = '';
				popPOST(mformObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}
			break;
			
		case "CLOSE":
       		window.close()
       		break;
		} // end switch
	} catch (e) {
		if (e == "[object Error]") {
			// Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			// System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e);
		}
	}
}
function msheet_OnSaveEnd(sheetObj, row, col) {
	doWorkMemo("SEARCHMEMO");
}

/*function searchMemo(palt_mnu_cd, intg_bl_seq, opr_no) {
	var mformObj = document.mfrm;
	mformObj.f_intg_bl_seq.value = intg_bl_seq;
	mformObj.f_palt_mnu_cd.value = palt_mnu_cd;
	mformObj.f_opr_no.value = opr_no;
	doWorkMemo("SEARCHMEMO");
}*/

function setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no) {	
	var mformObj = document.frm1;
	mformObj.f_intg_bl_seq.value = intg_bl_seq;
	mformObj.f_palt_mnu_cd.value = palt_mnu_cd;
	mformObj.f_opr_no.value = opr_no;
}

function searchMailTitle(palt_mnu_cd){
	var rtn = "";
	var mformObj = document.frm1;
	
	if(palt_mnu_cd=="INV"){
		rtn = "AR/AP [Invoice No : ";
	}else if(palt_mnu_cd=="PMT"){
		rtn = "Payment [Check No : ";
	}else if(palt_mnu_cd=="DPS"){
		rtn = "Deposit [Check No : ";
	}else if(palt_mnu_cd=="TRP"){
		rtn = "Trade Partner [Code : ";
	}else if(palt_mnu_cd=="OTH"){
		rtn = "MISC. Operation [Ref No : ";
	}else{
		rtn = "None Title [ No : ";
	}
	
	return rtn;
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function msheet_OnDblClick(sheetObj, Row, Col) {
	// Name선택 시에만 팝업 호출
	if (sheetObj.ColSaveName(Col) == 'palt_doc_no'
			|| sheetObj.ColSaveName(Col) == 'palt_doc_msg') {
		var mformObj = document.frm1;
		var reqParam = '?intg_bl_seq=' + mformObj.f_intg_bl_seq.value;
		reqParam += '&s_palt_doc_seq='
				+ sheetObj.GetCellValue(Row, "palt_doc_seq");
		reqParam += '&openMean=' + SEARCH02;
		popGET('./SEE_BMD_0051.clt' + reqParam, 'seeShipDocUp', 806, 450,
				"scroll:no;status:no;help:no;");
	}
}

function msheet_OnMouseMove(sheetObj, row, col) {
	if (sheetObj.MouseCol() == 9) {
		sheetObj.ToolTipOption = "balloon:true;width:320;backcolor:#FFFFE0;forecolor:#000000;icon:0;title:Message";
		var memo = sheetObj.GetCellValue(sheetObj.MouseRow(), "palt_doc_msg");
		memo = memo.replaceAll("@^^@", "\n");
		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(), memo);
	}
}


/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * msheet_OnClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet
 * Oeject, Row, Column)
 */
function msheet_OnClick(sheetObj, Row, Col) {
	var downType;
	var s_palt_doc_seq;
	var intg_bl_seq;
	switch (sheetObj.ColSaveName(Col)) {
	case "palt_doc_img_url":
		if (sheetObj.GetCellImage(Row, "palt_doc_img_url") != "") {
			s_palt_doc_seq = sheetObj.GetCellValue(Row, "palt_doc_seq");
			/*#6314 [BINEX-LA] HBL#:AYU0315077 DOCUMENT LIST 에 있는 파일 클릭 시 다운 문제*/
			intg_bl_seq  = sheetObj.GetCellValue(Row, "intg_bl_seq_d");
			downloadFile('org', s_palt_doc_seq, intg_bl_seq);
			/*---------------------------------------------------------------------*/
		}
		break;
	case "palt_doc_pdf_url":
		if (sheetObj.GetCellImage(Row, "palt_doc_pdf_url") != "") {
			s_palt_doc_seq = sheetObj.GetCellValue(Row, "palt_doc_seq");
			/*#6314 [BINEX-LA] HBL#:AYU0315077 DOCUMENT LIST 에 있는 파일 클릭 시 다운 문제*/
			intg_bl_seq  = sheetObj.GetCellValue(Row, "intg_bl_seq_d");
			downloadFile('pdf', s_palt_doc_seq, intg_bl_seq);
			/*---------------------------------------------------------------------*/
		}
		break;
	case "palt_doc_msg":
		// frm1.memo_txt.value = sheetObj.CellValue(Row, Col);
		break;
	} // end switch
}


/*#6314 [BINEX-LA] HBL#:AYU0315077 DOCUMENT LIST 에 있는 파일 클릭 시 다운 문제*/
function downloadFile(downType, s_palt_doc_seq, intg_bl_seq) {
	var tempForm = document.createElement("form");
	tempForm.setAttribute("method", "post");
	tempForm.setAttribute("action", "./GateServlet.gsl");
	/*#6314 [BINEX-LA] HBL#:AYU0315077 DOCUMENT LIST 에 있는 파일 클릭 시 다운 문제*/
	var params = {'goWhere':'fd','bcKey':'blFileDown','docType':downType,'s_palt_doc_seq':s_palt_doc_seq, 'intg_bl_seq':intg_bl_seq};
	/*---------------------------------------------------------------------*/
	for(var key in params) {
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", key);
		hiddenField.setAttribute("value", params[key]);
		tempForm.appendChild(hiddenField);
	}
	document.body.appendChild(tempForm);
	tempForm.submit();
	document.body.removeChild(tempForm);
}

function memCallback(reqVal) {
}

function msheet_OnSaveEnd(sheetObj, row, col) {
	doWork("SEARCHLIST03");
	//#6486 [Zencon] Upload email  (Zen#2608)
	doWork("SEARCHLIST");
}
function msheet_OnSearchEnd(sheetObj, row, col) {
	var formObj = document.frm1;
	/*
	 * if(docObjects[2].GetTotalRows()>0){
	 * formObj.memo_txt.value=docObjects[2].GetCellValue(1, "palt_doc_msg"); }
	 */
}
function doDispDocList(){
	 opener.reloadDocList();
	 this.focus();
	 doWork('CLOSE');
}
function reloadDocList(){
	sheet1_OnClick(docObjects[0], docObjects[0].GetSelectRow(), -2);
	//#6486 [Zencon] Upload email  (Zen#2608)
	doWork("SEARCHLIST");
}
