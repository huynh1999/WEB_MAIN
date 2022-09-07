/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : DailyClosing.js
*@FileTitle  : Daily Closing
*@author     : Long.Le
*@version    : 1.0
*@since      : 2015/04/17
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var firCalFlag=false;
var rtnary=new Array(1);
var callBackFunc = "";
var fix_grid01="Grd01";
var loading_flag="N";
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
    for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }	
    doHideProcess(false);
    loading_flag="Y";
	initControl();
	var formObj=document.form;
	$("#bk_wh_cd").val($("#def_wh_cd").val());
	$("#ctrt_no").val($("#def_wh_ctrt_no").val());
	$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
	setCondEnable("ITEM");	// By Item
	setSelectSheet("ITEM");	// By Item
	setFieldValue(formObj.prop_date_fm, ComGetNowInfo());	
	setFieldValue(formObj.prop_date_to, ComGetNowInfo());	
	ComEnableObject(formObj.prop_date_to, false);
	ComBtnDisable("btn_to_bk_date");
	resizeSheet();
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
function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate", document.form);
//    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
//	axon_event.addListenerForm("change", "form_onChange", formObject);    
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
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
		case "btn_fm_bk_date":
			if (document.getElementById('btn_fm_bk_date').disabled) {
				return;
			}
			var cal=new ComCalendar();
			//scal.displayType="date";
        	cal.select(formObj.prop_date_fm, 'MM-dd-yyyy');
			break;
		case "btn_to_bk_date":
			if (document.getElementById('btn_to_bk_date').disabled) {
				return;
			}
			var cal=new ComCalendar();
			//cal.displayType="date";
			cal.select(formObj.prop_date_to, 'MM-dd-yyyy');
			break;
		case "btn_rebuild_dt":
			if (document.getElementById('btn_rebuild_dt').disabled) {
			    return;
			}   
			var cal=new ComCalendar();
	            cal.select(formObj.rebuild_dt, 'MM-dd-yyyy');
		    break;
		case "btn_ctrt_no":	
				callBackFunc = "setCtrtNoInfo";
			    modal_center_open('./ContractRoutePopup.clt?ctrt_nm='+formObj.ctrt_nm.value + "&ctrt_no="+formObj.ctrt_no.value, callBackFunc, 900, 580,"yes");
			break;
		case "btn_wh_loc_cd":
			if (document.getElementById('btn_wh_loc_cd').disabled) {
				return;
			}
			if (ComIsEmpty(formObj.wh_cd)) {
				ComShowCodeMessage("COM0114", "Warehouse");
				return;
			}
			callBackFunc = "setPutawayLocInfo";
		    modal_center_open('./WarehouseLocPopup.clt?f_loc_cd='+formObj.wh_cd.value+"&wh_loc_nm=" + formObj.wh_loc_nm.value, rtnary, 700, 500,"yes");
			break;
		case "SEARCHLIST":
			document.form.f_CurPage.value=1;
			btn_Search();
			break;
		case "EXCEL":
			btn_Excel();
			break;
		case "btn_Rebuild":
			return;
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
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init (By Item)
		    with(sheetObj){
	        
			      var prefix=fix_grid01;
		
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('DailyClosing_SHEET1_HDR1'), Align:"Center"},
			                      { Text:getLabel('DailyClosing_SHEET1_HDR2'), Align:"Center"} ];
			      InitHeaders(headers, info);
		
			      var cols = [ {Type:"Seq",     Hidden:0,	Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",        KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			             {Type:"Date",      	Hidden:0,  	Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cls_loc_dt", KeyField:0,   CalcLogic:"",   Format:"Ymd",     		PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			             {Type:"Text",      	Hidden:0,  	Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",    KeyField:0,   CalcLogic:"",   Format:"",           	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			             {Type:"Text",      	Hidden:0,  	Width:140,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",    KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			             {Type:"Float",   		Hidden:0,  	Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"stc_qty",    KeyField:0,   CalcLogic:"",   Format:"",     			PointCount:3,	UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			             {Type:"Float",   		Hidden:0,  	Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"allc_qty",   KeyField:0,   CalcLogic:"",   Format:"",     			PointCount:3,	UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			             {Type:"Float",   		Hidden:0,  	Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"hold_qty",   KeyField:0,   CalcLogic:"",   Format:"",     			PointCount:3,	UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			             {Type:"Float",   		Hidden:0,  	Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"dmg_qty",    KeyField:0,   CalcLogic:"",   Format:"",     			PointCount:3,	UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			             {Type:"Float",   		Hidden:0,  	Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"tot_qty",    KeyField:0,   CalcLogic:"",   Format:"",     			PointCount:3,	UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			             {Type:"Text",      	Hidden:0,  	Width:100,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no",    KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			             {Type:"Text",      	Hidden:0,  	Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			             {Type:"Combo",     	 	Hidden:0,  	Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_cd",      KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
			       
			      InitColumns(cols);
			      SetSheetHeight(450);
			      SetEditable(1);
			      SetAutoRowHeight(0);
			      SetColProperty('wh_cd', {ComboCode:WHCDLIST1, ComboText:WHCDLIST2} );
			      resizeSheet();
			      SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	          }
	      break;

		case "sheet2":      //IBSheet2 init (By Lot)
		    with(sheetObj){
	        
//	      var hdr1="Seq|Build Date|Item|Item Name|Inbound Date|Item Lot No|Lot ID|Inventory|Inventory|Inventory|Inventory|Inventory|Additional Lot Information|Additional Lot Information|Additional Lot Information|Contract|Contract|W/H Code";
//		  var hdr1 = [ { Text:getLabel('DailyClosing_SHEET2_HDR1'), Align:"Center"} ];
//		  var hdr2="Seq|Build Date|Item|Item Name|Inbound Date|Item Lot No|Lot ID|Available|Hold|Damage|Allocated|Current|Expiration Date|Lot 04|Lot 05|No|Name|W/H Code";
//		  var hdr2 = [ { Text:getLabel('DailyClosing_SHEET2_HDR2'), Align:"Center"} ];
		  var prefix=fix_grid01;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [  { Text:getLabel('DailyClosing_SHEET2_HDR1'), Align:"Center"},
	                       { Text:getLabel('DailyClosing_SHEET2_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",       Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",        KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cls_loc_dt", KeyField:0,   CalcLogic:"",   Format:"Ymd",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inbound_dt", KeyField:0,   CalcLogic:"",   Format:"Ymd",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_id",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",   	Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"stc_qty",    KeyField:0,   CalcLogic:"",   Format:"",     		PointCount:0,	UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",   	Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"hold_qty",   KeyField:0,   CalcLogic:"",   Format:"",     		PointCount:0,	UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",   	Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"dmg_qty",    KeyField:0,   CalcLogic:"",   Format:"",     		PointCount:0,	UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",   	Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"allc_qty",   KeyField:0,   CalcLogic:"",   Format:"",     		PointCount:0,	UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"tot_qty",    KeyField:0,   CalcLogic:"",   Format:"",     		PointCount:0,	UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:prefix+"exp_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_04",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_05",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Combo",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	      
	      InitColumns(cols);
	      SetSheetHeight(400);
	      SetEditable(0);
	      SetAutoRowHeight(0);
	      SetColProperty('wh_cd', {ComboCode:WHCDLIST1, ComboText:WHCDLIST2} );
	      resizeSheet();
	      SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	            }
	      break;

	
		case "sheet3":      //IBSheet3 init (By Location)
		    with(sheetObj){
	        
	      var prefix=fix_grid01;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('DailyClosing_SHEET3_HDR1'), Align:"Center"},
	                      { Text:getLabel('DailyClosing_SHEET3_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",       Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cls_loc_dt",  KeyField:0,   CalcLogic:"",   Format:"Ymd",  		 PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inbound_dt",  KeyField:0,   CalcLogic:"",   Format:"Ymd",  		 PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_id",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"wh_loc_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",   	Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"stc_qty",     KeyField:0,   CalcLogic:"",   Format:"",     		 PointCount:0,	 UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",   	Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"hold_qty",    KeyField:0,   CalcLogic:"",   Format:"",     		 PointCount:0, 	 UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",   	Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"dmg_qty",     KeyField:0,   CalcLogic:"",   Format:"",     		 PointCount:0,	 UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",   	Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"allc_qty",    KeyField:0,   CalcLogic:"",   Format:"",     		 PointCount:0,	 UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",   	Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"tot_qty",     KeyField:0,   CalcLogic:"",   Format:"",     		 PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:prefix+"exp_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",  		 PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_04",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_05",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:95,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wib_bk_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cust_ord_no", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Combo",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(400);
	      SetEditable(0);
	      SetAutoRowHeight(0);
	      SetColProperty('wh_cd', {ComboCode:WHCDLIST1, ComboText:WHCDLIST2} );
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
/**
 * Sheet2 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet2_OnSelectMenu(sheetObj, MenuString){
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
/**
 * Sheet3 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet3_OnSelectMenu(sheetObj, MenuString){
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
	ComResizeSheet(docObjects[1]);
	ComResizeSheet(docObjects[2]);
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

function setPutawayLocInfo(aryPopupData) {
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		   return;
		  }else{
			  var rtnValAry=aryPopupData.split("|");
			   formObj.wh_loc_cd.value=rtnValAry[0];
			   formObj.wh_loc_nm.value=rtnValAry[1];
		  }
}
/**
 * 마우스 아웃일때 
 */
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if (srcName == "wh_loc_nm") {
		if (srcValue != "") {
			var sParam="f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_wh_loc_nm=" + srcValue;
			var sXml=docObjects[0].GetSearchData("searchWarehouseLocInfoForName.clt?"+sParam);
			setFieldValue(formObj.wh_loc_cd,     getXmlDataNullToNullString(sXml,'wh_loc_cd')); // wh_loc_cd
			setFieldValue(formObj.wh_loc_nm,     getXmlDataNullToNullString(sXml,'wh_loc_nm')); // wh_loc_nm
			if (getXmlDataNullToNullString(sXml,'exception_msg') != "") {
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
				ComSetFocus(formObj.wh_loc_nm);
			}
		} else {
			setFieldValue(formObj.wh_loc_cd,     ""); // wh_loc_cd
			setFieldValue(formObj.wh_loc_nm,     ""); // wh_loc_nm
		}				
	}
}
/*
 * 팝업 관련 로직 끝
 */
function btn_Search(){
	var formObj=document.form;
	//doShowProcess(true);
	var sheetObj="";
	if (validateForm(formObj, 'search')) {
		var inv_by_tp = formObj.inv_by_tp.value;
		if (inv_by_tp == "ITEM") {
			formObj.f_cmd.value = SEARCH;
			docObjects[0].DoSearch("./searchDailyClosingByItemListGS.clt", FormQueryString(formObj));	
		} else if (inv_by_tp == "LOT") {
			formObj.f_cmd.value = SEARCH01;
			docObjects[1].DoSearch("./searchDailyClosingByLotListGS.clt", FormQueryString(formObj));		
		} else if (inv_by_tp == "LOC") {
			formObj.f_cmd.value = SEARCH02;
			docObjects[2].DoSearch("./searchDailyClosingByLocListGS.clt", FormQueryString(formObj));		
		}
	}
	doHideProcess(false);
}

function goToPage(callPage){
	 document.form.f_CurPage.value=callPage; 
	 btn_Search();
	} 

function searchList(){
	document.form.f_CurPage.value=1;
	btn_Search();
}
/*
 * 엑셀다운로드
 */
function btn_Excel() {
	if(docObjects[0].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	var formObj=document.form;
//    	var vInvByTp=formObj.term.value; // Inventory by
    	if (formObj.inv_by_tp.value == "ITEM") {
     		docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(		docObjects[0]), SheetDesign:1,Merge:1 });
    	} else if (formObj.inv_by_tp.value == "LOT") {
     		docObjects[1].Down2Excel( {DownCols: makeHiddenSkipCol(		docObjects[1]), SheetDesign:1,Merge:1 });
    	} else if (formObj.inv_by_tp.value == "LOC") {
     		docObjects[2].Down2Excel( {DownCols: makeHiddenSkipCol(		docObjects[2]), SheetDesign:1,Merge:1 });
    	}
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
			// Contract No 체크			
			if (ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0114", "Contract No");
				ComSetFocus(formObj.ctrt_no);
				return false;
			}
			//Closing Date 체크
			
			if(formObj.prop_date_fm.value.trim() == ""){
				ComShowCodeMessage('COM0114','Closing Date');
				
				formObj.prop_date_fm.focus();
				return false;
			}
			
			if (!ComIsEmpty(formObj.prop_date_fm) && ComIsEmpty(formObj.prop_date_to)) {
				formObj.prop_date_to.value=ComGetNowInfo();
			}
			if (!ComIsEmpty(formObj.prop_date_fm) && !isDate(formObj.prop_date_fm)) {
				ComShowCodeMessage("COM0114", "Closing Date");
				formObj.prop_date_fm.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.prop_date_to) && !isDate(formObj.prop_date_to)) {
				ComShowCodeMessage("COM0114", "Closing Date");
				formObj.prop_date_to.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.prop_date_fm)&&ComIsEmpty(formObj.prop_date_to))||(ComIsEmpty(formObj.prop_date_fm)&&!ComIsEmpty(formObj.prop_date_to))) {
				ComShowCodeMessage("COM0122", "Closing Date");
				formObj.prop_date_fm.focus();
				return false;
			}
			if (getDaysBetween(formObj.prop_date_fm, formObj.prop_date_to, 'MM-dd-yyyy')<0) {
				ComShowCodeMessage("COM0122", "Closing Date!");
				formObj.prop_date_fm.focus();
				return false;
			}			
			//var vInvByTp=comboObjects[0].GetSelectCode(); // Inventory by
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

function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	doDispPaging(sheetObj.GetCellValue(sheetObj.HeaderRows(), "Indexing"), getObj('pagingTb'));
}

function sheet2_OnSearchEnd(sheetObj, ErrMsg) {	
	doDispPaging(sheetObj.GetCellValue(sheetObj.HeaderRows(), "Indexing"), getObj('pagingTb'));
}


function sheet3_OnSearchEnd(sheetObj, ErrMsg) {	
	var seq=0;
	var seqBkNo="";
	
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wib_bk_no", 1);
	}
	
	doDispPaging(sheetObj.GetCellValue(sheetObj.HeaderRows(), "Indexing"), getObj('pagingTb'));
}
function sheet3_OnDblClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid01 + "wib_bk_no":
			var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
			parent.mkNewFrame('Inbound Booking Management', sUrl, "WHInbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
			break;
	}
}
/** 
 * Inventory by 선택시
 */
function inv_by_tp_OnChange(comboObj, oldIndex, oldText, oldCode, newIndex, newText, newCode) {
	setSelectSheet(newCode);	
	setCondEnable(newCode);	
	resizeSheet();
}
/**
 * 조회조건 활성화/비활성화
 * @param code
 */
function setCondEnable(code) {
	var formObj=document.form;
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
//	ComEnableObject(formObj.prop_no_tp, true);
	formObj.prop_no_tp.disabled = false;
	ComEnableObject(formObj.prop_no, true);	
	ComEnableObject(formObj.wh_loc_nm, true);
	ComEnableObject(formObj.wib_bk_no, true);
	ComEnableObject(formObj.cust_ord_no, true);	
	formObj.prop_no.value="";
	formObj.wh_loc_cd.value="";
	formObj.wh_loc_nm.value="";
	formObj.wib_bk_no.value="";
	formObj.cust_ord_no.value="";	
	if (code == "ITEM") {
//		ComEnableObject(formObj.prop_no_tp, false);
		formObj.prop_no_tp.disabled = true;
		ComEnableObject(formObj.prop_no, false);
		ComEnableObject(formObj.wh_loc_nm, false);
		ComEnableObject(formObj.wib_bk_no, false);
		ComEnableObject(formObj.cust_ord_no, false);
		formObj.prop_no_tp.options[formObj.prop_no_tp.selectedIndex].value = "LOT_NO";
//		comboObjects[1].SetSelectIndex(0);
//		comboObjects[1].SetEnable(0);
		ComBtnDisable("btn_wh_loc_cd");
	} else if (code == "LOT") {
		ComEnableObject(formObj.wh_loc_nm, false);
		ComEnableObject(formObj.wib_bk_no, false);
		ComEnableObject(formObj.cust_ord_no, false);
		formObj.prop_no_tp.options[formObj.prop_no_tp.selectedIndex].value = "LOT_NO";
//		ComEnableObject(formObj.prop_no_tp, true);
		formObj.prop_no_tp.disabled = false;
//		comboObjects[1].SetSelectIndex(0);
//		comboObjects[1].SetEnable(1);
		ComBtnDisable("btn_wh_loc_cd");
	} else if (code == "LOC") {
		formObj.prop_no_tp.options[formObj.prop_no_tp.selectedIndex].value = "LOT_NO";
//		ComEnableObject(formObj.prop_no_tp, true);
		formObj.prop_no_tp.disabled = false;
//		comboObjects[1].SetSelectIndex(0);
//		comboObjects[1].SetEnable(1);
		ComBtnEnable("btn_wh_loc_cd");
	}
}
/**
 * Sheet 선택
 * @param code
 */
function setSelectSheet(code) {	
	var formObj=document.form;	
	// dual monitor 사용시 Inventory by 콤보 focus out을 방지하기 하기 위한 코드 (화면 전환시 sheet가 보이지 않음)
	formObj.inv_by_tp.focus();
	
	doDispPaging("", getObj('pagingTb'));
	
    if (code == "ITEM") {
		document.all.div_sheet_item.style.display="block";
		document.all.div_sheet_lot.style.display="none";
		document.all.div_sheet_loc.style.display="none";    	
    } else if(code == "LOT") {
		document.all.div_sheet_item.style.display="none";
		document.all.div_sheet_lot.style.display="block";
		document.all.div_sheet_loc.style.display="none";    	    	
    } else if(code == "LOC") {
		document.all.div_sheet_item.style.display="none";
		document.all.div_sheet_lot.style.display="none";
		document.all.div_sheet_loc.style.display="block";    	    	
    }  
    resizeSheet();
}
function setClosingDate(){
	var formObj=document.form;	
	if(formObj.item_cd.value == ""){
		ComEnableObject(formObj.prop_date_to, false);
		ComBtnDisable("btn_prop_date_to");
		setFieldValue(formObj.prop_date_to, formObj.prop_date_fm.value);
	}else{
		ComEnableObject(formObj.prop_date_to, true);
		ComBtnEnable("btn_prop_date_to");
	}
}
function setClosingToDate(){
	var formObj=document.form;
	if(formObj.item_cd.value == ""){
		setFieldValue(formObj.prop_date_to, formObj.prop_date_fm.value);	
	}
}
