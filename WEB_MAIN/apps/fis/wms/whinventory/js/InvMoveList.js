//=========================================================
//*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
//*@FileName   : InvMoveList.js
//*@FileTitle  : Inventory Movement & Hold & Damage Search
//*@author     : Bao.Huynh - DOU Network
//*@version    : 1.0
//*@since      : 2015/04/14
//=========================================================
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 

var rtnary = new Array(1);
var callBackFunc = "";

var firCalFlag = false;
var fix_grid01="Grd01";
var selectCnt=0;
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
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여
 * cache옵션 false셋팅
 */
$(document).ready(function () {
     $.ajaxSetup({ cache: false });
});
/*
 * load page
 */
function loadPage() {
	var formObj=document.form;
	for(i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	initControl();
	ComEnableObject(document.form.btn_history, false)
	if($("#req_move_no").val() == ""){ //번호가 없을경우
		$("#fm_mv_date").val(ComGetDateAdd(null, "d", -31, "-"));
		$("#to_mv_date").val(ComGetNowInfo());
		$("#wh_cd").val($("#def_wh_cd").val());
		$("#ctrt_no").val($("#def_wh_ctrt_no").val());
		$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());	
	}else{
		$("#move_no").val($("#req_move_no").val());
		btn_Search();//조회
	}
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/*
 * init control
 */
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    //- key down
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/*
 * init sheet
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet1":
	    with(sheetObj){
        
      var prefix=fix_grid01;

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [  { Text:getLabel('InvMoveList_HDR1'), Align:"Center"},
	                      { Text:getLabel('InvMoveList_HDR2'), Align:"Center"}];
      InitHeaders(headers, info);

      var cols = [ {Type:"Seq",      		 Hidden:0, 		Width:40, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"seq", 				PointCount:0, 	KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:120, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"plan_no", 			PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Date",     Hidden:0,  	Width:80, 		Align:"Center", 	ColMerge:1, 	Format:"Ymd", 				SaveName:prefix+"plan_dt", 			PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:70, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"plan_sts_cd_nm", 	PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:130, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"move_no", 			PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Date",     Hidden:0,  	Width:80, 		Align:"Center", 	ColMerge:1, 	Format:"Ymd", 				SaveName:prefix+"move_dt", 			PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      Hidden:1, 	Width:100, 		Align:"Left", 		ColMerge:1, 	Format:"", 				SaveName:prefix+"rn", 				PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:100, 		Align:"Center", 		ColMerge:1, 	Format:"", 				SaveName:prefix+"item_cd", 			PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:250, 		Align:"Left", 		ColMerge:1, 	Format:"", 				SaveName:prefix+"item_nm", 			PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:130, 		Align:"Center", 		ColMerge:1, 	Format:"", 				SaveName:prefix+"lot_no", 			PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:140, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"lot_id", 			PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      Hidden:0, 	Width:80, 	Align:"Right",  	ColMerge:0,		SaveName:prefix+"item_ser_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		           {Type:"Text",      Hidden:0, 	Width:80, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"lic_plat_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
                   {Type:"Text",     Hidden:0,  	Width:70, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"fr_type", 			PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:80, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"fr_wh_loc_cd_nm", 	PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:70, 		Align:"Right", 		ColMerge:1, 	Format:"Float",		SaveName:prefix+"fr_ea_qty", 		PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:80, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"fr_cbm", 			PointCount:WMS_CBM_POINT_COUNT,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:80, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"fr_cbf", 			PointCount:WMS_CBM_POINT_COUNT,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:80, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"fr_grs_kgs", 		PointCount:3,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:80, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"fr_grs_lbs", 		PointCount:3,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:80, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"fr_net_kgs", 		PointCount:3,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:80, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"fr_net_lbs", 		PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"PopupEdit", Hidden:0, 	Width:80, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"to_type", 			PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"PopupEdit", Hidden:0, 	Width:80, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"to_wh_loc_cd_nm", 	PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:70, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"to_ea_qty", 		PointCount:0,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:80, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"to_cbm", 			PointCount:WMS_CBM_POINT_COUNT,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:80, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"to_cbf", 			PointCount:WMS_CBM_POINT_COUNT,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:80, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"to_grs_kgs", 		PointCount:3,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:80, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"to_grs_lbs", 		PointCount:3,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:80, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"to_net_kgs", 		PointCount:3,				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     Hidden:0,  	Width:80, 		Align:"Right", 		ColMerge:1, 	Format:"Float", 		SaveName:prefix+"to_net_lbs", 		PointCount:3, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Image",     Hidden:0, 	Width:50, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"rmk_img", 			PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      Hidden:1, 	Width:50, 		Align:"Left", 		ColMerge:1, 	Format:"", 				SaveName:prefix+"rmk", 				PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Image",     Hidden:0, 	Width:50, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"attach", 			PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:1,  	Width:130, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"attach_flg", 		PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Date",     Hidden:0,  	Width:80, 		Align:"Center", 	ColMerge:1,		Format:"Ymd", 				SaveName:prefix+"inbound_dt", 		PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:130, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"wib_bk_no", 		PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:180, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"cust_ord_no", 		PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:100, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"ctrt_no", 			PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:120, 		Align:"Left", 		ColMerge:1, 	Format:"", 				SaveName:prefix+"ctrt_nm", 			PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     Hidden:0,  	Width:90, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"wh_cd", 			PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Status",    Hidden:1, 	Width:30, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"ibflag", 			PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      Hidden:1, 	Width:70, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"move_seq", 		PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      Hidden:1, 	Width:0, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"file_seq", 		PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      Hidden:1, 	Width:0, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"file_path", 		PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      Hidden:1, 	Width:0, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"file_sys_nm", 		PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      Hidden:1, 	Width:0, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"file_org_nm", 		PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      Hidden:1, 	Width:0, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"file_size", 		PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      Hidden:1, 	Width:80, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"wh_nm", 			PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      Hidden:1, 	Width:50, 		Align:"Center", 	ColMerge:1, 	Format:"", 				SaveName:prefix+"mv_tp_cd", 		PointCount:0, 				KeyField:0, UpdateEdit:0,   InsertEdit:0}, 
                   {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
                   ];
       
      InitColumns(cols);
      SetSheetHeight(450);
      SetEditable(0);
      SetImageList(3,"web/img/main/icon_text02_on.gif");
      SetImageList(0,"web/img/main/icon_text_off.gif");
      SetImageList(1,"web/img/main/icon_text_on.gif");
      SetHeaderRowHeight(30);
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
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
 function initCombo(comboObj) {
	var vTextSplit=null;
	var vCodeSplit=null;
	switch(comboObj.options.id) {
		case "lot_attrib_tp":
			var txt="Item Lot No|Lot ID|Lot 04|Lot 05";
			var val="LOT_NO|LOT_ID|LOT_04|LOT_05";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				//comboObj.index=0;
				comboObj.SetSelectCode("LOT_NO");
        	} 			
			break;
		case "date_tp":
			var txt="Inbound Date|Expiration Date";
			var val="INBOUND_DT|EXP_DT";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("INBOUND_DT");
        	} 			
			break;
		case "search_tp":
			var txt="In Booking No|Cust Order No";
			var val="WIB_BK_NO|CUST_ORD_NO";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("WIB_BK_NO");
        	} 			
			break;
		case "move_plan_no_tp":
			var txt="Movement Key|Plan No";
			var val="MOVE_NO|PLAN_NO";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("MOVE_NO");
        	} 			
			break;
		case "move_plan_dt_tp":
			var txt="Movement Date|Plan Date";
			var val="MOVE_DT|PLAN_DT";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("MOVE_DT");
        	} 			
			break;
		case "plan_sts_cd":
			vTextSplit=plan_sts_cdText.split("|");
			vCodeSplit=plan_sts_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("ALL");
        	} 
			break;
		case "fr_to_tp":
			var txt="From Location|To Location";
			var val="FR|TO";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("FR");
        	} 				
			break;
	}
} 
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=sheet1;
	//sheet row 설정
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//PLAN NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "plan_no","#0100FF");
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
		//Contract NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "ctrt_no","#0100FF");
		//LOT ID 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "lot_id","#0100FF");
 		
 		//PLAN NO Underline 변경
 		sheetObj.SetCellFontUnderline(i, fix_grid01 + "plan_no", 1);
 		//BOOKING NO Underline 변경
 		sheetObj.SetCellFontUnderline(i, fix_grid01 + "wib_bk_no", 1);
 		//Contract NO Underline 변경
 		sheetObj.SetCellFontUnderline(i, fix_grid01 + "ctrt_no", 1);
 		//LOT ID Underline 변경
 		sheetObj.SetCellFontUnderline(i, fix_grid01 + "lot_id", 1);
 		
		//파일첨부 ICON
 		if(sheetObj.GetCellValue(i, fix_grid01 + "file_seq") != "") //파일첨부
		{
 			sheetObj.SetCellImage(i, fix_grid01 + "attach",3);
		}
		//comment
 		var value=sheetObj.GetCellValue(i,fix_grid01 + "rmk");
		if(value.length > 0){
 			sheetObj.SetCellImage(i,fix_grid01 + "rmk_img",1);
		}else{
 			sheetObj.SetCellImage(i,fix_grid01 + "rmk_img",0);
		}
		if(i == sheetObj.HeaderRows()&& sheetObj.RowCount()> 0)
		{
			changeHistoryBtn(sheetObj, i);
		}
	}	
	if(sheet1.RowCount()>0)
		{
			doDispPaging(docObjects[0].GetCellValue(2, "Indexing"), getObj('pagingTb'));
		}
}
function sheet1_OnClick(sheetObj, Row, Col) {
	changeHistoryBtn(sheetObj, Row);
}
function changeHistoryBtn(sheetObj, Row)
{
var move_no=sheetObj.GetCellValue(Row, fix_grid01 + "move_no").trim();
	if(move_no == "")
	{
		document.form.btn_history.disabled = true; 
	}
	else
	{
		document.form.btn_history.disabled = false;/*ComBtnEnable("btn_history"); */
	}
}
/*
 * sheet1 dbclick event
 */
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	switch (colName)
	{
		case fix_grid01 + "plan_no":
			var sUrl="./InvMoveMgmt.clt?plan_no="+sheetObj.GetCellValue(Row, fix_grid01 + "plan_no");
			parent.mkNewFrame('Inventory Movement & Hold & Damage Managemet', sUrl , "InvMoveMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "plan_no"));
			break;
		case fix_grid01 + "wib_bk_no":
			/*var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
			parent.mkNewFrame('Inbound Booking Management', sUrl, "WHInbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));*/
			
			var sUrl="./WHInMgmt.clt?req_wib_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")
			+ "&req_wh_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")  
			+ "&req_ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no") ;
			parent.mkNewFrame('Inbound Management', sUrl, "WHInMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
			break;
		case fix_grid01 + "ctrt_no":
			var sUrl="./CtrtMgmt.clt?ctrt_no="+ sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no");
			parent.mkNewFrame('Contract Management', sUrl, "CtrtMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no"));
			break;
		case fix_grid01 + "lot_id":
			var sUrl="./WHLotList.clt?wh_cd="  + sheetObj.GetCellValue(Row, fix_grid01+"wh_cd")
			+ "&wh_nm="  + sheetObj.GetCellValue(Row , fix_grid01+"wh_nm")
			+ "&ctrt_no="+ sheetObj.GetCellValue(Row , fix_grid01+"ctrt_no")
			+ "&ctrt_nm="+ sheetObj.GetCellValue(Row , fix_grid01+"ctrt_nm")
			+ "&lot_id=" + sheetObj.GetCellValue(Row , fix_grid01+"lot_id");
				parent.mkNewFrame('Lot Search', sUrl, "WHLotList_" + sheetObj.GetCellValue(Row, fix_grid01+"wh_cd") + "_" + sheetObj.GetCellValue(Row , fix_grid01+"wh_nm") + "_" + sheetObj.GetCellValue(Row , fix_grid01+"ctrt_no") + "_" + sheetObj.GetCellValue(Row , fix_grid01+"ctrt_nm") + "_" + sheetObj.GetCellValue(Row , fix_grid01+"lot_id"));
			break;
		case fix_grid01 + "rmk_img": //remark
			var value=sheetObj.GetCellValue(Row,fix_grid01 + "rmk");
			if(value.length > 0){
				ComShowMemoPad2(sheetObj, Row, fix_grid01 + "rmk", true, 200, 100,Col, Col);
			}
			break;
		case fix_grid01 + "attach": //다운로드
			fileDownload(sheetObj, Row, Col);
			break;
		case fix_grid01 + "attach_del_img": //파일첨부삭제
			if(sheetObj.GetCellValue(Row, fix_grid01 + "file_seq") != "") //파일다운로드
			{
				fileDelete(sheetObj, Row, Col);
			}
			break;
	}
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
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_bk_date_to":
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
	            cal.select(formObj.fm_in_date,formObj.to_in_date, 'MM-dd-yyyy');
				break;
			case "btn_fm_in_date":	
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
	            cal.select(formObj.fm_mv_date,formObj.to_mv_date, 'MM-dd-yyyy');
				break;
 			case "btn_ctrt_no" :
 				callBackFunc = "setCtrtNoInfo";
 				modal_center_open('./ContractRoutePopup.clt?ctrt_nm='+$("#ctrt_nm").val() + "&ctrt_no=" + $("#ctrt_no").val(), '', 900, 580,"yes");
				break;
 			case "btn_item_cd" :
 				if (isNull(formObj.ctrt_no)) {
 					ComShowCodeMessage("COM0278", "Contract No");
 					return;
 				}
 				callBackFunc = "setItem";
 				modal_center_open('./CtrtItemPopup.clt?ctrt_no='+formObj.ctrt_no.value+"&item_nm="+formObj.item_nm.value, '', 400, 520,"yes");
 				break;
 			case "btn_wh_loc_cd" :
 				if(ComIsEmpty(formObj.wh_cd))
 				{
 					ComShowCodeMessage("COM0114","Warehouse");
 					$("#wh_cd").focus();
 					return;
 				}
 				var sUrl = "./WarehouseLocPopup.clt?f_loc_cd="+ $("#wh_cd").val() + "&f_move_flg=Y&wh_loc_nm="+ formObj.wh_loc_nm.value;
 				callBackFunc = "setLocInfo";
 				modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
 				break;
 			case "SEARCHLIST":
 				btn_Search();
 				break;
 			case "EXCEL":
 				btn_Excel_Dl();
 				break;
 			case "btn_history":
 				btn_History();
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

