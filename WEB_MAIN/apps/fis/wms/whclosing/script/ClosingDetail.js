/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ClosingDetail.js
*@FileTitle  : W/H Closing Detail
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/20
=========================================================--*/

//docObjects
var sheetCnt=0;
//comboObjects
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var sts_cd_n="N";
var loading_flag="N";
var docObjects = new Array();
var ROW = -1;
var firCalFlag  = false;

//LKH 2016.07.21 :: Closing Create 시 Storage 로직 수정
var sheet1Height=365;

/*
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
 }
/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	//doShowProcess(true);
	//sheet
	var formObj = document.form;
	
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
   // doShowProcess(false);
    loading_flag="Y";
    //control
	initControl();
	resizeSheet();
	commonModeChange("INIT");
	//파라미터존재시 자동조회
	if($("#req_cls_no").val().trim().length > 0)
	{
		
		$("#in_cls_no").val($("#req_cls_no").val().trim());
		
		if($("#req_sb_cls_cd").val().trim().length > 0){
			formObj.sb_cls_cd.value = $("#req_sb_cls_cd").val();
			
		}else{
			formObj.sb_cls_cd.value = "ALL";
		}
		
		if($("#req_rate_tp_cd").val().trim().length > 0){
			formObj.rate_tp_cd.value = $("#req_rate_tp_cd").val();
		}
		
		comboRemoveAll("cust_cd");
		comboAddItem("cust_cd","ALL","ALL");
		
		if($("#req_cust_cd").val().length > 0){
			comboAddItem("cust_cd",$("#req_cust_cd").val(),$("#req_cust_cd").val());
			formObj.cust_cd.value = $("#req_cust_cd").val();
		}
		searchInfo();
		headerInfoChange(false);
		
		if($("#req_cust_cd").val().length > 0){
			formObj.cust_cd.value = $("#req_cust_cd").val();
		}else{
			formObj.cust_cd.value = "ALL";
		}
	}
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function rateTpCdNoOth()
{
	var vTextSplit=formObj.rate_tp_cd.options[formObj.rate_tp_cd.selectedIndex].text
	var vCodeSplit=formObj.rate_tp_cd.value;
	
	var rate_tp_cd2_txt="";
	var rate_tp_cd2_cd="";
	var idx=1;
	for(var j=0;j<vCodeSplit.length; j++){
		if(vCodeSplit[j] != "OTH")
		{
			if(rate_tp_cd2_txt.trim().length == 0)
			{
				rate_tp_cd2_txt=vTextSplit[j];
				rate_tp_cd2_cd=vCodeSplit[j];
			}
			else
			{
				rate_tp_cd2_txt=rate_tp_cd2_txt + "|" + vTextSplit[j];
				rate_tp_cd2_cd=rate_tp_cd2_cd + "|" + vCodeSplit[j];
			}
		}		
	}	
	rate_tp_cd2Text=rate_tp_cd2_txt;
	rate_tp_cd2Code=rate_tp_cd2_cd; 
	
}
/*
 * init sheet
 */ 
 function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet1":      //IBSheet1 init
	    with(sheetObj){
		
		       
		var hdr1="seq||Billing Customer|Billing Customer|S/B|Type|Previous\nClosing Date|Transaction\nDate|Booking No|Order\nType|FWD\nType|Loading\nType|merge_key|Item|Item|LOT|Inventory\nEA QTY"
		      + "|Transaction|Transaction|Transaction|Over PL\nWeighting|PL Lvl|BX Lvl|IN Lvl|EA Lvl|CBM|CFT|G.KG|G.LB|N.KG|N.LB|Location|Loc Type"
		      + "|CNTR / TR Information|CNTR / TR Information|CNTR / TR Information"
		      + "|rn||Freight|Freight|CUR|Freight\nTotal|Amount per Unit|Amount per Unit|Amount per Unit|Amount per Unit|Amount per Measure|Amount per Measure|Amount per Measure|Amount per Measure|Amount per Measure|Amount per Measure"
		      + "|Amount\nper LOC|Amount\nper CNTR"
		      + "|ibflag|cls_no|cls_seq|cls_dtl_seq|po_sys_no|item_sys_no|item_seq|po_no|wh_loc_cd|space_tp_cd|eq_tp_cd|src_tp_cd|amt_ord|amt_oth|oth_unit_cd|amt_fix|fix_unit_cd"
		      + "|pkg_lv1_unit_cd|pkg_lv1_qty|pkg_lv2_unit_cd|pkg_lv2_qty|pkg_lv3_unit_cd|pkg_lv3_qty|pkg_lv4_unit_cd|pkg_lv4_qty|pkg_pl_std_qty|pkg_pl_over_wgt|bk_cls_cd|oth_cost_no|sts_cd|sub_key|sub_bk_key|frt_cd_org|frt_nm_org|curr_cd_org"
		      ;
		      var hdr2="seq||Code|Name|S/B|Type|Previous\nClosing Date|Transaction\nDate|Booking No|Order\nType|FWD\nType|Loading\nType|merge_key|Code|Name|LOT|Inventory\nEA QTY"
		      + "|Stock Period|Master Info.|EA QTY|Over PL\nWeighting|PL Lvl|BX Lvl|IN Lvl|EA Lvl|CBM|CFT|G.KG|G.LB|N.KG|N.LB|Location|Loc Type"
		      + "|TYPE|CNTR/TR No|Seal No"
		      + "|rn||Code|Name|CUR|Freight\nTotal|PL Lvl|BX Lvl|IN Lvl|EA Lvl|CBM|CFT|G.KG|G.LB|N.KG|N.LB"
		      + "|Amount\nper LOC|Amount\nper CNTR"
		      + "|ibflag|cls_no|cls_seq|cls_dtl_seq|po_sys_no|item_sys_no|item_seq|po_no|wh_loc_cd|space_tp_cd|eq_tp_cd|src_tp_cd|amt_ord|amt_oth|oth_unit_cd|amt_fix|fix_unit_cd"
		      + "|pkg_lv1_unit_cd|pkg_lv1_qty|pkg_lv2_unit_cd|pkg_lv2_qty|pkg_lv3_unit_cd|pkg_lv3_qty|pkg_lv4_unit_cd|pkg_lv4_qty|pkg_pl_std_qty|pkg_pl_over_wgt|bk_cls_cd|oth_cost_no|sts_cd|sub_key|sub_bk_key|frt_cd_org|frt_nm_org|curr_cd_org"
		      ;
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		      
		      var prefix=fix_grid01;
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"},
		                  { Text:hdr2, Align:"Center"} ];
		      InitHeaders(headers, info);

		      var cols = [ 
                   {Type:"Seq",      			Hidden:1, 	Width:0,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"seq",      			Format:"" },
                   {Type:"CheckBox",  			Hidden:0, 	TrueValue:"Y",  FalseValue:"N"  , Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"chk1",            KeyField:0,   CalcLogic:"",   Format:"", HeaderCheck: 1,           PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
                   {Type:"PopupEdit", 			Hidden:0, 	Width:55,     	Align:"Center",    		ColMerge:0,     SaveName:prefix+"cust_cd",     		KeyField:1,     UpdateEdit:0,    InsertEdit:1,      Format:"" },
		             {Type:"Text",     			Hidden:0,  	Width:250,     	Align:"Left",    		ColMerge:1,     SaveName:prefix+"cust_nm",     		KeyField:0,     UpdateEdit:0,    InsertEdit:0,      Format:"" },
		             {Type:"Combo",     		Hidden:0, 	Width:40,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"sb_cls_cd",     	KeyField:0,     UpdateEdit:0,    InsertEdit:1,      Format:"" },
		             {Type:"Combo",     		Hidden:0, 	Width:80,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"rate_tp_cd",     	KeyField:1,     UpdateEdit:0,    InsertEdit:1,      Format:"" },
		             {Type:"Date",     			Hidden:0,  	Width:90,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"pre_cls_dt",     	KeyField:0,     UpdateEdit:0,    InsertEdit:0,      Format:"Ymd" },
		             {Type:"Date",     			Hidden:0,  	Width:90,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"trans_dt",     	KeyField:1,     UpdateEdit:0,    InsertEdit:1,      Format:"Ymd" },
		             {Type:"PopupEdit", 		Hidden:0, 	Width:120,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"bk_no",     		KeyField:0,     UpdateEdit:0,    InsertEdit:1,      Format:"" },
		             {Type:"Combo",     		Hidden:0, 	Width:80,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"ord_tp_cd",     	KeyField:0,     UpdateEdit:0,    InsertEdit:0,      Format:"" },
		             {Type:"Combo",     		Hidden:0, 	Width:90,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"order_rel",     	KeyField:0,     UpdateEdit:0,    InsertEdit:0,      Format:"" },
		             {Type:"Combo",     		Hidden:0, 	Width:60,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"load_tp_cd",     	KeyField:0,     UpdateEdit:0,    InsertEdit:0,      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"merge_key",      				Format:"" },
		             {Type:"Popup", 			Hidden:0, 	Width:100,     	Align:"Left",    		ColMerge:1,     SaveName:prefix+"item_cd",     		KeyField:0,     UpdateEdit:0,    InsertEdit:1,      Format:"" },
		             {Type:"Text",     			Hidden:0,  	Width:180,     	Align:"Left",    		ColMerge:1,     SaveName:prefix+"item_nm",     		KeyField:0,     UpdateEdit:0,    InsertEdit:0,      Format:"" },
		             {Type:"Popup",     		Hidden:0, 	Width:120,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"lot_id",     		KeyField:0,     UpdateEdit:0,    InsertEdit:1,      Format:"" },
		             {Type:"Text",     			Hidden:0,  	Width:80,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"str_in_ea_qty",     		KeyField:0,     UpdateEdit:0,    InsertEdit:1,      Format:"",  EditLen:20},
		             {Type:"Int",     			Hidden:0,  	Width:90,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"stock_period",     KeyField:0,     UpdateEdit:0,    InsertEdit:0,      Format:"" },
		             {Type:"Text",     			Hidden:0,  	Width:160,     	Align:"Left",    		ColMerge:1,     SaveName:prefix+"pkg_info",     	KeyField:0,     UpdateEdit:0,    InsertEdit:0,      Format:"" },
		             {Type:"Int",     			Hidden:0,  	Width:50,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"ea_qty",     		KeyField:0,     UpdateEdit:0,    InsertEdit:1,      Format:"", PointCount:WMS_QTY_POINT  , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"pl_over_wgt",     	KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float", PointCount:1  , EditLen:2},
		             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"pl_lvl",    		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float" , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"bx_lvl",    		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float" , EditLen:6 },
		             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"in_lvl",    		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float" , EditLen:6 },
		             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"ea_lvl",    		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float" , EditLen:6 },
		             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"cbm",     			KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float", PointCount:WMS_CBM_POINT_COUNT  , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"cbf",     			KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float", PointCount:WMS_CBM_POINT_COUNT   , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"grs_kgs",     		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float", PointCount:WMS_KGS_POINT   , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"grs_lbs",     		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float", PointCount:WMS_KGS_POINT   , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"net_kgs",     		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float", PointCount:WMS_KGS_POINT   , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",   		ColMerge:1,     SaveName:prefix+"net_lbs",     		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float", PointCount:WMS_KGS_POINT   , EditLen:6},
		             {Type:"PopupEdit", 		Hidden:0, 	Width:70,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"wh_loc_nm",     	KeyField:0,     UpdateEdit:0,    InsertEdit:0,      Format:"" },
		             {Type:"PopupEdit", 		Hidden:0, 	Width:70,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"space_tp_nm",     	KeyField:0,     UpdateEdit:0,    InsertEdit:0,      Format:"" },
		             {Type:"PopupEdit", 		Hidden:0, 	Width:70,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"eq_tpsz_cd",     	KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"" },
		             {Type:"Text",     			Hidden:0,  	Width:120,    	Align:"Left",    		ColMerge:1,     SaveName:prefix+"eq_no",     		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"" ,EditLen:20},
		             {Type:"PopupEdit", 		Hidden:0, 	Width:140,    	Align:"Left",    		ColMerge:1,     SaveName:prefix+"seal_no",     		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"" ,EditLen:100},
		             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"rn",      								Format:"" },
		             {Type:"CheckBox",  		Hidden:0, 	Width:30,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"chk2",     		KeyField:0,           Format:"" , HeaderCheck: 1},
		             {Type:"Combo", 			Hidden:0, 	Width:50,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"frt_cd",     		KeyField:0,     UpdateEdit:0,    InsertEdit:1,      Format:"" },
		             {Type:"Text",     			Hidden:0,  	Width:120,    	Align:"Left",    		ColMerge:1,     SaveName:prefix+"frt_nm",     		KeyField:0,     UpdateEdit:0,    InsertEdit:0,      Format:"" },
		             {Type:"Combo", 			Hidden:0, 	Width:60,     	Align:"Center",    		ColMerge:1,     SaveName:prefix+"curr_cd",     		KeyField:0,     UpdateEdit:0,    InsertEdit:1,      Format:"" },
		             {Type:"Float",     		Hidden:0,  	Width:80,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"tot_amt",     		KeyField:1,     UpdateEdit:0,    InsertEdit:0,      Format:"Float",    PointCount:2 , EditLen:15},
		             {Type:"Float",     		Hidden:0,  	Width:50,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"amt_pl_lvl",     	KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float",    PointCount:0   , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:50,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"amt_bx_lvl",     	KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float",    PointCount:0  , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:50,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"amt_in_lvl",     	KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float",    PointCount:0  , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:50,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"amt_ea_lvl",     	KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float",    PointCount:0  , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:50,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"amt_cbm",     		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float",    PointCount:2 ,EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:50,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"amt_cbf",     		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float",    PointCount:2 ,EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:50,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"amt_grs_kgs",     	KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float",    PointCount:2  , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:50,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"amt_grs_lbs",     	KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float",    PointCount:2  , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:50,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"amt_net_kgs",     	KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float",    PointCount:2  , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:50,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"amt_net_lbs",     	KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float",    PointCount:2  , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:50,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"amt_loc",     		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float",    PointCount:3 , EditLen:6},
		             {Type:"Float",     		Hidden:0,  	Width:80,     	Align:"Right",    		ColMerge:1,     SaveName:prefix+"amt_eq",     		KeyField:0,     UpdateEdit:1,    InsertEdit:1,      Format:"Float",    PointCount:2 , EditLen:6},
		             {Type:"Status",    		Hidden:1, 	Width:40,     	Align:"Center",    		ColMerge:0,		SaveName:prefix+"ibflag"},
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"cls_no",      		Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"cls_seq",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"cls_dtl_seq",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"po_sys_no",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"item_sys_no",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"item_seq",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"po_no",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"wh_loc_cd",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"space_tp_cd",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"eq_tp_cd",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"src_tp_cd",      Format:"" },
		             {Type:"Float",      		Hidden:1, 	Width:100,     	Align:"Center",    						SaveName:prefix+"amt_ord",      Format:"Float",    PointCount:2 },
		             {Type:"Float",      		Hidden:1, 	Width:100,     	Align:"Center",    						SaveName:prefix+"amt_oth",      Format:"Float",    PointCount:2 },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"oth_unit_cd",      Format:"" },
		             {Type:"Float",      		Hidden:1, 	Width:100,     	Align:"Center",    						SaveName:prefix+"amt_fix",      Format:"Float",    PointCount:2 },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"fix_unit_cd",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"pkg_lv1_unit_cd",      Format:"" },
		             {Type:"Float",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"pkg_lv1_qty",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"pkg_lv2_unit_cd",      Format:"" },
		             {Type:"Float",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"pkg_lv2_qty",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"pkg_lv3_unit_cd",      Format:"" },
		             {Type:"Float",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"pkg_lv3_qty",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"pkg_lv4_unit_cd",      Format:"" },
		             {Type:"Float",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"pkg_lv4_qty",      Format:"" },
		             {Type:"Float",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"pkg_pl_std_qty",      Format:"" },
		             {Type:"Float",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"pkg_pl_over_wgt",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"bk_cls_cd",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"oth_cost_no",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"sts_cd",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"sub_key",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"sub_bk_key",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"frt_cd_org",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"frt_nm_org",      Format:"" },
		             {Type:"Text",      		Hidden:1, 	Width:10,     	Align:"Center",    						SaveName:prefix+"curr_cd_org",      Format:"" } ];
		       
		      	InitColumns(cols);
		      	sheetObj.SetImageList(0,"./web/images/common/icon_m.gif");//seal
		      	sheetObj.SetImageList(1,"./web/images/common/icon_search_s.gif");//search
		      	sheetObj.SetImageList(2,"./web/images/common/close_off.gif");//clear
		      	SetUnicodeByte(3);
		      	SetClipPasteMode(1);
		      	SetHeaderRowHeight(30);
		      	resizeSheet();
		      	SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		      	SetSheetHeight(sheet1Height);
		      	
		      	//InitViewFormat(0, prefix+"pre_cls_dt", 	"MM-dd-yyyy")
		      	//InitViewFormat(0, prefix+"trans_dt", 	"MM-dd-yyyy")
		      	SetColProperty(prefix+"curr_cd", {ComboText:'|'+CurrCode, ComboCode:'|'+CurrCode} );
		        SetColProperty(prefix+"frt_cd", {ComboCode:FreightCode, ComboText:FreightText} );
		      	SetColProperty(0 ,prefix+"rcc_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      
		      	SetColProperty(0, prefix+"cust_cd",		{AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
		      	SetColProperty(0, prefix+"seal_no",		{AcceptKeys:"E|["+FORMAT_CUSTOMER_CD+"]" , InputCaseSensitive:1});
		      	SetColProperty(0, prefix+"eq_no",			{AcceptKeys:"E|["+FORMAT_CUSTOMER_CD+"]" , InputCaseSensitive:1});
		      	SetColProperty(0, prefix+"eq_tpsz_cd",	{AcceptKeys:"E|["+FORMAT_CUSTOMER_CD+"]" , InputCaseSensitive:1});
		      	SetColProperty(0, prefix+"wh_loc_nm",		{AcceptKeys:"E|["+FORMAT_CUSTOMER_CD+"]" , InputCaseSensitive:1});
		      
		      	SetColProperty(prefix+"sb_cls_cd", {ComboText:"SELL|BUY", ComboCode:"S|B"} );
				SetColProperty(prefix+"order_rel", {ComboText:order_relText, ComboCode:order_relCode} ); 
				SetColProperty(prefix+"ord_tp_cd", {ComboText:"|"+ord_tp_cdText, ComboCode:"|"+ord_tp_cdCode} );
				SetColProperty(prefix+"load_tp_cd", {ComboText:"|"+load_tp_cdText, ComboCode:"|"+load_tp_cdCode} );
				SetColProperty(prefix+"rate_tp_cd", {ComboText:rate_tp_cdText, ComboCode:rate_tp_cdCode} );
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
function btn_Show(val){
	var sheetObj; 
	sheetObj = docObjects[0];
	sheet1HeightMax = 490;
	
	if(val == "MINUS"){ //show효과(master sheet보이게끔)
		document.all.headLayer.style.display="inline";
		//document.all.btn_show.style.display="none";
		//document.all.btn_hide.style.display="inline";
		
		sheetObj.SetSheetHeight(sheet1Height);

	}else if(val == "PLUS"){  //hide효과(master sheet 안보이게끔)
		document.all.headLayer.style.display="none";
		//document.all.btn_show.style.display="inline";
		//document.all.btn_hide.style.display="none";
		
		sheetObj.SetSheetHeight(sheet1HeightMax);
	}
	//resizeSheet();
} 
 
function resizeSheet(){
 ComResizeSheet(docObjects[0]);
}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=docObjects[0];
	var begin = sheetObj.HeaderRows();
	var end = 1;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
// 		sheetObj.PopupButtonImage(i, fix_grid01 + "seal_no",0);
 		if(sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "C" || sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "I")
		{
			sheetObj.SetRowEditable(i,0);
		}
		if($("#checkAmtSheetInfoShow").is(":checked") == true)
		{
			if(sheetObj.GetCellValue(i, fix_grid01 + "frt_cd_org").trim() == "")
			{
				sheetObj.SetCellEditable(i, fix_grid01 + "frt_cd",1);
				sheetObj.SetCellEditable(i, fix_grid01 + "frt_nm",1);
			}
			if(sheetObj.GetCellValue(i, fix_grid01 + "curr_cd_org").trim() == "")
			{
				sheetObj.SetCellEditable(i, fix_grid01 + "curr_cd",1);
			}
		}
		
		var bk_no = sheetObj.GetCellValue(i, fix_grid01 + "bk_no");
		var in_out_type = bk_no.substr(0, 1);
		
		if(sheetObj.GetCellValue(i, fix_grid01 + "rate_tp_cd") == "STR"){
			if(in_out_type == "I"){
				sheetObj.SetCellFontColor(i, fix_grid01 + "ea_qty","#0100FF"); //#0100FF
				sheetObj.SetCellFontColor(i, fix_grid01 + "str_in_ea_qty","#FF0000"); //#0100FF
				
				sheetObj.SetCellFontUnderline(i, fix_grid01 +  "ea_qty", 1);
				sheetObj.SetCellFontUnderline(i, fix_grid01 +  "str_in_ea_qty", 1);
				
				//sheetObj.SetCellFont("FontBold", i, fix_grid01 + "ea_qty", i, fix_grid01 + "ea_qty",1);
				sheetObj.SetCellFont("FontBold", i, fix_grid01 + "str_in_ea_qty", i, fix_grid01 + "str_in_ea_qty",1);
				
				//alert(sheetObj.GetCellValue(i, fix_grid01 + "ea_qty"));
				
				var doMoneyFmtTemp = sheetObj.GetCellValue(i, fix_grid01 + "ea_qty");
				var doMoneyFmtValue = doMoneyFmt(doMoneyFmtTemp);
				sheetObj.SetCellValue(i, fix_grid01 + "str_in_ea_qty", doMoneyFmtValue);
				
			}else if(in_out_type == "O"){
				sheetObj.SetCellFontColor(i, fix_grid01 + "str_in_ea_qty","#FF0000"); //#0100FF
				sheetObj.SetCellFontUnderline(i, fix_grid01 +  "str_in_ea_qty", 1);
				sheetObj.SetCellFont("FontBold", i, fix_grid01 + "str_in_ea_qty", i, fix_grid01 + "str_in_ea_qty",1);
				sheetObj.SetCellValue(i, fix_grid01 + "str_in_ea_qty", "Shipped out");
			}
			
			
		}
		
		
//		if (i > sheetObj.HeaderRows()){
//			if(sheetObj.GetCellValue(i-1, fix_grid01 + "cust_cd") == sheetObj.GetCellValue(i, fix_grid01 + "cust_cd")) {
//				end += 1;
//			}else{
//				if (end >= begin){
//					sheetObj.SetMergeCell(begin, 1, end, 1);
//					begin = i;
//					end = 1;
//				}
//			}
//		}
	}
	if (end >= begin){
		sheetObj.SetMergeCell(begin, 1, end, 1);
	}
//	if(document.form.in_cls_no.value != ""){
//		ComShowCodeMessage("COM0266", "Closing No");
//		ComSetFocus(document.form.in_cls_no);
//	}
	resizeSheet();
	check_authority_wh();// check warehouse authority
}
function sheet1_OnClick(sheetObj, Row, Col) {
	var sub_bk_key=sheetObj.GetCellValue(Row, fix_grid01 + "sub_bk_key");
	var frt_cd=sheetObj.GetCellValue(Row, fix_grid01 + "frt_cd");
	var dis_bk_amount=0;
	var dis_frt_amt=0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, fix_grid01 + "sub_bk_key") == sub_bk_key)
		{
			dis_bk_amount=dis_bk_amount + eval(sheetObj.GetCellValue(i, fix_grid01 + "tot_amt"));
		}
		if($("#checkAmtSheetInfoShow").is(":checked") == true)
		{
			if(sheetObj.GetCellValue(i, fix_grid01 + "sub_bk_key") == sub_bk_key
					&& sheetObj.GetCellValue(i, fix_grid01 + "frt_cd") == frt_cd)
			{
				dis_frt_amt=dis_frt_amt + eval(sheetObj.GetCellValue(i, fix_grid01 + "tot_amt"));
			}
		}
	}
	$("#dis_bk_no").val(sheetObj.GetCellValue(Row, fix_grid01 + "bk_no"));
	$("#dis_bk_amount").val(ComAddComma(dis_bk_amount));
	$("#dis_frt_cd").val(sheetObj.GetCellValue(Row, fix_grid01 + "frt_cd"));
	if($("#checkAmtSheetInfoShow").is(":checked") == true)
	{
		$("#dis_frt_nm").val(sheetObj.GetCellValue(Row, fix_grid01 + "frt_nm"));
		$("#dis_frt_amt").val(ComAddComma(dis_frt_amt));
	}
	else
	{
		$("#dis_frt_nm").val("");
		$("#dis_frt_amt").val("");
	}
}
var rtnary = new Array(2);
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	ROW = Row
	if(colName == fix_grid01 + "cust_cd")
	{
		rtnary=new Array(2);
		rtnary[0]="1";
		
		// 2011.12.27 value parameter
		rtnary[1]=sheetObj.GetCellValue(Row, Col+1);
		rtnary[2]=window;
		
		callBackFunc = "CB_TRDP_POP";
		modal_center_open('./CMM_POP_0010.clt?callTp='+"", rtnary, 1150,650,"yes");
        
	} 
