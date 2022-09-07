/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOCUpdate.js
*@FileTitle  : Outbound Complete Update
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;

var rtnary = new Array(1);
var callBackFunc = "";

var firCalFlag=false;

var tabID = '01';

var WMS_QTY_FORMAT  = "Integer";  //QTY  InitDataProperty에서 사용
var WMS_QTY_FORMAT2 = "Integer";//QTY  InitDataProperty2에서 사용
var WMS_QTY_POINT = 0;            //QTY
var WMS_CBM_POINT = 3;            //CBM, GWT, NWT
var WMS_KGS_POINT = 3;            //KGS, GWT, NWT
var MST_CBM_POINT = 5;            //CBM, CBF
var MST_KGS_POINT = 3;            //KGS, GWT, NWT

var fix_grid01="Grd01"; //by booking
var fix_grid02="Grd02"; //by load plan
var fix_by_booking="bk";
var fix_by_loadplan="lp";
var InputName01="wob_out_no|walc_no|bk_wob_bk_no|bk_so_no|bk_wh_cd|bk_wh_nm|bk_ctrt_no|bk_ctrt_nm|bk_buyer_cd|bk_buyer_nm|bk_outbound_dt|bk_load_by|bk_load_hm_fr|bk_load_hm_to|bk_custms_ref_no|bk_modi_ofc|bk_modi_nm|bk_modi_loc_dt|bk_rmk";
var InputName02="lp_no|consol_no|lp_sts_cd|lp_wh_cd|lp_wh_nm|lp_ctrt_no|lp_ctrt_nm|lp_buyer_cd|lp_buyer_nm|eq_tpsz_cd|eq_no|seal_no|lp_gate_in_hm|lp_gate_out_hm|lp_outbound_dt|lp_load_by|lp_load_hm_fr|lp_load_hm_to|lp_custms_ref_no|lp_modi_ofc|lp_modi_nm|lp_modi_loc_dt|lp_rmk";
var loading_flag="N";
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
	
	doShowProcess();
	//sheet
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
	//IBMultiCombo초기화
    doHideProcess();
    
    loading_flag="Y";
    
    ComBtnDisable("lp_sts_cd");
    
	imNew(fix_by_booking, InputName01);
	//by load plan
	imNew(fix_by_loadplan, InputName02);
	//request param이 존재할경우
	if($("#req_search_no").val() != ""){ //부킹번호 또는 completeno가 있을경우
		switch ($("#req_search_div").val())
		{
			case (fix_by_booking): //by booking

				if($("#req_search_tp").val() == "WOB_OUT_NO") //OB Complete No
				{
					$("#in_wob_out_no").val($("#req_search_no").val());
				}
				else if($("#req_search_tp").val() == "WOB_BK_NO") //OB Booking No
				{
					$("#in_wob_bk_no").val($("#req_search_no").val());
				}
				btn_Search(fix_by_booking);
				goTabSelect('01');
				break;
			case (fix_by_loadplan): //by loadplan

				if($("#req_search_tp").val() == "LP_NO") //Load Plan No
				{
					$("#in_lp_no").val($("#req_search_no").val());
				}
				btn_Search(fix_by_loadplan);
				goTabSelect('02');
				break;
		}
	}
}
/*
 * tab
 */
function goTabSelect(isNumSep) {
	
	var tabObjs = document.getElementsByName('tabLayer');
	
	if( isNumSep == "01" ) {
        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabID = '01';
    }else if( isNumSep == "02" ) {
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "inline";
        tabID = '02';
    }
    
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});
    resizeSheet();
}

