/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvMoveMgmt.js
*@FileTitle  : Inventory Movement & Hold & Damage Managemet
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/15
=========================================================--*/

var sheetCnt=0;
var firCalFlag=false;
var fix_grid01="Grd01";
var selectCnt=0;
var comboObjects = new Array();
var docObjects = new Array();

//#3390-Check Authority WMS CODE
var isWmsAuthOk = false; 

//var comboCnt = 0; 
/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/*
 * load page
 */
function loadPage() {
	var formObj=document.form;
	//sheet
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//control
//	initControl();
	if($("#req_plan_no").val() != "")
	{ 
		//--inv move search list link
		$("#in_plan_no").val($("#req_plan_no").val());
		btn_Search();
	}
	else if($("#req_wave_no").val() != "")
	{
		//--wave link
		$("#move_dt").val(ComGetNowInfo());
		$("#wave_no").val($("#req_wave_no").val());
		$("#wh_cd").val($("#req_wave_wh_cd").val());
		$("#wh_nm").val($("#req_wave_wh_nm").val());
		$("#ctrt_no").val($("#req_wave_ctrt_no").val());
		$("#ctrt_nm").val($("#req_wave_ctrt_nm").val());
		$("#wh_cd_org").val($("#wh_cd").val());
		$("#wh_nm_org").val($("#wh_nm").val());
		$("#ctrt_no_org").val($("#ctrt_no").val());
		$("#ctrt_nm_org").val($("#ctrt_nm").val());
		commonModeChange("INIT");
		//wave에서 미할당난 제품만 미리 add
		searchWaveUnAllocatedList();
	}
	else
	{
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
	}
//	check_authority_wh();
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/*
 * wave화면에서 link로 넘어온경우(Inventory Replenishment)
 */
function searchWaveUnAllocatedList()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	formObj.f_cmd.value = SEARCH02;
	var sXml=sheetObj.GetSearchData("./searchInvMoveMgmtForWaveUnList.clt", FormQueryString(formObj, null, ""));
	sheetObj.LoadSearchData(sXml,{Sync:1} );
	//sheetObj.LoadSearchData(convertColOrder(sXml,{Sync:1} ));
}
/*
 * 각모드별 화면을 init셋팅
 */
