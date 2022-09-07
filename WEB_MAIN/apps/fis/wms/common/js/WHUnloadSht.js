/*<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHUnloadSht.js	
*@FileTitle  : Unloading Task Note
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/22
=========================================================--%>*/

//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var isSaveFlag=false; // save 여부
var firCalFlag=false;
var firCalFlag=false;
var callBackFunc = "";
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;	
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
	initControl();	
	// 화면 초기화
	wBin_New();	
	// Print Size 세션값 세팅
//	var paper_size=ComGetObjValue(formObj.paper_size);	
//	if (!ComIsNull(paper_size)) {
//		comboObjects[0].SetSelectCode(paper_size);
//	}	
	// 디폴트 Search 실행
	if (!isNull(formObj.wib_bk_no)) {
		btn_Search();
	}
}
/** 
 * initControl()
 */ 
function initControl() {
	var arg = parent.rtnary;
	var formObj=document.form;
//    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
//    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate", document.form);
//    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
//	axon_event.addListenerForm("change", "form_onChange", formObj);
//	axon_event.addListenerForm("keydown", "form_keyEnter", formObj);
}
/**
 * 화면 초기화
 */
function wBin_New(){
	var formObj=document.form;
	// 초기값 세팅
	setFieldValue(formObj.form_mode, "NEW");
	setFieldValue(formObj.unload_dt, ComGetNowInfo("mdy"));	
//	setFieldValue(formObj.unload_dt, ComGetObjValue(formObj.curr_date));	
}
// 화면 Merge 컬럼 Name
var InputName="|||supv_nm|unload_dt|unload_hm_fr|unload_hm_to|unload_by|msg_to_wk|insp_by|insp_hm_fr|insp_hm_to|msg_to_insp";
/**
 * Search 
 */
function btn_Search() {
	var formObj=document.form;
	doShowProcess(true);
	setTimeout(function(){
		sheet1.RemoveAll();
		// 	var sXml=docObjects[0].GetSearchData("searchWHUnloadShtInfo.clt", FormQueryString(formObj, ""));
 	
		formObj.f_cmd.value=SEARCH;
		var sXml=docObjects[0].GetSearchData("./searchWHUnloadShtInfoGS.clt", FormQueryString(formObj, ""));
	
		var strtIndxCheck = sXml.indexOf("<CHECK>") + "<CHECK>".length;
 		var endIndxCheck = sXml.indexOf("</CHECK>");
 		
 		var xmlDoc = $.parseXML(sXml.substring(strtIndxCheck,endIndxCheck));
 		var $xml = $(xmlDoc);
 		
 		if ($xml.find( "listCnt").text() != '0'){// Document
 			setDataControl(sXml);
 			
 			var strtIndxSheet1 = sXml.indexOf("<SHEET>");
			var endIndxSheet1 = sXml.indexOf("</SHEET>") + "</SHEET>".length;
			var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
			if (sheet1Data.replace(/^\s+|\s+$/gm,'') != ''){
				sheet1.LoadSearchData(sheet1Data);
			}
			setFieldValue(formObj.form_mode, "UPDATE");
 		} else {// Create
 			var strtIndxSheet1 = sXml.indexOf("<SHEET>");
			var endIndxSheet1 = sXml.indexOf("</SHEET>") + "</SHEET>".length;
			var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
			if (sheet1Data.replace(/^\s+|\s+$/gm,'') != ''){
				sheet1.LoadSearchData(sheet1Data);
			}
 			setFieldValue(formObj.unload_dt, ComGetNowInfo());
 		}
	},100);
}