//	else if (colName == fix_grid01 + "curr_cd") {
//		sUrl="./CommonCodePopup.clt?grp_cd=C010&code="+sheetObj.GetCellValue(Row, Col);
//		callBackFunc = "setCurrCdGrid";
//        modal_center_open(sUrl, callBackFunc, 450,520,"yes");
//	} 
	else if(colName == fix_grid01 + "frt_cd") {
		sUrl="./FreightPopup.clt?code="+sheetObj.GetCellValue(Row, Col);
		callBackFunc = "setIbFrtCdGrid";
        modal_center_open(sUrl, callBackFunc, 600,520,"yes");
	} else if (colName == fix_grid01 + "seal_no") {
		ComShowMemoPad3(sheetObj, Row, Col, false, 140, 82,  Col, Col);      
	} else if(colName == fix_grid01 + "lot_id") {
		if(sheetObj.GetCellValue(Row, fix_grid01 + "item_sys_no").trim() != ""
			&& sheetObj.GetRowStatus(Row) == "I" )
		{
			if(sheetObj.GetCellValue(Row, fix_grid01 + "lot_id").trim() == "" )
			{
				var sParam="wh_cd=" + $("#wh_cd").val();
				sParam += "&wh_nm=" + document.form.wh_cd.options[document.form.wh_cd.selectedIndex].text;
				sParam += "&ctrt_no=" + $("#ctrt_no").val();
				sParam += "&ctrt_nm=" + $("#ctrt_nm").val();
				sParam += "&item_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "item_cd");
			   	var sUrl="./WHInLotSelectPopup.clt?" + sParam;
				callBackFunc = "setLotInfoGrid";
		        modal_center_open(sUrl, callBackFunc, 1150,650,"yes");
			}
			else
			{
				sheetObj.SetCellValue(Row, fix_grid01 + "lot_id","",0);
// 				sheetObj.PopupButtonImage(Row, fix_grid01 + "lot_id",1);
			}
		}
	} else if ( colName == fix_grid01 + "eq_tpsz_cd" ) {
		var tp="A";
		if(sheetObj.GetCellValue(Row, (fix_grid01 + "eq_tp_cd")) != "")
		{
			tp=sheetObj.GetCellValue(Row, (fix_grid01 + "eq_tp_cd"));
		}
		sUrl="./ContainerTypePopup.clt?type="+tp+"&eq_unit="+sheetObj.GetCellValue(Row, Col);
		callBackFunc = "setContainerTypeInfoGrid";
        modal_center_open(sUrl, callBackFunc, 400, 590,"yes");
	} else if(colName == fix_grid01 + "wh_loc_nm") {
		var sUrl="./WarehouseLocPopup.clt?f_loc_cd="+ $("#wh_cd").val() + "&f_putaway_flg=Y&f_alloc_flg=Y&f_move_flg=Y&f_replenish_flg=Y&f_adjust_flg=Y";
		callBackFunc = "setLocInfoGrid";
        modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
	} else if(colName == fix_grid01 + "item_cd") {
		var sUrl="./CtrtItemPopup.clt?ctrt_no="+ $("#ctrt_no").val() + "&item_cd="+sheetObj.GetCellValue(Row, Col);
		callBackFunc = "setItemGrid";
        modal_center_open(sUrl, callBackFunc, 400,520,"yes");
	} else if(colName == fix_grid01 + "bk_no") {
		var sUrl="./WHBookingPopup.clt?cond_search_yn=N&ctrt_no="+ $("#ctrt_no").val()+ "&ctrt_nm="+$("#ctrt_nm").val() + "&wh_cd="+$("#wh_cd").val() + "&wh_nm="+$("#wh_nm").val();
		callBackFunc = "setBookingGrid";
        modal_center_open(sUrl, callBackFunc, 800, 550,"yes");
	}
}

