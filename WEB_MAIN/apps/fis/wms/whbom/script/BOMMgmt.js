/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : BOMMgmt.js
*@FileTitle  : Bill of Material
*@author     : kiet.tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/21
=========================================================--*/
var sheetCnt=0;
var docObjects=new Array();
var fix_grid01="Grd01";
var fix_grid02="Grd02";
var fix_grid03="Grd03";
var fix_grid04="Grd04";
var fix_in_kit="in_kit";
var fix_kit="kit";
var fix_dekit="dekit";
var item_grp_cd="KIT";
var firCalFlag = false;
var tabID = '01';

var kit_tab_input_def="kit_no|kit_wh_combo-def_wh_combo|kit_wh_combo-def_wh_combo|kit_wh_cd_org-def_wh_cd|kit_wh_nm_org-def_wh_nm"
						+ "|kit_ctrt_no-def_wh_ctrt_no|kit_ctrt_nm-def_wh_ctrt_nm|kit_ctrt_no_org-def_wh_ctrt_no|kit_ctrt_nm_org-def_wh_ctrt_nm"
						+ "|kit_dt|kit_hm_fr|kit_hm_to|kit_item_cd|kit_item_nm|kit_item_sys_no|kit_item_grp_cd|kit_item_ea_qty-0|kit_wh_loc_nm|kit_wh_loc_cd|kit_wh_loc_nm_org|kit_lot_no|kit_lot_id|kit_exp_dt|kit_lot_04|kit_lot_05|kit_ctrt_pic_nm|kit_supv_nm|kit_worker_nm|kit_item_cbm-0.000|kit_item_cbf-0.000|kit_item_grs_kgs-0.000|kit_item_grs_lbs-0.000|kit_item_net_kgs-0.000|kit_item_net_lbs-0.000|kit_rmk"
						+ "|kit_lv1_cbm-0|kit_lv1_cbf-0|kit_lv1_grs_kgs-0|kit_lv1_grs_lbs-0|kit_lv1_net_kgs-0|kit_lv1_net_lbs-0";
var kit_tab_input="kit_no|kit_wh_combo|kit_wh_combo|kit_ctrt_no|kit_ctrt_nm"
						+ "|kit_dt|kit_hm_fr|kit_hm_to|kit_item_cd|kit_item_nm|kit_item_grp_cd|kit_item_ea_qty|kit_wh_loc_nm|kit_wh_loc_cd|kit_lot_no|kit_lot_id|kit_exp_dt|kit_lot_04|kit_lot_05|kit_ctrt_pic_nm|kit_supv_nm|kit_worker_nm|kit_item_cbm|kit_item_cbf|kit_item_grs_kgs|kit_item_grs_lbs|kit_item_net_kgs|kit_item_net_lbs|kit_rmk";
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
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
    //control
	initControl();
	loadComboWarehouse();
	loadComboWarehouse1();
	//mode init setting
	commonModeChange("INIT");
	//kitting default setting
	setDefault(fix_kit);
	//dekitting default setting
	setDefault(fix_dekit);	
	//request param이 존재할경우
	if($("#req_search_div").val() != "")
	{
		switch($("#req_search_div").val())
		{
			case (fix_kit):
				goTabSelect("01");
				$("#in_kit_no").val($("#req_kit_no").val());
				btn_Search(fix_kit);
				break;
		}
	}
//	check_authority_wh(fix_kit);
//	check_authority_wh(fix_dekit);
}
function setDefault(div)
{
	switch (div)
	{
		case (fix_kit): //kitting
			$("#kit_wh_combo").val($("#def_wh_cd").val());
			$("#kit_ctrt_no").val($("#def_wh_ctrt_no").val());
			$("#kit_ctrt_nm").val($("#def_wh_ctrt_nm").val());
			$("#kit_wh_cd_org").val($("#def_wh_cd").val());
			$("#kit_wh_nm_org").val($("#def_wh_nm").val());
			$("#kit_ctrt_no_org").val($("#def_wh_ctrt_no").val());
			$("#kit_ctrt_nm_org").val($("#def_wh_ctrt_nm").val());
			break;
		case (fix_dekit): //dekitting
			//by load plan
			$("#dekit_fm_kit_dt").val(ComGetDateAdd(null, "d", -31, "-"));
			$("#dekit_to_kit_dt").val(ComGetNowInfo());
			$("#dekit_wh_combo").val($("#def_wh_cd").val());
			$("#dekit_ctrt_no").val($("#def_wh_ctrt_no").val());
			$("#dekit_ctrt_nm").val($("#def_wh_ctrt_nm").val());
			break;
	}
}
/*
 * 각모드별 화면을 init셋팅
 */
function commonModeChange(mode)
{
	switch(mode)
	{
		case "INIT": //all init
			commonButtonChange(mode);
			$("#kit_mode").val("KIT_NEW");
			break;
		case "KIT_NEW" : //kitting tab new
			commonButtonChange(mode);
			$("#kit_mode").val(mode);
			
//			$("#sheet1")[0].RemoveAll();
			docObjects[0].RemoveAll();
//			$("#sheet2")[0].RemoveAll();
			docObjects[1].RemoveAll();
			//kit_wh_combo.RemoveAll();
			//input field reset
			commonTab1InputReset();
			$("#kit_wh_combo option").remove();
			$("#dekit_wh_combo option").remove();
			headerInfoChange(true);
			$("#kit_wh_combo").val($("#def_wh_cd").val());
			$("#dekit_wh_combo").val($("#def_wh_cd").val());
			break;
		case "SEARCH_KIT" : //kitting search
			commonButtonChange(mode);
			headerInfoChange(false);
			$("#kit_mode").val(mode);
			//만약에 모든QTY가 DEKIT이 되어 NEW ITEM QTY가 0이면 저장버튼 비활성화
			var qty=eval($("#kit_item_ea_qty").val());
			if(qty <= 0)
			{
				ComBtnDisable("btn_save_kit");
			}
			break;
		case "SEARCH_DEKIT":
			//save버튼 비활성화
			ComBtnDisable("btn_save_dekit");
			//sheet4 remove
//			$("#sheet4")[0].RemoveAll();
			docObjects[3].RemoveAll();
			break;
		case "SEARCH_DEKITDT":
			//save버튼 비활성화
//			ComBtnEnable("btn_save_dekit",				true,	1);
			ComBtnEnable("btn_save_dekit");
			break;
	}
//	check_authority_wh(fix_dekit);
}
/*
 * tab1의 input 을 초기화한다
 * kit_tab_input_def = id|id|id
 * 만약 id-def_* 일경우는 해당 id에 def_*의 value를 셋팅한다.
 * 만약 id-* 일경우 해당 id에 *를 셋팅한다.(* = def_가 아닌 모든 문자)
 */
function commonTab1InputReset()
{
	var arr=kit_tab_input_def.split("|");
	for(var i=0; i < arr.length; i++)
	{
		//기본셋팅
		var arr2=arr[i].split("-");
		if(arr2.length >=2)
		{
			//기본셋팅
			if(arr2[1].indexOf("def_") > -1)
			{
				$("#" + arr2[0]).val($("#" + arr2[1]).val());
			}
			else
			{
				$("#" + arr2[0]).val(arr2[1]);
			}
		}
		else
		{
			$("#" + arr[i]).val("");
		}
	}
}
function headerInfoChange(flg)
{
	var formObj=document.form;
	if(flg == true)
	{
		//ComEnableObject(formObj.kit_wh_combo, flg);
		formObj.kit_wh_combo.disabled = false;
		loadComboWarehouse();
		loadComboWarehouse1();
		ComEnableObject(formObj.kit_ctrt_no, flg);
		ComBtnEnable("btn_kit_ctrt_no");
		ComEnableObject(formObj.kit_dt, flg);
		ComBtnEnable("btn_kit_dt");
//		ComEnableObject(formObj.kit_hm_fr, flg);
//		ComEnableObject(formObj.kit_hm_to, flg);
		ComEnableObject(formObj.kit_item_cd, flg);
		ComBtnEnable("btn_kit_item_cd");
		ComEnableObject(formObj.kit_item_ea_qty, flg);
		ComEnableObject(formObj.kit_wh_loc_nm, flg);
		ComBtnEnable("btn_kit_wh_loc_cd");
		ComEnableObject(formObj.kit_lot_no, flg);
		ComEnableObject(formObj.kit_exp_dt, flg);
		ComBtnEnable("btn_kit_exp_dt");
		ComEnableObject(formObj.kit_lot_04, flg);
		ComEnableObject(formObj.kit_lot_05, flg);
	}
	else
	{
		//ComEnableObject(formObj.kit_wh_combo, flg);
		formObj.kit_wh_combo.disabled = true;
		ComEnableObject(formObj.kit_ctrt_no, flg);
		ComBtnDisable("btn_kit_ctrt_no");
		ComEnableObject(formObj.kit_dt, flg);
		ComBtnDisable("btn_kit_dt");
//		ComEnableObject(formObj.kit_hm_fr, flg);
//		ComEnableObject(formObj.kit_hm_to, flg);
		ComEnableObject(formObj.kit_item_cd, flg);
		ComBtnDisable("btn_kit_item_cd");
		ComEnableObject(formObj.kit_item_ea_qty, flg);
		ComEnableObject(formObj.kit_wh_loc_nm, flg);
		ComBtnDisable("btn_kit_wh_loc_cd");
		ComEnableObject(formObj.kit_lot_no, flg);
		ComEnableObject(formObj.kit_exp_dt, flg);
		ComBtnDisable("btn_kit_exp_dt");
		ComEnableObject(formObj.kit_lot_04, flg);
		ComEnableObject(formObj.kit_lot_05, flg);
	}
	
}
/*
 * 버튼 change
 */
function commonButtonChange(mode)
{
	switch(mode)
	{
		case "INIT" :
			//tab1
			ComBtnDisable("btn_print_kit");
			ComBtnEnable("btn_save_kit");
			//tab2
			ComBtnDisable("btn_save_dekit");
			break;	
		case "KIT_NEW" :
			ComBtnDisable("btn_print_kit");
			ComBtnEnable("btn_save_kit");
			ComBtnEnable("kit_row_add1");
			ComBtnEnable("kit_row_add2");
			ComBtnEnable("kit_row_del1");
			ComBtnEnable("kit_row_del2");
			break;
		case "SEARCH_KIT" :
			ComBtnEnable("btn_save_kit");
			ComBtnEnable("btn_print_kit");
			ComBtnDisable("kit_row_add1");
			ComBtnDisable("kit_row_add2");
			ComBtnDisable("kit_row_del1");
			ComBtnDisable("kit_row_del2");
			break;
	}
}
/*
 * tab
 */