function commonModeChange(mode)
{
	var formObj=document.form;
	switch(mode)
	{
		case "INIT":
			commonButtonChange(mode); //버튼
			headerInfoChange(true);
			$("#mode").val("NEW");
			break;
		case "NEW" :
			commonButtonChange(mode); //버튼
			headerInfoChange(true);
			sheet1.RemoveAll();
			formObj.reset();
			formObj.plan_sts_cd.value="";
			$("#mode").val(mode);
			$("#move_dt").val(ComGetNowInfo());
			$("#wh_cd").val($("#def_wh_cd").val());
			$("#wh_nm").val($("#def_wh_nm").val());
			$("#ctrt_no").val($("#def_wh_ctrt_no").val());
			$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
			$("#wh_cd_org").val($("#wh_cd").val());
			$("#wh_nm_org").val($("#wh_nm").val());
			$("#ctrt_no_org").val($("#ctrt_no").val());
			$("#ctrt_nm_org").val($("#ctrt_nm").val());
			doHideProcess();
			break;
		case "SEARCH_BEF":
			commonButtonChange(mode); //버튼
			headerInfoChange(false);
			sheet1.RemoveAll();
			var plan_no=$("#in_plan_no").val();
			formObj.reset();
			$("#in_plan_no").val(plan_no);
			$("#mode").val(mode);
			break;
		case "SEARCH_P": //plan상태
			commonButtonChange(mode); //버튼
			$("#mode").val("UPDATE");
			break;
		case "SEARCH_C": //complete상태
			commonButtonChange(mode); //버튼
			$("#mode").val("COMPLETE");
			ComEnableObject(formObj.move_dt, false);
			ComEnableObject(formObj.move_hm_fr, false);
			ComEnableObject(formObj.move_hm_to, false);
			ComEnableObject(formObj.supv_nm, false);
			ComEnableObject(formObj.work_nm, false);
			ComEnableObject(formObj.rmk, false);
			break;
	}
}
function headerInfoChange(flg)
{
	var formObj=document.form;
	if (flg == true)
		formObj.wh_cd.disabled = false;
	else formObj.wh_cd.disabled = true;
	ComEnableObject(formObj.ctrt_no, flg);
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
function commonButtonChange(mode)
{
	switch(mode)
	{
		case "INIT" :
			ComBtnEnable("btnSave");
			ComBtnEnable("btn_move");
			ComBtnDisable("btn_cancel");
			ComBtnDisable("btnPrint");
			ComBtnEnable("btn_add");
			ComBtnDisable("btn_del");
			ComBtnEnable("btn_wh_cd");
			ComBtnEnable("btn_ctrt_no");
			ComBtnEnable("btn_move_dt");
//			ComEnableButton("btnSave",		true,	1);
//			ComEnableButton("btn_move",		true,	1);
//			ComEnableButton("btn_cancel",	false,	1);
//			ComEnableButton("btnPrint",	false,	1);
//			ComEnableButton("btn_add",		true,	1);
//			ComEnableButton("btn_del",		false,	1);
//			ComEnableButton("btn_wh_cd",	true, 3);
//			ComEnableButton("btn_ctrt_no",	true, 3);
//			ComEnableButton("btn_move_dt",	true, 5);
			break;
		case "NEW" :
			ComBtnEnable("btnSave");
			ComBtnEnable("btn_move");
			ComBtnDisable("btn_cancel");
			ComBtnDisable("btnPrint");
			ComBtnEnable("btn_add");
			ComBtnDisable("btn_del");
			ComBtnEnable("btn_wh_cd");
			ComBtnEnable("btn_ctrt_no");
			ComBtnEnable("btn_move_dt");
			
//			ComEnableButton("btnSave",		true,	1);
//			ComEnableButton("btn_move",		true,	1);
//			ComEnableButton("btn_cancel",	false,	1);
//			ComEnableButton("btnPrint",	false,	1);
//			ComEnableButton("btn_add",		true,	1);
//			ComEnableButton("btn_del",		false,	1);
//			ComEnableButton("btn_wh_cd",	true, 3);
//			ComEnableButton("btn_ctrt_no",	true, 3);
//			ComEnableButton("btn_move_dt",	true, 5);
			break;
		case "SEARCH_BEF" :
			ComBtnDisable("btnSave");
			ComBtnDisable("btn_move");
			ComBtnDisable("btn_cancel");
			ComBtnDisable("btnPrint");
			ComBtnDisable("btn_add");
			ComBtnDisable("btn_del");
			ComBtnDisable("btn_wh_cd");
			ComBtnDisable("btn_ctrt_no");
			ComBtnEnable("btn_move_dt");
			
//			ComEnableButton("btnSave",		false,	1);
//			ComEnableButton("btn_move",		false,	1);
//			ComEnableButton("btn_cancel",	false,	1);
//			ComEnableButton("btnPrint",	false,	1);
//			ComEnableButton("btn_add",		false,	1);
//			ComEnableButton("btn_del",		false,	1);
//			ComEnableButton("btn_wh_cd",	false, 3);
//			ComEnableButton("btn_ctrt_no",	false, 3);
//			ComEnableButton("btn_move_dt",	true,  5);
		break;
		case "SEARCH_P" :
			ComBtnEnable("btnSave");
			ComBtnEnable("btn_move");
			ComBtnEnable("btn_cancel");
			ComBtnEnable("btnPrint");
			ComBtnEnable("btn_add");
			ComBtnEnable("btn_del");
			ComBtnDisable("btn_wh_cd");
			ComBtnDisable("btn_ctrt_no");
			ComBtnEnable("btn_move_dt");
			
//			ComEnableButton("btnSave",		true,	1);
//			ComEnableButton("btn_move",		true,	1);
//			ComEnableButton("btn_cancel",	true,	1);
//			ComEnableButton("btnPrint",	true,	1);
//			ComEnableButton("btn_add",		true,	1);
//			ComEnableButton("btn_del",		true,	1);
//			ComEnableButton("btn_wh_cd",	false, 3);
//			ComEnableButton("btn_ctrt_no",	false, 3);
//			ComEnableButton("btn_move_dt",	true,  5);
		break;
		case "SEARCH_C" :
			ComBtnDisable("btnSave");
			ComBtnDisable("btn_move");
			ComBtnDisable("btn_cancel");
			ComBtnDisable("btnPrint");
			ComBtnDisable("btn_add");
			ComBtnDisable("btn_del");
			ComBtnDisable("btn_wh_cd");
			ComBtnDisable("btn_ctrt_no");
			ComBtnDisable("btn_move_dt");
			
//			ComEnableButton("btnSave",		false,	1);
//			ComEnableButton("btn_move",		false,	1);
//			ComEnableButton("btn_cancel",	false,	1);
//			ComEnableButton("btnPrint",	false,	1);
//			ComEnableButton("btn_add",		false,	1);
//			ComEnableButton("btn_del",		false,	1);
//			ComEnableButton("btn_wh_cd",	false, 3);
//			ComEnableButton("btn_ctrt_no",	false, 3);
//			ComEnableButton("btn_move_dt",	false, 5);
		break;
	}
}
/*
 * init control
 */
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    //- key down
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/*
 * init sheet
 */
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet1":
	    with(sheetObj){
          var prefix=fix_grid01;
	
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
	      var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
		  var headers = [ { Text:getLabel('InvMoveMgmt_HDR1'), Align:"Center"},
	                      { Text:getLabel('InvMoveMgmt_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);
	
	      var cols = [ 
			{Type:"Text", 	   	Hidden:1, 	Width:100,     	Align:"Center",     ColMerge:1,     SaveName:prefix+"merge_key",     	KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"CheckBox", 	Hidden:0, 	Width:30,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"chk",     			KeyField:0,     Format:""},
			{Type:"Text",     	Hidden:0,  	Width:120,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"move_no",     		KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"Text",     	Hidden:0,   Width:100,    	Align:"Left",     	ColMerge:1,     SaveName:prefix+"item_cd",     		KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"Text",     	Hidden:0,   Width:180,    	Align:"Left",     	ColMerge:1,     SaveName:prefix+"item_nm",     		KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"Text",     	Hidden:0,   Width:130,    	Align:"Left",     	ColMerge:1,     SaveName:prefix+"lot_no",     		KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"Text",     	Hidden:0,   Width:140,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"lot_id",     		KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"Text",      Hidden:0, 	Width:80, 	Align:"Right",  	ColMerge:0,		SaveName:prefix+"item_ser_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
            {Type:"Text",      Hidden:0, 	Width:80, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"lic_plat_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			{Type:"Text",     	Hidden:0,   Width:70,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"fr_mv_tp_cd_nm",   KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"Text",     	Hidden:0,   Width:100,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"fr_wh_loc_cd_nm",  KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"Int",     	Hidden:0,   Width:70,    	Align:"Right",    	ColMerge:1,     SaveName:prefix+"fr_ea_qty",     	KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:"Integer",     PointCount:0},
			{Type:"Float",      Hidden:0,   Width:80,    	Align:"Right",    	ColMerge:1,     SaveName:prefix+"fr_cbm",     		KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:"Float",          PointCount:WMS_CBM_POINT_COUNT},
			{Type:"Float",      Hidden:0,   Width:80,    	Align:"Right",    	ColMerge:1,     SaveName:prefix+"fr_cbf",     		KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:"Float",          PointCount:WMS_CBM_POINT_COUNT},
			{Type:"Float",      Hidden:0,   Width:80,    	Align:"Right",    	ColMerge:1,     SaveName:prefix+"fr_grs_kgs",       KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:"Float",          PointCount:3},
			{Type:"Float",      Hidden:0,   Width:80,    	Align:"Right",    	ColMerge:1,     SaveName:prefix+"fr_grs_lbs",       KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:"Float",          PointCount:3},
			{Type:"Float",      Hidden:0,   Width:80,    	Align:"Right",    	ColMerge:1,     SaveName:prefix+"fr_net_kgs",       KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:"Float",          PointCount:3},
			{Type:"Float",      Hidden:0,   Width:80,    	Align:"Right",    	ColMerge:1,     SaveName:prefix+"fr_net_lbs",       KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:"Float",          PointCount:3},
			{Type:"Text",     	Hidden:0,   Width:70,    	Align:"Center",     ColMerge:0,     SaveName:prefix+"to_mv_tp_cd_nm",   KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"PopupEdit",  Hidden:0,   Width:100,    	Align:"Center",     ColMerge:0,     SaveName:prefix+"to_wh_loc_cd_nm",  KeyField:1,     Format:""},
			{Type:"Int",     	Hidden:0,   Width:70,    	Align:"Right",     	ColMerge:1,     SaveName:prefix+"to_ea_qty",     	KeyField:1,     Format:"Integer",     PointCount:0},
			{Type:"Float",      Hidden:0,   Width:80,    	Align:"Right",     	ColMerge:1,     SaveName:prefix+"to_cbm",     		KeyField:0,     Format:"Float",          PointCount:WMS_CBM_POINT_COUNT},
			{Type:"Float",      Hidden:0,   Width:80,    	Align:"Right",     	ColMerge:1,     SaveName:prefix+"to_cbf",     		KeyField:0,     Format:"Float",          PointCount:WMS_CBM_POINT_COUNT},
			{Type:"Float",      Hidden:0,   Width:80,    	Align:"Right",     	ColMerge:1,     SaveName:prefix+"to_grs_kgs",     	KeyField:0,     Format:"Float",          PointCount:3},
			{Type:"Float",      Hidden:0,   Width:80,    	Align:"Right",     	ColMerge:1,     SaveName:prefix+"to_grs_lbs",     	KeyField:0,     Format:"Float",          PointCount:3},
			{Type:"Float",      Hidden:0,   Width:80,    	Align:"Right",     	ColMerge:1,     SaveName:prefix+"to_net_kgs",     	KeyField:0,     Format:"Float",          PointCount:3},
			{Type:"Float",      Hidden:0,   Width:80,    	Align:"Right",     	ColMerge:1,     SaveName:prefix+"to_net_lbs",     	KeyField:0,     Format:"Float",          PointCount:3},
			{Type:"Image",      Hidden:0, 	Width:70,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"add_row_img",     	KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"Float",      Hidden:0,   Width:50,  		Align:"Center",     ColMerge:1,     SaveName:prefix+"add_row_cnt",     	KeyField:0,   	Format:"", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20},
			{Type:"Image",      Hidden:0, 	Width:70,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"del_row_img",     	KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"PopupEdit",  Hidden:0, 	Width:120,    	Align:"Left",     	ColMerge:1,     SaveName:prefix+"rmk",     			KeyField:0,     EditLen:1000,    Format:""},
			{Type:"Image",      Hidden:0, 	Width:70,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"attach_add_img",   KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"Image",      Hidden:0, 	Width:70,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"attach_del_img",   KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"Date",     	Hidden:0,  	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"inbound_dt",     	KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:"Ymd"},
			{Type:"Text",     	Hidden:0,  	Width:130,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"wib_bk_no",     	KeyField:0,     UpdateEdit:0,     InsertEdit:0,     Format:""},
			{Type:"Status",     Hidden:1,   Width:30,    	Align:"Center",     				SaveName:prefix+"ibflag"},
			{Type:"Text",       Hidden:1,   Width:130,    	Align:"Center",     				SaveName:prefix+"item_sys_no",		KeyField:0, 	Format:""},
			{Type:"Text",       Hidden:1,   Width:130,    	Align:"Center",     				SaveName:prefix+"po_sys_no",		KeyField:0,  	Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",     				SaveName:prefix+"fr_mv_tp_cd", 		KeyField:0,  	Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",     				SaveName:prefix+"fr_wh_loc_cd", 	KeyField:0,    	Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",     				SaveName:prefix+"fr_wh_loc_prop_cd",KeyField:0,     Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",     				SaveName:prefix+"to_mv_tp_cd",  	KeyField:0,   	Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",      				SaveName:prefix+"to_wh_loc_cd",		KeyField:0,     Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",      				SaveName:prefix+"to_wh_loc_prop_cd",KeyField:0,    	Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",      				SaveName:prefix+"wh_cd", 			KeyField:0,    	Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",      				SaveName:prefix+"ctrt_no", 			KeyField:0,    	Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",      				SaveName:prefix+"so_no", 			KeyField:0,    	Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",      				SaveName:prefix+"po_no", 			KeyField:0,    	Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",      				SaveName:prefix+"plan_no", 			KeyField:0,    	Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",      				SaveName:prefix+"plan_seq",			KeyField:0,     Format:""},
			{Type:"Text",       Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"file_seq", 		KeyField:0,    	Format:""},
			{Type:"Text",       Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"file_path",  		KeyField:0,   	Format:""},
			{Type:"Text",       Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"file_sys_nm", 		KeyField:0,    	Format:""},
			{Type:"Text",       Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"file_org_nm", 		KeyField:0,    	Format:""},
			{Type:"Text",       Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"file_size",  		KeyField:0,   	Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Center",      				SaveName:prefix+"attach_add", 		KeyField:0,    	Format:""},
			{Type:"Text",       Hidden:1,   Width:50,    	Align:"Center",      				SaveName:prefix+"attach_del",  		KeyField:0,   	Format:""},
			{Type:"Text",       Hidden:1,   Width:70,    	Align:"Right",      				SaveName:prefix+"stock_qty", 		KeyField:0,  	Format:"Integer",     PointCount:0},
			{Type:"Int",      	Hidden:1,   Width:70,    	Align:"Right",      				SaveName:prefix+"to_sum_ea_qty", 	KeyField:0, 	Format:"Integer",     PointCount:0},
			{Type:"Text",       Hidden:1,   Width:50,    	Align:"Center",      				SaveName:prefix+"edit_yn",  		KeyField:0,   	Format:""},
			{Type:"Text",       Hidden:1,   Width:50,    	Align:"Center",      				SaveName:prefix+"md",  				KeyField:0,   	Format:""},
			{Type:"Int",      	Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"pkg_lv1_qty",		KeyField:0,   	Format:"Integer",     	PointCount:0},
			{Type:"Float",      Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"lv1_cbm", 			KeyField:0, 	Format:"Float",          PointCount:WMS_CBM_POINT_COUNT},
			{Type:"Float",      Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"lv1_cbf",  		KeyField:0,  	Format:"Float",          PointCount:WMS_CBM_POINT_COUNT},
			{Type:"Float",      Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"lv1_grs_kgs", 		KeyField:0,   	Format:"Float",          PointCount:5},
			{Type:"Float",      Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"lv1_grs_lbs", 		KeyField:0,   	Format:"Float",          PointCount:5},
			{Type:"Float",      Hidden:1,   Width:70,    	Align:"Center",      				SaveName:prefix+"lv1_net_kgs", 		KeyField:0,   	Format:"Float",          PointCount:5},
			{Type:"Float",      Hidden:1,   Width:50,    	Align:"Center",      				SaveName:prefix+"lv1_net_lbs",  	KeyField:0,  	Format:"Float",          PointCount:5},
			{Type:"Float",      Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"stock_cbm", 		KeyField:0,   	Format:"Float",          PointCount:WMS_CBM_POINT_COUNT},
			{Type:"Float",      Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"stock_cbf", 		KeyField:0,   	Format:"Float",          PointCount:WMS_CBM_POINT_COUNT},
			{Type:"Float",      Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"stock_grs_kgs", 	KeyField:0,   	Format:"Float",          PointCount:3},
			{Type:"Float",      Hidden:1,   Width:0,    	Align:"Center",      				SaveName:prefix+"stock_grs_lbs", 	KeyField:0,   	Format:"Float",          PointCount:3},
			{Type:"Float",      Hidden:1,   Width:70,    	Align:"Center",      				SaveName:prefix+"stock_net_kgs", 	KeyField:0,   	Format:"Float",          PointCount:3},
			{Type:"Float",      Hidden:1,   Width:50,    	Align:"Center",      				SaveName:prefix+"stock_net_lbs", 	KeyField:0,   	Format:"Float",          PointCount:3}];

	      InitColumns(cols);
	      SetSheetHeight(400);
	      SetHeaderRowHeight(30);
	      SetAutoRowHeight(0);
	      resizeSheet();
	      SetEditable(1);
	      SetImageList(1,"web/img/main/btn_s_add.gif");
	      SetImageList(2,"web/img/main/btn_s_delete.gif");
	      SetImageList(3,"web/img/main/btn_s_download.gif");
	      SetUnicodeByte(3);
	      SetColProperty(0, prefix+"to_wh_loc_cd_nm", vtEngUpOther, "0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\");
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
	var sheetObj=sheet1;
	var cnt=0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
		//LOT ID 폰트색상 변경
		sheetObj.SetCellFontColor(i, fix_grid01 + "lot_id","#0100FF");
		
 		//BOOKING NO Underline 변경
 		sheetObj.SetCellFontUnderline(i, fix_grid01 + "wib_bk_no", 1);
 		//LOT ID Underline 변경
 		sheetObj.SetCellFontUnderline(i, fix_grid01 + "lot_id", 1);
		
		if(sheetObj.GetCellValue(i, fix_grid01 + "md").trim() == "MV")
		{
			cnt++;
			//상태에 따른 아이콘(row add, 파일첨부기능) 설정
			var plan_no=sheetObj.GetCellValue(i, fix_grid01 + "plan_no").trim();
			var move_no=sheetObj.GetCellValue(i, fix_grid01 + "move_no").trim();
			if($("#plan_sts_cd").val() != "C" && sheetObj.GetCellValue(i, fix_grid01 + "edit_yn") != "N")
			{
				//--row add, del 기능
				sheetObj.SetCellImage(i,  fix_grid01 + "add_row_img",1);
				sheetObj.SetCellValue(i, fix_grid01 + "add_row_cnt",1,0);
				if(plan_no == "") //plan_no가 없는건=화면에서 add한건.
				{
 					sheetObj.SetCellImage(i,  fix_grid01 + "del_row_img",2);
				}
			}
			else if($("#plan_sts_cd").val() != "C" && sheetObj.GetCellValue(i, fix_grid01 + "edit_yn") == "N")
			{
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_wh_loc_cd_nm",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_ea_qty",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_cbm",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_cbf",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_grs_kgs",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_grs_lbs",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_net_kgs",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_net_lbs",0);
			}
			//파일첨부기능
			else if($("#plan_sts_cd").val() == "C") 
			{
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_wh_loc_cd_nm",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_ea_qty",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_cbm",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_cbf",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_grs_kgs",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_grs_lbs",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_net_kgs",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "to_net_lbs",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "rmk",0);
				sheetObj.SetCellEditable(i,  fix_grid01 + "add_row_cnt",0);
				sheetObj.SetCellEditable(i , fix_grid01+"chk",0);
				if(move_no != "")
				{
					//attach_add, attach_del
					switch(sheetObj.GetCellValue(i, fix_grid01 + "attach_add"))
					{
						case "Add":
 							sheetObj.SetCellImage(i, fix_grid01 + "attach_add_img",1);
							break;
						case "Download":
 							sheetObj.SetCellImage(i, fix_grid01 + "attach_add_img",3);
							break;
					}
					switch(sheetObj.GetCellValue(i, fix_grid01 + "attach_del"))
					{
						case "Del":
 							sheetObj.SetCellImage(i, fix_grid01 + "attach_del_img",2);
							break;
					}
				}
			}
		}
		else //wave에서 온경우
		{
			//add한건은 체크불가능하도록
			sheetObj.SetCellEditable(i , fix_grid01+"chk",0);
 			sheetObj.SetCellImage(i,  fix_grid01 + "add_row_img",1);
			sheetObj.SetCellValue(i, fix_grid01 + "add_row_cnt",1,0);
 			sheetObj.SetCellImage(i,  fix_grid01 + "del_row_img",2);
			sheetObj.SetCellValue(i, fix_grid01 + "ibflag","I",0);
		}
	}
	$("#plan_cnt").val(cnt); //plan조회시 cnt (부분cancle시 전체cancel여부 체크를 위하여)
	
	mergeSheetSearchEnd(sheetObj, 2);
//	check_authority_wh(); // check warehouse authority
}
/*
 * sheet1 onchange event
 */
function sheet1_OnChange(sheetObj, row, col, Value) {
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == fix_grid01 + "to_ea_qty") {
		var qty=Value;
		//음수체크
		if(Value < 0) {
			qty=Math.abs(Value);
			sheetObj.SetCellValue(row, col,qty,0);
		}
		//CBM, KGS, LBS 계산
		var pkg_lv1_qty=eval(sheetObj.GetCellValue(row, fix_grid01 + "pkg_lv1_qty"));
		var lv1_cbm=eval(sheetObj.GetCellValue(row, fix_grid01 + "lv1_cbm"));
		var lv1_cbf=eval(sheetObj.GetCellValue(row, fix_grid01 + "lv1_cbf"));
		var lv1_grs_kgs=eval(sheetObj.GetCellValue(row, fix_grid01 + "lv1_grs_kgs"));
		var lv1_grs_lbs=eval(sheetObj.GetCellValue(row, fix_grid01 + "lv1_grs_lbs"));
		var lv1_net_kgs=eval(sheetObj.GetCellValue(row, fix_grid01 + "lv1_net_kgs"));
		var lv1_net_lbs=eval(sheetObj.GetCellValue(row, fix_grid01 + "lv1_net_lbs"));
		sheetObj.SetCellValue(row, fix_grid01 + "to_cbm",     (pkg_lv1_qty * qty) * lv1_cbm    , 0);
		sheetObj.SetCellValue(row, fix_grid01 + "to_cbf",     (pkg_lv1_qty * qty) * lv1_cbf    , 0);
		sheetObj.SetCellValue(row, fix_grid01 + "to_grs_kgs", (pkg_lv1_qty * qty) * lv1_grs_kgs, 0);
		sheetObj.SetCellValue(row, fix_grid01 + "to_grs_lbs", (pkg_lv1_qty * qty) * lv1_grs_lbs, 0);
		sheetObj.SetCellValue(row, fix_grid01 + "to_net_kgs", (pkg_lv1_qty * qty) * lv1_net_kgs, 0);
		sheetObj.SetCellValue(row, fix_grid01 + "to_net_lbs", (pkg_lv1_qty * qty) * lv1_net_lbs, 0);
	}
	else if (colStr == (fix_grid01+"to_cbf") && Value != "")
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("CBF_CBM", (fix_grid01+"to_cbf"), (fix_grid01+"to_cbm"), sheetObj);
		unitConvertGrid("CBF_CBM", (fix_grid01+"to_cbf"), (fix_grid01+"to_cbm"), sheetObj);
	}
	else if (colStr == (fix_grid01+"to_grs_lbs") && Value != "") 
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("LB_KG", (fix_grid01+"to_grs_lbs"), (fix_grid01+"to_grs_kgs"), sheetObj);
		unitConvertGrid("LB_KG", (fix_grid01+"to_grs_lbs"), (fix_grid01+"to_grs_kgs"), sheetObj);
	}
	else if (colStr == (fix_grid01+"to_net_lbs") && Value != "") 
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("LB_KG", (fix_grid01+"to_net_lbs"), (fix_grid01+"to_net_kgs"), sheetObj);
		unitConvertGrid("LB_KG", (fix_grid01+"to_net_lbs"), (fix_grid01+"to_net_kgs"), sheetObj);
	}
	else if (colStr == (fix_grid01+"to_wh_loc_cd_nm"))
	{
		if(Value != "")
		{
			var sParam="f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm=" + Value + "&f_move_flg=Y" + "&f_cmd=" + COMMAND01;
			/*$.ajax({
				url : "searchWarehouseLocInfoForName.do?"+sParam,
				success : function(result) {
					sheetObj.SetCellValue(row,  col,getXmlDataNullToNullString(result.xml,'wh_loc_nm'),0);
					sheetObj.SetCellValue(row,  fix_grid01+"to_wh_loc_cd",getXmlDataNullToNullString(result.xml,'wh_loc_cd'),0);
					sheetObj.SetCellValue(row,  fix_grid01+"to_wh_loc_prop_cd",getXmlDataNullToNullString(result.xml,'prop_cd'),0);//prop_cd
					var prop_cd=getXmlDataNullToNullString(result.xml,'prop_cd');
					var to_mv_tp_cd="";
					var to_mv_tp_cd_nm="";
					if (prop_cd == "DMG" || prop_cd == "HLD") //Damage, Hold일경우는는 팝업에서 넣어주는 코드값과 코드명으로 사용
					{
						to_mv_tp_cd=prop_cd;
						to_mv_tp_cd_nm=getXmlDataNullToNullString(result.xml,'prop_nm');
					}
					else if(prop_cd.length > 0)
					{
						to_mv_tp_cd="MV";
						to_mv_tp_cd_nm="Normal";
					}
					sheetObj.SetCellValue(row , fix_grid01+"to_mv_tp_cd",to_mv_tp_cd,0);//to location status
					sheetObj.SetCellValue(row , fix_grid01+"to_mv_tp_cd_nm",to_mv_tp_cd_nm,0);//to location status name
					if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
						alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
						sheetObj.SelectCell(row,  col);
					}
				}
			});*/
			
			var sXml=docObjects[0].GetSearchData("./searchWarehouseLocInfoForName.clt",sParam);		
			var xmlDoc = $.parseXML(sXml);
			var $xml = $(xmlDoc);
			sheetObj.SetCellValue(row,  col, $xml.find("wh_loc_nm").text(),0);
			sheetObj.SetCellValue(row,  fix_grid01+"to_wh_loc_cd",	$xml.find("wh_loc_cd").text(),0);
			sheetObj.SetCellValue(row,  fix_grid01+"to_wh_loc_prop_cd",	$xml.find("prop_cd").text() ,0);//prop_cd
			var prop_cd=$xml.find("prop_cd").text();
			var to_mv_tp_cd="";
			var to_mv_tp_cd_nm="";
			if (prop_cd == "DMG" || prop_cd == "HLD") //Damage, Hold일경우는는 팝업에서 넣어주는 코드값과 코드명으로 사용
			{
				to_mv_tp_cd=prop_cd;
				to_mv_tp_cd_nm= $xml.find("prop_nm").text();
			}
			else if(prop_cd.length > 0)
			{
				to_mv_tp_cd="MV";
				to_mv_tp_cd_nm="Normal";
			}
			sheetObj.SetCellValue(row , fix_grid01+"to_mv_tp_cd",to_mv_tp_cd,0);//to location status
			sheetObj.SetCellValue(row , fix_grid01+"to_mv_tp_cd_nm",to_mv_tp_cd_nm,0);//to location status name
//			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){			
//				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
//				sheetObj.SelectCell(row,  col);
//			}
			
		}
		else
		{
			sheetObj.SetCellValue(row , fix_grid01+"to_wh_loc_cd","",0);// wh_loc_cd
			sheetObj.SetCellValue(row , fix_grid01+"to_wh_loc_prop_cd","",0);//prop_cd
			sheetObj.SetCellValue(row , fix_grid01+"to_mv_tp_cd","",0);//to location status
			sheetObj.SetCellValue(row , fix_grid01+"to_mv_tp_cd_nm","",0);//to location status name
		}
	}
	else if(colStr == (fix_grid01+"chk"))
	{
		for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
			if(sheetObj.GetCellValue(row, fix_grid01 + "merge_key") == sheetObj.GetCellValue(i, fix_grid01 + "merge_key"))
			{
				sheetObj.SetCellValue(i, col,Value,0);
			}
		}
	}
}
/*
 * sheet1 dbclick event
 */
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	
	switch (colName)
	{
		case fix_grid01 + "wib_bk_no":
//			var sUrl="./WHInbkMgmt.clt?req_wib_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
//			parent.mkNewFrame('Inbound Management', sUrl, "WHInbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
			
			var sUrl="./WHInMgmt.clt?req_wib_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")
			+ "&req_wh_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")  
			+ "&req_ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no");
