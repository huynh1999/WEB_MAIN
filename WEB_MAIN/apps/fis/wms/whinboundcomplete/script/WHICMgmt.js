//<%--=========================================================
//*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
//*@FileName   : WHICMgmt.js
//*@FileTitle  : Inbound Complete Management
//*@author     : Bao.Huynh - DOU Network
//*@version    : 1.0
//*@since      : 2015/04/20
//=========================================================--%>
var sheetCnt=0;
var comboObjects=new Array();
var docObjects=new Array();
var comboCnt=0;
var fix_grid01="Grd01";
var fix_grid02="Grd02";
var selectCnt=0;
var loading_flag = "N";
var firCalFlag = false;
var flag_req_search_no = false;
var tempRow = 0;
var tempCol = 0;

/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/*
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여
 * cache옵션 false셋팅
 */
//$(document).ready(function () {
//    $.ajaxSetup({ cache: false });
//});
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
	//IBMultiCombo초기화
	loadComboOrderType();
	loadComboWarehouse();
    //doHideProcess(false);
    loading_flag = "Y";
	//control
	initControl();
	ComEnableObject(document.form.btn_save, false);
	if($("#req_search_no").val() == ""){ //번호가 없을경우
		$("#wh_cd").val($("#def_wh_cd").val());
		$("#wh_nm").val($("#def_wh_nm").val());
		$("#ctrt_no").val($("#def_wh_ctrt_no").val());
		$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
		$("#fm_bk_date").val(ComGetDateAdd(null, "d", -31, "-"));
		$("#to_bk_date").val(ComGetNowInfo());
		btn_show('O');
	}else{
		$("#search_no").val($("#req_search_no").val());
		//$("#search_tp")[0].SetSelectCode($("#req_search_tp").val());
		document.form.search_tp.value = $("#req_search_tp").val();
		btn_show('H'); //기본이 HIDE 임. 굳이 재셋팅할필요없음
		btn_Search();//조회
		flag_req_search_no = true;
	}
	resizeSheet();
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
	//?axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
    //?axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    //?axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/*
 * init sheet
 */
