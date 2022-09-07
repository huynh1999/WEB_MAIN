var sheetCnt=0;
var sheetObjects=new Array();
//sheetObjects
var comboCnt=0;
var comboObjects=new Array();
var firCalFlag=false;
var check_flg="N";
var cnt=0;
var main_tree_name="";
var detail_ship_no="";
var detail_id_seq="";
var loading_flag="N";
var opener = window.dialogArguments;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	sheetObjects[sheetCnt++]=sheet_obj;
}
/**
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
 }
function loadPage() {
	if($("#wave_no").val().trim() == "")
	{
		ComClosePopup(); 
    	return;
	}
	//sheet
	for(var i=0;i<sheetObjects.length;i++){
		comConfigSheet(sheetObjects[i]);
		initSheet(sheetObjects[i],i+1);
		comEndConfigSheet(sheetObjects[i]);
	}
	/*//IBMultiCombo초기화
    for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }	*/
    //ComOpenWait(false);
    loading_flag="Y";
    //control
	initControl();
	// Print Size 세션값 세팅
	searchConsolInfo();
	
	
}
/*
 * initControl
 */
function initControl() {
	var formObject=document.form;
    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
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
	switch(comboObj.id) {
	case "print_size_tp":
		var val="A4|LT";
		vTextSplit=page_sizeText.split("|");
		vCodeSplit=val.split("|");				
		with(comboObj) {
			comboObj.SetDropHeight(125);
			for(var j=0;j<vCodeSplit.length; j++){
				InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.index=0;
    	} 			
		break;		
	}
}  
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendar();
            cal.select(formObj.load_dt, 'MM-dd-yyyy');
        break;
    }
}
/*
 * initSheet
 */
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){
		  var sht1_hrd1 = getLabel('LoadingPlanWavePopup_HDR1');
	      var hdr1="ibflag||tree_nodetype|tree_value|" +sht1_hrd1//Order No|Order No|SKU|Description|Item_lot|Qty|CBM|CBF|G.KGS|G.LBS|N.KBS|N.LBS|Lot ID|Inbound\nNo|Inbound\nDate|Expiration\nDate|Lot04|Lot05|Contract|Contract"
	      +  "|wob_bk_no|PO No(OUT)|sao_sys_no|po_sys_no|item_sys_no|shipno|shipno_seq|ship_no_seq|pc_ship_ltno|merge_yn|consol_no";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	      var headers = [ { Text:hdr1, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	             {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk" },
	             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:"tree_nodetype",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:"tree_value",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"tree_name",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   TreeCol:1 ,  LevelSaveName:"upperOrgId" },
	             {Type:"Image",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"image",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"item_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"item_lot",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"item_qty",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"item_cbm",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT,UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"item_cbf",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT,UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"item_grs_kgs",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_KGS_POINT,UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"item_grs_lbs",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_KGS_POINT,UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"item_net_kgs",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_KGS_POINT,UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"item_net_lbs",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_KGS_POINT,UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lot_id",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"wib_bk_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"inbound_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"exp_dt",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"lot_04",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"lot_05",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"ctrt_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"ctrt_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"wob_bk_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sao_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sao_sys_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"po_sys_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"item_sys_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"shipno",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"shipno_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"ship_no_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"pc_ship_ltno",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"merge_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"consol_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
	       
	      InitColumns(cols);

	      SetEditable(1);
	      SetCountPosition(0);
	      SetVisible(1);
	      SetImageList(1,"web/img/main/btn_s_delete.gif");
	      SetImageList(2,"");
	     // SetImageList(2,"web/images/common/btn_1_bg.gif");
	      SetImageList(3,"web/img/main/btn_s_merge.gif");
	      SetImageList(4,"web/img/main/btn_s_split.gif");
	      SetWaitImageVisible(0);
	      SetSheetHeight(230);
	        //    InitTreeInfo(4, "upperOrgId", "#0000FFNAN";
	      }
	      break;
		case "sheet2":      //IBSheet1 init
		    with(sheetObj){
	      var hdr1="||tree_nodetype|tree_value|tree_name|wob_bk_no|cust_ord_no|item_cd|item_nm|item_lot|p_item_ea_qty|load_item_ea_qty|lp_item_cbm|lp_item_cbf|lp_item_grs_kgs|lp_item_grs_lbs|lp_item_net_kgs|lp_item_net_lbs|lot_id"
	      + "|wib_bk_no|inbound_dt|exp_dt|lot04|lot05|ctrt_no|ctrt_nm|seal_no|eq_no" +
	      "|id|seq|id_seq|shipno|shipno_seq|so_no|sao_sys_no|po_sys_no|item_sys_no|wh_loc_cd" +
	      "|item_seq|sao_no|po_no|lp_status|lp_ship_ltno|lp_ship_seq_ltno|lp_old_id|lp_old_seq|lp_id|lp_seq|eq_tp_cd";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	      var headers = [ { Text:hdr1, Align:"Center"}];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"chk",               KeyField:0 },
	             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:"tree_nodetype",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:"tree_value",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:55,   Align:"Left",    ColMerge:1,   SaveName:"tree_name",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   TreeCol:1 ,  LevelSaveName:"upperOrgId" },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"wob_bk_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cust_ord_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"item_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"item_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"item_lot",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"lp_item_ea_qty",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"load_item_ea_qty",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"lp_item_cbm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:WMS_CBM_POINT,UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"lp_item_cbf",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:WMS_CBM_POINT,UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"lp_item_grs_kgs",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:WMS_KGS_POINT,UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"lp_item_grs_lbs",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:WMS_KGS_POINT,UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"lp_item_net_kgs",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:WMS_KGS_POINT,UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"lp_item_net_lbs",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:WMS_KGS_POINT,UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"lot_id",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"wib_bk_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"inbound_dt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"exp_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"lot_04",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"lot_05",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"ctrt_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"ctrt_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"seal_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"eq_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"id",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"seq",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"id_seq",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"shipno",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"shipno_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"so_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"sao_sys_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"po_sys_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"item_sys_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"wh_loc_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"item_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"sao_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"po_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lp_status",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lp_ship_ltno",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lp_ship_seq_ltno",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lp_old_id",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lp_old_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lp_id",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lp_seq",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"eq_tp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetEditable(0);
	      SetVisible(1);
	      SetCountPosition(0);
	      SetWaitImageVisible(0);
	      SetRowHidden(0, 1);
	      SetSheetHeight(190);
	     // InitTreeInfo(4, "upperOrgId", "#0000FFNAN";
	      }
	      break;


	}
}
function searchConsolInfo()
{
	doShowProcess();
	var formObj=document.form;
	var sheetObj=sheet1;
	if(loading_flag != "Y"){
		return;
	}
	//================================================
	//CONSOL등록
	//================================================
	formObj.f_cmd.value = MULTI;
 	var saveXml=sheetObj.GetSaveData("saveConsolInfoWaveSimpleGS.clt", FormQueryString(formObj,""));
 	sheetObj.LoadSaveData(saveXml);
	if( saveXml.indexOf('<ERROR>') > -1){
		alert(sXml);
		doHideProcess();
		return;
	}
	var xmlDoc = $.parseXML(saveXml);
	var $xml = $(xmlDoc);
	var ret_consol_no=$xml.find("consol_no").text();
	if(ret_consol_no == "" && $("#consol_no").val().trim() == "")
	{
		doHideProcess();
		return;
	}
	$("#consol_no").val(ret_consol_no);
	//ComOpenWait(true);
	searchConsolInfoAjax();
}
function set_btn(setup){
	if(setup == "S"){		
		ComEnableObject(document.form.btn_Cancel, false);
		ComEnableObject(document.form.btn_Add, false);
		ComEnableObject(document.form.btn_Del, false);
		ComEnableObject(document.form.btn_App_Clp_no, false);
		ComEnableObject(document.form.btn_Down, false);
		ComEnableObject(document.form.btn_Up, false);
	} else {
		ComEnableObject(document.form.btn_Cancel, true);
		ComEnableObject(document.form.btn_Add, true);
		ComEnableObject(document.form.btn_Del, true);
		ComEnableObject(document.form.btn_App_Clp_no, true);
		ComEnableObject(document.form.btn_Down, true);
		ComEnableObject(document.form.btn_Up, true);
	}
	check_authority_wh(); // check authority warehouse
}
function searchConsolInfoAjax()
{
	opener.setLoadingPlan();
	var formObj=document.form;
	var parm=FormQueryString(formObj,"");
	//================================================
	//조회
	//================================================
	//sheet1 lp shipment 조회
	/*$.ajax({
		url : "searchLPShipmentListWaveSimpleGS.clt?"+parm,
		success : function(result) {
			ShipmentList_Load(result.xml);
		},
		error : function(result){
			alert("searchLPShipmentListWaveSimple Error");
			ComOpenWait(false);
		}
	});*/
	var sXml = "";
	formObj.f_cmd.value = SEARCH01;
	var parm=FormQueryString(formObj,"");
	sXml=sheetObjects[0].GetSearchData("./searchLPShipmentListWaveSimpleGS.clt",parm);
	ShipmentList_Load(sXml);
	
	
	//sheet2 container 조회
	/*$.ajax({
		url : "searchLPCNTRParentListWaveSimple.do?"+parm,
		success : function(result) {
			CNTRParentList_Load(result.xml);
		},
		error : function(result){
			alert("searchLPCNTRParentListWaveSimple Error");
			ComOpenWait(false);
		}
	});*/
	sXml = "";
	formObj.f_cmd.value = SEARCH02;
	var parm=FormQueryString(formObj,"");
	sXml=sheetObjects[0].GetSearchData("./searchLPCNTRParentListWaveSimpleGS.clt",parm);
	CNTRParentList_Load(sXml);
	
	//Volumn정보
	/*$.ajax({
		url : "searchLPVolumeWaveSimple.do?"+parm,
		success : function(result) {
			Volume_Load(result.xml);
		},
		error : function(result){
			alert("searchLPVolumeWaveSimple Error");
			ComOpenWait(false);
		}
	});	*/
	sXml = "";
	formObj.f_cmd.value = SEARCH03;
	var parm=FormQueryString(formObj,"");
	sXml=sheetObjects[0].GetSearchData("./searchLPVolumeWaveSimpleGS.clt",parm);
	Volume_Load(sXml);
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
/*function processButtonClick(){
	*//***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****//*
	*//*******************************************************//*
	var formObj=document.form;
	try {
		var srcName=ComGetEvent("name"); 			
		switch(srcName) {
			case "btn_cntr_tp":	
				var code="A";
				if($("#eq_tp_cd").val().trim() != "")
				{
					code=$("#eq_tp_cd").val().trim();
				}
				var sUrl="ContainerTypePopup.do?type="+code+"&eq_unit="+formObj.cntr_tp.value;
				ComOpenPopup(sUrl, 400, 600, "setContainerTypeInfo", "0,0", true);
				break;
			case "btn_seal_no":
				if($("#seal_no_edit").val() == "Y"){
					btn_seal();	
				}
 				break;
		} // end switch
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}*/
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
//		var cal=new ComCalendar();
		switch(srcName) {
			case "DELETE":	
				btn_Delete();
				break;
			case "SAVE":	
				btn_Save();
				break;
			case "PRINT":	
				btn_Print();
				break;
			case "CLOSE":
				btn_Close();
					break;
			case "btn_seal_no":
				if($("#seal_no_edit").val() == "Y"){
					btn_seal();	
				}
 				break;
			case "btn_cntr_tp" :
				var code="A";
				if($("#eq_tp_cd").val().trim() != "")
				{
					code=$("#eq_tp_cd").val().trim();
				}
				var sUrl="ContainerTypePopup.clt?type="+code+"&eq_unit="+formObj.cntr_tp.value;
				callBackFunc ="setContainerTypeInfo";
				modal_center_open(sUrl, callBackFunc, 400, 600,"yes");
				break;
			case "btn_Down":
				btn_Down();
				break;
			case "btn_Up":
				btn_Up();
				break;
			case "btn_Add":
				btn_Add();
				break;
			case "btn_Del":
				btn_Del();
				break;
			case "btn_Save":
				btn_Save();
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
function setContainerTypeInfo(rtnVal){
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#cntr_tp").val(rtnValAry[0]);
		$("#eq_tp_cd").val(rtnValAry[2]);
		formObj.eq_no.focus();
	}
}
function getEq_tp_cd(obj){
	var formObj=document.form;
	var sParam="cntr_tp="+obj.value;
	/*$.ajax({
		url : "searchCntrTrTp.do?"+sParam,
		success : function(result) {
			formObj.eq_tp_cd.value=getXmlDataNullToNullString(result.xml,'type');	
			obj.value=getXmlDataNullToNullString(result.xml,'eq_unit');	
			if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				obj.focus();
			}
		}
	});*/
	ajaxSendPost(Eq_tp_cd_rtn, 'reqVal', '&goWhere=aj&bcKey=searchCntrTrTp&'+sParam, './GateServlet.gsl');
}
function Eq_tp_cd_rtn(reqVal)
{
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    //formObj.eq_tp_cd.value=rtnArr[2];
	    formObj.cntr_tp.value=rtnArr[0];
	   }
	   else{
	    //formObj.eq_tp_cd.value="";
	    formObj.cntr_tp.value=""; 
	   }
	  }
	  else{
	   //formObj.eq_tp_cd.value="";
	   formObj.cntr_tp.value=""; 
	  }
	 }
	 else{
		 //formObj.eq_tp_cd.value="";
		 formObj.cntr_tp.value=""; 	
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
		objEnd.value='';
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
/**
 * Close
 */
function btn_Close() {
  ComClosePopup(); 
}
function btn_seal(){
	var formObj=document.form;
	if (document.all.showseal.style.display == "none") {
		document.all.showseal.style.display="block";
		document.all.showseal.style.visibility='visible';
		var seal_no=formObj.seal_no.value.split(",");
		if(seal_no[0] != undefined && seal_no[0] != ""){
			formObj.seal_no1.value=seal_no[0];
		}
		if(seal_no[1] != undefined && seal_no[1] != ""){
			formObj.seal_no2.value=seal_no[1];
		}
		if(seal_no[2] != undefined && seal_no[2] != ""){
			formObj.seal_no3.value=seal_no[2];
		}
		formObj.seal_no1.focus();
	}
}
function btn_seal_OK(){
	var formObj=document.form;
	var seal_no="";
	if(formObj.seal_no1.value != ""){
		seal_no += formObj.seal_no1.value;
	}
	if(formObj.seal_no2.value != ""){
		seal_no += ","+formObj.seal_no2.value;
	}
	if(formObj.seal_no3.value != ""){
		seal_no += ","+formObj.seal_no3.value;
	}
	formObj.seal_no.value=seal_no;
	document.all.showseal.style.display="none";
	document.all.showseal.style.visibility='hidden';
}
function btn_seal_Close(){
	document.all.showseal.style.display="none";
	document.all.showseal.style.visibility='hidden';
}
function ShipmentList_Load(resultXml){
	var i=0;
	sheetObjects[0].LoadSearchData(resultXml,{Sync:1} );
	sheetObjects[0].ShowTreeLevel(0,1);
	for(i=0;i<sheetObjects[0].RowCount()+1;i++){
		if(sheetObjects[0].GetCellValue(i,"tree_nodetype")=="3"){
 			sheetObjects[0].SetCellImage(i,"image",2);
		} else if(sheetObjects[0].GetCellValue(i,"tree_nodetype")=="4"){
			if (sheetObjects[0].GetCellValue(i,"merge_yn") == "Y"){
 				sheetObjects[0].SetCellImage(i,"image",3);
			} else {
 				sheetObjects[0].SetCellImage(i,"image",2);
			}
		} else if(sheetObjects[0].GetCellValue(i,"tree_nodetype")=="5"){
 			sheetObjects[0].SetCellImage(i,"image",4);
		} else if(sheetObjects[0].GetCellValue(i,"tree_nodetype")=="1"){
 			sheetObjects[0].SetCellImage(i,"image",1);
		} else{
 			sheetObjects[0].SetCellImage(i,"image","");
		}
	}
	if( sheetObjects[0].RowCount() == 1 ){
		sheetObjects[0].RowDelete(1, false);
	}
	cnt=cnt+1;
	if(cnt==3){
		doHideProcess();
	}
	main_tree_search();
}
function main_tree_search(){
	var formObj=document.form;
	if(main_tree_name != ""){
		var row_0=sheetObjects[0].FindText("tree_name", main_tree_name);
		if(row_0 != -1 ){
			for(;;){
				if( sheetObjects[0].GetCellValue(row_0,"tree_nodetype") =='1' ){
					sheetObjects[0].SetRowExpanded(row_0,1);
					break;
				}
				sheetObjects[0].SetRowExpanded(row_0,1);
				row_0=sheet1_FindParent(sheetObjects[0], row_0);
			}
		}
		main_tree_name="";
	}
}

function CNTRParentList_Load(resultXml){
	var row=0;
	var i=0
	sheetObjects[1].LoadSearchData(resultXml,{Sync:1} );
	sheetObjects[1].ShowTreeLevel(0, 1);
	for (i=0;i<sheetObjects[1].RowCount()+1;i++){
		row=sheetObjects[1].FindText(5, "Booking No", i+1,-1);
		if( row != -1){
			sheetObjects[1].SetRowBackColor(row,"#CEE3E9");
			sheetObjects[1].SetRowFontColor(row,"#2F2D77");
			i=row;
		}else{
			break;
		}
	}
	for (i=0;i<sheetObjects[1].RowCount()+1;i++){
		row=sheetObjects[1].FindText(2, "1", i+1,-1);
		if( row != -1){
			sheetObjects[1].SetRowBackColor(row,"#CEE3E9");
			sheetObjects[1].SetRowFontColor(row,"#2F2D77");
 			sheetObjects[1].SetCellFontColor(row,"po_no","#0100FF");
 			sheetObjects[1].SetCellFontUnderline(row, "po_no", 1);
			i=row;
		}else{
			break;
		}
	}
	for (i=0;i<sheetObjects[1].RowCount()+1;i++){
if (ComIsEmpty(sheetObjects[1].GetCellValue(i,"tree_nodetype")) ){
			sheetObjects[1].RowDelete(i, false);
		}
	}
	//set_btn("E");
	cnt=cnt+1;
	if(cnt==3){
		doHideProcess();
	}
	detail_tree_search();
}
function detail_tree_search(){
	var formObj=document.form;
	var sheetObj = sheet2;
	if(detail_ship_no != ""){
		var row_1=sheetObjects[1].FindText("shipno", detail_ship_no);
		if(row_1 != -1 ){
			row_1=sheet1_FindParent(sheetObjects[1], row_1);
			sheetObjects[1].SetRowExpanded(row_1,1);
		}
		detail_ship_no="";
	}
	if(detail_id_seq != ""){
		var row_1=sheetObjects[1].FindText("id_seq", detail_id_seq);
		if(row_1 != -1 ){
			sheetObjects[1].SetRowExpanded(row_1,1);
		}
		detail_id_seq="";
	}
	$("#eq_no").val("");
	$("#seal_no").val("");
	$("#seal_no_edit").val("");
	$("#eq_no_edit").val("");
	if($("#eq_tpsz_cd_edit").val() == "Y")
	{
		$("#eq_tpsz_cd_edit").val("");
		$("#cntr_tp").val("");
	}
	$("#sel_lp_id").val("");
	$("#sel_lp_seq").val("");
	if(sheetObj.RowCount()== 0)
	{
		ComEnableObject(formObj.eq_no, false);
		ComEnableObject(formObj.seal_no, false);
	}
	else
	{
		sheet2_OnClick(sheetObj, sheetObj.HeaderRows(), null, null);
	}
}
/*function detail_tree_search(){
	var formObj=document.form;
	var sheetObj=sheet2;
	if(detail_ship_no != ""){
		var row_1=sheetObj.FindText("shipno", detail_ship_no);
		if(row_1 != -1 ){
			row_1=sheetObj.FindParent(row_1);
			sheetObj.SetRowExpanded(row_1,1);
		}
		detail_ship_no="";
	}
	if(detail_id_seq != ""){
		var row_1=sheetObj.FindText("id_seq", detail_id_seq);
		if(row_1 != -1 ){
			sheetObj.SetRowExpanded(row_1,1);
		}
		detail_id_seq="";
	}
	$("#eq_no").val("");
	$("#seal_no").val("");
	$("#seal_no_edit").val("");
	$("#eq_no_edit").val("");
	if($("#eq_tpsz_cd_edit").val() == "Y")
	{
		$("#eq_tpsz_cd_edit").val("");
		$("#cntr_tp").val("");
	}
	$("#sel_lp_id").val("");
	$("#sel_lp_seq").val("");
	if(sheetObj.RowCount()== 0)
	{
		ComEnableObject(formObj.eq_no, false);
		ComEnableObject(formObj.seal_no, false);
	}
	else
	{
		sheet2_OnClick(sheetObj, sheetObj.HeaderRows(), null, null);
	}
}*/
function sheet2_OnClick(sheetObj, Row, Col, Value) {
	var formObj=document.form;
	if(sheetObj.GetCellValue(Row, "id").trim() == "EQ")
	{
		$("#eq_tpsz_cd_edit").val("Y");
		$("#cntr_tp").val(sheetObj.GetCellValue(Row, "id").trim());
	}
	else
	{
		$("#eq_tpsz_cd_edit").val("");
		$("#cntr_tp").val("");
	}
	if(sheetObj.GetCellValue(Row, "eq_no").trim() == "")
	{
		ComEnableObject(formObj.eq_no, true);
		$("#eq_no_edit").val("Y");
	}
	else
	{
		ComEnableObject(formObj.eq_no, false);
		$("#eq_no_edit").val("");
	}
	if(sheetObj.GetCellValue(Row, "seal_no").trim() == "")
	{
		ComEnableObject(formObj.seal_no, true);
		$("#seal_no_edit").val("Y");
	}
	else
	{
		ComEnableObject(formObj.seal_no, false);
		$("#seal_no_edit").val("");
	}
	//$("#eq_no").val(sheetObj.CellValue(Row, "eq_no").trim());
	//$("#seal_no").val(sheetObj.CellValue(Row, "seal_no").trim() );
	$("#sel_lp_id").val(sheetObj.GetCellValue(Row, "id").trim());
	$("#sel_lp_seq").val(sheetObj.GetCellValue(Row, "seq").trim());
}
/*function Volume_Load(resultXml){
	var formObj=document.form;
	formObj.ttl_qty.value=ComAddComma(getXmlDataNullToNullString(resultXml,'ttl_item_ea_qty'),"#,##0");
	formObj.ttl_cbm.value=ComAddComma2(getXmlDataNullToNullString(resultXml,'ttl_item_cbm'),"#,##0.000");
	formObj.ttl_grs_kgs.value=ComAddComma2(getXmlDataNullToNullString(resultXml,'ttl_item_grs_kgs'),"#,##0.000");
	formObj.ttl_net_kgs.value=ComAddComma2(getXmlDataNullToNullString(resultXml,'ttl_item_net_kgs'),"#,##0.000");
	//formObj.consol_no.value = getXmlDataNullToNullString(resultXml,'consol_no');
	formObj.loading_qty.value=ComAddComma(getXmlDataNullToNullString(resultXml,'loading_item_ea_qty'),"#,##0");
	formObj.loading_cbm.value=ComAddComma2(getXmlDataNullToNullString(resultXml,'loading_item_cbm'),"#,##0.000");
	formObj.loading_grs_kgs.value=ComAddComma2(getXmlDataNullToNullString(resultXml,'loading_item_grs_kgs'),"#,##0.000");
	formObj.loading_net_kgs.value=ComAddComma2(getXmlDataNullToNullString(resultXml,'loading_item_net_kgs'),"#,##0.000");
	cnt=cnt+1;
	if(cnt==3){
		ComOpenWait(false);
	}
}*/
function Volume_Load(resultXml){
	var formObj=document.form;
	var xmlDoc = $.parseXML(resultXml);
	var $xml = $(xmlDoc);
	formObj.ttl_qty.value= $xml.find("ttl_item_ea_qty").text();
	formObj.ttl_cbm.value= $xml.find("ttl_item_cbm").text();
	formObj.ttl_grs_kgs.value= $xml.find("ttl_item_grs_kgs").text();
	formObj.ttl_net_kgs.value= $xml.find("ttl_item_net_kgs").text();
	//formObj.f_consol_no.value= $xml.find("f_consol_no").text();
	formObj.loading_qty.value= $xml.find("loading_item_ea_qty").text();
	formObj.loading_cbm.value= $xml.find("loading_item_cbm").text();
	formObj.loading_grs_kgs.value= $xml.find("loading_item_grs_kgs").text();
	formObj.loading_net_kgs.value= $xml.find("loading_item_net_kgs").text();
	cnt=cnt+1;
	if(cnt==3){
		doHideProcess();
	}
}
function btn_Down() {
	var formObj = document.form;
	var i = 0;
	var sRowStr = sheet2.GetSelectionRows("|");
	var id = '';
	var seq = '';
	var saveXml = '';
	var sParam = '';
	var row_0 = 0;
	if (sheet1.CheckedRows("chk") < 1) {
		ComShowCodeMessage("COM0228");
		return;
	}
	
	// 자바 스크립트 배열로 만들기
	var arr = sRowStr.split("|");
	if (arr.length > 1) {
		return;
	}
	if (sheet2.GetCellValue(arr[0], 'tree_nodetype') == '1') {
		id = sheet2.GetCellValue(arr[0], 'id');
		seq = sheet2.GetCellValue(arr[0], 'seq');
		clp_no = sheet2.GetCellValue(arr[0], 'po_no');
	} else {
		i = arr[0];
		for (;;) {
			i--;
			if (sheet2.GetCellValue(i, 'tree_nodetype') == '1') {
				id = sheet2.GetCellValue(i, 'id');
				seq = sheet2.GetCellValue(i, 'seq');
				clp_no = sheet2.GetCellValue(i, 'po_no');
				break;
			}
			if (i < 0)
				break;
		}
	}
	if (i < 0)
		return;
	for (i = 1; i < sheet1.RowCount() + 1; i++) {
		if (sheet1.GetCellValue(i, 'chk') == 1
				&& sheet1.GetCellValue(i, 'tree_nodetype') == '5') {
			detail_ship_no = sheet1.GetCellValue(i, 'shipno');
			row_0 = sheet1.FindText("tree_name", sheet1
					.GetCellValue(i, 'tree_name'));
			formObj.f_cmd.value = MODIFY03;
			sParam = FormQueryString(formObj, "");
			sParam = sParam + "&id=" + id + "&seq=" + seq + "&shipno="
					+ sheet1.GetCellValue(i, 'shipno')
					+ "&shipno_seq="
					+ sheet1.GetCellValue(i, 'shipno_seq')
					+ "&consol_no="
					+ sheet1.GetCellValue(i, 'consol_no');
			doShowProcess(true);
			saveXml=sheet1.GetSaveData("modifyLPDownShipmentWaveSimpleGS.clt", sParam);
			doHideProcess();
			main_tree_name = sheet1.GetCellValue(sheet1_FindParent(sheet1, row_0), 'tree_name');
			
			var xmlDoc = $.parseXML(saveXml);
			var $xml = $(xmlDoc);
			if ($xml.find("res").text() == "Y") {
			} else {
				ComShowMessage($xml.find("message").text())
				searchConsolInfoAjax();
				return;
			}
		}
	}
	searchConsolInfoAjax();
}
function sheet1_FindParent(sheetObj, row){
	var prefix="";
	var Row1=0;
	var chek="N";
	for(var i=row-1;i>=1;i--){
		if ( chek == "N"){
			if ( sheetObj.GetCellValue(i,prefix+"tree_nodetype") < sheetObj.GetCellValue(row,prefix+"tree_nodetype")){
				Row1=i;
				break;
			} else {
				if ( sheetObj.GetCellValue(i,prefix+"tree_nodetype") == sheetObj.GetCellValue(row,prefix+"tree_nodetype")){
					chek="Y";
					Row1=i;
				} else {
					chek="Y";
					Row1=i;
				}
			}
		}
	}
	return Row1;
}
/*function sheet1_FindParent(sheetObj, row){
	var prefix="";
	var Row1=0;
	var chek="N";
	for(var i=row-1;i>=1;i--){
		if ( chek == "N"){
			if ( sheetObj.GetCellValue(i,prefix+"tree_nodetype") < sheetObj.GetCellValue(row,prefix+"tree_nodetype")){
				Row1=i;
				break;
			} else {
				if ( sheetObj.GetCellValue(i,prefix+"tree_nodetype") == sheetObj.GetCellValue(row,prefix+"tree_nodetype")){
					chek="Y";
					Row1=i;
				} else {
					chek="Y";
					Row1=i;
				}
			}
		}
	}
	return Row1;
}*/
function btn_Up() {
	var formObj = document.form;
	var i = 0;
	var sParam = "";
	var saveXml = "";
	var cnt = 0;
	var parent_row = 0;
	var clp_no = "";
	var sRowStr = sheet2.GetSelectionRows("|");
	// 자바 스크립트 배열로 만들기
	var arr = sRowStr.split("|");
	for (i = 0; i < arr.length; i++) {
		if (sheet2.GetCellValue(arr[i], 'tree_nodetype') == '1') {
			return false;
		}
	}
	i = arr[0];
	for (;;) {
		i--;
		if (sheet2.GetCellValue(i, 'tree_nodetype') == '1') {
			clp_no = sheet2.GetCellValue(i, 'po_no');
			break;
		}
		if (i < 0)
			break;
	}
	var id = "";
	var seq = "";
	var shipno = "";
	var shipno_seq = "";
	var consol_no = "";
	for (i = 0; i < arr.length; i++) {
		id = sheet2.GetCellValue(arr[i], 'id');
		seq = sheet2.GetCellValue(arr[i], 'seq');
		shipno = sheet2.GetCellValue(arr[i], 'shipno');
		shipno_seq = sheet2.GetCellValue(arr[i], 'shipno_seq');
		consol_no = sheet2.GetCellValue(arr[i], 'consol_no');
		if (!ComIsEmpty(shipno)) {
			parent_row = sheet1_FindParent(sheet2, arr[i]);
			formObj.f_cmd.value = MODIFY04;
			sParam = "";
			sParam = FormQueryString(formObj, "");
			doShowProcess(true);
			sParam = sParam + "&id=" + id + "&seq=" + seq + "&shipno=" + shipno
					+ "&shipno_seq=" + shipno_seq + "&consol_no=" + consol_no;

			saveXml=sheet2.GetSaveData("modifyLPUpShipmentWaveSimpleGS.clt", sParam);
			sheet2.SetCellValue(arr[i], 'chk', "D");
			main_tree_name = shipno;
			detail_id_seq = sheet2.GetCellValue(parent_row, 'id_seq');
			var xmlDoc = $.parseXML(saveXml);
			var $xml = $(xmlDoc);
			
			if ($xml.find("res").text() == "1") {
			} else {
				ComShowMessage($xml.find("message").text());
				up_search();
				return;
			}
		}else{
			ComShowMessage("Nothing item to select.");
			return;
		}
	}
	up_search();
}
function up_search() {
	
	opener.setLoadingPlan();
	
	var formObj = document.form;
	var i = 0;
	var sParam = "";
	var saveXml = "";
	var cnt = 0;
	var parent_row = 0;
	var sRowStr = sheet2.GetSelectionRows("|");
	// 자바 스크립트 배열로 만들기
	var arr = sRowStr.split("|");
	var shipno = "";
	for (i = arr.length - 1; i >= 0; i--) {
		shipno = sheet2.GetCellValue(arr[i], 'shipno');
		if (!ComIsEmpty(shipno)) {
			sheet2.RowDelete(arr[i], false);
			cnt = cnt + 1;
		}
	}
	/*$.ajax({
		url : "searchLPCNTRParentListWaveSimple.do?"
				+ FormQueryString(formObj, ""),
		success : function(result) {
			CNTRParentList_Load(result.xml);
		}
	});*/
	var sXml = "";
	formObj.f_cmd.value = SEARCH02;
	sXml=sheetObjects[0].GetSearchData("./searchLPCNTRParentListWaveSimpleGS.clt?"+FormQueryString(formObj,""));
	CNTRParentList_Load(sXml);
	
	/*$.ajax({
		url : "searchLPVolumeWaveSimple.do?" + FormQueryString(formObj, ""),
		success : function(result) {
			Volume_Load(result.xml);
		}
	});*/
	sXml = "";
	formObj.f_cmd.value = SEARCH03;
	sXml=sheetObjects[0].GetSearchData("searchLPVolumeWaveSimpleGS.clt?"+FormQueryString(formObj,""));
	Volume_Load(sXml);
	
	var tree_name = sheet1.GetCellValue(
			sheet1.GetSelectRow(), 'tree_name');
	if (cnt != 0) {
		formObj.f_cmd.value = SEARCH01;
 		var sXml=sheetObjects[0].GetSearchData("./searchLPShipmentListWaveSimpleGS.clt", FormQueryString(formObj,""));
 		sheetObjects[0].LoadSearchData(sXml,{Sync:1} );
 		sheetObjects[0].ShowTreeLevel(0, 1);
		main_tree_search();
		for (i = 0; i < sheet1.RowCount() + 1; i++) {
			if (sheet1.GetCellValue(i, "tree_nodetype") == "3") {
				sheet1.SetCellImage(i,"image",2);
			} else if (sheet1.GetCellValue(i, "tree_nodetype") == "4") {
				if (sheet1.GetCellValue(i, "merge_yn") == "Y") {
					sheet1.SetCellImage(i,"image",3);
				} else {
					 sheet1.SetCellImage(i,"image",2);
				}
			} else if (sheet1.GetCellValue(i, "tree_nodetype") == "5") {
				 sheet1.SetCellImage(i,"image",4);
			} else if (sheet1.GetCellValue(i, "tree_nodetype") == "1") {
				 sheet1.SetCellImage(i,"image",1);
			} else {
			 	 sheet1.SetCellImage(i,"image","");
			}
		}
	}
	doHideProcess();
}
function btn_Add() {
	var formObj = document.form;
	var sParam = "";
	var saveXml = "";
	if (validateForm(sheet2, formObj, "Add")) {
		if (ComIsEmpty(formObj.lp_id_cnt))
			formObj.lp_id_cnt.value = 1;
		// if (ComShowCodeConfirm("COM0038")){
		formObj.f_cmd.value = MODIFY01;
		sParam = FormQueryString(formObj, "");
		saveXml=sheet2.GetSaveData("addLPCntrWaveSimpleGS.clt", sParam);
		sheet2.LoadSaveData(saveXml);
		
		opener.setLoadingPlan();
		
		// 1. Save 후 조회
		var xmlDoc = $.parseXML(saveXml);
		var $xml = $(xmlDoc);
		if($xml.find("res").text() == "1"){
			showCompleteProcess();
			
			var sXml="";
			formObj.f_cmd.value = SEARCH03;
			sParam=FormQueryString(formObj, "");	
			sXml=sheetObjects[0].GetSearchData("./searchLPVolumeWaveSimpleGS.clt?"+sParam);
			Volume_Load(sXml);
			
			sXml="";
			formObj.f_cmd.value = SEARCH02;
			sParam=FormQueryString(formObj, "");	
				sXml=sheetObjects[1].GetSearchData("./searchLPCNTRParentListWaveSimpleGS.clt", sParam);
			CNTRParentList_Load(sXml);
			formObj.lp_id.value="";
		}
	}
}
function btn_Del() {
	var formObj = document.form;
	var sParam = "";
	var saveXml = "";
	if (validateForm(sheet2, formObj, "Del")) {
		if (ComShowCodeConfirm("COM0051")) {
			var sRowStr = sheet2.GetSelectionRows("|");
			var arr = sRowStr.split("|");
			formObj.f_cmd.value = MODIFY02;
			sParam = "consol_no=" + formObj.consol_no.value + "&eq_tp_cd="
					+ sheet2.GetCellValue(arr[0], "eq_tp_cd")
					+ "&lp_id=" + sheet2.GetCellValue(arr[0], "lp_id")
					+ "&lp_seq="
					+ sheet2.GetCellValue(arr[0], "lp_seq")
					+ "&user_id=" + formObj.user_id.value + "&org_cd="
					+ formObj.org_cd.value;
			saveXml=sheet2.GetSaveData("removeLPCntrWaveSimpleGS.clt", sParam+"&f_cmd="+formObj.f_cmd.value);
			sheet2.LoadSaveData(saveXml);
			var xmlDoc = $.parseXML(saveXml);
			var $xml = $(xmlDoc);
			// 1. Save 후 조회
			if ($xml.find("res").text() == "1") {
				showCompleteProcess();
				searchConsolInfoAjax();
			}else
	    	{
	    		ComShowMessage($xml.find("message").text());
	    	}
		}
	}
}
function btn_Delete() {
	var formObj = document.form;
	var sParam = '';
	if (!ComIsEmpty(formObj.consol_no.value)) {
		if (ComShowCodeConfirm("COM0011")) {
			doShowProcess(true);
			formObj.f_cmd.value = MODIFY;
			sParam = FormQueryString(formObj, "");
			sXml=sheet1.GetSaveData("cancelLoadPlanWaveSimpleGS.clt", sParam);
		
			var xmlDoc = $.parseXML(sXml);
			var $xml = $(xmlDoc);
			sheet1.LoadSaveData(sXml);
			// 1. Save 후 조회
			if ($xml.find("res").text() == "1") {
				showCompleteProcess();
				opener.setLoadingPlan();
				ComClosePopup();
			}
		}
	}
}
function sheet1_OnClick(sheetObj, Row, Col, Value) {
	var formObj = document.form;
	var colName = sheetObj.ColSaveName(Col);
	var sXml = "";
	var sParam = "";
	var i1 = 0;
	var i2 = 0;
	var node1_cnt = 0;
	var node2_cnt = 0;
	var col = Col;
	var row = Row;
	if (col == 1){
		if (sheetObj.GetCellValue(row,"chk")!=1){
			sheetObj.SetCellValue(row, "chk", 1, 0);
			sheetObj.SetRowFontColor(row,"#00B400");
		} else {
			sheetObj.SetCellValue(row, "chk", 0, 0);
			sheetObj.SetRowFontColor(row,"#000000");
		}
		if ( check_flg == "N" ){
			check_flg="Y";
			sheet1_Check(sheetObj, row);
		}
	}
	if (colName == "image") {
		// Delete
		if (sheetObj.GetCellValue(Row, "tree_nodetype") == '1') {
			// if ( sheetObj.CellValue(Row,"merge_yn") == "0" ||
			// sheetObj.CellValue(Row,"merge_yn") == "999" ){
			if (sheetObj.GetCellValue(Row, "tree_nodetype") == '1') {
				sParam = "consol_no=" + formObj.consol_no.value + "&wob_bk_no="
						+ sheetObj.GetCellValue(Row, "wob_bk_no"); // TODO :
																	// MJY
				for (;;) {
					i1 = sheet1.FindText('tree_nodetype', '1', i1 + 1);
					if (i1 == -1) {
						break;
					} else {
						node1_cnt = node1_cnt + 1;
					}
				}
				if (node1_cnt == 1) {
					ComShowCodeMessage("COM0262");
					return false;
				}
			}
			if (ComShowCodeConfirm("COM0052") == false) {
				return;
			}
			formObj.f_cmd.value = MODIFY06;
			sXml=sheet1.GetSaveData("delLPShipmentWaveSimpleGS.clt", sParam+"&f_cmd="+formObj.f_cmd.value);
			var rtncd = getXmlDataNullToNullString(sXml, "rtncd");
			var rtnmsg = getXmlDataNullToNullString(sXml, "rtnmsg");
			// 1. Save 후 조회
			if (rtncd != "N") {
				ComShowCodeMessage("COM0093", "");
				searchConsolInfoAjax();
			} else {
				ComShowMessage(rtnmsg);
			}
			/*
			 * } else { ComShowCodeMessage("COM0018"); return false; }
			 */
			// Merge
		} else if (sheetObj.GetCellValue(Row, "tree_nodetype") == '4'
				&& sheetObj.GetCellValue(Row, "merge_yn") == 'Y') {
			var v_shipno = new Array();
			var v_shipno_seq = new Array();
			var noCnt = 0;
			var seqCnt = 0;
			var chkCnt = 0;
			var chkVal = new Array();
			var chkSeq = 0;
			for ( var i = 0; i < sheet1.RowCount() + 1; i++) {
				if (sheetObj.GetCellValue(i, "tree_nodetype") == '5')
					if (sheet1.GetCellValue(i, "chk") == "1") {
						if (noCnt == 0) {
							v_shipno[noCnt] = sheet1.GetCellValue(i,
									"shipno");
							noCnt += 1;
						} else {
							if (sheet1.GetCellValue(i, "shipno") != v_shipno[noCnt - 1]) {
								v_shipno[noCnt] = sheet1.GetCellValue(
										i, "shipno");
								noCnt += 1;
							}
						}
						// v_shipno_seq[seqCnt] =
						// $("#sheet1")[0].CellValue(i,"shipno_seq");
						seqCnt += 1;
					}
			}
			var chkStr = "";
			var strCnt = 0;
			for ( var j = 0; j < v_shipno.length; j++) {
				chkCnt = 0;
				strCnt = 0;
				for ( var i = 0; i < sheet1.RowCount() + 1; i++) {
					if (sheetObj.GetCellValue(i, "tree_nodetype") == '5') {
						if (sheet1.GetCellValue(i, "chk") == "1") {
							if (v_shipno[j] == sheet1.GetCellValue(i,
									"shipno")) {
								chkCnt += 1;
								if (strCnt != 0) {
									chkStr += ",";
								}
								chkStr += sheet1.GetCellValue(i,
										"shipno_seq");
								strCnt += 1;
							}
						}
					}
				}
				chkVal[j] = chkCnt;
				v_shipno_seq[j] = chkStr;
				chkStr = "";
			}
			if (chkVal.length == 0) {
				ComShowCodeMessage("COM0336");
				return;
			}
			for ( var i = 0; i < chkVal.length; i++) {
				if (chkVal[i] < 2) {
					ComShowCodeMessage("COM0336");
					return;
				}
			}
			doShowProcess(true);
			setTimeout(function(){
			var f_shipno = "";
			var f_shipno_seq = "";
			for ( var i = 0; i < v_shipno.length; i++) {
				formObj.f_cmd.value = MODIFY05;
				sParam = FormQueryString(formObj, "");
				sParam = sParam + "&consol_no=" + formObj.consol_no.value
						+ "&shipno=" + v_shipno[i] + "&shipno_seq="
						+ v_shipno_seq[i];
				var tree_name = sheet1.GetCellValue(Row, 'tree_name');
				 sXml=sheet1.GetSaveData("mergeLPShipmentWaveSimpleGS.clt",sParam);
				 sheet1.LoadSaveData(sXml);
			}
			/*
			 * sParam=FormQueryString(formObj, ""); sParam=sParam +
			 * "&pc_mrno="+formObj.mclp_no.value +
			 * "&pc_sono="+$("#sheet1")[0].GetCellValue(Row,'so_no') +
			 * "&pc_bkno="+$("#sheet1")[0].GetCellValue(Row,'sb_no') +
			 * "&pc_po_sys_no="+$("#sheet1")[0].GetCellValue(Row,'po_sys_no') +
			 * "&pc_item_sys_no="+$("#sheet1")[0].GetCellValue(Row,'item_sys_no');
			 * var tree_name=$("#sheet1")[0].GetCellValue(Row,'tree_name');
			 * //parameter changed[check again]CLT
			 * sXml=$("#sheet1")[0].GetSaveData("mergeShipment.do", sParam);
			 * //parameter changed[check again]CLT
			 * $("#sheet1")[0].LoadSaveData(sXml);
			 */
			var xmlDoc = $.parseXML(sXml);
			var $xml = $(xmlDoc);
			if ($xml.find("res").text() == "1") {
				setShipSplit(tree_name);
				cnt = cnt + 1;
				/*$.ajax({
					url : "searchLPCNTRParentListWaveSimple.do?" + sParam,
					success : function(result) {
						CNTRParentList_Load(result.xml);
					}
				});*/
				//ComShowMessage("Merging successfully");
				showCompleteProcess();
				var sXml = "";
				formObj.f_cmd.value = SEARCH02;
				sParam=FormQueryString(formObj, "");
				sXml=sheetObjects[0].GetSearchData("./searchLPCNTRParentListWaveSimpleGS.clt?"+sParam);
				CNTRParentList_Load(sXml);
				/*$.ajax({
					url : "searchLPVolumeWaveSimple.do?" + sParam,
					success : function(result) {
						Volume_Load(result.xml);
					}
				});*/
				sXml = "";
				formObj.f_cmd.value = SEARCH03;
				sParam=FormQueryString(formObj, "");
				sXml=sheetObjects[0].GetSearchData("searchLPVolumeWaveSimpleGS.clt?"+sParam);
				Volume_Load(sXml);
			}
		},100);
		doHideProcess();
			// Split
		} else if (sheetObj.GetCellValue(Row, "tree_nodetype") == '5') {
			// 1. Main UI 로 부터 SHIP_NO, QTY, CBM, KGS, PKGQTY, ITEM, ITEM_NAME 를
			// 담는다.
			var sUrl = "LPShipSplitWaveSmp.clt?shipno="
					+ sheetObj.GetCellValue(Row, "shipno")
					+ "&shipno_seq="
					+ sheetObj.GetCellValue(Row, "shipno_seq")
					+ "&consol_no="
					+ formObj.consol_no.value
					+ "&ttl_ea_qty="
					+ sheetObj.GetCellValue(Row, "item_qty")
					+ "&item_lot="
					+ sheetObj.GetCellValue(Row, "item_lot")
					+ "&lot_id="
					+ sheetObj.GetCellValue(Row, "lot_id")
					+ "&item="
					+ sheetObj.GetCellValue(Row, "item_cd")
					+ "&item_name="
					+ encodeURIComponent(sheetObj.GetCellValue(Row, "item_nm"))
					+ "&tree_name="
					+ sheetObj.GetCellValue(sheet1_FindParent(sheetObj, Row),
							"tree_name");
			
			callBackFunc = "setShipSplit";
			modal_center_open(sUrl, '', 650,550,"yes");
		}
	} else if (colName == "chk") {
		
		sheet1.SetCellText(0, "chk", "");
		sheet1_OnAfterCheck(sheet1, Row, "chk");
	}
}
function sheet1_OnAfterCheck(sheetObj, Row, Col){
	if(sheetObj.GetCellValue(Row, "chk") != 1){
		sheetObj.SetCellValue(Row, "chk", 1);
	}else{
		sheetObj.SetCellValue(Row, "chk", 0);
	}
}
function sheet1_OnCheckAllEnd(sheetObj, Row, Col) {
	if(sheetObj.GetHeaderCheck(0, "chk") == 1){
		for(var i = 1; i<=sheetObj.RowCount(); i++){
			if (sheetObj.GetCellValue(i,"chk")==1){
				sheetObj.SetRowFontColor(i,"#00B400");
			}
		}
	}else{
		for(var i = 1; i<=sheetObj.RowCount(); i++){
			if (sheetObj.GetCellValue(i,"chk")==0){
				sheetObj.SetRowFontColor(i,"#000000");
			}
		}
	}
}
function setShipSplit(tree_name){
	if(tree_name == undefined || tree_name == "undefined")
		{
			return;
		}
	opener.setLoadingPlan();
	var formObj=document.form;
	formObj.f_cmd.value = SEARCH01;
 	var sXml=sheetObjects[0].GetSearchData("./searchLPShipmentListWaveSimpleGS.clt", FormQueryString(formObj,""));
	sheetObjects[0].LoadSearchData(sXml,{Sync:1} );
	sheetObjects[0].ShowTreeLevel(0, 1);
	var row_0=sheetObjects[0].FindText("tree_name", tree_name);
	for(;;){
		if( sheetObjects[0].GetCellValue(row_0,"tree_nodetype") =='1' ){
			sheetObjects[0].SetRowExpanded(row_0,1);
			break;
		}
		sheetObjects[0].SetRowExpanded(row_0,1);
		row_0=sheet1_FindParent(sheetObjects[0], row_0);
	}
	for(i=0;i<sheetObjects[0].RowCount()+1;i++){
		if(sheetObjects[0].GetCellValue(i,"tree_nodetype")=="3"){
 			sheetObjects[0].SetCellImage(i,"image",2);
		} else if(sheetObjects[0].GetCellValue(i,"tree_nodetype")=="4"){
			if ( sheetObjects[0].GetCellValue(i,"merge_yn") == "Y"){
 				sheetObjects[0].SetCellImage(i,"image",3);
			} else {
 				sheetObjects[0].SetCellImage(i,"image",2);
			}
		} else if(sheetObjects[0].GetCellValue(i,"tree_nodetype")=="5"){
 			sheetObjects[0].SetCellImage(i,"image",4);
		}
	}
}
/*function setShipSplit(tree_name) {
	opener.setLoadingPlan();
	var formObj = document.form;
	// parameter changed[check again]CLT var
	// sXml=$("#sheet1")[0].GetSearchData("searchLPShipmentListWaveSimple.do",
	// FormQueryString(formObj,""));
	sheet1.LoadSearchData(sXml, {
		Sync : 1
	});
	$("#sheet1")[0].ShowTreeLevel(0, 1);
	var row_0 = $("#sheet1")[0].FindText("tree_name", tree_name);
	for (;;) {
		if ($("#sheet1")[0].GetCellValue(row_0, "tree_nodetype") == '1') {
			$("#sheet1")[0].SetRowExpanded(row_0, 1);
			break;
		}
		$("#sheet1")[0].SetRowExpanded(row_0, 1);
		row_0 = $("#sheet1")[0].FindParent(row_0);
	}
	for (i = 0; i < $("#sheet1")[0].rowcount + 1; i++) {
		if ($("#sheet1")[0].GetCellValue(i, "tree_nodetype") == "3") {
			// conversion of function[check again]CLT
			// $("#sheet1")[0].SetCellImage(i,"image","");
		} else if ($("#sheet1")[0].GetCellValue(i, "tree_nodetype") == "4") {
			if ($("#sheet1")[0].GetCellValue(i, "merge_yn") == "Y") {
				// conversion of function[check again]CLT
				// $("#sheet1")[0].SetCellImage(i,"image","merge");
			} else {
				// conversion of function[check again]CLT
				// $("#sheet1")[0].SetCellImage(i,"image","");
			}
		} else if ($("#sheet1")[0].GetCellValue(i, "tree_nodetype") == "5") {
			// conversion of function[check again]CLT
			// $("#sheet1")[0].SetCellImage(i,"image","split");
		}
	}
}*/
/**
 * 시트를 클릭했을 때 처리
 * @param row
 * @param col
 * @return
 */
function sheet1_OnChange(sheetObj, row, col) {
	/*if (col == 1) {
		if (sheetObj.GetCellValue(row, "chk") == 1) {
			sheetObj.SetRowFontColor(row, "#00B400");
		} else {
			sheetObj.SetRowFontColor(row, "#000000");
		}
		if (check_flg == "N") {
			check_flg = "Y";
			sheet1_Check(sheetObj, row);
		}
	}*/
}
/*function sheet1_FindChild(sheetObj, row) {
	var Row2 = 0;
	var chek = "N";
	for ( var i = row + 1; i < sheetObj.rowcount + 1; i++) {
		if (chek == "N") {
			if (sheetObj.GetCellValue(i, "tree_nodetype") < sheetObj
					.GetCellValue(row, "tree_nodetype")) {
				chek = "Y";
			} else {
				if (sheetObj.GetCellValue(i, "tree_nodetype") == sheetObj
						.GetCellValue(row, "tree_nodetype")) {
					chek = "Y";
				} else {
					Row2 = i;
				}
			}
		}
	}
	return Row2;
}*/
function sheet1_FindChild(sheetObj, row){
	var Row2=0;
	var chek="N";
	for(var i=row+1;i<sheetObj.RowCount()+1;i++){
		if ( chek == "N"){
			if ( sheetObj.GetCellValue(i,"tree_nodetype") < sheetObj.GetCellValue(row,"tree_nodetype")){
				chek="Y";
			} else {
				if ( sheetObj.GetCellValue(i,"tree_nodetype") == sheetObj.GetCellValue(row,"tree_nodetype")){
					chek="Y";
				} else {
					Row2=i;
				}
			}
		}
	}
	return Row2;
}
/*function sheet1_Check(sheetObj, row) {
	var formObj = document.form;
	var i = 0;
	var j = 0;
	var chk_flg = "N";
	var Row_chk = 0;
	var parent_row = 0;
	var child_row = 0;
	if (sheetObj.GetCellValue(row, "chk") == '1') {
		// if( sheetObj.CellValue(row,"tree_nodetype") != '5' ){
		child_row = sheet1_FindChild(sheetObj, row);
		if (sheetObj.GetCellValue(row, "tree_nodetype") != '5') {
			for (i = row; i < child_row + 1; i++) {
				sheetObj.SetCellValue(i, "chk", 1, 0);
				sheetObj.SetRowFontColor(i, "#00B400");
			}
		}
		Row_chk = row;
		for (;;) {
			// check_flg = "Y";
			if (sheetObj.GetCellValue(Row_chk, "tree_nodetype") == '1') {
				break;
			}
			parent_row = sheet1_FindParent(sheetObj,Row_chk);//sheetObj.FindParent(Row_chk);
			sheetObj.SetCellValue(parent_row, "chk", 1, 0);
			sheetObj.SetRowFontColor(parent_row, "#00B400");
			Row_chk = parent_row;
		}
		check_flg = "N";
	} else {
		child_row = sheet1_FindChild(sheetObj, row);
		if (sheetObj.GetCellValue(row, "tree_nodetype") != '5') {
			for ( var i = row + 1; i < child_row + 1; i++) {
				sheetObj.SetCellValue(i, "chk", 0, 0);
				sheetObj.SetRowFontColor(i, "#000000");
			}
		}
		Row_chk = row;
		for (;;) {
			check_flg = "N";
			if (sheetObj.GetCellValue(Row_chk, "tree_nodetype") == '1') {
				break;
			}
			parent_row = sheet1_FindParent(sheetObj,Row_chk);//sheetObj.FindParent(Row_chk);
			child_row = sheet1_FindChild(sheetObj, parent_row);
			for ( var i = parent_row + 1; i < child_row + 1; i++) {
				if (sheetObj.GetCellValue(i, "chk") != 0)
					chk_flg = "Y";
			}
			if (chk_flg == "N") {
				sheetObj.SetCellValue(parent_row, "chk", 0, 0);
				sheetObj.SetRowFontColor(parent_row, "#000000");
			} else {
				break;
			}
			Row_chk = parent_row;
		}
		check_flg = "N";
	}
}*/
function sheet1_Check(sheetObj, row){
    formObj = document.form;
    var i=0;
    var j=0;
    var chk_flg="N";
    var Row_chk=0;
    var parent_row=0;
    var child_row=0;
    var prefix="";
    var tree_nodetype = sheetObj.GetCellValue(row,prefix+"tree_nodetype");
    if ( sheetObj.GetCellValue(row,prefix+"chk") == '1' ){
            child_row=sheet1_FindChild(sheetObj,row);
            if( sheetObj.GetCellValue(row,prefix+"tree_nodetype") != '5' ){
                for(i=row;i<child_row+1;i++){
                    sheetObj.SetCellValue(i,prefix+"chk",1,0);
                    sheetObj.SetRowFontColor(i,"#00B400");
                }
            }
            Row_chk=row;
            var chk_parent = false;
            //for(;;){
            for(var i=row;i>=2;i--){
                chk_flg="N";
                if( sheetObj.GetCellValue(Row_chk,prefix+"tree_nodetype") =='1' ){
                    break;
                }
                parent_row=sheet1_FindParent(sheetObj,i);
                if(chk_parent == false){
                    if(parseInt(sheetObj.GetCellValue(parent_row, prefix+"tree_nodetype")) < tree_nodetype){
                        sheetObj.SetCellValue(parent_row,prefix+"chk",1);
                        sheetObj.SetRowFontColor(parent_row,"#00B400");
                        Row_chk=parent_row;
                    }
                    if(parseInt(sheetObj.GetCellValue(parent_row - 1, prefix+"tree_nodetype")) > parseInt(sheetObj.GetCellValue(parent_row, prefix+"tree_nodetype"))){
                        chk_parent = true;
                        tree_nodetype = sheetObj.GetCellValue(parent_row, prefix+"tree_nodetype");
                    }
                }
                if(parseInt(sheetObj.GetCellValue(parent_row, prefix+"tree_nodetype")) < tree_nodetype){
                    sheetObj.SetCellValue(parent_row,prefix+"chk",1,0);
                    sheetObj.SetRowFontColor(parent_row,"#00B400");
                    Row_chk=parent_row;
                }
            }
            check_flg="N";
        } else {
        child_row=sheet1_FindChild(sheetObj,row);
        if( sheetObj.GetCellValue(row,prefix+"tree_nodetype") != '5' ){
            for(var i=row;i<child_row+1;i++){
                sheetObj.SetCellValue(i,prefix+"chk",0);
                sheetObj.SetRowFontColor(i,"#000000");
            }
        }
        Row_chk=row;
        for(var k=row;k>=2;k--){
            chk_flg="N";
            if( sheetObj.GetCellValue(Row_chk,prefix+"tree_nodetype") =='1' ){
                break;
            }
            parent_row=sheet1_FindParent(sheetObj,k);   
            child_row=sheet1_FindChild(sheetObj,parent_row);
            for(var i=parent_row+1;i<child_row+1;i++){
                if( sheetObj.GetCellValue(i,prefix+"chk")!=0) chk_flg="Y";
            }
            if ( chk_flg == "N"){
                sheetObj.SetCellValue(parent_row,prefix+"chk",0);
                sheetObj.SetRowFontColor(parent_row,"#000000");
            } else {
                break;
            }
            Row_chk=parent_row;
        }
        check_flg="N";
    }
	var checkRow=sheetObj.FindCheckedRow("chk");
	var arrRow=checkRow.split("|");
	var qty=0;
	var cbm=0;
	var grs_kgs=0;
	var net_kgs=0;
	for(var i=0;i<arrRow.length;i++){
		if( sheetObj.GetCellValue(arrRow[i],"tree_nodetype") == '5'){
			qty=qty + eval(sheetObj.GetCellValue(arrRow[i],"item_qty"));
			cbm=cbm + eval(sheetObj.GetCellValue(arrRow[i],"item_cbm"))*1000;
			grs_kgs=grs_kgs + eval(sheetObj.GetCellValue(arrRow[i],"item_grs_kgs"))*1000;
			net_kgs=net_kgs + eval(sheetObj.GetCellValue(arrRow[i],"item_net_kgs"))*1000;
		}
	}
	formObj.loading_qty.value=ComAddComma(qty+"","#,##0");
	formObj.loading_cbm.value=ComAddComma2(cbm/1000+"","#,##0.000");
	formObj.loading_grs_kgs.value=ComAddComma2(grs_kgs/1000+"","#,##0.000");
	formObj.loading_net_kgs.value=ComAddComma2(net_kgs/1000+"","#,##0.000");
}
/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'Add':
			if (ComIsEmpty(formObj.cntr_tp)) {
				ComShowCodeMessage("COM0129");
				formObj.cntr_tp.focus();
				return false;
			}
			if ($("#cntr_tp").val().trim() == "EQ") {
				ComShowCodeMessage("COM0129");
				formObj.cntr_tp.focus();
				return false;
			}
			break;
		case 'Del':
			var sRowStr = sheet2.GetSelectionRows("|");
			var arr = sRowStr.split("|");
			if (arr.length == 1) {
				if (sheetObj.GetCellValue(arr[0], "tree_nodetype") != '1') {
					ComShowCodeMessage("COM0104");
					return false;
				}
			} else {
				ComShowCodeMessage("COM0104");
				return false;
			}
			break;
		}
	}
	return true;
}
function btn_Save()
 {
	if ($("#eq_tpsz_cd_edit").val().trim() == ""
			&& $("#eq_no_edit").val().trim() == ""
			&& $("#seal_no_edit").val().trim() == "") {
		ComShowCodeMessage("COM0323");
		return;
	}
	if ($("#eq_tpsz_cd_edit").val().trim() == "Y"
			&& $("#cntr_tp").val().trim() == "") {
		ComShowCodeMessage("COM0682");
		$("#cntr_tp").focus();
		return;
	}
	if ($("#eq_tpsz_cd_edit").val().trim() == "Y"
			&& $("#cntr_tp").val().trim() == "EQ") {
		ComShowCodeMessage("COM0682");
		$("#cntr_tp").focus();
		return;
	}
	if ($("#eq_no_edit").val().trim() == "Y" && $("#eq_no").val().trim() == ""
			&& $("#seal_no_edit").val().trim() == "Y"
			&& $("#seal_no").val().trim() == "") {
		ComShowCodeMessage("COM0323");
		$("#eq_no").focus();
		return;
	}
	var formObj = document.form;
	formObj.f_cmd.value= MODIFY07;
	var sParam = FormQueryString(formObj, "");
	var saveXml=sheet2.GetSaveData("modifyLpGrpEqSealNoGS.clt",sParam);
	var xmlDoc = $.parseXML(saveXml);
	var $xml = $(xmlDoc);
	
	if ($xml.find("res").text() != "1" && $xml.find("res").text() != "0") {
		ComShowMessage($xml.find("message").text());
		return;
	}
	if( $xml.find("res").text() == "0" || $xml.find("res").text() == "1"){
	if ($xml.find("res").text() == "0") {
		var suYn = $xml.find("res").text();
		var suValue = $xml.find("message").text();
		if (suYn == "N") {
			ComShowCodeMessage(suValue);
			return;
		}
	}
		sheet2.LoadSaveData(saveXml);
		opener.setLoadingPlan();
		// 1. Save 후 조회
		if ($xml.find("res").text() == "1") {
			formObj.f_cmd.value= SEARCH02;
			sParam = FormQueryString(formObj, "");
			sXml=sheet2.GetSearchData("searchLPCNTRParentListWaveSimpleGS.clt",	sParam );
			CNTRParentList_Load(sXml);
		}
	}
}
function btn_Print()
{
}