function sheet1_OnKeyUp(sheetObj, row, col, KeyCode, Shif){
	var formObj = document.form;
	var srcName = sheet1.ColSaveName(col);
	
	if(srcName == fix_grid01+"trans_dt"){
		
		var valDt = sheet1.GetEditText(row, col);
		
		if(valDt.indexOf('-') == -1 && valDt.length == 8){
			
			var mm = valDt.substring(0,2);
			var dd = valDt.substring(3,4);
			var yy = valDt.substring(4,valDt.length);
			
			if(parseInt(mm) < 1 || parseInt(dd) < 1 || parseInt(yy) < 1900){
				ComShowMessage("Invalid Date Format");
				sheet1.SelectCell(row, col, 1);
			}
		}
	}
}

function searchCommonCodeInfo(reqVal) {
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheet1.SetCellValue(ROW, fix_grid01 + "curr_cd", rtnArr[0], 0);
		}
		else{
			sheet1.SetCellValue(ROW, fix_grid01 + "curr_cd",'', 0);
		}
	}
}

function searchFrtCd(reqVal) {
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheetObj.SetCellValue(ROW, fix_grid01 + "frt_cd", rtnArr[1], 0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "frt_nm", rtnArr[0], 0);
		}
		else{
			sheetObj.SetCellValue(ROW, fix_grid01 + "frt_cd", rtnArr[1], 0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "frt_nm", rtnArr[0], 0);
		}
	}
}

function resultTlCustInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheetObj.SetCellValue(ROW, fix_grid01 + "cust_cd", rtnArr[1], 0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "cust_nm", rtnArr[0], 0);
		}
		else{
			sheetObj.SetCellValue(ROW, fix_grid01 + "cust_cd", "", 0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "cust_nm", "", 0);
		}
	}
}

function resultWarehouseLocInfoForName(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheetObj.SetCellValue(ROW, fix_grid01 + "wh_loc_cd", rtnArr[0], 0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "wh_loc_nm", rtnArr[1], 0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "space_tp_cd", rtnArr[2], 0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "space_tp_nm", rtnArr[3], 0);
		}
		else{
			sheetObj.SetCellValue(ROW, fix_grid01 + "wh_loc_cd", '', 0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "wh_loc_nm", '', 0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "space_tp_cd", '', 0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "space_tp_nm", '', 0);
		}
	}
}

function resulWHItemCodeInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheetObj.SetCellValue(ROW,  fix_grid01 + "item_cd",rtnArr[2], 0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "item_nm",rtnArr[3],0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "item_sys_no",rtnArr[0],0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "pkg_info",rtnArr[18],0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv1_unit_cd",rtnArr[4],0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv1_qty",5,0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv2_unit_cd",6,0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv2_qty",7,0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv3_unit_cd",8,0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv3_qty",9,0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv4_unit_cd",10,0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv4_qty",11,0);
//			sheetObj.SetCellValue(ROW, "pkg_pl_std_qty",getXmlDataNullToNullString(sXml,'pkg_pl_std_qty'),0);
//			sheetObj.SetCellValue(ROW, "pkg_pl_over_wgt",getXmlDataNullToNullString(sXml,'pkg_pl_over_wgt'),0);
			sheetObj.SetCellEditable(ROW, fix_grid01 + "lot_id",1);
			sheetObj.SetCellBackColor(ROW, fix_grid01 + "lot_id","#EFF0F3"); //UnEditableColor
			sheetObj.SetCellValue(ROW,  fix_grid01 + "lot_id","",0);
//			sheetObj.PopupButtonImage(ROW, fix_grid01 + "lot_id",1);
		} else{
			sheetObj.SetCellValue(ROW,  fix_grid01 + "item_nm","",0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "item_sys_no","",0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "pkg_info","",0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv1_unit_cd","",0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv1_qty","",0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv2_unit_cd","",0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv2_qty","",0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv3_unit_cd","",0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv3_qty","",0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv4_unit_cd","",0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv4_qty","",0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_pl_std_qty","",0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_pl_over_wgt","",0);
			sheetObj.SetCellEditable(ROW, fix_grid01 + "lot_id",0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "lot_id","",0);
// 			sheetObj.PopupButtonImage(ROW, fix_grid01 + "lot_id",1);
		}
	}
}

function searchWHBookingInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheetObj.SetCellValue(ROW,  fix_grid01 + 'bk_no',rtnArr[0], 0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "bk_cls_cd",rtnArr[1],0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "ord_tp_cd",rtnArr[2],0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "load_tp_cd",rtnArr[3],0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "order_rel",rtnArr[4],0);
		}
		else{
			sheetObj.SetCellValue(ROW,  fix_grid01 + 'bk_no','', 0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "bk_cls_cd",'',0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "ord_tp_cd",'',0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "load_tp_cd",'',0);
			sheetObj.SetCellValue(ROW,  fix_grid01 + "order_rel",'',0);
		}
	}
}

function resultCntrTrTp(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = sheet1;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			var eq_tpsz_cd=rtnArr[0];
			var eq_tp_cd=rtnArr[2];
			if(eq_tpsz_cd == "") {
				eq_tpsz_cd=" ";
			}
			if(sheetObj.GetRowStatus(ROW) != "I")
			{
				var key_org=sheetObj.GetCellValue(ROW, fix_grid01 + "sub_key");
				for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
					var key=sheetObj.GetCellValue(i, fix_grid01 + "sub_key");
					if(key_org == key)
					{
						sheetObj.SetCellValue(ROW, fix_grid01 + "eq_tpsz_cd",eq_tpsz_cd,0);
						sheetObj.SetCellValue(ROW, fix_grid01 + "eq_tp_cd",eq_tp_cd,0);
					}
				}
			}
			else
			{
				sheetObj.SetCellValue(ROW, fix_grid01 + 'eq_tpsz_cd',eq_tpsz_cd,0);
				sheetObj.SetCellValue(ROW, fix_grid01 + "eq_tp_cd",eq_tp_cd,0);
			}
		} else {
			sheetObj.SetCellValue(ROW, fix_grid01 + 'eq_tpsz_cd','',0);
			sheetObj.SetCellValue(ROW, fix_grid01 + "eq_tp_cd",'',0);
		}
	}
}