function setDataControl(sXml) {
	 var formObj=document.form;
	 var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	 var endIndxField = sXml.indexOf("</FIELD>");
	 
	 var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	 var $xml = $(xmlDoc);
	 
	 formObj.wib_bk_no.value = formObj.wib_bk_no_1.value;
	 formObj.supv_nm.value = $xml.find( "supv_nm").text();
	 formObj.unload_dt.value = convDate($xml.find( "unload_dt").text());
	 if($xml.find( "unload_hm_fr").text()!=""){
		 formObj.unload_hm_fr.value = convHour($xml.find( "unload_hm_fr").text());
	 }else formObj.unload_hm_fr.value = "";
	 if($xml.find( "unload_hm_to").text()!=""){
		 formObj.unload_hm_to.value = convHour($xml.find( "unload_hm_to").text());
	 }else formObj.unload_hm_to.value = "";
	 formObj.unload_by.value = $xml.find( "unload_by").text();
	 formObj.msg_to_wk.value = $xml.find( "msg_to_wk").text();
	 formObj.insp_by.value = $xml.find( "insp_by").text();
	 if($xml.find( "insp_hm_fr").text()!=""){
		 formObj.insp_hm_fr.value = convHour($xml.find( "insp_hm_fr").text());
	 }else formObj.insp_hm_fr.value = "";
	 if($xml.find( "insp_hm_to").text()!=""){
		 formObj.insp_hm_to.value = convHour($xml.find( "insp_hm_to").text());
	 }else formObj.insp_hm_to.value = "";
	 formObj.msg_to_insp.value = $xml.find( "msg_to_insp").text();
	}

function convHour(str){
	 return str.substring(0, 2) + ':' + str.substring(2, 4);
	}

function convDate(date) {
	if (date != 0){
		if (date.length == 8){
			var rtn = date.substring(4, 6) + "-" + date.substring(6, 8) + "-" + date.substring(0, 4);
			return rtn;
		}else if (date.length == 10){
			var rtn = date.substring(5,7) + "-" + date.substring(8, 10) + "-" + date.substring(0, 4);
			return rtn;
		}
	}else {
		return date;
	}
}
/**
* IBSheet Object
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
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
            with(sheetObj){
            
//			var hdr1="|Item|Item Lot No|Unit|QTY|Type|CNTR/TR No|Seal No|Seal No|Gate No|Inbound Loc|Inbound Loc|po_sys_no|item_sys_no|item_seq|eq_tp_cd|fix_loc_cd|fix_loc_nm";
			var prefix="Grd01";

			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('WHUnloadSht_HDR1'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_cd",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_no",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"item_pkgunit",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
			             {Type:"Int",       Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_pkgqty",           KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"eq_tpsz_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"eq_no",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"seal_no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
			             {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seal_img",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"unload_gate_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"unload_inbound_loc_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"unload_inbound_loc_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   EditLen:20 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"po_sys_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"item_sys_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"item_seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"eq_tp_cd",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"fix_loc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"fix_loc_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 }];
       
			InitColumns(cols);
			SetSheetHeight(230);
			SetEditable(1);
			SetImageList(0,"web/img/main/icon_m.gif");
			SetColProperty(0 ,prefix+"item_cd" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"lot_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"item_pkgunit" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"eq_tpsz_cd" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
			SetColProperty(0, prefix+"eq_no",  {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
//			SetColProperty(0 ,prefix+"seal_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"unload_gate_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"unload_inbound_loc_nm" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
			resizeSheet();
			
      }
      break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}


/**
 * Unloading Date
 * @param name
 */
function on_btn_dt(name){
	var formObj=document.form;
	var cal=new ComCalendar();
	cal.select(eval("formObj."+name), 'MM-dd-yyyy');
}
/**
 * Message (To Inspector) 길이 체크
 */
function msg_to_wk_lenChk(){
	var formObj=document.form;
	if (formObj.msg_to_wk.value.length > 100) {
		ComShowCodeMessage("COM0215", "Message (To Worker)[100]");
		formObj.msg_to_wk.value=formObj.msg_to_wk.value.substring(0, 100);
	}
}
/**
 * Message (To Inspector) 길이 체크
 */
function msg_to_insp_lenChk(){
	var formObj=document.form;
	if (formObj.msg_to_insp.value.length > 100) {
		ComShowCodeMessage("COM0215", "Message (To Inspector)[100]");
		formObj.msg_to_insp.value=formObj.msg_to_insp.value.substring(0, 100);
	}
}
/**
 * Save
 */