/*
 * init sheet
 */
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet1": //IBSheet1 init
	    with(sheetObj){
        
//      var hdr1="SEQ|wob_out_no|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Order Qty|Order Qty|Order Qty|rn|Allocated Qty(EA)|Allocated Qty(EA)|Allocated Qty(EA)|Inbound Date|Item Lot No|Location|CBM|CBM|GWT|GWT|NWT|NWT|Type|CNTR/TR NO|Seal No|Gate-In|Gate-Out|Remark|Attach|Attach|Additional Lot Property|Additional Lot Property|Additional Lot Property|Lot ID|Wave Key|So No|Inbound Information|Inbound Information"
//      + "|status|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|cust_item_cd|walc_no|FILE_SEQ|FILE_PATH|FILE_SYS_NM|FILE_ORG_NM|FILE_SIZE|attach_add|attach_del|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|Booking No|Booking Date";
//      var hdr2="SEQ|wob_out_no|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Unit|Unit Qty|EA Qty|rn|Allocated|Shipped|Gap|Inbound Date|Item Lot No|Location|CBM |CBF|KGS|LBS|KGS|LBS|Type|CNTR/TR NO|Seal No|Gate-In|Gate-Out|Remark|Add|Del|Expiration Date|Lot 04|Lot 05|Lot ID|Wave Key|So No|Booking No|Po No"
//      + "|status|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|cust_item_cd|walc_no|FILE_SEQ|FILE_PATH|FILE_SYS_NM|FILE_ORG_NM|FILE_SIZE|attach_add|attach_del|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|Booking No|Booking Date";
//      var headCount=ComCountHeadTitle(hdr1);
      var prefix=fix_grid01;

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [ { Text:getLabel('WHOCUpdate_HDR1'), Align:"Center"},
                  { Text:getLabel('WHOCUpdate_HDR2'), Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [ {Type:"Text",      			Hidden:1, 	Width:30, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"seq", 					Format:"", 					KeyField:0},
                   {Type:"Text",      		Hidden:1, 	Width:150, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"wob_out_no", 			Format:"", 						KeyField:0},
                   {Type:"Text",      		Hidden:1, 	Width:150, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"sao_sys_no", 			Format:"", 						KeyField:0},
                   {Type:"Text",      		Hidden:1, 	Width:150, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"item_sys_no", 			Format:"", 						KeyField:0},
                   {Type:"Text",      		Hidden:1, 	Width:150, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"item_seq", 			Format:"", 						KeyField:0},
                   {Type:"Text",     		Hidden:0,  	Width:100, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"item_cd", 				Format:"",						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     		Hidden:0,  	Width:150, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"item_nm", 				Format:"",						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     		Hidden:0,  	Width:50, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"item_pkgunit", 		Format:"",						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     		Hidden:0,  	Width:70, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"item_pkgqty", 			Format:WMS_QTY_FORMAT2,			KeyField:0,		UpdateEdit:0,   InsertEdit:0, 		PointCount:WMS_QTY_POINT},
                   {Type:"Float",     		Hidden:0,  	Width:70, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"item_ea_qty", 			Format:WMS_QTY_FORMAT2,			KeyField:0,		UpdateEdit:0,   InsertEdit:0,		PointCount:WMS_QTY_POINT},
                   {Type:"Text",      		Hidden:1, 	Width:10, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"rn", 					Format:""},
                   {Type:"Float",     		Hidden:0,  	Width:70, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"pick_item_ea_qty", 	Format:WMS_QTY_FORMAT2,			KeyField:0,		UpdateEdit:0,   InsertEdit:0,		PointCount:WMS_QTY_POINT},
                   {Type:"Float",     		Hidden:0,  	Width:70, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"issu_item_ea_qty", 	Format:WMS_QTY_FORMAT2,			KeyField:0,		UpdateEdit:0,   InsertEdit:0,		PointCount:WMS_QTY_POINT, EditLen:15},
                   {Type:"Float",     		Hidden:0,  	Width:50, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"gap", 					Format:WMS_QTY_FORMAT2,			KeyField:0,		UpdateEdit:0,   InsertEdit:0,		PointCount:WMS_QTY_POINT},
                   {Type:"Date",     		Hidden:0,  	Width:120, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"inbound_dt", 			Format:"Ymd",			KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     		Hidden:0,  	Width:120, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"lot_no", 				Format:"",						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     		Hidden:0,  	Width:80, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"wh_loc_cd_nm", 		Format:"",						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     		Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:0, 	SaveName:prefix+"issu_item_cbm", 		Format:"",					KeyField:0,		PointCount:WMS_CBM_POINT, EditLen:14},
                   {Type:"Float",     		Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"issu_item_cbf", 		Format:"",					KeyField:0,		PointCount:WMS_CBM_POINT, EditLen:10},
                   {Type:"Float",     		Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"issu_item_grs_kgs",	Format:"", 				KeyField:0,		PointCount:WMS_KGS_POINT, EditLen:14},
                   {Type:"Float",     		Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"issu_item_grs_lbs",	Format:"", 				KeyField:0,		PointCount:WMS_KGS_POINT, EditLen:10},
                   {Type:"Float",     		Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"issu_item_net_kgs",	Format:"", 				KeyField:0,		PointCount:WMS_KGS_POINT, EditLen:14},
                   {Type:"Float",     		Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"issu_item_net_lbs",	Format:"", 				KeyField:0,		PointCount:WMS_KGS_POINT, EditLen:10},
                   {Type:"PopupEdit", 		Hidden:0, 	Width:70, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"eq_tpsz_cd", 			Format:"", 						KeyField:0},
                   {Type:"Text",     		Hidden:0,  	Width:100, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"eq_no", 				Format:"",						KeyField:0,		EditLen:20},
                   {Type:"PopupEdit", 		Hidden:0, 	Width:120, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"seal_no", 				Format:"", 						KeyField:0,		EditLen:100},
                   {Type:"Date",     		Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"gate_in_hm", 			Format:"Hm",			KeyField:0,},
                   {Type:"Date",     		Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"gate_out_hm", 			Format:"Hm",			KeyField:0,},
                   {Type:"PopupEdit", 		Hidden:0, 	Width:80, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"rmk", 					Format:"", 						KeyField:0,		EditLen:100},
                   {Type:"Image",     		Hidden:0, 	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"attach_add_img", 		Format:"", 						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Image",     		Hidden:0, 	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"attach_del_img", 		Format:"", 						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Date",     		Hidden:0,  	Width:120, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"exp_dt", 				Format:"Ymd", 			KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     		Hidden:0,  	Width:80, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"lot_04", 				Format:"",						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     		Hidden:0,  	Width:80, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"lot_05", 				Format:"",						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     		Hidden:0,  	Width:120, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lot_id", 				Format:"",						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     		Hidden:0,  	Width:120, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wave_no", 				Format:"",						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     		Hidden:0,  	Width:120, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"so_no", 				Format:"",						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     		Hidden:0,  	Width:120, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wib_bk_no",			Format:"",						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     		Hidden:0,  	Width:120, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"po_no", 				Format:"",						KeyField:0,		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Status",    		Hidden:1, 	Width:30, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"ibflag"},
                   {Type:"Text",      		Hidden:1, 	Width:80, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"wh_loc_cd", 			Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:80, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"po_sys_no", 			Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:80, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"eq_tp_cd", 			Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:80, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"wh_cd", 				Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:80, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"sao_no", 				Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:80, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"cust_item_cd", 		Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:80, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"walc_no", 				Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:0, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"file_seq", 			Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:0, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"file_path", 			Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:0, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"file_sys_nm", 			Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:0, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"file_org_nm", 			Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:0, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"file_size", 			Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:70, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"attach_add", 			Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:50, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"attach_del", 			Format:""},
                   {Type:"Text",      		Hidden:1, 	Width:0, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"pkg_lv1_qty", 			Format:WMS_QTY_FORMAT2,			PointCount:WMS_QTY_POINT},
                   {Type:"Float",      		Hidden:1, 	Width:0, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"lv1_cbm", 				Format:"",					PointCount:MST_CBM_POINT},
                   {Type:"Float",      		Hidden:1, 	Width:0, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"lv1_cbf", 				Format:"",					PointCount:MST_CBM_POINT},
                   {Type:"Float",      		Hidden:1, 	Width:0, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"lv1_grs_kgs", 			Format:"",					PointCount:MST_CBM_POINT},
                   {Type:"Float",      		Hidden:1, 	Width:0, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"lv1_grs_lbs", 			Format:"",					PointCount:MST_CBM_POINT},
                   {Type:"Float",      		Hidden:1, 	Width:70, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"lv1_net_kgs", 			Format:"",					PointCount:MST_CBM_POINT},
                   {Type:"Float",      		Hidden:1, 	Width:50, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"lv1_net_lbs", 			Format:"",					PointCount:MST_CBM_POINT},
                   {Type:"Text",      		Hidden:1, 	Width:100, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"wob_bk_no", 			Format:""},
                   {Type:"Date",      		Hidden:1, 	Width:80, 	Align:"Center", 	ColMerge:0, 	SaveName:prefix+"bk_date", 				Format:"Ymd"} ];
      InitColumns(cols);
      SetSheetHeight(350);
      resizeSheet();
      SetEditable(1);
      SetImageList(0,APP_PATH+"/web/img/main/icon_m.gif");
      SetImageList(1,"./web/img/main/btn_s_add.gif");
      SetImageList(2,"./web/img/main/btn_s_delete.gif");
      SetImageList(3,"./web/img/main/btn_s_download.gif");
      SetUnicodeByte(3);
      SetColProperty(0 , prefix + "eq_tpsz_cd" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
      SetColProperty(0,  prefix + "eq_no",  {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
      SetColProperty(0 , prefix + "seal_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
      //no support[implemented common]CLT 			SelectHighLight=false;
      }
      break;


	case "sheet2":
	    with(sheetObj){
        
//      var hdr1="SEQ|Booking No|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Order Qty|Order Qty|Order Qty|rn|Loading Qty(EA)|Loading Qty(EA)|Loading Qty(EA)|Loading Qty(EA)|Inbound Date|Item Lot No|Location|CBM |CBM |GWT|GWT|NWT|NWT|Remark|Attach|Attach|Additional Lot Property|Additional Lot Property|Additional Lot Property|Lot ID|Wave Key|So No|Inbound Information|Inbound Information"
//      + "|status|LP_NO|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|FILE_SEQ|FILE_PATH|FILE_SYS_NM|FILE_ORG_NM|FILE_SIZE|attach_add|attach_del|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|load_item_ea_qty_org";
//      var hdr2="SEQ|Booking No|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Unit|Unit Qty|EA Qty|rn|Allocated|Loading|Shipped|Gap|Inbound Date|Item Lot No|Location|CBM|CBF|KGS|LBS|KGS|LBS|Remark|Add|Del|Expiration Date|Lot 04|Lot 05|Lot ID|Wave Key|So No|Booking No|Po No"
//      + "|status|LP_NO|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|FILE_SEQ|FILE_PATH|FILE_SYS_NM|FILE_ORG_NM|FILE_SIZE|attach_add|attach_del|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|load_item_ea_qty_org";
//      var headCount=ComCountHeadTitle(hdr1);
      var prefix=fix_grid02;

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
      var headers = [ { Text:getLabel('WHOCUpdate_HDR3'), Align:"Center"},
                  { Text:getLabel('WHOCUpdate_HDR4'), Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [ {Type:"Text",      	Hidden:1, 		Width:30, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"seq", 					KeyField:0,		Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  		Width:120, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wob_bk_no", 			KeyField:0,		Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      	Hidden:1, 		Width:150, 		Align:"Left", 		ColMerge:1, 	SaveName:prefix+"sao_sys_no",			KeyField:0,		Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      	Hidden:1, 		Width:150, 		Align:"Left", 		ColMerge:1, 	SaveName:prefix+"item_sys_no",			KeyField:0,		Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      	Hidden:1, 		Width:150, 		Align:"Left", 		ColMerge:1, 	SaveName:prefix+"item_seq",				KeyField:0,		Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  		Width:100, 		Align:"Left", 		ColMerge:1, 	SaveName:prefix+"item_cd", 				KeyField:0,		Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  		Width:150, 		Align:"Left", 		ColMerge:1, 	SaveName:prefix+"item_nm", 				KeyField:0,		Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  		Width:50, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"item_pkgunit", 		KeyField:0,		Format:"", UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     	Hidden:0,  		Width:70, 		Align:"Right", 		ColMerge:1, 	SaveName:prefix+"item_pkgqty", 			KeyField:0,		Format:WMS_QTY_FORMAT2, PointCount:WMS_QTY_POINT, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     	Hidden:0,  		Width:70, 		Align:"Right", 		ColMerge:1, 	SaveName:prefix+"item_ea_qty", 			KeyField:0,		Format:WMS_QTY_FORMAT2, PointCount:WMS_QTY_POINT, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",      	Hidden:1, 		Width:10, 		Align:"Left", 		ColMerge:1, 	SaveName:prefix+"rn",					KeyField:0,		Format:"",		UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     	Hidden:0,  		Width:70, 		Align:"Right", 		ColMerge:1, 	SaveName:prefix+"pick_item_ea_qty", 	KeyField:0,		Format:WMS_QTY_FORMAT2, PointCount:WMS_QTY_POINT, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     	Hidden:0,  		Width:70, 		Align:"Right", 		ColMerge:1, 	SaveName:prefix+"lp_item_ea_qty", 		KeyField:0,		Format:WMS_QTY_FORMAT2, PointCount:WMS_QTY_POINT, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Float",     	Hidden:0,  		Width:70, 		Align:"Right", 		ColMerge:1, 	SaveName:prefix+"load_item_ea_qty", 	KeyField:0,		Format:WMS_QTY_FORMAT2, PointCount:WMS_QTY_POINT, UpdateEdit:0,   InsertEdit:0, EditLen:15},
                   {Type:"Text",     	Hidden:0,  		Width:50, 		Align:"Right", 		ColMerge:1, 	SaveName:prefix+"gap", 					KeyField:0,		Format:WMS_QTY_FORMAT2, PointCount:WMS_QTY_POINT, UpdateEdit:0,   InsertEdit:0},
                   {Type:"Date",     	Hidden:0,  		Width:120, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"inbound_dt", 			KeyField:0,		Format:"Ymd",	UpdateEdit:0,   InsertEdit:0},
                   {Type:"Text",     	Hidden:0,  		Width:120, 		Align:"Left", 		ColMerge:1, 	SaveName:prefix+"lot_no", 				KeyField:0,		Format:"",	UpdateEdit:0},
                   {Type:"Text",     	Hidden:0,  		Width:80, 		Align:"Left", 		ColMerge:1, 	SaveName:prefix+"wh_loc_cd_nm", 		KeyField:0,		Format:"", UpdateEdit:0},
                   {Type:"Float",     	Hidden:0,  		Width:80, 		Align:"Right", 		ColMerge:0, 	SaveName:prefix+"load_item_cbm", 		KeyField:0,		Format:"", PointCount:WMS_CBM_POINT, EditLen:14},
                   {Type:"Float",     	Hidden:0,  		Width:80, 		Align:"Right", 		ColMerge:1, 	SaveName:prefix+"load_item_cbf", 		KeyField:0,		Format:"", PointCount:WMS_CBM_POINT, EditLen:10},
                   {Type:"Float",     	Hidden:0,  		Width:80, 		Align:"Right", 		ColMerge:1, 	SaveName:prefix+"load_item_grs_kgs", 	KeyField:0,		Format:"", PointCount:WMS_CBM_POINT, EditLen:14},
                   {Type:"Float",     	Hidden:0,  		Width:80, 		Align:"Right", 		ColMerge:1, 	SaveName:prefix+"load_item_grs_lbs", 	KeyField:0,		Format:"", PointCount:WMS_CBM_POINT, EditLen:10},
                   {Type:"Float",     	Hidden:0,  		Width:80, 		Align:"Right", 		ColMerge:1, 	SaveName:prefix+"load_item_net_kgs", 	KeyField:0,		Format:"", PointCount:WMS_CBM_POINT, EditLen:14},
                   {Type:"Float",     	Hidden:0,  		Width:80, 		Align:"Right", 		ColMerge:1, 	SaveName:prefix+"load_item_net_lbs", 	KeyField:0,		Format:"", PointCount:WMS_CBM_POINT, EditLen:10},
                   {Type:"PopupEdit", 	Hidden:0, 		Width:80, 		Align:"Left", 		ColMerge:1, 	SaveName:prefix+"rmk", 					KeyField:0,		Format:"", 		EditLen:100},
                   {Type:"Image",     	Hidden:0, 		Width:80, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"attach_add_img", 		KeyField:0,		Format:""},
                   {Type:"Image",     	Hidden:0, 		Width:80, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"attach_del_img", 		KeyField:0,		Format:""},
                   {Type:"Date",     	Hidden:0,  		Width:120, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"exp_dt", 				KeyField:0,		Format:"Ymd"},
                   {Type:"Text",     	Hidden:0,  		Width:80, 		Align:"Left", 		ColMerge:1, 	SaveName:prefix+"lot_04", 				KeyField:0,		Format:""},
                   {Type:"Text",     	Hidden:0,  		Width:80, 		Align:"Left", 		ColMerge:1, 	SaveName:prefix+"lot_05", 				KeyField:0,		Format:""},
                   {Type:"Text",     	Hidden:0,  		Width:120, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lot_id", 				KeyField:0,		Format:""},
                   {Type:"Text",     	Hidden:0,  		Width:120, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wave_no", 				KeyField:0,		Format:""},
                   {Type:"Text",     	Hidden:0,  		Width:120, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"so_no", 				KeyField:0,		Format:""},
                   {Type:"Text",     	Hidden:0,  		Width:120, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wib_bk_no", 			KeyField:0,		Format:""},
                   {Type:"Text",     	Hidden:0,  		Width:120, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"po_no", 				KeyField:0,		Format:""},
                   {Type:"Status",    	Hidden:1, 		Width:30, 		Align:"Left", 		ColMerge:0,		SaveName:prefix+"ibflag"},
                   {Type:"Text",      	Hidden:1, 		Width:100, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lp_no",				Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:80, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wh_loc_cd",			Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:80, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"po_sys_no",			Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:80, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"eq_tp_cd",				Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:80, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wh_cd",				Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:80, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"sao_no",				Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:0, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"file_seq",				Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:0, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"file_path",			Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:0, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"file_sys_nm",			Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:0, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"file_org_nm",			Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:0, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"file_size",			Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:70, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"attach_add",			Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:50, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"attach_del",			Format:""},
                   {Type:"Text",      	Hidden:1, 		Width:0, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"pkg_lv1_qty",			Format:WMS_QTY_FORMAT2, 	PointCount:WMS_QTY_POINT},
                   {Type:"Float",      	Hidden:1, 		Width:0, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lv1_cbm",				Format:"", 			PointCount:MST_CBM_POINT},
                   {Type:"Float",      	Hidden:1, 		Width:0, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lv1_cbf",				Format:"", 			PointCount:MST_CBM_POINT},
                   {Type:"Float",      	Hidden:1, 		Width:0, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lv1_grs_kgs",			Format:"", 			PointCount:MST_CBM_POINT},
                   {Type:"Float",      	Hidden:1, 		Width:0, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lv1_grs_lbs",			Format:"", 			PointCount:MST_CBM_POINT},
                   {Type:"Float",      	Hidden:1, 		Width:70, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lv1_net_kgs",			Format:"", 			PointCount:MST_CBM_POINT},
                   {Type:"Float",      	Hidden:1, 		Width:50, 		Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lv1_net_lbs",			Format:"", 			PointCount:MST_CBM_POINT},
                   {Type:"Text",      	Hidden:1, 		Width:70, 		Align:"Right", 		ColMerge:1, 	SaveName:prefix+"load_item_ea_qty_org",	Format:WMS_QTY_FORMAT2, 	PointCount:WMS_QTY_POINT} ];
       
      InitColumns(cols);
      SetSheetHeight(350);
      resizeSheet();
      SetEditable(1);
      SetImageList(0,"./web/img/main/btn_s_add.gif");
      SetImageList(1,"./web/img/main/btn_s_delete.gif");
      SetImageList(2,"./web/img/main/btn_s_download.gif");
      SetColProperty(0 , prefix + "lot_04" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
      SetColProperty(0 , prefix + "lot_05" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
      SetColProperty(0 , prefix + "wave_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
      SetColProperty(0 , prefix + "so_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
      SetColProperty(0 , prefix + "po_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
      SetUnicodeByte(3);
      //no support[implemented common]CLT 			SelectHighLight=false;
      }
      break;


	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
	ComResizeSheet(docObjects[1]);
}

/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=docObjects[0];
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//seal button 지정
 		sheetObj.PopupButtonImage(i, fix_grid01 + "seal_no", 0);
		//WAVE NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wave_no","#0100FF");
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
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
	check_authority_wh(fix_by_booking);// check authority warehouse tab booking
	mergeCell(2, sheetObj, fix_grid01);
}
/*
 * sheet1 dbclick event
 */
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid01 + "wib_bk_no":
			var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
			parent.mkNewFrame('Inbound Booking Management', sUrl, "WHInbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
			break;
		case fix_grid01 + "wave_no":
			if(sheetObj.GetCellValue(Row, fix_grid01 + "wave_no").trim() != "")
			{
				var sUrl="./WaveMgmt.clt?wave_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wave_no");
				parent.mkNewFrame('Wave', sUrl, "WaveMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wave_no"));	
			}
		break;
		/*case fix_grid01 + "attach_add_img":
			if(sheetObj.GetCellValue(Row, fix_grid01 + "file_seq") == "") //파일첨부
			{
				fileUpload(sheetObj, Row, Col, fix_by_booking);
			}
			else //다운로드
			{
				fileDownload(sheetObj, Row, Col, fix_by_booking);
			}
			break;
		case fix_grid01 + "attach_del_img": //파일첨부삭제
			if(sheetObj.GetCellValue(Row, fix_grid01 + "file_seq") != "") //파일다운로드
				{
					fileDelete(sheetObj, Row, Col, fix_by_booking);
				}
			break;*/
	}
}
function sheet1_OnClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid01 + "attach_add_img":
			if(sheetObj.GetCellValue(Row, fix_grid01 + "file_seq") == "") //파일첨부
			{
				fileUpload(sheetObj, Row, Col, fix_by_booking);
			}
			else //다운로드
			{
				fileDownload(sheetObj, Row, Col, fix_by_booking);
			}
			break;
		case fix_grid01 + "attach_del_img": //파일첨부삭제
			if(sheetObj.GetCellValue(Row, fix_grid01 + "file_seq") != "") //파일다운로드
				{
					fileDelete(sheetObj, Row, Col, fix_by_booking);
				}
			break;
	}
}
/*
 * sheet1 onchange event
 */
function sheet1_OnChange(sheetObj, row, col, Value) {
	
	var colStr=sheetObj.ColSaveName(col);
	
	if (colStr == (fix_grid01+"issu_item_cbf") && Value != "") 
	{
		funcKGS_CBM_CAC("CBF_CBM", (fix_grid01+"issu_item_cbf"), (fix_grid01+"issu_item_cbm"), sheetObj);		
	} 
	else if (colStr == (fix_grid01+"issu_item_grs_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid01+"issu_item_grs_lbs"), (fix_grid01+"issu_item_grs_kgs"), sheetObj);		
	} 
	else if (colStr == (fix_grid01+"issu_item_net_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid01+"issu_item_net_lbs"), (fix_grid01+"issu_item_net_kgs"), sheetObj);		
	}
	else if(colStr == (fix_grid01 + "eq_tpsz_cd")) 
	{
		change_eq_tpsz_cd(Value, sheetObj, row, col, fix_grid01);
	}
	else if(colStr == (fix_grid01 + "issu_item_ea_qty"))
	{
		var shipped=Value;
		var allocated=eval(sheetObj.GetCellValue(row, fix_grid01 + "pick_item_ea_qty"));
		//음수체크
		if(Value < 0)
		{
			shipped=Math.abs(Value);
			sheetObj.SetCellValue(row, col,shipped,0);
		}
		//shipped는 allocated보다 클수없다.
		if(shipped > allocated)
		{
			shipped=allocated;
			sheetObj.SetCellValue(row, col,shipped,0);
		}
		//allocated - shipped = gap에 셋팅
		sheetObj.SetCellValue(row,  fix_grid01 + "gap",allocated - shipped,0);
		//CBM, KGS, LBS 계산
		var pkg_lv1_qty=eval(sheetObj.GetCellValue(row, fix_grid01 + "pkg_lv1_qty"));
		var lv1_cbm=eval(sheetObj.GetCellValue(row, fix_grid01 + "lv1_cbm"));
		var lv1_cbf=eval(sheetObj.GetCellValue(row, fix_grid01 + "lv1_cbf"));
		var lv1_grs_kgs=eval(sheetObj.GetCellValue(row, fix_grid01 + "lv1_grs_kgs"));
		var lv1_grs_lbs=eval(sheetObj.GetCellValue(row, fix_grid01 + "lv1_grs_lbs"));
		var lv1_net_kgs=eval(sheetObj.GetCellValue(row, fix_grid01 + "lv1_net_kgs"));
		var lv1_net_lbs=eval(sheetObj.GetCellValue(row, fix_grid01 + "lv1_net_lbs"));
		sheetObj.SetCellValue(row,  fix_grid01 + "issu_item_cbm",(pkg_lv1_qty * shipped) * lv1_cbm,0);
		sheetObj.SetCellValue(row,  fix_grid01 + "issu_item_cbf",(pkg_lv1_qty * shipped) * lv1_cbf,0);
		sheetObj.SetCellValue(row,  fix_grid01 + "issu_item_grs_kgs",(pkg_lv1_qty * shipped) * lv1_grs_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid01 + "issu_item_grs_lbs",(pkg_lv1_qty * shipped) * lv1_grs_lbs,0);
		sheetObj.SetCellValue(row,  fix_grid01 + "issu_item_net_kgs",(pkg_lv1_qty * shipped) * lv1_net_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid01 + "issu_item_net_lbs",(pkg_lv1_qty * shipped) * lv1_net_lbs,0);
	}else if(colStr == (fix_grid01+"issu_item_cbm") && Value != ""){
		if(!isValidNumberLength(Value, 10, 3)) {
			ComShowCodeMessage('COM132616');
			sheet1.SetCellValue(row,col,"",0);
		}
	}else if(colStr == (fix_grid01+"issu_item_grs_kgs") && Value != ""){
		if(!isValidNumberLength(Value, 10, 3)) {
			ComShowCodeMessage('COM132616');
			sheet1.SetCellValue(row,col,"",0);
		}
	}else if(colStr == (fix_grid01+"issu_item_net_kgs") && Value != ""){
		if(!isValidNumberLength(Value, 10, 3)) {
			ComShowCodeMessage('COM132616');
			sheet1.SetCellValue(row,col,"",0);
		}
	}
}
/*
 * sheet1 OnPopupClick
 */
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	if (colName == fix_grid01 + "seal_no")
	{
		ComShowMemoPad3(sheetObj, Row, Col, false, 300, 82,  Col, Col);      
	}
	else if ( colName == fix_grid01 + "eq_tpsz_cd" ) 
	{
		var tp="A";
		if(sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd")) != "")
		{
			tp=sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd"));
		}
		
		callBackFunc = "setIbContainerTypeInfo_bk";
	    modal_center_open('./ContainerTypePopup.clt?type=' + tp + '&eq_unit=' + sheetObj.GetCellValue(Row, Col), rtnary, 400, 590,"yes");
	    
//		sUrl="ContainerTypePopup.clt?type="+tp+"&eq_unit="+sheetObj.GetCellValue(Row, Col);
//		ComOpenPopup(sUrl, 400, 600, "setIbContainerTypeInfo_" + fix_by_booking, "0,0", true);
	}
	else if (colName == fix_grid01 + "rmk")
	{
		ComShowMemoPad4(sheetObj, Row, Col, false, 200, 200,Col, Col);
	}
}
/*
 * sheet에서 eq_tpsz_cd change되었을경우(by booking, by load plan 공통으로 사용하기위하여)
 */
var sheetTest , rowTest , colTest , fix_gridTest;
function change_eq_tpsz_cd(Value, sheetObj, row, col, fix_grid)
{
	if(Value != "")
	{
		sheetTest = sheetObj;
		rowTest = row;
		colTest = col;
		fix_gridTest = fix_grid;
		
		ajaxSendPost(setCntrTrTp, 'reqVal', '&goWhere=aj&bcKey=searchCntrTrTp&cntr_tp='+Value, './GateServlet.gsl');
	}
	else
	{
		sheetObj.SetCellValue(row, fix_grid02+"eq_tp_cd","");
	}
}

function setCntrTrTp(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != null){
			sheetTest.SetCellValue(rowTest, colTest,rtnArr[0]);
		}
		else{
			sheetTest.SetCellValue(rowTest, colTest,"0");
		}
		sheetTest.SetCellValue(row, fix_gridTest+"eq_tp_cd",rtnArr[2]);
		
		if(rtnArr[3]!="" && rtnArr[3]!=null){
			alert(rtnArr[3]);
			sheetTest.SelectCell(rowTest, colTest);
		}
	}
}
/*
 * type popupedit 완료후(by booking)
 */
function setIbContainerTypeInfo_bk(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		sheet1.SetCellValue(sheet1.GetSelectRow(), fix_grid01 + "eq_tpsz_cd",rtnValAry[0]);
		sheet1.SetCellValue(sheet1.GetSelectRow(), fix_grid01 + "eq_tp_cd",rtnValAry[2]);
	}
}

function sheet2_OnSearchEnd(){
	var sheetObj=docObjects[1];//docObjects[0];
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//WAVE NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid02 + "wave_no","#0100FF");
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid02 + "wob_bk_no","#0100FF");
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid02 + "wib_bk_no","#0100FF");
		//attach_add, attach_del
 		switch(sheetObj.GetCellValue(i, fix_grid02 + "attach_add"))
		{
			case "Add":
 				sheetObj.SetCellImage(i, fix_grid02 + "attach_add_img",0);
				break;
			case "Download":
 				sheetObj.SetCellImage(i, fix_grid02 + "attach_add_img",2);
				break;
		}
 		switch(sheetObj.GetCellValue(i, fix_grid02 + "attach_del"))
		{
			case "Del":
 				sheetObj.SetCellImage(i, fix_grid02 + "attach_del_img",1);
				break;
		}
	}
	check_authority_wh();
	mergeCell(2, sheetObj, fix_grid02);
}
/*
 * sheet2 onchange event
 */
function sheet2_OnChange(sheetObj, row, col, Value) {
	var colStr=sheetObj.ColSaveName(col);
	if (colStr == (fix_grid02+"load_item_cbf") && Value != "") 
	{
		funcKGS_CBM_CAC("CBF_CBM", (fix_grid02+"load_item_cbf"), (fix_grid02+"load_item_cbm"), sheetObj);		
	} 
	else if (colStr == (fix_grid02+"load_item_grs_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid02+"load_item_grs_lbs"), (fix_grid02+"load_item_grs_kgs"), sheetObj);		
	} 
	else if (colStr == (fix_grid02+"load_item_net_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid02+"load_item_net_lbs"), (fix_grid02+"load_item_net_kgs"), sheetObj);		
	}
	else if(colStr == (fix_grid02 + "load_item_ea_qty"))
	{
		var shipped=Value;
		var loading=eval(sheetObj.GetCellValue(row, fix_grid02 + "lp_item_ea_qty"));
		//음수체크
		if(Value < 0)
		{
			shipped=Math.abs(Value);
			sheetObj.SetCellValue(row, col,shipped,0);
		}
		//shipped는 loading보다 클수없다.
		if(shipped > loading)
		{
			shipped=loading;
			sheetObj.SetCellValue(row, col,shipped,0);
		}
		//loading - shipped = gap에 셋팅
		sheetObj.SetCellValue(row,  fix_grid02 + "gap",loading - shipped,0);
		//CBM, KGS, LBS 계산
		var pkg_lv1_qty=eval(sheetObj.GetCellValue(row, fix_grid02 + "pkg_lv1_qty"));
		var lv1_cbm=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_cbm"));
		var lv1_cbf=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_cbf"));
		var lv1_grs_kgs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_grs_kgs"));
		var lv1_grs_lbs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_grs_lbs"));
		var lv1_net_kgs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_net_kgs"));
		var lv1_net_lbs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_net_lbs"));
		sheetObj.SetCellValue(row,  fix_grid02 + "load_item_cbm",(pkg_lv1_qty * shipped) * lv1_cbm,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "load_item_cbf",(pkg_lv1_qty * shipped) * lv1_cbf,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "load_item_grs_kgs",(pkg_lv1_qty * shipped) * lv1_grs_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "load_item_grs_lbs",(pkg_lv1_qty * shipped) * lv1_grs_lbs,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "load_item_net_kgs",(pkg_lv1_qty * shipped) * lv1_net_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "load_item_net_lbs",(pkg_lv1_qty * shipped) * lv1_net_lbs,0);
	}else if(colStr == (fix_grid02+"load_item_cbm") && Value != ""){
		if(!isValidNumberLength(Value, 10, 3)) {
			ComShowCodeMessage('COM132616');
			sheet2.SetCellValue(row,col,"",0);
		}
	}else if(colStr == (fix_grid02+"load_item_grs_kgs") && Value != ""){
		if(!isValidNumberLength(Value, 10, 3)) {
			ComShowCodeMessage('COM132616');
			sheet2.SetCellValue(row,col,"",0);
		}
	}else if(colStr == (fix_grid02+"load_item_net_kgs") && Value != ""){
		if(!isValidNumberLength(Value, 10, 3)) {
			ComShowCodeMessage('COM132616');
			sheet2.SetCellValue(row,col,"",0);
		}
	}
}
/*
 * sheet2 OnPopupClick
 */
function sheet2_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	if (colName == fix_grid02 + "rmk")
	{
		ComShowMemoPad4(sheetObj, Row, Col, false, 200, 100,Col, Col);
	}
}
/*
 * sheet2 dbclick event
 */
function sheet2_OnDblClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid02 + "wob_bk_no":
			var sUrl="./WHOutbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid02 + "wob_bk_no");
			parent.mkNewFrame('Outbound Booking Management', sUrl, "WHOutbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid02 + "wob_bk_no"));
			break;
		case fix_grid02 + "wib_bk_no":
			var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid02 + "wib_bk_no");
			parent.mkNewFrame('Inbound Booking Management', sUrl, "WHInbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid02 + "wib_bk_no"));
		break;
		/*case fix_grid02 + "wave_no":
			if(sheetObj.GetCellValue(Row, fix_grid02 + "wave_no").trim() != "")
			{
				var sUrl="/opusfwd/WaveMgmt.clt?wave_no="+sheetObj.GetCellValue(Row, fix_grid02 + "wave_no");
				parent.mkNewFrame('Wave', sUrl, "WaveMgmt_" + sheetObj.GetCellValue(Row, fix_grid02 + "wave_no"));	
			}
		break;
		case fix_grid02 + "attach_add_img":
			if(sheetObj.GetCellValue(Row, fix_grid02 + "file_seq") == "") //파일첨부
			{
				fileUpload(sheetObj, Row, Col, fix_by_loadplan);
			}
			else //다운로드
			{
				fileDownload(sheetObj, Row, Col, fix_by_loadplan);
			}
			break;
		case fix_grid02 + "attach_del_img": //파일첨부삭제
			if(sheetObj.GetCellValue(Row, fix_grid02 + "file_seq") != "") //파일다운로드
				{
					fileDelete(sheetObj, Row, Col, fix_by_loadplan);
				}
			break;*/
	}
}

function sheet2_OnClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid02 + "attach_add_img":
			if(sheetObj.GetCellValue(Row, fix_grid02 + "file_seq") == "") //파일첨부
			{
				fileUpload(sheetObj, Row, Col, fix_by_loadplan);
			}
			else //다운로드
			{
				fileDownload(sheetObj, Row, Col, fix_by_loadplan);
			}
			break;
		case fix_grid02 + "attach_del_img": //파일첨부삭제
			if(sheetObj.GetCellValue(Row, fix_grid02 + "file_seq") != "") //파일다운로드
				{
					fileDelete(sheetObj, Row, Col, fix_by_loadplan);
				}
			break;
	}
}
/*
 * LOAD PLAN TAB 의 COMPLETE 체크박스 ONCLICK
 */
function check_flg(obj){
	var chk=obj.checked;
	changeEnableObjectByLoadPlan(chk);
	if (chk == false) //체크 후 다시 체크를 풀 경우 compelte date가 바뀌었을수도 있으므로 원본 데이터로 변환
	{
		$("#lp_outbound_dt").val($("#lp_outbound_dt_org").val());
	}
	//체크하였을경우 sheet CellEditable 수정
	var sheetObj=docObjects[1];//docObjects[0];
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(chk == true)
		{
			sheetObj.SetCellEditable(i, fix_grid02 + "load_item_ea_qty",1);
		}
		else
		{
			sheetObj.SetCellEditable(i, fix_grid02 + "load_item_ea_qty",0);
			//원래값으로 되돌리기
			sheetObj.SetCellValue(i, fix_grid02 + "load_item_ea_qty",sheetObj.GetCellValue(i, fix_grid02 + "load_item_ea_qty_org"));
		}
	}
}
/*
 * 파일다운로드
 */
function fileDownload(sheetObj, Row, Col, div){
	var formObj1=document.frm1;
	var fix_grid="";
	switch(div)
	{
		case (fix_by_booking):
			fix_grid=fix_grid01;
			break;
		case (fix_by_loadplan):
			fix_grid=fix_grid02;
			break;
	}
	formObj1.file_path.value = sheetObj.GetCellValue(Row, fix_grid + "file_path") + sheetObj.GetCellValue(Row, fix_grid + "file_sys_nm");
	formObj1.file_name.value = sheetObj.GetCellValue(Row, fix_grid + "file_org_nm");
	formObj1.submit();
	showCompleteProcess();
}
/*
 * 파일업로드
 */
function fileUpload(sheetObj, Row, Col, div){
	var sUrl="./WHOCUpdateFileUploadPopup.clt?";
	var sParam="";
	switch(div)
	{
		case (fix_by_booking):
			sParam="div=" 		+ fix_by_booking
			+ "&wob_out_no=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "wob_out_no")
			+ "&walc_no=" 		+ sheetObj.GetCellValue(Row, fix_grid01 + "walc_no")
			+ "&wob_bk_no=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no")
			+ "&sao_sys_no=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "sao_sys_no")
			+ "&po_sys_no=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "po_sys_no")
			+ "&item_sys_no=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "item_sys_no")
			+ "&lot_id=" 		+ sheetObj.GetCellValue(Row, fix_grid01 + "lot_id")
			+ "&wh_loc_cd=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_loc_cd")
			+ "&wib_bk_no=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")
			+ "&item_seq=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "item_seq")
			     ;
			break;
		case (fix_by_loadplan):
			sParam="div=" 		+ fix_by_loadplan
			+ "&lp_no=" 	    + sheetObj.GetCellValue(Row, fix_grid02 + "lp_no")
			+ "&wob_bk_no=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "wob_bk_no")
			+ "&sao_sys_no=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "sao_sys_no")
			+ "&po_sys_no=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "po_sys_no")
			+ "&item_sys_no=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "item_sys_no")
			+ "&lot_id=" 		+ sheetObj.GetCellValue(Row, fix_grid02 + "lot_id")
			+ "&wh_loc_cd=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "wh_loc_cd")
			+ "&wib_bk_no=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "wib_bk_no")
			+ "&item_seq=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "item_seq")
		     ;
			break;
	}
	sUrl += sParam;
	callBackFunc = "setFileInfoInfo";
    modal_center_open(sUrl , rtnary, 700,150,"yes");
	
//	ComOpenPopup(sUrl + sParam, 700, 130, "setFileInfoInfo" + div, "0,0", true);
}
/*
 * 파일업로드 이후 --> SHEET 재조회
 */
function setFileInfoInfo(div)
{
	if(div==undefined){
		return;
	}
	//showCompleteProcess();
	if(div == fix_by_booking){
		btn_Search(fix_by_booking);
	}else{
		btn_Search(fix_by_loadplan);
	}
}
//function setFileInfoInfo_lp(aryPopupData, div)
//{
//	btn_Search(div);
//}
/*
 * 파일업로드 이후 --> SHEET 재조회
 * 파일삭제 이후 --> SHEET 재조회
 */
function reSearch(div)
{
	var formObj=document.form;
	switch(div)
	{
		case (fix_by_booking):
			var sheetObj=docObjects[0];
			var sXml="";
			sXml=sheetObj.GetSearchData("searchWHOCUpdateItemByBooking.clt",   "in_wob_out_no=" + formObj.wob_out_no.value);
			var xml = convertColOrder(sXml, fix_grid01);
			sheetObj.LoadSearchData(xml,{Sync:1} );
		break;
		case (fix_by_loadplan):
			var sheetObj=docObjects[1];
			var sXml="";
			sXml=sheetObj.GetSearchData("searchWHOCUpdateItemByLoadPlan.clt",   "in_lp_no=" + formObj.in_lp_no.value);
			var xml = convertColOrder(sXml, fix_grid01);
			sheetObj.LoadSearchData(xml,{Sync:1} );
		break;
	}
}
/* 
 * File Delete
 */
function fileDelete(sheetObj, Row, Col, div) {
	if (ComShowCodeConfirm("COM0053") == false) 
	{ 
		// Do you want to delete?
		return;
	}
	var sParam="";;
	switch(div)
	{
		case (fix_by_booking):
			sParam="&wob_out_no=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "wob_out_no")
			+ "&walc_no=" 		+ sheetObj.GetCellValue(Row, fix_grid01 + "walc_no")
			+ "&wob_bk_no=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no")
			+ "&sao_sys_no=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "sao_sys_no")
			+ "&po_sys_no=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "po_sys_no")
			+ "&item_sys_no=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "item_sys_no")
			+ "&lot_id=" 		+ sheetObj.GetCellValue(Row, fix_grid01 + "lot_id")
			+ "&wh_loc_cd=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_loc_cd")
			+ "&wib_bk_no=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")
			+ "&item_seq=" 	+ sheetObj.GetCellValue(Row, fix_grid01 + "item_seq")
			+ "&file_seq="     + sheetObj.GetCellValue(Row, fix_grid01 + "file_seq")
			     ;
		
		ajaxSendPost(searchDiv, 'reqVal', '&goWhere=aj&bcKey=removeFileWHOCUpdateItemByBooking&div='+ div + sParam, './GateServlet.gsl');
		
			break;
		case (fix_by_loadplan):
			sParam="&lp_no=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "lp_no")
			+ "&wob_bk_no=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "wob_bk_no")
			+ "&sao_sys_no=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "sao_sys_no")
			+ "&po_sys_no=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "po_sys_no")
			+ "&item_sys_no=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "item_sys_no")
			+ "&lot_id=" 		+ sheetObj.GetCellValue(Row, fix_grid02 + "lot_id")
			+ "&wh_loc_cd=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "wh_loc_cd")
			+ "&wib_bk_no=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "wib_bk_no")
			+ "&item_seq=" 	+ sheetObj.GetCellValue(Row, fix_grid02 + "item_seq")
			+ "&file_seq="     + sheetObj.GetCellValue(Row, fix_grid02 + "file_seq")
			     ;
		
		ajaxSendPost(searchDiv, 'reqVal', '&goWhere=aj&bcKey=removeFileWHOCUpdateItemByLoadPlan&div='+ div + sParam, './GateServlet.gsl');
		
			break;
	}
	//showCompleteProcess();
}

function searchDiv(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		ComShowCodeMessage('COM12201');
		btn_Search(doc[1]);
	}
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

function doWork(srcName){
	var formObj=document.form;
	switch(srcName) {
	case "btn_lp_outbound_dt":	
		if (ComDisableTdButton("btn_lp_outbound_dt", 2)) {
			return;
		}
		var cal=new ComCalendar();
		cal.select(formObj.lp_outbound_dt, 'MM-dd-yyyy');
		break;
	
	case "SEARCHLIST":	
		if(tabID == '01'){
			doWork('btn_Search_Booking');
		}else{
			doWork('btn_Search_Load_Plan');
		}
		break;
	case "SAVE":	
		if(tabID == '01'){
			doWork('btn_save_bk');
		}else{
			doWork('btn_save_lp');
		}
		break;	
		
	case "btn_Search_Booking":	
		btn_Search('bk');
		break;
	case "btn_save_bk":	
		btn_Save('bk');
		break;
	case "btn_cancel_bk":	
		btn_Cancel('bk');
		break;
	case "btn_Search_Load_Plan":	
		btn_Search('lp');
		break;
	case "btn_save_lp":	
		btn_Save('lp');
		break;
	case "btn_reinstate_lp":	
		btn_Reinstate('lp');
		break;
	case "btn_cancel_lp":	
		btn_Cancel('lp');
		break;
	}
}

function displayData($xml){
	  
  $("#wob_out_no").val($xml.find( "wob_out_no").text());
  $("#walc_no").val($xml.find( "walc_no").text());
  $("#bk_wob_bk_no").val($xml.find( "wob_bk_no").text());
  $("#bk_so_no").val($xml.find( "so_no").text());
  //searchItem(); //load combobox Item depend on cust_cd
  
  $("#bk_wh_cd").val($xml.find( "wh_cd").text());
  $("#bk_wh_nm").val($xml.find( "wh_nm").text());
  
  $("#bk_ctrt_no").val($xml.find( "ctrt_no").text());
  $("#bk_ctrt_nm").val($xml.find( "ctrt_nm").text());
  
  $("#bk_buyer_cd").val($xml.find( "buyer_cd").text());
  $("#bk_buyer_nm").val($xml.find( "buyer_nm").text());
  
  var str = $xml.find( "outbound_dt").text();
//  var res = str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8) ;
  $("#bk_outbound_dt").val(str);
  
//  $("#bk_outbound_dt").val($xml.find( "outbound_dt").text());
  
  $("#bk_load_by").val($xml.find( "load_by").text());
  
  $("#bk_load_hm_fr").val($xml.find( "load_hm_fr").text());
  $("#bk_load_hm_to").val($xml.find( "load_hm_to").text());
  $("#bk_custms_ref_no").val($xml.find( "custms_ref_no").text());
  $("#bk_modi_ofc").val($xml.find( "modi_ofc_cd").text());

  $("#bk_modi_nm").val($xml.find( "modi_nm").text());
  $("#bk_modi_loc_dt").val($xml.find( "modi_loc_dt").text());
  $("#bk_rmk").val($xml.find( "rmk").text());
  
}

function displayData1($xml){
	  
  $("#lp_no").val($xml.find( "lp_no").text());
  $("#consol_no").val($xml.find( "consol_no").text());
  
//  $("#lp_sts_cd").val($xml.find( "lp_sts_cd").text());
  $('#lp_sts_cd option[value=' + $xml.find( "lp_sts_cd").text() + ']').attr('selected','selected');
  
  $("#lp_wh_cd").val($xml.find( "wh_cd").text());
  $("#lp_wh_nm").val($xml.find( "wh_nm").text());
  //searchItem(); //load combobox Item depend on cust_cd
  
  $("#lp_ctrt_no").val($xml.find( "ctrt_no").text());
  $("#lp_ctrt_nm").val($xml.find( "ctrt_nm").text());
  $("#lp_buyer_cd").val($xml.find( "buyer_cd").text());
  
  $("#lp_buyer_nm").val($xml.find( "buyer_nm").text());
  $("#eq_tpsz_cd").val($xml.find( "eq_tpsz_cd").text());
  $("#eq_no").val($xml.find( "eq_no").text());
  $("#seal_no").val($xml.find( "seal_no").text());
  
  $("#lp_gate_in_hm").val($xml.find( "gate_in_hm").text());
  $("#lp_gate_out_hm").val($xml.find( "gate_out_hm").text());
  
  var str = $xml.find( "outbound_dt").text();
  if(str != ""){
	  var res = str.substring(4, 6) + '-' + str.substring(6, 8) + '-' +  str.substring(0, 4);
	  
	  $("#lp_outbound_dt").val(res);
  }
  
  
//  $("#lp_outbound_dt").val($xml.find( "outbound_dt").text());
  
  $("#lp_load_by").val($xml.find( "load_by").text());

  $("#lp_load_hm_fr").val($xml.find( "load_hm_fr").text());
  $("#lp_load_hm_to").val($xml.find( "load_hm_to").text());
  $("#lp_custms_ref_no").val($xml.find( "custms_ref_no").text());
  $("#lp_modi_ofc").val($xml.find( "modi_ofc_cd").text());
  
  $("#lp_modi_nm").val($xml.find( "modi_nm").text());
  $("#lp_modi_loc_dt").val($xml.find( "modi_loc_dt").text());
  $("#lp_rmk").val($xml.find( "rmk").text());
  
}

function btn_Search(div){
	
	var formObj=document.form;
	//sheet객체생성, 화면 Merge 컬럼 Name
	var sheetObj;
	if(loading_flag != "Y"){
		return;
	}
	if(div == fix_by_booking)
	{
		sheetObj=docObjects[0];
	}
	else
	{
		sheetObj=docObjects[1];
	}
	//--validation check
	if (validateForm(formObj, 'search_' + div) == false) 
	{
		return;
	}
	//search
	doShowProcess();
	setTimeout(function(){
	var sXml="";
	switch(div)
	{
		case (fix_by_booking):
			var in_cnt=formObj.in_cnt.value;
			wob_out_no_dupCheck();
			if(!ComIsEmpty(formObj.in_wob_out_no.value) || formObj.in_cnt.value < 2 ){
				if(!ComIsEmpty(formObj.in_wob_out_no.value) || in_cnt < 2 )
				{			
					imNew(div, InputName01); //이전조회결과 reset
					
					formObj.f_cmd.value = SEARCH01;
					var xml1 = sheet1.GetSearchData("./WHOCUpdate_001GS.clt", FormQueryString(formObj, null,""));
					var xmlDoc = $.parseXML(xml1);
					var $xml = $(xmlDoc);
					
					var x = $xml.find("DATA")[0].attributes.getNamedItem("TOTAL").value;
					
					if(x == "0"){
						ComShowCodeMessage("COM0266", "OB Complete No or OB Booking No");
						formObj.in_wob_out_no.focus();
					}else{
						
						displayData($xml);
						
						sheetObj.RemoveAll();
						formObj.f_cmd.value = SEARCH;
	 					sheetObj.DoSearch("./WHOCUpdate_002GS.clt", FormQueryString(formObj, null,""));
	 					
	 					commonButtonChange(div, true);
					}
					
				}
			}
			break;
		case (fix_by_loadplan):
			
			imNew(div, InputName02); //이전조회결과 reset
		
			formObj.f_cmd.value = SEARCH03;
			var xml1 = sheet1.GetSearchData("./WHOCUpdate_003GS.clt", FormQueryString(formObj, null,""));
			var xmlDoc = $.parseXML(xml1);
			var $xml = $(xmlDoc);
			
			var x = $xml.find("DATA")[0].attributes.getNamedItem("TOTAL").value;
			
			if(x == "0"){
				ComShowCodeMessage("COM0266", "Load Plan No");
				formObj.in_lp_no.focus();
			}else{
				
				displayData1($xml);
				
				var seal_no=$("#seal_no").val().trim().split(",");
				for(var m=0; m <seal_no.length; m++){
					$("#seal_no" + m).val(seal_no[m]);
					if(m >= 3) //seal_no는 3개가 max
					{
						break;
					}
				}
				//원본데이터 남기기
				$("#lp_outbound_dt_org").val($("#lp_outbound_dt").val());
				
				sheetObj.RemoveAll();
				formObj.f_cmd.value = SEARCH02;
				sheetObj.DoSearch("./WHOCUpdate_004GS.clt", FormQueryString(formObj, null,""));
				
				commonButtonChange(div, true);
				
//				if(lp_sts_cd.GetSelectCode()!= "L")
				if(ComGetObjValue(formObj.lp_sts_cd) != "L")
				{
					formObj.checkComplete.disabled=false; //plan상태일때만 체크하게끔.
					ComBtnDisable("link_Print_" + div);
				}
				else
				{
					ComEnableObject(formObj.seal_no0, false); //seal no 수정불가능
					ComEnableObject(formObj.seal_no1, false); //seal no 수정불가능
					ComEnableObject(formObj.seal_no2, false); //seal no 수정불가능
					ComEnableObject(formObj.eq_no, false);    //eq no 수정불가능
					ComBtnEnable("link_Print_" + div);
				}
			}
			
			break;
	}
	},100);
	doHideProcess();
}
function wob_out_no_dupCheck(){
	var formObj=document.form;
	var in_wob_out_no=formObj.in_wob_out_no.value;
	var in_wob_bk_no=formObj.in_wob_bk_no.value;
	if(ComIsEmpty(in_wob_out_no)){
		
		ajaxSendPost(setLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchWHOCBkNoDupCheck&in_wob_bk_no=' + in_wob_bk_no, './GateServlet.gsl');
		
	}
}

function setLocInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			formObj.in_cnt.value = rtnArr[0];
		}
	}
	
	if(formObj.in_cnt.value > 1){
		WHOCListPopup();
	}
}

function WHOCListPopup(){
	
	var formObj=document.form;
	
    callBackFunc = "setWHOCInfo";
    modal_center_open('./WHOCListByBookingPopup.clt?wob_bk_no=' + formObj.in_wob_bk_no.value, rtnary, 500,400,"yes");
	
}
function setWHOCInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		formObj.in_wob_out_no.value = rtnValAry[0];
		formObj.in_wob_bk_no.value = rtnValAry[2];
	}
}
/*
 * Save
 */