function goTabSelect(isNumSep) {
	 if( isNumSep == "01" ) {
	    	document.all.Tab01.className="On";
	        document.all.Tab02.className="Off";  
	        tabID = '01';
	    } else if( isNumSep == "02" ) {
	    	document.all.Tab01.className="Off";
	        document.all.Tab02.className="On";
	        tabID = '02';
	    }
	    var tabObjs=document.getElementsByName('tabLayer');
	    if(isNumSep=='01') {
			tabObjs[0].style.display='inline';
	        tabObjs[1].style.display='none';
	    }else if(isNumSep=='02') {
			tabObjs[0].style.display='none';
	        tabObjs[1].style.display='inline';
	    }
	    
	    var index = parseInt(isNumSep);
		var count = 0;
		$('.opus_design_tab').find("li").each(function(){
			if(count++ == index - 1){
				$(this).addClass('nowTab');
			}else{
				$(this).removeClass('nowTab');
			}
			 resizeSheet();
		});
   
}
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/*
 * init sheet
 */ 
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      
			with(sheetObj){
			
//			var hdr1="|Item|Item Name|Qty /1 Item\n(EA)|Required\n(EA)|Assigned\n(EA)|item_sys_no|status";
//			var hdr2="|Item|Item Name|Qty /1 Item\n(EA)|Required\n(EA)|Assigned\n(EA)|item_sys_no|status";
//			var headCount=ComCountHeadTitle(hdr1);
			var prefix=fix_grid01;
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataGetGetRowMerge:1 } );
			var info={ Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers=[  { Text:getLabel('BOMMgmt_SHEET1_HDR1'), Align:"Center"},
	                       { Text:getLabel('BOMMgmt_SHEET1_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);
			var cols=[
				{Type:"CheckBox",  Hidden:0,  Width:25,  Align:"Center", ColMerge:1,	SaveName:prefix + "chk",					KeyField:0, CalcLogic:"", Format:"",											  UpdateEdit:0,InsertEdit:1 },
				{Type:"PopupEdit", Hidden:0,  Width:100,  Align:"Left",   ColMerge:1,	SaveName:prefix + "sub_item_cd",			KeyField:1, CalcLogic:"", Format:"",											  UpdateEdit:0,InsertEdit:1 },
				{Type:"Text",      Hidden:0,  Width:120, Align:"Left",	 ColMerge:1,	SaveName:prefix + "sub_item_nm",			KeyField:0, CalcLogic:"", Format:"",											  UpdateEdit:0,InsertEdit:0 },
				{Type:"Float",     Hidden:0,  Width:90,  Align:"Right",	 ColMerge:1,	SaveName:prefix + "sub_item_unit_ea_qty",	KeyField:1, CalcLogic:"", Format:"Float", 	PointCount:0, UpdateEdit:0,InsertEdit:1 },
				{Type:"Float",     Hidden:0,  Width:80,  Align:"Right",	 ColMerge:1,	SaveName:prefix + "required_qty",			KeyField:0, CalcLogic:"", Format:"Float", 	PointCount:0, UpdateEdit:0,InsertEdit:0 },
				{Type:"Float",     Hidden:0,  Width:80,  Align:"Right",	 ColMerge:1,	SaveName:prefix + "assigned_qty",			KeyField:0, CalcLogic:"", Format:"Float", 	PointCount:0, UpdateEdit:0,InsertEdit:0 },
				{Type:"Text",      Hidden:1,  Width:120, Align:"Left",	 ColMerge:0,	SaveName:prefix + "sub_item_sys_no",		Format:""},
				{Type:"Status",    Hidden:1,  Width:30,  Align:"Center", ColMerge:0,	SaveName:prefix + "ibflag"} ];
			
			InitColumns(cols);
			SetHeaderRowHeight(30);
			SetSheetHeight(300);
			resizeSheet();
			//SetEditable(1);
			SetColProperty(0 ,prefix+"sub_item_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			}		
			break;

		case 2:      
		    with(sheetObj){
			     
//			      var hdr1="Item|Item Name|seq||Lot Property|Lot Property|Inventory(EA)|Inventory(EA)|Assigned|Assigned|Assigned|Assigned|Assigned|Assigned|Assigned|Lot ID|Additional LOT Info.|Additional LOT Info.|Additional LOT Info.|Serial No|LP No|PO No"
//			      + "|status|sub_item_po_sys_no|sub_item_sys_no|sub_wh_loc_cd|sub_item_so_no|sub_wib_bk_no|sub_item_po_no"
//			      + "|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";
//			      var hdr2="Item|Item Name|seq||Inbound Date|Item Lot|LOC|Stock|Qty(EA)|CBM|CBF|G.KGS|G.LBS|N.KGS|N.LBS|Lot ID|Expiration Date|Lot04|Lot05|Serial No|LP No|PO No"
//			      + "|status|sub_item_po_sys_no|sub_item_sys_no|sub_wh_loc_cd|sub_item_so_no|sub_wib_bk_no|sub_item_po_no"
//			      + "|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";
//			      var headCount=ComCountHeadTitle(hdr1);
			      var prefix=fix_grid02;
		
			      SetConfig({SearchMode : 2, MergeSheet : 5, Page : 10000, DataRowMerge : 1});
			      var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('BOMMgmt_SHEET2_HDR1'), Align:"Center"},
			                      { Text:getLabel('BOMMgmt_SHEET2_HDR2'), Align:"Center"} ];
			      InitHeaders(headers, info);
		
			      var cols = [ 
							{Type:"Text",      Hidden:0,  Width:90,		Align:"Left",			ColMerge:1,		SaveName:prefix+ "sub_item_cd",				KeyField:0,	CalcLogic:"", 	Format:"",									UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Text",      Hidden:0,  Width:120,	Align:"Left",			ColMerge:1,		SaveName:prefix+ "sub_item_nm",				KeyField:0,	CalcLogic:"",	Format:"",									UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Text",      Hidden:1,  Width:30,		Align:"Center",			ColMerge:1,		SaveName:prefix+ "seq",						KeyField:0,	CalcLogic:"",	Format:"",																		},
							{Type:"CheckBox",  Hidden:0,  Width:25,		Align:"Center",			ColMerge:1,		SaveName:prefix+ "chk",						KeyField:0,	CalcLogic:"",	Format:"",									UpdateEdit:0,		InsertEdit:1,	},
							{Type:"Date",      Hidden:0,  Width:80,		Align:"Center",			ColMerge:1,		SaveName:prefix+ "inbound_dt",				KeyField:0,	CalcLogic:"",	Format:"Ymd",								UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Text",      Hidden:0,  Width:100,	Align:"Left",			ColMerge:1,		SaveName:prefix+ "lot_no",					KeyField:0,	CalcLogic:"",	Format:"", 									UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Text",      Hidden:0,  Width:100,	Align:"Center",			ColMerge:1,		SaveName:prefix+ "sub_wh_loc_cd_nm",		KeyField:0,	CalcLogic:"",	Format:"", 									UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Float",     Hidden:0,  Width:50,		Align:"Right",			ColMerge:1,		SaveName:prefix+ "stock_qty",				KeyField:0,	CalcLogic:"",	Format:"Integer",			PointCount:0,	UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Float",     Hidden:0,  Width:70,		Align:"Right",			ColMerge:1,		SaveName:prefix+ "sub_item_ea_qty",			KeyField:1,	CalcLogic:"",	Format:"Integer",			PointCount:0,	UpdateEdit:0,		InsertEdit:1,	},
							{Type:"Float",     Hidden:0,  Width:80,		Align:"Right",			ColMerge:1,		SaveName:prefix+ "sub_item_cbm",			KeyField:0,	CalcLogic:"",	Format:"Float",				PointCount:3,	UpdateEdit:0,		InsertEdit:1,	},
							{Type:"Float",     Hidden:0,  Width:80,		Align:"Right",			ColMerge:1,		SaveName:prefix+ "sub_item_cbf",			KeyField:0,	CalcLogic:"",	Format:"Float",				PointCount:3,	UpdateEdit:0,		InsertEdit:1,	},
							{Type:"Float",     Hidden:0,  Width:80,		Align:"Right",			ColMerge:1,		SaveName:prefix+ "sub_item_grs_kgs",		KeyField:0,	CalcLogic:"",	Format:"Float",				PointCount:3,	UpdateEdit:0,		InsertEdit:1,	},
							{Type:"Float",     Hidden:0,  Width:80,		Align:"Right",			ColMerge:1,		SaveName:prefix+ "sub_item_grs_lbs",		KeyField:0,	CalcLogic:"",	Format:"Float",				PointCount:3,	UpdateEdit:0,		InsertEdit:1,	},
							{Type:"Float",     Hidden:0,  Width:80,		Align:"Right",			ColMerge:1,		SaveName:prefix+ "sub_item_net_kgs",		KeyField:0,	CalcLogic:"",	Format:"Float",				PointCount:3,	UpdateEdit:0,		InsertEdit:1,	},
							{Type:"Float",     Hidden:0,  Width:80,		Align:"Right",			ColMerge:1,		SaveName:prefix+ "sub_item_net_lbs",		KeyField:0,	CalcLogic:"",	Format:"Float",				PointCount:3,	UpdateEdit:0,		InsertEdit:1,	},
							{Type:"Text",      Hidden:0,  Width:140,	Align:"Center",			ColMerge:1,		SaveName:prefix+ "sub_lot_id",				KeyField:0,	CalcLogic:"",	Format:"",									UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Date",      Hidden:0,  Width:100,	Align:"Center",			ColMerge:1,		SaveName:prefix+ "exp_dt",					KeyField:0,	CalcLogic:"",	Format:"Ymd",								UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Text",      Hidden:0,  Width:140,	Align:"Center",			ColMerge:1,		SaveName:prefix+ "lot_04",					KeyField:0,	CalcLogic:"",	Format:"",									UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Text",      Hidden:0,  Width:140,	Align:"Center",			ColMerge:1,		SaveName:prefix+ "lot_05",					KeyField:0,	CalcLogic:"",	Format:"",									UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Text",      Hidden:0,  Width:100,	Align:"Center",			ColMerge:1,		SaveName:prefix+ "sub_item_ser_no",			KeyField:0,	CalcLogic:"",	Format:"",									UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Text",      Hidden:0,  Width:100,	Align:"Center",			ColMerge:1,		SaveName:prefix+ "sub_item_lic_plat_no",	KeyField:0,	CalcLogic:"",	Format:"",									UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Text",      Hidden:0,  Width:100,							ColMerge:0,		SaveName:prefix+ "sub_item_po_no",						CalcLogic:"",	Format:"",									UpdateEdit:0,		InsertEdit:0,	},
							{Type:"Status",    Hidden:1,  Width:30,		Align:"Center",			ColMerge:0,		SaveName:prefix+ "ibflag",								CalcLogic:"",																					},
							{Type:"Text",      Hidden:1,  Width:0,								ColMerge:0,		SaveName:prefix+ "sub_po_sys_no",						CalcLogic:"",	Format:"",	},
							{Type:"Text",      Hidden:1,  Width:0,								ColMerge:0,		SaveName:prefix+ "sub_item_sys_no",						CalcLogic:"",	Format:"",	},
							{Type:"Text",      Hidden:1,  Width:0,								ColMerge:0,		SaveName:prefix+ "sub_wh_loc_cd",						CalcLogic:"",	Format:"",	},
							{Type:"Text",      Hidden:1,  Width:0,								ColMerge:0,		SaveName:prefix+ "sub_item_so_no", 						CalcLogic:"",	Format:"",	},
							{Type:"Text",      Hidden:1,  Width:0,								ColMerge:0,		SaveName:prefix+ "sub_wib_bk_no", 						CalcLogic:"",	Format:"",	},
							{Type:"Float",     Hidden:1,  Width:0,		Align:"Center",			ColMerge:0,		SaveName:prefix+ "pkg_lv1_qty",							CalcLogic:"",	Format:"Integer",			PointCount:0,										},
							{Type:"Float",     Hidden:1,  Width:0,		Align:"Center",			ColMerge:0,		SaveName:prefix+ "lv1_cbm",								CalcLogic:"",	Format:"Float",				PointCount:5, 									    },
							{Type:"Float",     Hidden:1,  Width:0,		Align:"Center",			ColMerge:0,		SaveName:prefix+ "lv1_cbf",								CalcLogic:"",	Format:"Float",				PointCount:5, 									    },
							{Type:"Float",     Hidden:1,  Width:0,		Align:"Center",			ColMerge:0,		SaveName:prefix+ "lv1_grs_kgs",							CalcLogic:"",	Format:"Float",				PointCount:5, 									    },
							{Type:"Float",     Hidden:1,  Width:0,		Align:"Center",			ColMerge:0,		SaveName:prefix+ "lv1_grs_lbs",							CalcLogic:"",	Format:"Float",				PointCount:5, 									    },
							{Type:"Float",     Hidden:1,  Width:70,		Align:"Center",			ColMerge:0,		SaveName:prefix+ "lv1_net_kgs",							CalcLogic:"",	Format:"Float",				PointCount:5, 									    },
							{Type:"Float",     Hidden:1,  Width:50,		Align:"Center",			ColMerge:0,		SaveName:prefix+ "lv1_net_lbs",							CalcLogic:"",	Format:"Float",				PointCount:5, 									    },
							{Type:"Int",       Hidden:1,  Width:50,		Align:"Center",			ColMerge:0,		SaveName:prefix+ "sub_item_seq",					    CalcLogic:"",	Format:"Integer",			PointCount:0, 									    } ];

			      		InitColumns(cols);
			      		SetHeaderRowHeight(30);
			      		SetSheetHeight(300);
			      		//SetSheetHeight(ComGetSheetHeight(sheet1,450));
			      		resizeSheet();
			      		//SetEditable(1);
	            }
	        	break;

		case 3:      
		    with(sheetObj){
			      
//			      var hdr1="Seq|Kitting No|Item|Lot Property|Lot Property|Location|Stock\(EA)|De-kit\(EA)|Stock Measure|Stock Measure|Stock Measure|Stock Measure|Stock Measure|Stock Measure|De-kit Measure|De-kit Measure|De-kit Measure|De-kit Measure|De-kit Measure|De-kit Measure|Additional LOT Info.|Additional LOT Info.|Additional LOT Info.|LOT ID|Contract|Contract|W/H Code"
//			      + "|po_sys_no|item_sys_no|putaway_wh_loc_cd|item_nm|status|clickflag"
//			      + "|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";
//			      var hdr2="Seq|Kitting No|Item|Kitting Date|Item Lot|Location|Stock\(EA)|De-kit\(EA)|CBM|CBF|G.KGS|G.LBS|N.KGS|N.LBS|CBM|CBF|G.KGS|G.LBS|N.KGS|N.LBS|Expiration Date|Lot04|Lot05|LOT ID|Code|Name|W/H Code"
//			      + "|po_sys_no|item_sys_no|putaway_wh_loc_cd|item_nm|status|clickflag"
//			      + "|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";
//			      var headCount=ComCountHeadTitle(hdr1);
			      var prefix=fix_grid03;
		
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		
			      var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('BOMMgmt_SHEET3_HDR1'), Align:"Center"},
			                      { Text:getLabel('BOMMgmt_SHEET3_HDR2'), Align:"Center"} ];
			      InitHeaders(headers, info);
		
			      var cols = [ 
						{Type:"Seq",       Hidden:0, Width:30,		Align: "Center",	ColMerge:1, 		SaveName:prefix+"seq",      			KeyField:0,			Format:""	,},
						{Type:"Text",     Hidden:0,  Width:150,		Align: "Center",      ColMerge:1,		SaveName:prefix+"kit_no",				KeyField:0,			Format:"",					UpdateEdit:0,	},
						{Type:"Text",     Hidden:0,  Width:100,		Align: "Left",      ColMerge:1,			SaveName:prefix+"item_cd",				KeyField:0,			Format:"",					UpdateEdit:0,	},
						{Type:"Date",     Hidden:0,  Width:80,		Align: "Center",      ColMerge:1,		SaveName:prefix+"kit_dt",				KeyField:0,			Format:"Ymd",			UpdateEdit:0,	},
						{Type:"Text",     Hidden:0,  Width:130,		Align: "Left",      ColMerge:1,			SaveName:prefix+"lot_no",				KeyField:0,			Format:"",					UpdateEdit:0,	},
						{Type:"Text",     Hidden:0,  Width:80,		Align: "Center",      ColMerge:1,		SaveName:prefix+"putaway_wh_loc_nm",	KeyField:0,			Format:"",					UpdateEdit:0,	},
						{Type:"Float",     Hidden:0,  Width:70,		Align: "Right",      ColMerge:1,		SaveName:prefix+"stock_qty",			KeyField:0,			Format:"Integer",		PointCount:0,		UpdateEdit:0,},
						{Type:"Float",     Hidden:0,  Width:70,		Align: "Right",      ColMerge:1,		SaveName:prefix+"dekit_item_ea_qty",	KeyField:1,			Format:"Integer",		PointCount:0,},
						{Type:"Float",     Hidden:0,  Width:80,		Align: "Right",      ColMerge:0,		SaveName:prefix+"item_cbm",				KeyField:0,			Format:"Float",	PointCount:3,			UpdateEdit:0,},
						{Type:"Float",     Hidden:0,  Width:80,		Align: "Right",      ColMerge:1,		SaveName:prefix+"item_cbf",				KeyField:0,			Format:"Float",	PointCount:3,			UpdateEdit:0,},
						{Type:"Float",     Hidden:0,  Width:80,		Align: "Right",      ColMerge:1,		SaveName:prefix+"item_grs_kgs",			KeyField:0,			Format:"Float",	PointCount:3,			UpdateEdit:0,},
						{Type:"Float",     Hidden:0,  Width:80,		Align: "Right",      ColMerge:1,		SaveName:prefix+"item_grs_lbs",			KeyField:0,			Format:"Float",	PointCount:3,			UpdateEdit:0,},
						{Type:"Float",     Hidden:0,  Width:80,		Align: "Right",      ColMerge:1,		SaveName:prefix+"item_net_kgs",			KeyField:0,			Format:"Float",	PointCount:3,			UpdateEdit:0,},
						{Type:"Float",     Hidden:0,  Width:80,		Align: "Right",      ColMerge:1,		SaveName:prefix+"item_net_lbs",			KeyField:0,			Format:"Float",	PointCount:3,			UpdateEdit:0,},
						{Type:"Float",     Hidden:0,  Width:80,		Align: "Right",      ColMerge:1,		SaveName:prefix+"dekit_item_cbm",		KeyField:0,			Format:"Float",	PointCount:3,},
						{Type:"Float",     Hidden:0,  Width:80,		Align: "Right",      ColMerge:1,		SaveName:prefix+"dekit_item_cbf",		KeyField:0,			Format:"Float",	PointCount:3,},
						{Type:"Float",     Hidden:0,  Width:80,		Align: "Right",      ColMerge:1,		SaveName:prefix+"dekit_item_grs_kgs",	KeyField:0,			Format:"Float",	PointCount:3,},
						{Type:"Float",     Hidden:0,  Width:80,		Align: "Right",      ColMerge:1,		SaveName:prefix+"dekit_item_grs_lbs",	KeyField:0,			Format:"Float",	PointCount:3,},
						{Type:"Float",     Hidden:0,  Width:80,		Align: "Right",      ColMerge:1,		SaveName:prefix+"dekit_item_net_kgs",	KeyField:0,			Format:"Float",	PointCount:3,},
						{Type:"Float",     Hidden:0,  Width:80,		Align: "Right",      ColMerge:1,		SaveName:prefix+"dekit_item_net_lbs",	KeyField:0,			Format:"Float",	PointCount:3,},
						{Type:"Date",     Hidden:0,  Width:80,		Align: "Center",     ColMerge:1,		SaveName:prefix+"exp_dt",				KeyField:0,			Format:"Ymd",	UpdateEdit:0,		},
						{Type:"Text",     Hidden:0,  Width:80,		Align: "Left",       ColMerge:1,		SaveName:prefix+"lot_04",				KeyField:0,			Format:"",		UpdateEdit:0,		},
						{Type:"Text",     Hidden:0,  Width:80,		Align: "Left",       ColMerge:1,		SaveName:prefix+"lot_05",				KeyField:0,			Format:"",		UpdateEdit:0,		},
						{Type:"Text",     Hidden:0,  Width:120,		Align: "Center",     ColMerge:1,		SaveName:prefix+"lot_id",				KeyField:0,			Format:"",		UpdateEdit:0,		},
						{Type:"Text",     Hidden:0,  Width:80,		Align: "Center",     ColMerge:1,		SaveName:prefix+"ctrt_no",				KeyField:0,			Format:"",		UpdateEdit:0,		},
						{Type:"Text",     Hidden:0,  Width:120,		Align: "Left",       ColMerge:1,		SaveName:prefix+"ctrt_nm",				KeyField:0,			Format:"",		UpdateEdit:0,		},
						{Type:"Text",     Hidden:0,  Width:70,		Align: "Center",     ColMerge:1,		SaveName:prefix+"wh_cd",				KeyField:0,			Format:"",		UpdateEdit:0,		},
						{Type:"Text",      Hidden:1, Width:0,		Align: "Center",     ColMerge:1,		SaveName:prefix+"po_sys_no",			KeyField:0,			Format:"",},
						{Type:"Text",      Hidden:1, Width:0,		Align: "Center",     ColMerge:1,		SaveName:prefix+"item_sys_no",			KeyField:0,			Format:"",},
						{Type:"Text",      Hidden:1, Width:0,		Align: "Center",     ColMerge:1,		SaveName:prefix+"putaway_wh_loc_cd",	KeyField:0,			Format:"",},
						{Type:"Text",      Hidden:1, Width:0,		Align: "Left",      ColMerge:1,			SaveName:prefix+"item_nm",				KeyField:0,			Format:"",},
						{Type:"Status",    Hidden:1, Width:30,		Align: "Center",    ColMerge:0,			SaveName:prefix+"ibflag",},
						{Type:"Text",      Hidden:1, Width:0,		Align: "Left",      ColMerge:1,			SaveName:prefix+"clickflag",			KeyField:0,			Format:"",},
						{Type:"Float",      Hidden:1, Width:0,		Align: "Center",	ColMerge:0,			SaveName:prefix+"pkg_lv1_qty",								Format:"Integer",	PointCount:0,},
						{Type:"Float",      Hidden:1, Width:0,		Align: "Center",	ColMerge:0,			SaveName:prefix+"lv1_cbm",									Format:"Float",			PointCount:5,},
						{Type:"Float",      Hidden:1, Width:0,		Align: "Center",	ColMerge:0,			SaveName:prefix+"lv1_cbf",									Format:"Float",			PointCount:5,},
						{Type:"Float",      Hidden:1, Width:0,		Align: "Center",	ColMerge:0,			SaveName:prefix+"lv1_grs_kgs",								Format:"Float",			PointCount:5,},
						{Type:"Float",      Hidden:1, Width:0,		Align: "Center",	ColMerge:0,			SaveName:prefix+"lv1_grs_lbs",								Format:"Float",			PointCount:5,},
						{Type:"Float",      Hidden:1, Width:0,		Align: "Center",	ColMerge:0,			SaveName:prefix+"lv1_net_kgs",								Format:"Float",			PointCount:5,},
						{Type:"Float",      Hidden:1, Width:0,		Align: "Center",	ColMerge:0,			SaveName:prefix+"lv1_net_lbs",								Format:"Float",			PointCount:5,} ];
			       
			      InitColumns(cols);
			      SetSheetHeight(240);
			      SetEditable(1);
//			      resizeSheet();
			      }
			      break;


		case 4:      
		    with(sheetObj){
			      
//			      var hdr1="Kitting No|Item|Lot Property|Lot Property|Location|Stock\(EA)|CBM|CBM|GWT|GWT|NWT|NWT|Additional LOT Info.|Additional LOT Info.|Additional LOT Info.|LOT ID|Contract|Contract|W/H Code"
//			      + "|Item|Item Name|Qty/1Item\n(EA)|Component\nQty(EA)|Assigned Item|Assigned Item|Assigned Item|Assigned Item|Assigned Item|Assigned Item|Assigned Item|Assigned Item|Assigned Item|De-Kit|De-Kit|De-Kit|De-Kit|De-Kit|De-Kit|De-Kit|De-Kit|Additional LOT Info.|Additional LOT Info.|Additional LOT Info.|LOT ID"
//			      + "|sub_po_sys_no|sub_item_sys_no|sub_item_so_no|sub_wib_bk_no|Serial No|LP No|PO No|sub_item_po_no|dekit_wh_loc_cd|sub_wh_loc_cd|status"
//			      + "|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|sub_item_seq";
//			      var hdr2="Kitting No|Item|Kitting Date|Item Lot|Location|Stock\(EA)| CBM|CBF|KGS|LBS|KGS|LBS|Expiration Date|Lot04|Lot05|LOT ID|Code|Name|W/H Code"
//			      + "|Item|Item Name|Qty/1Item\n(EA)|Component\nQty(EA)|Inbound Date|Item Lot|Item EA\nQty|CBM|CBF|G.KGS|G.LBS|N.KGS|N.LBS|Location|Qty(EA)|CBM|CBF|G.KGS|G.LBS|N.KGS|N.LBS|Expiration Date|Lot04|Lot05|LOT ID"
//			      + "|sub_po_sys_no|sub_item_sys_no|sub_item_so_no|sub_wib_bk_no|Serial No|LP No|PO No|sub_item_po_no|dekit_wh_loc_cd|sub_wh_loc_cd|status"
//			      + "|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|sub_item_seq";
//			      var headCount=ComCountHeadTitle(hdr1);
			      var prefix=fix_grid04;
		
			      SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:0, DataRowMerge:0 } );
		
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('BOMMgmt_SHEET4_HDR1'), Align:"Center"},
			                      { Text:getLabel('BOMMgmt_SHEET4_HDR2'), Align:"Center"} ];
			      InitHeaders(headers, info);
		
			      var cols = [                                                                                                                                   
			      			{Type:"Text",      Hidden:0, Width:150,	Align:"Center",	ColMerge:1,      SaveName:prefix+"kit_no",       			KeyField:0,     Format:"" ,             				 UpdateEdit:0,	},
			      			{Type:"Text",      Hidden:1, Width:100,	Align:"Left",	ColMerge:1,      SaveName:prefix+"item_cd",       			KeyField:0,     Format:""  ,            				 UpdateEdit:0,	},
			      			{Type:"Date",      Hidden:1, Width:80,	Align:"Center",	ColMerge:1,      SaveName:prefix+"kit_dt",       			KeyField:0,     Format:"Ymd"  ,  						 UpdateEdit:0,	},
			      			{Type:"Text",      Hidden:1, Width:130,	Align:"Left",	ColMerge:1,      SaveName:prefix+"lot_no",       			KeyField:0,     Format:"" ,             				 UpdateEdit:0,	},
			      			{Type:"Text",      Hidden:1, Width:80,	Align:"Center",	ColMerge:1,      SaveName:prefix+"putaway_wh_loc_nm",   	KeyField:0,     Format:""            ,  				 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:1, Width:70,	Align:"Right",	ColMerge:1,      SaveName:prefix+"stock_qty",       		KeyField:0,     Format:"Integer"  ,PointCount:0	,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:1, Width:80,	Align:"Right",	ColMerge:1,      SaveName:prefix+"item_cbm",       			KeyField:0,     Format:"Float"    ,PointCount:3,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:1, Width:80,	Align:"Right",	ColMerge:1,      SaveName:prefix+"item_cbf",       			KeyField:0,     Format:"Float"    ,PointCount:3,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:1, Width:80,	Align:"Right",	ColMerge:1,      SaveName:prefix+"item_grs_kgs",       		KeyField:0,     Format:"Float"    ,PointCount:3,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:1, Width:80,	Align:"Right",	ColMerge:1,      SaveName:prefix+"item_grs_lbs",       		KeyField:0,     Format:"Float"    ,PointCount:3,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:1, Width:80,	Align:"Right",	ColMerge:1,      SaveName:prefix+"item_net_kgs",       		KeyField:0,     Format:"Float"    ,PointCount:3	,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:1, Width:80,	Align:"Right",	ColMerge:1,      SaveName:prefix+"item_net_lbs",       		KeyField:0,     Format:"Float"    ,PointCount:3	,		 UpdateEdit:0,	},
			      			{Type:"Date",      Hidden:1, Width:80,	Align:"Center",	ColMerge:1,      SaveName:prefix+"exp_dt",       			KeyField:0,     Format:"Ymd" ,    						 UpdateEdit:0,  },				
			      			{Type:"Text",      Hidden:1, Width:80,	Align:"Left",	ColMerge:1,      SaveName:prefix+"lot_04",       			KeyField:0,     Format:""  ,   							 UpdateEdit:0,  },
			      			{Type:"Text",      Hidden:1, Width:80,	Align:"Left",	ColMerge:1,      SaveName:prefix+"lot_05",       			KeyField:0,     Format:""   ,  							 UpdateEdit:0,  },
			      			{Type:"Text",      Hidden:1, Width:120,	Align:"Center",	ColMerge:1,      SaveName:prefix+"lot_id",       			KeyField:0,     Format:""   ,  							 UpdateEdit:0,  },
			      			{Type:"Text",      Hidden:1, Width:80,	Align:"Center",	ColMerge:1,      SaveName:prefix+"ctrt_no",       			KeyField:0,     Format:""   ,  							 UpdateEdit:0,  },
			      			{Type:"Text",      Hidden:1, Width:120,	Align:"Left",	ColMerge:1,      SaveName:prefix+"ctrt_nm",       			KeyField:0,     Format:""   ,  							 UpdateEdit:0,  },
			      			{Type:"Text",      Hidden:1, Width:70,	Align:"Center",	ColMerge:1,      SaveName:prefix+"wh_cd",       			KeyField:0,     Format:""   ,  							 UpdateEdit:0,  },
			      			{Type:"Text",      Hidden:0, Width:80,	Align:"Left",	ColMerge:1,      SaveName:prefix+"sub_item_cd",       		KeyField:0,     Format:""   ,  							 UpdateEdit:0,  },
			      			{Type:"Text",      Hidden:0, Width:120,	Align:"Left",	ColMerge:1,      SaveName:prefix+"sub_item_nm",       		KeyField:0,     Format:""   ,  							 UpdateEdit:0,  },
			      			{Type:"Float",     Hidden:0, Width:65,	Align:"Right",	ColMerge:1,      SaveName:prefix+"sub_item_unit_ea_qty",	KeyField:0,     Format:"Float"    ,PointCount:0,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:0, Width:65,  Align:"Right",	ColMerge:1,      SaveName:prefix+"component_qty",       	KeyField:0,     Format:"Float"    ,PointCount:0,		 UpdateEdit:0,	},
			      			{Type:"Date",      Hidden:0, Width:80,  Align:"Center",	ColMerge:0,      SaveName:prefix+"sub_inbound_dt",      	KeyField:0,     Format:"Ymd"      ,						 UpdateEdit:0,	},			
			      			{Type:"Text",      Hidden:0, Width:90,  Align:"Left",	ColMerge:0,      SaveName:prefix+"sub_lot_no",       		KeyField:0,     Format:""    ,				 			 UpdateEdit:0,	},			
			      			{Type:"Float",     Hidden:0, Width:65,  Align:"Right",	ColMerge:0,      SaveName:prefix+"sub_item_ea_qty",     	KeyField:0,     Format:"Integer"  ,PointCount:0,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:0, Width:80,  Align:"Right",	ColMerge:0,      SaveName:prefix+"sub_item_cbm",       		KeyField:0,     Format:"Float"    ,PointCount:3,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:0, Width:80,  Align:"Right",	ColMerge:0,      SaveName:prefix+"sub_item_cbf",       		KeyField:0,     Format:"Float"    ,PointCount:3,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:0, Width:80,  Align:"Right",	ColMerge:0,      SaveName:prefix+"sub_item_grs_kgs",    	KeyField:0,     Format:"Float"    ,PointCount:3,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:0, Width:80,  Align:"Right",	ColMerge:0,      SaveName:prefix+"sub_item_grs_lbs",    	KeyField:0,     Format:"Float"    ,PointCount:3,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:0, Width:80,  Align:"Right",	ColMerge:0,      SaveName:prefix+"sub_item_net_kgs",    	KeyField:0,     Format:"Float"    ,PointCount:3,		 UpdateEdit:0,	},
			      			{Type:"Float",     Hidden:0, Width:80,  Align:"Right",	ColMerge:0,      SaveName:prefix+"sub_item_net_lbs",    	KeyField:0,     Format:"Float"    ,PointCount:3,		 UpdateEdit:0,	},
			      			{Type:"PopupEdit", Hidden:0, Width:90,  Align:"Center", ColMerge:0,      SaveName:prefix+"dekit_wh_loc_nm",     	KeyField:1,     Format:""               								},
			      			{Type:"Float",     Hidden:0, Width:65,  Align:"Right",	ColMerge:0,      SaveName:prefix+"dekit_sub_item_ea_qty",   KeyField:1,     Format:"Integer"  ,PointCount:0},
			      			{Type:"Float",     Hidden:0, Width:80,  Align:"Right",	ColMerge:0,      SaveName:prefix+"dekit_sub_item_cbm",      KeyField:0,     Format:"Float"    ,PointCount:3},
			      			{Type:"Float",     Hidden:0, Width:80,  Align:"Right",	ColMerge:0,      SaveName:prefix+"dekit_sub_item_cbf",      KeyField:0,     Format:"Float"    ,PointCount:3},
			      			{Type:"Float",     Hidden:0, Width:80,  Align:"Right",	ColMerge:0,      SaveName:prefix+"dekit_sub_item_grs_kgs",  KeyField:0,     Format:"Float"    ,PointCount:3},
			      			{Type:"Float",     Hidden:0, Width:80,  Align:"Right",	ColMerge:0,      SaveName:prefix+"dekit_sub_item_grs_lbs",  KeyField:0,     Format:"Float"    ,PointCount:3},
			      			{Type:"Float",     Hidden:0, Width:80,  Align:"Right",	ColMerge:0,      SaveName:prefix+"dekit_sub_item_net_kgs",  KeyField:0,     Format:"Float"    ,PointCount:3},
			      			{Type:"Float",     Hidden:0, Width:80,  Align:"Right",	ColMerge:0,      SaveName:prefix+"dekit_sub_item_net_lbs",  KeyField:0,     Format:"Float"    ,PointCount:3},
			      			{Type:"Date",      Hidden:0, Width:80,  Align:"Center",	ColMerge:1,      SaveName:prefix+"sub_exp_dt",       		KeyField:0,     Format:"Ymd",  							UpdateEdit:0,   },
			      			{Type:"Text",      Hidden:0, Width:80,  Align:"Left",	ColMerge:1,      SaveName:prefix+"sub_lot_04",       		KeyField:0,     Format:""         ,  					UpdateEdit:0,   },
			      			{Type:"Text",      Hidden:0, Width:80,	Align:"Left",	ColMerge:1,      SaveName:prefix+"sub_lot_05",       		KeyField:0,     Format:""         ,  					UpdateEdit:0,   },
			      			{Type:"Text",      Hidden:0, Width:150,	Align:"Center",	ColMerge:1,      SaveName:prefix+"sub_lot_id",       		KeyField:0,     Format:""         ,  					UpdateEdit:0,   },
			      			{Type:"Text",      Hidden:1, Width:0,	Align:"Center",	ColMerge:1,      SaveName:prefix+"sub_po_sys_no",           KeyField:0,     Format:""              									},
			      			{Type:"Text",      Hidden:1, Width:0,	Align:"Center",	ColMerge:1,      SaveName:prefix+"sub_item_sys_no",       	KeyField:1,     Format:""              									},
			      			{Type:"Text",      Hidden:1, Width:0,	Align:"Center",	ColMerge:1,      SaveName:prefix+"sub_item_so_no",       	KeyField:0,     Format:""              									},
			      			{Type:"Text",      Hidden:1, Width:0,	Align:"Center",	ColMerge:1,      SaveName:prefix+"sub_wib_bk_no",       	KeyField:1,     Format:""              									},
			      			{Type:"Text",      Hidden:0, Width:100,	Align:"Center", ColMerge:0,      SaveName:prefix+"dekit_sub_item_ser_no",              		Format:""     },
			      			{Type:"Text",      Hidden:0, Width:100,	Align:"Center", ColMerge:0,      SaveName:prefix+"dekit_sub_item_lic_plat_no",              Format:""     },
			      			{Type:"Text",      Hidden:0, Width:100,	Align:"Center",	ColMerge:0,      SaveName:prefix+"sub_item_po_no",       	KeyField:0,     Format:""              									},
			      			{Type:"Text",      Hidden:1, Width:0,	Align:"Center",	ColMerge:1,      SaveName:prefix+"dekit_wh_loc_cd",       	KeyField:0,     Format:""              									},
			      			{Type:"Text",      Hidden:1, Width:0,	Align:"Center",	ColMerge:1,      SaveName:prefix+"sub_wh_loc_cd",       	KeyField:0,     Format:""              									},
			      			{Type:"Status",    Hidden:1, Width:30,	Align:"Center", ColMerge:0,      SaveName:prefix+"ibflag",},
			      			{Type:"Float",     Hidden:1, Width:0,	Align:"Center", ColMerge:0,      SaveName:prefix+"pkg_lv1_qty",          					Format:"Integer"   ,PointCount:0},
			      			{Type:"Float",     Hidden:1, Width:0,	Align:"Center", ColMerge:0,      SaveName:prefix+"lv1_cbm",              					Format:"Float"     ,PointCount:5},
			      			{Type:"Float",     Hidden:1, Width:0,	Align:"Center", ColMerge:0,      SaveName:prefix+"lv1_cbf",              					Format:"Float"     ,PointCount:5},
			      			{Type:"Float",     Hidden:1, Width:0,	Align:"Center", ColMerge:0,      SaveName:prefix+"lv1_grs_kgs",              				Format:"Float"     ,PointCount:5},
			      			{Type:"Float",     Hidden:1, Width:0,	Align:"Center", ColMerge:0,      SaveName:prefix+"lv1_grs_lbs",              				Format:"Float"     ,PointCount:5},
			      			{Type:"Float",     Hidden:1, Width:70,	Align:"Center", ColMerge:0,      SaveName:prefix+"lv1_net_kgs",              				Format:"Float"     ,PointCount:5},
			      			{Type:"Float",     Hidden:1, Width:50,	Align:"Center", ColMerge:0,      SaveName:prefix+"lv1_net_lbs",              				Format:"Float"     ,PointCount:5},
			      			{Type:"Text",      Hidden:1, Width:100,	Align:"Center", ColMerge:0,      SaveName:prefix+"sub_item_seq",              Format:""     },];
			      	   
			      InitColumns(cols);
			      SetSheetHeight(240);
