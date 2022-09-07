/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvAdjustList.js
*@FileTitle  : Inventory Adjustment Search
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================*/

var docObjects=new Array();
var firCalFlag=false;
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var loading_flag="N";

//#3390-Check Authority WMS CODE
var isWmsAuthOk = false; 

function loadPage() {
	var formObj=document.form;	
	//doShowProcess(true);
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//doHideProcess(false);
	loading_flag="Y";
	initControl();
	if($("#req_adjust_no").val() == ""){ //번호가 없을경우
		// Warehouse&Contract 세션 정보 Default 세팅
		setFieldValue(formObj.wh_cd, ComGetObjValue(formObj.def_wh_cd));
		setFieldValue(formObj.wh_nm, ComGetObjValue(formObj.def_wh_nm));
		setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no));	
		setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));
		setFieldValue(formObj.adjust_date_fm, ComGetDateAdd(null, "d", -31, "-"));	
		setFieldValue(formObj.adjust_date_to, ComGetNowInfo());	
	}
	else
	{
		$("#adjust_no").val($("#req_adjust_no").val());
		btn_Search();//조회
	}
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
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
//function initCombo(comboObj, comboNo) {
//	var vTextSplit=null;
//	var vCodeSplit=null;
//	switch(comboObj.options.id) {
//	case "reason_cd":
//		vTextSplit=reason_cdText.split("|");
//		vCodeSplit=reason_cdCode.split("|");				
//		with(comboObj) {
//			comboObj.SetDropHeight(125);
//			InsertItem(0,  "ALL", "ALL");
//			for(var j=0;j<vCodeSplit.length; j++){
//				InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
//			}
//			comboObj.SetSelectIndex(0);
//    	}
//		break;
//	}
//} 
 function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate", document.form);
//    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);  
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=event.srcElement.getAttribute("value");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "wib_bk_no":	
				btn_Search();
			break;	
			case "item_cd":	
				btn_Search();
			break;
			case "lot_no":	
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

