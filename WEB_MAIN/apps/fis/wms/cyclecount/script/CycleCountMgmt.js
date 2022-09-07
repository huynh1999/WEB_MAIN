/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CycleCountMgmt.js
*@FileTitle  : Cycle Count Management
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/20
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var fix_grid01="Grd01";
var selectCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var loading_flag="N";
var firCalFlag = false;

var FORMAT_CUSTOMER_CD = "0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\";
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
	var formObj = document.form;
	doShowProcess();
	//sheet
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
    /*for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }*/
    doHideProcess();
    loading_flag="Y";
	//control
	initControl();
	//기본
	$("#move_dt").val(ComGetNowInfo());
	$("#wh_cd").val($("#def_wh_cd").val());
	$("#wh_nm").val($("#def_wh_nm").val());
	
	$("#ctrt_no").val($("#def_wh_ctrt_no").val());
	$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());

	$("#wh_cd_org").val($("#wh_cd").val());
	$("#wh_nm_org").val($("#wh_nm").val());
	$("#ctrt_no_org").val($("#ctrt_no").val());
	$("#ctrt_nm_org").val($("#ctrt_nm").val());
	commonModeChange("INIT");
	ComEnableObject(formObj.wh_cd, false);
	if(form.cycle_cnt_no.value != ""){
		btn_Search();
	}
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/*
 * wave화면에서 link로 넘어온경우(Inventory Replenishment)
 */
// Function not use
function searchWaveUnAllocatedList() {
	var formObj = document.form;
	formObj.f_cmd.value = SEARCH02;
	var sheetObj = docObjects[0];
	var sXml = "";
	sXml = sheetObj.GetSearchData("./searchInvMoveMgmtForWaveUnList.clt", FormQueryString(formObj, null,""));
//	var xml = convertColOrder(sXml, fix_grid01);
	sheetObj.LoadSearchData(sXml, {Sync:1} );
}
/*
 * 각모드별 화면을 init셋팅
 */