function initSheet(sheetObj, sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet1":      //IBSheet1 init
	    with(sheetObj){
       
//      var hdr1="|SEQ|Unloading\nSheet|Contract No|Contract No|Booking No|Order\nType|Booking Date|Estimate IN\nDate|Status|O/S|Latest Inbound Date|Latest Inbound Date|Loading Type|Warehouse"
//      + "|hiddenStatus|UnloadingSheetYn|warehouse name|loc_freedays";
		
      var prefix=fix_grid01;
      
      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [ { Text:getLabel('WHICMgmt_Sheet1_HDR1'), Align:"Center"} ];	
      InitHeaders(headers, info);

      var cols = [  {Type:"CheckBox",  Hidden:0, 	Width:30,    	Align:"Center",    SaveName:prefix+"del_chk",    			ColMerge:1,   Format:"",   			 KeyField:0},
					{Type:"Seq",       Hidden:0, 	Width:30,    	Align:"Center",    SaveName:prefix+"seq",    				ColMerge:1,   Format:"",   			 KeyField:0},
					{Type:"Image",     Hidden:0, 	Width:60,    	Align:"Center",    SaveName:prefix+"unload_sht",    		ColMerge:1,   Format:"",   			 KeyField:0,	UpdateEdit:0},
					{Type:"Text",      Hidden:0,  	Width:80,    	Align:"Center",    SaveName:prefix+"ctrt_no",    			ColMerge:1,   Format:"",   			 KeyField:0,	UpdateEdit:0},
					{Type:"Text",      Hidden:0,  	Width:120,    	Align:"Left",      SaveName:prefix+"ctrt_nm",    			ColMerge:1,   Format:"",   			 KeyField:0,	UpdateEdit:0},
					{Type:"Text",      Hidden:0,  	Width:130,    	Align:"Center",    SaveName:prefix+"wib_bk_no",   			ColMerge:1,   Format:"",   			 KeyField:0,	UpdateEdit:0},
					{Type:"Text",      Hidden:0,  	Width:70,    	Align:"Center",    SaveName:prefix+"ord_tp_nm",   			ColMerge:1,   Format:"",   			 KeyField:0,	UpdateEdit:0},
					{Type:"Date",      Hidden:0,  	Width:80,    	Align:"Center",    SaveName:prefix+"bk_date",    			ColMerge:1,   Format:"Ymd",   		 KeyField:0,	UpdateEdit:0},
					{Type:"Date",      Hidden:0,  	Width:80,    	Align:"Center",    SaveName:prefix+"est_in_dt",    			ColMerge:1,   Format:"Ymd",   		 KeyField:0,	UpdateEdit:0},
					{Type:"Text",      Hidden:0,  	Width:110,    	Align:"Left",      SaveName:prefix+"bk_status",    			ColMerge:1,   Format:"",   			 KeyField:0,	UpdateEdit:0},
					{Type:"Text",      Hidden:0,  	Width:40,    	Align:"Center",    SaveName:prefix+"os",    				ColMerge:1,   Format:"",   			 KeyField:0,	UpdateEdit:0},
					{Type:"Date",      Hidden:0,  	Width:80,    	Align:"Center",    SaveName:prefix+"latest_inbound_day",    ColMerge:1,   Format:"Ymd",   		 KeyField:0,	UpdateEdit:0},
					{Type:"Date",      Hidden:0,  	Width:50,    	Align:"Center",    SaveName:prefix+"latest_inbound_time",   ColMerge:1,   Format:"Hm",     	 	 KeyField:0,	UpdateEdit:0},
					{Type:"Text",      Hidden:0,  	Width:80,    	Align:"Center",    SaveName:prefix+"load_tp_cd_nm",    		ColMerge:1,   Format:"",   			 KeyField:0,	UpdateEdit:0},
					{Type:"Combo",      Hidden:0,  	Width:60,    	Align:"Center",    SaveName:prefix+"wh_cd",    				ColMerge:1,   Format:"",   			 KeyField:0,	UpdateEdit:0},
					{Type:"Status",    Hidden:1, 	Width:30,    	Align:"Center",    SaveName:prefix+"ibflag"},
					{Type:"Text",      Hidden:1, 	Width:80,    	Align:"Center",    SaveName:prefix+"unload_sht_yn",    					  Format:""},
					{Type:"Text",      Hidden:1, 	Width:80,    	Align:"Center",    SaveName:prefix+"wh_nm",    							  Format:""},
					{Type:"Text",      Hidden:1, 	Width:80,    	Align:"Center",    SaveName:prefix+"loc_freedays",     					  Format:""}];
       
      InitColumns(cols);
      SetSheetHeight(200);
      SetEditable(1);
      SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
      //#1106: Sync Combobox Warehouse of WMS with OPUS FWD
      SetColProperty(prefix+"wh_cd", {ComboCode:warehouseCode, ComboText:warehouseText} );
//      SetImageList(1, "/WEB_MAIN/web/img/main/icon_text02_on.gif");
      SetImageList(1, APP_PATH + "/web/img/main/icon_text02_on.gif");
      //SetHeaderRowHeight(30);
      //SetAutoRowHeight(0);
      //resizeSheet();
            }
      break;


	case "sheet2":
	    with(sheetObj){
        
//      var hdr1="SEQ|Booking No|Item|Item Name|Inbound Date|Inbound Date|Item Lot|Estimated|Estimated|Estimated|Receiving|Receiving|Receiving|Receiving|Receiving|Receiving|O/S|Inbound\nLoc|Volume|Volume|GWT|GWT|NWT|NWT|PO No|Type|CNTR/TR NO|Seal No|Additional LOT Info|Additional LOT Info|Additional LOT Info|Comment"
//      + "|stat|CTRT_NO|PO_SYS_NO|ITEM_SYS_NO|ITEM_SEQ|FIX_LOT_ID|eq_tp_cd|INBOUND LOC CODE|snd ea qty|dmg ea qty|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|fix_loc_cd|fix_loc_cd_nm|pe_qty";
//      var hdr2="SEQ|Booking No|Item|Item Name|Day|Time|Item Lot|Unit|Qty|EA Qty|Sound(S)|Sound(S)|Damage(D)|Damage(D)|(S)+(D)\nEA Qty|(S)+(D)\nPE Qty|O/S|Inbound\nLoc|CBM|CBF|KGS|LBS|KGS|LBS|PO No|Type|CNTR/TR NO|Seal No|Expiration Date|Lottable04|Lottable05|Comment"
//      + "|stat|CTRT_NO|PO_SYS_NO|ITEM_SYS_NO|ITEM_SEQ|FIX_LOT_ID|eq_tp_cd|INBOUND LOC CODE|snd ea qty|dmg ea qty|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|fix_loc_cd|fix_loc_cd_nm|pe_qty";
      var prefix=fix_grid02;

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [ { Text:getLabel('WHICMgmt_Sheet2_HDR1'), Align:"Center"},
                      { Text:getLabel('WHICMgmt_Sheet2_HDR2'), Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [  {Type:"Seq",       	Hidden:0, 	Width:30,   	Align:"Center",   	ColMerge:1,    SaveName:prefix+"seq",   					KeyField:0,                		Format:""  										},
					{Type:"Text",     	Hidden:0,  	Width:100,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"wib_bk_no",   				KeyField:0,		UpdateEdit:0,   Format:""  										},
					{Type:"Text",     	Hidden:0,  	Width:100,    	Align:"Left",   	ColMerge:1,    SaveName:prefix+"item_cd",   				KeyField:0,		UpdateEdit:0,   Format:""  										},
					{Type:"Text",     	Hidden:0,  	Width:150,    	Align:"Left",   	ColMerge:1,    SaveName:prefix+"item_nm",   				KeyField:0,		UpdateEdit:0,   Format:""  										},
					{Type:"Date",     	Hidden:0,  	Width:100,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"inbound_dt",   				KeyField:0,   					Format:"Ymd"								},
					{Type:"Date",     	Hidden:0,  	Width:50,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"inbound_hm",   				KeyField:0,		UpdateEdit:0,   Format:"Hm" 								},
					{Type:"Text",     	Hidden:0,  	Width:100,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"lot_no",   					KeyField:0,						Format:"",					EditLen:20			},
					{Type:"Text",     	Hidden:0,  	Width:50,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"item_pkgunit",  			KeyField:0,		UpdateEdit:0,   Format:""										},
					{Type:"Int",     	Hidden:0,  	Width:70,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"item_pkgqty",   			KeyField:0,		UpdateEdit:0,   Format:"Integer",                 PointCount:0},
					{Type:"Int",     	Hidden:0,  	Width:70,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"est_qty",   				KeyField:0,		UpdateEdit:0,   Format:"Integer",                 PointCount:0},
					{Type:"PopupEdit", 	Hidden:0,	Width:50,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"rcv_sound_unit",   			KeyField:0,   					Format:""										},
					{Type:"Int",     	Hidden:0,  	Width:70,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"rcv_sound_qty",   			KeyField:0,   	EditLen: 9,					Format:"Integer",					PointCount:0},
					{Type:"PopupEdit", 	Hidden:0, 	Width:90,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"unload_inbound_loc_nm",   		KeyField:0,   					Format:""										},
					{Type:"Text", 		Hidden:1, 	Width:90,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"rcv_sound_loc_cd",   		KeyField:0,   					Format:""										},
					{Type:"PopupEdit", 	Hidden:0, 	Width:50,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"rcv_damage_unit",   		KeyField:0,   					Format:""										},
					{Type:"Int",     	Hidden:0,  	Width:70,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"rcv_damage_qty",   			KeyField:0,   EditLen: 9 ,					Format:"Integer",					PointCount:0},
					{Type:"PopupEdit", 	Hidden:0, 	Width:90,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"rcv_damage_loc_nm",   		KeyField:0,   					Format:""										},
					{Type:"Text", 		Hidden:1, 	Width:90,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"rcv_damage_loc_cd",   		KeyField:0,   					Format:""										},
					{Type:"Int",     	Hidden:0,  	Width:70,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"in_item_ea_qty",   			KeyField:0,		UpdateEdit:0,   Format:"Integer",					PointCount:0},
					{Type:"Int",     	Hidden:0,  	Width:70,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"in_item_pe_qty",   			KeyField:0,   	EditLen: 9,				Format:"Integer",					PointCount:0},
					{Type:"Int",     	Hidden:0,  	Width:70,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"os_item_ea_qty",   			KeyField:0,		UpdateEdit:0,   Format:"Integer",					PointCount:0},
					/*The column not use*/
					{Type:"PopupEdit", 	Hidden:1, 	Width:90,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"unload_inbound_loc_nm_deleted",   	KeyField:0,   					Format:""										},
					
					{Type:"Float",     	Hidden:0,  	Width:80,    	Align:"Right",   	ColMerge:0,    SaveName:prefix+"item_cbm",   				KeyField:0,   	EditLen: 9,				Format:"Float",							PointCount:3},
					{Type:"Float",     	Hidden:0,  	Width:80,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"item_cbf",   				KeyField:0,   	EditLen: 9,				Format:"Float",							PointCount:3},
					{Type:"Float",     	Hidden:0,  	Width:80,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"item_grs_kgs",   			KeyField:0,   	EditLen: 9,				Format:"Float",							PointCount:3},
					{Type:"Float",     	Hidden:0,  	Width:80,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"item_grs_lbs",   			KeyField:0,   	EditLen: 9,				Format:"Float",							PointCount:3},
					{Type:"Float",     	Hidden:0,  	Width:80,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"item_net_kgs",   			KeyField:0,   	EditLen: 9,				Format:"Float",							PointCount:3},
					{Type:"Float",     	Hidden:0,  	Width:80,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"item_net_lbs",   			KeyField:0,   	EditLen: 9,				Format:"Float",							PointCount:3},
					{Type:"Text",     	Hidden:0,  	Width:100,    	Align:"Left",   	ColMerge:1,    SaveName:prefix+"po_no",   					KeyField:0,		UpdateEdit:0,   Format:""										},
					{Type:"PopupEdit", 	Hidden:0, 	Width:70,   	Align:"Center",  	ColMerge:1,    SaveName:prefix+"eq_tpsz_cd",   				KeyField:0,   					Format:""										},
					{Type:"Text",     	Hidden:0,  	Width:100,    	Align:"Left",   	ColMerge:1,    SaveName:prefix+"eq_no",    					KeyField:0,						Format:"",					EditLen:20 			},
					{Type:"PopupEdit", 	Hidden:0, 	Width:120,    	Align:"Left",   	ColMerge:1,    SaveName:prefix+"seal_no",  					KeyField:0,						Format:"",					EditLen:100			},
					{Type:"Date",     	Hidden:0,  	Width:100,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"exp_dt",   					KeyField:0,   					Format:"Ymd"								},
					{Type:"Text",     	Hidden:0,  	Width:80,    	Align:"Left",   	ColMerge:1,    SaveName:prefix+"lot_04",   					KeyField:0,						Format:"",					EditLen:20			},
					{Type:"Text",     	Hidden:0,  	Width:80,    	Align:"Left",   	ColMerge:1,    SaveName:prefix+"lot_05",   					KeyField:0,						Format:"",					EditLen:20			},
					{Type:"PopupEdit", 	Hidden:0, 	Width:120,    	Align:"Left",   	ColMerge:1,    SaveName:prefix+"rmk",      					KeyField:0,						Format:"",					EditLen:100			},
					
					{Type:"Status",    	Hidden:1, 	Width:30,   	Align:"Center",    				   SaveName:prefix+"ibflag"																										},
					{Type:"Text",      	Hidden:1, 	Width:80,   	Align:"Center",   	ColMerge:1,    SaveName:prefix+"ctrt_no",   												Format:""										},
					{Type:"Text",      	Hidden:1, 	Width:80,   	Align:"Center",   	ColMerge:1,    SaveName:prefix+"po_sys_no",   												Format:""										},
					{Type:"Text",      	Hidden:1, 	Width:80,   	Align:"Center",   	ColMerge:1,    SaveName:prefix+"item_sys_no",   											Format:""										},
					{Type:"Text",      	Hidden:1, 	Width:80,   	Align:"Center",   	ColMerge:1,    SaveName:prefix+"item_seq",   												Format:""										},
					{Type:"Text",      	Hidden:1, 	Width:80,   	Align:"Center",   	ColMerge:1,    SaveName:prefix+"fix_lot_id",    											Format:""										},
					{Type:"Text",      	Hidden:1, 	Width:80,   	Align:"Center",   	ColMerge:1,    SaveName:prefix+"eq_tp_cd",      											Format:""										},
					{Type:"Text",      	Hidden:0, 	Width:70,   	Align:"Center",   	ColMerge:1,    SaveName:prefix+"unload_inbound_loc_cd",   									Format:""										},
					
					{Type:"Int",      	Hidden:1, 	Width:0,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"snd_ea_qty",   												Format:"Integer"								},
					{Type:"Int",      	Hidden:1, 	Width:0,    	Align:"Right",   	ColMerge:1,    SaveName:prefix+"dmg_ea_qty",   												Format:"Integer"								},
					{Type:"Text",      	Hidden:1, 	Width:0,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"pkg_lv1_qty",  												Format:"Integer",					PointCount:0},
					{Type:"Float",      	Hidden:1, 	Width:0,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"lv1_cbm",   												Format:"Float",							PointCount:3},
					{Type:"Float",      	Hidden:1, 	Width:0,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"lv1_cbf",   												Format:"Float",							PointCount:3},
					{Type:"Float",      	Hidden:1, 	Width:0,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"lv1_grs_kgs",   											Format:"Float",							PointCount:3},
					{Type:"Float",      	Hidden:1, 	Width:0,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"lv1_grs_lbs",   											Format:"Float",							PointCount:3},
					{Type:"Float",      	Hidden:1, 	Width:70,   	Align:"Center",   	ColMerge:1,    SaveName:prefix+"lv1_net_kgs",   											Format:"Float",							PointCount:3},
					{Type:"Float",      	Hidden:1, 	Width:50,   	Align:"Center",   	ColMerge:1,    SaveName:prefix+"lv1_net_lbs",  												Format:"Float",							PointCount:3},
					{Type:"Text",      	Hidden:1, 	Width:70,   	Align:"Center",   	ColMerge:1,    SaveName:prefix+"fix_loc_cd",   												Format:""										},
					{Type:"Text",      	Hidden:1, 	Width:70,   	Align:"Center",   	ColMerge:1,    SaveName:prefix+"fix_loc_cd_nm",   											Format:""										},
					{Type:"Int",      	Hidden:1, 	Width:0,    	Align:"Center",   	ColMerge:1,    SaveName:prefix+"pe_qty",   													Format:"Integer",					PointCount:0}];
       
      InitColumns(cols);
      SetSheetHeight(235);
      SetEditable(1);
//      SetHeaderRowHeight(30);
//      SetAutoRowHeight(0);
      resizeSheet();
      SetColProperty(0 ,prefix+"rcv_sound_unit" ,  {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
      SetColProperty(0 ,prefix+"rcv_damage_unit" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
      SetColProperty(0 ,prefix+"lot_no" ,          {AcceptKeys:"" , InputCaseSensitive:1});
      SetColProperty(0 ,prefix+"seal_no" , 		   {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
      SetColProperty(0 ,prefix+"eq_no" , 		   {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
      SetColProperty(0 ,prefix+"eq_tpsz_cd" ,      {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
      SetColProperty(0 ,prefix+"rcv_sound_loc_nm" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
      SetColProperty(0 ,prefix+"rcv_damage_loc_nm" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
      SetColProperty(0 ,prefix+"unload_inbound_loc_nm" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
      //SetGetUnicodeByte(3);
      }
      break;
	case "sheet3":      //IBSheet1 init
	    with(sheetObj){
       
      var hdr1="";
      
      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [ { Text:hdr1, Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [];
      SetVisible(false);
            }
      break;
}}
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
	ComResizeSheet(docObjects[1]);
}
/*
 * ibound date time 변경시 시트에 일괄적용 event
 */
function checktime()
{
	var formObj=document.form;
	var timevalue = formObj.in_loc_hm.value;
	if(parseInt(timevalue.substring(0, 3)) >= 24 || parseInt(timevalue.substring(3, 5)) >= 60)
		{
			alert("Invalid time");
			formObj.in_loc_hm.focus();
		}
}
function setHm(obj){
	//값이 정확할때 까지 포커스가 나가지 않은 경우
	if(event.returnValue == false)
	{
		return;
	}
	//올바른 시간이 입력되었을경우
	var formObj=document.form;
	var sheetObj=sheet2;//docObjects[0];
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//INBOUND TIME DEFAULT 지정
		sheetObj.SetCellValue(i, fix_grid02 + "inbound_hm",formObj.in_loc_hm.value);
 	}
}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=sheet1;//docObjects[0];
	for(var i=1; i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wib_bk_no", 1);
		//CONTRACT NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "ctrt_no","#0100FF");
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "ctrt_no", 1);
		//UNLOADING SHEET ICON
 		if (sheetObj.GetCellValue(i, fix_grid01 + "unload_sht_yn") =="Y")
		{
 			sheetObj.SetCellImage(i, fix_grid01 + "unload_sht",1);
		}
	}
	if(flag_req_search_no){
		if(sheet1.RowCount()> 0){
			sheet1.SetCellValue(sheet1.HeaderRows(), fix_grid01 + "del_chk",1,0);//강제체크
		}
		btn_Down();
		flag_req_search_no = false;
	}
}
/*
 * sheet1 dbclick event
 */
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	var formObj=document.form;
	switch(colStr)
	{
		case fix_grid01 + "wib_bk_no":
			var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
//			parent.mkNewFrame('Inbound Booking Management', sUrl);
			parent.mkNewFrame('Inbound Booking Management', sUrl, "WHInbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
			
		break;
		case fix_grid01 + "ctrt_no":
			var sUrl="./CtrtMgmt.clt?ctrt_no="+ sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no");
//			parent.mkNewFrame('Contract Management', sUrl);
			parent.mkNewFrame('Contract Management', sUrl, "CtrtMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no"));
			break;
		case fix_grid01 + "unload_sht":
			if (sheetObj.GetCellValue(Row, fix_grid01 + "unload_sht_yn") =="Y")
			{
				var fileName ="^@@^" + "WH_IN_WORK.mrd" ;
				var param = "^@@^" +"[" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no") + "]" ;
				fileName = fileName.substring(4);
				param = param.substring(4);
				formObj.file_name.value= fileName;
				formObj.rd_param.value=param;
				popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
			}
			break;
	}
}
/*
 * sheet2 searchend event
 */
function sheet2_OnSearchEnd(){
	var formObj=document.form;
	var sheetObj=sheet2;//docObjects[0];
	sheetObj.SetImageList(0,"/OPUS_FWD_4_0/WEB_MAIN/web/img/main/icon_m.gif");//popupimg 변경시는 인덱스번호로만 가능...
	//selectCnt 따른 sheet2 block처리 및 close콤보박스 control
	var arr=new Array(); 
	//SHEET에서 UPDATE-EDIT 가능한 필드들의 나열
	arr[0]=fix_grid02+ "inbound_dt";
	arr[1]=fix_grid02+ "lot_no";
	arr[2]=fix_grid02+ "exp_dt";
	arr[3]=fix_grid02+ "lot_04";
	arr[4]=fix_grid02+ "lot_05";
	if (selectCnt > 1) //멀티건일 경우 무조건 Complete체크후, 변경 불가 상태로 변경
	{
		formObj.checkClose.disabled=true;
		$('#checkClose').attr('checked',true);
	}
	else //싱글건일 경우 Complete 미체크후, 변경가능 상태로 변경
	{
		formObj.checkClose.disabled=false;
		$('#checkClose').attr('checked',false);
	}
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//INBOUND TIME DEFAULT 지정
		sheetObj.SetCellValue(i, fix_grid02 + "inbound_hm",formObj.in_loc_hm.value);
		//CONTRACT NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid02 + "wib_bk_no","#0100FF");
 		sheetObj.SetCellFontUnderline(i, fix_grid02 +  "wib_bk_no", 1);
		//seal button 지정
		//fix_lot_id에 따른 celleditable처리(inbound_dt,lot_no, exp_dt, lot_04, lot_05)
 		if(sheetObj.GetCellValue(i, fix_grid02 + "fix_lot_id").trim() != "")
		{
			//fix_lot_id가 있으면
			for (var m=0; m<arr.length; m++)
			{
				sheetObj.SetCellEditable(i, arr[m],0);
			}
		}
		else
		{
			//fix_lot_id가 없으면
			for (var m=0; m<arr.length; m++)
			{
				sheetObj.SetCellEditable(i, arr[m],1);
			}
		}
		//fix_loc_cd
 		if(sheetObj.GetCellValue(i, fix_grid02 + "fix_loc_cd").trim() != "")
		{
			//fix_loc_cd와 unload_inbound_loc_cd가 동일할경우에만 CellEditable false처리
 			if(sheetObj.GetCellValue(i, fix_grid02 + "fix_loc_cd").trim() == sheetObj.GetCellValue(i, fix_grid02 + "unload_inbound_loc_cd").trim())
			{
				sheetObj.SetCellEditable(i, fix_grid02 + "unload_inbound_loc_nm",0);
			}
		}
	}
	//--total pe계산
	var col=sheetObj.SaveNameCol(fix_grid02 + "in_item_pe_qty");
	var pe_qty=sheetObj.ComputeSum("|" + String(col) + "|");
	$("#tot_in_item_pe_qty").val(ComAddComma(pe_qty));
	//-- check authority warehouse code 
	check_authority_wh();
}
/*
 * sheet1 dbclick event
 */
function sheet2_OnDblClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid02 + "wib_bk_no":
			var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid02 + "wib_bk_no");
			parent.mkNewFrame('Inbound Booking Management', sUrl,"WHInbkMgmt_" +sheetObj.GetCellValue(Row, fix_grid02 + "wib_bk_no"));
		break;
	}
}
/*
 * sheet2 onchange event
 */
function sheet2_OnChange(sheetObj, row, col, Value) {
	
	tempRow = row;
	tempCol = col;
	
	var colStr=sheetObj.ColSaveName(col);
	
	if(colStr == fix_grid02 + "rcv_sound_qty"
	|| colStr == fix_grid02 + "rcv_damage_qty"
	)
	{
		var qty=Value;
		//음수체크
		if(Value < 0)
		{
			qty=Math.abs(Value);
			sheetObj.SetCellValue(row, col,qty,0);
		}
		CalcOS(sheetObj, row, col);
	}
	//receiving이 변경되었을경우 O/S 계산
	else if(colStr == fix_grid02 + "rcv_sound_unit" 
	     || colStr == fix_grid02 + "rcv_damage_unit"
	)
	{
		if(Value != "")
		{
			/*$.ajax({
				url : "searchCommonCodeInfo.clt?grp_cd=A6&code_cd="+Value 
					+ "&wh_flag=Y&ctrt_no="+ sheetObj.GetCellValue(row, (fix_grid02+"ctrt_no"))
					+ "&item_sys_no=" + sheetObj.GetCellValue(row, (fix_grid02+"item_sys_no")),
				success : function(result) {*/
//			var sXml = sheet2.GetSearchData("./searchCommonCodeInfo.clt?grp_cd=A6&code_cd="+Value 
//					+ "&wh_flag=Y&ctrt_no="+ sheetObj.GetCellValue(row, (fix_grid02+"ctrt_no"))
//					+ "&item_sys_no=" + sheetObj.GetCellValue(row, (fix_grid02+"item_sys_no")));

			ajaxSendPost(getDataAjaxCommonCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchCommonCodeInfo&grp_cd=A6&code_cd='+Value 
					+ "&wh_flag=Y&ctrt_no="+ sheetObj.GetCellValue(row, (fix_grid02+"ctrt_no"))
					+ "&item_sys_no=" + sheetObj.GetCellValue(row, (fix_grid02+"item_sys_no")), './GateServlet.gsl');
			
//			sheetObj.SetCellValue(row, col, getXmlDataNullToNullString(sXml, 'code_cd'), 0);
//			
//			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
//				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
//				sheetObj.SetCellValue(row, fix_grid02 + "in_item_ea_qty",0);
//				sheetObj.SelectCell(row, col);
//			}
//			else
//			{
//				CalcOS(sheetObj, row, col);
//			}
		
		}
		else
		{
			CalcOS(sheetObj, row, col); //validation check에서 걸림
		}
	}
	else if (colStr == (fix_grid02+"in_item_ea_qty") && Value != "")
	{
		//CBM, KGS, LBS 계산
		var qty=eval(Value);
		var pkg_lv1_qty=eval(sheetObj.GetCellValue(row, fix_grid02 + "pkg_lv1_qty"));
		var lv1_cbm=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_cbm"));
		var lv1_cbf=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_cbf"));
		var lv1_grs_kgs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_grs_kgs"));
		var lv1_grs_lbs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_grs_lbs"));
		var lv1_net_kgs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_net_kgs"));
		var lv1_net_lbs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_net_lbs"));
		sheetObj.SetCellValue(row,  fix_grid02 + "item_cbm",(pkg_lv1_qty * qty) * lv1_cbm,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "item_cbf",(pkg_lv1_qty * qty) * lv1_cbf,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "item_grs_kgs",(pkg_lv1_qty * qty) * lv1_grs_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "item_grs_lbs",(pkg_lv1_qty * qty) * lv1_grs_lbs,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "item_net_kgs",(pkg_lv1_qty * qty) * lv1_net_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "item_net_lbs",(pkg_lv1_qty * qty) * lv1_net_lbs,0);
		//(s)+(d) pe계산
		/* PE 계산로직 
		 Total (Lv1)수량을 PE단위로 환산
	 	 PE단위가 없을 경우 : 무조건 1
	     PE단위 이하 수량이 입고되면무조건 1
	     PE단위로 입고되면 나누기(무조건올림처리)
		 */ 
		var pe_qty=eval(sheetObj.GetCellValue(row, fix_grid02 + "pe_qty"));
		var in_item_pe_qty=0;
		if(qty == 0)
		{
			in_item_pe_qty=0;
		}
		else if(pe_qty < 0)
		{
			in_item_pe_qty=1;
		}
		else if (pe_qty > qty)
		{
			in_item_pe_qty=1;
		}
		else
		{
			in_item_pe_qty=Math.ceil(qty/pe_qty);
		}
		sheetObj.SetCellValue(row,  fix_grid02 + "in_item_pe_qty",in_item_pe_qty);
	}
	else if (colStr == (fix_grid02+"item_cbf") && Value != "") 
	{
		funcKGS_CBM_CAC("CBF_CBM", (fix_grid02+"item_cbf"), (fix_grid02+"item_cbm"), sheetObj);		
	} 
	else if (colStr == (fix_grid02+"item_grs_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid02+"item_grs_lbs"), (fix_grid02+"item_grs_kgs"), sheetObj);		
	} 
	else if (colStr == (fix_grid02+"item_net_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid02+"item_net_lbs"), (fix_grid02+"item_net_kgs"), sheetObj);		
	}
	else if(colStr == (fix_grid02 + "eq_tpsz_cd")) 
	{
		if(Value != "")
		{
			var sParam="cntr_tp="+Value;
			/*$.ajax({
				url : "searchCntrTrTp.clt?"+sParam,
				success : function(result) {*/
//			var sXml=sheet2.GetSearchData("searchCntrTrTp.clt?"+sParam);			
			ajaxSendPost(setCntrTrTp, row, '&goWhere=aj&bcKey=searchCntrTrTp&cntr_tp='+Value, './GateServlet.gsl');
//			sheetObj.SetCellValue(row, col, getXmlDataNullToNullString(sXml,'eq_unit'),0);
//			sheetObj.SetCellValue(row, fix_grid02+"eq_tp_cd",getXmlDataNullToNullString(sXml,'type'));
			
//			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
//				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
//				sheetObj.SelectCell(row, col);
//			}
		}
		else
		{
			sheetObj.SetCellValue(row, fix_grid02+"eq_tp_cd","");
		}
	}
	else if (colStr == (fix_grid02+"unload_inbound_loc_nm")) {
		if(Value != "")
		{
			var sParam="f_loc_cd=" + $("#in_wh_cd").val() + "&f_wh_loc_nm=" + Value + "&f_putaway_flg=Y&f_move_flg=Y";
			if(sheetObj.GetCellValue(row, fix_grid02 + "fix_loc_cd").trim() != "")
			{
				sParam=sParam + "&f_fix_wh_loc_nm=" + sheetObj.GetCellValue(row, fix_grid02 + "fix_loc_cd_nm");
			}
//			var sXml = sheet2.GetSearchData("./searchWarehouseLocInfoForName.clt?"+sParam);
//			sheetObj.SetCellValue(row, col, getXmlDataNullToNullString(sXml,'wh_loc_nm'), 0);
//			sheetObj.SetCellValue(row, fix_grid02+"unload_inbound_loc_cd", getXmlDataNullToNullString(result.xml,'wh_loc_cd'), 0);
//			if(getXmlDataNullToNullString(sXml, 'exception_msg') != ""){
//				alert(getXmlDataNullToNullString(sXml, 'exception_msg'));
//				sheetObj.SelectCell(row,  col);
//			}
			
			ajaxSendPost(getDataAjaxWarehouseLocInfoForName, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
			
		}else{
			sheetObj.SetCellValue(row, fix_grid02+"unload_inbound_loc_cd", "", 0);
		}
	}
	else if(colStr == fix_grid02 + "rcv_sound_loc_nm") 
	{
		if(Value != "")
		{
			var sParam="f_loc_cd=" + $("#in_wh_cd").val() + "&f_wh_loc_nm=" + Value + "&f_putaway_flg=Y&f_move_flg=Y&f_not_loc_prop=DMG";
			ajaxSendPost(getDataAjaxWarehouseLocSNDInfoForName, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(row,  fix_grid02+"rcv_sound_loc_cd","",0);
		}
	}	
	else if(colStr == fix_grid02 + "rcv_damage_loc_nm") 
	{
		if(Value != "")
		{
			var sParam="f_loc_cd=" + $("#in_wh_cd").val() + "&f_wh_loc_nm=" + Value + "&f_putaway_flg=Y&f_move_flg=Y&f_prop_cd=DMG&f_cmd="+COMMAND01;
			ajaxSendPost(getDataAjaxWarehouseLocDMGInfoForName, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(row,  fix_grid02+"rcv_damage_loc_cd","",0);
		}
	}
	else if(colStr == (fix_grid02+"in_item_pe_qty")){
		var qty=Value;
		//음수체크
		if(Value < 0)
		{
			qty=Math.abs(Value);
			sheetObj.SetCellValue(row, col,qty,0);
		}
		//--total pe계산
		var pe_qty=sheetObj.ComputeSum("|" + String(col) + "|");
		$("#tot_in_item_pe_qty").val(ComAddComma(pe_qty));
	}
}

function getDataAjaxCommonCodeInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj = document.form;
	var sheetObj = sheet2;
	if(doc[0] == 'OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(tempRow, tempCol, rtnArr[0], 0);
			}
			else{
				sheetObj.SetCellValue(tempRow, fix_grid02 + "in_item_ea_qty", 0);
				sheetObj.SelectCell(tempRow, tempCol);
			}
			CalcOS(sheetObj, tempRow, tempCol);
		}
		else{
			
		}
	} else {

	}
}
function getDataAjaxWarehouseLocDMGInfoForName(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj = document.form;
	if(doc[0] == 'OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheet2.SetCellValue(tempRow, tempCol, rtnArr[1], 0);
				sheet2.SetCellValue(tempRow, fix_grid02+"rcv_damage_loc_cd", rtnArr[0], 0);
			}
			else{
				sheet2.SetCellValue(tempRow, tempCol, "", 0);
				sheet2.SetCellValue(tempRow, fix_grid02+"rcv_damage_loc_cd", "", 0);
			}
		}
		else{
			sheet2.SetCellValue(tempRow, tempCol, "", 0);
			sheet2.SetCellValue(tempRow, fix_grid02+"rcv_damage_loc_cd", "", 0);
		}
	}
	else{
		sheet2.SetCellValue(tempRow, tempCol, "", 0);
		sheet2.SetCellValue(tempRow, fix_grid02+"rcv_damage_loc_cd", "", 0);
	}
}
function getDataAjaxWarehouseLocSNDInfoForName(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj = document.form;
	if(doc[0] == 'OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheet2.SetCellValue(tempRow, tempCol, rtnArr[1], 0);
				sheet2.SetCellValue(tempRow, fix_grid02+"rvc_sound_loc_cd", rtnArr[0], 0);
			}
			else{
				sheet2.SetCellValue(tempRow, tempCol, "", 0);
				sheet2.SetCellValue(tempRow, fix_grid02+"rvc_sound_loc_cd", "", 0);
			}
		}
		else{
			sheet2.SetCellValue(tempRow, tempCol, "", 0);
			sheet2.SetCellValue(tempRow, fix_grid02+"rvc_sound_loc_cd", "", 0);
		}
	}
	else{
		sheet2.SetCellValue(tempRow, tempCol, "", 0);
		sheet2.SetCellValue(tempRow, fix_grid02+"rvc_sound_loc_cd", "", 0);
	}
}
function getDataAjaxWarehouseLocInfoForName(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj = document.form;
	if(doc[0] == 'OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheet2.SetCellValue(tempRow, tempCol, rtnArr[1], 0);
				sheet2.SetCellValue(tempRow, fix_grid02+"unload_inbound_loc_cd", rtnArr[0], 0);
			}
			else{
				sheet2.SetCellValue(tempRow, tempCol, "", 0);
				sheet2.SetCellValue(tempRow, fix_grid02+"unload_inbound_loc_cd", "", 0);
			}
		}
		else{
			sheet2.SetCellValue(tempRow, tempCol, "", 0);
			sheet2.SetCellValue(tempRow, fix_grid02+"unload_inbound_loc_cd", "", 0);
		}
	}
	else{
		sheet2.SetCellValue(tempRow, tempCol, "", 0);
		sheet2.SetCellValue(tempRow, fix_grid02+"unload_inbound_loc_cd", "", 0);
	}
}

function setCntrTrTp(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
//				formObj.eq_tpsz_nm.value=rtnArr[1];
				sheet2.SetCellValue(tempRow, tempCol, rtnArr[0], 0);
				sheet2.SetCellValue(tempRow, fix_grid02+"eq_tp_cd", rtnArr[2], 0);
			}
			else{
				sheet2.SetCellValue(tempRow, tempCol,"", 0);
				sheet2.SetCellValue(tempRow, fix_grid02+"eq_tp_cd", "", 0);	
			}
		}
		else{
			sheet2.SetCellValue(tempRow, tempCol,"", 0);
			sheet2.SetCellValue(tempRow, fix_grid02+"eq_tp_cd", "", 0);	
		}
	}
	else{
		sheet2.SetCellValue(tempRow, tempCol,"", 0);
		sheet2.SetCellValue(tempRow, fix_grid02+"eq_tp_cd", "", 0);	
	}
}