function btn_Save() {	
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if (formObj.msg_to_wk.value.length > 100) {
		// Message (To Worker)
		ComShowCodeMessage("COM0215", "Message (To Worker)[100]");
		ComSetFocus(formObj.msg_to_wk);
		return;
	} else if (formObj.msg_to_insp.value.length > 100) {
		// Message (To Inspector)
		ComShowCodeMessage("COM0215", "Message (To Inspector)[100]");
		ComSetFocus(formObj.msg_to_insp);
		return;
	} else if (sheetObj.RowCount()> 0) {
/*		
		for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
			var duCount=0;
			// Order No , Item 같은 로우 중복 체크
			for (var j=sheetObj.HeaderRows(); j<=sheetObj.LastRow(); j++) {
if ((sheetObj.GetCellValue(j, "Grd01ibflag") != "D") && ((sheetObj.GetCellValue(i, "Grd01po_no") + sheetObj.GetCellValue(i, "Grd01item_cd")) == (sheetObj.GetCellValue(j, "Grd01po_no")+sheetObj.GetCellValue(j, "Grd01item_cd")))) {
					duCount++;
				}
				if (duCount > 1) {
var rtnDesc="[Cust Order No="+sheetObj.GetCellValue(j, "Grd01po_no")+"  Item Code="+sheetObj.GetCellValue(j, "Grd01item_cd")+']';
					ComShowCodeMessage("COM0069", rtnDesc); //Duplicate items. {?msg1}
					return;
				}
			}
			// Order No, Item 필수 입력 체크
if (isEmpty2(sheetObj.GetCellValue(i, "Grd01po_no"))) {
				ComShowCodeMessage("COM0164", i-1); // Row No. {?msg1} : It is mandatory for Cust Order No.
				return;				
} else if (isEmpty2(sheetObj.GetCellValue(i, "Grd01item_cd"))) {
				ComShowCodeMessage("COM0163", i-1); // Row No. {?msg1} : It is mandatory for Item Code.
				return;				
			}
		}
*/
	}
	var saveXml = "";
	if (ComShowCodeConfirm("COM0063")) {	
		doShowProcess(true);
		setTimeout(function(){
			formObj.f_cmd.value=ADD;
			var sParam=FormQueryString(formObj);
			    sParam += "&" + sheet1.GetSaveString();
	 		var saveXml=docObjects[0].GetSaveData("./saveWHUnloadShtInfo.clt", sParam);
	 		if (saveXml.indexOf('<ERROR>') == -1) {			
	 			ComShowCodeMessage("COM130102", "Data");
	 			//Change message 'Successfully' to showCompleteProcess();
//	 			showCompleteProcess();
				 isSaveFlag=true;
				 btn_Search();
				 }
		},100);
	}
}
/**
 * Delete
 */
function btn_Delete() {
	var formObj=document.form;
	var sheetObj=docObjects[0];
	formObj.f_cmd.value=MODIFY;
	if (ComShowCodeConfirm("COM0053")) {
		sParam=FormQueryString(formObj,null, "Grd02");	
 		var saveXml=sheetObj.GetSaveData("./removeWHUnloadShtInfo.clt",sParam);
		if (saveXml.indexOf('<ERROR>') == -1) {
			ComShowCodeMessage("COM130303", "Data");
			isSaveFlag=true;		
			Clear(); 
			btn_Search();
		}
	}
}

/**
 * Clear
 */
function Clear() {
	supv_nm.value = "";
	unload_by.value ="";
	msg_to_wk.value ="";
	unload_hm_fr.value = "";
	unload_hm_to.value = "";
	insp_by.value = "";
	insp_hm_fr.value = "";
	insp_hm_to.value = "";
	msg_to_insp.value = "";
}



/**
 * Close
 */
