/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CycleCountList.js
*@FileTitle  : Cycle Count Search
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/14
=========================================================--*/

var sheetCnt=0;
var fix_grid01="Grd01";
var selectCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var docObjects=new Array();
var FORMAT_CUSTOMER_CD = "0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\";
var firCalFlag = false;
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
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
    for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }
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
	if(form.cycle_cnt_no.value != ""){
		btn_Search();
	}
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

function commonModeChange(mode) {
	switch(mode){
		case "INIT":
			ComEnableButton("btn_excel",	false,	1);
			break;
		case "SEARCH": 
			ComEnableButton("btn_excel",	true,	1);
			break;
	}
}
/*
 * init control
 */
function initControl() {
//	var formObject=document.form;
//	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//	//- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
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
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("ALL");
        	}
		break;
		case "gap_tp":
			var txt="ALL|Y|N";
			var val="ALL|Y|N";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				//comboObj.index=0;
				comboObj.SetSelectCode("ALL");
        	} 			
			break;
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
      
      var headers = [  { Text:getLabel('CycleCountList_HDR1'), Align:"Center"},
	                   { Text:getLabel('CycleCountList_HDR2'), Align:"Center"} ];
     
      var prefix="Grd01";

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };

      InitHeaders(headers, info);

      var cols = [ {Type:"Text",     Hidden:0,  Width:120,Align:"Left",ColMerge:1,SaveName:prefix+"cycle_cnt_no", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",     Hidden:0,  		Width:160,Align:"Left",ColMerge:1,SaveName:prefix+"cycle_cnt_tp_nm", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Date",     Hidden:0,  		Width:80,Align:"Left",ColMerge:1,SaveName:prefix+"cycle_cnt_dt", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
             {Type:"Text",     Hidden:0,  Width:100,Align:"Center",ColMerge:1,SaveName:prefix+"item_cd", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",     Hidden:0,  Width:160,Align:"Left",ColMerge:1,SaveName:prefix+"item_nm", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",     Hidden:0,  Width:110,Align:"Center",ColMerge:1,SaveName:prefix+"lot_no", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",     Hidden:0,  Width:100,Align:"Left",ColMerge:1,SaveName:prefix+"wh_loc_cd_nm", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Int",     Hidden:0,  Width:70,Align:"Right",ColMerge:1,SaveName:prefix+"inv_qty", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"Integer",   PointCount:0 },
             {Type:"Float",     Hidden:0,  Width:80,Align:"Right",ColMerge:1,SaveName:prefix+"cbm", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"Float",   PointCount:WMS_CBM_POINT_COUNT },
             {Type:"Float",     Hidden:0,  Width:80,Align:"Right",ColMerge:1,SaveName:prefix+"grs_kgs", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"Float",   PointCount:3 },
             {Type:"Float",     Hidden:0,  Width:80,Align:"Right",ColMerge:1,SaveName:prefix+"net_kgs", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"Float",   PointCount:3 },
             {Type:"Float",     Hidden:0,  Width:70,Align:"Right",ColMerge:1,SaveName:prefix+"cnt_qty", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"Integer",   PointCount:0 },
             {Type:"Float",     Hidden:0,  Width:70,Align:"Right",ColMerge:1,SaveName:prefix+"gap_qty", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"Integer",   PointCount:0 },
             {Type:"Text",     Hidden:0,  Width:150,Align:"Left",ColMerge:1,SaveName:prefix+"rmk", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",     Hidden:0,  Width:120,Align:"Center",ColMerge:1,SaveName:prefix+"wib_bk_no", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Date",     Hidden:0,  Width:100,Align:"Center",ColMerge:1,SaveName:prefix+"inbound_dt", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
             {Type:"Text",     Hidden:0,  Width:100,Align:"Left",ColMerge:1,SaveName:prefix+"po_no", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Date",     Hidden:0,  Width:80,Align:"Center",ColMerge:1,SaveName:prefix+"exp_dt", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
             {Type:"Text",     Hidden:0,  Width:80,Align:"Left",ColMerge:1,SaveName:prefix+"lot_04", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",     Hidden:0,  Width:80,Align:"Left",ColMerge:1,SaveName:prefix+"lot_05", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",     Hidden:0,  Width:120,Align:"Center",ColMerge:1,SaveName:prefix+"lot_id", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",      Hidden:0, 	Width:80, 	Align:"Right",  	ColMerge:0,		SaveName:prefix+"item_ser_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
	         {Type:"Text",      Hidden:0, 	Width:80, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"lic_plat_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
             {Type:"Combo",     Hidden:0,  Width:100,Align:"Center",ColMerge:1,SaveName:prefix+"wh_cd", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",      Hidden:1, Width:100,Align:"Center",ColMerge:1,SaveName:prefix+"so_no", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",      Hidden:1, Width:100,Align:"Center",ColMerge:1,SaveName:prefix+"po_sys_no", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",      Hidden:1, Width:100,Align:"Center",ColMerge:1,SaveName:prefix+"item_sys_no", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",      Hidden:1, Width:70,Align:"Center",ColMerge:1,SaveName:prefix+"wh_loc_cd", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
             {Type:"Text",      Hidden:1, Width:70,Align:"Center",ColMerge:1,SaveName:prefix+"ctrt_no", KeyField:0,    UpdateEdit:0,   InsertEdit:0,   Format:"" },
      	     {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
       
	      InitColumns(cols);
	      SetSheetHeight(450);
	      SetEditable(1);
	      SetUnicodeByte(3);
		  SetColProperty(prefix+"wh_cd", {ComboText:"|"+WHNMLIST, ComboCode:"|"+WHCDLIST} );
	      SetColProperty(0 ,prefix+"wh_loc_cd_nm" , {AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
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
function resizeSheet(){
	 ComResizeSheet(docObjects[0]);
	}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(sheetObj, ErrMsg){
	var sheetObj=docObjects[0];
	for(var i=2; i<=sheetObj.LastRow();i++){
		sheetObj.SetCellFontColor(i, "Grd01cycle_cnt_no","#0100FF");
		sheetObj.SetCellFontUnderline(i, "Grd01cycle_cnt_no", 1);
	}
	if(sheetObj.RowCount()>0)
	{
		doDispPaging(docObjects[0].GetCellValue(2, "Indexing"), getObj('pagingTb'));
	}else{
		doDispPaging("", getObj('pagingTb'));
	}
	mergeCell(2);
	doHideProcess(false);
}
/*
 * sheet1 dbclick event
 */
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	if (colName == "Grd01cycle_cnt_no") {
		var sUrl="./CycleCountMgmt.clt?cycle_cnt_no="+sheetObj.GetCellValue(Row, "Grd01cycle_cnt_no");
		parent.mkNewFrame('Cycle Count Management', sUrl , "CycleCountMgmt_" + sheetObj.GetCellValue(Row, "Grd01cycle_cnt_no"));
	}
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
			case "btn_cycle_cnt_dt_fm":
				if (ComEnableObject("btn_cycle_cnt_dt_fm", false, 2)) {
					return;
				}
	            var cal = new ComCalendarFromTo();
	            cal.displayType = "date";
	            cal.select(formObj.cycle_cnt_dt_fm, formObj.cycle_cnt_dt_to, 'MM-dd-yyyy');
				break;
			case "btn_cycle_cnt_dt_to":
				if (ComEnableObject("btn_cycle_cnt_dt_to", false, 2)) {
					return;
				}
				var cal = new ComCalendarFromTo();
	            cal.displayType = "date";
	            cal.select(formObj.cycle_cnt_dt_fm, formObj.cycle_cnt_dt_to, 'MM-dd-yyyy');
				break;
 			case "btn_ctrt_no" :
 				if (ComEnableObject("btn_ctrt_no", false, 2)) {
					return;
				}
 				CtrtPopup();
				break;
 			case "SEARCHLIST":
 				document.form.f_CurPage.value=1;
 				btn_Search();
 				break;
 			case "EXCEL":
 				btn_Excel();
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
	if (ComEnableObject("btn_ctrt_no", false, 2)) {
		return;
	}
	//SHEET 초기화
	//sheet1.RemoveAll();
	var formObj=document.form;
	
	rtnary=new Array(2);
	rtnary[0] = formObj.ctrt_nm.value;
	rtnary[1] = window;
  
    callBackFunc = "setCtrtNoInfo";
    modal_center_open("./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value+"&ctrt_no="+formObj.ctrt_no.value, rtnary, 900, 580, "yes");
}

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
/*
 * 팝업 관련 로직 시작
 */
/*
 * 팝업 관련 로직 끝
 */

function btn_Search(){
	 var formObj = document.form;
	 if(formObj.wh_cd.value == ""){
		   ComShowCodeMessage("COM12233");
		   return;
	 }
	 var sheetObj = docObjects[0]; 
	 if (validateForm(formObj, 'search')) {
		 formObj.f_cmd.value = SEARCH;
		 var sXml = "";
		 sheet1.DoSearch("./searchCycleCountListGS.clt", FormQueryString(formObj, ""));
//		 sXml = sheetObj.GetSearchData("./searchCycleCountListGS.clt", FormQueryString(formObj, ""));
//		 sheetObj.LoadSearchData(sXml,{Sync:1} );
	 }
}

function btn_Excel() {
	 var prefix = "Grd01";
	 if(docObjects[0].RowCount() < 1){//no data
	      ComShowCodeMessage("COM132501");
	    }else{
	      //sheetObjects[0].Down2Excel({ HiddenColumn:true,Merge:true,TreeLevel:false});  ExtendParam: "ColumnColor: " + prefix + "cycle_cnt_dt|" + prefix + "item_cd|" + prefix + "item_nm"});
	    	docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1, ExtendParam: "ColumnColor: " + prefix + "cycle_cnt_no"});
	    }
}

function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction){
			case 'search':
				if(ComIsEmpty(formObj.wh_cd)){
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
			break;
		}
	}
	return true;
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
	var formObj=document.form;
	ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
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
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
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
		parent.mkNewFrame('Contract Management', sUrl, "CtrtMgmt_" + formObj.ctrt_no.value);
	}
}
function checkFromDate(){
	var formObj=document.form;
	var fm_date = formObj.cycle_cnt_dt_fm.value;
	var to_date = formObj.cycle_cnt_dt_to.value;
//	if(fm_date != "" && to_date != ""){
//		var com_fm = Date.parse(fm_date);
//		var com_to = Date.parse(to_date);
//		if (com_fm > com_to){
//			alert("End date must be greater than start date");
//			formObj.cycle_cnt_dt_to.value = "";
//			formObj.cycle_cnt_dt_to.focus();
//		}
//	}
	if (getDaysBetween(fm_date, to_date, 'MM-dd-yyyy')<0) {
		//ComShowCodeMessage("COM0122",$("#prop_date_tp")[0].GetSelectText());
		ComShowCodeMessage("COM0122",comboObjects[3].GetSelectText());
		formObj.cycle_cnt_dt_fm.focus();
		return false;
	}
}
function checkFromDate2(){
	var formObj=document.form;
	var fm_date = formObj.cycle_cnt_dt_fm.value;
	var to_date = formObj.cycle_cnt_dt_to.value;
	if(fm_date != "" && to_date != ""){
		var com_fm = Date.parse(fm_date);
		var com_to = Date.parse(to_date);
		if (com_fm > com_to){
			alert("End date must be greater than start date");
			formObj.cycle_cnt_dt_to.value = "";
			formObj.cycle_cnt_dt_to.focus();
		}
	}else if(fm_date == "" && to_date != ""){
		formObj.cycle_cnt_dt_fm.value = formObj.cycle_cnt_dt_to.value;
	}
//	else if(fm_date != "" && to_date == ""){
//		formObj.cycle_cnt_dt_to.value = formObj.cycle_cnt_dt_fm.value;
//	}
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
	document.form.f_CurPage.value=1;
	btn_Search();
}

function searchList(){
	document.form.f_CurPage.value=1;
	btn_Search();
}

function mergeCell(Row){
	var prefix=fix_grid01;
	totalRowMerge = 0;
	startRow = 0;
	for(var i = Row ; i <= sheet1.RowCount() + 1 ; i++){
		if(i == Row){
			getDataOri(i);
			i++;
		}
		checkDataMerge(i);
	}
}

function checkDataMerge(i){
	getData(i);
	if(cycle_cnt_no == cycle_cnt_no_ori && cycle_cnt_tp_nm == cycle_cnt_tp_nm_ori
			&& cycle_cnt_dt == cycle_cnt_dt_ori && item_cd == item_cd_ori
			&& item_nm == item_nm_ori){
		if(startRow == 0){
			startRow = i;
			totalRowMerge = 1;
		}
		totalRowMerge++;
	}
	else{
		if(totalRowMerge == 1){
			totalRowMerge++;
		}
		startRow = startRow - 1;
		setMergeCell(startRow, totalRowMerge);
		
		getDataOri(i);
		
		startRow = 0;
		totalRowMerge = 0;
	}
	
	if(i == sheet1.RowCount() + 1){
		if(startRow != 0){
			if(totalRowMerge == 1){
				totalRowMerge++;
			}
			startRow = startRow - 1;
			setMergeCell(startRow, totalRowMerge);
			startRow = 0;
			totalRowMerge = 0;
		}
	}
}
function getDataOri(i){
	var prefix=fix_grid01;
	var sheetObj = sheet1;
	cycle_cnt_no_ori = sheetObj.GetCellValue(i, prefix+"cycle_cnt_no");
	cycle_cnt_tp_nm_ori = sheetObj.GetCellValue(i, prefix+"cycle_cnt_tp_nm");
	cycle_cnt_dt_ori = sheetObj.GetCellValue(i, prefix+"cycle_cnt_dt");
	item_cd_ori = sheetObj.GetCellValue(i, prefix+"item_cd");
	item_nm_ori = sheetObj.GetCellValue(i, prefix+"item_nm");
}
function getData(i){
	var prefix=fix_grid01;	
	var sheetObj = sheet1;
	cycle_cnt_no = sheetObj.GetCellValue(i, prefix+"cycle_cnt_no");
	cycle_cnt_tp_nm = sheetObj.GetCellValue(i, prefix+"cycle_cnt_tp_nm");
	cycle_cnt_dt = sheetObj.GetCellValue(i, prefix+"cycle_cnt_dt");
	item_cd = sheetObj.GetCellValue(i, prefix+"item_cd");
	item_nm = sheetObj.GetCellValue(i, prefix+"item_nm");
}
function setMergeCell(startRow, totalRowMerge){
	sheet1.SetMergeCell(startRow, 0, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 1, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 2, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 3, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 4, totalRowMerge, 1);
}