var divSave = '';

function btn_Save(div) 
{
	var formObj=document.form;
	//sheet객체생성
	var sheetObj;
	var bAllSave;
	if(div == fix_by_booking)
	{
		sheetObj=docObjects[0];
		bAllSave=false;
	}
	else
	{
		sheetObj=docObjects[1];
		bAllSave=true;
	}
	//--validation check
	if (validateForm(formObj, 'save_' + div) == false) 
	{
		return;
	}
	//--confirm
	if(!ComShowCodeConfirm("COM0063")){
		return;
	}
	//--save param생성
	var docinParamter=makeSaveDocInParam(div);
	var sheetDatas1=ComGetSaveString(sheetObj, true, bAllSave); //sheetObjs, bUrlEncode, allSave, col
	var isheetSaveParamters=docinParamter+"&"+sheetDatas1;	
	
	var test = 'div='+ div + '&modi_id=' + formObj.user_id.value + '&modi_ofc_cd=' + formObj.org_cd.value + '&' + isheetSaveParamters;
	
	//--load save
	
	var saveXml;
	
	divSave = div;
	
	switch(div)
	{
		case (fix_by_booking):
			
			doShowProcess();
			setTimeout(function() {
				
			formObj.f_cmd.value = MULTI;
			test += "&f_cmd=7";
			saveXml=sheetObj.GetSaveData("./modifyWHOCUpdateInfoByBooking.clt?" + test);
			
			afterSave(saveXml);
			
			doHideProcess();
			},100);  
			
			break;
		case (fix_by_loadplan):
			
			doShowProcess();
			setTimeout(function() {
				
			formObj.f_cmd.value = MULTI01;
			test += "&f_cmd=181";
			saveXml=sheetObj.GetSaveData("./modifyWHOCUpdateInfoByLoadPlan.clt?" + test + "&" + FormQueryString(formObj,""));
			
			afterSave(saveXml);
			
			doHideProcess();
			},100); 
			
			break;
	}
	
}

