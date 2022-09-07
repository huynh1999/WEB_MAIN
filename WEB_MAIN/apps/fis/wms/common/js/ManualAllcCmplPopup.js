/*<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ManualAllcPopup.js
*@FileTitle  : Manual Allocation
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/21
=========================================================--%>*/
var firCalFlag = false;
var sheetCnt=0;
var docObjects=new Array();
var opener = opener;
var checkallocation = true;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
var callBackFunc = "";
var rtnary = new Array(1);
/*
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/*
* Sheet  onLoad
*/
function loadPage() {
	
	var formObj=document.form;
	// ------------------------------------
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	if($("#wave_no").val() != ""){
		doWork("SEARCHLIST");
	}
	
	//[WMS 개선 문의사항]-2.	Allocation & Complete :2.2 Tab Customaizing 과 Save적용
	//사용자가 저장한 Header 정보를 읽어온다.
	var formObj=document.form;

	
	IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), docObjects[0]); //#4406 [Great Luck] SYS_InvalidColumnMove 현상제거를 위해 삽입
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false,"RestoreGrid");
}

function RestoreGrid(){ 
		return;
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

/*
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
var prefix='Grd03';
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){

//		      var hdr1 = '|Strategy|SKU|Description|Order Q\'ty|Order Q\'ty|Order Q\'ty|Allocation Total|Allocation Total|CHK|Location|Alloc. Q\'ty|Outbound Result|Outbound Result|Outbound Result|Outbound Result|Outbound Result|Outbound Result|Item Lot|LOT4|LOT5|Exp. Date|LOT ID|LP#|Inbound Infomation|Inbound Infomation';
//		      var hdr2=	 '|Strategy|SKU|Description|UOM|Q\'ty|Total|Alloc|Un-Alloc|CHK|Location|Alloc. Q\'ty||Picking Q\'ty||Shipping Q\'ty|O/B Date|Total Pallet|Item Lot|LOT4|LOT5|Exp. Date|LOT ID|LP#|I/B Date|PO No';
		      var hdr1 = getLabel('ManualAllcCmplPopup_HDR1');
		      var hdr2=	 getLabel('ManualAllcCmplPopup_HDR2');
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"},{ Text:hdr2, Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols =[{Type:"Status", 	Hidden:1, 	Width:0, 	Align:"Left",		ColMerge:1,  		SaveName:prefix+"ibflag",				 KeyField:0,	  	UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		     			{Type:"Text",     	Hidden:1,  	Width:80,	Align:"Center",		ColMerge:1, 		SaveName:prefix+"strg_sys_no", 			 KeyField:0,		UpdateEdit:0, 	Format:""		},
		     			{Type:"Combo",     	Hidden:0,  	Width:80,	Align:"Center",		ColMerge:1, 		SaveName:prefix+"strg_cd", 				 KeyField:0,		UpdateEdit:0, 	Format:""		},
		     			{Type:"Text",     	Hidden:0,  	Width:100,	Align:"Center",		ColMerge:1, 		SaveName:prefix+"item_cd", 				 KeyField:0,		UpdateEdit:0, 	Format:""				},
		     			{Type:"Text", 		Hidden:0, 	Width:150,	Align:"Left",		ColMerge:1, 		SaveName:prefix+"item_nm", 				 KeyField:0,		UpdateEdit:0, 	Format:""				},
		     			{Type:"Text",     	Hidden:0,  	Width:70,	Align:"Center",		ColMerge:1, 		SaveName:prefix+"item_pkgunit", 		 KeyField:0,		UpdateEdit:0, 	Format:"",  		PointCount:0	},
		     			{Type:"Int",   		Hidden:0, 	Width:70,	Align:"Right",		ColMerge:1, 		SaveName:prefix+"item_pkgqty", 			 KeyField:0, 		UpdateEdit:0,	Format:"Integer",  	PointCount:0	},
		     			{Type:"Int",     	Hidden:0,  	Width:70,	Align:"Right",		ColMerge:1, 		SaveName:prefix+"item_ea_qty", 			 KeyField:0,		UpdateEdit:0, 	Format:"Integer"					},
		     			{Type:"Int",     	Hidden:0,  	Width:70,	Align:"Right",		ColMerge:1, 		SaveName:prefix+"allc_sum_ea_qty",  	 KeyField:0,		UpdateEdit:0, 	Format:"Integer"					},
		     			{Type:"Int",     	Hidden:0,  	Width:70,	Align:"Right",		ColMerge:1, 		SaveName:prefix+"un_alloc_ea_qty", 		 KeyField:0,		UpdateEdit:0, 	Format:"Integer"					},
		     			{Type:"CheckBox",  	Hidden:0,  	Width:50,	Align:"Center",		ColMerge:0, 		SaveName:prefix+"chk", 					 KeyField:0,		UpdateEdit:1, 	Format:""							},
		     			{Type:"Text",     	Hidden:0,  	Width:120,	Align:"Center",		ColMerge:0, 		SaveName:prefix+"wh_loc_cd_nm", 		 KeyField:0,		UpdateEdit:0, 	Format:""							},
		     			{Type:"Int",     	Hidden:0,  	Width:70,	Align:"Right",		ColMerge:0, 		SaveName:prefix+"allc_item_ea_qty", 	 KeyField:0,		UpdateEdit:0, 	Format:"Integer"					},
		     			{Type:"CheckBox",  	Hidden:0,  	Width:25,	Align:"Center",		ColMerge:0, 		SaveName:prefix+"chk1", 				 KeyField:0,		UpdateEdit:0, 	Format:""							},
		     			{Type:"Int",    	Hidden:0, 	Width:90,	Align:"Right", 		ColMerge:0,			SaveName:prefix+"pick_item_ea_qty" ,	 KeyField:0,		UpdateEdit:0, 	Format:"Integer"					},
		     			{Type:"CheckBox",   Hidden:0,  	Width:25,	Align:"Center",		ColMerge:0, 		SaveName:prefix+"chk2", 				 KeyField:0,		UpdateEdit:0, 	Format:""							},
		     			{Type:"Int",        Hidden:0, 	Width:90,	Align:"Right", 		ColMerge:0,			SaveName:prefix+"ship_item_ea_qty", 	 KeyField:0,		UpdateEdit:0, 	Format:"Integer" 					},
		     			{Type:"Date",       Hidden:1, 	Width:100,	Align:"Right", 		ColMerge:0,			SaveName:prefix+"outbound_dt", 			 KeyField:0,		UpdateEdit:0,	Format:"Ymd",  		PointCount:0	},
		     			{Type:"Int",        Hidden:1, 	Width:70,	Align:"Right", 		ColMerge:0,			SaveName:prefix+"out_pe_qty", 			 KeyField:0,		UpdateEdit:0,	Format:"Integer",  	PointCount:0	},
		     			{Type:"Text",       Hidden:0, 	Width:70,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"lot_no", 				 KeyField:0,		UpdateEdit:0,	Format:"",  		PointCount:0	},
		     			{Type:"Text",       Hidden:0, 	Width:70,	Align:"Center", 	ColMerge:0,			SaveName:prefix+"lot_04",				 KeyField:0,		UpdateEdit:0,	Format:"Integer",  	PointCount:0	},
		     			{Type:"Text",       Hidden:0, 	Width:120,	Align:"Center", 	ColMerge:0,			SaveName:prefix+"lot_05",				 KeyField:0,		UpdateEdit:0,	Format:""							},
		     			{Type:"Date",       Hidden:0, 	Width:100,	Align:"Center", 	ColMerge:0,			SaveName:prefix+"exp_dt",				 KeyField:0,		UpdateEdit:0,	Format:"Ymd"						},
		     			{Type:"Text",       Hidden:0, 	Width:120,	Align:"Center", 	ColMerge:0,			SaveName:prefix+"lot_id",				 KeyField:0,		UpdateEdit:0,	Format:""							},
		     			{Type:"Text",       Hidden:0, 	Width:120,	Align:"Center", 	ColMerge:0,			SaveName:prefix+"lic_plat_no",			 KeyField:0,		UpdateEdit:0,	Format:""							},
		     			{Type:"Date",       Hidden:0, 	Width:100,	Align:"Center", 	ColMerge:0,			SaveName:prefix+"inbound_dt", 			 KeyField:0,		UpdateEdit:0,	Format:"Ymd",  		PointCount:0	},
		     			{Type:"Text",       Hidden:0, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"po_no_in",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"wob_bk_no_org",		 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"sao_sys_no",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"item_sys_no",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"item_seq",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"pickd_flg",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"bk_sts_cd",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"lp_cnt",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"allc_cnt",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"item_cbm",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"item_cbf",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"item_grs_kgs",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"item_grs_lbs",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"item_net_kgs",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"item_net_lbs",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"walc_no",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"wib_bk_no",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"po_sys_no",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"wh_loc_cd",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"cust_ord_no",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"ord_tp_nm",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"bk_sts_nm",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"allc_merge_key",		 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"rn",					 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"load_plan_item_ea_qty", KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"est_out_dt",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"dlv_ord_no",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"tro_sts_nm",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"eq_tpsz_cd",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"eq_tp_cd",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"eq_no",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"seal_no",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"trucker_cd",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"trucker_nm",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"ctrt_no",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"ctrt_nm",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"wh_cd",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"issu_cnt",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"bk_sts_cd_grp",		 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"pkg_lv1_qty",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"lv1_cbm",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"lv1_cbf",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"lv1_grs_kgs",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"lv1_grs_lbs",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"lv1_net_kgs",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"lv1_net_lbs",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"pe_qty",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"consol_no",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"shipno",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"shipno_seq",			 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"lp_id",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"lp_seq",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"tro_flg",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"dlv_ord_no_org",		 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"tro_seq",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"wob_bk_no",		     KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"pick_item_ea_qty_org",	 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"ship_item_ea_qty_org",	 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"lp_no",				 KeyField:0,		UpdateEdit:0,	Format:""	},
		     			{Type:"Text",       Hidden:1, 	Width:120,	Align:"Left", 		ColMerge:0,			SaveName:prefix+"item_ser_no",			 KeyField:0,		UpdateEdit:0,	Format:""	}
		  	             ];
		      InitColumns(cols);
		      //[WMS 개선 문의사항]-2.	Allocation & Complete :2.2 Tab Customaizing 과 Save적용
		      SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		      
		      SetColProperty(0 ,prefix+"pick_item_ea_qty" , 	{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
		      SetColProperty(0 ,prefix+"ship_item_ea_qty" , 	{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1}); 
		      SetColProperty(0 ,prefix+"ttl_pallet" , 	{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1}); 
		      SetColProperty(prefix+"strg_cd",   {ComboText:strg_noText, ComboCode:strg_noCode} );
		      SetSheetHeight(480);
		      SetEditable(1);
		      resizeSheet();
	         }
	      break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

/*
 * search End event
 */
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	sheetObj.InitComboNoMatchText(1, "",1);
	
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, prefix + "bk_sts_cd") == "LP"){
			sheetObj.SetCellEditable(i, prefix+ "pick_item_ea_qty",false);
			sheetObj.SetCellEditable(i, prefix+ "ship_item_ea_qty",false);
			sheetObj.SetCellEditable(i, prefix+ "chk",false);
			//sheetObj.SetCellEditable(i, prefix + "outbound_dt",false);
			sheetObj.SetCellEditable(i, prefix + "out_pe_qty",false);
			sheetObj.SetCellEditable(i, prefix + "chk1",false);
			sheetObj.SetCellEditable(i, prefix + "chk2",false);
			$("#outbound_dt").val(sheetObj.GetCellValue(i, prefix + "outbound_dt").substring(4, 6) + "-" + sheetObj.GetCellValue(i, prefix + "outbound_dt").substring(6, 8) + "-" + sheetObj.GetCellValue(i, prefix + "outbound_dt").substring(0, 4));
			$("#outbound_dt").prop("disabled",true);
			//#2322 [WMS4.0] DATE FIELD TO HAVE [TODAY] BUTTON (S)
			$("#btn_today").prop("disabled",true);
			//#2322 [WMS4.0] DATE FIELD TO HAVE [TODAY] BUTTON (E)
			$("#btn_wave_dt").prop("disabled",true);
		}else if(sheetObj.GetCellValue(i, prefix + "allc_sum_ea_qty") > 0){
			if(sheetObj.GetCellValue(i, prefix + "pickd_flg") != "Y" ){ //&& sheetObj.CellValue(i, prefix + "bk_sts_cd_grp") == "A"
				sheetObj.SetCellEditable(i, prefix+ "pick_item_ea_qty",true);
				sheetObj.SetCellEditable(i, prefix + "chk1",true);
			}
			sheetObj.SetCellEditable(i, prefix + "ship_item_ea_qty",true);
			//sheetObj.SetCellEditable(i, prefix + "outbound_dt",true);
			sheetObj.SetCellEditable(i, prefix + "out_pe_qty",true);
			sheetObj.SetCellEditable(i, prefix + "chk2",true);
			$("#outbound_dt").prop("disabled",false);
			//#2322 [WMS4.0] DATE FIELD TO HAVE [TODAY] BUTTON (S)
			$("#btn_today").prop("disabled",false);
			//#2322 [WMS4.0] DATE FIELD TO HAVE [TODAY] BUTTON (E)
			$("#btn_wave_dt").prop("disabled",false);
		}
	}
	$("#lp_cnt_tot").val(sheetObj.ComputeSum("|" + prefix + "lp_cnt"+ "|") );
	var allc_cnt = 0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		allc_cnt += eval(sheetObj.GetCellValue(i, prefix + "allc_sum_ea_qty"))
	}
	$("#allc_cnt_tot").val(allc_cnt);
	mergeCell(2);
}
/*
 * ONCHANGE
 */