var opener = opener;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
function btn_Close() {
//	var opener=parent.window;//window.dialogArguments;
//alert(isSaveFlag);	
	if (isSaveFlag) {
		opener.btn_Search();
	}
  ComClosePopup(); 
		
}
/**
 * Container & Truck Plan List 팝업 클릭시
 * @param sheetObj
 * @param Row
 * @param Col
 */
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var formObj=document.form;
	var prefix="Grd01";
	var colName=sheetObj.ColSaveName(Col);
	var colValue=sheetObj.GetCellValue(Row, Col);
	var cal=new ComCalendarGrid();
	with(sheetObj)
	{
		if (colName == (prefix+"item_pkgunit") ) {
			var sUrl="CommonCodePopup.clt?grp_cd=A6&code="+colValue+"&wh_flag=Y&ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_sys_no="+sheetObj.GetCellValue(Row, (prefix+"item_sys_no"));
//			ComOpenPopup(sUrl, 400, 560, "setPkgunitGrid", "0,0", true);
			callBackFunc = "setPkgunitGrid";
			modal_center_open(sUrl, "callBackFunc",400, 520,"yes");
		} else if ( colName == prefix+"eq_tpsz_cd" ) {
			var eq_tp_cd=sheetObj.GetCellValue(Row, (prefix+"eq_tp_cd"));
			var code="A";
			if (!ComIsNull(eq_tp_cd)) {
				code=eq_tp_cd;
			}			
			sUrl="ContainerTypePopup.clt?type="+code+"&eq_unit="+colValue;
//			ComOpenPopup(sUrl, 400, 600, "setIbContainerTypeInfo", "0,0", true);
			callBackFunc = "setIbContainerTypeInfo";
			modal_center_open(sUrl, "callBackFunc", 400, 590,"yes");
		} else if (colName == (prefix+"unload_inbound_loc_nm") ) {
			var fix_loc_nm="";
			if (!ComIsEmpty(sheetObj.GetCellValue(Row, prefix+"fix_loc_cd"))) {
				fix_loc_nm=sheetObj.GetCellValue(Row, prefix+"fix_loc_nm");
			}
			var sUrl="WarehouseLocPopup.clt?f_loc_cd="+ComGetObjValue(formObj.wh_cd)+"&f_fix_wh_loc_nm="+fix_loc_nm
			         +"&f_putaway_flg=Y&f_move_flg=Y";
//			ComOpenPopup(sUrl, 700, 550, "setGrd01DefLoc", "0,0", true, sheetObj, Row, Col);
			callBackFunc = "setGrd01DefLoc";
			modal_center_open(sUrl, "callBackFunc", 700, 500,"yes");
	    }	
	}
}
function setPkgunitGrid(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var sheetObj=docObjects[0];
		var prefix="Grd01";
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_pkgunit",rtnValAry[1],0);
	}
}
function setIbContainerTypeInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=docObjects[0];
		var prefix="Grd01";
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"eq_tpsz_cd",rtnValAry[0]);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"eq_tp_cd",rtnValAry[2]);
	}
}
function setGrd01DefLoc(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=docObjects[0];
		var prefix="Grd01";
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"unload_inbound_loc_cd",rtnValAry[0],0);// wh_loc_cd
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"unload_inbound_loc_nm",rtnValAry[1],0);// wh_loc_nm
	}
}
/**
 * Container & Truck Plan List 팝업 이벤트 
 * @param sheetObj
 * @param Row
 * @param Col
 * @param Value
 */
function sheet1_OnChange(sheetObj, Row, Col, Value) {
	var formObj=document.form;
	var prefix="Grd01";
	var colName=sheetObj.ColSaveName(Col);
    if (colName == (prefix+"item_pkgunit") && Value != "") {
    var sParam="grp_cd=A6&code_cd="+Value+"&wh_flag=Y&ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_sys_no="+sheetObj.GetCellValue(Row, (prefix+"item_sys_no"));
    var sXml=sheetObj.GetSearchData("searchCommonCodeInfo.clt?"+sParam);	
				sheetObj.SetCellValue(Row,  Col,getXmlDataNullToNullString(sXml,'code_cd'),0);
				if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(sXml,'exception_msg'));
					sheetObj.SelectCell(Row,Col);
				}
	} else if (colName == (prefix+"eq_tpsz_cd") && Value != "") {		
		var sParam="cntr_tp="+Value;
		ajaxSendPost(rtn_searchEqType, Row, '&goWhere=aj&bcKey=searchCntrTrTp&'+sParam, './GateServlet.gsl');
//		var sXml=sheetObj.GetSearchData("searchCntrTrTp.clt?"+sParam);	
	} else if (colName == (prefix+"unload_inbound_loc_nm") && Value != "") {
		if (Value != "") {
			var fix_loc_nm="";
			if (!ComIsEmpty(sheetObj.GetCellValue(Row, prefix+"fix_loc_cd"))) {
				fix_loc_nm=sheetObj.GetCellValue(Row, prefix+"fix_loc_nm");
			}			
			var sParam="f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_wh_loc_nm=" + Value +"&f_fix_wh_loc_nm="+fix_loc_nm
			           +"&f_putaway_flg=Y&f_move_flg=Y";
//			var sXml=sheetObj.GetSearchData("searchWarehouseLocInfoForName.clt?"+sParam);	
			ajaxSendPost(rtn_searchWarehouseLocInfoForName, Row, '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
		} else {
			sheetObj.SetCellValue(Row, prefix+"unload_inbound_loc_cd","",0);
		}		
	}
//	else if (colName == (prefix+"seal_no")) {
//		var vallist = sheet1.GetCellText(Row, Col).toUpperCase();
//		if(vallist == ""){
//			return;
//		}
//		sheet1.SetCellValue(Row, Col,vallist,0);
//	}
}