function sheet2_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	var colValue=sheetObj.GetCellValue(Row, Col) ;
	//var cal = new ComCalendarGrid();
	with(sheetObj)
	{
		if(colName == (fix_grid02 + "rcv_sound_unit") || colName == (fix_grid02 + "rcv_damage_unit"))
		{
			//wh_flag=Y&ctrt_no=CTSZP13178&item_sys_no=ITW20806812111511113
			var sUrl="./CommonCodePopup.clt?grp_cd=A6&code="+colValue + "&wh_flag=Y&ctrt_no=" + sheetObj.GetCellValue(Row, (fix_grid02+"ctrt_no")) + "&item_sys_no=" + sheetObj.GetCellValue(Row, (fix_grid02+"item_sys_no"));
			callBackFunc = "setPkgunitGrid";
			modal_center_open(sUrl, callBackFunc, 400,520, "yes");			
		}else if ( colName == fix_grid02 + "rcv_sound_loc_nm" ) 
		{
			var sUrl="./WarehouseLocPopup.clt?f_loc_cd="+ $("#in_wh_cd").val()
			                             + "&f_putaway_flg=Y&f_move_flg=Y&f_not_loc_prop=DMG";			
			/*if(sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd").trim() != "")
			{
				sUrl=sUrl + "&f_fix_wh_loc_nm=" + sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd_nm");
			}*/
			
			callBackFunc = "setInboundLocInfoGrid";
			modal_center_open(sUrl, '', 700, 500,"yes");
		}
		else if ( colName == fix_grid02 + "rcv_damage_loc_nm" ) 
		{
			var sUrl="./WarehouseLocPopup.clt?f_loc_cd="+  $("#in_wh_cd").val()
			                             + "&f_putaway_flg=Y&f_move_flg=Y&f_loc_prop=DMG";			
			callBackFunc = "setDamageLocInfoGrid";
			modal_center_open(sUrl, '', 700, 500,"yes");
		}
		else if (colName == fix_grid02 + "seal_no")
		{
			ComShowMemoPad3(sheetObj, Row, Col, false, 300, 82,  Col, Col);      
		}
		else if (colName == fix_grid02 + "rmk")
		{
			ComShowMemoPad4(sheetObj, Row, Col, false, 200, 100,Col, Col);
		}
		else if ( colName == fix_grid02 + "eq_tpsz_cd" ) 
		{
			var tp="A";
			if(sheetObj.GetCellValue(Row, (fix_grid02+"eq_tp_cd")) != "")
			{
				tp=sheetObj.GetCellValue(Row, (fix_grid02+"eq_tp_cd"));
			}
			sUrl="./ContainerTypePopup.clt?type="+tp+"&eq_unit="+sheetObj.GetCellValue(Row, Col);
			callBackFunc = "setIbContainerTypeInfo";
			modal_center_open(sUrl, callBackFunc, 400, 590, "yes");
		}
		else if(colName == fix_grid02 + "unload_inbound_loc_nm")
		{
			var sUrl="./WarehouseLocPopup.clt?f_loc_cd="+ $("#in_wh_cd").val() + "&f_putaway_flg=Y&f_move_flg=Y";
			if(sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd").trim() != "")
			{
				sUrl=sUrl + "&f_fix_wh_loc_nm=" + sheetObj.GetCellValue(Row, fix_grid02 + "fix_loc_cd_nm");
			}
			//ComOpenPopup(sUrl, 700, 550, "setLocInfo", "0,0", true);
			if(sheetObj.GetCellValue(Row, fix_grid02 + "unload_inbound_loc_nm").trim() != "")
			{
			sUrl=sUrl + "&f_wh_loc_nm=" + sheetObj.GetCellValue(Row, fix_grid02 + "unload_inbound_loc_nm");
			}
			callBackFunc = "setLocInfo";
		    modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
		}
	}
}
function setInboundLocInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet2;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
	}else{
	aryPopupData = aryPopupData.split("|");
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"rcv_sound_loc_cd",aryPopupData[0],0);// wh_loc_cd
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"rcv_sound_loc_nm",aryPopupData[1],0);// wh_loc_nm
	}
}
function setDamageLocInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet2;
	//sheetObj.SetCellValue(row , fix_grid02+"dmg_loc_cd",aryPopupData[0][1],0);// wh_loc_cd
	//sheetObj.SetCellValue(row , col,aryPopupData[0][2],0);// wh_loc_nm
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
	}else{
	aryPopupData = aryPopupData.split("|");
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"rcv_damage_loc_cd",aryPopupData[0],0);// wh_loc_cd
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"rcv_damage_loc_nm",aryPopupData[1],0);// wh_loc_nm
	}
}
/*
 * loc popupedit 완료후
 */