var sel_row;
function sheet1_OnChange(sheetObj, Row, Col, Value)
{
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr == prefix + "chk1")
	{
		if(sheetObj.GetCellValue(Row, prefix + "chk1") == "1"){
			sheetObj.SetCellValue(Row, prefix+"pick_item_ea_qty", sheetObj.GetCellValue(Row, prefix+"allc_item_ea_qty"));
		}else{
			sheetObj.SetCellValue(Row, prefix+"pick_item_ea_qty", sheetObj.GetCellValue(Row, prefix+"pick_item_ea_qty_org"));
		}
	}else if(colStr == prefix + "chk2"){
		if(sheetObj.GetCellValue(Row, prefix + "chk2") == "1"){
			searchValue2 = sheetObj.GetCellValue(Row, prefix+"ship_item_ea_qty")
			if(sheetObj.GetCellValue(Row, prefix+"pick_item_ea_qty") <= 0){
				sheetObj.SetCellValue(Row, prefix+"ship_item_ea_qty", sheetObj.GetCellValue(Row, prefix+"allc_item_ea_qty"));
			}else{
				sheetObj.SetCellValue(Row, prefix+"ship_item_ea_qty", sheetObj.GetCellValue(Row, prefix+"pick_item_ea_qty"));
			}
		}else{
			sheetObj.SetCellValue(Row, prefix+"ship_item_ea_qty", sheetObj.GetCellValue(Row, prefix+"ship_item_ea_qty_org"));
		}
	}else if(colStr == prefix + "ship_item_ea_qty"){
		var shipped = sheetObj.GetCellValue(Row, prefix+"ship_item_ea_qty");
		var picked = 0;
		if(sheetObj.GetCellValue(Row, prefix + "pickd_flg") == "Y"){
			picked = eval(sheetObj.GetCellValue(Row, prefix + "pick_item_ea_qty"));
		}else{
			picked = eval(sheetObj.GetCellValue(Row, prefix + "allc_item_ea_qty"));
		}
		//음수체크
		if(sheetObj.GetCellValue(Row, prefix+"ship_item_ea_qty") < 0){
			shipped = Math.abs(Value);
			sheetObj.SetCellValue(Row, Col,shipped,0);
		}
		//shipped는 picked보다 클수없다.
		if(shipped > picked){
			shipped = picked;
			sheetObj.SetCellValue(Row, Col,shipped,0);
		}
		if(sheetObj.GetCellValue(Row, prefix+"ship_item_ea_qty") > sheetObj.GetCellValue(Row, prefix + "pick_item_ea_qty")){
			sheetObj.SetCellValue(Row, prefix + "pick_item_ea_qty",sheetObj.GetCellValue(Row, prefix+"ship_item_ea_qty"),0);
		}
	// #1214 [WMS4.0][Release Test]Allocation & Complete POPUP 수정
	}else if(colStr == prefix + "strg_cd"){
		var strg_cd = sheetObj.GetCellValue(Row, prefix + "strg_cd");
		sel_row = Row;
		// strg_cd변경시 시스템키 변경
		ajaxSendPost(setStrgSysNo, 'reqVal', '&goWhere=aj&bcKey=setStrgSysNo&strg_cd='+strg_cd, './GateServlet.gsl');
	}
}

