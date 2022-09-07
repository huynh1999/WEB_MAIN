/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CycleCountPlan.js
*@FileTitle  : Cycle Count Plan
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/15
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var fix_grid01="Grd01";
var selectCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var firCalFlag=false;
/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/*
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
 }
/*
 * load page
 */
function loadPage() {
	//sheet
	for (var i=0; i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	initControl();
	//기본
	var formObj=document.form;
	$("#wh_cd").val($("#def_wh_cd").val());
	$("#wh_nm").val($("#def_wh_nm").val());
	$("#ctrt_no").val($("#def_wh_ctrt_no").val());
	$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
	searchZoneCodeList();
	commonModeChange("A");
//	check_authority_wh();
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/*
 * wave화면에서 link로 넘어온경우(Inventory Replenishment)
 */
//Not Call
function searchWaveUnAllocatedList(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var sXml="";
	sXml=sheetObj.GetSearchData("searchInvMoveMgmtForWaveUnList.clt", FormQueryString(formObj,""));;
	var xml = convertColOrder(sXml, fix_grid01);
	sheetObj.LoadSearchData(xml,{Sync:1} );
}
/*
 * 각모드별 화면을 init셋팅
 */

function commonModeChange(mode){
	var formObj=document.form;
	switch(mode){
		case "A":	//Total Cycle Count
			ComBtnDisable("btn_trs_fm_dt");
			ComBtnDisable("btn_trs_to_dt");
			ComBtnDisable("btn_wh_loc_cd");
			ComEnableObject(formObj.trs_fm_dt, false);
			ComEnableObject(formObj.trs_to_dt, false);
			formObj.trs_fm_dt.value="";
			formObj.trs_to_dt.value="";
			ComEnableObject(formObj.wh_loc_nm,false);
			formObj.wh_loc_nm.value="";
			formObj.zone_cd.disabled = true;
			formObj.block_cd.disabled = true;
			formObj.wh_loc_prop_cd.disabled = true;
			formObj.zone_cd.value= "All";
			break;
		case "P":	//Part Cycle Count
			ComBtnDisable("btn_trs_fm_dt");
			ComBtnDisable("btn_trs_to_dt");
			ComBtnEnable("btn_wh_loc_cd");
			ComEnableObject(formObj.trs_fm_dt, false);
			ComEnableObject(formObj.trs_to_dt, false);
			formObj.trs_fm_dt.value="";
			formObj.trs_to_dt.value="";
			ComEnableObject(formObj.wh_loc_nm,true);
			formObj.zone_cd.disabled = false;
			formObj.block_cd.disabled = false;
			formObj.wh_loc_prop_cd.disabled = false;
			break;
		case "T":	//Transaction Cycle Count
			ComBtnEnable("btn_trs_fm_dt");
			ComBtnEnable("btn_trs_to_dt");
			ComBtnEnable("btn_wh_loc_cd");
			ComEnableObject(formObj.trs_fm_dt, true);
			ComEnableObject(formObj.trs_to_dt, true);
			ComEnableObject(formObj.wh_loc_nm, 		true);
			formObj.zone_cd.disabled = false;
			formObj.block_cd.disabled = false;
			formObj.wh_loc_prop_cd.disabled = false;
			break;
		case "NEW":	//Transaction Cycle Count
			docObjects[0].RemoveAll();
			formObj.reset();
			//loadPage();
			$("#wh_cd").val($("#def_wh_cd").val());
			$("#wh_nm").val($("#def_wh_nm").val());
			$("#ctrt_no").val($("#def_wh_ctrt_no").val());
			$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
			searchZoneCodeList();
			commonModeChange("A");
			doDispPaging("", getObj('pagingTb'));
			break;
			
	}
}
/*
 * 버튼 change
 */
function commonButtonChange(mode){
	switch(mode){
		case "INIT" :
			ComBtnEnable("btnSave");
			ComBtnEnable("btn_add");
			ComBtnDisable("btn_del");
			ComBtnEnable("btn_wh_cd");
			ComBtnEnable("btn_ctrt_no");
			ComBtnDisable("btn_trs_fm_dt");
			ComBtnDisable("btn_trs_to_dt");
			ComBtnDisable("btn_wh_loc_cd");
			break;
		case "NEW" :
			ComBtnEnable("btnSave");
			ComBtnEnable("btn_add");
			ComBtnDisable("btn_del");
			
			ComBtnEnable("btn_wh_cd");
			ComBtnEnable("btn_ctrt_no");
			ComBtnDisable("btn_trs_fm_dt");
			ComBtnDisable("btn_trs_to_dt");
			ComBtnDisable("btn_wh_loc_cd");
			break;
	}
}
/*
 * init control
 */
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//	//- 포커스 나갈때
//    axon_event.addListenerForm('blur', 	'form_deactivate', formObject);
//    //- key down
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/*
 * init sheet
 */
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet1":
	    with(sheetObj){
      var prefix="Grd01";
      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [  { Text:getLabel('CycleCountPlan_HDR1'), Align:"Center"},
	                   { Text:getLabel('CycleCountPlan_HDR2'), Align:"Center"} ];
      InitHeaders(headers, info);
      var cols = [ {Type:"Seq",       Hidden:0, 	Width:50, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"seq"},
             {Type:"CheckBox",  Hidden:0, 			Width:30, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"chk"},
             {Type:"Text",     Hidden:0,  			Width:110, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"trs_dt", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",     Hidden:0,  			Width:100, 	Align:"Left", 		ColMerge:1, SaveName:prefix+"item_cd", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",     Hidden:0,  			Width:180, 	Align:"Left", 		ColMerge:1, SaveName:prefix+"item_nm", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",     Hidden:0,  			Width:130, 	Align:"Left", 		ColMerge:1, SaveName:prefix+"lot_no", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",     Hidden:0,  			Width:70, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"zone_cd", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",     Hidden:0,  			Width:70, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"block_cd", 	KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",     Hidden:0,  			Width:70, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"prop_cd", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",     Hidden:0,  			Width:70, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"wh_loc_cd_nm", KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Int",     Hidden:0,  			Width:70, 	Align:"Right", 		ColMerge:1, SaveName:prefix+"inv_qty", 		KeyField:0, Format:"Integer", 		PointCount:0, 	UpdateEdit:0,   InsertEdit:0},
             {Type:"Float",     Hidden:0,  			Width:80, 	Align:"Right", 		ColMerge:1, SaveName:prefix+"cbm", 			KeyField:0, Format:"Float", 		PointCount:WMS_CBM_POINT_COUNT, 	UpdateEdit:0,   InsertEdit:0},
             {Type:"Float",     Hidden:0,  			Width:80, 	Align:"Right", 		ColMerge:1, SaveName:prefix+"grs_kgs", 		KeyField:0, Format:"Float", 		PointCount:3, 	UpdateEdit:0,   InsertEdit:0},
             {Type:"Float",     Hidden:0,  			Width:80, 	Align:"Right", 		ColMerge:1, SaveName:prefix+"net_kgs", 		KeyField:0, Format:"Float", 		PointCount:3, 	UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",     Hidden:0,  			Width:120, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"wib_bk_no", 	KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Date",     Hidden:0,  			Width:100, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"inbound_dt", 	KeyField:0, Format:"Ymd", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",     Hidden:0,  			Width:100, 	Align:"Left", 		ColMerge:1, SaveName:prefix+"po_no", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Date",     Hidden:0,  			Width:80, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"exp_dt", 		KeyField:0, Format:"Ymd", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",     Hidden:0,  			Width:80, 	Align:"Left", 		ColMerge:1, SaveName:prefix+"lot_04", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",     Hidden:0,  			Width:80, 	Align:"Left", 		ColMerge:1, SaveName:prefix+"lot_05", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",     Hidden:0,  			Width:120, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"lot_id", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",      Hidden:0, 			Width:80, 	Align:"Right",  	ColMerge:0,	SaveName:prefix+"item_ser_no",	KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
	         {Type:"Text",      Hidden:0, 			Width:80, 	Align:"Center",  	ColMerge:0,	SaveName:prefix+"lic_plat_no",	KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
             {Type:"Combo",     Hidden:0,  			Width:140, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"wh_cd", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:1,   InsertEdit:1},
             {Type:"Text",      Hidden:1, 			Width:100, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"so_no", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",      Hidden:1, 			Width:100, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"po_sys_no", 	KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",      Hidden:1, 			Width:100, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"item_sys_no", 	KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",      Hidden:1, 			Width:70, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"wh_loc_cd", 	KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",      Hidden:1, 			Width:70, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"ctrt_no", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",      Hidden:1, 			Width:70, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"cycle_cnt_no", KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Status",    Hidden:1, 			Width:140, 	Align:"Center", 	ColMerge:1, SaveName:prefix+"ibflag", 		KeyField:0, Format:"", 				PointCount:0, 				UpdateEdit:0,   InsertEdit:0},
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
      InitColumns(cols);
      SetSheetHeight(320);
      SetEditable(1);
      SetUnicodeByte(3);
      SetColProperty(0 , prefix+"wh_loc_cd_nm", {AcceptKeys:"E|[" + "0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\" + "]" , InputCaseSensitive:1});
	  SetColProperty(prefix+"wh_cd", {ComboText:"|"+WHNMLIST, ComboCode:"|"+WHCDLIST} );
      SetHeaderRowHeight(30);
      SetAutoRowHeight(0);
      resizeSheet();
      SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
      }
      break;
	}
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet1_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.form;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
} 
function goToPage(callPage){
	document.forms[0].f_CurPage.value=callPage;
	btn_Search();
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	btn_Search();
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	btn_Search();
}
function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var formObj=document.form;	
	var sheetObj=docObjects[0];
	//doDispPaging(sheetObj.GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	if(sheetObj.RowCount()>0)
	{
		doDispPaging(docObjects[0].GetCellValue(2, "Indexing"), getObj('pagingTb'));
	}
	//sheetObj.SetTotalRows(sheetObj.RowCount());
	ComBtnDisable("btn_row_del");
}
/*
 * sheet1 onchange event
 */
function sheet1_OnChange(sheetObj, row, col, Value) {
	var colStr=sheetObj.ColSaveName(col);
}
/*
 * sheet1 dbclick event
 */
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	switch (colName){
	}
}
/*
 * sheet1 popupclick event
 */
function sheet1_OnPopupClick(sheetObj, Row, Col){
	var colName=sheetObj.ColSaveName(Col);
}
/*
 * onclick
 */
function sheet1_OnClick(sheetObj, Row, Col) {
	var colName=sheetObj.ColSaveName(Col);
	switch (colName){
	}
	var nw = 0;
	var chk = 0;
	if(sheetObj.GetCellValue(Row,"Grd01ibflag") == "I"){
		if(sheetObj.GetCellValue(Row,"Grd01chk") == "0"){
			nw++;
			chk++;
		}else{
			nw--;
			chk--;
		}
	}else{
		if(sheetObj.GetCellValue(Row,"Grd01chk") == "0"){
			chk++;
		}else chk--;
	}
	for ( var j = sheet1.HeaderRows(); j < sheet1.HeaderRows()+sheetObj.RowCount(); j++) {
		if(sheetObj.GetCellValue(j,"Grd01chk") == "1"&&sheetObj.GetCellValue(j,"Grd01ibflag") == "I"){
			nw++;
		}
	}
	for ( var i = sheet1.HeaderRows(); i < sheet1.HeaderRows()+sheetObj.RowCount(); i++) {
		if(sheetObj.GetCellValue(i,"Grd01chk") == "1"){
			chk++;
		}
	}
	if(chk==0){
		ComBtnDisable("btn_row_del");
		return;
	}
	if(chk>nw) ComBtnDisable("btn_row_del");
	else ComBtnEnable("btn_row_del");
	
}
/*
 * row add button on click
 */
function addRow(sheetObj, Row, Col){
	if($("#plan_sts_cd").val() == "C")	{
		return;
	}
row_cnt=ComParseInt(sheetObj.GetCellValue(Row, fix_grid01 + "add_row_cnt"));
}
/*
 * loc popupedit 완료후
 */
function setLocationInfo(aryPopupData){
	var sheetObj=docObjects[0];
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"to_wh_loc_cd",aryPopupData[0][1],0);// wh_loc_cd
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"to_wh_loc_cd_nm",aryPopupData[0][2],0);// wh_loc_nm
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"to_wh_loc_prop_cd",aryPopupData[0][4],0);//prop_cd
	var prop_cd=aryPopupData[0][4];
	var to_mv_tp_cd="MV";
	var to_mv_tp_cd_nm="Normal";
	if (prop_cd == "DMG" || prop_cd == "HLD") //Damage, Hold일경우는는 팝업에서 넣어주는 코드값과 코드명으로 사용
	{
		to_mv_tp_cd=prop_cd;
		to_mv_tp_cd_nm=aryPopupData[0][5];
	}
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"to_mv_tp_cd",to_mv_tp_cd,0);//to location status
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"to_mv_tp_cd_nm",to_mv_tp_cd_nm,0);//to location status name
}
/*
 * 파일다운로드
 */