function afterSave(saveXml){
	try {
		var xmlDoc = $.parseXML(saveXml);
		var $xml = $(xmlDoc);
		var rtnVal = $xml.find("DATA")[0].attributes.getNamedItem("TOTAL").value;
		if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
			ComShowCodeMessage("COM0410");
		}else{
//			ComShowCodeMessage("COM132601");
			//Change message 'Successfully' to showCompleteProcess();
			showCompleteProcess();
			btn_Search(divSave);
		}
		
	}catch(e) {
		ComShowCodeMessage("COM0410");
	}
}
/*
 * Reinstate
 */
function btn_Reinstate(div)
{
	var formObj=document.form;
	//sheet객체생성
	var sheetObj=docObjects[1];
	//--validation check
	if (validateForm(formObj, 'reinstate') == false) 
	{
		return;
	}
	//--confirm
	if(!ComShowCodeConfirm("COM0061")){
		return;
	}
	//--reinstate param생성
	var tl_wo_document_info_header="";
	var wh_cd=tl_wo_document_info_header+"wh_cd="+$("#" + div + "_wh_cd").val();
	var lp_no="&"+tl_wo_document_info_header+"lp_no="+$("#lp_no").val();
	var docinParamter=wh_cd + lp_no;
	
	//ajaxSendPost(searchRei, 'reqVal', '&goWhere=aj&bcKey=reinstateWHOCUpdateInfoByLoadPlan&div='+ div + '&modi_id=' + formObj.user_id.value + '&modi_ofc_cd=' + formObj.org_cd.value + '&' + docinParamter, './GateServlet.gsl');
	saveXml=sheetObj.GetSaveData("./reinstateWHOCUpdateInfoByLoadPlanGS.clt?div="+ div + '&f_cmd=' + MULTI04 + '&modi_id=' + formObj.user_id.value + '&modi_ofc_cd=' + formObj.org_cd.value + '&' + docinParamter);
	var xmlDoc = $.parseXML(saveXml);
	var $xml = $(xmlDoc);
	if($xml.find("rtncd").text() == "N"){
		ComShowMessage($xml.find("message").text())
	}else if($xml.find("res").text() == "OK"){
		ComShowCodeMessage("COM0268", "");
		btn_Search(doc[1]);
	}
}