//			+ cancel_bk_param;
			parent.mkNewFrame('Inbound Management', sUrl,"WHInMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
			
			break;
		case fix_grid01 + "lot_id":
			var sUrl="./WHLotList.clt?wh_cd="     + $("#wh_cd").val()
								            + "&wh_nm="  + $("#wh_nm").val()
								            + "&ctrt_no="+ $("#ctrt_no").val()
								            + "&ctrt_nm="+ $("#ctrt_nm").val()
							            	+ "&lot_id=" + sheetObj.GetCellValue(Row , fix_grid01+"lot_id");
				parent.mkNewFrame('Lot Search', sUrl, "WHLotList_" + $("#wh_cd").val() + "_" + $("#wh_nm").val() + "_" + $("#ctrt_no").val() + "_" + $("#ctrt_nm").val() + "_" + sheetObj.GetCellValue(Row , fix_grid01+"lot_id"));
			break;
		
	}
}
/*
 * sheet1 popupclick event
 */
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	//var colValue = sheetObj.CellValue(Row, Col) ;
	with(sheetObj)
	{
		if (colName == fix_grid01 + "rmk")
		{
			ComShowMemoPad4(sheetObj, Row, Col, false, 200, 100,Col, Col);
		}		
		else if(colName == fix_grid01 + "to_wh_loc_cd_nm")
		{
			callBackFunc = "setLocationInfo";
			modal_center_open('./WarehouseLocPopup.clt?f_loc_cd='+ $("#wh_cd").val() + "&f_move_flg=Y", '', 700, 500,"yes");
		}
	}
}
/*
 * onclick
 */
