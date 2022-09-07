/*--=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : WHInPackDefPopup.js
 *@FileTitle  : Pack Unit definition Popup
 *@author     : TanPham - DOU Network
 *@version    : 1.0
 *@since      : 2015/04/22
 =========================================================--*/

var docObjects=new Array();
var sheetCnt=0;

var rtnary = new Array(1);
var callBackFunc = "";

var WMS_QTY_FORMAT  = "Integer";  //QTY  InitDataProperty에서 사용
var WMS_QTY_FORMAT2 = "Integer";//QTY  InitDataProperty2에서 사용
var WMS_QTY_POINT = 0;            //QTY
var WMS_CBM_POINT = 3;            //CBM, GWT, NWT
var WMS_KGS_POINT = 3;            //KGS, GWT, NWT
var MST_CBM_POINT = 3;            //CBM, CBF
var MST_KGS_POINT = 3;            //KGS, GWT, NWT

var opener = opener;
if (!opener) opener=window.opener;
if (!opener) opener = parent;

function doWork(srcName){
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "SAVE":
			btn_Save();
			break;
		case "CLOSE":
			btn_Close();
			break;
		} // end switch
	} catch(e) {
		if(e == "[object Error]"){
			//Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			//System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e);
		}
	}
}

/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
	}

var rowTotal , colTotal;

function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	// Pack Unit Define 대상
	if (formObj.ctrt_no.value != "") {
		sheet1.RemoveAll();
		setSelectPackDefine();
	}
}

