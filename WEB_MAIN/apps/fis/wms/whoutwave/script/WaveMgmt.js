/*<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WaveMgmt.js
*@FileTitle  : Wave
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/17
=========================================================--%>*/
var sheetCnt=0;
//docObjects
var comboObjects=new Array();
var docObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var fix_grid02="Grd02";
var fix_grid03="Grd03";
var fix_grid04="Grd04";
var fix_grid05="Grd05";
var fix_wave="wave";
var fix_allc="allc";
var fix_un="un";
var firCalFlag=false;
var checkallocation = true;
var rtnary = new Array(1);
/*
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
 }
/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheetObj){
	docObjects[sheetCnt++] = sheetObj;
}
/*
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여
 * cache옵션 false셋팅
 */

function loadPage() {
	//sheet
	formObj = document.form;
	for ( var i = 0; i < docObjects.length; i++) {
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }
    //control
	//initControl();
	commonModeChange("INIT");
	if($("#req_wave_no").val() != "")
	{ 
		//--inv move search list link
		$("#in_wave_no").val($("#req_wave_no").val());
		btn_Search();
	}
	else
	{
		$("#wh_cd").val($("#def_wh_cd").val());
		$("#wh_nm").val($("#def_wh_nm").val());
		$("#ctrt_no").val($("#def_wh_ctrt_no").val());
		$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
		$("#fm_bk_date").val(ComGetDateAdd(null, "d", -31, "-"));
		$("#to_bk_date").val(ComGetNowInfo());		
	}
	check_authority_wh();
}
/*
 * 각모드별 화면을 init셋팅
 */
function commonModeChange(mode)
{
	switch(mode)
	{
		case "INIT":
			commonButtonChange(mode); //버튼
			$("#mode").val("NEW");
			break;
		case "NEW" :
			commonButtonChange("INIT"); //버튼
			$("#mode").val("NEW");
			sheet1.RemoveAll();
			sheet2.RemoveAll();
			sheet3.RemoveAll();
			sheet4.RemoveAll();
			sheet5.RemoveAll();
			$("#in_wave_no").val("");
			$("#wave_no").val("");
			$("#pick_dt").val("");
			$("#pick_hm_fr").val("");
			$("#pick_hm_to").val("");
			$("#rmk").val("");
			$("#wave_wh_cd").val("");
			$("#wave_wh_nm").val("");
			$("#wave_ctrt_no").val("");
			$("#wave_ctrt_nm").val("");
			$("#issu_cnt_tot").val("");
			$("#lp_cnt_tot").val("");
			$("#allc_cnt_tot").val("");
			alloc_ord.selectedIndex = 0;
			alloc_option.selectedIndex = 0;
			break;
		case "SEARCH_BEF" :
			commonButtonChange("INIT"); //버튼
			sheet1.RemoveAll();
			sheet2.RemoveAll();
			sheet3.RemoveAll();
			sheet4.RemoveAll();
			sheet5.RemoveAll();
			$("#mode").val(mode);
			$("#wave_no").val("");
			$("#pick_dt").val("");
			$("#pick_hm_fr").val("");
			$("#pick_hm_to").val("");
			$("#rmk").val("");
			$("#wave_wh_cd").val("");
			$("#wave_wh_nm").val("");
			$("#wave_ctrt_no").val("");
			$("#wave_ctrt_nm").val("");
			$("#issu_cnt_tot").val("");
			$("#lp_cnt_tot").val("");
			$("#allc_cnt_tot").val("");
			break;
		case "SEARCH_NEW":
			commonButtonChange(mode); //버튼
			$("#mode").val(mode);
			break;
		case "SEARCH_MGMT":
			commonButtonChange(mode); //버튼
			$("#mode").val(mode);
			break;
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
			ComBtnEnable("btn_new_wave");
			ComBtnDisable("btn_save_wave");
			ComBtnDisable("btn_delete_wave");
			ComBtnDisable("btn_print_wave");		
			ComBtnDisable("link_loadplan_wave");
			ComBtnDisable("link_outboundcomplete_wave");
			ComBtnDisable("link_invreplenishment_wave");
			ComBtnDisable("row_add");
			ComBtnDisable("row_del");			
			ComBtnDisable("btn_allocation_wave");
			ComBtnDisable("btn_manualalloc_wave");
			ComBtnDisable("btn_cancel_wave");
			//tab2
			ComBtnDisable("btn_cancel_allc");
			ComBtnDisable("btn_print_allc");
			ComBtnDisable("link_loadplan_allc");
			ComBtnDisable("link_outboundcomplete_allc");
			//tab3
			ComBtnDisable("btn_allocation_un");
			ComBtnDisable("btn_manualalloc_un");
			ComBtnDisable("btn_excel_un");
			ComBtnDisable("btn_Print_un");
			ComBtnDisable("link_invreplenishment_un");
			break;
		case "SEARCH_NEW" :
			//tab1
			ComBtnEnable("btn_save_wave");
			ComBtnEnable("row_add");
			ComBtnEnable("row_del");			
			break;
		case "SEARCH_MGMT" :
			//tab1
			ComBtnEnable("btn_save_wave");
			ComBtnEnable("btn_delete_wave");
			ComBtnEnable("btn_print_wave");	
			ComBtnEnable("row_add");
			ComBtnEnable("row_del");		
			ComBtnEnable("btn_allocation_wave");
			ComBtnEnable("btn_manualalloc_wave");
			ComBtnEnable("btn_cancel_wave");
			ComBtnEnable("link_outboundcomplete_wave");
			ComBtnEnable("link_invreplenishment_wave");
			ComBtnEnable("link_loadplan_wave");
			//tab2
			ComBtnEnable("btn_cancel_allc");
			ComBtnEnable("btn_print_allc");
			ComBtnEnable("link_outboundcomplete_allc");
			ComBtnEnable("link_loadplan_allc");
			//tab3
			ComBtnEnable("btn_allocation_un");
			ComBtnEnable("btn_manualalloc_un");
			ComBtnEnable("btn_excel_un");
			ComBtnEnable("btn_Print_un");
			ComBtnEnable("link_invreplenishment_un");
			break;
	}
}
/*
 * tab
 */