function fileDownload(sheetObj, Row, Col){
	var formObj1=document.form1;
	setFieldValue(formObj1.downloadLocation,  sheetObj.GetCellValue(Row, fix_grid01 + "file_path") + sheetObj.GetCellValue(Row, fix_grid01+ "file_sys_nm"));
	setFieldValue(formObj1.downloadFileName, sheetObj.GetCellValue(Row, fix_grid01 + "file_org_nm"));
	formObj1.target="downiframe";
	formObj1.submit();
}
/*
 * 파일업로드
 */
function fileUpload(sheetObj, Row, Col){
	var sUrl="./InvMoveFileUploadPopup.clt?move_no="  + sheetObj.GetCellValue(Row, fix_grid01 + "move_no")
	+ "&move_seq=" + sheetObj.GetCellValue(Row, fix_grid01 + "plan_seq");
    callBackFunc = "setFileInfoInfo";
    modal_center_open(sUrl, callBackFunc, 700,130,"yes");
}
/*
 * 파일업로드 이후 --> SHEET 재조회
 */
function setFileInfoInfo(aryPopupData)
{
	reSearch();
}
/*
 * 파일업로드 이후 --> SHEET 재조회
 * 파일삭제 이후 --> SHEET 재조회
 */
function reSearch()
{
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var sXml="";
	sXml=sheetObj.GetSearchData("./searchInvMoveMgmtForDtl.clt?", "in_plan_no=" + formObj.plan_no.value);
	var xml = convertColOrder(sXml, fix_grid01);
	sheetObj.LoadSearchData(xml,{Sync:1} );
}
/* 
 * File Delete
 */