//			      resizeSheet();
			      SetEditable(1);
			      SetColProperty(0 ,prefix+"dekit_wh_loc_nm" , {AcceptKeys:"E|[0123456789!@#$%^&*()]" , InputCaseSensitive:1});
			      }
			      break;
			      
		case 5:      
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

		}
}
function resizeSheet(){
	 ComResizeSheet(docObjects[0]);
	 ComResizeSheet(docObjects[1]);
//	 ComResizeSheet(docObjects[2]);
//	 ComResizeSheet(docObjects[3]);
	}
/*
 * searchend event
 */
/*
 * OnChange event
 */

function sheet1_OnChange(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	if (colStr == (fix_grid01+"sub_item_cd")) 
	{
		if (Value != "") {
			var sParam = "&ctrt_no="+$("#kit_ctrt_no").val()+"&item_cd="+encodeURIComponent(Value) + "&item_grp_cd_include_yn=N&item_grp_cd=" + item_grp_cd;
			ajaxSendPost(result_sheet1_OnChange, Row, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
		}
		else {
			sheetObj.SetCellValue(Row, fix_grid01+"sub_item_sys_no","",0);
			sheetObj.SetCellValue(Row, fix_grid01+"sub_item_cd","",0);
			sheetObj.SetCellValue(Row, fix_grid01+"sub_item_nm","",0);
			sheetObj.SetCellEditable(Row, fix_grid01+"sub_item_nm",1);
		}
	}
	else if(colStr == fix_grid01 + "sub_item_unit_ea_qty")
	{
		var input_ea_qty=Value;
		//음수체크
		if(Value < 0)
		{
			input_ea_qty=Math.abs(Value);
			sheetObj.SetCellValue(Row, Col,input_ea_qty, 0);
		}
		//required수량계산
		var formObj=document.form;
		var qty=parseInt($("#kit_item_ea_qty").val());
		sheetObj.SetCellValue(Row, fix_grid01 + "required_qty",qty * input_ea_qty, 0);
	}
}

function result_sheet1_OnChange (reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 var sheetObj = sheet1;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
		   var rtnArr=doc[1].split('^@');
		   
		   if(rtnArr[0] != ""){
			    var cnt=0;
				var Row1;
				var item_sys_no=rtnArr[0];
				//동일한 item_cd존재여부 확인
				for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
					if(i != Row && sheetObj.GetCellValue(i, fix_grid01 + "sub_item_sys_no") == item_sys_no)
					{	
						cnt++;
						Row1=i; //중복되는 행번호
						break;
					}
				}
				if(cnt <= 0)
				{
					sheetObj.SetCellValue(Row, fix_grid01+"sub_item_sys_no",rtnArr[0],0);
					sheetObj.SetCellValue(Row, fix_grid01+"sub_item_nm",rtnArr[3],0);
					sheetObj.SetCellEditable(Row, fix_grid01+"sub_item_cd",0);
					sheetObj.SetCellEditable(Row, fix_grid01+"sub_item_nm",0);
				}
				else
				{
					ComShowCodeMessage("COM0004","Item Code");//sound unit는 없고 qty있는경우 메세지
					sheetObj.SetCellValue(Row, fix_grid01+"sub_item_sys_no","",0);
					sheetObj.SetCellValue(Row, fix_grid01+"sub_item_cd","",0);
					sheetObj.SetCellValue(Row, fix_grid01+"sub_item_nm","",0);
					sheetObj.SelectCell(Row1, fix_grid01 + "sub_item_cd");
				}
		   }else{
			 	sheetObj.SetCellValue(Row, fix_grid01+"sub_item_sys_no","",0);
				sheetObj.SetCellValue(Row, fix_grid01+"sub_item_cd","",0);
				sheetObj.SetCellValue(Row, fix_grid01+"sub_item_nm","",0);
				sheetObj.SelectCell(Row1, fix_grid01 + "sub_item_cd"); 
			 	  }
			 }
		}
}