function goTabSelect(isNumSep) {
    var tabObjs=document.getElementsByName('tabLayer');
    if(isNumSep=='01') {
		tabObjs[0].style.display='inline';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
        resizeSheet();
    }else if(isNumSep=='02') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='inline';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
        resizeSheet();
    }else if(isNumSep=='03') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='inline';
        tabObjs[3].style.display='none';
        resizeSheet();
    }else if(isNumSep=='04') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='inline';
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
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
 function initCombo(comboObj, comboNo) {
	var vTextSplit=null;
	var vCodeSplit=null;
	switch(comboObj.options.id) {
		case "alloc_option":
			var txt="Inbound Date|Item Lot|Expiration Date|LOT 04|LOT 05";
			var val="LOT_ATTRIB_01|LOT_ATTRIB_02|LOT_ATTRIB_03|LOT_ATTRIB_04|LOT_ATTRIB_05";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("LOT_ATTRIB_01");
	    	} 			
			break;
		case "alloc_ord":
			var txt="Ascending|Descending";
			var val="ASC|DESC";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("ASC");
	    	} 			
			break;
	}
} 
/*
 * init sheet
 */ 
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet1":      //IBSheet1 init(wave tab_allocation list)
	    with(sheetObj){
		var hdr1="wob_bk_no_org|item_sys_no|item_seq|Manual\nAlloc|Booking No|Item|Item Name|Order|Order|Order|Allocated Result|Allocated Result|rn|Inbound Date|Item Lot|Location||Picking\n(EA)|CBM|CBM|GWT|GWT|NWT|NWT|SO No|Inbound Information|Inbound Information|Additional LOT Info|Additional LOT Info|Additional LOT Info|Lot ID"
			+ "|proc_mode|status|walc_no|sao_sys_no|po_sys_no|wh_loc_cd|row_number|issu_cnt|lp_cnt";
		var hdr2="wob_bk_no_org|item_sys_no|item_seq|Manual\nAlloc|Booking No|Item|Item Name|Unit|Unit Qty|EA Qty|Alloc|Un-alloc|rn|Inbound Date|Item Lot|Location||Picking\n(EA)|CBM |CFT|KG|LB|KG|LB|SO No|Booking No|PO No|Expiration Date|Lot 04|Lot 05|Lot ID"
			+ "|proc_mode|status|walc_no|sao_sys_no|po_sys_no|wh_loc_cd|row_number|issu_cnt|lp_cnt";
//		var headCount=ComCountHeadTitle(hdr1);
		var prefix=fix_grid01;
		SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
		var headers = [ { Text:hdr1, Align:"Center"},
                      { Text:hdr2, Align:"Center"} ];
      var cols = [ {Type:"Text",      Hidden:1,  Width:50,         Align:"Left",         ColMerge:1,      SaveName:prefix+"wob_bk_no_org",     	 KeyField:0,               				Format:""											},
                   {Type:"Text",      Hidden:1,  Width:50,         Align:"Left",         ColMerge:1,      SaveName:prefix+"item_sys_no",       	 KeyField:0,               				Format:""											},
                   {Type:"Text",      Hidden:1,  Width:50,         Align:"Left",         ColMerge:1,      SaveName:prefix+"item_seq",          	 KeyField:0,               				Format:""											},
                   {Type:"Text",      Hidden:0,  Width:50,         Align:"Center",       ColMerge:1,      SaveName:prefix+"manual_alloc_img",  	 KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"Text",      Hidden:0,  Width:120,        Align:"Center",       ColMerge:1,      SaveName:prefix+"wob_bk_no",         	 KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"Text",      Hidden:0,  Width:100,        Align:"Center",       ColMerge:1,      SaveName:prefix+"item_cd",     		 KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"Text",      Hidden:0,  Width:150,        Align:"Left",         ColMerge:1,      SaveName:prefix+"item_nm",     		 KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"Text",      Hidden:0,  Width:40,         Align:"Center",       ColMerge:1,      SaveName:prefix+"item_pkgunit",        KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"Int",       Hidden:0,  Width:60,         Align:"Right",        ColMerge:1,      SaveName:prefix+"item_pkgqty",     	 KeyField:0,     UpdateEdit:0,          Format:"Integer",    PointCount:0 },
                   {Type:"Int",       Hidden:0,  Width:60,         Align:"Right",        ColMerge:1,      SaveName:prefix+"item_ea_qty",     	 KeyField:0,     UpdateEdit:0,          Format:"Integer",    PointCount:0 },
                   {Type:"Int",       Hidden:0,  Width:60,         Align:"Right",        ColMerge:1,      SaveName:prefix+"alloc_ea_qty",        KeyField:0,     UpdateEdit:0,          Format:"Integer",    PointCount:0 },
                   {Type:"Int",       Hidden:0,  Width:60,         Align:"Right",        ColMerge:1,      SaveName:prefix+"un_alloc_ea_qty",     KeyField:0,     UpdateEdit:0,          Format:"Integer",    PointCount:0 },
                   {Type:"Text",      Hidden:1,  Width:10,         Align:"Left",         ColMerge:0,      SaveName:prefix+"rn",                  KeyField:0,               				Format:""											},
                   {Type:"Date",      Hidden:0,  Width:80,         Align:"Center",       ColMerge:1,      SaveName:prefix+"inbound_dt",          KeyField:0,     UpdateEdit:0,          Format:"Ymd"									},
                   {Type:"Text",      Hidden:0,  Width:130,        Align:"Center",       ColMerge:1,      SaveName:prefix+"lot_no",              KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"PopupEdit", Hidden:0,  Width:90,         Align:"Center",       ColMerge:1,      SaveName:prefix+"wh_loc_cd_nm",        KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"CheckBox",  Hidden:0,  Width:30,         Align:"Center",       ColMerge:1,      SaveName:prefix+"chk",     			 KeyField:0,               				Format:""											},
                   {Type:"Int",       Hidden:0,  Width:70,         Align:"Right",        ColMerge:1,      SaveName:prefix+"pick_item_ea_qty",    KeyField:0,     UpdateEdit:0,          Format:"Integer",   PointCount:0	},
                   {Type:"Float",     Hidden:0,  Width:80,         Align:"Right",        ColMerge:0,      SaveName:prefix+"item_cbm",     	     KeyField:0,               				Format:"Float",			  PointCount:3	},
                   {Type:"Float",     Hidden:0,  Width:80,         Align:"Right",        ColMerge:1,      SaveName:prefix+"item_cbf",     	     KeyField:0,               				Format:"Float",			  PointCount:3	},
                   {Type:"Float",     Hidden:0,  Width:80,         Align:"Right",        ColMerge:1,      SaveName:prefix+"item_grs_kgs",        KeyField:0,               				Format:"Float",			  PointCount:3	},
                   {Type:"Float",     Hidden:0,  Width:80,         Align:"Right",        ColMerge:1,      SaveName:prefix+"item_grs_lbs",        KeyField:0,               				Format:"Float",			  PointCount:3	},
                   {Type:"Float",     Hidden:0,  Width:80,         Align:"Right",        ColMerge:1,      SaveName:prefix+"item_net_kgs",        KeyField:0,               				Format:"Float",			  PointCount:3	},
                   {Type:"Float",     Hidden:0,  Width:80,         Align:"Right",        ColMerge:1,      SaveName:prefix+"item_net_lbs",        KeyField:0,               				Format:"Float",			  PointCount:3	},
                   {Type:"Text",      Hidden:0,  Width:100,        Align:"Center",       ColMerge:1,      SaveName:prefix+"sao_no",     		 KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"Text",      Hidden:0,  Width:100,        Align:"Center",       ColMerge:1,      SaveName:prefix+"wib_bk_no",     	     KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"Text",      Hidden:0,  Width:100,        Align:"Center",       ColMerge:1,      SaveName:prefix+"po_no_in",     	     KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"Date",      Hidden:0,  Width:110,        Align:"Center",       ColMerge:1,      SaveName:prefix+"exp_dt",     	 	 KeyField:0,     UpdateEdit:0,          Format:"Ymd"									},
                   {Type:"Text",      Hidden:0,  Width:80,         Align:"Left",         ColMerge:1,      SaveName:prefix+"lot_04",     	 	 KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"Text",      Hidden:0,  Width:80,         Align:"Left",         ColMerge:1,      SaveName:prefix+"lot_05",     	 	 KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"Text",      Hidden:0,  Width:120,        Align:"Center",       ColMerge:1,      SaveName:prefix+"lot_id",     	 	 KeyField:0,     UpdateEdit:0,          Format:""											},
                   {Type:"Text",      Hidden:1,  Width:10,          					      			  SaveName:prefix+"proc_mode",  												Format:""},
                   {Type:"Status",    Hidden:1,  Width:100,      							  			  SaveName:prefix+"ibflag",     													 			   },
                   {Type:"Text",      Hidden:1,  Width:100,          					      			  SaveName:prefix+"walc_no",    												Format:""},
                   {Type:"Text",      Hidden:1,  Width:0,          					      				  SaveName:prefix+"sao_sys_no", 												Format:""},
                   {Type:"Text",      Hidden:1,  Width:0,          					      				  SaveName:prefix+"po_sys_no",  												Format:""},
                   {Type:"Text",      Hidden:1,  Width:0,          					      				  SaveName:prefix+"wh_loc_cd",  												Format:""},
                   {Type:"Text",      Hidden:1,  Width:0,          					      				  SaveName:prefix+"rum",		 												Format:""},
                   {Type:"Text",      Hidden:1,  Width:100,          					      				  SaveName:prefix+"issu_cnt",   												Format:""},
                   {Type:"Text",      Hidden:1,  Width:0,          					      				  SaveName:prefix+"lp_cnt",     												Format:""}];
		      InitHeaders(headers, info);
		      InitColumns(cols);
		      SetSheetHeight(350);
		      SetHeaderRowHeight(30);
//		      SetAutoRowHeight(0);
		      resizeSheet();
		      SetEditable(1);
		      SetImageList(0,APP_PATH+"/web/img/main/icon_search_s.gif");
            }
      break;
	case "sheet2":      //IBSheet2 init(wave tab_order list)
	      with(sheetObj){
     var hdr1="|Booking No|Booking Date|Estimated Date|Consignee|Consignee|Contract|Contract|Cust Order No"
     + "|status|wave_no|wh_cd|walc_no|issu_cnt|lp_cnt|allc_cnt";
//     var headCount=ComCountHeadTitle(hdr1);
     var prefix=fix_grid02;
     SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
     var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
     var headers = [ { Text:hdr1, Align:"Center"} ];
     InitHeaders(headers, info);
     var cols = [ {Type:"CheckBox",  Hidden:0,  Width:30,     Align:"Center",    ColMerge:1,         SaveName:prefix+"chk",              KeyField:0, 		          								   Format:""   },
      			 {Type:"Text",     	Hidden:0,  Width:120,    Align:"Center",    ColMerge:1,         SaveName:prefix+"wob_bk_no",        KeyField:0, 		UpdateEdit:0,		InsertEdit:0,          Format:""   },
      			 {Type:"Date",     	Hidden:0,  Width:100,     Align:"Center",    ColMerge:1,         SaveName:prefix+"bk_date",        	KeyField:0, 		UpdateEdit:0,		InsertEdit:0,          Format:"Ymd"},
      			 {Type:"Date",     	Hidden:0,  Width:100,     Align:"Center",    ColMerge:1,         SaveName:prefix+"est_out_dt",       KeyField:0, 		UpdateEdit:0,		InsertEdit:0,          Format:"Ymd"},
      			 {Type:"Text",     	Hidden:0,  Width:90,     Align:"Center",    ColMerge:1,         SaveName:prefix+"buyer_cd",        	KeyField:0, 		UpdateEdit:0,		InsertEdit:0,          Format:""	},
      			 {Type:"Text",     	Hidden:0,  Width:90,     Align:"Center",    ColMerge:1,         SaveName:prefix+"buyer_nm",        	KeyField:0, 		UpdateEdit:0,		InsertEdit:0,          Format:""	},
      			 {Type:"Text",     	Hidden:0,  Width:100,     Align:"Center",    ColMerge:1,         SaveName:prefix+"ctrt_no",        	KeyField:0, 		UpdateEdit:0,		InsertEdit:0,          Format:""	},
      			 {Type:"Text",     	Hidden:0,  Width:130,    Align:"Left",      ColMerge:1,         SaveName:prefix+"ctrt_nm",        	KeyField:0, 		UpdateEdit:0,		InsertEdit:0,          Format:""	},
      			 {Type:"Text",     	Hidden:0,  Width:100,    Align:"Left",      ColMerge:1,         SaveName:prefix+"cust_ord_no",      KeyField:0, 		UpdateEdit:0,		InsertEdit:0,          Format:""	},
      			 {Type:"Status",    Hidden:0,  Width:100,     Align:"Center",       					SaveName:prefix+"ibflag" 																						},                    		
      			 {Type:"Text",      Hidden:1,  Width:100,    Align:"Left",         					SaveName:prefix+"wave_no",        	KeyField:0, 		UpdateEdit:0,          				  	   Format:""	},
      			 {Type:"Text",      Hidden:1,  Width:100,    Align:"Left",         					SaveName:prefix+"wh_cd",          	KeyField:0, 		UpdateEdit:0,          				  	   Format:""	},
      			 {Type:"Text",      Hidden:1,  Width:100,    Align:"Left",         					SaveName:prefix+"walc_no",        	KeyField:0, 		UpdateEdit:0,          				  	   Format:""	},
      			 {Type:"Text",      Hidden:1,  Width:0,                  							SaveName:prefix+"issu_cnt",  																	   Format:""	},
      			 {Type:"Text",      Hidden:1,  Width:0,                  							SaveName:prefix+"lp_cnt",    																	   Format:""	},
      			 {Type:"Text",      Hidden:1,  Width:0,                  							SaveName:prefix+"allc_cnt",  																	   Format:""	} ];
      
     InitColumns(cols);
     SetSheetHeight(350);
     SetHeaderRowHeight(30);
//     SetAutoRowHeight(0);
     resizeSheet();
     SetEditable(1);
              }
     break;


	case "sheet3":      //IBSheet3 init(allocated list tab)
	    with(sheetObj){
      
      var hdr1="wob_bk_no_org|item_sys_no|item_seq|Booking No|Item|Item Name|Order|Order|Order|Allocated Result|Allocated Result|rn|Inbound Date|Item Lot|Location||Picking\n(EA)|CBM|CBM|GWT|GWT|NWT|NWT|SO No|Inbound Information|Inbound Information|Additional LOT Info|Additional LOT Info|Additional LOT Info|Lot ID"
      + "|proc_mode|status|walc_no|sao_sys_no|po_sys_no|wh_loc_cd|row_number|issu_cnt|lp_cnt";
      var hdr2="wob_bk_no_org|item_sys_no|item_seq|Booking No|Item|Item Name|Unit|Unit Qty|EA Qty|Alloc|Un-alloc|rn|Inbound Date|Item Lot|Location||Picking\n(EA)|CBM |CFT|KG|LB|KG|LB|SO No|Booking No|PO No|Expiration Date|Lot 04|Lot 05|Lot ID"
      + "|proc_mode|status|walc_no|sao_sys_no|po_sys_no|wh_loc_cd|row_number|issu_cnt|lp_cnt";
//      var headCount=ComCountHeadTitle(hdr1);
      var prefix=fix_grid03;

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

      var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [ { Text:hdr1, Align:"Center"},
                  { Text:hdr2, Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [ {Type:"Text",      Hidden:1, 	Width:50,     	Align:"Left",    	ColMerge:1,         SaveName:prefix+"wob_bk_no_org",        KeyField:0,		          			   Format:""											 },
                   {Type:"Text",      Hidden:1, 	Width:50,     	Align:"Left",    	ColMerge:1,         SaveName:prefix+"item_sys_no",        	KeyField:0,		          			   Format:""											 },
                   {Type:"Text",      Hidden:1, 	Width:50,     	Align:"Left",    	ColMerge:1,         SaveName:prefix+"item_seq",        		KeyField:0,		          			   Format:""											 },
                   {Type:"Text",      Hidden:0,  	Width:120,     	Align:"Center",    	ColMerge:1,         SaveName:prefix+"wob_bk_no",        	KeyField:0,		UpdateEdit:0,          Format:""											 },
                   {Type:"Text",      Hidden:0,  	Width:100,     	Align:"Center",    	ColMerge:1,         SaveName:prefix+"item_cd",        		KeyField:0,		UpdateEdit:0,          Format:""											 },
                   {Type:"Text",      Hidden:0,  	Width:150,     	Align:"Left",    	ColMerge:1,         SaveName:prefix+"item_nm",        		KeyField:0,		UpdateEdit:0,          Format:""											 },
                   {Type:"Text",      Hidden:0,  	Width:40,     	Align:"Center",    	ColMerge:1,         SaveName:prefix+"item_pkgunit",        	KeyField:0,		UpdateEdit:0,          Format:""											 },
                   {Type:"Float",      Hidden:0,  	Width:60,     	Align:"Right",    	ColMerge:1,         SaveName:prefix+"item_pkgqty",        	KeyField:0,		UpdateEdit:0,          Format:"Integer",		PointCount:0 },
                   {Type:"Float",      Hidden:0,  	Width:60,     	Align:"Right",    	ColMerge:1,         SaveName:prefix+"item_ea_qty",        	KeyField:0,		UpdateEdit:0,          Format:"Integer",		PointCount:0 },
                   {Type:"Float",      Hidden:0,  	Width:60,     	Align:"Right",    	ColMerge:1,         SaveName:prefix+"alloc_ea_qty",        	KeyField:0,		UpdateEdit:0,          Format:"Integer",		PointCount:0 },
                   {Type:"Float",      Hidden:0,  	Width:60,     	Align:"Right",    	ColMerge:1,         SaveName:prefix+"un_alloc_ea_qty",      KeyField:0,		UpdateEdit:0,          Format:"Integer",		PointCount:0 },
                   {Type:"Text",      Hidden:1, 	Width:10,     	Align:"Left",		ColMerge:0,         SaveName:prefix+"rn",        			KeyField:0,		          			   Format:""											 },
                   {Type:"Date",      Hidden:0,  	Width:80,     	Align:"Center",    	ColMerge:1,         SaveName:prefix+"inbound_dt",        	KeyField:0,		UpdateEdit:0,          Format:"Ymd"									 },
                   {Type:"Text",      Hidden:0,  	Width:130,     	Align:"Left",    	ColMerge:1,         SaveName:prefix+"lot_no",        		KeyField:0,		UpdateEdit:0,          Format:""											 },
                   {Type:"PopupEdit", Hidden:0, 	Width:90,     	Align:"Center",    	ColMerge:1,         SaveName:prefix+"wh_loc_cd_nm",       	KeyField:0,		UpdateEdit:0,          Format:""											 },
                   {Type:"CheckBox",  Hidden:0, 	Width:30,     	Align:"Center",    	ColMerge:1,         SaveName:prefix+"chk",        			KeyField:0,		          			   Format:""											 },
                   {Type:"Float",      Hidden:0, 	Width:70,     	Align:"Right",    	ColMerge:1,         SaveName:prefix+"pick_item_ea_qty",     KeyField:0,		UpdateEdit:0,          Format:"Integer",		PointCount:0 },
                   {Type:"Float",      Hidden:0, 	Width:80,     	Align:"Right",		ColMerge:0,         SaveName:prefix+"item_cbm",        		KeyField:0,		UpdateEdit:0,          Format:"Float",				PointCount:3 },
                   {Type:"Float",      Hidden:0, 	Width:80,     	Align:"Right",    	ColMerge:1,         SaveName:prefix+"item_cbf",        		KeyField:0,		UpdateEdit:0,          Format:"Float",				PointCount:3 },
                   {Type:"Float",      Hidden:0, 	Width:80,     	Align:"Right",    	ColMerge:1,         SaveName:prefix+"item_grs_kgs",        	KeyField:0,		UpdateEdit:0,          Format:"Float",				PointCount:3 },
                   {Type:"Float",      Hidden:0, 	Width:80,     	Align:"Right",    	ColMerge:1,         SaveName:prefix+"item_grs_lbs",        	KeyField:0,		UpdateEdit:0,          Format:"Float",				PointCount:3 },
                   {Type:"Float",      Hidden:0, 	Width:80,     	Align:"Right",    	ColMerge:1,         SaveName:prefix+"item_net_kgs",        	KeyField:0,		UpdateEdit:0,          Format:"Float",				PointCount:3 },
                   {Type:"Float",      Hidden:0, 	Width:80,     	Align:"Right",    	ColMerge:1,         SaveName:prefix+"item_net_lbs",        	KeyField:0,		UpdateEdit:0,          Format:"Float",				PointCount:3 },
                   {Type:"Text",      Hidden:0, 	Width:100,     	Align:"Center",    	ColMerge:1,         SaveName:prefix+"sao_no",        		KeyField:0,		UpdateEdit:0,          Format:""											 },
                   {Type:"Text",      Hidden:0, 	Width:100,     	Align:"Center",    	ColMerge:1,         SaveName:prefix+"wib_bk_no",        	KeyField:0,		UpdateEdit:0,          Format:""											 },
                   {Type:"Text",      Hidden:0, 	Width:100,     	Align:"Center",    	ColMerge:1,         SaveName:prefix+"po_no_in",        		KeyField:0,		UpdateEdit:0,          Format:""											 },
                   {Type:"Date",      Hidden:0, 	Width:120,     	Align:"Center",    	ColMerge:1,         SaveName:prefix+"exp_dt",        		KeyField:0,		UpdateEdit:0,          Format:"Ymd"									 },
                   {Type:"Text",      Hidden:0, 	Width:80,     	Align:"Left",    	ColMerge:1,         SaveName:prefix+"lot_04",        		KeyField:0,		UpdateEdit:0,          Format:""											 },
                   {Type:"Text",      Hidden:0, 	Width:80,     	Align:"Left",    	ColMerge:1,         SaveName:prefix+"lot_05",        		KeyField:0,		UpdateEdit:0,          Format:""											 },
                   {Type:"Text",      Hidden:0, 	Width:100,     	Align:"Center",    	ColMerge:1,         SaveName:prefix+"lot_id",        		KeyField:0,		UpdateEdit:0,          Format:""											 },
                   {Type:"Text",      Hidden:1, 	Width:10,          	         							SaveName:prefix+"proc_mode",												   Format:"" 											 },
                   {Type:"Status",    Hidden:1, 	Width:0,         										SaveName:prefix+"ibflag" 														 														 },
                   {Type:"Text",      Hidden:1, 	Width:0,          	          							SaveName:prefix+"walc_no", 													   Format:""											 },
                   {Type:"Text",      Hidden:1, 	Width:0,          	          							SaveName:prefix+"sao_sys_no",												   Format:""											 },
                   {Type:"Text",      Hidden:1, 	Width:0,          	          							SaveName:prefix+"po_sys_no", 												   Format:""											 },										
                   {Type:"Text",      Hidden:1, 	Width:0,          	          							SaveName:prefix+"wh_loc_cd", 												   Format:""											 },
                   {Type:"Text",      Hidden:1, 	Width:0,          	          							SaveName:prefix+"rum",														   Format:""											 },
                   {Type:"Text",      Hidden:1, 	Width:0,          	          							SaveName:prefix+"issu_cnt", 												   Format:""											 },
                   {Type:"Text",      Hidden:1, 	Width:0,          	          							SaveName:prefix+"lp_cnt", 													   Format:""											 }];
       
      InitColumns(cols);
      SetSheetHeight(450);
      SetHeaderRowHeight(30);
//      SetAutoRowHeight(0);
      resizeSheet();
      SetEditable(1);
            }
      break;


	case "sheet4":      //IBSheet4 init(un-allocated list)
	    with(sheetObj){
      
      var hdr1="wob_bk_no_org|item_sys_no|item_seq|Manual\nAlloc|Booking No|Item|Item Name|Order|Order|Order|Allocated Result|Allocated Result|rn|Inbound Date|Item Lot|Location|Picking\n(EA)|SO No|Inbound Information|Inbound Information|Additional LOT Info|Additional LOT Info|Additional LOT Info|Lot ID"
      + "|proc_mode|status|walc_no|sao_sys_no|po_sys_no|wh_loc_cd|row_number|issu_cnt|lp_cnt";
      var hdr2="wob_bk_no_org|item_sys_no|item_seq|Manual\nAlloc|Booking No|Item|Item Name|Unit|Unit Qty|EA Qty|Alloc|Un-alloc|rn|Inbound Date|Item Lot|Location|Picking\n(EA)|SO No|Booking No|PO No|Expiration Date|Lot 04|Lot 05|Lot ID"
      + "|proc_mode|status|walc_no|sao_sys_no|po_sys_no|wh_loc_cd|row_number|issu_cnt|lp_cnt";
//      var headCount=ComCountHeadTitle(hdr1);
//      (headCount, 0, 0, true);
      var prefix=fix_grid04;

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

      var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [ { Text:hdr1, Align:"Center"},
                  { Text:hdr2, Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [ {Type:"Text",      Hidden:1,  Width:50,      Align:"Left",      ColMerge:1,         SaveName:prefix+"wob_bk_no_org",        	KeyField:0, 		          			   Format:""														},
                   {Type:"Text",      Hidden:1,  Width:50,      Align:"Left",      ColMerge:1,         SaveName:prefix+"item_sys_no",        	KeyField:0, 		          			   Format:""														},
                   {Type:"Text",      Hidden:1,  Width:50,      Align:"Left",      ColMerge:1,         SaveName:prefix+"item_seq",        		KeyField:0, 		          			   Format:""														},
                   {Type:"Text",      Hidden:0,  Width:50,      Align:"Center",    ColMerge:1,         SaveName:prefix+"manual_alloc_img",      KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"Text",      Hidden:0,  Width:120,     Align:"Center",    ColMerge:1,         SaveName:prefix+"wob_bk_no",        		KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"Text",      Hidden:0,  Width:100,     Align:"Center",      ColMerge:1,         SaveName:prefix+"item_cd",       		KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"Text",      Hidden:0,  Width:150,     Align:"Left",      ColMerge:1,         SaveName:prefix+"item_nm",        		KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"Text",      Hidden:0,  Width:40,      Align:"Center",    ColMerge:1,         SaveName:prefix+"item_pkgunit",        	KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"Float",      Hidden:0,  Width:60,      Align:"Right",     ColMerge:1,         SaveName:prefix+"item_pkgqty",        	KeyField:0, 		UpdateEdit:0,          Format:"Integer",			PointCount:0		},
                   {Type:"Float",      Hidden:0,  Width:60,      Align:"Right",     ColMerge:1,         SaveName:prefix+"item_ea_qty",        	KeyField:0, 		UpdateEdit:0,          Format:"Integer",			PointCount:0		},
                   {Type:"Float",      Hidden:0,  Width:60,      Align:"Right",     ColMerge:1,         SaveName:prefix+"alloc_ea_qty",       	KeyField:0, 		UpdateEdit:0,          Format:"Integer",			PointCount:0		},
                   {Type:"Float",      Hidden:0,  Width:60,      Align:"Right",     ColMerge:1,         SaveName:prefix+"un_alloc_ea_qty",       KeyField:0, 		UpdateEdit:0,          Format:"Integer",			PointCount:0		},
                   {Type:"Text",      Hidden:1,  Width:10,      Align:"Left",	   ColMerge:0,         SaveName:prefix+"rn",        			KeyField:0, 		          			   Format:""														},
                   {Type:"Date",      Hidden:0,  Width:80,      Align:"Center",    ColMerge:1,         SaveName:prefix+"inbound_dt",        	KeyField:0, 		UpdateEdit:0,          Format:"Ymd"													},
                   {Type:"Text",      Hidden:0,  Width:130,     Align:"Center",      ColMerge:1,         SaveName:prefix+"lot_no",        		KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"PopupEdit", Hidden:0,  Width:90,      Align:"Center",    ColMerge:1,         SaveName:prefix+"wh_loc_cd_nm",        	KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"Float",      Hidden:0,  Width:70,      Align:"Right",     ColMerge:1,         SaveName:prefix+"pick_item_ea_qty",      KeyField:0, 		UpdateEdit:0,          Format:"Integer",			PointCount:0			},
                   {Type:"Text",      Hidden:0,  Width:100,     Align:"Center",      ColMerge:1,         SaveName:prefix+"sao_no",        	    KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"Text",      Hidden:0,  Width:100,     Align:"Center",    ColMerge:1,         SaveName:prefix+"wib_bk_no",        		KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"Text",      Hidden:0,  Width:100,     Align:"Center",      ColMerge:1,         SaveName:prefix+"po_no_in",        		KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"Date",      Hidden:0,  Width:100,      Align:"Center",    ColMerge:1,         SaveName:prefix+"exp_dt",        		KeyField:0, 		UpdateEdit:0,          Format:"Ymd"													},
                   {Type:"Text",      Hidden:0,  Width:80,      Align:"Left",      ColMerge:1,         SaveName:prefix+"lot_04",        		KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"Text",      Hidden:0,  Width:80,      Align:"Left",      ColMerge:1,         SaveName:prefix+"lot_05",        		KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"Text",      Hidden:0,  Width:120,     Align:"Center",    ColMerge:1,         SaveName:prefix+"lot_id",        		KeyField:0, 		UpdateEdit:0,          Format:""														},
                   {Type:"Text",      Hidden:1,  Width:10,                  						   SaveName:prefix+"proc_mode",														   Format:""														},
                   {Type:"Status",    Hidden:1,  Width:0,         									   SaveName:prefix+"ibflag", 																															},
                   {Type:"Text",      Hidden:1,  Width:0,                   						   SaveName:prefix+"walc_no", 														   Format:""														},
                   {Type:"Text",      Hidden:1,  Width:0,                   						   SaveName:prefix+"sao_sys_no", 													   Format:""														},
                   {Type:"Text",      Hidden:1,  Width:0,                   						   SaveName:prefix+"po_sys_no", 													   Format:""														},
                   {Type:"Text",      Hidden:1,  Width:0,                   						   SaveName:prefix+"wh_loc_cd", 													   Format:""														},
                   {Type:"Text",      Hidden:1,  Width:0,                   						   SaveName:prefix+"rum", 															   Format:""														},
                   {Type:"Text",      Hidden:1,  Width:0,                   						   SaveName:prefix+"issu_cnt", 														   Format:""														},
                   {Type:"Text",      Hidden:1,  Width:0,                   						   SaveName:prefix+"lp_cnt", 														   Format:""														} ];
       
      InitColumns(cols);
      SetSheetHeight(450);
      SetHeaderRowHeight(30);
//      SetAutoRowHeight(0);
      resizeSheet();
      SetEditable(1);
      SetImageList(0,APP_PATH+"/web/img/main/icon_search_s.gif");
            }
      break;


	case "sheet5":      //IBSheet5 init
	    with(sheetObj){
        
      var hdr1="field_name|wob_bk_no|field_val|doc_type|flg";
//      var headCount=ComCountHeadTitle(hdr1);
//      (headCount, 0, 0, true);
      var prefix=fix_grid05;

      SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:0 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [ { Text:hdr1, Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [ {Type:"Text",      Hidden:0,  Width:200,     Align:"Left",    ColMerge:1,         SaveName:prefix+"field_name",         Format:"" },
                   {Type:"Text",      Hidden:0,  Width:120,     Align:"Center",  ColMerge:1,         SaveName:prefix+"wob_bk_no",          Format:"" },
                   {Type:"Text",      Hidden:0,  Width:100,     Align:"Left",    ColMerge:1,         SaveName:prefix+"field_val",          Format:"" },
                   {Type:"Text",      Hidden:1,  Width:150,     Align:"Left",    ColMerge:1,         SaveName:prefix+"doc_type",           Format:"" },
                   {Type:"Status",    Hidden:1,  Width:50,      Align:"Center",         			 SaveName:prefix+"ibflag",                       }];
      InitColumns(cols);
      SetSheetHeight(450);
      SetHeaderRowHeight(30);
//      SetAutoRowHeight(0);
      resizeSheet();
      SetEditable(0);
      //SetGetWaitImageVisible()(0);
      //SetGetCountPosition()(0);
      SetRowHidden(0, 1);
            }
      break;
	}
}
/*
 * allocated list searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=sheet1;
	var arr=new Array(); 
	arr[0]=fix_grid01+ "item_cbm";
	arr[1]=fix_grid01+ "item_cbf";
	arr[2]=fix_grid01+ "item_grs_kgs";
	arr[3]=fix_grid01+ "item_grs_lbs";
	arr[4]=fix_grid01+ "item_net_kgs";
	arr[5]=fix_grid01+ "item_net_lbs";
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
 		sheetObj.SetCellImage(i, fix_grid01 + "manual_alloc_img",0);
	var issu_cnt=eval(sheetObj.GetCellValue(i, fix_grid01 + "issu_cnt"));
	var lp_cnt=eval(sheetObj.GetCellValue(i, fix_grid01 + "lp_cnt"));
	if(sheetObj.GetCellValue(i, fix_grid01 + "walc_no") == "")
		{
			sheetObj.SetCellEditable(i, fix_grid01+ "chk",0);
		}
		else if(issu_cnt + lp_cnt > 0)
		{
			sheetObj.SetCellEditable(i, fix_grid01+ "chk",0);
		}
		for (var m=0; m<arr.length; m++)
		{
			if(sheetObj.GetCellValue(i, fix_grid01 + "proc_mode") == "I")
			{
				sheetObj.SetCellEditable(i, arr[m],0);
			}
			else
			{
				sheetObj.SetCellEditable(i, arr[m],1);
			}
		}
	}
}
/*
 * allocated list DblClick event
 */
function sheet1_OnClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	switch (colName)
	{
		case fix_grid01 + "manual_alloc_img": //Manual Alloc
			popupManualAllcPopup("ALL", "S", "&search_no="   + $("#wave_no").val() 
					                 +"&wh_cd=" + $("#wave_wh_cd").val()
					                //+ "&item_sys_no=" + sheetObj.CellValue(Row, fix_grid01+"item_sys_no")
					                //+ "&item_seq="    + sheetObj.CellValue(Row, fix_grid01+"item_seq")
					                 + "&rum="         + sheetObj.GetCellValue(Row, fix_grid01+"rum")
					             );
			break;
	}
}
/*
 * allocated list OnChange event
 */
function sheet1_OnChange(sheetObj, row, col, Value) {
	var colStr=sheetObj.ColSaveName(col);
	if (colStr == (fix_grid01+"item_cbf") && Value != "") 
	{
		funcKGS_CBM_CAC("CBF_CBM", (fix_grid01+"item_cbf"), (fix_grid01+"item_cbm"), sheetObj);		
	} 
	else if (colStr == (fix_grid01+"item_grs_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid01+"item_grs_lbs"), (fix_grid01+"item_grs_kgs"), sheetObj);		
	} 
	else if (colStr == (fix_grid01+"item_net_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid01+"item_net_lbs"), (fix_grid01+"item_net_kgs"), sheetObj);		
	}
	
	
		
}
function sheet3_OnChange(sheetObj, row, col) {
	 var colStr=sheetObj.ColSaveName(col);
	 checkBoxOnOff(sheetObj, colStr);
	}
function sheet2_OnChange(sheetObj, row, col) {
	 var colStr=sheetObj.ColSaveName(col);
	 checkBoxOnOff(sheetObj, colStr);
	}
/*
 * order list OnSearchEnd event
 */
function sheet2_OnSearchEnd(sheetObj, ErrMsg){
	var sheetObj=sheet2;
	var issu_cnt_tot=0;
	var lp_cnt_tot=0;
	var allc_cnt_tot=0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
		sheetObj.SetCellFontColor(i, fix_grid02 + "wob_bk_no","#0100FF");
		//CONTRACT NO 폰트색상 변경
		sheetObj.SetCellFontColor(i, fix_grid02 + "ctrt_no","#0100FF");
		
		sheetObj.SetCellFontUnderline(i, fix_grid02 +  "wob_bk_no", 1);
		sheetObj.SetCellFontUnderline(i, fix_grid02 +  "ctrt_no", 1);
		
		if(sheetObj.GetCellValue(i, fix_grid02 + "walc_no") != "")
		{
			sheetObj.SetCellEditable(i, fix_grid02+ "chk",0);
		}
		issu_cnt_tot += eval(sheetObj.GetCellValue(i, fix_grid02 + "issu_cnt"));
		lp_cnt_tot   += eval(sheetObj.GetCellValue(i, fix_grid02 + "lp_cnt"));
		allc_cnt_tot += eval(sheetObj.GetCellValue(i, fix_grid02 + "allc_cnt"));
	}
	$("#issu_cnt_tot").val(issu_cnt_tot);
	$("#lp_cnt_tot").val(lp_cnt_tot);
	$("#allc_cnt_tot").val(allc_cnt_tot);
	check_authority_wh(); //check authority warehouse 
}
/*
 * order list OnDblClick event
 */
function sheet2_OnDblClick(sheetObj, Row, Col) {
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid02 + "wob_bk_no":
var sUrl=APP_PATH+"/WHOutbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid02 + "wob_bk_no");
			parent.mkNewFrame('Outbound Booking Management', sUrl, "WHOutbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid02 + "wob_bk_no"));
		break;
		case fix_grid02 + "ctrt_no":
var sUrl=APP_PATH+"/CtrtMgmt.clt?ctrt_no="+ sheetObj.GetCellValue(Row, fix_grid02 + "ctrt_no");
			parent.mkNewFrame('Contract Management', sUrl,"CtrtMgmt_" + sheetObj.GetCellValue(Row, fix_grid02 + "ctrt_no"));
			break;
	}
}
/*
 * allocated list searchend event
 */
function sheet3_OnSearchEnd(){
	var sheetObj=sheet3;//docObjects[0];
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		var issu_cnt=eval(sheetObj.GetCellValue(i, fix_grid03 + "issu_cnt"));
		var lp_cnt=eval(sheetObj.GetCellValue(i, fix_grid03 + "lp_cnt"));
		if(issu_cnt + lp_cnt > 0)
		{
			sheetObj.SetCellEditable(i, fix_grid03+ "chk",0);
		}
	}
	check_authority_wh(); // check authority warehouse 
}
/*
 * un-allocated list searchend event
 */
function sheet4_OnSearchEnd(){
	var sheetObj=sheet4;	
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
 		sheetObj.SetCellImage(i, fix_grid04 + "manual_alloc_img",0);
	}	
}
/*
 * un-allocated list DblClick event
 */
function sheet4_OnDblClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	switch (colName)
	{
		case fix_grid04 + "manual_alloc_img": //Manual Alloc
			popupManualAllcPopup("UN", "S", "&search_no="   + $("#wave_no").val() 
					                 +"&wh_cd=" + $("#wave_wh_cd").val()
+ "&rum="         + sheetObj.GetCellValue(Row, fix_grid04+"rum")
					             );
			break;
	}	
}
function sheet5_OnSearchEnd(sheetObj, ErrMsg){
	for(var i=sheetObj.HeaderRows(); i < (sheetObj.RowCount()+sheetObj.HeaderRows()) ; i++){
		sheetObj.SetCellFontColor(i, fix_grid05+"wob_bk_no","#0000FF");
		sheetObj.SetCellBackColor(i, fix_grid05+"field_name","#D9E5FF");
		sheetObj.SetCellFontColor(i, fix_grid05+"field_val","#0000FF");
		sheetObj.SetCellFont("FontBold", i, fix_grid05+"field_name",1);
	}
}
/**
 * Doc Detail sheet 더블클릭시
 * @param sheetObj
 * @param Row
 * @param Col
 */
function sheet5_OnDblClick(sheetObj, Row, Col) {
	var formObj=document.form;	
	var sName=sheetObj.ColSaveName(Col);
var sValue=sheetObj.GetCellValue(Row, Col);
	if (!isNull2(sValue) && sName == (fix_grid05+"field_val")) {
if ("OCBK" == sheetObj.GetCellValue(Row, fix_grid05+"doc_type")) { // Outbound Complete by Booking
			var sUrl=APP_PATH+"/WHOCUpdate.clt?search_no="+sValue+"&search_tp=WOB_OUT_NO&search_div=bk";			
			parent.mkNewFrame("Outbound Complete Update", sUrl, "WHOCUpdate_" + sValue + "_" + "WOB_OUT_NO" + "_" + "bk");
} else if ("LP" == sheetObj.GetCellValue(Row, fix_grid05+"doc_type")) { // Load Plan
			var sUrl=APP_PATH+"/LoadPlanMgmt.clt?s_consol_no="+sValue;		
			parent.mkNewFrame('Loading Plan Management', sUrl, "LoadPlanMgmt_" + sValue);
} else if ("OCLP" == sheetObj.GetCellValue(Row, fix_grid05+"doc_type")) { // Outbound Complete by Load Plan
			var sUrl=APP_PATH+"/WHOCUpdate.clt?search_no="+sValue+"&search_tp=LP_NO&search_div=lp";
			parent.mkNewFrame('Outbound Complete Update', sUrl,"WHOCUpdate_" + sValue + "_" + "LP_NO" + "_" + "lp");
		}
	}
	else if(sName == (fix_grid05+"wob_bk_no"))
	{
var sUrl=APP_PATH+"/WHOutbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid05 + "wob_bk_no");
		parent.mkNewFrame('Outbound Booking Management', sUrl,"WHOutbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid05 + "wob_bk_no"));
	}
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
		case "btn_to_bk_date":	
            var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.fm_bk_date, formObj.to_bk_date, 'MM-dd-yyyy');
			break;
		case "btn_pick_date":	
			var cal=new ComCalendar();
            cal.select(formObj.pick_dt, 'MM-dd-yyyy');
			break;
		case "btn_ctrt_no" :
			var sUrl="./ContractRoutePopup.clt?ctrt_nm="+$("#ctrt_nm").val()+"&ctrt_no="+$("#ctrt_no").val();
			callBackFunc = "setCtrtNoInfo";
		    modal_center_open(sUrl, callBackFunc, 900,580,"yes");
			break;
		case "btn_buyer_cd" : 
			var formObj=document.form;
		    rtnary[0]="";
		    rtnary[1]=formObj.buyer_nm.value;
			callBackFunc = "setConsigneeInfo";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
				break;
		case "SEARCHLIST":
			btn_Search();
		break;
		case "btn_new_wave":
			btn_New();
			break;
		case "btn_save_wave":
			btn_Save();
			break;
		case "btn_delete_wave":
			btn_Delete();
			break;
		case "btn_print_wave":
			btn_Print('wave');
			break;
		case "row_add":
			row_add();
			break;
		case "row_del":
			row_del();
			break;
		case "btn_allocation_wave":
			btn_Allocation('wave');
			break;
		case "btn_manualalloc_wave":
			btn_ManualAlloc('wave');
			break;
		case "btn_cancel_wave":
			btn_Cancel('wave');
			break;
		case "btn_cancel_allc":
			btn_Cancel('allc');
			break;
		case "btn_print_allc":
			btn_Print('allc');
			break;
		case "btn_allocation_un":
			btn_Allocation('un');
			break;
		case "btn_manualalloc_un":
			btn_ManualAlloc('un');
			break;
		case "btn_excel_un":
			btn_Excel();
			break;
		case "btn_Print_un":
			btn_Print('un');
			break;
		case "link_loadplan_allc":  
			btn_Load_Plan('allc');
			break;
		case "link_outboundcomplete_allc":
			btn_Outbound_Complete('allc');
			break;
		case "link_invreplenishment_un":
			btn_InvReplenishment('un');
			break;
		case "link_loadplan_wave":
			btn_Load_Plan('wave');
			break;
		case "link_outboundcomplete_wave":
			btn_Outbound_Complete('wave');
			break;
		case "link_invreplenishment_wave":
			btn_InvReplenishment('wave');
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
 * NEW BUTTON
 */
function btn_New()
{
	commonModeChange("NEW");
}
/*
 * SEARCH BUTTON
 * WAVE KEY 존재시, 기존 WAVE 조회
 * WAVE KEY 미존재시, 신규 WAVE 생성
 */
function btn_Search()
{
	var formObj=document.form;
	//validation check
	if (validateForm(formObj, 'search') == false) 
	{
		return;	
	}
	doShowProcess();
	setTimeout(function(){
	commonModeChange("SEARCH_BEF");
	if($("#in_wave_no").val().trim() == "") //신규 wave crate
	{
		searchNewInfo();
	}
	else //기존 wave_no건 조회
	{
		searchWaveInfo();
	}
	doHideProcess(false); 
	},100);
	
}
/*
 *   WAVE KEY 미존재시, 신규 WAVE 생성(Order List만 조회)
 */
function searchNewInfo()
{
	var formObj=document.form;
	var sheetObj=sheet2;
	formObj.f_cmd.value=SEARCH01;
	doShowProcess();
	setTimeout(function(){
    //var sXml=sheetObj.GetSearchData("searchWaveNewOrderList.clt", FormQueryString(formObj, ""));
    var sXml=sheetObj.GetSearchData("./WaveMgmt_2GS.clt", FormQueryString(formObj, ""));
	//var xml= convertColOrder(sXml,"Grd02");
	sheetObj.LoadSearchData(sXml);
	},100);
	doHideProcess();
    commonModeChange("SEARCH_NEW");
    //wave_wh_cd 에 조건으로 들어간 wh_cd넣기
    $("#wave_wh_cd").val($("#wh_cd").val());
    $("#wave_wh_nm").val("");
    $("#wave_ctrt_no").val($("#ctrt_no").val());
    $("#wave_ctrt_nm").val($("#ctrt_nm").val());
}
/*
 * WAVE KEY 존재시, 기존 WAVE 조회
 */
var InputName="wave_no|pick_dt|pick_hm_fr|pick_hm_to|rmk|wave_wh_cd|wave_wh_nm|wave_ctrt_no|wave_ctrt_nm";
function searchWaveInfo()
{
	var formObj=document.form;
	var sheetObj1=sheet1;
	var sheetObj2=sheet2;
	var sheetObj3=sheet3;
	var sheetObj4=sheet4;
	var sheetObj5=sheet5;
	//var sXml=sheetObj1.GetSearchData("searchWaveMgmt.clt", FormQueryString(formObj, ""));
	formObj.f_cmd.value=SEARCH;
	var sXmlForm=sheetObj1.GetSearchData("WaveMgmtGS.clt", FormQueryString(formObj, ""));
	displayData(sXmlForm);
	if(getTotalRow(sXmlForm) == "0"){
		ComShowCodeMessage("COM0266", "Wave Key");
		formObj.in_wave_no.focus();
		return;
	}
	commonModeChange("SEARCH_MGMT");
	formObj.f_cmd.value=SEARCH02;
	var sXmlOrderList=sheetObj2.GetSearchData("WaveMgmt_2GS.clt", FormQueryString(formObj, ""));
	//order list
	sheetObj2.LoadSearchData(sXmlOrderList,{Sync:1} );
	
	formObj.f_cmd.value=SEARCH03;
	var sXmlAllcList=sheetObj1.GetSearchData("WaveMgmt_1GS.clt", FormQueryString(formObj, ""));
	//allocation list
	sheetObj1.LoadSearchData(sXmlAllcList,{Sync:1} );
	
	formObj.f_cmd.value=SEARCH04;
	var sXmlAllCatedList=sheetObj3.GetSearchData("WaveMgmt_3GS.clt", FormQueryString(formObj, ""));
	//allocated list
	sheetObj3.LoadSearchData(sXmlAllCatedList,{Sync:1} );
	
	formObj.f_cmd.value=SEARCH05;
	var sXmlUnAllcList=sheetObj4.GetSearchData("WaveMgmt_4GS.clt", FormQueryString(formObj, ""));
	//un-allocated list
	sheetObj4.LoadSearchData(sXmlUnAllcList,{Sync:1} );
	
	formObj.f_cmd.value=SEARCH06;
	var sXmlDocDetail=sheetObj5.GetSearchData("WaveMgmt_5GS.clt", FormQueryString(formObj, ""));
	//doc detail list
	sheetObj5.LoadSearchData(sXmlDocDetail,{Sync:1} );
	
	
	
	
//	for(var i=0; i<arrXml.length; i++){
//		if(i == 0){
//			//ibSheetView Xml 을 HTML태그(Object) 오브젝트의 value 세팅
//			ComsetXmlDataToForm2(arrXml[i], InputName, 2);
//		} else if(i == 1){ //order list
//			sheetObj2.LoadSearchData(convertColOrder(arrXml[i],"Grd02"),{Sync:1} );
//		} else if(i == 2){ //allocation list
//			sheetObj1.LoadSearchData(convertColOrder(arrXml[i],"Grd01"),{Sync:1} );
//		} else if(i == 3){ //allocated list
//			sheetObj3.LoadSearchData(convertColOrder(arrXml[i],"Grd03"),{Sync:1} );
//		} else if(i == 4){ //un-allocated list
//			sheetObj4.LoadSearchData(convertColOrder(arrXml[i],"Grd04"),{Sync:1} );
//		} else if(i == 5){ //doc detail list
//			sheetObj5.LoadSearchData(convertColOrder(arrXml[i],"Grd05"),{Sync:1} );
//		}
//	}
}
function btn_Save()
{
	var formObj=document.form;
	var sheetObj=sheet2; //ORDER LIST
	var sheetObjO=sheet1; //cbm, kgs, net 정보 저장(alloc생성된 건만...)
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
	var tl_wo_document_info_header="Docin";
	var mode=tl_wo_document_info_header+"mode="		+$("#mode").val();
	var wave_no="&"+tl_wo_document_info_header+"wave_no="		+$("#wave_no").val();
	var wh_cd="&"+tl_wo_document_info_header+"wh_cd="		+$("#wave_wh_cd").val();
	var pick_dt="&"+tl_wo_document_info_header+"pick_dt="		+$("#pick_dt").val();
	var pick_hm_fr="&"+tl_wo_document_info_header+"pick_hm_fr="	+$("#pick_hm_fr").val();
	var pick_hm_to="&"+tl_wo_document_info_header+"pick_hm_to="	+$("#pick_hm_to").val();
	var rmk="&"+tl_wo_document_info_header+"rmk="			+$("#rmk").val();
	var docinParamter=mode+wave_no+wh_cd+pick_dt+pick_hm_fr+pick_hm_to+rmk;
	var sheetDatas=ComGetSaveString(sheetObj, true, true); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
	var sheetDatasO=ComGetSaveString(sheetObjO, true, false); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
	formObj.f_cmd.value = MODIFY;
	//var sParam = FormQueryString(formObj) + '&' + sheetObjO.GetSaveString();
	var sParam= FormQueryString(formObj) +'&'+sheetDatas+'&'+sheetDatasO;
	var saveXml=sheetObj.GetSearchData("./WaveMgmt_6GS.clt", sParam);
	//1. Save 후 재조회
	//SaveEnd
	if (saveXml.replace(/^\s+|\s+$/gm,'') != ''){
//		ComShowCodeMessage("COM0093");
		//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		
		var xmlDoc = $.parseXML(saveXml);
		var $xml = $(xmlDoc);
		var wave_no= $xml.find( "result").text()
		$("#in_wave_no").val(wave_no);
		btn_Search();
	}
	/*if( saveXml.indexOf('<MESSAGE>') == -1){
		ComShowCodeMessage("COM0093");//저장이완료되었습니다.
		var wave_no=ComGetEtcData(saveXml, "wave_no");
		$("#in_wave_no").val(wave_no);
		var wh_cd=$("#wh_cd").val();
		var wh_nm=$("#wh_nm").val();
		var ctrt_no=$("#ctrt_no").val();
		var ctrt_nm=$("#ctrt_nm").val();
		formObj.reset();
		$("#in_wave_no").val(wave_no);
		$("#wh_cd").val(wh_cd);
		$("#wh_nm").val(wh_nm);
		$("#ctrt_no").val(ctrt_no);
		$("#ctrt_nm").val(ctrt_nm);
		
		btn_Search();
	}*/
}
/*
 * Allocation
 */
function btn_Allocation(tab_div)
{
	var formObj  = document.form;
	var sheetObj=sheet2;
	if(sheetObj.RowCount()<= 0)
	{
		ComShowCodeMessage("COM0185","");
		return;
	}
	var sheetObjO;
	switch(tab_div)
	{
		case (fix_wave):
			sheetObjO=sheet1;
			break;
		case (fix_un):
			sheetObjO=sheet4;
			break;
		default:
			sheetObjO=sheet2;
			break;
	}
	if(ComShowCodeConfirm("COM0311") == false){
		return;
	}
	//check status booking : Completed or not.
	ajaxSendPost(resultcountstatus, 'reqVal', '&goWhere=aj&bcKey=checkbookingstatuswave&wave_no='+ formObj.in_wave_no.value, './GateServlet.gsl');
	if(checkallocation == false){
		ComShowMessage("There are no unallocated items.");
		return;
	}else{
	var tl_wo_document_info_header="Docin";
	var div=tl_wo_document_info_header+"div=WAVE";
	var wave_no="&"+ tl_wo_document_info_header+"wave_no="+$("#wave_no").val();
	var wh_cd="&"+ tl_wo_document_info_header+"wh_cd="+$("#wave_wh_cd").val();
	var alloc_option="&"+ tl_wo_document_info_header+"alloc_option="+document.form.alloc_option.value;
	var alloc_ord="&"+ tl_wo_document_info_header+"alloc_ord="+document.form.alloc_ord.value;
	var f_cmd="&f_cmd="+MULTI;
	var docinParamter=div+wave_no+wh_cd+alloc_option+alloc_ord+f_cmd;
	
	var isheetSaveParamters=docinParamter;
	var saveXml=sheetObj.GetSearchData("./AllcMgmt_1GS.clt", isheetSaveParamters);
	//formObj.f_cmd.value = MODIFY03;
	//var saveXml=sheetObj.GetSearchData("./WaveMgmt_7GS.clt", FormQueryString(formObj) + '&div=WAVE');
	//1. Save 후 재조회
	//SaveEnd
//	if( saveXml.replace(/^\s+|\s+$/gm,'') != ''){
//		var suYn=ComGetEtcData(saveXml, "suYn");
//		var suValue=ComGetEtcData(saveXml, "suValue");
//		if(suYn == "Y")
//		{
//			ComShowCodeMessage("COM0324"); //allocation이 완료되었습니다.
//			$("#in_wave_no").val($("#wave_no").val());
//			btn_Search();
//		}
//		else
//		{
//			ComShowCodeMessage(suValue);
//		}
//	}
	var xmlDoc = $.parseXML(saveXml);
	var $xml = $(xmlDoc);
 	if(getTotalRow(saveXml)!="0")
 		{
 			var suYn = $xml.find("rtncd").text();
 			var suValue = $xml.find("rtnmsg").text();
 			if(suYn == "Y")
				{
					ComShowCodeMessage("COM0324"); //allocation이 완료되었습니다.
					ComLog("7. saveAutoAlloc 완료메시지후 btn_search전");
					btn_Search();
				}
				else
				{
					ComShowCodeMessage(suValue);
				}
 		}
	}
}

function resultcountstatus(reqVal) {
	
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] == 0){
				checkallocation = true;
			}else{
				checkallocation = false;
			}
		}
	}
}
/*
 * manual allocation
 */