function sheet1_OnChange(sheetObj, Row, Col, Value){
	var colName=sheetObj.ColSaveName(Col);
	var formObj=document.form;
	var sUrl="";
	ROW = Row;
	if ( colName == fix_grid01 + "cust_cd" ) 
	{
		if(Value != "ALL" && Value != '')
		{	
//			ajaxSendPost(resultTlCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd=' + Value, './GateServlet.gsl');
			
			ajaxSendPost(CB_ajaxTradePaner, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode"+"&s_code="+Value, "./GateServlet.gsl");
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "cust_nm","",0);
		}
	} 
	else if ( colName == fix_grid01 + "curr_cd" ) 
	{
//		if(Value != ''){
//			ajaxSendPost(searchCommonCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchCommonCodeInfo&grp_cd=C010&code_cd=' + Value, './GateServlet.gsl');
//		}
	} 
	else if ( colName == fix_grid01 + "frt_cd" ) 
	{
		var frt = sheet1.GetCellText(Row,colName).split(":");
		sheet1.SetCellValue(Row,fix_grid01 + "frt_nm", frt[1]);
	} 
	else if(colName == fix_grid01 + "eq_tpsz_cd") 
	{
		if(Value != "")
		{
			var sParam="cntr_tp="+Value;
			ajaxSendPost(resultCntrTrTp, 'reqVal', '&goWhere=aj&bcKey=searchCntrTrTp&' + sParam, './GateServlet.gsl');
		}
		else
		{
			if(sheetObj.GetRowStatus(Row) != "I")
			{
				var key_org=sheetObj.GetCellValue(Row, fix_grid01 + "sub_key");
				for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
					var key=sheetObj.GetCellValue(i, fix_grid01 + "sub_key");
					if(key_org == key)
					{
						sheetObj.SetCellValue(i, fix_grid01 + "eq_tpsz_cd"," ",0);
						sheetObj.SetCellValue(i, fix_grid01 + "eq_tp_cd","",0);
					}
				}
			}
			else
			{
				sheetObj.SetCellValue(Row, fix_grid01 + "eq_tp_cd","",0);
			}				
		}
	}
	else if (colName == fix_grid01 + "wh_loc_nm") 
	{
		if(Value != "")
		{
			var sParam="f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm=" + Value + "&f_putaway_flg=Y&f_alloc_flg=Y&f_move_flg=Y&f_replenish_flg=Y&f_adjust_flg=Y";
			ajaxSendPost(resultWarehouseLocInfoForName, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&' + sParam, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row,  fix_grid01 + "wh_loc_cd","",0);
			sheetObj.SetCellValue(Row,  fix_grid01 + "space_tp_nm","",0);
			sheetObj.SetCellValue(Row,  fix_grid01 + "space_tp_cd","",0);
		}
	}
	else if (colName == fix_grid01 + "item_cd") 
	{
		if(Value != "")
		{
			var ctrt_no = formObj.ctrt_no.value;
			var sParam="ctrt_no=" + ctrt_no + "&item_cd=" + encodeURIComponent(Value);
			ajaxSendPost(resulWHItemCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchWHItemCodeInfo&' + sParam, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row,  fix_grid01 + "item_nm","",0);
			sheetObj.SetCellValue(Row,  fix_grid01 + "item_sys_no","",0);
			sheetObj.SetCellValue(Row,  fix_grid01 + "pkg_info","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "pkg_lv1_unit_cd","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "pkg_lv1_qty","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "pkg_lv2_unit_cd","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "pkg_lv2_qty","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "pkg_lv3_unit_cd","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "pkg_lv3_qty","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "pkg_lv4_unit_cd","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "pkg_lv4_qty","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "pkg_pl_std_qty","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "pkg_pl_over_wgt","",0);
			sheetObj.SetCellEditable(Row, fix_grid01 + "lot_id",0);
			sheetObj.SetCellValue(Row,  fix_grid01 + "lot_id","",0);
// 			sheetObj.PopupButtonImage(Row, fix_grid01 + "lot_id",1);
		}
	}	
	else if(colName == fix_grid01 + "rate_tp_cd") 
	{
		if(Value == "STR")
		{
			sheetObj.SetCellEditable(Row, fix_grid01 + "pre_cls_dt",1);
			sheetObj.SetCellEditable(Row, fix_grid01 + "stock_period",1);
			sheetObj.SetCellEditable(Row, fix_grid01 + "wh_loc_nm",1);
			sheetObj.SelectCell(Row,  fix_grid01 + "pre_cls_dt");
		}
		else
		{
			sheetObj.SetCellEditable(Row, fix_grid01 + "pre_cls_dt",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "pre_cls_dt","",0);
			sheetObj.SetCellEditable(Row, fix_grid01 + "stock_period",0);
			sheetObj.SetCellValue(Row,  fix_grid01 + "stock_period",0,0);
			sheetObj.SetCellEditable(Row, fix_grid01 + "wh_loc_nm",0);
			sheetObj.SetCellValue(Row,  fix_grid01 + "wh_loc_nm","",0);
			sheetObj.SetCellValue(Row,  fix_grid01 + "wh_loc_cd","",0);
			sheetObj.SetCellValue(Row,  fix_grid01 + "space_tp_cd","",0);
			sheetObj.SetCellValue(Row,  fix_grid01 + "space_tp_nm","",0);
		}
	}
	else if(colName == fix_grid01 + "amt_pl_lvl" || colName == fix_grid01 + "amt_bx_lvl" || colName == fix_grid01 + "amt_in_lvl" || colName == fix_grid01 + "amt_ea_lvl"
	     || colName == fix_grid01 + "amt_loc" 
	     || colName == fix_grid01 + "amt_cbm" || colName == fix_grid01 + "amt_cbf" || colName == fix_grid01 + "amt_grs_kgs" || colName == fix_grid01 + "amt_grs_lbs" || colName == fix_grid01 + "amt_net_kgs" || colName == fix_grid01 + "amt_net_lbs"
		 || colName == fix_grid01 + "amt_eq")
	{
		var amt_tot_lvl=eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_pl_lvl")) + eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_bx_lvl"))
		+ eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_in_lvl")) + eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_ea_lvl"));
		var amt_loc=eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_loc"));
		var amt_tot_measure=eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_cbm")) + eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_cbf"))
		+ eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_grs_kgs")) + eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_grs_lbs"))
		+ eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_net_kgs")) + eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_net_lbs"));
		var amt_eq=eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_eq"));
		var amt_ord=eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_ord"));
		var amt_oth=eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_oth"));
		var amt_fix=eval(sheetObj.GetCellValue(Row, fix_grid01 + "amt_fix"));
		sheetObj.SetCellValue(Row, fix_grid01 + "tot_amt",amt_tot_lvl + amt_loc + amt_tot_measure + amt_eq + amt_ord + amt_oth + amt_fix);
	}
	else if (colName == fix_grid01 + "bk_no") 
	{
		if(Value != "")
		{
			var sParam="ctrt_no=" + $("#ctrt_no").val() + "&wh_cd=" + $("#wh_cd").val() + "&bk_no=" + Value;
			ajaxSendPost(searchWHBookingInfo, 'reqVal', '&goWhere=aj&bcKey=searchWHBookingInfo&' + sParam, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row,  fix_grid01 + "bk_cls_cd","",0);
			sheetObj.SetCellValue(Row,  fix_grid01 + "ord_tp_cd"," ",0);
			sheetObj.SetCellValue(Row,  fix_grid01 + "load_tp_cd"," ",0);
		}
	}
	else if(colName == fix_grid01 + "chk1")
	{
		if(sheetObj.GetRowStatus(Row) == "I")
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "chk2",Value,0);
		}
		else //셀merge되는 기준별로 모두 체크 또는 체크해지
		{
			var key_org=sheetObj.GetCellValue(Row, fix_grid01 + "cls_no") + "|" + sheetObj.GetCellValue(Row, fix_grid01 + "cls_seq");
			for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
				var key=sheetObj.GetCellValue(i, fix_grid01 + "cls_no") + "|" + sheetObj.GetCellValue(i, fix_grid01 + "cls_seq");
				if(key_org == key && sheetObj.GetRowStatus(i) != "I" )
				{
					sheetObj.SetCellValue(i, fix_grid01 + "chk1",Value,0);
					sheetObj.SetCellValue(i, fix_grid01 + "chk2",Value,0);
				}
			}
		}
		checkBoxOnOff(sheetObj, colName);
	}
	else if(colName == fix_grid01 + "seal_no")
	{
		merge_value_input_sheet(sheetObj, Value, Row, Col);
	}
	else if(colName == fix_grid01 + "eq_no")
	{
		merge_value_input_sheet(sheetObj, Value, Row, Col);
	}
	else if(colName == fix_grid01 + "pl_over_wgt" 
		 || colName == fix_grid01 + "pl_lvl" || colName == fix_grid01 + "bx_lvl" || colName == fix_grid01 + "in_lvl" || colName == fix_grid01 + "ea_lvl"
		 || colName == fix_grid01 + "cbm" || colName == fix_grid01 + "cbf" || colName == fix_grid01 + "grs_kgs" || colName == fix_grid01 + "grs_lbs"
		 || colName == fix_grid01 + "net_kgs" || colName == fix_grid01 + "net_lbs")
	{
		merge_value_input_sheet(sheetObj, Value, Row, Col);
	}
}


function merge_value_input_sheet(sheetObj, Value, Row, Col)
{
	if(Value != "")
	{
		var val=Value;
		if(val == "") {val=" ";}
		if(sheetObj.GetRowStatus(Row) != "I")
		{
			var key_org=sheetObj.GetCellValue(Row, fix_grid01 + "sub_key");
			for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
				var key=sheetObj.GetCellValue(i, fix_grid01 + "sub_key");
				if(key_org == key)
				{
					sheetObj.SetCellValue(i, Col,val,0);
				}
			}
		}				
	}
	else
	{
		if(sheetObj.GetRowStatus(Row) != "I")
		{
			var key_org=sheetObj.GetCellValue(Row, fix_grid01 + "sub_key");
			for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
				var key=sheetObj.GetCellValue(i, fix_grid01 + "sub_key");
				if(key_org == key)
				{
					sheetObj.SetCellValue(i, Col," ",0);
				}
			}
		}
		else
		{
			sheetObj.SetCellValue(Row, Col,"",0);
		}
	}
}
function setCustInfoGrid(aryPopupData, row, col, sheetIdx){
	
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 var rtnValAry=aryPopupData.split("|");
		sheetObj.SetCellValue(ROW, fix_grid01 + "cust_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "cust_nm",rtnValAry[2],0);
	 }
	
}
function setCurrCdGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 var rtnValAry=aryPopupData.split("|");
		 sheetObj.SetCellValue(ROW, fix_grid01 + "curr_cd",rtnValAry[1],0);
	 }
}
function setIbFrtCdGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 var rtnValAry=aryPopupData.split("|");
		sheetObj.SetCellValue(ROW, fix_grid01 + "frt_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "frt_nm",rtnValAry[1],0);
	 }
}
function setLocInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 var rtnValAry=aryPopupData.split("|");
		sheetObj.SetCellValue(ROW , fix_grid01 + "wh_loc_cd",rtnValAry[0],0);// wh_loc_cd
		sheetObj.SetCellValue(ROW , fix_grid01 + "wh_loc_nm",rtnValAry[1],0);// wh_loc_nm
		sheetObj.SetCellValue(ROW , fix_grid01 + "space_tp_nm",rtnValAry[14],0);// space_tp_nm
		sheetObj.SetCellValue(ROW , fix_grid01 + "space_tp_cd",rtnValAry[13],0);// space_tp_cd
	 }
}
function setContainerTypeInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 if(sheetObj.GetRowStatus(ROW) != "I")
		 {
			 var key_org=sheetObj.GetCellValue(ROW, fix_grid01 + "sub_key");
			 for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
				 var key=sheetObj.GetCellValue(i, fix_grid01 + "sub_key");
				 if(key_org == key)
				 {
					 var rtnValAry=aryPopupData.split("|");
					 sheetObj.SetCellValue(i, fix_grid01 + "eq_tpsz_cd",rtnValAry[0],0);
					 sheetObj.SetCellValue(i, fix_grid01 + "eq_tp_cd",rtnValAry[1],0);
				 }
			 }
		 }
		 else
		 {
			 var rtnValAry=aryPopupData.split("|");
			 sheetObj.SetCellValue(ROW, fix_grid01 + "eq_tpsz_cd",rtnValAry[0],0);
			 sheetObj.SetCellValue(ROW, fix_grid01 + "eq_tp_cd",rtnValAry[1],0);
		 }
	 }
}
function setItemGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 var rtnValAry=aryPopupData.split("|");
		sheetObj.SetCellValue(ROW, fix_grid01 + "item_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "item_nm",rtnValAry[1],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "item_sys_no",rtnValAry[3],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_info",rtnValAry[20],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv1_unit_cd",rtnValAry[15],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv1_qty",rtnValAry[7],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv2_unit_cd",rtnValAry[6],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv2_qty",rtnValAry[5],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv3_unit_cd",rtnValAry[17],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv3_qty",rtnValAry[16],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv4_unit_cd",rtnValAry[19],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_lv4_qty",rtnValAry[18],0);
//		sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_pl_std_qty",rtnValAry[24],0);
//		sheetObj.SetCellValue(ROW, fix_grid01 + "pkg_pl_over_wgt",rtnValAry[25],0);
		sheetObj.SetCellEditable(ROW, fix_grid01 + "lot_id",1);
	 	sheetObj.SetCellBackColor(ROW, fix_grid01 + "lot_id","#EFF0F3"); //UnEditableColor
		sheetObj.SetCellValue(ROW,  fix_grid01 + "lot_id","",0);