function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.fm_mv_date,  formObj.to_mv_date, 'MM-dd-yyyy');
        break;
        
        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.fm_in_date,  formObj.to_in_date, 'MM-dd-yyyy');
        break;
    }
}

/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	var formObj=document.form;
	
	callBackFunc = "setCtrtNoInfo";
	modal_center_open('./ContractRoutePopup.clt?ctrt_nm='+formObj.ctrt_nm.value, '', 900, 580,"yes");
	
//	var sUrl="ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value;
//	ComOpenPopup(sUrl, 900, 620, "setCtrtNoInfo", "0,0", true);
}
/*
 * NAME 엔터시 팝업호출 - item name
 */
function itemPopup(){
	var formObj=document.form;
	// Contract No 체크
	if (isNull(formObj.ctrt_no)) {
		ComShowCodeMessage("COM0278", "Contract No");
		return;
	}
	
	callBackFunc = "setItem";
	modal_center_open('./CtrtItemPopup.clt?ctrt_no='+formObj.ctrt_no.value+"&item_nm="+formObj.item_nm.value, '', 400, 520,"yes");
	
//   	var sUrl="CtrtItemPopup.clt?ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_nm="+ComGetObjValue(formObj.item_nm);
//	ComOpenPopup(sUrl, 400, 560, "setItem", "0,0", true);
}
/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
		 }else{
			var rtVal = aryPopupData.split('|');
			formObj.ctrt_no.value =    rtVal[0];
			formObj.ctrt_nm.value =     rtVal[1];	
		 }
}