function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
			with(sheetObj){

				var prefix="Grd03";

				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('WHInPackDefPopup_HDR1'), Align:"Center"},
				                { Text:getLabel('WHInPackDefPopup_HDR2'), Align:"Center"} ];
				InitHeaders(headers, info);

				var cols = [
				            {Type:"Status",    Hidden:1,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
				            {Type:"PopupEdit", Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pkg_lv1_unit_cd", KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
				            {Type:"Text",      Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv1_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
				            {Type:"PopupEdit", Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"item_pkgunit",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
				            {Type:"Text",      Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_pkgbaseqty", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				            {Type:"PopupEdit", Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pkg_lv3_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
				            {Type:"Text",      Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv3_qty",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				            {Type:"PopupEdit", Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pkg_lv4_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
				            {Type:"Text",      Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv4_qty",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				            {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbm",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				            {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbf",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				            {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_kgs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				            {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_lbs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				            {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_kgs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				            {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_lbs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:MST_CBM_POINT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				            {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:1,  Width:50,   Align:"Left",    ColMerge:0,   SaveName:prefix+"item_sys_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
				];

				InitColumns(cols);
				SetSheetHeight(380);
				SetEditable(1);
//				SetColProperty(0 ,prefix+"item_cd" , {AcceptKeys:"E|[0123456789][()_-+.&/@#!%^*$~` ]" , InputCaseSensitive:1});
				SetColProperty(0 ,prefix+"item_cd" , {AcceptKeys:"E|[0123456789]" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
				SetColProperty(0 ,prefix+"item_nm" , {AcceptKeys:"E|[0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\]" , InputCaseSensitive:1});
				SetColProperty(0 ,prefix+"pkg_lv1_unit_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
				SetColProperty(0 ,prefix+"item_pkgunit" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
				SetColProperty(0 ,prefix+"pkg_lv3_unit_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
				SetColProperty(0 ,prefix+"pkg_lv4_unit_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
				SetColProperty(0 ,prefix+"pkg_lv1_qty" , {AcceptKeys:"[0123456789]" , InputCaseSensitive:1});
				SetColProperty(0 ,prefix+"pkg_lv3_qty" , {AcceptKeys:"[0123456789]" , InputCaseSensitive:1});
				SetColProperty(0 ,prefix+"pkg_lv4_qty" , {AcceptKeys:"[0123456789]" , InputCaseSensitive:1});
				SetColProperty(0 ,prefix+"item_pkgbaseqty" , {AcceptKeys:"[0123456789]" , InputCaseSensitive:1});
				
				//OFVFOUR-7314 [HANARO AUSTIN] DB Lock Issue
				var arg = parent.rtnary;
				if ( arg[1] == "hide_lv4" ){
					SetColProperty(0 ,prefix+"pkg_lv3_unit_cd" , {AcceptKeys:"E|[0123456789-]" , InputCaseSensitive:1, EditLen: 7});
					SetColHidden(prefix+"pkg_lv4_unit_cd" ,true);
					SetColHidden(prefix+"pkg_lv4_qty" ,true);
				}
			}
			break;
	}
}

/**
 * Pack Unit Define 대상
 */
function setSelectPackDefine() {
	var formObj=document.form;
	//var openerformObj=parent.window.document.form;
	var insertRow="";
	var openerprefix="Grd02";
	var prefix="Grd03";
	//OFVFOUR-7314 [HANARO AUSTIN] DB Lock Issue
	var openerSheetObj=opener.docObjects[0];
	var sheetObj=docObjects[0];
	var chkDupCnt=0;

	// W/H In Booking 화면에서 Unit Code를 미입력한 데이터 중 중복 제거한 Item Code List만 Popup 대상
	for (var i=openerSheetObj.HeaderRows(); i<=openerSheetObj.LastRow(); i++) {
		chkDupCnt=0;
		for (var j=sheetObj.HeaderRows(); j<=sheetObj.LastRow(); j++) {
			if (openerSheetObj.GetCellValue(i, openerprefix + "item_cd") == sheetObj.GetCellValue(j, prefix + "item_cd")) {
				if (openerSheetObj.GetCellValue(i, openerprefix + "item_sys_no") == sheetObj.GetCellValue(j, prefix + "item_sys_no")) {
					chkDupCnt++;
				}
			}
		}

		if (chkDupCnt == 0) {

			if (ComIsNull(openerSheetObj.GetCellValue(i, openerprefix+"item_sys_no")) || ComIsNull(openerSheetObj.GetCellValue(i, openerprefix+"item_pkgunit"))) {
				//OFVFOUR-7314 [HANARO AUSTIN] DB Lock Issue
				if ( !ComIsNull(openerSheetObj.GetCellValue(i, openerprefix+"item_cd")) ) {
					insertRow=sheetObj.DataInsert(-1);

					rowTotal = insertRow;

					sheetObj.SetCellValue(insertRow, prefix+"item_cd",openerSheetObj.GetCellValue(i, openerprefix+"item_cd"),0);
					sheetObj.SetCellValue(insertRow, prefix+"item_nm",openerSheetObj.GetCellValue(i, openerprefix+"item_nm"),0);
					sheetObj.SetCellValue(insertRow, prefix+"ctrt_no",ComGetObjValue(formObj.ctrt_no),0);
					sheetObj.SetCellValue(insertRow, prefix+"pkg_lv1_qty",1,0);// 패키지 Level1 수량
					/*
					if (!ComIsNull(openerSheetObj.GetCellValue(i, openerprefix+"item_sys_no"))) {
						sheetObj.SetCellValue(insertRow, prefix+"item_nm",openerSheetObj.GetCellValue(i, openerprefix+"item_nm"),0);
						sheetObj.SetCellValue(insertRow, prefix+"ctrt_no",ComGetObjValue(formObj.ctrt_no),0);
						sheetObj.SetCellValue(insertRow, prefix+"item_sys_no",openerSheetObj.GetCellValue(i, openerprefix+"item_sys_no"),0);
					}
					*/
					setPackDefineInfo(sheetObj, insertRow, "", openerSheetObj.GetCellValue(i, openerprefix+"item_sys_no"));
				}
			}
		}
	}
}

/**
 * Booking Item 팝업 클릭시
 * @param sheetObj
 * @param Row
 * @param Col
 */
function sheet1_OnPopupClick(sheetObj, Row, Col) {
	var formObj=document.form;
	var prefix="Grd03";
	var colName=sheetObj.ColSaveName(Col);
	var colValue=sheetObj.GetCellValue(Row, Col) ;
	var cal=new ComCalendarGrid();
	with(sheetObj)
	{
		if (colName == (prefix+"pkg_lv1_unit_cd") ) {

			callBackFunc = "setPkgLv1unitGrid";
		    modal_center_open('./CommonCodePopup.clt?grp_cd=A6&code=' + colValue, callBackFunc, 400, 520,"yes");

		} else if (colName == (prefix+"item_pkgunit") ) {

			callBackFunc = "setPkgunitGrid";
		    modal_center_open('./CommonCodePopup.clt?grp_cd=A6&code=' + colValue, callBackFunc, 400, 520,"yes");

		} else if (colName == (prefix+"pkg_lv3_unit_cd") ) {

			callBackFunc = "setPkgLv3unitGrid";
		    modal_center_open('./CommonCodePopup.clt?grp_cd=A6&code=' + colValue, callBackFunc, 400, 520,"yes");

		} else if (colName == (prefix+"pkg_lv4_unit_cd") ) {

			callBackFunc = "setPkgLv4unitGrid";
		    modal_center_open('./CommonCodePopup.clt?grp_cd=A6&code=' + colValue, callBackFunc, 400, 520,"yes");

		}
	}
}

/**
 * 패키지 Level1 Unit Code
 * @param aryPopupData
 */
function setPkgLv1unitGrid(rtnVal) {

	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		var prefix="Grd03";
		sheet1.SetCellValue(sheet1.GetSelectRow(), prefix+"pkg_lv1_unit_cd",rtnValAry[1]);
	}
}

/**
 * 패키지 Level2 Unit Code
 * @param aryPopupData
 */
function setPkgunitGrid(rtnVal) {

	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		var prefix="Grd03";
		sheet1.SetCellValue(sheet1.GetSelectRow(), prefix+"item_pkgunit",rtnValAry[1]);
	}
}
/**
 * 패키지 Level3 Unit Code
 * @param aryPopupData
 */
function setPkgLv3unitGrid(rtnVal) {

	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		var prefix="Grd03";
		sheet1.SetCellValue(sheet1.GetSelectRow(), prefix+"pkg_lv3_unit_cd",rtnValAry[1]);
	}
}
/**
 * 패키지 Level4 Unit Code
 * @param aryPopupData
 */
function setPkgLv4unitGrid(rtnVal) {

	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		var prefix="Grd03";
		sheet1.SetCellValue(sheet1.GetSelectRow(), prefix+"pkg_lv4_unit_cd",rtnValAry[1]);
	}
}

var RowTest , ColTest;

function setIbCommonCodeInfo(reqVal, sheetObj){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheetObj.SetCellValue(sheetObj.GetSelectRow(),  ColTest, rtnArr[0],0);
		}
		else{
			sheetObj.SetCellValue(sheetObj.GetSelectRow(),  ColTest, "",0);
		}
	}
}

function sheet1_OnChange(sheetObj, Row, Col, Value) {
	var formObj=document.form;
	var prefix="Grd03";
	var colName=sheetObj.ColSaveName(Col);

	RowTest = Row;
	ColTest = Col;

	if (colName == (prefix+"pkg_lv1_unit_cd") && Value != "") {
		ajaxSendPost(setIbCommonCodeInfo, sheetObj , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+ Value, './GateServlet.gsl');

	} else if (colName == (prefix+"item_pkgunit") && Value != "") {
		var sParam="grp_cd=A6&code_cd="+Value;
		ajaxSendPost(setIbCommonCodeInfo, sheetObj , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+Value, './GateServlet.gsl');


	} else if (colName == (prefix+"pkg_lv3_unit_cd") && Value != "") {
		var sParam="grp_cd=A6&code_cd="+Value;
		//OFVFOUR-7314 [HANARO AUSTIN] DB Lock Issue
		ajaxSendPost(setIbCommonCodeInfo, sheetObj , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&code_type=lic_plat&c_code='+Value, './GateServlet.gsl');

	} else if (colName == (prefix+"pkg_lv4_unit_cd") && Value != "") {
		var sParam="grp_cd=A6&code_cd="+Value;
		ajaxSendPost(setIbCommonCodeInfo, sheetObj , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+Value, './GateServlet.gsl');
	}
}
/**
 * Item Master 기본 정보 조회
 * @param sheetObj
 * @param Row
 * @param Col rowTotal
 */
function setPackDefineInfo(sheetObj, Row, Col, item_sys_no) {
	var formObj=document.form;
	var prefix="Grd03";
	var Value="&item_cd=" + encodeURIComponent(sheetObj.GetCellValue(Row, prefix + "item_cd").trim());
	if(item_sys_no.trim() != "")
	{
		Value += "&item_sys_no=" + item_sys_no;
	}else{
		Value += "&item_sys_no=";
	}
	var sParam="ctrt_no=" + formObj.ctrt_no.value + Value;

	ajaxSendPost(searchWHItemCodeInfo, 'reqVal' , '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');

}

function searchWHItemCodeInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		var prefix="Grd03";
		var Row = rowTotal;

		sheetObj = sheet1;

		if(rtnArr[0] != "")
		{
			sheetObj.SetCellValue(Row, prefix+"item_sys_no",rtnArr[0]);
			sheetObj.SetCellValue(Row, prefix+"ctrt_no",rtnArr[1]);
			sheetObj.SetCellValue(Row, prefix+"item_cd",rtnArr[2]);
			sheetObj.SetCellValue(Row, prefix+"item_nm",rtnArr[3]);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",rtnArr[4]);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",rtnArr[5]);
			sheetObj.SetCellValue(Row, prefix+"item_pkgunit",rtnArr[6]);
			sheetObj.SetCellValue(Row, prefix+"item_pkgbaseqty",rtnArr[7]);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",rtnArr[8]);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",rtnArr[9]);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",rtnArr[10]);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",rtnArr[11]);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm",rtnArr[12]);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf",rtnArr[13]);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",rtnArr[14]);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",rtnArr[15]);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",rtnArr[16]);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",rtnArr[17]);
//				if (getXmlDataNullToNullString(result.xml,'exception_msg')!="") {
//					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
//					sheetObj.SelectCell(Row,  Col);
//				}
			// Item Sys No 존재시 해당 Item Master 정보를 보여주고, 기 등록된 데이터는 수정불가 (회색표시)
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_cd"))) {
				sheetObj.SetCellEditable(Row, prefix+"item_cd",0);
			}
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_nm"))) {
				sheetObj.SetCellEditable(Row, prefix+"item_nm",0);
			}
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"pkg_lv1_unit_cd"))) {
				sheetObj.SetCellEditable(Row, prefix+"pkg_lv1_unit_cd",0);
			}
			if (sheetObj.GetCellValue(Row, prefix+"pkg_lv1_qty") != 0) {
				sheetObj.SetCellEditable(Row, prefix+"pkg_lv1_qty",0);
			}
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_pkgunit"))) {
				sheetObj.SetCellEditable(Row, prefix+"item_pkgunit",0);
			}
			if (sheetObj.GetCellValue(Row, prefix+"item_pkgbaseqty") != 0) {
				sheetObj.SetCellEditable(Row, prefix+"item_pkgbaseqty",0);
			}
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"pkg_lv3_unit_cd"))) {
				sheetObj.SetCellEditable(Row, prefix+"pkg_lv3_unit_cd",0);
			}
			if (sheetObj.GetCellValue(Row, prefix+"pkg_lv3_qty") != 0) {
				sheetObj.SetCellEditable(Row, prefix+"pkg_lv3_qty",0);
			}
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"pkg_lv4_unit_cd"))) {
				sheetObj.SetCellEditable(Row, prefix+"pkg_lv4_unit_cd",0);
			}
			if (sheetObj.GetCellValue(Row, prefix+"pkg_lv4_qty") != 0) {
				sheetObj.SetCellEditable(Row, prefix+"pkg_lv4_qty",0);
			}
			// item sys no 존재시 CBM CBF G.WGT G.LBS N.WGT N.LBS 수정 불가
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_sys_no"))) {
				sheetObj.SetCellEditable(Row, prefix+"lv1_cbm",0);
				sheetObj.SetCellEditable(Row, prefix+"lv1_cbf",0);
				sheetObj.SetCellEditable(Row, prefix+"lv1_grs_kgs",0);
				sheetObj.SetCellEditable(Row, prefix+"lv1_grs_lbs",0);
				sheetObj.SetCellEditable(Row, prefix+"lv1_net_kgs",0);
				sheetObj.SetCellEditable(Row, prefix+"lv1_net_lbs",0);
			}
		}
	}
}