function displayData_sheet(xml, key){
	var xmlDoc = $.parseXML(xml);
	var $xml = $(xmlDoc);
	
	var temp = $xml.find(key).text();
	return temp;
}

function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	var colValue=sheetObj.GetCellValue(Row, Col) ;
	//var cal = new ComCalendarGrid();
	if(colName == (fix_grid01 + "sub_item_cd"))
	{		
		var sUrl="./CtrtItemPopup.clt?ctrt_no="+$("#kit_ctrt_no").val()+"&item_cd="+ colValue + "&item_nm="+sheetObj.GetCellValue(Row, fix_grid01 + "sub_item_nm") + "&item_grp_cd_include_yn=N&item_grp_cd=" + item_grp_cd;
		callBackFunc = "setItem_grd";
		modal_center_open(sUrl, callBackFunc, 400, 520, "yes");
	}
}
/*
 * sheet2 onchange event
 */
function sheet2_OnChange(sheetObj, row, col, Value) {
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == fix_grid02 + "sub_item_ea_qty"){
		ChangeAssignedQty(sheetObj, sheetObj.GetCellValue(row, fix_grid02 + "sub_item_sys_no"));
		//CBM, KGS, LBS 계산
		var qty=eval(Value);
		var pkg_lv1_qty=eval(sheetObj.GetCellValue(row, fix_grid02 + "pkg_lv1_qty"));
		var lv1_cbm=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_cbm"));
		var lv1_cbf=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_cbf"));
		var lv1_grs_kgs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_grs_kgs"));
		var lv1_grs_lbs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_grs_lbs"));
		var lv1_net_kgs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_net_kgs"));
		var lv1_net_lbs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_net_lbs"));
		sheetObj.SetCellValue(row,  fix_grid02 + "sub_item_cbm",(pkg_lv1_qty * qty) * lv1_cbm,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "sub_item_cbf",(pkg_lv1_qty * qty) * lv1_cbf,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "sub_item_grs_kgs",(pkg_lv1_qty * qty) * lv1_grs_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "sub_item_grs_lbs",(pkg_lv1_qty * qty) * lv1_grs_lbs,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "sub_item_net_kgs",(pkg_lv1_qty * qty) * lv1_net_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "sub_item_net_lbs",(pkg_lv1_qty * qty) * lv1_net_lbs,0);
	}
	else if (colStr == (fix_grid02+"sub_item_cbf") && Value != "") 
	{
		funcKGS_CBM_CAC("CBF_CBM", (fix_grid02+"sub_item_cbf"), (fix_grid02+"sub_item_cbm"), sheetObj);		
	} 
	else if (colStr == (fix_grid02+"sub_item_grs_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid02+"sub_item_grs_lbs"), (fix_grid02+"sub_item_grs_kgs"), sheetObj);		
	} 
	else if (colStr == (fix_grid02+"sub_item_net_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid02+"sub_item_net_lbs"), (fix_grid02+"sub_item_net_kgs"), sheetObj);		
	}
}
/*
 * sheet3(dekitting items selection) click 이벤트
 */
function sheet3_OnClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	//if(colName != fix_grid03 + "dekit_item_ea_qty")
	if(!(   colName == fix_grid03 + "dekit_item_ea_qty" 
	     || colName == fix_grid03 + "dekit_item_cbm" 
	     || colName == fix_grid03 + "dekit_item_cbf"
	     || colName == fix_grid03 + "dekit_item_grs_kgs"
	     || colName == fix_grid03 + "dekit_item_grs_lbs"
	     || colName == fix_grid03 + "dekit_item_net_kgs"
	     || colName == fix_grid03 + "dekit_item_net_lbs"
	     )
	  )
	{
		//전건 상태값 초기로 변경
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			sheetObj.SetCellValue(i, fix_grid03 + "clickflag","",0);
	 	}
		//조회
		searchDekittingDetailInfo(sheetObj, Row, Col, Value);
		//완료 후 상태값 변경
		sheetObj.SetCellValue(Row, fix_grid03 + "clickflag","U",0);
	}
}
/*
 * OnChange event
 */
function sheet3_OnChange(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
//	var sheetObj4=$("#sheet4")[0];
	var sheetObj4= docObjects[3];
	if(colStr == fix_grid03 + "dekit_item_ea_qty")
	{
		var input_qty=Value;
		var stock_qty=eval(sheetObj.GetCellValue(Row, fix_grid03 + "stock_qty"));
		//음수체크
		if(Value < 0)
		{
			input_qty=Math.abs(Value);
			sheetObj.SetCellValue(Row, Col,input_qty,0);
		}
		//de-kit(ea)는 stock보다 클수없다.
		if(input_qty > stock_qty)
		{
			input_qty=stock_qty;
			sheetObj.SetCellValue(Row, Col,input_qty,0);
		}
		//--하위 SHEET의 component_qty 계산
		for(var i=sheetObj4.HeaderRows(); i<=sheetObj4.LastRow();i++){
			if(sheetObj.GetCellValue(Row, fix_grid03 + "kit_no") == sheetObj4.GetCellValue(i, fix_grid04 + "kit_no"))
			{
				sheetObj4.SetCellValue(i, fix_grid04 + "component_qty",eval(sheetObj4.GetCellValue(i, fix_grid04 + "sub_item_unit_ea_qty")) * input_qty,0);
			}
	 	}
		//CBM, KGS, LBS 계산
		var pkg_lv1_qty=eval(sheetObj.GetCellValue(Row, fix_grid03 + "pkg_lv1_qty"));
		var lv1_cbm=eval(sheetObj.GetCellValue(Row, fix_grid03 + "lv1_cbm"));
		var lv1_cbf=eval(sheetObj.GetCellValue(Row, fix_grid03 + "lv1_cbf"));
		var lv1_grs_kgs=eval(sheetObj.GetCellValue(Row, fix_grid03 + "lv1_grs_kgs"));
		var lv1_grs_lbs=eval(sheetObj.GetCellValue(Row, fix_grid03 + "lv1_grs_lbs"));
		var lv1_net_kgs=eval(sheetObj.GetCellValue(Row, fix_grid03 + "lv1_net_kgs"));
		var lv1_net_lbs=eval(sheetObj.GetCellValue(Row, fix_grid03 + "lv1_net_lbs"));
		sheetObj.SetCellValue(Row,  fix_grid03 + "dekit_item_cbm",(pkg_lv1_qty * input_qty) * lv1_cbm,0);
		sheetObj.SetCellValue(Row,  fix_grid03 + "dekit_item_cbf",(pkg_lv1_qty * input_qty) * lv1_cbf,0);
		sheetObj.SetCellValue(Row,  fix_grid03 + "dekit_item_grs_kgs",(pkg_lv1_qty * input_qty) * lv1_grs_kgs,0);
		sheetObj.SetCellValue(Row,  fix_grid03 + "dekit_item_grs_lbs",(pkg_lv1_qty * input_qty) * lv1_grs_lbs,0);
		sheetObj.SetCellValue(Row,  fix_grid03 + "dekit_item_net_kgs",(pkg_lv1_qty * input_qty) * lv1_net_kgs,0);
		sheetObj.SetCellValue(Row,  fix_grid03 + "dekit_item_net_lbs",(pkg_lv1_qty * input_qty) * lv1_net_lbs,0);
	}
	else if (colStr == (fix_grid03+"dekit_item_cbf") && Value != "") 
	{
		checkNumFormatSheet(Row, colStr, Value, sheetObj, '9999999999.000');
		funcKGS_CBM_CAC("CBF_CBM", (fix_grid03+"dekit_item_cbf"), (fix_grid03+"dekit_item_cbm"), sheetObj);		
	} 
	else if (colStr == (fix_grid03+"dekit_item_grs_lbs") && Value != "") 
	{
		checkNumFormatSheet(Row, colStr, Value, sheetObj, '9999999999.000');
		funcKGS_CBM_CAC("LB_KG", (fix_grid03+"dekit_item_grs_lbs"), (fix_grid03+"dekit_item_grs_kgs"), sheetObj);		
	} 
	else if (colStr == (fix_grid03+"dekit_item_net_lbs") && Value != "") 
	{
		checkNumFormatSheet(Row, colStr, Value, sheetObj, '9999999999.000');
		funcKGS_CBM_CAC("LB_KG", (fix_grid03+"dekit_item_net_lbs"), (fix_grid03+"dekit_item_net_kgs"), sheetObj);		
	}
	else if (colStr == (fix_grid03+"dekit_item_cbm") && Value != "") 
	{
		checkNumFormatSheet(Row, colStr, Value, sheetObj, '9999999999.000');
	}
	else if (colStr == (fix_grid03+"dekit_item_grs_kgs") && Value != "") 
	{
		checkNumFormatSheet(Row, colStr, Value, sheetObj, '9999999999.000');
	}
	else if (colStr == (fix_grid03+"dekit_item_net_kgs") && Value != "") 
	{
		checkNumFormatSheet(Row, colStr, Value, sheetObj, '9999999999.000');
	}
}
/*
 * sheet1 onchange event
 */
var rowsh4= "";
var colsh4= "";

function sheet4_OnChange(sheetObj, row, col, Value) {
	rowsh4 = row;
	colsh4 = col;
	var colStr=sheetObj.ColSaveName(col);
	if (colStr == (fix_grid04+"dekit_wh_loc_nm")) 
	{
		if(Value != "")
		{
			//var sParam="f_loc_cd=" + $("#" + f_div + "_wh_combo").val() + "&f_wh_loc_nm=" + $("#" + f_div + "_wh_loc_nm").val() + "&f_putaway_flg=Y&f_move_flg=Y";
			//ajaxSendPost(resultLocationInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');

			var sParam="f_loc_cd=" + sheetObj.GetCellValue(row, fix_grid04 + "wh_cd") + "&f_wh_loc_nm=" + Value + "&f_putaway_flg=Y&f_move_flg=Y";
			ajaxSendPost(resultLocationInfo_sheet4, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
			
		}
		else
		{
			sheetObj.SetCellValue(row , fix_grid04+"dekit_wh_loc_cd","",0);// wh_loc_cd
			sheetObj.SetCellValue(row , fix_grid04+"dekit_wh_loc_nm","",0);// wh_loc_nm
		}
	}
	else if(colStr == fix_grid04 + "dekit_sub_item_ea_qty")
	{
		var input_qty=Value;
		var sub_qty=eval(sheetObj.GetCellValue(row, fix_grid04 + "sub_item_ea_qty"));
		//음수체크
		if(Value < 0)
		{
			input_qty=Math.abs(Value);
			sheetObj.SetCellValue(row, col,input_qty,0);
		}
		//de-kit(ea)는 assign보다 클수없다.
		if(input_qty > sub_qty)
		{
			input_qty=sub_qty;
			sheetObj.SetCellValue(row, col,input_qty,0);
		}
		//CBM, KGS, LBS 계산
		var pkg_lv1_qty=eval(sheetObj.GetCellValue(row, fix_grid04 + "pkg_lv1_qty"));
		var lv1_cbm=eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_cbm"));
		var lv1_cbf=eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_cbf"));
		var lv1_grs_kgs=eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_grs_kgs"));
		var lv1_grs_lbs=eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_grs_lbs"));
		var lv1_net_kgs=eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_net_kgs"));
		var lv1_net_lbs=eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_net_lbs"));
		sheetObj.SetCellValue(row,  fix_grid04 + "dekit_sub_item_cbm",(pkg_lv1_qty * input_qty) * lv1_cbm,0);
		sheetObj.SetCellValue(row,  fix_grid04 + "dekit_sub_item_cbf",(pkg_lv1_qty * input_qty) * lv1_cbf,0);
		sheetObj.SetCellValue(row,  fix_grid04 + "dekit_sub_item_grs_kgs",(pkg_lv1_qty * input_qty) * lv1_grs_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid04 + "dekit_sub_item_grs_lbs",(pkg_lv1_qty * input_qty) * lv1_grs_lbs,0);
		sheetObj.SetCellValue(row,  fix_grid04 + "dekit_sub_item_net_kgs",(pkg_lv1_qty * input_qty) * lv1_net_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid04 + "dekit_sub_item_net_lbs",(pkg_lv1_qty * input_qty) * lv1_net_lbs,0);
	}
	else if (colStr == (fix_grid04+"dekit_sub_item_cbf") && Value != "") 
	{
		funcKGS_CBM_CAC("CBF_CBM", (fix_grid04+"dekit_sub_item_cbf"), (fix_grid04+"dekit_sub_item_cbm"), sheetObj);		
	} 
	else if (colStr == (fix_grid04+"dekit_sub_item_grs_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid04+"dekit_sub_item_grs_lbs"), (fix_grid04+"dekit_sub_item_grs_kgs"), sheetObj);		
	} 
	else if (colStr == (fix_grid04+"dekit_sub_item_net_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid04+"dekit_sub_item_net_lbs"), (fix_grid04+"dekit_sub_item_net_kgs"), sheetObj);		
	}
}
/*
 * sheet4 popupclick event
 */

function resultLocationInfo_sheet4(reqVal) {
	var sheetObj = sheet4;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
	    var rtnArr=doc[1].split('^@');
	    	if(rtnArr[0] != ""){
	    		sheetObj.SetCellValue(rowsh4, fix_grid04+"dekit_wh_loc_nm", rtnArr[1] ,0);
				sheetObj.SetCellValue(rowsh4, fix_grid04+"dekit_wh_loc_cd",rtnArr[0] ,0);
	    	}
	    	else{
	    		sheetObj.SetCellValue(rowsh4, fix_grid04+"dekit_wh_loc_nm", "",0);
				sheetObj.SetCellValue(rowsh4, fix_grid04+"dekit_wh_loc_cd", "",0);
	    	}
		}
		else{
			sheetObj.SetCellValue(rowsh4, fix_grid04+"dekit_wh_loc_nm", "",0);
			sheetObj.SetCellValue(rowsh4, fix_grid04+"dekit_wh_loc_cd", "",0);
		}
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
	
}
function sheet4_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	//var colValue = sheetObj.CellValue(Row, Col) ;
	with(sheetObj)
	{
		if(colName == fix_grid04 + "dekit_wh_loc_nm")
		{
			var sUrl="./WarehouseLocPopup.clt?f_loc_cd="+ sheetObj.GetCellValue(Row, fix_grid04 + "wh_cd") + "&f_putaway_flg=Y&f_move_flg=Y&f_wh_loc_nm="+sheetObj.GetCellValue(Row, fix_grid04 + "dekit_wh_loc_nm");
			callBackFunc = "setLocationInfo";
			modal_center_open(sUrl, callBackFunc, 700, 500, "yes");
		}
	}
}
/*
 * loc popupedit 완료후
 */
function setLocationInfo(rtnVal){
//	var sheetObj=$("#sheet4")[0];
//	var sheetObj = docObjects[3];
//	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid04+"dekit_wh_loc_cd",aryPopupData[0][1],0);// wh_loc_cd
//	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid04+"dekit_wh_loc_nm",aryPopupData[0][2],0);// wh_loc_nm
	
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj = docObjects[3];
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid04+"dekit_wh_loc_cd",rtnValAry[0],0);// wh_loc_cd
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid04+"dekit_wh_loc_nm",rtnValAry[1],0);// wh_loc_nm
    } 
}
/*
 * New Item Qty(EA) 변경시 sheet1의 required수량 재계산
 *                        measure정보 재계산
 */