//	 	sheetObj.PopupButtonImage(ROW, fix_grid01 + "lot_id",1);
	 }
}
function setBookingGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 var rtnValAry=aryPopupData.split("|");
		sheetObj.SetCellValue(ROW, fix_grid01 + "bk_no",rtnValAry[5],0);
		sheetObj.SetCellValue(ROW, fix_grid01 + "bk_cls_cd",rtnValAry[7],0);
		sheetObj.SetCellValue(ROW, fix_grid01 +  "ord_tp_cd",rtnValAry[8]);
		sheetObj.SetCellValue(ROW,  fix_grid01 + "load_tp_cd",rtnValAry[9]);
		sheetObj.SetCellValue(ROW,  fix_grid01 + "order_rel",rtnValAry[10]);
	 }
}
function setLotInfoGrid(aryPopupData, row, col, sheetIdx){
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 var rtnValAry=aryPopupData.split("|");
		sheetObj.SetCellValue(ROW , fix_grid01 + "lot_id",rtnValAry[7],0);
		//test
//	 	sheetObj.PopupButtonImage(ROW, fix_grid01 + "lot_id",2);
	 }
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
//function processButtonClick(){
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_cls_dt":	
				if (document.getElementById('btn_cls_dt').disabled) {
					return;
				}
				var cal=new ComCalendar();
	            cal.select(formObj.cls_dt, 'MM-dd-yyyy');
				break;
			case "btn_set_fr_dt":	
				if (document.getElementById('btn_set_fr_dt').disabled) {
					return;
				}
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
	            cal.select(formObj.set_fr_dt, formObj.set_fr_dt, 'MM-dd-yyyy');
				break;
			case "btn_set_to_dt":
				if (document.getElementById('btn_set_to_dt').disabled) {
					return;
				}
				var cal=new ComCalendarFromTo();
			    cal.displayType="date";
	            cal.select(formObj.set_fr_dt, formObj.set_to_dt, 'MM-dd-yyyy');
				break;
			case "btn_ctrt_no" :
				if (document.getElementById('btn_ctrt_no').disabled) {
					return;
				}
				//var ord_tp_lvl1_cd="\'P\'";
//				var ord_tp_lvl1_cd="\'\'";
//				var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd;
				
				var sParams = "?ctrt_no=" + formObj.ctrt_no.value;
				
				if(formObj.ctrt_nm.value.trim().length > 2){
					sParams += "&ctrt_nm=" + formObj.ctrt_nm.value;
				}
				
				var sUrl="./ContractRoutePopup.clt" + sParams;
				callBackFunc = "setCtrtNoInfo";
				modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
				break;
			case "SEARCHLIST":
				btn_Search();
				break;
			case "SAVE":
				btn_Save();
				break;
			case "DELETE":
				btn_Delete();
				break;
			case "EXCEL":
				btn_Excel();
				break;
			case "NEW":
				btn_New();
				break;
			case "link_ClosingMgmt":
				btn_Closing_Mgmt();
				break;
			case "PRINT":
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

function btn_Print(){
	var formObj = document.form;
	
	if(formObj.cls_no.value == ""){
		return;
	}
	
	var param = "";
	var fm_date = formObj.set_fr_dt.value;
	var fm_date_sp = fm_date.split("-");
	var to_date = formObj.set_to_dt.value;
	var to_date_sp = to_date.split("-");
	
	var rateTpCd = "";
	if(formObj.rate_tp_cd.value != "ALL"){
		rateTpCd = formObj.rate_tp_cd.value;
	}
	
	var stsCd = "";
	/*
	if(formObj.sts_cd.value != "ALL"){
		stsCd = formObj.sts_cd.value;
	}
	*/
	var sbClsCd = "";
	if(formObj.sb_cls_cd.value != "ALL"){
		sbClsCd = formObj.sb_cls_cd.value;
	}
	
	var custCd = "";
	if(formObj.cust_cd.value != "ALL"){
		custCd = formObj.cust_cd.value;
	}
	
	param += "[" + formObj.wh_cd.value + "]" ;
	param += "[" + formObj.ctrt_no.value + "]" ;
	//param += "[" + formObj.rmk.value + "]" ;
	param += "[" + "" + "]" ;
	//param += "[" + fm_date_sp[1] + fm_date_sp[0] + "]" ;
	param += "[" + fm_date + "]" ;
	//param += "[" + to_date_sp[1] + to_date_sp[0] + "]" ;
	param += "[" + to_date + "]" ;
	
	param += "[" + formObj.ofc_cd.value + "]";
	param += "[" + custCd + "]";
	param += "[" + formObj.cls_no.value + "]";
	param += "[" + sbClsCd + "]";
	param += "[" + rateTpCd + "]";
	param += "[" + stsCd + "]";
	
	formObj.file_name.value= 'closing_detail.mrd';
	formObj.title.value="Closing Detail";
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
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
			case "in_cls_no":	
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
function sb_cls_cd_OnChange(formObj, Code, Text){
	if($("#cls_no").val() == "")
	{
		return;
	}
	searchDetail();
}
function rate_tp_cd_OnChange(formObj, Code, Text){
	if($("#cls_no").val() == "")
	{
		return;
	}
	searchDetail();
}
function cust_cd_OnChange(formObj, Code, Text){
	if($("#cls_no").val() == "")
	{
		return;
	}
	searchDetail();	
}
function chngAmtInfo()
{
	//--sheet헤더변경
//	setTimeout(function(){
			var sheetObj=sheet1;
			sheetObj.RemoveAll();
			var startIndex=sheetObj.SaveNameCol(fix_grid01 + "chk2");
			var lastIndex=sheetObj.SaveNameCol(fix_grid01 + "amt_eq");
			var chk=$("#checkAmtSheetInfoShow").is(":checked");
			for(var i=startIndex; i<=lastIndex; i++)
			{
				if($("#checkAmtSheetInfoShow").is(":checked") == true)
				{
					sheetObj.SetColHidden(i,0);
				}
				else
				{
					sheetObj.SetColHidden(i,1);
				}
			}
			if($("#cls_no").val() == "")
			{
				return;
			}
			searchDetail();
//	},50);
}
function searchDetail()
{
	var formObj=document.form;
//	setTimeout(function(){
		var sheetObj=sheet1;
		var checkAmtInfo="0";
		if($("#checkAmtSheetInfoShow").is(":checked") == true)
		{
			checkAmtInfo="1";
		}
		sheetObj.RemoveAll();
//		var param=FormQueryString(formObj,null, "")+ "&checkAmtInfo=" + checkAmtInfo + "&search_tp=CLS_NO";
//	 	var sXml=sheetObj.GetSearchData("./searchClosingDetailDtl.clt", param);
//		var xml = convertColOrder(sXml, fix_grid01);
//		sheetObj.LoadSearchData(xml,{Sync:1} );
		
		formObj.f_cmd.value = SEARCH01;
		sheetObj.DoSearch("./searchClosingDetailGS.clt", FormQueryString(formObj, null, "")+ "&checkAmtInfo=" + checkAmtInfo + "&search_tp=CLS_NO");
		
		//--
		commonModeChange("SEARCH2");
//	},100);
}
/**
 * 버튼 클릭 이벤트모음 시작
 */
/*
 * Search버튼 클릭시
 */
function btn_Search() {	
	var formObj=document.form;
	if(loading_flag != "Y"){
		return;
	}
	//validation check
	if (validateForm(formObj, 'search') == false) 
	{
		return;	
	}
	 setTimeout(function(){
			searchInfo();
	 },100);
}
var InputName="cls_no|cls_dt|set_fr_dt|set_to_dt|ofc_cd|ofc_nm|wh_cd|wh_nm|ctrt_no|ctrt_nm|rtp_no|cust_cd_arr";
function searchInfo()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	var checkAmtInfo="0";
	if($("#checkAmtSheetInfoShow").is(":checked") == true)
	{
		checkAmtInfo="1";
	}
	sheetObj.RemoveAll();
	
	formObj.f_cmd.value = SEARCH;
	var param=FormQueryString(formObj, null, "")+ "&checkAmtInfo=" + checkAmtInfo + "&search_tp=IN_CLS_NO";
	var sXml = sheet1.GetSearchData("./searchClosingDetailGS_1.clt", param);
	
	if(sXml.replace(/\n|\s|\t|\r/g) == "" || sXml.indexOf("<ERROR>") != -1){
		alert("System Error !");
		
		return;
	}
	
	displayData(sXml);
	
	if($($.parseXML(sXml)).find("in_cls_no").text() != ""){
		commonModeChange("SEARCH");
	}else{
		ComShowCodeMessage('COM0266','Closing No');
		formObj.in_cls_no.focus();
		commonModeChange("SEARCH_BEF");
		return;
	}
	
	formObj.f_cmd.value = SEARCH01;
	sheetObj.DoSearch("./searchClosingDetailGS.clt", FormQueryString(formObj, null, "")+ "&checkAmtInfo=" + checkAmtInfo + "&search_tp=IN_CLS_NO");
}