function fileDelete(sheetObj, Row, Col) {
	if (ComShowCodeConfirm("COM0053")) { // Do you want to delete?
		var sParam="move_no="		+ sheetObj.GetCellValue(Row, fix_grid01 + "move_no")
		+ "&move_seq="	+ sheetObj.GetCellValue(Row, fix_grid01 + "plan_seq") //move_seq=plan_no
		+ "&file_seq="	+ sheetObj.GetCellValue(Row, fix_grid01 + "file_seq");
		if (sParam == "") { return; }
 		var sXml=sheetObj.GetSaveData("./removeFileInvMoveFile.clt?", sParam);
 		sheetObj.LoadSaveData(sXml);
		//SaveEnd
		if( sXml.indexOf('<MESSAGE>') == -1){
			reSearch();//재조회
		}
	}
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
function doWork(srcName){
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_trs_to_dt":
				if(document.getElementById('btn_trs_to_dt').disabled) {
					return;
				}
	            var cal=new ComCalendarFromTo();
	            cal.displayType="date";
	            cal.select(formObj.trs_fm_dt, formObj.trs_to_dt, 'MM-dd-yyyy');
				break;	
			case "btn_cycle_cnt_dt":
				if (document.getElementById('btn_cycle_cnt_dt').disabled) {
					return;
				}
				var cal=new ComCalendar();
	            cal.select(formObj.cycle_cnt_dt, 'MM-dd-yyyy');
				break;	
 			case "btn_ctrt_no" :
 				if (document.getElementById('btn_ctrt_no').disabled) {
					return;
				}
 				CtrtPopup();
				break;
 			case "btn_wh_loc_cd":	
 				if (ComIsEmpty(formObj.wh_cd)) {
 					ComShowCodeMessage("COM0114", "Warehouse");
 					return;
 				}
// 				var sUrl="./WarehouseLocPopup.clt?f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_adjust_flg=Y" + "&f_wh_loc_nm="+formObj.wh_loc_nm.value;
 				var sUrl="./WarehouseLocPopup.clt?f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_adjust_flg=Y" + "&f_fix_wh_loc_nm="+formObj.wh_loc_nm.value;
 				callBackFunc = "setAdjustLocInfo";
 			    modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
 				break;
 			case "SEARCHLIST":	
 				btn_Search();
 				break;
 			case "btn_row_add":	
 				btn_Add();
 				break;
 			case "btn_row_del":	
 				btn_Del();
 				break;
 			case "SAVE":	
 				btn_Save();
 				break;
 			case "NEW":
 				btn_New();
 				break;
      } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}