function setStrgSysNo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			// strg_cd변경시 시스템키 변경
			if (!ComIsNull(doc[1]) && doc[1] != "null") {
				sheet1.SetCellValue(sel_row, prefix + "strg_sys_no", doc[1])
			}
		}
	}
}


/*
 * stock list조회
 * 버튼(조회버튼)클릭시
 * 또는
 * 처음 화면 init시 기본조회시
 */
function searchList()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	formObj.f_cmd.value=SEARCH;
	sheet1.DoSearch("./searchAllcCmplPopListGS.clt", FormQueryString(formObj, ""));
}

/*
 * this function for save button
 */
function btn_Save(gubun){ //parameter 추가
	var formObj=document.form;
	//validation
	// show message "there are no data" in case there is no item on grid
	if(sheet1.RowCount() <= 0){
		ComShowCodeMessage("COM0185");
		return;
	}
	//show message "Please Input Outbound Date." in case user not input outbound data and shipping qty > 0
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, prefix+"ship_item_ea_qty") > 0 && formObj.outbound_dt.value == ""){
			ComShowCodeMessage("COM0772");
			formObj.outbound_dt.focus();
			return;
		}else{
			sheetObj.SetCellValue(i, prefix+"outbound_dt", formObj.outbound_dt.value, 0);
		}
	}
	
	//if
	var isShipping = false;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, prefix+"ship_item_ea_qty") > 0){
			isShipping = true;
			break;
		}
	}
	//#2323 [WMS4.0] OUTBOUND DATE MOVE ON ALLOCATION POPUP (S)
	var isSuccess = false;

	if(isShipping){
		isSuccess = shipping();
	}else{
		isSuccess = picking();
	}
	
	if(isSuccess) {
		parent.rtnary[0] = 'Y';
		if(gubun == 'x') {
			if(confirm(getLabel("WMS_MSG008"))){ //"Allocation has been completed with no issue. Click OK to proceed by closing this popup."
				btn_Close();
			}	
		}
	}
	//#2323 [WMS4.0] OUTBOUND DATE MOVE ON ALLOCATION POPUP (E)
}

function picking()
{
	var sheetObj = sheet1;
	if(sheet1.RowCount() <= 0){
		ComShowCodeMessage("COM0185");
		return false;
	}
	var allc_cnt = eval($("#allc_cnt_tot").val());
	if(allc_cnt <= 0){
		ComShowCodeMessage("COM0330"); 
		return false;
	}
	var cnt=0;
	var picked_cnt = 0;
	
	var over_picked = false;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//Alloc일경우만 Picking
		if(sheetObj.GetCellValue(i, prefix + "pickd_flg") != "Y"){
			if(eval(sheetObj.GetCellValue(i, prefix + "pick_item_ea_qty")) > 0){
				cnt++;
			}
		}else{
			picked_cnt ++;
		}
		// Alloc. Qty보다 Picking QTY가 큰경우
		if( eval(sheetObj.GetCellValue(i, prefix + "allc_item_ea_qty")) < eval(sheetObj.GetCellValue(i, prefix + "pick_item_ea_qty")) ){
			over_picked = true;
			break;
		}
	}
	// Alloc. Qty보다 Picking QTY가 큰경우
	if (over_picked) {
		ComShowCodeMessage("COM0458");
		return false;
	}

	if(picked_cnt == sheetObj.RowCount()){
		ComShowCodeMessage("COM0452");
		return false;
	}
	if(cnt <= 0){
		ComShowCodeMessage("COM0771");
		return false;
	}
	//TODO : MJY picking 수량이 부킹별 합이 0이 입력 된경우 체크 Validation 로직 추가할것
	if(ComShowCodeConfirm("COM0439") == false){
		return false;
	}
	var tl_wo_document_info_header = "";
	var wave_no 		=     tl_wo_document_info_header+"wave_no="			+$("#wave_no").val();
	var wh_cd 			= "&"+tl_wo_document_info_header+"wh_cd="			+$("#wh_cd").val();
	var docinParamter   = wave_no+wh_cd;
	var sheetDatas3 = ComGetSaveString(sheetObj, true, false); //allSave => false 트랜잭션이 발생한 것만 저장할 경우
	var saveXml = sheetObj.GetSaveData("saveAllocPickingLongTransactionGS.clt", docinParamter+"&"+sheetDatas3 + "&f_cmd="+MULTI05);
	sheetObj.LoadSaveData(saveXml);
	
	return true;
}


//contains 메소드 추가
Array.prototype.contains = function(element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
};

//getidx 메소드 추가
Array.prototype.getidx = function(element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return i;
		}
	}
	return -1;
};

/*
 * Shipping
 */