function displayData(xml){
	  var formObj  = document.frm1;
	  var xmlDoc = $.parseXML(xml);
	  var $xml = $(xmlDoc);
	  var cls_no = $xml.find( "in_cls_no").text();
	  $("#cls_no").val($xml.find( "in_cls_no").text());
	  $("#cls_dt").val($xml.find( "cls_dt").text());
	  $("#set_fr_dt").val($xml.find( "set_fr_dt").text());
	  $("#set_to_dt").val($xml.find( "set_to_dt").text());
	  $("#ofc_cd").val($xml.find( "ofc_cd").text());
	  $("#ofc_nm").val($xml.find( "ofc_nm").text());
	  $("#wh_cd").val($xml.find( "wh_cd").text());
	  $("#wh_nm").val($xml.find( "wh_nm").text());
	  $("#ctrt_no").val($xml.find( "ctrt_no").text());
	  $("#ctrt_nm").val($xml.find( "ctrt_nm").text());
	  $("#rtp_no").val($xml.find( "rtp_no").text());
	  $("#cust_cd_arr").val($xml.find( "cust_cd_arr").text());
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

function btn_Create() {	
	var formObj=document.form;
	var sheetObj=sheet1;
	//20150212 foreground/background 
	formObj.f_cmd.value = SEARCH03;
	var sts_cd="";
	var sParam=FormQueryString(formObj, null, "");
	var sXml=sheetObj.GetSearchData("./searchClosingStatusGS.clt", sParam);
	
	if(getTotalRow(sXml) != "0"){
	 var xmlDoc = $.parseXML(sXml);
	 var $xml = $(xmlDoc);
	 sts_cd = $xml.find("sts_cd").text();
	}
	if(sts_cd > 0){
		ComShowCodeMessage("COM0404");
	}else{
		document.all.create_popup.style.display="block";
		document.all.create_popup.style.visibility='visible';
		formObj.create_popup_type[0].checked=true;
	}
}
/*
 * Create
 */
function btn_Create_Popup_OK() {	
	var formObj=document.form;
	var sheetObj=sheet1;	
	var sts_cd="";
	
	if( formObj.create_popup_type[0].checked == true ){
		formObj.fb_cls_cd.value="F";
	}else{
		formObj.fb_cls_cd.value="B";
	}
	
	formObj.f_cmd.value = SEARCH04;
	var sParam=FormQueryString(formObj,null, "")+"&fb_cls_cd="+formObj.fb_cls_cd.value;
	var sXml=sheetObj.GetSearchData("./createClosingStatusGS.clt", sParam);
	
	if(getTotalRow(sXml) != "0"){
		var xmlDoc = $.parseXML(sXml);
		var $xml = $(xmlDoc);
		sts_cd = $xml.find("sts_cd").text();
		if(sts_cd > 0){
			ComShowCodeMessage("COM0404");
		}else{
			if(formObj.create_popup_type[0].checked == true ){
				btn_Create_foreground();
			}else{
				var sXml2=docObjects[0].GetSearchData("ClosingBackground.clt?cls_dt="+formObj.cls_dt.value+"&set_fr_dt="+formObj.set_fr_dt.value+"&set_to_dt="+formObj.set_to_dt.value+"&sb_cls_cd="+formObj.sb_cls_cd.value+"&rate_tp_cd="+formObj.rate_tp_cd.value+"&wh_cd="+formObj.wh_cd.value+"&ctrt_no="+formObj.ctrt_no.value+"&ofc_cd="+formObj.org_cd.value+"&user_id="+formObj.user_id.value);
			}
		}
		if($xml.find("exception_msg").text() != "") {
			alert($xml.find("exception_msg").text());	
		} 
	}
	btn_Create_Popup_Close();
}	
function btn_Create_Popup_Close(){
	document.all.create_popup.style.display="none";
	document.all.create_popup.style.visibility='hidden';
}
function btn_Create_foreground() {	
	var formObj=document.form;
	var sheetObj=sheet1;	
	var checkAmtInfo="0";
	if($("#checkAmtSheetInfoShow").is(":checked") == true)
	{
		checkAmtInfo="1";
	}
	var param=FormQueryString(formObj,null, "")+ "&checkAmtInfo=" + checkAmtInfo;
 	var sXml=sheetObj.GetSearchData("searchClosingDetailCreateList.clt", param );
	if( sXml.indexOf('<ERROR>') > -1){
		alert(sXml);
		return;
	}
	var arrXml=sXml.split("|$$|");
	if(getTotalRow(arrXml[0]) == "0"){
		ComShowCodeMessage("COM0389");
	}else{
		for(var i=0; i<arrXml.length; i++){
			if(i == 0){
				ComsetXmlDataToForm2(arrXml[i], InputName, 10);
				commonModeChange("CREATE");
			} 
			else {
				var xml = convertColOrder(arrXml[i], fix_grid01);
				sheetObj.LoadSearchData(xml,{Sync:1} );
				if(sheetObj.RowCount()> 0)
				{
					ComBtnEnable("btn_add");
					ComBtnEnable("btn_del");
				}
			}
		}
	}
}
function btn_Save() {
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
	var checkAmtInfo="0";
	if($("#checkAmtSheetInfoShow").is(":checked") == true)
	{
		checkAmtInfo="1";
	}
	var tl_wo_document_info_header="Docin";
	//CLOSING이 있을경우 기존
	var cls_no=tl_wo_document_info_header+"cls_no="		+$("#cls_no").val();
	var wh_cd="&"+tl_wo_document_info_header+"wh_cd="		+$("#wh_cd").val();
	//CLOSING번호가 없어서 신규 CLOSING번호를 따야할경우
	var cls_dt="&"+tl_wo_document_info_header+"cls_dt="		+$("#cls_dt").val();
	var set_fr_dt="&"+tl_wo_document_info_header+"set_fr_dt="	+$("#set_fr_dt").val();
	var set_to_dt="&"+tl_wo_document_info_header+"set_to_dt="	+$("#set_to_dt").val();	
	var ctrt_no="&"+tl_wo_document_info_header+"ctrt_no="		+$("#ctrt_no").val();
	var rtp_no="&"+tl_wo_document_info_header+"rtp_no="		+$("#rtp_no").val();
	//Amount Info
	var AmtInfo="&"+tl_wo_document_info_header+"checkAmtInfo="	+checkAmtInfo;
	//param
	var docinParamter=cls_no+wh_cd+cls_dt+set_fr_dt+set_to_dt+ctrt_no+rtp_no+AmtInfo;
	
	formObj.f_cmd.value = MODIFY;
	
	
	var sheetDatas=ComGetSaveString(sheetObj, true, true); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
	
	if(sheetDatas == "") return;
	
	var param=FormQueryString(formObj,null, "")+"&"+docinParamter+"&"+sheetDatas;
 	var saveXml=sheetObj.GetSaveData("./saveClosingDetailGS.clt", param);
 	
 	if(saveXml.replace(/\n|\r|\s/g,"") != "" && saveXml.indexOf('<ERROR>') == -1){
 		
 		var xmlDoc = $.parseXML(saveXml);
 	 	var $xml = $(xmlDoc);
 	  
 	 	var su_yn = $xml.find( "su_yn").text();
 	 	var su_value = $xml.find( "su_value").text();
 	 	
 		if(su_yn == "N")
 		{
 			ComShowCodeMessage("COM0393", su_value);
 			return;
 		}
 	 	
 		//1. Save 후 조회
 		//SaveEnd
 		
 		//ComShowCodeMessage("COM0093", "");
 		
 		showCompleteProcess();
 		
 		$("#in_cls_no").val($xml.find( "cls_no").text());
 		
 		btn_Search();
 		
 	}else{
 		alert('System Error.');
 	}
 	
 	
	
//	if($("#cls_no").val().trim() == "")
//	{
//	}
//	else
//	{
//		searchDetail();	
//	}
}


function btn_Delete() {
	var formObj=document.form;
	//validation check
	if (validateForm(formObj, 'delete') == false) 
	{
		return;
	}
	var sheetObj=sheet1;
	var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk2");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	//confirm
	if(!ComShowCodeConfirm("COM0053")){
		return;
	}
	//신규건 화면에서 일단삭제
	var sRowI=sheetObj.FindStatusRow("I");
	var arrRowI=sRowI.split(";");
	//삭제처리
	for (var i=arrRowI.length-1; i>=0; i--){
		sheetObj.RowDelete(arrRowI[i], false);
	}
	var checkAmtInfo="0";
	if($("#checkAmtSheetInfoShow").is(":checked") == true)
	{
		checkAmtInfo="1";
	}
	var tl_wo_document_info_header="Docin";
	var cls_no=tl_wo_document_info_header + "cls_no="	+$("#cls_no").val();
	var wh_cd="&"+tl_wo_document_info_header + "wh_cd="		+$("#wh_cd").val();
	var AmtInfo="&"+tl_wo_document_info_header+"checkAmtInfo="	+checkAmtInfo;
	var docinParamter=cls_no+wh_cd+AmtInfo;
	//cls_cnt와 현재 체크된건수가 같으면 전체삭제, 그렇지않으면 부분삭제
	
	formObj.f_cmd.value=MODIFY01;
	var sheetDatas=ComGetSaveString(sheetObj, true, true); //sheetObjs, bUrlEncode, allSave, col
	var isheetSaveParamters=docinParamter+"&"+sheetDatas;
	var param=FormQueryString(formObj,null, "")+"&"+docinParamter+"&"+sheetDatas;
 	saveXml=sheetObj.GetSaveData("./deleteClosingDetailPartialGS.clt", param);
 	
 	var xmlDoc = $.parseXML(saveXml);
 	var $xml = $(xmlDoc);
  
 	var su_yn = $xml.find( "su_yn").text();
 	var su_value = $xml.find( "su_value").text();
 	
	if(su_yn == "N" )
	{
		ComShowCodeMessage("COM130304");
		
		commonModeChange("INIT");
		
		return;
		
	} else if(su_value == "ALL DELETE"){
		showCompleteProcess();
		commonModeChange("INIT");
		
		return
		
	}else{
		showCompleteProcess();
		
		$("#in_cls_no").val($("#cls_no").val());
//		searchDetail();
		btn_Search();
	}
 	//sheetObj.LoadSaveData(saveXml);
 	
// 	sheetObj.LoadSaveData(saveXml);
//	if( saveXml.indexOf('<MESSAGE>') == -1){
//		ComShowCodeMessage("COM0080", "");
//		var su_yn=ComGetEtcData(saveXml, "su_yn");
//		if(su_yn == "Y")
//		{
//			$("#in_cls_no").val($("#cls_no").val());
//			searchDetail();
//		}
//		else //완전삭제
//		{
//			commonModeChange("INIT");
//		}
//	}
}
function btn_Excel() {
	if(docObjects[0].RowCount() < 1){//no data
	      ComShowCodeMessage("COM132501");
	}else{
		docObjects[0].Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
	}
}
function btn_New()
{
	var currLocUrl=this.location.href;
	var hasPlNo = currLocUrl.indexOf("cls_no");
	if(hasPlNo > 0){
		currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
		currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
	
		//parent.mkNewFrame(formObj.screen_title.value, currLocUrl);
		window.location.href = currLocUrl;
	}else{
		if($("#cls_no").val().length > 0)
		{
			if (ComShowCodeConfirm("COM0309")) {
				commonModeChange("INIT");
			}
		}
		else
		{
			commonModeChange("INIT");
		}
	}
}
function btn_Closing_Mgmt() {
	var param="?cls_no=" + $("#cls_no").val().trim();
	var sUrl="./ClosingMgmt.clt" + param;
	parent.mkNewFrame('Closing Management', sUrl, "ClosingMgmt_" + $("#cls_no").val().trim());
}
function btn_link_clsno()
{
	var formObj=document.form;
	if (!ComIsEmpty(formObj.cls_no)) {
		var param="?cls_no=" + ComGetObjValue(formObj.cls_no);
		var sUrl="./ClosingMgmt.clt" + param;
		parent.mkNewFrame('Closing Management', sUrl, "ClosingMgmt_" + ComGetObjValue(formObj.cls_no));
	}
}
function btn_Add() {
	var formObj=document.form;
	var sheetObj=sheet1;
	var row=sheetObj.DataInsert(-1); //
	
	
	//seal button 지정
// 	sheetObj.PopupButtonImage(row, fix_grid01 + "seal_no",0);
	//rate_tp_cd콤보값 변경
 	sheetObj.SetColProperty(fix_grid01 + "rate_tp_cd", {ComboText:rate_tp_cdText, ComboCode:rate_tp_cdCode} );
 	sheetObj.SetColProperty(fix_grid01 + "sb_cls_cd", {ComboText:"SELL|BUY", ComboCode:"S|B"} );
	//combobox와 sheet값 연동
	if(formObj.sb_cls_cd.value != "ALL")
	{
		sheetObj.SetCellValue(row, fix_grid01 + "sb_cls_cd", formObj.sb_cls_cd.value ,0);
		sheetObj.SetCellEditable(row, fix_grid01 + "sb_cls_cd",0);
	}
	if(formObj.rate_tp_cd.value != "ALL" && formObj.rate_tp_cd.value != "OTH")
	{
		sheetObj.SetCellValue(row, fix_grid01 + "rate_tp_cd",formObj.rate_tp_cd.value,0);
		sheetObj.SetCellEditable(row, fix_grid01 + "rate_tp_cd",0);
	}
	if(formObj.cust_cd.value != "ALL")
	{
		sheetObj.SetCellValue(row, fix_grid01 + "cust_cd", formObj.cust_cd.value);
		sheetObj.SetCellEditable(row, fix_grid01 + "cust_cd",0);
	}
	//기본값 셋팅
	sheetObj.SetCellValue(row, fix_grid01 + "order_rel","P",0);// P : Domestic Only
	sheetObj.SetCellValue(row, fix_grid01 + "src_tp_cd","A",0);// M : Manual   A : Aggregate
	sheetObj.SetCellValue(row, fix_grid01 + "cls_no",$("#cls_no").val(),0);
	sheetObj.SetCellValue(row, fix_grid01 + "ord_tp_cd"," ",0);//
	sheetObj.SetCellValue(row, fix_grid01 + "load_tp_cd"," ",0);//
	sheetObj.SetCellValue(row, fix_grid01 + "sts_cd",sts_cd_n,0);//
	//Previous Closing DT 포맷 설정
	sheetObj.InitCellProperty(row, sheetObj.SaveNameCol(fix_grid01 + "pre_cls_dt"),{ Type:"Date",Align:"Center",Format:"MM-dd-yyyy"} );
	//lot id CellEditable 설정	
	sheetObj.SetCellEditable(row, fix_grid01 + "lot_id",0);
	
	// Kieu.Le Modify:
	sheetObj.SetCellValue(row, fix_grid01 + "stock_period",0);//
	sheetObj.SetCellValue(row, fix_grid01 + "ea_qty",0);//
}
/*
 * 신규로 추가된 row만 삭제처리(화면상)
 */
function btn_Del() {
	var sheetObj=sheet1;
	var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk2");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	//가져온 행을 배열로 만들기 
	var arrRow=sRow.split("|"); //결과 : "1|3|5|"
	//삭제처리
	for (var i= arrRow.length - 1; i >= 0; i--){		
		if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "sts_cd") == sts_cd_n) //신규등록된건만 삭제
		{
			sheetObj.RowDelete(arrRow[i], false);
		}
	}
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) 
		{
			case 'save':
				/*if(formObj.auth_lvl.value == 'HQ' || formObj.auth_lvl.value == 'AQ'){
					ComShowCodeMessage("COM0395", "save");
					return false;
				}*/
				var sheetObj=sheet1;
				if(sheetObj.RowCount()==0)
				{
					ComShowCodeMessage("COM0323");
					return false;
				}
				if($("#cls_no").val().trim() == "")
				{
					//Closing Date 필수로 입력되어야함.
					if(ComIsEmpty(formObj.cls_dt))
					{
						ComShowCodeMessage("COM0114","Closing Date");
						$("#cls_dt").focus();
						return false;
					}
					//날짜 체크
					if(ComIsEmpty(formObj.set_fr_dt))
					{
						ComShowCodeMessage("COM0114", "Settlement Period");
						$("#set_fr_dt").focus();
						return false;
					}
					if(ComIsEmpty(formObj.set_to_dt))
					{
						ComShowCodeMessage("COM0114", "Settlement Period");
						$("#set_to_dt").focus();
						return false;
					}
					if (getDaysBetween2(formObj.set_fr_dt.value, formObj.set_to_dt.value)<0) {
						ComShowCodeMessage("COM0122","Settlement Period");
						formObj.set_fr_dt.focus();
						return false;
					}
					//warehouse 필수로 입력되어야함.
					if(ComIsEmpty(formObj.wh_cd))
					{
						ComShowCodeMessage("COM0114","Warehouse");
						$("#wh_cd").focus();
						return false;
					}		
					//ctrt_no 필수로 입력되어야함.
//					if(ComIsEmpty(formObj.ctrt_no))
//					{
//						ComShowCodeMessage("COM0114","Contract");
//						$("#ctrt_no").focus();
//						return false;
//					}
				}
				for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
					//--필수조건 체크
					if(sheetObj.GetRowStatus(i) == "I" || //신규입력건
							sheetObj.GetRowStatus(i) == "U" || //또는 수정건
							sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "A" //또는 집계되어 CREATE상태인건만 VALID체크 (속도때문에)
						)  
					{
						//--CUST CD
						if(sheetObj.GetCellValue(i, fix_grid01 + "cust_cd").trim() == "")
						{
							ComShowCodeMessage("COM0114","Billing Customer");
							sheetObj.SelectCell(i, fix_grid01 + "cust_cd",1);
							return false;
						}
						//--s/b 체크
						var value_combo = $("#sb_cls_cd").val();
						if(value_combo!= "ALL" && value_combo!= sheetObj.GetCellValue(i, fix_grid01 + "sb_cls_cd").trim())
						{
								ComShowCodeMessage("COM0005","S/B");
								sheetObj.SelectCell(i,  fix_grid01 + "sb_cls_cd",1);
								return false;
						}
						//--Type 체크
						if(sheetObj.GetCellValue(i, fix_grid01 + "rate_tp_cd").trim() == "ALL")
						{
							ComShowCodeMessage("COM0005","Type");
							sheetObj.SelectCell(i,  fix_grid01 + "rate_tp_cd",1);
							return false;
						}
						var value_combo1 = $("#rate_tp_cd").val();
						if(value_combo1!= "ALL" && value_combo1!= sheetObj.GetCellValue(i, fix_grid01 + "rate_tp_cd").trim())
						{
								ComShowCodeMessage("COM0005","Type");
								sheetObj.SelectCell(i, fix_grid01 + "rate_tp_cd",1);
								return false;
						}
						
						if(sheet1.GetCellValue(i,fix_grid01 + "trans_dt") == ""){
							ComShowCodeMessage("COM0114","Transaction Date");
							sheetObj.SelectCell(i, fix_grid01 + "trans_dt",1);
							
							return false;
						}
						//--Previous Closing DT, Trasaction DT 체크
						if(sheetObj.GetRowStatus(i) == "I")
						{
							var pre_cls_dt=eval(changeDate(sheetObj.GetCellValue(i, fix_grid01 + "pre_cls_dt").trim()));
							if(sheetObj.GetCellValue(i, fix_grid01 + "rate_tp_cd").trim() == "STR" && sheetObj.GetCellValue(i, fix_grid01 + "pre_cls_dt").trim() != "")
							{
								//Previous Closing DT Settlement Period From To에 해당하는지 체크
								if(ComParseInt(ComReplaceStr($("#set_fr_dt").val(), '-', '')) > pre_cls_dt)
								{
									ComShowCodeMessage("COM0385","Previous Closing DT");
									sheetObj.SelectCell(i,  fix_grid01 + "pre_cls_dt");
									return false;
								}
								if(ComParseInt(ComReplaceStr($("#set_to_dt").val(), '-', '')) < pre_cls_dt)
								{
									ComShowCodeMessage("COM0385","Previous Closing DT");
									sheetObj.SelectCell(i,  fix_grid01 + "pre_cls_dt");
									return false;
								}
							}
							//--Transation Date
							if(sheetObj.GetCellValue(i, fix_grid01 + "trans_dt").trim() == "")
							{
								ComShowCodeMessage("COM0114","Transation Date");
								sheetObj.SelectCell(i,  fix_grid01 + "trans_dt");
								return false;
							}
							//Settlement Period From To에 해당하는지 체크
							var trans_dt=changeDate(sheetObj.GetCellValue(i, fix_grid01 + "trans_dt").trim());
							if(ComParseInt(ComReplaceStr($("#set_fr_dt").val(), '-', '')) > trans_dt)
							{
								ComShowCodeMessage("COM0385","Transation Date");
								sheetObj.SelectCell(i,  fix_grid01 + "trans_dt");
								return false;
							}
							if(ComParseInt(ComReplaceStr($("#set_to_dt").val(), '-', '')) < trans_dt)
							{
								ComShowCodeMessage("COM0385","Transation Date");
								sheetObj.SelectCell(i,  fix_grid01 + "trans_dt");
								return false;
							}
							//STR인경우 Previous Closing DT 와 Transation Date 체크
							if(sheetObj.GetCellValue(i, fix_grid01 + "rate_tp_cd").trim() == "STR" && sheetObj.GetCellValue(i, fix_grid01 + "pre_cls_dt").trim() != "")
							{
								if (getDaysBetween2(sheetObj.GetCellValue(i, fix_grid01 + "pre_cls_dt").trim(), sheetObj.GetCellValue(i, fix_grid01 + "trans_dt").trim(), 'ymd')<0) {
									ComShowCodeMessage("COM0122", "Previous Closing DT");
									sheetObj.SelectCell(i,  fix_grid01 + "pre_cls_dt");
									return false;
								}
							}
						}
						if(sheetObj.GetCellValue(i, fix_grid01 + "frt_cd").trim() != ""
							|| sheetObj.GetCellValue(i, fix_grid01 + "frt_nm").trim() != ""
								|| sheetObj.GetCellValue(i, fix_grid01 + "curr_cd").trim() != ""
						)
						{
							//--Freight
							if(sheetObj.GetCellValue(i, fix_grid01 + "frt_cd").trim() == "")
							{
								ComShowCodeMessage("COM0114","Freight Code");
								sheetObj.SelectCell(i,  fix_grid01 + "frt_cd");
								return false;
							}
							if(sheetObj.GetCellValue(i, fix_grid01 + "frt_nm").trim() == "")
							{
								ComShowCodeMessage("COM0114","Freight Name");
								sheetObj.SelectCell(i,  fix_grid01 + "frt_nm");
								return false;
							}
							//--Currency
							if(sheetObj.GetCellValue(i, fix_grid01 + "curr_cd").trim() == "")
							{
								ComShowCodeMessage("COM0114","Currency");
								sheetObj.SelectCell(i,  fix_grid01 + "curr_cd");
								return false;
							}
						}
						if(sheetObj.GetRowStatus(i) == "I" && sheetObj.GetCellValue(i, fix_grid01 + "rate_tp_cd").trim() == "STR")
						{
							//-- Stock Period
							var stock_period=eval(sheetObj.GetCellValue(i, fix_grid01 + "stock_period"));
							if(stock_period <= 0)
							{
								ComShowCodeMessage("COM0114","Stock Period");
								sheetObj.SelectCell(i,  fix_grid01 + "stock_period");
								return false;
							}
							//-- Location
							if(sheetObj.GetCellValue(i, fix_grid01 + "wh_loc_cd").trim() == "")
							{
								ComShowCodeMessage("COM0114","Location");
								sheetObj.SelectCell(i,  fix_grid01 + "wh_loc_nm");
								return false;
							}
						}
					}
				}
				break;
			case "search":
				if(ComIsEmpty(formObj.in_cls_no))
				{
					ComShowCodeMessage("COM0114","Closing No");
					$("#in_cls_no").focus();
					return false;
				}
				break;
			case 'create':
				/*if(formObj.auth_lvl.value == 'HQ' || formObj.auth_lvl.value == 'AQ'){
					ComShowCodeMessage("COM0395", "create");
					return false;
				}*/
				//Closing Date 필수로 입력되어야함.
				if(ComIsEmpty(formObj.cls_dt))
				{
					ComShowCodeMessage("COM0114","Closing Date");
					$("#cls_dt").focus();
					return false;
				}
				//날짜 체크
				if(ComIsEmpty(formObj.set_fr_dt))
				{
					ComShowCodeMessage("COM0114", "Settlement Period");
					$("#set_fr_dt").focus();
					return false;
				}
				if(ComIsEmpty(formObj.set_to_dt))
				{
					ComShowCodeMessage("COM0114", "Settlement Period");
					$("#set_to_dt").focus();
					return false;
				}
				if (getDaysBetween2(formObj.set_fr_dt.value, formObj.set_to_dt.value)<0) {
					ComShowCodeMessage("COM0122","Settlement Period");
					formObj.set_fr_dt.focus();
					return false;
				}
				//warehouse 필수로 입력되어야함.
				if(ComIsEmpty(formObj.wh_cd))
				{
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}		
				//ctrt_no 필수로 입력되어야함.
				if(ComIsEmpty(formObj.ctrt_no))
				{
					ComShowCodeMessage("COM0114","Contract");
					$("#ctrt_no").focus();
					return false;
				}
				break;
			case "delete":
				/*if(formObj.auth_lvl.value == 'HQ' || formObj.auth_lvl.value == 'AQ'){
					ComShowCodeMessage("COM0395", "delete");
					return false;
				}*/
				break;
		}
	}
	return true;
}