function sheet1_OnClick(sheetObj, Row, Col) {
	var colName=sheetObj.ColSaveName(Col);
	switch (colName)
	{
		case fix_grid01 + "add_row_img":
			if(sheet1.GetCellImage(Row,fix_grid01 + "add_row_img")!="")
				addRow(sheetObj, Row, Col);
			break;
		case fix_grid01 + "del_row_img":
			if(sheet1.GetCellImage(Row,fix_grid01 + "del_row_img")!="")
				delRow(sheetObj, Row, Col);
			break;
		case fix_grid01 + "attach_add_img": //파일첨부, 다운로드
			if(sheet1.GetCellImage(Row,fix_grid01 + "attach_add_img")=="") return;
			var move_no=sheetObj.GetCellValue(Row, fix_grid01 + "move_no").trim();
			if($("#plan_sts_cd").val() == "C" && move_no != "") 
			{
				if(sheetObj.GetCellValue(Row, fix_grid01 + "file_seq") == "") //파일첨부
				{
					fileUpload(sheetObj, Row, Col);
				}
				else //다운로드
				{
					fileDownload(sheetObj, Row, Col);
				}
			}
			break;
		case fix_grid01 + "attach_del_img": //파일첨부삭제
			if(sheet1.GetCellImage(Row,fix_grid01 + "attach_del_img")=="") return;
			var move_no=sheetObj.GetCellValue(Row, fix_grid01 + "move_no").trim();
			if($("#plan_sts_cd").val() == "C" && move_no != "") 
			{
				if(sheetObj.GetCellValue(Row, fix_grid01 + "file_seq") != "") //파일다운로드
				{
					fileDelete(sheetObj, Row, Col);
				}
			}
			break;
		case fix_grid01 + "chk":
			if(sheetObj.GetCellValue(sheetObj.GetSelectRow(),"chk")==1)
			{
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),"chk",1);
			}
			else{
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),"chk",0);
			}
			break;
	}
}
/*
 * row add button on click
 */
function addRow(sheetObj, Row, Col)
{
	if($("#plan_sts_cd").val() == "C")
	{
		return;
	}
	var row_cnt=ComParseInt(sheetObj.GetCellValue(Row, fix_grid01 + "add_row_cnt"));
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
		sheetObj.SetCellValue(row, fix_grid01+"fr_cbm",sheetObj.GetCellValue(Row, fix_grid01+"fr_cbm"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_cbf",sheetObj.GetCellValue(Row, fix_grid01+"fr_cbf"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_grs_kgs",sheetObj.GetCellValue(Row, fix_grid01+"fr_grs_kgs"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_grs_lbs",sheetObj.GetCellValue(Row, fix_grid01+"fr_grs_lbs"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_net_kgs",sheetObj.GetCellValue(Row, fix_grid01+"fr_net_kgs"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_net_lbs",sheetObj.GetCellValue(Row, fix_grid01+"fr_net_lbs"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_wh_loc_cd_nm",sheetObj.GetCellValue(Row, fix_grid01+"fr_wh_loc_cd_nm"),0);
		sheetObj.SetCellValue(row, fix_grid01+"wib_bk_no",sheetObj.GetCellValue(Row, fix_grid01+"wib_bk_no"),0);
		sheetObj.SetCellValue(row, fix_grid01+"inbound_dt",sheetObj.GetCellValue(Row, fix_grid01+"inbound_dt"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_mv_tp_cd",sheetObj.GetCellValue(Row, fix_grid01+"fr_mv_tp_cd"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_mv_tp_cd_nm",sheetObj.GetCellValue(Row, fix_grid01+"fr_mv_tp_cd_nm"),0);
		sheetObj.SetCellValue(row, fix_grid01+"fr_wh_loc_prop_cd",sheetObj.GetCellValue(Row, fix_grid01+"fr_wh_loc_prop_cd"),0);
		sheetObj.SetCellValue(row, fix_grid01+"so_no",sheetObj.GetCellValue(Row, fix_grid01+"so_no"),0);
		sheetObj.SetCellValue(row, fix_grid01+"po_no",sheetObj.GetCellValue(Row, fix_grid01+"po_no"),0);
		//pack master info
		sheetObj.SetCellValue(row, fix_grid01+"pkg_lv1_qty",sheetObj.GetCellValue(Row, fix_grid01+"pkg_lv1_qty"),0);
		sheetObj.SetCellValue(row, fix_grid01+"lv1_cbm",sheetObj.GetCellValue(Row, fix_grid01+"lv1_cbm"),0);
		sheetObj.SetCellValue(row, fix_grid01+"lv1_cbf",sheetObj.GetCellValue(Row, fix_grid01+"lv1_cbf"),0);
		sheetObj.SetCellValue(row, fix_grid01+"lv1_grs_kgs",sheetObj.GetCellValue(Row, fix_grid01+"lv1_grs_kgs"),0);
		sheetObj.SetCellValue(row, fix_grid01+"lv1_grs_lbs",sheetObj.GetCellValue(Row, fix_grid01+"lv1_grs_lbs"),0);
		sheetObj.SetCellValue(row, fix_grid01+"lv1_net_kgs",sheetObj.GetCellValue(Row, fix_grid01+"lv1_net_kgs"),0);
		sheetObj.SetCellValue(row, fix_grid01+"lv1_net_lbs",sheetObj.GetCellValue(Row, fix_grid01+"lv1_net_lbs"),0);
		sheetObj.SetCellValue(row, fix_grid01+"stock_cbm",sheetObj.GetCellValue(Row, fix_grid01+"stock_cbm"),0);
		sheetObj.SetCellValue(row, fix_grid01+"stock_cbf",sheetObj.GetCellValue(Row, fix_grid01+"stock_cbf"),0);
		sheetObj.SetCellValue(row, fix_grid01+"stock_grs_kgs",sheetObj.GetCellValue(Row, fix_grid01+"stock_grs_kgs"),0);
		sheetObj.SetCellValue(row, fix_grid01+"stock_grs_lbs",sheetObj.GetCellValue(Row, fix_grid01+"stock_grs_lbs"),0);
		sheetObj.SetCellValue(row, fix_grid01+"stock_net_kgs",sheetObj.GetCellValue(Row, fix_grid01+"stock_net_kgs"),0);
		sheetObj.SetCellValue(row, fix_grid01+"stock_net_lbs",sheetObj.GetCellValue(Row, fix_grid01+"stock_net_lbs"),0);
		//row add, row cnt, row delet 버튼 셋팅
 		sheetObj.SetCellImage(row,  fix_grid01 + "add_row_img",1);
		sheetObj.SetCellValue(row, fix_grid01 + "add_row_cnt",1,0);
 		sheetObj.SetCellImage(row,  fix_grid01 + "del_row_img",2);
		//stock selection 팝업에서 add한건은 체크불가능하도록
 		var plan_no=sheetObj.GetCellValue(Row, fix_grid01+"plan_no").trim();
		if(plan_no == "")
		{
			sheetObj.SetCellEditable(row , fix_grid01+"chk",0);
		}
		//추가된row의 wib_bk_no 색상변경
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(row, fix_grid01 + "wib_bk_no","#0100FF");
 		//BOOKING NO Underline 변경
 		sheetObj.SetCellFontUnderline(row, fix_grid01 + "wib_bk_no", 1);
 		
 		var item, lotID, type, location, bookingNo, qty;
		item = sheetObj.GetCellValue(row, fix_grid01 + "item_sys_no");
		lotID = sheetObj.GetCellValue(row, fix_grid01 + "lot_id");
		type = sheetObj.GetCellValue(row, fix_grid01 + "fr_mv_tp_cd_nm");
		location = sheetObj.GetCellValue(row, fix_grid01 + "fr_wh_loc_cd_nm");
		bookingNo = sheetObj.GetCellValue(row, fix_grid01 + "wib_bk_no");
		qty = sheetObj.GetCellValue(row, fix_grid01 + "fr_ea_qty");
		var begin=0, end=0;
 		for(var j = 0; j <= sheet1.RowCount() + 1; j++){
 			var item_head, lotID_head, type_head, location_head, bookingNo_head, qty_head;
 			item_head = sheetObj.GetCellValue(j, fix_grid01 + "item_sys_no");
 			lotID_head = sheetObj.GetCellValue(j, fix_grid01 + "lot_id");
 			type_head = sheetObj.GetCellValue(j, fix_grid01 + "fr_mv_tp_cd_nm");
 			location_head = sheetObj.GetCellValue(j, fix_grid01 + "fr_wh_loc_cd_nm");
 			bookingNo_head = sheetObj.GetCellValue(j, fix_grid01 + "wib_bk_no");
 			qty_head = sheetObj.GetCellValue(j, fix_grid01 + "fr_ea_qty");
 			if(item_head == item && lotID == lotID_head && type == type_head && location == location_head && bookingNo == bookingNo_head && qty == qty_head ){
 				if (begin == 0) begin = j;
 				end = j;
 			}
 		}
 		if(begin > 0 && end > begin){
 			for(var k=1;k<=15;k++){
 	 			sheet1.SetMergeCell(begin, k, end - begin + 1, 1);
 	 		}
 		}
	}
}
/*
 * row delete button on click
 */
function delRow(sheetObj, Row, Col)
{
	if(ComShowCodeConfirm("COM0053")){
		if($("#plan_sts_cd").val() == "C")
		{
			return;
		}
		if(sheetObj.GetCellValue(Row,  fix_grid01 + "plan_no").trim() != "")
		{
			return;
		}
		//plan_no가 없는건 = 화면에서 add한건만 행삭제
		sheetObj.RowDelete(Row);
	}
}
/*
 * loc popupedit 완료후
 */
function setLocationInfo(aryPopupData){
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
	}else{
	aryPopupData = aryPopupData.split("|");
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"to_wh_loc_cd",aryPopupData[0],0);// wh_loc_cd
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"to_wh_loc_cd_nm",aryPopupData[1],0);// wh_loc_nm
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"to_wh_loc_prop_cd",aryPopupData[3],0);//prop_cd
	var prop_cd=aryPopupData[3];
	var to_mv_tp_cd="MV";
	var to_mv_tp_cd_nm="Normal";
	if (prop_cd == "DMG" || prop_cd == "HLD") //Damage, Hold일경우는는 팝업에서 넣어주는 코드값과 코드명으로 사용
	{
		to_mv_tp_cd=prop_cd;
		to_mv_tp_cd_nm=aryPopupData[4];
	}
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"to_mv_tp_cd",to_mv_tp_cd,0);//to location status
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"to_mv_tp_cd_nm",to_mv_tp_cd_nm,0);//to location status name
	}
}
/*
 * 파일다운로드
 */