function shipping()
{
	var sheetObj = sheet1;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, prefix+"ship_item_ea_qty") <= 0){
			ComShowCodeMessage("COM0278","Shipping Q'ty");
			return false;
		}
	}
	if(sheet1.RowCount() <= 0){
		ComShowCodeMessage("COM0185");
		return false;
	}
	var allc_cnt = eval($("#allc_cnt_tot").val());
	if(allc_cnt <= 0){
		ComShowCodeMessage("COM0330"); 
		return false;
	}
	var cnt = 0;
	//수량(Merge된 Picking수량의 첫번째 Row값을 저장하기위하여
	var allc_merge_key_arr = new Array();
	var pick_qty_arr = new Array();
	//split일경우 동일한 eq_tpsz, eq_no, outbound_dt에 등록되어있는지 체크.
	var eq_tpsz_cd_arr = new Array();
	//eq_tpsz, eq_no, outbound_dt 가 동일한데 trucker, dono, seal 정보가 다를경우 체크.
	var cargo_arr = new Array();
	var cargo_rst_arr = new Array();
	//이미 COMPLETE된 정보와 동일한 정보가 있는지 체크
	var comp_chk_arr_comp_rst = new Array();
	var comp_chk_arr_no_comp = new Array();
	var comp_chk_arr_no_comp_rst = new Array();
	//SHIPPING이 0일경우 메세지 처리체크
	var wob_bk_no_arr = new Array();
	var wob_bk_no_ship_arr = new Array();
	var outbound_dt_temp = "";
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		var dlv_ord_no = sheetObj.GetCellValue(i, prefix + "dlv_ord_no").trim();
		if(sheetObj.GetCellValue(i, prefix + "tro_flg") == "Y"){
			dlv_ord_no = sheetObj.GetCellValue(i, prefix + "dlv_ord_no_org").trim();
		}
		//SHIP 수량이 0이상인경우만 체크
		if(sheetObj.GetCellValue(i, prefix + "bk_sts_cd") != "LP" ){
				var outbound_dt = sheetObj.GetCellValue(i, prefix + "outbound_dt");
				outbound_dt_temp = outbound_dt;
				if(sheetObj.GetCellValue(i, prefix + "eq_no").trim().length > 0 && sheetObj.GetCellValue(i, prefix + "eq_tpsz_cd").trim().length <= 0){
					ComShowCodeMessage("COM0773");
					sheetObj.SelectCell(i, prefix +  "eq_tpsz_cd");
					return false;
				}
				//split일경우 동일한 eq_tpsz_cd, eq_no, out_dt 가 동일한지 체크
				if(eq_tpsz_cd_arr.contains(sheetObj.GetCellValue(i, prefix+"allc_merge_key") + "|" + sheetObj.GetCellValue(i, prefix + "lp_no").trim() + "|" + sheetObj.GetCellValue(i, prefix + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, prefix + "eq_no").trim()  + "|" + outbound_dt) == false){
					eq_tpsz_cd_arr.push(sheetObj.GetCellValue(i, prefix+"allc_merge_key") + "|" + sheetObj.GetCellValue(i, prefix + "lp_no").trim() + "|" + sheetObj.GetCellValue(i, prefix + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, prefix + "eq_no").trim() + "|" + outbound_dt);
				}else{
					ComShowCodeMessage("COM0442");
					sheetObj.SelectCell(i, prefix +  "eq_tpsz_cd");
					return false;
				}
				if(sheetObj.GetCellValue(i, prefix + "eq_no").trim() != ""){
					//eq_tpsz_cd, eq_no가 동일한테 trucker, dono, seal no가 다른지 체크
					if(cargo_arr.contains(sheetObj.GetCellValue(i, prefix + "eq_no").trim() + "|" + outbound_dt) == false){
						cargo_arr.push(sheetObj.GetCellValue(i, prefix + "eq_no").trim() + "|" + outbound_dt);
						cargo_rst_arr.push(sheetObj.GetCellValue(i, prefix + "eq_no").trim() + "|" + outbound_dt
								           + "|" + sheetObj.GetCellValue(i, prefix + "eq_tpsz_cd").trim() + "#$#$" + sheetObj.GetCellValue(i, prefix + "trucker_cd").trim() + "#$#$" + sheetObj.GetCellValue(i, prefix + "trucker_nm").trim()
								           + "#$#$" + sheetObj.GetCellValue(i, prefix + "seal_no").trim() + "#$#$" + dlv_ord_no + "#$#$" + sheetObj.GetCellValue(i, prefix + "lp_no").trim());
						
					}else{
						var c_idx = cargo_arr.getidx(sheetObj.GetCellValue(i, prefix + "eq_no").trim() + "|" + outbound_dt);
						var cargo_rst_arr_var = cargo_rst_arr[c_idx].split("|");
						var oth_info = cargo_rst_arr_var[2];
						if(oth_info != sheetObj.GetCellValue(i, prefix + "eq_tpsz_cd").trim() + "#$#$" + sheetObj.GetCellValue(i, prefix + "trucker_cd").trim() + "#$#$" + sheetObj.GetCellValue(i, prefix + "trucker_nm").trim()
								           + "#$#$" + sheetObj.GetCellValue(i, prefix + "seal_no").trim() + "#$#$" + dlv_ord_no + "#$#$" + sheetObj.GetCellValue(i, prefix + "lp_no").trim()){
							ComShowCodeMessage("COM0449");
							sheetObj.SelectCell(i, prefix +  "eq_tpsz_cd");
							return false;
						}
					}
					//입력된 값이 Compete된 정보와 같은 경우
					if(comp_chk_arr_no_comp.contains(sheetObj.GetCellValue(i, prefix + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, prefix + "eq_no").trim() + "|" + outbound_dt) == false){
						comp_chk_arr_no_comp.push(sheetObj.GetCellValue(i, prefix + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, prefix + "eq_no").trim() + "|" + outbound_dt);
						comp_chk_arr_no_comp_rst.push(sheetObj.GetCellValue(i, prefix + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, prefix + "eq_no").trim() + "|" + outbound_dt + "|" + i);
					}
				}
			cnt++;
			// picking수량, shipping수량 체크위하여 데이터저장
			if(allc_merge_key_arr.contains(sheetObj.GetCellValue(i, prefix+"allc_merge_key")) == false){
				allc_merge_key_arr.push(sheetObj.GetCellValue(i, prefix+"allc_merge_key"));
				if(sheetObj.GetCellValue(i, prefix + "pickd_flg") == "Y"){
					pick_qty_arr.push(sheetObj.GetCellValue(i, prefix+"allc_merge_key") + "|" + sheetObj.GetCellValue(i, prefix+"pick_item_ea_qty") + "|" + sheetObj.GetCellValue(i, prefix+"ship_item_ea_qty"));
					
				}else{
					pick_qty_arr.push(sheetObj.GetCellValue(i, prefix+"allc_merge_key") + "|" + sheetObj.GetCellValue(i, prefix+"allc_item_ea_qty") + "|" + sheetObj.GetCellValue(i, prefix+"ship_item_ea_qty"));
				}
			}else{
				var idx = allc_merge_key_arr.getidx(sheetObj.GetCellValue(i, prefix+"allc_merge_key"));
				var pick_qty_val = pick_qty_arr[idx].split("|");
				var pick_qty_val_sum =eval(pick_qty_val[2]) +  eval(sheetObj.GetCellValue(i, prefix+"ship_item_ea_qty"));
				pick_qty_arr[idx] = pick_qty_val[0] + "|" + pick_qty_val[1] + "|" + pick_qty_val_sum;
			}
			if(wob_bk_no_arr.contains(sheetObj.GetCellValue(i, prefix+"wob_bk_no")) == false){
				wob_bk_no_arr.push(sheetObj.GetCellValue(i, prefix+"wob_bk_no"));
				wob_bk_no_ship_arr.push(sheetObj.GetCellValue(i, prefix+"wob_bk_no") + "|" + sheetObj.GetCellValue(i, prefix+"ship_item_ea_qty"));
			}else{
				var idx = wob_bk_no_arr.getidx(sheetObj.GetCellValue(i, prefix+"wob_bk_no"));
				var wob_bk_no_ship_val = wob_bk_no_ship_arr[idx].split("|");
				var wob_bk_no_ship_val_sum = eval(wob_bk_no_ship_val[1]) + eval(sheetObj.GetCellValue(i, prefix+"ship_item_ea_qty"));
				wob_bk_no_ship_arr[idx] = wob_bk_no_ship_val[0] + "|" + wob_bk_no_ship_val_sum;
			}
		}else if(sheetObj.GetCellValue(i, prefix + "bk_sts_cd") == "LP" && !sheetObj.GetCellValue(i, prefix + "eq_no") == ""){
			//입력된 값이 Compete된 정보와 같은 경우
			if(comp_chk_arr_comp_rst.contains(sheetObj.GetCellValue(i, prefix + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, prefix + "eq_no").trim() + "|" + sheetObj.GetCellValue(i, prefix + "outbound_dt").trim()) == false){
				comp_chk_arr_comp_rst.push(sheetObj.GetCellValue(i, prefix + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, prefix + "eq_no").trim() + "|" + sheetObj.GetCellValue(i, prefix + "outbound_dt").trim());
			}
		}
	}
	if(cnt == 0){
		ComShowCodeMessage("COM0454");
		return false;
	}
	//입력된 값이 Compete된 정보와 같은 경우
	for(var i =0;  i<comp_chk_arr_comp_rst.length; i++){
		for(var m=0; m<comp_chk_arr_no_comp.length; m++){
			if(comp_chk_arr_comp_rst[i] == comp_chk_arr_no_comp[m]){
				var chk_row = comp_chk_arr_no_comp_rst[m].split("|");
				ComShowCodeMessage("COM0448");
				sheetObj.SelectCell(chk_row[3], prefix +  "eq_no");
				return false;
			
			}
		}
	}
	//Shipping수량이 Picking수량보다 큰경우 체크
	for(var i =0;  i<pick_qty_arr.length; i++){
		var pick_qty_val = pick_qty_arr[i].split("|");
		var picked = eval(pick_qty_val[1]);
		var shipped = eval(pick_qty_val[2]);
		if(picked >= 0 && picked <shipped){
			var Row1 = sheetObj.FindText(prefix + "allc_merge_key", pick_qty_val[0], sheetObj.HeaderRows(), -1, true);
			ComShowCodeMessage("COM0450");
			if(Row1 >= 0){
				sheetObj.SelectCell(Row1, prefix +  "ship_item_ea_qty");
			}
			return false;
		}
	}
	//order에 Shipping수량이 모두 0인경우 체크
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		var shipped = sheetObj.GetCellValue(i, prefix + "ship_item_ea_qty");
		if(shipped == 0){
			ComShowCodeMessage("COM0453");
			break;
		}
	}
	if(ComShowCodeConfirm("COM0441") == false){
		return false;
	}
	var tl_wo_document_info_header = "";
	var wave_no 		=     tl_wo_document_info_header+"wave_no="			+$("#wave_no").val();
	var wh_cd 			= "&"+tl_wo_document_info_header+"wh_cd="			+$("#wh_cd").val();
	var pick_dt 		= "&"+tl_wo_document_info_header+"pick_dt=";
	var pick_hm_fr 		= "&"+tl_wo_document_info_header+"pick_hm_fr=";
	var pick_hm_to 		= "&"+tl_wo_document_info_header+"pick_hm_to=";
	var outbound_dt		= "&"+tl_wo_document_info_header+"outbound_dt="		+ outbound_dt_temp;
	var outbound_hm_fr	= "&"+tl_wo_document_info_header+"outbound_hm_fr=";
	var outbound_hm_to	= "&"+tl_wo_document_info_header+"outbound_hm_to=";
	var rmk 			= "&"+tl_wo_document_info_header+"rmk=";
	var docinParamter   = wave_no+wh_cd+pick_dt+pick_hm_fr+pick_hm_to+outbound_dt+outbound_hm_fr+outbound_hm_to+rmk;
	var sheetDatas3 = ComGetSaveString(sheetObj, true, false) + getShippingParam(sheetObj);
	var saveXml = sheetObj.GetSaveData("saveAllocShippingLongTransactionGS.clt", docinParamter+"&"+sheetDatas3 + "&f_cmd="+MULTI08);
	sheetObj.LoadSaveData(saveXml);
	
	return true;
}