function setLocInfo(rtnVal){
//	var sheetObj=$("#sheet2")[0];
//	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"unload_inbound_loc_cd",aryPopupData[0][1],0);// wh_loc_cd
//	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"unload_inbound_loc_nm",aryPopupData[0][2],0);// wh_loc_nm

	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=sheet2;
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"unload_inbound_loc_cd",rtnValAry[0],0);// wh_loc_cd
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02+"unload_inbound_loc_nm",rtnValAry[1],0);// wh_loc_nm
    } 
}
/*
 * type popupedit 완료후
 */
function setIbContainerTypeInfo(rtnVal){
//	var sheetObj=$("#sheet2")[0];
//	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "eq_tpsz_cd",aryPopupData[0][1]);
//	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "eq_tp_cd",aryPopupData[0][3]);
	
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj = sheet2;
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "eq_tpsz_cd", rtnValAry[0], 0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid02 + "eq_tp_cd", rtnValAry[2], 0);
    } 
}
/*
 * unit (sound, damage) popupedit 완료후
 */
function setPkgunitGrid(rtnVal){
//	var sheetObj=$("#sheet2")[0];
//	sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),aryPopupData[0][2],0);
//	CalcOS(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetSelectCol());
	
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=sheet2;
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(), rtnValAry[1], 0);
		CalcOS(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetSelectCol());
    } 
}
function CalcOS(sheetObj, row, col){
	var rcv_sound_unit=sheetObj.GetCellValue(row, fix_grid02 + "rcv_sound_unit").trim();
	var rcv_sound_qty=sheetObj.GetCellValue(row, fix_grid02 + "rcv_sound_qty").trim();
	var rcv_damage_unit=sheetObj.GetCellValue(row, fix_grid02 + "rcv_damage_unit").trim();
	var rcv_damage_qty=sheetObj.GetCellValue(row, fix_grid02 + "rcv_damage_qty").trim();
	var item_pkgunit=sheetObj.GetCellValue(row, fix_grid02 + "item_pkgunit").trim();
	var item_pkgqty=sheetObj.GetCellValue(row, fix_grid02 + "item_pkgqty").trim();
	var ctrt_no=sheetObj.GetCellValue(row, fix_grid02 + "ctrt_no").trim();
	var item_sys_no=sheetObj.GetCellValue(row, fix_grid02 + "item_sys_no").trim();
	var colStr=sheetObj.ColSaveName(col);
	//receiving이 변경되었을경우 O/S 계산
	if(colStr == fix_grid02 + "rcv_sound_unit"  || colStr == fix_grid02 + "rcv_sound_qty")
	{
		if(rcv_sound_unit == "" && rcv_sound_qty > 0)
		{
			ComShowCodeMessage("COM0114", "Sound Unit");//sound unit는 없고 qty있는경우 메세지
			sheetObj.SetCellValue(row, fix_grid02 + "in_item_ea_qty",0);
			sheetObj.SelectCell(row, fix_grid02 + "rcv_sound_unit");
			return;
		}
	}
	if(colStr == fix_grid02 + "rcv_damage_unit" || colStr == fix_grid02 + "rcv_damage_qty")
	{
		if(rcv_damage_unit == "" && rcv_damage_qty > 0)
		{
			ComShowCodeMessage("COM0114", "Damage Unit");//Damage unit는 없고 qty있는경우 메세지
			sheetObj.SetCellValue(row, fix_grid02 + "in_item_ea_qty",0);
			sheetObj.SelectCell(row, fix_grid02 + "rcv_damage_unit");
			return;
		}
	}
	
	var sXml = docObjects[0].GetSearchData("./searchWHICCalcOs.clt?f_cmd="+SEARCH01+"&rcv_sound_unit=" + rcv_sound_unit 
		                       + "&rcv_sound_qty="  + rcv_sound_qty
		                       + "&rcv_damage_unit="+ rcv_damage_unit
		                       + "&rcv_damage_qty=" + rcv_damage_qty
		                       + "&item_pkgunit="   + item_pkgunit
		                       + "&item_pkgqty="    + item_pkgqty
		                       + "&ctrt_no="        + ctrt_no
		                       + "&item_sys_no="    + item_sys_no);
	resultCalcOS(sXml, sheetObj, row, col);
}
/*
 * receving 정보바뀐경우 os계산 ajax return function
 */