function rtn_searchWarehouseLocInfoForName(reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
			sheetObj.SetCellValue(Row,  sheetObj.GetSelectCol(),rtnArr[1],0);
			sheetObj.SetCellValue(Row, prefix+"unload_inbound_loc_cd",rtnArr[0],0);
	   }
	   else{
		   sheetObj.SetCellValue(Row,  sheetObj.GetSelectCol(),'',0);
		   sheetObj.SetCellValue(Row, prefix+"unload_inbound_loc_cd",'');
	   }
	  }else{
		   sheetObj.SetCellValue(Row,  sheetObj.GetSelectCol(),'',0);
		   sheetObj.SetCellValue(Row, prefix+"unload_inbound_loc_cd",'');
	   }
	 }
}

function rtn_searchEqType(reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	  var sheetObj = sheet1;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   var prefix="Grd01";
		   sheetObj.SetCellValue(Row,  sheetObj.GetSelectCol(),rtnArr[0],0);
		   sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",rtnArr[2]);
	   }
	   else{
		   sheetObj.SetCellValue(Row,  sheetObj.GetSelectCol(),'',0);
		   sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",'');
	   }
	  }else{
		   sheetObj.SetCellValue(Row,  sheetObj.GetSelectCol(),'',0);
		   sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",'');
	   }
	 }
}
/**
 * Seal No 메모 오픈
 * @param sheetObj
 * @param Row
 * @param Col
 */
function sheet1_OnClick(sheetObj, Row, Col) {
	var formObj=document.form;
	var colName=sheetObj.ColSaveName(Col);
	var prefix="Grd01";
	if (colName == (prefix+"seal_img")) {
		ComShowMemoPad3(sheetObj, Row, (prefix+"seal_no"), false, 300, 82, 7, (prefix+"seal_no"));         		
	}
}


/*
function sheet1_OnDblClick(sheetObj, Row, Col){
//alert(Row);	
	var formObj=document.form;
	var colName=sheetObj.ColSaveName(Col);
	var prefix="Grd01";
	if (colName == (prefix+"seal_img")) {		
		//var value = sheetObj.CellValue(Row, (prefix+"seal_no"));		
		//if (value.length > 0) {
			//ComShowMemoPad2(sheetObj, Row, "act_rmk", false, 326, 100, 4000, 2); 
		ComShowMemoPad3(sheetObj, Row, (prefix+"seal_no"), false, 300, 82, 7, (prefix+"seal_no"));
		//}
	}
}
*/
/**
 * Seal No 메모 이미지
 * @param sheetObj
 * @param ErrMsg
 */
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {
	//sheetObj.ImageList("seal") = "./web/images/common/icon_m.gif";
	var prefix="Grd01";	
	var rowcnt=sheetObj.RowCount();
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
 		sheetObj.SetCellImage(i, (prefix+"seal_img"),0);
		// Item 조회시 고정 Location 정보와 기 입력된 Location 정보가 같을 경우 Inbound Loc 비활성화 처리
 		if (sheetObj.GetCellValue(i, prefix+"unload_inbound_loc_cd").trim() != "")
		{
 			if (sheetObj.GetCellValue(i, prefix+"fix_loc_cd") == sheetObj.GetCellValue(i, prefix+"unload_inbound_loc_cd")) {
				sheetObj.SetCellEditable(i, prefix+"unload_inbound_loc_nm", 0);
			}
		}
	}
	doShowProcess(false);
}
/**
 * Print
 */