function getShippingParam(sheetObj){
	var params = "&";
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){	
		if(sheetObj.GetCellValue(i,prefix+"ibflag") == "R" && sheetObj.GetCellEditable(i, prefix+ "ship_item_ea_qty") == true ){
			params += prefix + "wob_bk_no_org="  		  + sheetObj.GetCellValue(i,prefix+"wob_bk_no_org") 		+ "&";  		
			params += prefix + "chkAll="   				  + sheetObj.GetCellValue(i,prefix+"chkAll")   				+ "&"; 		
			params += prefix + "cust_ord_no="  			  + sheetObj.GetCellValue(i,prefix+"cust_ord_no")  			+ "&"; 		
			params += prefix + "ord_tp_nm="  			  + sheetObj.GetCellValue(i,prefix+"ord_tp_nm") 			+ "&"; 		
			params += prefix + "bk_sts_nm="   			  + sheetObj.GetCellValue(i,prefix+"bk_sts_nm")   			+ "&"; 		
			params += prefix + "item_sys_no="    		  + sheetObj.GetCellValue(i,prefix+"item_sys_no")    		+ "&"; 		
			params += prefix + "item_seq="   			  + sheetObj.GetCellValue(i,prefix+"item_seq")   			+ "&"; 
			params += prefix + "item_cd="    			  + sheetObj.GetCellValue(i,prefix+"item_cd")    			+ "&"; 
			params += prefix + "item_nm="  				  + sheetObj.GetCellValue(i,prefix+"item_nm")  				+ "&"; 
			params += prefix + "allc_merge_key="    	  + sheetObj.GetCellValue(i,prefix+"allc_merge_key")    	+ "&"; 
			params += prefix + "lot_no="    			  + sheetObj.GetCellValue(i,prefix+"lot_no")    			+ "&"; 
			params += prefix + "wh_loc_cd_nm="    		  + sheetObj.GetCellValue(i,prefix+"wh_loc_cd_nm")    		+ "&"; 
			params += prefix + "allc_item_ea_qty="  	  + sheetObj.GetCellValue(i,prefix+"allc_item_ea_qty")  	+ "&"; 
			params += prefix + "chk="    				  + sheetObj.GetCellValue(i,prefix+"chk")    				+ "&"; 
			params += prefix + "pick_item_ea_qty="    	  + sheetObj.GetCellValue(i,prefix+"pick_item_ea_qty")    	+ "&"; 
			params += prefix + "rn="    				  + sheetObj.GetCellValue(i,prefix+"rn")    				+ "&"; 
			params += prefix + "load_plan_item_ea_qty="   + sheetObj.GetCellValue(i,prefix+"load_plan_item_ea_qty") + "&"; 
			params += prefix + "ship_item_ea_qty=" 		  + sheetObj.GetCellValue(i,prefix+"ship_item_ea_qty") 		+ "&"; 
			params += prefix + "est_out_dt=" 			  + sheetObj.GetCellValue(i,prefix+"est_out_dt") 			+ "&"; 
			params += prefix + "outbound_dt=" 			  + sheetObj.GetCellValue(i,prefix+"outbound_dt") 			+ "&"; 
			params += prefix + "out_pe_qty=" 			  + sheetObj.GetCellValue(i,prefix+"out_pe_qty") 			+ "&"; 
			params += prefix + "dlv_ord_no=" 			  + sheetObj.GetCellValue(i,prefix+"dlv_ord_no") 			+ "&"; 
			params += prefix + "tro_sts_nm=" 			  + sheetObj.GetCellValue(i,prefix+"tro_sts_nm") 			+ "&"; 
			params += prefix + "eq_tpsz_cd=" 			  + sheetObj.GetCellValue(i,prefix+"eq_tpsz_cd") 			+ "&"; 
			params += prefix + "eq_tp_cd=" 				  + sheetObj.GetCellValue(i,prefix+"eq_tp_cd") 				+ "&"; 
			params += prefix + "eq_no=" 				  + sheetObj.GetCellValue(i,prefix+"eq_no") 				+ "&"; 
			params += prefix + "seal_no=" 				  + sheetObj.GetCellValue(i,prefix+"seal_no") 				+ "&"; 
			params += prefix + "trucker_cd=" 			  + sheetObj.GetCellValue(i,prefix+"trucker_cd")			+ "&"; 
			params += prefix + "trucker_nm=" 			  + sheetObj.GetCellValue(i,prefix+"trucker_nm") 			+ "&"; 
			params += prefix + "item_cbm=" 				  + sheetObj.GetCellValue(i,prefix+"item_cbm") 				+ "&"; 
			params += prefix + "item_cbf=" 				  + sheetObj.GetCellValue(i,prefix+"item_cbf") 				+ "&"; 
			params += prefix + "item_grs_kgs=" 			  + sheetObj.GetCellValue(i,prefix+"item_grs_kgs") 			+ "&"; 
			params += prefix + "item_grs_lbs=" 			  + sheetObj.GetCellValue(i,prefix+"item_grs_lbs") 			+ "&"; 
			params += prefix + "item_net_kgs=" 			  + sheetObj.GetCellValue(i,prefix+"item_net_kgs") 			+ "&"; 
			params += prefix + "item_net_lbs=" 			  + sheetObj.GetCellValue(i,prefix+"item_net_lbs") 			+ "&"; 
			params += prefix + "wib_bk_no=" 			  + sheetObj.GetCellValue(i,prefix+"wib_bk_no") 			+ "&"; 
			params += prefix + "inbound_dt=" 			  + sheetObj.GetCellValue(i,prefix+"inbound_dt") 			+ "&"; 
			params += prefix + "po_no_in=" 				  + sheetObj.GetCellValue(i,prefix+"po_no_in") 				+ "&"; 
			params += prefix + "lot_id=" 				  + sheetObj.GetCellValue(i,prefix+"lot_id") 				+ "&"; 
			params += prefix + "exp_dt=" 				  + sheetObj.GetCellValue(i,prefix+"exp_dt") 				+ "&"; 
			params += prefix + "lot_04=" 				  + sheetObj.GetCellValue(i,prefix+"lot_04") 				+ "&"; 
			params += prefix + "lot_05=" 				  + sheetObj.GetCellValue(i,prefix+"lot_05") 				+ "&"; 
			params += prefix + "wob_bk_no=" 			  + sheetObj.GetCellValue(i,prefix+"wob_bk_no")				+ "&"; 
			params += prefix + "ctrt_no=" 				  + sheetObj.GetCellValue(i,prefix+"ctrt_no") 				+ "&"; 
			params += prefix + "ctrt_nm=" 				  + sheetObj.GetCellValue(i,prefix+"ctrt_nm") 				+ "&"; 
			params += prefix + "wh_cd=" 				  + sheetObj.GetCellValue(i,prefix+"wh_cd") 				+ "&"; 
			params += prefix + "ibflag=" 				  + 'U'															+ "&"; 
			params += prefix + "walc_no=" 				  + sheetObj.GetCellValue(i,prefix+"walc_no") 				+ "&"; 
			params += prefix + "sao_sys_no=" 			  + sheetObj.GetCellValue(i,prefix+"sao_sys_no") 			+ "&"; 
			params += prefix + "po_sys_no=" 			  + sheetObj.GetCellValue(i,prefix+"po_sys_no") 			+ "&"; 
			params += prefix + "wh_loc_cd=" 			  + sheetObj.GetCellValue(i,prefix+"wh_loc_cd") 			+ "&"; 
			params += prefix + "issu_cnt=" 				  + sheetObj.GetCellValue(i,prefix+"issu_cnt") 				+ "&"; 
			params += prefix + "lp_cnt=" 				  + sheetObj.GetCellValue(i,prefix+"lp_cnt") 				+ "&"; 
			params += prefix + "bk_sts_cd=" 			  + sheetObj.GetCellValue(i,prefix+"bk_sts_cd") 			+ "&"; 
			params += prefix + "bk_sts_cd_grp=" 		  + sheetObj.GetCellValue(i,prefix+"bk_sts_cd_grp") 		+ "&"; 
			params += prefix + "pkg_lv1_qty=" 			  + sheetObj.GetCellValue(i,prefix+"pkg_lv1_qty") 			+ "&"; 
			params += prefix + "lv1_cbm=" 				  + sheetObj.GetCellValue(i,prefix+"lv1_cbm") 				+ "&"; 
			params += prefix + "lv1_cbf=" 				  + sheetObj.GetCellValue(i,prefix+"lv1_cbf") 				+ "&"; 
			params += prefix + "lv1_grs_kgs=" 			  + sheetObj.GetCellValue(i,prefix+"lv1_grs_kgs") 			+ "&"; 
			params += prefix + "lv1_grs_lbs=" 			  + sheetObj.GetCellValue(i,prefix+"lv1_grs_lbs") 			+ "&"; 
			params += prefix + "lv1_net_kgs=" 			  + sheetObj.GetCellValue(i,prefix+"lv1_net_kgs") 			+ "&"; 
			params += prefix + "lv1_net_lbs=" 			  + sheetObj.GetCellValue(i,prefix+"lv1_net_lbs")			+ "&"; 
			params += prefix + "pe_qty=" 				  + sheetObj.GetCellValue(i,prefix+"pe_qty")				+ "&"; 
			params += prefix + "pickd_flg=" 			  + sheetObj.GetCellValue(i,prefix+"pickd_flg") 			+ "&"; 
			params += prefix + "lp_no=" 				  + sheetObj.GetCellValue(i,prefix+"lp_no") 				+ "&"; 
			params += prefix + "consol_no=" 			  + sheetObj.GetCellValue(i,prefix+"consol_no") 			+ "&"; 
			params += prefix + "shipno=" 				  + sheetObj.GetCellValue(i,prefix+"shipno") 				+ "&"; 
			params += prefix + "shipno_seq=" 			  + sheetObj.GetCellValue(i,prefix+"shipno_seq") 			+ "&"; 
			params += prefix + "lp_id=" 				  + sheetObj.GetCellValue(i,prefix+"lp_id") 				+ "&"; 
			params += prefix + "lp_seq=" 				  + sheetObj.GetCellValue(i,prefix+"lp_seq") 				+ "&"; 
			params += prefix + "tro_flg=" 				  + sheetObj.GetCellValue(i,prefix+"tro_flg") 				+ "&"; 
			params += prefix + "dlv_ord_no_org=" 		  + sheetObj.GetCellValue(i,prefix+"dlv_ord_no_org") 		+ "&"; 
			params += prefix + "tro_seq=" 		          + sheetObj.GetCellValue(i,prefix+"tro_seq") 				+ "&"; 
			params += prefix + "lic_plat_no=" 		      + sheetObj.GetCellValue(i,prefix+"lic_plat_no") 			+ "&"; 
			params += prefix + "item_ser_no=" 		      + sheetObj.GetCellValue(i,prefix+"item_ser_no") 			+ "&"; 
			params = params.substring(0,params.length-1);
		}
	}
	if(params.length == 1)
		return "";
	else
		return params;
}