function changeDate(sDate) {
	if (sDate == null || sDate == '') return"";
	var y  = sDate.substr(0,4)-1;	//Month
	var m  = sDate.substr(4,2);		//day
	var d  = sDate.substr(6,2);
	return m+d+y;
}

/**
 * 버튼 클릭 이벤트모음 끝
 */
/*
 * 각모드별 화면을 셋팅
 */
function commonModeChange(mode)
{
	var formObj=document.form;
	switch(mode)
	{
		case "INIT":
			formObj.reset();
			$("#mode").val(mode);
			$("#in_cls_no").val("");
			sheet1.RemoveAll();
			commonButtonChange(mode);	
			headerInfoChange(true);
			$('#checkAmtSheetInfoShow').attr('checked',false);
			chngAmtInfo();
			//날짜 셋팅
			$("#cls_dt").val(ComGetNowInfo());
			btn_Change_Date("month");
			setFieldValue(formObj.sb_cls_cd, "ALL");
			//DEF_VALUE 셋팅
			$("#wh_cd").val($("#def_wh_cd").val());
			$("#wh_nm").val($("#def_wh_nm").val());
			$("#ctrt_no").val($("#def_wh_ctrt_no").val());
			$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
			$("#ofc_cd").val($("#def_org_cd").val());
			$("#ofc_nm").val($("#def_org_nm").val());			

			if (!isNull(formObj.ctrt_no)) {
				getCtrtInfo(formObj.ctrt_no, "RTP_NO_ONLY");
			}
			
			setFieldValue(formObj.rate_tp_cd, "ALL");
			
			removeOptions(formObj.cust_cd);
			comboAddItem("cust_cd", "ALL", "All");
			setFieldValue(formObj.cust_cd, "ALL");
//			ComEnableObject(formObj.cust_cd, false);
			formObj.cust_cd.disabled = true;
			break;		
		case "CREATE":
			$("#mode").val(mode);
			$("#in_cls_no").val("");
			commonButtonChange(mode);
			headerInfoChange(false);
			
			//--cust_cd 드롭다운add
			var vCodeSplit=$("#cust_cd_arr").val().split("|");
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem("cust_cd", vCodeSplit[j], vCodeSplit[j]);
			}			
			setFieldValue(formObj.cust_cd, "ALL");
//			ComEnableObject(formObj.cust_cd, true);
			formObj.cust_cd.disabled = false;
			break;
		case "SEARCH_BEF":		
			$("#mode").val(mode);
			sheet1.RemoveAll();
			commonButtonChange(mode); //버튼		
			headerInfoChange(false);
			var cls_no=$("#in_cls_no").val();
			var chk=$("#checkAmtSheetInfoShow").is(":checked");
			formObj.reset();
			$("#in_cls_no").val(cls_no);
			$('#checkAmtSheetInfoShow').attr('checked',chk);
			//--전체드롭다운핸들링			
//			ComEnableObject(document.form.cust_cd, false);
			formObj.cust_cd.disabled = true;
			setFieldValue(document.form.cust_cd, "ALL");
			
			formObj.sb_cls_cd.value = "S";
			formObj.rate_tp_cd.value = "ALL";
			break;
		case "SEARCH":
			$("#mode").val(mode);
			commonButtonChange(mode); //버튼
			removeOptions(formObj.cust_cd);
			comboAddItem("cust_cd", "ALL", "All");
			var vCodeSplit=$("#cust_cd_arr").val().split("|");
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem("cust_cd", vCodeSplit[j], vCodeSplit[j]);
			}			
			setFieldValue(formObj.cust_cd, "ALL");