function setItem(aryPopupData){
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
		 }else{
			var rtVal = aryPopupData.split('|');
			formObj.item_cd.value =    rtVal[0];
			formObj.item_nm.value =    rtVal[1];
		 }
}
/*
 * location(검색조건) 입력 후 조회(ajax) callback
 */
function setLocInfo(aryPopupData){
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
		 }else{
			 var rtVal = aryPopupData.split("|");
				$("#wh_loc_cd").val(rtVal[0]);// wh_loc_cd
				$("#wh_loc_nm").val(rtVal[1]);// wh_loc_nm
				$("#wh_loc_nm_org").val(rtVal[2]);// wh_loc_nm
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
	var sheetObj=docObjects[0];
	//validation check
	if (validateForm(formObj, 'search') == false) 
	{
		return;	
	}
	ComEnableObject(document.form.btn_history, false)
	//search
	if (validateForm(docObjects[0],formObj,'Search')) {
		formObj.f_cmd.value = SEARCH;
 		docObjects[0].DoSearch("./searchInvMoveList.clt", FormQueryString(formObj,""));
	}
	
// 	var sXml=sheetObj.GetSearchData("searchInvMoveList.clt", FormQueryString(formObj,""));
//	sheetObj.LoadSearchData(convertColOrder(sXml,{Sync:1} );
}
/*
 * 엑셀다운로드
 */