function fileDownload(sheetObj, Row, Col){
	var formObj1=document.frm1;
	formObj1.file_path.value = sheetObj.GetCellValue(Row, fix_grid01 + "file_path") + sheetObj.GetCellValue(Row, fix_grid01 + "file_sys_nm");
	
	//#2399 [Binex Visibility] attached file cannot be download on inbound search on Chrome
	//formObj1.file_name.value = sheetObj.GetCellValue(Row, fix_grid01 + "file_org_nm");
	formObj1.file_name.value = "\"" + sheetObj.GetCellValue(Row, fix_grid01 + "file_org_nm") + "\"" ;
	
	formObj1.submit();
	showCompleteProcess();
}
/*
 * 파일업로드
 */
function fileUpload(sheetObj, Row, Col){
	var sUrl="InvMoveFileUploadPopup.clt?move_no="  + sheetObj.GetCellValue(Row, fix_grid01 + "move_no") + "&move_seq=" + sheetObj.GetCellValue(Row, fix_grid01 + "plan_seq");
	callBackFunc = "setFileInfoInfo";
	modal_center_open(sUrl, '', 700,130,"yes");
}
/*
 * 파일업로드 이후 --> SHEET 재조회
 */
function setFileInfoInfo(rtnData)
{
	if(rtnData == undefined || rtnData == "undefined" || rtnData == null ) return;
	
	if( rtnData == ""){
		ComShowCodeMessage("COM132617");
		return;
	}
	
	if(rtnData =='OK'){
		showCompleteProcess();
		btn_Search();
	}else{
		ComShowCodeMessage("COM132617");
	}
}
/*
 * 파일업로드 이후 --> SHEET 재조회
 * 파일삭제 이후 --> SHEET 재조회
 */
function reSearch()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	form.f_cmd.value = SEARCH01;
    sheetObj.DoSearch("./searchInvMoveMgmtGS2.clt", "in_plan_no=" + formObj.plan_no.value + "&f_cmd=" + form.f_cmd.value);
    //sheetObj.LoadSearchData(convertColOrder(sXml,{Sync:1} ));
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
 		ajaxSendPost(searchDiv, 'reqVal', '&goWhere=aj&bcKey=removeFileInvMoveFile&' + sParam, './GateServlet.gsl');
	}
}
function searchDiv(rtnData) {
	
	if(rtnData == undefined || rtnData == "undefined" || rtnData == ""){
		ComShowCodeMessage("COM132618");
		return;
	}
	
	var doc=getAjaxMsgXML(rtnData);
	var formObj=document.form;
	
	if(doc[0]=='OK'){
		showCompleteProcess();
		btn_Search();
	}else{
		ComShowCodeMessage("COM132618");
	}
}
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		//#3390-Check Authority WMS CODE
		if(srcName == "SAVE" || srcName == "btn_cancel" || srcName == "btn_move"){
			ComChecWmsCd_Authority(formObj.wh_cd.value);
			if (isWmsAuthOk == false) { 
				//alert('Not authenticated.\r\nYou are not authorized to access Warehouse'); 
				ComShowCodeMessage("COM0785");
				return
			}  
		}
		
		switch(srcName) {
			case "btn_move_dt":
//				if (ComDisableTdButton("btn_move_dt", 2)) {
//					return;
//				}
				var cal=new ComCalendar();
	            cal.select(formObj.move_dt, 'MM-dd-yyyy');
				break;
 			case "btn_ctrt_no" :
// 				if (ComDisableTdButton("btn_ctrt_no", 2)) {
//					return;
//				}
 				CtrtPopup();
				break;
 			case "SEARCHLIST":
 				sheet1.RemoveAll();
 				btn_Search();
 				break;
 			case "SAVE":
 				btn_Save();
 				break;
 			case "btn_cancel":
 				btn_Cancel();
 				break;
 			case "btn_move":
 				btn_Move();
 				break;
 			case "PRINT":
 				btn_Print();
 				break;
 			case "NEW":
 				btn_New();
 				break;
 			case "btn_add":
 				btn_Add();
 				break;
 			case "btn_del":
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
//	if (ComDisableTdButton("btn_ctrt_no", 2)) {
//		return;
//	}
	if(sheet1.RowCount()> 0)
	{
		//confirm
		if(ComShowCodeConfirm("COM0353", "Contract No") == false)
		{
			$("#ctrt_nm").val($("#ctrt_nm_org").val());
			return;
		}
	}
	//SHEET 초기화
	sheet1.RemoveAll();
	var formObj=document.form;
	callBackFunc = "setCtrtNoInfo";
	modal_center_open('./ContractRoutePopup.clt?ctrt_no='+formObj.ctrt_no.value+'&ctrt_nm='+formObj.ctrt_nm.value, '', 900, 580,"yes");
}
/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
	}else{
		var rtVal = aryPopupData.split("|")
		formObj.ctrt_no.value =        rtVal[0];
		formObj.ctrt_nm.value =         rtVal[1];	
		formObj.ctrt_no_org.value =    rtVal[0];
		formObj.ctrt_nm_org.value =    rtVal[1];
	}
}
/*
 * 팝업 관련 로직 끝
 */
/*
 * 조회
 */
var InputName="plan_no|plan_sts_cd_nm|plan_sts_cd|plan_dt|wh_cd|wh_nm|ctrt_no|ctrt_nm|move_dt|move_hm_fr|move_hm_to|supv_nm|work_nm|rmk";
function btn_Search()
{
	var formObj=document.form;
//	doShowProcess(true);
//	 setTimeout(function(){
		var sheetObj=docObjects[0];
		//validation check
		if (validateForm(formObj, 'search') == false) 
		{
			return;	
		}
		commonModeChange("SEARCH_BEF");
		formObj.f_cmd.value = SEARCH;
	    var sXml=sheetObj.GetSearchData("./searchInvMoveMgmtGS1.clt", FormQueryString(formObj, null, ""));
	    var xmlDoc = $.parseXML(sXml);
		var $xml = $(xmlDoc);
	    if($xml.find("flag").text() == "F"){
			ComShowCodeMessage("COM0266", "Plan No");
			formObj.in_plan_no.focus();
			return;
		}else{
			formObj.plan_no.value = $xml.find("plan_no").text(); 
			formObj.plan_sts_cd_nm.value = $xml.find("plan_sts_cd_nm").text(); 
			formObj.plan_sts_cd.value = $xml.find("plan_sts_cd").text(); 
			formObj.plan_dt.value = $xml.find("plan_dt").text(); 
			formObj.wh_cd.value = $xml.find("wh_cd").text(); 
//			formObj.wh_nm.value = $xml.find("wh_nm").text(); 
			formObj.ctrt_no.value = $xml.find("ctrt_no").text(); 
			formObj.ctrt_nm.value = $xml.find("ctrt_nm").text(); 
			formObj.move_dt.value = $xml.find("move_dt").text(); 
			formObj.move_hm_fr.value = $xml.find("move_hm_fr").text(); 
			formObj.move_hm_to.value = $xml.find("move_hm_to").text(); 
			formObj.supv_nm.value = $xml.find("supv_nm").text(); 
			formObj.work_nm.value = $xml.find("work_nm").text(); 
			formObj.rmk.value = $xml.find("rmk").text(); 
			if(formObj.plan_sts_cd.value == "P")
			{
				commonModeChange("SEARCH_P");
			}
			else
			{
				commonModeChange("SEARCH_C");
			}
			formObj.f_cmd.value = SEARCH01;
			sheetObj.DoSearch("./searchInvMoveMgmtGS2.clt", FormQueryString(formObj, null, ""));
			
			}
//	 },100);
//	 doShowProcess(false);
}
/*
 * PLAN 저장
 */