function searchRei(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		ComShowCodeMessage("COM0268", "");
		btn_Search(doc[1]);
	}else{
		ComShowCodeMessage("COM12224", "");
	}
}
/*
 * cancel
 */
function btn_Cancel(div)
{
	var formObj=document.form;
	//sheet객체생성
	var sheetObj;
	if(div == fix_by_booking)
	{
		sheetObj=docObjects[0];
	}
	else
	{
		sheetObj=docObjects[1];
	}
	//--validation check
	if (validateForm(formObj, 'cancel_' + div) == false) 
	{
		return;
	}
	//--confirm
	if(!ComShowCodeConfirm("COM0341")){
		return;
	}
	//--cancel param생성
	var docinParamter=makeCancelDocInParam(div);
	
	var saveXml;
	switch(div)
	{
		case (fix_by_booking):
			
			//ajaxSendPost(searchCanBk, 'reqVal', '&goWhere=aj&bcKey=cancelWHOCUpdateInfoByBooking&div='+ div + '&modi_id=' + formObj.user_id.value + '&modi_ofc_cd=' + formObj.org_cd.value + '&' + docinParamter, './GateServlet.gsl');
			doShowProcess();
			setTimeout(function() {
			//cancelWHOCUpdateInfoByBookingGS = WHOCUpdate_005GS	
			saveXml=sheetObj.GetSaveData("./cancelWHOCUpdateInfoByBookingGS.clt?div="+ div + '&f_cmd=' + MULTI02 + '&modi_id=' + formObj.user_id.value + '&modi_ofc_cd=' + formObj.org_cd.value + '&' + docinParamter);
			var xmlDoc = $.parseXML(saveXml);
			var $xml = $(xmlDoc);
			if($xml.find("rtncd").text() == "N"){
				ComShowMessage($xml.find("message").text())
			}else if($xml.find("res").text() == "OK"){
				var wob_bk_no=$("#bk_wob_bk_no").val();
				imNew(fix_by_booking, InputName01); //이전조회결과 reset
				$("#in_wob_out_no").val("");
				$("#in_wob_bk_no").val("");
				if(ComShowCodeConfirm("COM0342", "Outbound Complete Management")){
					//화면이동
					var sUrl="./WHOCMgmt.clt?search_no="+wob_bk_no + "&search_tp=WOB_BK_NO&search_div=" + fix_by_booking;
					parent.mkNewFrame('Outbound Complete Management', sUrl, "WHOCMgmt_" + wob_bk_no + "_" + fix_by_booking);
				}
			}
			doHideProcess();
			},100); 
			break;
		case (fix_by_loadplan):
			
			//ajaxSendPost(searchCanLoad, 'reqVal', '&goWhere=aj&bcKey=cancelWHOCUpdateInfoByLoadPlan&div='+ div + '&modi_id=' + formObj.user_id.value + '&modi_ofc_cd=' + formObj.org_cd.value + '&' + docinParamter, './GateServlet.gsl');
			doShowProcess();
			setTimeout(function() {
			//cancelWHOCUpdateInfoByLoadPlanGS = WHOCUpdate_006GS	
			saveXml=sheetObj.GetSaveData("./cancelWHOCUpdateInfoByBookingGS.clt?div="+ div + '&f_cmd=' + MULTI03 + '&modi_id=' + formObj.user_id.value + '&modi_ofc_cd=' + formObj.org_cd.value + '&' + docinParamter);
			var xmlDoc = $.parseXML(saveXml);
			var $xml = $(xmlDoc);
			if($xml.find("rtncd").text() == "N"){
				ComShowMessage($xml.find("message").text())
			}else if($xml.find("res").text() == "OK"){
				showCompleteProcess();
				imNew(fix_by_loadplan, InputName02); //이전조회결과 reset
				$("#in_lp_no").val("");
			}
			doHideProcess();
			},100); 
	}
}