function changeNewItemQty()
{
	var formObj=document.form;
	var qty=parseInt($("#kit_item_ea_qty").val());
	// sheet1의 required수량 재계산
	var sheetObj=docObjects[0];
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		var input_ea_qty=sheetObj.GetCellValue(i, fix_grid01 + "sub_item_unit_ea_qty");
		sheetObj.SetCellValue(i, fix_grid01 + "required_qty",qty * input_ea_qty,0);
 	}
	//measure정보 재계산
	changeMeasure();
}
/*
 * Measure정보를 수정한다.
 */
function changeMeasure()
{
	var formObj=document.form;
	var qty=parseInt($("#kit_item_ea_qty").val());
	if (!isNaN(qty)){
		var lv1_cbm=eval($("#kit_lv1_cbm").val()) * qty;
		var lv1_cbf=eval($("#kit_lv1_cbf").val()) * qty;
		var lv1_grs_kgs=eval($("#kit_lv1_grs_kgs").val()) * qty;
		var lv1_grs_lbs=eval($("#kit_lv1_grs_lbs").val()) * qty;
		var lv1_net_kgs=eval($("#kit_lv1_net_kgs").val()) * qty;
		var lv1_net_lbs=eval($("#kit_lv1_net_lbs").val()) * qty;
		$("#kit_item_cbm").val(lv1_cbm.toFixed(3));
		$("#kit_item_cbf").val(lv1_cbf.toFixed(3));
		$("#kit_item_grs_kgs").val(lv1_grs_kgs.toFixed(3));
		$("#kit_item_grs_lbs").val(lv1_grs_lbs.toFixed(3));
		$("#kit_item_net_kgs").val(lv1_net_kgs.toFixed(3));
		$("#kit_item_net_lbs").val(lv1_net_lbs.toFixed(3));
		chkCommaObj();
	}else {
		return; 	
	}
	
}
/*
 * sheet2의 unit, qty변경시 환산된 qty를 계산하여 sheet1의 assigned에 넣어준다. 
 */
function ChangeAssignedQty(sheetObj, item_sys_no)
{
	//--해당 item과 동일한 모든 item의 환산ea_qty를 합한다.
	var sum_ea_qty=0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(item_sys_no == sheetObj.GetCellValue(i, fix_grid02 + "sub_item_sys_no"))
		{
			sum_ea_qty += eval(sheetObj.GetCellValue(i, fix_grid02 + "sub_item_ea_qty"));
		}
 	}
	//--sheet1에 바인딩한다.
//	var sheetObj1=$("#sheet1")[0];
	var sheetObj1 = docObjects[0];
	var Row1=sheetObj1.FindText(fix_grid01 + "sub_item_sys_no", item_sys_no, sheetObj1.HeaderRows(), -1, true);
	//var Row1 = sheet2.GetSelectRow();
	sheetObj1.SetCellValue(Row1, fix_grid01 + "assigned_qty",sum_ea_qty,0);
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick = processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		//var srcName=ComGetEvent("name");		
		switch(srcName) {
		case "SEARCHLIST" :
			if(tabID == '01'){
				doWork('btn_search_kit');
			}else{
				doWork('btn_search2');
			}
			break;
		case "EXCEL" :
			if(tabID == '02'){
				doWork('btn_excel_dekit');
			}
			break;
		case "NEW" :
			if(tabID == '01'){
				doWork('btn_new_kit');
			}
			break;
		
		case "ADD" :
			if(tabID == '01'){
				doWork('btn_save_kit');
			}else{
				doWork('btn_save_dekit');
			}
			break;
		case "link_item" :
			btn_Item_Master();
			break;
		case "link_invmove" :
			btn_Inv_Move();
			break;
		case "btn_search_kit" :
			btn_Search('kit');
			break;
		case "btn_new_kit" :
			btn_New('kit');
			break;
		case "btn_save_kit" :
			btn_Save('kit');
			break;
		case "btn_print_kit" :
			btn_Print('kit');
			break;
		case "btn_search2" :
			btn_Search('dekit');
			break;
		case "btn_save_dekit" :
			btn_Save('dekit');
			break;
		case "btn_excel_dekit" :
			btn_Excel('dekit');
			break;
		case "kit_row_add1" :
			kit_row_add1();
			break;
		case "kit_row_add2" :
			kit_row_add2();
			break;
		case "kit_row_del1" :
			kit_row_del1() ;
			break;
		case "kit_row_del2" :
			kit_row_del2();
			break;
		case "btn_kit_dt":	
			if (document.getElementById('btn_kit_dt').disabled) {
				return;
			}
			var cal = new ComCalendar();
            cal.select(formObj.kit_dt, 'MM-dd-yyyy');
			break;
		case "btn_kit_exp_dt":	
			if (document.getElementById('btn_kit_exp_dt').disabled) {
				return;
			}
			var cal=new ComCalendar();
            cal.select(formObj.kit_exp_dt, 'MM-dd-yyyy');
			break;
		case "btn_dekit_fm_kit_dt":	
			var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.dekit_fm_kit_dt, formObj.dekit_to_kit_dt, 'MM-dd-yyyy');
			break;
		case "btn_dekit_to_kit_dt":	
			var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.dekit_fm_kit_dt, formObj.dekit_to_kit_dt, 'MM-dd-yyyy');
			break;
		case "btn_kit_ctrt_no" :
			if (document.getElementById('btn_kit_ctrt_no').disabled) {
				return;
			}
			if(changeContractInfo() == false)
			{
				return;
			}
			CtrtPopup(fix_kit);
			break;
		case "btn_dekit_ctrt_no" :
			CtrtPopup(fix_dekit);
			break;
		case "btn_kit_item_cd" :
			if (document.getElementById('btn_kit_item_cd').disabled) {
				return;
			}
			itemPopup(fix_kit);
			break;
		case "btn_kit_wh_loc_cd" :
			if (document.getElementById('btn_kit_wh_loc_cd').disabled) {
				return;
			}
			if(ComIsEmpty(formObj.kit_wh_combo.value))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				formObj.kit_wh_combo.focus();
				$("#kit_wh_loc_nm").val("");
				$("#kit_wh_loc_cd").val("");
				$("#kit_wh_loc_nm_org").val("");
				return;
			}
			whLocPopup(fix_kit);
			break;
		case "btn_dekit_wh_loc_cd" :
			if(ComIsEmpty(formObj.dekit_wh_combo.value))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				formObj.kit_wh_combo.focus();
				$("#dekit_wh_loc_nm").val("");
				$("#dekit_wh_loc_cd").val("");
				$("#dekit_wh_loc_nm_org").val("");
				return;
			}
			whLocPopup(fix_dekit);
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
 * kitting의 w/h정보가 변경시 sheet초기화 및 관련 필드 초기화
 */
function changeWhInfo()
{
	if(docObjects[0].RowCount()== 0 && docObjects[1].RowCount()== 0 && $("#kit_wh_loc_nm").val().trim() == "")
	{
		return true;
	}
	//confirm
	if(ComShowCodeConfirm("COM0363", "Warehouse") == false)
	{
		$("#kit_wh_cd").val($("#kit_wh_cd_org").val());
		$("#kit_wh_nm").val($("#kit_wh_nm_org").val());
		return false;
	}
	//sheet초기화
//	$("#sheet1")[0].RemoveAll();
	docObjects[0].RemoveAll();
//	$("#sheet2")[0].RemoveAll();
	docObjects[1].RemoveAll();
	//putaway location정보 초기화
	$("#kit_wh_loc_nm").val("");
	$("#kit_wh_loc_cd").val("");
	$("#kit_wh_loc_nm_org").val("");
	return true;
}
/*
 * kitting의 w/h정보가 변경시 sheet초기화 및 관련 필드 초기화
 */
function changeContractInfo()
{
//	if($("#sheet1")[0].RowCount()== 0 && $("#sheet2")[0].RowCount()== 0 && $("#kit_item_cd").val().trim() == "")
	if(docObjects[0].RowCount()== 0 && docObjects[1].RowCount()== 0 && $("#kit_item_cd").val().trim() == "")
	{
		return true;
	}
	//confirm
	if(ComShowCodeConfirm("COM0363", "Contract No") == false)
	{
		$("#kit_ctrt_no").val($("#kit_ctrt_no_org").val());
		$("#kit_ctrt_nm").val($("#kit_ctrt_nm_org").val());
		return false;
	}
	//sheet초기화
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	//Item관련정보 초기화
	$("#kit_item_cd").val("");
	$("#kit_item_nm").val("");
	$("#kit_item_sys_no").val("");
	$("#kit_item_grp_cd").val("");
	$("#kit_lv1_cbm").val("0");
	$("#kit_lv1_cbf").val("0");
	$("#kit_lv1_grs_kgs").val("0");
	$("#kit_lv1_grs_lbs").val("0");
	$("#kit_lv1_net_kgs").val("0");
	$("#kit_lv1_net_lbs").val("0");
	return true;
}
/*
 * NEW BUTTON
 */
function btn_New()
{
	var currLocUrl=this.location.href;
	var hasPlNo = currLocUrl.indexOf("kit_no");
	if(hasPlNo > 0){
		currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
		currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
	
		//parent.mkNewFrame(formObj.screen_title.value, currLocUrl);
		window.location.href = currLocUrl;
	}else{
		var form = document.form;
		form.in_kit_no.value = "";
		
		commonModeChange("KIT_NEW");
	}
}
/*
 * SEARCH BUTTON
 */
function btn_Search(tab_div)
{
	switch(tab_div)
	{
		case (fix_kit):
			searchKittingInfo();
			break;
		case (fix_dekit):
			searchDekittingHeaderInfo();
			break;
	}
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg){
//	check_authority_wh(fix_kit);
}
/*
 * search-kitiing tab information
 */
function searchKittingInfo()
{
	var formObj=document.form;
	//validation check
	if (validateForm(formObj, 'kit_search') == false) 
	{
		return;	
	}
	doShowProcess();
	setTimeout(function(){
		commonModeChange("KIT_NEW"); //데이터초기화
		var sheetObj1 = docObjects[0];
		var sheetObj2 = docObjects[1];
		formObj.f_cmd.value = SEARCH;
		var sXml = sheetObj1.GetSearchData("./searchWhKitItemGS.clt", FormQueryString(formObj, ""));
		if(sXml.replace(/\s/g,"") == ""){
			ComShowCodeMessage("COM0266", "Kitting No");
			formObj.in_kit_no.focus();
			doHideProcess();
			return;
		}else{
			for(var i=0; i<3; i++){
				if(i == 0){
					//ibSheetView Xml 을 HTML태그(Object) 오브젝트의 value 세팅
			   		displayData(sXml);
					commonModeChange("SEARCH_KIT");
				} else if(i == 1){
					formObj.f_cmd.value = SEARCH01;
					var sXml1 = sheetObj1.GetSearchData("./searchWhKitSubItemGS.clt", FormQueryString(formObj, ""));
//					var xml = convertColOrder(arrXml[i], fix_grid01);
					sheetObj1.LoadSearchData(sXml1, {Sync:1} );
				} else if(i == 2){
					formObj.f_cmd.value = SEARCH02;
					var sXml2 = sheetObj2.GetSearchData("./searchWhKitSubItemInvGS.clt", FormQueryString(formObj, ""));
//					var xml = convertColOrder(arrXml[i], fix_grid02);
					sheetObj2.LoadSearchData(sXml2, {Sync:1} );
				}
			}
		}
	},100);	
	chkCommaObj();
}
function sheet2_OnSearchEnd() {
	doHideProcess(false);
	mergeCell(2);
}
function sheet3_OnSearchEnd() {
	doHideProcess(false);
}
function sheet4_OnSearchEnd() {
	doHideProcess(false);
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
function displayData(xml){
	var xmlDoc = $.parseXML(xml);
	var $xml = $(xmlDoc);
	
	$("#kit_no").val($xml.find("kit_no").text());
	$("#in_kit_no").val($xml.find("kit_no").text());
	$("#kit_wh_combo").val($xml.find("kit_wh_cd").text());
	$("#kit_wh_nm").val($xml.find("kit_wh_nm").text());
	$("#kit_ctrt_no").val($xml.find("kit_ctrt_no").text());
	$("#kit_ctrt_nm").val($xml.find("kit_ctrt_nm").text());
	
	var dt = convDate($xml.find("kit_dt").text());
	//var date = dt.substring(0,2) + "-" + dt.substring(2,4) + "-" +dt.substring(4,8);
	
	$("#kit_dt").val(dt);
	$("#kit_hm_fr").val($xml.find("kit_hm_fr").text());
	$("#kit_hm_to").val($xml.find("kit_hm_to").text());
	$("#kit_item_cd").val($xml.find("kit_item_cd").text());
	$("#kit_item_nm").val($xml.find("kit_item_nm").text());
	$("#kit_item_grp_cd").val($xml.find("kit_item_grp_cd").text());
	$("#kit_item_ea_qty").val(convertNumber($xml.find("kit_item_ea_qty").text()));
	$("#kit_wh_loc_nm").val($xml.find("kit_wh_loc_nm").text());
	$("#kit_wh_loc_cd").val($xml.find("kit_wh_loc_cd").text());
	$("#kit_lot_no").val($xml.find("kit_lot_no").text());
	$("#kit_lot_id").val($xml.find("kit_lot_id").text());
	$("#kit_exp_dt").val($xml.find("exp_dt").text());
	$("#kit_lot_04").val($xml.find("kit_lot_04").text());
	$("#kit_lot_05").val($xml.find("kit_lot_05").text());
	$("#kit_ctrt_pic_nm").val($xml.find("kit_ctrt_pic_nm").text());
	$("#kit_supv_nm").val($xml.find("kit_supv_nm").text());
	$("#kit_worker_nm").val($xml.find("kit_worker_nm").text());
	$("#kit_item_cbm").val($xml.find("kit_item_cbm").text());
	$("#kit_item_cbf").val($xml.find("kit_item_cbf").text());
	$("#kit_item_grs_kgs").val($xml.find("kit_item_grs_kgs").text());
	$("#kit_item_grs_lbs").val($xml.find("kit_item_grs_lbs").text());
	$("#kit_item_net_kgs").val($xml.find("kit_item_net_kgs").text());
	$("#kit_item_net_lbs").val($xml.find("kit_item_net_lbs").text());
	$("#kit_item_sys_no").val($xml.find("kit_item_sys_no").text());
	$("#kit_rmk").val($xml.find("kit_rmk").text());
	var formObj=document.form;
	chkComma(formObj.kit_item_cbm,10,3);
	chkComma(formObj.kit_item_cbf,10,3);
	chkComma(formObj.kit_item_grs_kgs,10,3);
	chkComma(formObj.kit_item_net_kgs,10,3);
	chkComma(formObj.kit_item_net_lbs,10,3);
	chkComma(formObj.kit_item_grs_lbs,10,3);
}

/*
 * search-dekitiing tab header information(dekitting items selection)
 */
function searchDekittingHeaderInfo()
{
	var formObj=document.form;
	var sheetObj = docObjects[2];
	//validation check
	if (validateForm(formObj, 'dekit_search') == false) 
	{
		return;	
	}
	doShowProcess();
	setTimeout(function(){
		commonModeChange("SEARCH_DEKIT"); //데이터초기화
		//search
		formObj.f_cmd.value = SEARCH03;
		var sXml = sheetObj.GetSearchData("./searchBOMMgmtForDekittingHeaderGS.clt", FormQueryString(formObj, ""));
		sheetObj.LoadSearchData(sXml, {Sync:1} );
		//sheetObj.LoadSearchData(sXml, {Sync:1} );
	},100);	
}
/*
 * search-dekitiing tab detail information(compostion of kitting item)
 */
function searchDekittingDetailInfo(sheetObj, Row, Col, Value)
{
	var formObj = document.form;
	doShowProcess(true);
	var sheetObj4 = docObjects[3];
	//search
	doShowProcess();
	setTimeout(function(){
		formObj.f_cmd.value = SEARCH04;
		var sParam=FormQueryString(formObj, "");
		var sXml = sheetObj4.GetSearchData("./searchBOMMgmtForDekittingDetailGS.clt", "kit_no=" + sheetObj.GetCellValue(Row, fix_grid03+"kit_no") + "&dekit_item_ea_qty=" + sheetObj.GetCellValue(Row, fix_grid03+"dekit_item_ea_qty")+"&"+sParam);
		sheetObj4.LoadSearchData(sXml, {Sync:1} );
	
	//button change
	commonModeChange("SEARCH_DEKITDT"); 
	},100);
}
/*
 * save
 */
function btn_Save(tab_div)
{
	switch(tab_div)
	{
		case (fix_kit):
			saveKittingInfo();
			break;
		case (fix_dekit):
			saveDekittingInfo();
			break;
	}	
}
/*
 * save-kitiing tab information
 */
function saveKittingInfo()
{
	var formObj = document.form;
	var sheetObj1 = docObjects[0];
	var sheetObj2 = docObjects[1];
	var sheetObj5 = docObjects[4];
	//validation check
	if (validateForm(formObj, 'kit_save') == false) 
	{
		return;
	}
	//confirm     
	if(!ComShowCodeConfirm("COM0063"))
	{ 
		return;
	}
	
	formObj.f_cmd.value = MULTI;
	var docinParamter = FormQueryString(formObj, "Docin");
	var sheetDatas1 = sheetObj1.GetSaveString(); 
	var sheetDatas2 = sheetObj2.GetSaveString(); 
 	//var saveXml = sheetObj1.GetSaveData("./saveBOMMgmtForKitting.clt", docinParamter+"&"+sheetDatas1+"&"+sheetDatas2);
 	var saveXml = sheetObj5.GetSaveData("./saveBOMMgmtForKitting.clt", docinParamter+"&"+sheetDatas1+"&"+sheetDatas2);
	sheetObj1.LoadSaveData(saveXml);
	//1. Save 후 재조회
	//SaveEnd
	if( saveXml.indexOf('<MESSAGE>') == -1){
//			ComShowCodeMessage("COM0093");//저장이완료되었습니다.
		//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		
		var kit_no = displayData_sheet(saveXml, "kit_no");
		$("#in_kit_no").val(kit_no);
		btn_Search(fix_kit);
	}
	
}
/*
 * save-dekitiing tab information
 */
function saveDekittingInfo()
{
	var formObj = document.form;
	var sheetObj3 = docObjects[2];
	var sheetObj4 = docObjects[3];
	//validation check
	if (validateForm(formObj, 'dekit_save') == false) 
	{
		return;
	}
	//confirm     
	if(!ComShowCodeConfirm("COM0063"))
	{ 
		return;
	}

	var sheetDatas3 = ComGetSaveString(sheetObj3, true, false); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
	var sheetDatas4 = ComGetSaveString(sheetObj4, true, false); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
 	var saveXml = sheetObj3.GetSaveData("./saveBOMMgmtForDekitting.clt?f_cmd="+MULTI01, sheetDatas3+"&"+sheetDatas4);
	sheetObj3.LoadSaveData(saveXml);
	//1. Save 후 재조회
	//SaveEnd
	if( saveXml.indexOf('<MESSAGE>') == -1){
//			ComShowCodeMessage("COM0093");//저장이완료되었습니다.
		//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		btn_Search(fix_dekit);
	}
	
}
function chkCommaObj(){
	var formObj=document.form;
	chkComma(formObj.kit_item_cbm,10,3);
	chkComma(formObj.kit_item_cbf,10,3);
	chkComma(formObj.kit_item_grs_kgs,10,3);
	chkComma(formObj.kit_item_grs_lbs,10,3);
	chkComma(formObj.kit_item_net_kgs,10,3);
	chkComma(formObj.kit_item_net_lbs,10,3);
}

/*
 * 엑셀다운로드
 */
function btn_Excel(tab_div) {	
	if(docObjects[3].RowCount() < 1){
		ComShowCodeMessage("COM132501");
	}else{
		//docObjects[3].Down2Excel( {DownCols: makeHiddenSkipCol(sheet4), SheetDesign:1,Merge:1 });
		docObjects[3].Down2Excel( {DownCols: '0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43', SheetDesign:1, Merge:1 });
	}
}
/*
 * 프린트
 */
function btn_Print(tab_div)
{
}
/*
 * Composition of new item add button
 */
function kit_row_add1()
{
	var formObj=document.form;
	if (validateForm(formObj, 'kit_row_add1') == false) 
	{
		return;
	}
//	var sheetObj=$("#sheet1")[0];
	var sheetObj=docObjects[0];
	var row=sheetObj.DataInsert(-1); // 현재 선택된 행의 바로 아래에 생성
}
/*
 * Composition of new item add button
 */
function kit_row_add2()
{
	var formObj=document.form;
	if (validateForm(formObj, 'kit_row_add2') == false) 
	{
		return;
	}
//	var sheetObj=$("#sheet1")[0];
	var sheetObj=docObjects[0];
	//STOCK SELECTION 팝업
	var sParam="ctrt_no=" + ComGetObjValue(formObj.kit_ctrt_no);
	sParam += "&ctrt_nm=" + ComGetObjValue(formObj.kit_ctrt_nm);
//	sParam += "&wh_cd=" + ComGetObjValue(formObj.kit_wh_combo.value);
	sParam += "&wh_cd=" + $("#kit_wh_combo").val();
	var t = document.getElementById("kit_wh_combo");
	var selectedText = t.options[t.selectedIndex].text;
	sParam += "&wh_nm=" + selectedText;		
	sParam += "&owner_cd=" + "";
	sParam += "&owner_nm=" + "";
	sParam += "&call_tp=M";	
	sParam += "&item_cd=" + sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "sub_item_cd");
	sParam += "&item_nm=" + sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "sub_item_nm");
	sParam += "&f_move_flg=Y"; //가능재고 체크를 위하여
	sParam += "&f_putaway_flg=Y"; //가능재고 체크를 위하여
	var sUrl="./WHOutStockSelectPopup.clt?" + sParam;	
	callBackFunc = "setStockInfo";
	modal_center_open(sUrl, callBackFunc, 1280, 720, "yes");
}
/*
 * stock select popup callback func
 */