/*
 * close 버튼 클릭
 */
function btn_Close(){
	ComClosePopup();
}

//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		switch(srcName) {
			case "SAVE" :	
				//to do for button save
				btn_Save();
				break;
				//#2323 [WMS4.0] OUTBOUND DATE MOVE ON ALLOCATION POPUP (S)
			case "SAVEX" :	
				btn_Save('x');
				break;
				//#2323 [WMS4.0] OUTBOUND DATE MOVE ON ALLOCATION POPUP (E)
			case "SEARCHLIST":
				searchList();
 				break;
			case "PRINT":
				btn_Print();
 				break;
			case "CLOSE":
				btn_Close();
 				break;
			case "btnClose":
				btn_Close();
 				break;
			case "btn_outbound_dt":	
				var cal = new ComCalendar();
	            cal.select(formObj.outbound_dt, 'MM-dd-yyyy');
				break;
      } // end switch
	} catch(e) {
        if(e == "[object Error]"){
         //Unexpected Error occurred. Please contact Help Desk!
         alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
         //System Error! + MSG
         alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
 }
}

function btn_Allocation(){
	var sheetObj = sheet1;
	if(sheetObj.RowCount() <= 0)
	{
		ComShowCodeMessage("COM0185");
		return;
	}
	if(ComShowCodeConfirm("COM0311") == false){
		return;
	}
	
	var div = "ALL";
	var iChkCnt = sheetObj.CheckedRows(prefix+"chk");
	if(iChkCnt == 0){
		div = "ALL";
	}else { //partial cancel
		div = "PT";
	}
	
	//--파라미터값 생성 --
	var grdParam = "";
	var ob_item_key_arr = new Array();
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(eval(sheetObj.GetCellValue(i, prefix + "un_alloc_ea_qty")) > 0) //미할당건이 0보다 클경우에만 파라미터값 생성
		{
			if(div == "ALL" || (div == "PT" && sheetObj.GetCellValue(i, prefix + "chk") == "1"))
			{
				var key = sheetObj.GetCellValue(i, prefix + "wob_bk_no_org") + "|" + sheetObj.GetCellValue(i, prefix + "sao_sys_no") + "|" + sheetObj.GetCellValue(i, prefix + "item_sys_no") + "|" + sheetObj.GetCellValue(i, prefix + "item_seq");
				if(ob_item_key_arr.contains(key) == false)
				{
					ob_item_key_arr.push(key);
					if(grdParam.trim().length == 0)
					{
						grdParam = prefix + "wob_bk_no=" +  sheetObj.GetCellValue(i, prefix + "wob_bk_no")  
						   + "&" + prefix + "sao_sys_no=" + sheetObj.GetCellValue(i, prefix + "sao_sys_no") 
						   + "&" + prefix + "item_sys_no=" + sheetObj.GetCellValue(i, prefix + "item_sys_no") 
						   + "&" + prefix + "item_seq=" + sheetObj.GetCellValue(i, prefix + "item_seq")
						   + "&" + prefix + "strg_sys_no=" + sheetObj.GetCellValue(i, prefix + "strg_sys_no");
					}
					else
					{
						grdParam =grdParam + "&" + prefix + "wob_bk_no=" +  sheetObj.GetCellValue(i, prefix + "wob_bk_no")  
						   + "&" + prefix + "sao_sys_no=" + sheetObj.GetCellValue(i, prefix + "sao_sys_no") 
						   + "&" + prefix + "item_sys_no=" + sheetObj.GetCellValue(i, prefix + "item_sys_no") 
						   + "&" + prefix + "item_seq=" + sheetObj.GetCellValue(i, prefix + "item_seq")
						   + "&" + prefix + "strg_sys_no=" + sheetObj.GetCellValue(i, prefix + "strg_sys_no");
					}
				}
			}
		}
	}
	
	if(grdParam.trim().length == 0)
	{
		ComShowCodeMessage("COM0347");
		return;
	}
	parent.rtnary[0] = 'Y';
	var tl_wo_document_info_header = "";
	var docparam = tl_wo_document_info_header + "wave_no="+$("#wave_no").val() + "&" + tl_wo_document_info_header + "wh_cd=" + $("#wh_cd").val() + "&" + tl_wo_document_info_header + "div=" + div;
	var param = grdParam + "&" + docparam + "&f_cmd=" + MULTI02;
	var sXml = sheetObj.GetSaveData("saveAutoWaveAllocLongTransactionGS.clt", param); //ALLC 화면, WAVE 공통
	sheetObj.LoadSaveData(sXml);
}