function btn_Save()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	//validation check
	if (validateForm(formObj, 'save') == false) 
	{
		return;
	}
	//confirm     
	if(!ComShowCodeConfirm("COM0063"))
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
	formObj.f_cmd.value = MODIFY;
	var f_cmd="&"+tl_wo_document_info_header+"f_cmd="			+$("#f_cmd").val();
	
	var docinParamter=mode+plan_no+wh_cd+ctrt_no+move_dt+move_hm_fr+move_hm_to+supv_nm+work_nm+rmk+f_cmd;
	var sheetDatas=sheetObj.GetSaveString(true); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
 	var saveXml=sheetObj.GetSaveData("./saveInvMoveMgmtForPlan.clt", docinParamter+"&"+sheetDatas);
 	var xmlDoc = $.parseXML(saveXml);
	var $xml = $(xmlDoc);
    if($xml.find("res").text() == "1"){
//		ComShowCodeMessage("COM0093");//저장이완료되었습니다.
    	
    	//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		
		var plan_no=$xml.find("plan_no").text();
		$("#in_plan_no").val(plan_no);
		btn_Search();
	}
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
	
	doShowProcess();
	var currLocUrl=this.location.href;
	var hasPlNo = currLocUrl.indexOf("plan_no");
	
	if(hasPlNo > 0){
		currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
		currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
	
		//parent.mkNewFrame(formObj.screen_title.value, currLocUrl);
		window.location.href = currLocUrl;
	}else{
		commonModeChange("NEW");
	}
		
}
/*
 * Add Button
 */