function setStockInfo(aryPopupData){	
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		return;
	}else{
		var sheetObj=sheet2;
		var prefix="Grd02";
		var rows = "";
		if(aryPopupData != null && aryPopupData != "" && aryPopupData != undefined && aryPopupData != 'undefined'){
			for(var k=0; k < aryPopupData.length; k++){
					//var wib_bk_no=aryPopupData[k][9]; 
					var po_sys_no=aryPopupData[k]["po_sys_no"];
					var item_sys_no=aryPopupData[k]["item_sys_no"];
					var lot_id=aryPopupData[k]["fix_lot_id"];
					var sub_wh_loc_cd=aryPopupData[k]["wh_loc_cd"];
					var sub_item_ser_no=aryPopupData[k]["item_ser_no"];
					var sub_item_lic_plat_no=aryPopupData[k]["lic_plat_no"];
					var key=item_sys_no.trim() + "|" + po_sys_no.trim() + "|" + lot_id + "|" + sub_wh_loc_cd+ "|"+ sub_item_ser_no + "|" + sub_item_lic_plat_no;
					//sheet중복건 체크
					var cnt=0;
					for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
						var key1 = sheetObj.GetCellValue(i, fix_grid02 + "sub_item_sys_no") + "|"
						 +sheetObj.GetCellValue(i, fix_grid02 + "sub_po_sys_no")   + "|"
						 +sheetObj.GetCellValue(i, fix_grid02 + "sub_lot_id")      + "|"
						 +sheetObj.GetCellValue(i, fix_grid02 + "sub_wh_loc_cd")   + "|"
						 +sheetObj.GetCellValue(i, fix_grid02 + "sub_item_ser_no") + "|"
						 +sheetObj.GetCellValue(i, fix_grid02 + "sub_item_lic_plat_no");
						if(key == key1)
						{
							cnt ++;
							break;
						}
					}
				if(cnt >= 0){
					var insertRow=sheetObj.DataInsert(-1);
					row = insertRow;
					sheetObj.SetCellValue(insertRow, prefix+"po_sys_no",aryPopupData[k]["po_sys_no"],0);
					sheetObj.SetCellValue(insertRow, prefix+"sub_item_sys_no",aryPopupData[k]["item_sys_no"],0);
					sheetObj.SetCellValue(insertRow, prefix+"sub_item_cd",aryPopupData[k]["item_cd"],0);
					sheetObj.SetCellValue(insertRow, prefix+"sub_item_nm",aryPopupData[k]["item_nm"],0);
					sheetObj.SetCellValue(insertRow, prefix+"inbound_dt",aryPopupData[k]["inbound_dt"],0);
					sheetObj.SetCellValue(insertRow, prefix+"lot_no",aryPopupData[k]["lot_no"],0);
					sheetObj.SetCellValue(insertRow, prefix+"sub_lot_id",aryPopupData[k]["fix_lot_id"],0);
					sheetObj.SetCellValue(insertRow, prefix+"sub_wh_loc_cd",aryPopupData[k]["wh_loc_cd"],0);
					sheetObj.SetCellValue(insertRow, prefix+"sub_wh_loc_cd_nm",aryPopupData[k]["wh_loc_cd_nm"],0);
					sheetObj.SetCellValue(insertRow, prefix+"stock_qty",aryPopupData[k]["stock_qty"],0);
					sheetObj.SetCellValue(insertRow, prefix+"exp_dt",aryPopupData[k]["exp_dt"],0);
					sheetObj.SetCellValue(insertRow, prefix+"lot_04",aryPopupData[k]["lot_04"],0);
					sheetObj.SetCellValue(insertRow, prefix+"lot_05",aryPopupData[k]["lot_05"],0);
					sheetObj.SetCellValue(insertRow, prefix+"sub_wib_bk_no",aryPopupData[k]["wib_bk_no"],0);
					sheetObj.SetCellValue(insertRow, prefix+"sub_item_so_no",aryPopupData[k]["so_no"],0);
					sheetObj.SetCellValue(insertRow, prefix+"sub_item_po_no",aryPopupData[k]["po_no"],0);
					sheetObj.SetCellValue(insertRow, prefix+"sub_item_ser_no",aryPopupData[k]["item_ser_no"],0);
					sheetObj.SetCellValue(insertRow, prefix+"sub_item_lic_plat_no",aryPopupData[k]["lic_plat_no"],0);
					sheetObj.SetCellValue(insertRow, prefix+"sub_item_seq",aryPopupData[k]["item_seq"],0);
					sheetObj.SetCellValue(insertRow, prefix+"pkg_lv1_qty",aryPopupData[k]["pkg_lv1_qty"],0);
					
					sheetObj.SetCellValue(insertRow, prefix+"lv1_cbm",aryPopupData[k]["lv1_cbm"],0);
					sheetObj.SetCellValue(insertRow, prefix+"lv1_cbf",aryPopupData[k]["lv1_cbf"],0);
					sheetObj.SetCellValue(insertRow, prefix+"lv1_grs_kgs",aryPopupData[k]["lv1_grs_kgs"],0);
					sheetObj.SetCellValue(insertRow, prefix+"lv1_grs_lbs",aryPopupData[k]["lv1_grs_lbs"],0);
					sheetObj.SetCellValue(insertRow, prefix+"lv1_net_kgs",aryPopupData[k]["lv1_net_kgs"],0);
					sheetObj.SetCellValue(insertRow, prefix+"lv1_net_lbs",aryPopupData[k]["lv1_net_lbs"],0);
					sheetObj.ColumnSort(prefix+"sub_item_cd");
				} else ComShowCodeMessage("COM0004","Kitting Item");
			}
		}
	}
	mergeCell(2);
}
function convertNumber(obj){
	obj = obj.replace('.','');
	var leng=obj.length;
	var result=obj;
	var cut="";
	var i=0;
	if (leng > 3){
		result = obj.substring(0,leng-3);
	}
	return result;
}
/*
 * kit_row_del1
 */
function kit_row_del1()
{
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	if(ComShowCodeConfirm("COM0362") == false){
		return;
	}
	//가져온 행을 배열로 만들기 
	var arrRow=sRow.split("|"); //결과 : "1|3|5|"
//	for (var i=arrRow.length-2; i>=0; i--){
	for (var i=arrRow.length-1; i>=0; i--){
		//sheet2에 해당 item 전체삭제
		var item_cd=sheetObj.GetCellValue(arrRow[i], fix_grid01 + "sub_item_cd");
		for(var m=sheetObj2.LastRow(); m>=sheetObj2.HeaderRows(); m--)
		{
			if(sheetObj2.GetCellValue(m, fix_grid02 + "sub_item_cd") == item_cd)
			{
				sheetObj2.RowDelete(m, false);
			}
		}
		//check건삭제
		sheetObj.RowDelete(arrRow[i], false);
	}
}
/*
 * kit_row_del2
 */
function kit_row_del2()
{
//	var sheetObj=$("#sheet2")[0];
	var sheetObj=docObjects[1];
	var sRow=sheetObj.FindCheckedRow(fix_grid02 + "chk");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	//가져온 행을 배열로 만들기 
	var arrRow=sRow.split("|"); //결과 : "1|3|5|"
	//삭제전 해당 체크건들의 item_cd를 알아내기위한 변수 선언
	var item_chk_arr=new Array();
	var item_chk=""; //indexof용으로만 사용
	//삭제처리
//	for (var i=arrRow.length-2; i>=0; i--){
	for (var i=arrRow.length-1; i>=0; i--){
		//삭제전 필요정보 생성
		var item_sys_no=sheetObj.GetCellValue(arrRow[i], fix_grid02 + "sub_item_sys_no");
		if(item_chk.indexOf(item_sys_no) == -1)
		{
			item_chk_arr.push(item_sys_no);
			item_chk=item_chk + item_sys_no + ",";
		}
		//삭제처리
		sheetObj.RowDelete(arrRow[i], false);
		}
	//완료후 ea_qty재계산하여 sheet1 assigned에 재바인딩
	for(var m=0; m<item_chk_arr.length;m++)
	{
		ChangeAssignedQty(sheetObj, item_chk_arr[m]);
	}
}
function btn_Item_Master()
{
	if (document.getElementById('link_item').disabled) {
		return;
	}
	var sUrl="./ITMgmt.clt";
	parent.mkNewFrame('Item Management', sUrl, "ITMgmt_");
}
function btn_Inv_Move()
{
	if (document.getElementById('link_invmove').disabled) {
		return;
	}
	var sUrl="./InvMoveMgmt.clt";
	parent.mkNewFrame('Inventory Movement & Hold & Damage Managemet', sUrl, "InvMoveMgmt_");
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) 
		{
		case 'kit_search':
			if(ComIsEmpty(formObj.in_kit_no))
			{
				ComShowCodeMessage("COM0114","Kitting No");
				$("#in_kit_no").focus();
				return false;
			}
			break;
		case 'kit_row_add1':
			//warehouse 필수로 입력되어야함.
			if(ComIsEmpty(formObj.kit_wh_combo.value))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				$("#kit_wh_cd").focus();
				return false;
			}
			//contract no 필수로 입력되어야함.
			if(ComIsEmpty(formObj.kit_ctrt_no))
			{
				ComShowCodeMessage("COM0114","Contract No");
				$("#kit_ctrt_no").focus();
				return false;
			}
		break;
		case 'kit_row_add2':
			//warehouse 필수로 입력되어야함.
			if(ComIsEmpty(formObj.kit_wh_combo.value))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				$("#kit_wh_cd").focus();
				return false;
			}
			//contract no 필수로 입력되어야함.
			if(ComIsEmpty(formObj.kit_ctrt_no))
			{
				ComShowCodeMessage("COM0114","Contract No");
				$("#kit_ctrt_no").focus();
				return false;
			}
			//선택한 row가 없을경우
//			var sheetObj=$("#sheet1")[0];
			var sheetObj=docObjects[0];
			var sel=sheetObj.GetSelectRow();
			if(sel < 0)
			{
				ComShowCodeMessage("COM0228");
				return false;
			}
			//item_cd가 없을경우
			if(sheetObj.GetCellValue(sel, fix_grid01 + "sub_item_cd").trim() == "")
			{
				ComShowCodeMessage("COM0114","Item Code");
				sheetObj.SelectCell(sel, fix_grid01 +  "sub_item_cd");
				return false;
			}
		break;
		case 'kit_save':
			//warehouse 필수로 입력되어야함.
			if(ComIsEmpty(formObj.kit_wh_combo.value))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				$("#kit_wh_cd").focus();
				return false;
			}
			//contract no 필수로 입력되어야함.
			if(ComIsEmpty(formObj.kit_ctrt_no))
			{
				ComShowCodeMessage("COM0114","Contract No");
				$("#kit_ctrt_no").focus();
				return false;
			}
			//kit date 필수로 입력되어야함.
			if(ComIsEmpty(formObj.kit_dt)){
				ComShowCodeMessage("COM0114","Kitting Date");
				$("#kit_dt").focus();
				return false;
			}