/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	if(document.getElementById('btn_ctrt_no').disabled){
		return;
	}
	if(docObjects[0].RowCount()> 0)
	{
		//confirm
		if(ComShowCodeConfirm("COM0353", "Contract No") == false)
		{
			$("#ctrt_nm").val($("#ctrt_nm_org").val());
			return;
		}
	}
	//SHEET 초기화
	docObjects[0].RemoveAll();
	var formObj=document.form;
	var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value+"&ctrt_no="+formObj.ctrt_no.value;
	callBackFunc = "setCtrtNoInfo";
    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
}
/*
 * 팝업 관련 로직 시작
 */
//function setCtrtNoInfo(aryPopupData){
//	var formObj=document.form;
//	setFieldValue(formObj.ctrt_no,        aryPopupData[0][0]);
//	setFieldValue(formObj.ctrt_nm,        aryPopupData[0][1]);	
//	setFieldValue(formObj.ctrt_no_org,    aryPopupData[0][0]);
//	setFieldValue(formObj.ctrt_nm_org,    aryPopupData[0][1]);
//}
function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
    if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	 	return;
	}else{
		  var rtnValAry=aryPopupData.split("|");
		   formObj.ctrt_no.value=rtnValAry[0];
		   formObj.ctrt_nm.value=rtnValAry[1];
		   formObj.ctrt_no_org.value=rtnValAry[0];
		   formObj.ctrt_nm_org.value=rtnValAry[1];		   
	}
}

function setAdjustLocInfo(aryPopupData) {
	
	var formObj=document.form;
    if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	 	return;
	}else{
		  var rtnValAry=aryPopupData.split("|");
		   formObj.wh_loc_cd.value=rtnValAry[0];
		   formObj.wh_loc_nm.value=rtnValAry[1];
		   formObj.wh_loc_nm_org.value=rtnValAry[1];
	}
}
//Location
var temp = '';
function getLocationInfo(div){
	temp = div;
	var formObj=document.form;
//	if(formObj.supp_cd.value != "" || formObj.supp_nm.value != "" ){
//		ajaxSendPost(resultLocationInfo,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+"trdpCode"+'&s_code='+formObj.supp_cd.value, './GateServlet.gsl');
//	}
	if ($("#wh_loc_nm").val() == "") {
		$("#wh_loc_cd").val("");
		$("#wh_loc_nm_org").val("");
		if (div == "e") {
			btn_Search();
		}
		return;
	}
	if (ComIsEmpty(formObj.wh_cd)) {
		ComShowCodeMessage("COM0114", "Warehouse");
		$("#wh_loc_nm").val("");
		$("#wh_cd").focus();
		return;
	}
	var sParam = "f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm="
			+ $("#wh_loc_nm").val() + "&f_move_flg=Y";
//	ajaxSendPost(resultLocationInfo,'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName?'+sParam, './GateServlet.gsl');
	ajaxSendPost(resultLocationInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
}
function resultLocationInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
	    var rtnArr=doc[1].split('^@');
	    	if(rtnArr[0] != ""){
	    		$("#wh_loc_nm").val(rtnArr[1]);
	    		$("#wh_loc_nm_org").val(rtnArr[1]);
	    		$("#wh_loc_cd").val(rtnArr[0]);
	    		if (temp == "e") {
	    			btn_Search();
	    		}
	    	}
	    	else{
	    		$("#wh_loc_nm").val("");
	    		$("#wh_loc_nm_org").val("");
	    		$("#wh_loc_cd").val("");
	    		$("#wh_loc_nm").focus();
	    	}
		}
		else{
		}
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
/*
 * 팝업 관련 로직 끝
 */
/*
 * 조회
 */
function btn_Search(){
	var formObj=document.form;
	if(formObj.wh_cd.value == ""){
		ComShowCodeMessage("COM12233");
		return;
	}
	if (validateForm(formObj, 'search') == false) {
		return;	
	}
	formObj.f_cmd.value=SEARCH;
	docObjects[0].DoSearch("./searchWHCyclecountListGS.clt", FormQueryString(formObj, ""));
}
/*
 * PLAN 저장
 */
function btn_Save(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	//validation check
	if (validateForm(formObj, 'save') == false){
		return;
	}
	if(sheetObj.CheckedRows("Grd01chk") == 0){
		ComShowCodeMessage("COM0359");
		return;
	}
	//confirm
	//MULTI
	if(!ComShowCodeConfirm("COM0063")){ 
		return;
	}
	formObj.f_cmd.value=MULTI;

	var sParam=FormQueryString(formObj, null, "Grd00");
	sParam += "&" + ComGetSaveString(sheetObj,  true, false, null, "");
 	var saveXml=sheetObj.GetSaveData("./saveWHCyclecountInfoGS.clt?", sParam);
	//sheetObj.LoadSearchXml(saveXml);
	//1. Save 후 조회
	if( saveXml.indexOf('<ERROR>') == -1){
//		ComShowCodeMessage("COM0093", "");
		
		//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		
		//var InputName="cycle_cnt_no";	
		//ComsetXmlDataToForm2(saveXml, InputName, 0);
		displayData(saveXml);
		//Management 화면으로 이동
	    var sUrl="./CycleCountMgmt.clt?cycle_cnt_no="+formObj.cycle_cnt_no.value;
		parent.mkNewFrame('Cycle Count Management', sUrl, "CycleCountMgmt_" + formObj.cycle_cnt_no.value);
	}
}
function displayData(saveXml){
	var formObj  = document.form;
	 var xmlDoc = $.parseXML(saveXml);
	  var $xml = $(xmlDoc);
	  formObj.cycle_cnt_no.value = $xml.find( "cycle_cnt_no").text();
}
/*
 * PLAN 저장 & MOVEMENT 저장
 */