function searchCanBk(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		
		var wob_bk_no=$("#bk_wob_bk_no").val();
		imNew(fix_by_booking, InputName01); //이전조회결과 reset
		$("#in_wob_out_no").val("");
		$("#in_wob_bk_no").val("");
		if(ComShowCodeConfirm("COM0342", "Outbound Complete Management")){
			//화면이동
			var sUrl="./WHOCMgmt.clt?search_no="+wob_bk_no + "&search_tp=WOB_BK_NO&search_div=" + fix_by_booking;
			parent.mkNewFrame('Outbound Complete Management', sUrl, "WHOCMgmt_" + wob_bk_no + "_" + fix_by_booking);
		}
	}else{
		ComShowCodeMessage("COM12224", "");
	}
}

function searchCanLoad(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		
//		ComShowCodeMessage("COM0079", "");
		//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		imNew(fix_by_loadplan, InputName02); //이전조회결과 reset
		$("#in_lp_no").val("");
	}
}

function btn_Svo_Freight(div)
{
	if (ComDisableTdButton("link_Svo_Freight_" + div, 2)) {
		return;
	}
    var so_no=$("#" + div + "_so_no").val();
	var sUrl="./FreightMgmt.clt?frt_doc_no="+so_no+"&doc_cls_cd=S";
	parent.mkNewFrame('Freight Management', sUrl, "FreightMgmt_" + so_no + "_" + "S");	
}
function btn_TruckFee(div)
{
	if (ComDisableTdButton("link_TruckFee_" + div, 2)) {
		return;
	}
	goOthCostMgmt("T", div); 
}
function btn_Oth_Cost(div)
{
	if (ComDisableTdButton("link_OthCost_" + div, 2)) {
		return;
	}
	goOthCostMgmt("O", div); 
}
/*
 * search_tp T : Truck Fee
 *           O : Other Costs
 */