//function btn_Excel() {
// 	$("#sheet1")[0].Down2Excel({ HiddenColumn:0,Merge:true,TreeLevel:false});
//			fix_grid01 + "seq|" + fix_grid01 + "attach|" + fix_grid01 + "rmk_img|" 
//			+ fix_grid01 + "move_seq|" + fix_grid01 + "file_seq|" + fix_grid01 + "file_path|" 
//			+ fix_grid01 + "file_sys_nm|" + fix_grid01 + "file_org_nm|" + fix_grid01 + "file_size|" 
//			+ fix_grid01 + "rn|" + fix_grid01 + "wh_nm|" 
//			+ fix_grid01 + "mv_tp_cd|" + fix_grid01 + "ibflag", "", false, false);	
//}
function btn_Excel_Dl()
{
 	var prefix = fix_grid01;
	if(docObjects[0].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	//docObjects[0].Down2Excel();
    	for(var i=docObjects[0].HeaderRows() ; i<docObjects[0].RowCount() + docObjects[0].HeaderRows() ; i++){
    		if(!('' == docObjects[0].GetCellValue(i, prefix + "file_path"))){
    			docObjects[0].SetCellValue(i, prefix + "attach_flg", "Y", 0);
        	}
    	}
    	
    	sheet1.Down2Excel( {DownCols: makeSkipColBl(docObjects[0], "32|34", "31|33"), SheetDesign:1, Merge:1, HiddenColumn: 0, AutoSizeColumn: 1, ExtendParam: "ColumnColor: " + prefix + "plan_no|" + prefix + "lot_id|" + prefix + "wib_bk_no|" + prefix + "ctrt_no"});
    }
}
function btn_History(){
	var sheetObj=sheet1;
	if(sheetObj.RowCount()<= 0)
	{
		ComShowCodeMessage("COM0228");
		return;
	}
var move_no=sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "move_no").trim();
	if(move_no != "")
	{
var sUrl="./TrsHistoryList.clt?wh_cd="  + sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"wh_cd")
+ "&wh_nm="  + sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"wh_nm")
+ "&ctrt_no="+ sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"ctrt_no")
+ "&ctrt_nm="+ sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"ctrt_nm")
+ "&trs_no=" + sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"move_no")
+ "&trs_type=" + sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"mv_tp_cd");