function btn_Add()
{
	var formObj=document.form;
	//validation check
	if (validateForm(formObj, 'add') == false) 
	{
		return;
	}
	//STOCK SELECTION 팝업
	var sParam="ctrt_no=" + formObj.ctrt_no.value;
	sParam += "&ctrt_nm=" + formObj.ctrt_nm.value;
	sParam += "&wh_cd=" + formObj.wh_cd.value;
	sParam += "&wh_nm=" + formObj.wh_cd.options[formObj.wh_cd.options.selectedIndex].text;		
	sParam += "&owner_cd=" + "";
	sParam += "&owner_nm=" + "";
	sParam += "&call_tp=M";	
	sParam += "&f_move_flg=Y"; //가능재고 체크를 위하여
	callBackFunc = "setStockInfo";
	modal_center_open('./WHOutStockSelectPopup.clt?'+sParam, '', 1280, 630,"yes");
}
function setStockInfo(aryPopupData)
{
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		return;
	}else{
		for(var k=0; k < aryPopupData.length; k++){
		var item_sys_no=aryPopupData[k]["item_sys_no"];
		var wib_bk_no=aryPopupData[k]["wib_bk_no"];
		var po_sys_no=aryPopupData[k]["po_sys_no"];
		var lot_id=aryPopupData[k]["fix_lot_id"];
		var fr_wh_loc_cd=aryPopupData[k]["wh_loc_cd"];
		var lic_plat_no=aryPopupData[k]["lic_plat_no"];
		var item_ser_no=aryPopupData[k]["item_ser_no"];
		var po_no=aryPopupData[k]["po_no"];
		var key=item_sys_no.trim() + "|" + wib_bk_no.trim() + "|" + po_sys_no.trim() + "|" + lot_id + "|" + fr_wh_loc_cd + "|" + lic_plat_no + "|" + item_ser_no + "|" + po_no;
		//sheet중복건 체크
		var cnt=0;
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			if(key == sheetObj.GetCellValue(i, fix_grid01 + "item_sys_no") + "|"
			+sheetObj.GetCellValue(i, fix_grid01 + "wib_bk_no") + "|"
			+sheetObj.GetCellValue(i, fix_grid01 + "po_sys_no") + "|"
			+sheetObj.GetCellValue(i, fix_grid01 + "lot_id") + "|"
			+sheetObj.GetCellValue(i, fix_grid01 + "fr_wh_loc_cd") + "|"
			+sheetObj.GetCellValue(i, fix_grid01 + "lic_plat_no") + "|"
			+sheetObj.GetCellValue(i, fix_grid01 + "item_ser_no") + "|"
			+sheetObj.GetCellValue(i, fix_grid01 + "po_no"))
			{
				cnt ++;
				break;
			}
		}
		if(cnt == 0) //기존시트에 중복건이 없을경우
		{
			//add
			var insertRow=sheetObj.DataInsert(-1);
			sheetObj.SetCellValue(insertRow, fix_grid01+"merge_key",key,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"wh_cd",$("#wh_cd").val(),0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"ctrt_no",$("#ctrt_no").val(),0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"item_sys_no",item_sys_no,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"po_sys_no",po_sys_no,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"lot_id",lot_id,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"move_no"," ",0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"item_cd",aryPopupData[k]["item_cd"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"item_nm",aryPopupData[k]["item_nm"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"fr_wh_loc_cd",fr_wh_loc_cd,0);
			var lot_no=aryPopupData[k]["lot_id"];
			if(lot_no == "")
			{
				lot_no=" ";
			}
			sheetObj.SetCellValue(insertRow, fix_grid01+"lot_no",lot_no,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"fr_ea_qty",aryPopupData[k]["stock_qty"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"stock_qty",aryPopupData[k]["stock_qty"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"fr_cbm",aryPopupData[k]["stock_cbm"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"fr_cbf",aryPopupData[k]["stock_cbf"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"fr_grs_kgs",aryPopupData[k]["stock_grs_kgs"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"fr_grs_lbs",aryPopupData[k]["stock_grs_lbs"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"fr_net_kgs",aryPopupData[k]["stock_net_kgs"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"fr_net_lbs",aryPopupData[k]["stock_net_lbs"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"fr_wh_loc_cd_nm",aryPopupData[k]["wh_loc_cd_nm"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"wib_bk_no",wib_bk_no,0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"inbound_dt",aryPopupData[k]["inbound_dt"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"so_no",aryPopupData[k]["so_no"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"po_no",aryPopupData[k]["po_no"],0);
			//pack master info
			sheetObj.SetCellValue(insertRow, fix_grid01+"pkg_lv1_qty",aryPopupData[k]["pkg_lv1_qty"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"lv1_cbm",aryPopupData[k]["lv1_cbm"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"lv1_cbf",aryPopupData[k]["lv1_cbf"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"lv1_grs_kgs",aryPopupData[k]["lv1_grs_kgs"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"lv1_grs_lbs",aryPopupData[k]["lv1_grs_lbs"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"lv1_net_kgs",aryPopupData[k]["lv1_net_kgs"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"lv1_net_lbs",aryPopupData[k]["lv1_net_lbs"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"stock_cbm",aryPopupData[k]["stock_cbm"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"stock_cbf",aryPopupData[k]["stock_cbf"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"stock_grs_kgs",aryPopupData[k]["stock_grs_kgs"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"stock_grs_lbs",aryPopupData[k]["stock_grs_lbs"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"stock_net_kgs",aryPopupData[k]["stock_net_kgs"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"stock_net_lbs",aryPopupData[k]["stock_net_lbs"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"lic_plat_no",aryPopupData[k]["lic_plat_no"],0);
			sheetObj.SetCellValue(insertRow, fix_grid01+"item_ser_no",aryPopupData[k]["item_ser_no"],0);
			//row add, row cnt, row delet 버튼 셋팅
 			sheetObj.SetCellImage(insertRow,  fix_grid01 + "add_row_img",1);
			sheetObj.SetCellValue(insertRow, fix_grid01 + "add_row_cnt",1,0);
 			sheetObj.SetCellImage(insertRow,  fix_grid01 + "del_row_img",2);
			//from 정보 셋팅
			var prop_cd=aryPopupData[k]["prop_cd"];
			var fr_mv_tp_cd="MV";
			var fr_mv_tp_cd_nm="Normal";
			if (prop_cd == "DMG" || prop_cd == "HLD") //Damage, Hold일경우는는 팝업에서 넣어주는 코드값과 코드명으로 사용
			{
				fr_mv_tp_cd=prop_cd;
				fr_mv_tp_cd_nm=aryPopupData[k]["prop_nm"];
			}
			sheetObj.SetCellValue(insertRow , fix_grid01+"fr_mv_tp_cd",fr_mv_tp_cd,0);
			sheetObj.SetCellValue(insertRow , fix_grid01+"fr_mv_tp_cd_nm",fr_mv_tp_cd_nm,0);
			sheetObj.SetCellValue(insertRow , fix_grid01+"fr_wh_loc_prop_cd",prop_cd,0);
			//add한건은 체크불가능하도록
			sheetObj.SetCellEditable(insertRow , fix_grid01+"chk",0);
			//추가된row의 wib_bk_no, lot_id 색상변경
			//BOOKING NO 폰트색상 변경
 			sheetObj.SetCellFontColor(insertRow, fix_grid01 + "wib_bk_no","#0100FF");
			//LOT ID 폰트색상 변경
 			sheetObj.SetCellFontColor(insertRow, fix_grid01 + "lot_id","#0100FF");
 			
 	 		//BOOKING NO Underline 변경
 	 		sheetObj.SetCellFontUnderline(insertRow, fix_grid01 + "wib_bk_no", 1);
 	 		//LOT ID Underline 변경
 	 		sheetObj.SetCellFontUnderline(insertRow, fix_grid01 + "lot_id", 1);
			}
		}
	}
}
/*
 * Plan 전체캔슬
 */

var fromDeltoCancel = "";

function btn_Cancel()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	//validation check
	if (validateForm(formObj, 'cancel') == false) 
	{
		return;
	}
	
	// Khanh changed 2015-08-13
	if(fromDeltoCancel == "Del"){
		fromDeltoCancel = "";
		if (ComShowCodeConfirm("COM0053") == false) 
		{
			return;
		}
	}else{
		if(ComShowCodeConfirm("COM0350") == false)
		{
			return;
		}
	}
	// End
	
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
/*
 * 체크된 plan건 부분캔슬
 */
function btn_Del()
{
	var sheetObj=sheet1;
	//체크건수 체크
	var iChkCnt=sheetObj.CheckedRows(fix_grid01+"chk");
	if(iChkCnt == 0) 
	{
		ComShowCodeMessage("COM0228");
		return;
	}
	//체크건이 전체건일경우 체크
	var iPlanCnt=0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		var plan_no=sheetObj.GetCellValue(i, fix_grid01+"plan_no").trim();
		var chk=sheetObj.GetCellValue(i, fix_grid01+"chk");
		if(chk == 1 && plan_no.length > 0)
		{
			iPlanCnt++;
		}
	}
	//alert(iPlanCnt);
	//전체체크시 전체cancel로직
	var cnt=eval($("#plan_cnt").val());
	if(iPlanCnt == cnt)
	{
		fromDeltoCancel = "Del";
		btn_Cancel();
		return;
	}
	//부분캔슬
	//confirm
	if(ComShowCodeConfirm("COM0053") == false)
	{
		return;
	}
	var sheetDatas=sheetObj.GetSaveString(true);
	form.f_cmd.value = MODIFY01;
	var f_cmd="f_cmd="			+$("#f_cmd").val();
	var isheetSaveParamters = sheetDatas;
 	var saveXml=sheetObj.GetSaveData("./cancelInvMoveMgmtPartial.clt", f_cmd+"&"+isheetSaveParamters);
 	var xmlDoc = $.parseXML(saveXml);
	var $xml = $(xmlDoc);
    if($xml.find("res").text() == "1"){
    	showCompleteProcess();
		ComShowCodeMessage("COM0080", "");
		reSearch();
	}
}
/*
 * 프린트
 */
function btn_Print()
{
	var formObj=document.form;
	var fileName = "";
    var param= "";
    
    formObj.title.value="E-SOP Doc Download";
    fileName += 'WH_INV_MOVE_WORK.mrd';
      param += "[" + $("#plan_no").val() + "]"; //파라메타 입력
      formObj.file_name.value= fileName;
    formObj.rd_param.value=param;
    popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
    btn_Search();
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) 
		{
			case 'search':
				if(ComIsEmpty(formObj.in_plan_no))
				{
					ComShowCodeMessage("COM0114","Plan No");
					$("#in_plan_no").focus();
					return false;
				}
				break;
			case 'add':
				//warehouse 필수로 입력되어야함.
				if(ComIsEmpty(formObj.wh_cd))
				{
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				//contract no 필수로 입력되어야함.
				if(ComIsEmpty(formObj.ctrt_no))
				{
					ComShowCodeMessage("COM0114","Contract No");
					$("#ctrt_no").focus();
					return false;
				}	
			break;
			case 'save':
				//warehouse 필수로 입력되어야함.
				if(ComIsEmpty(formObj.wh_cd))
				{
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				//contract no 필수로 입력되어야함.
				if(ComIsEmpty(formObj.ctrt_no))
				{
					ComShowCodeMessage("COM0114","Contract No");
					$("#ctrt_no").focus();
					return false;
				}
				//MOVE DATE 필수로 입력되어야함.
				if(ComIsEmpty(formObj.move_dt))
				{
					ComShowCodeMessage("COM0114","Movement Date");
					$("#move_dt").focus();
					return false;
				}
				var sheetObj=sheet1;
				if(saveSheetCommon(sheetObj, sAction) == false)
				{
					return false;
				}
				break;
			case 'move':
				//MOVE DATE 필수로 입력되어야함.
				if(ComIsEmpty(formObj.move_dt))
				{
					ComShowCodeMessage("COM0114","Movement Date");
					$("#move_dt").focus();
					return false;
				}
				var sheetObj=sheet1;
				if(saveSheetCommon(sheetObj, sAction) == false)
				{
					return false;
				}
				break;
			case 'cancel':
				break;
			case 'del':
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
	//★
	var fr_curr_cbm=0;
	var fr_curr_cbf=0;
	var fr_curr_grs_kgs=0;
	var fr_curr_grs_lbs=0;
	var fr_curr_net_kgs=0;
	var fr_curr_net_lbs=0;
	var to_curr_cbm=0;
	var to_curr_cbf=0;
	var to_curr_grs_kgs=0;
	var to_curr_grs_lbs=0;
	var to_curr_net_kgs=0;
	var to_curr_net_lbs=0;
	//★
	var wh_loc_cd_arr=new Array();
	var stock_curr_cnt=0;
	//★
	var stock_curr_cbm=0;
	var stock_curr_cbf=0;
	var stock_curr_grs_kgs=0;
	var stock_curr_grs_lbs=0;
	var stock_curr_net_kgs=0;
	var stock_curr_net_lbs=0;
	//★
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
		ComShowCodeMessage("COM03231");
		return false;
	}
	var edit_yn_no_n_cnt=0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, fix_grid01 + "edit_yn") != "N")
		{
			edit_yn_no_n_cnt ++;
			var to_eq_qty=eval(sheetObj.GetCellValue(i, fix_grid01 + "to_ea_qty"));
						//★
			var to_cbm=eval(sheetObj.GetCellValue(i, fix_grid01 + "to_cbm"));
			var to_cbf=eval(sheetObj.GetCellValue(i, fix_grid01 + "to_cbf"));
			var to_grs_kgs=eval(sheetObj.GetCellValue(i, fix_grid01 + "to_grs_kgs"));
			var to_grs_lbs=eval(sheetObj.GetCellValue(i, fix_grid01 + "to_grs_lbs"));
			var to_net_kgs=eval(sheetObj.GetCellValue(i, fix_grid01 + "to_net_kgs"));
			var to_net_lbs=eval(sheetObj.GetCellValue(i, fix_grid01 + "to_net_lbs"));
						//★
			var to_wh_loc_cd=sheetObj.GetCellValue(i, fix_grid01 + "to_wh_loc_cd").trim();
			var ibflag=sheetObj.GetCellValue(i, fix_grid01 + "ibflag");
			if(ibflag == "I") //신규건인경우 수량이 0이상인경우에만 to_wh_loc_cd여부 확인하면 된다.
			{
				//-----1. to loc cd 체크(수량이 0보다 큰경우 to_wh_loc_cd체크)
				if(to_wh_loc_cd == "")
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
			//★
			to_curr_cbm=to_curr_cbm + to_cbm;
			to_curr_cbf=to_curr_cbf + to_cbf;
			to_curr_grs_kgs=to_curr_grs_kgs + to_grs_kgs;
			to_curr_grs_lbs=to_curr_grs_lbs + to_grs_lbs;
			to_curr_net_kgs=to_curr_net_kgs + to_net_kgs;
			to_curr_net_lbs=to_curr_net_lbs + to_net_lbs;
			//★
			var div="";
			if(i + 1 > sheetObj.LastRow()) //마지막
			{
				fr_curr_cnt=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_ea_qty"));
								//★
				fr_curr_cbm=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_cbm"));
				fr_curr_cbf=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_cbf"));
				fr_curr_grs_kgs=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_grs_kgs"));
				fr_curr_grs_lbs=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_grs_lbs"));
				fr_curr_net_kgs=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_net_kgs"));
				fr_curr_net_lbs=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_net_lbs"));
								//★
				stock_curr_cnt=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_qty"));
								//★
				stock_curr_cbm=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_cbm"));
				stock_curr_cbf=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_cbf"));
				stock_curr_grs_kgs=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_grs_kgs"));
				stock_curr_grs_lbs=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_grs_lbs"));
				stock_curr_net_kgs=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_net_kgs"));
				stock_curr_net_lbs=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_net_lbs"));
				//★
				div="E";
			}
			else
			{
				if(sheetObj.GetCellValue(i, fix_grid01 + "merge_key").trim() != sheetObj.GetCellValue(i + 1, fix_grid01 + "merge_key").trim())
				{
					fr_curr_cnt=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_ea_qty"));
										//★
					fr_curr_cbm=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_cbm"));
					fr_curr_cbf=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_cbf"));
					fr_curr_grs_kgs=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_grs_kgs"));
					fr_curr_grs_lbs=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_grs_lbs"));
					fr_curr_net_kgs=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_net_kgs"));
					fr_curr_net_lbs=eval(sheetObj.GetCellValue(i, fix_grid01 + "fr_net_lbs"));
										//★
					stock_curr_cnt=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_qty"));
										//★
					stock_curr_cbm=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_cbm"));
					stock_curr_cbf=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_cbf"));
					stock_curr_grs_kgs=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_grs_kgs"));
					stock_curr_grs_lbs=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_grs_lbs"));
					stock_curr_net_kgs=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_net_kgs"));
					stock_curr_net_lbs=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_net_lbs"));
					//★
					div="E";
				}
			}
			if(div == "E")
			{
				//--수량체크
				if(fr_curr_cnt > stock_curr_cnt)
				{
					if(stock_curr_cnt < to_curr_cnt) //PLAN된건의 재고가 변경되었습니다. 현재고를 초과할수없습니다.
					{
						ComShowCodeMessage("COM0349", stock_curr_cnt, to_curr_cnt);
						sheetObj.SelectCell(i, fix_grid01 +  "to_ea_qty");
						return false;
					}
				}
				else
				{
					if(fr_curr_cnt < to_curr_cnt)//재고조정시 To Location의 qty가 Current Location qty를 초과할수없습니다.
					{
						ComShowCodeMessage("COM0348",fr_curr_cnt, to_curr_cnt);
						sheetObj.SelectCell(i, fix_grid01 +  "to_ea_qty");
						return false;
					}
				}			
				//★
				//--measure정보 체크
				if(checkMeasureInfo(sheetObj, "CBM", i, "to_cbm", fr_curr_cbm, stock_curr_cbm, to_curr_cbm) == false)
				{
					return false;
				}
				if(checkMeasureInfo(sheetObj, "CBF", i, "to_cbf", fr_curr_cbf, stock_curr_cbf, to_curr_cbf) == false)
				{
					return false;
				}
				if(checkMeasureInfo(sheetObj, "G.KGS", i, "to_grs_kgs", fr_curr_grs_kgs, stock_curr_grs_kgs, to_curr_grs_kgs) == false)
				{
					return false;
				}
				if(checkMeasureInfo(sheetObj, "G.LBS", i, "to_grs_lbs", fr_curr_grs_lbs, stock_curr_grs_lbs, to_curr_grs_lbs) == false)
				{
					return false;
				}
				if(checkMeasureInfo(sheetObj, "N.KGS", i, "to_net_kgs", fr_curr_net_kgs, stock_curr_net_kgs, to_curr_net_kgs) == false)
				{
					return false;
				}
				if(checkMeasureInfo(sheetObj, "N.LGS", i, "to_net_lbs", fr_curr_net_lbs, stock_curr_net_lbs, to_curr_net_lbs) == false)
				{
					return false;
				}
				//--초기화
				to_curr_cnt=0; 
				//★
				to_curr_cbm=0;
				to_curr_cbf=0;
				to_curr_grs_kgs=0;
				to_curr_grs_lbs=0;
				to_curr_net_kgs=0;
				to_curr_net_lbs=0;
				//★
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
	var sum_ea_qty=sheetObj.ComputeSum("|"+fix_grid01 + "to_ea_qty|");
	if(sum_ea_qty <= 0)
	{
		ComShowCodeMessage("COM0358");
		return false;
	}
	return true;
}
function checkMeasureInfo(sheetObj, div, row, col, fr_curr, stock_curr, to_curr)
{

	//#2927 [LOA WMS4.0] ITEM CBM CALCULATION > point_count 변수
	var point_cnt = 3;
	if(div == "CBF" || div == "CBM") {
		point_cnt = WMS_CBM_POINT_COUNT;
	}

	if(parseFloat(fr_curr.toFixed(point_cnt)) > parseFloat(stock_curr.toFixed(point_cnt)))
	{
		if(parseFloat(stock_curr.toFixed(point_cnt)) < parseFloat(to_curr.toFixed(point_cnt)))
		{
			ComShowCodeMessage("COM0370", div, stock_curr.toFixed(point_cnt), to_curr.toFixed(point_cnt));
			sheetObj.SelectCell(row, fix_grid01 +  col);
			return false;
		}
	}
	else
	{
		if(parseFloat(fr_curr.toFixed(point_cnt)) < parseFloat(to_curr.toFixed(point_cnt)))
		{
			ComShowCodeMessage("COM0369", div, fr_curr.toFixed(point_cnt), to_curr.toFixed(point_cnt));
			sheetObj.SelectCell(row, fix_grid01 +  col);
			return false;
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
	if($("#plan_sts_cd").val().trim() != "")
	{
		return;
	}
	if(sheet1.RowCount()> 0)
	{
		//confirm
		if(ComShowCodeConfirm("COM0353", "Warehouse") == false)
		{
			$("#wh_cd").val($("#wh_cd_org").val());
			$("#wh_nm").val($("#wh_nm_org").val());
			return;
		}
	}
	//SHEET 초기화
	sheet1.RemoveAll();
	if(obj.value != ""){
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
	}
	else
	{
		$("#wh_nm").val("");
		$("#wh_cd_org").val("");
		$("#wh_nm_org").val("");
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
		    formObj.wh_cd_org.value=formObj.wh_cd.value;
		    formObj.wh_nm_org.value=rtnArr[0];
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
			formObj.wh_cd_org.value="";
			formObj.wh_nm_org.value=""; 
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
	if($("#plan_sts_cd").val().trim() != "")
	{
		return;
	}
	if(sheet1.RowCount()> 0)
	{
		//confirm
		if(ComShowCodeConfirm("COM0353", "Contract No") == false)
		{
			$("#ctrt_no").val($("#ctrt_no_org").val());
			$("#ctrt_nm").val($("#ctrt_nm_org").val());
			return;
		}
	}
	//SHEET 초기화
	sheet1.RemoveAll();
	if(obj.value != ""){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
	}
	else
	{
		$("#ctrt_nm").val("");
		$("#ctrt_cd_org").val("");
		$("#ctrt_nm_org").val("");	
	}
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
	    formObj.ctrt_no_org.value=formObj.ctrt_no.value;
	    formObj.ctrt_nm_org.value=rtnArr[0];
	   }
	   else{
		   formObj.ctrt_no.value="";
			formObj.ctrt_nm.value="";
			formObj.ctrt_no_org.value="";
			formObj.ctrt_nm_org.value="";
	   }
	  }
	  else{
		  	formObj.ctrt_no.value="";
			formObj.ctrt_nm.value="";
			formObj.ctrt_no_org.value="";
			formObj.ctrt_nm_org.value=""; 
	  }
	 }
	 else{
		 	formObj.ctrt_no.value="";
			formObj.ctrt_nm.value="";
			formObj.ctrt_no_org.value="";
			formObj.ctrt_nm_org.value=""; 
	 }
}
function btn_link_ctrt(){
	var formObj=document.form;
	if(!ComIsEmpty(formObj.ctrt_no)){
		var sUrl="./CtrtMgmt.clt?ctrt_no="+formObj.ctrt_no.value;
		parent.mkNewFrame('Contract Management', sUrl, "CtrtMgmt_" + formObj.ctrt_no.value);
	}
}
function mergeSheetSearchEnd(sheetObj, rowFirstData){
	if(sheetObj.RowCount() > 0){
		var item, lotID, type, location, bookingNo, qty, lic_plat_no, item_ser_no;
		var begin=0, end=0;
		item = sheetObj.GetCellValue(rowFirstData, fix_grid01 + "item_sys_no");
		lotID = sheetObj.GetCellValue(rowFirstData, fix_grid01 + "lot_id");
		type = sheetObj.GetCellValue(rowFirstData, fix_grid01 + "fr_mv_tp_cd_nm");
		location = sheetObj.GetCellValue(rowFirstData, fix_grid01 + "fr_wh_loc_cd_nm");
		bookingNo = sheetObj.GetCellValue(rowFirstData, fix_grid01 + "wib_bk_no");
		qty = sheetObj.GetCellValue(rowFirstData, fix_grid01 + "fr_ea_qty");
		lic_plat_no = sheetObj.GetCellValue(rowFirstData, fix_grid01 + "lic_plat_no");
		item_ser_no = sheetObj.GetCellValue(rowFirstData, fix_grid01 + "item_ser_no");
		
		begin = rowFirstData;
		
			for(var j = 2; j <= sheetObj.RowCount() + 1; j++){ // Ignore 2 Rows Headers
				var item_head, lotID_head, type_head, location_head, bookingNo_head, qty_head, lic_plat_no_head, item_ser_no_head;
				item_head = sheetObj.GetCellValue(j, fix_grid01 + "item_sys_no");
				lotID_head = sheetObj.GetCellValue(j, fix_grid01 + "lot_id");
				type_head = sheetObj.GetCellValue(j, fix_grid01 + "fr_mv_tp_cd_nm");
				location_head = sheetObj.GetCellValue(j, fix_grid01 + "fr_wh_loc_cd_nm");
				bookingNo_head = sheetObj.GetCellValue(j, fix_grid01 + "wib_bk_no");
				qty_head = sheetObj.GetCellValue(j, fix_grid01 + "fr_ea_qty");
				lic_plat_no_head = sheetObj.GetCellValue(j, fix_grid01 + "lic_plat_no");
				item_ser_no_head = sheetObj.GetCellValue(j, fix_grid01 + "item_ser_no");
				if(item_head == item && lotID == lotID_head && type == type_head && location == location_head && bookingNo == bookingNo_head 
						&& qty == qty_head && lic_plat_no == lic_plat_no_head && item_ser_no == item_ser_no_head){
					end = j;
				}else{
						if(begin > 0 && end > begin){
							for(var k=1;k<=15;k++){
					 			sheet1.SetMergeCell(begin, k, end - begin + 1, 1);
					 		}
						}
						item = sheetObj.GetCellValue(j, fix_grid01 + "item_sys_no");
						lotID = sheetObj.GetCellValue(j, fix_grid01 + "lot_id");
						type = sheetObj.GetCellValue(j, fix_grid01 + "fr_mv_tp_cd_nm");
						location = sheetObj.GetCellValue(j, fix_grid01 + "fr_wh_loc_cd_nm");
						bookingNo = sheetObj.GetCellValue(j, fix_grid01 + "wib_bk_no");
						qty = sheetObj.GetCellValue(j, fix_grid01 + "fr_ea_qty");
						lic_plat_no = sheetObj.GetCellValue(j, fix_grid01 + "lic_plat_no");
						item_ser_no = sheetObj.GetCellValue(j, fix_grid01 + "item_ser_no");
						begin = j;
				}
			}
			if(begin > 0 && end > begin){
				for(var k=1;k<=15;k++){
		 			sheet1.SetMergeCell(begin, k, end - begin + 1, 1);
		 		}
			}
	}
}


function formatTime(obj){
	if(obj.value.length==2)
		{
			obj.value = obj.value + ':';
		}
}
function timeCheck(obj, objStart, objEnd){
	var formObj = document.form;
	if(checkTimeStartEnd(objStart, objEnd) == false){
		ComShowCodeMessage('COM0049');
		objStart.value='';
		objStart.focus();
	}else{
		var size=obj.value.length;
		if(size==1){
			obj.value="0" + obj.value + ":00";
		}else if(size==2){
			if(hourCheck(obj.value)){
				obj.value=obj.value + ":00";
			}else{
				obj.value='';
				obj.focus();
			}
		}else if(size==3){
			if(hourCheck(obj.value.substring(0,2))){
				if(obj.value.substring(2,3)>5 || obj.value.substring(2,3)<0){
					obj.value='';
					obj.focus();
				}else if(obj.value.substring(2,3) == ":"){
					obj.value=obj.value.substring(0,2) + ":" + "00";
				}else{
					obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,3) + "0";
				}
			}else{
				obj.value='';
				obj.focus();
			}
		}else if(size==4){
			if(hourCheck(obj.value.substring(0,2))){
				if(minuteCheck(obj.value.substring(2,4))){
					obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,4);
				}else{
					obj.value='';
					obj.focus();
				}
			}else{
				obj.value='';
				obj.focus();
			}
		}else if(size==5){
			var val = obj.value.split(':');
			if(hourCheck(val[0])){
				if(minuteCheck(val[1])){
					obj.value=val[0] + ":" + val[1];
				}else{
					obj.value='';
					obj.focus();
				}
			}else{
				obj.value='';
				obj.focus();
			}
		}
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
		ComBtnDisable("btn_cancel");
		ComBtnDisable("btn_move");
	}else{
		ComBtnEnable("btnSave");
		ComBtnEnable("btn_move");
	}
}
function chkSpecialValue(obj) {
	var formObj=document.frm1;
    var keyValue=obj.value;
    var specialChars = "~`!@#$^&%*[]\/{}|:<>?;()'";
    for (var i=0; i < specialChars.length; i++) {
    	keyValue = keyValue .replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }
    obj.value = keyValue;
}