function btn_ManualAlloc()
{
	var sheetObjO;
	var cond_div  = "ALL";
	if(sheet1.RowCount() <= 0){
		ComShowCodeMessage("COM0185");
		return;
	}
	
	popupManualAllcPopup(cond_div, "A", "&search_no="   + $("#wave_no").val() 
            											+"&wh_cd=" + $("#wh_cd").val()
            											+ "&rum=1");
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
	var sUrl="WaveSmpManualAllcPopup.clt?cond_div=" + cond_div + "&mode=" + mode + param;
	
	callBackFunc = "setManualAllc";
    modal_center_open(sUrl, callBackFunc, 1152, 648,"yes");
}

function setManualAllc(rtnVal){
	parent.rtnary[0] = 'Y';
	searchList();
}

function btn_Cancel_Wave()
{
	var sheetObj = sheet1;
	var div = ""; //전체 캔슬인지 체크후 캔슬인지의 여부
	var saveXml = "";
	//할당이 단한번도 되지않은경우
	var allc_cnt = 0;
	var iChkCnt = sheetObj.CheckedRows(prefix+"chk");
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		
		if(iChkCnt == 0){
			allc_cnt += eval(sheetObj.GetCellValue(i, prefix + "allc_sum_ea_qty"))
		}else {//partial cancel
			if(sheetObj.GetCellValue(i, prefix + "chk") == 1){
				allc_cnt += eval(sheetObj.GetCellValue(i, prefix + "allc_sum_ea_qty"))
			}
		}
	}
	
	if(allc_cnt <= 0){
		ComShowCodeMessage("COM0330"); 
		return;
	}
	if(iChkCnt == 0){
		//wave에 해당하는 allocation정보 모두 삭제
		div = "ALL";
	}else {//partial cancel
		div = "PT";
	}
	//confirm
	if(!ComShowCodeConfirm("COM0040")){
		return;
	}
	switch(div){
		case "ALL":			
			var sXml = sheetObj.GetSaveData("cancelWaveSimpleMgmtAllocAllLongTransactionGS.clt", "wave_no="+$("#wave_no").val().trim()+"&"+"wh_cd="+$("#wh_cd").val().trim()+"&f_cmd=" + MULTI03);
			sheetObj.LoadSaveData(sXml);
			break;
		case "PT":
			var tl_wo_document_info_header = "";
			var wave_no 	=     tl_wo_document_info_header + "wave_no="   +$("#wave_no").val().trim();
			var wh_cd		= "&"+tl_wo_document_info_header + "wh_cd="     +$("#wh_cd").val().trim();
			var docinParamter = wave_no+wh_cd + "&" + tl_wo_document_info_header;
			var isheetSaveParamters = docinParamter + "&" + ComGetSaveString(sheetObj, true, false);
			var sXml = sheetObj.GetSaveData("cancelWaveSimpleMgmtAllocPartialLongTransactionGS.clt", isheetSaveParamters+"&f_cmd=" + MULTI04);
			sheetObj.LoadSaveData(sXml);
			break;
	}
}

