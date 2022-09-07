/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : TrsHistoryList.js
*@FileTitle  : Transaction History
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/03/05
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="";

var rtnary = new Array(1);
var callBackFunc = "";

var firCalFlag = false;
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	var formObj=document.form;
	
	if(formObj.def_wh_cd.value != null && formObj.def_wh_cd.value != ""){
		formObj.wh_cd.value = formObj.def_wh_cd.value;
	}
	
	if(formObj.def_wh_ctrt_no.value != null && formObj.def_wh_ctrt_no.value != ""){
		
		formObj.ctrt_no.value = formObj.def_wh_ctrt_no.value;
		formObj.ctrt_nm.value = formObj.def_wh_ctrt_nm.value;
	}
		
		
	if(formObj.trs_no.value != "" ){
//		comboObjects[0].SetSelectCode(formObj.trs_type.value);
		formObj.trs_tp_cd.value = formObj.trs_type.value
		btn_Search();
	}else{
		formObj.fm_trs_loc_dt.value=ComGetDateAdd(null, "d", -31, "-");
		formObj.to_trs_loc_dt.value=ComGetNowInfo();
	}
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/**
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
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
		case "trs_tp_cd":
			vTextSplit=trs_tp_cdText.split("|");
			vCodeSplit=trs_tp_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
        	} 
			break;
		case "trs_sts_cd":
			vTextSplit=trs_sts_cdText.split("|");
			vCodeSplit=trs_sts_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
        	} 
			break;
		}
	} 
function initControl() {
	var formObject=document.form;
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    // OnChange 이벤트
    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
    // OnKeyUp 이벤트
    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
    //- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
document.onkeydown =obj_keydown;
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "trs_no":	
				btn_Search();
			break;	
			case "item_cd":	
				btn_Search();
			break;
			case "lot_no":	
				btn_Search();
			break;
			case "lot_id":	
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
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "btn_ctrt_no" :
			callBackFunc = "setCtrtNoInfo";
			modal_center_open('./ContractRoutePopup.clt?ctrt_nm='+formObj.ctrt_nm.value + "&ctrt_no=" + formObj.ctrt_no.value, '',900, 580,"yes");
			break;
		case "SEARCHLIST":	
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

function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.form.f_CurPage.value=1;
	doWork('SEARCHLIST');
}

function searchList(){
	document.form.f_CurPage.value=1;
	btn_Search();
}

function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.fm_trs_loc_dt,  formObj.to_trs_loc_dt, 'MM-dd-yyyy');
        break;
    }
}

function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){
	     // var headCount=ComCountHeadTitle(hdr1);
	      var prefix=fix_grid01;
	      SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:6, DataRowMerge:0 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('TrsHistoryList_HDR1'), Align:"Center"},{ Text:getLabel('TrsHistoryList_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);
	      var cols = [
	        	      {Type:"Seq",       Hidden:0,    	Width:40,  Align:"Center", 	ColMerge:1,  SaveName: prefix+ "seq",          	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1}, //seq
	        	      {Type:"Text",       Hidden:0,		Width:120, Align:"Left",   	ColMerge:1,  SaveName: prefix+ "trs_no",       	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Date",       Hidden:0,		Width:140, Align:"Center", 	ColMerge:1,  SaveName: prefix+ "trs_loc_dt",   	KeyField:0,	CalcLogic:"",Format:"YmdHms",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0,		Width:180, Align:"Left", 	ColMerge:1,  SaveName: prefix+ "trs_tp_nm",    	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0,		Width:60,  Align:"Center", 	ColMerge:1,  SaveName: prefix+ "trs_sts_nm",   	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0,		Width:90,  Align:"Left",   	ColMerge:1,  SaveName: prefix+ "item_cd",      	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0,		Width:300, Align:"Left",   	ColMerge:1,  SaveName: prefix+ "item_nm",      	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Date",       Hidden:0,		Width:90,  Align:"Center", 	ColMerge:1,  SaveName: prefix+ "inbound_date", 	KeyField:0,	CalcLogic:"",Format:"Ymd",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0,		Width:100, Align:"Left",   	ColMerge:1,  SaveName: prefix+ "lot_no",       	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Float",      Hidden:0,		Width:50,  Align:"Right",  	ColMerge:1,  SaveName: prefix+ "ori_qty",      	KeyField:0,	CalcLogic:"",Format:"Integer",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0, 	Width:70,  Align:"Center", 	ColMerge:1,  SaveName: prefix+ "ori_wh_loc_cd",	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Float",      Hidden:0, 	Width:50,  Align:"Right",  	ColMerge:1,  SaveName: prefix+ "trs_qty",      	KeyField:0,	CalcLogic:"",Format:"Integer",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0, 	Width:70,  Align:"Center", 	ColMerge:1,  SaveName: prefix+ "trs_wh_loc_cd",	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0,		Width:100, Align:"Center",  ColMerge:1,  SaveName: prefix+ "ctrt_no",      	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0,		Width:120, Align:"Left",   	ColMerge:1,  SaveName: prefix+ "ctrt_nm",      	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0,		Width:120, Align:"Center", 	ColMerge:1,  SaveName: prefix+ "wh_cd",        	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0,		Width:110, Align:"Left",   	ColMerge:1,  SaveName: prefix+ "wh_nm",        	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0,		Width:100, Align:"Center", 	ColMerge:1,  SaveName: prefix+ "rgst_ofc_cd",  	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0,		Width:120, Align:"Left",   	ColMerge:1,  SaveName: prefix+ "rgst_nm",      	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:0,		Width:200, Align:"Left",   	ColMerge:1,  SaveName: prefix+ "lot_id",       	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:1,   	Width:10,  Align:"Center", 	ColMerge:1,  SaveName: prefix+ "trs_tp_cd",    	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:1,		Width:120, Align:"Left",   	ColMerge:1,  SaveName: prefix+ "wib_bk_no",     KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:1,		Width:200, Align:"Left",   	ColMerge:1,  SaveName: prefix+ "obk_no",       	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:1,   	Width:10,  Align:"Center", 	ColMerge:1,  SaveName: prefix+ "lp_bkg_no",    	KeyField:0,	CalcLogic:"",Format:"",PointCount:0,UpdateEdit:1,InsertEdit:1},
	        	      {Type:"Text",       Hidden:1, 	Width:80,  Align:"Center",  ColMerge:0,  SaveName:"Indexing",         		KeyField:0, CalcLogic:"",Format:"",PointCount:0,UpdateEdit:0,InsertEdit:0 }
	        	      ];   
		
	      InitColumns(cols);
	      SetSheetHeight(450);
	      SetHeaderRowHeight(30);
	      SetAutoRowHeight(0);
	      resizeSheet();
	      SetEditable(0);
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
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	var sheetObj=docObjects[0];
	var seq=0;
	var seqBkNo="";
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "trs_no","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "ctrt_no","#0100FF");
 		
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "trs_no", 1);
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "ctrt_no", 1);
	}
	if(sheet1.RowCount()>0)
	{
		doDispPaging(docObjects[0].GetCellValue(2, "Indexing"), getObj('pagingTb'));
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid01 + "trs_no":
			if(sheetObj.GetCellValue(Row, fix_grid01 + "trs_tp_cd") == "IC" || sheetObj.GetCellValue(Row, fix_grid01 + "trs_tp_cd") == "PA"){
//				var sUrl="./WHICUpdate.clt?search_no="+sheetObj.GetCellValue(Row, fix_grid01 + "trs_no")+ "&search_tp=WIB_IN_NO";
//				parent.mkNewFrame('Inbound Complete Update', sUrl, "WHICUpdate_" + sheetObj.GetCellValue(Row, fix_grid01 + "trs_no") + "_WIB_IN_NO");
				
				var sUrl="./WHInMgmt.clt?req_wib_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")
				+ "&req_wh_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")  
				+ "&req_ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no") ;
				parent.mkNewFrame('Inbound Management', sUrl, "WHInMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
				
			/*}else if(sheetObj.GetCellValue(Row, fix_grid01 + "trs_tp_cd") == "PA"){
				var sUrl="./WHPutawayMgmt.clt?wib_in_no="+ sheetObj.GetCellValue(Row, fix_grid01 + "trs_no");
				parent.mkNewFrame('Putaway Management', sUrl, "WHPutawayMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "trs_no"));*/
				
			}else if(sheetObj.GetCellValue(Row, fix_grid01 + "trs_tp_cd") == "OCB"){
				/*var sUrl="./WHOCUpdate.clt?search_no="+sheetObj.GetCellValue(Row, fix_grid01 + "trs_no")+"&search_tp=WOB_OUT_NO&search_div=bk";
				parent.mkNewFrame('Outbound Complete Update', sUrl, "WHOCUpdate_" + sheetObj.GetCellValue(Row, fix_grid01 + "trs_no") + "_WOB_OUT_NO_bk");*/
				var sUrl="./WHOutMgmt.clt?req_wob_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "obk_no")+ "&req_wh_cd="+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")+"&req_wh_nm="+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_nm") + "&cntr_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "cntr_no");
				parent.mkNewFrame('Outbound Management', sUrl);
			}else if(sheetObj.GetCellValue(Row, fix_grid01 + "trs_tp_cd") == "OCL"){
//				var sUrl="./WHOCUpdate.clt?search_no="+sheetObj.GetCellValue(Row, fix_grid01 + "trs_no")+"&search_tp=LP_NO&search_div=lp";
//				parent.mkNewFrame('Outbound Complete Update', sUrl, "WHOCUpdate_" + sheetObj.GetCellValue(Row, fix_grid01 + "trs_no") + "LP_NO_lp");
				
				var sUrl="./WHOutMgmt.clt?req_wob_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "lp_bkg_no")+ "&req_wh_cd="+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")+"&req_wh_nm="+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_nm") + "&cntr_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "cntr_no");
				parent.mkNewFrame('Outbound Management', sUrl);
				
			}else if(sheetObj.GetCellValue(Row, fix_grid01 + "trs_tp_cd") == "ADJ"){
				var sUrl="./InvAdjustList.clt?adjust_no="+sheetObj.GetCellValue(Row, fix_grid01 + "trs_no");
				parent.mkNewFrame('Inventory Adjustment Search', sUrl, "InvAdjustList_" + sheetObj.GetCellValue(Row, fix_grid01 + "trs_no"));
				
			}
			else if(sheetObj.GetCellValue(Row, fix_grid01 + "trs_tp_cd") == "MV"
				|| sheetObj.GetCellValue(Row, fix_grid01 + "trs_tp_cd") == "DMG"
					|| sheetObj.GetCellValue(Row, fix_grid01 + "trs_tp_cd") == "HLD"){
				var sUrl="./InvMoveList.clt?move_no="+sheetObj.GetCellValue(Row, fix_grid01 + "trs_no") + "&mv_tp_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "trs_tp_cd");
				parent.mkNewFrame('Inventory Movement & Hold & Damage Search', sUrl, "InvMoveList_" + sheetObj.GetCellValue(Row, fix_grid01 + "trs_no") + "_" + sheetObj.GetCellValue(Row, fix_grid01 + "trs_tp_cd"));
				
			}
			break;
		case fix_grid01 + "ctrt_no":
			var sUrl="./CtrtMgmt.clt?ctrt_no="+ sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no");
			parent.mkNewFrame('Contract Management', sUrl, "CtrtMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no"));
			break;
	}
}
function setWHICItemList(aryPopupData)
{
	var wib_in_no=aryPopupData[0][0];
	var sUrl="./WHICUpdate.clt?search_no="+wib_in_no + "&search_tp=WIB_IN_NO";
	parent.mkNewFrame('Inbound Complete Update', sUrl, "WHICUpdate_" + wib_in_no + "_WIB_IN_NO");
}
/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	var formObj=document.form;
	
	callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt?ctrt_nm=' + formObj.ctrt_nm.value, rtnary, 900, 580,"yes");
	    