function btn_ManualAlloc(tab_div)
{
	var sheetObjO;
	var cond_div;
	switch(tab_div)
	{
		case (fix_wave):
			sheetObjO=sheet1;
			cond_div="ALL";
			break;
		case (fix_un):
			sheetObjO=sheet4;
			cond_div="UN";
			break;
		default:
			sheetObjO=sheet1;
			cond_div="ALL";
			break;
	}
	if(sheetObjO.RowCount()<= 0)
	{
		ComShowCodeMessage("COM0185","");
		return;
	}
	popupManualAllcPopup(cond_div, "A", "&search_no="   + $("#wave_no").val() 
            +"&wh_cd=" + $("#wave_wh_cd").val()
           + "&rum=" + sheet1.GetCellValue(sheet1.GetSelectRow(),"Grd01rum")
        );
}
function popupManualAllcPopup(cond_div, mode, param)
{
	//div : WAVE
	//cond_div : ALL : 부킹기준 전체(ALLOCATION LIST)
    //           ALLCED : ALLOCATED LIST만
    //           UN : UN-ALLOCATED LIST
	//M : 화면의 전체 ManualAlloc 버튼 클릭
	//S : 시트에서 상품SEQ별 클릭
	//alert(mode);
	//alert(param);
	var sUrl="ManualAllcPopup.clt?div=WAVE&cond_div=" + cond_div + "&mode=" + mode + param;
	
	callBackFunc = "setManualAllc";
    modal_center_open(sUrl, callBackFunc, 900, 540,"yes");
}
function setManualAllc()
{
	$("#in_wave_no").val($("#wave_no").val());
	btn_Search();
}
/*
 * order list del
 */