var sUrlCall = "TrsHistoryList_" + sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"wh_cd") + "_" + sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"wh_nm");
sUrlCall += "_" + sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"ctrt_no") + "_" + sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"ctrt_nm");
sUrlCall += "_" + sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"move_no") + "_" + sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"mv_tp_cd");
		parent.mkNewFrame('Transaction History Search', sUrl,  sUrlCall);
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
				//warehouse 필수로 입력되어야함.
				if(ComIsEmpty(formObj.move_no) && formObj.wh_cd.value == ""){
				    ComShowCodeMessage("COM12233");
				    return false;
			    }
				//contract no 필수로 입력되어야함.
				if(ComIsEmpty(formObj.move_no) && ComIsEmpty(formObj.ctrt_no))
				{
					ComShowCodeMessage("COM0114","Contract No");
					$("#ctrt_no").focus();
					return false;
				}					
				//in date 또는 movement date 필수로 입력되어야함.
				if(ComIsEmpty(formObj.move_no) && ComIsEmpty(formObj.fm_in_date) && ComIsEmpty(formObj.fm_mv_date))
				{
					ComShowCodeMessage("COM0114","Movement Date or Plan Date or Inbound Date or Expiration Date");
					$("#fm_mv_date").focus();
					return false;
				}
				if(!ComIsEmpty(formObj.fm_in_date) && ComIsEmpty(formObj.to_in_date)){
					formObj.to_in_date.value=ComGetNowInfo();
				}
				/* 3개월 duration 주석
				if (!ComIsEmpty(formObj.fm_in_date) && getDaysBetween2(formObj.fm_in_date.value, formObj.to_in_date.value)> 92) {
					ComShowCodeMessage("COM0141","3","(" + $("#date_tp")[0].GetSelectText()+ ")");
					formObj.fm_in_date.focus();
					return false;
				}
				*/
				if (!ComIsEmpty(formObj.fm_in_date) && !isDate(formObj.fm_in_date)) {
					ComShowCodeMessage("COM0114",date_tp.options[date_tp.selectedIndex].text);
					formObj.fm_in_date.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.to_in_date) && !isDate(formObj.to_in_date)) {
					ComShowCodeMessage("COM0114",date_tp.options[date_tp.selectedIndex].text);
					formObj.to_in_date.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.fm_in_date)&&ComIsEmpty(formObj.to_in_date))||(ComIsEmpty(formObj.fm_in_date)&&!ComIsEmpty(formObj.to_in_date))) {
					ComShowCodeMessage("COM0122",date_tp.options[date_tp.selectedIndex].text);
					formObj.fm_in_date.focus();
					return false;
				}
				if (getDaysBetween2(formObj.fm_in_date.value, formObj.to_in_date.value)<0) {
					ComShowCodeMessage("COM0122",date_tp.options[date_tp.selectedIndex].text);
					formObj.fm_in_date.focus();
					return false;
				}
				if(!ComIsEmpty(formObj.fm_mv_date) && ComIsEmpty(formObj.to_mv_date)){
					formObj.to_mv_date.value=ComGetNowInfo();
				}
				/* 3개월 duration 주석
				if (!ComIsEmpty(formObj.fm_mv_date) && getDaysBetween2(formObj.fm_mv_date.value, formObj.to_mv_date.value)> 92) {
					ComShowCodeMessage("COM0141","3","(" + $("#move_plan_dt_tp").options[date_tp.selectedIndex].text+ ")");
					formObj.fm_mv_date.focus();
					return false;
				}
				*/
				if (!ComIsEmpty(formObj.fm_mv_date) && !isDate(formObj.fm_mv_date)) {
					ComShowCodeMessage("COM0114",move_plan_dt_tp.options[move_plan_dt_tp.selectedIndex].text);
					formObj.fm_mv_date.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.to_mv_date) && !isDate(formObj.to_mv_date)) {
					ComShowCodeMessage("COM0114",move_plan_dt_tp.options[move_plan_dt_tp.selectedIndex].text);
					formObj.to_mv_date.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.fm_mv_date)&&ComIsEmpty(formObj.to_mv_date))||(ComIsEmpty(formObj.fm_mv_date)&&!ComIsEmpty(formObj.to_mv_date))) {
					ComShowCodeMessage("COM0122",move_plan_dt_tp.options[move_plan_dt_tp.selectedIndex].text);
					formObj.fm_mv_date.focus();
					return false;
				}
				if (getDaysBetween2(formObj.fm_mv_date.value, formObj.to_mv_date.value)<0) {
					ComShowCodeMessage("COM0122",move_plan_dt_tp.options[move_plan_dt_tp.selectedIndex].text);
					formObj.fm_mv_date.focus();
					return false;
				}
				break;
		}
	}
	return true;
}
/**
 * 마우스 아웃일때 
 */