//			if(ComIsEmpty(formObj.kit_hm_fr)){
//				ComShowCodeMessage("COM0114","Kitting Date");
//				$("#kit_hm_fr").focus();
//				return false;
//			}
//			if(ComIsEmpty(formObj.kit_hm_to)){
//				ComShowCodeMessage("COM0114","Kitting Date");
//				$("#kit_hm_to").focus();
//				return false;
//			}
			//item code 필수로 입력되어야함.
			if(ComIsEmpty(formObj.kit_item_cd)){
				ComShowCodeMessage("COM0114","New Item Code");
				$("#kit_item_cd").focus();
				return false;
			}
			//item qty 필수로 입력되어야함.
			if(ComIsEmpty(formObj.kit_item_ea_qty)){
				ComShowCodeMessage("COM0114","New Item Qty(EA)");
				$("#kit_item_ea_qty").focus();
				return false;
			}
			//item qty는 0보다 커야함.
			var qty=parseInt($("#kit_item_ea_qty").val());
			if(qty <= 0)
			{
				ComShowCodeMessage("COM0360","New Item Qty(EA)");
				$("#kit_item_ea_qty").focus();
				return false;
			}
			//Putaway Location 필수로 입력되어야함.
			if(ComIsEmpty(formObj.kit_wh_loc_cd)){
				ComShowCodeMessage("COM0114","Putaway Location");
				$("#kit_wh_loc_nm").focus();
				return false;
			}
			//LOT NO, LOT04, LOT05 자리수 체크
			if(ComGetLenByByte($("#kit_lot_no").val().trim()) > 20)
			{
				ComShowCodeMessage("COM0215", "New Item Lot[20]");
				$("#kit_lot_no").focus();
				return false;
			}
			if(ComGetLenByByte($("#kit_lot_04").val().trim()) > 20)
			{
				ComShowCodeMessage("COM0215", "LOT 04[20]");
				$("#kit_lot_04").focus();
				return false;
			}
			if(ComGetLenByByte($("#kit_lot_05").val().trim()) > 20)
			{
				ComShowCodeMessage("COM0215", "LOT 05[20]");
				$("#kit_lot_05").focus();
				return false;
			}
			//ContactPIC 자리수 체크
			if(ComGetLenByByte($("#kit_ctrt_pic_nm").val().trim()) > 100)
			{
				ComShowCodeMessage("COM0215", "Contract PIC[100]");
				$("#kit_ctrt_pic_nm").focus();
				return false;
			}
			//Supervisor 자리수 체크
			if(ComGetLenByByte($("#kit_supv_nm").val().trim()) > 100)
			{
				ComShowCodeMessage("COM0215", "Supervisor[100]");
				$("#kit_supv_nm").focus();
				return false;
			}
			//Worker 자리수 체크
			if(ComGetLenByByte($("#kit_worker_nm").val().trim()) > 100)
			{
				ComShowCodeMessage("COM0215", "Worker[100]");
				$("#kit_worker_nm").focus();
				return false;
			}
			//Remark 자리수 체크
			if(ComGetLenByByte($("#kit_rmk").val().trim()) > 1000)
			{
				ComShowCodeMessage("COM0215", "Remark[1000]");
				$("#kit_rmk").focus();
				return false;
			}
			if($("#kit_mode").val() == "KIT_NEW")
			{
//				var sheetObj1=$("#sheet1")[0];
				var sheetObj1=docObjects[0];
//				var sheetObj2=$("#sheet2")[0];
				var sheetObj2=docObjects[1];
				//SHEET1 체크
				if(sheetObj1.RowCount()== 0)
				{
					ComShowCodeMessage("COM0361", "Composition of New Item");
					return false;
				}
				//SHEET2 체크
				if(sheetObj2.RowCount()== 0)
				{
					ComShowCodeMessage("COM0361", "Kitting items selection");
					return false;
				}
				//SHEET1 세부사항체크
				//new item code와 동일한 코드가 composition of new item list에 존재하는지 확인
				var Row1=sheetObj1.FindText(fix_grid01 + "sub_item_sys_no", $("#kit_item_sys_no").val().trim(), sheetObj1.HeaderRows(), -1, true);
				if(Row1 >= 0)
				{
					ComShowCodeMessage("COM0122","Item Code");
					sheetObj1.SelectCell(Row1, fix_grid01 + "sub_item_cd");
					return false;
				}
				//SHEET2 세부사항체크
				for(var i=sheetObj2.HeaderRows(); i<=sheetObj2.LastRow();i++){
					var stock_qty=eval(sheetObj2.GetCellValue(i, fix_grid02 + "stock_qty"));
					var ea_qty=eval(sheetObj2.GetCellValue(i, fix_grid02 + "sub_item_ea_qty"));
					//sheet2의 ea_qty가 stock보다 큰경우 체크
					if(stock_qty < ea_qty)
					{
						ComShowCodeMessage("COM0364", (stock_qty), (ea_qty));
						sheetObj2.SelectCell(i, fix_grid02 + "sub_item_ea_qty");
						return false;
					}
				}
				//SHEET1 세부사항체크
				for(var m=sheetObj1.HeaderRows(); m<=sheetObj1.LastRow();m++){
					var item_sys_no=sheetObj1.GetCellValue(m, fix_grid01 + "sub_item_sys_no").trim();
					var sub_item_unit_ea_qty=sheetObj1.GetCellValue(m, fix_grid01 + "sub_item_unit_ea_qty");
					var required_qty=eval(sheetObj1.GetCellValue(m, fix_grid01 + "required_qty"));
					var assigned_qty=eval(sheetObj1.GetCellValue(m, fix_grid01 + "assigned_qty"));
					//item이 없는경우 체크
					if(item_sys_no == "")
					{
						ComShowCodeMessage("COM0114","Item Code");
						sheetObj1.SelectCell(m, fix_grid01 +  "sub_item_cd");
						return false;
					}
					//qty / 1 item(ea)가 0일경우
					if(sub_item_unit_ea_qty <= 0)
					{
						ComShowCodeMessage("COM0114","Qty/1 Item(EA)");
						sheetObj1.SelectCell(m, fix_grid01 +  "sub_item_unit_ea_qty");
						return false;
					}
					//required <> assigned 일경우 체크
					if(required_qty != assigned_qty)
					{					
						ComShowCodeMessage("COM0365");
						sheetObj1.SelectCell(m, fix_grid01 +  "sub_item_cd");
						return false;
					}
				}
			}
			break;
		case 'dekit_search' :
			//warehouse 필수로 입력되어야함.
			if(ComIsEmpty(formObj.dekit_wh_combo.value))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				$("#dekit_wh_cd").focus();
				return false;
			}
			//contract no 필수로 입력되어야함.
			if(ComIsEmpty(formObj.dekit_ctrt_no))
			{
				ComShowCodeMessage("COM0114","Contract No");
				$("#dekit_ctrt_no").focus();
				return false;
			}					
			//날짜
			if(ComIsEmpty(formObj.in_dekit_no) && ComIsEmpty(formObj.dekit_fm_kit_dt) && ComIsEmpty(formObj.dekit_to_kit_dt))
			{
				ComShowCodeMessage("COM0114","Kitting Date");
				$("#dekit_fm_kit_dt").focus();
				return false;
			}
			if(!ComIsEmpty(formObj.dekit_fm_kit_dt) && ComIsEmpty(formObj.dekit_to_kit_dt)){
				formObj.dekit_to_kit_dt.value=ComGetNowInfo();
			}
			/* 3개월 duration 주석
			if (!ComIsEmpty(formObj.dekit_fm_kit_dt) && getDaysBetween2(formObj.dekit_fm_kit_dt.value, formObj.dekit_to_kit_dt.value)> 92) {
				ComShowCodeMessage("COM0141","3","(Kitting Date)");
				formObj.dekit_fm_kit_dt.focus();
				return false;
			}
			*/
			if (!ComIsEmpty(formObj.dekit_fm_kit_dt) && !isDate(formObj.dekit_fm_kit_dt)) {
				ComShowCodeMessage("COM0114","Kitting Date");
				formObj.dekit_fm_kit_dt.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.dekit_to_kit_dt) && !isDate(formObj.dekit_to_kit_dt)) {
				ComShowCodeMessage("COM0114","Kitting Date");
				formObj.dekit_to_kit_dt.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.dekit_fm_kit_dt)&&ComIsEmpty(formObj.dekit_to_kit_dt))||(ComIsEmpty(formObj.dekit_fm_kit_dt)&&!ComIsEmpty(formObj.dekit_to_kit_dt))) {
				ComShowCodeMessage("COM0122","Kitting Date");
				formObj.dekit_fm_kit_dt.focus();
				return false;
			}
			if (getDaysBetween2(formObj.dekit_fm_kit_dt.value, formObj.dekit_to_kit_dt.value)<0) {
				ComShowCodeMessage("COM0122","Kitting Date");
				formObj.dekit_fm_kit_dt.focus();
				return false;
			}
			break;
		case 'dekit_save':
//			var sheetObj3=$("#sheet3")[0];
//			var sheetObj4=$("#sheet4")[0];
			var sheetObj3=docObjects[2];
			var sheetObj4=docObjects[3];
			var to_curr_cnt=0;
			var fr_curr_cnt=0 ;
			//----- sheet3에서 dbclick된 row의 de-kit qty확인
			var sRow=sheetObj3.FindText(fix_grid03 + "clickflag", "U", sheetObj3.HeaderRows(), -1, true);
			if(sRow < 0)
			{
				ComShowCodeMessage("COM0228");
				return false;
			}
			var dekit_qty=eval(sheetObj3.GetCellValue(sRow, fix_grid03 + "dekit_item_ea_qty"));
			if(dekit_qty <= 0)
			{
				ComShowCodeMessage("COM0114","De-Kit(EA)");
				sheetObj3.SelectCell(sRow, fix_grid03 +  "dekit_item_ea_qty");
				return false;
			}
			//----- sheet4 row확인
			for(var i=sheetObj4.HeaderRows(); i<=sheetObj4.LastRow();i++){
				var to_ea_qty=eval(sheetObj4.GetCellValue(i, fix_grid04 + "dekit_sub_item_ea_qty"));
				var wh_loc_cd=sheetObj4.GetCellValue(i, fix_grid04 + "dekit_wh_loc_cd").trim();
				//--수량이 0보다 큰경우 wh_loc_cd체크
				if(to_ea_qty > 0 && wh_loc_cd == "")
				{
					ComShowCodeMessage("COM0114","Dekit Location");
					sheetObj4.SelectCell(i, fix_grid04 +  "dekit_wh_loc_nm");
					return false;
				}
				//--수량이 0일때 wh_loc_cd가 입력된 경우 qty는 0보다 커야한다.
				if(to_ea_qty <= 0 && wh_loc_cd != "")
				{
					ComShowCodeMessage("COM0114","Dekit Qty");
					sheetObj4.SelectCell(i, fix_grid04 +  "dekit_sub_item_ea_qty");
					return false;
				}
				//key filed에서 걸리지 않게하기위해서 실제 전송될 데이터만 ibflag를 재변경한다.
				//component qty가 변할대 ibflag가 U로 바뀌므로... --> 실제 LOC와 QTY가 존재건만 U로.. 나머지는 ''로...
				if(to_ea_qty <= 0 && wh_loc_cd == "")
				{
					sheetObj4.SetCellValue(i, fix_grid04 + "ibflag","",0);
				}
				else
				{
					sheetObj4.SetCellValue(i, fix_grid04 + "ibflag","U",0);
				}
				//--dekit qty의 합이 component qty보다 작은지 체크
				to_curr_cnt=to_curr_cnt + to_ea_qty;
				var div="";
				if(i + 1 > sheetObj4.LastRow()) //마지막
				{
					fr_curr_cnt=eval(sheetObj4.GetCellValue(i, fix_grid04 + "component_qty"));
					div="E";
				}
				else
				{
					if(sheetObj4.GetCellValue(i, fix_grid04 + "sub_item_sys_no").trim() != sheetObj4.GetCellValue(i + 1, fix_grid04 + "sub_item_sys_no").trim())
					{
						fr_curr_cnt=eval(sheetObj4.GetCellValue(i, fix_grid04 + "component_qty"));
						div="E";
					}
				}
				if(div == "E")
				{
					//--DEKIT QTY가 모두 0일경우
//					if(to_curr_cnt <= 0)
//					{
//						var item_cd = sheetObj4.CellValue(i, fix_grid04 + "sub_item_cd");
//						ComShowCodeMessage("COM0114","De-kit(EA)-Item[" + item_cd + "]");
//						return false;
//					}
					//--수량체크
					if(fr_curr_cnt != to_curr_cnt)
					{
						ComShowCodeMessage("COM0366",fr_curr_cnt, to_curr_cnt);
						sheetObj4.SelectCell(i, fix_grid04 +  "dekit_sub_item_ea_qty");
						return false;
					}
					//--초기화
					to_curr_cnt=0; 
				}
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
}
function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
    var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "in_kit_no":	
				btn_Search(fix_kit);
				break;	
			case "dekit_lot_no":	
				btn_Search(fix_dekit);
				break;	
			case "in_dekit_no":	
				btn_Search(fix_dekit);
				break;
			case "dekit_item_cd":	
				btn_Search(fix_dekit);
				break;
			default:		
				if(!(t.readOnly)){
				}
				break;
		}
	}
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
}

/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(div){
	var param="";
	if(div == fix_kit)
	{
		param="ctrt_no="+$("#" + div + "_ctrt_no").val() + "&" + "ctrt_nm=" + $("#" + div + "_ctrt_nm").val();
	}
	else
	{
		param="ctrt_nm="+$("#" + div + "_ctrt_nm").val() + "&" + "ctrt_no=" + $("#" + div + "_ctrt_no").val();
	}
	callBackFunc = "setCtrtNoInfo_" + div;
	var sUrl="./ContractRoutePopup.clt?" + param;
	modal_center_open(sUrl, callBackFunc, 900, 580, "yes");
}
/*
 * NAME 엔터시 팝업호출 - item name
 */
function itemPopup(div){
	var formObj=document.form;
	if(div == fix_kit)
	{
		// Contract No 체크
		if (isNull(formObj.kit_ctrt_no)) {
			ComShowCodeMessage("COM0278", "Contract No");
			$("#kit_item_cd").val("");
			$("#kit_item_nm").val("");
			$("#kit_item_sys_no").val("");
			$("#kit_item_grp_cd").val("");
			$("#kit_lv1_cbm").val("0");
			$("#kit_lv1_cbf").val("0");
			$("#kit_lv1_grs_kgs").val("0");
			$("#kit_lv1_grs_lbs").val("0");
			$("#kit_lv1_net_kgs").val("0");
			$("#kit_lv1_net_lbs").val("0");
			$("#kit_ctrt_no").focus();
			return;
		}
	}

	callBackFunc = "setItem_" + div;
	var sUrl = "./CtrtItemPopup.clt?ctrt_no="+$("#" + div + "_ctrt_no").val()+"&item_cd="+$("#" + div + "_item_cd").val()+ "&item_nm="+$("#" + div + "_item_nm").val()+"&item_grp_cd_include_yn=Y&item_grp_cd=KIT";
	modal_center_open(sUrl, callBackFunc, 400, 520, "yes");
}

function whLocPopup(div)
{
	var formObj=document.form;
	var temp ='';
	if(div == 'kit')
		{
			temp = formObj.kit_wh_combo.value;
			temp1 = formObj.kit_wh_loc_nm.value;
		}
	else
		{
			temp = formObj.dekit_wh_combo.value;
			temp1 = formObj.dekit_wh_loc_nm.value;
		}
	
	callBackFunc = "setLocInfo_" + div;
//	var sUrl = "./WarehouseLocPopup.clt?f_loc_cd="+ eval("formObj."+div+"_wh_combo").value + "&f_putaway_flg=Y&f_move_flg=Y";
	var sUrl = "./WarehouseLocPopup.clt?f_loc_cd="+ temp + "&f_putaway_flg=Y&f_move_flg=Y" + "&wh_loc_nm=" + temp1;
	modal_center_open(sUrl, callBackFunc, 700, 500, "yes");	
}
/*
 * 팝업 관련 로직 시작
 */
function setWhInfo_kit(aryPopupData){
	setWhInfo(aryPopupData, fix_kit);
}
function setWhInfo_dekit(aryPopupData){
	setWhInfo(aryPopupData, fix_dekit);
}
function setWhInfo(rtnVal, div)
{
//	$("#" + div + "_wh_cd").val(aryPopupData[0][1]);
//	$("#" + div + "_wh_nm").val(aryPopupData[0][2]);
//	if(div == fix_kit)
//	{
//		$("#" + div + "_wh_cd_org").val(aryPopupData[0][1]);
//		$("#" + div + "_wh_nm_org").val(aryPopupData[0][2]);
//	}
	var formObj=document.form;
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   $("#" + div + "_wh_cd").val(rtnValAry[0]);
		   $("#" + div + "_wh_nm").val(rtnValAry[1]);
		   if(div == fix_kit)
		   {
				$("#" + div + "_wh_cd_org").val(rtnValAry[1]);
				$("#" + div + "_wh_nm_org").val(rtnValAry[2]);
		   }
	   } 	
}
function setCtrtNoInfo_kit(aryPopupData){
	setCtrtInfo(aryPopupData, fix_kit);
}
function setCtrtNoInfo_dekit(aryPopupData){
	setCtrtInfo(aryPopupData, fix_dekit);
}
function setCtrtInfo(rtnVal, div)
{
//	$("#" + div + "_ctrt_no").val(aryPopupData[0][0]);
//	$("#" + div + "_ctrt_nm").val(aryPopupData[0][1]);
//	if(div == fix_kit)
//	{
//		$("#" + div + "_ctrt_no_org").val(aryPopupData[0][0]);
//		$("#" + div + "_ctrt_nm_org").val(aryPopupData[0][1]);
//		$("#" + div + "_rtp_no").val(aryPopupData[0][2]);
//		$("#" + div + "_rtp_no_org").val(aryPopupData[0][2]);
//	}
	
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#" + div + "_ctrt_no").val(rtnValAry[0]);
		$("#" + div + "_ctrt_nm").val(rtnValAry[1]);
		if(div == fix_kit)
		{
			$("#" + div + "_ctrt_no_org").val(rtnValAry[0]);
			$("#" + div + "_ctrt_nm_org").val(rtnValAry[1]);
			$("#" + div + "_rtp_no").val(rtnValAry[2]);
			$("#" + div + "_rtp_no_org").val(rtnValAry[2]);
		}
	} 
}
function setItem_kit(aryPopupData){
	setItem(aryPopupData, fix_kit);
}
function setItem(rtnVal, div){
//	$("#" + div + "_item_cd").val(aryPopupData[0][1]);
//	$("#" + div + "_item_nm").val(aryPopupData[0][2]);
//	if(div == fix_kit)
//	{
//		$("#" + div + "_item_grp_cd").val(item_grp_cd);
//		$("#" + div + "_item_sys_no").val(aryPopupData[0][4]);		
//		$("#" + div + "_lv1_cbm").val(aryPopupData[0][9]);
//		$("#" + div + "_lv1_cbf").val(aryPopupData[0][10]);
//		$("#" + div + "_lv1_grs_kgs").val(aryPopupData[0][11]);
//		$("#" + div + "_lv1_grs_lbs").val(aryPopupData[0][12]);
//		$("#" + div + "_lv1_net_kgs").val(aryPopupData[0][13]);
//		$("#" + div + "_lv1_net_lbs").val(aryPopupData[0][14]);
//		changeMeasure();
//	}
	var formObj=document.form;
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   $("#" + div + "_item_cd").val(rtnValAry[0]);
			$("#" + div + "_item_nm").val(rtnValAry[1]);
			if(div == fix_kit)
			{
				$("#" + div + "_item_grp_cd").val(item_grp_cd);
				$("#" + div + "_item_sys_no").val(rtnValAry[3]);		
				$("#" + div + "_lv1_cbm").val(rtnValAry[8]);
				$("#" + div + "_lv1_cbf").val(rtnValAry[9]);
				$("#" + div + "_lv1_grs_kgs").val(rtnValAry[10]);
				$("#" + div + "_lv1_grs_lbs").val(rtnValAry[11]);
				$("#" + div + "_lv1_net_kgs").val(rtnValAry[12]);
				$("#" + div + "_lv1_net_lbs").val(rtnValAry[13]);
				changeMeasure();
			}
	   } 	
}
/*
 * sheet1 item cd column popupedit 완료후
 */