function btn_Move()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	//validation check
	if (validateForm(formObj, 'move') == false) 
	{
		return;
	}
	//모든건이 EDIT_YN = 'N'일경우
	//confirm     
	if(!ComShowCodeConfirm("COM0352"))
	{ 
		return;
	}
	var tl_wo_document_info_header="";
	var mode=tl_wo_document_info_header+"mode="		+$("#mode").val();
	var plan_no="&"+tl_wo_document_info_header+"plan_no="		+$("#plan_no").val();
	var wh_cd="&"+tl_wo_document_info_header+"wh_cd="		+$("#wh_cd").val();
	var ctrt_no="&"+tl_wo_document_info_header+"ctrt_no="		+$("#ctrt_no").val();
	var move_dt="&"+tl_wo_document_info_header+"move_dt="		+$("#move_dt").val();
	var move_hm_fr="&"+tl_wo_document_info_header+"move_hm_fr="	+$("#move_hm_fr").val();
	var move_hm_to="&"+tl_wo_document_info_header+"move_hm_to="	+$("#move_hm_to").val();
	var supv_nm="&"+tl_wo_document_info_header+"supv_nm="		+$("#supv_nm").val();
	var work_nm="&"+tl_wo_document_info_header+"work_nm="		+$("#work_nm").val();
	var rmk="&"+tl_wo_document_info_header+"rmk="			+$("#rmk").val();
	form.f_cmd.value = MODIFY03;
	var f_cmd="&"+tl_wo_document_info_header+"f_cmd="			+$("#f_cmd").val();
	var docinParamter=mode+plan_no+wh_cd+ctrt_no+move_dt+move_hm_fr+move_hm_to+supv_nm+work_nm+rmk+f_cmd;
	var sheetDatas=sheetObj.GetSaveString(true); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
 	var saveXml=sheetObj.GetSaveData("./saveInvMoveMgmtForMove.clt", docinParamter+"&"+sheetDatas);
 	var xmlDoc = $.parseXML(saveXml);
	var $xml = $(xmlDoc);
    if($xml.find("res").text() == "1"){
//		ComShowCodeMessage("COM0093");
    	//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		
		var plan_no=$xml.find("plan_no").text();
		$("#in_plan_no").val(plan_no);
		btn_Search();
	}
}
/*
 * New Button
 */
function btn_New(){
//	return;
	commonModeChange("NEW");
}
/*
 * Add Button
 */
function btn_Add(){
	var formObj=document.form;
	//STOCK SELECTION 팝업
	var sParam="ctrt_no=" + formObj.ctrt_no.value;
		sParam += "&ctrt_nm=" + formObj.ctrt_nm.value;
		sParam += "&wh_cd=" + formObj.wh_cd.value;
		var t = document.getElementById("wh_cd");
		sParam += "&wh_nm=" + t.options[t.selectedIndex].text;
		sParam += "&owner_cd=" + "";
		sParam += "&owner_nm=" + "";
		sParam += "&call_tp=M";	
		//sParam += "&f_move_flg=Y"; //가능재고 체크를 위하여
	var sUrl="./WHOutStockSelectPopup.clt?" + sParam;
    callBackFunc = "setStockInfo";
    modal_center_open(sUrl, callBackFunc, 1280, 630, "yes");
}
function setStockInfo(rtnValAry){
	var formObj = document.form;
	var sheetObj = docObjects[0];
	var chk =0;
	for ( var i = sheet1.HeaderRows(); i < sheet1.HeaderRows()+sheet1.RowCount(); i++) {
		if(sheetObj.GetCellValue(i,"Grd01chk") == "1"){
			chk++;
		}
	}
	if(chk==0)ComBtnEnable("btn_row_del");
	 if (rtnValAry == "" || rtnValAry == "undefined" || rtnValAry == undefined) {
		return;
	 }else{	 
		 for(var k=0; k < rtnValAry.length; k++){
			var item_sys_no=rtnValAry[k].item_sys_no;
			var po_sys_no = rtnValAry[k].po_sys_no;
			var lot_id = rtnValAry[k].fix_lot_id;
			var wh_loc_cd = rtnValAry[k].wh_loc_cd;
			var insertRow=sheetObj.DataInsert(-1);
			sheetObj.SetCellValue(insertRow, fix_grid01+"chk",1,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"item_cd",rtnValAry[k].item_cd,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"item_nm",rtnValAry[k].item_nm,0);
			var lot_no = rtnValAry[k].lot_no;
			if(lot_no == ""){
				lot_no=" ";
			}
			sheetObj.SetCellValue(insertRow, fix_grid01+"lot_no", lot_no, 0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"zone_cd",rtnValAry[k].zone_cd, 0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"block_cd",rtnValAry[k].block_cd, 0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"prop_cd",rtnValAry[k].prop_cd, 0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"wh_loc_cd_nm",rtnValAry[k].wh_loc_cd_nm, 0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"inv_qty",rtnValAry[k].stock_qty, 0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"cbm",rtnValAry[k].lv1_cbm, 0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"grs_kgs",rtnValAry[k].lv1_grs_kgs,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"net_kgs",rtnValAry[k].lv1_net_kgs,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"wib_bk_no",rtnValAry[k].wib_bk_no,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"inbound_dt",rtnValAry[k].inbound_dt,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"po_no",rtnValAry[k].po_no,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"exp_dt",rtnValAry[k].exp_dt,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"lot_04",rtnValAry[k].lot_04,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"lot_05",rtnValAry[k].lot_05,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"lot_id",lot_id,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"wh_cd", document.getElementById("wh_cd").value, 0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"so_no",rtnValAry[k].so_no,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"po_sys_no",po_sys_no,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"item_sys_no",item_sys_no,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"wh_loc_cd",wh_loc_cd,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"ctrt_no",rtnValAry[k].ctrt_no,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"item_ser_no",rtnValAry[k].item_ser_no,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"lic_plat_no",rtnValAry[k].lic_plat_no,0);
		}
	}
}
/*
 * Plan 전체캔슬
 */