function form_deactivate() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=window.event.srcElement.getAttribute("value");
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "lot_attrib":	
				btn_Search();
			break;	
			case "search_no":	
				btn_Search();
			break;
			case "move_no":	
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
	if(obj.value != ""){
	/*	$.ajax({
			url : "searchTlLocInfo.clt?loc_cd="+obj.value+"&type=WH",
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				resultLocInfo(result.xml, obj.name);
			}
		});*/
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+formObj.wh_cd.value+'&type=WH', './GateServlet.gsl');
//		var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?loc_cd="+obj.value+"&type=WH");
//		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
//			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
//		}
//		resultLocInfo(sXml, obj.name);
	}
	else
	{
		$("#wh_nm").val("");
	}
}
function resultLocInfo(reqVal){
	var formObj=document.form;
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
		 formObj.wh_cd.value="";
		 formObj.wh_nm.value=""; 
	 }
	
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj){
	var formObj=document.form;
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+formObj.ctrt_no.value, './GateServlet.gsl');
}
function resultCtrtInfo(reqVal) {
	var formObj=document.form;	
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
		 formObj.ctrt_no.value="";
		 formObj.ctrt_nm.value="";
	 }
	
}
/*
 * Item search
 * OnKeyDown 13 or onChange
 */
function getItemInfo(obj){
	if(obj.value != ""){
		var formObj=document.form;
		// Contract No 체크
		if (isNull(formObj.ctrt_no)) {
			ComShowCodeMessage("COM0278", "Contract No");
			return;
		}
		/*$.ajax({
			url : "searchWHItemCodeInfo.clt?ctrt_no="+ComGetObjValue(formObj.ctrt_no) + "&item_cd=" + obj.value,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				resultItemInfo(result.xml);
			}
		});*/
		ajaxSendPost(resultItemInfo, 'reqVal', '&goWhere=aj&bcKey=searchWHItemCodeInfo&ctrt_no='+formObj.ctrt_no.value+ "&item_cd=" + encodeURIComponent(obj.value), './GateServlet.gsl');
	}
	else
	{
		$("#item_nm").val("");
	}
}
function resultItemInfo(reqVal) {
	var formObj=document.form;
	
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.item_nm.value=rtnArr[3];
	   }
	   else{
	    formObj.item_cd.value="";
	    formObj.item_nm.value=""; 
	   }
	  }
	  else{
	   formObj.item_cd.value="";
	   formObj.item_nm.value=""; 
	  }
	 }
	 else{
		 formObj.item_cd.value="";
		 formObj.item_nm.value="";
	 }
	
}
/*
 * Location search
 * onChange
 */