//			ComEnableObject(formObj.cust_cd, true);
			
			formObj.cust_cd.disabled = false;
			formObj.cls_dt.disabled = true;
			formObj.sb_cls_cd.disabled = true;
			formObj.rate_tp_cd.disabled = true;
			formObj.ctrt_no.disabled = true;
			formObj.ctrt_nm.disabled = true;
			formObj.wh_cd.disabled = true;
			formObj.set_fr_dt.disabled = true;
			formObj.set_to_dt.disabled = true;
			break;
		case "SEARCH2":
			$("#mode").val("SEARCH");
			commonButtonChange(mode); //버튼
			$("#dis_bk_no").val("");
			$("#dis_bk_amount").val("");
			$("#dis_frt_cd").val("");
			$("#dis_frt_nm").val("");
			$("#dis_frt_amt").val("");
			break;
	}
}

// Add item to combobox
function comboAddItem(sComboId, itemCd, itemNm){
	 var comboObj = document.getElementById(sComboId);
	 var option =  document.createElement("option");
	 option.text = itemNm;
	 option.value = itemCd;
	 comboObj.add(option);
}

function removeOptions(selectbox)
{
    var i;
    for(i=selectbox.options.length-1;i>=0;i--)
    {
        selectbox.remove(i);
    }
}

function headerInfoChange(flg)
{
	var formObj=document.form;
//	ComEnableObject(formObj.cls_dt, flg);
//	ComEnableObject(formObj.set_fr_dt, flg);
//	ComEnableObject(formObj.set_to_dt, flg);
//	ComEnableObject(formObj.wh_cd, flg);
//	ComEnableObject(formObj.ctrt_no, flg);
//	ComEnableObject(formObj.ctrt_nm, flg);
	
	formObj.cls_dt.disabled = (!flg);
	formObj.set_fr_dt.disabled = (!flg);
	formObj.set_to_dt.disabled = (!flg);
	formObj.wh_cd.disabled = (!flg);
	formObj.ctrt_no.disabled = (!flg);
	formObj.ctrt_nm.disabled = (!flg);
	
	if (flg){
		ComBtnEnable("btn_cls_dt");
		ComBtnEnable("btn_set_fr_dt");
		ComBtnEnable("btn_set_to_dt");
		ComBtnEnable("btn_wh_cd");
		ComBtnEnable("btn_ctrt_no");
		ComBtnEnable("btn_change_date1");
		ComBtnEnable("btn_change_date2");
		ComBtnEnable("btn_change_date3");
	}else{
		ComBtnDisable("btn_cls_dt");
		ComBtnDisable("btn_set_fr_dt");
		ComBtnDisable("btn_set_to_dt");
		ComBtnDisable("btn_wh_cd");
		ComBtnDisable("btn_ctrt_no");
		ComBtnDisable("btn_change_date1");
		ComBtnDisable("btn_change_date2");
		ComBtnDisable("btn_change_date3");
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
			ComBtnEnable("btn_create");
			ComBtnEnable("btnSave");
			ComBtnDisable("btnDelete");
			ComBtnEnable("btn_excel");
			ComBtnEnable("btn_add");
			ComBtnEnable("btn_del");
			break;
		case "CREATE" :
			ComBtnDisable("btn_create");
			ComBtnEnable("btnSave");
			ComBtnEnable("btnDelete");
			ComBtnEnable("btn_excel");
			ComBtnDisable("btn_add");
			ComBtnDisable("btn_del");
			break;
		case "SEARCH_BEF" :
			ComBtnDisable("btn_create");
			ComBtnDisable("btnSave");
			ComBtnDisable("btnDelete");
			ComBtnDisable("btn_excel");
			ComBtnDisable("btn_add");
			ComBtnDisable("btn_del");
			break;
		case "SEARCH" :
			ComBtnDisable("btn_create");
			ComBtnDisable("btn_cls_dt");
			ComBtnDisable("btn_set_to_dt");
			ComBtnDisable("btn_change_date1");
			ComBtnDisable("btn_change_date2");
			ComBtnDisable("btn_change_date3");
			ComBtnDisable("btn_ctrt_no");
			
			ComBtnEnable("btnSave");
			ComBtnEnable("btnDelete");
			ComBtnEnable("btn_excel");
			ComBtnEnable("btn_add");
			ComBtnEnable("btn_del");
			break;
	}
}
function btn_Change_Date(div)
{
	var flag="";
	var val=0;
	if($("#cls_dt").val().trim() == "")
	{
		return;
	}
	if(div == "week")
	{
		flag="d";
		val=-7;
	}
	else if(div == "half_month")
	{
		flag="d";
		val=-15;
	}
	else if(div == "month")
	{
		flag="m";
		val=-1;
	}
	var dt=ComGetDateAdd($("#cls_dt").val(), flag, val, "-");
	$("#set_fr_dt").val(ComGetDateAdd(dt, "d", 1, "-"));
	$("#set_to_dt").val($("#cls_dt").val());	
}

function ComGetDateAdd(sDate, sFlag, iVal, sDelim, isFull){
    try {
        if (sDelim==null || sDelim==undefined) sDelim = "-";
        if (isFull==null || isFull==undefined) isFull = true;

        if (sDate==null || sDate==undefined || sDate=="") {
            sDate = new Date();
        } else {
            //문자열 또는 HTML태그(Object)인 경우 처리
            sDate = getArgValue(sDate);

            sDate = getDateObj(sDate);
            if(isNaN(sDate.getYear())) return "";
        }

        var yy = null;
        if(isFull)
        	yy = sDate.getFullYear();
        else
        	yy = sDate.getYear();
        var mm = sDate.getMonth();
        var dd = sDate.getDate();
        iVal = ComParseInt(iVal);	//인자가 문자열로 들어온 경우 에러 발생함

        switch(sFlag.toLowerCase()) {
            case "y":   yy += iVal;    break;
            case "m":   mm += iVal;    break;
            case "d":   dd += iVal;    break;
        }

        date = new Date(yy,mm,dd);
        if(isFull)
        	yy = date.getFullYear();
        else
        	yy = date.getYear();
        mm = date.getMonth() + 1;
        dd = date.getDate();

        return ComLpad(mm,2,"0") + sDelim + ComLpad(dd,2,"0") + sDelim + yy;
    } catch(err) { ComFuncErrMsg(err.message); }
}

function getDateObj(sDate) {
    try {
        sDate = sDate.replace(/\/|\-|\.|\:|\ /g,"");  //날짜구분자,시간구분자,스페이스 없애기
        
	    var arr = ComNumberArray(7);
        var iLen = sDate.length;
        
        /*Vinh.Vo 2015-07-21 (S)*/
        /*Format of sDate is yyyymmdd, so the way to get Month - Day - Year as below is incorrect*/
         
        if (iLen>=6) arr[1]  = sDate.substr(0,2)-1;	//Month
    	if (iLen>=8) arr[2]  = sDate.substr(2,2);		//day
    	if (iLen>=4) arr[0]  = sDate.substr(4,4);
    	
        return new Date(arr[0],arr[1],arr[2]);
        
    } catch(err) { ComFuncErrMsg(err.message); }
}

function setSetPeriod(obj)
{
	btn_Change_Date("month");
}
/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	if (document.getElementById('btn_ctrt_no').disabled) {
		return;
	}
	var formObj=document.form;
	var ord_tp_lvl1_cd="\'P\'";
	var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd;
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
		setFieldValue(formObj.ctrt_no, rtnValAry[0]);
		setFieldValue(formObj.ctrt_nm, rtnValAry[1]);
		setFieldValue(formObj.rtp_no, rtnValAry[2]);
	 }
}
/*
 * Warehouse search
 * OnKeyDown 13 or onChange
 */
function getLocInfo(obj){
	
	var formObj=document.form;
	if(obj.value != ''){
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
	}else{
		$("#wh_nm").val("");	
	}
}

function resultLocInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			formObj.wh_nm.value=rtnArr[0];
		}
		else{
			formObj.wh_nm.value='';
		}
	}
}

/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj, RTP_NO_ONLY){
	
	var formObj=document.form;
	var ord_tp_lvl1_cd="\'P\'";
	if(obj.value != ''){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd, './GateServlet.gsl');
	}else{
		formObj.ctrt_no.value="";
		formObj.ctrt_nm.value="";	
		formObj.rtp_no.value="";	
	}
}
function resultCtrtInfo(reqVal) {
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[1] != "" && rtnArr[1] != null && rtnArr[1] != "null"){
			
			if(rtnArr[0] == null || rtnArr[0] == "null"){
				rtnArr[0] = "";
			}
			
			formObj.ctrt_nm.value=rtnArr[0];
			formObj.ctrt_no.value=rtnArr[1];
			formObj.rtp_no.value=rtnArr[2];
		}
		else{
			formObj.ctrt_nm.value="";
			formObj.ctrt_no.value="";	
			formObj.rtp_no.value="";	
		}
	}
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
		}
	}else sheetObj.SetHeaderCheck(0, colName, 0);
}

function CB_TRDP_POP(rtnVal){
	var formObj = document.form;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		sheet1.SetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_cd", rtnValAry[0],0);
		sheet1.SetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_nm", rtnValAry[2],0);
	}
}

function CB_ajaxTradePaner(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
			sheet1.SetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_cd",masterVals[0],0);
			sheet1.SetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_nm",masterVals[3],0);
			
		}else{
			sheet1.SetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_cd","",0);
			sheet1.SetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_nm","",0);
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));	
	}
}

function comboAddItem(sComboId, itemCd, itemNm){
	
	var comboObj = document.getElementById(sComboId);
	
	var option =  document.createElement("option");
	
	option.text = itemNm;
	option.value = itemCd;
	
	comboObj.add(option);
}

function comboRemoveAll(sComboId){
	
	var comboObj = document.getElementById(sComboId);
	
	var len = comboObj.length;
	
	for(var i = len -1 ; i >= 0 ; i--){
		comboObj.remove(i);
	}
}

function cust_cd_OnChange(){
	
	var formObj=document.form;
	var sheetObj=sheet1;
	var checkAmtInfo="0";
	if($("#checkAmtSheetInfoShow").is(":checked") == true)
	{
		checkAmtInfo="1";
	}
	sheetObj.RemoveAll();
	
	formObj.f_cmd.value = SEARCH01;
	sheetObj.DoSearch("./searchClosingDetailGS.clt", FormQueryString(formObj, null, "")+ "&checkAmtInfo=" + checkAmtInfo + "&search_tp=IN_CLS_NO");
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
		ComBtnDisable("btnDelete");
	}else{
		ComBtnEnable("btnSave");
	}
}