function row_add()
{
	//STOCK SELECTION 팝업
	var sParam="ctrt_no=" + $("#wave_ctrt_no").val();
	sParam += "&ctrt_nm=" + $("#wave_ctrt_nm").val();
	sParam += "&wh_cd=" + $("#wave_wh_cd").val();
	sParam += "&wh_nm=" + $("#wave_wh_nm").val();		
	var sUrl="./WaveBookingSelectPopup.clt?" + sParam;
	callBackFunc = "setBookingAddInfo";
    modal_center_open(sUrl, callBackFunc, 1000, 580 ,"yes");
}
function setBookingAddInfo(rtnVal)
{
//	var sheetObj=sheet2;
//	for(var k=0; k < aryPopupData.length; k++){
//		//중복건체크
//		var cnt=0;
//		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
//if(aryPopupData[k][1] == sheetObj.GetCellValue(i, fix_grid02 + "wob_bk_no") && sheetObj.GetCellValue(i, fix_grid02 + "ibflag") != "D")
//			{
//				cnt ++;
//				break;
//			}
//		}
//		if(cnt == 0)
//		{
//			//중복건이 없을때 행추가
//			var insertRow=sheetObj.DataInsert(-1);
//			sheetObj.SetCellValue(insertRow, fix_grid02+"wob_bk_no",aryPopupData[k][1],0);
//			sheetObj.SetCellValue(insertRow, fix_grid02+"bk_date",aryPopupData[k][2],0);
//			sheetObj.SetCellValue(insertRow, fix_grid02+"est_out_dt",aryPopupData[k][3],0);
//			sheetObj.SetCellValue(insertRow, fix_grid02+"buyer_cd",aryPopupData[k][4],0);
//			sheetObj.SetCellValue(insertRow, fix_grid02+"buyer_nm",aryPopupData[k][5],0);
//			sheetObj.SetCellValue(insertRow, fix_grid02+"ctrt_no",aryPopupData[k][6],0);
//			sheetObj.SetCellValue(insertRow, fix_grid02+"ctrt_nm",aryPopupData[k][7],0);
//			sheetObj.SetCellValue(insertRow, fix_grid02+"cust_ord_no",aryPopupData[k][8],0);
//		}
//	}
	//var rtnValAry=rtnVal.split("$$");
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}
	for(var k=0; k < rtnVal.length; k++)
		{
		if(sheet2.FindText("Grd02wob_bk_no",rtnVal[k]["wob_bk_no"]) > 0)
			continue;
		
		var insertRow=sheet2.DataInsert(-1);
		sheet2.SetCellValue(insertRow, fix_grid02+"wob_bk_no",rtnVal[k]["wob_bk_no"],0);
		sheet2.SetCellValue(insertRow, fix_grid02+"bk_date",rtnVal[k]["bk_date"],0);
		sheet2.SetCellValue(insertRow, fix_grid02+"est_out_dt",rtnVal[k]["est_out_dt"],0);
		sheet2.SetCellValue(insertRow, fix_grid02+"buyer_cd",rtnVal[k]["buyer_cd"],0);
		sheet2.SetCellValue(insertRow, fix_grid02+"buyer_nm",rtnVal[k]["buyer_nm"],0);
		sheet2.SetCellValue(insertRow, fix_grid02+"ctrt_no",rtnVal[k]["ctrt_no"],0);
		sheet2.SetCellValue(insertRow, fix_grid02+"ctrt_nm",rtnVal[k]["ctrt_nm"],0);
		sheet2.SetCellValue(insertRow, fix_grid02+"cust_ord_no",rtnVal[k]["cust_ord_no"],0);
		
		//BOOKING NO 폰트색상 변경
		sheet2.SetCellFontColor(insertRow, fix_grid02 + "wob_bk_no","#0100FF");
		//CONTRACT NO 폰트색상 변경
		sheet2.SetCellFontColor(insertRow, fix_grid02 + "ctrt_no","#0100FF");
		
		sheet2.SetCellFontUnderline(insertRow, fix_grid02 +  "wib_bk_no", 1);
		sheet2.SetCellFontUnderline(insertRow, fix_grid02 +  "ctrt_no", 1);
	}
}
/*
 * order list del
 */