function setItem_grd(rtnVal){
	var sheetObj = docObjects[0];
	var formObj = document.form;
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry = rtnVal.split("|");
		   var cnt=0;
		   var Row1;
		   var item_sys_no = rtnValAry[3];
		   
			//동일한 item_sys_no존재여부 확인
		   for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
				if(i != sheetObj.GetSelectRow() && sheetObj.GetCellValue(i, fix_grid01 + "sub_item_sys_no") == item_sys_no)
				{	
					cnt++;
					Row1=i; //중복되는 행번호
					break;
				}
			}
			if(cnt <= 0)
			{
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "sub_item_cd", rtnValAry[0], 0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "sub_item_nm", rtnValAry[1], 0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "sub_item_sys_no", item_sys_no, 0);
				sheetObj.SetCellEditable(sheetObj.GetSelectRow(), fix_grid01+"sub_item_cd",0);
				sheetObj.SetCellEditable(sheetObj.GetSelectRow(), fix_grid01+"sub_item_nm",0);
			}
			else
			{
				ComShowCodeMessage("COM0004","Item Code");//sound unit는 없고 qty있는경우 메세지
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"sub_item_sys_no","",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"sub_item_cd","",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"sub_item_nm","",0);
				sheetObj.SelectCell(sheetObj.GetSelectRow(), fix_grid01 + "sub_item_cd");
			}
	   } 	
}
function setLocInfo_kit(aryPopupData){
	setLocInfo(aryPopupData, fix_kit);
}
function setLocInfo_dekit(aryPopupData){
	setLocInfo(aryPopupData, fix_dekit);
}
function setLocInfo(rtnVal, div)
{
//	$("#" + div + "_wh_loc_cd").val(aryPopupData[0][1]);
//	$("#" + div + "_wh_loc_nm").val(aryPopupData[0][2]);
//	$("#" + div + "_wh_loc_nm_org").val(aryPopupData[0][2]);
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#" + div + "_wh_loc_cd").val(rtnValAry[0]);
		$("#" + div + "_wh_loc_nm").val(rtnValAry[1]);
		$("#" + div + "_wh_loc_nm_org").val(rtnValAry[2]);
	} 
}
/*
 * 팝업 관련 로직 끝
 */
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
	var doc = getAjaxMsgXML(reqVal);
	var formObj = document.form;
	if(doc[0] == 'OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.kit_wh_nm.value=rtnArr[0];
			}
			else{
				formObj.kit_wh_cd.value = "";
				formObj.kit_wh_nm.value = ""; 
			}
		}
		else{
			formObj.kit_wh_cd.value="";
			formObj.kit_wh_nm.value=""; 
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function getLocInfoDekit(obj){
	ajaxSendPost(resultLocInfoDekit, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
}
function resultLocInfoDekit(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj = document.form;
	if(doc[0] == 'OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.dekit_wh_nm.value=rtnArr[0];
			}
			else{
				formObj.dekit_wh_cd.value = "";
				formObj.dekit_wh_nm.value = ""; 
			}
		}
		else{
			formObj.dekit_wh_cd.value="";
			formObj.dekit_wh_nm.value=""; 
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
	var formObj = document.form;
	if(obj.name == "kit_ctrt_no")
	{
		if (formObj.btn_kit_ctrt_no.disabled == true) {
			return;
		}
		
		if(changeContractInfo() == false)
		{
			return;
		}
	}
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
}
function resultCtrtInfo(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	var formObj = document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
	    var rtnArr=doc[1].split('^@');
	    	if(rtnArr[0] != ""){
	    		formObj.kit_ctrt_nm.value = rtnArr[0];
	    	}
	    	else{
	    		formObj.kit_ctrt_no.value="";
	    		formObj.kit_ctrt_nm.value=""; 
	    	}
		}
		else{
			formObj.kit_ctrt_no.value="";
			formObj.kit_ctrt_nm.value=""; 
		}
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}

function getCtrtInfoDekit(obj){
	var formObj = document.form;
	ajaxSendPost(resultCtrtInfoDekit, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
}
function resultCtrtInfoDekit(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	var formObj = document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
	    var rtnArr=doc[1].split('^@');
	    	if(rtnArr[0] != ""){
	    		formObj.dekit_ctrt_nm.value = rtnArr[0];
	    	}
	    	else{
	    		formObj.dekit_ctrt_no.value="";
	    		formObj.dekit_ctrt_nm.value=""; 
	    	}
		}
		else{
			formObj.dekit_ctrt_no.value="";
			formObj.dekit_ctrt_nm.value=""; 
		}
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
/*
 * Item search
 * OnKeyDown 13 or onChange
 */

function getItemInfo(obj, f_div){
	if(obj.value != ""){
		var formObj=document.form;
		if(f_div == fix_kit)
		{
			ctrt_obj=formObj.kit_ctrt_no;
		}
		// Contract No 체크
		if (isNull(ctrt_obj)) {
			ComShowCodeMessage("COM0278", "Contract No");
			$("#" + f_div + "_item_cd").val("");
			$("#" + f_div + "_item_nm").val("");
			if(f_div == fix_kit)
			{
				$("#" + f_div + "_item_grp_cd").val("");
				$("#" + f_div + "_item_sys_no").val("");
				$("#" + f_div + "_lv1_cbm").val("0");
				$("#" + f_div + "_lv1_cbf").val("0");
				$("#" + f_div + "_lv1_grs_kgs").val("0");
				$("#" + f_div + "_lv1_grs_lbs").val("0");
				$("#" + f_div + "_lv1_net_kgs").val("0");
				$("#" + f_div + "_lv1_net_lbs").val("0");
			}
			ctrt_obj.focus();
			return;
		}
		var sParam = "ctrt_no="+ComGetObjValue(ctrt_obj) + "&item_cd=" + encodeURIComponent(obj.value) + "&item_grp_cd_include_yn=Y&item_grp_cd=" + item_grp_cd;
		ajaxSendPost(resultItemInfo, 'reqVal' , '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
	}
	else
	{
		if(obj.name == "kit_item_cd")
		{
			$("#kit_item_nm").val("");
			$("#kit_item_grp_cd").val("");
			$("#kit_item_sys_no").val("");
			$("#kit_lv1_cbm").val("0");
			$("#kit_lv1_cbf").val("0");
			$("#kit_lv1_grs_kgs").val("0");
			$("#kit_lv1_grs_lbs").val("0");
			$("#kit_lv1_net_kgs").val("0");
			$("#kit_lv1_net_lbs").val("0");
		}
	}
}

function resultItemInfo(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1]) != 'undefined'){
		var rtnArr = doc[1].split('^@');
		
//		var Row = rowTotal;
		
		sheetObj = sheet1;
		
		if(rtnArr[1] != "")
		{
			formObj.kit_item_nm.value = rtnArr[3];
			formObj.kit_item_grp_cd.value = item_grp_cd;
			formObj.kit_item_sys_no.value = rtnArr[0];
			formObj.kit_lv1_cbm.value = rtnArr[12];
			formObj.kit_lv1_cbf.value = rtnArr[13];
			formObj.kit_lv1_grs_kgs.value = rtnArr[14];
			formObj.kit_lv1_grs_lbs.value = rtnArr[15];
			formObj.kit_lv1_net_kgs.value = rtnArr[16];
			formObj.kit_lv1_net_lbs.value = rtnArr[17];
			changeMeasure();
		}else{
			formObj.kit_item_cd.value="";
			formObj.kit_item_nm.value="";
			formObj.kit_item_grp_cd.value="";
			formObj.kit_item_sys_no.value="";			
			formObj.kit_lv1_cbm.value="0";
			formObj.kit_lv1_cbf.value="0";
			formObj.kit_lv1_grs_kgs.value="0";
			formObj.kit_lv1_grs_lbs.value="0";
			formObj.kit_lv1_net_kgs.value="0";
			formObj.kit_lv1_net_lbs.value="0";
		}
	}else{
		formObj.kit_item_cd.value="";
		formObj.kit_item_nm.value="";
	}
}

/*
 * Location search
 * onChange
 */
var divl = "";
var f_divl = "";
function getLocationInfo(div, f_div){
	if($("#" + f_div + "_wh_loc_nm").val() == "")
	{
		$("#" + f_div + "_wh_loc_cd").val("");
		$("#" + f_div + "_wh_loc_nm_org").val("");
		if(div == "e" && f_div == fix_dekit)
		{
			btn_Search(fix_dekit);
		}
		return;
	}
	var formObj=document.form;
	var wh_combo_obj;
	if(f_div == fix_kit)
	{
		wh_combo_obj=formObj.kit_wh_combo.value;
	}
	else
	{
		wh_combo_obj=formObj.dekit_wh_combo.value;
	}
	if(ComIsEmpty(wh_combo_obj))
	{
		ComShowCodeMessage("COM0114","Warehouse");
		$("#" + f_div + "_wh_loc_nm").val("");
		$("#" + f_div + "_wh_cd").focus();
		return;
	}
	divl = div;
	f_divl = f_div;
	var sParam="f_loc_cd=" + $("#" + f_div + "_wh_combo").val() + "&f_wh_loc_nm=" + $("#" + f_div + "_wh_loc_nm").val()
	 			+ "&f_putaway_flg=Y&f_move_flg=Y";
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
	    		$("#" + f_divl + "_wh_loc_nm").val(rtnArr[1]);
	    		$("#" + f_divl + "_wh_loc_nm_org").val(rtnArr[1]);
	    		$("#" + f_divl + "_wh_loc_cd").val(rtnArr[0]);
	    		if(divl == "e" && f_divl == fix_dekit)
	    		{
	    			btn_Search(fix_dekit);
	    		}
	    	}
	    	else{
	    		$("#" + f_divl + "_wh_loc_nm").val("");
	    		$("#" + f_divl + "_wh_loc_nm_org").val("");
	    		$("#" + f_divl + "_wh_loc_cd").val("");
	    		$("#" + f_divl + "_wh_loc_nm").focus();
	    	}
		}
		else{
		}
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}

function loadComboWarehouse(){
	var obj = document.getElementById("kit_wh_combo");
	var option =  document.createElement("option");
	
	var wh_combo_cd = wh_comboCode.split('|');
	var wh_combo_nm = wh_comboText.split('|');
	
	for(var i = 0; i < wh_combo_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(wh_combo_nm[i]);
		option.value = htmlDecode(wh_combo_cd[i]);
		obj.add(option);
	}
}

function loadComboWarehouse1(){
	var obj = document.getElementById("dekit_wh_combo");
	var option =  document.createElement("option");
	
	var wh_combo_cd = wh_comboCode.split('|');
	var wh_combo_nm = wh_comboText.split('|');
	
	for(var i = 0; i < wh_combo_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(wh_combo_nm[i]);
		option.value = htmlDecode(wh_combo_cd[i]);
		obj.add(option);
	}
}

function checkNumFormatSheet(row, col, value, sheetObj, format) {
    var srcNumber = value.replace(/\-/g,"");

    if(srcNumber == '') return;

    dotInx     = format.indexOf('.');
    len        = format.length;

    if (dotInx > 0) decimalLen = len - (dotInx + 1);
    else decimalLen = -1;
    numLen     = len - (decimalLen + 1);
    temp        = srcNumber
    len1        = temp.length;
    dotInx1     = temp.indexOf('.');
    
    //소수점이 유무에 의한 길이 설정
    if(dotInx1 == -1) {
        decimalLen1 = -1;
        numLen1     = len1;
    } else {
        decimalLen1 = len1 - (dotInx1 + 1);
        numLen1     = len1 - (decimalLen1 + 1);
    }
    
    var floatMax = len - (dotInx + 1);
    var decimalMax = len - (floatMax + 1);
     
    if(numLen1 > numLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        sheetObj.SetCellValue(row,col,"0");
        return false;
    } else if (decimalLen1 > decimalLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        sheetObj.SetCellValue(row,col,"0");
        return false;
    }
    return true;
}


function checkNumFormat(obj, format) {

	var srcNumber = obj.value.replace(/\-/g,"");
    var srcNumber = obj.value.replace(/\,/g,"");

    if(srcNumber == '') return;

    if(isNaN(srcNumber)) {
        alert("Check invalid data! ");
        obj.value = "0";
        obj.focus();
        return;
    }
    dotInx     = format.indexOf('.');
    len        = format.length;

    if (dotInx > 0) decimalLen = len - (dotInx + 1);
    else decimalLen = -1;
    numLen     = len - (decimalLen + 1);
    temp        = srcNumber
    len1        = temp.length;
    dotInx1     = temp.indexOf('.');
    
    //소수점이 유무에 의한 길이 설정
    if(dotInx1 == -1) {
        decimalLen1 = -1;
        numLen1     = len1;
    } else {
        decimalLen1 = len1 - (dotInx1 + 1);
        numLen1     = len1 - (decimalLen1 + 1);
    }
    
    var floatMax = len - (dotInx + 1);
    var decimalMax = len - (floatMax + 1);
     
    if(numLen1 > numLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        obj.value = "0";
        obj.focus();
        return false;
    } else if (decimalLen1 > decimalLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        obj.value = "0";
        obj.focus();
        return false;
    }
    return true;
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
//merge row
function mergeCell(Row){
	var prefix=fix_grid02;
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
	if(sub_item_cd == sub_item_cd_ori && sub_item_nm == sub_item_nm_ori){
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
	var prefix=fix_grid02;
	sub_item_cd_ori = sheet2.GetCellValue(i, prefix+"sub_item_cd");
	sub_item_nm_ori = sheet2.GetCellValue(i, prefix+"sub_item_nm");
}
function getData(i){
	var prefix=fix_grid02;	
	sub_item_cd = sheet2.GetCellValue(i, prefix+"sub_item_cd");
	sub_item_nm = sheet2.GetCellValue(i, prefix+"sub_item_nm");
}
function setMergeCell(startRow, totalRowMerge){
	sheet2.SetMergeCell(startRow, 0, totalRowMerge, 1);
	sheet2.SetMergeCell(startRow, 1, totalRowMerge, 1);
}
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(div){
	var formObj = document.form;
	var countwd = 0;
	//List Warehouse from TB_SEQ
	var wh_list_ath = formObj.wh_list_ath.value;
	var arrwhcd =  wh_list_ath.split(',');
	//List warehouse default in User Entry Screen.
	var wh_cfg = formObj.wh_cfg.value;
	var arrwhcd_df =  wh_cfg.split(',');
	if(div == fix_kit){
		//Warehosue selected.
		var warehouse = formObj.kit_wh_combo.value;
		for(var i = 0; i < arrwhcd_df.length; i ++){
			for(var j = 0; j < arrwhcd.length; j ++){
				if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
				countwd = countwd + 1;
				}
			}
		}
		if(countwd == 0){
			ComBtnDisable("btn_save_kit");
			//ComBtnDisable("link_invmove");
		}else{
			ComBtnEnable("btn_save_kit");
			//ComBtnEnable("link_invmove");
		}
	}else{
		var warehouse = formObj.dekit_wh_combo.value;
		for(var i = 0; i < arrwhcd_df.length; i ++){
			for(var j = 0; j < arrwhcd.length; j ++){
				if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
				countwd = countwd + 1;
				}
			}
		}
		if(countwd == 0){
			ComBtnDisable("btn_save_dekit");
		}else{
			ComBtnEnable("btn_save_dekit");
		}
	}
}