function btn_Print() {
	var formObj=document.form;
	var fileName = "";
	var param= "";
	var mrd_size="";
	
	formObj.title.value="Inbooking Print";

	var wib_bk_no=ComGetObjValue(formObj.wib_bk_no);	
	if (ComIsEmpty(wib_bk_no)) {
		ComShowCodeMessage("COM0015"); // Booking No does not exist.
		return;
	}		
	if (!$('input[name="chOption2"]').is(":checked") && !$('input[name="chOption3"]').is(":checked")) {
		ComShowCodeMessage("COM0122", "print Option");
		return;
	}	
	//--프린트 생성
    
	if($('input[name="chOption2"]').is(":checked")) 
	{
		fileName +="^@@^" + 'WH_IN_WORK.mrd' ;
		param += "^@@^" +"[" + formObj.wib_bk_no.value + "]" ; //파라메타 입력
	}
	//Work Sheet
	if($('input[name="chOption3"]').is(":checked")) 
	{
		fileName += "^@@^" +'WH_IN_INSPECT.mrd' ;
		param += "^@@^" +"[" + formObj.wib_bk_no.value + "]" ; //파라메타 입력
	}
	fileName = fileName.substring(4);
	param = param.substring(4);
	formObj.file_name.value= fileName;
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
}

//document.onclick=processButtonClick;
function doWork(srcName){
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_unload_dt":	
				var cal=new ComCalendar();
            	cal.select(formObj.unload_dt, 'MM-dd-yyyy');
				break;
			case "SAVE":
 				btn_Save();
 				break;
			case "DELETE":
				btn_Delete();
 				break;
			case "PRINT":
				btn_Print();
 				break;
			case "CLOSE":
				btn_Close();
 				break;
      } // end switch
	} catch(e) {
        if(e == "[object Error]"){
         //Unexpected Error occurred. Please contact Help Desk!
         alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
         //System Error! + MSG
         alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
 }
}
function formatTime(obj){
	if(obj.value.length==2)
		{
			obj.value = obj.value + ':';
		}
}
function timeCheck(obj, objStart, objEnd){
	var formObj = document.form;
	var size=obj.value.length;
	if(size==1){
		obj.value="0" + obj.value + ":00";
	}else if(size==2){
		if(hourCheck(obj.value)){
			obj.value=obj.value + ":00";
		}else{
			obj.value='';
		}
	}else if(size==3){
		if(hourCheck(obj.value.substring(0,2))){
			if(obj.value.substring(2,3)>5 || obj.value.substring(2,3)<0){
				obj.value='';
			}else if(obj.value.substring(2,3) == ":"){
				obj.value=obj.value.substring(0,2) + ":" + "00";
			}else{
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,3) + "0";
			}
		}else{
			obj.value='';
		}
	}else if(size==4){
		if(hourCheck(obj.value.substring(0,2))){
			if(minuteCheck(obj.value.substring(2,4))){
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,4);
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}else if(size==5){
		var val = obj.value.split(':');
		if(hourCheck(val[0])){
			if(minuteCheck(val[1])){
				obj.value=val[0] + ":" + val[1];
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}
	if(checkTimeStartEnd(objStart, objEnd) == false){
		ComShowCodeMessage('COM0049');
		objEnd.value = "";
		objEnd.focus();
	}
}
function hourCheck(obj){
	if(isNaN(obj)){
		ComShowCodeMessage("COM0047");
		return false;
	}
	if(obj>23 || obj<0){
		//HOUR: 0-23
		ComShowCodeMessage("COM0047");
		return false;
	}else{
		return true;
	}
}
function minuteCheck(obj){
	if(isNaN(obj)){
		ComShowCodeMessage("COM0048");
		return false;
	}
	if(obj>59 || obj<0){
		//alert('0-59');
		ComShowCodeMessage("COM0048");
		return false;
	}else{
		return true;
	}
}
function checkTimeStartEnd(objStart, objEnd){
	var startTime = objStart.value;
	var endTime = objEnd.value;
	if(startTime != '' && endTime != ''){
		if(parseInt(startTime.replace(':', '')) > parseInt(endTime.replace(':', ''))){
			return false;
		}
	}
	return true;
}