function btn_Cancel_Allc()
{
	var sheetObj = sheet1;
	var div = "";
	var saveXml = "";
	//할당이 단한번도 되지않은경우
	var allc_cnt = eval($("#allc_cnt_tot").val());
	if(allc_cnt <= 0){
		ComShowCodeMessage("COM0330"); 
		return;
	}
	var iChkCnt    = sheetObj.CheckedRows(prefix+"chk");
	if(iChkCnt == 0){
		div = "ALL";
	}else {//partial cancel
		if(sheetObj.RowCount() == iChkCnt){
			div = "ALL";
		}else{
			div = "PT";
		}
	}
	//Partial로 선택시 체크된건이 load plan complete인데... 전체 lp_no가 선택되어있는지 여부 확인
	if(div == "PT"){
		var sRow = sheetObj.FindCheckedRow(prefix + "chk");
		var arrRow = sRow.split("|"); //결과 : "1|3|5|"
		for(var i=0; i<arrRow.length-1; i++){
			if(sheetObj.GetCellValue(arrRow[i], prefix + "bk_sts_cd") == "LP" && sheetObj.GetCellValue(arrRow[i], prefix + "lp_no") != ""){
				var lp_no = sheetObj.GetCellValue(arrRow[i], prefix + "lp_no");
				for(var m=sheetObj.HeaderRows(); m<=sheetObj.LastRow();m++){
					if(m != arrRow[i] && sheetObj.GetCellValue(m, prefix + "bk_sts_cd") == "LP" && sheetObj.GetCellValue(m, prefix + "lp_no") == lp_no &&  sheetObj.GetCellValue(m, prefix + "chk") == "0"){
						ComShowCodeMessage("COM0444"); 
						return;
					}
				}
			}
		}
	}
	//confirm
	if(!ComShowCodeConfirm("COM0040")){
		return;
	}
	switch(div){
		case "ALL":			
			saveXml = sheetObj.GetSaveData("cancelWaveSimpleMgmtAllLongTransactionGS.clt", "wave_no="+$("#wave_no").val().trim()+"&"+"wh_cd="+$("#wh_cd").val().trim()+"&f_cmd="+MULTI06);
			sheetObj.LoadSaveData(saveXml);
			break;
		case "PT":
			var tl_wo_document_info_header = "";
			var wave_no 	=     tl_wo_document_info_header + "wave_no="   +$("#wave_no").val().trim();
			var wh_cd		= "&"+tl_wo_document_info_header + "wh_cd="     +$("#wh_cd").val().trim();
			var docinParamter = wave_no+wh_cd;
			var sheetDatas1 = ComGetSaveString(sheetObj, true, false); //sheetObjs, bUrlEncode, allSave, col
			var isheetSaveParamters = docinParamter + "&" + sheetDatas1;
			saveXml = sheetObj.GetSaveData("cancelWaveSimpleMgmtPartialLongTransactionGS.clt", isheetSaveParamters+"&f_cmd="+MULTI07);
			sheetObj.LoadSaveData(saveXml);			
			break;
	}
}

function sheet1_OnSaveEnd(code, msg) {
	var mess = sheet1.GetEtcData("mess");
	if(mess == 'CANCEL' || mess == 'PICKING' || mess == 'SHIPPING'){
		var value = sheet1.GetEtcData("messValue");
		if(value == 'OK'){
			showCompleteProcess();
			searchList();
		}else{
			ComShowCodeMessage("COM12205");
		}
	}else if (mess == 'OK') 
	{			
		showCompleteProcess();
		searchList();
		var value = sheet1.GetEtcData("messValue");
		if(value == "COM0457"){
			ComShowCodeMessage("COM0499");
		}
	}else if(mess == 'NO'){
		var value = sheet1.GetEtcData("messValue");
		ComShowCodeMessage(value);
	}else{
		ComShowCodeMessage("COM0410");
	}
}

/*function btn_Print()
{
	if($("#wave_no").val() == "")
	{
		return;
	}
	
	var sUrl = "WaveSmpMgmtPrintOption.clt?wave_no="+$("#wave_no").val() + "&callByScreen=ManualAllcCmplPopup" + "&allc_cnt_tot=" + $("#allc_cnt_tot").val() + "&lp_cnt_tot=" + $("#lp_cnt_tot").val();
	
	callBackFunc = "setAllocCmplPrintOption";
    modal_center_open(sUrl, callBackFunc, 400,250,"yes");
}*/

//Report 2017.01.24 Requirement No.12.2 
function btn_Print(){
	if($("#wave_no").val() == "")
	{
		return;
	} 
	var formObj = document.form;
	var fileName = "";
	var param= "";

	//Picking Sheet
	
	formObj.title.value="Picking Sheet Report";
	var wave_no = $("#wave_no").val();
	var prn_lot_tp = "LOT02";
	var user_id = $("#user_id").val();
	var pick_unit = "";
	
	fileName += "^@@^"+ 'WH_OUT_PICK_ORDER_SHT.mrd' ;
	param += "^@@^" + "[" + wave_no + "]" + "[N]" + "["+ prn_lot_tp + "]" + "["+ user_id + "]" + "["+  pick_unit + "]";
	
	fileName = fileName.substring(4);
	param = param.substring(4);
	formObj.file_name.value= fileName;
	formObj.rd_param.value=param;
	popPOST(formObj, './RPT_RD_0030.clt', 'popTest', 1025, 740);
}

function setAllocCmplPrintOption(){
	
}
var totalRowMerge = 0;
var startRow = 0;
function mergeCell(Row){
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
	if(strg_sys_no == strg_sys_no_ori && item_cd == item_cd_ori && item_seq == item_seq_ori
			&& item_nm == item_nm_ori && item_pkgunit == item_pkgunit_ori
			&& item_pkgqty == item_pkgqty_ori && item_ea_qty == item_ea_qty_ori
			&& allc_sum_ea_qty == allc_sum_ea_qty_ori && un_alloc_ea_qty == un_alloc_ea_qty_ori){
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
var strg_sys_no_ori = '';
var item_cd_ori = '';
var item_nm_ori = '';
var item_pkgunit_ori = '';
var item_pkgqty_ori = '';
var item_ea_qty_ori = '';
var allc_sum_ea_qty_ori = '';
var un_alloc_ea_qty_ori = '';
var item_seq_ori = '';

function getDataOri(i){
	var sheetObj = sheet1;
	strg_sys_no_ori = sheetObj.GetCellValue(i, prefix+"strg_sys_no");
	item_cd_ori = sheetObj.GetCellValue(i, prefix+"item_cd");
	item_nm_ori = sheetObj.GetCellValue(i, prefix+"item_nm");
	item_pkgunit_ori = sheetObj.GetCellValue(i, prefix+"item_pkgunit");
	item_pkgqty_ori = sheetObj.GetCellValue(i, prefix+"item_pkgqty");
	item_ea_qty_ori = sheetObj.GetCellValue(i, prefix+"item_ea_qty");
	allc_sum_ea_qty_ori = sheetObj.GetCellValue(i, prefix+"allc_sum_ea_qty");
	un_alloc_ea_qty_ori = sheetObj.GetCellValue(i, prefix+"un_alloc_ea_qty");
	item_seq_ori = sheetObj.GetCellValue(i, prefix+"item_seq");
}
var strg_sys_no = '';
var item_cd = '';
var item_nm = '';
var item_pkgunit = '';
var item_pkgqty = '';
var item_ea_qty = '';
var allc_sum_ea_qty = '';
var un_alloc_ea_qty = '';
var item_seq = '';

function getData(i){
	var sheetObj = sheet1;
	strg_sys_no = sheetObj.GetCellValue(i, prefix+"strg_sys_no");
	item_cd = sheetObj.GetCellValue(i, prefix+"item_cd");
	item_nm = sheetObj.GetCellValue(i, prefix+"item_nm");
	item_pkgunit = sheetObj.GetCellValue(i, prefix+"item_pkgunit");
	item_pkgqty = sheetObj.GetCellValue(i, prefix+"item_pkgqty");
	item_ea_qty = sheetObj.GetCellValue(i, prefix+"item_ea_qty");
	allc_sum_ea_qty = sheetObj.GetCellValue(i, prefix+"allc_sum_ea_qty");
	un_alloc_ea_qty = sheetObj.GetCellValue(i, prefix+"un_alloc_ea_qty");
	item_seq = sheetObj.GetCellValue(i, prefix+"item_seq");
}
function setMergeCell(startRow, totalRowMerge){
	sheet1.SetMergeCell(startRow, 1, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 2, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 3, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 4, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 5, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 6, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 7, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 8, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 9, totalRowMerge, 1); // Un-Alloc column (#1346)
	
}
function sheet1_OnSort(Col, SortArrow) {
	mergeCell(2);
}

//#2322 [WMS4.0] DATE FIELD TO HAVE [TODAY] BUTTON
function setOutoundDtToday() {
	var formObj = document.form;
	formObj.outbound_dt.value = getTodayStr();
}