function row_del()
{
	var sheetObj=sheet2;
	ComRowHideDelete(sheetObj, fix_grid02 + "chk");
}
/*
 * allc cancel
 */
function btn_Cancel(tab_div)
{
	var formObj = document.form;
	var sheetObj;
	var fix_grid="";
	var div="";
	var cond_div="";
	var saveXml="";
	switch(tab_div)
	{
		case (fix_wave):
			sheetObj=sheet1;
			fix_grid=fix_grid01;
			cond_div="ALL";
			break;
		case (fix_allc):
			sheetObj=sheet3;
			fix_grid=fix_grid03;
			cond_div="ALLCED";
			break;
		default:
			sheetObj=sheet1;
			fix_grid=fix_grid01;
			cond_div="ALL";
			break;
	}
	//할당이 단한번도 되지않은경우
	var allc_cnt=eval($("#allc_cnt_tot").val());
	if(allc_cnt <= 0)
	{
		ComShowCodeMessage("COM0330"); 
		return;
	}
	var iChkCnt=sheetObj.CheckedRows(fix_grid+"chk");
	if(iChkCnt == 0)
	{
		//valid check
		if(eval($("#issu_cnt_tot").val()) > 0)
		{
			ComShowCodeMessage("COM0333"); //issu_cnt가 존재할경우
			return;
		}
		if(eval($("#lp_cnt_tot").val()) > 0)
		{
			ComShowCodeMessage("COM0334"); //ship이 존재할경우
			return;
		}
		//wave에 해당하는 allocation정보 모두 삭제
		div="ALL";
	}
	else //partial cancel
	{
		div="PT";
	}
	//confirm
	if(!ComShowCodeConfirm("COM0040")){
		return;
	}
	switch(div)
	{
		case "ALL":			
			formObj.f_cmd.value = MODIFY04;
			saveXml=docObjects[0].GetSearchData("./WaveMgmt_6GS.clt", FormQueryString(formObj) + '&cncl_div=ALLC');
			break;
		case "PT":
			formObj.f_cmd.value = MODIFY05;
			var sheetDatas1=sheetObj.GetSaveString(); //sheetObjs, bUrlEncode, allSave, col
			saveXml=docObjects[0].GetSearchData("./WaveMgmt_6GS.clt", FormQueryString(formObj) + '&cond_div=' + cond_div+"&"+ComReplaceStr(sheetDatas1, fix_grid03, fix_grid01));
			break;
	}
	//1. Cancel 후 조회
	if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
//		ComShowCodeMessage("COM0079", "");
		//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		//imNew();
		$("#in_wave_no").val($("#wave_no").val());
		btn_Search();
	}
}
function btn_Delete()
{
	var formObj = document.form;
	var sheetObj=sheet1;
	var saveXml="";
	//valid check
	if(eval($("#issu_cnt_tot").val()) > 0)
	{
		ComShowCodeMessage("COM0356"); //issu_cnt가 존재할경우
		return;
	}
	if(eval($("#lp_cnt_tot").val()) > 0)
	{
		ComShowCodeMessage("COM0357"); //ship이 존재할경우
		return;
	}
	//confirm
	if(!ComShowCodeConfirm("COM0053")){
		return;
	}
//	var tl_wo_document_info_header="Docin";
//	var wave_no="&"+tl_wo_document_info_header + "wave_no="   +$("#wave_no").val().trim();
//	var wh_cd="&"+tl_wo_document_info_header + "wh_cd="     +$("#wave_wh_cd").val().trim();
//	var docinParamter=wave_no+wh_cd;
//	var isheetSaveParamters=docinParamter + "&" + tl_wo_document_info_header + "cncl_div=WAVE"; //&cncl_div=ALLC : ALLC정보만 캔슬
	
	formObj.f_cmd.value = MODIFY04;                                                            //&cncl_div=WAVE : WAVE정보 +  ALLC존재시 ALLC정보  
	saveXml=sheetObj.GetSearchData("./WaveMgmt_6GS.clt", FormQueryString(formObj) + '&cncl_div=WAVE');
	//sheetObj.LoadSaveData(saveXml);
	//1. Cancel 후 조회
	if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
		showCompleteProcess();
		ComShowCodeMessage("COM0080", "");
		btn_New();
	}
}
/*
 * 엑셀다운로드
 */