function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "btn_ctrt_no":	
				var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value+"&ctrt_no="+formObj.ctrt_no.value;
				//ComOpenPopup(sUrl, 900, 610, "setCtrtNoInfo", "0,0", true);
				callBackFunc = "setCtrtNoInfo";
			    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
			break;
		case "btn_adjust_date_to":	
            var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.adjust_date_fm, formObj.adjust_date_to, 'MM-dd-yyyy');
			break;			
		case "btn_wh_loc_cd":	
			if (ComIsEmpty(formObj.wh_cd)) {
				ComShowCodeMessage("COM0114", "Warehouse");
				return;
			}
			var sUrl="./WarehouseLocPopup.clt?f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_adjust_flg=Y" + "&f_wh_loc_nm=" + formObj.wh_loc_nm.value;
			//ComOpenPopup(sUrl, 700, 530, "setAdjustLocInfo", "0,0", true);
			callBackFunc = "setAdjustLocInfo";
		    modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
			break;
		case "SEARCHLIST":
			sheet1.RemoveAll();
			btn_Search();
			break;
		case "btn_History":	
			btn_History();
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
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":
		    with(sheetObj){
	       
	      var prefix=fix_grid01;
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('InvAdjustList_HDR1'), Align:"Center"},{ Text:getLabel('InvAdjustList_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);
	      var cols = [
	    			  {Type:"Seq", 		Hidden:0,   Width:30,	Align:"Center",  	ColMerge:1, 	 SaveName: prefix + "seq", 			KeyField:0, CalcLogic:"",  	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //seq
	        	      {Type:"Text",		Hidden:0,	Width:130,	Align:"Center",  	ColMerge:1, 	 SaveName: prefix + "adjust_no", 	KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //adjustment no
	        	      {Type:"Date",		Hidden:0,	Width:80,	Align:"Center",  	ColMerge:1, 	 SaveName: prefix + "adjust_dt",	KeyField:0, CalcLogic:"",	Format:"Ymd",		    PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //adjustment date
	        	      {Type:"Text",		Hidden:0,	Width:120,	Align:"Left",  	 	ColMerge:1, 	 SaveName: prefix + "reason_nm", 	KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //reason
	        	      {Type:"Text",		Hidden:0,	Width:90,	Align:"Center",  	ColMerge:1, 	 SaveName: prefix + "item_cd", 		KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //item
	        	      {Type:"Text",		Hidden:0,	Width:90,	Align:"Left",  	 	ColMerge:1, 	 SaveName: prefix + "item_nm",		KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //item name
	        	      {Type:"Text",		Hidden:0,	Width:110, 	Align:"Left",  	 	ColMerge:1, 	 SaveName: prefix + "lot_no", 		KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //item lot no
	        	      {Type:"Text",		Hidden:0,	Width:130, 	Align:"Center",  	ColMerge:1, 	 SaveName: prefix + "lot_id", 		KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //lot id
	        	      {Type:"Text",     Hidden:0,   Width:80, 	Align:"Right",  	ColMerge:0,		SaveName:prefix+"item_ser_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
				      {Type:"Text",     Hidden:0,   Width:80, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"lic_plat_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
				      {Type:"Text",     Hidden:0,   Width:80, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"po_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
	        	      {Type:"Text",		Hidden:0,	Width:80, 	Align:"Left",  	 	ColMerge:1, 	 SaveName: prefix + "wh_loc_nm", 	KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //location
	        	      {Type:"Float",	Hidden:0,	Width:55, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "fr_ea_qty", 	KeyField:0, CalcLogic:"",	Format:"Integer",		PointCount:0,	UpdateEdit:1,	InsertEdit:1}, //origin qty
	        	      {Type:"Float",	Hidden:0,	Width:75, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "adj_ea_qty",	KeyField:0, CalcLogic:"",	Format:"Integer",		PointCount:0,	UpdateEdit:1,	InsertEdit:1}, //adjust qty
	        	      {Type:"Float",	Hidden:0,	Width:75, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "to_ea_qty", 	KeyField:0, CalcLogic:"",	Format:"Integer",		PointCount:0,	UpdateEdit:1,	InsertEdit:1}, //result qty
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "fr_cbm",      	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:WMS_CBM_POINT_COUNT,	UpdateEdit:1,	InsertEdit:1},	//cbm-CBM
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "fr_cbf",      	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:WMS_CBM_POINT_COUNT,	UpdateEdit:1,	InsertEdit:1},	//cbm-CBF
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "fr_grs_kgs",  	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:3,	UpdateEdit:1,	InsertEdit:1},	//gwt-KGS
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "fr_grs_lbs",  	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:3,	UpdateEdit:1,	InsertEdit:1},	//gwt-LBS
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "fr_net_kgs",  	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:3,	UpdateEdit:1,	InsertEdit:1},	//nwt-KGS
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "fr_net_lbs",  	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:3,	UpdateEdit:1,	InsertEdit:1},	//nwt-LBS
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "adj_cbm",   	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:WMS_CBM_POINT_COUNT,	UpdateEdit:1,	InsertEdit:1},	//cbm-CBM
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "adj_cbf", 		KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:WMS_CBM_POINT_COUNT,	UpdateEdit:1,	InsertEdit:1},	//cbm-CBF
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "adj_grs_kgs", 	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:3,	UpdateEdit:1,	InsertEdit:1},	//gwt-KGS
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "adj_grs_lbs",	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:3,	UpdateEdit:1,	InsertEdit:1},	//gwt-LBS
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "adj_net_kgs", 	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:3,	UpdateEdit:1,	InsertEdit:1},	//nwt-KGS
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "adj_net_lbs", 	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:3,	UpdateEdit:1,	InsertEdit:1},	//nwt-LBS
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "to_cbm",     	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:WMS_CBM_POINT_COUNT,	UpdateEdit:1,	InsertEdit:1},	//cbm-CBM
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "to_cbf",     	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:WMS_CBM_POINT_COUNT,	UpdateEdit:1,	InsertEdit:1},	//cbm-CBF
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "to_grs_kgs", 	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:3,	UpdateEdit:1,	InsertEdit:1},	//gwt-KGS
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "to_grs_lbs", 	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:3,	UpdateEdit:1,	InsertEdit:1},	//gwt-LBS
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "to_net_kgs", 	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:3,	UpdateEdit:1,	InsertEdit:1},	//nwt-KGS
	        	      {Type:"Float",	Hidden:0,	Width:80, 	Align:"Right",  	ColMerge:1, 	 SaveName: prefix + "to_net_lbs", 	KeyField:0, CalcLogic:"",	Format:"Float",			PointCount:3,	UpdateEdit:1,	InsertEdit:1},	//nwt-LBS
	        	      {Type:"Image",	Hidden:0,	Width:70, 	Align:"Center",  	ColMerge:1, 	 SaveName: prefix+ "rmk_img", 		KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //rmk_img
	        	      {Type:"Text",		Hidden:1,	Width:45, 	Align:"Left",  		ColMerge:1, 	 SaveName: prefix+ "rmk", 			KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1},	 					//remark
	        	      {Type:"Text",		Hidden:0,	Width:80, 	Align:"Center",  	ColMerge:1, 	 SaveName: prefix + "inbound_dt", 	KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //inbound date
	        	      {Type:"Text",		Hidden:0,	Width:130, 	Align:"Center",  	ColMerge:1, 	 SaveName: prefix + "wib_bk_no", 	KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //ib booking no
	        	      {Type:"Text",		Hidden:0,	Width:95, 	Align:"Center",  	ColMerge:1, 	 SaveName: prefix + "cust_ord_no", 	KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //cust order no
	        	      {Type:"Text",		Hidden:0,	Width:80, 	Align:"Center",  	ColMerge:1, 	 SaveName: prefix + "ctrt_no", 		KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //contract
	        	      {Type:"Text",		Hidden:0,	Width:110, 	Align:"Left",  		ColMerge:1, 	 SaveName: prefix + "ctrt_nm", 		KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //contract name
	        	      {Type:"Text",	Hidden:0,	Width:140, 	Align:"Left",  	ColMerge:1, 	 SaveName: prefix + "wh_pic_nm", 	KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //warehouse pic name 
	        	      {Type:"Text",	Hidden:0,	Width:140, 	Align:"Left",  	ColMerge:1, 	 SaveName: prefix + "owner_pic_nm", 	KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //owner pic name
	        	      {Type:"Text", 	Hidden:1,	Width:140, 	Align:"Center",  	ColMerge:1, 	 SaveName: prefix + "wh_cd", 		KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}, //w/h code
        	          {Type:"Text",		Hidden:1,	Width:70, 	Align:"Center",  	ColMerge:1, 	 SaveName: prefix + "wh_nm", 		KeyField:0, CalcLogic:"",	Format:"",				PointCount:0,				UpdateEdit:1,	InsertEdit:1}]; 
	        	   
	      InitColumns(cols);
	      SetSheetHeight(450);
		  //SetColProperty(prefix+"wh_combobox", {ComboText:"|"+WHNMLIST, ComboCode:"|"+WHCDLIST} );
		  SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	      SetEditable(1);
	      SetHeaderRowHeight(30);
	      SetAutoRowHeight(0);
	      resizeSheet();
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
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	var formObj=document.form;
	var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value;
	callBackFunc = "setCtrtNoInfo";
    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");

}
/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
    if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	 	return;
	}else{
		  var rtnValAry=aryPopupData.split("|");
		   formObj.ctrt_no.value=rtnValAry[0];
		   formObj.ctrt_nm.value=rtnValAry[1];
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
/*
 * 팝업 관련 로직 끝
 */
function btn_Search(){
	var formObj=document.form;
	if (validateForm(formObj, 'search')) {		
		formObj.f_cmd.value=SEARCH;
 		docObjects[0].DoSearch("./searchInvAdjustResultListGS.clt", FormQueryString(formObj, ""));
	}
}
/*
 * History
 */
function btn_History() {
	var sheetObj=docObjects[0];
	if (sheetObj.RowCount()<= 0) {
		ComShowCodeMessage("COM0228");
		return;
	}
	var currow=sheetObj.GetSelectRow();
	var sParam="wh_cd=" + sheetObj.GetCellValue(currow, fix_grid01+"wh_cd")
	+ "&wh_nm=" + sheetObj.GetCellValue(currow, fix_grid01+"wh_nm")
	+ "&ctrt_no=" + sheetObj.GetCellValue(currow, fix_grid01+"ctrt_no")
	+ "&ctrt_nm=" + sheetObj.GetCellValue(currow, fix_grid01+"ctrt_nm")
	+ "&trs_no=" + sheetObj.GetCellValue(currow, fix_grid01+"adjust_no")
			   + "&trs_type=ADJ"; // WTT (Adjustment)
//ComShowMessage(sParam);	
	
	var sUrlCall = "TrsHistoryList_" + sheetObj.GetCellValue(currow, fix_grid01+"wh_cd") + "_" + sheetObj.GetCellValue(currow, fix_grid01+"wh_nm") + "_" + sheetObj.GetCellValue(currow, fix_grid01+"ctrt_no");
	sUrlCall += "_" + sheetObj.GetCellValue(currow, fix_grid01+"ctrt_nm") + "_" + sheetObj.GetCellValue(currow, fix_grid01+"adjust_no") + "_ADJ";
	
	var sUrl="./TrsHistoryList.clt?" + sParam;
	parent.mkNewFrame("Transaction History Search", sUrl , sUrlCall);
}
/*
 * 엑셀다운로드
 */
function btn_Excel() {
	var prefix=fix_grid01;	
 	if(docObjects[0].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	docObjects[0].Down2Excel( {DownCols: '0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|31|32|33|34|35|36|37|38|',SheetDesign:1,Merge:1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
    }
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			// Warehouse 체크			
			if (ComIsEmpty(formObj.adjust_no) && ComIsEmpty(formObj.wh_cd)) {
				ComShowCodeMessage("COM0114", "Warehouse");
				$("#wh_cd").focus();				
				return false;
			}
			// Contract No 체크			
			if (ComIsEmpty(formObj.adjust_no) && ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0114", "Contract No");
				$("#ctrt_no").focus();				
				return false;
			}
	
			
			//bk_no 또는 contract no둘중하나는 필수로 입력되어야함.
			if (ComIsEmpty(formObj.adjust_no) && ComIsEmpty(formObj.wib_bk_no) && ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0114", "Contract No or In booking No");
				$("#ctrt_no").focus();
				return false;
			}
			//bk_no 가 없는경우 Adjustment Date는 필수 (MAX 93일까지)
			if(ComIsEmpty(formObj.adjust_no) && ComIsEmpty(formObj.wib_bk_no) && ComIsEmpty(formObj.adjust_date_fm))
			{
				ComShowCodeMessage("COM0114", "In booking No or Adjustment Date or Adjustment Key");
				formObj.wib_bk_no.focus();
				return false;
			}
			//Adjustment Date
			if (!ComIsEmpty(formObj.adjust_date_fm) && ComIsEmpty(formObj.adjust_date_to)) {
				formObj.adjust_date_to.value=ComGetNowInfo();
			}
			if (!ComIsEmpty(formObj.adjust_date_fm) && !isDate(formObj.adjust_date_fm)) {
				ComShowCodeMessage("COM0114", "Adjustment Date");
				formObj.adjust_date_fm.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.adjust_date_to) && !isDate(formObj.adjust_date_to)) {
				ComShowCodeMessage("COM0114", "Adjustment Date");
				formObj.adjust_date_to.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.adjust_date_fm)&&ComIsEmpty(formObj.adjust_date_to))||(ComIsEmpty(formObj.adjust_date_fm)&&!ComIsEmpty(formObj.adjust_date_to))) {
				ComShowCodeMessage("COM0122", "Adjustment Date");
				formObj.adjust_date_fm.focus();
				return false;
			}
			if (getDaysBetween(formObj.adjust_date_fm, formObj.adjust_date_to, 'MM-dd-yyyy')<0) {
				ComShowCodeMessage("COM0122", "Adjustment Date!");
				formObj.adjust_date_fm.focus();
				return false;
			}			
			//item_no가 입력된경우 
			if (!ComIsEmpty(formObj.item_cd) && ComIsEmpty(formObj.wh_cd) && ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0114", "Warehouse or Contract No");
				$("#Warehouse").focus();
				return false;
			}
			//lot_no 입력된 경우
			if (!ComIsEmpty(formObj.prop_no) && ComIsEmpty(formObj.wh_cd) && ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0114", "Warehouse or Contract No");
				$("#Warehouse").focus();
				return false;
			}
			break;
		}
	}
	return true;
}
/***
 * AJAX CODE SEARCH
 */
/*
* Contract search
* OnKeyDown 13 or onChange
*/
function getCtrtInfo(obj){
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
	  //ComShowMessage(getLabel('SEE_BMD_MSG43'));
	 }
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	var sheetObj=docObjects[0];
	sheetObj.SetImageList(1,"web/img/main/icon_text_off.gif");
	sheetObj.SetImageList(2,"web/img/main/icon_text_on.gif");
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
		// Item Code 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "adjust_no","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "lot_id","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
 		
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "adjust_no", 1);
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "lot_id", 1);
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wib_bk_no", 1);
 		
		//remark
 		var value=sheetObj.GetCellValue(i, fix_grid01 + "rmk");
		if (value.length > 0) {
 			sheetObj.SetCellImage(i, fix_grid01 + "rmk_img",1);
		} else {
 			sheetObj.SetCellImage(i, fix_grid01 + "rmk_img",2);
		}
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
        case fix_grid01 + "adjust_no": // Adjustment Key
    		//#3390-Check Authority WMS CODE
        	var wh_cd = sheetObj.GetCellValue(Row, fix_grid01+"wh_cd");
			ComChecWmsCd_Authority(wh_cd);
			if (isWmsAuthOk == false) { 
				//alert('Not authenticated.\r\nYou are not authorized to access Warehouse'); 
				ComShowCodeMessage("COM0785");
				return
			}  
        	invAdjustPopup(sheetObj,Row);
			break;			
    	case fix_grid01 + "lot_id":
    		var sParam="wh_cd=" + sheetObj.GetCellValue(Row, fix_grid01+"wh_cd")
    		+ "&wh_nm=" + sheetObj.GetCellValue(Row, fix_grid01+"wh_nm")
    		+ "&ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid01+"ctrt_no")
    		+ "&ctrt_nm=" + sheetObj.GetCellValue(Row, fix_grid01+"ctrt_nm")
    		+ "&lot_id=" + sheetObj.GetCellValue(Row, fix_grid01+"lot_id");
    		
    		var sUrlCall = "WHLotList_" + sheetObj.GetCellValue(Row, fix_grid01+"wh_cd") + "_" + sheetObj.GetCellValue(Row, fix_grid01+"wh_nm") + "_" + sheetObj.GetCellValue(Row, fix_grid01+"ctrt_no");
    		sUrlCall += "_" + sheetObj.GetCellValue(Row, fix_grid01+"ctrt_nm") + "_" + sheetObj.GetCellValue(Row, fix_grid01+"lot_id");
    		
    		var sUrl="./WHLotList.clt?" + sParam;
    			parent.mkNewFrame('Lot Search', sUrl, sUrlCall);
    		break;
        case fix_grid01 + "rmk_img": // remark
        	var value=sheetObj.GetCellValue(Row, fix_grid01 + "rmk");
			if (value.length > 0) {
				ComShowMemoPad2(sheetObj, Row, fix_grid01 + "rmk", true, 200, 200, Col, Col);
			}
			break;						
		case fix_grid01 + "wib_bk_no":
//			var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
//			parent.mkNewFrame('Inbound Booking Management', sUrl, "WHInbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
			
			var sUrl="./WHInMgmt.clt?req_wib_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")
			+ "&req_wh_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")  
			+ "&req_ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no") ;
			parent.mkNewFrame('Inbound Management', sUrl, "WHInMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
			
			break;			
		default:
			break;				
	}
}
function invAdjustPopup(sheetObj,Row) {
	var formObj=document.form;
	var sUrl="./InvAdjustPopup.clt?page_tp=LIST&adjust_no=" + sheetObj.GetCellValue(Row, (fix_grid01+"adjust_no"));
	//ComOpenPopup(sUrl, 1000, 390, "setInvAdjustPopup", "0,0", true);
	callBackFunc = "setInvAdjustPopup";
    modal_center_open(sUrl, callBackFunc, 1000, 365,"yes");
}
/*
 * Location search
 * onChange
 */
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
	
	var sXml = docObjects[0].GetSearchData("./searchWarehouseLocInfoForName.clt"+sParam);
	/*var sXml=docObjects[0].GetSearchData("searchWarehouseLocInfoForName.clt?"+sParam);
	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		ComShowMessage(getXmlDataNullToNullString(sXml,'exception_msg'));
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
function setInvAdjustPopup(aryPopupData){}
function getLocationInfo(div, f_div){
	var formObj=document.form;
	var sParam="f_loc_cd=" + formObj.wh_cd.value + "&f_wh_loc_nm=" + formObj.wh_loc_nm.value + "&f_putaway_flg=Y";
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
    			formObj.wh_loc_nm.value =rtnArr[1];
	    		formObj.wh_loc_nm_org.value =rtnArr[1];
	    		formObj.wh_loc_cd.value =rtnArr[0];
	    	}
	    	else{
	    		formObj.wh_loc_nm.value = "";
	    		formObj.wh_loc_nm_org.value = "";
	    		formObj.wh_loc_cd.value = "";
//	    		formObj.wh_loc_nm.focus();
	    	}
		}
		else{
		}
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