/**
 * Save
 */
function btn_Save() {
	var formObj=document.form;

	var sheetObj=docObjects[0];
	var prefix="Grd03";
	// CONTRACT NO
	if (isNull(formObj.ctrt_no)) {
		ComShowCodeMessage("COM0278", "Contract No");
		formObj.ctrt_no.focus();
		return;
	}
	// 필수 입력 체크
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		// Item Name
		if(sheetObj.GetCellValue(i, prefix+"item_nm") == ""){
			ComShowCodeMessage("COM0005", "Item Name");
			sheetObj.SelectCell(i, prefix+"item_nm");
			return;
		}
		// Level 1 Unit
		if(sheetObj.GetCellValue(i, prefix+"pkg_lv1_unit_cd") == ""){
			ComShowCodeMessage("COM0005", "Level 1 Unit");
			sheetObj.SelectCell(i, prefix+"pkg_lv1_unit_cd");
			return;
		}
		//Unit 이 존재할때 Qty는 필수항목이다.
		if (sheetObj.GetCellValue(i, prefix+"item_pkgunit") != "") {
			if (sheetObj.GetCellValue(i, prefix+"item_pkgbaseqty") == "" || sheetObj.GetCellValue(i, prefix+"item_pkgbaseqty") == 0) {
				ComShowCodeMessage("COM0082", "Level 2 Package Qty");
				sheetObj.SelectCell(i, prefix+"item_pkgbaseqty");
				return;
			}
		}
		if (sheetObj.GetCellValue(i, prefix+"pkg_lv3_unit_cd") != "") {
			if (sheetObj.GetCellValue(i, prefix+"pkg_lv3_qty") == "" || sheetObj.GetCellValue(i, prefix+"pkg_lv3_qty") == 0) {
				ComShowCodeMessage("COM0082", "Level 3 Package Qty");
				sheetObj.SelectCell(i, prefix+"pkg_lv3_qty");
				return;
			}
		}
		if (sheetObj.GetCellValue(i, prefix+"pkg_lv4_unit_cd") != "") {
			if (sheetObj.GetCellValue(i, prefix+"pkg_lv4_qty") == "" || sheetObj.GetCellValue(i, prefix+"pkg_lv4_qty") == 0) {
				ComShowCodeMessage("COM0082", "Level 4 Package Qty");
				sheetObj.SelectCell(i, prefix+"pkg_lv4_qty");
				return;
			}
		}
		//Qty 가 존재할때 Unit 는 필수 항목.
		if (sheetObj.GetCellValue(i, prefix+"item_pkgbaseqty") != "" && sheetObj.GetCellValue(i, prefix+"item_pkgbaseqty") != 0) {
			if (sheetObj.GetCellValue(i, prefix+"item_pkgunit") == "") {
				ComShowCodeMessage("COM0082", "Level 2 Package Unit");
				sheetObj.SelectCell(i, prefix+"item_pkgunit");
				return;
			}
		}
		if (sheetObj.GetCellValue(i, prefix+"pkg_lv3_qty") != "" && sheetObj.GetCellValue(i, prefix+"pkg_lv3_qty") != 0) {
			if (sheetObj.GetCellValue(i, prefix+"pkg_lv3_unit_cd") == "") {
				ComShowCodeMessage("COM0082", "Level 3 Package Unit");
				sheetObj.SelectCell(i, prefix+"pkg_lv3_unit_cd");
				return;
			}
		}
		if (sheetObj.GetCellValue(i, prefix+"pkg_lv4_qty") != "" && sheetObj.GetCellValue(i, prefix+"pkg_lv4_qty") != 0) {
			if (sheetObj.GetCellValue(i, prefix+"pkg_lv4_unit_cd") == "") {
				ComShowCodeMessage("COM0082", "Level 4 Package Unit");
				sheetObj.SelectCell(i, prefix+"pkg_lv4_unit_cd");
				return;
			}
		}
	}
	if (ComShowCodeConfirm("COM130101")) {
		doShowProcess(true);
		 setTimeout(function() {

 		var saveXml=docObjects[0].GetSaveData("./WHInPackDefPopupGS.clt", sheet1.GetSaveString() + '&f_cmd=' + MULTI);

 		if (saveXml.indexOf('<ERROR>') == -1) {
			ComShowCodeMessage("COM0093", ""); // Saved successfully.
 			//showCompleteProcess();
			btn_Close();
		}else{
			ComShowCodeMessage("COM0410");
		}
		 },100);
	}

}

function sheet1_OnSearchEnd() {
	doHideProcess(false);
}
/**
 * Close
 */
function btn_Close() {
	rtnData();
}

function rtnData(){
	 var rtnVal="";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "item_cd");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "item_nm");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "pkg_lv1_unit_cd");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "pkg_lv1_qty");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "item_pkgunit");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "item_pkgbaseqty");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "pkg_lv3_unit_cd");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "pkg_lv3_qty");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "pkg_lv4_unit_cd");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "pkg_lv4_qty");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lv1_cbm");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lv1_cbf");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lv1_grs_kgs");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lv1_grs_lbs");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lv1_net_kgs");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lv1_net_lbs");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "ctrt_no");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "pkg_lv1_qty");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "pkg_lv1_qty");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "pkg_lv1_qty");

	 ComClosePopup(rtnVal);
}