function btn_Cancel()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	//validation check
	if (validateForm(formObj, 'cancel') == false) 
	{
		return;
	}
	if (ComShowCodeConfirm("COM0350") == false) 
	{
		return;
	}
	var tl_wo_document_info_header="";
	var plan_no=tl_wo_document_info_header+"plan_no="	+$("#plan_no").val();
	form.f_cmd.value = MODIFY02;
	var f_cmd=tl_wo_document_info_header+"&f_cmd="	+$("#f_cmd").val();
	var docinParamter=plan_no+f_cmd;
	var isheetSaveParamters=docinParamter;
 	var saveXml=sheetObj.GetSaveData("cancelInvMoveMgmtAll.clt", isheetSaveParamters);
 	sheetObj.LoadSaveData(saveXml);
 	var xmlDoc = $.parseXML(saveXml);
	var $xml = $(xmlDoc);
    if($xml.find("res").text() == "1"){
//		ComShowCodeMessage("COM0079", "");
    	
    	//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		commonModeChange("NEW");
	}
}
function btn_Del(){
	var sheetObj=docObjects[0];
	if(sheetObj.RowCount()> 0){
		ComRowHideDelete(sheetObj, "Grd01chk");
	}
	sheetObj.CheckAll("Grd01chk",0);
}
/*
 * 프린트
 */