function btn_Excel() {	
	if(docObjects[3].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	//docObjects[3].Down2Excel();
    	docObjects[3].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[3]), SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
    }
}
/*
 * 프린트
 */
function btn_Print(tab_div)
{
	//할당이 단한번도 되지않은경우
	var allc_cnt=eval($("#allc_cnt_tot").val());
	if(allc_cnt <= 0)
	{
		ComShowCodeMessage("COM0330"); 
		return;
	}
	var sUrl="WHOutbkPrintOption.clt?";
	sUrl=sUrl + "page_tp="  + "WAVE";
	sUrl=sUrl + "&wave_no=" + $("#wave_no").val();
	sUrl=sUrl + "&wh_cd="   + $("#wave_wh_cd").val();	
	
	callBackFunc = "setPrintOptionInfo";
    modal_center_open(sUrl, callBackFunc, 1000, 650 ,"yes");
}
/*
 * outbound complete화면으로 이동
 */
function btn_Outbound_Complete(tab_div)
{
	if (ComDisableTdButton("link_outboundcomplete_" + tab_div, 2)) {
		return;
	}
	//할당이 단한번도 되지않은경우
	var allc_cnt=eval($("#allc_cnt_tot").val());
	if(allc_cnt <= 0)
	{
		ComShowCodeMessage("COM0330"); 
		return;
	}
	var sUrl=APP_PATH+"/WHOCMgmt.clt?search_no=" + $("#wave_no").val() + "&search_div=wave&search_tp=WAVE_NO";
	parent.mkNewFrame('Outbound Complete Management', sUrl);
}
/*
 * LOAD PLAN
 */