function resultCalcOS(resultXml, sheetObj, row, col){
	//alert(resultXml);
	//alert(getXmlDataNullToNullString(resultXml,'suYn'));
	//alert(getXmlDataNullToNullString(resultXml,'os'));
	var suYn = displayData_sheet(resultXml,'suYn');
	var suValue = displayData_sheet(resultXml,'suValue');
	if (suYn == "" || suYn == null)
	{
		alert("error"); //TODO : MJY MESSAGE
		return;
	}
	if (suYn == "N")
	{
		ComShowCodeMessage(suValue); //COM0313~COM0315
		sheetObj.SetCellValue(row, col,"",0);
		if(suValue == "COM0314")
		{
			//sound의 unit이상
			sheetObj.SetCellValue(row, fix_grid02 + "rcv_sound_unit","",0);
		}
		else
		{
			//damage의 unit이상
			sheetObj.SetCellValue(row, fix_grid02 + "rcv_damage_unit","");
		}
		sheetObj.SetCellValue(row, fix_grid02 + "in_item_ea_qty","");
		sheetObj.SelectCell(row, col);
		return;
	}
	var in_item_ea_qty = displayData_sheet(resultXml, 'suIn');
	sheetObj.SetCellValue(row, fix_grid02 + "in_item_ea_qty",in_item_ea_qty);
	var snd_ea_qty = displayData_sheet(resultXml, 'suSndQty');
	sheetObj.SetCellValue(row, fix_grid02 + "snd_ea_qty",snd_ea_qty,0);
	var dmg_ea_qty = displayData_sheet(resultXml, 'suDmgQty');
	sheetObj.SetCellValue(row, fix_grid02 + "dmg_ea_qty",dmg_ea_qty,0);
	var est_qty = eval(sheetObj.GetCellValue(row, fix_grid02 + "est_qty"));
	var os_item_ea_qty = in_item_ea_qty - est_qty;
	sheetObj.SetCellValue(row, fix_grid02 + "os_item_ea_qty",os_item_ea_qty,0);
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
	            var cal = new ComCalendarFromTo();
	            cal.displayType = "date";
	            cal.select(formObj.fm_bk_date, formObj.to_bk_date, 'MM-dd-yyyy');
				break;
			case "btn_to_bk_date":	
				var cal = new ComCalendarFromTo();
	            cal.displayType = "date";
	            cal.select(formObj.fm_bk_date, formObj.to_bk_date, 'MM-dd-yyyy');
				break;
			case "btn_in_loc_dt":
				var cal=new ComCalendar();
				cal.select(formObj.in_loc_dt,'MM-dd-yyyy');
				break;
 			case "btn_ctrt_no" :	
 				CtrtPopup();
 				break;
 			case "SEARCHLIST" :	
 				btn_Search();
 				break;
 			case "btn_save" :	
 				btn_Save();
 				break;
 			case "btn_Down" :	
 				btn_Down();
 				break;
 			case "btn_Up" :	
 				btn_Up();
 				break;
 			case "btn_show_nm" :	
 				btn_show(val);
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

function CtrtPopup(){
	var formObj=document.form;
	callBackFunc = "setCtrtNoInfo";
	modal_center_open('./ContractRoutePopup.clt?ctrt_nm='+formObj.ctrt_nm.value + "&ctrt_no=" +formObj.ctrt_no.value, callBackFunc, 900, 580,"yes");
}

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

/*
 * 팝업 관련 로직 끝
 */
/*
 * 조회
 */
function btn_Search(){
	var formObj=document.form;
	var sheetObj1=sheet1;
	var sheetObj2=sheet2;
	if(loading_flag != "Y"){
        return;
    }
	doShowProcess(true);
	setTimeout(function(){
	if (validateForm(formObj, 'search')) {
		var sXml="";
		//searchWHICMgmtHeader
		formObj.f_cmd.value = SEARCH;
//		sheet1.DoSearch("./searchWHICMgmtHeaderGS.clt", FormQueryString(formObj));
		sheetObj1.DoSearch("./searchWHICMgmtHeaderGS.clt", FormQueryString(formObj,""));
//		sheetObj1.LoadSearchData(sXml ,{Sync:1} );
		sheetObj2.RemoveAll();
		formObj.in_wh_cd.value="";
//		formObj.in_wh_nm.value="";
		formObj.in_loc_dt.value="";
		formObj.in_loc_hm.value="";
		formObj.in_freetime_day.value="0";
		formObj.in_cust_ref_no.value="";
		formObj.tot_in_item_pe_qty.value="0";
		formObj.remark.value="";
		formObj.checkClose.disabled=false;
		$('#checkClose').attr('checked',false);
		//save button disabled
//		ComBtnDisable("btn_save");
		ComEnableObject(document.form.btn_save, false);
	}
	doHideProcess(false);
	},100);
	
}
/*
 * 아래로 아이콘
 */
function btn_Down() {
	var formObj=document.form;
	var sheetObj1=sheet1;
	var sheetObj2=sheet2;
	var checkedRows=sheetObj1.FindCheckedRow(fix_grid01 + "del_chk");
	var arrayCheckedRows=checkedRows.split("|");
	var parameters="";
	var wh_cd="";
	var wh_nm="";
	var free_days="0";
	if(checkedRows == 0){
		ComShowCodeMessage("COM0286");
		return;
	}
	for(var i=1; i<=sheetObj1.LastRow();i++){
		//숨겨진 Row를 Show 한다.
		sheetObj1.SetRowHidden(i,0);
	}
	//--복수개 선택시 warehouse가 동일한지 체크. 동일하지않을경우 error
	var wh_cd="";
	selectCnt=0; //multi건인지 single건인지 알수 있는 cnt
	for(var m=0; m<arrayCheckedRows.length; m++){
		if(m == 0) //처음건 저장
		{
			wh_cd=sheetObj1.GetCellValue(arrayCheckedRows[m],fix_grid01 + "wh_cd");
			free_days=sheetObj1.GetCellValue(arrayCheckedRows[m],fix_grid01 + "loc_freedays");
		}
		else //처음건과 현재 행 비교
		{
			if (wh_cd != sheetObj1.GetCellValue(arrayCheckedRows[m],fix_grid01 + "wh_cd"))
			{
				ComShowCodeMessage("COM0310", "Inbound");
				return;
			}
		}
		selectCnt ++;
	}
	//--key값 생성
	for(var i=0; i<arrayCheckedRows.length; i++){
		var count=arrayCheckedRows[i];
		var selectedBookingNumber=sheetObj1.GetCellValue(count,fix_grid01 + "wib_bk_no");
		parameters=parameters + fix_grid01 + "wib_bk_no=" + selectedBookingNumber + "&";
		if(sheetObj1.GetCellValue(count, fix_grid01 + "wh_cd") != ""){
			wh_cd=sheetObj1.GetCellValue(count, fix_grid01 + "wh_cd");
			wh_nm=sheetObj1.GetCellValue(count, fix_grid01 + "wh_nm");
		}
		//내려준 데이터를 숨김다.
		sheetObj1.SetRowHidden(count,1);
		sheetObj1.SetCellValue(count, fix_grid01 + "del_chk",0);
	}
	//기본값 셋팅
	formObj.in_loc_dt.value=ComGetNowInfo();
	formObj.in_loc_hm.value="00:00";
	formObj.in_wh_cd.value=wh_cd;
	formObj.in_wh_nm.value=formObj.wh_cd.options[formObj.wh_cd.options.selectedIndex].text;
	formObj.in_freetime_day.value=free_days;
	formObj.in_cust_ref_no.value="";
	//$("#in_sts_cd")[0].Index = 0;
	//$("#in_sts_cd")[0].Enable = true;
	formObj.checkClose.disabled=false;
	$('#checkClose').attr('checked',false);
	formObj.in_wh_cd.focus();
	doShowProcess(true);
	setTimeout(function(){
	 	var sXml=sheetObj1.GetSearchData("./searchWHICMgmtDetail.clt", parameters+"&f_cmd="+SEARCH02);
//	 	var xml = convertColOrder(sXml, "Grd02");
		sheetObj2.LoadSearchData(sXml, {Sync:0} );
		doHideProcess(false);
	},100);
	
	//save button enable
//	ComBtnEnable("btn_save");
	ComEnableObject(document.form.btn_save, true);
}
/*
 * 위로 아이콘
 */
function btn_Up() {
	var formObj=document.form;
	var sheetObj1=sheet1;
	var sheetObj2=sheet2;
	for(var i=1; i<=sheetObj1.LastRow();i++){
		//숨겨진 Row를 Show 한다.
		sheetObj1.SetRowHidden(i,0);
	}
	formObj.in_wh_cd.value="";
//	formObj.in_wh_nm.value="";
	formObj.in_loc_dt.value="";
	formObj.in_loc_hm.value="";
	formObj.in_freetime_day.value="0";
	formObj.in_cust_ref_no.value="";
	formObj.tot_in_item_pe_qty.value="0";
	formObj.remark.value="";
	//$("#in_sts_cd")[0].Index = 0; 
	//$("#in_sts_cd")[0].Enable = true;
	formObj.checkClose.disabled=false;
	$('#checkClose').attr('checked',false);
	sheetObj2.RemoveAll();
//	ComBtnDisable("btn_save");
	ComEnableObject(document.form.btn_save, false);
}

function btn_Save() {
	var sheetObj1 = sheet1;
	var sheetObj2 = sheet2;
	var formObj = document.form;
	//--sheetobj2에는 데이터가 없을경우(CLOSE하지않은경우)
	if(sheetObj2.RowCount()<= 0)
	{
		ComShowCodeMessage("COM0185","");
		return;
	}
	if(formObj.in_wh_cd.value == ""){
		ComShowCodeMessage("COM0114","Warehouse");
		formObj.in_wh_cd.focus();
		return;
	}
	if(ComIsEmpty(formObj.in_loc_dt.value)){
		ComShowCodeMessage("COM0114","Inbound Date");
		formObj.in_loc_dt.focus();
		return;
	}
	if(ComGetLenByByte($("#in_cust_ref_no").val().trim()) > 30)
	{
		ComShowCodeMessage("COM0215", "Customs Ref[30]");
		formObj.in_cust_ref_no.focus();
		return ;
	}
	if(ComGetLenByByte($("#remark").val().trim()) > 1000)
	{	
		ComShowCodeMessage("COM0215", "Remark[1000]");
		formObj.remark.focus();
		return ;
	}
	//--sheet 체크
	for(var i=sheetObj2.HeaderRows(); i<=sheetObj2.LastRow();i++){
		var rcv_sound_qty_num = parseInt(sheetObj2.GetCellValue(i, fix_grid02 + "rcv_sound_qty"));
		//--unit이 올바르게 입력안되경우 체크
		if (rcv_sound_qty_num > 0 && sheetObj2.GetCellValue(i, fix_grid02 + "rcv_sound_unit").trim() == "")
		{
			ComShowCodeMessage("COM0114","Sound Unit");
			sheetObj2.SelectCell(i, fix_grid02 +  "rcv_sound_unit");
			return;
		}
		if (parseInt(sheetObj2.GetCellValue(i, fix_grid02 + "rcv_damage_qty")) > 0 && sheetObj2.GetCellValue(i, fix_grid02 + "rcv_damage_unit").trim() == "")
		{
			ComShowCodeMessage("COM0114","Damage Unit");
			sheetObj2.SelectCell(i, fix_grid02 +  "rcv_damage_unit");
			return;
		}
		var qty_sum=rcv_sound_qty_num + parseInt(sheetObj2.GetCellValue(i, fix_grid02 + "rcv_damage_qty"));
		var qty_dam = parseInt(sheetObj2.GetCellValue(i, fix_grid02 + "rcv_damage_qty"));
		if(rcv_sound_qty_num > 0 && sheetObj2.GetCellValue(i, fix_grid02 + "rcv_sound_unit").trim() == "" )
		{
			ComShowCodeMessage("COM0114","Sound Unit");
			sheetObj2.SelectCell(i, fix_grid02 +  "rcv_sound_unit");
			return;
		}
		if(qty_dam > 0 && sheetObj2.GetCellValue(i, fix_grid02 + "rcv_damage_unit").trim() == "" )
		{
			ComShowCodeMessage("COM0114","Damage Unit");
			sheetObj2.SelectCell(i, fix_grid02 +  "rcv_damage_unit");
			return;
		}
		if (qty_dam > 0 && sheetObj2.GetCellValue(i, fix_grid02 +  "rcv_damage_loc_nm").trim() == "" )
		{
			
			ComShowCodeMessage("COM0114","Damage Loc");
			sheetObj2.SelectCell(i, fix_grid02 +  "rcv_damage_loc_nm");
			return;
		}
		if (rcv_sound_qty_num > 0 && sheetObj2.GetCellValue(i, fix_grid02 +  "rcv_sound_loc_nm").trim() == "" )
		{
			ComShowCodeMessage("COM0114","Sound Loc");
			sheetObj2.SelectCell(i, fix_grid02 +  "rcv_sound_loc_nm");
			return;
		}
		//--loc가 입력안된경우 체크
		/*if (qty_sum > 0 &&sheetObj2.GetCellValue(i, fix_grid02 +  "unload_inbound_loc_nm").trim() == "" )
		{
			ComShowCodeMessage("COM0114","Inbound Loc");
			sheetObj2.SelectCell(i, fix_grid02 +  "unload_inbound_loc_nm");
			return;
		}*/
		/* LKH:2015-10-28 부분입고를 위해 주석 처리 및 Ibsheet unload_inbound_loc_nm 필수 제거 처리 함
		if(rcv_sound_qty_num <= 0)
		{
			ComShowCodeMessage("COM271801");
			sheetObj2.SelectCell(i, fix_grid02 +  "rcv_sound_qty");
			return;
		}*/
	}
	if(ComShowCodeConfirm("COM0063") == false){
		return;
	}
	var tl_wo_document_info_header="Docin";
	var in_wh_cd=tl_wo_document_info_header+"in_wh_cd="+document.getElementsByName("in_wh_cd")[0].value;
	var in_wh_nm="&"+tl_wo_document_info_header+"in_wh_nm="+formObj.in_wh_cd.options[formObj.in_wh_cd.options.selectedIndex].text;
	var in_loc_dt="&"+tl_wo_document_info_header+"in_loc_dt="+document.getElementsByName("in_loc_dt")[0].value;
	var in_loc_hm="&"+tl_wo_document_info_header+"in_loc_hm="+document.getElementsByName("in_loc_hm")[0].value;
	var in_freetime_day="&"+tl_wo_document_info_header+"in_freetime_day=0";
	if(!ComIsEmpty(formObj.in_freetime_day.value)){
		in_freetime_day="&"+tl_wo_document_info_header+"in_freetime_day="+document.getElementsByName("in_freetime_day")[0].value;
	}
	var in_cust_ref_no="&"+tl_wo_document_info_header+"in_cust_ref_no="+document.getElementsByName("in_cust_ref_no")[0].value;
	var remark="&"+tl_wo_document_info_header+"remark="+document.getElementsByName("remark")[0].value;
	var in_sts_cd_val;
	if($("#checkClose").is(":checked") == true) //close(X)
	{
		in_sts_cd_val="X";
	}
	else //Partial (P)
	{
		in_sts_cd_val="P";
	}
	doShowProcess(true);
	setTimeout(function(){
	formObj.f_cmd.value = MODIFY;
	var sParam = FormQueryString(formObj, "");
	var in_sts_cd = "&in_sts_cd=" + in_sts_cd_val;
	var docinParamter = in_wh_cd + in_wh_nm + in_loc_dt + in_loc_hm+in_freetime_day + in_cust_ref_no + remark + in_sts_cd;
	var sheetDatas1 = sheetObj1.GetSaveString();
	var sheetDatas2 = sheetObj2.GetSaveString();
	var isheetSaveParamters = sParam +"&"+ docinParamter +"&"+ sheetDatas1 +"&"+ sheetDatas2;
//	var isheetSaveParamters = sParam +"&"+ docinParamter +"&"+ sheetDatas1 ;
 	var saveXml = sheet3.GetSaveData("./saveWHICMgmtInfoGS.clt", isheetSaveParamters);
 	var xmlDoc = $.parseXML(saveXml);
	var $xml = $(xmlDoc);
	
	if($xml.find("rtncd").text() == "N"){
		ComShowMessage($xml.find("message").text())
	}else if($xml.find("res").text() == "1"){
    	$("#wh_cd").val($("#def_wh_cd").val());
    	showCompleteProcess();
		btn_Search();
		var sel_wib_in_no = displayData_sheet(saveXml, "sel_wib_in_no");
		var sel_wib_bk_no = displayData_sheet(saveXml, "sel_wib_bk_no");
		if(sel_wib_in_no == "")
		{return;}
		var sel_wib_in_no_split=sel_wib_in_no.split(",");
		var sel_wib_bk_no_split=sel_wib_bk_no.split(",");
		
		if(sel_wib_in_no_split.length <= 1){
			var wib_in_no=sel_wib_in_no_split[0];
			var sUrl="./WHICUpdate.clt?search_no="+wib_in_no + "&search_tp=WIB_IN_NO";
			parent.mkNewFrame('Inbound Complete Update', sUrl);
		}else{
			var sUrl="./WHICList.clt?search_no="+sel_wib_in_no + "&search_tp=WIB_IN_NO";
			parent.mkNewFrame('Inbound Complete Search', sUrl);
		}
	}
	doHideProcess(false);
	},100);
	
}

function displayData_sheet(xml, key){
	var xmlDoc = $.parseXML(xml);
	var $xml = $(xmlDoc);
	
	var temp = $xml.find(key).text();
	return temp;
}

/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			//booking no, warehouse 둘중하나는 필수로 입력되어야함.
			if(ComIsEmpty(formObj.search_no) && ComIsEmpty(formObj.wh_cd))// && ComIsEmpty(formObj.ctrt_no))
			{
				ComShowCodeMessage("COM0114","Warehouse or Booking No");
				$("#wh_cd").focus();
				return false;
			}
			//bk_no가 없는경우 booking Date는 필수
			if(ComIsEmpty(formObj.search_no) 
			&& ComIsEmpty(formObj.fm_bk_date) && ComIsEmpty(formObj.to_bk_date))
			{
				ComShowCodeMessage("COM0114","Booking Date");
				$("#fm_bk_date").focus();
				return false;
			}
			if(!ComIsEmpty(formObj.fm_bk_date) && ComIsEmpty(formObj.to_bk_date)){
				formObj.to_bk_date.value=ComGetNowInfo();
			}
			/* 3개월 duration 주석
			if (!ComIsEmpty(formObj.fm_bk_date) && getDaysBetween2(formObj.fm_bk_date.value, formObj.to_bk_date.value)> 92) {
				ComShowCodeMessage("COM0141","3","(Booking Date)");
				formObj.fm_bk_date.focus();
				return false;
			}
			*/
			if (!ComIsEmpty(formObj.fm_bk_date) && !isDate(formObj.fm_bk_date)) {
				ComShowCodeMessage("COM0114","Booking Date");
				formObj.fm_bk_date.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.to_bk_date) && !isDate(formObj.to_bk_date)) {
				ComShowCodeMessage("COM0114","Booking Date");
				formObj.to_bk_date.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.fm_bk_date)&&ComIsEmpty(formObj.to_bk_date))||(ComIsEmpty(formObj.fm_bk_date)&&!ComIsEmpty(formObj.to_bk_date))) {
				ComShowCodeMessage("COM0122","Booking Date");
				formObj.fm_bk_date.focus();
				return false;
			}
			if (getDaysBetween(formObj.fm_bk_date, formObj.to_bk_date, 'MM-dd-yyyy')<0) {
				ComShowCodeMessage("COM0122","Booking Date");
				formObj.fm_bk_date.focus();
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
	var srcValue=ComGetEvent("value");
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "search_no":	
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
 * show, hide 버튼 클릭
 */
function btn_show(val){
	if(val == "O"){//show효과(master sheet보이게끔)
		//$("#btn_show_nm").hide();
		document.all.btn_show_nm.style.display="none";
		//$("#btn_hide_nm").show();
		document.all.btn_hide_nm.style.display="block";
		//$("#headLayer").show();
		document.all.headLayer.style.display="block";
		sheet2.SetSheetHeight(235);
		//$("#btn_down").show();
		document.all.btn_Down.style.display="inline";
		//$("#btn_up").show();
		document.all.btn_Up.style.display="inline";
	}else{ //hide효과(master sheet 안보이게끔)
		//$("#btn_show_nm").show();
		document.all.btn_show_nm.style.display="block";
		//$("#btn_hide_nm").hide();
		document.all.btn_hide_nm.style.display="none";
		//$("#headLayer").hide();
		document.all.headLayer.style.display="none";
		sheet2.SetSheetHeight(550);
		//$("#btn_down").hide();
		document.all.btn_Down.style.display="none";
		//$("#btn_up").hide();
		document.all.btn_Up.style.display="none";
	}
	//resizeSheet();
}
function htmlDecode(value){
	return (typeof value === 'undefined') ? '' : $('<div/>').html(value).text();
}
function loadComboOrderType(){
	var obj = document.getElementById("ord_tp_cd");
	var option =  document.createElement("option");
	
	option.text = "ALL";
	option.value = "ALL";
	
	obj.add(option);
	
	var ord_tp_cd_cd = ord_tp_cdCode.split('|');
	var ord_tp_cd_nm = ord_tp_cdText.split('|');
	
	for(var i = 0; i < ord_tp_cd_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(ord_tp_cd_nm[i]);
		option.value = htmlDecode(ord_tp_cd_cd[i]);
		
		obj.add(option);
	}
}
function loadComboWarehouse(){
	var obj = document.getElementById("wh_cd");
	var option =  document.createElement("option");
	
	option.text = '';
	option.value = '';
	obj.add(option);
	var warehouse_cd = warehouseCode.split('|');
	var warehouse_nm = warehouseText.split('|');
	
	for(var i = 0; i < warehouse_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(warehouse_nm[i]);
		option.value = htmlDecode(warehouse_cd[i]);
		
		obj.add(option);
	}
}
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(){
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
	var warehouse = formObj.in_wh_cd.value;
	for(var i = 0; i < arrwhcd_df.length; i ++){
		for(var j = 0; j < arrwhcd.length; j ++){
			if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("btn_save");
	}else{
		ComBtnEnable("btn_save");
	}
}