function btn_Print()
{
	var formObj=document.form;
    formObj.title.value="E-SOP Doc Download";
    fileName += 'WH_INV_MOVE_WORK.mrd';
      param += "[" + $("#plan_no").val() + "]"; //파라메타 입력
      formObj.file_name.value= fileName;
    formObj.rd_param.value=param;
    popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction){
			case 'search':
				if(ComIsEmpty(formObj.wh_cd)){
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				if(ComIsEmpty(formObj.ctrt_no)){
					ComShowCodeMessage("COM0114","Contract No");
					$("#ctrt_no").focus();
					return false;
				}
				if(formObj.cycle_cnt_tp_cd.value== 'T'){
					if(ComIsEmpty(formObj.trs_fm_dt)){
						//ComShowCodeMessage("COM0114","Transaction No or Transaction Date");
						ComShowCodeMessage("COM0114","Transaction Date");
						formObj.trs_fm_dt.focus();
						return false;
					} 
					if (!ComIsEmpty(formObj.trs_fm_dt) && !isDate(formObj.trs_fm_dt)) {
						ComShowCodeMessage("COM0114","Transaction Date");
						formObj.trs_fm_dt.focus();
						return false;
					}
					if (!ComIsEmpty(formObj.trs_to_dt) && !isDate(formObj.trs_to_dt)) {
						ComShowCodeMessage("COM0114","Transaction Date");
						formObj.trs_to_dt.focus();
						return false;
					}
					if ((!ComIsEmpty(formObj.trs_fm_dt)&&ComIsEmpty(formObj.trs_to_dt))||(ComIsEmpty(formObj.trs_fm_dt)&&!ComIsEmpty(formObj.trs_to_dt))) {
						ComShowCodeMessage("COM0122","Transaction Date");
						formObj.trs_fm_dt.focus();
						return false;
					}
					if (getDaysBetween(formObj.trs_fm_dt, formObj.trs_to_dt, 'MM-dd-yyyy')<0) {
						ComShowCodeMessage("COM0122","Transaction Date!");
						formObj.trs_fm_dt.focus();
						return false;
					}
				}
				break;
			case 'save':
				//warehouse 필수로 입력되어야함.
				if(ComIsEmpty(formObj.cycle_cnt_dt)){
					ComShowCodeMessage("COM0114","Cycle Count Date");
					$("#cycle_cnt_dt").focus();
					return false;
				}
				break;
		}
	}
	return true;
}
function saveSheetCommon(sheetObj, sAction)
{
	var formObj=document.form;
	var fr_curr_cnt=0;
	var to_curr_cnt=0;
	var wh_loc_cd_arr=new Array();
	var stock_curr_cnt=0;
	if(ComGetLenByByte($("#supv_nm").val().trim()) > 100){
		ComShowCodeMessage("COM0215", "Supervisor[100]");
		ComSetFocus(formObj.supv_nm);
		return false;
	}
	if(ComGetLenByByte($("#work_nm").val().trim()) > 100){
		ComShowCodeMessage("COM0215", "Worker[100]");
		ComSetFocus(formObj.work_nm);
		return false;
	}
	if(ComGetLenByByte($("#rmk").val().trim()) > 1000){
		ComShowCodeMessage("COM0215", "Remark[1000]");
		ComSetFocus(formObj.rmk);
		return false;
	}
	if(sheetObj.RowCount()== 0)
	{
		ComShowCodeMessage("COM0323");
		return false;
	}
	var edit_yn_no_n_cnt=0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, fix_grid01 + "edit_yn") != "N")
		{
			edit_yn_no_n_cnt ++;
			var to_eq_qty=eval(sheetObj.GetCellValue(i, fix_grid01 + "to_ea_qty"));
			var to_wh_loc_cd=sheetObj.GetCellValue(i, fix_grid01 + "to_wh_loc_cd").trim()
			var ibflag=sheetObj.GetCellValue(i, fix_grid01 + "ibflag");
			if(ibflag == "I") //신규건인경우 수량이 0이상인경우에만 to_wh_loc_cd여부 확인하면 된다.
			{
				//-----1. to loc cd 체크(수량이 0보다 큰경우 to_wh_loc_cd체크)
				if(to_eq_qty > 0 && to_wh_loc_cd == "")
				{
					ComShowCodeMessage("COM0114","To Location Info");
					sheetObj.SelectCell(i, fix_grid01 +  "to_wh_loc_cd_nm");
					return false;
				}
				//-----2. to loc qty 0보다 커야한다.(to_wh_loc_cd존재시 수량체크)
				if(to_eq_qty <= 0 && to_wh_loc_cd != "")
				{
					ComShowCodeMessage("COM0114","To Location Qty");
					sheetObj.SelectCell(i, fix_grid01 +  "to_ea_qty");
					return false;
				}
			}
			else //기존건은 무조건 빈값 체크
			{
				//-----1. to loc cd 체크
				if(to_wh_loc_cd == "")
				{
					ComShowCodeMessage("COM0114","To Location Info");
					sheetObj.SelectCell(i, fix_grid01 +  "to_wh_loc_cd_nm");
					return false;
				}
				//-----2. to loc qty 0보다 커야한다.
				if( to_eq_qty <= 0)
				{
					ComShowCodeMessage("COM0114","To Location Qty");
					sheetObj.SelectCell(i, fix_grid01 +  "to_ea_qty");
					return false;
				}
			}
			//-----3. to location정보와 current location정보는 달라야한다.
			if(to_wh_loc_cd == sheetObj.GetCellValue(i, fix_grid01 + "fr_wh_loc_cd").trim())
			{
				ComShowCodeMessage("COM0345");
				sheetObj.SelectCell(i, fix_grid01 +  "to_wh_loc_cd_nm");
				return false;
			}
			//-----4. 동일loc여부체크
			for(var k=0; k<wh_loc_cd_arr.length; k++)
			{
				if(wh_loc_cd_arr[k] == to_wh_loc_cd)
				{
					ComShowCodeMessage("COM0354", sheetObj.GetCellValue(i, fix_grid01 + "to_wh_loc_cd_nm").trim());
					sheetObj.SelectCell(i, fix_grid01 +  "to_wh_loc_cd_nm");
					return false;
				}
			}
			if(to_wh_loc_cd != "")
			{
				wh_loc_cd_arr.push(to_wh_loc_cd);	
			}			
			//-----5. to location의 qty의 합이 fr location qty보다 작은지 체크.
			to_curr_cnt=to_curr_cnt + to_eq_qty;
			var div="";
			if(i + 1 > sheetObj.LastRow()) //마지막
			{
				fr_curr_cnt=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_ea_qty"));
				stock_curr_cnt=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_qty"));
				div="E";
			}
			else
			{
				if(sheetObj.GetCellValue(i, fix_grid01 + "merge_key").trim() != sheetObj.GetCellValue(i + 1, fix_grid01 + "merge_key").trim())
				{
					fr_curr_cnt=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_ea_qty"));
					stock_curr_cnt=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_qty"));
					div="E";
				}
			}
			if(div == "E")
			{
				//--수량체크
				if(fr_curr_cnt > stock_curr_cnt)
				{
					if(stock_curr_cnt < to_curr_cnt)
					{
						ComShowCodeMessage("COM0349", stock_curr_cnt, to_curr_cnt);
						sheetObj.SelectCell(i, fix_grid01 +  "to_ea_qty");
						return false;
					}
				}
				else
				{
					if(fr_curr_cnt < to_curr_cnt)
					{
						ComShowCodeMessage("COM0348",fr_curr_cnt, to_curr_cnt);
						sheetObj.SelectCell(i, fix_grid01 +  "to_ea_qty");
						return false;
					}
				}			
				//--초기화
				to_curr_cnt=0; 
				wh_loc_cd_arr=new Array();
			}
		}
	}
	if(edit_yn_no_n_cnt <= 0 && sAction == "move")
	{
		ComShowCodeMessage("COM0351");
		return false;
	}
	//총합이 0일경우
	var sum_ea_qty=sheetObj.ComputeSum(sheetObj.SaveNameCol(fix_grid01 + "to_ea_qty"));
	if(sum_ea_qty <= 0)
	{
		ComShowCodeMessage("COM0358");
		return false;
	}
	return true;
}
/**
 * 마우스 아웃일때 
 */
function form_deactivate() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "in_plan_no":	
				btn_Search();
			break;	
		}
	}
	var backspace=8; 
    var t=document.activeElement;  
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
	return true;
}
/***
 * AJAX CODE SEARCH
 */
/*
 * Warehouse search
 * OnKeyDown 13 or onChange
 */