//	var sUrl="ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value;
//	ComOpenPopup(sUrl, 900, 630, "setCtrtNoInfo", "0,0", true);
}
/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
		 }else{
			 var rtVal = aryPopupData.split("|");
			 formObj.ctrt_no.value =     rtVal[0];
			 formObj.ctrt_nm.value =     rtVal[1];	
		 }
}

/*
 * 팝업 관련 로직 끝
 */
function btn_Search(){
	var formObj=document.form;
	var sheetObj1=sheet1;
	//ComOpenWait(true);
	//setTimeout(function(){
	if (validateForm(formObj, 'search')) {
		var sXml="";
		sheetObj1.RemoveAll();
		formObj.f_cmd.value=SEARCH;
		sheetObj1.DoSearch("./TrsHistoryListGS.clt", FormQueryString(formObj,""));
// 		sXml=sheetObj1.GetSearchData("./TrsHistoryListGS.clt", FormQueryString(formObj,""));
// 		var xml = convertColOrder(sXml,fix_grid01);
//		sheetObj1.LoadSearchData(xml,{Sync:1} );
	}
//	},100);	
	//ComOpenWait(false);
}
/*
 * 엑셀다운로드
 */
function btn_Excel() {
	if(sheet1.RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	var prefix = "Grd01";
    	docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1, ExtendParam: "ColumnColor: " + prefix + "trs_no|" + prefix + "ctrt_no"});
    }
 	
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			
			if(formObj.wh_cd.value == ''){
				ComShowCodeMessage('COM12113',"Warehouse");
				
				formObj.wh_cd.focus();
				
				return false;
			}
				
			if ((!ComIsEmpty(formObj.fm_trs_loc_dt)&&ComIsEmpty(formObj.to_trs_loc_dt))) {
				formObj.to_trs_loc_dt.value=ComGetNowInfo();
			}
			if(ComIsEmpty(formObj.ctrt_no)){
				ComShowCodeMessage("COM0114","Contract No");
				$("#ctrt_no").focus();
				return false;
			}
