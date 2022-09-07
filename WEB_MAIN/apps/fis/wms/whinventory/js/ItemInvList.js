//<%--=========================================================
//*Copyright(c) 2014 CyberLogitec. All Rights Reserved.

//*@FileName   : ItemInvList.js
//*@FileTitle  : Item Inventory
//*@author     : Bao.Huynh - DOU Network
//*@version    : 1.0
//*@since      : 2015/04/16
//=========================================================--%>
var firCalFlag=false;
var rtnary=new Array(1);
var callBackFunc = "";
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var loading_flag="N";
var popupCtr = "";
function loadPage() {
	var formObj=document.form;	
	//OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS
	var opt_key = "CTRT_ITEM_BARCODE_FLG";
	ajaxSendPost(setItemBarcode, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	doShowProcess(true); //ComOpenWait(true);
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
		
	}
	//IBMultiCombo초기화
   /* for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }	*/
    doHideProcess(false); //ComOpenWait(false);
    loading_flag="Y";
    //loadComboWarehouse();
	initControl();
	// Warehouse&Contract 세션 정보 Default 세팅
	setFieldValue(formObj.wh_cd, ComGetObjValue(formObj.def_wh_cd));
	setFieldValue(formObj.wh_nm, ComGetObjValue(formObj.def_wh_nm));
	setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no));	
	setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));	
	setCondEnable("ITEM");	// By Item
	setSelectSheet("ITEM");	// By Item
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
	
    //OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS
    if(isHiddenBarcode == false){
    	document.getElementById("barcode_label").style.display="inline";
    	document.getElementById("barcode_no").style.display="inline";
    }else{
    	document.getElementById("barcode_label").style.display="none";
    	document.getElementById("barcode_no").style.display="none";
    }
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
	var srcValue=event.srcElement.getAttribute("value");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "prop_bk_no":	
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
		case "btn_prop_date_to":
			if (document.getElementById('btn_prop_date_to').disabled) {
				return;
			}
			var cal=new ComCalendarFromTo();
			cal.displayType="date";
            cal.select(formObj.prop_date_fm, formObj.prop_date_to, 'MM-dd-yyyy');
			break;
		case "btn_ctrt_no":
			get_ctrt_no(popupCtr);
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
		    modal_center_open('./WarehouseLocPopup.clt?f_loc_cd=' + formObj.wh_cd.value + "&f_wh_loc_nm="+formObj.wh_loc_nm.value, callBackFunc, 700, 500,"yes");
			break;
		case "SEARCHLIST":
			sheet1.RemoveAll();
			sheet2.RemoveAll();
			sheet3.RemoveAll();
			btn_Search();
			break;
		case "EXCEL":
			btn_Excel_Dl();
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
function initSheet(sheetObj, sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      // IBSheet1 init (By Item)
            with(sheetObj){
		    var prefix=fix_grid01;
		
		    SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		
		    var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		    var headers = [ { Text:getLabel('ItemInvList_SHEET1_HDR1'), Align:"Center"},
		                      { Text:getLabel('ItemInvList_SHEET1_HDR2'), Align:"Center"} ];
		    InitHeaders(headers, info);

		    var cols = [ {Type:"Seq",       Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   				UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",    ColMerge:1,   SaveName:prefix+"item_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   				UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   				UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Int",   	Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:prefix+"stc_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",     		  PointCount:0,					UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Int",   	Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:prefix+"allc_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     		  PointCount:0,					UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"hold_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     		  PointCount:0,					UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"dmg_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",     		  PointCount:0,					UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"tot_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",     		  PointCount:0,					UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Float",     Hidden:0,  Width:85,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,					UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Float",     Hidden:0,  Width:85,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbf",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,					UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Float",     Hidden:0,  Width:85,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,					UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Float",     Hidden:0,  Width:85,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,					UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Float",     Hidden:0,  Width:85,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,					UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Float",     Hidden:0,  Width:85,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,					UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,  				UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,  				UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Combo",      Hidden:0,  Width:150,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,  				UpdateEdit:0,   InsertEdit:0 },
//						 {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,  				UpdateEdit:0,   InsertEdit:0 }
						//OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS
						 {Type:"Text",      Hidden:isHiddenBarcode?1:0,  Width:80,  Align:"Center",    ColMerge:1,   SaveName:prefix+"barcode_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   				UpdateEdit:0,   InsertEdit:0 },
						 {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
						 ];
						   
		  InitColumns(cols);
		  SetSheetHeight(450);
		  SetHeaderRowHeight(30);
		  SetColProperty(prefix+"wh_cd", {ComboText:"|"+WHNMLIST, ComboCode:"|"+WHCDLIST} );
		  SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	      SetAutoRowHeight(0);
	     // resizeSheet();
		  SetEditable(1);
		}
            break;
		case "sheet2":      //IBSheet2 init (By Lot)
		    with(sheetObj){
	        
	      var prefix=fix_grid01;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('ItemInvList_SHEET2_HDR1'), Align:"Center"},
	                      { Text:getLabel('ItemInvList_SHEET2_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",       Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",    ColMerge:1,   SaveName:prefix+"item_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             //OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS
	             {Type:"Text",      Hidden:isHiddenBarcode ? 1:0,  Width:80,  Align:"Center",    ColMerge:1,   SaveName:prefix+"barcode_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inbound_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",    ColMerge:1,   SaveName:prefix+"lot_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",    ColMerge:1,   SaveName:prefix+"lot_id",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             
	             {Type:"Text",      Hidden:0,  Width:110,   Align:"Left",    ColMerge:1,   SaveName:prefix+"po_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",    ColMerge:1,   SaveName:prefix+"item_ser_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",    ColMerge:1,   SaveName:prefix+"lic_plat_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            
	             {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"stc_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,		UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"hold_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,		UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"dmg_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,		UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"allc_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,		UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"tot_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,		UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,		UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbf",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,		UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,		UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,		UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,		UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,		UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"exp_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_04",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_05",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
	       
	      InitColumns(cols);
	      SetSheetHeight(400);
	      SetEditable(0);
	            }
	      break;


	
		case "sheet3":      //IBSheet3 init (By Location)
		    with(sheetObj){
	        
	      var prefix=fix_grid01;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('ItemInvList_SHEET3_HDR1'), Align:"Center"},
	                      { Text:getLabel('ItemInvList_SHEET3_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",       Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",    ColMerge:1,   SaveName:prefix+"item_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             //OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS
	             {Type:"Text",      Hidden:isHiddenBarcode ? 1:0,  Width:80,  Align:"Center",    ColMerge:1,   SaveName:prefix+"barcode_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inbound_dt",   KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",    ColMerge:1,   SaveName:prefix+"lot_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",    ColMerge:1,   SaveName:prefix+"lot_id",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"wh_loc_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:110,   Align:"Left",    ColMerge:1,   SaveName:prefix+"po_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",    ColMerge:1,   SaveName:prefix+"item_ser_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",    ColMerge:1,   SaveName:prefix+"lic_plat_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             
	             {Type:"Text",      Hidden:0,  Width:160,   Align:"Left",    ColMerge:1,   SaveName:prefix+"pkg_lv1_unit_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             
	             {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"stc_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,		UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"hold_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,			UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"dmg_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,			UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"allc_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,			UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",   	Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"tot_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,			UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,			UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbf",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,			UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,			UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,			UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,			UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,			UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"exp_dt",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_04",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_05",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:95,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wib_bk_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cust_ord_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
	       
	      InitColumns(cols);
	      SetSheetHeight(400);
	      SetEditable(0);
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

function sheet1_OnSearchEnd(sheetObj, errMsg) {
	doDispPaging(docObjects[0].GetCellValue(2, "Indexing"), getObj('pagingTb'));
}

function sheet2_OnSearchEnd(sheetObj, errMsg) {
	doDispPaging(docObjects[1].GetCellValue(2, "Indexing"), getObj('pagingTb'));
}

function resizeSheet(){
	ComResizeSheet(sheet1);
	ComResizeSheet(sheet2);
	ComResizeSheet(sheet3);
}
/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.ctrt_no.value=rtnValAry[0];//full_nm
		   formObj.ctrt_nm.value=rtnValAry[1];//full_nm
	   } 
}
function setPutawayLocInfo(rtnVal) {
	 var formObj=document.form;
	  if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
	  }else{
		  var rtnValAry=rtnVal.split("|");
		   formObj.wh_loc_cd.value=rtnValAry[0];//full_nm
		   formObj.wh_loc_nm.value=rtnValAry[1];//full_nm
	  }
	
//	var formObj=document.form;
//	ComSetObjValue(formObj.wh_loc_cd,     aryPopupData[0][1]);// wh_loc_cd
//	ComSetObjValue(formObj.wh_loc_nm,     aryPopupData[0][2]);// wh_loc_nm
}
/**
 * 마우스 아웃일때 
 */
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=window.event.srcElement.getAttribute("value");
	if (srcName == "wh_loc_nm") {
		if (srcValue != "") {
			var sParam="f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_wh_loc_nm=" + srcValue;
			$.ajax({
				url : "./searchWarehouseLocInfoForName.clt?"+sParam,
				success : function(result) {
					ComSetObjValue(formObj.wh_loc_cd,     getXmlDataNullToNullString(result.xml,'wh_loc_cd')); // wh_loc_cd
					ComSetObjValue(formObj.wh_loc_nm,     getXmlDataNullToNullString(result.xml,'wh_loc_nm')); // wh_loc_nm
					if (getXmlDataNullToNullString(result.xml,'exception_msg') != "") {
						alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
						formObj.wh_loc_nm.focus();
					}
				}
			});
		} else {
			ComSetObjValue(formObj.wh_loc_cd,     ""); // wh_loc_cd
			ComSetObjValue(formObj.wh_loc_nm,     ""); // wh_loc_nm
		}				
	}
}
/*
 * Location search onChange
 */
function getLocationInfo(div) {
	if ($("#wh_loc_nm").val() == "") {
		$("#wh_loc_cd").val("");
		$("#wh_loc_nm_org").val("");
		if (div == "e") {
			btn_Search();
		}
		return;
	}
	var formObj = document.form;
	if (ComIsEmpty(formObj.wh_cd.value)) {
		ComShowCodeMessage("COM0114", "Warehouse");
		$("#wh_loc_nm").val("");
		formObj.wh_cd.focus();
		return;
	}
	var sParam = "f_loc_cd=" + formObj.wh_cd.value + "&f_wh_loc_nm="
			+ $("#wh_loc_nm").val() + "&f_move_flg=Y";
	
	//ajaxSendPost(resultLocationInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName?'+sParam, './GateServlet.gsl');
	  ajaxSendPost(resultLocationInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
}

function resultLocationInfo(reqVal, div) {
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
	    		if(div == "e")
	    		{
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
function btn_Search(){
	var formObj=document.form;
	if(formObj.wh_cd.value == ""){
		   ComShowCodeMessage("COM12233");
		   return;
	}
	var sheetObj="";
	if (validateForm(formObj,'search')) {
		var inv_by_tp = formObj.inv_by_tp.value;
		if (inv_by_tp == "ITEM") { // Item Inventory By Item Search
			formObj.f_cmd.value = SEARCH;
			sheet1.DoSearch("./searchWHItemInvByItemListGS.clt", FormQueryString(formObj));
		} else if (inv_by_tp == "LOT") { // Item Inventory By Lot Search
			formObj.f_cmd.value = SEARCH01;
			sheet2.DoSearch("./searchWHItemInvByLotListGS.clt", FormQueryString(formObj));
		} else if (inv_by_tp == "LOC") { // Item Inventory By Location Search
			formObj.f_cmd.value = SEARCH02;
			sheet3.DoSearch("./searchWHItemInvByLocListGS.clt", FormQueryString(formObj));
		}
	}
}
/*
 * 엑셀다운로드
 */
function btn_Excel_Dl() {
	var formObj=document.form; 
	var vInvByTp=formObj.inv_by_tp.value; // Inventory by
	if (vInvByTp == "ITEM") {
		if(docObjects[0].RowCount() < 1){//no data
	     	ComShowCodeMessage("COM132501");
	    }else{
	    	docObjects[0].Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
	    }
	} else if (vInvByTp == "LOT") {
		if(docObjects[1].RowCount() < 1){//no data
	     	ComShowCodeMessage("COM132501");
	    }else{
	    	docObjects[1].Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
	    }
	} else if (vInvByTp == "LOC") {
		if(docObjects[2].RowCount() < 1){//no data
	     	ComShowCodeMessage("COM132501");
	    }else{
	    	docObjects[2].Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
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
			if (ComIsEmpty(formObj.wh_cd)) {
				ComShowCodeMessage("COM0114", "Warehouse");
				formObj.wh_cd.focus();
				return false;
			}
			var vInvByTp=formObj.inv_by_tp.value; // Inventory by
			if (vInvByTp == "ITEM") {
			} else if (vInvByTp == "LOT") {
				/*
				//Item이 없는경우 Inbound(Expiration) Date는 필수
				if (ComIsEmpty(formObj.item_cd) && ComIsEmpty(formObj.prop_date_fm) && ComIsEmpty(formObj.prop_date_to)) {
					ComShowCodeMessage("COM0114", "Inbound(Expiration) Date");
					ComSetFocus(formObj.prop_date_fm);
					return false;
				}
				//Item 이 없는경우 Inbound(Expiration) Date는 필수 (MAX 93일까지)
				if (ComIsEmpty(formObj.item_cd)) {
					if (ComIsEmpty(formObj.prop_date_fm)) {
						ComShowCodeMessage("COM0114", "Item or Inbound(Expiration) Date");
						formObj.prop_date_fm.focus();
						return false;
					} else {
						if (getDaysBetween2(formObj.prop_date_fm.value, formObj.prop_date_to.value) > 92) {
							ComShowCodeMessage("COM0141", "3", "(Inbound(Expiration) Date)");
							formObj.prop_date_fm.focus();
							return false;
						}
					}
				}
				*/
				if (!ComIsEmpty(formObj.prop_date_fm) && ComIsEmpty(formObj.prop_date_to)) {
					formObj.prop_date_to.value=ComGetNowInfo();
				}
				if (!ComIsEmpty(formObj.prop_date_fm) && !isDate(formObj.prop_date_fm)) {
					ComShowCodeMessage("COM0114", "Inbound(Expiration) Date");
					formObj.prop_date_fm.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.prop_date_to) && !isDate(formObj.prop_date_to)) {
					ComShowCodeMessage("COM0114", "Inbound(Expiration) Date");
					formObj.prop_date_to.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.prop_date_fm)&&ComIsEmpty(formObj.prop_date_to))||(ComIsEmpty(formObj.prop_date_fm)&&!ComIsEmpty(formObj.prop_date_to))) {
					ComShowCodeMessage("COM0122", "Inbound(Expiration) Date");
					formObj.prop_date_fm.focus();
					return false;
				}
				if (getDaysBetween(formObj.prop_date_fm, formObj.prop_date_to,'MM-dd-yyyy')<0) {
					ComShowCodeMessage("COM0122", "Inbound(Expiration) Date!");
					formObj.prop_date_fm.focus();
					return false;
				}				
			} else if (vInvByTp == "LOC") {		
				/*
				//Item이 없는경우 Inbound(Expiration) Date는 필수
				if (ComIsEmpty(formObj.item_cd) && ComIsEmpty(formObj.prop_date_fm) && ComIsEmpty(formObj.prop_date_to)) {
					ComShowCodeMessage("COM0114", "Inbound(Expiration) Date");
					ComSetFocus(formObj.prop_date_fm);
					return false;
				}
				//Item 이 없는경우 Inbound(Expiration) Date는 필수 (MAX 93일까지)
				if (ComIsEmpty(formObj.item_cd)) {
					if (ComIsEmpty(formObj.prop_date_fm)) {
						ComShowCodeMessage("COM0114", "Item or Inbound(Expiration) Date");
						formObj.prop_date_fm.focus();
						return false;
					} else {
						if (getDaysBetween2(formObj.prop_date_fm.value, formObj.prop_date_to.value) > 92) {
							ComShowCodeMessage("COM0141", "3", "(Inbound(Expiration) Date)");
							formObj.prop_date_fm.focus();
							return false;
						}
					}
				}
				*/
				if (!ComIsEmpty(formObj.prop_date_fm) && ComIsEmpty(formObj.prop_date_to)) {
					formObj.prop_date_to.value=ComGetNowInfo();
				}
				if (!ComIsEmpty(formObj.prop_date_fm) && !isDate(formObj.prop_date_fm)) {
					ComShowCodeMessage("COM0114", "Inbound(Expiration) Date");
					formObj.prop_date_fm.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.prop_date_to) && !isDate(formObj.prop_date_to)) {
					ComShowCodeMessage("COM0114", "Inbound(Expiration) Date");
					formObj.prop_date_to.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.prop_date_fm)&&ComIsEmpty(formObj.prop_date_to))||(ComIsEmpty(formObj.prop_date_fm)&&!ComIsEmpty(formObj.prop_date_to))) {
					ComShowCodeMessage("COM0122", "Inbound(Expiration) Date");
					formObj.prop_date_fm.focus();
					return false;
				}
				if (getDaysBetween(formObj.prop_date_fm, formObj.prop_date_to,'MM-dd-yyyy')<0) {
					ComShowCodeMessage("COM0122", "Inbound(Expiration) Date!");
					formObj.prop_date_fm.focus();
					return false;
				}
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
 * Warehouse search
 * OnKeyDown 13 or onChange
 */
function searchLocInfo(obj){
	ajaxSendPost(setLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
}
function setLocInfo(reqVal){
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

function searchTlCtrtInfo(){
	var formObj=document.form;
	ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.ctrt_no.value, './GateServlet.gsl');
}
function setTlCtrtInfo(reqVal){
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
function sheet3_OnSearchEnd(sheetObj, ErrMsg) {	
	var sheetObj=$("#sheet3")[0];//docObjects[0];
	var seq=0;
	var seqBkNo="";
	doDispPaging(docObjects[2].GetCellValue(2, "Indexing"), getObj('pagingTb'));
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wib_bk_no", 1);
	}
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
}
/**
 * 조회조건 활성화/비활성화
 * @param code
 */
function setCondEnable(code) {
	var formObj=document.form;
	formObj.f_CurPage.value="";
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	ComEnableObject(formObj.prop_no_tp, true);
	ComEnableObject(formObj.prop_no, true);
	ComEnableObject(formObj.prop_date_tp, true);
	ComEnableObject(formObj.prop_date_fm, true);
	ComEnableObject(formObj.prop_date_to, true);		
	ComEnableObject(formObj.wh_loc_nm, true);
	ComEnableObject(formObj.prop_bk_tp, true);
    ComEnableObject(formObj.prop_bk_no, true);
    ComEnableObject(formObj.ref_no, true);
    ComEnableObject(formObj.lic_plat_no, true);
	//ComEnableObject(formObj.wib_bk_no, true);
	//ComEnableObject(formObj.cust_ord_no, true);
	//formObj.wh_cd.value = "";
	//formObj.wh_nm.value = "";
	//formObj.ctrt_no.value = "";
	//formObj.ctrt_nm.value = "";	
	//formObj.item_cd.value = "";	
	formObj.prop_no.value="";
	formObj.prop_date_fm.value="";
	formObj.prop_date_to.value="";
	formObj.wh_loc_cd.value="";
	formObj.wh_loc_nm.value="";
	formObj.prop_bk_no.value = "";
    formObj.ref_no.value = "";
    formObj.lic_plat_no.value = "";
	//formObj.wib_bk_no.value="";
	//formObj.cust_ord_no.value="";	
	if (code == "ITEM") {
		ComEnableObject(formObj.prop_no, false);
		ComEnableObject(formObj.prop_date_fm, false);
		ComEnableObject(formObj.prop_date_to, false);
		ComEnableObject(formObj.wh_loc_nm, false);
        ComEnableObject(formObj.prop_bk_no, false);
        ComEnableObject(formObj.ref_no, false);
		formObj.prop_no_tp.options[formObj.prop_no_tp.selectedIndex].value = "LOT_NO";
		formObj.prop_no_tp.disabled = true;
		formObj.prop_date_tp.options[formObj.prop_date_tp.selectedIndex].value = "INBOUND_DT";
		formObj.prop_date_tp.disabled = true;
        formObj.prop_bk_tp.options[formObj.prop_bk_tp.selectedIndex].value = "CUST_NO";
        formObj.prop_bk_tp.disabled = true;
        
        document.getElementById("lic_plat_no").style.display = "none";
		document.getElementById("lp_label").style.display = "none";
		
		ComBtnDisable("btn_prop_date_fm");		
		ComBtnDisable("btn_prop_date_to", false, 5);		
		ComBtnDisable("btn_wh_loc_cd", false, 3);		
	} else if (code == "LOT") {
		ComEnableObject(formObj.wh_loc_nm, false);
		ComEnableObject(formObj.prop_bk_no, false);
		formObj.prop_no_tp.options[formObj.prop_no_tp.selectedIndex].value = "LOT_NO";
		ComEnableObject(formObj.prop_no_tp, true);
		formObj.prop_date_tp.options[formObj.prop_date_tp.selectedIndex].value = "INBOUND_DT";
		formObj.prop_date_tp.disabled = false;
		formObj.prop_bk_tp.options[formObj.prop_bk_tp.selectedIndex].value = "CUST_NO";
		formObj.prop_bk_tp.disabled = true;
		ComBtnEnable("btn_prop_date_fm");		
		ComBtnEnable("btn_prop_date_to");		
		ComBtnDisable("btn_wh_loc_cd");	
		
		document.getElementById("lic_plat_no").style.display = "";
		document.getElementById("lp_label").style.display = "";
	} else if (code == "LOC") {
		formObj.prop_no_tp.options[formObj.prop_no_tp.selectedIndex].value = "LOT_NO";
		ComEnableObject(formObj.prop_no_tp, true);
		formObj.prop_date_tp.options[formObj.prop_date_tp.selectedIndex].value = "INBOUND_DT";
		ComEnableObject(formObj.prop_date_tp, true);
		formObj.prop_bk_tp.options[formObj.prop_bk_tp.selectedIndex].value = "CUST_NO";
		ComEnableObject(formObj.prop_bk_tp, true);
		ComBtnEnable("btn_prop_date_fm");		
		ComBtnEnable("btn_prop_date_to");		
		ComBtnEnable("btn_wh_loc_cd");	
		
		document.getElementById("lic_plat_no").style.display = "";
		document.getElementById("lp_label").style.display = "";
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
    if (code == "ITEM") {
		document.all.div_sheet_item.style.display="block";
		document.all.div_sheet_lot.style.display="none";
		document.all.div_sheet_loc.style.display="none";
		doDispPaging(docObjects[0].GetCellValue(2, "Indexing"), getObj('pagingTb'))
		
    } else if(code == "LOT") {
		document.all.div_sheet_item.style.display="none";
		document.all.div_sheet_lot.style.display="block";
		document.all.div_sheet_loc.style.display="none"; 
		doDispPaging(docObjects[1].GetCellValue(2, "Indexing"), getObj('pagingTb'))
    } else if(code == "LOC") {
		document.all.div_sheet_item.style.display="none";
		document.all.div_sheet_lot.style.display="none";
		document.all.div_sheet_loc.style.display="block"; 
		doDispPaging(docObjects[2].GetCellValue(2, "Indexing"), getObj('pagingTb'))
    }  
    resizeSheet();
}

function get_ctrt_no(popupCtr){
	var formObj=document.form;
	var param = "";
	if(popupCtr == "EnterK"){
		param = "?ctrt_no=" + "&ctrt_nm=" + formObj.ctrt_nm.value + "&ctrt_use_flg=A";
	}else{
		param = "?ctrt_no=" + "&ctrt_use_flg=A";
	}
    callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt' + param, callBackFunc, 900, 580,"yes");
}

function goToPage(callPage) {
	document.form.f_CurPage.value = callPage;
	doWork('SEARCHLIST');
}

function searchList() {
	doWork('SEARCHLIST');
}

//OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS
var isHiddenBarcode = true;
function setItemBarcode(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]=="Y" && doc[1]!=undefined ) {
		isHiddenBarcode = false;
	}
}