function commonModeChange(mode) {
	switch(mode){
		case "INIT":
			ComBtnDisable("btnSave");
			ComBtnDisable("btn_cancel");
			ComBtnDisable("btnExcel");
			ComBtnDisable("btnPrint");
			ComBtnDisable("btn_add");
			ComBtnDisable("btn_del");
			break;
		case "SEARCH": 
			ComBtnEnable("btnSave");
			ComBtnEnable("btn_cancel");
			ComBtnEnable("btnExcel");
			//ComBtnEnable("btnPrint"); Tinluong comment untill have new function print
			ComBtnEnable("btn_add");
			ComBtnEnable("btn_del");
			break;
	}
}
function headerInfoChange(flg){
	var formObj=document.form;
	if(flg == true)
		formObj.wh_cd.disabled = false;
	else formObj.wh_cd.disabled = true;
	ComEnableObject(formObj.ctrt_no, flg);
	ComEnableObject(formObj.ctrt_nm, flg);
	ComEnableObject(formObj.move_dt, true);
	ComEnableObject(formObj.move_hm_fr, true);
	ComEnableObject(formObj.move_hm_to, true);
	ComEnableObject(formObj.supv_nm, true);
	ComEnableObject(formObj.work_nm, true);
	ComEnableObject(formObj.rmk, true);
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
			ComBtnEnable("btn_move_dt");
			break;
		case "NEW" :
			ComBtnEnable("btnSave");
			ComBtnEnable("btn_add");
			ComBtnDisable("btn_del");
			ComBtnEnable("btn_wh_cd");
			ComBtnEnable("btn_ctrt_no");
			ComBtnEnable("btn_move_dt");
			break;
		case "SEARCH_BEF" :
			ComBtnDisable("btnSave");
			ComBtnDisable("btn_add");
			ComBtnDisable("btn_del");
			ComBtnDisable("btn_wh_cd");
			ComBtnDisable("btn_ctrt_no");
			ComBtnEnable("btn_move_dt");
		break;
		case "SEARCH_P" :
			ComBtnEnable("btnSave");
			ComBtnEnable("btn_add");
			ComBtnEnable("btn_del");
			ComBtnDisable("btn_wh_cd");
			ComBtnDisable("btn_ctrt_no");
			ComBtnEnable("btn_move_dt");
		break;
		case "SEARCH_C" :
			ComBtnDisable("btnSave");
			ComBtnDisable("btn_add");
			ComBtnDisable("btn_del");
			ComBtnDisable("btn_wh_cd");
			ComBtnDisable("btn_ctrt_no");
			ComBtnDisable("btn_move_dt");
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
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
 function initCombo(comboObj, comboNo) {
	var vTextSplit=null;
	var vCodeSplit=null;
	switch(comboObj.options.id) {
		case "cycle_cnt_tp_cd":
			vTextSplit=cycle_cnt_tp_cdText.split("|");
			vCodeSplit=cycle_cnt_tp_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("A");
        	}
			break;
	}
} 
/*
 * init sheet
 */
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet1":
	    with(sheetObj){        
      
      var headers = [  { Text:getLabel('CycleCountMgmt_HDR1'), Align:"Center"},
	                   { Text:getLabel('CycleCountMgmt_HDR2'), Align:"Center"} ];
      
      var prefix="Grd01";

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };

      InitHeaders(headers, info);

      var cols = [ {Type:"CheckBox",  Hidden:0, 	Width:30, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"chk"},
                   {Type:"Text",     	Hidden:0,  	Width:100, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"item_cd", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  	Width:180, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"item_nm", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  	Width:130, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"lot_no", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  	Width:70, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"zone_cd", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  	Width:70, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"block_cd", 		KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  	Width:70, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"prop_cd", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  	Width:70, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wh_loc_cd_nm", 	KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Int",     	Hidden:0,  	Width:70, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"inv_qty", 			KeyField:0, Format:"", PointCount:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     	Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"cbm", 				KeyField:0, Format:"Float", PointCount:WMS_CBM_POINT_COUNT, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     	Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"grs_kgs", 			KeyField:0, Format:"Float", PointCount:3, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     	Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"net_kgs", 			KeyField:0, Format:"Float", PointCount:3, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Int",     	Hidden:0,  	Width:70, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"cnt_qty", 			KeyField:0, Format:"Integer", PointCount:0, UpdateEdit:1,   InsertEdit:1, EditLen: 15},
                   {Type:"Int",     	Hidden:0,  	Width:70, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"gap_qty", 			KeyField:0, Format:"Integer", PointCount:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  	Width:150, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"rmk", 				KeyField:0, Format:"", UpdateEdit:1,   InsertEdit:1},
                   {Type:"Text",     	Hidden:0,  	Width:100, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wib_bk_no", 		KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Date",     	Hidden:0,  	Width:100, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"inbound_dt", 		KeyField:0, Format:"Ymd", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  	Width:100, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"po_no", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Date",     	Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"exp_dt", 			KeyField:0, Format:"Ymd", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  	Width:80, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"lot_04", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  	Width:80, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"lot_05", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  	Width:120, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lot_id", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      	Hidden:0, 	Width:80, 	Align:"Right",  	ColMerge:0,		SaveName:prefix+"item_ser_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		           {Type:"Text",      	Hidden:0, 	Width:80, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"lic_plat_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
                   {Type:"Combo",     	Hidden:0,  	Width:100, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wh_cd", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      	Hidden:1, 	Width:100, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"so_no", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      	Hidden:1, 	Width:100, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"po_sys_no", 		KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      	Hidden:1, 	Width:100, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"item_sys_no", 		KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      	Hidden:1, 	Width:70, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wh_loc_cd", 		KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      	Hidden:1, 	Width:70, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"ctrt_no", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      	Hidden:1, 	Width:70, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"cycle_cnt_no", 	KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Status",    	Hidden:1, 	Width:140, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"ibflag", 			KeyField:0, Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
       
      InitColumns(cols);
      SetSheetHeight(400);
      SetHeaderRowHeight(30);
      resizeSheet();
      SetEditable(1);
      SetUnicodeByte(3);
	  SetColProperty(prefix+"wh_cd", {ComboText:"|"+WHNMLIST, ComboCode:"|"+WHCDLIST} );
      SetColProperty(0 ,prefix+"wh_loc_cd_nm", {AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
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
function resizeSheet(){
	 ComResizeSheet(docObjects[0]);
	}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=docObjects[0];
	var cnt=0;
//	if(sheetObj.RowCount()>0)
//	{
//		doDispPaging(docObjects[0].GetCellValue(2, "Indexing"), getObj('pagingTb'));
//		for ( var i = sheet1.HeaderRows(); i < sheet1.HeaderRows()+sheetObj.RowCount(); i++) {
//			sheet1.SetCellEditable(i,"Grd01chk",0);
//		}
//	}
//	check_authority_wh(); // Check Authority Warehouse code
	
	// #1407 [WMS4.0] Warehouse > Inventory > Cycle Count Plan - Can't input Contact No.
	var sheetObj = docObjects[0];
	if (!ComIsNull(sheetObj.GetCellValue(2, fix_grid01+"ctrt_no"))) {
		$("#ctrt_no").val(sheetObj.GetCellValue(2, fix_grid01 + "ctrt_no"));
		$("#ctrt_no").focus();
		$("#worker_nm").focus();
	}
	doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
}
/*
 * sheet1 onchange event
 */
function sheet1_OnChange(sheetObj, row, col, Value) {
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "Grd01cnt_qty"){
		sheetObj.SetCellValue(row, "Grd01gap_qty",Number(sheetObj.GetCellValue(row, "Grd01inv_qty")) - Number(sheetObj.GetCellValue(row, "Grd01cnt_qty")));
	}
	//sheetObj.SetCellValue(row, "Grd01chk",1);
}
/*
 * sheet1 dbclick event
 */
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
}
/*
 * sheet1 popupclick event
 */
function sheet1_OnPopupClick(sheetObj, Row, Col) {
	var colName=sheetObj.ColSaveName(Col);
	//var colValue = sheetObj.CellValue(Row, Col) ;
}
/*
 * onclick
 */
function sheet1_OnClick(sheetObj, Row, Col) {
	var colName=sheetObj.ColSaveName(Col);
	switch (colName)
	{
		case fix_grid01 + "add_row_img":
			addRow(sheetObj, Row, Col);
			break;
		case fix_grid01 + "del_row_img":
			delRow(sheetObj, Row, Col);
			break;
	}
}
/*
 * row add button on click
 */
function addRow(sheetObj, Row, Col){
row_cnt=ComParseInt(sheetObj.GetCellValue(Row, fix_grid01 + "add_row_cnt"));
	for (var i=0; i<row_cnt; i++) {
		var row=sheetObj.DataInsert(); // 현재 선택된 행의 바로 아래에 생성
		sheetObj.SetCellValue(row, fix_grid01+"merge_key",sheetObj.GetCellValue(Row, fix_grid01+"merge_key"),0);
		sheetObj.SetCellValue(row, fix_grid01+"wh_cd",sheetObj.GetCellValue(Row, fix_grid01+"wh_cd"),0);
		sheetObj.SetCellValue(row, fix_grid01+"ctrt_no",sheetObj.GetCellValue(Row, fix_grid01+"ctrt_no"),0);
		sheetObj.SetCellValue(row, fix_grid01+"chk",sheetObj.GetCellValue(Row, fix_grid01+"chk"),0);
		sheetObj.SetCellValue(row, fix_grid01+"item_sys_no",sheetObj.GetCellValue(Row, fix_grid01+"item_sys_no"),0);
		sheetObj.SetCellValue(row, fix_grid01+"po_sys_no",sheetObj.GetCellValue(Row, fix_grid01+"po_sys_no"),0);
		sheetObj.SetCellValue(row, fix_grid01+"lot_id",sheetObj.GetCellValue(Row, fix_grid01+"lot_id"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_wh_loc_cd",sheetObj.GetCellValue(Row, fix_grid01+"fr_wh_loc_cd"),0);
		sheetObj.SetCellValue(row, fix_grid01+"move_no",sheetObj.GetCellValue(Row, fix_grid01+"move_no"),0);
		sheetObj.SetCellValue(row, fix_grid01+"item_cd",sheetObj.GetCellValue(Row, fix_grid01+"item_cd"),0);
		sheetObj.SetCellValue(row, fix_grid01+"item_nm",sheetObj.GetCellValue(Row, fix_grid01+"item_nm"),0);
		sheetObj.SetCellValue(row, fix_grid01+"lot_no",sheetObj.GetCellValue(Row, fix_grid01+"lot_no"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_ea_qty",sheetObj.GetCellValue(Row, fix_grid01+"fr_ea_qty"),0);
		sheetObj.SetCellValue(row, fix_grid01+"stock_qty",sheetObj.GetCellValue(Row, fix_grid01+"stock_qty"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_wh_loc_cd_nm",sheetObj.GetCellValue(Row, fix_grid01+"fr_wh_loc_cd_nm"),0);
		sheetObj.SetCellValue(row, fix_grid01+"wib_bk_no",sheetObj.GetCellValue(Row, fix_grid01+"wib_bk_no"),0);
		sheetObj.SetCellValue(row, fix_grid01+"inbound_dt",sheetObj.GetCellValue(Row, fix_grid01+"inbound_dt"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_mv_tp_cd",sheetObj.GetCellValue(Row, fix_grid01+"fr_mv_tp_cd"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_mv_tp_cd_nm",sheetObj.GetCellValue(Row, fix_grid01+"fr_mv_tp_cd_nm"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_wh_loc_prop_cd",sheetObj.GetCellValue(Row, fix_grid01+"fr_wh_loc_prop_cd"),0);
		sheetObj.SetCellValue(row, fix_grid01+"so_no",sheetObj.GetCellValue(Row, fix_grid01+"so_no"),0);
		sheetObj.SetCellValue(row, fix_grid01+"po_no",sheetObj.GetCellValue(Row, fix_grid01+"po_no"),0);
		//row add, row cnt, row delet 버튼 셋팅
 		sheetObj.SetCellImage(row,  fix_grid01 + "add_row_img","addIcon");
		sheetObj.SetCellValue(row, fix_grid01 + "add_row_cnt",1,0);
 		sheetObj.SetCellImage(row,  fix_grid01 + "del_row_img","delIcon");
		//stock selection 팝업에서 add한건은 체크불가능하도록
 		var plan_no=sheetObj.GetCellValue(Row, fix_grid01+"plan_no").trim();
		if(plan_no == "")
		{
			sheetObj.SetCellEditable(row , fix_grid01+"chk",0);
		}
		//추가된row의 wib_bk_no 색상변경
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(row, fix_grid01 + "wib_bk_no","#0100FF");
 		sheetObj.SetCellFontUnderline(row, fix_grid01 + "wib_bk_no", 1);
	}
}
/*
 * row delete button on click
 */
function delRow(sheetObj, Row, Col) {
	//plan_no가 없는건 = 화면에서 add한건만 행삭제
	sheetObj.RowDelete(Row);
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
	ComSetObjValue(formObj1.downloadLocation,  sheetObj.GetCellValue(Row, fix_grid01 + "file_path") + sheetObj.GetCellValue(Row, fix_grid01+ "file_sys_nm"));
	ComSetObjValue(formObj1.downloadFileName, sheetObj.GetCellValue(Row, fix_grid01 + "file_org_nm"));
	formObj1.target="downiframe";
	formObj1.submit();
}
/*
 * 파일업로드
 */
// Function not use
function fileUpload(sheetObj, Row, Col){
	var sUrl="./InvMoveFileUploadPopup.clt?move_no="  + sheetObj.GetCellValue(Row, fix_grid01 + "move_no")
	+ "&move_seq=" + sheetObj.GetCellValue(Row, fix_grid01 + "plan_seq");
	ComOpenPopup(sUrl, 700, 130, "setFileInfoInfo", "0,0", true);
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
	sheetObj.DoSearch("./searchInvMoveMgmtForDtl.clt", "in_plan_no=" + formObj.plan_no.value);
}
/* 
 * File Delete
 */
// Function not use
function fileDelete(sheetObj, Row, Col) {
	if (ComShowCodeConfirm("COM0053")) { // Do you want to delete?
		var sParam="move_no="		+ sheetObj.GetCellValue(Row, fix_grid01 + "move_no")
		+ "&move_seq="	+ sheetObj.GetCellValue(Row, fix_grid01 + "plan_seq") //move_seq=plan_no
		+ "&file_seq="	+ sheetObj.GetCellValue(Row, fix_grid01 + "file_seq");
		if (sParam == "") { return; }
 		var sXml = sheetObj.GetSaveData("./removeFileInvMoveFile.clt", sParam);
 		sheetObj.LoadSaveData(sXml);
		//SaveEnd
		if( sXml.indexOf('<MESSAGE>') == -1){
			reSearch();//재조회
		}
	}
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_move_dt":
 				if (document.getElementById('btn_move_dt').disabled){
 					return;
 				}
				var cal=new ComCalendar();
	            cal.select(formObj.move_dt, 'MM-dd-yyyy');
				break;
			case "btn_cycle_cnt_dt":
				if (document.getElementById('btn_cycle_cnt_dt').disabled) {
					return;
				}
				var cal=new ComCalendar();
	            cal.select(formObj.cycle_cnt_dt, 'MM-dd-yyyy');
				break;
 			case "btn_ctrt_no" :
 				if (document.getElementById('btn_wh_cd').disabled){
 					return;
 				}
 				CtrtPopup();
				break;
 			case "SEARCHLIST" :
 				btn_Search();
				break;
 			case "SAVE" :
 				btn_Save();
				break;
 			case "btn_cancel" :
 				btn_Cancel();
				break;
 			case "EXCEL" :
 				btn_Excel();
				break;
 			case "PRINT" :
 				btn_Print();
				break;
 			case "btn_add" :
 				btn_Add();
				break;
 			case "btn_del" :
 				btn_Del();
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
	if (ComDisableTdButton("btn_ctrt_no", 2)) {
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
	
	
	var formObj=document.form;
	var sUrl="./ContractRoutePopup.clt?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;
	       
	callBackFunc = "setCtrtNoInfo";
	modal_center_open(sUrl, callBackFunc, 900, 580, "yes");
}
/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(aryPopupData){
	var formObj = document.form;
	
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

/*
 * 팝업 관련 로직 끝
 */
/*
 * 조회
 */
var InputName="wh_cd|wh_nm|ctrt_no|ctrt_nm|cycle_cnt_tp_cd|cycle_cnt_tp_nm|worker_nm|cycle_cnt_dt|cycle_cnt_hm_fr|cycle_cnt_hm_to|rmk";
function btn_Search() {
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if(loading_flag != "Y"){
		return;
	}
	if(ComIsEmpty(formObj.cycle_cnt_no)){
		ComShowCodeMessage("COM0114","Cycle Count Key");
		$("#cycle_cnt_no").focus();
		return;
	}
	for(var i=0; i<2; i++){
		if(i == 0){
			formObj.f_cmd.value = SEARCH;
			var sXml = sheet1.GetSearchData("./searchCycleCountMgmtInfoGS.clt", FormQueryString(formObj,""));
	   		var xmlDoc = $.parseXML(sXml);
	   		var $xml = $(xmlDoc);
	   		if($xml.find("wh_cd").text() == ""){
	   			ComShowCodeMessage("COM0185");
	   			//docObjects[0].RemoveAll();
	   			
	   			var params1 = "f_cmd="+ SEARCH01+"&cycle_cnt_no="+formObj.cycle_cnt_no.value;
		   		sheet1.DoSearch("./searchCycleCountMgmtListGS.clt" , params1);
		   		$("#move_dt").val(ComGetNowInfo());
		   		$("#wh_cd").val($("#def_wh_cd").val());
		   		$("#wh_nm").val($("#def_wh_nm").val());
		   		$("#ctrt_no").val($("#def_wh_ctrt_no").val());
		   		$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
		   		$("#wh_cd_org").val($("#wh_cd").val());
		   		$("#wh_nm_org").val($("#wh_nm").val());
		   		$("#ctrt_no_org").val($("#ctrt_no").val());
		   		$("#ctrt_nm_org").val($("#ctrt_nm").val());
		   		$("#cycle_cnt_tp_cd").val("");
		   		$("#cycle_cnt_tp_nm").val("");
		   		$("#worker_nm").val("");		
		   		$("#rmk").val("");
		   		$("#cycle_cnt_dt").val("");
		   		$("#cycle_cnt_hm_fr").val("");
		   		$("#cycle_cnt_hm_to").val("");
		   		commonModeChange("INIT");
		   		ComEnableObject(formObj.wh_cd, false);
		   		doDispPaging(docObjects[0].GetCellValue(2, "Indexing"), getObj('pagingTb'));
	   			return;
	   		}else{
	   			displayData(sXml);
	   		}
		}else{
			formObj.f_cmd.value = SEARCH01;
			sheet1.DoSearch("./searchCycleCountMgmtListGS.clt", FormQueryString(formObj,""));
	   		commonModeChange("SEARCH");
		}	   		
	}
}

function displayData(xml){
	var xmlDoc = $.parseXML(xml);
	var $xml = $(xmlDoc);
	$("#wh_cd").val($xml.find("wh_cd").text());
	$("#wh_nm").val($xml.find("wh_nm").text());
//	$("#ctrt_no").val($xml.find("ctrt_no").text());
//	$("#ctrt_nm").val($xml.find("ctrt_nm").text());
	$("#cycle_cnt_tp_cd").val($xml.find("cycle_cnt_tp_cd").text());
	$("#cycle_cnt_tp_nm").val($xml.find("cycle_cnt_tp_nm").text());
	$("#worker_nm").val($xml.find("worker_nm").text());		
	$("#rmk").val($xml.find("rmk").text());
	
	if($xml.find("cycle_cnt_dt").text() == null || $xml.find("cycle_cnt_dt").text() == ""){			
		$("#cycle_cnt_dt").val("");
	}else{
		var date = $xml.find("cycle_cnt_dt").text();
		var year = date.substring(0, 4);
		var month = date.substring(4, 6);
		var day = date.substring(6, 8);
		
		var result = month +"-"+ day +"-"+ year;
		$("#cycle_cnt_dt").val(result);
	}
	
	if($xml.find("cycle_cnt_hm_fr").text() == null || $xml.find("cycle_cnt_hm_fr").text() == "" || $xml.find("cycle_cnt_hm_fr").text() == ":"){
		$("#cycle_cnt_hm_fr").val("");
	}else{
		$("#cycle_cnt_hm_fr").val($xml.find("cycle_cnt_hm_fr").text());
	}
	
	if($xml.find("cycle_cnt_hm_to").text() == null || $xml.find("cycle_cnt_hm_to").text() == "" || $xml.find("cycle_cnt_hm_to").text() == ":"){
		$("#cycle_cnt_hm_to").val("");
	}else{
		$("#cycle_cnt_hm_to").val($xml.find("cycle_cnt_hm_to").text());
	}
}

function btn_Save(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	//validation check
	if (validateForm(formObj, 'save') == false){
		return;
	}
	/*
	 * TinLuong Comment, Save without selected row. 
	 * if(sheetObj.CheckedRows("Grd01chk") == 0){
		ComShowCodeMessage("COM0359");
		return;
	}*/
	//confirm     
	if(!ComShowCodeConfirm("COM0063")){
		return;
	}
	formObj.f_cmd.value = MULTI;
	var sParam = FormQueryString(formObj, "Grd00");
	sParam += "&" + ComGetSaveString(sheetObj,  true, false);
 	var saveXml = sheetObj.GetSaveData("./saveWHCyclecountMgmtInfo.clt", sParam);
	//1. Save 후 조회
	if( saveXml.indexOf('<ERROR>') == -1){
//		ComShowCodeMessage("COM0093", "");
		//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		btn_Search();
	}
}
/*
 * New Button
 */
function btn_New() {
	return;
	commonModeChange("NEW");
}
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
	if(formObj.wh_cd.value != ""){
		var sUrl="./WHOutStockSelectPopup.clt?" + sParam;
	    callBackFunc = "setStockInfo";
	    modal_center_open(sUrl, callBackFunc, 1280, 630, "yes");
	}else{
		ComShowCodeMessage("COM12233");
		return;
	}
}
function setStockInfo(rtnValAry){
	var formObj = document.form;
	var sheetObj = docObjects[0];
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
function btn_Cancel(){
	var formObj = document.form;
	var sheetObj = docObjects[0];
	if (ComShowCodeConfirm("COM0040") == false){
		return;
	}
	formObj.f_cmd.value = MULTI01;
	sParam = FormQueryString(formObj, "");	
 	saveXml = sheetObj.GetSaveData("./cancelWHCyclecountMgmtInfo.clt", sParam);
	sheetObj.LoadSearchData(saveXml, {Sync:1} );
	//1. Save 후 조회
	if( saveXml.indexOf('<ERROR>') == -1){
//		ComShowCodeMessage("COM0079", "");
		
		//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		
		commonModeChange("INIT");
	}
}
function btn_Del(){
	/* TinLuong comment
	 * var sheetObj=docObjects[0];
	if(sheetObj.RowCount()> 0){
		ComRowHideDelete(sheetObj, "Grd01chk");
	}
	sheetObj.CheckAll("Grd01chk",0);*/
	var sheetObj=sheet1;
	var sRow=sheetObj.FindCheckedRow("Grd01chk");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	//가져온 행을 배열로 만들기 
	var arrRow=sRow.split("|"); //결과 : "1|3|5|"
	//삭제처리
	for (var i= arrRow.length - 1; i >= 0; i--){		
		if(sheetObj.GetCellValue(arrRow[i], "Grd01ibflag") == "I") //신규등록된건만 삭제
		{
			sheetObj.RowDelete(arrRow[i], true);
		}
	}
}
function btn_Print(){
	var formObj = document.form;
	if(sheet1.RowCount() > 0){
		var fileName = "";
	    var param= "";
	    formObj.title.value="E-SOP Doc Download";
	    fileName += 'WH_INV_MOVE_WORK.mrd';
	      param += "[" + $("#plan_no").val() + "]"; //파라메타 입력
	      formObj.file_name.value= fileName;
	    formObj.rd_param.value=param;
	    popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	}else{
		ComShowMessage("No data to Print !!!");
	}
}
/*
 * 엑셀
 */
function btn_Excel(){
	if(docObjects[0].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
     	sheet1.Down2Excel( { SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1 });
    }
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) 
		{
			case 'search':
				if(ComIsEmpty(formObj.cycle_cnt_no)){
					ComShowCodeMessage("COM0114","Cycle Count Key");
					$("#cycle_cnt_no").focus();
					return false;
				}
				break;
			case 'add':
				//warehouse 필수로 입력되어야함.
				if(ComIsEmpty(formObj.wh_cd)){
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				//contract no 필수로 입력되어야함.
				if(ComIsEmpty(formObj.ctrt_no)){
					ComShowCodeMessage("COM0114","Contract No");
					$("#ctrt_no").focus();
					return false;
				}	
			break;
			case 'save':
				//warehouse 필수로 입력되어야함.
				if(ComIsEmpty(formObj.wh_cd)){
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				//contract no 필수로 입력되어야함.
				if(ComIsEmpty(formObj.ctrt_no))	{
					ComShowCodeMessage("COM0114","Contract No");
					$("#ctrt_no").focus();
					return false;
				}
				break;
		}
	}
	return true;
}
function saveSheetCommon(sheetObj, sAction){
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
	var formObj = document.form;
	var srcName = ComGetEvent("name");
	var srcValue = ComGetEvent("value");
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "cycle_cnt_no":	
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
	var formObj=document.form;
	if(formObj.value != ""){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
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
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;
	btn_Search();
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	btn_Search();
}

function searchList(){
	document.forms[0].f_CurPage.value=1;
	btn_Search();
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

function isValidNumberLength(value, realLen, pointCount){
	
	if(value == "") return true;
	
	if(value.split(".")[0].length > realLen) return false;
	
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
		ComBtnDisable("btn_cancel");
	}else{
		ComBtnEnable("btnSave");
		ComBtnEnable("btn_cancel");
	}
}

/*
 * #1407 [WMS4.0] Warehouse > Inventory > Cycle Count Plan - Can't input Contact No.
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