function goOthCostMgmt(search_tp, div)
{
	var formObj=document.form;
	switch(div)
	{
		case (fix_by_booking):
			var wob_out_no=ComGetObjValue(formObj.wob_out_no);
			if (ComIsEmpty(wob_out_no)) {
				ComShowCodeMessage("COM0289", "Outbound Complete");
				return;
			}
			var sUrl="./OthCostMgmt.clt?bk_cls_cd=OUT" + "&search_tp=" + search_tp + "&search_no=" + wob_out_no;
			parent.mkNewFrame('Other Costs Management', sUrl, "OthCostMgmt_" + search_tp + "_" +wob_out_no);
		break;
	}
}
/*
 * WORK ORDER
 */
function btn_Work_Order(div)
{
	if (ComDisableTdButton("link_Work_Order_" + div, 2)) {
		return;
	}	
	switch(div)
	{
		case (fix_by_booking):
			var formObj=document.form;
			var sheetObj=docObjects[0];
 			var sXml=sheetObj.GetSearchData("existsWO.clt", "flag=WO&sb_no="+$("#bk_wob_bk_no").val());
			var wo_cnt=getXmlDataNullToNullString(sXml,"wo_cnt");
			var msgCode="";
			if(wo_cnt > 0){
				msgCode="COM0243"; //이미 work order 존재.
			}
			else
			{
				msgCode="COM0035"; //신규 creation.
			}
			if(ComShowCodeConfirm(msgCode) == false)
			{
				return;
			}
			var sParam=FormQueryString(formObj, "");	
 			var saveXml=sheetObj.GetSaveData("addWOWHOCByBooking.clt",sParam);
 			sheetObj.LoadSaveData(saveXml);
			if( saveXml.indexOf('<MESSAGE>') == -1){
				moveWorkOrder(ComGetEtcData(saveXml, "wo_no"));
			}
			break;
	}
}
function moveWorkOrder(wo_no){
	var sUrl="./WOMgmt.clt?wo_no="+wo_no;
	parent.mkNewFrame('Work Order Management', sUrl, "WOMgmt_" + wo_no);
}
/*
 * PRINT
 */
function btn_Print(div)
{
	if (ComDisableTdButton("link_Print_" + div, 2)) {
		return;
	}
	var sUrl="./WHOutbkPrintOption.clt?";
	if(div == fix_by_booking)
	{		
		sUrl=sUrl + "page_tp=" + "BK";
		sUrl=sUrl + "&wob_out_no=" + $("#wob_out_no").val();
	}
	else if(div == fix_by_loadplan)
	{
		sUrl=sUrl + "page_tp=" + "LP";
		sUrl=sUrl + "&lp_no=" + $("#lp_no").val();
	}
	sUrl = sUrl + "&wh_cd=" + $("#" + div + "_wh_cd").val();
	callBackFunc = "setPrintOptionInfo";
    modal_center_open(sUrl, rtnary, 1000,700,"yes");
}

function setPrintOptionInfo(){
	
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) 
		{
			case 'search_bk': //by booking tab
				//in_wob_out_no, in_wob_bk_no 둘중하나는 필수로 입력되어야함.
				if(ComIsEmpty(formObj.in_wob_out_no) && ComIsEmpty(formObj.in_wob_bk_no))
				{
					ComShowCodeMessage("COM0114","OB Complete No or OB Booking No");
					$("#in_wob_out_no").focus();
					return false;
				}
				break;
			case 'search_lp': //by load plan tab
				if(ComIsEmpty(formObj.in_lp_no))
				{
					ComShowCodeMessage("COM0114","Load Plan No");
					$("#in_lp_no").focus();
					return false;
				}
				break;
			case "save_bk": //by booking tab
				if(ComIsEmpty(formObj.wob_out_no))
				{
					ComShowCodeMessage("COM0289", "Outbound Complete");
					return false;
				}
				if(checkSaveCommon(fix_by_booking) == false)
				{
					return false;
				}
				break;
			case "save_lp": //by loadplan tab
				if(ComIsEmpty(formObj.lp_no))
				{
					ComShowCodeMessage("COM0289", "Outbound Complete");
					return false;
				}
				if(checkSaveCommon(fix_by_loadplan) == false)
				{
					return false;
				}
				//모든 ship수량이 0일경우 체크
				if(ComGetObjValue(formObj.lp_sts_cd)== "P" && $("#checkComplete").is(":checked") == true)
				{
					var sheetObj=docObjects[1];
					var iCol=sheetObj.SaveNameCol(fix_grid02 + "load_item_ea_qty");
					var ship_qty_sum=sheetObj.ComputeSum("|" + String(iCol) + "|");
					if(ship_qty_sum <= 0)
					{
						ComShowCodeMessage("COM0355", $("#lp_no").val()); 
						return false;
					}
				}
				break;
			case "cancel_bk": //by booking tab
				if(ComIsEmpty(formObj.wob_out_no))
				{
					ComShowCodeMessage("COM0289", "Outbound Complete");
					return false;
				}
				break;
			case "cancel_lp": //by load plan tab
				if(ComIsEmpty(formObj.lp_no))
				{
					ComShowCodeMessage("COM0289", "Outbound Complete");
					return false;
				}
				break;
			case "reinstate": //by load plan reinstate
				if(ComIsEmpty(formObj.lp_no))
				{
					ComShowCodeMessage("COM0289", "Outbound Complete");
					return false;
				}
				break;
		}
	}
	return true;
}
function checkSaveCommon(div)
{
	var formObj=document.form;
	//--load plan 필수체크
	if(div == fix_by_loadplan &&  ComGetObjValue(formObj.lp_sts_cd)== "P" && $("#checkComplete").is(":checked") == true)
	{
		//OUTBOUND DT 체크
		if(ComIsEmpty($("#" + div + "_outbound_dt").val().trim())){
			ComShowCodeMessage("COM0114","Complete Date");
			$("#" + div + "_outbound_dt").focus();
			return false;
		}
		//CNTR/TR Type/No 체크
		if(ComIsEmpty($("#eq_no").val().trim())){
			ComShowCodeMessage("COM0114","CNTR/TR No");
			$("#eq_no").focus();
			return false;
		}
	}
	if(div == fix_by_loadplan)
	{
		//cntr/tr no
		if(ComGetLenByByte($("#eq_no").val().trim()) > 20)
		{
			ComShowCodeMessage("COM0215", "CNTR/TR No[20]");
			$("#eq_no").focus();
			return false;
		}
		seal_no_val="";
		for(var i=0; i<3; i++)
		{
			if($("#seal_no" + i).val().trim() != "")
			{
				if(seal_no_val == "")
				{
					seal_no_val=$("#seal_no" + i).val();
				}
				else
				{
					seal_no_val=seal_no_val + "," + $("#seal_no" + i).val();
				}
			}
		}
		if(ComGetLenByByte(seal_no_val) > 100)
		{
			ComShowCodeMessage("COM0215", "Seal No[100]");
			$("#seal_no0").focus();
			return false;
		}
	}
	//--공통
	if(ComGetLenByByte($("#" + div + "_custms_ref_no").val().trim()) > 30){
		ComShowCodeMessage("COM0215", "Customs Ref[30]");
		$("#" + div + "_custms_ref_no").focus();
		return false;
	}
	if(ComGetLenByByte($("#" + div + "_load_by").val().trim()) > 100){
		ComShowCodeMessage("COM0215", "Loading By[100]");
		$("#" + div + "_load_by").focus();
		return false;
	}
	if(ComGetLenByByte($("#" + div + "_rmk").val().trim()) > 1000){
		ComShowCodeMessage("COM0215", "Remark[1000]]");
		$("#" + div + "_rmk").focus();
		return false;
	}
	return true;
}
/*
 * Save 처리전 document 파라미터 생성
 */
function makeSaveDocInParam(div)
{
	//공통(bk, lp)
//	var tl_wo_document_info_header="Docin"; 
	
	// Khanh 4:49 18-7-2015
	var formObj=document.form;
	var tl_wo_document_info_header="";
	
	var load_by=tl_wo_document_info_header+"load_by="+$("#" + div + "_load_by").val();
	var load_hm_fr="&"+tl_wo_document_info_header+"load_hm_fr="+$("#" + div + "_load_hm_fr").val();
	var load_hm_to="&"+tl_wo_document_info_header+"load_hm_to="+$("#" + div + "_load_hm_to").val();
	var custms_ref_no="&"+tl_wo_document_info_header+"custms_ref_no="+$("#" + div + "_custms_ref_no").val();
	var rmk="&"+tl_wo_document_info_header+"rmk="+$("#" + div + "_rmk").val();
	var wh_cd="&"+tl_wo_document_info_header+"wh_cd="+$("#" + div + "_wh_cd").val();
	var docinParamter=load_by+load_hm_fr+load_hm_to+custms_ref_no+rmk+wh_cd;
	switch (div) 
	{
		case (fix_by_booking)://bk
			var wob_out_no="&"+tl_wo_document_info_header+"wob_out_no="+$("#wob_out_no").val();
			docinParamter=docinParamter + wob_out_no;
			break;
		case (fix_by_loadplan)://lp
			var lp_no="&"+tl_wo_document_info_header+"lp_no="+$("#lp_no").val();
			var consol_no="&"+tl_wo_document_info_header+"consol_no="+$("#consol_no").val();
			var lp_sts_cd="&"+tl_wo_document_info_header+"lp_sts_cd="+ComGetObjValue(formObj.lp_sts_cd);
			var gate_in_hm="&"+tl_wo_document_info_header+"gate_in_hm="+$("#lp_gate_in_hm").val();
			var gate_out_hm="&"+tl_wo_document_info_header+"gate_out_hm="+$("#lp_gate_out_hm").val();
			var lp_sts_complete_check_val="";
			var eq_no_val="";
			var seal_no_val="";
			var outbound_dt_val="";
			if(ComGetObjValue(formObj.lp_sts_cd)== "P")
			{
				eq_no_val=$("#eq_no").val();
				seal_no_val="";
				for(var i=0; i<3; i++)
				{
					if($("#seal_no" + i).val().trim() != "")
					{
						if(seal_no_val == "")
						{
							seal_no_val=$("#seal_no" + i).val();
						}
						else
						{
							seal_no_val=seal_no_val + "," + $("#seal_no" + i).val();
						}
					}
				}
				if($("#checkComplete").is(":checked") == true)
				{
					lp_sts_complete_check_val='L';
					outbound_dt_val=$("#lp_outbound_dt").val();
				}
			}
			var lp_sts_complete_check="&"+tl_wo_document_info_header+"lp_sts_complete_check="+lp_sts_complete_check_val;
			var eq_no="&"+tl_wo_document_info_header+"eq_no="+eq_no_val;
			var seal_no="&"+tl_wo_document_info_header+"seal_no="+seal_no_val;
			var outbound_dt="&"+tl_wo_document_info_header+"outbound_dt="+outbound_dt_val;
			docinParamter=docinParamter + lp_no + consol_no + lp_sts_cd + gate_in_hm + gate_out_hm + lp_sts_complete_check + eq_no + seal_no + outbound_dt;
			break;
	}
	return docinParamter;
}
/*
 * Cancel 처리전 document 파라미터 생성
 */
