/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHPutawayMgmt.js
*@FileTitle  : Putaway Management
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/15
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var startRow = 0;
var totalRowMerge = 0;
var item_cd="";
var item_nm="";
var lot_cd="";
var inbound_dt="";
var item_lot_no="";
var inbound_loc_cd="";
var type_nm="";
var unit_nm="";
var qty="";
var qty_ea="";
var non_putaway_qty="";

var item_cd_ori="";
var item_nm_ori="";
var lot_cd_ori="";
var inbound_dt_ori="";
var item_lot_no_ori="";
var inbound_loc_cd_ori="";
var type_nm_ori="";
var unit_nm_ori="";
var qty_ori="";
var qty_ea_ori="";
var non_putaway_qty_ori="";
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	var i=0;
	for(i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//initControl();
	var formObj=document.form;
	//button disabled
	formObj.btnSave.disabled = true;
	formObj.btn_cancel.disabled = true;
	formObj.btn_history.disabled = true;
	formObj.link_print.disabled = true;
	if (formObj.c_wib_bk_no.value != "" || formObj.c_wib_in_no.value != "") {
		btn_Search();
	}
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

function initControl() {
	var formObject=document.form;
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    axon_event.addListenerForm('blur', 	'form_deactivate', formObject);
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
	case 1:      //IBSheet1 init
	    with(sheetObj){
        
      var prefix="Grd01";  //

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [ { Text:getLabel('WHPutawayMgmt_HDR1'), Align:"Center"},
                      { Text:getLabel('WHPutawayMgmt_HDR2'), Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [ {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"po_sys_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"item_sys_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"item_seq",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk" },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_cd",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
             {Type:"Text",      Hidden:0,  Width:130,   Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
             {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_id",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inbound_dt",             KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_no",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inbound_loc_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:75,   Align:"Left",    ColMerge:1,   SaveName:prefix+"inbound_loc_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"rcv_snd_dmg_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:prefix+"rcv_snd_dmg_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
             {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pkgunit",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
             {Type:"Int",       Hidden:0,  Width:40,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkgqty",                 KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
             {Type:"Int",       Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"ea_qty",                 KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
             {Type:"Int",       Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"non_putaway_ea_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"putaway_wh_loc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
             {Type:"PopupEdit", Hidden:0, Width:75,   Align:"Left",    ColMerge:0,   SaveName:prefix+"putaway_wh_loc_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Combo",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:prefix+"putaway_wh_loc_prop_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"PopupEdit", Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:prefix+"putaway_pkgunit",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Int",       Hidden:0,  Width:45,   Align:"Right",   ColMerge:0,   SaveName:prefix+"putaway_pkgqty",         KeyField:1,   CalcLogic:"",   Format:"Integer",     PointCount:0,UpdateEdit:1,   InsertEdit:1 },
             {Type:"Int",       Hidden:0,  Width:60,   Align:"Right",   ColMerge:0,   SaveName:prefix+"putaway_ea_qty",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,UpdateEdit:0,   InsertEdit:0 },
             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"putaway_cbm",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT ,UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"putaway_cbf",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT ,UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"putaway_grs_kgs",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"putaway_grs_lbs",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"putaway_net_kgs",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"putaway_net_lbs",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
             {Type:"Image",     Hidden:0, Width:60,   Align:"Center",  ColMerge:0,   SaveName:prefix+"add_img",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Int",       Hidden:0,  Width:30,   Align:"Right",   ColMerge:0,   SaveName:prefix+"add_row",                KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
             {Type:"Image",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_img",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"del_row",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"ctrt_no",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Int",       Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"putaway_seq",            KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"edit_flag",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Int",       Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"ob_cnt",                 KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"inv_chg_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"call_flg",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"fix_loc_cd",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"fix_loc_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"old_putaway_wh_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Int",       Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"old_putaway_ea_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Int",       Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"old_inv_qty",            KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"put_tp_cd",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"wib_in_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"wh_cd",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"wh_nm",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"ctrt_no",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"ctrt_nm",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv1_qty",            KeyField:0,   CalcLogic:"",   Format:"",     	   PointCount:0,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
             {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbm",                KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
             {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbf",                KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
             {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_kgs",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_KGS_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
             {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_lbs",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_KGS_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
             {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_kgs",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_KGS_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
             {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_lbs",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_KGS_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 } ];
       
      InitColumns(cols);
      SetSheetHeight(450);
      SetEditable(1);
      SetHeaderRowHeight(30);
      SetAutoRowHeight(0);
      resizeSheet();
      SetImageList(1,APP_PATH+"/web/img/main/btn_s_add.gif");
      SetImageList(2,APP_PATH+"/web/img/main/btn_s_delete.gif");
      SetColProperty(0 ,prefix+"putaway_wh_loc_nm" , {AcceptKeys:"E|[" + "0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\" + "]" , InputCaseSensitive:1});
      SetColProperty(0 ,prefix+"putaway_pkgunit" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
      SetColProperty(prefix+"putaway_wh_loc_prop_nm", {ComboText:prop_cdText, ComboCode:prop_cdCode} );
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
			case "btn_loc_dt":	
				var cal=new ComCalendar();
	            cal.select(formObj.loc_dt, 'MM-dd-yyyy');
				break;
			case "SEARCHLIST":	
				btn_Search();
				break;
			case "SAVE":	
				btn_Save();
				break;
			case "btn_cancel":	
				btn_Cancel();
				break;
			case "btn_history":	
				btn_History();
				break;
			case "link_print":	
				btn_Print();
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
/**
 * 마우스 아웃일때 
 */
function form_deactivate() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
}
/**
 * SHEET 팝업 이벤트
 * @param sheetObj
 * @param Row
 * @param Col
 */
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var formObj=document.form;
	var prefix="Grd01";
	var colName=sheetObj.ColSaveName(Col);
	var colValue=sheetObj.GetCellValue(Row, Col) ;
	var cal=new ComCalendarGrid();
	with(sheetObj)
	{
		if (colName == (prefix+"putaway_wh_loc_nm") ) {
			var loc_prop="";
			if (sheetObj.GetCellValue(Row, prefix+"rcv_snd_dmg_cd") == "D") {
				loc_prop="DMG";
			}
			
			var fix_loc_nm="";
			if (!ComIsEmpty(sheetObj.GetCellValue(Row, prefix+"fix_loc_cd"))) {
				fix_loc_nm=sheetObj.GetCellValue(Row, prefix+"fix_loc_nm");
			}			
			var sUrl="WarehouseLocPopup.clt?f_loc_cd="+formObj.wh_cd.value+ "&f_loc_prop=" + loc_prop+"&f_fix_wh_loc_nm="+fix_loc_nm+"&f_putaway_flg=Y"+"&f_put_tp_cd="+sheetObj.GetCellValue(Row, (prefix+"put_tp_cd"))+"&f_wh_loc_nm="+sheetObj.GetCellValue(Row, (prefix+"putaway_wh_loc_nm"));
			callBackFunc = "setGrd01DefLoc";
			modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
	    } else if (colName == (prefix+"putaway_pkgunit") ) {
	    	var sUrl="CommonCodePopup.clt?grp_cd=A6&code="+colValue+"&wh_flag=Y&ctrt_no="+sheetObj.GetCellValue(Row, (prefix+"ctrt_no"))+"&item_sys_no="+sheetObj.GetCellValue(Row, (prefix+"item_sys_no"));
			callBackFunc = "setPkgunitGrid";
			modal_center_open(sUrl, callBackFunc, 400,520,"yes");
		}	
	}
}
function setGrd01DefLoc(rtnVal){
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	var formObj=document.form;
	   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"putaway_wh_loc_cd",rtnValAry[0],0);// wh_loc_cd
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"putaway_wh_loc_nm",rtnValAry[1],0);// wh_loc_nm
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"putaway_wh_loc_prop_nm",rtnValAry[3],0);// prop_nm
	   }
}
function setPkgunitGrid(rtnVal){
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"putaway_pkgunit",rtnValAry[1],0);
		   fnCalcPutawayEaQty(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetSelectCol());
	   }
}
function sheet1_OnChange(sheetObj, Row, Col, Value) {
	var formObj=document.form;
	var prefix="Grd01";
	var colName=sheetObj.ColSaveName(Col);
	if (colName == (prefix+"del_chk")) {
	fnMergeCheckAll(sheetObj, Row, Col, Value);
	} else if (colName == (prefix+"putaway_wh_loc_nm")) {
		if (Value != "") {
			var fix_loc_nm="";
			if (!ComIsEmpty(sheetObj.GetCellValue(Row, prefix+"fix_loc_cd"))) {
				fix_loc_nm=sheetObj.GetCellValue(Row, prefix+"fix_loc_nm");
			}						
			var sParam="f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_wh_loc_nm=" + Value +"&f_fix_wh_loc_nm="+fix_loc_nm+"&f_putaway_flg=Y"+"&f_put_tp_cd="+sheetObj.GetCellValue(Row, (prefix+"put_tp_cd"));
			ajaxSendPost(resultWarehouseLocInfoForName, sheetObj, '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
		} else {
			sheetObj.SetCellValue(Row, prefix+"putaway_wh_loc_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"putaway_wh_loc_prop_nm","",0);
		}				
	} else if (colName == (prefix+"putaway_pkgunit") || colName == (prefix+"putaway_pkgqty")) { // Putaway QTY 입력시 Putaway ea_qty 자동계산
		fnCalcPutawayEaQty(sheetObj, Row, Col);
	}
	else if (colName == (prefix+"putaway_ea_qty") && Value != "")
	{
		//CBM, KGS, LBS 계산
		var qty=eval(Value);
		var pkg_lv1_qty=eval(sheetObj.GetCellValue(Row, prefix + "pkg_lv1_qty"));
		var lv1_cbm=eval(sheetObj.GetCellValue(Row, prefix + "lv1_cbm"));
		var lv1_cbf=eval(sheetObj.GetCellValue(Row, prefix + "lv1_cbf"));
		var lv1_grs_kgs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_grs_kgs"));
		var lv1_grs_lbs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_grs_lbs"));
		var lv1_net_kgs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_net_kgs"));
		var lv1_net_lbs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_net_lbs"));
		sheetObj.SetCellValue(Row,  prefix + "putaway_cbm",(pkg_lv1_qty * qty) * lv1_cbm,0);
		sheetObj.SetCellValue(Row,  prefix + "putaway_cbf",(pkg_lv1_qty * qty) * lv1_cbf,0);
		sheetObj.SetCellValue(Row,  prefix + "putaway_grs_kgs",(pkg_lv1_qty * qty) * lv1_grs_kgs,0);
		sheetObj.SetCellValue(Row,  prefix + "putaway_grs_lbs",(pkg_lv1_qty * qty) * lv1_grs_lbs,0);
		sheetObj.SetCellValue(Row,  prefix + "putaway_net_kgs",(pkg_lv1_qty * qty) * lv1_net_kgs,0);
		sheetObj.SetCellValue(Row,  prefix + "putaway_net_lbs",(pkg_lv1_qty * qty) * lv1_net_lbs,0);
	}
	else if (colName == (prefix+"item_cbf") && Value != "") 
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("CBF_CBM", (prefix+"item_cbf"), (prefix+"item_cbm"), sheetObj);
		unitConvertGrid("CBF_CBM", (prefix+"item_cbf"), (prefix+"item_cbm"), sheetObj);
	} 
	else if (colName == (prefix+"item_grs_lbs") && Value != "") 
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("LB_KG", (prefix+"item_grs_lbs"), (prefix+"item_grs_kgs"), sheetObj);
		unitConvertGrid("LB_KG", (prefix+"item_grs_lbs"), (prefix+"item_grs_kgs"), sheetObj);
	} 
	else if (colName == (prefix+"item_net_lbs") && Value != "") 
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("LB_KG", (prefix+"item_net_lbs"), (prefix+"item_net_kgs"), sheetObj);
		unitConvertGrid("LB_KG", (prefix+"item_net_lbs"), (prefix+"item_net_kgs"), sheetObj);
	}
}
function resultWarehouseLocInfoForName(reqVal, sheetObj){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	var Row = sheetObj.GetSelectRow();
	var Col = sheetObj.GetSele
	var sheetObj = sheet1;
	var prefix = "Grd01";
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(Row, prefix+"putaway_wh_loc_cd", rtnArr[0],0); // wh_loc_cd
				sheetObj.SetCellValue(Row,  prefix+"putaway_wh_loc_nm", rtnArr[1],0);
				sheetObj.SetCellValue(Row, prefix+"putaway_wh_loc_prop_nm", rtnArr[4],0);
			}
			else{
				sheetObj.SetCellValue(Row, prefix+"putaway_wh_loc_cd", "",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),  prefix+"putaway_wh_loc_nm", "",0);
				sheetObj.SetCellValue(Row, prefix+"putaway_wh_loc_prop_nm", "",0);
				sheetObj.SelectCell(sheetObj.GetSelectRow(), prefix+"putaway_wh_loc_cd");
			}
		}
		else{
			sheetObj.SetCellValue(Row, prefix+"putaway_wh_loc_cd", "",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(),  prefix+"putaway_wh_loc_nm", "",0);
			sheetObj.SetCellValue(Row, prefix+"putaway_wh_loc_prop_nm", "",0);
			sheetObj.SelectCell(sheetObj.GetSelectRow(), prefix+"putaway_wh_loc_cd");
		}
	}
}
/**
 * Add Row
 * @param sheetObj
 * @param Row
 * @param Col
 */
function sheet1_OnClick(sheetObj, Row, Col) {
	var formObj=document.form;
	var colName=sheetObj.ColSaveName(Col);
	var prefix="Grd01";
	if (colName == (prefix+"add_img")) {
		add_row(sheetObj, Row, Col);
	} else if (colName == (prefix+"del_img")) {
		del_row(sheetObj, Row, Col);
	}
}
function mergeCell(Row){
	var prefix="Grd01";
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
	if(item_cd == item_cd_ori && item_nm == item_nm_ori
			&& lot_cd == lot_cd_ori && inbound_dt == inbound_dt_ori
			&& item_lot_no == item_lot_no_ori && inbound_loc_cd == inbound_loc_cd_ori
			&& non_putaway_qty == non_putaway_qty_ori && unit_nm == unit_nm_ori
			&& type_nm == type_nm_ori && qty == qty_ori
			&& qty_ea == qty_ea_ori){
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
	var prefix="Grd01";
	item_cd_ori = sheetObj.GetCellValue(i, prefix+"item_cd");
	item_nm_ori = sheetObj.GetCellValue(i, prefix+"item_nm");
	lot_cd_ori = sheetObj.GetCellValue(i, prefix+"lot_id");
	inbound_dt_ori = sheetObj.GetCellValue(i, prefix+"inbound_dt");
	item_lot_no_ori = sheetObj.GetCellValue(i, prefix+"lot_no");
	inbound_loc_cd_ori = sheetObj.GetCellValue(i, prefix+"inbound_loc_cd");
	type_nm_ori = sheetObj.GetCellValue(i, prefix+"rcv_snd_dmg_nm");
	unit_nm_ori = sheetObj.GetCellValue(i, prefix+"pkgunit");
	qty_ori = sheetObj.GetCellValue(i, prefix+"pkgqty");
	qty_ea_ori = sheetObj.GetCellValue(i, prefix+"eq_qty");
	non_putaway_qty_ori = sheetObj.GetCellValue(i, prefix+"non_putaway_ea_qty");
}
function getData(i){
	var prefix="Grd01";	
	item_cd = sheetObj.GetCellValue(i, prefix+"item_cd");
	item_nm = sheetObj.GetCellValue(i, prefix+"item_nm");
	lot_cd = sheetObj.GetCellValue(i, prefix+"lot_id");
	inbound_dt = sheetObj.GetCellValue(i, prefix+"inbound_dt");
	item_lot_no = sheetObj.GetCellValue(i, prefix+"lot_no");
	inbound_loc_cd = sheetObj.GetCellValue(i, prefix+"inbound_loc_cd");
	type_nm = sheetObj.GetCellValue(i, prefix+"rcv_snd_dmg_nm");
	unit_nm = sheetObj.GetCellValue(i, prefix+"pkgunit");
	qty = sheetObj.GetCellValue(i, prefix+"pkgqty");
	qty_ea = sheetObj.GetCellValue(i, prefix+"eq_qty");
	non_putaway_qty = sheetObj.GetCellValue(i, prefix+"non_putaway_ea_qty");
}
function setMergeCell(startRow, totalRowMerge){
	sheet1.SetMergeCell(startRow, 3, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 4, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 5, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 6, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 7, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 8, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 10, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 12, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 13, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 14, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 15, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 16, totalRowMerge, 1);
}
function add_row(sheetObj, Row, Col) {
	var prefix="Grd01";	
	// Item 조회시 고정 Location 정보와 기 입력된 Location 정보가 같을 경우 putaway Loc 비활성화 처리
	if (sheetObj.GetCellValue(Row, prefix+"fix_loc_cd") == sheetObj.GetCellValue(Row, prefix+"inbound_loc_cd")) {
		return;	
	}	
	sheetObj.CheckAll(prefix+"del_chk",0);
    var row_cnt=1;
    row_cnt=ComParseInt(sheetObj.GetCellValue(Row, prefix+"add_row"));
	for (var i=0; i<row_cnt; i++) {
		sheetObj.SelectCell(Row, prefix+"add_row");
		var row=sheetObj.DataInsert(); // 현재 선택된 행의 바로 아래에 생성
		sheetObj.SetCellValue(row, prefix+"item_cd",sheetObj.GetCellValue(Row, prefix+"item_cd"),0);
		sheetObj.SetCellValue(row, prefix+"item_nm",sheetObj.GetCellValue(Row, prefix+"item_nm"),0);
		sheetObj.SetCellValue(row, prefix+"lot_id",sheetObj.GetCellValue(Row, prefix+"lot_id"),0);
		sheetObj.SetCellValue(row, prefix+"inbound_dt",sheetObj.GetCellValue(Row, prefix+"inbound_dt"),0);
		sheetObj.SetCellValue(row, prefix+"lot_no",sheetObj.GetCellValue(Row, prefix+"lot_no"),0);
		sheetObj.SetCellValue(row, prefix+"inbound_loc_cd",sheetObj.GetCellValue(Row, prefix+"inbound_loc_cd"),0);
		sheetObj.SetCellValue(row, prefix+"inbound_loc_nm",sheetObj.GetCellValue(Row, prefix+"inbound_loc_nm"),0);
		sheetObj.SetCellValue(row, prefix+"rcv_snd_dmg_cd",sheetObj.GetCellValue(Row, prefix+"rcv_snd_dmg_cd"),0);
		sheetObj.SetCellValue(row, prefix+"rcv_snd_dmg_nm",sheetObj.GetCellValue(Row, prefix+"rcv_snd_dmg_nm"),0);
		sheetObj.SetCellValue(row, prefix+"non_putaway_ea_qty",sheetObj.GetCellValue(Row, prefix+"non_putaway_ea_qty"),0);
		sheetObj.SetCellValue(row, prefix+"pkgunit",sheetObj.GetCellValue(Row, prefix+"pkgunit"),0);
		sheetObj.SetCellValue(row, prefix+"pkgqty",sheetObj.GetCellValue(Row, prefix+"pkgqty"),0);
		sheetObj.SetCellValue(row, prefix+"ea_qty",sheetObj.GetCellValue(Row, prefix+"ea_qty"),0);
		sheetObj.SetCellValue(row, prefix+"add_img",sheetObj.GetCellValue(Row, prefix+"add_img"),0);
		sheetObj.SetCellValue(row, prefix+"add_row",1,0);
		sheetObj.SetCellValue(row, prefix+"del_img",sheetObj.GetCellValue(Row, prefix+"del_img"),0);
		sheetObj.SetCellValue(row, prefix+"del_row","",0);
		sheetObj.SetCellValue(row, prefix+"ctrt_no",sheetObj.GetCellValue(Row, prefix+"ctrt_no"),0);
		sheetObj.SetCellValue(row, prefix+"po_sys_no",sheetObj.GetCellValue(Row, prefix+"po_sys_no"),0);
		sheetObj.SetCellValue(row, prefix+"item_sys_no",sheetObj.GetCellValue(Row, prefix+"item_sys_no"),0);
		sheetObj.SetCellValue(row, prefix+"item_seq",sheetObj.GetCellValue(Row, prefix+"item_seq"),0);
		sheetObj.SetCellValue(row, prefix+"fix_loc_cd",sheetObj.GetCellValue(Row, prefix+"fix_loc_cd"),0);
		sheetObj.SetCellValue(row, prefix+"fix_loc_nm",sheetObj.GetCellValue(Row, prefix+"fix_loc_nm"),0);
		sheetObj.SetCellValue(row, prefix+"put_tp_cd",sheetObj.GetCellValue(Row, prefix+"put_tp_cd"),0);
		sheetObj.SetCellValue(row, prefix+"pkg_lv1_qty",sheetObj.GetCellValue(Row, prefix+"pkg_lv1_qty"),0);
		sheetObj.SetCellValue(row, prefix+"lv1_cbm",sheetObj.GetCellValue(Row, prefix+"lv1_cbm"),0);
		sheetObj.SetCellValue(row, prefix+"lv1_cbf",sheetObj.GetCellValue(Row, prefix+"lv1_cbf"),0);
		sheetObj.SetCellValue(row, prefix+"lv1_grs_kgs",sheetObj.GetCellValue(Row, prefix+"lv1_grs_kgs"),0);
		sheetObj.SetCellValue(row, prefix+"lv1_grs_lbs",sheetObj.GetCellValue(Row, prefix+"lv1_grs_lbs"),0);
		sheetObj.SetCellValue(row, prefix+"lv1_net_kgs",sheetObj.GetCellValue(Row, prefix+"lv1_net_kgs"),0);
		sheetObj.SetCellValue(row, prefix+"lv1_net_lbs",sheetObj.GetCellValue(Row, prefix+"lv1_net_lbs"),0);
		sheetObj.SetCellValue(row, prefix+"putaway_seq","",0);
		sheetObj.SetCellValue(row, prefix+"edit_flag","NEW",0);
 		sheetObj.SetCellImage(row, prefix+"del_img",2);
 		sheetObj.SetCellValue(row, prefix+"putaway_wh_loc_prop_nm", "");
	}
	mergeCell(2);
	sheet1.SetSelectRow(Row);
}
function del_row(sheetObj, Row, Col) {
	var prefix="Grd01";	
	// 저장건 삭제 불가
	if (sheetObj.GetCellValue(Row, prefix+"del_row") == "N") {
		return;
	}	
	// Item 조회시 고정 Location 정보와 기 입력된 Location 정보가 같을 경우 putaway Loc 비활성화 처리
	if (sheetObj.GetCellValue(Row, prefix+"fix_loc_cd") == sheetObj.GetCellValue(Row, prefix+"inbound_loc_cd")) {
		return;
	}
	var hdr1="";
	hdr1 += sheetObj.GetCellValue(Row, prefix+"item_cd");
	hdr1 += sheetObj.GetCellValue(Row, prefix+"lot_no");
	hdr1 += sheetObj.GetCellValue(Row, prefix+"inbound_dt");
	hdr1 += sheetObj.GetCellValue(Row, prefix+"lot_no");
	hdr1 += sheetObj.GetCellValue(Row, prefix+"inbound_loc_cd");
	hdr1 += sheetObj.GetCellValue(Row, prefix+"rcv_snd_dmg_cd");
	hdr1 += sheetObj.GetCellValue(Row, prefix+"pkgunit");
	hdr1 += sheetObj.GetCellValue(Row, prefix+"pkgqty");
	hdr1 += sheetObj.GetCellValue(Row, prefix+"add_img");
    var duCount=0;
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
		var hdr2="";
	hdr2 += sheetObj.GetCellValue(i, prefix+"item_cd");
	hdr2 += sheetObj.GetCellValue(i, prefix+"lot_no");
	hdr2 += sheetObj.GetCellValue(i, prefix+"inbound_dt");
	hdr2 += sheetObj.GetCellValue(i, prefix+"lot_no");
	hdr2 += sheetObj.GetCellValue(i, prefix+"inbound_loc_cd");
	hdr2 += sheetObj.GetCellValue(i, prefix+"rcv_snd_dmg_cd");
	hdr2 += sheetObj.GetCellValue(i, prefix+"pkgunit");
	hdr2 += sheetObj.GetCellValue(i, prefix+"pkgqty");
	hdr2 += sheetObj.GetCellValue(i, prefix+"add_img");
		if (hdr1 == hdr2) {
			duCount++;
		}
	}	
	if (duCount == 1 || sheetObj.GetCellValue(Row, prefix+"del_img")=="") {
		ComShowMessage("The row is required.");
		return;
	}
	sheetObj.SetRowHidden(Row,1);//2.행 숨기기
	//sheetObj.SetRowStatus(Row,"D");
	sheetObj.RowDelete(Row, false);
}

/**
 * Add Row 버튼 이미지
 * @param sheetObj
 * @param ErrMsg
 */
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {
	var formObj=document.form;
	var prefix="Grd01";	
	sheetObj.SetImageList(1,APP_PATH+"/web/img/main/btn_s_add.gif");
	sheetObj.SetImageList(2,APP_PATH+"/web/img/main/btn_s_delete.gif");
	
	var ob_cnt_sum=0;
	var edit_flag="";
	for (var i=0; i < sheetObj.RowCount(); i++) {
		ob_cnt_sum += parseInt(sheetObj.GetCellValue(i+sheetObj.HeaderRows(), prefix+"ob_cnt"));
		edit_flag=sheetObj.GetCellValue(i+sheetObj.HeaderRows(), prefix+"edit_flag");
		fnSetPutawayItemEditable(sheetObj, i+sheetObj.HeaderRows(), edit_flag); // 수정불가
	}
	formObj.ob_cnt.value = ob_cnt_sum;
	mergeCell(2); 
	for (var y = sheetObj.HeaderRows(); y <= sheetObj.RowCount() + 1; y++){
		sheetObj.SetCellValue(y,prefix+"ibflag", 'R');
	}
	
	
	setOldValueAllObj();
	check_authority_wh();
}
/*
 * 버튼 관련 로직
 */
//화면 Merge 컬럼 Name
	var InputName="|||wib_in_no|wib_bk_no|supv_nm|inbound_dt||putaway_hm_fr|putaway_hm_to|work_nm|msg_to_wk|wh_cd|||form_mode";
/**
 * Search
 */    
function btn_Search() {
	var formObj=document.form;
	if (ComIsEmpty(formObj.c_wib_bk_no.value) && ComIsEmpty(formObj.c_wib_in_no.value)) {
		ComShowMessage("Please enter IB Complete No or IN Booking No");
		if (ComIsEmpty(formObj.c_wib_bk_no.value)) {
			formObj.c_wib_bk_no.focus();
		} else {
			ComIsEmpty(formObj.c_wib_in_no.value);
		}
		imNew(); //이전조회결과 reset		
		return;
	}
	var in_cnt=formObj.in_cnt.value;
	wib_in_no_dupCheck();
	doShowProcess(true);
	setTimeout(function(){
		if (!ComIsEmpty(formObj.c_wib_in_no.value) || formObj.in_cnt.value < 2 ) {
			if (!ComIsEmpty(formObj.c_wib_in_no.value) || in_cnt < 2 ) {
				//이전 조회결과 reset!!
				imNew();	
				formObj.f_cmd.value = SEARCH;
	 		    var sXml=docObjects[0].GetSearchData("WHPutawayMgmtGS.clt", FormQueryString(formObj));
				if (sXml.replace(/^\s+|\s+$/gm,'') == '') {
					ComShowCodeMessage("COM0266", "Booking No or I/B Complete No");
					formObj.c_wib_bk_no.focus();
				} else {
					setDataControl(sXml);
					var strtIndxSheet1 = sXml.indexOf("<SHEET1>");
					var endIndxSheet1 = sXml.indexOf("</SHEET1>") + "</SHEET1>".length;
					
					var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
					sheet1.LoadSearchData(sheet1Data.replaceAll('SHEET1', 'SHEET'));
					//button enable
					formObj.btnSave.disabled = false;
					formObj.btn_cancel.disabled = false;
					formObj.btn_history.disabled = false;
					formObj.link_print.disabled = false;
				}
			}
		}
	},100);
	doHideProcess(false);
}
function setDataControl(sXml){
	var formObj=document.form;
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	
	//formObj.c_wib_in_no.value = $xml.find( "c_wib_in_no").text();
	//formObj.c_wib_bk_no.value = $xml.find( "c_wib_bk_no").text();
	formObj.wib_in_no.value = $xml.find( "wib_in_no").text();
	formObj.wib_bk_no.value = $xml.find( "wib_bk_no").text();
	formObj.supv_nm.value = $xml.find( "supv_nm").text();
	formObj.inbound_dt.value = convDate($xml.find( "inbound_dt").text());
	//formObj.inbound_hm.value = $xml.find( "inbound_hm").text();
	formObj.putaway_hm_fr.value = $xml.find( "putaway_hm_fr").text();
	formObj.putaway_hm_to.value = $xml.find( "putaway_hm_to").text();
	formObj.work_nm.value = $xml.find( "work_nm").text();
	formObj.msg_to_wk.value = $xml.find( "msg_to_wk").text();
	formObj.wh_cd.value = $xml.find( "wh_cd").text();
	formObj.user_id.value = $xml.find( "user_id").text();
	formObj.org_cd.value = $xml.find( "org_cd").text();
	formObj.form_mode.value = $xml.find( "form_mode").text();
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
function imNew() {	
	var formObj=document.form;
	var var_wib_bk_no=formObj.c_wib_bk_no.value;
	var var_wib_in_no=formObj.c_wib_in_no.value;
	formObj.reset();
	formObj.c_wib_bk_no.value=var_wib_bk_no;
	formObj.c_wib_in_no.value=var_wib_in_no;
	//button disabled
	formObj.btnSave.disabled = true;
	formObj.btn_cancel.disabled = true;
	formObj.btn_history.disabled = true;
	formObj.link_print.disabled = true;
	docObjects[0].RemoveAll();
}
function wib_in_no_dupCheck() {
	var formObj=document.form;
	var c_wib_in_no=formObj.c_wib_in_no.value;
	var c_wib_bk_no=formObj.c_wib_bk_no.value;
	if (ComIsEmpty(c_wib_in_no)) {
 		var sXml=docObjects[0].GetSearchData("searchWHICBkNoDupCheck.clt", "in_wib_bk_no="+c_wib_bk_no + "&f_cmd=" + SEARCH01);
 		var xmlDoc = $.parseXML(sXml);
 		var $xml = $(xmlDoc);
	 	var in_cnt = $xml.find( "in_cnt").text();
		//var in_cnt=getXmlDataNullToNullString(sXml,'in_cnt');
		formObj.in_cnt.value=in_cnt;
		if (in_cnt > 1) {
			WHICListPopup();
		}
	}
}
function WHICListPopup() {
	var formObj=document.form;
	var sUrl="WHICListPopup.clt?wib_bk_no="+formObj.c_wib_bk_no.value;
	callBackFunc = "setWHICInfo";
	modal_center_open(sUrl, callBackFunc, 300,350,"yes");
}
function setWHICInfo(rtnVal) {
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.c_wib_in_no.value=rtnValAry[0];
		formObj.c_wib_bk_no.value=rtnValAry[1];
	}
}
/**
 * Putaway EA_QTY 계산
 * @param sheetObj
 * @param row
 * @param col
 */
function fnCalcPutawayEaQty(sheetObj, Row, Col) {
	var prefix="Grd01";
	var rows = Row;
	var putaway_pkgunit=sheetObj.GetCellValue(Row, prefix + "putaway_pkgunit").trim();
	var putaway_pkgqty=sheetObj.GetCellValue(Row, prefix + "putaway_pkgqty").trim();
	var ctrt_no=sheetObj.GetCellValue(Row, prefix + "ctrt_no").trim();
	var item_sys_no=sheetObj.GetCellValue(Row, prefix + "item_sys_no").trim();
	if (putaway_pkgunit == "" && putaway_pkgqty > 0) {
		ComShowCodeMessage("COM0162", Row-1, "[Putaway] Unit");
		sheetObj.SelectCell(Row, Col);
		return;
	}
	ajaxSendPost(resultCalcPutawayEaQty, rows, '&goWhere=aj&bcKey=searchPutawayEaQty&putaway_pkgunit='+putaway_pkgunit+'&putaway_pkgqty='+putaway_pkgqty+ "&ctrt_no="       + ctrt_no
            						+ "&item_sys_no="   + item_sys_no, './GateServlet.gsl');
}
/*
 * receving 정보바뀐경우 os계산 ajax return function
 */
function resultCalcPutawayEaQty(reqVal, rows) {
	var prefix="Grd01";
	var sheetObj = sheet1;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	var Row = rows;
	var Col = sheetObj.GetSelectCol();
	var suYn="";
	var suValue="";
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				suYn=rtnArr[2];
				if (suYn == "" || suYn == null)	{
					alert("error"); //TODO : MJY MESSAGE
					return;
				}
				if (suYn == "N") {
					suValue = rtnArr[3];
					ComShowCodeMessage(suValue); //COM0313~COM0315
					sheetObj.SetCellValue(Row, prefix + "putaway_ea_qty",0);
					sheetObj.SetCellValue(Row, Col,"");
					sheetObj.SelectCell(Row, Col);
					return;
				}
				var putaway_ea_qty= rtnArr[1];
				sheetObj.SetCellValue(Row, prefix + "putaway_ea_qty",putaway_ea_qty);
			}
			else{
				sheetObj.SetCellValue(Row, prefix + "putaway_ea_qty","");
			}
		}
		else{
			sheetObj.SetCellValue(Row, prefix + "putaway_ea_qty","");
		}
	}
}
/**
 * 선택박스 Merge (item_seq 기준)
 * @param sheetObj
 * @param Row
 * @param Col
 * @param Value
 */
function fnMergeCheckAll(sheetObj, Row, Col, Value) {
	var prefix="Grd01";
    var chkIdx=0;
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
	if (sheetObj.GetCellValue(Row, prefix + "po_sys_no") == sheetObj.GetCellValue(i, prefix + "po_sys_no")
	&& sheetObj.GetCellValue(Row, prefix + "item_sys_no") == sheetObj.GetCellValue(i, prefix + "item_sys_no")
	&& sheetObj.GetCellValue(Row, prefix + "item_seq") == sheetObj.GetCellValue(i, prefix + "item_seq")) {
			sheetObj.SetCellValue(i, prefix + "del_chk",Value,0);
			// 동일건 프로시저 한번만 호출
			chkIdx++;				
			sheetObj.SetCellValue(i, prefix + "call_flg","",0);
			if ((Value == "1") && (chkIdx == 1)) {
				sheetObj.SetCellValue(i, prefix + "call_flg","Y",0);
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
	var prefix="Grd01";	
	if(!haveAnyChanged() && !getSaveString()){
		
		ComShowCodeMessage("COM0409");
		return;
	
	}
	if (formObj.wib_in_no.value == "" && formObj.wib_bk_no.value == "") {
		ComShowCodeMessage("COM0289", "Putaway");
		return;
	}
	if (sheet1.RowCount()== 0) {
		ComShowCodeMessage("COM0115"); // Please PO/Item enter at least one row.
		return;
	}
	
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
	var putaway_wh_loc_nm=sheetObj.GetCellValue(i, prefix+"putaway_wh_loc_nm");
	var putaway_pkgunit=sheetObj.GetCellValue(i, prefix+"putaway_pkgunit");
	var putaway_pkgqty=sheetObj.GetCellValue(i, prefix+"putaway_pkgqty");
	
	if (!isEmpty2(putaway_wh_loc_nm) || !isEmpty2(putaway_pkgunit) || (putaway_pkgqty > 0)) 
		 {			
			// Putaway Loc, Unit, QTY 필수 입력 체크
			if (isEmpty2(putaway_wh_loc_nm)) {
				ComShowCodeMessage("COM0162", i-1, "[Putaway] Loc");
				sheetObj.SelectCell(i, prefix+"putaway_wh_loc_nm");
				return;				
			} else if (isEmpty2(putaway_pkgunit)) {
				ComShowCodeMessage("COM0162", i-1, "[Putaway] Unit");
				sheetObj.SelectCell(i, prefix+"putaway_pkgunit");
				return;				
			} else if (putaway_pkgqty == 0) {
				ComShowCodeMessage("COM0162", i-1, "[Putaway] QTY");
				sheetObj.SelectCell(i, prefix+"putaway_pkgqty");
				return;				
			}
		}
	}		
	// 재고수량 (EA_QTY) 체크
	var ea_qty=0;
	var putaway_ea_qty=0;
	var idx=0;
	var pIdx=0;
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
		// clear
		ea_qty=0;
		putaway_ea_qty=0;
		idx=1;
		pIdx=0;
		for (var j=pIdx; j<=sheetObj.LastRow(); j++) {
		if (sheetObj.GetCellValue(i, prefix + "po_sys_no") == sheetObj.GetCellValue(j, prefix + "po_sys_no")
		&& sheetObj.GetCellValue(i, prefix + "item_sys_no") == sheetObj.GetCellValue(j, prefix + "item_sys_no")
		&& sheetObj.GetCellValue(i, prefix + "item_seq") == sheetObj.GetCellValue(j, prefix + "item_seq")
		&& sheetObj.GetCellValue(i, prefix + "lot_id") == sheetObj.GetCellValue(j, prefix + "lot_id")
		&& sheetObj.GetCellValue(i, prefix + "inbound_loc_cd") == sheetObj.GetCellValue(j, prefix + "inbound_loc_cd")
		&& sheetObj.GetCellValue(i, prefix + "rcv_snd_dmg_cd") == sheetObj.GetCellValue(j, prefix + "rcv_snd_dmg_cd")) {
				if (idx == 1) {
					ea_qty=parseInt(sheetObj.GetCellValue(j, prefix + "ea_qty"));
				}
				putaway_ea_qty += parseInt(sheetObj.GetCellValue(j, prefix + "putaway_ea_qty"));
				idx++;					
				pIdx=j;
			}
		}
		if (ea_qty < putaway_ea_qty) {
			alert("[" + sheetObj.GetCellValue(i, prefix + "lot_id") + "] Putaway inventory quantity is larger than the inventory quantities Received. ");
			sheetObj.SelectCell(j, prefix+"putaway_ea_qty");
			return;
		}
	}
	// Putaway Loc 중복 체크
	var putaway_wh_loc_nm="";		
	var idx=0;		
	var pIdx=0;
	var dupCnt=0;
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
		// Inbound Loc 와 Loc은 동일하면 않됨
		if (sheetObj.GetCellValue(i, prefix+"inbound_loc_cd") == sheetObj.GetCellValue(i, prefix+"putaway_wh_loc_cd")) {
			ComShowCodeMessage("COM0320"); // Inbound Loc와 Putaway Loc가 동일합니다.
			sheetObj.SelectCell(i, prefix+"putaway_wh_loc_nm");
			return;
		}			
	    for (var j=sheetObj.HeaderRows(); j<=sheetObj.LastRow(); j++) {
	    	if (i != j) {
			if (sheetObj.GetCellValue(i, prefix + "po_sys_no") == sheetObj.GetCellValue(j, prefix + "po_sys_no")
			&& sheetObj.GetCellValue(i, prefix + "item_sys_no") == sheetObj.GetCellValue(j, prefix + "item_sys_no")
			&& sheetObj.GetCellValue(i, prefix + "item_seq") == sheetObj.GetCellValue(j, prefix + "item_seq")
			&& sheetObj.GetCellValue(i, prefix + "lot_id") == sheetObj.GetCellValue(j, prefix + "lot_id")
			&& sheetObj.GetCellValue(i, prefix + "inbound_loc_cd") == sheetObj.GetCellValue(j, prefix + "inbound_loc_cd")
			&& sheetObj.GetCellValue(i, prefix + "rcv_snd_dmg_cd") == sheetObj.GetCellValue(j, prefix + "rcv_snd_dmg_cd")
			&& sheetObj.GetCellValue(i, prefix + "putaway_wh_loc_cd") == sheetObj.GetCellValue(j, prefix + "putaway_wh_loc_cd")) {
			var rtnDesc="[Lot ID=" + sheetObj.GetCellValue(j, prefix + "lot_id") + "  Putaway Loc=" + sheetObj.GetCellValue(j, prefix + "putaway_wh_loc_nm") +"]";
	    				ComShowCodeMessage("COM0004", rtnDesc);
	    				sheetObj.SelectCell(j, prefix+"putaway_wh_loc_nm");
	    				return;
	    			}
	    	}			
	    }			
	}
	
	if (ComShowCodeConfirm("COM0063") == false) {
		return;
	}
	// 조회된 Putaway Loc 값 clear 시 => TL_WH_PUTAWAY_ITEM 삭제 처리
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
		var edit_flag=sheetObj.GetCellValue(i, prefix+"edit_flag");
		var putaway_wh_loc_cd=sheetObj.GetCellValue(i, prefix+"putaway_wh_loc_cd");
		if (("UPDATE" == edit_flag) && isEmpty2(putaway_wh_loc_cd)) {			
			sheetObj.SetCellValue(i, prefix+"ibflag","D");// 삭제
		}
	}
	formObj.f_cmd.value = MODIFY;
	var sParam=FormQueryString(formObj) + "&" + docObjects[0].GetSaveString();
    //sParam += "&" + ComGetSaveString(docObjects[0], true, true, null, prefix);
 	var saveXml=docObjects[0].GetSearchData("./WHPutawayMgmt_1GS.clt", sParam);
 	//docObjects[0].LoadSaveData(saveXml);
	// Save 후 조회
 	if(saveXml.replace(/^\s+|\s+$/gm,'') != ""){
	    var xmlDoc = $.parseXML(saveXml);
	    var $xml = $(xmlDoc);
		if($xml.find("result").text() == "OK"){
		//ComShowCodeMessage("COM0093", ""); // Saved successfully.
		//Change Save - Deleted -Confrimed - Cancel - Updated 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		}else if($xml.find("mess").text() != "") {
			alert($xml.find("mess").text());
		}
}
 	btn_Search();
}
/**
 * Cancel
 */
function btn_Cancel() {
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var prefix="Grd01";	
//	if (ComGetObjValue(formObj.form_mode) == "NEW") {
//		return;
//	}	
	if (formObj.wib_in_no.value == "" && formObj.wib_bk_no.value == "") {
		ComShowCodeMessage("COM0289", "Putaway");
		return;
	}
	// 체크 건수
	var chkCnt=0;
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
    	//if (sheetObj.GetCellValue(i,prefix + "putaway_wh_loc_cd")!= ""){
    		if (sheetObj.GetCellValue(i,prefix + "del_chk") == "1") {
    			chkCnt++;    		
    		}
    	/*}else {
			return;
		}*/
    }	
	// Cancel 하려는 Item이 OUT Booking에 연결되어 있는 경우 Cancel 불가
	var ob_cnt=ComGetObjValue(formObj.ob_cnt);
	if (ob_cnt > 0) {
		ComShowCodeMessage("COM0317"); // You cannot cancel because of W/H OUTBOUND already processed.
		return;
	}	
	// 특정 Item 지정없이 Cancel 버튼 클릭시
	if ((chkCnt == sheetObj.RowCount()) || (chkCnt == 0)) { // 전체 체크건수=전체 조회건수 or 전체 체크건수=0
		if (ComShowCodeConfirm("COM0319")) { // Cancel all the location and header information?
			// 프로시저 type -> ALL
			//ComSetObjValue(formObj.proc_type, "ALL");
			formObj.proc_type.value =  "ALL";
			saveCancel();
		}
	} else {
		// 프로시저 type -> PARTIAL
		//ComSetObjValue(formObj.proc_type, "PARTIAL");
		formObj.proc_type.value =  "PARTIAL";
		saveCancel();
	}
}
function saveCancel() {
	var formObj=document.form;
	var sheetObj=docObjects[0];	
	if (ComShowCodeConfirm("COM0040")) {
		formObj.f_cmd.value = MODIFY01;
		var sParam=FormQueryString(formObj);
		sParam += "&" + docObjects[0].GetSaveString();
		var saveXml=docObjects[0].GetSearchData("./WHPutawayMgmt_1GS.clt", sParam);
 		//docObjects[0].LoadSaveData(saveXml);
		// Cancel 후 조회
		if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
 			var strtIndxField = saveXml.indexOf("<FIELD>") + "<FIELD>".length;
 			var endIndxField = saveXml.indexOf("</FIELD>");
 			var xmlDoc = $.parseXML(saveXml.substring(strtIndxField,endIndxField));
 			var $xml = $(xmlDoc);
 			if ($xml.find("message").text() != ''){
 				ComShowMessage($xml.find("message").text());
 				btn_Search();
 			}else {
				showCompleteProcess();
	 			btn_Search();
			}
 		}
	}	
}
/*
 * History
 */
function btn_History() {
	var sheetObj=docObjects[0];
	var prefix="Grd01";	
	if (sheetObj.RowCount()<= 0) {
		ComShowCodeMessage("COM0228");
		return;
	}
	var currow=sheetObj.GetSelectRow();
	var sParam="wh_cd=" + sheetObj.GetCellValue(currow, prefix+"wh_cd")
	+ "&wh_nm=" + sheetObj.GetCellValue(currow, prefix+"wh_nm")
	+ "&ctrt_no=" + sheetObj.GetCellValue(currow, prefix+"ctrt_no")
	+ "&ctrt_nm=" + sheetObj.GetCellValue(currow, prefix+"ctrt_nm")
	+ "&trs_no=" + sheetObj.GetCellValue(currow, prefix+"wib_in_no")
			   + "&trs_type=PA"; // WTT (Putaway)
	var sUrl= APP_PATH + "/TrsHistoryList.clt?" + sParam;
	parent.mkNewFrame("Transaction History Search", sUrl);
}
/**
 * Print
 */
function btn_Print() {
	var formObj = document.form;
	if (formObj.link_print.disabled) {
		return;
	}	
	var formObj=document.form;
	if (formObj.wib_in_no.value == "" && formObj.wib_bk_no.value == "") {
		ComShowCodeMessage("COM0289", "Putaway");
		return;
	}	
	var sUrl="./WHICPrintOption.clt?wib_in_no="+ document.getElementsByName("wib_in_no")[0].value + "&wib_bk_no=" + document.getElementsByName("wib_bk_no")[0].value;
	callBackFunc = "setWHICPrintOption";
	modal_center_open(sUrl, callBackFunc, 250,300,"yes");
}
function setWHICPrintOption() {
	
}
/**
 * IN Booking No 링크 
 */
function btn_link_inbk() {
	var formObj=document.form;
	if (!ComIsEmpty(formObj.wib_bk_no)) {
		var sUrl=APP_PATH + "/WHInbkMgmt.clt?fwd_bk_no="+ComGetObjValue(formObj.wib_bk_no);
		parent.mkNewFrame("Inbound Booking Management", sUrl);		
	}
}
/**
 * IB Complete No 링크 
 */
function btn_link_ic() {
	var formObj=document.form;
	if (!ComIsEmpty(formObj.wib_in_no)) {
		var sParam="search_tp=WIB_IN_NO&search_no="+ComGetObjValue(formObj.wib_in_no);
		var sUrl=APP_PATH + "/WHICUpdate.clt?"+sParam;
		parent.mkNewFrame("Inbound Complete Update", sUrl);		
	}
}
/**
 * Putaway Loc, Unit, QTY 수정불가
 * @param sheetObj
 * @param Row
 * @param Value
 */
function fnSetPutawayItemEditable(sheetObj, Row, Value) {
	var prefix="Grd01";
	if (Value == "UPDATE") {		
		sheetObj.SetCellEditable(Row, prefix+"putaway_wh_loc_nm",0);
		sheetObj.SetCellEditable(Row, prefix+"putaway_pkgunit",0);
		sheetObj.SetCellEditable(Row, prefix+"putaway_pkgqty",0);
		sheetObj.SetCellEditable(Row, prefix+"putaway_cbm",0);
		sheetObj.SetCellEditable(Row, prefix+"putaway_cbf",0);
		sheetObj.SetCellEditable(Row, prefix+"putaway_grs_kgs",0);
		sheetObj.SetCellEditable(Row, prefix+"putaway_grs_lbs",0);
		sheetObj.SetCellEditable(Row, prefix+"putaway_net_kgs",0);
		sheetObj.SetCellEditable(Row, prefix+"putaway_net_lbs",0);
 		sheetObj.SetCellImage(Row, prefix+"add_img",1);
 		sheetObj.SetCellImage(Row, prefix+"del_img","");
	} else {		
		sheetObj.SetCellEditable(Row, prefix+"putaway_wh_loc_nm",1);
		sheetObj.SetCellEditable(Row, prefix+"putaway_pkgunit",1);
		sheetObj.SetCellEditable(Row, prefix+"putaway_pkgqty",1);
		sheetObj.SetCellEditable(Row, prefix+"putaway_cbm",1);
		sheetObj.SetCellEditable(Row, prefix+"putaway_cbf",1);
		sheetObj.SetCellEditable(Row, prefix+"putaway_grs_kgs",1);
		sheetObj.SetCellEditable(Row, prefix+"putaway_grs_lbs",1);
		sheetObj.SetCellEditable(Row, prefix+"putaway_net_kgs",1);
		sheetObj.SetCellEditable(Row, prefix+"putaway_net_lbs",1);
 		sheetObj.SetCellImage(Row, prefix+"add_img",1);
 		sheetObj.SetCellImage(Row, prefix+"del_img","");
	}	
	// Item 조회시 고정 Location 정보와 기 입력된 Location 정보가 같을 경우 putaway Loc 비활성화 처리
if (sheetObj.GetCellValue(Row, prefix+"fix_loc_cd") == sheetObj.GetCellValue(Row, prefix+"inbound_loc_cd")) {
		sheetObj.SetCellEditable(Row, prefix+"putaway_wh_loc_nm",0);
		sheetObj.SetCellEditable(Row, prefix+"putaway_pkgunit",0);
		sheetObj.SetCellEditable(Row, prefix+"putaway_pkgqty",0);
		sheetObj.SetCellEditable(Row, prefix+"add_row",0);
 		sheetObj.SetCellImage(Row, prefix+"add_img","");
	}	
}

function haveAnyChanged(){
	
	var sheetChange = "";
	
//	for(var i = 1 ; i < docObjects.length; i++){
//		sheetChange += docObjects[i].GetSaveString();
//	}
//	
//	if(sheetChange != "" ){
//		
//		return true;
//	} 
	
	var arrInput = document.getElementsByTagName("input");
	
	for(var i = 0 ; i < arrInput.length; i++){
		if(arrInput[i].type != "hidden" 
			&& arrInput[i].disabled == false 
			&& arrInput[i].readOnly == false 
			&& arrInput[i].oldvalue != undefined 
			&& arrInput[i].oldvalue != 'undefined' 
			&& arrInput[i].oldvalue != arrInput[i].value)
		{
			return true;
		}
	}
	
	var arrTextarea = document.getElementsByTagName("textarea");
	
	for(var i = 0 ; i < arrTextarea.length; i++){
		if( arrTextarea[i].type != "hidden" 
			&& arrTextarea[i].disabled == false 
			&& arrTextarea[i].readOnly == false 
			&& arrTextarea[i].oldvalue != undefined 
			&& arrTextarea[i].oldvalue != 'undefined' 
			&& arrTextarea[i].oldvalue != arrTextarea[i].value)
		{
			return true;
		}
	}
	
	var arrSelect = document.getElementsByTagName("select");
	
	for(var i = 0 ; i < arrSelect.length; i++){
		if( arrSelect[i].type != "hidden" 
			&& arrSelect[i].disabled == false 
			&& arrSelect[i].readOnly == false 
			&& arrSelect[i].oldvalue != undefined 
			&& arrSelect[i].oldvalue != 'undefined' 
			&& arrSelect[i].oldvalue != arrSelect[i].value)
		{
			return true;
		}
	}
	 
	return false;
}

function setOldValueAllObj(){
	var arrInput = document.getElementsByTagName("input");
	
	for(var i = 0 ; i < arrInput.length; i++){
		if(arrInput[i].type != "hidden" && arrInput[i].disabled == false && arrInput[i].readOnly == false)
		arrInput[i].oldvalue = arrInput[i].value;
	}
	
	var arrTextarea = document.getElementsByTagName("textarea");
	
	for(var i = 0 ; i < arrTextarea.length; i++){
		if(arrTextarea[i].type != "hidden" && arrTextarea[i].disabled == false && arrTextarea[i].readOnly == false)
			arrTextarea[i].oldvalue = arrTextarea[i].value;
	}
	
	var arrSelect = document.getElementsByTagName("select");
	
	for(var i = 0 ; i < arrSelect.length; i++){
		if(arrSelect[i].type != "hidden" && arrSelect[i].disabled == false && arrSelect[i].readOnly == false)
			arrSelect[i].oldvalue = arrSelect[i].value;
	}
}
function getSaveString(){
	var prefix="Grd01";
	for(var i = sheet1.HeaderRows() ; i < sheet1.RowCount()+sheet1.HeaderRows(); i++){
		if(sheet1.GetCellValue(i,prefix+ "ibflag")!="R" && sheet1.GetCellValue(i,prefix+ "ibflag")!="-1")
			return true;
	}
	
	return false;
	
}
function formatTime(obj){
	if(obj.value.length==2)
		{
			obj.value = obj.value + ':';
		}
}
function timeCheck(obj, objStart, objEnd){
	var formObj = document.form;
	
//	}else{
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
//	}
		if(checkTimeStartEnd(objStart, objEnd) == false){
			ComShowCodeMessage('COM0049');
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

function sheet1_OnSort(Col, SortArrow) {
	mergeCell(2);
}
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(){
	var prefix = "Grd01";
	var formObj = document.form;
	var sheetObj = sheet1;
	var countwd = 0;
	//List Warehouse from TB_SEQ
	var wh_list_ath = formObj.wh_list_ath.value;
	var arrwhcd =  wh_list_ath.split(',');
	//List warehouse default in User Entry Screen.
	var wh_cfg = formObj.wh_cfg.value;
	var arrwhcd_df =  wh_cfg.split(',');
	
	//Warehosue selected.
	//var warehouse = formObj.lnk_wh_cd.value;
	var warehouse = sheet1.GetCellValue(sheet1.GetSelectRow(), prefix+"wh_cd");
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
		//ComBtnEnable("btn_save");
	}
}