var div_temp = "";
function getLocationInfo(div){
	div_temp = div;
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
	var sParam="f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm=" + $("#wh_loc_nm").val() + "&f_move_flg=Y";
/*	$.ajax({
		url : "searchWarehouseLocInfoForName.clt?"+sParam ,
		success : function(result) {
			if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
			}
			resultLocationInfo(result.xml, div);
		}
	});*/
	ajaxSendPost(resultLocationInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
}
function resultLocationInfo(reqVal) {
	
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.wh_loc_nm.value=rtnArr[1];
	    formObj.wh_loc_nm_org.value=rtnArr[1];
	    formObj.wh_loc_cd.value=rtnArr[0];
	    if(div_temp == 'e')
	    	{
	    		btn_Search();
	    	}
	   }
	   else{
	    formObj.wh_loc_cd.value="";
	    formObj.wh_loc_nm.value=""; 
	    formObj.wh_loc_nm_org.value=""; 
	    $("#wh_loc_nm").focus();
	   }
	  }
	  else{
		  formObj.wh_loc_cd.value="";
		  formObj.wh_loc_nm.value=""; 
		  formObj.wh_loc_nm_org.value=""; 
		  $("#wh_loc_nm").focus();
	  }
	 }
	 else{
 	 	  formObj.wh_loc_cd.value="";
		  formObj.wh_loc_nm.value=""; 
		  formObj.wh_loc_nm_org.value=""; 
		  $("#wh_loc_nm").focus();
	 }
	
}


function makeSkipColBl(obj, strShowIgr, strHideIgr){
    var cntCol = obj.LastCol();
    var arrColRtn = new Array();
    var arrShowIgr = new Array();
    var arrHideIgr = new Array();
    arrShowIgr = strShowIgr.split("|");
    arrHideIgr = strHideIgr.split("|");
    for(var i = 0; i <= cntCol; i++){
    	if(1 == obj.GetColHidden(i) 
    		|| obj.GetCellProperty(0, i, "Type") == "DummyCheck" 
    		|| obj.GetCellProperty(0, i, "Type") == "Status" 
    		|| obj.GetCellProperty(0, i, "Type") == "DelCheck"){
    		var showFlg = false;
    		for(var j = 0; j < arrShowIgr.length; j++){
    			if(arrShowIgr[j] == i)
    				showFlg = true;
    		}
    		if(!showFlg){
    			arrColRtn.push(i);
    		}
    	}
    	if(0 == obj.GetColHidden(i)){
    		var hideFlg = false;
    		for(var k = 0; k < arrHideIgr.length; k++){
    			if(arrHideIgr[k] == i)
    				hideFlg = true;
    		}
    		if(hideFlg){
    			arrColRtn.push(i);
    		}
    	}    	
    }
    var rtnStr = "";
    for(var i = 0; i <= cntCol; i++){
           if(!arrColRtn.contains(i)){
        	   rtnStr += "|"+ i;
           }
    }
    return rtnStr.substring(1);
}