//			if(ComIsEmpty(formObj.wh_cd)){
//				ComShowCodeMessage("COM0114","Warehouse");
//				$("#wh_cd").focus();
//				return false;
//			}
			if(ComIsEmpty(formObj.trs_no)){
				if(ComIsEmpty(formObj.fm_trs_loc_dt)){
					ComShowCodeMessage("COM0114","Transaction No or Transaction Date");
					formObj.fm_trs_loc_dt.focus();
					return false;
				} 
				/* 3개월 duration 주석
				else {
					if (getDaysBetween2(formObj.fm_trs_loc_dt.value, formObj.to_trs_loc_dt.value)> 92) {
						ComShowCodeMessage("COM0141","3","(Transaction Date)");
						formObj.fm_trs_loc_dt.focus();
						return false;
					}
				}
				*/
			}
			if (!ComIsEmpty(formObj.fm_trs_loc_dt) && !isDate(formObj.fm_trs_loc_dt)) {
				ComShowCodeMessage("COM0114","Transaction Date");
				formObj.fm_trs_loc_dt.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.to_trs_loc_dt) && !isDate(formObj.to_trs_loc_dt)) {
				ComShowCodeMessage("COM0114","Transaction Date");
				formObj.to_trs_loc_dt.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.fm_trs_loc_dt)&&ComIsEmpty(formObj.to_trs_loc_dt))||(ComIsEmpty(formObj.fm_trs_loc_dt)&&!ComIsEmpty(formObj.to_trs_loc_dt))) {
				ComShowCodeMessage("COM0122","Transaction Date");
				formObj.fm_trs_loc_dt.focus();
				return false;
			}
			/* Tin.Luong Comment, Function validate calendar was checked date between. 
			 * if (getDaysBetween2(formObj.fm_trs_loc_dt.value, formObj.to_trs_loc_dt.value)<0) {
				ComShowCodeMessage("COM0122","Transaction Date!");
				formObj.fm_trs_loc_dt.focus();
				return false;
			}*/
			break;
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
//	if(obj.value != ""){
//	var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?loc_cd="+obj.value+"&type=WH");
//	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
//		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
//		}
//	resultLocInfo(sXml, obj.name);
//	}
//	else
//	{
//		$("#wh_nm").val("");
//	}
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
}
//function resultLocInfo(resultXml, name){
//	var formObj=document.form;
//	if(name == "wh_cd"){
//		if(getXmlDataNullToNullString(resultXml,'loc_nm') != ""){
//			formObj.wh_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
//		}else{
//			formObj.wh_cd.value="";
//			formObj.wh_nm.value="";
//		}
//	}
//}
function resultLocInfo(reqVal){
//	var formObj=document.form;
//	if(name == "wh_cd"){
//		if(getXmlDataNullToNullString(resultXml,'loc_nm') != ""){
//			formObj.wh_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
//		}else{
//			formObj.wh_cd.value="";
//			formObj.wh_nm.value="";
//		}
//	}
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
//	if(obj.value != ""){
//		var sXml=docObjects[0].GetSearchData("searchCtrtInfo.clt?ctrt_no="+obj.value);
//				if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
//					alert(getXmlDataNullToNullString(sXml,'exception_msg'));
//				}
//				resultCtrtInfo(sXml);
//	}
//	else
//	{
//		$("#ctrt_nm").val("");
//	}

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