function btn_Load_Plan(tab_div)
{
	var formObj =  document.form;
	if (ComDisableTdButton("link_loadplan_" + tab_div, 2)) {
		return;
	}
	var sParam="wave_no="+ $("#wave_no").val();
	/*$.ajax({
		url : "creatWHOCutbkConsolNoForWave.clt?"+sParam,
		success : function(result) {
			if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				return;
			}
			var consol_no=getXmlDataNullToNullString(result.xml,'consol_no');
			var sUrl=APP_PATH+"/LoadPlanMgmt.clt?s_consol_no="+consol_no;
			parent.mkNewFrame('Load Plan Management', sUrl);
		}
	});*/
	var sXml=docObjects[0].GetSearchData("./WaveMgmt_6GS.clt", sParam + "&f_cmd=" + MODIFY02);
	/*if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
	}*/
	var xmlDoc = $.parseXML(sXml);
	var $xml = $(xmlDoc);
	
	var consol_no=$xml.find( "result").text();
	var sUrl="./LoadPlanMgmt.clt?s_consol_no="+consol_no + '&wh_cd=' + formObj.wh_cd.value;
	parent.mkNewFrame('Load Plan Management', sUrl);
}
/*
 * Inventory Replenishment
 */
function btn_InvReplenishment(tab_div)
{
	if (ComDisableTdButton("link_invreplenishment_" + tab_div, 2)) {
		return;
	}
	var sParam="wave_no=" +  $("#wave_no").val();
	sParam += "&wave_ctrt_no=" + $("#wave_ctrt_no").val();
	sParam += "&wave_ctrt_nm=" + $("#wave_ctrt_nm").val();
	sParam += "&wave_wh_cd=" + $("#wave_wh_cd").val();
	sParam += "&wave_wh_nm=" + $("#wave_wh_nm").val();	
	var sUrl=APP_PATH + "/InvMoveMgmt.clt?" + sParam;
	parent.mkNewFrame('Inventory Movement & Hold & Damage Managemet', sUrl);
}