function getLocInfo(obj){

	if(obj.value != ""){
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
	}
}
function resultLocInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.wh_nm.value=rtnArr[0];
	   }
	   else{
		formObj.wh_cd.value="";
		formObj.wh_nm.value="";
		formObj.wh_cd_org.value="";
		formObj.wh_nm_org.value="";
	   }
	  }
	  else{
	   formObj.wh_cd.value="";
	   formObj.wh_nm.value=""; 
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
/*
* Contract search
* OnKeyDown 13 or onChange
*/
function getCtrtInfo(obj){

	if(obj.value != ""){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
	}
	else
	{
		var frmObj1 = document.form;
		frmObj1.ctrt_no.value = "";
		frmObj1.ctrt_nm.value = "";
	}
}
function resultCtrtInfo(reqVal) {

	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.ctrt_nm.value=rtnArr[0];
	   }
	   else{
	    formObj.ctrt_no.value="";
	    formObj.ctrt_nm.value=""; 
	   }
	  }
	  else{
	   formObj.ctrt_no.value="";
	   formObj.ctrt_nm.value=""; 
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
function btn_link_ctrt(){
	var formObj=document.form;
	if(!ComIsEmpty(formObj.ctrt_no)){
		var sUrl="./CtrtMgmt.clt?ctrt_no="+formObj.ctrt_no.value;
		parent.mkNewFrame('Contract Management', sUrl , "CtrtMgmt_" + formObj.ctrt_no.value);
	}
}
//Combo Object onChange 이벤트
function cycle_cnt_tp_cd_OnChange(){
	var formObj=document.form;
	var newCode = formObj.cycle_cnt_tp_cd.value;
	commonModeChange(newCode);
}
function zone_cd_OnChange(form){
	searchBlockCodeList();
}
/** 
 * TinLuong Modify
 * Warehouse Code 선택시
 */
function wh_cd_OnChange(comObj, code, text) {
	searchZoneCodeList();
}
function searchZoneCodeList(){
	var formObj=document.form;
	if (!ComIsEmpty(formObj.wh_cd.value)) {
		var sXml=docObjects[0].GetSearchData("./searchWarehouseZoneCodeGS.clt?f_cmd="+SEARCH04+"&f_loc_cd="+formObj.wh_cd.value);
		removeOptions(document.getElementById("zone_cd"));
		var item = document.createElement("option");
        document.getElementById("zone_cd").options.add(item);
        item.text = "ALL";
        item.value = "All";
		if(getTotalRow(sXml)){
			var xmlDoc = $.parseXML(sXml);
			var $xml = $(xmlDoc);
			var code= $xml.find("zone_cd").text();
			if(code != null && code != ""){
				var codeList=code.split("|");
				for(var i=0;i<codeList.length;i++){
					var items = document.createElement("option");
			        // Add an Option object to Drop Down/List Box
			        document.getElementById("zone_cd").options.add(items);
			        // Assign text and value to Option object
			        items.text = codeList[i];
			        items.value = codeList[i];
				}
			} 
		}
		formObj.zone_cd.value = "All";
	}
}
function removeOptions(selectbox)
{
    var i;
    for(i=selectbox.options.length-1;i>=0;i--)
    {
        selectbox.remove(i);
    }
}
function getTotalRow(xmlStr)
{
	var xmlDoc = $.parseXML(xmlStr); 
	var $xml = $(xmlDoc);
	if( $xml.find("DATA").length == 0  ){
		 return null;
	}
	return $xml.find("DATA")[0].getAttribute("TOTAL")
		
}
function searchBlockCodeList(){
	var formObj=document.form;
	var sXml=docObjects[0].GetSearchData("./searchWarehouseBlockCodeGS.clt?f_cmd="+SEARCH05+"&f_loc_cd="+formObj.wh_cd.value+"&f_zone_cd="+formObj.zone_cd.value);
	removeOptions(document.getElementById("block_cd"));
	var item = document.createElement("option");
    document.getElementById("block_cd").options.add(item);
    item.text = "ALL";
    item.value = "All";
	if(getTotalRow(sXml)){
		var xmlDoc = $.parseXML(sXml);
		var $xml = $(xmlDoc);
		var code= $xml.find("block_cd").text();
		if(code != null && code != ""){
			var codeList=code.split("|");
			for(var i=0;i<codeList.length;i++){
			var items = document.createElement("option");
	        document.getElementById("block_cd").options.add(items);
	        items.text = codeList[i];
	        items.value = codeList[i];
			} 
		}
	}
}
function getInboundLocInfo(div){	
	if($("#wh_loc_nm").val() == "")
	{
		$("#wh_loc_cd").val("");
		$("#wh_loc_nm_org").val("");
		if(div == "e")
		{
			btn_Search();
		}
		return;
	}
	var formObj=document.form;
	if(ComIsEmpty(formObj.wh_cd))
	{
		ComShowCodeMessage("COM0114","Warehouse");
		$("#wh_loc_nm").val("");
		$("#wh_cd").focus();
		return;
	}
	var sParam="?f_cmd="+COMMAND01+"&f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm=" + $("#wh_loc_nm").val() + "&f_putaway_flg=Y" + "&f_cmd=" + COMMAND01;
	
	var sXml = docObjects[0].GetSearchData("./searchWarehouseLocInfoForNameGS.clt"+sParam);
	/*var sXml=docObjects[0].GetSearchData("searchWarehouseLocInfoForName.clt?"+sParam);
	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
	}*/
	resultPutawayLocInfo(sXml, div);
}
function resultPutawayLocInfo(sXml, div) {
	var xmlDoc = $.parseXML(sXml);
	var $xml = $(xmlDoc);
	if($xml.find( "wh_loc_cd").text() != ""){
		$("#wh_loc_nm").val($xml.find("wh_loc_nm").text());
		$("#wh_loc_nm_org").val($xml.find("wh_loc_nm").text());
		$("#wh_loc_cd").val($xml.find("wh_loc_cd").text());
		if(cur_div == "e")
		{
			btn_Search();
		}
	}else{
		$("#wh_loc_nm").val("");
		$("#wh_loc_nm_org").val("");
		$("#wh_loc_cd").val("");
		$("#wh_loc_nm").focus();
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
		objEnd.value='';
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
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(){
	var formObj = document.form;
	var countwd = 0;
	//List Warehouse from TB_SEQ
	var wh_list_ath = formObj.wh_list_ath.value;
	var arrwhcd =  wh_list_ath.split(',');
	//List warehouse default in User Entry Screen.
	var wh_cfg = formObj.wh_cfg.value;
	var arrwhcd_df =  wh_cfg.split(',');
	
	//Warehosue selected.
	var warehouse = formObj.wh_cd.value;
	for(var i = 0; i < arrwhcd_df.length; i ++){
		for(var j = 0; j < arrwhcd.length; j ++){
			if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("btnSave");
	}else{
		ComBtnEnable("btnSave");
	}
}