function makeCancelDocInParam(div)
{
	var tl_wo_document_info_header="";
	var wh_cd=tl_wo_document_info_header+"wh_cd="+$("#" + div + "_wh_cd").val();
	var docinParamter=wh_cd;
	switch (div) 
	{
		case (fix_by_booking)://bk
			var wob_out_no="&"+tl_wo_document_info_header+"wob_out_no="+$("#wob_out_no").val();
			docinParamter=docinParamter + wob_out_no;
			break;
		case (fix_by_loadplan)://bk
			var lp_no="&"+tl_wo_document_info_header+"lp_no="+$("#lp_no").val();
			docinParamter=docinParamter + lp_no;
			break;
	}
	return docinParamter;
}
/*
 * 이전 조회결과 reset
 */
function imNew(div, InputName) {	
	//공통 처리1) input field reset작업
	var arr=InputName.split("|");
	//input field reset
	for(var i=0; i < arr.length; i++)
	{
		$("#" + arr[i]).val("");
	}
	//공통 처리2) button disabled
	commonButtonChange(div, false);
	switch (div) 
	{
		case (fix_by_booking):
			docObjects[0].RemoveAll();
		break;
		case (fix_by_loadplan):
			//sheet
			docObjects[1].RemoveAll();
			//seal_no
			$("#seal_no0").val("");
			$("#seal_no1").val("");
			$("#seal_no2").val("");
			//status
			$("#lp_sts_cd")[0].index=0;
			var formObj=document.form;
			formObj.checkComplete.disabled=true; 
			$('#checkComplete').attr('checked',false);  // 체크박스가 체크되도록 한다.
			//sts에 따른 enable object change
			changeEnableObjectByLoadPlan(false);
			ComEnableObject(formObj.seal_no0, true);
			ComEnableObject(formObj.seal_no1, true);
			ComEnableObject(formObj.seal_no2, true);
			ComEnableObject(formObj.eq_no, true);
			//원본데이터 clear
			$("#lp_outbound_dt_org").val("");			
		break;
	}
}
/*
 * load plan 탭의 complete date의 enable속성을 변경
 */
function changeEnableObjectByLoadPlan(flg)
{
	var formObj=document.form;
	ComEnableObject(formObj.lp_outbound_dt, flg);
	if(flg == true){
		ComBtnEnable("btn_lp_outbound_dt");
	}else{
		ComBtnDisable("btn_lp_outbound_dt");
	}
}
/*
 * by booking, by load plan 공통으로 사용하는 버튼 enable 또는 disabled처리
 */
function commonButtonChange(div, flg)
{
	if(flg == true){
		ComBtnEnable("btn_save_" + div);
		ComBtnEnable("btn_cancel_" + div);
		ComBtnEnable("link_Print_" + div);
		ComBtnEnable("link_Work_Order_bk");
		ComBtnEnable("link_TruckFee_bk");
		ComBtnEnable("link_OthCost_bk");
	}else{
		ComBtnDisable("btn_save_" + div);
		ComBtnDisable("btn_cancel_" + div);
		ComBtnDisable("link_Svo_Freight_bk");
		ComBtnDisable("link_Print_" + div);
		ComBtnDisable("link_Work_Order_bk");
		ComBtnDisable("link_Work_Order_lp");
		ComBtnDisable("link_TruckFee_bk");
		ComBtnDisable("link_OthCost_bk");
	}
	if(div == fix_by_loadplan)
	{
		//btn_reinstate_lp 버튼 추가처리
		if(flg == true){
			ComBtnEnable("btn_reinstate_lp");
		}else{
			ComBtnDisable("btn_reinstate_lp");
		}
	}
}
/**
 * 마우스 아웃일때 
 */
function form_deactivate() {
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "in_wob_out_no":	//--complete no by booking
				btn_Search(fix_by_booking);
				break;
			case "in_wob_bk_no":	//--booking no by booking
				btn_Search(fix_by_booking);
				break;
			case "in_lp_no":	//--load plan no by load plan
				btn_Search(fix_by_loadplan);
				break;
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
function btn_link_lp()
{
	var formObj=document.form;
	if(!ComIsEmpty(formObj.consol_no)){
		var sUrl="./LoadPlanMgmt.clt?s_consol_no="+formObj.consol_no.value;
		parent.mkNewFrame('Loading Plan Management', sUrl, "LoadPlanMgmt_" + formObj.consol_no.value);
	}
}
/**
 * IN Booking No 링크 
 */
function btn_link_outbk() {
	var formObj=document.form;
	if (!ComIsEmpty(formObj.bk_wob_bk_no)) {
		var sUrl="./WHOutbkMgmt.clt?fwd_bk_no="+ComGetObjValue(formObj.bk_wob_bk_no);
		parent.mkNewFrame("Outbound Booking Management", sUrl, "WHOutbkMgmt_"+ComGetObjValue(formObj.bk_wob_bk_no));		
	}
}
function btn_link_ctrt(div){
	var formObj=document.form;
	var obj;
	if(div == fix_by_booking)
	{
		obj=formObj.bk_ctrt_no;
	}
	else
	{
		obj=formObj.lp_ctrt_no;
	}
	if(!ComIsEmpty(obj)){
		var sUrl="./CtrtMgmt.clt?ctrt_no="+obj.value;
		parent.mkNewFrame('Contract Management', sUrl, "CtrtMgmt_"+obj.value);
	}
}


function funcKGS_CBM_CAC(command, obj, obj2, sheetObj) {
	  var currow=0; 
	  currow=sheetObj.GetSelectRow();
	  if (command == "LB_KG") { // GWT / NWT
		  var lb_amt=(parseFloat(sheetObj.GetCellValue(currow, obj)) / CNVT_CNST_CBM_CFT);
		   lb_amt=lb_amt * 1000;
		   lb_amt=Math.round(lb_amt);
		   lb_amt=lb_amt / 1000;
		   sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	  } else if (command == "CBF_CBM") { // CBM
		  var lb_amt=(parseFloat(sheetObj.GetCellValue(currow, obj)) * 0.028317);
		   lb_amt=lb_amt * 1000;
		   lb_amt=Math.round(lb_amt);
		   lb_amt=lb_amt / 1000;
		   sheetObj.SetCellValue(currow, obj2,lb_amt,0);
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
	if(checkTimeStartEnd(objStart, objEnd) == false){
		ComShowCodeMessage('COM0049');
		objEnd.value = "";
		objEnd.focus();
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

function isValidNumberLength(value, realLen, pointCount){
	
	if(value == "") return true;
	
	if(value.split(".")[0].length > realLen) return false;
	
	return true;
}
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(div){
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
	//Outbound Booking Complete
	if(div == fix_by_booking){
		var warehouse = formObj.bk_wh_cd.value;
		for(var i = 0; i < arrwhcd_df.length; i ++){
			for(var j = 0; j < arrwhcd.length; j ++){
				if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
				countwd = countwd + 1;
				}
			}
		}
		if(countwd == 0){
			ComBtnDisable("btn_save_bk");
			ComBtnDisable("btn_cancel_bk");
			ComBtnDisable("link_TruckFee_bk");
			ComBtnDisable("link_OthCost_bk");
		}else{
			ComBtnEnable("btn_save_bk");
			ComBtnEnable("btn_cancel_bk");
			ComBtnEnable("link_TruckFee_bk");
			ComBtnEnable("link_OthCost_bk");
		}
	}else{
		var warehouse = formObj.lp_wh_cd.value;
		for(var i = 0; i < arrwhcd_df.length; i ++){
			for(var j = 0; j < arrwhcd.length; j ++){
				if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
				countwd = countwd + 1;
				}
			}
		}
		if(countwd == 0){
			ComBtnDisable("btn_save_lp");
			ComBtnDisable("btn_reinstate_lp");
			ComBtnDisable("btn_cancel_lp");
		}else{
			ComBtnEnable("btn_save_lp");
			ComBtnEnable("btn_reinstate_lp");
			ComBtnEnable("btn_cancel_lp");
		}
	}
}

/**
 * Merge Cell
 * @param Row
 */
function mergeCell(Row, tsheet, prefix){
	var sheetObj = tsheet;
	totalRowMerge = 0;
	startRow = 0;
	for(var i = Row ; i <= sheetObj.RowCount() + 1 ; i++){
		if(i == Row){
			getDataOri(i, tsheet, prefix);
			i++;
		}
		checkDataMerge(i, tsheet, prefix);
	}
}
function checkDataMerge(i, tsheet, prefix){
	getData(i, tsheet, prefix);
	if(		item_cd == item_cd_ori 
			&& item_nm == item_nm_ori
			&& item_pkgunit == item_pkgunit_ori 
			&& item_pkgqty == item_pkgqty_ori
			&& item_ea_qty == item_ea_qty_ori
			&& item_seq == item_seq_ori 
		){
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
		setMergeCell(startRow, totalRowMerge, tsheet);
		
		getDataOri(i, tsheet, prefix);
		
		startRow = 0;
		totalRowMerge = 0;
	}
	
	if(i == tsheet.RowCount() + 1){
		if(startRow != 0){
			if(totalRowMerge == 1){
				totalRowMerge++;
			}
			startRow = startRow - 1;
			setMergeCell(startRow, totalRowMerge, tsheet);
			startRow = 0;
			totalRowMerge = 0;
		}
	}
}
function getDataOri(i, tsheet, prefix){
	var prefix=prefix;
	var sheetObj = tsheet;
	item_cd_ori = sheetObj.GetCellValue(i, prefix+"item_cd");
	item_nm_ori = sheetObj.GetCellValue(i, prefix+"item_nm");
	item_seq_ori = sheetObj.GetCellValue(i, prefix+"item_seq");
	item_pkgunit_ori = sheetObj.GetCellValue(i, prefix+"item_pkgunit");
	item_pkgqty_ori = sheetObj.GetCellValue(i, prefix+"item_pkgqty");
	item_ea_qty_ori = sheetObj.GetCellValue(i, prefix+"item_ea_qty");


}
function getData(i, tsheet, prefix){
	var prefix=prefix;	
	var sheetObj = tsheet;
	item_cd = sheetObj.GetCellValue(i, prefix+"item_cd");
	item_nm = sheetObj.GetCellValue(i, prefix+"item_nm");
	item_seq = sheetObj.GetCellValue(i, prefix+"item_seq");
	item_pkgunit = sheetObj.GetCellValue(i, prefix+"item_pkgunit");
	item_pkgqty = sheetObj.GetCellValue(i, prefix+"item_pkgqty");
	item_ea_qty = sheetObj.GetCellValue(i, prefix+"item_ea_qty");
}
function setMergeCell(startRow, totalRowMerge, tsheet){
	var sheetObj = tsheet;
	sheetObj.SetMergeCell(startRow, 1, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 2, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 3, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 4, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 5, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 6, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 7, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 8, totalRowMerge, 1);
	sheetObj.SetMergeCell(startRow, 9, totalRowMerge, 1);
}