function ComDisableTdButton(btId, flg)
{
    if (flg==1) {
    	var vClassName = document.getElementById(btId).className;
		if("Btn_Disable" == vClassName)	return true;
		return false;
    }else if (flg==2) {
    	if(document.getElementById(btId).disabled)	return true;
		return false;
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
				if(ComIsEmpty(formObj.in_wave_no) && ComIsEmpty(formObj.wh_cd))
				{
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				//contract no 필수로 입력되어야함.
				if(ComIsEmpty(formObj.in_wave_no) && ComIsEmpty(formObj.ctrt_no))
				{
					ComShowCodeMessage("COM0114","Contract No");
					$("#ctrt_no").focus();
					return false;
				}
				//wave key 또는 booking no가 입력되지않은경우 booking date필수
				if(ComIsEmpty(formObj.in_wave_no) && ComIsEmpty(formObj.in_wob_bk_no) && ComIsEmpty(formObj.fm_bk_date))
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
				if (getDaysBetween2(formObj.fm_bk_date.value, formObj.to_bk_date.value)<0) {
					ComShowCodeMessage("COM0122","Booking Date");
					formObj.fm_bk_date.focus();
					return false;
				}
			break;
			case 'save':
				var sheetObj=sheet2;
				var rowcount=sheetObj.RowCount();
				var rowcountD = sheetObj.RowCount('D');
				if(rowcount - rowcountD <= 0)
				{
					ComShowCodeMessage("COM0185","");
					return false;
				}
				if(ComGetLenByByte($("#rmk").val().trim()) > 100){
					ComShowCodeMessage("COM0215", "Remark[100]");
					ComSetFocus(formObj.rmk);
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
}
function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
    var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "in_wob_bk_no":	
					btn_Search();
				break;	
			case "in_wave_no":	
				btn_Search();
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
function CtrtPopup(){
	var formObj=document.form;
	var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value;
	callBackFunc = "setCtrtNoInfo";
    modal_center_open(sUrl, callBackFunc, 900,550,"yes");
}
/*
 * NAME 엔터시 팝업호출 - Consignee name
 */
function ConsigneePopup(){
	var formObj=document.form;
    rtnary[0]="";
    rtnary[1]=formObj.buyer_nm.value;
	callBackFunc = "setConsigneeInfo";
	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
}
/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		formObj.ctrt_no.value = rtnValAry[0];
		formObj.ctrt_nm.value = rtnValAry[1];
	}
}
function setConsigneeInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		formObj.buyer_cd.value = rtnValAry[0];
		formObj.buyer_nm.value = rtnValAry[2];
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
	if(obj.value != ""){
		var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?loc_cd="+obj.value+"&type=WH");
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		resultLocInfo(sXml, obj.name);
	}
	else
	{
		$("#wh_nm").val("");
	}
}
function resultLocInfo(resultXml, name){
	var formObj=document.form;
	if(name == "wh_cd"){
		if(getXmlDataNullToNullString(resultXml,'loc_nm') != ""){
			formObj.wh_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
		}else{
			formObj.wh_cd.value="";
			formObj.wh_nm.value="";
		}
	}
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj){
	
	if(obj.value ==""){
		
		document.form.ctrt_no.value="";
		document.form.ctrt_nm.value="";
		return;
	}
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
	
	
	
	
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
	
}
/*
 * Consignee search
 * OnKeyDown 13 or onChange
 */
function setPrintOptionInfo(){
	
} 
function getConsigneeInfo(obj){
	
	var formObj=document.form;
	if(formObj.buyer_cd.value != ''){
		ajaxSendPost(resultConsigneeInfo, 'reqVal','&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + obj.value, './GateServlet.gsl');
	}else {
		formObj.buyer_cd.value="";
		formObj.buyer_nm.value="";
	}
}
function resultConsigneeInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@^');
			if(rtnArr[0] != ""){
				formObj.buyer_nm.value=rtnArr[2];
			}
			else{
				formObj.buyer_cd.value="";
				formObj.buyer_nm.value="";	
			}
		}
		else{
			formObj.buyer_cd.value="";
			formObj.buyer_nm.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function resizeSheet(){
	ComResizeSheet(sheet1);
	ComResizeSheet(sheet2);
	ComResizeSheet(sheet3);
	ComResizeSheet(sheet4);
	ComResizeSheet(sheet5);
}
function displayData(xml){
	var formObj  = document.form;
	//formObj.form_mode.value= "UPDATE";		
	 var xmlDoc = $.parseXML(xml);
	  var $xml = $(xmlDoc);
	  $("#wave_no").val($xml.find( "wave_no").text());
	  $("#pick_dt").val(convDate($xml.find( "pick_dt").text()));
	  $("#pick_hm_fr").val($xml.find( "pick_hm_fr").text());
	  $("#pick_hm_to").val($xml.find( "pick_hm_to").text());
	  $("#rmk").val(htmlDecode($xml.find( "rmk").text()));
	  $("#wave_wh_cd").val(htmlDecode($xml.find( "wave_wh_cd").text()));
	  $("#wave_wh_nm").val(htmlDecode($xml.find( "wave_wh_nm").text()));
	  $("#wave_ctrt_no").val($xml.find( "wave_ctrt_no").text());
	  $("#wave_ctrt_nm").val($xml.find( "wave_ctrt_nm").text());
	 
}
function getTotalRow(xmlStr)
{
	var xmlDoc = $.parseXML(xmlStr); 
	var $xml = $(xmlDoc);
	if( $xml.find("DATA").length == 0  ){
		 return null;
	}
	return $xml.find("DATA")[0].getAttribute("TOTAL")
		
}
function checkBoxOnOff(sheetObj, colName){
	 if (sheetObj.RowCount() > 0){
	  var findcheck = sheetObj.FindCheckedRow(colName,1);
	  if (findcheck == "" || findcheck == null || findcheck == -1)
	   sheetObj.SetHeaderCheck(0, colName, 0);
	  else{
	   var checksize = sheetObj.FindCheckedRow(colName,1).split("|").length;
	   if (checksize == sheetObj.RowCount())
	    sheetObj.SetHeaderCheck(0, colName, 1);
	   else sheetObj.SetHeaderCheck(0, colName, 0);
	   
	   var countCheckSizeDis = 0;
	   for(var i = sheetObj.HeaderRows(); i<=sheetObj.RowCount() + 1;i++){
		   if(sheetObj.GetCellEditable(i, colName) == 0){
			   countCheckSizeDis++;
		   }
	   }
	   if(countCheckSizeDis != 0){
		   if((sheetObj.RowCount() - countCheckSizeDis) == checksize)
		   {
			   sheetObj.SetHeaderCheck(0, colName, 1);
		   }
	   }
	  }
	 }else sheetObj.SetHeaderCheck(0,colName, 0);
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

function valTime(obj){
	var valObj = obj.value;
	if(valObj==""){
		return;
	}
	var valChk = valObj.split(':');
	if(parseInt(valChk[0]) > 23 || parseInt(valChk[1]) > 59){
		ComShowMessage("Please enter a Value Correctly! \n - Hour: Between 0 ~ 23 and Minute: Between 0 ~ 59");
		obj.value ="";
		obj.focus();
	}
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
	var warehouse = sheet2.GetCellValue(sheet2.GetSelectRow(), fix_grid02 + "wh_cd");
	for(var i = 0; i < arrwhcd_df.length; i ++){
		for(var j = 0; j < arrwhcd.length; j ++){
			if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("btn_save_wave");
		ComBtnDisable("btn_delete_wave");
		ComBtnDisable("link_loadplan_wave");
		ComBtnDisable("link_outboundcomplete_wave");
		ComBtnDisable("link_invreplenishment_wave");
		//Button Sheet Allocation List (AllocationManual, AllocAlloc, Cancel)
		ComBtnDisable("btn_allocation_wave");
		ComBtnDisable("btn_manualalloc_wave");
		ComBtnDisable("btn_cancel_wave");
		
		//Button Allocated Item List :Alloc, CancelPrintLoad, PlanOutbound, Complete
		ComBtnDisable("btn_cancel_allc");
		ComBtnDisable("link_loadplan_allc");
		ComBtnDisable("link_outboundcomplete_allc");
		
		//Button Un-Allocated Item List :AllocationManual, Alloc, Excel, Print, Inventory, Replenishment
		ComBtnDisable("btn_allocation_un");
		ComBtnDisable("btn_manualalloc_un");
		ComBtnDisable("btn_excel_un");
		ComBtnDisable("link_invreplenishment_un");
	}else{
		ComBtnEnable("btn_save_wave");
	}
}

